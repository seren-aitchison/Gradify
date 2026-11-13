# Notifications

Gradify sends a few useful nudges, never more than the learner's daily cap (2 by default), never in their quiet hours (21:30–08:00 by default), and never the same kind twice in a day.

| Kind | When |
| --- | --- |
| Daily plan | At the learner's chosen hour: today's top priority, planned sessions and cards due |
| About to forget | From midday, when a topic they'd learned is about to drop below 70% recall |
| Deadlines | From 09:00 the day before an exam or deadline |
| Session starting | Up to 10 minutes before a planned session |
| Streak at risk | From 19:00, with a streak of 2+ days and nothing studied today |

The rules live in one file, `kit/intel/nudges.js`. `npm run sync` copies it to `supabase/functions/_shared/nudges.js`, and a test checks the two match, so the browser and the server always agree.

## Two levels

1. **While Gradify is open** (works now): once a learner turns notifications on, the open app checks every five minutes and shows due nudges through the service worker. No server needed.
2. **When Gradify is closed** (needs the steps below): Web Push to Chrome, Edge, Firefox, Safari on Mac, and Gradify on an iPhone or iPad Home Screen (iOS 16.4+). Safari on iPhone can't receive push from a website that hasn't been added to the Home Screen, so Settings tells the learner to add it first.

## Switching on push

1. **Make a VAPID key pair** (once):

   ```bash
   npx web-push generate-vapid-keys
   ```

2. **Publish the public key** by putting it in `gradify.config.js` as `PUSH_PUBLIC_KEY` (it's safe to publish).

3. **Set the function's secrets:**

   ```bash
   supabase secrets set VAPID_PUBLIC_KEY=… VAPID_PRIVATE_KEY=… VAPID_SUBJECT=mailto:you@example.com PUSH_CRON_SECRET=…
   ```

4. **Apply the migrations**, in order, after checking the live history (see `docs/TEST-BASELINE.md`):
   - `20261113130000_coach_mode.sql`
   - `20261113140000_learning_events.sql`
   - `20261113150000_push_subscriptions.sql`

5. **Deploy the function:**

   ```bash
   supabase functions deploy push-send --no-verify-jwt
   ```

   It checks the `x-cron-secret` header itself.

6. **Schedule it every 15 minutes.** In the Supabase dashboard go to Integrations, then Cron, then add a job that POSTs to `/functions/v1/push-send` with the header `x-cron-secret: <PUSH_CRON_SECRET>`.

## What the function does

For each learner with notifications on, it reads only these four tables:

- `cards` (due dates and repetitions)
- `plan_blocks` (yesterday to the day after tomorrow)
- `activity` (to work out the streak)
- their `push_subscriptions`

It builds the summary with `summaryFromRows`, decides with `decideNudges` in the learner's own time zone, sends to each of their devices, and records what it sent today across devices. It deletes subscriptions that the push service reports as gone (404 or 410).

## Privacy

A subscription row holds the device's push endpoint and keys, time zone and preferences. Learners can see and delete their own rows. Turning notifications off in Settings deletes this device's row. Notification text names a topic or deadline title at most. Nothing else about the learner leaves Supabase.
