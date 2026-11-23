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
    rules.js                   the evidence record behind each rule: scope, selectivity, limitations, sources, confidence
    competition.js             SN1 / SN2 / E1 / E2 ranking from substrate, nucleophile/base, solvent, temperature
    planner.js                 synthesis search over the predictor's reactions; routes, retrosynthesis, challenges
    configuration.js           R/S from wedge and dash bonds, E/Z from the page, meso, isomer relationships, stereo SMILES
    stereo-outcome.js          what each reaction does to configuration: kept, inverted, racemised, formed (syn/anti)
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

Every result has a **status**: `reacts`, `no-reaction` (the chemistry doesn't happen, with the reason) or `declined`
(outside the rules, ambiguous, or another reagent is meant), and carries the **evidence record** of the rule applied
(`rules.js`): what it applies to, what it gives, its selectivity, what it doesn't cover, its sources and its
confidence. `explainContext()` packages a prediction (verdict, rule, reasoning, pathways) as structured data for an
explanation or a future AI tutor, which explains the record and never changes it. The Predict view shows the record
under "The rule behind this".

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

### The AI tutor (`tutor-ui.js`, `kit/assess/tutor.js` mode `chemistry`)

The tutor teaches from the engine and never replaces it. The panel sends the engine's own data (a prediction from
`explainContext()`, a mechanism check from `tutorContext()`, or a synthesis route with the routes the rules allow) to
the existing `course-tutor` Edge Function, so the Claude key, sign-in, allowances and usage ledger are the course
tutor's. The server builds the prompt (`chemistryRequest`); `chemistryAuthority()` fixes what the tutor may claim:

| Evidence | What the tutor must do |
|---|---|
| reviewed / validated | may say an independent chemist reviewed the rule |
| provisional (everything today) | say once that the lab's rule isn't yet independently reviewed; no settled-science claims |
| disputed | say a reviewer disagreed, give the note, present the answer as uncertain |
| declined | explain why the lab can't answer; never give or hint at a product |
| always | never change, contradict or add to the verdict, products, major/minor labels, pathways, arrows or marks; never name anything not in the data; cite only the rule's own (unchecked) source pointers |

Ways to use it: *Explain this reaction*, *Why this product, not another?*, *Guide me through it* (Socratic, one
question at a time), *What did I get wrong?* (after a wrong prediction, with the learner's answer), *Help me understand
this route* and *Guide me to the next step* (Synthesis), *Explain the verdict on my arrows* (Mechanism). The learner's
recent mistake pattern (wrong answers by reaction family, attempts per mechanism step) goes with each request so the
tutor can connect to it. Follow-ups continue one conversation (one use of the allowance). The tutor is hidden in exam
style, and once used, the lab's challenges count as met with help. What the browser sends is the learner's own data:
editing it only changes their own explanation, never a prediction, mark or evidence record, which are all decided in
the lab.

### Light mode

The lab is drawn in the site's light theme too (it is marked `.lab-light`, which opts it out of the "dark island"
rule in `kit/styles/base.css`): white card, the light drawing palette (`skeletal.js` `PALETTES.light`), and
light-mode partners for every hard-coded colour. Every mode repaints when the theme changes. 3D stages stay dark.

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
| No stereochemical notes | racemic (planar intermediates), inversion (SN2 at a stereocentre), syn/anti additions; since 5c, worked through from wedges and E/Z to each product's R/S |

Passing electron-conservation checks is not treated as proof that a mechanism is right: the library mechanisms are
each also compared with their stated products and names, and the predictor with the reference set below.

### Reference set and independent review

`tests/data/organic-reference.mjs`: 302 reactions on 80 starting materials, written by hand from standard A-level and
first-year textbook outcomes (not generated from the predictor): 63 no-reaction cases, 20 the lab must decline, and 53
with major/minor or several products. Each case has a stable id, its section's sources and a confidence level. The
test requires "no reaction" and "declined" cases to be told apart.

**Nothing has been independently reviewed yet: every rule and case is `provisional`.** The review pack is in
`docs/organic-review/` (a brief for the reviewer, `reference-review.csv` and `mechanisms-review.csv` with reviewer
columns). `node scripts/organic-review.mjs import <csv>` brings the verdicts back into
`kit/labs/chemistry/reactions/reviews.js`; agreed cases become `reviewed`, and a rule with any disagreement is shown, and explained by the tutor, as `disputed` with the reviewer's note. Source pointers (AQA 7405 sections, Clayden
topics) are part of what the review should confirm.

### Known limitations

* Selectivity is ranked by rules, not measured ratios: "major" and "minor" are qualitative.
* Rearrangements (hydride and alkyl shifts in carbocations), 1,4-addition to dienes, conjugate addition, aldol and
  other enolate chemistry, and anti-Markovnikov (peroxide) HBr addition are not modelled.
* Stereochemistry (see "Stereochemistry" below) follows textbook rules; amounts of diastereomers aren't predicted, E2 from a
  single diastereomer isn't yet worked through anti-periplanar geometry, and SOCl₂ and other substitutions at a
  stereocentre outside SN1/SN2 aren't followed stereochemically (the lab says so instead of guessing).
