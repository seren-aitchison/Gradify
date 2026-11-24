// A public page for every Gradify feature, so someone searching for the thing a feature does ("flashcard feed",
// "handwriting to text", "chant podcast for revision") lands on that feature, not the homepage:
//   features/              every feature, by category
//   features/<slug>/       one feature: what it does, how to use it, who it's for, what's free, and a way in
// The list of features is kit/data/features.js (the homepage showcase uses the same list). Each feature's words are
// in FEATURE_PAGES below, written from what the code does (the module named in `src`), never from what it might do.
// A feature that can't be used yet (Gradify AI, in Gradify Ultra, which isn't on sale) still gets a page, marked
// "coming", with noindex: nothing is advertised before it ships.
import { esc, related, faq, ORIGIN } from "./shell.mjs";
import { CATS, FEATURES, featureSlug } from "../../kit/data/features.js";
import { FREE, TOOLS as LIMITED } from "../../kit/data/limits.js";
import { PLUS_ON_SALE, PRO_ON_SALE, PLAN_PRICES } from "../../kit/data/billing.js";
import { SITES } from "../../kit/core/site.js";

const pounds = (p) => `£${(p / 100).toFixed(p % 100 ? 2 : 0)}`;
const PRO = `Gradify Pro (${pounds(PLAN_PRICES.plus.month)} a month)`;

