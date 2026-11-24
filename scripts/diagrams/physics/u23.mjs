// Unit 23, Nuclear Physics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u23.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const u = 931.494; // MeV per u

// u23-04 binding energy per nucleon from the semi-empirical mass formula (the lesson's coefficients)
{ const Z = "(x/(2+0.0153*x^(2/3)))", BA = `15.8-18.3*x^(-1/3)-0.71*${Z}^2/x^(4/3)-23.2*(x-2*${Z})^2/x^2`;
  const zf = (A) => A / (2 + 0.0153 * A ** (2 / 3)), semf = (A) => 15.8 - 18.3 * A ** (-1 / 3) - (0.71 * zf(A) ** 2) / A ** (4 / 3) - (23.2 * (A - 2 * zf(A)) ** 2) / (A * A);
  mk("u23-04", "phys-u23-binding-curve", "graph", {
    title: "Binding energy per nucleon",
    caption: `Binding energy per nucleon rises steeply through the light nuclei (⁴He 7.07 MeV), peaks near 8.8 MeV around iron and nickel, and falls slowly to about 7.6 MeV for uranium. Light nuclei release energy by fusing, heavy ones by splitting. The curve is the semi-empirical mass formula with the lesson's coefficients; the points are measured values.`,
    alt: "Binding energy per nucleon against mass number: a curve rising steeply to a broad peak of about 8.8 MeV near mass 56 to 62, then falling gently to about 7.6 at 238, with measured points for helium-4, iron-56 and uranium-238.",
    description: ["Curve: B/A from the semi-empirical mass formula, a_V = 15.8, a_S = 18.3, a_C = 0.71, a_A = 23.2 MeV, along the valley of stability.", "Points: ⁴He 7.07 MeV, ⁵⁶Fe 8.79 MeV, ²³⁸U 7.57 MeV per nucleon.",
      `The formula gives ${r(semf(56), 2)} MeV at A = 56 and ${r(semf(238), 2)} MeV at A = 238.`, "Fusion moves nuclei up the steep left side; fission moves them up from the right."],
    range: { x: [0, 250], y: [0, 10] }, ticks: [[50, 100, 150, 200, 250], [2, 4, 6, 8, 10]], height: [320, 300], xLabelBelow: true, axisLabels: ["mass number A", "binding energy per nucleon / MeV"],
    curves: [{ expr: BA, domain: [12, 250], colour: "a1" }],
    points: [{ x: 4, y: 7.07, colour: "a2", label: "⁴He", dx: 10, dy: 0 }, { x: 56, y: 8.79, colour: "a2", label: "⁵⁶Fe", dx: 0, dy: -16 }, { x: 238, y: 7.57, colour: "a2", label: "²³⁸U", anchor: "end", dx: -8, dy: -14 }],
    arrows: [{ from: [20, 4], to: [45, 7.4], colour: "a4", label: "fusion", labelAt: [34, 3.6] }, { from: [200, 5.2], to: [110, 7.6], colour: "a3", label: "fission", labelAt: [168, 5.4] }],
    checks: [{ type: "value", expr: BA, x: 56, between: [8.6, 8.95], name: "near 8.8 MeV per nucleon at iron" }, { type: "value", expr: BA, x: 238, between: [7.4, 7.75], name: "about 7.6 MeV per nucleon for uranium" }, { type: "order", a: BA, b: BA.replaceAll("x", "(x*0+238)"), x: 56, rel: ">", name: "iron is more tightly bound than uranium" }],
  }); }

// u23-05 D + T → ⁴He + n
mk("u23-05", "phys-u23-dt-fusion", "nuclear", {
  title: "Energy from D–T fusion",
  caption: "The products are lighter than the reactants by 0.018 89 u. That mass defect appears as kinetic energy: Q = Δm × 931.5 MeV u⁻¹ = 17.6 MeV per reaction, most of it carried by the neutron.",
  alt: "Reaction: deuterium plus tritium gives helium-4 plus a neutron, releasing 17.6 MeV.",
  description: ["²H (2.014 102 u) + ³H (3.016 049 u) → ⁴He (4.002 602 u) + n (1.008 665 u).", "Nucleon number 2 + 3 = 4 + 1 and proton number 1 + 1 = 2 + 0 balance.", `Δm = 5.030 151 − 5.011 267 = 0.018 884 u; Q = 0.018 884 × ${u} = ${r(0.018884 * u, 1)} MeV.`],
  mode: "reaction", lhs: [{ sym: "H", A: 2, Z: 1, m: 2.014102 }, { sym: "H", A: 3, Z: 1, m: 3.016049 }], rhs: [{ sym: "He", A: 4, Z: 2, m: 4.002602 }, "n"], Q: r(0.018884 * u, 2),
});

