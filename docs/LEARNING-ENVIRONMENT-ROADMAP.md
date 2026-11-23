# Gradify as a learning environment: Labs, Past Papers and Capture

**Version 1.0, 23 November 2026.** This is the product roadmap for three additions: Interactive Subject Labs, Past Papers and Specification Practice, and Gradify Capture. It records the owner's direction, checks it against what is already in the repository, and sets out the release order and the decisions still open. **Nothing in this document has been built yet.** Each batch below starts only on the owner's approval.

> **Product principle.** Whatever a student doesn't understand, wherever they encounter it, Gradify should help them understand it, practise it and remember it.

## 1. One system, not four features

```
                        One student account · one learning profile
   ┌────────────────┬───────────────────┬─────────────────┬──────────────────┐
   │ Subject Labs   │ Past Papers       │ Gradify AI      │ Gradify Capture  │
   │ Chemistry,     │ Specifications,   │ Explanations,   │ Chrome, macOS,   │
   │ Maths, later   │ practice, model   │ tutoring,       │ saved            │
   │ subjects       │ answers           │ personalisation │ conversations    │
   └───────┬────────┴─────────┬─────────┴────────┬────────┴─────────┬────────┘
           └──────── Shared learning intelligence (already on main) ┘
   attempt records → Mastery Engine (kit/learning/mastery.js, BKT) → Specification Mastery
   → weakest points → lesson and practice recommendations → revision priorities
```

Every new surface must do two things to count as part of Gradify rather than beside it:

1. **Produce evidence** through the existing attempt record (`ctx.record`, `assessment_attempts`, the four outcomes in `docs/INTERACTIVE-ROADMAP.md`), keyed to course and lesson, so Specification Mastery picks it up with no new pipeline.
2. **Link back to a lesson** ("Revise this concept") through the lesson ids that specifications already map to.

**The rule carried over from the Organic Chemistry Lab applies to every lab:** a deterministic engine decides what is correct; the AI explains, and never decides correctness.

## 2. What already exists

The plan is further along than it looks. Three of the four pillars have real foundations, but two of them are on unmerged branches.

| Pillar | What exists | Where | State |
|---|---|---|---|
| **Chemistry Lab** | Skeletal drawing, electron-flow mechanism engine (charges derived, electrons conserved), 35-reagent predictor with rule evidence, SN1/SN2/E1/E2 competition, synthesis planner, exam-style marking with error carried forward, 3D mode, AI tutor bound to the engine's evidence, browser journey suite | `origin/claude/organic-chemistry-lab` (9 commits, ~5,800 lines ahead of main), `docs/ORGANIC-LAB.md` on that branch | **Not merged.** Every rule is `provisional`: no independent review yet |
| **Maths Lab** | Line-by-line step checker that finds the exact line where an error crept in; expression parser (no `eval`) and numeric equivalence; 6 problem sets (linear, expanding, factorising, quadratics, differentiation, integration) with hints, worked solutions and attempt records; graph explorer | `kit/interactive/stepcheck.js`, `mathexpr.js`, `grapher.js`, `kit/courses/maths/steps/` | **On main.** Your quadratic example (`x² − 5x + 6 = 0`) is already problem `quad-1` |
| **Specification Mastery** | Board-agnostic engine and pages; coverage, demonstrated mastery and confidence kept apart; per-point pages; 5-minute target practice; AQA GCSE Biology 8461 mapped onto SciGradify Biology; `system`/`qualification`/`board` ids | `origin/claude/epic-meitner-yb9cad`, `docs/SPEC-MASTERY.md` on that branch | **Not merged** (2 commits ahead) |
| **Gradify AI** | Course tutor edge function grounded in lesson notes, tutor modes, usage metering, monthly AI allowances, AI controls | `supabase/functions/course-tutor`, migrations `tutor_usage`, `tutor_modes`, `billing_and_ai_allowances`, `ai_controls` | On main |
| **Billing tiers** | Free, Pro (`plus`, £10/month), Ultra (`pro`, "Coming soon", adds Gradify AI) | `pricing.html`, `kit/data/limits.js`, `docs/BILLING.md` | On main |
| **Past papers** | Nothing beyond a YouthGradify lesson on using past papers | — | Not started |
| **Capture** | Nothing | — | Not started |

