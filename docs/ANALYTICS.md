# Analytics: consent, Google Tag Manager and GA4

Gradify has two kinds of analytics:

| | What | Consent | Code |
|---|---|---|---|
| Usage counts | Anonymous rows in Supabase `page_events`. No cookie, no identifier. | Not needed (nothing stored on the device). Off for DNT/GPC, or after an opt-out on the privacy page. | `kit/core/analytics.js` |
| Google Analytics 4 | Loaded through Google Tag Manager. Sets `_ga` cookies. | **Opt-in only**, from the cookie banner. | `kit/core/consent.js` |

- GTM container: **`GTM-5GF2NFNH`** (the only container; set in `kit/core/consent.js`)
- GA4 measurement ID: **`G-CPR5LJB35L`** (configured inside the GTM container, not in the site's code)
- `GTM-N7T32SZ5` is wrong and isn't used anywhere.

## How it loads

`kit/core/theme-boot.js` is in the `<head>` of every page (about 2,460 of them) and adds `kit/core/consent.js`. That script:

1. Does nothing, and shows no banner, on JuniorGradify and YouthGradify (`CHILD_SITES`), when the browser sends Do Not Track or Global Privacy Control, after an opt-out from usage counts, or away from `getgradify.com`.
2. Otherwise shows the banner until the visitor chooses: **Accept analytics**, **Reject analytics** or **Manage preferences**. All three buttons are the same size and style. Nothing is preselected.
3. Only after Accept: sets Consent Mode defaults (analytics granted; `ad_storage`, `ad_user_data`, `ad_personalization` denied), pushes `gradify_site`, `gradify_page_location`, `gradify_page_referrer` and (for test traffic) `traffic_type: "internal"` to `dataLayer`, then loads `gtm.js?id=GTM-5GF2NFNH`.
4. On withdrawal (Reject later, from "Cookie settings" or the privacy page): deletes `_ga*`, `_gid`, `_gat*` and `_gcl_*` cookies and reloads, so no Google code is left on the page.

The choice is kept in `localStorage["gradify.consent"]` as `{"v":1,"analytics":true|false,"at":"YYYY-MM-DD"}`. Raise `VERSION` in `consent.js` to ask everyone again, for example after adding a new purpose.

"Cookie settings" is added to the footer of pages that have one, and to the privacy page (`/privacy.html#analytics`). Any element with `data-cookie-settings` opens the dialog. Course and app pages have no footer; there, the privacy page is the way back in.

Pages that don't load `theme-boot.js` never get analytics: email campaign exports, `send.html`, `tools/exam-countdown/embed.html` (embedded on other sites), `labs/liquid-glass/` and `medgradify/anatomy.html`.

## Set up the GTM container (do this in tagmanager.google.com)

The site sends nothing to Google until these are in place and the container is **published**.

1. **Variables** (Data Layer Variable, version 2):
   - `DLV - gradify_page_location` → `gradify_page_location`
   - `DLV - gradify_page_referrer` → `gradify_page_referrer`
   - `DLV - gradify_site` → `gradify_site`
   - `DLV - traffic_type` → `traffic_type`
   - one for each event parameter you want in reports: `method`, `plan`, `billing_interval`, `currency`, `passed`, `cards`, `mode`, `practice`, `minutes`
2. **Google tag** with tag ID `G-CPR5LJB35L`, trigger *Initialization - All Pages*. Configuration parameters:
   - `page_location` = `{{DLV - gradify_page_location}}` (**required**: the raw URL can hold sign-in codes and Stripe return values; this one is cleaned)
   - `page_referrer` = `{{DLV - gradify_page_referrer}}`
   - `traffic_type` = `{{DLV - traffic_type}}`
   - `cookie_expires` = `33696000` (13 months, as the privacy policy says)
   - `allow_google_signals` = `false`, `allow_ad_personalization_signals` = `false`
3. **GA4 Event tag**: measurement ID `G-CPR5LJB35L`, event name `{{Event}}`, parameters `gradify_site`, `page_location` = `{{DLV - gradify_page_location}}` and the parameters above. Trigger: *Custom Event*, regex, event name matching:
   `^(lesson_start|lesson_complete|quiz_start|quiz_complete|exam_start|exam_finish|flashcard_session_start|flashcard_session_complete|tutor_open|tool_use|quiz_finish|cta_click|share|print|export|study_plan_block_done|sign_up|login|begin_checkout|subscription_start)$`
4. **Don't add** a second Google tag, a hard-coded gtag snippet, or any Google Ads, Floodlight or remarketing tags without updating the consent banner and privacy policy first.
5. **Consent**: in Admin › Container settings, turn on *Enable consent overview*. Set the Google tag and the Event tag to *No additional consent required* (the site only loads GTM after consent).
6. Preview with Tag Assistant on getgradify.com, then **Submit/Publish**.

## GA4 property settings (analytics.google.com)

- Admin › Data collection: **Google signals off**, granular location and device data collection as you choose.
- Admin › Data retention: **2 months** for event data (the privacy policy says 2 months; change both together).
- Admin › Data streams › Web › Enhanced measurement: page views on; **turn off "Page changes based on browser history events"** if lesson routes (`#/lesson/…`) double-count page views; turn off form interactions (they can capture field names on sign-in forms).
- Admin › Data filters: activate the **Internal traffic** filter (`traffic_type = internal`). Testers mark their own browsers with `localStorage.setItem("gradify.internal", "1")` in the console on getgradify.com.
- Admin › Product links: no Google Ads link until advertising consent is added to the banner.
- Key events: mark `sign_up`, `begin_checkout` and `subscription_start`.

## Events

Sent only after consent, through `window.gradifyConsent.event(name, params)`. Parameters can only be short strings, numbers or booleans. Keys that look personal (`email`, `name`, `user`, `token`, `answer`, `note`, `text`…) and any value with `@` are dropped.

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

The check runs in Chromium, serves the folder itself, and stubs Google's servers. It covers: fresh visitors on five kinds of page, Accept, Reject, Manage preferences, returning visitors, withdrawal (cookies deleted), DNT, GPC, the usage-count opt-out, JuniorGradify and YouthGradify, localhost, URL cleaning, a single GTM container, and the banner on a phone. To test on localhost by hand, run `localStorage.setItem("gradify.analytics.dev", "1")` first.
