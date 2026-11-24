// Unit 20, Quantum Mechanics. Every number in a caption or claim is computed here once. Run: node scripts/diagrams/physics/u20.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);
const K = Math.PI / 180, r4 = (x) => +x.toFixed(4), r3 = (x) => +x.toFixed(3);
const h = 6.62607015e-34, hbar = h / (2 * Math.PI), e = 1.602176634e-19, me = 9.1093837e-31, c = 2.99792458e8, PI = "3.14159265";

// u20-02 Blackbody radiation: Planck against Rayleigh–Jeans, in units of x = hf/k_BT
{
  const pl = (x) => x ** 3 / (Math.exp(x) - 1);
  let bx = 0.02, by = 0; for (let i = 0; i <= 20000; i++) { const x = 0.02 + (7.98 * i) / 20000; if (pl(x) > by) { by = pl(x); bx = x; } }
  const P5 = pl(5), RJ5 = 25, ratio = P5 / RJ5, E = "x^3/(exp(x)-1)";
  mk("u20-02", "phys-u20-planck-vs-rayleigh-jeans", "graph", {
    title: "Planck's law against Rayleigh–Jeans",
    caption: `Plotted against x = hf/k_BT, the classical Rayleigh–Jeans energy density grows as x² without limit (the ultraviolet catastrophe) while Planck's law, x³/(eˣ − 1), follows it at low x, peaks near x = ${f2(bx)} and is cut off exponentially. At x = 5 the ratio is 5/(e⁵ − 1) = ${f3(ratio)} (Planck ${f2(P5)}, Rayleigh–Jeans 25, off the top of the graph).`,
    alt: `Graph of energy density against hf over kT from 0 to 6: the Rayleigh–Jeans parabola rises off the top of the graph, while Planck's curve matches it at small x, peaks at about ${f1(by)} near x = ${f1(bx)} and falls away.`,
    description: ["The horizontal axis is x = hf/k_BT; the vertical axis is the energy density per unit frequency in units of 8π(k_BT)³/(hc)³.", "The Rayleigh–Jeans curve is x²: it matches Planck's law only at small x, then climbs without bound.", `Planck's curve x³/(eˣ − 1) rises, peaks at x = ${f2(bx)} (height ${f2(by)}) and then falls exponentially because quanta hf ≫ k_BT are rarely excited.`, `At x = 5: Planck = ${f2(P5)}, Rayleigh–Jeans = 25, a ratio of ${f3(ratio)}.`],
    range: { x: [0, 6], y: [0, 2.2] }, ticks: [[1, 2, 3, 4, 5, 6], [0.5, 1, 1.5, 2]], grid: [1, 0.5], height: [330, 310], xLabelBelow: true, axisLabels: ["x = hf/k_BT", "u(f), scaled"],
    curves: [{ expr: "x^2", domain: [0, 6], colour: "a2", dash: "6 5", width: 2.6, label: "Rayleigh–Jeans", labelAt: [1.6, 2.0] }, { expr: E, domain: [0.02, 6], colour: "a1", width: 3.4, label: "Planck", labelAt: [3.4, 1.45], samples: 400 }],
    points: [{ x: 5, y: r4(P5), colour: "ink", label: `x = 5: ${f2(P5)}`, dx: -8, dy: -16, anchor: "end" }],
    checks: [{ type: "max", expr: E, domain: [0.02, 8], x: bx, y: by, name: `Planck's curve peaks near x = ${f2(bx)}` }, { type: "point", expr: E, x: 5, y: r4(P5), name: `Planck at x = 5 is ${f2(P5)}` }, { type: "point", expr: "x^2", x: 5, y: RJ5, name: "Rayleigh–Jeans at x = 5 is 25" }, { type: "point", expr: `(${E})/x^2`, x: 5, y: r4(ratio), name: `the ratio at x = 5 is 5/(e⁵ − 1) = ${f3(ratio)}` }],
  });
}

// u20-03 Photoelectric effect: KE_max against frequency for three metals
{
  const he = h / e / 1e-14 * 1, metals = [["zinc", 4.3, "a2"], ["sodium", 2.3, "a4"], ["caesium", 2.1, "a1"]], fU = c / 250e-9 / 1e14, KE = he * fU - 4.3;
  const ex = (phi) => `${he}*x-${phi}`;
  mk("u20-03", "phys-u20-photoelectric-lines", "graph", {
    title: "Maximum photoelectron energy against frequency",
    caption: `Einstein's equation KE_max = hf − φ is a straight line of gradient h (${f3(he)} eV per 10¹⁴ Hz = h/e per volt of stopping potential), the same for every metal; only the threshold f₀ = φ/h moves. Zinc (φ = 4.3 eV) needs f > ${f1(4.3 / he)} × 10¹⁴ Hz. For 250 nm light (f = ${f1(fU)} × 10¹⁴ Hz, 4.96 eV) its electrons leave with at most ${f2(KE)} eV.`,
    alt: `Graph of maximum kinetic energy in electronvolts against frequency in units of 10^14 hertz: three parallel straight lines for caesium, sodium and zinc crossing zero at ${f1(2.1 / he)}, ${f1(2.3 / he)} and ${f1(4.3 / he)} and rising with the same gradient; the 250 nm point on the zinc line is at ${f2(KE)} electronvolts.`,
    description: ["The horizontal axis is the frequency of the light in units of 10¹⁴ Hz; the vertical axis is the maximum kinetic energy of the emitted electrons in eV.", `Each line is KE_max = hf − φ with gradient h = ${f3(he)} eV per 10¹⁴ Hz, so the lines are parallel.`, `They meet the axis at the threshold frequencies: caesium (2.1 eV) ${f1(2.1 / he)}, sodium (2.3 eV) ${f1(2.3 / he)} and zinc (4.3 eV) ${f1(4.3 / he)} × 10¹⁴ Hz. Below threshold no electrons are emitted whatever the intensity.`, `250 nm light has f = ${f1(fU)} × 10¹⁴ Hz, so on the zinc line KE_max = ${f2(KE)} eV.`],
    range: { x: [4, 14], y: [0, 4.2] }, ticks: [[4, 6, 8, 10, 12, 14], [1, 2, 3, 4]], grid: [2, 1], height: [340, 320], xLabelBelow: true, axisLabels: ["f / 10¹⁴ Hz", "KE_max / eV"],
    curves: metals.map(([m, phi, colour], i) => ({ expr: ex(phi), domain: [phi / he, 14], colour, width: 3.2, label: m, labelAt: [[11.2, 11.7, 12.4][i], [1.15, 3.15, 3.85][i]] })),
    points: [{ x: r4(fU), y: r4(KE), colour: "ink", label: `250 nm: ${f2(KE)} eV`, dx: -10, dy: 16, anchor: "end" }],
    checks: [{ type: "slope", expr: ex(4.3), x: 12, value: he, name: `the gradient is h = ${f3(he)} eV per 10¹⁴ Hz` }, ...metals.map(([m, phi]) => ({ type: "point", expr: ex(phi), x: phi / he, y: 0, name: `${m}: zero energy at threshold f₀ = φ/h` })), { type: "point", expr: ex(4.3), x: fU, y: r4(KE), name: `250 nm on zinc: KE_max = ${f2(KE)} eV` }],
  });
}

