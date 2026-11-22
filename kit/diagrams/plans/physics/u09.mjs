// Physics unit 09, Elasticity and Solid Mechanics. Specs are written by scripts/diagrams/physics/u09.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const CALC = "a worked numerical example in a formula; a picture would only restate the substitution";
const ADV = "an advanced, equation-led topic; a picture would not recompute any number in the lesson";
export default [
  ["u09-01", null, CALC],
  ["u09-02", null, CALC],
  ["u09-03", null, CALC],
  ["u09-04", null, CALC],
  ["u09-05", "graph", "phys-u09-hooke-spring", "F against x for the spring: gradient k = 50 N/m, 2.0 N at 4 cm and 5.0 N at 10 cm"],
  ["u09-06", "graph", "phys-u09-unloading", "stress–strain loading past the elastic limit, with the unloading line parallel to the elastic one and the permanent strain"],
  ["u09-07", null, CALC],
  ["u09-08", "graph", "phys-u09-spring-energy", "F–x for k = 800 N/m: the triangle under the line is the 1.0 J that launches the ball at 10 m/s"],
  ["u09-09", null, CALC],
  ["u09-10", "graph", "phys-u09-shelf-sag", "sag along the 2 m shelf: zero at the supports and 1.9 cm at the middle"],
  ["u09-11", null, CALC],
  ["u09-12", null, "a qualitative account of why a flaw concentrates stress; the numbers belong to u09-19"],
  ["u09-13", "graph", "phys-u09-maxwell-relaxation", "stress relaxation σ₀e^{−t/τ} with τ = η/E = 1 s"],
  ["u09-14", null, ADV],
  ["u09-15", null, CALC],
  ["u09-16", null, "needs renderer mohr-circle: an equal-aspect Mohr circle for σxx = 80, σyy = 20, σxy = 40 MPa checking the principal stresses 100 and 0 MPa"],
  ["u09-17", null, ADV],
  ["u09-18", null, "a qualitative account of buckling and snap-through; no number to recompute"],
  ["u09-19", "graph", "phys-u09-critical-crack", "K = Yσ√(πa) crossing K_IC = 50 MPa√m at the critical crack length 15.9 mm"],
];
