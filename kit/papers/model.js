// Gradify Past Papers: the question-bank format, marking and checks (docs/LEARNING-ENVIRONMENT-ROADMAP.md §4).
// No browser APIs, so Node can test it.
//
// A bank is one topic of one specification, made of Gradify's own exam-style questions (source "gradify"). Official
// papers are linked, never copied (§4.1). Every question is tied to specification points and to the lessons that teach
// them, so an answer is evidence for Specification Mastery through the usual attempt records.
//
//   bank     = { id, spec, topic, title, source, questions: [question] }
//   question = { id, points: ["4.1.1.1"], tier: "both" | "higher", sep?, context?, parts: [part] }
//   part     = { id, marks, Q, scheme, model, examiner, mistakes, lessons }
//     Q         a question in the assessment library's shape (kit/assess/types.js): mcq, tf, multi, order, match,
//               num or short; the part is marked by that type's own handler
//     scheme    the mark scheme: [{ text, marks? }]; for a "short" part the student ticks the points their answer
//               makes, up to `marks` (so "any two from four" is four points and marks: 2)
//     model     a full-mark answer, in words
//     examiner  why the marks are given: what earns credit and what doesn't
//     mistakes  common mistakes and why they lose marks
//     lessons   lesson ids in the specification's course ("Revise this concept")
import { handlerFor } from "../assess/types.js";

/** The marks a part earns from its question type's result. Auto-marked parts earn the share of marks their score
 *  covers (rounded down); a self-assessed part earns one mark per ticked point, up to its marks. */
export function partMarks(part, result, response) {
  if (part.Q.type === "short") {
    const ticked = Array.isArray(response?.points) ? response.points.length : 0;
    return Math.min(ticked, part.marks);
  }
  return Math.floor((result?.score ?? 0) * part.marks + 1e-9);
}

/** Mark one part: { marks, of, score, correct, self, result }. self: the marks are the student's own judgement. */
export function markPart(part, response) {
  const result = handlerFor(part.Q).mark(part.Q, part.Q.type === "short" ? response?.points || [] : response);
  const marks = partMarks(part, result, response);
  return { marks, of: part.marks, score: part.marks ? marks / part.marks : 0, correct: marks === part.marks, self: part.Q.type === "short", result };
}

export const totalMarks = (q) => q.parts.reduce((s, p) => s + p.marks, 0);
export const bankMarks = (bank) => bank.questions.reduce((s, q) => s + totalMarks(q), 0);

/** Check a bank against its specification and course. Returns a list of problems (empty when it's sound).
 *  spec: the specification (kit/specs/<id>.js shape, or { topics }) ; lessonIds: a Set of the course's lesson ids. */
export function validateBank(bank, { spec, lessonIds } = {}) {
  const errs = [], seen = new Set();
  const topic = spec?.topics?.find((t) => t.id === bank.topic);
  const pointIds = new Set(topic ? topic.groups.flatMap((g) => g.points.map((p) => p.id)) : []);
  if (!["gradify"].includes(bank.source)) errs.push(`${bank.id}: source must be "gradify" (official papers are linked, not copied)`);
  for (const q of bank.questions) {
    if (seen.has(q.id)) errs.push(`${q.id}: duplicate id`); seen.add(q.id);
    if (!q.points?.length) errs.push(`${q.id}: no specification points`);
    for (const p of q.points || []) if (topic && !pointIds.has(p)) errs.push(`${q.id}: ${p} isn't a point of ${bank.topic}`);
    if (!["both", "higher"].includes(q.tier)) errs.push(`${q.id}: tier must be "both" or "higher"`);
    if (!q.parts?.length) errs.push(`${q.id}: no parts`);
    for (const p of q.parts || []) {
      const at = `${q.id}${p.id}`;
      if (!Number.isInteger(p.marks) || p.marks < 1) errs.push(`${at}: marks must be a whole number from 1`);
      if (!p.Q?.type || !handlerFor(p.Q)) errs.push(`${at}: unknown question type`);
      if (!p.Q?.q) errs.push(`${at}: no question text`);
      if (!p.model) errs.push(`${at}: no model answer`);
      if (!p.examiner) errs.push(`${at}: no examiner notes (why the marks are given)`);
      if (!p.mistakes?.length) errs.push(`${at}: no common mistakes`);
      if (!p.scheme?.length) errs.push(`${at}: no mark scheme`);
      if (!p.lessons?.length) errs.push(`${at}: no lessons to revise`);
      for (const l of p.lessons || []) if (lessonIds && !lessonIds.has(l)) errs.push(`${at}: lesson ${l} doesn't exist`);
      const Q = p.Q || {};
      if (Q.type === "short") {
        if (JSON.stringify(Q.points) !== JSON.stringify(p.scheme.map((s) => s.text))) errs.push(`${at}: the tick list must be the mark scheme's points`);
        if (p.scheme.length < p.marks) errs.push(`${at}: ${p.marks} marks but only ${p.scheme.length} mark points`);
      }
      if (["mcq", "sba", "tf"].includes(Q.type) && Q.options?.filter((o) => o.correct).length !== 1) errs.push(`${at}: exactly one option must be correct`);
      if (Q.type === "multi" && !Q.options?.some((o) => o.correct)) errs.push(`${at}: no correct options`);
      if (Q.type === "num") {
        if (!Number.isFinite(Q.answer) || !Q.tol) errs.push(`${at}: a calculation needs an answer and a tolerance`);
        if (typeof p.check === "function" && Math.abs(p.check() - Q.answer) > 1e-9 * Math.max(1, Math.abs(Q.answer))) errs.push(`${at}: the worked calculation gives ${p.check()}, not ${Q.answer}`);
        if (typeof p.check !== "function") errs.push(`${at}: a calculation needs check(), the working as code`);
      }
      if (["order", "match"].includes(Q.type) && p.marks > (Q.steps || Q.pairs).length) errs.push(`${at}: more marks than items`);
    }
  }
  for (const id of pointIds) if (!bank.questions.some((q) => q.points.includes(id))) errs.push(`${bank.topic}: point ${id} has no question`);
  return errs;
}

// ---------- helpers for writing banks ----------
export const mcq = (q, right, wrong, why = "") => ({ type: wrong.length >= 4 ? "sba" : "mcq", q, why, options: [{ text: right, correct: true, why: "" }, ...wrong.map((w) => (typeof w === "string" ? { text: w, correct: false, why: "" } : { text: w[0], correct: false, why: w[1] }))] });
export const tf = (q, answer, why = "") => ({ type: "tf", q, why, options: [{ text: "True", correct: answer, why: "" }, { text: "False", correct: !answer, why: "" }] });
export const num = (q, answer, { tol = 0, rel = null, unit = "", why = "" } = {}) => ({ type: "num", q, answer, tol: rel != null ? { rel } : { abs: tol }, unit, why });
export const order = (q, steps, why = "") => ({ type: "order", q, steps, why });
export const match = (q, pairs, why = "") => ({ type: "match", q, pairs, why });
/** a written answer: the scheme's points become the tick list */
export const written = (q, model, scheme) => ({ type: "short", q, model, points: scheme.map((s) => s.text), why: "" });
