# Curriculum content standard

_Standard 3, November 2026: the fixed lesson shape is retired; size follows the topic. See "Size follows the topic" below._

The rules every lesson in a Gradify course follows. `tests/course.test.mjs` (physics) and `tests/courses.test.mjs` (law, nursing) enforce the mechanical parts; reviewers enforce the rest.

## The notes format

One file per unit (school): `kit/courses/<slug>/notes/uNN.js`, `export default \`…\``. Each lesson starts with `## Title`, matching the syllabus title (case and punctuation are ignored). Inside a lesson, each line starts with a tag:

| Tag | Meaning |
|---|---|
| `S:` | The lead: what this lesson is about, in one to three sentences (required, over 60 characters) |
| `H:` | A heading; starts a new section |
| `P:` or no tag | A paragraph |
| `- ` | A bullet |
| `E:` | A formula, rule or statutory test, optionally `text :: what it means` |
| `X:` | A worked example; following `> ` lines are its steps. Learners reveal them one at a time, so write each step so it can be checked on its own, and make the last step the answer |
| `DEEP:` | More for whoever wants it, folded under "Show more": `label | text`, the label saying what it is (Derivation, Deeper theory, Another example, Exam detail); following `> ` lines are more paragraphs. Keep what every learner needs out of it |
| `K:` | A key point, boxed |
| `!:` | A common mistake |
| `Q:` | A flashcard: `question \| answer` |
| `M1:` `M2:` `M3:` | A check question (easy, medium, hard): `question \| right answer \| wrong \| wrong \| wrong \| … \| why` |

Other question types (`TF`, `MS`, `SEQ`, `MATCH`, `SA`), per-option explanations (`wrong option :: why it is wrong`) and objective links (`M2@1,3:`) are described in `docs/ASSESSMENT_DATA.md`. Don't write or edit the `#id` part of a question tag: `npm run qa` assigns it.

Inline: `**bold**`, `*italic*`, `` `code` ``, `x^{2}`, `v_{0}`. Don't use `|` inside a flashcard or question except as the separator.

**Important:** the last field of an `M` line is the explanation **only when there are at least four fields after the right answer**. Always write at least three wrong answers and an explanation, and the parser can't mistake a distractor for the explanation.

## Size follows the topic (standard 3)

There is no lesson template. Each lesson is as long as the topic needs, with as many worked examples, diagrams and flashcards as the topic needs. Lessons that all have the same shape are a warning sign, not a standard: `npm run qa` reports how much of each course shares one skeleton (see *Shape report* below).

**Floors** (enforced by `npm run qa` and the tests, unchanged): a lead (`S:`) over 60 characters; at least four blocks in at least two sections (`H:`); at least one `K:` key point; at least two flashcards and two check questions, each check question with an explanation. Floors stop a lesson being empty. They are not targets.

**Sizing guide.** Decide what kind of topic it is first, then write to that:

| Kind of topic | Teaching text | Worked examples | Diagrams (`D:`) | Flashcards |
|---|---|---|---|---|
| A definition or a single fact with context | 150–300 words | 0–1 | rarely | 2–4 |
| A concept to understand (why something happens) | 300–600 words | 1–2, chosen to show the idea working | where a picture explains it | one per idea worth recalling, usually 3–6 |
| A method or calculation | 250–500 words | 2–3 of rising difficulty; as many steps as the method really has | a graph or construction where it helps | the method's decisive steps and its traps |
| A process, mechanism or structure | 300–700 words | one traced example | **required**: the mechanism, cycle, circuit or structure | the stages, and what drives each |
| A core, heavily examined topic | 600–1,200 words, or split into two lessons | 2–4, including an exam-style one | as many as the distinct ideas need | 6–12 |
| A legal test or clinical decision | 300–700 words | a scenario applied step by step | a decision tree, legally or clinically reviewed | the elements of the test and their authorities |

**Rules that replace the old template**
- **Worked examples** have as many steps as the solution has. Don't split or merge steps to reach a number.
- **Flashcards** test one thing each, and something worth remembering: a definition, a relationship, a decision, a common confusion. Not dates or names for their own sake, unless knowing them is the point.
- **Summaries (`SUM:`)** are full sentences a learner could revise from ("SN2 inverts the configuration at carbon"), not labels ("Inversion.").
- **Leads** say what the topic is and why it matters. Don't start with "This lesson…".
- **Diagrams.** Where the topic is a mechanism, process, structure, circuit, graph, force system, cycle or decision, add a checked teaching diagram (`D:`, `docs/VISUAL-LEARNING-ENGINE.md`) beside the text it explains.

**Check-question options must not give the answer away**
- The right answer is no longer than the longest wrong option by more than about 20%, and is not always the longest. Lengthen the wrong options with real content, or tighten the right one.
- Every wrong option is a misconception a real learner holds: a confusion between related ideas, a reversed relationship, a step missed or a rule misapplied. Never write an obviously absurd option ("always zero", "is magic", "has no effect on anything").
- `npm run qa` reports any question where the right answer is more than 30% longer than every wrong option. For a school with `standard: 3` in `qa.js` it is a hard failure.

