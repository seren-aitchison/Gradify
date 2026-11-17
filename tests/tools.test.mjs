// Tools (kit/tools), glass diagrams (kit/core/glass-diagrams.js) and the Free allowances (kit/data/limits.js).
// The screens themselves are checked in a browser by scripts/check-tools.cjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDeck, cardHtml, suggestCards, clozeAt, imagesIn } from "../kit/tools/cards.js";
import { packOf, mapOf, deckOf, chantOf, chantLines, cheatsheetOf } from "../kit/tools/convert.js";
import { searchLessons, loadLesson, factsOf } from "../kit/tools/search.js";
import { take, usage, FREE } from "../kit/data/limits.js";
import { diagramsFor, diagramForNode, diagramForCard, diagramSvg, glassDiagram, label } from "../kit/core/glass-diagrams.js";
import { parseNotes } from "../kit/course/notes.js";
import { SAMPLE } from "../kit/notes/studio.js";

test("the card syntax: >>, <<, <>, ::, cloze, multi-line, images", () => {
  const cards = parseDeck(`# Heading, not a card
Mitochondria >> Make ATP
Nucleus << Holds the DNA
Ribosome <> Makes proteins
Osmosis :: Water across a membrane
The {{heart}} pumps {{blood}}.
Anki style {{c1::cloze}} works
Stages of mitosis >>>
  Prophase
  - Metaphase
A plain note line.
![cell](img:i123) Label >> Nucleus`);
  const by = (t) => cards.filter((c) => c.type === t);
  assert.deepEqual(by("basic").map((c) => c.front), ["Mitochondria", "Ribosome", "![cell](img:i123) Label"]);
  assert.deepEqual(by("reverse").map((c) => [c.front, c.back]), [["Holds the DNA", "Nucleus"], ["Makes proteins", "Ribosome"]]);
  assert.equal(by("concept").length, 2, "a concept goes both ways");
  assert.deepEqual(by("cloze").map((c) => c.front), ["The {{…}} pumps blood.", "The heart pumps {{…}}.", "Anki style {{…}} works"]);
  assert.equal(by("multi")[0].back, "Prophase\n• Metaphase");
  assert.equal(cards.length, 11);
  assert.deepEqual(imagesIn("x ![a](img:i1) ![b](img:i2)"), ["i1", "i2"]);
  assert.match(cardHtml(by("cloze")[0].front), /tc-gap/);
  assert.match(cardHtml("![cell](img:i9) <b>", (id) => `blob:${id}`), /<img class="tc-img" src="blob:i9" alt="cell"> &lt;b&gt;/);
  assert.equal(clozeAt("The heart pumps", 4, 9), "The {{heart}} pumps");
});

test("a card keeps its id when other lines change, so its schedule survives editing", () => {
  const a = parseDeck("Mitochondria >> Make ATP\nOsmosis :: Water"), b = parseDeck("New card >> New\nMitochondria >> Make ATP\nOsmosis :: Water moving");
  assert.equal(a[0].id, b[1].id);
  assert.ok(new Set(parseDeck("X >> Y\nX >> Y").map((c) => c.id)).size === 1, "a duplicate line is one card");
});

test("suggested cards come from plain notes, in the deck's own syntax", async () => {
  const s = await suggestCards("Enzymes are biological catalysts that speed up reactions.\nDiffusion: the net movement of particles from high to low concentration.\nMitochondria >> Make ATP");
  assert.ok(s.includes("Diffusion :: the net movement of particles from high to low concentration"));
  assert.ok(s.every((x) => parseDeck(x).length >= 1), "every suggestion is a valid card");
  assert.ok(!s.some((x) => x.startsWith("Mitochondria")), "lines that are already cards aren't suggested again");
});

