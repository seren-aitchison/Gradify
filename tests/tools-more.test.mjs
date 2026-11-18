// The Tools that read, play, print, quiz and connect (kit/tools/material.js, learn.js, practise.js, notebook.js,
// youtube.js, projects.js) and the community's internship matcher: the pure parts, on real Gradify lessons.
import { test } from "node:test";
import assert from "node:assert/strict";
import { fromLesson, fromDeck, fromNotes, termQuestions, lessonMaterial, unitMaterial, catalogue } from "../kit/tools/material.js";
import { scenesOf, episodeOf, audioQuestions, posterOf, posterSvg, lookup, sheetHtml } from "../kit/tools/learn.js";
import { feedBatch, quizQuestions, adaptiveNext, nextLevel, hideLetters, HACKS } from "../kit/tools/practise.js";
import { linksIn, backlinks, lineToCard, notebookDeckText, pageHtml } from "../kit/tools/notebook.js";
import { chaptersOf, parseTranscript, answerFrom, clock, videoIdOf } from "../kit/tools/youtube.js";
import { PROJECTS, progressOf } from "../kit/tools/projects.js";
import { matchOpportunities, OPPORTUNITIES } from "../kit/app/community.js";
import { parseDeck } from "../kit/tools/cards.js";
import { SAMPLE } from "../kit/notes/studio.js";

const seeded = (s = 1) => () => ((s = (s * 16807) % 2147483647) / 2147483647);

test("material: a real lesson, a unit, a deck and pasted notes all become the same shape", async () => {
  const cat = await catalogue();
  const bio = cat.find((c) => c.slug === "biology"), u = bio.units[0], l = u.lessons[0];
  const m = await lessonMaterial("biology", u.id, l.id);
  assert.equal(m.title, l.title);
  assert.ok(m.sections.length && m.sections.every((s) => s.h && s.facts.every((f) => typeof f === "string" && !/\*\*/.test(f))), "sections of plain facts");
  assert.ok(m.cards.length + m.terms.length + m.mcq.length > 0);
  assert.ok(m.link.includes("#/lesson/"));
  const unit = await unitMaterial("biology", u.id);
  assert.ok(unit.sections.length >= m.sections.length && unit.cards.length >= m.cards.length);
  const d = fromDeck("Cells", "# Cells\nMitochondria :: where respiration happens\nThe {{nucleus}} holds DNA.\nWhat is ATP? >> the cell's energy currency");
  assert.deepEqual(d.terms[0], ["Mitochondria", "where respiration happens"]);
  assert.equal(d.cards.length, 3, "one card per line (a concept's reverse isn't repeated)");
  assert.ok(d.cards.some(([q]) => q.includes("[…]")), "a cloze shows its gap");
  const n = fromNotes(SAMPLE, "Cardiac cycle");
  assert.ok(n.sections.length && n.terms.length, "the browser extractor finds topics and terms");
  await assert.rejects(lessonMaterial("biology", u.id, "nope"));
});

test("termQuestions: four options, the right one among them, none repeated", () => {
  const terms = [["Osmosis", "water across a membrane"], ["Diffusion", "net movement down a gradient"], ["Active transport", "against a gradient, using ATP"], ["Endocytosis", "taking in by engulfing"], ["Exocytosis", "releasing by vesicles"]];
  const qs = termQuestions(terms, seeded());
  assert.equal(qs.length, 5);
  for (const q of qs) { assert.equal(q.wrong.length, 3); assert.ok(!q.wrong.includes(q.right)); assert.equal(new Set(q.wrong).size, 3); }
  assert.deepEqual(termQuestions(terms.slice(0, 3)), [], "fewer than four terms: no questions");
});

test("learn: explainer scenes, chant episodes, audio questions, posters, the dictionary and sheets", async () => {
  const cat = await catalogue(), u = cat.find((c) => c.slug === "chemistry").units[0];
  const m = await unitMaterial("chemistry", u.id);
  const sc = scenesOf(m);
  assert.equal(sc[0].kind, "title");
  assert.ok(sc.length >= 3 && sc.every((s) => s.say.length && s.say.every(Boolean)));
  assert.ok(sc.filter((s) => s.kind === "section").every((s) => s.points.length <= 4 && s.say.length >= s.points.length), "each point is said as it appears");
  const ep = episodeOf(m);
  assert.ok(ep.length > 5 && ep.at(-1).part === "Chorus");
  if (m.terms.length) assert.ok(ep.some((l) => /! .+!$/.test(l.text)), "key terms said twice");
  const aq = audioQuestions(m, seeded());
  assert.ok(aq.length && aq.length <= 20 && aq.every((x) => x.q && x.a));
  const p = posterOf(m);
  assert.ok(p.panels.length >= 2 && p.panels.length <= 6);
  const svg = posterSvg(p);
  assert.match(svg, /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);
  assert.ok(!/<script/i.test(svg));
  const rows = [{ term: "Osmosis", def: "water" }, { term: "Osmotic pressure", def: "x" }, { term: "Turgor", def: "pressure from osmosis" }];
  assert.deepEqual(lookup(rows, "osmo").map((r) => r.term), ["Osmosis", "Osmotic pressure", "Turgor"], "term starts first, then definitions");
  assert.deepEqual(lookup(rows, ""), []);
  const sheet = sheetHtml({ title: "T <b>", from: "", terms: [["A", "a & b"]], cards: [] });
  assert.ok(sheet.includes("T &lt;b&gt;") && sheet.includes("a &amp; b"), "escaped");
  assert.ok(!sheetHtml({ title: "T", terms: [["A", "secret"]], cards: [] }, { blank: true }).includes("secret"), "the blank sheet hides definitions");
});

