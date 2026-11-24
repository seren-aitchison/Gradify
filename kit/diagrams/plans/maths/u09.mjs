// Unit 9, Analysis: plan. Rows: kit/diagrams/BUILDERS.md.
const SYMBOLIC = "a symbolic derivation or abstract definition: the notes' worked steps carry it, and a picture would not show the argument";
const ABSTRACT = "an abstract structure in an infinite-dimensional space; no picture of the example would be honest";
export default [
  ["u09-01", "graph", "maths-u09-epsilon-n", "(2n + 1)/(n + 3) → 2: the terms enter the ε = 0.5 band after N = 5/ε − 3 = 7"],
  ["u09-02", "graph", "maths-u09-lorentzian-area", "the residue result ∫ dx/(1 + x²) = π as the area under the curve"],
  ["u09-03", null, SYMBOLIC],
  ["u09-04", "bar-model", "maths-u09-cantor-stages", "Cantor set stages 0, 1, 2: lengths kept 1, 2/3, 4/9, … → 0"],
  ["u09-05", "graph", "maths-u09-power-areas", "xⁿ on [0, 1] for n = 1, 2, 5, 20: areas 1/(n + 1) → 0"],
  ["u09-06", null, "the delta function and distributional derivatives are not functions that can be plotted; the notes' steps carry the example"],
  ["u09-07", null, ABSTRACT],
  ["u09-08", "graph", "maths-u09-fixed-point", "iterating T(x) = x/2 + 1 from 0: 1, 1.5, 1.75, 1.875 → the fixed point 2"],
  ["u09-09", "graph", "maths-u09-sin-norm", "‖sin x‖² = ∫ sin²x dx = π on [−π, π] as an area"],
  ["u09-10", null, "operator norms of diagonal operators and the shift act on infinite sequences; the worked example is a norm computed from entries"],
  ["u09-11", "graph", "maths-u09-characteristic", "det(A − λI) = (2 − λ)² − 1 crosses zero at the eigenvalues 1 and 3"],
  ["u09-12", "graph", "maths-u09-range-spectrum", "σ(x² + 1) on C[0, 1] is the range [1, 2] of the function"],
  ["u09-13", null, ABSTRACT],
  ["u09-14", null, ABSTRACT],
];
