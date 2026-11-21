import { test } from "node:test";
import assert from "node:assert/strict";
import { lessonSignals, topicStatus, rollup, strengths, STATUSES } from "../kit/learning/topic-status.js";
import { buildTargetTest, targetResults, encodeTest, decodeTest, countFor } from "../kit/assess/target-test.js";
import { mergeProgress } from "../kit/course/progress.js";

const at = (d) => new Date(Date.UTC(2026, 10, 10 + d, 12)).toISOString();
const A = (lesson, q, score, d = 0, extra = {}) => ({ lesson, score, at: at(d), question: { id: q, type: "mcq", d: 2 }, marking: { status: "final" }, ...extra });

test("signals use the latest answer to each question, final marks only, and ignore merely attempted labs", () => {
  const s = lessonSignals([A("L1", "a", 0, 0), A("L1", "a", 1, 1), A("L1", "b", 1, 0), A("L1", "c", 0, 0, { marking: { status: "provisional" } }),
    { ...A("L1", "lab", 0, 0), question: { id: "lab", type: "lab" }, response: { outcome: "attempted" } }]);
  const g = s.get("L1");
  assert.equal(g.questions, 2); assert.equal(g.answers, 3); assert.equal(g.latestMean, 1); assert.equal(g.right, 2);
});

test("status separates completion from mastery, and evidence of weakness wins", () => {
  assert.equal(topicStatus({}), "new");
  assert.equal(topicStatus({ visited: true }), "started");
  assert.equal(topicStatus({ done: true }), "learned");
  assert.equal(topicStatus({ done: true, sig: { questions: 1, latestMean: 1 } }), "practised");
  assert.equal(topicStatus({ done: true, sig: { questions: 3, latestMean: 0.9 } }), "mastered");
  assert.equal(topicStatus({ done: true, sig: { questions: 2, latestMean: 0.9 } }), "practised", "two questions isn't enough for mastery");
  assert.equal(topicStatus({ done: true, sig: { questions: 3, latestMean: 0.4 } }), "revise");
  assert.equal(topicStatus({ done: false, sig: { questions: 2, latestMean: 0.2 } }), "revise");
  assert.equal(topicStatus({ done: false, sig: { questions: 1, latestMean: 0 } }), "started", "one wrong answer is not a measured weakness");
  assert.equal(STATUSES.length, 6);
});

test("rollup counts statuses, coverage from completion and mastery from measured lessons", () => {
  const st = { a: "mastered", b: "revise", c: "new", d: "learned" }, done = new Set(["a", "b", "d"]);
  const sig = new Map([["a", { latestMean: 1 }], ["b", { latestMean: 0.4 }]]);
  const r = rollup(Object.keys(st), (id) => st[id], sig, (id) => done.has(id));
  assert.equal(r.done, 3); assert.equal(r.coverage, 0.75); assert.equal(r.mastery, 0.7); assert.equal(r.status, "revise");
  assert.equal(rollup(["a"], () => "mastered").status, "mastered");
  assert.equal(rollup(["a", "c"], (id) => st[id]).status, "started");
});

test("strengths and weaknesses rank only measured lessons", () => {
  const sig = lessonSignals([A("W", "1", 0), A("W", "2", 0.5), A("S", "1", 1), A("S", "2", 1), A("S", "3", 1), A("X", "1", 0)]);
  const { weak, strong } = strengths(sig);
  assert.deepEqual(weak.map((w) => w.id), ["W"]); assert.deepEqual(strong.map((w) => w.id), ["S"]);
});

test("a target test favours weak lessons and the focus level, spreads across lessons and starts easy", () => {
  const pool = [];
  for (const l of ["L1", "L2", "L3"]) for (let i = 0; i < 6; i++) pool.push({ key: `${l}#${i}`, Q: { type: "mcq", d: (i % 3) + 1 }, l: { id: l } });
  const t = buildTargetTest(pool, { minutes: 6, focus: "application", weak: ["L3"], seed: 42 });
  assert.equal(t.length, 6);
  assert.equal(new Set(t.map((x) => x.l.id)).size, 3, "spread across lessons");
  assert.ok(t.filter((x) => x.Q.d === 3).length >= 3, "mostly the focus level");
  assert.ok(t.every((x, i) => !i || (t[i - 1].Q.d || 2) <= (x.Q.d || 2)), "easiest first");
  const wrong = buildTargetTest(pool, { minutes: 3, focus: "mixed", attempts: [A("L2", "L2#0", 0)], seed: 7, weak: [] });
  assert.ok(wrong.some((x) => x.key === "L2#0"), "a question got wrong last time comes back");
  assert.equal(countFor(100), 30); assert.equal(countFor(1), 3);
});

test("target results come weakest first, and test settings round-trip through the address", () => {
  const r = targetResults([{ lesson: "a", score: 1 }, { lesson: "b", score: 0 }, { lesson: "a", score: 0 }]);
  assert.deepEqual(r.map((x) => x.lesson), ["b", "a"]); assert.equal(r[1].right, 1);
  const cfg = { minutes: 20, focus: "recall", scope: "lessons", units: [], lessons: ["u01-02", "u03-11"] };
  assert.deepEqual(decodeTest(encodeTest(cfg)), cfg);
  assert.equal(decodeTest("junk").minutes, 10);
});

test("bookmarks and recently viewed lessons merge across devices", () => {
  const m = mergeProgress({ marks: { a: 1 }, recent: [{ id: "x", t: 5 }, { id: "y", t: 1 }], updated: 1 }, { marks: { b: 2 }, recent: [{ id: "y", t: 9 }, { id: "z", t: 3 }], updated: 2 });
  assert.deepEqual(Object.keys(m.marks).sort(), ["a", "b"]);
  assert.deepEqual(m.recent.map((r) => r.id), ["y", "x", "z"]);
  const off = mergeProgress({ marks: { a: -5 } }, { marks: { a: 3 } });
  assert.ok(off.marks.a < 0, "a bookmark removed later stays removed");
});
