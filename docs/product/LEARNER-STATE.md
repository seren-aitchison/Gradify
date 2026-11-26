# Learner state: one record of where a learner is, on every device

Status: **requirements, not built.** The navigation work (sidebar, history, workspace tabs, "Pick up where you left
off", recent courses) keeps its state on the device today. This document says what that state is, which parts already
reach the account, and what one account-level learner-state system needs, so that it can be built once rather than
as a separate sync for each feature.

## What it's for

A learner should never have to tell Gradify again what they're studying, where they are, what they've finished or
what's next. Concretely:

- Start a lesson on a laptop, carry on from the same section on a phone.
- Open a flashcard set on a laptop, carry on revising it on a phone.
- A quiz answered halfway on one device shows as in progress, with the same count, on another.
- Planner, notes, courses and unfinished assessments agree on every device.
- Using two devices at once never duplicates progress, loses a completion or brings back something deleted.

## What already reaches the account

These sync today, each with its own merge. The learner-state system reads from them; it doesn't replace them.

| Data | Where in the account | How two devices are merged |
|---|---|---|
| Course progress (lessons done, quizzes, reading positions, bookmarks) | `course_progress`, one row per learner per course | `kit/course/progress.js mergeProgress`: completions are unions, the best score wins, settings come from the newer copy |
| Question attempts | `assessment_attempts` | Each attempt has its own id; uploads are idempotent (`kit/course/progress.js` outbox) |
| Flashcards, packs, reviews | `cards`, `packs`, `documents`, `reviews` | One row each; reviews are append-only |
| Planner blocks and goals | `plan_blocks`, `goals` | One row each; goals use `updated_at` as an expected version |
| Notes | `tool_items` (kind `kb`) | `kit/notes/kb/model.js merge`, rem by rem |
| Learning events | `learning_events` | Append-only |

## What is only on the device

| Key (localStorage unless noted) | Holds | Written by |
|---|---|---|
| `gradify.history` | Viewed, studied, created and edited events, including quiz and test states | `kit/ui/history.js` |
| `gradify.recent` | Each course's last lesson, progress and recommended next step | `kit/course/course.js shareProgress` |
| `gradify.visited` | Recently visited places | `kit/ui/places.js` |
| `gradify.pins` | Pinned courses, lessons and screens, in the learner's order | `kit/ui/places.js` |
| `gradify.workspace` | Workspace tabs, each with its place and scroll position | `kit/ui/workspace.js` |
| `gradify.session` | A study session from the planner and the step it's on | `kit/app/session-views.js` |
| `gradify.ui` | Sidebar rail, folded sections, extras opened, extras used and the learner's sidebar choices; History filters | `kit/ui/prefs.js` |
| `gradify.places` (sessionStorage) | This tab's trail, for "Back to where I was" | `kit/ui/places.js` |

## The model to build

One learner-state record per learner, made of a few kinds of entry. Each entry has a stable key that means the same
thing on every device, so two devices write to the same entry instead of creating two.

| Entry | Key | Fields | Merge rule |
|---|---|---|---|
| **Place**: where the learner was in something | the place's path without the domain, e.g. `/scigradify/biology/#/lesson/u01-01` | title, kind, subject, section and scroll position, `t` | Newest `t` wins |
| **Assessment**: a quiz, target test or exam | its path plus the attempt's start time | state (`in-progress`, `completed`), answered, total, score, pass, `t` | Within one attempt, `answered` only goes up and `completed` beats `in-progress`. A new attempt is a new entry. Status: not started, in progress, completed, or available to retry (finished under the pass mark), as `kit/app/continue-view.js assessmentStatus` |
| **Session**: a planned study session | its start time | steps, the current step, what the learner said about each | The step only goes forwards; feedback is a union |
| **Activity**: viewed, studied, created, edited | a generated id | act, place key, title, subject, count, `t` | Append-only, deduplicated by id; the half-hour merge stays a display rule |
| **Workspace**: the open tabs | slot (`kind:scope`, as `kit/ui/workspace.js slotOf`) | place key, title, scroll, `t` | Per slot, newest `t` wins; closing a tab is a tombstone with its own `t`, so a close isn't undone by an older copy |
| **Pins** | place key | title, order, pinned or unpinned and `t` | Per key, newest wins; order from the device that changed it last |
| **Preferences** | scope and name, e.g. `app.navChoice` | value, `t` | Per preference, newest wins |

Rules that hold for all of them:

- **Each device has an id**, and every write carries it with its time, so it's always possible to tell which device
  changed what and when, and to explain a conflict.
- **Nothing finished is lost.** Completions, best scores and solved questions stay unions or maximums, as course
  progress is today.
- **Deletions are tombstones**, never missing rows, so an old copy can't bring something back.
- **Device-only state stays on the device:** a tab's trail, the scroll position for a size of screen that isn't
  shared, and anything about which window is open.
- **Small and private.** The record holds places, titles, states and counts, never the content of notes, answers or
  documents, which stay in their own tables. Entries older than about a year can go.
- **Offline first.** The device copy is always used straight away and works signed out. Syncing happens in the
  background (on change, on focus and on `pagehide`, as course progress does), and the merge is the same function
  wherever it runs.

## How the code should reach it

One module, `kit/ui/learner-state.js`, with `get(kind, key)`, `put(kind, key, value)`, `list(kind)` and
`subscribe(f)`, backed by the device and, when signed in, by one account table. History, places, pins, workspace,
the session, sidebar preferences and Continue all read and write through it. None of them should have its own sync.

The account side is one table (for example `learner_state`: user id, kind, key, value, updated at, device id; its
primary key is user id, kind and key) with row-level security like `course_progress`, plus an append-only table for
activity if the volume needs it. The merge rules above run on the device before writing, so the database only
stores the result.

## Migration

1. Add `kit/ui/learner-state.js` over the existing local keys, with no change in behaviour, and move the features onto
   it one at a time. The local keys above become its device copy.
2. Add the account table and background sync, signed-in learners only, behind a flag, and compare the two copies.
3. Turn it on. On a learner's first sync, upload the device copy and merge it with any other device's.

## Done when

- The four behaviours under "What it's for" work between a laptop and a phone signed in to the same account.
- Two devices answering the same quiz, opening and closing tabs, and pinning and unpinning, in any order and
  offline, end in the same state with nothing duplicated or lost (tests for each merge rule).
- No feature has a sync path of its own.
