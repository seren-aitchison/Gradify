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
