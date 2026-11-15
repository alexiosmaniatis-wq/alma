'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { createApp, validateConfig } = require('../server');

async function listen(server) {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

test('authenticated routing, media workflows, and managed profiles', async t => {
  const requests = [];
  const backend = http.createServer(async (req, res) => {
    let data = '';
    for await (const chunk of req) data += chunk;
    requests.push({ url: req.url, body: data && JSON.parse(data), authorization: req.headers.authorization });
    res.writeHead(201, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ received: true }));
  });
  const backendUrl = await listen(backend);
  t.after(() => new Promise(resolve => backend.close(resolve)));
  const config = {
    profiles: [
      { id: 'chat', kind: 'llama.cpp', baseUrl: backendUrl, backendModel: 'actual-chat',
        defaults: { temperature: 0.3 }, command: [process.execPath, '-e', 'setInterval(() => {}, 1000)'] },
      { id: 'image', kind: 'image', baseUrl: backendUrl },
      { id: 'video', kind: 'video', baseUrl: backendUrl }
    ],
    routes: [
      { method: 'POST', path: '/chat', kind: 'llama.cpp', backendPath: '/chat-api' },
      { method: 'POST', path: '/image', kind: 'image', backendPath: '/image-api' },
      { method: 'POST', path: '/video', kind: 'video', backendPath: '/video-api' },
      { method: 'GET', path: '/status', kind: 'video', backendPath: '/status-api' }
    ]
  };
  const server = createApp(config, 'test-key');
  const base = await listen(server);
  t.after(() => new Promise(resolve => server.close(resolve)));
  const headers = { authorization: ['Bearer', 'test-key'].join(' '), 'content-type': 'application/json' };
  const post = (path, body) => fetch(base + path, { method: 'POST', headers, body: JSON.stringify(body) });

  assert.equal((await fetch(base + '/v1/models')).status, 401);
  const models = await (await fetch(base + '/v1/models', { headers })).json();
  assert.deepEqual(models.data.map(model => model.id), ['chat', 'image', 'video']);
  assert.equal((await post('/chat', { model: 'image' })).status, 400);
  assert.equal((await fetch(base + '/chat', { method: 'POST', headers: { authorization: headers.authorization } })).status, 415);

  const chat = await post('/chat', { model: 'chat', messages: [], temperature: 0.8 });
  assert.equal(chat.status, 201);
  assert.deepEqual(await chat.json(), { received: true });
  assert.deepEqual(requests[0], {
    url: '/chat-api', body: { temperature: 0.8, model: 'actual-chat', messages: [] }, authorization: undefined
  });
  await post('/image', { model: 'image', prompt: 'a landscape' });
  await post('/video', { model: 'video', prompt: 'a moving landscape' });
  await post('/video', { model: 'video', image: 'encoded-image', prompt: 'animate' });
  assert.equal(requests[1].url, '/image-api');
  assert.equal(requests[2].body.prompt, 'a moving landscape');
  assert.equal(requests[3].body.image, 'encoded-image');
  assert.equal((await fetch(base + '/status?model=video&job=123', { headers })).status, 201);
  assert.equal(requests[4].url, '/status-api?model=video&job=123');

  assert.equal((await post('/v1/models/chat/start', {})).status, 202);
  assert.equal((await post('/v1/models/chat/start', {})).status, 409);
  assert.equal((await (await fetch(base + '/v1/models', { headers })).json()).data[0].running, true);
  assert.equal((await post('/v1/models/chat/stop', {})).status, 202);
  assert.equal((await post('/v1/models/video/start', {})).status, 400);
  assert.equal((await post('/v1/models/missing/start', {})).status, 404);
});

test('rejects invalid configuration and reports backend and process failures', async t => {
  assert.throws(() => validateConfig({ profiles: [], routes: [{ method: 'POST', path: '/bad', kind: 'image', backendPath: '//other-host' }] }));
  assert.throws(() => createApp({ profiles: [], routes: [] }, ''));
  const config = {
    profiles: [{ id: 'bad', kind: 'llama.cpp', baseUrl: 'http://127.0.0.1:1', command: ['/nonexistent/alma-command'] }],
    routes: [{ method: 'POST', path: '/chat', kind: 'llama.cpp', backendPath: '/chat' }]
  };
  const server = createApp(config, 'test-key');
  const base = await listen(server);
  t.after(() => new Promise(resolve => server.close(resolve)));
  const headers = { authorization: ['Bearer', 'test-key'].join(' '), 'content-type': 'application/json' };
  assert.equal((await fetch(base + '/chat', { method: 'POST', headers, body: '{' })).status, 400);
  assert.equal((await fetch(base + '/chat', { method: 'POST', headers, body: JSON.stringify({ model: 'bad' }) })).status, 502);
  assert.equal((await fetch(base + '/v1/models/bad/start', { method: 'POST', headers })).status, 502);
});