test("practise: the feed mixes in bonus facts and hacks, boosts, quizzes and adaptive levels", () => {
  const cards = Array.from({ length: 10 }, (_, i) => ({ q: `Q${i}`, a: `A${i}`, key: `k${i}` }));
  const facts = [{ text: "A bonus fact long enough to show", from: "L" }];
  const b = feedBatch(cards, facts, { n: 35, rand: seeded() });
  assert.equal(b.length, 35);
  assert.ok(b.some((x) => x.type === "fact") && b.some((x) => x.type === "hack") && b.filter((x) => x.type === "card").length > 20);
  const boosted = feedBatch(cards, [], { n: 400, rand: seeded(3), boosted: new Set(["k0"]) }).filter((x) => x.key === "k0").length;
  const plain = feedBatch(cards, [], { n: 400, rand: seeded(3) }).filter((x) => x.key === "k0").length;
  assert.ok(boosted > plain * 1.8, `a boosted card comes round more (${boosted} vs ${plain})`);
  assert.ok(HACKS.length >= 8);
  const m = { title: "T", terms: [["a", "1"], ["b", "2"], ["c", "3"], ["d", "4"]], cards: [], mcq: [{ q: "Q", right: "R", wrong: ["W1", "W2", "W3"], why: "", d: 3 }] };
  const qs = quizQuestions(m, seeded());
  assert.equal(qs.length, 5);
  assert.equal(nextLevel(2, true, 2), 3); assert.equal(nextLevel(2, true, 1), 2); assert.equal(nextLevel(2, false, 0), 1); assert.equal(nextLevel(3, true, 5), 3); assert.equal(nextLevel(1, false, 0), 1);
  const pool = [{ d: 1 }, { d: 2 }, { d: 3 }], asked = new Set();
  assert.equal(adaptiveNext(pool, 3, asked).d, 3);
  asked.add(pool[2]); assert.equal(adaptiveNext(pool, 3, asked).d, 2, "nearest level when the right one has run out");
  asked.add(pool[0]); asked.add(pool[1]); assert.equal(adaptiveNext(pool, 2, asked), null);
  const h = hideLetters("Mitochondria", seeded());
  assert.equal(h.length, 12); assert.equal(h[0], "M"); assert.ok(h.includes("_"));
});

test("notebook: links, backlinks, lines into cards, one deck of every page's cards", () => {
  assert.deepEqual(linksIn("See [[Cells]] and [[Respiration]], and [[Cells]] again"), ["Cells", "Respiration"]);
  const pages = [{ title: "Cells", text: "Mitochondria :: powerhouse" }, { title: "Respiration", text: "Uses [[cells]]\nATP >> energy" }, { title: "Blank", text: "" }];
  assert.deepEqual(backlinks(pages, "Cells").map((p) => p.title), ["Respiration"], "links match whatever the case");
  assert.equal(lineToCard("Osmosis: water moving across a membrane"), "Osmosis :: water moving across a membrane");
  assert.equal(lineToCard("- What is osmosis?"), "What is osmosis? >> ");
  assert.match(lineToCard("Enzymes speed up reactions"), /\{\{reactions\}\}|\{\{Enzymes\}\}/);
  assert.equal(lineToCard("A >> B"), "A >> B", "already a card");
  const text = notebookDeckText(pages);
  assert.equal(parseDeck(text).length, 3, "the concept both ways, and the basic card");
  assert.ok(!text.includes("Blank"));
  const html = pageHtml("# Title\n- [x] done\n- item **bold** [[Cells]]\nT :: D\n<script>", (t) => t === "Cells");
  assert.ok(html.includes("<h2>Title</h2>") && html.includes("checked") && html.includes("<b>bold</b>") && html.includes('class="nb-card"'));
  assert.ok(html.includes('href="#/tools/notebook/open/Cells"') && !html.includes("<script>"));
});

test("YouTube: link ids, chapters, pasted transcripts and answers from the video", () => {
  for (const u of ["https://www.youtube.com/watch?v=aircAruvnKk", "https://youtu.be/aircAruvnKk?t=3", "https://www.youtube.com/shorts/aircAruvnKk", "aircAruvnKk", "https://m.youtube.com/watch?feature=x&v=aircAruvnKk"]) assert.equal(videoIdOf(u), "aircAruvnKk", u);
  assert.equal(videoIdOf("https://example.com"), null);
  assert.equal(clock(65), "1:05"); assert.equal(clock(3725), "1:02:05");
  const segs = parseTranscript("0:00\nHello and welcome.\n0:04\nToday: photosynthesis in plants.\n1:20 Chlorophyll absorbs light energy.\n2:45\nThe Calvin cycle fixes carbon dioxide.");
  assert.deepEqual(segs.map((s) => s.t), [0, 4, 80, 165]);
  const ch = chaptersOf(segs, 60);
  assert.ok(ch.length >= 2 && ch[0].t === 0);
  const a = answerFrom(ch, "What does chlorophyll absorb?");
  assert.ok(a.length && /Chlorophyll/.test(a[0].text));
  assert.deepEqual(answerFrom(ch, "volcanoes erupting"), []);
});

test("projects and internships", () => {
  assert.ok(PROJECTS.length >= 15 && new Set(PROJECTS.map((p) => p.id)).size === PROJECTS.length);
  for (const p of PROJECTS) assert.ok(p.xp > 0 && p.xp <= 500 && p.steps.length >= 3, p.id);
  assert.deepEqual(progressOf(PROJECTS[0], { steps: [true, false, true] }), { done: 2, of: PROJECTS[0].steps.length, finished: false });
  for (const o of OPPORTUNITIES) assert.match(o.url, /^https:\/\//);
  const m = matchOpportunities(["veterinary"]);
  assert.ok(m[0].tags.includes("veterinary") && m[0].score === 1 && m.at(-1).score === 0);
});
