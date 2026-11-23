// Unit 6, Oscillations and Vibrations. Numbers are computed once here from the lesson's own data.
// Run: node scripts/diagrams/physics/u06.mjs
import { mk } from "./spec.mjs";

const r1 = (x, d = 1) => +x.toFixed(d);
const PI = 3.14159265;

// u06-02 Simple harmonic motion: A = 0.05 m at 2.0 Hz
{
  const A = 0.05, f = 2.0, w = 2 * PI * f, vmax = A * w, amax = A * w * w, Acm = A * 100;
  mk("u06-02", "phys-u06-shm-displacement", "graph", {
    title: "SHM with A = 5 cm at 2.0 Hz",
    caption: `x = ${Acm} cos ωt with ω = 2π × ${f} = ${r1(w, 1)} rad s⁻¹ and period ${1 / f} s. The gradient of x–t is the velocity: steepest where x = 0, where its size is v_max = Aω = ${r1(vmax, 2)} m s⁻¹ (${r1(vmax * 100, 1)} cm s⁻¹). The curvature at the peaks gives a_max = Aω² = ${r1(amax, 1)} m s⁻².`,
    alt: `Cosine graph of displacement in centimetres against time, amplitude 5 centimetres, period 0.5 seconds, with the steepest tangent at the zero crossings.`,
    description: [
      "Displacement x in centimetres against time in seconds for two periods.",
      `Amplitude ${Acm} cm; period T = 1/f = ${1 / f} s, so ω = 2πf = ${r1(w, 1)} rad s⁻¹.`,
      `At the zero crossings (t = ${1 / f / 4} s) the gradient is steepest, ${r1(vmax * 100, 1)} cm s⁻¹ = ${r1(vmax, 2)} m s⁻¹ = Aω: the maximum speed.`,
      `At the turning points the curve bends most: a_max = Aω² = ${r1(amax, 1)} m s⁻².`,
    ],
    range: { x: [0, 1.05], y: [-6.5, 6.5] }, ticks: [[0.25, 0.5, 0.75, 1], [-5, -2.5, 2.5, 5]], grid: [0.25, 2.5], height: [340, 300], xLabelBelow: true,
    axisLabels: ["time / s", "displacement x / cm"],
    curves: [{ expr: `${Acm}*cos(${w}*x)`, colour: "a1", label: "x = A cos ωt", labelAt: [0.55, 5.9] }],
    points: [{ x: 0.125, y: 0, label: "steepest: v_max", dx: 8, dy: -12 }, { x: 0, y: Acm, label: "A = 5 cm", dx: 10, dy: 6 }],
    checks: [{ type: "max", expr: `${Acm}*cos(${w}*x)`, domain: [0, 0.4], x: 0, y: Acm, name: "the amplitude is 5 cm" }, { type: "point", expr: `${Acm}*cos(${w}*x)`, x: 0.5, y: Acm, name: "the period is 0.50 s (2.0 Hz)" }, { type: "slope", expr: `${Acm}*cos(${w}*x)`, x: 0.125, value: -r1(vmax * 100, 2), name: "the steepest gradient is v_max = 62.8 cm/s = 0.63 m/s" }, { type: "slope", expr: `-${Acm * w}*sin(${w}*x)`, x: 0, value: -r1(amax * 100, 1), name: "the gradient of v at t = 0 gives a_max = 7.9 m/s² (790 cm/s²)" }],
  });
}

