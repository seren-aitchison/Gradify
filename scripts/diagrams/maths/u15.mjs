// School 15, Graph Theory and Networks: the worked examples of the lessons, drawn. Run: node scripts/diagrams/maths/u15.mjs
import { mk } from "./spec.mjs";

const T = (a, b) => [[...a], [...b]];
const G = (range, ticks, body) => ({ range, ticks, grid: [0.5, 0.5], height: [380, 340], axisLabels: ["x", "y"], ...body });
const pt = (expr, x, y, name) => ({ type: "point", expr, x, y, name });

// ---------- u15-38 Scale-free networks: P(100)/P(10) = 10^-2.5 ----------
{
  const gamma = 2.5, ratio = 10 ** -gamma;
  const f = (x) => -gamma * (x - 1);
  mk("u15-38", "maths-u15-power-law", "graph", "A power law is a straight line on log-log axes",
    `With P(k) ∝ k^−2.5, log₁₀ P(k)/P(10) falls by 2.5 for each tenfold rise in k. From degree 10 to degree 100 it falls by 2.5, so P(100)/P(10) = 10^−2.5 ≈ ${ratio.toFixed(4)}: about ${Math.round(1 / ratio)} times rarer.`,
    "A straight line of gradient minus 2.5 on log-log axes from degree 10 (x = 1, y = 0) to degree 100 (x = 2, y = minus 2.5).",
    ["Take P(k) ∝ k^−2.5 and measure everything against degree 10.", "On log axes, log₁₀ P(k)/P(10) = −2.5 (log₁₀ k − 1), a straight line of gradient −2.5.", "At degree 100, log₁₀ k = 2, so the line is at −2.5.", `That is a ratio of 10^−2.5 ≈ ${ratio.toFixed(4)}: degree 100 is about ${Math.round(1 / ratio)} times rarer than degree 10.`],
    G({ x: [0, 2.5], y: [-3.5, 0.5] }, T([0.5, 1, 1.5, 2, 2.5], [-3, -2, -1, 0]), { grid: [0.5, 1], axisLabels: ["log₁₀ k", "log₁₀ P(k)/P(10)"], curves: [{ expr: "-2.5*(x-1)", colour: "a1", domain: [0.5, 2.3] }],
      points: [{ x: 1, y: 0, label: "k = 10", colour: "a2", dx: 12, dy: -14, anchor: "start" }, { x: 2, y: f(2), label: "k = 100: −2.5", colour: "a2", dx: 12, dy: -12, anchor: "start" }],
      checks: [pt("-2.5*(x-1)", 1, 0, "degree 10 is the reference: ratio 1, log 0"), pt("-2.5*(x-1)", 2, -2.5, "degree 100 sits 2.5 below"), { type: "slope", expr: "-2.5*(x-1)", x: 1.5, value: -gamma, name: "the gradient is −γ = −2.5" }, { type: "value", expr: "10^(-2.5)", x: 0, between: [ratio - 1e-4, ratio + 1e-4], name: `10^−2.5 ≈ ${ratio.toFixed(4)}` }], fromLesson: ["10^{−2.5}"] }));
}
