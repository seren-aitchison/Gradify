// Unit 1, Foundations of Physics: the worked example for physics unit batches. Every number in a caption or a claim is
// computed here once, from the lesson's own data. Run: node scripts/diagrams/physics/u01.mjs
import { mk } from "./spec.mjs";

const r1 = (x, d = 1) => +x.toFixed(d);

// u01-01 Scope and aims of physics: the scales of physics, Planck length to observable universe
const lengths = [["Planck length", 1.6e-35], ["proton", 1.7e-15], ["hydrogen atom", 1.1e-10], ["virus", 1e-7], ["person", 1.7], ["Earth", 1.27e7], ["Earth–Sun", 1.5e11], ["Milky Way", 1e21], ["observable universe", 8.8e26]];
const span = Math.log10(lengths.at(-1)[1] / lengths[0][1]);
mk("u01-01", "phys-u01-scales-of-length", "scale", {
  title: "The scales of physics",
  caption: `Lengths in physics run from the Planck length (~10⁻³⁵ m) to the observable universe (~10²⁷ m), about ${Math.round(span)} orders of magnitude. Each step on the scale is a factor of 10⁵. Quantum mechanics is needed at atomic scales and below; classical mechanics works for everyday sizes; general relativity takes over for strong gravity and the universe as a whole.`,
  alt: "A logarithmic length scale from 10^-36 to 10^28 metres with the Planck length, a proton, an atom, a virus, a person, the Earth, the Earth–Sun distance, the Milky Way and the observable universe marked, over bands for quantum, classical and cosmological physics.",
  description: [
    "A horizontal logarithmic scale of length in metres: each tick is 100 000 times the one before.",
    `Marked from smallest to largest: Planck length 1.6 × 10⁻³⁵ m, proton 1.7 × 10⁻¹⁵ m, hydrogen atom 1.1 × 10⁻¹⁰ m, virus 10⁻⁷ m, person 1.7 m, Earth 1.3 × 10⁷ m, Earth–Sun distance 1.5 × 10¹¹ m, Milky Way 10²¹ m, observable universe 8.8 × 10²⁶ m: about ${Math.round(span)} orders of magnitude.`,
    "Bands under the scale show the regime of each theory: quantum mechanics below about 10⁻⁸ m, classical mechanics for everyday sizes, general relativity and cosmology for astronomical sizes. The boundaries are rough: what decides is the situation, not only the size.",
  ],
  quantity: "length", units: "m", min: -36, max: 28,
  regions: [{ label: "quantum mechanics", from: 1e-36, to: 1e-8, colour: "a5" }, { label: "classical mechanics", from: 1e-8, to: 1e9, colour: "a4" }, { label: "general relativity, cosmology", from: 1e9, to: 1e28, colour: "a3" }],
  markers: lengths.map(([label, value]) => ({ label, value, ...(label === "proton" || label === "hydrogen atom" ? { region: "quantum mechanics" } : label === "person" ? { region: "classical mechanics" } : label === "observable universe" ? { region: "general relativity, cosmology" } : {}) })),
  claims: [{ type: "span", value: 60, tol: 2, name: "the markers span about 60 orders of magnitude (the lesson's figure)" }],
});

// u01-05 Unit conversions and prefixes: the 10^{3n} prefixes
const PRE = [["quecto", "q", -30], ["ronto", "r", -27], ["yocto", "y", -24], ["zepto", "z", -21], ["atto", "a", -18], ["femto", "f", -15], ["pico", "p", -12], ["nano", "n", -9], ["micro", "μ", -6], ["milli", "m", -3],
  ["kilo", "k", 3], ["mega", "M", 6], ["giga", "G", 9], ["tera", "T", 12], ["peta", "P", 15], ["exa", "E", 18], ["zetta", "Z", 21], ["yotta", "Y", 24], ["ronna", "R", 27], ["quetta", "Q", 30]];
