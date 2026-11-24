// Unit 27, Condensed Matter Physics. Every number in a caption or claim is computed here once, from the lesson's own
// worked example. Run: node scripts/diagrams/physics/u27.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const PI = "3.14159265";

// u27-08 phonon dispersion of a monatomic chain: ω = ω_max |sin(ka/2)|, ω_max = 2√(K/m)
{ const K = 10, m = 4.7e-26, wmax = 2 * Math.sqrt(K / m), w13 = wmax / 1e13, f = `${w13}*abs(sin(x/2))`;
  mk("u27-08", "phys-u27-chain-dispersion", "graph", {
    title: "Phonon dispersion of an atomic chain",
    caption: `For a chain of masses m joined by springs K, ω = 2√(K/m)|sin(ka/2)|. Near k = 0 the curve is a straight line (sound waves, speed set by the slope); at the zone edge, k = ±π/a, it flattens at ω_max = 2√(K/m) = ${r(w13, 2)} × 10¹³ rad s⁻¹ for the silicon-like chain.`,
    alt: "Angular frequency against wavevector from minus pi to pi over a: a sine-shaped arch, linear near zero and flat at a maximum of 2.92 times 10 to the 13 at the zone edges.",
    description: [`K = ${K} N m⁻¹, m = 4.7 × 10⁻²⁶ kg: ω_max = 2√(K/m) = ${r(w13, 3)} × 10¹³ rad s⁻¹.`, "ω = ω_max |sin(ka/2)| across the first Brillouin zone, −π/a to π/a.", "Small k: ω ≈ (a√(K/m))k, sound. Zone edge: the group velocity falls to zero (a standing wave)."],
    range: { x: [-3.2, 3.2], y: [0, 3.4] }, ticks: [[-3.14, -1.57, 1.57, 3.14], [1, 2, 3]], height: [320, 300], xLabelBelow: true, axisLabels: ["ka (from −π to π)", "ω / 10¹³ rad s⁻¹"],
    curves: [{ expr: f, domain: [-3.14159265, 3.14159265], colour: "a1" }], marks: [{ y: w13, label: `ω_{max} = ${r(w13, 2)}` }],
    checks: [{ type: "max", expr: f, domain: [0, 3.14159265], x: 3.1416, y: r(w13, 5), name: `ω_max = 2√(K/m) at the zone edge` }, { type: "slope", expr: f, x: 0.001, value: r(w13 / 2, 4), name: "linear near k = 0 (sound)" }],
  }); }

