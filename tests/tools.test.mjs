// Tools (kit/tools), glass diagrams (kit/core/glass-diagrams.js) and the Free allowances (kit/data/limits.js).
// The screens themselves are checked in a browser by scripts/check-tools.cjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDeck, cardHtml, suggestCards, clozeAt, imagesIn } from "../kit/tools/cards.js";
import { packOf, mapOf, deckOf, chantOf, chantLines, cheatsheetOf } from "../kit/tools/convert.js";
import { searchLessons, loadLesson, factsOf } from "../kit/tools/search.js";
import { take, usage, FREE } from "../kit/data/limits.js";
import { diagramsFor, diagramForNode, diagramForCard, diagramSvg, glassDiagram, label, minisFor, miniCard } from "../kit/core/glass-diagrams.js";
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
  assert.equal(ds.length, 5, "five for a lesson");
  assert.deepEqual(ds.map((d) => d.at), [...ds.map((d) => d.at)].sort((a, b) => a - b), "in the lesson's order");
  for (const d of ds) {
    assert.ok(L.blocks[d.at] && L.blocks[d.at].t !== "h", "placed after a real block of notes, not a heading");
    assert.match(diagramSvg(d), /^<svg viewBox="0 0 480 300"/);
  }
  // every word on every diagram is the notes' own: checked across courses, never made up
  const flat = (t) => String(t).replace(/\*\*|__|`/g, "").replace(/\^\{([^}]*)\}/g, "^$1").replace(/_\{([^}]*)\}/g, "_$1").replace(/\s+/g, " ");
  const shown = (d) => [d.wrong, d.right, d.text, ...(d.before || []), ...(d.notes || []), ...(d.rows || []).flatMap((r) => [r.f, r.m]),
    ...(d.items || []).flatMap((x) => (typeof x === "string" ? [x] : [x.text, x.term, x.def, x.q, x.a]))].filter(Boolean);
  for (const course of ["medicine", "law", "maths", "biology", "nursing", "pharmacy", "history"]) {
    const notes = (await import(`../kit/courses/${course}/notes/u02.js`)).default, all = flat(notes);
    for (const L2 of parseNotes(notes).slice(0, 6)) {
      const ds2 = diagramsFor(L2);
      assert.ok(ds2.length === 5, `${course}: ${L2.title} has five`);
      for (const d of ds2) for (const w of shown(d)) {
        const bit = w.replace(/…$/, "").replace(/[.,;:]+$/, "").trim();
        if (bit.length > 2) assert.ok(all.includes(bit), `${course} ${d.kind}: "${bit}" is in the notes`);
      }
    }
  }
  assert.match(glassDiagram(ds[0]), /class="gd gd-md/);
  assert.equal(label("**Channels**: ions flow through pores"), "Channels");
  assert.equal(diagramForNode({ topic: "Steps", kind: "example", children: [{ topic: "1. A", children: [] }, { topic: "2. B", children: [] }] }).kind, "flow");
  const flow = { kind: "flow", title: "Nernst equation potassium", items: ["potassium gradient", "membrane potential"] };
  assert.equal(diagramForCard([flow], "What sets the membrane potential?", "The potassium gradient"), flow);
  assert.equal(diagramForCard([flow], "Something else entirely"), null);
});

test("diagram cards show every word as text, can be covered for recall, and stay inert on a flashcard", () => {
  const long = "Sustained depolarisation inactivates voltage-gated sodium channels, so the net effect in the heart is depressed conduction and a risk of arrhythmia";
  const flow = { kind: "flow", title: "What happens to E_K?", items: ["E_K becomes less negative", long] };
  const html = glassDiagram(flow, { n: 2, of: 5, id: "co-d2" });
  assert.ok(html.includes(long), "the whole step, never cut to fit a box");
  assert.match(html, /<figcaption class="gd-head">/, "a figure named by its caption");
  assert.match(html, /2 of 5/);
  assert.match(html, /<ol class="gd-flow/, "a process is an ordered list to a screen reader");
  assert.match(html, /data-gd-mode="quiz" aria-pressed="false"/, "Cover & recall, off to start");
  assert.match(html, /data-gd-mode="step"/, "a process can be stepped through");
  assert.match(html, /data-gd-zoom/);
  assert.doesNotMatch(html, /role="button"/, "answers are plain text until covered");
  // covered from the start (the Recap): each answer is a button until revealed
  const quiz = glassDiagram(flow, { quiz: true });
  assert.match(quiz, /class="gd gd-md quiz"/);
  assert.equal((quiz.match(/role="button" tabindex="0" aria-label="Hidden answer: reveal"/g) || []).length, 2);
  // small (inside a flashcard, itself a button): no buttons or other controls in it
  assert.doesNotMatch(glassDiagram(flow, { size: "sm", caption: false }), /<button|role="button"|data-gd-/);
  // a lesson map links to its sections, and a two-section lesson gets none
  const map = glassDiagram({ kind: "map", title: "Cells", items: ["Structure", "Function", "Injury"] });
  assert.match(map, /data-jump="co-s3"/);
  assert.match(map, /First letters: <b>S · F · I<\/b>/, "a first-letter cue for short parts");
  assert.ok(!glassDiagram({ kind: "hub", title: "AOs", items: ["AO1 Develop", "AO2 Refine", "AO3 Record", "AO4 Present"] }).includes("First letters"), "no cue when the letters don't tell the parts apart");
  const L = { title: "T", blocks: [{ t: "h", x: "One" }, { t: "p", x: "A first. A second." }, { t: "h", x: "Two" }, { t: "p", x: "B." }], objectives: ["Do x", "Do y"], prereq: [], terms: [], cards: [], summary: [] };
  assert.ok(!diagramsFor(L).some((d) => d.kind === "map"), "two sections: no map");
  assert.ok(diagramsFor(L).some((d) => d.kind === "path") && !diagramsFor(L, { skip: ["path"] }).some((d) => d.kind === "path"), "a kind can be left out");
});

test("each kind of card has the ways to practise that suit it, and the small cards quote the notes", async () => {
  const modes = (d) => [...glassDiagram(d).matchAll(/data-gd-mode="(\w+)"/g)].map((m) => m[1]);
  assert.deepEqual(modes({ kind: "terms", title: "Key terms", items: [{ term: "Osmosis", def: "water moving" }, { term: "Diffusion", def: "solutes moving" }] }), ["match", "quiz"]);
  assert.deepEqual(modes({ kind: "mistake", title: "x", wrong: "Thinking A.", right: "B is true." }), ["pick", "quiz"]);
  assert.deepEqual(modes({ kind: "evidence", title: "e", items: [{ status: "established", text: "a" }, { status: "contested", text: "b" }] }), ["rate", "quiz"]);
  assert.deepEqual(modes({ kind: "cycle", title: "c", items: ["One", "Two", "Three"] }), ["step", "quiz"]);
  assert.deepEqual(modes({ kind: "key", title: "k", text: "short idea" }), ["quiz"]);
  assert.deepEqual(modes({ kind: "flow", title: "f", items: ["a", "b", "c"] }), ["step", "order", "quiz"], "three or more steps can be put in order");
  // a worked example is called one; a timeline is drawn to scale, with the gaps in years
  assert.match(glassDiagram({ kind: "flow", ex: true, title: "q", items: ["a", "b"] }), />Worked example</);
  const tl = glassDiagram({ kind: "timeline", title: "t", items: [{ year: "1900", text: "a" }, { year: "1990", text: "b" }, { year: "2000", text: "c" }] });
  assert.match(tl, /left:4\.0%/); assert.match(tl, /left:96\.0%/); assert.match(tl, /90 years/);
  // the small cards: every word from the notes, at most one a section, and they start covered
  const flat = (t) => String(t).replace(/\*\*|__|`/g, "").replace(/\^\{([^}]*)\}/g, "^$1").replace(/_\{([^}]*)\}/g, "_$1").replace(/\s+/g, " ");
  let seen = 0; const kinds = new Set();
  for (const course of ["medicine", "biology", "physics", "history", "nursing"]) {
    const notes = (await import(`../kit/courses/${course}/notes/u01.js`)).default, all = flat(notes);
    for (const L of parseNotes(notes).slice(0, 6)) {
      const ms = minisFor(L);
      assert.ok(ms.length <= 4);
      assert.equal(new Set(ms.map((m) => m.at)).size, ms.length, "one per place");
      for (const m of ms) {
        seen++;
        assert.ok(L.blocks[m.at] && L.blocks[m.at].t !== "h");
        const bits = m.kind === "check" ? [m.q, m.a] : m.kind === "gap" ? m.items.flatMap((g) => [g.pre, g.ans, g.post, ...g.choices]) : m.items.flatMap((l) => [l.pre, l.n, l.post]);
        if (m.kind === "gap") for (const g of m.items) { assert.equal(g.choices.length, 3); assert.ok(g.choices.includes(g.ans), "the right word is one of the choices"); kinds.add("gap"); }
        for (const w of bits) { const bit = w.replace(/^…|…$/g, "").replace(/[.,;:]+$/, "").trim(); if (bit.length > 2) assert.ok(all.includes(bit), `${course} ${m.kind}: "${bit}" is in the notes`); }
        assert.match(miniCard(m), /class="gd gd-mini quiz"/);
      }
    }
  }
  assert.ok(seen >= 10, "lessons get small cards");
  // a worked example's steps reach the card whole, however long (the picture, diagramSvg, shortens its own copy)
  const longStep = `Work out the dose: ${"take the weight in kilograms, multiply by the dose per kilogram, and check the total against the maximum; ".repeat(7)}then round down.`;
  const exL = { title: "t", blocks: [{ t: "h", x: "Dose" }, { t: "ex", x: "A child weighs 20 kg.", steps: [longStep, "Give it."] }], cards: [] };
  const flowD = diagramsFor(exL).find((d) => d.kind === "flow");
  assert.ok(longStep.length > 600 && flowD.items[0] === longStep, "the whole step, never cut");
  assert.ok(glassDiagram(flowD).includes(longStep));
  // review fixes: a grouped number is never half-covered; a tie in dates can't be put in order; a small map has no buttons;
  // the Recap's questions are left out exactly, not by their first words
  const numL = { title: "t", blocks: [{ t: "h", x: "A" }, { t: "p", x: "The band runs from 1,000,000 Hz up. A fibre is about 25 kHz here. Another 40% now." }], cards: [] };
  assert.deepEqual(minisFor(numL)[0].items.map((l) => l.n), ["25 kHz", "40%"]);
  assert.ok(!modes({ kind: "timeline", title: "t", items: [{ year: "1900", text: "a" }, { year: "1900", text: "b" }, { year: "2000", text: "c" }] }).includes("order"));
  assert.doesNotMatch(glassDiagram({ kind: "map", title: "M", items: ["One", "Two", "Three"] }, { size: "sm", caption: false }), /<button/);
  assert.doesNotMatch(glassDiagram({ kind: "cycle", title: "C", items: ["One", "Two", "Three", "Four"] }, { size: "sm", caption: false }), /<button|data-gd-ring/, "a small cycle has no ring buttons");
  assert.match(glassDiagram({ kind: "cycle", title: "C", items: ["One", "Two", "Three", "Four"] }), /data-gd-ring="3"/, "a full one does");
  const qL = { title: "t", blocks: [{ t: "h", x: "Osmosis" }, { t: "p", x: "Osmosis moves water across membranes towards solutes." }], cards: [["What is osmosis? How does it differ from diffusion?", "Water moving across membranes towards solutes."]] };
  assert.equal(minisFor(qL, { skipQ: ["What is osmosis?"] })[0]?.kind, "check", "a longer question isn't dropped for starting the same way");
  assert.equal(minisFor(qL, { skipQ: ["What is osmosis? How does it differ from diffusion?"] }).length, 0, "an exact repeat is");
  // a card in a lesson carries its key, so it can remember what's been practised on it; a small card does too
  assert.match(glassDiagram({ kind: "key", title: "k", text: "an idea" }, { key: "med:u01-02:key-3" }), /data-gd-key="med:u01-02:key-3"/);
  assert.doesNotMatch(glassDiagram({ kind: "key", title: "k", text: "an idea" }, { key: "x", size: "sm" }), /data-gd-key/, "not on a flashcard");
  assert.match(miniCard({ kind: "check", q: "Why?", a: "Because." }, { key: "med:u01-02:check-4" }), /data-gd-key="med:u01-02:check-4"/);
  assert.ok(kinds.has("gap"), "some sections get a gap to fill");
});

