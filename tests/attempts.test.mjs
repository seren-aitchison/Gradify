import { test } from "node:test";
import assert from "node:assert/strict";
import { makeAttempt, analyse, SCHEMA } from "../kit/assess/attempts.js";

const Q = { type: "sba", q: "?", d: 2, objectives: [1, 2], options: [{ text: "a", correct: true }, { text: "b", correct: false }] };
const mk = (over = {}) => makeAttempt({ site: "NurseGradify", subject: "nursing", context: "lesson", contextId: "n-u06-l01", Q, key: "nursing-n-u06-l01-q1", version: 1, lesson: "n-u06-l01", module: "ECG", unit: "u06", response: "a", result: { score: 1, correct: true }, ...over });

test("an attempt records question id and version, objectives, confidence, time and marking", () => {
  const a = mk({ meta: { confidence: 3, ms: 4200, attempt: 1 } });
  assert.equal(a.schema, SCHEMA);
  assert.deepEqual(a.question, { id: "nursing-n-u06-l01-q1", v: 1, type: "sba", d: 2, objectives: [1, 2] });
  assert.equal(a.confidence, 3); assert.equal(a.ms, 4200); assert.equal(a.attempt, 1);
  assert.deepEqual(a.marking, { method: "auto", status: "final" });
  assert.equal(a.misconception, null);
});

test("a wrong single-choice answer records the chosen option as a misconception", () => {
  assert.equal(mk({ response: "b", result: { score: 0, correct: false } }).misconception, "b");
});

test("analyse: weak areas, objectives, improvement, misconceptions and calibration", () => {
  const t = (i) => new Date(2026, 9, 1, 10, i).toISOString();
  const list = [
    { ...mk({ response: "b", result: { score: 0, correct: false }, meta: { confidence: 3, attempt: 1 } }), at: t(1) },
    { ...mk({ meta: { confidence: 2, attempt: 2 } }), at: t(2) },
    { ...mk({ subject: "law", lesson: "l-u03-l01", unit: "u03", key: "law-l-u03-l01-q1", response: "b", result: { score: 0, correct: false } }), at: t(3) },
    { ...mk({ Q: { type: "short", q: "?", d: 3 }, key: "x", result: { score: 0.5, status: "provisional", method: "self" } }), at: t(4) },
  ];
  const r = analyse(list);
  assert.equal(r.total, 3, "provisional self-marks are excluded by default");
  assert.equal(analyse(list, { includeProvisional: true }).total, 4);
  assert.equal(r.bySubject.length, 2, "across subjects");
  assert.equal(r.byLesson[0].key, "l-u03-l01", "weakest first");
  assert.ok(r.byObjective.some((o) => o.key === "n-u06-l01#o1"));
  assert.deepEqual(r.improvement, { questions: 1, mean: 1 });
  assert.equal(r.misconceptions[0].n, 1);
  assert.equal(r.calibration.sureButWrong, 1);
});

test("records from a future schema are ignored rather than misread", () => {
  assert.equal(analyse([{ ...mk(), schema: 99 }]).total, 0);
});
