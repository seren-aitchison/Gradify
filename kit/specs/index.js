// The examination specifications Gradify maps its courses onto, for Specification Mastery
// (kit/learning/spec-mastery.js, docs/SPEC-MASTERY.md). Each specification is a data file in this folder; adding a
// board, a qualification, a subject or another country's curriculum is a new file and one line in SPECS, never a
// change to the mastery engine or the pages.
//
//   specsFor("biology")   → the specifications a course can be measured against
//   specById(id)          → one specification
//   catalogue()           → every specification, by education system → qualification → board → subject
//   pointsOf(spec)        → every point, flat, with its topic and group
//   resolveRef(spec, ref) → { course, lesson } for a point's lesson reference
//   checkSpec(spec, ids)  → [] or a list of problems (tests run this on every specification)
//
// Specification format (aqa-gcse-biology-8461.js is the worked example):
//   { id, title, system, qualification, board, subject, code?, course, url?, version,
//     wording: "paraphrased" | "verbatim", verified: null | { date, by, version },
//     flags:   { <flag>: { short, name } }                     the specification's own classifications of points
//     options: [{ id, label, choices: [{ id, label, hides?: [flag…] }] }]   learner choices; the first is the default
//     topics:  [{ id, title, groups: [{ id, title, points: [{ id, title, text, lessons, partial, flags }] }] }] }
// A lesson reference is a lesson id in the specification's own course ("u02-20"), or "<course>:<lesson id>" for a
// lesson in another course ("chemistry:u05-03"), so one specification (Combined Science, say) can span several courses.
import { SYSTEMS, QUALIFICATIONS } from "../curriculum/coverage.js";
import aqaGcseBiology from "./aqa-gcse-biology-8461.js";

export const SPECS = [aqaGcseBiology];

export const specsFor = (slug) => SPECS.filter((s) => s.course === slug);
export const specById = (id) => SPECS.find((s) => s.id === id) || null;

/** a lesson reference → the course and lesson it names */
export function resolveRef(spec, ref) {
  const i = String(ref).indexOf(":");
  return i < 0 ? { course: spec.course, lesson: ref } : { course: ref.slice(0, i), lesson: ref.slice(i + 1) };
}

/** every point of a specification, flat, with its topic and group */
export function pointsOf(spec) {
  return spec.topics.flatMap((t) => t.groups.flatMap((g) => g.points.map((p) => ({ ...p, flags: p.flags || [], topic: { id: t.id, title: t.title }, group: { id: g.id, title: g.title } }))));
}

/** the learner's choices for a specification, filled in with each option's default (its first choice) */
export function choicesFor(spec, picked = {}) {
  return Object.fromEntries((spec.options || []).map((o) => [o.id, o.choices.some((c) => c.id === picked[o.id]) ? picked[o.id] : o.choices[0].id]));
}
/** the point flags the learner's choices hide */
export function hiddenFlags(spec, picked = {}) {
  const ch = choicesFor(spec, picked);
  return new Set((spec.options || []).flatMap((o) => o.choices.find((c) => c.id === ch[o.id])?.hides || []));
}

/** Every specification by where it's taken: [{ system, country, qualifications: [{ id, name, specs: [...] }] }]. */
export function catalogue(specs = SPECS) {
  return SYSTEMS.map((sys) => ({ id: sys.id, country: sys.country, system: sys.system,
    qualifications: Object.entries(QUALIFICATIONS).map(([id, q]) => ({ id, name: q.name, specs: specs.filter((s) => s.system === sys.id && s.qualification === id).sort((a, b) => `${a.subject}${a.board}`.localeCompare(`${b.subject}${b.board}`)) })).filter((q) => q.specs.length) }))
    .filter((s) => s.qualifications.length);
}

/** Problems with a specification; `lessonIds` (a Set of "<course>:<lesson id>") checks every lesson it names exists. */
export function checkSpec(spec, lessonIds = null) {
  const p = [];
  for (const k of ["id", "title", "system", "qualification", "board", "subject", "course", "version", "wording"]) if (!spec?.[k]) p.push(`missing ${k}`);
  if (spec?.system && !SYSTEMS.some((s) => s.id === spec.system)) p.push(`unknown education system ${spec.system} (add it to kit/curriculum/coverage.js)`);
  if (spec?.qualification && !QUALIFICATIONS[spec.qualification]) p.push(`unknown qualification ${spec.qualification} (add it to kit/curriculum/coverage.js)`);
  if (!["paraphrased", "verbatim"].includes(spec?.wording)) p.push(`wording should be "paraphrased" or "verbatim"`);
  if (spec?.wording === "verbatim" && !(spec.verified?.date && spec.verified?.by && spec.verified?.version)) p.push("verbatim wording needs verified: { date, by, version }");
  const flags = spec?.flags || {};
  for (const [k, f] of Object.entries(flags)) if (!f?.short || !f?.name) p.push(`flag ${k} needs short and name`);
  const optIds = new Set();
  for (const o of spec?.options || []) {
    if (!o.id || !o.label || !Array.isArray(o.choices) || o.choices.length < 2) { p.push(`option ${o.id || "?"} needs id, label and at least two choices`); continue; }
    if (optIds.has(o.id)) p.push(`duplicate option ${o.id}`); optIds.add(o.id);
    for (const c of o.choices) for (const h of c.hides || []) if (!flags[h]) p.push(`option ${o.id}.${c.id} hides flag ${h}, which isn't declared`);
    if (o.choices[0].hides?.length) p.push(`option ${o.id}: the first choice is the default and shouldn't hide anything`);
  }
  if (!Array.isArray(spec?.topics) || !spec.topics.length) return [...p, "no topics"];
  const seen = new Set();
  for (const pt of pointsOf(spec)) {
    if (!pt.id || !pt.title || !pt.text) p.push(`a point in ${pt.group.id} needs id, title and text`);
    if (seen.has(pt.id)) p.push(`duplicate point ${pt.id}`); seen.add(pt.id);
    if (spec.topics.some((t) => t.id === pt.id)) p.push(`point ${pt.id} has the same id as a topic`);
    if (!Array.isArray(pt.lessons) || !Array.isArray(pt.partial)) { p.push(`${pt.id}: lessons and partial must be arrays`); continue; }
    if (!pt.id.startsWith(pt.group.id) && pt.id !== pt.group.id) p.push(`${pt.id} isn't numbered under ${pt.group.id}`);
    for (const f of pt.flags) if (!flags[f]) p.push(`${pt.id} has flag ${f}, which isn't declared`);
    for (const ref of [...pt.lessons, ...pt.partial]) { const r = resolveRef(spec, ref); if (lessonIds && !lessonIds.has(`${r.course}:${r.lesson}`)) p.push(`${pt.id} names lesson ${ref}, which doesn't exist`); }
    const both = pt.lessons.filter((l) => pt.partial.includes(l));
    if (both.length) p.push(`${pt.id} lists ${both.join(", ")} as both full and partial`);
  }
  return p;
}