// title: the search phrase (≤ 60 characters with " | Gradify"); answer: the two sentences under the h1; what: a
// paragraph; steps: how to use it; good: who or when it helps most; links: free pages on the same job; tool: its
// allowance key in kit/data/limits.js; src: where it's built; owner: [path, name] of the page that already answers the
// same search (a single-purpose landing page). Then this page is noindex, follow and points there, so two Gradify
// pages never compete for one query.
export const FEATURE_PAGES = {
  "online-courses": { title: "Free Online Courses in 30+ Subjects", src: "kit/course/course.js",
    answer: "Gradify has free online courses on every one of its subject sites, from GCSE core and primary to medicine, law and physics. Each course is split into units and short lessons, with check questions, flashcards, interim quizzes and an exam at the end.",
    what: "Every course runs on the same engine, so they all work the same way: notes written for the lesson, check questions at three levels (foundation, application and reasoning), flashcards you can add to your revision, a quiz at the end of each unit and an exam for the course. Progress, XP and streaks are kept as you go, and every lesson can be opened without an account.",
    steps: ["Pick the site for your subject or stage, then open its course.", "Work through a lesson: read the notes, then answer the check questions from memory.", "Take the unit quiz when you finish a unit, and the exam when you've finished the course."],
    good: ["Learning a subject from the beginning, in order", "Filling a gap in what your class covered", "Checking you really know a unit before an exam"],
    links: [["topics/", "Revision topics by subject"], ["study-plan/", "Week-by-week study plans"], ["exam-boards/", "Exam boards and qualifications"]] },
  "explainer-videos": { title: "Make a Revision Explainer Video from Notes", tool: "explain", src: "kit/tools/learn.js",
    answer: "Gradify turns any lesson, unit or your own notes into a short narrated explainer video, one scene per section. It plays in the browser and downloads as a video file.",
    what: "Pick what to explain and Gradify builds the scenes from its sections, then narrates them with your device's own voice (you can choose which). Because the words come from the lesson or your notes, the video says exactly what you're revising, nothing more. Download it to watch offline or send to your study group.",
    steps: ["Open Tools in the Gradify app and choose Explainer videos.", "Pick a lesson, a unit or one of your own sets of notes.", "Play it, choose a voice, and download the video if you want to keep it."],
    good: ["Visual and audio learners who drift off reading", "A quick recap before a lesson or exam", "Sharing a topic with a friend who missed it"],
    links: [["guides/study-methods/", "Study methods compared"], ["glossary/dual-coding/", "Dual coding"]] },
  "tutorials-and-simulations": { title: "Interactive Science Simulations Online", src: "kit/labs/",
    answer: "Gradify's courses include interactive tutorials and simulations you control, from a beating heart and protein structures to circuits and markets. They run in the browser, inside the lessons that teach them.",
    what: "Simulations sit next to the lesson that explains them, so you can change a variable and see what happens straight after reading why. The biology course alone has interactives on food webs, protein structure and more; physics, chemistry, psychology and sociology have their own labs, experiments and data explorers.",
    steps: ["Open a course on SciGradify, PsychGradify or another subject site.", "Go to a lesson with a simulation, or open the course's practice area.", "Change the controls, predict what will happen, then check."],
    good: ["Seeing a process that's hard to picture from a diagram", "Practical and required-practical style questions", "Testing a prediction before you learn the answer"],
    links: [["scigradify/", "SciGradify: biology, chemistry and physics"], ["guides/active-recall-for-science/", "Active recall for science"], ["guides/variables-and-controls/", "Variables and controls"]] },
  "chant-podcasts": { title: "Revision Chant Podcasts for Every Unit", tool: "podcast", src: "kit/tools/learn.js",
    answer: "Chant podcasts turn every unit of a Gradify course into an episode of short, repeated chants of its key facts, played back to back. You listen hands-free, on a walk or a commute.",
    what: "Each episode is built from the unit's own key terms and facts and read aloud by your device's voice, with repetition so the facts stick. Pick a course and Gradify plays its units one after another, so you can revise without looking at a screen.",
    steps: ["Open Tools in the Gradify app and choose Chant podcasts.", "Pick a course: its units become episodes.", "Press play and listen; repeat the chants out loud if you can."],
    good: ["Revising on the move", "Lists and definitions you keep forgetting", "Learners who remember by sound and rhythm"],
    links: [["notes-to-study-chant/", "Turn notes into a study chant"], ["glossary/spacing-effect/", "The spacing effect"]] },
  "audio-questions": { title: "Hands-Free Audio Revision Questions", tool: "audio", src: "kit/tools/learn.js",
    answer: "Audio questions reads a question aloud, pauses so you can answer out loud, then reads the answer. It's active recall you can do with your eyes closed.",
    what: "Questions come from any lesson, unit or your own flashcards. Where the browser can listen, you can answer by speaking; otherwise you answer in your head during the pause. Saying the answer before hearing it is retrieval practice, which beats listening to notes on repeat.",
    steps: ["Open Tools in the Gradify app and choose Audio questions.", "Pick a lesson, a unit or one of your decks.", "Listen, answer in the pause, then hear whether you were right."],
    good: ["Revising while walking, cooking or travelling", "Tired eyes after a day of screens", "Practising answering out loud for orals and vivas"],
    links: [["glossary/retrieval-practice/", "Retrieval practice"], ["guides/active-recall/", "Active recall: the complete guide"]] },
  "story-posters": { title: "Revision Story Posters with Cloze Mode", tool: "poster", src: "kit/tools/learn.js",
    answer: "Story posters tell a topic as a picture story, one panel at a time. A cloze mode hides the key words so the poster tests you, and it downloads as PNG or SVG.",
    what: "Gradify builds the poster from a lesson's sections and key terms. Read it once as a story, then switch on the cloze mode and fill in the hidden words from memory. Print it for your wall or save it to your phone.",
    steps: ["Open Tools in the Gradify app and choose Story posters.", "Pick the lesson or unit you're revising.", "Read the story, then turn on hidden key words and test yourself."],
    good: ["Visual learners", "A one-page summary for your wall", "Turning a dense topic into something you can recall as a sequence"],
    links: [["glossary/dual-coding/", "Dual coding"], ["templates/", "Printable revision templates"]] },
  "dictionaries-and-thesauruses": { title: "Subject Dictionary of Key Terms", tool: null, src: "kit/tools/learn.js",
    answer: "Gradify's subject dictionaries define every key term used in its lessons, organised by subject. A thesaurus helps you find the right word when you write.",
    what: "Every term is defined in the words the lesson uses, so a definition in the dictionary matches what you'll be marked against in that course. Look a term up, see which subject it belongs to, and open the lesson it comes from.",
    steps: ["Open Tools in the Gradify app and choose Dictionaries and thesaurus.", "Pick a subject, or search for a term.", "Read the definition, and open its lesson for the full explanation."],
    good: ["Learning the vocabulary of a new subject", "Definition questions", "Essay writing, with the thesaurus"],
    links: [["terms/", "Key terms A to Z"], ["glossary/", "Study glossary"], ["guides/definitions-vs-explanations/", "Definitions vs explanations"]] },
  "key-terms-sheets": { title: "Printable Key Terms Sheets for Revision", tool: "sheets", src: "kit/tools/learn.js",
    answer: "Key-terms sheets give you a printable sheet of every key term in a lesson, with or without the definitions. Print the blank version to test yourself.",
    what: "Each sheet is made from the lesson's own key terms. Print it with definitions to revise from, or without them and write the definitions in from memory, then check against the full sheet.",
    steps: ["Open Tools in the Gradify app and choose Key-terms sheets.", "Pick the lesson.", "Print with or without definitions, or save as a PDF."],
    good: ["Definition-heavy subjects like biology, law and psychology", "Blurting practice on paper", "A quick check the night before"],
    links: [["notes-to-cheat-sheet/", "Notes to cheat sheet"], ["guides/blurting-method/", "The blurting method"], ["terms/", "Key terms A to Z"]] },
  "bonus-facts-and-boosting": { title: "Bonus Facts and Card Boosting in Revision", src: "kit/tools/practise.js",
    answer: "As you revise in the flashcard feed, bonus facts appear between your cards, and any card you miss can be boosted so you see it more often.",
    what: "Bonus facts are short, related facts that widen what you know about a topic without becoming another card to review. Boosting is your own control on top of spaced repetition: if a card keeps catching you out, boost it and the feed shows it more.",
    steps: ["Open the flashcard feed in the Gradify app.", "Scroll through your cards; read the bonus facts as they come up.", "Boost any card you want to see more."],
    good: ["Keeping a long revision session varied", "Cards you keep getting wrong", "Curious learners who like the extra detail"],
    links: [["glossary/spaced-repetition/", "Spaced repetition"], ["guides/how-to-make-good-flashcards/", "How to make good flashcards"]] },
  "notes-studio": { title: "Notes Studio: Study Packs Checked Against Your Notes", src: "kit/notes/studio.js",
    answer: "Notes Studio turns a PDF of your notes, or notes you paste in, into flashcards, a mind map and a cheat sheet. Every card links to the line in your notes it came from, and cards that don't fully match are marked to check.",
    what: "Upload a PDF with selectable text, a .txt or .md file, or paste your notes. Notes Studio works through them and makes a study pack you can revise straight away with spaced repetition. Because each card shows its source line, you can see why it says what it says and fix anything before you revise. You can try it with no account; your first pack is saved on your device.",
    steps: ["Open the Gradify app and choose New, or go straight to Notes Studio.", "Upload a PDF or paste one lecture or topic of notes.", "Check any cards marked to check, then start revising."],
    good: ["Turning a week of lectures into revision in minutes", "Students who don't trust AI-made cards: every card shows its source", "Revising from your own course's notes, not someone else's"],
    links: [["pdf-to-flashcards/", "PDF to flashcards"], ["lecture-notes-to-mind-map/", "Lecture notes to mind map"], ["notes-to-cheat-sheet/", "Notes to cheat sheet"]] },
  "notebook": { title: "Linked Notes App with Built-In Flashcards", src: "kit/tools/notebook.js",
    answer: "Gradify's Notebook keeps your notes as linked pages, like RemNote or Notion, and any line can become a flashcard. Every card you make there goes into one deck, scheduled with spaced repetition.",
    what: "Write [[Page name]] to link to another page, and every page lists the pages that link to it. Give pages a colour, an emoji or a template (lecture notes, Cornell notes, a revision checklist). Write a line as Front >> Back, Term :: Definition or with {{cloze}} gaps, or select a line and press Make a card. Notes are kept in your browser, and in your account when you sign in.",
    steps: ["Open Tools in the Gradify app and choose Notebook.", "Start a page, or use a template such as Cornell notes.", "Turn lines into cards as you write, then revise the My notebook deck."],
    good: ["Taking lecture notes you'll revise from later", "Linking ideas across modules", "Switching from RemNote, Notion or Obsidian"],
    links: [["glossary/cornell-notes/", "Cornell notes"], ["templates/cornell-notes/", "Cornell notes template"], ["guides/notion-study-template/", "A Notion study template"]] },
  "handwriting-to-text": { title: "Handwriting to Text: Free, On Your Device", tool: "handwriting", src: "kit/tools/handwriting.js",
    answer: "Handwriting to text turns writing on a phone or tablet, or a photo of a handwritten page, into searchable text. Recognition runs on your device, so nothing is sent to Gradify.",
    what: "Write with a finger, pen or stylus, or upload a photo. Where your browser has a built-in handwriting recogniser (Chrome on Android and ChromeOS) it reads your strokes; otherwise Gradify uses OCR on the picture. Keep the text in your Notebook or turn it into flashcards.",
    steps: ["Open Tools in the Gradify app and choose Handwriting to text.", "Write on the screen, or upload a photo of your page.", "Check the text, then save it to your Notebook or make cards from it."],
    good: ["Students who take notes by hand", "Making handwritten notes searchable", "Privacy: the recognition never leaves your device"],
    links: [["guides/goodnotes-notion-pdf-to-mind-map/", "GoodNotes and Notion PDFs to a mind map"]] },
  "notes-to-songs": { title: "Notes to Songs: The Notes Converter's Chant", owner: ["notes-to-study-chant/", "Notes to study chant"], tool: "convert", src: "kit/tools/convert.js",
    answer: "Paste notes in any format and Gradify turns them into a chant to say or sing along to, as well as flashcards, a mind map and a cheat sheet. It works in your browser with no AI, so everything stays in your own words.",
    what: "The notes converter picks out your facts and definitions and sets them as short, repeatable lines with a voice reading them. Rhythm and repetition make lists and definitions easier to recall, and because the chant is built from your notes, it matches what you'll be tested on.",
    steps: ["Open Tools in the Gradify app and choose Notes converter.", "Paste your notes.", "Pick Chant, press play, and say it along."],
    good: ["Lists, sequences and definitions", "Learners who remember lyrics easily", "Revising out loud"],
    links: [["notes-to-study-chant/", "Notes to study chant"], ["guides/study-myths/", "Study myths"]] },
  "youtube-to-notes": { title: "YouTube to Notes: Chapters and a Video Chat", owner: ["youtube-to-flashcards/", "YouTube to flashcards"], tool: "youtube", src: "kit/tools/youtube.js",
    answer: "Paste a YouTube link and Gradify makes notes in chapters, flashcards and a mind map from the video, plus a chat that answers only from what's said in it. You can paste the transcript instead.",
    what: "Gradify reads the video's captions, splits them into chapters and makes notes, cards and a map from them in your browser. The chat about the video answers only from the transcript, with the moment each point is made, so it never adds anything the video didn't say.",
    steps: ["Open Tools in the Gradify app and choose YouTube to notes.", "Paste the video link, or its transcript.", "Read the chapter notes, then revise the flashcards it made."],
    good: ["Lecture recordings and revision channels", "Long videos you need the key points from", "Turning watching into active recall"],
    links: [["youtube-to-flashcards/", "YouTube to flashcards"], ["guides/active-recall-vs-rereading/", "Active recall vs rereading"]] },
  "spidermaps": { title: "Spidermaps: Mind Maps Built from Any Lesson", tool: "map", src: "kit/tools/mapmaker.js",
    answer: "Gradify's mind map creator builds a spidermap from facts you pick from any lesson, which you can then move, rename and add your own ideas to. Maps are kept with your flashcards in your account.",
    what: "Search every lesson on Gradify, toggle on the facts you want, and they become branches of your map. Then edit freely: drag, rename, add ideas of your own. You can also make a map straight from your notes with Notes Studio or the notes converter.",
    steps: ["Open Tools in the Gradify app and choose Mind map creator.", "Search for a lesson and toggle on the facts you want.", "Arrange and edit the map, then revise from it."],
    good: ["Seeing how a topic fits together", "Planning essays", "Revising connections between ideas, not just facts"],
    links: [["lecture-notes-to-mind-map/", "Lecture notes to mind map"], ["topics/", "Topic pages with mind maps"]] },
  "downloadable-resources": { title: "Free Downloadable Revision Resources", src: "kit/tools/learn.js",
    answer: "Every lesson's resources can be downloaded and printed: notes, key-terms sheets, questions, posters, and flashcards ready to import into Anki.",
    what: "Pick a lesson and download what you need, in the format you need it. Flashcards export for Anki, so you can keep revising in another app if you prefer. Nothing is locked behind a download wall.",
    steps: ["Open Tools in the Gradify app and choose Downloadable resources.", "Pick the lesson.", "Download notes, sheets, questions, posters or Anki cards."],
    good: ["Revising on paper", "Moving cards into Anki", "Teachers preparing a lesson"],
    links: [["templates/", "Printable templates"], ["guides/export-quizlet-sets/", "Export your Quizlet sets"]] },
  "flashcard-feed": { title: "Flashcard Feed: Scroll Your Revision", tool: null, src: "kit/tools/practise.js",
    answer: "The flashcard feed is an endless scroll of flashcards from your decks and the subjects you choose, with bonus facts and study hacks mixed in. Zoom out to see every card as a board.",
    what: "It turns the habit of scrolling into revision: each card asks you to recall before you reveal. Boost a card to see it more. The board view lays every card out at once, so you can spot the ones you haven't seen in a while.",
    steps: ["Open the flashcard feed in the Gradify app.", "Choose your decks and subjects.", "Scroll: recall each answer before you reveal it."],
    good: ["Five spare minutes", "Replacing social media scrolling with revision", "Mixing subjects (interleaving)"],
    links: [["glossary/interleaving/", "Interleaving"], ["guides/how-to-make-good-flashcards/", "How to make good flashcards"]] },
  "confidence-ratings": { title: "Flashcards with Confidence Ratings (FSRS)", src: "kit/learning/srs.js",
    answer: "After each flashcard you rate how well you knew it, and Gradify's spaced repetition (FSRS) brings the card back just before you'd forget it, paced to your exam date.",
    what: "Your rating changes when a card comes back: one you knew easily waits longer, one you struggled with returns soon. Gradify uses FSRS, a modern spaced repetition scheduler, and paces reviews so you've seen everything in time for your exam.",
    steps: ["Revise a deck in the Gradify app.", "Answer from memory, then reveal.", "Rate how well you knew it; Gradify schedules the next review."],
    good: ["Long courses with a lot to remember", "Not wasting time on cards you already know", "Steady revision up to an exam date"],
    links: [["glossary/fsrs/", "FSRS"], ["tools/spaced-repetition-schedule/", "Spaced repetition schedule"], ["glossary/forgetting-curve/", "The forgetting curve"]] },
  "adaptive-difficulty": { title: "Adaptive Revision Quizzes That Adjust", tool: "quiz", plus: true, src: "kit/tools/practise.js",
    answer: "Adaptive quizzes get harder or easier as you answer: two right in a row and the questions step up, one wrong and they step down. It's part of Gradify Pro.",
    what: "Questions in Gradify come at three levels, from foundation recall to reasoning. Adaptive mode moves between them as you go, so you spend your time at the edge of what you know instead of on questions that are too easy or too hard.",
    steps: ["Open Quizzes in the Gradify app and choose Adaptive.", "Pick a lesson, a unit or your own deck.", "Answer: the level follows how you're doing."],
    good: ["Finding the level you're really at", "Stretching yourself before an exam", "Mixed-ability study groups"],
    links: [["glossary/desirable-difficulties/", "Desirable difficulties"], ["questions/", "Practice questions by subject"]] },
  "timed-quiz-mode": { title: "Timed Revision Quizzes Like the Real Exam", tool: "quiz", plus: true, src: "kit/tools/practise.js",
    answer: "Timed quiz mode gives you a quiz from any lesson, unit or deck with a fixed time to answer, so you practise against the clock like the real exam. It's part of Gradify Pro.",
    what: "Knowing an answer and producing it under time pressure are different skills. Timed mode builds a quiz from any lesson, unit or deck and gives you a fixed time, so you practise pacing as well as recall.",
    steps: ["Open Quizzes in the Gradify app and choose Timed.", "Pick what to be tested on.", "Answer before the time runs out, then review what you missed."],
    good: ["Running out of time in exams", "The last weeks before an exam", "Building calm under pressure"],
    links: [["guides/exam-technique/", "Exam technique"], ["guides/mcq-traps/", "Multiple-choice traps"], ["tools/exam-countdown/", "Exam countdown"]] },
  "question-bank": { title: "Revision Question Bank with Feedback", tool: "quiz", plus: true, src: "kit/tools/practise.js",
    answer: "The question bank puts every practice question on Gradify in one place, with marked feedback on every answer. It's part of Gradify Pro.",
    what: "Filter by subject and topic and work through questions with an explanation for each answer, including why the wrong options are wrong. A sample of each course's questions is free on its practice questions page.",
    steps: ["Open Quizzes in the Gradify app and choose Question bank.", "Filter by subject and topic.", "Answer, then read the feedback on each question."],
    good: ["Lots of practice on one topic", "Finding out why you got something wrong", "Final revision across a whole course"],
    links: [["questions/", "Free practice questions"], ["exam-traps/", "Exam traps by subject"], ["guides/question-stems/", "Question stems"]] },
  "key-term-games": { title: "Key Term Revision Games: Match & Speed", tool: "games", src: "kit/tools/practise.js",
    answer: "Key-term games turn the vocabulary of any lesson, unit or your own flashcard deck into three quick games: Match, Speed round and Missing letters.",
    what: "Each game uses the key terms and definitions from a lesson, unit or your own deck. They're short, so they suit a break or the start of a session, and they make you recall terms rather than just recognise them.",
    steps: ["Open Tools in the Gradify app and choose Key-term games.", "Pick a lesson, unit or deck.", "Play Match, Speed round or Missing letters."],
    good: ["Learning new vocabulary", "Younger learners", "A warm-up before harder questions"],
    links: [["terms/", "Key terms A to Z"], ["glossary/retrieval-practice/", "Retrieval practice"]] },
  "interim-quizzes": { title: "Unit Quizzes Through Every Free Course", src: "kit/course/course.js",
    answer: "Every Gradify course has short quizzes along the way, at the end of each unit, so you know where you stand before you move on.",
    what: "Unit quizzes draw on everything the unit taught. Passing one earns XP once, and your results feed the mastery view that shows which topics are secure and which are fading.",
    steps: ["Work through a unit's lessons in any course.", "Take the unit quiz at the end.", "Go back to the lessons behind any questions you missed."],
    good: ["Checking understanding before moving on", "Spotting weak topics early", "Building up to the course exam"],
    links: [["topics/", "Revision topics by subject"], ["questions/", "Practice questions"]] },
  "gradify-tree": { title: "Gradify Tree: See Your Learning Grow", src: "kit/lifeos/tree.js",
    answer: "The Gradify Tree grows as you learn, with a branch for every subject you study, so you can see your progress at a glance.",
    what: "Every lesson, quiz and revision session feeds the tree. Subjects you're working on grow their branches; it's a picture of everything you've learned across every Gradify site, in one place.",
    steps: ["Learn on any Gradify site.", "Open Progress in the Gradify app.", "Watch each subject's branch grow."],
    good: ["Motivation on long courses", "Seeing balance across subjects", "Younger learners"],
    links: [["juniorgradify/", "JuniorGradify"], ["guides/study-methods/", "Study methods"]] },
  "heatmap": { title: "Study Heatmap: Every Day of Learning", src: "kit/app/main.js",
    answer: "The heatmap shows every day you've learned across every Gradify site, in one calendar grid, so gaps and streaks are easy to see.",
    what: "Each square is a day, shaded by how much you did. It counts everything: lessons, flashcards and quizzes on any Gradify site, under one account.",
    steps: ["Learn on any Gradify site.", "Open Progress in the Gradify app.", "Look for gaps, and plan to fill them."],
    good: ["Building a daily habit", "Seeing whether revision is really spread out", "Accountability"],
    links: [["glossary/spacing-effect/", "The spacing effect"], ["tools/study-hours-calculator/", "Study hours calculator"]] },
  "xp-and-levels": { title: "Earn XP and Level Up as You Learn", src: "kit/game/engine.js",
    answer: "You earn XP for what you learn on Gradify and level up as it adds up. Questions pay XP only when you solve them first time, lessons pay once and quizzes once per pass.",
    what: "XP is counted from each course's own record, so it can't be paid twice for the same thing. Beside the XP badges sit understanding badges, earned only from measured mastery in your answers, never from time spent, so the game rewards understanding as well as effort.",
    steps: ["Learn and answer questions on any Gradify site.", "See your XP and level in Progress.", "Aim for the understanding badges, not just XP."],
    good: ["Motivation", "Friendly competition with friends", "Seeing effort add up"],
    links: [["guides/study-myths/", "Study myths"]] },
  "streaks": { title: "Study Streaks That Build a Daily Habit", src: "kit/game/engine.js",
    answer: "Gradify counts two kinds of streak: a daily streak for every day in a row you learn something, and a streak of correct answers in a row.",
    what: "A daily streak is the simplest way to keep revision spread out instead of crammed. Streaks count across every Gradify site, so learning anywhere keeps it going.",
    steps: ["Learn something on any Gradify site today.", "Come back tomorrow.", "See your streak in Progress and on the heatmap."],
    good: ["Building a habit", "Spreading revision out", "Accountability with friends"],
    links: [["glossary/spacing-effect/", "The spacing effect"], ["guides/how-to-revise-in-two-weeks/", "How to revise in two weeks"]] },
  "challenges": { title: "Daily and Weekly Study Challenges", src: "kit/game/engine.js",
    answer: "Gradify sets daily and weekly challenges across your sites, such as a number of questions or lessons, for XP and rewards.",
    what: "Challenges give each day a small, clear goal. Rewards are kept in their own ledger, so a reload or a second tab can never pay the same reward twice.",
    steps: ["Open Progress in the Gradify app.", "Pick up today's and this week's challenges.", "Complete them for XP."],
    good: ["Days when you don't know where to start", "Keeping momentum", "Study groups"],
    links: [["tools/topic-prioritiser/", "Topic prioritiser"]] },
  "reward-scheme": { title: "Study Rewards for Learning Milestones", src: "kit/game/engine.js",
    answer: "Gradify rewards long-term milestones, such as answering 1,000 questions or keeping a 100-day streak, and each one is earned once and kept.",
    what: "Milestones mark long-term effort: the points where a habit has become real. Alongside them, understanding badges are earned only from measured mastery, so rewards reflect what you've learned, not just time spent.",
    steps: ["Learn on any Gradify site.", "Open Progress to see the next milestone.", "Keep going: milestones are earned once and kept."],
    good: ["Long courses", "Motivation over months, not days"],
    links: [["guides/freshers-study-system/", "A study system for your first year"]] },
  "projects-for-xp": { title: "Real Student Projects for XP and a Portfolio", src: "kit/tools/projects.js",
    answer: "Projects for XP are real projects to complete step by step, such as teaching a topic in a 3-minute video. Finishing one pays XP and adds it to a portfolio you can print or save as a PDF.",
    what: "Each project has a brief, steps to tick off and a place for your evidence: a link or a write-up. The portfolio is something to show a teacher, a university or an employer.",
    steps: ["Open Tools in the Gradify app and choose Projects for XP.", "Pick a project and read the brief.", "Tick off the steps, add your evidence and finish it."],
    good: ["Personal statements and CVs", "Applying what you've learned", "Students who learn by making"],
    links: [["internshipgradify/", "InternshipGradify"], ["creategradify/briefs/", "Free design briefs"]] },
  "smart-reminders": { title: "Smart Study Reminders for Your Deadlines", plus: true, src: "kit/lifeos/",
    answer: "Smart reminders know your deadlines and your streak, and remind you when it's time to revise. They're part of Gradify Pro.",
    what: "Reminders are worked out from what's due: cards ready for review, a deadline coming up, a streak about to end. They work while Gradify is open; reminders when it's closed (push notifications) are being switched on separately.",
    steps: ["Add your exam dates and deadlines in the Gradify app.", "Turn on reminders in Account.", "Revise when Gradify says something's due."],
    good: ["Busy weeks", "Keeping a streak going", "Not missing a deadline"],
    links: [["tools/deadline-planner/", "Deadline planner"], ["tools/exam-countdown/", "Exam countdown"]] },
  "time-blocking": { title: "Revision Planner with Time Blocking", src: "kit/lifeos/calendar.js",
    answer: "Plan your week in time blocks on a calendar, and let Gradify auto-plan your revision into your free time from your goals, fading topics and deadlines.",
    what: "Drag to create a block, drag to move it, drag its edge to resize. Auto-plan fills free time with study blocks, putting topics you're forgetting and close deadlines first.",
    steps: ["Open Plan in the Gradify app.", "Block out lectures, work and other commitments.", "Press Auto-plan my week, then adjust what it suggests."],
    good: ["Exam season", "Balancing study with work", "Students who over-plan and under-do"],
    links: [["templates/revision-timetable/", "Revision timetable template"], ["tools/cram-planner/", "Cram planner"], ["tools/exam-timetable-planner/", "Exam timetable planner"]] },
  "gradify-ai": { title: "Gradify AI: A Study Assistant (Coming Soon)", plan: "pro", src: "kit/lifeos/assistant.js",
    answer: "Gradify AI will be an AI chat in the corner of every page that knows your progress on every Gradify site. It's part of Gradify Ultra, which isn't on sale yet.",
    what: "Until Gradify AI is switched on, Notes Studio, the notes converter and YouTube to notes all work without it: they make flashcards, maps and notes in your browser, from your own words. When it arrives, the privacy page explains what is sent to Anthropic's Claude API and why.",
    steps: ["Use Notes Studio for flashcards from your notes today.", "Read how Gradify uses AI on the AI usage page.", "Gradify AI will appear in the app when Ultra is available."],
    good: ["Asking follow-up questions about a topic", "Help planning what to revise next"],
    links: [["ai-usage.html", "How Gradify uses AI"], ["pricing.html", "Plans and pricing"]] },
  "tutors": { title: "Find a Student Tutor for Any Subject", src: "kit/app/community.js",
    answer: "In Gradify's community, learners offer to tutor in subjects they know well, and you can ask one for help inside Gradify.",
    what: "Tutors list the subjects they can help with. Requests stay inside Gradify, and safety rules are enforced by the database: no links, email addresses or phone numbers in messages, a limit on how fast messages can be sent, and reported messages are hidden. You need a free account and a community profile, and to be 13 or over.",
    steps: ["Make a free account and a community profile.", "Open Community in the Gradify app and choose Tutors.", "Find someone for your subject and ask for help."],
    good: ["A topic you're stuck on", "Explaining something you know well (tutoring is revision too)"],
    links: [["guides/study-methods/", "Study methods compared"], ["glossary/feynman-technique/", "The Feynman technique"]] },
  "student-mentors": { title: "Student Mentors: Advice from Students Ahead", src: "kit/app/community.js",
    answer: "Student mentors are students a year or two ahead of you who offer advice, on subjects, applications and what comes next, inside Gradify.",
    what: "Mentors work the same way as tutors: they say what they can help with and you ask inside Gradify, under the same safety rules (no contact details in messages, reporting, blocking). You need a free account and a community profile, and to be 13 or over.",
    steps: ["Make a free account and a community profile.", "Open Community in the Gradify app and choose Student mentors.", "Ask a mentor about the step you're facing next."],
    good: ["Choosing A levels or a degree", "Starting university", "Applications and personal statements"],
    links: [["guides/freshers-study-system/", "A study system for your first year"], ["undergradify/", "UnderGradify"]] },
  "study-groups": { title: "Online Study Groups with Shared Quizzes", src: "kit/app/community.js",
    answer: "Gradify study groups are private groups with a join code, a chat, members and a weekly leaderboard, for revising together online.",
    what: "Make a group, share its code with your friends or your class, and revise together: chat, compare progress on the weekly leaderboard and keep each other going. Messages follow the community safety rules.",
    steps: ["Make a free account and a community profile.", "Open Community, choose Study groups and create one.", "Share the join code with your group."],
    good: ["Revising with friends", "Course reps and societies", "Accountability"],
    links: [["tools/focus-room/", "Shared focus room"], ["tools/group-project-planner/", "Group project planner"]] },
  "friends-and-school-leaderboards": { title: "Study Leaderboards for Friends and Schools", src: "kit/app/community.js",
    answer: "Follow your friends with their friend code and compare progress on friends' and school leaderboards in Gradify. Taking part in leaderboards is always optional.",
    what: "Leaderboards add friendly competition for those who want it, and stay out of the way for those who don't: you choose whether to appear. You need a free account and a community profile, and to be 13 or over, and the community safety rules apply.",
    steps: ["Make a free account and a community profile.", "Open Community and choose Friends and leaderboards.", "Add friends by their friend code."],
    good: ["Friendly competition", "Class challenges"],
    links: [["youthgradify/", "YouthGradify"]] },
  "community-chats": { title: "Subject Chats for Students", src: "kit/app/community.js",
    answer: "Gradify has a chat for every subject and site, where learners can ask and answer each other's questions about what they're studying.",
    what: "Chats are moderated by rules the database enforces: no links, email addresses or phone numbers, at most 8 messages a minute, and a message reported by three people is hidden for everyone. You need a free account and a community profile, and to be 13 or over.",
    steps: ["Make a free account and a community profile.", "Open Community and choose Subject chats.", "Join the chat for your subject."],
    good: ["A quick question about a topic", "Meeting people studying the same thing"],
    links: [["guides/study-methods/", "Study methods compared"]] },
  "internshipgradify": { title: "Find Internships and Work Experience", src: "kit/app/community.js",
    answer: "InternshipGradify lists well-known internship, placement and work experience schemes in the UK, matched to the subjects you study. You don't need an account to see them.",
    what: "Each opportunity links to the official place to apply, from virtual work experience for 14 to 18 year olds and NHS work experience to apprenticeships, the Civil Service Fast Stream and STEM placements. Gradify matches them to your subjects; it doesn't run the schemes.",
    steps: ["Open InternshipGradify, or Community and then InternshipGradify in the app.", "See schemes matched to your subjects.", "Apply through each scheme's official site."],
    good: ["Personal statements", "Year 12 and university students looking for experience", "Career changers"],
    links: [["internshipgradify/", "InternshipGradify"], ["internshipgradify/course/", "Careers and employability course"]] },
};

