// Free study calculators (getgradify.com/tools/…) and the single-purpose "notes → study material" landing pages.
// Each tool works in the browser with no account (assets/study-tools.js), and each page answers its question in the
// first two sentences, so search snippets and AI assistants can quote it.
import { faq, related, optIn, esc } from "./shell.mjs";
import { TOOLS2, CATS } from "./tools2.mjs";
import { toolExtraHtml, seriesNav, stagesBlock } from "./links.mjs";

const APP = (name) => ({ "@type": "WebApplication", name, applicationCategory: "EducationalApplication", operatingSystem: "Web", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" }, publisher: { "@id": "https://getgradify.com/#org" } });
const MORE_TOOLS = (except) => related("More free study tools", TOOLS.filter((t) => t.slug !== except).map((t) => [`tools/${t.slug}/`, t.name, t.line]).concat([["tools/", "All free study tools", `${TOOLS.length + TOOLS2.length} calculators, planners and timers`]]));
// for the hub (filter chips, "Best when…") and the action bar's "Try an example"
const META = {
  "degree-classification-calculator": ["grades", "Best in second and final year", { f: { w3: "60" }, r: [{ mark: "62", credits: "60", year: "2" }, { mark: "58", credits: "60", year: "2" }, { mark: "68", credits: "80", year: "3" }, { mark: "71", credits: "40", year: "3" }] }],
  "final-grade-calculator": ["grades", "Best the week before a final", { f: { current: "65", weight: "40", target: "70" } }],
  "weighted-grade-calculator": ["grades", "Best mid-module, with some marks back", { r: [{ score: "72", weight: "30" }, { score: "58", weight: "20" }] }],
  "gpa-calculator": ["grades", "Best for US-style 4.0 grades", { r: [{ grade: "A", credits: "3" }, { grade: "B+", credits: "4" }, { grade: "A-", credits: "3" }] }],
  "exam-countdown": ["plan", "Best for any single exam", { f: { label: "Organic chemistry final", exam: "+42d", hours: "3", rest: "1" } }],
  "spaced-repetition-schedule": ["plan", "Best right after you learn a topic", { f: { topic: "Krebs cycle", start: "+0d", exam: "+40d" } }],
};

export const TOOLS = [
  {
    slug: "degree-classification-calculator", name: "UK degree classification calculator", line: "Work out a 1st, 2:1, 2:2 or 3rd from your module marks.",
    title: "UK Degree Classification Calculator (1st, 2:1, 2:2) · Free · Gradify",
    description: "Free UK degree calculator: enter your module marks and credits for year 2 and your final year, choose the weighting, and see your classification, with borderline cases flagged.",
    body: () => `<h1>UK degree classification calculator</h1>
    <p class="answer">Enter your module marks and credits, choose how your university weights year 2 against your final year, and the calculator shows your degree average and classification. In most UK universities 70%+ is a First, 60–69% a 2:1, 50–59% a 2:2 and 40–49% a Third.</p>
    <div class="tool" data-tool="degree">
      <div class="grid"><div><label for="w3">Final-year weighting</label><select id="w3" name="w3"><option value="50">50 / 50</option><option value="60" selected>40 / 60 (year 2 / final)</option><option value="67">33 / 67</option><option value="70">30 / 70</option><option value="75">25 / 75</option><option value="80">20 / 80</option><option value="100">Final year only</option></select></div></div>
      <div class="rows"></div>
      <div class="actions"><button type="button" class="ghost" data-add>Add a module</button></div>
      <div class="result" role="status" aria-live="polite">Add your marks above.</div>
      <noscript><p>This calculator needs JavaScript. The method is below if you'd rather work it out by hand.</p></noscript>
    </div>
    <h2>How UK degree classifications are calculated</h2>
    <p>Most universities take a <b>credit-weighted average</b> of each year that counts. A 40-credit dissertation counts twice as much as a 20-credit module. The year averages are then combined with a weighting: common schemes are 40/60, 33/67, 30/70 and 25/75 between year 2 and the final year, and some universities count the final year only. First year almost never counts.</p>
    <div class="scroll"><table><thead><tr><th>Average</th><th>Classification</th></tr></thead><tbody><tr><td>70% and above</td><td>First-class honours (1st)</td></tr><tr><td>60–69%</td><td>Upper second-class (2:1)</td></tr><tr><td>50–59%</td><td>Lower second-class (2:2)</td></tr><tr><td>40–49%</td><td>Third-class honours (3rd)</td></tr></tbody></table></div>
    <h2>What is a borderline mark?</h2>
    <p>If your average lands just under a boundary (often within 1 or 2 marks, such as 68.5%), many universities look again. A common rule is <b>preponderance</b>: if more than half of your final-year credits are in the higher class, you're moved up. Others use your final-year average alone, or an exam board's discretion. The calculator flags anything within 2 marks; your own university's regulations decide.</p>
    <h2>Worked example</h2>
    <p>Year 2 average 62%, final-year average 68%, weighted 40/60: (62 × 0.4) + (68 × 0.6) = 24.8 + 40.8 = <b>65.6%, a 2:1</b>.</p>`,
    faq: [
      ["Does first year count towards my degree?", "At most UK universities, no: first year has to be passed but its marks don't count towards your classification. Some four-year courses and a few universities are exceptions, so check your programme handbook."],
      ["What percentage is a 2:1?", "A 2:1 (upper second-class honours) is an overall average of 60% to 69%. A First starts at 70%."],
      ["Is a 69.5% a First?", "Often yes, after rounding: many universities round to the nearest whole mark, so 69.5% becomes 70%. Others don't round, but review it as a borderline case. Check your regulations."],
    ],
  },
  {
    slug: "final-grade-calculator", name: "Final exam grade calculator", line: "The mark you need on the final to hit your target.",
    title: "Final Exam Grade Calculator: What Do I Need on My Final? · Gradify",
    description: "Free final grade calculator: enter your current grade, how much the final is worth and your target, and see exactly what you need to score on the final exam.",
    body: () => `<h1>What do I need on my final exam?</h1>
    <p class="answer">Enter your current grade, the final's weight and the grade you want. The mark you need is (target − current × (1 − weight)) ÷ weight.</p>
    <div class="tool" data-tool="needed">
      <div class="grid"><div><label for="current">Current grade %</label><input id="current" name="current" type="number" min="0" max="100" step="0.1" value="65" inputmode="decimal"></div><div><label for="weight">Final exam weight %</label><input id="weight" name="weight" type="number" min="1" max="100" step="1" value="40" inputmode="numeric"></div><div><label for="target">Target overall %</label><input id="target" name="target" type="number" min="0" max="100" step="0.1" value="70" inputmode="decimal"></div></div>
      <div class="result" role="status" aria-live="polite"></div>
    </div>
    <h2>Worked example</h2>
    <p>You have 65% going into a final worth 40%, and you want 70% overall. (70 − 65 × 0.6) ÷ 0.4 = (70 − 39) ÷ 0.4 = <b>77.5%</b>.</p>
    <h2>Got a high number? Plan the revision, not the panic</h2>
    <p>The fastest way to raise an exam mark is to test yourself rather than re-read. Turn your lecture notes into flashcards, revise them with <a href="/glossary/spaced-repetition/">spaced repetition</a>, and do past papers under timed conditions in the final week. <a href="/guides/active-recall/">Our active recall guide</a> shows how.</p>`,
    faq: [["How do I calculate what I need on my final?", "Subtract your current grade multiplied by the share of the course already done from your target, then divide by the final's weight. With 65% so far, a 40% final and a 70% target: (70 − 65 × 0.6) ÷ 0.4 = 77.5%."], ["What if I need more than 100%?", "Then the target can't be reached through the final alone. Ask whether any coursework can still be resubmitted or improved, and aim for the highest grade that is reachable."]],
  },
  {
    slug: "weighted-grade-calculator", name: "Weighted grade calculator", line: "Your module average from assessments of different weights.",
    title: "Weighted Grade Calculator for Modules and Courses · Free · Gradify",
    description: "Free weighted grade calculator: add each assessment's score and weight to see your current module average, the marks banked so far, and how much is left to play for.",
    body: () => `<h1>Weighted grade calculator</h1>
    <p class="answer">Add each assessment's score and its weight. Your weighted average is the sum of score × weight, divided by the total weight you've entered.</p>
    <div class="tool" data-tool="weighted"><div class="rows"></div><div class="actions"><button type="button" class="ghost" data-add>Add an assessment</button></div><div class="result" role="status" aria-live="polite"></div></div>
    <h2>Example</h2>
    <p>An essay worth 30% scored 72%, a lab report worth 20% scored 58%: (72 × 30 + 58 × 20) ÷ 50 = <b>66.4%</b> across the half of the module done, with 33.2 of the 100 marks banked.</p>`,
    faq: [["How do weighted grades work?", "Each assessment counts in proportion to its weight. A 50% exam affects your grade five times as much as a 10% quiz, so multiply each score by its weight, add them up and divide by the total weight."]],
  },
  {
    slug: "gpa-calculator", name: "GPA calculator (4.0 scale)", line: "Your grade point average from letter grades and credits.",
    title: "GPA Calculator (4.0 Scale) for College and University · Gradify",
    description: "Free GPA calculator on the US 4.0 scale: add each course's letter grade and credit hours to get your semester or cumulative GPA.",
    body: () => `<h1>GPA calculator</h1>
    <p class="answer">Choose each course's letter grade and credit hours. Your GPA is the total of grade points × credits, divided by total credits, on the standard 4.0 scale.</p>
    <div class="tool" data-tool="gpa"><div class="rows"></div><div class="actions"><button type="button" class="ghost" data-add>Add a course</button></div><div class="result" role="status" aria-live="polite"></div></div>
    <h2>The 4.0 scale</h2>
    <div class="scroll"><table><thead><tr><th>Grade</th><th>Points</th><th>Grade</th><th>Points</th></tr></thead><tbody><tr><td>A / A+</td><td>4.0</td><td>C+</td><td>2.3</td></tr><tr><td>A−</td><td>3.7</td><td>C</td><td>2.0</td></tr><tr><td>B+</td><td>3.3</td><td>C−</td><td>1.7</td></tr><tr><td>B</td><td>3.0</td><td>D+ / D / D−</td><td>1.3 / 1.0 / 0.7</td></tr><tr><td>B−</td><td>2.7</td><td>F</td><td>0</td></tr></tbody></table></div>
    <p>Some colleges give an A+ 4.3; check your registrar's scale.</p>`,
    faq: [["How is GPA calculated?", "Multiply each course's grade points by its credit hours, add those up, and divide by your total credit hours. A (4.0) in a 3-credit course and B (3.0) in a 4-credit course gives (12 + 12) ÷ 7 = 3.43."]],
  },
  {
    slug: "exam-countdown", name: "Exam countdown and revision hours", line: "Days to go, real study hours left, and a story card to share.",
    title: "Exam Countdown & Revision Hours Calculator · Free · Gradify",
    description: "How many days until your exam, and how many real revision hours do you have? Free exam countdown with study-hours planning, an embeddable widget and a shareable story card.",
    body: () => `<h1>Exam countdown and revision hours calculator</h1>
    <p class="answer">Enter your exam date and how long you can study each day. You'll see the days left, your study days after rest days, and the total revision hours you actually have.</p>
    <div class="tool" data-tool="countdown">
      <div class="grid"><div><label for="label">Exam</label><input id="label" name="label" type="text" maxlength="40" placeholder="e.g. Organic chemistry final"></div><div><label for="exam">Exam date</label><input id="exam" name="exam" type="date"></div><div><label for="hours">Hours a day</label><input id="hours" name="hours" type="number" min="0.5" max="14" step="0.5" value="3" inputmode="decimal"></div><div><label for="rest">Rest days a week</label><select id="rest" name="rest"><option>0</option><option selected>1</option><option>2</option></select></div></div>
      <div class="result" role="status" aria-live="polite"></div>
      <div class="actions"><button type="button" class="ghost" data-card>Download a story card</button></div>
      <h2 class="h3">Put this countdown on your own site, blog or Notion</h2>
      <label for="embed">Embed code</label><textarea id="embed" rows="4" readonly data-embed></textarea>
      <div class="actions"><button type="button" class="ghost" data-copy-embed>Copy embed code</button></div>
    </div>
    <h2>How to use your revision hours</h2>
    <p>Divide your hours by the number of topics, then add 20% for past papers. Spread each topic over several short sessions rather than one long one: reviewing after 1, 3 and 7 days beats a single cram (see <a href="/glossary/spacing-effect/">the spacing effect</a>). The <a href="/tools/spaced-repetition-schedule/">spaced repetition schedule generator</a> gives you the dates.</p>`,
    faq: [["How many hours a day should I revise?", "Most students sustain 3 to 6 focused hours a day. Beyond that, quality drops. Short blocks of 25 to 50 minutes with breaks work better than marathon sessions."], ["How long before an exam should I start revising?", "For a university exam, start four to six weeks before, so every topic can be reviewed at least three times with gaps in between."]],
  },
  {
    slug: "spaced-repetition-schedule", name: "Spaced repetition schedule generator", line: "Review dates for any topic, as a calendar file.",
    title: "Spaced Repetition Schedule Generator (with Calendar File) · Gradify",
    description: "Free spaced repetition schedule: enter when you learn a topic and your exam date, get review dates at 1, 3, 7, 14 and 30 days, and download them to your calendar.",
    body: () => `<h1>Spaced repetition schedule generator</h1>
    <p class="answer">Pick the day you first learn a topic and your exam date. You get review dates at expanding gaps (1, 3, 7, 14, 30 and 60 days) plus the day before the exam, as a list or a calendar file.</p>
    <div class="tool" data-tool="spaced">
      <div class="grid"><div><label for="topic">Topic</label><input id="topic" name="topic" type="text" maxlength="60" placeholder="e.g. Krebs cycle"></div><div><label for="start">First learned</label><input id="start" name="start" type="date"></div><div><label for="exam">Exam date (optional)</label><input id="exam" name="exam" type="date"></div></div>
      <div class="result" role="status" aria-live="polite"></div>
      <div class="actions"><button type="button" class="ghost" data-ics>Add to my calendar (.ics)</button></div>
    </div>
    <h2>Why these intervals?</h2>
    <p>Memory fades fast at first and then more slowly (the <a href="/glossary/forgetting-curve/">forgetting curve</a>). Each successful review makes the next forgetting slower, so the gaps can grow. A fixed schedule is a good start. Gradify's own reviews go further: they use <a href="/glossary/fsrs/">FSRS</a>, which sets each card's next date from how well you actually remembered it.</p>`,
    faq: [["What are the best spaced repetition intervals?", "A simple, well-supported schedule is 1, 3, 7, 14 and 30 days after first learning. Adaptive schedulers such as FSRS do better by setting each item's interval from your own recall."]],
  },
];

for (const t of TOOLS) [t.cat, t.best, t.example] = META[t.slug];

export function toolPages() {
  const pages = TOOLS.map((t) => {
    const f = faq(t.faq);
    const ex = ` data-example='${JSON.stringify(t.example).replace(/'/g, "&#39;")}'`;
    const body = t.body().replace(/(<div class="tool" data-tool="[a-z]+")/, `<p class="tool-tools no-print"><button type="button" class="mini" data-pin>☆ Pin this tool</button> <button type="button" class="mini" data-focus>Focus mode</button> <span class="best">${esc(t.best)}</span></p>\n    $1${ex}`)
      .replace(/(<h2>Worked example<\/h2>\s*<p>[\s\S]*?<\/p>)/, '$1<p class="no-print"><button type="button" class="mini" data-load-example>Load an example into the calculator</button></p>');
    return { path: `tools/${t.slug}/index.html`, title: t.title, description: t.description, crumbs: [["Free study tools", "tools/"], [t.name, `tools/${t.slug}/`]], schema: [APP(t.name), f.schema], updated: "2026-11-23",
      body: `${body}${toolExtraHtml(t.slug)}${seriesNav(`tools/${t.slug}/`)}${f.html}${optIn()}${MORE_TOOLS(t.slug)}<p class="hub-back"><a href="/tools/">← All free study tools</a></p>` };
  });
  const ALL = [...TOOLS, ...TOOLS2];
  pages.push({ path: "tools/index.html", title: "Free Study Tools, Planners and Grade Calculators · Gradify", description: `${ALL.length} free tools for students: grade and degree calculators, cram and deadline planners, a study timer, citation helper and more. No account.`, crumbs: [["Free study tools", "tools/"]], ogType: "website",
    schema: [{ "@type": "CollectionPage", name: "Free study tools", hasPart: ALL.map((t) => ({ "@type": "WebApplication", name: t.name, url: `https://getgradify.com/tools/${t.slug}/` })) }],
    body: `<h1>Free study tools</h1><p class="answer">${ALL.length} free tools for the questions students ask the night before a deadline: what mark do I need, what do I revise first, how do I fit it all in. No account, and nothing you type leaves your browser.</p>
    <div data-resume></div>
    <div data-tool-hub>
    <div class="chips no-print" role="group" aria-label="Filter tools"><button type="button" class="chip on" data-cat="">All</button>${Object.entries(CATS).map(([k, v]) => `<button type="button" class="chip" data-cat="${k}">${v}</button>`).join("")}</div>
    ${Object.entries(CATS).map(([k, v]) => `<section data-cat-sec="${k}"><h2>${v}</h2><ul class="cards">${ALL.filter((t) => t.cat === k).map((t) => `<li data-cat="${k}"><a href="/tools/${t.slug}/">${esc(t.name)}</a><span>${esc(t.line)}</span><small class="best">${esc(t.best)}</small></li>`).join("")}</ul></section>`).join("")}
    </div>
    ${stagesBlock()}
    <h2>Turn notes into study material</h2><ul class="cards">${LANDINGS.map((l) => `<li><a href="/${l.slug}/">${l.name}</a><span>${l.line}</span></li>`).join("")}</ul>
    <h2>Printable templates</h2><p>Revision timetables, Cornell notes and trackers to print or save as PDF: <a href="/templates/">see the templates</a>.</p>` });
  // the countdown widget other sites embed (not for search: the tool page is)
  pages.push({ raw: true, path: "tools/exam-countdown/embed.html", html: EMBED });
  return pages;
}

const EMBED = `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Exam countdown · Gradify</title><meta name="description" content="An exam countdown widget from Gradify's free study tools.">
<link rel="canonical" href="https://getgradify.com/tools/exam-countdown/">
<style>html,body{margin:0;height:100%;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#0b0b0b;color:#fff}a{color:#fff}.w{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:radial-gradient(circle at 50% 30%,rgba(240,85,221,.35),transparent 60%)}b{font-size:56px;letter-spacing:-.03em;line-height:1}span{opacity:.85;margin-top:4px}small{margin-top:10px;opacity:.6;font-size:11px}</style></head>
<body><div class="w"><b id="d">–</b><span id="l">days to go</span><small>by <a href="https://getgradify.com/tools/exam-countdown/?utm_source=embed" target="_blank" rel="noopener">Gradify</a></small></div>
<script>(function(){var q=new URLSearchParams(location.search),d=new Date((q.get("date")||"")+"T00:00"),t=new Date();t.setHours(0,0,0,0);var n=Math.round((d-t)/864e5);document.getElementById("d").textContent=isNaN(n)?"–":Math.max(0,n);document.getElementById("l").textContent=(n===1?"day":"days")+" to "+(q.get("label")||"the exam").slice(0,40);})();</script></body></html>
`;

// ---------- "notes → study material" landing pages ----------
export const LANDINGS = [
  {
    slug: "pdf-to-flashcards", name: "PDF to flashcards", line: "Upload a lecture PDF, get checked flashcards.",
    title: "PDF to Flashcards: Free, Checked Against Your Notes, No Signup · Gradify",
    description: "Turn a lecture PDF into flashcards free in about a minute. Every card is matched to the line in your notes it came from, so nothing is made up. No account needed.",
    h1: "Turn a PDF into flashcards, checked against your notes", cta: ["/app.html#/new", "Upload a PDF"],
    answer: "Upload a PDF of your lecture notes or slides and Gradify turns it into flashcards in about a minute, free and without an account. Every card links to the exact line in your notes it came from, and any card that doesn't fully match is marked <em>to check</em>.",
    steps: [["Upload your PDF", "Drop in a PDF with selectable text (most lecture slides and typed notes), a .txt or .md file, or paste your notes."], ["Get flashcards and a mind map", "Gradify picks out definitions, processes, causes and key facts, and writes question-and-answer cards, plus a mind map of the topic."], ["Check every card", "Each card shows the line it came from. Edit, regenerate or delete any card marked to check."], ["Revise at the right time", "Rate each card as you go and spaced repetition brings it back just before you'd forget, paced to your exam date."]],
    why: "Generic AI tools can invent facts that aren't in your course. Gradify's cards come only from what you uploaded, and you can see the evidence for each one, so you revise what your lecturer actually taught.",
    faq: [["Can I turn a PDF into flashcards for free?", "Yes. Gradify makes flashcards from a PDF free, with no card and no account needed for your first pack."], ["Does it work with scanned PDFs or handwriting?", "PDFs need selectable text. For handwriting or photos, use Handwriting to text in Gradify's tools first."], ["Can I export to Anki?", "Your cards and packs can be downloaded from your account. See the <a href=\"/compare/gradify-vs-anki/\">Gradify vs Anki</a> page for how the two fit together."]],
  },
  {
    slug: "lecture-notes-to-mind-map", name: "Lecture notes to mind map", line: "Paste your notes, get a mind map you can edit.",
    title: "Lecture Notes to Mind Map: Free Mind Map Maker from Notes · Gradify",
    description: "Paste lecture notes or upload a PDF and get a mind map of the topic, free: main ideas, processes, concepts and examples, editable and exportable as PNG or SVG.",
    h1: "Turn lecture notes into a mind map", cta: ["/app.html#/tools/convert", "Make a mind map"],
    answer: "Paste your lecture notes or upload a PDF and Gradify draws a mind map of the topic: the big ideas in the middle, with processes, concepts and examples branching out. It's free, and you can drag, rename and add ideas, then export it as a PNG or SVG.",
    steps: [["Bring your notes", "Paste notes in any format, or upload a PDF."], ["Get the map", "Gradify groups your facts into the handful of topics a teacher would recognise, each on its own branch."], ["Make it yours", "Drag ideas, rename them (double-click), add a branch (Tab) or a sibling (Enter)."], ["Export or revise", "Download a 4K PNG or SVG, or turn the same notes into flashcards."]],
    why: "A mind map shows how ideas connect, which is what exam questions on processes and causes test. Drawing it from your own notes keeps it to your syllabus. See <a href=\"/glossary/dual-coding/\">dual coding</a> for why words plus a picture help.",
    faq: [["Is the mind map maker free?", "Yes, making mind maps from your notes is free on Gradify."], ["Can I edit the mind map?", "Yes: move, rename, add and delete ideas, then export as PNG, SVG or Markdown."]],
  },
  {
    slug: "notes-to-cheat-sheet", name: "Notes to cheat sheet", line: "Condense your notes into a one-page revision sheet.",
    title: "Notes to Cheat Sheet: Free One-Page Revision Sheet Maker · Gradify",
    description: "Paste your notes and get a condensed one-page revision sheet, or a key-terms sheet with the definitions blank to test yourself. Free, printable, no account needed.",
    h1: "Turn your notes into a one-page revision sheet", cta: ["/app.html#/tools/convert", "Make a revision sheet"],
    answer: "Paste your notes and Gradify condenses them into a one-page cheat sheet of the key facts, grouped by topic. You can also print a key-terms sheet with the definitions left blank, so you can test yourself instead of re-reading.",
    steps: [["Paste your notes", "Any format: lecture notes, textbook summaries, your own shorthand."], ["Get the sheet", "The key facts are grouped under topic headings, on one page."], ["Print a test version", "A key-terms sheet with blank definitions turns the sheet into a quiz."], ["Revise from it", "Make flashcards from the same notes and let spaced repetition pace them."]],
    why: "Condensing notes forces you to decide what matters, and a blank-definitions sheet turns reading into <a href=\"/glossary/active-recall/\">active recall</a>. Use it for checking your own understanding. Follow your exam's rules on what you may bring in.",
    faq: [["How do I make a good revision sheet?", "Keep to one page per topic, group facts under headings, write definitions in your own words, and test yourself by covering the answers."]],
  },
];

export function landingPages() {
  return LANDINGS.map((l) => {
    const f = faq(l.faq);
    return {
      path: `${l.slug}/index.html`, title: l.title, description: l.description, crumbs: [["Free study tools", "tools/"], [l.name, `${l.slug}/`]], updated: "2026-11-23",
      schema: [{ ...APP(`Gradify ${l.name}`), url: `https://getgradify.com/${l.slug}/` }, { "@type": "HowTo", name: l.h1, step: l.steps.map(([n, t], i) => ({ "@type": "HowToStep", position: i + 1, name: n, text: t })) }, f.schema],
      body: `<h1>${l.h1}</h1><p class="answer">${l.answer}</p>
    <p><a class="btn btn-primary lg" href="${l.cta[0]}"><span>${l.cta[1]}</span> <span aria-hidden="true">→</span></a> <small>Free · no account needed to try it</small></p>
    <h2>How it works</h2><ol>${l.steps.map(([n, t]) => `<li><b>${n}.</b> ${t}</li>`).join("")}</ol>
    <h2>Before and after</h2><div class="before-after"><div><b>Before</b><ul><li>60 pages of lecture PDFs</li><li>AI summaries you can't check</li><li>Re-reading and highlighting</li></ul></div><div><b>After</b><ul><li>Flashcards, each linked to the line it came from</li><li>A mind map of the topic</li><li>A 60-second recall drill and reviews timed to your exam</li></ul></div></div>
    <h2>Why it's different</h2><p>${l.why}</p>
    <h2>Built for your course</h2><p>Works for GCSE, A level (AQA, OCR, Edexcel), IB and university modules, from first-year biochemistry to postgraduate law. Gradify also has free courses in 30+ subjects if you want ready-made lessons: <a href="/explore.html">explore them</a>.</p>
    ${f.html}${related("Also useful", LANDINGS.filter((x) => x.slug !== l.slug).map((x) => [`${x.slug}/`, x.name, x.line]).concat([["guides/active-recall/", "The complete guide to active recall", "How to revise from the cards you make"]]))}`,
      cta: false,
    };
  });
}
