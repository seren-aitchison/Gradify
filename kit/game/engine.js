// The Gradify game engine: one picture of a learner's progress across every course, and the rewards that keep a
// study habit going. Pure functions (no DOM, no storage), so tests, the Journey page and any course can share them.
//
// It adds no second XP ledger. Every course already records each award in its own log (kit/course/course.js,
// localStorage "gradify.course.<slug>": S.log = [{ t, xp, k, id }]), paying questions only on a first-try solve,
// lessons once, quizzes once per pass. This engine reads those logs as the source of truth, and keeps only its own
// rewards (quests, achievements, challenges) in a separate ledger keyed by reward, so a reload, a repeated request
// or a second tab can never pay the same reward twice.
//
//   const state = gameState(courses, game, { now })   courses: [{ slug, site, name, units, S }], game: the ledger
//   claimable(state)                                    rewards that are earned and not yet paid
//   claim(game, reward, now)                            → a new ledger with the reward paid once

export const DAY = 864e5;

// ---------- XP, levels and ranks ----------
// XP per activity, as the course engine pays it (kit/course/course.js XP), plus the engine's own rewards.
export const XP = { lesson: 10, check: 5, chest: 15, quiz: 50, perfect: 20, review: 2, problem: 5, weekly: 100, write: 20, lab: 5 };
// The same curve every course uses: level n needs 50·n·(n+1) XP in total, so levels get further apart.
export const levelOf = (xp) => { let n = 1; while (50 * n * (n + 1) <= xp) n++; return { n, from: 50 * (n - 1) * n, to: 50 * n * (n + 1), xp, into: xp - 50 * (n - 1) * n, need: 50 * n * (n + 1) - xp }; };
// Named ranks by overall level; a subject can rename them (RANK_TITLES) without changing the thresholds.
export const RANKS = [
  { at: 1, key: "novice", name: "Novice" }, { at: 3, key: "apprentice", name: "Apprentice" }, { at: 6, key: "scholar", name: "Scholar" },
  { at: 10, key: "adept", name: "Adept" }, { at: 15, key: "expert", name: "Expert" }, { at: 21, key: "master", name: "Master" },
  { at: 28, key: "sage", name: "Sage" }, { at: 36, key: "luminary", name: "Luminary" },
];
export const RANK_TITLES = {
  history: { novice: "Chronicler", apprentice: "Archivist", scholar: "Researcher", adept: "Historian", expert: "Senior Historian", master: "Master Historian", sage: "Historiographer", luminary: "Laureate of History" },
  maths: { novice: "Counter", apprentice: "Calculator", scholar: "Problem Solver", adept: "Analyst", expert: "Theorist", master: "Mathematician", sage: "Prover", luminary: "Fields Laureate" },
  law: { novice: "Student", apprentice: "Clerk", scholar: "Paralegal", adept: "Trainee", expert: "Associate", master: "Counsel", sage: "Silk", luminary: "Jurist" },
};
export function rankOf(level, subject = null) {
  const r = [...RANKS].reverse().find((x) => level >= x.at);
  const next = RANKS.find((x) => x.at > level) || null;
  const title = (k) => RANK_TITLES[subject]?.[k] || RANKS.find((x) => x.key === k).name;
  return { key: r.key, name: title(r.key), next: next && { at: next.at, name: title(next.key) } };
}

// ---------- the event stream ----------
// Every award from every course, oldest first, each tagged with its course. Entries the engine paid itself are added
// from the game ledger, so XP totals include them without double counting.
// `extra`: learning outside courses (flashcard sessions, study packs, workouts...) from the account's activity log, so
// the level, streak and calendar here match the account's (outsideCourses() picks those rows).
export function eventsOf(courses, game = {}, extra = []) {
  const ev = [];
  for (const c of courses) for (const e of c.S?.log || []) if (e && Number.isFinite(e.xp) && Number.isFinite(e.t)) ev.push({ ...e, course: c.slug });
  for (const [key, r] of Object.entries(game.paid || {})) ev.push({ t: r.t, xp: r.xp, k: "game", id: key, course: null });
  for (const a of extra) { const t = Date.parse(a.at); if (Number.isFinite(t) && Number.isFinite(a.xp)) ev.push({ t, xp: a.xp, k: "life", id: a.kind, course: null, site: a.site || null }); }
  return ev.sort((a, b) => a.t - b.t);
}

// The activity rows that courses and the game ledger don't already account for. Every course award is logged twice,
// in the course's own progress (kind "<course>-<what>") and in the activity log, and every paid game reward is synced
// as "game-<key>": those are left out so nothing counts twice.
export function outsideCourses(activity = [], courseSlugs = []) {
  return activity.filter((a) => a && a.xp && typeof a.kind === "string" && !a.kind.startsWith("game-") && !courseSlugs.some((s) => a.kind.startsWith(`${s}-`)));
}

// local calendar day as "YYYY-MM-DD" (the learner's own midnight, not UTC)
export const dayKey = (t) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const dayStart = (t) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); };
const addDays = (t, n) => { const d = new Date(t); d.setDate(d.getDate() + n); return d.getTime(); };
// weeks start on Monday
export const weekStart = (t) => { const d = new Date(dayStart(t)); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d.getTime(); };

