# Staging (decision D1)

Gradify needs two Supabase projects. Today only production exists.

| | Production | Staging |
|---|---|---|
| Project | `ezlohntrnassgsbofcfc` (in `gradify.config.js`; history in `docs/BACKEND-LOG.md`) | **not created yet** |
| Data | real learners | synthetic test accounts only, never a copy of production |
| Migrations | applied only with the owner's approval, after a verified backup and a rehearsal (`docs/RECOVERY.md`) | every pending migration first, including Stage 1's |
| Credentials | production's own | its own; never shared with production, never in the repository |

## Creating it (owner)

1. In the Supabase dashboard, create a new project, **Gradify staging**, in the same region as production. Write down its project ref and its publishable (anon) key. The anon key is public by design; the service-role key and database password are not, so keep them in the dashboard or a password manager.
2. **Read production's migration history before anything else.** With a project-scoped credential, used locally (`npm run supabase:admin`, `docs/PRODUCTION-READINESS.md`), list `supabase_migrations.schema_migrations`. `docs/BACKEND-LOG.md` records migrations up to `20261112120000_goals.sql` (10 November). Seven later migrations (`20261113…` to `20261119…`) have no record of being applied, and `20261113120000_client_privileges.sql` says it isn't. Staging should start where production is, then go forward.
3. Apply to staging, in order: the migrations production has, then each pending one, then Stage 1 (`20261121120000`, `20261121130000`, `20261121140000`). The project is empty, so the rehearsal's backup gate doesn't apply.
4. Create synthetic accounts in staging (Authentication → Users), for example `staging-owner@…`, `staging-teacher@…` and `staging-student@…` on a domain you control.
5. Run the backend check against staging, never production:
   ```bash
   GRADIFY_SUPABASE_URL=https://<staging-ref>.supabase.co GRADIFY_SUPABASE_ANON_KEY=<staging anon key> GRADIFY_TEST_EMAIL=staging-a@… GRADIFY_TEST_PASSWORD=… GRADIFY_TEST_EMAIL_B=staging-b@… GRADIFY_TEST_PASSWORD_B=… node scripts/verify-backend.mjs
   ```
6. Email (decision D6): in Resend, verify a sending domain, create an API key **for staging only**, and set the `send-email` function's secrets in staging: `RESEND_API_KEY`, `GRADIFY_EMAIL_FROM`, `GRADIFY_SITE_URL`, `EMAIL_CRON_SECRET`. Deploy with `supabase functions deploy send-email --no-verify-jwt --project-ref <staging-ref>`, then schedule it every minute or two with the secret as the `x-cron-secret` header.

## Trying the site against staging

The live site always uses production (`gradify.config.js` on `main`). To try a branch against staging, serve it locally with a staging config that is never committed:

```bash
cp gradify.config.js /tmp/gradify.config.production.js
```

Edit `gradify.config.js` locally to the staging URL and anon key, run `npm run serve`, and **restore the file before committing** (`git checkout gradify.config.js`). Add a Supabase redirect URL for `http://localhost:8080/**` in staging only.

## What staging proves that the test suite can't

The test suite runs every migration on a real PostgreSQL (pglite) with Supabase's roles and privileges. That's the same check the production rehearsals use, and it covers every database rule in Stage 1. It can't check:
- Auth emails and redirects;
- PostgREST's handling of the functions (argument names, errors);
- the Edge Functions;
- Realtime;
- Storage;
- the browser against a real session.

Those need staging.
