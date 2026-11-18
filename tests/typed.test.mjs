// Typed recall (kit/learning/typed.js): how close a typed answer is, and the rating it suggests.
import { test } from "node:test";
import assert from "node:assert/strict";
import { gradeTyped } from "../kit/learning/typed.js";

const v = (t, e) => gradeTyped(t, e)?.verdict;

test("the right answer is right, whatever the case, punctuation, word order or article", () => {
  assert.equal(v("Chloroplasts", "chloroplasts"), "right");
  assert.equal(v("the stroma", "stroma."), "right");
  assert.equal(v("temperature, light intensity", "light intensity, temperature"), "right");
  assert.equal(gradeTyped("RuBisCO", "RuBisCO").suggest, "good");
});

test("a slip of a letter is nearly right: a typo in a long word still suggests Good, a short one Hard", () => {
  assert.deepEqual([v("chloroplats", "chloroplasts"), gradeTyped("chloroplats", "chloroplasts").suggest], ["close", "good"]);
  assert.deepEqual([v("photolisis", "photolysis"), gradeTyped("photolisis", "photolysis").suggest], ["close", "good"]);
  assert.deepEqual([v("stoma", "stroma"), gradeTyped("stoma", "stroma").suggest], ["close", "hard"], "stoma is a different word");
  assert.equal(v("ATP", "ADP"), "wrong", "three-letter terms must be exact");
});

test("numbers must be exact", () => {
  assert.equal(v("1817", "1818"), "wrong");
  assert.equal(v("1818", "1818"), "right");
});

test("the answer with a little extra is right; a different answer is wrong", () => {
  assert.equal(v("in the stroma of the chloroplast", "stroma"), "right");
  assert.equal(v("thylakoid", "stroma"), "wrong");
  assert.equal(gradeTyped("thylakoid", "stroma").suggest, "again");
});

test("longer answers are graded by the key words recalled", () => {
  const e = "Amount of blood ejected by each ventricle per beat.";
  assert.equal(v("the amount of blood each ventricle ejects per beat", e), "right");
  assert.equal(v("blood pumped per beat", e), "partial");
  assert.equal(gradeTyped("blood pumped per beat", e).suggest, "hard");
  assert.equal(v("how fast the heart beats", e), "wrong");
});

test("nothing typed means nothing to grade", () => {
  assert.equal(gradeTyped("  ", "stroma"), null);
  assert.equal(gradeTyped("the", "stroma"), null);
});

test("an answer that negates the card is wrong, however many words match", () => {
  // short answers: the opposite of the answer
  assert.deepEqual([v("not vector", "vector"), gradeTyped("not vector", "vector").suggest], ["wrong", "again"]);
  assert.equal(v("vector", "not a vector"), "wrong", "leaving out the card's not is the opposite too");
  assert.equal(v("it isn't reversible", "reversible"), "wrong", "contractions count");
  assert.equal(v("no", "yes"), "wrong");
  // the same negation on both sides is fine, and the positive answer is still right
  assert.equal(v("vector", "vector"), "right");
  assert.equal(v("not a vector", "not a vector"), "right");
  assert.equal(v("No", "no"), "right");
  // longer answers: the key words may all be there, but a flipped meaning is at most partial
  const e = "Amount of blood ejected by each ventricle per beat.";
  assert.deepEqual([v("the amount of blood each ventricle does not eject per beat", e), gradeTyped("the amount of blood each ventricle does not eject per beat", e).suggest], ["partial", "hard"]);
  assert.equal(v("the reaction does not need light", "The reaction needs light energy to split water"), "partial");
});
