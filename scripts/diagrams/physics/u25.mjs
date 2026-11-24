// Unit 25, Special Relativity. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u25.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const gam = (b) => 1 / Math.sqrt(1 - b * b), G = "1/sqrt(1-x^2)";

// u25-08 the Lorentz factor, and the muons
{ const b = 0.999, g = gam(b), tau = 2.2, lifeLab = g * tau, dist = (b * 3e8 * lifeLab * 1e-6) / 1000;
  mk("u25-08", "phys-u25-lorentz-factor", "graph", {
    title: "The Lorentz factor γ",
    caption: `γ = 1/√(1 − v²/c²) stays close to 1 until v is a large fraction of c, then climbs steeply. At 0.6c it is 1.25; at 0.8c, 1.67; for the muons at 0.999c, ${r(g, 1)}: their 2.2 μs lifetime becomes ${r(lifeLab, 0)} μs in the lab, long enough to travel about ${r(dist, 0)} km and reach the ground from 15 km.`,
    alt: "Lorentz factor against speed as a fraction of c: nearly flat at 1, then rising steeply towards infinity at 1, with points at 0.6, 0.8 and 0.999.",
    description: ["γ = 1 / √(1 − β²), β = v/c.", "β = 0.6: γ = 1.25. β = 0.8: γ = 1.667.", `β = 0.999: γ = ${r(g, 2)}. Muon lifetime in the lab: ${r(g, 1)} × 2.2 μs = ${r(lifeLab, 0)} μs.`, `Distance in that time: 0.999c × ${r(lifeLab, 0)} μs ≈ ${r(dist, 0)} km, more than 15 km.`],
    range: { x: [0, 1], y: [0, 25] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [5, 10, 15, 20, 25]], height: [320, 300], xLabelBelow: true, axisLabels: ["v / c", "γ"],
    curves: [{ expr: G, domain: [0, 0.99915], colour: "a1", samples: 800 }],
    points: [{ x: 0.6, y: 1.25, colour: "a4" }, { x: 0.8, y: r(gam(0.8), 4), colour: "a4", label: "1.67 at 0.8c", dx: -6, dy: -16, anchor: "end" }, { x: b, y: r(g, 4), colour: "a2", label: `muons: ${r(g, 1)}`, anchor: "end", dx: -10, dy: 0 }],
    checks: [{ type: "point", expr: G, x: 0.6, y: 1.25, name: "γ = 1.25 at 0.6c" }, { type: "point", expr: G, x: b, y: r(g, 6), name: `γ = ${r(g, 2)} at 0.999c` }],
  }); }

// u25-09 length contraction: a 100 m ship
{ const L0 = 100, L = `${L0}*sqrt(1-x^2)`, at = L0 * Math.sqrt(1 - 0.64);
  mk("u25-09", "phys-u25-length-contraction", "graph", {
    title: "Length contraction",
    caption: `A moving object is shorter along its motion by 1/γ: L = L₀√(1 − v²/c²). The ${L0} m ship passing at 0.8c measures ${r(at, 0)} m. Its crew still measure ${L0} m, their proper length.`,
    alt: "Measured length of a 100 metre ship against its speed, falling slowly at first and then steeply to zero at the speed of light, with 60 metres at 0.8c.",
    description: [`Proper length L₀ = ${L0} m.`, `At 0.8c: L = ${L0} × √(1 − 0.64) = ${r(at, 0)} m.`, "Lengths across the motion are unchanged."],
    range: { x: [0, 1], y: [0, 110] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [25, 50, 75, 100]], height: [320, 300], xLabelBelow: true, axisLabels: ["v / c", "measured length / m"],
    curves: [{ expr: L, colour: "a1", samples: 600 }], marks: [{ x: 0.8, to: at }],
    points: [{ x: 0.8, y: r(at, 4), colour: "a2", label: `${r(at, 0)} m at 0.8c`, anchor: "end", dx: -10, dy: 18 }],
    checks: [{ type: "point", expr: L, x: 0.8, y: r(at, 6), name: `${r(at, 0)} m at 0.8c` }, { type: "point", expr: L, x: 0, y: L0, name: "proper length at rest" }],
  }); }

