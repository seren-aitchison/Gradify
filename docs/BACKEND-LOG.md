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

