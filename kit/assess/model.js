// Gradify assessment: the question data model and its text format. Subject-neutral.
//
// A question (Q) is plain data:
//   { id?, v?, type, q, d, objectives: [n…], why, …type fields }
//   id   permanent question id (written into the source as "M2#law-u03-q0012:"), never reused
//   v    version, increased whenever the question's content changes (kit/courses/<slug>/questions.js)
//   d    difficulty level 1–3; courses name the levels (for example Foundation, Application, Clinical reasoning)
//   objectives  the lesson's learning objectives (1-based) the question assesses, from "@1,2"
//   why  the overall explanation, shown after an attempt
// Choice-based types hold options as { text, correct, why } so every option can carry its own
// explanation ("why this is wrong"). Type-specific parsing lives with each type in types.js.
//
// Text format: TAG[difficulty][#id][@objectives]: body
//   M2#law-u03-q0012@1: question | right | wrong :: why it's wrong | wrong | wrong | explanation
// Tags: M (single best answer / multiple choice), TF (true or false), MS (choose all that apply),
// SEQ (ordering), MATCH (matching), SA (short answer), NUM (numerical answer). See types.js for each body.
import { TYPES } from "./types.js";

export const TAG_RE = /^(M|TF|MS|SEQ|MATCH|SA|NUM)([123]?)(?:#([a-z0-9-]+))?(?:@([\d,]+))?$/;
export const TAG_LINE = /^((?:M|TF|MS|SEQ|MATCH|SA|NUM)[123]?(?:#[a-z0-9-]+)?(?:@[\d,]+)?):\s*(.*)$/;

// split "text :: why" into an option
export const option = (raw, correct) => { const [text, why = ""] = raw.split(" :: ").map((x) => x.trim()); return { text, correct, why }; };
export const splitParts = (s) => s.split(" | ").map((x) => x.trim()).filter(Boolean);
export const splitList = (s) => s.split(";").map((x) => x.trim()).filter(Boolean);

export function parseQuestion(tag, body) {
  const m = tag.match(TAG_RE); if (!m) return null;
  const kind = { M: "choice", TF: "tf", MS: "multi", SEQ: "order", MATCH: "match", SA: "short", NUM: "num" }[m[1]];
  const base = { d: Number(m[2] || 2), id: m[3] || null, objectives: m[4] ? m[4].split(",").map(Number) : [] };
  const parsed = TYPES[kind]?.parse(body);
  return parsed ? { ...parsed, ...base } : null;
}

// a stable fingerprint of the content that matters for marking and display (for versioning)
export const contentKey = (Q) => JSON.stringify({ ...Q, id: undefined, v: undefined });

// accept the older { right, wrong } shape for choice and multi-select questions, so callers written
// before options carried explanations keep working
export function normalize(Q) {
  if (!Q || Q.options || !("right" in Q)) return Q;
  if (Q.type === "multi") return { ...Q, options: [...Q.right.map((t) => option(t, true)), ...Q.wrong.map((t) => option(t, false))] };
  return { ...Q, type: Q.type || (Q.wrong.length >= 4 ? "sba" : "mcq"), options: [option(Q.right, true), ...Q.wrong.map((t) => option(t, false))] };
}
