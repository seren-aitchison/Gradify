// Gradify learns from its own recommendations. It compares what it planned with what actually happened, and changes
// how it plans:
//  - session length: which lengths of planned session get done, and which don't
//  - time of day: when planned sessions get done
//  - sessions abandoned part-way (from the learning event ledger)
//  - real time per card, from response times, in place of the 25-second estimate
// Until there's enough evidence it changes nothing, and it always says what it learned and from how much.
// Pure, so Node can test it (tests/calibrate.test.mjs).
import { DAY, dayKey, minuteOf } from "./memory.js";

export const LENGTHS = [[0, 15, "up to 15 min"], [16, 30, "16–30 min"], [31, 45, "31–45 min"], [46, 1440, "over 45 min"]];
export const TIMES = [[0, 720, "mornings"], [720, 1020, "afternoons"], [1020, 1260, "evenings"], [1260, 1440, "late evenings"]];
const MIN_N = 3;

export function calibrate({ blocks = [], reviews = [], ledger = [], now = Date.now(), days = 30 } = {}) {
  const today = dayKey(now), nowMin = minuteOf(now), from = dayKey(now - days * DAY);
  const past = blocks.filter((b) => b.auto && (b.cal || "study") === "study" && b.day >= from && (b.day < today || (b.day === today && b.end_min <= nowMin)));
  const bucket = (list, edges, val) => edges.map(([lo, hi, label]) => { const xs = list.filter((b) => val(b) >= lo && val(b) <= hi); const done = xs.filter((b) => b.done).length; return { label, lo, hi, n: xs.length, done, rate: xs.length ? done / xs.length : null }; });
  const byLength = bucket(past, LENGTHS, (b) => b.end_min - b.start_min);
  const byTime = bucket(past, TIMES.map(([lo, hi, l]) => [lo, hi - 1, l]), (b) => b.start_min);

  // real seconds per card: the median answer time, ignoring walk-aways (over two minutes)
  const ms = reviews.map((r) => r.ms).filter((x) => Number.isFinite(x) && x > 1000 && x < 120000).sort((a, b) => a - b);
  const secPerCard = ms.length >= 20 ? Math.round(ms[Math.floor(ms.length / 2)] / 1000 + 6) : null;   // +6s for rating and the next card

  const started = ledger.filter((e) => e.event === "session_started").length, abandoned = ledger.filter((e) => e.event === "session_abandoned").length;
  const abandonRate = started >= 5 ? abandoned / started : null;

  // session length cap: the longest length that's usually done, when longer ones usually aren't
  const ok = byLength.filter((b) => b.n >= MIN_N && b.rate >= 0.65), bad = byLength.filter((b) => b.n >= MIN_N && b.rate < 0.5);
  let sessionCap = null;
  if (bad.length && ok.length) { const best = ok.filter((b) => b.hi < Math.min(...bad.map((x) => x.lo))).sort((a, b) => b.hi - a.hi)[0]; if (best) sessionCap = Math.min(best.hi, 45); }
  if (abandonRate != null && abandonRate > 0.4) sessionCap = Math.min(sessionCap ?? 25, 25);

  const times = byTime.filter((b) => b.n >= MIN_N);
  const bestTime = times.length >= 2 ? [...times].sort((a, b) => b.rate - a.rate)[0] : null;
  const preferred = bestTime && bestTime.rate >= 0.6 && bestTime.rate - Math.min(...times.map((t) => t.rate)) >= 0.25 ? { from: bestTime.lo, to: bestTime.hi + 1, label: bestTime.label } : null;

  const notes = [];
  if (sessionCap) notes.push(`You finish shorter sessions far more often, so Gradify keeps them to ${sessionCap} minutes with a break between.`);
  if (preferred) notes.push(`You get planned study done most in the ${preferred.label} (${Math.round(bestTime.rate * 100)}% done), so Gradify plans there first.`);
  if (secPerCard) notes.push(`A card takes you about ${secPerCard} seconds, so time estimates use that instead of 25.`);
  if (abandonRate != null && abandonRate > 0.4) notes.push(`You stop ${Math.round(abandonRate * 100)}% of sessions part-way, so sessions are planned shorter.`);
  const enough = past.length >= MIN_N * 2 || ms.length >= 20;
  return { byLength, byTime, secPerCard, abandonRate, sessionCap, preferred, notes, enough, planned: past.length, done: past.filter((b) => b.done).length, answers: ms.length };
}

/** The plan settings and estimates, adjusted by what was learned (never outside the learner's own limits). */
export function applyCalibration(intel, items, cal) {
  const tuned = { ...intel };
  if (cal.sessionCap) tuned.breakEvery = Math.min(intel.breakEvery || 45, cal.sessionCap);
  if (cal.preferred) tuned.prefer = cal.preferred;
  const factor = cal.secPerCard ? Math.max(0.6, Math.min(1.8, cal.secPerCard / 25)) : 1;
  const scaled = factor === 1 ? items : items.map((x) => (["review", "learn", "misconception", "weak"].includes(x.kind) ? { ...x, mins: Math.max(2, Math.round(x.mins * factor)) } : x));
  return { intel: tuned, items: scaled, factor };
}
