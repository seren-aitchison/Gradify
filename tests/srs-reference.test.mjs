// Gradify's FSRS-5 against the reference implementation (ts-fsrs 4.7.1, FSRS-5, default parameters, short-term on,
// no fuzz): the same review histories must give the same stability, difficulty and interval.
import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { nextState, intervalFor, W } from "../kit/learning/srs.js";
const { FSRSAlgorithm, generatorParameters } = createRequire(import.meta.url)("ts-fsrs");

const ref = new FSRSAlgorithm(generatorParameters({ enable_fuzz: false, enable_short_term: true }));
function rng(seed) { return () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }; }

test("the parameters are the published FSRS-5 defaults", () => {
  assert.deepEqual(W, ref.parameters.w);
});

test("1,000 random review histories match the reference to 6 decimal places", () => {
  const r = rng(42);
  let checked = 0;
  for (let h = 0; h < 1000; h++) {
    let mine = null, theirs = { difficulty: 0, stability: 0 };
    const steps = 1 + Math.floor(r() * 12);
    for (let k = 0; k < steps; k++) {
      const g = 1 + Math.floor(r() * 4);
      const t = k === 0 ? 0 : r() < 0.15 ? 0 : Math.floor(r() * 60);
      mine = nextState(mine, t, g);
      theirs = ref.next_state(theirs, t, g);
      assert.ok(Math.abs(mine.S - theirs.stability) < 1e-6 * Math.max(1, theirs.stability), `history ${h} step ${k}: S ${mine.S} vs ${theirs.stability}`);
      assert.ok(Math.abs(mine.D - theirs.difficulty) < 1e-6, `history ${h} step ${k}: D ${mine.D} vs ${theirs.difficulty}`);
      const iv = (s) => Math.max(1, Math.round(s));
      assert.equal(iv(intervalFor(mine.S, 0.9)), ref.next_interval(theirs.stability, t), `history ${h} step ${k}: interval`);
      checked++;
    }
  }
  assert.ok(checked > 5000);
});

test("retrievability matches the reference forgetting curve", () => {
  for (const [t, s] of [[1, 1], [10, 3.2], [100, 40], [0, 5]]) assert.ok(Math.abs(ref.forgetting_curve(t, s) - Math.pow(1 + (19 / 81) * t / s, -0.5)) < 1e-8);
});
