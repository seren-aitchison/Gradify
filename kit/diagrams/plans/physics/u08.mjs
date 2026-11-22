// Physics unit 08, Fluid Mechanics. Specs are written by scripts/diagrams/physics/u08.mjs.
//   [lessonId, renderer, diagramId, what it shows] | [lessonId, "lab", labId, what it lets you do] | [lessonId, null, reason]
const CALC = "a worked numerical example in a formula; a picture would only restate the substitution";
const DEF = "a definition or short list of properties that a picture would not teach";
const ADV = "an advanced, equation-led topic with no lesson number a picture could recompute";
export default [
  ["u08-01", null, CALC],
  ["u08-02", "graph", "phys-u08-pressure-depth", "gauge pressure ρgh against depth, reaching 110 MPa at 10.9 km in the Mariana Trench"],
  ["u08-03", null, CALC],
  ["u08-04", "vectors", "phys-u08-crown-forces", "free-body diagram of the crown in water: W = 7.84 N, T = 6.86 N, F_B = 0.98 N, so ρ = 8000 kg m⁻³"],
  ["u08-05", "graph", "phys-u08-gate-pressure", "the pressure triangle on the 3 m gate: the area under p = ρgh times the 2 m width is 88 kN"],
  ["u08-06", null, "a qualitative description of steady flow; needs a streamline renderer that does not exist, and no number to check"],
  ["u08-07", null, CALC],
  ["u08-08", null, CALC],
  ["u08-09", null, CALC],
  ["u08-10", null, CALC],
  ["u08-11", null, "laminar and turbulent flow are shown best by streamline pictures: needs renderer streamlines (a flow field with a Reynolds-number regime)"],
  ["u08-12", null, CALC],
  ["u08-13", "graph", "phys-u08-poiseuille-profile", "parabolic speed profile in the needle: 16.7 m/s on the axis, and its integral is Q = 1.05 mL/s"],
  ["u08-14", null, CALC],
  ["u08-15", null, "needs renderer boundary-layer: the growing layer along a plate with δ ∝ √x computed from ν and U"],
  ["u08-16", null, CALC],
  ["u08-17", null, CALC],
  ["u08-18", null, DEF],
  ["u08-19", null, ADV],
  ["u08-20", null, ADV],
  ["u08-21", "graph", "phys-u08-free-vortex", "v = Γ/2πr for Γ = 2 m² s⁻¹: 3.2 m/s at 0.1 m, halving when r doubles"],
  ["u08-22", null, "a qualitative account of instabilities; no number to recompute"],
  ["u08-23", null, "needs renderer mach-cone: the Mach cone with sin μ = 1/Ma, 30° at Ma = 2"],
  ["u08-24", null, ADV],
  ["u08-25", null, "a computational workflow (mesh refinement); a picture would only decorate"],
];