// u06-03 Phase: two pendulums of period 2.0 s, 0.5 s apart
{
  const T = 2.0, dt = 0.5, dphi = 2 * PI * dt / T;
  mk("u06-03", "phys-u06-phase-difference", "graph", {
    title: "Two pendulums a quarter-cycle apart",
    caption: `Both pendulums have period ${T} s and pass equilibrium moving right ${dt} s apart. The time shift of ${dt} s is ${dt / T} of a period, so the phase difference is Δφ = 2π × ${dt}/${T} = π/2 (90°): the second pendulum lags the first by a quarter of a cycle.`,
    alt: `Two sine curves of period 2 seconds, the second shifted ${dt} seconds to the right of the first, a quarter of a period.`,
    description: [
      `Displacement against time for two pendulums of period ${T} s; each crosses zero going upward once per cycle.`,
      "Pendulum 1 crosses at t = 0 (and every 2 s); pendulum 2 crosses at t = 0.5 s (and every 2 s).",
      `The shift ${dt} s is ${dt / T} of the period, so Δφ = ${dt / T} × 2π = π/2 = 90°.`,
    ],
    range: { x: [0, 4.2], y: [-1.5, 1.6] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], [-1, -0.5, 0.5, 1]], grid: [0.5, 0.5], height: [340, 300], xLabelBelow: true,
    axisLabels: ["time / s", "displacement (relative)"],
    curves: [{ expr: `sin(${PI}*x)`, colour: "a1", label: "pendulum 1", labelAt: [0.1, 1.28] }, { expr: `sin(${PI}*(x-${dt}))`, colour: "a2", label: "pendulum 2", labelAt: [0.9, -1.25] }],
    points: [{ x: 0, y: 0, colour: "a1" }, { x: dt, y: 0, label: "0.5 s later", dx: 8, dy: 22, colour: "a2" }],
    checks: [{ type: "point", expr: `sin(${PI}*x)`, x: 0, y: 0, name: "pendulum 1 is at equilibrium at t = 0" }, { type: "slope", expr: `sin(${PI}*x)`, x: 0, value: PI, name: "pendulum 1 is moving right (positive gradient)" }, { type: "point", expr: `sin(${PI}*(x-${dt}))`, x: dt, y: 0, name: "pendulum 2 is at equilibrium 0.5 s later" }, { type: "point", expr: `sin(${PI}*x)`, x: T, y: 0, name: "the period is 2.0 s" }, { type: "value", expr: `360*${dt}/${T}`, x: 0, between: [89.9, 90.1], name: "Δφ = 360° × 0.5/2.0 = 90°" }],
  });
}

// u06-06 Energy in SHM: 0.5 kg on a k = 200 N/m spring, A = 0.1 m
{
  const k = 200, m = 0.5, A = 0.1, E = 0.5 * k * A * A, x = 0.06, PE = 0.5 * k * x * x, KE = E - PE, v = Math.sqrt((2 * KE) / m);
  mk("u06-06", "phys-u06-spring-energy", "graph", {
    title: "Energy of the spring oscillator",
    caption: `The potential energy ½kx² is a parabola; the total E = ½kA² = ${E} J is constant, so the kinetic energy is the gap between them. At x = ${x} m: PE = ${PE} J, KE = ${r1(KE, 2)} J, so v = √(2 × ${r1(KE, 2)}/${m}) = ${r1(v, 1)} m s⁻¹. All the energy is kinetic at x = 0 and potential at x = ±A.`,
    alt: `Parabola of potential energy against displacement from −0.1 to 0.1 metres under a horizontal line at 1.0 joule; at x = 0.06 metres the gap between them is 0.64 joules of kinetic energy.`,
    description: [
      `Horizontal axis: displacement x in metres; vertical axis: energy in joules. k = ${k} N m⁻¹, A = ${A} m.`,
      `Potential energy ½kx² = ${k / 2}x² is the parabola; it reaches the total ${E} J at x = ±${A} m, the turning points.`,
      `The horizontal line is the constant total energy E = ½kA² = ${E} J.`,
      `At x = ${x} m, PE = ${PE} J, so KE = ${r1(KE, 2)} J and v = ${r1(v, 1)} m s⁻¹.`,
    ],
    range: { x: [-0.115, 0.115], y: [0, 1.25] }, ticks: [[-0.1, -0.05, 0.05, 0.1], [0.25, 0.5, 0.75, 1]], grid: [0.05, 0.25], height: [340, 320], xLabelBelow: true,
    axisLabels: ["displacement x / m", "energy / J"],
    curves: [{ expr: `${k / 2}*x^2`, colour: "a1", label: "PE = ½kx²", labelAt: [0.012, 0.18] }, { expr: `${E}`, colour: "ink", dash: "6 5", width: 2, label: "E = 1.0 J", labelAt: [-0.11, 1.12] }],
    points: [{ x: x, y: PE, label: "PE 0.36 J", dx: 10, dy: 6 }, { x: x, y: E, label: "KE 0.64 J", dx: 10, dy: -14, colour: "a2" }],
    arrows: [{ from: [x, PE], to: [x, E], colour: "a2" }],
    checks: [{ type: "point", expr: `${k / 2}*x^2`, x: A, y: E, name: "the potential energy equals E = 1.0 J at x = A = 0.1 m" }, { type: "point", expr: `${k / 2}*x^2`, x, y: PE, name: "PE at x = 0.06 m is 0.36 J" }, { type: "value", expr: `${E}-${k / 2}*x^2`, x, between: [0.639, 0.641], name: "KE at x = 0.06 m is 0.64 J" }, { type: "value", expr: `sqrt(2*0.64/${m})`, x: 0, between: [1.59, 1.61], name: "v = 1.6 m/s" }],
  });
}

