// Evaluate study packs made from real notes.
//   node scripts/eval-notes.mjs                  browser extractor only (free, no setup)
//   ANTHROPIC_API_KEY=... node scripts/eval-notes.mjs --claude   also Gradify AI (costs a few pence per file)
//   ANTHROPIC_API_KEY=... node scripts/eval-notes.mjs --compare [--long]
//        the same notes through Claude Opus 5.5 and Claude Sonnet 5.5, side by side: quality, real tokens and real cost
//        (--long adds a lecture-length sample, about 25k characters, from Gradify's own law notes). About £1-2 a run.
// Add your own notes to tests/fixtures/ and the key terms a good pack must cover to expected.json.
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { analyseNotes, normaliseNotes } from "../kit/notes/studio.js";
import { notesSource } from "../kit/assess/canon.js";
import { MODEL, PACK_SCHEMA, SYSTEM_PROMPT, userPrompt, cardsFromPack, packStats } from "../kit/notes/pack.js";

const DIR = new URL("../tests/fixtures/", import.meta.url);
const expected = JSON.parse(await readFile(new URL("expected.json", DIR), "utf8"));
const compare = process.argv.includes("--compare");
const useClaude = process.argv.includes("--claude") || compare;
const MODELS = compare ? ["claude-opus-5-5", "claude-sonnet-5-5"] : [MODEL];
// US dollars per million tokens (public.ai_prices) and the exchange rate used for costs (public.ai_settings)
const PRICES = { "claude-opus-5-5": [4, 20, 0.2, 5], "claude-sonnet-5-5": [2, 10, 0.1, 2.5] };
const pence = (model, u) => { const [i, o, cr, cw] = PRICES[model] || PRICES["claude-opus-5-5"]; return ((u.input_tokens * i + u.output_tokens * o + (u.cache_read_input_tokens || 0) * cr + (u.cache_creation_input_tokens || 0) * cw) / 1e6) * 0.79 * 100; };
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Same conversion the app uses for the browser engine
function browserPack(text) {
  const a = analyseNotes(text);
  const topics = a.groups.map((g) => ({
    name: g.label,
    facts: g.facts.map((f) => {
      const card = a.cards.find((c) => f.term && c.q.toLowerCase().includes(f.term.toLowerCase())) || { type: "Definition", q: `What is ${f.term}?`, a: f.def };
      return { importance: "core", quote: f.src || f.text, page: null, card: { type: card.type === "Cloze" ? "cloze" : "definition", front: card.q, back: card.a } };
    }),
  }));
  return { topics, unclear: [] };
}

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
  const text_ = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  return { pack: JSON.parse(text_), usage: msg.usage, model: msg.model };
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
  for (const [engine, run] of engines) {
    try {
      const { pack, notes, usage, pence: cost } = await run();
      const cards = cardsFromPack(pack, notes);
      const st = packStats(pack, cards);
      const sc = score(cards, terms);
      rows.push({ file: f, engine, ...st, coverage: sc.coverage, missing: sc.missing, tokens: usage ? usage.input_tokens + usage.output_tokens : 0, inputTokens: usage?.input_tokens ?? 0, outputTokens: usage?.output_tokens ?? 0, pence: cost ?? 0, unclearNotes: pack.unclear, cardsSample: cards.slice(0, 3) });
    } catch (e) {
      rows.push({ file: f, engine, error: e.message });
    }
  }
}

const pct = (x) => (x == null ? "  -" : `${Math.round(x * 100)}%`.padStart(4));
console.log("\nfile                  engine   cards  key terms  checked  invented  leaks  long  why/apply  out tokens   cost");
for (const r of rows) {
  if (r.error) { console.log(`${r.file.padEnd(22)}${r.engine.padEnd(9)}ERROR ${r.error}`); continue; }
  console.log(`${r.file.padEnd(22)}${r.engine.padEnd(9)}${String(r.cards).padStart(5)}  ${pct(r.coverage).padStart(9)}  ${pct(r.grounded).padStart(7)}  ${String(r.ungrounded).padStart(8)}  ${String(r.answerLeaks).padStart(5)}  ${String(r.longFronts).padStart(4)}  ${`${r.why}/${r.apply}`.padStart(9)}  ${String(r.outputTokens).padStart(10)}  ${r.pence ? `${r.pence.toFixed(1)}p` : "-"}`);
  if (r.missing?.length) console.log(`  missing: ${r.missing.join(", ")}`);
}
await mkdir(new URL("../tests/reports/", import.meta.url), { recursive: true });
const out = new URL(`../tests/reports/eval-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")}.json`, import.meta.url);
await writeFile(out, JSON.stringify(rows, null, 2));
console.log(`\nFull report: ${out.pathname}`);
console.log("What good looks like: key terms 90%+, checked 90%+, invented 0, leaks 0.");
