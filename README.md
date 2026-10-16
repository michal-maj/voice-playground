# ElevenLabs Voice Playground

A small **React + TypeScript + Node.js** experiment using the ElevenLabs Text-to-Speech API. Built to explore the developer integration experience and deliver a polished, understandable UI.

## Features
- Browse voices available to your ElevenLabs account
- Generate speech from text and play or download the MP3
- Validation, loading/error/empty states, keyboard-accessible native controls
- Server-side API proxy: **the ElevenLabs API key is never sent to the browser**

## Setup

Requirements: Node.js 20+ and an [ElevenLabs API key](https://elevenlabs.io/app/settings/api-keys). API access and available voices may depend on your account and quota.

```bash
npm install
cp .env.example .env
# Edit .env and set ELEVENLABS_API_KEY
npm run dev
```

Open http://localhost:5173. The UI calls the local API server (port 3001) via Vite proxy.

## Architecture

`React browser → /api/voices or /api/speech → Express API proxy → ElevenLabs REST API`

The server handles API authentication, validates incoming payloads using Zod, times out failed requests, and translates upstream failures into user-friendly messages.

## Design decisions & limitations

- The project uses `eleven_multilingual_v2` for predictable text-to-speech generation and `mp3_44100_128` output. Some accounts may have limited model/output-format access.
- Input is limited to 1,000 characters to reduce accidental credit usage. API usage may incur costs; consult your ElevenLabs plan.
- Audio is held in a temporary browser object URL, never uploaded to a storage service.
- **Local demo only**: the `/api/speech` route has no authentication or rate limiting. Before public hosting, add user authentication, per-user quotas/rate limits, cost controls and monitoring. Never expose an unrestricted public API proxy with your paid key.
- No live demo deployed by default. Add screenshots only after you have run and checked the application.

## Future improvements

Streaming playback, request cancellation, voice search/pagination, request/usage metrics, unit tests and end-to-end tests.

## References
- [Create speech API](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)
- [List voices API](https://elevenlabs.io/docs/api-reference/voices/search)

**Independent learning project, not affiliated with ElevenLabs.**