**Consequence for the order:** the first job isn't building, it's landing the two branches. The Organic Chemistry Lab and Specification Mastery are both prerequisites for the rest of this roadmap, and every week they stay unmerged makes the merge harder (main moves quickly: 179 remote branches today).

## 3. Interactive Subject Labs

### 3.1 Chemistry Lab: finish and release safely

Already built (§2). What stands between it and students:

1. Merge `claude/organic-chemistry-lab` into main and re-run its browser journey suite and `scripts/check-organic-lab.cjs` against the merged site.
2. Close the open items in its own backlog (M60–M62) and the second-audit correctness fixes.
3. Independent chemistry review of the rule set using its existing review pack (`docs/organic-review/`). Until then the lab keeps its "provisional" notice, which is the right release posture: ship it labelled, don't hold it back.
4. Register its challenges for evidence (`kit/courses/chemistry/interactives.js`, `evidence.js`) so they feed mastery like the other 161 interactives.

### 3.2 Maths Lab: from step checker to workspace

The step checker already does the hardest part of the vision: **it checks the student's own working line by line** rather than generating an answer. Maths Lab builds a workspace around it, in the same shape as the Chemistry Lab (one problem, connected modes).

| Your requirement | Today | To build |
|---|---|---|
| 1. Write with a maths editor | Plain text with a forgiving parser (`x²`, `√`, `½`, implicit multiplication) | A structured equation editor that emits the same text the parser reads (MathLive is MIT-licensed and fits); rendered preview of every line |
| 1. Handwriting | — | **Later, and Ultra.** Handwriting-to-maths recognition is a paid API or a model call per line; accuracy on school handwriting must be measured before it ships |
| 2. Choose a question or enter your own | Authored sets only | "Your own problem" for the problem kinds the checker can verify (solve an equation, expand, factorise, differentiate, integrate). For its own problems the checker knows the target by solving numerically, so it can still check lines |
| 3. Work through it interactively | Yes | Keep |
| 4. Expand each step to see the rule | Authored `hints` and `why` only | **Step rules:** classify each accepted line against the previous one (expanded, factorised, collected terms, applied the same operation to both sides, zero-product rule, square-rooted both sides, used the quadratic formula). Each class has an authored rule card. Deterministic, so it works on the student's own lines, not only the model solution |
| 5. Where a mistake happened and why | Where: yes. Why: generic | **Mistake diagnosis:** named error patterns tested against the faulty line (sign error moving a term, divided by a variable and lost a root, dropped the negative square root, expanded `(a + b)²` as `a² + b²`). Unrecognised errors get the AI tutor, given the two lines and the checker's verdict as evidence, as the Chemistry tutor is |
| 6. Graphs, substitutions, alternative methods | Separate graph explorer | Graph mode in the workspace (the roots of `x² − 5x + 6` as the curve's crossings); a substitution check of the final answer; several authored solution paths per problem (factorise, complete the square, formula), with the student's path recognised |
| 7. Try the next step before revealing it | Reveal-all only | Reveal one step at a time; "Show me the next step" costs a hint, and the outcome is recorded as Assisted |

**First release scope:** GCSE and A level algebra (the six existing sets), editor, step rules, mistake patterns, one-step reveal, graph mode. Calculus and "your own problem" follow. The numeric equivalence check is a check, not a proof (its own comment says so); the workspace must never present it as a proof.

## 4. Past Papers and Specification Practice

### 4.1 Licensing is the gate, so it comes first

Official papers, mark schemes and specification wording are copyright of the awarding bodies, and papers often contain third-party copyright material (passages, photographs, data) that the board itself had to clear. **Publicly downloadable doesn't mean redistributable**, and Gradify is a commercial service with paid tiers. Before any official material is reproduced:

| Material | Default position until confirmed |
|---|---|
| Past papers and mark schemes | **Link to the board's own page; don't host, copy or transcribe.** Seek written permission or a licence from each board |
| Examiner reports | Same as papers |
| Specification wording | Specification Mastery (unmerged) already shows 8461 point wording. **Confirm AQA's terms cover this use before that branch is released**, or paraphrase points and link to the official text |
| Original Gradify questions in exam style, mapped to specification points | **No restriction.** This is the safe foundation |
| Command words, assessment objectives, paper structure | Facts, not wording: fine to describe in our own words |

**Recommendation:** build the whole Past Papers experience on **original Gradify exam-style questions** first, mapped to specification points, and add licensed official papers as a content source later, behind the same interface. The product doesn't depend on the licence; the licence improves it.

### 4.2 Organisation

Country → Exam board → Qualification → Subject → Specification → Topic → Paper/question. This already matches the specification data: `system` (country/curriculum), `qualification`, `board`, `subject`, `code`, then `topics → groups → points` in `kit/specs/<id>.js`. Past Papers adds one layer, **questions** that reference specification points:

```
question = { id, spec: "aqa-gcse-biology-8461", points: ["4.1.3.1"], marks, source: "gradify" | "licensed:<board>",
             stem, parts: [{ id, marks, input: "short" | "extended" | "number" | "maths" | "choice" | "diagram",
             markPoints: [{ id, text, accept, reject }], model, why, commonMistakes, lessons }] }
```

One question bank, keyed to specification points, serves all three experiences below and feeds Specification Mastery directly. It lives at a top-level destination (`/papers`, and a "Past papers" tab beside the `#/spec` tab in each course), not inside one course.

### 4.3 The three experiences, in release order

| | Experience | Marking | Notes |
|---|---|---|---|
| **A** | **Interactive model answers:** question and marks, model answer, why each point earns its mark, reasoning, common mistakes, *Revise this concept* | None needed | Ships first: pure content, no marking risk |
| **B** | **Mini exam practice:** 3–6 questions on a topic or on your weakest specification points | Deterministic for choice, number and maths answers (the maths checker). **Extended answers:** AI marking against the question's mark points, showing which points were met and which were missing | AI marking draws on the Ultra/AI allowance. Each mark point is a separate judgement with its quoted evidence from the answer, so a student can see why |
| **C** | **Full timed papers** with a question-by-question breakdown | As B | Needs enough questions per specification to assemble a balanced paper |

Every answered part writes an attempt against its specification points' lessons, so Specification Mastery updates with no extra work. Mark-point misses become the "where you're struggling" items on the point's page.

**First subject:** AQA GCSE Biology 8461, because Specification Mastery already maps it. Start with one topic (Cell biology, 4.1) to prove the loop end to end before writing questions at scale.

## 5. Gradify Capture (Ultra)

### 5.1 Backend first

Both clients use one backend, so it's built first (agreed).

| Piece | Design |
|---|---|
| `captures` table | `id, user_id, image_path, created_at, title, subject, course, spec_points[], lessons[], folder, tags[], favourite, source ('chrome'|'macos'|'web'), deleted_at` |
| `capture_messages` table | `id, capture_id, role, content, created_at, model, tokens` |
| Image storage | A **private** Supabase Storage bucket, path `user_id/capture_id.png`, read through short-lived signed URLs; row-level security on both tables so a user sees only their own |
| `capture-chat` edge function | Reuses the course tutor's prompt-safety and output escaping, tutor modes and AI allowance metering. Identifies subject, specification points and lessons, and links them |
| Deletion | Deleting a capture removes the row, its messages and the image object at once (not just `deleted_at`); "Delete all captures" in account settings; included in account deletion and data export |
| Capture History | A page in the Gradify account: thumbnails, date, title, subject, spec points, lesson links, folders, tags, favourites, search. "Make flashcards from this" and "Add to revision" connect it to the existing flashcard and SRS engines |

### 5.2 Clients

| | Chrome extension (first) | macOS menu-bar app (second) |
|---|---|---|
| Trigger | Toolbar icon or shortcut only | Menu-bar icon or global shortcut only |
| Capture | Manifest V3, `activeTab` + `chrome.tabs.captureVisibleTab` on the click, then a crop overlay. **No `<all_urls>` host permission**, so the store listing asks for nothing standing | ScreenCaptureKit; needs the macOS Screen Recording permission, which the app explains before the system prompt |
| Panel | Side panel with the shared chat UI | Floating panel beside the selection |
| Sign-in | Gradify session handed over from the site | Same, via the browser and a custom URL scheme |
| Distribution | Chrome Web Store review | Apple Developer ID, notarisation; outside the Mac App Store at first |

**Never in the background:** no capture without a click or keypress, no upload without the student pressing Send, and the image is shown before it is sent.

### 5.3 Risks to settle before Capture ships

1. **Children's data.** Many GCSE students are under 18 and some under 13. The UK Age Appropriate Design Code applies: high-privacy defaults, no use of captures for model training, clear retention, parental route for under-13s. A DPIA before launch.
2. **Other people's data in screenshots.** A capture of a group chat or a class list contains other people's information. Default retention, easy deletion and no secondary use limit the exposure.
3. **Academic integrity.** "Screenshot any question, get the answer" is also a cheating tool, and schools will judge Gradify by it. Recommendation: Capture opens in the existing **tutoring mode** (guide the student to the next step, then reveal on request), consistent with the Maths Lab's one-step reveal, and Gradify's terms say Capture isn't for live assessments.
4. **Cost.** Every capture is a vision model call. It sits inside the Ultra AI allowance and is metered like the tutor.

## 6. Tiers

Your proposal and the live pricing page mostly agree. The live positioning is: **Free** for learning (lessons with a per-course limit, labs, practice questions), **Pro** organises and manages learning, **Ultra** adds Gradify AI.

Proposed placement, keeping "learn free" intact:

| | Free | Pro | Ultra |
|---|---|---|---|
| Chemistry and Maths Labs (deterministic checking, hints, step rules) | ✓ | ✓ | ✓ |
| Past Papers A: model answers | ✓ | ✓ | ✓ |
| Past Papers B: mini practice, deterministic marking | ✓ (limited) | ✓ | ✓ |
| Past Papers C: full timed papers and breakdowns; Specification Mastery analytics | — | ✓ | ✓ |
| AI marking of extended answers, AI step explanations, handwriting input | Taste allowance | Taste allowance | ✓ |
| Gradify Capture (Chrome, macOS, Capture History) | — | — | ✓ |

**One tension to decide:** your outline puts "advanced learning" and "expanded practice" in Pro. The pricing page currently promises that labs and practice questions are free, so moving practice behind Pro would change a public promise. The table above keeps learning free and puts organising, timed papers and analytics in Pro. Limits and prices should be set from measured usage and AI cost before launch (`docs/AI-COSTS.md`).

## 7. Release order

| # | Batch | Outcome | Depends on |
|---|---|---|---|
| 0 | **Land the foundations** | Merge Organic Chemistry Lab and Specification Mastery into main; re-run both suites; confirm AQA's terms for 8461 wording | — |
| 1 | Chemistry Lab release | Backlog closed, evidence registered, released as provisional; independent review commissioned | 0 |
| 2 | Maths Lab v1 | Workspace, editor, step rules, mistake patterns, one-step reveal, graph mode on the six existing sets | — (can run beside 1) |
| 3 | Past Papers v1 | Question bank format; AQA 8461 Cell biology in original questions; experience A, then B with deterministic marking | 0 |
| 4 | Capture backend | Tables, private storage, RLS, `capture-chat`, Capture History page, deletion | — |
| 5 | Chrome extension | First Capture client | 4; DPIA (§5.3) |
| 6 | Past Papers v2 | AI marking of extended answers; more topics; full papers (C) | 3 |
| 7 | macOS menu-bar app | System-wide Capture | 4, Apple Developer account |
| 8 | Shared intelligence | Capture and past-paper evidence in Specification Mastery and revision priorities; "Make flashcards from this capture" | 3, 4 |

The order differs from your outline in three places: batch 0 is new, Maths Lab v1 can run alongside the Chemistry release because it doesn't touch the same code, and Past Papers v2 (AI marking) comes after the Chrome extension so that AI marking and Capture share one round of AI cost and safety work.

## 8. Decisions for the owner

1. **Approve batch 0?** Merging the Organic Chemistry Lab and Specification Mastery branches into main.
2. **Licensing:** confirm that Past Papers starts on original Gradify questions, links to official papers rather than hosting them, and that someone contacts AQA (and later other boards) about a licence.
3. **Tiers:** keep practice free and put timed papers and analytics in Pro (§6), or move expanded practice into Pro as in your outline?
4. **Capture's default mode:** tutoring (guide first) or direct answers?
5. **Apple Developer account and Chrome Web Store account:** who owns them, and in whose name are they registered?
6. **Maths editor:** adopt MathLive (MIT), or keep typed input and add a symbol palette only?
