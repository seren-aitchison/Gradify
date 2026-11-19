# Stripe Checkout integration: what's left to do

Gradify already had a working Stripe Checkout call (Scenario A), so only the parameters of that one call changed.
No new files, routes or webhooks were added.

## Values to Replace

None. Every `sample_only` value already has a real value in the code:

**Files containing these values:**
- [supabase/functions/billing-checkout/index.ts](supabase/functions/billing-checkout/index.ts)

| Field | Current value | Notes |
|-------|---------------|-------|
| mode | `subscription` | Correct for Gradify Plus and Pro (monthly plans). |
| success_url | `returnUrl(SITE, back, { checkout: "success" })` | The page the learner came from on getgradify.com. |
| cancel_url | `returnUrl(SITE, back, { checkout: "cancelled" })` | The same page, marked as cancelled. |
| line_items[].price | `priceFor(plan, …)`, read from the `STRIPE_PRICE_PLUS_MONTH` / `STRIPE_PRICE_PRO_MONTH` secrets | Real live price IDs. |

## Configured Parameters

These come from Checkout Studio.

**Files containing these parameters:**
- [supabase/functions/billing-checkout/index.ts](supabase/functions/billing-checkout/index.ts)

| Parameter | Value |
|-----------|-------|
| ui_mode | `hosted` (see the note on versions below) |
| billing_address_collection | `auto` |
| phone_number_collection | `{ enabled: false }` |
| payment_method_collection | `always` (included because the mode is `subscription`) |
| submit_type | `auto` |
| integration_identifier | `hosted_web_0001` |
| origin_context | `web` |

### Where the code differs from Checkout Studio (the owner's choice, 2026-11-19)

| Parameter | Studio | In the code | Why |
|-----------|--------|-------------|-----|
| allow_promotion_codes | `false` | `true`, or `discounts` with the code applied when the learner arrives with the launch offer | The Pro launch campaign applies GRADIFY48 for the learner (`kit/data/offer.js`); Stripe's code field is the fallback. |
| automatic_tax | `{ enabled: false }` | the `STRIPE_AUTOMATIC_TAX` switch (unchanged; off unless set to `on`) | Tax stays a deployment setting. |

`customer`, `client_reference_id`, `metadata`, `subscription_data` and `customer_update` were also kept.
They aren't in the Studio list, but the webhook uses them to link each subscription to a Gradify account, and
keeping one Stripe customer per account is what limits launch codes to one per person.

### Note on `ui_mode` versions
Gradify calls Stripe's REST API directly, with no SDK, and pins `Stripe-Version: 2025-08-27.basil`
(`supabase/functions/_shared/billing.js`). On that version the hosted page is `ui_mode: "hosted"`. If you move the
pin to a version that stripe-node 21+ uses, change the value to `hosted_page`.

### Added since: disclosure beside the pay button
`custom_text.submit.message` = `renewalNote()` in `supabase/functions/_shared/billing.js`: "A monthly membership: £5 for your
first month, then £10 a month (VAT included), taken automatically each month until you cancel. Cancel any time from
Manage billing on your Gradify Account page." (or "£10 a month" without the offer).

## Setup and next steps

- **Environment:** nothing new. The Edge Function secrets are unchanged: `STRIPE_SECRET_KEY`,
  `STRIPE_PRICE_PLUS_MONTH`, `STRIPE_PRICE_PRO_MONTH`, `GRADIFY_PLUS_ON_SALE`, `GRADIFY_PRO_ON_SALE`, and optionally
  `STRIPE_AUTOMATIC_TAX`. No dependencies were added.
- **Deploy:** `supabase functions deploy billing-checkout`. This is live checkout, so try it in test mode first.
- **How it works:** pricing page → `billing-checkout` (signed in) → Stripe-hosted Checkout → back to the page the
  learner came from with `?checkout=success` → `billing-webhook` writes the plan into `subscriptions`. Learners who
  already pay go to the billing portal instead.
- **What's new for buyers:** Checkout now asks for a billing address only when Stripe needs one (`auto`), never
  asks for a phone number, and always collects a card, even for £0 first invoices such as a 100% promotion code.
- **Testing (test-mode key):** card `4242 4242 4242 4242`, any future expiry and any CVC. `4000 0025 0000 3155` tests
  3-D Secure and `4000 0000 0000 0002` a decline. https://docs.stripe.com/testing
- **Checked so far:** Stripe's live API accepted every parameter name for this call on 2025-08-27.basil (a request
  with a fake price ID, so no session was created). No real checkout has been run end to end yet.

## Resources
- https://support.stripe.com
- https://docs.stripe.com/mcp
