# Tools, glass diagrams and Free allowances

## Tools (app.html#/tools)

Four apps inside Gradify's app, for making study material of your own. Everything made in Tools stays in the browser
it was made in (`kit/tools/store.js`: decks and maps in localStorage, images in IndexedDB). No AI, nothing sent anywhere.

| Tool | What it does | Code |
|---|---|---|
| Lesson search | Finds any lesson on Gradify (9,979 lessons in 34 subjects) by its title, module, unit, key terms and headings. Opening a result reads that lesson's notes and lists its facts with switches, to send to a mind map or flashcards | `kit/tools/search.js`, `kit/api/v1/lessons.json` |
| Mind map creator | Facts toggled on from any lesson join the map under their lesson and section; toggled off, they go (and an emptied lesson goes with them). The map is fully editable: rename, add, move, delete. Exports a 4K PNG, SVG or Markdown | `kit/tools/mapmaker.js` |
| Flashcard creator | RemNote-style cards typed among your notes (below), images (button, paste or drop), suggested cards for plain notes, and FSRS spaced repetition. Review as a rectangular card that flips, or inline: the notes with each answer hidden in place | `kit/tools/cards.js`, `kit/tools/cardmaker.js` |
| Notes converter | Notes in any format (typed, pasted, .txt, .md, PDF, or facts from lessons) into a mind map, flashcards, a chant read aloud on a beat, and a cheatsheet of Liquid Glass tiles with diagrams | `kit/tools/convert.js`, `kit/tools/converter.js` |

The search index is built with the content API: `node scripts/build-api.mjs` writes `kit/api/v1/lessons.json` (about
490 KB compressed, loaded only when the search opens). CI checks it's up to date.

### Card syntax

| Write | Makes |
|---|---|
| `Front >> Back` | a card |
| `Back << Front` | a card the other way |
| `Front <> Back` | two cards, one each way |
| `Term :: Definition` | a concept: two cards, one each way |
| `The {{nucleus}} holds the {{DNA}}.` | a cloze card for each gap (`{{c1::…}}` works too) |
| `Question >>>` then indented lines | a multi-line card |
| `![label](img:…)` | an image (added with the Add image button, or pasted) |

**Photo of notes (Gradify Pro):** up to 5 photos of notes, handwriting included, are read by Gradify AI and become
cards in the deck, to check against the photo. Coming with Gradify Pro: see `docs/BILLING.md`.

A card's id comes from its own text, so editing other lines never resets its schedule. Select words and press Cloze
(or Ctrl+Shift+C) to hide them. Suggest cards turns plain lines ("Diffusion: the net movement…", "Enzymes are…") into
cards, using the same browser extractor as Notes Studio (`kit/notes/studio.js`).

### The chant

A verse for each topic (a term and a few words that pin it down; the first term said twice), a first-letter mnemonic
hook after each verse, and a chorus. Read aloud by the device's own voice (Web Speech), each line on the beat of a
soft click track (Web Audio), in three styles: Chant, Sing-song (the pitch rises and falls line by line) and Calm. The
voice is whatever the device offers, so it varies between devices.

## Glass diagrams (kit/core/glass-diagrams.js)

The 3D glass icons' bigger siblings: the same tilted colour tile, frosted glass, rainbow edge, glow and slow float, with
a diagram from the lesson's own notes on the glass instead of a symbol.

| Diagram | Drawn from |
|---|---|
| Process | a worked example's steps (`X:` with `>` steps) |
| Formula | a formula and what it is (`E:`) |
| Structure | a section's 3 to 6 points around its heading |
| Cycle | the same, round a circle, for a section about a cycle or feedback loop |
| Timeline | 3 or more dated points |
| Compare | two key terms that share a word ("Homogeneous mixture", "Heterogeneous mixture") |

A lesson shows up to four, each placed right after the part it shows. A mind map's detail panel shows one for the
selected branch, a lesson's flashcard shows the one its words match on the back, and the converter's cheatsheet
tiles have one each. Every label is the lesson's own words, shortened (tested in `tests/tools.test.mjs`).

## Free allowances

See `docs/BILLING.md` ("Free allowances"). In short: 10 lessons in each course, 5 flashcard sets, 5 mind maps and
5 uses of each tool, applied once Plus is on sale; `?limits=preview` shows them now.

## Checking it

- `npm test` runs `tests/tools.test.mjs` (card syntax, suggestions, the converter, the search, the allowances,
  diagrams)
- In a browser: `python3 -m http.server 8080 &` then `node scripts/check-tools.cjs` (every tool, a phone layout, a
  lesson's diagrams and icons, and the allowances with the banner), and `node scripts/check-mindmaps.cjs`
