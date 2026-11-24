// The search-intent map: each cluster of searches a student makes, and the ONE Gradify page that answers it.
// Two clusters never share a destination, and a destination is always a real, indexable page
// (tests/seo-registry.test.mjs). scripts/seo-audit.mjs writes it out as docs/seo/KEYWORD-MAP.md.
//
// IMPORTANT: there is no keyword data here. Gradify has no keyword-volume or Search Console export in the repository,
// so `demand` and `competition` are JUDGEMENTS (estimate), made from the shape of the market, not measured. Replace
// them with Search Console and Keyword Planner numbers as soon as those exist, and re-rank.
//   demand       estimated relative search demand: high / medium / low
//   competition  estimated difficulty of ranking: high (Save My Exams, Quizlet, BBC Bitesize own it) / medium / low
//   fit          how well Gradify's page serves the searcher today: strong / partial
//   stage        the priority stage in the growth plan: 2 (highest-value pages now) / 4 (curriculum expansion)
// "Win specific student problems first": low-competition, strong-fit clusters rank first.
export const CLUSTERS = [
  // tools: the problems Gradify solves better than most (source-checked cards from your own notes)
  { cluster: "pdf to flashcards", queries: ["pdf to flashcards", "turn pdf into flashcards", "make flashcards from lecture slides"], dest: "pdf-to-flashcards/", intent: "do", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "flashcards checked against my notes", queries: ["ai flashcards that are accurate", "flashcard maker from notes", "study pack from notes"], dest: "features/notes-studio/", intent: "do", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "notes to mind map", queries: ["lecture notes to mind map", "mind map from notes", "mind map generator from text"], dest: "lecture-notes-to-mind-map/", intent: "do", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "mind map from a lesson", queries: ["revision mind map maker", "spider diagram maker for revision"], dest: "features/spidermaps/", intent: "do", demand: "low", competition: "low", fit: "strong", stage: 2 },
  { cluster: "cheat sheet maker", queries: ["notes to cheat sheet", "one page revision sheet maker"], dest: "notes-to-cheat-sheet/", intent: "do", demand: "low", competition: "low", fit: "strong", stage: 2 },
  { cluster: "youtube to flashcards", queries: ["youtube video to flashcards", "youtube lecture to notes"], dest: "youtube-to-flashcards/", intent: "do", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "revision song or chant", queries: ["turn notes into a song", "revision chant", "song to memorise notes"], dest: "notes-to-study-chant/", intent: "do", demand: "low", competition: "low", fit: "strong", stage: 2 },
  { cluster: "handwriting to text", queries: ["handwriting to text free", "convert handwritten notes to text"], dest: "features/handwriting-to-text/", intent: "do", demand: "high", competition: "high", fit: "partial", stage: 2 },
  { cluster: "linked notes with flashcards", queries: ["remnote alternative", "notes app with flashcards"], dest: "features/notebook/", intent: "do", demand: "low", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "flashcard feed", queries: ["scroll flashcards like tiktok", "flashcard feed app"], dest: "features/flashcard-feed/", intent: "do", demand: "low", competition: "low", fit: "strong", stage: 2 },
  { cluster: "audio revision", queries: ["revise by listening", "audio flashcards hands free"], dest: "features/audio-questions/", intent: "do", demand: "low", competition: "low", fit: "strong", stage: 2 },
  { cluster: "revision planner", queries: ["revision planner app", "time blocking for students", "auto revision timetable"], dest: "features/time-blocking/", intent: "do", demand: "medium", competition: "high", fit: "partial", stage: 2 },
  { cluster: "printable revision timetable", queries: ["revision timetable template", "printable revision timetable"], dest: "templates/revision-timetable/", intent: "get", demand: "high", competition: "high", fit: "partial", stage: 2 },
  { cluster: "degree classification", queries: ["degree classification calculator", "what degree will i get calculator"], dest: "tools/degree-classification-calculator/", intent: "do", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "final grade needed", queries: ["final grade calculator", "what do i need on my exam"], dest: "tools/final-grade-calculator/", intent: "do", demand: "high", competition: "high", fit: "strong", stage: 2 },
  { cluster: "spaced repetition schedule", queries: ["spaced repetition schedule", "spaced repetition calendar"], dest: "tools/spaced-repetition-schedule/", intent: "do", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  // how to revise: problem searches that lead into the tools
  { cluster: "active recall", queries: ["what is active recall", "how to use active recall"], dest: "guides/active-recall/", intent: "learn", demand: "high", competition: "high", fit: "strong", stage: 2 },
  { cluster: "good flashcards", queries: ["how to make good flashcards", "flashcard tips"], dest: "guides/how-to-make-good-flashcards/", intent: "learn", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "revise in two weeks", queries: ["how to revise in 2 weeks", "last minute revision plan"], dest: "guides/how-to-revise-in-two-weeks/", intent: "learn", demand: "medium", competition: "high", fit: "strong", stage: 2 },
  { cluster: "quizlet alternatives", queries: ["quizlet alternative free", "apps like quizlet"], dest: "compare/quizlet-alternatives/", intent: "compare", demand: "high", competition: "high", fit: "strong", stage: 2 },
  { cluster: "gradify vs anki", queries: ["anki vs", "anki alternative easier"], dest: "compare/gradify-vs-anki/", intent: "compare", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  // subjects: courses and site homes (qualification words only where coverage.js backs them)
  { cluster: "biology revision", queries: ["biology revision online", "free biology lessons", "biology flashcards"], dest: "scigradify/biology/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "chemistry revision", queries: ["chemistry revision online", "free chemistry lessons"], dest: "scigradify/chemistry/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "physics revision", queries: ["physics revision online", "free physics lessons"], dest: "scigradify/physics/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "science revision", queries: ["science revision website", "biology chemistry physics revision"], dest: "scigradify/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "maths revision", queries: ["gcse maths revision", "a level maths revision", "university maths help"], dest: "mathgradify/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "sqe and law revision", queries: ["sqe1 revision", "law revision notes", "law flashcards"], dest: "lawgradify/", intent: "learn", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "medical school revision", queries: ["medical school revision", "medicine flashcards", "med school notes"], dest: "medgradify/", intent: "learn", demand: "medium", competition: "medium", fit: "partial", stage: 2 },
  { cluster: "nursing revision", queries: ["nursing student revision", "nmc proficiencies revision"], dest: "nursegradify/", intent: "learn", demand: "medium", competition: "low", fit: "strong", stage: 2 },
  { cluster: "pharmacy revision", queries: ["gphc registration assessment revision", "mpharm revision"], dest: "pharmagradify/", intent: "learn", demand: "low", competition: "low", fit: "strong", stage: 2 },
  { cluster: "psychology revision", queries: ["psychology revision online", "research methods psychology"], dest: "psychgradify/", intent: "learn", demand: "medium", competition: "high", fit: "partial", stage: 4 },
  { cluster: "sociology revision", queries: ["sociology revision online", "sociological theory notes"], dest: "socgradify/", intent: "learn", demand: "medium", competition: "medium", fit: "partial", stage: 4 },
  { cluster: "history revision", queries: ["history revision online", "history essay practice"], dest: "historygradify/", intent: "learn", demand: "medium", competition: "high", fit: "partial", stage: 4 },
  { cluster: "english literature revision", queries: ["english literature revision", "poetry analysis revision"], dest: "litgradify/", intent: "learn", demand: "medium", competition: "high", fit: "partial", stage: 4 },
  { cluster: "gcse revision", queries: ["free gcse revision", "gcse revision website"], dest: "youthgradify/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "learn spanish", queries: ["learn spanish online free"], dest: "languagegradify/course/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "learn japanese", queries: ["learn japanese hiragana", "learn japanese online free"], dest: "languagegradify/japanese/", intent: "learn", demand: "high", competition: "high", fit: "partial", stage: 4 },
  { cluster: "music theory", queries: ["learn music theory online", "music theory free course"], dest: "musicgradify/", intent: "learn", demand: "medium", competition: "medium", fit: "partial", stage: 4 },
  { cluster: "dissertation help", queries: ["how to plan a dissertation", "phd literature review organisation"], dest: "postgradify/", intent: "learn", demand: "medium", competition: "medium", fit: "partial", stage: 4 },
  { cluster: "university study skills", queries: ["university revision tips", "study skills for university"], dest: "undergradify/", intent: "learn", demand: "medium", competition: "medium", fit: "strong", stage: 2 },
  { cluster: "internships and work experience", queries: ["work experience for students uk", "virtual work experience"], dest: "internshipgradify/", intent: "find", demand: "medium", competition: "high", fit: "partial", stage: 4 },
];

const RANK = { high: 3, medium: 2, low: 1, strong: 2, partial: 1 };
/** a rough opportunity score (estimates in, estimate out): demand × fit ÷ competition */
export const score = (c) => Math.round((RANK[c.demand] * RANK[c.fit] * 10) / RANK[c.competition]) / 10;

export function keywordMap(date) {
  const rows = [...CLUSTERS].sort((a, b) => a.stage - b.stage || score(b) - score(a));
  return `# Search-intent map

Generated by \`node scripts/seo-audit.mjs\` on ${date} from \`scripts/seo/keywords.mjs\`. Each cluster of searches has ONE Gradify destination, so Gradify's own pages never compete for the same query.

**There is no measured keyword data in this table.** Demand, competition and the score are judgements (estimates), made without Keyword Planner or Search Console data, which aren't in the repository. Replace them with real numbers from Search Console (Performance, by page and query) and re-rank before relying on the order.

Score = demand × fit ÷ competition (high 3, medium 2, low 1; strong fit 2, partial 1). Stage 2 = optimise now; stage 4 = curriculum expansion.

| Stage | Score (est.) | Cluster | Example searches | Destination | Intent | Demand (est.) | Competition (est.) | Fit |
|---|---|---|---|---|---|---|---|---|
${rows.map((c) => `| ${c.stage} | ${score(c)} | ${c.cluster} | ${c.queries.join("; ")} | [/${c.dest}](https://getgradify.com/${c.dest}) | ${c.intent} | ${c.demand} | ${c.competition} | ${c.fit} |`).join("\n")}

## Gaps: searches with no good destination yet

- **3D anatomy** ("3d anatomy free", "interactive human anatomy"): the 3D explorer (\`3d.html\`) is an app screen, not an indexable page. A public landing for it is the highest-demand gap found.
- **Exam-board pages** ("AQA biology revision"): not built on purpose. A board-specific page needs a course verified against that board's specification first (\`kit/curriculum/coverage.js\`, constitution article 3).
- **GCSE and A level biology, chemistry and physics**: the science courses are Gradify's own curriculum, not mapped to a specification, so their titles say "Biology Revision", not "GCSE Biology". Mapping them would unlock the highest-demand subject searches.
`;
}
