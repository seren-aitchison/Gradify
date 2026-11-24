// University degree-classification rules, each one taken from that university's own published regulations.
//
// The rule of this file: never invent a regulation. Every rule below was read on the university's own page or PDF on
// the date in `checked`, is quoted word for word in `quote`, and links to that page in `source`. Anything a page does
// not state is left out (null), and the tracker then falls back to the student's own settings. Where Gradify has to
// interpret a rule to compute it (for example treating "final-year modules" as level 6), the `note` says so.
//
// Programmes can differ from the university-wide rule (professional degrees, accredited courses, joint honours,
// years abroad). The tracker says so and points to the programme specification.
//
// Used by the degree tracker (assets/study-tools.js): weights set the year-2 / final-year split (`w3`), and the
// rounding, boundaries and borderline rules feed degreeIntel. Tests: tests/uni-rules.test.mjs.

/** @typedef {{ url: string, title: string }} Source */

export const CHECKED = "2026-11-24";

const BHAM_DOS = { url: "https://www.birmingham.ac.uk/documents/university/governance/degree-outcomes-statement.pdf", title: "University of Birmingham, Degree Outcomes Statement 2026" };
const BHAM_BCA = { url: "https://intranet.birmingham.ac.uk/student/academic-support/registry/documents/public/exams/2026-guidance-for-exam-boards-information-for-students.pdf", title: "University of Birmingham, Examinations Guidance 2026: information for students" };
const BRIS = { url: "https://www.bristol.ac.uk/academic-quality/assessment/regulations-and-code-of-practice-for-taught-programmes/awards-ug-modular/", title: "University of Bristol, Regulations and Code of Practice for Taught Programmes 2026/27, section 30b" };
const KCL = { url: "https://www.kcl.ac.uk/assets/arqs/academic-manual/current-year/degree-outcomes-statement.pdf", title: "King's College London, Degree Outcomes Statement 2026/27" };
const LEEDS = { url: "https://secretariat.leeds.ac.uk/home/academic-regulations-and-taught-student-policies-and-procedures/rules-for-award/", title: "University of Leeds, Rules for Award (Iteration B)" };
const NOTTS = { url: "https://www.nottingham.ac.uk/qualitymanual/assessment-awards-and-deg-classification/ug-deg-class-sept20.aspx", title: "University of Nottingham Quality Manual, Undergraduate degree classification from September 2020" };

/**
 * One university's rules for a three-year bachelor's degree with honours.
 *   applies     who the rules are for, in the university's words where it gives them
 *   year        the academic year of the regulations read
 *   weights     { w3, label, scope, quote, source } or { options: [{ w3, label }], ... } (year 1 counts for none of these)
 *   boundaries  { values: [70, 60, 50, 40], quote, source } or null when the page doesn't state them
 *   rounding    { kind: "integer" | "lift", lift, quote, source, note } or null. `lift`: how far under a boundary an
 *               unrounded average still counts as that boundary (0.5 for rounding to a whole number, half up)
 *   borderline  { at, from, to, on, automatic, tests, combine, unchecked, quote, source, note } or null
 *               at: boundaries with a borderline zone; the zone is [boundary - from, boundary - to) on the average
 *               (on: "raw") or on the rounded mark (on: "rounded"); tests: what lifts a student, all computable from
 *               the module marks: { years, credits | share | weightedShare, cls: "higher" | "atLeast", modules }
 */
