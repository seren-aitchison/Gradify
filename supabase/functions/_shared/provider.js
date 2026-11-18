// Which model answers a Gradify AI request: Claude (the default, and the only provider in production) or a local
// Ollama model such as Llama 3.3 70B, for local development and benchmarking.
// Plain JavaScript with fetch only: it runs in Deno (the Edge Functions, served locally) and in Node (scripts, tests).
//
// An Ollama reply is shaped like a Claude message ({ model, content: [{ type: "text", text }], stop_reason, usage }),
// so runAi (_shared/ai.js), the ledger and every feature's parse() work unchanged.
//
// Settings (environment variables; none are secrets):
//   GRADIFY_AI_PROVIDER   claude (default) | ollama          the provider for every feature
//   GRADIFY_AI_ROUTES     e.g. "pack=ollama,quiz=ollama,tutor=claude"   per feature (tutor, explain, pack, quiz) or
//                         per mode (mark, explain, card, socratic, ...); a mode beats its feature, both beat the default
//   GRADIFY_AI_FALLBACK   claude (default) | off              what happens when the local model fails or can't take
//                         the request (PDFs and photos): ask Claude instead, or fail
//   OLLAMA_URL            default http://localhost:11434 in scripts, http://host.docker.internal:11434 in functions
//   OLLAMA_MODEL          default llama3.3:70b
//   OLLAMA_NUM_CTX        context window in tokens, default 32768 (Ollama's own default is far too small for notes)
//   OLLAMA_TIMEOUT_MS     default 600000 (a 70B model on one machine is slow)
//   GRADIFY_AI_LOCAL_IN_PRODUCTION   yes: allow Ollama when SUPABASE_URL is not a local Supabase. Leave unset until a
//                         dedicated, secured inference server exists (docs/LOCAL-AI.md).
//
// Safety: Ollama is only used when the backend is local (no SUPABASE_URL, as in scripts, or a localhost / Docker
// SUPABASE_URL, as under `supabase functions serve`). A deployed function always uses Claude, whatever is set.

export const OLLAMA_DEFAULT_MODEL = "llama3.3:70b";
const FEATURE = {
  mark: "tutor", roleplay: "tutor", debrief: "tutor", diagnose: "tutor", socratic: "tutor", challenge: "tutor",
  connect: "tutor", examiner: "tutor", director: "tutor", coach: "tutor",
  explain: "explain", card: "explain", pack: "pack", questions: "quiz",
};
const PROVIDERS = ["claude", "ollama"];
const LOCAL_HOSTS = ["localhost", "127.0.0.1", "[::1]", "0.0.0.0", "kong", "host.docker.internal"];

/** "pack=ollama, quiz=ollama" → { pack: "ollama", quiz: "ollama" }; unknown providers are ignored. */
export function parseRoutes(s) {
  const out = {};
  for (const part of String(s ?? "").split(",")) {
    const [k, v] = part.split(/[=:]/).map((x) => (x ?? "").trim().toLowerCase());
    if (k && PROVIDERS.includes(v)) out[k] = v;
  }
  return out;
}

/** True when SUPABASE_URL is absent (a script) or points at a local Supabase. */
export function isLocalBackend(supabaseUrl) {
  if (!supabaseUrl) return true;
  try { return LOCAL_HOSTS.includes(new URL(supabaseUrl).hostname); } catch { return false; }
}

export class LocalAiError extends Error {
  constructor(message, why = "local_failed") { super(message); this.name = "LocalAiError"; this.why = why; }
}

/** Claude-style messages → Ollama chat messages. Text only: images and PDFs throw (the caller falls back). */
export function toOllamaMessages(system, messages) {
  const out = system ? [{ role: "system", content: system }] : [];
  for (const m of messages ?? []) {
    let content = m.content;
    if (Array.isArray(content)) {
      const other = content.find((b) => b.type !== "text");
      if (other) throw new LocalAiError(`the local model can't read ${other.type} content`, "unsupported");
      content = content.map((b) => b.text).join("\n\n");
    }
    out.push({ role: m.role === "assistant" ? "assistant" : "user", content: String(content ?? "") });
  }
  return out;
}

/**
 * One request to Ollama's /api/chat, answered as a Claude-shaped message.
 * req: { system, messages, schema?, maxTokens }
 * opts: { url, model, numCtx, timeoutMs, fetch }
 */
