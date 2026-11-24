// Unit 34, Biophysics. Every number in a caption or claim is computed here once, from the lesson's own worked example.
// Run: node scripts/diagrams/physics/u34.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u34-03 Poiseuille flow Q ∝ r⁴
{ const f = "x^4", at = 0.75 ** 4;
  mk("u34-03", "phys-u34-poiseuille", "graph", {
    title: "Flow through a narrowed artery",
    caption: `At the same pressure difference, Poiseuille flow goes as the fourth power of the radius. Narrowing an artery to 75% of its radius cuts the flow to 0.75⁴ = ${r(at, 2)}, about a third.`,
    alt: "Relative flow against relative radius, a steep fourth-power curve, with 0.32 at 0.75 marked.",
    description: ["Q ∝ r⁴ (Poiseuille), at fixed pressure difference, length and viscosity.", `r = 0.75 r₀: Q = ${r(at, 3)} Q₀.`, "r = 0.5 r₀: Q = 0.0625 Q₀. Small narrowings matter a great deal."],
    range: { x: [0, 1], y: [0, 1.05] }, ticks: [[0.25, 0.5, 0.75, 1], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["radius / original radius", "flow / original flow"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 0.75, to: at }],
    points: [{ x: 0.75, y: r(at, 5), colour: "a2", label: `${r(at, 2)} at 75% radius`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: 0.75, y: r(at, 8), name: `0.75⁴ = ${r(at, 3)}` }],
  }); }

// u34-04 diffusion time t ≈ x²/2D for oxygen, D = 2 × 10⁻⁹ m² s⁻¹
{ const t = "x^2/(2*0.002)"; // x in mm, D = 0.002 mm² s⁻¹
  mk("u34-04", "phys-u34-diffusion-time", "graph", {
    title: "Diffusion is fast over microns, slow over millimetres",
    caption: "The time to diffuse a distance x grows as x²/2D. Oxygen (D = 2 × 10⁻⁹ m² s⁻¹) crosses 1 mm in about 250 s, but 10 μm in about 25 ms. Beyond a fraction of a millimetre, organisms need circulation.",
    alt: "Diffusion time against distance, a parabola rising to 250 seconds at 1 millimetre and 1000 seconds at 2 millimetres.",
    description: ["t ≈ x² / (2D), D = 2 × 10⁻⁹ m² s⁻¹ = 0.002 mm² s⁻¹.", "x = 1 mm: 1 / 0.004 = 250 s.", "x = 2 mm: 1000 s. Doubling the distance quadruples the time.", "x = 10 μm: 0.025 s."],
    range: { x: [0, 2], y: [0, 1100] }, ticks: [[0.5, 1, 1.5, 2], [250, 500, 750, 1000]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance / mm", "time / s"],
    curves: [{ expr: t, colour: "a1" }], marks: [{ x: 1, to: 250 }],
    points: [{ x: 1, y: 250, colour: "a2", label: "250 s for 1 mm", anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: t, x: 1, y: 250, name: "250 s to diffuse 1 mm" }, { type: "point", expr: t, x: 2, y: 1000, name: "twice the distance, four times the time" }],
  }); }

// u34-11 the Nernst potential for K⁺ (140 mM inside) against the outside concentration, at 310 K
{ const RTF = 26.7, E = `${RTF}*log(x/140)`, at5 = RTF * Math.log(5 / 140);
  mk("u34-11", "phys-u34-nernst", "graph", {
    title: "The Nernst potential for potassium",
    caption: `With 140 mM K⁺ inside, the membrane potential at which K⁺ stops flowing is E = (26.7 mV) ln(c_out/140) at 310 K. At the usual 5 mM outside it is ${r(at5, 0)} mV, close to a neuron's resting potential; raising outside K⁺ depolarises the cell.`,
    alt: "Nernst potential in millivolts against outside potassium concentration, a logarithmic curve rising from about minus 130 at 1 millimolar through minus 89 at 5 to zero at 140.",
    description: ["E_K = (RT/F) ln(c_out / c_in), RT/F = 26.7 mV at 310 K, c_in = 140 mM.", `c_out = 5 mM: 26.7 × ln(5/140) = ${r(at5, 1)} mV.`, "c_out = 140 mM: 0 mV (no gradient)."],
    range: { x: [0, 150], y: [-140, 10] }, ticks: [[5, 50, 100, 150], [-120, -90, -60, -30, 0]], height: [320, 300], xLabelBelow: true, axisLabels: ["K⁺ outside / mM", "Nernst potential / mV"],
    curves: [{ expr: E, domain: [1, 150], colour: "a1" }], marks: [{ x: 5, to: at5 }],
    points: [{ x: 5, y: r(at5, 4), colour: "a2", label: `${r(at5, 0)} mV at 5 mM`, dx: 10, dy: 14 }],
    checks: [{ type: "point", expr: E, x: 5, y: r(at5, 6), name: `${r(at5, 0)} mV at 5 mM outside` }, { type: "point", expr: E, x: 140, y: 0, name: "no potential with equal concentrations" }],
  }); }

// u34-19 the linear-quadratic survival curve S = e^(−αD − βD²), α = 0.3 Gy⁻¹, β = 0.03 Gy⁻²
{ const S = "exp(-0.3*x-0.03*x^2)", at2 = Math.exp(-0.72);
  mk("u34-19", "phys-u34-cell-survival", "graph", {
    title: "Cell survival after a dose of radiation",
    caption: `In the linear-quadratic model the surviving fraction is S = e^(−αD − βD²). With α = 0.3 Gy⁻¹ and β = 0.03 Gy⁻², a 2 Gy dose leaves ${r(at2, 2)} of cells surviving. The βD² term bends the curve down at high doses, which is why radiotherapy is split into many small fractions.`,
    alt: "Surviving fraction against dose in grays, falling from 1, with 0.49 at 2 gray marked, curving downward more steeply at higher doses.",
    description: ["S = exp(−0.3D − 0.03D²).", `D = 2 Gy: exponent −0.6 − 0.12 = −0.72, S = ${r(at2, 3)}.`, `D = 6 Gy: S = ${r(Math.exp(-1.8 - 1.08), 3)}.`],
    range: { x: [0, 8], y: [0, 1.05] }, ticks: [[2, 4, 6, 8], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["dose / Gy", "surviving fraction"],
    curves: [{ expr: S, colour: "a1" }], marks: [{ x: 2, to: at2 }],
    points: [{ x: 2, y: r(at2, 5), colour: "a2", label: `${r(at2, 2)} at 2 Gy`, dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: S, x: 2, y: r(at2, 8), name: `S(2 Gy) = ${r(at2, 3)}` }],
  }); }
