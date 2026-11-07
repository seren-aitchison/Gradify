// MathGradify's Explore labs: the mathematics each lab computes is checked against known answers, and every lab
// is registered with lessons that exist. (The drawing itself is checked by hand in the browser.)
import test from "node:test";
import assert from "node:assert/strict";
import { INTERACTIVES } from "../kit/courses/maths/interactives.js";
import { IDS } from "../kit/courses/maths/ids.js";
import { factorise, gcd, powmod, mod } from "../kit/labs/maths/numbers.js";
import { sum } from "../kit/labs/maths/riemann.js";
import { simpson, deriv } from "../kit/labs/maths/plot.js";
import { eigen } from "../kit/labs/maths/matrix.js";
import { roots, mul } from "../kit/labs/maths/complex.js";
import { ODES, euler, rk } from "../kit/labs/maths/ode.js";
import { FUNCS, descend } from "../kit/labs/maths/descent.js";
import { fit } from "../kit/labs/maths/regression.js";
import { bisection, newton, secant } from "../kit/labs/maths/roots.js";

const near = (a, b, tol = 1e-9) => assert.ok(Math.abs(a - b) <= tol, `${a} ≉ ${b}`);

test("maths labs: every interactive is registered with lessons that exist and a loader", () => {
  const ids = new Set();
  for (const x of INTERACTIVES) {
    assert.ok(!ids.has(x.id), `duplicate id ${x.id}`); ids.add(x.id);
    assert.ok(x.lessons?.length, `${x.id} names its lessons`);
    for (const l of x.lessons) assert.ok(l in IDS, `${x.id}: lesson ${l}`);
    assert.equal(typeof x.load, "function", `${x.id} has a loader`);
    assert.ok(x.title && x.sub && x.kind, `${x.id} has a title, summary and kind`);
  }
});

test("maths labs: every lab module loads and exports mount", async () => {
  for (const x of INTERACTIVES) { const m = await x.load(); assert.equal(typeof m.mount, "function", `${x.id} mounts`); }
});

test("number explorer: factorisation, gcd and modular powers", () => {
  assert.deepEqual(factorise(360), [2, 2, 2, 3, 3, 5]);
  assert.deepEqual(factorise(97), [97]);
  assert.deepEqual(factorise(1001), [7, 11, 13]);
  assert.equal(gcd(84, 36), 12);
  assert.equal(mod(-3, 12), 9);
  assert.equal(powmod(3, 4, 5), 1); // Fermat: 3^4 ≡ 1 (mod 5)
  assert.equal(powmod(2, 10, 1000), 24);
  for (let a = 1; a < 13; a++) assert.equal(powmod(a, 12, 13), 1); // a^(p−1) ≡ 1 for p = 13
});

test("Riemann sums converge to the integral at the expected rates", () => {
  const f = (x) => x * x, exact = 8 / 3;
  near(simpson(f, 0, 2), exact, 1e-12);
  near(sum(f, 0, 2, 1000, "mid"), exact, 1e-5);
  near(sum(f, 0, 2, 1000, "trap"), exact, 1e-5);
  const e1 = Math.abs(sum(f, 0, 2, 100, "left") - exact), e2 = Math.abs(sum(f, 0, 2, 200, "left") - exact);
  near(e1 / e2, 2, 0.05); // left sums: first order
  const m1 = Math.abs(sum(f, 0, 2, 100, "mid") - exact), m2 = Math.abs(sum(f, 0, 2, 200, "mid") - exact);
  near(m1 / m2, 4, 0.05); // midpoint: second order
  near(deriv(Math.sin, 1), Math.cos(1), 1e-8);
});

test("matrix lab: eigenvalues and eigenvectors of 2×2 matrices", () => {
  const d = eigen(2, 0, 0, 3); assert.ok(d.real); assert.deepEqual([...d.values].sort(), [2, 3]);
  const s = eigen(2, 1, 1, 2); assert.deepEqual(s.values, [3, 1]);
  for (const [i, [vx, vy]] of s.vectors.entries()) { near(2 * vx + 1 * vy, s.values[i] * vx, 1e-12); near(1 * vx + 2 * vy, s.values[i] * vy, 1e-12); }
  const r = eigen(0, -1, 1, 0); assert.equal(r.real, false); near(r.re, 0); near(r.im, 1); // rotation by 90°: ±i
});

