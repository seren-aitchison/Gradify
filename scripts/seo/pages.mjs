// Comparison pages, the study glossary, printable templates, and the About and Ambassadors pages.
import { faq, related, optIn, esc, ORG } from "./shell.mjs";

const U = "2026-11-23";

// ---------- comparisons: honest, table first, saying where the other tool wins ----------
export const COMPARE = [
  {
    slug: "gradify-vs-quizlet", name: "Gradify vs Quizlet",
    title: "Gradify vs Quizlet (2026): Which Is Better for Revising From Your Notes? · Gradify",
    description: "An honest Gradify vs Quizlet comparison: making flashcards from your own notes, checking them, spaced repetition, shared sets and price, and who each one suits.",
    answer: "Use Quizlet if you want ready-made sets other students have shared, or a class set your teacher made. Use Gradify if you want flashcards made from your own lecture notes, checked line by line against them, and scheduled with spaced repetition up to your exam.",
    rows: [["Flashcards from your own PDF or notes", "Yes, in about a minute, each linked to its source line", "Yes, with its AI tools; some need Quizlet Plus"], ["Cards checked against your notes", "Yes: mismatches marked to check", "No source check"], ["Library of other people's sets", "No: free courses in 30+ subjects instead", "Yes, very large: its biggest strength"], ["Spaced repetition", "FSRS, paced to your exam date", "Learn mode; full features on Plus"], ["Mind maps from notes", "Yes, editable", "No"], ["Classes and sharing", "Share links; class tools are planned", "Mature class features and Quizlet Live"], ["Price", "Free; Gradify Pro £10 a month for planning and no limits", "Free tier; Quizlet Plus is a paid subscription"]],
    wins: "Quizlet wins on its library of shared sets, its classroom games and the number of students already using it. If your whole class shares one Quizlet set, use it.",
  },
  {
    slug: "gradify-vs-anki", name: "Gradify vs Anki",
    title: "Gradify vs Anki (2026): Easier Flashcards From Your Lecture Notes? · Gradify",
    description: "Gradify vs Anki, honestly compared: making cards, scheduling (both use FSRS), shared decks, add-ons, ease of use and price. When to use each, and how to use both.",
    answer: "Anki is the better choice if you want total control, offline use, add-ons and the huge shared decks used in medicine and languages. Gradify is easier if you want cards made from your own lecture notes in a minute, checked against them, with a schedule paced to your exam.",
    rows: [["Making cards", "Automatic from a PDF or notes, each linked to its source line", "Typed by you (or imported); powerful note types"], ["Scheduler", "FSRS-5, paced to your exam date", "FSRS (optional since 23.10) or SM-2; fully configurable"], ["Shared decks", "Free courses in 30+ subjects", "Thousands of community decks (e.g. AnKing for medicine)"], ["Add-ons and customisation", "Few: built to work out of the box", "Hundreds of add-ons; card templates in HTML"], ["Learning curve", "Minutes", "Steeper: settings, note types, sync"], ["Offline", "Opens offline once installed as an app", "Fully offline"], ["Price", "Free; Gradify Pro £10 a month", "Free on desktop, web and Android; AnkiMobile on iPhone is a one-off purchase"]],
    wins: "Anki wins on control, offline use, add-ons and its community decks, and it's free on most platforms. If you already have a big Anki collection that works, keep it.",
  },
  {
    slug: "quizlet-alternatives", name: "Best free Quizlet alternatives",
    title: "Best Free Quizlet Alternatives in 2026 (Honest List) · Gradify",
    description: "Free alternatives to Quizlet for 2026: Anki, Gradify, RemNote, Knowt and Brainscape, compared on making cards from notes, spaced repetition and what's actually free.",
    answer: "The best free Quizlet alternatives are Anki (most powerful, free on desktop and Android), Gradify (flashcards made from and checked against your own notes) and RemNote (notes that become cards). Knowt and Brainscape are worth a look too.",
    rows: [["Anki", "Serious memorisation, medicine, languages", "Free except on iPhone"], ["Gradify", "Turning your lecture notes into checked flashcards and a revision plan", "Free"], ["RemNote", "Writing notes that become flashcards", "Free tier"], ["Knowt", "Importing Quizlet-style sets and notes", "Free tier"], ["Brainscape", "Confidence-based repetition, pre-made classes", "Free tier"]],
    head: ["Tool", "Best for", "Free?"],
    wins: "If what you like about Quizlet is its shared sets, none of these fully replaces it; Anki's shared decks come closest for medicine and languages.",
  },
];

