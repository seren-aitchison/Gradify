// Unit 31, Cosmology. Every number in a caption or claim is computed here once, from the lesson's own worked example.
// Run: node scripts/diagrams/physics/u31.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u31-04 Hubble's law, H₀ = 70 km s⁻¹ Mpc⁻¹
{ const H = 70, v = `${H}*x`;
  mk("u31-04", "phys-u31-hubble-law", "graph", {
    title: "Hubble's law",
    caption: `Recession speed is proportional to distance: v = H₀d. With H₀ = ${H} km s⁻¹ Mpc⁻¹ a galaxy 100 Mpc away recedes at ${H * 100} km s⁻¹. The gradient's inverse, 1/H₀, is roughly the age of the universe (about 14 Gyr).`,
    alt: "Recession speed against distance, a straight line through the origin with gradient 70, passing 7000 kilometres per second at 100 megaparsecs.",
    description: [`v = ${H} km s⁻¹ Mpc⁻¹ × d.`, `d = 100 Mpc: v = ${H * 100} km s⁻¹.`, "1/H₀ = 14.0 × 10⁹ years: the Hubble time."],
    range: { x: [0, 200], y: [0, 15000] }, ticks: [[50, 100, 150, 200], [5000, 10000, 15000]], height: [320, 300], xLabelBelow: true, axisLabels: ["distance / Mpc", "recession speed / km s⁻¹"],
    curves: [{ expr: v, colour: "a1" }], marks: [{ x: 100, to: H * 100 }],
    points: [{ x: 100, y: H * 100, colour: "a2", label: `${H * 100} km s⁻¹ at 100 Mpc`, dx: 10, dy: 14 }],
    checks: [{ type: "point", expr: v, x: 100, y: H * 100, name: `${H * 100} km s⁻¹ at 100 Mpc` }, { type: "slope", expr: v, x: 50, value: H, name: `gradient H₀ = ${H}` }],
  }); }

// u31-08 the CMB blackbody, T = 2.725 K
{ const T = 2.725, c2 = 14.388, peak = 2.8978 / T, B = (x) => 1 / (x ** 5 * (Math.exp(c2 / (x * T)) - 1)), S = 1 / B(peak), f = `${S}/(x^5*(exp(${c2}/(x*${T}))-1))`;
  mk("u31-08", "phys-u31-cmb-spectrum", "graph", {
    title: "The cosmic microwave background spectrum",
    caption: `The CMB is the most perfect blackbody known, at T = ${T} K. Wien's law puts its peak at λ = 2.898 mm K / ${T} K = ${r(peak, 2)} mm, in the microwave band. It was emitted at about 3000 K and stretched by expansion (z ≈ 1100).`,
    alt: "Blackbody spectrum of the cosmic microwave background against wavelength in millimetres, peaking at 1.06 millimetres.",
    description: [`Planck curve for T = ${T} K, scaled to peak at 1.`, `Peak: ${r(peak, 3)} mm.`, "Shorter wavelengths fall off steeply; longer ones slowly (the Rayleigh–Jeans tail)."],
    range: { x: [0, 5], y: [0, 1.1] }, ticks: [[1, 2, 3, 4, 5], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["wavelength / mm", "spectral radiance (relative)"],
    curves: [{ expr: f, domain: [0.25, 5], colour: "a1" }], marks: [{ x: peak, to: 1, label: `${r(peak, 2)} mm` }],
    checks: [{ type: "max", expr: f, domain: [0.9, 1.25], x: r(peak, 3), y: 1, name: `the peak at ${r(peak, 2)} mm (Wien's law)` }],
  }); }

// u31-12 matter against dark energy with redshift: Ω_m(1 + z)³ against Ω_Λ
{ const Om = 0.31, OL = 0.69, m = `${Om}*(1+x)^3`, L = `${OL}+0*x`, zeq = (OL / Om) ** (1 / 3) - 1;
  mk("u31-12", "phys-u31-matter-vs-lambda", "graph", {
    title: "Matter thins out; dark energy does not",
    caption: `Matter density scales as (1 + z)³ while a cosmological constant stays fixed. With Ω_m = ${Om} and Ω_Λ = ${OL} today they were equal at z = ${r(zeq, 2)}. At z = 1 matter was ${r((Om * 8) / OL, 1)} times denser than dark energy, so dark energy dominates only recently.`,
    alt: "Density in units of today's critical density against redshift: matter rising steeply as one plus z cubed from 0.31, dark energy flat at 0.69, crossing at z = 0.31.",
    description: [`Matter: ${Om}(1 + z)³. Dark energy (w = −1): ${OL}, constant.`, `Equal when (1 + z)³ = ${OL}/${Om}: z = ${r(zeq, 3)}.`, `At z = 1: matter ${r(Om * 8, 2)} against dark energy ${OL}, a ratio of ${r((Om * 8) / OL, 2)}.`],
    range: { x: [0, 2], y: [0, 3] }, ticks: [[0.5, 1, 1.5, 2], [0.5, 1, 1.5, 2, 2.5, 3]], height: [320, 300], xLabelBelow: true, axisLabels: ["redshift z", "density / today's critical density"],
    curves: [{ expr: m, domain: [0, 1.15], colour: "a1", label: "matter ∝ (1 + z)³", labelAt: [1.05, 1.6] }, { expr: L, colour: "a2", label: "dark energy (constant)", labelAt: [1.2, 0.85] }],
    marks: [{ x: zeq, to: OL }], points: [{ x: r(zeq, 5), y: OL, colour: "ink", label: `equal at z = ${r(zeq, 2)}`, dx: 10, dy: 16 }],
    checks: [{ type: "intersect", a: m, b: L, x: r(zeq, 6), y: OL, name: `equal at z = ${r(zeq, 2)}` }, { type: "point", expr: m, x: 1, y: r(Om * 8, 6), name: "eight times denser at z = 1" }],
  }); }

// u31-21 the matter fraction Ω_m(z)
{ const Om = 0.31, OL = 0.69, f = `${Om}*(1+x)^3/(${Om}*(1+x)^3+${OL})`, at3 = (Om * 64) / (Om * 64 + OL);
  mk("u31-21", "phys-u31-matter-fraction", "graph", {
    title: "The matter fraction in the past",
    caption: `Ω_m(z) = Ω_m(1 + z)³ / [Ω_m(1 + z)³ + Ω_Λ]. Today it is ${Om}; at z = 3 it was ${r(at3, 3)}: the early universe was almost entirely matter-dominated (radiation aside), which is why structure could grow.`,
    alt: "Matter fraction of the total density against redshift, rising from 0.31 today towards 1, reaching 0.97 at z = 3.",
    description: [`Today (z = 0): ${Om}.`, `z = 1: ${r((Om * 8) / (Om * 8 + OL), 3)}.`, `z = 3: ${r(at3, 3)}.`, "Radiation, important only above z of a few thousand, is left out."],
    range: { x: [0, 4], y: [0, 1.1] }, ticks: [[1, 2, 3, 4], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["redshift z", "Ω_{m}(z)"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 3, to: at3 }],
    points: [{ x: 0, y: Om, colour: "a4", label: `today: ${Om}`, dx: 10, dy: 10 }, { x: 3, y: r(at3, 5), colour: "a2", label: `${r(at3, 2)} at z = 3`, dx: 6, dy: 18 }],
    checks: [{ type: "point", expr: f, x: 0, y: Om, name: `${Om} today` }, { type: "point", expr: f, x: 3, y: r(at3, 8), name: `${r(at3, 3)} at z = 3` }],
  }); }
