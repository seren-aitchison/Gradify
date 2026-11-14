// Adaptive teaching experiments: which way of being taught works for this learner, measured, not assumed.
//
// Each time the learner uses the Gradify AI tutor on a lesson, the course logs the mode (a `session_started` ledger
// event with source "tutor": Ask, Talk it through, Viva, Challenge me, Connections). Later, their answers to that
// lesson's questions show whether it helped: the mean score of their next answers (from an hour to 14 days after),
// compared with their answers on the same lesson before. Per mode, Gradify reports how many uses it could measure and
// the average gain.
//
// It recommends a mode only with enough evidence (3 measured uses of at least two modes, and a clear gap), and even
// then it keeps suggesting a less-tried mode now and then, so one early result doesn't lock the learner into one way
// of learning. Pure, so Node can test it (tests/intel3.test.mjs).
const HOUR = 36e5, DAY = 864e5;
export const MODES = { explain: "Ask", socratic: "Talk it through", examiner: "Viva", challenge: "Challenge me", connect: "Connections" };
const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

/** The ledger event the course writes when a tutor mode is used (no database change: an existing event name). */
export const tutorEvent = ({ site, subject, lesson, mode }) => ({ event: "session_started", site, source: "tutor", concept: `${subject}:${lesson}`, detail: { mode, lesson, subject } });

/**
 * @param {{ ledger?: object[], attempts?: object[], now?: number }} o attempts: course answers (kit/assess/attempts.js)
 */
export function teachingExperiments({ ledger = [], attempts = [], now = Date.now() } = {}) {
  const uses = ledger.filter((e) => e.event === "session_started" && e.source === "tutor" && e.detail?.mode in MODES && e.detail?.lesson)
    .map((e) => ({ mode: e.detail.mode, lesson: e.detail.lesson, subject: e.detail.subject || null, at: Date.parse(e.at) })).filter((u) => Number.isFinite(u.at));
  const finalA = attempts.filter((a) => a.lesson && a.marking?.status !== "provisional").map((a) => ({ ...a, t: Date.parse(a.at) }));
  const rows = Object.keys(MODES).map((mode) => ({ mode, label: MODES[mode], uses: 0, measured: 0, after: [], gains: [] }));
  const byMode = new Map(rows.map((r) => [r.mode, r]));
  for (const u of uses) {
    const r = byMode.get(u.mode); r.uses++;
    const same = finalA.filter((a) => a.lesson === u.lesson && (!u.subject || a.subject === u.subject));
    const after = same.filter((a) => a.t > u.at + HOUR && a.t <= u.at + 14 * DAY).sort((a, b) => a.t - b.t).slice(0, 5);
    if (!after.length || now < u.at + HOUR) continue;
    const before = same.filter((a) => a.t < u.at).sort((a, b) => b.t - a.t).slice(0, 5);
    r.measured++; r.after.push(mean(after.map((a) => a.score)));
    if (before.length) r.gains.push(mean(after.map((a) => a.score)) - mean(before.map((a) => a.score)));
  }
  const modes = rows.map((r) => ({ mode: r.mode, label: r.label, uses: r.uses, measured: r.measured, after: mean(r.after), gain: mean(r.gains), compared: r.gains.length }));
  const ready = modes.filter((x) => x.measured >= 3 && x.gain != null).sort((a, b) => b.gain - a.gain);
  const enough = ready.length >= 2 && ready[0].gain - ready[1].gain >= 0.1;
  const best = enough ? ready[0] : null;
  // exploration: on one day in three (a stable choice per day), suggest the least-tried mode instead
  const leastTried = [...modes].sort((a, b) => a.uses - b.uses)[0];
  const explore = Math.floor(now / DAY) % 3 === 0;
  const suggest = best && !explore
    ? { mode: best.mode, label: best.label, why: `Your answers after ${best.label} rose by ${Math.round(best.gain * 100)} points on average, more than after other modes (${best.measured} measured uses).` }
    : { mode: leastTried.mode, label: leastTried.label, why: best ? `${best.label} works best for you so far, but trying ${leastTried.label} now and then keeps Gradify from settling too early.` : `Try ${leastTried.label}: Gradify measures how each mode affects your later answers, and needs a few uses of each to compare.` };
  return { modes, uses: uses.length, enough, best, suggest };
}
