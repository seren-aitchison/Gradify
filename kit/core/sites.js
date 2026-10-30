// Every site in the Gradify family.
// To add a site, add a line to the right group. A site with no `url` shows as "Coming soon".
//   n: name   who: who it's for   i: icon (see icons.js)   c: brand colour (hex, no #)   d: one-line description
//   u: domain or full URL   label: optional text to show instead of the URL
//   soon: true shows the domain but not as a link yet (for domains bought but not live)
//   built: true once its sub-site exists at getgradify.com/<name>/ (npm run new-site does this);
//          the directory then links there instead of to the domain
//   spot: optional colour for the big featured card at the top (defaults to c)
export const GROUPS = [
  {
    id: "stage",
    title: "By stage of life",
    blurb: "Where you are in your education or career.",
    items: [
      { n: "UnderGradify", who: "Undergraduates at university", i: "cap", c: "3c78d8", d: "For undergraduates: module revision, lecture notes, flashcards, exam prep, coursework planning and degree progress.", u: "undergradify.com", built: true },
      { n: "PostGradify", who: "Master's and PhD students, researchers", i: "book", c: "2e5e18", d: "For postgraduates and researchers: advanced study, literature organisation, dissertation planning and specialist exams.", u: "postgradify.com", built: true },
      { n: "ProGradify", who: "Working professionals", i: "briefcase", c: "e69138", d: "For working professionals: CPD, certification prep, workplace skills and career progression.", u: "progradify.com", built: true },
      { n: "EduGradify", who: "Teachers and educators", i: "board", c: "ffc002", d: "For teachers and educators: teaching resources, lesson preparation and professional development.", built: true },
      { n: "YouthGradify", who: "Teenagers, 13 to 18", i: "backpack", c: "ffea05", d: "For young people: school learning, new skills and early career decisions, bridging school and adult learning.", u: "youthgradify.com", built: true },
      { n: "JuniorGradify", who: "Children, 5 to 12", i: "pencil", c: "a0ff74", d: "For younger learners: strong foundations, interactive practice and age-appropriate activities.", u: "juniorgradify.com", built: true },
    ],
  },
  {
    id: "profession",
    title: "By profession",
    blurb: "Training and revision for a specific career.",
    items: [
      { n: "LawGradify", who: "Law students and trainee lawyers", i: "scales", c: "9f2f17", d: "Case law, legislation, legal terminology and exam prep for legal qualifications.", u: "gradifylaw.com", built: true },
      { n: "BusinessGradify", who: "Business students and managers", i: "building", c: "674ea6", d: "Management, entrepreneurship, strategy, marketing, operations and real case studies.", u: "gradifybusiness.com", built: true },
      { n: "FinanceGradify", who: "Finance and accounting students", i: "coins", c: "783f04", d: "Finance and accounting concepts, and revision for professional qualifications.", u: "gradifyfinance.com", built: true },
      { n: "InvestorGradify", who: "New and growing investors", i: "trend", c: "808250", d: "Markets, portfolios, valuation and risk. Investing education, not financial advice.", built: true },
      { n: "MedGradify", who: "Medical students and junior doctors", i: "stethoscope", c: "4641ff", d: "Anatomy, physiology, pharmacology, clinical concepts and medical exam revision.", u: "gradifymed.com", built: true },
      { n: "DentalGradify", who: "Dental students and dentists", i: "tooth", c: "40d4b1", d: "Oral anatomy, dental materials, clinical knowledge and dentistry exams.", u: "gradifydental.com", built: true },
      { n: "VetGradify", who: "Veterinary students", i: "paw", c: "409a6e", d: "Animal anatomy, physiology, pathology, pharmacology and veterinary exam prep.", u: "gradifyvet.com", built: true },
      { n: "NurseGradify", who: "Student nurses and midwives", i: "cross", c: "6a60ff", d: "Clinical knowledge, pharmacology, patient care and nursing assessments.", built: true },
      { n: "PharmaGradify", who: "Pharmacy students and pharmacists", i: "pill", c: "f99246", d: "Medicinal chemistry, drug mechanisms, therapeutics and pharmacy exams.", u: "gradifypharma.com", built: true },
      { n: "HealthGradify", who: "Anyone improving their health", i: "heartbeat", c: "0e98e5", d: "Health literacy, wellbeing, and the fundamentals of anatomy and physiology.", u: "gradifyhealth.com", built: true },
      { n: "PsychGradify", who: "Psychology students", i: "brain", c: "bbabbe", d: "Cognitive science, behaviour, research methods, statistics and psychology exams.", built: true },
      { n: "InternshipGradify", who: "Students looking for work experience", i: "badge", c: "0aa4c9", d: "Internships and work experience, matched to what you've learned on Gradify.", built: true },
      { n: "EngineerGradify", who: "Engineering students", i: "cog", c: "ff5600", d: "Maths, mechanics, materials, systems and engineering problem-solving.", u: "gradifyeng.com", built: true },
    ],
  },
  {
    id: "subject",
    title: "By subject",
    blurb: "Study a subject in its own space.",
    items: [
      { n: "MathGradify", who: "Maths students at any level", i: "sigma", c: "70a7dc", d: "Algebra, calculus, statistics and probability, with worked examples and adaptive practice.", u: "gradifymath.com", built: true },
      { n: "SciGradify", who: "Science students", i: "atom", c: "6aa84f", d: "Biology, chemistry, physics and the scientific method, plus interdisciplinary science.", built: true },
      { n: "EcoGradify", who: "Ecology and environment students", i: "leaf", c: "6aa84f", d: "Ecology, environmental science, biodiversity and sustainability.", u: "ecogradify.com", built: true },
      { n: "SocGradify", who: "Social science students", i: "people", c: "a44a99", d: "Sociology, social structures, research methods and social policy.", built: true },
      { n: "LitGradify", who: "Literature and English students", i: "feather", c: "8c27ca", d: "Literary analysis, close reading, critical interpretation, writing and literary history.", u: "litgradify.com", built: true },
      { n: "LanguageGradify", who: "Language learners", i: "languages", c: "dd7d6b", d: "Vocabulary, grammar, pronunciation, listening, speaking and writing practice.", u: "gradifylanguage.com", built: true },
      { n: "ArtGradify", who: "Artists and design students", i: "palette", c: "f055dd", d: "Techniques, art history, visual composition and creative skills.", u: "gradifyart.com", built: true },
      { n: "MusicGradify", who: "Musicians and music students", i: "music", c: "a4834a", d: "Theory, instruments, composition, ear training and music history.", u: "gradifymusic.com", built: true },
      { n: "SportGradify", who: "Athletes, coaches and sport students", i: "dumbbell", c: "0c26b8", d: "Exercise science, training principles, performance and coaching.", u: "gradifysport.com", built: true },
      { n: "CreateGradify", who: "Makers and creative thinkers", i: "bulb", c: "e52153", d: "Ideation, design thinking and creative problem-solving across disciplines.", built: true },
    ],
  },
  {
    id: "tech",
    title: "Technology",
    blurb: "Code, data and AI, plus tools for your work.",
    items: [
      {
        n: "TechGradify · ForgeLab", who: "Developers, data scientists and AI engineers", i: "forge", c: "666666",
        d: "Hands-on coding, data science and AI engineering, with instant feedback. Forge is the future of TechGradify.",
        u: "techgradify.com", soon: true, spot: "ff5a4d",
      },
      { n: "Klerio", who: "Small teams with contact lists", i: "checklist", c: "2a8c82", d: "Clean contact lists and see what changed every week.", u: "getklerio.com", tm: false },
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
