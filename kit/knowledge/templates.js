// Educational levels and lesson templates: how a lesson is built for a learner at a given level. A template is
// structure and rules, not appearance: which components a lesson has, in what order, which kinds of knowledge fill
// each one, how deep it may go, how many questions of which kinds, and whether a visual is required. The assembler
// (scripts/knowledge/assemble.mjs) chooses a template from the requirement's level and subject; QA
// (scripts/knowledge/qa.mjs) measures the lesson against the same template. Pure, so tests and the site share it.

/** levels, in order of depth. `rank` compares them; equivalents share a rank (GCSE and National 5). */
export const LEVELS = {
  primary: { name: "Primary", rank: 1, ages: "5–11" },
  ks3: { name: "Key Stage 3", rank: 2, ages: "11–14" },
  gcse: { name: "GCSE", rank: 3, ages: "14–16" },
  nat5: { name: "National 5", rank: 3, ages: "14–16" },
  as: { name: "AS level", rank: 4, ages: "16–17" },
  alevel: { name: "A level", rank: 4, ages: "16–18" },
  higher: { name: "Higher", rank: 4, ages: "16–17" },
  advhigher: { name: "Advanced Higher", rank: 4.5, ages: "17–18" },
  ug: { name: "Undergraduate", rank: 5, ages: "18+" },
  pg: { name: "Postgraduate", rank: 6, ages: "21+" },
};
export const rankOf = (level) => { const l = LEVELS[level]; if (!l) throw new Error(`unknown level ${level}`); return l.rank; };
/** does a knowledge item's level range include this level? */
export const inRange = (range, level) => rankOf(range.from) <= rankOf(level) && rankOf(level) <= rankOf(range.to || "pg");

// Components, in the order a lesson shows them. `kinds`: the knowledge kinds that fill it. `source`: where else
// its content comes from (the requirement, prerequisites, generated questions). `required`: QA fails without it.
const C = {
  objectives: { name: "Learning objectives", source: "requirement", required: true },
  prior: { name: "What you need to know first", source: "prereqs" },
  explain: { name: "Explanation", kinds: ["concept", "definition", "fact"], required: true },
  mechanism: { name: "How it happens", kinds: ["mechanism"] },
  visual: { name: "Diagram", source: "visual" },
  terms: { name: "Key terms", source: "terms", required: true },
  quantitative: { name: "Equations and calculations", kinds: ["equation", "method"] },
  worked: { name: "Worked example", kinds: ["worked-example"] },
  practical: { name: "Practical work", kinds: ["practical"] },
  misconceptions: { name: "Common mistakes", kinds: ["misconception"] },
  apply: { name: "Applying it", kinds: ["application"] },
  data: { name: "Data to interpret", kinds: ["dataset"] },
  aim: { name: "Aim", source: "practical", required: true },
  equipment: { name: "Equipment", source: "practical", required: true },
  variables: { name: "Variables", source: "practical", required: true },
  method: { name: "Method", source: "practical", required: true },
  safety: { name: "Safety", source: "practical", required: true },
  results: { name: "Recording results", source: "practical", required: true },
  analysis: { name: "Analysing results", kinds: ["method", "worked-example", "dataset"], required: true },
  evaluation: { name: "Evaluating the investigation", source: "practical", required: true },
  evidence: { name: "Evidence and sources", source: "sources" },
  practice: { name: "Practice questions", source: "questions", required: true },
  summary: { name: "Summary", source: "summary", required: true },
  connections: { name: "Connections", source: "related" },
};
const T = (o) => ({ subjects: ["*"], ...o, components: o.components.map((id) => ({ id, ...C[id] })) });

/**
 * readability: target Flesch–Kincaid grade range for the lesson's prose (a guide: QA flags, a reviewer decides).
 * visual: "required" (a lesson with a mechanism or process must have one), "when-useful", or "optional".
 * questions: minimum count and the kinds expected. depth: knowledge above this rank is not used.
 */
