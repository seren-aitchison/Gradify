// Unit 8, Multivariable and Vector Calculus. Rows: kit/diagrams/BUILDERS.md.
const D3 = "its worked example is a surface, solid or field in three dimensions and the maths renderers draw the plane only (needs renderer: 3D surfaces and fields)";
const ALG = "a symbolic calculation done step by step in the notes; there is no picture of the example that shows more than its steps";
export default [
  ["u08-01", "graph", "maths-u08-partial-slice", "f(x, 2) = 2x² + 12x with its tangent at (1, 14): the partial derivative f_x = 16 as a slope"],
  ["u08-02", "geometry", "maths-u08-directional", "∇f = (2, 4) and the unit vector (0.6, 0.8): D_u f = 4.4"],
  ["u08-03", "geometry", "maths-u08-gradient-level", "∇f = (2, 4) is perpendicular to the level curve's tangent x + 2y = 3"],
  ["u08-03", "lab", "descent", "follow the gradient downhill on a two-variable function"],
  ["u08-04", null, D3],
  ["u08-05", "geometry", "maths-u08-triangle-region", "the region 0 ≤ y ≤ x ≤ 1 with a strip: inner limits 0 to x"],
  ["u08-06", null, D3],
  ["u08-07", "transform", "maths-u08-jacobian-area", "x = u + v, y = u − v sends the unit square to a square of area 2 = |J|"],
  ["u08-08", null, "the example is the general ellipse with symbols a and b; a drawing would need chosen numbers that are not the lesson's, and the maths renderers draw no ellipses (needs renderer: conics)"],
  ["u08-09", null, ALG],
  ["u08-10", null, D3],
  ["u08-11", "geometry", "maths-u08-curl-rotation", "F = (−y, x) at four points circulates anticlockwise: curl = 2"],
  ["u08-12", null, ALG],
  ["u08-13", null, "the example integrates along the parabola (t, t²) and checks with a potential; the value 1 is a calculation the notes carry, not a shape"],
  ["u08-14", null, D3], ["u08-15", null, D3],
  ["u08-16", "geometry", "maths-u08-green-circle", "F = (−y, x) is tangent with length 1 on the unit circle: circulation 2π = 2 × area"],
  ["u08-17", null, D3], ["u08-18", null, D3],
  ["u08-19", "lab", "descent", "minimising a quadratic by gradient steps"],
  ["u08-20", null, ALG],
  ["u08-21", null, "the extremals are straight lines, y = ax + b; the lesson's example is a symbolic Euler–Lagrange calculation"],
  ["u08-22", "graph", "maths-u08-half-derivative", "x, its half-derivative 2√(x/π) and the constant 1 = the whole derivative"],
];
