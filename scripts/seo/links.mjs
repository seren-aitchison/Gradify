// How the free pages lead into each other: the tools a guide needs at each step, the pitfalls worth a callout, how to
// read each tool's result and when to pick it over its neighbour, the series a page belongs to (with previous and next),
// and the study stages that group tools, guides and checklists by situation ("the exam is next week").
import { esc } from "./shell.mjs";

// [href, label] for every page these blocks point at (checked by tests/seo.test.mjs: every link resolves)
const L = {
  "cram-planner": ["tools/cram-planner/", "Cram planner"], "deadline-planner": ["tools/deadline-planner/", "Deadline planner"], "exam-timetable-planner": ["tools/exam-timetable-planner/", "Exam timetable planner"],
  "study-hours-calculator": ["tools/study-hours-calculator/", "Study hours calculator"], "reading-time-calculator": ["tools/reading-time-calculator/", "Reading time calculator"], "topic-prioritiser": ["tools/topic-prioritiser/", "Topic prioritiser"],
  "winter-revision-planner": ["tools/winter-revision-planner/", "Winter break planner"], "dissertation-word-count": ["tools/dissertation-word-count/", "Dissertation word splitter"], "module-grade-calculator": ["tools/module-grade-calculator/", "Module grade calculator"],
  "grade-boundaries": ["tools/grade-boundaries/", "Grade boundary checker"], "unit-converter": ["tools/unit-converter/", "Unit converter"], "study-timer": ["tools/study-timer/", "Study timer"], "focus-room": ["tools/focus-room/", "Shared focus room"],
  "calm-reset": ["tools/calm-reset/", "Calm reset"], "mistake-log": ["tools/mistake-log/", "Mistake log"], "syllabus-checker": ["tools/syllabus-checker/", "Syllabus checker"], "mark-scheme-checker": ["tools/mark-scheme-checker/", "Mark scheme checker"],
  "citation-helper": ["tools/citation-helper/", "Citation helper"], "essay-outline-helper": ["tools/essay-outline-helper/", "Essay outline helper"], "seminar-prep-helper": ["tools/seminar-prep-helper/", "Seminar prep"], "presentation-prep-helper": ["tools/presentation-prep-helper/", "Presentation planner"],
  "viva-prep-helper": ["tools/viva-prep-helper/", "Viva prep"], "research-question-helper": ["tools/research-question-helper/", "Research question helper"], "lit-review-helper": ["tools/lit-review-helper/", "Literature review helper"],
  "group-project-planner": ["tools/group-project-planner/", "Group project planner"], "question-deconstructor": ["tools/question-deconstructor/", "Question deconstructor"], "degree-classification-calculator": ["tools/degree-classification-calculator/", "Degree classification calculator"],
  "final-grade-calculator": ["tools/final-grade-calculator/", "Final grade calculator"], "weighted-grade-calculator": ["tools/weighted-grade-calculator/", "Weighted grade calculator"], "gpa-calculator": ["tools/gpa-calculator/", "GPA calculator"],
  "exam-countdown": ["tools/exam-countdown/", "Exam countdown"], "spaced-repetition-schedule": ["tools/spaced-repetition-schedule/", "Spaced repetition schedule"],
  "c:lab-report": ["checklists/lab-report/", "Lab report checklist"], "c:semester-reset": ["checklists/semester-reset/", "Semester reset checklist"], "c:exam-day": ["checklists/exam-day/", "Exam day checklist"], "c:proofreading": ["checklists/proofreading/", "Proofreading checklist"],
  "c:peer-review": ["checklists/peer-review/", "Peer review checklist"], "c:stem-practical": ["checklists/stem-practical/", "STEM practical checklist"], "c:coursework-submission": ["checklists/coursework-submission/", "Coursework submission checklist"],
  "c:final-48-hours": ["checklists/final-48-hours/", "Final 48 hours checklist"], "c:critical-analysis": ["checklists/critical-analysis/", "Critical analysis checklist"],
  "g:active-recall": ["guides/active-recall/", "Active recall guide"], "g:command-words": ["guides/command-words/", "Command words"], "g:exam-technique": ["guides/exam-technique/", "Exam technique"], "g:long-answer-questions": ["guides/long-answer-questions/", "6- and 8-mark answers"],
  "g:mcq-traps": ["guides/mcq-traps/", "Multiple-choice traps"], "g:graph-reading": ["guides/graph-reading/", "Reading graphs"], "g:variables-and-controls": ["guides/variables-and-controls/", "Variables and controls"], "g:unit-conversion": ["guides/unit-conversion/", "Unit conversion traps"],
  "g:study-methods": ["guides/study-methods/", "Study methods compared"], "g:exam-resit-recovery": ["guides/exam-resit-recovery/", "Resit recovery plan"], "g:resits-and-compensation": ["guides/resits-and-compensation/", "Resits and compensation"],
  "g:how-to-revise-in-two-weeks": ["guides/how-to-revise-in-two-weeks/", "How to revise in two weeks"], "g:blurting-method": ["guides/blurting-method/", "The blurting method"], "g:definitions-vs-explanations": ["guides/definitions-vs-explanations/", "Definitions vs explanations"],
  "g:how-to-make-good-flashcards": ["guides/how-to-make-good-flashcards/", "Making good flashcards"], "g:open-book-exams": ["guides/open-book-exams/", "Open-book exams"], "g:study-myths": ["guides/study-myths/", "Study myths"],
  "v:active-recall-vs-spaced-repetition": ["vs/active-recall-vs-spaced-repetition/", "Active recall vs spaced repetition"], "v:blurting-vs-flashcards": ["vs/blurting-vs-flashcards/", "Blurting vs flashcards"], "v:pomodoro-vs-time-blocking": ["vs/pomodoro-vs-time-blocking/", "Pomodoro vs time-blocking"],
  "v:accuracy-vs-precision": ["vs/accuracy-vs-precision/", "Accuracy vs precision"], "v:validity-vs-reliability": ["vs/validity-vs-reliability/", "Validity vs reliability"], "v:essay-outline-vs-mind-map": ["vs/essay-outline-vs-mind-map/", "Essay outline vs mind map"],
  "v:correlation-vs-causation": ["vs/correlation-vs-causation/", "Correlation vs causation"],
};
export const LINKS = L;
const a = (k) => `<a href="/${L[k][0]}">${esc(L[k][1])}</a>`;

