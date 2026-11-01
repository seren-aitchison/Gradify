// The models inside the PsychGradify and SocGradify labs (kit/labs/social/, kit/labs/psychology/, kit/labs/sociology/),
// pinned to textbook values, so a change that breaks the statistics or a model fails here rather than in a lesson.
import { test } from "node:test";
import assert from "node:assert/strict";
import * as S from "../kit/labs/social/stats.js";

const near = (a, b, tol, msg) => assert.ok(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);

test("stats: descriptives", () => {
  const a = [2, 4, 4, 4, 5, 5, 7, 9];
  assert.equal(S.mean(a), 5); assert.equal(S.median(a), 4.5); assert.deepEqual(S.modes(a), [4]); assert.equal(S.range(a), 7);
  near(S.variance(a), 32 / 7, 1e-12, "sample variance"); near(S.sd(a), Math.sqrt(32 / 7), 1e-12, "sample SD");
  near(S.skewness([1, 2, 3, 10]), 1.7636, 1e-3, "skewness (Excel SKEW, worked by hand)");
  assert.deepEqual(S.ranks([10, 20, 20, 30]), [1, 2.5, 2.5, 4]);
});

test("stats: distributions match printed tables", () => {
  near(S.normCdf(1.96), 0.975, 1e-4, "Φ(1.96)"); near(S.normInv(0.975), 1.959964, 1e-5, "z 97.5%"); near(S.normInv(0.05), -1.644854, 1e-5, "z 5%");
  near(S.tP2(2.228, 10), 0.05, 5e-4, "t(10) = 2.228"); near(S.tCrit(20), 2.086, 1e-3, "critical t(20)"); near(S.tCrit(1000), 1.962, 2e-3, "t approaches z");
  near(S.fP(3.354, 2, 27), 0.05, 1e-3, "F(2,27) = 3.354"); near(S.chiSquareP(3.841, 1), 0.05, 1e-3, "χ²(1) = 3.841"); near(S.chiSquareP(9.488, 4), 0.05, 1e-3, "χ²(4) = 9.488");
});

