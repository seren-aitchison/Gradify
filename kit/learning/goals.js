// Goals: what each goal measures, and its progress, worked out from records Gradify already keeps. Pure functions (no
// browser APIs), so Node tests them and the native app can port them line for line. The table is public.goals
// (supabase/migrations/20261112120000_goals.sql); nothing here stores a count.
//
// A goal can be:
//   tracked   metric = { source, metric, course?, site?, period }: its value comes from existing records
//   counted   target + manual_value: the learner counts something Gradify can't see (applications, books)
//   checklist milestones only
//   habit     habit = { mode, days?, per_week?, site?, kind? }: days with matching activity, week by week
// Days and weeks are the goal's own time zone (goal.tz), so every device agrees on "today" and "this week".

export const AREAS = [["learning", "Learning"], ["career", "Career"], ["skills", "Skills"], ["health", "Health"], ["personal", "Personal"]];
// what can be measured reliably, and from where
export const METRICS = {
  "course:lessons": { source: "course", metric: "lessons", unit: "lessons", label: "Lessons completed in a course", needsCourse: true },
  "course:units": { source: "course", metric: "units", unit: "schools", label: "Schools (units) completed in a course", needsCourse: true },
  "course:xp": { source: "course", metric: "xp", unit: "XP", label: "XP earned in a course", needsCourse: true },
  "xp:xp": { source: "xp", metric: "xp", unit: "XP", label: "XP earned across Gradify" },
  "activity:days": { source: "activity", metric: "days", unit: "days", label: "Days you studied (any site, or one)" },
  "reviews:cards": { source: "reviews", metric: "cards", unit: "cards", label: "Flashcards reviewed from your notes" },
};
export const PERIODS = [["since_start", "Since I set the goal"], ["week", "Each week"], ["month", "Each month"], ["all_time", "In total"]];
export const HABIT_MODES = [["daily", "Every day"], ["weekdays", "On chosen days"], ["per_week", "A number of days a week"]];
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY = 864e5;

