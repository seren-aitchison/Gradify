# Connecting real search data

Until these are connected, the growth engine runs on estimates and says so: every number names its source, and the report shows "Unavailable" rather than zero. This page is the exact access each source needs.

## 1. Google Search Console (measured: impressions, clicks, CTR, position, queries)

**What it needs:** read-only access to the getgradify.com property, for a service account the weekly workflow signs in as.

1. **Google Cloud:** in any project you own (console.cloud.google.com), open *APIs & Services › Library* and enable **Google Search Console API**.
2. **Service account:** *IAM & Admin › Service accounts › Create*. It needs **no** Cloud roles. Open it, *Keys › Add key › JSON*, and keep the file safe (it's a password).
3. **Search Console:** search.google.com/search-console › the getgradify.com property › *Settings › Users and permissions › Add user*: the service account's email, permission **Restricted** (read-only).
   - The fetcher defaults to the Domain property `sc-domain:getgradify.com`. If only the URL-prefix property is verified, add the user there and run with `--site https://getgradify.com/`.
4. **GitHub:** repository › *Settings › Secrets and variables › Actions › New repository secret*, name `GSC_SERVICE_ACCOUNT`, value the whole JSON file.
5. **Merge to main.** The *Growth engine* workflow then fetches 28 days of query × page data every Monday (`scripts/growth/gsc-fetch.mjs`, scope `webmasters.readonly` only) before building the report. Run it any time: *Actions › Growth engine › Run workflow › report*.

Locally, with the key: `gcloud auth activate-service-account --key-file=key.json` then `GSC_ACCESS_TOKEN=$(gcloud auth print-access-token --scopes=https://www.googleapis.com/auth/webmasters.readonly) npm run growth:fetch`.

**Without any of that (today):** Search Console › *Performance › Search results*, last 28 days, *Export › Download CSV*; unzip and put `Queries.csv` and `Pages.csv` in `data/growth/inputs/`, then `npm run growth`. That gives queries and pages, but not which page each query landed on (the API does).

Things to know: data is about 3 days behind; Google leaves out rare queries for privacy, so query totals are lower than page totals; the raw files stay out of git (`.gitignore`), because they hold what people typed.

## 2. Google Keyword Planner (Google's demand ranges for searches Gradify doesn't rank for yet)

**What it needs:** a Google Ads account. No campaign or spend is required, but without spend Keyword Planner shows **ranges** ("1K – 10K"). The importer keeps the range and labels the midpoint it ranks by.

**The first export:**

1. ads.google.com: create the account; if it pushes you to create a campaign, choose *Switch to Expert Mode › Create an account without a campaign*.
2. *Tools › Planning › Keyword Planner › Discover new keywords*. Location **United Kingdom**, language **English**, last 12 months.
3. Seeds, ten at a time: `gcse biology revision`, `a level chemistry revision notes`, `revision timetable`, `flashcard maker`, `pdf to flashcards`, `how to revise for exams`, `dna replication`, `sqe1 revision`, `nursing revision`, `degree classification calculator`; then the clusters in `docs/seo/KEYWORD-MAP.md`.
4. *Download keyword ideas › .csv*. Save each as `data/growth/inputs/keyword-planner-<seed-or-date>.csv` (the UTF-16 file Google produces is fine).
5. `npm run growth`. Phrases with Planner demand that Gradify has no page for appear in the report as "New opportunities with measured demand" (section 2b) marked **needs a page**.

Planner figures are Google's planning estimates of search volume, not Gradify traffic; they're labelled `keyword-planner`, never `search-console`.

## 3. Google Trends (when demand peaks)

trends.google.com › Explore › **United Kingdom**, **Past 5 years**, up to five terms (`revision`, `revision timetable`, `gcse`, `a level results`, `freshers`) › *Interest over time › Download*. Save as `data/growth/inputs/trends-<topic>.csv`. The report then shows the measured peak months; when they confirm the calendar, set `VALIDATED = true` in `scripts/growth/seasons.mjs`.

## 4. Gradify's own funnel (sign-ups, activation, retention, revenue)

Supabase › SQL editor › run queries 10–13 in `docs/sql/growth-dashboard.sql` (read-only) › download each result as CSV into `data/growth/inputs/`: `db-funnel.csv`, `db-signups-by-page.csv`, `db-retention-by-site.csv`, `db-features-and-paid.csv`. With `db-signups-by-page.csv`, every recommendation is ranked by **expected activated students**, not clicks.
