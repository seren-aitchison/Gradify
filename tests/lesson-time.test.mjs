import { test } from "node:test";
import assert from "node:assert/strict";
import { lessonTimer, addTime, minutesPerLesson, mergeTime, IDLE_MS } from "../kit/course/lesson-time.js";
import { mergeProgress } from "../kit/course/progress.js";
import { paceFor } from "../kit/learning/pace.js";

function clock() { let t = 1_000_000; return { now: () => t, add: (ms) => { t += ms; } }; }

test("only active, visible time counts", () => {
  const c = clock(), stops = [];
  const lt = lessonTimer({ now: c.now, onStop: (v) => stops.push(v) });
  lt.start("u1-01");
  c.add(30_000); lt.scroll(0.4);                 // reading: 30 s
  c.add(30_000); lt.input();                     // still reading: 30 s
  c.add(5 * 60_000);                             // walked away: only the first minute after the last input counts
  lt.visibility(false); c.add(10 * 60_000);      // tab hidden for ten minutes: nothing
  lt.visibility(true); c.add(20_000); lt.scroll(0.9);   // back for 20 s
  const v = lt.stop();
  assert.equal(v.ms, 30_000 + 30_000 + IDLE_MS + 20_000);
  assert.equal(v.depth, 0.9);
  assert.equal(stops.length, 1);
  assert.equal(lt.stop(), null, "stopping twice does nothing");
});

test("visits add up in the course state, and merging two devices never double counts", () => {
  const S = {};
  addTime(S, { id: "a", ms: 120_000, depth: 0.5, opened: 10 });
  addTime(S, { id: "a", ms: 60_000, depth: 0.8, opened: 20 });
  assert.deepEqual(S.time.a, { s: 180, v: 2, depth: 0.8, first: 10, last: 20 });
  const merged = mergeProgress({ time: { a: { s: 180, v: 2, depth: 0.8, first: 10, last: 20 } } }, { time: { a: { s: 90, v: 1, depth: 0.3, first: 5, last: 5 }, b: { s: 60, v: 1, depth: 1, first: 1, last: 1 } } });
  assert.deepEqual(merged.time.a, { s: 180, v: 2, depth: 0.8, first: 5, last: 20 });
  assert.equal(merged.time.b.s, 60);
  assert.deepEqual(mergeTime({ s: 1 }, { s: 2 }).s, 2);
});

test("real minutes per lesson replace the estimate once three lessons are timed", () => {
  const S = { done: { a: 1, b: 1 }, time: { a: { s: 1200 }, b: { s: 1500 }, c: { s: 900 } } };
  assert.equal(minutesPerLesson(S), null, "c isn't done, so only two count");
  S.done.c = 1;
  assert.equal(minutesPerLesson(S), 20);
  const est = paceFor({ examDate: "2026-12-20", dailyMinutes: 30, remaining: 20, now: Date.UTC(2026, 10, 13) });
  const real = paceFor({ examDate: "2026-12-20", dailyMinutes: 30, remaining: 20, minutesPerLesson: 20, now: Date.UTC(2026, 10, 13) });
  assert.ok(real.lessonsPerDay < est.lessonsPerDay, "a slower real pace means fewer lessons a day");
});
