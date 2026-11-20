// The UK curriculum landscape: what a learner in each nation can study, at every level, from every awarding body.
// This is the denominator of Gradify's coverage: kit/curriculum/matrix.js sets every Gradify course against it.
//
// A catalogue row says "this qualification exists": awarding body, qualification, subject, specification code, the
// nations where schools and colleges use it, and its band. It is not a specification record. A row's detailed
// requirements live in kit/curriculum/specifications/ once modelled; `spec` links them.
//
// Provenance: rows were listed from knowledge of the UK qualifications landscape as at 2025–26 and are UNCHECKED
// (`LISTING`). Codes are given only where they were known with confidence; null means "not recorded", not "none".
// Before a row's code or availability is relied on, check it on the awarding body's site and set `listed` on the row.
// Nations: where state-funded schools and colleges normally use the qualification. Independent schools anywhere may
// enter other boards' qualifications (IGCSEs especially); rows don't try to record that.

export const LISTING = { on: "2026-11-19", by: "automated (from knowledge, unchecked)", checked: null };
const ENG = ["uk-eng"], ENG_NI = ["uk-eng", "uk-ni"], WAL = ["uk-wal"], NI = ["uk-ni"], SCO = ["uk-sco"], ALL = ["uk-eng", "uk-wal", "uk-sco", "uk-ni"];
const EWN = ["uk-eng", "uk-wal", "uk-ni"];

export const BODIES = {
  aqa: { name: "AQA", regulator: "Ofqual", url: "https://www.aqa.org.uk" },
  pearson: { name: "Pearson Edexcel", regulator: "Ofqual", url: "https://qualifications.pearson.com" },
  ocr: { name: "OCR", regulator: "Ofqual", url: "https://www.ocr.org.uk" },
  eduqas: { name: "WJEC Eduqas", regulator: "Ofqual", url: "https://www.eduqas.co.uk" },
  wjec: { name: "WJEC", regulator: "Qualifications Wales", url: "https://www.wjec.co.uk" },
  ccea: { name: "CCEA", regulator: "CCEA Regulation", url: "https://www.ccea.org.uk" },
  sqa: { name: "SQA", regulator: "SQA Accreditation", url: "https://www.sqa.org.uk" },
  cie: { name: "Cambridge International", regulator: "(international; Ofqual-regulated variants exist)", url: "https://www.cambridgeinternational.org" },
  "t-level-aos": { name: "T Level awarding organisations (Pearson, NCFE, City & Guilds and others)", regulator: "Ofqual / IfATE", url: "https://www.gov.uk/government/publications/introduction-of-t-levels" },
  "access-avas": { name: "Access Validating Agencies (licensed by the QAA)", regulator: "QAA", url: "https://www.accesstohe.ac.uk" },
  qaa: { name: "Quality Assurance Agency for Higher Education", regulator: "(sector reference points)", url: "https://www.qaa.ac.uk" },
  dfe: { name: "Department for Education", regulator: "(statutory curriculum, England)", url: "https://www.gov.uk/government/collections/national-curriculum" },
  "welsh-gov": { name: "Welsh Government", regulator: "(Curriculum for Wales)", url: "https://hwb.gov.wales/curriculum-for-wales" },
  "scot-gov": { name: "Education Scotland", regulator: "(Curriculum for Excellence)", url: "https://education.gov.scot" },
  "ni-doe": { name: "CCEA for the Department of Education (NI)", regulator: "(Northern Ireland Curriculum)", url: "https://ccea.org.uk/learning-resources/northern-ireland-curriculum" },
};

