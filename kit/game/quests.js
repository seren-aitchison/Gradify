// Daily and weekly quests, chosen from the learner's own courses and evidence. A quest is only offered when it can
// be done and is worth doing: no "complete two lessons" when every lesson is done, no weak-topic quest without a
// measured weakness (kit/learning/targets.js decides what is weak; nothing is guessed). After three or more days
// away the daily quests are gentler. Quest keys include the day or week, so each pays once (engine.claim).
import { DAY, dayKey, weekStart } from "./engine.js";
import { weaknessTargets } from "../learning/targets.js";

// a small deterministic choice per day, so quests are stable across reloads and devices
const seed = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const attemptsOf = (c) => (c.S?.attempts || []).map((a) => ({ ...a, course: c.slug, ms: Date.parse(a.at) }));

// the context every quest reads: this day's and week's activity, open lessons and measured weak lessons
export function questContext(state, { graphs = {} } = {}) {
  const { now, events, courses, habits: H } = state;
  const day = dayKey(now), ws = weekStart(now);
  const today = events.filter((e) => dayKey(e.t) === day), week = events.filter((e) => e.t >= ws);
  const attempts = courses.flatMap(attemptsOf);
  const weak = [], weakAtWeekStart = [];
  for (const c of courses) {
    const A = c.S?.attempts || [], title = (id) => (c.units || []).flatMap((u) => u.lessons).find((l) => l.id === id)?.title || id;
    for (const t of weaknessTargets(A, { graph: graphs[c.slug] || null, now, exploration: c.exploration || null, levels: c.levels || null, limit: 3 })) weak.push({ ...t, course: c.slug, title: title(t.lesson) });
    for (const t of weaknessTargets(A.filter((a) => Date.parse(a.at) < ws), { graph: graphs[c.slug] || null, now: ws, exploration: c.exploration || null, levels: c.levels || null, limit: 6 })) weakAtWeekStart.push({ ...t, course: c.slug, title: title(t.lesson) });
  }
  const recency = (c) => Math.max(0, ...(c.S?.log || []).map((e) => e.t || 0));
  const open = [...courses].sort((a, b) => recency(b) - recency(a)).flatMap((c) => (c.units || []).flatMap((u) => u.lessons).filter((l) => !c.S?.done?.[l.id]).map((l) => ({ ...l, course: c.slug })));
  const unitsInProgress = courses.flatMap((c) => (c.units || []).filter((u) => { const d = u.lessons.filter((l) => c.S?.done?.[l.id]).length; return d > 0 && d < u.lessons.length; }).map((u) => ({ ...u, course: c.slug })));
  const unitsDoneThisWeek = courses.flatMap((c) => (c.units || []).filter((u) => u.lessons.length && u.lessons.every((l) => c.S?.done?.[l.id]) && Math.max(...u.lessons.map((l) => c.S.done[l.id])) >= ws).map((u) => ({ ...u, course: c.slug })));
  return {
    now, day, ws, today, week, attempts, weak, weakAtWeekStart, open, unitsInProgress, unitsDoneThisWeek,
    attemptsToday: attempts.filter((a) => dayKey(a.ms) === day), hasLabs: courses.some((c) => c.interactives?.length), hasExams: courses.some((c) => c.exams?.length),
    gentle: (H.daysAway ?? 0) >= 3, H,
  };
}
const count = (list, k) => list.filter((e) => e.k === k).length;