export function comparePages() {
  const pages = COMPARE.map((c) => {
    const head = c.head || ["", "Gradify", c.name.split(" vs ")[1] || ""];
    const f = faq([[`Is Gradify better than ${c.name.split(" vs ")[1] || "Quizlet"}?`, c.answer], ["Is Gradify free?", "Yes. Making flashcards and mind maps from your notes, revising them and every course are free, with no card. Gradify Pro (£10 a month) adds planning and removes limits."]]);
    return {
      path: `compare/${c.slug}/index.html`, title: c.title, description: c.description, updated: U, crumbs: [["Compare", "compare/"], [c.name, `compare/${c.slug}/`]],
      schema: [{ "@type": "Article", headline: c.name, dateModified: U, author: { "@id": "https://getgradify.com/#org" }, publisher: ORG, description: c.description }, f.schema],
      body: `<h1>${c.name}</h1><p class="answer">${c.answer}</p>
    <div class="scroll"><table><thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${c.rows.map((r) => `<tr>${r.map((x, i) => i ? `<td>${x}</td>` : `<th scope="row">${x}</th>`).join("")}</tr>`).join("")}</tbody></table></div>
    <p class="note">We make Gradify, so we've tried hard to be fair: features and prices of other tools change, so check their sites before you decide. Spotted something out of date? <a href="mailto:hello@getgradify.com?subject=Comparison">Tell us</a>.</p>
    <h2>Where the other tool is better</h2><p>${c.wins}</p>
    <h2>Using both</h2><p>Many students use Gradify to get from a lecture PDF to checked cards fast, and keep a long-term tool alongside. Whatever you choose, the method matters most: <a href="/guides/active-recall/">active recall</a> plus <a href="/glossary/spaced-repetition/">spaced repetition</a>.</p>
    ${f.html}${related("More comparisons", COMPARE.filter((x) => x.slug !== c.slug).map((x) => [`compare/${x.slug}/`, x.name, ""]).concat([["guides/best-study-tools-for-university-students/", "The 7 best study tools for university students", ""]]))}`,
    };
  });
  pages.push({ path: "compare/index.html", title: "Compare Study Tools: Gradify vs Quizlet, Anki and More · Gradify", description: "Honest comparisons of Gradify with Quizlet, Anki and other study tools, with where each one wins.", crumbs: [["Compare", "compare/"]], ogType: "website",
    body: `<h1>Compare study tools</h1><p class="lead">Honest comparisons, including where the other tool is better.</p><ul class="cards">${COMPARE.map((c) => `<li><a href="/compare/${c.slug}/">${c.name}</a><span>${c.answer.split(". ")[0]}.</span></li>`).join("")}<li><a href="/guides/best-study-tools-for-university-students/">The 7 best study tools for university students</a><span>Anki, Quizlet, Notion, RemNote, Forest, NotebookLM and Gradify.</span></li></ul>` });
  return pages;
}

