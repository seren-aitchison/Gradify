// The world's curricula, as a structured database: country → education system → qualification, with the body that
// sets or awards it, the ages it's usually taken at, its ISCED 2011 level, its official site, and the Gradify courses
// that relate to it. Learners choose what they're studying from it (app.html#/curriculum), and the curriculum
// verification agent works through it.
//
// Honesty (constitution article 3): every entry here is LISTED from public information, with `checked: null` until
// someone checks it against the official source and records the date. Listing a qualification is not a claim that
// Gradify covers it: coverage claims live in kit/curriculum/coverage.js and are verified, mapped, aligned or none.
// An official site is given only where it's certain; otherwise `url: null` rather than a guess.
//
// `type` links a UK entry to its qualification type in kit/curriculum/uk.js (QUAL_TYPES), where the awarding bodies and
// individual specifications are: England's GCSE and AQA's GCSE Biology are the same qualification, seen from two sides.
//
// ISCED 2011 levels: 1 primary, 2 lower secondary, 3 upper secondary, 4 post-secondary non-tertiary, 5 short-cycle
// tertiary, 6 bachelor's, 7 master's, 8 doctoral. "P" marks professional licensing, which sits outside ISCED.

const SCI = ["biology", "chemistry", "physics"];
const SCHOOL = ["gcse", "maths", ...SCI, "literature", "history", "computing", "spanish", "art", "music", "business", "psychology", "sociology", "ecology", "sport"];
const Q = (id, name, o = {}) => ({ id, name, kind: "school-leaving", ages: "", level: 3, body: "", url: null, checked: null, gradify: [], ...o });

