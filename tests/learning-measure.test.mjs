// scripts/learning-audit/measure.mjs: the before/after analysis on known numbers
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { wilson, analyseDiagrams, analyseQuestions, pilotLessons, diagramSql } from "../scripts/learning-audit/measure.mjs";

test("Wilson interval brackets the rate and narrows with n", () => {
  const [a, b] = wilson(50, 100), [c, d] = wilson(500, 1000);
  assert.ok(a < 0.5 && b > 0.5 && d - c < b - a);
  assert.deepEqual(wilson(0, 0), [0, 1]);
});

test("difference in differences counts only questions seen at the same version in both periods", () => {
  const pilots = { chemistry: new Set(["u13-10"]) };
  const rows = [
    { subject: "chemistry", lesson_id: "u13-10", question_id: "q1", question_version: 1, period: "before", n: 100, k: 50 },
    { subject: "chemistry", lesson_id: "u13-10", question_id: "q1", question_version: 1, period: "after", n: 100, k: 70 },
    // rewritten in between: version 2 only after, so ignored
    { subject: "chemistry", lesson_id: "u13-10", question_id: "q2", question_version: 2, period: "after", n: 100, k: 0 },
    { subject: "chemistry", lesson_id: "u01-01", question_id: "q9", question_version: 1, period: "before", n: 100, k: 60 },
    { subject: "chemistry", lesson_id: "u01-01", question_id: "q9", question_version: 1, period: "after", n: 100, k: 65 },
  ];
  const a = analyseDiagrams(rows, pilots);
  assert.equal(a.pilot.after.n, 100);
  assert.ok(Math.abs(a.did - 0.15) < 1e-9); // (0.70 − 0.50) − (0.65 − 0.60)
  assert.equal(a.enough, false);
});

test("question analysis compares the old version with the new one", () => {
  const rows = [
    { subject: "biology", question_id: "q1", question_version: 1, period: "before", n: 200, k: 180 },
    { subject: "biology", question_id: "q1", question_version: 2, period: "after", n: 150, k: 90 },
    { subject: "biology", question_id: "q2", question_version: 1, period: "before", n: 50, k: 25 },
    { subject: "biology", question_id: "q2", question_version: 1, period: "after", n: 50, k: 26 },
  ];
  const a = analyseQuestions(rows);
  assert.equal(a.changed.length, 1);
  assert.deepEqual([a.old.k / a.old.n, a.new.k / a.new.n], [0.9, 0.6]);
});

test("approved diagrams map to their lesson ids, and the SQL only names known subjects", async () => {
  const manifest = JSON.parse(readFileSync(new URL("../kit/diagrams/manifest.json", import.meta.url), "utf8"));
  const p = await pilotLessons(manifest);
  assert.ok(p.chemistry.has("u13-10") && p.law.has("u04-03") && p.physics.has("u04-12"));
  assert.match(diagramSql(["chemistry", "x'; drop table y; --"], "2026-11-21", 28), /'chemistry','xdroptabley'/);
});
