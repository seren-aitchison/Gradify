# Gradify as a learning environment: Labs, Past Papers and Capture

**Version 1.2, 23 November 2026.** This is the product roadmap for three additions: Interactive Subject Labs, Past Papers and Specification Practice, and Gradify Capture (Ultra). It records the owner's direction, checks it against what is already in the repository, and sets out the release order. Version 1.1 recorded the owner's decisions (§8) and added the workstream register (§9); 1.2 adds the release register (§10) and the rule that every merge is independently deployable.

**This document is the shared source of truth for the learning environment.** Every conversation or session working on Labs, Past Papers, Specification Mastery or Ultra reads it before planning or building, records its branch and status in §9, and proposes changes here as edits rather than deciding them elsewhere. Work that isn't pushed to a branch can't be seen by anyone else, so push early.

**Nothing in this document has been built yet.** Each batch below starts only on the owner's approval.

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

**Consequence for the order:** the two unmerged branches are useful foundations, but being useful doesn't mean they should be merged straight away. Each is reviewed on its own against current main, its tests and its release requirements, and merged only on the owner's approval (batch 0, §7):

- **Organic Chemistry Lab:** its chemistry rules need independent review, and its migration and tutor deployment are outstanding.
- **Specification Mastery:** its mapping of 8461 to lessons and its use of AQA's wording need checking.

Neither blocks Maths Lab work, which builds on main.

## 3. Interactive Subject Labs

### 3.1 Chemistry Lab: finish and release safely

Already built (§2). What stands between it and students:

1. Review `claude/organic-chemistry-lab` against current main: rebase or merge main into the branch (not the other way round), re-run its browser journey suite and `scripts/check-organic-lab.cjs`, and list what its migration and tutor deployment need. Merge into main only on the owner's approval.
2. Close the open items in its own backlog (M60–M62) and the second-audit correctness fixes.
3. Independent chemistry review of the rule set using its existing review pack (`docs/organic-review/`). Until then the lab keeps its "provisional" notice, which is the right release posture: ship it labelled, don't hold it back.
4. Register its challenges for evidence (`kit/courses/chemistry/interactives.js`, `evidence.js`) so they feed mastery like the other 161 interactives.

### 3.2 Maths Lab: from step checker to workspace

The step checker already does the hardest part of the vision: **it checks the student's own working line by line** rather than generating an answer. **Maths Lab is the step checker, improved; there is no second Maths Lab.** It extends `kit/interactive/stepcheck.js` and the sets in `kit/courses/maths/steps/`, in the same shape as the Chemistry Lab (one problem, connected modes).

**Owner's priorities, in order:** rule explanations for every step; recognising and explaining common mistakes; reveal one step at a time; graphs and visual representations; more topics and broader specification coverage. Input: MathLive for notation, with typed input kept; handwriting later.

