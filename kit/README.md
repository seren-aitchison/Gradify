# Gradify Kit

Everything the Gradify sites share: the study app, the notes pipeline, spaced repetition, the Mastery Engine, the 3D globe, the LifeOS components and the design system. getgradify.com runs on this kit too, so what's live there is exactly what a sub-site gets.

Plain ES modules and CSS. No build step, no framework, no npm install.

Version: see `VERSION`.

## What's in it, and what's real

| Folder | What it is | Status |
|---|---|---|
| `app/` | The study app: setup, add notes, deck, study session, Today, Topic, Progress, Plan, Account | **Real.** Saves to the browser, or to a Gradify account once Supabase is switched on |
| `notes/` | Notes → study pack. Gradify AI (Claude, on the server) or the browser extractor. Recall cards, Explain and Apply questions, each checked against the notes | **Real** |
| `notes/studio.js` + `notes/video3d.js` | Notes Studio: clean notes, flashcards, mind map, cheat-sheet poster, a 3D animated video (Blender-style viewport, dope sheet and settings, renders to .webm), a chant and an audio quiz | **Real**, runs in the browser |
| `learning/` | Spaced repetition (`srs.js`) and the Mastery Engine (`mastery.js`) | **Real**, unit-tested |
| `data/` | Where a learner's data lives: `LocalStore` (this browser), `CloudStore` (Supabase), `scopeToSite` (one site's view of the shared account) | **Real** |
| `earth/` | The 3D dot globe: drag to turn, pins, arcs, portals, glowing city markers | **Real component.** You give it the scene |
| `core/` | Icons, colour helpers, and the list of every Gradify site | **Real** |
| `styles/` | `base.css` (tokens, glass, buttons, top bar) and `components.css` (panels, rings, charts, switches and every LifeOS view) | **Real** |
| `lifeos/` | The LifeOS window: Today, time-blocking Plan, Progress, Earth, Path, Gradify AI, Learn, Study feed, Notes Studio, Community, Settings, and the Tree and Forest | **Preview.** Runs on Alex's example data. Wire each view to real data before you rely on it |
| `vendor/` | pdf.js 3.11.174 (reads PDFs in the browser) and supabase-js 2.117.0 | Third-party |
| `templates/` | `app.html`, `lifeos.html` and `gradify.config.js`, to copy to a new site | |

The backend (database and the Gradify AI function) is not in the kit. Every site shares the one in the Gradify repository's `supabase/` folder, so one account works across the whole family.

## Start a new Gradify site

1. Make the site's repository, then add the kit as a subtree at its root. This copies the kit in and remembers where it came from, so you can update it later:

   ```bash
   git subtree add --prefix kit https://github.com/seren-aitchison/gradify-kit.git main --squash
   ```

   Then copy the templates into the site's root:
   - `kit/templates/app.html` → `app.html`
   - `kit/templates/gradify.config.js` → `gradify.config.js`
   - optionally `kit/templates/lifeos.html` → `lifeos.html`

   The kit expects to sit at the site's root, in a folder called `kit/`, with `gradify.config.js` next to it.

2. In `gradify.config.js`, set `SITE` to the site's name exactly as it is in `kit/core/sites.js` (for example `"MedGradify"`), and fill in the same `SUPABASE_URL` and `SUPABASE_ANON_KEY` as getgradify.com.

3. Build the site's own homepage however you like. Load `kit/styles/base.css` (and `components.css` if you use panels or LifeOS pieces) to match the Gradify look, and link to `app.html`.

4. Serve it locally to check:

   ```bash
   python3 -m http.server 8080
   ```

5. Before going live, in the Gradify repository:
   - add the site's URL (`u`) to its line in `kit/core/sites.js`, so the directory links to it
   - in Supabase, **Authentication → URL Configuration**, add `https://yoursite.com/app.html` to the redirect URLs
   - add the domain to the function's allowed origins:

     ```bash
     supabase secrets set GRADIFY_ALLOWED_ORIGINS=https://getgradify.com,https://medgradify.com
     ```

What `SITE` changes in the app:
- The top bar shows the site's own icon and name.
- Setup skips "Which Gradify site?".
- New notes are tagged with the site.
- The app only shows that site's notes, cards, answers and activity.
- "Delete my data" deletes only that site's notes.
- getgradify.com leaves `SITE` empty and sees everything: it's the LifeOS for the whole family.

## Keep it up to date

