# Mind maps: five per lesson (version 2)

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
  on every third unit of every subject on each run. A full run over the library (17 November 2026, engine `maps-2`)
  covered 34 subjects, 9,979 lessons, 49,895 maps and 649,131 nodes: 0 invalid maps, 0 lessons less than fully
  covered, and 0 nodes with words that aren't in their lesson.
- **Where a lesson has nothing for a map**, the map says so instead of filling the space. In the full run this
  applied to 596 process maps (6%), 514 concept maps (5%) and 339 application maps (3%).
- **Coverage.** Every tagged line of a lesson appears in at least one of its five maps (`coverage()`). The lesson page
  shows the percentage.
- **Shaped for memory.** These rules come from the mind map skills reviewed (see Sources below):
  - **Balanced branches.** A node with more than 9 children is split into parts of 7 ("Part 1 (1–7)"), so there's
    no wall of items. Siblings with the same title are merged.
  - **One icon per main branch** (📘 key terms, 🧭 sequence, ⚖️ cases, 🎯 be able to, ⚠️ mistakes and so on), so
    each branch is recognisable at a glance.
  - **Short titles.** A long line is cut at a clause break and the full sentence is kept as the node's detail.
- **Cross-links (at most 4 a map).** A dashed connector joins two branches where one node's own words name a term,
  concept, case, law or medicine in another branch (for example, a worked example that uses a term defined
  elsewhere). Nodes with the same name aren't linked, since they're the same idea. The detail panel says what the
  link is ("uses", "about", "tests"). The full run drew 23,629 links, in 14,112 of the 49,895 maps.
- **Gaps are shown, not hidden.** An objective that no part of the lesson answers gets a child node: "The notes don't
  cover this directly yet". `node scripts/map-gaps.mjs` lists all of them in `docs/reports/map-gaps.md`, by
  subject and lesson, to guide improving the lessons. The full run found 748 objectives in 691 lessons.
- **No AI and no storage.** Maps are built in the browser in about 10 ms a lesson, so there's no cost, no database table
  and no background job. The version is a hash of the engine and the notes (`maps-2.<hash>`), so editing a lesson's
  notes changes its maps. Each page builds a lesson's maps once (`mapsFor`).

Gradify AI could later enrich the maps (for example, linking ideas across lessons). Because the maps are built from
the notes, any such addition can be checked against the lesson the same way flashcards are.

## The viewer

Every fact sits in its own bubble at the end of its strand: the strands (`strand` in `kit/maps/view.js`, Mind
Elixir's `generateSubBranch`) run from the side of the idea above to the middle of each fact's bubble, and each bubble
is edged in its branch's colour. Each main branch carries a Liquid Glass icon from the lesson's own icon set
(`kit/core/glass-icons.js`), so a map, its lesson and its flashcards share one visual language; the 4K PNG and SVG
exports draw the icons too. Selecting a branch with steps, a formula, a comparison or a few children shows a glass
diagram of it in the detail panel (`kit/core/glass-diagrams.js`, see `docs/TOOLS.md`).

`kit/maps/view.js` and `kit/maps/maps.css` draw the five previews in the lesson and the full-screen viewer:

- **Map selector** to switch between the five maps
- **Zoom, fit and centre**, plus expand all and collapse to the main branches
- **Search**, which highlights matches, opens the branches they're in and lists each match with its path through
  the map ("Legal rules and other rules › Moral rules"). Click a match to jump to it.
- **A detail panel** for the selected node: its full text, what kind of idea it is, its cross-links, and **Focus on
  this branch** (shows only that branch until you choose "Show the whole map")
- **Keyboard:** → or Enter goes to a child, ← to the parent, ↑ and ↓ between siblings, Esc closes the menu, then
  presentation mode, then the viewer
- **Minimap** (on wider screens) with the visible area outlined. Click it to move there.
- **Outline view:** the same map as a nested list, for reading, screen readers and small screens
- **Presentation mode**
- Links like `#/lesson/<id>/map/3` open map 3 directly
- **Export menu:**
  - **4K image:** PNG at exactly **3840 × 2160**, drawn from the map's measured layout (cross-links included) onto a
    4K canvas using the page's own fonts, not a screenshot scaled up
  - **Vector:** SVG with real text
  - **Markdown outline** with Markmap front matter: it opens as a mind map in Markmap, and as an outline in Obsidian
    or any notes app
  - **OPML 2.0** for outliners and other mind map apps

Libraries, loaded only when a map opens, each with its licence in its folder:

- **Mind Elixir 6.0.2** (MIT, SSShooter) in `kit/vendor/mind-elixir`: the map engine
- **Liquid Glass Components 2.1.0** (MIT, jcm-developer) in `kit/vendor/liquid-glass`: tokens and the toolbar,
  segmented, search and surface snippets, plus `liquid-glass.js` for refraction (progressive). Glass is only on the
  controls, never on the map, as its own guidance says.

Markmap, dpawlikowski/liquid-glass and LiquidGlass-UI were reviewed, but they're not used. One map engine and one
glass system keep the code small.

## Sources for version 2

Fourteen open-source projects were reviewed. Code is reused only where the licence allows it and a licence file is
present. Everything else is ideas only: no code, text or assets were copied from those.

| Project | Licence | What Gradify took |
|---|---|---|
| SSShooter/mind-elixir-core | MIT | The map engine (vendored, unchanged), including its connectors and focus mode |
| SSShooter/mindmapcn | MIT | How to pass cross-links to Mind Elixir as arrows |
| 0x-man/mindmap-skill | MIT | Rules: balanced branches (at most 9 children), short keywords, an icon per main branch |
| galiacheng/mindmap-skills | MIT | Rules: a few cross-links only, mark gaps instead of filling them, Markmap Markdown |
| zazieproductions/void-oculus | MIT | The minimap with the visible area outlined ("fovea map") |
| Dicklesworthstone/mindmap-generator | No licence file | Idea: check every node against the source (Gradify already did; now also links and gaps) |
| GadatheGod/MindMap-Pro | No licence file | Idea: search results with their path, Markdown export |
| nibilin33/liquid-glass-ui | No licence file | Reviewed; Liquid Glass Components is kept as the one glass system |
| phase1geo/minder | GPL | Ideas: connections between nodes, focus, OPML export, arrow-key navigation |
| void-rs/void | GPL | Idea: keyboard-first navigation |
| siyuan-note/siyuan | AGPL | Idea: the same content as an outline and as a map |
| hoangv97/MindmapCopilot | No licence | Reviewed; it relies on an AI model, which the maps don't use |
| Khan30-ai/mindmap-ui | No licence | Reviewed; nothing needed |
| linus-sch/Mind-Map-Wizard | CC BY-NC | Reviewed; non-commercial licence, so nothing taken |

## Checking it

- `npm test` runs `tests/mindmaps.test.mjs`
- In a browser: `python3 -m http.server 8080 &` then `node scripts/check-mindmaps.cjs`. It covers law, chemistry and
  medicine lessons on desktop (dark and light) and a phone: all five maps, icons, cross-links, node details, arrow
  keys, focus, the minimap, the outline view, search with paths, the Markdown, OPML and SVG exports, the
  3840 × 2160 PNG with cross-links, no sideways scrolling and no page errors (195 checks).
- `node scripts/map-gaps.mjs` writes the list of objectives the notes don't answer yet.
