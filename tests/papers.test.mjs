// Past Papers (kit/papers/): the question bank is sound and linked to real lessons, every part is marked as its
// mark scheme says, and the checks catch the mistakes a bank can make.
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { checkBank, markPart, markQuestion, lessonsFor, practiceSet, numberOf, INPUTS } from "../kit/papers/format.js";
import { papersFor, papersCourses } from "../kit/papers/index.js";

const banks = async () => Promise.all(papersCourses().map(async (c) => ({ course: c, bank: (await papersFor(c)()).default })));
const lessonIds = async (course) => { const { UNITS } = await import(`../kit/courses/${course}/syllabus.js`); return new Set(UNITS.flatMap((u) => u.lessons.map((l) => l.id))); };

test("every bank is sound: real lessons, marks that add up, a model answer and mark scheme for every part", async () => {
  for (const { course, bank } of await banks()) {
    const ids = await lessonIds(course);
    assert.equal(bank.course, course);
    assert.deepEqual(checkBank(bank, { lessonExists: (id) => ids.has(id) }), [], bank.id);
    for (const q of bank.questions) assert.equal(q.source, "gradify", `${q.id}: only Gradify's own questions`);
  }
});

test("AQA GCSE Biology: every Cell biology point has a question, and the bank links to AQA's own papers", async () => {
  const bank = (await papersFor("biology")()).default;
  const covered = new Set(bank.questions.flatMap((q) => q.points));
  for (const id of Object.keys(bank.points)) assert.ok(covered.has(id), `${id} ${bank.points[id].title} has no question`);
  assert.equal(Object.keys(bank.points).filter((id) => id.startsWith("4.1.")).length, 12, "all twelve 4.1 points");
  assert.match(bank.spec.papersUrl, /^https:\/\/www\.aqa\.org\.uk\//);
  // every input type is used, so the pages are exercised on real content
  assert.deepEqual([...new Set(bank.questions.flatMap((q) => q.parts.map((p) => p.input)))].sort(), [...INPUTS].sort());
});

test("the lessons match Specification Mastery's map of 8461, where that branch is present", async () => {
  const path = new URL("../kit/specs/aqa-gcse-biology-8461.js", import.meta.url);
  if (!existsSync(path)) return; // Specification Mastery isn't merged yet; the link switches on when it is
  const spec = (await import(path)).default, bank = (await papersFor("biology")()).default;
  const pts = new Map(spec.topics.flatMap((t) => t.groups.flatMap((g) => g.points.map((p) => [p.id, p]))));
  for (const [id, p] of Object.entries(bank.points)) {
    assert.ok(pts.has(id), `${id} isn't a point of the specification`);
    for (const l of p.lessons) assert.ok([...pts.get(id).lessons, ...pts.get(id).partial].includes(l), `${id}: lesson ${l} isn't mapped to it in the specification`);
  }
});

test("choice and short answers are marked automatically and finally", () => {
  const choice = { id: "a", marks: 1, input: "choice", options: [{ text: "Plasmid", correct: true }, { text: "Nucleus", correct: false }, { text: "Ribosome", correct: false }] };
  assert.deepEqual([markPart(choice, "Plasmid").marks, markPart(choice, "Nucleus").marks, markPart(choice, undefined).marks], [1, 0, 0]);
  assert.ok(markPart(choice, "Plasmid").final);
  const short = { id: "b", marks: 1, input: "short", answer: "aerobic respiration", accept: ["respiration"], reject: ["anaerobic"] };
  assert.equal(markPart(short, "Aerobic respiration.").marks, 1);
  assert.equal(markPart(short, "respiration").marks, 1, "an accepted alternative");
  assert.equal(markPart(short, "it's where respiration happens").marks, 1, "the answer within a sentence");
  assert.equal(markPart(short, "anaerobic respiration").marks, 0, "a rejected answer, though it contains an accepted word");
  assert.equal(markPart(short, "photosynthesis").marks, 0);
  assert.equal(markPart(short, "  ").marks, 0);
  const dna = { id: "c", marks: 1, input: "short", answer: "DNA", accept: ["deoxyribonucleic acid"], reject: ["rna"] };
  assert.equal(markPart(dna, "dna").marks, 1); assert.equal(markPart(dna, "Deoxyribonucleic acid").marks, 1); assert.equal(markPart(dna, "RNA").marks, 0);
  assert.equal(markPart(dna, "mRNA").marks, 0, "a different word, not a match on part of it");
});

test("a calculation: the right answer earns every mark; a wrong one earns only the method marks ticked, never full marks", () => {
  const calc = { id: "a", marks: 2, input: "number", answer: 20, tolerance: 0, method: [{ id: "rearrange", text: "…" }] };
  assert.deepEqual([markPart(calc, "20").marks, markPart(calc, "20.0").marks, markPart(calc, " 2 0 ").marks], [2, 2, 2]);
  const r = markPart(calc, "0.02");
  assert.equal(r.marks, 0); assert.ok(r.final, "no method claimed: a final zero");
  const m = markPart(calc, { text: "0.02", ticked: ["rearrange"] });
  assert.equal(m.marks, 1); assert.equal(m.final, false, "a ticked method mark is self-assessed");
  const greedy = { id: "b", marks: 2, input: "number", answer: 64, tolerance: 0, method: [{ id: "x" }, { id: "y" }] };
  assert.equal(markPart(greedy, { text: "12", ticked: ["x", "y"] }).marks, 1, "method marks are capped below full marks");
  const pct = { id: "c", marks: 2, input: "number", answer: -12, tolerance: 0.05, method: [{ id: "x" }] };
  assert.equal(markPart(pct, "−12").marks, 2, "a unicode minus"); assert.equal(markPart(pct, "12").marks, 0, "the sign matters");
  const area = { id: "d", marks: 2, input: "number", answer: 113, tolerance: 0.5, method: [{ id: "x" }] };
  assert.equal(markPart(area, "113.1").marks, 2); assert.equal(markPart(area, "452").marks, 0);
  assert.equal(numberOf("3.2 × 10^-4"), 3.2e-4); assert.equal(numberOf("abc"), null);
});

test("an extended answer earns one mark per ticked point, up to the part's marks, and is always provisional", () => {
  const ext = { id: "a", marks: 2, input: "extended", points: [{ id: "free" }, { id: "loop" }, { id: "plasmid" }] };
  assert.equal(markPart(ext, { text: "…", ticked: ["free"] }).marks, 1);
  assert.equal(markPart(ext, { text: "…", ticked: ["free", "loop", "plasmid"] }).marks, 2, "capped at the part's marks");
  assert.equal(markPart(ext, { text: "…", ticked: ["made-up"] }).marks, 0, "only the scheme's points count");
  assert.equal(markPart(ext, { text: "…", ticked: ["free"] }).final, false);
  const q = { marks: 3, parts: [{ ...ext }, { id: "b", marks: 1, input: "choice", options: [{ text: "x", correct: true }, { text: "y" }, { text: "z" }] }] };
  const all = markQuestion(q, { a: { ticked: ["free", "loop"] }, b: "x" });
  assert.deepEqual([all.marks, all.of, all.provisional], [3, 3, true]);
  assert.equal(markQuestion(q, { b: "x" }).marks, 1);
});

test("the checks catch the mistakes a bank can make", () => {
  const base = () => ({ id: "t", course: "biology", spec: { id: "s", papersUrl: "https://example.org" }, points: { "1.1.1": { title: "P", lessons: ["u01-01"] } },
    topics: [{ id: "1", title: "T", groups: [{ id: "1.1", title: "G" }] }],
    questions: [{ id: "q1", topic: "1", group: "1.1", points: ["1.1.1"], marks: 1, source: "gradify", parts: [{ id: "a", marks: 1, input: "choice", prompt: "p", model: "m", why: "w", mistakes: ["x"], options: [{ text: "a", correct: true }, { text: "b" }, { text: "c" }] }] }] });
  assert.deepEqual(checkBank(base(), { lessonExists: () => true }), []);
  const expect = (edit, re) => { const b = base(); edit(b); assert.ok(checkBank(b, { lessonExists: (id) => id === "u01-01" }).some((p) => re.test(p)), `expected ${re}`); };
  expect((b) => { b.questions[0].marks = 2; }, /add up to 1 marks, not 2/);
  expect((b) => { b.questions[0].source = "aqa"; }, /only Gradify's own questions/);
  expect((b) => { b.questions[0].points = ["9.9.9"]; }, /isn't in the bank's points/);
  expect((b) => { b.points["1.1.1"].lessons = ["u99-99"]; }, /lesson u99-99 doesn't exist/);
  expect((b) => { b.questions[0].parts[0].options[1].correct = true; }, /one correct option/);
  expect((b) => { delete b.questions[0].parts[0].why; }, /model answer and why/);
  expect((b) => { b.questions[0].parts[0].mistakes = []; }, /common mistake/);
  expect((b) => { b.questions.push({ ...b.questions[0] }); }, /unique id/);
  expect((b) => { delete b.spec.papersUrl; }, /board's own past papers/);
  expect((b) => { Object.assign(b.questions[0].parts[0], { input: "short", answer: "aerobic respiration", reject: ["respiration"] }); }, /rejects “respiration”/);
  expect((b) => { Object.assign(b.questions[0], { marks: 2 }); Object.assign(b.questions[0].parts[0], { input: "number", marks: 2, answer: 3, tolerance: 0, method: [] }); }, /method marks/);
  expect((b) => { Object.assign(b.questions[0], { marks: 3 }); Object.assign(b.questions[0].parts[0], { input: "extended", marks: 3, points: [{ id: "a" }, { id: "b" }] }); }, /at least 3 mark points/);
});

test("mini practice: three to six questions, from a topic, weakest points first, stable for a seed", async () => {
  const bank = (await papersFor("biology")()).default;
  const a = practiceSet(bank, { topic: "4.1", n: 5, seed: 7 }), b = practiceSet(bank, { topic: "4.1", n: 5, seed: 7 });
  assert.equal(a.length, 5); assert.deepEqual(a.map((q) => q.id), b.map((q) => q.id));
  assert.equal(practiceSet(bank, { n: 20 }).length, 6); assert.equal(practiceSet(bank, { n: 1 }).length, 3);
  assert.ok(practiceSet(bank, { group: null, topic: "4.1.3", n: 6 }).every((q) => q.group === "4.1.3"));
  assert.equal(practiceSet(bank, { topic: "4.1", n: 4, seed: 3, prefer: ["4.1.3.2"] })[0].points[0], "4.1.3.2");
  const q = bank.questions[0]; assert.ok(lessonsFor(bank, q, q.parts[0]).includes("u02-02"));
});
