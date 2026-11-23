// Unit 14, Heat Transfer and Thermal Physics. Every number in a caption or claim is computed here once.
// Run: node scripts/diagrams/physics/u14.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);

// u14-01 Conduction: the copper rod
{
  const kappa = 400, L = 0.5, A = 1e-4, Th = 100, Tc = 20, P = (kappa * A * (Th - Tc)) / L, grad = (Th - Tc) / L, e = `${Th}-${grad}*x`;
  mk("u14-01", "phys-u14-copper-rod", "graph", {
    title: "Temperature along a conducting copper rod",
    caption: `In steady state the temperature falls linearly along the rod, ${Th} °C to ${Tc} °C over ${L} m: a gradient of ${f0(grad)} K m⁻¹. Heat flows down the gradient at P = κAΔT/L = ${kappa} × ${A * 1e4} × 10⁻⁴ × ${Th - Tc}/${L} = ${f1(P)} W. A straight line means the same heat flows through every cross-section.`,
    alt: `Graph of temperature against distance along the rod: a straight line from ${Th} °C at 0 m to ${Tc} °C at ${L} m, gradient −${f0(grad)} K per metre.`,
    description: ["The horizontal axis is the distance along the rod in metres; the vertical axis is the temperature in °C.", `The hot end is at ${Th} °C and the cold end at ${Tc} °C, ${L} m away.`, `The profile is a straight line of gradient −ΔT/L = −${f0(grad)} K m⁻¹, so P = κA × ${f0(grad)} = ${kappa} × 1 × 10⁻⁴ × ${f0(grad)} = ${f1(P)} W.`],
    range: { x: [0, 0.6], y: [0, 120] }, ticks: [[0.1, 0.2, 0.3, 0.4, 0.5], [20, 40, 60, 80, 100]], grid: [0.1, 20], height: [320, 300], xLabelBelow: true, axisLabels: ["x / m", "T / °C"],
    curves: [{ expr: e, domain: [0, L], colour: "a2", width: 3.4, label: `gradient −${f0(grad)} K m^{-1}`, labelAt: [0.2, 82] }],
    points: [{ x: 0, y: Th, label: "100 °C", dx: 10, dy: -6 }, { x: L, y: Tc, label: "20 °C", dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: e, x: 0, y: Th, name: "hot end at 100 °C" }, { type: "point", expr: e, x: L, y: Tc, name: "cold end at 20 °C" }, { type: "slope", expr: e, x: 0.25, value: -grad, name: `gradient = −ΔT/L = −${f0(grad)} K/m, so P = κA|dT/dx| = ${f1(P)} W` }],
  });
}

// u14-04 Fourier: thermal penetration depth
{
  const alpha = 5e-7, w = (2 * Math.PI) / 86400, d1 = Math.sqrt((2 * alpha) / w), d2 = d1 * Math.sqrt(365), amp = (d) => `exp(-x/${d})`;
  mk("u14-04", "phys-u14-penetration-depth", "graph", {
    title: "How deep a temperature cycle reaches into soil",
    caption: `The amplitude of a periodic surface temperature falls as e^{−z/δ} with δ = √(2α/ω). For soil (α = 5 × 10⁻⁷ m² s⁻¹) the daily cycle (ω = 7.3 × 10⁻⁵ s⁻¹) has δ = ${f2(d1)} m, so it has all but vanished by half a metre. A cycle 365 times longer has δ larger by √365 ≈ ${f0(Math.sqrt(365))}: ${f1(d2)} m (the lesson's ≈ 2.3 m uses the rounded 0.12 m).`,
    alt: `Graph of relative temperature amplitude against depth in metres: a daily curve falling to 1/e at ${f2(d1)} m and an annual curve falling to 1/e at ${f1(d2)} m.`,
    description: ["The horizontal axis is depth below the surface in metres; the vertical axis is the temperature swing as a fraction of the surface swing.", `Daily cycle: e^{−z/${f2(d1)}}, falling to 1/e (0.37) at z = δ = ${f2(d1)} m.`, `Annual cycle: δ = ${f2(d1)} × √365 = ${f1(d2)} m, ${f0(Math.sqrt(365))} times deeper.`],
    range: { x: [0, 5], y: [0, 1.1] }, ticks: [[1, 2, 3, 4, 5], [0.5, 1]], grid: [1, 0.5], height: [330, 310], xLabelBelow: true, axisLabels: ["depth z / m", "swing / surface swing"],
    curves: [{ expr: amp(d1), colour: "a1", label: "daily", labelAt: [0.5, 0.35] }, { expr: amp(d2), colour: "a2", label: "annual", labelAt: [1.9, 0.6] }],
    points: [{ x: d1, y: Math.exp(-1), colour: "a1", label: `δ = ${f2(d1)} m`, dx: 10, dy: -12 }, { x: d2, y: Math.exp(-1), colour: "a2", label: `δ = ${f1(d2)} m`, dx: 10, dy: -12 }],
    checks: [{ type: "point", expr: amp(d1), x: d1, y: Math.exp(-1), name: `daily: amplitude falls to 1/e at δ = √(2α/ω) = ${f2(d1)} m` }, { type: "point", expr: amp(d2), x: d2, y: Math.exp(-1), name: `annual: δ = ${f2(d1)} × √365 = ${f1(d2)} m` }],
  });
}