// Subjects, as a learner would search for them. `group` drives the dashboard's grouping.
export const SUBJECTS = {
  maths: ["Mathematics", "Mathematics"], "further-maths": ["Further mathematics", "Mathematics"], statistics: ["Statistics", "Mathematics"],
  "english-language": ["English language", "English"], "english-literature": ["English literature", "English"], english: ["English", "English"],
  biology: ["Biology", "Sciences"], chemistry: ["Chemistry", "Sciences"], physics: ["Physics", "Sciences"], "combined-science": ["Combined or double science", "Sciences"],
  "applied-science": ["Applied science", "Sciences"], "environmental-science": ["Environmental science", "Sciences"], "human-biology": ["Human biology", "Sciences"], astronomy: ["Astronomy", "Sciences"],
  geography: ["Geography", "Humanities"], history: ["History", "Humanities"], "religious-studies": ["Religious studies", "Humanities"], "modern-studies": ["Modern studies", "Humanities"],
  philosophy: ["Philosophy", "Humanities"], politics: ["Politics", "Humanities"], classics: ["Classics, Latin and ancient history", "Humanities"], citizenship: ["Citizenship", "Humanities"],
  psychology: ["Psychology", "Social sciences"], sociology: ["Sociology", "Social sciences"], economics: ["Economics", "Social sciences"], law: ["Law", "Social sciences"],
  business: ["Business", "Business and finance"], accounting: ["Accounting", "Business and finance"], finance: ["Finance", "Business and finance"],
  "computer-science": ["Computer science", "Technology"], ict: ["ICT and digital technology", "Technology"], "design-technology": ["Design and technology", "Technology"],
  engineering: ["Engineering", "Technology"], design: ["Design", "Arts"],
  "art-design": ["Art and design", "Arts"], music: ["Music", "Arts"], drama: ["Drama and performing arts", "Arts"], dance: ["Dance", "Arts"], media: ["Media and film", "Arts"],
  french: ["French", "Languages"], spanish: ["Spanish", "Languages"], german: ["German", "Languages"], japanese: ["Japanese", "Languages"], chinese: ["Chinese", "Languages"],
  welsh: ["Welsh", "Languages"], irish: ["Irish", "Languages"], gaelic: ["Gaelic", "Languages"],
  pe: ["Physical education and sport", "Health and sport"], "health-social-care": ["Health and social care", "Health and sport"], food: ["Food and nutrition", "Health and sport"],
  "child-development": ["Childcare and early years", "Health and sport"], wellbeing: ["Health and wellbeing, PSHE", "Health and sport"],
  medicine: ["Medicine", "Professions"], nursing: ["Nursing", "Professions"], pharmacy: ["Pharmacy", "Professions"], dentistry: ["Dentistry", "Professions"],
  veterinary: ["Veterinary science", "Professions"], education: ["Education and teaching", "Professions"],
  "study-skills": ["Study, research and employability skills", "Skills"],
};

// a compact row builder: [subject, code, title?]
const rows = (body, qualification, band, nations, list, extra = {}) =>
  list.map(([subject, code = null, title = null]) => ({ body, qualification, band, nations, subject, code, title: title || SUBJECTS[subject][0], ...extra }));

