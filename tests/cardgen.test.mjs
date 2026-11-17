// The browser extractor's flashcards: what an appraisal found wrong with them, pinned so it stays fixed.
// Prose notes like these produced "What is water? → Split, releasing oxygen", blanks on words like
// "dioxide", an unexplained "It takes place in the _____", and source quotes cut down to "The".
import { test } from "node:test";
import assert from "node:assert/strict";
import { browserPack, normaliseNotes, analyseNotes } from "../kit/notes/studio.js";
import { cardsFromPack, answerSupport } from "../kit/notes/pack.js";

const PROSE = `Photosynthesis
Photosynthesis is the process by which green plants convert light energy into chemical energy. It takes place in the chloroplasts, mainly in the leaves.
The light-dependent reactions happen in the thylakoid membranes and produce ATP and NADPH. Water is split, releasing oxygen as a by-product.
The Calvin cycle takes place in the stroma. It uses ATP and NADPH to fix carbon dioxide into glucose. The enzyme RuBisCO catalyses carbon fixation.
Limiting factors include light intensity, carbon dioxide concentration and temperature.`;

const cardsOf = (text) => cardsFromPack(browserPack(text), normaliseNotes(text));
const find = (cards, re) => cards.find((c) => re.test(`${c.front} ${c.back}`));

test("\"X is <verb>\" is not a definition: no \"What is water?\"", () => {
  const cards = cardsOf(PROSE);
  assert.ok(!cards.some((c) => /^What is water\?/i.test(c.front)), JSON.stringify(cards.map((c) => c.front)));
  assert.ok(find(cards, /^What is photosynthesis\?/), "a real definition still becomes a definition card");
});

test("\"it\" and verb-first fragments borrow the previous sentence's subject", () => {
  const cards = cardsOf(PROSE);
  assert.ok(!cards.some((c) => /^(It|They)\b/.test(c.front)), "no card starts with an unexplained pronoun");
  assert.equal(find(cards, /chloroplasts/).front, "Photosynthesis takes place in the _____, mainly in the leaves.");
  assert.match(find(cards, /fix carbon dioxide/).front, /^The Calvin cycle uses/);
  // messy notes: "happens in chloroplasts" follows a definition of photosynthesis
  const messy = cardsOf("photosynthesis = how plants make glucose from light\nhappens in chloroplasts");
  assert.equal(find(messy, /chloroplasts/).front, "Photosynthesis happens in _____.");
});

test("an \"it\" with nothing before it makes no card rather than a confusing one", () => {
  assert.equal(cardsOf("It is found in the stroma of every leaf cell.").length, 0);
});

test("blanks land on key terms, not on the longest word", () => {
  const cards = cardsOf(PROSE);
  const answers = cards.filter((c) => c.kind === "cloze").map((c) => c.back);
  for (const bad of ["dioxide", "catalyses", "concentration", "by-product"]) assert.ok(!answers.includes(bad), `blanked "${bad}": ${answers}`);
  assert.ok(answers.includes("RuBisCO"));
  assert.ok(answers.includes("temperature"), "the last item of a list is the blank");
  // bracketed terms are hidden whole, and authorities in brackets count as key terms
  const law = cardsOf("acceptance must be unconditional and communicated (mirror image rule)\npast consideration is not good consideration (Re McArdle)");
  assert.deepEqual(law.map((c) => c.back), ["mirror image rule", "McArdle"]);
});

test("every card's quote is its whole source sentence, not the words before the blank", () => {
  const cards = cardsOf(PROSE);
  for (const c of cards) assert.ok(c.sourceQuote.split(" ").length >= 4, `quote too short: ${c.sourceQuote}`);
  assert.equal(find(cards, /stroma/).sourceQuote, "The Calvin cycle takes place in the stroma");
  assert.ok(cards.every((c) => c.grounded === "yes"));
});

