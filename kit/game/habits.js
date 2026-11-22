// Habits: the learner's daily habits as pixel grids, one square per day, brighter the more of it they did.
//
// Two kinds, so the tracker is honest and costs nothing to keep up:
//   learning habits  fill themselves in from what the learner actually did in their courses (the same events the
//                    level and streak come from: kit/game/engine.js eventsOf). No ticking: a lesson completed counts.
//   own habits       anything else they want to keep up (read for 20 minutes, study without the phone…), checked in
//                    by hand, once or several times a day. Past days can be corrected for a week, not forever.
// Each habit has a weekly target (every day, or 3, 4, 5 days a week), so a rest day isn't a broken streak.
// What helps someone keep a habit is shown with it: the streak (and whether today still needs doing), the last 30
// days' rate, the best ever streak, and one coaching line that comes from the grid itself (the weekday that keeps
// slipping, a streak about to end tonight, a habit coming back).
//
// Pure: no DOM, no storage. kit/game/habits-view.js draws it on the Journey page.
import { dayKey, weekStart, DAY } from "./engine.js";

// the learning habits, from course events (e.k is the award kind: lesson, check, review, quiz, problem, practice…)
export const LEARNING = [
  { id: "learn", name: "Learn something new", icon: "book", colour: "#7c83ff", unit: "lesson", target: 1, of: (e) => (e.k === "lesson" ? 1 : 0), why: "One new lesson a day keeps the course moving." },
  { id: "recall", name: "Review flashcards", icon: "layers", colour: "#34d399", unit: "card", target: 10, of: (e) => (e.k === "review" ? 1 : 0), why: "Ten cards a day, right before they fade, is what makes them stick." },
  { id: "practise", name: "Answer questions", icon: "checklist", colour: "#f59e0b", unit: "answer", target: 5, of: (e) => (["check", "problem", "quiz", "practice", "mock", "write"].includes(e.k) ? 1 : 0), why: "Retrieval practice beats rereading." },
  { id: "goal", name: "Hit my daily goal", icon: "flame", colour: "#f472b6", unit: "goal", target: 1, of: () => 0, daily: "goal", why: "Small, steady days add up." },
];
// ideas for the learner's own habits (they can name their own too)
export const IDEAS = [
  { name: "Read for 20 minutes", icon: "book", colour: "#60a5fa" },
  { name: "Study without my phone", icon: "lock", colour: "#a78bfa" },
  { name: "Drink water", icon: "sparkles", colour: "#38bdf8" },
  { name: "Exercise", icon: "flame", colour: "#fb7185" },
  { name: "In bed before midnight", icon: "clock", colour: "#818cf8" },
  { name: "Plan tomorrow", icon: "checklist", colour: "#facc15" },
];
export const PALETTE = ["#7c83ff", "#34d399", "#f59e0b", "#f472b6", "#60a5fa", "#a78bfa", "#38bdf8", "#fb7185", "#facc15", "#2dd4bf"];
const WD = ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays", "Sundays"];
export const EDIT_DAYS = 7;   // own habits can be corrected this far back

/** counts per day for every habit: Map(habitId → Map(dayKey → n)) */
export function dayCounts(events, own = [], { goal = 30 } = {}) {
  const out = new Map(), xp = new Map();
  for (const h of LEARNING) out.set(h.id, new Map());
  for (const e of events) {
    if (!e || !Number.isFinite(e.t)) continue;
    const d = dayKey(e.t);
    if (e.k !== "game") xp.set(d, (xp.get(d) || 0) + (e.xp || 0));
    for (const h of LEARNING) { const n = h.of(e); if (n) out.get(h.id).set(d, (out.get(h.id).get(d) || 0) + n); }
  }
  for (const [d, v] of xp) if (v >= goal) out.get("goal").set(d, 1);
  for (const h of own) out.set(h.id, new Map(Object.entries(h.checks || {}).filter(([, n]) => n > 0)));
  return out;
}

