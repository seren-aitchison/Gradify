// Unit 6, Oscillations and Vibrations. Every number in a caption or claim is computed here once, from the lesson's own
// worked example. Run: node scripts/diagrams/physics/u06.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));
const PI = "3.14159265";

// u06-02 the defining graph of SHM: a = −ω²x (A = 0.05 m, f = 2.0 Hz)
{ const A = 0.05, f = 2, w = 2 * Math.PI * f, vmax = w * A, amax = w * w * A, line = `-${w * w}*x`;
  mk("u06-02", "phys-u06-shm-a-against-x", "graph", {
    title: "SHM: acceleration proportional to displacement, and opposite",
    caption: `In SHM a = −ω²x: a straight line through the origin with gradient −ω². At ${f.toFixed(1)} Hz, ω = ${r(w, 2)} rad s⁻¹, so at the amplitude ${A} m the acceleration is a_max = ω²A = ${r(amax, 1)} m s⁻² (and v_max = ωA = ${r(vmax, 2)} m s⁻¹ at x = 0).`,
    alt: "Acceleration against displacement: a straight line with negative gradient through the origin, from plus 7.9 at minus 0.05 metres to minus 7.9 at plus 0.05.",
    description: [`ω = 2π × ${f} = ${r(w, 2)} rad s⁻¹; ω² = ${r(w * w, 1)} s⁻².`, `The line a = −${r(w * w, 1)}x runs between x = ±${A} m.`, `At x = +${A} m, a = −${r(amax, 2)} m s⁻²; at x = −${A} m, a = +${r(amax, 2)} m s⁻².`, "The minus sign means the acceleration always points back towards equilibrium."],
    range: { x: [-0.06, 0.06], y: [-9, 9] }, ticks: [[-0.05, -0.025, 0.025, 0.05], [-8, -4, 4, 8]], height: [320, 300], xLabelBelow: true, axisLabels: ["displacement x / m", "acceleration a / m s⁻²"],
    curves: [{ expr: line, domain: [-A, A], colour: "a1" }],
    points: [{ x: A, y: r(-amax, 4), colour: "a2", label: `−${r(amax, 1)} m s⁻²`, anchor: "end", dx: -10, dy: 0 }, { x: -A, y: r(amax, 4), colour: "a2", label: `+${r(amax, 1)} m s⁻²`, dx: 10, dy: 0 }],
    checks: [{ type: "slope", expr: line, x: 0, value: r(-w * w, 6), name: `gradient −ω² = −${r(w * w, 1)} s⁻²` }, { type: "point", expr: line, x: A, y: r(-amax, 6), name: `a_max = ω²A = ${r(amax, 2)} m s⁻²` }],
  }); }

// u06-03 phase difference: period 2.0 s, 0.5 s apart
{ const T = 2, dt = 0.5, phi = (360 * dt) / T, a = `sin(2*${PI}*x/${T})`, b = `sin(2*${PI}*(x-${dt})/${T})`;
  mk("u06-03", "phys-u06-phase-difference", "graph", {
    title: "Phase difference from a time lag",
    caption: `Both pendulums have period ${T.toFixed(1)} s; B passes equilibrium ${dt} s after A. That lag is ${dt}/${T} of a cycle, so the phase difference is ${phi}° (π/2 rad): A leads B by a quarter cycle.`,
    alt: "Two sine curves of the same period, the second shifted half a second to the right, a quarter of a cycle.",
    description: [`Period T = ${T} s for both.`, `B crosses equilibrium moving right ${dt} s after A.`, `Phase difference = (${dt} / ${T}) × 360° = ${phi}° = π/2 rad.`],
    range: { x: [0, 4], y: [-1.3, 1.4] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4], [-1, 1]], height: [300, 280], xLabelBelow: true, axisLabels: ["time / s", "displacement (relative)"],
    curves: [{ expr: a, colour: "a1", label: "A", labelAt: [0.42, 1.18] }, { expr: b, colour: "a2", label: "B", labelAt: [0.92, 1.18] }],
    arrows: [{ from: [2, -1.15], to: [2 + dt, -1.15], both: true, colour: "ink", label: `${dt} s = ${phi}°`, labelAt: [2.6, -1.15] }],
    checks: [{ type: "point", expr: a, x: 2, y: 0, name: "A crosses equilibrium at t = 2.0 s" }, { type: "point", expr: b, x: 2 + dt, y: 0, name: `B crosses ${dt} s later` }, { type: "max", expr: b, domain: [0, 2], x: dt + T / 4, y: 1, name: `B peaks a quarter period (${phi}°) after A` }],
  }); }

