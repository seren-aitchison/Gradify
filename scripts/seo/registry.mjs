// The search identity of every specialist site's home page (and a few other pages inside site folders): the title and
// description a search result shows, and the structured data that says what the page is. These pages are hand-built
// (their visible content is the site's own design), so scripts/build-seo.mjs rewrites only their <head> from here:
//   - <title>, meta description, and the Open Graph / Twitter copies of both
//   - one JSON-LD block (marked data-seo="registry"): CollectionPage for a site's home
// Course pages are NOT here: scripts/seo/coursepages.mjs gives them a crawlable overview, their own title and Course
// data, from the same catalogue and the same coverage rules.
//
// Rules (tests/seo-registry.test.mjs checks them):
//   - every live or beta site in kit/core/sites.js has an entry. A new site fails CI until its search identity is
//     written here: SEO is part of "done".
//   - titles ≤ 60 characters, descriptions ≤ 155, all unique, each naming what a student would search for
//   - a qualification (GCSE, A level, SQE, MLA, NMC, GPhC, MPharm) is named only when kit/curriculum/coverage.js says a
//     course on that page serves it. Constitution article 3: coverage is claimed only with evidence.
import { readFileSync } from "node:fs";
import { SITES, slugOf } from "../../kit/core/site.js";
import { COURSES as COVERAGE, QUALIFICATIONS } from "../../kit/curriculum/coverage.js";
import { ORIGIN, ORG, url } from "./shell.mjs";

const root = new URL("../../", import.meta.url);
const json = (p) => JSON.parse(readFileSync(new URL(p, root), "utf8"));

