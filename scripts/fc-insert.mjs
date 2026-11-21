// Inserts new flashcards at the end of lessons in a notes file (docs/FLASHCARD-QUALITY.md).
// node scripts/fc-insert.mjs <notes file> <cards.json> [--replace]
// cards.json: { "<lesson number, 1-based>": [["question", "answer"], ... 10 of them], ... }
// Cards go after the lesson's last non-blank line, so after any CASE:/LAW:/DRUG: lines and every existing
// card keeps its index. Backslashes are escaped for the template literal. A lesson that already has new
// cards (relative to the baseline) is refused unless --replace, which swaps its new cards for these.
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const [file, json, flag] = process.argv.slice(2);
if (!file || !json) { console.error("usage: node scripts/fc-insert.mjs <notes file> <cards.json> [--replace]"); process.exit(2); }
const BASE = "3719ed3";
const cards = JSON.parse(readFileSync(json, "utf8"));
const base = execFileSync("git", ["show", `${BASE}:${file}`], { encoding: "utf8", maxBuffer: 1 << 28 }).split("\n");
let lines = readFileSync(file, "utf8").split("\n");
const heads = (ls) => ls.map((l, i) => (l.startsWith("## ") ? i : -1)).filter((i) => i >= 0);
const close = (ls) => { for (let i = ls.length - 1; i >= 0; i--) if (/^`;?\s*$/.test(ls[i].trim())) return i; throw new Error("no closing backtick"); };
const bad = [];
const out = {};
for (const [k, list] of Object.entries(cards)) {
  const n = +k;
  if (!Array.isArray(list) || list.length !== 10) bad.push(`lesson ${k}: need exactly 10 cards, got ${list?.length}`);
  for (const c of list || []) {
    if (!Array.isArray(c) || c.length !== 2 || typeof c[0] !== "string" || typeof c[1] !== "string") { bad.push(`lesson ${k}: each card is ["question", "answer"]`); continue; }
    for (const s of c) {
      if (!s.trim()) bad.push(`lesson ${k}: empty text`);
      if (/[`\n]|\$\{|\s\|\s/.test(s)) bad.push(`lesson ${k}: no backticks, newlines, \${ or " | " inside a card: ${s.slice(0, 60)}`);
    }
    if (c[1] && c[1].split(/\s+/).length > 40) bad.push(`lesson ${k}: answer over 40 words: ${c[0].slice(0, 60)}`);
  }
  out[n] = list;
}
if (bad.length) { console.error(bad.join("\n")); process.exit(1); }

const H = heads(lines), HB = heads(base);
if (H.length !== HB.length) { console.error(`lesson count differs from baseline (${HB.length} vs ${H.length})`); process.exit(1); }
// work from the last lesson backwards so earlier line numbers stay valid
for (const n of Object.keys(out).map(Number).sort((a, b) => b - a)) {
  if (n < 1 || n > H.length) { console.error(`no lesson ${n} (file has ${H.length})`); process.exit(1); }
  const start = H[n - 1], end = n < H.length ? H[n] : close(lines);
  const bStart = HB[n - 1], bEnd = n < HB.length ? HB[n] : close(base);
  const baseQ = base.slice(bStart, bEnd).filter((l) => /^Q: /.test(l.trim())).length;
  let seg = lines.slice(start, end);
  const curQ = seg.filter((l) => /^Q: /.test(l.trim())).length;
  if (curQ > baseQ) {
    if (flag !== "--replace") { console.error(`lesson ${n} already has ${curQ - baseQ} new cards (use --replace to swap them)`); process.exit(1); }
    // drop the trailing block of added Q lines (the new ones are the last curQ-baseQ Q lines of the lesson)
    let drop = curQ - baseQ;
    for (let i = seg.length - 1; i >= 0 && drop; i--) if (/^Q: /.test(seg[i].trim())) { seg.splice(i, 1); drop--; }
  }
  let last = seg.length - 1;
  while (last > 0 && !seg[last].trim()) last--;
  const add = out[n].map(([q, a]) => `Q: ${q.trim().replace(/\\/g, "\\\\")} | ${a.trim().replace(/\\/g, "\\\\")}`);
  seg = [...seg.slice(0, last + 1), ...add, ...seg.slice(last + 1)];
  lines = [...lines.slice(0, start), ...seg, ...lines.slice(end)];
}
writeFileSync(file, lines.join("\n"));
console.log(`inserted ${Object.keys(out).length * 10} cards into ${Object.keys(out).length} lessons of ${file}`);
