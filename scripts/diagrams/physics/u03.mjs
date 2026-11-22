// Unit 3, Measurement, Experimental Physics and Uncertainty. Numbers are computed once here from the lesson's own data.
// Run: node scripts/diagrams/physics/u03.mjs
import { mk } from "./spec.mjs";

const r1 = (x, d = 1) => +x.toFixed(d);
const PI = 3.14159265;

// u03-01 Calibration: thermometer reading 1.5 °C in ice and 98.0 °C in boiling water
{
  const lo = 1.5, hi = 98.0, k = 100 / (hi - lo), read = 50.0, T = (read - lo) * k;
  mk("u03-01", "phys-u03-thermometer-calibration", "graph", {
    title: "Calibrating the thermometer",
    caption: `The thermometer reads ${lo} °C at the ice point and ${hi} °C at the steam point, so true temperatures are spread over ${r1(hi - lo)} instead of 100 scale divisions: a scale factor of 100/(${hi} − ${lo}) = ${r1(k, 4)}. A reading of ${read} °C therefore means a true ${r1(T)} °C.`,
    alt: `Straight line of true temperature against thermometer reading through (1.5, 0) and (98.0, 100); a reading of 50.0 degrees corresponds to a true ${r1(T)} degrees.`,
    description: [
      "Horizontal axis: what the thermometer reads; vertical axis: the true temperature, both in °C.",
      `Two fixed points anchor the calibration line: reading ${lo} ↔ true 0 °C (melting ice) and reading ${hi} ↔ true 100 °C (boiling water).`,
      `The slope is ${r1(k, 4)}, so true T = (reading − ${lo}) × ${r1(k, 4)}.`,
      `At a reading of ${read} °C the line gives ${r1(T)} °C, about ${r1(T - read, 1)} °C above the reading.`,
    ],
    range: { x: [0, 105], y: [0, 108] }, ticks: [[20, 40, 60, 80, 100], [20, 40, 60, 80, 100]], grid: [20, 20], height: [340, 320], xLabelBelow: true,
    axisLabels: ["thermometer reading / °C", "true temperature / °C"],
    curves: [{ expr: `${k}*(x-${lo})`, colour: "a1", domain: [lo, hi], label: "calibration line", labelAt: [64, 40] }],
    points: [{ x: lo, y: 0, label: "ice point", dx: 8, dy: -10 }, { x: hi, y: 100, label: "steam point", dx: -8, dy: 18, anchor: "end" }, { x: read, y: T, label: "50.0 → 50.3 °C", dx: -10, dy: -12, anchor: "end", colour: "a2" }],
    checks: [{ type: "point", expr: `${k}*(x-${lo})`, x: lo, y: 0, name: "a reading of 1.5 °C is 0 °C" }, { type: "point", expr: `${k}*(x-${lo})`, x: hi, y: 100, name: "a reading of 98.0 °C is 100 °C" }, { type: "point", expr: `${k}*(x-${lo})`, x: read, y: T, name: `a reading of 50.0 °C is ${r1(T, 2)} °C` }],
  });
}

// u03-03 Random and systematic errors: a zero error shifts the line but not the gradient
{
  const off = 3, k = 2;
  mk("u03-03", "phys-u03-zero-error-spring", "graph", {
    title: "A zero error shifts the line",
    caption: `Hooke's law predicts an extension through the origin (lower line). A line crossing the extension axis at ${off} mm (upper line) points to a constant systematic offset, a zero error such as measuring the length from the wrong point. The two lines are parallel, so the gradient (the stiffness) is unaffected. The gradient used here, ${k} mm per N, is only illustrative.`,
    alt: `Two parallel straight lines of extension against load: one through the origin and one crossing the extension axis at ${off} millimetres.`,
    description: [
      "Horizontal axis: the load in newtons; vertical axis: the measured extension in millimetres.",
      "The expected line e = kF passes through the origin.",
      `The measured line crosses the extension axis at ${off} mm: every reading is ${off} mm too large, a constant (systematic) offset.`,
      "The two lines have the same gradient, so a fit to the slope still gives the right stiffness, while the intercept reveals the error.",
    ],
    range: { x: [0, 5.2], y: [0, 14] }, ticks: [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10, 12]], grid: [1, 2], height: [340, 320], xLabelBelow: true,
    axisLabels: ["load / N", "extension / mm"],
    curves: [{ expr: `${k}*x`, colour: "a4", label: "expected: through origin", labelAt: [2.6, 3.4] }, { expr: `${off}+${k}*x`, colour: "a2", label: "measured: 3 mm offset", labelAt: [0.2, 9.2] }],
    points: [{ x: 0, y: off, label: "3 mm", dx: 10, dy: -8, colour: "a2" }],
    checks: [{ type: "point", expr: `${off}+${k}*x`, x: 0, y: off, name: "the measured line crosses the extension axis at 3 mm" }, { type: "slope", expr: `${off}+${k}*x`, x: 2, value: k, name: "the offset line has the same gradient as the true line" }, { type: "slope", expr: `${k}*x`, x: 2, value: k, name: "the expected line has gradient 2 mm per N" }],
  });
}

