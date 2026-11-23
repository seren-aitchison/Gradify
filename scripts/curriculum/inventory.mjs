// Course inventory for curriculum mapping: every unit, module, lesson and linked resource of a course, with its
// permanent id and parent, extracted from the course's own structured data (syllabus.js, notes/uNN.js,
// interactives.js, registry.js). Nothing is edited; the output is regenerated, never hand-maintained.
//
//   node scripts/curriculum/inventory.mjs biology      → data/curriculum/inventory/biology.json
//
// Resource ids: questions keep their registry ids (biology-u02-01-q3); flashcards, diagrams and mind maps have no
// stored id, so they get a derived one from the lesson id and position (biology-u02-01-fc2), stable while the
// notes are unchanged. Mind maps are generated in the browser from the lesson notes (docs/MINDMAPS.md, five per
// lesson), so they are listed per lesson and always inherit its mapping.
import { writeFile, mkdir } from "node:fs/promises";
import { parseNotes } from "../../kit/course/notes.js";
import { norm } from "../../kit/core/text.js";

const slug = process.argv[2] || "biology";
const base = `../../kit/courses/${slug}/`;
const { UNITS } = await import(`${base}syllabus.js`);
const { INTERACTIVES = [] } = await import(`${base}interactives.js`).catch(() => ({}));
const { LESSONS: LV = {}, QUESTIONS: QV = {} } = await import(`${base}registry.js`).catch(() => ({}));

const out = { slug, generated: new Date().toISOString().slice(0, 10), units: [], lessons: [], resources: [], counts: {} };
for (const u of UNITS) {
  out.units.push({ id: u.id, n: u.n, title: u.title, modules: u.modules.map((m) => ({ id: m.id, title: m.title, lessons: m.lessons })) });
  let parsed = [];
  try { parsed = parseNotes((await import(`${base}notes/${u.id}.js`)).default); } catch { /* unit not written */ }
  const byTitle = new Map(parsed.map((L) => [norm(L.title), L]));
  for (const l of u.lessons) {
    const L = byTitle.get(norm(l.title));
    const sections = L ? L.blocks.filter((b) => b.t === "h").map((b) => b.x) : [];
    const diagrams = L ? L.blocks.filter((b) => b.t === "dg").map((b) => b.id) : [];
    const ix = INTERACTIVES.filter((x) => (x.lessons || []).includes(l.id)).map((x) => x.id);
    out.lessons.push({ id: l.id, unit: u.id, module: l.module, title: l.title, written: !!L, version: LV[l.id]?.v ?? null,
      lead: L?.lead || "", objectives: L?.objectives || [], sections, terms: (L?.terms || []).map((t) => t[0]),
      counts: { flashcards: L?.cards.length || 0, questions: (L?.mcq.length || 0) + (L?.tasks.length || 0), diagrams: diagrams.length, interactives: ix.length, mindmaps: L ? 5 : 0 } });
    if (!L) continue;
    const add = (r) => out.resources.push({ lesson: l.id, ...r });
    L.cards.forEach(([q, a], i) => add({ id: `${slug}-${l.id}-fc${i + 1}`, type: "flashcard", q, a }));
    for (const m of L.mcq) add({ id: m.id || null, type: m.Q?.type || "mcq", d: m.d ?? null, v: QV[m.id]?.v ?? null, q: m.q, a: m.right });
    for (const t of L.tasks) add({ id: t.id || null, type: t.type, d: t.d ?? null, v: QV[t.id]?.v ?? null, q: t.q, a: t.answer ?? t.options?.filter((o) => o.correct).map((o) => o.text).join("; ") ?? null });
    diagrams.forEach((d) => add({ id: `${slug}-${l.id}-dg:${d}`, type: "diagram", ref: d }));
    for (let i = 1; i <= 5; i++) add({ id: `${slug}-${l.id}-mm${i}`, type: "mindmap", derived: true });
  }
}
for (const x of INTERACTIVES) out.resources.push({ id: `${slug}-ix:${x.id}`, type: "interactive", kind: x.kind, title: x.title, lessons: x.lessons || [], lesson: (x.lessons || [])[0] || null });
const c = out.counts;
c.units = out.units.length; c.modules = out.units.reduce((s, u) => s + u.modules.length, 0);
c.lessons = out.lessons.length; c.lessonsWritten = out.lessons.filter((l) => l.written).length;
c.objectives = out.lessons.reduce((s, l) => s + l.objectives.length, 0);
c.sections = out.lessons.reduce((s, l) => s + l.sections.length, 0);
for (const r of out.resources) c[r.type] = (c[r.type] || 0) + 1;
c.questionsWithoutId = out.resources.filter((r) => !["flashcard", "diagram", "mindmap", "interactive"].includes(r.type) && !r.id).length;
await mkdir(new URL("../../data/curriculum/inventory/", import.meta.url), { recursive: true });
await writeFile(new URL(`../../data/curriculum/inventory/${slug}.json`, import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(c, null, 1));
