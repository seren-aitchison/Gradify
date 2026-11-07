// Subject adapters: what one subject family adds to the shared engine, kept out of the engine itself.
//
// The shared engine (kit/course, kit/assess, kit/learning, the AI tutor) knows nothing about any subject. A course
// is a config (kit/course/spec.js). An adapter holds what several courses of one subject share, or what only that
// subject needs:
//   defaults        config fields every course of the subject starts from (a course's own fields win)
//   questionTypes   assessment types the subject adds (registered with kit/assess/questions.js)
//   qa              { expert, rules(unit, L, text), flags(L, text) }: subject checks for scripts/qa-courses.mjs
//
//   import { defineCourse } from "../../subjects/define.js";
//   import maths from "../../subjects/maths.js";
//   export default defineCourse(maths, { slug: "maths", units, … });
//
// An improvement to the engine reaches every course at once; an adapter changes only its own subject.
import { registerQuestionType } from "../assess/questions.js";

export function defineCourse(adapter, cfg) {
  if (!adapter?.id) throw new Error("defineCourse needs an adapter with an id");
  for (const t of adapter.questionTypes || []) registerQuestionType(t);
  return { ...(adapter.defaults || {}), ...cfg, adapter: adapter.id };
}
