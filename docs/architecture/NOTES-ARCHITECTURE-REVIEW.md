# Gradify Notes: architecture review

**Status:** a review and proposal only. The decisions in §8 were made on 18 November 2026, and blockers B1 and B2 are fixed on #116. Nothing here has been applied. There are no migrations, no deploys and no changes to the Notes code on this branch. The proposed schema is in [`proposed/notes_v2.sql`](proposed/notes_v2.sql), outside `supabase/migrations/`, so no tool picks it up.
**Scope:** Gradify Notes as built in [seren-aitchison/Gradify#116](https://github.com/seren-aitchison/Gradify/pull/116) (`kit/notes/kb/`), and how it should grow into the rest of Gradify.
**Date:** 18 November 2026.

Contents:
0. Summary
1. What exists
2. Blockers for PR #116
3. Storage and sync
4. The knowledge graph
5. Ask your notes, on the server
6. PDFs and other assets
7. Academic integration
8. Dependencies, risks and decisions
9. Tests needed
10. Suggested order

---

## 0. Summary

The model is sound. Its main strengths:
- every bullet has a stable id;
- links are stored by id, so renames don't break them;
- card ids are derived from the bullet, so schedules survive edits;
- notes cards are ordinary rows in `cards`, so FSRS, Today, Revise and the Mastery Engine already treat them like any other card;
- the pure modules (`model.js`, `exam.js`, `io.js`, `ask.js`) are tested.

Most of what's recommended below changes **where data is kept and how it moves**. The in-memory model and its API can stay as they are, which keeps the risk to the working feature low.

Four problems stand out:
1. **Two blockers for #116** (§2): syncing was quadratic and froze the page once the knowledge base had a few thousand bullets, and the `kb_shares` read policy let anyone list every shared note. **Both are now fixed on #116** (commit `338d895`).
2. **The single-row sync caps the knowledge base at about 8,000 bullets** and re-sends all of it on every save. The fix is per-block rows with a server-assigned version feed (§3).
3. **Ask your notes can get AI answers in two phases.** Phase 1 uses the existing AI request flow with passages the browser selects. Phase 2 has the server search the learner's own rows under their own permissions (§5).
4. **Notes can reference official lessons and concepts without copying them.** Lesson ids are already permanent and concept identity already exists (§4, §7).

## 1. What exists

| Part | File | Notes |
|---|---|---|
| Model | `model.js` | One object, `kb.rems`, keyed by id. Each rem has `parent` and `kids[]`. Covers references `[[id]]`, tags, properties, portals, templates, daily documents, to-dos, card extraction, search, undo (before-images) and `merge()` |
| Exams | `exam.js` | Learning, catch-up, review and final periods, and readiness from FSRS retrievability |
| Import/export | `io.js` | Markdown/Obsidian, OPML, CSV, Anki text and native; out also as HTML and plain text |
| Retrieval | `ask.js` | BM25 over bullets and PDF pages, with extractive answers |
| Storage | `store.js` | `localStorage` key `gradify.kb.v1` (the whole knowledge base) and IndexedDB `gradify-kb` (PDF files and their text). The account gets one `tool_items` row (`kb-main`, kind `kb`). Sync is pull, `merge()`, then push the whole row. The `kb_shares` table holds shared snapshots |
| Cards bridge | `bridge.js` | One `documents` row per notes document (`file_name = 'kb:<rem id>'`). `kb.cardMap` (notes card id → `cards.id`) is kept inside the synced knowledge base. Cards whose bullets are gone are suspended |
| Images | `kit/tools/store.js` | Images go with Tools' images: IndexedDB locally, and `tool_images` rows holding data URLs of up to about 1.4 MB |
| AI | `view-learn.js` | Card, quiz and summary generation and Guided Learning call `study-pack` through `kit/notes/engine.js`, which falls back to the browser extractor. Ask your notes is retrieval only |

Wider Gradify pieces that Notes should build on rather than duplicate:
- **AI request flow.** `supabase/functions/_shared/ai.js` handles the usage claim, cache, Claude call and settle step, plus allowances (`FEATURE_OF`). `course-tutor` has the modes and `checkReply`, which only lets the model name ids the request offered.
- **Server-side grounding.** `kit/assess/canon.js` / `_shared/canon.js`: the server reads a lesson's canonical notes by lesson id, and any notes text sent from the browser is ignored.
- **Permanent lesson ids.** Each course has `kit/courses/<subject>/ids.js`. Ids are never reused, and retired ids are reserved.
- **Concept identity.** `kit/intel/identity.js` gives `conceptId("Cardiac output (CO)")` → `c:cardiac-output`. It's conservative and expands abbreviations.
- **The evidence-weighted graph.** `kit/intel/graph.js` combines `course` (0.9), `definition` (0.45) and `performance` (0.25) evidence, and acts only on links at confidence ≥ 0.5. `kit/intel/debt.js` `dependencyGraph(cards)` already reads notes cards, because they're ordinary cards.
- **Course prerequisites.** `kit/learning/concepts.js` builds the module graph.
- **The learning event ledger** (`kit/intel/ledger.js`, `learning_events`). Notes doesn't write to it yet.
- **Database safety tooling.** `scripts/pg-rehearsal.mjs` has a statement allowlist and checks that existing values are unchanged. `docs/RECOVERY.md` covers backups and restores.

## 2. Blockers for PR #116

**Both fixed on #116 in commit `338d895`**, with regression tests, before it merges. The findings are kept below as found.

**B1. `merge()` is quadratic.** For each rem, `order()` scans every rem to find its children.

| Bullets | One merge |
|---|---|
| 1,000 | 43 ms |
| 2,000 | 868 ms |
| 4,000 | 3.9 s |
| 10,000 | 29 s |

The page runs a merge on every sync, 1.5 s after each burst of edits, so a medium-sized knowledge base freezes the page repeatedly. The fix is to build a `parent → children` map once (O(n)) and use a `Set` in place of `kept.includes`. Add a test that merges 10,000 rems within a time budget.

*Fixed:* children are now grouped in one pass, and the loop check remembers ancestor chains known to reach the top level. Its decisions are identical, proved against the pre-fix model on 20 randomised pairs of diverged copies merged both ways. Sync also skips the download and merge when the account copy is still this device's last save.

| Bullets | Before | After |
|---|---|---|
| 1,000 | 50 ms | 8 ms |
| 2,000 | 779 ms | 35 ms |
| 4,000 | 3.7 s | 59 ms |
| 8,000 | 17.4 s | 123 ms |
| 10,000 | 29.6 s | 167 ms |

**B2. The `kb_shares` read policy lets anyone list every shared note.** `for select to anon, authenticated using (public)` allows `select * from kb_shares` with no id, so a visitor with the public anon key can enumerate every public share along with its sharer's `user_id` and `rem`. Sharing is meant to work as "anyone **with the link**".

The fix:
- drop the anon select policy;
- add a `security definer` function, `kb_share(p_id uuid)`, that returns only `title`, `snapshot` and `updated_at` for one public id;
- have `openShare()` call it through `rpc()`;
- add a test that an anonymous select returns nothing and the function returns only the requested share.

*Fixed:* the select policy is gone; signed-out visitors have no privileges on the table; and `kb_share(uuid)` returns one public share's title, snapshot and date. `tests/kb-db.test.mjs` covers:
- attempts to list shares, as a visitor and as another learner;
- no extra fields in what a link returns;
- private, unknown and malformed ids;
- revocation;
- that only the owner can change or delete a share.

Run against the original migration, the listing test fails, which is the leak reproduced.

**B3. Smaller things to record on #116** (not blockers):
- The real limit is about **8,000 bullets**: an average bullet takes about 230 bytes, against the 1.9 MB row limit. `localStorage`'s usual 5 MB quota is close behind. Drawings use more.
- Every save re-uploads and re-downloads the whole knowledge base, up to about 2 MB each way.
- Each bullet goes to whichever copy was changed last, judged by the **device clocks**. A wrong device clock makes the wrong edit win. If two devices edit the same bullet, one edit is dropped silently.
- Deletion records are pruned after 90 days. A device offline for longer could bring deleted bullets back.
- Two devices can both create the app card for the same notes card before their knowledge bases sync. The bridge de-duplicates by front and back text, which is a heuristic, not a guarantee.
- `backlinks()` (51 ms) and `search()` (98 ms) scan every bullet. At 10,000 bullets the outline redraw spends about 60 ms on references after each edit. That's fine for now; §3 adds indexes.

## 3. Storage and sync

### Recommended model: blocks with a version feed

```
kb_blocks   one row per rem (stable id, as now)
            doc_id, parent_id, sort_key (fractional index), kind,
            body jsonb (text and the type's fields), version (server-assigned), deleted, updated_at
kb_docs     derived: one row per document or folder (title, parent, kind, daily date), for the sidebar and sharing
kb_links    derived: from_block → to (block | lesson | concept | asset), kind (reference | portal | tag | lesson | concept | source)
kb_tags     the current tagDefs (schema, make-cards flag)
kb_exams    the current exams
kb_history  earlier versions of a block's body, kept for a limited time
cards.source_ref  'kb:<rem>:<type>:<k>', unique per learner (replaces kb.cardMap)
```

**Why each piece:**
- **Per-block rows** remove the size ceiling, and a save sends only the bullets it changed.
- **`sort_key` with fractional indexing** (keys like `a0`, `a0V`, `a1`) replaces `kids[]` arrays. Moving one bullet changes one row, not its parent's whole list of children. That removes most structural conflicts.
- **`version` from one sequence** (`bigint`, set in a trigger, never by the client) gives each learner a change feed: `select … where user_id = auth.uid() and version > :cursor order by version`. It doesn't depend on device clocks. An index on `(user_id, version)` makes it cheap.
- **`kb_links` derived on write** gives fast backlinks, lets lesson and concept references be found by the server (for Ask your notes and for "your notes on this lesson"), and feeds the knowledge graph (§4).
- **`cards.source_ref`** (an added nullable column with a unique index on `(user_id, source_ref)`) makes duplicate cards across devices impossible, and replaces the `cardMap` inside the knowledge base.

**How syncing works:**
1. **Local store.** Move from `localStorage` to IndexedDB: one object per block, plus an **outbox** of changes not yet confirmed. This also removes the 5 MB `localStorage` ceiling and the main-thread `JSON.stringify` of everything.
2. **Push.** An RPC, `kb_push(changes jsonb)`, takes a batch of `{ id, base_version, fields… }` in one transaction:
   - When `base_version` matches, the change is applied.
   - When it doesn't, the outcome depends on the field (below), and the RPC returns what it did.
   - It rejects moves that would create a cycle and changes to rows the caller doesn't own.
   - It's idempotent per `(block id, client op id)`, so a retry after a dropped connection is harmless.
3. **Pull.** Fetch the change feed after the cursor and apply it to the local store. The cursor advances only after the batch is safely written locally, so an interrupted sync resumes where it stopped.
4. **Conflicts:**
   - **Structure** (`parent_id`, `sort_key`): the later server version wins, and the cycle check holds.
   - **Text:** if both sides changed the same bullet's text since its base version, the server keeps the one that arrived first. It saves the other as a **conflict copy**, a sibling block tagged `#[[Sync conflict]]`, and nothing is lost silently.
   - **Card schedule:** it stays on `cards`, as now. FSRS state is never merged in the notes.
5. **Deletes** are tombstones (`deleted = true`) that are kept until every device's cursor has passed them, or for at least 12 months, not 90 days.
6. **History.** A trigger copies the previous `body` into `kb_history` when text changes and the last copy is more than about 10 minutes old. It's pruned to 90 days, or to N versions per block. This gives "see earlier versions" and a way to recover from a bad edit or a bad sync.

**What stays the same.** `model.js` keeps its in-memory `kb` with `kids[]`. A storage adapter turns block rows into that shape on load (`kids` sorted by `sort_key`), and turns each committed undo step (the model already records exactly which rems a change touched) into outbox entries. So the editor, the views and all 14 tests carry over.

### Alternatives considered

| Option | Verdict |
|---|---|
| Keep one row, compress it | Postpones the limit, but keeps whole-document transfers and clock-based conflicts |
| One row per document | Better, but large documents still conflict as a whole, and moving bullets between documents touches two rows |
| CRDT (Yjs or Automerge) per document | The best basis for **real-time co-editing**. It adds a dependency, a binary storage format and a relay server, and that's more than a single learner needs. Revisit with collaboration (below) |
| **Per-block rows with a version feed** | **Recommended.** It fits Supabase, row-level security, the existing rehearsal tooling and the current model |

### Collaboration (later)

Shared knowledge bases can come next on this model:
- add a `kb_spaces` table and `kb_members (space, user, role)`;
- give blocks a `space_id`;
- base row-level security on membership instead of `user_id`;
- use Supabase Realtime on `kb_blocks` for live updates, and presence for "who's here".

Character-level co-editing of a single bullet is the only part that needs a CRDT, and it can be added per block later. Snapshot sharing (`kb_shares`) stays as the "publish a copy" feature.

### Database implications

- New tables: `kb_blocks`, `kb_links`, `kb_tags`, `kb_exams`, `kb_history`, `kb_assets` (§6). They're all owner-only under row-level security, with the restrictive one-active-device `may_write()` policies, like other study tables.
- An added column, `cards.source_ref text` (nullable), with a partial unique index. `add column` is within the rehearsal allowlist.
- RPCs: `kb_push`, `kb_pull` (or a plain select), `kb_share(id)`.
- Indexes:
  - `kb_blocks (user_id, version)`
  - `kb_blocks (user_id, doc_id)`
  - `kb_links (user_id, to_kind, to_id)`
  - full-text: `kb_blocks using gin (to_tsvector('simple', body->>'text'))`, for §5
- No existing table's data changes. `tool_items` rows of kind `kb` stay readable for the transition.
- Storage: about 300 bytes per block plus indexes, so 10,000 bullets come to about 5 MB per heavy learner. History is capped.

### Backwards compatibility and moving existing data

1. Ship the new tables (after approval) with the client still on v1. Nothing changes for learners.
2. Ship a client that **reads v1 and writes v2**:
   - On first run with v2 available, it converts `gradify.kb.v1` (or the `kb-main` row) into blocks and pushes them.
   - It records `settings.migratedTo = 2` and leaves the v1 row untouched.
   - If v2 is unavailable (the migration isn't applied yet), it stays on v1, as the current code already does with `tool_items`.
3. `cardMap` → `cards.source_ref`: write `source_ref` for every mapped card in one batch. The bridge then looks cards up by `source_ref` and keeps `cardMap` as a fallback.
4. After a few weeks with no v1 writes, archive the `kb-main` rows. That's a separate, approved step: **back them up before archiving**.

## 4. The knowledge graph

There's no single "universal knowledge graph" store yet. Today it's spread across four places:
- concept identity (`identity.js`);
- course prerequisites (`concepts.js`);
- the evidence-weighted learner graph (`graph.js`, `debt.js`);
- permanent lesson ids (`ids.js`).

Notes should **feed and read** this graph through one small, pure layer rather than invent another one.

**Proposed: `kit/notes/kb/graph-bridge.js`** (pure and tested). It turns notes into graph nodes and edges in the shapes `graph.js` already takes.

| Node | Id | From |
|---|---|---|
| note | `kb:<rem id>` | documents and bullets |
| concept | `c:<canonical words>` | `conceptId()` of document names, tag names and the terms of `Term :: definition` cards |
| lesson | `lesson:<subject>/<lesson id>` | explicit references (below) and lesson pages |
| topic, subject | `topic:<site>/<module>`, `subject:<site>` | course syllabi (`concepts.js` nodes) |
| card | `card:<cards.id>` | `cards.source_ref` |
| assessment | `q:<question id>` | existing assessment attempts |
| resource | `asset:<id>` | PDFs, images, scans (§6) |

| Edge | Meaning | Evidence kind / weight |
|---|---|---|
| note → note | reference or portal | structural (not mastery evidence) |
| note → lesson | "about this lesson": an explicit `[[lesson:…]]` | explicit, 0.9 |
| note → concept | the note defines or is named after a concept | `definition`, 0.45 (as now) |
| card → concept | the card tests the concept | from the card's term |
| concept → concept | prerequisite | from courses (0.9) or inferred (as now) |

**Authority is kept separate.** Every node and edge carries `source: "curriculum" | "personal" | "generated"`. The learner's notes can add evidence about *their own* graph, such as "these two ideas are connected for me". They never change Gradify's curriculum graph. Anything AI generated stays `generated` until the learner removes `#Check me`.

**Existing links stay.** `[[id]]` references, portals and tags keep their syntax and storage. The bridge only reads them, and in v2 `kb_links` stores them.

**New reference kinds**, in the same `[[…]]` syntax so nothing new has to be learned:
- `[[lesson:biology/u01-03]]` shows the lesson's current title from `ids.js`, links to the course page and stores only the id. A **lesson portal** shows the lesson's canonical notes read-only, fetched from the published site the way the server does with `canon.js`. The content isn't copied, so it can't go stale.
- `[[concept:Cardiac output]]` resolves to `c:cardiac-output`. It's mostly implicit: tags and concept cards already name concepts.

The autocomplete would offer lessons from the learner's courses alongside their own notes.

## 5. Ask your notes, on the server

### Phase 1: a new tutor mode using the passages the browser selected

This needs no new tables, and works as soon as accounts are switched on.

A new `mode: "notes"` in `course-tutor` (decided: not a separate function). It counts against the **AI Tutor allowance** (`FEATURE_OF.notes = "tutor"`, decided) and goes through the usual claim and settle steps.

1. The browser runs the existing `ask.js` and sends the question plus at most 8 passages: `{ id, path, text }`, capped at about 1,500 characters each.
2. The prompt marks the passages as **the learner's own notes, as data, not instructions**. They're kept apart from the curriculum content (step 3).
3. If the learner is studying a course (from their profile), the server may also add **canonical lesson notes**, fetched by lesson id through `canon.js` as for `explain`. These are labelled as Gradify curriculum.
4. The reply uses a schema: `{ answer, citations: [{ passage, quote }], curriculum: [{ lesson, quote }], coverage: "notes" | "partly" | "not covered" }`.
5. Two server checks run before anything is returned. The first works like `checkReply`: citations can only name passage ids the request offered, and lessons only the ones it offered. The second is a quote check: each `quote` must appear in its passage (`groundingScore` in `pack.js`), and a citation that fails it is dropped.
6. The browser shows personal sources and curriculum sources separately, each with a link (bullet, PDF page or lesson). "Not covered" says so rather than answering from general knowledge.
7. **Nothing is stored**, in line with `docs/AI-TUTOR.md`: `tutor_usage` keeps only counts.

**On permissions:** in this phase the passages come from the learner's own browser, so there's nothing of anyone else's for it to expose. The function uses only the caller's token. It never reads with the service role.

### Phase 2: the server finds the passages

This needs §3. The function searches `kb_blocks` **as the learner**, using a client created with their access token so row-level security applies. It ranks with Postgres full-text search (`websearch_to_tsquery`, `ts_rank_cd`) and includes PDF page text and annotations from `kb_asset_text` (§6).

Embeddings (`pgvector`) are an optional later step. They're better for paraphrased questions, but they cost money, add storage, and send the learner's notes to an embedding provider. Make that a separate decision, with an entry on the privacy page.

**Risks:**
- Prompt injection inside notes or PDFs: treat them as data, check every citation, and never let the model take actions.
- Cost: cap the passages, cache nothing personal.
- A learner treating AI answers as authoritative: label them as AI, show sources, and show "not covered" when it applies.

## 6. PDFs and other assets

**Recommended:**
- a private Supabase Storage bucket, `kb-assets`, with paths `<user id>/<asset id>`;
- row-level security on `storage.objects`: a learner can read and write only their own folder;
- a metadata table, `kb_assets`, plus `kb_asset_text` for each page's extracted text.

```
kb_assets       id, user_id, kind (pdf | image | scan | drawing | audio | file), mime, bytes, sha256, pages,
                storage_path, created_at, deleted
kb_asset_text   asset_id, page, text (and a full-text index)   ← search, Ask your notes, Guided Learning
```

**How it works:**
- **Upload:** the browser computes the file's SHA-256 (the same file is stored once), then uploads directly to Storage with the learner's token. It writes `kb_assets` only after the upload succeeds. Blocks refer to `asset:<id>`. Never store data URLs in rows again.
- **Download:** short-lived signed URLs. The **offline cache** in IndexedDB keeps recently opened assets within a budget (about 200 MB by default) and evicts the least recently used. Everything pinned to a document marked "Available offline" stays.
- **Compression:** images as now (at most 1200 px, JPEG or WebP). PDFs are kept as they are, because recompressing them in the browser is unreliable. Audio as Opus/WebM through `MediaRecorder`. Drawings stay as vector JSON inside their block until they pass about 100 KB, then move to an asset.
- **Text extraction:** done in the browser with pdf.js, as now, and uploaded to `kb_asset_text`. Scans get Tesseract OCR as now, and the text is saved with the asset.
- **Limits per plan:** sizes and total storage per learner, enforced in a server function or a storage policy, and shown in Settings. The values are **set after measuring** real storage, bandwidth and processing costs, and are configuration, not schema.
- **Moving existing images:** `tool_images` data URLs → Storage objects, in batches, keeping the ids. The old rows are deleted only after the copy is verified, as a separate approved step.

**Dependency: the bucket can't be created by a migration.** The `tool_images` migration notes the migration tool can't create Storage buckets. Creating `kb-assets` is an **owner action** in the Supabase dashboard or CLI, and its `storage.objects` policies need the same rehearsal and review as a migration.

**Risks:**
- Hostile files: PDFs render through pdf.js only; downloads are served with `Content-Disposition: attachment`; MIME types are checked server-side.
- Storage cost: per-plan limits, hash de-duplication, and deleting a document's assets after a grace period.
- Privacy: everything is private; shared snapshots refer to assets that a viewer can't open. Showing images in shared notes needs share-scoped signed URLs, a later step.

## 7. Academic integration

| With | Today | Next |
|---|---|---|
| Lessons | None | `[[lesson:…]]` references and lesson portals (§4). On each lesson page, a "Your notes on this lesson" panel lists the notes that reference it (a `kb_links` query), with "Add a note" creating one already linked |
| Guided Learning | From notes or PDFs | Also from a lesson or a whole unit, using its canonical text by id. It generates cards and a quiz, but the lesson isn't copied |
| Flashcard generation | `study-pack` from note text | Unchanged. Cards made from a lesson get `source_ref` and a lesson edge |
| FSRS | Notes cards are app cards | Unchanged, plus `source_ref` (§3) |
| Exam planner | Notes exams; `profile.exam_date` set on request | An exam's scope can include course units as well as notes documents, so one plan covers both kinds of card |
| Mastery Engine | `topic` = the notes document's name | Topic from the concept or lesson, when known, so notes cards and course cards on the same idea count towards one mastery figure (`identity.js` already does this for names) |
| Learning pathways | None | Pathway steps can be "make notes on X" and "review your notes on X", completed when a linked note exists or is reviewed |
| Progress tracking | Card reviews only | Notes events (note created on a lesson, Guided Learning section done, quiz score) go to `learning_events` via `ledger.js`, so Intelligence can see them |

## 8. Dependencies, risks and decisions

**Dependencies:**
- Supabase accounts switched on and connected. `docs/BACKEND-STATUS.md` says the site isn't connected yet, so none of the cloud parts can be verified live until it is.
- A project-scoped credential, used locally by the owner, to check the live migration history before anything is applied.
- Owner action for the Storage bucket and its policies (§6).

**Risks, and how each is handled:**

| Risk | Handled by |
|---|---|
| Moving data to v2 loses or duplicates bullets | The v1 copy is kept untouched; conversion is idempotent (same ids); before/after counts are checked on the device; a rehearsal test |
| Sync bugs corrupt the tree | The server checks for cycles; conflict copies instead of silent drops; `kb_history`; the existing `merge()` repair kept as a local safety net |
| Clock skew | Server-assigned versions |
| Privacy of shared notes | Fix B2; snapshots only; images private by default |
| AI cost and trust | Existing allowances; citations checked; "not covered" shown when it applies |
| Migrations against live data | `pg-rehearsal` with the allowlist; backups per `docs/RECOVERY.md`; owner approval |

**Decisions (made 18 November 2026):**

| Decision | Outcome |
|---|---|
| Per-bullet rows or a CRDT | **Per-bullet rows** (§3). Reliable offline sync and conflict handling first; collaborative editing later on the same model |
| Ask your notes | **A new mode in the existing `course-tutor`**, not a separate function |
| Its allowance | **The AI Tutor allowance** (`tutor`), not `explain`, so note questions can't become an unmetered route to the tutor |
| Embeddings | **Deferred.** Start with full-text search under the learner's own permissions, and measure answer quality before adding vector search |
| File storage | **A private bucket**, created by the owner, with explicit access policies reviewed like a migration |
| File-size limits | **Not fixed yet.** Set per plan once real storage, bandwidth and processing costs are measured; nothing in the design hard-codes them |
| Blockers B1, B2 | **Fixed first**, on #116 |

As agreed, per-bullet rows don't solve sync by themselves. The design still has to get these right, and §9 tests each one:
- updates applied atomically;
- stable ids;
- ordering;
- deletion and tombstones;
- conflict resolution;
- an offline queue that's safe to retry.

## 9. Tests needed

- **B1:** `merge()` on 10,000 rems finishes within a time budget, with output identical to today's on the existing merge tests.
- **B2:** an anonymous select on `kb_shares` returns no rows; `kb_share(id)` returns only that public share's title, snapshot and date; a private share returns nothing.
- **Sync v2** (pure parts, with a simulated server):
  - fractional `sort_key` insert, move and rebalance;
  - change-feed apply is idempotent;
  - an interrupted pull or push resumes without loss;
  - a conflicting text edit produces one conflict copy;
  - a cycle is refused;
  - a deletion isn't brought back by an old device.
- **Database (pglite):**
  - row-level security: one learner can't read or write another's blocks, links, assets or history;
  - `kb_push` assigns versions server-side and ignores versions sent by the client;
  - `cards.source_ref` uniqueness holds;
  - the rehearsal shows existing values unchanged.
- **Moving data:** v1 to v2 to the model gives an identical `kb` (rems, tree order, tags, exams); cardMap to `source_ref`.
- **Graph bridge:** nodes and edges from a fixture knowledge base; authority labels; existing references, portals and tags unchanged.
- **Ask your notes (server):** the request builder caps passages; `checkReply` drops citations to ids that weren't offered and quotes that don't appear in their passage; curriculum and personal sources are kept apart; refused when signed out.
- **Assets:** de-duplication by hash; offline cache eviction; a failed upload leaves no `kb_assets` row.
- **Browser (Playwright):** the existing Notes flows still pass after every phase; two browser contexts editing the same document converge.

## 10. Suggested order

Each step stands alone and is reviewed separately. Steps marked **(migration)** need your approval, a rehearsal and backups first.

1. ~~Fix B1 and B2 on #116~~ (done, `338d895`), then finish its review. Nothing else depends on Notes being merged first.
2. `graph-bridge.js` and the `[[lesson:…]]` references. This is pure code with no database changes, so learners can link notes to lessons straight away.
3. Ask your notes, phase 1 (a new tutor mode, no tables).
4. **(migration)** v2 tables, `cards.source_ref`, `kb_push`; then the client that reads v1 and writes v2.
5. **(owner action + migration)** The `kb-assets` bucket, `kb_assets`, `kb_asset_text`; then moving existing images.
6. Ask your notes, phase 2 (server-side retrieval).
7. Notes in the Mastery Engine and the ledger; lesson-page note panels; exams that cover course units.
8. **(migration)** Shared spaces and real-time collaboration.