* CIP priorities use mol.js's simplified ranking (first point of difference by atomic number, duplicated atoms for
  multiple bonds): no isotopes, no pseudo-asymmetric r/s centres, no like/unlike rules. When two groups tie, the lab
  gives no descriptor rather than a guess.
* Aromatic substitution is predicted for one benzene ring only; heteroaromatic rings (pyridine) are declined.
* Declined rather than guessed: HBr on a C=C whose benzylic carbon is less substituted than the other end (benzylic
  against a more substituted cation); HBr on molecules with both C=C and C≡C; hydroxide with a halogen and an
  aldehyde or ketone together; HBr or mercury-catalysed hydration on molecules with more than one C≡C whose carbons are
  equally substituted (a single such C≡C gives both products).
* SMILES starting materials must be one molecule, and bracket atoms must have at least the hydrogens their valence
  implies: the drawing model fills valence with implicit hydrogens, so radicals such as `[O]` are refused.
* Identity (the molecule hash) is exact: rings add a canonical certificate. A very large, highly symmetric molecule can
  exhaust the canonical search (20,000 branches); it then falls back to colour refinement alone.
* Synthesis search uses only the 35 reagents, follows major products and has a node limit, so a longer real-world
  route may exist that the planner doesn't find.

### Stereochemistry (`configuration.js`, `stereo-outcome.js`)

* **Drawing.** A single bond may carry `stereo: "wedge" | "dash"` with its narrow end at `bond.a`, the stereocentre it
  describes. Structure mode's **Wedge** tool (key W) cycles a bond plain → wedge → dash, with the narrow end at the
  atom nearer the click. R/S is printed beside each stereocentre and E/Z beside each C=C; the working-out panel gives
  the descriptor, whether the drawn isomer is chiral or meso, and why a centre has no descriptor.
* **R/S** comes from each neighbour's page direction (y turned over) lifted towards the viewer for a wedge and away for
  a dash; a hidden H points away from the other three. **E/Z** comes from which side of the C=C the higher-priority
  group on each carbon is drawn. Priorities use `cipRank` from `mol.js`.
* **Chiral, meso and isomer relations** compare descriptors attached to each atom's symmetry class, so a meso compound's
  mirror image comes out identical: `relation()` gives identical, enantiomers, diastereomers or constitutional.