// ── Qualifications (upper secondary and post-16) ──────────────────────────────────────────────────────────────────
const GCSE_AQA = rows("aqa", "gcse", "upper-secondary", ENG_NI, [
  ["maths", "8300"], ["statistics", "8382"], ["english-language", "8700"], ["english-literature", "8702"],
  ["biology", "8461"], ["chemistry", "8462"], ["physics", "8463"], ["combined-science", "8464", "Combined Science: Trilogy"], ["combined-science", "8465", "Combined Science: Synergy"],
  ["geography", "8035"], ["history", "8145"], ["religious-studies", "8062", "Religious Studies A"], ["citizenship", "8100"],
  ["psychology", "8182"], ["sociology", "8192"], ["economics", "8136"], ["business", "8132"],
  ["computer-science", "8525"], ["design-technology", "8552"], ["food", "8585", "Food Preparation and Nutrition"],
  ["art-design", null], ["drama", "8261"], ["dance", "8236"], ["music", "8271"], ["pe", "8582"],
  ["french", "8652"], ["german", "8662"], ["spanish", "8692"], ["chinese", "8673", "Chinese (spoken Mandarin)"],
]);
const GCSE_PEARSON = rows("pearson", "gcse", "upper-secondary", ENG_NI, [
  ["maths", "1MA1"], ["statistics", "1ST0"], ["english-language", "1EN0"], ["english-literature", "1ET0"],
  ["biology", "1BI0"], ["chemistry", "1CH0"], ["physics", "1PH0"], ["combined-science", "1SC0"], ["astronomy", "1AS0"],
  ["geography", "1GA0", "Geography A"], ["geography", "1GB0", "Geography B"], ["history", "1HI0"], ["religious-studies", null],
  ["psychology", "1PS0"], ["business", "1BS0"], ["computer-science", "1CP2"], ["design-technology", null],
  ["art-design", null], ["drama", null], ["music", "1MU0"], ["pe", "1PE0"],
  ["french", "1FR1"], ["german", "1GN1"], ["spanish", "1SP1"], ["japanese", null], ["chinese", null],
]);
const GCSE_OCR = rows("ocr", "gcse", "upper-secondary", ENG_NI, [
  ["maths", "J560"], ["english-language", "J351"], ["english-literature", "J352"],
  ["biology", "J247", "Biology A (Gateway)"], ["chemistry", "J248", "Chemistry A (Gateway)"], ["physics", "J249", "Physics A (Gateway)"], ["combined-science", "J250", "Combined Science A (Gateway)"],
  ["biology", "J257", "Biology B (Twenty First Century)"], ["chemistry", "J258", "Chemistry B (Twenty First Century)"], ["physics", "J259", "Physics B (Twenty First Century)"], ["combined-science", "J260", "Combined Science B (Twenty First Century)"],
  ["geography", "J383", "Geography A"], ["geography", "J384", "Geography B"], ["history", "J410", "History A (Explaining the Modern World)"], ["history", "J411", "History B (Schools History Project)"],
  ["religious-studies", "J625"], ["classics", "J199", "Classical Civilisation"], ["classics", "J198", "Ancient History"], ["classics", "J282", "Latin"], ["citizenship", "J270"],
  ["psychology", "J203"], ["business", "J204"], ["economics", "J205"], ["computer-science", "J277"],
  ["design-technology", "J310"], ["food", "J309"], ["art-design", null], ["drama", "J316"], ["music", "J536"], ["pe", "J587"],
  ["french", null], ["german", null], ["spanish", null],
]);
const GCSE_EDUQAS = rows("eduqas", "gcse", "upper-secondary", ENG, [
  ["maths", null], ["english-language", null], ["english-literature", null], ["biology", null], ["chemistry", null], ["physics", null],
  ["combined-science", null, "Combined Science"], ["geography", null], ["history", null], ["religious-studies", null], ["sociology", null],
  ["computer-science", null], ["media", null, "Film Studies"], ["media", null, "Media Studies"], ["music", null], ["drama", null], ["food", null], ["french", null], ["spanish", null], ["german", null],
]);
// Wales: the "made-for-Wales" GCSEs, first teaching from 2025 (some from 2026/27); the subject list is changing
const GCSE_WJEC = rows("wjec", "gcse", "upper-secondary", WAL, [
  ["maths", null, "Mathematics and Numeracy"], ["english-language", null, "English Language and Literature"], ["welsh", null, "Welsh Language and Literature"],
  ["combined-science", null, "The Sciences (double award)"], ["biology", null], ["chemistry", null], ["physics", null],
  ["geography", null], ["history", null], ["religious-studies", null, "Religion, Philosophy and Ethics"], ["business", null],
  ["computer-science", null], ["ict", null, "Digital Technology"], ["design-technology", null, "Design and Technology"], ["food", null, "Food and Nutrition"],
  ["art-design", null], ["drama", null], ["music", null], ["dance", null], ["pe", null, "Physical Education and Health"], ["media", null, "Film and Digital Media"],
  ["french", null], ["spanish", null], ["german", null],
], { note: "Made-for-Wales GCSEs replace the previous WJEC GCSEs in stages from 2025." });
const GCSE_CCEA = rows("ccea", "gcse", "upper-secondary", NI, [
  ["maths", null], ["further-maths", null], ["english-language", null], ["english-literature", null],
  ["biology", null], ["chemistry", null], ["physics", null], ["combined-science", null, "Double Award Science"], ["combined-science", null, "Single Award Science"],
  ["geography", null], ["history", null], ["religious-studies", null], ["citizenship", null, "Learning for Life and Work"],
  ["business", null, "Business Studies"], ["economics", null], ["ict", null, "Digital Technology"], ["computer-science", null],
  ["food", null, "Home Economics: Food and Nutrition"], ["art-design", null], ["drama", null], ["music", null], ["pe", null], ["media", null, "Moving Image Arts"],
  ["irish", null], ["french", null], ["spanish", null], ["german", null],
]);
const IGCSE_PEARSON = rows("pearson", "igcse", "upper-secondary", ALL, [
  ["maths", "4MA1", "Mathematics A"], ["further-maths", "4PM1", "Further Pure Mathematics"], ["biology", "4BI1"], ["chemistry", "4CH1"], ["physics", "4PH1"], ["combined-science", "4SD0", "Science (Double Award)"],
  ["english-language", "4EA1", "English Language A"], ["english-literature", "4ET1"], ["history", "4HI1"], ["geography", "4GE1"], ["business", "4BS1"], ["economics", "4EC1"],
  ["accounting", "4AC1"], ["computer-science", "4CP0"], ["ict", "4IT1"], ["french", "4FR1"], ["spanish", "4SP1"], ["german", "4GN1"], ["chinese", "4CN1"],
], { note: "International GCSE: taken mainly in independent schools in the UK." });
const IGCSE_CIE = rows("cie", "igcse", "upper-secondary", ALL, [
  ["maths", "0580"], ["further-maths", "0606", "Additional Mathematics"], ["biology", "0610"], ["chemistry", "0620"], ["physics", "0625"], ["combined-science", "0653", "Combined Science"], ["combined-science", "0654", "Co-ordinated Sciences"],
  ["english-language", "0500", "First Language English"], ["english-literature", "0475", "Literature in English"], ["history", "0470"], ["geography", "0460"],
  ["business", "0450"], ["economics", "0455"], ["accounting", "0452"], ["sociology", "0495"], ["computer-science", "0478"], ["ict", "0417"],
  ["art-design", "0400"], ["music", "0410"], ["pe", "0413"], ["religious-studies", "0490"], ["french", "0520"], ["german", "0525"], ["spanish", "0530"],
], { note: "Cambridge IGCSE: taken mainly in independent schools in the UK." });

