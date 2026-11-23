// Unit 16, Electric Circuits. Every number in a caption or claim is computed here once. Run: node scripts/diagrams/physics/u16.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);

// u16-03 Ohm's law
{
  const V1 = 4.5, I1 = 0.3, R = V1 / I1, V2 = 9, I2 = V2 / R, ex = `x/${R}`;
  mk("u16-03", "phys-u16-ohm-iv", "graph", {
    title: "I–V line of a 15 Ω resistor",
    caption: `A resistor with ${V1} V across it and ${I1} A through it has R = V/I = ${f0(R)} Ω. Its I–V line is straight through the origin, with gradient 1/R = ${f3(1 / R)} A V⁻¹: doubling the voltage to ${V2} V doubles the current to ${f2(I2)} A. A steeper line would mean a smaller resistance.`,
    alt: `Graph of current against voltage: a straight line through the origin through (${V1} V, ${I1} A) and (${V2} V, ${f2(I2)} A).`,
    description: ["The horizontal axis is the voltage in volts; the vertical axis is the current in amperes.", `The measured point (${V1} V, ${I1} A) gives R = ${V1}/${I1} = ${f0(R)} Ω.`, `The line is I = V/${f0(R)}: through the origin, so I ∝ V (Ohm's law). At ${V2} V, I = ${V2}/${f0(R)} = ${f2(I2)} A.`],
    range: { x: [0, 10], y: [0, 0.7] }, ticks: [[2, 4, 6, 8, 10], [0.2, 0.4, 0.6]], grid: [2, 0.2], height: [320, 300], xLabelBelow: true, axisLabels: ["V / V", "I / A"],
    curves: [{ expr: ex, domain: [0, 10], colour: "a1", width: 3.4, label: "R = 15 Ω", labelAt: [6.2, 0.2] }],
    points: [{ x: V1, y: I1, label: "4.5 V, 0.30 A", dx: -8, dy: -14, anchor: "end" }, { x: V2, y: I2, colour: "a2", label: "9.0 V, 0.60 A", dx: -8, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: V1, y: I1, name: "the measured point lies on the line, R = 15 Ω" }, { type: "point", expr: ex, x: V2, y: I2, name: "at 9.0 V the current is 0.60 A" }, { type: "slope", expr: ex, x: 3, value: 1 / R, name: "gradient = 1/R" }],
  });
}