// u06-07 Damped oscillations: amplitude 10 deg to 5 deg in 40 s
{
  const t = 40, gam = (2 * Math.LN2) / t, tE = Math.log(100) / gam;
  mk("u06-07", "phys-u06-damping-decay", "graph", {
    title: "Amplitude and energy of the damped pendulum",
    caption: `The amplitude falls as e^{−γt/2}: halving in ${t} s gives γ = 2 ln 2/${t} = ${r1(gam, 3)} s⁻¹. The energy, proportional to amplitude squared, falls as e^{−γt}, twice as fast: it is down to 1% at t = ln 100/γ = ${r1(tE, 0)} s.`,
    alt: `Two decaying curves against time: the amplitude fraction halving at 40 seconds and the energy fraction falling to 1 percent at about 133 seconds.`,
    description: [
      "Horizontal axis: time in seconds; vertical axis: the fraction of the initial amplitude, and of the initial energy.",
      `Amplitude: e^{−γt/2} reaches 0.5 (10° → 5°) at t = ${t} s, which fixes γ = ${r1(gam, 3)} s⁻¹.`,
      `Energy: e^{−γt} falls faster: 0.25 at ${t} s and 0.01 at t = ${r1(tE, 0)} s.`,
    ],
    range: { x: [0, 150], y: [0, 1.1] }, ticks: [[25, 50, 75, 100, 125, 150], [0.25, 0.5, 0.75, 1]], grid: [25, 0.25], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time / s", "fraction of initial value"],
    curves: [{ expr: `exp(-${gam / 2}*x)`, colour: "a1", label: "amplitude", labelAt: [70, 0.46] }, { expr: `exp(-${gam}*x)`, colour: "a2", label: "energy", labelAt: [32, 0.11] }],
    points: [{ x: t, y: 0.5, label: "10° → 5° at 40 s", dx: 10, dy: -12 }, { x: tE, y: 0.01, label: "1% at 133 s", dx: -10, dy: -14, anchor: "end", colour: "a2" }],
    checks: [{ type: "point", expr: `exp(-${gam / 2}*x)`, x: t, y: 0.5, name: "the amplitude halves in 40 s" }, { type: "point", expr: `exp(-${gam}*x)`, x: t, y: 0.25, name: "the energy is a quarter after 40 s" }, { type: "point", expr: `exp(-${gam}*x)`, x: tE, y: 0.01, name: "the energy is 1% at t = 133 s" }],
  });
}