// u20-04 Compton scattering
{
  const lc = (h / (me * c)) * 1e12, ex = `${lc}*(1-cos(x*${K}))`;
  mk("u20-04", "phys-u20-compton-shift", "graph", {
    title: "The Compton shift against scattering angle",
    caption: `The wavelength increases by Δλ = λ_C(1 − cos θ) with λ_C = h/m_ec = ${f2(lc)} pm. It is zero for no deflection, ${f2(lc)} pm at 90° and a maximum of 2λ_C = ${f2(2 * lc)} pm for backscatter, independent of the incident wavelength: X-rays of 70 pm scattered at 90° emerge at ${f1(70 + lc)} pm.`,
    alt: `Graph of wavelength shift in picometres against scattering angle from 0 to 180 degrees: a rising curve from zero, ${f2(lc)} at 90 degrees and ${f2(2 * lc)} at 180 degrees.`,
    description: ["The horizontal axis is the photon's scattering angle θ in degrees; the vertical axis is the shift in wavelength Δλ in picometres.", `The curve is Δλ = ${f2(lc)}(1 − cos θ) pm: zero at 0°, ${f2(lc)} pm at 90° and ${f2(2 * lc)} pm at 180°.`, `For the lesson's 70 pm X-rays at 90° the new wavelength is 70 + ${f2(lc)} = ${f1(70 + lc)} pm.`],
    range: { x: [0, 180], y: [0, 5.6] }, ticks: [[30, 60, 90, 120, 150, 180], [1, 2, 3, 4, 5]], grid: [30, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["θ / °", "Δλ / pm"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "λ_C(1 − cos θ)", labelAt: [20, 3.2] }],
    points: [{ x: 90, y: r4(lc), label: `${f2(lc)} pm`, dx: 10, dy: 16 }, { x: 180, y: r4(2 * lc), colour: "a2", label: `${f2(2 * lc)} pm`, dx: -10, dy: 16, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: 90, y: r4(lc), name: `Δλ = λ_C = ${f2(lc)} pm at 90°` }, { type: "point", expr: ex, x: 180, y: r4(2 * lc), name: `the maximum shift is 2λ_C = ${f2(2 * lc)} pm at 180°` }, { type: "point", expr: ex, x: 0, y: 0, name: "no shift without deflection" }],
  });
}

// u20-05 Wave-particle duality: where matter waves matter
{
  const ball = h / 1, atom = 1.1e-10, proton = 1.7e-15, od = Math.log10(atom / ball);
  mk("u20-05", "phys-u20-matter-wave-scales", "scale", {
    title: "A ball's de Broglie wavelength against atomic sizes",
    caption: `For a 1 kg ball at 1 m s⁻¹, λ = h/p = ${(ball * 1e34).toFixed(1)} × 10⁻³⁴ m: about ${f0(od)} orders of magnitude smaller than an atom (10⁻¹⁰ m) and ${f0(Math.log10(proton / ball))} below a proton. No experiment can see wave behaviour at that scale. Electrons and atoms have wavelengths comparable with atomic sizes, which is why they diffract.`,
    alt: `A logarithmic length scale from 10^-35 m to 10^-8 m with the ball's de Broglie wavelength at 6.6 × 10^-34 m, far to the left of a proton at 1.7 × 10^-15 m and a hydrogen atom at 1.1 × 10^-10 m.`,
    description: ["A horizontal logarithmic scale of length in metres.", `The 1 kg ball at 1 m s⁻¹ has λ = h/p = 6.6 × 10⁻³⁴ m.`, "A proton is about 1.7 × 10⁻¹⁵ m across and a hydrogen atom about 1.1 × 10⁻¹⁰ m.", `The ball's wavelength is ${f0(od)} orders of magnitude below the atom: far too small to measure, so the ball shows no wave behaviour.`],
    quantity: "length", units: "m", min: -35, max: -8,
    markers: [{ label: "ball, λ = h/p", value: ball }, { label: "proton", value: proton }, { label: "hydrogen atom", value: atom }],
    claims: [{ type: "orders", a: "ball, λ = h/p", b: "hydrogen atom", value: +od.toFixed(1), tol: 0.2, name: `the ball's wavelength is ${f0(od)} orders of magnitude below an atom` }],
  });
}

// u20-06 de Broglie wavelength: electrons accelerated through V
{
  const k = (h / Math.sqrt(2 * me * e)) * 1e9, ex = `${k}/sqrt(x)`, l100 = k / 10, l150 = k / Math.sqrt(150);
  mk("u20-06", "phys-u20-electron-wavelength-voltage", "graph", {
    title: "Wavelength of an electron against accelerating voltage",
    caption: `Accelerated through V an electron has λ = h/√(2meV) ≈ 1.23/√V nm. At 100 V that is ${f2(l100)} nm, comparable with atomic spacings, which is why electrons diffract from crystals; at the lesson's 150 V it is ${f2(l150)} nm. Raising the voltage by 4 only halves the wavelength.`,
    alt: `Graph of electron wavelength in nanometres against accelerating voltage from 20 to 400 volts: a falling curve through ${f2(l100)} at 100 volts and ${f2(l150)} at 150 volts.`,
    description: ["The horizontal axis is the accelerating voltage V in volts; the vertical axis is the electron's de Broglie wavelength in nanometres.", "The curve is λ = 1.23/√V nm, from λ = h/√(2meV).", `At 100 V λ = ${f2(l100)} nm; at 150 V λ = ${f2(l150)} nm ≈ 0.10 nm.`, "A larger voltage gives a shorter wavelength, falling as 1/√V."],
    range: { x: [0, 400], y: [0, 0.5] }, ticks: [[100, 200, 300, 400], [0.1, 0.2, 0.3, 0.4, 0.5]], grid: [100, 0.1], height: [320, 300], xLabelBelow: true, axisLabels: ["V / V", "λ / nm"],
    curves: [{ expr: ex, domain: [20, 400], colour: "a1", width: 3.4, label: "1.23/√V nm", labelAt: [250, 0.2] }],
    arrows: [{ from: [100, 0.34], to: [100, r4(l100) + 0.012], label: `100 V: ${f2(l100)} nm`, labelAt: [106, 0.36] }, { from: [150, 0.25], to: [150, r4(l150) + 0.012], colour: "a2", label: `150 V: ${f2(l150)} nm`, labelAt: [156, 0.27] }],
    points: [{ x: 100, y: r4(l100) }, { x: 150, y: r4(l150), colour: "a2" }],
    checks: [{ type: "point", expr: ex, x: 100, y: r4(l100), name: `100 V gives ${f2(l100)} nm` }, { type: "point", expr: ex, x: 150, y: r4(l150), name: `150 V gives ${f2(l150)} nm` }],
  });
}

