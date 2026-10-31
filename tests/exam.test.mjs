// Mock exams (kit/assess/exam.js): selection, marking, weak areas, and every configured exam is valid.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildExam, markExam, FORMATS } from "../kit/assess/exam.js";
import law from "../kit/courses/law/course.js";
import nursing from "../kit/courses/nursing/course.js";

const pool = [];
for (const g of ["a", "b", "c"]) for (let i = 0; i < 10; i++) pool.push({ id: `${g}${i}`, group: g, groupLabel: g.toUpperCase(), Q: { type: i % 2 ? "sba" : "multi", q: `${g}${i}`, right: i % 2 ? "R" : ["R1", "R2"], wrong: i % 2 ? ["w1", "w2", "w3", "w4"] : ["w1", "w2"], why: "because" } });
pool.push({ id: "s", group: "a", groupLabel: "A", Q: { type: "short", q: "explain", model: "m", points: ["p"] } });

test("exams pick the requested types, spread across areas, and never include unmarkable questions", () => {
  const sba = buildExam(pool, { count: 12, format: "sba" }, 3);
  assert.equal(sba.length, 12); assert.ok(sba.every((x) => x.Q.type === "sba"));
  const counts = Object.fromEntries(["a", "b", "c"].map((g) => [g, sba.filter((x) => x.group === g).length]));
  assert.deepEqual(counts, { a: 4, b: 4, c: 4 });
  const mixed = buildExam(pool, { count: 100, format: "mixed" }, 3);
  assert.equal(mixed.length, 30); assert.ok(!mixed.some((x) => x.Q.type === "short"));
  assert.deepEqual(buildExam(pool, { count: 9, format: "mixed" }, 7).map((x) => x.id), buildExam(pool, { count: 9, format: "mixed" }, 7).map((x) => x.id), "deterministic for a seed");
});

test("marking scores, finds weak areas weakest first, and counts unanswered questions as wrong", () => {
  const items = buildExam(pool, { count: 6, format: "sba" }, 1);
  const responses = items.map((x) => (x.group === "a" ? "w1" : x.group === "b" ? "R" : undefined));
  const r = markExam(items, responses, { pass: 0.6 });
  assert.equal(r.answered, 4); assert.equal(r.pass, false);
  assert.deepEqual(r.weak.map((g) => g.group).sort(), ["a", "c"]);
  assert.equal(r.groups.at(-1).group, "b");
});

for (const [name, course] of [["law", law], ["nursing", nursing]]) test(`${name}: every configured exam has a valid format, size, time and source`, () => {
  for (const e of course.exams) {
    assert.ok(FORMATS[e.format], `${e.id} format`); assert.ok(e.count > 0 && e.minutes > 0 && e.pass > 0 && e.pass < 1, `${e.id} numbers`);
    assert.ok(e.units?.every((n) => course.units.some((u) => u.n === n)) || course.paths.some((p) => p.id === e.path), `${e.id} draws from real schools or a path`);
  }
});
