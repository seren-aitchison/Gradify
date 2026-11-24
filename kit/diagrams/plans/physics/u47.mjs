// Physics unit 47 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u47-MM).
// Specs are written by scripts/diagrams/physics/u47.mjs.
const C = "a calculation method, carried by the worked example; a picture would not add to it";
const A = "an argument or explanation, carried in the text";
const H = "a narrative of people, dates and ideas; a timeline would only list what the text already says";
const P = "a philosophical position and its objections, carried in the text";
export default [
  ["u47-01", null, C],
  ["u47-02", null, C],
  ["u47-03", "graph", "phys-u47-resonance-peak", "the resonance peak for Q = 200 (ζ = 0.0025): half-power points 5 Hz apart at 1000 Hz"],
  ["u47-04", null, C],
  ["u47-05", null, C],
  ["u47-06", null, C],
  ["u47-07", null, C],
  ["u47-08", null, C],
  ["u47-09", null, C],
  ["u47-10", "graph", "phys-u47-transmissibility", "transmissibility against frequency ratio with ζ = 0: T = 1/24 at 25 Hz on 5 Hz mounts, isolation only above √2"],
  ["u47-11", null, C],
  ["u47-12", null, C],
  ["u47-13", null, C],
  ["u47-14", null, C],
  ["u47-15", null, C],
  ["u47-16", null, C],
  ["u47-17", null, C],
  ["u47-18", "graph", "phys-u47-reliability", "R = e^(−λt) for λ = 10⁻⁵ per hour: 0.990 at 1000 h, 1/e at the MTTF of 10⁵ h"],
];
