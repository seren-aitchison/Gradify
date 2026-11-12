# Recovering Gradify's database

How to check a backup, prove it restores, and recover production safely. Release records, with each backup's checksum,
are kept in `docs/BACKEND-LOG.md`.

This document contains no credentials, backup files or learner data, and none should ever be added to it or to this
repository. The repository publishes the website.

> **Every write to production in this guide needs the owner's explicit approval, every time.** Nothing here may be run
> against production on the strength of this document, a log entry or an earlier approval. Practise everything on a
> temporary database first.

## Two kinds of backup

| | Logical backup (`scripts/supabase-admin.mjs backup`) | Supabase's own backups |
|---|---|---|
| What it holds | Every row of every public table: learner data, settings, billing records. Plus the schema and the list of applied migrations | The whole database, including sign-in accounts (`auth`) and storage metadata |
| What it leaves out | Sign-in accounts (counted, not copied), stored files, passwords, keys | Depends on the plan; check **Database → Backups** in the Supabase dashboard |
| When it's taken | Before every migration, by the owner or the release process | Automatically, on Supabase's schedule (point-in-time recovery on paid plans) |
| Best for | Undoing damage to one or a few tables; checking exactly what changed | Losing the whole project, or anything involving sign-in accounts |

Each logical backup is verified when it's taken: it's re-read with a matching hash, the counts are compared with the
live database, and it's restored into a separate temporary PostgreSQL database with every value compared. A backup that
fails any of these is reported as **not verified**, and no migration goes ahead.

## Keeping backups

- A logical backup contains learner data: display names, learner profiles, page-view logs, billing references. Treat it
  as personal data under UK GDPR.
- Store it **encrypted**, in private storage the owner controls (an encrypted disk image or volume, or an encrypted
  vault in a password manager). Keep a second copy somewhere separate.
- **Never** put it in this repository, in an issue or pull request, in chat, or in shared drives without encryption.
- Record its SHA-256 in `docs/BACKEND-LOG.md` when it's taken. The log may hold the checksum and totals, never the
  contents or the file's location.
- Keep it as long as it's needed to recover from the change it protects, then delete it securely. The privacy policy's
  retention periods still apply to its contents.
- A backup made inside a temporary working session (a cloud container, a scratch folder) is **not** a durable copy until
  it has been downloaded, checked against its SHA-256 and stored as above.

## What a restore costs: read this first

A backup is a picture of the database **at the moment it was taken**. Restoring it puts that picture back, and
**throws away everything written since**:

- goals, notes, flashcards, reviews and course progress learners created or changed after the backup;
- new accounts' data, waitlist sign-ups, page-view logs;
- billing changes recorded by the billing server (a learner who subscribed after the backup would lose their Pro record,
  even though Stripe still charges them).

Lost data can't be recovered unless a newer backup holds it. That's why every recovery starts with a fresh backup of the
current state, damaged or not, and why the smallest possible restore is always preferred.

| | Single-table restore | Full restore |
|---|---|---|
| What it replaces | Only the named tables, from the logical backup | The whole database, including sign-in accounts, via Supabase |
| What is lost | Changes since the backup **in those tables only** | **Every** change since the restore point, across the whole project |
| When to use it | One or a few tables damaged (a bad migration, a faulty bulk change) | The project is lost or broadly corrupted, or sign-in accounts are damaged |
| Rehearsal | Required, on a temporary database (section 2). No production-ready procedure exists yet (section 4) | Not possible locally; Supabase restores in place, so the fresh backup (section 3) is the safety net |

## 1. Check a backup's integrity

On a Mac:

```bash
shasum -a 256 gradify-<project>-<timestamp>.json
```

On Linux:

```bash
sha256sum gradify-<project>-<timestamp>.json
```

The result must equal the full SHA-256 recorded when the backup was taken (the log shows its first 16 characters; the
owner keeps the full value with the backup). If it differs, the file is damaged or isn't the right one: don't use it.

## 2. Prove it restores, without touching production

From a checkout of this repository (any commit at or after the backup's migrations; migrations are never edited once
applied), with dependencies installed (`npm ci`):

```bash
node --input-type=module -e '
import { readFile } from "node:fs/promises";
import { listMigrations } from "./scripts/supabase-admin.mjs";
import { restoreRehearsal } from "./scripts/pg-rehearsal.mjs";
const snap = JSON.parse(await readFile(process.argv[1], "utf8"));
const r = await restoreRehearsal(snap, await listMigrations());
console.log(r.ok ? `restore rehearsal ok: ${r.tables} tables, ${r.rows} rows` : `FAILED: ${r.problems.join("; ")}`);' /path/to/backup.json
```

This runs entirely on your machine, in a temporary PostgreSQL database (PGlite) that's thrown away afterwards. It
connects to nothing, so it can't touch production. It rebuilds the schema from the recorded migrations, loads every row,
and compares every value with the backup. The totals it prints must match the log.

Do this when a backup is taken, and again before relying on it for a recovery.

## 3. Before any production recovery

1. **Stop and assess.** Work out exactly what is wrong, which tables are affected and since when. Often the right fix
   is a small corrective migration, not a restore.
2. **Take a fresh backup first**, and verify it, even of the damaged state:
   `node scripts/supabase-admin.mjs backup <project-ref> <private-folder> --write`.
   It records what the restore will replace and lets the restore itself be undone.
3. **Choose the smallest recovery that works.** Prefer restoring one table to several, and several to everything.
   Write down what will be lost (see "What a restore costs").
4. **Rehearse it** on a temporary database, as in section 2, and check the result.
5. **Pause writes where possible.** Keep AI off (it is by default) and don't deploy during the recovery.
6. **Get the owner's explicit approval** for the exact recovery: which tables (or a full restore), which backup (its
   checksum), and what will be lost. Approval for one recovery doesn't cover another.

