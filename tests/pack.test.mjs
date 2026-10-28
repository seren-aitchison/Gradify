// Run: node --experimental-strip-types --test tests/
import { test } from "node:test";
import assert from "node:assert/strict";
import { groundingScore, cardsFromPack, packStats } from "../supabase/functions/_shared/pack.js";

const notes = `CARDIAC CYCLE - lec 4
- systole is the phase when ventricles contract + eject blood
S1 (first heart sound) is caused by closure of the mitral + tricuspid valves`;

test("exact quote is grounded, ignoring case and punctuation", () => {
  assert.equal(groundingScore("Systole is the phase when ventricles contract", notes), 1);
  assert.equal(groundingScore("closure of the mitral + tricuspid valves", notes), 1);
});
test("lightly tidied quote still mostly matches", () => {
  assert.ok(groundingScore("systole is the phase when the ventricles contract and eject blood", notes) >= 0.8);
});
test("invented quote is not grounded", () => {
  assert.ok(groundingScore("the sinoatrial node sets the heart rate", notes) < 0.5);
  assert.equal(groundingScore(null, notes), 0);
});

const pack = {
  topics: [{ name: "Cardiac cycle", facts: [
    { importance: "core", quote: "systole is the phase when ventricles contract", page: null, card: { type: "definition", front: "What is systole?", back: "The phase when the ventricles contract and eject blood." } },
    { importance: "core", quote: "SA node fires 70 times a minute", page: null, card: { type: "definition", front: "What sets the heart rate?", back: "The SA node." } },
    { importance: "bonus", quote: null, page: null, card: { type: "why", front: "Why does S1 happen?", back: "The AV valves close." } },
    { importance: "core", quote: "systole is the phase", page: null, card: { type: "definition", front: "what is systole?", back: "dup" } },
    { importance: "core", quote: "first heart sound", page: null, card: { type: "definition", front: "Name the first heart sound S1", back: "S1" } },
  ] }],
  unclear: ["The notes don't say what causes S2."],
};

test("cards are flagged by grounding, duplicates dropped", () => {
  const cards = cardsFromPack(pack, notes);
  assert.equal(cards.length, 4);
  assert.deepEqual(cards.map((c) => c.grounded), ["yes", "no", "bonus", "yes"]);
});
test("stats catch ungrounded facts and answers leaked into questions", () => {
  const cards = cardsFromPack(pack, notes);
  const s = packStats(pack, cards);
  assert.equal(s.ungrounded, 1);
  assert.equal(s.bonus, 1);
  assert.equal(s.answerLeaks, 1);
  assert.equal(s.unclear, 1);
  assert.ok(Math.abs(s.grounded - 2 / 3) < 1e-9);
});
