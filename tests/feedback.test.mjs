// Wrong-answer feedback, the same for every course (kit/assess/questions.js, kit/assess/types.js): a wrong first try
// explains why that answer isn't right and gives a hint without giving the answer away; a second wrong try, or
// asking, shows the answer and why. Attempts record which try they were and whether a hint had been given.
import { test } from "node:test";
import assert from "node:assert/strict";
import { feedbackStage, canRetry, markQuestion } from "../kit/assess/questions.js";
import { TYPES } from "../kit/assess/types.js";
import { makeAttempt } from "../kit/assess/attempts.js";

const sba = { type: "sba", q: "Which is NOT an SI base unit?", why: "The newton is derived: kg m s^-2.", options: [
  { text: "Newton", correct: true, why: "" }, { text: "Ampere", correct: false, why: "The ampere is one of the seven base units." },
  { text: "Kelvin", correct: false, why: "" }, { text: "Mole", correct: false, why: "" }] };

test("the stages: right, self-assessed, another go after a first wrong try, then the answer", () => {
  assert.equal(feedbackStage({ correct: true }), "correct");
  assert.equal(feedbackStage({ self: true }), "self");
  assert.equal(feedbackStage({ attempt: 1 }), "retry");
  assert.equal(feedbackStage({ attempt: 2 }), "reveal");
  assert.equal(feedbackStage({ attempt: 1, oneTry: true }), "reveal");        // a one-try quiz shows the answer straight away
  assert.equal(feedbackStage({ attempt: 1, canRetry: false }), "reveal");
  assert.equal(feedbackStage({ correct: true, attempt: 2 }), "correct");
});

test("only questions with something left to choose get a second try", () => {
  assert.ok(canRetry(sba, TYPES.choice));
  assert.ok(!canRetry({ type: "tf", options: [{}, {}] }, TYPES.tf));          // two options: a second try would give it away
  assert.ok(canRetry({ type: "num" }, TYPES.num));
  assert.ok(!canRetry({ type: "short" }, TYPES.short));
});

test("a wrong first try says why that answer isn't right, without the right answer", () => {
  const res = markQuestion(sba, "Ampere");
  const before = TYPES.choice.feedback(sba, "Ampere", res, { reveal: false });
  assert.match(before, /Why not “Ampere”/);
  assert.doesNotMatch(before, /Answer:|Newton/);
  const after = TYPES.choice.feedback(sba, "Ampere", res, { reveal: true });
  assert.match(after, /<b>Answer:<\/b> Newton/);
  // the hint rules out the tried option and one more wrong one, never the right one
  const h = TYPES.choice.hint(sba, "Ampere");
  assert.deepEqual(h.rule, ["Ampere", "Kelvin"]);
  assert.ok(!h.rule.includes("Newton"));
  assert.doesNotMatch(h.text, /Newton/);
});

test("the other types keep the answer back until it's revealed, and hint in their own way", () => {
  const multi = { type: "multi", q: "q", options: [{ text: "a", correct: true }, { text: "b", correct: true }, { text: "c", correct: false }] };
  assert.equal(TYPES.multi.feedback(multi, ["a"], { correct: false }, { reveal: false }), "");
  assert.match(TYPES.multi.hint(multi).text, /2 of the 3 options apply/);
  const order = { type: "order", q: "q", steps: ["x", "y", "z"] };
  assert.equal(TYPES.order.feedback(order, ["y", "x", "z"], { correct: false }, { reveal: false }), "");
  assert.match(TYPES.order.feedback(order, ["y", "x", "z"], { correct: false }), /Correct order/);
  const num = { type: "num", q: "q", answer: 20, tol: { rel: 0.02 }, unit: "m s^{-1}" };
  assert.equal(TYPES.num.feedback(num, "200", { correct: false }, { reveal: false }), "");
  assert.match(TYPES.num.hint(num, "200").text, /factor of ten/);
  assert.match(TYPES.num.hint(num, "25").text, /too high/);
  assert.match(TYPES.num.hint(num, "15").text, /too low/);
  assert.match(TYPES.num.hint(num, "-20").text, /sign/);
  assert.match(TYPES.num.hint(num, "abc").text, /Give a number/);
});

test("an attempt records which try it was and whether a hint had been given", () => {
  const a = makeAttempt({ site: "S", subject: "physics", context: "lesson", Q: sba, key: "k", result: { score: 1, correct: true }, response: "Newton", meta: { attempt: 2, assist: "hint" } });
  assert.equal(a.attempt, 2);
  assert.equal(a.assist, "hint");
  assert.equal(makeAttempt({ site: "S", subject: "p", context: "lesson", Q: sba, key: "k", result: { score: 0, correct: false }, response: "Ampere" }).assist, null);
});
