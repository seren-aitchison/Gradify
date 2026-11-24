// The UK curriculum, as Gradify maps it: nations, awarding bodies, qualification types and individual specifications.
// Specifications are never treated as interchangeable: AQA GCSE Biology and WJEC GCSE Biology are different documents
// with different content, so each is its own entry with its own statements and its own mapping.
//
//   NATIONS         England, Wales, Scotland, Northern Ireland
//   BODIES          awarding bodies, with where their specifications are published
//   QUAL_TYPES      GCSE (England 9–1, Wales, Northern Ireland), AS, A level, National 5, Higher, Advanced Higher
//   SPECS           one entry per specification, starting with Biology (the reference implementation)
//
// Every SPECS entry starts `confirmed: false`: its code, version and first teaching are written from general knowledge
// and must be checked against the official document before anything is claimed. `code: null` means not yet known.
// `statements` says whether the specification's statements are in data/curriculum/specs/ (see docs/curriculum/).
// Nothing in this file is a coverage claim: claims come only from kit/curriculum/coverage.js, after verification.

export const NATIONS = {
  eng: { name: "England", regulator: "Ofqual" },
  wal: { name: "Wales", regulator: "Qualifications Wales" },
  sco: { name: "Scotland", regulator: "SQA (awarding body and accreditation)" },
  ni: { name: "Northern Ireland", regulator: "CCEA Regulation" },
};

export const BODIES = {
  aqa: { name: "AQA", site: "https://www.aqa.org.uk/", nations: ["eng"] },
  pearson: { name: "Pearson Edexcel", site: "https://qualifications.pearson.com/", nations: ["eng"] },
  ocr: { name: "OCR", site: "https://www.ocr.org.uk/", nations: ["eng"] },
  eduqas: { name: "WJEC Eduqas", site: "https://www.eduqas.co.uk/", nations: ["eng"] },
  wjec: { name: "WJEC", site: "https://www.wjec.co.uk/", nations: ["wal"] },
  sqa: { name: "SQA", site: "https://www.sqa.org.uk/", nations: ["sco"] },
  ccea: { name: "CCEA", site: "https://ccea.org.uk/", nations: ["ni"] },
};

export const QUAL_TYPES = {
  gcse: { name: "GCSE", nations: ["eng", "wal", "ni"], note: "Graded 9–1 in England; A*–G in Wales; A*–G with C* in Northern Ireland" },
  "gcse-combined": { name: "GCSE Combined Science", nations: ["eng"], note: "A double award covering biology, chemistry and physics" },
  as: { name: "AS level", nations: ["eng", "wal", "ni"], note: "Decoupled from A level in England; part of the A level in Wales and Northern Ireland" },
  "a-level": { name: "A level", nations: ["eng", "wal", "ni"] },
  nat5: { name: "National 5", nations: ["sco"] },
  higher: { name: "Higher", nations: ["sco"] },
  "adv-higher": { name: "Advanced Higher", nations: ["sco"] },
};

