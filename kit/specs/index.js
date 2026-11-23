// The examination specifications Gradify maps its courses onto, for Specification Mastery
// (kit/learning/spec-mastery.js, docs/SPEC-MASTERY.md). Each specification is a data file in this folder; adding a
// board or a qualification is a new file and one line here, never new code.
//
//   specsFor("biology")   → the specifications a course can be measured against
//   specById(id)          → one specification
//   checkSpec(spec, ids)  → [] or a list of problems (tests run this on every specification)
//
// Specification format:
//   { id, board, qualification, subject, code, title, course, url, version, wording: "paraphrased" | "verbatim",
//     verified: null | { date, by, version }, tiers: boolean,
//     topics: [{ id, title, groups: [{ id, title, points: [{ id, title, text, lessons, partial, ht, sep }] }] }] }
import aqaGcseBiology from "./aqa-gcse-biology-8461.js";

export const SPECS = [aqaGcseBiology];

export const specsFor = (slug) => SPECS.filter((s) => s.course === slug);
export const specById = (id) => SPECS.find((s) => s.id === id) || null;

/** every point of a specification, flat, with its topic and group */
export function pointsOf(spec) {
  return spec.topics.flatMap((t) => t.groups.flatMap((g) => g.points.map((p) => ({ ...p, topic: { id: t.id, title: t.title }, group: { id: g.id, title: g.title } }))));
}

/** Problems with a specification; `lessonIds` (a Set) checks every mapped lesson exists in the course. */
export function checkSpec(spec, lessonIds = null) {
  const p = [];
  for (const k of ["id", "board", "qualification", "subject", "title", "course", "version", "wording"]) if (!spec?.[k]) p.push(`missing ${k}`);
  if (!["paraphrased", "verbatim"].includes(spec?.wording)) p.push(`wording should be "paraphrased" or "verbatim"`);
  if (spec?.wording === "verbatim" && !(spec.verified?.date && spec.verified?.by && spec.verified?.version)) p.push("verbatim wording needs verified: { date, by, version }");
  if (!Array.isArray(spec?.topics) || !spec.topics.length) return [...p, "no topics"];
  const seen = new Set();
  for (const pt of pointsOf(spec)) {
    if (!pt.id || !pt.title || !pt.text) p.push(`a point in ${pt.group.id} needs id, title and text`);
    if (seen.has(pt.id)) p.push(`duplicate point ${pt.id}`); seen.add(pt.id);
    if (!Array.isArray(pt.lessons) || !Array.isArray(pt.partial)) { p.push(`${pt.id}: lessons and partial must be arrays`); continue; }
    if (!pt.id.startsWith(pt.group.id) && pt.id !== pt.group.id) p.push(`${pt.id} isn't numbered under ${pt.group.id}`);
    for (const l of [...pt.lessons, ...pt.partial]) if (lessonIds && !lessonIds.has(l)) p.push(`${pt.id} names lesson ${l}, which isn't in the course`);
    const both = pt.lessons.filter((l) => pt.partial.includes(l));
    if (both.length) p.push(`${pt.id} lists ${both.join(", ")} as both full and partial`);
  }
  return p;
}
