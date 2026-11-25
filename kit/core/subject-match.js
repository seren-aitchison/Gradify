// Which Gradify subject a module or course name belongs to, so it takes that subject site's icon and colour
// ("Organic Chemistry" → SciGradify's atom, "Contract Law" → LawGradify's scales). It reads the words of the name
// against each subject site's description, its search keywords (kit/core/sites.js) and the extra module words below,
// rarer words counting for more. Instant, works offline and nothing leaves the browser. Pure, so Node can test it.
import { GROUPS, KEYWORDS } from "./sites.js";
import { words } from "../learning/topic-match.js";

// words that turn up in university module names but not in a site's own description
export const MODULE_WORDS = {
  SciGradify: "biology biological biochemistry genetics genomics microbiology cell cellular molecular organic inorganic physical analytical chemistry chemical physics quantum mechanics thermodynamics electromagnetism optics astrophysics astronomy cosmology immunology biomedical forensic laboratory virology protein",
  EconGradify: "economics economic economy microeconomics macroeconomics econometrics monetary fiscal inflation",
  GeographyGradify: "geography geographical gis cartography geomorphology glaciation coasts rivers urban population migration tectonics fieldwork",
  EcoGradify: "ecology ecosystems conservation environmental biodiversity marine zoology botany plant plants evolution evolutionary geology earth oceanography wildlife",
  MathGradify: "statistics statistical stats probability calculus algebra linear analysis numerical mathematics mathematical econometrics differential equations geometry topology quantitative",
  PsychGradify: "neuroscience cognitive cognition developmental psychology psychological perception personality neuropsychology psychopathology",
  MedGradify: "anatomy physiology pathology clinical medicine surgery surgical cardiology haematology epidemiology",
  LawGradify: "law legal contract contracts tort torts criminal equity trusts land constitutional jurisprudence administrative commercial evidence litigation",
  BusinessGradify: "business marketing management strategy strategic organisational organizational leadership operations entrepreneurship hrm consumer",
  FinanceGradify: "accounting accounts finance financial audit auditing taxation corporate banking actuarial",
  InvestorGradify: "investment investments derivatives portfolio asset securities",
  EngineerGradify: "engineering mechanics structures structural circuits electronics electronic fluids fluid dynamics materials thermofluids control aerospace manufacturing robotics",
  "TechGradify": "programming software computing computer computation algorithms databases networks networking machine learning artificial intelligence cyber security web development informatics",
  LitGradify: "literature literary english poetry novel novels shakespeare drama creative writing victorian romantic modernism",
  HistoryGradify: "history historical medieval modern ancient early classics classical archaeology",
  LanguageGradify: "french spanish german italian japanese chinese mandarin arabic portuguese russian linguistics translation language",
  ArtGradify: "art fine design illustration photography film visual sculpture",
  MusicGradify: "music musical composition performance harmony musicology",
  SportGradify: "sport sports exercise coaching biomechanics kinesiology physical activity",
  NurseGradify: "nursing midwifery",
  PharmaGradify: "pharmacy pharmacology pharmaceutical pharmaceutics",
  HealthGradify: "nutrition dietetics public health wellbeing",
  VetGradify: "veterinary animal animals",
  DentalGradify: "dental dentistry oral",
  SocGradify: "sociology sociological politics political anthropology social policy international relations criminology philosophy",
};
// sites that are a stage of life or a product, not a subject
const NOT_SUBJECTS = new Set(["UnderGradify", "PostGradify", "ProGradify", "EduGradify", "YouthGradify", "JuniorGradify", "Klerio", "InternshipGradify", "CreateGradify"]);
export const FALLBACK = "UnderGradify";

const ALL = GROUPS.flatMap((g) => g.items);
const SUBJECTS = ALL.filter((s) => !NOT_SUBJECTS.has(s.n)).map((s) => ({ site: s, strong: new Set(words(`${KEYWORDS[s.n] || ""} ${MODULE_WORDS[s.n] || ""}`)), weak: new Set(words(`${s.who || ""} ${s.d || ""}`)) }));
// how many subjects use a word: one they all share says little
const DF = new Map();
for (const s of SUBJECTS) for (const w of new Set([...s.strong, ...s.weak])) DF.set(w, (DF.get(w) || 0) + 1);
const idf = (w) => Math.log(1 + SUBJECTS.length / (DF.get(w) || SUBJECTS.length));

/** the subject site for a module name, or null when nothing matches: { site, score } */
export function subjectOf(name) {
  const ws = words(name);
  if (!ws.length) return null;
  let best = null;
  for (const s of SUBJECTS) {
    let score = 0, strong = 0;
    for (const w of ws) { if (s.strong.has(w)) { score += idf(w) * 3; strong++; } else if (s.weak.has(w)) score += idf(w); }
    // a guess from description words alone ("Field skills", "Research methods") isn't good enough: those take the
    // degree's main subject instead
    if ((strong || score >= 6) && (!best || score > best.score)) best = { site: s.site, score };
  }
  return best;
}

/**
 * A subject for every module: a name that matches nothing (a dissertation, "Module 3") takes the subject most of the
 * other modules have, so a Biology degree's dissertation is Biology too; with no matches at all, UnderGradify.
 * @param {string[]} names
 * @returns {{ site: object, matched: boolean }[]}
 */
export function subjectsFor(names) {
  const found = names.map((n) => subjectOf(n));
  const count = new Map();
  for (const f of found) if (f) count.set(f.site.n, (count.get(f.site.n) || 0) + 1);
  const main = [...count].sort((a, b) => b[1] - a[1])[0]?.[0];
  const fallback = ALL.find((s) => s.n === (main || FALLBACK));
  return found.map((f) => (f ? { site: f.site, matched: true } : { site: fallback, matched: false }));
}
