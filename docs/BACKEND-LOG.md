# Backend log

Evidence from the live Supabase project, appended by `node scripts/supabase-admin.mjs <command> <ref> --write` and recorded by hand for steps the tools can't do. Newest at the bottom. Nothing here is a unit test: every entry is a real result from the real project. See [PRODUCTION-READINESS.md](PRODUCTION-READINESS.md) for what each step means.

No entries yet: no Supabase project is connected (6 November 2026).

## 8 November 2026: production check (recorded by hand)

- **Site:** getgradify.com is serving commit 4c03332. Its `gradify.config.js` has an empty `SUPABASE_URL` and `SUPABASE_ANON_KEY`, so the live site isn't connected to any database. Accounts can't sign in, and progress stays on each learner's device, as the site says.
- **Management API:** a personal access token was saved for api.supabase.com on the session's environment. Every request was refused with HTTP 401, "Format is Authorization: Bearer [token]". That means the stored value didn't arrive as a valid token: it may be empty, or include its own "Bearer " prefix. No project was listed, so no preflight, backup or migration ran.
- **Pending migrations:** nothing has been applied to any production database. All 11 migrations, including `20261107120000_game_rewards.sql` (the unique index that refuses duplicate reward payments), apply and verify on a real PostgreSQL in `tests/pg-rehearsal.test.mjs`.
- **To finish:**
  1. Re-save the token: the bare `sbp_…` value, with no "Bearer " in front.
  2. Name the project ref.
  3. Run `preflight`.
  4. Run `backup`.
  5. Run `migrate --next` until none are pending.
  6. Run `rls-audit`.
  7. Connect the site in `gradify.config.js`.
  8. Run the two-account check in docs/BACKEND-STATUS.md.

  Steps 3–6 are `node scripts/supabase-admin.mjs <command> <ref> --write`.


## 2026-11-08 17:11 UTC · Preflight (read-only) · ezlohntrnassgsbofcfc

**Token scope check failed: nothing else was run.**

| check | status | result |
|---|---|---|
| Can read this project | 200 | ok |
| Can run SQL on this project | 201 | ok |
| Can list this project's Edge Functions | 200 | ok |
| Can read this project's secret names | 200 | ok |
| Cannot list projects across the account | 200 (this project only) | ok |
| Cannot read organisations | 200 | FAIL |
| Cannot read this project's API keys (not needed) | 200 | FAIL |

Create a token restricted to the Gradify project with only: database (read and write), Edge Functions (read and deploy), secrets (read names).

**Follow-up, same day:** the project owner saved a second token meant to be limited to the Gradify project. After the proxy pickup delay, preflight still showed it can read organisations and the project's API keys, so the gate refused it again. Nothing was read beyond the scope probe, and nothing was changed. Still to do: save a token that fails those two probes, or decide deliberately to accept a broader one. Then run `preflight`, `backup`, `migrate --next` until none remain, `rls-audit` and `auth-config` (each with `--write`, and `NODE_USE_ENV_PROXY=1` when running behind the session proxy). After that, set `SUPABASE_URL` in `gradify.config.js` and do the two-account check.

## 2026-11-09 23:47 UTC · Backup · ezlohntrnassgsbofcfc

**Failed:** Backup NOT verified: restore rehearsal: migration 20261028120000 differs from the version that was applied; restore rehearsal: migration 20261029120000 differs from the version that was applied; restore rehearsal: migration 20261031120000 differs from the version that was applied; restore rehearsal: migration 20261101120000 differs from the version that was applied; restore rehearsal: migration 20261105120000 differs from the version that was applied; restore rehearsal: migration 20261105130000 differs from the version that was applied; restore rehearsal: migration 20261105140000 differs from the version that was applied; restore rehearsal: migration 20261106120000 differs from the version that was applied; restore rehearsal: migration 20261106130000 differs from the version that was applied; restore rehearsal: migration 20261106140000 differs from the version that was applied; restore rehearsal: migration 20261107120000 differs from the version that was applied. Nothing has been changed; don't migrate.

## 2026-11-09 23:49 UTC · Backup · ezlohntrnassgsbofcfc

Backup written to /tmp/claude-0/-home-user/e12758f2-df7b-5438-89fd-958e31037ed2/scratchpad/backup-2026-11-10/gradify-ezlohntrnassgsbofcfc-2026-11-09T23-48-28-152Z.json (sha256 e462516fd4361111…, readable only by you) and **verified**: re-read from disk with a matching hash, every table's saved rows equal its count, a fresh count of the live database matches, and it was **restored into a separate temporary PostgreSQL database** (built from the 11 recorded migrations) with every row and value identical (16 tables, 534 rows). 16 public tables, 534 rows, 7 accounts (counted, not copied). 11 migrations already recorded.

