// "Ask your notes": finds the passages in a learner's own notes (and the text of their PDFs) that answer a question,
// with where each one is, so every answer can be checked against its source. Ranked with BM25 over passages (a
// bullet and the bullets directly inside it), and the answer is the sentences that match the question best. It
// never adds anything the notes don't say. Pure, so Node tests it (tests/kb.test.mjs).
import { plain, pathOf, docOf, nameOf } from "./model.js";

const STOP = new Set("a an and are as at be by can do does for from has have how i in is it its of on or that the their there this to was what when where which who why will with you your about into than then them they these those also not but".split(" "));
export const words = (s) => (String(s).toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").match(/[\p{L}\p{N}]+/gu) || []).filter((w) => w.length > 1 && !STOP.has(w)).map(stem);
function stem(w) { return w.length > 4 ? w.replace(/(ations?|ings?|ies|edly|ed|es|s|ly)$/, "") : w; }

/** The passages to search: every rem with text, with its children's text, plus any extra (PDF pages). */
export function passages(kb, extra = []) {
  const out = [];
  for (const r of Object.values(kb.rems)) {
    if (r.template) continue;
    const own = plain(kb, r.text);
    if (!own.trim() && !r.image?.label) continue;
    const kids = r.kids.map((k) => kb.rems[k]).filter(Boolean).map((k) => plain(kb, k.text)).filter(Boolean);
    out.push({ id: r.id, doc: docOf(kb, r.id), path: [...pathOf(kb, r.id), nameOf(kb, r.id)], text: [own || r.image?.label, ...kids].join("\n") });
  }
  return [...out, ...extra];
}
/** The best passages for a question: [{ ...passage, score, hits }], most relevant first. */
export function rank(list, q, { limit = 6 } = {}) {
  const qw = [...new Set(words(q))];
  if (!qw.length) return [];
  const toks = list.map((p) => words(p.text));
  const avg = toks.reduce((a, t) => a + t.length, 0) / Math.max(1, toks.length);
  const df = new Map(qw.map((w) => [w, toks.filter((t) => t.includes(w)).length]));
  const N = list.length, k1 = 1.4, b = 0.75;
  return list.map((p, i) => {
    const t = toks[i]; let s = 0, hits = 0;
    for (const w of qw) {
      const f = t.filter((x) => x === w).length; if (!f) continue;
      hits++;
      const idf = Math.log(1 + (N - df.get(w) + 0.5) / (df.get(w) + 0.5));
      s += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * t.length) / Math.max(1, avg))));
    }
    // a passage that's mostly the question's words, and names its topic, is better than a long one that mentions them once
    if (hits) s *= 0.6 + 0.4 * (hits / qw.length);
    return { ...p, score: s, hits };
  }).filter((p) => p.score > 0).sort((a, b2) => b2.score - a.score).slice(0, limit);
}
/** The sentences from the best passages that answer the question best, with which passage each came from. */
export function answer(found, q, { max = 3 } = {}) {
  const qw = new Set(words(q));
  const sents = found.flatMap((p, pi) => p.text.split(/(?<=[.!?])\s+|\n/).map((s) => s.trim()).filter((s) => s.length > 8).map((s) => ({ s, pi, n: words(s).filter((w) => qw.has(w)).length / Math.sqrt(1 + words(s).length / 12) })));
  const seen = new Set();
  return sents.filter((x) => x.n > 0).sort((a, b) => b.n - a.n || a.pi - b.pi).filter((x) => (seen.has(x.s.toLowerCase()) ? false : (seen.add(x.s.toLowerCase()), true))).slice(0, max);
}
