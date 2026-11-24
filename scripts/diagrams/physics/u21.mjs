// Unit 21, Atomic Physics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u21.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const hc = 1239.84; // eV nm

// u21-03 Bohr radii r_n = n² a₀
{ const a0 = 0.0529, items = [1, 2, 3, 4].map((n) => ({ key: `n = ${n}`, value: r(n * n * a0, 3) }));
  mk("u21-03", "phys-u21-bohr-radii", "trend", {
    title: "Bohr orbits grow as n²",
    caption: `In the Bohr model r_n = n²a₀ with a₀ = ${a0} nm. The n = 2 orbit is four times the ground-state radius, ${items[1].value} nm, and the electron there moves at half the speed (v ∝ 1/n).`,
    alt: "Bar chart of Bohr orbit radii: 0.053, 0.212, 0.476 and 0.846 nanometres for n = 1 to 4.",
    description: items.map((it, i) => `n = ${i + 1}: r = ${(i + 1) ** 2} × ${a0} = ${it.value} nm.`).concat([`The speed falls as 1/n: 2.19 × 10⁶ m s⁻¹ for n = 1, ${r(2.19 / 2, 2)} × 10⁶ m s⁻¹ for n = 2.`]),
    kind: "bars", range: [0, 1], ticks: [0, 0.25, 0.5, 0.75, 1], yLabel: "orbit radius / nm", items,
    claims: [{ type: "increasing" }],
  }); }

// u21-07 the sodium D line: 3p → 3s
{ const s = -5.139, p = -3.034, dE = p - s;
  mk("u21-07", "phys-u21-sodium-d", "transitions", {
    title: "Sodium's yellow line",
    caption: `The 3p level lies ${r(dE, 3)} eV above the 3s ground state. An electron falling between them emits a photon of λ = hc/ΔE = ${r(hc / dE, 0)} nm, the yellow of sodium street lamps.`,
    alt: "Energy levels of sodium: 3s at minus 5.14 electronvolts and 3p at minus 3.03, with a downward arrow emitting 589 nanometre yellow light.",
    description: [`3s (ground state): ${s} eV. 3p: ${p} eV.`, `ΔE = ${r(dE, 3)} eV.`, `λ = ${hc} eV nm / ${r(dE, 3)} eV = ${r(hc / dE, 1)} nm, in the visible (yellow).`],
    levels: [{ E: s, label: "3s" }, { E: p, label: "3p" }, { E: 0, label: "ionised" }],
    transitions: [{ from: 1, to: 0, lambda: r(hc / dE, 1), E: r(dE, 3), kind: "emission", region: "visible" }], spectrum: true,
  }); }

// u21-08 hydrogen-like Li²⁺: E_n = −13.6 Z²/n²
{ const Z = 3, E = (n) => r((-13.6057 * Z * Z) / (n * n), 3), dE = E(2) - E(1);
  mk("u21-08", "phys-u21-lithium-ion", "transitions", {
    title: "Hydrogen-like Li²⁺",
    caption: `With one electron and Z = 3, the energies are Z² = 9 times hydrogen's: E_n = −13.6 × 9 / n² eV. The n = 2 → 1 photon carries ${r(dE, 1)} eV, so λ = ${r(hc / dE, 1)} nm, one ninth of hydrogen's 121.5 nm Lyman-α, deep in the ultraviolet.`,
    alt: "Energy levels of the lithium 2+ ion at minus 122.4, minus 30.6, minus 13.6 and minus 7.7 electronvolts, with the 2 to 1 transition at 13.5 nanometres.",
    description: [`E₁ = ${E(1)} eV, E₂ = ${E(2)} eV, E₃ = ${E(3)} eV, E₄ = ${E(4)} eV.`, `ΔE(2 → 1) = ${r(dE, 2)} eV.`, `λ = ${hc} / ${r(dE, 2)} = ${r(hc / dE, 2)} nm.`],
    levels: [1, 2, 3, 4].map((n) => ({ n, E: E(n) })), scale: "sqrt",
    transitions: [{ from: 2, to: 1, lambda: r(hc / dE, 2), E: r(dE, 2), kind: "emission", region: "ultraviolet" }],
  }); }

