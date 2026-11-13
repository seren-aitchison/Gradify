// Lesson time: how long a learner actually spends on each course lesson, counted honestly. Time counts only while
// the page is visible and the learner has scrolled, tapped or typed in the last minute (a lesson left open in a
// background tab, or abandoned on screen, doesn't count). Also kept: how far down the lesson they got, and how many
// times they've opened it. Stored in the course progress (S.time), which already syncs to the account, and logged to
// the learning event ledger when the lesson is left.
// The timer takes its clock from outside, so Node can test it (tests/lesson-time.test.mjs).
export const IDLE_MS = 60_000;      // no scroll, tap or key for a minute: the learner has stopped
export const MIN_LOG_MS = 5_000;    // shorter visits aren't worth an event

export function lessonTimer({ now = () => Date.now(), onStop = () => {} } = {}) {
  let id = null, active = 0, lastTick = 0, lastInput = 0, visible = true, depth = 0, opened = 0;
  const tick = () => {
    const t = now();
    if (id && visible && lastTick) active += Math.max(0, Math.min(t, lastInput + IDLE_MS) - lastTick);
    lastTick = t;
  };
  return {
    start(lessonId) { if (id) this.stop(); id = lessonId; active = 0; depth = 0; opened = now(); lastTick = opened; lastInput = opened; visible = true; },
    input() { tick(); lastInput = now(); },
    scroll(fraction) { this.input(); depth = Math.max(depth, Math.min(1, Math.max(0, fraction))); },
    visibility(isVisible) { tick(); visible = isVisible; if (isVisible) { lastTick = now(); lastInput = now(); } },
    current() { tick(); return id ? { id, ms: active, depth } : null; },
    stop() { if (!id) return null; tick(); const out = { id, ms: active, depth, opened }; id = null; onStop(out); return out; },
  };
}

/** Add a visit to the course state's lesson-time record. */
export function addTime(S, { id, ms, depth, opened }) {
  S.time ||= {};
  const t = S.time[id] || { s: 0, v: 0, depth: 0, first: opened, last: opened };
  S.time[id] = { s: t.s + Math.round(ms / 1000), v: t.v + 1, depth: Math.max(t.depth || 0, Math.round(depth * 100) / 100), first: Math.min(t.first || opened, opened), last: Math.max(t.last || 0, opened) };
  return S.time[id];
}

// two devices' records: the larger total wins (no double counting when copies are merged again and again)
export const mergeTime = (x, y) => ({ s: Math.max(x.s || 0, y.s || 0), v: Math.max(x.v || 0, y.v || 0), depth: Math.max(x.depth || 0, y.depth || 0), first: Math.min(x.first || Infinity, y.first || Infinity), last: Math.max(x.last || 0, y.last || 0) });

/** The learner's real minutes per completed lesson (null until at least three completed lessons were timed). */
export function minutesPerLesson(S) {
  const timed = Object.entries(S.time || {}).filter(([lid, t]) => S.done?.[lid] && t.s >= 60);
  if (timed.length < 3) return null;
  const mins = timed.map(([, t]) => t.s / 60).sort((a, b) => a - b);
  return Math.round(Math.max(3, Math.min(60, mins[Math.floor(mins.length / 2)])) * 10) / 10;   // the median, within sense
}