export const WORLD = [
  { country: "United Kingdom", iso: "GB", systems: [
    { id: "gb-eng", name: "England", regulator: "Ofqual", qualifications: [
      Q("gb-eng-gcse", "GCSE", { type: "gcse", kind: "secondary", ages: "14–16", level: 2, body: "AQA, Pearson Edexcel, OCR, WJEC Eduqas (regulated by Ofqual)", url: "https://www.gov.uk/government/organisations/ofqual", gradify: SCHOOL, coverage: "gcse" }),
      Q("gb-eng-alevel", "A level", { type: "a-level", ages: "16–18", body: "AQA, Pearson Edexcel, OCR, WJEC Eduqas (regulated by Ofqual)", url: "https://www.gov.uk/government/organisations/ofqual", gradify: ["maths", ...SCI, "literature", "history", "computing", "psychology", "sociology", "business", "art", "music", "spanish"], coverage: "a-level" }),
      Q("gb-eng-tlevel", "T Level", { ages: "16–19", body: "Institute for Apprenticeships and Technical Education; awarding organisations", url: "https://www.tlevels.gov.uk/", gradify: ["health", "engineering", "computing", "business", "teaching"] }),
      Q("gb-eng-btec", "BTEC Nationals", { ages: "16–19", body: "Pearson", gradify: ["business", "sport", "health", "engineering", "computing", "art"] }),
      Q("gb-eng-apprenticeship", "Apprenticeships (levels 2–7)", { kind: "vocational", ages: "16+", level: 4, body: "Employers and training providers, with end-point assessment", url: "https://www.gov.uk/apply-apprenticeship", gradify: ["careers", "professional", "engineering", "business"] }),
      Q("gb-eng-degree", "Bachelor's degree", { kind: "higher", ages: "18+", level: 6, body: "Universities (quality body: QAA)", url: "https://www.qaa.ac.uk/", gradify: ["university", "research", "law", "medicine", "nursing", "pharmacy", "dentistry", "veterinary", "psychology", "engineering", "computing", "business", "finance", ...SCI], coverage: "degree" }),
    ] },
    { id: "gb-wls", name: "Wales", regulator: "Qualifications Wales", qualifications: [
      Q("gb-wls-gcse", "GCSE (Wales)", { type: "gcse", kind: "secondary", ages: "14–16", level: 2, body: "WJEC (regulated by Qualifications Wales)", url: "https://qualifications.wales/", gradify: SCHOOL }),
      Q("gb-wls-alevel", "A level (Wales)", { type: "a-level", ages: "16–18", body: "WJEC (regulated by Qualifications Wales)", url: "https://qualifications.wales/", gradify: ["maths", ...SCI, "literature", "history", "psychology"] }),
    ] },
    { id: "gb-sct", name: "Scotland", regulator: "SQA", qualifications: [
      Q("gb-sct-n5", "National 5", { type: "nat5", kind: "secondary", ages: "15–16", level: 3, body: "Scottish Qualifications Authority", url: "https://www.sqa.org.uk/", gradify: SCHOOL }),
      Q("gb-sct-higher", "Higher", { type: "higher", ages: "16–17", body: "Scottish Qualifications Authority", url: "https://www.sqa.org.uk/", gradify: ["maths", ...SCI, "literature", "history", "psychology", "business"] }),
      Q("gb-sct-ah", "Advanced Higher", { type: "adv-higher", ages: "17–18", body: "Scottish Qualifications Authority", url: "https://www.sqa.org.uk/", gradify: ["maths", ...SCI] }),
    ] },
    { id: "gb-nir", name: "Northern Ireland", regulator: "CCEA", qualifications: [
      Q("gb-nir-gcse", "GCSE (Northern Ireland)", { type: "gcse", kind: "secondary", ages: "14–16", level: 2, body: "CCEA", url: "https://ccea.org.uk/", gradify: SCHOOL }),
      Q("gb-nir-alevel", "A level (Northern Ireland)", { type: "a-level", ages: "16–18", body: "CCEA", url: "https://ccea.org.uk/", gradify: ["maths", ...SCI, "literature", "history"] }),
    ] },
    { id: "gb-prof", name: "Professional (UK-wide)", qualifications: [
      Q("gb-sqe", "Solicitors Qualifying Examination (SQE)", { kind: "professional", ages: "Graduate", level: "P", body: "Solicitors Regulation Authority", url: "https://www.sra.org.uk/", gradify: ["law"], coverage: "sqe" }),
      Q("gb-nmc", "NMC standards of proficiency for registered nurses", { kind: "professional", ages: "Pre-registration", level: "P", body: "Nursing and Midwifery Council", url: "https://www.nmc.org.uk/", gradify: ["nursing", "health"], coverage: "nmc" }),
      Q("gb-gphc", "GPhC registration assessment", { kind: "professional", ages: "Pre-registration", level: "P", body: "General Pharmaceutical Council", url: "https://www.pharmacyregulation.org/", gradify: ["pharmacy"], coverage: "gphc" }),
      Q("gb-mla", "Medical Licensing Assessment (MLA)", { kind: "professional", ages: "Final-year medical students", level: "P", body: "General Medical Council", url: "https://www.gmc-uk.org/", gradify: ["medicine"], coverage: "mla" }),
      Q("gb-aca", "ACA chartered accountancy", { kind: "professional", ages: "Graduate", level: "P", body: "ICAEW", url: "https://www.icaew.com/", gradify: ["finance", "business"] }),
    ] },
  ] },
  { country: "Ireland", iso: "IE", systems: [{ id: "ie", name: "Ireland", regulator: "State Examinations Commission", qualifications: [
    Q("ie-jc", "Junior Cycle", { kind: "secondary", ages: "12–15", level: 2, body: "State Examinations Commission", url: "https://www.examinations.ie/", gradify: SCHOOL }),
    Q("ie-lc", "Leaving Certificate", { ages: "16–18", body: "State Examinations Commission", url: "https://www.examinations.ie/", gradify: ["maths", ...SCI, "literature", "history", "business", "spanish"] }),
  ] }] },
  { country: "International", iso: "INT", systems: [{ id: "int", name: "International programmes", qualifications: [
    Q("int-ibdp", "IB Diploma Programme", { ages: "16–19", body: "International Baccalaureate", url: "https://www.ibo.org/", gradify: ["maths", ...SCI, "literature", "history", "psychology", "business", "computing", "art", "music", "spanish", "research"] }),
    Q("int-ibmyp", "IB Middle Years Programme", { kind: "secondary", ages: "11–16", level: 2, body: "International Baccalaureate", url: "https://www.ibo.org/", gradify: SCHOOL }),
    Q("int-igcse", "Cambridge IGCSE", { kind: "secondary", ages: "14–16", level: 2, body: "Cambridge International Education", url: "https://www.cambridgeinternational.org/", gradify: SCHOOL }),
    Q("int-caie-al", "Cambridge International AS & A Level", { ages: "16–19", body: "Cambridge International Education", url: "https://www.cambridgeinternational.org/", gradify: ["maths", ...SCI, "literature", "history", "psychology", "sociology", "business", "computing"] }),
    Q("int-ial", "Pearson Edexcel International GCSE and A level", { kind: "secondary", ages: "14–19", level: 3, body: "Pearson", gradify: SCHOOL }),
    Q("int-cfa", "CFA Program", { kind: "professional", ages: "Graduate", level: "P", body: "CFA Institute", url: "https://www.cfainstitute.org/", gradify: ["finance", "investing"] }),
    Q("int-acca", "ACCA Qualification", { kind: "professional", ages: "16+", level: "P", body: "ACCA", url: "https://www.accaglobal.com/", gradify: ["finance", "business"] }),
  ] }] },
  { country: "United States", iso: "US", systems: [{ id: "us", name: "United States (state-run, with national tests)", qualifications: [
    Q("us-hsd", "High school diploma", { ages: "14–18", body: "Each state's education department", gradify: SCHOOL }),
    Q("us-ccss", "Common Core State Standards (maths and English)", { kind: "framework", ages: "5–18", level: 2, body: "Adopted state by state", gradify: ["maths", "literature", "primary"] }),
    Q("us-ngss", "Next Generation Science Standards", { kind: "framework", ages: "5–18", level: 2, body: "Adopted state by state", url: "https://www.nextgenscience.org/", gradify: [...SCI, "ecology"] }),
    Q("us-ap", "Advanced Placement (AP)", { ages: "15–18", body: "College Board", url: "https://apcentral.collegeboard.org/", gradify: ["maths", ...SCI, "history", "psychology", "computing", "literature", "spanish", "art", "music"] }),
    Q("us-sat", "SAT", { kind: "entrance", ages: "16–18", body: "College Board", url: "https://satsuite.collegeboard.org/", gradify: ["maths", "literature"] }),
    Q("us-act", "ACT", { kind: "entrance", ages: "16–18", body: "ACT", url: "https://www.act.org/", gradify: ["maths", "literature", ...SCI] }),
    Q("us-usmle", "USMLE", { kind: "professional", ages: "Medical students and graduates", level: "P", body: "FSMB and NBME", url: "https://www.usmle.org/", gradify: ["medicine"] }),
    Q("us-nclex", "NCLEX", { kind: "professional", ages: "Nursing graduates", level: "P", body: "NCSBN", url: "https://www.ncsbn.org/", gradify: ["nursing"] }),
  ] }] },
  { country: "Canada", iso: "CA", systems: [{ id: "ca", name: "Canada (provincial)", qualifications: [
    Q("ca-ossd", "Ontario Secondary School Diploma", { ages: "14–18", body: "Ontario Ministry of Education", gradify: SCHOOL }),
    Q("ca-prov", "Provincial secondary diplomas (other provinces)", { ages: "14–18", body: "Each province's ministry of education", gradify: SCHOOL }),
  ] }] },
  { country: "Australia", iso: "AU", systems: [{ id: "au", name: "Australia (national curriculum, state certificates)", regulator: "ACARA", qualifications: [
    Q("au-ac", "Australian Curriculum", { kind: "framework", ages: "5–16", level: 2, body: "ACARA", url: "https://www.australiancurriculum.edu.au/", gradify: SCHOOL }),
    Q("au-hsc", "Higher School Certificate (New South Wales)", { ages: "16–18", body: "NSW Education Standards Authority", url: "https://www.educationstandards.nsw.edu.au/", gradify: ["maths", ...SCI, "literature", "history", "business"] }),
    Q("au-vce", "Victorian Certificate of Education", { ages: "16–18", body: "Victorian Curriculum and Assessment Authority", url: "https://www.vcaa.vic.edu.au/", gradify: ["maths", ...SCI, "literature", "history", "psychology"] }),
    Q("au-qce", "Queensland Certificate of Education", { ages: "16–18", body: "Queensland Curriculum and Assessment Authority", url: "https://www.qcaa.qld.edu.au/", gradify: ["maths", ...SCI, "literature"] }),
    Q("au-wace", "Western Australian Certificate of Education", { ages: "16–18", body: "School Curriculum and Standards Authority", gradify: ["maths", ...SCI, "literature"] }),
  ] }] },
  { country: "New Zealand", iso: "NZ", systems: [{ id: "nz", name: "New Zealand", regulator: "NZQA", qualifications: [
    Q("nz-ncea", "NCEA (levels 1–3)", { ages: "15–18", body: "NZQA", url: "https://www2.nzqa.govt.nz/", gradify: SCHOOL }),
  ] }] },
  { country: "India", iso: "IN", systems: [{ id: "in", name: "India (national boards and entrance tests)", qualifications: [
    Q("in-cbse10", "CBSE Class 10 (Secondary School Examination)", { kind: "secondary", ages: "15–16", level: 2, body: "Central Board of Secondary Education", url: "https://www.cbse.gov.in/", gradify: SCHOOL }),
    Q("in-cbse12", "CBSE Class 12 (Senior School Certificate)", { ages: "17–18", body: "Central Board of Secondary Education", url: "https://www.cbse.gov.in/", gradify: ["maths", ...SCI, "computing", "business", "psychology", "history"] }),
    Q("in-icse", "ICSE (Class 10) and ISC (Class 12)", { ages: "15–18", body: "CISCE", url: "https://cisce.org/", gradify: SCHOOL }),
    Q("in-jee", "JEE Main", { kind: "entrance", ages: "17–19", body: "National Testing Agency", url: "https://nta.ac.in/", gradify: ["maths", "physics", "chemistry"] }),
    Q("in-neet", "NEET (UG)", { kind: "entrance", ages: "17–19", body: "National Testing Agency", url: "https://nta.ac.in/", gradify: ["biology", "chemistry", "physics", "medicine"] }),
  ] }] },
  { country: "Singapore", iso: "SG", systems: [{ id: "sg", name: "Singapore", regulator: "SEAB", qualifications: [
    Q("sg-olevel", "GCE O-Level (being replaced by the Singapore-Cambridge Secondary Education Certificate from 2027)", { kind: "secondary", ages: "15–16", level: 2, body: "SEAB with Cambridge", url: "https://www.seab.gov.sg/", gradify: SCHOOL }),
    Q("sg-alevel", "Singapore-Cambridge GCE A-Level", { ages: "17–18", body: "SEAB with Cambridge", url: "https://www.seab.gov.sg/", gradify: ["maths", ...SCI, "literature", "history", "computing"] }),
  ] }] },
  { country: "Hong Kong", iso: "HK", systems: [{ id: "hk", name: "Hong Kong", qualifications: [
    Q("hk-dse", "Hong Kong Diploma of Secondary Education (HKDSE)", { ages: "15–18", body: "HKEAA", url: "https://www.hkeaa.edu.hk/", gradify: ["maths", ...SCI, "literature", "history", "business", "computing"] }),
  ] }] },
  { country: "South Africa", iso: "ZA", systems: [{ id: "za", name: "South Africa", qualifications: [
    Q("za-nsc", "National Senior Certificate (matric)", { ages: "17–18", body: "Department of Basic Education; IEB for many independent schools", url: "https://www.education.gov.za/", gradify: ["maths", ...SCI, "history", "business", "computing"] }),
  ] }] },
  { country: "Nigeria", iso: "NG", systems: [{ id: "ng", name: "Nigeria", qualifications: [
    Q("ng-wassce", "WASSCE", { ages: "15–18", body: "West African Examinations Council", gradify: ["maths", ...SCI, "literature", "business", "history"] }),
  ] }] },
  { country: "Ghana", iso: "GH", systems: [{ id: "gh", name: "Ghana", qualifications: [
    Q("gh-wassce", "WASSCE", { ages: "15–18", body: "West African Examinations Council", gradify: ["maths", ...SCI, "literature", "business"] }),
  ] }] },
  { country: "Kenya", iso: "KE", systems: [{ id: "ke", name: "Kenya", qualifications: [
    Q("ke-kcse", "Kenya Certificate of Secondary Education (KCSE)", { ages: "16–18", body: "Kenya National Examinations Council", url: "https://www.knec.ac.ke/", gradify: ["maths", ...SCI, "business", "history"] }),
  ] }] },
  { country: "France", iso: "FR", systems: [{ id: "fr", name: "France", qualifications: [
    Q("fr-brevet", "Diplôme national du brevet", { kind: "secondary", ages: "14–15", level: 2, body: "Ministère de l'Éducation nationale", url: "https://www.education.gouv.fr/", gradify: SCHOOL }),
    Q("fr-bac", "Baccalauréat", { ages: "17–18", body: "Ministère de l'Éducation nationale", url: "https://www.education.gouv.fr/", gradify: ["maths", ...SCI, "history", "literature"] }),
  ] }] },
  { country: "Germany", iso: "DE", systems: [{ id: "de", name: "Germany (run by each Land)", qualifications: [
    Q("de-abitur", "Abitur", { ages: "17–19", body: "Each Land's ministry, coordinated by the Kultusministerkonferenz", url: "https://www.kmk.org/", gradify: ["maths", ...SCI, "history", "literature"] }),
  ] }] },
  { country: "Spain", iso: "ES", systems: [{ id: "es", name: "Spain", qualifications: [
    Q("es-bach", "Bachillerato, with the university entrance exam (PAU; EBAU or EvAU in some regions)", { ages: "16–18", body: "Ministry of Education and the autonomous communities", gradify: ["maths", ...SCI, "history", "literature"] }),
  ] }] },
  { country: "Italy", iso: "IT", systems: [{ id: "it", name: "Italy", qualifications: [
    Q("it-maturita", "Esame di Stato (maturità)", { ages: "18–19", body: "Ministero dell'Istruzione e del Merito", gradify: ["maths", ...SCI, "history", "literature"] }),
  ] }] },
  { country: "Netherlands", iso: "NL", systems: [{ id: "nl", name: "Netherlands", qualifications: [
    Q("nl-havo-vwo", "HAVO and VWO diplomas", { ages: "16–18", body: "College voor Toetsen en Examens", gradify: ["maths", ...SCI, "history", "business"] }),
  ] }] },
  { country: "Japan", iso: "JP", systems: [{ id: "jp", name: "Japan", qualifications: [
    Q("jp-common", "Common Test for University Admissions", { kind: "entrance", ages: "17–18", body: "National Center for University Entrance Examinations", gradify: ["maths", ...SCI, "japanese"] }),
  ] }] },
  { country: "China", iso: "CN", systems: [{ id: "cn", name: "China (mainland)", qualifications: [
    Q("cn-gaokao", "National College Entrance Examination (gaokao)", { kind: "entrance", ages: "17–18", body: "Ministry of Education and provincial authorities", gradify: ["maths", ...SCI] }),
  ] }] },
  { country: "South Korea", iso: "KR", systems: [{ id: "kr", name: "South Korea", qualifications: [
    Q("kr-csat", "College Scholastic Ability Test (Suneung)", { kind: "entrance", ages: "17–18", body: "Korea Institute for Curriculum and Evaluation", gradify: ["maths", ...SCI] }),
  ] }] },
  { country: "Brazil", iso: "BR", systems: [{ id: "br", name: "Brazil", qualifications: [
    Q("br-enem", "ENEM (Exame Nacional do Ensino Médio)", { kind: "entrance", ages: "17–18", body: "INEP", gradify: ["maths", ...SCI, "history", "literature"] }),
  ] }] },
];

