# Production readiness

The goal is a real student who can register, take a course, complete lessons, get AI feedback, and find all of it on another device. Nothing else is being built until that works reliably. Subject content and new features are paused.

Each part of the journey is tracked at four levels of evidence, kept separate:

- **Built:** the code exists in the repository.
- **Unit-tested:** `npm test` checks it automatically on every push, and a failure blocks deployment.
- **Browser, stand-in:** the real pages ran in Chromium against a stand-in backend (`npm run check:sync`). This proves the site's own behaviour, not the real Supabase project.
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
| One learner can't read or change another's data | Yes (RLS on every table) | Yes, against a stand-in that enforces RLS | No | **Not yet**: `verify-backend` checks every table |

## Failure scenarios

| Scenario | What the learner experiences | Unit-tested | Browser, stand-in | Live |
|---|---|---|---|---|
| Offline mid-lesson | Work saves on the device; "You're offline… will sync" is shown; it's sent once on reconnecting | Yes | Yes | Not yet |
| The server rejects uploads | Answers stay queued; the next visit sends them all, without duplicates | Yes | Yes | Not yet |
| Tab closed within 3 s of finishing a lesson | The save is sent as the page closes (keepalive), so a second device still sees it | Partly | Yes; the check fails if the fix is removed | Not yet |
| Access token expires during an AI request | Refreshed once and retried, without the learner noticing | Yes | Yes | Not yet |
| Sign-in has ended | "Your sign-in has expired. Sign in again…"; work stays on the device | Yes | Yes | Not yet |
| AI service down, slow or unreadable | A plain message; a 90 s time limit; nothing is lost | Yes | Yes | Not yet |
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

## Activation runbook

Each step's output is appended to [BACKEND-LOG.md](BACKEND-LOG.md). A failure stops the sequence, and it is recorded rather than worked around.

1. **The project owner:**
   - Creates the Supabase project (London region).
   - Sends the project URL and anon key.
   - Sets `ANTHROPIC_API_KEY` in Supabase (Edge Functions → Secrets), so the key never passes through anyone else.
2. Access is granted to the session doing the work:
   - network access to `api.supabase.com` and the project's host
   - a Supabase access token through the secure credential form, never in chat, a file or a log
3. `supabase-admin status <ref>` confirms the project is healthy, and that `ANTHROPIC_API_KEY` is set, by name only.
4. `supabase-admin backup <ref>`.
5. `supabase-admin migrate <ref> --write`: the 10 migrations, in order.
6. `supabase-admin rls-audit <ref> --write`.
7. `supabase-admin auth-config <ref> --write`: the site URL and redirect URLs for getgradify.com.
8. Deploy `study-pack` and `course-tutor`.
9. `verify-backend` with two throwaway test accounts:
   - the full per-table isolation matrix
   - real AI requests through both functions
   - reading progress back from a second session
10. Put the URL and anon key in `gradify.config.js` and push. CI tests the change before publishing it.
11. `verify-backend --site https://getgradify.com --ai --write` against the live site.
12. **The project owner, on a phone and a computer:** register, open a course, complete a lesson, ask the tutor, get feedback on a written answer, then open the other device and see everything there. Open `status.html` on each.
13. Delete the test accounts and revoke the access token.
14. Restore the stronger homepage wording listed in [BACKEND-STATUS.md](BACKEND-STATUS.md), and only the claims that passed.