// u16-08 Internal resistance: the cell and the lamp
{
  const emf = 1.5, r = 0.5, RL = 2.5, I = emf / (RL + r), V = emf - I * r, term = `${emf}-${r}*x`, lamp = `${RL}*x`;
  mk("u16-08", "phys-u16-terminal-voltage", "graph", {
    title: "Terminal voltage of a cell with internal resistance",
    caption: `The cell's terminal voltage falls with the current drawn, V = ε − Ir = ${emf} − ${r}I. The 2.5 Ω lamp needs V = 2.5I. Where the two lines cross is the operating point: I = ${emf}/(2.5 + 0.5) = ${f1(I)} A and V = ${emf} − ${f1(I)} × ${r} = ${f2(V)} V. The 0.25 V missing from 1.5 V is the 'lost volts' across r.`,
    alt: `Graph of voltage against current: a falling line from 1.5 V at zero current and a rising line V = 2.5 I for the lamp, crossing at (${f1(I)} A, ${f2(V)} V).`,
    description: ["The horizontal axis is the current in amperes; the vertical axis is the voltage in volts.", `The cell's line V = ε − Ir starts at ε = ${emf} V with no current and falls by r = ${r} V for each ampere.`, `The lamp's line V = IR_L = 2.5 I rises through the origin.`, `They cross at I = ${f1(I)} A, V = ${f2(V)} V: the terminal voltage across the lamp. The gap ${f2(emf - V)} V is Ir inside the cell.`],
    range: { x: [0, 3.2], y: [0, 1.7] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [0.5, 1, 1.5]], grid: [0.5, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["I / A", "V / V"],
    curves: [{ expr: term, domain: [0, 3], colour: "a1", width: 3.4, label: "cell: ε − Ir", labelAt: [1.4, 0.95] }, { expr: lamp, domain: [0, 0.68], colour: "a2", width: 3.4, label: "lamp: IR", labelAt: [0.1, 1.5] }],
    points: [{ x: I, y: V, colour: "ink", label: `${f1(I)} A, ${f2(V)} V`, dx: 12, dy: -10 }],
    checks: [{ type: "intersect", a: term, b: lamp, x: I, y: V, name: `the cell and lamp lines meet at I = ${f1(I)} A, V = ${f2(V)} V` }, { type: "point", expr: term, x: 0, y: emf, name: "open-circuit terminal voltage = ε" }],
  });
}

// u16-11 Capacitor discharge: 470 μF through 10 kΩ from 9 V
{
  const C = 470e-6, R = 1e4, V0 = 9, tau = C * R, t = 10, V = V0 * Math.exp(-t / tau), ex = `${V0}*exp(-x/${tau})`;
  mk("u16-11", "phys-u16-rc-discharge", "graph", {
    title: "Discharging a 470 μF capacitor through 10 kΩ",
    caption: `V = V₀e^{−t/RC} with RC = ${f1(R / 1000)} kΩ × 470 μF = ${f1(tau)} s. After one time constant the voltage has fallen to 37% (${f2(V0 / Math.E)} V); after ${t} s, ${f2(t / tau)} time constants, V = 9e^{−${f2(t / tau)}} = ${f2(V)} V. The curve never reaches zero, and its steepness is greatest at the start.`,
    alt: `Graph of capacitor voltage against time: an exponential decay from 9 V with time constant ${f1(tau)} s, reaching ${f2(V)} V at ${t} s.`,
    description: ["The horizontal axis is time in seconds; the vertical axis is the capacitor voltage in volts.", `The voltage starts at ${V0} V and decays exponentially with τ = RC = ${f1(tau)} s.`, `At t = τ = ${f1(tau)} s, V = ${f2(V0 / Math.E)} V (37% of the start).`, `At t = ${t} s: V = ${f2(V)} V.`],
    range: { x: [0, 20], y: [0, 10] }, ticks: [[5, 10, 15, 20], [3, 6, 9]], grid: [5, 3], height: [320, 300], xLabelBelow: true, axisLabels: ["t / s", "V / V"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "V = V₀e^{−t/RC}", labelAt: [8, 6.2] }],
    points: [{ x: tau, y: V0 / Math.E, label: `τ = 4.7 s: ${f2(V0 / Math.E)} V`, dx: 10, dy: -10 }, { x: t, y: V, colour: "a2", label: `${f2(V)} V at 10 s`, dx: 10, dy: -12 }],
    checks: [{ type: "point", expr: ex, x: 0, y: V0, name: "starts at 9 V" }, { type: "point", expr: ex, x: tau, y: V0 / Math.E, name: "37% of V₀ after one time constant, τ = RC = 4.7 s" }, { type: "point", expr: ex, x: t, y: V, name: `V = 9e^{−10/4.7} = ${f2(V)} V at 10 s` }],
  });
}

// u16-12 RC low-pass filter, 1 kHz with 100 nF
{
  const C = 100e-9, fc = 1000, R = 1 / (2 * Math.PI * fc * C), ex = "1/sqrt(1+x*x)";
  mk("u16-12", "phys-u16-rc-lowpass", "graph", {
    title: "RC low-pass filter with f_c = 1 kHz",
    caption: `With C = 100 nF the cutoff frequency f_c = 1/(2πRC) = 1 kHz needs R = 1/(2π × 1000 × 10⁻⁷) = ${f2(R / 1000)} kΩ ≈ 1.6 kΩ. The output fraction |V_out/V_in| = 1/√(1 + (f/f_c)²) is ${f3(1 / Math.SQRT2)} (−3 dB) at f = f_c, close to 1 well below it and about f_c/f above it.`,
    alt: `Graph of output over input amplitude against frequency over cutoff frequency: it starts at 1, falls through ${f3(1 / Math.SQRT2)} at 1 and keeps falling.`,
    description: ["The horizontal axis is f/f_c; the vertical axis is the amplitude ratio |V_out/V_in|.", `At low frequency the capacitor passes nothing, so the output equals the input (ratio 1).`, `At f = f_c the ratio is 1/√2 = ${f3(1 / Math.SQRT2)}, the −3 dB point; R = ${f2(R / 1000)} kΩ for C = 100 nF.`, "At high frequency the ratio falls as f_c/f: high frequencies are blocked."],
    range: { x: [0, 5], y: [0, 1.1] }, ticks: [[1, 2, 3, 4, 5], [0.5, 1]], grid: [1, 0.5], height: [320, 300], xLabelBelow: true, axisLabels: ["f / f_{c}", "|V_{out}/V_{in}|"],
    marks: [{ y: 1 / Math.SQRT2, label: "0.707" }],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "low-pass", labelAt: [2.6, 0.55] }],
    points: [{ x: 1, y: 1 / Math.SQRT2, label: "f_{c}", dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: ex, x: 1, y: 1 / Math.SQRT2, name: "ratio 1/√2 at f = f_c" }, { type: "point", expr: ex, x: 0, y: 1, name: "ratio 1 at low frequency" }],
  });
}