/** one habit's numbers: met days, streak (days or weeks), best, 30-day rate, check-ins, today */
export function habitStats(counts, { target = 1, perWeek = 7, now = Date.now() } = {}) {
  const today = dayKey(now), met = (d) => (counts.get(d) || 0) >= target;
  const keys = [...counts.keys()].filter((d) => met(d)).sort();
  // daily habits: consecutive days met, ending today, or yesterday while today isn't over
  // weekly habits: consecutive weeks with at least perWeek days met, the current week counted once it's met
  let streak = 0, best = 0, unitWord = perWeek >= 7 ? "day" : "week";
  if (perWeek >= 7) {
    let t = met(today) ? now : now - DAY;
    while (met(dayKey(t))) { streak++; t -= DAY; }
    let run = 0, prev = null;
    for (const d of keys) { const t2 = Date.parse(`${d}T12:00:00`); run = prev != null && Math.round((t2 - prev) / DAY) === 1 ? run + 1 : 1; prev = t2; best = Math.max(best, run); }
  } else {
    const weekHits = (ws) => { let n = 0; for (let i = 0; i < 7; i++) if (met(dayKey(ws + i * DAY + 12 * 36e5))) n++; return n; };
    let ws = weekStart(now); if (weekHits(ws) < perWeek) ws -= 7 * DAY;
    while (weekHits(ws) >= perWeek && streak < 520) { streak++; ws -= 7 * DAY; }
    const first = keys.length ? weekStart(Date.parse(`${keys[0]}T12:00:00`)) : weekStart(now);
    let run = 0; for (let w = first; w <= weekStart(now); w += 7 * DAY) { run = weekHits(w) >= perWeek ? run + 1 : 0; best = Math.max(best, run); }
  }
  best = Math.max(best, streak);
  let met30 = 0; for (let i = 0; i < 30; i++) if (met(dayKey(now - i * DAY))) met30++;
  const want30 = perWeek >= 7 ? 30 : Math.round((30 / 7) * perWeek);
  const weekDone = (() => { let n = 0; const ws = weekStart(now); for (let i = 0; i < 7; i++) if (met(dayKey(ws + i * DAY + 12 * 36e5))) n++; return n; })();
  return { streak, best, unit: unitWord, checkins: keys.length, rate30: Math.min(1, met30 / Math.max(1, want30)), todayCount: counts.get(today) || 0, todayMet: met(today), weekDone, perWeek, target };
}

/** the grid: weeks × 7 days, oldest first, each cell { d, v: 0…1, lvl: 0…4, future, today } */
export function grid(counts, { target = 1, weeks = 10, now = Date.now() } = {}) {
  const start = weekStart(now) - (weeks - 1) * 7 * DAY, today = dayKey(now), cols = [];
  for (let w = 0; w < weeks; w++) {
    const col = [];
    for (let i = 0; i < 7; i++) {
      const t = start + (w * 7 + i) * DAY + 12 * 36e5, d = dayKey(t), n = counts.get(d) || 0, v = Math.min(1, n / target);
      col.push({ d, n, v, lvl: n ? Math.max(1, Math.min(4, Math.ceil(v * 4))) : 0, future: d > today, today: d === today });
    }
    cols.push(col);
  }
  return cols;
}

/** which weekday keeps slipping (and which is strongest), from the last 8 weeks; null without enough to say */
export function weekdayPattern(counts, { target = 1, now = Date.now() } = {}) {
  const hit = Array(7).fill(0), seen = Array(7).fill(0), start = weekStart(now) - 8 * 7 * DAY;
  for (let t = start + 12 * 36e5; t < weekStart(now); t += DAY) { const wd = (new Date(t).getDay() + 6) % 7; seen[wd]++; if ((counts.get(dayKey(t)) || 0) >= target) hit[wd]++; }
  const total = hit.reduce((a, b) => a + b, 0); if (total < 6) return null;
  const rate = hit.map((h, i) => h / Math.max(1, seen[i]));
  const lo = rate.indexOf(Math.min(...rate)), hi = rate.indexOf(Math.max(...rate));
  if (rate[hi] - rate[lo] < 0.35) return { even: true };   // enough to say, and no day stands out
  return { weakest: WD[lo], weakHits: hit[lo], strongest: WD[hi], strongHits: hit[hi], of: seen[lo] };
}

/** one coaching line, the most useful thing to say right now, with an action; null when there's nothing worth saying */
export function coach(list, { now = Date.now() } = {}) {
  const hour = new Date(now).getHours();
  // a streak that ends tonight comes first
  const atRisk = list.filter((h) => h.stats.perWeek >= 7 && !h.stats.todayMet && h.stats.streak >= 3).sort((a, b) => b.stats.streak - a.stats.streak)[0];
  if (atRisk) return { kind: "risk", habit: atRisk.id, title: `Your ${atRisk.stats.streak}-day “${atRisk.name}” streak ends at midnight`,
    text: hour >= 18 ? `It's evening: ${atRisk.need} keeps it going.` : `${atRisk.need[0].toUpperCase() + atRisk.need.slice(1)} today keeps it going.`, act: atRisk.act };
  // then a weekday that keeps slipping
  for (const h of list) { const p = h.pattern; if (p && !p.even) return { kind: "pattern", habit: h.id, title: `${p.weakest} are when “${h.name}” slips`,
    text: `Done on ${p.weakHits} of the last ${p.of} ${p.weakest.toLowerCase()}, against ${p.strongHits} ${p.strongest.toLowerCase()}. A small version on ${p.weakest.toLowerCase()} still counts.`, act: h.act }; }
  // then a comeback: met today after a gap
  const back = list.find((h) => h.stats.todayMet && h.stats.streak === 1 && h.stats.checkins > 3);
  if (back) return { kind: "back", habit: back.id, title: `“${back.name}” is back`, text: "Restarting is the hard part. Tomorrow makes it a streak.", act: null };
  return null;
}
