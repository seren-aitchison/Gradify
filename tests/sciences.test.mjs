// SciGradify Biology and Chemistry: the curriculum from the brief, permanent ids, the lesson standard
// (docs/CURRICULUM_CONTENT_STANDARD.md, standard 2), interactives and the quality record. Physics has its
// own checks in course.test.mjs; law and nursing in courses.test.mjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir, access } from "node:fs/promises";
import { parseNotes, norm } from "../kit/course/notes.js";
import biology from "../kit/courses/biology/course.js";
import chemistry from "../kit/courses/chemistry/course.js";

const SUBJECTS = [
  { c: biology, dir: "biology", counts: [20, 30, 30, 35, 23, 24, 34, 34, 30, 27, 30, 25, 25, 24] },
  { c: chemistry, dir: "chemistry", counts: [25, 20, 25, 26, 22, 20, 22, 15, 22, 20, 22, 22, 27, 22, 28, 22, 27, 25, 23, 25] },
];
const SRC_KINDS = ["legislation", "case", "rule", "guidance", "standard", "primary", "secondary"];

for (const { c, dir, counts } of SUBJECTS) {
  const units = c.units, lessons = units.flatMap((u) => u.lessons), byId = new Map(lessons.map((l) => [l.id, l]));

  test(`${c.name}: every school and lesson from the brief, in order`, () => {
    assert.deepEqual(units.map((u) => u.lessons.length), counts);
    assert.deepEqual(units.map((u) => u.n), counts.map((_, i) => i + 1));
    for (const u of units) assert.equal(new Set(u.lessons.map((l) => norm(l.title))).size, u.lessons.length, `school ${u.n} has no duplicate titles`);
  });

  test(`${c.name}: every permanent lesson id still exists with its recorded title, and every lesson has one`, async () => {
    const { IDS, RETIRED } = await import(`../kit/courses/${dir}/ids.js`);
    for (const id of Object.keys(RETIRED)) assert.ok(!byId.has(id) && !IDS[id], `${id} is retired`);
    for (const [id, title] of Object.entries(IDS)) {
      assert.ok(byId.has(id), `${id} ("${title}") has disappeared: saved progress would be lost`);
      assert.equal(norm(byId.get(id).title), norm(title), `${id} title changed: update ids.js deliberately if this is a rename`);
    }
    for (const id of byId.keys()) assert.ok(IDS[id], `${id} isn't in ids.js`);
    assert.equal(new Set(byId.keys()).size, byId.size);
  });

  test(`${c.name}: named modules cover every lesson; each school is in one stage; paths and exams are valid`, () => {
    for (const u of units) {
      assert.ok(u.modules.length >= 1 && u.modules.every((m) => m.title && m.lessons.length), `school ${u.n} has named modules`);
      assert.deepEqual(u.modules.flatMap((m) => m.lessons), u.lessons.map((l) => l.id));
      assert.ok(c.blurbs[u.n], `school ${u.n} has a summary`);
    }
    assert.deepEqual(c.tracks.flatMap((t) => t.units).sort((a, b) => a - b), units.map((u) => u.n));
    for (const p of c.paths) for (const n of p.units) assert.ok(units.some((u) => u.n === n), `${p.id} names school ${n}`);
    for (const e of c.exams) { assert.ok(e.units.length && e.count > 0 && e.minutes > 0, e.id); for (const n of e.units) assert.ok(units.some((u) => u.n === n), `${e.id} names ${n}`); }
  });

  test(`${c.name}: the written list, the notes files and the quality record agree`, async () => {
    const files = (await readdir(new URL(`../kit/courses/${dir}/notes/`, import.meta.url))).filter((f) => /^u\d\d\.js$/.test(f)).map((f) => f.slice(0, 3)).sort();
    assert.deepEqual([...c.written].sort(), files);
    for (const id of c.written) assert.ok(c.qa[id], `${id} has a QA record`);
    for (const [id, r] of Object.entries(c.qa)) {
      assert.ok(c.written.includes(id), `${id}: QA record for a school that isn't written`);
      for (const stage of ["reviewed", "sources", "signoff"]) if (r[stage]) assert.match(r[stage].date || "", /^\d{4}-\d\d-\d\d$/, `${id} ${stage} has a date`);
    }
  });

  test(`${c.name}: interactives are registered and their modules exist`, async () => {
    const ids = new Set();
    for (const x of c.interactives) {
      assert.ok(!ids.has(x.id), `duplicate ${x.id}`); ids.add(x.id);
      assert.ok(x.title && x.sub && x.kind && x.note, `${x.id}: title, sub, kind and the model note`);
      assert.ok(["Simulation", "Illustrative model", "Exercise", "Explorer", "Tool"].includes(x.kind), `${x.id}: kind ${x.kind}`);
      assert.ok(x.lessons?.length, `${x.id} names its lessons`);
      for (const l of x.lessons) assert.ok(byId.has(l), `${x.id}: lesson ${l}`);
      await access(new URL(`../kit/labs/${dir}/${x.file}`, import.meta.url));
    }
    for (const f of c.overview.featured) assert.ok(!c.interactives.length || ids.has(f), `featured ${f}`);
  });

  test(`${c.name}: every written lesson meets the lesson standard`, async () => {
    const ixIds = new Set(c.interactives.map((x) => x.id)), titles = new Map(lessons.map((l) => [norm(l.title), l]));
    for (const id of c.written) {
      const u = units.find((x) => x.id === id), parsed = parseNotes(await c.notes(id));
      const have = new Set(parsed.map((p) => norm(p.title)));
      for (const p of parsed) assert.ok(u.lessons.some((l) => norm(l.title) === norm(p.title)), `${id}: "${p.title}" isn't in the syllabus`);
      for (const l of u.lessons) {
        assert.ok(have.has(norm(l.title)), `${id}: no notes for "${l.title}"`);
        const L = parsed.find((p) => norm(p.title) === norm(l.title)), at = `${l.id} ${l.title}`;
        assert.ok(L.lead.length > 60, `${at}: lead`);
        assert.ok(L.blocks.filter((b) => b.t === "h").length >= 2, `${at}: two sections`);
        assert.ok(L.blocks.filter((b) => ["p", "ul", "eq", "ex", "key", "pit"].includes(b.t)).length >= 6, `${at}: too thin`);
        assert.ok(L.blocks.some((b) => b.t === "key"), `${at}: key point`);
        assert.ok(L.objectives.length >= 2, `${at}: objectives`);
        assert.ok(L.terms.length >= 2, `${at}: key terms`);
        assert.ok(L.summary.length >= 1, `${at}: summary`);
        assert.ok(L.sources.length >= 1, `${at}: sources`);
        for (const s of L.sources) {
          assert.ok(SRC_KINDS.includes(s.kind), `${at}: source kind "${s.kind}"`);
          assert.match(s.date, /^\d{4}(-\d\d){0,2}$/, `${at}: source date`);
          if (s.url) assert.match(s.url, /^https:\/\//, `${at}: source link`);
        }
        for (const p of L.prereq) assert.ok(titles.has(norm(p)) || /^[A-Z]/.test(p), `${at}: prerequisite "${p}"`);
        for (const b of L.blocks.filter((x) => x.t === "ix")) assert.ok(ixIds.has(b.id), `${at}: interactive ${b.id}`);
        assert.ok(L.cards.length >= 2, `${at}: flashcards`);
        assert.ok(L.mcq.length >= 2, `${at}: check questions`);
        for (const m of L.mcq) assert.ok(m.wrong.length >= 3 && !m.wrong.includes(m.right) && m.why.length > 40, `${at}: "${m.q}" needs three distractors and an explanation`);
        const all = [...L.mcq.map((m) => m.Q), ...L.tasks];
        assert.ok(all.length >= 4, `${at}: at least four questions`);
        assert.ok(all.some((q) => q.d === 3), `${at}: a reasoning question`);
        assert.ok(new Set(all.map((q) => q.d)).size >= 2, `${at}: two or more levels`);
        for (const q of L.tasks) if (q.type !== "short") assert.ok(q.why?.length > 20, `${at}: "${q.q}" explains its answer`);
      }
    }
  });
}
