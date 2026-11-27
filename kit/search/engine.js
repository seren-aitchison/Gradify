// The search engine behind every Gradify search box (pure; tests/search.test.mjs). Sources (kit/search/sources.js)
// turn lessons, flashcards, questions, notes, mind maps, collections, tasks, the curriculum, screens and actions into
// documents; this file finds, ranks, groups and explains them.
//
//   const ix = buildIndex(docs)                      once per set of sources (cheap: words are worked out once)
//   const r = search(ix, parseQuery("equilibrium"), { context })
//   r.groups  [{ type, title, items: [hit…], total }]   in the order a learner reads them: Lessons, Flashcards,
//             Questions, Notes, Mind maps, Curriculum, then the rest
//   r.counts  { lesson: 12, pack: 1, … }   matches per type before any type filter (the chips' numbers)
//   r.recover when nothing matched: did you mean, what to loosen, and somewhere to browse instead
//   suggest(ix, "equi", { history, saved })  autocomplete while typing
//
// A document: { id, type, title, sub?, body?, terms?: [], crumbs?: [{ label, href? }], href? | run?, icon?,
//   course?, subject?, board?: [], qual?: [], status?: [], done?: bool, difficulty?: 1–3, folders?: [ids],
//   lesson?, created?, modified?, count?, countLabel?, preview?, weight? }
// A hit is the document plus { score, html (title with the matched words marked), snippet (html), why }.
import { words, TYPES } from "./query.js";
import { esc } from "../core/text.js";

// the order groups are shown in, and how many each shows before "Show all"
export const GROUPS = [
  ["lesson", "Lessons", 6], ["pack", "Flashcards", 4], ["question", "Questions", 4], ["note", "Notes", 4], ["map", "Mind maps", 3],
  ["curriculum", "Curriculum", 4], ["topic", "Topics", 4], ["course", "Courses", 3], ["collection", "Collections", 3], ["task", "Tasks", 3],
  ["action", "Actions", 4], ["screen", "Screens", 4],
];
const GROUP_OF = Object.fromEntries(GROUPS.map(([t], i) => [t, i]));
// how much each kind of thing is worth when it matches equally well: what a learner most likely wants first
const TYPE_WEIGHT = { lesson: 1.0, pack: 0.95, question: 0.9, note: 0.95, map: 0.9, curriculum: 0.85, topic: 0.9, course: 1.0, collection: 0.85, task: 0.8, action: 0.9, screen: 0.8 };

const fold = (s) => String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** a light English stem, so "equilibria" ≈ "equilibrium", "reactions" ≈ "reaction", "catalysed" ≈ "catalyse" */
const STEMS = new Map();
export function stem(w) {
  const k = String(w || ""), hit = STEMS.get(k); if (hit !== undefined) return hit;
  const v = stemOf(k); if (STEMS.size < 200_000) STEMS.set(k, v); return v;
}
function stemOf(w) {
  let s = w;
  if (s.length <= 3 || /^\d/.test(s)) return s;
  if (/(ia|ium|um)$/.test(s) && s.length > 5) return s.replace(/(ia|ium|um)$/, "i");   // equilibria, equilibrium
  if (/ies$/.test(s)) return `${s.slice(0, -3)}y`;
  if (/(ss|us|is)$/.test(s)) return s;
  if (/(ches|shes|xes|ses|zes)$/.test(s)) return s.slice(0, -2);
  if (/s$/.test(s)) s = s.slice(0, -1);
  if (/ing$/.test(s) && s.length > 5) s = s.slice(0, -3);
  else if (/ed$/.test(s) && s.length > 4) s = s.slice(0, -2);
  if (/e$/.test(s) && s.length > 4) s = s.slice(0, -1);
  return s;
}

