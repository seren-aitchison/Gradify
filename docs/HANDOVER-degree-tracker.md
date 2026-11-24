# Handover: degree tracker, consent and analytics, and the next stages

Written 24 November 2026 for whoever picks this up next. Read this first, then `docs/DESIGN-SYSTEM.md`,
`docs/ANALYTICS.md` and `README.md`.

## How this repo ships

- A plain static site with no build step (HTML, CSS, ES modules), on GitHub Pages at **getgradify.com**.
- `main` deploys itself through `.github/workflows/ci.yml` ("Test and deploy", about 7 minutes). The workflow tests,
  builds from an allowlist, minifies with esbuild, publishes, then checks the live site.
- The owner wants changes **live**. The working pattern has been: work on a branch, push, open a PR, merge it, then
  confirm the deploy run and the live file.
- **Before every commit:**
  - `node --test tests/*.mjs` must pass. Run `npm ci` first.
  - `node scripts/build-seo.mjs`: the generated search pages must be up to date; a test checks this.
  - `node scripts/preload-modules.mjs`: every page lists its static import graph as `modulepreload`; a test checks
    this. Any new static import changes these lists on thousands of pages, which is expected.
  - `node scripts/theme-tokens.mjs`: hard-coded dark-theme colours in `kit/styles` are turned into tokens; a test
    checks this.
  - New files that the app or homepage import must be added to `SHELL` in `sw.js` (`tests/offline.test.mjs`).
  - Running the tests and `build-seo` rewrites date stamps in `docs/qa/*.md` and `docs/CURRICULUM_PROGRESS.md`. That
    is noise: `git checkout -- docs/qa docs/CURRICULUM_PROGRESS.md` before committing.
- **Browser checks:** Playwright and Chromium are installed. Starting a local server was blocked in this environment,
  so `scripts/check-consent.cjs` serves files to the browser through `page.route`. Copy that approach for visual
  checks, and take screenshots at 1280px and 390px, in light and dark.
- Google's servers can't be reached from the dev container; stub them in tests.

## What was built in this session (all merged to main)

1. **Cookie consent and Google Analytics.**
   - `kit/core/consent.js`, loaded on every page by `kit/core/theme-boot.js`.
   - The banner offers Accept all / Reject all / Manage preferences. There are two separate opt-ins, *analytics* and
     *advertising measurement*.
   - Google's gtag.js for GA4 **G-CPR5LJB35L** loads only after consent. `ad_personalization` is always denied.
   - Never runs on JuniorGradify or YouthGradify, under Do Not Track or Global Privacy Control, or off getgradify.com.
   - The URLs and referrers sent to Google are cleaned.
   - Events are sent through `window.gradifyConsent.event()`: lessons, quizzes, flashcards, sign_up and login,
     begin_checkout, purchase.
   - Docs: `docs/ANALYTICS.md`. Browser test: `node scripts/check-consent.cjs` (45 checks). Privacy policy:
     `privacy.html#analytics`.
   - There is **no GTM container on the site**. `GTM-5GF2NFNH` and `GTM-N7T32SZ5` are not used. Don't add Google's
     snippet to pages by hand.
2. **Fixed the squashed top bar** on tool, guide and topic pages. The `.bar` class collided with a progress bar; the
   progress bar is now `.tool-progress`.
3. **Free tools restyled.** Rounded modular cards (lavender group background, white tiles with edges and shadows,
   pill buttons), in `assets/seo.css`.
4. **Degree tracker** at `/tools/degree-classification-calculator/`.
   - **Markup:** `scripts/seo/tools.mjs` (the `degree-classification-calculator` entry). The page itself is generated,
     so don't edit it by hand.
   - **Logic:** `assets/study-tools.js`. All of it is pure and deterministic, with tests in `tests/seo.test.mjs`:
     - `degreeTracker(rows, w3)`: average so far, % marked, and the average each class needs on the rest.
     - `degreeIntel(rows, w3, today)`: a headline, the next class up and the class to keep, an estimate, upcoming
       modules ranked by share of the degree × urgency, insights, and the next best action.
     - `TOOLS.degree`: the UI.
   - **Rows:** `{ name, mark, credits, year: "2" | "3", due }`. A blank mark means "still to come". Assumes 120 credits
     a year.
   - **Pages:** Overview, Plan, Goals, Modules. The panels are `[data-panel]`, switched by
     `button[data-page]` / `[data-go]`. The current page is stored in `root.dataset.view`. Don't use `data-page` on
     containers: it broke the click handling once.
   - **Toolbar:** `nav.tracker-nav[data-sheet]`. On phones it is docked by `assets/sheet.js`, a drag-up sheet that
     moves by transform only, follows the pointer on the window during a drag, and captures the pointer only once it
     moves. It runs at 60fps with no layout at 4× CPU throttling. More (`.sheet-toggle`) opens a list of every page.
     Rules, Import, Ask AI and Connections are listed there as "coming" cards; switch each one to a real
     `button[data-page]` when it's built.
   - **Subject icons and colours:** `kit/core/subject-match.js` (`subjectOf`, `subjectsFor`, tested in
     `tests/subject-match.test.mjs`). Each module name maps to a Gradify subject site in `kit/core/sites.js`, which
     gives its icon (`kit/core/icons.js`) and colour (`kit/core/accent.js`). It's keyword matching, not AI, on
     purpose: instant, private and offline.
   - **Calendar:** "Plan" buttons download an `.ics` of spaced revision sessions before a due date.
