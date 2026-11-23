# Physics diagrams: handover

Updated 23 Nov 2026 by lead session 01PJjzVE. **New here? Read `kit/diagrams/LEAD.md` first** (setup, launching agents,
landing, updating this file). Agents follow `UNIT-AGENT.md` in this folder; the bar is `kit/diagrams/BUILDERS.md`.

## Next step

1. Check the claims table below; the units in it may have landed since this was written:
   `git log origin/main --oneline -- kit/diagrams/plans/physics/` and `node scripts/diagrams/unit-status.mjs physics`.
2. Units not started and not claimed, in order: u21, u22, u23, u24 (a draft plan is on `wip/phys-u24`), u25 … u54.
   Give one agent three at a time (the owner's instruction: one maths agent and one physics agent, three units each,
   push after every unit).
3. The course has **54 units**; until 23 Nov the plan scaffold covered only u01–u32, so older notes that say "u02–u32"
   mean the first 32. `kit/diagrams/plans/physics.mjs` now loads all 54.

## Status (`node scripts/diagrams/unit-status.mjs physics`, 23 Nov 2026)

| unit | title | status | lessons | planned | diagrams (`phys-uNN-*`) | lessons with a lab | lessons with no visual | failing |
|---|---|---|---:|---:|---:|---:|---:|---:|
| u01 | Foundations of Physics | done | 19 | 19 | 7 | 0 | 13 | 0 |
| u02 | Mathematics for Physics | done | 34 | 34 | 14 | 0 | 20 | 0 |
| u03 | Measurement, Experimental Physics and Uncertainty | done | 31 | 31 | 11 | 0 | 20 | 0 |
| u04 | Classical Mechanics | done | 33 | 33 | 20 | 11 | 8 | 0 |
| u05 | Rotational Mechanics | done | 20 | 20 | 5 | 0 | 15 | 0 |
| u06 | Oscillations and Vibrations | done | 20 | 20 | 9 | 14 | 5 | 0 |
| u07 | Gravitation and Orbital Mechanics | done | 22 | 22 | 4 | 7 | 13 | 0 |
| u08 | Fluid Mechanics | done | 25 | 25 | 5 | 0 | 20 | 0 |
| u09 | Elasticity and Solid Mechanics | done | 19 | 19 | 6 | 0 | 13 | 0 |
| u10 | Waves and Wave Motion | done | 25 | 25 | 8 | 9 | 11 | 0 |
| u11 | Acoustics and Sound | done | 21 | 21 | 6 | 0 | 15 | 0 |
| u12 | Thermodynamics | done | 31 | 31 | 13 | 2 | 17 | 0 |
| u13 | Statistical Mechanics | done | 26 | 26 | 8 | 4 | 15 | 0 |
| u14 | Heat Transfer and Thermal Physics | done | 20 | 20 | 5 | 0 | 15 | 0 |
| u15 | Electricity and Electrostatics | done | 24 | 24 | 6 | 9 | 12 | 0 |
| u16 | Electric Circuits | done | 28 | 28 | 12 | 12 | 11 | 0 |
| u17 | Magnetism and Electromagnetism | done | 29 | 29 | 8 | 6 | 17 | 0 |
| u18 | Electromagnetic Waves | done | 27 | 27 | 17 | 0 | 11 | 0 |
| u19 | Optics | not started | 30 | 0 | 0 | 0 | 0 | 0 |
| u20 | Quantum Mechanics | not started | 42 | 0 | 0 | 0 | 0 | 0 |
| u21 | Atomic Physics | not started | 25 | 0 | 0 | 0 | 0 | 0 |
| u22 | Molecular Physics | not started | 19 | 0 | 0 | 0 | 0 | 0 |
| u23 | Nuclear Physics | not started | 25 | 0 | 0 | 0 | 0 | 0 |
| u24 | Particle Physics | not started | 33 | 0 | 0 | 0 | 0 | 0 |
| u25 | Special Relativity | not started | 24 | 0 | 0 | 0 | 0 | 0 |
| u26 | General Relativity | not started | 23 | 0 | 0 | 0 | 0 | 0 |
| u27 | Condensed Matter Physics | not started | 35 | 0 | 0 | 0 | 0 | 0 |
| u28 | Semiconductor Physics and Electronics | not started | 25 | 0 | 0 | 0 | 0 | 0 |
| u29 | Plasma Physics | not started | 20 | 0 | 0 | 0 | 0 | 0 |
| u30 | Astrophysics | not started | 34 | 0 | 0 | 0 | 0 | 0 |
| u31 | Cosmology | not started | 24 | 0 | 0 | 0 | 0 | 0 |
| u32 | Geophysics | not started | 20 | 0 | 0 | 0 | 0 | 0 |
| u33 | Atmospheric Physics and Climate | not started | 22 | 0 | 0 | 0 | 0 | 0 |
| u34 | Biophysics | not started | 25 | 0 | 0 | 0 | 0 | 0 |
| u35 | Medical Physics | not started | 22 | 0 | 0 | 0 | 0 | 0 |
| u36 | Optoelectronics and Photonics | not started | 21 | 0 | 0 | 0 | 0 | 0 |
| u37 | Quantum Information and Quantum Computing | not started | 26 | 0 | 0 | 0 | 0 | 0 |
| u38 | Nonlinear Dynamics and Chaos | not started | 21 | 0 | 0 | 0 | 0 | 0 |
| u39 | Computational Physics | not started | 29 | 0 | 0 | 0 | 0 | 0 |
| u40 | Mathematical and Theoretical Physics | not started | 27 | 0 | 0 | 0 | 0 | 0 |
| u41 | Classical Field Theory | not started | 15 | 0 | 0 | 0 | 0 | 0 |
| u42 | Quantum Field Theory | not started | 22 | 0 | 0 | 0 | 0 | 0 |
| u43 | Nuclear and Particle Detection Methods | not started | 19 | 0 | 0 | 0 | 0 | 0 |
| u44 | Experimental and Applied Physics | not started | 22 | 0 | 0 | 0 | 0 | 0 |
| u45 | Materials Physics | not started | 24 | 0 | 0 | 0 | 0 | 0 |
| u46 | Renewable Energy and Energy Physics | not started | 21 | 0 | 0 | 0 | 0 | 0 |
| u47 | Acoustics, Vibrations and Engineering Physics | not started | 18 | 0 | 0 | 0 | 0 | 0 |
| u48 | Space Physics and Planetary Science | not started | 22 | 0 | 0 | 0 | 0 | 0 |
| u49 | Historical Development of Physics | not started | 20 | 0 | 0 | 0 | 0 | 0 |
| u50 | Philosophy and Foundations of Physics | not started | 23 | 0 | 0 | 0 | 0 | 0 |
| u51 | Physics Education and Communication | not started | 17 | 0 | 0 | 0 | 0 | 0 |
| u52 | Advanced Problem-Solving Skills | not started | 17 | 0 | 0 | 0 | 0 | 0 |
| u53 | Interdisciplinary Physics | not started | 22 | 0 | 0 | 0 | 0 | 0 |
| u54 | Research and Professional Physics Skills | not started | 20 | 0 | 0 | 0 | 0 | 0 |
| all | | 18 of 54 done | 1308 | 454 | 164 | 74 | 251 | 0 |

