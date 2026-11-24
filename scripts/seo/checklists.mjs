// Interactive, printable checklists (getgradify.com/checklists/…). Ticks are saved in the visitor's browser
// (assets/tools-write.js, the "checklist" tool), with progress, "copy what's left for the group chat" and a clean print.
import { faq, related, esc } from "./shell.mjs";
import { seriesNav, stagesBlock, GUIDE_EXTRA, VS_EXTRA, LINKS } from "./links.mjs";
// guides and comparisons that point at each checklist point back from it
const backlinks = (slug) => [...Object.entries(GUIDE_EXTRA).filter(([, x]) => x.checks?.includes(`c:${slug}`)).map(([g]) => [`guides/${g}/`, LINKS[`g:${g}`]?.[1] || g.replace(/-/g, " ")]), ...Object.entries(VS_EXTRA).filter(([, x]) => x.checks?.includes(`c:${slug}`)).map(([v]) => [`vs/${v}/`, LINKS[`v:${v}`]?.[1] || v.replace(/-/g, " ")])].slice(0, 4);

const U = "2026-11-23";
// [slug, name, line, title, description, answer, groups: [[heading, [item | [item, types]]]], faq, links]
export const CHECKLISTS = [
  ["lab-report", "Lab report checklist", "Aim to conclusion, with the marks students miss.",
    "Lab Report Checklist: Structure and Common Mistakes · Gradify", "A free interactive lab report checklist: aim, hypothesis, method and controls, results with uncertainty, discussion of limitations and conclusion. Saves your ticks.",
    "A good lab report follows the same order every time: aim, hypothesis or theory, method with controls, results with uncertainties, a discussion of limitations, and a conclusion that answers the aim. Tick each item as you check your draft.",
    [["Aim and theory", ["The aim is one sentence and says what you measured", "The hypothesis is testable and says which way you expect the result to go", "Background theory explains the science the method relies on, with citations"]],
      ["Method and controls", ["Independent, dependent and control variables are named", "You say how each control variable was kept constant, not just that it was", "Enough detail that someone else could repeat it (volumes, concentrations, equipment)", "Safety and ethics noted where relevant"]],
      ["Results", ["Tables have units in the headers, not in the cells", "Consistent decimal places or significant figures", "Graphs: labelled axes with units, a sensible scale, error bars if you have them", "Anomalies identified, not deleted without comment", "Uncertainties or percentage errors calculated"]],
      ["Discussion and conclusion", ["Results compared with the hypothesis and with published values", "Limitations explained with their effect on the result (bigger or smaller?)", "Realistic improvements suggested", "The conclusion answers the aim in one or two sentences", "References formatted in your department's style"]]],
    [["What are the sections of a lab report?", "Title, aim, introduction or theory, method, results, discussion, conclusion and references. Some courses add an abstract at the start."]], [["guides/variables-and-controls/", "Variables and controls"], ["guides/graph-reading/", "Reading graphs and data"], ["tools/citation-helper/", "Citation helper"]]],
  ["semester-reset", "Semester reset checklist", "Set up a new term in an evening.",
    "University Semester Reset Checklist (Start of Term) · Gradify", "A start-of-term reset for university: audit your modules and assessments, set up folders and a spaced-repetition routine, and do a baseline quiz. Saves your progress.",
    "At the start of each term, spend one evening on setup: list every module and assessment date, organise your files, schedule weekly reviews, and test yourself on last term's basics so you know where you stand.",
    [["Know what's coming", ["Every module, its credits and how it's assessed is in one list", "All deadlines and exam dates are in your calendar", "You've read each module's learning outcomes or specification", "You know your degree's weighting (does this year count?)"]],
      ["Set up", ["One folder per module, the same structure for each", "Lecture notes go in the right folder the same day", "A weekly review slot is in your calendar (30 to 60 minutes)", "Flashcards set up for each module (or a Gradify course added)"]],
      ["Start strong", ["A baseline quiz on last term's essentials", "First reading for each module done or scheduled", "One study habit chosen to keep (and one to drop)", "Wellbeing basics: sleep time, exercise slot, one social plan a week"]]],
    [["How do I prepare for a new semester?", "List all modules and deadlines, organise one folder per module, schedule a weekly review session, and take a quick quiz on last term's basics."]], [["tools/deadline-planner/", "Deadline planner"], ["study-plan/", "Study plans"], ["guides/freshers-study-system/", "Freshers study system"]]],
  ["exam-day", "Exam day checklist", "Bag, tech and timing for the morning of an exam.",
    "Exam Day Checklist: What to Bring and Do · Gradify", "A free exam day checklist: student ID, pens, calculator in the right mode, timetable and room, water, timing plan and a calm start. Print it or tick it off.",
    "The night before, pack your bag and check the room and time. On the day: eat, arrive 20 minutes early, check your calculator mode, and plan your time by marks before you start writing.",
    [["The night before", ["Exam time and room checked against the official timetable", "Student ID or candidate number packed", "Black pens (at least two), pencil, ruler, eraser", "Calculator: approved model, fresh battery, in the right mode (degrees or radians)", "Clear water bottle and a snack if allowed", "Alarm set, with a backup", "Light review only: flashcards you got wrong, then sleep"]],
      ["On the day", ["Breakfast, even a small one", "Arrive 20 minutes early", "Phone off and handed in or in your bag as instructed", "Toilet before you go in"]],
      ["In the exam", ["Read the instructions and count the questions", "Plan time by marks (about 1 to 1.5 minutes a mark)", "Underline command words", "Leave 5 minutes to check units, names and unanswered parts"]]],
    [["What should I bring to an exam?", "Your student ID or candidate number, at least two black pens, a pencil, ruler and eraser, an approved calculator with a working battery, and a clear water bottle. Check your exam board's or university's list."]], [["tools/calm-reset/", "Calm reset"], ["checklists/final-48-hours/", "Final 48 hours checklist"], ["guides/exam-technique/", "Exam technique"]]],
  ["proofreading", "Proofreading checklist", "Content, structure, formatting, units and references.",
    "Proofreading Checklist for Essays and Reports · Free · Gradify", "Proofread like a marker: argument and content, structure and signposting, then formatting, units and references. An interactive checklist that saves your ticks.",
    "Proofread in three passes, each looking for one kind of problem: first the argument and content, then structure and signposting, then formatting, units and references. Reading aloud catches what silent reading misses.",
    [["Content and argument", ["The introduction answers the question asked", "Every paragraph makes one point that supports your argument", "Claims are backed by evidence and cited", "The conclusion answers the question without new evidence"]],
      ["Structure and signposting", ["Each paragraph starts with a clear topic sentence", "Links between paragraphs (however, therefore, in contrast)", "Headings and numbering are consistent", "Within the word limit (and your department's tolerance)"]],
      ["Formatting, units and references", ["Spelling and grammar checked, read aloud once", "Terminology used consistently", "Figures and tables numbered, captioned and referred to in the text", "Units and significant figures consistent", "Every in-text citation is in the reference list, and vice versa", "References in the required style", "Name or candidate number, module code, file format as required"]]],
    [["How do you proofread an essay?", "In separate passes: argument, then structure, then formatting and references. Leave a gap of a day if you can, and read it aloud."]], [["tools/citation-helper/", "Citation helper"], ["checklists/coursework-submission/", "Coursework submission checklist"], ["checklists/peer-review/", "Peer review checklist"]]],
  ["peer-review", "Peer review checklist", "Useful feedback on a friend's draft, by draft type.",
    "Peer Review Checklist: Give Useful Feedback on a Draft · Gradify", "Give a coursemate useful feedback instead of 'looks good': prompts for essays, lab reports, presentations and code or data projects, with a summary to paste back.",
    "Choose the type of draft and work through the prompts, writing one specific comment for each. Good feedback names what works, what's unclear, and one change that would raise the mark.",
    [["For every draft", ["Can you say the main argument or finding in one sentence?", "Is it clear what question it's answering?", "Is there a part you had to read twice?", "Name one thing that works well, and why", "Name the one change that would most improve it"]],
      ["Specific to the draft", [["Is every claim backed by evidence and cited?", "essay lab"], ["Is there a counter-argument, taken seriously?", "essay"], ["Are methods and controls clear enough to repeat?", "lab"], ["Do the graphs have labelled axes, units and a sensible scale?", "lab code"], ["Does the talk fit the time at a calm pace?", "presentation"], ["Are slides readable from the back of the room (few words, big text)?", "presentation"], ["Does the code run from the instructions, and are results reproducible?", "code"], ["Are assumptions and data cleaning steps stated?", "code lab"], ["Does it match the mark scheme or brief point by point?", "essay lab presentation code"]]]],
    [["How do I give good peer feedback?", "Be specific and kind: say what works and why, point to the exact sentence or slide that's unclear, and suggest one concrete change."]], [["checklists/proofreading/", "Proofreading checklist"], ["tools/presentation-prep-helper/", "Presentation planner"]], true],
  ["stem-practical", "STEM practical exam checklist", "Before and during a practical or lab assessment.",
    "STEM Practical Exam Checklist (Lab Assessments) · Gradify", "Prepare for a science practical exam or required practicals: techniques, safety, recording results, uncertainty and the write-up questions examiners ask.",
    "For a practical exam, know each required technique well enough to describe it, record results in a proper table as you go, and be ready to discuss uncertainty, controls and improvements.",
    [["Before", ["List the required practicals or techniques on your specification", "Write each method from memory, then check it", "Know the safety precautions and why for each", "Practise drawing results tables and graphs with units"]],
      ["During", ["Record raw data immediately in a table with units", "Repeat readings and spot anomalies as you go", "Note anything that might affect accuracy"]],
      ["Write-up questions", ["Identify the independent, dependent and control variables", "Explain how to keep each control variable constant", "Calculate percentage uncertainty", "Suggest improvements that reduce uncertainty, not just 'be more careful'"]]],
    [["How do I revise required practicals?", "Write each method from memory, then check it; learn the variables, safety points and sources of error for each; and practise the calculation and graph questions from past papers."]], [["guides/variables-and-controls/", "Variables and controls"], ["tools/unit-converter/", "Unit converter"], ["checklists/lab-report/", "Lab report checklist"]]],
  ["coursework-submission", "Coursework submission checklist", "The last checks before you press submit.",
    "Coursework Submission Checklist: Before You Press Submit · Gradify", "The final checks before submitting coursework: the brief, word count, file format, references, academic integrity declaration and a confirmation receipt.",
    "Before you submit: re-read the brief and mark scheme against your work, check word count and file format, make sure every source is referenced, and keep the submission receipt.",
    [["Against the brief", ["Every part of the brief or question is answered", "Checked against the mark scheme or rubric, point by point", "Within the word count or page limit"]],
      ["Integrity", ["Every source and quotation is referenced", "Any AI use follows your module's policy and is declared if required", "The academic integrity declaration is completed"]],
      ["The file", ["Correct file type (often PDF or Word) and file name format", "Your candidate number or name as instructed (anonymous marking?)", "Figures, tables and appendices included", "Uploaded to the right module and assignment", "Confirmation email or receipt saved"]]],
    [["What should I check before submitting coursework?", "That it answers the brief and fits the word limit, every source is referenced, the file and name format are right, and you've kept the submission receipt."]], [["checklists/proofreading/", "Proofreading checklist"], ["tools/deadline-planner/", "Deadline planner"]]],
  ["final-48-hours", "Final 48 hours before an exam", "What to do (and not do) in the last two days.",
    "Final 48 Hours Before an Exam: Checklist · Free · Gradify", "The last two days before an exam: past-paper gaps, rapid recall of weak cards, formula and definition sheets, logistics, sleep. A calm, prioritised checklist.",
    "In the final 48 hours, stop learning new material. Do one timed past paper, fix the gaps it shows, test yourself on your weakest cards, sort out logistics, and sleep properly both nights.",
    [["Two days before", ["One timed past paper (or a section of one)", "Mark it and log every dropped mark", "Make one sheet of formulas, definitions or key quotations from memory, then check it", "Flashcards: the ones you got wrong this week"]],
      ["The day before", ["Light review only: your mistake log and weak cards", "Pack your bag (see the exam day checklist)", "Check the time, room and travel", "Stop by early evening; do something relaxing", "Sleep 7 to 9 hours: it's when memories consolidate"]]],
    [["Should I study the night before an exam?", "Light review of your weakest material is fine, but stop by early evening and sleep. A late cram costs more in tired recall than it gains."]], [["tools/cram-planner/", "Cram planner"], ["checklists/exam-day/", "Exam day checklist"], ["tools/mistake-log/", "Mistake log"]]],
  ["critical-analysis", "Critical analysis checklist", "Turn description into first-class argument.",
    "Critical Analysis Checklist: From Descriptive to First-Class · Gradify", "Check each paragraph for critical analysis: a claim, evidence, evaluation of that evidence, comparison with other sources, and a link back to your argument.",
    "Descriptive writing says what a source says; critical writing says how good the evidence is, how it compares with other sources and why it matters for your argument. Check each paragraph for all five.",
    [["Each paragraph", ["Opens with a claim that answers the question, not a fact", "Uses specific evidence (data, a case, a quotation)", "Evaluates that evidence: method, sample, bias, date, context", "Compares it with another source that agrees or disagrees", "Links back to your overall argument"]],
      ["The whole piece", ["A clear position from the introduction onwards", "Counter-arguments addressed, not ignored", "Limitations of your own argument acknowledged", "The conclusion weighs the evidence and makes a judgement"]]],
    [["What is critical analysis in an essay?", "Going beyond describing sources to evaluating them: how strong the evidence is, where sources disagree and why, and what that means for your argument."]], [["tools/essay-outline-helper/", "Essay outline helper"], ["guides/definitions-vs-explanations/", "Definitions vs explanations"]]],
];

