// Search (kit/search): the query language, ranking, grouping, filters, recovery, autocomplete, history and finding
// inside a lesson. All pure: the sources and the screen are checked in the browser.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseQuery, queryString, activeFilters, without, chipsOf, parseWhen, words, typeOf } from "../kit/search/query.js";
import { buildIndex, search, suggest, stem, distance, correct, markTitle, snippet, findInSections, passes, related } from "../kit/search/engine.js";
import { addHistory, addSaved } from "../kit/search/memory.js";

const NOW = new Date(2026, 10, 26, 12).getTime(), DAY = 864e5;
const DOCS = [
  { id: "l1", type: "lesson", title: "Dynamic equilibrium", course: "chemistry", terms: ["Reversible reaction", "Closed system"], body: "At equilibrium the forward and backward rates are equal.", qual: ["a-level"], board: ["aqa"], done: true, difficulty: 2 },
  { id: "l2", type: "lesson", title: "Equilibrium constants", course: "chemistry", terms: ["Kc", "Equilibrium constant"], body: "Kc is the ratio of product to reactant concentrations.", qual: ["a-level"], board: ["aqa"], done: false, difficulty: 3 },
  { id: "l3", type: "lesson", title: "Rates of reaction", course: "chemistry", terms: ["Catalyst", "Activation energy"], body: "A catalyst speeds up a reaction without being used up.", qual: ["gcse"], board: ["ocr"], done: false },
  { id: "l4", type: "lesson", title: "Homeostasis", course: "biology", terms: ["Negative feedback"], body: "The body keeps a dynamic internal balance, close to an equilibrium.", qual: ["gcse"] },
  { id: "p1", type: "pack", title: "Chemical equilibrium", count: 24, countLabel: "24 cards", course: "chemistry", status: ["saved"], modified: NOW - 2 * DAY },
  { id: "q1", type: "question", title: "Equilibrium calculations", count: 18, countLabel: "18 questions", course: "chemistry", difficulty: 3 },
  { id: "n1", type: "note", title: "Equilibrium revision notes", body: "Le Chatelier's principle: a system shifts to oppose a change.", modified: NOW - 40 * DAY, status: ["draft"] },
  { id: "m1", type: "map", title: "Le Chatelier's principle", body: "Pressure, temperature, concentration", course: "chemistry", folders: ["c1"] },
  { id: "s1", type: "curriculum", title: "A-level Chemistry: equilibrium specification points", terms: ["3.1.6 Chemical equilibria, Le Chatelier's principle and Kc"], qual: ["a-level"], board: ["aqa"] },
  { id: "a1", type: "action", title: "Create a flashcard set", terms: ["new cards", "make flashcards"] },
  { id: "t1", type: "task", title: "Revise equilibrium for the mock", status: ["scheduled"], created: NOW - DAY },
];
const ix = buildIndex(DOCS);
const run = (raw, o = {}) => search(ix, parseQuery(raw, o.chips, { now: NOW }), { context: { now: NOW, ...(o.context || {}) } });

test("the ideal search: 'equilibrium' finds lessons, flashcards, questions, notes, mind maps and the curriculum, grouped in that order", () => {
  const r = run("equilibrium");
  assert.deepEqual(r.groups.map((g) => g.title), ["Lessons", "Flashcards", "Questions", "Notes", "Curriculum", "Tasks"]);
  assert.deepEqual(r.groups[0].items.map((h) => h.title).slice(0, 2).sort(), ["Dynamic equilibrium", "Equilibrium constants"]);
  assert.equal(r.groups[1].items[0].countLabel, "24 cards");
  assert.match(r.groups[0].items[0].html, /<mark>equilibrium<\/mark>/i);
  // "Le Chatelier's principle" is a mind map about equilibrium only in its text, so it needs its own words
  assert.equal(run("chatelier").groups.map((g) => g.title).includes("Mind maps"), true);
  assert.equal(r.counts.lesson, 3);   // homeostasis mentions it in its text
});

test("ranking: the exact title first, then titles that start with it, then a mention in the text", () => {
  const r = run("equilibrium", { chips: { type: ["lesson"] } });
  assert.deepEqual(r.hits.map((h) => h.id).slice(0, 2).sort(), ["l1", "l2"]);
  assert.equal(r.hits.at(-1).id, "l4");
  assert.ok(r.hits[1].score > r.hits[2].score * 2);   // a title match is well ahead of a mention
  assert.equal(r.hits.at(-1).why, "In the text");
  // where the learner is counts: in biology, the biology lesson rises
  const bio = run("dynamic", { context: { course: "biology" } });
  assert.equal(bio.hits[0].id, "l1");   // still the title match
  assert.equal(run("balance", { context: { course: "biology" } }).hits[0].id, "l4");
});

