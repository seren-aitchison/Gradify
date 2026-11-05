// PharmaGradify curriculum mapping: what each school covers against the GPhC's standards for the initial
// education and training of pharmacists (the four domains of learning outcomes) and the registration
// assessment's subject areas, with the provenance of each framework. `npm run qa` reads this to report
// coverage. Module overrides add to the school's tags.
export const FRAMEWORKS = {
  gphc: {
    name: "GPhC standards for the initial education and training of pharmacists: learning outcome domains", owner: "General Pharmaceutical Council",
    url: "https://www.pharmacyregulation.org/education/pharmacist-education",
    version: "January 2021 standards, as known up to 2025–26", verified: null, // set to { date, by } once checked against the published standards
    items: ["Person-centred care and collaboration", "Professional practice", "Leadership and management", "Education and research"],
  },
  ra: {
    name: "GPhC registration assessment: subject areas", owner: "General Pharmaceutical Council",
    url: "https://www.pharmacyregulation.org/education/registration-assessment",
    version: "Framework as known up to 2025–26; the GPhC revises it", verified: null,
    items: ["Calculations", "Law, ethics and professional standards", "Cardiovascular", "Respiratory", "Endocrine", "Central nervous system", "Infections", "Gastrointestinal", "Renal and genitourinary", "Musculoskeletal and joint", "Skin, eye and ear", "Malignant disease and immunosuppression", "Blood and nutrition", "Special populations", "Pharmaceutical science"],
  },
};
const ALL4 = ["Person-centred care and collaboration", "Professional practice", "Leadership and management", "Education and research"];
export const MAP = {
  u01: { gphc: ALL4 },
  u02: { gphc: ["Professional practice"], ra: ["Pharmaceutical science"] },
  u03: { gphc: ["Professional practice"], ra: ["Pharmaceutical science"] },
  u04: { gphc: ["Professional practice"], ra: ["Pharmaceutical science"] },
  u05: { gphc: ["Professional practice"], ra: ["Pharmaceutical science"] },
  u06: { gphc: ["Professional practice"], ra: ["Calculations"] },
  u07: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Cardiovascular"] },
  u08: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Respiratory"] },
  u09: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Endocrine"] },
  u10: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Central nervous system"] },
  u11: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Infections"] },
  u12: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Gastrointestinal", "Renal and genitourinary", "Blood and nutrition"] },
  u13: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Musculoskeletal and joint", "Skin, eye and ear"] },
  u14: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Malignant disease and immunosuppression", "Blood and nutrition"] },
  u15: { gphc: ["Person-centred care and collaboration", "Professional practice"], ra: ["Special populations"] },
  u16: { gphc: ["Professional practice", "Leadership and management"], ra: ["Law, ethics and professional standards"] },
  u17: { gphc: ["Person-centred care and collaboration", "Professional practice", "Leadership and management"], ra: ["Law, ethics and professional standards", "Special populations"] },
  u18: { gphc: ["Person-centred care and collaboration", "Professional practice", "Leadership and management", "Education and research"] },
  u19: { gphc: ["Professional practice", "Education and research"], ra: ["Calculations", "Law, ethics and professional standards"] },
};