/** the index: each document with its words worked out once, plus every word's frequency (for spelling and autocomplete) */
export function buildIndex(docs = []) {
  const ix = { list: [], vocab: new Map(), size: 0 };
  addDocs(ix, docs);
  return ix;
}
/** the same, a slice at a time, so a page building the whole of Gradify's index stays responsive while it does */
export async function buildIndexAsync(docs = [], { chunk = 1500, yieldNow = () => new Promise((r) => setTimeout(r, 0)) } = {}) {
  const ix = { list: [], vocab: new Map(), size: 0 };
  for (let i = 0; i < docs.length; i += chunk) { addDocs(ix, docs.slice(i, i + chunk)); if (i + chunk < docs.length) await yieldNow(); }
  return ix;
}
/** several indexes searched as one (Gradify's own, built once, and the learner's things, built each time) */
export function combine(...ixs) {
  const parts = ixs.filter(Boolean);
  if (parts.length === 1) return parts[0];
  const vocab = new Map(parts[0]?.vocab || []);
  for (const p of parts.slice(1)) for (const [w, n] of p.vocab) vocab.set(w, (vocab.get(w) || 0) + n);
  const list = parts.flatMap((p) => p.list);
  return { list, vocab, size: list.length };
}
function addDocs(ix, docs) {
  const { vocab, list } = ix;
  const count = (w, n) => vocab.set(w, (vocab.get(w) || 0) + n);
  for (const d of docs) {
    if (!d?.title || !d.type) continue;
    const t = words(d.title), k = (d.terms || []).flatMap(words), c = words([d.sub, ...(d.crumbs || []).map((x) => x.label)].filter(Boolean).join(" ")), b = words(d.body || "");
    const x = { d, t, ts: t.map(stem), k, ks: k.map(stem), c, cs: c.map(stem), b, bs: b.map(stem),
      tf: ` ${t.join(" ")} `, all: ` ${[...t, ...k, ...c, ...b].join(" ")} ` };
    list.push(x);
    for (const w of t) count(w, 3); for (const w of k) count(w, 2); for (const w of b) count(w, 0.2);
  }
  ix.size = list.length;
}

// how well one query word matches one field: whole word, its stem, or the start of a word
function fieldScore(w, ws, field, stems) {
  let best = 0;
  for (let i = 0; i < field.length; i++) {
    const f = field[i];
    const s = f === w ? 1 : stems[i] === ws ? 0.85 : f.startsWith(w) && w.length >= 2 ? 0.6 + 0.3 * (w.length / f.length) : w.length >= 4 && f.includes(w) ? 0.35 : 0;
    if (s > best) best = s;
    if (best === 1) break;
  }
  return best;
}

/** does a document pass the query's filters? (what a filter chip removes doesn't count towards the others) */
export function passes(d, q, { skip = null } = {}) {
  const f = q.filters;
  if (skip !== "type" && f.type.length && !f.type.includes(d.type)) return false;
  if (f.scope.course && !(fold(d.course) === fold(f.scope.course) || fold(d.subject) === fold(f.scope.course))) return false;
  // a collection by its id (the Search screen's scope) or by its name, as typed (in:folder:mock)
  if (f.scope.folder && !(d.folders || []).some((x) => fold(x) === fold(f.scope.folder)) && !(d.folderName && fold(d.folderName).includes(fold(f.scope.folder)))) return false;
  if (f.scope.lesson && d.lesson !== f.scope.lesson) return false;
  if (f.board.length && !(d.board || []).some((b) => f.board.includes(b))) return false;
  if (f.qual.length && !(d.qual || []).some((x) => f.qual.includes(x))) return false;
  if (f.status.length && !f.status.every((s) => (d.status || []).includes(s))) return false;
  if (f.done != null && (d.done == null || Boolean(d.done) !== f.done)) return false;
  if (f.difficulty.length && !(d.difficulty && f.difficulty.includes(String(d.difficulty)))) return false;
  const when = d.modified || d.created || null;
  if (q.from != null && !(when && when >= q.from)) return false;
  if (q.to != null && !(when && when < q.to)) return false;
  return true;
}

/**
 * Score one indexed document against the query (0: no match). Every word must match somewhere; a phrase must appear
 * as written; a left-out word must not appear. Titles count most, then key terms, then where it lives, then its text.
 */
