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
      { n: "UnderGradify", i: "cap", c: "3c78d8", d: "For undergraduates.", u: "undergradify.com" },
      { n: "PostGradify", i: "book", c: "2e5e18", d: "For postgraduate study and research.", u: "postgradify.com" },
      { n: "ProGradify", i: "briefcase", c: "e69138", d: "For working professionals.", u: "progradify.com" },
      { n: "EduGradify", i: "board", c: "ffc002", d: "For teachers and educators." },
      { n: "YouthGradify", i: "backpack", c: "ffea05", d: "For teenagers.", u: "youthgradify.com" },
      { n: "JuniorGradify", i: "pencil", c: "a0ff74", d: "For younger learners.", u: "juniorgradify.com" },
    ],
  },
  {
    id: "profession",
    title: "By profession",
    blurb: "Training and revision for a specific career.",
    items: [
      { n: "LawGradify", i: "scales", c: "9f2f17", d: "Law.", u: "gradifylaw.com" },
      { n: "BusinessGradify", i: "building", c: "674ea6", d: "Business and management.", u: "gradifybusiness.com" },
      { n: "FinanceGradify", i: "coins", c: "783f04", d: "Finance and accounting.", u: "gradifyfinance.com" },
      { n: "InvestorGradify", i: "trend", c: "808250", d: "Investing and markets." },
      { n: "MedGradify", i: "stethoscope", c: "4641ff", d: "Medicine.", u: "gradifymed.com" },
      { n: "DentalGradify", i: "tooth", c: "40d4b1", d: "Dentistry.", u: "gradifydental.com" },
      { n: "VetGradify", i: "paw", c: "409a6e", d: "Veterinary science.", u: "gradifyvet.com" },
      { n: "NurseGradify", i: "cross", c: "6a60ff", d: "Nursing." },
      { n: "PharmaGradify", i: "pill", c: "f99246", d: "Pharmacy.", u: "gradifypharma.com" },
      { n: "HealthGradify", i: "heartbeat", c: "0e98e5", d: "Health and wellbeing.", u: "gradifyhealth.com" },
      { n: "PsychGradify", i: "brain", c: "bbabbe", d: "Psychology." },
      { n: "EngineerGradify", i: "cog", c: "ff5600", d: "Engineering.", u: "gradifyeng.com" },
    ],
  },
  {
    id: "subject",
    title: "By subject",
    blurb: "Study a subject in its own space.",
    items: [
      { n: "MathGradify", i: "sigma", c: "70a7dc", d: "Mathematics.", u: "gradifymath.com" },
      { n: "SciGradify", i: "atom", c: "6aa84f", d: "Science." },
      { n: "EcoGradify", i: "leaf", c: "6aa84f", d: "Ecology and the environment.", u: "ecogradify.com" },
      { n: "SocGradify", i: "people", c: "a44a99", d: "Social sciences." },
      { n: "LitGradify", i: "feather", c: "8c27ca", d: "Literature.", u: "litgradify.com" },
      { n: "LanguageGradify", i: "languages", c: "dd7d6b", d: "Languages.", u: "gradifylanguage.com" },
      { n: "ArtGradify", i: "palette", c: "f055dd", d: "Art and design.", u: "gradifyart.com" },
      { n: "MusicGradify", i: "music", c: "a4834a", d: "Music.", u: "gradifymusic.com" },
      { n: "SportGradify", i: "dumbbell", c: "0c26b8", d: "Sport and exercise.", u: "gradifysport.com" },
      { n: "CreateGradify", i: "bulb", c: "e52153", d: "Creative skills." },
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
  SciGradify: "science physics chemistry biology",
  EcoGradify: "environment climate ecology sustainability nature",
  SocGradify: "sociology politics economics history geography",
  LitGradify: "english reading books poetry writing literature",
  LanguageGradify: "spanish french german languages vocabulary speaking",
  ArtGradify: "drawing painting design illustration",
  MusicGradify: "instrument piano guitar singing theory",
  SportGradify: "fitness gym exercise workout training running",
  CreateGradify: "creative creativity making crafts video",
  "TechGradify · ForgeLab": "coding programming python ai machine learning data science software developer forge",
  Klerio: "contacts crm spreadsheet data cleaning",
};

// Sites that rotate through the big featured card at the top of the page, in order.
export const FEATURED = ["TechGradify · ForgeLab", "MedGradify", "LawGradify", "Klerio"];

// Sites listed in the "Start with your stage" panel.
export const START_HERE = ["UnderGradify", "PostGradify", "ProGradify"];
