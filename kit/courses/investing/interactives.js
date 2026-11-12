// InvestorGradify interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs can be reused
// (load: () => import("../../labs/<area>/<file>.js")); lessons are named by title and resolved to permanent ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
// Recommended for registration by the coordinating session (adding them changes shared manifests): MathGradify's
// explog.js for "Simple and compound interest", "Doubling time and the rule of 72", "The time value of money";
// PsychGradify's biases.js for "Loss aversion and prospect theory", "Anchoring and investment decisions".
export const INTERACTIVES = [];