export const UNI_RULES = [
  {
    id: "birmingham", name: "University of Birmingham", short: "Birmingham",
    applies: "Undergraduate bachelor's degrees", year: "2025/26", verified: true, checked: CHECKED,
    weights: { w3: 75, label: "Year 2: 25%, final year: 75%", scope: "for most programmes", source: BHAM_DOS,
      quote: "Year 3 modules contribute more towards final degree classification than the modules in year 2 (25% in year 2 and 75% in year 3 for most programmes of study)." },
    boundaries: { values: [70, 60, 50, 40], source: BHAM_DOS, quote: "1st 70% or above; 2:1 60-69%; 2:2 50-59%; 3rd 40-49%" },
    rounding: null,
    borderline: {
      at: [70, 60, 50, 40], from: 2, to: 0.5, on: "raw", automatic: true, source: BHAM_BCA,
      quote: "At least 120 credits at Stages 2 and 3 (i.e. years 2 and 3) must be in the higher class than the overall weighted mean mark, and of these at least 60 credits must have been achieved at Stage 3; AND At least 100 credits at Stage 3 must be in the same class as, or higher than, the overall weighted mean mark; AND The mark for the final year project/dissertation must be in the higher class than the overall weighted mean mark.",
      zoneQuote: "for consideration for a 1st ≥ 68.0 - < 69.5%", zoneSource: BHAM_DOS,
      combine: "all",
      tests: [{ years: [2, 3], credits: 120, cls: "higher" }, { years: [3], credits: 60, cls: "higher" }, { years: [3], credits: 100, cls: "atLeast" }],
      unchecked: "Your final-year project or dissertation mark must also be in the higher class.",
      note: "Birmingham's statement doesn't say how an average from 69.5 to just under 70 is treated, so Gradify doesn't round it.",
    },
  },
  {
    id: "bristol", name: "University of Bristol", short: "Bristol",
    applies: "Undergraduate modular programmes (not Medicine, Dentistry or Veterinary Sciences)", year: "2026/27", verified: true, checked: CHECKED,
    weights: { options: [{ w3: 60, label: "Arts, Law and Social Sciences: 0:40:60" }, { w3: 75, label: "Science and Engineering: 0:25:75" }],
      scope: "for a three-year bachelor's degree, by faculty. Health and Life Sciences lists both 0:25:75 and 0:40:60, so check your programme", source: BRIS,
      quote: "30.57. The year weightings for calculating the final programme mark and degree classification are: … Arts, Law and Social Sciences 0:40:60 … Science and Engineering 0:25:75" },
    boundaries: { values: [70, 60, 50, 40], source: BRIS, quote: "First class honours 70 and above; Second class honours, first division 60-69; Second class honours, second division 50-59; Third class honours 40-49" },
    rounding: { kind: "integer", lift: 0.5, source: BRIS,
      quote: "The result of the calculation should then be rounded to the nearest integer. This must be done PRIOR to determining whether the final programme mark is within the classification boundary range.",
      note: "Gradify rounds .5 up." },
    borderline: {
      at: [70, 60, 50], from: 2, to: 0, on: "rounded", automatic: true, source: BRIS,
      quote: "For final programme marks that are within the borderline of a classification boundary, a higher classification is awarded if 50% or more of the rounded individual unit marks, weighted by credit point value and year of study, which contribute to classification are achieved at the higher class or classes.",
      zoneQuote: "First class / 2i borderline = 68-69; 2.i / 2.ii borderline = 58-59; 2.ii / third class borderline = 48-49", zoneSource: BRIS,
      combine: "all", tests: [{ years: [2, 3], weightedShare: 0.5, cls: "higher" }], unchecked: "", note: "",
    },
  },
  {
    id: "kcl", name: "King's College London", short: "King's",
    applies: "Undergraduate degrees", year: "2026/27", verified: true, checked: CHECKED,
    weights: { w3: 60, label: "0:2:3 (year 2: 40%, final year: 60%)", scope: "", source: KCL,
      quote: "Since 2022/23, the academic regulations have stipulated that the undergraduate first year is not included in the degree algorithm. … In 2022/23, the algorithm weighting was also changed from a 1:3:5 weighting to a 0:2:3 weighting." },
    boundaries: null,
    rounding: null,
    borderline: {
      at: [70, 60, 50], from: 2, to: 0, on: "raw", automatic: true, source: KCL,
      quote: "Students receive an automatic upgrade to the higher classification if their C-score is within 2% of a higher classification boundary (68/58/48) and where at least 60 credits at level 6 (level 7 for Integrated Masters programmes) or above are in a higher classification, in a minimum of two modules (known as the 2% rule).",
      combine: "all", tests: [{ years: [3], credits: 60, cls: "higher", modules: 2 }], unchecked: "",
      note: "Gradify counts your final-year modules as level 6.",
    },
  },
  {
    id: "leeds", name: "University of Leeds", short: "Leeds",
    applies: "Students who started their programme at Leeds in or after 2022/23 and their final year in or after 2024/25 (Rules for Award, Iteration B)", year: "Iteration B (current)", verified: true, checked: CHECKED,
    weights: { w3: 66.67, label: "1:2 (year 2: 33.3%, final year: 66.7%)", scope: "", source: LEEDS,
      quote: "10.5 The degree class for a Bachelor's degree with Classified Honours is determined according to the 1:2 weighting of grades between programme year 2 and 3, respectively." },
    boundaries: { values: [70, 60, 50, 40], source: LEEDS, quote: "10.7 The classification thresholds at class boundaries are: Class IIi / Class I 70.0; Class IIii / Class IIi 60.0; Class III / Class IIii 50.0; Fail / Class III 40.0" },
    rounding: { kind: "lift", lift: 0.5, source: LEEDS,
      quote: "All classification averages that fall within 0.5 of a boundary will be automatically lifted to the boundary. For example, a raw classification average of 69.5, for a classified honours degree, will be rounded up to 70.0 and a first class degree awarded.",
      note: "Averages are expressed to one decimal place, then lifted." },
    borderline: null,
  },
  {
    id: "nottingham", name: "University of Nottingham", short: "Nottingham",
    applies: "Undergraduates who entered their Qualifying year or Part I from September 2020", year: "2020/21 onwards (page updated June 2026)", verified: true, checked: CHECKED,
    weights: null,
    weightsNote: { source: NOTTS, quote: "The relative weightings of Part I/II/III marks are given in programme specifications." },
    boundaries: { values: [70, 60, 50, 40], source: NOTTS, quote: "I = 70%+; II-1 = 60% - 69%; II-2 = 50% - 59%; III = 40% - 49%" },
    rounding: null,
    borderline: {
      at: [70, 60, 50], from: 1, to: 0, on: "raw", automatic: true, source: NOTTS,
      quote: "An undergraduate student must be given the higher class if either of the following criteria are met: i) Two thirds or more of the final stage credits are in the higher class; ii) Two thirds or more of the final and penultimate stage credits are in the higher class.",
      zoneQuote: "Only the following rounded marks will be regarded as “borderline”: 69 Borderline I; 59 Borderline II-1; 49 Borderline II-2. At the III/Fail boundary there is no borderline.", zoneSource: NOTTS,
      combine: "any", tests: [{ years: [3], share: 2 / 3, cls: "higher" }, { years: [2, 3], share: 2 / 3, cls: "higher" }], unchecked: "",
      note: "Nottingham rounds the average first; its page points to separate marking regulations for how, so Gradify treats 69.0 to 69.9 as the First borderline.",
    },
  },
];

