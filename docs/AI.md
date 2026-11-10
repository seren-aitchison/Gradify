# Gradify AI: owner runbook

Gradify AI is the AI tutor (`course-tutor`) and AI study packs (`study-pack`), both Supabase Edge Functions that call
Claude with a server-side Anthropic key. **It is off, and the functions aren't deployed yet.** This page is how it's controlled, watched and switched on.
Costs: `docs/AI-COSTS.md`. The app contract: `docs/APP-API.md` (Gradify AI).

## How a request is controlled

Every request goes through one locked step in the database, `ai_claim_for`, before Claude is called:

1. **On?** `ai_settings.enabled`, or the learner is in `ai_testers`. Otherwise `ai_off`.
2. **Spending caps.** This month's and today's spend for everyone, plus the request's worst-case cost, must fit the
   monthly and daily budgets (`budget`). In-flight requests count at their worst case, so a burst can't overshoot.
3. **Rate limits.** Per learner a minute and an hour; overall a minute (`rate`, `busy`).
4. **Allowance.** Free or Pro, per feature, per month (`allowance`). A tutor conversation counts once for all its
   turns, up to the plan's turn limit (`conversation_long`).
5. **Fair use.** What the learner's requests have cost this month must be below their plan's cap (`fair_use`).

Then the function calls Claude, with the model the claim names for that feature (`ai_feature_models`), and `ai_settle_for` records the model, input, output and cache tokens, and the cost in
pence. A failed request (Claude unavailable, a refusal, an unusable answer, notes too long) gives the use back but its
cost still counts towards the budgets. An answer from the response cache costs nothing and gives the use back. A
request still marked in flight after 10 minutes (the function died) stops counting against the learner.

Only the Edge Functions can claim and settle (service role); learners can read their own allowance
(`my_ai_allowance()`) and nothing else. Token limits: every request has a fixed `max_tokens`; tutor inputs are capped in
`kit/assess/tutor.js`; study-pack notes are capped per plan (`ai_plan_caps.pack_chars`).

## Settings (Supabase SQL editor)

```sql
-- see everything
select * from public.ai_settings;  select * from public.ai_plan_caps;  select * from public.ai_limits;  select * from public.ai_prices;

-- spending caps (pence), rate limits, exchange rate
update public.ai_settings set monthly_budget_pence = 5000, daily_budget_pence = 500, per_minute = 6, per_hour = 60, global_per_minute = 120, gbp_per_usd = 0.79;

-- per-learner monthly fair-use caps (pence), conversation length, notes size for a pack (characters)
update public.ai_plan_caps set monthly_pence = 500, conversation_turns = 30, pack_chars = 120000 where plan = 'pro';

-- allowances (also shown on pricing.html: change kit/data/billing.js AI_ALLOWANCES in the same go; a test compares them)
update public.ai_limits set per_period = 5 where feature = 'pack' and plan = 'pro';

-- which model answers each feature (no deploy needed): tutor and explanations on Opus, packs and quizzes on Sonnet
select * from public.ai_feature_models;
update public.ai_feature_models set model = 'claude-opus-5-5' where feature in ('pack', 'quiz');

-- prices, US dollars per million tokens, when Anthropic's change
update public.ai_prices set input_usd = 4, output_usd = 20, cache_read_usd = 0.20, cache_write_usd = 5 where model = 'claude-opus-5-5';
```

## Watching usage and spend

- **Owner's page:** `https://getgradify.com/ai-usage.html`, signed in with an account listed in `ai_admins`:
  `insert into public.ai_admins (user_id) select id from auth.users where email = '<your email>';`
- **Command line:** `NODE_USE_ENV_PROXY=1 node scripts/ai-usage.mjs [--write]` (read-only; `--json` for raw figures).

Both show: on/off and testers, spend this month and today against the budgets, requests and learners, in-flight and
abandoned requests, a breakdown by feature and plan (requests, counted, failed, cached, tokens, cost, cost per request),
the top 20 learners by cost against their fair-use cap (by id prefix, never email), spend per day, cache reuse, and
failures with their reasons.

## Switching on: the checklist

1. Apply the migration and deploy (needs the owner's go-ahead; rehearsed against a backup of the live data):
   `node scripts/supabase-admin.mjs backup <ref> <dir> --write`, then `node scripts/supabase-admin.mjs migrate <ref> --existing-data-backed-up --write`,
   then deploy `course-tutor` and `study-pack`. While AI is off they refuse every request before any Claude call.
2. Set the key: Supabase → Edge Functions → Secrets → `ANTHROPIC_API_KEY`. Set a spend limit on the Anthropic side
   too (Anthropic Console → Limits) as a second safety net.
3. Make yourself an owner and a tester:
   `insert into public.ai_admins (user_id) select id from auth.users where email = '<your email>';`
   `insert into public.ai_testers (user_id) select id from auth.users where email = '<your email>';`
4. Test as that account on the website (and the app): an explanation, a Socratic conversation of several turns (one
   use), a study pack, the same notes again (`reused`, no new cost), an AI quiz. Check `ai-usage.html` after each:
   tokens and cost recorded, uses counted as expected.
5. Compare the real cost per request with `docs/AI-COSTS.md`, re-run `node scripts/ai-cost-model.mjs` with the real
   figures, and settle the model choice, allowances and fair-use caps.
6. Switch on for everyone: `update public.ai_settings set enabled = true;` (and put Gradify Pro on sale, docs/BILLING.md).
   Off again at any time: `update public.ai_settings set enabled = false;` (takes effect on the next request).

## Tests

`tests/ai-controls.test.mjs` (the database rules, in a real temporary PostgreSQL: who may claim, testers, allowances
and resets, failed and abandoned requests, subscription changes, conversations, rate limits, caps, prices, the cache,
the owner's view) and `tests/ai-flow.test.mjs` (the functions' request flow, including against the real ledger).
