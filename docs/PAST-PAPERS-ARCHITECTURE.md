# Gradify Revise: product architecture and phased roadmap

**Version 2, 24 November 2026. Architecture for the owner's final review: nothing in it is built or merged.** Version 2
records the owner's decisions (§12) and adds:

- specification versioning and change management (§7);
- preservation of learners' history (§8);
- configurable exam blueprints (§3.5);
- honest coverage reporting (§9);
- separate review levels (§6.3).

This document is the plan for the Revise and Past Papers workstream; it supersedes §4 of
[the learning environment roadmap](LEARNING-ENVIRONMENT-ROADMAP.md), which stays the register of who is doing what.

**What approval of this document would and wouldn't mean.** Approving it agrees the architecture only. It doesn't
authorise implementation, merging or deleting either pilot branch, or deploying anything; each needs the owner's own
approval. Specification Mastery (#169) and the Chemistry Lab (#170) are separate decisions, and their green CI isn't
approval.

## 1. The ambition

**Revise** is a flagship Gradify product: one revision and exam-preparation engine for every qualification and exam
board Gradify covers, of the breadth students expect from the best revision sites, with Gradify's own content and
identity. It lives at `/revise/`, with these areas:

| Area | What it is |
|---|---|
| **Revision notes** | Concise notes per specification point: original diagrams, key definitions, equations, worked examples, misconceptions, exam tips |
| **Topic practice** | Exam-style questions by topic and point, filterable by type, difficulty, marks, tier and skill; hints, marking, retries |
| **Past papers and exam questions** | The question bank with mark schemes, worked solutions, model answers and examiner notes; links to the boards' own past papers (Gradify hosts official papers only with a licence) |
| **Flashcards** | Each point's key terms and facts, in the existing spaced-repetition system |
| **Timed assessments** | Topic tests and mixed tests built from configurable blueprints (§3.5) |
| **Full mock exams** | Whole papers to the real exam's structure, timed, with results by topic and assessment objective |
| **Progress and exam readiness** | Specification Mastery: standing per point, weak areas, what to do next, and how complete Gradify's coverage is (§9) |

**What makes it Gradify's:** it is one learning system, not a library beside the courses.

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

1. **One engine, filled subject by subject.** One data model, one marking engine, one set of pages for all 31
   subject sites. Adding a specification means adding content files and a blueprint, not code.
2. **Specification first.** Everything is keyed to specification points (`kit/specs`), so a topic, a test, a mock and
   a learner's weak areas are the same structure.
3. **Original content only.** Every note, question, mark scheme and diagram is Gradify's own. Nothing from Save My
   Exams, exam boards or any other publisher is scraped, copied or paraphrased. Official papers are linked on the
   board's own site until there is a licence (roadmap §8).
4. **Honest about review and coverage.** A label claims only the review that happened (§6.3). Coverage is shown as it
   is, including what's missing (§9). Self-assessed and AI-suggested marks are labelled and recorded as provisional.
5. **Deterministic marking decides; AI explains or suggests.**
6. **Premium, fast and accessible**, consistent with the rest of Gradify, in both themes.

## 2. The two pilots, and the canonical branch

Two sessions built a pilot for AQA GCSE Biology 4.1 Cell biology in parallel. **The owner's decision:**

- `claude/past-papers-cell-biology` (`de621913`) is the foundation.
- `claude/past-papers-v1` (`6252648a`) is kept until every worthwhile feature of it is ported and tested on the
  foundation, item by item, against the checklist below.
- Neither branch is merged or deleted without the owner's approval.

### Feature-preservation checklist

Status on 24 November, read from each branch's code and browser checks. "Port" means bring it onto the foundation. Each
row is verified by the named test before `-v1` can be retired.

| # | Feature | Foundation (`-cell-biology`) | `-v1` | Plan | Verified by |
|---|---|---|---|---|---|
| 1 | Mini practice: several questions, marked together at the end, with the lessons behind the marks lost | — | ✓ (five questions, weakest points first) | Port, as a blueprint-built topic practice (§3.5) | Browser check: a practice set marks at the end and lists lessons |
| 2 | Method marks: a wrong calculation can still earn M marks | — (score × marks, rounded down) | ✓ (self-ticked, never full marks) | Port, then extend to engine-checked M marks (§4) | Unit tests on M/A marking; browser check on a wrong answer |
| 3 | Error carried forward between parts | — | — | New in phase 1 (`ecf`, §3.3) | Unit test: a later part marked against the learner's own earlier answer |
| 4 | Best score per question on the topic list | Last marks shown ("3 / 4") | ✓ (best across markings) | Port best and keep latest, and show both | Browser check: two markings show the best |
| 5 | Automatic short-answer marking with accepted and rejected answers | — (written answers are self-assessed) | ✓ (e.g. "anaerobic respiration" is rejected) | Port as a short-answer mark-scheme rule | Unit tests, including the full-stop and rejected-word cases |
| 6 | Stricter validation | `check()` proves calculations; tick list = mark scheme; every point has a question; tier values | Marks add up; enough method marks for a calculation; no rejected answer inside an accepted one; points inside their group | Combine both validators | Each rule has a failing fixture in the tests |
| 7 | Keyboard use | ✓ (tested) | Partly (not tested) | Keep the foundation's | Its keyboard browser check |
| 8 | Offline | ✓ (tested) | Modules added to the offline shell, not tested | Keep the foundation's | Its offline browser check |
| 9 | Narrow screens | iPhone-sized tested | ✓ (iPhone and 320 px) | Add the 320 px check | Browser check at 320 px |
| 10 | Answers after "Show model answers" aren't evidence | ✓ | ✓ ("Just show the mark scheme" records nothing) | Keep | Existing checks |
| 11 | Tier and Biology-only badges | ✓ | — | Keep | Existing checks |
| 12 | Content: 12 + 12 questions | 51 marks | 63 marks | Merge the best of both into the pilot bank, each question re-checked (§6.3); none published twice | Validator, plus editorial check |
| 13 | Progressive hints | — | — | New in phase 1 (§4) | Browser check |
| 14 | Retries | — (one try, exam-style) | — (one marking) | New in phase 1: first try is the evidence, retries recorded as later attempts (§4) | Unit and browser checks |

## 3. Data model

Content is plain data in the repository, as lessons are: reviewable in pull requests, versioned, tested, published as
static files and available offline. Learners' answers use the existing attempt records; no new tables are needed for
content.

```
kit/specs/<spec>.js                       the specification, versioned (§7): topics → groups → points, flags, options
kit/revise/<spec>/<topic>/
  notes.js                                revision notes, one per point
  questions.js                            exam questions for the topic's points
kit/revise/<spec>/blueprints.js           assessment blueprints: topic tests, mixed tests, mocks (§3.5)
kit/revise/<spec>/coverage.js             generated: what exists against what the specification needs (§9)
kit/revise/reviews/<spec>.js              the review record: who checked or reviewed what, when (§6.3)
kit/revise/engine/                        model, validator, marking, assembly, impact (pure, Node-tested)
kit/revise/ui/                            the pages
```

### 3.1 Identity

Every item has a permanent id, `<spec>/<point>/<kind>-<n>` (e.g. `aqa-gcse-biology-8461/4.1.2.2/q-03`), and a version
`v` (§8). A question can serve several specifications. Combined Science refers to the Biology question's id with
`also: […]` rather than copying it.

### 3.2 Question: what every question must declare

```js
{
  id, v, points: ["4.1.2.2"], also: [],            // specification points (first = main)
  specVersion: "8461 v1.2",                        // the specification version it was written against (§7)
  source: "gradify" | "licensed:<board>",          // "licensed" only with a recorded licence
  tier: "both" | "higher" | "foundation", flags: ["sep"],
  difficulty: 1 | 2 | 3,                           // the validator requires a spread per point
  ao: { 1: 2, 2: 1 },                              // marks per assessment objective (the board's own list)
  skills: ["calculation", "graph", "practical:RP3", "maths:ratio", "extended"],
  context?: "…", figure?: { diagram } | { table } | { graph },
  parts: [part],
}
```

The validator refuses a question that lacks any of these. Blueprints (§3.5) select on exactly these fields, so a mock's
balance of objectives, difficulty and skills is designed, not random.

### 3.3 Part and mark scheme

A part is a question in the assessment library's shape (`Q`, `kit/assess/types.js`), plus its mark scheme. This is
the foundation pilot's model, extended with real mark-scheme conventions.

```js
{
  id: "a", marks: 3, command: "explain", ao: [1, 2],
  Q: { type: "num" | "sba" | "mcq" | "tf" | "multi" | "order" | "match" | "short" | "gap" | "label" | "graph" | "draw" | "extended", … },
  scheme: {
    kind: "points" | "levels",
    points: [{ id, text, marks: 1, type: "M" | "A" | "B" | "C", accept: [], reject: [], keywords: [], dependsOn?: id }],
    max: 3,                                        // "any three from …"
    levels: [{ level: 3, marks: [5, 6], descriptor }], indicative: ["…"],
    ecf: { from: "a" },                            // error carried forward from part (a)
  },
  hints: ["…", "…"],
  model: "…", working?: [{ step, why }], check?: () => number,
  examiner: "…", mistakes: ["…"], lessons: ["u05-03"],
}
```

Mark types follow exam convention:

- **M:** a method mark, earned for correct working even when the answer is wrong.
- **A:** an accuracy mark, which depends on its M mark.
- **B:** an independent mark.
- **C:** a communication mark (units, significant figures, a labelled diagram).

### 3.4 Revision note (one per point)

The existing notes format (`kit/course/notes.js`), so authors and the parser already know it, with two new tags:
`TIP:` (exam tip) and `NEED:` (what the point requires, in Gradify's words).

```
## Mitosis and the cell cycle
POINT: 4.1.2.2
S: one-sentence summary
T: chromosome | a long DNA molecule carrying many genes        (key definitions, also flashcards)
H: The cell cycle    P: …    - …    E: …    X: worked example    > step
D: bio-cell-cycle                                              (an original diagram from the pipeline)
!: common misconception
TIP: exam tip
NEED: what the specification requires here
LINK: u05-03                                                   (the lesson that teaches it properly)
Q: flashcard question | answer
```

### 3.5 Assessment blueprints

Every assessment is built from a **blueprint**, a configurable description of what it must contain. Random selection is
used only within a blueprint's constraints. There are four kinds:

| Kind | Example | Built by |
|---|---|---|
| Topic practice | Five questions on 4.1, weakest points first | A small blueprint per topic (the `-v1` mini practice, generalised) |
| Topic test | 4.1 Cell biology, 30 minutes, 30 marks | The topic's blueprint |
| Mixed test | 4.1–4.3, 45 minutes | A blueprint naming several topics |
| Mock | AQA 8461 Paper 1 Higher, 1 h 45 min, 100 marks | The paper's blueprint, from the board's published assessment structure, in Gradify's words |

```js
{
  id: "8461-paper1-higher", kind: "mock", title, minutes: 105, marks: 100, tier: "higher",
  topics: { "4.1": [20, 30], "4.2": [20, 30], "4.3": [20, 30], "4.4": [20, 30] },   // marks per topic, min–max
  ao: { 1: [38, 42], 2: [38, 42], 3: [18, 22] },                                     // marks per objective
  difficulty: { 1: [0.2, 0.3], 2: [0.4, 0.6], 3: [0.2, 0.3] },
  skills: { "maths:*": [10, 100], "practical:*": [15, 100], extended: [12, 18] },
  structure: "ascending-difficulty-per-question",
  personalise?: "weakest-points",                   // weight selection to the learner's weakest points
}
```

**Assembly:**

- The engine assembles a paper to satisfy every constraint, deterministically for a seed.
- If the bank can't satisfy a blueprint, the engine says which constraint failed and the assessment isn't offered.
  Coverage (§9) shows why; the engine never quietly hands out an unbalanced paper.
- A test in CI assembles every blueprint for several seeds, and fails on any constraint it can't meet.

### 3.6 Validation (every content file, in CI)

A content file fails CI unless all of these hold:

- **References:**
  - every point exists in the specification version the item names;
  - every lesson exists;
  - every diagram exists in the manifest.
- **Marks:**
  - the parts' marks add up;
  - the mark scheme can award exactly those marks;
  - every A mark has its M mark.
- **Completeness:** every part has a model answer, examiner notes, at least one mistake and its lessons.
- **Calculations:** `check()` agrees with the answer.
- **Answers:** no rejected answer is contained in an accepted one.
- **Declarations:** every question declares all of §3.2.
- **Status:** a published item has at least "Checked by Gradify" (§6.3), and `source` is `gradify` unless a licence is
  recorded.

**Automated validation is a gate, not a review level:** passing it is necessary for an item to be published, and is
never shown to learners as a review.

## 4. Marking engine

| Part type | Marked by | Result |
|---|---|---|
| Choice, true/false, multi-select, order, match, gap fill, label | The question library's handlers | Final |
| Short answer | Accept/reject rules and keywords, as words in the answer (`-v1`'s marking) | Final |
| Calculation | Answer within tolerance → all marks. Otherwise the learner's working is checked line by line against the worked solution for each M mark (the Maths Lab's step checker does this for algebra); where the engine can't follow it, the learner ticks method marks, which are self-assessed | Final, or provisional for ticked marks |
| Error carried forward | A later part is marked against the learner's own earlier answer, as examiners do | As the part |
| Graph and drawing | Plotted points within tolerance, line of best fit, labels | Final (phase 3) |
| Extended and levels of response | **Free:** the learner ticks the mark points made, or picks the level descriptor. **Ultra:** `course-tutor` mode `mark` judges each point, quoting the answer, and lists missing keywords; the learner can accept or change each | Provisional, always |

- **Hints** are progressive. Using one marks the attempt as assisted, but doesn't remove marks.
- **Retries:** the first try is the evidence. Retries are recorded as attempts 2, 3 and so on, so mastery sees both
  what was known and what was learned.
- **Missing keywords:** the words examiners look for are shown after marking, with those the answer didn't use listed.

## 5. Experiences and UI

### 5.1 Where it lives

- **`/revise/`:** the hub. The learner chooses their country, qualification, board, subject and specification; the
  choice is remembered in their profile. Every subject site links to it.
- **A Revise tab in each course:** the same pages for the course's specifications, with its lessons, flashcards and
  progress linked in place.
- **Public, crawlable pages:** each specification, topic and point note is generated at build time (`docs/SEO.md`).
  Interactive practice runs on the page.

### 5.2 Pages

| Page | What it does |
|---|---|
| Specification | Topics with the learner's standing and Gradify's coverage (§9); topic practice, timed assessments and mocks (when the blueprint is satisfiable); a link to the board's own papers |
| Topic | Its points, each with note, questions and flashcards; filters by type, difficulty, marks, tier and skill; coverage for the topic |
| Point | The revision note, diagrams, questions, flashcards, the lesson, the learner's standing |
| Question | Exam-paper layout, with marks on the right. Attempt, hints, mark, retry, then the mark scheme, model answer, examiner notes, mistakes and Revise links. The item's review label (§6.3) |
| Assessment | Timed or untimed; flag for review; submit; a self-assessment step for extended answers; results by question, topic and objective; "Practise these next" |
| Progress and exam readiness | Standing per point and topic, trend, history of assessments |

### 5.3 Quality bar

- **Design:** the Gradify design system, in both themes. Questions look like an exam paper.
- **Accessibility:**
  - complete keyboard and screen-reader use;
  - results are announced;
  - colour is never the only signal;
  - diagrams have text alternatives;
  - timed assessments offer 25% or 50% extra time, or no timer, as access arrangements do.
- **Performance:**
  - a topic's notes and questions load as separate modules of under 60 KB each;
  - the engine is under 30 KB;
  - opened pages work offline;
  - budgets are enforced in CI;
  - Lighthouse performance and accessibility scores are 95 or more.

## 6. Content and review

### 6.1 Volume

AQA GCSE Biology 8461 has 97 points. At scale that is one note per point and 6 to 10 questions per point, across
difficulties and types: about 700 questions and 3,000 marks per specification. Combined Science shares most of them.

### 6.2 Writing standard (`docs/REVISE-CONTENT-STANDARD.md`, phase 1)

- Use the board's command words as its specification defines them, explained in Gradify's own words.
- Use original contexts and data.
- Write mark schemes that award marks: one creditable idea per point, with accepted and rejected variants.
- Model answers earn full marks and no more.
- Examiner notes say why each mark is given.
- Match the spread of difficulty and assessment objectives to the real papers.
- Use British spelling, SI units and the board's conventions.

### 6.3 Review levels: what each claim means

Four separate things, recorded separately, each shown to learners only when it has really happened:

| | Who | What it establishes | Recorded | Shown to learners as |
|---|---|---|---|---|
| **Automated validation** | Code, in CI | Structure: references exist, marks add up, calculations are proved by `check()`, declarations complete | The CI run | Nothing: it's a gate for publishing, not a review |
| **Checked by Gradify** | A named Gradify editor, not the item's author | Every answer, mark scheme and explanation read and checked against the specification; originality check passed | Editor, date, specification version | "Checked by Gradify" |
| **Reviewed by a qualified teacher** | A paid, independent, qualified teacher of the subject | The explanation is sound and teachable, the model answer and mark scheme match what's expected at this level | Name, qualification, date, specification version, notes | "Reviewed by a qualified teacher" |
| **Reviewed by an experienced examiner** | A paid examiner with experience of this board and qualification (where available) | The mark scheme and model answers reflect how the board's examiners mark | Name, experience, date, specification version, notes | "Reviewed by an experienced examiner" |

The labels in order are: **Draft** (never published), then **Checked by Gradify**, then **Reviewed by a qualified
teacher**, then **Reviewed by an experienced examiner**. Each label applies to the item's version. A material change
(§8) sends the item back to Draft until it is checked again.

**Paid independent review starts in phase 1.** The Cell biology pilot may be published as "Checked by Gradify". It is
not presented as reviewed until a teacher has reviewed it, item by item. Reviewers work from a review pack, as the
Chemistry Lab's independent review does, and their verdicts are imported into `kit/revise/reviews/<spec>.js`. Nothing
claims a level of review that the record doesn't show.

## 7. Specification versioning and change management

Exam boards update specifications. Gradify must never quietly present material that no longer matches.

- **Specifications are versioned:**
  - `kit/specs/<spec>.js` records its version and a changelog;
  - each point records the version it was introduced or last changed in, and when it was withdrawn;
  - renamed or split points record their old ids (`replaces: ["4.1.2.2"]`).
- **Every item records the specification version it was written against** (`specVersion`). That covers notes,
  questions, mark schemes, diagrams used in Revise, and blueprints.
- **Impact report.** `node scripts/revise-impact.mjs <spec> <from> <to>` lists every affected:
  - note;
  - question;
  - mark scheme;
  - diagram;
  - blueprint;
  - flashcard;
  - lesson link.

  An item is affected when it is mapped to a point that changed, was withdrawn or was split. It also writes the
  review pack for those items.
- **Affected items are flagged, not hidden or silently kept:**
  - their status becomes **"Needs review after a specification change"**;
  - learners see that label on the item, and the item is left out of mocks;
  - CI fails if a published item maps to a withdrawn point;
  - blueprints are re-checked against the new structure.
- **Several versions at once.** During a changeover, learners sitting the old specification keep it (their choice is
  stored), and new learners get the new one.

## 8. Preserving learners' history

Attempts, best scores, confidence and mastery survive edits without misrepresenting what a learner did.

- **Attempts are never edited.** Each records the question's id and version (`id@v`), the specification version, and
  how it was marked (final or provisional), as the attempt schema already does with `question.v`.
- **Minor and material changes:**

  | Kind | Examples | Version |
  |---|---|---|
  | Minor | A typo, clearer wording that doesn't change the answer or the marks | Kept |
  | Material | A change to the answer, marks, mark scheme, points or tier | Bumped |

  The validator compares answers and schemes, so a material change can't be passed off as minor.
- **After a material change:**
  - earlier attempts stay in the learner's history, labelled "an earlier version of this question";
  - they still count as evidence for the points they were mapped to at the time;
  - they don't count as attempts at the new version: the best score shown is the best on the current version, with
    earlier versions' best listed separately.
- **When points change:** a mapping from old point ids to new ones (§7) carries mastery evidence across. Evidence for a
  withdrawn point stays in history but no longer counts towards the new specification. Confidence drops where evidence
  rests on changed points, as Specification Mastery already lowers confidence for older evidence.
- **Tests:** fixtures with attempts on version 1 of a question, then a material change to version 2, check the history,
  best score and mastery shown.

## 9. Honest coverage reporting

A learner must be able to tell full coverage from partial content. Gradify works out coverage at build time,
`kit/revise/<spec>/coverage.js`, from the content and the targets.

- **Targets per point**, set per specification:
  - a revision note;
  - at least 6 questions across 3 difficulties and the point's skills;
  - the assessment objectives the point is examined on;
  - flashcards;
  - a lesson.
- **Status per point, topic and specification:**
  - **Complete:** every target met.
  - **Partial:** shows what's there and what's missing, e.g. "Notes ✓ · 4 of 6 questions · no calculation questions
    yet".
  - **Not yet:** nothing is available.
- **Assessments only when the bank supports them.** A mock appears only when its blueprint is satisfiable. Otherwise
  the page says "Full mocks for this specification are coming: N more questions needed in topics X and Y".
- **Review is shown alongside coverage**, e.g. "62 questions · all checked by Gradify · 0 reviewed by a teacher yet".
- **The same figures everywhere.** The specification, topic and point pages and `quality.html` show the same numbers.
  The roadmap's release register counts a topic as released only when it is Complete and at least Checked.

## 10. Connections

- **Evidence:** each marked part is one attempt record, `context: "revise"`, on its point's main lesson, with `id@v`.
  Progress, the Mastery Engine and Specification Mastery read it with no new pipeline. The Mastery Engine already gives
  a provisional attempt a third of a final one's weight.
- **Flashcards:** a note's `T:` and `Q:` lines become flashcards for the point. A missed mark point can be added to the
  learner's deck in one tap. Reviews are evidence too.
- **Lessons:** notes, questions and missed marks link to lessons, and each lesson links back to "Exam questions on this".
- **Specification Mastery:** it supplies standing on every page and the weakest points for personalised assessments.
  Revise supplies most of its evidence.
- **Today and revision plans:** weak points and due flashcards feed Today. An exam date gives a plan across the
  specification.
- **AI tutor (Ultra):** "explain this mark scheme", "why didn't my answer get this mark", and similar questions. Those
  questions are labelled as AI-generated and never added to the bank without review.

## 11. Plans and pricing

Free must be genuinely useful, not a demonstration.

| | Free | Pro | Ultra |
|---|---|---|---|
| Revision notes, diagrams, flashcards | ✓ | ✓ | ✓ |
| Topic practice: every question, mark schemes, model answers, explanations, hints, retries | ✓ | ✓ | ✓ |
| Basic progress: standing per point and topic, coverage | ✓ | ✓ | ✓ |
| Topic tests | ✓ | ✓ | ✓ |
| Full timed mocks, mixed and personalised assessments | — | ✓ | ✓ |
| Advanced exam-readiness analytics: by assessment objective and skill, trends, predicted readiness | — | ✓ | ✓ |
| AI marking of extended answers, "why didn't I get this mark", similar questions | Taste allowance | Taste allowance | ✓ |

## 12. The owner's decisions (24 November 2026)

| Decision | Outcome |
|---|---|
| Canonical branch | `claude/past-papers-cell-biology`, with `-v1`'s worthwhile features ported and verified first (§2) |
| Name and place | **Revise**, at `/revise/`; Past Papers is a major section of it |
| Review | Paid independent subject-expert review from phase 1; four honest levels (§6.3) |
| Pricing | Topic practice, notes, explanations, retries and basic progress free; full mocks and advanced analytics Pro (§11) |
| Order | Biology, then **Chemistry**, then **Maths** |

## 13. Phased roadmap

Each phase ends with something learners can use, released on its own, and needs the owner's approval to start, merge
and deploy.

| Phase | Outcome | Exit criteria |
|---|---|---|
| **0. Consolidate** | The canonical branch with the §2 checklist complete; this architecture approved | Every checklist row verified by its test; owner approval |
| **1. Prove the whole engine on Cell biology** | Everything in the box below | Each capability below has its unit and browser checks; every 4.1 item at least Checked by Gradify; a paid teacher has reviewed the pilot (its items show "Reviewed" only after that); Lighthouse ≥ 95; owner sign-off |
| **2. A whole specification** | AQA GCSE Biology 8461, all seven topics, Combined Science sharing Biology items; the public `/revise/` hub and point pages; mixed and personalised assessments | All 97 points Complete (§9) and Checked; teacher review of every topic; examiner review of a sample where available |
| **3. Mocks and AI marking** | Full mocks from the paper blueprints; access arrangements; Ultra AI marking with missing keywords; graph and drawing inputs | Mock marking matches hand-marking on a test set; AI marking agrees with a teacher on a sample before it's offered |
| **4. Chemistry** | AQA GCSE Chemistry: equations and symbolic notation, multi-step calculations with method marks, reaction pathways (the Chemistry Lab's engine as question types), structures and practical interpretation | As phase 2 |
| **5. Maths** | AQA GCSE Maths: the Maths Lab's step checker as the engine for method marks on worked solutions | As phase 2 |
| **6. More boards and every Gradify site** | Edexcel, OCR, WJEC for the same subjects, sharing items where content matches; then A level, Scottish qualifications and professional exams through the same engine | Per specification, as phase 2 |

> **Phase 1 must prove the engine, not just add content.** The pilot covers 4.1 Cell biology end to end:
> - **Content:** 12 notes, at least 6 questions per point (about 75), covering every question type the topic uses.
> - **Marking:** every part type (§4), including M/A marks, error carried forward, a levels-of-response 6-marker,
>   short answers, hints and retries.
> - **Assessments:** topic practice and a topic test from blueprints, and a mixed-test blueprint ready for phase 2.
> - **Reporting:** the coverage report (§9).
> - **Change management:** an impact report run on a simulated specification change (§7).
> - **History:** a question's material change, with history preserved (§8).
> - **Review:** the full review workflow with a paid teacher (§6.3).
> - **Connections:** attempt records feeding Specification Mastery, flashcards from notes, and lesson links both ways.

## 14. Risks

| Risk | Mitigation |
|---|---|
| Copying, even accidentally | Original-only standard; `source` enforced; originality check; licensed material only with a recorded licence |
| Wrong answers or mark schemes | `check()` for calculations; editorial check by someone other than the author; paid teacher and examiner review; review labels shown; "report a problem" on every item, feeding the review queue |
| Content outruns review | Release topic by topic, only when Complete and Checked; AI-assisted drafting never skips checking |
| Specification changes | §7: versions, impact report, "Needs review" status, CI gates |
| History misrepresented after edits | §8: versions on every attempt, minor and material changes, per-version best scores |
| Thin content looking complete | §9: coverage targets, statuses and assessments offered only when satisfiable |
| Parallel sessions building the same thing | One canonical branch per workstream, registered in the roadmap before work starts; every session checks GitHub first |
| Page weight as content grows | Per-topic modules, CI budgets, static generation for public pages |

## 15. Approvals

| Item | State |
|---|---|
| This architecture (Revise) | Awaiting the owner's final review |
| Implementation (phase 0 onwards) | **Not authorised** |
| Merging or deleting either pilot branch | **Not authorised** |
| Specification Mastery (#169) | Awaiting the owner's explicit merge approval; CI green, which isn't approval |
| Chemistry Lab (#170) | Awaiting the owner's explicit merge approval; CI green, which isn't approval; its migration, function deployment and independent chemistry review are separate release steps |
