// LawGradify curriculum mapping: what each school and module covers, against which framework, with the
// provenance of the framework itself. `npm run qa` reads this to report coverage in
// docs/CURRICULUM_PROGRESS.md. Module overrides add to (not replace) the school's tags.
export const FRAMEWORKS = {
  sqe1: {
    name: "SRA SQE1 functioning legal knowledge (FLK1 and FLK2)", owner: "Solicitors Regulation Authority",
    url: "https://sqe.sra.org.uk/exam-arrangements/assessment-information",
    version: "Structure as known up to 2025–26", verified: null, // set to { date, by } once checked against the published specification
    items: ["FLK1: Business Law and Practice", "FLK1: Dispute Resolution", "FLK1: Contract", "FLK1: Tort", "FLK1: Legal System of England and Wales", "FLK1: Constitutional and Administrative Law and EU Law", "FLK1: Legal Services",
      "FLK2: Property Practice", "FLK2: Wills and the Administration of Estates", "FLK2: Solicitors' Accounts", "FLK2: Land Law", "FLK2: Trusts", "FLK2: Criminal Law and Practice",
      "Pervasive: Ethics and professional conduct", "Pervasive: Taxation"],
  },
  sqe2: {
    name: "SRA SQE2 practical legal skills", owner: "Solicitors Regulation Authority",
    url: "https://sqe.sra.org.uk/exam-arrangements/assessment-information",
    version: "Structure as known up to 2025–26", verified: null,
    items: ["Client interview and attendance note", "Advocacy", "Case and matter analysis", "Legal research", "Legal writing", "Legal drafting"],
  },
};

// per school: frameworks items covered, levels and jurisdiction; `modules` refines by module title
export const MAP = {
  u01: { sqe1: ["FLK1: Legal System of England and Wales"], level: ["LLB", "GDL", "SQE1", "Public"], jurisdiction: "England and Wales",
    modules: { "Legal services and access to justice": { sqe1: ["FLK1: Legal Services"] }, "Legal skills": { sqe2: ["Legal research", "Legal writing"] } } },
  u02: { sqe1: ["FLK1: Constitutional and Administrative Law and EU Law"], level: ["LLB", "GDL", "SQE1"], jurisdiction: "United Kingdom" },
  u03: { sqe1: ["FLK1: Contract"], level: ["LLB", "GDL", "SQE1"], jurisdiction: "England and Wales" },
  u04: { sqe1: ["FLK1: Tort"], level: ["LLB", "GDL", "SQE1"], jurisdiction: "England and Wales" },
  u05: { sqe1: ["FLK2: Criminal Law and Practice"], level: ["LLB", "GDL", "SQE1", "Bar"], jurisdiction: "England and Wales" },
  u06: { sqe1: ["FLK2: Criminal Law and Practice"], sqe2: ["Advocacy"], level: ["SQE1", "SQE2", "Bar"], jurisdiction: "England and Wales" },
  u07: { sqe1: ["FLK2: Land Law"], level: ["LLB", "GDL", "SQE1"], jurisdiction: "England and Wales" },
  u08: { sqe1: ["FLK2: Property Practice", "Pervasive: Taxation"], level: ["SQE1", "SQE2"], jurisdiction: "England and Wales",
    modules: { "Tax, conduct and accounts": { sqe1: ["FLK2: Solicitors' Accounts", "Pervasive: Ethics and professional conduct"] } } },
  u09: { sqe1: ["FLK2: Trusts"], level: ["LLB", "GDL", "SQE1"], jurisdiction: "England and Wales" },
  u10: { sqe1: ["FLK2: Wills and the Administration of Estates", "Pervasive: Taxation"], level: ["SQE1", "SQE2"], jurisdiction: "England and Wales" },
  u11: { sqe1: ["FLK1: Business Law and Practice", "Pervasive: Taxation"], level: ["SQE1", "SQE2"], jurisdiction: "England and Wales" },
  u12: { sqe1: ["FLK1: Dispute Resolution"], sqe2: ["Advocacy"], level: ["SQE1", "SQE2", "Bar"], jurisdiction: "England and Wales" },
  u13: { sqe1: ["FLK1: Constitutional and Administrative Law and EU Law"], level: ["LLB", "Postgraduate", "Bar"], jurisdiction: "United Kingdom and ECHR" },
  u14: { sqe1: ["FLK1: Constitutional and Administrative Law and EU Law"], level: ["LLB", "GDL", "Postgraduate"], jurisdiction: "EU and international" },
  u15: { sqe1: ["Pervasive: Ethics and professional conduct", "FLK1: Legal Services"], level: ["SQE1", "SQE2", "Bar"], jurisdiction: "England and Wales",
    modules: { "Client money and accounts": { sqe1: ["FLK2: Solicitors' Accounts"] } } },
  u16: { sqe2: ["Legal research", "Legal writing", "Legal drafting", "Client interview and attendance note", "Advocacy", "Case and matter analysis"], level: ["LLB", "SQE2", "Bar"], jurisdiction: "England and Wales" },
  u17: { level: ["LLB", "Public"], jurisdiction: "Scotland and Northern Ireland" },
  u18: { level: ["LLB", "GDL", "SQE1", "SQE2", "Bar", "Public"], jurisdiction: "England and Wales" },
  u19: { sqe2: ["Client interview and attendance note", "Advocacy", "Case and matter analysis", "Legal research", "Legal writing", "Legal drafting"], sqe1: ["Pervasive: Ethics and professional conduct"], level: ["SQE2"], jurisdiction: "England and Wales" },
};