// ---------- glossary ----------
export const TERMS = [
  ["active-recall", "Active recall", "Active recall is studying by retrieving information from memory, for example answering a flashcard or writing what you know on a blank page, instead of re-reading it.", "It's one of the best-supported revision methods: retrieving a fact strengthens the memory and shows you what you don't yet know. Use it with flashcards, question lists, blank-page recall and past papers.", "Upload your lecture notes and answer the flashcards Gradify makes before you flip them.", ["retrieval-practice", "spaced-repetition", "feynman-technique"]],
  ["retrieval-practice", "Retrieval practice", "Retrieval practice is the research term for learning by recalling information, also called the testing effect: being tested on material improves later memory of it more than restudying it.", "The effect has been found across ages, subjects and test formats, and it's strongest when the retrieval takes effort and you get feedback afterwards.", "Every Gradify review asks first and shows the answer after, so each one is retrieval practice.", ["active-recall", "desirable-difficulties", "metacognition"]],
  ["spaced-repetition", "Spaced repetition", "Spaced repetition is reviewing material at increasing intervals, such as after 1, 3, 7 and 14 days, timed so each review comes just before you'd forget.", "It turns the spacing effect into a system. Flashcard apps schedule each card from how well you remembered it, so easy cards come back rarely and hard ones often.", "Rate each card after answering and Gradify schedules the next review with FSRS, paced to your exam date.", ["spacing-effect", "forgetting-curve", "fsrs", "leitner-system"]],
  ["spacing-effect", "Spacing effect", "The spacing effect is the finding that we remember more when study is spread over several sessions than when the same time is spent in one block (cramming).", "First described by Hermann Ebbinghaus in 1885, it's one of the most reliable results in memory research. The best gap grows with how long you need to remember.", "Use the free spaced repetition schedule generator to get review dates for a topic.", ["spaced-repetition", "forgetting-curve", "interleaving"]],
  ["forgetting-curve", "Forgetting curve", "The forgetting curve shows how quickly memory fades after learning: steeply in the first hours and days, then more slowly.", "Hermann Ebbinghaus mapped it in the 1880s by memorising nonsense syllables. Each successful review flattens the curve, which is why spaced reviews can grow further apart.", "Gradify's Progress screen estimates how likely you are to recall each card today, from your own forgetting curve.", ["spacing-effect", "spaced-repetition", "fsrs"]],
  ["leitner-system", "Leitner system", "The Leitner system is a paper flashcard method using numbered boxes: a card you answer correctly moves up a box and is reviewed less often; a card you miss goes back to box 1.", "Devised by Sebastian Leitner in the 1970s, it's a simple, physical form of spaced repetition and still a good way to start.", "Gradify automates the same idea with a scheduler that adapts to each card.", ["spaced-repetition", "fsrs", "active-recall"]],
  ["feynman-technique", "Feynman technique", "The Feynman technique is learning by explaining a topic in simple words, as if teaching a beginner, then going back to the source wherever the explanation breaks down.", "Named after physicist Richard Feynman, it combines recall with self-explanation and exposes gaps hidden by jargon.", "Explain a lesson aloud, then check yourself with its flashcards and practice questions.", ["active-recall", "elaborative-interrogation", "metacognition"]],
  ["interleaving", "Interleaving", "Interleaving is mixing different topics or problem types in one study session (A, B, C, A, C, B) instead of practising one type at a time (A, A, A, B, B, B).", "It feels harder but improves the ability to pick the right method for a question, and is especially useful in maths and science.", "Gradify's mixed reviews and target tests interleave questions from across the lessons you've studied.", ["desirable-difficulties", "spacing-effect", "retrieval-practice"]],
  ["pomodoro-technique", "Pomodoro technique", "The Pomodoro technique is working in focused 25-minute blocks with a 5-minute break after each, and a longer break after four.", "Created by Francesco Cirillo in the late 1980s, it helps start tasks and limit distraction. The exact length matters less than protecting the focus.", "Plan your blocks with the exam countdown, which works out your real revision hours.", ["spacing-effect", "metacognition", "active-recall"]],
  ["cornell-notes", "Cornell notes", "Cornell notes divide a page into a wide notes column, a narrow cue column for questions or keywords, and a summary at the bottom.", "Developed by Walter Pauk at Cornell University, the cue column turns your notes into a self-test: cover the notes and answer the cues.", "Print the free Cornell notes template, or upload your notes and get flashcards made from them.", ["active-recall", "retrieval-practice", "elaborative-interrogation"]],
  ["dual-coding", "Dual coding", "Dual coding is combining words with visuals, such as diagrams, timelines and mind maps, so the same idea is stored both verbally and visually.", "Based on Allan Paivio's dual-coding theory, it works best with meaningful pictures that show structure, not decorative ones.", "Every Gradify lesson has five mind maps, and you can make one from your own notes.", ["active-recall", "elaborative-interrogation", "cornell-notes"]],
  ["fsrs", "FSRS (Free Spaced Repetition Scheduler)", "FSRS is an open-source spaced repetition algorithm that predicts how likely you are to remember each card and schedules the next review for when that chance drops to a target, typically 90%.", "It models each card's difficulty, stability and retrievability, and was trained on millions of real reviews. Anki adopted it as an option in 2023, and it generally needs fewer reviews than older SM-2 schedules for the same retention.", "Gradify uses FSRS-5 for every flashcard.", ["spaced-repetition", "forgetting-curve", "leitner-system"]],
  ["elaborative-interrogation", "Elaborative interrogation", "Elaborative interrogation is asking yourself why and how a fact is true, and answering from what you already know.", "Connecting a new fact to existing knowledge makes it more memorable and meaningful. It works best when you already know something about the topic.", "Gradify's application questions ask why and how, not only what.", ["feynman-technique", "dual-coding", "active-recall"]],
  ["desirable-difficulties", "Desirable difficulties", "Desirable difficulties are study conditions that make learning feel harder in the moment but improve long-term memory, such as testing, spacing and interleaving.", "The term comes from Robert Bjork. The catch: because they feel worse, students often abandon them for easier methods that work less well.", "Expect reviews to feel effortful: that effort is the point.", ["retrieval-practice", "interleaving", "spacing-effect"]],
  ["metacognition", "Metacognition", "Metacognition is thinking about your own thinking: judging what you know, planning how to learn and checking whether it's working.", "Students often overrate how well they know material they've re-read. Testing yourself gives honest feedback and improves those judgements.", "Gradify's Progress screen shows what you really know, from your answers, not from what you've read.", ["retrieval-practice", "desirable-difficulties", "active-recall"]],
];

