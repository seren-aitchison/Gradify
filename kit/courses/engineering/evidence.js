// Mastery evidence maps for this course's interactives: interactive → { challenge → the lesson it is evidence for }.
// The challenge names are those each reused lab declares (as in MathGradify's and SciGradify Physics' maps); lessons
// are named by title and resolved to permanent ids. Checked by tests/interactives.test.mjs.
import { L } from "./interactives.js";
const E = (map) => Object.fromEntries(Object.entries(map).map(([task, title]) => [task, L(title)[0]]));

export const EVIDENCE = {
  explog: E({ double: "Exponentials and logarithms in engineering", decay: "Exponentials and logarithms in engineering", inverse: "Exponentials and logarithms in engineering", straight: "Exponentials and logarithms in engineering" }),
  trig: E({ neg: "Trigonometry and sinusoids", quad: "Trigonometry and sinusoids", period: "Trigonometry and sinusoids", match: "Trigonometry and sinusoids" }),
  complex: E({ i: "Complex numbers and phasors", real: "Complex numbers and phasors", unit: "Complex numbers and phasors" }),
  matrix: E({ zero: "Matrices and simultaneous equations", rot: "Matrices and simultaneous equations", flip: "Matrices and simultaneous equations", complex: "Eigenvalues and eigenvectors", area3: "Matrices and simultaneous equations" }),
  tangent: E({ close: "Differentiation and rates of change", flat: "Differentiation and rates of change", negh: "Differentiation and rates of change", three: "Differentiation and rates of change" }),
  riemann: E({ pct: "Integration in engineering", mid: "Numerical methods", neg: "Integration in engineering" }),
  roots: E({ sqrt2: "Numerical methods", fail: "Numerical methods", nobr: "Numerical methods" }),
  ode: E({ euler: "Numerical methods", rk: "Numerical methods", eq: "First-order differential equations" }),
  regression: E({ curve: "Engineering statistics", pos: "Engineering statistics", negr: "Engineering statistics", out: "Engineering statistics" }),
  clt: E({ n1: "Engineering statistics", n30: "Engineering statistics", sd: "Engineering statistics" }),
  lln: E({ k1: "Probability and reliability", k10: "Probability and reliability", six: "Probability and reliability" }),
  projectile: E({ hit: "Projectile motion", angle: "Projectile motion", moon: "Projectile motion", height: "Projectile motion" }),
  collisions: E({ swap: "Impacts", stick: "Impulse and momentum", bounce: "Impacts", explode: "Impulse and momentum" }),
  oscillator: E({ period: "Free undamped vibration", crit: "Damped vibration", res: "Forced vibration and resonance", q: "Forced vibration and resonance" }),
  circuits: E({ maxp: "Maximum power transfer", cmp: "Ohm's law and resistor networks", share: "Kirchhoff's laws", bal: "Nodal and mesh analysis" }),
  transients: E({ tau: "RC and RL transients", half: "RC and RL transients", dis: "RC and RL transients", rl: "RC and RL transients" }),
  gas: E({ mb: "Ideal gases", boyle: "Ideal gases", charles: "Ideal gases", hot: "Ideal gases" }),
};

// Exploration challenges (earn XP, never mastery), as classified in the source courses.
export const EXPLORATION = { gas: ["mb"], transients: ["dis"], explog: ["straight"], trig: ["quad"], clt: ["n1"], lln: ["k1", "k10", "six"], regression: ["curve"], tangent: ["negh", "three"] };