Diagram counts exclude reused older diagrams (u16 also places `phys-kirchhoff-loop`). Every diagram is `validated`
(its checks pass); none has had a subject review yet.

## Unit claims (read before starting a unit)

A unit listed here is being built; don't start it in another session. Remove the row when the unit is on main.

| Units | Claimed by |
|---|---|
| u19, u20 (u18 landed) | lead session 01PJjzVE, agent P1 (worktree /home/user/wt-p1, branch diagrams/p1) |

## Unit notes

Commit, diagrams and lessons per unit; "lacks" lists renderers its null rows ask for.
- **u01** Foundations: 7 diagrams, 0 labs.
- **u02** Mathematics for physics (a753f99d): 14 diagrams. Lacks coordinate systems, Fourier pairs, vector fields,
  flux surfaces, Ampère loops, linear maps.
- **u03** Measurement and uncertainty (aa8be3a4): 11 diagrams (error bars, fits).
- **u04** Classical mechanics (5a6e716f): 20 diagrams, 11 lab lessons. Lacks beam (moments).
- **u05** Rotation, **u06** Oscillations (6a3c91eb): 5 + 9 diagrams, 14 lab lessons in u06. Lacks beam, 3D rigid bodies.
- **u07** Gravitation (7dc30578): 4 diagrams; orbits labs. Lacks orbit ellipse, Lagrange points, transfer orbit,
  lensing geometry.
