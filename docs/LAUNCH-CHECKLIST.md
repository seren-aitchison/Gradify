# Gradify AI and Pro billing: launch checklist

One ordered checklist for switching Gradify AI on and putting Gradify Pro on sale. It combines
[AI.md](AI.md) (controls, costs, switching on) and [BILLING.md](BILLING.md) (Stripe, the first payment, going on sale).
Those two pages stay the reference for *how* each control works; this page is the order to do things in and the
evidence to keep.

Written 12 November 2026. State on that date: Gradify AI is **off** (no Anthropic key, no testers), Pro is **not on
sale**, Stripe is in live mode with `gradify_pro_month` (£7.99) and `gradify_pro_year` (£63.99), and the terms page and
checkout consent are a draft in pull request #4, waiting for legal review.

## How to use it

- Work through the stages in order. Each stage ends in a **hold point**: don't start the next stage until every box in
  the current one is ticked and its evidence is written down.
- **If any check gives an unexpected result, stop.** Don't change anything else. Write down exactly what happened in
  [BACKEND-LOG.md](BACKEND-LOG.md) and fix the cause before carrying on.
- Record every stage under a dated heading in BACKEND-LOG.md, as the evidence template at the end shows.
- Stages 1 to 3 cost a small, bounded amount: a few pounds of AI usage and one £7.99 payment, which you can refund.
  Nothing in those stages is visible to learners.
- Pushing to `main` deploys the website within about a minute. In this checklist only stages 4 and 5 push to `main`.

| Stage | What it proves | Who sees it | Can be undone |
|---|---|---|---|
| 1. Prerequisites | Everything is in place and nothing has drifted | Nobody | Nothing is changed |
| 2. AI cost testing | Gradify AI works, is counted correctly and costs what was modelled | You, as a tester | Remove the key or the tester |
| 3. First real payment | Checkout, webhook, Pro allowances, portal and cancellation all work with real money | You, as a billing tester | Refund in Stripe |
| 4. Stripe consent | The approved terms and 14-day consent are shown and required at checkout | You, as a billing tester | `STRIPE_TERMS_CONSENT` off |
| 5. Production launch | Learners can use Gradify AI and buy Pro | Everyone | Kill switches below |

---

## Stage 1. Prerequisites

Nothing in this stage changes anything.

**Code and site**

- [ ] `npm test` passes on `main`.
- [ ] `node scripts/build-site.mjs --check` passes.
- [ ] getgradify.com is serving the current `main` (open `pricing.html`: it says Pro isn't on sale yet).

**Stripe** (live mode)

- [ ] `NODE_USE_ENV_PROXY=1 node scripts/check-stripe.mjs` prints ok on every line: product, both prices, webhook,
  portal, and the Supabase secrets.
- [ ] Stripe → Settings → Billing → Subscriptions and emails: failed-payment retries and customer emails are set the way
  you want. The 3-day grace period in `is_pro()` assumes Stripe retries for at least that long.
- [ ] The customer portal allows card updates, invoices, switching between monthly and yearly, and cancelling at the
  end of the period.

**Supabase**

- [ ] The secret `GRADIFY_PRO_ON_SALE` is unset, `GRADIFY_BILLING_TESTERS` is unset or holds only your own email, and
  `STRIPE_TERMS_CONSENT` is unset.
- [ ] In the SQL editor, the controls match what's expected:

  ```sql
  select enabled, monthly_budget_pence, daily_budget_pence from public.ai_settings;  -- false, 5000, 500
  select * from public.ai_limits order by feature, plan;                            -- free 5/5/1/2, pro 40/25/5/8
  select * from public.ai_plan_caps;                                                -- free £1, pro £5 a month
  select * from public.ai_feature_models;                                           -- the current proposal
  select count(*) from public.ai_testers;                                           -- 0
  ```

- [ ] The allowances in `ai_limits` match `AI_ALLOWANCES` in `kit/data/billing.js`. The pricing page shows those, and a
  test compares the two.
- [ ] Sign-in emails go through Resend, not Supabase's rate-limited built-in sender ([BILLING.md](BILLING.md), Sign-in
  emails). Real learners can't sign up reliably without it.

**Anthropic**

- [ ] A separate "Gradify production" workspace exists in the Anthropic Console.
- [ ] Auto-reload of prepaid credits is **off**.
- [ ] A strict monthly spend limit is set on that workspace. This is the second safety net behind Gradify's own £50 a
  month and £5 a day budgets.

**Your accounts**

- [ ] You have a Gradify account on getgradify.com to test with, signed in through the normal email flow.

