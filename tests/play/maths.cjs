// Play-through tests for MathGradify's interactives (scripts/play-labs.cjs): each meets every challenge through the
// lab's own controls (sliders, buttons, typing, and points moved with the arrow keys), as a learner would.
const times = (n, k) => Array(n).fill(k);
module.exports = {
  circles: [
    // A at 200°, B at 340°, C at 100°: moving B to 280° leaves an 80° arc, so the angle at C is 40°
    { handle: "B", keys: times(12, "Shift+ArrowLeft"), expect: "c40" },
    { seg: "Same segment" }, { handle: "D", keys: times(12, "Shift+ArrowRight"), expect: "seg" },
    { seg: "Angle in a semicircle" }, { handle: "C", keys: times(12, "Shift+ArrowRight"), expect: "semi" },
    // A 180°, B 0°, C 160°, D 178°: B to −42° makes the arc B–C–D 220°, so the angle at A is 110°
    { seg: "Cyclic quadrilateral" }, { handle: "B", keys: [...times(8, "Shift+ArrowLeft"), "ArrowLeft", "ArrowLeft"], expect: "cyc" },
  ],
  quadratics: [
    { slider: "b", value: -2 }, { slider: "c", value: -3, expect: "roots" },
    { slider: "c", value: 1, expect: "rep" },
    { slider: "b", value: -4, expect: "vertex" },
    { slider: "a", value: -1 }, { slider: "b", value: 0 }, { slider: "c", value: -1, expect: "none" },
  ],
  trig: [
    { slider: "Angle", value: 45 }, { slider: "Angle", value: 120, expect: "neg" }, { slider: "Angle", value: 200 }, { slider: "Angle", value: 300, expect: "quad" },
    { slider: "Frequency", value: 2, expect: "period" },
    { slider: "Amplitude", value: 3 }, { slider: "Vertical shift", value: 1, expect: "match" },
  ],
  explog: [
    { slider: "Base", value: 1.41, expect: "double" },
    { slider: "Base", value: 0.5, expect: "decay" },
    { slider: "Base", value: 10 }, { type: "Solve", text: "1000", expect: "inverse" },
    { seg: "Log scale", expect: "straight" },
  ],
};
