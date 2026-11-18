// Choosing Claude or a local Ollama model for Gradify AI (supabase/functions/_shared/provider.js): routing per
// feature and mode, the guard that keeps deployed functions on Claude, the fallback to Claude, and Ollama replies
// shaped so runAi and every parse() work unchanged. Ollama is faked: no model is needed to run these.
import { test } from "node:test";
import assert from "node:assert/strict";
import { aiProviders, ollamaMessage, toOllamaMessages, parseRoutes, isLocalBackend, LocalAiError } from "../supabase/functions/_shared/provider.js";
import { runAi } from "../supabase/functions/_shared/ai.js";

const envOf = (o) => (k) => o[k];
const quiet = () => {};
const ollamaReply = (o = {}) => ({ model: "llama3.3:70b", message: { role: "assistant", content: '{"answer":"Because it is an invitation to treat.","fromLesson":true}' }, done: true, done_reason: "stop", prompt_eval_count: 900, eval_count: 40, ...o });
function fakeOllama(reply = ollamaReply(), status = 200) {
  const seen = [];
  const fetch = async (url, init) => { seen.push({ url, body: JSON.parse(init.body) }); return { ok: status < 300, status, json: async () => reply, text: async () => JSON.stringify(reply) }; };
  return { fetch, seen };
}
const claudeMsg = { model: "claude-opus-5-5", stop_reason: "end_turn", content: [{ type: "text", text: '{"answer":"Claude says.","fromLesson":true}' }], usage: { input_tokens: 1, output_tokens: 1 } };
const req = { system: "You are a tutor.", messages: [{ role: "user", content: "Why?" }], schema: { type: "object" }, maxTokens: 1500 };

test("Claude is the default for every mode, and nothing reaches Ollama", async () => {
  const o = fakeOllama();
  const ai = aiProviders(envOf({}), { fetch: o.fetch, log: quiet });
  for (const m of ["mark", "explain", "pack", "questions", "card"]) assert.equal(ai.providerFor(m), "claude");
  assert.equal(await ai.run("explain", req, async () => claudeMsg), claudeMsg);
  assert.equal(o.seen.length, 0);
  assert.equal(ai.cacheModel("explain", "claude-opus-5-5"), "claude-opus-5-5", "Claude cache keys are unchanged");
});

test("routes pick a provider per feature or mode; a mode beats its feature, both beat the default", () => {
  assert.deepEqual(parseRoutes("pack=ollama, quiz:OLLAMA, tutor=claude, x=gpt"), { pack: "ollama", quiz: "ollama", tutor: "claude" });
  const ai = aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama", GRADIFY_AI_ROUTES: "tutor=claude,mark=ollama" }), { log: quiet });
  assert.equal(ai.providerFor("pack"), "ollama");
  assert.equal(ai.providerFor("socratic"), "claude", "the tutor feature is routed to Claude");
  assert.equal(ai.providerFor("mark"), "ollama", "the mode overrides its feature");
  assert.equal(ai.cacheModel("pack", "claude-sonnet-5-5"), "ollama/llama3.3:70b", "local answers get their own cache key");
});