const spec = (o) => ({ subject: "biology", confirmed: false, statements: "not-imported", ...o });
/** Biology first: every specification a UK biology student might sit. */
export const SPECS = [
  // England, GCSE
  spec({ id: "aqa-gcse-biology", body: "aqa", qual: "gcse", title: "AQA GCSE Biology", code: "8461", firstTeaching: 2016 }),
  spec({ id: "aqa-gcse-combined-trilogy", body: "aqa", qual: "gcse-combined", title: "AQA GCSE Combined Science: Trilogy (biology content)", code: "8464", firstTeaching: 2016, part: "biology" }),
  spec({ id: "pearson-gcse-biology", body: "pearson", qual: "gcse", title: "Pearson Edexcel GCSE Biology", code: "1BI0", firstTeaching: 2016 }),
  spec({ id: "pearson-gcse-combined", body: "pearson", qual: "gcse-combined", title: "Pearson Edexcel GCSE Combined Science (biology content)", code: "1SC0", firstTeaching: 2016, part: "biology" }),
  spec({ id: "ocr-gcse-gateway-biology-a", body: "ocr", qual: "gcse", title: "OCR GCSE Gateway Science Biology A", code: "J247", firstTeaching: 2016 }),
  spec({ id: "ocr-gcse-21c-biology-b", body: "ocr", qual: "gcse", title: "OCR GCSE Twenty First Century Science Biology B", code: "J257", firstTeaching: 2016 }),
  spec({ id: "eduqas-gcse-biology", body: "eduqas", qual: "gcse", title: "WJEC Eduqas GCSE Biology", code: null, firstTeaching: 2016 }),
  // England, AS and A level
  spec({ id: "aqa-a-level-biology", body: "aqa", qual: "a-level", title: "AQA A level Biology", code: "7402", firstTeaching: 2015 }),
  spec({ id: "aqa-as-biology", body: "aqa", qual: "as", title: "AQA AS Biology", code: "7401", firstTeaching: 2015 }),
  spec({ id: "pearson-a-level-biology-a", body: "pearson", qual: "a-level", title: "Pearson Edexcel A level Biology A (Salters-Nuffield)", code: "9BN0", firstTeaching: 2015 }),
  spec({ id: "pearson-a-level-biology-b", body: "pearson", qual: "a-level", title: "Pearson Edexcel A level Biology B", code: "9BI0", firstTeaching: 2015 }),
  spec({ id: "ocr-a-level-biology-a", body: "ocr", qual: "a-level", title: "OCR A level Biology A", code: "H420", firstTeaching: 2015 }),
  spec({ id: "ocr-a-level-biology-b", body: "ocr", qual: "a-level", title: "OCR A level Biology B (Advancing Biology)", code: "H422", firstTeaching: 2015 }),
  spec({ id: "eduqas-a-level-biology", body: "eduqas", qual: "a-level", title: "WJEC Eduqas A level Biology", code: null, firstTeaching: 2015 }),
  // Wales
  spec({ id: "wjec-gcse-biology", body: "wjec", qual: "gcse", title: "WJEC GCSE Biology (Wales)", code: null, firstTeaching: null, note: "Wales is reforming GCSEs: check which specification candidates sit in each year" }),
  spec({ id: "wjec-as-a-level-biology", body: "wjec", qual: "a-level", title: "WJEC AS and A level Biology (Wales)", code: null, firstTeaching: null }),
  // Scotland
  spec({ id: "sqa-n5-biology", body: "sqa", qual: "nat5", title: "SQA National 5 Biology", code: null, firstTeaching: null }),
  spec({ id: "sqa-higher-biology", body: "sqa", qual: "higher", title: "SQA Higher Biology", code: null, firstTeaching: null }),
  spec({ id: "sqa-adv-higher-biology", body: "sqa", qual: "adv-higher", title: "SQA Advanced Higher Biology", code: null, firstTeaching: null }),
  // Northern Ireland
  spec({ id: "ccea-gcse-biology", body: "ccea", qual: "gcse", title: "CCEA GCSE Biology", code: null, firstTeaching: null }),
  spec({ id: "ccea-as-a-level-biology", body: "ccea", qual: "a-level", title: "CCEA AS and A level Biology", code: null, firstTeaching: null }),
];

/** problems with the registry (tests) */
export function checkRegistry(specs = SPECS) {
  const p = [], ids = new Set();
  for (const s of specs) {
    if (ids.has(s.id)) p.push(`${s.id}: duplicate id`); ids.add(s.id);
    const b = BODIES[s.body], q = QUAL_TYPES[s.qual];
    if (!b) p.push(`${s.id}: unknown body ${s.body}`);
    if (!q) p.push(`${s.id}: unknown qualification ${s.qual}`);
    if (b && q && !b.nations.some((n) => q.nations.includes(n))) p.push(`${s.id}: ${b.name} doesn't award ${q.name}`);
    if (s.confirmed && !(s.code && s.version && s.source && s.checkedOn)) p.push(`${s.id}: confirmed needs code, version, the official source URL and the date it was checked`);
    if (!["not-imported", "imported"].includes(s.statements)) p.push(`${s.id}: statements must be not-imported or imported`);
  }
  return p;
}
export const specsFor = (subject, specs = SPECS) => specs.filter((s) => s.subject === subject);
export const nationsOf = (s) => BODIES[s.body].nations.filter((n) => QUAL_TYPES[s.qual].nations.includes(n));
