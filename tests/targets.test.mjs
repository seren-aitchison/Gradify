// Target my weaknesses (kit/learning/targets.js): weak spots come only from the learner's own evidence, foundations
// come before what rests on them, and the practice set suits the learner's level.
import test from "node:test";
import assert from "node:assert/strict";
import { weaknessTargets, practiceSet } from "../kit/learning/targets.js";
import { conceptGraph, ancestors } from "../kit/learning/concepts.js";

const maths = (await import("../kit/courses/maths/course.js")).default;
const graph = conceptGraph(maths.units, maths.concepts);
let n = 0;
const ans = (lesson, score, o = {}) => ({ schema: 1, id: `a${++n}`, at: new Date(Date.UTC(2026, 10, 1) + n * 6e4).toISOString(), site: "MathGradify", subject: "maths", context: "lesson",
  question: { id: `${lesson}#q${n}`, v: null, type: "mcq", d: 2, objectives: [] }, lesson, unit: lesson.split("-")[0], score, correct: score >= 0.7, attempt: 1,
  marking: { method: "auto", status: "final" }, ...o });
const now = Date.UTC(2026, 10, 2);

test("no evidence, no weaknesses: nothing is guessed", () => {
  assert.deepEqual(weaknessTargets([], { now }), []);
  assert.deepEqual(weaknessTargets([ans("u07-29", 0)], { now }), []);          // one slip isn't a weakness
  assert.deepEqual(weaknessTargets([ans("u07-29", 1), ans("u07-29", 1), ans("u07-29", 1)], { now }), []);
});

test("weak lessons are found and ranked by how weak they are", () => {
  const t = weaknessTargets([ans("u07-29", 0), ans("u07-29", 0), ans("u07-29", 1), ans("u03-21", 0), ans("u03-21", 1), ans("u03-21", 0), ans("u03-21", 1), ans("u01-16", 1), ans("u01-16", 1)], { now });
  assert.deepEqual(t.map((x) => x.lesson), ["u07-29", "u03-21"]);
  assert.ok(t[0].value < t[1].value);
  assert.match(t[0].why, /answers here were right/);
});

test("a weak foundation comes before the weak lesson that rests on it", () => {
  // Definite Integrals' module, and a lesson in a module it builds on
  const key = graph.lessonNode.get("u07-29"), up = ancestors(graph, key, { maxDepth: 1 })[0];
  assert.ok(up, "Definite Integrals has a prerequisite module in the maths concept map");
  const base = graph.nodes.get(up.key).lessons[0];
  const xs = [ans("u07-29", 0), ans("u07-29", 0), ans("u07-29", 1), ans(base, 0), ans(base, 0), ans(base, 1)];
  const t = weaknessTargets(xs, { graph, now });
  assert.equal(t[0].lesson, base); assert.equal(t[0].kind, "foundation"); assert.equal(t[0].for, "u07-29");
  assert.ok(t.some((x) => x.lesson === "u07-29"));
  // without the graph both are simply weak
  assert.ok(weaknessTargets(xs, { now }).every((x) => x.kind === "wrong" || x.kind === "weak"));
});

test("exploration and slipping: exploration never makes a weakness; a clear drop does", () => {
  const lab = (task, outcome) => ans("u12-19", outcome === "success" ? 1 : 0, { context: "practice", question: { id: `ix:lln:${task}`, type: "lab", d: 2 }, response: { outcome, via: "try" } });
  assert.deepEqual(weaknessTargets([lab("k1", "unsuccessful"), lab("k1", "unsuccessful"), lab("k1", "unsuccessful")], { exploration: maths.exploration, now }), []);
  const day = (d, s, i) => ans("u03-21", s, { at: new Date(Date.UTC(2026, 9, 1) + d * 864e5 + i * 6e4).toISOString(), question: { id: `log-${d}-${i}`, type: "mcq", d: 2 } });
  const xs = [...[0, 1, 2].flatMap((d) => [day(d, 1, 0), day(d, 1, 1)]), ...[30, 31, 32].flatMap((d) => [day(d, 0, 0), day(d, 1, 1), day(d, 0, 2)])];
  const t = weaknessTargets(xs, { now: Date.UTC(2026, 10, 5) });
  assert.ok(t.some((x) => x.lesson === "u03-21" && (x.kind === "slipping" || x.kind === "weak")));
});

test("practice set: wrong and unseen questions first, easier ones where the learner is weakest", () => {
  const items = { L1: [1, 2, 3, 1, 2].map((d, i) => ({ key: `L1#${i}`, Q: { d } })), L2: [3, 3, 2, 1].map((d, i) => ({ key: `L2#${i}`, Q: { d } })) };
  const attempts = [{ at: "2026-11-01T09:00:00Z", question: { id: "L1#2" }, score: 0 }, { at: "2026-11-01T09:01:00Z", question: { id: "L1#0" }, score: 1 }];
  const set = practiceSet([{ lesson: "L1", value: 0.2 }, { lesson: "L2", value: 0.55 }], items, attempts, { per: 2 });
  assert.equal(set[0].item.key, "L1#2");                                       // the one they got wrong comes first
  assert.equal(set[1].item.Q.d, 1); assert.notEqual(set[1].item.key, "L1#0");   // then an easy, unseen one
  assert.deepEqual(set.slice(2).map((x) => x.item.Q.d), [2, 3]);              // L2: level 2 suits 55%
  assert.equal(practiceSet([{ lesson: "none", value: 0.1 }], items, []).length, 0);
  assert.equal(practiceSet([{ lesson: "L1", value: 0.1 }, { lesson: "L2", value: 0.1 }], items, [], { per: 5, max: 6 }).length, 6);
});

test("the cross-course summary and Do next include measured weak spots, foundations first", async () => {
  const { courseSummary, recommend } = await import("../kit/learning/learner-data.js");
  const key = graph.lessonNode.get("u07-29"), base = graph.nodes.get(ancestors(graph, key, { maxDepth: 1 })[0].key).lessons[0];
  const S = { attempts: [ans("u07-29", 0), ans("u07-29", 0), ans("u07-29", 1), ans(base, 0), ans(base, 0), ans(base, 1)] };
  const c = courseSummary(maths, S, { now });
  assert.equal(c.weak[0].lesson, base); assert.equal(c.weak[0].for, "Definite Integrals");
  const r = recommend([c]).find((x) => /weak spot/.test(x.label));
  assert.ok(r && r.href.endsWith("#/review/weak") && /underpins Definite Integrals/.test(r.why), JSON.stringify(r));
  assert.deepEqual(courseSummary(maths, {}, { now }).weak, []);
});
