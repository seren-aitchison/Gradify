# SciGradify Organic Chemistry Lab

The Organic Chemistry Lab (`scigradify/chemistry/#/practice/organic-notes`) is where students draw structures, push
electrons through mechanisms and practise organic chemistry. This document is the audit of what existed before the
mechanism work, the architecture it follows, and the roadmap with what is built and what isn't.

## 1. Audit (before the mechanism work)

| Piece | What it does | Strengths | Limits that matter for mechanisms |
|---|---|---|---|
| `kit/labs/chemistry/skeletal.js` | Drawing model (atoms, bonds, hexagon lattice), analysis (formula, Mr, groups, stereocentres, E/Z), IUPAC names, SVG renderer | DOM-free, unit-tested, one graph shared by everything | Hydrogens are **implicit and recomputed** from valence after every edit, so moving electrons would silently change H counts. No lone pairs, radicals or electron accounting. |
| `kit/labs/chemistry/sketch.js` | The drawing surface, problems, notebook, exports | Snapping, rings, keyboard, notebook | One toolbar; no modes |
| `kit/labs/chemistry/mechanism.js` (lab `curly-arrows`) | Six fixed mechanisms; learner taps source and target | Correct conventions | Arrows are compared to an **answer key**; nothing is simulated, so a wrong arrow can't be explained, and only those six molecules work |
| `kit/labs/chemistry/sn.js`, `synthesis.js` | SN1/SN2 rates; functional-group synthesis map | Good qualitative models | Not connected to structures |
| `kit/labs/chemistry/mol.js`, `molview.js`, `../three.js` | SMILES, 3D embedding, CIP/R/S, 3D drawing | Tested CIP, a working 3D stage | — (reused for 3D mode) |
| `kit/course/tutor-panel.js` + `supabase/functions/course-tutor` | AI tutor grounded in lesson notes | Server-side, escaped output | Doesn't know about a drawing (Phase 6) |
| Registration | `kit/courses/chemistry/interactives.js`, `evidence.js`, `kit/course/ix-manifest.js`, `kit/api/v1` | Challenges become mastery evidence | Lesson list must include every mapped lesson |

## 2. Architecture

The deterministic engine decides what is chemically valid; the interface draws and the (future) AI explains.

```
kit/labs/chemistry/
  skeletal.js                  structure graph, analysis, naming, SVG renderer   (existing)
  sketch.js                    the lab: mode selector, Structure mode, notebook  (existing, extended)
  reactions/
    electron-flow.js           mechanism state, arrows, applying electron flow, validation, step classification
    library.js                 reaction templates as data (start structure, conditions, expected arrows per step)
    mechanism-ui.js            Mechanism mode: arrow drawing, checking, help levels, animation, steps strip,
                               spot the error, error-carried-forward marking
    predictor.js               Reaction mode's rule templates: reagent + conditions → products, with reasons
    reaction-ui.js             Reaction mode: starting material, reagent, products, predict-first, synthesis routes
  lab3d.js                     3D mode (mol.js embedding + molview.js)
```

### Mechanism data model (`electron-flow.js`)

A mechanism is a sequence of electron-flow operations, not a sequence of pictures.