// u25-10 relativistic velocity addition: two particles approaching at 0.75c each
{ const u = 0.75, rel = (2 * u) / (1 + u * u), F = "2*x/(1+x^2)";
  mk("u25-10", "phys-u25-velocity-addition", "graph", {
    title: "Adding velocities near the speed of light",
    caption: `Two particles each moving at u towards each other in the lab. Galileo's answer, 2u, passes c when u > 0.5c; relativity gives 2u/(1 + u²/c²), which never reaches c. At 0.75c each the relative speed is ${r(rel, 2)}c, not 1.5c.`,
    alt: "Relative speed against each particle's speed: the straight line 2u crossing c at 0.5, and the relativistic curve approaching but never reaching 1, at 0.96 for 0.75.",
    description: ["Horizontal: each particle's speed in the lab, u/c.", "Galilean: 2u (dashed), which exceeds c beyond 0.5c.", `Relativistic: 2u / (1 + u²/c²): at 0.75c, 1.5 / 1.5625 = ${r(rel, 3)}c.`, "As u → c the relative speed → c."],
    range: { x: [0, 1], y: [0, 1.6] }, ticks: [[0.25, 0.5, 0.75, 1], [0.5, 1, 1.5]], height: [320, 300], xLabelBelow: true, axisLabels: ["each speed u / c", "relative speed / c"],
    curves: [{ expr: "2*x", domain: [0, 0.8], colour: "a3", dash: "6 5", label: "Galilean 2u", labelAt: [0.45, 1.3], anchor: "end" }, { expr: F, colour: "a1", label: "relativistic", labelAt: [0.82, 0.86] }],
    marks: [{ y: 1, label: "speed of light" }],
    points: [{ x: u, y: r(rel, 5), colour: "a2", label: `${r(rel, 2)}c`, dx: 8, dy: -14 }],
    checks: [{ type: "point", expr: F, x: u, y: r(rel, 8), name: `0.75c ⊕ 0.75c = ${r(rel, 3)}c` }, { type: "max", expr: F, domain: [0, 1], x: 1, y: 1, name: "never more than c" }],
  }); }

// u25-11 a spacetime diagram: object at rest at x = 2 m, a light flash from the origin
mk("u25-11", "phys-u25-spacetime", "graph", {
  title: "A spacetime diagram",
  caption: "Time runs up the page as ct, so light follows ct = x (45° when both axes share a scale). An object at rest at x = 2 m has a vertical worldline; anything moving slower than light has a worldline steeper than 45°, here one at 0.5c.",
  alt: "Spacetime diagram with x across and ct up: a vertical worldline at x = 2 metres, a light ray ct = x from the origin, and a steeper line for an object at half the speed of light.",
  description: ["Axes: position x across, ct (in metres) up.", "Object at rest at x = 2 m: a vertical line.", "Light flash from the origin: ct = x, one metre of ct per metre of x.", "An object at 0.5c from the origin: ct = 2x, steeper than light."],
  range: { x: [0, 4], y: [0, 4] }, ticks: [[1, 2, 3, 4], [1, 2, 3, 4]], height: [340, 340], xLabelBelow: true, axisLabels: ["x / m", "ct / m"],
  curves: [{ expr: "x", colour: "a3", label: "light: ct = x", labelAt: [2.6, 2.25] }, { expr: "2*x", domain: [0, 2], colour: "a4", label: "0.5c: ct = 2x", labelAt: [0.95, 2.9], anchor: "end" }],
  marks: [{ x: 2, to: 4, label: "at rest, x = 2 m" }],
  checks: [{ type: "slope", expr: "x", x: 1, value: 1, name: "light: one metre of x per metre of ct" }, { type: "slope", expr: "2*x", x: 1, value: 2, name: "at 0.5c the worldline rises 2 m of ct per metre of x" }],
});

