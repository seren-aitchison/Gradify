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
| Resource menu (•••) on lessons, courses, packs and every app screen | pins, collections, notes | pin, save to a collection, note, schedule | `resource-actions.js` → `places.js`, `links.js` |
| Connections panel (lesson panel, flashcard sets, any ••• menu) | links, collections, notes, every course's lessons and topics | link, unlink | `connections.js` → `links.js` |
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

1. **Apply the migration** (`20261126120000_learner_state.sql`). Sync then switches on by itself for signed-in learners.
2. Fold `gradify.visited` (recently visited) into `activity`, so Recent is the same on every device.
3. Add the `assist` column to `assessment_attempts`, so mastery can weigh answers given after a hint.
4. Record "made from" links where tools create things from a lesson (a mind map or a flashcard set from a lesson), using `link(a, b, { by: "source" })`.
