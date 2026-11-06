# Production readiness

The goal is a real student who can register, take a course, complete lessons, get AI feedback, and find all of it on another device. Nothing else is being built until that works reliably. Subject content and new features are paused.

Each part of the journey is tracked at four levels of evidence, kept separate:

- **Built:** the code exists in the repository.
- **Unit-tested:** `npm test` checks it automatically on every push, and a failure blocks deployment.
- **Browser, stand-in:** the real pages ran in Chromium against a stand-in backend (`npm run check:sync`, 18 checks). The live check, `scripts/check-live.cjs`, has also been rehearsed against the stand-in (17 of 17). This proves the site's own behaviour, not the real Supabase project.
- **Live:** verified on getgradify.com against the real project, with the evidence recorded in [BACKEND-LOG.md](BACKEND-LOG.md).

Last updated 6 November 2026. No Supabase project is connected yet, so **nothing that needs the backend has been verified live**.

## The student journey

| Step | Built | Unit-tested | Browser, stand-in | Live |
|---|---|---|---|---|
| Register (email sign-in link) | Yes | No (needs a real mail flow) | No | **Not yet** |
| Sign in and out; the session survives a reload | Yes | Yes: sign-out ends the refresh token (`backend-check`) | Session seeded, not signed in through email | **Not yet** |
| Choose a course, complete a lesson | Yes | Yes | Yes | **Not yet** (works today in browser-only mode) |
| Answers saved to the account | Yes | Yes (idempotent upload, outbox) | Yes | **Not yet** |
| Ask the AI tutor | Yes | Yes (request building, safety rules, reply checks) | Yes, against a stand-in function | **Not yet**: the real model has never been called |
| AI feedback on a written answer | Yes (Law, Nursing, Pharmacy) | Yes | No | **Not yet** |
| A second device sees the lessons and the answers | Yes (fixed 6 Nov: answers didn't sync before) | Yes | Yes | **Not yet** |
| One learner can't read, change, delete or forge another's data | Yes (RLS on every table) | Yes: every learner table, including forged writes in another learner's name | No | **Not yet**: `verify-backend` checks every table |

## Failure scenarios

| Scenario | What the learner experiences | Unit-tested | Browser, stand-in | Live |
|---|---|---|---|---|
| Offline mid-lesson | Work saves on the device; "You're offline… will sync" is shown; it's sent once on reconnecting | Yes | Yes | Not yet |
| The server rejects uploads | Answers stay queued; the next visit sends them all, without duplicates | Yes | Yes | Not yet |
| Tab closed within 3 s of finishing a lesson | The save is sent as the page closes (keepalive), so a second device still sees it | Partly | Yes; the check fails if the fix is removed | Not yet |
| Access token expires during an AI request | Refreshed once and retried, without the learner noticing | Yes | Yes | Not yet |
| Sign-in has ended | "Your sign-in has expired. Sign in again…"; work stays on the device | Yes | Yes | Not yet |
| AI service down, slow or unreadable | A plain message; a 90 s time limit; nothing is lost | Yes | Yes | Not yet |
| The server rejects a stored token before the browser thinks it's expired (wrong clock, revoked token) | Refreshed once before the learner is treated as signed out; found 6 Nov while rehearsing `check-live`, and fixed | Yes (rehearsal) | Yes | Not yet |
| AI daily limit reached | The service's message (for example "You've made 10 study packs today") | Yes | No | Not yet |

## Platform safeguards

| Safeguard | State |
|---|---|
| The site is published only after tests pass | **Live.** Pages deploys from GitHub Actions; on the 5 Nov push, only the tested workflow published |
| Only the website's own files are published | **Live, 6 Nov.** The deploy builds from an allowlist (`scripts/build-site.mjs`; `tests/deploy.test.mjs`) and fails if anything else would be published or a needed file is missing. On getgradify.com, `docs/`, `scripts/`, `supabase/`, tests and package files all answer 404, and `scripts/check-site.cjs` found all 150 pages and offline mode working. Before this, those files were public; an audit found no credential or personal data in them |
| No privileged credential in the repository | **Unit-tested on every push** (`tests/secrets.test.mjs`, checked against a planted key). The repository and its history were scanned clean on 6 Nov |
| Server functions act as the learner, never with the service role | Unit-tested |
| AI daily limits can't be reset by the learner | **Fixed 6 Nov.** study-pack counted its limit from packs, which learners can delete, and card rewrites had no limit at all. Both now count in the usage table, which learners can add to but never edit or delete |
| RLS on every public table | Built; `supabase-admin rls-audit` checks it live. **Not yet run** |
| Backup before migrating | `supabase-admin backup`: written outside the repository, verified, and **restored into a separate temporary PostgreSQL database and compared value for value**. The restore is tested in CI. **Not yet run live** |
| Migrations applied one at a time and verified | Statement allowlist, a rehearsal on a copy, each migration in its own transaction, every object it creates checked, content checksums before and after. All ten apply on real PostgreSQL in CI. **Not yet run live** |

## Controlled deployment

This is a production deployment, not a set-up script. **If any check fails, the run stops.** No further change is made, the evidence is kept in [BACKEND-LOG.md](BACKEND-LOG.md), and the owner gets a report of exactly what happened. **Nothing starts until the owner explicitly approves it.**

### Supabase plan and region

These requirements couldn't be checked against Supabase's current pricing and documentation from the working environment. Confirm each one on supabase.com before creating the project.

| Requirement | Why |
|---|---|
| Region: **London (eu-west-2)** | Learners are in the UK, and the region can't be changed later without moving the project |
| A plan whose projects **don't pause when idle** | A paused project means a student can't sign in. As far as we know, Free projects pause after a period of inactivity |
| **Platform backups that include sign-in accounts**, ideally with point-in-time recovery | The run's own backup covers learner data, not the `auth` schema (accounts), storage or settings. Restoring accounts depends on Supabase's backups. As far as we know these are on paid plans (daily on Pro, point-in-time recovery as an add-on) |
| **Custom SMTP** for sign-in emails, before real students register | Supabase's built-in email is meant for testing and is heavily rate-limited. Registration only works reliably at scale with an email provider configured |

### Access, and what it's for

| Needed | What it's used for | Who provides it | How |
|---|---|---|---|
| Project URL and anon key | Connecting the site; the checks | Owner | Chat is fine: both are public by design |
| `ANTHROPIC_API_KEY` | The AI functions | Owner, directly in Supabase (Edge Functions → Secrets) | **Never through chat or this session** |
| Site URL and redirect URLs | Sign-in links | Owner, in Authentication → URL Configuration: `https://getgradify.com/app.html`, `https://getgradify.com/**` | Set by hand |
| **Scoped** personal access token | See below | Owner | **Only through the secure credential form**; revoked when the run ends |
| Network access | `api.supabase.com`, `<ref>.supabase.co`, `getgradify.com` | Owner approves the request | Approval prompt |

Never requested at all: the service-role key, the database password, the Anthropic key's value, or any password. The two throwaway test accounts are created by the run itself, after the migrations:
- each password is generated in memory and never shown, logged or written
- only a bcrypt hash, made locally, reaches the database
- the accounts are deleted at the end, and the run confirms they're gone

**Token permissions.** The token must be restricted to the Gradify project, with nothing account-wide. These are the exact operations the run performs; choose the matching scopes when creating it:

| Operation | Management API | Used by |
|---|---|---|
| Read the project | `GET /v1/projects/{ref}` | preflight, status |
| Run SQL, read and write | `POST /v1/projects/{ref}/database/query` | preflight, backup, migrations, RLS audit, test accounts |
| Read and deploy Edge Functions | `GET` and deploy `/v1/projects/{ref}/functions` | deployment, status |
| Read secret **names** | `GET /v1/projects/{ref}/secrets` | preflight (is `ANTHROPIC_API_KEY` set?) |

Not needed, and must be refused:
- other projects, or organisation-level data
- the API keys
- writing secrets
- auth settings, billing, branches, storage

Preflight proves this before anything else. It checks that each needed operation works and each forbidden one is refused, using HTTP status codes only. Response bodies are discarded unread. If the token reaches anything beyond the project, nothing else runs.

### Order of the run

1. **Preflight** (read-only): token scope; project healthy; `ANTHROPIC_API_KEY` set (by name); **the project is empty** (no accounts, no tables).
2. **Backup of the empty project**, verified:
   - re-read from disk with a matching hash
   - each table's saved rows checked against its count
   - the live database re-counted
   - **restored into a separate temporary PostgreSQL database** and compared value for value
3. **Migrations, one at a time** (10). For each:
   - the **statement allowlist**
   - a **rehearsal on a temporary copy** of the current data, where every existing value must be unchanged
   - the live apply, in one transaction with its ledger entry
   - **every object it should create** checked
   - **content checksums** of every pre-existing value, before and after
   - the run proceeds to the next only if all of these pass
4. **RLS audit** of the whole public schema.
5. **Backup again**, verified and restore-rehearsed: the post-migration baseline.
6. **Deploy** `study-pack` and `course-tutor`, then confirm their versions.
7. **Live verification, backend:**
   - throwaway accounts created and each proved by signing in
   - the per-table isolation matrix (read, change, delete and forged create by the other learner; reads by signed-out visitors)
   - the XP guard and sign-out
   - both AI functions answering for real
   - accounts deleted
8. **Connect the site:** the URL and anon key go into `gradify.config.js` and are pushed; CI tests before publishing.
9. **Live verification, website:** each flow reported separately against getgradify.com: authentication, progress sync, closing the tab, cross-device, offline recovery, expired session, the real AI tutor.
10. **Owner, on a phone and a computer:** the real journey, from registering with an email link through to seeing everything on the second device.
11. **Revoke the token**, and remove the saved credential from the environment's settings.
12. **Readiness report:** verified live, simulated only, and not tested.

### What the safeguards do and don't prove

- **The migration allowlist** refuses anything it doesn't recognise as safe DDL. That includes `DO` blocks, `EXECUTE`, `CALL`, `COPY`, data changes, grants, `ALTER POLICY`, disabling RLS, ownership changes, type changes, and `CREATE TABLE … AS`. It also refuses calls to project functions in clauses evaluated against existing rows: defaults, checks, generated columns and index expressions. Function bodies are allowed, because they only run when called later. The guard is static; it can't prove what a function will do when it eventually runs.
- **The rehearsal and checksums** are the dynamic layer. The migration runs on a real copy of the data first, and every pre-existing value is compared afterwards, on the copy and again on production. Values in columns the migration adds aren't compared, because they didn't exist before.
- **The restore rehearsal** proves the backup reloads completely and exactly into a database built from the same migrations. It doesn't cover sign-in accounts, storage or project settings; Supabase's platform backups do.
- **All of this is tested against real PostgreSQL**, in `tests/pg-rehearsal.test.mjs` on every push:
  - all ten migrations applied through the production code
  - a backup restored value for value
  - a data-changing migration and a migration that fails on existing data, both caught
  - 22 kinds of unsafe SQL refused