export function glossaryPages() {
  const name = Object.fromEntries(TERMS.map(([s, n]) => [s, n]));
  const set = { "@type": "DefinedTermSet", "@id": "https://getgradify.com/glossary/#set", name: "Gradify study glossary" };
  const pages = TERMS.map(([slug, term, def, more, inGradify, rel]) => ({
    path: `glossary/${slug}/index.html`, title: `What Is ${term.replace(/ \(.*\)/, "")}? Definition and How to Use It · Gradify`, description: def.slice(0, 155), updated: U, crumbs: [["Glossary", "glossary/"], [term, `glossary/${slug}/`]],
    schema: [{ "@type": "DefinedTerm", name: term, description: def, url: `https://getgradify.com/glossary/${slug}/`, inDefinedTermSet: set }],
    body: `<h1>What is ${esc(term.replace(/ \(.*\)/, "").replace(/^(\w)/, (c) => c.toLowerCase()))}?</h1><p class="answer">${def}</p><h2>Why it matters</h2><p>${more}</p><h2>How to use it in Gradify</h2><p>${inGradify}</p>
    ${related("Related terms", rel.map((r) => [`glossary/${r}/`, name[r], ""]).concat([["guides/active-recall/", "The complete guide to active recall", ""]]))}`,
  }));
  pages.push({ path: "glossary/index.html", title: "Study Glossary: Learning Science Terms in Plain English · Gradify", description: "Active recall, spaced repetition, the forgetting curve, the Leitner system, interleaving, FSRS and more: learning science terms explained in plain English.", crumbs: [["Glossary", "glossary/"]], ogType: "website",
    schema: [{ ...set, hasDefinedTerm: TERMS.map(([s, n, d]) => ({ "@type": "DefinedTerm", name: n, description: d, url: `https://getgradify.com/glossary/${s}/` })) }],
    body: `<h1>Study glossary</h1><p class="lead">The learning-science terms behind good revision, in plain English.</p><dl>${[...TERMS].sort((a, b) => a[1].localeCompare(b[1])).map(([s, n, d]) => `<dt><a href="/glossary/${s}/">${n}</a></dt><dd>${d}</dd>`).join("")}</dl>` });
  return pages;
}

