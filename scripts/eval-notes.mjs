// Evaluate study packs made from real notes.
//   node scripts/eval-notes.mjs                  browser extractor only (free, no setup)
//   ANTHROPIC_API_KEY=... node scripts/eval-notes.mjs --claude   also Gradify AI (costs a few pence per file)
// Add your own notes to tests/fixtures/ and the key terms a good pack must cover to expected.json.
import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { analyseNotes, normaliseNotes } from "../kit/notes/studio.js";
import { MODEL, PACK_SCHEMA, SYSTEM_PROMPT, userPrompt, cardsFromPack, packStats } from "../kit/notes/pack.js";

const DIR = new URL("../tests/fixtures/", import.meta.url);
const expected = JSON.parse(await readFile(new URL("expected.json", DIR), "utf8"));
const useClaude = process.argv.includes("--claude");
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

async function claudePack(text, title) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic();
  const msg = await client.beta.messages.stream({
    model: MODEL, max_tokens: 32000,
    betas: ["server-side-fallback-2026-07-01"], fallbacks: "default",
    output_config: { effort: "high", format: { type: "json_schema", schema: PACK_SCHEMA } },
    system: [{ type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: [{ type: "text", text: userPrompt({ title, site: "Gradify", level: "undergraduate", text, today: new Date().toISOString().slice(0, 10) }) }] }],
  }).finalMessage();
  if (msg.stop_reason !== "end_turn") throw new Error(`stop_reason ${msg.stop_reason}`);
  const text_ = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  return { pack: JSON.parse(text_), usage: msg.usage };
}

function score(cards, terms) {
  const hay = cards.map((c) => norm(`${c.front} ${c.back}`)).join(" | ");
  const covered = terms.filter((t) => hay.includes(norm(t)));
  return { coverage: covered.length / terms.length, missing: terms.filter((t) => !covered.includes(t)) };
}

const rows = [];
const files = (await readdir(DIR)).filter((f) => f.endsWith(".txt")).sort();
for (const f of files) {
  const text = await readFile(new URL(f, DIR), "utf8");
  const terms = expected[f] || [];
  const engines = [["browser", async () => ({ pack: browserPack(text), notes: normaliseNotes(text) })]];
  if (useClaude) engines.push(["claude", async () => { const r = await claudePack(text, f); return { ...r, notes: text }; }]);
  for (const [engine, run] of engines) {
    try {
      const { pack, notes, usage } = await run();
      const cards = cardsFromPack(pack, notes);
      const st = packStats(pack, cards);
      const sc = score(cards, terms);
      rows.push({ file: f, engine, ...st, coverage: sc.coverage, missing: sc.missing, tokens: usage ? usage.input_tokens + usage.output_tokens : 0, unclearNotes: pack.unclear, cardsSample: cards.slice(0, 3) });
    } catch (e) {
      rows.push({ file: f, engine, error: e.message });
    }
  }
}

const pct = (x) => (x == null ? "  -" : `${Math.round(x * 100)}%`.padStart(4));
console.log("\nfile                  engine   cards  key terms  checked  invented  leaks  long");
for (const r of rows) {
  if (r.error) { console.log(`${r.file.padEnd(22)}${r.engine.padEnd(9)}ERROR ${r.error}`); continue; }
  console.log(`${r.file.padEnd(22)}${r.engine.padEnd(9)}${String(r.cards).padStart(5)}  ${pct(r.coverage).padStart(9)}  ${pct(r.grounded).padStart(7)}  ${String(r.ungrounded).padStart(8)}  ${String(r.answerLeaks).padStart(5)}  ${String(r.longFronts).padStart(4)}`);
  if (r.missing.length) console.log(`  missing: ${r.missing.join(", ")}`);
}
await mkdir(new URL("../tests/reports/", import.meta.url), { recursive: true });
const out = new URL(`../tests/reports/eval-${new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-")}.json`, import.meta.url);
await writeFile(out, JSON.stringify(rows, null, 2));
console.log(`\nFull report: ${out.pathname}`);
console.log("What good looks like: key terms 90%+, checked 90%+, invented 0, leaks 0.");
