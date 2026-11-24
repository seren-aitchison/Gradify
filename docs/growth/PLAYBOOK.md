# Gradify growth engine: the playbook

How Gradify keeps getting more discoverable, more clicked and better at turning visits into students who learn and come back. **Daily monitoring, weekly optimisation, monthly expansion**, and never rewriting pages to look busy.

The north star is **Weekly Active Learning Students (WALS)**: accounts with at least one meaningful learning action in a week (`docs/sql/growth-dashboard.sql`, query 7). Traffic, impressions and rankings matter only as far as they lead there.

## The parts

| Part | What it does | Where |
|---|---|---|
| Search identity | Titles, descriptions and structured data for site homes; feature pages; course overviews; lesson pages pilot | `scripts/seo/registry.mjs`, `features.mjs`, `coursepages.mjs`, `lessons.mjs` |
| SEO audit | Every published page checked; CI fails on errors | `scripts/seo-audit.mjs` → `docs/seo/AUDIT.md`, `inventory.csv` |
| Search intelligence | Opportunity database: every search Gradify could win, its one destination and a priority | `scripts/growth/opportunities.mjs` → `docs/growth/OPPORTUNITIES.md`, `data/growth/opportunities.json` |
| Data import | Search Console (API or export), Keyword Planner, Trends, dashboard CSVs, each kept with its source | `scripts/growth/sources.mjs`, `gsc-fetch.mjs`; files in `data/growth/inputs/` (not in git) |
| Intent map | Hand-made clusters, one destination each; competition from real search samples where taken | `scripts/seo/keywords.mjs` → `docs/seo/KEYWORD-MAP.md` |
| Competitors | Who ranks, with what kind of page, and where Gradify can do better (dated sample) | `docs/growth/COMPETITORS.md` |
| Growth report | Answers the eight dashboard questions from data, or says what's missing | `scripts/growth/report.mjs` → `docs/growth/REPORT.md` |
| Seasons | The academic year as search demand, with preparation windows | `scripts/growth/seasons.mjs` |
| Lesson readiness | Which units to add to the lesson pilot next, and what other lessons lack | `scripts/growth/lesson-readiness.mjs` → `docs/growth/CONTENT-BACKLOG.md` |
| Change control | Title and description changes are logged with evidence, one per page per 28 days | `scripts/growth/serp-changes.mjs`, `data/growth/serp-changes.json` |
| Experiments | Pre-registered A/B tests for consenting visitors, read only when the plan is met | `kit/core/experiments.js` |
| Monitoring | Daily production check; weekly report as an artifact | `scripts/growth/monitor.mjs`, `.github/workflows/growth.yml` |
| Product funnel | Activation, retention, WALS, paid conversion (read-only SQL) | `docs/sql/growth-dashboard.sql` |

`npm run growth` rebuilds the opportunities and the report. `npm run growth:monitor`, `growth:lessons`, `growth:changes`, `seo:audit` run the rest.

## The rhythm

### Daily (automated; a person acts only on a failure)

- The **Growth engine** workflow checks robots.txt, every sitemap, every listed URL and the key pages. It fails, and GitHub emails, only on something that stops pages being found: robots blocking the site, a sitemap that doesn't load, more than 1% of URLs not answering 200, the homepage losing its title, canonical or index permission.
- **Don't** act on daily ranking or traffic movement. It's noise.

### Weekly (Monday; 30–60 minutes)

1. Open the workflow's weekly **growth report** artifact (or run `npm run growth` with fresh exports).
2. Pick **at most three** changes, in this order:
   - **Low-CTR pages** (question 3): shown often, clicked less than Gradify's own pages at that position. Rewrite the title or description to match what the searcher wants (use the query list), then log it.
   - **Striking-distance queries** (question 2): positions 4–20. Put the phrase in an `h2` on the ranking page, answer it in the first two sentences, add two internal links.
   - **Clicks but no sign-ups** (question 4): check the page's next step. Can a visitor try the thing without signing up?
3. **Log every title or description change** in `data/growth/serp-changes.json` (date, pages, field, reason, evidence), then `node scripts/growth/serp-changes.mjs --accept`. CI refuses unlogged changes and a second change to the same page within 28 days.
4. Check the **seasonal** line in question 8: anything in its preparation window gets refreshed and linked now, not when the peak arrives.

### Monthly (first week; half a day)

1. **Refresh the data:** Keyword Planner ideas for the top clusters and new subjects; Trends for the seasonal terms (does the calendar hold? set `VALIDATED` in `seasons.mjs` once it does); the dashboard queries 10–13 into `data/growth/inputs/`.
2. **Repeat the competitor sample** for the top clusters; update `docs/growth/COMPETITORS.md` and the `sampled` dates.
3. **Lesson pages:** if the current pilot batch is mostly indexed in Search Console (Indexing › Sitemaps › lessons), add the next batch from `CONTENT-BACKLOG.md` to `PILOT`, a few hundred pages per deploy. If it's mostly "Crawled – currently not indexed", improve the pages before adding any.
4. **Content backlog:** pick the subjects in the next batch and fill what their lessons lack (mostly explained practice questions).
5. **Experiments:** read any that have met their plan (`ready()`, then `analyse()`); record the result and decision; propose the next one for the funnel's weakest step.
6. **Decide the next sprint** from question 8 of the report.

