# Gradify™

**Bring your notes into Gradify. Turn them into useful study materials. Learn, track your progress and know what to do next.**

The parent site for the Gradify family of learning sites. It links out to every Gradify site, plus TechGradify · ForgeLab and Klerio.

It's a plain static site with no build step: HTML, CSS and one JavaScript module.

```
index.html          page structure
assets/sites.js     every site: name, colour, description, URL  ← edit this to add or change sites
assets/styles.css   liquid-glass styling, light + dark mode
assets/app.js       renders the cards, colour strip, search, filters, theme toggle
assets/icons.js     line icons for each site and the interface
assets/colour.js    colour helpers shared by the scripts
assets/lifeos.js    the Gradify LifeOS preview: today panel, life heatmap, life areas, learning path, credentials
assets/earth.js     Gradify Earth: the 2D knowledge map in the LifeOS preview
assets/plan.js      Path: goals, readiness, gaps and routes in the LifeOS preview
assets/assistant.js Gradify AI preview (scripted replies worked out from the example data)
assets/os.js        LifeOS window: the sidebar views, and links that open the right view
assets/studio.js    Notes Studio: PDF or pasted notes → clean notes, flashcards, spidermap, cheat sheet,
                    narrated video, chant and audio quiz (runs for real in the browser)
assets/calendar.js  Plan: the time-blocking calendar
assets/tree.js      Gradify Tree and Forest drawings
assets/features.js  feature bubbles, the Gradify road, and the Gradify AI button in the corner
assets/vendor/pdfjs pdf.js 3.11.174 (Apache 2.0) for reading PDFs in the browser
docs/AI-PIPELINE.md how the full Notes Studio will work on Gradify AI
assets/community.js Community: study group, weekly challenge, optional leaderboard
assets/study.js     Study: the flashcard feed, with spaced repetition, overview and exam mode
assets/nav.js       top bar search button, phone menu and the install-as-app button
assets/icons/       app icons (PNG) for installing the site
manifest.webmanifest + sw.js   make the site installable and let it open offline
assets/favicon.svg  icon
```

## Run it locally

ES modules don't load from `file://`, so serve the folder:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Add or change a site

Edit `assets/sites.js`. A site with no `u` (URL) shows as "Coming soon".

## Deploy

Live on GitHub Pages at https://getgradify.com, deployed from the `main` branch root. Every push to `main` goes live within a minute or so. The service worker fetches from the network first, so visitors get new versions straight away; if you add a new file to the site, also add it to the `SHELL` list in `sw.js` so it works offline. `CNAME` holds the custom domain, and `.nojekyll` tells Pages to serve the files as they are.

DNS is on Cloudflare: four `A` records for `getgradify.com` point at GitHub Pages, and `www` is a `CNAME` to `seren-aitchison.github.io`.

## Gradify LifeOS preview

The `#lifeos` section shows how Gradify LifeOS will work, using example data for one made-up learner that's generated in the browser. Nothing is saved. The learner, goals, deadlines, life areas, each site's learning path and the credentials are all in `assets/lifeos.js`; the knowledge map's modules, topics and evidence are in `assets/earth.js`. In the full version this data will come from each Gradify site's progress API.

## The Gradify app

`app.html` is the real product: choose a goal and subject, upload notes (PDF or text), get flashcards checked against your notes, revise them with spaced repetition, and see Today, Progress and Plan update from the same data.

```
app.html                 the app
assets/app/main.js       screens: setup, add notes, deck review, revision session, Today, Progress, Plan, Account
assets/app/store.js      where data lives: this browser (default) or a Gradify account (Supabase)
assets/app/engine.js     notes → study pack: Gradify AI on the server, or the browser extractor
assets/app/srs.js        spaced repetition
assets/app/config.js     Supabase URL and public key (empty = this-device mode)
supabase/migrations/     database schema with row-level security
supabase/functions/      study-pack: the Claude-powered Edge Function, and shared pack logic
tests/                   unit tests and note fixtures
scripts/eval-notes.mjs   quality report for study packs
docs/SETUP.md            switching on accounts and Gradify AI
```

```bash
npm test
```

```bash
npm run eval
```