test("stats: correlation, regression and tests", () => {
  const x = [1, 2, 3, 4, 5], y = [2, 4, 5, 4, 5];
  const r = S.pearson(x, y); near(r.r, 0.7746, 1e-4, "Pearson r");
  const g = S.regression(x, y); near(g.b, 0.6, 1e-12, "slope"); near(g.a, 2.2, 1e-12, "intercept"); near(g.r2, 0.6, 1e-12, "R²");
  near(S.spearman([1, 2, 3, 4, 5], [5, 6, 7, 8, 7]).rho, 0.8208, 1e-3, "Spearman with a tie");
  const m = S.multiple([[1, 2], [2, 1], [3, 4], [4, 3], [5, 6]], [9, 8, 19, 18, 29]); m.b.forEach((v, i) => near(v, [1, 2, 3][i], 1e-9, `multiple regression b${i}`)); near(m.r2, 1, 1e-12, "exact fit");
  const t = S.tIndependent([5, 6, 7, 8, 9], [3, 4, 5, 6, 7]); near(t.t, 2, 1e-12, "independent t"); assert.equal(t.df, 8); near(t.d, 1.2649, 1e-4, "Cohen's d");
  const p = S.tPaired([10, 12, 13, 15], [8, 11, 11, 12]); near(p.t, 4.899, 1e-3, "paired t (differences 2, 1, 2, 3)"); assert.equal(p.df, 3);
  const A = S.anova([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); near(A.F, 27, 1e-9, "ANOVA F"); assert.deepEqual([A.d1, A.d2], [2, 6]); near(A.eta2, 0.9, 1e-12, "η²");
  const c = S.chiSquare([[10, 20], [20, 10]]); near(c.x2, 6.6667, 1e-3, "χ² 2×2"); assert.equal(c.df, 1); near(c.V, 0.3333, 1e-3, "Cramér's V");
  near(S.powerT(0.5, 64), 0.80, 0.015, "power d = 0.5, n = 64 per group");
  near(S.powerT(0, 30), 0.05, 0.005, "power at d = 0 is alpha");
});

test("stats: inequality measures", () => {
  near(S.gini([1, 2, 3, 4, 5]), 4 / 15, 1e-12, "Gini of 1..5"); assert.equal(S.gini([5, 5, 5, 5]), 0); near(S.gini([0, 0, 0, 10]), 0.75, 1e-12, "one person holds everything (n = 4)");
  near(S.giniFromShares([20, 20, 20, 20, 20]), 0, 1e-12, "equal quintiles"); assert.ok(S.giniFromShares([5, 10, 15, 25, 45]) > 0.35);
  const pv = S.povertyRate([10, 20, 30, 40, 50]); assert.equal(pv.line, 18); assert.equal(pv.rate, 0.2);
});

test("psychology: Rescorla–Wagner acquisition, extinction and blocking", async () => {
  const { rw, DESIGNS } = await import("../kit/labs/psychology/conditioning.js");
  const one = rw([{ cs: ["A"], us: true }], { alpha: { A: 0.5 }, beta: 0.5, lambda: 1 }); near(one[0].A, 0.25, 1e-12, "first trial ΔV = αβλ");
  const acq = rw(DESIGNS.acquisition.phases[0][1]); assert.ok(acq.at(-1).A > 0.9 && acq.at(-1).A < 1, "approaches λ");
  const ext = rw(DESIGNS.extinction.phases.flatMap((p) => p[1])); assert.ok(ext.at(-1).A < 0.15, "extinguishes");
  const block = rw(DESIGNS.blocking.phases.flatMap((p) => p[1])).at(-1), ctrl = rw(DESIGNS.control.phases.flatMap((p) => p[1])).at(-1);
  assert.ok(block.X < 0.1 && ctrl.X > 0.4, `blocking: X ${block.X} vs control ${ctrl.X}`);
});

test("psychology: signal detection rates and d′", async () => {
  const { rates, fromRates } = await import("../kit/labs/psychology/sdt.js");
  const r = rates(1, 0.5); near(r.hit, 0.6915, 1e-4, "hit rate"); near(r.fa, 0.3085, 1e-4, "false alarms");
  const b = fromRates(0.84134, 0.15866); near(b.d, 2, 1e-3, "d′ from rates"); near(b.c, 0, 1e-3, "neutral bias");
});

test("psychology: reinforcement schedules show their signature patterns", async () => {
  const { simulate } = await import("../kit/labs/psychology/schedules.js");
  const fr = simulate({ kind: "FR", value: 10 }), vi = simulate({ kind: "VI", value: 30 });
  assert.ok(fr.resp.length > vi.resp.length, "ratio schedules give higher rates than interval schedules");
  const extinction = (k) => { const R = simulate({ kind: k, value: 10, extinctAt: 300 }); return R.resp.filter((t) => t >= 300).length; };
  assert.ok(extinction("VR") > extinction("CRF"), "partial reinforcement extinction effect");
});

test("psychology: memory scoring and the Stroop summary", async () => {
  const { scoreRecall } = await import("../kit/labs/psychology/memory.js");
  assert.deepEqual(scoreRecall(["apple", "river", "candle"], "Candle, apple"), [true, false, true]);
  const { summarise, makeTrials } = await import("../kit/labs/psychology/stroop.js");
  const t = makeTrials("colour", 8); assert.equal(t.length, 24); assert.equal(t.filter((x) => x.cond === "incongruent" && x.word.toLowerCase() === x.ink).length, 0, "incongruent words never match their ink");
  const s = summarise([{ cond: "congruent", rt: 500, correct: true }, { cond: "incongruent", rt: 650, correct: true }, { cond: "incongruent", rt: 900, correct: false }, { cond: "neutral", rt: 550, correct: true }]);
  assert.equal(s.interference, 150); assert.equal(s.by.incongruent.errors, 1);
  const { slope } = await import("../kit/labs/psychology/search.js");
  const tr = [4, 12, 24].flatMap((n) => [{ type: "conjunction", n, present: true, correct: true, rt: 400 + 25 * n }]);
  near(slope(tr, "conjunction").slope, 25, 1e-9, "search slope");
});

test("stats lab: Anscombe's quartet has the published summary statistics", async () => {
  const { ANSCOMBE } = await import("../kit/labs/social/statslab.js");
  for (const [k, { x, y }] of Object.entries(ANSCOMBE)) {
    near(S.mean(x), 9, 1e-9, `${k} mean x`); near(S.mean(y), 7.50, 0.01, `${k} mean y`);
    near(S.pearson(x, y).r, 0.816, 0.002, `${k} r`); const R = S.regression(x, y); near(R.a, 3.00, 0.01, `${k} intercept`); near(R.b, 0.500, 0.001, `${k} slope`);
  }
});

test("psychometrics: score conversions and the standard error of measurement", async () => {
  const { interpret } = await import("../kit/labs/psychology/psychometric.js");
  const a = interpret(130, "iq", 0.9); near(a.z, 2, 1e-12, "z"); near(a.pct, 97.72, 0.01, "percentile"); near(a.t, 70, 1e-9, "T"); assert.equal(a.stanine, 9); near(a.sem, 15 * Math.sqrt(0.1), 1e-12, "SEM");
  near(interpret(40, "t").iq, 85, 1e-9, "T 40 is a standard score of 85");
});

test("psychology: the two-process model of sleep", async () => {
  const { simulate } = await import("../kit/labs/psychology/sleep.js");
  const R = simulate({ bed: 23, wake: 7, days: 3 });
  const at = (h) => R.reduce((b, p) => (Math.abs(p.t - h) < Math.abs(b.t - h) ? p : b));
  assert.ok(at(48 + 23).S > at(48 + 7).S, "pressure is higher at bedtime than on waking");
  const late = simulate({ bed: 3, wake: 7, days: 3 }), lateMax = Math.max(...late.map((p) => p.S)), normMax = Math.max(...R.map((p) => p.S));
  assert.ok(lateMax > normMax, "staying up late raises peak sleep pressure");
  near(1 - (1 - 0) * Math.exp(-18.2 / 18.2), 0.632, 1e-3, "S rises 63% of the way in one time constant");
});

test("sociology: mobility matrices, poverty scenarios and real quintile data", async () => {
  const { matrix, absolute, oddsRatio } = await import("../kit/labs/sociology/mobility.js");
  for (const f of [0, 0.4, 1]) for (const row of matrix(f, 0.2)) near(row.reduce((a, b) => a + b, 0), 1, 1e-12, "each row of a transition matrix sums to 1");
  near(oddsRatio(matrix(1, 0)), 1, 1e-12, "perfect fluidity gives an odds ratio of 1");
  assert.ok(oddsRatio(matrix(0.2, 0)) > oddsRatio(matrix(0.6, 0)), "less fluidity, more unequal relative chances");
  near(oddsRatio(matrix(0.4, 0)), oddsRatio(matrix(0.4, 0.3)), 1.5, "structural change alone barely moves relative chances");
  assert.ok(absolute([0.55, 0.25, 0.2], matrix(0.4, 0.3)) > absolute([0.55, 0.25, 0.2], matrix(0.4, 0)), "structural change raises absolute mobility");
  const { population, SCENARIOS, quintiles } = await import("../kit/labs/sociology/inequality.js");
  const base = population();
  near(S.povertyRate(SCENARIOS.all10[1](base)).rate, S.povertyRate(base).rate, 1e-12, "a uniform rise leaves relative poverty unchanged");
  assert.ok(S.povertyRate(SCENARIOS.middle[1](base)).rate > S.povertyRate(base).rate, "middle incomes rising raises relative poverty");
  const se = quintiles("SWE"), za = quintiles("ZAF");
  assert.ok(se && za && S.giniFromShares(za.shares) > S.giniFromShares(se.shares), "South Africa is more unequal than Sweden");
  assert.ok(S.giniFromShares(za.shares) * 100 < za.gini, "grouped data understates the published Gini");
});

test("sociology: network measures, sampling bias and the transition model", async () => {
  const { betweenness, degree, density, components, PRESETS } = await import("../kit/labs/sociology/network.js");
  const star = PRESETS.star; assert.equal(betweenness(star.n, star.e)[0], 28, "star centre lies on all C(8,2) = 28 paths");
  assert.deepEqual(betweenness(3, [[0, 1], [1, 2]]), [0, 1, 0]); assert.equal(degree(star.n, star.e)[0], 8); near(density(4, [[0, 1], [1, 2], [2, 3]]), 0.5, 1e-12, "density");
  assert.equal(components(4, [[0, 1], [2, 3]]), 2);
  const c = PRESETS.clusters, bt = betweenness(c.n, c.e); assert.ok([4, 5, 6].includes(bt.indexOf(Math.max(...bt))) && Math.min(bt[4], bt[5], bt[6]) > 3 * Math.max(...bt.filter((_, i) => ![4, 5, 6].includes(i))), "the people on the bridge (E, F, G) have by far the highest betweenness");
  const { makePopulation, METHODS } = await import("../kit/labs/sociology/sampling.js");
  const P = makePopulation(), truth = S.mean(P.map((p) => p.hours)), r = S.rng(5);
  const est = (m) => S.mean(Array.from({ length: 200 }, () => S.mean(METHODS[m][1](P, 100, r).map((p) => p.hours))));
  assert.ok(Math.abs(est("random") - truth) < 1, "random sampling is unbiased"); assert.ok(est("opportunity") - truth < -3, "the online poll is biased"); assert.ok(Math.abs(est("volunteer") - truth) > 3, "volunteers are biased");
  const { project } = await import("../kit/labs/sociology/population.js");
  const R = project([40, 40, 40, 40, 40]); assert.equal(R.length, 200); assert.ok(R[119].P > R[39].P * 2, "stages 2 and 3 drive growth"); assert.ok(R[199].P < R[159].P, "stage 5 declines");
});

test("sociology: content analysis counts and method recommendations", async () => {
  const { analyse, EXAMPLE, DEFAULT_CATS } = await import("../kit/labs/sociology/content.js");
  const A = analyse("The cheat, the cheats and food bank queues. Food bank use rises.", "Deviance: cheat, cheats\nHardship: food bank");
  assert.equal(A.words, 12); assert.deepEqual(A.rows.map((r) => r.n), [2, 2]);
  assert.ok(analyse(EXAMPLE, DEFAULT_CATS).rows.every((r) => r.n > 0));
  const { recommend } = await import("../kit/labs/sociology/methods.js");
  assert.match(recommend({ aim: "measure", scale: "large", access: "yes", topic: "no", time: "no" })[0][0], /survey/i);
  assert.match(recommend({ aim: "understand", scale: "small", access: "hidden", topic: "no", time: "no" })[0][0], /observation|ethnograph/i);
  assert.ok(recommend({ aim: "measure", scale: "small", access: "none", topic: "yes", time: "yes" }).length >= 3);
});
