# Gradify Plus launch email (code GRADIFY48)

The introductory email for Gradify Plus: £5 for the first month with code **GRADIFY48**, one use per person,
ending 48 hours after launch. Nothing here has been sent. `campaign/` is left out of the published site
(`scripts/build-site.mjs`, `EXCLUDE.top.campaign`), so none of this appears on getgradify.com.

| File | What it is |
| --- | --- |
| [email.html](email.html) | The HTML part: tables and inline styles, no `backdrop-filter`. Its only image is the logo. Subject and preheader are in its top comment. |
| [email.txt](email.txt) | The plain-text part. Send both as one multipart email. |
| [signature.html](signature.html) | The founder's black Liquid Glass signature, email-safe. |
| [logo-glass.svg](logo-glass.svg) | Source of the logo: the Gradify G on a black Liquid Glass tile with a rainbow border. |
| [CHECKLIST.md](CHECKLIST.md) | Everything to do before, during and after the send, with the UK PECR/GDPR rules for who may receive it. |

## What the email claims, and why (checked 17 November 2026)

The email only claims what's live on getgradify.com. The live site is `main` at `505417f` (the Test and deploy run
for it succeeded). The live `kit/data/billing.js` was fetched to confirm it matches `main`.

| Feature in the original draft | Status | In the email? |
| --- | --- | --- |
| AI tools (Gradify AI: tutor, explanations, study packs, AI quizzes) | **Not live.** The code is merged but switched off, and it belongs to **Gradify Pro**, which isn't on sale (`PRO_ON_SALE = false`). privacy.html says "Gradify AI is not switched on yet." | **No.** Plus doesn't include AI, even once it launches. |
| Interactive mind maps (#87, #92, #94) | **Live** (merged 17 November). Five per lesson, free within Free's 5 mind maps | **Yes**, as part of Free's allowance and Plus's "no limits" |
| Tools and Free allowances (#94) | **Live** (merged 17 November). Free: 10 lessons per course, 5 flashcard sets, 5 mind maps, 5 uses of each tool; Plus: no limits | **Yes.** The "stays free" line now states Free's allowances, so it isn't misleading |
| Basic mind map in Notes Studio | Live (free). This is the older flow-diagram map, not #87's interactive maps. | Not named, to avoid confusion with #87. |
| Smart flashcards | **Live.** Spaced repetition is free. Plus adds "cards ordered by what matters most and is fading", plus adaptive card suggestions (`PLUS_FEATURES.intelligence`). | Yes, as the Plus wording. |
| Study planning and progress tracking | **Live.** Smart Plan autopilot, readiness forecasts and calendar sync are in Plus. Manual planning and basic progress are free. | Yes. |
| Subject resources | **Live.** Every course on every Gradify site is free. | Yes, as "stays free". |
| Exam preparation (timed exams, complete question bank) | **Live**, and part of Plus. It wasn't in the original draft. | Yes. |
| Every device | **Live**, and part of Plus (Free is one study device). | Yes. |

The Plus list in the email is taken from `PLUS_FEATURES` in `kit/data/plan.js` and the Plus list in pricing.html,
so it matches what the app locks and what the pricing page sells.

## Facts from the repository

- **Price:** Gradify Plus is £10 a month, VAT included (`PLAN_PRICES.plus.month = 1000` pence, GBP).
  `PLUS_ON_SALE = true` on `main` and live. There's no yearly Plus price. Gradify Pro (£15) isn't on sale.
- **Promotion codes:** `supabase/functions/billing-checkout` creates a Stripe Checkout session with
  `allow_promotion_codes: "true"`, so Stripe's checkout page shows an **Add promotion code** link. There's no way
  to apply a code from a URL, so the email tells people to type it in. Each Gradify account keeps one Stripe
  customer (`subscriptions.stripe_customer_id`), which is what makes "first-time order only" work as
  "one per person" (see CHECKLIST.md).
  Anyone who already pays is sent to the billing portal, not checkout, so they can't use the code.
- **Renewal and cancellation wording** comes from the pricing.html FAQ: charged on the same date each month,
  cancel any time from Manage billing and keep the plan until the end of the paid month, and a 14-day
  cancellation refund reduced for days used.
- **Company:** terms.html and privacy.html say Gradify is run by **Gradify Ltd**. The repo has no company number,
  place of registration or registered office address.
- **Addresses:** `hello@getgradify.com` (general, terms and pricing) and `privacy@getgradify.com` (data
  requests). There's no `founder@` anywhere.
- **Discord:** there's no Discord link anywhere in the repo or docs.
- **Unsubscribe:** there's no unsubscribe mechanism or marketing-email system in the repo. The only
  "unsubscribe" code is for web push notifications. The sending service must provide the unsubscribe link and
  the one-click `List-Unsubscribe` header.
- **Mail DNS today:** MX is Cloudflare Email Routing (receive only). SPF is
  `v=spf1 include:_spf.mx.cloudflare.net ~all`, which authorises no sending service. There's no DMARC record at
  `_dmarc.getgradify.com`.
- **Who has consented:** the only email list is `public.waitlist` (`email`, `site`, `created_at`), from
  `kit/data/waitlist.js`. The lists are "Gradify Plus", "Gradify Pro" and the coming-soon sites. Joining the
  Plus list says "We'll email you once, when Gradify Plus opens." privacy.html says a launch-list address is for
  "one email to tell you that thing has opened", isn't used for newsletters or marketing, and is deleted once
  that email has been sent. Accounts have **no** marketing-consent field, and sign-up never offers a marketing
  opt-in or opt-out. CHECKLIST.md explains what this means for the 1,000 recipients.

## Placeholders to fill

| Placeholder | Where | What |
| --- | --- | --- |
| `{{OFFER_ENDS}}` | email.html, email.txt | The code's exact expiry, in UK time, e.g. "Thursday 19 November at 6pm (UK time)". It must match the Stripe expiry. |
| `{{DISCORD_URL}}` | email, signature | A permanent Discord invite (never expires, no use limit). Otherwise delete the marked blocks. |
| `{{UNSUBSCRIBE_URL}}` | email | The sending service's unsubscribe merge tag (e.g. `{{ unsubscribe_url }}` / `*|UNSUB|*`). |
| `{{WHY_YOU_GET_THIS}}` | email | One line per audience. For the Plus waitlist: "You're getting this because you asked to be told when Gradify Plus opened. It's the only email you'll get from that list, and your address will be deleted from it now that it's been sent." |
| `{{REGISTERED_IN}}`, `{{COMPANY_NUMBER}}`, `{{REGISTERED_OFFICE}}` | email, signature | From Companies House. A company's emails must show its registered name, number, place of registration and registered office. |

## The logo

Gmail and Outlook don't show SVG, so the email and signature use a PNG:
`assets/email/gradify-logo-glass.png` (192 × 192, shown at 44 px in the email and 40 px in the signature, so it
stays sharp on 3× screens). It lives in `assets/` so the site publishes it at
https://getgradify.com/assets/email/gradify-logo-glass.png, and the images only appear **once this PR is merged
and deployed**. Do the test sends after that.

To change the logo, edit `logo-glass.svg` and render it again with headless Chrome. Use an HTML page that shows
the SVG at 192 × 192 on a transparent background:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --default-background-color=00000000 --window-size=192,192 --screenshot=assets/email/gradify-logo-glass.png logo.html
```

## Send-ready export

`export/` holds the files to load into the sending service, built by `python3 campaign/plus-launch/export.py`:

- `gradify-plus-launch.html`: the HTML part.
- `gradify-plus-launch.txt`: the plain-text part.
- `signature.html`: the signature, ready to copy into a mail app.
- `gradify-plus-launch-test.eml`: for test sends. Open it in Apple Mail and choose Message > Send Again.

The export leaves out the Discord parts until there's an invite. Set `DISCORD_URL` in export.py and run it again to
put them back. It fills the reason line for the Gradify Plus waitlist. It leaves `{{OFFER_ENDS}}`,
`{{UNSUBSCRIBE_URL}}` and the three Companies House values for you to fill, in `FILL` in export.py or in the
sending service.
