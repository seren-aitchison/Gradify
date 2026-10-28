// Every site in the Gradify family.
// To add a site, add a line to the right group. A site with no `url` shows as "Coming soon".
//   n: name   c: brand colour (hex, no #)   d: one-line description
//   u: domain or full URL   label: optional text to show instead of the URL
export const GROUPS = [
  {
    id: "stage",
    title: "By stage of life",
    blurb: "Where you are in your education or career.",
    items: [
      { n: "UnderGradify", c: "3c78d8", d: "For undergraduates.", u: "undergradify.com" },
      { n: "PostGradify", c: "2e5e18", d: "For postgraduate study and research.", u: "postgradify.com" },
      { n: "ProGradify", c: "e69138", d: "For working professionals.", u: "progradify.com" },
      { n: "EduGradify", c: "ffc002", d: "For teachers and educators." },
      { n: "YouthGradify", c: "ffea05", d: "For teenagers.", u: "youthgradify.com" },
      { n: "JuniorGradify", c: "a0ff74", d: "For younger learners.", u: "juniorgradify.com" },
    ],
  },
  {
    id: "profession",
    title: "By profession",
    blurb: "Training and revision for a specific career.",
    items: [
      { n: "LawGradify", c: "9f2f17", d: "Law.", u: "gradifylaw.com" },
      { n: "BusinessGradify", c: "674ea6", d: "Business and management.", u: "gradifybusiness.com" },
      { n: "FinanceGradify", c: "783f04", d: "Finance and accounting.", u: "gradifyfinance.com" },
      { n: "InvestorGradify", c: "808250", d: "Investing and markets." },
      { n: "MedGradify", c: "4641ff", d: "Medicine.", u: "gradifymed.com" },
      { n: "DentalGradify", c: "40d4b1", d: "Dentistry.", u: "gradifydental.com" },
      { n: "VetGradify", c: "409a6e", d: "Veterinary science.", u: "gradifyvet.com" },
      { n: "NurseGradify", c: "6a60ff", d: "Nursing." },
      { n: "PharmaGradify", c: "f99246", d: "Pharmacy.", u: "gradifypharma.com" },
      { n: "HealthGradify", c: "0e98e5", d: "Health and wellbeing.", u: "gradifyhealth.com" },
      { n: "PsychGradify", c: "bbabbe", d: "Psychology." },
      { n: "EngineerGradify", c: "ff5600", d: "Engineering.", u: "gradifyeng.com" },
    ],
  },
  {
    id: "subject",
    title: "By subject",
    blurb: "Study a subject in its own space.",
    items: [
      { n: "MathGradify", c: "70a7dc", d: "Mathematics.", u: "gradifymath.com" },
      { n: "SciGradify", c: "6aa84f", d: "Science." },
      { n: "EcoGradify", c: "6aa84f", d: "Ecology and the environment.", u: "ecogradify.com" },
      { n: "SocGradify", c: "a44a99", d: "Social sciences." },
      { n: "LitGradify", c: "8c27ca", d: "Literature.", u: "litgradify.com" },
      { n: "LanguageGradify", c: "dd7d6b", d: "Languages.", u: "gradifylanguage.com" },
      { n: "ArtGradify", c: "f055dd", d: "Art and design.", u: "gradifyart.com" },
      { n: "MusicGradify", c: "a4834a", d: "Music.", u: "gradifymusic.com" },
      { n: "SportGradify", c: "0c26b8", d: "Sport and exercise.", u: "gradifysport.com" },
      { n: "CreateGradify", c: "e52153", d: "Creative skills." },
    ],
  },
  {
    id: "tech",
    title: "Technology",
    blurb: "Code, data and AI, plus tools for your work.",
    items: [
      {
        n: "TechGradify · ForgeLab", c: "666666",
        d: "Hands-on coding, data science and AI engineering, with instant feedback. Forge is the future of TechGradify.",
        u: "http://localhost:3000/learn", label: "localhost:3000/learn",
      },
      { n: "Klerio", c: "2a8c82", d: "Clean contact lists and see what changed every week.", u: "getklerio.com", tm: false },
    ],
  },
];
