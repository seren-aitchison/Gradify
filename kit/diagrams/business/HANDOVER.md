# BusinessGradify visual learning: handover

State on 21 Nov 2026: 72 of the 178 lessons are assessed in `kit/diagrams/plans/business.mjs`; 68 diagrams are built, checked
and placed in 65 lessons (one, the adopter categories, sits in two), 2 lessons point at the existing `forecasting` lab, and 5
were assessed as better without a picture, each with its reason. Every other lesson shows as "not yet assessed" in
`docs/visual-learning/INVENTORY.md`; that is the remaining work, not a verdict.

## How it is built
- Renderers: `kit/diagrams/business-renderers.js` (found by `scripts/diagrams/build.mjs`) plus the shared `graph`.
  Business mathematics (NPV, payback, ARR, break-even, elasticity, critical path, the safe relation evaluator) is
  `kit/diagrams/business-core.js`, tested in `tests/business-diagrams.test.mjs`.
- Specs are written by `scripts/diagrams/business/uNN.py` with `mk(lessonId, id, renderer, …)`; the lesson title comes from
  `kit/courses/business/ids.js`. Run a unit file, then:

```bash
node scripts/diagrams/place.mjs bus-          # adds the D: lines
node scripts/diagrams/build.mjs bus-          # renders and checks; exits 1 on any failed check
node scripts/diagrams/legibility.cjs bus- /tmp/shots   # clipped or overprinted text, and PNGs to look at
node scripts/diagrams/coverage.mjs business
node -e 'import("./scripts/curriculum-registry.mjs").then(async m=>m.updateRegistry("business",(await import("./kit/courses/business/course.js")).default))'
node scripts/visual/inventory.mjs
```

## The renderers and what each recomputes
| renderer | use | checks |
| --- | --- | --- |
| `matrix` | Ansoff, Boston, SWOT, generic strategies, power–interest, payoff grids | each item's cell from its attributes or numbers; payoff grids: pure Nash equilibria, dominant strategies, "worse off than cooperating" |
| `layers` | Maslow, Carroll, Schein, process types | order and count against the lesson |
| `orgchart` | structures | one root, all reachable, levels, spans of control, tall or flat |
| `process` | chains and cycles (value chain, Tuckman, DMAIC, Kolb) | distinct steps, canonical order, cycles close |
| `bars` | columns, waterfalls, stacks: statements, NPV, payback, variances, ratios | waterfall subtotals; every `relations` entry (`expr` equals `equals`) evaluated on the drawn values |
| `network` | critical path | forward and backward pass, float, critical path, duration |
| `blocks` | canvases, PESTLE, 7Ps, scorecard | no overlap, grid covered, exactly the blocks the lesson names |
| `radial` | five forces | arms counted and distinct, no two on one side |

Every spec lists `terms`: words on the picture that must appear in the lesson, so a picture cannot drift from its text.
`graph` specs take their numbers from the lesson and name checks (`intersect`, `max`, `min`, `point`, `value`, `order`).

## Style
Matches the biology cell-cycle reference: soft tinted bands and fills, thin strokes in the same hue, bold curves, a small
grey label for each band, light axes. Wide layouts are about 700 px; narrow ones about 380 px (chains and blocks stack,
cycles gain a return line, org charts become an indented list).

## Next
1. Assess the remaining 106 lessons, a school at a time, from the lesson's worked example (the numbers are already there).
   Likely wins: u01 legal forms and growth, u02 Taylor/Fayol and Weber, u04 pricing and branding, u05 TQM and JIT,
   u06 reward and workforce planning, u07 liquidity and gearing ratios and budgeting, u08 inflation, interest rates,
   exchange rates and trade (graph), u10 e-commerce and ERP, u11 agency theory and governance.
2. Interactive versions only where manipulation teaches (break-even, NPV and EOQ sliders); none are built.
3. No subject reviewer has approved any of these; all are `validated`.