// ---------- tool pages: how to read the result, which tool when, and the traps to watch ----------
// read: three steps; decide: "use this when…, use that when…"; traps: a guide or checklist about the mistakes it guards against
export const TOOL_EXTRA = {
  "degree-classification-calculator": { read: ["The big number is your weighted degree average; the line under it is the class it falls in.", "Check the year averages: the final year usually matters more, so that's where extra marks count most.", "If it says borderline, look up your university's rule (often preponderance) before assuming the lower class."], decide: ["module-grade-calculator", "Use this for your whole degree; use the module grade calculator for one module's exam."], traps: "g:resits-and-compensation" },
  "final-grade-calculator": { read: ["The number is the exam mark you need for your target overall grade.", "Over 100% means the target can't be reached through the final alone.", "Under 0% means you've already reached it: protect it with spaced review."], decide: ["module-grade-calculator", "Use this with one current grade; use the module grade calculator when you have several marked assessments."], traps: "g:exam-technique" },
  "weighted-grade-calculator": { read: ["The average is over the weight you've entered so far, not the whole module.", "\"Banked\" is how many of the 100 marks you've already secured.", "Whatever weight is left is still to play for."], decide: ["final-grade-calculator", "Use this to see where you stand; use the final grade calculator to see what you need next."], traps: "g:exam-technique" },
  "gpa-calculator": { read: ["The result is your GPA on a 4.0 scale, weighted by credit hours.", "A heavy course moves it more than a light one.", "Check your college's scale: some give an A+ 4.3."], decide: ["degree-classification-calculator", "Use this for US-style letter grades; use the degree classification calculator for UK percentages."], traps: "g:exam-technique" },
  "exam-countdown": { read: ["Days to go counts calendar days; study days take off your rest days.", "Revision hours is study days × hours a day: your real budget.", "Divide the hours by topics and keep the last week for past papers."], decide: ["cram-planner", "Use this with weeks to go; use the cram planner in the last two or three days."], traps: "g:how-to-revise-in-two-weeks" },
  "spaced-repetition-schedule": { read: ["Each date is a review: test yourself first, then check.", "The gaps grow because each successful review slows forgetting.", "The day before the exam is added as a final light review."], decide: ["exam-countdown", "Use this per topic; use the exam countdown for the whole exam."], traps: "g:active-recall" },
  "cram-planner": { read: ["Study hours are what's left after sleep and breaks.", "Spend them in the order shown: high-yield concepts, past-paper gaps, rapid recall, light review.", "Core time per topic tells you when to move on."], decide: ["deadline-planner", "Use this when an exam is 1 to 3 days away; use the deadline planner for coursework due in weeks."], traps: "c:final-48-hours" },
  "deadline-planner": { read: ["Hours a working day is your daily target.", "Each milestone has a date: if you miss one, the next shrinks.", "The last two days are buffer: formatting, proof-reading and references."], decide: ["cram-planner", "Use this for coursework due in weeks; use the cram planner for an exam in days."], traps: "c:coursework-submission" },
  "exam-timetable-planner": { read: ["\"Start with\" is the order the exams get their main revision days.", "Each day lists one main exam; keep 15 minutes of flashcards for the others.", "A heavy exam that's close gets days first."], decide: ["topic-prioritiser", "Use this to order exams; use the topic prioritiser to order topics within one exam."], traps: "g:how-to-revise-in-two-weeks" },
  "study-hours-calculator": { read: ["Total hours is your revision budget for the module.", "Hours a week is that budget spread to the exam.", "Lower confidence means more hours per lecture hour."], decide: ["exam-countdown", "Use this to size the job; use the exam countdown to see the hours you actually have."], traps: "g:study-myths" },
  "reading-time-calculator": { read: ["Reading time is at a typical speed for that kind of text.", "Notes and reviews are added on top: that's the real cost.", "Over two hours? Turn it into a study pack once you've read it."], decide: ["deadline-planner", "Use this per reading; use the deadline planner for the whole assignment."], traps: "g:active-recall" },
  "topic-prioritiser": { read: ["Group 1 is worth the most and you know it least: start there.", "Group 2 builds confidence next.", "Group 3 only needs a quick polish."], decide: ["exam-timetable-planner", "Use this within one exam; use the exam timetable planner across several."], traps: "g:study-myths" },
  "winter-revision-planner": { read: ["Rest days come first, on purpose.", "Light days are 20 minutes of flashcards so nothing fades.", "Focus days are the final stretch: two blocks plus past questions."], decide: ["exam-timetable-planner", "Use this for one break; use the exam timetable planner to split focus days between exams."], traps: "g:exam-resit-recovery" },
  "dissertation-word-count": { read: ["Each chapter gets a share of the total, rounded to 50 words.", "Words a writing day keeps you a week ahead for editing.", "Check your handbook: some departments set their own split."], decide: ["essay-outline-helper", "Use this for a dissertation's chapters; use the essay outline helper for a single essay."], traps: "c:proofreading" },
  "module-grade-calculator": { read: ["The big number is the exam mark you need for your target.", "\"Safe\" is 3 marks higher, as a buffer.", "Over 100% means the target isn't reachable this time."], decide: ["degree-classification-calculator", "Use this for one module; use the degree classification calculator for the whole degree."], traps: "g:resits-and-compensation" },
  "grade-boundaries": { read: ["The grade comes from the boundaries you pasted for that exact paper.", "\"Marks off\" is the gap to the next grade up.", "A few marks is often one question: log what you dropped."], decide: ["mistake-log", "Use this to see where a paper puts you; use the mistake log to see why you dropped marks."], traps: "g:exam-technique" },
  "unit-converter": { read: ["The result is the value in the new unit.", "The factor is what you multiply by.", "Smaller unit, bigger number: if not, something's wrong."], decide: ["question-deconstructor", "Use this for the units; use the question deconstructor to plan the whole calculation question."], traps: "g:unit-conversion" },
  "study-timer": { read: ["The big clock is the time left in this block; the tab title shows it too.", "Breaks come with ideas that aren't your phone.", "After each block, log one thing that clicked and one to revisit."], decide: ["focus-room", "Use this alone; use the shared focus room to study on the same clock as friends."], traps: "v:pomodoro-vs-time-blocking" },
  "focus-room": { read: ["Everyone with the link sees the same clock.", "Blocks start on the hour (UTC); breaks run from 50 past.", "Set today's goal so the group knows what you're on."], decide: ["study-timer", "Use this with friends; use the study timer for custom lengths on your own."], traps: "v:pomodoro-vs-time-blocking" },
  "calm-reset": { read: ["Follow the circle: in 4, hold 4, out 6.", "After a minute, pick one 10-minute task.", "If anxiety stops you functioning, talk to wellbeing services."], decide: ["study-timer", "Use this when you can't start; use the study timer once you can."], traps: "c:exam-day" },
  "mistake-log": { read: ["The percentages show why you lose marks.", "The biggest share is the one to fix first.", "Re-read the right rules before your next paper."], decide: ["syllabus-checker", "Use this when you keep repeating the same slip; use the syllabus checker when you're not sure what you haven't covered."], traps: "g:mcq-traps" },
  "syllabus-checker": { read: ["A tick means the words appear in your notes, not that you know them.", "Crosses are points with no notes at all: start there.", "Missing words show what's absent."], decide: ["mistake-log", "Use this to find what you haven't covered; use the mistake log to find why you lose marks on what you have."], traps: "c:final-48-hours" },
  "mark-scheme-checker": { read: ["Each point shows whether your answer mentions its key words.", "Missing words often mean a missing mark.", "It matches words, not reasoning: check the logic yourself."], decide: ["question-deconstructor", "Use this after writing an answer; use the question deconstructor before."], traps: "g:command-words" },
  "citation-helper": { read: ["The first line goes in your reference list.", "The in-text form goes in the sentence.", "Check italics and punctuation against your department's guide."], decide: ["lit-review-helper", "Use this for each reference; use the literature review helper to organise them."], traps: "c:proofreading" },
  "essay-outline-helper": { read: ["Each part has a word budget.", "Each point follows: point, evidence, analysis, evaluation, link back.", "The counter-argument is where top marks are won."], decide: ["dissertation-word-count", "Use this for one essay; use the dissertation word splitter for chapters."], traps: "c:critical-analysis" },
  "seminar-prep-helper": { read: ["Three talking points: the argument, its strength, its tension.", "Two questions to put to the group.", "Say one in the first ten minutes."], decide: ["essay-outline-helper", "Use this to discuss a reading; use the essay outline helper to write about it."], traps: "c:critical-analysis" },
  "presentation-prep-helper": { read: ["Each slide has minutes and a word count at 130 words a minute.", "Over the total words means you'll overrun.", "Rehearse the likely questions out loud."], decide: ["group-project-planner", "Use this for the talk; use the group project planner to split the work."], traps: "c:peer-review" },
  "viva-prep-helper": { read: ["Questions are grouped the way examiners probe: method, limits, next steps.", "Answer each out loud in under a minute.", "The limitation questions matter most."], decide: ["presentation-prep-helper", "Use this for questioning; use the presentation planner for the talk."], traps: "c:critical-analysis" },
  "research-question-helper": { read: ["The first version is too broad, on purpose.", "The focused version names what to measure.", "Run the FINER check before committing."], decide: ["lit-review-helper", "Use this to set the question; use the literature review helper to map what's known."], traps: "c:critical-analysis" },
  "lit-review-helper": { read: ["Group 1 is where sources agree.", "Group 2 is where they don't, or differ in method.", "Group 3 is your gap: the reason for your project."], decide: ["citation-helper", "Use this to organise sources; use the citation helper to format them."], traps: "c:critical-analysis" },
  "group-project-planner": { read: ["Each member has tasks and total hours.", "Biggest tasks go first to whoever has least.", "Check-in dates come before the real deadline."], decide: ["deadline-planner", "Use this to split work between people; use the deadline planner for your own part."], traps: "c:peer-review" },
  "question-deconstructor": { read: ["The command word says what kind of answer earns marks.", "Plan one creditable point per mark.", "The time guide keeps you on pace."], decide: ["mark-scheme-checker", "Use this before writing; use the mark scheme checker after."], traps: "g:command-words" },
};
for (const k of ["gcse-exam-countdown", "a-level-exam-countdown", "uni-finals-countdown"]) TOOL_EXTRA[k] = { ...TOOL_EXTRA["exam-countdown"], read: ["The date is an estimate: change it to your first paper.", ...TOOL_EXTRA["exam-countdown"].read.slice(1)] };

