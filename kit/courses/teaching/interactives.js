// EduGradify interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs are reused
// (PsychGradify's memory lab) where they genuinely teach a lesson; lessons are named by title and resolved to ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
const P = (f) => () => import(`../../labs/psychology/${f}`);
export const INTERACTIVES = [
  { id: "digit-span", file: "memory.js", mode: "span", kind: "Experiment", title: "Digit span", sub: "Measure your own short-term memory span, then try chunking: feel the limit that cognitive load theory is built on.", note: "PsychGradify's experiment: a standard forward digit span procedure with two attempts per length; your responses stay on this device.", schools: [1], lessons: L("Working memory and its limits", "Cognitive load theory: Sweller 1988"), load: P("memory.js") },
  { id: "memory-models", file: "memory.js", mode: "models", kind: "Explorer", title: "Models of memory", sub: "The multi-store and working memory models, component by component, with the evidence for and against each.", note: "PsychGradify's explorer: summaries of the published models.", schools: [1], lessons: L("Working memory and its limits", "Learning as a change in long-term memory"), load: P("memory.js") },
  { id: "serial-position", file: "memory.js", mode: "serial", kind: "Experiment", title: "Free recall and the serial position curve", sub: "Learn a 15-word list and recall it, straight away or after a distractor task, and see what is remembered and what is lost.", note: "PsychGradify's experiment: your own recall, scored by exact spelling; one person's curve is noisy until you have several runs.", schools: [1], lessons: L("Forgetting and desirable difficulties", "Long-term memory and schemas"), load: P("memory.js") },
];
