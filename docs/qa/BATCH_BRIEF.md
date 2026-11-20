# Batch brief: upgrading lessons to content standard 2

The shared rules for every worker in an enhancement or generation batch (see `docs/CURRICULUM-ARCHITECTURE.md` §12).
A coordinator gives each worker a task: the files it owns, the schools or lessons to bring up to standard, and a
batch report name. This file is the brief; the task message only adds scope.

Read first: `docs/CURRICULUM_CONTENT_STANDARD.md` (the notes format and standard 2), `docs/ASSESSMENT_DATA.md`
(question types), and two or three finished lessons in your own course, so your lessons match their style and level
labels. Finished schools are listed under "Examples" below.

## What "done" means

`node scripts/lesson-standard.mjs` is the definition. For each lesson:

- `S:` lead over 60 characters; `LV:` level; at least two `H:` sections and six content blocks (a `P:` paragraph, a
  bullet list, an `E:` formula, an `X:` example, a `K:` key point or a `!:` mistake), including at least one `K:`.
- At least two `O:` objectives, two `T:` terms, one `SUM:`, one `EV:` (`established | claim`, `contested | claim` or
  `hypothetical | claim`), two `SRC:` lines (`citation | kind | YYYY or YYYY-MM | https link (optional)`), kinds
  from: legislation, case, rule, guidance, standard, primary, secondary, data.
- At least two flashcards (`Q:`) and two `M` questions, each `M` with at least three distinct distractors and an
  explanation over 40 characters.
- At least five questions in all, at all three levels (1, 2, 3), every one linked to an objective (`M2@1,2:`), and at
  least one `SA` extended written answer with a model answer and marking points.

A lesson that already passes is left alone unless it contains an error.

## Checks you run (read-only, safe to run at any time)

```
node scripts/new-course.mjs check <course> --unit uNN
node --test tests/qa-content.test.mjs tests/compat.test.mjs tests/courses.test.mjs tests/course.test.mjs
```

Finish only when `check` reports no problems for your schools and these tests pass. If a test fails in a school you
don't own, say so in your final message and leave it alone.

**Never run** `npm test`, `npm run qa`, `npm run curriculum`, `node scripts/new-course.mjs lock` (unless your task
says you may), `scripts/build-api.mjs` or `scripts/build-search-index.mjs`. They rewrite files across every course,
including files other workers are editing at the same moment. **Never** run git commands that change anything
(`add`, `commit`, `stash`, `checkout`, `reset`, `restore`). The coordinator validates and commits.

## Rules for every lesson

- **Edit only the files your task names.** Save after every two or three lessons, so an interruption loses little.
- **Keep what is there.** Upgrade in place: add metadata, sections, examples and questions. Don't delete a correct
  question or flashcard, and never edit or invent a `#id` (the registry assigns ids). New questions carry no id.
- **Accuracy first.** Recompute every numerical answer and every worked example yourself. When you find an error,
  correct it and record it as `error-fixed` with the wrong and the right value. When you think something is wrong
  but can't be sure, rewrite it conservatively and record `error-suspected`.
- **Never invent** a source, case, citation, section number, statistic, drug dose, threshold or URL. Cite real
  works you are confident exist (an official specification, a standard textbook at book or chapter level, a statute,
  guidance by name). Add a link only when you are sure of it; a citation without a link is fine. No network access is
  available for checking, so prefer fewer, safer sources. A source beyond the course's usual list is allowed if it is
  real; record it as `needs-source` so a reviewer can confirm it.
- **Level (`LV:`)** follows the pattern in the course's finished schools: `<stage> · <difficulty name>`, with the
  stage judged against the real qualification (for example `GCSE · Fluency`, `A level · Application`,
  `Year 2 · Application`, `SQE1 · Legal reasoning`). Don't claim a level the content doesn't reach.
- **Questions.** Difficulty 1 is recall or understanding, 2 application, 3 multi-step or the tempting-distractor case.
  Distractors come from real misconceptions and are about as long as the right answer (the QA flags a right answer
  that is conspicuously the longest). Use `NUM` for a calculation:
  `NUM2@1: question | answer | tolerance | unit | explanation`, with the answer a plain number in ASCII
  (`-4`, not `−4`; `1.6e-19`; no commas or units) and the explanation showing the answer.
- **The arithmetic checker** reads `a op b = c` in any line. Write true equations only; for other bases or modular
  arithmetic, say so in words or subscripts (`101₂ × 11₂ = 1111₂`), and re-run `tests/qa-content.test.mjs`.
