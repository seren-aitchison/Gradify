# Gradify Flashcard Intelligence

How Gradify turns a learner's notes into accurate, checked, personalised flashcards, what's built, what's planned, and why. Written 17 November 2026.

The engine is a subsystem of Gradify Intelligence, not a separate app. It reuses what already exists: the knowledge pack (`kit/notes/pack.js`), the AI usage ledger and allowances (`supabase/functions/_shared/ai.js`), FSRS-5 (`kit/learning/srs.js`), the Mastery Engine (`kit/learning/mastery.js`), card ordering (`kit/intel/order.js`), the learner event ledger (`kit/intel/ledger.js`) and adaptive card needs (`kit/intel/cardgen.js`).

---

## 1. The pipeline

```
notes (pasted text, PDF text layer, or a scanned PDF sent whole to Claude)
  │
  ▼
01 Document understanding ─ browser: tidy shorthand, split clauses, resolve "it"/"they" (studio.js)
  │                         AI: Claude reads the text or the PDF pages directly
  ▼
02 Knowledge extraction ─── one knowledge pack: topics → facts. Each fact has a statement, kind, importance,
  │                         Bloom level, prerequisites, an exact quote and page (PACK_SCHEMA)
  ▼
03 Concept intelligence ─── importance (core / supporting / bonus), prerequisites, topic grouping, why/apply
  │                         questions per topic; Gradify Earth and the dependency graph use the same pack
  ▼
04 Card generation ──────── card type chosen from what the fact is: definition, reverse, cloze, why,
  │                         compare, sequence, misconception; one fact per card; apply/why questions
  ▼
05 Quality assurance ────── in code: quote found in the notes, answer supported by the notes, list answers
  │                         split, near-duplicates merged, the reviewer's checks (refineCards)
  │                         AI: an independent review of every card: keep / revise / reject (REVIEW_PROMPT),
  │                         then every correction checked again in code (applyReview); coverage of core facts
  ▼
06 Personalisation ──────── the learner's own results pick a focus (recall / apply / explain / compare) that
  │                         shapes the next pack (focus.js → FOCUS in the prompt); cardgen.js proposes cards
  ▼
07 Memory ───────────────── FSRS-5 decides when a card is due; Gradify Intelligence decides which due cards
                            matter most today. Every review is a learning event.
```

Two rules hold throughout:

- **Code checks; the model doesn't get the last word.** A quote must be found in the notes (`groundingScore`), the answer must be supported by the notes (`answerSupport`), and a reviewer's correction goes through the same checks as the original card. An LLM is never trusted to certify its own accuracy.
- **Scheduling and priority stay separate.** FSRS-5 is never bent to encode importance. It answers "when will they forget this?"; `kit/intel/order.js` answers "which of today's due cards matter most?".

### What's in this change

| Stage | Built | Where |
|---|---|---|
| Bloom levels and prerequisites on every AI fact and card | ✓ | `PACK_SCHEMA`, `cardsFromPack`, `levelOf` |
| Comparison, sequence and misconception cards | ✓ | `CARD_TYPES`, `SYSTEM_PROMPT` |
| One fact per card (list answers split into one cloze per item) | ✓ | `splitList` |
| Near-duplicate merging (bigram similarity, answer-aware) | ✓ | `similarity`, `refineCards` |
| Deterministic reviewer checks, shown to the learner as plain advice | ✓ | `reviewCard`, deck view |
| Independent AI review (keep / revise / reject), inside one ledger claim | ✓ | `REVIEW_PROMPT`, `applyReview`, `study-pack` |
| Coverage of core facts after review | ✓ | `coverage`, `packStats` |
| Personal focus from the learner's results, as fixed values only | ✓ | `kit/learning/focus.js`, `focusOf` |
| Typed recall with fuzzy grading | ✓ | `kit/learning/typed.js` |
| Mastery dimensions for the new card types | ✓ | `DIMENSION_OF_KIND` in `mastery.js` |
| Eval measures review rejections and facts tested | ✓ | `scripts/eval-notes.mjs` |

The independent review can be switched off without a deploy: set the Supabase secret `GRADIFY_PACK_REVIEW=off`.

### Not built yet (planned, in order)