export const ruleById = (id) => UNI_RULES.find((r) => r.id === id) || null;

/** the year-2 / final-year split a rule sets, or null when it doesn't set one (or offers a choice) */
export const ruleW3 = (rule, option = 0) => rule?.weights ? (rule.weights.options ? rule.weights.options[option]?.w3 ?? null : rule.weights.w3) : null;

const BOUNDS = [70, 60, 50, 40];
/** the boundaries a rule uses (the standard UK ones when its page doesn't state them) */
export const boundariesOf = (rule) => rule?.boundaries?.values || BOUNDS;

/** the mark a rule classifies on: Bristol rounds to a whole number, Leeds lifts to a boundary within 0.5 */
export function effectiveMark(avg, rule) {
  if (avg == null || !rule?.rounding) return avg;
  if (rule.rounding.kind === "integer") return Math.round(avg);
  if (rule.rounding.kind === "lift") {
    const a = Math.round(avg * 10) / 10;
    const b = boundariesOf(rule).find((x) => a < x && x - a <= rule.rounding.lift + 1e-9);
    return b ?? a;
  }
  return avg;
}

/** the lowest unrounded average that counts as `boundary` under a rule */
export function threshold(boundary, rule) {
  if (!rule?.rounding) return boundary;
  if (rule.rounding.kind === "integer") return boundary - 0.5;
  if (rule.rounding.kind === "lift") return boundary - rule.rounding.lift - 0.05;   // 69.45 shows as 69.5, then lifts
  return boundary;
}