mk("u01-05", "phys-u01-si-prefixes", "scale", {
  title: "SI prefixes: a step of 10³ each",
  caption: "The SI prefixes step by factors of 1000, from quecto (10⁻³⁰) to quetta (10³⁰). Moving one prefix along multiplies or divides by 10³, so 1 km = 10³ m and 1 μm = 10⁻⁶ m. Centi, deci and hecto break the pattern and are left off.",
  alt: "A logarithmic scale from 10^-30 to 10^30 with each SI prefix from quecto to quetta marked at its power of ten.",
  description: [
    "A logarithmic scale of the multiplying factor, from 10⁻³⁰ to 10³⁰.",
    "Below 1: milli 10⁻³, micro 10⁻⁶, nano 10⁻⁹, pico 10⁻¹², femto 10⁻¹⁵, atto 10⁻¹⁸, zepto 10⁻²¹, yocto 10⁻²⁴, ronto 10⁻²⁷, quecto 10⁻³⁰.",
    "Above 1: kilo 10³, mega 10⁶, giga 10⁹, tera 10¹², peta 10¹⁵, exa 10¹⁸, zetta 10²¹, yotta 10²⁴, ronna 10²⁷, quetta 10³⁰.",
    "Each prefix is 1000 times the one before it.",
  ],
  kind: "prefix", quantity: "factor", min: -30, max: 30,
  markers: PRE.map(([n, s, e]) => ({ label: `${n} (${s})`, prefix: n, value: 10 ** e })),
});

// u01-06 Scalar and vector quantities: the boat crossing the river
const vb = 4.0, vr = 3.0, v = Math.hypot(vb, vr), phi = (Math.atan2(vr, vb) * 180) / Math.PI;
mk("u01-06", "phys-u01-boat-velocity", "vectors", {
  title: "Adding perpendicular velocities",
  caption: `The boat heads north at ${vb.toFixed(1)} m s⁻¹ while the river carries it east at ${vr.toFixed(1)} m s⁻¹. Placed tip to tail, the two velocities give the velocity over the ground: ${v.toFixed(1)} m s⁻¹ at ${Math.round(phi)}° east of north, not 7 m s⁻¹, because vectors add by direction as well as size.`,
  alt: `Vector triangle: a north arrow of 4.0 m/s, an east arrow of 3.0 m/s from its tip, and the resultant of 5.0 m/s from the start to the end, ${Math.round(phi)} degrees east of north.`,
  description: [
    `The boat's own velocity, ${vb.toFixed(1)} m s⁻¹ north, is drawn up the page from the starting point.`,
    `The river's velocity, ${vr.toFixed(1)} m s⁻¹ east, is drawn from the tip of the first arrow, to the right.`,
    `The resultant runs from the start of the first arrow to the tip of the second: |v| = √(4.0² + 3.0²) = ${v.toFixed(1)} m s⁻¹.`,
    `Its direction: tan φ = 3.0/4.0, so φ = ${Math.round(phi)}° east of north.`,
  ],
  mode: "add", units: "m s^{-1}", compass: true,
  vectors: [{ label: "v_{boat}", mag: vb, angle: 90, text: `${vb.toFixed(1)} m s^{-1}, north`, comps: [0, vb] }, { label: "v_{river}", mag: vr, angle: 0, text: `${vr.toFixed(1)} m s^{-1}, east`, colour: "a4", comps: [vr, 0] }],
  resultant: { label: "v", mag: r1(v), angle: r1(90 - phi, 2), text: `${v.toFixed(1)} m s^{-1}, ${Math.round(phi)}° east of north` },
  notes: [`|v| = √(4.0^{2} + 3.0^{2}) = ${v.toFixed(1)} m s^{-1}`, `tan φ = 3.0/4.0, φ = ${Math.round(phi)}° east of north`],
  claims: [{ type: "angleBetween", a: "v_{boat}", b: "v", value: r1(phi, 1), name: `the resultant is ${r1(phi)}° east of north` }],
});