const A_AQA = rows("aqa", "a-level", "post-16", ENG_NI, [
  ["maths", "7357"], ["further-maths", "7367"], ["biology", "7402"], ["chemistry", "7405"], ["physics", "7408"], ["environmental-science", "7447"],
  ["english-language", "7702"], ["english-literature", "7712", "English Literature A"], ["english-literature", "7717", "English Literature B"], ["english-language", "7707", "English Language and Literature"],
  ["geography", "7037"], ["history", "7042"], ["religious-studies", "7062"], ["philosophy", "7172"], ["politics", "7152"],
  ["psychology", "7182"], ["sociology", "7192"], ["economics", "7136"], ["law", "7162"], ["business", "7132"], ["accounting", "7127"],
  ["computer-science", "7517"], ["design-technology", "7552", "Design and Technology: Product Design"], ["art-design", null], ["drama", "7262"], ["dance", "7237"], ["music", "7272"], ["pe", "7582"],
  ["french", "7652"], ["german", "7662"], ["spanish", "7692"],
]);
const A_PEARSON = rows("pearson", "a-level", "post-16", ENG_NI, [
  ["maths", "9MA0"], ["further-maths", "9FM0"], ["statistics", "9ST0"], ["biology", "9BN0", "Biology A (Salters-Nuffield)"], ["biology", "9BI0", "Biology B"], ["chemistry", "9CH0"], ["physics", "9PH0"],
  ["english-language", "9EN0"], ["english-literature", "9ET0"], ["geography", "9GE0"], ["history", "9HI0"], ["religious-studies", "9RS0"], ["politics", "9PL0"],
  ["psychology", "9PS0"], ["economics", "9EC0", "Economics A"], ["economics", "9EB0", "Economics B"], ["business", "9BS0"],
  ["art-design", null], ["drama", null], ["music", "9MU0"], ["pe", null], ["french", "9FR0"], ["german", "9GN0"], ["spanish", "9SP0"], ["japanese", null], ["chinese", null],
]);
const A_OCR = rows("ocr", "a-level", "post-16", ENG_NI, [
  ["maths", "H240", "Mathematics A"], ["maths", "H640", "Mathematics B (MEI)"], ["further-maths", "H245", "Further Mathematics A"], ["further-maths", "H645", "Further Mathematics B (MEI)"],
  ["biology", "H420", "Biology A"], ["biology", "H422", "Biology B (Advancing Biology)"], ["chemistry", "H432", "Chemistry A"], ["chemistry", "H433", "Chemistry B (Salters)"], ["physics", "H556", "Physics A"], ["physics", "H557", "Physics B (Advancing Physics)"],
  ["english-language", "H470"], ["english-literature", "H472"], ["history", "H505", "History A"], ["geography", "H481"], ["religious-studies", "H573"], ["classics", "H408", "Classical Civilisation"], ["classics", "H443", "Latin"],
  ["psychology", "H567"], ["sociology", "H580"], ["economics", "H460"], ["business", "H431"], ["law", "H418"], ["computer-science", "H446"], ["pe", "H555"], ["music", null], ["drama", null], ["art-design", null],
]);
const A_EDUQAS = rows("eduqas", "a-level", "post-16", ENG, [
  ["biology", null], ["chemistry", null], ["physics", null], ["maths", null], ["english-language", null], ["english-literature", null], ["history", null], ["geography", null],
  ["psychology", null], ["sociology", null], ["economics", null], ["law", null], ["religious-studies", null], ["computer-science", null], ["media", null, "Film Studies"], ["media", null, "Media Studies"], ["music", null],
]);
const A_WJEC = rows("wjec", "a-level", "post-16", WAL, [
  ["maths", null], ["further-maths", null], ["biology", null], ["chemistry", null], ["physics", null], ["english-language", null], ["english-literature", null], ["welsh", null],
  ["history", null], ["geography", null], ["religious-studies", null], ["psychology", null], ["sociology", null], ["economics", null], ["law", null], ["business", null],
  ["computer-science", null], ["ict", null, "Digital Technology"], ["art-design", null], ["music", null], ["drama", null], ["pe", null], ["french", null], ["spanish", null], ["german", null],
]);
const A_CCEA = rows("ccea", "a-level", "post-16", NI, [
  ["maths", null], ["further-maths", null], ["biology", null], ["chemistry", null], ["physics", null], ["english-literature", null], ["english-language", null],
  ["history", null], ["geography", null], ["religious-studies", null], ["politics", null, "Government and Politics"], ["economics", null], ["business", null, "Business Studies"],
  ["computer-science", null, "Software Systems Development"], ["ict", null, "Digital Technology"], ["health-social-care", null], ["art-design", null], ["music", null], ["drama", null], ["pe", null], ["media", null, "Moving Image Arts"],
  ["irish", null], ["french", null], ["spanish", null], ["german", null],
]);
// AS levels: separately certificated in England (where they no longer count towards the A level), and part of the
// A level in Wales and Northern Ireland. Listed for the main boards in England.
const AS = [
  ...rows("aqa", "as-level", "post-16", ENG_NI, [["biology", "7401"], ["chemistry", "7404"], ["physics", "7407"], ["maths", "7356"], ["psychology", "7181"], ["sociology", "7191"], ["english-literature", "7711", "English Literature A"], ["history", "7041"], ["geography", "7036"], ["computer-science", "7516"], ["business", "7131"], ["economics", "7135"], ["law", "7161"]]),
  ...rows("pearson", "as-level", "post-16", ENG_NI, [["maths", "8MA0"], ["further-maths", "8FM0"], ["biology", "8BN0", "Biology A (Salters-Nuffield)"], ["chemistry", "8CH0"], ["physics", "8PH0"], ["psychology", "8PS0"], ["economics", "8EC0", "Economics A"], ["business", "8BS0"]]),
  ...rows("ocr", "as-level", "post-16", ENG_NI, [["maths", "H230", "Mathematics A"], ["biology", "H020", "Biology A"], ["chemistry", "H032", "Chemistry A"], ["physics", "H156", "Physics A"], ["computer-science", "H046"], ["psychology", "H167"]]),
];
const CIE_A = rows("cie", "a-level", "post-16", ALL, [
  ["biology", "9700"], ["chemistry", "9701"], ["physics", "9702"], ["maths", "9709"], ["further-maths", "9231"], ["economics", "9708"], ["business", "9609"], ["psychology", "9990"],
  ["computer-science", "9618"], ["sociology", "9699"], ["english-literature", "9695"], ["english-language", "9093"], ["history", "9489"], ["geography", "9696"], ["law", "9084"], ["accounting", "9706"],
], { note: "Cambridge International AS and A Level: taken mainly in independent schools in the UK." });

