// Unit 38, Nonlinear Dynamics and Chaos. Every number in a caption or claim is computed here once, from the lesson's
// own worked example. Run: node scripts/diagrams/physics/u38.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u38-03 fixed points of ẋ = x − x³ and their stability from the slope of f
{ const f = "x-x^3";
  mk("u38-03", "phys-u38-fixed-points", "graph", {
    title: "Fixed points and their stability",
    caption: "Plot ẋ = f(x) against x: fixed points are where the curve crosses zero, at x = −1, 0 and 1. Where f is positive x grows, where negative it shrinks. At x = 0 the slope is +1, so it is unstable; at x = ±1 the slope is −2, so they are stable.",
    alt: "Graph of x minus x cubed against x, crossing zero at minus 1, 0 and 1, with arrows on the axis showing flow away from 0 and towards plus and minus 1.",
    description: ["f(x) = x − x³ = x(1 − x)(1 + x).", "Zeros (fixed points): x = −1, 0, 1.", "f′(x) = 1 − 3x²: f′(0) = 1 > 0, unstable; f′(±1) = −2 < 0, stable.", "Arrows on the x-axis show the flow: away from 0, towards ±1."],
    range: { x: [-1.6, 1.6], y: [-1.2, 1.2] }, ticks: [[], [-1, -0.5, 0.5, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["x", "ẋ = f(x)"],
    curves: [{ expr: f, colour: "a1" }],
    arrows: [{ from: [0.15, 0.08], to: [0.8, 0.08], colour: "a2" }, { from: [-0.15, 0.08], to: [-0.8, 0.08], colour: "a2" }, { from: [1.55, 0.08], to: [1.15, 0.08], colour: "a2" }, { from: [-1.55, 0.08], to: [-1.15, 0.08], colour: "a2" }],
    points: [{ x: -1, y: 0, colour: "a4", label: "−1: stable", anchor: "end", dx: -6, dy: 16 }, { x: 0, y: 0, colour: "a2", label: "0: unstable", dx: 6, dy: 16 }, { x: 1, y: 0, colour: "a4", label: "1: stable", anchor: "end", dx: -6, dy: 16 }],
    checks: [{ type: "point", expr: f, x: 1, y: 0, name: "fixed point at x = 1" }, { type: "slope", expr: f, x: 0, value: 1, name: "f′(0) = 1: unstable" }, { type: "slope", expr: f, x: 1, value: -2, name: "f′(1) = −2: stable" }],
  }); }

// u38-05 saddle-node bifurcation of ẋ = r + x²: fixed points x = ±√(−r) for r < 0
{ const up = "sqrt(-x)", lo = "-sqrt(-x)";
  mk("u38-05", "phys-u38-saddle-node", "graph", {
    title: "A saddle-node bifurcation",
    caption: "For ẋ = r + x² the fixed points are x = ±√(−r). At r = −4 they are x = −2 (stable, f′ = −4) and x = +2 (unstable, f′ = +4). As r rises they move together, merge at r = 0, and for r > 0 there are none.",
    alt: "Bifurcation diagram: fixed points against r, a sideways parabola for r below zero, the lower branch solid (stable) and the upper dashed (unstable), meeting at the origin.",
    description: ["Fixed points: r + x² = 0, so x = ±√(−r), only for r ≤ 0.", "Stability from f′(x) = 2x: the negative branch is stable, the positive unstable.", "r = −4: x = −2 (stable) and +2 (unstable).", "At r = 0 they collide and annihilate."],
    range: { x: [-5, 2], y: [-2.6, 2.6] }, ticks: [[-4, -3, -2, -1, 1, 2], [-2, -1, 1, 2]], height: [320, 300], xLabelBelow: true, axisLabels: ["r", "fixed point x*"],
    curves: [{ expr: lo, domain: [-5, 0], colour: "a4", label: "stable", labelAt: [-3.4, -1.45] }, { expr: up, domain: [-5, 0], colour: "a2", dash: "6 5", label: "unstable", labelAt: [-3.4, 1.4] }],
    points: [{ x: -4, y: -2, colour: "a4" }, { x: -4, y: 2, colour: "a2" }, { x: 0, y: 0, colour: "ink" }],
    checks: [{ type: "point", expr: up, x: -4, y: 2, name: "x* = +2 at r = −4" }, { type: "point", expr: lo, x: -4, y: -2, name: "x* = −2 at r = −4" }, { type: "point", expr: "2*x", x: -2, y: -4, name: "f′(−2) = −4 < 0: the lower branch is stable" }],
  }); }

// u38-08 error growth in a chaotic double pendulum: δ = 10⁻⁶ e^(λt), λ = 2 s⁻¹
{ const lam = 2, t1 = Math.log(1e6) / lam, f = `-6+${lam}*x/log(10)`;
  mk("u38-08", "phys-u38-error-growth", "graph", {
    title: "How fast a tiny error grows",
    caption: `In a chaotic system errors grow exponentially, δ = δ₀e^(λt). For the double pendulum, λ ≈ 2 s⁻¹: an error of 10⁻⁶ rad reaches 1 rad after ln(10⁶)/2 ≈ ${r(t1, 0)} s. On a log scale the growth is a straight line; a thousand times better measurement buys only another ${r(Math.log(1000) / lam, 1)} s.`,
    alt: "Base-10 logarithm of the error against time, a straight line rising from minus 6 at time zero to zero at about 7 seconds.",
    description: ["log₁₀ δ = −6 + λt / ln 10, λ = 2 s⁻¹.", `δ = 1 rad (log₁₀ δ = 0) at t = ln(10⁶)/2 = ${r(t1, 2)} s.`, "Each factor of 10 costs ln 10 / 2 ≈ 1.15 s."],
    range: { x: [0, 8], y: [-7, 1] }, ticks: [[1, 2, 3, 4, 5, 6, 7, 8], [-6, -4, -2, 0]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "log₁₀ (error / rad)"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: t1, to: 0 }],
    points: [{ x: r(t1, 4), y: 0, colour: "a2", label: `1 rad after ${r(t1, 1)} s`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: r(t1, 8), y: 0, name: `the error reaches 1 rad at ${r(t1, 2)} s` }, { type: "point", expr: f, x: 0, y: -6, name: "starts at 10⁻⁶ rad" }],
  }); }

// u38-11 the logistic map at r = 2.5: fixed point and its stability
{ const rr = 2.5, f = `${rr}*x*(1-x)`, xs = 1 - 1 / rr;
  mk("u38-11", "phys-u38-logistic-fixed-point", "graph", {
    title: "The logistic map's fixed point",
    caption: `A fixed point of x_{n+1} = rx_n(1 − x_n) is where the parabola meets the line y = x. For r = ${rr}, x* = 1 − 1/r = ${xs}. The slope there is f′(x*) = 2 − r = ${2 - rr}; since |f′| < 1 iterates spiral in and it is stable. For r = 3.2 the slope is −1.2 and a 2-cycle takes over.`,
    alt: "The parabola 2.5x(1 − x) and the diagonal y = x crossing at x = 0.6.",
    description: [`f(x) = ${rr}x(1 − x), peak ${rr / 4} at x = 0.5.`, `Fixed point: f(x) = x at x* = ${xs}.`, `f′(x*) = r(1 − 2x*) = ${2 - rr}: |f′| < 1, so stable.`],
    range: { x: [0, 1], y: [0, 1] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [0.2, 0.4, 0.6, 0.8, 1]], height: [320, 320], xLabelBelow: true, axisLabels: ["x_{n}", "x_{n+1}"],
    curves: [{ expr: f, colour: "a1", label: "f(x) = 2.5x(1 − x)", labelAt: [0.03, 0.78] }, { expr: "x", colour: "a3", dash: "6 5", label: "y = x", labelAt: [0.82, 0.92], anchor: "end" }],
    marks: [{ x: xs, to: xs }], points: [{ x: xs, y: xs, colour: "a2" }],
    checks: [{ type: "intersect", a: f, b: "x", x: xs, y: xs, name: `fixed point x* = ${xs}` }, { type: "slope", expr: f, x: xs, value: 2 - rr, name: "f′(x*) = −0.5: stable" }],
  }); }

// u38-21 herd immunity threshold 1 − 1/R₀
{ const f = "1-1/x";
  mk("u38-21", "phys-u38-herd-immunity", "graph", {
    title: "The herd immunity threshold",
    caption: "An infection spreads while each case infects more than one other. If a fraction p is immune, the effective reproduction number is R₀(1 − p), so spread stops once p > 1 − 1/R₀. For R₀ = 3 that is about 67%; more contagious diseases need far higher coverage.",
    alt: "Herd immunity threshold against basic reproduction number, rising from zero at 1 and levelling towards 1, with 67 percent at 3 marked.",
    description: ["Threshold p_c = 1 − 1/R₀.", "R₀ = 3: 0.667. R₀ = 6: 0.833. R₀ = 15 (measles-like): 0.933.", "Below R₀ = 1 an outbreak dies out on its own."],
    range: { x: [1, 16], y: [0, 1.05] }, ticks: [[1, 3, 6, 9, 12, 15], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["R₀", "fraction that must be immune"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 3, to: 2 / 3 }],
    points: [{ x: 3, y: r(2 / 3, 6), colour: "a2", label: "67% for R₀ = 3", dx: 10, dy: 14 }],
    checks: [{ type: "point", expr: f, x: 3, y: r(2 / 3, 8), name: "two thirds for R₀ = 3" }, { type: "point", expr: f, x: 1, y: 0, name: "no immunity needed at R₀ = 1" }],
  }); }
