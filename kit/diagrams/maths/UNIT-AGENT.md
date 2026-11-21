# Maths unit agent: recipe (unit NN)

Read first: `kit/diagrams/BUILDERS.md`, the worked example `kit/diagrams/plans/maths/u01.mjs` + `scripts/diagrams/maths/u01.mjs`.

**You may touch only:** `kit/diagrams/plans/maths/uNN.mjs`, `scripts/diagrams/maths/uNN.mjs`, `kit/diagrams/specs/maths-uNN-*.json`,
`kit/diagrams/svg/maths-uNN-*`, `kit/courses/maths/notes/uNN.js` (D: lines only), `kit/courses/maths/registry.js` (regenerated),
`kit/diagrams/manifest.json` (regenerated, your entries only). Never edit renderers, `renderers.js`, `build.mjs`, `coverage.mjs`, styles.
If a lesson needs a renderer that does not exist: plan `["uNN-MM", null, "needs renderer X: …"]` and report it.

**Plan:** one row per lesson in `ids.js` (`[id, renderer, "maths-uNN-slug", "what it shows"]`, `[id, "lab", labId, "…"]` for a lab
in `kit/courses/maths/interactives.js`, or `[id, null, "reason"]`). Draw the lesson's own worked example (its X: lines);
no decorative diagrams.

**Specs:** `mk(lessonId, "maths-uNN-slug", renderer, title, caption, alt, [steps], body)` from `scripts/diagrams/maths/spec.mjs`.
Compute every number once in the batch file. Put the lesson's own phrases in `fromLesson: [...]` (checked against the notes).

| renderer | one-line spec body (see the header comment of the renderer for all fields) |
| --- | --- |
| number-line | `{range:[-10,6], ticks:{step:2}, points:[{value:3/11, expr:"3/11", label:"3/11"}], jumps:{from:-5, steps:[{by:9}], to:4}, intervals:[{from:-2,to:3,closed:[false,true],inequality:"-2 < x <= 3"}]}` |
| sequence | `{terms:[17,13,9,5], rule:{kind:"nth", expr:"21-4*n"}, show:"differences", pattern?:"triangle", checks:[{type:"nth",n:30,value:-99}]}` |
| factor-tree | `{tree:{n:60, children:[{n:6,children:[{n:2},{n:3}]},{n:10,children:[{n:2},{n:5}]}]}, result:"2^2 × 3 × 5"}` |
| bar-model | `{bars:[{label:"3/4", cells:4, shaded:3}], checks:[{type:"fraction",bar:0,value:"3/4"}]}` or parts `{prefix:"£", bars:[{parts:[{value:16},{value:24}]}], braces:[{bar:0,from:0,to:1,value:40}], checks:[{type:"ratio",bar:0,ratio:[2,3],total:40}]}` |
| venn | `{sets:[{name:"A",label:"Maths"},{name:"B"}], regions:{A:5,AB:3,B:4,"":2}, universe:{n:14}, checks:[{type:"prob",event:"A",given:"B",p:"3/7"}]}`; items/product for HCF; `nested` for ℕ⊂ℤ⊂ℚ⊂ℝ |
| prob-tree | `{tree:{children:[{label:"R",p:"3/7",children:[…]},{label:"B",p:"4/7",children:[…]}]}, outcomes:true, checks:[{type:"outcome",path:["R","B"],p:"2/7"}]}` |
| geometry (also vectors, with `grid:{step:1,axes:true}`; the renderer named `vectors` is physics') | `{points:{O:[0,0],A:[3,4]}, circles:[{centre:"O",r:5}], angles:[{at:"O",from:"T",to:"A",deg:53.13}], lengths:[{a:"O",b:"A",value:5}], vectors:[{name:"a",from:[0,0],v:[3,1]}], checks:[{type:"tangent",circle:0,at:"T",through:"P"}]}` |
| transform | `{view:{x:[-6,6],y:[-6,6]}, object:{name:"A",pts:[[1,1],[3,1],[1,2]]}, images:[{name:"B",t:{kind:"rotate",centre:[0,0],deg:90},pts:[[-1,1],[-1,3],[-2,1]]}]}` |
| histogram | `{classes:[[0,10],[10,15]], freq:[20,30], density:[2,6], range:{x:[0,15],y:[0,7]}, ticks:[[0,10,15],[2,4,6]], axisLabels:["t","frequency density"]}` |
| boxplot | `{method:"halves", range:{x:[0,20]}, ticks:[0,5,10,15,20], plots:[{label:"A", data:[…], summary:[min,q1,med,q3,max]}]}` |
| scatter | `{points:[[1,3],…], line:{a:1.1,b:1.96}, r:0.998, range:{x:[0,5],y:[0,10]}, ticks:[…], axisLabels:[…]}` |
| barchart | `{categories:[0,1,2,3], values:[4,7,6,3], range:{y:[0,8]}, ticks:[2,4,6,8], checks:[{type:"mean",value:1.4}]}` |
| distribution | `{dist:{dist:"normal",mu:100,sigma:15}, range:{x:[40,160],y:[0,0.03]}, ticks:[…], shade:[85,115], p:0.6827}` (also binomial, poisson, geometric, uniform, exponential) |
| graph (shared) | curves from expressions with point/max/min/slope/area checks: see `kit/diagrams/specs/maths-transformations.json` |

**Build and check** (NEVER a full build: RDKit is not installed and chemistry would be marked failed):
```
node scripts/diagrams/maths/uNN.mjs                 # write specs
node scripts/diagrams/maths/place.mjs maths-uNN     # D: lines after each lesson's worked example
node scripts/diagrams/build.mjs maths-uNN           # every check ✓ (fix the spec, never the check)
node scripts/diagrams/maths/registry.mjs            # lesson versions
node scripts/diagrams/coverage.mjs maths            # 0 planned but not placed, 0 failing
```
Look at both layouts of every diagram (render the SVGs, or a lesson page with `?diagrams=preview#/lesson/uNN-MM`).

**Git:** commit; `git fetch origin main && git rebase origin/main`; on a conflict in `kit/diagrams/manifest.json` or a
`registry.js` take origin's (`git checkout --theirs <file>` during rebase), rerun your build and the registry script,
`git add`, `git rebase --continue`; full `npm test`; `git diff origin/main --stat` shows only your files; `git push origin HEAD:main`
(refetch and rebase on rejection). Commit messages end with the session's Co-Authored-By / Claude-Session trailers.
Update `kit/diagrams/maths/HANDOVER.md` in the same commit.
