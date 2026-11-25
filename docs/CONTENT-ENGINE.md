# The content engine

Milestones M1 and M1.5 of the Knowledge Engine Master Plan. AI writes lessons in Gradify's existing notes format (`kit/course/notes.js`), and scripts check, file, publish and track them. You approve by merging one rolling pull request. The rules are in `knowledge-engine/CORE/RULES.md`.

The work runs in **agent mode**: Claude Code sessions on your subscription do the writing, with no API key. The paid API path (`gradify run` and `.github/workflows/content.yml`) is still built, and is switched off by `"provider": "agent"` in `scripts/content/config.json`.

## The loop, per topic

A topic is one section of a specification (AQA 4.1.1.1 *Eukaryotes and prokaryotes*). Its requirements are the statements no existing lesson teaches. Strong matches are checked first (see Mapping): confirmed ones get `REQ:` lines on the existing lesson, and rejected ones are written like any other gap.

1. **Research** (`prompts/research.md`, web search): one cited brief per topic at `content/research/<subject>/<topic>.txt`, with at least 3 independent sources. A brief is reused by every board and level that shares the topic, and redone only when its requirements or the research prompt change (the `# fp=` line).
   - **Source allowlist** (`kit/curriculum/sources.js`): the request lists the publications that may be cited (`ALLOW` lines), and a brief citing anything else is refused. Each source's licence class is taken from its row, whatever the Researcher wrote. A row may say `adapt` only if its licence allows commercial reuse of the text, and it counts as `adapt` only once a named person has confirmed it (`confirmedBy`, `confirmedOn`); until then it's `facts`. The three independent sources must come from three different publishers on the list.
   - **Licence gate:** a brief isn't used if any non-fact line rests only on `noncommercial` or `unknown` sources. Facts (`F:`) may rest on any source. The research step is asked again, with the problem named.
2. **Write** (`prompts/writer.md`, the content standard, the notes format, the shorthand and the example lessons for the level): a unit file with `REQ:` lines.
   - A `REQ:` line may name a requirement or one part of it, such as `aqa-gcse-biology:4.1.1.1.b.ii`. A part counts toward its requirement.
3. **Gates**, cheapest first, stopping at the first failure (`scripts/content/gates.mjs`):
   1. `parse`: one lesson, known tags, a lead over 60 characters, `LV:`, two or more `O:` and `T:`, at least one `REQ:`, and every `DIA:` spec is JSON with a title, caption and alt text.
   2. `coverage`: every `REQ:` (or part) is in the packet and names objectives, each of those objectives has a question tagged with it, and every objective is tested. Every `PRE:` names a lesson in the course or the unit, or a requirement id in the registry.
   3. `qa`: the course QA rules and the course's lesson standard (`tests/sciences.test.mjs`), so a filed lesson can be published:
      - two sections, a key point, two flashcards and a summary;
      - at least four questions, a hard (M3) one, and two difficulty levels;
      - three wrong options with a real explanation, and the right answer no more than 30% longer than the longest wrong one;
      - six or more content blocks, and dated `SRC:` lines of a known kind with https links.
   4. `spec`: no run of 8 or more words shared with the specification statement, and the statement's key terms appear (some of them for a part). This needs the statement text, which is never committed: rebuild it with `node scripts/curriculum/engine.mjs fetch <framework>` and `import <framework>`.
   5. `num-dia`: every `a op b = c` recomputes, scientific notation included. Every `NUM` answer matches its shown working, and every `DIA:` spec renders, passes its renderer's checks and the legibility check.