## 4. Recovering production (owner approval required)

**Single-table restore from a logical backup: not yet verified for production.** There is no tested procedure for
this yet. Everything below is **illustrative**. It describes what a procedure must handle; it is not a set of steps to
run. Before one is ever used, the exact SQL must be written for the approved tables, rehearsed on a temporary database
holding a fresh copy of production, reviewed, and approved.

What was checked against the live schema (10 November 2026, read-only):

- **The rehearsal shortcut doesn't work on production.** The local rehearsal (`loadRows` in `scripts/pg-rehearsal.mjs`)
  sets `session_replication_role = replica`, which switches off triggers *and* foreign-key checks. Only a superuser
  may set it, and the production admin role (`postgres` on Supabase) is not a superuser, so it would be refused. That's
  a good thing: with foreign-key checks off, a restore could leave rows pointing at nothing.
- **Deletes cascade.** Every learner table belongs to an account (`auth.users`, on delete cascade), and the notes tables
  form a chain: `documents` → `packs` → `cards` → `reviews`. Deleting rows from `documents` also deletes their packs,
  cards and reviews, and deleting `cards` deletes their reviews. So "one table" may really mean a parent and everything
  below it. Restore the chain together, parents first, or not at all.
- **Rows for accounts deleted since the backup** break the account foreign key. One such row fails the whole
  transaction. The SQL must leave them out explicitly (they belong to people who deleted their accounts, so leaving them
  out honours that).
- **Triggers that would act during a restore:**

  | trigger | table | effect if it fires |
  |---|---|---|
  | `activity_xp` | activity | adds each restored row's XP to the learner's profile again (double counting) |
  | `profiles_guard_xp` | profiles | blocks XP changes from client roles only; no effect for the admin role |
  | `tutor_usage_guard` | tutor_usage | refuses inserts except from the server roles; the admin role is allowed |
  | `goals_touch` | goals | sets `updated_at` to the restore time; harmless, but open editors will see "changed somewhere else" |

  `activity_xp` needs a decision for each restore: disable it for the restore's transaction (`alter table … disable
  trigger`, which the table owner can do), or restore `profiles` afterwards. Either must be rehearsed.
- **Self-numbering tables** (`activity`, `reviews`, `tutor_usage`, `page_events`, `waitlist`) need
  `overriding system value` to keep the backup's ids, then each table's sequence moved past the highest restored id.
  Otherwise the next new row collides with a restored one.
- **Row-level security** doesn't affect the admin role, so a restore can write any learner's rows. That's why the exact
  rows must be reviewed first.

When a procedure is written, it must run in one transaction, be rehearsed on a temporary database restored from the
fresh backup (section 3, step 2), and be followed by count and value checks against the backup, `rls-audit --write`,
another verified backup, and a record in `docs/BACKEND-LOG.md` (checksums and totals only).

**Full restore**, for a whole-project loss or damaged sign-in accounts: use Supabase's own restore (**Database →
Backups** in the dashboard). It replaces the whole database with its state at the restore point, so **everything after
that point is lost, in every table**. Take and download a fresh logical backup first (section 3), so data written since
can be put back table by table if needed.

A restored database may be **older than the website and apps** that use it. Keep learners out until all of these pass
(for example, take the site offline or show a maintenance notice, and keep AI off):

1. **Migration history.** Compare `supabase_migrations.schema_migrations` with `supabase/migrations/`
   (`node scripts/supabase-admin.mjs status <project-ref>`). Any migration released after the restore point is missing
   and must be re-applied, in order, through the normal reviewed process (backup, rehearsal, approval). Until then, the
   features it adds won't work.
2. **Schema compatibility.** Every table, column, function and policy the deployed code expects must exist. If a
   migration can't be re-applied yet, deploy the code version that matches the restored schema.
3. **Row-level security.** `node scripts/supabase-admin.mjs rls-audit <project-ref> --write`: every table on, each
   policy as recorded in the latest release entry.
4. **Sign-in.** Sign-in settings, email templates and redirect URLs (`auth-config`), and a real sign-in on the live site.
   Accounts created after the restore point no longer exist.
5. **Storage.** Buckets and their policies, if any are in use, and that files referenced by restored rows exist.
6. **Billing.** Compare `subscriptions` with Stripe. Subscriptions started or changed after the restore point must be
   brought back in line before learners return.
7. **The live site**, signed out and signed in, on desktop and mobile.

Record the restore, its restore point and every check in `docs/BACKEND-LOG.md`.

## 5. Rolling back a migration is not restoring a backup

Rolling back a migration removes what it added. Restoring a backup puts old rows back. They solve different problems,
and neither undoes the other.

- **Rolling back an additive migration** (one that only adds a table) means dropping that table. That **permanently
  deletes every row stored in it since the release**. For goals, `drop table public.goals` would delete every goal every
  learner has created since launch. Restoring the pre-migration backup would not bring them back, because that backup
  was taken before the table existed.
- **Restoring a backup** doesn't remove a migration's table. It puts back rows in the tables the backup holds, and loses
  newer changes to them.

So, for a migration that has gone wrong:

1. Prefer a **forward fix**: a new, reviewed migration that corrects the problem and keeps learners' data.
2. If a rollback really is necessary: take a fresh verified backup (it will now include the table's rows), export the
   table's rows separately, write down how many rows will be deleted and whose they are (counts, not contents), and get
   the owner's explicit approval for that loss.
3. Only then drop it. The app shows a removed feature as "not switched on" instead of failing.

Each migration's release record in `docs/BACKEND-LOG.md` says what rolling it back would delete.
