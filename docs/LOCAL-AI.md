# Gradify AI on a local model (Ollama + Llama 3.3 70B)

Gradify AI can run on a local open model through [Ollama](https://ollama.com) as well as on Claude. This is for
**local development and benchmarking only**. Production stays on Claude until each feature's local quality has been
measured and signed off.

- `supabase/functions/_shared/provider.js` chooses the provider for each request and talks to Ollama.
- `course-tutor` and `study-pack` both go through it. All their controls stay in place: allowances, caps, the ledger,
  the cache and the reply checks.
- `scripts/eval-tutor.mjs` and `scripts/eval-notes.mjs --ollama` benchmark the local model against Claude.

## How it fits

```
course-tutor / study-pack ──► runAi (_shared/ai.js: claim, cache, settle)
                                  │
                                  ▼
                         ai.run(mode, request, claudeCall)      _shared/provider.js
                          │                          │
               providerFor(mode) = ollama    providerFor(mode) = claude (default, always in production)
                          │                          │
                          ▼                          ▼
              Ollama /api/chat (JSON schema)   Claude Messages API (unchanged)
                          │
               fails, too long, or a PDF/photo ──► Claude (GRADIFY_AI_FALLBACK=claude, the default)
```

An Ollama reply is converted into the same shape as a Claude message (`content`, `stop_reason`, `usage`). That means
`runAi`, the ledger and each feature's `parse()` work without any changes. Structured modes pass their JSON schema
as Ollama's `format`, so the model's output is constrained to the schema. Every reply still goes through the same
`checkReply` as a Claude reply.

## Safety rules (built in)

1. **Claude is the default.** If nothing is set, nothing changes.
2. **A deployed function always uses Claude.** Ollama is only used when `SUPABASE_URL` is local (`localhost`,
   `127.0.0.1`, `kong`, `host.docker.internal`) or absent, as when a script runs. If someone sets
   `GRADIFY_AI_PROVIDER=ollama` as a production secret, it is ignored and a warning is logged. The one exception is the
   explicit `GRADIFY_AI_LOCAL_IN_PRODUCTION=yes` opt-in, meant for a future dedicated inference server.
3. **Local answers never leak into Claude results.** The response cache key and the saved-pack hash include
   `ollama/<model>`. A switch back to Claude never serves a local model's answer, or the other way round.
4. **No secrets are involved.** Ollama has no API key, and nothing about the provider reaches the browser.
5. **PDFs and photos always go to Claude.** Llama 3.3 reads text only.

## Set up Ollama (on your machine)

Llama 3.3 70B needs about **43 GB** for the default 4-bit download. That means a Mac with 64 GB+ unified memory, or
NVIDIA GPUs with about 48 GB VRAM in total. With less memory it spills into system RAM and becomes very slow. On
smaller hardware, use `llama3.1:8b` or `qwen2.5:14b` to develop the plumbing, and benchmark 70B somewhere bigger.

```bash
ollama pull llama3.3:70b
```

```bash
ollama run llama3.3:70b "Say hello in five words."
```

Ollama listens on `http://localhost:11434`. Check that the API answers:

```bash
curl http://localhost:11434/api/tags
```

## Benchmark before moving anything

Every tutor mode, local model only (free):

```bash
npm run eval:tutor
```

The same, next to Claude (costs a few pence), three runs each for reliability:

```bash
ANTHROPIC_API_KEY=... node scripts/eval-tutor.mjs --claude --runs 3
```

Study packs (flashcards, why/apply questions and the card review), local model next to both Claude models:

```bash
ANTHROPIC_API_KEY=... node scripts/eval-notes.mjs --ollama --compare --long
```

Or free, the local model only:

```bash
npm run eval:ollama
```

The automatic checks cover what the product depends on:

- the reply finished
- it is valid JSON that matches the schema
- nothing was dropped by `checkReply`
- rubric criteria were copied exactly, and no lesson ids or actions were invented
- three usable challenge questions
- for packs: key-term coverage, cards checked against the notes, invented facts and answer leaks
- latency and token counts

Accuracy, reasoning and teaching quality need a person. Every reply is saved side by side in `tests/reports/`, so
read them before moving a mode.

A reasonable bar for moving a mode to the local model:

- it passes the checks in at least 19 of 20 runs
- packs score key terms 90%+, checked 90%+, with 0 invented facts and 0 leaks
- a blind read of 10+ replies finds them as accurate as Claude's
- latency is acceptable for the mode (conversations need a few seconds; packs can take longer)

Suggested order to try, from lowest to highest risk: `card`, `questions`, `pack`, `connect`, `challenge`, `explain`,
`diagnose`, then `mark`/`debrief`. Keep `socratic`, `examiner`, `roleplay`, `director` and `coach` on Claude until
there is evidence otherwise.

## Run the Edge Functions locally on Ollama

With the Supabase CLI and Docker, create `supabase/functions/.env.local`. It is git-ignored, and none of these values
are secret:

```bash
GRADIFY_AI_PROVIDER=ollama
# or route only some features or modes, leaving the rest on Claude:
# GRADIFY_AI_ROUTES=pack=ollama,quiz=ollama,card=ollama
GRADIFY_AI_FALLBACK=claude        # "off" to see local failures instead of paying Claude to cover them
OLLAMA_MODEL=llama3.3:70b
OLLAMA_URL=http://host.docker.internal:11434   # the functions run in Docker; this reaches Ollama on your machine
OLLAMA_NUM_CTX=32768
```

```bash
supabase start
```

```bash
supabase functions serve --env-file supabase/functions/.env.local
```

Then serve the site (`npm run serve`) and point `gradify.config.js` at the local Supabase. The function logs show
one line per request with the model, the time taken and the token counts, plus a warning whenever a request falls
back to Claude. The fallback needs `ANTHROPIC_API_KEY` in the same env file. Without it, a failed local request
fails.

On Linux, Docker may need Ollama to listen on all interfaces, so start it with `OLLAMA_HOST=0.0.0.0 ollama serve`.
The local function runtime also has a wall-clock limit per request. A full study pack on 70B can exceed it, so
benchmark packs with `scripts/eval-notes.mjs`, which has no such limit.

## Settings

| Variable | Default | What it does |
|---|---|---|
| `GRADIFY_AI_PROVIDER` | `claude` | Provider for every feature: `claude` or `ollama` |
| `GRADIFY_AI_ROUTES` | none | Per feature (`tutor`, `explain`, `pack`, `quiz`) or per mode (`mark`, `card`, `socratic`, ...), e.g. `pack=ollama,tutor=claude`. A mode beats its feature. |
| `GRADIFY_AI_FALLBACK` | `claude` | `off` makes local failures fail instead of asking Claude |
| `OLLAMA_URL` | `http://localhost:11434` (scripts), `http://host.docker.internal:11434` (functions) | Where Ollama is |
| `OLLAMA_MODEL` | `llama3.3:70b` | Any model you have pulled |
| `OLLAMA_NUM_CTX` | `32768` | Context window. Ollama's own default is too small for lesson notes. Larger needs more memory. |
| `OLLAMA_TIMEOUT_MS` | `600000` | Per request |
| `GRADIFY_AI_LOCAL_IN_PRODUCTION` | unset | `yes` allows Ollama in a deployed function. Leave unset (see below). |

## The local ledger

Requests answered locally are recorded in `tutor_usage` with the model `ollama/llama3.3:70b`. `ai_cost_pence`
doesn't know that model, so it prices it at the `default` row. To make local requests cost £0 in your local
database only, run:

```sql
insert into public.ai_prices (model, input_usd, output_usd, cache_read_usd, cache_write_usd)
values ('ollama/llama3.3:70b', 0, 0, 0, 0) on conflict (model) do nothing;
```

This is deliberately not a migration. Production has no local models.

## Towards production on your own models

The code is ready for this, but the infrastructure is not. A home machine is not a production backend: it isn't always
on, it serves one request at a time, and exposing it to the internet is a security risk. Before setting
`GRADIFY_AI_LOCAL_IN_PRODUCTION=yes` anywhere, you would need:

1. **A dedicated inference server.** A cloud GPU (one 80 GB GPU runs 70B at 4-bit) with a serving stack built for
   concurrency, such as vLLM or TGI, or Ollama with `OLLAMA_NUM_PARALLEL` for light load.
2. **Authentication in front of it.** Ollama has none. Use a reverse proxy that requires a bearer token, held as a
   Supabase secret and added by `provider.js`; that is a small change when the time comes. Use HTTPS only, and never
   expose an open port.
3. **A real cost comparison.** A GPU server costs money every hour whether or not anyone uses it. Compare it against
   Claude spend at the real request volume (`scripts/ai-cost-model.mjs`). Local only wins once the volume is high and
   steady.
4. **Per-mode routing from the benchmark,** with Claude as the fallback, set through `GRADIFY_AI_ROUTES`.
