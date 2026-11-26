// Lesson System Brief v2 (docs/LESSON-SCHEMA.md): schema v2 lines, the lesson flow adapter over the whole library,
// the Learn mode pilots, and the onboarding questionnaire's saved fields.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { parseNotes } from "../kit/course/notes.js";
import { lessonFlow, lessonSteps, conceptBlocks, checkCoverage, finalCheck, untried, LEARN_PILOTS } from "../kit/course/blocks.js";
import { onboardingPatch, WEEK } from "../kit/app/onboarding.js";

const V2 = `## Osmosis
S: Water moves across a partially permeable membrane from a dilute solution to a concentrated one, by diffusion.
O: Define osmosis
O: Predict the direction of water movement
H: What osmosis is @1
HOOK: A raisin is left in water overnight. What happens to it, and why?
P: Osmosis is the diffusion of water through a partially permeable membrane.
MORE: Water potential is the formal way to compare solutions.
ALT: analogy | Think of the membrane as a sieve that lets only the smallest things through.
M1: What does osmosis move? | water | sugar | salt | protein
H: Predicting direction @2
P: Water moves towards the more concentrated solution.
M2: A cell is put in pure water. Which way does water move? | into the cell | out of the cell | neither | both
M3: Explain why a plant cell in salt water wilts. | water leaves by osmosis | it gains water | salt enters | it is cold
SUM: Osmosis moves water from dilute to concentrated solutions.
`;

test("schema v2: H @n, HOOK, MORE and ALT parse into tagged blocks, and questions record their section", () => {
  const [L] = parseNotes(V2);
  const hs = L.blocks.filter((b) => b.t === "h");
  assert.deepEqual(hs.map((h) => [h.x, h.obj]), [["What osmosis is", [1]], ["Predicting direction", [2]]]);
  assert.ok(L.blocks.some((b) => b.t === "hook" && /raisin/.test(b.x)));
  assert.ok(L.blocks.some((b) => b.t === "more"));
  assert.deepEqual(L.blocks.filter((b) => b.t === "alt").map((b) => b.style), ["analogy"]);
  assert.deepEqual(L.placed.map((p) => p.sec), [1, 2, 2]);
});

test("schema v2: a v2 lesson's checks are the questions placed in each block", () => {
  const [L] = parseNotes(V2), F = lessonFlow(L);
  assert.equal(F.version, 2);
  assert.equal(F.blocks.length, 2);
  assert.ok(F.blocks[0].hook && F.blocks[0].more.length === 1 && F.blocks[0].alts.length === 1);
  assert.deepEqual(F.blocks.map((B) => B.objectives), [[1], [2]]);
  assert.match(F.blocks[0].checks[0].Q.q || F.blocks[0].checks[0].Q.prompt || JSON.stringify(F.blocks[0].checks[0].Q), /osmosis move/);
  assert.equal(F.prove.length, 1, "the level 3 question is the final check");
});

test("schema v1 still parses unchanged: no lesson needs the new lines", () => {
  const [L] = parseNotes(V2.replace(/ @\d/g, "").replace(/^(HOOK|MORE|ALT):.*\n/gm, ""));
  assert.ok(!L.blocks.some((b) => ["hook", "more", "alt"].includes(b.t) || b.obj));
  assert.equal(conceptBlocks(L).length, 2);
});

const V1 = `## Cell membranes
S: The membrane controls what enters and leaves the cell, and its structure explains how.
O: Describe the fluid mosaic model
O: Explain how substances cross the membrane
H: Structure
P: A phospholipid bilayer with proteins floating in it: the fluid mosaic model. Cholesterol stiffens the bilayer.
H: Transport
P: Small non-polar molecules diffuse through the bilayer; ions need channel proteins or carrier proteins, and active transport uses ATP.
M1: Which molecule stiffens the phospholipid bilayer? | cholesterol | ATP | channel proteins | carrier proteins
M1: How do ions cross the membrane? | through channel proteins | dissolving in the bilayer | cholesterol | phospholipid
M2: What is a cell membrane? | a barrier around the cell | a protein | a sugar | a gene
`;

test("matching: a v1 question is a block's check only when its stem and right answer clearly point at that block", () => {
  const [L] = parseNotes(V1), F = lessonFlow(L);
  const title = (q) => q.Q.q;
  assert.deepEqual(F.blocks.map((B) => B.checks.map(title)), [["Which molecule stiffens the phospholipid bilayer?"], ["How do ions cross the membrane?"]]);
  assert.ok(F.blocks.every((B) => B.checks.every((q) => q.basis === "matched")));
  // the wrong options name the other block's ideas on purpose: they aren't evidence; and words in the lesson's title
  // ("cell", "membrane") or in every block tell nothing apart, so a general question stays in practice
  assert.deepEqual(F.practise.map(title), ["What is a cell membrane?"]);
});