/** the borderline zone an average is in under a rule: { next, from, to } (the next class up), or null */
export function zoneOf(avg, rule) {
  const B = rule?.borderline; if (avg == null || !B) return null;
  const m = B.on === "rounded" ? effectiveMark(avg, rule) : avg;
  for (const b of B.at) if (m >= b - B.from && m < b - B.to) return { next: b, from: b - B.from, to: b - B.to };
  return null;
}

/**
 * Does a borderline student meet the rule's criteria, from their module marks? rows: [{ mark, credits, year }],
 * w3: the final-year weight used for "weighted" shares. Returns { met: true | false | null, results, unchecked }:
 * met is null when nothing could be checked (no marks), and stays a check on the marks Gradify has, so modules not
 * entered yet can change it.
 */
export function borderlineCheck(rows, avg, w3, rule) {
  const z = zoneOf(avg, rule); if (!z) return null;
  const B = rule.borderline, higher = z.next, current = boundariesOf(rule).find((b) => b < higher) ?? 0;
  const marked = rows.filter((r) => r.mark !== "" && r.mark != null && Number.isFinite(Number(r.mark)) && Number(r.credits) > 0);
  const inYears = (ys) => marked.filter((r) => ys.includes(Number(r.year)));
  const ok = (r, cls) => { const m = B.on === "rounded" ? Math.round(Number(r.mark)) : Number(r.mark); return cls === "higher" ? m >= higher : m >= current; };
  const wy = (y) => (Number(y) === 3 ? w3 : 100 - w3) / 100;
  const results = B.tests.map((t) => {
    const set = inYears(t.years), hit = set.filter((r) => ok(r, t.cls));
    const cr = (xs) => xs.reduce((a, r) => a + Number(r.credits), 0);
    if (!set.length) return { test: t, met: null, value: 0 };
    if (t.credits != null) { const v = cr(hit); return { test: t, value: v, met: v >= t.credits && hit.length >= (t.modules || 1) }; }
    if (t.share != null) { const v = cr(hit) / cr(set); return { test: t, value: v, met: v >= t.share - 1e-9 }; }
    if (t.weightedShare != null) {
      const w = (xs) => xs.reduce((a, r) => a + Number(r.credits) * wy(r.year), 0);
      const v = w(set) ? w(hit) / w(set) : 0; return { test: t, value: v, met: v >= t.weightedShare - 1e-9 };
    }
    return { test: t, met: null, value: 0 };
  });
  const known = results.filter((r) => r.met !== null);
  const met = !known.length ? null : B.combine === "any" ? (results.some((r) => r.met) ? true : known.length === results.length ? false : null) : (results.some((r) => r.met === false) ? false : known.length === results.length ? true : null);
  return { zone: z, met, results, unchecked: B.unchecked || "" };
}

/** a plain-English line for each test, for the Rules page and the borderline insight */
export function describeTest(t) {
  const where = t.years.length > 1 ? "years 2 and 3" : t.years[0] === 3 ? "your final year" : "year 2";
  const cls = t.cls === "higher" ? "the higher class" : "your current class or higher";
  if (t.credits != null) return `${t.credits} credits or more in ${where} in ${cls}${t.modules ? `, across at least ${t.modules} modules` : ""}`;
  if (t.share != null) return `${Math.abs(t.share - 2 / 3) < 1e-6 ? "two thirds" : `${Math.round(t.share * 100)}%`} or more of the credits in ${where} in ${cls}`;
  if (t.weightedShare != null) return `${Math.round(t.weightedShare * 100)}% or more of your marks in ${where}, weighted by credits and year, in ${cls}`;
  return "";
}
