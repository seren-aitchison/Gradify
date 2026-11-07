// Every IX: line in every course's notes names a lab that exists, and every MathGradify lesson that a lab names
// places that lab in its notes (the guided integration), so new links can't silently fall back to the end box.
import test from "node:test";
import assert from "node:assert/strict";
import { labCoverage } from "../scripts/lab-coverage.mjs";

const rows = await labCoverage();

test("no lesson in any course embeds an unknown lab", () => {
  for (const r of rows) assert.deepEqual(r.unknown, [], r.name);
});

test("every MathGradify lesson linked to a lab places it in the notes", () => {
  const m = rows.find((r) => r.slug === "maths");
  assert.ok(m.placed >= 83, `only ${m.placed} maths lessons place a lab`);
  assert.deepEqual(m.notPlaced, []);
});
