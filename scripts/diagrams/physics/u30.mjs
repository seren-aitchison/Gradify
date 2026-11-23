// Unit 30, Astrophysics. Every number in a caption or claim is computed here once, from the lesson's own worked
// example. Run: node scripts/diagrams/physics/u30.mjs
import { mk } from "./spec.mjs";

const r = (x, d = 2) => (d < 0 ? Math.round(x / 10 ** -d) * 10 ** -d : +(+x).toFixed(d));

// u30-02 main-sequence lifetime t ∝ M^(−2.5) (also the cluster turn-off age, u30-23)
{ const t = "10*x^(-2.5)", t2 = 10 * 2 ** -2.5;
  mk("u30-02", "phys-u30-main-sequence-lifetime", "graph", {
    title: "Massive stars live fast",
    also: ["u30-23"],
    caption: `Fuel grows with mass but luminosity grows much faster (L ∝ M^3.5), so lifetime falls as t ∝ M/L ∝ M^(−2.5). With the Sun at 10 Gyr, a 2 M☉ star lasts about ${r(t2, 1)} Gyr; that is also the age of a cluster whose main-sequence turn-off is at 2 M☉.`,
    alt: "Main-sequence lifetime in billions of years against mass in solar masses, falling steeply from 10 at one solar mass to 1.8 at two.",
    description: ["Lifetime = 10 Gyr × (M/M☉)^(−2.5).", `1 M☉: 10 Gyr. 2 M☉: ${r(t2, 2)} Gyr. 5 M☉: ${r(10 * 5 ** -2.5, 2)} Gyr.`, "A cluster's turn-off mass therefore dates it: stars above that mass have already left the main sequence."],
    range: { x: [0.5, 5], y: [0, 20] }, ticks: [[1, 2, 3, 4, 5], [5, 10, 15, 20]], height: [320, 300], xLabelBelow: true, axisLabels: ["mass / M☉", "lifetime / 10⁹ years"],
    curves: [{ expr: t, domain: [0.76, 5], colour: "a1" }], marks: [{ x: 2, to: t2 }],
    points: [{ x: 1, y: 10, colour: "a4", label: "Sun: 10 Gyr", dx: 10, dy: -10 }, { x: 2, y: r(t2, 4), colour: "a2", label: `${r(t2, 1)} Gyr at 2 M☉`, dx: 10, dy: -10 }],
    checks: [{ type: "point", expr: t, x: 1, y: 10, name: "the Sun lives 10 Gyr" }, { type: "point", expr: t, x: 2, y: r(t2, 8), name: `a 2 M☉ star lives ${r(t2, 2)} Gyr` }],
  }); }

// u30-07 the mass–luminosity relation L ∝ M^3.5
{ const L = "x^3.5", at = 0.5 ** 3.5;
  mk("u30-07", "phys-u30-mass-luminosity", "graph", {
    title: "The mass–luminosity relation",
    caption: `On the main sequence L ≈ L☉(M/M☉)^3.5, so a small change in mass makes a large change in brightness: a 0.5 M☉ star shines at only ${r(at, 2)} L☉, and a 2 M☉ star at ${r(2 ** 3.5, 1)} L☉.`,
    alt: "Luminosity in solar units against mass in solar units, a steep power-law curve, with 0.09 at 0.5 and 11.3 at 2 marked.",
    description: ["L/L☉ = (M/M☉)^3.5, roughly, for main-sequence stars near a solar mass.", `0.5 M☉: ${r(at, 3)} L☉.`, `2 M☉: ${r(2 ** 3.5, 2)} L☉.`],
    range: { x: [0, 2.2], y: [0, 16] }, ticks: [[0.5, 1, 1.5, 2], [4, 8, 12, 16]], height: [320, 300], xLabelBelow: true, axisLabels: ["mass / M☉", "luminosity / L☉"],
    curves: [{ expr: L, colour: "a1" }],
    points: [{ x: 0.5, y: r(at, 5), colour: "a2", label: `${r(at, 2)} L☉`, anchor: "end", dx: -4, dy: -14 }, { x: 1, y: 1, colour: "a4" }, { x: 2, y: r(2 ** 3.5, 4), colour: "a2", label: `${r(2 ** 3.5, 1)} L☉`, anchor: "end", dx: -10, dy: 0 }],
    checks: [{ type: "point", expr: L, x: 0.5, y: r(at, 8), name: `${r(at, 3)} L☉ at 0.5 M☉` }, { type: "point", expr: L, x: 1, y: 1, name: "the Sun" }],
  }); }