// u25-22 can A cause B? A at the origin, B at ct = 3 × 10⁸ m, x = 4 × 10⁸ m
mk("u25-22", "phys-u25-light-cone", "graph", {
  title: "Inside or outside the light cone?",
  caption: "Event B is 4 × 10⁸ m away but only 1 s (ct = 3 × 10⁸ m) later. Reaching it would need a signal faster than light: B lies outside A's light cone, the interval is spacelike, and A cannot cause B.",
  alt: "Spacetime diagram in units of 10^8 metres: A's future light cone bounded by the lines ct = plus and minus x, with event B at x = 4, ct = 3 outside it.",
  description: ["Units: 10⁸ m on both axes, so light follows ct = ±x.", "A at the origin. Its future light cone is the region above the lines ct = ±x.", "B at x = 4, ct = 3: |x| > ct, so B is outside the cone.", "(cΔt)² − Δx² = 9 − 16 < 0: a spacelike interval. No signal can link A and B."],
  range: { x: [-5, 5], y: [0, 5] }, ticks: [[-4, -2, 2, 4], [1, 2, 3, 4, 5]], height: [320, 300], xLabelBelow: true, axisLabels: ["x / 10⁸ m", "ct / 10⁸ m"],
  curves: [{ expr: "x", domain: [0, 5], colour: "a3", label: "light", labelAt: [3.4, 4.3] }, { expr: "-x", domain: [-5, 0], colour: "a3" }],
  points: [{ x: 0, y: 0, colour: "ink", label: "A", anchor: "end", dx: -8, dy: -10 }, { x: 4, y: 3, colour: "a2", label: "B", dx: 10, dy: 0 }],
  checks: [{ type: "order", a: "abs(x)", b: "3+0*x", x: 4, rel: ">", name: "B is spacelike from A: |Δx| > cΔt" }, { type: "point", expr: "x^2-9", x: 4, y: 7, name: "Δx² − (cΔt)² = 16 − 9 = 7 > 0" }],
});

// u25-17 relativistic and classical kinetic energy, and the proton at 0.9c
{ const mc2 = 938.27, b = 0.9, K = (gam(b) - 1) * mc2, Krel = "1/sqrt(1-x^2)-1", Kcl = "x^2/2";
  mk("u25-17", "phys-u25-kinetic-energy", "graph", {
    title: "Relativistic kinetic energy",
    caption: `K = (γ − 1)mc² agrees with ½mv² at low speed but grows without limit as v → c. For a proton at 0.9c, γ = ${r(gam(b), 3)} and K = ${r(gam(b) - 1, 3)} × 938 MeV = ${r(K, 0)} MeV, more than twice the classical ½mv² (${r(0.405 * mc2, 0)} MeV).`,
    alt: "Kinetic energy in units of mc squared against v over c: the classical parabola and the relativistic curve together at low speed, the relativistic one rising steeply near 1.",
    description: ["Kinetic energy in units of mc².", "Classical: β²/2. Relativistic: γ − 1.", `At β = 0.9: classical 0.405, relativistic ${r(gam(b) - 1, 3)}.`, `For a proton (mc² = 938 MeV): K = ${r(K, 0)} MeV.`],
    range: { x: [0, 1], y: [0, 3] }, ticks: [[0.2, 0.4, 0.6, 0.8, 1], [1, 2, 3]], height: [320, 300], xLabelBelow: true, axisLabels: ["v / c", "kinetic energy / mc²"],
    curves: [{ expr: Krel, domain: [0, 0.97], colour: "a1", label: "relativistic (γ − 1)", labelAt: [0.55, 1.6], anchor: "end" }, { expr: Kcl, colour: "a3", dash: "6 5", label: "classical ½β²", labelAt: [0.74, 0.12] }],
    points: [{ x: b, y: r(gam(b) - 1, 5), colour: "a2", label: `${r(K, 0)} MeV for a proton`, anchor: "end", dx: -10, dy: -6 }],
    checks: [{ type: "point", expr: Krel, x: b, y: r(gam(b) - 1, 8), name: `γ − 1 = ${r(gam(b) - 1, 3)} at 0.9c` }, { type: "order", a: Krel, b: Kcl, x: b, rel: ">", name: "more than the classical value at 0.9c" }, { type: "value", expr: `${Krel}-(${Kcl})`, x: 0.1, between: [0, 0.0001], name: "agrees with ½mv² at low speed" }],
  }); }