// u21-09 Moseley's law: Kα energy ≈ 10.2 eV × (Z − 1)²
{ const f = "0.0102*(x-1)^2", Cu = 0.0102 * 28 * 28;
  mk("u21-09", "phys-u21-moseley", "graph", {
    title: "Moseley's law",
    caption: `A Kα X-ray comes from an L electron filling a K vacancy; the K electron left behind screens one unit of charge, so E ≈ 10.2 eV × (Z − 1)². For copper (Z = 29): 10.2 × 28² eV = ${r(Cu, 2)} keV. Moseley used this to order the elements by atomic number.`,
    alt: "Kα energy against atomic number, a curve rising as Z minus 1 squared, with copper marked at 8.0 kiloelectronvolts.",
    description: ["E(Kα) = (3/4) × 13.6 eV × (Z − 1)² = 10.2 eV × (Z − 1)².", `Copper, Z = 29: ${r(Cu, 3)} keV.`, "√E against Z is a straight line: each element's place in the table is fixed by its nuclear charge."],
    range: { x: [10, 45], y: [0, 20] }, ticks: [[10, 20, 29, 40], [5, 10, 15, 20]], height: [320, 300], xLabelBelow: true, axisLabels: ["atomic number Z", "Kα energy / keV"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 29, to: Cu }],
    points: [{ x: 29, y: r(Cu, 4), colour: "a2", label: `Cu: ${Cu.toFixed(1)} keV`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: 29, y: r(Cu, 6), name: `copper Kα = ${r(Cu, 2)} keV` }, { type: "point", expr: "sqrt(0.0102)*(x-1)", x: 29, y: r(Math.sqrt(Cu), 6), name: "√E is linear in Z" }],
  }); }

// u21-16 the Balmer series of hydrogen
{ const H = (n) => r(-13.6057 / (n * n), 3), lines = [3, 4, 5].map((n) => [n, r(hc / (H(n) - H(2)), 1)]);
  mk("u21-16", "phys-u21-balmer-series", "transitions", {
    title: "The Balmer series of hydrogen",
    caption: `Electrons falling to n = 2 emit the visible Balmer lines: Hα ${lines[0][1]} nm (red), Hβ ${lines[1][1]} nm (blue-green) and Hγ ${lines[2][1]} nm (violet); Hδ, from n = 6, is at ${r(hc / (H(6) - H(2)), 1)} nm. In a quasar Hα arrives at 984 nm, so its redshift is z = 984/656.3 − 1 = ${r(984 / 656.3 - 1, 2)}.`,
    alt: "Hydrogen energy levels n = 1 to 6 with downward arrows from n = 3, 4 and 5 to n = 2, and a line spectrum of three visible lines.",
    description: [`Levels E_n = −13.6/n² eV.`, ...lines.map(([n, l]) => `${n} → 2: ${l} nm.`), "Transitions to n = 1 (Lyman) are ultraviolet; to n = 3 (Paschen) infrared."],
    atom: "H", scale: "sqrt", spectrum: true, levels: [1, 2, 3, 4, 5, 6].map((n) => ({ n, E: H(n) })),
    transitions: lines.map(([n, l]) => ({ from: n, to: 2, lambda: l, kind: "emission", region: "visible" })),
  }); }

// u21-19 natural linewidth: τ = 16 ns (sodium D)
{ const tau = 16e-9, dnu = 1 / (2 * Math.PI * tau) / 1e6, L = `1/(1+(2*x/${r(dnu, 4)})^2)`;
  mk("u21-19", "phys-u21-natural-linewidth", "graph", {
    title: "Natural linewidth",
    caption: `A state that lives τ = 16 ns cannot have a perfectly sharp energy: the line has a Lorentzian shape with full width at half maximum Δν = 1/(2πτ) = ${r(dnu, 1)} MHz. Shorter-lived states give broader lines.`,
    alt: "A Lorentzian line shape centred on the transition frequency, with its full width at half maximum of about 10 megahertz marked.",
    description: ["Horizontal axis: detuning from the line centre in MHz.", `Lifetime τ = 16 ns: Δν = 1 / (2π × 16 × 10⁻⁹ s) = ${r(dnu, 2)} MHz.`, "The intensity falls to half at ±Δν/2 from the centre."],
    range: { x: [-30, 30], y: [0, 1.1] }, ticks: [[-30, -20, -10, 0, 10, 20, 30], [0.5, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["detuning / MHz", "intensity (relative)"],
    curves: [{ expr: L, colour: "a1" }],
    arrows: [{ from: [-dnu / 2, 0.5], to: [dnu / 2, 0.5], both: true, colour: "a2", label: `Δν = ${r(dnu, 1)} MHz`, labelAt: [dnu / 2 + 2, 0.58] }],
    checks: [{ type: "point", expr: L, x: r(dnu / 2, 4), y: 0.5, name: "half maximum at Δν/2" }, { type: "max", expr: L, domain: [-30, 30], x: 0, y: 1, name: "peak at the line centre" }],
  }); }