// u06-04 period of a mass–spring system against mass (k = 100 N m⁻¹)
{ const k = 100, T = (m) => 2 * Math.PI * Math.sqrt(m / k), f = `2*${PI}*sqrt(x/${k})`;
  mk("u06-04", "phys-u06-spring-period", "graph", {
    title: "Period of a mass on a spring",
    caption: `T = 2π√(m/k). With k = ${k} N m⁻¹, a 0.25 kg mass gives T = ${r(T(0.25), 3)} s; quadrupling the mass to 1.0 kg only doubles the period, to ${r(T(1), 3)} s.`,
    alt: "Period against mass rising as a square-root curve, with 0.314 seconds at 0.25 kilograms and 0.628 seconds at 1.0 kilogram marked.",
    description: [`k = ${k} N m⁻¹.`, `m = 0.25 kg: T = 2π√(0.25/100) = ${r(T(0.25), 3)} s.`, `m = 1.0 kg: T = ${r(T(1), 3)} s, twice as long, because T ∝ √m.`],
    range: { x: [0, 1.2], y: [0, 0.8] }, ticks: [[0.25, 0.5, 0.75, 1], [0.2, 0.4, 0.6, 0.8]], height: [320, 300], xLabelBelow: true, axisLabels: ["mass / kg", "period / s"],
    curves: [{ expr: f, colour: "a1" }], marks: [{ x: 0.25, to: T(0.25) }, { x: 1, to: T(1) }],
    points: [{ x: 0.25, y: r(T(0.25), 5), colour: "a2", label: `${r(T(0.25), 3)} s`, dx: 10, dy: 14 }, { x: 1, y: r(T(1), 5), colour: "a2", label: `${r(T(1), 3)} s`, anchor: "end", dx: -10, dy: -12 }],
    checks: [{ type: "point", expr: f, x: 0.25, y: r(T(0.25), 6), name: `T(0.25 kg) = ${r(T(0.25), 3)} s` }, { type: "point", expr: f, x: 1, y: r(2 * T(0.25), 6), name: "four times the mass, twice the period" }],
  }); }