// u20-07 Double-slit experiments: wave interference against classical particles
{
  const s = 5.4, cl = "2*exp(-(x/9)^2)", qu = `2*exp(-(x/9)^2)*(1+cos(6.2831853*x/${s}))`, g = (x) => 2 * Math.exp(-((x / 9) ** 2));
  mk("u20-07", "phys-u20-electron-double-slit", "graph", {
    title: "Electrons through two slits: waves against particles",
    caption: `If electrons were classical particles the two slits would give the sum P₁ + P₂ (dashed): a smooth hump. Adding amplitudes, P = |ψ₁ + ψ₂|² = |ψ₁|² + |ψ₂|² + interference terms, gives fringes (solid) spaced by λD/d = 5.4 pm × 1 m/1 μm = ${s} μm, with zero at the dark fringes and twice the classical value at the bright ones.`,
    alt: `Graph of probability against position on the screen from -14 to 14 micrometres: a smooth dashed hump for classical particles and a solid fringe pattern oscillating between zero and twice that hump with period ${s} micrometres.`,
    description: ["The horizontal axis is position on the screen in micrometres; the vertical axis is the probability density in arbitrary units.", "The dashed curve is P₁ + P₂, the classical sum for particles passing through one slit or the other: no fringes.", `The solid curve is P = P₁ + P₂ + interference term: bright fringes where the paths differ by a whole number of wavelengths, spaced by x = λD/d = ${s} μm.`, `At the centre the fringe peak is twice the classical value; halfway between fringes (${s / 2} μm) the probability falls to zero.`],
    range: { x: [-14, 14], y: [0, 4.6] }, ticks: [[-10, -5, 0, 5, 10], [1, 2, 3, 4]], grid: [5, 1], height: [330, 310], xLabelBelow: true, axisLabels: ["x / μm", "P (arb.)"],
    curves: [{ expr: cl, colour: "a4", dash: "6 5", width: 2.6, label: "P₁ + P₂", labelAt: [4.5, 1.55] }, { expr: qu, colour: "a1", width: 3, samples: 700, label: "|ψ₁ + ψ₂|²", labelAt: [-13.5, 4.2] }],
    arrows: [{ from: [s, 3.55], to: [2 * s, 3.55], both: true, label: `${s} μm`, dy: -12 }],
    checks: [{ type: "point", expr: qu, x: 0, y: 4, name: "twice the classical value at the central bright fringe" }, { type: "point", expr: qu, x: s / 2, y: 0, name: "dark fringe halfway between bright fringes" }, { type: "point", expr: qu, x: s, y: r4(2 * g(s)), name: `the next bright fringe is x = λD/d = ${s} μm away` }, { type: "point", expr: cl, x: 0, y: 2, name: "the classical sum P₁ + P₂ is half the bright-fringe value" }],
  });
}

// u20-08 Heisenberg uncertainty principle: confinement energy
{
  const A = (hbar * hbar) / (8 * me * e) * 1e18, dp = hbar / (2 * 1e-10), KE = dp * dp / (2 * me) / e, ex = `${A}/x^2`;
  mk("u20-08", "phys-u20-confinement-energy", "graph", {
    title: "The energy cost of confining an electron",
    caption: `Confining an electron to Δx forces a momentum spread of at least Δp = ħ/2Δx, so its kinetic energy is of order (Δp)²/2m, which grows as 1/Δx². For Δx = 0.1 nm, Δp ≥ ${(dp * 1e25).toFixed(1)} × 10⁻²⁵ kg m s⁻¹ and KE ≈ ${f2(KE)} eV: atomic energies. Squeezing to half the size costs four times the energy.`,
    alt: `Graph of minimum kinetic energy in electronvolts against confinement size from 0.05 to 0.5 nanometres: a steeply falling curve passing ${f2(KE)} eV at 0.1 nanometres.`,
    description: ["The horizontal axis is the size Δx to which the electron is confined, in nanometres; the vertical axis is the minimum kinetic energy in eV.", "The curve is (ħ/2Δx)²/2m_e, proportional to 1/Δx².", `At Δx = 0.1 nm the momentum spread is at least ${(dp * 1e25).toFixed(1)} × 10⁻²⁵ kg m s⁻¹ and the energy about ${f2(KE)} eV, the scale of atomic energies.`, "Halving Δx raises the energy fourfold."],
    range: { x: [0.05, 0.5], y: [0, 4.2] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5], [1, 2, 3, 4]], grid: [0.1, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["Δx / nm", "KE / eV"],
    curves: [{ expr: ex, domain: [0.05, 0.5], colour: "a1", width: 3.4, label: "(ħ/2Δx)²/2m", labelAt: [0.2, 1.7] }],
    points: [{ x: 0.1, y: r4(KE), colour: "a2", label: `0.1 nm: ${f2(KE)} eV`, dx: 12, dy: -10 }],
    checks: [{ type: "point", expr: ex, x: 0.1, y: r4(KE), name: `Δp ≥ ħ/2Δx gives KE ≈ ${f2(KE)} eV at 0.1 nm` }, { type: "point", expr: ex, x: 0.2, y: r4(KE / 4), name: "KE falls as 1/Δx²: twice the size, a quarter of the energy" }],
  });
}

