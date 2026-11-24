// Unit 24, Particle Physics. Every number in a caption or claim is computed here once, from the lesson's own
// worked example. Run: node scripts/diagrams/physics/u24.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const H = [320, 300];

// u24-04 the four interactions on one log scale (relative strength at ~1 fm)
{ const em = 1 / 137, weak = 1e-6, grav = 1e-38, span = Math.log10(1 / grav);
  mk("u24-04", "phys-u24-interaction-strengths", "scale", {
    title: "Four interactions, 38 orders of magnitude",
    caption: `Relative strength at about 1 fm, with the strong interaction as 1: electromagnetism about 1/137 (${r(em, 4)}), the weak interaction about 10⁻⁶ and gravity about 10⁻³⁸. The strongest and weakest differ by ${span} orders of magnitude.`,
    alt: "A logarithmic scale of relative strength from 10 to the minus 40 up to 1, with gravity near 10 to the minus 38, the weak interaction at 10 to the minus 6, electromagnetism at 1 over 137 and the strong interaction at 1.",
    description: ["Strong: 1 (range about 1 fm, confined).", `Electromagnetic: 1/137 = ${r(em, 4)} (infinite range).`, "Weak: about 10⁻⁶ (range about 10⁻¹⁸ m).", `Gravity: about 10⁻³⁸ (infinite range): ${span} orders below the strong interaction.`],
    quantity: "relative strength", min: -40, max: 1,
    markers: [{ label: "gravity", value: grav }, { label: "weak", value: weak }, { label: "electromagnetic", value: r(em, 6) }, { label: "strong", value: 1 }],
    claims: [{ type: "span", value: span, tol: 0.5, name: `strong and gravity differ by ${span} orders (the lesson's 1 and 10⁻³⁸)` }, { type: "orders", a: "electromagnetic", b: "strong", value: r(Math.log10(137), 2), tol: 0.05, name: "strong is 137 times electromagnetic" }],
  }); }

// u24-08 energies: LHC, unification, Planck
{ const lhc = 1e4, gut = 1e16, planck = 1.2e19, a = Math.log10(gut / lhc), b = Math.log10(planck / lhc);
  mk("u24-08", "phys-u24-energy-ladder", "scale", {
    title: "How far above the LHC is the Planck energy?",
    caption: `The LHC reaches about 10⁴ GeV. The unification energy (about 10¹⁶ GeV) is ${a} orders of magnitude higher, and the Planck energy E_P ≈ 1.2 × 10¹⁹ GeV is about ${r(b, 0)} orders above the LHC. Gravity's quantum effects are far beyond any accelerator.`,
    alt: "A logarithmic energy scale in GeV from 10 to the 2 up to 10 to the 20, with the LHC at 10 to the 4, grand unification at 10 to the 16 and the Planck energy at 1.2 times 10 to the 19.",
    description: ["LHC: about 10⁴ GeV.", `Unification: about 10¹⁶ GeV, ${a} orders above the LHC.`, `Planck energy: 1.2 × 10¹⁹ GeV, ${r(b, 1)} orders above the LHC.`],
    quantity: "energy", units: "GeV", min: 2, max: 20,
    markers: [{ label: "LHC", value: lhc }, { label: "unification", value: gut }, { label: "Planck energy", value: planck }],
    claims: [{ type: "orders", a: "LHC", b: "unification", value: a, tol: 0.1, name: "unification is 10¹² times the LHC" }, { type: "orders", a: "LHC", b: "Planck energy", value: r(b, 2), tol: 0.1, name: "Planck energy about 10¹⁵ times the LHC" }],
  }); }