// u06-06 energy in an oscillator: m = 0.5 kg, k = 200 N m⁻¹, A = 0.1 m
{ const m = 0.5, k = 200, A = 0.1, E = 0.5 * k * A * A, x = 0.06, PEx = 0.5 * k * x * x, KEx = E - PEx, v = Math.sqrt((2 * KEx) / m), PE = `${k / 2}*x^2`, KE = `${E}-${k / 2}*x^2`;
  mk("u06-06", "phys-u06-shm-energy", "graph", {
    title: "Energy in a mass–spring oscillator",
    caption: `The total energy is fixed at ½kA² = ${E.toFixed(1)} J. At x = ${x} m the spring holds ½kx² = ${r(PEx, 2)} J, so the mass has ${r(KEx, 2)} J of kinetic energy: v = ${r(v, 1)} m s⁻¹.`,
    alt: "Energy against displacement: a parabola of potential energy, an inverted parabola of kinetic energy, and a flat total line at 1 joule.",
    description: [`E = ½ × ${k} × ${A}² = ${E} J.`, "Potential energy ½kx² is a parabola, zero at the centre; kinetic energy is E minus it.", `At x = ${x} m: potential ${r(PEx, 2)} J, kinetic ${r(KEx, 2)} J, v = √(2 × ${r(KEx, 2)} / ${m}) = ${r(v, 2)} m s⁻¹.`],
    range: { x: [-0.1, 0.1], y: [0, 1.2] }, ticks: [[-0.1, -0.05, 0.05, 0.1], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["displacement / m", "energy / J"],
    curves: [{ expr: PE, colour: "a1", label: "potential", labelAt: [-0.098, 0.75] }, { expr: KE, colour: "a2", label: "kinetic", labelAt: [0.012, 0.6] }, { expr: `${E}+0*x`, colour: "a4", dash: "6 5", label: "total", labelAt: [0.07, 1.08] }],
    marks: [{ x, to: E }], points: [{ x, y: r(PEx, 4), colour: "a1", label: `${r(PEx, 2)} J`, dx: 10, dy: 0 }, { x, y: r(KEx, 4), colour: "a2", label: `${r(KEx, 2)} J`, dx: 10, dy: 0 }],
    checks: [{ type: "point", expr: PE, x, y: r(PEx, 6), name: `½kx² = ${r(PEx, 2)} J at ${x} m` }, { type: "point", expr: KE, x, y: r(KEx, 6), name: `kinetic energy ${r(KEx, 2)} J at ${x} m` }, { type: "point", expr: `0.5*${m}*${r(v, 8)}^2+0*x`, x: 0, y: r(KEx, 6), name: `v = ${r(v, 2)} m s⁻¹` }],
  }); }

// u06-07 a pendulum's amplitude halves in 40 s
{ const g = Math.log(2) / 40, t1 = Math.log(100) / (2 * g), amp = `10*exp(-${g}*x)`;
  mk("u06-07", "phys-u06-damped-amplitude", "graph", {
    title: "Exponential decay of amplitude",
    caption: `The amplitude falls from 10° to 5° in 40 s, so γ = ln 2 / 40 = ${r(g, 4)} s⁻¹. Energy goes as amplitude squared, decaying at 2γ: it falls to 1% when the amplitude reaches 1°, after ln 100 / 2γ = ${r(t1, 0)} s.`,
    alt: "Amplitude in degrees against time, an exponential decay from 10 through 5 at 40 seconds to 1 at 133 seconds.",
    description: [`A = 10° × e^(−γt) with γ = ${r(g, 5)} s⁻¹.`, "Every 40 s the amplitude halves: 10°, 5°, 2.5°, …", `Energy ∝ A²: 1% of the energy is 10% of the amplitude, 1°, reached at t = ${r(t1, 0)} s.`],
    range: { x: [0, 160], y: [0, 11] }, ticks: [[40, 80, 120, 160], [2, 4, 6, 8, 10]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "amplitude / °"],
    curves: [{ expr: amp, colour: "a1" }], marks: [{ x: 40, to: 5 }, { x: t1, to: 1 }],
    points: [{ x: 40, y: 5, colour: "a2", label: "5° at 40 s", dx: 10, dy: -10 }, { x: r(t1, 4), y: 1, colour: "a2", label: `1° (1% of energy) at ${r(t1, 0)} s`, anchor: "end", dx: -6, dy: -30 }],
    checks: [{ type: "point", expr: amp, x: 40, y: 5, name: "half the amplitude after 40 s" }, { type: "point", expr: `100*exp(-${2 * g}*x)`, x: r(t1, 6), y: 1, name: `energy at 1% after ${r(t1, 1)} s` }],
  }); }

// u06-08 damping regimes for m = 2.0 kg, k = 50 N m⁻¹ (critical b = 2√(km) = 20 kg s⁻¹)
{ const m = 2, k = 50, w0 = Math.sqrt(k / m), bc = 2 * Math.sqrt(k * m), gu = 4 / (2 * m), wd = Math.sqrt(w0 * w0 - gu * gu), go = 50 / (2 * m), s = Math.sqrt(go * go - w0 * w0), r1 = -go + s, r2 = -go - s;
  const under = `exp(-${gu}*x)*(cos(${wd}*x)+${gu / wd}*sin(${wd}*x))`, crit = `(1+${w0}*x)*exp(-${w0}*x)`, over = `(${-r2}*exp(${r1}*x)-${-r1}*exp(${r2}*x))/(${r1 - r2})`;
  mk("u06-08", "phys-u06-damping-regimes", "graph", {
    title: "Underdamped, critically damped, overdamped",
    caption: `For m = ${m.toFixed(1)} kg and k = ${k} N m⁻¹, critical damping needs b = 2√(km) = ${bc} kg s⁻¹. Released from rest, a lightly damped system (b = 4) overshoots and oscillates; at b = ${bc} it returns fastest without overshooting; heavily damped (b = 50) it creeps back.`,
    alt: "Displacement against time for three systems released from 1: an oscillation that decays, a smooth fast return, and a slow creeping return.",
    description: [`ω₀ = √(${k}/${m}) = ${w0} rad s⁻¹; critical damping b = 2√(${k} × ${m}) = ${bc} kg s⁻¹.`, "b = 4 kg s⁻¹ (underdamped): oscillates inside a decaying envelope.", `b = ${bc} kg s⁻¹ (critical): reaches equilibrium quickest without crossing it.`, "b = 50 kg s⁻¹ (overdamped): returns slowly, never crossing."],
    range: { x: [0, 3], y: [-0.7, 1.1] }, ticks: [[0.5, 1, 1.5, 2, 2.5, 3], [-0.5, 0.5, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / s", "displacement (released from 1)"],
    curves: [{ expr: under, colour: "a1", label: "underdamped, b = 4", labelAt: [1.25, -0.55] }, { expr: crit, colour: "a4", label: `critical, b = ${bc}`, labelAt: [0.46, 0.4] }, { expr: over, colour: "a2", label: "overdamped, b = 50", labelAt: [1.3, 0.62] }],
    checks: [{ type: "point", expr: under, x: 0, y: 1, name: "all start at 1" }, { type: "point", expr: crit, x: 0, y: 1, name: "critical starts at 1" }, { type: "point", expr: over, x: 0, y: 1, name: "overdamped starts at 1" },
      { type: "min", expr: crit, domain: [0, 3], x: 3, tol: 0.01, name: "critical damping never crosses equilibrium (it keeps falling)" }, { type: "value", expr: under, x: 0.7, between: [-0.6, -0.1], name: "the underdamped system overshoots" },
      { type: "order", a: crit, b: over, x: 1, rel: "<", name: "critical returns faster than overdamped" }],
  }); }

// u06-10 resonance curves for three dampings (ω₀ = 1)
{ const curve = (gm) => `1/sqrt((1-x^2)^2+(${gm}*x)^2)`;
  mk("u06-10", "phys-u06-resonance-curves", "graph", {
    title: "Resonance: amplitude against driving frequency",
    caption: "Driven near its natural frequency, an oscillator's amplitude peaks. The lighter the damping, the taller and narrower the peak: with γ = 0.2ω₀ the amplitude reaches about 5 times its low-frequency value. A singer's note matched to a wine glass's frequency can build up enough to break it.",
    alt: "Amplitude against driving frequency for three damping levels, each peaking near the natural frequency; the lightest damping gives the tallest, sharpest peak.",
    description: ["Horizontal axis: driving frequency as a fraction of the natural frequency ω₀.", "Vertical axis: amplitude relative to its value at very low frequency.", "γ = 0.2ω₀: a sharp peak of about 5 near ω₀. γ = 0.5ω₀: about 2. γ = 1.0ω₀: a low, broad hump.", "Far above ω₀ the amplitude falls towards zero whatever the damping."],
    range: { x: [0, 2.5], y: [0, 5.6] }, ticks: [[0.5, 1, 1.5, 2, 2.5], [1, 2, 3, 4, 5]], height: [320, 300], xLabelBelow: true, axisLabels: ["driving frequency / ω₀", "amplitude (relative)"],
    curves: [{ expr: curve(0.2), colour: "a2", label: "γ = 0.2ω₀", labelAt: [1.12, 4.6] }, { expr: curve(0.5), colour: "a1", label: "γ = 0.5ω₀", labelAt: [1.22, 1.9] }, { expr: curve(1), colour: "a4", label: "γ = ω₀", labelAt: [1.6, 0.75] }],
    marks: [{ x: 1, to: 5.1 }],
    checks: [{ type: "max", expr: curve(0.2), domain: [0.2, 2.5], x: 0.99, y: 5.0252, name: "light damping peaks near ω₀ at about 5" }, { type: "value", expr: curve(0.5), x: 1, between: [1.9, 2.1], name: "γ = 0.5ω₀: amplitude 2 at ω₀" }, { type: "order", a: curve(0.2), b: curve(1), x: 1, rel: ">", name: "lighter damping, taller peak" }],
  }); }

// u06-18 vibration isolation: transmissibility 1/|1 − r²| (no damping), machine 1500 rpm on 5 Hz mounts
{ const ratio = 1500 / 60 / 5, Tr = 1 / Math.abs(1 - ratio * ratio), f = "1/abs(1-x^2)";
  mk("u06-18", "phys-u06-transmissibility", "graph", {
    title: "Isolating a vibrating machine",
    caption: `A 1500 rpm machine shakes at 25 Hz; its mounts resonate at 5 Hz, a frequency ratio of ${ratio}. Above r = √2 the mounts transmit less force than they receive; at r = ${ratio} only 1/(r² − 1) = ${r(Tr, 3)} (${r(Tr * 100, 1)}%) gets through.`,
    alt: "Transmissibility against frequency ratio: a spike at 1, falling below 1 beyond the square root of 2, and down to about 0.04 at a ratio of 5.",
    description: [`Forcing 25 Hz, natural 5 Hz: r = ${ratio}.`, "Transmissibility (undamped) = 1 / |1 − r²|: it blows up at r = 1 (resonance) and equals 1 at r = √2.", `At r = ${ratio}: 1 / 24 = ${r(Tr, 4)}.`],
    range: { x: [0, 6], y: [0, 4] }, ticks: [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4]], height: [320, 300], xLabelBelow: true, axisLabels: ["frequency ratio r = f / f₀", "transmissibility"],
    curves: [{ expr: f, colour: "a1", samples: 1200 }], marks: [{ y: 1 }, { x: Math.SQRT2, to: 1, label: "√2" }],
    points: [{ x: ratio, y: r(Tr, 5), colour: "a2", label: `${r(Tr * 100, 1)}% at r = ${ratio}`, anchor: "end", dx: -6, dy: -14 }],
    checks: [{ type: "point", expr: f, x: ratio, y: r(Tr, 6), name: `transmissibility ${r(Tr, 4)} at r = ${ratio}` }, { type: "point", expr: f, x: r(Math.SQRT2, 8), y: 1, name: "isolation starts at r = √2" }],
  }); }

// u06-19 a low-pass RC filter: R = 10 kΩ, C = 100 nF
{ const R = 1e4, C = 1e-7, fc = 1 / (2 * Math.PI * R * C), G10 = 1 / Math.sqrt(101), G = "1/sqrt(1+x^2)";
  mk("u06-19", "phys-u06-rc-low-pass", "graph", {
    title: "Frequency response of a low-pass filter",
    caption: `f_c = 1/(2πRC) = ${r(fc, 0)} Hz. Low frequencies pass almost unchanged; at f_c the gain is 1/√2 = 0.707 (−3 dB); at 10 f_c it is 1/√101 = ${r(G10, 3)}, about −20 dB.`,
    alt: "Gain against frequency in multiples of the cut-off frequency, falling from 1 through 0.707 at 1 to about 0.1 at 10.",
    description: [`R = 10 kΩ, C = 100 nF: f_c = 1 / (2π × 10⁴ × 10⁻⁷) = ${r(fc, 0)} Hz.`, "Gain = 1 / √(1 + (f/f_c)²).", `At f = f_c: 0.707. At f = 10f_c (${r(10 * fc, -1)} Hz): ${r(G10, 3)}.`],
    range: { x: [0, 12], y: [0, 1.1] }, ticks: [[1, 2, 4, 6, 8, 10, 12], [0.25, 0.5, 0.75, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["frequency / f_c", "gain"],
    curves: [{ expr: G, colour: "a1" }], marks: [{ x: 1, to: Math.SQRT1_2 }, { y: Math.SQRT1_2, to: 1 }],
    points: [{ x: 1, y: r(Math.SQRT1_2, 6), colour: "a1", label: "0.707 (−3 dB) at f_c", dx: 12, dy: -4 }, { x: 10, y: r(G10, 5), colour: "a2", label: `${r(G10, 3)} at 10f_c`, anchor: "end", dx: -6, dy: -14 }],
    checks: [{ type: "point", expr: G, x: 1, y: r(Math.SQRT1_2, 8), name: "gain 1/√2 at the cut-off" }, { type: "point", expr: G, x: 10, y: r(G10, 8), name: `gain ${r(G10, 4)} at 10f_c` }, { type: "point", expr: `1/(2*${PI}*10000*0.0000001)+0*x`, x: 0, y: r(fc, 4), name: `f_c = ${r(fc, 1)} Hz` }],
  }); }
