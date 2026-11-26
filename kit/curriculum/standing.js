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
import { whereYouStand, STANDING, MAPPING } from "./mapping.js";

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
  // progress is counted within each mapping state, never across them: being secure on a provisionally mapped statement
  // is progress on that lesson, not a confirmed specification requirement
  const part = (k) => w.rows.filter((r) => r.mapping === k && r.standing !== "not-on-gradify"), count = (rows, st) => rows.filter((r) => r.standing === st).length;
  const ver = part("verified"), prov = part("provisional"), m = w.mapped;
  const line = (rows, what) => `${what}: ${count(rows, "secure")} of ${rows.length} secure, ${count(rows, "developing")} developing`;
  const states = [m.verified && `${m.verified} with a verified mapping`, m.provisional && `${m.provisional} provisionally mapped (awaiting verification)`, m.none && `${m.none} not mapped`].filter(Boolean).join(", ");
  return {
    ...w, mastery,
    summary: m.verified || m.provisional
      ? [ver.length && line(ver, "Verified mapping"), prov.length && line(prov, "Provisionally mapped, awaiting verification (progress, not confirmed coverage)")].filter(Boolean).join("; ") + `. Of ${w.rows.length} statements: ${states}.`
      : `This specification isn't mapped yet: none of its ${w.rows.length} statements is linked to a lesson`,
  };
}

export { STANDING, MAPPING };