export function toolExtraHtml(slug) {
  const x = TOOL_EXTRA[slug]; if (!x) return "";
  const [other, rule] = x.decide;
  return `<h2 id="how-to-read">How do I read the result?</h2><ol class="read-steps">${x.read.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
    <p class="decide"><b>Which tool?</b> ${esc(rule)} ${a(other)} →</p>
    <p class="traps-strip"><b>Common traps to watch for:</b> ${a(x.traps)}</p>`;
}

// ---------- guides and concept comparisons: tools for this step, pitfalls, a core rule, related checklists ----------
export const GUIDE_EXTRA = {
  "active-recall": { tools: [["spaced-repetition-schedule", "space your reviews"], ["mistake-log", "track what you keep missing"]], pitfalls: ["Peeking before you commit to an answer.", "Making cards too big to mark right or wrong."], checks: ["c:final-48-hours"], vs: ["v:active-recall-vs-spaced-repetition"] },
  "active-recall-vs-rereading": { tools: [["study-timer", "time a recall session"]], pitfalls: ["Counting a familiar-looking page as 'known'.", "Re-reading the night before instead of testing."], checks: ["c:final-48-hours"], vs: ["v:active-recall-vs-spaced-repetition"] },
  "active-recall-for-science": { tools: [["unit-converter", "check every unit"], ["mistake-log", "log calculation slips"]], pitfalls: ["Memorising worked examples instead of redoing them.", "Skipping units in recall answers."], checks: ["c:stem-practical"], vs: ["v:accuracy-vs-precision"] },
  "active-recall-schedule-before-finals": { tools: [["exam-timetable-planner", "order several exams"], ["spaced-repetition-schedule", "date each topic's reviews"]], pitfalls: ["Leaving past papers until the last day.", "Giving every exam equal time regardless of weight."], checks: ["c:final-48-hours", "c:exam-day"], vs: [] },
  "how-to-make-good-flashcards": { tools: [["spaced-repetition-schedule", "schedule the cards"]], pitfalls: ["One card, several facts.", "Copying sentences instead of asking a question."], checks: [], vs: ["v:blurting-vs-flashcards"] },
  "how-to-revise-in-two-weeks": { tools: [["topic-prioritiser", "decide what goes first"], ["cram-planner", "plan the final days"]], pitfalls: ["Spending day one making a perfect timetable.", "Cutting sleep to add hours."], checks: ["c:final-48-hours"], vs: [] },
  "best-study-tools-for-university-students": { tools: [["study-timer", "a free focus timer"]], pitfalls: ["Switching apps instead of studying.", "Picking a tool before a method."], checks: ["c:semester-reset"], vs: ["v:active-recall-vs-spaced-repetition"] },
  "command-words": { tools: [["question-deconstructor", "break down any question"]], pitfalls: ["Explaining when the question says describe.", "A list of pros and cons with no verdict on an evaluate question."], checks: ["c:final-48-hours"], vs: [] },
  "question-stems": { tools: [["question-deconstructor", "map an unfamiliar question"]], pitfalls: ["'Human error' as an anomaly explanation.", "Naming a control without saying how."], checks: ["c:stem-practical"], vs: [] },
  "exam-technique": { tools: [["question-deconstructor", "plan by marks"], ["mistake-log", "find your pattern"]], pitfalls: ["Spending 15 minutes on a 4-mark question.", "Not leaving time to check units and missed parts."], checks: ["c:exam-day"], vs: [] },
  "long-answer-questions": { tools: [["mark-scheme-checker", "check your answer's points"]], pitfalls: ["Unlinked facts instead of a chain.", "No judgement on an evaluate question."], checks: ["c:critical-analysis"], vs: ["v:essay-outline-vs-mind-map"] },
  "definitions-vs-explanations": { tools: [["mark-scheme-checker", "check key terms are there"]], pitfalls: ["An everyday description where a definition is asked.", "A one-line definition for a 4-mark explain."], checks: [], vs: [] },
  "mcq-traps": { tools: [["mistake-log", "log every guess"]], pitfalls: ["Picking a true statement that answers a different question.", "Trusting a right guess as knowledge."], checks: [], vs: [] },
  "graph-reading": { tools: [["unit-converter", "check axis units"]], pitfalls: ["Describing without quoting values and units.", "Claiming a difference when error bars overlap."], checks: ["c:lab-report"], vs: ["v:correlation-vs-causation", "v:accuracy-vs-precision"] },
  "variables-and-controls": { tools: [["unit-converter", "keep quantities consistent"]], pitfalls: ["Naming a control without saying how it's kept constant.", "Saying repeats improve validity (they improve reliability)."], checks: ["c:stem-practical", "c:lab-report"], vs: ["v:validity-vs-reliability"] },
  "unit-conversion": { tools: [["unit-converter", "get the factor"]], pitfalls: ["cm³ left in a mol dm⁻³ calculation.", "mg and µg mixed in a dose."], checks: ["c:stem-practical"], vs: ["v:accuracy-vs-precision"] },
  "open-book-exams": { tools: [["deadline-planner", "plan a take-home exam"], ["citation-helper", "reference fast"]], pitfalls: ["Not revising because notes are allowed.", "No index, so time goes on searching."], checks: ["c:exam-day"], vs: [] },
  "winter-revision-plan": { tools: [["winter-revision-planner", "lay out the break"], ["exam-timetable-planner", "split focus days"]], pitfalls: ["Revising flat out from day one and burning out.", "Doing nothing until New Year."], checks: ["c:semester-reset"], vs: [] },
  "freshers-study-system": { tools: [["study-hours-calculator", "size each module"], ["spaced-repetition-schedule", "start reviews early"]], pitfalls: ["Transcribing lectures word for word.", "Leaving flashcards until May."], checks: ["c:semester-reset"], vs: [] },
  "exam-resit-recovery": { tools: [["mistake-log", "find the cause"], ["topic-prioritiser", "rank topics"]], pitfalls: ["More hours of the same method that failed.", "Missing the extenuating-circumstances deadline."], checks: ["c:final-48-hours"], vs: [] },
  "resits-and-compensation": { tools: [["module-grade-calculator", "see what you need"]], pitfalls: ["Assuming every university caps resits the same way.", "Assuming compensation applies to core professional modules."], checks: [], vs: [] },
  "study-myths": { tools: [["study-timer", "focus without your phone"]], pitfalls: ["Counting hours instead of recall.", "Learning unchecked AI notes."], checks: [], vs: ["v:active-recall-vs-spaced-repetition"] },
  "study-methods": { tools: [["study-timer", "try Pomodoro"], ["spaced-repetition-schedule", "try spacing"]], pitfalls: ["Treating a time method as a learning method.", "Switching methods every week."], checks: [], vs: ["v:pomodoro-vs-time-blocking", "v:blurting-vs-flashcards"] },
  "blurting-method": { tools: [["study-timer", "time each blurt"]], pitfalls: ["Not checking against notes afterwards.", "Blurting the same topic twice in one day."], checks: [], vs: ["v:blurting-vs-flashcards"] },
  "free-alternatives-to-paid-study-apps": { tools: [["spaced-repetition-schedule", "free spaced repetition"]], pitfalls: ["Paying before trying the free tier.", "Collecting apps instead of studying."], checks: [], vs: [] },
  "medicinal-chemistry-labs-survival": { tools: [["unit-converter", "check doses and dilutions"]], pitfalls: ["Doing calculations during the lab.", "Writing the script's method instead of what you did."], checks: ["c:lab-report", "c:stem-practical"], vs: ["v:accuracy-vs-precision"] },
  "organic-mechanisms-revision": { tools: [["mistake-log", "log arrow mistakes"]], pitfalls: ["Memorising arrows without the electron logic.", "Forgetting charges and lone pairs."], checks: [], vs: [] },
  "history-source-essays": { tools: [["essay-outline-helper", "plan the essay"]], pitfalls: ["Calling a biased source useless.", "Judging reliability without the question in mind."], checks: ["c:critical-analysis"], vs: ["v:essay-outline-vs-mind-map"] },
  "export-quizlet-sets": { tools: [["spaced-repetition-schedule", "schedule the imported cards"]], pitfalls: ["Importing shared sets without checking them.", "Losing images and formulas without noticing."], checks: [], vs: [] },
  "goodnotes-notion-pdf-to-mind-map": { tools: [["reading-time-calculator", "size the reading first"]], pitfalls: ["Uploading handwriting that hasn't been converted to text.", "Notes with no headings, so no structure."], checks: [], vs: ["v:essay-outline-vs-mind-map"] },
  "notion-study-template": { tools: [["exam-countdown", "embed a live countdown"]], pitfalls: ["Building the dashboard instead of revising.", "Embedding tools you never open."], checks: ["c:semester-reset"], vs: [] },
};
// concept comparisons: tools, checklists and guides that go with each
export const VS_EXTRA = {
  "active-recall-vs-spaced-repetition": { tools: ["spaced-repetition-schedule", "study-timer"], checks: ["c:final-48-hours"], guides: ["g:active-recall", "g:study-methods"] },
  "molarity-vs-molality": { tools: ["unit-converter"], checks: ["c:stem-practical"], guides: ["g:unit-conversion"] },
  "correlation-vs-causation": { tools: ["research-question-helper"], checks: ["c:critical-analysis"], guides: ["g:graph-reading"] },
  "mitosis-vs-meiosis": { tools: ["mistake-log"], checks: [], guides: ["g:definitions-vs-explanations"] },
  "essay-outline-vs-mind-map": { tools: ["essay-outline-helper"], checks: ["c:critical-analysis", "c:proofreading"], guides: ["g:long-answer-questions"] },
  "blurting-vs-flashcards": { tools: ["spaced-repetition-schedule"], checks: [], guides: ["g:blurting-method", "g:how-to-make-good-flashcards"] },
  "pomodoro-vs-time-blocking": { tools: ["study-timer", "exam-timetable-planner"], checks: ["c:semester-reset"], guides: ["g:study-methods"] },
  "accuracy-vs-precision": { tools: ["unit-converter"], checks: ["c:lab-report", "c:stem-practical"], guides: ["g:variables-and-controls"] },
  "validity-vs-reliability": { tools: ["research-question-helper"], checks: ["c:lab-report"], guides: ["g:variables-and-controls"] },
  "aerobic-vs-anaerobic-respiration": { tools: ["mistake-log"], checks: [], guides: ["g:definitions-vs-explanations"] },
};

