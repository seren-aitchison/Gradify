// Unit 17, Magnetism and Electromagnetism. Every number in a caption or claim is computed here once. Run: node scripts/diagrams/physics/u17.mjs
import { mk } from "./spec.mjs";

const f0 = (x) => x.toFixed(0), f1 = (x) => x.toFixed(1), f2 = (x) => x.toFixed(2), f3 = (x) => x.toFixed(3);
const K = Math.PI / 180, MU0 = 4e-7 * Math.PI;

// u17-01 Magnetic fields: sizes from Earth to a magnetar
{
  const earth = 5e-5, mri = 1.5, ratio = mri / earth, orders = Math.log10(ratio), top = 1e11;
  mk("u17-01", "phys-u17-field-sizes", "scale", {
    title: "How strong are magnetic fields?",
    caption: `Magnetic flux density runs from tens of microtesla (Earth, ~50 μT) to ~10¹¹ T (a magnetar), about ${f0(Math.log10(top / earth))} orders of magnitude. A 1.5 T MRI field is 1.5/(5 × 10⁻⁵) = ${f0(ratio)} times Earth's field, ${f1(orders)} orders of magnitude up.`,
    alt: `A logarithmic scale of magnetic flux density in tesla from 10^-6 to 10^12, with Earth's field, a fridge magnet, an MRI, the strongest steady laboratory field, a neutron star and a magnetar marked.`,
    description: ["A horizontal logarithmic scale of magnetic flux density in tesla.", "Marked from weakest to strongest: Earth's field at the surface about 50 μT, a fridge magnet about 5 mT, an MRI 1.5 T, the strongest steady laboratory field about 45 T, a neutron star about 10⁸ T and a magnetar up to about 10¹¹ T.", `The MRI field is ${f0(ratio)} times Earth's field: ${f1(orders)} orders of magnitude.`],
    quantity: "magnetic flux density", units: "T", min: -6, max: 12,
    markers: [{ label: "Earth", value: earth }, { label: "fridge magnet", value: 5e-3 }, { label: "MRI", value: mri }, { label: "lab record", value: 45 }, { label: "neutron star", value: 1e8 }, { label: "magnetar", value: top }],
    claims: [{ type: "span", value: Math.round(Math.log10(top / earth)), tol: 1, name: "the markers span about 15 orders of magnitude" }, { type: "orders", a: "Earth", b: "MRI", value: +orders.toFixed(1), tol: 0.1, name: `an MRI is ${f0(ratio)} (10^${f1(orders)}) times Earth's field` }],
  });
}