test("notes become a mind map, flashcards, a chant and a cheatsheet, all from their own words", () => {
  const p = packOf(SAMPLE, "Cardiac");
  const m = mapOf(p);
  assert.ok(m.children.length >= 3 && m.children.every((b) => b.children.length));
  const ids = []; const walk = (n) => { ids.push(n.id); (n.children || []).forEach(walk); }; walk(m);
  assert.equal(new Set(ids).size, ids.length, "map ids are unique");
  const cards = parseDeck(deckOf(p));
  assert.ok(cards.length >= 15, `${cards.length} cards`);
  assert.ok(cards.some((c) => c.front === "Systole" && /contract/.test(c.back)));
  const c = chantOf(p), lines = chantLines(c);
  assert.ok(lines.length >= 12 && lines.at(-1).part === "Chorus");
  assert.ok(lines.every((l) => l.text.split(" ").length <= 16), "chant lines are short enough to say on a beat");
  const s = cheatsheetOf(p);
  assert.ok(s.tiles.some((t) => t.name === "Equations" && t.items[0].mono));
  const hay = SAMPLE.toLowerCase();
  for (const t of s.tiles) for (const it of t.items) if (it.term) assert.ok(hay.includes(it.term.toLowerCase()), `${it.term} is in the notes`);
});

test("the lesson search finds lessons across Gradify, and a lesson's facts come from its notes", async () => {
  const r = await searchLessons("nernst equation");
  assert.equal(r[0].title, "Nernst equation");
  assert.ok((await searchLessons("osmosis")).some((h) => h.c.slug === "biology"));
  assert.ok((await searchLessons("osmosis", { course: "chemistry" })).every((h) => h.c.slug === "chemistry"));
  assert.deepEqual(await searchLessons("zzzqqq"), []);
  const L = await loadLesson((await searchLessons("resting potential"))[0]);
  const groups = factsOf(L);
  assert.ok(groups.some((g) => g.section === "Key terms" && g.facts.every((f) => f.kind === "term" && f.detail)));
  assert.equal(new Set(groups.flatMap((g) => g.facts.map((f) => f.id))).size, groups.flatMap((g) => g.facts).length);
});

test("Free allowances: 10 lessons per course, 5 flashcard sets, 5 maps, 5 uses of each tool; re-opening is free", () => {
  const c = {}, save = () => {};
  for (let k = 0; k < FREE.lesson; k++) assert.ok(take("lesson", `l${k}`, { course: "law" }, c, save).ok);
  assert.equal(take("lesson", "l99", { course: "law" }, c, save).ok, false);
  assert.ok(take("lesson", "l3", { course: "law" }, c, save).ok, "already opened");
  assert.ok(take("lesson", "l0", { course: "chemistry" }, c, save).ok, "another course has its own ten");
  for (let k = 0; k < 5; k++) take("map", `m${k}`, {}, c, save);
  assert.equal(take("map", "m5", {}, c, save).ok, false);
  for (let k = 0; k < 5; k++) assert.ok(take("tool", `x${k}`, { tool: "cards" }, c, save).ok);
  assert.equal(take("tool", "x9", { tool: "cards" }, c, save).ok, false);
  assert.ok(take("tool", "x0", { tool: "convert" }, c, save).ok, "each tool has its own five");
  assert.deepEqual({ used: usage("flashcards", {}, c).used, left: usage("flashcards", {}, c).left }, { used: 0, left: 5 });
});

test("glass diagrams are drawn from a lesson's own notes, beside the part they show", async () => {
  const text = (await import("../kit/courses/medicine/notes/u01.js")).default;
  const L = parseNotes(text)[1], ds = diagramsFor(L);
  assert.ok(ds.length >= 2 && ds.length <= 4);
  assert.deepEqual(ds.map((d) => d.at), [...ds.map((d) => d.at)].sort((a, b) => a - b), "in the lesson's order");
  for (const d of ds) {
    assert.ok(L.blocks[d.at], "placed after a real block");
    const svg = diagramSvg(d);
    assert.match(svg, /^<svg viewBox="0 0 320 200"/);
    const words = (d.items || []).map((x) => (x.text || x).replace(/…$/, "")).filter(Boolean);
    for (const w of words) assert.ok(text.replace(/\*\*/g, "").includes(w), `"${w}" is in the notes`);
  }
  assert.match(glassDiagram(ds[0]), /class="gd gd-md"/);
  assert.equal(label("**Channels**: ions flow through pores"), "Channels");
  assert.equal(diagramForNode({ topic: "Steps", kind: "example", children: [{ topic: "1. A", children: [] }, { topic: "2. B", children: [] }] }).kind, "flow");
  const flow = { kind: "flow", title: "Nernst equation potassium", items: ["potassium gradient", "membrane potential"] };
  assert.equal(diagramForCard([flow], "What sets the membrane potential?", "The potassium gradient"), flow);
  assert.equal(diagramForCard([flow], "Something else entirely"), null);
});
