# The visualisation pipeline

How Gradify turns "show me" into a visual a learner can trust. Reuse first; make only what's missing; check
everything; publish nothing unreviewed as reviewed.

```
learner asks (Visualise, or "See it" in an explanation)
  → 1. the concept       words matched against the visual index (kit/api/v1/visuals.json, scripts/visual-index.mjs)
  → 2. reuse             a molecule, a structure in a 3D model, a course simulation, or a computed visual
  → 3. or request it     visual_requests → scripts/visual-requests.mjs → a task for the visualisation agent
  → 4. make it           molecules: RDKit structure → automated checks → Blender (scripts/visuals/)
                         physics and maths: computed from the equations (kit/visuals/procedural.js)
  → 5. check it          automated checks, then a subject expert (scripts/visuals/reviews.json)
  → 6. present it        turn, label, tap for detail, narration, a text alternative, questions from the data
```

## Molecules (scripts/visuals/)

| Stage | File | What it does |
|---|---|---|
| Source | `molecules.json` | Name, SMILES, and the molecular formula written down independently, keys and courses |
| 1. Structure | `build_molecules.py` | RDKit 3D structure (ETKDGv3, MMFF94), turned onto its principal axes (a rotation: chirality and distances unchanged). Checks: formula against the independent one; stereocentres against the expected count and kept through 3D; every bond length in range for its atoms and order; no clashes; valence. A failure stops that molecule. |
| 2. Render | `blender_molecule.py` | In Blender 4: ball-and-stick, CPK colours, atoms at 30% of van der Waals radius, double and triple bonds as parallel sticks, aromatic bonds as a stick and a thinner partial one. Exports a `.glb` for the browser and renders a studio still (Cycles). |
| 3. Publish | `build.py` | Runs both for every molecule, writes `kit/visuals/molecules/` (`.glb`, `.webp`, `index.json` with the structure, geometry, checks and review status). |

Run it: `python3 scripts/visuals/build.py` (needs RDKit, numpy, Blender 4 on the PATH; about 10 minutes for 30).
Add a molecule: add it to `molecules.json` with its formula from a reference (and its stereocentre count in
`STEREO` if chiral), run the build, and commit the outputs. Tests (`tests/visuals.test.mjs`) check every published
molecule passed every check and matches its formula.

**Review.** Every molecule is published as "automated checks passed, not yet reviewed by a chemist". When a chemist
reviews one, add `{ "<id>": { "status": "reviewed", "by": "...", "on": "YYYY-MM-DD" } }` to
`scripts/visuals/reviews.json` and rebuild; the viewer then says so.

## Computed visuals (kit/visuals/procedural.js)

Electric field lines (Coulomb's law, RK4 tracing), wave superposition, projectile motion, vector addition and the
unit circle. Right by construction: each shows its equation, and Node tests the numbers.

## In the browser

- **Visualise** (`app.html#/tools/visualise`): search, the pipeline's library, and requests.
- **Molecule viewer** (`kit/visuals/molecule.js`): three.js with the Blender `.glb`; turning (stops with reduced
  motion), atom labels, tap an atom for its bonds and angles, spoken description, the structure as a table for screen
  readers, the Blender still where WebGL isn't available, and questions worked out from the structure.
- **Explanations**: "See it" (kit/learning/explain.js) offers the matching visuals beside the lesson's diagram.

## What isn't built yet

Proteins and large biomolecules (they need experimental structures from the PDB, not generated ones), animated
mechanisms (reaction steps, physiological processes) rendered as Blender animations, and anatomy beyond the existing
3D models. Each would go through the same stages: a verified source, automated checks, render, expert review.
