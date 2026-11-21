# Biology diagrams: handover

Read this first if you are picking up biology diagram work. Branch history: worktree branch `bio-diagrams`; releases go
straight to `main` as biology-only checkpoints.

## State
- DONE, tested: `kit/diagrams/bio-core.js` (biology logic), `kit/diagrams/bio-renderers.js` (bio-levels, bio-structure,
  bio-scale, bio-phylo, bio-water, bio-pyramid), `kit/diagrams/bio-renderers-2.js` (bio-punnett, bio-pedigree,
  bio-sequence, bio-division, bio-pathway, bio-foodweb), `tests/bio-diagrams.test.mjs` + `tests/fixtures/bio-specs.mjs`
  (10 tests, each renderer has negative cases: a wrong fact in a copied spec must fail). Sample renders inspected at
  both widths (plant cell, meiosis, Calvin cycle, sequence, pedigree, food web, Punnett, size scale).
- NOT STARTED at last push: plan scaffold (`kit/diagrams/plans/biology.mjs`, `plans/biology/uNN.mjs`), spec helper and
  batch scripts (`scripts/diagrams/biology/`), unit 1 specs and D: lines, registry update, `UNIT-AGENT.md`.

## Next steps
1. Plan scaffold: 14 unit files, u01 filled. 2. Spec helper keyed by lesson id. 3. u01 specs, D: lines, build
   `node scripts/diagrams/build.mjs bio-u01`, registry update, coverage, screenshots. 4. UNIT-AGENT.md.

## Releasing
`git fetch origin && git checkout -B bio-release origin/main && git checkout bio-diagrams -- <biology files>`; build
only `bio-u` specs (never a full build: no RDKit here); full `npm test`; `git diff origin/main --stat` biology-only;
commit, `git push origin HEAD:main`.