5. **Action card, the site-wide "what to do next" component.** `actionCard()` in `kit/core/action-card.js`, styles
   `.g-action` in `kit/styles/base.css`, documented in `docs/DESIGN-SYSTEM.md`. The owner loves this style: reuse it
   wherever a page tells someone what to do next.

## Owner's preferences (keep to these)

- Apple-style, modular, rounded cards. Strong contrast, not grey and monochrome. Coloured accents: the Gradify
  gradient `#4641ff → #9b3cf0 → #e0409f → #ff6a2b`, and a colour per degree class (First indigo, 2:1 pink, 2:2 orange,
  Third amber).
- Use **the owner's own icons** from `kit/core/icons.js`; the Gradify "G" arc is the logo path.
- Take inspiration from UniGrade (a popular UK degree-calculator app) but **never copy it**: not its name, icons or
  layout.
- Smooth motion (transform only, iOS easing `cubic-bezier(.32,.72,0,1)`), and no long scrolling.
- "Intelligence" means deterministic maths that explains itself and leads to an action you can take. An AI may
  explain the numbers but must never calculate them. Label estimates as estimates.
- The audience includes under-18s: no ad personalisation, no tracking without consent, and child sites are excluded.
- Write in plain UK English.

## Remaining stages, in the order the owner asked for

### Done since (24 November 2026, later session)

- **The new UI across the whole site** (PRs 186, 188, 189, 190): search pages (`assets/seo.css`, tokens now on
  `main.seo`), the homepage, Pricing and Journey, the subject sites (end of `kit/styles/subsite.css`) and the study app
  (end of `kit/app/app.css`). New shared pieces: link tiles `.g-tiles`, `actionCard({ tag, heading })`,
  `.g-action.compact`, `--g-btn`. See "The Gradify look" in `docs/DESIGN-SYSTEM.md`.
