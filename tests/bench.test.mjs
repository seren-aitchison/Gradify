// The Gradify Intelligence benchmarks (scripts/bench.mjs): the metrics are right, the simulators are deterministic,
// and the engines still score what the recorded baseline says. A change to an engine that moves a number must update
// tests/fixtures/bench/baseline.json (npm run bench -- --write-baseline) in the same pull request.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { logLoss, brier, auc, calibration, intervalCoverage } from "../scripts/bench/metrics.mjs";
import { rng, simulateReviews } from "../scripts/bench/simulate.mjs";
import { bktTrace } from "../scripts/bench/bkt.mjs";
import { syntheticSuite } from "../scripts/bench.mjs";

test("metrics: log loss, Brier, AUC and calibration match hand-worked values", () => {
  assert.ok(Math.abs(logLoss([0.5, 0.5], [1, 0]) - Math.LN2) < 1e-9);
  assert.equal(brier([1, 0, 0.5], [1, 0, 1]), 0.25 / 3);
  assert.equal(auc([0.1, 0.4, 0.35, 0.8], [0, 0, 1, 1]), 0.75);
  assert.equal(auc([0.5, 0.5], [0, 1]), 0.5, "ties count half");
  assert.equal(auc([0.2, 0.3], [1, 1]), null, "undefined with one class");
  const c = calibration([0.15, 0.15, 0.85, 0.85], [0, 1, 1, 1]);
  assert.ok(Math.abs(c.ece - (0.5 * 0.35 + 0.5 * 0.15)) < 1e-9);
  assert.equal(intervalCoverage([{ lo: 0.2, hi: 0.6, truth: 0.5 }, { lo: 0.2, hi: 0.4, truth: 0.5 }]), 0.5);
});

test("BKT follows the published update: a right answer raises P(known), a wrong one lowers it", () => {
  const { pred, known } = bktTrace([1, 0], { L0: 0.5, T: 0, G: 0.2, S: 0.1 });
  assert.ok(Math.abs(pred[0] - 0.55) < 1e-9);
  assert.ok(Math.abs(known[0] - 0.45 / 0.55) < 1e-9);
  assert.ok(known[1] < known[0]);
});

test("simulators are deterministic for a seed and realistic in their recall rate", () => {
  assert.deepEqual([rng(7).next(), rng(7).next()], [rng(7).next(), rng(7).next()]);
  const a = simulateReviews({ seed: 9, learners: 4, cards: 10, days: 40 }), b = simulateReviews({ seed: 9, learners: 4, cards: 10, days: 40 });
  assert.deepEqual(a, b);
  const later = a.filter((r) => !r.first), kept = later.filter((r) => r.rating !== "again").length / later.length;
  assert.ok(kept > 0.7 && kept < 0.97, `remembered ${kept}`);
});

test("benchmarks match the recorded baseline (update it on purpose when an engine changes)", async () => {
  const base = JSON.parse(await readFile(new URL("./fixtures/bench/baseline.json", import.meta.url), "utf8"));
  const now = await syntheticSuite();
  const diffs = [];
  const walk = (a, b, path) => {
    if (typeof a === "number" && typeof b === "number") { if (Math.abs(a - b) > 0.002) diffs.push(`${path}: baseline ${a}, now ${b}`); return; }
    if (a && typeof a === "object") for (const k of new Set([...Object.keys(a), ...Object.keys(b || {})])) walk(a[k], b?.[k], `${path}.${k}`);
    else if (a !== b) diffs.push(`${path}: baseline ${a}, now ${b}`);
  };
  walk(base, now, "bench");
  assert.deepEqual(diffs, [], "results moved: if the change is intended, run `npm run bench -- --write-baseline` and explain the movement in the PR");
  // hard rules that hold whatever the baseline says
  assert.deepEqual(Object.values(now.plan.violations), [0, 0, 0, 0, 0], "Smart Plan never breaks a hard constraint");
});