// u24-10 mass hierarchy: electron to top, neutrinos below 1 eV
{ const e = 0.511e6, t = 173e9, nu = 1, o = Math.log10(t / e);
  mk("u24-10", "phys-u24-fermion-masses", "scale", {
    title: "The mass hierarchy",
    caption: `Fermion masses span from the electron (0.511 MeV) to the top quark (173 GeV): ${r(o, 1)} orders of magnitude, and the neutrinos are lighter still (below 1 eV, so at least ${r(Math.log10(e / nu), 1)} orders below the electron). No one knows why.`,
    alt: "A logarithmic mass scale in eV from 10 to the 0 up to 10 to the 12, with neutrinos below 1 eV, the electron at 0.511 MeV and the top quark at 173 GeV.",
    description: ["Neutrinos: below 1 eV.", "Electron: 0.511 MeV = 5.11 × 10⁵ eV.", `Top quark: 173 GeV = 1.73 × 10¹¹ eV, ${r(o, 1)} orders above the electron.`],
    quantity: "mass", units: "eV", min: -1, max: 12,
    markers: [{ label: "neutrinos (< 1 eV)", value: nu }, { label: "electron", value: e }, { label: "top quark", value: t }],
    claims: [{ type: "orders", a: "electron", b: "top quark", value: r(o, 2), tol: 0.05, name: "top is about 3.4 × 10⁵ times the electron" }],
  }); }

// u24-13 e+ e- annihilation
{ const Q = r(2 * 0.000548579909 * 931.494, 3);
  mk("u24-13", "phys-u24-annihilation", "nuclear", {
    title: "Annihilation into two photons",
    caption: `e⁺ + e⁻ → 2γ at rest: charge is conserved (+1 − 1 = 0) and the two rest energies, 2 × 0.511 MeV = ${Q} MeV, become two photons of 511 keV each, emitted back to back. The reverse, γ → e⁺ + e⁻ near a nucleus, needs more than ${Q} MeV.`,
    alt: "The equation e plus plus e minus gives gamma plus gamma, with charge and nucleon number conserved and Q equal to 1.022 MeV.",
    description: ["Positron (charge +1) and electron (charge −1): total charge 0.", "Two photons: total charge 0.", `Energy released: 2 × 0.511 MeV = ${Q} MeV, shared as 511 keV per photon.`],
    mode: "reaction", lhs: ["e+", "e-"], rhs: ["gamma", "gamma"], Q: Q,
  }); }

// u24-14 pion survival, gamma = 10
{ const tau = 26e-9, c = 3e8, g = 10, L = g * c * tau, L0 = c * tau, f = (x) => `exp(-x/${L})`;
  mk("u24-14", "phys-u24-pion-survival", "graph", {
    title: "How far a fast pion travels",
    caption: `A pion with τ = 26 ns and γ = 10 has mean decay length L = γβcτ ≈ ${L} m. After one L, 1/e (37%) of the pions are left; without time dilation, cτ would give only ${L0} m.`,
    alt: "A falling exponential curve, the fraction of pions surviving against distance, passing through 1 over e at 78 metres.",
    description: ["N/N₀ = e^(−x/L) with L = γβcτ.", `L ≈ 10 × 3 × 10⁸ × 2.6 × 10⁻⁸ = ${L} m.`, `At x = ${L} m the fraction left is 1/e = ${r(Math.exp(-1), 3)}.`, `Without dilation: cτ = ${L0} m.`],
    range: { x: [0, 250], y: [0, 1.05] }, ticks: [[50, 100, 150, 200, 250], [0.25, 0.5, 0.75, 1]], height: H, xLabelBelow: true, axisLabels: ["distance / m", "fraction surviving"],
    curves: [{ expr: f(), colour: "a1" }],
    points: [{ x: L, y: r(Math.exp(-1), 4), colour: "a2", label: `1/e at ${L} m`, dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: f(), x: L, y: r(Math.exp(-1), 6), name: `1/e of the pions remain after ${L} m` }, { type: "value", expr: f(), x: L0, between: [0.9, 1], name: "after cτ = 7.8 m almost all remain" }],
  }); }

