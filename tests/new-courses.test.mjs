// Every course made with scripts/new-course.mjs (any kit/courses/<slug>/ whose course.js names its `page`): the
// structure, permanent ids, the lesson standard (content standard 2, as PsychGradify and SocGradify), permanent
// question ids, interactives, the course page and its registration with the rest of Gradify.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile, access } from "node:fs/promises";
import { parseNotes, norm } from "../kit/course/notes.js";
import { schoolProblems } from "../scripts/lesson-standard.mjs";
import { updateRegistry, scanQuestions } from "../scripts/curriculum-registry.mjs";
import { COURSES } from "../kit/learning/learner-data.js";
import { SITES } from "../kit/core/site.js";

const root = new URL("../", import.meta.url);
const KINDS = ["Experiment", "Simulation", "Illustrative model", "Exercise", "Explorer", "Tool"];
const found = [];
for (const dir of (await readdir(new URL("kit/courses/", root))).sort()) {
  const c = (await import(new URL(`kit/courses/${dir}/course.js`, root))).default;
  if (c.page) found.push({ c, dir });
}

test("new courses are found", () => assert.ok(Array.isArray(found)));

for (const { c, dir } of found) {
  const units = c.units, lessons = units.flatMap((u) => u.lessons), byId = new Map(lessons.map((l) => [l.id, l]));

  test(`${c.name}: schools in order, in named modules, each with a summary`, () => {
    assert.equal(c.slug, dir);
    assert.ok(units.length >= 4, "a full curriculum has at least four schools");
    assert.deepEqual(units.map((u) => u.n), units.map((_, i) => i + 1));
    for (const u of units) {
      assert.ok(u.lessons.length >= 6, `school ${u.n} has at least six lessons`);
      assert.equal(new Set(u.lessons.map((l) => norm(l.title))).size, u.lessons.length, `school ${u.n} has no duplicate titles`);
      assert.ok(u.modules.length >= 2 && u.modules.every((m) => m.title && m.lessons.length), `school ${u.n} has named modules`);
      assert.ok(c.blurbs[u.n]?.length > 20, `school ${u.n} has a summary`);
    }
  });

  test(`${c.name}: every permanent lesson id still exists with its recorded title, and every lesson has one`, async () => {
    const { IDS, RETIRED } = await import(`../kit/courses/${dir}/ids.js`);
    for (const id of Object.keys(RETIRED)) assert.ok(!byId.has(id) && !IDS[id], `${id} is retired`);
    for (const [id, title] of Object.entries(IDS)) {
      assert.ok(byId.has(id), `${id} ("${title}") has disappeared: saved progress would be lost`);
      assert.equal(norm(byId.get(id).title), norm(title), `${id} title changed: update ids.js deliberately if this is a rename`);
    }
    for (const id of byId.keys()) assert.ok(IDS[id], `${id} isn't in ids.js: run node scripts/new-course.mjs lock ${dir}`);
  });

  test(`${c.name}: stages, paths, exams and the overview are valid`, () => {
    assert.deepEqual(c.tracks.flatMap((t) => t.units).sort((a, b) => a - b), units.map((u) => u.n), "each school is in exactly one stage");
    assert.ok(c.paths.length >= 2, "at least two paths");
    for (const p of c.paths) { assert.ok(p.id && p.name && p.sub && p.units.length); for (const n of p.units) assert.ok(units.some((u) => u.n === n), `${p.id} names school ${n}`); }
    for (const e of c.exams) { assert.ok(e.units.length && e.count > 0 && e.minutes > 0, e.id); for (const n of e.units) assert.ok(units.some((u) => u.n === n), `${e.id} names ${n}`); }
    assert.deepEqual(c.levels, ["Foundation", "Application", "Evaluation"]);
    assert.equal(c.unitWord, "School");
    assert.ok(c.notice?.length > 100 && c.reviewLine && c.expert);
    assert.ok(c.overview.intro.length > 80 && c.overview.sources && c.overview.learn.length >= 4, "the overview says what the course teaches");
  });

  test(`${c.name}: the written list, the notes files and the quality record agree`, async () => {
    const files = (await readdir(new URL(`kit/courses/${dir}/notes/`, root))).filter((f) => /^u\d\d\.js$/.test(f)).map((f) => f.slice(0, 3)).sort();
    assert.deepEqual([...c.written].sort(), files);
    assert.ok(c.written.length >= 1, "at least one school is written");
    for (const id of c.written) { assert.ok(c.qa[id], `${id} has a QA record`); assert.match(c.writtenOn[id] || "", /^\d{4}-\d\d-\d\d$/, `${id} has a written date`); }
    for (const [id, r] of Object.entries(c.qa)) {
      assert.ok(c.written.includes(id), `${id}: QA record for a school that isn't written`);
      assert.equal(r.standard, 2, `${id} is written to standard 2`);
      if (r.sources) assert.ok(r.reviewed, `${id}: sources can't be verified before review`);
      if (r.signoff) assert.ok(r.reviewed && r.sources && !/claude|ai\b/i.test(r.signoff.by || ""), `${id}: sign-off needs review, sources and a human expert`);
    }
  });

  test(`${c.name}: interactives are registered, load, and name real lessons`, async () => {
    const ids = new Set();
    for (const x of c.interactives) {
      assert.ok(!ids.has(x.id), `duplicate ${x.id}`); ids.add(x.id);
      assert.ok(x.title && x.sub && x.kind && x.note, `${x.id}: title, sub, kind and the model note`);
      assert.ok(KINDS.includes(x.kind), `${x.id}: kind ${x.kind}`);
      assert.ok(x.lessons?.length, `${x.id} names its lessons`);
      for (const l of x.lessons) assert.ok(byId.has(l), `${x.id}: lesson ${l}`);
      for (const n of x.schools || []) assert.ok(units.some((u) => u.n === n), `${x.id}: school ${n}`);
      assert.equal(typeof (await x.load()).mount, "function", `${x.id} exports mount()`);
    }
    for (const f of c.overview.featured) assert.ok(ids.has(f), `featured ${f}`);
  });

  test(`${c.name}: every written lesson meets the lesson standard`, async () => {
    // the standard is scripts/lesson-standard.mjs, shared with `node scripts/new-course.mjs check`; every problem is listed
    const ixIds = new Set(c.interactives.map((x) => x.id)), seen = new Map(), problems = [];
    for (const id of c.written) problems.push(...schoolProblems(await c.notes(id), units.find((x) => x.id === id), { ixIds, seen }).problems);
    assert.deepEqual(problems, [], `run node scripts/new-course.mjs check ${dir}`);
  });

  test(`${c.name}: questions have permanent ids, and the registry is up to date`, async () => {
    const ids = [];
    for (const id of c.written) {
      const src = await readFile(new URL(`kit/courses/${dir}/notes/${id}.js`, root), "utf8");
      for (const q of scanQuestions(src)) { assert.ok(q.id, `${id} "${q.body.slice(0, 50)}" has no id: run node scripts/new-course.mjs lock ${dir}`); ids.push(q.id); }
    }
    assert.equal(new Set(ids).size, ids.length, "no duplicate question ids");
    assert.ok(ids.every((x) => x.startsWith(`${dir}-`)), "ids carry the course prefix");
    const { log } = await updateRegistry(dir, c, { write: false });
    assert.deepEqual(log, [], `run node scripts/new-course.mjs lock ${dir}: the notes have changed since the registry was updated`);
  });

  test(`${c.name}: the course page exists and the course is registered across Gradify`, async () => {
    const page = await readFile(new URL(`${c.page.slice(1)}index.html`, root), "utf8");
    assert.ok(page.includes(`kit/courses/${dir}/course.js`) && page.includes(`content="${c.site}"`), "the page mounts this course for its site");
    assert.equal(COURSES[dir], c.page, "kit/learning/learner-data.js lists the course");
    assert.ok(SITES.some((s) => s.n === c.site && s.built), `${c.site} is a built site in kit/core/sites.js`);
    const home = await readFile(new URL(`${c.page.split("/")[1]}/index.html`, root), "utf8");
    assert.match(home, /href="course\/"/, "the site's homepage links the course");
    await access(new URL(`kit/courses/${dir}/notes/`, root));
  });
}
