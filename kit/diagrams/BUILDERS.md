# Subject diagram builders

How a subject joins the Gradify Visual Learning Engine. Chemistry (`chem-renderers*.js`, `plans/chemistry.mjs`) is the
worked example; read `docs/VISUAL-LEARNING-ENGINE.md` first.

## What a builder owns

| File | Purpose |
| --- | --- |
| `kit/diagrams/<subj>-renderers.js` | the subject's renderers. Import `register` and drawing helpers from `./renderers.js` and call `register({ name: { draw, checks, widths: [wide, narrow] } })`. `scripts/diagrams/build.mjs` imports every `*-renderers*.js` file itself. |
| `kit/diagrams/plans/<course>.mjs` | `export const NAME` and `export const PLAN`: one row per written lesson (see below). Every written lesson gets a row, including the ones that should have no visual. |
| `kit/diagrams/specs/<prefix>-*.json` | one spec per diagram (`id`, `renderer`, `course`, `unit`, `lesson` title, `title`, `caption`, `alt`, `description` [steps], and the renderer's data). Prefixes: `phys-`, `maths-`, `bio-`, `chem-`, … |
| `kit/diagrams/svg/<prefix>-*` | built output, committed |
| `kit/courses/<course>/notes/uNN.js` | the `D: <id>` line that places a diagram, on its own line where the diagram helps (after the paragraph it illustrates) |
| `tests/<subj>-diagrams.test.mjs` | tests of the subject logic the checks rely on |

Shared files (`renderers.js`, `visual.js`, `build.mjs`, `coverage.mjs`, styles) belong to the lead architect. A builder
that needs a shared change says what and why instead of editing them. `kit/diagrams/manifest.json` is written by the
build; after integrating several builders the lead rebuilds it.

## Plan rows

```js
[lessonId, renderer, diagramId, "what it shows"]   // a diagram
[lessonId, "lab", labId, "what it lets you do"]      // an existing interactive in kit/courses/<course>/interactives.js
[lessonId, null, "reason"]                           // no visual, and why
```

A lesson may have several rows. Do not plan a diagram that only decorates: the reason for leaving a lesson without
one is recorded instead. `node scripts/diagrams/coverage.mjs <course>` reports the plan against what is built and
placed; it exits 1 while anything planned is missing.

## The bar every diagram meets

- Subject checks that recompute what the picture claims (values from formulae, units, directions, counts, sums), so a
  wrong diagram fails the build. A renderer with no checks fails on its own.
- A wide layout (shown in the 707 px lesson column, at most 960 wide) and a narrow one (about 380 wide) for phones.
  Labels stay inside the picture and clear of each other and of lines (`text(…)` is in `renderers.js`).
- Caption (what to notice), alt text and a step-by-step description.
- No ownership mark in the SVG: the card adds it.
- Checked by rendering: every `<text>` inside the viewBox and not overprinting another, at both widths, and looked at.

## Placing diagrams changes lessons

After adding `D:` lines, update the course registry (`updateRegistry` in `scripts/curriculum-registry.mjs`; see that
file) so lesson versions stay consistent, and run `npm test`.
