# Switching on accounts and Gradify AI

The Gradify app (`app.html`) works today with no setup: notes, cards and progress are saved in the learner's browser, and the quick extractor makes the flashcards. These steps switch on **accounts** (progress saved on every device) and **Gradify AI** (Claude reads the notes, including messy notes, diagrams and scans).

You need: a free Supabase account, an Anthropic API key, and about 30 minutes.

## 1. Create the Supabase project

1. Go to <https://supabase.com>, sign in and click **New project**. Pick a region close to your learners (London for the UK).
2. Wait for it to finish setting up.

## 2. Create the database

1. In the project, open **SQL Editor**, then **New query**.
2. Paste the whole of `supabase/migrations/20261028120000_gradify_core.sql` and click **Run**.
3. Do the same with `supabase/migrations/20261029120000_mastery_evidence.sql` (it adds the Mastery Engine's evidence to `reviews`). Run the files in date order.
4. Open **Table Editor**. You should see `profiles`, `documents`, `packs`, `cards`, `reviews`, `activity`, `plan_blocks` and `waitlist`, each marked "RLS enabled".

## 3. Turn on sign-in

1. **Authentication → Providers**: Email is on by default (sign-in links). Optionally turn on **Google**.
2. **Authentication → URL Configuration**: set **Site URL** to `https://getgradify.com/app.html` and add `https://getgradify.com/app.html` under **Redirect URLs**.

## 4. Deploy the Gradify AI function

On your computer, with the [Supabase CLI](https://supabase.com/docs/guides/cli) installed, from this repository's folder:

```bash
supabase login
```

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-...
```

```bash
supabase functions deploy study-pack
```

Optional settings (with their defaults):

```bash
supabase secrets set GRADIFY_DAILY_PACKS=10 GRADIFY_MAX_CHARS=120000 GRADIFY_ALLOWED_ORIGINS=https://getgradify.com
```

Your API key only ever lives in Supabase's secrets. It is never sent to the browser.

## 5. Connect the site

1. In Supabase, open **Project Settings → API**. Copy the **Project URL** and the **anon public** key.
2. Put them in `gradify.config.js`, at the root of the site:

   ```js
   export const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";
   export const SUPABASE_ANON_KEY = "eyJ...";
   ```

   The anon key is meant to be public. Row-level security is what keeps each learner's data private.
3. Commit and push. GitHub Pages publishes it in a minute or two.

## 6. Check it works

1. Open `https://getgradify.com/app.html`, go to **Account** and sign in with your email.
2. Add notes. The page should say "Gradify AI (Claude) will read your notes", and the deck should be badged "Made by Gradify AI".
3. In Supabase's Table Editor you should see your rows. Sign in as a second person and confirm they can't see the first person's notes.

## Costs and limits

- Each study pack is one Claude Opus 5.5 call. A typical lecture's notes are a few thousand tokens in and out, so a pack costs pennies. Check real numbers in the `packs` table (`input_tokens`, `output_tokens`).
- Each learner can make `GRADIFY_DAILY_PACKS` packs a day (10 by default), so one person can't run up your bill.
- Set a monthly spend limit in the Anthropic Console as well.

## Checking quality before launch

```bash
npm install
```

```bash
ANTHROPIC_API_KEY=sk-ant-... npm run eval:claude
```

This runs the notes in `tests/fixtures/` through Gradify AI and reports key-term coverage, how many cards are backed by a quote from the notes, invented facts and leaked answers. Add real notes from your subjects (with the key terms a good pack must include in `tests/fixtures/expected.json`) and aim for 90%+ coverage, 90%+ checked, and no invented facts.

## Known limits

- XP comes from activity rows the learner's browser writes (capped at 500 per row). A determined user could inflate their own XP. Leaderboards should move XP to server-side functions before they launch.
- The Supabase-connected code paths haven't yet been run against a live project, because no project existed when they were written. Test steps 6.1–6.3 carefully the first time.