// u14-05 Newton's law of cooling: the coffee
{
  const Ta = 20, T0 = 90, k = Math.log(70 / 40) / 10, t40 = Math.log(70 / 20) / k, e = `${Ta}+${T0 - Ta}*exp(-${k}*x)`;
  mk("u14-05", "phys-u14-coffee-cooling", "graph", {
    title: "Coffee cooling towards room temperature",
    caption: `T = T_a + (T₀ − T_a)e^{−kt} with T_a = ${Ta} °C and T₀ = ${T0} °C. Falling to ${Ta + 40} °C in 10 min fixes k = ln(70/40)/10 = ${f3(k)} min⁻¹. Then the coffee reaches ${Ta + 20} °C at t = ln(70/20)/k = ${f1(t40)} min. The curve flattens as it nears ${Ta} °C: cooling is fastest when the difference from the room is largest.`,
    alt: `Graph of coffee temperature against time: an exponential decay from ${T0} °C towards ${Ta} °C, passing ${Ta + 40} °C at 10 minutes and ${Ta + 20} °C at ${f1(t40)} minutes.`,
    description: ["The horizontal axis is time in minutes; the vertical axis is the coffee temperature in °C.", `The curve starts at ${T0} °C and decays towards the room temperature ${Ta} °C with rate constant k = ${f3(k)} min⁻¹.`, `At 10 min it is at ${Ta + 40} °C (this fixes k); it reaches ${Ta + 20} °C at ${f1(t40)} min.`],
    range: { x: [0, 40], y: [0, 100] }, ticks: [[10, 20, 30, 40], [20, 40, 60, 80]], grid: [10, 20], height: [330, 310], xLabelBelow: true, axisLabels: ["t / min", "T / °C"],
    marks: [{ y: Ta, label: "room 20 °C" }],
    curves: [{ expr: e, colour: "a1", label: "T(t)", labelAt: [3, 84] }],
    points: [{ x: 10, y: Ta + 40, label: "60 °C at 10 min", dx: 10, dy: -10 }, { x: t40, y: Ta + 20, colour: "a2", label: `40 °C at ${f1(t40)} min`, dx: 8, dy: -14 }],
    checks: [{ type: "point", expr: e, x: 0, y: T0, name: "starts at 90 °C" }, { type: "point", expr: e, x: 10, y: Ta + 40, name: "60 °C after 10 min (the data)" }, { type: "point", expr: e, x: t40, y: Ta + 20, name: `40 °C after ${f1(t40)} min (the lesson's 22.4 min)` }],
  });
}

// u14-07 Wien's law: a star peaking at 290 nm
{
  const hc = 6.62607015e-34 * 299792458, kB = 1.380649e-23, hck = (hc / kB) * 1e9, T = 2.898e-3 / 290e-9, Tx = 10000, lp = hck / (4.965114 * Tx);
  const pl = (lam) => lam ** -5 / (Math.exp(hck / (lam * Tx)) - 1), norm = 1 / pl(lp);
  const e = `${norm}*x^(-5)/(exp(${hck}/(x*${Tx}))-1)`;
  mk("u14-07", "phys-u14-wien-star", "graph", {
    title: "A star whose spectrum peaks at 290 nm",
    caption: `Wien's law, λ_maxT = 2.898 × 10⁻³ m K, gives T = 2.898 × 10⁻³/(2.9 × 10⁻⁷) = ${f0(T)} K ≈ 10 000 K. The Planck curve for 10 000 K does peak at ${f0(lp)} nm, in the ultraviolet; the visible band (400–700 nm) lies on the long-wavelength side, so the star looks blue-white.`,
    alt: `Planck curve for 10000 K against wavelength: it rises to a peak near ${f0(lp)} nm in the ultraviolet and falls slowly through the visible band.`,
    description: ["The horizontal axis is wavelength in nm; the vertical axis is the relative spectral intensity, scaled so the peak is 1.", `The Planck curve for T = 10 000 K peaks at ${f0(lp)} nm, as Wien's law predicts for 2.9 × 10⁻⁷ m.`, "The shaded band 400–700 nm is visible light: the star's output is already falling there, and most of it is in the ultraviolet."],
    range: { x: [100, 1000], y: [0, 1.15] }, ticks: [[200, 400, 600, 800, 1000], [0.5, 1]], grid: [200, 0.5], height: [330, 310], xLabelBelow: true, axisLabels: ["λ / nm", "relative intensity"],
    bands: [{ x: [400, 700], label: "visible", colour: "a4" }],
    curves: [{ expr: e, colour: "a1", width: 3.4, label: "10 000 K", labelAt: [520, 0.78] }],
    points: [{ x: lp, y: 1, label: `${f0(lp)} nm`, dx: 10, dy: -8 }],
    checks: [{ type: "max", expr: e, domain: [lp - 5, lp + 5], x: lp, y: 1, name: `the 10 000 K Planck curve peaks at ${f0(lp)} nm (Wien: 2.898 × 10⁻³/10⁴ = 290 nm)` }],
  });
}

