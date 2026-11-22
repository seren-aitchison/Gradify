// Unit 13, Statistical Mechanics. Every number in a caption or claim is computed here once. Run: node scripts/diagrams/physics/u13.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);
const kB = 1.380649e-23, kBeV = 8.617333e-5, h = 6.62607015e-34, c = 299792458, NA = 6.022e23, amu = 1.66054e-27;

// u13-03 Two-level system: mean energy
{
  const E = (x) => 1 / (Math.exp(1 / x) + 1), at = 1;
  mk("u13-03", "phys-u13-two-level-energy", "graph", {
    title: "Mean energy of a two-level system",
    caption: `For levels 0 and ε the Boltzmann factor gives ⟨E⟩ = ε/(e^{ε/k_BT} + 1). At k_BT = ε it is ${f3(E(at))} ε. At low T almost every system is in the ground state (⟨E⟩ → 0); at high T the two levels become equally likely and ⟨E⟩ approaches ε/2 and no higher: a two-level system can never have more than half its excitation.`,
    alt: `Graph of mean energy over epsilon against k_B T over epsilon: it rises from 0 and levels off at 0.5; at k_B T = ε it is ${f3(E(at))}.`,
    description: ["The horizontal axis is k_BT/ε; the vertical axis is ⟨E⟩/ε.", "⟨E⟩/ε = 1/(e^{ε/k_BT} + 1): close to 0 at low temperature, with the excited state hardly populated.", `At k_BT = ε it is 1/(e + 1) = ${f3(E(at))}.`, "At high temperature both levels are equally likely, so ⟨E⟩ → ε/2 (dashed line)."],
    range: { x: [0, 5], y: [0, 0.6] }, ticks: [[1, 2, 3, 4, 5], [0.1, 0.2, 0.3, 0.4, 0.5]], grid: [1, 0.1], height: [320, 300], xLabelBelow: true, axisLabels: ["k_{B}T/ε", "⟨E⟩/ε"],
    marks: [{ y: 0.5, label: "ε/2" }],
    curves: [{ expr: "1/(exp(1/x)+1)", domain: [0.05, 5], colour: "a1", label: "⟨E⟩", labelAt: [3.2, 0.4] }],
    points: [{ x: at, y: E(at), label: f3(E(at)), dx: 10, dy: 16 }],
    checks: [{ type: "point", expr: "1/(exp(1/x)+1)", x: at, y: E(at), name: `⟨E⟩ = ε/(e + 1) = ${f3(E(at))} ε at k_BT = ε` }, { type: "value", expr: "1/(exp(1/x)+1)", x: 5000, between: [0.499, 0.5], name: "⟨E⟩ → ε/2 at high temperature" }],
  });
}

// u13-04 Boltzmann: excited hydrogen in a star
{
  const dE = 10.2, g = 4, TK = 118.37, T = 10, kT = kBeV * 1e4, r = g * Math.exp(-dE / kT), expr = `${g * 1e5}*exp(-${dE / kBeV / 1000}/x)`;
  const tc = dE / kBeV / 1000;
  mk("u13-04", "phys-u13-boltzmann-balmer", "graph", {
    title: "Hydrogen atoms in n = 2 against stellar temperature",
    caption: `N₂/N₁ = (g₂/g₁)e^{−ΔE/k_BT} with ΔE = 10.2 eV and g₂/g₁ = ${g}. At 10 000 K, k_BT = ${f3(kT)} eV and N₂/N₁ = ${g}e^{−${f1(dE / kT)}} = ${f1(r * 1e5)} × 10⁻⁵: tiny, yet enough to show Balmer lines. The curve is steep: doubling the temperature to 20 000 K multiplies the fraction by ${f0(Math.exp(dE / kBeV / 1e4 - dE / kBeV / 2e4))}.`,
    alt: `Graph of N2/N1 in units of 10^-5 against temperature in thousands of kelvin: a very steep rising curve, ${f1(r * 1e5)} at 10 000 K.`,
    description: ["The horizontal axis is temperature in thousands of kelvin; the vertical axis is N₂/N₁ in units of 10⁻⁵.", `The curve is ${g} e^{−ΔE/k_BT}; the activation-like energy ΔE/k_B = ${f0(dE / kBeV)} K, so it is extremely sensitive to T.`, `At 10 000 K the fraction is ${f1(r * 1e5)} × 10⁻⁵ = ${(r).toExponential(1)}.`],
    range: { x: [4, 20], y: [0, 1200] }, ticks: [[5, 10, 15, 20], [300, 600, 900, 1200]], grid: [5, 300], height: [330, 310], xLabelBelow: true, axisLabels: ["T / 10³ K", "N₂/N₁ / 10^{-5}"],
    curves: [{ expr, domain: [4, 20], colour: "a1", label: "4e^{−ΔE/kT}", labelAt: [10.5, 760] }],
    points: [{ x: T, y: r * 1e5, label: `${f1(r * 1e5)} × 10^{-5} at 10 000 K`, dx: -6, dy: -26, anchor: "start" }],
    checks: [{ type: "point", expr, x: T, y: r * 1e5, name: `N₂/N₁ = 4e^{−11.8} = ${f1(r * 1e5)} × 10⁻⁵ at 10 000 K` }],
  });
}

