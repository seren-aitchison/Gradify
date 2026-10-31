// The curriculum QA rules (docs/CURRICULUM_QA.md) as tests: every written school has a QA record, no
// school counts as ready without every stage recorded, and the hard content checks pass.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

for (const slug of ["law", "nursing"]) {
  test(`${slug}: every written school has a QA record, and only written schools do`, async () => {
    const course = (await import(`../kit/courses/${slug}/course.js`)).default;
    const { QA } = await import(`../kit/courses/${slug}/qa.js`);
    assert.deepEqual(Object.keys(QA).sort(), [...course.written].sort());
    assert.equal(course.qa, QA, "the course passes its QA record to the engine");
  });

  test(`${slug}: QA stages are recorded honestly`, async () => {
    const { QA } = await import(`../kit/courses/${slug}/qa.js`);
    for (const [id, q] of Object.entries(QA)) {
      for (const stage of ["reviewed", "sources", "signoff"]) {
        const v = q[stage];
        if (v === null) continue;
        assert.match(v.date, /^\d{4}-\d{2}-\d{2}$/, `${id}.${stage} has a date`);
        assert.ok(v.by && v.by.length > 3, `${id}.${stage} says who`);
      }
      if (q.sources) assert.ok(q.reviewed, `${id}: sources can't be verified before the content review`);
      if (q.signoff) assert.ok(q.reviewed && q.sources, `${id}: expert sign-off needs review and source verification first`);
      if (q.reviewed) assert.ok(Array.isArray(q.reviewed.findings) && Array.isArray(q.reviewed.open), `${id}: review records findings and open items`);
      if (q.signoff) assert.equal(q.reviewed.open.length, 0, `${id}: no open review items at sign-off`);
    }
  });
}

test("the hard curriculum checks pass (npm run qa)", async () => {
  await promisify(execFile)("node", ["scripts/qa-courses.mjs"], { cwd: new URL("..", import.meta.url) });
});