export function scoreDoc(x, q, { context = {}, any = false } = {}) {
  const d = x.d;
  for (const n of q.not) if (x.all.includes(` ${n} `) || x.all.includes(` ${stem(n)}`)) return 0;
  let s = 0, matched = 0, inTitle = 0;
  for (const w of q.terms) {
    const ws = stem(w);
    const ti = fieldScore(w, ws, x.t, x.ts), ki = fieldScore(w, ws, x.k, x.ks), ci = fieldScore(w, ws, x.c, x.cs), bi = fieldScore(w, ws, x.b, x.bs);
    const best = Math.max(ti * 10, ki * 7, ci * 3, bi * 2.5);
    if (!best) { if (any) continue; return 0; }
    matched++; if (ti >= 0.6) inTitle++;
    s += best + (ki ? 1 : 0);
  }
  for (const p of q.phrases) {
    if (x.tf.includes(` ${p} `)) s += 18;
    else if (x.all.includes(` ${p} `)) s += 9;
    else return 0;
  }
  if (any && !matched && !q.phrases.length) return 0;
  if (!q.terms.length && !q.phrases.length) s = 1;   // filters alone: everything that passes, best-known first
  // the whole query is the title, or starts it: the thing itself rather than something mentioning it
  const joined = q.terms.join(" ");
  if (joined && x.tf.trim() === joined) s += 30;
  else if (joined && x.tf.startsWith(` ${joined}`)) s += 6;
  if (q.terms.length > 1 && inTitle === q.terms.length) s += 6;
  if (q.terms.length > 1) { const i = x.tf.indexOf(` ${joined} `); if (i >= 0) s += 8; }   // the words together, in order
  s *= TYPE_WEIGHT[d.type] ?? 0.8;
  // context: where the learner is and what's theirs
  // the course the learner is in outweighs a slightly better title in another subject
  if (context.course && (d.course === context.course || d.subject === context.course)) s = s * 1.3 + 6;
  if (context.lesson && d.lesson === context.lesson) s += 4;
  if (context.folder && (d.folders || []).includes(context.folder)) s += 3;
  if (context.qual?.length && (d.qual || []).some((x) => context.qual.includes(x))) s += 2;
  if (context.board?.length && (d.board || []).some((x) => context.board.includes(x))) s += 2;
  if ((d.status || []).includes("pinned")) s += 3;
  if ((d.status || []).includes("in-progress")) s += 1.5;
  if (context.recent?.has?.(d.href)) s += 2;
  const when = d.modified || d.created; if (when && context.now) { const days = (context.now - when) / 864e5; if (days >= 0 && days < 60) s += 2 * (1 - days / 60); }
  if (d.weight) s += d.weight;
  return s - String(d.title).length / 400;
}

/** mark the query's words in a title (escaped) */
export function markTitle(title, q) {
  const ws = [...q.terms, ...q.phrases.flatMap((p) => p.split(" "))].filter((w) => w.length > 1);
  const t = esc(title); if (!ws.length) return t;
  const alt = [...new Set(ws.flatMap((w) => [w, stem(w)]))].filter((w) => w.length > 1).sort((a, b) => b.length - a.length).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // match on the folded text, then mark the same span of the original (accents, capitals and all)
  const f0 = fold(t), f = f0.length === t.length ? f0 : t.toLowerCase();   // (a ligature would shift the spans)
  const re = new RegExp(`(^|[^\\p{L}\\p{N}])(${alt.join("|")})[\\p{L}\\p{N}]*`, "giu");
  let out = "", at = 0, m;
  while ((m = re.exec(f))) {
    const start = m.index + m[1].length, end = m.index + m[0].length;
    if (t.slice(0, start).lastIndexOf("&") > t.slice(0, start).lastIndexOf(";")) continue;   // inside an entity
    out += `${t.slice(at, start)}<mark>${t.slice(start, end)}</mark>`; at = end;
  }
  return out + t.slice(at);
}

