# Course progress across devices: design for review

**Version 1, 8 November 2026. Status: proposed, approved in principle by the owner, awaiting design review.**
The design is tested, but nothing is switched on. The site still uses `kit/course/progress.js`, and no migration has
been added. The proposed database change is in `docs/proposed/course_progress_sync.sql`, outside
`supabase/migrations/`, so nothing runs it.

| Piece | File |
|---|---|
| Merge rules and the sync loop (pure JavaScript, no browser APIs) | `kit/course/sync.js` |
| Database change (version column, save function, review ids) | `docs/proposed/course_progress_sync.sql` |
| Phone/laptop scenarios against real PostgreSQL (PGlite) | `tests/progress-sync.test.mjs` (14 tests, passing) |
| Merge cases every client must agree on, including the Swift apps | `tests/fixtures/progress-sync.json` |

## 1. The problem

The account holds one row per learner per course, and each device saves by **replacing the whole row**. Two
devices saving in turn means the second removes what the first added (the first test reproduces this). Today the
lost work comes back only if the first device reopens the course with its storage intact. Two more gaps:

- **Undo and reset can't spread.** The current merge only ever adds, so a lesson marked not-done, or "delete my
  progress" (`store.js` `wipe`), comes back as soon as another device that still has the old copy syncs.
- **Corrections can lose.** A draft edited on two devices keeps the copy on the device that loads, not the newest
  edit.

## 2. The rules (your requirements, and how each is met)

| Requirement | How | Test |
|---|---|---|
| Two devices saving at the same time can't delete each other's progress | Version-checked save: the account accepts a save only from a device that has seen its latest copy. Otherwise it returns that copy, the device merges and retries | "phone and laptop saving at the same time", "a stale device never overwrites" |
| Merging is additive where appropriate | Lessons, chests, solved questions, weekly challenges, mocks: present on either device means present. Quiz and case scores: the best and the pass are kept. Cards: the one reviewed more | "phone and laptop…", legacy test |
| Newer corrections and resets are respected | Every entry records when it was written. Drafts, saved notes, goal, path and open sections take the most recent edit. Undo and reset are recorded (`removed`, `resetAt`), and anything written before them is dropped on every device | "corrections", "undoing a lesson sticks", "resetting a course" |
| A higher version never wins just for being higher | The version only detects that someone else saved. What's kept is decided entry by entry by the merge | "corrections…whatever the version numbers say" |
| No duplicate lessons, answers or reviews | Lessons are keyed by lesson id. The log is de-duplicated. Answers already have unique ids. Reviews get a device-made `client_id`, unique per learner | "no duplicates" |
| Offline progress syncs on reconnect | The device keeps working on its own copy. On reconnect, the same save-merge-retry runs | "offline for a week" |
| Deleting progress stays deleted | `wipe` writes a reset instead of deleting the row | "'delete my progress' can't be undone" |
| A wrong device clock can't rewrite history | Each save returns the server's time, and the device stamps its edits with its clock corrected by the difference | "a phone whose clock is two hours slow" |
| Learners stay isolated | The save function runs as the learner, so row-level security applies, and it only ever touches `auth.uid()`'s row. Signed-out visitors can't call it | "one learner can't save into another's progress" |
| Every device ends up with the same copy | Merge is order-independent and repeatable (checked on 300 random sets of three copies), with one known limit (§5) | "merging is order-independent" |

## 3. How a save works

```
device                                   account (save_course_progress)
  copy S, last seen version v   ──save(S, v)──▶  version still v?  yes → write, v+1, "saved"
                                                                    no  → "not saved", here's (copy, version)
  merge(S, copy), retry  ◀──────────────────────
```

Up to five tries, then it gives up for now. The device copy is kept, and the learner sees the existing
"Couldn't reach your account… Gradify will try again" message. In PostgreSQL, two saves arriving at the same moment
are serialised by the row lock: the second re-checks the version after the first commits, and is refused.

## 4. What changes when it's switched on (after review)

1. A migration made from `docs/proposed/course_progress_sync.sql`. It's additive: a new column with a default, a
   new function and a new column on `reviews`. No row or policy is changed.
2. `kit/course/course.js`: writes go through `put`, `setting`, `remove` and `reset` (so each is stamped);
   `pushProgress`, `pullProgress` and the page-close save call `sync`. The page-close save posts to the same function,
   so it can't overwrite either.
3. `store.js`: `saveCourseProgress` calls the function; `wipe` resets each course rather than deleting its row;
   `addReview` sends a `client_id` and ignores duplicates.
4. Existing saved progress needs no conversion. Entries without stamps use the time inside them, as the
   "progress saved before this change" test shows.
5. The Swift apps port `kit/course/sync.js` (about 150 lines) and run `tests/fixtures/progress-sync.json` in their
   own tests.

## 5. Known limit, and the choice made

A **quiz best score** can survive a course reset in one case: a device that was offline when the reset happened
had already combined a pre-reset score with a post-reset one. The merge can't separate them, so it keeps the better
score rather than discard work done after the reset. Lessons, drafts, settings and the log are always exact. Fixing
this would mean keeping every quiz attempt in the course row, and the attempts already live in
`assessment_attempts`, so mastery is unaffected.

**Also decided:** a lesson completed on two devices keeps the **latest** completion time, not the first. That's what
keeps "undo, then do it again" consistent everywhere, whatever order devices sync in. Each completion is still in
the log with its own time.

## 6. For review

1. The rules in §2, especially which parts add up and which take the latest edit.
2. The known limit in §5.
3. Then: turn the proposed SQL into a migration, rehearse it (`scripts/pg-rehearsal.mjs`) and wire it into the
   course, on this branch, before accounts go live.