// u13-05 Maxwell–Boltzmann: O2 against H2
{
  const T = 300, mO = 32 * amu, mH = 2.016 * amu;
  const A = (m) => 4 * Math.PI * (m / (2 * Math.PI * kB * T)) ** 1.5, B = (m) => m / (2 * kB * T);
  const vp = (m) => Math.sqrt(2 * kB * T / m), vr = (m) => Math.sqrt(3 * kB * T / m);
  const sc = 1e3; // plot f in 10^-3 s/m
  const fe = (m) => `${A(m) * sc * 1e6}*x^2*exp(-${B(m) * 1e6}*x^2)`; // x in km/s
  const ratio = vr(mH) / vr(mO);
  mk("u13-05", "phys-u13-maxwell-o2-h2", "graph", {
    title: "Speed distributions of O₂ and H₂ at 300 K",
    caption: `At the same temperature both gases have the same mean kinetic energy, so v_rms ∝ 1/√m. O₂ has v_rms = ${f0(vr(mO))} m s⁻¹ and H₂ ${f0(vr(mH))} m s⁻¹, a ratio of ${f1(ratio)} (the lesson's √(32/2) = 4). H₂'s curve is lower and wider because the area under each is 1. Peaks: v_p = ${f0(vp(mO))} and ${f0(vp(mH))} m s⁻¹.`,
    alt: `Two Maxwell–Boltzmann curves: O2 with a tall narrow peak near ${f0(vp(mO))} m/s and H2 with a low wide peak near ${f0(vp(mH))} m/s.`,
    description: ["The horizontal axis is molecular speed in m s⁻¹; the vertical axis is f(v) in 10⁻³ s m⁻¹, so each curve has area 1.", `O₂ (32 u): peak at v_p = √(2k_BT/m) = ${f0(vp(mO))} m s⁻¹, v_rms = ${f0(vr(mO))} m s⁻¹.`, `H₂ (2 u): peak at ${f0(vp(mH))} m s⁻¹, v_rms = ${f0(vr(mH))} m s⁻¹, ${f1(ratio)} times faster, so the curve is lower and wider.`],
    range: { x: [0, 5], y: [0, 2.6] }, ticks: [[1, 2, 3, 4, 5], [0.5, 1, 1.5, 2, 2.5]], grid: [1, 0.5], height: [330, 310], xLabelBelow: true, axisLabels: ["v / km s^{-1}", "f(v) / 10^{-3} s m^{-1}"],
    curves: [{ expr: fe(mO), colour: "a1", label: "O₂", labelAt: [0.56, 2.4], width: 3 }, { expr: fe(mH), colour: "a2", label: "H₂", labelAt: [2.1, 0.75], width: 3 }],
    checks: [{ type: "area", expr: fe(mO), from: 0, to: 8, value: 1, tol: 0.005, name: "the O₂ distribution is normalised (area 1)" }, { type: "area", expr: fe(mH), from: 0, to: 20, value: 1, tol: 0.01, name: "the H₂ distribution is normalised (area 1)" },
      { type: "max", expr: fe(mO), domain: [0.001, 3], x: vp(mO) / 1000, y: A(mO) * sc * vp(mO) ** 2 * Math.exp(-1), name: `O₂ peaks at v_p = ${f0(vp(mO))} m/s` }, { type: "max", expr: fe(mH), domain: [0.001, 5], x: vp(mH) / 1000, y: A(mH) * sc * vp(mH) ** 2 * Math.exp(-1), name: `H₂ peaks at v_p = ${f0(vp(mH))} m/s` }],
  });
}

