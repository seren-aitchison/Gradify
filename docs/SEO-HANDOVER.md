# SEO batch 2: done

Batch 2 is complete: see "Batch 2 (November 2026): what's built" in `docs/SEO.md` for what was made, where the code is, and the off-site checklist. The owner decisions still open:

- About page: your background and LinkedIn URL (the `Person` in `scripts/seo/pages.mjs` takes `sameAs`).
- Ambassador terms (free Pro plus a reference).
- Microsoft Clarity project ID (`gradify.config.js`), and running `docs/sql/action-events.sql` then setting `ACTIONS_LIVE = true` in `kit/core/analytics.js`.
- Competitor facts on `/compare/` pages: re-check every few months (prices aren't quoted on purpose).
- Exam-season countdown dates (`SEASONS` in `scripts/seo/tools2.mjs`) are estimates: update them when the 2027 timetables are published.

To add the About page details: fill in `FOUNDER = { bio, linkedin }` in `scripts/seo/pages.mjs`, then run `node scripts/build-seo.mjs` and commit. For Clarity: set `CLARITY_ID` in `gradify.config.js`.
