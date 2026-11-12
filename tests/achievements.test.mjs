// Understanding achievements (kit/learning/achievements.js) come only from measured evidence: never XP, never
// exploration, never drilling one question.
import test from "node:test";
import assert from "node:assert/strict";
import { UNDERSTANDING, understandingStats } from "../kit/learning/achievements.js";

let n = 0;
const T0 = Date.UTC(2026, 9, 1);
const ans = (lesson, score, o = {}) => ({ schema: 1, id: `a${++n}`, at: new Date(T0 + n * 36e5).toISOString(), subject: "maths", context: "lesson",
  question: { id: `${lesson}#q${n}`, type: "mcq", d: 3, objectives: [] }, lesson, unit: lesson.split("-")[0], score, correct: score >= 0.7, attempt: 1,
  confidence: null, marking: { method: "auto", status: "final" }, ...o });
const badge = (id, s) => UNDERSTANDING.find((b) => b.id === id).ok(s);

test("nothing is earned without evidence, and exploration earns nothing", () => {
  const s = understandingStats([]);
  assert.deepEqual(s, { mastered: 0, retained: 0, calibrated: false, comebacks: 0, mocks: 0 });
  for (const b of UNDERSTANDING) assert.equal(b.ok(s), false, b.id);
  const lab = (task) => ans("u12-19", 1, { context: "practice", question: { id: `ix:lln:${task}`, type: "lab", d: 2 }, response: { outcome: "success", evidence: "exploration" } });
  assert.equal(understandingStats(Array.from({ length: 30 }, () => lab("k1"))).mastered, 0);
});

test("a comeback: mostly wrong at first, right now", () => {
  const xs = [0, 0, 1, 1, 1, 1, 1, 1].map((s) => ans("u07-29", s));
  assert.equal(understandingStats(xs).comebacks, 1);
  assert.equal(understandingStats([1, 1, 1, 1, 1, 1].map((s) => ans("u07-30", s))).comebacks, 0);   // never weak
  assert.equal(understandingStats([0, 0, 0, 1, 0, 1].map((s) => ans("u07-31", s))).comebacks, 0);   // not yet turned round
});

test("retention and calibration need real evidence", () => {
  // the same question answered right again a day or more later counts as retained
  const q = (i, day, score) => ans("u03-21", score, { at: new Date(T0 + day * 864e5 + i * 6e4).toISOString(), question: { id: `log-${i}`, type: "mcq", d: 2 } });
  const xs = [...Array.from({ length: 10 }, (_, i) => q(i, 0, 1)), ...Array.from({ length: 10 }, (_, i) => q(i, 3, 1))];
  assert.ok(badge("stuck", understandingStats(xs)));
  assert.ok(!badge("stuck", understandingStats(xs.slice(0, 10))));
  const sure = (score) => ans("u01-16", score, { confidence: 3 });
  assert.ok(understandingStats(Array.from({ length: 10 }, () => sure(1))).calibrated);
  assert.ok(!understandingStats([...Array.from({ length: 8 }, () => sure(1)), sure(0), sure(0)]).calibrated);
});

test("mastery and mock exams", () => {
  // a lesson with enough right answers across two kinds of evidence (recognition and application here) is mastered
  const xs = [...Array.from({ length: 5 }, () => ans("u05-10", 1, { question: { id: `p${++n}`, type: "mcq", d: 1 } })), ...Array.from({ length: 5 }, () => ans("u05-10", 1, { question: { id: `p${++n}`, type: "num", d: 2 } }))];
  const s = understandingStats(xs);
  assert.ok(s.mastered >= 1 && badge("understood", s) && !badge("solid", s));
  assert.equal(understandingStats([], { mocks: { gcse: [{ pass: false }, { pass: true }], whole: [{ pass: false }] } }).mocks, 1);
});
