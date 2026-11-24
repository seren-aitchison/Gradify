// Physics unit 37 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u37-MM).
// Specs are written by scripts/diagrams/physics/u37.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const ARG = "an argument or explanation, carried in the text";
export default [
  ["u37-01", null, CALC],
  ["u37-02", null, "needs renderer: the Bloch sphere with a state vector placed from its amplitudes"],
  ["u37-03", null, "needs renderer: quantum circuit diagrams with the state traced gate by gate"],
  ["u37-04", null, "needs renderer: quantum circuit diagrams"],
  ["u37-05", null, CALC],
  ["u37-06", null, CALC],
  ["u37-07", "graph", "phys-u37-bell-correlation", "singlet correlation −cos θ against a local model: S = 2√2 beats the bound of 2"],
  ["u37-08", null, "needs renderer: the teleportation circuit"],
  ["u37-09", null, ARG],
  ["u37-10", null, CALC],
  ["u37-11", "trend", "phys-u37-grover-speedup", "10¹² items: 5 × 10¹¹ classical queries against 7.9 × 10⁵ with Grover"],
  ["u37-12", null, CALC],
  ["u37-13", "trend", "phys-u37-grover-n4", "Grover for N = 4: certainty after one iteration, 0.25 after two"],
  ["u37-14", null, CALC],
  ["u37-15", null, CALC],
  ["u37-16", "graph", "phys-u37-t1-decay", "e^(−t/T₁) with T₁ = 100 μs: 0.82 after 20 μs"],
  ["u37-17", null, CALC],
  ["u37-18", null, ARG],
  ["u37-19", null, ARG],
  ["u37-20", null, CALC],
  ["u37-21", null, CALC],
  ["u37-22", null, CALC],
  ["u37-23", null, CALC],
  ["u37-24", null, CALC],
  ["u37-25", null, CALC],
  ["u37-26", null, CALC],
];