// ---------- streaks and habits ----------
// A day counts when the learner earns any XP. Missed days don't wipe a streak straight away: every 7 active days
// bank a rest day (up to 3), and a missed day is covered by a banked rest day automatically. Being away longer than
// the rest days cover ends the streak quietly; the best streak is kept as a personal record.
export const REST_EVERY = 7, REST_MAX = 3;
export function habits(events, { now = Date.now(), goal = 30 } = {}) {
  const byDay = new Map();
  for (const e of events) if (e.xp > 0) byDay.set(dayKey(e.t), (byDay.get(dayKey(e.t)) || 0) + e.xp);
  const today = dayStart(now), first = events.length ? dayStart(events[0].t) : today;
  let streak = 0, best = 0, bank = 0, activeRun = 0, restUsed = 0;
  const restDays = new Set();
  for (let t = first; t <= today; t = addDays(t, 1)) {
    const k = dayKey(t), active = byDay.has(k);
    if (active) {
      streak++; activeRun++;
      if (activeRun % REST_EVERY === 0) bank = Math.min(REST_MAX, bank + 1);
    } else if (t === today) {
      // today isn't over: an empty today neither breaks nor extends the streak
    } else if (streak > 0 && bank > 0) { bank--; restUsed++; restDays.add(k); }
    else { streak = 0; activeRun = 0; }
    best = Math.max(best, streak);
  }
  const todayXp = byDay.get(dayKey(now)) || 0;
  const ws = weekStart(now);
  const weekXp = events.filter((e) => e.t >= ws).reduce((a, e) => a + e.xp, 0);
  const daysThisWeek = [...Array(7)].map((_, i) => dayKey(addDays(ws, i)));
  const goalDays = daysThisWeek.filter((k) => (byDay.get(k) || 0) >= goal).length;
  // weekly consistency: active on at least 3 days of the week
  const weeks = new Map();
  for (const k of byDay.keys()) { const w = dayKey(weekStart(new Date(k + "T12:00").getTime())); weeks.set(w, (weeks.get(w) || 0) + 1); }
  const consistentWeeks = [...weeks.values()].filter((n) => n >= 3).length;
  const lastActive = events.length ? events.filter((e) => e.xp > 0).at(-1)?.t ?? null : null;
  return {
    streak, best, restBank: bank, restUsed, restDays: [...restDays], today: byDay.has(dayKey(now)), todayXp, weekXp,
    goal, goalMet: todayXp >= goal, goalDays, weekGoal: goal * 5, consistentWeeks,
    daysAway: lastActive == null ? null : Math.floor((today - dayStart(lastActive)) / DAY),
    calendar: byDay, bestDay: Math.max(0, ...byDay.values()),
    bestWeek: Math.max(0, ...[...groupWeeks(events).values()]),
  };
}
function groupWeeks(events) { const m = new Map(); for (const e of events) { const w = weekStart(e.t); m.set(w, (m.get(w) || 0) + e.xp); } return m; }

// ---------- the learner's overall state ----------
export function gameState(courses, game = {}, { now = Date.now(), goal = null, extra = [] } = {}) {
  const events = eventsOf(courses, game, extra);
  const xp = events.reduce((a, e) => a + e.xp, 0);
  const L = levelOf(xp);
  const dailyGoal = goal ?? game.goal ?? Math.max(20, ...courses.map((c) => c.S?.goal || 0));
  // streaks, goals and the calendar measure learning, so the engine's own rewards (k "game") don't count towards them
  const H = habits(events.filter((e) => e.k !== "game"), { now, goal: dailyGoal });
  const subjects = courses.map((c) => {
    const cx = (c.S?.log || []).reduce((a, e) => a + (e.xp || 0), 0), lessons = (c.units || []).flatMap((u) => u.lessons);
    const done = lessons.filter((l) => c.S?.done?.[l.id]).length;
    const units = (c.units || []).map((u) => ({ id: u.id, n: u.n, title: u.title, total: u.lessons.length, done: u.lessons.filter((l) => c.S?.done?.[l.id]).length }));
    return { slug: c.slug, site: c.site, name: c.name, xp: cx, level: levelOf(cx), rank: rankOf(levelOf(cx).n, c.slug), lessons: lessons.length, done, units, unitsDone: units.filter((u) => u.total && u.done === u.total).length };
  }).sort((a, b) => b.xp - a.xp);
  const todayGain = events.filter((e) => dayKey(e.t) === dayKey(now)).reduce((a, e) => a + e.xp, 0);
  return { now, xp, level: L, rank: rankOf(L.n), todayGain, habits: H, subjects, events, courses, game, recent: events.filter((e) => e.xp > 0).slice(-8).reverse() };
}

// ---------- the reward ledger ----------
// game = { paid: { "<reward key>": { t, xp, title } }, seen: { "<achievement id>": t }, goal? }. Keys are stable for
// a reward's period ("quest:2026-11-07:lessons", "ach:scholar", "challenge:2026-11-07"), so paying is idempotent.
export function claim(game, reward, now = Date.now()) {
  if (!reward?.key || !reward.done) return game;
  if (game.paid?.[reward.key]) return game;
  return { ...game, paid: { ...(game.paid || {}), [reward.key]: { t: now, xp: Math.max(0, Math.round(reward.xp || 0)), title: reward.title || reward.key } } };
}
export const isPaid = (game, key) => !!game.paid?.[key];

// Rewards still to log to the account: paid on this device, not yet synced from here, and not already held by the
// account (kinds the account's activity already has, "game-<key>"). Used by the Journey page's account sync.
export const rewardKind = (key) => `game-${key}`;
export function unsynced(game, accountKinds = new Set()) {
  return Object.entries(game.paid || {}).filter(([key]) => !game.synced?.[key] && !accountKinds.has(rewardKind(key)));
}
