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

54 molecules: small molecules for GCSE and A level chemistry, all 20 amino acids, the five nucleobases, glucose,
sucrose, ATP, cholesterol and common drugs.

| Stage | File | What it does |
|---|---|---|
| Source | `molecules.json` | Name, SMILES, the molecular formula written down independently, keys, courses; `racemic` where a compound is used as both mirror forms |
| References | `references.json` | Independent data to check against: the reference **InChIKey** (identity, stereochemistry included), the expected **R/S** count, **experimental** bond lengths and angles (NIST CCCBDB), and, where a small molecule's measured structure fully fixes its shape, the measured **coordinates** |
| 1. Structure | `build_molecules.py` | RDKit 3D structure (ETKDGv3; MMFF94, or UFF where MMFF lacks parameters; or the experimental coordinates), turned onto its principal axes (a proper rotation). **Checks**: formula; identity (InChIKey); configuration (R/S); geometry against experiment (±0.03 Å, ±3°); stereocentres counted and kept through 3D, with no unassigned carbon centre unless declared racemic; bond lengths in range; no clashes; valence; optimised. Also records functional groups (SMARTS) and Gasteiger partial charges. A failure stops that molecule. |
| 2. Render | `blender_molecule.py` | Blender 4: ball-and-stick, CPK colours, multiple and aromatic bonds drawn as such; a `.glb` for the browser and a Cycles still |
| 3. Publish | `build.py` | Incremental (a molecule re-renders only when what its picture shows changes: atom positions, bonds or the Blender script, `fingerprint`; analysis changes never force a render), renders in parallel, records RDKit and Blender versions, removes molecules that left the library |

**What the reference checks have caught.** Carbon dioxide's C=O bonds came out at 1.405 Å (experiment: 1.162 Å):
MMFF94 has no proper parameters for CO₂ and UFF gives 1.237 Å, and the old plausibility range was too wide to notice.
It now uses the experimental structure, and its viewer says so. RDKit also lists a phosphate's phosphorus as a possible
stereocentre; those are excluded, because a phosphate's oxygens are equivalent by resonance.

**Review.** Every molecule is published as "automated checks passed, not yet reviewed by a chemist". A chemist opens
`app.html#/tools/visualise/molecule/<id>/review`, works through the checklist (structure, stereochemistry, geometry,
description and groups, questions), and the page produces the entry for `scripts/visuals/reviews.json`, with the
molecule's `content` fingerprint (structure, groups, charges, description). A review counts only for the exact version reviewed: if the molecule changes, it's pending
again.

## Computed visuals (kit/visuals/procedural.js)

Electric field lines (Coulomb's law, RK4 tracing), wave superposition, projectile motion, vector addition and the
unit circle. Right by construction: each shows its equation, and Node tests the numbers.

## In the browser

- **Visualise** (`app.html#/tools/visualise`): search, the pipeline's library, and requests.
- **Molecule viewer** (`kit/visuals/molecule.js`): three.js with the Blender `.glb`. Views: ball and stick,
  space-filling, polarity (partial charges) and functional groups. R/S labels on stereocentres and a mirror-image
  toggle (the labels swap). Tap an atom, or pick it from a list, for its bonds, angles and charge. Arrow keys turn it
  and + / − zoom; a spoken description; the structure as a table; the Blender still where WebGL isn't available.
  "How we know it's right" shows every check, the model against experiment, and the review status. Questions are
  worked out from the structure (formula, counts, bonds, functional groups, stereocentres, angles).
- **Explanations**: "See it" (kit/learning/explain.js) offers the matching visuals beside the lesson's diagram.

## What isn't built yet

Proteins and large biomolecules (they need experimental structures from the PDB, not generated ones), animated
mechanisms (reaction steps, physiological processes) rendered as Blender animations, and anatomy beyond the existing
3D models. Each would go through the same stages: a verified source, automated checks, render, expert review.
