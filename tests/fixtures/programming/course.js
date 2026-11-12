// An example TechGradify course: proof that the shared engine runs a programming course through the programming
// adapter (kit/subjects/programming.js), with no change to the engine. Used by tests/cross-site.test.mjs; it isn't
// published. TechGradify (techgradify.com) is a separate site, which would hold its real course like this.
import { defineCourse } from "../../../kit/subjects/define.js";
import programming from "../../../kit/subjects/programming.js";

const units = [
  { id: "m01", n: 1, title: "Python Basics", lessons: [
    { id: "m01-01", title: "Variables and Assignment", module: "Values" },
    { id: "m01-02", title: "Numbers and Arithmetic", module: "Values" },
    { id: "m01-03", title: "Conditionals", module: "Control flow" },
    { id: "m01-04", title: "Loops", module: "Control flow" },
  ] },
  { id: "m02", n: 2, title: "Functions", lessons: [
    { id: "m02-01", title: "Defining Functions", module: "Functions" },
  ] },
];

export default defineCourse(programming, {
  slug: "programming-example", name: "Programming (example)",
  units,
  tracks: [{ name: "Foundations", from: "#ff5a4d", to: "#f59e0b", units: [1, 2] }],
  paths: [{ name: "Start coding", sub: "From variables to functions.", units: [1, 2] }],
  written: ["m01", "m02"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  // the concept graph, in the same format as maths: functions build on values and control flow
  concepts: { modules: { "m01/Control flow": ["m01/Values"], "m02/Functions": ["m01/Values", "m01/Control flow"] } },
});
