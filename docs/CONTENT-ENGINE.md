# The content engine

Milestone M1 of the Knowledge Engine Master Plan. AI writes lessons in Gradify's existing notes format (`kit/course/notes.js`), and scripts check, file and track them. One workflow runs the loop, and you approve by merging one rolling pull request. The rules are in `knowledge-engine/CORE/RULES.md`.

## The loop, per topic

A topic is one section of a specification (AQA 4.1.1.1 *Eukaryotes and prokaryotes*). Its requirements are the statements no existing lesson covers strongly (from `kit/curriculum/maps/<framework>.json`). Statements that are already taught are left for mapping.

1. **Research** (`prompts/research.md`, web search): one cited brief per topic at `content/research/<subject>/<topic>.txt`, with at least 3 independent sources. A brief is reused by every board and level that shares the topic, and redone only when its requirements or the research prompt change (the `# fp=` line).
2. **Write** (`prompts/writer.md` plus the content standard, notes format, shorthand and example lessons as one cached prefix): a unit file with `REQ:` lines.
3. **Gates**, cheapest first, stopping at the first failure (`scripts/content/gates.mjs`):
   1. `parse`: one lesson, known tags, lead over 60 characters, `LV:`, two or more `O:` and `T:`, at least one `REQ:`, and every `DIA:` spec is JSON with a title, caption and alt text.
   2. `coverage`: every `REQ:` names objectives, and each of those objectives has a question tagged with it. Every objective is tested.
   3. `qa`: the course QA rules (`scripts/qa-courses.mjs`) applied to the lesson. Two sections, a key point, two flashcards, two check questions with three wrong options and a real explanation, a right answer no more than 30% longer than the longest wrong one, dated `SRC:` lines, and a summary. The workflow also runs the full `npm run qa`.
   4. `spec`: no run of 8 or more words shared with the specification statement, and the statement's key terms appear. This needs the statement text, which is never committed: it's rebuilt with `engine.mjs fetch` and `import`, as the workflow does.
   5. `num-dia`: every `a op b = c` in worked examples, equations and paragraphs recomputes, every `NUM` answer matches its shown working, and every `DIA:` spec renders, passes its renderer's checks and the legibility check (no clipped or overprinted labels).
4. **Review** (`prompts/review.md`, a different model from the writer), only for lessons that pass every gate. It judges the lesson against its brief and requirements only.
5. **Repair**: failures go back as a `FIX` list. The Writer returns changed lines only (`REPAIR`), and the lesson goes through the gates again. This repeats up to `repairs` times (3).
6. **File**: passing lessons go to `content/drafts/<subject>/<framework>/<topic>.txt`, and the topic's record goes to `content/ledger/<subject>.json`. That record holds each lesson's tier, hash, whether the reviewer disagreed, its build record (brief, prompt and model versions, requirement hashes), plus the failures, uncovered requirements, research gaps (`GAP:`) and needed diagrams (`DNEED:`).

Tiers: **ai-verified** (gates and review passed), **expert-required** (high-risk: practicals, calculations, safety or health keywords, or a brief with a `CONFLICT:`), **expert-approved** (`gradify approve … --by "<name>"`), and **unchecked** (the text changed after it was checked: rule 14). Lessons the reviewer first failed are listed for an expert too.

Drafts are not yet in a course. Moving AI-verified drafts into a course's `notes/` and syllabus is the publish step. It waits on your decision about the label learners see for AI-verified lessons.

## Commands

```
node scripts/gradify.mjs run [--subject s] [--mode fast|cheap] [--minutes 30]
node scripts/gradify.mjs batch                 # cheap mode: Message Batches, half price, up to hours
node scripts/gradify.mjs research biology/microscopy [--force]
node scripts/gradify.mjs next                  # the next packet, to paste into the Writer project by hand
node scripts/gradify.mjs ingest [--review]     # check and file replies saved in content/inbox/
node scripts/gradify.mjs fixlist               # fix lists for everything that failed
node scripts/gradify.mjs status --write        # regenerates knowledge-engine/CORE/STATUS.json, NEXT_TASK.json, HANDOVER.md
node scripts/gradify.mjs approve biology/microscopy "Magnification" --by "Dr A. Reviewer"
node scripts/gradify.mjs signals               # repair queue from learners' wrong-answer rates
node scripts/gradify.mjs bench [--review] [--save]   # prompt changes must match or beat the saved score
```

Adding a framework means adding its registry row (`kit/curriculum/uk.js` and the other country files to come), importing it, proposing its map (`engine.mjs propose`), and adding its id to `frameworks` in `scripts/content/config.json`. It needs no code.

## Settings (`scripts/content/config.json`)

- **Models per job:** Haiku 5.5 for mapping, Sonnet 5.5 for research and review, Opus 5.5 for writing and repairs. The reviewer is a different model from the writer, so it doesn't share the writer's blind spots.
- **Effort and `max_tokens` per job.**
- **Mode:** `fast` uses the standard API with parallel requests and server-side fallbacks. `cheap` uses the Batch API.
- **Limits:** budget per run, run minutes, topics per run, repairs, high-risk rules and wave order.

Each job type's system prompt is one fixed prefix (rules, then format, then examples) with no dates or ids, so calls hit the prompt cache. The variable packet always comes last. `tests/content.test.mjs` checks that the prefixes are byte-identical.

## The workflow (`.github/workflows/content.yml`)

Each run has three jobs:

- **plan:** lists the subjects in the run.
- **write:** one matrix job per subject, in parallel. It fetches and imports the specification text, refreshes the student-signal queue, runs `gradify run` and the full course QA, and uploads its files.
- **publish:** commits everything to `content/rolling`, adds this run's spend to `content/spend.json`, opens or updates one PR with the generated description (`gradify pr`), then dispatches the next run.

The loop stops when nothing is queued, when the repository variable `CONTENT_LOOP` is `off`, or when total spend reaches `CONTENT_TOTAL_BUDGET_USD` (default $200). A nightly schedule restarts it.

It needs the `ANTHROPIC_API_KEY` secret, and Settings → Actions → General must allow Actions to create pull requests. Commits made with the workflow's token don't trigger CI on the PR. Close and reopen the PR, or push to it, to run CI before merging.

## Known gaps

- **No publish-to-course step yet.** It waits on the AI-verified label decision.
- **No mapping step yet.** Strong existing matches are skipped, not given `REQ:` lines. Mapping is the first job of M3.
- **No sub-requirements.** A requirement with several separately assessable parts is checked as one: coverage requires a question per objective, not per part.
- **No table for learners' reports of lessons.** Only wrong-answer rates (`assessment_attempts`) feed the repair queue, and suspect questions in live courses are listed for a person rather than repaired automatically.
- **No expert benchmark yet.** `bench` scores against `prompts/examples/` until reviewers approve the 50 benchmark lessons. Put those in `prompts/benchmark/`. All 9 examples pass every gate, including the give-away rule.
- **Source licences aren't checked per lesson.** Writers see only briefs, which are in Gradify's own words. Source licences are recorded in each brief's `SRC:` lines, but nothing yet blocks a lesson whose brief rests on `noncommercial` or `unknown` sources.

## When the rolling PR reports a systematic failure

Paste this into Claude Code:

> Fix Gradify's content engine. Check the repo state. The rolling PR #&lt;n&gt; shows this gate failing across many lessons: &lt;paste the failure summary&gt;. Read ONLY scripts/gradify.mjs, scripts/content/gates.mjs and the one script that gate calls. Fix the engine, not the lessons, add a test to tests/content.test.mjs that reproduces the failure, run `node --test tests/content.test.mjs`, push to a branch. No merge, deploy or publish.
