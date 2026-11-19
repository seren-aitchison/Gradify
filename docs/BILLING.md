# Gradify billing: owner runbook

> **Plan names and ids.** Learners see **Gradify Pro** (id `plus`) and **Gradify Ultra** (id `pro`). The ids in the code, the database, Stripe price settings and the stored waitlist list names (`Gradify Plus`, `Gradify Pro`) are unchanged.

Three plans (17 November 2026), GBP, VAT included:

| Plan | Price | What it is |
|---|---|---|
| Free | £0 | Learn with Gradify: flashcards, mind maps, every course, basic revision, unit quizzes and practice, basic progress, manual planning, on one active study device |
| Gradify Pro | £10 a month | Gradify organises, optimises and manages your learning: Gradify Intelligence, exam preparation, calendar sync and reminders, every device |
| Gradify Ultra | £15 a month | Everything in Pro, and Gradify AI. Coming soon: on sale once Gradify AI is switched on |

Stripe takes the payments; Supabase records each learner's plan (`subscriptions.plan`, `plan_of()`). The original Ultra
prices (£7.99 a month, £63.99 a year) are still in Stripe for anyone already on them; nobody is (0 subscriptions on
17 November 2026), so they can be archived.

## Pro: how it's enforced

| Feature | Where it's enforced | How |
|---|---|---|
| Every device | Database (strong) | Free: changes only from the active study device (`may_write()`, restrictive RLS on study tables; the app sends `x-gradify-device`). Reading is never limited. `use_device()` / `switch_device()`, once every 7 days (`billing_settings.device_switch_days`) |
| Calendar sync | Edge Function (strong) | `calendar-sync` refuses without Pro (`plus_allowed()`) |
| Reminders when Gradify is closed | Edge Function (strong) | `push-send` skips learners without Pro (`plus_allowed_for()`) |
| Gradify Intelligence | App (soft) | Autopilot, Smart Plan, the Intelligence page, card ordering, readiness and suggestion widgets (`kit/data/plan.js`) |
| Exam preparation | App (soft) | Course Exams and Problems tabs. Course content itself is public |
| Free allowances | Database for signed-in learners, app otherwise | `kit/data/limits.js`: on Free, 10 lessons in each course, 5 flashcard sets, 5 mind maps and 5 uses of each tool in Tools. Anything already opened stays open. When one runs out, a Liquid Glass banner offers Pro. Signed in: `take_allowance()` counts in `free_usage` and decides the limits (learners can't write the table). Signed out: counted in the browser |

Soft means the feature runs in the browser, so someone determined could get round it. That's a commercial limit, not a
security boundary. Tests: `tests/plans.test.mjs` (database), `tests/billing-*.test.mjs`.

### Free allowances

Free learners can open 10 lessons in each course they start, 5 flashcard sets in all (a course lesson's cards, a deck in
the app's Study, counted once each), 5 mind maps in all (each of a lesson's five maps counts) and use each tool in
Tools 5 times (a lesson opened from the search, a new mind map, a new deck, a conversion). Opening something again never
counts. The last free one shows a gentle banner; after that the banner offers Pro and the page shows a Pro panel.

They switch on with `PLUS_ON_SALE`, like the other Pro features, so nobody is asked to buy what isn't on sale. To see
them before then, open any page with `?limits=preview` (and `?limits=off` to stop): this browser then behaves as a
Free learner would after launch. `scripts/check-tools.cjs` checks them in a browser. The counts live in this browser's
storage when signed out (clearing it resets them); signed in, the server counts them in `public.free_usage`.

## Putting Gradify Pro on sale (go-live checklist)

Nothing is limited for anyone until step 6. Do them in order:

1. **Payment terms reviewed.** `terms.html#plans` covers renewal, cancellation, the 14-day right to cancel and price
   changes. Have it checked, and add Gradify Ltd's company number and registered office to the terms and privacy pages.
2. **Apply the migration** `supabase/migrations/20261117120000_plus_plan.sql` (`node scripts/supabase-admin.mjs migrate`,
   which rehearses it on a copy of production first). With `plans_enforced` off it changes nothing anyone sees.
3. **Deploy the functions:** `billing-checkout`, `billing-webhook`, `calendar-sync`, `push-send`.
4. **Supabase secrets:** `STRIPE_PRICE_PLUS_MONTH` = `price_1UclOUEOmpIuKzUMzo9QxcRh` (£10),
   `STRIPE_PRICE_PRO_MONTH` = `price_1UclOUEOmpIuKzUMxHujazXB` (£15). Keep `STRIPE_PRICE_MONTH` / `STRIPE_PRICE_YEAR`
   while anyone is on the original Ultra prices.
5. **Stripe portal:** Settings → Billing → Customer portal → Subscriptions → allow switching, with the Gradify Pro and
   Gradify Ultra products and their monthly prices. Then `NODE_USE_ENV_PROXY=1 node scripts/check-stripe.mjs`: every
   line ok.
6. **One real payment** as a tester (`GRADIFY_BILLING_TESTERS`, then `pricing.html?tester`), as below, for Pro.
7. **Switch it on, all together:**
   - Supabase secret `GRADIFY_PLUS_ON_SALE` = `on`
   - `update public.billing_settings set plans_enforced = true;`
   - `PLUS_ON_SALE = true` in `kit/data/billing.js` (update the test that checks it in the same commit), and push.
8. Email the Gradify Pro launch list (`select email from public.waitlist where site = 'Gradify Pro'`), then delete it.

To undo: set `plans_enforced = false` and `GRADIFY_PLUS_ON_SALE` off, and `PLUS_ON_SALE = false`. Everything opens again
at once; subscriptions are untouched.

## How it fits together

| Piece | Where | What it does |
|---|---|---|
| Pricing page | `pricing.html` | Free and Ultra, monthly/yearly switch, the annual saving, allowances, billing FAQ |
| Account page | `kit/app/main.js` (Your plan) | The learner's plan, what to do if a payment failed, Manage billing, AI used this month |
| Browser helpers | `kit/data/billing.js` | Prices, allowances, `planOf()` (mirrors `is_pro()`), checkout and portal calls |
| `billing-checkout` | Edge Function | Signed-in learner → Stripe Checkout. Refuses unless Ultra is on sale (or the learner is a tester) |
| `billing-portal` | Edge Function | Signed-in learner → Stripe's portal (card, plan switch, invoices, cancel) |
| `billing-webhook` | Edge Function, no JWT | Stripe → verified signature → applied once → `public.subscriptions` |
| Schema | `supabase/migrations/20261110120000_…`, `20261110180000_…` | `subscriptions`, `billing_events`, `is_pro()`, AI allowances (monthly on both plans) |
| Check | `scripts/check-stripe.mjs` | Read-only: Stripe product, prices, webhook, portal and Supabase secrets all match the site |

Only the webhook (and checkout, to link a learner to their Stripe customer) can write `subscriptions`. Learners can
read their own row and nothing else (tested live: a learner trying to make themselves Ultra gets 403).

## What is set up (live mode, 10 November 2026)

- Product **Gradify Ultra**, prices `gradify_pro_month` (£7.99 every month) and `gradify_pro_year` (£63.99 every year),
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

| Event | Stripe sends | Row becomes | Ultra? |
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

Do this once, before putting Ultra on sale. It charges a real card £7.99; refund it afterwards if you like.

1. Run `scripts/check-stripe.mjs`: every line must say ok.
2. In Supabase → Edge Functions → Secrets, add `GRADIFY_BILLING_TESTERS` = the email of the Gradify account you'll
   test with. Only that account can check out; everyone else still sees "Opens when Gradify AI launches".
3. Signed in as that account, open `https://getgradify.com/pricing.html?tester`, choose **Monthly** and pay with your
   own card.
4. Expect: back on the pricing page with "Welcome to Gradify Ultra" within about 30 seconds; the Account page shows
   *Your plan: Gradify Ultra, billed monthly · Renews on …*.
5. In Stripe → Developers → Webhooks → the endpoint: the deliveries for this checkout show **200**.
6. Account → **Manage billing** opens Stripe's portal. Cancel there. Expect the Account page to say *Cancelled. You keep
   Ultra until …* and Ultra to stay on.
7. Optional: refund the payment in Stripe (Payments → the charge → Refund). A refund doesn't end the subscription;
   cancelling it immediately in the dashboard does, and the Account page then shows Free.
8. Remove `GRADIFY_BILLING_TESTERS` (or leave just your own email) and write the outcome under a dated heading in
   `docs/BACKEND-LOG.md`: date, interval, amount, webhook result, what the Account page showed at each step.

## Putting Gradify Ultra on sale

Only once Gradify AI is switched on (below), because Ultra adds nothing else to Pro:

1. Supabase secret `GRADIFY_PRO_ON_SALE` = `on`.
2. `PRO_ON_SALE = true` in `kit/data/billing.js` (a test reminds you of this rule; update it in the same commit).

## Gradify AI: still off

The AI functions are deployed with every control in place and refuse every request until the owner switches Gradify AI
on (or adds testers). Controls, monitoring and the switch-on checklist: `docs/AI.md`. Costs per learner: `docs/AI-COSTS.md`.

**Photo to cards** (Gradify Ultra): the Flashcard creator's "Photo of notes" button sends up to 5 photos of notes,
handwriting included, to `study-pack` as image blocks; Claude writes a pack and the creator turns it into cards
(`deckOf` in `kit/tools/convert.js`). It counts as a study pack against the AI allowances, under the same controls.
Until `PRO_ON_SALE`, the button explains it's coming with Ultra and sends nothing. Switching it on needs: the updated
`study-pack` function deployed, `ANTHROPIC_API_KEY` set as a function secret, Gradify AI switched on (`docs/AI.md`),
then `PRO_ON_SALE` and the Ultra price live.

## Sign-in emails (Resend)

Supabase's built-in email sender is rate-limited and not for production. In Resend, verify the `getgradify.com` domain
(add its DNS records), create an API key, then in Supabase → Authentication → SMTP settings: host `smtp.resend.com`,
port 465, user `resend`, password the API key, sender e.g. `Gradify <hello@getgradify.com>`.

## Test accounts

Two learner accounts on the project, `gradify-check-a@getgradify.com` and `gradify-check-b@getgradify.com`, are used by
the live checks. Their passwords are not in this repository. Learner A has a Stripe customer (no subscription, no card).

## Launch lists (notify me)

The "Notify me" forms (homepage Ultra section, pricing page, coming-soon site cards) add one row to `public.waitlist`:
email (lower case), the list (`site`: "Gradify Ultra" or a site's name) and the time. Visitors can only add rows; nobody
can read them through the API. privacy.html#launch-lists promises one email per list and deletion after it, or within
12 months. To keep that promise:

```sql
-- who to email when Gradify Ultra opens (export, send one email, then delete)
select email from public.waitlist where site = 'Gradify Ultra' order by created_at;
delete from public.waitlist where site = 'Gradify Ultra';
-- monthly housekeeping: entries older than 12 months
delete from public.waitlist where created_at < now() - interval '12 months';
-- a removal request
delete from public.waitlist where email = lower('<address>');
```

Contact addresses (privacy.html): privacy@getgradify.com for data requests and removals, hello@getgradify.com for
everything else. Both are Cloudflare Email Routing addresses (getgradify.com DNS is on Cloudflare) forwarding to the
owner's inbox; they receive only. Removal requests: delete the row (SQL above) and reply from the owner's inbox.