// u23-09 radium-226 alpha decay
mk("u23-09", "phys-u23-radium-alpha", "nuclear", {
  title: "Alpha decay of radium-226",
  caption: "An alpha particle carries off 2 protons and 2 neutrons, so A falls by 4 and Z by 2: radium-226 (Z = 88) becomes radon-222 (Z = 86).",
  alt: "Decay step: radium-226 emits an alpha particle and becomes radon-222.",
  description: ["²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He.", "Mass number: 226 = 222 + 4. Proton number: 88 = 86 + 2.", "Radon is a gas, which is why radium in rocks leads to radon in buildings."],
  mode: "chain", start: { sym: "Ra", A: 226, Z: 88 }, steps: [{ decay: "alpha", to: { sym: "Rn", A: 222, Z: 86 }, halfLife: "1600 yr" }], counts: { alpha: 1, beta: 0 },
});

// u23-10 uranium–lead dating: equal parent and daughter after one half-life
{ const T = 4.5, P = `2^(-x/${T})`, D = `1-2^(-x/${T})`;
  mk("u23-10", "phys-u23-uranium-lead", "graph", {
    title: "Dating a rock by uranium and lead",
    caption: `Starting with no lead, ²³⁸U decays (through a chain) to ²⁰⁶Pb. The fractions cross when half the uranium has gone: equal numbers of parent and daughter mean the rock is one half-life old, ${T} × 10⁹ years.`,
    alt: "Fractions of uranium-238 falling and lead-206 rising with time, crossing at one half at 4.5 billion years.",
    description: [`Uranium remaining: 2^(−t/${T} Gyr). Lead formed: 1 − 2^(−t/${T} Gyr).`, `They are equal (D/P = 1) at t = t½ = ${T} × 10⁹ years.`, "At two half-lives the ratio D/P is 3, at three it is 7."],
    range: { x: [0, 14], y: [0, 1.05] }, ticks: [[4.5, 9, 13.5], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / 10⁹ years", "fraction of original uranium atoms"],
    curves: [{ expr: P, colour: "a1", label: "²³⁸U remaining", labelAt: [0.4, 0.93] }, { expr: D, colour: "a2", label: "²⁰⁶Pb formed", labelAt: [8.6, 0.88] }],
    marks: [{ x: T, to: 0.5 }], points: [{ x: T, y: 0.5, colour: "ink" }],
    checks: [{ type: "intersect", a: P, b: D, x: T, y: 0.5, name: "parent and daughter equal after one half-life" }, { type: "point", expr: D, x: 2 * T, y: 0.75, name: "three quarters decayed after two half-lives" }],
  }); }

// u23-11 a fission reaction: ²³⁵U + n → ¹⁴¹Ba + ⁹²Kr + 3n
{ const m = { U: 235.043930, n: 1.008665, Ba: 140.914412, Kr: 91.926156 }, Q = (m.U + m.n - m.Ba - m.Kr - 3 * m.n) * u;
  mk("u23-11", "phys-u23-fission-reaction", "nuclear", {
    title: "Balancing a fission reaction",
    caption: `Nucleon and proton numbers must balance: 235 + 1 = 141 + 92 + 3 and 92 = 56 + 36, so three neutrons are released. The products are lighter by ${r(Q / u, 4)} u, about ${r(Q, -1)} MeV, and the extra neutrons can sustain a chain reaction.`,
    alt: "Reaction: uranium-235 plus a neutron gives barium-141, krypton-92 and three neutrons, releasing about 170 MeV.",
    description: ["²³⁵₉₂U + ¹₀n → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n.", "A: 236 on each side. Z: 92 on each side.", `Q from atomic masses: ${r(Q, 0)} MeV, most of it the kinetic energy of the two fragments.`],
    mode: "reaction", lhs: [{ sym: "U", A: 235, Z: 92, m: m.U }, "n"], rhs: [{ sym: "Ba", A: 141, Z: 56, m: m.Ba }, { sym: "Kr", A: 92, Z: 36, m: m.Kr }, "n", "n", "n"], Q: r(Q, 1),
  }); }

// u23-16 a supercritical reactor: k = 1.001, generation time 0.1 s
{ const k = 1.001, tg = 0.1, per = tg / (k - 1), P = `exp(x/${per})`;
  mk("u23-16", "phys-u23-reactor-growth", "graph", {
    title: "Power growth in a slightly supercritical reactor",
    caption: `Each generation multiplies the neutron population by k = ${k}. With a ${tg} s generation time the power grows as e^(t/T) with period T = τ/(k − 1) = ${r(per, 0)} s: it rises by e ≈ 2.7 every ${r(per, 0)} s, slow enough for control rods to respond (delayed neutrons slow it further still).`,
    alt: "Relative power against time rising exponentially, reaching 2.7 times at 100 seconds and about 20 times at 300 seconds.",
    description: [`k = ${k}, generation time ${tg} s.`, `Reactor period T = ${tg} / ${r(k - 1, 3)} = ${r(per, 0)} s.`, `After ${r(per, 0)} s: ×e = 2.72. After 300 s: ×${r(Math.exp(3), 1)}.`],
    range: { x: [0, 300], y: [0, 22] }, ticks: [[100, 200, 300], [5, 10, 15, 20]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "power (relative)"],
    curves: [{ expr: P, colour: "a1" }], marks: [{ x: per, to: Math.E }],
    points: [{ x: per, y: r(Math.E, 4), colour: "a2", label: `×e after ${r(per, 0)} s`, dx: -6, dy: -16, anchor: "end" }],
    checks: [{ type: "point", expr: P, x: per, y: r(Math.E, 6), name: `period ${r(per, 0)} s` }, { type: "point", expr: `${tg}/(${k}-1)+0*x`, x: 0, y: r(per, 6), name: "T = τ/(k − 1)" }],
  }); }

// u23-21 lead shielding: half-value layer 9 mm, reduce by 1000
{ const hvl = 9, x1000 = hvl * Math.log2(1000), I = `100*2^(-x/${hvl})`;
  mk("u23-21", "phys-u23-lead-shielding", "graph", {
    title: "Shielding gamma rays with lead",
    caption: `Each 9 mm of lead halves the dose rate. Cutting it by 1000 needs log₂ 1000 ≈ ${r(Math.log2(1000), 2)} half-value layers: ${r(x1000, 0)} mm, about 9 cm.`,
    alt: "Percentage of the dose rate transmitted against lead thickness, halving every 9 millimetres and reaching 0.1 percent at 90 millimetres.",
    description: ["Transmitted fraction = 2^(−x / 9 mm).", "9 mm: 50%. 18 mm: 25%. 27 mm: 12.5%.", `0.1% (a factor of 1000) at x = 9 × log₂ 1000 = ${r(x1000, 1)} mm.`],
    range: { x: [0, 100], y: [0, 105] }, ticks: [[9, 18, 27, 45, 90], [25, 50, 75, 100]], height: [320, 300], xLabelBelow: true, axisLabels: ["lead thickness / mm", "dose rate transmitted / %"],
    curves: [{ expr: I, colour: "a1" }], marks: [{ x: hvl, to: 50 }, { y: 50, to: hvl }],
    points: [{ x: hvl, y: 50, colour: "a2", label: "50% at 9 mm", dx: 10, dy: -10 }, { x: r(x1000, 4), y: 0.1, colour: "a2", label: `0.1% at ${r(x1000, 0)} mm`, anchor: "end", dx: -6, dy: -16 }],
    checks: [{ type: "point", expr: I, x: hvl, y: 50, name: "half the dose rate per 9 mm" }, { type: "point", expr: I, x: r(x1000, 8), y: 0.1, name: `a factor of 1000 at ${r(x1000, 1)} mm` }],
  }); }
