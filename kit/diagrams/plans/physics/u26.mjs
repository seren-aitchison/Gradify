// Physics unit 26 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u26-MM).
// Specs are written by scripts/diagrams/physics/u26.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
export default [
  ["u26-01", null, CALC],
  ["u26-02", null, CALC],
  ["u26-03", null, CALC],
  ["u26-04", null, CALC],
  ["u26-05", null, "why a thrown ball's path is a geodesic is an argument, carried in the text"],
  ["u26-06", null, "needs renderer: parallel transport round a triangle on a sphere, with the rotation angle recomputed"],
  ["u26-07", null, "the weak-field limit is a derivation, carried in the text"],
  ["u26-08", null, CALC],
  ["u26-09", "graph", "phys-u26-schwarzschild-radius", "r_s = 2GM/c², 2.95 km per solar mass: 29.5 km at 10 M☉"],
  ["u26-10", "graph", "phys-u26-kerr-horizon", "the Kerr horizon shrinking with spin to half r_s at χ = 1"],
  ["u26-11", null, CALC],
  ["u26-12", null, CALC],
  ["u26-13", null, CALC],
  ["u26-14", null, "needs renderer: light bending round a mass, with the deflection angle recomputed"],
  ["u26-15", "graph", "phys-u26-clock-rate-horizon", "a static clock's rate √(1 − r_s/r) falling to zero at the horizon"],
  ["u26-16", null, CALC],
  ["u26-17", null, CALC],
  ["u26-18", null, CALC],
  ["u26-19", null, CALC],
  ["u26-20", null, CALC],
  ["u26-21", null, "why binary pulsars test GR is an argument, carried in the text"],
  ["u26-22", null, "the cost of numerical waveforms is an argument, carried in the text"],
  ["u26-23", null, CALC],
];
