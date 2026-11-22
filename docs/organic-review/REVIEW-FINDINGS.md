# Organic Chemistry Lab: Major review findings (PR #159)

CodeRabbit's two reviews of PR #159 raised 30 **Major** findings (none Critical) and 34 Minor ones. The Major findings
blocked the merge; the Minor ones are tracked in [BACKLOG.md](BACKLOG.md).

Every Major finding was verified before any code changed, by reproducing it (a probe on the PR's head, `fd37323`) or,
where only a browser could reproduce it, by reading the code path end to end. **All 30 were real; none was a false
positive.** Each was fixed at its cause rather than for the reported example, and each has a regression test that
fails on `fd37323` and passes now (unit tests in `tests/`, browser checks in `scripts/check-organic-lab.cjs`).
Expected answers in the tests come from standard chemistry, not from the lab's own output.

## 1. Chemistry: names, products, stereochemistry and valid molecules

| # | Where | Finding, as verified | Fix | Test |
|---|---|---|---|---|
| 16 | `skeletal.js` naming | `CC(=O)Cl` was named "1-chloroethanal": a C=O carbon without hydrogen counted as an aldehyde, overriding the library's "ethanoyl chloride". | An aldehyde needs a C–H on the carbonyl carbon; other carbonyls fall back to the library. | `skeletal`: names, ethanoyl chloride |
| 6 | `predictor.js` `pieces` | Acid hydrolysis of methyl methanoate filed methanoic acid as a by-product. | The shared fragment classifier no longer treats HCOOH as small; hot KMnO₄ oxidises it to CO₂ + H₂O in `cleave` itself. | `predictor`: products |
| 14 | `predictor.js` `cleave` | Ethene + hot KMnO₄ (oxidised to CO₂ and water) was reported as "no reaction". The hand-written reference case recorded the same error, though its own note said "oxidised completely to CO₂". | Reported as a reaction with no organic product (CO₂ + H₂O), through the display, practice answers and `explainContext`. Reference case corrected, with the harness now checking inorganic products. | `predictor`: products; reference set |
| 7 | `predictor.js` `nitriles` | N≡N was "hydrolysed" to "HNO₂". | A nitrile is matched only as C≡N. | `predictor`: site recognition |
| 8 | `predictor.js` `sixRings` | Pyridine was nitrated (and halogenated, acylated) with benzene's rules. | Benzene rules use all-carbon rings; a heteroaromatic ring is declined with the reason. Evidence records updated. | `predictor`: site recognition |
| 9 | `predictor.js` `markovnikov` | Ph–CH=C(CH₃)₂ + HBr made the tertiary bromide major while telling the learner "the X goes on the carbon next to the ring". Related, found while checking: Ph–CH=CH–CH₃ was called a 50:50 mixture, though the benzylic cation makes (1-bromopropyl)benzene major. | The benzylic preference decides when the benzylic carbon is at least as substituted; when it is less substituted, the two effects conflict and the case is declined. Evidence record updated. | `predictor`: HBr |
| 12 | `predictor.js` HBr | An enyne added HBr at C=C and silently left C≡C, though the rule covers both. | Molecules with both are declined until the selectivity is modelled. Evidence record updated. | `predictor`: HBr |
| 21 | `predictor.js` bromine water | 3-Methylphenol gave a dibromo product: the crowded-site rule for choosing between positions removed position 2. Bromine water gives 2,4,6-tribromo-3-methylphenol. | Bromine water uses every free position ortho and para to –OH/–NH₂/–O⁻, without the crowding rule. | `predictor`: bromine water |
| 11 | `predictor.js` `hydrolyse` | Alkaline hydrolysis of ethanoic anhydride gave one ethanoate and one neutral ethanoic acid. | The bridge oxygen becomes the second carboxylate in alkali; the explanation now says two carboxylate ions. | `predictor`: hydrolysis |
| 13 | `predictor.js` NaOH(aq) | 2-Chloropropanal gave a halide-only prediction, contradicting the rule's own evidence record ("declines molecules with both a halogen and a C=O"). | A halogen with an aldehyde or ketone is declined whatever the hydrolysis step found. | `predictor`: hydrolysis |
| 22 | `predictor.js` Grignard | 4-Hydroxybenzaldehyde got Grignard addition, though the evidence record says the reagent is "destroyed by O–H groups": phenols escaped the alcohol-only check. | Any O–H (alcohol, phenol, acid, water) gives "No addition". | `predictor`: Grignard |
| 10, 23 | `predictor.js` oxidation, esterification | A drawn O–H (or aldehyde H) stayed attached when the rule changed that atom's bonds, giving an oxygen with three bonds, reported as a successful reaction. | Rules now run on the drawing with drawn H made implicit (H on sp³ carbon is kept: it may carry a wedge), and any prediction whose products aren't valid structures is withdrawn ("couldn't build a valid product") instead of shown. | `predictor`: drawn hydrogens; every product valid |
| 24 | `predictor.js` `drawSmiles` | `CCO.CCBr` laid out only ethanol and predicted on it. Latent: no authored SMILES contains a mixture today. | Mixtures are refused with the reason. | `predictor`: mixtures |
| 28 | `skeletal.js` `graphFromSmiles` | `[O]` became water (and `[CH3]` methane): the drawing model always fills valence with implicit H. Latent: no authored SMILES uses one today. | Bracket atoms with fewer H than their valence needs are refused (the model can't draw radicals); all 195 library entries still load. | `skeletal`: SMILES import |
| 29 | `skeletal.js` identity hash | Prismane and K3,3 (both C₆H₆, every carbon CH with three carbon neighbours) got the same hash, and the hash is the identity everywhere (planner, challenges, isomer relations, library names). | For a molecule with rings the hash includes a canonical certificate from individualisation–refinement, so equal hashes mean the same molecule exactly. Acyclic molecules are unchanged (colour refinement is exact for them). | `skeletal`: identity |
| 1 | `configuration.js` `relation` | 8 of the 256 pairs of 2,3,4,5-tetrafluorohexane stereoisomers were wrong (e.g. RRSS and RSRS called identical): descriptors were matched class by class, allowing a different symmetry for each class. | The fingerprint places all descriptors by one whole-molecule mapping (the canonical orderings, which differ exactly by the molecule's symmetries) and takes the smallest. Checked against the definition for 2 to 5 centres (1,360 pairs). | `configuration`: relation |
| 2 | `configuration.js` `setEZ`, `setSides` | Reflecting one end of a C=C to set E/Z also flipped R/S at a wedged centre on that end (`C/C=C\[C@H](F)Cl` drawn as 1S; mol.js gives R). | One reflection routine for both, which swaps wedges and dashes in the reflected branch. Drawn R/S and E/Z now agree with mol.js in all 32 combinations tested. | `configuration`: setting C=C geometry |
| 26 | `stereo-outcome.js` | Br₂ on C=CCC/C=C/CC (a lone new centre plus an anti pair) was called one racemate; related, found while checking: two anti-added pairs were called meso. | Stereoisomer mixtures are decided by independent addition units (each syn/anti pair once, each lone centre once). | `stereo-outcome`: addition units |
| 19 | `lab3d.js` | The 3D model was built from SMILES without `@`/`@@`, so it could show the opposite configuration to the wedges drawn, and swapping a wedge didn't even rebuild it. | `build3d` tags drawn stereocentres, checks R/S with mol.js and corrects any that came out the other way; the cache key includes the drawn configuration; the "model picks one" note is limited to centres drawn flat. | `configuration`: 3D model |

## 2. Assessment and marking

| # | Where | Finding, as verified | Fix | Test |
|---|---|---|---|---|
| 5 | `mechanism-ui.js` first attempt | A first submission the engine rejected (SN2 with each arrow twice) earned full step credit because every expected arrow appeared, so a corrected retry scored 10/10 and the unaided challenge. | `marking.stepCredit`: full credit only for a valid step matching the model; otherwise found arrows less extra ones, capped below full. | `mechanism`: first-attempt credit; browser |
| 20 | `mechanism-ui.js` exam style | Only pointer input waited for the conditions question: the keyboard lists, Add arrow, Enter and Check step could finish the mechanism and skip it, scoring 10/10 without the conditions criterion. | One lock on every way of adding or checking arrows until the question is answered. | browser |
| 4 | `mechanism-ui.js` keyboard arrows | Keyboard users couldn't choose which end of a bond forms the new bond; the automatic choice was wrong for nitration step 1 and Friedel–Crafts acylation step 2, so the model answer couldn't be entered. | A "New bond forms from" choice appears for bond → atom arrows (automatic stays the default). | browser: nitration step 1 from the keyboard, full credit |
| 25 | `reaction-ui.js` | A declined prediction was graded with "No reaction" as the right answer, in practice questions and predict-first. | Practice never asks a declined case; predict-first shows a declined case instead of asking it. | browser: 40 practice questions, none declined |

## 3. Stability

| # | Where | Finding, as verified | Fix | Test |
|---|---|---|---|---|
| 15 | `skeletal.js` systematic naming | A nine-carbon ring passed the ring guard (rings are listed up to eight atoms) and the substituent walk went round it until the array overflowed: a frozen tab. | Rings of any size are detected by cycle rank before systematic naming. | `skeletal`: rings of any size |
| 3 | `mechanism-ui.js` loading notes | Opening a saved mechanism with every step done threw (it read the step after the last). | A finished note opens complete, shown with its products and not re-marked; unfinished notes stay editable. | browser |

## 4. State handling and reviewer data

| # | Where | Finding, as verified | Fix | Test |
|---|---|---|---|---|
| 27 | `tutor-ui.js` | A reply for a conversation the learner had replaced (another reaction, a reset, a new question) was appended to the new one, under its evidence label, and blocked the new request. | Each conversation has a generation; stale replies, failures, usage and the busy flag are ignored. | browser: late reply dropped, new question sent |
| 17 | `scripts/organic-review.mjs` | An import with invalid rows still rewrote `reviews.js` with the rest, deleting the recorded verdicts. | Any invalid row aborts the import before writing. | `organic-reference`: review import |
| 30 | `scripts/organic-review.mjs` | Every import started from nothing, so a partial return dropped earlier verdicts, including unresolved disagreements. | Imports merge into the recorded verdicts; a blank row changes nothing; `clear` removes a verdict explicitly. README updated. | `organic-reference`: review import |
| 18 | `tests/organic-reference.test.mjs` | The test rejected the `disputed` confidence that a reviewer's "disagree" produces, so the documented review workflow would break the build. | `disputed` accepted; the case must still match the predictor. | `organic-reference`: review import |