// ---------- printable templates ----------
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const grid = (cols, rows, rowLabel = () => "") => `<table><thead><tr><th></th>${cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${Array.from({ length: rows }, (_, i) => `<tr><th>${rowLabel(i)}</th>${cols.map(() => "<td></td>").join("")}</tr>`).join("")}</tbody></table>`;
export const TEMPLATES = [
  ["revision-timetable", "Weekly revision timetable", "A one-week revision timetable to print: morning, afternoon and evening blocks for each day, with space for due reviews.", () => grid(days, 6, (i) => ["Reviews due", "Morning 1", "Morning 2", "Afternoon 1", "Afternoon 2", "Evening"][i])],
  ["cornell-notes", "Cornell notes template", "A printable Cornell notes page: a cue column for questions, a notes column and a summary box, for turning lecture notes into a self-test.", () => `<table><tbody><tr><th style="width:30%">Cues / questions</th><th>Notes</th></tr>${'<tr><td style="height:56px"></td><td></td></tr>'.repeat(9)}<tr><th colspan="2">Summary (in your own words)</th></tr><tr><td colspan="2" style="height:110px"></td></tr></tbody></table>`],
  ["active-recall-tracker", "Active recall tracker", "Track each topic's recall sessions over spaced days: tick when you can recall it from a blank page, and see what needs another round.", () => grid(["Day 1", "Day 3", "Day 7", "Day 14", "Day 30", "Confidence"], 14, () => "")],
  ["7-day-exam-plan", "7-day active recall exam plan", "A day-by-day plan for the last week before an exam: what to recall, when to do past papers, and how to protect sleep.", () => `<table><thead><tr><th>Day</th><th>Morning</th><th>Afternoon</th><th>Evening</th></tr></thead><tbody>${[["7 days out", "Blank-page recall: top 3 weak topics", "Flashcards due + past paper section", "Light review"], ["6", "Recall topics 4–6", "Timed past paper", "Mark it; mistakes → new cards"], ["5", "Weak cards only", "Recall topics 7–9", "Rest"], ["4", "Timed past paper", "Mark it; redo errors from memory", "Light review"], ["3", "Recall every topic heading from memory", "Fill the gaps", "Rest"], ["2", "Final past paper", "Weak cards only", "Pack your things"], ["1", "Light flashcard review (1 hour)", "Walk, eat, rest", "Bed at a normal time"]].map((r) => `<tr>${r.map((c, i) => i ? `<td>${c}</td>` : `<th>${c}</th>`).join("")}</tr>`).join("")}</tbody></table>`],
];
export function templatePages() {
  const pages = TEMPLATES.map(([slug, name, desc, table]) => ({
    path: `templates/${slug}/index.html`, title: `${name} (Free Printable PDF) · Gradify`, description: desc, updated: U, crumbs: [["Templates", "templates/"], [name, `templates/${slug}/`]],
    schema: [{ "@type": "CreativeWork", name, description: desc, isAccessibleForFree: true, license: "https://creativecommons.org/licenses/by/4.0/", creator: { "@id": "https://getgradify.com/#org" } }],
    body: `<h1>${name}</h1><p class="answer">${desc} Free to print or save as a PDF, and free to share with credit.</p>
    <p class="no-print"><button type="button" class="btn btn-primary lg" data-print><span>Print or save as PDF</span></button></p>
    <div class="printable"><h2 style="color:#111;margin-top:0">${name}</h2>${table()}<p class="foot">Free template from getgradify.com/templates/ · Turn your notes into checked flashcards at getgradify.com</p></div>
    <h2 class="no-print">Use it with</h2><p class="no-print">Pair it with <a href="/guides/active-recall-schedule-before-finals/">the 6-week schedule before finals</a> and <a href="/tools/spaced-repetition-schedule/">the spaced repetition schedule generator</a>. You're welcome to share this template on your blog or Notion with a link back to this page.</p>`,
  }));
  pages.push({ path: "templates/index.html", title: "Free Printable Revision Templates (PDF) · Gradify", description: "Free printable revision templates: weekly revision timetable, Cornell notes, active recall tracker and a 7-day exam plan. Print or save as PDF.", crumbs: [["Templates", "templates/"]], ogType: "website",
    body: `<h1>Free printable revision templates</h1><p class="lead">Print them, or save as PDF for GoodNotes, Notability or Notion.</p><ul class="cards">${TEMPLATES.map(([s, n, d]) => `<li><a href="/templates/${s}/">${n}</a><span>${d}</span></li>`).join("")}</ul>${optIn()}` });
  return pages;
}