4. **Review** (`prompts/review.md`): only for lessons that pass every gate. A different model from the writer judges each lesson against its brief and requirements only.
5. **Repair**: failures go back as a `FIX` list, the Writer returns changed lines only (`REPAIR`), and the lesson goes through the gates again. This repeats up to `repairs` times (3).
6. **File**: passing lessons are merged by title into `content/drafts/<subject>/<framework>/<topic>.txt`, and the topic's record goes to `content/ledger/<subject>.json`. The record holds:
   - each lesson's tier, hash, whether the reviewer disagreed, and its build record (`scripts/content/build.mjs`): the brief's key and text fingerprint, a hash of each prompt file (writer, review, shorthand), the models that wrote and reviewed it, its template (the content standard, the notes format and the level's example lessons) and the requirement hashes. When any of these changes, `gradify next` and `work` send back only the requirements those lessons teach. When the rebuilt lesson files, the old one is marked superseded, and a rebuild that fails `repairs` times isn't retried until something changes again;
   - the topic's failures, uncovered requirements, research gaps (`GAP:`) and needed diagrams (`DNEED:`).
7. **Publish** (`gradify publish <subject>`): AI-verified and expert-approved lessons go into the course through the rolling PR. Merging it is the owner's approval. What learners see:

   | Tier | Label learners see | Published? |
   |---|---|---|
   | **ai-verified** (gates and review passed) | **AI-checked**: "Written and checked by AI against cited sources. A subject expert hasn't reviewed it yet." | Yes |
   | **expert-approved** (`gradify approve … --by "<name>"`) | **Expert-reviewed** | Yes |
   | **expert-required** (practicals, calculations, safety or health keywords, or a brief `CONFLICT:` the lesson relies on and doesn't resolve: decision G) | none | Not until approved |
   | **gates-passed** (a hand ingest with no review) | none | No |
   | **unchecked** (the text changed after it was checked: rule 14) | none | No; its earlier published version stays |

   Each subject has one published unit, "Specification lessons", with one module per topic. It is generated into two files:
   - `kit/courses/<subject>/published.js`: the unit's syllabus block, permanent ids, blurb, track and QA record;
   - `kit/courses/<subject>/notes/uNN.js`: the lessons, each with its `TIER:` line.

   The first publish adds one import of `published.js` to the course's `syllabus.js`, `ids.js`, `qa.js` and `course.js`. Biology is wired already. Published ids are permanent: a lesson once published is never removed.

## Agent mode (no API key)

`node scripts/gradify.mjs work biology` does every step a script can do, then prints the steps that need a model. Each step is a request file the engine wrote and a reply file a subagent writes, both in `content/queue/<subject>/<topic>/`, with the model and the exact prompt to give it:

| Step | Model (config `agent.models`) | What the subagent does |
|---|---|---|
| research | sonnet | Finds pages with web search, opens each with `scripts/content/fetchtext.sh` (the web-fetch tool runs outside this environment's network proxy and can't reach most hosts), and writes the brief from pages it read |
| write | opus | Writes the unit file from the packet only |
| repair | opus | Writes changed lines only |
| review | sonnet | A fresh subagent that never saw the writing, on a different model. It judges only against the requirements and brief, and writes `REV` lines |
| map | haiku | Confirms or rejects strong matches |

Each topic gets its own subagents, so every context stays small. Running `work` again reads the replies and moves each topic on. When topics are filed, it prints the commit steps: `publish`, `pr`, `status --write`, commit, push to `content/rolling`, and open or update the PR with `content/PR.md`.

Every state is a file, so a session can stop at any time and the next one carries on. Near the usage limit, start no new steps: commit what's filed and stop. The hourly scheduled session's whole prompt is:

> Run Gradify's content engine for biology. Check out content/rolling (create it from main if it doesn't exist) and merge main into it. Run `node scripts/curriculum/engine.mjs fetch aqa-gcse-biology && node scripts/curriculum/engine.mjs import aqa-gcse-biology`, then follow `node scripts/gradify.mjs work biology` exactly: start every step it prints as a subagent with the model and prompt it gives, then run it again, until it says DONE or you are near the usage limit. Commit and push whenever it says COMMIT NOW, and keep the content/rolling pull request's description up to date from content/PR.md. Change no engine code. Never merge.

Faster, for free, while you're awake: open more Claude Code sessions and send each `Run gradify work for <subject>` with the prompt above. Topics in flight are in `content/queue/`, so give each session a different subject.

## Mapping

The matcher (`scripts/curriculum/engine.mjs propose`) links statements to existing lessons. For each strong link nobody has confirmed, `work` asks a cheap subagent whether the lesson really teaches the statement.

- **Yes:** the lesson gets `REQ: <id> @<objectives>` after its objectives. That's metadata only; the lesson's content isn't touched.
- **No:** the statement joins the write queue.

Decisions are recorded in `content/mapping/<framework>.json`.

## Student data as QA

`gradify signals` reads two sources with the Supabase service role:

- **Wrong-answer rates** (`assessment_attempts`): questions far below the share correct their difficulty predicts.
- **Learners' reports** (`lesson_reports`, migration `20261125120000_lesson_reports.sql`): one "wrong" report, or two of any kind.

Only counts leave the database, and only for real course slugs. The results feed the rolling PR's "Learners flagged" list.

## Commands

```
node scripts/gradify.mjs work <subject> [--limit n] [--json] [--no-map]   # agent mode
node scripts/gradify.mjs next [--emit]         # the next packet to paste by hand, or (--emit) write the queue's request files
node scripts/gradify.mjs publish <subject>     # AI-checked and expert-reviewed drafts into the course
node scripts/gradify.mjs ingest [--review]     # check and file replies saved in content/inbox/ (gates only without --review)
node scripts/gradify.mjs fixlist               # fix lists for everything that failed
node scripts/gradify.mjs status --write        # regenerates knowledge-engine/CORE/STATUS.json, NEXT_TASK.json, HANDOVER.md
node scripts/gradify.mjs approve biology/microscopy "Magnification" --by "Dr A. Reviewer"
node scripts/gradify.mjs signals               # repair queue from learners' answers and reports
node scripts/gradify.mjs bench [--review] [--save]   # prompt changes must match or beat the saved score
node scripts/gradify.mjs pr [--out file]       # the rolling PR's description, from the ledgers as they are now
node scripts/gradify.mjs run | batch           # the paid API loop: only with "provider": "api" or --provider api
```

**Requirement records.** Each statement in a committed index (`kit/curriculum/specs/<id>.json`) has a `status` and a `type`, and the index has `version`, `published` and `applies` (`{ from, to }`, where `to` is null while the specification is current). They come from the registry row on import. The queue refuses an index without them.

**Status ladder.** `gradify status` (`ladder`, also in HANDOVER.md) counts frameworks by country and wave-1 subject (not researched, framework found, spec imported). It then counts each imported specification's requirements by the highest rung they've reached: spec imported, mapped, drafted, gates passed, AI-verified, expert-required, expert-approved, published, needs update. "Needs update" outranks the rest because it's work to do.

**Views, not copies.** Flashcards (`Q:`), the specification explorer (`kit/course/spec-view.js`, from `REQ:` lines), the glossary (`T:`) and the question bank are all drawn from the notes. Never write them as separate content.

Adding a framework means adding its registry row (`kit/curriculum/uk.js` and the other country files to come), importing it, proposing its map (`engine.mjs propose`), and adding its id to `frameworks` in `scripts/content/config.json`. It needs no code.

## The API path (off)

Set `"provider": "api"` and add the `ANTHROPIC_API_KEY` secret to use it.

- **Models:** `models` in the config are API model ids: Haiku 5.5 for mapping, Sonnet 5.5 for research and review, Opus 5.5 for writing and repairs.
- **Modes:** `fast` uses parallel standard calls with fallbacks; `cheap` uses the Batch API.
- **Caching:** each job's system prompt is one fixed, dateless prefix, so calls hit the cache.

The workflow runs one job per subject, publishes into `content/rolling` and restarts itself. It stops when nothing is queued, when `CONTENT_LOOP` is `off`, or when `CONTENT_TOTAL_BUDGET_USD` (default $200) is reached. It also needs Settings → Actions → General to allow Actions to create pull requests.

## Known gaps

- **No expert benchmark yet.** `bench` scores against `prompts/examples/` until reviewers approve the 50 benchmark lessons; put those in `prompts/benchmark/`.
- **No way for learners to file a report yet.** The `lesson_reports` table exists, but no site page writes to it.
- **Signals are listed, not repaired.** Suspect questions and reported lessons in live courses go to a person, not into automatic repairs.
- **Parts aren't detected.** Sub-requirements are whatever the Writer names. Parts aren't found in the specification text automatically.
- **AQA layout only.** `scripts/curriculum/aqa.mjs` reads AQA's science specifications (biology and chemistry checked). Other bodies need AI extraction with a script check, which isn't built yet (M2).
- **NCBI Bookshelf's licence page** returns a reCAPTCHA to automated requests, so its row has no quoted licence and stays facts-only until a person checks it.
- **The PGlite rehearsal isn't a real deploy.** The migration passes it; applying it to the live database is the owner's step.

## When the rolling PR reports a systematic failure

Paste this into Claude Code:

> Fix Gradify's content engine. Check the repo state. The rolling PR #&lt;n&gt; shows this gate failing across many lessons: &lt;paste the failure summary&gt;. Read ONLY scripts/gradify.mjs, scripts/content/gates.mjs and the one script that gate calls. Fix the engine, not the lessons, add a test to tests/content.test.mjs that reproduces the failure, run `node --test tests/content.test.mjs`, push to a branch. No merge, deploy or publish.