// u14-09 Heat exchanger: counterflow temperature profiles and the log-mean
{
  const h1 = 150, h2 = 90, c1 = 20, c2 = 70, d1 = h1 - c2, d2 = h2 - c1, lm = (d1 - d2) / Math.log(d1 / d2);
  const hot = `${h1}-${h1 - h2}*x`, cold = `${c2}-${c2 - c1}*x`, dT = `${d1}-${d1 - d2}*x`;
  mk("u14-09", "phys-u14-counterflow", "graph", {
    title: "Counterflow heat exchanger: the log-mean temperature difference",
    caption: `Hot oil cools from ${h1} to ${h2} °C while water flowing the other way warms from ${c1} to ${c2} °C. The two ends see ΔT₁ = ${h1} − ${c2} = ${d1} K and ΔT₂ = ${h2} − ${c1} = ${d2} K. The driving difference is not their plain average: ΔT_lm = (ΔT₁ − ΔT₂)/ln(ΔT₁/ΔT₂) = ${f1(lm)} K, the value that goes in Q = UAΔT_lm.`,
    alt: `Graph of fluid temperature along the exchanger: the hot oil line falling from ${h1} to ${h2} °C and the cold water line, running the other way, from ${c2} down to ${c1} °C, with the gap ${d1} K at one end and ${d2} K at the other.`,
    description: ["The horizontal axis is the fractional distance along the exchanger; the vertical axis is the temperature in °C.", `Hot oil enters at x = 0 at ${h1} °C and leaves at x = 1 at ${h2} °C.`, `Water enters at x = 1 at ${c1} °C and leaves at x = 0 at ${c2} °C (counterflow).`, `The gap between them is ${d1} K at x = 0 and ${d2} K at x = 1; ΔT_lm = ${d1 - d2}/ln(${d1}/${d2}) = ${f1(lm)} K.`],
    range: { x: [0, 1.1], y: [0, 170] }, ticks: [[0, 0.5, 1], [20, 50, 90, 150]], grid: [0.5, 50], height: [330, 310], xLabelBelow: true, axisLabels: ["position along exchanger", "T / °C"],
    curves: [{ expr: hot, domain: [0, 1], colour: "a2", width: 3.2, label: "hot oil", labelAt: [0.15, 150] }, { expr: cold, domain: [0, 1], colour: "a1", width: 3.2, label: "water", labelAt: [0.6, 62] }],
    arrows: [{ from: [0.04, h1 - 4], to: [0.04, c2 + 4], colour: "ink", both: true, label: `${d1} K`, dx: 24 }, { from: [0.96, h2 - 4], to: [0.96, c1 + 4], colour: "ink", both: true, label: `${d2} K`, dx: -24 }],
    checks: [{ type: "point", expr: hot, x: 0, y: h1, name: "oil enters at 150 °C" }, { type: "point", expr: hot, x: 1, y: h2, name: "oil leaves at 90 °C" }, { type: "point", expr: cold, x: 0, y: c2, name: "water leaves at 70 °C" }, { type: "point", expr: cold, x: 1, y: c1, name: "water enters at 20 °C" },
      { type: "area", expr: `1000/(${dT})`, from: 0, to: 1, value: 1000 / lm, tol: 0.005, name: `ΔT_lm = 1/∫dx/ΔT = ${f1(lm)} K (ΔT falls ${d1} → ${d2} K)` }],
  });
}
