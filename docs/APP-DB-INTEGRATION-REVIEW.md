# Gradify app–website database integration review

**Status: for review. Both migrations below are PROPOSED — NOT APPLIED.** Nothing in this review has been written to the
live Supabase project. Approving this review approves the plan and the migration text; applying the migrations and
switching on sign-in, sync or AI are separate approvals (section 6).

Branch `db/app-sync-migrations` · prepared 12 November 2026 · companion documents: [APP-API.md](APP-API.md),
[BACKEND-STATUS.md](BACKEND-STATUS.md), [PRODUCTION-READINESS.md](PRODUCTION-READINESS.md).

## 1. Executive summary

The native apps (iPhone, iPad, Mac; repository `gradify-apple`) already read the same courses as the website and keep
the learner's progress in the website's own formats. To become one product with the website, they need one account,
one synchronised record and one XP total. Most of that needs no database change: `course_progress`,
`assessment_attempts`, `profiles` and `goals` already exist. Two things do:

- **XP that can't be counted twice.** `activity` has no way to recognise a retried upload, so a lost reply could award
  the same XP twice. Migration 1 adds an optional event id.
- **A plan that can sync.** `plan_blocks` lacks the planner's repeats, all-day items, reminders, notes and per-day
  completion, and has no change timestamp. Migration 2 adds them.

| | Done | Pending |
|---|---|---|
| App progress format and merge | Matches the website's `mergeProgress` on 150 generated cases; keeps every website field | Live sync |
| Conditional saving (no overwrites) | App: built and tested. Website: `fix/progress-merge-and-auth-config` (pushed, not merged) | Merge, then a live two-device check |
| Answer history | Recorded in the website's attempt format with an outbox | Upload to `assessment_attempts` after sign-in |
| XP event ids | Migration 1 written and tested locally; the app already makes stable ids | Approval, application, website adoption |
| Planner sync | Migration 2 written and tested locally; the app stores plans in the `plan_blocks` shape | Approval, application, app and website sync code |
| Gradify AI | The app's client for `course-tutor` is built; it sends nothing without sign-in | Sign-in, then AI switched on in production |
| Sign-in | Designed: one account, 6-digit email code | Email template, email sending (SMTP), app code, live test |

## 2. Migration specifications

### Migration 1: `20261114120000_activity_event_id.sql` — PROPOSED — NOT APPLIED

```sql
alter table public.activity
  add column event_id text check (event_id is null or length(event_id) between 1 and 200);
create unique index activity_event_once on public.activity (user_id, event_id);
```

- **Affected:** `public.activity` only. The `activity_xp` trigger and the `daily_activity` view are unchanged (the view
  names its columns).
- **How it's used:** a client sends each award with a stable id (the apps use `<course>:<time>:<kind>:<item>`) and
  inserts with `on conflict (user_id, event_id) do nothing`. A repeated insert writes no row, so the after-insert XP
  trigger never runs for it.
- **Backwards compatibility:** existing rows keep `event_id` null. Rows written without an id — every row the website
  writes today — are never constrained, because PostgreSQL treats nulls as distinct in a unique index. No existing
  value changes.
- **Safeguards:** the check refuses empty or over-long ids; ids are unique per learner, so two learners can't collide.
- **Rollback:** `drop index public.activity_event_once; alter table public.activity drop column event_id;` XP already
  recorded is kept; only the duplicate protection is lost.

### Migration 2: `20261114130000_plan_blocks_app_fields.sql` — PROPOSED — NOT APPLIED

Adds to `public.plan_blocks`, each with a default or allowing null, and with its own check:

| Column | Type and default | Check |
|---|---|---|
| `all_day` | boolean, false | stored as 0–1440 minutes, which the existing checks allow |
| `repeats` | text, `'never'` | never, daily, weekdays, weekly, fortnightly, monthly |
| `repeat_until` | date, null | |
| `reminder_min` | int, null | 0 to 10,080 (a week) |
| `notes` | text, `''` | up to 4,000 characters |
| `course` | text, null | 1 to 60 characters |
| `done_days`, `skip_days` | date[], `'{}'` | up to 1,000 entries each |
| `updated_at` | timestamptz, now() | set by the database |

A trigger (`plan_blocks_touch`, the same as the existing `goals_touch`) sets `updated_at` on every insert and update,
always later than the previous value, and keeps `created_at`.

- **Backwards compatibility:** the website's planner (`kit/app/main.js`) inserts a few columns, reads `*`, and updates
  with the row it read. All three keep working (tested); a block the website writes is a plain one-off block. Until the
  website understands repeats, it shows a repeating item only on its first day.
- **Rollback:** `drop trigger plan_blocks_touch on public.plan_blocks; drop function public.plan_blocks_touch();` then
  drop the nine columns. Each device keeps its own copy of the values.

### What `updated_at` does and doesn't do

The trigger alone **does not prevent stale writes**. It guarantees that every change moves `updated_at` forward and that
a client can't set it back. Protection comes from the **conditional update**: a client that read a row at time *t* writes
`update … where id = :id and updated_at = :t`. If another device changed the row since, nothing is written, and the
client re-reads, merges and tries again. The apps' sync engine (`ProgressSync` in `gradify-apple`) already works this
way for `course_progress`; the planner sync must do the same, and the website's planner should adopt it too. Until
both clients write conditionally, a plain update can still overwrite a newer change.

## 3. Testing evidence

These are **local results on a copy of PostgreSQL (PGlite)**, run through the production migration code
(`scripts/supabase-admin.mjs migrate`). They don't show the live project is safe to change: see section 4.

