# Biology unit agent recipe

You fill one unit NN of SciGradify Biology with diagrams. Unit 1 is the worked example: copy its shape.

**You may touch only:** `kit/diagrams/plans/biology/uNN.mjs`, `scripts/diagrams/biology/uNN.mjs`, `kit/diagrams/specs/bio-uNN-*.json`
(written by the script), `kit/diagrams/svg/bio-uNN-*` and the manifest entries (written by the build),
`kit/courses/biology/notes/uNN.js` (D: lines only), `kit/courses/biology/registry.js` (regenerated), and
`kit/diagrams/biology/HANDOVER.md`. Never edit renderers, `renderers.js`, `visual.js`, `build.mjs`, `coverage.mjs`, styles.
**Missing renderer or template?** Plan `[id, null, "needs renderer X: what it would show"]` and report it. Do not build it.

## 1. Plan every lesson (`plans/biology/uNN.mjs`)
Read each lesson (`## Title` blocks in `notes/uNN.js`, ids in `ids.js`). One row per lesson, more if useful:
`[id, renderer, "bio-uNN-slug", "what it shows"]`, `[id, "lab", labId, "…"]` (labs: `interactives.js`), `[id, null, "reason"]`.
Only draw what teaches: a structure, a process, a quantity. Labels and examples come from the lesson's own words.

## 2. Renderers (spec fields; see `scripts/diagrams/biology/u01.mjs` and `tests/fixtures/bio-specs.mjs`)
- `bio-levels` ranked hierarchy: `scale:"organisation"|"taxonomy", levels:[{name, example}], ends:[top, bottom]`
- `bio-structure` labelled schematic: `structure:"animal-cell"|"plant-cell"|"bacterial-cell"|"mitochondrion"|"chloroplast"|"membrane"|"neurone"|"leaf"|"virus", labels:["nucleus", {part, text}]`
- `bio-scale` log size ruler: `items:[{name, from, to | size, unit}], magnification:{image:[15,"mm"], actual:[1.5,"µm"], M:10000}` (names from `SIZES`)
- `bio-phylo` cladogram: `tree:["Bacteria",["Archaea","Eukarya"]], clades:[[…]], closer:[[a,b,c]], root`
- `bio-water` osmosis: `compartments:[{name, psiS, psiP, cell, result} | {name, conc, result}], flows:[[from,to]], unit`
- `bio-pyramid`: `kind:"energy"|"biomass"|"numbers", unit, levels:[{name, value}] (bottom first), efficiencies:[%]`
- `bio-punnett`: `parents:["Aa","Aa"] | ["XHXh","XHY"] | [[["IA","i"]],…], phenotypes:{AA:"…"} | [per gene], dominance, ratio:{genotypes, phenotypes}`
- `bio-pedigree`: `people:[{id, sex, affected, carrier, parents}] (parents first, partners adjacent), mode, consistent:[modes], genotypes:{id:"Aa"}`
- `bio-sequence`: `coding:"ATG…", show:["coding","template","mrna","protein"], template, mrna, protein:["Met",…], mutated:{coding, effect}`
- `bio-division`: `process:"mitosis"|"meiosis", diploid:4, stages:[{name:"metaphase I", chromosomes, chromatids}]`
- `bio-pathway`: `kind:"cycle"|"chain", steps:[{name, carbons, n, in:{CO2:1}, out:{NADH:1}}], totals:{ATP:2}, per`
- `bio-foodweb`: `organisms:[{name, producer, level}], eats:[[eater, eaten]]`
- `graph` (shared): curves/points/areas with `checks` (value, area, max, stats, order …); e.g. `bio-u01-normal-distribution`.

## 3. Build and check
```
node scripts/diagrams/biology/uNN.mjs                 # write specs
# add "D: bio-uNN-slug" on its own line after the paragraph it illustrates, inside the right ## lesson
node scripts/diagrams/build.mjs bio-uNN               # NEVER a full build (no RDKit here); every check must pass
node scripts/diagrams/biology/registry.mjs            # lesson versions after D: lines
node scripts/diagrams/coverage.mjs biology            # your unit: nothing planned and missing
node scripts/diagrams/biology/shoot.cjs uNN-03 uNN-05 # screenshots to $OUT (default /tmp/bio-shots); look at both
```
A failing check means the spec (or the lesson) is wrong: fix the fact, never loosen the check.

## 4. Git routine
Commit (message ends with the session's `Co-Authored-By` / `Claude-Session` trailers). Then
`git fetch origin main && git rebase origin/main`; on conflict in `kit/diagrams/manifest.json` or `registry.js` take
origin's (`git checkout --theirs`… during rebase), rerun your build and registry update, `git add`, `git rebase --continue`.
Run the full `npm test`, check `git diff origin/main --stat` lists only your files, then `git push origin HEAD:main`
(on rejection fetch, rebase, retest, push). Update `HANDOVER.md` in the same commit.
