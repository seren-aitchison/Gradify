// Exam preparation for Gradify Notes: tell Gradify when an exam is and what's in it, and it works out a schedule that
// gets every card learned and reviewed enough times before the day. Pure, so Node tests it (tests/kb.test.mjs).
//
//   exam = { id, name, date: "YYYY-MM-DD", scope: [remId], days: [0..6] (study days, Sunday = 0), maxPerDay,
//            reps (reviews each card should have before the exam), finalDays (the final review period), extra
//            (cards still to be written), order: "sequential" | "shuffled", u }
//
// Four periods, as the plan shows them:
//   learning   new cards are introduced evenly, early enough for each to be reviewed `reps` times
//   catch-up   when the learner has fallen behind: the backlog is spread over the next few days, within maxPerDay
//   review     no new cards left: keep what's learned (the scheduler's due cards)
//   final      the last `finalDays` days: every card in the exam once more, spread evenly
// Cards here are the app's own card rows (reps, due_at and the FSRS fields), already filtered to the exam's scope.
import { recallNow, memoryOf, retrievability } from "../../learning/srs.js";

const DAY = 864e5;
const key = (d) => { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`; };
const atNoon = (k) => new Date(`${k}T12:00:00`);
export const GAPS = [1, 3, 7, 14, 30];   // the review gaps a new card's plan assumes, in days

export function newExam(o = {}) {
  return { id: o.id || `x${Date.now().toString(36)}`, name: "Exam", date: key(Date.now() + 28 * DAY), scope: [], days: [0, 1, 2, 3, 4, 5, 6], maxPerDay: 120, reps: 3, finalDays: 3, extra: 0, order: "sequential", u: Date.now(), ...o };
}
/** The study days from `from` up to the day before the exam. */
export function studyDays(exam, from = new Date()) {
  const out = [], end = atNoon(exam.date);
  for (let d = atNoon(key(from)); d < end; d = new Date(+d + DAY)) if ((exam.days || [0, 1, 2, 3, 4, 5, 6]).includes(d.getDay())) out.push(key(d));
  return out;
}

/**
 * The plan from today to the exam: { days: [{ day, phase, learn, review, final, total }], phases, newPerDay,
 * behind, warnings, readiness, remaining: { learn, reviews } }.
 */
export function examPlan(exam, cards, { today = new Date(), reviews = [] } = {}) {
  const days = studyDays(exam, today), n = days.length;
  const fresh = cards.filter((c) => !c.reps && !c.suspended);
  const learned = cards.filter((c) => c.reps && !c.suspended);
  const toLearn = fresh.length + Math.max(0, Number(exam.extra) || 0);
  const finalDays = Math.min(Math.max(0, exam.finalDays ?? 3), Math.max(0, n - 1));
  const reps = Math.max(1, Math.min(GAPS.length, exam.reps || 3));
  const warnings = [];
  if (!n) return { days: [], phases: [], newPerDay: 0, behind: 0, warnings: [exam.date && atNoon(exam.date) <= atNoon(key(today)) ? "This exam has passed." : "There are no study days before this exam. Add days in its settings."], readiness: readiness(exam, cards), remaining: { learn: toLearn, reviews: 0 } };
  // learning must finish early enough to fit `reps` reviews before the final period
  const needGap = GAPS.slice(0, reps - 1).reduce((a, b) => a + b, 0);
  const window = (total) => Math.max(1, total - finalDays - Math.min(needGap, Math.floor((total - finalDays) / 2)));
  const learnDays = window(n);
  // behind: how many fewer cards have been started than the plan made when the exam was set up expected by now
  let behind = 0;
  if (exam.created && exam.startCount) {
    const total = studyDays(exam, new Date(exam.created)).length, elapsed = Math.max(0, total - n);
    const plannedBy = Math.min(exam.startCount, Math.ceil(exam.startCount / window(total)) * elapsed);
    behind = Math.max(0, Math.min(fresh.length, plannedBy - Math.max(0, exam.startCount - fresh.length)));
  }
  const newPerDay = toLearn ? Math.ceil((toLearn - behind) / learnDays) : 0;
  // simulate: each new card is reviewed at the GAPS after it's introduced; learned cards come back when they're due
  const load = days.map((day, i) => ({ day, phase: i >= n - finalDays ? "final" : "learning", learn: 0, review: 0, final: 0 }));
  const idx = new Map(days.map((d, i) => [d, i]));
  let left = toLearn;
  const catchUpDays = behind ? Math.min(learnDays, Math.max(2, Math.ceil(behind / Math.max(1, (exam.maxPerDay || 120) - newPerDay)))) : 0;
  for (let i = 0; i < learnDays && left > 0; i++) {
    const extra = i < catchUpDays ? Math.ceil(behind / catchUpDays) : 0;
    const k = Math.min(left, newPerDay + extra);
    load[i].learn = k; left -= k;
    if (extra) load[i].phase = "catch-up";
    for (let r = 0; r < reps - 1; r++) {
      const off = GAPS.slice(0, r + 1).reduce((a, b) => a + b, 0), j = i + off;
      if (j < n - finalDays) load[j].review += k;
    }
  }
  for (const c of learned) {
    const due = c.due_at ? key(c.due_at) : days[0];
    const j = idx.has(due) ? idx.get(due) : due < days[0] ? 0 : -1;
    if (j >= 0 && j < n - finalDays) load[j].review += 1;
  }
  const everything = cards.filter((c) => !c.suspended).length + Math.max(0, Number(exam.extra) || 0);
  for (let i = n - finalDays; i < n; i++) load[i].final = Math.ceil(everything / Math.max(1, finalDays));
  for (const d of load) { d.total = d.learn + d.review + d.final; if (d.phase === "learning" && !d.learn) d.phase = "review"; }
  const peak = Math.max(...load.map((d) => d.total));
  if (peak > (exam.maxPerDay || 120)) warnings.push(`Some days need about ${peak} cards, more than your limit of ${exam.maxPerDay || 120}. Add study days, raise the limit, or start sooner.`);
  if (behind) warnings.push(`You're ${behind} new ${behind === 1 ? "card" : "cards"} behind. Gradify has spread the catch-up over the next ${catchUpDays} study ${catchUpDays === 1 ? "day" : "days"}.`);
  if (n <= finalDays + 1 && toLearn) warnings.push("The exam is very close: there isn't time to space reviews out, so the plan front-loads everything.");
  const phases = [];
  for (const d of load) { const last = phases.at(-1); if (last && last.phase === d.phase) last.to = d.day; else phases.push({ phase: d.phase, from: d.day, to: d.day }); }
  return { days: load, phases, newPerDay, behind, warnings, readiness: readiness(exam, cards), remaining: { learn: toLearn, reviews: load.reduce((a, d) => a + d.review + d.final, 0) } };
}

