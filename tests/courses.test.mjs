// LawGradify and NurseGradify courses: the same checks the physics course has (tests/course.test.mjs),
// plus the rules these two subjects add: law check questions are single-best-answer with an
// explanation; nursing courses carry their clinical-safety notice.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { parseNotes, norm } from "../kit/course/notes.js";
import law from "../kit/courses/law/course.js";
import nursing from "../kit/courses/nursing/course.js";
import { parseSyllabus } from "../kit/course/syllabus.js";

for (const [name, course, dir] of [["law", law, "law"], ["nursing", nursing, "nursing"]]) {
  test(`${name}: every permanent lesson id still exists with its recorded title, and every lesson has one`, async () => {
    const { IDS, RETIRED } = await import(`../kit/courses/${dir}/ids.js`);
    const byId = new Map(course.units.flatMap((u) => u.lessons.map((l) => [l.id, l])));
    for (const id of Object.keys(RETIRED)) {
      assert.ok(!byId.has(id), `${id} is retired and must never be used again`);
      assert.ok(!IDS[id], `${id} can't be both live and retired`);
      assert.ok(RETIRED[id].title && /^\d{4}-\d{2}-\d{2}$/.test(RETIRED[id].retired), `${id} records its title and retirement date`);
    }
    for (const [id, title] of Object.entries(IDS)) {
      assert.ok(byId.has(id), `${id} ("${title}") has disappeared: saved progress would be lost. Restore it, keep the id with a new title, or retire it in ids.js.`);
      assert.equal(norm(byId.get(id).title), norm(title), `${id} title changed: update ids.js deliberately if this is a rename`);
    }
    for (const id of byId.keys()) assert.ok(IDS[id], `${id} isn't in ids.js yet: run npm run qa to record it`);
    assert.equal(new Set(byId.keys()).size, byId.size, "no two lessons share an id");
  });

  test(`${name}: the mapping covers every school with real framework items and real modules`, () => {
    const items = new Set(Object.values(course.frameworks).flatMap((f) => f.items));
    for (const u of course.units) {
      const m = course.map[u.id]; assert.ok(m, `${u.id} is mapped`);
      const tags = (x) => Object.entries(x).filter(([k]) => course.frameworks[k]).flatMap(([, v]) => v);
      for (const t of tags(m)) assert.ok(items.has(t), `${u.id}: "${t}" is a framework item`);
      for (const [title, sub] of Object.entries(m.modules || {})) {
        assert.ok(u.modules.some((x) => x.title === title), `${u.id}: module "${title}" exists`);
        for (const t of tags(sub)) assert.ok(items.has(t), `${u.id} ${title}: "${t}" is a framework item`);
      }
    }
    for (const f of Object.values(course.frameworks)) assert.ok(f.name && f.owner && "verified" in f || f.items, "frameworks record their provenance");
  });

  test(`${name}: path module selections name real modules`, () => {
    for (const p of course.paths) for (const [n, titles] of Object.entries(p.select || {})) {
      const u = course.units.find((x) => x.n === Number(n)); assert.ok(u && p.units.includes(Number(n)), `${p.id} selects from school ${n}, which is on the path`);
      for (const t of titles) assert.ok(u.modules.some((m) => m.title === t), `${p.id}: school ${n} has module "${t}"`);
    }
  });

  test(`${name}: every lesson belongs to a named module`, () => {
    for (const u of course.units) {
      assert.ok(u.modules.length >= 1 && u.modules.every((m) => m.title && m.lessons.length), `school ${u.n} has named modules`);
      assert.equal(u.modules.reduce((a, m) => a + m.lessons.length, 0), u.lessons.length);
    }
  });

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
          assert.ok(m.why.length > 40, `${l.title}: "${m.q}" explains its answer`);
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

test("moving or inserting lessons never changes a locked id", () => {
  const lock = { "u01-01": "Alpha", "u01-02": "Beta", "u01-03": "Gamma" };
  const [u] = parseSyllabus("1. Test\n> One\n* Gamma\n* New topic\n> Two\n* Alpha\n* Beta", lock);
  const id = Object.fromEntries(u.lessons.map((l) => [l.title, l.id]));
  assert.deepEqual(id, { Gamma: "u01-03", "New topic": "u01-04", Alpha: "u01-01", Beta: "u01-02" });
  assert.deepEqual(u.modules.map((m) => [m.id, m.lessons]), [["u01:one", ["u01-03", "u01-04"]], ["u01:two", ["u01-01", "u01-02"]]]);
});

test("nursing: four distinct field pathways, each with the shared core and its own field school", () => {
  const fields = nursing.paths.filter((p) => p.field);
  assert.deepEqual(fields.map((p) => p.field).sort(), ["Adult", "Children's", "Learning disability", "Mental health"]);
  const fieldSchool = { Adult: 10, "Children's": 11, "Mental health": 12, "Learning disability": 13 };
  for (const p of fields) {
    for (const n of nursing.core) assert.ok(p.units.includes(n), `${p.field} includes core school ${n}`);
    assert.ok(p.units.includes(fieldSchool[p.field]), `${p.field} includes its field school`);
    for (const [f, n] of Object.entries(fieldSchool)) if (f !== p.field) assert.ok(!p.units.includes(n), `${p.field} doesn't include another field's school`);
  }
  const sig = new Set(fields.map((p) => JSON.stringify([p.units, p.select || {}])));
  assert.equal(sig.size, 4, "no two field pathways are the same");
});

test("retired ids are never reused, even for a lesson with the retired title", () => {
  const lock = { "u02-01": "Alpha", "u02-02": "Beta" }, retired = { "u02-03": { title: "Gamma", retired: "2026-10-31", reason: "merged" } };
  const [u] = parseSyllabus("2. Test\n> M\n* Alpha\n* Beta\n* Gamma\n* Delta", lock, retired);
  assert.deepEqual(u.lessons.map((l) => l.id), ["u02-01", "u02-02", "u02-04", "u02-05"]);
  assert.deepEqual(u.lessons.map((l) => l.position.order), [1, 2, 3, 4], "position is separate from the id");
});