// u17-03 Lorentz force: velocity selector
{
  const E = 2e4, B = 0.1, v = E / B, vu = v / 1e5, Eu = E / 1e4;
  mk("u17-03", "phys-u17-velocity-selector", "graph", {
    title: "Velocity selector: where the two forces balance",
    caption: `For a charge q the electric force is qE and the magnetic force is qvB. Per unit charge, E = 2 × 10⁴ V m⁻¹ does not depend on speed while vB = 0.1v rises with it. They cancel, and the particle goes straight through, only at v = E/B = ${E}/${B} = ${v.toExponential(0).replace("e+5", " × 10⁵")} m s⁻¹. Slower particles are pushed along E; faster ones along the magnetic force.`,
    alt: `Graph of force per unit charge against speed: a flat line at ${Eu} (units of 10⁴ V m⁻¹) for the electric force and a rising line vB through the origin, crossing at ${vu} × 10⁵ m s⁻¹.`,
    description: ["The horizontal axis is the particle's speed in units of 10⁵ m s⁻¹; the vertical axis is force per unit charge in units of 10⁴ V m⁻¹.", `The electric force per charge is E = ${Eu} (×10⁴ V m⁻¹), the same at every speed.`, `The magnetic force per charge vB = 0.1v rises from zero in proportion to the speed.`, `The lines cross at v = ${vu} × 10⁵ = ${v} m s⁻¹: only particles of this speed are undeflected.`],
    range: { x: [0, 4], y: [0, 4.4] }, ticks: [[1, 2, 3, 4], [1, 2, 3, 4]], grid: [1, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["v / 10⁵ m s⁻¹", "F/q / 10⁴ V m⁻¹"],
    curves: [{ expr: `${Eu}`, domain: [0, 4], colour: "a1", width: 3.4, label: "E", labelAt: [0.4, 2.3] }, { expr: `${(B * 1e5) / 1e4}*x`, domain: [0, 4], colour: "a2", width: 3.4, label: "vB", labelAt: [3.2, 3.5] }],
    points: [{ x: vu, y: Eu, colour: "ink", label: "v = E/B", dx: 12, dy: -12 }],
    checks: [{ type: "intersect", a: `${Eu}`, b: `${(B * 1e5) / 1e4}*x`, x: vu, y: Eu, name: `E = vB at v = E/B = ${v} m s⁻¹` }],
  });
}

// u17-08 Magnetic dipoles: torque on a coil
{
  const N = 100, I = 0.5, A = 4e-4, B = 0.2, m = N * I * A, tau = m * B, ex = `${tau}*sin(x*${K})`;
  mk("u17-08", "phys-u17-coil-torque", "graph", {
    title: "Torque on a current coil in a field",
    caption: `The 100-turn coil has magnetic moment m = NIA = 100 × 0.5 × 4 × 10⁻⁴ = ${m} A m². In 0.2 T the torque τ = mB sin θ is largest when the moment is perpendicular to the field (θ = 90°): τ = ${m} × 0.2 = ${tau * 1e3} × 10⁻³ N m. It falls to zero when m is aligned (0°) or opposed (180°) to B.`,
    alt: `Graph of torque against the angle between the moment and the field: a sine curve from zero, peaking at ${tau * 1e3} mN m at 90° and back to zero at 180°.`,
    description: ["The horizontal axis is the angle θ between the coil's moment and the field in degrees; the vertical axis is the torque in millinewton metres.", `The torque is τ = mB sin θ with m = ${m} A m² and B = 0.2 T, so the amplitude is ${tau * 1e3} mN m.`, "It is zero at 0° and 180°, and a maximum at 90° where the moment is perpendicular to B."],
    range: { x: [0, 180], y: [0, 5] }, ticks: [[45, 90, 135, 180], [1, 2, 3, 4]], grid: [45, 1], height: [320, 300], xLabelBelow: true, axisLabels: ["θ / °", "τ / mN m"],
    curves: [{ expr: `${tau * 1e3}*sin(x*${K})`, colour: "a1", width: 3.4, label: "τ = mB sin θ", labelAt: [110, 2.2] }],
    points: [{ x: 90, y: tau * 1e3, label: "4 mN m at 90°", dx: 10, dy: -12 }],
    checks: [{ type: "max", expr: `${tau * 1e3}*sin(x*${K})`, domain: [0, 180], x: 90, y: tau * 1e3, name: `maximum τ = NIAB = ${tau * 1e3} mN m at 90°` }, { type: "point", expr: `${tau * 1e3}*sin(x*${K})`, x: 180, y: 0, name: "zero torque when the moment is anti-parallel to B" }],
  });
}

// u17-09 Magnetic flux: flux linkage against angle
{
  const N = 50, B = 0.4, A = 0.01, link = +(N * B * A).toFixed(3), th = 60, at = +(link * Math.cos(th * K)).toFixed(3), ex = `${link}*cos(x*${K})`;
  mk("u17-09", "phys-u17-flux-linkage", "graph", {
    title: "Flux linkage depends on the angle to the normal",
    caption: `For the 50-turn coil (A = 0.01 m², B = 0.4 T) the flux linkage is NΦ = NBA cos θ with θ the angle between B and the coil's normal. At θ = 0° it is ${link} Wb-turns, at 60° it is ${f1(link)} × cos 60° = ${at} Wb-turns (Φ = ${at / N * 1e3} × 10⁻³ Wb per turn), and at 90° the field lies in the coil's plane and nothing links it.`,
    alt: `Graph of flux linkage against angle: a cosine falling from ${link} Wb-turns at 0° through ${at} at 60° to zero at 90°.`,
    description: ["The horizontal axis is the angle θ between the field and the coil's normal in degrees; the vertical axis is the flux linkage in Wb-turns.", `NBA = 50 × 0.4 × 0.01 = ${link} Wb-turns is the largest linkage, at θ = 0°.`, `At θ = 60°, NΦ = ${link} × cos 60° = ${at} Wb-turns.`, "At 90° the field is parallel to the coil's plane and the linkage is zero."],
    range: { x: [0, 90], y: [0, 0.25] }, ticks: [[30, 60, 90], [0.05, 0.1, 0.15, 0.2]], grid: [30, 0.05], height: [320, 300], xLabelBelow: true, axisLabels: ["θ / °", "NΦ / Wb-turns"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "NBA cos θ", labelAt: [14, 0.14] }],
    points: [{ x: th, y: at, label: `${at} Wb-turns at 60°`, dx: 10, dy: -12 }],
    checks: [{ type: "point", expr: ex, x: th, y: at, name: `NΦ = 50 × 0.4 × 0.01 × cos 60° = ${at} Wb-turns` }, { type: "point", expr: ex, x: 90, y: 0, name: "no flux linkage when B lies in the coil's plane" }],
  });
}

