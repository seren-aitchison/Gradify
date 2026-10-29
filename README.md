# Gradify™

**Bring your notes into Gradify. Turn them into useful study materials. Learn, track your progress and know what to do next.**

The parent site for the Gradify family of learning sites. It links out to every Gradify site, plus TechGradify · ForgeLab and Klerio.

It's a plain static site with no build step: HTML, CSS and JavaScript modules.

Everything that Gradify's sub-sites share lives in **`kit/`, the Gradify Kit**: the study app, the notes pipeline, spaced repetition, the Mastery Engine, the 3D globe, the LifeOS components and the design system. This site uses the kit itself, so what's live here is what the sub-sites get. Every sub-site lives in its own folder here, at getgradify.com/<name>/ (for example getgradify.com/medgradify/), and uses the same `kit/`. Start one with `npm run new-site -- MedGradify`; see [kit/README.md](kit/README.md).

```
index.html             the homepage
app.html               the Gradify app (the real product)
gradify.config.js      this site's settings: which site it is, and the Supabase keys
assets/                homepage only
  styles.css           hero, directory, feature bubbles, the road, roadmap, FAQ, footer
  app.js               the directory: cards, search, filters, Notify me
  features.js          feature bubbles, the Gradify road, the Gradify AI button
  nav.js               top bar search, phone menu, install-as-app
  icons/, favicon.svg  app icons
kit/                   the Gradify Kit (shared with every sub-site)
supabase/              the shared backend: database migrations and the study-pack function
tests/                 unit tests and note fixtures
scripts/               quality report for study packs, and `npm run sync`
docs/                  SETUP.md (accounts and Gradify AI), AI-PIPELINE.md
manifest.webmanifest + sw.js   installable, and opens offline
```

## Run it locally

ES modules don't load from `file://`, so serve the folder:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Add or change a site

Edit `kit/core/sites.js`. A site with no `u` (URL) shows as "Coming soon".

## Deploy

Live on GitHub Pages at https://getgradify.com, deployed from the `main` branch root. Every push to `main` goes live within a minute or so. The service worker fetches from the network first, so visitors get new versions straight away; if you add a new file to the site, also add it to the `SHELL` list in `sw.js` so it works offline. `CNAME` holds the custom domain, and `.nojekyll` tells Pages to serve the files as they are.

DNS is on Cloudflare: four `A` records for `getgradify.com` point at GitHub Pages, and `www` is a `CNAME` to `seren-aitchison.github.io`.

## Gradify LifeOS preview

The `#lifeos` section shows how Gradify LifeOS will work, using example data for one made-up learner that's generated in the browser. Nothing is saved. The learner, goals, deadlines, life areas, each site's learning path and the credentials are all in `kit/lifeos/lifeos.js`; the knowledge map's modules, topics and evidence are in `kit/lifeos/earth.js`. In the full version this data will come from each Gradify site's progress API.

## The Gradify app

`app.html` is the real product: choose a goal and subject, upload notes (PDF or text), get flashcards checked against your notes, revise them with spaced repetition, and see Today, Progress and Plan update from the same data.

It's built from the kit: `kit/app/` (screens), `kit/data/` (where data lives), `kit/notes/` (notes → study pack), `kit/learning/` (spaced repetition and the Mastery Engine). The backend is in `supabase/`, and `docs/SETUP.md` explains how to switch on accounts and Gradify AI.

```bash
npm test
```

```bash
npm run eval
```

After editing `kit/notes/pack.js`, copy it into the Supabase function:

```bash
npm run sync
```
