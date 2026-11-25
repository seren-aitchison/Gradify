// Subjects and education stages: what someone studies, and where they are in their education. These are the two
// "start anywhere" registries the curriculum graph (kit/curriculum/graph.js) adds to the qualification registries
// (kit/curriculum/uk.js, kit/curriculum/world.js), so a learner can begin from Biology, or from "I'm at university",
// as easily as from AQA or England.
//
// A subject is not a site or a course. Biology is a subject; SciGradify is the site where Gradify teaches it; "biology"
// is the course. One subject can be taught in several courses, and one site can host several subjects.
//   id        stable, lower case
//   courses   the Gradify courses (kit/courses/<slug>) that teach this subject as their main subject
//   uk        the subject key its specifications use in kit/curriculum/uk.js (SPECS[].subject), when it isn't the id
//   related   other subjects with a genuine overlap, each with the overlap itself: [[subjectId, "what they share"]].
//             Listed once, on either subject; the graph shows it from both. A link here is a pointer between subjects,
//             never a claim that one course covers the other's content.
//
// Stages follow ISCED 2011 (the `level` field of kit/curriculum/world.js), named the way learners say them. A stage's
// courses are Gradify's courses for that stage as a whole (GCSE Core, University Study Skills), not every course a
// learner at that stage might use.

export const SUBJECTS = [
  { id: "biology", name: "Biology", courses: ["biology"], aliases: ["life science", "bio"] },
  { id: "chemistry", name: "Chemistry", courses: ["chemistry"], aliases: ["chem"] },
  { id: "physics", name: "Physics", courses: ["physics"] },
  { id: "maths", name: "Mathematics", courses: ["maths"], aliases: ["maths", "math", "statistics"] },
  { id: "ecology", name: "Ecology and environmental science", courses: ["ecology"], aliases: ["environment", "environmental science"] },
  { id: "computing", name: "Computer science", courses: ["computing"], aliases: ["computing", "programming", "coding"] },
  { id: "engineering", name: "Engineering", courses: ["engineering"] },
  { id: "medicine", name: "Medicine", courses: ["medicine"], aliases: ["medical"] },
  { id: "nursing", name: "Nursing", courses: ["nursing"], aliases: ["midwifery"] },
  { id: "pharmacy", name: "Pharmacy", courses: ["pharmacy"], aliases: ["pharmacology"] },
  { id: "dentistry", name: "Dentistry", courses: ["dentistry"], aliases: ["dental"] },
  { id: "veterinary", name: "Veterinary science", courses: ["veterinary"], aliases: ["vet"] },
  { id: "health", name: "Health and wellbeing", courses: ["health"] },
  { id: "sport", name: "Sport and exercise science", courses: ["sport"], aliases: ["pe", "physical education"] },
  { id: "psychology", name: "Psychology", courses: ["psychology"] },
  { id: "sociology", name: "Sociology", courses: ["sociology"], aliases: ["social science"] },
  { id: "history", name: "History", courses: ["history"] },
  { id: "literature", name: "English literature", courses: ["literature"], aliases: ["english"] },
  { id: "law", name: "Law", courses: ["law"], aliases: ["legal"] },
  { id: "business", name: "Business and management", courses: ["business"] },
  { id: "finance", name: "Accounting and finance", courses: ["finance"], aliases: ["accounting"] },
  { id: "investing", name: "Investing", courses: ["investing"], aliases: ["investment"] },
  { id: "art", name: "Art and design", courses: ["art"] },
  { id: "design", name: "Design thinking and creativity", courses: ["design"] },
  { id: "music", name: "Music", courses: ["music"] },
  { id: "spanish", name: "Spanish", courses: ["spanish"] },
  { id: "japanese", name: "Japanese", courses: ["japanese"] },
  { id: "teaching", name: "Teaching and education", courses: ["teaching"], aliases: ["education", "teacher training"] },
];