// A site's home page: [search title, description]. Written for the searches a student actually makes ("law revision",
// "learn music theory"), with the site's name last so the brand still shows.
export const SITE_HOME = {
  undergradify: ["University Revision & Study Skills App | UnderGradify", "Revise university modules with flashcards made from your own lecture notes, a free study-skills course and a revision plan paced to your exams."],
  postgradify: ["Dissertation & PhD Research Study Help | PostGradify", "Plan your dissertation, organise your reading and turn papers into flashcards, with a free course on research questions, design, methods and writing up."],
  progradify: ["Professional Skills & CPD Learning Online | ProGradify", "Short daily practice for workplace skills and CPD: communication, management and project skills in a free course, with flashcards and quizzes."],
  edugradify: ["Teacher CPD & Retrieval Practice Resources | EduGradify", "Free teacher CPD on how pupils learn, classroom practice, assessment and adaptive teaching, plus tools that turn your materials into retrieval quizzes."],
  youthgradify: ["Free GCSE Revision: Notes & Flashcards | YouthGradify", "Revise for your GCSEs with a free core course written for GCSEs in England, flashcards made from your own notes, quizzes and streaks with friends."],
  juniorgradify: ["Primary Learning Practice for Ages 5 to 12 | JuniorGradify", "Bite-sized primary practice for ages 5 to 12: number, fractions, phonics, reading, grammar, science, history and geography, with stars and streaks."],
  lawgradify: ["Law Revision & SQE Prep: Free Notes | LawGradify", "Revise cases, statutes and legal reasoning from the English legal system to SQE1 and SQE2, with single-best-answer questions and flashcards. Free."],
  businessgradify: ["Business & Management Revision Online | BusinessGradify", "Revise strategy, marketing, operations and organisational behaviour with a free business course, real case studies, flashcards and quizzes."],
  financegradify: ["Accounting & Finance Revision Online | FinanceGradify", "Revise double entry, financial statements, valuation and corporate finance with worked problems, flashcards and quizzes in a free accounting course."],
  investorgradify: ["Learn to Invest: Free Investing Course | InvestorGradify", "Learn how markets, asset classes, portfolios, valuation and risk work in a free investing course, with calculators. Education, not financial advice."],
  medgradify: ["Medical School Revision: Notes & Flashcards | MedGradify", "Medical school revision for clinical medicine, physiology and pharmacology: a free course, flashcards from your lectures and a 3D anatomy explorer."],
  dentalgradify: ["Dental School Revision: Notes & Flashcards | DentalGradify", "Revise oral anatomy, dental materials, caries and clinical dentistry with a free dental course, flashcards made from your lectures and quizzes."],
  vetgradify: ["Vet School Revision: Notes & Flashcards | VetGradify", "Revise comparative anatomy, veterinary physiology, pathology and pharmacology across species, with a free veterinary course, flashcards and quizzes."],
  nursegradify: ["Nursing Student Revision & Practice Questions | NurseGradify", "Revise anatomy, pharmacology, clinical skills and nursing fields with a free course mapped to the NMC proficiency standards, plus flashcards and quizzes."],
  pharmagradify: ["Pharmacy Revision for MPharm & GPhC Prep | PharmaGradify", "Revise pharmacology, pharmacokinetics, therapeutics and calculations for the MPharm and the GPhC registration assessment, with a free course and quizzes."],
  healthgradify: ["How Your Body Works: Free Health Course | HealthGradify", "Clear, trustworthy lessons on the human body, nutrition, sleep, activity and mental health, in small daily steps. Health education, not medical advice."],
  psychgradify: ["Psychology Revision Online: Notes & Quizzes | PsychGradify", "Revise cognitive, biological and social psychology, research methods and statistics with interactive experiments, flashcards and quizzes. Free."],
  internshipgradify: ["Internships & Careers Help for Students | InternshipGradify", "Find internships and work experience, and prepare with a free careers course on CVs, applications, interviews, networking and your first job."],
  engineergradify: ["Engineering Revision Online: Free Course | EngineerGradify", "Revise engineering maths, statics, dynamics, materials and systems with worked problems, flashcards and quizzes in a free engineering course."],
  mathgradify: ["GCSE, A Level & University Maths Revision | MathGradify", "Maths from GCSE and A level to university, with worked examples, generated practice and a line-by-line step checker that shows where a method went wrong."],
  scigradify: ["Biology, Chemistry & Physics Revision Online | SciGradify", "Free biology, chemistry and physics courses with interactive simulations, notes, flashcards, quizzes and exams, from first principles to advanced topics."],
  ecogradify: ["Ecology & Environmental Science Revision | EcoGradify", "Revise populations, communities, ecosystems, biodiversity and sustainability with a free ecology course, flashcards, quizzes and real-world case studies."],
  socgradify: ["Sociology Revision Online: Notes & Quizzes | SocGradify", "Revise sociological theory, inequality, culture, institutions and research methods with real-data explorers, flashcards and quizzes. Free."],
  historygradify: ["History Revision: Notes, Sources & Essays | HistoryGradify", "Revise British, European and world history from medieval Britain to the modern world, with sources, interpretations, flashcards and essay practice."],
  litgradify: ["English Literature Revision Online | LitGradify", "Revise poetry, drama, Shakespeare and the novel with close-reading practice, context, quotations and essay writing, in a free English literature course."],
  languagegradify: ["Learn Spanish & Japanese Online Free | LanguageGradify", "Learn Spanish and Japanese with short daily lessons in vocabulary, grammar and scripts, and spaced repetition that makes new words stick. Free."],
  artgradify: ["Learn Art & Design Online: Free Course | ArtGradify", "Learn drawing, colour theory, painting, composition and art history in a free art and design course, with practice and flashcards to build your skills."],
  musicgradify: ["Learn Music Theory Online: Free Course | MusicGradify", "Learn notation, scales, chords, harmony, ear training and music history in a free music theory course, with practice, flashcards and quizzes."],
  sportgradify: ["Sport & Exercise Science Revision | SportGradify", "Revise functional anatomy, exercise physiology, energy systems, training principles and coaching with a free sport science course and a 3D body view."],
  creategradify: ["Design Thinking Course & Creative Briefs | CreateGradify", "Learn design thinking, ideation, user research and prototyping in a free creativity course, then practise on real design briefs."],
};

// Other public pages inside a site's folder that need their own identity
export const EXTRA = {
  "sportgradify/body.html": { title: "3D Muscle Map: Training, Recovery & Strength | SportGradify", description: "Your body in 3D, coloured by your own training: recent stimulus, estimated strength progression, recovery and measured fitness for every muscle group.", type: "WebApplication" },
};

// Sites that are separate products with their own domain (status "external" in kit/core/sites.js): their copies on
// getgradify.com stay out of search results, so they never compete with the product's own site. Not in the sitemap
// either (scripts/build-sitemap.mjs).
export const EXTERNAL = {
  "techgradify/index.html": { title: "TechGradify · ForgeLab: Coding, Data Science and AI", description: "Hands-on coding, data science and AI engineering, with instant feedback. TechGradify · ForgeLab is a separate product with its own site." },
  "techgradify/course/index.html": { title: "TechGradify · ForgeLab: Computer Science Course", description: "Computer science, from computational thinking and Python to algorithms, on TechGradify · ForgeLab, a separate product with its own site." },
};

// written lessons only: a course is described by what a learner can open today
export function courseFacts(slug) {
  const api = json(`kit/api/v1/courses/${slug}.json`);
  const written = api.units.filter((u) => u.written);
  return { name: api.name, unitWord: (api.unitWord || "Unit").toLowerCase(), units: written.length, lessons: written.reduce((n, u) => n + (u.lessons || []).length, 0), titles: written.map((u) => u.title) };
}
const plural = (n, w) => `${n.toLocaleString("en-GB")} ${w}${n === 1 ? "" : "s"}`;

