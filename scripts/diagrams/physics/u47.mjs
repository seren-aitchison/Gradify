// Unit 47, Acoustics, Vibrations and Engineering Physics. Numbers come from the lessons' worked examples.
// Run: node scripts/diagrams/physics/u47.mjs
import { mk } from "./spec.mjs";
const r = (x, d = 2) => +(+x).toFixed(d);

// u47-03 resonance: Q = 1000/5 = 200, ζ = 1/(2Q) = 0.0025; amplitude |H| = 1/√((1−r²)²+(2ζr)²), r = f/f₀
{ const f0 = 1000, bw = 5, Q = f0 / bw, z = r(1 / (2 * Q), 5), H = `1/sqrt((1-x^2)^2+(2*${z}*x)^2)`, hp = r(Q / Math.SQRT2, 1);
  const h = (x) => 1 / Math.sqrt((1 - x * x) ** 2 + (2 * z * x) ** 2), lo = 1 - z, hi = 1 + z;
  mk("u47-03", "phys-u47-resonance-peak", "graph", {
    title: "A sharp resonance: Q = 200",
    caption: `A resonator at ${f0} Hz with half-power bandwidth ${bw} Hz has Q = f₀/Δf = ${Q} and ζ = 1/(2Q) = ${z}. The response peaks at ${Q} times the static value, and falls to ${hp} (the half-power level, 1/√2 of the peak) at f₀ ± 2.5 Hz, which is r = 0.9975 and 1.0025.`,
    alt: "A very narrow tall resonance peak of height 200 at a frequency ratio of 1, with a dashed line at the half-power level 141 crossing the curve at 0.9975 and 1.0025.",
    description: [`Amplitude response against r = f/f₀ with ζ = ${z}.`, `Peak: 1/(2ζ) = ${Q} at r = 1.`, `Half-power level ${hp}; the curve crosses it at r ≈ ${r(lo, 4)} and ${r(hi, 4)}, a bandwidth of ${bw} Hz on ${f0} Hz.`, `Q = ${f0}/${bw} = ${Q}; ζ = ${z}.`],
    range: { x: [0.99, 1.01], y: [0, 220] }, ticks: [[0.99, 0.995, 1, 1.005, 1.01], [50, 100, 150, 200]], height: [320, 300], xLabelBelow: true, axisLabels: ["frequency ratio r = f/f₀", "amplitude ÷ static"],
    curves: [{ expr: H, colour: "a1" }], marks: [{ y: hp, label: `half power ${hp}` }],
    points: [{ x: 1, y: Q, colour: "a2", label: `Q = ${Q}`, dx: 10, dy: 4 }],
    checks: [{ type: "point", expr: H, x: 1, y: Q, name: `peak ${Q} = 1/(2ζ)` }, { type: "point", expr: H, x: r(lo, 4), y: r(h(r(lo, 4)), 3), name: "response at the lower half-power point", tol: 0.02 }, { type: "point", expr: H, x: r(hi, 4), y: r(h(r(hi, 4)), 3), name: "response at the upper half-power point", tol: 0.02 }],
  }); }

// u47-10 transmissibility with ζ ≈ 0: T = 1/|1 − r²|; 25 Hz machine on 5 Hz mounts, r = 5
{ const fm = 25, fn = 5, rr = fm / fn, T = 1 / (rr * rr - 1), rc = r(Math.SQRT2, 4);
  mk("u47-10", "phys-u47-transmissibility", "graph", {
    title: "Transmissibility of an undamped mount",
    caption: `With ζ ≈ 0 the transmissibility is T = 1/|1 − r²|. The machine at ${fm} Hz on mounts with f_n = ${fn} Hz has r = ${rr}, so T = 1/${rr * rr - 1} = ${r(T, 4)}: only ${r(T * 100, 1)}% of the force reaches the floor. Isolation (T < 1) begins only above r = √2 ≈ 1.41; near r = 1 the force is amplified without limit.`,
    alt: "Transmissibility against frequency ratio: very large near 1, crossing 1 at 1.41 and falling to 0.04 at a ratio of 5.",
    description: ["T = 1/|1 − r²| for an undamped isolator, r = f/f_n.", `At r = ${rr}: T = ${r(T, 4)}.`, `T = 1 at r = √2 ≈ ${rc}; below that the mount makes things worse.`, "At r = 1 the mount resonates and T is unbounded."],
    range: { x: [0, 6], y: [0, 3] }, ticks: [[1, 2, 3, 4, 5, 6], [1, 2, 3]], height: [320, 300], xLabelBelow: true, axisLabels: ["frequency ratio r = f/f_n", "transmissibility T"],
    curves: [{ expr: "1/abs(1-x^2)", colour: "a1" }], marks: [{ y: 1 }],
    points: [{ x: rc, y: 1, colour: "a4", label: "r = √2", dx: 8, dy: -12 }, { x: rr, y: r(T, 4), colour: "a2", label: `r = ${rr}, T = ${r(T, 3)}`, anchor: "end", dx: -8, dy: -12 }],
    checks: [{ type: "point", expr: "1/abs(1-x^2)", x: rr, y: r(T, 6), name: `T = 1/${rr * rr - 1} at r = ${rr}` }, { type: "point", expr: "1/abs(1-x^2)", x: rc, y: 1, name: "T = 1 at r = √2", tol: 0.01 }],
  }); }

// u47-18 reliability R = e^(−λt), λ = 1e-5 per hour; time axis in thousands of hours
{ const lam = 1e-5, R1000 = Math.exp(-lam * 1000), mttf = 1 / lam, E = `exp(-${lam * 1000}*x)`;
  mk("u47-18", "phys-u47-reliability", "graph", {
    title: "Exponential reliability",
    caption: `With a constant failure rate λ = 10⁻⁵ per hour, R(t) = e^(−λt). Over 1000 hours R = e^(−0.01) = ${r(R1000, 4)}; at t = MTTF = 1/λ = ${mttf} hours the reliability is e⁻¹ = ${r(Math.exp(-1), 3)}, so only 37% of components survive to the mean time to failure.`,
    alt: "Reliability falling exponentially from 1, with marked points of 0.990 at 1000 hours and 0.368 at 100 000 hours.",
    description: ["R(t) = exp(−λt) with λ = 10⁻⁵ h⁻¹; time in thousands of hours.", `t = 1000 h: R = ${r(R1000, 4)}.`, `t = 1/λ = ${mttf} h: R = ${r(Math.exp(-1), 4)}.`],
    range: { x: [0, 300], y: [0, 1.05] }, ticks: [[100, 200, 300], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["time (10³ hours)", "reliability R"],
    curves: [{ expr: E, colour: "a1" }],
    points: [{ x: 1, y: r(R1000, 4), colour: "a2", label: `${r(R1000, 3)} at 1000 h`, dx: 12, dy: 22 }, { x: mttf / 1000, y: r(Math.exp(-1), 4), colour: "a4", label: `MTTF: ${r(Math.exp(-1), 3)}`, dx: 10, dy: -12 }],
    checks: [{ type: "point", expr: E, x: 1, y: r(R1000, 6), name: `R(1000 h) = ${r(R1000, 4)}` }, { type: "point", expr: E, x: mttf / 1000, y: r(Math.exp(-1), 6), name: "R(MTTF) = 1/e" }],
  }); }
