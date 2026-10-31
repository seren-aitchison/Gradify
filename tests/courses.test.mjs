// LawGradify and NurseGradify courses: the same checks the physics course has (tests/course.test.mjs),
// plus the rules these two subjects add: law check questions are single-best-answer with an
// explanation; nursing courses carry their clinical-safety notice.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { parseNotes, norm } from "../kit/course/notes.js";
import law from "../kit/courses/law/course.js";
import nursing from "../kit/courses/nursing/course.js";

for (const [name, course, dir] of [["law", law, "law"], ["nursing", nursing, "nursing"]]) {
  test(`${name}: schools are numbered in order, each in exactly one track, and every path names real schools`, () => {
    assert.deepEqual(course.units.map((u) => u.n), Array.from({ length: course.units.length }, (_, i) => i + 1));
    const inTracks = course.tracks.flatMap((t) => t.units).sort((a, b) => a - b);
    assert.deepEqual(inTracks, course.units.map((u) => u.n));
    for (const p of course.paths) for (const n of p.units) assert.ok(course.units.some((u) => u.n === n), `${p.id} names school ${n}`);
    for (const u of course.units) {
      assert.ok(u.lessons.length > 0, `school ${u.n} has lessons`);
      assert.equal(new Set(u.lessons.map((l) => norm(l.title))).size, u.lessons.length, `school ${u.n} has no duplicate lesson titles`);
    }
  });

  test(`${name}: the course lists exactly the notes files that exist`, async () => {
    const files = (await readdir(new URL(`../kit/courses/${dir}/notes/`, import.meta.url))).filter((f) => /^u\d\d\.js$/.test(f)).map((f) => f.slice(0, 3)).sort();
    assert.deepEqual([...course.written].sort(), files);
  });

  test(`${name}: every written lesson has notes, flashcards and explained check questions`, async () => {
    for (const id of course.written) {
      const u = course.units.find((x) => x.id === id), parsed = parseNotes(await course.notes(id));
      const titles = new Set(parsed.map((p) => norm(p.title)));
      for (const p of parsed) assert.ok(u.lessons.some((l) => norm(l.title) === norm(p.title)), `${id}: "${p.title}" isn't in the syllabus`);
      for (const l of u.lessons) {
        assert.ok(titles.has(norm(l.title)), `${id}: no notes for "${l.title}"`);
        const L = parsed.find((p) => norm(p.title) === norm(l.title));
        assert.ok(L.lead.length > 60, `${l.title}: lead`);
        assert.ok(L.blocks.length >= 4, `${l.title}: too few blocks`);
        assert.ok(L.cards.length >= 2, `${l.title}: flashcards`);
        assert.ok(L.mcq.length >= 2, `${l.title}: check questions`);
        for (const m of L.mcq) {
          assert.ok(m.wrong.length >= 2 && !m.wrong.includes(m.right), `${l.title}: "${m.q}"`);
          assert.ok(m.why.length > 20, `${l.title}: "${m.q}" explains its answer`);
        }
      }
    }
  });

  test(`${name}: the course says what it is not, on every page`, () => {
    assert.equal(course.unitWord, "School");
    assert.ok(course.notice && course.notice.length > 100);
  });
}

test("law: SQE1 is split into FLK1 and FLK2, and SQE2 and the Bar have their own pathways", () => {
  const ids = law.paths.map((p) => p.id);
  for (const id of ["llb", "gdl", "sqe1-flk1", "sqe1-flk2", "sqe2", "bar", "uk"]) assert.ok(ids.includes(id), id);
  const title = (n) => law.units.find((u) => u.n === n).title;
  const flk1 = law.paths.find((p) => p.id === "sqe1-flk1").units.map(title), flk2 = law.paths.find((p) => p.id === "sqe1-flk2").units.map(title);
  for (const t of ["Contract Law", "Tort Law", "Business Law and Practice", "Dispute Resolution and Civil Litigation", "Constitutional and Administrative Law", "Legal Ethics and Professional Conduct"]) assert.ok(flk1.includes(t), `FLK1 has ${t}`);
  for (const t of ["Land Law", "Property Law and Practice", "Equity and Trusts", "Wills, Probate and Administration of Estates", "Criminal Law", "Criminal Law and Practice", "Legal Ethics and Professional Conduct"]) assert.ok(flk2.includes(t), `FLK2 has ${t}`);
});

test("law: the notice says it isn't a qualification or advice, and names the jurisdiction", () => {
  assert.match(law.notice, /not legal advice/i);
  assert.match(law.notice, /not a legal qualification/i);
  assert.match(law.notice, /England and Wales/);
  assert.match(law.notice, /Scotland and Northern Ireland/);
});

test("nursing: the notice says it doesn't register, replace placements or certify competence", () => {
  assert.match(nursing.notice, /NMC registration/);
  assert.match(nursing.notice, /placements/);
  assert.match(nursing.notice, /competence/);
  assert.match(nursing.notice, /local policies/);
});