export async function ollamaMessage(req, opts = {}) {
  const url = String(opts.url ?? "http://localhost:11434").replace(/\/+$/, "");
  const model = opts.model ?? OLLAMA_DEFAULT_MODEL;
  const system = req.schema ? `${req.system ?? ""}\n\nReply with a single JSON object that matches the required schema, and nothing else.` : req.system;
  const body = {
    model, stream: false, keep_alive: "30m",
    messages: toOllamaMessages(system, req.messages),
    options: { num_predict: req.maxTokens ?? 4000, num_ctx: opts.numCtx ?? 32768 },
    ...(req.schema ? { format: req.schema } : {}),
  };
  const started = Date.now();
  let res;
  try {
    res = await (opts.fetch ?? fetch)(`${url}/api/chat`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(opts.timeoutMs ?? 600_000) });
  } catch (e) {
    throw new LocalAiError(`Ollama at ${url} couldn't be reached (${e?.name === "TimeoutError" ? "timed out" : e?.message ?? e})`, "unreachable");
  }
  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new LocalAiError(`Ollama ${res.status}: ${detail}${res.status === 404 ? ` (run: ollama pull ${model})` : ""}`, `http_${res.status}`);
  }
  const data = await res.json();
  const text = String(data?.message?.content ?? "").trim();
  const stop = data?.done_reason === "length" ? "max_tokens" : "end_turn";
  if (stop === "end_turn" && req.schema) {
    try { JSON.parse(text); } catch { throw new LocalAiError("the local model's reply wasn't valid JSON", "bad_json"); }
  }
  if (stop === "end_turn" && !text) throw new LocalAiError("the local model gave an empty reply", "empty");
  return {
    id: `ollama-${started}`, type: "message", role: "assistant", model: `ollama/${model}`,
    content: [{ type: "text", text, citations: null }],
    stop_reason: stop, stop_sequence: null,
    usage: { input_tokens: data?.prompt_eval_count ?? 0, output_tokens: data?.eval_count ?? 0, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 },
    ms: Date.now() - started,
  };
}

/**
 * The provider settings for one process. env: (name) => string | undefined.
 * Returns { providerFor(mode), cacheModel(mode, claudeModel), run(mode, req, claudeCall), ollama: { url, model }, notice }
 */
export function aiProviders(env, defaults = {}) {
  const get = (k) => String(env(k) ?? "").trim();
  const base = get("GRADIFY_AI_PROVIDER").toLowerCase() || "claude";
  const routes = parseRoutes(get("GRADIFY_AI_ROUTES"));
  const fallback = get("GRADIFY_AI_FALLBACK").toLowerCase() !== "off";
  const local = isLocalBackend(get("SUPABASE_URL")) || get("GRADIFY_AI_LOCAL_IN_PRODUCTION").toLowerCase() === "yes";
  const ollama = {
    url: get("OLLAMA_URL") || defaults.ollamaUrl || "http://localhost:11434",
    model: get("OLLAMA_MODEL") || OLLAMA_DEFAULT_MODEL,
    numCtx: Number(get("OLLAMA_NUM_CTX")) || 32768,
    timeoutMs: Number(get("OLLAMA_TIMEOUT_MS")) || 600_000,
    fetch: defaults.fetch,
  };
  const wanted = (mode) => routes[mode] ?? routes[FEATURE[mode]] ?? (PROVIDERS.includes(base) ? base : "claude");
  const askedForLocal = base === "ollama" || Object.values(routes).includes("ollama");
  const notice = askedForLocal && !local ? "Gradify AI: Ollama is set but SUPABASE_URL isn't local, so every request uses Claude (see docs/LOCAL-AI.md)." : null;
  if (notice) console.warn(notice);
  const providerFor = (mode) => (local && wanted(mode) === "ollama" ? "ollama" : "claude");
  const log = defaults.log ?? ((...a) => console.log(...a));

  return {
    providerFor, ollama: { url: ollama.url, model: ollama.model }, notice, fallback,
    /** What the response cache is keyed on, so a local model's answers are never served when Claude is in use. */
    cacheModel: (mode, claudeModel) => (providerFor(mode) === "ollama" ? `ollama/${ollama.model}` : claudeModel),
    /** Ask the provider for this mode; claudeCall() is the feature's own Claude request, used as-is or as the fallback. */
    async run(mode, req, claudeCall) {
      if (providerFor(mode) !== "ollama") return claudeCall();
      try {
        const msg = await ollamaMessage(req, ollama);
        if (msg.stop_reason === "max_tokens") throw new LocalAiError(`the local model ran out of room (num_predict ${req.maxTokens}, num_ctx ${ollama.numCtx})`, "max_tokens");
        log(`Gradify AI: ${mode} answered by ${msg.model} in ${(msg.ms / 1000).toFixed(1)}s (${msg.usage.input_tokens} in, ${msg.usage.output_tokens} out)`);
        return msg;
      } catch (e) {
        if (!fallback) throw e;
        console.warn(`Gradify AI: ${mode} falling back to Claude: ${e?.message ?? e}`);
        return claudeCall();
      }
    },
  };
}
