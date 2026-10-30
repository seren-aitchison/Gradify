// SciGradify Physics: the syllabus plus where its notes live, handed to the course engine.
import { UNITS, TRACKS, PATHS } from "./syllabus.js";
export default {
  site: "SciGradify", slug: "physics", name: "Physics", app: "../app.html",
  units: UNITS, tracks: TRACKS, paths: PATHS,
  // the units whose notes are written so far (tests/site.test.mjs checks this matches notes/)
  written: ["u01", "u02", "u03", "u04", "u05", "u06", "u07", "u08", "u09", "u10", "u11", "u12", "u13", "u14", "u15", "u16", "u17", "u18", "u19", "u20", "u21", "u22", "u23", "u24", "u25", "u26", "u27", "u28", "u29", "u30", "u31", "u32", "u33"],
  notes: (unitId) => import(`./notes/${unitId}.js`).then((m) => m.default),
  extras: [
    ["The cell in 3D", "SciGradify's interactive 3D cell, for where physics meets biology.", "../3d.html"],
    ["Learning map", "Every SciGradify subject on one map.", "../map.html"],
    ["Notes Studio", "Turn your own physics notes and PDFs into flashcards and questions.", "../app.html#/notes"],
  ],
};