// u17-11 Faraday's law: AC generator
{
  const N = 200, B = 0.1, A = 0.05, rev = 50, w = 2 * Math.PI * rev, peak = N * B * A * w, T = 1000 / rev, ex = `${peak}*sin(x*${w / 1000})`;
  mk("u17-11", "phys-u17-generator-emf", "graph", {
    title: "EMF of a rotating coil",
    caption: `A coil of 200 turns (A = 0.05 m²) spinning at 50 rev s⁻¹ in 0.1 T has ω = 2π × 50 = ${f0(w)} rad s⁻¹ and ε = NBAω sin ωt, a sine wave of peak ${f0(peak)} V = 200 × 0.1 × 0.05 × ${f0(w)}. The period is ${f0(T)} ms. The EMF is largest when the coil's plane is parallel to B, where the flux is changing fastest, and zero when the flux is largest.`,
    alt: `Graph of EMF against time: a sine wave of peak ${f0(peak)} V and period ${f0(T)} ms, shown for two cycles.`,
    description: ["The horizontal axis is time in milliseconds; the vertical axis is the induced EMF in volts.", `ω = 2π × 50 = ${f0(w)} rad s⁻¹, so the period is ${f0(T)} ms.`, `The peak EMF is NBAω = 200 × 0.1 × 0.05 × ${f0(w)} = ${f0(peak)} V, reached a quarter of a period (${f0(T / 4)} ms) after the coil is perpendicular to B.`],
    range: { x: [0, 40], y: [-380, 420] }, ticks: [[10, 20, 30, 40], [-300, -150, 150, 300]], grid: [10, 150], height: [320, 300], xLabelBelow: true, axisLabels: ["t / ms", "ε / V"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "ε = NBAω sin ωt", labelAt: [26.5, 340] }],
    points: [{ x: T / 4, y: peak, label: `${f0(peak)} V`, dx: 10, dy: -10 }],
    checks: [{ type: "max", expr: ex, domain: [0, T / 2], x: T / 4, y: peak, name: `peak EMF NBAω = ${f0(peak)} V a quarter-period in` }, { type: "point", expr: ex, x: T / 2, y: 0, name: "EMF returns to zero after half a period" }],
  });
}

// u17-18 Paramagnetism: Curie's law
{
  const chi300 = 2e-4, C = chi300 * 300, chi30 = C / 30, ex = `${C / 1e-4}/x`;
  mk("u17-18", "phys-u17-curie-law", "graph", {
    title: "Curie's law for a paramagnet",
    caption: `Susceptibility χ = C/T. With χ = 2 × 10⁻⁴ at 300 K, C = ${C} K; cooling tenfold to 30 K raises χ tenfold to ${chi30.toExponential(0).replace("e-3", " × 10⁻³")}. Thermal motion fights the alignment of moments, so the response grows as the temperature falls.`,
    alt: `Graph of susceptibility (units of 10⁻⁴) against temperature: a falling hyperbola passing through 2 at 300 K and 20 at 30 K.`,
    description: ["The horizontal axis is the temperature in kelvin; the vertical axis is the susceptibility in units of 10⁻⁴.", `The curve is χ = C/T with C = ${C} K.`, `At 300 K, χ = 2 × 10⁻⁴; at 30 K, χ = ${chi30 / 1e-4} × 10⁻⁴ = 2 × 10⁻³: ten times larger for a tenth of the temperature.`],
    range: { x: [0, 320], y: [0, 24] }, ticks: [[100, 200, 300], [5, 10, 15, 20]], grid: [100, 5], height: [320, 300], xLabelBelow: true, axisLabels: ["T / K", "χ / 10⁻⁴"],
    curves: [{ expr: ex, domain: [25, 320], colour: "a1", width: 3.4, label: "χ = C/T", labelAt: [120, 11] }],
    points: [{ x: 300, y: chi300 / 1e-4, label: "2 at 300 K", dx: -8, dy: -14, anchor: "end" }, { x: 30, y: chi30 / 1e-4, colour: "a2", label: "20 at 30 K", dx: 12, dy: -6 }],
    checks: [{ type: "point", expr: ex, x: 300, y: 2, name: "χ = 2 × 10⁻⁴ at 300 K" }, { type: "point", expr: ex, x: 30, y: 20, name: "χ = 2 × 10⁻³ at 30 K (χ ∝ 1/T)" }],
  });
}