// u03-13 Calibration curves: thermistor interpolation
{
  const T1 = 20, R1 = 2.5, T2 = 25, R2 = 2.0, R = 2.2, slope = (R2 - R1) / (T2 - T1), T = T1 + (R1 - R) / -slope;
  mk("u03-13", "phys-u03-thermistor-interpolation", "graph", {
    title: "Reading a calibration line",
    caption: `Two calibration points, ${R1} kΩ at ${T1} °C and ${R2} kΩ at ${T2} °C, give a gradient of ${slope} kΩ per °C. A resistance of ${R} kΩ lies between them, so T = ${T1} + (${R1} − ${R})/${-slope} = ${T} °C. Interpolation is safe only inside the calibrated range.`,
    alt: `Straight calibration line of thermistor resistance against temperature through (20, 2.50) and (25, 2.00), with a reading of 2.20 kilohms read across to 23.0 degrees.`,
    description: [
      "Horizontal axis: temperature in °C; vertical axis: thermistor resistance in kΩ.",
      `The calibration line joins (${T1} °C, ${R1} kΩ) and (${T2} °C, ${R2} kΩ); its gradient is ${slope} kΩ per °C.`,
      `Reading across from R = ${R} kΩ to the line and down to the axis gives ${T} °C.`,
    ],
    range: { x: [18, 27], y: [1.7, 2.8] }, ticks: [[19, 20, 21, 22, 23, 24, 25, 26], [1.8, 2, 2.2, 2.4, 2.6]], grid: [1, 0.2], height: [340, 320], xLabelBelow: true,
    axisLabels: ["temperature / °C", "resistance / kΩ"],
    curves: [{ expr: `${R1}+(${slope})*(x-${T1})`, colour: "a1", domain: [T1, T2], label: "calibration", labelAt: [24, 2.3] }],
    marks: [{ y: R, label: "reading 2.20 kΩ", to: T }, { x: T, label: "23.0 °C", to: R }],
    points: [{ x: T1, y: R1, label: "20.0 °C, 2.50 kΩ", dx: 10, dy: -10 }, { x: T2, y: R2, label: "25.0 °C, 2.00 kΩ", dx: -10, dy: -14, anchor: "end" }, { x: T, y: R, colour: "a2" }],
    checks: [{ type: "slope", expr: `${R1}+(${slope})*(x-${T1})`, x: 22, value: -0.1, name: "the gradient is −0.10 kΩ per °C" }, { type: "point", expr: `${R1}+(${slope})*(x-${T1})`, x: T, y: R, name: "2.20 kΩ corresponds to 23.0 °C on the line" }],
  });
}

// u03-18 Hypothesis testing: g = 9.70 ± 0.04 against 9.81
{
  const g = 9.7, u = 0.04, ref = 9.81, z = (ref - g) / u, N = "exp(-x^2/2)/2.5066283";
  mk("u03-18", "phys-u03-z-test-g", "graph", {
    title: "Is 9.70 ± 0.04 consistent with 9.81?",
    caption: `The measured g is ${z} standard uncertainties from 9.81 m s⁻²: z = (${ref} − ${g})/${u} = ${z}. If 9.81 were right, chance alone would put the result this far away (in either direction) only about 0.6% of the time (the shaded tails), so at the 5% level the result is inconsistent: look for a systematic error.`,
    alt: "Standard normal curve with both tails beyond 2.75 standard deviations shaded; together they hold about 0.6 percent of the area.",
    description: [
      "Horizontal axis: z, the distance from the expected value in units of the standard uncertainty; the curve is the standard normal distribution.",
      `The measurement lies at z = (${ref} − ${g})/${u} = ${z}.`,
      "The two shaded tails, beyond z = ±2.75, together hold p ≈ 0.006 of the area (two-sided).",
      "p is below 0.05, so the difference is statistically significant: the measurement and 9.81 are inconsistent.",
    ],
    range: { x: [-4, 4], y: [0, 0.45] }, ticks: [[-3, -2, -1, 1, 2, 3], [0.1, 0.2, 0.3, 0.4]], grid: [1, 0.1], height: [340, 320], xLabelBelow: true,
    axisLabels: ["z (standard uncertainties from 9.81)", "probability density"],
    areas: [{ expr: N, from: z, to: 4, colour: "a2", opacity: 0.5 }, { expr: N, from: -4, to: -z, colour: "a2", opacity: 0.5 }],
    curves: [{ expr: N, colour: "a1", label: "if 9.81 is true", labelAt: [0.3, 0.38], anchor: "start" }],
    marks: [{ x: z, label: "z = 2.75", dx: 0, to: 0.12 }],
    checks: [{ type: "area", expr: N, from: z, to: 8, value: 0.003, tol: 0.0004, name: "the upper tail beyond z = 2.75 is about 0.3%" }, { type: "area", expr: N, from: -8, to: -z, value: 0.003, tol: 0.0004, name: "the lower tail beyond z = −2.75 is about 0.3% (p ≈ 0.006 in all)" }, { type: "area", expr: N, from: -8, to: 8, value: 1, tol: 0.003, name: "the distribution is normalised" }],
  });
}

