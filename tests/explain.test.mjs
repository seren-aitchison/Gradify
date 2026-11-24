// Adaptive explanations (kit/learning/explain.js): every way is built from the lesson's notes, the question picks the
// part of the lesson to explain, and the choice follows the evidence of what works.
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseNotes } from "../kit/course/notes.js";
import { explain, available, focusOf, rank, record, STRATEGIES } from "../kit/learning/explain.js";

const [L] = parseNotes(`## Osmosis
S: How water crosses membranes.
H: Diffusion
P: Diffusion is the net movement of particles from high to low concentration. It needs no energy.
H: Osmosis
P: Osmosis is the net movement of water across a partially permeable membrane. Water moves from higher to lower water potential. A cell in pure water gains water.
K: Water moves down a water potential gradient.
X: Predict what happens to a red blood cell in pure water.
> Pure water has a higher water potential than the cytoplasm.
> Water enters by osmosis and the cell bursts.
!: Saying water moves to where there is less water mixes up concentration and water potential.
T: Water potential | the tendency of water to move out of a solution, in kPa
T: Partially permeable membrane | a membrane that lets some molecules through but not others`);
const Q = { q: "Which way does water move by osmosis?", why: "Down the water potential gradient.", options: [{ text: "From higher to lower water potential", correct: true }, { text: "Towards more water", correct: false }] };

test("the question picks the part of the lesson to explain", () => {
  assert.equal(focusOf(L, Q).h, "Osmosis");
});

test("every way comes from the notes, and a way the notes can't support isn't offered", () => {
  const steps = explain("steps", L, Q);
  assert.ok(steps.parts.length >= 2 && steps.parts.every((p) => L.blocks.some((b) => (b.x || "").includes(p.text.slice(0, 20)))), "steps are the lesson's own sentences");
  assert.match(explain("example", L, Q).parts[0].text, /red blood cell/);
  assert.equal(explain("words", L, Q).parts[0].term, "Water potential");
  assert.match(explain("mistake", L, Q).parts[0].text, /less water/);
  assert.ok(explain("talk", L, Q).parts.every((p) => p.answer));
  const [thin] = parseNotes(`## Thin\nP: Just one line here.`);
  assert.deepEqual(available(thin, null), ["visual"], "only what the notes can support");
  assert.ok(!available(L, Q).includes("ai") && available(L, Q, { ai: true }).includes("ai"));
  assert.equal(Object.keys(STRATEGIES).length, 7);
});

test("the choice follows the evidence: what has worked for this learner comes first, most of the time", () => {
  let s = 1; const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const stats = { example: { ok: 9, no: 1 }, steps: { ok: 1, no: 9 } };
  let first = 0; for (let i = 0; i < 200; i++) if (rank(["steps", "example", "talk"], stats, {}, rand)[0] === "example") first++;
  assert.ok(first > 130, `example first ${first}/200`);
  assert.ok(first < 200, "other ways still get a turn, so no learner is labelled");
  // with no evidence of their own, consented population outcomes tip the balance, but only up to 10 answers' worth
  let pop = 0; for (let i = 0; i < 200; i++) if (rank(["steps", "talk"], {}, { talk: { ok: 800, no: 200 }, steps: { ok: 200, no: 800 } }, rand)[0] === "talk") pop++;
  assert.ok(pop > 120 && pop < 200, `population prior ${pop}/200`);
  assert.deepEqual(record(stats, "example"), { ok: 9, no: 1, n: 10, rate: 0.9 });
});
