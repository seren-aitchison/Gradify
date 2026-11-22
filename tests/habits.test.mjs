import { test } from "node:test";
import assert from "node:assert/strict";
import { dayCounts, habitStats, grid, weekdayPattern, coach, LEARNING } from "../kit/game/habits.js";
import { dayKey } from "../kit/game/engine.js";

const NOW = new Date(2026, 10, 20, 15).getTime();   // Friday 20 Nov 2026, 3pm local
const at = (daysAgo, h = 12) => new Date(2026, 10, 20 - daysAgo, h).getTime();
const counts = (days, n = 1) => new Map(days.map((d) => [dayKey(at(d)), n]));

test("learning habits fill themselves in from course events; own habits from check-ins", () => {
  const ev = [{ t: at(0), k: "lesson", xp: 10 }, { t: at(0), k: "review", xp: 2 }, { t: at(0), k: "review", xp: 2 }, { t: at(1), k: "check", xp: 25 }, { t: at(1), k: "game", xp: 100 }];
  const c = dayCounts(ev, [{ id: "own:read", checks: { [dayKey(at(2))]: 2 } }], { goal: 20 });
  assert.equal(c.get("learn").get(dayKey(at(0))), 1);
  assert.equal(c.get("recall").get(dayKey(at(0))), 2);
  assert.equal(c.get("practise").get(dayKey(at(1))), 1);
  assert.equal(c.get("goal").get(dayKey(at(1))), 1, "25 XP of learning meets a 20 XP goal");
  assert.equal(c.get("goal").get(dayKey(at(0))), undefined, "14 XP doesn't");
  assert.equal(c.get("own:read").get(dayKey(at(2))), 2);
  assert.equal(LEARNING.length, 4);
});

test("a daily streak counts back from today, or from yesterday while today isn't done", () => {
  assert.equal(habitStats(counts([0, 1, 2]), { now: NOW }).streak, 3);
  const s = habitStats(counts([1, 2, 3, 4]), { now: NOW });
  assert.equal(s.streak, 4); assert.equal(s.todayMet, false);
  assert.equal(habitStats(counts([2, 3]), { now: NOW }).streak, 0, "a missed yesterday ends it");
  assert.equal(habitStats(counts([0, 1, 5, 6, 7, 8, 9]), { now: NOW }).best, 5);
});

test("a weekly target counts weeks, so rest days don't break it", () => {
  // this week (Mon 16–Fri 20): 3 days; last week: 3 days; the week before: 1
  const c = counts([0, 2, 4, 7, 9, 11, 14]);
  const s = habitStats(c, { perWeek: 3, now: NOW });
  assert.equal(s.unit, "week"); assert.equal(s.streak, 2); assert.equal(s.weekDone, 3);
  assert.equal(habitStats(counts([0, 7, 9, 11]), { perWeek: 3, now: NOW }).streak, 1, "this week isn't met yet, last week is");
});

test("a target above one: days count once they reach it; the grid shades by how much", () => {
  const c = new Map([[dayKey(at(0)), 5], [dayKey(at(1)), 10]]);
  const s = habitStats(c, { target: 10, now: NOW });
  assert.equal(s.todayMet, false); assert.equal(s.streak, 1);
  const g = grid(c, { target: 10, weeks: 2, now: NOW }), cells = g.flat();
  assert.equal(g.length, 2); assert.equal(cells.length, 14);
  const today = cells.find((x) => x.today); assert.equal(today.lvl, 2); assert.equal(cells.find((x) => x.d === dayKey(at(1))).lvl, 4);
  assert.ok(cells.some((x) => x.future), "the rest of this week is still ahead");
});

test("the weekday that keeps slipping is named, with the numbers; not from too little", () => {
  const days = []; for (let w = 1; w <= 8; w++) for (const wd of [0, 1, 2, 3]) days.push(w * 7 - wd + 4);   // Mon to Thu, never Friday
  const c = new Map(days.map((d) => [dayKey(at(d)), 1]));
  const p = weekdayPattern(c, { now: NOW });
  assert.ok(p); assert.match(p.weakest, /day/); assert.notEqual(p.weakest, p.strongest);
  assert.equal(weekdayPattern(counts([3, 10]), { now: NOW }), null);
  const all = []; for (let d = 1; d <= 56; d++) all.push(d);
  assert.deepEqual(weekdayPattern(counts(all), { now: NOW }), { even: true }, "every day done: nothing slips");
});

test("coaching: a streak ending tonight first, then a slipping weekday", () => {
  const h = (id, stats, pattern = null) => ({ id, name: id, stats, pattern, need: "one lesson", act: { label: "Do it", href: "#" } });
  const risky = h("learn", { perWeek: 7, todayMet: false, streak: 6, checkins: 20 });
  const pat = h("recall", { perWeek: 7, todayMet: true, streak: 2, checkins: 20 }, { weakest: "Fridays", weakHits: 1, of: 8, strongest: "Mondays", strongHits: 8 });
  assert.equal(coach([pat, risky], { now: NOW }).kind, "risk");
  assert.match(coach([pat, risky], { now: NOW }).title, /6-day/);
  assert.equal(coach([pat], { now: NOW }).kind, "pattern");
  assert.equal(coach([h("x", { perWeek: 7, todayMet: true, streak: 9, checkins: 9 })], { now: NOW }), null);
});
