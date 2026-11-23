// Unit 37, Quantum Information and Quantum Computing. Every number in a caption or claim is computed here once, from
// the lesson's own worked example. Run: node scripts/diagrams/physics/u37.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const PI = "3.14159265";

// u37-07 singlet correlations: quantum E(θ) = −cos θ against a classical (local) straight-line model
{ const Q = `-cos(x*${PI}/180)`, Cl = "-1+2*x/180", q45 = -Math.cos(Math.PI / 4);
  mk("u37-07", "phys-u37-bell-correlation", "graph", {
    title: "Quantum correlations beat any local model",
    caption: `For the singlet state the correlation between measurements at angle θ apart is E(θ) = −cos θ. A simple local hidden-variable model gives a straight line. At 45° the quantum correlation is ${r(q45, 3)} against −0.5, and four such settings give S = 4/√2 = 2√2 ≈ 2.83, beyond the local limit of 2.`,
    alt: "Correlation against the angle between analysers: the quantum curve minus cosine theta lies further from zero than the straight local-model line at 45 and 135 degrees.",
    description: ["Quantum (singlet): E(θ) = −cos θ.", "A local model with hidden variables: E(θ) = −1 + 2θ/180°.", `At 45°: quantum ${r(q45, 3)}, local −0.5. At 135°: +${r(-q45, 3)} against +0.5.`, "CHSH: S = |E(a,b) − E(a,b′) + E(a′,b) + E(a′,b′)| = 2√2 for the best angles; any local model gives at most 2."],
    range: { x: [0, 180], y: [-1.1, 1.1] }, ticks: [[45, 90, 135, 180], [-1, -0.5, 0.5, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["angle between measurements / °", "correlation E"],
    curves: [{ expr: Q, colour: "a1", label: "quantum: −cos θ", labelAt: [100, -0.55] }, { expr: Cl, colour: "a3", dash: "6 5", label: "a local model", labelAt: [120, 0.62], anchor: "end" }],
    marks: [{ x: 45, to: q45 }, { x: 135, to: -q45 }],
    checks: [{ type: "point", expr: Q, x: 45, y: r(q45, 8), name: "E(45°) = −1/√2" }, { type: "order", a: `abs(${Q})`, b: `abs(${Cl})`, x: 45, rel: ">", name: "quantum correlation stronger than the local model at 45°" }, { type: "point", expr: `4*cos(${PI}/4)+0*x`, x: 0, y: r(2 * Math.SQRT2, 8), name: "S = 2√2" }],
  }); }

// u37-11 search: classical N/2 queries against Grover's (π/4)√N, N = 10¹²
{ const N = 1e12, items = [{ key: "classical", value: r(Math.log10(N / 2), 2) }, { key: "Grover", value: r(Math.log10((Math.PI / 4) * Math.sqrt(N)), 2) }];
  mk("u37-11", "phys-u37-grover-speedup", "trend", {
    title: "Searching a trillion items",
    caption: `An unstructured search of N = 10¹² items takes about N/2 = 5 × 10¹¹ classical queries on average, but only about (π/4)√N ≈ ${r(((Math.PI / 4) * Math.sqrt(N)) / 1e5, 1)} × 10⁵ with Grover's algorithm: a quadratic speed-up, not an exponential one.`,
    alt: "Bar chart of the base-10 logarithm of the number of queries: 11.7 classical (5 times 10 to the 11) against 5.9 for Grover (7.9 times 10 to the 5).",
    description: [`Classical: N/2 = 5 × 10¹¹ queries.`, `Grover: (π/4)√(10¹²) = ${r((Math.PI / 4) * Math.sqrt(N), 0)} queries.`, "The ratio is about 6 × 10⁵: huge, but √N, not exponential."],
    kind: "bars", range: [0, 12], ticks: [0, 2, 4, 6, 8, 10, 12], yLabel: "log₁₀ (number of queries)", items, highlight: { Grover: "a2" },
    claims: [{ type: "max", key: "classical" }],
  }); }

// u37-13 Grover for N = 4: success probability sin²((2k + 1)θ), sin θ = 1/2
{ const th = Math.asin(0.5), P = (k) => r(Math.sin((2 * k + 1) * th) ** 2, 4), items = [0, 1, 2, 3].map((k) => ({ key: `${k} iteration${k === 1 ? "" : "s"}`, value: P(k) }));
  mk("u37-13", "phys-u37-grover-n4", "trend", {
    title: "Grover's algorithm for four items",
    caption: "With N = 4 and one marked item, sin θ = 1/2 so θ = 30°. Each iteration rotates the state by 2θ: after one, the angle is 90° and the marked item is found with certainty. Iterating further overshoots, and the probability falls back.",
    alt: "Bar chart of the probability of finding the marked item: 0.25 before any iteration, 1 after one, 0.25 after two and three.",
    description: ["P(k) = sin²((2k + 1)θ), θ = 30°.", `k = 0: ${P(0)}. k = 1: ${P(1)}. k = 2: ${P(2)}. k = 3: ${P(3)}.`, "So for N = 4 exactly one iteration is optimal; in general about (π/4)√N."],
    kind: "bars", range: [0, 1.1], ticks: [0, 0.25, 0.5, 0.75, 1], yLabel: "probability of finding the marked item", items, highlight: { "1 iteration": "a2" },
    claims: [{ type: "max", key: "1 iteration" }],
  }); }

// u37-16 energy relaxation: P(excited) = e^(−t/T₁), T₁ = 100 μs
{ const T1 = 100, P = `exp(-x/${T1})`, at = Math.exp(-0.2);
  mk("u37-16", "phys-u37-t1-decay", "graph", {
    title: "A qubit relaxing",
    caption: `An excited qubit decays to |0⟩ at random, so the chance it is still excited falls as e^(−t/T₁). With T₁ = ${T1} μs, after 20 μs that is e^(−0.2) ≈ ${r(at, 2)}; a 50 ns gate leaves room for about 2000 operations within T₁.`,
    alt: "Probability of the excited state against time, an exponential decay from 1, with 0.82 at 20 microseconds marked.",
    description: [`P = e^(−t/${T1} μs).`, `t = 20 μs: ${r(at, 3)}. t = 100 μs: ${r(Math.exp(-1), 3)}.`, "T₂ (dephasing) is usually shorter still and limits superpositions."],
    range: { x: [0, 300], y: [0, 1.05] }, ticks: [[50, 100, 150, 200, 250, 300], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / μs", "probability still excited"],
    curves: [{ expr: P, colour: "a1" }], marks: [{ x: 20, to: at }, { x: T1, to: Math.exp(-1), label: "T_{1}" }],
    points: [{ x: 20, y: r(at, 5), colour: "a2", label: `${r(at, 2)} at 20 μs`, dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: P, x: 20, y: r(at, 8), name: `${r(at, 3)} after 20 μs` }, { type: "point", expr: P, x: T1, y: r(Math.exp(-1), 8), name: "1/e at T₁" }],
  }); }