// u16-13 RL circuit: current growth
{
  const L = 0.5, R = 10, emf = 12, tau = L / R, Imax = emf / R, t = 0.05, I = Imax * (1 - Math.exp(-1)), ex = `${Imax}*(1-exp(-x/${tau}))`;
  mk("u16-13", "phys-u16-rl-growth", "graph", {
    title: "Current growth in an RL circuit",
    caption: `With L = 0.5 H, R = 10 Ω and ε = 12 V, the time constant is τ = L/R = ${tau} s and the final current ε/R = ${Imax} A. The current rises as I = I_max(1 − e^{−t/τ}): after one τ (${t} s) it is ${Imax} × (1 − e⁻¹) = ${f2(I)} A, 63% of the way. The inductor opposes the change, so the current cannot jump.`,
    alt: `Graph of current against time: a rise from 0 towards ${Imax} A, reaching ${f2(I)} A at ${t} s.`,
    description: ["The horizontal axis is time in seconds; the vertical axis is the current in amperes.", `The current starts at 0 (the inductor opposes sudden change) and approaches ε/R = ${Imax} A.`, `τ = L/R = ${tau} s. At t = τ: I = ${Imax}(1 − e⁻¹) = ${f2(I)} A.`],
    range: { x: [0, 0.3], y: [0, 1.4] }, ticks: [[0.05, 0.1, 0.15, 0.2, 0.25, 0.3], [0.4, 0.8, 1.2]], grid: [0.05, 0.4], height: [320, 300], xLabelBelow: true, axisLabels: ["t / s", "I / A"],
    marks: [{ y: Imax, label: "I_{max} = 1.2 A" }],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "I(t)", labelAt: [0.13, 0.62] }],
    points: [{ x: t, y: I, label: `${f2(I)} A at τ`, dx: 10, dy: 16 }],
    checks: [{ type: "point", expr: ex, x: 0, y: 0, name: "I = 0 at t = 0" }, { type: "point", expr: ex, x: t, y: I, name: `I = 1.2(1 − e⁻¹) = ${f2(I)} A after τ = 0.05 s` }, { type: "slope", expr: ex, x: 0, value: emf / L, name: "initial rate of rise = ε/L = 24 A/s" }],
  });
}

