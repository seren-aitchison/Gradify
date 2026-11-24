# Physics unit agent recipe (one unit, uNN)

Read first: `kit/diagrams/BUILDERS.md` (the bar), `scripts/diagrams/physics/u01.mjs` (worked example), `kit/diagrams/plans/physics/u01.mjs`.

**You create or edit only:** `kit/diagrams/plans/physics/uNN.mjs`, `scripts/diagrams/physics/uNN.mjs`, `kit/diagrams/specs/phys-uNN-*.json`,
`kit/diagrams/svg/phys-uNN-*`, `kit/courses/physics/notes/uNN.js` (D: lines only), and your entries in `kit/diagrams/manifest.json`
(written by the build). Never edit renderers, build/coverage scripts, other units' files. Need a renderer that does not exist?
Plan the row as `["uNN-MM", null, "needs renderer X: what it would draw and check"]` and report it.

## Steps
1. `node scripts/diagrams/physics/spec.mjs uNN` lists lessons, sections, worked examples, labs, placed diagrams.
2. Plan every lesson in `plans/physics/uNN.mjs`: `[id, renderer, "phys-uNN-slug", "what it shows"]`, `[id, "lab", labId, "…"]`
   for an interactive listed for that lesson, or `[id, null, "reason"]`. Diagram only where it teaches; no decoration.
3. Write `scripts/diagrams/physics/uNN.mjs` with `mk(lessonId, id, renderer, {title, caption, alt, description: [steps], …data})`.
   Use the lesson's own numbers, symbols and words; compute every number once and reuse it in caption, description and claims.
   The renderer's unit of measurement is `units` (`unit` is the course unit, set by mk). Run `node scripts/diagrams/physics/uNN.mjs`.
4. Place: add `D: phys-uNN-slug` on its own line right after the paragraph or worked example (`>` lines) it illustrates.
5. `node scripts/diagrams/build.mjs phys-uNN` (all ✓; never run a full build: no RDKit here), then
   `node scripts/diagrams/physics/check-svg.cjs phys-uNN /tmp/uNN` (labels inside and not overlapping) and LOOK at a few PNGs,
   wide and narrow. `node scripts/diagrams/coverage.mjs physics` must show none of your lessons missing or failing.

## Renderers (checks recompute the physics; see the comment at the top of each renderer file and tests/fixtures/phys-samples.mjs)
- `vectors` add/body/resolve: `{mode:"add", units:"N", vectors:[{label, mag, angle, comps?, source?, text?}], resultant:{label, mag, angle}}`
- `motion` x/v/a–t: `{u:0, segments:[{dt:4, a:2}], show:["x","v"], claims:[{type:"v", t:4, value:8}, {type:"displacement", from:0, to:4, value:16}]}`
- `wave` `{kind:"snapshot"|"superposition"|"standing"|"longitudinal", …, claims:{speed|amplitude|interference|harmonics:[{n, nodes, lambda, f}]|compressions}}`
- `sankey` `{units:"J", input:{label, value}, outputs:[{label, value, useful}], efficiency:0.2}`
- `fit` `{points:[[x, y, ey]], axisLabels, fit:{m, c, munc?, withinErrors?}, showWorst, residuals}`
- `field` `{kind:"electric"|"gravitational"|"magnetic", range:{x,y}, charges:[{x,y,q,label}] | wires:[{x,y,I}] | uniform:{V,d,plus}, equipotentials:true, claims:[{type:"null"|"direction"|"E"|"V"|"uniform", at, …}]}`
- `transitions` `{atom:"H", levels:[{n, E}], transitions:[{from, to, lambda, E, kind, region}], spectrum:true, scale:"sqrt"}`
- `scale` log scale `{quantity, units, min, max, markers:[{label, value, region?}], regions:[{label, from, to}], kind:"em"|"prefix", claims:[{type:"span"}]}`
- `nuclear` `{mode:"chain", start:{sym,A,Z}, steps:[{decay:"alpha", to:{…}}], counts}` or `{mode:"reaction", lhs, rhs, Q}`
- `refraction` `{panels:[{n1, n2, i, media, expect:{r, critical, tir}}]}`
- existing: `graph` (curves from expressions; checks point/max/slope/area), `free-body` (block on a slope), `rays` (thin lens),
  `circuit` (one loop), `energy-profile`, `decision-tree`.

## Git routine (push tested work straight to main)
Commit your unit (plan, batch file, specs, SVGs, notes, manifest; not `HANDOVER.md`, which your lead updates from your report) with the commit trailers
your lead gives you, then run `scripts/diagrams/land-unit.sh physics uNN` in the foreground and wait (it queues behind other agents).
It rebases, rebuilds your unit, regenerates the visual learning inventory (CI fails without it), checks scope, runs the full CI gate
and pushes to main, printing `LANDED <sha>` or `LAND FAILED: <reason>`. Land after every unit.

Report: lessons assessed / with a diagram / lab / none (reasons), renderers you needed but lacked, commit SHA.