// u27-09 the Einstein heat capacity C/3R against T/θ_E
{ const C = "(1/x)^2*exp(1/x)/(exp(1/x)-1)^2", at = (t) => (1 / t) ** 2 * Math.exp(1 / t) / (Math.exp(1 / t) - 1) ** 2;
  mk("u27-09", "phys-u27-einstein-heat-capacity", "graph", {
    title: "Heat capacity of a solid falls at low temperature",
    caption: `Classically every solid has C = 3R per mole (Dulong–Petit). Quantised vibrations freeze out when k_BT is small compared with ħω: in the Einstein model C/3R = x²eˣ/(eˣ − 1)², x = θ_E/T. Diamond's vibrations are stiff (θ near 1300 K), so at room temperature it sits well below 3R (about ${r(at(300 / 1300), 2)} on this curve).`,
    alt: "Heat capacity as a fraction of 3R against temperature over the Einstein temperature, rising from zero in an S-shape towards 1.",
    description: ["Horizontal: T/θ_E. Vertical: C/3R.", `At T = θ_E: ${r(at(1), 3)}. At T = 2θ_E: ${r(at(2), 3)}, near the classical value.`, `At T = 0.23θ_E (diamond at 300 K): ${r(at(300 / 1300), 2)}.`, "At low temperature it falls off exponentially; the Debye model, with a spread of frequencies, gives the observed T³ instead."],
    range: { x: [0, 2], y: [0, 1.1] }, ticks: [[0.5, 1, 1.5, 2], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["T / θ_{E}", "C / 3R"],
    curves: [{ expr: C, domain: [0.03, 2], colour: "a1" }], marks: [{ y: 1, label: "Dulong–Petit, 3R" }],
    points: [{ x: r(300 / 1300, 4), y: r(at(300 / 1300), 5), colour: "a2", label: "diamond at 300 K", dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: C, x: 1, y: r(at(1), 8), name: `C/3R = ${r(at(1), 3)} at T = θ_E` }, { type: "value", expr: C, x: 2, between: [0.97, 1], name: "close to 3R at high temperature" }, { type: "value", expr: C, x: 0.1, between: [0, 0.01], name: "frozen out at low temperature" }],
  }); }

// u27-13 the Fermi–Dirac distribution
{ const f = "1/(exp(x)+1)";
  mk("u27-13", "phys-u27-fermi-dirac", "graph", {
    title: "The Fermi–Dirac distribution",
    caption: "At absolute zero every state below the Fermi energy is full and every state above is empty. At temperature T the edge softens over a few k_BT: the occupation is ½ exactly at E_F. For copper (E_F = 7.0 eV) the blur at room temperature, about 0.1 eV, is tiny compared with E_F.",
    alt: "Occupation probability against energy relative to the Fermi energy in units of kT: a smooth step from 1 to 0, passing one half at zero.",
    description: ["f(E) = 1 / (e^((E − E_F)/k_BT) + 1).", "Horizontal axis: (E − E_F) in units of k_BT.", `f = 0.5 at E_F; f = ${r(1 / (Math.exp(3) + 1), 3)} at 3k_BT above; ${r(1 / (Math.exp(-3) + 1), 3)} at 3k_BT below.`, "At T = 0 the curve becomes a sharp step."],
    range: { x: [-6, 6], y: [0, 1.1] }, ticks: [[-6, -3, 0, 3, 6], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["(E − E_{F}) / k_{B}T", "occupation f(E)"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ y: 0.5 }],
    checks: [{ type: "point", expr: f, x: 0, y: 0.5, name: "half occupied at the Fermi energy" }, { type: "point", expr: `${f}+1/(exp(-x)+1)`, x: 2, y: 1, name: "a hole below E_F mirrors an electron above it" }],
  }); }

// u27-16 resistance of copper wire with temperature: R = R₀(1 + αΔT)
{ const R0 = 10, a = 0.0039, f = `${R0}*(1+${a}*(x-20))`, R80 = R0 * (1 + a * 60);
  mk("u27-16", "phys-u27-copper-resistance", "graph", {
    title: "Resistance of a metal rises with temperature",
    caption: `More lattice vibration scatters the electrons more, so a metal's resistance rises almost linearly: R = R₂₀(1 + αΔT). The copper wire's ${R0} Ω at 20 °C becomes ${r(R80, 2)} Ω at 80 °C (α = ${a} K⁻¹).`,
    alt: "Resistance against temperature, a straight line rising from 10 ohms at 20 degrees to 12.3 ohms at 80 degrees.",
    description: [`R₂₀ = ${R0} Ω, α = ${a} K⁻¹.`, `At 80 °C: ${R0} × (1 + ${a} × 60) = ${r(R80, 3)} Ω.`, "At low temperature the line flattens to a residual resistance set by impurities (not shown)."],
    range: { x: [0, 100], y: [8, 13.5] }, ticks: [[20, 40, 60, 80, 100], [9, 10, 11, 12, 13]], height: [320, 300], xLabelBelow: true, axisLabels: ["temperature / °C", "resistance / Ω"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 80, to: R80 }],
    points: [{ x: 20, y: R0, colour: "a4", label: "10 Ω at 20 °C", dx: 10, dy: 14 }, { x: 80, y: r(R80, 4), colour: "a2", label: `${r(R80, 2)} Ω at 80 °C`, anchor: "end", dx: -10, dy: -10 }],
    checks: [{ type: "point", expr: f, x: 80, y: r(R80, 6), name: `${r(R80, 2)} Ω at 80 °C` }, { type: "slope", expr: f, x: 50, value: R0 * a, name: "rises 0.039 Ω per kelvin" }],
  }); }

// u27-28 quantum Hall plateaus: R_xy = h/(νe²) = 25 812.8 Ω / ν
{ const RK = 25812.807, plateaus = [[4, 0.5, 1.6], [3, 1.9, 2.4], [2, 2.8, 3.9], [1, 5.0, 8]];
  const series = plateaus.map(([nu, b0, b1]) => ({ points: [[b0, RK / nu / 1000], [b1, RK / nu / 1000]], colour: "a1", width: 3.4 }));
  const ramps = plateaus.slice(1).map(([nu, b0], i) => ({ points: [[plateaus[i][2], RK / plateaus[i][0] / 1000], [b0, RK / nu / 1000]], colour: "a1", width: 1.6 }));
  mk("u27-28", "phys-u27-quantum-hall", "graph", {
    title: "Quantum Hall plateaus",
    caption: `In a two-dimensional electron gas at low temperature and high field, the Hall resistance locks onto exact values R = h/(νe²) = ${r(RK / 1000, 3)} kΩ / ν. On the ν = 2 plateau it is ${r(RK / 2000, 3)} kΩ, the same in every sample to parts in 10¹⁰, which is why it now defines the ohm.`,
    alt: "Hall resistance against magnetic field: flat plateaus at 6.45, 8.60, 12.9 and 25.8 kilohms joined by short rises.",
    description: [`h/e² = ${RK} Ω.`, ...plateaus.map(([nu]) => `ν = ${nu}: ${r(RK / nu / 1000, 3)} kΩ.`), "Between plateaus the resistance rises; the field values of the steps depend on the sample's electron density (illustrative here)."],
    range: { x: [0, 8], y: [0, 28] }, ticks: [[2, 4, 6, 8], [6.45, 8.6, 12.9, 25.8]], height: [320, 300], xLabelBelow: true, axisLabels: ["magnetic field / T (illustrative)", "Hall resistance / kΩ"],
    series: [...series, ...ramps],
    points: plateaus.map(([nu, , b1]) => ({ x: b1, y: r(RK / nu / 1000, 4), colour: "a2", label: `ν = ${nu}`, anchor: "end", dx: -6, dy: -12 })),
    checks: plateaus.map(([nu]) => ({ type: "point", expr: `${RK}/${nu}/1000+0*x`, x: 0, y: r(RK / nu / 1000, 8), name: `ν = ${nu} plateau at h/(${nu}e²) = ${r(RK / nu / 1000, 3)} kΩ` })),
  }); }
