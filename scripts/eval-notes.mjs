// Evaluate study packs made from real notes.
//   node scripts/eval-notes.mjs                  browser extractor only (free, no setup)
//   ANTHROPIC_API_KEY=... node scripts/eval-notes.mjs --claude   also Gradify AI (costs a few pence per file)
//   ANTHROPIC_API_KEY=... node scripts/eval-notes.mjs --compare [--long]
//        the same notes through Claude Opus 5.5 and Claude Sonnet 5.5, side by side: quality, real tokens and real cost
//        (--long adds a lecture-length sample, about 25k characters, from Gradify's own law notes). About £1-2 a run.
//   node scripts/eval-notes.mjs --ollama [--long]   also a local model through Ollama (free; default llama3.3:70b,
//        OLLAMA_MODEL and OLLAMA_URL to change). Combine with --compare to see it next to both Claude models.
//        docs/LOCAL-AI.md has the setup.
// Add your own notes to tests/fixtures/ and the key terms a good pack must cover to expected.json.
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { browserPack, normaliseNotes } from "../kit/notes/studio.js";
import { notesSource } from "../kit/assess/canon.js";
import { ollamaMessage, OLLAMA_DEFAULT_MODEL } from "../supabase/functions/_shared/provider.js";
import { MODEL, PACK_SCHEMA, SYSTEM_PROMPT, userPrompt, cardsFromPack, packStats, REVIEW_SCHEMA, REVIEW_PROMPT, reviewRequest } from "../kit/notes/pack.js";

const DIR = new URL("../tests/fixtures/", import.meta.url);
const expected = JSON.parse(await readFile(new URL("expected.json", DIR), "utf8"));
const compare = process.argv.includes("--compare");
const useClaude = process.argv.includes("--claude") || compare;
const useOllama = process.argv.includes("--ollama");
const OLLAMA = { url: process.env.OLLAMA_URL || "http://localhost:11434", model: process.env.OLLAMA_MODEL || OLLAMA_DEFAULT_MODEL, numCtx: Number(process.env.OLLAMA_NUM_CTX) || 32768, timeoutMs: Number(process.env.OLLAMA_TIMEOUT_MS) || 1_800_000 };
const MODELS = compare ? ["claude-opus-5-5", "claude-sonnet-5-5"] : [MODEL];
// US dollars per million tokens (public.ai_prices) and the exchange rate used for costs (public.ai_settings)
const PRICES = { "claude-opus-5-5": [4, 20, 0.2, 5], "claude-sonnet-5-5": [2, 10, 0.1, 2.5] };
const pence = (model, u) => { const [i, o, cr, cw] = PRICES[model] || PRICES["claude-opus-5-5"]; return ((u.input_tokens * i + u.output_tokens * o + (u.cache_read_input_tokens || 0) * cr + (u.cache_creation_input_tokens || 0) * cw) / 1e6) * 0.79 * 100; };
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

async function claudePack(text, title, model = MODEL) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  const msg = await client.beta.messages.stream({
    model, max_tokens: 32000,
    betas: ["server-side-fallback-2026-07-01"], fallbacks: "default",
    output_config: { effort: "high", format: { type: "json_schema", schema: PACK_SCHEMA } },
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: [{ type: "text", text: userPrompt({ title, site: "Gradify", level: "undergraduate", text, today: new Date().toISOString().slice(0, 10) }) }] }],
  }).finalMessage();
  if (msg.stop_reason !== "end_turn") throw new Error(`stop_reason ${msg.stop_reason}`);
  const textOf = (m) => m.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const pack = JSON.parse(textOf(msg)), usage = { ...msg.usage };
  // the same independent review the study-pack function runs (kit/notes/pack.js: REVIEW_PROMPT)
  const rev = await client.beta.messages.stream({
    model, max_tokens: 8000, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default",
    output_config: { effort: "medium", format: { type: "json_schema", schema: REVIEW_SCHEMA } },
    system: [{ type: "text", text: REVIEW_PROMPT }],
    messages: [{ role: "user", content: [{ type: "text", text: reviewRequest(cardsFromPack(pack, text), text) }] }],
  }).finalMessage();
  if (rev.stop_reason === "end_turn") pack.review = { verdicts: JSON.parse(textOf(rev)).verdicts, model: rev.model };
  usage.input_tokens += rev.usage.input_tokens; usage.output_tokens += rev.usage.output_tokens;
  return { pack, usage, model: msg.model };
}