- **Template safety.** The notes file is a JavaScript template literal: no backticks, no `${`, and double every
  backslash (`\\frac`). Don't use ` | ` inside a field except as the separator (write `P(A ∣ B)` with U+2223).
- British English, plain sentences, define a term the first time it's used. Aim for 1.5–3 KB per lesson.

## Course-specific rules

**Physics (no question ids).** Saved progress is keyed by question position, so `tests/compat.test.mjs` checks every
original question and flashcard keeps its slot. Add new questions and flashcards only **after** the existing ones in
the lesson; never remove, reorder, or insert before an original. Correcting an original's wording in its own slot is
fine. Usual sources: OpenStax University Physics (volumes 1–3) at section level and the AQA A level Physics
specification (7408); a standard textbook beyond these is `needs-source`. Difficulty names: Foundation,
Application, Physical reasoning.

**Maths.** Judge the level against the DfE GCSE and A level subject content (mapped in
`kit/curriculum/mappings/coverage/dfe-gcse-maths.js` and `dfe-alevel-maths.js`); beyond A level use Year 1–3.
Difficulty names: Fluency, Application, Problem solving. Use `NUM` wherever an answer is a number.

**Law.** England and Wales unless the school says otherwise. State the rule, then the authority (statute and
section, or the leading case with year and court). Check questions are single best answer: a short client
scenario, one best answer, four plausible distractors, an explanation that says why the tempting distractor is
wrong. Difficulty names: Foundation, Application, Legal reasoning. No case or citation you aren't sure of. Contested
or changing law gets a `!:` line telling the learner to check the current position. Each school's first lesson keeps
the "not legal advice" notice.

**Nursing.** NMC Code and standards, NICE, Resuscitation Council UK and RCP (NEWS2) by name. Procedures carry a
`SAFE:` line (theory versus supervised, demonstrated competence; local policy). Medicines calculations use round,
illustrative numbers and say that real administration needs a valid prescription, the required checks and local
procedure. Deterioration questions tell the learner to escalate using the local system. Questions use a patient
vignette where possible. Difficulty names: Foundation, Application, Clinical reasoning. Invented names only.

**Pharmacy.** BNF, NICE, MHRA and GPhC by name. Never present a dose as a recommendation for a real patient: every
calculation is illustrative and says a real supply needs a valid prescription, a clinical check and local
procedure. Recompute every calculation, including unit conversions and rounding, and state the rounding rule.
Mechanisms and adverse effects only where well established. Difficulty names: Foundation, Application, Clinical
reasoning; the finished schools use the stage `Intermediate`.

**GCSE.** Write against the published AQA specification for the outcome (Combined Science 8464), at GCSE depth,
Foundation and Higher noted where they differ. `LV:` uses `GCSE · Foundation`, `GCSE · Application` or
`GCSE · Evaluation`. Required practicals and equations named as the specification names them.

## Batch report

Write `docs/qa/batches/<task>.json` (valid JSON, rewritten whole each time you save):

```json
{
  "task": "<task>",
  "on": "YYYY-MM-DD",
  "files": ["kit/courses/<course>/notes/uNN.js"],
  "lessons": [
    { "course": "<course>", "lesson": "uNN-MM", "action": "enhanced", "changes": ["LV, EV", "added M3 and SA3"],
      "findings": [{ "class": "error-fixed", "note": "Said 438 Hz; the beat frequency gives 442 Hz. Corrected." }] }
  ],
  "notes": ["anything the coordinator should know"]
}
```

`action` is `enhanced` (an existing lesson improved) or `generated` (a new lesson). Finding classes:
`error-fixed`, `error-suspected`, `editorial`, `needs-source`, `curriculum-dependent` (the lesson is bound in
`kit/curriculum/mappings/lessons.js`, so its content hash changes). For a new lesson written for a specification
outcome, give the outcome code in `changes`.

## Final message

Report: lessons now passing out of the total in your scope, errors fixed (wrong and right values), suspected errors,
sources needing confirmation, any check that still fails and why, and every file you changed.

## Examples (finished at standard 2)

Physics `u06`, `u10`, `u17`; Maths `u01`, `u03`, `u05`, `u07`; Law `u03-01` to `u03-16`; Nursing `u02-01` to
`u02-16`; Pharmacy `u04`, `u05`; GCSE `u10`, `u11`, `u12`; Biology `u01`.