test("stems and plurals: equilibria finds equilibrium, catalysts finds catalyst, and a misspelling is offered a fix", () => {
  assert.equal(stem("equilibria"), stem("equilibrium"));
  assert.equal(stem("reactions"), "reaction");
  assert.ok(run("equilibria").total >= 4);
  assert.ok(run("catalysts").hits.some((h) => h.id === "l3"));
  const miss = run("equilibirum");
  assert.equal(miss.total, 0);
  assert.equal(miss.recover.didYouMean.text, "equilibrium");
  assert.equal(distance("equilibirum", "equilibrium"), 1);   // a swap is one edit
  assert.equal(correct(ix, "zzzzzz"), null);
});

test("an exact phrase, a left-out word, and every word must match", () => {
  assert.deepEqual(run('"le chatelier"').hits.map((h) => h.id).sort(), ["m1", "n1", "s1"]);
  assert.deepEqual(run('"chatelier le"').hits, []);
  assert.ok(!run("equilibrium -constants").hits.some((h) => h.id === "l2"));
  assert.deepEqual(run("equilibrium homeostasis").hits.map((h) => h.id), ["l4"]);
});

test("filters: type, course, board, qualification, status, completion, difficulty, folder and date", () => {
  assert.deepEqual(run("equilibrium type:cards").hits.map((h) => h.id), ["p1"]);
  assert.deepEqual(run("equilibrium in:course:biology").hits.map((h) => h.id), ["l4"]);
  assert.deepEqual(run("board:aqa qual:a-level").hits.map((h) => h.id).sort(), ["l1", "l2", "s1"]);
  assert.deepEqual(run("equilibrium done:no type:lesson").hits.map((h) => h.id), ["l2"]);
  assert.deepEqual(run("equilibrium done:yes").hits.map((h) => h.id), ["l1"]);
  assert.deepEqual(run("equilibrium difficulty:hard").hits.map((h) => h.id).sort(), ["l2", "q1"]);
  assert.deepEqual(run("status:saved").hits.map((h) => h.id), ["p1"]);
  assert.deepEqual(run("in:folder:c1").hits.map((h) => h.id), ["m1"]);
  assert.deepEqual(run("equilibrium after:7d").hits.map((h) => h.id).sort(), ["p1", "t1"]);
  assert.deepEqual(run("equilibrium before:7d").hits.map((h) => h.id), ["n1"]);
  // a type chip doesn't change the other types' counts, so every chip can show what it would find
  const r = run("equilibrium", { chips: { type: ["pack"] } });
  assert.equal(r.total, 1); assert.equal(r.counts.lesson, 3);
});

test("the query language: typed keys and chips are the same thing, and it writes itself back out", () => {
  const q = parseQuery('"le chatelier" -industrial type:maps in:folder:"Mock week" board:Pearson qual:"a level" done:no after:2026-11-01', {}, { now: NOW });
  assert.deepEqual(q.phrases, ["le chatelier"]); assert.deepEqual(q.not, ["industrial"]); assert.deepEqual(q.terms, []);
  assert.deepEqual(q.filters.type, ["map"]); assert.equal(q.filters.scope.folder, "Mock week");
  assert.deepEqual(q.filters.board, ["edexcel"]); assert.deepEqual(q.filters.qual, ["a-level"]); assert.equal(q.filters.done, false);
  assert.equal(q.from, new Date(2026, 10, 1).getTime());
  const again = parseQuery(queryString(q), {}, { now: NOW });
  assert.deepEqual(again.filters, q.filters); assert.deepEqual(again.phrases, q.phrases); assert.equal(again.from, q.from);
  assert.deepEqual(activeFilters(q).map((f) => f.label), ["Mind maps", "In folder: Mock week", "Pearson Edexcel", "A level", "Not finished", "Since 1 Nov"]);
  assert.deepEqual(without(q, { key: "type", value: "map" }).filters.type, []);
  // chips sit under what's typed
  const c = parseQuery("osmosis", chipsOf(q), { now: NOW });
  assert.deepEqual(c.terms, ["osmosis"]); assert.deepEqual(c.filters.type, ["map"]);
  // an unknown key is just words, so "10:30" and "note:" still search
  assert.deepEqual(parseQuery("lecture 10:30").terms, ["lecture", "10", "30"]);
  assert.equal(typeOf("flashcards"), "pack"); assert.equal(typeOf("folder"), "collection");
  assert.deepEqual(words("Le Châtelier's principle"), ["le", "chatelier", "principle"]);
  assert.equal(parseWhen("2w", NOW), new Date(2026, 10, 12).getTime());
});