/** Every qualification, flat, with its country and system. Pure. */
export function qualifications(world = WORLD) {
  return world.flatMap((c) => c.systems.flatMap((s) => s.qualifications.map((q) => ({ ...q, country: c.country, iso: c.iso, system: s.name, systemId: s.id }))));
}
export const find = (id) => qualifications().find((q) => q.id === id) || null;

/** Problems with the database (tests): duplicate ids, bad links, unknown levels, "checked" without a date. Pure. */
export function check(world = WORLD, courseSlugs = null) {
  const p = [], seen = new Set();
  for (const q of qualifications(world)) {
    if (seen.has(q.id)) p.push(`duplicate id ${q.id}`); seen.add(q.id);
    if (q.url && !/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/|$)/.test(q.url)) p.push(`${q.id}: link must be https`);
    if (![1, 2, 3, 4, 5, 6, 7, 8, "P"].includes(q.level)) p.push(`${q.id}: unknown level ${q.level}`);
    if (q.checked && !/^\d{4}-\d{2}-\d{2}$/.test(q.checked)) p.push(`${q.id}: checked must be a date`);
    if (!q.body) p.push(`${q.id}: who sets or awards it?`);
    if (courseSlugs) for (const g of q.gradify) if (!courseSlugs.includes(g)) p.push(`${q.id}: no Gradify course "${g}"`);
  }
  return p;
}
/** Counts for the explorer and the quality page. Pure. */
export function stats(world = WORLD) {
  const qs = qualifications(world);
  return { countries: world.filter((c) => c.iso !== "INT").length, systems: world.reduce((a, c) => a + c.systems.length, 0), qualifications: qs.length, checked: qs.filter((q) => q.checked).length };
}