test("plural terms ask \"What are…\"", () => {
  assert.equal(analyseNotes("limiting factors: light intensity, CO2 concentration, temperature").cards[0].q, "What are the limiting factors?");
});

test("\"checked against your notes\" needs the answer to be in the notes too, not just the quote", () => {
  const notes = "Stroke volume is the amount of blood ejected by each ventricle per beat.";
  assert.equal(answerSupport("Amount of blood ejected by each ventricle per beat.", notes), 1);
  assert.ok(answerSupport("The volume of air breathed out in one minute.", notes) < 0.6);
  assert.equal(answerSupport("ventricle", notes, "cloze"), 1);
  assert.equal(answerSupport("atrium", notes, "cloze"), 0);
  const pack = { topics: [{ name: "Heart", questions: [], facts: [
    { importance: "core", quote: "Stroke volume is the amount of blood ejected", card: { type: "definition", front: "What is stroke volume?", back: "The amount of blood ejected by each ventricle per beat." } },
    { importance: "core", quote: "Stroke volume is the amount of blood ejected", card: { type: "definition", front: "What is tidal volume?", back: "Air moved in a normal breath at rest." } },
  ] }] };
  assert.deepEqual(cardsFromPack(pack, notes).map((c) => c.grounded), ["yes", "partly"]);
});

// Signed in while Gradify AI is switched off: the server refuses with "ai_off". The learner used to get
// that error and no pack at all; now the in-browser extractor makes the pack, with a note saying why.
test("a signed-in learner still gets a pack when Gradify AI is off", async () => {
  const { generate } = await import("../kit/notes/engine.js");
  const store = { mode: "cloud", session: async () => ({ access_token: "t" }) };
  const real = globalThis.fetch;
  const reply = (status, body) => async () => ({ status, ok: status < 300, json: async () => body });
  try {
    globalThis.fetch = reply(503, { reason: "ai_off", error: "Gradify AI isn't switched on yet. Everything else on Gradify works as normal." });
    const out = await generate({ text: PROSE, title: "Photosynthesis", store });
    assert.equal(out.engine, "browser");
    assert.ok(out.cards.length >= 6);
    assert.match(out.notice, /isn't switched on yet.*made on your device/);
    // a scanned PDF has no text to fall back on, so the refusal is passed on
    await assert.rejects(generate({ text: "", pdfBase64: "JVBERi0=", title: "Scan", store }), /switched on/);
    // a problem with the request itself is passed on too
    globalThis.fetch = reply(413, { error: "These notes are longer than your plan allows." });
    await assert.rejects(generate({ text: PROSE, title: "x", store }), /longer than your plan/);
  } finally { globalThis.fetch = real; }
});

// From code review: numbers and short terms are checked, headings reset the subject, and dates stay on the local day.
test("an answer with the wrong number or an unrelated short term isn't 'checked'", () => {
  const notes = "The human heart has 4 chambers. Mitosis produces 2 daughter cells.";
  assert.equal(answerSupport("4", notes), 1);
  assert.ok(answerSupport("5", notes) < 0.6);
  assert.ok(answerSupport("The human heart has 5 chambers.", notes) < 1);
  assert.ok(answerSupport("ATP", notes) < 0.6, "a short term the notes never mention");
  assert.equal(answerSupport("2 daughter cells", notes), 1);
});
test("a heading starts a new context: 'it' after it doesn't borrow the subject from before", () => {
  const cards = cardsOf("Photosynthesis: conversion of light energy into chemical energy.\nRespiration\nIt releases energy in mitochondria.");
  assert.ok(!cards.some((c) => /^Photosynthesis releases/.test(c.front)), JSON.stringify(cards.map((c) => c.front)));
});
test("dates in notes are saved on the learner's own calendar day", () => {
  const pack = browserPack("Biology\nlab report due 3 November", "Lab", new Date(2026, 9, 1));
  assert.equal(pack.dates[0].date.slice(5), "11-03");
});
