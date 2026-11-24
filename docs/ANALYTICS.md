# Analytics: consent and Google Analytics 4

Gradify has two kinds of analytics:

| | What | Consent | Code |
|---|---|---|---|
| Usage counts | Anonymous rows in Supabase `page_events`. No cookie, no identifier. | Not needed (nothing stored on the device). Off for DNT/GPC, or after an opt-out on the privacy page. | `kit/core/analytics.js` |
| Google Analytics 4 | Google's gtag.js tag, **`G-CPR5LJB35L`**. Sets `_ga` cookies. | **Opt-in only**: the banner's *Analytics* choice. | `kit/core/consent.js` |
| Google Ads measurement | The same tag with `ad_storage` and `ad_user_data` granted. Sets `_gcl_` cookies and keeps `gclid`. Conversions reach Google Ads through the GA4 link. | **Opt-in only**: the banner's *Advertising measurement* choice, separate from analytics. | `kit/core/consent.js` |

Google's install page says to paste its gtag.js snippet straight after `<head>` on every page. Gradify doesn't do that:
the snippet would run before anyone consents. `kit/core/consent.js` runs the same snippet (`gtag("js", …)`,
`gtag("config", "G-CPR5LJB35L")`, `gtag/js?id=G-CPR5LJB35L`) only after "Accept analytics". It's the one Google tag on
each page. No GTM container is loaded, so nothing needs setting up in Tag Manager. `GTM-5GF2NFNH` and
`GTM-N7T32SZ5` aren't used. Google's "Test installation" button won't see the tag until you accept analytics in that browser.

## How it loads

`kit/core/theme-boot.js` is in the `<head>` of every page (about 2,460 of them) and adds `kit/core/consent.js`. That script:

1. Does nothing, and shows no banner, on JuniorGradify and YouthGradify (`CHILD_SITES`), when the browser sends Do Not Track or Global Privacy Control, after an opt-out from usage counts, or away from `getgradify.com`.
2. Otherwise shows the banner until the visitor chooses: **Accept all**, **Reject all** or **Manage preferences**, where *Analytics* and *Advertising measurement* are separate tick boxes. All three buttons are the same size and style. Nothing is preselected. Someone who answered before advertising was added (a `v:1` record) keeps their analytics answer and is asked again.
3. Only after something is accepted:
   - sets Consent Mode to exactly the choices made: `analytics_storage` from Analytics; `ad_storage` and `ad_user_data` from Advertising measurement; `ad_personalization` **always denied** (no remarketing: the audience includes under-18s)
   - sets `page_location` and `page_referrer` to cleaned values: no query string except `utm_` tags, no sign-in codes after `#`, `gclid`/`gbraid`/`wbraid` only with advertising consent, and the referrer cut to its origin
   - configures `G-CPR5LJB35L` with `cookie_expires` of 13 months, Google signals and ad personalisation off, and `traffic_type: "internal"` for test traffic
   - loads gtag.js
4. Granting more later is a Consent Mode `update` on the same page. Taking anything away (from "Cookie settings" or the privacy page) deletes that choice's cookies (`_ga*`, `_gid`, `_gat*` for analytics; `_gcl_*` for advertising) and reloads, so the old tag is gone.

The choice is kept in `localStorage["gradify.consent"]` as `{"v":2,"analytics":true|false,"ads":true|false,"at":"YYYY-MM-DD"}`. Raise `VERSION` in `consent.js` to ask everyone again, for example after adding a new purpose.

"Cookie settings" is added to the footer of pages that have one, and to the privacy page (`/privacy.html#analytics`). Any element with `data-cookie-settings` opens the dialog. Course and app pages have no footer; there, the privacy page is the way back in.

Pages that don't load `theme-boot.js` never get analytics: email campaign exports, `send.html`, `tools/exam-countdown/embed.html` (embedded on other sites), `labs/liquid-glass/` and `medgradify/anatomy.html`.

Don't add Google's snippet, a GTM container or any Google Ads tag to pages by hand: it would load before consent and double-count.

## Google Ads set-up (ads.google.com and analytics.google.com)

Conversions go to Google Ads through GA4, so the site needs no Google Ads tag:

1. GA4 › Admin › Product links › **Google Ads links**: link the Google Ads account. Leave **personalised advertising off** for the link.
2. GA4 › Admin › Events: mark `purchase`, `begin_checkout` and `sign_up` as key events.
3. Google Ads › Goals › Conversions › New › **Import › Google Analytics 4 properties › Web**: import `purchase` (primary) and `sign_up` (secondary).
4. Google Ads › Admin › Account settings: **auto-tagging on**, so ad clicks carry `gclid`.
5. Don't create remarketing audiences or turn on enhanced conversions. The site never grants `ad_personalization` and never sends email addresses.

Tag Manager's "0% consent rate" warning will now count only the visitors who declined advertising.

If you'd rather use a Google Ads conversion tag directly (an `AW-…` ID and conversion label), add `gtag("config", "AW-…")` in `load()` in `consent.js` and send the conversion from the same place `purchase` is sent. Don't import the GA4 `purchase` too, or each purchase will count twice.

## GA4 property settings (analytics.google.com)

- Admin › Data collection: **Google signals off**, granular location and device data collection as you choose.
- Admin › Data retention: **2 months** for event data (the privacy policy says 2 months; change both together).
- Admin › Data streams › Web › Enhanced measurement: page views on; **turn off "Page changes based on browser history events"** if lesson routes (`#/lesson/…`) double-count page views; turn off form interactions (they can capture field names on sign-in forms).
- Admin › Data filters: activate the **Internal traffic** filter (`traffic_type = internal`). Testers mark their own browsers with `localStorage.setItem("gradify.internal", "1")` in the console on getgradify.com.
- Admin › Product links: link Google Ads (personalised advertising off), as in "Google Ads set-up" above. The banner already asks for advertising consent separately.
- Key events: mark `sign_up`, `first_learning_action`, `begin_checkout` and `purchase`.
- Admin › Custom definitions: add event-scoped dimensions for `gradify_site`, `method`, `plan`, `billing_interval`, `mode`, `passed`, `page_type`, `kind`, `experiment`, `variant` and `exp`, and metrics for `cards` and `minutes`, to see them in reports.

## Events

Sent only after consent, through `window.gradifyConsent.event(name, params)`, as `gtag("event", …)`. Parameters can only be short strings, numbers or booleans. Keys that look personal (`email`, `name`, `user`, `token`, `answer`, `note`, `text`…) and any value with `@` are dropped.

| Event | Where | Parameters |
|---|---|---|
| `page_view` | GA4 itself, on each page load | |
| `lesson_start` / `quiz_start` / `exam_start` | `kit/course/course.js` route | |
| `lesson_complete`, `exam_finish`, `tutor_open` | forwarded by `track()` in `kit/core/analytics.js` | |
| `quiz_complete` | `kit/course/course.js` unit quiz | `passed` (never the score) |
| `flashcard_session_start` / `_complete` | `kit/app/main.js` | `cards`, `mode` / `practice` |
| `tool_use`, `quiz_finish`, `cta_click`, `share`, `print`, `export` | free tools, guides, topics, study plans and feature pages, via `track()`; `cta_click` also counts each feature page's "Open" button (`data-cta`) | `page_type` (the page's first folder: `features`, `tools`, `guides`, `topics` …) |
| `experiment_exposure` | `kit/core/experiments.js`, when a consenting visitor sees a running experiment | `experiment`, `variant`; `cta_click` and `first_learning_action` then carry `exp` (`id:variant`) |
| `first_learning_action` | `kit/core/consent.js`, once per browser, after the first `lesson_complete`, `quiz_complete`, `quiz_finish`, `exam_finish`, `flashcard_session_complete` or `study_plan_block_done` (activation: a sign-up alone never counts) | `kind` (which of those it was) |
| `study_plan_block_done` | `kit/lifeos/calendar.js` | `minutes` |
| `sign_up` / `login` | `kit/data/store.js`, once, on return from an email link or Google | `method` |
| `begin_checkout` | `kit/data/billing.js` | `plan`, `billing_interval`, `currency` |
| `purchase` | `pricing.html`, once per tab after Stripe returns | `plan`, `value` (monthly price, GBP), `currency` |

Pricing page visits are `page_view`s of `/pricing.html`.

## Testing

```bash
node scripts/check-consent.cjs
```

The check runs in Chromium, serves the folder itself, and stubs Google's servers. It covers: fresh visitors on five kinds of page, Accept, Reject, Manage preferences, returning visitors, withdrawal (cookies deleted), DNT, GPC, the usage-count opt-out, JuniorGradify and YouthGradify, localhost, URL cleaning, exactly one Google tag, and the banner on a phone. To test on localhost by hand, run `localStorage.setItem("gradify.analytics.dev", "1")` first.
