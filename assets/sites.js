// Every site in the Gradify family.
// To add a site, add a line to the right group. A site with no `url` shows as "Coming soon".
//   n: name   i: icon (see icons.js)   c: brand colour (hex, no #)   d: one-line description
//   u: domain or full URL   label: optional text to show instead of the URL
//   soon: true shows the domain but not as a link yet (for domains bought but not live)
//   spot: optional colour for the big featured card at the top (defaults to c)
export const GROUPS = [
  {
    id: "stage",
    title: "By stage of life",
    blurb: "Where you are in your education or career.",
    items: [
      { n: "UnderGradify", i: "cap", c: "3c78d8", d: "For undergraduates: module revision, lecture notes, flashcards, exam prep, coursework planning and degree progress.", u: "undergradify.com" },
      { n: "PostGradify", i: "book", c: "2e5e18", d: "For postgraduates and researchers: advanced study, literature organisation, dissertation planning and specialist exams.", u: "postgradify.com" },
      { n: "ProGradify", i: "briefcase", c: "e69138", d: "For working professionals: CPD, certification prep, workplace skills and career progression.", u: "progradify.com" },
      { n: "EduGradify", i: "board", c: "ffc002", d: "For teachers and educators: teaching resources, lesson preparation and professional development." },
      { n: "YouthGradify", i: "backpack", c: "ffea05", d: "For young people: school learning, new skills and early career decisions, bridging school and adult learning.", u: "youthgradify.com" },
      { n: "JuniorGradify", i: "pencil", c: "a0ff74", d: "For younger learners: strong foundations, interactive practice and age-appropriate activities.", u: "juniorgradify.com" },
    ],
  },
  {
    id: "profession",
    title: "By profession",
    blurb: "Training and revision for a specific career.",
    items: [
      { n: "LawGradify", i: "scales", c: "9f2f17", d: "Case law, legislation, legal terminology and exam prep for legal qualifications.", u: "gradifylaw.com" },
      { n: "BusinessGradify", i: "building", c: "674ea6", d: "Management, entrepreneurship, strategy, marketing, operations and real case studies.", u: "gradifybusiness.com" },
      { n: "FinanceGradify", i: "coins", c: "783f04", d: "Finance and accounting concepts, and revision for professional qualifications.", u: "gradifyfinance.com" },
      { n: "InvestorGradify", i: "trend", c: "808250", d: "Markets, portfolios, valuation and risk. Investing education, not financial advice." },
      { n: "MedGradify", i: "stethoscope", c: "4641ff", d: "Anatomy, physiology, pharmacology, clinical concepts and medical exam revision.", u: "gradifymed.com" },
      { n: "DentalGradify", i: "tooth", c: "40d4b1", d: "Oral anatomy, dental materials, clinical knowledge and dentistry exams.", u: "gradifydental.com" },
      { n: "VetGradify", i: "paw", c: "409a6e", d: "Animal anatomy, physiology, pathology, pharmacology and veterinary exam prep.", u: "gradifyvet.com" },
      { n: "NurseGradify", i: "cross", c: "6a60ff", d: "Clinical knowledge, pharmacology, patient care and nursing assessments." },
      { n: "PharmaGradify", i: "pill", c: "f99246", d: "Medicinal chemistry, drug mechanisms, therapeutics and pharmacy exams.", u: "gradifypharma.com" },
      { n: "HealthGradify", i: "heartbeat", c: "0e98e5", d: "Health literacy, wellbeing, and the fundamentals of anatomy and physiology.", u: "gradifyhealth.com" },
      { n: "PsychGradify", i: "brain", c: "bbabbe", d: "Cognitive science, behaviour, research methods, statistics and psychology exams." },
      { n: "InternshipGradify", i: "badge", c: "0aa4c9", d: "Internships and work experience, matched to what you've learned on Gradify." },
      { n: "EngineerGradify", i: "cog", c: "ff5600", d: "Maths, mechanics, materials, systems and engineering problem-solving.", u: "gradifyeng.com" },
    ],
  },
  {
    id: "subject",
    title: "By subject",
    blurb: "Study a subject in its own space.",
    items: [
      { n: "MathGradify", i: "sigma", c: "70a7dc", d: "Algebra, calculus, statistics and probability, with worked examples and adaptive practice.", u: "gradifymath.com" },
      { n: "SciGradify", i: "atom", c: "6aa84f", d: "Biology, chemistry, physics and the scientific method, plus interdisciplinary science." },
      { n: "EcoGradify", i: "leaf", c: "6aa84f", d: "Ecology, environmental science, biodiversity and sustainability.", u: "ecogradify.com" },
      { n: "SocGradify", i: "people", c: "a44a99", d: "Sociology, social structures, research methods and social policy." },
      { n: "LitGradify", i: "feather", c: "8c27ca", d: "Literary analysis, close reading, critical interpretation, writing and literary history.", u: "litgradify.com" },
      { n: "LanguageGradify", i: "languages", c: "dd7d6b", d: "Vocabulary, grammar, pronunciation, listening, speaking and writing practice.", u: "gradifylanguage.com" },
      { n: "ArtGradify", i: "palette", c: "f055dd", d: "Techniques, art history, visual composition and creative skills.", u: "gradifyart.com" },
      { n: "MusicGradify", i: "music", c: "a4834a", d: "Theory, instruments, composition, ear training and music history.", u: "gradifymusic.com" },
      { n: "SportGradify", i: "dumbbell", c: "0c26b8", d: "Exercise science, training principles, performance and coaching.", u: "gradifysport.com" },
      { n: "CreateGradify", i: "bulb", c: "e52153", d: "Ideation, design thinking and creative problem-solving across disciplines." },
    ],
  },
  {
    id: "tech",
    title: "Technology",
    blurb: "Code, data and AI, plus tools for your work.",
    items: [
      {
        n: "TechGradify · ForgeLab", i: "forge", c: "666666",
        d: "Hands-on coding, data science and AI engineering, with instant feedback. Forge is the future of TechGradify.",
        u: "techgradify.com", soon: true, spot: "ff5a4d",
      },
      { n: "Klerio", i: "checklist", c: "2a8c82", d: "Clean contact lists and see what changed every week.", u: "getklerio.com", tm: false },
    ],
  },
];

