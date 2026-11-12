// EcoGradify interactives. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Existing Gradify labs can be reused
// (load: () => import("../../labs/<area>/<file>.js")); lessons are named by title and resolved to permanent ids.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
// existing SciGradify Biology labs, reused where they teach an ecology lesson directly
const BIO = (f) => () => import(`../../labs/biology/${f}`);
export const INTERACTIVES = [
  { id: "population", file: "population.js", kind: "Simulation", title: "Population ecology",
    sub: "Logistic growth, predator–prey cycles and competition, over time and as phase plots.",
    note: "Classic Lotka–Volterra and logistic models; no age structure, space or chance.",
    schools: [2, 3], lessons: L("Logistic growth and carrying capacity", "Population cycles and fluctuations", "Exponential growth", "Predator–prey dynamics", "The competitive exclusion principle"), load: BIO("population.js") },
  { id: "food-web", file: "foodweb.js", kind: "Simulation", title: "Food webs and energy flow",
    sub: "Remove species from a woodland food web to see secondary extinctions, and follow energy up the trophic levels.",
    note: "Topological model: consumers with no food left are lost; population effects aren't modelled.",
    schools: [4], lessons: L("Food chains and food webs", "Trophic levels", "Efficiency of energy transfer"), load: BIO("foodweb.js") },
  { id: "natural-selection", file: "selection.js", kind: "Simulation", title: "Natural selection and drift",
    sub: "Moths on light or sooty bark: birds pick off the conspicuous ones and allele frequencies shift. Turn selection off to see drift.",
    note: "One gene, random mating, fixed population size, predation proportional to contrast.",
    schools: [1, 6], lessons: L("Variation and natural selection", "Adaptation to the environment"), load: BIO("selection.js") },
  { id: "photosynthesis", file: "photosynthesis.js", kind: "Simulation", title: "Photosynthesis and limiting factors",
    sub: "Rate against light, CO₂ and temperature, the compensation point, and a pondweed giving off oxygen bubbles.",
    note: "Standard response curves with illustrative numbers for a C3 leaf.",
    schools: [4], lessons: L("Photosynthesis and energy capture", "Gross and net primary productivity"), load: BIO("photosynthesis.js") },
];