The kit lives in its own repository, https://github.com/seren-aitchison/gradify-kit. Every Gradify site, getgradify.com included, has a copy in its `kit/` folder.

Get the latest kit into a site:

```bash
git subtree pull --prefix kit https://github.com/seren-aitchison/gradify-kit.git main --squash
```

Changed the kit while working on a site? Send the change back to the kit repository, then pull it into the other sites:

```bash
git subtree push --prefix kit https://github.com/seren-aitchison/gradify-kit.git main
```

A site's `gradify.config.js` and pages aren't inside `kit/`, so updates never touch them. Bump `VERSION` when you change the kit, so you can tell which sites are behind.

The backend isn't in the kit: the database and the Gradify AI function live in the Gradify repository's `supabase/` folder. After editing `notes/pack.js`, run `npm run sync` there to copy it into the function, then redeploy the function.

## Using the pieces on their own

Everything below runs in the browser. `learning/` and `notes/pack.js` also run in Node.

### Spaced repetition and the Mastery Engine

```js
import { schedule, isDue } from "./kit/learning/srs.js";
import { topicProfiles, practiceOrder } from "./kit/learning/mastery.js";

const next = schedule(card, "good");          // { reps, ease, interval_days, due_at, ... }
const topics = topicProfiles(cards, reviews, { examDate: "2026-12-01" });
// most urgent first: { topic, level, mastery, dims: { recall, explain, apply, confidence, retention },
//                      misconceptions, next: { kind, label, why, mins } }
const order = practiceOrder(cardsInTopic, topics[0]);
```

Cards carry `topic`, `kind` (`definition`, `cloze`, `reverse` count as recall; `why` as explanation; `apply` as application) and the spaced-repetition fields. Reviews are `{ card_id, rating, confidence?, reviewed_at }`.

### Notes → study pack

```js
import { generate } from "./kit/notes/engine.js";
import { readFile } from "./kit/notes/studio.js";

const text = await readFile(file);   // the text of a PDF (first 40 pages), .txt or .md
const { engine, pack, cards, stats } = await generate({ text, title, site: "MedGradify", level: "undergraduate", store });
// for scanned PDFs, also pass pdfBase64 (the file, base64-encoded): Gradify AI reads the pages
```

With a signed-in `CloudStore`, Claude writes the pack on the server. Otherwise the browser extractor does. Every card has `grounded`: `yes`, `partly`, `no` (couldn't be matched to the notes) or `bonus`.

### The globe

```js
import { createGlobe, vec } from "./kit/earth/globe.js";

const globe = createGlobe(canvas, { onPick: (id) => {}, onHover: (id) => {} });
globe.setScene({
  regions: [{ v: vec(-14, -58), radius: 0.3, rgb: [229, 33, 83], light: 0.7 }],     // coloured glow on the land
  pins: [{ id: "cycle", v: vec(-10, -60), c: "#e52153", name: "The cardiac cycle", state: "fading", strength: 60 }],
  roads: [{ a: vec(-10, -60), b: vec(-5, -50), weak: false }],                       // arcs between pins
  portals: [{ v: vec(-10, -60), dir: [0.3, -0.45, 0.15], c: "#ff5a4d", site: "ForgeLab" }],
  hubs: [{ id: "hub:London", name: "London", v: vec(51.5, -0.1) }],                  // glowing city markers
  selected: "cycle", rings: true,
});
globe.faceTo(vec(-10, -60));   // turn to a point; also zoomBy(f), reset()
```

Pin states: `mastered`, `recent`, `fading`, `learning`, `new`, `locked`. `kit/lifeos/earth.js` shows a full example.

### Data

```js
import { LocalStore, CloudStore, scopeToSite } from "./kit/data/store.js";
const store = scopeToSite((await CloudStore.create()) ?? new LocalStore(), "MedGradify");
```

Both stores have the same async methods: documents, packs, cards, reviews, activity, plan blocks, profile, export and delete.

### Icons and colours

```js
import { icon } from "./kit/core/icons.js";      // icon("stethoscope") → inline SVG
import { tile, ink } from "./kit/core/colour.js"; // a site's colour as a glossy tile, and readable text on it
```

## Known limits

- The learner's profile (goal, exam date, daily study time) is shared by every site on one account. Per-site profiles come later.
- The LifeOS views run on example data. The real app (`app/`) has its own Today, Progress and Plan built on real data. Merging the two is the next step.
- XP is written by the browser, so a determined learner can inflate their own. Move it server-side before any leaderboard launches.