function checklistPage([slug, name, line, title, description, answer, groups, qa, links, typed]) {
  const f = faq(qa); let k = 0;
  const item = (x) => { const [text, types] = Array.isArray(x) ? x : [x, ""]; k++; return `<li${types ? ` data-types="${types}"` : ""}><label><input type="checkbox" name="c${k}" data-item="c${k}"> ${esc(text)}</label></li>`; };
  return {
    path: `checklists/${slug}/index.html`, title, description, updated: U, crumbs: [["Checklists", "checklists/"], [name, `checklists/${slug}/`]],
    schema: [{ "@type": "HowTo", name, step: groups.flatMap(([, items]) => items).map((x, i) => ({ "@type": "HowToStep", position: i + 1, text: Array.isArray(x) ? x[0] : x })) }, f.schema],
    body: `<h1>${esc(name)}</h1><p class="answer">${answer}</p>
    <div class="tool checklist" data-tool="checklist" data-mod="tools-write" data-key="${slug}">
      ${typed ? `<div class="grid"><div><label for="type">Type of draft</label><select id="type" name="type"><option value="">All</option><option value="essay">Essay</option><option value="lab">Lab report</option><option value="presentation">Presentation</option><option value="code">Code or data project</option></select></div></div>` : ""}
      ${groups.map(([h, items]) => `<h2>${esc(h)}</h2><ul class="check">${items.map(item).join("")}</ul>`).join("")}
      <div class="result" role="status" aria-live="polite"></div>
      <div class="actions no-print"><button type="button" class="ghost" data-left>Copy what's left for the group chat</button><button type="button" class="ghost" data-clear>Untick all</button><button type="button" class="ghost" data-print>Print</button></div>
    </div>
    <p class="small">Your ticks are saved in this browser only.</p>
    ${seriesNav(`checklists/${slug}/`)}
    ${f.html}${related("Use with", [...links.map(([h, l]) => [h, l, ""]), ...backlinks(slug).filter(([h]) => !links.some(([x]) => x === h)).map(([h, l]) => [h, l, ""]), ["checklists/", "All checklists", ""]])}`,
  };
}

export function checklistPages() {
  return [...CHECKLISTS.map(checklistPage), {
    path: "checklists/index.html", title: "Free Study Checklists: Exams, Lab Reports, Essays · Gradify", description: "Free interactive checklists for students: exam day, final 48 hours, lab reports, proofreading, peer review, coursework submission and a semester reset.", crumbs: [["Checklists", "checklists/"]], ogType: "website",
    body: `<h1>Study checklists</h1><p class="answer">Tick-off checklists for the moments that cost marks: the night before an exam, the last read of an essay, the write-up of a practical. Ticks are saved in your browser, and every list prints cleanly.</p><ul class="cards">${CHECKLISTS.map(([s, n, l]) => `<li><a href="/checklists/${s}/">${esc(n)}</a><span>${esc(l)}</span></li>`).join("")}</ul>${stagesBlock()}`,
  }];
}