Note: this is a logical snapshot through the API. Auth accounts and storage files aren't included; Supabase's own daily backups (and point-in-time recovery on paid plans) cover those.

| table | rows |
|---|---|
| activity | 0 |
| assessment_attempts | 0 |
| body_checkins | 0 |
| cards | 0 |
| course_progress | 0 |
| documents | 0 |
| fitness_tests | 0 |
| packs | 0 |
| page_events | 525 |
| plan_blocks | 0 |
| profiles | 7 |
| revalidation_entries | 0 |
| reviews | 0 |
| tutor_usage | 2 |
| waitlist | 0 |
| workouts | 0 |

## 2026-11-09 23:58 UTC · Migrations · ezlohntrnassgsbofcfc

Applied and verified 20261110120000_billing_and_ai_allowances.sql; paused there (--next).

| migration | result | objects checked | sha256 | detail |
|---|---|---|---|---|
| 20261028120000_gradify_core.sql | already applied |  | 669c6c071f0a |  |
| 20261029120000_mastery_evidence.sql | already applied |  | 1fa8fc1287fa |  |
| 20261031120000_sport_body_intelligence.sql | already applied |  | f57af713cf3d |  |
| 20261101120000_assessment_attempts.sql | already applied |  | 9a4dc8f0f92c |  |
| 20261105120000_course_progress.sql | already applied |  | 8e91fc50a9f0 |  |
| 20261105130000_tutor_usage.sql | already applied |  | e28f425f9254 |  |
| 20261105140000_revalidation.sql | already applied |  | ea912e3a20e6 |  |
| 20261106120000_learner_profile.sql | already applied |  | 94038916a0d5 |  |
| 20261106130000_tutor_modes.sql | already applied |  | 07067e243f59 |  |
| 20261106140000_page_events.sql | already applied |  | 0a42ad23bb52 |  |
| 20261107120000_game_rewards.sql | already applied |  | 40f556898d25 |  |
| 20261110120000_billing_and_ai_allowances.sql | applied and verified | 21 | aeafef577d4e |  |

## 2026-11-09 23:58 UTC · Row-level security audit · ezlohntrnassgsbofcfc

Every public table has row-level security, with policies limited to the row's owner where learners own the rows.

| table | rls | learner-owned | policies | result |
|---|---|---|---|---|
| activity | on | yes | 1 | ok |
| ai_limits | on | no | 1 | ok |
| ai_settings | on | no | 0 | ok |
| assessment_attempts | on | yes | 3 | ok |
| billing_events | on | no | 0 | ok |
| body_checkins | on | yes | 1 | ok |
| cards | on | yes | 1 | ok |
| course_progress | on | yes | 4 | ok |
| documents | on | yes | 1 | ok |
| fitness_tests | on | yes | 1 | ok |
| packs | on | yes | 1 | ok |
| page_events | on | no | 1 | ok |
| plan_blocks | on | yes | 1 | ok |
| profiles | on | yes | 1 | ok |
| revalidation_entries | on | yes | 4 | ok |
| reviews | on | yes | 1 | ok |
| subscriptions | on | yes | 1 | ok |
| tutor_usage | on | yes | 2 | ok |
| waitlist | on | no | 1 | ok |
| workouts | on | yes | 1 | ok |

## 2026-11-10 01:13 UTC · Backup · ezlohntrnassgsbofcfc

**Failed:** Backup NOT verified: page_events changed during the backup (549 → 550). Nothing has been changed; don't migrate.

## 2026-11-10 01:14 UTC · Backup · ezlohntrnassgsbofcfc

Backup written to /tmp/claude-0/-home-user/e12758f2-df7b-5438-89fd-958e31037ed2/scratchpad/backup-2026-11-10b/gradify-ezlohntrnassgsbofcfc-2026-11-10T01-13-33-731Z.json (sha256 add186d226e9e86a…, readable only by you) and **verified**: re-read from disk with a matching hash, every table's saved rows equal its count, a fresh count of the live database matches, and it was **restored into a separate temporary PostgreSQL database** (built from the 12 recorded migrations) with every row and value identical (20 tables, 570 rows). 20 public tables, 570 rows, 7 accounts (counted, not copied). 12 migrations already recorded.