// u16-15 Transient response: 10 V, 1 uF, 1 kOhm
{
  const V = 10, R = 1e3, C = 1e-6, tau = R * C * 1e3, I0 = (V / R) * 1e3, vc = `${V}*(1-exp(-x))`, ic = `${I0}*exp(-x)`, V1 = V * (1 - Math.exp(-1));
  mk("u16-15", "phys-u16-rc-step", "graph", {
    title: "Closing a switch on an uncharged capacitor",
    caption: `Just after closing, V_C = 0, so the whole 10 V is across the 1 kΩ and I = ${I0} mA. As the capacitor charges, V_C = 10(1 − e^{−t/τ}) rises and the current I = ${I0}e^{−t/τ} mA falls, with τ = RC = ${tau} ms. After a long time I = 0 and V_C = 10 V. At t = τ, V_C = ${f2(V1)} V and I = ${f2(I0 / Math.E)} mA.`,
    alt: `Graph with time in milliseconds: the capacitor voltage rising from 0 to 10 V and the current falling from ${I0} mA to 0, crossing at ${f2(V / 2)} at ${f2(Math.LN2)} ms.`,
    description: ["The horizontal axis is time in milliseconds; the vertical axis shows V_C in volts and I in milliamperes on the same numbers.", `Just after closing: V_C = 0, I = V/R = ${I0} mA.`, `The time constant is τ = RC = ${tau} ms; V_C = 10(1 − e^{−t/τ}) rises and I = 10e^{−t/τ} falls.`, "After a long time: I = 0 and V_C = 10 V."],
    range: { x: [0, 5], y: [0, 11] }, ticks: [[1, 2, 3, 4, 5], [2, 4, 6, 8, 10]], grid: [1, 2], height: [320, 300], xLabelBelow: true, axisLabels: ["t / ms", "V_{C} / V,  I / mA"],
    curves: [{ expr: vc, colour: "a1", width: 3.4, label: "V_{C}", labelAt: [3.2, 9.2] }, { expr: ic, colour: "a2", width: 3.4, label: "I", labelAt: [1.4, 4.2] }],
    points: [{ x: 0, y: I0, colour: "a2", label: "10 mA", dx: 10, dy: -8 }, { x: tau, y: V1, label: `${f2(V1)} V at τ`, dx: 10, dy: 18 }],
    checks: [{ type: "point", expr: ic, x: 0, y: I0, name: "I = V/R = 10 mA just after closing" }, { type: "point", expr: vc, x: 0, y: 0, name: "V_C = 0 just after closing" }, { type: "point", expr: vc, x: 20, y: V, name: "after a long time V_C = 10 V" }, { type: "value", expr: ic, x: 20, between: [0, 0.001], name: "after a long time I = 0" }, { type: "point", expr: vc, x: tau, y: V1, name: `V_C = ${f2(V1)} V at t = τ` }],
  });
}

// u16-16 AC mains: peak and period
{
  const Vrms = 230, V0 = Vrms * Math.SQRT2, f = 50, T = 1 / f, w = 2 * Math.PI * f * 1e-3, ex = `${V0}*sin(${w}*x)`;
  mk("u16-16", "phys-u16-mains-waveform", "graph", {
    title: "Mains voltage: peak and period",
    caption: `A 230 V rms supply swings between ±V₀ with V₀ = 230√2 = ${f0(V0)} V. At 50 Hz the period is T = 1/50 = ${T * 1000} ms, so the voltage completes a full cycle every ${T * 1000} ms and passes through zero twice in each. The rms value, 230 V, is lower than the peak because the voltage spends time near zero.`,
    alt: `Graph of mains voltage against time: a sine wave with peaks of ±${f0(V0)} V and a period of ${T * 1000} ms.`,
    description: ["The horizontal axis is time in milliseconds; the vertical axis is the voltage in volts.", `The voltage is V₀ sin(2πft) with V₀ = ${f0(V0)} V and f = 50 Hz.`, `It peaks at ${f0(V0)} V at 5 ms, is zero again at 10 ms, reaches −${f0(V0)} V at 15 ms and finishes the cycle at ${T * 1000} ms.`],
    range: { x: [0, 40], y: [-380, 380] }, ticks: [[10, 20, 30, 40], [-325, 0, 325]], grid: [10, 325], height: [320, 300], axisLabels: ["t / ms", "V / V"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "230 V rms", labelAt: [31, 180] }],
    arrows: [{ from: [0, -350], to: [T * 1000, -350], colour: "a2", both: true, label: `T = ${T * 1000} ms` }],
    checks: [{ type: "max", expr: ex, domain: [0, 10], x: 5, y: V0, name: `peak ${f0(V0)} V at a quarter of the period (5 ms)` }, { type: "point", expr: ex, x: T * 1000, y: 0, name: "back to zero after one period, 20 ms" }, { type: "point", expr: ex, x: 10, y: 0, name: "zero after half a period" }],
  });
}

