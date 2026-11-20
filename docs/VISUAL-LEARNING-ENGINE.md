# Gradify Visual Learning Engine

Checked, original teaching diagrams placed inside lessons. Built November 2026 as a 10-lesson pilot; **nothing is shown to learners until a named subject reviewer approves it.**

The principle: a rendered picture is not evidence of a correct one. Every diagram is generated from a structured specification, and the build recomputes the subject itself (the electron flow, the image through a lens, the equilibrium, the transformed point) and compares it with what the diagram and the lesson claim. A diagram that looks right but says something false fails and is not published.

## How it works

```
lesson notes (kit/courses/<course>/notes/uNN.js)
   │   D: chem-sn2-mechanism            ← places the diagram beside the text it explains
   ▼
spec (kit/diagrams/specs/<id>.json)     ← the claims: structures, arrows, forces, curves, captions, description
   │
   ▼  node scripts/diagrams/build.mjs
renderer ── chemistry: scripts/diagrams/chem.py (RDKit 2026.09 + custom curly-arrow SVG)
         └─ everything else: kit/diagrams/renderers.js (graph, energy-profile, free-body, rays, circuit, decision-tree)
   │
   ▼  subject checks + linkage checks
kit/diagrams/svg/<id>.wide.svg, <id>.narrow.svg, kit/diagrams/manifest.json (status, checks, review)
   │
   ▼  kit/diagrams/visual.js (called from kit/course/course.js)
lesson page: the diagram, its caption, "the diagram in words", full-size view; wide or narrow layout by the figure's width
```

No build step is added to the site itself: SVGs are prebuilt and committed, like the rest of the static site. Only authors need Python and RDKit (`pip install rdkit`).

## Publishing status

| Status | Meaning | Shown to learners? |
|---|---|---|
| `failed` | At least one check failed | Never |
| `validated` | Every automatic check passed | No (preview only) |
| `ai-reviewed` | Also checked by a separate AI reviewer | No (preview only) |
| `approved` | A named subject reviewer approved it (`review.status: "approved"`, `review.by`) | **Yes** |

Preview mode: add `?diagrams=preview` to a course URL (it is remembered; `?diagrams=off` clears it). Preview shows a banner with the status and a "What was checked" list.

## What the checks do

| Renderer | Checks |
|---|---|
| `mechanism` (chemistry) | Every species sanitises in RDKit (valence, charge). Atoms, hydrogens and total charge conserved between stages. **Curly arrows are executed**: each must start at a lone pair or bond that exists, and applying them to stage *i* must give exactly stage *i+1* (bond orders, formal charges, H counts on every atom-mapped atom); octet violations are reported. Stated R/S labels are compared with RDKit's CIP labeller. Transition states are drawn but not treated as species. |
| `energy-profile` | Each transition state is a maximum, each intermediate a minimum between two maxima, counts match, the highest barrier is the stated rate-determining step, ΔH has the stated sign. |
| `free-body` | Every force has a stated physical source; normal ⟂ slope; resolving the drawn forces reproduces the lesson's equation (N = mg cos θ + P sin θ) numerically. |
| `rays` | The drawn rays are intersected geometrically and must meet where 1/f = 1/u + 1/v puts the image; real/virtual, inverted/upright and magnification must match the label. |
| `circuit` | Loop law solved from the drawn cells and their polarity; current and the driving cell must match the worked example. |
| `graph` | Stated maxima, intersections, points and values are computed from the plotted functions (a whitelisted expression compiler, no `eval` of arbitrary text). |
| `decision-tree` | Every path ends in an outcome, no orphan nodes, and every authority cited on the diagram appears in the lesson text. |
| all | The lesson exists and places the diagram (`D:` line); alt text, caption and a step-by-step description exist. |

Tested negatively: reversing an SN2 curly arrow or claiming the wrong R/S label fails the build with a specific message.

## Design language

- **One idea per diagram**, with a caption that says what to notice, not what the picture is.
- **Two layouts**: `wide` (≈ 640–880 px, for the lesson column) and `narrow` (≈ 380–400 px, panels stacked) so text is drawn at roughly its displayed size on a phone. The figure picks one with a container query.
- **Colour has meaning and is consistent across subjects**: ink for structure, `--vx-e` (pink) for electron movement, one colour per force type, indigo for the original or primary curve, pink for the changed one, orange for construction rays, teal for optics and secondary elements; green/red/orange only for yes/no/caution outcomes. All are CSS custom properties defined for light and dark themes in `kit/styles/components.css` (`.vx`); SVGs carry fallbacks so they render on their own.
- **Typography**: inherits the site font; labels 12.5–15 px at drawn size; sub- and superscripts as in the notes (`x_{0}`, `x^{2}`).
- **Accessibility**: `role="img"` with alt text; a full step-by-step description under every diagram ("The diagram in words"); full-size dialog with pinch-zoom; meaning never carried by colour alone (labels on every force, curve and outcome).

## Adding a diagram

1. Write `kit/diagrams/specs/<subject>-<topic>.json` (copy the nearest pilot spec). Put the lesson's own numbers in it so the checks test the lesson.
2. Add `D: <id>` to the lesson, directly after the block it explains.
3. `node scripts/diagrams/build.mjs <id>` until every check passes, then `node scripts/diagrams/shoot.cjs` and look at the desktop and phone screenshots.
4. Review (separate person or AI reviewer), record it in the spec's `review`, rebuild. Only `approved` with a named reviewer goes live.

## Figma

Not connected in the build session, so not tested. Recommended role: art direction and the reusable design language (this file's tokens as a Figma library, illustration style for anatomy, apparatus and cells), and design review of rendered SVGs. Not the rendering engine: technical diagrams must stay deterministic, checkable and editable as code in this repository.

## Scaling

The renderer types cover the commonest technical diagrams. Next renderers by expected value: biology process and structure diagrams (labelled cells, organs, pathways; these need a curated, reviewed vector illustration library, which is where Figma helps most), physics field lines and waves, statistics distributions, timelines and maps for history and geography. Generate specs with Claude from the lesson text, but always through the checks and a human approval for high-risk subjects (chemistry mechanisms, clinical content, law).
