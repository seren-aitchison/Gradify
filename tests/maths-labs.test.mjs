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
