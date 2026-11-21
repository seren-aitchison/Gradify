# Biology diagrams: handover

Read this first if you are picking up biology diagram work. Unit agents follow `UNIT-AGENT.md` (same folder).

## State (all tested; nothing half-written)
- Renderers: `kit/diagrams/bio-core.js` (the biology: genetics, pedigree search, codon table, division counts, carbon
  tallies, trophic levels, water potential, label layout), `bio-renderers.js` (bio-levels, bio-structure with 9
  templates, bio-scale, bio-phylo, bio-water, bio-pyramid), `bio-renderers-2.js` (bio-punnett, bio-pedigree,
  bio-sequence, bio-division, bio-pathway, bio-foodweb). Every renderer checks labels inside the picture and not
  overprinting at both widths, and ties labels to the lesson text.
- Tests: `tests/bio-diagrams.test.mjs` (10 tests; each renderer has negative cases), samples in `tests/fixtures/bio-specs.mjs`.
- Tooling: `scripts/diagrams/biology/spec.mjs` (mk() keyed by lesson id), `u01.mjs` (batch), `registry.mjs`
  (updateRegistry for biology), `shoot.cjs` (screenshots of given lessons).
- Plan: `kit/diagrams/plans/biology.mjs` + `plans/biology/u01..u14.mjs`; only u01 is filled.
- Unit 1 done end to end: 20 lessons assessed; 7 static diagrams (7 placements, all `validated`, none failing); 1
  existing lab (tree-of-life on u01-06); 13 lessons without a visual, each with a reason in the plan; no new
  interactive (none would add understanding here, so no `visual.js` change is needed). Screenshots checked at desktop
  and phone for all seven. All seven still need a subject reviewer (`review` in the spec) before `approved`.
- Registry: `node scripts/diagrams/biology/registry.mjs` also bumped u02-01, u02-13, u04-27, u05-19, u07-20, u11-29,
  which had been edited on main without a registry update (pre-existing drift, not diagram changes).

## Commits on main
- Checkpoint 1: renderers + tests. Checkpoint 2: unit 1 (specs, D: lines, svg, manifest entries, registry, plan,
  tooling, UNIT-AGENT.md). Find them with `git log --oneline -- kit/diagrams/bio-core.js kit/diagrams/plans/biology.mjs`.

## Next steps
1. Units 2–14: one agent per unit following `UNIT-AGENT.md`. Likely renderer use: u02 bio-structure (cells,
   organelles, membrane) + bio-water; u03 graph (enzyme rate); u04 bio-sequence, bio-punnett, bio-pedigree;
   u05 bio-division; u06 bio-phylo; u08 bio-structure leaf + bio-pathway Calvin; u11 bio-foodweb, bio-pyramid.
2. Renderers not built (plan such lessons `[id, null, "needs renderer …"]`): organ/anatomy templates (heart, kidney
   nephron, lung, flower, eye), nutrient cycles with pools and fluxes (carbon, nitrogen), gel electrophoresis bands,
   antibody / immune-cell structure, timelines (embryonic development).
3. Subject review of the u01 diagrams.

## Releasing
Work in a worktree branch; release from a clean branch off `origin/main`, build only `bio-u` specs
(`node scripts/diagrams/build.mjs bio-u`, never a full build: RDKit is not installed, so a full build fails approved
chemistry diagrams), run the full `npm test`, check `git diff origin/main --stat` is biology-only, push to main.
