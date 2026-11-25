# Gradify lesson schema (v2) and the Learn mode

Status: implemented 25 Nov 2026 for the Premium Lesson System V1 pilot (Lesson System Brief v2). One renderer, one
schema: v2 is a superset of the notes format (`kit/course/notes.js`), so every existing lesson stays valid and renders
in every mode through the adapter (`kit/course/blocks.js`). No lesson is rewritten to adopt it.

## The schema

Everything in v1 keeps its meaning: `S:` lead, `LV:` level, `O:` objectives, `PRE:` prerequisites, `REQ:` requirements,
`H:` sections, `P:` paragraphs, `-` bullets, `E:` equations, `X:` worked examples with `> ` steps, `K:` key ideas,
`!:` misconceptions, `T:` key terms, `Q:` flashcards, `M1@n:` and the other question types (each tagged with the
objectives it tests), `D:`/`DIA:`/`DNEED:` diagrams, `IX:` interactives, `SUM:` summary, `SRC:` sources, `SAFE:`,
`CASE:`/`LAW:`/`DRUG:` cards, `TIER:`.

v2 adds five optional lines. They turn a section into a concept block:

| Line | Meaning | In Notes mode | In Learn mode |
|---|---|---|---|
| `H: Title @2` | A concept block, tagged with the objective(s) it teaches | A section heading | One step, with its objective shown |
| `HOOK: …` | A prediction or question before the explanation | "Think first" callout | Shown first in the block |
| `MORE: …` | Detail revealed on request (progressive disclosure) | A paragraph | Behind "More detail" |
| `ALT: style \| …` | A written alternative explanation (`simpler`, `analogy`, `example`, `real world`, `advanced`) | A collapsed "Analogy" etc. | First in "Explain it differently" |
| a question inside a block | The block's check | Listed with the lesson's questions | The block's check |