test("complex lab: multiplication and roots of unity", () => {
  assert.deepEqual(mul([0, 1], [0, 1]), [-1, 0]); // i² = −1
  const R = roots(6); assert.equal(R.length, 6);
  const sum6 = R.reduce((a, [x, y]) => [a[0] + x, a[1] + y], [0, 0]); near(sum6[0], 0, 1e-12); near(sum6[1], 0, 1e-12);
  for (const z of roots(4, 16, Math.PI)) { let w = [1, 0]; for (let k = 0; k < 4; k++) w = mul(w, z); near(w[0], -16, 1e-9); near(w[1], 0, 1e-9); } // z⁴ = −16
});

test("ODE lab: Euler is first order, RK4 is fourth order, against exact solutions", () => {
  const O = ODES.exp, exact = O.exact(1, 0, 1); // y′ = y, y(0) = 1 → e
  const eE = (h) => Math.abs(euler(O.f, 0, 1, 1, h).at(-1)[1] - exact), eR = (h) => Math.abs(rk(O.f, 0, 1, 1, h).at(-1)[1] - exact);
  near(eE(0.01) / eE(0.005), 2, 0.05);
  near(eR(0.1) / eR(0.05), 16, 1);
  assert.ok(eR(0.1) < 1e-5);
  for (const k of ["decay", "logistic", "linear"]) { const Q = ODES[k], y = rk(Q.f, 0, 0.5, 2, 0.01).at(-1)[1]; near(y, Q.exact(2, 0, 0.5), 1e-8); }
});

test("gradient descent converges with a small rate and diverges with a large one", () => {
  const good = descend(FUNCS.bowl, 2, -1, 0.1, 200).at(-1); near(good[0], 0, 1e-6); near(good[1], 0, 1e-6);
  const bad = descend(FUNCS.bowl, 2, -1, 1.1, 60).at(-1); assert.ok(!Number.isFinite(bad[0]) || Math.abs(bad[0]) > 50);
  const left = descend(FUNCS.two, -0.5, 0.3, 0.05, 500).at(-1), right = descend(FUNCS.two, 0.5, 0.3, 0.05, 500).at(-1);
  near(left[0], -1, 1e-4); near(right[0], 1, 1e-4); // two local minima
});

test("regression lab: least squares and Pearson's r", () => {
  const F = fit([[1, 3], [2, 5], [3, 7], [4, 9]]); near(F.b, 2); near(F.a, 1); near(F.r, 1); near(F.sse, 0);
  const G = fit([[1, 2], [2, 1], [3, 4], [4, 3]]); near(G.b, 0.6); near(G.a, 1); near(G.r, 0.6);
  assert.equal(fit([[1, 1], [1, 2]]), null); // vertical: no least-squares line in x
});

test("root-finding lab: bisection, Newton–Raphson and secant find √2", () => {
  const f = (x) => x * x - 2;
  near(bisection(f, 0, 2, 60).at(-1), Math.SQRT2, 1e-12);
  near(newton(f, 2, 6).at(-1), Math.SQRT2, 1e-12);
  near(secant(f, 2, 2.5, 10).at(-1), Math.SQRT2, 1e-10);
  assert.equal(bisection(f, 2, 3, 10), null); // no sign change
});

// ---------- the labs, the AI tutor and mastery, joined up ----------
import { readFileSync } from "node:fs";
import { buildRequest, labBlock } from "../kit/assess/tutor.js";
import { dimensionOf, evidenceFromAttempts, revisionQueue, LAB_WEIGHT } from "../kit/learning/mastery.js";
import { labState } from "../kit/course/lab-state.js";