export const RELATED = [
  ["biology", "chemistry", "Biochemistry: the molecules of life"],
  ["biology", "ecology", "Ecosystems, populations and biodiversity"],
  ["biology", "medicine", "Human physiology and medical biochemistry"],
  ["biology", "veterinary", "Animal physiology"],
  ["chemistry", "physics", "Atomic structure, energy and thermodynamics"],
  ["chemistry", "pharmacy", "Medicinal chemistry"],
  ["chemistry", "ecology", "Climate and atmospheric chemistry"],
  ["physics", "maths", "Mechanics and mathematical models"],
  ["physics", "engineering", "Mechanics, materials and electricity"],
  ["maths", "engineering", "Engineering mathematics"],
  ["maths", "computing", "Algorithms, logic and discrete mathematics"],
  ["maths", "finance", "Financial mathematics and statistics"],
  ["computing", "engineering", "Systems and electronics"],
  ["medicine", "nursing", "Clinical care"],
  ["medicine", "pharmacy", "Pharmacology and therapeutics"],
  ["medicine", "dentistry", "Anatomy and clinical practice"],
  ["health", "sport", "Exercise, nutrition and wellbeing"],
  ["psychology", "sociology", "Social psychology and research methods"],
  ["sociology", "history", "Social history"],
  ["history", "literature", "Texts in their historical context"],
  ["business", "finance", "Accounting and financial management"],
  ["finance", "investing", "Markets, valuation and risk"],
  ["business", "law", "Company and commercial law"],
  ["art", "design", "Visual composition and design practice"],
];

export const STAGES = [
  { id: "early-years", name: "Early years", ages: "0–5", levels: [0], courses: [] },
  { id: "primary", name: "Primary school", ages: "5–11", levels: [1], courses: ["primary"] },
  { id: "secondary", name: "Secondary school", ages: "11–16", levels: [2], courses: ["gcse"] },
  { id: "upper-secondary", name: "Sixth form and upper secondary", ages: "16–18", levels: [3], courses: [] },
  { id: "post-secondary", name: "Further and vocational education", ages: "16+", levels: [4, 5], courses: [] },
  { id: "undergraduate", name: "Undergraduate", ages: "18+", levels: [6], courses: ["university"] },
  { id: "postgraduate", name: "Master's", ages: "21+", levels: [7], courses: ["research"] },
  { id: "doctoral", name: "Doctoral and research", ages: "22+", levels: [8], courses: ["research"] },
  { id: "professional", name: "Professional and continuing education", ages: "Any", levels: ["P"], courses: ["professional", "careers"] },
];

export const subjectById = (id) => SUBJECTS.find((s) => s.id === id) || null;
export const stageOfLevel = (level) => STAGES.find((s) => s.levels.includes(level)) || null;

/** Problems with the registry (tests): unknown courses, duplicate ids, related links to subjects that don't exist. */
export function checkSubjects(courseSlugs = null) {
  const p = [], ids = new Set();
  for (const s of SUBJECTS) {
    if (ids.has(s.id)) p.push(`${s.id}: duplicate subject`); ids.add(s.id);
    if (!s.courses.length) p.push(`${s.id}: no course teaches it`);
    if (courseSlugs) for (const c of s.courses) if (!courseSlugs.includes(c)) p.push(`${s.id}: no Gradify course "${c}"`);
  }
  const pairs = new Set();
  for (const [a, b, why] of RELATED) {
    if (!ids.has(a) || !ids.has(b)) p.push(`related ${a}–${b}: unknown subject`);
    if (a === b) p.push(`related ${a}: a subject can't be related to itself`);
    if (!why) p.push(`related ${a}–${b}: say what they share`);
    const k = [a, b].sort().join("|"); if (pairs.has(k)) p.push(`related ${a}–${b}: listed twice`); pairs.add(k);
  }
  const sids = new Set();
  for (const s of STAGES) {
    if (sids.has(s.id)) p.push(`${s.id}: duplicate stage`); sids.add(s.id);
    if (courseSlugs) for (const c of s.courses) if (!courseSlugs.includes(c)) p.push(`stage ${s.id}: no Gradify course "${c}"`);
  }
  return p;
}
