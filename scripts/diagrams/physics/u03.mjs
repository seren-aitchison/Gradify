// Unit 3, Measurement, Experimental Physics and Uncertainty. Every number in a caption or claim is computed here once,
// from the lesson's own worked example. Run: node scripts/diagrams/physics/u03.mjs
import { mk } from "./spec.mjs";
import { lsq } from "../../../kit/diagrams/phys-renderers.js";

const r = (x, d = 2) => +x.toFixed(d);
const PI = "3.14159265";

// u03-01 two-point calibration of a thermometer (1.5 °C in ice, 98.0 °C in steam; reads 50.0 °C)
const ice = 1.5, steam = 98.0, read = 50.0, k = 100 / (steam - ice), Ttrue = (read - ice) * k, cal = `(x-${ice})*${k}`;
mk("u03-01", "phys-u03-two-point-calibration", "graph", {
  title: "A two-point calibration",
  caption: `The thermometer reads ${ice} °C in melting ice (true 0 °C) and ${steam} °C in boiling water (true 100 °C). The straight line through those two points converts any reading: ${read} °C read is ${r(Ttrue, 1)} °C true.`,
  alt: "Graph of true temperature against reading, a straight line through (1.5, 0) and (98.0, 100), with the reading 50.0 marked at a true value of 50.3.",
  description: [
    `Horizontal axis: the thermometer's reading. Vertical axis: the true temperature.`,
    `Fixed points: reading ${ice} at 0 °C (melting ice) and reading ${steam} at 100 °C (boiling water at 1 atm).`,
    `Scale factor = 100 / (${steam} − ${ice}) = ${r(k, 4)}.`,
    `A reading of ${read} gives T = (${read} − ${ice}) × ${r(k, 4)} = ${r(Ttrue, 2)} ≈ ${r(Ttrue, 1)} °C.`,
  ],
  range: { x: [0, 105], y: [0, 105] }, ticks: [[20, 40, 60, 80, 100], [20, 40, 60, 80, 100]], height: [340, 320], xLabelBelow: true,
  axisLabels: ["reading / °C", "true temperature / °C"],
  curves: [{ expr: cal, colour: "a1", domain: [ice, 104] }],
  marks: [{ x: read, to: Ttrue }, { y: Ttrue, to: read }],
  points: [{ x: ice, y: 0, colour: "a4" }, { x: steam, y: 100, colour: "a4", label: "fixed points (green)", anchor: "end", dx: -10, dy: 0 },
    { x: read, y: Ttrue, colour: "a2", label: `${r(Ttrue, 1)} °C`, dx: 10, dy: 12 }],
  checks: [{ type: "point", expr: cal, x: ice, y: 0, name: "the ice-point reading maps to 0 °C" }, { type: "point", expr: cal, x: steam, y: 100, name: "the steam-point reading maps to 100 °C" },
    { type: "point", expr: cal, x: read, y: r(Ttrue, 4), name: `a reading of ${read} is ${r(Ttrue, 2)} °C` }],
});

// u03-02 the dartboard picture in numbers: four sets of g from a pendulum (true 9.81)
const G = [["A", [9.80, 9.82, 9.81, 9.80, 9.82], "a4", true, true], ["B", [9.62, 9.64, 9.63, 9.65, 9.63], "a1", false, true],
  ["C", [9.55, 10.05, 9.70, 9.95, 9.85], "a3", true, false], ["D", [9.40, 9.95, 9.55, 9.75, 9.35], "a2", false, false]];
mk("u03-02", "phys-u03-accuracy-precision", "graph", {
  title: "Accuracy and precision",
  caption: "Four groups measure g five times each. A and C are accurate (means near 9.81 m s⁻²); A and B are precise (repeats close together). B's tight cluster is consistently low: a systematic error that more repeats cannot remove.",
  alt: "Dot plot of five measurements of g by each of four groups against a dashed true value of 9.81.",
  description: [
    "A: 9.80 to 9.82, mean 9.81: accurate and precise.",
    "B: 9.62 to 9.65, mean 9.63: precise but not accurate.",
    "C: 9.55 to 10.05, mean 9.82: accurate on average but not precise.",
    "D: 9.35 to 9.95, mean 9.60: neither.",
  ],
  range: { x: [0.4, 4.6], y: [9.2, 10.2] }, ticks: [[], [9.4, 9.6, 9.8, 10.0]], height: [340, 320], xLabelBelow: true,
  axisLabels: ["group A, B, C, D", "g / m s⁻² (dashed: 9.81)"], marks: [{ y: 9.81 }],
  points: G.flatMap(([, vs, colour], i) => vs.map((v, j) => ({ x: i + 1 + (j - 2) * 0.08, y: v, colour }))),
  checks: G.map(([who, values, , accurate, precise]) => ({ type: "stats", values, truth: 9.81, tolMean: 0.05, tolSd: 0.02, accurate, precise,
    name: `group ${who}: ${accurate ? "accurate" : "not accurate"}, ${precise ? "precise" : "not precise"}` })),
});