Note: this is a logical snapshot through the API. Auth accounts and storage files aren't included; Supabase's own daily backups (and point-in-time recovery on paid plans) cover those.

| table | rows |
|---|---|
| activity | 0 |
| ai_limits | 8 |
| ai_settings | 1 |
| assessment_attempts | 0 |
| billing_events | 0 |
| body_checkins | 0 |
| cards | 0 |
| course_progress | 0 |
| documents | 0 |
| fitness_tests | 0 |
| packs | 0 |
| page_events | 550 |
| plan_blocks | 0 |
| profiles | 7 |
| revalidation_entries | 0 |
| reviews | 0 |
| subscriptions | 1 |
| tutor_usage | 3 |
| waitlist | 0 |
| workouts | 0 |

## 2026-11-10 01:15 UTC · Migrations · ezlohntrnassgsbofcfc

All migrations applied and verified.

| migration | result | objects checked | sha256 | detail |
|---|---|---|---|---|
| 20261028120000_gradify_core.sql | already applied |  | 669c6c071f0a |  |
| 20261029120000_mastery_evidence.sql | already applied |  | 1fa8fc1287fa |  |
| 20261031120000_sport_body_intelligence.sql | already applied |  | f57af713cf3d |  |
| 20261101120000_assessment_attempts.sql | already applied |  | 9a4dc8f0f92c |  |
| 20261105120000_course_progress.sql | already applied |  | 8e91fc50a9f0 |  |
| 20261105130000_tutor_usage.sql | already applied |  | e28f425f9254 |  |
| 20261105140000_revalidation.sql | already applied |  | ea912e3a20e6 |  |
| 20261106120000_learner_profile.sql | already applied |  | 94038916a0d5 |  |
| 20261106130000_tutor_modes.sql | already applied |  | 07067e243f59 |  |
| 20261106140000_page_events.sql | already applied |  | 0a42ad23bb52 |  |
| 20261107120000_game_rewards.sql | already applied |  | 40f556898d25 |  |
| 20261110120000_billing_and_ai_allowances.sql | already applied |  | aeafef577d4e |  |
| 20261110180000_monthly_ai_windows.sql | applied and verified | 1 | c565a2ddcac0 |  |

## 2026-11-10 01:18 UTC · Stripe check (read-only) · ezlohntrnassgsbofcfc

Everything matches what the site sells.

| check | result | detail |
|---|---|---|
| Stripe account | ok | GB, default currency gbp, charges enabled |
| Mode | ok | LIVE: real payments |
| Gradify Pro monthly price | ok | price_1Ua3NEEOmpIuKzUMXI11yUK4: GBP 7.99 every 1 month, inclusive of tax, active; product "Gradify Pro" active; site sells 7.99 |
| Gradify Pro yearly price | ok | price_1Ua3NEEOmpIuKzUM8q1nDCab: GBP 63.99 every 1 year, inclusive of tax, active; product "Gradify Pro" active; site sells 63.99 |
| Both prices on the same product | ok | prod_VbFtYIrZfgHAtD |
| No duplicate Gradify products | ok | prod_VbFtYIrZfgHAtD "Gradify Pro" |
| Webhook endpoint | ok | we_1Ua3NFEOmpIuKzUM5WTc9Qwp enabled, API 2025-08-27.basil, 1 endpoint(s) for this URL |
| Webhook events | ok | checkout.session.completed, customer.subscription.created, customer.subscription.updated, customer.subscription.deleted, customer.subscription.paused, customer.subscription.resumed |
| Billing portal | ok | bpc_1Ua3NFEOmpIuKzUMj2Ai3lNL (default): cancel at_period_end, card updates on, invoices on |
| Portal plan switching | ok | monthly ↔ yearly |
| Supabase secret STRIPE_SECRET_KEY | ok | set |
| Supabase secret STRIPE_WEBHOOK_SECRET | ok | set |
| Supabase secret STRIPE_PRICE_MONTH | ok | set |
| Supabase secret STRIPE_PRICE_YEAR | ok | set |
| STRIPE_PRICE_MONTH is the live monthly price | ok | compared by SHA-256 |
| STRIPE_PRICE_YEAR is the live yearly price | ok | compared by SHA-256 |
| Gradify Pro on sale | ok | GRADIFY_PRO_ON_SALE not set: only GRADIFY_BILLING_TESTERS can check out; testers not set |
| Existing subscriptions | ok | 0 |

Changes made by this check: none.
