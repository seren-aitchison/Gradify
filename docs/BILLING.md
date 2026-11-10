# Gradify Pro billing: owner runbook

Gradify Pro is £7.99 a month or £63.99 a year (GBP, VAT included). It adds Gradify AI allowances; everything else on
Gradify is free. Stripe takes the payments; Supabase records who is Pro.

## How it fits together

| Piece | Where | What it does |
|---|---|---|
| Pricing page | `pricing.html` | Free and Pro, monthly/yearly switch, the annual saving, allowances, billing FAQ |
| Account page | `kit/app/main.js` (Your plan) | The learner's plan, what to do if a payment failed, Manage billing, AI used this month |
| Browser helpers | `kit/data/billing.js` | Prices, allowances, `planOf()` (mirrors `is_pro()`), checkout and portal calls |
| `billing-checkout` | Edge Function | Signed-in learner → Stripe Checkout. Refuses unless Pro is on sale (or the learner is a tester) |
| `billing-portal` | Edge Function | Signed-in learner → Stripe's portal (card, plan switch, invoices, cancel) |
| `billing-webhook` | Edge Function, no JWT | Stripe → verified signature → applied once → `public.subscriptions` |
| Schema | `supabase/migrations/20261110120000_…`, `20261110180000_…` | `subscriptions`, `billing_events`, `is_pro()`, AI allowances (monthly on both plans) |
| Check | `scripts/check-stripe.mjs` | Read-only: Stripe product, prices, webhook, portal and Supabase secrets all match the site |

Only the webhook (and checkout, to link a learner to their Stripe customer) can write `subscriptions`. Learners can
read their own row and nothing else (tested live: a learner trying to make themselves Pro gets 403).

## What is set up (live mode, 10 November 2026)

- Product **Gradify Pro**, prices `gradify_pro_month` (£7.99 every month) and `gradify_pro_year` (£63.99 every year),
  both VAT-inclusive.
- Customer portal (default): card updates, invoices, monthly ↔ yearly switching with proration, cancel at period end.
- Webhook to `https://ezlohntrnassgsbofcfc.supabase.co/functions/v1/billing-webhook` for
  `checkout.session.completed` and `customer.subscription.created/updated/deleted/paused/resumed`.
- Supabase secrets: `STRIPE_SECRET_KEY` (set by the owner), `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_MONTH`,
  `STRIPE_PRICE_YEAR`.
- **Not on sale.** `GRADIFY_PRO_ON_SALE` is unset and `PRO_ON_SALE` is `false` in `kit/data/billing.js`.

Check it any time (changes nothing):

```bash
NODE_USE_ENV_PROXY=1 node scripts/check-stripe.mjs --write
```

## Lifecycle: what happens when

| Event | Stripe sends | Row becomes | Pro? |
|---|---|---|---|
| Checkout paid | `checkout.session.completed`, `customer.subscription.created` | `active`, period set | Yes |
| Renewal paid | `customer.subscription.updated` | new period | Yes |
| Renewal fails | `customer.subscription.updated` | `past_due` | Yes for 3 days after the period end, then no |
| Card fixed, retry paid | `customer.subscription.updated` | `active` | Yes |
| Stripe gives up | `customer.subscription.updated` / `deleted` | `unpaid` / `canceled` | No |
| Learner cancels | `customer.subscription.updated` | `cancel_at_period_end = true` | Yes, until the period ends |
| Period ends after cancel | `customer.subscription.deleted` | `canceled` | No |
| Resubscribes later | new subscription events | new subscription replaces the old row | Yes |

Every row of this table is tested in `tests/billing-lifecycle.test.mjs` against the real `is_pro()`, along with forged,
tampered and replayed signatures, duplicate deliveries, failed writes being retried, out-of-order events, and late
events about an old subscription never overwriting a new one. Stripe's retry schedule for failed payments and its
emails to the customer are set in the Stripe dashboard (Settings → Billing → Subscriptions and emails).

## The first real payment: a deliberate, documented test

Do this once, before putting Pro on sale. It charges a real card £7.99; refund it afterwards if you like.

1. Run `scripts/check-stripe.mjs`: every line must say ok.
2. In Supabase → Edge Functions → Secrets, add `GRADIFY_BILLING_TESTERS` = the email of the Gradify account you'll
   test with. Only that account can check out; everyone else still sees "Opens when Gradify AI launches".
3. Signed in as that account, open `https://getgradify.com/pricing.html?tester`, choose **Monthly** and pay with your
   own card.
4. Expect: back on the pricing page with "Welcome to Gradify Pro" within about 30 seconds; the Account page shows
   *Your plan: Gradify Pro, billed monthly · Renews on …*.
5. In Stripe → Developers → Webhooks → the endpoint: the deliveries for this checkout show **200**.
6. Account → **Manage billing** opens Stripe's portal. Cancel there. Expect the Account page to say *Cancelled. You keep
   Pro until …* and Pro to stay on.
7. Optional: refund the payment in Stripe (Payments → the charge → Refund). A refund doesn't end the subscription;
   cancelling it immediately in the dashboard does, and the Account page then shows Free.
8. Remove `GRADIFY_BILLING_TESTERS` (or leave just your own email) and write the outcome under a dated heading in
   `docs/BACKEND-LOG.md`: date, interval, amount, webhook result, what the Account page showed at each step.

## Putting Gradify Pro on sale

Only once Gradify AI is switched on (below), because Pro sells nothing else:

1. Supabase secret `GRADIFY_PRO_ON_SALE` = `on`.
2. `PRO_ON_SALE = true` in `kit/data/billing.js` (a test reminds you of this rule; update it in the same commit).

## Gradify AI: still off

The AI functions have every control in place and will refuse every request until the owner switches Gradify AI on
(or adds testers); the controls' migration and the deploy are waiting for the owner's go-ahead. Controls, monitoring and the switch-on checklist: `docs/AI.md`. Costs per learner: `docs/AI-COSTS.md`.

## Sign-in emails (Resend)

Supabase's built-in email sender is rate-limited and not for production. In Resend, verify the `getgradify.com` domain
(add its DNS records), create an API key, then in Supabase → Authentication → SMTP settings: host `smtp.resend.com`,
port 465, user `resend`, password the API key, sender e.g. `Gradify <hello@getgradify.com>`.

## Test accounts

Two learner accounts on the project, `gradify-check-a@getgradify.com` and `gradify-check-b@getgradify.com`, are used by
the live checks. Their passwords are not in this repository. Learner A has a Stripe customer (no subscription, no card).