**Hold point 1:** every box above is ticked. Write "Stage 1: prerequisites checked" in BACKEND-LOG.md with the
`check-stripe` output.

---

## Stage 2. AI cost testing

Only you can use Gradify AI during this stage. `ai_settings.enabled` stays **false** throughout.

**Switch it on for you only**

- [ ] Supabase → Edge Functions → Secrets: add `ANTHROPIC_API_KEY`, using a key from the "Gradify production"
  workspace.
- [ ] Make yourself an owner and a tester:

  ```sql
  insert into public.ai_admins (user_id) select id from auth.users where email = '<your email>';
  insert into public.ai_testers (user_id) select id from auth.users where email = '<your email>';
  ```

- [ ] Open `https://getgradify.com/ai-usage.html` signed in: it shows AI as off, with you as a tester.

**Choose the models first**

- [ ] With `ANTHROPIC_API_KEY` set locally, run `node scripts/eval-notes.mjs --compare --long`. It costs about £0.64 and
  puts the same notes through both models.
- [ ] Decide the model for each feature from the results: accuracy, invented content, grounded cards, speed and real
  cost. Change `ai_feature_models` if needed. No deploy is needed.

**Test every feature, checking `ai-usage.html` after each**

| Test | Expected result |
|---|---|
| An explanation in a lesson | An answer arrives; one explanation counted; tokens and cost recorded |
| A Socratic tutor conversation of several turns | Counts once for the whole conversation, not once per turn |
| A study pack from your own notes | Cards quote your notes; one pack counted |
| The same notes again | Marked `reused`; no new cost; the use is given back |
| An AI quiz | One quiz counted |
| Use up a Free allowance (for example 5 explanations) | The next request is refused with the allowance message, not an error |
| Watch the in-flight count | Nothing stays in flight longer than 10 minutes |

- [ ] Every row above gave the expected result.
- [ ] No request failed for a reason other than the deliberate allowance test. If any did, find out why before going
  on.

**Compare real costs with the model**

- [ ] Note the real cost per request for each feature from `ai-usage.html` or
  `NODE_USE_ENV_PROXY=1 node scripts/ai-usage.mjs`.
- [ ] Re-run `node scripts/ai-cost-model.mjs` with the real figures and compare against [AI-COSTS.md](AI-COSTS.md).

**Decide, with the numbers in front of you**

- [ ] **Allowances and fair-use caps** (Launch Control D9). Keep Pro at 40 / 25 / 5 / 8 and £5 a month, or change
  them. If you change `ai_limits`, change `AI_ALLOWANCES` in `kit/data/billing.js` in the same commit.
- [ ] **Price** (Launch Control D1). AI-COSTS.md estimates that a worst-case yearly subscriber at £63.99 *loses*
  about £0.69 a month, while a typical one leaves about £2.12. Decide whether that is acceptable, or whether to change
  the price or the caps before launch. A new price means new Stripe prices and new `STRIPE_PRICE_*` secrets.
- [ ] **Budgets.** Confirm £50 a month and £5 a day are right for the launch period, and that the Anthropic workspace
  limit sits above them but not far above.

**Hold point 2:** every feature has been tested, the real costs are written down, and the model, allowance, cap and
price decisions are recorded in BACKEND-LOG.md and in Launch Control.

---

## Stage 3. First real payment

The full steps are in [BILLING.md](BILLING.md), "The first real payment". This stage adds the checks that link billing
to Gradify AI. It charges a real card £7.99.

- [ ] `check-stripe.mjs` prints ok on every line again.
- [ ] Supabase secret `GRADIFY_BILLING_TESTERS` = your Gradify account's email. Nobody else can check out.
- [ ] Signed in, open `https://getgradify.com/pricing.html?tester`, choose **Monthly** and pay with your own card.

| Check | Expected result |
|---|---|
| Back on the pricing page | "Welcome to Gradify Pro" within about 30 seconds |
| Account page | "Your plan: Gradify Pro, billed monthly · Renews on …" |
| Stripe → Developers → Webhooks → the endpoint | Every delivery for this checkout shows **200** |
| Account page, AI used this month | Shows the **Pro** allowances (40 / 25 / 5 / 8), not Free's |
| One AI explanation | Counted against the Pro allowance |
| Account → Manage billing | Opens Stripe's portal |
| Cancel in the portal | Account page says "Cancelled. You keep Pro until …", and Pro allowances stay |
| Optional: cancel immediately in the Stripe dashboard | Account page shows Free, and Free allowances return |

- [ ] Every row above gave the expected result.
- [ ] Optional: refund the £7.99 in Stripe (Payments → the charge → Refund). A refund doesn't end a subscription by
  itself.