/** a short piece of a document's text around the first match, marked (or its preview, or nothing) */
export function snippet(text, q, width = 140) {
  const s = String(text || "").replace(/\s+/g, " ").trim(); if (!s) return "";
  const f = fold(s), ws = [...q.phrases, ...q.terms].filter((w) => w.length > 1);
  let at = -1;
  for (const w of ws) { const re = new RegExp(`(^|[^\\p{L}\\p{N}])${(w.length > 4 ? stem(w) : w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "u"), m = re.exec(f); if (m) { at = m.index + m[1].length; break; } }
  if (at < 0) return s.length > width ? `${esc(s.slice(0, width - 1).replace(/\s+\S*$/, ""))}…` : esc(s);
  const from = Math.max(0, at - Math.round(width / 3)), to = Math.min(s.length, from + width);
  const piece = (from ? "…" : "") + s.slice(from, to).replace(from ? /^\S*\s/ : /^/, "") + (to < s.length ? "…" : "");
  return markTitle(piece, q);
}

/** why a result is here, in a few words: where the match was */
function why(x, q) {
  if (!q.terms.length && !q.phrases.length) return "";
  const in_ = (f, fs) => q.terms.every((w) => fieldScore(w, stem(w), f, fs) > 0);
  if (in_(x.t, x.ts)) return "";
  if (x.k.length && in_(x.k, x.ks)) return "Key term";
  if (in_(x.b, x.bs)) return "In the text";
  return "";
}

/** search: ranked, grouped results, the counts per type, and recovery when nothing matched */
export function search(ix, q, { context = {}, limit = 400, groups = GROUPS, expand = null } = {}) {
  const scored = [], counts = {};
  for (const x of ix.list) {
    if (!passes(x.d, q, { skip: "type" })) continue;
    const s = scoreDoc(x, q, { context });
    if (!s) continue;
    counts[x.d.type] = (counts[x.d.type] || 0) + 1;
    if (q.filters.type.length && !q.filters.type.includes(x.d.type)) continue;
    scored.push({ x, s });
  }
  scored.sort((a, b) => b.s - a.s);
  const hits = scored.slice(0, limit).map(({ x, s }) => ({ ...x.d, score: s, html: markTitle(x.d.title, q), snippet: x.d.body || x.d.preview ? snippet(x.d.body || x.d.preview, q) : "", why: why(x, q) }));
  const byType = new Map();
  for (const h of hits) { if (!byType.has(h.type)) byType.set(h.type, []); byType.get(h.type).push(h); }
  // groups always in reading order; a result that is exactly what was typed is also shown on its own, first ("best")
  const out = groups.filter(([t]) => byType.has(t)).map(([type, title, n]) => ({ type, title, total: byType.get(type).length, items: byType.get(type).slice(0, expand === type || q.filters.type.length === 1 ? 50 : n) }));
  for (const t of byType.keys()) if (GROUP_OF[t] == null) out.push({ type: t, title: TYPES[t]?.[0] || t, total: byType.get(t).length, items: byType.get(t).slice(0, 4) });
  const top = hits[0] && hits[0].score >= 40 && (!hits[1] || hits[0].score > hits[1].score * 1.15) ? hits[0] : null;
  const total = hits.length;
  return { total, hits, groups: out, counts, best: top, recover: total ? null : recover(ix, q, { context }) };
}

// ---------- when nothing matches ----------
/** edit distance (with swaps), stopping early past max */
export function distance(a, b, max = 2) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let low = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const c = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      low = Math.min(low, d[i][j]);
    }
    if (low > max) return max + 1;
  }
  return d[a.length][b.length];
}
/** the likeliest word meant: a known word one or two letters away, the most common first */
export function correct(ix, w) {
  if (ix.vocab.has(w) || w.length < 4) return null;
  const max = w.length > 7 ? 2 : 1;
  let best = null, bd = max + 1, bf = 0;
  for (const [v, freq] of ix.vocab) {
    if (Math.abs(v.length - w.length) > max || v[0] !== w[0] && max < 2) continue;
    const dd = distance(w, v, max);
    if (dd < bd || (dd === bd && freq > bf)) { best = v; bd = dd; bf = freq; }
  }
  return bd <= max ? best : null;
}
const countOf = (ix, q, context) => ix.list.reduce((n, x) => n + (passes(x.d, q) && scoreDoc(x, q, { context }) ? 1 : 0), 0);

/**
 * Nothing matched: offer a corrected spelling, the filters to drop (with what each would find), a looser search (any
 * of the words), and the query without its last word, each only if it finds something.
 */
export function recover(ix, q, { context = {} } = {}) {
  const out = { didYouMean: null, loosen: [], anyWords: null, browse: [] };
  // spelling: each unknown word corrected where a known word is close; one that's like nothing known is left out
  let changed = false;
  const known = (w) => ix.vocab.has(w) || [...ix.vocab.keys()].some((v) => v.startsWith(w));
  const fixed = q.terms.map((w) => { if (known(w)) return w; const c = correct(ix, w); changed = true; return c || null; }).filter(Boolean);
  if (changed && fixed.length) { const q2 = { ...q, terms: fixed }; const n = countOf(ix, q2, context); if (n) out.didYouMean = { text: fixed.join(" "), count: n }; }
  // filters to drop, one at a time
  const f = q.filters, tries = [];
  if (f.type.length) tries.push(["type", "every kind of resource", { ...f, type: [] }]);
  for (const k of Object.keys(f.scope)) tries.push([`scope.${k}`, k === "course" ? "every course" : k === "folder" ? "everything, not just this collection" : "the whole course", { ...f, scope: Object.fromEntries(Object.entries(f.scope).filter(([x]) => x !== k)) }]);
  for (const k of ["board", "qual", "status", "difficulty"]) if (f[k].length) tries.push([k, `any ${k === "qual" ? "qualification" : k === "board" ? "exam board" : k}`, { ...f, [k]: [] }]);
  if (f.done != null) tries.push(["done", "finished or not", { ...f, done: null }]);
  if (q.from != null || q.to != null) tries.push(["date", "any date", f, true]);
  for (const [key, label, filters, dates] of tries) {
    const q2 = { ...q, filters, ...(dates ? { from: null, to: null } : {}) }, n = countOf(ix, q2, context);
    if (n) out.loosen.push({ key, label, count: n });
  }
  // any of the words, not all of them
  if (q.terms.length > 1) { const n = ix.list.reduce((a, x) => a + (passes(x.d, q) && scoreDoc(x, q, { context, any: true }) ? 1 : 0), 0); if (n) out.anyWords = { count: n }; }
  // fewer words
  if (q.terms.length > 1) { const q2 = { ...q, terms: q.terms.slice(0, -1) }, n = countOf(ix, q2, context); if (n) out.browse.push({ text: q2.terms.join(" "), count: n }); }
  return out;
}

// ---------- while typing ----------
/**
 * Autocomplete: the searches the learner made before that start this way, their saved searches, the titles that
 * match best, and the word being typed finished from what Gradify knows. Returns [{ kind, text, label?, hit? }].
 */
export function suggest(ix, raw, { history = [], saved = [], limit = 8, context = {} } = {}) {
  const s = fold(raw).replace(/\s+/g, " ").trimStart();
  if (!s.trim()) return [...saved.slice(0, 3).map((x) => ({ kind: "saved", text: x.q, label: x.name })), ...history.slice(0, 5).map((x) => ({ kind: "history", text: x.q }))].slice(0, limit);
  const out = [], seen = new Set();
  const push = (x) => { const k = fold(x.text); if (seen.has(k) || out.length >= limit) return; seen.add(k); out.push(x); };
  for (const x of saved) if (fold(x.q).startsWith(s) || fold(x.name).startsWith(s)) push({ kind: "saved", text: x.q, label: x.name });
  for (const x of history) if (fold(x.q).startsWith(s) && fold(x.q) !== s.trim()) push({ kind: "history", text: x.q });
  // the word being typed, finished (the most common known words that start with it)
  const parts = s.split(" "), last = parts.at(-1), head = parts.slice(0, -1).join(" ");
  if (last.length >= 2) {
    const done = [...ix.vocab].filter(([w]) => w.startsWith(last) && w !== last).sort((a, b) => b[1] - a[1]).slice(0, 3);
    for (const [w] of done) push({ kind: "word", text: `${head ? `${head} ` : ""}${w}` });
  }
  // titles that match what's typed so far
  const q = { terms: words(s), phrases: [], not: [], filters: { type: [], scope: {}, board: [], qual: [], status: [], done: null, difficulty: [] }, from: null, to: null };
  if (q.terms.length) {
    const best = ix.list.map((x) => ({ x, sc: scoreDoc(x, q, { context }) })).filter((y) => y.sc > 5).sort((a, b) => b.sc - a.sc).slice(0, 5);
    for (const { x } of best) push({ kind: "hit", text: x.d.title, hit: { ...x.d, html: markTitle(x.d.title, q) } });
  }
  return out;
}

/** the vocabulary's most frequent words that aren't the query's own (for "related searches") */
export function related(hits, q, n = 6) {
  const freq = new Map(), own = new Set([...q.terms, ...q.terms.map(stem)]);
  for (const h of hits.slice(0, 30)) for (const t of h.terms || []) { const k = fold(t).trim(); if (k && !own.has(k) && !k.split(" ").every((w) => own.has(w) || own.has(stem(w)))) freq.set(k, (freq.get(k) || 0) + 1); }
  return [...freq].sort((a, b) => b[1] - a[1]).slice(0, n).map(([t]) => t);
}

// ---------- inside one lesson ----------
/**
 * Find a word, phrase or example inside a lesson: sections [{ id, title, text }] → [{ id, title, count, snippet }],
 * the section whose heading matches first, then by how often it appears.
 */
export function findInSections(sections = [], q) {
  if (!q.terms.length && !q.phrases.length) return [];
  const out = [];
  for (const sct of sections) {
    const t = ` ${words(sct.title).join(" ")} `, b = ` ${words(sct.text).join(" ")} `;
    let n = 0, head = 0, ok = true;
    for (const p of q.phrases) { const c = b.split(` ${p} `).length - 1 + t.split(` ${p} `).length - 1; if (!c) { ok = false; break; } n += c; }
    for (const w of q.terms) {
      const ws = stem(w), re = new RegExp(` (${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}|${ws.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})[\\p{L}\\p{N}]*`, "gu");
      const c = (b.match(re) || []).length, h = (t.match(re) || []).length;
      if (!c && !h) { ok = false; break; }
      n += c + h; head += h;
    }
    if (ok && n) out.push({ id: sct.id, title: sct.title, count: n, head, snippet: snippet(sct.text, q, 120) });
  }
  return out.sort((a, b) => b.head - a.head || b.count - a.count);
}
