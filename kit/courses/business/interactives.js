// BusinessGradify interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs are reused
// (load: () => import("../../labs/<area>/<file>.js")); lessons are named by title and resolved to permanent ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
const SOC = (f) => () => import(`../../labs/social/${f}`);
export const INTERACTIVES = [
  // the shared social-science statistics lab (also used by PsychGradify and SocGradify)
  { id: "forecasting", file: "../social/statslab.js", mode: "correlation", kind: "Tool", title: "Correlation and regression explorer", sub: "Anscombe's quartet and your own points: Pearson's r, Spearman's rho, the regression line, R² and residuals, the tools behind a simple sales forecast.", note: "Anscombe's (1973) data are real; your own points are illustrative. A regression line describes association in past data, not cause.", schools: [10], lessons: L("Correlation and regression for forecasting", "Data-driven decision-making"), load: SOC("statslab.js") },
];
