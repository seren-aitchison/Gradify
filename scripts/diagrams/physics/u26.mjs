// Unit 26, General Relativity. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u26.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const G = 6.674e-11, c = 2.998e8, Msun = 1.989e30, perSun = (2 * G * Msun) / (c * c) / 1000; // km per solar mass

// u26-09 the Schwarzschild radius r_s = 2GM/c²
{ const f = `${perSun}*x`, at10 = perSun * 10;
  mk("u26-09", "phys-u26-schwarzschild-radius", "graph", {
    title: "Schwarzschild radius grows in proportion to mass",
    caption: `r_s = 2GM/c² is about ${r(perSun, 2)} km for each solar mass, so a 10 M☉ black hole has r_s ≈ ${r(at10, 1)} km: a horizon the size of a city.`,
    alt: "Schwarzschild radius in kilometres against mass in solar masses, a straight line through the origin reaching 29.5 kilometres at 10 solar masses.",
    description: [`r_s = 2GM/c² = ${r(perSun, 3)} km × (M / M☉).`, `10 M☉: ${r(at10, 1)} km.`, "Doubling the mass doubles the radius, so the mean density inside falls as 1/M²: supermassive black holes are less dense than water."],
    range: { x: [0, 20], y: [0, 65] }, ticks: [[5, 10, 15, 20], [15, 30, 45, 60]], height: [320, 300], xLabelBelow: true, axisLabels: ["mass / M☉", "Schwarzschild radius / km"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 10, to: at10 }],
    points: [{ x: 10, y: r(at10, 4), colour: "a2", label: `${r(at10, 1)} km at 10 M☉`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: 10, y: r(at10, 6), name: `r_s = ${r(at10, 1)} km for 10 M☉` }, { type: "point", expr: "2*6.674*1.989/2.998^2+0*x", x: 0, y: r(perSun, 8), name: `2GM☉/c² = ${r(perSun, 2)} km (powers of ten cancel to km)` }],
  }); }

// u26-10 the Kerr horizon r₊ = (GM/c²)(1 + √(1 − χ²)), as a fraction of the non-rotating r_s = 2GM/c²
{ const f = "(1+sqrt(1-x^2))/2";
  mk("u26-10", "phys-u26-kerr-horizon", "graph", {
    title: "Spin shrinks a black hole's horizon",
    caption: "For a rotating (Kerr) black hole the horizon is at r₊ = (GM/c²)(1 + √(1 − χ²)). A non-rotating hole (χ = 0) has r₊ = 2GM/c² = r_s; at maximal spin (χ = 1) the horizon shrinks to GM/c², half of r_s.",
    alt: "Horizon radius as a fraction of the Schwarzschild radius against spin parameter, falling slowly from 1 at zero spin and then steeply to 0.5 at maximal spin.",
    description: ["Spin χ = cJ/(GM²), from 0 (no rotation) to 1 (maximal).", "r₊ / r_s = (1 + √(1 − χ²)) / 2.", "χ = 0: 1. χ = 0.9: 0.72. χ = 1: 0.5."],
    range: { x: [0, 1], y: [0, 1.1] }, ticks: [[0.25, 0.5, 0.75, 1], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["spin χ", "horizon radius / r_{s}"],
    curves: [{ expr: f, colour: "a1", samples: 600 }],
    points: [{ x: 1, y: 0.5, colour: "a2", label: "χ = 1: r_{s}/2", anchor: "end", dx: -10, dy: 0 }],
    checks: [{ type: "point", expr: f, x: 0, y: 1, name: "no spin: the Schwarzschild radius" }, { type: "point", expr: f, x: 1, y: 0.5, name: "maximal spin: half of r_s" }],
  }); }

// u26-15 clock rate near a black hole: dτ/dt = √(1 − r_s/r)
{ const f = "sqrt(1-1/x)";
  mk("u26-15", "phys-u26-clock-rate-horizon", "graph", {
    title: "Clocks slow down near the horizon",
    caption: `A clock held at rest at radius r ticks at √(1 − r_s/r) of the rate of a distant clock. At 4r_s it runs at ${r(Math.sqrt(0.75), 3)}; at 1.1r_s at ${r(Math.sqrt(1 - 1 / 1.1), 2)}; at the horizon the factor reaches zero: seen from far away, nothing ever crosses it.`,
    alt: "Clock rate relative to a distant clock against distance from the black hole in Schwarzschild radii: zero at the horizon, rising steeply and levelling towards 1.",
    description: ["Distance in units of the Schwarzschild radius r_s.", "Rate = √(1 − r_s/r) for a clock at rest.", `r = 4r_s: ${r(Math.sqrt(0.75), 3)}. r = 1.1r_s: ${r(Math.sqrt(1 - 1 / 1.1), 3)}. r = r_s: 0.`, "Far away the rate tends to 1."],
    range: { x: [1, 10], y: [0, 1.05] }, ticks: [[2, 4, 6, 8, 10], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["r / r_{s}", "clock rate / distant rate"],
    curves: [{ expr: f, domain: [1, 10], colour: "a1", samples: 800 }],
    points: [{ x: 4, y: r(Math.sqrt(0.75), 5), colour: "a2", label: `${r(Math.sqrt(0.75), 3)} at 4r_{s}`, dx: 8, dy: 16 }, { x: 1, y: 0, colour: "ink", label: "horizon", dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: 4, y: r(Math.sqrt(0.75), 8), name: "√(3/4) at 4r_s" }, { type: "point", expr: f, x: 1, y: 0, name: "zero at the horizon" }],
  }); }
