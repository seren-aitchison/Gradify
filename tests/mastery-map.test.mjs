// The Gradify Mastery System: chapter prerequisites for every course, chapter mastery levels from evidence, the
// mastery map, the course world on the subject Earth maps, and the topic quest.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { CHAPTER_PREREQS, chapterPrereqsFromConcepts } from "../kit/learning/chapter-map.js";
import { chapterLevel, masteryMap, layersOf, checkPrereqs, LEVEL } from "../kit/learning/mastery-map.js";
import { courseWorld } from "../kit/earth/subject-map.js";
import { topicQuest, TOPIC_STEPS } from "../kit/game/quests.js";

const idx = JSON.parse(readFileSync(new URL("../kit/data/search-index.json", import.meta.url), "utf8"));

test("every course has a chapter map: real chapters, no self-links, no cycles", async () => {
  for (const c of idx.courses) {
    const ns = c.units.map((u) => u[1]);
    assert.ok(c.cp, `${c.s} has chapter prerequisites in the index`);
    assert.deepEqual(checkPrereqs(ns, c.cp), [], `${c.s}: ${checkPrereqs(ns, c.cp).join("; ")}`);
    if (!CHAPTER_PREREQS[c.s]) assert.ok(c.pre, `${c.s} is neither authored nor derived from a concept graph`);
  }
  // only direct links are authored: no chapter lists a prerequisite another of its prerequisites already covers
  for (const [slug, pre] of Object.entries(CHAPTER_PREREQS)) {
    const reach = (n, seen = new Set()) => { for (const p of pre[n] || []) if (!seen.has(p)) { seen.add(p); reach(p, seen); } return seen; };
    for (const [n, ps] of Object.entries(pre)) for (const p of ps) assert.ok(!ps.some((q) => q !== p && reach(q).has(p)), `${slug} ${n} lists ${p}, already under another prerequisite`);
  }
});

test("a concept graph becomes direct chapter links, and modules that build on each other don't make a cycle", () => {
  const units = [{ id: "u01", n: 1 }, { id: "u02", n: 2 }, { id: "u03", n: 3 }];
  const pre = chapterPrereqsFromConcepts(units, { modules: { "u02/B": ["u01/A"], "u03/C": ["u02/B", "u01/A"], "u01/A2": ["u02/B"] } });
  assert.deepEqual(pre, { 2: [1], 3: [2] });
});

test("chapter levels come only from evidence", () => {
  assert.equal(chapterLevel(["new", "new"]).level, "none");
  assert.equal(chapterLevel(["started", "new"]).level, "learning", "opening a lesson is Learning at most");
  assert.equal(chapterLevel(["learned", "learned"]).level, "learning", "completed but never answered: not yet Practising");
  assert.equal(chapterLevel(["practised", "new"]).level, "practising");
  assert.equal(chapterLevel(["practised", "learned"]).level, "proficient");
  assert.equal(chapterLevel(["practised", "revise"]).level, "practising", "slipping answers block Proficient");
  assert.equal(chapterLevel(["mastered", "mastered", "mastered", "mastered", "practised"]).level, "mastered");
  assert.equal(chapterLevel(["revise"]).revise, 1);
});

test("the map: layers from foundations, what's within reach, what's holding the most back", () => {
  const chapters = [1, 2, 3, 4, 5].map((n) => ({ n, id: `u0${n}`, title: `C${n}`, lessons: [`l${n}`] }));
  const pre = { 2: [1], 3: [2], 4: [1], 5: [3, 4] };
  assert.deepEqual([...layersOf([1, 2, 3, 4, 5], pre)], [[1, 0], [2, 1], [3, 2], [4, 1], [5, 3]]);
  const st = { l1: "mastered", l2: "practised", l3: "started", l4: "revise", l5: "new" };
  const m = masteryMap(chapters, pre, (id) => st[id]);
  assert.equal(m.nodes.find((x) => x.n === 1).level, "mastered");
  assert.equal(m.nodes.find((x) => x.n === 2).level, "proficient", "one lesson, done and answered right: proficient");
  assert.deepEqual(m.nextUp.map((x) => x.n), [4, 3], "within reach: not yet proficient, foundations at least being practised (5's foundation 3 is only Learning)");
  assert.equal(m.holding[0].n, 4, "slipping answers come first");
  assert.equal(m.holding[0].unlocks, 1);
  assert.equal(m.summary.mastered, 1); assert.equal(m.summary.revise, 1);
  assert.deepEqual(m.edges.map((e) => `${e.from}>${e.to}`), ["1>2", "2>3", "1>4", "3>5", "4>5"]);
});

test("the course world: regions are stages, places are chapters, and regions brighten as chapters are mastered", () => {
  const chem = idx.courses.find((c) => c.s === "chemistry");
  const fresh = courseWorld(chem, null);
  assert.equal(fresh.places.length, chem.units.length);
  assert.ok(fresh.regions.length >= 1 && fresh.regions.length <= 6);
  assert.ok(fresh.places.every((p) => p.state === "new"), "nothing studied: every place unexplored");
  assert.ok(fresh.regions.every((r) => r.light === 0));
  const S = { done: {}, attempts: [] };
  const first = chem.units[0][3].map((l) => l[0]);
  first.forEach((id, i) => { S.done[id] = 1; for (let q = 0; q < 3; q++) S.attempts.push({ lesson: id, question: { id: `${id}-${q}`, type: "sba" }, score: 1, at: new Date(1e12 + i * 10 + q).toISOString() }); });
  const grown = courseWorld(chem, S);
  assert.equal(grown.places.find((p) => p.n === 1).state, "mastered", "a mastered chapter becomes a landmark");
  assert.ok(grown.regions[0].light > 0, "its region glows");
});

test("the topic quest pays only for learning evidence in that topic, today", () => {
  const now = Date.parse("2026-11-19T12:00:00Z"), day = "2026-11-19";
  const units = [{ id: "u01", title: "Atoms", lessons: [{ id: "u01-01", module: "Structure" }, { id: "u01-02", module: "Structure" }, { id: "u01-03", module: "Bonding" }] }];
  const S = { done: { "u01-01": now - 2 * 864e5 } };
  const courses = [{ slug: "chemistry", units, S }];
  const at = (lesson, type, score) => ({ course: "chemistry", lesson, question: { type }, score, correct: score >= 0.6 });
  const x = (attemptsToday) => ({ day, open: [{ id: "u01-02", module: "Structure", course: "chemistry" }], attemptsToday });
  const none = topicQuest(x([]), courses);
  assert.equal(none.topic, "Structure"); assert.deepEqual(none.lessons, ["u01-01", "u01-02"]);
  assert.deepEqual(none.steps.map((s) => s.n), [0, 0, 0], "a lesson finished on another day doesn't count today");
  courses[0].S.done["u01-01"] = Date.parse(`${day}T09:00:00`);
  const busy = topicQuest(x([...Array(10)].map(() => at("u01-02", "card", 1)).concat([...Array(5)].map(() => at("u01-01", "sba", 0.9)), [at("u01-03", "sba", 1)])), courses);
  assert.deepEqual(busy.steps.map((s) => s.n >= (s.of || 1)), [true, true, true]);
  const shaky = topicQuest(x([...Array(6)].map(() => at("u01-02", "sba", 0.5))), courses);
  assert.ok(shaky.steps[2].n < TOPIC_STEPS[2].of, "Apply needs 80%, not just answers");
  assert.equal(busy.xp, TOPIC_STEPS.reduce((t, s) => t + s.xp, 0));
  void LEVEL;
});