// u24-20 Higgs potential
{ const m = Math.SQRT1_2, V = "-x^2+x^4";
  mk("u24-20", "phys-u24-higgs-potential", "graph", {
    title: "The Mexican-hat potential",
    caption: `V = −μ²φ² + λφ⁴, drawn in units of λv⁴ against φ/v (so μ² = λv²): a hump at φ = 0 and minima at |φ| = v/√2 = ${r(m, 3)} v, where V = −¼ λv⁴. The vacuum sits in one minimum, which breaks the symmetry.`,
    alt: "A W-shaped curve: a hump at zero field and two equal minima at plus and minus 0.71 v, each at depth minus one quarter.",
    description: ["V/(λv⁴) = −(φ/v)² + (φ/v)⁴.", "Maximum at φ = 0, where V = 0.", `Minima at φ/v = ±1/√2 = ±${r(m, 3)}, where V/(λv⁴) = −1/2 + 1/4 = −0.25.`, "The field takes one of the two minima: spontaneous symmetry breaking."],
    range: { x: [-1.3, 1.3], y: [-0.4, 0.5] }, ticks: [[-1, -0.5, 0.5, 1], [-0.25, 0.25, 0.5]], height: H, xLabelBelow: true, axisLabels: ["φ / v", "V / λv⁴"],
    curves: [{ expr: V, colour: "a1" }],
    points: [{ x: m, y: -0.25, colour: "a2", label: "−¼ at v/√2", dx: 8, dy: 18 }, { x: -m, y: -0.25, colour: "a2" }],
    checks: [{ type: "min", expr: V, domain: [0.2, 1.3], x: m, y: -0.25, name: "minimum at φ = v/√2 with depth −¼" }, { type: "point", expr: V, x: 0, y: 0, name: "V = 0 at φ = 0" }],
  }); }

// u24-22 oscillation probability
{ const dm2 = 2.5e-3, k = 1.27, x1 = Math.PI / 2 / (k * dm2), P = `sin(${k}*${dm2}*x)^2`, t2k = 295 / 0.6;
  mk("u24-22", "phys-u24-oscillation-probability", "graph", {
    title: "The first oscillation maximum",
    caption: `For maximal mixing (sin²2θ = 1) and Δm² = 2.5 × 10⁻³ eV², P = sin²(1.27Δm²L/E) first reaches 1 where 1.27Δm²L/E = π/2, at L/E ≈ ${r(x1, 0)} km GeV⁻¹. T2K's 295 km at 0.6 GeV is ${r(t2k, 0)} km GeV⁻¹, close to the first maximum.`,
    alt: "A sine-squared curve against L over E in km per GeV, rising from zero to its first peak of 1 near 495 and falling again, with T2K marked near 492.",
    description: ["P = sin²2θ × sin²(1.27 Δm² L/E), with Δm² = 2.5 × 10⁻³ eV², L in km, E in GeV.", `Maximum when 1.27 × 2.5 × 10⁻³ × L/E = π/2: L/E = ${r(x1, 0)} km GeV⁻¹.`, `T2K: 295 km / 0.6 GeV = ${r(t2k, 0)} km GeV⁻¹.`],
    range: { x: [0, 1100], y: [0, 1.1] }, ticks: [[250, 500, 750, 1000], [0.5, 1]], height: H, xLabelBelow: true, axisLabels: ["L/E / km GeV⁻¹", "P (sin²2θ = 1)"],
    curves: [{ expr: P, colour: "a1" }],
    points: [{ x: r(x1, 1), y: 1, colour: "a2", label: `first maximum, ${r(x1, 0)}`, dx: 10, dy: -12 }, { x: r(t2k, 1), y: r(Math.sin(k * dm2 * t2k) ** 2, 4), colour: "a4", label: "T2K", anchor: "end", dx: -8, dy: 18 }],
    checks: [{ type: "max", expr: P, domain: [0, 800], x: Math.round(x1 / 0.04) * 0.04 === 0 ? 0 : r(Math.round(x1 / 0.04) * 0.04, 2), y: 1, name: `first maximum at L/E ≈ ${r(x1, 0)} km GeV⁻¹` }, { type: "value", expr: P, x: t2k, between: [0.99, 1], name: "T2K's L/E is near the maximum" }],
  }); }

