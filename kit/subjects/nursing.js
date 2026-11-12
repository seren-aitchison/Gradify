// The nursing adapter (NurseGradify): condition lessons cover the brief's headings, clinical schools carry an
// escalation or safety statement, medicines calculations are labelled illustrative.
import { norm } from "../course/notes.js";

const CONDITION_HEADINGS = ["definition", "epidemiology", "aetiology", "pathophysiology", "signs", "investigations", "treatment", "nursing assessment", "nursing management", "monitoring", "complications", "education", "escalation"];
const OVERVIEW_LESSONS = new Set(["introduction to disease processes", "inflammation", "infection", "immune dysfunction", "respiratory disease", "renal disease", "gastrointestinal disorders", "neurological disorders", "haematological disorders", "musculoskeletal disease", "rheumatological conditions", "skin conditions", "multimorbidity", "frailty", "palliative and end of life conditions", "cardiovascular disease"]);
const srcYear = (L) => Math.max(0, ...L.sources.map((x) => Number(String(x.date).slice(0, 4)) || 0));
function nursingRules(unit, L, text) {
  const w = [];
  const lower = text.toLowerCase();
  // School 5: each named condition covers the brief's thirteen headings
  if (unit.n === 5 && !OVERVIEW_LESSONS.has(norm(L.title))) {
    const heads = L.blocks.filter((b) => b.t === "h").map((b) => b.x.toLowerCase()).join(" | ");
    // a heading counts if its words appear in a heading ("Nursing assessment, management and monitoring" covers "nursing management")
    const missing = CONDITION_HEADINGS.filter((h) => !h.split(" ").every((w) => heads.includes(w)) && !lower.includes(h));
    if (missing.length) w.push(`condition lesson missing heading(s): ${missing.join(", ")}`);
  }
  // clinical schools: an escalation or safety line in every lesson
  if ([3, 4, 5].includes(unit.n) && !/escalat|call for (urgent |emergency )?help|emergency|local polic|supervision|query|prescriber|pharmacist|report|inform the|withhold|\bbnf\b|refer/.test(lower)) w.push("no escalation, safety or local-policy statement");
  // medicines: any worked calculation must say it's illustrative
  if (unit.n === 4 && L.blocks.some((b) => b.t === "ex") && !/illustrative/.test(lower)) w.push("worked calculation not labelled illustrative");
  return w;
}
function nursingFlags(L, text) {
  const f = [];
  if (/\b\d+(\.\d+)?\s?(mg|micrograms?|mcg|mmol|mL|ml|units|nanograms?)\b/i.test(text)) f.push("doses or drug quantities");
  if (/NEWS2|PEWS|MEOWS|mmHg|mmol\/L|SpO2|\bGCS\b|\bAVPU\b|\bscore of \d/i.test(text)) f.push("clinical thresholds or scores");
  if (/\b(escalat|sepsis|anaphyla|resuscitat|deteriorat)/i.test(text)) f.push("escalation or emergency response");
  // the NMC Code and NMC standards are current at their own dates, so only clinical guidance counts here
  if (L.sources.some((x) => x.kind === "guidance" && !/\bNMC\b/.test(x.cite) && Number(String(x.date).slice(0, 4)) < 2020)) f.push("clinical guidance dated before 2020: check for updates");
  return f;
}

export default {
  id: "nursing", name: "Nursing",
  defaults: {},
  questionTypes: [],
  qa: { expert: "a registered nurse educator", rules: nursingRules, flags: nursingFlags },
};