// u03-03 a zero error: Hooke's-law line offset by 3 mm
const hk = [[1, 7.1, 0.3], [2, 10.9, 0.3], [3, 15.2, 0.3], [4, 18.8, 0.3], [5, 23.1, 0.3]], hf = lsq(hk);
mk("u03-03", "phys-u03-zero-error", "fit", {
  title: "A systematic zero error",
  caption: `Extension against load should pass through the origin. This line crosses the extension axis at ${r(hf.c, 1)} mm: a constant offset, a zero error, perhaps from measuring length from the wrong point. The gradient, ${r(hf.m, 1)} mm N⁻¹, is unaffected.`,
  alt: "Five points of extension against load with error bars, the best-fit line meeting the extension axis at about 3 millimetres instead of zero.",
  description: [`Load 1 to 5 N; extensions ${hk.map((p) => p[1]).join(", ")} mm, each ± 0.3 mm.`, `Least-squares line: gradient ${r(hf.m, 2)} mm N⁻¹, intercept ${r(hf.c, 2)} mm.`,
    "Hooke's law predicts zero extension at zero load, so the intercept is a systematic error; it shifts every reading by the same amount and leaves the gradient unchanged."],
  points: hk, axisLabels: ["load / N", "extension / mm"], xr: [0, 5.5], yr: [0, 26],
  fit: { m: r(hf.m, 3), c: r(hf.c, 3), throughOrigin: false, withinErrors: true },
});

// u03-13 interpolating a thermistor calibration
const R1 = 2.5, R2 = 2.0, T1 = 20, T2 = 25, Rnow = 2.2, sl = (R2 - R1) / (T2 - T1), Tnow = T1 + (R1 - Rnow) / -sl, Rx = `${R1}+(${sl})*(x-${T1})`;
mk("u03-13", "phys-u03-thermistor-calibration", "graph", {
  title: "Reading a calibration curve",
  caption: `Between the calibration points ${R1.toFixed(2)} kΩ at ${T1.toFixed(1)} °C and ${R2.toFixed(2)} kΩ at ${T2.toFixed(1)} °C the curve is close to a straight line, with slope ${sl.toFixed(2)} kΩ per °C. A reading of ${Rnow.toFixed(2)} kΩ is ${Tnow.toFixed(1)} °C.`,
  alt: "Resistance against temperature: a falling straight segment between two calibration points, with the reading 2.20 kilohms traced across to 23.0 degrees.",
  description: [`Calibration points: (${T1.toFixed(1)} °C, ${R1.toFixed(2)} kΩ) and (${T2.toFixed(1)} °C, ${R2.toFixed(2)} kΩ).`, `Slope = (${R2.toFixed(2)} − ${R1.toFixed(2)}) / (${T2} − ${T1}) = ${sl.toFixed(2)} kΩ per °C.`,
    `Reading ${Rnow.toFixed(2)} kΩ: T = ${T1.toFixed(1)} + (${R1.toFixed(2)} − ${Rnow.toFixed(2)}) / 0.10 = ${Tnow.toFixed(1)} °C.`, "Over a wider range a thermistor is far from linear: ln R against 1/T is the curve to fit."],
  range: { x: [18, 27], y: [1.8, 2.7] }, ticks: [[18, 20, 22, 24, 26], [1.8, 2.0, 2.2, 2.4, 2.6]], height: [340, 320], xLabelBelow: true,
  axisLabels: ["temperature / °C", "resistance / kΩ"],
  curves: [{ expr: Rx, colour: "a1", domain: [T1, T2] }],
  marks: [{ y: Rnow, to: Tnow }, { x: Tnow, to: Rnow }],
  points: [{ x: T1, y: R1, colour: "a4", label: "calibration", dx: 10, dy: -12 }, { x: T2, y: R2, colour: "a4" }, { x: Tnow, y: Rnow, colour: "a2", label: `${Tnow.toFixed(1)} °C`, dx: 10, dy: -14 }],
  checks: [{ type: "point", expr: Rx, x: T2, y: R2, name: "the line passes through both calibration points" }, { type: "point", expr: Rx, x: Tnow, y: Rnow, name: `${Rnow} kΩ corresponds to ${Tnow.toFixed(1)} °C` },
    { type: "slope", expr: Rx, x: 22, value: sl, name: "slope −0.10 kΩ per °C" }],
});

