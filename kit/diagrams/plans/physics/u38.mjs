// Physics unit 38 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u38-MM).
// Specs are written by scripts/diagrams/physics/u38.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const ARG = "an argument or explanation, carried in the text";
export default [
  ["u38-01", null, CALC],
  ["u38-02", null, CALC],
  ["u38-03", "graph", "phys-u38-fixed-points", "ẋ = x − x³: fixed points at −1, 0, 1 with stability from the slope"],
  ["u38-04", null, "needs renderer: a phase portrait with trajectories in the (x, v) plane"],
  ["u38-05", "graph", "phys-u38-saddle-node", "ẋ = r + x²: stable and unstable branches ±√(−r) merging at r = 0"],
  ["u38-06", null, "needs renderer: the logistic map's bifurcation diagram"],
  ["u38-07", "lab", "pendulum", "watch a driven pendulum become chaotic"],
  ["u38-08", "graph", "phys-u38-error-growth", "an error of 10⁻⁶ rad growing to 1 rad in about 7 s (λ = 2 s⁻¹)"],
  ["u38-08", "lab", "pendulum", "compare two pendulums started almost together"],
  ["u38-09", null, ARG],
  ["u38-10", null, "needs renderer: the Hénon or Lorenz attractor"],
  ["u38-11", "graph", "phys-u38-logistic-fixed-point", "2.5x(1 − x) meeting y = x at 0.6, a stable fixed point"],
  ["u38-12", null, CALC],
  ["u38-13", null, CALC],
  ["u38-14", null, CALC],
  ["u38-15", null, CALC],
  ["u38-16", null, CALC],
  ["u38-17", null, CALC],
  ["u38-18", null, CALC],
  ["u38-19", null, CALC],
  ["u38-20", "lab", "pendulum", "drive a pendulum into chaos"],
  ["u38-21", "graph", "phys-u38-herd-immunity", "the herd immunity threshold 1 − 1/R₀: 67% for R₀ = 3"],
];
