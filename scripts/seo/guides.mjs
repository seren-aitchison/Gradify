// Study guides (getgradify.com/guides/…): one pillar guide on active recall and the cluster of shorter guides that link
// up to it, a balanced "best study tools" comparison, and seasonal guides published ahead of exam season. Each opens
// with a two-sentence answer, carries a visible "Last updated" date and an author, and links to the glossary.
import { faq, related, optIn, ORG } from "./shell.mjs";
import { GUIDES2, GROUPS } from "./guides2.mjs";
import { GUIDE_EXTRA, toolCallout, pitfallsBox, relatedKeys, seriesNav, stagesBlock } from "./links.mjs";

const AUTHOR = { "@type": "Organization", "@id": "https://getgradify.com/#org", name: "Gradify", url: "https://getgradify.com/about.html" };
const byline = `<p class="byline">By the <a href="/about.html">Gradify team</a> · Based on the learning research named in the text</p>`;
const PILLAR = ["guides/active-recall/", "The complete guide to active recall", "The pillar guide: what it is, why it works and how to do it"];

export const GUIDES = [
  {
    slug: "active-recall", pillar: true, updated: "2026-11-23",
    title: "Active Recall: The Complete Guide for University Exams (2026) · Gradify",
    description: "What active recall is, the research behind it, and a step-by-step method for using it with flashcards, blank pages and past papers to revise for university and A level exams.",
    h1: "The complete guide to active recall for exams",
    answer: "Active recall means testing yourself by pulling information out of memory, instead of reading it again. It's one of the two best-supported revision methods in learning research (the other is spacing), and it works because the effort of retrieving a fact is what makes it stick.",
    sections: [
      ["What is active recall?", `<p>Every time you close your notes and try to answer a question, explain a process from memory or write out a definition on a blank page, you're using <a href="/glossary/active-recall/">active recall</a>. Researchers call it <a href="/glossary/retrieval-practice/">retrieval practice</a> or the testing effect. The opposite is passive review: re-reading, highlighting and copying notes out neatly, which feel productive but leave little behind.</p>`],
      ["Why does active recall work?", `<p>Retrieval strengthens the route back to a memory. In a well-known 2006 study by Roediger and Karpicke, students who read a passage once and then practised recalling it remembered far more a week later than students who spent the same time re-reading it, even though the re-readers felt more confident. A large 2013 review by Dunlosky and colleagues rated practice testing as one of only two "high utility" techniques, alongside <a href="/glossary/spacing-effect/">distributed practice</a>, and rated highlighting and re-reading as low utility.</p><p>Recall also shows you what you don't know. Re-reading makes everything look familiar; a blank page tells you the truth, so you spend your time on the gaps.</p>`],
      ["How to do active recall: a step-by-step method", `<ol><li><b>Learn it once, properly.</b> Attend the lecture or read the chapter with the aim of understanding, not memorising.</li><li><b>Turn it into questions.</b> Make flashcards or a list of questions from your notes: definitions, processes, causes, comparisons, worked examples. <a href="/pdf-to-flashcards/">Gradify can do this from a PDF</a> and check each card against your notes.</li><li><b>Answer from memory first.</b> Say or write the full answer before you look. A half-answer in your head doesn't count.</li><li><b>Check and mark honestly.</b> Compare with the source. Anything wrong or vague comes back sooner.</li><li><b>Space the reviews.</b> Come back after 1, 3, 7 and 14 days, longer each time you get it right. The <a href="/tools/spaced-repetition-schedule/">schedule generator</a> gives you the dates.</li><li><b>Finish with exam questions.</b> In the last week or two, past papers under timed conditions are active recall in the exam's own format.</li></ol>`],
      ["Five active recall techniques", `<ul><li><b>Flashcards</b>: best for definitions, facts and short processes. Keep one idea per card (<a href="/guides/how-to-make-good-flashcards/">how to make good flashcards</a>).</li><li><b>The blank page</b>: write everything you know about a topic, then check against your notes and fill the gaps in another colour.</li><li><b>Teach it</b>: explain the topic aloud as if to a first-year (the <a href="/glossary/feynman-technique/">Feynman technique</a>).</li><li><b>Question lists</b>: turn each heading of your notes into a question and answer it without looking (the left column of <a href="/glossary/cornell-notes/">Cornell notes</a> does this).</li><li><b>Past papers</b>: the closest practice to the real thing.</li></ul>`],
      ["Common mistakes", `<ul><li>Peeking at the answer before committing to one.</li><li>Making cards so big that you can't tell whether you got them right.</li><li>Only reviewing cards you already know because it feels good.</li><li>Cramming every card the night before instead of spacing them.</li><li>Making cards from material you never understood: recall needs something to recall.</li></ul>`],
    ],
    faq: [["Is active recall better than re-reading?", "Yes. Studies consistently find that testing yourself produces better long-term memory than spending the same time re-reading, even though re-reading feels more effective at the time."], ["How long should an active recall session be?", "Twenty-five to fifty minutes is plenty. Stop when your answers become careless, and come back to the same material on a later day."], ["Can I use active recall for essay subjects?", "Yes: recall the argument, the key evidence and the counter-arguments for each essay plan, then write timed answers. History, law and English students use question lists and blank-page plans this way."]],
    cluster: true,
  },
  {
    slug: "active-recall-vs-rereading", updated: "2026-11-23",
    title: "Active Recall vs Re-reading Notes: Which Works Better? · Gradify",
    description: "Re-reading feels productive but fades fast. Here's what the research says about active recall vs re-reading, and how to switch a re-reading habit to self-testing in one evening.",
    h1: "Active recall vs re-reading: which actually works?",
    answer: "Active recall works better. Re-reading builds familiarity, which feels like knowing, but self-testing builds memories you can retrieve in an exam, and the gap grows the longer you wait.",
    sections: [
      ["Why re-reading feels so effective", `<p>On a second read, the words are familiar, so the brain reports "I know this". That fluency is real, but it's recognition, not recall, and exams ask you to recall. Students in testing-effect studies routinely predict that re-reading will serve them better, and are wrong.</p>`],
      ["What the research found", `<p>When one group re-reads and another practises recall for the same time, the recall group typically remembers more after a few days or a week. The advantage is small or even reversed if you test five minutes later, which is exactly why re-reading seems to work the night before. See the <a href="/guides/active-recall/">complete guide</a> for the studies.</p>`],
      ["How to switch in one evening", `<ol><li>Take the notes you would have re-read.</li><li>Turn each heading into a question ("What are the stages of mitosis?").</li><li>Cover the notes and answer aloud or on paper.</li><li>Check, and mark the ones you missed.</li><li>Tomorrow, answer only the missed ones; in three days, all of them.</li></ol>`],
      ["Is re-reading ever useful?", `<p>Yes: a first read to understand a topic, and a quick re-read of a card's source after you get it wrong. The mistake is using re-reading as the revision itself.</p>`],
    ],
    faq: [["Why do I forget what I re-read?", "Re-reading creates familiarity without practising retrieval, so the memory isn't strengthened for later recall. Testing yourself is what makes it last."]],
  },
  {
    slug: "active-recall-for-science", updated: "2026-11-23",
    title: "How to Use Active Recall for Science Subjects (Biology, Chemistry, Physics) · Gradify",
    description: "Active recall for science: flashcards for definitions, blank-page diagrams for processes, and worked problems for calculations. A method for GCSE, A level and university sciences.",
    h1: "How to use active recall for science subjects",
    answer: "In science, use flashcards for definitions and facts, draw processes and diagrams from memory on a blank page, and practise calculations as unseen problems. Each type of knowledge needs its own kind of recall.",
    sections: [
      ["Definitions and facts: flashcards", `<p>Biology and chemistry are full of precise definitions (osmosis, electronegativity, enthalpy change). One definition per card, answered word for word, then spaced. Examiners reward the exact wording, so recall it exactly.</p>`],
      ["Processes: draw them from memory", `<p>For the Krebs cycle, the nitrogen cycle, action potentials or reaction mechanisms, draw the whole process on a blank page, then check every arrow and label. Redraw only what you got wrong. This is <a href="/glossary/dual-coding/">dual coding</a> and recall at once.</p>`],
      ["Calculations: unseen problems", `<p>For physics and quantitative chemistry, recall means solving a problem you haven't seen the answer to. Mix problem types (moles, rates, equilibria) in one session: <a href="/glossary/interleaving/">interleaving</a> trains you to recognise which method a question needs.</p>`],
      ["Required practicals and data questions", `<p>List each practical's method, variables, risks and sources of error from memory. Then practise unfamiliar data questions from past papers.</p>`],
      ["Ready-made science courses", `<p>Gradify's free <a href="/scigradify/biology/">biology</a>, <a href="/scigradify/chemistry/">chemistry</a> and <a href="/scigradify/physics/">physics</a> courses come with flashcards and practice questions for every lesson, and <a href="/topics/">topic pages</a> show what each unit covers.</p>`],
    ],
    faq: [["How do I memorise biology processes?", "Draw the process from memory on a blank page, check it against your notes, correct it, and repeat on later days until you can draw it fully. Flashcards suit the individual definitions inside it."]],
  },
  {
    slug: "active-recall-schedule-before-finals", updated: "2026-11-23",
    title: "The Best Active Recall Schedule Before Finals (6-Week Plan) · Gradify",
    description: "A week-by-week active recall and spaced repetition schedule for the six weeks before university finals or A levels, with what to do each day and how to fit in past papers.",
    h1: "The best active recall schedule before finals",
    answer: "Spend the first four weeks covering every topic with active recall and spaced reviews, then use the last two weeks for timed past papers and your weakest topics. Every topic should be recalled at least three times, on different days, before the exam.",
    sections: [
      ["Weeks 6 to 5: build the question bank", `<p>Turn each topic into flashcards and question lists (Gradify does this <a href="/pdf-to-flashcards/">from your PDFs</a>). Learn two or three topics a day and do the first recall the next day.</p>`],
      ["Weeks 4 to 3: cover everything, spaced", `<p>Keep adding topics, but start each session with reviews that are due. Your daily order: due reviews first, then new material. Use the <a href="/tools/spaced-repetition-schedule/">schedule generator</a> or let Gradify schedule the cards.</p>`],
      ["Week 2: past papers", `<p>One timed paper every other day. Mark it, and turn every mistake into a new flashcard. Keep daily reviews going.</p>`],
      ["Final week: weak spots and sleep", `<p>Only weak cards and the topics past papers exposed. No new material after two days out. Sleep consolidates memory: an all-nighter costs more than it gains.</p>`],
      ["A daily template", `<ul><li>25 to 40 minutes: due reviews</li><li>Two 50-minute blocks: new topic, learn then question</li><li>15 minutes: blank-page recall of yesterday's topic</li><li>Evening: nothing, or a short review</li></ul><p>Print the <a href="/templates/revision-timetable/">revision timetable</a> or the <a href="/templates/7-day-exam-plan/">7-day plan</a>, and check your hours with the <a href="/tools/exam-countdown/">exam countdown</a>.</p>`],
    ],
    faq: [["How many times should I review a topic before an exam?", "At least three times on separate days, with growing gaps, and more for topics you keep getting wrong."]],
  },
  {
    slug: "how-to-make-good-flashcards", updated: "2026-11-23",
    title: "How to Make Good Flashcards: 9 Rules That Actually Work · Gradify",
    description: "Nine rules for making effective flashcards: one idea per card, questions not topics, cloze deletions, images, and why your cards must match your own course notes.",
    h1: "How to make good flashcards: 9 rules",
    answer: "Good flashcards test one idea each, ask a precise question with one right answer, and come from your own course material. Small, specific cards are faster to review and tell you exactly what you don't know.",
    sections: [
      ["The nine rules", `<ol><li><b>One idea per card.</b> "List the 8 causes of…" becomes eight cards or a cloze.</li><li><b>Ask a question, not a topic.</b> "Mitosis" is a topic; "What happens in anaphase?" is a question.</li><li><b>One right answer.</b> If you can't mark it, rewrite it.</li><li><b>Use your course's wording.</b> Examiners mark against your syllabus.</li><li><b>Add cloze deletions for lists and formulae</b>: "ΔG = ΔH − {{T}}ΔS".</li><li><b>Add a picture when it helps</b>: diagrams beat descriptions.</li><li><b>Make both directions for vocabulary</b>: term → definition and definition → term.</li><li><b>Understand before you card.</b> Cards are for remembering, not for learning something new.</li><li><b>Check them against your notes.</b> A wrong card, revised 20 times, is a wrong answer in the exam.</li></ol>`],
      ["Should I make my own flashcards or use pre-made ones?", `<p>Making cards helps you process the material, but takes time. Pre-made decks save time but may not match your course. Gradify sits in between: it makes cards from <em>your</em> notes and shows the line each one came from, so you get the speed without the mismatch.</p>`],
    ],
    faq: [["How many flashcards should I make per lecture?", "Typically 15 to 40 for a one-hour lecture: one per definition, process step or key fact that the exam could ask about."]],
  },
  {
    slug: "how-to-revise-in-two-weeks", updated: "2026-11-23", season: "Ahead of January and May exams",
    title: "How to Revise in 2 Weeks (When You've Left It Late) · Gradify",
    description: "Two weeks until your exam? A realistic day-by-day plan: triage topics, turn notes into flashcards fast, use active recall and past papers, and protect your sleep.",
    h1: "How to revise in two weeks",
    answer: "Triage first: list every topic, rank them by how likely they are to come up and how weak you are, and cut what you can't cover. Then spend each day on active recall of the top topics and finish with timed past papers.",
    sections: [
      ["Day 1: triage", `<p>Get the syllabus and three past papers. List topics, mark each red, amber or green, and note which come up most. You won't cover everything; decide now what you'll skip.</p>`],
      ["Days 2 to 9: recall, not notes", `<p>Don't rewrite notes. Turn the existing ones into flashcards fast (<a href="/pdf-to-flashcards/">upload the PDFs</a>), then test yourself: new red topics in the morning, reviews of earlier days in the afternoon.</p>`],
      ["Days 10 to 13: past papers", `<p>A timed paper a day, marked the same day, with every mistake made into a card.</p>`],
      ["Day 14: light review and sleep", `<p>Review weak cards only. Go to bed at a normal time.</p>`],
      ["How many hours do you actually have?", `<p>Check with the <a href="/tools/exam-countdown/">exam countdown</a>: at 5 hours a day with one rest day, two weeks is about 60 hours. That's enough for a lot, if every hour is recall.</p>`],
    ],
    faq: [["Is two weeks enough to revise for an exam?", "For most single exams, yes, if you prioritise the most likely topics and spend the time testing yourself rather than re-reading or rewriting notes."]],
  },
  {
    slug: "best-study-tools-for-university-students", updated: "2026-11-23",
    title: "7 Best Study Tools for University Students in 2026 (Honest Comparison) · Gradify",
    description: "An honest comparison of the best study tools for university students in 2026: Anki, Quizlet, Notion, RemNote, Forest, Google NotebookLM and Gradify, with who each one suits.",
    h1: "The 7 best study tools for university students in 2026",
    answer: "Anki is best for serious long-term memorisation, Quizlet for quick shared vocabulary sets, Notion for organising a whole degree, and Gradify for turning your own lecture notes into checked flashcards and a revision plan. Most students do well with one note tool and one recall tool.",
    sections: [
      ["Quick comparison", `<div class="scroll"><table><thead><tr><th>Tool</th><th>Best for</th><th>Free?</th></tr></thead><tbody>
      <tr><td><b>Anki</b></td><td>Long-term memorisation with adaptive spaced repetition; huge shared decks (especially medicine)</td><td>Yes on desktop, web and Android; paid on iPhone</td></tr>
      <tr><td><b>Quizlet</b></td><td>Fast vocabulary sets, sharing with a class, a big library of user-made sets</td><td>Free tier; many study modes need Quizlet Plus</td></tr>
      <tr><td><b>Notion</b></td><td>Organising notes, deadlines and a whole degree in one place</td><td>Free for personal use</td></tr>
      <tr><td><b>RemNote</b></td><td>Taking notes that turn into flashcards as you write</td><td>Free tier</td></tr>
      <tr><td><b>Forest</b></td><td>Staying off your phone during study sessions</td><td>Free on Android; paid on iPhone</td></tr>
      <tr><td><b>Google NotebookLM</b></td><td>Asking questions of your own sources and generating summaries</td><td>Free tier</td></tr>
      <tr><td><b>Gradify</b></td><td>Turning lecture PDFs into flashcards and mind maps checked against your notes, with a revision schedule paced to your exam; free courses in 30+ subjects</td><td>Yes, no card</td></tr>
      </tbody></table></div><p>Prices and plans change; check each tool's own site. We make Gradify, so weigh our view of it accordingly.</p>`],
      ["Which should you choose?", `<ul><li><b>Medicine or a language</b>: Anki, for its shared decks and scheduler. Gradify can make the cards from your own lectures to go alongside.</li><li><b>A class sharing vocab</b>: Quizlet.</li><li><b>Lots of lecture PDFs and little time</b>: Gradify, to get from notes to recall in a minute.</li><li><b>Disorganised across modules</b>: Notion, plus one recall tool.</li><li><b>Distracted</b>: Forest, or your phone's focus mode.</li></ul>`],
      ["What matters more than the tool", `<p>The method. Any of these works if you test yourself and space the reviews; none works if you only re-read. Start with <a href="/guides/active-recall/">active recall</a>.</p>`],
    ],
    faq: [["What is the best free study app for university?", "It depends on the job: Anki for memorisation, Notion for organisation, and Gradify for turning lecture notes into checked flashcards and a revision plan. All three have free plans."]],
  },
];