// Scotland: National 4 and 5 (S4), Higher (S5–S6), Advanced Higher (S6)
const SQA_SUBJECTS = [
  ["maths", null], ["maths", null, "Applications of Mathematics"], ["english", null], ["biology", null], ["chemistry", null], ["physics", null],
  ["geography", null], ["history", null], ["modern-studies", null], ["religious-studies", null, "Religious, Moral and Philosophical Studies"],
  ["computer-science", null, "Computing Science"], ["business", null, "Business Management"], ["accounting", null], ["economics", null],
  ["psychology", null], ["engineering", null, "Engineering Science"], ["design-technology", null, "Design and Manufacture"], ["design-technology", null, "Graphic Communication"],
  ["ict", null, "Administration and IT"], ["environmental-science", null], ["art-design", null], ["music", null], ["drama", null], ["pe", null], ["food", null, "Health and Food Technology"],
  ["french", null], ["spanish", null], ["german", null], ["gaelic", null, "Gàidhlig"], ["chinese", null, "Mandarin"],
];
const SQA = [
  ...rows("sqa", "nat4", "upper-secondary", SCO, SQA_SUBJECTS.filter(([s]) => !["psychology", "economics", "accounting", "environmental-science"].includes(s))),
  ...rows("sqa", "nat5", "upper-secondary", SCO, SQA_SUBJECTS),
  ...rows("sqa", "higher", "post-16", SCO, [...SQA_SUBJECTS, ["human-biology", null], ["sociology", null], ["politics", null]]),
  ...rows("sqa", "adv-higher", "post-16", SCO, [["maths", null], ["maths", null, "Mathematics of Mechanics"], ["statistics", null], ["english", null], ["biology", null], ["chemistry", null], ["physics", null],
    ["geography", null], ["history", null], ["modern-studies", null], ["computer-science", null, "Computing Science"], ["business", null, "Business Management"], ["accounting", null], ["economics", null],
    ["engineering", null, "Engineering Science"], ["art-design", null], ["music", null], ["drama", null], ["pe", null], ["french", null], ["spanish", null], ["german", null], ["gaelic", null, "Gàidhlig"]]),
];

