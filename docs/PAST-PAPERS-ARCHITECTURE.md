# Gradify Past Papers: product architecture and phased roadmap

**Version 1, 24 November 2026. Proposal for the owner's review: nothing here is built or merged yet.** This replaces
the narrower Past Papers section of [the learning environment roadmap](LEARNING-ENVIRONMENT-ROADMAP.md) (§4) as the
plan for this workstream. The roadmap stays the register of who is doing what.

## 1. The ambition

Past Papers is a flagship Gradify product: a complete revision and exam-preparation library, of the breadth students
expect from the best revision sites, for every qualification Gradify covers. For each point of a specification it has:

- concise **revision notes** with original diagrams, key definitions, equations, worked examples, misconceptions and
  exam tips;
- an **exam question bank** in every format the exam uses, with mark schemes, model answers and worked solutions that
  explain why each mark is given;
- **interactive practice**: attempt, progressive hints, marking, method marks, missing keywords, retries;
- **tests**: topic tests, mixed tests, personalised papers built from the student's weak points, and full timed mock
  papers.

**What makes it Gradify's, and better than a revision site:** it is one learning system, not a library beside the
courses. Every note links to the lesson that teaches the idea properly, the questions that test it and the flashcards
that keep it. Every answer is evidence for Specification Mastery, so the student always knows what to do next.

```
 Specification point (e.g. AQA GCSE Biology 4.1.2.2 Mitosis and the cell cycle)
   ├── Revision notes ──── understand it          (new: concise, exam-focused)
   ├── Lessons ─────────── learn it properly      (existing: kit/courses/<course>/notes)
   ├── Exam questions ──── apply it               (new: the question bank)
   ├── Flashcards ──────── keep it                (existing: Q: lines, SRS)
   └── Specification Mastery ── where you stand   (Specification Mastery branch, PR #169)
         ↑ every answer, test and card review is an attempt record
```

### Principles

1. **Build the engine once, then fill it subject by subject.** One data model, one marking engine, one set of pages,
   used by all 31 subject sites. Adding a specification means adding content files, not code.
2. **Specification first.** Everything is keyed to specification points (`kit/specs`, from Specification Mastery), so
   a topic, a test, a mock paper and a student's weak areas are all the same structure.
3. **Original content only.** Every note, question, mark scheme and diagram is Gradify's own. Nothing from Save My Exams,
   exam boards or any other publisher is scraped, copied or paraphrased from their text. Official papers are linked on
   the board's own site. Licensed official papers can be added later behind the same interface, once there is a licence
   (roadmap §8).
4. **Honest about what is checked.** Every item carries its review status, and the page shows it, as the curriculum
   registry (`kit/curriculum/coverage.js`) and the Chemistry Lab's "provisional" notice already do. Self-assessed or
   AI-suggested marks are labelled, and recorded as provisional.
5. **Deterministic marking decides; AI explains or suggests.** Choice, number, short answers and calculations are
   marked by code. Extended answers are self-assessed against the mark scheme, or AI-assisted on Ultra, and never
   treated as final.
6. **Premium, fast and accessible.** Phone-first, keyboard and screen-reader complete, both themes, and fast on a
   school Chromebook: a topic loads only its own content.

## 2. What exists today

### Two pilots of the same thing

Two sessions built a Past Papers pilot for AQA GCSE Biology 4.1 Cell biology in parallel. Neither is merged, and the
owner wants both kept until a canonical branch is agreed.

