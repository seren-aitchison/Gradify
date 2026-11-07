// Every site's release status must be justified by what it contains (scripts/audit-sites.mjs), so a polished
// homepage can never make a site "live" by itself.
import { test } from "node:test";
import assert from "node:assert/strict";
import { inventory, statusProblems } from "../scripts/audit-sites.mjs";

test("every site has a release status consistent with its content", async () => {
  const { rows } = await inventory();
  assert.equal(rows.length, 32);
  assert.deepEqual(statusProblems(rows), []);
});
test("a site with no written course can't be live", () => {
  assert.equal(statusProblems([{ name: "X", status: "live", written: 0, courses: [], tools: [] }]).length, 1);
});
test("a site with a studiable course can't stay coming soon", () => {
  assert.equal(statusProblems([{ name: "X", status: "soon", written: 120, courses: ["X"], tools: [] }]).length, 1);
  assert.equal(statusProblems([{ name: "X", status: "soon", written: 40, courses: ["X"], tools: [] }]).length, 0);
});
