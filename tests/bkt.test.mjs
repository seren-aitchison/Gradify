import { test } from "node:test";
import assert from "node:assert/strict";
import { bktTrace, fitBkt, bktSequence, knows, paramsFor } from "../kit/learning/bkt.js";
import { BKT_PARAMS } from "../kit/learning/bkt-params.js";
import { evidenceFromAttempts, sixProfile } from "../kit/learning/mastery.js";
import { stabilityOf, objectiveReadiness } from "../kit/intel/readiness.js";

const DAY = 864e5, T0 = Date.UTC(2026, 10, 1, 9);
const iso = (t) => new Date(t).toISOString();
const attempt = (i, score, o = {}) => ({ at: iso(T0 + i * DAY), score, lesson: "u01-01", subject: "law", site: "LawGradify", unit: "u01", context: "lesson", attempt: 1,
  question: { id: `q${o.q ?? i}`, type: "sba", d: 2, objectives: [1] }, ...o.extra });

test("the parameters were fitted, say where from, and are sensible", () => {
  const p = BKT_PARAMS.default;
  for (const k of ["L0", "T", "G", "S"]) assert.ok(p[k] > 0 && p[k] < 1, k);
  assert.ok(p.G < 0.5 && p.S < 0.5, "guess and slip below 0.5, so knowing means more likely right");
  assert.ok(p.answers > 1000, "fitted on enough answers");
  assert.match(BKT_PARAMS.source, /\S/);
  assert.equal(paramsFor("no-such-subject"), BKT_PARAMS.default);
});

test("right answers raise the chance a learner knows it, a slip doesn't erase it, and a wrong run lowers it", () => {
  const P = { L0: 0.1, T: 0.1, G: 0.25, S: 0.1 };
  const rising = bktTrace([1, 1, 1, 1], P).known;
  assert.ok(rising.every((x, i) => i === 0 || x > rising[i - 1]));
  assert.ok(bktTrace([1, 1, 1, 1, 0], P).L > 0.5, "one slip after four right answers still reads as probably known");
  assert.ok(bktTrace([0, 0, 0, 0], P).L < P.L0 + P.T);
});

test("fitting recovers the parameters that generated the answers", () => {
  // answers drawn from a known BKT model (a fixed pseudo-random sequence, so the test is deterministic)
  let seed = 7; const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const truth = { L0: 0.21, T: 0.147, G: 0.21, S: 0.098 }, seqs = [];
  for (let u = 0; u < 400; u++) {
    let known = rand() < truth.L0; const ys = [];
    for (let i = 0; i < 10; i++) { ys.push(known ? (rand() < 1 - truth.S ? 1 : 0) : rand() < truth.G ? 1 : 0); if (!known && rand() < truth.T) known = true; }
    seqs.push(ys);
  }
  const fit = fitBkt(seqs);
  for (const k of ["L0", "T", "G", "S"]) assert.ok(Math.abs(fit[k] - truth[k]) < 0.1, `${k}: fitted ${fit[k].toFixed(3)}, true ${truth[k]}`);
});

test("only unaided answers count, and drilling one question on the same day counts once", () => {
  const drilled = [0, 1, 2, 3].map((i) => attempt(0, 1, { q: 1, extra: { at: iso(T0 + i * 60000) } }));
  assert.deepEqual(bktSequence(evidenceFromAttempts(drilled)), [1]);
  const assisted = [attempt(0, 1, { extra: { attempt: 2 } })];
  assert.equal(knows(evidenceFromAttempts(assisted)), null, "a second try after feedback isn't evidence of knowing");
  assert.equal(knows([]), null);
});

test("overall mastery is the probability of knowing, shown only once two dimensions have enough evidence", () => {
  const few = sixProfile(evidenceFromAttempts([attempt(0, 1), attempt(1, 1)]));
  assert.equal(few.mastery, null, "two answers aren't a measurement");
  assert.ok(few.knows && few.knows.answers === 2);
  const list = [];
  for (let i = 0; i < 8; i++) list.push(attempt(i, 1), attempt(i, 1, { q: 100 + i, extra: { question: { id: `s${i}`, type: "short", d: 2, objectives: [1] } } }));
  const prof = sixProfile(evidenceFromAttempts(list), { now: T0 + 9 * DAY });
  assert.ok(prof.measured.length >= 2);
  assert.equal(prof.mastery, prof.knows.p);
  assert.ok(prof.mastery > 0.9, `a long run of right answers reads as known (${prof.mastery})`);
});

test("readiness memory grows with each spaced success, and a forgotten objective falls to the guessing rate, not zero", () => {
  const once = stabilityOf([{ t: T0, score: 1 }]);
  const spaced = stabilityOf([0, 2, 7, 20].map((d) => ({ t: T0 + d * DAY, score: 1 })));
  assert.ok(spaced > once * 3, `spaced successes last longer (${once.toFixed(1)} → ${spaced.toFixed(1)} days)`);
  assert.ok(stabilityOf([{ t: T0, score: 1 }, { t: T0 + 3 * DAY, score: 0 }]) < once + 1, "a wrong answer doesn't lengthen it");
  const old = [0, 1].map((i) => attempt(i, 1));
  const { objectives } = objectiveReadiness({ attempts: old, examDate: new Date(T0 + 400 * DAY).toISOString().slice(0, 10), now: T0 + 2 * DAY });
  assert.ok(objectives[0].p >= paramsFor("law").G - 0.01, `long after, readiness rests at the guessing rate (${objectives[0].p.toFixed(2)})`);
});
