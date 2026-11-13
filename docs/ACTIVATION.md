# Production activation checklist

Merging code to `main` publishes the website. It does **not** change the database or deploy server functions. Each step below needs the owner's explicit approval, in this order. Nothing here runs automatically.

## What already works live without any of this

- **FSRS spaced repetition:** stored in the existing card columns.
- **Lesson time tracking:** stored in the existing `course_progress` table.
- **The learner model, Autopilot, Smart Plan, calendar import and export, widgets and Ask Gradify:** worked out in the browser from existing tables.
- **Reminders while Gradify is open.**
- **Learning events:** kept on each device until step 3 is done.

## What waits for activation

| Step | Turns on |
| --- | --- |
| 3 | The learning event ledger in the account (shared across devices) |
| 3 | The Gradify AI coach (the `coach` mode in the usage ledger) |
| 3, 5 | Push notifications when Gradify is closed |
| 4 | The coach's answers, calendar link sync, push sending |
| 6 | Google sign-in |

## 1. Review the migrations against live history

```sql
select version, name from supabase_migrations.schema_migrations order by 1 desc limit 5;
```

The newest applied version should be `20261113120000` or earlier. The three new files apply in this order:

1. `20261113130000_coach_mode.sql`: allows the `coach` mode in `tutor_usage`, and maps it to the tutor allowance.
2. `20261113140000_learning_events.sql`: the ledger. Append-only and owner-only: read, add and delete own rows, no updates. Unneeded privileges are revoked.
3. `20261113150000_push_subscriptions.sql`: owner-only device rows.

## 2. Review security and data handling

- **Row-level security:** each new table enables it, and every policy is `user_id = auth.uid()`.
- **Append-only:** `learning_events` has no update policy, and update is revoked from `authenticated`.
- **Delete all my data** (`CloudStore.wipe`) deletes `learning_events`. Deleting the account cascades to both new tables.
- **Export** (`CloudStore.exportAll`) includes `learning_events`.
- **Server access:** `push-send` is the only new user of the service role. `tests/secrets.test.mjs` checks four things:
  - it checks the cron secret first
  - it reads only `cards`, `plan_blocks`, `activity` and `push_subscriptions`
  - it never inserts
  - it changes only `push_subscriptions`

## 3. Rehearse, then apply

Run `npm ci` then `npm test`. The PGlite rehearsal applies every migration on real PostgreSQL through the production migrate code, including against existing data. With the owner's approval, rehearse against a production-shaped backup:

```bash
npm run supabase:admin -- backup
```

Then apply the migrations:

```bash
supabase db push
```

## 4. Deploy the functions

```bash
supabase functions deploy course-tutor
```

```bash
supabase functions deploy calendar-sync
```

```bash
supabase functions deploy push-send --no-verify-jwt
```

Check each function's environment variables first (they're listed in each function's header comment).

## 5. Configure push

Follow `docs/NOTIFICATIONS.md`:

1. Make the VAPID keys.
2. Put the public key in `gradify.config.js` as `PUSH_PUBLIC_KEY`.
3. Set the function secrets.
4. Schedule `push-send` every 15 minutes with the `x-cron-secret` header.

## 6. Switch on Google sign-in

In Supabase, go to Authentication, then Sign In / Providers, then Google, and turn it on with a Google Cloud OAuth client (client ID and secret). In Google Cloud Console, add this authorised redirect URI to the OAuth client:

```text
https://ezlohntrnassgsbofcfc.supabase.co/auth/v1/callback
```

In Supabase, go to Authentication, then URL Configuration, and check these settings:

- Site URL: `https://getgradify.com/app.html`
- Redirect URLs: `https://getgradify.com/**`

Until the provider is on, the app checks Supabase's public settings and hides the Google button rather than sending learners to an error page.

## 7. Verify signed in, on real devices

- Sign in, answer cards, and reload on a second device. The new `learning_events` rows should appear in the account, and Intelligence's Timeline should show them on both devices.
- Open a course lesson for a minute, then check that the `course_progress` row's `time` field and a `lesson_time` event appear.
- Ask Gradify a question while signed in. Gradify AI's answer should appear, and `tutor_usage` should gain a `coach` row.
- Sync a Google Calendar secret iCal link. Events should appear in Smart Plan.
- Turn on notifications on an iPhone, with Gradify on the Home Screen, and on a Mac. Then:
  - receive the morning plan at the chosen hour
  - check nothing arrives in quiet hours
  - check no more than the cap arrive in a day
- Google sign-in should complete and return to the app.
