// The lesson search engine for Tools: finds a lesson anywhere on Gradify by its title, module, unit, key terms and
// section headings (kit/api/v1/lessons.json, built by scripts/build-api.mjs), then reads that lesson's own notes and
// lists its facts, each one a line of the notes a learner can pick for a mind map or a flashcard.
import { parseNotes, norm } from "../course/notes.js";

const here = new URL(".", import.meta.url);
let index = null;

/** The index, loaded once. In Node (tests) it is read from disk. */
export function loadIndex() {
  if (!index) index = (typeof window === "undefined"
    ? import("node:fs/promises").then((fs) => fs.readFile(new URL("../api/v1/lessons.json", here), "utf8")).then(JSON.parse)
    : fetch(new URL("../api/v1/lessons.json", here)).then((r) => { if (!r.ok) throw new Error("The lesson index didn't load."); return r.json(); }))
    .then((d) => ({ courses: d.courses.map(([slug, name, site, page, accent]) => ({ slug, name, site, page, accent })), lessons: d.lessons.map(row) }))
    .catch((e) => { index = null; throw e; });
  return index;
}
function row([course, unit, lesson, title, module, unitTitle, terms, headings]) {
  const words = (s) => fold(s).split(" ").filter(Boolean);
  return { course, unit, lesson, title, module, unitTitle, terms: terms ? terms.split("|") : [], headings: headings ? headings.split("|") : [],
    // what the search matches, by weight
    _t: words(title), _k: words(`${terms} ${headings}`.replace(/\|/g, " ")), _m: words(`${module} ${unitTitle}`) };
}
// lower case, accents off, punctuation to spaces: "Mitosis, Meiosis" and "mitosis meiosis" search alike
const fold = (s) => String(s ?? "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const STOP = new Set(["the", "a", "an", "and", "of", "in", "on", "to", "for", "what", "how", "why", "is", "are", "with"]);

/**
 * Lessons that match a query, best first. A word matches a whole word (full marks) or the start of one (most of
 * them), in the title, key terms and headings, or the module and unit; every word of the query must match somewhere.
 * @param {string} q @param {{ course?: string, limit?: number }} o
 */
export async function searchLessons(q, { course = null, limit = 30 } = {}) {
  const ix = await loadIndex();
  const qs = fold(q).split(" ").filter((w) => w && !STOP.has(w));
  if (!qs.length) return [];
  const phrase = fold(q);
  const out = [];
  for (const L of ix.lessons) {
    const c = ix.courses[L.course];
    if (course && c.slug !== course) continue;
    let score = 0, all = true;
    for (const w of qs) {
      const hit = (arr, full, part) => (arr.includes(w) ? full : arr.some((x) => x.startsWith(w)) ? part : w.length >= 4 && arr.some((x) => x.includes(w)) ? part / 3 : 0);
      const s = Math.max(hit(L._t, 10, 7), hit(L._k, 6, 4), hit(L._m, 3, 2), hit(fold(c.name).split(" "), 2, 1));
      if (!s) { all = false; break; }
      score += s;
    }
    if (!all) continue;
    if (fold(L.title).includes(phrase)) score += 8;
    out.push({ ...L, c, score });
  }
  return out.sort((a, b) => b.score - a.score || a.title.length - b.title.length).slice(0, limit)
    .map(({ _t, _k, _m, ...L }) => L);
}

const notesCache = new Map();
/** A found lesson's own notes, parsed (kit/course/notes.js). */
export async function loadLesson(hit) {
  const key = `${hit.c.slug}/${hit.unit}`;
  if (!notesCache.has(key)) notesCache.set(key, import(new URL(`../courses/${hit.c.slug}/notes/${hit.unit}.js`, here)).then((m) => parseNotes(m.default)).catch((e) => { notesCache.delete(key); throw e; }));
  const lessons = await notesCache.get(key);
  return lessons.find((L) => norm(L.title) === norm(hit.title)) || null;
}

const plain = (s) => String(s ?? "").replace(/\*\*|__|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
/**
 * A lesson's facts: one per line of its notes, grouped by section, each with a kind and a short title.
 * [{ section, facts: [{ id, kind, text, title, detail }] }]
 */
export function factsOf(L) {
  const groups = [], add = (section) => { const g = { section, facts: [] }; groups.push(g); return g; };
  let cur = add("Overview");
  const fact = (kind, text, extra = {}) => {
    const t = plain(text), bold = String(text).match(/^\s*\*\*([^*]{2,80})\*\*\s*[:–—-]?\s*/);
    cur.facts.push({ id: `${groups.length - 1}.${cur.facts.length}`, kind, text: t, title: bold ? plain(bold[1]) : t.length > 80 ? `${t.slice(0, 78).replace(/\s+\S*$/, "")}…` : t, ...extra });
  };
  if (L.lead) fact("point", L.lead);
  for (const b of L.blocks) {
    if (b.t === "h") { cur = add(plain(b.x)); continue; }
    if (b.t === "p" || b.t === "key") fact(b.t === "key" ? "key" : "point", b.x);
    else if (b.t === "ul") b.items.forEach((x) => fact("point", x));
    else if (b.t === "eq") b.rows.forEach(([x, n]) => fact("formula", n ? `${x}: ${n}` : x, { title: plain(x) }));
    else if (b.t === "ex") fact("example", `${b.x}${b.steps.length ? ` ${b.steps.map((s, i) => `(${i + 1}) ${s}`).join(" ")}` : ""}`, { title: plain(b.x).slice(0, 80), steps: b.steps.map(plain) });
    else if (b.t === "pit") fact("mistake", b.x);
    else if (b.t === "safe") fact("safety", b.x);
  }
  if (L.terms?.length) { cur = add("Key terms"); L.terms.forEach(([t, d]) => fact("term", `${t}: ${d}`, { title: plain(t), detail: plain(d) })); }
  if (L.summary?.length) { cur = add("Summary"); L.summary.forEach((x) => fact("key", x)); }
  return groups.filter((g) => g.facts.length);
}