// the same two steps through a local model: write the pack, then review every card against the notes
async function ollamaPack(text, title) {
  const textOf = (m) => m.content.map((b) => b.text).join("");
  const gen = await ollamaMessage({ system: SYSTEM_PROMPT, schema: PACK_SCHEMA, maxTokens: 32000,
    messages: [{ role: "user", content: userPrompt({ title, site: "Gradify", level: "undergraduate", text, today: new Date().toISOString().slice(0, 10) }) }] }, OLLAMA);
  if (gen.stop_reason !== "end_turn") throw new Error(`stop_reason ${gen.stop_reason} (raise OLLAMA_NUM_CTX?)`);
  const pack = JSON.parse(textOf(gen)), usage = { ...gen.usage };
  const rev = await ollamaMessage({ system: REVIEW_PROMPT, schema: REVIEW_SCHEMA, maxTokens: 8000,
    messages: [{ role: "user", content: reviewRequest(cardsFromPack(pack, text), text) }] }, OLLAMA).catch((e) => ({ error: e }));
  if (rev.stop_reason === "end_turn") { pack.review = { verdicts: JSON.parse(textOf(rev)).verdicts, model: rev.model }; usage.input_tokens += rev.usage.input_tokens; usage.output_tokens += rev.usage.output_tokens; }
  return { pack, usage, model: gen.model };
}

function score(cards, terms) {
  const hay = cards.map((c) => norm(`${c.front} ${c.back}`)).join(" | ");
  const covered = terms.filter((t) => hay.includes(norm(t)));
  return { coverage: terms.length ? covered.length / terms.length : null, missing: terms.filter((t) => !covered.includes(t)) };
}

const rows = [];
const files = (await readdir(DIR)).filter((f) => f.endsWith(".txt")).sort();
const samples = [];
for (const f of files) samples.push([f, await readFile(new URL(f, DIR), "utf8")]);
// a lecture-length sample: the first lessons of law School 1, as a learner's typed notes (no key-term list)
if (process.argv.includes("--long")) {
  const src = notesSource(await readFile(new URL("../kit/courses/law/notes/u01.js", import.meta.url), "utf8")) || "";
  samples.push(["law-school-1 (25k)", src.slice(0, 25000)]);
}
for (const [f, text] of samples) {
  const terms = expected[f] || [];
  const engines = [["browser", async () => ({ pack: browserPack(text), notes: normaliseNotes(text) })]];
  if (useClaude) for (const model of MODELS) engines.push([model.replace("claude-", "").replace("-5-5", ""), async () => { const r = await claudePack(text, f, model); return { ...r, notes: text, pence: pence(model, r.usage) }; }]);
  if (useOllama) engines.push([OLLAMA.model.split(":")[0].slice(0, 8), async () => ({ ...(await ollamaPack(text, f)), notes: text, pence: 0 })]);
  for (const [engine, run] of engines) {
    try {
      const t0 = Date.now();
      const { pack, notes, usage, pence: cost } = await run();
      const secs = (Date.now() - t0) / 1000;
      const cards = cardsFromPack(pack, notes);
      const st = packStats(pack, cards);
      const sc = score(cards, terms);
      rows.push({ file: f, engine, ...st, coverage: sc.coverage, missing: sc.missing, tokens: usage ? usage.input_tokens + usage.output_tokens : 0, inputTokens: usage?.input_tokens ?? 0, outputTokens: usage?.output_tokens ?? 0, pence: cost ?? 0, secs, unclearNotes: pack.unclear, cardsSample: cards.slice(0, 3) });
    } catch (e) {
      rows.push({ file: f, engine, error: e.message });
    }
  }
}

const pct = (x) => (x == null ? "  -" : `${Math.round(x * 100)}%`.padStart(4));
console.log("\nfile                  engine   cards  key terms  checked  invented  leaks  long  why/apply  rejected  facts tested  out tokens   cost    secs");
for (const r of rows) {
  if (r.error) { console.log(`${r.file.padEnd(22)}${r.engine.padEnd(9)}ERROR ${r.error}`); continue; }
  console.log(`${r.file.padEnd(22)}${r.engine.padEnd(9)}${String(r.cards).padStart(5)}  ${pct(r.coverage).padStart(9)}  ${pct(r.grounded).padStart(7)}  ${String(r.ungrounded).padStart(8)}  ${String(r.answerLeaks).padStart(5)}  ${String(r.longFronts).padStart(4)}  ${`${r.why}/${r.apply}`.padStart(9)}  ${String(r.rejected ?? 0).padStart(8)}  ${pct(r.factCoverage).padStart(12)}  ${String(r.outputTokens).padStart(10)}  ${(r.pence ? `${r.pence.toFixed(1)}p` : "-").padStart(6)}  ${r.secs.toFixed(1).padStart(6)}`);
  if (r.missing?.length) console.log(`  missing: ${r.missing.join(", ")}`);
}
await mkdir(new URL("../tests/reports/", import.meta.url), { recursive: true });
const out = new URL(`../tests/reports/eval-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")}.json`, import.meta.url);
await writeFile(out, JSON.stringify(rows, null, 2));
console.log(`\nFull report: ${out.pathname}`);
console.log("What good looks like: key terms 90%+, checked 90%+, invented 0, leaks 0.");