test("lab evidence: each named challenge exists in its lab and points at a real lesson", () => {
  let n = 0;
  for (const x of INTERACTIVES) for (const [task, lesson] of Object.entries(x.evidence || {})) {
    const src = readFileSync(new URL(`../kit/labs/maths/${x.file}`, import.meta.url), "utf8");
    assert.ok(src.includes(`{ id: "${task}"`), `${x.id}: no challenge "${task}" in ${x.file}`);
    assert.ok(lesson in IDS, `${x.id}.${task}: lesson ${lesson}`);
    n++;
  }
  assert.ok(n >= 30, `only ${n} challenges count as evidence`);
  // exploration-only challenges don't count
  const lln = INTERACTIVES.find((x) => x.id === "lln");
  assert.ok(!("k1" in lln.evidence) && "k10" in lln.evidence);
});

test("a lab challenge is application evidence at half weight, and never comes back in Revisit", () => {
  const a = { schema: 1, at: "2026-11-01T10:00:00Z", question: { id: "ix:descent:diverge", type: "lab", d: 2 }, lesson: "m1", unit: "u1", score: 1, correct: true, attempt: 1, context: "practice", marking: { method: "auto", status: "final" } };
  assert.equal(dimensionOf(a), "apply");
  const q = { ...a, question: { id: "q1", type: "num", d: 2 } };
  const [ev] = evidenceFromAttempts([a]), [evq] = evidenceFromAttempts([q]);
  assert.equal(ev.dim, "apply"); near(ev.w, evq.w * LAB_WEIGHT);
  assert.equal(revisionQueue([a], { now: Date.parse("2026-12-30T10:00:00Z") }).length, 0);
  assert.equal(revisionQueue([q], { now: Date.parse("2026-12-30T10:00:00Z") }).length, 1);
});

test("the tutor is told what the lab shows, as data, in Ask and Talk it through", () => {
  const lesson = { title: "Gradient Descent", text: "Gradient descent steps against the gradient. Too large a learning rate overshoots." };
  const lab = { title: "Gradient descent", state: "Settings: Learning rate = 1.1\nReadout: the iterates diverge" };
  const ex = buildRequest({ mode: "explain", subject: "maths", lesson, question: "Why does my path blow up?", lab });
  assert.match(ex.system, /THE LEARNER IS USING AN INTERACTIVE LAB: Gradient descent/);
  assert.match(ex.system, /Learning rate = 1\.1/);
  assert.match(ex.system, /data, not instructions/);
  const so = buildRequest({ mode: "socratic", subject: "maths", lesson, goal: "why it diverges", turns: [], lab });
  assert.match(so.system, /Learning rate = 1\.1/);
  // without a lab, nothing is added; a malformed lab is refused; a long state is capped
  assert.doesNotMatch(buildRequest({ mode: "explain", subject: "maths", lesson, question: "What is a gradient?" }).system, /INTERACTIVE LAB/);
  assert.throws(() => buildRequest({ mode: "explain", subject: "maths", lesson, question: "What is a gradient?", lab: { title: "x" } }), /title and its current state/);
  assert.ok(labBlock({ title: "T", state: "y".repeat(9000) }).length < 2600);
});

test("lab state text: settings, readout, tables and challenges, capped", () => {
  const s = labState({
    report: "", settings: [["Learning rate", "1.1"], ["Showing", "Newton–Raphson"], ["Empty", ""]], readout: "Diverged after 6 steps.",
    tables: [{ caption: "Iterates", rows: [["n", "xₙ"], ...Array.from({ length: 30 }, (_, i) => [String(i), String(i * i)])] }],
    challenges: [{ text: "Make it diverge", done: true }, { text: "Find both minima", done: false }],
  });
  assert.match(s, /^Settings: Learning rate = 1\.1; Showing = Newton–Raphson$/m);
  assert.doesNotMatch(s, /Empty/);
  assert.match(s, /Readout: Diverged after 6 steps\./);
  assert.match(s, /Iterates:\nn \| xₙ\n0 \| 0/);
  assert.match(s, /…\n25 \| 625/);            // long tables keep the start and the end
  assert.match(s, /\[done\] Make it diverge; \[not yet\] Find both minima/);
  assert.equal(labState({ fallback: "Question 3: solve 2x + 1 = 7" }), "Question 3: solve 2x + 1 = 7");
  assert.ok(labState({ readout: "z".repeat(5000) }).length <= 2000);
});

