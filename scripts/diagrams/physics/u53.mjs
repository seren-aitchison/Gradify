// Unit 53, Interdisciplinary Physics. Numbers computed once from the lessons' worked examples.
// Run: node scripts/diagrams/physics/u53.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const g = 9.8, deg = Math.PI / 180;

// u53-13 seismic P and S waves: 7 and 4 km/s, 30 s gap
{ const vp = 7, vs = 4, gap = 30, d = gap / (1 / vs - 1 / vp), tp = d / vp, ts = d / vs;
  mk("u53-13", "phys-u53-seismic", "graph", {
    title: "P and S arrival times",
    caption: `P-waves (7 km s⁻¹) arrive at t = d/7, S-waves (4 km s⁻¹) at t = d/4, so the delay grows with distance: d(1/4 − 1/7) = 30 s gives d ≈ ${r(d, 0)} km. There P arrives after ${r(tp, 0)} s and S after ${r(ts, 0)} s.`,
    alt: "Arrival time against distance for P and S waves: two straight lines from the origin, S steeper, with a 30 second gap between them at 280 kilometres.",
    description: ["P: t = d/7. S: t = d/4 (d in km, t in s).", `Delay = d(1/4 − 1/7) = 0.107d; for 30 s, d = ${r(d, 1)} km.`, `At ${r(d, 0)} km: P ${r(tp, 0)} s, S ${r(ts, 0)} s.`],
    range: { x: [0, 400], y: [0, 100] }, ticks: [[100, 200, 300, 400], [20, 40, 60, 80, 100]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance / km", "arrival time / s"],
    curves: [{ expr: "x/4", colour: "a1", label: "S", labelAt: [330, 90], domain: [0, 400] }, { expr: "x/7", colour: "a2", label: "P", labelAt: [360, 45], domain: [0, 400] }],
    series: [{ points: [[r(d, 3), r(tp, 3)], [r(d, 3), r(ts, 3)]], colour: "a4", width: 2, dots: true }],
    points: [{ x: r(d, 3), y: r(ts, 3), colour: "a4", label: "30 s gap at 280 km", anchor: "end", dx: -10, dy: -8 }],
    checks: [{ type: "point", expr: "x/4-x/7", x: r(d, 3), y: gap, tol: 0.05, name: "S − P delay is 30 s at 280 km" }, { type: "slope", expr: "x/4", x: 100, value: 0.25, name: "S slope 1/4" }],
  }); }

// u53-15 superlinear urban scaling, β = 1.15
{ const b = 1.15, f10 = 10 ** b;
  mk("u53-15", "phys-u53-scaling", "graph", {
    title: "Superlinear scaling with β = 1.15",
    caption: `Output Y ∝ N^β with β = 1.15 grows faster than linearly: a city 10 times larger produces 10^1.15 ≈ ${r(f10, 0)} times as much, i.e. ${r(f10 / 10, 1)} times more per person. The dashed line shows the linear case β = 1.`,
    alt: "Output against size, in units of the smallest city: a curve N to the 1.15 above the straight line N, reaching about 14 at size 10.",
    description: ["Y = N^1.15 in units where N = 1 gives Y = 1.", `N = 10: Y = ${r(f10, 1)}, against 10 if linear.`, `Per capita Y/N = N^0.15 = ${r(f10 / 10, 2)} at N = 10.`],
    range: { x: [0, 10.5], y: [0, 16] }, ticks: [[2, 4, 6, 8, 10], [4, 8, 12, 16]], height: [320, 300], xLabelBelow: true, axisLabels: ["city size N (relative)", "total output (relative)"],
    curves: [{ expr: "x^1.15", colour: "a1", label: "β = 1.15", labelAt: [5.5, 8.7] }, { expr: "x", colour: "a2", dash: "6 5", label: "linear", labelAt: [7, 5.8] }],
    points: [{ x: 10, y: r(f10, 3), colour: "a1", label: `≈ ${r(f10, 0)}`, anchor: "end", dx: -8, dy: -4 }],
    checks: [{ type: "point", expr: "x^1.15", x: 10, y: r(f10, 6), tol: 0.001, name: `10^1.15 ≈ ${r(f10, 1)}` }, { type: "point", expr: "x^1.15/x", x: 10, y: r(f10 / 10, 6), tol: 0.001, name: "per capita 1.4×" }],
  }); }
