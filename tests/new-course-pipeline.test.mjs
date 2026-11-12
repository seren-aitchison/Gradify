// The subject production tools: the shared lesson standard (scripts/lesson-standard.mjs) lists every problem at
// once, catches what would break a notes module, predicts the QA length-bias warning, and `new-course.mjs check`
// runs it on a draft before it is added.
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { writeFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { lessonProblems, schoolProblems, unsafeForTemplate } from "../scripts/lesson-standard.mjs";
import { parseNotes } from "../kit/course/notes.js";

const GOOD = `## A Lesson
LV: GCSE · Foundation
S: A lead sentence that is comfortably longer than sixty characters for the test.
O: First objective
O: Second objective
H: One
P: Paragraph one.
P: Paragraph two.
H: Two
- A point
X: An example
> A step
K: The key point.
!: A misconception.
EV: established | A claim.
T: Term | Meaning
T: Term two | Meaning two
SUM: A summary.
SRC: Author A., A Book, Publisher | secondary | 2001
SRC: Author B., Another Book, Publisher | secondary | 2002
Q: Card one? | Answer one.
Q: Card two? | Answer two.
M1@1: First question? | Right answer here | Wrong answer one | Wrong answer two | Wrong answer three | An explanation that is longer than forty characters.
M2@2: Second question? | Right answer here | Wrong answer one | Wrong answer two | Wrong answer three | An explanation that is longer than forty characters.
TF1@1: A statement. | true | Because it is true, which is explained here.
M3@1,2: Third question? | Right answer here | Wrong answer one | Wrong answer two | Wrong answer three | An explanation that is longer than forty characters.
SA3@2: Explain something. | A model answer. | Point one ; Point two`;
const unit = { id: "u99", title: "Test", lessons: [{ id: "u99-01", title: "A Lesson" }] };

test("a lesson that meets the standard has no problems", () => {
  assert.deepEqual(schoolProblems(GOOD, unit).problems, []);
});

test("every problem in a lesson is listed at once, not just the first", () => {
  const bad = GOOD.replace("O: Second objective\n", "").replace(/^SRC: Author B.*\n/m, "SRC: Author B., Another Book, Publisher | secondary | 99\n")
    .replace("| An explanation that is longer than forty characters.\nM2", "| Too short.\nM2").replace(/^SA3@2:.*$/m, "");
  const p = schoolProblems(bad, unit).problems;
  for (const want of [/two objectives/, /source date "99"/, /explanation is 10 characters/, /extended written answer/, /names objective 2/]) assert.ok(p.some((x) => want.test(x)), `${want}: ${JSON.stringify(p)}`);
  assert.ok(p.length >= 5);
});

test("missing and stray lessons are reported against the syllabus", () => {
  const two = { ...unit, lessons: [...unit.lessons, { id: "u99-02", title: "Second Lesson" }] };
  assert.ok(schoolProblems(GOOD, two).problems.some((x) => /u99-02 Second Lesson: no notes/.test(x)));
  assert.ok(schoolProblems(GOOD.replace("## A Lesson", "## Not In Syllabus"), unit).problems.some((x) => /isn't in the syllabus/.test(x)));
});

test("length bias is predicted before QA warns about it", () => {
  const biased = GOOD.replace(/\| Right answer here \|/g, "| A right answer that is very much longer than any of the distractors offered |");
  const r = schoolProblems(biased, unit);
  assert.match(r.warnings[0], /length bias: .* 3 of 3/);
  assert.deepEqual(schoolProblems(GOOD, unit).warnings, []);
});

test("text that would break a notes module is caught before wrapping", () => {
  assert.deepEqual(unsafeForTemplate(GOOD), []);
  assert.equal(unsafeForTemplate("P: use `code` here").length, 1);
  assert.equal(unsafeForTemplate("P: costs ${x}").length, 1);
  assert.equal(unsafeForTemplate("P: A \\ B").length, 1);
  assert.equal(unsafeForTemplate("M1#history-u01-01-q1@1: q").length, 1);
});

test("`new-course.mjs check` lists a draft's problems and fails; a clean school passes", async () => {
  const dir = await mkdtemp(join(tmpdir(), "gradify-")), draft = join(dir, "draft.txt");
  await writeFile(draft, "## What is history?\nLV: GCSE\nS: Too short.\n");
  const bad = spawnSync(process.execPath, ["scripts/new-course.mjs", "check", "history", "--unit", "u01", draft], { encoding: "utf8" });
  assert.equal(bad.status, 1);
  assert.match(bad.stdout, /lead \(S:\) over 60 characters/);
  assert.match(bad.stdout, /no notes/);
  const ok = spawnSync(process.execPath, ["scripts/new-course.mjs", "check", "history", "--unit", "u01"], { encoding: "utf8" });
  assert.equal(ok.status, 0, ok.stdout + ok.stderr);
  const doc = spawnSync(process.execPath, ["scripts/new-course.mjs", "doctor", "history"], { encoding: "utf8" });
  assert.equal(doc.status, 0, doc.stdout + doc.stderr);
  assert.match(doc.stdout, /✓ listed in kit\/learning\/learner-data\.js/);
});
