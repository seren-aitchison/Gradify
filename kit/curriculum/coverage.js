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

// Requirement-level mapping state: a separate, internal record of how far a course's statement-by-statement mapping
// (data/curriculum/, scripts/curriculum/README.md) has been checked. It never changes a course's claim (STATUS above,
// shown to learners): a drafted or reviewed mapping is evidence towards a claim, not the claim. Each state needs the
// fields check() lists, so an AI-drafted mapping can't be recorded as reviewed or approved without a named person.
export const MAPPING = {
  none: { name: "Not mapped", line: "No requirement-level mapping exists." },
  drafted: { name: "Mapping drafted", line: "AI-drafted, statement by statement, with evidence from each lesson; not yet checked by anyone." },
  reviewed: { name: "Mapping reviewed", line: "A qualified reviewer has checked every link." },
  "sources-verified": { name: "Sources verified", line: "Reviewed, and the official specifications and supporting references have been checked against the published versions." },
  approved: { name: "Approved", line: "Reviewed, sources verified, and signed off by the required subject expert." },
};
const MAPPING_ORDER = ["none", "drafted", "reviewed", "sources-verified", "approved"];

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
  // the claim stays Gradify's own curriculum until the mapping is reviewed and the claim is decided; the mapping is internal
  biology: {
    serves: [{ q: null, status: "gradify" }], systems: ["uk-eng"],
    mapping: { state: "drafted", scope: "England: national curriculum science, years 1–11, and the AQA, Pearson Edexcel, OCR (J247, J257) and WJEC Eduqas GCSE Biology specifications",
      evidence: "docs/curriculum/biology-england-coverage.md", data: "data/curriculum/mapping/biology-england.json", draftedOn: "2026-11-23", reviewer: null, reviewedOn: null,
      note: "AI-drafted and unreviewed. Not a claim of coverage: practical-skills chapters and the Combined Science specifications are not yet extracted." },
  },
};
/** A course's requirement-level mapping record, "none" by default. */
export const mappingOf = (slug) => COURSES[slug]?.mapping || { state: "none" };
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
  for (const [slug, c] of Object.entries(courses)) {
    const m = c.mapping; if (!m) continue;
    const at = MAPPING_ORDER.indexOf(m.state);
    if (at < 0) { p.push(`${slug}: unknown mapping state ${m.state}`); continue; }
    if (at >= 1 && !(m.evidence && m.data && m.scope)) p.push(`${slug}: a mapping needs its scope, report (evidence) and data file`);
    if (at === 1 && (m.reviewer || m.reviewedOn)) p.push(`${slug}: a drafted mapping has no reviewer; move it to "reviewed" with the reviewer's name and date`);
    if (at >= 2 && !(m.reviewer && m.reviewedOn)) p.push(`${slug}: "${m.state}" needs a named reviewer and review date`);
    if (at >= 3 && !(m.sourcesCheckedBy && m.sourcesCheckedOn)) p.push(`${slug}: "${m.state}" needs who checked the sources, and when`);
    if (at >= 4 && !(m.signoff?.by && m.signoff?.on)) p.push(`${slug}: "approved" needs the subject expert's sign-off (signoff: { by, on })`);
    if (at < 4 && c.serves.some((s) => s.status === "verified")) p.push(`${slug}: can't claim "verified" while its mapping is only ${m.state}`);
  }
  return p;
}