export const toolCallout = (pairs) => (pairs.length ? `<aside class="tool-callout"><b>Tools for this step:</b> ${pairs.map(([k, why]) => `${a(k)}${why ? ` <span>(${esc(why)})</span>` : ""}`).join(" · ")}</aside>` : "");
export const pitfallsBox = (items, title = "Common pitfalls") => (items.length ? `<aside class="pitfalls"><h2 class="h3">${esc(title)}</h2><ul>${items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></aside>` : "");
export const coreRule = (text, label = "Core rule") => (text ? `<p class="core-rule"><b>${esc(label)}:</b> ${text}</p>` : "");
export const relatedKeys = (title, keys) => (keys.length ? `<p class="related-inline"><b>${esc(title)}:</b> ${keys.map(a).join(" · ")}</p>` : "");

// ---------- series: previous and next ----------
export const SERIES = [
  ["Exam season", ["guides/study-methods/", "guides/active-recall/", "guides/command-words/", "guides/exam-technique/", "guides/long-answer-questions/", "checklists/final-48-hours/", "checklists/exam-day/", "guides/exam-resit-recovery/"]],
  ["Coursework", ["tools/research-question-helper/", "tools/lit-review-helper/", "tools/essay-outline-helper/", "tools/citation-helper/", "checklists/proofreading/", "checklists/peer-review/", "checklists/coursework-submission/"]],
  ["Science practicals", ["guides/variables-and-controls/", "guides/graph-reading/", "guides/unit-conversion/", "checklists/stem-practical/", "checklists/lab-report/"]],
];
const nameOf = (href) => Object.values(L).find(([h]) => h === href)?.[1] || href;
export function seriesNav(path) {
  const here = path.replace(/index\.html$/, "");
  return SERIES.filter(([, list]) => list.includes(here)).map(([name, list]) => {
    const i = list.indexOf(here), prev = list[i - 1], next = list[i + 1];
    return `<nav class="series-nav" aria-label="${esc(name)} series"><span>${esc(name)}: part ${i + 1} of ${list.length}</span>${prev ? `<a href="/${prev}">← ${esc(nameOf(prev))}</a>` : ""}${next ? `<a href="/${next}">${esc(nameOf(next))} →</a>` : ""}</nav>`;
  }).join("");
}

