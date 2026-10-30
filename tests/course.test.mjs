import { test } from "node:test";
import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import { parseNotes, norm } from "../kit/course/notes.js";
import { levelOf } from "../kit/course/course.js";
import physics from "../kit/courses/physics/course.js";
import { UNITS, TRACKS, PATHS } from "../kit/courses/physics/syllabus.js";

test("the physics syllabus has all 54 units, each in exactly one track", () => {
  assert.equal(UNITS.length, 54);
  assert.deepEqual(UNITS.map((u) => u.n), Array.from({ length: 54 }, (_, i) => i + 1));
  const inTracks = TRACKS.flatMap((t) => t.units).sort((a, b) => a - b);
  assert.deepEqual(inTracks, UNITS.map((u) => u.n));
  for (const p of PATHS) for (const n of p.units) assert.ok(UNITS.some((u) => u.n === n), `${p.id} names unit ${n}`);
});

test("physics lists exactly the notes files that exist", async () => {
  const files = (await readdir(new URL("../kit/courses/physics/notes/", import.meta.url))).filter((f) => /^u\d\d\.js$/.test(f)).map((f) => f.slice(0, 3)).sort();
  assert.deepEqual([...physics.written].sort(), files);
});

test("every written physics lesson has notes, flashcards and check questions", async () => {
  for (const id of physics.written) {
    const u = UNITS.find((x) => x.id === id), parsed = parseNotes(await physics.notes(id));
    const titles = new Set(parsed.map((p) => norm(p.title)));
    for (const p of parsed) assert.ok(u.lessons.some((l) => norm(l.title) === norm(p.title)), `${id}: "${p.title}" isn't in the syllabus`);
    for (const l of u.lessons) {
      assert.ok(titles.has(norm(l.title)), `${id}: no notes for "${l.title}"`);
      const L = parsed.find((p) => norm(p.title) === norm(l.title));
      assert.ok(L.lead.length > 60, `${l.title}: lead`);
      assert.ok(L.blocks.length >= 4, `${l.title}: too few blocks`);
      assert.ok(L.cards.length >= 2, `${l.title}: flashcards`);
      assert.ok(L.mcq.length >= 2, `${l.title}: check questions`);
      for (const m of L.mcq) assert.ok(m.wrong.length >= 2 && !m.wrong.includes(m.right), `${l.title}: "${m.q}"`);
    }
  }
});

test("levels get further apart", () => {
  assert.equal(levelOf(0).n, 1);
  assert.equal(levelOf(99).n, 1);
  assert.equal(levelOf(100).n, 2);
  assert.equal(levelOf(300).n, 3);
  assert.ok(levelOf(10000).to - levelOf(10000).from > levelOf(500).to - levelOf(500).from);
});
