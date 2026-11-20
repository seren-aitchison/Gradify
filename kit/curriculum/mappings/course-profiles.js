// What each Gradify course teaches, at which bands and for which nations: the bridge between the catalogue
// (kit/curriculum/catalogue/uk.js) and the courses. `subjects` are taught as the course's subject; `related` are
// taught in part (GCSE Core teaches combined science, which covers part of GCSE biology, chemistry and physics).
// `basis` says where the profile comes from: the course's own notice or overview ("stated"), its LV: lines
// ("levels"), or a reading of its syllabus ("inferred"). Inferred profiles are the least certain.
const UK = ["uk-eng", "uk-wal", "uk-sco", "uk-ni"];

export const PROFILES = {
  art: { subjects: ["art-design"], bands: ["upper-secondary", "post-16"], nations: UK, basis: "inferred: built on the GCSE and A level art assessment objectives" },
  biology: { subjects: ["biology"], related: ["human-biology", "combined-science"], bands: ["post-16", "undergraduate"], nations: UK, basis: "stated in its notes: secondary to first-year undergraduate" },
  business: { subjects: ["business"], related: ["economics"], bands: ["post-16", "undergraduate"], nations: UK, basis: "stated: as at A level and the first year of a business degree" },
  careers: { subjects: ["study-skills"], bands: ["post-16", "undergraduate"], nations: UK, basis: "inferred" },
  chemistry: { subjects: ["chemistry"], related: ["combined-science"], bands: ["post-16", "undergraduate"], nations: UK, basis: "levels: Year 1" },
  computing: { subjects: ["computer-science"], related: ["ict"], bands: ["upper-secondary", "post-16", "undergraduate"], nations: UK, basis: "stated: GCSE, A level and the first year of university" },
  dentistry: { subjects: ["dentistry"], bands: ["undergraduate"], nations: UK, basis: "levels: BDS years, preclinical and clinical" },
  design: { subjects: ["design"], related: ["design-technology", "art-design"], bands: ["post-16", "undergraduate"], nations: UK, basis: "inferred" },
  ecology: { subjects: ["environmental-science"], related: ["biology", "geography"], bands: ["post-16", "undergraduate"], nations: UK, basis: "inferred" },
  engineering: { subjects: ["engineering"], bands: ["undergraduate"], nations: UK, basis: "stated: the first and second years of an engineering degree" },
  finance: { subjects: ["accounting", "finance"], bands: ["post-16", "undergraduate"], nations: UK, basis: "inferred" },
  gcse: { subjects: ["combined-science", "english-language", "geography", "wellbeing"], related: ["biology", "chemistry", "physics", "english-literature", "english"], bands: ["upper-secondary"], nations: ["uk-eng"], basis: "stated: 13 to 16 year olds in England; English Language, Combined Science and Geography" },
  health: { subjects: ["health-social-care", "wellbeing"], bands: ["post-16", "undergraduate"], nations: UK, basis: "stated: BTEC Nationals and T Level in Health and Social Care; Level 3 to first-year degree" },
  history: { subjects: ["history"], bands: ["upper-secondary", "post-16"], nations: UK, basis: "stated: GCSE, A level and independent study" },
  investing: { subjects: ["finance"], related: ["economics"], bands: ["post-16"], nations: UK, basis: "inferred" },
  japanese: { subjects: ["japanese"], bands: ["upper-secondary"], nations: UK, basis: "levels: JLPT N5–N3, GCSE themes" },
  law: { subjects: ["law"], bands: ["undergraduate"], nations: ["uk-eng", "uk-wal"], basis: "stated: law of England and Wales, degree and SQE" },
  literature: { subjects: ["english-literature"], bands: ["upper-secondary", "post-16"], nations: UK, basis: "inferred: GCSE and A level set texts" },
  maths: { subjects: ["maths", "further-maths", "statistics"], bands: ["upper-secondary", "post-16", "undergraduate"], nations: UK, basis: "stated: GCSE, A level and degree (map.js)" },
  medicine: { subjects: ["medicine"], bands: ["undergraduate"], nations: UK, basis: "stated: as a UK medical school teaches it" },
  music: { subjects: ["music"], bands: ["upper-secondary", "post-16", "undergraduate"], nations: UK, basis: "stated: from the first note to first-year university" },
  nursing: { subjects: ["nursing"], bands: ["undergraduate"], nations: UK, basis: "stated: NMC standards of proficiency" },
  pharmacy: { subjects: ["pharmacy"], bands: ["undergraduate"], nations: UK, basis: "stated: GPhC standards" },
  physics: { subjects: ["physics"], related: ["combined-science", "astronomy"], bands: ["post-16", "undergraduate"], nations: UK, basis: "inferred: A level to degree" },
  primary: { subjects: ["maths", "english", "combined-science", "history", "geography"], bands: ["primary"], nations: ["uk-eng"], basis: "stated: children aged 5 to 11; national curriculum in England" },
  professional: { subjects: ["study-skills"], bands: ["undergraduate"], nations: UK, basis: "inferred" },
  psychology: { subjects: ["psychology"], bands: ["post-16", "undergraduate"], nations: UK, basis: "levels: introductory to advanced" },
  research: { subjects: ["study-skills"], bands: ["postgraduate"], nations: UK, basis: "levels: postgraduate" },
  sociology: { subjects: ["sociology"], bands: ["post-16", "undergraduate"], nations: UK, basis: "levels: introductory to advanced" },
  spanish: { subjects: ["spanish"], bands: ["upper-secondary"], nations: UK, basis: "levels: CEFR A1–B1" },
  sport: { subjects: ["pe"], bands: ["post-16", "undergraduate"], nations: UK, basis: "levels: Level 3 to advanced" },
  teaching: { subjects: ["education"], related: ["child-development"], bands: ["undergraduate"], nations: UK, basis: "inferred" },
  university: { subjects: ["study-skills"], bands: ["undergraduate"], nations: UK, basis: "stated: general study skills" },
  veterinary: { subjects: ["veterinary"], bands: ["undergraduate"], nations: UK, basis: "stated: as a UK veterinary degree teaches it" },
};