// u06-08 Under-, critical and over-damping: m = 2.0 kg, k = 50 N/m
{
  const m = 2.0, k = 50, w0 = Math.sqrt(k / m), bc = 2 * Math.sqrt(k * m);
  const gu = 1, wd = Math.sqrt(w0 * w0 - gu * gu), gc = bc / (2 * m), go = 7.5, bo = Math.sqrt(go * go - w0 * w0);
  const A1 = (1 + go / bo) / 2, A2 = (1 - go / bo) / 2, l1 = go - bo, l2 = go + bo;
  const eu = `exp(-${gu}*x)*(cos(${wd}*x)+${gu / wd}*sin(${wd}*x))`, ec = `(1+${gc}*x)*exp(-${gc}*x)`, eo = `${A1}*exp(-${l1}*x)+(${A2})*exp(-${l2}*x)`;
  mk("u06-08", "phys-u06-damping-regimes", "graph", {
    title: "Three kinds of damping",
    caption: `For the ${m} kg mass on the k = ${k} N m⁻¹ spring, ω₀ = ${w0} rad s⁻¹ and critical damping needs b_c = 2√(km) = ${bc} kg s⁻¹. Released from rest at x = 1: with b = 4 (under-damped) it overshoots and rings, with b = ${bc} (critical) it returns fastest without overshooting, with b = 30 (over-damped) it creeps back slowly.`,
    alt: "Three displacement curves released from rest: an under-damped oscillating curve that crosses zero, a critically damped curve that returns fastest without crossing, and a slower over-damped curve.",
    description: [
      `Displacement x (as a fraction of the start) against time for m = ${m} kg, k = ${k} N m⁻¹, ω₀ = ${w0} rad s⁻¹, each released from rest.`,
      `Under-damped (b = 4 kg s⁻¹): oscillates inside a decaying envelope, ω_d = ${r1(wd, 2)} rad s⁻¹, crossing zero.`,
      `Critical (b = b_c = 2√(km) = ${bc} kg s⁻¹): x = (1 + γt)e^{−γt} with γ = ${gc} s⁻¹; the quickest return to zero without crossing it.`,
      `Over-damped (b = 30 kg s⁻¹): no oscillation, but slower than critical because the heavy damping holds the mass back.`,
    ],
    range: { x: [0, 1.8], y: [-0.4, 1.1] }, ticks: [[0.3, 0.6, 0.9, 1.2, 1.5, 1.8], [-0.25, 0.25, 0.5, 0.75, 1]], grid: [0.3, 0.25], height: [340, 330], xLabelBelow: true,
    axisLabels: ["time / s", "displacement x / x₀"],
    curves: [{ expr: eu, colour: "a1", label: "under (b = 4)", labelAt: [0.95, -0.28] }, { expr: ec, colour: "a2", label: "critical (b = 20)", labelAt: [0.42, 0.28] }, { expr: eo, colour: "a4", label: "over (b = 30)", labelAt: [1.0, 0.3] }],
    checks: [{ type: "point", expr: eu, x: 0, y: 1, name: "released from x = 1 (under)" }, { type: "slope", expr: eu, x: 0, value: 0, name: "released from rest (under)" }, { type: "point", expr: ec, x: 0, y: 1, name: "released from x = 1 (critical)" }, { type: "slope", expr: ec, x: 0, value: 0, name: "released from rest (critical)" }, { type: "point", expr: eo, x: 0, y: 1, name: "released from x = 1 (over)" }, { type: "slope", expr: eo, x: 0, value: 0, name: "released from rest (over)", }, { type: "order", a: ec, b: eo, x: 1, rel: "<", name: "critical damping is back near zero sooner than over-damping (t = 1 s)" }, { type: "value", expr: `2*sqrt(${k}*${m})`, x: 0, between: [19.99, 20.01], name: "b_c = 2√(km) = 20 kg/s" }, { type: "min", expr: eu, domain: [0, 1.8], x: 0.64, y: undefined, tol: 0.3, name: "the under-damped curve overshoots below zero" }],
  });
}