test("matching: no clear winner means no check (no check is better than a wrong one)", () => {
  const [L] = parseNotes(V1.replace(/^M1: How do ions.*\n/m, "M1: Which proteins carry ions and stiffen the bilayer? | channel proteins and cholesterol | ATP | sugar | water\n"));
  const F = lessonFlow(L), all = F.blocks.flatMap((B) => B.checks).map((q) => q.Q.q);
  assert.ok(!all.includes("Which proteins carry ions and stiffen the bilayer?"));
  const c = checkCoverage(L);
  assert.equal(c.blocks, 2); assert.equal(c.checked, c.placed + c.tagged + c.matched);
});

test("completion: the final check is the same in every mode, and trying it (right or wrong) is what counts", () => {
  const [L] = parseNotes(V2), keys = finalCheck(L).map((n) => `k${n}`);
  assert.equal(keys.length, 1);
  assert.deepEqual(untried(keys, [], "x"), keys);
  assert.deepEqual(untried(keys, [{ lesson: "x", question: { id: keys[0] }, correct: false }], "x"), []);
  assert.deepEqual(untried(keys, [{ lesson: "y", question: { id: keys[0] } }], "x"), keys, "an attempt in another lesson doesn't count");
});

const dirs = (await readdir(new URL("../kit/courses/", import.meta.url), { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
const courses = [];
for (const dir of dirs) {
  try { courses.push({ dir, course: (await import(`../kit/courses/${dir}/course.js`)).default }); } catch { /* not a notes course */ }
}

test("the flow adapter places every question in every lesson of the library exactly once", async () => {
  let lessons = 0, questions = 0;
  for (const { dir, course } of courses) {
    for (const id of course.written || []) {
      for (const L of parseNotes(await course.notes(id))) {
        const { flow: F, steps } = lessonSteps(L);
        const n = L.mcq.length + L.tasks.length;
        const ids = [...F.diagnose, ...F.blocks.flatMap((B) => B.checks), ...F.practise, ...F.prove].map((q) => q.n);
        assert.equal(ids.length, n, `${dir}/${id} ${L.title}: questions placed`);
        assert.equal(new Set(ids).size, n, `${dir}/${id} ${L.title}: each question once`);
        assert.ok(F.blocks.length >= 1, `${dir}/${id} ${L.title}: at least one block`);
        assert.equal(steps[0].kind, "orient"); assert.equal(steps.at(-1).kind, "next");
        lessons++; questions += n;
      }
    }
  }
  assert.ok(lessons > 1000, `adapted ${lessons} lessons`);
  assert.ok(questions > 10000, `placed ${questions} questions`);
});

test("every Learn mode pilot is a written lesson", async () => {
  for (const [slug, ids] of Object.entries(LEARN_PILOTS)) {
    const { course } = courses.find((c) => c.course.slug === slug) || {};
    assert.ok(course, `${slug} is a course`);
    for (const id of ids) {
      const unit = id.split("-")[0], u = course.units.find((x) => x.id === unit);
      assert.ok(course.written.includes(unit), `${slug} ${id}: written`);
      const l = u.lessons.find((x) => x.id === id);
      assert.ok(l, `${slug} ${id}: in the syllabus`);
      const L = parseNotes(await course.notes(unit)).find((p) => p.title.toLowerCase() === l.title.toLowerCase());
      assert.ok(L, `${slug} ${id}: has notes`);
      assert.ok(lessonSteps(L).steps.length >= 4, `${slug} ${id}: a real flow`);
    }
  }
});

test("onboarding saves the same profile fields as before", () => {
  const keys = ["goal", "site", "level", "exam_date", "daily_minutes"];
  const exam = onboardingPatch({ site: "BioGradify", level: "school", deadline: "2027-06-01", week: "5" });
  assert.deepEqual(Object.keys(exam).sort(), [...keys].sort());
  assert.deepEqual(exam, { goal: "exam", site: "BioGradify", level: "school", exam_date: "2027-06-01", daily_minutes: 45 });
  assert.equal(onboardingPatch({ site: "", level: "professional", deadline: "2027-01-01", week: "1" }).goal, "qualification");
  assert.equal(onboardingPatch({ site: "", level: "undergraduate", deadline: "", week: "8" }).goal, "course");
  assert.equal(onboardingPatch({ site: "", level: "school", deadline: "", week: "?" }).daily_minutes, WEEK[1][3]);
  assert.equal(onboardingPatch({ site: "", level: "school", deadline: "" }).exam_date, null);
});
