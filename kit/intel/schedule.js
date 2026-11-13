// Gradify Intelligence: the scheduling engine. Turns ranked priorities into a realistic study day that fits
// the learner's own availability, energy and daily time, with protected breaks; and, when a planned session is
// missed, moves Gradify's own blocks into free time without cramming, and says what changed and why.
// It never moves anything the learner added themselves (only blocks with `auto: true` are Gradify's).
// Pure, so Node can test it.
import { DAY, dayKey, minuteOf, hhmm } from "./memory.js";

export const INTEL_DEFAULTS = {
  autonomy: "suggest",            // "suggest": propose changes · "auto": rearrange Gradify's own blocks
  energy: "none",                 // "morning": hardest first · "evening": lighter first · "none": by priority
  weekday: [{ from: 17 * 60, to: 21 * 60 }],
  weekend: [{ from: 10 * 60, to: 13 * 60 }],
  breakEvery: 45, breakLen: 10,
};
export const intelOf = (learner) => ({ ...INTEL_DEFAULTS, ...(learner?.intel || {}) });
const isWeekend = (day) => [0, 6].includes(new Date(`${day}T12:00:00`).getDay());
export const windowsFor = (day, intel) => (isWeekend(day) ? intel.weekend : intel.weekday) || [];

// free intervals: the availability windows, minus anything already in the calendar, minus time already gone
export function freeIntervals(day, { windows, existing = [], now = Date.now() }) {
  let free = windows.map((w) => ({ from: w.from, to: w.to }));
  const cut = (a, b) => { free = free.flatMap((f) => (b <= f.from || a >= f.to ? [f] : [...(a > f.from ? [{ from: f.from, to: a }] : []), ...(b < f.to ? [{ from: b, to: f.to }] : [])])); };
  for (const b of existing.filter((x) => x.day === day)) cut(b.start_min, b.end_min);
  if (day === dayKey(now)) cut(0, Math.ceil(minuteOf(now) / 5) * 5);
  return free.filter((f) => f.to - f.from >= 5).sort((a, b) => a.from - b.from);
}

/**
 * A study day. `minutes` is the time the learner has (their daily minutes, or "I've got two hours").
 * @returns {{ blocks: object[], used: number, left: object[] }}
 */
export function planDay({ items = [], day, minutes = 20, intel = INTEL_DEFAULTS, existing = [], now = Date.now() } = {}) {
  const free = freeIntervals(day, { windows: windowsFor(day, intel), existing, now });
  let order = items.filter((x) => x.mins > 0);
  if (intel.energy === "morning") order = [...order.filter((x) => x.weight === "hard"), ...order.filter((x) => x.weight !== "hard")];
  if (intel.energy === "evening") order = [...order.filter((x) => x.weight !== "hard"), ...order.filter((x) => x.weight === "hard")];
  const blocks = [], left = [];
  let budget = minutes, focus = 0, slot = 0, at = free[0]?.from ?? null;
  const place = (len) => {
    while (slot < free.length) {
      if (at == null || at < free[slot].from) at = free[slot].from;
      if (free[slot].to - at >= len) { const s = at; at += len; return s; }
      slot++; at = null;
    }
    return null;
  };
  for (const x of order) {
    if (budget < 5) { left.push(x); continue; }
    if (focus >= intel.breakEvery && blocks.length) {
      const s = place(intel.breakLen);
      if (s != null) { blocks.push({ day, start_min: s, end_min: s + intel.breakLen, title: "Break", kind: "break", tag: "Protected break", why: "Short breaks keep focus and help memory settle." }); focus = 0; }
    }
    const len = Math.max(5, Math.min(x.mins, budget));
    const s = place(len);
    if (s == null) { left.push(x); continue; }
    blocks.push({ day, start_min: s, end_min: s + len, title: x.title, kind: x.kind, tag: x.tag, why: x.why, href: x.href, id: x.id });
    budget -= len; focus += len;
  }
  if (minutes >= 60 && blocks.length > 2) {
    const s = place(10);
    if (s != null) blocks.push({ day, start_min: s, end_min: s + 10, title: "Wrap-up", kind: "wrap", tag: "Daily wrap-up", why: "Check what moved, and let Gradify reschedule anything unfinished." });
  }
  return { blocks, used: minutes - budget, left, free };
}

/**
 * Missed sessions: Gradify's own study blocks whose time has passed without being done. Each moves to the next free
 * slot in the coming week, without taking any day past 125% of the learner's daily time (no cramming).
 * @returns {{ missed: object[], moves: object[], unplaced: object[] }}
 */
export function reschedule({ blocks = [], minutes = 20, intel = INTEL_DEFAULTS, now = Date.now(), horizon = 7 } = {}) {
  const today = dayKey(now), nowMin = minuteOf(now);
  const missed = blocks.filter((b) => b.auto && !b.done && (b.cal || "study") === "study" && (b.day < today || (b.day === today && b.end_min <= nowMin)) && b.day >= dayKey(now - 7 * DAY));
  const taken = blocks.filter((b) => !missed.includes(b) && b.day >= today);
  const load = (d) => taken.filter((b) => b.day === d && (b.cal || "study") === "study").reduce((a, b) => a + b.end_min - b.start_min, 0);
  const moves = [], unplaced = [];
  for (const b of [...missed].sort((x, y) => (x.day + x.start_min).localeCompare(y.day + y.start_min))) {
    const len = b.end_min - b.start_min;
    let done = false;
    for (let k = 0; k < horizon && !done; k++) {
      const d = dayKey(now + k * DAY);
      if (load(d) + len > minutes * 1.25) continue;
      const f = freeIntervals(d, { windows: windowsFor(d, intel), existing: taken, now }).find((x) => x.to - x.from >= len);
      if (!f) continue;
      const to = { day: d, start_min: f.from, end_min: f.from + len };
      moves.push({ id: b.id, title: b.title, from: { day: b.day, start_min: b.start_min }, to, why: `Missed on ${new Date(`${b.day}T12:00:00`).toLocaleDateString("en-GB", { weekday: "long" })}: moved to the next free time that keeps ${d === today ? "today" : "that day"} within your daily study time.` });
      taken.push({ ...b, ...to });
      done = true;
    }
    if (!done) unplaced.push({ id: b.id, title: b.title, why: "No free time this week without overloading a day. It stays in your list instead of being crammed in." });
  }
  return { missed, moves, unplaced };
}

export const fmtRange = (b) => `${hhmm(b.start_min)}–${hhmm(b.end_min)}`;