**Shape report.** `npm run qa` lists, per course, the share of lessons with the most common skeleton (sections, worked examples and their step counts, flashcards, questions). Above 25%, the course is being written to a template; review it.

## Accuracy and sources

- **State the law or the practice, then the authority.** For law: the statute and section, or the leading case with year and court. For nursing: the NMC standard, NICE guideline, Resuscitation Council UK or RCP (NEWS2) source by name.
- **Only well-established points.** If the law or guidance is contested, recent or under reform, say so in a `!:` line and tell the learner to check the current position. Never invent a case name, citation, section number, drug dose or threshold.
- **Date-sensitive figures** (tax rates and bands, thresholds, fees, limits, NEWS2 scores) are given with the year they apply to, or described without the number.
- **Law changes.** Each school's notes describe the law as at the date at the top of the file.

## Jurisdiction (law)

- The default jurisdiction is **England and Wales**. Never write "UK law" when only English law is meant.
- Where Scotland or Northern Ireland differs materially, end the lesson with `H: Elsewhere in the UK` and say how, or point to School 17.
- Wales: note where Senedd legislation diverges (e.g. renting homes, social care).

## Nations (nursing)

- **UK-wide:** the NMC Code, NMC standards of proficiency, revalidation, the duty of candour as a professional duty.
- **Differs by nation:** mental capacity law (England and Wales: Mental Capacity Act 2005; Scotland: Adults with Incapacity (Scotland) Act 2000; Northern Ireland: Mental Capacity Act (Northern Ireland) 2016), mental health law, safeguarding legislation, the statutory duty of candour, health service structures, prescription charges. Label which nation a law applies to.

## Safety rules

**Law.** Lessons explain the law for study. They never tell a reader what to do in their own case. Each school's first lesson and the course notice make clear that LawGradify isn't legal advice, isn't a legal qualification and doesn't authorise anyone to practise.

**Nursing.**
- Every clinical skill is described as education. Where a lesson describes a procedure, include a `K:` or `!:` line saying it is performed only when competent, within scope, under supervision where required and following local policy.
- Medicines: every calculation example says that real administration needs a valid prescription, the required checks and local procedure. Use round, obviously illustrative numbers; never present a dose as a recommendation for a real patient.
- Deterioration: always tell the learner to escalate using their local system (e.g. NEWS2 and the local escalation policy) and to call for emergency help when needed.
- No patient-identifiable information in examples. Use invented names.

## Questions

- **Law check questions are single best answer:** a short scenario ("A client…"), one best answer and four plausible distractors drawn from real misconceptions. The explanation says why the answer is right and, where useful, why the most tempting distractor is wrong.
- **Nursing questions** use a patient vignette where possible and test what the nurse should do first, notice, check or escalate.
- Difficulty: `M1` recall/understanding, `M2` application, `M3` multi-step or the tempting-distractor case.
- Flashcards test one thing each; the answer is under 40 words.

## Style

- British English. Plain, direct sentences. Define a term the first time it appears.
- Case names in italics are optional; keep citations short: *Donoghue v Stevenson* [1932] AC 562 (HL), or just [1932] UKHL 100 style where neutral citations exist.
- Inclusive, person-first language in nursing ("a person with diabetes").

## Standard 2 (all new schools)

From the School 6 batch onwards every lesson follows standard 2, and `npm run qa` enforces it as a hard check for any school whose `qa.js` record has `standard: 2`. Older schools gain the metadata at their review.

**The hierarchy.** School → module → lesson (each topic in the brief is taught as one lesson) → learning activities (worked examples, scenarios, interactives) → assessment (check questions in the lesson, school quiz, mock exams). Modules are `> Title` lines in the syllabus.

**Lesson metadata, in the notes file**

| Tag | Content | Minimum |
|---|---|---|
| `O:` | A learning objective, phrased as what the learner can do | 2 |
| `PRE:` | Prerequisite knowledge, ideally a lesson title | as needed |
| `T:` | Key term: `term \| definition` | 2 |
| `SUM:` | Summary point | 1 |
| `SRC:` | Source: `citation \| kind \| date \| link`; kind is legislation, case, rule, guidance, standard, primary or secondary; date is the version or the date checked | 1, every one with kind and date |
| `READ:` | Further reading | optional |
| `SAFE:` | Competence and safety statement (clinical skills: theory versus demonstrated, supervised competence; contraindications and local policy) | every nursing procedure lesson |

**Question types** (`kit/assess/questions.js`): `M` single best answer or multiple choice; `MS` multi-select; `SEQ` ordering; `MATCH` matching; `SA` short answer with a model answer and marking points (self-assessed). Every auto-marked question needs an explanation.

**Other metadata lives in data, not in each lesson:** subject, school and module (the syllabus); framework mapping, level, jurisdiction or field (`map.js`); review status, reviewer, dates and version (`qa.js` and git history); permanent ids (`ids.js`).