// the quest templates; each returns null when it doesn't fit the learner right now
export const DAILY = {
  lessons: (x) => x.open.length ? { title: x.gentle ? "Complete a lesson" : "Complete two lessons", of: x.gentle ? 1 : 2, n: count(x.today, "lesson"), xp: x.gentle ? 20 : 30, why: "New ground, one lesson at a time." } : null,
  questions: (x) => ({ title: `Answer ${x.gentle ? 5 : 10} practice questions`, of: x.gentle ? 5 : 10, n: x.attemptsToday.length, xp: x.gentle ? 25 : 50, why: "Retrieval practice is what makes learning stick." }),
  weak: (x) => x.weak.length ? { title: `Improve a weak topic: ${x.weak[0].title}`, of: 1, n: x.attemptsToday.some((a) => a.lesson === x.weak[0].lesson && a.course === x.weak[0].course && a.score >= 0.7) ? 1 : 0, xp: 40, why: x.weak[0].why, lesson: x.weak[0] } : null,
  lab: (x) => x.hasLabs ? { title: "Complete an interactive challenge", of: 1, n: Math.min(1, count(x.today, "practice")), xp: 30, why: "Change something and see what happens." } : null,
  review: (x) => ({ title: "Review 10 flashcards", of: 10, n: count(x.today, "review"), xp: 20, why: "Spaced review keeps what you know from fading." }),
  goal: (x) => ({ title: `Reach your daily goal of ${x.H.goal} XP`, of: x.H.goal, n: Math.min(x.H.goal, x.H.todayXp), xp: 20, why: "Small, steady days add up." }),
};
export const WEEKLY = {
  days: () => ({ title: "Study on three different days", of: 3, n: 0, xp: 60, why: "Spacing beats cramming.", fill: (x) => new Set(x.week.filter((e) => e.xp > 0).map((e) => dayKey(e.t))).size }),
  xp: (x) => ({ title: `Earn ${x.H.weekGoal} XP this week`, of: x.H.weekGoal, n: Math.min(x.H.weekGoal, x.H.weekXp), xp: 50, why: "Your weekly target: five days at your daily goal." }),
  turnaround: (x) => x.weakAtWeekStart.length ? { title: "Turn a weak topic around", of: 1, n: x.weakAtWeekStart.some((w) => !x.weak.some((v) => v.lesson === w.lesson && v.course === w.course)) ? 1 : 0, xp: 80, why: `Start with ${x.weakAtWeekStart[0].title}.` } : null,
  module: (x) => x.unitsInProgress.length || x.unitsDoneThisWeek.length ? { title: "Complete a whole module", of: 1, n: Math.min(1, x.unitsDoneThisWeek.length), xp: 100, why: x.unitsInProgress[0] ? `Closest: ${x.unitsInProgress[0].title}.` : "Done this week." } : null,
  mock: (x) => x.hasExams ? { title: "Complete a mock exam", of: 1, n: Math.min(1, count(x.week, "mock")), xp: 80, why: "Practise under exam conditions." } : null,
};

export function quests(state, opts = {}) {
  const x = questContext(state, opts), out = [];
  const mk = (kind, period, id, q) => q && out.push({ ...q, n: q.fill ? Math.min(q.of, q.fill(x)) : q.n, id, kind, key: `quest:${period}:${id}`, done: (q.fill ? q.fill(x) : q.n) >= q.of });
  // daily: a weak topic first if there is one, new lessons if any remain, then one more by rotation
  const order = x.gentle ? ["lessons", "questions", "goal"] : ["weak", "lessons", ...(["questions", "lab", "review"].sort((a, b) => seed(x.day + a) - seed(x.day + b)))];
  for (const id of order) { if (out.filter((q) => q.kind === "daily").length >= 3) break; mk("daily", x.day, id, DAILY[id](x)); }
  if (out.filter((q) => q.kind === "daily").length < 3) for (const id of ["questions", "goal"]) if (!out.some((q) => q.id === id) && out.filter((q) => q.kind === "daily").length < 3) mk("daily", x.day, id, DAILY[id](x));
  const wk = dayKey(x.ws);
  for (const id of ["days", "xp", "turnaround", "module", "mock"]) { if (out.filter((q) => q.kind === "weekly").length >= 3) break; mk("weekly", wk, id, WEEKLY[id](x)); }
  return out.map((q) => ({ ...q, paid: !!state.game.paid?.[q.key] }));
}

// ---------- what to do next ----------
// One clear suggestion, from evidence: back gently after time away, a weak foundation first, the quiz after a
// finished module, a stretch when things are going well, otherwise the next lesson.
export function nextSteps(state, opts = {}) {
  const x = questContext(state, opts), out = [];
  if (x.gentle) out.push({ kind: "return", title: "Welcome back", text: `It's been ${state.habits.daysAway} days. Start small: one lesson or five questions today counts.`, lesson: x.open[0] || null });
  if (x.weak[0]) out.push({ kind: "recover", title: `Review ${x.weak[0].title}`, text: x.weak[0].why, lesson: { id: x.weak[0].lesson, course: x.weak[0].course } });
  if (x.unitsDoneThisWeek[0]) out.push({ kind: "next", title: `You finished ${x.unitsDoneThisWeek[0].title}`, text: "Take its quiz to lock it in, then start the next school.", unit: x.unitsDoneThisWeek[0] });
  const recent = x.attempts.filter((a) => a.ms > state.now - 7 * DAY);
  if (recent.length >= 15 && recent.filter((a) => a.score >= 0.7).length / recent.length >= 0.85) out.push({ kind: "stretch", title: "Ready for a stretch", text: "You've been getting most answers right. Try the hardest questions or a mock exam." });
  if (x.open[0] && !x.gentle) out.push({ kind: "continue", title: `Continue: ${x.open[0].title}`, text: "Your next lesson.", lesson: x.open[0] });
  return out;
}
