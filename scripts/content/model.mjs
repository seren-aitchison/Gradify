// Model calls for the content engine: the fixed, cached prefix per job type, fast mode (standard API, parallel) and
// cheap mode (Message Batches, half price), research with web search, and a spend ledger that stops new work at the
// budget. Modelled on scripts/eval-notes.mjs. Tests inject a fake `call` instead (scripts/content/loop.mjs).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { CONFIG, ROOT } from "./lib.mjs";

// ---------- the fixed prefix per job type: rules, then format, then examples. No dates, no ids. ----------
const read = (p) => readFileSync(new URL(p, ROOT), "utf8");
const notesHeader = () => read("kit/course/notes.js").split("\n").filter((l) => l.startsWith("//")).join("\n");
const examples = () => { const d = new URL("prompts/examples/", ROOT); return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith(".txt")).sort().map((f) => `### Example: ${f.replace(/\.txt$/, "")}\n${readFileSync(new URL(f, d), "utf8").trim()}`).join("\n\n") : ""; };
const rules = () => existsSync(new URL("prompts/rules.md", ROOT)) ? read("prompts/rules.md") : "";
const PREFIX = {
  research: () => [read("prompts/research.md"), read("prompts/shorthand.md")],
  write: () => [`${read("prompts/writer.md")}\n\n${rules()}`, `${read("docs/CURRICULUM_CONTENT_STANDARD.md")}\n\n## The notes format (kit/course/notes.js)\n${notesHeader()}\n\n${read("prompts/shorthand.md")}`, examples()],
  repair: () => PREFIX.write(),
  review: () => [read("prompts/review.md"), read("prompts/shorthand.md")],
};
const cache = new Map();
/** the system blocks for a job: byte-identical across calls, cache breakpoint on the last block */
export function systemFor(job) {
  if (!cache.has(job)) {
    const parts = PREFIX[job]().filter(Boolean);
    cache.set(job, parts.map((text, i) => ({ type: "text", text, ...(i === parts.length - 1 ? { cache_control: { type: "ephemeral" } } : {}) })));
  }
  return cache.get(job);
}

// ---------- spend ----------
export const spend = { usd: 0, calls: 0, byJob: {}, cacheRead: 0, cacheWrite: 0, input: 0, output: 0, searches: 0 };
export class BudgetExceeded extends Error {}
export function costOf(model, u, { batch = false } = {}) {
  const [i, o, cr, cw] = CONFIG.pricesUsdPerMTok[model] || CONFIG.pricesUsdPerMTok[CONFIG.models.write];
  const tokens = ((u.input_tokens || 0) * i + (u.output_tokens || 0) * o + (u.cache_read_input_tokens || 0) * cr + (u.cache_creation_input_tokens || 0) * cw) / 1e6;
  return tokens * (batch ? 0.5 : 1) + (u.server_tool_use?.web_search_requests || 0) * 0.01;
}
function record(job, model, u, opts) {
  const c = costOf(model, u, opts);
  spend.usd += c; spend.calls++; spend.byJob[job] = (spend.byJob[job] || 0) + c;
  spend.input += u.input_tokens || 0; spend.output += u.output_tokens || 0; spend.cacheRead += u.cache_read_input_tokens || 0; spend.cacheWrite += u.cache_creation_input_tokens || 0;
  spend.searches += u.server_tool_use?.web_search_requests || 0;
}
export const budgetLeft = () => (Number(process.env.CONTENT_BUDGET_USD) || CONFIG.budgetUsd) - spend.usd;
const guard = () => { if (budgetLeft() <= 0) throw new BudgetExceeded(`budget of $${CONFIG.budgetUsd} reached ($${spend.usd.toFixed(2)} spent)`); };

let clientP = null;
const client = () => (clientP ||= import("@anthropic-ai/sdk").then(({ default: Anthropic }) => new Anthropic()));
const textOf = (m) => m.content.filter((b) => b.type === "text").map((b) => b.text).join("");
const params = (job, user) => ({
  model: CONFIG.models[job], max_tokens: CONFIG.maxTokens[job],
  output_config: { effort: CONFIG.effort[job] },
  system: systemFor(job),
  messages: [{ role: "user", content: user }],
});

/** one standard call (fast mode). Research gets web search and resumes server-paused turns. */
export async function call(job, user) {
  guard();
  const c = await client(), p = params(job, user);
  if (job === "research") p.tools = [{ type: "web_search_20260209", name: "web_search", max_uses: CONFIG.webSearchMaxUses }];
  let msg, messages = p.messages;
  for (let turn = 0; turn < 6; turn++) {
    msg = await c.beta.messages.stream({ ...p, messages, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" }).finalMessage();
    record(job, msg.model, msg.usage);
    if (msg.stop_reason !== "pause_turn") break;
    messages = [...messages, { role: "assistant", content: msg.content }];
  }
  if (msg.stop_reason === "refusal") throw new Error(`${job}: refused (${msg.stop_details?.category || "no category"})`);
  if (msg.stop_reason === "max_tokens") throw new Error(`${job}: hit max_tokens (${p.max_tokens})`);
  return textOf(msg);
}

/** many calls of one job type: in parallel (fast) or as one Message Batch (cheap). Returns Map key → text | Error */
export async function many(job, items, { mode = CONFIG.mode, callFn = call } = {}) {
  const out = new Map();
  if (mode === "cheap" && job !== "research" && callFn === call) return batch(job, items);
  const queue = [...items], workers = Array.from({ length: Math.min(CONFIG.concurrency, queue.length) }, async () => {
    for (let it; (it = queue.shift());) { try { out.set(it.key, await callFn(job, it.user)); } catch (e) { if (e instanceof BudgetExceeded) throw e; out.set(it.key, e); } }
  });
  await Promise.all(workers);
  return out;
}
async function batch(job, items) {
  guard();
  const c = await client(), out = new Map();
  const ids = new Map(items.map((it, i) => [`r${i}`, it.key]));
  const b = await c.messages.batches.create({ requests: items.map((it, i) => ({ custom_id: `r${i}`, params: params(job, it.user) })) });
  const until = Date.now() + CONFIG.batchWaitMinutes * 60e3;
  let s = b;
  while (s.processing_status !== "ended") {
    if (Date.now() > until) { await c.messages.batches.cancel(b.id).catch(() => {}); throw new Error(`batch ${b.id} didn't finish in ${CONFIG.batchWaitMinutes} minutes (cancelled)`); }
    await new Promise((r) => setTimeout(r, 30e3));
    s = await c.messages.batches.retrieve(b.id);
  }
  for await (const r of await c.messages.batches.results(b.id)) {
    const key = ids.get(r.custom_id);
    if (r.result.type === "succeeded") { record(job, r.result.message.model, r.result.message.usage, { batch: true }); out.set(key, textOf(r.result.message)); }
    else out.set(key, new Error(`${job}: ${r.result.type}`));
  }
  return out;
}