// u01-11 Idealisation: when can air resistance on a falling tennis ball be neglected?
const rho = 1.2, Cd = 0.5, A = 0.0034, m = 0.06, g = 9.81, W = m * g, drag = (u) => 0.5 * rho * Cd * A * u * u;
for (const u of [5, 30]) {
  const D = drag(u), ratio = D / W, net = W - D, slow = u === 5;
  mk("u01-11", `phys-u01-tennis-ball-${u}`, "vectors", {
    title: `Tennis ball falling at ${u} m s⁻¹`,
    caption: slow
      ? `At ${u} m s⁻¹ the drag on a ${m} kg tennis ball is ${D.toFixed(3)} N against a weight of ${W.toFixed(2)} N: a ratio of about ${Math.round(ratio * 100)}%. Neglecting air resistance is a controlled approximation here, fine for a rough model.`
      : `At ${u} m s⁻¹ the same ball's drag, ${D.toFixed(2)} N, is bigger than its ${W.toFixed(2)} N weight (ratio ${ratio.toFixed(1)}): drag grows as v², so the idealisation that worked at 5 m s⁻¹ fails completely here, and the ball slows down.`,
    alt: `Free-body diagram of a falling tennis ball: weight ${W.toFixed(2)} N down and drag ${D.toFixed(slow ? 3 : 2)} N up.`,
    description: [
      `The ball is shown as a box. Its weight, mg = ${m} × ${g} = ${W.toFixed(2)} N, acts straight down.`,
      `Drag acts upward, against the motion: ½ρC_dAv² = ½ × ${rho} × ${Cd} × ${A} × ${u}² = ${D.toFixed(slow ? 3 : 2)} N, drawn to the same scale.`,
      `Drag ÷ weight = ${slow ? `${(ratio * 100).toFixed(1)}%` : ratio.toFixed(2)}; the net force is ${Math.abs(net).toFixed(2)} N ${net > 0 ? "downward" : "upward"}.`,
    ],
    mode: "body", units: "N", showResultant: true,
    vectors: [{ label: "mg", mag: r1(W, 4), angle: 270, source: "Earth's gravity", text: `${W.toFixed(2)} N, down` }, { label: "drag", mag: r1(D, 4), angle: 90, colour: "a2", source: "air resistance, opposing the motion", text: `${D.toFixed(slow ? 3 : 2)} N, up` }],
    resultant: { label: "net force", mag: r1(Math.abs(net), 4), angle: net > 0 ? 270 : 90, text: `${Math.abs(net).toFixed(2)} N, ${net > 0 ? "down" : "up"}` },
    notes: [slow ? `drag ÷ weight ≈ ${Math.round(ratio * 100)}%: neglect it for a rough model` : `drag ÷ weight ≈ ${ratio.toFixed(1)}: drag cannot be neglected`],
    claims: [{ type: "ratio", a: "drag", b: "mg", value: r1(ratio, 3), name: `drag ÷ weight = ${r1(ratio, 3)} from ½ρC_dAv² and mg` }],
  });
}

