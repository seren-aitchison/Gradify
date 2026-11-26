# Learner state: one learner context for all of Gradify

Status: **built on the branch, account sync waiting for one migration.** The learner's record, the universal
resource ids and the connected-learning features run today on the device. Account sync is written and tested
against its merge rules, but stays off until `supabase/migrations/20261126120000_learner_state.sql` is applied.
Until then every device keeps its own copy and says so ("Saved on this device"); nothing is lost.

## The goal

A learner never has to tell Gradify again what they're studying, where they are, what they've finished or what's
next. Concretely:

- Open a lesson, and the planner, Continue and History know what you're working on.
- Complete a lesson, and a plan block you scheduled for it is ticked off.
- Get a question wrong, and it becomes a mistake to revisit (Continue and the Revision Centre) until you get it right.
- Start a quiz, and it shows as in progress, with the count, until you finish it.
- Open another device, and your pins, tabs, history, links, collections, notes and mistakes are there.

The rule that makes this hold: **one canonical record, and screens use it only through defined interfaces.** No
screen keeps its own competing copy of learner state.

## Three layers

| Layer | What it is | Module |
|---|---|---|
| **Universal resource** | One stable id for every meaningful thing (lesson, topic, course, quiz, target test, spec point, flashcard set, card, note, mind map, plan block, goal, session, mistake, collection), with the same metadata wherever it appears | `kit/core/resource.js` |
| **Learner record** | The learner's state as entries, on the device and in the account, merged entry by entry | `kit/data/learner-state.js` |
| **Domain interfaces** | What features call: pins, tabs, history, links, collections, notes, mistakes, scheduling | `kit/ui/places.js`, `kit/ui/workspace.js`, `kit/ui/history.js`, `kit/data/links.js` |

Content stays in its own tables (notes, cards, packs, plan blocks, goals, course progress, attempts). The learner
record holds ids, titles, places, states and counts: what the learner did with things, not the things themselves.

## The data model

### Resource ids (`kit/core/resource.js`)

An id is `<kind>:<where>`. Course content uses the course's path then the item's own id. The learner's own things
use the id their store gave them. Ids never contain titles, so renaming something doesn't break a link to it.

| Kind | Example id | Opens at |
|---|---|---|
| course | `course:/scigradify/biology/` | `/scigradify/biology/#/home` |
| unit (topic) | `unit:/scigradify/biology/u02` | `…#/learn/u02` |
| lesson | `lesson:/scigradify/biology/u02-03` | `…#/lesson/u02-03` |
| quiz | `quiz:/scigradify/biology/u02` | `…#/quiz/u02` |
| spec point | `spec:/scigradify/biology/4.1.3.1` | `…#/spec/4.1.3.1` |
| flashcard set | `pack:<document id>` | `app.html#/deck/<id>` |
| note | `note:<rem id>` | `app.html#/notes/<id>` |
| collection | `collection:<id>` | `app.html#/collections/<id>` |
| a screen | `screen:/app.html#/plan` | itself |

`ridFromHref(href)` turns any link Gradify already makes (pins, history, tabs) into an id, so older data needs no
migration. `resource(rid, meta)` gives every tool the same shape:
`{ rid, kind, label, icon, title, href, subject, qualification, topic, difficulty, refs }`, where `refs` are
curriculum point ids.

### The learner record (`kit/data/learner-state.js`)

One record: a map of entries, each `{ kind, key, value, t, dev, del }`.

| Kind | Key | Value | Written by |
|---|---|---|---|
| `pin` | the place's href | title, sub, kind, order | `places.js` pin, setPins |
| `tab` | slot (`lesson:/course/`, `notes:/app.html`, …) | href, title, kind, scroll, position | `workspace.js` |
| `activity` | generated id | act (viewed, studied, created, edited), href, title, subject, where, count, quiz or test state, session | `history.js` logEvent |
| `link` | the two resource ids, sorted | both ends' summaries; made by `you` or `source` | `links.js` link |
| `collection` | collection id | name | `links.js` |
| `collitem` | `collection id\|resource id` | the resource's summary | `links.js` |
| `note` | resource id | the learner's note, the resource's summary | `links.js` setNote |
| `mistake` | `course:question key` | question, lesson, link, times wrong, resolved | `course.js` record |
| `sched` | plan block id | the resource, the block's day and time | `resource-actions.js` schedule |

**Device-only, deliberately:** which workspace tab is open on this screen, this tab's trail ("Back to where I
was"), sidebar layout preferences, recently visited places (`gradify.visited`, next to fold into `activity`).

### Merge and conflict rules