// Extra words people might search for, so "doctor" finds MedGradify.
export const KEYWORDS = {
  UnderGradify: "university uni degree student undergraduate bachelor freshers",
  PostGradify: "masters phd doctorate research dissertation thesis",
  ProGradify: "career job work professional development cpd promotion",
  EduGradify: "teacher teaching school educator lesson planning",
  YouthGradify: "teen teenager gcse a-level secondary school exams",
  JuniorGradify: "kids children primary school child",
  LawGradify: "solicitor barrister legal lawyer sqe bar",
  BusinessGradify: "management mba startup entrepreneur marketing",
  FinanceGradify: "accounting accountant acca cfa banking money",
  InvestorGradify: "stocks shares investing trading markets portfolio",
  MedGradify: "doctor medical medicine anatomy physiology clinical ukmla",
  DentalGradify: "dentist teeth dental oral",
  VetGradify: "vet veterinary animals pets",
  NurseGradify: "nurse nursing midwife midwifery healthcare",
  PharmaGradify: "pharmacist pharmacy drugs medicines pharmacology",
  HealthGradify: "wellbeing sleep nutrition diet mental health habits",
  PsychGradify: "psychology mind behaviour therapy counselling",
  EngineerGradify: "engineering mechanical electrical civil",
  MathGradify: "maths math algebra calculus statistics numbers",
  SciGradify: "science physics chemistry biology bioinformatics molecular",
  EcoGradify: "environment climate ecology sustainability nature",
  SocGradify: "sociology politics economics history geography",
  LitGradify: "english reading books poetry writing literature",
  LanguageGradify: "spanish french german languages vocabulary speaking",
  ArtGradify: "drawing painting design illustration",
  MusicGradify: "instrument piano guitar singing theory",
  SportGradify: "fitness gym exercise workout training running",
  CreateGradify: "creative creativity making crafts video",
  "TechGradify · ForgeLab": "coding programming python ai machine learning data science software developer forge",
  InternshipGradify: "internship work experience placement job graduate scheme summer",
  Klerio: "contacts crm spreadsheet data cleaning",
};

// Sites that rotate through the big featured card at the top of the page, in order.
export const FEATURED = ["TechGradify · ForgeLab", "MedGradify", "LawGradify", "Klerio"];

// Sites listed in the "Start with your stage" panel.
export const START_HERE = ["UnderGradify", "PostGradify", "ProGradify"];
