// Physics unit 44 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u44-MM).
// Specs are written by scripts/diagrams/physics/u44.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const ARG = "an argument or explanation, carried in the text";
export default [
  ["u44-01", null, CALC],
  ["u44-02", null, CALC],
  ["u44-03", null, CALC],
  ["u44-04", "graph", "phys-u44-cryo-cost", "minimum work per watt removed against cold temperature, rejection at 300 K: 2.9 W at 77 K, 74 W at 4 K"],
  ["u44-05", null, CALC],
  ["u44-06", "graph", "phys-u44-gaussian-beam", "HeNe beam radius against distance: w0 = 0.5 mm, Rayleigh range 1.24 m, divergence 0.40 mrad"],
  ["u44-07", null, CALC],
  ["u44-08", null, CALC],
  ["u44-09", null, CALC],
  ["u44-10", "graph", "phys-u44-reflection", "|Γ| against load impedance on a 50 Ω line: 0.2 and VSWR 1.5 for 75 Ω"],
  ["u44-11", null, CALC],
  ["u44-12", null, CALC],
  ["u44-13", "graph", "phys-u44-tunnel-current", "STM current against gap increase for φ = 4.5 eV: about 9× smaller for 0.1 nm"],
  ["u44-14", null, CALC],
  ["u44-15", "graph", "phys-u44-bragg-peaks", "Cu Kα Bragg angles for FCC copper: (111) at 43.3°, (200) at 50.4°, (100) and (110) absent"],
  ["u44-16", null, CALC],
  ["u44-17", null, CALC],
  ["u44-18", null, CALC],
  ["u44-19", null, CALC],
  ["u44-20", null, ARG],
  ["u44-21", null, CALC],
  ["u44-22", null, CALC],
];