/** the qualifications coverage.js lets a course name (any claim stronger than Gradify's own curriculum) */
export const claimable = (slug) => (COVERAGE[slug]?.serves || []).filter((s) => s.q && s.status !== "gradify").map((s) => s.q);
// words in a title or description that claim a qualification, and the coverage.js qualification each needs
export const CLAIM_WORDS = [[/\bGCSEs?\b/, "gcse"], [/\bA[ -]?levels?\b/i, "a-level"], [/\bSQE\d?\b/, "sqe"], [/\bMLA\b|Medical Licensing Assessment/, "mla"], [/\bNMC\b/, "nmc"], [/\bGPhC\b|\bMPharm\b/, "gphc"]];

/** every page this registry owns: { path → { title, description, schema } } */
export function registry() {
  const cat = json("kit/api/v1/catalogue.json"), out = new Map();
  const live = SITES.filter((s) => s.built && ["live", "beta"].includes(s.status));
  for (const s of live) {
    const slug = slugOf(s), entry = SITE_HOME[slug]; if (!entry) continue;
    const [title, description] = entry, href = `${ORIGIN}/${slug}/`;
    const courses = cat.courses.filter((c) => c.page?.startsWith(`/${slug}/`) && ["live", "beta"].includes(c.status));
    out.set(`${slug}/index.html`, {
      title, description, site: s.n, courses: courses.map((c) => c.slug),
      schema: {
        "@type": "CollectionPage", "@id": `${href}#page`, url: href, name: title.replace(/ \| .*$/, ""), description, inLanguage: "en-GB",
        isPartOf: { "@type": "WebSite", "@id": `${ORIGIN}/#site`, name: "Gradify", url: `${ORIGIN}/` }, publisher: { "@id": ORG["@id"] },
        audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: s.who },
        ...(courses.length ? { hasPart: courses.map((c) => ({ "@type": "Course", name: courseFacts(c.slug).name, url: `${ORIGIN}${c.page}` })) } : {}),
      },
    });
  }
  for (const [p, e] of Object.entries(EXTERNAL)) out.set(p, { ...e, courses: [], noindex: true, schema: null });
  for (const [p, e] of Object.entries(EXTRA)) out.set(p, { ...e, courses: [], schema: { "@type": e.type, "@id": `${url(p)}#app`, url: url(p), name: e.title.replace(/ \| .*$/, ""), description: e.description, applicationCategory: "EducationalApplication", operatingSystem: "Web", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, publisher: { "@id": ORG["@id"] } } });
  return out;
}

/** qualification words in a page's title or description that its courses can't back: [] when honest */
export function unbackedClaims(entry) {
  const ok = new Set(entry.courses.flatMap(claimable)), text = `${entry.title} ${entry.description}`;
  return CLAIM_WORDS.filter(([re, q]) => re.test(text) && !ok.has(q)).map(([, q]) => q);
}

const attr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const META = (html, re, tag) => (re.test(html) ? html.replace(re, tag) : html);
/** a page's <head> rewritten from its registry entry; running it twice changes nothing */
export function applySeo(html, entry) {
  const t = attr(entry.title), d = attr(entry.description);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${t}</title>`);
  html = /<meta name="description" content="[^"]*">/.test(html) ? html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${d}">`) : html.replace(/(<title>[^<]*<\/title>)/, `$1\n  <meta name="description" content="${d}">`);
  html = META(html, /<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${t}">`);
  html = META(html, /<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${d}">`);
  html = META(html, /<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${t}">`);
  html = META(html, /<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${d}">`);
  // one head-tags comment is enough (scripts/build-seo.mjs used to add one per run that added a tag)
  let seen = false;
  html = html.replace(/\n[ \t]*<!-- head-tags: canonical and link previews, added by scripts\/build-seo\.mjs -->/g, (m) => (seen ? "" : ((seen = true), m)));
  if (entry.noindex) html = /<meta name="robots" content="[^"]*">/.test(html) ? html.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">') : html.replace(/(<title>[^<]*<\/title>)/, '$1\n  <meta name="robots" content="noindex, follow">');
  const block = `<script type="application/ld+json" data-seo="registry">${JSON.stringify({ "@context": "https://schema.org", ...entry.schema }).replace(/</g, "\\u003c")}</script>`;
  html = html.replace(/\n[ \t]*<!-- search identity: scripts\/seo\/registry\.mjs -->\n[ \t]*<script type="application\/ld\+json" data-seo="registry">[\s\S]*?<\/script>/, "");
  if (!entry.schema) return html;
  return html.replace(/\n?([ \t]*)<\/head>/, `\n  <!-- search identity: scripts/seo/registry.mjs -->\n  ${block}\n$1</head>`);
}