- **Each entry merges on its own.** Two devices changing different things never conflict.
- **The newer change wins** (`t`). On an exact tie, the larger device id wins, so every device reaches the same result.
- **Deletions are tombstones** (`del: true`) with their own time, kept for 30 days, so an older copy can't bring a deleted thing back.
- **The server keeps the newer change too.** A trigger ignores an update older than what's stored, so a device that comes back online with old changes can't overwrite newer ones.
- **Devices pull by the server's clock** (`updated_at`), so a device whose clock is wrong still has its changes picked up. Which change wins is still decided by `t`.
- **One-way facts stay one-way in their own stores.** Lessons done, best quiz scores and solved questions are unions or maximums in course progress (`kit/course/progress.js`). Attempts are append-only with unique ids.

Every rule has a test in `tests/learner-state.test.mjs`.

### Offline and interruption

- Every change is written to the device first, synchronously, before anything else happens. Closing the tab can't lose it.
- With an account, the record pulls and pushes 1.5 seconds after a change, when the page is hidden, when it comes back, and when the device reconnects. A failed sync retries every 30 seconds.
- The status is always visible in the app's top bar (`kit/ui/sync-status.js`): saved on this device, saving, saved, offline (saved here), or retrying, with the number of changes waiting.

## How each feature uses it

| Feature | Reads | Writes | Through |
|---|---|---|---|
| Sidebar Pinned, palette, home "Your learning" | pins | pin, unpin, reorder | `places.js` |
| Sidebar Recent, palette Recent | recent places (device) | visits | `places.js` |
| Workspace tabs | tabs | open, move, close, scroll | `workspace.js` |
| History screen | activity | clear | `history.js` |
| Every screen and course page | (nothing) | a "viewed" line | `history.js` logEvent |
| Quizzes, target tests | (nothing) | in progress from the first answer, then completed or retry | `course.js` assessState → `history.js` |
| Continue (Today, ⌘K) | activity, mistakes, course list, session, today's blocks | (nothing) | `continue-view.js` |
| Questions in every course | (nothing) | a mistake on a wrong answer, resolved on a right one | `course.js` record → `links.js` |
| Revision Centre | mistakes | (nothing) | `links.js` |
| Resource menu (•••) on lessons, courses, flashcard sets, single flashcards, course questions and every app screen; the same actions in Notes' own ⋯ menu | pins, collections, notes | pin, save to a collection, note, schedule | `resource-actions.js` (`mountResourceActions`, `runResourceAction`) → `places.js`, `links.js` |
| Notes on a lesson (lesson panel › Yours) | links | a Notes page made from the lesson, once; the next time it opens again | `kit/notes/kb/view.js` `#/notes/from/<resource>` → `links.js` |
| Mind map creator | (nothing) | a "made from" link to each lesson it has facts from, removed with the lesson's last fact, renamed with the map | `kit/tools/mapmaker.js` → `links.js` |
| Connections panel (lesson panel, flashcard sets, any ••• menu) | links, collections, notes; every lesson with its key terms, topic, module and headings (`kit/api/v1/lessons.json`); the course's curriculum graph and specification | link, unlink | `connections.js` → `links.js` (`suggest`: the curriculum's prerequisites, then shared specification points, key terms, topic, title and heading words) |
| Collections screen | collections, items | create, rename, delete, remove | `links.js` |
| Completing a lesson | scheduled resources | ticks the plan block off | `course.js` → `links.js`, store |
| Settings › Your data | every kind (counts) | export, clear everywhere | `learner-state.js` |

Course progress, flashcards, the plan, goals and notes keep their own tables and merges (listed in the table
below). The learner record links to them by id. It doesn't copy them.

| Already in the account | Table | Merge |
|---|---|---|
| Course progress (done, quizzes, positions, bookmarks) | `course_progress` | `kit/course/progress.js mergeProgress`: unions and maximums |
| Question attempts | `assessment_attempts` | unique ids, idempotent upload |
| Flashcards, packs, reviews | `cards`, `packs`, `documents`, `reviews` | one row each; reviews append-only |
| Plan blocks, goals | `plan_blocks`, `goals` | one row each; goals carry a version |
| Notes | `tool_items` (kind `kb`) | rem by rem |

## Keeping connections true

