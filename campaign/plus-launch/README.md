# Gradify Pro launch email (code GRADIFY48)

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
| Interactive mind maps (PR #87, `feat/mind-maps`) | **Not merged.** PR #87 is open and conflicts with `main`. `kit/maps/view.js` is a 404 on the live site. | **No.** |
| `feat/tools-and-limits` (mind map creator, flashcard creator, notes converter, lesson search, Free allowances) | **Not merged, and no PR.** 3 commits ahead of `e2b0841`, 47 files. `kit/tools/tools.js` is a 404 on the live site. | **No.** |
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

## Stripe (live, set up 19 November 2026)

| What | ID | Settings |
| --- | --- | --- |
| Coupon "Gradify Pro: £5 first month" | `kwB3RfKh` | £5 off (GBP), once, only for the £10 product `prod_Ve3V6tEjlR4hfV` (still named "Gradify Plus" in Stripe), redeemable until 22 Nov 2026 23:59:59 UK |
| Promotion code `GRADIFY48` | `promo_1UdWwnEOmpIuKzUMqORXVU9l` | first-time customers only, expires 22 Nov 2026 23:59:59 UK (`expires_at` 1795391999) |

## The claim journey (19 November 2026)

The email's button opens `pricing.html?offer=GRADIFY48&utm_campaign=pro_launch`. The offer used to be lost on the way
to payment: magic-link and Google sign-in return to `app.html` without the query string, set-up ended on Add notes,
and checkout only had Stripe's **Add promotion code** link. Now:

1. `kit/data/offer.js` keeps the offer (from `?offer=GRADIFY48` or `utm_campaign=pro_launch`) in the browser, and once
   the learner is signed in, in their account (`profiles.learner.offer`), so it survives sign-in, email verification
   and set-up, and follows them to other devices. It ends with the Stripe code and is never shown on Pro or Ultra.
2. Pricing shows a launch-offer banner and a **Get Gradify Pro · £5 first month** button; signed out, it says the
   offer is kept through sign-in. The Account sign-in panel says the offer is saved.
3. A new account goes through set-up, then lands on `#/offer` (the offer, with **Claim my £5 month** and **Not now**).
   Today shows a dismissible offer card. Following the link again brings a dismissed offer back.
4. **Claim** calls `billing-checkout` with `promo: "GRADIFY48"`. The function looks the code up in Stripe and opens
   Checkout with it applied (`discounts`). If Stripe refuses it for that learner (not a first-time customer, expired),
   it opens the ordinary Checkout with **Add promotion code** instead. Learners already paying go to the billing
   portal, as before. Checkout returns to Pricing, which waits for the plan or says nothing was charged.

Limit: if someone opens the sign-in email in a *different* browser from the one they clicked the campaign link in,
before they've signed in anywhere, that browser doesn't know about the offer. The email tells them the code, and that
Checkout's **Add promotion code** field takes it.

Tested: `tests/offer.test.mjs` (9 tests: survival across the redirect, dismissal, plan gating, expiry, code cleaning,
apply-or-fallback) and a headless-browser run of the journey on a local copy of the site in device mode (campaign link,
redirect without query string, set-up to `#/offer`, Today card, dismiss and return, pricing banner, no offer without the
campaign, no horizontal scroll at 390 px). Not tested here: real sign-in, and anything in Stripe (this environment
can't reach api.stripe.com). See "Still to verify in Stripe" below.

## Still to verify in Stripe (before sending)

Use a test-mode copy of the coupon and code first, then the live ones with a real card you refund:

- [ ] `GRADIFY48` (`promo_1UdWwnEOmpIuKzUMqORXVU9l`) is active, first-time customers only, `expires_at` 1795391999.
- [ ] Coupon `kwB3RfKh`: £5 off, GBP, duration **once**, applies only to `prod_Ve3V6tEjlR4hfV` (the £10 monthly price).
- [ ] A new account: Claim → Checkout shows the code applied, **£5.00 due today**, then £10.00/month.
- [ ] The first invoice is £5.00; the upcoming invoice (`/v1/invoices/upcoming`) is £10.00 with no discount.
- [ ] An account that has paid before: Claim opens the ordinary Checkout (code refused), not an error.
- [ ] A Pro or Ultra subscriber: Claim/Pricing opens the billing portal; their subscription is untouched.
- [ ] Abandon Checkout: back on Pricing it says you haven't been charged; the plan stays Free.
- [ ] Magic link and Google sign-in on a new account and on an existing Free account both show the offer afterwards.
- [ ] Deploy `billing-checkout` (it now reads `promo`): `supabase functions deploy billing-checkout`.

## Screenshots

Real Gradify screens, for the email's feature showcase. They come from a demo learner built by using the app on a local
copy of the site: set-up as a medicine student with an exam on 18 December, the app's own sample notes (cardiac cycle)
plus a short set of renal physiology notes turned into cards by the app, and 85 reviews over twelve simulated days.
Pro features were open because the browser was served `kit/data/billing.js` with `PLUS_ON_SALE = false`, the
product's own pre-launch state; nothing else was changed. The email says they're from a demo account.

| File | Shows |
| --- | --- |
| `screenshots/pro-smart-plan.png` → `assets/email/pro-launch/pro-smart-plan.jpg` | Smart Plan: today's plan fitted to free time, with Repeated mistake and Stretch sessions and their reasons |
| `screenshots/pro-exam-readiness.png` → `assets/email/pro-launch/pro-exam-readiness.jpg` | Intelligence: exam readiness 77%, likely 68–86%, from 85 answers, and the daily time to reach 80% |
| `screenshots/pro-revision-queue.png` → `assets/email/pro-launch/pro-revision-queue.jpg` | Revision Centre: the ranked queue (two repeated mistakes, then a stretch task), each with a reason |

The JPEGs are 1064 px wide (852 px for readiness), shown at 532 px, 54 to 96 KB each. Not used: the Smart Plan week view
(too cramped in a crop) and Calendars (no calendar connected, so it's an empty state).

## Unsubscribe

The footer links to MailerLite's `{$unsubscribe}`, and the plain text has it too; `export.py` refuses to build without
it. MailerLite fills it per recipient and adds the one-click `List-Unsubscribe` header.