// u06-12 Coupled oscillators: two pendulums, l = 1.0 m, omega2 = 1.05 omega1
{
  const gg = 9.8, l = 1.0, w1 = Math.sqrt(gg / l), dw = 0.05 * w1, Ttr = PI / dw;
  mk("u06-12", "phys-u06-energy-transfer", "graph", {
    title: "Energy sloshing between coupled pendulums",
    caption: `With ω₁ = ${r1(w1, 2)} rad s⁻¹ and ω₂ = 1.05ω₁ the two normal modes differ by Δω = ${r1(dw, 3)} rad s⁻¹. The energy of each pendulum swings as cos²(Δω t/2) and sin²(Δω t/2): all of it leaves pendulum 1 and arrives in pendulum 2 after t = π/Δω = ${r1(Ttr, 0)} s, and then flows back.`,
    alt: `Two curves against time: the energy of pendulum 1 falling from 1 to 0 at about 20 seconds while the energy of pendulum 2 rises from 0 to 1, then swapping back.`,
    description: [
      "Horizontal axis: time in seconds; vertical axis: each pendulum's share of the total energy.",
      `Pendulum 1 starts with all the energy; its share is cos²(Δω t/2) with Δω = ${r1(dw, 3)} rad s⁻¹. Pendulum 2's share is sin²(Δω t/2).`,
      `They swap completely at t = π/Δω = ${r1(Ttr, 1)} s ≈ 20 s, and the transfer repeats every 2 × 20 s.`,
    ],
    range: { x: [0, 42], y: [0, 1.1] }, ticks: [[10, 20, 30, 40], [0.25, 0.5, 0.75, 1]], grid: [10, 0.25], height: [340, 320], xLabelBelow: true,
    axisLabels: ["time / s", "share of the total energy"],
    curves: [{ expr: `cos(${dw / 2}*x)^2`, colour: "a1", label: "pendulum 1", labelAt: [1.5, 0.82] }, { expr: `sin(${dw / 2}*x)^2`, colour: "a2", label: "pendulum 2", labelAt: [3, 0.2] }],
    points: [{ x: Ttr, y: 0, label: "all in pendulum 2: 20 s", dx: 8, dy: -14, colour: "a1" }],
    checks: [{ type: "point", expr: `cos(${dw / 2}*x)^2`, x: Ttr, y: 0, name: "pendulum 1 has given up all its energy at t = π/Δω = 20 s" }, { type: "point", expr: `sin(${dw / 2}*x)^2`, x: Ttr, y: 1, name: "pendulum 2 then has all of it" }, { type: "point", expr: `cos(${dw / 2}*x)^2+sin(${dw / 2}*x)^2`, x: 7, y: 1, name: "the two shares always add to the total" }],
  });
}

// u06-18 Vibration isolation: 1500 rpm machine on springs with f0 = 5 Hz
{
  const f = 1500 / 60, f0 = 5, r = f / f0, Tr = 1 / (r * r - 1);
  mk("u06-18", "phys-u06-transmissibility", "graph", {
    title: "Isolating the machine with springs",
    caption: `The undamped transmissibility is T = 1/(r² − 1), where r = f/f₀ is the drive frequency over the natural frequency. The machine runs at ${f} Hz on springs with f₀ = ${f0} Hz, so r = ${r} and T = 1/(${r * r} − 1) = ${r1(Tr * 100, 1)}%: ${r1(100 - Tr * 100, 0)}% isolation. T is below 1 only for r > √2.`,
    alt: `Curve of transmissibility against the frequency ratio: it falls through 1 at r = 1.41 and reaches 0.042 at r = 5.`,
    description: [
      "Horizontal axis: r = f/f₀; vertical axis: the fraction of the machine's force that reaches the floor.",
      "T = 1/(r² − 1) is large near resonance (r = 1) and falls through 1 at r = √2 = 1.41: below that the springs amplify the vibration.",
      `At r = ${r} (${f} Hz on springs of ${f0} Hz) T = ${r1(Tr, 3)}, about ${r1(Tr * 100, 0)}%: 96% of the force is isolated.`,
    ],
    range: { x: [1, 8], y: [0, 1.4] }, ticks: [[2, 3, 4, 5, 6, 7, 8], [0.25, 0.5, 0.75, 1, 1.25]], grid: [1, 0.25], height: [340, 320], xLabelBelow: true,
    axisLabels: ["frequency ratio r = f/f₀", "transmissibility T"],
    curves: [{ expr: "1/(x^2-1)", colour: "a1", domain: [1.2, 8], label: "T = 1/(r² − 1)", labelAt: [3.3, 0.38] }],
    marks: [{ y: 1, label: "T = 1" }],
    points: [{ x: r, y: Tr, label: "r = 5: T = 4%", dx: -10, dy: -14, anchor: "end" }, { x: Math.SQRT2, y: 1, label: "r = √2", dx: 10, dy: -10, colour: "a2" }],
    checks: [{ type: "value", expr: `${f}/${f0}`, x: 0, between: [4.99, 5.01], name: "the frequency ratio is 25 Hz / 5 Hz = 5" }, { type: "point", expr: "1/(x^2-1)", x: r, y: Tr, name: "T = 1/(25 − 1) = 0.042 at r = 5" }, { type: "point", expr: "1/(x^2-1)", x: Math.SQRT2, y: 1, name: "T = 1 at r = √2" }],
  });
}