| | `claude/past-papers-cell-biology` (`de621913`) | `claude/past-papers-v1` (`6252648a`) |
|---|---|---|
| Questions | 12 questions, 51 marks, 28 parts | 12 questions, 63 marks, 39 parts |
| Question types | **The course's own question library** (`kit/assess/types.js`): multiple choice, true/false, calculation, ordering, matching, written | Own inputs: choice, short (auto-marked word or phrase, with rejected answers), number, extended |
| Calculations | **`check()`: the worked calculation as code**, checked against the stated answer | Answer and tolerance; **method marks** a student can earn with a wrong answer (self-assessed, never full marks) |
| Mark scheme | Points with marks per part, **examiner notes**, model answer, mistakes, lessons | Mark points, model answer, how the marks are earned, mistakes, lessons |
| Specification | Points from the Specification Mastery map, **tier** (Higher only) and Biology-only flags | Points from the same map |
| Course wiring | **`cfg.papers` in the course config**, documented in `docs/SUBJECT_CONFIG_SPEC.md` | A registry (`kit/papers/index.js`) and a tab added in `course.js` |
| Experiences | Interactive model answers (one try per part, then the scheme) | Interactive model answers, **mini practice** (five questions marked together, weakest points first, lessons behind the marks lost), **best score per question** |
| Checks | Validator; tests; browser check 25/25 including **offline and keyboard** | Validator, also checking that marks add up, that method marks exist, and that no rejected answer is part of an accepted one; tests; browser check 26/26 at four widths |

**Recommendation: `claude/past-papers-cell-biology` becomes the canonical branch.** Its architecture is the better
foundation. It reuses the course's question library, so every question type the courses have works in Past Papers and
looks the same. It proves calculations with code and is wired through course configuration. From
`claude/past-papers-v1`, port onto it as one commit:

- mini practice;
- method marks;
- best scores;
- short answers marked automatically (with rejected answers);
- the stricter validator rules;
- the 320 px browser checks.

`claude/past-papers-v1` is then deleted, with the owner's approval.

Neither pilot is the architecture's ceiling. Both store a topic's questions in one module with no review status, no
difficulty, no command word and no revision notes. Section 3 is the model they grow into.

### What Past Papers builds on (all on main unless noted)