// is it usable now? plan "pro" is Gradify Ultra: usable only once Ultra is on sale
const usable = (f) => f.plan !== "pro" || PRO_ON_SALE;
const WHERE = { web: "on the website", app: "in the Gradify app", both: "on the website and in the app" };

/** what a learner gets free, and what needs a plan, worked out from the plan and limits files */
export function availability(f, p) {
  if (!usable(f)) return "Part of Gradify Ultra, which isn't on sale yet. Nothing to pay and nothing to sign up for until it is.";
  if (f.plan === "plus") return PLUS_ON_SALE ? `Part of ${PRO}. Everything else on this page links to free tools you can use now.` : "Free while Gradify Pro isn't on sale.";
  const tool = p.tool && LIMITED[p.tool];
  if (tool && PLUS_ON_SALE) return `Free: use it ${FREE.tool} times on the free plan, then ${PRO} for unlimited use. No card needed to start.`;
  if (f.n === "Notes Studio" && PLUS_ON_SALE) return `Free, with no account needed to try it: ${FREE.flashcards} flashcard sets and ${FREE.map} mind maps on the free plan, then ${PRO} for unlimited.`;
  if (f.n === "Online courses" && PLUS_ON_SALE) return `Free: open ${FREE.lesson} lessons in each course you start on the free plan, then ${PRO} for every lesson.`;
  return "Free.";
}
export const pageTitle = (p) => `${p.title} | Gradify`;
const firstSentence = (t) => t.split(/(?<=\.) /)[0].replace(/\.$/, "");