* **State**: `{ atoms: [{ id, el, x, y, n, h }], bonds: [{ id, a, b, e }], next }`
  * `n` = non-bonding electrons on the atom (lone pairs = ⌊n/2⌋, a radical when odd)
  * `h` = hydrogens that are not drawn (frozen when the state is made, so they never change behind the student's back)
  * `e` = electrons in a bond (2 per bond order)
  * **formal charge is derived, never stored**: `q = valence electrons − n − Σe/2 − h`. Charges are therefore always
    consistent with where the electrons are, and electron conservation holds by construction.
* **Arrow**: `{ type: "pair" | "single", from: { lp: atom } | { bond: id } | { atom: id }, to: { atom: id } | { between: [a, b] } }`
  * from a lone pair to an atom → a new bond between them (bond formation)
  * from a bond to one of its atoms → heterolysis (both electrons to that atom), or half of a homolysis for a fishhook
  * from a bond to another atom or bond → the electrons form a bond from the nearer end of the source bond
  * `{ atom }` as a source is kept so it can be **rejected with an explanation** ("arrows start at electrons")
* **Step**: `{ arrows, note }`. `applyStep(state, arrows)` returns the next state plus `changes` (bonds formed, broken,
  order changed; charges changed) and `checks`.
* **Mechanism**: `{ v: 1, title, conditions: { above, below }, start: State, steps: [Step] }` — plain JSON, so it can be
  saved to notes, replayed, animated, marked and (later) sent to the AI tutor as structured data.

### Validation (per step)

| Check | How |
|---|---|
| Arrow origin | must be a lone pair, radical electron or bond that exists and still has the electrons (cumulative within a step) |
| Arrow destination | lone pair → its own atom's new bond only; bond → an atom or a bond sharing an atom with it |
| Valence | electrons round each atom after the step: H ≤ 2, period 2 ≤ 8, S/P/Cl/Br/I ≤ 12 |
| Formal charge | derived from electrons; changes reported atom by atom; charges beyond ±1 flagged |
| Electron conservation | totals compared before and after (holds by construction; tested) |
| Paired electrons | every bond ends with an even number of electrons (fishhooks must pair up) |
| Intermediate stability | carbocations classified methyl/1°/2°/3° (benzylic/allylic noted); 1° and methyl cations flagged as unlikely in solution |
| Reaction outcome | in a library reaction, the resulting state is compared with the state the template's own arrows produce |
| Mechanism | each step classified from its electron flow (nucleophilic attack, heterolysis, proton transfer, concerted substitution, E2, electrophilic attack by a π bond, homolysis, radical abstraction/addition, termination) |

When a drawing isn't a library reaction, only the chemical-consistency checks run, and the lab says so.

### Reaction mode (`predictor.js`)

`predict(drawing, reagentId)` applies one of 15 reagent templates (H₂/Ni, Br₂, HBr, steam, NaOH(aq), KOH/ethanol,
KCN, NH₃, dichromate distilled or refluxed, NaBH₄, hot conc. H₃PO₄, esterification, Br₂/UV, nitration) to the
learner's own drawing. Products are built by editing the drawing graph, so hydrogens follow by valence and names come
from `skeletal.js`. Selectivity is by stated rules: Markovnikov (carbocation class), Zaitsev (alkene substitution),
oxidation level by alcohol class and conditions, and directing effects for one-substituent benzene rings. Every case it
doesn't cover (several halogens, several ring substituents, radical substitution of anything but alkanes) returns a
"why not" instead of a guess, as does every reagent that doesn't react (with the reason, e.g. benzene and Br₂).

### Marking

* Per arrow, first attempt, against the template (`arrowKey` makes differently drawn but equivalent arrows equal).
* **Error carried forward**: when a wrong step is still chemically valid, the learner can carry on from it. Later steps
  are credited when valid and when their arrows do the same kinds of electron movement (`arrowKinds`: lone pair →
  new bond, bond → atom, bond → new bond, π re-forming; one or two electrons) as the model step at that point.
* **Spot the error**: `faultyStep` changes one arrow of a real step (arrow from the atom instead of its lone pair,
  heterolysis to the wrong end, a full arrow for a fishhook, attack on the wrong atom) and keeps it only if the engine
  confirms the change is wrong; the explanation is the engine's own error text.

## 3. Roadmap

| Phase | Content | Status |
|---|---|---|
| 1 Mechanism engine | electron-flow model, curly and fishhook arrows, lone pairs, charges, bond making/breaking, validation, step classification | **Built** (`reactions/electron-flow.js`, `tests/mechanism.test.mjs`) |
| 2 Reaction library | SN2, SN1, E1, E2, electrophilic addition (HBr + propene, Br₂ + but-2-ene), nucleophilic addition (HCN + ethanal, NaBH₄ + propanone), nitration of benzene, addition–elimination (water + ethanoyl chloride), free-radical substitution | **Built: 11 reactions**. Next: halogenation and Friedel–Crafts EAS, ester hydrolysis, amide formation, the NO₂⁺ generation step |
| 3 Interactive teaching | animation from mechanism data (play/pause/step/speed), four help levels (hint, explain, show next step, full solution), error highlighting | **Built** (deterministic help from template data) |
| 3 Modes | Structure, Mechanism, Reaction, 3D | **Built**. Reaction mode: 15 rule templates, predict-first quiz, multi-step routes, links to the matching mechanism |
| 4 Assessment | marks per arrow, attempts, outcomes recorded as lab evidence | **Built**: per-arrow marks, error carried forward, spot the error, predict the product (Markovnikov, Zaitsev, directing effects, two-step routes as challenges). Next: difficulty levels, explain-in-words questions |
| 5 Advanced | interactive R/S with CIP clicking, displayed formula view, bridged rings, wedges in 3D, synthesis planning | Not started (CIP routines exist in `mol.js`) |
| 6 Integration | AI tutor receives `tutorContext()` from the engine; notes; flashcards; mindmaps; study plans | Mechanisms save to the lab notebook and copy as flashcards; `tutorContext()` exists. Tutor endpoint not wired |

Principles kept throughout: no placeholder features (a mode or button appears only when it works), the AI never decides
chemical validity, and where the engine can't evaluate something it says so.
