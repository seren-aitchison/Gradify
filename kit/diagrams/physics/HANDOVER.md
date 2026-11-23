# Physics diagrams: handover

State as of 2026-11-21. Read `kit/diagrams/BUILDERS.md`, then `UNIT-AGENT.md` in this folder.

## Done
- Renderers with physics-recomputing checks: `kit/diagrams/phys-renderers.js` (vectors, motion, wave, sankey, fit) and
  `phys-renderers-2.js` (field, transitions, scale, nuclear, refraction). Tested in `tests/phys-diagrams.test.mjs` (every
  sample in `tests/fixtures/phys-samples.mjs` passes; each is broken in several ways and must fail).
- Tools: `scripts/diagrams/physics/spec.mjs` (`mk()` keyed by syllabus lesson id; `node … spec.mjs uNN` lists a unit),
  `scripts/diagrams/physics/check-svg.cjs <prefix> [outDir]` (browser check: labels inside the viewBox and not overlapping, PNGs).
- Plan scaffold: `kit/diagrams/plans/physics.mjs` concatenates `plans/physics/u01.mjs … u32.mjs` (u02–u32 empty).
- Unit 1 complete: 19 lessons assessed; 6 with a diagram (7 diagrams, 7 placements, 0 reused), 0 labs, 13 without a visual
  by design (reasons in the plan); all 7 validated, none failing; all 7 await a subject review (none recorded).
- Coverage: `node scripts/diagrams/coverage.mjs physics` → 19 lessons assessed · 6 with a passing diagram · 13 by design · 0 missing.
- Units 12–16 complete (agent phys-c): u12 12 diagrams/31 lessons, u13 8/26, u14 5/20, u15 6/24, u16 11/28 (incl. existing phys-kirchhoff-loop); renderers still needed (planned as null rows): circuit networks (u16-05, u16-10), RLC damping and resonance curves (u16-14, u16-20), Bode plot with log axis (u16-23), rectifier ripple (u16-22), capacitor networks (u15-17), dielectric boundary and image charges (u15-20, u15-22), p–T phase diagram (u12-30), bar chart with counting check (u13-01), layered-wall profile (u14-10). Lesson error: u14-11 selective plate is 640 K, not 634 K.

## Not done / next
1. Units u02–u32: one agent per 4–5 units following `UNIT-AGENT.md` (each owns its plan file, batch script, specs, svgs, notes).
2. Renderers still missing (plan such rows as `null, "needs renderer …"`): circuit networks (series/parallel, meters; u16),
   phasor/AC (u16, can use `vectors`), p–V cycles work via `graph` but no cycle check, ray diagrams for mirrors and
   multi-lens instruments (u19), spacetime diagrams (u25), band diagrams / p–n junction (u28), H–R diagram (u30),
   potential wells with levels (u20; `graph` can draw the curves), simple apparatus.
3. Interactive versions: none built. Candidates where manipulation teaches (vector addition angle slider; standing-wave
   harmonic n; Snell's law incidence angle) need a shared change in `kit/diagrams/visual.js` (e.g. a spec `interactive`
   block re-rendered client-side by importing the renderer); proposed to the lead, not edited.
4. Subject review of every physics diagram (record `review` in the spec via the batch script; `mk` keeps it if unchanged).

## Notes
- Never run a full `node scripts/diagrams/build.mjs` here: RDKit is not installed, so chemistry specs would be marked failed.
  Build your prefix only (`… build.mjs phys-uNN`).
- A renderer's unit of measurement is `units`; `unit` is the course unit (mk rejects `unit` in the body).
- Physics has no `ids.js` or `registry.js`, so no registry update is needed after placing D: lines.

## Last release
See `git log -- kit/diagrams/physics/HANDOVER.md` on main for the commit; tests: full `npm test` before each push.

## Unit claims (read before starting a unit)

A unit listed here is being built; don't start it in another session. Remove the row when the unit is on main.
Claimed 23 Nov 2026.

| Units | Claimed by |
|---|---|
| u17-u20 | lead session 01H1szfk, agent P1 |
| u21-u24 | lead session 01H1szfk, agent P2 |
| u25-u28 | lead session 01H1szfk, agent P3 |
| u29-u32 | lead session 01H1szfk, agent P4 |
