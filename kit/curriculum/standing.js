// A learner's standing against their specification, from the course's own mastery evidence: "know exactly where you
// stand against your entire exam specification". Pure, so the course engine, the progress view and tests share it.
//
//   attempts (kit/assess/attempts.js records, as the course keeps them)
//     → evidence per lesson (evidenceFromAttempts, kit/learning/mastery.js)
//     → P(known) per lesson (Bayesian Knowledge Tracing, kit/learning/bkt.js)
//     → a standing per specification statement (whereYouStand, kit/curriculum/mapping.js), through verified links only
//
// A statement the map hasn't verified is "Not mapped yet", whatever the learner has done: proposals never count.
// Works from a specification's committed index (kit/curriculum/specs/<id>.json), which has every ref but no text.
import { evidenceFromAttempts } from "../learning/mastery.js";
import { knows } from "../learning/bkt.js";
import { whereYouStand, STANDING } from "./mapping.js";

/** P(known) for each lesson the learner has unaided answers in: { lessonId: 0–1 } */
export function lessonMastery(attempts = [], { subject = null, levels = null } = {}) {
  const by = new Map();
  for (const e of evidenceFromAttempts(attempts, { levels })) { if (!e.topic) continue; if (!by.has(e.topic)) by.set(e.topic, []); by.get(e.topic).push(e); }
  const out = {};
  for (const [lesson, ev] of by) { const k = knows(ev, { subject }); if (k) out[lesson] = Math.round(k.p * 1000) / 1000; }
  return out;
}

/**
 * Where a learner stands on every statement of a specification, from their course attempts.
 * { rows: [{ ref, topic, standing, mastery?, lessons? }], by: { secure, developing, … }, next, summary }
 */
export function specStanding(spec, map, attempts, opts = {}) {
  const mastery = lessonMastery(attempts, opts), w = whereYouStand(spec, map, mastery, opts);
  const mapped = w.rows.length - w.by.unmapped, ai = w.rows.filter((r) => r.evidence === "ai-mapped").length;
  return {
    ...w, mastery,
    summary: mapped
      ? `${w.by.secure} of ${mapped} mapped statements secure, ${w.by.developing} developing${w.by.unmapped ? `; ${w.by.unmapped} not mapped yet` : ""}${ai ? ` (${ai === mapped ? "all" : ai} mapped by AI, not independently verified)` : ""}`
      : `This specification isn't mapped yet: none of its ${w.rows.length} statements has a reviewed link to a lesson`,
  };
}

export { STANDING };
