// Unit 54, Research and Professional Physics Skills. Numbers computed once from the lessons' worked examples.
// Run: node scripts/diagrams/physics/u54.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const g = 9.8, deg = Math.PI / 180;

// u54-09 false positives over n independent tests at α = 0.05
{ const a = 0.05, p20 = 1 - (1 - a) ** 20, e = `1-0.95^x`;
  mk("u54-09", "phys-u54-false-positive", "graph", {
    title: "False positives grow with the number of tests",
    caption: `Each test has a ${a * 100}% false-positive chance, but the chance of at least one among n independent tests is 1 − 0.95ⁿ. For 20 tests that is ${r(p20, 2)}: more likely than not, so a lone "significant" result among many is weak evidence.`,
    alt: "Probability of at least one false positive against the number of tests, rising from 0.05 at one test to 0.64 at twenty and towards 1.",
    description: ["P(at least one) = 1 − (1 − α)^n with α = 0.05.", `n = 1: 0.05. n = 20: 1 − 0.95^20 = ${r(p20, 3)}. n = 50: ${r(1 - 0.95 ** 50, 2)}.`, "Corrections such as Bonferroni (α/n per test) restore the overall rate."],
    range: { x: [0, 60], y: [0, 1.05] }, ticks: [[10, 20, 30, 40, 50, 60], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["number of tests n", "P(at least one false positive)"],
    curves: [{ expr: e, colour: "a1" }],
    points: [{ x: 20, y: r(p20, 4), colour: "a2", label: `${r(p20, 2)} at n = 20`, dx: 10, dy: 18 }],
    checks: [{ type: "point", expr: e, x: 20, y: r(p20, 6), tol: 0.001, name: `1 − 0.95^20 = ${r(p20, 2)}` }, { type: "point", expr: e, x: 1, y: 0.05, name: "one test: 0.05" }],
  }); }