// u24-25 bending radius r = p/(eB)
{ const e = 1.602e-19, c = 2.998e8, B = 8.3, rad = (pTeV, b) => (pTeV * 1e12 * e / c) / (e * b), r7 = rad(7, B), pSI = 7e12 * e / c,
    f = (b) => `${r(1e12 / c, 12)}*x/${b}/1000`;
  mk("u24-25", "phys-u24-bending-radius", "graph", {
    title: "Bending radius against momentum",
    caption: `r = p/(eB) rises in proportion to momentum. A 7 TeV/c proton (p = ${(pSI * 1e15).toFixed(1)} × 10⁻¹⁵ kg m s⁻¹) in the LHC's 8.3 T has r = ${r(r7 / 1000, 1)} km; doubling the field to 16.6 T halves it to ${r(rad(7, 2 * B) / 1000, 1)} km.`,
    alt: "Two straight lines of bending radius in kilometres against proton momentum in TeV, the 8.3 tesla line reaching 2.8 km at 7 TeV and the 16.6 tesla line reaching 1.4 km.",
    description: ["r = p/(eB), p = 7 TeV/c = 3.7 × 10⁻¹⁵ kg m s⁻¹.", `B = 8.3 T: r = ${r(r7 / 1000, 2)} km.`, `B = 16.6 T: r = ${r(rad(7, 2 * B) / 1000, 2)} km, half as much.`],
    range: { x: [0, 8], y: [0, 3.5] }, ticks: [[2, 4, 6, 8], [1, 2, 3]], height: H, xLabelBelow: true, axisLabels: ["momentum p / (TeV/c)", "radius r / km"],
    curves: [{ expr: f(B), domain: [0, 8], colour: "a1", label: "8.3 T", labelAt: [5.2, 2.4] }, { expr: f(2 * B), domain: [0, 8], colour: "a2", label: "16.6 T", labelAt: [5.2, 1.0] }],
    points: [{ x: 7, y: r(r7 / 1000, 3), colour: "a1", label: `${r(r7 / 1000, 1)} km`, dx: -8, dy: -12, anchor: "end" }],
    checks: [{ type: "point", expr: f(B), x: 7, y: r(r7 / 1000, 4), tol: 0.02, name: `r = ${r(r7 / 1000, 1)} km for 7 TeV in 8.3 T` }, { type: "point", expr: f(2 * B), x: 7, y: r(r7 / 2000, 4), tol: 0.02, name: "twice the field halves the radius" }],
  }); }

// u24-26 collider vs fixed target
{ const mp = 0.938, E = 7000, ft = Math.sqrt(2 * E * mp);
  mk("u24-26", "phys-u24-collider-energy", "graph", {
    title: "Collider against fixed target",
    caption: `Two beams of energy E colliding head-on give √s = 2E: 7 TeV beams make 14 TeV. A 7 TeV beam on a fixed proton target gives only √(2E m c²) ≈ ${r(ft, 0)} GeV, about ${r(2 * E / ft, 0)} times less.`,
    alt: "Two curves of centre-of-mass energy against beam energy in GeV: a straight line for a collider reaching 14000 GeV at 7000, and a slowly rising square-root curve for a fixed target reaching about 115 GeV.",
    description: ["Collider: √s = 2E, so 2 × 7000 = 14 000 GeV.", `Fixed target (proton, mc² = ${mp} GeV): √s = √(2 × 7000 × ${mp}) = ${r(ft, 1)} GeV.`, `The collider gives ${r(2 * E / ft, 0)} times more.`],
    range: { x: [0, 7500], y: [0, 15000] }, ticks: [[2000, 4000, 6000], [5000, 10000, 14000]], height: H, xLabelBelow: true, axisLabels: ["beam energy E / GeV", "√s / GeV"],
    curves: [{ expr: "2*x", domain: [0, 7000], colour: "a1", label: "collider, 2E", labelAt: [3300, 8500] }, { expr: `sqrt(2*x*${mp})`, domain: [0, 7000], colour: "a2", label: "fixed target", labelAt: [3500, 1900] }],
    points: [{ x: E, y: 14000, colour: "a1", label: "14 TeV", anchor: "end", dx: -8, dy: -10 }, { x: E, y: r(ft, 2), colour: "a2", label: `${r(ft, 0)} GeV`, anchor: "end", dx: -8, dy: -10 }],
    checks: [{ type: "point", expr: "2*x", x: E, y: 14000, name: "7 TeV beams give 14 TeV" }, { type: "point", expr: `sqrt(2*x*${mp})`, x: E, y: r(ft, 4), tol: 0.01, name: `fixed target gives ${r(ft, 0)} GeV` }],
  }); }
