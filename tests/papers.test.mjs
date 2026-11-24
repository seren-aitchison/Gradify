// Past Papers (kit/papers/): the question-bank format, marking, and the first bank, AQA GCSE Biology 4.1 Cell biology.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { validateBank, markPart, totalMarks, bankMarks, partMarks } from "../kit/papers/model.js";
import bank, { TOPIC } from "../kit/papers/aqa-gcse-biology-8461/cell-biology.js";
import { IDS } from "../kit/courses/biology/ids.js";

const lessonIds = new Set(Object.keys(IDS));
const parts = bank.questions.flatMap((q) => q.parts.map((p) => ({ q, p })));

// a full-mark response for each question type
function rightAnswer(Q) {
  switch (Q.type) {
    case "mcq": case "sba": case "tf": return Q.options.find((o) => o.correct).text;
    case "multi": return Q.options.filter((o) => o.correct).map((o) => o.text);
    case "num": return String(Q.answer);
    case "order": return [...Q.steps];
    case "match": return Object.fromEntries(Q.pairs);
    case "short": return { text: "…", points: Q.points.map((_, i) => i) };
  }
}

test("the Cell biology bank is sound: every point covered, marks, lessons, mark schemes, worked calculations", () => {
  assert.deepEqual(validateBank(bank, { spec: { topics: [TOPIC] }, lessonIds }), []);
  assert.equal(bank.source, "gradify", "original Gradify questions, not copied papers");
  for (const point of TOPIC.groups.flatMap((g) => g.points)) {
    const qs = bank.questions.filter((q) => q.points.includes(point.id));
    assert.ok(qs.length, `${point.id} has a question`);
    // the lessons a question sends students to belong to its point
    for (const q of qs) for (const p of q.parts) for (const l of p.lessons) assert.ok(point.lessons.includes(l), `${q.id}${p.id}: lesson ${l} isn't one of ${point.id}'s lessons`);
  }
  assert.ok(bankMarks(bank) >= 40, `a full topic's worth of marks (${bankMarks(bank)})`);
});

test("the bank's points and lessons agree with the AQA 8461 specification map, when it's present", async (t) => {
  const path = new URL("../kit/specs/aqa-gcse-biology-8461.js", import.meta.url);
  if (!existsSync(path)) return t.skip("kit/specs/aqa-gcse-biology-8461.js isn't on this branch yet (Specification Mastery)");
  const spec = (await import(path)).default, topic = spec.topics.find((x) => x.id === "4.1");
  const want = topic.groups.flatMap((g) => g.points.map((p) => [p.id, p.lessons]));
  assert.deepEqual(TOPIC.groups.flatMap((g) => g.points.map((p) => [p.id, p.lessons])), want);
  assert.deepEqual(validateBank(bank, { spec, lessonIds }), []);
});

test("a full-mark answer to every part earns all its marks, through the question type's own marking", () => {
  for (const { q, p } of parts) {
    const r = markPart(p, rightAnswer(p.Q));
    assert.equal(r.marks, p.marks, `${q.id}${p.id}`);
    assert.equal(r.self, p.Q.type === "short");
  }
});

test("partial and wrong answers earn the marks the scheme says", () => {
  const find = (id) => parts.find(({ q, p }) => `${q.id}${p.id}` === id).p;
  // match and order: all four → 2, two or three → 1, fewer → 0
  const m = find("cb-02a"), pairs = Object.fromEntries(m.Q.pairs);
  assert.equal(markPart(m, pairs).marks, 2);
  assert.equal(markPart(m, { ...pairs, Mitochondrion: "Where proteins are made", Ribosome: "Where aerobic respiration happens" }).marks, 1);
  assert.equal(markPart(m, {}).marks, 0);
  const o = find("cb-08a");
  assert.equal(markPart(o, [o.Q.steps[1], o.Q.steps[0], o.Q.steps[2], o.Q.steps[3]]).marks, 1);
  // calculations: the answer, or nothing
  assert.equal(markPart(find("cb-05a"), "20").marks, 2);
  assert.equal(markPart(find("cb-05a"), "0.02").marks, 0, "left in millimetres");
  assert.equal(markPart(find("cb-11a"), "−12").marks, 2, "a unicode minus is read");
  assert.equal(markPart(find("cb-11a"), "12").marks, 0, "a decrease needs its sign");
  assert.equal(markPart(find("cb-06a"), "18").marks, 0);
  // multiple choice
  assert.equal(markPart(find("cb-07a"), "23").marks, 0);
  // self-assessed: one mark per ticked point, up to the part's marks
  const ev = find("cb-09b");
  assert.equal(markPart(ev, { text: "", points: [0, 1, 2, 3, 4, 5] }).marks, 4, "capped at 4 though 6 points ticked");
  assert.equal(markPart(ev, { text: "", points: [0] }).marks, 1);
  assert.equal(partMarks(ev, null, { points: [] }), 0);
});

test("the checks catch a broken bank", () => {
  const [q1, q2] = bank.questions;
  const broken = { ...bank, source: "aqa", questions: [
    { ...q1, parts: [{ ...q1.parts[0], lessons: ["u99-99"] }, q1.parts[1], { ...q1.parts[2], check: () => 100 }] },   // a missing lesson; a worked calculation that disagrees
    { ...q2, parts: [q2.parts[0], { ...q2.parts[1], Q: { ...q2.parts[1].Q, points: ["something else"] } }] },       // a tick list that isn't the scheme
  ] };
  const errs = validateBank(broken, { spec: { topics: [TOPIC] }, lessonIds });
  for (const want of [/gives 100, not 10/, /u99-99 doesn't exist/, /tick list/, /source must be "gradify"/, /4\.1\.3\.3 has no question/]) assert.ok(errs.some((e) => want.test(e)), `${want}: ${errs.join("; ")}`);
});

test("total marks", () => {
  assert.equal(totalMarks(bank.questions[0]), 4);
  assert.equal(bankMarks(bank), bank.questions.reduce((s, q) => s + totalMarks(q), 0));
});
