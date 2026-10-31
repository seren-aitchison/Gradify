# Curriculum content standard

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
| `X:` | A worked example; following `> ` lines are its steps |
| `K:` | A key point, boxed |
| `!:` | A common mistake |
| `Q:` | A flashcard: `question \| answer` |
| `M1:` `M2:` `M3:` | A check question (easy, medium, hard): `question \| right answer \| wrong \| wrong \| wrong \| … \| why` |

Inline: `**bold**`, `*italic*`, `` `code` ``, `x^{2}`, `v_{0}`. Don't use `|` inside a flashcard or question except as the separator.

**Important:** the last field of an `M` line is the explanation **only when there are at least four fields after the right answer**. Always write at least three wrong answers and an explanation, and the parser can't mistake a distractor for the explanation.

## Minimum per lesson

- A lead (`S:`).
- At least four blocks, in at least two sections (`H:`).
- At least two flashcards and two check questions, each check question with an explanation.
- At least one `K:` key point; a `!:` common mistake where there is a well-known one.

Target: physics lessons average about 2.5 KB. Aim for 1.5–3 KB per lesson: dense, exam-relevant, no padding.

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
