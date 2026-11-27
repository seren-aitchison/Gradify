// What search looks through (kit/search/sources.js): Gradify's courses, lessons, questions and flashcards, the
// curriculum, and the learner's own things, as documents for the engine. And the real index, end to end.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { docsFromIndex, docsFromSpecs, docsFromLearner, docsFromApp, docsFromQualifications, applyPlaces, levelOf, courseQuals } from "../kit/search/sources.js";
import { buildIndex, combine, search } from "../kit/search/engine.js";
import { parseQuery } from "../kit/search/query.js";
import { BODIES, QUAL_TYPES } from "../kit/curriculum/uk.js";

const read = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), "utf8"));

test("a lesson's level line gives its qualification and how demanding it is", () => {
  assert.deepEqual(levelOf("GCSE and A level · Application"), { qual: ["gcse", "a-level"], difficulty: 2 });
  assert.deepEqual(levelOf("Year 1 · Foundation"), { qual: ["university"], difficulty: 1 });
  assert.deepEqual(levelOf("Intermediate · Evaluation"), { qual: [], difficulty: 3 });
  assert.deepEqual(levelOf(""), { qual: [], difficulty: null });
  assert.deepEqual(courseQuals("maths"), ["gcse", "a-level", "university"]);
});

const IDX = { courses: [{ s: "chemistry", n: "Chemistry", site: "SciGradify", u: "/scigradify/chemistry/", U: "School", T: [], units: [["u08", 8, "Chemical Equilibrium", [["u08-01", "Dynamic equilibrium", 0], ["u08-02", "Equilibrium constants", 0]], ["Equilibrium"], 0, "Reversible reactions"]] }] };
const LESSONS = { courses: [["chemistry", "Chemistry", "SciGradify", "/scigradify/chemistry/", "#f59e0b"]], lessons: [[0, "u08", "u08-01", "Dynamic equilibrium", "Equilibrium", "Chemical Equilibrium", "Reversible reaction|Closed system", "What equilibrium means|Rates", 5, "Year 1 · Application", 8], [0, "u08", "u08-02", "Equilibrium constants", "Equilibrium", "Chemical Equilibrium", "Kc", "Writing Kc", 0, "Year 1 · Evaluation", 6]] };

test("courses, units, modules and lessons, with their practice questions, course flashcards and unit quiz", () => {
  const docs = docsFromIndex(IDX, { lessons: LESSONS, states: { chemistry: { done: { "u08-01": true } } } });
  const of = (t) => docs.filter((d) => d.type === t);
  assert.deepEqual(of("lesson").map((d) => [d.id, d.done, d.difficulty]), [["lesson:/scigradify/chemistry/u08-01", true, 2], ["lesson:/scigradify/chemistry/u08-02", false, 3]]);
  const l = of("lesson")[0];
  assert.deepEqual(l.crumbs.map((c) => c.label), ["SciGradify", "Chemistry", "School 8", "Equilibrium"]);
  assert.deepEqual(l.terms, ["Reversible reaction", "Closed system"]);
  assert.equal(l.href, "/scigradify/chemistry/#/lesson/u08-01");
  // only the lesson with questions has a question set; the unit's quiz and flashcards count every lesson's
  assert.deepEqual(of("question").map((d) => [d.title, d.countLabel]), [["Dynamic equilibrium", "5 questions"], ["School 8 quiz: Chemical Equilibrium", "drawn from 5 questions"]]);
  assert.deepEqual(of("pack").map((d) => [d.title, d.countLabel, d.href]), [["Chemical Equilibrium", "14 cards", "/scigradify/chemistry/#/review/u08"]]);
  assert.deepEqual(of("course")[0].status, ["in-progress"]);
  assert.deepEqual(of("topic").map((d) => d.title), ["Chemical Equilibrium", "Equilibrium"]);
  // without the lesson index there are still lessons, by title
  assert.equal(docsFromIndex(IDX).filter((d) => d.type === "lesson").length, 2);
});

test("the curriculum: each specification and its sections, with its board and qualification", () => {
  const index = read("kit/curriculum/specs/aqa-gcse-chemistry.json");
  const docs = docsFromSpecs([{ index, id: "aqa-gcse-chemistry", body: "aqa", qual: "gcse", course: "chemistry", href: "/app.html#/curriculum" }]);
  assert.equal(docs.length, index.sections.length + 1);
  const sec = docs.find((d) => d.id === "spec:aqa-gcse-chemistry/4.6.2");
  assert.equal(sec.title, "4.6.2 Reversible reactions and dynamic equilibrium");
  assert.deepEqual([sec.board, sec.qual, sec.course], [["aqa"], ["gcse"], "chemistry"]);
  assert.match(sec.crumbs[1].label, /^4\.6 /);
  const q = docsFromQualifications({ quals: QUAL_TYPES, bodies: BODIES });
  assert.ok(q.some((d) => d.title === "A level" && d.qual[0] === "a-level"));
  assert.ok(q.some((d) => d.title === "Pearson Edexcel" && d.board[0] === "edexcel"));
});