// ── Vocational and access ───────────────────────────────────────────────────────────────────────────────────────────
const VOCATIONAL = [
  ...rows("pearson", "btec-tech-award", "upper-secondary", EWN, [["health-social-care"], ["pe", null, "Sport, Activity and Fitness"], ["business", null, "Enterprise"], ["ict", null, "Digital Information Technology"],
    ["media", null, "Creative Media Production"], ["drama", null, "Performing Arts"], ["music", null, "Music Practice"], ["art-design", null, "Art and Design Practice"], ["engineering"], ["child-development", null, "Children's Play, Learning and Development"]]),
  ...rows("ocr", "cambridge-national", "upper-secondary", ENG_NI, [["ict", null, "Information Technologies"], ["media", null, "Creative iMedia"], ["pe", null, "Sport Studies"], ["pe", null, "Sport Science"],
    ["business", null, "Enterprise and Marketing"], ["engineering", null, "Engineering Design"], ["health-social-care"], ["child-development", null, "Child Development"]]),
  ...rows("pearson", "btec-national", "post-16", EWN, [["applied-science"], ["business"], ["health-social-care"], ["ict", null, "Information Technology"], ["computer-science", null, "Computing"],
    ["pe", null, "Sport"], ["pe", null, "Sport and Exercise Science"], ["engineering"], ["psychology", null, "Applied Psychology"], ["law", null, "Applied Law"], ["art-design"],
    ["media", null, "Creative Digital Media Production"], ["drama", null, "Performing Arts"], ["music"], ["child-development", null, "Children's Play, Learning and Development"]]),
  ...rows("t-level-aos", "t-level", "post-16", ENG, [["ict", null, "Digital Production, Design and Development"], ["ict", null, "Digital Support and Services"], ["child-development", null, "Education and Early Years"],
    ["health-social-care", null, "Health"], ["applied-science", null, "Healthcare Science"], ["applied-science", null, "Science"], ["engineering", null, "Engineering, Manufacturing, Processing and Control"],
    ["engineering", null, "Design and Development for Engineering and Manufacturing"], ["engineering", null, "Building Services Engineering for Construction"], ["accounting"], ["finance"],
    ["law", null, "Legal Services"], ["business", null, "Management and Administration"], ["environmental-science", null, "Agriculture, Land Management and Production"], ["veterinary", null, "Animal Care and Management"], ["media", null, "Media, Broadcast and Production"]]),
  ...rows("access-avas", "access-he", "post-16", EWN, [["medicine", null, "Access to HE: Medicine and health professions"], ["nursing", null, "Access to HE: Nursing and midwifery"], ["applied-science", null, "Access to HE: Science"],
    ["psychology", null, "Access to HE: Psychology and social sciences"], ["law", null, "Access to HE: Law"], ["business", null, "Access to HE: Business"], ["computer-science", null, "Access to HE: Computing"],
    ["engineering", null, "Access to HE: Engineering"], ["education", null, "Access to HE: Teaching and education"], ["history", null, "Access to HE: Humanities"]]),
];

