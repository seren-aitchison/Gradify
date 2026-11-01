# SciGradify Biology and Chemistry

**Pages:** `scigradify/biology/` and `scigradify/chemistry/`, next to `scigradify/physics/`, which is unchanged. The subject navigation on all three pages, plus `3d.html`, `map.html` and the SciGradify homepage, links the three subjects.

## Architecture

Both subjects run on the same course engine as Physics, Law and Nursing (`kit/course/course.js`). No second engine exists.

| Part | Where |
|---|---|
| Curriculum | `kit/courses/<subject>/syllabus.js`. Lesson titles are verbatim from the brief, in named modules (`> ` lines). Biology has 6 stages and Chemistry 8, plus paths and one-line school summaries |
| Permanent lesson ids | `ids.js`, locked like Law and Nursing (`u01-01` style). `tests/sciences.test.mjs` fails if an id disappears or changes title |
| Quality record | `qa.js` (written → tested → reviewed → sources → signoff). Unready schools show the engine's draft notice |
| Interactives | `interactives.js` registry, with modules in `kit/labs/<subject>/` and shared code in `kit/labs/lab.js`, `kit/labs/three.js` and `kit/styles/labs.css` |
| Notes | `notes/uNN.js`, written to content standard 2 (`docs/CURRICULUM_CONTENT_STANDARD.md`) |

## Engine additions

All of these are opt-in. Physics, Law and Nursing render byte-identically to before; the DOM was compared across 15 views.

- `trackWord` ("Stage"), `theme` (subject colours) and `practiceLabel` ("Lab").
- `overview`: a subject landing page with:
  - the hero, with a live interactive
  - what you'll learn
  - progress
  - the curriculum by stage
  - paths
  - featured interactives
  - study tools
  - how the content is checked
- `IX: <id>` in notes embeds an interactive in a lesson. It loads lazily when scrolled into view and is stopped when you navigate away.
- Interactives can award XP per challenge (`ctx.complete(task)`), as well as once for the whole interactive (`ctx.onComplete`).
- Assessment library:
  - a `NUM` numerical-answer type (absolute or % tolerance; accepts `e` and `× 10^` notation)
  - a `science` exam format that includes it
- Cumulative exams: one per stage plus a whole-course exam, built on the shared exam engine.

## Interactives (60)

Each one states its kind (simulation, illustrative model, exercise, explorer or tool) and what it simplifies.

`tests/labs.test.mjs` pins the science to known values, including:
- Biology: the Hodgkin–Huxley threshold, resting cardiac values, alveolar PO₂, PCR ΔCt, Michaelis–Menten and the primate tree topology
- Chemistry: the pH of standard solutions, the Daniell cell, chlorine and bromine isotope patterns, L-alanine assigned as S, and normalised hydrogen orbitals

**Biology:**
- **Cells and molecules:** cell explorer, organelle identification, DNA helix (3D), replication fork, transcription and translation with mutations, ribosome, protein viewer.
- **Genetics and evolution:** Punnett squares with χ², mitosis and meiosis, natural selection and drift, tree of life.
- **Physiology:** organ systems (on the BodyParts3D model), cardiac cycle (time-varying elastance), Hodgkin–Huxley action potential, synapse, gas exchange, kidney, photosynthesis, respiration.
- **Microbes, immunity and ecology:** enzyme kinetics, antibody binding, immune memory, bacterial growth and resistance, population models, food web.
- **Biotechnology and bioinformatics:** PCR, gel electrophoresis, CRISPR, UPGMA trees, sequence alignment.

**Chemistry:**
- **Atoms and bonding:**
  - periodic table (118 elements)
  - atom builder
  - electron configurations
  - hydrogen orbitals from the exact wavefunctions
  - dot-and-cross bonding, Lewis structures, VSEPR, polarity and intermolecular forces
- **Organic structure:**
  - 3D molecule viewer (an in-browser SMILES parser and force field)
  - functional groups
  - chirality, R/S and E/Z (CIP rules)
- **Organic reactions:** curly-arrow mechanisms, SN1 versus SN2, a synthesis planner.
- **Physical chemistry:**
  - energy profiles (exact Maxwell–Boltzmann fractions) and catalysis
  - equilibrium
  - exact-pH acids and bases, and titration
  - electrochemical cells with the Nernst equation
  - Gibbs free energy
  - kinetics
- **Analysis and drug design:**
  - IR, ¹H NMR and mass spectra (exact isotope patterns)
  - combined spectroscopy problems
  - molecular docking

## Content status (honest)

| Subject | Schools written | Lessons written | Status |
|---|---|---|---|
| Biology | School 1 (Foundations, 20 lessons) | 20 of 391 | Written and passing the automated checks; **not yet reviewed, source-checked or expert signed-off** |
| Chemistry | School 1 (Foundations, 25 lessons) | 25 of 460 | The same |

The other schools are fully registered, with modules, ids, exams and interactives. Their lessons show "notes still being written" until their batches are done.

Sources in each lesson are typed and dated. They include OpenStax Biology 2e and Chemistry 2e (CC BY 4.0), IUPAC, the BIPM SI Brochure, NIST and primary papers. They are recorded as *used for checking* and still need human verification.

## Known limitations

- The protein viewer uses idealised geometry, because the RCSB PDB is blocked by this environment's network policy. Adding a real CC0 structure is a small follow-up.
- Some model parameters are illustrative and say so on screen:
  - equilibrium K values
  - the immune-response curves
  - the docking pocket
  - SN1/SN2 relative rates
- Spectra are simulated from correlation data, not measured spectra.
- `npm run qa` (question ids, the registry and the progress doc) doesn't yet include the science courses; add them to `COURSES` in `scripts/qa-courses.mjs` when the first review happens.

## Next batches

**Biology:**
1. School 2 Cell Biology
2. School 3 Biochemistry
3. School 4 Genetics
4. Schools 13 and 12, given the brief's emphasis on computational biology

**Chemistry:**
1. School 2 Atomic Structure
2. School 3 Periodic Table
3. School 4 Bonding
4. Schools 18 and 20, given the emphasis on medicinal and computational chemistry

Each batch is written to standard 2, passes `npm test`, and is recorded in `qa.js`.
