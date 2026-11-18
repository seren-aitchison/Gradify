// Study material for the Tools that read, play, print or quiz: one shape, whatever it came from.
//   a Gradify lesson (kit/api/v1/lessons.json + the course's own notes), a whole unit, a learner's flashcard deck
//   (kit/tools/store.js), or notes pasted in (Gradify's browser extractor, kit/tools/convert.js).
// Material: { title, from, sections: [{ h, facts: [text] }], terms: [[term, def]], cards: [[q, a]], mcq: [{ q, right, wrong, why, d }] }
// The shaping functions are pure, so Node tests them (tests/tools-more.test.mjs).
import { loadIndex, loadLesson, factsOf } from "./search.js";
import { parseNotes } from "../course/notes.js";
import { parseDeck } from "./cards.js";
import { packOf } from "./convert.js";

const here = new URL(".", import.meta.url);
export const plain = (s) => String(s ?? "").replace(/\*\*|__|`/g, "").replace(/\{\{(?:c\d+::)?([^}]+)\}\}/g, "$1").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[_^]\{([^}]*)\}/g, "$1").replace(/\s+/g, " ").trim();

/** A parsed course lesson as material. */
export function fromLesson(L, { course = "", unit = "" } = {}) {
  const groups = factsOf(L);
  return {
    title: L.title, from: [course, unit].filter(Boolean).join(" · "),
    sections: groups.filter((g) => g.section !== "Key terms").map((g) => ({ h: g.section, facts: g.facts.map((f) => f.text) })),
    terms: (L.terms || []).map(([t, d]) => [plain(t), plain(d)]),
    cards: (L.cards || []).map(([q, a]) => [plain(q), plain(a)]),
    mcq: (L.mcq || []).map((m) => ({ q: plain(m.q), right: plain(m.right), wrong: m.wrong.map(plain), why: plain(m.why || ""), d: m.d || 2 })),
  };
}
/** Several pieces of material as one (a unit, a playlist). */
export function merge(list, title) {
  return {
    title: title || list[0]?.title || "", from: list[0]?.from || "",
    sections: list.flatMap((m) => m.sections.map((s) => ({ ...s, h: list.length > 1 && s.h === "Overview" ? m.title : s.h }))),
    terms: list.flatMap((m) => m.terms), cards: list.flatMap((m) => m.cards), mcq: list.flatMap((m) => m.mcq),
  };
}
// a cloze card's front, its hidden gap shown as a blank
const gap = (s) => plain(String(s)).replace(/…/g, "[…]");
/** A learner's deck text (the flashcard creator's syntax) as material. */
export function fromDeck(title, text) {
  const cards = parseDeck(text);
  const terms = cards.filter((c) => c.type === "concept" && !c.id.endsWith("1")).map((c) => [plain(c.front), plain(c.back)]);
  const seen = new Set();
  const uniq = cards.filter((c) => { const k = c.line; if (seen.has(k)) return false; seen.add(k); return true; });
  const heads = String(text).split("\n").filter((l) => /^#\s/.test(l.trim()));
  return {
    title: title || "My deck", from: "Your flashcards",
    sections: [{ h: heads[0]?.replace(/^#\s*/, "") || title || "Cards", facts: uniq.map((c) => `${gap(c.front)}: ${plain(c.back)}`) }],
    terms: terms.length ? terms : uniq.filter((c) => c.type !== "cloze" && plain(c.front).length < 60).map((c) => [plain(c.front), plain(c.back)]),
    cards: uniq.map((c) => [gap(c.front), plain(c.back)]),
    mcq: [],
  };
}
/** Notes in any format as material, through the browser extractor. */
export function fromNotes(text, title = "My notes") {
  const p = packOf(text, title);
  const def = (f) => plain(f.statement).replace(new RegExp(`^${f.term?.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") || "\\b\\B"}\\s*[:–—-]?\\s*(is|are|means)?\\s*`, "i"), "");
  return {
    title: p.title || title, from: "Your notes",
    sections: p.topics.map((t) => ({ h: t.name, facts: t.facts.map((f) => plain(f.statement)) })),
    terms: p.topics.flatMap((t) => t.facts.filter((f) => f.term).map((f) => [plain(f.term), def(f) || plain(f.statement)])),
    cards: p.topics.flatMap((t) => t.facts.filter((f) => f.card).map((f) => [plain(String(f.card.front).replace(/\{\{(?:c\d+::)?[^}]+\}\}/g, "[…]")), plain(f.card.back)])),
    mcq: [],
  };
}

