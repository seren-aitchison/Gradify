// NurseGradify curriculum mapping: what each school and module covers against the NMC's standards of
// proficiency for registered nurses and the four fields of nursing, with the provenance of the
// framework. `npm run qa` reads this to report coverage. Module overrides add to the school's tags.
export const FRAMEWORKS = {
  nmc: {
    name: "NMC Future nurse: standards of proficiency for registered nurses", owner: "Nursing and Midwifery Council",
    url: "https://www.nmc.org.uk/standards/standards-for-nurses/standards-of-proficiency-for-registered-nurses/",
    version: "2018 standards, structure as known up to 2025–26", verified: null, // { date, by } once checked against the published standards
    items: ["P1 Being an accountable professional", "P2 Promoting health and preventing ill health", "P3 Assessing needs and planning care", "P4 Providing and evaluating care", "P5 Leading and managing nursing care and working in teams", "P6 Improving safety and quality of care", "P7 Coordinating care", "Annexe A Communication and relationship management skills", "Annexe B Nursing procedures"],
  },
  fields: { name: "Fields of nursing practice", owner: "Nursing and Midwifery Council", items: ["Adult", "Children's", "Mental health", "Learning disability"] },
};

const ALL = ["Adult", "Children's", "Mental health", "Learning disability"];
export const MAP = {
  u01: { nmc: ["P1 Being an accountable professional"], fields: ALL, modules: { "Safe professional practice": { nmc: ["P5 Leading and managing nursing care and working in teams"] }, "Rights, equality and safeguarding": { nmc: ["P6 Improving safety and quality of care"] } } },
  u02: { nmc: ["P3 Assessing needs and planning care"], fields: ALL },
  u03: { nmc: ["P3 Assessing needs and planning care", "Annexe B Nursing procedures"], fields: ALL, modules: { "Clinical reasoning and escalation": { nmc: ["P6 Improving safety and quality of care", "Annexe A Communication and relationship management skills"] } } },
  u04: { nmc: ["P4 Providing and evaluating care", "Annexe B Nursing procedures"], fields: ALL, modules: { "Medicines safety and optimisation": { nmc: ["P6 Improving safety and quality of care"] } } },
  u05: { nmc: ["P3 Assessing needs and planning care", "P4 Providing and evaluating care"], fields: ["Adult", "Mental health", "Learning disability"], modules: { "Complex and end-of-life care": { nmc: ["P7 Coordinating care"] } } },
  u06: { nmc: ["Annexe B Nursing procedures", "P4 Providing and evaluating care"], fields: ALL, modules: { "Infection prevention in practice": { nmc: ["P6 Improving safety and quality of care"] }, "Observation and records": { nmc: ["P1 Being an accountable professional"] } } },
  u07: { nmc: ["P3 Assessing needs and planning care", "P4 Providing and evaluating care"], fields: ALL, modules: { "Transitions and coordination": { nmc: ["P7 Coordinating care"] }, "Safe practice": { nmc: ["P5 Leading and managing nursing care and working in teams", "P6 Improving safety and quality of care"] }, "Prevention and recovery": { nmc: ["P2 Promoting health and preventing ill health"] } } },
  u08: { nmc: ["P6 Improving safety and quality of care", "Annexe B Nursing procedures"], fields: ALL },
  u09: { nmc: ["P3 Assessing needs and planning care", "P4 Providing and evaluating care", "P6 Improving safety and quality of care"], fields: ["Adult", "Children's"] },
  u10: { nmc: ["P3 Assessing needs and planning care", "P4 Providing and evaluating care", "P7 Coordinating care"], fields: ["Adult"] },
  u11: { nmc: ["P3 Assessing needs and planning care", "P4 Providing and evaluating care", "Annexe A Communication and relationship management skills"], fields: ["Children's"] },
  u12: { nmc: ["P3 Assessing needs and planning care", "P4 Providing and evaluating care", "Annexe A Communication and relationship management skills"], fields: ["Mental health"] },
  u13: { nmc: ["P3 Assessing needs and planning care", "P4 Providing and evaluating care", "Annexe A Communication and relationship management skills"], fields: ["Learning disability"] },
  u14: { nmc: ["P2 Promoting health and preventing ill health"], fields: ALL },
  u15: { nmc: ["P4 Providing and evaluating care", "P7 Coordinating care"], fields: ["Adult", "Mental health", "Learning disability"] },
  u16: { nmc: ["P5 Leading and managing nursing care and working in teams", "P6 Improving safety and quality of care", "P1 Being an accountable professional"], fields: ALL },
  u17: { nmc: ["P1 Being an accountable professional", "P6 Improving safety and quality of care"], fields: ALL },
};