import { labOutcome, labPractice } from "../kit/learning/mastery.js";
const labA = (id, outcome, at, lesson = "u19-10") => ({ schema: 1, at, question: { id: `ix:roots:${id}`, type: "lab", d: 2 }, lesson, unit: "u19", contextId: "roots", score: outcome === "attempt" ? 0 : 1, correct: outcome !== "attempt", attempt: 1, context: "practice", response: { challenge: id, outcome }, marking: { method: "auto", status: "final" } });

test("lab outcomes: success counts in full, assisted success as assisted, an unmet try not at all", () => {
  const [s] = evidenceFromAttempts([labA("nobr", "success", "2026-11-01T10:00:00Z")]);
  const [as] = evidenceFromAttempts([labA("nobr", "assisted_success", "2026-11-01T10:00:00Z")]);
  assert.equal(s.dim, "apply"); assert.equal(s.independent, true);
  assert.equal(as.dim, "apply"); assert.equal(as.independent, false); near(as.w, s.w * 0.3);
  assert.deepEqual(evidenceFromAttempts([labA("sqrt2", "attempt", "2026-11-01T10:00:00Z")]), []);
  // older records: a plain string response, or none, was a success
  assert.equal(labOutcome({ question: { type: "lab" }, correct: true, response: "Make it diverge" }), "success");
  assert.equal(labOutcome({ question: { type: "num" } }), null);
});

test("unmet tries never lower mastery, but repeated ones are flagged for practice until a success", () => {
  const ok = [labA("nobr", "success", "2026-11-01T10:00:00Z")];
  const tries = [labA("sqrt2", "attempt", "2026-11-02T10:00:00Z"), labA("sqrt2", "attempt", "2026-11-03T10:00:00Z"), labA("sqrt2", "attempt", "2026-11-04T10:00:00Z")];
  assert.deepEqual(evidenceFromAttempts([...ok, ...tries]), evidenceFromAttempts(ok));
  const [p] = labPractice([...ok, ...tries]);
  assert.equal(p.lesson, "u19-10"); assert.equal(p.tries, 3); assert.deepEqual(p.labs, ["roots"]); assert.deepEqual(p.challenges, ["sqrt2"]);
  assert.equal(labPractice(tries.slice(0, 1)).length, 0);                         // one try isn't a pattern
  assert.equal(labPractice([...tries, labA("sqrt2", "success", "2026-11-05T10:00:00Z")]).length, 0);   // met: cleared
});

test("lab state marks the challenge the learner is working on", () => {
  const s = labState({ challenges: [{ text: "Find √2", done: false, focus: true }, { text: "No bracket", done: true }] });
  assert.match(s, /\[working on it now\] Find √2; \[done\] No bracket/);
});

// ---------- the two labs tested last: secant to tangent, and probability by simulation ----------
import { secant as diffQuotient } from "../kit/labs/maths/tangent.js";
import { EVENTS, draw, POPS, sampleMeans, meanSd, normalPdf } from "../kit/labs/maths/probability.js";
// run fn with Math.random replaced by a fixed sequence (or generator), then put it back
const withRandom = (gen, fn) => { const real = Math.random; Math.random = gen; try { return fn(); } finally { Math.random = real; } };
const seeded = (seed) => () => { seed = (seed * 16807) % 2147483647; return (seed - 0.5) / 2147483647; };

test("secant to tangent: the difference quotient tends to the derivative, and |x| has no derivative at 0", () => {
  const sq = (x) => x * x;
  for (const h of [1, 0.5, 0.1, -0.1, 0.001]) near(diffQuotient(sq, 1, h), 2 + h, 1e-9);     // (1 + h)² − 1 over h is exactly 2 + h
  near(diffQuotient(Math.sin, 0.7, 1e-6), Math.cos(0.7), 1e-5);
  // first order: halving h halves the error for a function with a non-zero second derivative
  const e = (h) => Math.abs(diffQuotient(Math.exp, 0, h) - 1); near(e(0.01) / e(0.005), 2, 0.02);
  near(diffQuotient(Math.abs, 0, 1e-4), 1); near(diffQuotient(Math.abs, 0, -1e-4), -1);           // one-sided limits disagree
});