## Who approves what

| Change | Automated | Needs the owner |
|---|---|---|
| Monitoring, reports, opportunity database, audits | Yes (read-only) | |
| A title or description on a curated page | | Yes: a logged entry with evidence, through a branch and review |
| New public pages (a lesson batch, a guide, a feature page) | | Yes: review, then the normal Test and deploy |
| Starting an experiment | | Yes: `approvedBy`, start date and planned sample in `experiments.js` |
| Curriculum claims (GCSE, A level, SQE…) | | Yes: only after `kit/curriculum/coverage.js` records the evidence |
| Production database changes, deploys | | Yes, always |

## How priority is scored

`priority = demand × winnability × intent × conversion × readiness` (0–100, `scripts/growth/opportunities.mjs`):

- **Demand:** Search Console impressions (measured), else Keyword Planner's monthly range, else an estimate tier at half weight, else a small floor. Measured always outranks guessed.
- **Winnability:** low competition 1, medium 0.6, high 0.3, unknown 0.5; ×1.5 when Gradify already ranks 4–20.
- **Intent:** doing something (a tool) 1; revising 0.9; a question or comparison 0.8; a bare topic 0.6; navigational 0.3.
- **Conversion:** how directly the destination leads to learning in Gradify: tool or feature 1, site or course 0.9, lesson 0.8, topic page 0.7, guide 0.6.
- **Readiness:** a page exists 1; a gap (needs building) 0.5.

Product readiness and retention potential enter through the destination. Effort is judged by a person when picking the sprint.

## Authority and distribution (real relationships, no shortcuts)

Never buy links, use link schemes or automate outreach. Every item here is a person-to-person action, in priority order:

1. **University study-skills teams.** They own "how to revise" (see the competitor sample). Offer the free tools and the active-recall guide as resources for their pages and workshops. One link from a .ac.uk study-skills page is worth more than any directory.
2. **Teachers.** EduGradify plus the printable templates and diagrams: share in Tes and teacher communities; offer a department a ready-made topic pack. Ask for feedback first, a link second.
3. **Student societies and course reps.** A topic link or study plan for a module's group chat; the Campus Ambassadors programme (terms to confirm, `docs/SEO.md`).
4. **Original, citable material.** The `/research/` dataset (CC BY 4.0) and the checked diagrams are what other sites cite. Pitch journalists and bloggers when exam season makes them relevant.
5. **Short-form video and Pinterest.** Each lesson page's diagram plus its common mistake is a ready 30-second video or pin. Make one only where the matching page exists, and link it.
6. **Communities** (r/GCSE, r/6thForm, r/UniUK, The Student Room): answer the question; link only when the page *is* the answer; follow each community's rules.

Track what each brings in with `utm_` tags (first touch records them, dashboard query 3).

## AI search and other engines

Already in place: crawlable static pages, answer-first summaries, honest structured data, `llms.txt` and `llms-full.txt`, IndexNow pings, and robots that welcome search and AI crawlers. The rest is the same as for Google: original explanations, real diagrams, cited sources, clear authorship and accurate claims. There are no special AI-ranking tricks worth doing; don't add any. Check monthly whether ChatGPT, Perplexity and Gemini mention Gradify for the top clusters (`docs/SEO.md`).

## Images and brand

- **Done:** lesson pages use the checked SVG diagrams (alt text and captions from `kit/diagrams/manifest.json`), which suits image search; link-preview images per section and per site (`assets/og/`).
- **Next:** a link-preview image per feature page and per subject, in the house style (`docs/DESIGN-SYSTEM.md`), and real product screenshots on the feature pages. Raster previews (PNG) are needed for social cards: the diagrams are SVG.

## One-time setup (needs the owner)

1. **Search Console API:** create a Google Cloud service account, add its email as a *restricted* user on the getgradify.com Search Console property, and save its JSON key as the repository secret `GSC_SERVICE_ACCOUNT`. The weekly workflow then fetches Search Console data itself. (Or export Performance as CSV into `data/growth/inputs/` by hand.)
2. **Keyword Planner:** a free Google Ads account (no campaign). Keyword ideas › Download for the clusters in `docs/seo/KEYWORD-MAP.md` → `data/growth/inputs/keyword-planner-*.csv`.
3. **Trends:** download "Interest over time" (United Kingdom, 5 years) for the seasonal terms → `trends-*.csv`.
4. **Dashboard exports:** run queries 10–13 in the Supabase SQL editor; save as `db-funnel.csv`, `db-signups-by-page.csv`, `db-retention-by-site.csv`, `db-features-and-paid.csv`.
5. **GA4:** mark `first_learning_action` as a key event; add the custom dimensions listed in `docs/ANALYTICS.md`.
6. Merge to `main`: scheduled workflows only run on the default branch.
