// The curriculum registry (scripts/curriculum-registry.mjs): permanent question ids are in the source,
// unique and never reused, and recorded versions match the content, so an edit can't be committed
// without its version increasing (run npm run qa before committing).
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { updateRegistry, scanQuestions } from "../scripts/curriculum-registry.mjs";
import law from "../kit/courses/law/course.js";
import nursing from "../kit/courses/nursing/course.js";

for (const [slug, course] of [["law", law], ["nursing", nursing]]) {
  test(`${slug}: every question in written notes has a permanent id, unique across the course`, async () => {
    const ids = [];
    for (const id of course.written) {
      const src = await readFile(new URL(`../kit/courses/${slug}/notes/${id}.js`, import.meta.url), "utf8");
      for (const q of scanQuestions(src)) { assert.ok(q.id, `${id} "${q.body.slice(0, 50)}" has no id: run npm run qa`); ids.push(q.id); }
    }
    assert.equal(new Set(ids).size, ids.length, "no duplicate question ids");
    assert.ok(ids.every((x) => x.startsWith(`${slug}-`)), "ids carry the course prefix, so they are unique across Gradify");
  });

  test(`${slug}: the registry is up to date: no unrecorded edits, new questions or deletions`, async () => {
    const { log } = await updateRegistry(slug, course, { write: false });
    assert.deepEqual(log, [], "run npm run qa: the notes have changed since the registry was updated");
  });

  test(`${slug}: retired question ids never reappear, and every live question is versioned`, async () => {
    const { QUESTIONS, RETIRED_QUESTIONS, LESSONS } = await import(`../kit/courses/${slug}/registry.js`);
    for (const id of Object.keys(RETIRED_QUESTIONS)) assert.ok(!QUESTIONS[id], `${id} is retired`);
    for (const [id, q] of Object.entries(QUESTIONS)) assert.ok(q.v >= 1 && q.hash && q.lesson, id);
    for (const u of course.units.filter((x) => course.written.includes(x.id))) for (const l of u.lessons) assert.ok(LESSONS[l.id]?.v >= 1, `${l.id} has a version`);
  });
}