// ── Higher education: the QAA Subject Benchmark Statements (UK-wide reference points for degrees) ────────────────
const UNIVERSITY = rows("qaa", "degree", "undergraduate", ALL, [
  ["accounting"], ["art-design"], ["biology", null, "Biosciences"], ["business", null, "Business and Management"], ["chemistry"], ["computer-science", null, "Computing"],
  ["dentistry"], ["child-development", null, "Early Childhood Studies"], ["environmental-science", null, "Earth Sciences, Environmental Sciences and Environmental Studies"], ["economics"],
  ["education", null, "Education Studies"], ["engineering"], ["english-literature", null, "English"], ["finance"], ["geography"], ["health-social-care", null, "Health Studies"], ["history"],
  ["french", null, "Languages, Cultures and Societies"], ["law"], ["maths", null, "Mathematics, Statistics and Operational Research"], ["medicine"], ["music"], ["pharmacy"],
  ["physics", null, "Physics, Astronomy and Astrophysics"], ["politics", null, "Politics and International Relations"], ["psychology"], ["sociology"],
  ["pe", null, "Events, Hospitality, Leisure, Sport and Tourism"], ["religious-studies", null, "Theology and Religious Studies"], ["veterinary", null, "Veterinary Science"],
  ["drama", null, "Dance, Drama and Performance"], ["media", null, "Communication, Media, Film and Cultural Studies"], ["nursing", null, "Nursing (NMC standards of proficiency)"],
], { note: "QAA Subject Benchmark Statement; universities set their own modules and outcomes." });