test("a Gradify AI pack (as from a photo of notes) becomes cards, with its cloze cards kept as cloze", () => {
  const pack = { title: "Cells", topics: [{ name: "Organelles", facts: [
    { term: "Mitochondrion", kind: "definition", statement: "Mitochondrion: the site of aerobic respiration.", card: { type: "definition", front: "What is the mitochondrion?", back: "The site of aerobic respiration." } },
    { term: null, kind: "other", statement: "Cells divide by mitosis.", card: { type: "cloze", front: "Cells divide by {{c1::mitosis}}.", back: "mitosis" } }] }], equations: [] };
  const cards = parseDeck(deckOf(pack));
  assert.deepEqual(cards.map((c) => c.type), ["concept", "concept", "cloze"]);
  assert.equal(cards[2].front, "Cells divide by {{…}}.");
});

test("signed in, opening a lesson works with Supabase's real query builder (awaitable, but with no .catch)", async () => {
  const { gate } = await import("../kit/data/limits.js");
  // supabase-js's rpc() returns a builder with then() and nothing else; calling .catch on it threw, so no lesson opened
  const thenable = (value) => ({ then: (ok, no) => Promise.resolve(value).then(ok, no) });
  const calls = [];
  const db = { rpc: (name, args) => { calls.push(name); return thenable(name === "take_allowance" ? { data: { ok: true, used: 1, limit: 10, left: 9 }, error: null } : { data: { plan: "free" }, error: null }); } };
  const store = { mode: "cloud", db, async getProfile() { return {}; } };
  assert.equal(await gate("lesson", "u01-01", { course: "law", store }), true, "the lesson opens");
  assert.ok(calls.includes("take_allowance"), "the server counted it");
  // and a server that's down doesn't stop the lesson opening either: this device's own count is the fallback
  const down = { mode: "cloud", db: { rpc: () => ({ then: (ok, no) => Promise.reject(new Error("offline")).then(ok, no) }) }, async getProfile() { return {}; } };
  assert.equal(await gate("lesson", "u01-02", { course: "law", store: down }), true);
});

test("the Gradify Tree's leaves are the learner's real lessons, flashcard sessions and quizzes", async () => {
  const { leafKind, activityDays } = await import("../kit/learning/learner-data.js");
  // course kinds are "<course>-<kind>" (kit/course/course.js award); the app logs flashcard reviews as "session"
  assert.equal(leafKind("law-lesson"), "lesson");
  for (const k of ["law-review", "session"]) assert.equal(leafKind(k), "flashcard", k);
  for (const k of ["law-quiz", "maths-check", "nursing-practice", "physics-mock", "law-write"]) assert.equal(leafKind(k), "quiz", k);
  for (const k of ["pack", "block", "workout", "law-chest", undefined]) assert.equal(leafKind(k), null, String(k));
  const at = new Date().toISOString();
  const day = activityDays([{ at, site: "LawGradify", kind: "law-lesson" }, { at, site: "LawGradify", kind: "law-quiz" }, { at, site: "LawGradify", kind: "pack" }], { weeks: 1 }).at(-1);
  assert.deepEqual(day.leaves.LawGradify, { lesson: 1, flashcard: 0, quiz: 1 }, "a pack of notes isn't a leaf");
  assert.equal(day.counts.LawGradify, 3, "but every activity still counts towards the day");
});
