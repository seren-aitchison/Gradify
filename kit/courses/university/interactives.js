// UnderGradify interactives, all reused from PsychGradify and SocGradify where they genuinely teach a study-skills
// lesson. Each entry: { id, title, sub, kind, note, schools, lessons: L("Lesson title", …), load }.
// kind: Experiment, Simulation, Illustrative model, Exercise, Explorer or Tool. Lessons are named by title and
// resolved to permanent ids, so a wrong title fails loudly.
import { IDS } from "./ids.js";
const byTitle = new Map(Object.entries(IDS).map(([id, t]) => [t.toLowerCase(), id]));
export const L = (...titles) => titles.map((t) => { const id = byTitle.get(t.toLowerCase()); if (!id) throw new Error(`interactives: no lesson "${t}"`); return id; });
const P = (f) => () => import(`../../labs/psychology/${f}`);
const SOC = (f) => () => import(`../../labs/social/${f}`);

// Candidates reused from PsychGradify and SocGradify, kept here for the coordinating session: registering an
// interactive also needs shared registration (the interactive count, evidence maps, fingerprints and sw.js), which a
// subject builder doesn't edit. Uncomment an entry once it is registered.
/*
const CANDIDATES = [
  // the science of learning
  { id: "serial-position", file: "memory.js", mode: "serial", kind: "Experiment", title: "Free recall and the serial position curve", sub: "Learn a 15-word list and recall it, straight away or after a distractor task: see what a single exposure leaves behind and why review matters.", note: "PsychGradify's experiment: your own recall, scored by exact spelling; one person's curve is noisy until you have several runs.", schools: [2], lessons: L("What learning is: memory and understanding", "Forgetting and the forgetting curve", "Encoding and levels of processing"), load: P("memory.js") },
  { id: "digit-span", file: "memory.js", mode: "span", kind: "Experiment", title: "Digit span", sub: "Measure how many digits you can hold at once, then try chunking: the limit behind cognitive load.", note: "PsychGradify's experiment: a standard forward digit span procedure with two attempts per length.", schools: [2], lessons: L("Working memory and cognitive load"), load: P("memory.js") },
  { id: "memory-models", file: "memory.js", mode: "models", kind: "Explorer", title: "Models of memory", sub: "The multi-store and working memory models, component by component, with the evidence for and against each.", note: "PsychGradify's summaries of the published models.", schools: [2], lessons: L("Working memory and cognitive load", "What learning is: memory and understanding"), load: P("memory.js") },
  // critical thinking and evidence
  { id: "biases", file: "biases.js", kind: "Exercise", title: "Cognitive bias explorer", sub: "Answer the classic framing, conjunction, anchoring, base-rate and availability problems, then compare yourself with the original participants.", note: "PsychGradify's exercise: published results quoted from the original papers; problems paraphrased.", schools: [4], lessons: L("Cognitive biases in reasoning", "Flaws in reasoning"), load: P("biases.js") },
  { id: "study-critique", file: "critique.js", kind: "Exercise", title: "Study critique", sub: "Find the key flaw in six invented studies: causation, power, demand, p-hacking, unrepresentative samples and attrition.", note: "PsychGradify's exercise: invented study summaries.", schools: [4, 7], lessons: L("Evaluating evidence", "Evaluating sources"), load: P("critique.js") },
  // numeracy and data
  { id: "stats-describe", file: "../social/statslab.js", mode: "describe", kind: "Tool", title: "Statistics workspace: describing data", sub: "Paste in data or generate a set: mean, median, mode, standard deviation, a confidence interval and a histogram.", note: "SocGradify's workspace: sample statistics (n − 1); example data simulated.", schools: [8], lessons: L("Descriptive statistics", "Tables and charts"), load: SOC("statslab.js") },
  { id: "correlation", file: "../social/statslab.js", mode: "correlation", kind: "Tool", title: "Correlation visualiser", sub: "Anscombe's quartet and your own points: Pearson's r, the regression line and why you should always plot the data.", note: "SocGradify's tool: Anscombe's (1973) data are real; your own points are illustrative.", schools: [8], lessons: L("Correlation and causation", "Reading graphs critically"), load: SOC("statslab.js") },
  { id: "hypothesis-test", file: "../social/statslab.js", mode: "ttest", kind: "Simulation", title: "What a p-value means", sub: "Run one study or a thousand: p-values, power and false positives, with an independent t-test.", note: "SocGradify's simulation: simulated samples from normal populations with a true effect you choose.", schools: [8], lessons: L("Statistical significance in plain terms"), load: SOC("statslab.js") },
];
*/
export const INTERACTIVES = [];