| Your requirement | Today | To build |
|---|---|---|
| 1. Write with a maths editor | Plain text with a forgiving parser (`x²`, `√`, `½`, implicit multiplication) | MathLive (MIT-licensed, **decided**) emitting the same text the parser reads, beside the existing typed input, which stays; rendered preview of every line |
| 1. Handwriting | — | **Later, and Ultra.** Handwriting-to-maths recognition is a paid API or a model call per line; accuracy on school handwriting must be measured before it ships |
| 2. Choose a question or enter your own | Authored sets only | "Your own problem" for the problem kinds the checker can verify (solve an equation, expand, factorise, differentiate, integrate). For its own problems the checker knows the target by solving numerically, so it can still check lines |
| 3. Work through it interactively | Yes | Keep |
| 4. Expand each step to see the rule | Authored `hints` and `why` only | **Step rules:** classify each accepted line against the previous one (expanded, factorised, collected terms, applied the same operation to both sides, zero-product rule, square-rooted both sides, used the quadratic formula). Each class has an authored rule card. Deterministic, so it works on the student's own lines, not only the model solution |
| 5. Where a mistake happened and why | Where: yes. Why: generic | **Mistake diagnosis:** named error patterns tested against the faulty line (sign error moving a term, divided by a variable and lost a root, dropped the negative square root, expanded `(a + b)²` as `a² + b²`). Unrecognised errors get the AI tutor, given the two lines and the checker's verdict as evidence, as the Chemistry tutor is |
| 6. Graphs, substitutions, alternative methods | Separate graph explorer | Graph mode in the workspace (the roots of `x² − 5x + 6` as the curve's crossings); a substitution check of the final answer; several authored solution paths per problem (factorise, complete the square, formula), with the student's path recognised |
| 7. Try the next step before revealing it | Reveal-all only | Reveal one step at a time; "Show me the next step" costs a hint, and the outcome is recorded as Assisted |

**First release scope:** step rules, mistake patterns and one-step reveal on the six existing sets, then graph mode, then MathLive. More topics (mapped to specification points once Specification Mastery has a maths specification) and "your own problem" follow. The numeric equivalence check is a check, not a proof (its own comment says so); the workspace must never present it as a proof.

## 4. Past Papers and Specification Practice

### 4.1 Licensing is the gate, so it comes first

Official papers, mark schemes and specification wording are copyright of the awarding bodies, and papers often contain third-party copyright material (passages, photographs, data) that the board itself had to clear. **Publicly downloadable doesn't mean redistributable**, and Gradify is a commercial service with paid tiers. Before any official material is reproduced:

| Material | Default position until confirmed |
|---|---|
| Past papers and mark schemes | **Link to the board's own page; don't host, copy or transcribe.** Contacting boards about a licence is deferred until there is a clear licensing requirement and commercial plan (owner's decision) |
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

Capture is its own workstream and branch, but **not a separate product**: it uses the same account, plan check, AI infrastructure, allowances, saved resources and learning intelligence as the rest of Gradify. It is never a standalone screenshot chatbot.

### 5.0 What Ultra must reuse (from main)

| Need | Reuse, don't rebuild | Where |
|---|---|---|
| Is this user on Ultra? | The plan helpers. **Internal ids differ from names:** `plus` = Gradify Pro, `pro` = Gradify Ultra (renamed in `9533d2d0`); stored waitlist rows also still say "Gradify Pro" for Ultra | `kit/data/billing.js` (`PLAN_NAME`, plan inclusion), `kit/data/plan.js`, `kit/data/waitlist.js` |
| Ultra on sale | The existing switch: Ultra stays off until Gradify AI is switched on | `kit/data/billing.js` |
| AI calls, prompt safety, escaped output | The course tutor and its modes | `supabase/functions/course-tutor`, `kit/assess/tutor.js`, `tutor_modes` migration |
| Metering and limits | Monthly AI allowances, fair-use windows, AI controls; an upgrade link from an allowance error | migrations `billing_and_ai_allowances`, `monthly_ai_windows`, `ai_controls`; `kit/data/functions.js` |
| Saved resources | Gradify Notes, flashcards and SRS, rather than a separate Capture library format | `kit/learning/srs.js`, the flashcard engine (`docs/FLASHCARD-ENGINE.md`) |
| Learning intelligence | Attempt records and the Mastery Engine; Specification Mastery once merged | `kit/learning/mastery.js`, `assessment_attempts` |
| Marketing | The homepage Ultra section and "Notify me" list already exist; Capture copy goes there, not a new page | `index.html` (`#pro`, `ultra-list`) |

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
3. **Academic integrity.** "Screenshot any question, get the answer" is also a cheating tool, and schools will judge Gradify by it. **Decided:** Capture opens in guided tutoring by default (guide the student to the next step), with a clear control for the level of help the student wants, up to a full worked answer. This matches the Maths Lab's one-step reveal. Gradify's terms say Capture isn't for live assessments.
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

**Decided:** ordinary practice stays free, as the pricing page promises; only genuinely advanced features (timed full papers, breakdowns, analytics) are in Pro. Limits and prices should be set from measured usage and AI cost before launch (`docs/AI-COSTS.md`).

## 7. Release order

Workstreams run independently (§9). Writing and maintaining this roadmap never holds up Maths Lab or Past Papers: both build on foundations that exist.

| # | Batch | Outcome | Depends on |
|---|---|---|---|
| 0a | **Review the Organic Chemistry Lab branch** | Brought up to date with main on its own branch, tests re-run, migration and tutor deployment listed; merge only on approval | — |
| 0b | **Review the Specification Mastery branch** | Same; 8461 mapping and wording checked; merge only on approval | — |
| 1 | Chemistry Lab release | Backlog closed, evidence registered, released as provisional; independent review commissioned | 0a approved |
| 2 | **Maths Lab v1 (start now)** | Step rules, mistake patterns, one-step reveal on the six sets; then graph mode; then MathLive | — |
| 3 | **Past Papers v1 (start now)** | Question bank format; AQA 8461 Cell biology in original questions with spec points, model answers, mark points and lessons; experience A, then B with deterministic marking. The format and questions are built on main's spec-point ids so they don't wait for 0b; the Specification Mastery link switches on when 0b merges | — (link: 0b) |
| 4 | Capture backend (Ultra workstream) | Tables, private storage, RLS, `capture-chat` on the shared tutor, Capture History, deletion | Ultra reconciliation (§9) |
| 5 | Chrome extension | First Capture client | 4; DPIA (§5.3) |
| 6 | Past Papers v2 | AI marking of extended answers; more topics; full papers (C) | 3 |
| 7 | macOS menu-bar app | System-wide Capture | 4, Apple Developer account |
| 8 | Shared intelligence | Capture and past-paper evidence in Specification Mastery and revision priorities; "Make flashcards from this capture" | 0b, 3, 4 |

## 8. Decisions

### Decided (owner, 23 November 2026)

| Decision | Outcome |
|---|---|
| Merge both branches? | **Not yet.** Review and approve each independently (batches 0a, 0b) |
| Past Papers content | Original Gradify questions first; link to official papers |
| AQA licensing | **Deferred** until there is a clear licensing requirement and commercial plan |
| Practice pricing | Ordinary practice free; genuinely advanced features in Pro |
| Capture behaviour | Guided tutoring by default, with clear user control over the level of help |
| Maths input | MathLive for notation, typed input kept; handwriting later |
| Maths Lab | Improve the existing step checker; no second implementation |

### Still open

1. Who owns the Apple Developer and Chrome Web Store accounts, and in whose name are they registered?
2. Whether Specification Mastery may show AQA's point wording, or should paraphrase and link (part of batch 0b).

## 9. Workstreams

One product roadmap, independent workstreams. Each workstream has one branch at a time, keeps its row below current, and reads §1, §2 and §8 before planning. **No workstream merges into main, deploys, runs migrations or touches production without the owner's approval.** **Every merged feature must be deployable on its own:** if something it depends on isn't live yet (a migration, an edge function, another branch), it ships behind a feature flag or falls back gracefully, so main can always be deployed. A workstream that finds a missing requirement proposes it as an edit to this document.

| Workstream | Branch | Scope | Status (23 Nov 2026) |
|---|---|---|---|
| Roadmap | `claude/nifty-pascal-noklf9` | This document | v1.1 |
| Chemistry Lab | `claude/organic-chemistry-lab` | §3.1 | Built, unmerged. Priority 1: CI and release-readiness checks for its pull request (#170, as reported by the owner) |
| Specification Mastery | `claude/epic-meitner-yb9cad` | Spec engine, AQA 8461 | Built, unmerged; its own release review runs alongside the three priorities (0b) |
| Maths Lab | `claude/maths-lab-step-rules` | §3.2 | Priority 2. Step rules, named mistakes and Show the next step implemented and pushed (§10); not yet in a pull request |
| Past Papers | — | §4 | Priority 3: the first complete specification-linked question set. Not started |
| **Ultra / Capture** | **unknown** | §5, the Ultra plan's AI features | **Reconciliation pending.** A separate conversation reports Ultra work, but no Ultra or Capture branch exists on the remote as of this version (checked all branches for "ultra", "capture" and "extension"). The only Ultra code in the repository is on main: plan names and switches, the homepage Ultra section and its waitlist. That workstream must push its branch, add its row here and report against §5 |

### Ultra reconciliation checklist

For the Ultra workstream to complete and record here:

1. What is implemented (branch, commits, files) and what is only planned.
2. For each item in §5.0: does the Ultra work reuse it, or does it duplicate it? Duplicates are listed with a plan to converge on the shared piece.
3. Any Ultra feature beyond Capture (for example AI features in the Ultra plan list on the homepage) and how it maps onto §6.
4. Requirements the Ultra work found that this roadmap is missing, as proposed edits.
5. No restarting or overwriting existing work; no merge, deploy or migration.

## 10. Release register

Implemented, merged and available to students are different milestones, so each is recorded separately. A workstream updates its row when a milestone is reached, with the evidence (commit, test run, pull request, deploy, live check). "—" means not reached.

| Feature | Branch | Implemented | Tests passed | PR opened | Approved for merge | Merged | Deployed | Live verification |
|---|---|---|---|---|---|---|---|---|
| Organic Chemistry Lab | `claude/organic-chemistry-lab` | ✓ | To confirm against current main | #170 (owner) | — | — | — | — |
| Specification Mastery (AQA 8461) | `claude/epic-meitner-yb9cad` | ✓ | To confirm against current main | — | — | — | — | — |
| Maths Lab: step rules, named mistakes, Show the next step | `claude/maths-lab-step-rules` | ✓ (23 Nov) | ✓ Unit tests (7 new; the step checker, maths tools and interactives suites pass). Browser check not yet run | — | — | — | — | — |
| Past Papers v1 | — | — | — | — | — | — | — | — |
| Capture backend | — | — | — | — | — | — | — | — |

**What "Tests passed" means here:** the feature's own tests and the suites it touches pass, and the full suite shows no new failures compared with main. On 23 November the full suite has 21 failures on main itself (the database, billing and deploy tests that need a local Postgres or production configuration); a branch is measured against that baseline, not against zero.