// u06-19 Frequency response: RC low-pass, R = 10 kOhm, C = 100 nF
{
  const R = 1e4, C = 1e-7, fc = 1 / (2 * PI * R * C), g10 = 1 / Math.sqrt(101);
  mk("u06-19", "phys-u06-low-pass-gain", "graph", {
    title: "Gain of the RC low-pass filter",
    caption: `The gain |H| = 1/√(1 + (f/f_c)²) falls to 0.71 (−3 dB) at the cut-off f_c = 1/(2πRC) = ${r1(fc, 0)} Hz for R = 10 kΩ and C = 100 nF. At 10f_c = ${r1(fc * 10 / 1000, 2)} kHz the gain is ${r1(g10, 3)}, about 0.1 (−20 dB).`,
    alt: `Gain curve falling from 1, passing 0.71 at the cut-off frequency and 0.1 at ten times the cut-off frequency.`,
    description: [
      "Horizontal axis: frequency in units of the cut-off f_c = 159 Hz; vertical axis: the gain |H| (output amplitude ÷ input).",
      "At low frequency the gain is 1; at f = f_c it has fallen to 1/√2 = 0.71 (−3 dB).",
      `At f = 10f_c = ${r1(fc * 10 / 1000, 2)} kHz the gain is 1/√101 = ${r1(g10, 3)} ≈ 0.1 (−20 dB): the filter attenuates high frequencies.`,
    ],
    range: { x: [0, 10.5], y: [0, 1.1] }, ticks: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [0.25, 0.5, 0.75, 1]], grid: [1, 0.25], height: [340, 320], xLabelBelow: true,
    axisLabels: ["frequency f / f_c  (f_c = 159 Hz)", "gain |H|"],
    curves: [{ expr: "1/sqrt(1+x^2)", colour: "a1", label: "|H|", labelAt: [3.2, 0.5] }],
    points: [{ x: 1, y: 1 / Math.SQRT2, label: "−3 dB at f_c", dx: 10, dy: -10 }, { x: 10, y: g10, label: "≈ 0.1 at 10f_c", dx: -8, dy: -14, anchor: "end", colour: "a2" }],
    checks: [{ type: "value", expr: `1/(2*${PI}*${R}*${C})`, x: 0, between: [159, 159.3], name: "f_c = 1/(2πRC) = 159 Hz" }, { type: "point", expr: "1/sqrt(1+x^2)", x: 1, y: 1 / Math.SQRT2, name: "the gain is 0.71 at f_c" }, { type: "point", expr: "1/sqrt(1+x^2)", x: 10, y: g10, name: "the gain is 0.0995 at 10f_c" }],
  });
}
