// HistoryGradify interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs can be reused
// (load: () => import("../../labs/<area>/<file>.js")); lessons are named by title and resolved to permanent ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
const P = (f) => () => import(`../../labs/history/${f}`);
export const INTERACTIVES = [
  { id: "source-investigation", file: "sources.js", kind: "Exercise", title: "Source investigation", sub: "Six real sources, from the Bayeux Tapestry to the Sadler Committee: judge what each can and can't show.", note: "Summaries of real sources; the judgements follow mainstream historical scholarship.", schools: [1], lessons: L("Primary and secondary sources", "Historical evidence", "Source provenance", "Reliability and usefulness", "Bias and perspective", "Evidence selection"), load: P("sources.js") },
  { id: "timeline", file: "timeline.js", kind: "Explorer", title: "Timeline, 1066–1991", sub: "Reigns, wars and events on one scale: see duration, overlap and the gaps between them.", note: "Well-established dates only; periods are conventional.", schools: [1, 2, 7], lessons: L("Chronology and periodisation", "Continuity and change", "The Wars of the Roses", "The rise of the Tudor dynasty"), load: P("timeline.js") },
  { id: "cause-and-consequence", file: "causes.js", kind: "Exercise", title: "Cause and consequence", sub: "Sort the factors behind three turning points into long-term causes, short-term causes and triggers.", note: "Classifications follow standard accounts; where they are a matter of judgement, the explanations say so.", schools: [1, 2, 7, 9], lessons: L("Cause and consequence", "The Peasants' Revolt", "The July Crisis", "The outbreak of war", "Hitler's rise to power"), load: P("causes.js") },
  { id: "chronology", file: "chronology.js", kind: "Exercise", title: "Chronology challenge", sub: "Put events in order across four rounds, from the Norman Conquest to the end of the Soviet Union.", note: "Every date is a well-established one.", schools: [1], lessons: L("Chronology and periodisation", "Continuity and change"), load: P("chronology.js") },
];