/** every feature page, and the /features/ hub */
export function featurePages() {
  const out = [], bySlug = new Map(FEATURES.map((f) => [featureSlug(f), f]));
  for (const [slug, f] of bySlug) {
    const p = FEATURE_PAGES[slug]; if (!p) continue;
    const cat = CATS[f.cat], live = usable(f), owned = Boolean(p.owner), href = f.href?.startsWith("#") ? "/" : `/${f.href}`;
    const siblings = FEATURES.filter((x) => x.cat === f.cat && x !== f && FEATURE_PAGES[featureSlug(x)]).slice(0, 6).map((x) => [`features/${featureSlug(x)}/`, x.n, firstSentence(FEATURE_PAGES[featureSlug(x)].answer)]);
    const q = faq([[`Is ${f.n} free?`, availability(f, p)], [`Where can I use ${f.n}?`, `${f.n} works ${WHERE[f.where]}. One Gradify account works on every Gradify site.`]], "Questions");
    const body = `<h1>${esc(f.n)}</h1>
    <p class="answer">${esc(p.answer)}</p>
    ${live ? "" : `<p class="note"><b>Coming soon.</b> ${esc(availability(f, p))}</p>`}
    ${owned ? `<p class="note">The full guide, with examples: <a href="/${esc(p.owner[0])}">${esc(p.owner[1])}</a>.</p>` : ""}
    <p class="core-rule"><b>${esc(cat.name)}</b> · Works ${esc(WHERE[f.where])} · ${esc(firstSentence(availability(f, p)))}.</p>
    ${live ? `<p class="row-actions"><a class="btn btn-primary lg" href="${esc(href)}" data-cta="feature"><span>Open ${esc(f.n)}</span> <span aria-hidden="true">→</span></a></p>` : ""}
    <h2>What it does</h2>
    <p>${esc(p.what)}</p>
    <h2>How to use it</h2>
    <ol>${p.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    <h2>Best for</h2>
    <ul>${p.good.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
    ${q.html}
    ${p.links?.length ? related("Free pages on the same job", p.links) : ""}
    ${siblings.length ? related(`More ${cat.name.toLowerCase()} features`, siblings) : ""}
    <p><a href="/features/">Every Gradify feature</a></p>`;
    out.push({
      path: `features/${slug}/index.html`, title: pageTitle(p), description: `${firstSentence(p.answer)}. ${firstSentence(availability(f, p))}.`,
      crumbs: [["Features", "features/"], [f.n, `features/${slug}/`]], ogType: "website", noindex: !live || owned, body,
      schema: [q.schema, { "@type": "WebPage", name: f.n, url: `${ORIGIN}/features/${slug}/`, about: { "@type": "SoftwareApplication", name: `Gradify: ${f.n}`, applicationCategory: "EducationalApplication", operatingSystem: "Web", ...(live && !f.plan ? { offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" } } : {}) }, isPartOf: { "@id": `${ORIGIN}/#site` } }],
    });
  }
  const groups = Object.entries(CATS).map(([k, c]) => [c.name, FEATURES.filter((f) => f.cat === k && FEATURE_PAGES[featureSlug(f)])]);
  out.push({
    path: "features/index.html", title: `Every Gradify Feature: ${FEATURES.filter(usable).length} Study Tools | Gradify`,
    description: "Every Gradify feature on one page: courses, Notes Studio, flashcards with spaced repetition, quizzes, mind maps, planning, progress and community.",
    crumbs: [["Features", "features/"]], ogType: "website",
    body: `<h1>Every Gradify feature</h1>
    <p class="answer">Gradify is one account across ${SITES.filter((s) => s.built && ["live", "beta"].includes(s.status)).length} learning sites, and these are the features that work on all of them. Most are free; the few that need Gradify Pro say so.</p>
    ${groups.map(([name, list]) => `<h2>${esc(name)}</h2><ul class="hub-list">${list.map((f) => `<li><a href="/features/${featureSlug(f)}/">${esc(f.n)}</a> <span>${esc(firstSentence(FEATURE_PAGES[featureSlug(f)].answer))}.${f.plan === "plus" ? " (Gradify Pro)" : usable(f) ? "" : " (coming soon)"}</span></li>`).join("")}</ul>`).join("")}
    ${related("Free without signing up", [["tools/", "Free study tools"], ["guides/", "Study guides"], ["topics/", "Revision topics"], ["pricing.html", "Plans and pricing"]])}`,
    schema: [{ "@type": "CollectionPage", name: "Every Gradify feature", url: `${ORIGIN}/features/`, hasPart: FEATURES.filter((f) => FEATURE_PAGES[featureSlug(f)]).map((f) => ({ "@type": "WebPage", name: f.n, url: `${ORIGIN}/features/${featureSlug(f)}/` })) }],
  });
  return out;
}
