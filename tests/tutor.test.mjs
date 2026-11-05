import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { buildRequest, scoreFeedback, DAILY, FEEDBACK_SCHEMA } from "../kit/assess/tutor.js";

const task = { title: "T", brief: "B", prompt: "Advise Ben.", rubric: ["States the rule", "Applies it"], model: "Model." };
const kase = { client: "Mr X", persona: "Calm", facts: "Bought a van." };

test("tutor: the function gets an exact copy of kit/assess/tutor.js (npm run sync)", async () => {
  assert.equal(await readFile("supabase/functions/_shared/tutor.js", "utf8"), await readFile("kit/assess/tutor.js", "utf8"));
});

test("tutor: mark builds a structured feedback request and keeps the site's boundaries", () => {
  const r = buildRequest({ mode: "mark", subject: "law", task, answer: "x".repeat(60) });
  assert.equal(r.schema, FEEDBACK_SCHEMA);
  assert.match(r.system, /not legal advice/);
  assert.match(r.messages[0].content, /RUBRIC:\n1\. States the rule\n2\. Applies it/);
  const n = buildRequest({ mode: "mark", subject: "nursing", task, answer: "x".repeat(60) });
  assert.match(n.system, /not clinical guidance/);
  assert.throws(() => buildRequest({ mode: "mark", subject: "law", task, answer: "too short" }), /fuller answer/);
  assert.throws(() => buildRequest({ mode: "mark", subject: "law", task: { prompt: "p", rubric: [] }, answer: "x".repeat(60) }), /rubric/);
});

test("tutor: answers are capped so a request can't be made huge", () => {
  const r = buildRequest({ mode: "mark", subject: "law", task, answer: "y".repeat(50000) });
  assert.ok(r.messages[0].content.length < 12000);
});

test("tutor: roleplay sends alternating turns that start with the learner, as plain text", () => {
  const r = buildRequest({ mode: "roleplay", subject: "law", case: kase, turns: [
    { role: "client", text: "Hello?" }, { role: "learner", text: "Hi, I'm Sam." }, { role: "learner", text: "How can I help?" },
    { role: "client", text: "My van broke." }, { role: "learner", text: "When did you buy it?" }] });
  assert.equal(r.schema, null);
  assert.deepEqual(r.messages.map((m) => m.role), ["user", "assistant", "user"]);
  assert.equal(r.messages[0].content, "Hi, I'm Sam.\nHow can I help?");
  assert.match(r.system, /Bought a van/);
  assert.throws(() => buildRequest({ mode: "roleplay", case: kase, turns: [{ role: "learner", text: "a" }, { role: "client", text: "b" }] }), /learner's turn/);
  assert.throws(() => buildRequest({ mode: "roleplay", case: kase, turns: Array.from({ length: 41 }, () => ({ role: "learner", text: "a" })) }), /up to 40/);
});

test("tutor: debrief needs a real interview; explain needs a question and a lesson", () => {
  assert.throws(() => buildRequest({ mode: "debrief", case: kase, rubric: ["a"], turns: [{ role: "learner", text: "hi" }] }), /longer/);
  const turns = [1, 2, 3].flatMap((i) => [{ role: "learner", text: `q${i}` }, { role: "client", text: `a${i}` }]);
  assert.equal(buildRequest({ mode: "debrief", case: kase, rubric: ["a"], turns }).schema, FEEDBACK_SCHEMA);
  const e = buildRequest({ mode: "explain", subject: "nursing", lesson: { title: "NEWS2", text: "Notes about NEWS2." }, question: "Why does it matter?" });
  assert.match(e.system, /Notes about NEWS2/);
  assert.throws(() => buildRequest({ mode: "explain", lesson: { title: "x", text: "y" }, question: "?" }), /Ask a question/);
  assert.throws(() => buildRequest({ mode: "nope" }), /Unknown mode/);
  assert.ok(Object.values(DAILY).every((n) => n > 0 && n <= 200));
});

test("tutor: feedback scores from rubric ratings", () => {
  assert.equal(scoreFeedback({ criteria: [{ rating: "met" }, { rating: "partly" }, { rating: "not yet" }, { rating: "met" }] }), 0.625);
  assert.equal(scoreFeedback({}), 0);
});

for (const slug of ["law", "nursing"]) {
  test(`${slug}: written practice tasks are complete`, async () => {
    const { WRITING } = await import(`../kit/courses/${slug}/writing.js`);
    const { UNITS } = await import(`../kit/courses/${slug}/syllabus.js`);
    const ids = new Set();
    for (const t of WRITING) {
      assert.ok(!ids.has(t.id), `${t.id} is unique`); ids.add(t.id);
      assert.ok(t.id.startsWith(`${slug}-w-`), `${t.id} is namespaced`);
      assert.ok(UNITS.some((u) => u.id === t.unit), `${t.id}: unit ${t.unit} exists`);
      assert.ok(t.title && t.kind && t.brief && t.minutes > 0 && t.model.length > 200, `${t.id} has its parts`);
      assert.ok(t.rubric.length >= 3 && t.rubric.length <= 12, `${t.id}: 3 to 12 rubric points`);
      if (t.interview) assert.ok(t.client && t.persona && t.facts.length > 100, `${t.id}: interview case file`);
      else assert.ok(t.prompt.length > 80, `${t.id}: prompt`);
      // the request the tutor would get is valid
      if (!t.interview) assert.ok(buildRequest({ mode: "mark", subject: slug, task: t, answer: t.model }).messages.length === 1);
    }
  });
}

test("tutor: feedback is shown escaped, with a rating label per criterion", async () => {
  const { feedbackHtml, paras } = await import("../kit/assess/tutor-view.js");
  const html = feedbackHtml({ summary: "Good <b>work</b>", criteria: [{ criterion: "Rule", rating: "not yet", comment: "<script>x</script>" }], strengths: ["Clear"], improve: ["Cite"] });
  assert.ok(!html.includes("<script>") && !html.includes("<b>work"), "model output is escaped");
  assert.match(html, /class="r-not-yet"><span>Not yet<\/span>/);
  assert.match(html, /provisional study feedback/);
  assert.equal(paras("One.\n\nTwo <i>"), "<p>One.</p><p>Two &lt;i&gt;</p>");
});
