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
| No privileged credential in the repository | **Unit-tested on every push** (`tests/secrets.test.mjs`, checked against a planted key). The repository and its history were scanned clean on 6 Nov |
| Server functions act as the learner, never with the service role | Unit-tested |
| AI daily limits can't be reset by the learner | **Fixed 6 Nov.** study-pack counted its limit from packs, which learners can delete, and card rewrites had no limit at all. Both now count in the usage table, which learners can add to but never edit or delete |
| RLS on every public table | Built; `supabase-admin rls-audit` checks it live. **Not yet run** |
| Backup before migrating | `supabase-admin backup` (schema, counts and rows, written outside the repository). **Not yet run** |
| Migrations applied one at a time and verified | `supabase-admin migrate`: an all-or-nothing check first, then each migration in its own transaction, every object it creates checked, stopping at the first failure. **Not yet run** |

## Controlled deployment

This is a production deployment, not a set-up script. **If any check fails, the run stops.** No destructive step is taken, the evidence is kept in [BACKEND-LOG.md](BACKEND-LOG.md), and the owner gets a report of exactly what happened before anything else is done.

### Access, and what it's for

| Needed | What it's used for | Who provides it | How |
|---|---|---|---|
| Project URL and anon key | Connecting the site; the checks | Owner | Chat is fine: both are public by design |
| `ANTHROPIC_API_KEY` | The AI functions | Owner, directly in Supabase (Edge Functions → Secrets) | **Never through chat or this session** |
| Site URL and redirect URLs | Sign-in links | Owner, in Supabase (Authentication → URL Configuration): `https://getgradify.com/app.html`, `https://getgradify.com/**` | Set by hand, so the token doesn't need permission to change auth settings |
| Supabase access token | Running SQL (preflight, backup, migrations, audit, clean-up); deploying the two functions; reading secret **names** | Owner | **Only through the secure credential form**, never chat, a file or a log; revoked when the run ends |
| Two throwaway test accounts | The isolation matrix and live journey checks | Owner, in Supabase (Authentication → Users → Add user, auto-confirm), on addresses used for nothing else | Their passwords are throwaway and the accounts are deleted at the end |
| Network access | `api.supabase.com`, `<ref>.supabase.co`, `getgradify.com` | Owner approves the request | Approval prompt |

Never requested at all: the service-role key, the database password, or the Anthropic key's value. Nothing in this plan needs them. The service-role key is never fetched, even through the API, so test accounts are made by the owner, as above.

**Token scope (unverified).** As far as we know, a Supabase personal access token carries all of its user's permissions, across every organization the user belongs to, and can't be limited to one project or a set of actions. Supabase's documentation couldn't be read from the working environment to confirm this.

To restrict it anyway:
- Create a separate Supabase user and invite it only to the organization that holds Gradify, with the lowest role that can run SQL and deploy Edge Functions. That's likely "Developer"; check the role table under Organization → Team before relying on it.
- Generate the token from that user.
- Choose the shortest expiry, if one is offered.
- Revoke the token, and remove that user, at the end.

### Stop rules

| Step | Stops the run if… |
|---|---|
| `preflight` (read-only) | The project isn't healthy, or `ANTHROPIC_API_KEY` isn't set. Learner data already exists without an owner-taken full backup. Tables exist that no recorded migration made (the project was set up by hand) |
| `backup` | The backup can't be independently verified. It is read back from disk and its hash matched; every table's saved rows are checked against its count; the live database is re-counted and must match |
| `migrate --next` (one migration per run; review between) | It fails the all-or-nothing probe. A migration contains destructive SQL: drop, truncate, delete, update, rename or alter column (a constraint may only be dropped if the same migration re-adds it). A migration fails, which rolls it back. Anything it should create is missing. **Any table has fewer rows than before** |
| `rls-audit` | Any public table lacks RLS, or a learner table has no policy, is readable by anon, or has a read, change or delete policy that isn't limited to the row's owner |
| `verify-backend` (two test accounts) | Learner B can read, change, delete or **create in A's name** any learner-owned row. Signed-out visitors can read learner data. XP can be set from the browser |
| `check-live` | Any of the separately reported flows fails: authentication, progress sync, cross-device, offline recovery, expired session, AI |

Existing learner data is never overwritten, deleted or reset by this run:
- Migrations only add tables, columns, policies and widened constraints, and are refused otherwise.
- The checks touch only the two test accounts, plus one anonymous `/_verify` usage count.
- `check-live` restores the test account to how it found it.

### Activation runbook

Each step's output is appended to [BACKEND-LOG.md](BACKEND-LOG.md).

1. **Owner:**
   - Create the project (London region).
   - Set `ANTHROPIC_API_KEY` and the sign-in URLs.
   - Create the two test accounts.
   - Send the URL and anon key.
2. Approve network access, and enter the access token in the secure form.
3. `supabase-admin preflight <ref> --write`. This changes nothing.
4. `supabase-admin backup <ref> --write`. It is verified before anything else happens.
5. `supabase-admin migrate <ref> --next --write`, ten times, one migration each, reviewing the log between runs.
6. `supabase-admin rls-audit <ref> --write`.
7. Deploy `study-pack` and `course-tutor`, then `supabase-admin status <ref> --write` to confirm their versions.
8. `verify-backend --ai --write` with the two test accounts. This covers the isolation matrix, including forged writes, the XP guard, sign-out, and real AI through both functions.
9. Put the URL and anon key in `gradify.config.js` and push. CI tests it before publishing.
10. `check-live --ai --write` with `BASE=https://getgradify.com`. It reports each flow separately against the live site: authentication, progress sync, closing the tab, cross-device, offline recovery, expired session, and the real AI tutor.
11. **Owner, on a phone and a computer:**
    - Register with a real email link.
    - Complete a lesson.
    - Ask the tutor.
    - Get feedback on a written answer.
    - Open the other device and see everything there.
    - Open `status.html` on each.
12. Delete the test accounts, revoke the token, and remove any temporary Supabase user.
13. Write the readiness report: verified live, simulated only, and not tested.
14. Restore the stronger homepage wording listed in [BACKEND-STATUS.md](BACKEND-STATUS.md), only for claims that passed.
