// Card quality (kit/notes/pack.js): one fact per card, near-duplicates removed, and the reviewer's checks.
// Applied to cards from both engines, so Gradify AI's cards get the same treatment as the browser's.
import { test } from "node:test";
import assert from "node:assert/strict";
import { similarity, splitList, reviewCard, refineCards, cardsFromPack } from "../kit/notes/pack.js";

const card = (front, back, o = {}) => ({ topic: "T", front, back, kind: "definition", importance: "core", sourceQuote: null, sourcePage: null, grounded: "yes", ...o });

test("similarity: identical is 1, a reworded copy is high, unrelated text is low", () => {
  assert.equal(similarity("Stroke volume", "stroke volume."), 1);
  assert.ok(similarity("What is stroke volume?", "What is the stroke volume?") > 0.85);
  assert.ok(similarity("What is stroke volume?", "What causes the second heart sound?") < 0.5);
});

test("a whole-list answer becomes one fill-in-the-blank card per item", () => {
  const notes = "limiting factors: light intensity, CO2 concentration, temperature";
  const cards = splitList(card("What are the limiting factors?", "Light intensity, CO2 concentration, temperature."), notes);
  assert.deepEqual(cards.map((c) => c.back), ["light intensity", "CO2 concentration", "temperature"]);
  assert.equal(cards[1].front, "Limiting factors: light intensity, _____ and temperature.");
  assert.ok(cards.every((c) => c.kind === "cloze" && c.grounded === "yes"));
  // two items, long items or a sentence aren't lists to split
  assert.equal(splitList(card("What is the cardiac cycle?", "Sequence of events in one heartbeat."), notes).length, 1);
  assert.equal(splitList(card("What are the stages?", "Light-dependent and light-independent."), notes).length, 1);
});

test("the reviewer catches cards a learner shouldn't revise as they are", () => {
  assert.deepEqual(reviewCard(card("What does cardiac output equal?", "Stroke volume × heart rate")), []);
  assert.ok(reviewCard(card("What is the postal rule for acceptance?", "postal rule")).includes("leak"));
  assert.ok(reviewCard(card("It is found where?", "In the stroma")).includes("vague"));
  assert.ok(reviewCard(card("Is rubisco an enzyme?", "Yes")).includes("yes-no"));
  assert.ok(reviewCard(card("Which valve is not open in systole?", "Mitral")).includes("negative"));
  assert.ok(reviewCard(card("x", " ")).includes("empty"));
  assert.ok(reviewCard(card("Rubisco fixes CO2.", "rubisco", { kind: "cloze" })).includes("no-blank"));
  assert.deepEqual(reviewCard(card("Explain why CO rises.", "word ".repeat(60), { kind: "why" })), [], "explanations may run longer");
});

test("refining drops unusable cards, flags doubtful ones and keeps the better-checked of two duplicates", () => {
  const cards = refineCards([
    card("What is stroke volume?", "Blood ejected per beat.", { grounded: "partly" }),
    card("What is the stroke volume?", "Blood ejected per beat", { grounded: "yes" }),
    card("Rubisco fixes CO2.", "rubisco", { kind: "cloze" }),
    card("What is the postal rule for acceptance?", "postal rule"),
  ], "");
  assert.equal(cards.length, 2);
  assert.equal(cards[0].front, "What is the stroke volume?", "the checked copy replaces the partly-checked one");
  assert.equal(cards[1].grounded, "partly", "a card that gives its answer away is marked to check");
  assert.deepEqual(cards[1].issues, ["leak"]);
});

test("Gradify AI's cards go through the same checks", () => {
  const notes = "Essentials of a contract: offer, acceptance, consideration, intention to create legal relations.";
  const pack = { topics: [{ name: "Formation", questions: [], facts: [
    { importance: "core", quote: "offer, acceptance, consideration, intention to create legal relations", card: { type: "definition", front: "What are the essentials of a contract?", back: "Offer, acceptance, consideration and intention to create legal relations." } },
  ] }] };
  const cards = cardsFromPack(pack, notes);
  assert.equal(cards.length, 4);
  assert.equal(cards[3].back, "intention to create legal relations");
});