// u30-17 an exoplanet transit: depth (R_p/R_*)²
{ const k = 0.1, depth = k * k, lo = 1 - depth;
  mk("u30-17", "phys-u30-transit", "graph", {
    title: "A transit light curve",
    caption: `As the planet crosses its star it blocks a fraction (R_p/R_*)² of the light. A Jupiter (0.1 R☉) in front of a Sun-like star dims it by ${r(depth * 100, 0)}%; an Earth would dim it by only about 0.008%.`,
    alt: "Relative brightness against time: flat at 1, dipping by 1 percent for the duration of the transit with sloping ingress and egress, then back to 1.",
    description: ["Brightness relative to the star alone.", `During the transit it falls to ${lo}: a ${r(depth * 100, 0)}% dip, since (0.1)² = 0.01.`, "The sloping edges are ingress and egress, while the planet's disc is only partly in front of the star.", "The time axis is illustrative; the depth is from the lesson."],
    range: { x: [0, 6], y: [0.985, 1.003] }, ticks: [[1, 2, 3, 4, 5, 6], [0.99, 0.995, 1]], height: [320, 300], xLabelBelow: true, axisLabels: ["time / h (illustrative)", "relative brightness"],
    series: [{ points: [[0, 1], [1.5, 1], [1.9, lo], [4.1, lo], [4.5, 1], [6, 1]], colour: "a1", width: 3 }],
    arrows: [{ from: [3, 1], to: [3, lo], both: true, colour: "a2", label: "1% deep", labelAt: [3.25, 0.995] }],
    checks: [{ type: "point", expr: `1-${k}^2+0*x`, x: 0, y: lo, name: "depth (R_p/R_*)² = 1%" }],
  }); }

// u30-26 a flat rotation curve against the Keplerian fall-off
{ const v = 200, rd = 8, kep = `${v}*sqrt(${rd}/x)`;
  mk("u30-26", "phys-u30-rotation-curve", "graph", {
    title: "A flat rotation curve needs dark matter",
    caption: `If a galaxy's mass were all in its visible disc, orbital speeds beyond the disc would fall as 1/√r (dashed). Instead they stay flat at about ${v} km s⁻¹. Then M(r) = v²r/G grows in proportion to r: unseen mass keeps adding up, with density falling as 1/r².`,
    alt: "Orbital speed against radius: an observed flat line at 200 kilometres per second, and a dashed Keplerian curve falling from 200 at 8 kiloparsecs to 100 at 32.",
    description: [`Observed: v ≈ ${v} km s⁻¹ out to large radius.`, `Expected from visible mass alone (beyond ${rd} kpc): v = ${v}√(${rd}/r), half as fast at ${4 * rd} kpc.`, "Flat v means M(r) = v²r/G ∝ r: a halo of dark matter with ρ ∝ 1/r²."],
    range: { x: [0, 32], y: [0, 260] }, ticks: [[8, 16, 24, 32], [50, 100, 150, 200, 250]], height: [320, 300], xLabelBelow: true, axisLabels: ["radius / kpc", "orbital speed / km s⁻¹"],
    curves: [{ expr: `${v}+0*x`, domain: [rd, 32], colour: "a1", label: "observed: flat", labelAt: [20, 222] }, { expr: kep, domain: [rd, 32], colour: "a3", dash: "6 5", label: "visible mass only", labelAt: [22, 78] }],
    series: [{ points: [[0, 0], [2, 150], [4, 190], [rd, v]], colour: "a1", width: 3 }],
    checks: [{ type: "point", expr: kep, x: 4 * rd, y: v / 2, name: "Keplerian speed halves at four times the radius" }, { type: "slope", expr: `${v}^2*x`, x: 10, value: v * v, name: "M(r) = v²r/G grows linearly with r for flat v" }],
  }); }