/** Multiple-choice questions made from terms when material has none of its own: the definition, and three others. */
export function termQuestions(terms, rand = Math.random) {
  if (terms.length < 4) return [];
  return terms.map(([t, d], i) => {
    const others = terms.filter((_, j) => j !== i).map(([, x]) => x).filter((x) => x !== d);
    const wrong = shuffle(others, rand).slice(0, 3);
    return { q: `Which of these describes "${t}"?`, right: d, wrong, why: `${t}: ${d}`, d: 1, term: t };
  });
}
export function shuffle(a, rand = Math.random) { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; }

// ---------- loading from Gradify's courses ----------
const unitCache = new Map();
/** Every lesson of a unit, parsed. */
export function loadUnit(slug, unit) {
  const k = `${slug}/${unit}`;
  if (!unitCache.has(k)) unitCache.set(k, import(new URL(`../courses/${slug}/notes/${unit}.js`, here).href).then((m) => parseNotes(m.default)).catch((e) => { unitCache.delete(k); throw e; }));
  return unitCache.get(k);
}
/** The index's courses, and each course's units with their lessons, for pickers. */
export async function catalogue() {
  const ix = await loadIndex();
  return ix.courses.map((c, i) => {
    const units = [];
    for (const L of ix.lessons) if (L.course === i) {
      let u = units.find((x) => x.id === L.unit);
      if (!u) units.push(u = { id: L.unit, title: L.unitTitle || L.unit, lessons: [] });
      u.lessons.push({ id: L.lesson, title: L.title, terms: L.terms });
    }
    return { ...c, units };
  });
}
/** One lesson as material, by course slug, unit and lesson id. */
export async function lessonMaterial(slug, unit, lessonId) {
  const cat = await catalogue(), c = cat.find((x) => x.slug === slug), u = c?.units.find((x) => x.id === unit), l = u?.lessons.find((x) => x.id === lessonId);
  if (!l) throw new Error("That lesson isn't on Gradify any more.");
  const L = await loadLesson({ c, unit, title: l.title });
  if (!L) throw new Error("This lesson's notes aren't written yet.");
  return { ...fromLesson(L, { course: c.name, unit: u.title }), link: c.page ? `${c.page}#/lesson/${lessonId}` : "" };
}
/** A whole unit as material. */
export async function unitMaterial(slug, unit) {
  const cat = await catalogue(), c = cat.find((x) => x.slug === slug), u = c?.units.find((x) => x.id === unit);
  if (!u) throw new Error("That unit isn't on Gradify any more.");
  const lessons = await loadUnit(slug, unit);
  return merge(lessons.map((L) => fromLesson(L, { course: c.name, unit: u.title })), u.title);
}
/** Random lessons from some courses, as material, for feeds and games. */
export async function sampleMaterial(slugs, n = 4, rand = Math.random) {
  const cat = await catalogue();
  const pool = cat.filter((c) => !slugs?.length || slugs.includes(c.slug)).flatMap((c) => c.units.map((u) => ({ c, u })));
  const out = [];
  for (const { c, u } of shuffle(pool, rand).slice(0, n)) {
    try { const ls = await loadUnit(c.slug, u.id); const L = ls[Math.floor(rand() * ls.length)]; if (L) out.push({ ...fromLesson(L, { course: c.name, unit: u.title }), slug: c.slug }); }
    catch { /* a unit not written yet */ }
  }
  return out;
}
