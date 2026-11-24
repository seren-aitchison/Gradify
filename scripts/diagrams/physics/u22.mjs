// Unit 22, Molecular Physics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u22.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u22-01 N₂ at room temperature: rotational spacing, k_BT and the vibrational quantum
{ const items = [{ key: "rotational spacing", value: 0.5 }, { key: "k_{B}T at 300 K", value: 25 }, { key: "vibrational quantum", value: 290 }];
  mk("u22-01", "phys-u22-n2-modes", "trend", {
    title: "Which modes of N₂ are excited at room temperature?",
    caption: "Rotational levels are spaced far below k_BT ≈ 0.025 eV, so many are populated. The vibrational quantum, 0.29 eV, is more than ten times k_BT, so almost every molecule stays in its vibrational ground state; electronic excitation (several eV) is further still.",
    alt: "Bar chart on a log scale: rotational spacing 0.5 meV, thermal energy 25 meV, vibrational quantum 290 meV.",
    description: ["Rotational spacing of N₂: about 0.0005 eV, 50 times smaller than k_BT: many rotational levels are occupied.", "k_BT at room temperature: about 0.025 eV.", "Vibrational quantum: 0.29 eV, about 12 k_BT: the Boltzmann factor e^(−12) leaves almost all molecules in v = 0."],
    kind: "bars", log: true, range: [0.1, 1000], ticks: [0.1, 1, 10, 100, 1000], yLabel: "energy / meV (log scale)", items, highlight: { "k_{B}T at 300 K": "a2" },
    claims: [{ type: "increasing" }],
  }); }

// u22-02 the rotational ladder of CO: lines 2B apart, 2B/h = 115 GHz
{ const B = 57.5e9, h = 4.135668e-15, E = (J) => r(h * B * J * (J + 1), 7), f = (J) => 2 * B * J;
  mk("u22-02", "phys-u22-co-rotation", "transitions", {
    title: "The rotational ladder of CO",
    caption: `Rotational energies go as E_J = hBJ(J + 1), so the gaps grow: a J → J − 1 photon has f = 2BJ. The lines are evenly spaced by 2B = ${r((2 * B) / 1e9, 0)} GHz: ${r(f(1) / 1e9, 0)}, ${r(f(2) / 1e9, 0)}, ${r(f(3) / 1e9, 0)} GHz: microwaves, with 345 GHz (0.87 mm) already in the far infrared.`,
    alt: "Rotational energy levels of carbon monoxide for J = 0 to 3, with gaps growing upward and transitions at 115, 230 and 345 gigahertz.",
    description: [`B = ${r(B / 1e9, 1)} GHz (in frequency units).`, `E_J = hBJ(J + 1): J = 1 at ${E(1)} eV, J = 2 at ${E(2)} eV, J = 3 at ${E(3)} eV.`, `Transitions J → J − 1: ${[1, 2, 3].map((J) => `${r(f(J) / 1e9, 0)} GHz`).join(", ")}, spaced by 2B.`, "From the spacing, the moment of inertia and then the bond length (about 0.113 nm) follow."],
    levels: [0, 1, 2, 3].map((J) => ({ E: E(J), label: `J = ${J}` })),
    transitions: [1, 2, 3].map((J) => ({ from: J, to: J - 1, f: f(J), label: `${r(f(J) / 1e9, 0)} GHz`, kind: "emission", region: J < 3 ? "microwave" : "infrared" })),
  }); }

// u22-05 the Lennard-Jones potential: minimum at r = 2^{1/6}σ, depth ε
{ const V = "4*((1/x)^12-(1/x)^6)", rmin = 2 ** (1 / 6);
  mk("u22-05", "phys-u22-lennard-jones", "graph", {
    title: "The Lennard-Jones potential",
    caption: `V = 4ε[(σ/r)¹² − (σ/r)⁶]: steep repulsion at short range, weak attraction further out. Setting dV/dr = 0 gives the equilibrium separation r₀ = 2^{1/6}σ = ${r(rmin, 3)}σ, where the well depth is ε.`,
    alt: "Potential energy against separation: a steep wall below 1 sigma, a minimum of minus epsilon at 1.12 sigma, rising towards zero at large separation.",
    description: ["Separation in units of σ; energy in units of ε.", "V = 0 at r = σ.", `The minimum is at r₀ = 2^{1/6}σ = ${r(rmin, 4)}σ, with V = −ε.`, "At r < σ the (σ/r)¹² repulsion dominates; beyond r₀ the −(σ/r)⁶ attraction fades."],
    range: { x: [0.9, 3], y: [-1.3, 1.5] }, ticks: [[1, 1.5, 2, 2.5, 3], [-1, -0.5, 0.5, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["r / σ", "V / ε"],
    curves: [{ expr: V, domain: [0.96, 3], colour: "a1", samples: 600 }], marks: [{ x: rmin, to: -1, label: "r₀" }, { y: -1 }],
    checks: [{ type: "min", expr: V, domain: [1, 3], x: r(rmin, 4), y: -1, name: `minimum −ε at r₀ = ${r(rmin, 3)}σ` }, { type: "point", expr: V, x: 1, y: 0, name: "V = 0 at r = σ" }],
  }); }

// u22-13 FRET efficiency E = 1 / (1 + (r/R₀)⁶)
{ const F = "1/(1+x^6)", at2 = 1 / 65;
  mk("u22-13", "phys-u22-fret", "graph", {
    title: "FRET efficiency against distance",
    caption: `Energy transfer falls as the sixth power of distance: E = 1/(1 + (r/R₀)⁶). At r = R₀ it is exactly 50%; at 2R₀ only 1/65 = ${r(at2 * 100, 1)}%. That steepness makes FRET a ruler for distances of a few nanometres.`,
    alt: "Transfer efficiency against distance in units of R zero, a steep sigmoid falling from 1 through 0.5 at 1 to 0.015 at 2.",
    description: ["Distance r in units of the Förster radius R₀.", "E = 1 / (1 + (r/R₀)⁶).", `r = R₀: E = 0.5. r = 2R₀: E = 1/65 = ${r(at2, 4)}.`],
    range: { x: [0, 2.5], y: [0, 1.1] }, ticks: [[0.5, 1, 1.5, 2, 2.5], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["r / R₀", "transfer efficiency"],
    curves: [{ expr: F, colour: "a1" }], marks: [{ x: 1, to: 0.5 }, { y: 0.5, to: 1 }],
    points: [{ x: 1, y: 0.5, colour: "a2", label: "50% at R₀", dx: 10, dy: -10 }, { x: 2, y: r(at2, 5), colour: "a2", label: `${r(at2 * 100, 1)}% at 2R₀`, dx: 4, dy: -16 }],
    checks: [{ type: "point", expr: F, x: 1, y: 0.5, name: "50% at R₀" }, { type: "point", expr: F, x: 2, y: r(at2, 8), name: "1/65 at 2R₀" }],
  }); }