test("the learner's own things: sets with their cards, notes, quick notes, maps, collections and plan blocks", () => {
  const kb = { rems: { d1: { id: "d1", doc: true, text: "Equilibrium revision", kids: ["b1"], parent: "f1" }, b1: { id: "b1", text: "Le Chatelier: oppose the change", kids: [] }, f1: { id: "f1", folder: true, text: "Chemistry", kids: ["d1"] } } };
  const docs = docsFromLearner({
    app: "app.html",
    documents: [{ id: "p1", title: "Chemical equilibrium", created_at: "2026-11-20T10:00:00Z" }],
    cards: [{ document_id: "p1", front: "What is Kc?", back: "The equilibrium constant", topic: "Equilibrium" }, { document_id: "p1", front: "Le Chatelier?", back: "Oppose the change" }],
    jots: [{ id: "j1", text: "Ask about Kp\nin the lecture", tag: "question", created: 1, updated: 2 }],
    maps: [{ id: "m1", title: "Le Chatelier's principle", updated: 3 }],
    kb, collections: [{ id: "c1", name: "Mock week", t: 4 }], items: [{ cid: "c1", rid: "pack:p1", title: "Chemical equilibrium", r: { rid: "pack:p1" } }],
    folderOf: new Map([["pack:p1", ["c1"]]]), names: new Map([["c1", "Mock week"]]), pins: [{ href: "app.html#/tools/map/m1" }],
    blocks: [{ id: 7, day: "2026-11-27", start_min: 9 * 60, end_min: 570, title: "Revise equilibrium", done: false }],
  });
  const by = Object.fromEntries(docs.map((d) => [d.id, d]));
  assert.equal(by["pack:p1"].countLabel, "2 cards");
  assert.match(by["pack:p1"].body, /What is Kc\?/);
  assert.deepEqual(by["pack:p1"].status, ["saved"]); assert.deepEqual(by["pack:p1"].folders, ["c1"]);
  assert.equal(by["jot:j1"].title, "Ask about Kp"); assert.ok(by["jot:j1"].status.includes("draft"));
  assert.deepEqual(by["map:m1"].status, ["pinned"]);
  assert.deepEqual(by["note:d1"].crumbs.map((c) => c.label), ["Notes", "Chemistry"]);
  assert.match(by["note:d1"].body, /oppose the change/);
  assert.equal(by["collection:c1"].countLabel, "1 item");
  assert.deepEqual(by["block:7"].status, ["scheduled"]);
  // a concept is found across them: the set (by a card), the note (by its text) and the map (by its title)
  const r = search(buildIndex(docs), parseQuery("chatelier"));
  assert.deepEqual(r.groups.map((g) => g.title), ["Flashcards", "Notes", "Mind maps"]);
  assert.deepEqual(search(buildIndex(docs), parseQuery("in:folder:Mock")).hits.map((h) => h.id), ["pack:p1"]);
});

test("pins, collections and schedules mark Gradify's own lessons too", () => {
  const docs = applyPlaces(docsFromIndex(IDX), { pins: [{ href: "/scigradify/chemistry/#/lesson/u08-02" }], folderOf: new Map([["lesson:/scigradify/chemistry/u08-02", ["c1"]]]), scheduled: new Map([["lesson:/scigradify/chemistry/u08-02", [{ id: 1 }]]]) });
  assert.deepEqual(docs.find((d) => d.lesson === "u08-02" && d.type === "lesson").status, ["pinned", "saved", "scheduled"]);
  const app = docsFromApp({ screens: [{ route: "plan", label: "Smart Plan", sectionLabel: "Plan" }], actions: [{ t: "Create flashcards", k: "From your notes", href: "#/new", words: "make add" }] });
  assert.deepEqual(app.map((d) => [d.type, d.title]), [["screen", "Smart Plan"], ["action", "Create flashcards"]]);
  assert.ok(search(buildIndex(app), parseQuery("make flashcards")).hits.some((h) => h.type === "action"));
});

test("end to end on Gradify's real content: 'equilibrium' is grouped, ranked and quick", () => {
  const idx = read("kit/data/search-index.json"), lessons = read("kit/api/v1/lessons.json");
  const specs = ["aqa-gcse-biology", "aqa-gcse-chemistry"].map((id) => ({ index: read(`kit/curriculum/specs/${id}.json`), id, body: "aqa", qual: "gcse", course: id.split("-").pop(), href: "/app.html#/curriculum" }));
  const ix = combine(buildIndex(docsFromIndex(idx, { lessons })), buildIndex(docsFromSpecs(specs)));
  const t = performance.now(), r = search(ix, parseQuery("equilibrium"), { context: { course: "chemistry" } }), ms = performance.now() - t;
  assert.deepEqual(r.groups.slice(0, 4).map((g) => g.title), ["Lessons", "Flashcards", "Questions", "Curriculum"]);
  assert.ok(r.groups[0].items.every((h) => h.course === "chemistry"), "in Chemistry, Chemistry's lessons first");
  assert.ok(r.groups.find((g) => g.type === "curriculum").items.some((h) => /AQA GCSE Chemistry/.test(h.sub)));
  assert.ok(ms < 400, `${Math.round(ms)} ms`);
  // and a lesson is found by a key term that isn't in its title
  const kc = search(ix, parseQuery("le chatelier"));
  assert.ok(kc.hits.some((h) => h.type === "lesson"));
});

test("progress is put onto documents built earlier: lessons, their questions, units and courses", async () => {
  const { applyProgress } = await import("../kit/search/sources.js");
  const docs = docsFromIndex(IDX, { lessons: LESSONS });
  applyProgress(docs, { chemistry: { done: { "u08-01": true, "u08-02": true } } });
  assert.ok(docs.filter((d) => d.type === "lesson").every((d) => d.done && d.status.includes("completed")));
  assert.equal(docs.find((d) => d.type === "course").done, true);
  applyProgress(docs, { chemistry: { done: { "u08-01": true } } });
  assert.equal(docs.find((d) => d.lesson === "u08-02" && d.type === "lesson").done, false);
  assert.deepEqual(docs.find((d) => d.type === "course").status, ["in-progress"]);
  assert.equal(docs.find((d) => d.id === "qset:/scigradify/chemistry/u08-01").done, true);
});
