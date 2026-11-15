'use strict';

const http = require('node:http');
const fs = require('node:fs');
const { spawn } = require('node:child_process');
const { timingSafeEqual } = require('node:crypto');
const { Readable } = require('node:stream');
const { pipeline } = require('node:stream/promises');

const MAX_BODY = 20 * 1024 * 1024;
const KINDS = new Set(['llama.cpp', 'image', 'video']);

function validateConfig(config) {
  if (!config || !Array.isArray(config.profiles) || !Array.isArray(config.routes)) {
    throw new Error('Configuration must contain profiles and routes arrays');
  }
  const ids = new Set();
  for (const profile of config.profiles) {
    if (!profile || typeof profile.id !== 'string' || !/^[a-zA-Z0-9._-]+$/.test(profile.id) || ids.has(profile.id) ||
        !KINDS.has(profile.kind) || typeof profile.baseUrl !== 'string') {
      throw new Error('Invalid or duplicate model profile');
    }
    ids.add(profile.id);
    let url;
    try { url = new URL(profile.baseUrl); } catch { throw new Error('Invalid backend URL'); }
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
        url.search || url.hash) {
      throw new Error('Backend URL must be an HTTP(S) URL without credentials, query, or fragment');
    }
    if (profile.backendModel !== undefined && typeof profile.backendModel !== 'string') {
      throw new Error('backendModel must be a string');
    }
    if (profile.defaults !== undefined &&
        (!profile.defaults || typeof profile.defaults !== 'object' || Array.isArray(profile.defaults))) {
      throw new Error('Profile defaults must be an object');
    }
    if (profile.command !== undefined &&
        (profile.kind !== 'llama.cpp' || !Array.isArray(profile.command) ||
         !profile.command.length || profile.command.some(arg => typeof arg !== 'string' || !arg))) {
      throw new Error('Only llama.cpp profiles may define a nonempty command array');
    }
  }
  const routes = new Set();
  for (const route of config.routes) {
    if (!route || !['GET', 'POST'].includes(route.method) || !KINDS.has(route.kind) ||
        typeof route.path !== 'string' || !/^\/[a-zA-Z0-9/_-]+$/.test(route.path) || route.path.startsWith('//') ||
        route.path.startsWith('/v1/models') || typeof route.backendPath !== 'string' ||
        !/^\/[a-zA-Z0-9/_-]+$/.test(route.backendPath) || route.backendPath.startsWith('//')) {
      throw new Error('Invalid route');
    }
    const key = `${route.method} ${route.path}`;
    if (routes.has(key)) throw new Error('Duplicate route');
    routes.add(key);
  }
  return config;
}

function send(res, status, data) {
  res.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
  res.end(JSON.stringify(data));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if (size <= MAX_BODY) chunks.push(chunk);
    });
    req.on('end', () => {
      if (size > MAX_BODY) return reject(new Error('Request body too large'));
      try {
        const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
        resolve(value);
      } catch {
        reject(new Error('Expected a JSON object'));
      }
    });
    req.on('error', reject);
  });
}

function createApp(config, apiKey) {
  validateConfig(config);
  if (typeof apiKey !== 'string' || !apiKey) throw new Error('ALMA_API_KEY is required');
  const key = Buffer.from(['Bearer', apiKey].join(' '));
  const children = new Map();
  const profiles = new Map(config.profiles.map(profile => [profile.id, profile]));

  async function handle(req, res) {
    const auth = Buffer.from(req.headers.authorization || '');
    if (auth.length !== key.length || !timingSafeEqual(auth, key)) {
      return send(res, 401, { error: 'Unauthorized' });
    }
    const url = new URL(req.url, 'http://localhost');
    if (req.method === 'GET' && url.pathname === '/v1/models') {
      return send(res, 200, { data: config.profiles.map(profile => ({
        id: profile.id, kind: profile.kind, running: children.has(profile.id)
      })) });
    }
    const action = /^\/v1\/models\/([^/]+)\/(start|stop)$/.exec(url.pathname);
    if (req.method === 'POST' && action) {
      let id;
      try { id = decodeURIComponent(action[1]); } catch { return send(res, 400, { error: 'Invalid model ID' }); }
      const profile = profiles.get(id);
      if (!profile) return send(res, 404, { error: 'Unknown model' });
      if (!profile.command) return send(res, 400, { error: 'Model has no managed command' });
      if (action[2] === 'stop') {
        const child = children.get(id);
        if (!child) return send(res, 409, { error: 'Model is not running' });
        child.kill('SIGTERM');
        return send(res, 202, { status: 'stopping' });
      }
      if (children.has(id)) return send(res, 409, { error: 'Model is already running' });
      const child = spawn(profile.command[0], profile.command.slice(1), { stdio: 'ignore' });
      children.set(id, child);
      child.once('exit', () => { if (children.get(id) === child) children.delete(id); });
      child.once('error', () => { if (children.get(id) === child) children.delete(id); });
      try {
        await new Promise((resolve, reject) => {
          child.once('spawn', resolve);
          child.once('error', reject);
        });
        return send(res, 202, { status: 'started' });
      } catch {
        return send(res, 502, { error: 'Failed to start model process' });
      }
    }

    const route = config.routes.find(item => item.method === req.method && item.path === url.pathname);
    if (!route) return send(res, 404, { error: 'Unknown endpoint' });
    let body;
    if (req.method === 'POST') {
      if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) {
        return send(res, 415, { error: 'Content-Type must be application/json' });
      }
      try { body = await readJson(req); } catch (error) {
        return send(res, error.message === 'Request body too large' ? 413 : 400, { error: error.message });
      }
    }
    const id = req.method === 'POST' ? body.model : url.searchParams.get('model');
    const profile = profiles.get(id);
    if (!profile || profile.kind !== route.kind) return send(res, 400, { error: 'Unknown or incompatible model' });
    const target = new URL(route.backendPath, profile.baseUrl);
    const options = { method: req.method, redirect: 'error', signal: AbortSignal.timeout(120000) };
    if (req.method === 'POST') {
      options.headers = { 'content-type': 'application/json' };
      options.body = JSON.stringify({ ...profile.defaults, ...body, model: profile.backendModel ?? profile.id });
    } else {
      target.search = url.search;
      target.searchParams.set('model', profile.backendModel ?? profile.id);
    }
    try {
      const response = await fetch(target, options);
      res.writeHead(response.status, {
        'content-type': response.headers.get('content-type') || 'application/octet-stream',
        'cache-control': 'no-store'
      });
      if (response.body) await pipeline(Readable.fromWeb(response.body), res);
      else res.end();
    } catch {
      if (!res.headersSent) send(res, 502, { error: 'Backend request failed' });
      else res.destroy();
    }
  }

  const server = http.createServer((req, res) => {
    handle(req, res).catch(() => {
      if (!res.headersSent) send(res, 500, { error: 'Internal server error' });
      else res.destroy();
    });
  });
  server.on('close', () => {
    for (const child of children.values()) child.kill('SIGTERM');
  });
  return server;
}

if (require.main === module) {
  try {
    const config = JSON.parse(fs.readFileSync(process.env.ALMA_CONFIG || 'config.json', 'utf8'));
    const port = Number(process.env.ALMA_PORT || 3000);
    if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid ALMA_PORT');
    const server = createApp(config, process.env.ALMA_API_KEY);
    server.listen(port, '127.0.0.1', () => console.log(`Alma listening on 127.0.0.1:${port}`));
    for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { createApp, validateConfig };
