// Cross-site compatibility: the shared engine runs every Gradify course, and three different subjects (maths,
// science and programming) through their adapters, with no subject-specific code in the engine. If a change to the
// shared engine breaks any course, or a subject's config stops fitting the spec, this suite fails.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { checkCourse, capabilitiesOf, FIELDS } from "../kit/course/spec.js";
import { parseNotes, lessonHtml } from "../kit/course/notes.js";
import { renderQuestion, markQuestion, registerQuestionType } from "../kit/assess/questions.js";
import { conceptGraph, validateGraph, weakPrerequisites } from "../kit/learning/concepts.js";
import { evidenceFromAttempts, sixProfile } from "../kit/learning/mastery.js";
import { makeAttempt } from "../kit/assess/attempts.js";
import { defineCourse } from "../kit/subjects/define.js";
import { ADAPTERS } from "../kit/subjects/index.js";
import { outputType } from "../kit/subjects/programming.js";

const slugs = (await readdir(new URL("../kit/courses/", import.meta.url))).sort();
const courses = [];
for (const s of slugs) { try { courses.push((await import(`../kit/courses/${s}/course.js`)).default); } catch { /* not a course */ } }
const tech = (await import("./fixtures/programming/course.js")).default;   // registers the OUT type
const all = [...courses, tech];

// the response that should score full marks, for every question type
function rightResponse(Q) {
  switch (Q.type) {
    case "sba": case "mcq": case "tf": return Q.options.find((o) => o.correct).text;
    case "multi": return Q.options.filter((o) => o.correct).map((o) => o.text);
    case "order": return Q.steps;
    case "match": return Object.fromEntries(Q.pairs);
    case "num": return String(Q.answer);
    case "output": return Q.output;
    default: return null;                                   // short answers are self-assessed
  }
}

test("every course config fits the subject spec, and storage is kept apart by slug", () => {
  assert.ok(courses.length >= 9);
  for (const c of all) assert.deepEqual(checkCourse(c), [], `${c.slug}`);
  const s = all.map((c) => c.slug);
  assert.equal(new Set(s).size, s.length, "two courses share a slug, so they'd share storage keys and attempts");
});

test("three subjects through three adapters: maths, science and programming", () => {
  const by = Object.fromEntries(all.map((c) => [c.slug, c]));
  assert.equal(by.maths.adapter, "maths");
  for (const s of ["physics", "chemistry", "biology"]) assert.equal(by[s].adapter, "science");
  assert.equal(tech.adapter, "programming");
  for (const id of ["maths", "science", "programming"]) assert.ok(ADAPTERS[id].qa?.rules && ADAPTERS[id].defaults, id);
  // the adapters supply different subject capabilities on the same engine
  assert.ok(capabilitiesOf(by.maths).includes("workspace") && capabilitiesOf(by.maths).includes("concepts"));
  assert.ok(capabilitiesOf(by.chemistry).includes("labs"));
  assert.ok(capabilitiesOf(tech).includes("concepts"));
  // a course's own fields override its adapter's defaults
  assert.equal(by.physics.unitWord, "Unit");
  assert.equal(by.chemistry.unitWord, "School");
});

test("every question in every written lesson of every course renders, and marks its own answer correct", async () => {
  let n = 0;
  for (const c of all) {
    for (const u of c.written) {
      for (const L of parseNotes(await c.notes(u))) {
        assert.ok(lessonHtml(L).length > 0);
        const qs = [...L.mcq.map((m) => m.Q), ...L.tasks];
        for (const [i, Q] of qs.entries()) {
          const html = renderQuestion(Q, `${c.slug}-${L.title}-${i}`, { levels: c.levels });
          assert.match(html, /class="aq aq-type-/, `${c.slug} ${L.title}`);
          const r = rightResponse(Q); if (r == null) continue;
          assert.equal(markQuestion(Q, r).correct, true, `${c.slug} ${L.title}: "${Q.q.slice(0, 60)}" doesn't accept its own answer`);
          n++;
        }
      }
    }
  }
  assert.ok(n > 12000, `${n} questions marked`);
});

test("a subject's question type works in the shared engine, and can't clash with another", () => {
  const Q = parseNotes("## T\nS: lead\nOUT1@1: What does this print? | print(1 + 1) | 2 | 1 + 1 = 2.")[0].tasks[0];
  assert.equal(Q.type, "output");
  assert.equal(markQuestion(Q, "2\n").correct, true);
  assert.equal(markQuestion(Q, "3").correct, false);
  assert.match(renderQuestion(Q, "k"), /aq-type-output[^]*<pre class="aq-code">/);
  assert.doesNotThrow(() => registerQuestionType(outputType));                                  // the same registration again
  assert.throws(() => registerQuestionType({ ...outputType, handler: { ...outputType.handler } }), /already registered/);
  assert.throws(() => registerQuestionType({ ...outputType, tag: "NUM", type: "other" }), /already registered/);
  assert.throws(() => defineCourse({}, {}), /adapter/);
});

test("one shared engine, three subjects: the concept graph and the mastery engine need no subject code", () => {
  const by = Object.fromEntries(all.map((c) => [c.slug, c]));
  // weak-foundation detection on maths and on programming, by the same function
  for (const [c, lesson, weakModule] of [[by.maths, "u07-27", "u07/Differentiation"], [tech, "m02-01", "m01/Values"]]) {
    const g = conceptGraph(c.units, c.concepts);
    assert.deepEqual(validateGraph(g).unknown, []);
    const weakLessons = new Set(g.nodes.get(weakModule).lessons);
    const attempts = [];
    for (const l of weakLessons) for (const d of [1, 2, 3]) for (let k = 0; k < 2; k++) attempts.push(makeAttempt({ site: c.site, subject: c.slug, context: "lesson", Q: { type: d === 1 ? "mcq" : "num", d }, key: `${l}-${d}-${k}`, lesson: l, response: "x", result: { score: 0.1, correct: false } }));
    const masteryOf = (ids) => { const s = new Set(ids), ev = evidenceFromAttempts(attempts.filter((a) => s.has(a.lesson))); return ev.length ? sixProfile(ev).mastery : null; };
    const weak = weakPrerequisites(g, lesson, masteryOf);
    assert.ok(weak.some((w) => w.key === weakModule), `${c.slug}: ${JSON.stringify(weak.map((w) => w.key))}`);
  }
});

test("the spec documents every field a course uses", () => {
  const known = new Set(FIELDS.map((f) => f[0]));
  for (const c of all) for (const k of Object.keys(c)) assert.ok(known.has(k), `${c.slug}.${k}`);
});

test("docs/SUBJECT_CONFIG_SPEC.md is generated from the current spec", async () => {
  const { readFile } = await import("node:fs/promises");
  const { specDoc } = await import("../scripts/subject-spec-doc.mjs");
  assert.equal(await readFile(new URL("../docs/SUBJECT_CONFIG_SPEC.md", import.meta.url), "utf8"), specDoc(), "run node scripts/subject-spec-doc.mjs");
});

test("every live course is defined through a subject adapter that carries its QA rules", () => {
  for (const c of courses) {
    if (c.page) continue;                                   // courses scaffolded by new-course.mjs use the standard-2 rules
    assert.ok(c.adapter && ADAPTERS[c.adapter], `${c.slug} has no adapter`);
    assert.equal(typeof ADAPTERS[c.adapter].qa.rules, "function", c.slug);
    assert.ok(ADAPTERS[c.adapter].qa.expert, c.slug);
  }
});
