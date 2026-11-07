// Understanding achievements: badges earned only from measured evidence of learning, never from XP, time spent or
// lessons ticked off. They sit beside the activity badges (lessons completed, streaks, XP) in every course, so the
// game rewards understanding as well as effort. Exploration never counts (kit/learning/evidence-class.js), and
// repeated drilling of one question is already damped in the evidence (mastery.js). Pure, so Node tests it.
import { evidenceFromAttempts, sixProfiles } from "./mastery.js";

export const UNDERSTANDING = [
  { id: "understood", name: "Understood", d: "Reach 80% measured mastery in a lesson, from your own answers", ok: (s) => s.mastered >= 1 },
  { id: "solid", name: "Solid ground", d: "Reach 80% measured mastery in 10 lessons", ok: (s) => s.mastered >= 10 },
  { id: "stuck", name: "It stuck", d: "Answer 10 questions right a day or more after you last saw them", ok: (s) => s.retained >= 10 },
  { id: "calibrated", name: "Know what you know", d: "Be right on at least 90% of 10 or more answers you marked as sure", ok: (s) => s.calibrated },
  { id: "comeback", name: "Comeback", d: "Turn a lesson around: from mostly wrong to 80% right on your latest answers", ok: (s) => s.comebacks >= 1 },
  { id: "exam", name: "Exam ready", d: "Pass a mock exam", ok: (s) => s.mocks >= 1 },
];

/**
 * @param {object[]} attempts  attempt records for one course
 * @param {{ exploration?: any, levels?: string[]|null, mocks?: Record<string, { pass?: boolean }[]>, now?: number }} [o]
 */
export function understandingStats(attempts = [], { exploration = null, levels = null, mocks = {}, now = Date.now() } = {}) {
  const ev = evidenceFromAttempts(attempts, { levels, exploration });
  const { all, groups } = sixProfiles(ev, { by: (e) => e.topic, now });
  const mastered = groups.filter((g) => g.mastery != null && g.mastery >= 0.8).length;
  const retained = ev.filter((e) => e.dim === "retention" && e.delayed && e.score >= 0.7).length;
  const c = all.calibration;
  const calibrated = Boolean(c && c.sure >= 10 && c.accuracyWhenSure >= 0.9);
  // a comeback: in one lesson, the first three unaided answers mostly wrong and the latest three at least 80% right
  const byLesson = new Map();
  for (const e of ev) if (e.independent && !e.delayed && e.dim !== "transfer" && e.topic) (byLesson.get(e.topic) || byLesson.set(e.topic, []).get(e.topic)).push(e);
  let comebacks = 0;
  for (const xs of byLesson.values()) {
    if (xs.length < 6) continue;
    xs.sort((a, b) => a.at - b.at);
    const mean = (ys) => ys.reduce((a, y) => a + y.score, 0) / ys.length;
    if (mean(xs.slice(0, 3)) < 0.5 && mean(xs.slice(-3)) >= 0.8) comebacks++;
  }
  const mockPasses = Object.values(mocks || {}).flat().filter((m) => m?.pass).length;
  return { mastered, retained, calibrated, comebacks, mocks: mockPasses };
}