// ---------- About (who is behind Gradify) and Ambassadors ----------
export function aboutPages() {
  return [{
    path: "about.html", title: "About Gradify: Who Builds It and How Lessons Are Checked", description: "About Gradify: who builds it, why, and how every lesson and flashcard is checked. Turn your notes into flashcards checked against what you wrote.", crumbs: [["About", "about.html"]], ogType: "website", updated: U,
    schema: [{ "@type": "AboutPage", name: "About Gradify", about: { "@id": "https://getgradify.com/#org" } }, { ...ORG, founder: { "@type": "Person", name: "Seren Aitchison" } }],
    body: `<h1>About Gradify</h1><p class="answer">Gradify turns your notes into flashcards and mind maps checked against what you wrote, and schedules your revision with spaced repetition. It also has free courses in more than 30 subjects, from GCSE to postgraduate study.</p>
    <h2>Why we built it</h2><p>Students spend hours making study material and then revise it the least effective way: re-reading. AI tools can make cards in seconds, but they invent things that aren't in your course. Gradify does the making for you and shows you the evidence for every card, so you can trust what you revise and spend your time on recall.</p>
    <h2>Who builds Gradify</h2><p>Gradify was started by <b>Seren Aitchison</b> and is built by a small team in the UK. The same team makes BioFrontier, Eirova, Erya and Vizeon.</p>
    <h2>How lessons and cards are checked</h2><ul><li>Every flashcard made from your notes links to the line it came from; cards that don't fully match are marked <em>to check</em>.</li><li>Every course lesson is audited on nine dimensions of teaching quality on every change: see <a href="/quality.html">Quality and coverage</a>.</li><li>We only claim to cover a qualification after checking it against the official specification, outcome by outcome.</li></ul>
    <h2>Contact</h2><p><a href="mailto:hello@getgradify.com">hello@getgradify.com</a>. Every message is read.</p>`,
  }, {
    path: "ambassadors.html", title: "Gradify Campus Ambassadors: Free Pro, Real Startup Experience", description: "Become a Gradify Campus Ambassador: share a free study tool with your course and societies, get free Gradify Pro, an official title for your CV and LinkedIn, and a reference.", crumbs: [["Campus ambassadors", "ambassadors.html"]], ogType: "website", updated: U,
    schema: [{ "@type": "WebPage", name: "Gradify Campus Ambassadors", publisher: { "@id": "https://getgradify.com/#org" } }],
    body: `<h1>Become a Gradify Campus Ambassador</h1><p class="answer">Campus Ambassadors tell their course mates and societies about Gradify, a free tool that turns lecture notes into checked flashcards. In return you get free Gradify Pro, an official title for your CV and LinkedIn, and a reference from the team.</p>
    <h2>What you get</h2><ul><li>Gradify Pro, free, while you're an ambassador</li><li>The title "Campus Ambassador, Gradify" for your CV and LinkedIn</li><li>A written reference or LinkedIn recommendation after a term</li><li>Early access to new features, and a direct line to the team</li></ul>
    <h2>What we ask</h2><ul><li>Share Gradify where it genuinely helps: course group chats before exams, society resource pages, study sessions</li><li>Tell us what students on your course need</li><li>Never spam, and always say you're an ambassador</li></ul>
    <h2>Who it's for</h2><p>Any student at a UK or international university or sixth form, especially society committee members, course reps and anyone who already shares study tips.</p>
    <p><a class="btn btn-primary lg" href="mailto:hello@getgradify.com?subject=Campus%20Ambassador&body=University%3A%0ACourse%20and%20year%3A%0ASocieties%3A%0AWhy%20you%27d%20like%20to%20do%20it%3A"><span>Apply by email</span></a></p>`,
  }];
}