// u16-17 RMS: the 46 ohm heater
{
  const Vrms = 230, R = 46, V0 = Vrms * Math.SQRT2, Irms = Vrms / R, I0 = Irms * Math.SQRT2, P = Vrms * Irms, pk = V0 * V0 / R, w = 2 * Math.PI * 50 * 1e-3, ex = `${pk}*sin(${w}*x)^2`;
  mk("u16-17", "phys-u16-heater-power", "graph", {
    title: "Power in a 46 Ω heater on 230 V rms",
    caption: `I_rms = 230/46 = ${Irms} A, the peak current is ${Irms} × √2 = ${f1(I0)} A, and the average power is V_rmsI_rms = ${P} W. The instantaneous power p = v²/R swings between 0 and ${pk} W, twice per cycle, and its average is exactly half the peak, ${pk / 2} W: that is why rms values work for power.`,
    alt: `Graph of instantaneous power against time: a curve that is never negative, between 0 and ${pk} watts, repeating every 10 ms, with its average at ${P} W.`,
    description: ["The horizontal axis is time in milliseconds; the vertical axis is the power in watts.", `p = v²/R = ${f0(V0)}² sin²(ωt)/${R} = ${pk} sin²(ωt) W: never negative, peaking at ${pk} W.`, `Its average over a cycle is half the peak: ${P} W = V_rms × I_rms = 230 V × ${Irms} A.`, `The peak current is ${f1(I0)} A.`],
    range: { x: [0, 40], y: [0, 2600] }, ticks: [[10, 20, 30, 40], [500, 1150, 2300]], grid: [10, 500], height: [320, 300], xLabelBelow: true, axisLabels: ["t / ms", "p / W"],
    marks: [{ y: P, label: "average 1150 W" }],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "p = v²/R", labelAt: [11, 2480] }],
    checks: [{ type: "area", expr: ex, from: 0, to: 20, value: P * 20, tol: 5, name: `average power over a cycle = ${P} W (area over one 20 ms period = ${P * 20} W ms)` }, { type: "max", expr: ex, domain: [0, 10], x: 5, y: pk, name: `peak power = V₀²/R = ${pk} W` }],
  });
}

// u16-18 / u16-19 Impedance and phasors
{
  const R = 30, XL = 80, XC = 40, Vs = 100, X = XL - XC, Z = Math.hypot(R, X), I = Vs / Z, phi = (Math.atan2(X, R) * 180) / Math.PI;
  mk("u16-18", "phys-u16-impedance-triangle", "vectors", {
    title: "Impedance of a series RLC circuit",
    caption: `Resistance R = ${R} Ω lies along the horizontal, the inductive reactance X_L = ${XL} Ω points up and X_C = ${XC} Ω points down, so the net reactance is X = ${X} Ω. Z = √(${R}² + ${X}²) = ${f0(Z)} Ω, the current is ${Vs}/${f0(Z)} = ${f0(I)} A, and the voltage leads the current by φ = ${f1(phi)}° (tan φ = ${X}/${R}).`,
    alt: `Phasor-style diagram: R = ${R} ohms to the right, X_L = ${XL} up and X_C = ${XC} down, with the resultant impedance ${f0(Z)} ohms at ${f1(phi)} degrees above R.`,
    description: [`R = ${R} Ω is drawn to the right.`, `X_L = ${XL} Ω is drawn up (voltage leads current in an inductor) and X_C = ${XC} Ω down (it lags).`, `Net reactance X = ${XL} − ${XC} = ${X} Ω up.`, `The resultant is Z = √(${R}² + ${X}²) = ${f0(Z)} Ω at φ = ${f1(phi)}° above R. I = ${Vs}/${f0(Z)} = ${f0(I)} A, lagging the voltage.`],
    mode: "add", units: "Ω",
    vectors: [{ label: "R", mag: R, angle: 0, text: `${R} Ω`, comps: [R, 0] }, { label: "X_{L}", mag: XL, angle: 90, colour: "a4", text: `${XL} Ω`, comps: [0, XL] }, { label: "X_{C}", mag: XC, angle: 270, colour: "a2", text: `${XC} Ω`, comps: [0, -XC] }],
    resultant: { label: "Z", mag: f0(Z) * 1, angle: +phi.toFixed(2), text: `${f0(Z)} Ω at ${f1(phi)}°` },
    claims: [{ type: "angleBetween", a: "R", b: "Z", value: +phi.toFixed(1), name: `tan φ = (X_L − X_C)/R gives φ = ${f1(phi)}°` }],
  });
}
{
  const VR = 6, VL = 12, VC = 4, X = VL - VC, Vs = Math.hypot(VR, X), phi = (Math.atan2(X, VR) * 180) / Math.PI;
  mk("u16-19", "phys-u16-series-phasors", "vectors", {
    title: "Phasor sum of the three series voltages",
    caption: `In a series circuit the current is common. V_R (${VR} V) is in phase with it, V_L (${VL} V) leads by 90° and V_C (${VC} V) lags by 90°, so V_L and V_C point opposite ways and partly cancel to ${X} V. The supply voltage is the vector sum: √(${VR}² + ${X}²) = ${f0(Vs)} V, ahead of the current by ${f1(phi)}°, not the plain sum 22 V.`,
    alt: `Phasor diagram: V_R = ${VR} V to the right, V_L = ${VL} V up and V_C = ${VC} V down, with the supply voltage ${f0(Vs)} V at ${f1(phi)} degrees above the current direction.`,
    description: [`V_R = ${VR} V is drawn along the reference direction (the current).`, `V_L = ${VL} V is drawn up, 90° ahead; V_C = ${VC} V is drawn down, 90° behind.`, `Their sum is ${VL} − ${VC} = ${X} V up.`, `Supply voltage = √(${VR}² + ${X}²) = ${f0(Vs)} V at ${f1(phi)}° ahead of the current.`],
    mode: "add", units: "V",
    vectors: [{ label: "V_{R}", mag: VR, angle: 0, text: `${VR} V`, comps: [VR, 0] }, { label: "V_{L}", mag: VL, angle: 90, colour: "a4", text: `${VL} V`, comps: [0, VL] }, { label: "V_{C}", mag: VC, angle: 270, colour: "a2", text: `${VC} V`, comps: [0, -VC] }],
    resultant: { label: "V_{s}", mag: Vs, angle: +phi.toFixed(2), text: `${f0(Vs)} V at ${f1(phi)}°` },
    claims: [{ type: "angleBetween", a: "V_{R}", b: "V_{s}", value: +phi.toFixed(1), name: `the supply leads the current by ${f1(phi)}°` }],
  });
}

