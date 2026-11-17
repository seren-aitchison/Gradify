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

// ---------- Gradify AI's pipeline: extract → cards → independent review → checks → coverage ----------
import { applyReview, reviewRequest, coverage, packStats, PACK_SCHEMA, REVIEW_SCHEMA, CARD_TYPES, LEVELS, levelOf } from "../kit/notes/pack.js";

const NOTES = `Enzymes are biological catalysts that lower the activation energy of a reaction.
Competitive inhibitors bind to the active site, so raising substrate concentration can overcome them.
Non-competitive inhibitors bind elsewhere on the enzyme and change its shape; more substrate does not help.
A common mistake is to think enzymes are used up in the reaction: they are not consumed.`;
const fact = (statement, quote, card, o = {}) => ({ term: null, abbreviation: null, statement, kind: "definition", importance: "core", level: "remember", prerequisites: [], quote, page: null, card, ...o });
const PACK = { title: "Enzymes", summary: "", equations: [], dates: [], unclear: [], topics: [{ name: "Enzymes", theme: "Enzymes", mnemonic: null, questions: [], facts: [
  fact("Enzymes are biological catalysts", "Enzymes are biological catalysts that lower the activation energy", { type: "definition", front: "What is an enzyme?", back: "A biological catalyst that lowers the activation energy of a reaction." }),
  fact("Competitive and non-competitive inhibitors differ in where they bind", "Competitive inhibitors bind to the active site", { type: "compare", front: "How does a competitive inhibitor differ from a non-competitive one?", back: "A competitive inhibitor binds the active site and is overcome by more substrate; a non-competitive one binds elsewhere and is not." }, { level: "analyse", prerequisites: ["active site"] }),
  fact("Enzymes are not consumed", "enzymes are used up in the reaction: they are not consumed", { type: "misconception", front: "What's wrong with: \"enzymes are used up in the reactions they catalyse\"?", back: "Enzymes are not consumed; they can be used again." }, { level: "analyse" }),
  fact("Raising substrate overcomes competitive inhibition", "raising substrate concentration can overcome them", { type: "definition", front: "What overcomes competitive inhibition?", back: "Enzymes are always made of DNA." }),
] }] };

test("the pack schema asks for a Bloom level and prerequisites for every fact, and the new card types", () => {
  const f = PACK_SCHEMA.properties.topics.items.properties.facts.items;
  assert.ok(f.required.includes("level") && f.required.includes("prerequisites"));
  assert.deepEqual(f.properties.level.enum, LEVELS);
  assert.deepEqual(f.properties.card.properties.type.enum, CARD_TYPES);
  for (const t of ["compare", "sequence", "misconception"]) assert.ok(CARD_TYPES.includes(t));
  assert.equal(REVIEW_SCHEMA.properties.verdicts.items.properties.verdict.enum.join(), "keep,revise,reject");
});

test("cards carry their Bloom level; a card whose answer the notes don't support is already marked to check", () => {
  const cards = cardsFromPack(PACK, NOTES);
  assert.deepEqual(cards.map((c) => c.level), ["remember", "analyse", "analyse", "remember"]);
  assert.deepEqual(cards[1].prerequisites, ["active site"]);
  assert.equal(cards[3].grounded, "partly", "the quote is real but the answer isn't in the notes");
  assert.deepEqual(cards[2].issues, [], "a misconception card may ask what's wrong without being flagged");
  assert.equal(levelOf("apply"), "apply"); assert.equal(levelOf("cloze"), "remember");
});

test("the reviewer sees every card with an id and the notes, and extra cards are labelled", () => {
  const req = reviewRequest(cardsFromPack(PACK, NOTES), NOTES);
  assert.match(req, /\[c1\] \(definition\) Q: What is an enzyme\?/);
  assert.match(req, /\[c4\]/);
  assert.ok(req.includes(NOTES));
  assert.match(reviewRequest([{ ...card("Q", "A"), grounded: "bonus" }], ""), /\[c1\] \[extra\]/);
});

test("verdicts are applied: rejected cards go, corrections are checked again in code", () => {
  const cards = cardsFromPack(PACK, NOTES);
  const r = applyReview(cards, [
    { id: "c1", verdict: "keep", reason: null, front: null, back: null },
    { id: "c3", verdict: "revise", reason: "clearer", front: "True or false, and why: enzymes are used up in reactions?", back: "False: enzymes are not consumed in the reaction." },
    { id: "c4", verdict: "revise", reason: "wrong answer", front: "What overcomes competitive inhibition?", back: "Raising the substrate concentration." },
    { id: "c2", verdict: "reject", reason: "tests two things", front: null, back: null },
  ], NOTES);
  assert.equal(r.cards.length, 3);
  assert.deepEqual(r.rejected, [{ front: cards[1].front, reason: "tests two things" }]);
  assert.equal(r.revised, 2);
  assert.equal(r.cards[2].back, "Raising the substrate concentration.");
  assert.equal(r.cards[2].grounded, "partly", "a card that started unsupported stays to check, even corrected");
  assert.equal(r.cards[1].revisedBy, "reviewer");
  // a correction that strays from the notes is caught
  const stray = applyReview(cards.slice(0, 1), [{ id: "c1", verdict: "revise", reason: "x", front: "What is an enzyme?", back: "A hormone released by the pituitary gland." }], NOTES);
  assert.equal(stray.cards[0].grounded, "partly");
});

test("a pack that carries its review gives the same reviewed cards every time it's reused", () => {
  const reviewed = { ...PACK, review: { verdicts: [{ id: "c4", verdict: "reject", reason: "unsupported", front: null, back: null }] } };
  const a = cardsFromPack(reviewed, NOTES), b = cardsFromPack(reviewed, NOTES);
  assert.equal(a.length, 3);
  assert.deepEqual(a, b);
  const s = packStats(reviewed, a);
  assert.equal(s.reviewed, true); assert.equal(s.rejected, 1);
  assert.deepEqual(s.levels, { remember: 1, understand: 0, apply: 0, analyse: 2 });
});

test("coverage names the core facts no card tests", () => {
  const reviewed = { ...PACK, review: { verdicts: [{ id: "c4", verdict: "reject", reason: "unsupported", front: null, back: null }] } };
  const c = coverage(reviewed, cardsFromPack(reviewed, NOTES));
  assert.equal(c.core, 4); assert.equal(c.covered, 3);
  assert.deepEqual(c.uncovered, ["Raising substrate overcomes competitive inhibition"]);
  assert.equal(packStats(reviewed, cardsFromPack(reviewed, NOTES)).factCoverage, 0.75);
});
