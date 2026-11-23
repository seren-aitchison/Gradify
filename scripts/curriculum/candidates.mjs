// Candidate lessons for each official requirement: a BM25 ranking over each lesson's title, objectives, key terms,
// headings, lead and summary (from the notes), used only to shortlist lessons for a reviewer to judge. A candidate
// is not a mapping: data/curriculum/mapping/<slug>-england.js records the judged matches.
//
//   node scripts/curriculum/candidates.mjs biology [k=8]   → <scratch>/candidates.json (path in CANDIDATES_OUT, default data/curriculum/mapping/.candidates-<slug>.json)
import { readFile, writeFile } from "node:fs/promises";
import { parseNotes } from "../../kit/course/notes.js";
import { norm } from "../../kit/core/text.js";
const slug = process.argv[2] || "biology", K = Number(process.argv[3] || 8);
const { UNITS } = await import(`../../kit/courses/${slug}/syllabus.js`);
const req = JSON.parse(await readFile(new URL("../../data/curriculum/requirements/england-biology.json", import.meta.url))).requirements;
const STOP = new Set("the a an and or of in on to for with by from as at is are be that this their its into how what which why including include describe explain use using understand recall students should able learners about between within such some other e g i ie can may will they them these those than more most".split(" "));
const stem = (w) => w.replace(/(ies)$/, "y").replace(/(sses)$/, "ss").replace(/([^s])s$/, "$1").replace(/(ing|ed)$/, "");
const toks = (t) => String(t).toLowerCase().replace(/\*\*|[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w)).map(stem);
const docs = [];
for (const u of UNITS) {
  const ls = parseNotes((await import(`../../kit/courses/${slug}/notes/${u.id}.js`)).default);
  const by = new Map(ls.map((L) => [norm(L.title), L]));
  for (const l of u.lessons) {
    const L = by.get(norm(l.title)); if (!L) continue;
    const f = [[l.title, 4], [l.module, 1], [L.objectives.join(" "), 2], [L.terms.map((t) => t[0]).join(" "), 2], [L.blocks.filter((b) => b.t === "h").map((b) => b.x).join(" "), 1.5], [L.lead, 1], [L.summary.join(" "), 1]];
    const tf = new Map(); let len = 0;
    for (const [t, w] of f) for (const x of toks(t)) { tf.set(x, (tf.get(x) || 0) + w); len += w; }
    docs.push({ id: l.id, title: l.title, tf, len });
  }
}
const N = docs.length, avg = docs.reduce((s, d) => s + d.len, 0) / N, df = new Map();
for (const d of docs) for (const x of d.tf.keys()) df.set(x, (df.get(x) || 0) + 1);
const score = (q, d) => { let s = 0; for (const x of new Set(q)) { const f = d.tf.get(x); if (!f) continue; const idf = Math.log(1 + (N - df.get(x) + 0.5) / (df.get(x) + 0.5)); s += idf * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * d.len / avg)); } return s; };
const out = {};
for (const r of req) {
  const q = toks(`${r.title || ""} ${r.subtopic || ""} ${r.text} ${r.include || ""}`);
  out[r.id] = docs.map((d) => [d.id, +score(q, d).toFixed(2)]).sort((a, b) => b[1] - a[1]).slice(0, K).filter((x) => x[1] > 0);
}
const path = process.env.CANDIDATES_OUT || new URL(`../../data/curriculum/mapping/.candidates-${slug}.json`, import.meta.url);
await writeFile(path, JSON.stringify(out));
console.log(`${Object.keys(out).length} requirements ranked against ${N} lessons`);