- **University rules** (Stage 3 below): `kit/data/uni-rules.js`, the tracker's "University rules" page
  (`data-page="rules"`, in the More sheet), and `tests/uni-rules.test.mjs`. Five universities so far: Birmingham,
  Bristol, King's College London, Leeds (Iteration B) and Nottingham, each rule quoted word for word with its source.
  - Not added, because their pages couldn't be read and checked: **UCL** (its site blocks automated reading),
    **Warwick** (the current Rules for Award need a staff sign-in) and **Manchester** (only older regulation PDFs were
    found). Add them only after reading the current regulations by hand.
  - Reading regulations needs each university's host in the environment's allowed network hosts (Settings → the
    environment → Network). Allowed so far: www.ucl.ac.uk, secretariat.leeds.ac.uk, students.leeds.ac.uk,
    www.nottingham.ac.uk, www.bristol.ac.uk, warwick.ac.uk, documents.manchester.ac.uk, www.manchester.ac.uk,
    intranet.birmingham.ac.uk, www.birmingham.ac.uk, www.ed.ac.uk, www.kcl.ac.uk.
  - How a rule feeds the maths: `degreeTracker(rows, w3, perYear, rule)` and `degreeIntel(rows, w3, today, perYear,
    rule)`. Rounding moves each class's threshold (Bristol 69.5, Leeds 69.45); a borderline zone triggers
    `borderlineCheck`, which tests the module marks against the university's own criteria and says what it can't
    check (Birmingham's dissertation mark). The year-2/final-year split is set from the rule. Every rule so far has
    year 1 at 0; a university that counts year 1 needs a year-1 weight in `degreeTracker` first.

- **Import a module handbook** (Stage 4 below): the tracker's "Import a handbook" page (`data-page="import"`).
  `kit/notes/pdf-text.js` reads a PDF in the browser line by line (table rows stay on one line);
  `kit/data/handbook.js` `parseHandbook` finds modules by code, merges repeats (contents, tables, assessment lines),
  and takes credits (ECTS doubled), the year (its own line, else the nearest "Year 2" / "Level 6" heading above, else
  a guess from the code, flagged), assessments with weights and the next deadline. A review screen lets the student
  untick, edit or replace before anything reaches the tracker; nothing is uploaded and no AI is used. Tests:
  `tests/handbook.test.mjs`. Gradify AI could help with messy layouts later, with consent and a clear notice.

### Stage 2: roll the new UI out across the whole site (done, see above)
Apply the same visual language: tokens like `.tool` in `assets/seo.css` (`--tile`, `--group`, `--tile-edge`,
`--tile-shadow`, `--brand`, `--c70`…), white tiles, 22–30px radii, coloured squircle icons, and `.g-action` for next
steps. Go in stages, with screenshots of each:
1. The search pages' shared components in `assets/seo.css`: `.cards`, `.cta-box`, `.optin`, `.faq-block`, `.related`,
   `.next-action`. Consider turning `.next-action` and `.cta-box` into `.g-action`.
2. The homepage and hub pages (`index.html`, `explore.html`, `pricing.html`, `journey.html`, `assets/styles.css`).
3. The subject sites (`kit/styles/subsite.css`).
4. The study app (`app.html`, `kit/app/app.css`, `kit/styles/course.css`), most carefully, because learners use it
   daily.

Run `scripts/theme-tokens.mjs` and the full tests after each step.

### Stage 3: university rules, with a source for every rule (first five done, see above)
- A data file (for example `kit/data/uni-rules.js`) with, for each university: classification boundaries, year
  weightings (or the "best of" or exit-velocity rule), borderline and preponderance policy, rounding, and
  compensation if relevant.
- **Every rule needs:** a source URL to the university's own regulations, the academic year, `verified: true` only
  if it was checked against the fetched page, and a date checked.
- **Never invent regulations.** Research with web search and fetching; leave out anything you can't verify. Start
  with a handful of large UK universities.
- **UI:** a "University rules" page in the tracker (`data-page="rules"`). Choosing a university sets the weighting
  (`w3`), shows the borderline rule with its source link, and feeds the borderline insight in `degreeIntel`. Keep the
  maths deterministic and add tests.

### Stage 4: upload a module handbook (done, deterministic, see above)
- The app already reads PDFs (`kit/vendor/pdfjs`; see `kit/notes` and `kit/tools/material.js` for how).
- Extract module names, credits, assessment weights and deadlines. Start with a deterministic parser (tables and
  lines like "20 credits", dates). Gradify AI (Stage 5's backend) could help with messy layouts.
- **Always show a review screen**, where the student confirms or edits, before anything fills the tracker rows.
  Nothing is uploaded unless AI is used, and then say so.

### Stage 5: Ask Gradify AI about your degree
- Gradify already has an AI backend: a Supabase edge function calling Anthropic, with per-plan allowances. See
  `docs/AI-PIPELINE.md`, `kit/data/functions.js`, `kit/assess/tutor.js` and `supabase/functions/`.
- Send the AI the tracker's computed results (`degreeIntel` output and rows), never ask it to compute.
- Answer questions like "Can I still get a First?" by quoting those numbers, separating verified facts from
  estimates, and ending with an action (an `.g-action` card).
- The privacy policy already covers Gradify AI; check what is sent and add to the policy if needed.

### Stage 6: calendar, Moodle and Canvas connections
- These need the owner's decisions and accounts: a Google Cloud OAuth app (with verification for calendar scopes) and
  a Microsoft Entra app. Moodle and Canvas need a per-university token, or LTI, and university permission. Browser
  CORS means a server proxy (Supabase function).
- **Ask the owner before building.** Do read-only first.
- The `.ics` export that exists today is the no-permission fallback.

## Open items for the owner, not code

- **GA4 settings:** 2-month data retention, the internal-traffic filter on, history-change page views off, form
  interactions off. See `docs/ANALYTICS.md`.
- **Google Ads:**
  - Link Ads to GA4 with personalised advertising off. The owner's Ads account is `572-133-0211`; the link appears to
    exist.
  - Create conversions from GA4 `purchase` (primary) and `sign_up` (secondary) in GA4 › Conversion management.
  - Turn auto-tagging on.
  - No enhanced conversions or remarketing.
- **Search Console:** verify, submit `sitemap.xml`, and request indexing.
