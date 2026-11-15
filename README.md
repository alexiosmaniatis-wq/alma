# Alma

Alma is a small local API gateway for AI backends. It routes requests by model
profile, supports custom endpoint mappings, and can start and stop configured
llama.cpp server processes. It does not install models or perform inference
itself: install and run llama.cpp and the image/video backends separately.

## Setup

Requires Node.js 20 or newer. Copy `config.example.json` to `config.json`,
then edit the profiles, executable, model path, ports, and routes for your
installation. `config.json` is ignored by Git. The sample image and video
addresses and APIs are placeholders, not bundled services. Each configured
backend must support the corresponding request and response format.

```sh
cp config.example.json config.json
export ALMA_API_KEY="$(openssl rand -hex 32)"
export ALMA_AUTH="$(printf '%s: %s %s' Authorization Bearer "$ALMA_API_KEY")"
npm start
```

Alma listens only on `127.0.0.1:3000`. Set `ALMA_PORT` to change the port or
`ALMA_CONFIG` to select another JSON configuration file. Restart Alma after
editing the configuration. Every request requires `Authorization: Bearer`
followed by the API key. Keep the key and configuration private; do not expose
the service to untrusted users or networks.

## Profiles and routes

Each profile has a unique `id`, a `kind` (`llama.cpp`, `image`, or `video`),
and a backend `baseUrl`. Optional `backendModel` replaces the selected model ID
when forwarding requests. Optional `defaults` provides JSON request fields;
request fields override them. For llama.cpp, an optional `command` array
specifies the executable and arguments, without a shell. Adjust the example
`-m`, `-c`, GPU, and other llama-server flags for your hardware and model.
Make sure the command's host and port match its `baseUrl`. A profile without
`command` can use an already running backend.

Routes map a local `path` and `method` (`GET` or `POST`) to a `backendPath`
and profile `kind`. Paths are absolute paths on the configured backend origin;
backend URL path prefixes are not used. All POST routes accept a JSON object
with a `model` profile ID. GET routes select the model using a `model` query
parameter and forward the remaining query parameters. Responses, including
streaming responses, are forwarded from the backend. Requests time out after
120 seconds and JSON request bodies are limited to 20 MiB.

```sh
# List profiles and process status.
curl -H "$ALMA_AUTH" http://127.0.0.1:3000/v1/models

# Start the configured llama-server process, then send a chat request.
curl -X POST -H "$ALMA_AUTH" http://127.0.0.1:3000/v1/models/local-chat/start
curl -H "$ALMA_AUTH" -H "Content-Type: application/json" \
  -d '{"model":"local-chat","messages":[{"role":"user","content":"Hello"}]}' \
  http://127.0.0.1:3000/v1/chat/completions
curl -X POST -H "$ALMA_AUTH" http://127.0.0.1:3000/v1/models/local-chat/stop
```

`running` means Alma started a process that has not exited, not that it is
ready for inference. Processes started outside Alma are not tracked. Stop sends
SIGTERM; Alma also sends SIGTERM to its managed processes on shutdown.

## Image and video

Configure routes to match your actual backend. The example maps text-to-image,
text-to-video, image-to-video, and video job-status endpoints. Alma passes
fields through; it does not translate between different backend APIs or manage
generation jobs. For example, with a backend that accepts these fields:

```sh
curl -H "$ALMA_AUTH" -H "Content-Type: application/json" \
  -d '{"model":"local-image","prompt":"A mountain at sunrise"}' \
  http://127.0.0.1:3000/v1/images/generations
curl -H "$ALMA_AUTH" -H "Content-Type: application/json" \
  -d '{"model":"local-video","prompt":"A mountain at sunrise, clouds moving"}' \
  http://127.0.0.1:3000/v1/videos/generations
curl -H "$ALMA_AUTH" -H "Content-Type: application/json" \
  -d '{"model":"local-video","image":"BASE64_IMAGE","prompt":"Animate the clouds"}' \
  http://127.0.0.1:3000/v1/videos/image-to-video
curl -H "$ALMA_AUTH" \
  'http://127.0.0.1:3000/v1/videos/status?model=local-video&job=JOB_ID'
```

Use the image representation, job ID, field names, and output format required
by your backend. Some systems such as workflow-based image generators need an
adapter exposing a compatible HTTP API. Alma does not send backend credentials
or follow backend redirects. Configure only trusted backend URLs and commands:
configuration controls network destinations and executable processes.

## Tests

Run `npm test`. No package installation is required.

Possible next steps include model download/version management, a job queue,
backend-specific adapters, readiness checks, and hardware-aware profiles.