1. **Document structure for Word, PowerPoint and scans in the browser.** Today: PDF text layer and `.txt`/`.md` in the browser; scanned PDFs go whole to Claude. See Docling below.
2. **Cross-document duplicates and concept matching.** Today's duplicate check works within a pack. Across a learner's whole library it needs embeddings (section 4).
3. **Image occlusion and diagram cards.** Needs stored images and an editor, and the frontend is out of scope here.
4. **Storing level and prerequisites as columns.** They're in the pack's JSON now (`packs.pack`) and recomputed for browser cards. Section 3 has the migration plan.

---

## 2. Repository and licence audit

Checked on 17 November 2026 from each repository's own `LICENSE` and dependency files. **No code was copied from any of them.** Gradify's implementations were written from scratch, using ideas only. Licence checks on the AI-generated parts of Gradify itself are outside this audit.

| Repository | Licence | What it's good for | Used? | Notes |
|---|---|---|---|---|
| [docling](https://github.com/docling-project/docling) | MIT | Converting PDF, DOCX, PPTX and scans into structured documents (reading order, tables, formulas) | Not yet | Python, with ML models: it can't run in the browser or in Supabase Edge (Deno). It needs its own service (a container with a Python runtime). The licences of its layout and OCR models are separate from the code licence and must be checked before production. |
| [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) | MIT | The reference FSRS scheduler | Already, as the test oracle | `kit/learning/srs.js` is FSRS-5, matched to ts-fsrs 4.7.1 to six decimal places over 1,000 random histories (`docs/FSRS.md`). Kept as a dev dependency only, so the scheduler is dependency-free in the browser. |
| [pdf2anki](https://github.com/NicholasMcCarthy/pdf2anki) | MIT | The closest architecture: heading-aware chunks, strategies, a reviewer model, quote checks, fuzzy and embedding deduplication | Ideas only | **Its PDF reading uses PyMuPDF (`fitz`), which is AGPL-3.0** unless a commercial licence is bought. Don't bring that dependency into Gradify's commercial product. |
| [FlashMind](https://github.com/0xmortuex/FlashMind) | **None found** | A feature reference: typed recall, image occlusion, mistake tracking | Typed recall idea only | No licence means all rights reserved. Nothing may be copied. |
| [quicklearn](https://github.com/artbyjazi/quicklearn) | MIT | Source-to-learning-material workflow, mastery drilling | No | Gradify's Mastery Engine already covers mastery-driven drilling. Its full dependency tree (`uv.lock`) wasn't audited. |
| [anki-llm-flashcard-generator](https://github.com/mauroforlin/anki-llm-flashcard-generator) | MIT | Semantic chunking, parallel calls, `.apkg` export | No | **Depends on `pymupdf4llm` (AGPL-3.0).** Semantic chunking matters for documents longer than a model's context; Gradify's packs are capped (`ai_plan_caps.pack_chars`) well inside Claude's. |
| genanki (if `.apkg` export is wanted) | MIT, per its repository | Anki deck files | No | Python. Gradify already exports CSV for Anki. A JavaScript `.apkg` writer would avoid a Python service. |

### Decisions

- **Mistral: not adopted.** Gradify AI already runs on Claude, with structured output, prompt caching, a usage ledger, per-plan allowances, cost caps and a fallback for refusals, all tested. Switching providers means rebuilding and re-validating all of that for savings that couldn't be measured here. Mistral's documentation wasn't reachable from this environment, so its current prices and limits are unverified. Revisit only with a side-by-side eval on Gradify's own notes (`npm run eval:claude` is the harness to extend).
- **Docling: deferred, not rejected.** It's the right tool once Word and PowerPoint uploads matter, or for structure in the browser path. It needs a small hosted service, which is an infrastructure decision for the owner. Until then, scanned PDFs go to Claude, which reads the pages directly.
- **Embeddings: deferred.** Within one pack, bigram similarity plus answer checks catches rewordings. Across a library, embeddings and `pgvector` are the right approach. Anthropic doesn't offer an embeddings API, so this adds a vendor (for example Voyage AI, which Anthropic recommends). Decide that when cross-document duplicates are measured to be a problem.

---

## 3. Data model and migration plan

### How content and learner state are already split

- **Course flashcards** (lessons on every Gradify site) are content in code (`kit/courses/*`), shared by every learner. Each learner's memory of them is their own (`course_progress` and FSRS state). That is already "one card, many students, individual mastery".
- **Cards from a learner's own notes** belong to that learner (`cards`, with RLS). They're written from private notes, so sharing them across learners would be wrong.

### Proposed migration (not written as a migration file, and not applied)

Additive only, so existing clients keep working. It's kept in this document rather than in `supabase/migrations/`, so nobody applies it by accident with `supabase db push`.

```sql
-- 1. What each card tests, queryable (today: in packs.pack JSON, or derived from cards.kind)
alter table public.cards
  add column level text check (level in ('remember', 'understand', 'apply', 'analyse')),
  add column prerequisites text[] not null default '{}',
  add column reviewed text check (reviewed in ('kept', 'revised')),      -- the AI reviewer's verdict
  add column issues text[] not null default '{}';                         -- reviewCard() at save time

-- 2. Generation runs, for quality and cost over time (stats already sit in packs.stats; this makes them queryable)
create table public.pack_quality (
  pack_id uuid primary key references public.packs (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  cards int not null, rejected int not null default 0, revised int not null default 0,
  fact_coverage real, grounded real, levels jsonb, created_at timestamptz not null default now()
);
alter table public.pack_quality enable row level security;
create policy "own quality rows" on public.pack_quality for select using (user_id = auth.uid());
-- inserted by the study-pack function with the learner's own token, like packs

-- 3. Later, with embeddings (section 4): one vector per card, for cross-document duplicates and concept matching
-- create extension if not exists vector;
-- alter table public.cards add column embedding vector(1024);
-- create index on public.cards using hnsw (embedding vector_cosine_ops);
```

To roll it out: apply the migration, then have `store.addCards` send `level`, `prerequisites` and `issues`. The client must not send them before the columns exist, or inserts will fail.

---

## 4. Cost and performance

Prices and token counts come from `docs/AI-COSTS.md` and `public.ai_prices`: packs on Claude Sonnet 5.5 at $2 in / $10 out per million tokens, £0.79 per $. A typical pack prompt is about 8,000 tokens (25k characters of notes).

| | Before | With the independent review | Change |
|---|---|---|---|
| Typical study pack (25k characters) | 10.7p | about 13.2p | +2.5p (+24%) |
| Review call | n/a | about 8,500 tokens in (instructions, the notes again, the cards), about 1,500 out | |
| Ultra learner, 5 packs a month | 54p | about 66p | +12.5p a month at most |
| Free learner, 1 pack a month | 10.7p | about 13.2p | |

These are estimates. Measure them with:

```bash
ANTHROPIC_API_KEY=… npm run eval:claude
```

That runs the same generate-then-review pipeline on the fixtures and reports cards, rejections, facts tested and real cost. The review adds one request's latency, about 10 to 30 seconds. The browser engine costs nothing and runs in well under a second.

Ways to cut the cost if needed, without a deploy:

- switch the review off (`GRADIFY_PACK_REVIEW=off`)
- in a later change, review on a cheaper model (this needs the ledger to price two models in one claim)

---

## 5. Testing

| Area | Tests |
|---|---|
| Extraction from prose and messy notes | `tests/cardgen.test.mjs`, `tests/questions.test.mjs` |
| Card quality, splitting, duplicates, reviewer checks | `tests/quality.test.mjs` |
| AI pipeline: Bloom levels, new types, review verdicts, re-checks, coverage, reuse | `tests/quality.test.mjs` (mocked Claude output) |
| Learner focus and prompt safety | `tests/focus.test.mjs` |
| Typed recall | `tests/typed.test.mjs` |
| FSRS against ts-fsrs | `tests/srs-reference.test.mjs` |
| AI ledger, allowances, refusals, fallback to the browser | `tests/ai-flow.test.mjs`, `tests/cardgen.test.mjs` |
| Key-term coverage on real notes | `npm run eval` (browser), `npm run eval:claude` (Claude) |

The eval fixtures are biology, cardiology and contract law. Next, add maths (equations and worked steps), history (dates and causes) and a computing text to `tests/fixtures/`, with their key terms in `expected.json`.