// u20-09 Wavefunctions: normalisation
{
  const n1 = "2*sin(3.14159265*x)^2";
  mk("u20-09", "phys-u20-normalised-densities", "graph", {
    title: "Two normalised probability densities on 0 < x < L",
    caption: "Normalising means the total probability is 1: ∫|ψ|²dx = 1. The lesson's uniform wavefunction ψ = A has |ψ|² = |A|² = 1/L everywhere (dashed). The infinite-well ground state ψ₁ = √(2/L) sin(πx/L) has |ψ|² = (2/L) sin²(πx/L), bunched in the middle (solid). Both enclose an area of exactly 1, in units where L = 1.",
    alt: "Graph of probability density times L against x over L from 0 to 1: a flat dashed line at 1 and a solid sine-squared hump peaking at 2 in the middle, each enclosing the same area of 1.",
    description: ["The horizontal axis is position x in units of L; the vertical axis is |ψ|² in units of 1/L.", "Dashed: the uniform state ψ = A with A = 1/√L, so |ψ|² = 1 (in units of 1/L) across the whole interval. The area is 1 × 1 = 1.", "Solid (shaded): the infinite-well ground state |ψ₁|² = 2 sin²(πx/L). It peaks at 2 at x = L/2 and has zero at the walls; its area is also 1.", "Different shapes, the same total probability: normalisation fixes the overall size of ψ, not its shape."],
    range: { x: [0, 1], y: [0, 2.4] }, ticks: [[0.25, 0.5, 0.75, 1], [0.5, 1, 1.5, 2]], grid: [0.25, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["x / L", "L|ψ|²"],
    areas: [{ expr: n1, from: 0, to: 1, colour: "a2", opacity: 0.2 }],
    curves: [{ expr: "1", domain: [0, 1], colour: "a4", dash: "6 5", width: 2.6, label: "|A|² = 1/L", labelAt: [0.03, 0.82] }, { expr: n1, domain: [0, 1], colour: "a2", width: 3.4, label: "|ψ₁|²", labelAt: [0.56, 2.1] }],
    checks: [{ type: "area", expr: "1", from: 0, to: 1, value: 1, name: "the uniform state ψ = 1/√L is normalised (area 1)" }, { type: "area", expr: n1, from: 0, to: 1, value: 1, name: "the well ground state is normalised (area 1)" }, { type: "max", expr: n1, domain: [0, 1], x: 0.5, y: 2, name: "|ψ₁|² peaks at 2/L in the middle of the well" }],
  });
}

// u20-10 Probability amplitudes: indistinguishable and distinguishable paths
{
  const ex = `0.5*(1+cos(x*${K}))`;
  mk("u20-10", "phys-u20-amplitude-interference", "graph", {
    title: "Two paths of amplitude 0.5: add amplitudes or add probabilities",
    caption: "Two paths with amplitudes 0.5 and 0.5e^{iφ}. If they are indistinguishable, add amplitudes then square: P = |0.5 + 0.5e^{iφ}|² = ½(1 + cos φ), which runs from 1 (in phase) to 0 (φ = π: the lesson's example, total destructive interference). If the paths are distinguishable, add probabilities: P = 0.25 + 0.25 = 0.5 whatever the phase.",
    alt: "Graph of detection probability against the relative phase from 0 to 360 degrees: a cosine curve from 1 through 0 at 180 degrees and back to 1, and a flat line at 0.5 for distinguishable paths.",
    description: ["The horizontal axis is the relative phase φ between the two paths in degrees; the vertical axis is the probability of detection.", "Solid: indistinguishable paths, P = |0.5 + 0.5e^{iφ}|² = ½(1 + cos φ). It is 1 at 0° and 360° and zero at 180°.", "Dashed: distinguishable paths, P = |0.5|² + |0.5|² = 0.5 at every phase.", "At φ = π the amplitudes 0.5 and −0.5 cancel: the probability is 0, an outcome that adding probabilities could never give."],
    range: { x: [0, 360], y: [0, 1.15] }, ticks: [[90, 180, 270, 360], [0.25, 0.5, 0.75, 1]], grid: [90, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["φ / °", "P"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "amplitudes add", labelAt: [215, 0.82] }, { expr: "0.5", domain: [0, 360], colour: "a4", dash: "6 5", width: 2.6, label: "probabilities add", labelAt: [215, 0.43] }],
    points: [{ x: 180, y: 0, colour: "a2", label: "P = 0 at φ = π", dx: 10, dy: -16 }],
    checks: [{ type: "point", expr: ex, x: 180, y: 0, name: "amplitudes 0.5 and −0.5 give P = 0" }, { type: "point", expr: ex, x: 0, y: 1, name: "in phase: amplitude 1, P = 1" }, { type: "point", expr: ex, x: 90, y: 0.5, name: "at 90° the interference term vanishes: P = 0.5" }],
  });
}

// u20-12 Schrödinger equation: free-particle dispersion
{
  const B = (hbar * hbar) / (2 * me * e) * 1e20, ex = `${B}*x^2`;
  mk("u20-12", "phys-u20-free-particle-dispersion", "graph", {
    title: "The free-particle relation behind the Schrödinger equation",
    caption: `Substituting ψ = e^{i(kx − ωt)} into iħ∂ψ/∂t = −(ħ²/2m)∂²ψ/∂x² works only if ħω = ħ²k²/2m, that is E = p²/2m. For an electron this is a parabola, E = ${f2(B)} k² eV with k in Å⁻¹: k = 1 Å⁻¹ (λ = 2π Å) has ${f2(B)} eV, and doubling k quadruples E.`,
    alt: `Graph of electron energy in electronvolts against wavenumber from 0 to 3 inverse angstroms: a parabola through ${f2(B)} at 1 and ${f2(4 * B)} at 2.`,
    description: ["The horizontal axis is the wavenumber k in Å⁻¹; the vertical axis is the energy E = ħω in eV.", "The Schrödinger equation is satisfied by e^{i(kx − ωt)} only when ħω = ħ²k²/2m: the plane wave carries the classical kinetic energy p²/2m with p = ħk.", `For an electron E = ${f2(B)}k² eV: ${f2(B)} eV at k = 1 Å⁻¹ and ${f2(4 * B)} eV at k = 2 Å⁻¹.`],
    range: { x: [0, 3], y: [0, 36] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [10, 20, 30]], grid: [0.5, 10], height: [320, 300], xLabelBelow: true, axisLabels: ["k / Å⁻¹", "E / eV"],
    curves: [{ expr: ex, domain: [0, 3], colour: "a1", width: 3.4, label: "E = ħ²k²/2m", labelAt: [0.4, 18] }],
    points: [{ x: 1, y: r4(B), label: `${f2(B)} eV`, dx: 10, dy: 16 }, { x: 2, y: r4(4 * B), colour: "a2", label: `${f1(4 * B)} eV`, dx: 10, dy: 16 }],
    checks: [{ type: "point", expr: ex, x: 1, y: r4(B), name: `E = ħ²k²/2m = ${f2(B)} eV at k = 1 Å⁻¹ for an electron` }, { type: "point", expr: ex, x: 2, y: r4(4 * B), name: "doubling k quadruples E" }],
  });
}

// u20-13 Time-dependent and time-independent equations: beating of two stationary states
{
  const A = Math.SQRT1_2, ex = `0.75+${A}*cos(18.849556*x)`;
  mk("u20-13", "phys-u20-beat-oscillation", "graph", {
    title: "Probability in a box sloshing at (E₂ − E₁)/h",
    caption: `For (φ₁ + φ₂)/√2 in a box, each stationary state alone has a time-independent |ψ|², but the mixture does not: at x = L/4 the density is (2/L)[0.75 + ${f2(A)} cos(2π(E₂ − E₁)t/h)]. Since E₂ − E₁ = 3E₁ the density oscillates at f = 3E₁/h, three full cycles in each time h/E₁.`,
    alt: `Graph of probability density at one point against time in units of h over E1 from 0 to 1: a cosine with three full cycles, varying between ${f2(0.75 + A)} and ${f2(0.75 - A)}.`,
    description: ["The horizontal axis is time in units of h/E₁; the vertical axis is |ψ|² at x = L/4 in units of 2/L.", `At x = L/4, φ₁² = 0.5 and φ₂² = 1 (in units of 2/L) and the cross term is 2φ₁φ₂ × ½ cos ωt: |ψ|² = 0.75 + ${f2(A)} cos ωt.`, "The two components have energies E₁ and E₂ = 4E₁, so ω = (E₂ − E₁)/ħ = 3E₁/ħ and f = 3E₁/h.", "Three complete cycles fit into one unit of h/E₁."],
    range: { x: [0, 1], y: [0, 1.7] }, ticks: [[0.25, 0.5, 0.75, 1], [0.5, 1, 1.5]], grid: [1 / 3, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["t / (h/E₁)", "|ψ|² at L/4"],
    curves: [{ expr: ex, domain: [0, 1], colour: "a1", width: 3.2, samples: 400 }],
    arrows: [{ from: [0, 1.58], to: [1 / 3, 1.58], both: true, label: "period h/3E₁", dy: -12 }],
    checks: [{ type: "point", expr: ex, x: 0, y: r4(0.75 + A), name: "the density starts at its maximum 0.75 + 0.71" }, { type: "point", expr: ex, x: 1 / 6, y: r4(0.75 - A), name: "half a period later (t = h/6E₁) it is at its minimum" }, { type: "point", expr: ex, x: 1 / 3, y: r4(0.75 + A), name: "a full period is h/3E₁: f = 3E₁/h" }],
  });
}

// u20-16 Expectation values: the mean position is not the most likely position
{
  const n1 = "2*sin(3.14159265*x)^2", n2 = "2*sin(2*3.14159265*x)^2";
  mk("u20-16", "phys-u20-expectation-x", "graph", {
    title: "⟨x⟩ = L/2 for symmetric densities",
    caption: "Both |ψ₁|² and |ψ₂|² of the infinite well are symmetric about x = L/2, so ⟨x⟩ = ∫x|ψ|²dx = L/2 for each. For the ground state that is also where the particle is most likely found. For n = 2 it is where it is never found: ⟨x⟩ is an average over many measurements, not a possible result.",
    alt: "Graph of probability density over the well: a single hump for the ground state and two humps with a zero in the middle for the first excited state, with a vertical line at the middle marked as the mean position for both.",
    description: ["The horizontal axis is position x in units of L; the vertical axis is |ψ|² in units of 1/L.", "Ground state |ψ₁|² = 2 sin²(πx/L): one hump, value 2 at the centre.", "First excited state |ψ₂|² = 2 sin²(2πx/L): two humps at L/4 and 3L/4 and zero at the centre.", "Each curve is a mirror image about x = L/2, so ⟨x⟩ = L/2 for both; for n = 2 the particle is never found at the mean position."],
    range: { x: [0, 1], y: [0, 2.5] }, ticks: [[0.25, 0.5, 0.75, 1], [0.5, 1, 1.5, 2]], grid: [0.25, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["x / L", "L|ψ|²"],
    marks: [{ x: 0.5, label: "⟨x⟩ = L/2", to: 2.3 }],
    curves: [{ expr: n1, domain: [0, 1], colour: "a1", width: 3.2, label: "|ψ₁|²", labelAt: [0.07, 1.0] }, { expr: n2, domain: [0, 1], colour: "a2", width: 3.2, label: "|ψ₂|²", labelAt: [0.8, 2.3] }],
    checks: [{ type: "point", expr: n1, x: 0.25, y: 1, name: "|ψ₁|² is symmetric about L/2 (value at L/4)" }, { type: "point", expr: n1, x: 0.75, y: 1, name: "|ψ₁|² is symmetric about L/2 (value at 3L/4)" }, { type: "point", expr: n2, x: 0.25, y: 2, name: "|ψ₂|² peaks at L/4" }, { type: "point", expr: n2, x: 0.75, y: 2, name: "|ψ₂|² peaks at 3L/4" }, { type: "point", expr: n2, x: 0.5, y: 0, name: "|ψ₂|² is zero at the mean position" }, { type: "area", expr: n2, from: 0, to: 1, value: 1, name: "|ψ₂|² is normalised" }],
  });
}

// u20-17 Hilbert spaces: dimension of n qubits
{
  const d = (n) => 2 ** n, od = Math.log10(d(50) / d(3));
  mk("u20-17", "phys-u20-hilbert-dimension", "scale", {
    title: "The Hilbert space of n qubits",
    caption: `Joining systems multiplies dimensions: n qubits live in a 2ⁿ-dimensional space. 3 qubits need ${d(3)} amplitudes (the lesson's example), 10 qubits ${d(10).toLocaleString("en-GB")}, 20 qubits about 10⁶ and 50 qubits 2⁵⁰ ≈ 10¹⁵: ${f0(od)} orders of magnitude more than 3 qubits, which is why simulating them classically is hard.`,
    alt: "A logarithmic scale of Hilbert-space dimension from 1 to 10^16 with 3 qubits at 8, 10 qubits at 1024, 20 qubits at about a million and 50 qubits at about 10^15.",
    description: ["A horizontal logarithmic scale of the number of amplitudes (the dimension of the Hilbert space).", `Marked: 3 qubits, 2³ = ${d(3)}; 10 qubits, 2¹⁰ = ${d(10)}; 20 qubits, 2²⁰ ≈ 10⁶; 50 qubits, 2⁵⁰ ≈ 10¹⁵.`, "Each added qubit doubles the dimension, so the numbers grow exponentially."],
    quantity: "dimension", units: "", min: 0, max: 16,
    markers: [{ label: "3 qubits: 8", value: d(3) }, { label: "10 qubits: 1024", value: d(10) }, { label: "20 qubits: 2²⁰", value: d(20) }, { label: "50 qubits: 2⁵⁰", value: d(50) }],
    claims: [{ type: "orders", a: "3 qubits: 8", b: "50 qubits: 2⁵⁰", value: +od.toFixed(2), tol: 0.05, name: "50 qubits have 2^47 times the dimension of 3 qubits" }],
  });
}

// u20-22 Infinite wells: an electron in a 1 nm box
{
  const L = 1e-9, E1 = (h * h) / (8 * me * L * L) / e, En = (n) => n * n * E1, lam = (a, b) => 1239.84198 / (En(a) - En(b));
  mk("u20-22", "phys-u20-box-levels", "transitions", {
    title: "Energy levels of an electron in a 1 nm infinite well",
    caption: `E_n = n²h²/8mL² = n² × ${f2(E1)} eV. The levels are not evenly spaced (E₂ = 4E₁, E₃ = 9E₁), the lowest is above zero, and jumps between them give photons: 2 → 1 is ${f2(En(2) - En(1))} eV (${f0(lam(2, 1))} nm, infrared), 3 → 2 is ${f2(En(3) - En(2))} eV (${f0(lam(3, 2))} nm, red) and 4 → 3 is ${f2(En(4) - En(3))} eV (${f0(lam(4, 3))} nm, blue).`,
    alt: `Energy-level diagram for an electron in a 1 nm well: levels at ${f2(En(1))}, ${f2(En(2))}, ${f2(En(3))} and ${f2(En(4))} electronvolts with downward arrows for the transitions 2 to 1, 3 to 2 and 4 to 3.`,
    description: ["Horizontal levels for n = 1 to 4 at heights E_n = n² × h²/8mL² with L = 1 nm: " + [1, 2, 3, 4].map((n) => `${f2(En(n))} eV`).join(", ") + ".", "The spacings grow with n (1 : 3 : 5 : 7 in units of E₁) and the lowest level is above zero: the zero-point energy.", `Arrows show photon emission: 2 → 1 gives ${f2(En(2) - En(1))} eV, ${f0(lam(2, 1))} nm in the infrared; 3 → 2 gives ${f0(lam(3, 2))} nm, red; 4 → 3 gives ${f0(lam(4, 3))} nm, blue.`],
    levels: [1, 2, 3, 4].map((n) => ({ n, E: r4(En(n)) })),
    transitions: [{ from: 2, to: 1, E: r4(En(2) - En(1)), lambda: r4(lam(2, 1)), kind: "emission", region: "infrared" }, { from: 3, to: 2, E: r4(En(3) - En(2)), lambda: r4(lam(3, 2)), kind: "emission", region: "visible" }, { from: 4, to: 3, E: r4(En(4) - En(3)), lambda: r4(lam(4, 3)), kind: "emission", region: "visible" }],
  });
}

// u20-23 Quantum tunnelling: transmission against barrier width
{
  const kap = Math.sqrt(2 * me * 4 * e) / hbar / 1e9, s = 2 * kap * Math.LOG10E, T = Math.exp(-2 * kap * 0.5), ex = `-${s}*x`;
  mk("u20-23", "phys-u20-tunnelling-decay", "graph", {
    title: "Tunnelling through a 5 eV barrier: log T against width",
    caption: `For an electron of 1 eV meeting a 5 eV barrier, κ = √(2m(V₀ − E))/ħ = ${f2(kap)} nm⁻¹ and T ≈ e^{−2κd}. On a logarithmic scale this is a straight line falling by ${f1(s)} powers of ten per nanometre: at the lesson's 0.5 nm, log₁₀T = ${f2(-s * 0.5)}, T = ${(T * 1e5).toFixed(1)} × 10⁻⁵ ≈ 4 × 10⁻⁵. Adding just 0.1 nm cuts T by a factor of ${f1(10 ** (s * 0.1))}.`,
    alt: `Graph of the base-10 logarithm of the transmission probability against barrier width from 0 to 0.6 nanometres: a straight line falling from 0 to ${f2(-s * 0.5)} at 0.5 nanometres.`,
    description: ["The horizontal axis is the barrier width d in nanometres; the vertical axis is log₁₀ of the transmission probability T.", `κ = √(2 × 9.11 × 10⁻³¹ × 4 eV)/ħ = ${f2(kap)} nm⁻¹, so log₁₀T = −2κd log₁₀e = −${f1(s)}d.`, `At d = 0.5 nm: log₁₀T = ${f2(-s * 0.5)}, T = ${(T * 1e5).toFixed(1)} × 10⁻⁵.`, "A thicker barrier cuts the transmission exponentially: every extra 0.1 nm reduces T about 8-fold."],
    range: { x: [0, 0.6], y: [-5.6, 0.4] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5, 0.6], [-1, -2, -3, -4, -5]], grid: [0.1, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["d / nm", "log₁₀ T"],
    curves: [{ expr: ex, domain: [0, 0.6], colour: "a1", width: 3.4, label: "T ≈ e^{−2κd}", labelAt: [0.05, -3.9] }],
    points: [{ x: 0.5, y: r4(-s * 0.5), colour: "a2", label: "T ≈ 4 × 10⁻⁵", dx: -10, dy: -16, anchor: "end" }],
    checks: [{ type: "slope", expr: ex, x: 0.3, value: -s, name: `log₁₀T falls by ${f1(s)} per nm (2κ log₁₀e)` }, { type: "point", expr: ex, x: 0.5, y: r4(-s * 0.5), name: `0.5 nm gives T = e^{−10.2} ≈ 4 × 10⁻⁵ (log₁₀T = ${f2(-s * 0.5)})` }],
  });
}

// u20-24 Quantum harmonic oscillator: CO
{
  const f = 6.4e13, hw = (h * f) / e, En = (n) => (n + 0.5) * hw, lam = (c / f) * 1e9;
  mk("u20-24", "phys-u20-co-vibration-levels", "transitions", {
    title: "Vibrational levels of CO",
    caption: `E_n = (n + ½)ħω with ħω = hf = ${f3(hw)} eV for f = 6.4 × 10¹³ Hz. The levels are evenly spaced, the lowest is ${f2(En(0))} eV above the bottom (zero-point energy ½ħω), and every step up absorbs the same ${f3(hw)} eV photon, ${f1(lam / 1000)} μm in the infrared.`,
    alt: `Energy-level diagram of five equally spaced levels from ${f3(En(0))} to ${f3(En(4))} electronvolts, with upward absorption arrows of ${f3(hw)} electronvolts between neighbours.`,
    description: ["Levels n = 0 to 4 at E_n = (n + ½)ħω: " + [0, 1, 2, 3, 4].map((n) => `${f3(En(n))} eV`).join(", ") + ".", `The spacing is constant, ħω = ${f3(hw)} eV; the lowest level is ½ħω = ${f2(En(0))} eV (zero-point energy).`, `Upward arrows show absorption between neighbours; each photon has ${f3(hw)} eV and wavelength ${f1(lam / 1000)} μm in the infrared.`],
    levels: [0, 1, 2, 3, 4].map((n) => ({ n, E: r4(En(n)) })),
    transitions: [{ from: 0, to: 1, E: r4(hw), f, kind: "absorption", region: "infrared" }, { from: 1, to: 2, E: r4(hw), f, kind: "absorption", region: "infrared" }, { from: 2, to: 3, E: r4(hw), f, kind: "absorption", region: "infrared" }],
  });
}

// u20-25 Quantum barriers and scattering: reflection at a 3 eV step
{
  const R = (E) => ((Math.sqrt(E) - Math.sqrt(E - 3)) / (Math.sqrt(E) + Math.sqrt(E - 3))) ** 2, ex = "((sqrt(x)-sqrt(x-3))/(sqrt(x)+sqrt(x-3)))^2", ext = `1-${ex}`;
  mk("u20-25", "phys-u20-step-reflection", "graph", {
    title: "Reflection from a 3 eV potential step",
    caption: `Above the step (E > V₀ = 3 eV) the wave still reflects partially: R = ((k₁ − k₂)/(k₁ + k₂))² with k ∝ √E and k₂ ∝ √(E − V₀). At E = 5 eV, k₁/k₂ = √(5/2) = 1.58 and R = ${f2(R(5))}, so ${f0(100 * R(5))}% of the electrons bounce back; T = 1 − R = ${f2(1 - R(5))}. R falls as E rises but never reaches zero, and at E = V₀ all are reflected.`,
    alt: `Graph of reflection and transmission probabilities against electron energy from 3 to 12 electronvolts for a 3 electronvolt step: reflection falls from 1 to ${f2(R(5))} at 5 electronvolts and keeps falling; transmission rises correspondingly.`,
    description: ["The horizontal axis is the electron energy E in eV, above the 3 eV step; the vertical axis is the probability.", "R = ((√E − √(E − 3))/(√E + √(E − 3)))² (the ratio k₂/k₁ = √(1 − V₀/E)). At E = 3 eV, R = 1.", `At E = 5 eV, R = ${f2(R(5))}: about ${f0(100 * R(5))}% reflected, ${f0(100 * (1 - R(5)))}% transmitted.`, "As E grows, R decreases towards zero but a classical particle would never be reflected: this is a wave effect."],
    range: { x: [3, 12], y: [0, 1.1] }, ticks: [[4, 6, 8, 10, 12], [0.25, 0.5, 0.75, 1]], grid: [1, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["E / eV", "probability"],
    curves: [{ expr: ex, domain: [3, 12], colour: "a2", width: 3.4, label: "R", labelAt: [3.6, 0.5], samples: 300 }, { expr: ext, domain: [3, 12], colour: "a1", width: 3.4, label: "T = 1 − R", labelAt: [8.5, 0.82], samples: 300 }],
    points: [{ x: 5, y: r4(R(5)), colour: "ink", label: `R = ${f2(R(5))} at 5 eV`, dx: 10, dy: -14 }],
    checks: [{ type: "point", expr: ex, x: 5, y: r4(R(5)), name: `R = ${f2(R(5))} for E = 5 eV, V₀ = 3 eV` }, { type: "point", expr: ex, x: 3, y: 1, name: "everything is reflected at E = V₀" }, { type: "point", expr: ext, x: 5, y: r4(1 - R(5)), name: `T = ${f2(1 - R(5))} at 5 eV` }],
  });
}

// u20-26 Angular momentum: l = 2
{
  const l = 2, mag = Math.sqrt(l * (l + 1)), perp = Math.sqrt(mag * mag - 4), ang = (Math.atan2(2, perp) * 180) / Math.PI;
  mk("u20-26", "phys-u20-l2-vector", "vectors", {
    title: "The l = 2 angular momentum with m = 2",
    caption: `For l = 2 the length is |L| = √(l(l + 1))ħ = √6 ħ = ${f2(mag)}ħ, but the largest component along z is only L_z = 2ħ. So L can never point exactly along z: even for m = 2 it makes ${f1(90 - ang)}° with the z axis and has a perpendicular part √2 ħ = ${f2(perp)}ħ. The possible L_z are −2ħ, −ħ, 0, ħ, 2ħ.`,
    alt: `Vector diagram: an arrow of length ${f2(mag)} in units of h-bar tilted ${f1(90 - ang)} degrees from the vertical z axis, with a vertical component of 2 and a horizontal component of ${f2(perp)}.`,
    description: [`|L| = √(l(l + 1))ħ = √6 ħ = ${f2(mag)}ħ, drawn at ${f1(ang)}° to the horizontal (${f1(90 - ang)}° from the z axis).`, "The vertical (z) component is L_z = mħ = 2ħ, the largest allowed value for l = 2.", `The horizontal component is √(6 − 4)ħ = ${f2(perp)}ħ: L_x and L_y cannot both be zero, because they do not commute with L_z.`, "The other allowed values of L_z are ħ, 0, −ħ, −2ħ, each with the same |L|."],
    mode: "resolve", units: "ħ",
    vectors: [{ label: "L", mag: r4(mag), angle: r4(ang), text: `${f2(mag)}ħ`, comps: [r4(perp), 2], compLabels: [`${f2(perp)}ħ`, "L_z = 2ħ"] }],
    notes: [`|L| = √6 ħ = ${f2(mag)}ħ > L_z,max = 2ħ`],
  });
}

// u20-31 Pauli exclusion principle: shell capacities
{
  const ex = "2*x^2";
  mk("u20-31", "phys-u20-shell-capacity", "graph", {
    title: "Electrons that fit in each shell: 2n²",
    caption: "Shell n has l = 0 … n − 1 and 2l + 1 orbitals for each l: n² orbitals in all, each holding two electrons of opposite spin. The capacity is 2n²: 2, 8, 18, 32. For n = 3 it is (1 + 3 + 5) × 2 = 18, the lesson's example.",
    alt: "Graph of the maximum number of electrons against shell number n: a rising parabola 2n squared with points at 2 for n equal 1, 8 for n equal 2, 18 for n equal 3 and 32 for n equal 4.",
    description: ["The horizontal axis is the shell number n; the vertical axis is the maximum number of electrons in the shell.", "Each shell has n² orbitals (1 + 3 + 5 + … for l = 0, 1, 2, …), and each orbital holds 2 electrons.", "Points: n = 1: 2; n = 2: 8; n = 3: 1 + 3 + 5 = 9 orbitals, 18 electrons; n = 4: 32.", "The curve 2n² shows the capacity growing as the square of n."],
    range: { x: [0.5, 4.5], y: [0, 36] }, ticks: [[1, 2, 3, 4], [8, 16, 24, 32]], grid: [1, 8], height: [320, 300], xLabelBelow: true, axisLabels: ["n", "electrons"],
    curves: [{ expr: ex, domain: [1, 4.3], colour: "a1", width: 3, label: "2n²", labelAt: [2.6, 6] }],
    points: [1, 2, 3, 4].map((n) => ({ x: n, y: 2 * n * n, colour: n === 3 ? "a2" : "ink", label: String(2 * n * n), dx: -10, dy: -12, anchor: "end" })),
    checks: [1, 2, 3, 4].map((n) => ({ type: "point", expr: ex, x: n, y: 2 * n * n, name: `shell ${n} holds ${2 * n * n}${n === 3 ? " = 2 × (1 + 3 + 5) electrons" : ""}` })),
  });
}

// u20-32 Hydrogen atom: the Balmer series
{
  const En = (n) => -13.6057 / n ** 2, lam = (a, b) => 1239.84198 / (En(a) - En(b)), tr = (a, b, region) => ({ from: a, to: b, lambda: r4(lam(a, b)), kind: "emission", region, label: `${f0(lam(a, b))}` });
  mk("u20-32", "phys-u20-hydrogen-balmer", "transitions", {
    title: "Hydrogen: the Lyman α line and the Balmer series",
    caption: `With E_n = −13.6 eV/n², dropping from n = 3 to n = 2 releases 13.6(1/4 − 1/9) = ${f2(En(3) - En(2))} eV: λ = hc/ΔE = ${f0(lam(3, 2))} nm, the red Hα line. Transitions ending on n = 2 give the visible Balmer lines (Hα ${f0(lam(3, 2))}, Hβ ${f0(lam(4, 2))}, Hγ ${f0(lam(5, 2))}, Hδ ${f0(lam(6, 2))} nm); 2 → 1 (Lyman α, ${f0(lam(2, 1))} nm) is ultraviolet.`,
    alt: `Hydrogen energy levels n = 1 to 6 with downward arrows for 2 to 1 at ${f0(lam(2, 1))} nm in the ultraviolet and for 3, 4, 5 and 6 to 2 at ${f0(lam(3, 2))}, ${f0(lam(4, 2))}, ${f0(lam(5, 2))} and ${f0(lam(6, 2))} nm in the visible, with the line spectrum below.`,
    description: ["Hydrogen's levels E_n = −13.6 eV/n² for n = 1 to 6 (the upper levels are spread out, not to scale).", `The Balmer series: n = 3, 4, 5, 6 down to n = 2 gives ${f0(lam(3, 2))}, ${f0(lam(4, 2))}, ${f0(lam(5, 2))} and ${f0(lam(6, 2))} nm, all visible.`, `Hα (3 → 2): ΔE = 13.6(1/4 − 1/9) = ${f2(En(3) - En(2))} eV, λ = 1240/${f2(En(3) - En(2))} = ${f0(lam(3, 2))} nm (red).`, `Lyman α (2 → 1) is ${f0(lam(2, 1))} nm, in the ultraviolet.`],
    atom: "H", scale: "sqrt", spectrum: true,
    levels: [1, 2, 3, 4, 5, 6].map((n) => ({ n, E: r3(En(n)) })),
    transitions: [tr(2, 1, "ultraviolet"), tr(3, 2, "visible"), tr(4, 2, "visible"), tr(5, 2, "visible"), tr(6, 2, "visible")],
  });
}

// u20-33 Orbital angular momentum: the normal Zeeman effect
{
  const muB = (9.2740100783e-24 / e) * 1e6, ex = (m) => `${m * muB}*x`;
  mk("u20-33", "phys-u20-zeeman-levels", "graph", {
    title: "Normal Zeeman splitting of an l = 1 level",
    caption: `In a field B the magnetic moment gives each m_l level a shift m_lμ_BB with μ_B = ${f2(muB)} μeV T⁻¹. In 1 T the three levels of an l = 1 level move to +${f1(muB)}, 0 and −${f1(muB)} μeV, so adjacent levels are μ_BB = ${f1(muB)} μeV = 5.8 × 10⁻⁵ eV apart, and the splitting grows in proportion to B.`,
    alt: `Graph of energy shift in microelectronvolts against magnetic field from 0 to 2 tesla: three straight lines from the origin with gradients plus ${f1(muB)}, zero and minus ${f1(muB)} microelectronvolts per tesla for m equal to 1, 0 and -1.`,
    description: ["The horizontal axis is the magnetic flux density in tesla; the vertical axis is the shift of the energy level in μeV.", `Each level moves by m_lμ_BB, so the lines have gradients +${f1(muB)}, 0 and −${f1(muB)} μeV per tesla for m_l = +1, 0, −1.`, `At B = 1 T the levels are at +${f1(muB)}, 0 and −${f1(muB)} μeV: adjacent levels are ${f1(muB)} μeV = 5.8 × 10⁻⁵ eV apart.`],
    range: { x: [0, 2], y: [-130, 130] }, ticks: [[0.5, 1, 1.5, 2], [-100, -50, 50, 100]], grid: [0.5, 50], height: [330, 310], xLabelBelow: true, axisLabels: ["B / T", "ΔE / μeV"],
    curves: [{ expr: ex(1), domain: [0, 2], colour: "a2", width: 3.2, label: "m_l = +1", labelAt: [0.1, 75] }, { expr: "0", domain: [0, 2], colour: "a4", width: 3.2, label: "m_l = 0", labelAt: [0.1, 14] }, { expr: ex(-1), domain: [0, 2], colour: "a1", width: 3.2, label: "m_l = −1", labelAt: [0.1, -75] }],
    points: [{ x: 1, y: r4(muB), colour: "ink", label: `${f1(muB)} μeV`, dx: 10, dy: -10 }, { x: 1, y: r4(-muB), colour: "ink", label: `−${f1(muB)} μeV`, dx: 10, dy: 16 }],
    checks: [{ type: "slope", expr: ex(1), x: 1, value: r4(muB), name: `the m_l = +1 level moves ${f1(muB)} μeV per tesla (μ_B)` }, { type: "point", expr: ex(1), x: 1, y: r4(muB), name: `adjacent levels are μ_BB = ${f1(muB)} μeV apart in 1 T` }, { type: "point", expr: ex(-1), x: 1, y: r4(-muB), name: "the m_l = −1 level is the mirror image" }],
  });
}

// u20-36 Variational method: Gaussian trial for the harmonic oscillator (units ħ = m = ω = 1)
{
  const ex = "0.5*x+0.125/x";
  mk("u20-36", "phys-u20-variational-gaussian", "graph", {
    title: "Variational energy of a Gaussian trial function",
    caption: "With ψ = e^{−αx²}, ⟨H⟩ = ħ²α/2m + mω²/8α. In units ħ = m = ω = 1 this is α/2 + 1/(8α): it is never below the true ground-state energy ½ħω (dashed) and touches it at α = mω/2ħ = 0.5, because the true ground state is exactly this Gaussian. The kinetic term grows with α (narrower), the potential term falls.",
    alt: "Graph of the trial energy against the parameter alpha from 0.15 to 2.5: a U-shaped curve with its minimum of 0.5 at alpha equal to 0.5, touching a dashed horizontal line at the exact ground-state energy 0.5.",
    description: ["The horizontal axis is the trial parameter α in units of mω/ħ; the vertical axis is ⟨H⟩ in units of ħω.", "The curve is α/2 + 1/(8α), the sum of a kinetic term ħ²α/2m (rising with α) and a potential term mω²/8α (falling).", "Its minimum is at α = 0.5, where ⟨H⟩ = 0.25 + 0.25 = 0.5.", "The dashed line is the exact ground-state energy ½ħω: the variational curve never goes below it, and here reaches it exactly."],
    range: { x: [0.1, 2.5], y: [0, 1.6] }, ticks: [[0.5, 1, 1.5, 2, 2.5], [0.5, 1, 1.5]], grid: [0.5, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["α / (mω/ħ)", "⟨H⟩ / ħω"],
    curves: [{ expr: "0.5", domain: [0.1, 2.5], colour: "a4", dash: "6 5", width: 2.4, label: "exact E₀ = ½ħω", labelAt: [1.3, 0.4] }, { expr: ex, domain: [0.15, 2.5], colour: "a1", width: 3.4, label: "⟨H⟩(α)", labelAt: [1.6, 1.15] }],
    points: [{ x: 0.5, y: 0.5, colour: "a2", label: "minimum 0.5 at α = 0.5", dx: 12, dy: -18 }],
    checks: [{ type: "min", expr: ex, domain: [0.15, 2.5], x: 0.5, y: 0.5, tol: 0.01, name: "the trial energy is smallest at α = mω/2ħ with ⟨H⟩ = ħω/2" }, { type: "point", expr: ex, x: 1, y: 0.625, name: "elsewhere it is higher (α = 1: 0.625)" }],
  });
}

// u20-37 WKB approximation: quantised phase-space orbits of the oscillator (units ħ = m = ω = 1, h = 2π)
{
  const Es = [0.5, 1.5, 2.5], cols = ["a1", "a4", "a2"];
  const top = (E) => `sqrt(${2 * E}-x^2)`, bot = (E) => `-sqrt(${2 * E}-x^2)`, rr = (E) => Math.sqrt(2 * E) - 1e-7;
  mk("u20-37", "phys-u20-wkb-phase-space", "graph", {
    title: "Bohr–Sommerfeld orbits of the harmonic oscillator",
    caption: "In phase space (x, p) the oscillator's orbit of energy E is the ellipse p²/2m + mω²x²/2 = E, with area 2πE/ω. The rule ∮p dx = (n + ½)h therefore picks E = (n + ½)ħω. In units ħ = m = ω = 1 (h = 2π) the allowed ellipses for n = 0, 1, 2 have areas π, 3π and 5π: consecutive orbits differ in area by exactly h.",
    alt: "Phase-space diagram with momentum against position: three nested ellipses for n equal 0, 1 and 2 with areas pi, 3 pi and 5 pi, each larger one adding the same area 2 pi, which is Planck's constant in these units.",
    description: ["The horizontal axis is position x and the vertical axis momentum p, in units where ħ = m = ω = 1.", "Each ellipse is the classical orbit p² + x² = 2E for E = ½, 3/2 and 5/2, with semi-axes √(2E).", "Its area is 2πE: π, 3π and 5π, that is (n + ½)h with h = 2π, for n = 0, 1, 2.", "Neighbouring allowed orbits enclose areas differing by exactly h, one quantum state per area h of phase space."],
    range: { x: [-2.6, 2.6], y: [-2.6, 2.6] }, ticks: [[-2, -1, 1, 2], [-2, -1, 1, 2]], grid: [1, 1], height: [380, 360], axisLabels: ["x", "p"],
    curves: Es.flatMap((E, i) => [{ expr: top(E), domain: [-rr(E), rr(E)], colour: cols[i], width: 3, samples: 400, ...(i === 0 ? {} : {}) }, { expr: bot(E), domain: [-rr(E), rr(E)], colour: cols[i], width: 3, samples: 400 }]),
    points: [{ x: 0, y: 1, colour: "a1", label: "n = 0", dx: 8, dy: -10 }, { x: 0, y: Math.sqrt(3), colour: "a4", label: "n = 1", dx: 8, dy: -10 }, { x: 0, y: Math.sqrt(5), colour: "a2", label: "n = 2", dx: 8, dy: -10 }],
    checks: Es.map((E, n) => ({ type: "area", expr: top(E), from: -Math.sqrt(2 * E), to: Math.sqrt(2 * E), value: r4(Math.PI * E), tol: 0.01, name: `n = ${n}: the orbit's area is 2πE = ${f2(2 * Math.PI * E)} = (n + ½)h with h = 2π` })),
  });
}

// u20-41 Decoherence: coherence decay of a qubit
{
  const T2 = 100e-6, tg = 50e-9, N = T2 / tg, ex = `exp(-x/${N})`;
  mk("u20-41", "phys-u20-coherence-decay", "graph", {
    title: "Coherence of a qubit with T₂ = 100 μs",
    caption: `Dephasing makes the off-diagonal (coherence) terms of the density matrix decay as e^{−t/T₂}. With T₂ = 100 μs and a gate time of 50 ns, T₂ lasts ${f0(N)} gate times: after ${f0(N)} gates only 1/e = ${f2(Math.exp(-1))} of the coherence is left, and after ${f0(N / 4)} gates it has already fallen to ${f2(Math.exp(-0.25))}. Long algorithms therefore need error correction.`,
    alt: `Graph of coherence against the number of 50 nanosecond gates from 0 to 6000: an exponential decay passing ${f2(Math.exp(-1))} at ${f0(N)} gates.`,
    description: ["The horizontal axis is the number of 50 ns gate operations (elapsed time ÷ 50 ns); the vertical axis is the remaining coherence, starting at 1.", `The curve is e^{−t/T₂} = e^{−n/${f0(N)}}, since T₂/50 ns = ${f0(N)}.`, `At n = ${f0(N)} gates (t = T₂ = 100 μs) the coherence is 1/e = ${f2(Math.exp(-1))}.`, "Beyond a few thousand gates little coherence remains."],
    range: { x: [0, 6000], y: [0, 1.1] }, ticks: [[1000, 2000, 3000, 4000, 5000, 6000], [0.25, 0.5, 0.75, 1]], grid: [1000, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["gates n", "coherence"],
    curves: [{ expr: ex, domain: [0, 6000], colour: "a1", width: 3.4, label: "e^{−t/T₂}", labelAt: [2700, 0.58] }],
    points: [{ x: N, y: r4(Math.exp(-1)), colour: "a2", label: `${f0(N)} gates: ${f2(Math.exp(-1))}`, dx: 12, dy: -14 }],
    checks: [{ type: "point", expr: ex, x: N, y: r4(Math.exp(-1)), name: `T₂ = 100 μs is ${f0(N)} gate times of 50 ns; coherence is 1/e there` }, { type: "point", expr: ex, x: 0, y: 1, name: "full coherence at the start" }],
  });
}