export const TEMPLATES = {
  "primary-science": T({ level: ["primary"], subjects: ["biology", "chemistry", "physics", "science"], components: ["objectives", "explain", "visual", "terms", "apply", "practice", "summary"], readability: [2, 6], visual: "required", questions: { min: 3, kinds: ["choice", "tf"] }, voice: "short sentences, everyday examples, one idea at a time" }),
  "ks3-science": T({ level: ["ks3"], subjects: ["biology", "chemistry", "physics", "science"], components: ["objectives", "prior", "explain", "mechanism", "visual", "terms", "practical", "misconceptions", "apply", "practice", "summary"], readability: [5, 9], visual: "required", questions: { min: 4, kinds: ["choice", "tf"] }, voice: "foundational understanding, key vocabulary, simple particle models" }),
  "gcse-practical": T({ level: ["gcse", "nat5"], subjects: ["biology", "chemistry", "physics", "combined-science"], for: "practical", components: ["objectives", "prior", "aim", "equipment", "variables", "method", "safety", "results", "analysis", "visual", "evaluation", "misconceptions", "terms", "practice", "summary", "connections"], readability: [6, 11], visual: "required", questions: { min: 5, kinds: ["choice", "multi", "order", "num"] }, voice: "a practical a student can carry out: what to do, why each step matters, how to analyse and evaluate it" }),
  "gcse-science": T({ level: ["gcse", "nat5"], subjects: ["biology", "chemistry", "physics", "combined-science"], components: ["objectives", "prior", "explain", "mechanism", "visual", "terms", "quantitative", "worked", "practical", "data", "misconceptions", "apply", "practice", "summary", "connections"], readability: [6, 11], visual: "required", questions: { min: 5, kinds: ["choice", "tf", "num"] }, voice: "the specification's terminology, exam-style application, worked calculations" }),
  "alevel-science": T({ level: ["as", "alevel", "higher", "advhigher"], subjects: ["biology", "chemistry", "physics"], components: ["objectives", "prior", "explain", "mechanism", "visual", "terms", "quantitative", "worked", "practical", "data", "misconceptions", "apply", "practice", "summary", "connections"], readability: [8, 13], visual: "required", questions: { min: 5, kinds: ["choice", "tf", "num"] }, voice: "mechanisms in depth, quantitative treatment, practical and exam skills" }),
  "ug-science": T({ level: ["ug"], subjects: ["biology", "chemistry", "physics"], components: ["objectives", "prior", "explain", "mechanism", "quantitative", "visual", "worked", "data", "misconceptions", "apply", "terms", "practice", "evidence", "summary", "connections"], readability: [10, 16], visual: "when-useful", questions: { min: 4, kinds: ["choice", "tf", "num"] }, voice: "academic depth, quantitative relationships, evidence and primary sources" }),
  "pg-science": T({ level: ["pg"], subjects: ["biology", "chemistry", "physics"], components: ["objectives", "prior", "explain", "mechanism", "quantitative", "evidence", "apply", "terms", "practice", "summary", "connections"], readability: [12, 18], visual: "when-useful", questions: { min: 3, kinds: ["choice", "num"] }, voice: "research literature, methods, synthesis and critique" }),
};

/**
 * The template for a level, subject and kind of requirement: a required practical gets the practical template where
 * the level has one; otherwise the subject's template for the level, else the level's general one.
 */
export function templateFor(level, subject, { kind = null } = {}) {
  const all = Object.entries(TEMPLATES).filter(([, t]) => t.level.includes(level)), special = all.filter(([, t]) => t.for && t.for === kind);
  const fits = special.length ? special : all.filter(([, t]) => !t.for);
  const hit = fits.find(([, t]) => t.subjects.includes(subject)) || fits.find(([, t]) => t.subjects.includes("*"));
  if (!hit) throw new Error(`no lesson template for ${subject} at ${level}`);
  return { id: hit[0], ...hit[1] };
}

/** a template's depth limit: the highest rank of its levels */
export const depthOf = (t) => Math.max(...t.level.map(rankOf));
