# Gradify backend status

A feature existing in the repository is not the same as a feature working for a learner. This page keeps the five questions apart. Only a passing run of the check below counts as evidence for questions 2 to 5.

| | Question | How it's answered |
|---|---|---|
| 1 | Is the backend code in the repository? | The files exist (the check confirms them) |
| 2 | Does a Supabase project exist, with every migration run? | `/auth/v1/settings` answers, and every migration's tables answer |
| 3 | Is the deployed site connected to it? | The live `gradify.config.js` has that project's URL and anon key |
| 4 | Do accounts and saving work in production? | A real test learner signs in, saves and reads back progress from a second session, can't see another learner's data, and signs out |
| 5 | Is the AI function deployed and answering? | `functions/v1/study-pack` is deployed and accepts the site's origin; with `--ai`, Claude returns a card through it |

## What's known now (5 November 2026)

1. **Code: in the repository.**
   - 10 migrations: core, mastery evidence, Body Intelligence, assessment attempts, course progress, tutor usage, revalidation, the learner profile, the tutor modes and usage counts. The check confirms each one has been run.
   - The `study-pack` and `course-tutor` Edge Functions.
   - The cloud store in `kit/data/store.js`, with a local fallback.
2. **Project: unknown.** No project URL is recorded anywhere in the repository or its history. Whether one exists can only be seen in the Supabase dashboard.
3. **Site connected: no.** `gradify.config.js` has an empty `SUPABASE_URL` and `SUPABASE_ANON_KEY` on every branch and throughout git history, and no build step injects them. This holds unless GitHub Pages is serving from an unusual source.
4. **Accounts in production: not working**, as follows from 3. Every learner's progress is saved in their own browser only, and the site says so.
5. **AI: not reachable from the site**, as follows from 3. Whether the function is deployed to a project is unknown. Until it's connected, the in-site assistant is labelled a scripted preview, and the notes tools use the in-browser extractor.

The verification code was itself tested against an imitation Supabase (`tests/backend-check.test.mjs`). It has not yet been run against a real project, because Supabase isn't reachable from the network these changes were made on.

## Readiness

The full plan, the evidence levels for each step of the student journey, and the activation runbook are in [PRODUCTION-READINESS.md](PRODUCTION-READINESS.md). Live results go in [BACKEND-LOG.md](BACKEND-LOG.md).

## How to verify (and switch on)

Follow `docs/SETUP.md` to create the project, run the migrations and deploy the function. Then:

1. In Supabase, go to **Authentication → Users → Add user → Create new user**, tick **Auto confirm**, and create two test learners (for example `test-a@yourdomain` and `test-b@yourdomain`, each with a long password). They are only for this check.
2. From your computer, in this repository, test the project *before* putting it in the site:

   ```bash
   GRADIFY_SUPABASE_URL=https://YOUR_REF.supabase.co GRADIFY_SUPABASE_ANON_KEY=eyJ... GRADIFY_TEST_EMAIL=test-a@... GRADIFY_TEST_PASSWORD=... GRADIFY_TEST_EMAIL_B=test-b@... GRADIFY_TEST_PASSWORD_B=... node scripts/verify-backend.mjs --ai
   ```

3. When everything passes, put the URL and anon key in `gradify.config.js`, then push.
4. Check the live site end to end, and record the result here:

   ```bash
   GRADIFY_TEST_EMAIL=test-a@... GRADIFY_TEST_PASSWORD=... GRADIFY_TEST_EMAIL_B=test-b@... GRADIFY_TEST_PASSWORD_B=... node scripts/verify-backend.mjs --site https://getgradify.com --ai --write
   ```

5. On a phone and on a computer, sign in at getgradify.com/app.html with a real email link, then open **getgradify.com/status.html** on each. It runs the same checks from the real site with that real account. Complete a lesson on one device and confirm it shows on the other.

The check uses only the public anon key, and refuses a `service_role` or `sb_secret_` key. Everything it writes (a `_verify` course-progress row and answer) is deleted before it finishes.

## Wording that waits for a passing check

Until questions 4 and 5 are **working** in a live run, the sites don't claim features that don't work yet:

| Now says | Goes back to, once verified |
|---|---|
| "One Gradify account is coming to every Gradify site; until then, your progress is saved in this browser." (every sub-site footer) | "One account works on every Gradify site." |
| "A Gradify site, designed to connect with Gradify LifeOS" (every sub-site badge) | "A Gradify site: your progress counts in Gradify LifeOS" |
| AI buttons: "Gradify AI isn't switched on yet" | Generated automatically once `gradify.config.js` is filled in |

Two content claims were changed for accuracy, not because of the backend: LawGradify's "Cases and statutes, checked" is now "Cases, statutes and legal reasoning", until the case cards have had independent legal review. NurseGradify's "Placement-ready" is now "Placement preparation", because exercises can't establish clinical competence.

## Last verification run

<!-- verify:start -->
Last run: 2026-11-09, `node scripts/verify-backend.mjs --site https://getgradify.com --write`, against ezlohntrnassgsbofcfc.supabase.co with 2 test accounts.

| | Question | Result |
|---|---|---|
| 1 | Backend code in the repository | **working** |
| 2 | Supabase project exists and is set up | **working** |
| 3 | Deployed site connected to it | **working** |
| 4 | Accounts and saving work in production | **working** |
| 5 | AI function deployed and answering | **failing** |

| Check | Result | Detail |
|---|---|---|
| Migrations, study-pack function and cloud store exist | ✓ | 13 files |
| The deployed site uses this project | ✓ | https://getgradify.com |
| Key is the public anon key | ✓ | publishable key |
| Supabase project answers | ✓ | https://ezlohntrnassgsbofcfc.supabase.co |
| Email sign-in is enabled | ✓ | email on, Google off |
| Every migration has been run | ✓ | 10 migrations present |
| Signed-out visitors can't read learner data | ✓ | No rows visible without signing in |
| Learner A can sign in | ✓ | gradify-check-a@getgradify.com |
| The account has a profile | ✓ | created by the sign-up trigger |
| Profile changes save | ✓ |  |
| XP can't be set from the browser | ✓ | guard_xp kept XP unchanged |
| Lesson progress saves to the account | ✓ |  |
| Answers save to the account | ✓ |  |
| Progress reads back on a second device (a new session) | ✓ |  |
| Learner B can sign in | ✓ |  |
| Learner B can't see or change learner A's progress | ✓ |  |
| documents: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| packs: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| cards: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| activity: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| plan_blocks: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| workouts: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| body_checkins: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| fitness_tests: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| revalidation_entries: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| tutor_usage: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| assessment_attempts: only its owner can read, change, delete or create a row | ✓ | read, change, delete and forged create by another learner all refused; unreadable signed out |
| profiles: only its owner can read or change it | ✓ |  |
| page_events: visitors can add a count but not read them | ✓ |  |
| Signing out ends the session | ✓ |  |
| The study-pack function is deployed | ✗ | Not found: run supabase functions deploy study-pack |
| The course-tutor function is deployed | ✗ | Not found: run supabase functions deploy course-tutor |
<!-- verify:end -->