| Suite | Result | What it shows |
|---|---|---|
| `tests/app-sync-migrations.test.mjs` | 5 of 5 | The two migrations are additive (no destructive statements, no settings changes); on a copy of existing data neither changes any existing value; a retried XP upload inserts once and adds XP once; the website's create, read and update of plan blocks still work; a write from an older copy is refused |
| The three migration suites together (the above, `pg-rehearsal`, `supabase-admin`) | 34 of 34 | Every migration in the repository, including both new ones, applies and verifies in order; backup and restore rehearsals; the admin tool's safety checks |
| The whole website suite (`npm test`) | 613 of 613 | Nothing else in the website changed. Five deployment checks first failed only because of a temporary folder link added to run the tests; re-run without it, all 8 deployment checks pass |
| The app's package (`gradify-apple`, `swift test`) | 58 of 58 | Merge, sync, mastery and planner logic, checked against the website's own code where they mirror it |

**Not yet tested:** these migrations on the live project; the live migration ledger (which earlier migrations,
including the proposed `20261113120000_client_privileges.sql`, are applied there); inserts with `on conflict` through
the live REST API (PostgREST) rather than SQL; the row-level security audit on the live project; sign-in and sync with
real accounts.

## 4. Security and data protection

- **Row-level security:** both tables keep their existing owner-only policies (`own activity`, `own blocks`). New
  columns are covered automatically: privileges are granted per table, not per column. No policy, grant or function
  privilege changes.
- **What the apps hold:** the project URL and the publishable key only. Never a secret or service-role key, and never
  an AI key: AI goes through the `course-tutor` function, which identifies the learner from their own token.
- **Backups:** before applying, run the admin tool's `backup` and keep the file offline. The restore path is rehearsed
  in `tests/pg-rehearsal.test.mjs`.
- **Applying:** one migration at a time with `migrate --next`. Each is verified object by object, and a failure rolls
  it back completely, ledger entry included.
- **Access token:** the tools need a Supabase personal access token limited to the Gradify project, with database read
  and write, Edge Functions read and deploy, and read access to secret *names*. It must not be able to read
  organisations or the project's API keys: the preflight refuses tokens that can, and the last attempt stopped there.
  The token is entered by the project owner on their own machine. **It is never written into this repository, this
  review, chat or a commit.**
- **Student data:** neither migration rewrites, moves or deletes a learner's rows (rehearsed with checksums of every
  existing value). Both are additive and reversible. Any test accounts used for live checks are created for the check
  and deleted after it, as `scripts/verify-backend.mjs` does.

## 5. Integration roadmap

| Stage | What | Depends on | Database change |
|---|---|---|---|
| 1 | Sign-in: one account, 6-digit email code in the app; website magic links unchanged | Email template showing the code; own email sending (Supabase's built-in service sends only a few emails an hour); app sign-in code | None |
| 2 | Progress and answer sync | Stage 1; website conditional save merged | None (`course_progress`, `assessment_attempts` exist) |
| 3 | XP in the account total | Stage 1; migration 1 applied; website sends event ids too | Migration 1 |
| 4 | Planner sync | Stage 1; migration 2 applied; conditional updates in both clients | Migration 2 |
| 5 | One learner profile (daily minutes, exam dates, goals) | Stage 1 | None (`profiles`, `profiles.learner`, `goals` exist) |
| 6 | Gradify AI | Stage 1; AI switched on in production | None |

**Merge order:** first `fix/progress-merge-and-auth-config` (the website saves without overwriting another device),
then `db/app-sync-migrations` (this review and the proposed migrations). Merging adds the migration files to the
repository; it doesn't apply them. Each branch must be re-checked against the latest `main` before merging.

## 6. Approvals

| Already approved | Still needed, each separately |
|---|---|
| Writing and testing the migrations locally | Merging each website branch |
| Pushing the review branches for review (CI tests only) | A project-limited access token, entered by the owner |
| This review document | Applying migration 1 to the live project |
| The app's sync and AI client code (not connected) | Applying migration 2 to the live project |
| | Changing the sign-in email template and setting up email sending |
| | Creating test accounts for the live checks |
| | Connecting the app to the live project (stages 1–4) |
| | Switching on Gradify AI |

## 7. Release checklist

Before any live database change:

- [ ] Both website branches reviewed, re-checked against the latest `main`, and merged in order
- [ ] Project-limited token in place; the preflight passes its token check
- [ ] The live migration ledger read: which migrations are applied, and whether earlier proposed ones (such as
      `20261113120000_client_privileges.sql`) go first
- [ ] Full backup taken and stored offline
- [ ] Migration 1 applied with `migrate --next` and verified; then migration 2, the same way
- [ ] Row-level security audit (`rls-audit`) passes
- [ ] Rollback steps rehearsed on a restored copy of the backup

Before switching on sync in the app:

- [ ] Two test accounts; sign-in by email code works on iPhone, iPad, Mac and the website
- [ ] A lesson completed on the website appears in the app, and the reverse; nothing lost when both save at once
- [ ] A retried XP upload counts once in the account total
- [ ] A plan edited on two devices: the older write is refused and merged, never silently lost
- [ ] One learner can't read another's rows (`verify-backend.mjs`)
- [ ] Test accounts deleted; results recorded in [BACKEND-LOG.md](BACKEND-LOG.md)
- [ ] Device checks for the app release: a real iOS 18 runtime, Low Power Mode, haptics, first-launch speed