// ---------- study stages: everything grouped by where the student is ----------
export const STAGES = [
  ["Weeks to go", ["study-hours-calculator", "topic-prioritiser", "spaced-repetition-schedule", "g:active-recall"]],
  ["Exam next week", ["cram-planner", "exam-timetable-planner", "c:final-48-hours", "calm-reset"]],
  ["Practice papers", ["question-deconstructor", "mark-scheme-checker", "grade-boundaries", "mistake-log"]],
  ["Coursework due", ["deadline-planner", "essay-outline-helper", "citation-helper", "c:proofreading"]],
  ["Results and resits", ["degree-classification-calculator", "module-grade-calculator", "g:exam-resit-recovery", "g:resits-and-compensation"]],
];
export const stagesBlock = (title = "Where are you in your revision?") => `<section class="stages" aria-label="${esc(title)}"><h2>${esc(title)}</h2><div class="stage-grid">${STAGES.map(([s, ks]) => `<div><b>${esc(s)}</b><ul>${ks.map((k) => `<li>${a(k)}</li>`).join("")}</ul></div>`).join("")}</div></section>`;

// ---------- a starter kit for each kind of subject (on its topic hub) ----------
export const KITS = {
  science: ["unit-converter", "g:graph-reading", "c:lab-report"], maths: ["mistake-log", "question-deconstructor", "g:exam-technique"],
  words: ["essay-outline-helper", "citation-helper", "c:critical-analysis"], language: ["spaced-repetition-schedule", "study-timer", "g:active-recall"],
  general: ["topic-prioritiser", "spaced-repetition-schedule", "g:active-recall"],
};
export const starterKit = (family, subject) => `<aside class="tool-callout"><b>Starter kit for ${esc(subject)}:</b> ${(KITS[family] || KITS.general).map(a).join(" · ")}</aside>`;