- **u08** Fluid mechanics (0705ad1b): 5 diagrams. Lacks streamlines, boundary layer, Mach cone.
- **u09** Elasticity (f013ec6a): 6 diagrams. Lacks Mohr circle.
- **u10** Waves, **u11** Acoustics (81b68aee): 8 + 6 diagrams, 9 lab lessons in u10. Lacks Huygens wavelets.
- **u12** Thermodynamics (feace38b), **u13** Statistical mechanics (e3091ba3), **u14** Heat transfer (0499b65b),
  **u15** Electrostatics (76cfd9db), **u16** Circuits (eb9b1a5a), agent phys-c: 13, 8, 5, 6, 12 diagrams. Lack p–T phase
  diagram, bar chart of counts, layered wall, heat-pump and Peltier energy flows, capacitor networks, dielectric
  boundary, image charges, circuit networks, RLC damping and resonance, rectifier ripple, Bode plot, diode curves.
- **u17** Magnetism and electromagnetism (e52d0b06, lead session 01H1szfk): 8 diagrams, 6 lab lessons. Lacks charged
  particle paths, 3D wire forces, loop fields, induction, hysteresis, Poynting vector.
- **u18** Electromagnetic waves (3bef501e, agent P1): 17 diagrams; full note to follow from the agent's report.

## Lesson errors

Agents report errors in a lesson's own text and leave it without a diagram; the owner decides the fix.

- Fixed: **u14-11** selective plate: 0.1σT⁴ = 950 gives 640 K (639.8 K); the lesson said 634 K. Commit acb0cc55.
- Open: none.

## Renderers

Available (checks recompute the physics; the header comment of each renderer file and `tests/fixtures/phys-samples.mjs`
show every field; `UNIT-AGENT.md` has one-line spec bodies): `kit/diagrams/phys-renderers.js` vectors, motion, wave,
sankey, fit; `phys-renderers-2.js` field, transitions, scale, nuclear, refraction; shared graph, free-body, rays (thin
lens), circuit (one loop), energy-profile, decision-tree. Tests: `tests/phys-diagrams.test.mjs` (every sample passes and
is broken several ways that must fail). Tools: `scripts/diagrams/physics/spec.mjs uNN` lists a unit's lessons,
sections, worked examples, labs and placed diagrams; `check-svg.cjs <prefix> [outDir]` checks labels in a browser and
writes PNGs. Physics has no `ids.js` or `registry.js`, so no registry step.

Missing (`node scripts/diagrams/unit-status.mjs physics --needs` lists all 41 rows): circuit networks (series/parallel,
capacitors, bridges, cube), AC/RLC (damping, resonance, Bode with log axes, rectifier), magnetism in 3D (particle
paths, wire forces, loop fields, induction, Poynting), orbits (ellipse, Lagrange, Hohmann, lensing), fluid flow
(streamlines, boundary layer, Mach cone), beams and moments, 3D rigid bodies, Mohr circle, p–T phase diagram, energy
flows without a waste band (heat pump, Peltier), vector fields, Fourier pairs. Predicted for later units: ray diagrams
for mirrors and multi-lens instruments (u19), potential wells with levels (u20; `graph` can draw curves), spacetime
diagrams (u25), band diagrams and p–n junctions (u28), the H–R diagram (u30). Building renderers is lead work (shared
files plus tests); after one lands, revisit the rows it covers.

## WIP branches

- `wip/phys-u24`: a draft plan for u24 (no specs, nothing placed), saved when its agent was stopped. Start u24 from it.
- `wip/phys-a` (u03/u04) and `wip/phys-c` (u12) are superseded by main and can be deleted.

## Later

- Subject review of every diagram (record `review` in the spec via the batch script; `mk` keeps it).
- Interactive versions (vector-addition angle, standing-wave harmonic, Snell's law angle) need a shared change to
  `kit/diagrams/visual.js`; proposal only.