Every block is tagged with its objective (from `@n`, or inferred), its prerequisites (the lesson's `PRE:`), its
difficulty (its questions' levels), its sources (the lesson's `SRC:`) and its verification status (the lesson's tier).

## The adapter: any lesson as the eight teaching functions

`lessonFlow(L)` and `lessonSteps(L)` in `kit/course/blocks.js`, pure and tested over the whole library:

| Function | Built from |
|---|---|
| Orient | title, lead, objectives, prerequisites, estimated time, concept count |
| Diagnose | up to two easy (level 1) questions not used elsewhere; skipped when there are none to spare |
| Teach | one concept block per `H:` section, in order |
| Check (in each block) | The block's question, by the most trusted basis available (below). A block with no confident check has none |
| Practise | the questions not used elsewhere, easiest first |
| Consolidate | summary, key terms, the lesson's misconceptions, the flashcards |
| Prove | up to three level-3 questions, kept for the end |
| Next | which objectives the learner's answers have shown, completion, the next lesson |

Every question is used exactly once: what isn't a block's check, the diagnostic or the final check is practice.

### Which question checks a block

Technical compatibility isn't educational quality, and a question that only shares words with a concept may test
something else. So a block's check needs a basis, and the adapter records it on each check:

| Basis | When | Trust |
|---|---|---|
| `placed` | a v2 lesson puts the question inside the block | the writer's decision, reviewed |
| `tagged` | the block is tagged `@n` and the question tests objective n | the writer's decision, reviewed |
| `matched` | v1 only: the question's stem and right answers share at least two words with one block, more than with any other, counting only words that tell the blocks apart (not the lesson title's, not most blocks'); and, if it tests an objective, that objective matches the same block | a confident guess, not a verified check |

Wrong options and explanations don't count as evidence (they name other ideas on purpose). Anything less certain stays
in practice: no check is better than a wrong one.

Across the 9,979 lessons in the library, every lesson adapts and all 41,670 questions are placed. 5,604 of the 28,143
blocks (20%) have a confident check, all of them `matched`, since no lesson is written in v2 yet. On a sample of 20,
about 17 were clearly right and 3 loosely related. A block takes one of the final check's questions only when it has no
other and at least one stays for the final check. `node scripts/content/learn-coverage.mjs` reports this per
subject. The blocks without a check are the gap the writing model fills when it rewrites a lesson in v2.

## Modes

| Mode | Route | What it is |
|---|---|---|
| Learn | `#/step/<lesson>/<n>` | One step per screen: back, segmented progress (visited steps can be revisited), one Continue. Continue unlocks when the step's questions are answered (right or wrong: the feedback teaches). "Explain it differently" and "Save to my notes" are in every block. A wrong answer in a block adds the concept's common mistakes and a way back to the explanation, on top of the question's own feedback, misconception diagnosis and "Explain it another way". The last step shows which objectives the answers have shown, links each one not yet shown to the concept that teaches it, and lists prerequisites worth revisiting (from the concept graph) |
| Notes | `#/lesson/<lesson>` | The existing lesson page. The final check's questions are labelled "Final check" |
| Review | `#/review` | The existing spaced review |
| Cram | `#/target/…`, `#/review/weak` | The existing target tests and weak-topic practice |

**Completion is the same in every mode** (`finalCheck`, `untried`): a lesson is complete once each final check question
(up to three level 3 questions) has been tried, right or wrong. A lesson with no level 3 questions, or no notes yet, can
be completed as before.

Answers in Learn mode are recorded exactly as on the lesson page (`wirePractice`): the same attempts, solved marks,
XP, misconception diagnosis and "another way". Lesson ids, question ids and progress keys don't change. Learn mode is
offered on the pilot lessons' pages (`LEARN_PILOTS`); any lesson opens in it by its route.

## Components (Step 3 of the brief): reuse first

| Brief component | Where it is |
|---|---|
| LessonHeader, LessonProgress | `viewStep` orient step and step bar (new); `viewLesson` header (existing) |
| LearningObjectives, MasterySummary | orient and next steps (new), objectives frame (existing) |
| DiagnosticCheck, GuidedPractice, LessonAssessment | diagnose, practise and prove steps, using `kit/assess/` questions |
| ConceptBlock, Explanation, KeyPoint, Definition, WorkedExample, Misconception | the block step, rendering the notes blocks (`lessonHtml`) |
| Diagram, InteractiveDiagram | `kit/diagrams/visual.js`, `IX:` interactives (`mountIxSlots`) |
| Question, AnswerFeedback, Hint | `kit/assess/` (7 types, plug-in registry), feedback and `offerDiagnosis` |
| ExplainDifferently | `ALT:` lines, then `kit/learning/explain.js` ways |
| CaptureToNotes | "Save to my notes" (`saveLesson`) |
| FlashcardCollection | the course's flashcards view |
| Summary, RelatedConcepts, SourceInformation | consolidate step; "Builds on" (concept graph); the Notes mode's sources |

## Accessibility

`npm run a11y` (`scripts/a11y/learn.cjs`, CI job `lesson-a11y`) runs axe-core (WCAG 2.0, 2.1 and 2.2 A and AA, and
best practice) on every Learn step of the pilots, their Notes pages and each onboarding screen, in light and dark, at
desktop and phone width, with reduced motion; and checks Learn mode's keyboard behaviour (focus on the step title,
Continue waits for an answer, Tab reaches the question before Continue, an answer unlocks it). It fails on any
violation. Screen-reader checks stay manual.

## Diagrams

The production standard of three distinct diagrams is for the lesson, not for each block. Each sits in the block whose
idea it shows, in the form that idea needs, and only where it explains something the text alone explains less well.
The reviewer (`DIAG`) fails a diagram that is decorative, wrong, a repeat (including one redrawn or relabelled) or
added to reach the count.

## Subject components

A subject adds components, never an engine. Question types register through `kit/assess/` (`register`), interactives
attach to lessons with `IX:`, and diagram renderers live in `kit/diagrams/renderers.js`. Each new component must have
keyboard and screen-reader support, a text alternative that teaches, reduced-motion behaviour and a phone layout.

## Writing for v2

The external writer (`prompts/writer.md`) is asked to write concept blocks: an `H: … @n` per objective, a `HOOK:` where a
prediction helps, the block's check question inside it, `MORE:` for depth beyond the core, and an `ALT:` where a
different explanation is likely to help. The gates accept the five lines; nothing requires them, so v1 lessons still pass.
