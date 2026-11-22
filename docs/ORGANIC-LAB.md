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
    predictor.js               Reaction mode's rule templates: 35 reagents → products, with reasons and stereo notes
    competition.js             SN1 / SN2 / E1 / E2 ranking from substrate, nucleophile/base, solvent, temperature
    planner.js                 synthesis search over the predictor's reactions; routes, retrosynthesis, challenges
    marking.js                 exam-style 10-mark breakdown with error carried forward
    reaction-ui.js             Reaction mode: Predict (with adaptive and timed practice), Conditions, Synthesis
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

### Reaction mode (`predictor.js`, `competition.js`, `planner.js`)

`predict(drawing, reagentId)` applies one of 35 reagent templates to the learner's own drawing, each tagged with a
level (foundation, intermediate, advanced, university). Products are built by editing the drawing graph, so hydrogens
follow by valence and names come from `skeletal.js`. Every group in the molecule that the reagent attacks is treated
(NaOH(aq) neutralises acids and hydrolyses esters, amides, nitriles and acyl chlorides; LiAlH₄ reduces what NaBH₄
leaves alone), and selectivity comes from stated rules:

| Area | Rules |
|---|---|
| Addition to C=C / C≡C | Markovnikov by carbocation class (benzylic counts); syn/anti/racemic notes; HX, X₂, H₂O (steam or HgSO₄), H₂/Ni, Lindlar, cold KMnO₄ (diol), hot KMnO₄ and ozonolysis (cleavage, =CH₂ → CO₂ or methanal) |
| Substitution vs elimination | `competition.js`: scores SN2, SN1, E2, E1 from substrate class and β-branching, nucleophile strength, base strength and bulk (Hofmann with tert-butoxide), solvent (protic/aprotic) and temperature; major/minor pathways with Zaitsev alkenes; inversion/racemisation notes at stereocentres |
| Alcohols and carbonyls | dichromate by class and conditions, Tollens, NaBH₄, LiAlH₄, HCN, Grignard (aldehyde, ketone, ester; destroyed by O–H), esterification both ways, SOCl₂, acid dehydration (E1 for 2°/3°, E2 for 1°) |
| Acid derivatives | acid and alkaline hydrolysis of esters, anhydrides, amides, nitriles; acyl chlorides and anhydrides with water, ethanol, ammonia |
| Aromatic substitution | nitration, Cl₂/AlCl₃, Br₂/FeBr₃, Friedel–Crafts alkylation and acylation; directing effects ranked (strong activators > alkyl > halogen > deactivators), the strongest activator controls, hindered positions between two groups avoided, para favoured for bulky acylium; FC fails on deactivated, –NH₂ and –OH rings; bromine water tribrominates phenol and phenylamine |
| Radicals | Br₂/UV on alkanes, with bromine's selectivity (tertiary > secondary > primary) deciding the major product |

When a case is outside the rules the predictor declines and says why instead of guessing (examples: two halogens,
a halogen plus a C=O, aldol reactions of aldehydes with NaOH, conjugated C=C with HX, nitrating phenylamine, rings
with an extra C=C, several rings).

`planner.js` searches the graph of predictor reactions (major products only) to find shortest routes, so any route
the rules support is accepted, and walks it backwards for retrosynthesis (only real precursors are offered, plus
decoys checked not to work). The 12 synthesis challenges each have a stated shortest length, which a test confirms.

### Marking

* Per arrow, first attempt, against the template (`arrowKey` makes differently drawn but equivalent arrows equal).
* **Error carried forward**: when a wrong step is still chemically valid, the learner can carry on from it. Later steps
  are credited when valid and when their arrows do the same kinds of electron movement (`arrowKinds`: lone pair →
  new bond, bond → atom, bond → new bond, π re-forming; one or two electrons) as the model step at that point.
* **Exam style** (Mechanism mode): a reagents-and-conditions question first, no hints, a timer, and a closing
  explanation question; `marking.js` gives a 10-mark breakdown (conditions, first electron movement, intermediates,
  later electron movement, final product, explanation), adapting the scheme for one-step mechanisms. Every finished
  library mechanism shows the breakdown.
* **Practice** (Reaction mode): random questions at the chosen level, weighted towards reagent families the learner
  got wrong before (stored in this browser), with an optional 45-second timer; several main products are all accepted.
* **Spot the error**: `faultyStep` changes one arrow of a real step (arrow from the atom instead of its lone pair,
  heterolysis to the wrong end, a full arrow for a fishhook, attack on the wrong atom) and keeps it only if the engine
  confirms the change is wrong; the explanation is the engine's own error text.

## 3. Accuracy audit (this milestone)

Before adding reactions, the existing rules were checked against hand-worked cases. Problems found and fixed:

| Problem | Fix |
|---|---|
| NaOH(aq) said "no reaction" for a carboxylic acid, ester or amide | NaOH(aq) now neutralises and hydrolyses; every attacked group is handled |
| Ethanolic KOH gave only the alkene from a primary halide | conditions model: substitution still wins for primary halides; elimination major for 2°/3° or bulky base |
| Free-radical bromination listed isomers without ranking | bromine's selectivity makes the most substituted position major |
| –CF₃ treated as an activating alkyl group; any second ring substituent refused | directing ranks, –CF₃/–CCl₃ deactivating; several substituents handled by the strongest activator |
| Acylium ion flagged by the engine as an unstable primary carbocation | the engine recognises R–C≡O⁺ as stabilised |
| HBr on a C=C conjugated with C=O used Markovnikov's rule (wrong regiochemistry) | declined with the reason |
| Neopentyl, benzylic and methyl halides mis-scored | quaternary β-carbon blocks SN2; ring carbons don't count as branching; methyl + bulky base gives the ether |
| Acid anhydrides acylated twice | one half acylates, the other becomes the acid |
| No stereochemical notes | racemic (planar intermediates), inversion (SN2 at a stereocentre), syn/anti additions |

Passing electron-conservation checks is not treated as proof that a mechanism is right: the library mechanisms are
each also compared with their stated products and names, and the predictor with the reference set below.

### Reference set

`tests/data/organic-reference.mjs`: 302 reactions on 80 starting materials, written by hand from standard A-level and
first-year textbook outcomes (not generated from the predictor), including 83 negative or declined cases and 53 with
major/minor products or several products. **It has not yet been reviewed by an independent chemist**; that review is
the next step before the set is called verified.

### Known limitations

* Selectivity is ranked by rules, not measured ratios: "major" and "minor" are qualitative.
* Rearrangements (hydride and alkyl shifts in carbocations), 1,4-addition to dienes, conjugate addition, aldol and
  other enolate chemistry, and anti-Markovnikov (peroxide) HBr addition are not modelled.
* A flat drawing has no wedges, so the lab can say a racemate forms or a configuration inverts, but not which
  enantiomer or diastereomer (E/Z of a starting alkene isn't carried into anti additions).
* Aromatic substitution is predicted for one benzene ring only.
* Synthesis search uses only the 35 reagents, follows major products and has a node limit, so a longer real-world
  route may exist that the planner doesn't find.

## 3. Roadmap

| Phase | Content | Status |
|---|---|---|
| 1 Mechanism engine | electron-flow model, curly and fishhook arrows, lone pairs, charges, bond making/breaking, validation, step classification | **Built** (`reactions/electron-flow.js`, `tests/mechanism.test.mjs`) |
| 2 Reaction library | mechanisms: SN2, SN1, E1, E2, HBr and Br₂ addition, HCN, NaBH₄ and Grignard addition, nitration, chlorination (AlCl₃), Friedel–Crafts acylation, water and ammonia with ethanoyl chloride, alkaline ester hydrolysis, radical chlorination | **Built: 16 mechanisms, 35 reagent rules**, each with a level. Next: acid-catalysed ester hydrolysis and esterification mechanisms, the NO₂⁺ generation step, alkyne mechanisms |
| 3 Interactive teaching | animation from mechanism data (play/pause/step/speed), four help levels (hint, explain, show next step, full solution), error highlighting | **Built** (deterministic help from template data) |
| 3 Modes | Structure, Mechanism, Reaction (Predict, Conditions, Synthesis), 3D | **Built** |
| 3b Competition | SN1/SN2/E1/E2 under chosen conditions, two sets side by side, predict the main pathway | **Built** (`competition.js`) |
| 4b Synthesis | forwards and backwards (retrosynthesis) challenges, hints from the shortest route, multiple routes accepted | **Built: 12 challenges** (`planner.js`). Next: learner-set targets, more challenges at advanced level |
| 4 Assessment | marks per arrow, attempts, outcomes recorded as lab evidence | **Built**: per-arrow marks, error carried forward, spot the error, exam style with a 10-mark breakdown and timer, four difficulty levels, adaptive and timed practice, multiple acceptable answers. Next: exam-board-specific question styles, free-text explanations (needs the tutor) |
| 5 Advanced | interactive R/S with CIP clicking, displayed formula view, bridged rings, wedges in 3D, synthesis planning | Not started (CIP routines exist in `mol.js`) |
| 6 Integration | AI tutor receives `tutorContext()` from the engine; notes; flashcards; mindmaps; study plans | Mechanisms save to the lab notebook and copy as flashcards; `tutorContext()` exists. Tutor endpoint not wired |

Principles kept throughout: no placeholder features (a mode or button appears only when it works), the AI never decides
chemical validity, and where the engine can't evaluate something it says so.

## 4. Testing record

| Suite | What it checks |
|---|---|
| `tests/skeletal.test.mjs` | drawing model, naming, analysis |
| `tests/mechanism.test.mjs` | electron flow, validation, all 16 mechanisms replayed to named products, spot the error, error carried forward, registration |
| `tests/predictor.test.mjs` | predictor behaviour on starting materials and learners' own drawings, every product a valid molecule |
| `tests/organic-reference.test.mjs` | the 302-reaction reference set, with coverage of every reagent |
| `tests/planner.test.mjs` | every synthesis challenge solvable in exactly its stated length, retrosynthesis, competition, mark breakdowns |

Run the whole suite with `npm test`. In environments without `node_modules`, 17 tests fail because `@electric-sql/pglite`,
`@anthropic-ai/sdk` and `ts-fsrs` aren't installed; those are environmental and unrelated to the lab, and are listed
separately in each report so they can't hide a real regression.