// u03-14 linearising E = ½CV² by plotting E against V² (C = 470 μF)
const C = 470e-6, Vs = [2, 4, 6, 8, 10], noise = [0.03, -0.05, 0.08, -0.06, 0.05];
const lin = Vs.map((V, i) => [V * V, r(0.5 * C * V * V * 1000 + noise[i], 2), 0.15]), lf = lsq(lin);
mk("u03-14", "phys-u03-linearise-capacitor", "fit", {
  title: "Linearising E = ½CV²",
  caption: `Plotting E against V² turns the curve into a straight line through the origin. Its gradient is C/2 = ${r(lf.m, 3)} mJ V⁻², so C = 2 × gradient = ${Math.round(2 * lf.m * 1000)} μF.`,
  alt: "Five points of stored energy in millijoules against voltage squared, on a straight line through the origin.",
  description: [`V = ${Vs.join(", ")} V, so V² = ${lin.map((p) => p[0]).join(", ")} V².`, `E = ${lin.map((p) => p[1]).join(", ")} mJ.`,
    `Least-squares gradient ${r(lf.m, 4)} mJ V⁻², intercept ${r(lf.c, 2)} mJ, close to zero as the model predicts.`, `C = 2 × ${r(lf.m, 4)} mJ V⁻² = ${Math.round(2 * lf.m * 1000)} μF.`],
  points: lin, axisLabels: ["V² / V²", "E / mJ"], xr: [0, 108], yr: [0, 26],
  fit: { m: r(lf.m, 4), c: r(lf.c, 3), throughOrigin: true, withinErrors: true },
});

// u03-15 least squares through the origin: m = Σxy/Σx²
const P = [[1, 2.1], [2, 3.9], [3, 6.2]], Sxy = P.reduce((a, [x, y]) => a + x * y, 0), Sxx = P.reduce((a, [x]) => a + x * x, 0), m0 = Sxy / Sxx;
mk("u03-15", "phys-u03-least-squares-origin", "graph", {
  title: "A least-squares line through the origin",
  caption: `For y = mx the best gradient is m = Σxy / Σx² = ${r(Sxy, 1)} / ${Sxx} = ${r(m0, 2)}. It makes the sum of the squared vertical distances from the points to the line as small as possible.`,
  alt: "Three points, (1, 2.1), (2, 3.9) and (3, 6.2), with the line y = 2.04x through the origin and short vertical residual lines.",
  description: ["Points (1, 2.1), (2, 3.9) and (3, 6.2).", `Σxy = 2.1 + 7.8 + 18.6 = ${r(Sxy, 1)}; Σx² = 1 + 4 + 9 = ${Sxx}.`, `m = ${r(Sxy, 1)} / ${Sxx} = ${r(m0, 3)}.`,
    "The short vertical lines are the residuals: the line minimises the sum of their squares."],
  range: { x: [0, 3.5], y: [0, 7.5] }, ticks: [[1, 2, 3], [2, 4, 6]], height: [320, 300], xLabelBelow: true, axisLabels: ["x", "y"],
  curves: [{ expr: `${m0}*x`, colour: "a1", label: `y = ${r(m0, 2)}x`, labelAt: [0.3, 2.2] }],
  series: P.map(([x, y]) => ({ points: [[x, y], [x, m0 * x]], colour: "a2", width: 2 })),
  points: P.map(([x, y]) => ({ x, y, colour: "ink" })),
  checks: P.map(([x]) => ({ type: "point", expr: `${m0}*x`, x, y: r(m0 * x, 6), name: `the line at x = ${x}` })).concat([{ type: "slope", expr: `${m0}*x`, x: 1, value: r(Sxy / Sxx, 6), name: `gradient Σxy/Σx² = ${r(m0, 3)}` }]),
});

// u03-17 a U-shaped residual pattern: a straight line fitted to exponential cooling
const cool = [0, 10, 20, 30, 40, 50, 60].map((t) => [t, r(20 + 60 * Math.exp(-0.05 * t), 1)]), cf = lsq(cool);
const sign = cf.residuals.map((x) => (x > 0 ? "+" : "−")).join(" ");
mk("u03-17", "phys-u03-residual-pattern", "fit", {
  title: "Residuals that reveal the wrong model",
  caption: `A straight line fitted to a cooling curve leaves residuals that are positive at both ends and negative in the middle (${sign}). A systematic pattern like this says the model is wrong: the data follow T = T_room + ΔT e^(−kt).`,
  alt: "Temperature against time for a cooling object with a straight best-fit line, and a residual plot below showing a U shape.",
  description: [`Temperatures ${cool.map((p) => p[1]).join(", ")} °C at 10-minute intervals from 0 to 60 minutes.`, `Straight-line fit: gradient ${r(cf.m, 2)} °C per minute, intercept ${r(cf.c, 1)} °C.`,
    `Residuals in order: ${sign}. Random scatter would mix signs; a U shape means curvature the line cannot follow.`],
  points: cool, axisLabels: ["time / min", "temperature / °C"], xr: [0, 64], yr: [0, 90], residuals: true,
  fit: { m: r(cf.m, 3), c: r(cf.c, 2) },
});