| When | What happens |
|---|---|
| A mind map, Notes page (and the pages inside it), flashcard set, card or collection is deleted | `forget(rid)`: its links, collection places, the learner's note on it, its scheduling and its pin go too |
| It's renamed | `retitle(rid, title)`: every link and collection entry takes the new name, when the map is renamed and whenever a Notes page, flashcard set or lesson is opened |
| A linked lesson, topic or course is no longer in its course | Connections shows it as "No longer in its course", with Unlink, instead of a link to nowhere (only when that course's index loaded: offline, nothing is called gone) |
| A plan block made by Schedule is deleted | Completing the resource finds it gone and drops the scheduling entry |
| Moved within its course or Notes | Nothing changes: ids are the course's locked lesson ids and the notes' own ids, not places |

Undoing a Notes delete (Ctrl+Z) brings its links, collection places, note, schedule and pin back with the page;
Redo removes them again (`forget` returns what it removed, `restore` puts it back; `tests/links-store.test.mjs`).

## Migration impact

`supabase/migrations/20261126120000_learner_state.sql`:

- **Adds:** one table (`learner_state`), one index, one trigger function and its trigger, row-level security, and policies matching every other learner table (own rows only; on Free, writes only from the active study device).
- **Changes nothing existing:** no other table, row, function or policy is touched. The repository's rehearsal applies it to a copy of real data and checks every existing value is unchanged (`tests/pg-rehearsal.test.mjs`). It passes the migration allowlist.
- **All or nothing:** `scripts/supabase-admin.mjs migrate` applies it in one transaction with its ledger entry and checks. A failure partway through leaves the database as it was.
- **Undoing it in the database:** `drop table public.learner_state; drop function public.learner_state_keep_newer();`. The app treats a missing table as "keep the record on this device". What had synced to the account goes with the table; every device still has its own copy.
- **After it's applied:** a signed-in learner's device uploads its record on its next visit (pins, tabs, history, links, collections, notes on resources, mistakes, scheduling) and merges it with their other devices'.

## Rolling the app back

The record lives in one device key (`gradify.state`). Until it has proven itself, the keys the previous version read
are **kept current in their old formats** on every save and sync: `gradify.pins` (pins, in order),
`gradify.workspace` (`{ tabs, active }`) and `gradify.history` (newest first, the old 500-line limit).

- **What the live version (`main`) reads:** only `gradify.pins`. Workspace tabs and History arrived with this branch, so `main` has nothing of them to lose; their keys are kept current anyway, for any in-between version.
- **Rolled back:** the previous version reads its keys and finds every pin (and tab and history line) made since.
- **Forward again:** if the previous version changed those keys meanwhile, the record notices (it fingerprints what it last wrote) and takes the older version's changes as the newer ones: pins and tabs added and removed, history lines added (never removed, since that key holds only the newest 500). Kinds it didn't touch are left alone.
- **Lost on a rollback:** only what the previous version never had: links, collections, notes on resources, mistakes and scheduling. They stay in `gradify.state`, untouched, and come back when the app does. History lines beyond the newest 500 aren't shown by the previous version, but stay in the record.

Tested end to end on a simulated device: new version, rollback, changes by the older version, forward again
(`tests/learner-state-rollback.test.mjs`).

## History limits

- **On a device:** the newest 600 lines, none older than a year. Older lines are dropped from that device's copy only; nothing is sent as a deletion, so the account keeps them.
- **In the account:** every line that reached it. Today there's no server-side limit: each line is one small row, under the 16 KB value limit.
- **What can be lost:** a line that falls out of the newest 600 before it's ever synced (more than 600 lines on a device that's offline or signed out). Before this branch, history kept 500 lines on the device and none in the account.

Covered: the 600 cap and newest-first pruning, older account lines surviving a device's pruning, a sync failing partway then finishing, another device's changes merging, an inactive Free device, and an account without the table (`tests/learner-state-sync.test.mjs`).

## Attempted, completed, mastered, verified

These four are separate measures, and nothing in Gradify should report one as another:

- **Attempted:** at least one answer submitted (an attempt in `assessment_attempts`; a quiz "in progress").
- **Completed:** the learner finished it (a lesson marked done; a quiz finished, passed or not).
- **Mastered:** what the evidence says the learner can do. It comes from their answers (the Mastery Engine, spec mastery) and is never inferred from opening or finishing something.
- **Verified coverage:** a specification point Gradify teaches, checked against the board's specification (the spec model's `verified` and wording flags).

The learner record holds attempted and completed states for Continue. Mastery and coverage stay in their engines.

## Privacy and the learner's control

- **Settings › Your data › Your workspace record** says what's kept, in counts per kind. It can be downloaded as JSON, or cleared on every device (tombstones sync the deletion).
- The record holds no content: no note text other than the learner's own short notes on resources, no answers, no documents.
- Row-level security in the account: a learner can read and write only their own rows. Anonymous visitors can do neither.
- Attempts record `assist: "hint"` on the device for answers given after a hint. It isn't uploaded until the attempts table has a column for it.

## What's left

1. **Apply the migration** (`20261126120000_learner_state.sql`), once approved. Sync then switches on by itself for signed-in learners.
2. Fold `gradify.visited` (recently visited) into `activity`, so Recent is the same on every device.
3. Add the `assist` column to `assessment_attempts`, so mastery can weigh answers given after a hint.
4. Record "made from" for flashcard sets made from a lesson (mind maps and Notes pages do already), using `link(a, b, { by: "source" })`.