| Need | Existing piece |
|---|---|
| Specifications, points, tiers and options | `kit/specs` and `kit/learning/spec-mastery.js` (Specification Mastery, PR #169) |
| Question types, rendering and marking | `kit/assess/types.js`, `questions.js` (choice, true/false, multi-select, order, match, number, short; extensible through `registerQuestionType`) |
| Attempt records, analytics | `kit/assess/attempts.js` (schema 1, provisional vs final marking), `assessment_attempts` |
| Mastery | `kit/learning/mastery.js` (the Mastery Engine) |
| Timed exams | `kit/assess/exam.js` (build, run and mark an exam, weak areas) |
| Lesson content, flashcards | The notes text format (`kit/course/notes.js`: `T:` key terms, `E:` equations, `X:` worked examples, `!:` pitfalls, `Q:` flashcards, `D:` diagrams); `kit/learning/srs.js` |
| Original diagrams | The diagram pipeline: renderers, about 1,300 checked specs (`kit/diagrams`, `BUILDERS.md`) |
| AI marking against a rubric | `course-tutor` mode `mark` (`kit/assess/tutor.js`): criterion by criterion, met / partly / not yet, quoting the answer |
| Plans and allowances | `kit/data/plan.js`, `kit/data/limits.js`, AI allowances |
| Honesty statuses | `kit/curriculum/coverage.js` (verified, mapped, aligned) |
| Publishing, offline, SEO | `scripts/build-site.mjs` (allowlist), `sw.js`, the crawlable course pages (`docs/SEO.md`) |

## 3. Data model

Content is plain data in the repository, as lessons are: reviewable in pull requests, versioned, tested, published as
static files, available offline. No database is needed for content; the student's answers use the existing attempt
records.

```
kit/specs/<spec>.js                       the specification (exists): topics → groups → points, flags, options
kit/revision/<spec>/<topic>/              one folder per topic of a specification
  notes.js                                revision notes, one entry per point
  questions.js                            exam questions for the topic's points
  papers.js                               (optional) authored papers: blueprints or fixed sets
kit/revision/<spec>/blueprints.js         the real exam's paper structure, for generating mock papers
kit/revision/engine/                      the engine: model, validator, marking, assembly (pure, Node-tested)
kit/revision/ui/                          the pages
```

### 3.1 Identity and versioning

- Every item has a permanent id: `<spec>/<point>/<kind>-<n>` (e.g. `aqa-gcse-biology-8461/4.1.2.2/q-03`), plus a
  version `v`. Changing an answer or mark scheme bumps `v`. Attempts record `id@v`, as lesson questions already do
  through `cfg.questionVersions`, so history stays honest after an edit.
- A question can serve several specifications. A Combined Science specification's point refers to the Biology
  question's id rather than copying it (`also: ["aqa-gcse-combined-trilogy-8464/5.1.2.2"]`).

### 3.2 Question

```js
{
  id, v, points: ["4.1.2.2"], also: [],            // the specification points it tests (first = main)
  status: "draft" | "checked" | "reviewed",        // §6.3; only "checked" and "reviewed" are published
  source: "gradify" | "licensed:<board>",          // "licensed" only with a recorded licence
  tier: "both" | "higher" | "foundation", flags: ["sep"],
  difficulty: 1 | 2 | 3,                           // Foundation-style, standard, stretch
  skills: ["calculation", "graph", "practical:RP3", "data", "maths:ratio"],
  context?: "…",                                   // shared stem; may include a figure or a table
  figure?: { diagram: "<diagram id>" } | { table: [[…]] } | { graph: {…} },
  parts: [part],
  time?: minutes                                   // optional override of the default mark-a-minute
}
```

### 3.3 Part and mark scheme

A part is a question in the assessment library's shape (`Q`), plus its mark scheme. This is the cell-biology pilot's
model, extended with the conventions real mark schemes use.

```js
{
  id: "a", marks: 3,
  command: "explain",                              // the command word: state, describe, explain, compare, evaluate, calculate, suggest, …
  ao: [1, 2],                                      // assessment objectives (from the specification's own list)
  Q: { type: "num" | "sba" | "mcq" | "tf" | "multi" | "order" | "match" | "short" | "gap" | "label" | "graph" | "draw" | "extended", … },
  scheme: {
    kind: "points" | "levels",                     // points-based or levels of response (6-mark questions)
    points: [{ id, text, marks: 1, type: "M" | "A" | "B" | "C", accept: [], reject: [], keywords: [] }],
    max: 3,                                        // "any three from …"
    levels: [{ level: 3, marks: [5, 6], descriptor }, …], indicative: ["…"],   // for kind "levels"
    ecf: true,                                     // error carried forward from an earlier part
  },
  hints: ["…", "…"],                               // progressive: each costs the part's "unaided" status, not marks
  model: "…",                                      // a full-mark answer, in words
  working?: [{ step, why }], check?: () => number, // calculations: the worked solution, and the same working as code
  examiner: "…",                                   // why each mark is given and what isn't credited
  mistakes: ["…"],                                 // common errors and why they lose marks
  lessons: ["u05-03"],                             // Revise this concept (defaults to the point's lessons)
}
```

Mark types follow exam convention, so a student learns how real marking works:

- **M:** a method mark. Earned for correct working even when the answer is wrong.
- **A:** an accuracy mark. Depends on the method.
- **B:** an independent mark.
- **C:** a communication mark (units, significant figures, a labelled diagram).

### 3.4 Revision note (one per point)

The existing notes text format, with a few added tags, so authors and the parser already know it:

```
## 4.1.2.2 Mitosis and the cell cycle
S: one-sentence summary
T: chromosome | a long DNA molecule carrying many genes        (key definitions, also flashcards)
H: The cell cycle
P: …   - …   E: …   X: worked example   > step
D: bio-cell-cycle                                              (an original diagram from the pipeline)
!: Common misconception …
TIP: Exam tip: "describe" questions on mitosis want the order of events, not their names
NEED: what the specification requires you to know here, in Gradify's words
LINK: u05-03                                                   (the lesson to learn it properly; more than one allowed)
Q: flashcard question | answer
```

Notes are short: one screen per point at most. They summarise; the lesson teaches. Each note shows its diagrams, its
questions ("Practise 4.1.2.2: 6 questions, 23 marks"), its flashcards and the student's standing on the point.

### 3.5 Papers and blueprints

A **blueprint** describes a real exam's structure in Gradify's own words:

- the papers and their duration;
- the total marks;
- the topics each paper covers;
- the mix of assessment objectives and maths skills;
- the share of marks for practical work;
- the tier.

The engine assembles a **paper** from the bank to match a blueprint, deterministically for a seed:

- a **topic test** is one topic and about 30 minutes;
- a **mixed test** spans several topics;
- a **personalised paper** weights its questions towards the student's weakest points (`weakestPoints()` from
  Specification Mastery);
