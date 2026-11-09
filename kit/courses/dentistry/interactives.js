// DentalGradify interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs are reused
// (load: () => import("../../labs/<area>/<file>.js")); lessons are named by title and resolved to permanent ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
const BIO = (f) => () => import(`../../labs/biology/${f}`);
export const INTERACTIVES = [
  { id: "action-potential", file: "../biology/action-potential.js", kind: "Simulation", title: "Nerve conduction and sodium-channel block", sub: "The Hodgkin–Huxley model: find the threshold and refractory period, then block the voltage-gated sodium channels, the target of every dental local anaesthetic, and watch the action potential fail.", note: "SciGradify Biology's simulation of one patch of squid axon membrane (the published 1952 equations); tetrodotoxin stands in for a local anaesthetic, which blocks the same channels from inside the axon and depends on pH and nerve-fibre size. It says nothing about doses.", schools: [11, 1], lessons: L("Local anaesthetics: pharmacology", "Complications of local anaesthesia", "The trigeminal nerve"), load: BIO("action-potential.js") },
];