export function guidePages() {
  const pages = GUIDES.map((g) => {
    const f = faq(g.faq);
    const cluster = GUIDES.filter((x) => x.slug !== g.slug && !x.pillar && ["active-recall-vs-rereading", "active-recall-for-science", "active-recall-schedule-before-finals", "how-to-make-good-flashcards"].includes(x.slug));
    const links = g.pillar ? cluster.map((x) => [`guides/${x.slug}/`, x.h1, x.answer.split(". ")[0]]) : [PILLAR, ...cluster.slice(0, 2).map((x) => [`guides/${x.slug}/`, x.h1, ""])];
    const article = { "@type": "Article", headline: g.h1, description: g.description, dateModified: g.updated, datePublished: "2026-11-23", author: AUTHOR, publisher: { ...ORG }, mainEntityOfPage: `https://getgradify.com/guides/${g.slug}/`, image: "https://getgradify.com/assets/og.png", inLanguage: "en-GB" };
    const howto = g.slug === "active-recall" ? [{ "@type": "HowTo", name: "How to do active recall", step: ["Learn it once, properly", "Turn it into questions", "Answer from memory first", "Check and mark honestly", "Space the reviews", "Finish with exam questions"].map((n, i) => ({ "@type": "HowToStep", position: i + 1, name: n, text: n })) }] : [];
    return {
      path: `guides/${g.slug}/index.html`, cite: g.h1, title: g.title, description: g.description, updated: g.updated, crumbs: [["Study guides", "guides/"], [g.h1.replace(/:.*$/, ""), `guides/${g.slug}/`]],
      schema: [article, ...howto, f.schema],
      body: `<h1>${g.h1}</h1>${byline}<p class="answer">${g.answer}</p>
    <p><a href="/app.html#/new">Try it on your own notes: Gradify turns a lecture PDF into checked flashcards, free →</a></p>
    ${toolCallout(GUIDE_EXTRA[g.slug]?.tools || [])}
    ${g.sections.map(([h, html]) => `<h2>${h}</h2>${html}`).join("\n    ")}
    ${pitfallsBox(GUIDE_EXTRA[g.slug]?.pitfalls || [])}${relatedKeys("Related checklists", GUIDE_EXTRA[g.slug]?.checks || [])}${relatedKeys("Related comparisons", GUIDE_EXTRA[g.slug]?.vs || [])}${seriesNav(`guides/${g.slug}/`)}
    ${f.html}${optIn()}${related(g.pillar ? "Read next in this series" : "More on active recall", links)}`,
    };
  });
  pages.push({ path: "guides/index.html", title: "Study Guides: Active Recall, Flashcards and Revision Plans · Gradify", description: "Free, research-backed study guides: active recall, spaced repetition, making flashcards, revision schedules before finals and the best study tools for university.", crumbs: [["Study guides", "guides/"]], ogType: "website",
    schema: [{ "@type": "CollectionPage", name: "Study guides", hasPart: [...GUIDES, ...GUIDES2].map((g) => ({ "@type": "Article", headline: g.h1, url: `https://getgradify.com/guides/${g.slug}/` })) }],
    body: `<h1>Study guides</h1><p class="lead">How to revise in less time, from the research on memory. Start with the <a href="/guides/active-recall/">complete guide to active recall</a>.</p><h2>Active recall and revision</h2><ul class="cards">${GUIDES.map((g) => `<li><a href="/guides/${g.slug}/">${g.h1}</a><span>${g.answer.split(". ")[0]}.</span></li>`).join("")}</ul>
    ${Object.entries(GROUPS).map(([k, v]) => `<h2>${v}</h2><ul class="cards">${GUIDES2.filter((g) => g.group === k).map((g) => `<li><a href="/guides/${g.slug}/">${g.h1}</a><span>${g.answer.split(". ")[0]}.</span></li>`).join("")}</ul>`).join("")}
    ${stagesBlock()}
    <h2>Concept comparisons</h2><p>Active recall vs spaced repetition, molarity vs molality, correlation vs causation and more: <a href="/vs/">see them all</a>.</p>
    <h2>Look up a term</h2><p>Spaced repetition, the forgetting curve, the Leitner system and more, in plain English: <a href="/glossary/">the study glossary</a>.</p>` });
  return pages;
}