- a **mock** is a full paper to the blueprint, timed.

Authored papers (fixed sets) are possible but aren't the default: generated papers scale and can't be memorised.

### 3.6 Validation (every content file, in CI)

The pilots' validators, combined and extended. A bank fails CI unless:

- every point exists in the specification, every lesson exists, and every diagram exists in the manifest;
- the parts' marks add up, and the mark scheme can award exactly those marks (`max`, levels' ranges);
- every part has a model answer, examiner notes, at least one mistake and its lessons;
- a calculation has `check()` agreeing with its answer, and an M mark for every A mark that depends on method;
- no rejected answer is contained in an accepted one;
- every published item is `checked` or `reviewed`, and `source` is `gradify` unless a licence is recorded;
- each point of a published topic has at least N questions (N = 3 in the pilot, 6 at scale), across difficulties.

A separate **originality check** runs before publishing. It compares new text with the bank, to catch duplicates, and
with any reference text a reviewer pastes in, to make sure nothing is reproduced.

## 4. Marking engine

| Part type | Marked by | Result |
|---|---|---|
| Choice, true/false, multi-select, order, match, gap fill, label a diagram | The question library's handlers | Final |
| Short answer (a word or phrase) | Accept/reject lists and keyword rules, as words in the answer | Final |
| Calculation | Answer within tolerance → all marks. Otherwise the student enters their working line by line, and the engine checks each M mark against the worked solution (the Maths Lab's step checker does this for algebra). Where it can't, the student ticks method marks, and those are self-assessed | Final, or provisional for ticked marks |
| Graph and drawing | Plotted points within tolerance, line of best fit, labels | Final (phase 3) |
| Extended and levels-of-response | **Free:** the student ticks the mark points their answer made; for levels, picks the descriptor. **Ultra:** `course-tutor` mode `mark` judges each mark point, quoting the answer, and finds missing keywords. The student can accept or change each judgement | Provisional, always |

- **Missing keywords:** a mark point's `keywords` are shown as the words examiners look for. After marking, the
  keywords the answer didn't use are listed.
- **Hints:** these are progressive. Using one marks the attempt as assisted, as the Maths Lab and lesson checks do. It
  doesn't remove marks: the student is practising, not sitting the exam.
- **Retries:** a wrong part can be tried again. The first attempt is the evidence, and later ones are recorded as
  attempt 2, 3 and so on, so mastery sees both what the student knew and what they learned.
- **Error carried forward:** with `ecf`, a later part is marked against the student's own earlier answer, as
  examiners do.

## 5. Experiences and UI

### 5.1 Where it lives

- **A top-level destination**, `/revise/` ("Revise", or "Past Papers" if the owner prefers the name). It lets a student
  choose their country, qualification, board, subject and specification, and remembers the choice in their profile.
  Every subject site links to it.
- **In each course**, a "Revision" tab showing the same pages for the course's specifications. The course's lessons,
  flashcards and progress are linked in place.
- **Public, crawlable pages:** each specification, topic and point note is a static page generated at build time, so
  search engines and teachers can find them. Interactive practice runs on the page. This follows the crawlability work
  (`docs/SEO.md`), and it is how revision sites win their traffic.

### 5.2 Pages

| Page | What it does |
|---|---|
| Specification | Topics with the student's standing (from Specification Mastery); buttons for a topic test, a personalised paper and a mock; a link to the board's own past papers |
| Topic | Its points, each with note, questions and flashcards; filters by type, difficulty, marks, tier and skill; "Practise this topic" |
| Point | The revision note, its diagrams, its questions, its flashcards, the lesson link, the student's standing |
| Question | Exam-paper layout, with marks on the right. Attempt, hints, mark, then the mark scheme, model answer, examiner notes, mistakes and Revise links |
| Test / mock | Timed or untimed, one question per screen or the whole paper; flag for review; submit; marking (self-assessment step for extended answers); results by question, topic and assessment objective; weak points; "Practise these next" |
| Results history | Every test, with the trend per topic |

### 5.3 Quality bar

- **Design:** the Gradify design system (`docs/DESIGN-SYSTEM.md`), in both themes. Exam questions look like an exam
  paper: numbered parts, marks on the right, answer lines sized to the marks.
- **Accessibility:**
  - every control is reachable by keyboard and named for screen readers;
  - marking results are announced;
  - colour is never the only signal;
  - every diagram has a text alternative (the diagram specs already carry one);
  - timed tests offer extra time (25% or 50%) and no timer, as access arrangements do.
- **Performance:**
  - a topic's notes and questions are separate modules of under 60 KB each, loaded on demand;
  - the engine is under 30 KB;
  - diagrams are SVG;
  - opened pages work offline;
  - budgets are enforced in CI.

## 6. Content

### 6.1 Volume

AQA GCSE Biology 8461 has 97 points. At scale that is:

- one note per point;
- 6 to 10 questions per point across difficulties and types;
- about 700 questions and 3,000 marks for one specification, before mock papers, which are generated.

Most points are shared with Combined Science, so one bank serves two specifications.

### 6.2 Writing standard (`docs/PAST-PAPERS-CONTENT-STANDARD.md`, written in phase 1)

- The board's command words, used as its specification defines them, in Gradify's own definitions.
- Original contexts and data; no stems or diagrams adapted from papers.
- Mark schemes written to award marks, not to describe an answer: one creditable idea per point, with accepted and
  rejected variants.
- Model answers that earn full marks and no more, plus examiner notes on why each mark is given.
- A spread of difficulty and of AO1 (knowledge), AO2 (application) and AO3 (analysis and evaluation) close to the
  real papers'.
- British spelling, SI units, the board's conventions for significant figures and units.

### 6.3 Workflow and review status

1. **Draft:** written by a subject author, AI-assisted drafting allowed. Not published.
2. **Checked:**
   - the validator passes;
   - calculations are proved by `check()`;
   - a second author has checked every answer and mark scheme;
   - the originality check passes.

   Published, labelled "Checked by Gradify".
3. **Reviewed:** an independent subject teacher or examiner has reviewed it, with name, date and the specification
   version recorded (as `coverage.js` requires for "verified"). Labelled "Reviewed".

A topic is released when every item is at least "checked". The label tells students how far to trust it.

### 6.4 Specification changes

Every item records the specification version it was written for. When a board updates a specification, a script lists
the changed points and every item that maps to them, and those items go back to "draft" until checked.

## 7. Connections

- **Attempt records:** each marked part is one attempt record, `context: "revision"`, on its point's main lesson, with
  the question id and version. Progress, the Mastery Engine and Specification Mastery read it with no new pipeline.
  Self-assessed and AI-assisted marks are `provisional`; the Mastery Engine already gives a provisional attempt a third of a final one's weight.
- **Flashcards:**
  - the notes' `T:` and `Q:` lines become flashcards for the point;
  - a mark point the student misses can be added to their deck in one tap ("the mark you missed");
  - flashcard reviews are evidence too.
- **Lessons:** each note, question and missed mark links to its lesson. Each lesson links back to its point's
  questions ("Exam questions on this").
- **Specification Mastery:** it supplies the student's standing on every page and the weakest points for personalised
  papers. Past Papers gives it most of its evidence.
- **Today and revision priorities:** weak points and due flashcards feed the existing Today page. A student who has
  booked an exam date gets a revision plan across the specification.
- **AI tutor:** on Ultra, "explain this mark scheme", "why didn't my answer get this mark", and a similar question
  generated for practice. AI-generated questions are clearly labelled and never added to the bank without review.

## 8. Plans and pricing

As the roadmap decided (§6): ordinary practice is free.

| | Free | Pro | Ultra |
|---|---|---|---|
| Revision notes, diagrams, flashcards | ✓ | ✓ | ✓ |
| Questions with mark schemes, model answers, self-marking | ✓ | ✓ | ✓ |
| Topic tests | ✓ | ✓ | ✓ |
| Personalised papers, full timed mocks, results history and analytics | — | ✓ | ✓ |
| AI marking of extended answers, "why didn't I get this mark", similar questions | Taste allowance | Taste allowance | ✓ |

## 9. Phased roadmap

Each phase ends with something students can use, released on its own. Nothing merges or deploys without the owner's
approval.

| Phase | Outcome | Exit criteria |
|---|---|---|
| **0. Consolidate** (days) | One canonical branch: `claude/past-papers-cell-biology` with the `-v1` features ported; this document agreed; Specification Mastery merged | Owner approves the canonical branch and this plan; #169 merged |
| **1. Engine and pilot** (2–3 weeks) | The data model (§3) and engine under `kit/revision/` with validator, marking (including M/A marks and levels), papers from blueprints, the UI of §5 in the course tab; **AQA GCSE Biology 4.1 Cell biology complete**: 12 notes, at least 6 questions per point (about 75), a topic test; the content standard and review workflow | Every 4.1 item "checked"; validator, unit and browser checks green; Lighthouse performance and accessibility ≥ 95 on the pages; owner sign-off on the pilot |
| **2. A whole specification** | AQA GCSE Biology 8461 all seven topics; Combined Science Trilogy sharing the Biology items; the top-level `/revise/` destination and public point pages; mixed tests and personalised papers | All 97 points with notes and questions; a teacher review of a sample |
| **3. Mocks and AI marking** | Full timed mocks from blueprints with results by topic and AO; access arrangements; Ultra AI marking of extended answers (the `mark` mode), missing keywords, similar questions; graph and drawing inputs | Mock results match hand-marking on a test set; AI marking agrees with a teacher's marks on a sample before it's offered |
| **4. More subjects and boards** | AQA Chemistry and Physics (the Chemistry Lab and Maths Lab as interactive question types), then Maths; then Edexcel, OCR, WJEC for the same subjects, sharing questions where the content matches | Per specification, the phase 2 criteria |
| **5. Every Gradify site** | A-level, Scottish qualifications, professional exams (SQE, NMC, pharmacy) through the same engine: their specifications in `kit/specs`, their question types registered | — |

## 10. Risks

| Risk | Mitigation |
|---|---|
| Copying, even accidentally | Original-only rule in the standard; source field enforced; originality check; reviewers trained on it; licensed material only with a recorded licence |
| Wrong answers or mark schemes | `check()` for calculations; two-person checking; review status shown; a "report a problem" link on every item, feeding a review queue |
| Content volume outruns review | Release topic by topic; a topic is published only when every item is checked; AI drafting never skips checking |
| Specification changes | Version recorded per item; changed points send items back to draft (§6.4) |
| Two sessions building the same thing again | One canonical branch, registered in the roadmap §9 before work starts; every session checks GitHub first |
| Page weight as content grows | Per-topic modules, CI size budgets, static generation for public pages |

## 11. Decisions for the owner

1. **Canonical branch:** `claude/past-papers-cell-biology`, with the `-v1` features ported (recommended).
2. **Name and place:** "Past Papers" or "Revise" for the top-level destination, at `/revise/` or `/papers/`.
3. **Who reviews:** whether to recruit subject teachers or examiners as paid reviewers for the "Reviewed" status, from
   phase 1 or phase 2.
4. **Pricing:** confirm §8, especially that topic tests are free and mocks are Pro.
5. **Order after Biology:** Chemistry and Physics next (sharing Combined Science), or Maths (with the Maths Lab).
