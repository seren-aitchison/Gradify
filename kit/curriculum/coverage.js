// Global curriculum intelligence: the structure Gradify maps its courses onto, and what it can honestly claim.
//
//   country → education system → awarding body or institution → qualification → (modules and learning outcomes)
//
// Each Gradify course says which qualifications it serves, and how strong that claim is:
//   verified    mapped outcome by outcome against the official specification, with its version, and checked on a
//               recorded date by a named reviewer. Only these may be described as covering the qualification.
//   mapped      a mapping exists, but hasn't yet been checked against the published specification (it says so).
//   aligned     written with the qualification in mind (the course says so), with no mapping yet.
//   gradify     Gradify's own curriculum: useful study, but not tied to any official specification.
// Constitution article 3: "Curriculum coverage is claimed only with evidence." Nothing here is upgraded without it,
// and the counts shown to learners (quality.html) come straight from this file.

export const STATUS = {
  verified: { name: "Verified", line: "Checked outcome by outcome against the official specification, on the date shown." },
  mapped: { name: "Mapped, not yet verified", line: "A mapping to the specification exists, but hasn't yet been checked against the published version." },
  aligned: { name: "Aligned", line: "Written with this qualification in mind. Not mapped outcome by outcome: check your own specification." },
  gradify: { name: "Gradify curriculum", line: "Gradify's own course. Useful study, not tied to an official specification." },
};

// the structure, starting with the United Kingdom; other countries are added only with real coverage to show
export const SYSTEMS = [
  { id: "uk-eng", country: "United Kingdom", system: "England", bodies: ["AQA", "Pearson Edexcel", "OCR", "WJEC Eduqas", "Ofqual (regulator)"], qualifications: ["gcse", "a-level", "degree", "apprenticeship"] },
  { id: "uk-wal", country: "United Kingdom", system: "Wales", bodies: ["WJEC", "Qualifications Wales (regulator)"], qualifications: ["gcse", "a-level", "degree"] },
  { id: "uk-sco", country: "United Kingdom", system: "Scotland", bodies: ["SQA"], qualifications: ["nat5", "higher", "degree"] },
  { id: "uk-ni", country: "United Kingdom", system: "Northern Ireland", bodies: ["CCEA"], qualifications: ["gcse", "a-level", "degree"] },
  { id: "uk-prof", country: "United Kingdom", system: "Professional regulators (UK-wide)", bodies: ["Solicitors Regulation Authority", "Nursing and Midwifery Council", "General Pharmaceutical Council", "General Medical Council"], qualifications: ["sqe", "nmc", "gphc", "mla"] },
];
export const QUALIFICATIONS = {
  gcse: { name: "GCSE", level: "Level 1–2", ages: "14–16" },
  "a-level": { name: "A level", level: "Level 3", ages: "16–18" },
  nat5: { name: "National 5", level: "SCQF 5", ages: "14–16" },
  higher: { name: "Higher", level: "SCQF 6", ages: "16–18" },
  degree: { name: "Undergraduate degree", level: "Level 6 / SCQF 9–10", ages: "18+" },
  apprenticeship: { name: "Apprenticeship", level: "Levels 2–7", ages: "16+" },
  sqe: { name: "Solicitors Qualifying Examination (SQE1 and SQE2)", level: "Professional", ages: "Graduate", body: "Solicitors Regulation Authority" },
  nmc: { name: "NMC Future nurse: standards of proficiency (2018)", level: "Professional", ages: "Pre-registration", body: "Nursing and Midwifery Council" },
  gphc: { name: "GPhC standards for the initial education and training of pharmacists", level: "Professional", ages: "Pre-registration", body: "General Pharmaceutical Council" },
  mla: { name: "Medical Licensing Assessment content map", level: "Professional", ages: "Final-year medical students", body: "General Medical Council" },
};

// every Gradify course: the systems and qualifications it serves, and the strength of the claim, with its evidence
export const COURSES = {
  law: { serves: [{ q: "sqe", status: "mapped", evidence: "docs/SQE_SPEC_MAPPING.md", note: "Mapped from the structure of SQE1 and SQE2 as known up to 2025–26; not yet checked against the published specification." }, { q: "degree", status: "aligned" }], systems: ["uk-eng", "uk-wal"] },
  nursing: { serves: [{ q: "nmc", status: "mapped", evidence: "docs/NMC_STANDARDS_MAPPING.md", note: "Mapped at platform level from the 2018 standards; not yet checked outcome by outcome against the published standards." }, { q: "degree", status: "aligned" }], systems: ["uk-eng", "uk-wal", "uk-sco", "uk-ni"] },
  gcse: { serves: [{ q: "gcse", status: "aligned", note: "Written for GCSEs in England; exam boards differ, so check your own specification." }], systems: ["uk-eng"] },
  maths: { serves: [{ q: "gcse", status: "aligned" }, { q: "a-level", status: "aligned" }, { q: "degree", status: "aligned" }], systems: ["uk-eng", "uk-wal", "uk-sco", "uk-ni"] },
  computing: { serves: [{ q: "gcse", status: "aligned" }, { q: "a-level", status: "aligned" }, { q: "degree", status: "aligned" }], systems: ["uk-eng"] },
  pharmacy: { serves: [{ q: "gphc", status: "aligned" }], systems: ["uk-eng", "uk-wal", "uk-sco"] },
  medicine: { serves: [{ q: "mla", status: "aligned" }, { q: "degree", status: "aligned" }], systems: ["uk-eng", "uk-wal", "uk-sco", "uk-ni"] },
};
/** A course's coverage entry, with Gradify's own curriculum as the honest default. */
export const coverageOf = (slug) => COURSES[slug] || { serves: [{ q: null, status: "gradify" }], systems: [] };

/** Counts for a list of course slugs: how many courses make each kind of claim (the strongest claim each makes). Pure. */
export function summary(slugs) {
  const rank = ["verified", "mapped", "aligned", "gradify"], out = { verified: 0, mapped: 0, aligned: 0, gradify: 0 };
  for (const s of slugs) { const best = coverageOf(s).serves.map((x) => x.status).sort((a, b) => rank.indexOf(a) - rank.indexOf(b))[0]; out[best]++; }
  return out;
}
/** Problems with the registry (tests): unknown qualifications, verified claims without a date, reviewer and evidence. */
export function check(courses = COURSES) {
  const p = [];
  for (const [slug, c] of Object.entries(courses)) for (const s of c.serves) {
    if (!STATUS[s.status]) p.push(`${slug}: unknown status ${s.status}`);
    if (s.q && !QUALIFICATIONS[s.q]) p.push(`${slug}: unknown qualification ${s.q}`);
    if (s.status === "verified" && !(s.evidence && s.verifiedOn && s.reviewer && s.version)) p.push(`${slug}: "verified" needs evidence, verifiedOn, reviewer and the specification's version`);
    if (s.status === "mapped" && !s.evidence) p.push(`${slug}: "mapped" needs the mapping document`);
  }
  return p;
}
