// The shared Gradify assessment library (kit/assess/questions.js).
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseQuestion, markQuestion, renderQuestion, answerText } from "../kit/assess/questions.js";
import { parseNotes } from "../kit/course/notes.js";

test("every question type parses from its text line, with ids, objectives and per-option explanations", () => {
  const sba = parseQuestion("M3#law-u03-05-q2@1,2", "Q? | right | a :: because a is wrong | b | c | d | Because.");
  assert.deepEqual([sba.type, sba.id, sba.objectives, sba.d], ["sba", "law-u03-05-q2", [1, 2], 3]);
  assert.equal(sba.options.find((o) => o.text === "a").why, "because a is wrong");
  assert.equal(parseQuestion("M1", "Q? | right | a | b | c | Because.").type, "mcq");
  const tf = parseQuestion("TF1", "Consideration must be adequate. | false | It must be sufficient, not adequate.");
  assert.deepEqual([tf.type, tf.options.find((o) => o.correct).text], ["tf", "False"]);
  const ms = parseQuestion("MS2", "Which apply? | A ; B | C ; D ; E | Why.");
  assert.deepEqual([ms.type, ms.options.filter((o) => o.correct).map((o) => o.text), ms.d], ["multi", ["A", "B"], 2]);
  const seq = parseQuestion("SEQ", "Order? | one ; two ; three ; four | Why.");
  assert.deepEqual([seq.type, seq.steps.length, seq.d], ["order", 4, 2]);
  const mt = parseQuestion("MATCH1", "Match | a = 1 ; b = 2 ; c = 3 | Why.");
  assert.deepEqual(mt.pairs, [["a", "1"], ["b", "2"], ["c", "3"]]);
  const sa = parseQuestion("SA3", "Explain. | Model answer. | point one ; point two");
  assert.deepEqual([sa.type, sa.points.length], ["short", 2]);
  assert.equal(parseQuestion("SEQ", "Too short | one ; two | Why."), null, "ordering needs three steps");
  assert.equal(parseQuestion("TF", "Statement | maybe | Why."), null, "true or false needs true or false");
});

test("marking gives partial credit where it should, penalises wrong picks, and keeps short answers provisional", () => {
  const ms = parseQuestion("MS2", "Q | A ; B | C ; D | Why");
  assert.equal(markQuestion(ms, ["A", "B"]).correct, true);
  assert.equal(markQuestion(ms, ["A"]).score, 0.5);
  assert.equal(markQuestion(ms, ["A", "C"]).score, 0, "a wrong pick cancels a right one");
  const seq = parseQuestion("SEQ", "Q | 1 ; 2 ; 3 ; 4 | Why");
  assert.equal(markQuestion(seq, ["1", "2", "4", "3"]).score, 0.5);
  const mt = parseQuestion("MATCH", "Q | a = 1 ; b = 2 ; c = 3 | Why");
  assert.equal(markQuestion(mt, { a: "1", b: "3", c: "2" }).score, 1 / 3);
  const sa = parseQuestion("SA", "Q | Model | p1 ; p2 ; p3 ; p4");
  const r = markQuestion(sa, { text: "x", points: [0, 1, 2] });
  assert.deepEqual([r.self, r.status, r.method], [true, "provisional", "self"]);
  assert.equal(markQuestion(parseQuestion("TF", "S | true | W"), "True").correct, true);
  assert.equal(markQuestion(parseQuestion("M", "Q | r | a | b | c | d | W"), "r").status, "final");
  assert.match(answerText(seq), /^1\. 1/);
});

test("questions in the older { right, wrong } shape still render, mark and explain", () => {
  const old = { type: "sba", q: "Q", right: "R & S", wrong: ["a", "b", "c", "d"], why: "w" };
  assert.equal(markQuestion(old, "R & S").correct, true);
  assert.equal(answerText(old), "R & S");
  assert.match(renderQuestion(old, "k"), /data-v="R &amp; S"/);
  assert.equal(markQuestion({ type: "multi", q: "Q", right: ["A"], wrong: ["B"] }, ["A"]).correct, true);
});

test("rendering is stable for an id and never shows an ordering question already in order", () => {
  const seq = parseQuestion("SEQ", "Q | a ; b ; c | Why");
  assert.equal(renderQuestion(seq, "x#1"), renderQuestion(seq, "x#1"));
  assert.match(renderQuestion(seq, "x#1"), /role="group"[\s\S]*aria-labelledby/);
  assert.match(renderQuestion(seq, "x#1"), /aria-label="Move up: /);
  for (const id of ["a", "b", "c", "d", "e", "f"]) assert.doesNotMatch(renderQuestion(seq, id), /data-v="a"[\s\S]*data-v="b"[\s\S]*data-v="c"/);
});

test("notes keep check questions in mcq and put the other types in tasks, with lesson metadata", () => {
  const [L] = parseNotes(`## T
S: Lead
O: Explain X
PRE: Lesson Y
T: Term | Meaning
SUM: Point
SAFE: Education only.
SRC: Act 2000, s 1 | legislation | 2026-01 | https://www.legislation.gov.uk/
M2: Q | r | a | b | c | d | why
MS2: Q | a ; b | c ; d | why`);
  assert.equal(L.mcq.length, 1); assert.equal(L.tasks.length, 1);
  assert.deepEqual([L.objectives, L.prereq, L.summary], [["Explain X"], ["Lesson Y"], ["Point"]]);
  assert.deepEqual(L.terms, [["Term", "Meaning"]]);
  assert.deepEqual(L.sources[0], { cite: "Act 2000, s 1", kind: "legislation", date: "2026-01", url: "https://www.legislation.gov.uk/" });
  assert.equal(L.blocks.find((b) => b.t === "safe").x, "Education only.");
});