// ── National curricula, by nation and stage ─────────────────────────────────────────────────────────────────────────
const NC = [
  ...rows("dfe", null, "early", ENG, [["english", null, "EYFS: Communication and language; Literacy"], ["maths", null, "EYFS: Mathematics"], ["wellbeing", null, "EYFS: Personal, social and emotional development; Physical development"],
    ["combined-science", null, "EYFS: Understanding the world"], ["art-design", null, "EYFS: Expressive arts and design"]], { framework: "Early Years Foundation Stage" }),
  ...rows("dfe", null, "primary", ENG, [["english"], ["maths"], ["combined-science", null, "Science"], ["art-design"], ["computer-science", null, "Computing"], ["design-technology"], ["geography"], ["history"], ["french", null, "Languages (Key Stage 2)"], ["music"], ["pe"]], { framework: "National curriculum, Key Stages 1 and 2" }),
  ...rows("dfe", null, "lower-secondary", ENG, [["english"], ["maths"], ["combined-science", null, "Science"], ["art-design"], ["citizenship"], ["computer-science", null, "Computing"], ["design-technology"], ["geography"], ["history"], ["french", null, "Languages"], ["music"], ["pe"]], { framework: "National curriculum, Key Stage 3" }),
  ...["early", "primary", "lower-secondary"].flatMap((band) => rows("welsh-gov", null, band, WAL, [["art-design", null, "Expressive Arts"], ["wellbeing", null, "Health and Well-being"], ["history", null, "Humanities"],
    ["english", null, "Languages, Literacy and Communication"], ["maths", null, "Mathematics and Numeracy"], ["combined-science", null, "Science and Technology"]], { framework: "Curriculum for Wales: Areas of Learning and Experience" })),
  ...["early", "primary", "lower-secondary"].flatMap((band) => rows("scot-gov", null, band, SCO, [["art-design", null, "Expressive arts"], ["wellbeing", null, "Health and wellbeing"], ["english", null, "Languages"], ["maths", null, "Mathematics"],
    ["religious-studies", null, "Religious and moral education"], ["combined-science", null, "Sciences"], ["history", null, "Social studies"], ["computer-science", null, "Technologies"]], { framework: "Curriculum for Excellence (broad general education)" })),
  ...rows("ni-doe", null, "primary", NI, [["english", null, "Language and Literacy"], ["maths", null, "Mathematics and Numeracy"], ["art-design", null, "The Arts"], ["combined-science", null, "The World Around Us"],
    ["wellbeing", null, "Personal Development and Mutual Understanding"], ["pe", null, "Physical Development and Movement"], ["religious-studies", null, "Religious Education"]], { framework: "Northern Ireland Curriculum, Foundation Stage to Key Stage 2" }),
  ...rows("ni-doe", null, "lower-secondary", NI, [["english", null, "Language and Literacy"], ["maths", null, "Mathematics and Numeracy"], ["french", null, "Modern Languages"], ["art-design", null, "The Arts"],
    ["geography", null, "Environment and Society: Geography"], ["history", null, "Environment and Society: History"], ["combined-science", null, "Science and Technology"], ["citizenship", null, "Learning for Life and Work"], ["pe", null, "Physical Education"], ["religious-studies", null, "Religious Education"]], { framework: "Northern Ireland Curriculum, Key Stage 3" }),
];

/** Every catalogue row, with a stable id. */
export const ROWS = [
  ...NC, ...GCSE_AQA, ...GCSE_PEARSON, ...GCSE_OCR, ...GCSE_EDUQAS, ...GCSE_WJEC, ...GCSE_CCEA, ...IGCSE_PEARSON, ...IGCSE_CIE,
  ...AS, ...A_AQA, ...A_PEARSON, ...A_OCR, ...A_EDUQAS, ...A_WJEC, ...A_CCEA, ...CIE_A, ...SQA, ...VOCATIONAL, ...UNIVERSITY,
].map((r) => ({ ...r, id: [r.body, r.qualification || r.band, r.subject, (r.code || r.title).toLowerCase().replace(/[^a-z0-9]+/g, "-")].join(":") }));

// Specification records already modelled (kit/curriculum/specifications/), by catalogue code. Added as they are made.
// National curriculum and framework rows, by body:band:subject (every matching row shares the specification)
export const SPEC_BY_ROW = {
  "dfe:early:*": "dfe-eyfs", "dfe:primary:maths": "dfe-ks12-maths", "dfe:primary:english": "dfe-ks12-english", "dfe:primary:combined-science": "dfe-ks12-science",
  "dfe:lower-secondary:combined-science": "dfe-ks3-science", "dfe:lower-secondary:maths": "dfe-ks3-maths", "dfe:lower-secondary:english": "dfe-ks3-english",
  "dfe:lower-secondary:geography": "dfe-ks3-geography", "dfe:lower-secondary:history": "dfe-ks3-history", "dfe:lower-secondary:computer-science": "dfe-ks3-computing",
};
export const SPEC_BY_CODE = { "aqa:8461": "aqa-8461", "aqa:8462": "aqa-8462", "aqa:8463": "aqa-8463", "aqa:8464": "aqa-8464", "aqa:7402": "aqa-7402", "aqa:7405": "aqa-7405", "aqa:7408": "aqa-7408", "aqa:8300": "aqa-8300", "pearson:1MA1": "edexcel-1ma1", "aqa:8700": "aqa-8700" };
