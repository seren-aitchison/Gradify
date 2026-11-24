// Physics unit 32 diagram plan: rows per kit/diagrams/BUILDERS.md, one or more per written lesson (u32-MM).
// Specs are written by scripts/diagrams/physics/u32.mjs.
const CALC = "a calculation method, carried by the worked example; a picture would not add to it";
const ARG = "an argument or explanation, carried in the text";
export default [
  ["u32-01", null, "needs renderer: a cross-section of Earth's layers with depths and states"],
  ["u32-02", null, CALC],
  ["u32-03", null, ARG],
  ["u32-04", "graph", "phys-u32-geotherm", "30 °C per km from 10 °C at the surface: 160 °C at 5 km"],
  ["u32-05", "graph", "phys-u32-travel-times", "P and S travel-time lines: a 30 s gap puts the quake 240 km away"],
  ["u32-06", null, CALC],
  ["u32-07", "trend", "phys-u32-gutenberg-richter", "ten times as many quakes per magnitude step down (b = 1)"],
  ["u32-08", null, CALC],
  ["u32-09", null, CALC],
  ["u32-10", null, ARG],
  ["u32-11", "graph", "phys-u32-inclination-latitude", "tan I = 2 tan λ: a 30° inclination formed at 16° latitude"],
  ["u32-12", null, ARG],
  ["u32-13", null, CALC],
  ["u32-14", null, CALC],
  ["u32-15", null, CALC],
  ["u32-16", null, CALC],
  ["u32-17", null, CALC],
  ["u32-18", null, CALC],
  ["u32-19", null, ARG],
  ["u32-20", "graph", "phys-u32-tsunami-speed", "v = √(gd): 198 m s⁻¹ over 4000 m of ocean"],
];