// u03-18 testing g = 9.70 ± 0.04 against 9.81: z = 2.75
const z = (9.81 - 9.70) / 0.04, N = `exp(-x^2/2)/sqrt(2*${PI})`, tail = 0.00298;
mk("u03-18", "phys-u03-hypothesis-test", "graph", {
  title: "Is 9.70 ± 0.04 consistent with 9.81?",
  caption: `The difference is z = (9.81 − 9.70) / 0.04 = ${z.toFixed(2)} standard uncertainties. The two tails beyond ±${z.toFixed(2)}, too thin to see, hold p ≈ ${(2 * tail).toFixed(3)} of the distribution, far below 0.05, so the result is inconsistent: look for a systematic error.`,
  alt: "Standard normal curve with a line at z = 2.75 and dashed lines at ±1.96.",
  description: ["The curve is the standard normal distribution of z, the difference in units of the standard uncertainty.", "Dashed lines at ±1.96 mark the 5% two-sided threshold.",
    `The measurement sits at z = ${z.toFixed(2)}; the tails beyond ±${z.toFixed(2)} together hold p ≈ ${(2 * tail).toFixed(3)}.`, "Since p < 0.05, reject the hypothesis that the measurement agrees with 9.81 m s⁻²."],
  range: { x: [-4, 4], y: [0, 0.45] }, ticks: [[-3, -2, -1, 0, 1, 2, 3], [0.1, 0.2, 0.3, 0.4]], height: [320, 300], xLabelBelow: true, axisLabels: ["z", "probability density"],
  areas: [{ expr: N, from: z, to: 4, colour: "a2", opacity: 0.5 }, { expr: N, from: -4, to: -z, colour: "a2", opacity: 0.5 }],
  curves: [{ expr: N, colour: "a1" }],
  marks: [{ x: 1.96, to: 0.3, label: "1.96" }, { x: -1.96, to: 0.3, label: "−1.96" }, { x: z, to: 0.12, label: `z = ${z.toFixed(2)}` }],
  checks: [{ type: "area", expr: N, from: z, to: 12, value: tail, tol: 0.0002, name: `each tail beyond z = ${z.toFixed(2)} holds about ${tail}` },
    { type: "area", expr: N, from: -1.96, to: 1.96, value: 0.95, tol: 0.001, name: "±1.96 encloses 95%" }],
});

// u03-20 first-order response: within 1% after τ ln 100
const tau = 0.5, t99 = tau * Math.log(100), resp = `100*(1-exp(-x/${tau}))`;
mk("u03-20", "phys-u03-first-order-response", "graph", {
  title: "How fast a thermocouple responds",
  caption: `After a sudden change, a first-order sensor approaches the new value as 1 − e^(−t/τ). With τ = ${tau} s it reaches 63% after one τ and is within 1% after τ ln 100 = 4.6τ ≈ ${t99.toFixed(1)} s.`,
  alt: "Percentage of the final reading against time, rising steeply and levelling at 100%, with marks at 0.5 seconds (63%) and 2.3 seconds (99%).",
  description: [`Reading as a percentage of the step: 100(1 − e^(−t/τ)), τ = ${tau} s.`, `At t = τ = ${tau} s it is 63% of the way.`, `Within 1% when e^(−t/τ) = 0.01: t = τ ln 100 = ${t99.toFixed(2)} s.`],
  range: { x: [0, 3], y: [0, 105] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [25, 50, 75, 100]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "% of final reading"],
  curves: [{ expr: resp, colour: "a1" }],
  marks: [{ x: tau, to: 63.2 }, { x: t99, to: 99, label: "4.6τ" }, { y: 99 }],
  points: [{ x: tau, y: 63.2, colour: "a2", label: "63% at t = τ" }, { x: t99, y: 99, colour: "a2", label: "99%", dy: 16 }],
  checks: [{ type: "point", expr: resp, x: tau, y: r(100 * (1 - Math.exp(-1)), 4), name: "63.2% after one time constant" }, { type: "point", expr: resp, x: r(t99, 6), y: 99, name: `99% at τ ln 100 = ${t99.toFixed(2)} s` }],
});

