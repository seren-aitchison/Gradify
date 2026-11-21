# Visual Learning Engine: programme handover

Read this first if you are picking the work up in a new session. Then read the subject handovers:
`kit/diagrams/physics/HANDOVER.md`, `kit/diagrams/maths/HANDOVER.md`, `kit/diagrams/biology/HANDOVER.md`
(each written by that subject's builder; may not exist yet if the builder had not reached its first push).

## Workflow (owner's instruction, 21 Nov 2026)
- Push every coherent, tested checkpoint straight to `main` (this deploys getgradify.com; intended). Goal: no work
  lives only in a session. Never commit half-written or broken files.
- Before each push: fetch and rebase on `origin/main`; on conflicts in generated files take origin's and regenerate
  (`node scripts/diagrams/build.mjs <prefix>`, the course registry via `updateRegistry` in
  `scripts/curriculum-registry.mjs`, `npm run preload`); full `npm test` (needs `npm ci` first); check the diff.
- Update the subject HANDOVER.md in the same commit.
- No database migrations, credentials or unrelated production changes without the owner's approval.

## Ownership
- Shared engine (`kit/diagrams/renderers.js`, `visual.js`, `scripts/diagrams/build.mjs`, `coverage.mjs`, `place.mjs`,
  styles, this file): lead session only. Subject builders request shared changes instead of editing.
- Per subject: `kit/diagrams/<subj>-renderers*.js`, `kit/diagrams/plans/<course>.mjs` + `plans/<course>/uNN.mjs`
  (one file per unit, so unit agents never collide), `scripts/diagrams/<course>/uNN.*`, `<prefix>-uNN-*` specs/svgs,
  the course notes, `tests/<subj>-diagrams.test.mjs`, `kit/diagrams/<course>/UNIT-AGENT.md` and `HANDOVER.md`.

## Status
- PR #150 infrastructure (inventory, coverage for every planned course, BUILDERS.md) merged to main: 902c800.
- Physics (32 written units, 1,308 lessons), maths (29, 1,077), biology (14, 391): one architect agent each, building
  renderers with recomputing checks, the plan scaffold, the unit-agent recipe and Unit 1 end to end.
- Next: once a subject's Unit 1 is proven (useful renderers, checks with negative tests, lesson-grounded labels, wide
  and narrow layouts checked in screenshots, placed in real lessons, interactive only where manipulation helps),
  give the remaining units to cheaper agents, 4-5 units each, using that subject's UNIT-AGENT.md.
- Lead to-do: extend `coverage.mjs` to report lessons assessed, with a useful visual, interactive vs static, excluded
  with reasons, unique diagrams vs placements, validation failures, review still required. Add any shared-engine
  changes the builders request (e.g. interactive diagram support in `visual.js`).