- [ ] Leave `GRADIFY_BILLING_TESTERS` holding only your own email.

Renewals, failed payments, retries and out-of-order events can't be tested safely with real money. They are covered by
`tests/billing-lifecycle.test.mjs` against the real `is_pro()`.

**Hold point 3:** the payment test is written up in BACKEND-LOG.md with the date, interval, amount, webhook results and
what the Account page showed at each step.

---

## Stage 4. Stripe consent configuration

**Don't start this stage until the legal adviser has approved the terms and the checkout wording** (pull request #4:
whether Pro is a service or digital content, the consent wording, and whether AI used in the first 14 days can be
deducted from a refund).

The order matters. If `STRIPE_TERMS_CONSENT=on` is set before Stripe has a terms URL, Stripe refuses the checkout for
everyone.

1. [ ] Update `terms.html` and `CONSENT_MESSAGE` in `supabase/functions/_shared/billing.js` on the pull request #4 branch
   with the approved wording. Remove the "Draft, not yet in force" note and every `[to confirm]`, each replaced by a
   real decision.
2. [ ] Merge pull request #4. This deploys the site.
3. [ ] Check `https://getgradify.com/terms.html` loads, shows the approved version, and has no draft note.
4. [ ] Stripe → Settings → Public details: set the terms of service URL to `https://getgradify.com/terms.html`.
5. [ ] Deploy the checkout function: `supabase functions deploy billing-checkout`.
6. [ ] Supabase secret `STRIPE_TERMS_CONSENT` = `on`.
7. [ ] As the billing tester, start a checkout at `pricing.html?tester`:
   - the tick box shows the approved wording with a working link to the terms;
   - the Pay button doesn't work until the box is ticked.

   Close the checkout without paying, unless you want a second real payment test.

**Hold point 4:** consent is required at checkout and its wording matches the approved terms. Record it in BACKEND-LOG.md.
If any step fails, remove `STRIPE_TERMS_CONSENT` and checkout returns to how it was.

---

## Stage 5. Production launch

Only when stages 1 to 4 are complete, and the launch blockers in Gradify Launch Control are Verified (privacy policy,
cookies, ICO, IP assignment, age decision).

**Switch on, in this order**

1. [ ] Gradify AI on for everyone: `update public.ai_settings set enabled = true;`
2. [ ] Check as a non-tester Free account: one explanation works and counts against Free's allowance.
3. [ ] Supabase secret `GRADIFY_PRO_ON_SALE` = `on`.
4. [ ] Set `PRO_ON_SALE = true` in `kit/data/billing.js` and push to `main`, updating the test that checks this in the
   same commit. This deploys the site.
5. [ ] Signed out, `pricing.html` shows the plans with a working upgrade path. Signed in as a Free account, the buy
   button starts a Stripe checkout with the consent tick box.

**Watch closely for the first week**

- [ ] Each day: `ai-usage.html` for spend against the monthly and daily budgets, failures and their reasons, and the
  top learners against their fair-use cap.
- [ ] Each day: Stripe webhook deliveries are all 200, and there are no failed checkouts.
- [ ] After the first real subscriptions: each subscriber's Account page shows Pro.
- [ ] After one week: compare real cost per learner with AI-COSTS.md, and revisit allowances, caps and price.

**Kill switches** (each takes effect on the next request; nobody loses their data)

| Problem | Do this |
|---|---|
| AI spend running too fast, or bad answers | `update public.ai_settings set enabled = false;` |
| Cut spend without switching off | Lower `monthly_budget_pence` or `daily_budget_pence` |
| Stop new subscriptions | Unset `GRADIFY_PRO_ON_SALE`, and set `PRO_ON_SALE = false` on `main` |
| Checkout failing because of consent | Unset `STRIPE_TERMS_CONSENT` |
| Anthropic key exposed | Revoke it in the Anthropic Console and set a new `ANTHROPIC_API_KEY` |

Existing subscribers keep Pro through any of these until their period ends. Switching AI off while people are paying
for it needs a decision about refunds or credit, which the final terms should cover.

---

## Evidence template for BACKEND-LOG.md

```markdown
## YYYY-MM-DD HH:MM UTC · Launch checklist stage N: <name> · ezlohntrnassgsbofcfc

- Done by: <who>
- Result: passed / stopped at <step>
- Checks: <each check and what it showed>
- Costs: <AI spend, payment amount, refunds>
- Decisions made: <model, allowances, caps, price, with the figures they were based on>
- Changes made: <secrets, SQL, commits>
- Follow-ups: <anything left to do>
```