// u16-26 Thevenin equivalent of a divider
{
  const V = 12, R1 = 4, R2 = 6, Vth = (V * R2) / (R1 + R2), Rth = (R1 * R2) / (R1 + R2), In = Vth / Rth, ex = `${Vth}-${Rth}*x`;
  mk("u16-26", "phys-u16-thevenin-load-line", "graph", {
    title: "Thevenin equivalent of a 12 V divider",
    caption: `A 12 V source with 4 Ω and 6 Ω in a divider, output across the 6 Ω: open-circuit voltage V_th = 12 × 6/10 = ${Vth} V, and R_th = 4 ∥ 6 = ${Rth} Ω (source shorted). Any load then sees V = V_th − I R_th: a straight line from ${Vth} V at no load to the short-circuit (Norton) current I_N = V_th/R_th = ${In} A at V = 0.`,
    alt: `Graph of output voltage against load current: a straight line from ${Vth} V at zero current to ${In} A at zero volts, gradient −${Rth} ohms.`,
    description: ["The horizontal axis is the current drawn by the load in amperes; the vertical axis is the output voltage in volts.", `With no load (I = 0) the output is the open-circuit voltage V_th = ${Vth} V.`, `The line falls by R_th = ${Rth} V per ampere: it is the Thevenin source's V = V_th − I R_th.`, `Shorting the output gives the Norton current ${In} A.`],
    range: { x: [0, 3.6], y: [0, 8.4] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3, 3.5], [2, 4, 6, 8]], grid: [1, 2], height: [320, 300], xLabelBelow: true, axisLabels: ["I / A", "V / V"],
    curves: [{ expr: ex, domain: [0, In], colour: "a1", width: 3.4, label: "V = V_{th} − IR_{th}", labelAt: [1.2, 5.6] }],
    points: [{ x: 0, y: Vth, label: "V_{th} = 7.2 V", dx: 10, dy: -8 }, { x: In, y: 0, colour: "a2", label: "I_{N} = 3 A", dx: -8, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: 0, y: Vth, name: "open-circuit voltage 12 × 6/10 = 7.2 V" }, { type: "point", expr: ex, x: In, y: 0, name: "short-circuit (Norton) current V_th/R_th = 3 A" }, { type: "slope", expr: ex, x: 1, value: -Rth, name: "R_th = 4 ∥ 6 = 2.4 Ω is the gradient" }],
  });
}
