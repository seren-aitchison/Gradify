// The Organic Chemistry Lab's review pack, for an independent chemist (docs/organic-review/README.md).
//   node scripts/organic-review.mjs export          writes docs/organic-review/reference-review.csv (every reference
//                                                   reaction with the lab's own prediction) and mechanisms-review.csv
//                                                   (every mechanism step), each with empty reviewer columns
//   node scripts/organic-review.mjs import <csv>    reads a completed reference-review.csv and writes the verdicts to
//                                                   tests/data/organic-review-results.mjs
// The CSVs open in any spreadsheet. Reviewers fill in: verdict (agree / disagree / unsure), correction, comment,
// reviewer, date.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as K from "../kit/labs/chemistry/skeletal.js";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import { REFERENCE, DECLINE } from "../tests/data/organic-reference.mjs";
import { SOURCES } from "../kit/labs/chemistry/reactions/rules.js";
import { REACTIONS, instantiate } from "../kit/labs/chemistry/reactions/library.js";
import * as E from "../kit/labs/chemistry/reactions/electron-flow.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "docs/organic-review");
const cell = (v) => { const t = String(v ?? ""); return /[",\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
const csv = (rows) => rows.map((r) => r.map(cell).join(",")).join("\n") + "\n";
const nameOfSmiles = (s) => { const A = K.analyse(K.graphFromSmiles(s)); return A.name?.name ? `${A.name.name} (${s})` : s; };
const REVIEW_COLS = ["verdict (agree / disagree / unsure)", "correction", "comment", "reviewer", "date"];

function expected(e) {
  if (e === null) return "No reaction";
  if (e === DECLINE) return "Lab should decline (outside its rules)";
  if (typeof e === "string") return nameOfSmiles(e);
  if (e.products) return e.products.map(nameOfSmiles).join(" + ");
  return `major: ${e.major.map(nameOfSmiles).join("; ")}${e.minor.length ? ` | minor: ${e.minor.map(nameOfSmiles).join("; ")}` : ""}`;
}
function exportPack() {
  fs.mkdirSync(OUT, { recursive: true });
  const rows = [["id", "topic", "starting material", "reagent", "conditions", "level", "reference outcome", "lab prediction", "lab reasoning (first point)", "reference note", "sources (unchecked pointers)", "confidence", ...REVIEW_COLS]];
  for (const r of REFERENCE) {
    const m = P.drawSmiles(r.start), res = P.predict(m, r.reagent), g = P.reagentOf(r.reagent);
    const pred = res.reacts ? res.products.map((p) => `${p.role}: ${P.nameOf(p.m)}`).join("; ") + (res.byproducts.length ? ` (+ ${res.byproducts.join(", ")})` : "") : res.status === "declined" ? "Declined" : "No reaction";
    rows.push([r.id, r.topic, nameOfSmiles(r.start), g.label, g.cond, g.level, expected(r.expect), pred, res.why?.[0] || "", r.note, r.sources.map((x) => `${SOURCES[x.id] || x.id}: ${x.topic}`).join(" / "), r.confidence, ...(r.review ? [r.review.verdict, r.review.correction, r.review.note, r.review.reviewer, r.review.date] : ["", "", "", "", ""])]);
  }
  fs.writeFileSync(path.join(OUT, "reference-review.csv"), csv(rows));
  const mrows = [["mechanism", "level", "conditions", "step", "label", "arrows (electron flow)", "what the engine says happens", "explanation shown to students", ...REVIEW_COLS]];
  for (const r of REACTIONS) {
    const t = instantiate(r), rp = E.replay({ start: t.start, steps: t.steps });
    t.steps.forEach((st, k) => {
      const s = rp.states[k], arrows = E.tutorContext({ state: s, arrows: st.arrows }).arrows.map((a) => `${a.type === "single" ? "fishhook" : "curly"}: ${a.from} → ${a.to}`).join("; ");
      mrows.push([r.title, r.level, `${r.conditions.above}; ${r.conditions.below}`, k + 1, st.label, arrows, rp.results[k].steps.join(" "), st.explain, "", "", "", "", ""]);
    });
  }
  fs.writeFileSync(path.join(OUT, "mechanisms-review.csv"), csv(mrows));
  console.log(`wrote ${REFERENCE.length} reactions and ${mrows.length - 1} mechanism steps to ${path.relative(ROOT, OUT)}`);
}
function parseCsv(text) {
  const rows = []; let row = [], f = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
    else if (c === '"') q = true; else if (c === ",") { row.push(f); f = ""; } else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; } else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}
function importPack(file) {
  const [head, ...rows] = parseCsv(fs.readFileSync(file, "utf8")), col = (n) => head.findIndex((h) => h.startsWith(n));
  const ix = { id: col("id"), verdict: col("verdict"), correction: col("correction"), comment: col("comment"), reviewer: col("reviewer"), date: col("date") };
  if (Object.values(ix).some((i) => i < 0)) throw new Error("This doesn't look like reference-review.csv (missing columns).");
  const known = new Set(REFERENCE.map((r) => r.id)), out = {}, bad = [];
  for (const r of rows) {
    const v = (r[ix.verdict] || "").trim().toLowerCase(); if (!v) continue;
    if (!["agree", "disagree", "unsure"].includes(v)) { bad.push(`${r[ix.id]}: verdict “${v}”`); continue; }
    if (!known.has(r[ix.id])) { bad.push(`${r[ix.id]}: not in the reference set`); continue; }
    out[r[ix.id]] = { verdict: v, reviewer: r[ix.reviewer] || "", date: r[ix.date] || "", correction: r[ix.correction] || "", note: r[ix.comment] || "" };
  }
  if (bad.length) { console.error(`Not imported:\n  ${bad.join("\n  ")}`); process.exitCode = 1; }
  const body = `// Verdicts from the independent chemistry review of tests/data/organic-reference.mjs, written by\n// \`node scripts/organic-review.mjs import <completed csv>\`.\n//   REVIEWS[id] = { verdict: "agree" | "disagree" | "unsure", reviewer, date, correction, note }\nexport const REVIEWS = ${JSON.stringify(out, null, 2)};\n`;
  fs.writeFileSync(path.join(ROOT, "tests/data/organic-review-results.mjs"), body);
  const n = Object.values(out), c = (v) => n.filter((x) => x.verdict === v).length;
  console.log(`imported ${n.length} verdicts: ${c("agree")} agree, ${c("disagree")} disagree, ${c("unsure")} unsure`);
}

const [cmd, file] = process.argv.slice(2);
if (cmd === "export") exportPack();
else if (cmd === "import" && file) importPack(file);
else { console.log("usage: node scripts/organic-review.mjs export | import <completed reference-review.csv>"); process.exitCode = 1; }
