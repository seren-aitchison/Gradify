# Mind maps: five per lesson

Every lesson on every Gradify site has five interactive mind maps, made from the lesson's own notes. It's a shared
feature: every course page gets it through `kit/course/course.js`, so improvements reach every site at once.

| Map | What it shows |
|---|---|
| 1 The complete topic | Every section and its points, examples, formulas, key points and mistakes, plus the key terms |
| 2 Mechanisms and processes | Worked examples step by step, formulas and tests, sequences, cause and effect, how medicines work |
| 3 Key concepts and relationships | Definitions (by section), ideas explained, compare and contrast, what it builds on, principles |
| 4 Applications and examples | Worked examples, cases (facts, held, principle), legislation, medicines, examples in the text, safe practice, labs |
| 5 Exam mastery | Objectives with the points that answer them, must-knows, common mistakes, formulas, easily confused terms, test yourself |

## How the maps are made

`kit/maps/build.js` reads the lesson's tagged notes (`kit/course/notes.js`: `S`, `O`, `PRE`, `T`, `SUM`, `H`, bullets,
`P`, `E`, `X`, `K`, `!`, `CASE`, `LAW`, `DRUG`, `IX`, `Q`). Each node is built from one of those lines and keeps a
reference to it.

- **Nothing is invented.** Every node's title is the lesson's own words. The only exceptions are structure: group
  headings, a case or drug card's field labels, and "not in this lesson" notes. `tests/mindmaps.test.mjs` checks this
  on every third unit of every subject on each run. A full run over the library (17 November 2026) covered 9,979
  lessons, 49,895 maps and 648,626 nodes: 0 invalid maps, 0 lessons less than fully covered, and 0 nodes with words
  that aren't in their lesson.
- **Where a lesson has nothing for a map**, the map says so instead of filling the space. In the full run this
  applied to 596 process maps (6%), 514 concept maps (5%) and 339 application maps (3%).
- **Coverage.** Every tagged line of a lesson appears in at least one of its five maps (`coverage()`). The lesson page
  shows the percentage.
- **No AI and no storage.** Maps are built in the browser in about 4 ms a lesson, so there's no cost, no database table
  and no background job. The version is a hash of the engine and the notes (`maps-1.<hash>`), so editing a lesson's
  notes changes its maps. Each page builds a lesson's maps once (`mapsFor`).

Gradify AI could later enrich the maps (for example, linking ideas across lessons). Because the maps are built from
the notes, any such addition can be checked against the lesson the same way flashcards are.

## The viewer

`kit/maps/view.js` and `kit/maps/maps.css` draw the five previews in the lesson and the full-screen viewer:

- **Map selector** to switch between the five maps
- **Zoom, fit and centre**, plus expand all and collapse to the main branches
- **Search**, which highlights matches and opens the branches they're in
- **A detail panel** for the selected node: its full text and what kind of idea it is
- **Presentation mode**, and Esc to close
- Links like `#/lesson/<id>/map/3` open map 3 directly
- **Export:**
  - SVG, as true vectors with text
  - PNG at exactly **3840 × 2160**, drawn from the map's measured layout onto a 4K canvas using the page's own fonts,
    not a screenshot scaled up

Libraries, loaded only when a map opens, each with its licence in its folder:

- **Mind Elixir 6.0.2** (MIT, SSShooter) in `kit/vendor/mind-elixir`: the map engine
- **Liquid Glass Components 2.1.0** (MIT, jcm-developer) in `kit/vendor/liquid-glass`: tokens and the toolbar,
  segmented, search and surface snippets, plus `liquid-glass.js` for refraction (progressive). Glass is only on the
  controls, never on the map, as its own guidance says.

Markmap, dpawlikowski/liquid-glass and LiquidGlass-UI were reviewed, but they're not used. One map engine and one
glass system keep the code small.

## Checking it

- `npm test` runs `tests/mindmaps.test.mjs`
- In a browser: `python3 -m http.server 8080 &` then `node scripts/check-mindmaps.cjs`. It covers law, chemistry and
  medicine lessons on desktop (dark and light) and a phone: all five maps, node details, search, SVG export, the
  3840 × 2160 PNG, no sideways scrolling and no page errors.