* **Stereo SMILES** (`@`, `@@`, `/`, `\`) are laid out with wedges and C=C geometry read straight from the SMILES syntax.
  (mol.js's 3D embedding was not used for this: it can settle maleic acid and some trisubstituted alkenes into the
  wrong E/Z isomer.)
* **Through reactions** (`stereo-outcome.js`, run after every prediction): an untouched stereocentre keeps its
  arrangement (its label can change with priorities, and the lab says why); SN2 inverts a drawn centre; SN1 racemises
  it; Br₂ adds anti and H₂/Ni and cold KMnO₄ add syn, so E- and Z-alkenes give different products (E-but-2-ene + Br₂
  → meso, Z → racemate; the reverse for syn); a ring C=C gives trans (anti) or cis (syn); HBr, steam, NaBH₄, HCN and
  Grignard reagents attack either face. An achiral starting material can only give achiral, meso or racemic products;
  a new centre next to an existing one gives diastereomers in amounts the lab doesn't predict. Lindlar gives the Z
  alkene; an elimination is drawn as its major E isomer. Each product carries `config: { text, form, centres, bonds,
  notes }`, shown on its card ("(2S,3R)-2,3-dibromobutane · meso") and sent to the tutor, whose prompt forbids it
  from assigning descriptors itself.
* Tests: `tests/configuration.test.mjs` (hand-worked cases, 20 stereo SMILES against mol.js, E/Z, meso) and
  `tests/stereo-outcome.test.mjs` (the textbook outcomes above).

## 3. Roadmap

| Phase | Content | Status |
|---|---|---|
| 1 Mechanism engine | electron-flow model, curly and fishhook arrows, lone pairs, charges, bond making/breaking, validation, step classification | **Built** (`reactions/electron-flow.js`, `tests/mechanism.test.mjs`) |
| 2 Reaction library | mechanisms: SN2, SN1, E1, E2, HBr and Br₂ addition, HBr + propyne (vinyl cation), HCN, NaBH₄ and Grignard addition, nitronium formation, nitration, chlorination (AlCl₃), bromination (FeBr₃), Friedel–Crafts acylation, water and ammonia with ethanoyl chloride, acid- and base-catalysed ester hydrolysis, radical chlorination | **Built: 20 mechanisms, 35 reagent rules**, each with a level and an evidence record. Next: esterification, nitration of a substituted ring (why ortho/para), alkene hydration |
| 3 Interactive teaching | animation from mechanism data (play/pause/step/speed), four help levels (hint, explain, show next step, full solution), error highlighting | **Built** (deterministic help from template data) |
| 3 Modes | Structure, Mechanism, Reaction (Predict, Conditions, Synthesis), 3D | **Built** |
| 3b Competition | SN1/SN2/E1/E2 under chosen conditions, two sets side by side, predict the main pathway | **Built** (`competition.js`) |
| 4b Synthesis | forwards and backwards (retrosynthesis) challenges, hints from the shortest route, multiple routes accepted | **Built: 12 challenges** (`planner.js`). Next: learner-set targets, more challenges at advanced level |
| 4 Assessment | marks per arrow, attempts, outcomes recorded as lab evidence | **Built**: per-arrow marks, error carried forward, spot the error, exam style with a 10-mark breakdown and timer, four difficulty levels, adaptive and timed practice, multiple acceptable answers. Next: exam-board-specific question styles, free-text explanations (needs the tutor) |
| 5 Advanced | interactive R/S with CIP clicking, displayed formula view, bridged rings, wedges in 3D, synthesis planning | Not started (CIP routines exist in `mol.js`) |
| 5b Validation | evidence records, confidence and status, reviewer pack and import | **Built**; the review itself is waiting for a qualified chemist |
| 5c Stereochemistry | wedge/dash bonds, R/S and E/Z descriptors carried through reactions, isomer comparison | **Built** (see "Stereochemistry" above) |
| 6a AI tutor | explanations, comparison, Socratic guidance, diagnosis, synthesis help, mechanism verdicts, all bound to the engine's evidence level | **Built**. Release order: apply the migration `20261122120000_chemistry_tutor_mode.sql`, redeploy `course-tutor` and `study-pack`, then merge. If either backend step is late, the tutor answers "isn't available for this lab right now" with no Claude call and no use counted (`tests/chemistry-tutor-rollout.test.mjs`) |
| 6 Integration | AI tutor receives `tutorContext()` from the engine; notes; flashcards; mindmaps; study plans | Mechanisms save to the lab notebook and copy as flashcards; `tutorContext()` exists. Tutor endpoint not wired |

Principles kept throughout: no placeholder features (a mode or button appears only when it works), the AI never decides
chemical validity, and where the engine can't evaluate something it says so.

## Release gate

The lab ships only when all of these hold. Set after the review of PR #159 ([organic-review/REVIEW-FINDINGS.md](organic-review/REVIEW-FINDINGS.md)):

1. No known Major scientific correctness defect (names, products, stereochemistry, valid structures).
2. No known Major assessment or marking defect.
3. No reproducible freeze or data-loss defect.
4. Every confirmed finding has a regression test that fails without its fix.
5. The reference chemistry tests pass (`tests/organic-reference.test.mjs`, with the other lab suites below).
6. Browser checks pass at desktop, tablet and phone widths: `node scripts/check-organic-lab.cjs`, and
   `node scripts/check-interactives.cjs --serve . --course chemistry`.
7. CI passes against the latest `main`.

A passing suite is not chemistry validation: the 302 reference cases are still `provisional` until the independent
review (above) is done. The lab says so to learners: a notice above the mode tabs, visible in every mode, says the
chemistry is provisional until an independent chemist has reviewed it. Minor findings are tracked in [organic-review/BACKLOG.md](organic-review/BACKLOG.md).

## 4. Testing record

| Suite | What it checks |
|---|---|
| `tests/skeletal.test.mjs` | drawing model, naming, analysis |
| `tests/mechanism.test.mjs` | electron flow, validation, all 16 mechanisms replayed to named products, spot the error, error carried forward, registration |
| `tests/predictor.test.mjs` | predictor behaviour on starting materials and learners' own drawings, every product a valid molecule |
| `tests/organic-reference.test.mjs` | the 302-reaction reference set, with coverage of every reagent |
| `tests/planner.test.mjs` | every synthesis challenge solvable in exactly its stated length, retrosynthesis, competition, mark breakdowns |
| `tests/configuration.test.mjs` | R/S and E/Z from drawings against mol.js, isomer relations by definition, the 3D model's configuration |
| `tests/stereo-outcome.test.mjs` | the stereochemical outcome of each prediction |
| `tests/saved-work.test.mjs` | saved drawings, notebook pages and mechanism notes read back from storage: genuine ones round-trip, tampered ones are dropped, atom labels are escaped |
| `tests/chemistry-tutor-rollout.test.mjs` | the tutor at each stage of the backend release (old functions; functions without the migration, against the real ledger; both deployed): no Claude call or counted use until both are live, and a plain message for the learner |
| `tests/organic-review-csv.test.mjs` | the review pack's CSV: formula-like text neutralised, numbers and ordinary text unchanged |
| `scripts/check-organic-lab.cjs` | in Chromium: keyboard arrows and exam style, first-attempt marks, saved notes, declined cases in practice, the tutor's replies and its message when the backend doesn't support the lab yet, tampered saved work, and every mode at 1280, 820 and 390 px (including the provisional-chemistry notice) |

Run the whole suite with `npm test`. In environments without `node_modules`, 17 tests fail because `@electric-sql/pglite`,
`@anthropic-ai/sdk` and `ts-fsrs` aren't installed; those are environmental and unrelated to the lab, and are listed
separately in each report so they can't hide a real regression.
