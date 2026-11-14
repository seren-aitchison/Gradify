# Test baseline

A recorded comparison of `npm test` before and after the launch and intelligence work, so the database tests can be trusted rather than explained away.

## The "10 failing tests" were a missing dependency

Earlier runs in a fresh cloud sandbox reported 10 failures:

- `ai-controls`
- `ai-flow`
- `billing-client`
- `billing-lifecycle`
- `billing`
- `pg-rehearsal`
- `supabase-admin`
- two goals table tests
- one waitlist table test

All 10 had one cause: `node_modules` wasn't installed, so `@electric-sql/pglite` was missing (`ERR_MODULE_NOT_FOUND` from `scripts/pg-rehearsal.mjs`). Those tests build a real Postgres database (PGlite) from `supabase/migrations/` in order, then check row-level security, billing, allowances, goals and the waitlist against it. Nothing in them was broken.

**Always run `npm ci` before `npm test`.**

## Recorded runs (13 November 2026, `npm ci` then `npm test`)

| Commit | What | Pass | Fail |
| --- | --- | --- | --- |
| `3be2178` | Before the launch work (clean checkout with its own `node_modules`) | 680 | 0 |
| This branch | After launch, dashboard, Intelligence, Autopilot, calendar sync, coach, ledger, knowledge debt, calibration, push | 729 | 0 |
| 14 November 2026 | After FSRS reference validation (`srs-reference`), glass icons and Intelligence 3.0 (`intel3`), merged with main | 762 | 0 |

The extra tests on this branch are new suites, not changes to old ones:

- `intel`
- `ical`
- `nlp`
- coach in `tutor-modes`
- `debt`
- `calibrate`
- `nudges`
- `ledger`

The migration rehearsal (`pg-rehearsal`) applies every migration in filename order on real PostgreSQL through the production migrate code. That includes `20261113130000_coach_mode.sql`, `20261113140000_learning_events.sql` and `20261113150000_push_subscriptions.sql`. It caught a column-level `grant` in the push migration, which the safety allowlist (`scripts/supabase-admin.mjs`) refuses, and that statement was removed.

## Migration order

`coach_mode` was first dated `20261114120000`, a day ahead. It's now `20261113130000`, after `20261113120000_client_privileges.sql`, and the new migrations follow it. Before applying any of them to the live project:

1. Check the live history: `select version, name from supabase_migrations.schema_migrations order by 1;`
2. Confirm the last applied version is `20261113120000` or earlier.
3. Read each new file in `supabase/migrations/` (they're short and say what they change).
4. Apply them in order with `supabase db push`.
5. Deploy the functions with `supabase functions deploy <name>`, after checking their environment variables (see each function's header).
