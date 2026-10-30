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
| `models/` | The 3D model viewer (`viewer.js`) and one model per sub-site: the body, mouth, dog, brain, cell, engine, courtroom, solar system and more. Each has a full page of notes per section, flashcards, "in your notes" and a quiz | **Real.** Models are built in code, not scanned |
| `core/` | Icons, colour helpers, and the list of every Gradify site | **Real** |
| `styles/` | `base.css` (tokens, glass, buttons, top bar) and `components.css` (panels, rings, charts, switches and every LifeOS view) | **Real** |
| `lifeos/` | The LifeOS window: Today, time-blocking Plan, Progress, Earth, Path, Gradify AI, Learn, Study feed, Notes Studio, Community, Settings, and the Tree and Forest | **Preview.** Runs on Alex's example data. Wire each view to real data before you rely on it |
| `vendor/` | pdf.js 3.11.174 (reads PDFs in the browser), supabase-js 2.117.0, and three.js r169 with its post-processing and environment add-ons | Third-party |
| `templates/subsite/` | The homepage, app and LifeOS pages for a new sub-site, used by `npm run new-site` | |

The backend (database and the Gradify AI function) is not in the kit. Every site shares the one in the Gradify repository's `supabase/` folder, so one account works across the whole family.

## Start a new Gradify site

Every sub-site lives in its own folder on getgradify.com, in this repository: MedGradify is `getgradify.com/medgradify/`. They all use this one `kit/` folder, so a change to the kit reaches every site at once.

```bash
npm run new-site -- MedGradify
```

That makes `medgradify/` with:
- `index.html`: a starter homepage (the site's icon, name and description, in the Gradify look) to build the site out from
- `app.html`: the study app, branded as MedGradify

Add `--lifeos` to include `lifeos.html`, the LifeOS window. The script also marks the site `built: true` in `kit/core/sites.js`, so the directory on getgradify.com links to `getgradify.com/medgradify/` in the same tab instead of to the site's domain.

Push, and it's live a minute later. To try it first:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/medgradify/.

How the kit knows which site a page belongs to: each sub-site page has `<meta name="gradify-site" content="MedGradify">`, and failing that the kit works it out from the folder name. In the app that means:
- The top bar shows the site's own icon and name.
- Setup skips "Which Gradify site?".
- New notes are tagged with the site.
- The app only shows that site's notes, cards, answers and activity.
- "Delete my data" deletes only that site's notes.

Because every site is on getgradify.com, signing in once signs you in everywhere, and the same notes are there on every device. getgradify.com's own app belongs to no single site and sees everything: it's the LifeOS for the whole family.

Supabase needs one setting for this: in **Authentication → URL Configuration**, add `https://getgradify.com/**` to the redirect URLs, so sign-in links work from any sub-site. Gradify AI needs nothing extra, since every site is on the same domain.

A site's domain (for example gradifymed.com) can forward to its folder later; set that up in Cloudflare.

## Changing the kit

Edit it here. Everything in `kit/` is shared, so check a change on getgradify.com and on a sub-site before pushing, and bump `VERSION`.

The backend isn't in the kit: the database and the Gradify AI function are in `supabase/`. After editing `notes/pack.js`, run `npm run sync` to copy it into the function, then redeploy the function.

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

### 3D models

Every sub-site with an entry in `models/index.js` gets a page at `<site>/3d.html` (run `npm run add-3d` after adding one; it also adds the link to the site's navigation). A model is a module:

```js
export default {
  title: "The engine in 3D",
  groups: { mechanism: { name: "Crank mechanism", c: "#7ee0ff" } },          // show/hide chips and notes tabs
  structures: { piston: { group: "mechanism", name: "Piston", desc, facts: [3], cards: [[q, a] x3], keys: ["piston"] } },
  notes: { mechanism: { title, lead, sections: [["Heading", "Paragraph", "- bullet", "! callout", "> key point"]] } },
  camera: { pos, target, min, max }, views: { Front: [pos, target] },
  build(k) { k.add("piston", mesh); k.tick((t, dt, motion) => {}); },          // k has the geometry and material helpers
};
```

The viewer handles the rest: HD rendering (environment light, bump detail, bloom), zoom (scroll, pinch, +/−, double-click to fly in), picking, labels, pulling apart, the info panel, flashcards from a part or a whole section, the learner's own matching cards, and a find-the-part quiz. A model that moves its own parts sets `explode: false` or marks them `userData.moves`; `onPick(object, id)` reacts to clicks (the piano plays its keys). `tests/site.test.mjs` checks that every part has three facts and three cards and every section has notes.

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
