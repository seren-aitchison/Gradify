import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeProgress, cloudCopy } from "../kit/course/progress.js";

test("course progress: merging two devices keeps everything completed on either", () => {
  const phone = { done: { a: 5, b: 9 }, quiz: { u01: { best: 0.6, pass: false, t: 10 } }, cards: { c1: { reps: 1, due_at: "2026-11-06" } },
    log: [{ t: 1, k: "lesson", id: "a" }], solved: { q1: 3 }, goal: 20, updated: 100, attempts: [{ id: "x" }] };
  const laptop = { done: { a: 2, c: 7 }, quiz: { u01: { best: 0.8, pass: true, t: 5 } }, cards: { c1: { reps: 3, due_at: "2026-11-01" }, c2: { reps: 1 } },
    log: [{ t: 1, k: "lesson", id: "a" }, { t: 4, k: "lesson", id: "c" }], solved: {}, goal: 45, updated: 200 };
  const m = mergeProgress(phone, laptop);
  assert.deepEqual(m.done, { a: 2, b: 9, c: 7 }, "union, earliest completion time");
  assert.deepEqual(m.quiz.u01, { best: 0.8, pass: true, t: 10 });
  assert.equal(m.cards.c1.reps, 3, "the more-reviewed card state wins");
  assert.ok(m.cards.c2);
  assert.equal(m.log.length, 2, "log entries are deduplicated");
  assert.equal(m.goal, 45, "settings come from the copy saved more recently");
  assert.equal(m.attempts.length, 1, "attempts stay on the device (they have their own table)");
  assert.deepEqual(mergeProgress(m, m).done, m.done, "merging is idempotent");
});

test("course progress: the account copy leaves out attempts", () => {
  assert.equal("attempts" in cloudCopy({ done: {}, attempts: [1] }), false);
});

test("course progress: one mock exam sitting stays one record after syncing through the account", () => {
  const mock = { id: "stage-1", t: 1, score: 0.8, pass: true, n: 20, used: 600, weak: [], groups: [["u01", 80]] };
  // the account's copy comes back from jsonb with its keys in another order
  const sorted = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.length - b.length || (a < b ? -1 : 1)));
  let device = { mocks: { "stage-1": [mock] }, updated: 2 };
  for (let i = 0; i < 3; i++) device = mergeProgress(device, { mocks: { "stage-1": device.mocks["stage-1"].map(sorted) }, updated: 1 });
  assert.equal(device.mocks["stage-1"].length, 1);
  const second = { ...mock, t: 2, score: 0.9 };
  assert.equal(mergeProgress(device, { mocks: { "stage-1": [second] } }).mocks["stage-1"].length, 2, "a second sitting is kept");
});

test("course progress: XP earned once per item isn't counted twice when two devices both earned it", () => {
  const phone = { done: { a: 5 }, solved: { q: 6 }, log: [{ t: 5, xp: 10, k: "lesson", id: "a" }, { t: 6, xp: 5, k: "check", id: "q" }, { t: 7, xp: 50, k: "quiz", id: "u01" }, { t: 8, xp: 2, k: "review", id: "c1" }] };
  const laptop = { done: { a: 9 }, solved: { q: 3 }, log: [{ t: 3, xp: 5, k: "check", id: "q" }, { t: 9, xp: 10, k: "lesson", id: "a" }, { t: 10, xp: 70, k: "quiz", id: "u01" }, { t: 11, xp: 20, k: "quiz", id: "u01" }, { t: 12, xp: 2, k: "review", id: "c1" }] };
  const m = mergeProgress(phone, laptop);
  assert.deepEqual(m.log.map((e) => `${e.k}:${e.t}`), ["check:3", "lesson:5", "quiz:7", "review:8", "quiz:11", "review:12"]);
  assert.equal(m.log.reduce((a, e) => a + e.xp, 0), 5 + 10 + 50 + 2 + 20 + 2, "earliest award kept; reviews and the perfect bonus still count");
  assert.deepEqual(mergeProgress(m, m).log, m.log, "idempotent");
});