test("nothing found: loosen a filter (saying what it would find), try any of the words, or fewer words", () => {
  const r = run("equilibrium type:map");
  assert.equal(r.total, 0);
  assert.deepEqual(r.recover.loosen, [{ key: "type", label: "every kind of resource", count: 8 }]);
  const two = run("homeostasis catalyst");
  assert.equal(two.total, 0); assert.equal(two.recover.anyWords.count, 2);
  assert.deepEqual(two.recover.browse, [{ text: "homeostasis", count: 1 }]);
});

test("autocomplete: saved and past searches first, then the word finished, then matching titles", () => {
  const history = [{ q: "equilibrium constants" }, { q: "osmosis" }], saved = [{ id: "s1", name: "Chem mock", q: "equilibrium board:aqa" }];
  const s = suggest(ix, "equ", { history, saved });
  assert.deepEqual(s.map((x) => x.kind).slice(0, 3), ["saved", "history", "word"]);
  assert.equal(s.find((x) => x.kind === "word").text, "equilibrium");
  assert.ok(s.some((x) => x.kind === "hit" && x.text === "Dynamic equilibrium"));
  assert.deepEqual(suggest(ix, "", { history, saved }).map((x) => x.text), ["equilibrium board:aqa", "equilibrium constants", "osmosis"]);
});

test("history: newest first, no repeats, and the letters typed on the way to a search aren't kept", () => {
  let h = addHistory([], "equ", { now: NOW });
  h = addHistory(h, "equilibrium", { now: NOW + 2000 });
  assert.deepEqual(h.map((x) => x.q), ["equilibrium"]);
  h = addHistory(h, "osmosis", { now: NOW + 120e3 });
  h = addHistory(h, "Equilibrium", { now: NOW + 240e3 });
  assert.deepEqual(h.map((x) => x.q), ["Equilibrium", "osmosis"]);
  assert.deepEqual(addHistory(h, "e"), h);
  const s = addSaved(addSaved([], "Mock", "equilibrium board:aqa", { now: NOW }), "", "osmosis", { now: NOW + 1 });
  assert.deepEqual(s.map((x) => [x.name, x.q]), [["osmosis", "osmosis"], ["Mock", "equilibrium board:aqa"]]);
});

test("finding inside a lesson: the section whose heading matches first, then by how often", () => {
  const sections = [
    { id: "s1", title: "What equilibrium means", text: "A reversible reaction in a closed system reaches equilibrium." },
    { id: "s2", title: "Le Chatelier's principle", text: "If a change is made, the equilibrium shifts. The equilibrium position moves to oppose it." },
    { id: "s3", title: "Worked example", text: "The Haber process." },
  ];
  const r = findInSections(sections, parseQuery("equilibrium"));
  assert.deepEqual(r.map((x) => x.id), ["s1", "s2"]);
  assert.match(r[1].snippet, /<mark>equilibrium<\/mark>/);
  assert.deepEqual(findInSections(sections, parseQuery('"haber process"')).map((x) => x.id), ["s3"]);
  assert.deepEqual(findInSections(sections, parseQuery("")), []);
});

test("marking and snippets keep the original text, escaped", () => {
  assert.equal(markTitle("Le Châtelier's <b>principle</b>", parseQuery("chatelier")), "Le <mark>Châtelier</mark>&#39;s &lt;b&gt;principle&lt;/b&gt;");
  const s = snippet("Lots of words before. ".repeat(10) + "Then the equilibrium shifts to oppose the change, and more after.", parseQuery("equilibrium"), 60);
  assert.match(s, /^…/); assert.match(s, /<mark>equilibrium<\/mark>/);
  assert.equal(passes({ type: "lesson" }, parseQuery("done:yes")), false);   // unknown completion isn't "done"
  assert.ok(related(run("equilibrium").hits, parseQuery("equilibrium")).includes("reversible reaction"));
});
