// The Organic Chemistry Lab's review pack, for an independent chemist (docs/organic-review/README.md).
//   node scripts/organic-review.mjs export          writes docs/organic-review/reference-review.csv (every reference
//                                                   reaction with the lab's own prediction) and mechanisms-review.csv
//                                                   (every mechanism step), each with empty reviewer columns
//   node scripts/organic-review.mjs import <csv>    reads a completed reference-review.csv and writes the verdicts to
//                                                   kit/labs/chemistry/reactions/reviews.js
// The CSVs open in any spreadsheet. Reviewers fill in: verdict (agree / disagree / unsure), correction, comment,
// reviewer, date. An import adds to the verdicts already recorded: a blank row leaves its case as it was, the verdict
// "clear" removes a recorded one, and any invalid row stops the import before anything is written.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as K from "../kit/labs/chemistry/skeletal.js";
import * as P from "../kit/labs/chemistry/reactions/predictor.js";
import { REFERENCE, DECLINE, expectKey } from "../tests/data/organic-reference.mjs";
import { SOURCES } from "../kit/labs/chemistry/reactions/rules.js";
import { REACTIONS, instantiate } from "../kit/labs/chemistry/reactions/library.js";
import * as E from "../kit/labs/chemistry/reactions/electron-flow.js";
import { REVIEWS } from "../kit/labs/chemistry/reactions/reviews.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "docs/organic-review");
// A spreadsheet treats a cell starting with = + - @ as a formula, also after leading spaces or control characters, and
// a leading tab or CR can smuggle one in. Such text (from the reference set or a recorded review) is neutralised
// with a leading apostrophe, which spreadsheets show as plain text; a plain number such as -3 or +1.5 is left as it is.
const NUMBER = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
export const neutralise = (t) => (NUMBER.test(t) || !/^[\s\0-\x1f\x7f]*[=+\-@\uff1d\uff0b\uff0d\uff20]|^[\t\r]/.test(t) ? t : `'${t}`);
export const cell = (v) => { const t = neutralise(String(v ?? "")); return /[",\n\r]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t; };
export const csv = (rows) => rows.map((r) => r.map(cell).join(",")).join("\n") + "\n";
const nameOfSmiles = (s) => { const A = K.analyse(K.graphFromSmiles(s)); return A.name?.name ? `${A.name.name} (${s})` : s; };
const REVIEW_COLS = ["verdict (agree / disagree / unsure)", "correction", "comment", "reviewer", "date"];

function expected(e) {
  if (e === null) return "No reaction";
  if (e === DECLINE) return "Not supported: the lab should decline";
  if (typeof e === "string") return nameOfSmiles(e);
  if (e.products) return e.products.length ? e.products.map(nameOfSmiles).join(" + ") : `No organic product${e.byproducts?.length ? ` (${e.byproducts.join(" + ")})` : ""}`;
  return `major: ${e.major.map(nameOfSmiles).join("; ")}${e.minor.length ? ` | minor: ${e.minor.map(nameOfSmiles).join("; ")}` : ""}`;
}
/** The rows of reference-review.csv (header first), for `cases` (default: the whole reference set). */
export function referenceRows(cases = REFERENCE) {
  // the reviewer columns start empty every time: a recorded verdict is shown read-only beside them, so returning an old
  // sheet can't quietly restore a verdict that has since been replaced (only what the reviewer types is imported)
  const rows = [["id", "topic", "starting material", "reagent", "conditions", "level", "reference outcome", "lab prediction", "lab reasoning (first point)", "reference note", "sources (unchecked pointers)", "confidence", "recorded review (read-only)", "expectation key (do not edit)", ...REVIEW_COLS]];
  for (const r of cases) {
    const m = P.drawSmiles(r.start), res = P.predict(m, r.reagent), g = P.reagentOf(r.reagent);
    const pred = res.reacts ? (res.products.length ? res.products.map((p) => `${p.role}: ${P.nameOf(p.m)}`).join("; ") : "No organic product") + (res.byproducts.length ? ` (+ ${res.byproducts.join(", ")})` : "") : res.outcome === "unsupported" ? "Not supported (declined)" : "No reaction";
    const recorded = r.review ? `${r.review.verdict}${r.review.reviewer ? ` by ${r.review.reviewer}` : ""}${r.review.date ? `, ${r.review.date}` : ""}${r.review.note ? `: ${r.review.note}` : ""}${r.stale ? " (the expected outcome has changed since: please review again)" : ""}` : "";
    rows.push([r.id, r.topic, nameOfSmiles(r.start), g.label, g.cond, g.level, expected(r.expect), pred, res.why?.[0] || "", r.note, r.sources.map((x) => `${SOURCES[x.id] || x.id}: ${x.topic}`).join(" / "), r.confidence, recorded, expectKey(r.expect), "", "", "", "", ""]);
  }
  return rows;
}
function exportPack() {
  fs.mkdirSync(OUT, { recursive: true });
  const rows = referenceRows();
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
  // a file that ends inside a quoted field was cut off: refuse it rather than import a truncated last row
  if (q) throw new Error("The CSV ends inside a quoted field (the file looks truncated): nothing was imported.");
  if (f || row.length) { row.push(f); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}
/**
 * The verdicts after importing a completed CSV over the ones already recorded: { reviews, bad, changed }. A row with a
 * verdict replaces that case's record; "clear" removes it; a blank row changes nothing (a partial return keeps earlier
 * verdicts, and a recorded disagreement stays disputed until it is resolved). `bad` lists invalid rows: when it isn't
 * empty the caller must not write anything.
 */
export function mergeReviews(existing, csvText, known) {
  const [head = [], ...rows] = parseCsv(csvText), col = (n) => head.findIndex((h) => h.startsWith(n));
  const ix = { id: col("id"), verdict: col("verdict"), correction: col("correction"), comment: col("comment"), reviewer: col("reviewer"), date: col("date") };
  if (Object.values(ix).some((i) => i < 0)) throw new Error("This doesn't look like reference-review.csv (missing columns).");
  // the outcome the reviewer was shown travels with the sheet; an older sheet without the column records none
  const keyCol = col("expectation key");
  const reviews = { ...existing }, bad = [], changed = [], stale = [];
  for (const r of rows) {
    const id = r[ix.id], v = (r[ix.verdict] || "").trim().toLowerCase(); if (!v) continue;
    if (!known.has(id)) { bad.push(`${id}: not in the reference set`); continue; }
    if (v === "clear") { if (id in reviews) { delete reviews[id]; changed.push(id); } continue; }
    if (!["agree", "disagree", "unsure"].includes(v)) { bad.push(`${id}: verdict “${v}” (use agree, disagree, unsure or clear)`); continue; }
    // the verdict is bound to the outcome on the reviewer's sheet, not today's: if the case has changed since the sheet
    // was exported, an agreement stays provisional (confidenceOf sees the keys differ) until the new outcome is reviewed
    const seen = keyCol >= 0 ? r[keyCol] || undefined : undefined;
    reviews[id] = { verdict: v, reviewer: r[ix.reviewer] || "", date: r[ix.date] || "", correction: r[ix.correction] || "", note: r[ix.comment] || "", expect: seen };
    if (v === "agree" && known instanceof Map && seen !== known.get(id)) stale.push(id);
    changed.push(id);
  }
  return { reviews, bad, changed, stale };
}
function importPack(file) {
  const { reviews: out, bad, changed, stale } = mergeReviews(REVIEWS, fs.readFileSync(file, "utf8"), new Map(REFERENCE.map((r) => [r.id, expectKey(r.expect)])));
  if (bad.length) { console.error(`Nothing imported: fix these rows and import again (reviews.js is unchanged).\n  ${bad.join("\n  ")}`); process.exitCode = 1; return; }
  const body = `// Verdicts from the independent chemistry review of the lab's reference set (tests/data/organic-reference.mjs),\n// written by \`node scripts/organic-review.mjs import <completed csv>\`. Read by rules.js (disputed rules).\n//   REVIEWS[id] = { verdict: "agree" | "disagree" | "unsure", reviewer, date, correction, note, expect (the outcome reviewed) }\nexport const REVIEWS = ${JSON.stringify(out, null, 2)};\n`;
  // written whole to a temporary file beside it, then renamed over it: a failed write leaves the old reviews.js intact
  const dest = path.join(ROOT, "kit/labs/chemistry/reactions/reviews.js"), tmp = `${dest}.${process.pid}.tmp`;
  try { fs.writeFileSync(tmp, body); fs.renameSync(tmp, dest); } catch (e) { try { fs.rmSync(tmp, { force: true }); } catch { /* nothing to remove */ } throw e; }
  const n = Object.values(out), c = (v) => n.filter((x) => x.verdict === v).length;
  if (stale.length) console.warn(`${stale.length} agreement${stale.length === 1 ? " was" : "s were"} given on an older outcome and stay provisional until reviewed again: ${stale.join(", ")}`);
  console.log(`imported ${changed.length} change${changed.length === 1 ? "" : "s"}; ${n.length} verdicts recorded: ${c("agree")} agree, ${c("disagree")} disagree, ${c("unsure")} unsure`);
}

// run as a command (tests import mergeReviews without running it)
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [cmd, file] = process.argv.slice(2);
  if (cmd === "export") exportPack();
  else if (cmd === "import" && file) importPack(file);
  else { console.log("usage: node scripts/organic-review.mjs export | import <completed reference-review.csv>"); process.exitCode = 1; }
}