/** How likely each card is to be remembered on the exam day, on average, if nothing more were studied (0–1). */
export function readiness(exam, cards, now = Date.now()) {
  const live = cards.filter((c) => !c.suspended);
  if (!live.length) return 0;
  const t = atNoon(exam.date).getTime();
  let sum = 0;
  for (const c of live) {
    const m = memoryOf(c);
    if (!m) continue;
    sum += retrievability(Math.max(0, (t - m.last) / DAY), m.S);
  }
  return sum / live.length;
}
/** How many cards are mastered (recalled at 90% or more now, with at least two reviews). */
export const masteredCount = (cards, now = Date.now()) => cards.filter((c) => !c.suspended && c.reps >= 2 && (recallNow(c, now) ?? 0) >= 0.9).length;

/** Today's exam practice: the due cards, then today's new cards in the exam's order, within the day's limit. */
export function examQueue(exam, cards, { today = new Date(), plan = null } = {}) {
  plan ||= examPlan(exam, cards, { today });
  const d = plan.days[0];
  const due = cards.filter((c) => c.reps && !c.suspended && Date.parse(c.due_at) <= +today + DAY / 2).sort((a, b) => Date.parse(a.due_at) - Date.parse(b.due_at));
  let fresh = cards.filter((c) => !c.reps && !c.suspended);
  if (exam.order === "shuffled") fresh = [...fresh].sort(() => Math.random() - 0.5);
  const inFinal = d?.phase === "final";
  const extra = inFinal ? cards.filter((c) => c.reps && !c.suspended && !due.includes(c)).sort((a, b) => (recallNow(a) ?? 1) - (recallNow(b) ?? 1)).slice(0, d.final) : [];
  const learnToday = d ? d.learn : 0;
  return [...due, ...fresh.slice(0, learnToday), ...extra].slice(0, exam.maxPerDay || 120);
}