// u03-20 Instrument response: thermocouple with tau = 0.5 s
{
  const tau = 0.5, t = tau * Math.log(100);
  mk("u03-20", "phys-u03-thermocouple-response", "graph", {
    title: "A thermocouple catching up",
    caption: `After a sudden temperature step a thermocouple with τ = ${tau} s closes the gap as 1 − e^{−t/τ}. It is within 1% when e^{−t/τ} = 0.01, that is t = τ ln 100 = 4.6τ = ${r1(t)} s. After one τ it has covered only 63%.`,
    alt: `Curve of the fraction of the final reading against time, rising to 63 percent at 0.5 seconds and reaching 99 percent at ${r1(t)} seconds.`,
    description: [
      `Horizontal axis: time since the step in seconds; vertical axis: the fraction of the new temperature that the thermocouple reads.`,
      `The curve is 1 − e^{−t/τ} with τ = ${tau} s: 63% at t = ${tau} s.`,
      `The reading is within 1% (0.99, dashed line) at t = τ ln 100 = ${r1(t, 2)} s ≈ ${r1(t)} s.`,
    ],
    range: { x: [0, 3.2], y: [0, 1.1] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [0.25, 0.5, 0.75, 1]], grid: [0.5, 0.25], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time / s", "fraction of the final reading"],
    curves: [{ expr: "1-exp(-x/0.5)", colour: "a1", label: "1 − e^{−t/τ}", labelAt: [1.3, 0.5] }],
    marks: [{ y: 0.99, label: "within 1%", to: t }],
    points: [{ x: tau, y: 1 - Math.exp(-1), label: "63% at τ", dx: 10, dy: 16 }, { x: t, y: 0.99, label: "t = 2.3 s", dx: 6, dy: 20, colour: "a2" }],
    checks: [{ type: "point", expr: "1-exp(-x/0.5)", x: tau, y: 1 - Math.exp(-1), name: "63% after one time constant" }, { type: "point", expr: "1-exp(-x/0.5)", x: t, y: 0.99, name: "within 1% at t = τ ln 100 = 2.3 s" }],
  });
}

// u03-25 Oscilloscope: 6 divisions peak to peak at 0.5 V/div, one cycle 4 divisions at 2 ms/div
{
  const vdiv = 0.5, tdiv = 2, vpp = 6 * vdiv, V0 = vpp / 2, T = 4 * tdiv, f = 1000 / T, rms = V0 / Math.sqrt(2);
  mk("u03-25", "phys-u03-oscilloscope-trace", "graph", {
    title: "Reading the oscilloscope trace",
    caption: `The trace spans 6 divisions at ${vdiv} V/div, so V_pp = ${vpp} V and V₀ = ${V0} V (V_rms = ${r1(rms, 2)} V). One cycle spans 4 divisions at ${tdiv} ms/div, so T = ${T} ms and f = ${f} Hz.`,
    alt: `Sine trace of amplitude ${V0} volts and period ${T} milliseconds on a grid of 0.5 volts and 2 milliseconds per division.`,
    description: [
      `Screen grid: one vertical division is ${vdiv} V and one horizontal division is ${tdiv} ms.`,
      `The trace goes ${V0} V above and below zero: 6 divisions peak to peak = ${vpp} V, so V₀ = ${V0} V and V_rms = V₀/√2 = ${r1(rms, 2)} V.`,
      `One full cycle covers 4 divisions: T = 4 × ${tdiv} = ${T} ms, so f = 1/T = ${f} Hz.`,
    ],
    range: { x: [0, 16], y: [-2, 2] }, ticks: [[2, 4, 6, 8, 10, 12, 14, 16], [-1.5, -1, -0.5, 0.5, 1, 1.5]], grid: [2, 0.5], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time / ms (2 ms per division)", "voltage / V (0.5 V per division)"],
    curves: [{ expr: `${V0}*sin(2*${PI}*x/${T})`, colour: "a1", label: "6 div p–p, 4 div per cycle", labelAt: [8.4, 1.75] }],
    points: [{ x: T / 4, y: V0, label: "V₀ = 1.5 V", dx: 10, dy: -4 }, { x: T, y: 0, label: "T = 8 ms", dx: -6, dy: -14, anchor: "end", colour: "a2" }],
    checks: [{ type: "max", expr: `${V0}*sin(2*${PI}*x/${T})`, domain: [0, 8], x: T / 4, y: V0, name: "the peak is 1.5 V (3.0 V peak to peak)" }, { type: "point", expr: `${V0}*sin(2*${PI}*x/${T})`, x: T, y: 0, name: "one cycle takes 8 ms (125 Hz)" }],
  });
}
