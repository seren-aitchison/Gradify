// Unit 17, Topology and Advanced Pure Mathematics. Rows: kit/diagrams/BUILDERS.md.
const SYM = "a symbolic or definitional argument laid out in the notes' worked steps; a picture would only decorate it";
const SURF = (what) => `needs renderer surface/polyhedron drawing: ${what}`;
export default [
  ["u17-01", null, SURF("the cube's surface deformed into a sphere (V − E + F = 8 − 12 + 6)")],
  ["u17-02", "number-line", "maths-u17-interior-closure", "interior (0, 1), closure [0, 1] and boundary {0, 1} of [0, 1)"],
  ["u17-03", null, "the three open sets ∅, {a}, {a, b} are a list of subsets checked by unions and intersections in the notes; no spatial picture"],
  ["u17-04", "geometry", "maths-u17-three-metrics", "distance from (0, 0) to (3, 4): 7 taxicab, 5 Euclidean, 4 maximum"],
  ["u17-05", "graph", "maths-u17-preimage-square", "y = x² with the band 1 < y < 4 and its preimage (−2, −1) ∪ (1, 2)"],
  ["u17-06", "graph", "maths-u17-tan-homeomorphism", "tan(π(x − ½)) mapping (0, 1) onto ℝ"],
  ["u17-07", "number-line", "maths-u17-no-finite-subcover", "U_n = (1/n, 1) for n = 2 to 5 leave (0, 1/5] uncovered"],
  ["u17-08", "number-line", "maths-u17-four-components", "ℝ minus {0, 1, 2} as four open intervals"],
  ["u17-09", null, SURF("the tetrahedron and octahedron (4 − 6 + 4 = 6 − 12 + 8 = 2)")],
  ["u17-10", "number-line", "maths-u17-winding-sum", "winding 3 anticlockwise then 1 clockwise: class 3 − 1 = 2"],
  ["u17-11", "geometry", "maths-u17-annulus-retraction", "radial deformation of the annulus 1 ≤ |z| ≤ 2 onto |z| = 1.5"],
  ["u17-12", null, "b₀ − b₁ + b₂ = 1 − 2 + 1 = 0 is three numbers added; the torus itself needs a surface renderer"],
  ["u17-13", "geometry", "maths-u17-dtheta-circle", "dθ as the unit tangent field on the unit circle, ∮ dθ = 2π"],
  ["u17-14", null, SURF("the height function on a torus with its four critical points")],
  ["u17-15", null, "needs renderer knot diagram: the trefoil with its three coloured strands"],
  ["u17-16", "geometry", "maths-u17-stereographic-charts", "stereographic projection from the north and south poles: two charts cover the sphere"],
  ["u17-17", "geometry", "maths-u17-stokes-square", "∮ x dy round the unit square: only the edge x = 1 contributes, total 1 = area"],
  ["u17-18", null, SURF("the cylinder and Möbius band with their boundary circles")],
  ["u17-19", "geometry", "maths-u17-stereographic-charts", "ℂP¹ as the plane plus a point at infinity: the same stereographic picture"],
  ["u17-20", "graph", "maths-u17-plane-curve-genus", "genus (d − 1)(d − 2)/2: cubic 1, quartic 3"],
  ["u17-21", null, SYM],
  ["u17-22", null, "needs renderer category diagram: one object with the three arrows 0, 1, 2 of ℤ₃"],
];