// u17-23 Motors: starting current and back EMF
{
  const V = 24, R = 2, Iful = 3, Eb = V - Iful * R, I0 = V / R, ex = `(${V}-x)/${R}`;
  mk("u17-23", "phys-u17-motor-back-emf", "graph", {
    title: "A DC motor's current falls as its back EMF grows",
    caption: `The 2 Ω motor on 24 V draws I = (24 − ε_b)/2. At the start there is no back EMF, so I = ${I0} A, four times the running current. As it speeds up ε_b rises, until at full speed it is ${Eb} V and the current is ${Iful} A: 24 − ${Iful} × 2 = ${Eb} V.`,
    alt: `Graph of motor current against back EMF: a straight line falling from ${I0} A at 0 V to ${Iful} A at ${Eb} V.`,
    description: ["The horizontal axis is the back EMF in volts; the vertical axis is the motor current in amperes.", `With V = 24 V and R = 2 Ω, I = (24 − ε_b)/2: ${I0} A when ε_b = 0 (switch-on).`, `At full speed I = ${Iful} A, so ε_b = 24 − ${Iful} × 2 = ${Eb} V.`],
    range: { x: [0, 26], y: [0, 14] }, ticks: [[6, 12, 18, 24], [3, 6, 9, 12]], grid: [6, 3], height: [320, 300], xLabelBelow: true, axisLabels: ["ε_{b} / V", "I / A"],
    curves: [{ expr: ex, domain: [0, 24], colour: "a1", width: 3.4, label: "I = (V − ε_{b})/R", labelAt: [9, 8.8] }],
    points: [{ x: 0, y: I0, label: "12 A at start", dx: 12, dy: -8 }, { x: Eb, y: Iful, colour: "a2", label: "3 A at 18 V", dx: -8, dy: -14, anchor: "end" }],
    checks: [{ type: "point", expr: ex, x: 0, y: I0, name: "starting current 24/2 = 12 A" }, { type: "point", expr: ex, x: Eb, y: Iful, name: "running current 3 A when ε_b = 18 V" }],
  });
}

// u17-28 Boundary conditions: skin depth in copper at 1 MHz
{
  const sigma = 6e7, f = 1e6, delta = Math.sqrt(2 / (2 * Math.PI * f * MU0 * sigma)), d = Math.round(delta * 1e6), ex = `exp(-x/${d})`;
  if (d !== 65) throw new Error(`skin depth ${d}`);
  mk("u17-28", "phys-u17-skin-depth-copper", "graph", {
    title: "Skin depth of copper at 1 MHz",
    caption: `A high-frequency field enters a conductor only a short way: its amplitude falls as e^{−z/δ} with δ = √(2/(μ₀σω)) = ${f1(delta * 1e6)} μm ≈ ${d} μm for copper (σ = 6 × 10⁷ S m⁻¹) at 1 MHz. At one skin depth 37% of the surface amplitude remains; at 3δ (${3 * d} μm) only ${f1(100 * Math.exp(-3))}%. The current flows in a thin skin, so a hollow or plated conductor carries RF as well as a solid one.`,
    alt: `Graph of field amplitude against depth into copper: an exponential decay from 1 at the surface, 0.37 at ${d} μm and ${f2(Math.exp(-3))} at ${3 * d} μm.`,
    description: ["The horizontal axis is the depth into the copper in micrometres; the vertical axis is the field amplitude as a fraction of the surface value.", `The amplitude falls as e^{−z/δ} with δ = ${d} μm.`, `At z = δ = ${d} μm it is ${f2(Math.exp(-1))}; at z = 3δ = ${3 * d} μm it is ${f2(Math.exp(-3))}.`],
    range: { x: [0, 260], y: [0, 1.1] }, ticks: [[65, 130, 195, 260], [0.25, 0.5, 0.75, 1]], grid: [65, 0.25], height: [320, 300], xLabelBelow: true, axisLabels: ["depth z / μm", "amplitude / surface value"],
    curves: [{ expr: ex, colour: "a1", width: 3.4, label: "e^{−z/δ}", labelAt: [110, 0.5] }],
    points: [{ x: d, y: Math.exp(-1), label: "δ: 0.37", dx: 10, dy: -10 }, { x: 3 * d, y: Math.exp(-3), colour: "a2", label: "3δ: 0.05", dx: 6, dy: -12 }],
    checks: [{ type: "point", expr: ex, x: 0, y: 1, name: "full amplitude at the surface" }, { type: "point", expr: ex, x: d, y: Math.exp(-1), name: "37% of the surface amplitude at one skin depth, δ = 65 μm" }, { type: "point", expr: ex, x: 3 * d, y: Math.exp(-3), name: "5% at 3δ" }],
  });
}