// u03-25 reading an oscilloscope trace: 6 div p-p at 0.5 V/div, 4 div per cycle at 2 ms/div
const Vpp = 6 * 0.5, V0 = Vpp / 2, T = 4 * 2, f = 1000 / T, Vrms = V0 / Math.SQRT2, sine = `${V0}*sin(2*${PI}*x/${T})`;
mk("u03-25", "phys-u03-oscilloscope-trace", "graph", {
  title: "Reading an oscilloscope trace",
  caption: `6 divisions peak to peak at 0.5 V/div is V_pp = ${Vpp.toFixed(1)} V, so the amplitude is ${V0} V and V_rms = ${Vrms.toFixed(2)} V. One cycle spans 4 divisions at 2 ms/div: T = ${T} ms, f = ${f} Hz.`,
  alt: "A sine wave of amplitude 1.5 volts and period 8 milliseconds on a grid of 2 millisecond and 0.5 volt divisions.",
  description: ["Grid: 2 ms per division across, 0.5 V per division up.", `Peak to peak: 6 divisions = ${Vpp.toFixed(1)} V; amplitude ${V0} V; V_rms = ${V0}/√2 = ${Vrms.toFixed(2)} V.`, `One cycle: 4 divisions = ${T} ms, so f = 1/${T} ms = ${f} Hz.`],
  range: { x: [0, 16], y: [-2, 2] }, ticks: [[2, 4, 6, 8, 10, 12, 14, 16], [-1.5, -1, -0.5, 0.5, 1, 1.5]], grid: [2, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["time / ms", "voltage / V"],
  curves: [{ expr: sine, colour: "a1" }],
  arrows: [{ from: [T, 1.75], to: [2 * T, 1.75], both: true, colour: "a2", label: `T = ${T} ms`, labelAt: [1.5 * T, 1.9] }],
  marks: [{ y: V0 }, { y: -V0 }],
  checks: [{ type: "max", expr: sine, domain: [0, T], x: T / 4, y: V0, name: `amplitude ${V0} V at a quarter period` }, { type: "point", expr: sine, x: T, y: 0, name: `one cycle takes ${T} ms` }],
});

// u03-31 the damped pendulum model and its envelope
const A0 = 0.10, gam = 0.05, w = `2*${PI}/2`, damped = `${A0}*exp(-${gam}*x)*cos(${w}*x)`, env = `${A0}*exp(-${gam}*x)`;
mk("u03-31", "phys-u03-damped-model", "graph", {
  title: "The model to be validated: x = A e^(−γt) cos ωt",
  caption: `With A = ${A0} m, γ = ${gam} s⁻¹ and a 2 s period, the envelope A e^(−γt) falls to ${(A0 * Math.exp(-1)).toFixed(3)} m (1/e of A) at t = 1/γ = ${1 / gam} s. Fitting γ and ω from one run, then predicting a different run and measuring it, tests the model.`,
  alt: "Damped oscillation of displacement against time inside a dashed exponential envelope that falls from 0.10 metres.",
  description: [`Displacement x = ${A0} e^(−${gam}t) cos(πt) metres, period 2 s.`, `The dashed envelope ±${A0} e^(−${gam}t) bounds the swings.`, `At t = 1/γ = ${1 / gam} s the envelope is A/e = ${(A0 * Math.exp(-1)).toFixed(3)} m.`,
    "If γ depended on the amplitude, the model would fail: air drag proportional to v² would show up this way."],
  range: { x: [0, 40], y: [-0.11, 0.11] }, ticks: [[10, 20, 30, 40], [-0.1, -0.05, 0.05, 0.1]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "displacement / m"],
  curves: [{ expr: damped, colour: "a1", width: 1.8, samples: 1600 }, { expr: env, colour: "a2", dash: "6 5", width: 2 }, { expr: `-${env}`, colour: "a2", dash: "6 5", width: 2 }],
  marks: [{ x: 1 / gam, to: A0 * Math.exp(-1), label: "t = 1/γ" }],
  checks: [{ type: "point", expr: damped, x: 0, y: A0, name: `starts at A = ${A0} m` }, { type: "point", expr: env, x: 1 / gam, y: r(A0 * Math.exp(-1), 6), name: "the envelope is A/e at t = 1/γ" },
    { type: "point", expr: damped, x: 2, y: r(A0 * Math.exp(-gam * 2), 6), name: "back to a positive peak after one 2 s period" }],
});