// ---------- days in a time zone ----------
const fmtCache = new Map();
function parts(t, tz) {
  let f = fmtCache.get(tz);
  if (!f) {
    try { f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }); }
    catch { f = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }); }
    fmtCache.set(tz, f);
  }
  const p = Object.fromEntries(f.formatToParts(new Date(t)).map((x) => [x.type, x.value]));
  return { key: `${p.year}-${p.month}-${p.day}`, dow: DAY_NAMES.indexOf(p.weekday) + 1 };   // dow: Monday 1 … Sunday 7
}
/** "YYYY-MM-DD" for an instant in a time zone */
export const dayIn = (t, tz) => parts(t, tz).key;
const shiftKey = (key, n) => { const d = new Date(`${key}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
/** Monday of the week containing t, as a day key in tz */
export function weekStartKey(t, tz) { const { key, dow } = parts(t, tz); return shiftKey(key, 1 - dow); }
const toMs = (v) => (typeof v === "number" ? v : Date.parse(v));

// ---------- checks ----------
/** A goal as the learner typed it → { goal, errors }. The database checks the same rules. */
export function validateGoal(g = {}) {
  const errors = [], goal = { ...g };
  goal.title = String(g.title ?? "").trim().slice(0, 120);
  if (!goal.title) errors.push("Give the goal a name.");
  if (!AREAS.some(([a]) => a === goal.area)) goal.area = "learning";
  if (goal.target != null && goal.target !== "") { goal.target = Number(goal.target); if (!(goal.target > 0 && goal.target <= 1e6)) errors.push("The target must be a number above 0."); } else goal.target = null;
  if (goal.metric) {
    const def = METRICS[`${goal.metric.source}:${goal.metric.metric}`];
    if (!def) errors.push("That can't be measured yet.");
    else {
      if (def.needsCourse && !goal.metric.course) errors.push("Choose the course it measures.");
      if (!goal.target) errors.push("A measured goal needs a target.");
      goal.metric = { source: def.source, metric: def.metric, ...(def.needsCourse ? { course: goal.metric.course } : {}), ...(goal.metric.site ? { site: goal.metric.site } : {}), period: PERIODS.some(([p]) => p === goal.metric.period) ? goal.metric.period : "since_start" };
      goal.unit = def.unit; goal.manual_value = null;
    }
  } else if (goal.target && goal.manual_value == null) goal.manual_value = 0;
  if (goal.habit) {
    const h = goal.habit, mode = HABIT_MODES.some(([m]) => m === h.mode) ? h.mode : null;
    if (!mode) errors.push("Choose how often.");
    const days = [...new Set((h.days || []).map(Number).filter((d) => d >= 1 && d <= 7))].sort();
    if (mode === "weekdays" && !days.length) errors.push("Choose at least one day.");
    const per = Math.round(Number(h.per_week));
    if (mode === "per_week" && !(per >= 1 && per <= 7)) errors.push("Choose between 1 and 7 days a week.");
    goal.habit = { mode, ...(mode === "weekdays" ? { days } : {}), ...(mode === "per_week" ? { per_week: per } : {}), ...(h.site ? { site: h.site } : {}), ...(h.kind ? { kind: h.kind } : {}) };
  }
  goal.milestones = (Array.isArray(g.milestones) ? g.milestones : []).filter((m) => String(m?.title ?? "").trim()).slice(0, 50).map((m) => ({ id: m.id || rid(), title: String(m.title).trim().slice(0, 120), done_at: m.done_at || null }));
  if (goal.target_date && !/^\d{4}-\d{2}-\d{2}$/.test(goal.target_date)) errors.push("The target date isn't a date.");
  return { goal, errors };
}
const rid = () => (globalThis.crypto?.randomUUID?.() ?? `m${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`);

// ---------- measuring ----------
/** The first day key (or instant, for since_start) the goal's period counts from. */
function windowOf(goal, now) {
  const p = goal.metric?.period || "since_start", tz = goal.tz || "Europe/London";
  if (p === "since_start") return { from: toMs(goal.created_at) || 0 };
  if (p === "week") return { fromKey: weekStartKey(now, tz) };
  if (p === "month") return { fromKey: `${dayIn(now, tz).slice(0, 8)}01` };
  return { from: 0 };
}
const inWindow = (t, w, tz) => (w.fromKey ? dayIn(t, tz) >= w.fromKey : t >= w.from);

/**
 * The goal's current value from existing records.
 * data: { courses: { [slug]: { S, units? } }, knownCourses: [slugs], activity: [{ at, site, kind, xp }],
 *         reviews: [{ reviewed_at }], xpEvents: [{ t, xp }] }
 * → { value, available, note? }
 */
export function measure(goal, data = {}, now = Date.now()) {
  const m = goal.metric, tz = goal.tz || "Europe/London";
  if (!m) return { value: goal.target ? Number(goal.manual_value || 0) : null, available: true };
  const w = windowOf(goal, now);
  if (m.source === "course") {
    if (data.knownCourses && !data.knownCourses.includes(m.course)) return { value: null, available: false, note: "This course isn't available any more." };
    const c = data.courses?.[m.course];
    if (!c) return { value: 0, available: true, note: "Not started yet." };
    const S = c.S || {};
    if (m.metric === "lessons") return { value: Object.values(S.done || {}).map(toMs).filter((t) => Number.isFinite(t) && inWindow(t, w, tz)).length, available: true };
    if (m.metric === "xp") return { value: (S.log || []).filter((e) => Number.isFinite(e?.t) && inWindow(e.t, w, tz)).reduce((a, e) => a + (e.xp || 0), 0), available: true };
    if (m.metric === "units") {
      if (!c.units) return { value: null, available: false, note: "This course's schools couldn't be loaded." };
      // a school counts when its last lesson was finished inside the period
      return { value: c.units.filter((u) => u.lessons.length && u.lessons.every((l) => S.done?.[l.id])).filter((u) => inWindow(Math.max(...u.lessons.map((l) => toMs(S.done[l.id]))), w, tz)).length, available: true };
    }
  }
  if (m.source === "xp") return { value: (data.xpEvents || []).filter((e) => Number.isFinite(e.t) && inWindow(e.t, w, tz)).reduce((a, e) => a + (e.xp || 0), 0), available: true };
  if (m.source === "activity") return { value: new Set((data.activity || []).filter((a) => (!m.site || a.site === m.site) && inWindow(toMs(a.at), w, tz)).map((a) => dayIn(toMs(a.at), tz))).size, available: true };
  if (m.source === "reviews") return { value: (data.reviews || []).filter((r) => inWindow(toMs(r.reviewed_at), w, tz)).length, available: true };
  return { value: null, available: false, note: "That can't be measured yet." };
}

/** A habit's week: which days counted, how many are needed, and how the last four weeks went. */
export function habitWeek(goal, activity = [], now = Date.now()) {
  const h = goal.habit; if (!h) return null;
  const tz = goal.tz || "Europe/London";
  const qualifies = (a) => (!h.site || a.site === h.site) && (!h.kind || a.kind === h.kind || String(a.kind || "").endsWith(`-${h.kind}`));
  const days = new Set(activity.filter(qualifies).map((a) => dayIn(toMs(a.at), tz)));
  const need = (dows) => (h.mode === "daily" ? 7 : h.mode === "weekdays" ? h.days.length : h.per_week);
  const weekOf = (start) => {
    const keys = Array.from({ length: 7 }, (_, i) => shiftKey(start, i));
    const done = keys.filter((k) => days.has(k)), required = need();
    const hit = h.mode === "weekdays" ? keys.filter((k, i) => h.days.includes(i + 1) && days.has(k)).length : done.length;
    return { start, keys, done, hit, required, met: hit >= required };
  };
  const start = weekStartKey(now, tz), today = dayIn(now, tz), dow = parts(now, tz).dow;
  const thisWeek = weekOf(start), past = [1, 2, 3, 4].map((n) => weekOf(shiftKey(start, -7 * n)));
  // only weeks since the goal began count towards consistency
  const began = dayIn(toMs(goal.created_at) || now, tz);
  const counted = past.filter((wk) => shiftKey(wk.start, 6) >= began);
  const todayRequired = h.mode === "daily" || (h.mode === "weekdays" && h.days.includes(dow)) || (h.mode === "per_week" && thisWeek.hit < h.per_week);
  return { ...thisWeek, today, todayDone: days.has(today), todayRequired, consistency: counted.length ? counted.filter((wk) => wk.met).length / counted.length : null, weeksCounted: counted.length,
    label: h.mode === "daily" ? "Every day" : h.mode === "weekdays" ? h.days.map((d) => DAY_NAMES[d - 1]).join(", ") : `${h.per_week} day${h.per_week === 1 ? "" : "s"} a week` };
}

/** Everything a screen needs about one goal. */
export function goalProgress(goal, data = {}, now = Date.now()) {
  const tz = goal.tz || "Europe/London";
  const m = measure(goal, data, now);
  const ms = goal.milestones || [], msDone = ms.filter((x) => x.done_at).length;
  const habit = habitWeek(goal, data.activity || [], now);
  let pct = null;
  if (m.value != null && goal.target) pct = Math.min(1, m.value / goal.target);
  else if (ms.length) pct = msDone / ms.length;
  else if (habit) pct = Math.min(1, habit.hit / (habit.required || 1));
  const daysLeft = goal.target_date ? Math.round((Date.parse(`${goal.target_date}T12:00:00Z`) - Date.parse(`${dayIn(now, tz)}T12:00:00Z`)) / DAY) : null;
  const reached = goal.status === "done" || (pct != null && pct >= 1 && !habit);
  return { value: m.value, available: m.available, note: m.note || null, target: goal.target ?? null, unit: goal.unit ?? (goal.metric ? METRICS[`${goal.metric.source}:${goal.metric.metric}`]?.unit : null),
    pct, milestones: { done: msDone, total: ms.length }, habit, daysLeft, overdue: daysLeft != null && daysLeft < 0 && goal.status === "active", reached };
}

/** Which goals the Command Centre shows: pinned first, then due soonest, then needing attention; at most `limit`. */
export function focusGoals(goals, progressById, limit = 3) {
  const active = goals.filter((g) => g.status === "active");
  const score = (g) => { const p = progressById[g.id] || {}; return (g.pinned ? 0 : 1e6) + (p.daysLeft ?? 9999) * 10 + (p.habit?.todayRequired && !p.habit?.todayDone ? -5 : 0); };
  return [...active].sort((a, b) => score(a) - score(b)).slice(0, limit);
}

/** Moving goals from this device into the account: only goals the account doesn't have (same id) are added. */
export function goalsToImport(local = [], account = []) {
  const have = new Set(account.map((g) => g.id));
  return local.filter((g) => g && g.id && !have.has(g.id));
}
