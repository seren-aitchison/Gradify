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
| Check (in each block) | v2: the question placed in the block. v1: the easiest question on the objective whose words the block shares most |
| Practise | the questions not used elsewhere, easiest first |
| Consolidate | summary, key terms, the lesson's misconceptions, the flashcards |
| Prove | up to three level-3 questions, kept for the end |
| Next | which objectives the learner's answers have shown, completion, the next lesson |

Every question is used exactly once. Across the 9,979 lessons in the library:
- every lesson adapts and all 41,670 questions are placed;
- the median lesson has 3 blocks; 21 lessons have more than 7;
- 17,121 of 28,143 blocks get a check. The rest have no question tagged to their objective: a content gap, which the
  quality results surface.

## Modes

| Mode | Route | What it is |
|---|---|---|
| Learn | `#/step/<lesson>/<n>` | One step per screen: back, segmented progress, one Continue. Continue unlocks when the step's questions are answered (right or wrong: the feedback teaches). "Explain it differently" and "Save to my notes" are in every block. "Complete" appears only after the final check has been tried |
| Notes | `#/lesson/<lesson>` | The existing lesson page, unchanged |
| Review | `#/review` | The existing spaced review |
| Cram | `#/target/…`, `#/review/weak` | The existing target tests and weak-topic practice |

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

## Subject components

A subject adds components, never an engine. Question types register through `kit/assess/` (`register`), interactives
attach to lessons with `IX:`, and diagram renderers live in `kit/diagrams/renderers.js`. Each new component must have
keyboard and screen-reader support, a text alternative that teaches, reduced-motion behaviour and a phone layout.

## Writing for v2

The external writer (`prompts/writer.md`) is asked to write concept blocks: an `H: … @n` per objective, a `HOOK:` where a
prediction helps, the block's check question inside it, `MORE:` for depth beyond the core, and an `ALT:` where a
different explanation is likely to help. The gates accept the five lines; nothing requires them, so v1 lessons still pass.
