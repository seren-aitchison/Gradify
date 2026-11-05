// The new Gradify AI tutor modes (kit/assess/tutor.js): requests are grounded in what they carry, and the
// function's reply check (checkReply) keeps only lesson ids it offered and well-formed questions.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildRequest, checkReply, DAILY, FEEDBACK_MODES } from "../kit/assess/tutor.js";

const lesson = { id: "u01-01", title: "What is law?", text: "Law is a system of enforceable rules. Moral rules are not legally enforceable on their own." };
const NEW = ["diagnose", "socratic", "challenge", "connect", "examiner", "director"];

test("every mode has a daily limit, and the usage table accepts every mode", async () => {
  for (const m of NEW) assert.ok(DAILY[m] > 0, m);
  const sql = await readFile(new URL("../supabase/migrations/20261106130000_tutor_modes.sql", import.meta.url), "utf8");
  for (const m of Object.keys(DAILY)) assert.match(sql, new RegExp(`'${m}'`), `${m} missing from the migration`);
});

test("lesson modes carry the notes and the subject's safety rules", () => {
  const r = buildRequest({ mode: "diagnose", subject: "law", lesson, question: { q: "Is a social promise enforceable?", options: [{ text: "No", correct: true }, { text: "Yes", correct: false }], chosen: "Yes", why: "No intention to create legal relations." } });
  assert.match(r.system, /enforceable rules/); assert.match(r.system, /not legal advice/); assert.match(r.messages[0].content, /LEARNER CHOSE: Yes/);
  assert.ok(r.schema);
  assert.throws(() => buildRequest({ mode: "diagnose", subject: "law", lesson, question: {} }), /Missing/);
  assert.throws(() => buildRequest({ mode: "challenge", subject: "law" }), /Missing lesson/);
});

test("socratic and examiner are conversations that start with the learner side and alternate", () => {
  const first = buildRequest({ mode: "examiner", subject: "physics", lesson, turns: [] });
  assert.equal(first.messages.length, 1); assert.equal(first.messages[0].role, "user"); assert.equal(first.schema, null);
  const later = buildRequest({ mode: "socratic", subject: "physics", lesson, goal: "why moral rules differ", turns: [{ role: "tutor", text: "What makes a rule law?" }, { role: "learner", text: "A court enforces it" }] });
  assert.deepEqual(later.messages.map((m) => m.role), ["user", "assistant", "user"]);
  assert.match(later.system, /Don't give the answer away/);
  assert.throws(() => buildRequest({ mode: "socratic", subject: "physics", lesson, turns: [{ role: "learner", text: "x" }, { role: "tutor", text: "y" }] }), /learner's turn/);
});

test("challenge aims at the weakest dimension, and bad questions are dropped", () => {
  assert.match(buildRequest({ mode: "challenge", subject: "biology", lesson, focus: "transfer" }).system, /unfamiliar context/);
  assert.match(buildRequest({ mode: "challenge", subject: "biology", lesson, focus: "nonsense" }).system, /applying the ideas/);
  const out = checkReply("challenge", { questions: [
    { kind: "choice", question: "Q1", options: [{ text: "a", correct: true }, { text: "b", correct: false }, { text: "c", correct: false }], answer: "a", why: "w" },
    { kind: "choice", question: "Two right", options: [{ text: "a", correct: true }, { text: "b", correct: true }, { text: "c", correct: false }], answer: "a", why: "w" },
    { kind: "short", question: "Explain", options: [{ text: "junk", correct: true }], answer: "Because", why: "w" },
  ] }, {});
  assert.deepEqual(out.questions.map((q) => q.question), ["Q1", "Explain"]);
  assert.deepEqual(out.questions[1].options, []);
});

test("connect and director can only name lessons they were offered", () => {
  const candidates = [{ id: "u01-02", title: "Sources of law" }, { id: "u02-01", title: "Contract" }];
  const c = buildRequest({ mode: "connect", subject: "law", lesson, candidates });
  assert.match(c.system, /u01-02: Sources of law/);
  assert.deepEqual(checkReply("connect", { links: [{ id: "u01-02", why: "a" }, { id: "u09-99", why: "made up" }] }, { candidates }).links.map((l) => l.id), ["u01-02"]);
  assert.throws(() => buildRequest({ mode: "connect", subject: "law", lesson, candidates: [] }), /lessons to choose from/);

  const summary = { dailyMinutes: 20, done: 3, total: 480, dueCards: 4, dueQuestions: 2, mastery: null, dims: { recall: { value: 0.4, certainty: "low" } }, weak: [{ id: "u01-02", title: "Sources of law", note: "40%" }] };
  const d = buildRequest({ mode: "director", subject: "law", course: "Law", summary, candidates });
  assert.match(d.messages[0].content, /recall: 40% \(low\)/); assert.match(d.messages[0].content, /recognition: no evidence/);
  assert.match(d.messages[0].content, /not enough evidence yet/);
  const plan = checkReply("director", { message: "m", steps: [{ action: "revisit", lessonId: "u01-02", label: "a", why: "w", mins: 10 }, { action: "lesson", lessonId: "u77-01", label: "b", why: "w", mins: 10 }, { action: "lesson", lessonId: "", label: "c", why: "w", mins: 30 }] }, { candidates, summary });
  assert.deepEqual(plan.steps.map((s) => s.lessonId), ["u01-02", ""], "unknown ids are blanked; steps beyond the daily time are dropped");
  assert.throws(() => buildRequest({ mode: "director", subject: "law", candidates }), /progress summary/);
});

test("the existing modes still reply the same way", () => {
  assert.deepEqual(FEEDBACK_MODES, ["mark", "debrief"]);
  assert.equal(buildRequest({ mode: "explain", subject: "law", lesson, question: "What is law?" }).mode, "explain");
  assert.deepEqual(checkReply("explain", { answer: "x", fromLesson: true }, {}), { answer: "x", fromLesson: true });
});
