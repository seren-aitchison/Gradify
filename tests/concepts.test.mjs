// The shared concept graph engine (kit/learning/concepts.js), on a small invented course and on MathGradify's graph.
import { test } from "node:test";
import assert from "node:assert/strict";
import { conceptGraph, validateGraph, ancestors, descendants, prerequisitesOfLesson, weakPrerequisites, learningPath, graphStats } from "../kit/learning/concepts.js";

const units = [
  { id: "a", n: 1, title: "Basics", lessons: [{ id: "a1", module: "Numbers" }, { id: "a2", module: "Numbers" }, { id: "a3", module: "Shapes" }] },
  { id: "b", n: 2, title: "Middle", lessons: [{ id: "b1", module: "Equations" }, { id: "b2", module: "Graphs" }] },
  { id: "c", n: 3, title: "Top", lessons: [{ id: "c1", module: "Calculus" }] },
];
const spec = { modules: { "b/Equations": ["a/Numbers"], "b/Graphs": ["b/Equations", "a/Shapes"], "c/Calculus": ["b"] }, lessons: { c1: ["a2"] } };

test("builds module nodes, expands a bare unit id, and resolves lesson-level links", () => {
  const g = conceptGraph(units, spec);
  assert.equal(g.nodes.size, 5);
  assert.deepEqual([...g.prereq.get("c/Calculus")].sort(), ["b/Equations", "b/Graphs"]);
  assert.deepEqual(prerequisitesOfLesson(g, "a2"), { lessons: [], earlier: ["a1"], modules: [] });
  assert.deepEqual(prerequisitesOfLesson(g, "c1").lessons, ["a2"]);
  assert.deepEqual(validateGraph(g), { unknown: [], cycles: [], forward: [], isolated: [] });
  assert.equal(graphStats(g).longestChain, 4);
});

test("validation finds unknown references, cycles and prerequisites taught later", () => {
  const g = conceptGraph(units, { modules: { "a/Numbers": ["b/Equations"], "b/Equations": ["a/Numbers"], "a/Shapes": ["z/Nothing"] }, lessons: { a1: ["nope"] } });
  const v = validateGraph(g);
  assert.deepEqual(v.unknown.sort(), ["nope", "z/Nothing"]);
  assert.equal(v.cycles.length, 1);
  assert.deepEqual(v.forward, [{ node: "a/Numbers", needs: "b/Equations" }]);
});

test("ancestors, descendants and a learning path that skips what's secure", () => {
  const g = conceptGraph(units, spec);
  assert.deepEqual(ancestors(g, "c/Calculus").map((x) => x.key).sort(), ["a/Numbers", "a/Shapes", "b/Equations", "b/Graphs"]);
  assert.deepEqual(descendants(g, "a/Numbers").sort(), ["b/Equations", "b/Graphs", "c/Calculus"]);
  assert.deepEqual(learningPath(g, "c/Calculus"), ["a/Numbers", "b/Equations", "a/Shapes", "b/Graphs", "c/Calculus"]);
  assert.deepEqual(learningPath(g, "c/Calculus", (n) => n.unit === "a"), ["b/Equations", "b/Graphs", "c/Calculus"]);
});

test("weakness detection reports only measured weaknesses, root causes first (deepest, then weakest)", () => {
  const g = conceptGraph(units, spec);
  const scores = { a1: 0.3, a2: 0.3, b1: 0.5, a3: 0.9 };            // b2 has no evidence
  const masteryOf = (ids) => { const v = ids.map((i) => scores[i]).filter((x) => x != null); return v.length ? v.reduce((a, b) => a + b) / v.length : null; };
  const weak = weakPrerequisites(g, "c1", masteryOf);
  assert.deepEqual(weak.map((w) => w.key), ["a/Numbers", "lesson:a2", "b/Equations"]);
  assert.equal(weak.some((w) => w.key === "b/Graphs" || w.key === "a/Shapes"), false);
  assert.deepEqual(weakPrerequisites(g, "c1", () => null), []);
});

test("MathGradify's graph: every reference resolves, no cycles, every module placed", async () => {
  const cfg = (await import("../kit/courses/maths/course.js")).default;
  const g = conceptGraph(cfg.units, cfg.concepts), v = validateGraph(g);
  assert.deepEqual(v.unknown, []);
  assert.deepEqual(v.cycles, []);
  assert.deepEqual(v.isolated, []);
  const s = graphStats(g);
  assert.ok(s.nodes >= 125 && s.edges >= 200, JSON.stringify(s));
  assert.equal(s.roots, 1);                                          // everything grows from School 1's number systems
  // spot checks of real dependencies
  assert.ok(ancestors(g, "u24/Deep learning").some((a) => a.key === "u07/Differentiation"));
  assert.ok(ancestors(g, "u13/Hypothesis testing").some((a) => a.key === "u12/Random variables"));
  assert.ok(descendants(g, "u03/Foundations").length > 100);
});