// u13-06 Partition function: quantum harmonic oscillator
{
  const E = (x) => 0.5 + 1 / (Math.exp(1 / x) - 1), at = 1;
  mk("u13-06", "phys-u13-oscillator-energy", "graph", {
    title: "Mean energy of a quantum harmonic oscillator",
    caption: `From Z = e^{−ħω/2k_BT}/(1 − e^{−ħω/k_BT}): ⟨E⟩ = ħω(½ + 1/(e^{ħω/k_BT} − 1)). At low T it stays at the zero-point energy ½ħω; at high T it approaches the classical value k_BT (dashed). At k_BT = ħω it is ${f3(E(at))} ħω, already within ${f0((E(at) - at) / E(at) * -100 * -1)}% of k_BT.`,
    alt: `Graph of mean energy over hbar omega against k_B T over hbar omega: a curve starting at 0.5 and joining the straight line E = k_B T at high temperature.`,
    description: ["The horizontal axis is k_BT/ħω; the vertical axis is ⟨E⟩/ħω.", "The solid curve is ½ + 1/(e^{ħω/k_BT} − 1): it starts at the zero-point energy ½ and rises.", "The dashed line is the classical equipartition value ⟨E⟩ = k_BT; the quantum curve joins it once k_BT ≫ ħω.", `At k_BT = ħω, ⟨E⟩ = ${f3(E(at))} ħω.`],
    range: { x: [0, 4], y: [0, 4.2] }, ticks: [[1, 2, 3, 4], [1, 2, 3, 4]], grid: [1, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["k_{B}T/ħω", "⟨E⟩/ħω"],
    curves: [{ expr: "0.5+1/(exp(1/x)-1)", domain: [0.05, 4], colour: "a1", label: "quantum", labelAt: [0.9, 2.5] }, { expr: "x", colour: "a2", dash: "6 5", width: 2, label: "classical k_{B}T", labelAt: [2.6, 3.3] }],
    points: [{ x: at, y: E(at), label: f3(E(at)), dx: 10, dy: 18 }],
    checks: [{ type: "point", expr: "0.5+1/(exp(1/x)-1)", x: at, y: E(at), name: `⟨E⟩ = ħω(½ + 1/(e − 1)) = ${f3(E(at))} ħω at k_BT = ħω` }, { type: "value", expr: "0.5+1/(exp(1/x)-1)", x: 0.05, between: [0.5, 0.5001], name: "zero-point energy ½ħω at low T" }, { type: "value", expr: "(0.5+1/(exp(1/x)-1))/x", x: 4, between: [0.99, 1.05], name: "⟨E⟩ → k_BT at high T (equipartition)" }],
  });
}

// u13-14 Fermi–Dirac: sodium
{
  const hb = 1.0546e-34, me = 9.109e-31, n = 2.5e28, EF = (hb * hb / (2 * me)) * (3 * Math.PI ** 2 * n) ** (2 / 3), eV = 1.602e-19, EFe = EF / eV, kT = kBeV * 300;
  const fd = `1/(exp((x-${EFe})/${kT})+1)`;
  mk("u13-14", "phys-u13-fermi-sodium", "graph", {
    title: "Fermi–Dirac occupation in sodium",
    caption: `For n = 2.5 × 10²⁸ m⁻³, E_F = (ħ²/2m)(3π²n)^{2/3} = ${(EF * 1e19).toFixed(1)} × 10⁻¹⁹ J = ${f1(EFe)} eV. At 300 K, k_BT is only ${f3(kT)} eV, so f(E) = 1/(e^{(E−E_F)/k_BT} + 1) is almost a step: states below E_F are full, those above are empty, and only a sliver of width about a few k_BT, under 1% of E_F, is blurred.`,
    alt: `Graph of occupation probability against energy: nearly a step from 1 to 0 at the Fermi energy of ${f1(EFe)} eV, passing through 0.5 there.`,
    description: ["The horizontal axis is energy in eV; the vertical axis is the occupation probability f(E).", `E_F = ${f1(EFe)} eV is found from the electron density of sodium.`, `The curve falls from 1 to 0 across a width of order k_BT = ${f3(kT)} eV and equals exactly 0.5 at E = E_F.`],
    range: { x: [2.8, 3.4], y: [0, 1.15] }, ticks: [[2.8, 3.0, 3.2, 3.4], [0.5, 1]], grid: [0.2, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["E / eV", "f(E)"],
    curves: [{ expr: fd, colour: "a1", width: 3.2, samples: 600, label: "300 K", labelAt: [3.15, 0.8] }],
    points: [{ x: EFe, y: 0.5, label: `E_{F} = ${f1(EFe)} eV`, dx: 12, dy: -12 }],
    checks: [{ type: "point", expr: fd, x: EFe, y: 0.5, name: `f = ½ at E = E_F = ${f1(EFe)} eV` }, { type: "value", expr: fd, x: EFe - 0.2, between: [0.999, 1], name: "states 0.2 eV below E_F are full" }, { type: "value", expr: fd, x: EFe + 0.2, between: [0, 0.001], name: "states 0.2 eV above E_F are empty" }],
  });
}

// u13-18 Blackbody: the Sun at 5800 K
{
  const hck = (h * c) / kB * 1e9, planck = (T) => (lam) => lam ** -5 / (Math.exp(hck / (lam * T)) - 1), lw = hck / 4.965114;
  const norm = 1 / planck(6500)(lw / 6500);
  const e = (T) => `${norm * 1e0}*x^(-5)/(exp(${hck}/(x*${T}))-1)`, Ts = [5000, 5800, 6500];
  const peak = (T) => lw / T;
  mk("u13-18", "phys-u13-planck-sun", "graph", {
    title: "Planck spectra: the Sun peaks near 500 nm",
    caption: `Planck's law at 5000, 5800 and 6500 K (intensity per unit wavelength, relative). Wien's law λ_maxT = 2.898 × 10⁻³ m K puts the peak at ${f0(peak(5800))} nm for 5800 K, matching the Sun's observed 500 nm, so T ≈ 2.898 × 10⁻³/(5 × 10⁻⁷) = ${f0(lw / 500 * 1)} K. Hotter bodies are brighter at every wavelength and peak at shorter ones.`,
    alt: `Three Planck curves against wavelength with peaks near ${f0(peak(6500))}, ${f0(peak(5800))} and ${f0(peak(5000))} nm; the hotter curve is higher and peaks further left.`,
    description: ["The horizontal axis is wavelength in nm, the vertical axis relative spectral intensity.", `Each curve is ∝ λ⁻⁵/(e^{hc/λk_BT} − 1). Peaks: 6500 K at ${f0(peak(6500))} nm, 5800 K at ${f0(peak(5800))} nm, 5000 K at ${f0(peak(5000))} nm (Wien's law).`, `A peak at 500 nm gives T = ${f0(lw / 500)} K, the Sun's surface temperature, about 5800 K.`, "The curve of the hotter body lies above the cooler one at every wavelength."],
    range: { x: [100, 2000], y: [0, 1.15] }, ticks: [[500, 1000, 1500, 2000], [0.5, 1]], grid: [500, 0.5], height: [330, 310], xLabelBelow: true, axisLabels: ["λ / nm", "relative intensity"],
    curves: [{ expr: e(6500), colour: "a2", label: "6500 K", labelAt: [560, 1.03] }, { expr: e(5800), colour: "a1", width: 3.6, label: "5800 K", labelAt: [820, 0.82] }, { expr: e(5000), colour: "a4", label: "5000 K", labelAt: [900, 0.5] }],
    checks: Ts.map((T) => ({ type: "max", expr: e(T), domain: [peak(T) - 5, peak(T) + 5], x: peak(T), y: norm * planck(T)(peak(T)), name: `peak at λ_max = 2.898 × 10⁻³/${T} = ${f0(peak(T))} nm` })),
  });
}

// u13-25 Metropolis acceptance
{
  const x = 2, p = Math.exp(-x);
  mk("u13-25", "phys-u13-metropolis-acceptance", "graph", {
    title: "Metropolis acceptance probability",
    caption: `A move that lowers the energy is always accepted; one that raises it by ΔE is accepted with probability e^{−ΔE/k_BT}. For the lesson's spin flip, ΔE = 2J at k_BT = J, so ΔE/k_BT = ${x} and the probability is e^{−2} = ${f3(p)}, about ${f0(p * 100)}%.`,
    alt: `Graph of acceptance probability against energy increase over k_B T: flat at 1 for negative values, then an exponential decay through ${f3(p)} at 2.`,
    description: ["The horizontal axis is ΔE/k_BT; the vertical axis is the acceptance probability.", "For ΔE ≤ 0 the move is always accepted (probability 1).", `For ΔE > 0 the probability is e^{−ΔE/k_BT}; at ΔE/k_BT = ${x} it is ${f3(p)}.`],
    range: { x: [-1, 5], y: [0, 1.15] }, ticks: [[-1, 0, 1, 2, 3, 4, 5], [0.5, 1]], grid: [1, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["ΔE/k_{B}T", "P(accept)"],
    curves: [{ expr: "1+0*x", domain: [-1, 0], colour: "a1", width: 3.2 }, { expr: "exp(-x)", domain: [0, 5], colour: "a1", width: 3.2, label: "e^{−ΔE/kT}", labelAt: [2.6, 0.4] }],
    points: [{ x, y: p, colour: "a2", label: f3(p), dx: 10, dy: -12 }],
    checks: [{ type: "point", expr: "exp(-x)", x, y: p, name: `e^{−2} = ${f3(p)}` }, { type: "point", expr: "exp(-x)", x: 0, y: 1, name: "ΔE = 0 is accepted with probability 1 (continuous at 0)" }],
  });
}

// u13-26 Brownian motion: mean square displacement
{
  const D = 2e-13, t = 10, msd = 6 * D * t, um2 = msd * 1e12, rms = Math.sqrt(msd) * 1e6;
  mk("u13-26", "phys-u13-brownian-msd", "graph", {
    title: "Brownian motion: mean square displacement",
    caption: `In three dimensions ⟨r²⟩ = 6Dt, so with D = 2 × 10⁻¹³ m² s⁻¹ the particle's mean square displacement grows linearly, ${f1(6 * D * 1e12)} μm² per second, reaching ${f1(um2)} μm² (${msd.toExponential(1)} m²) after ${t} s: an rms distance of ${f1(rms)} μm. Linear growth in t (not t²) is what separates diffusion from steady drift.`,
    alt: `Straight line through the origin: mean square displacement against time, reaching ${f1(um2)} square micrometres at ${t} seconds.`,
    description: ["The horizontal axis is time in seconds; the vertical axis is ⟨r²⟩ in μm².", `⟨r²⟩ = 6Dt is a straight line with gradient 6D = ${f1(6 * D * 1e12)} μm² s⁻¹.`, `At t = ${t} s: ⟨r²⟩ = ${f1(um2)} μm², so r_rms = ${f1(rms)} μm.`],
    range: { x: [0, 12], y: [0, 15] }, ticks: [[2, 4, 6, 8, 10, 12], [3, 6, 9, 12, 15]], grid: [2, 3], height: [320, 300], xLabelBelow: true, axisLabels: ["t / s", "⟨r²⟩ / μm²"],
    curves: [{ expr: `${6 * D * 1e12}*x`, colour: "a1", label: "⟨r²⟩ = 6Dt", labelAt: [1.2, 5.6] }],
    points: [{ x: t, y: um2, label: `${f1(um2)} μm² at ${t} s`, dx: -8, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: `${6 * D * 1e12}*x`, x: t, y: um2, name: `⟨r²⟩ = 6Dt = ${f1(um2)} μm² at 10 s` }, { type: "slope", expr: `${6 * D * 1e12}*x`, x: 3, value: 6 * D * 1e12, name: "gradient 6D" }],
  });
}
