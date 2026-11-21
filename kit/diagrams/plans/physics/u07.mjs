// Physics unit 07, Gravitation and Orbital Mechanics. Specs are written by scripts/diagrams/physics/u07.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const METHOD = "a calculation method or set of rules, taught by worked examples rather than a picture";
const CALC = "a worked numerical example in a formula; a picture would only restate the substitution";
export default [
  ["u07-01", "lab", "orbits", "set up a two-body orbit and watch the inverse-square force bend the path"],
  ["u07-02", "graph", "phys-u07-g-inside-outside", "g against r/R: linear inside a uniform Earth, 1/r² outside, with g = 4.9 at R/2"],
  ["u07-03", null, CALC],
  ["u07-04", "graph", "phys-u07-potential-well", "φ = −GM/r with the surface and 400 km values, so the 3.7 GJ lift is the gap between two points on the well"],
  ["u07-05", "lab", "orbits", "give a planet more and more speed until the orbit opens at escape velocity"],
  ["u07-06", "lab", "orbits", "circular orbit speed against radius, and Newton's cannon"],
  ["u07-07", "lab", "orbits", "ellipse shapes: vary speed at perihelion and see e and the speeds change"],
  ["u07-07", null, "needs renderer orbit: an equal-aspect ellipse with focus, perihelion 0.6 AU and aphelion 35 AU, checking a = (rp+ra)/2 and e = (ra−rp)/(ra+rp)"],
  ["u07-08", "lab", "orbits", "compare T² with a³ on two orbit sizes and check equal areas in equal times"],
  ["u07-08", "graph", "phys-u07-kepler-period", "T = a^{3/2}: Earth at (1, 1) and Jupiter at 5.2 AU, 11.86 years"],
  ["u07-09", "lab", "orbits", "compare low, geostationary and eccentric orbits"],
  ["u07-10", "lab", "orbits", "watch kinetic and potential energy exchange while the total stays constant"],
  ["u07-10", "graph", "phys-u07-orbit-energies", "K, U and E against radius for a 500 kg satellite, with ΔE = +1.78 GJ between 7000 and 8000 km"],
  ["u07-11", null, CALC],
  ["u07-12", null, "the tidal acceleration is a formula 2GMr/d³ and a comparison of two numbers; the bulges need a two-body geometry renderer that does not exist yet"],
  ["u07-13", null, METHOD],
  ["u07-14", null, "needs renderer lagrange: the rotating-frame map of the five points with the Sun–Earth L2 distance (Hill-sphere estimate) computed from the masses"],
  ["u07-15", null, "the restricted three-body problem is a qualitative account of chaos; a trajectory picture would need a numerical integrator renderer"],
  ["u07-16", null, METHOD],
  ["u07-17", null, "needs renderer transfer-orbit: the Hohmann ellipse between circles of 1 AU and 1.52 AU, checking a = (r1+r2)/2 and the transfer time from Kepler's third law"],
  ["u07-18", null, "perturbations are listed with their sources; a picture of an inclination formula adds nothing"],
  ["u07-19", null, CALC],
  ["u07-20", null, CALC],
  ["u07-21", null, "needs renderer lens-geometry: a deflection-angle diagram with the Einstein radius computed from the lens mass and distances"],
  ["u07-22", null, "properties and detection are descriptive; the strain example is a one-line product"],
];