// u01-12 Deterministic and probabilistic models: 10 nuclei against the smooth exponential
let seed = 7; const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const N0 = 10, dt = 0.02, p = 1 - Math.exp(-Math.LN2 * dt); let n = N0; const steps = [[0, 1]];
for (let t = dt; t <= 4 + 1e-9; t += dt) { let k = 0; for (let i = 0; i < n; i++) if (rnd() < p) k++; if (k) { steps.push([r1(t, 2), n / N0]); n -= k; steps.push([r1(t, 2), n / N0]); } }
steps.push([4, n / N0]);
mk("u01-12", "phys-u01-decay-fluctuations", "graph", {
  title: "Ten nuclei against the exponential law",
  caption: `N = N₀e^{−λt} is exact for a huge sample: with 10²⁰ nuclei the relative fluctuations are only 1/√N ≈ 10⁻¹⁰. A sample of just 10 nuclei (one random run, drawn as steps) wanders around the curve by about 1/√10 ≈ 30%: each decay is random, and only the average is predictable.`,
  alt: "Graph of the fraction of nuclei remaining against time in half-lives: a smooth exponential curve halving every half-life, and a jagged step line for a sample of ten nuclei that drops one or two nuclei at a time.",
  description: [
    "The horizontal axis is time in half-lives, from 0 to 4; the vertical axis is the fraction of nuclei left, N/N₀.",
    "The smooth curve is N/N₀ = e^{−λt}: 0.5 after one half-life, 0.25 after two, 0.125 after three.",
    "The step line is one simulated sample of 10 nuclei. It drops by 0.1 each time a nucleus decays, at random moments, and strays visibly from the curve.",
    "For large N the steps become too small to see and the sample follows the curve: the model is deterministic for large samples and probabilistic for single nuclei.",
  ],
  range: { x: [0, 4.2], y: [0, 1.08] }, ticks: [[1, 2, 3, 4], [0.25, 0.5, 0.75, 1]], grid: [1, 0.25], height: [340, 320], xLabelBelow: true,
  axisLabels: ["time / half-lives", "N/N₀"],
  curves: [{ expr: "exp(-0.693147*x)", colour: "a1", label: "N₀e^{−λt} (large N)", labelAt: [2.05, 0.36] }],
  series: [{ points: steps, colour: "a2", width: 2.2, label: "10 nuclei", labelAt: [1.72, 0.16] }],
  points: [{ x: 1, y: 0.5, label: "half-life", dx: 10, dy: -10 }],
  checks: [{ type: "point", expr: "exp(-0.693147*x)", x: 1, y: 0.5, name: "the curve halves after one half-life" }, { type: "point", expr: "exp(-0.693147*x)", x: 3, y: 0.125, name: "one eighth is left after three half-lives" }],
});

// u01-13 Conservation laws: the trolley collision
const m1 = 2.0, u1 = 3.0, m2 = 1.0, vf = (m1 * u1) / (m1 + m2), KE0 = 0.5 * m1 * u1 ** 2, KE1 = 0.5 * (m1 + m2) * vf ** 2;
mk("u01-13", "phys-u01-collision-energy", "sankey", {
  title: "Where the kinetic energy goes when trolleys stick",
  caption: `Momentum is conserved (${m1} × ${u1} = ${m1 + m2} × ${vf}), so the joined trolleys move at ${vf.toFixed(1)} m s⁻¹. Energy is conserved too, but not as kinetic energy: of the ${KE0.toFixed(1)} J before, ${KE1.toFixed(1)} J is still kinetic and ${(KE0 - KE1).toFixed(1)} J becomes heat and sound.`,
  alt: `Energy flow diagram: ${KE0.toFixed(1)} J of kinetic energy before the collision splits into ${KE1.toFixed(1)} J of kinetic energy after and ${(KE0 - KE1).toFixed(1)} J of heat and sound.`,
  description: [
    `Before: a ${m1} kg trolley at ${u1} m s⁻¹ has kinetic energy ½ × ${m1} × ${u1}² = ${KE0.toFixed(1)} J; the ${m2} kg trolley is at rest.`,
    `Momentum: ${m1} × ${u1} = ${(m1 + m2).toFixed(1)} v, so v = ${vf.toFixed(1)} m s⁻¹ after they stick.`,
    `After: ½ × ${m1 + m2} × ${vf}² = ${KE1.toFixed(1)} J of kinetic energy, the band that carries straight on.`,
    `The other ${(KE0 - KE1).toFixed(1)} J turns down as heat and sound. The widths add up: energy is conserved even though kinetic energy is not.`,
  ],
  units: "J", input: { label: "kinetic energy before", value: KE0 },
  outputs: [{ label: "kinetic energy after", value: KE1, useful: true }, { label: "heat and sound", value: KE0 - KE1 }],
});