test("a deployed function always uses Claude, whatever is set", () => {
  const warn = console.warn; const warned = []; console.warn = (m) => warned.push(m);
  try {
    const ai = aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama", SUPABASE_URL: "https://abcd.supabase.co" }), { log: quiet });
    assert.equal(ai.providerFor("pack"), "claude");
    assert.match(warned[0], /isn't local/);
    assert.equal(aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama", SUPABASE_URL: "http://kong:8000" }), { log: quiet }).providerFor("pack"), "ollama", "supabase functions serve");
    assert.equal(aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama", SUPABASE_URL: "https://abcd.supabase.co", GRADIFY_AI_LOCAL_IN_PRODUCTION: "yes" }), { log: quiet }).providerFor("pack"), "ollama", "only with the explicit opt-in");
  } finally { console.warn = warn; }
  assert.ok(isLocalBackend(undefined)); assert.ok(isLocalBackend("http://127.0.0.1:54321")); assert.ok(!isLocalBackend("not a url"));
});

test("an Ollama reply is shaped like a Claude message, so runAi and parse() work unchanged", async () => {
  const o = fakeOllama();
  const ai = aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama", OLLAMA_URL: "http://gpu:11434/" }), { fetch: o.fetch, log: quiet });
  const settles = [];
  const deps = { claim: async () => ({ usage_id: 1, plan: "free", used: 1, allowance: 5, counted: true }), settle: async (id, t) => { settles.push(t); return 0; } };
  const out = await runAi(deps, { mode: "explain", call: () => ai.run("explain", req, async () => { throw new Error("Claude not called"); }), parse: (m) => JSON.parse(m.content[0].text) });
  assert.equal(out.status, 200);
  assert.equal(out.body.answer, "Because it is an invitation to treat.");
  assert.deepEqual({ model: settles[0].model, input: settles[0].input, output: settles[0].output, outcome: settles[0].outcome }, { model: "ollama/llama3.3:70b", input: 900, output: 40, outcome: "ok" });
  const sent = o.seen[0];
  assert.equal(sent.url, "http://gpu:11434/api/chat");
  assert.equal(sent.body.model, "llama3.3:70b"); assert.equal(sent.body.stream, false);
  assert.deepEqual(sent.body.format, { type: "object" }, "the JSON schema constrains the local model's output");
  assert.equal(sent.body.options.num_predict, 1500); assert.equal(sent.body.options.num_ctx, 32768);
  assert.equal(sent.body.messages[0].role, "system"); assert.match(sent.body.messages[0].content, /You are a tutor\.[\s\S]*JSON/);
});

test("when the local model fails, Claude answers instead, unless the fallback is off", async () => {
  const warn = console.warn; console.warn = () => {};
  try {
    for (const [what, o] of [["down", fakeOllama({ error: "boom" }, 500)], ["not pulled", fakeOllama({ error: "model not found" }, 404)],
      ["bad JSON", fakeOllama(ollamaReply({ message: { content: "Sure! Here is" } }))], ["too long", fakeOllama(ollamaReply({ done_reason: "length" }))]]) {
      const ai = aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama" }), { fetch: o.fetch, log: quiet });
      assert.equal(await ai.run("explain", req, async () => claudeMsg), claudeMsg, what);
      const strict = aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama", GRADIFY_AI_FALLBACK: "off" }), { fetch: o.fetch, log: quiet });
      await assert.rejects(strict.run("explain", req, async () => claudeMsg), LocalAiError, what);
    }
    const unreachable = aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama", GRADIFY_AI_FALLBACK: "off" }), { fetch: async () => { throw new TypeError("fetch failed"); }, log: quiet });
    await assert.rejects(unreachable.run("explain", req, async () => claudeMsg), /couldn't be reached/);
  } finally { console.warn = warn; }
});

test("PDFs and photos can't go to a text-only local model: Claude reads them", async () => {
  assert.throws(() => toOllamaMessages("s", [{ role: "user", content: [{ type: "document", source: {} }, { type: "text", text: "x" }] }]), /document/);
  assert.deepEqual(toOllamaMessages("s", [{ role: "user", content: [{ type: "text", text: "a" }, { type: "text", text: "b" }] }, { role: "assistant", content: "c" }]),
    [{ role: "system", content: "s" }, { role: "user", content: "a\n\nb" }, { role: "assistant", content: "c" }]);
  const warn = console.warn; console.warn = () => {};
  try {
    const o = fakeOllama();
    const ai = aiProviders(envOf({ GRADIFY_AI_PROVIDER: "ollama" }), { fetch: o.fetch, log: quiet });
    const photo = { ...req, messages: [{ role: "user", content: [{ type: "image", source: {} }, { type: "text", text: "notes" }] }] };
    assert.equal(await ai.run("pack", photo, async () => claudeMsg), claudeMsg);
    assert.equal(o.seen.length, 0, "never sent to Ollama");
  } finally { console.warn = warn; }
});

test("free-text replies (conversations) need no schema", async () => {
  const o = fakeOllama(ollamaReply({ message: { content: "What makes a promise binding?" } }));
  const msg = await ollamaMessage({ system: "s", messages: [{ role: "user", content: "Begin." }], schema: null, maxTokens: 500 }, { fetch: o.fetch });
  assert.equal(msg.content[0].text, "What makes a promise binding?");
  assert.equal(o.seen[0].body.format, undefined);
  assert.equal(msg.stop_reason, "end_turn");
});