test("probability lab: each event's stated probability matches the outcomes it counts", () => {
  // every face of a die is a value of Math.random in [k/6, (k+1)/6); try each one (and each pair for two dice)
  const faces = [0, 1, 2, 3, 4, 5].map((k) => (k + 0.5) / 6);
  const p1 = (ev) => faces.filter((u) => withRandom(() => u, draw[ev])).length / 6;
  near(p1("six"), EVENTS.six.p); near(p1("even"), EVENTS.even.p);
  let hits = 0; for (const a of faces) for (const b of faces) { const seq = [a, b]; let i = 0; hits += withRandom(() => seq[i++], draw.two) ? 1 : 0; }
  near(hits / 36, EVENTS.two.p);
  near([0.25, 0.75].filter((u) => withRandom(() => u, draw.coin)).length / 2, EVENTS.coin.p);
});

test("probability lab: each population's stated mean and SD match its sampler", () => {
  // integrate over u in (0, 1), the sampler's input, by the midpoint rule
  const N = 200000, moments = (r) => { let s = 0, s2 = 0; for (let i = 0; i < N; i++) { const x = withRandom(() => (i + 0.5) / N, r); s += x; s2 += x * x; } const mu = s / N; return { mu, sd: Math.sqrt(s2 / N - mu * mu) }; };
  for (const [k, tol] of [["uniform", 1e-6], ["die", 1e-4], ["exp", 2e-3]]) {
    const { mu, sd } = moments(POPS[k].r); near(mu, POPS[k].mean, tol); near(sd, POPS[k].sd, tol * 5);
  }
});

test("central limit theorem: sample means centre on μ with spread σ/√n, and the normal curve is a density", () => {
  withRandom(seeded(20261107), () => {
    for (const [k, n] of [["exp", 30], ["die", 10], ["uniform", 4]]) {
      const Q = POPS[k], { mu, sd } = meanSd(sampleMeans(Q.r, n, 4000)), se = Q.sd / Math.sqrt(n);
      near(mu, Q.mean, 4 * se / Math.sqrt(4000) + 1e-3); near(sd / se, 1, 0.06);
    }
  });
  // the density integrates to 1 and peaks at 1/(σ√2π)
  let area = 0; for (let x = -8; x < 8; x += 0.001) area += normalPdf(x + 0.0005, 0.3, 1.2) * 0.001;
  near(area, 1, 1e-6); near(normalPdf(0.3, 0.3, 1.2), 1 / (1.2 * Math.sqrt(2 * Math.PI)), 1e-12);
  near(meanSd([2, 4, 4, 4, 5, 5, 7, 9]).sd, Math.sqrt(32 / 7), 1e-12);
});

test("generated practice: each problem type is evidence for the lesson that teaches it", async () => {
  const { EVIDENCE } = await import("../kit/courses/maths/evidence.js");
  const want = { fractions: /fraction/i, percentChange: /percentage change/i, reversePercent: /reverse percent/i, standardForm: /scientific notation|standard form/i, indices: /exponent|power|indices/i,
    hcfLcm: /common divisor|common multiple|hcf|lcm/i, linear: /linear equation/i, quadratic: /quadratic equation/i, simultaneous: /simultaneous equation/i, nthTerm: /sequence/i,
    pythagoras: /pythag/i, trigSide: /trigonometr/i, compound: /compound interest/i, probability: /independent|conditional|probability/i, gradient: /derivative|differentiation/i,
    definite: /definite integral/i, logs: /logarithm/i, geometric: /series/i };
  for (const [kind, re] of Object.entries(want)) {
    const id = EVIDENCE.practice[kind]; assert.ok(id in IDS, `${kind}: ${id}`);
    assert.match(IDS[id], re, `practice "${kind}" is evidence for "${IDS[id]}"`);
  }
});
