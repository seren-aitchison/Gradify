# Analytics: consent and Google Analytics 4

Gradify has two kinds of analytics:

| | What | Consent | Code |
|---|---|---|---|
| Usage counts | Anonymous rows in Supabase `page_events`. No cookie, no identifier. | Not needed (nothing stored on the device). Off for DNT/GPC, or after an opt-out on the privacy page. | `kit/core/analytics.js` |
| Google Analytics 4 | Google's gtag.js tag, **`G-CPR5LJB35L`**. Sets `_ga` cookies. | **Opt-in only**, from the cookie banner. | `kit/core/consent.js` |

Google's install page says to paste its gtag.js snippet straight after `<head>` on every page. Gradify doesn't do that:
the snippet would run before anyone consents. `kit/core/consent.js` runs the same snippet (`gtag("js", …)`,
`gtag("config", "G-CPR5LJB35L")`, `gtag/js?id=G-CPR5LJB35L`) only after "Accept analytics". It's the one Google tag on
each page. No GTM container is loaded, so nothing needs setting up in Tag Manager. `GTM-5GF2NFNH` and
`GTM-N7T32SZ5` aren't used. Google's "Test installation" button won't see the tag until you accept analytics in that browser.

## How it loads

`kit/core/theme-boot.js` is in the `<head>` of every page (about 2,460 of them) and adds `kit/core/consent.js`. That script:

1. Does nothing, and shows no banner, on JuniorGradify and YouthGradify (`CHILD_SITES`), when the browser sends Do Not Track or Global Privacy Control, after an opt-out from usage counts, or away from `getgradify.com`.
2. Otherwise shows the banner until the visitor chooses: **Accept analytics**, **Reject analytics** or **Manage preferences**. All three buttons are the same size and style. Nothing is preselected.
3. Only after Accept:
   - sets Consent Mode defaults (analytics granted; `ad_storage`, `ad_user_data`, `ad_personalization` denied)
   - sets `page_location` and `page_referrer` to cleaned values: no query string except `utm_` tags, no sign-in codes after `#`, and the referrer cut to its origin
   - configures `G-CPR5LJB35L` with `cookie_expires` of 13 months, Google signals and ad personalisation off, and `traffic_type: "internal"` for test traffic
   - loads gtag.js
4. On withdrawal (Reject later, from "Cookie settings" or the privacy page): deletes `_ga*`, `_gid`, `_gat*` and `_gcl_*` cookies and reloads, so no Google code is left on the page.

The choice is kept in `localStorage["gradify.consent"]` as `{"v":1,"analytics":true|false,"at":"YYYY-MM-DD"}`. Raise `VERSION` in `consent.js` to ask everyone again, for example after adding a new purpose.

"Cookie settings" is added to the footer of pages that have one, and to the privacy page (`/privacy.html#analytics`). Any element with `data-cookie-settings` opens the dialog. Course and app pages have no footer; there, the privacy page is the way back in.

Pages that don't load `theme-boot.js` never get analytics: email campaign exports, `send.html`, `tools/exam-countdown/embed.html` (embedded on other sites), `labs/liquid-glass/` and `medgradify/anatomy.html`.

Don't add Google's snippet, a GTM container or any Google Ads tag to pages by hand: it would load before consent and double-count.

## GA4 property settings (analytics.google.com)

- Admin › Data collection: **Google signals off**, granular location and device data collection as you choose.
- Admin › Data retention: **2 months** for event data (the privacy policy says 2 months; change both together).
- Admin › Data streams › Web › Enhanced measurement: page views on; **turn off "Page changes based on browser history events"** if lesson routes (`#/lesson/…`) double-count page views; turn off form interactions (they can capture field names on sign-in forms).
- Admin › Data filters: activate the **Internal traffic** filter (`traffic_type = internal`). Testers mark their own browsers with `localStorage.setItem("gradify.internal", "1")` in the console on getgradify.com.
- Admin › Product links: no Google Ads link until advertising consent is added to the banner.
- Key events: mark `sign_up`, `begin_checkout` and `subscription_start`.
- Admin › Custom definitions: add event-scoped dimensions for `gradify_site`, `method`, `plan`, `billing_interval`, `mode` and `passed`, and metrics for `cards` and `minutes`, to see them in reports.

## Events

Sent only after consent, through `window.gradifyConsent.event(name, params)`, as `gtag("event", …)`. Parameters can only be short strings, numbers or booleans. Keys that look personal (`email`, `name`, `user`, `token`, `answer`, `note`, `text`…) and any value with `@` are dropped.

| Event | Where | Parameters |
|---|---|---|
| `page_view` | GA4 itself, on each page load | |
| `lesson_start` / `quiz_start` / `exam_start` | `kit/course/course.js` route | |
| `lesson_complete`, `exam_finish`, `tutor_open` | forwarded by `track()` in `kit/core/analytics.js` | |
| `quiz_complete` | `kit/course/course.js` unit quiz | `passed` (never the score) |
| `flashcard_session_start` / `_complete` | `kit/app/main.js` | `cards`, `mode` / `practice` |
| `tool_use`, `quiz_finish`, `cta_click`, `share`, `print`, `export` | free tools, guides, topics and study plans, via `track()` | |
| `study_plan_block_done` | `kit/lifeos/calendar.js` | `minutes` |
| `sign_up` / `login` | `kit/data/store.js`, once, on return from an email link or Google | `method` |
| `begin_checkout` | `kit/data/billing.js` | `plan`, `billing_interval`, `currency` |
| `subscription_start` | `pricing.html`, once per tab after Stripe returns | `plan` |

Pricing page visits are `page_view`s of `/pricing.html`.

## Testing

```bash
node scripts/check-consent.cjs
```

The check runs in Chromium, serves the folder itself, and stubs Google's servers. It covers: fresh visitors on five kinds of page, Accept, Reject, Manage preferences, returning visitors, withdrawal (cookies deleted), DNT, GPC, the usage-count opt-out, JuniorGradify and YouthGradify, localhost, URL cleaning, exactly one Google tag, and the banner on a phone. To test on localhost by hand, run `localStorage.setItem("gradify.analytics.dev", "1")` first.
