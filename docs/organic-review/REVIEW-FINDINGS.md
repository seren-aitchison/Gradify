# Organic Chemistry Lab: Major review findings (PR #159)

CodeRabbit's first two reviews of PR #159 raised 30 **Major** findings (none Critical) and 34 Minor ones; its review of
the fixes raised 12 more Major findings and 20 Minor ones (section 5), and its review of those fixes one more Major
finding and 2 Minor ones (section 6). The Major findings block the merge; the Minor
ones are tracked in [BACKLOG.md](BACKLOG.md).

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

## 5. The review of the fixes (head `f2e983f1`)

The same procedure: each finding reproduced (or its code path traced) before changing anything, fixed at its cause, and
given a regression test that fails on `f2e983f1`. **All 12 were real; none was a false positive.**

| # | Where | Finding, as verified | Fix | Test |
|---|---|---|---|---|
| 31 | `lab3d.js` | The 3D model ignored the drawn E/Z: E-but-2-ene was built as the Z isomer, and E and Z shared a cache key. | The drawn C=C geometry is written into the builder's SMILES (`/` on a substituent bond at each end), checked with mol.js and corrected; the cache key includes it, and the panel says when a drawn configuration couldn't be built. | `configuration`: C=C geometry in 3D |
| 32 | `mechanism-ui.js` notes | An unfinished note that carried an error forward reopened without the marker, so the learner's own next step was checked against the model and rejected, and on the last step couldn't be carried again. | The note saves the marker; older notes get it from the first step where the route leaves the model's. | browser: reopen and finish an HBr route carried forward |
| 38 | `predictor.js` HBr on alkynes | Pent-2-yne gave 2,2- or 3,3-dibromopentane depending only on the order the bond's atoms were stored. | Equally substituted ends give both products; several such sites are declined. Bond order never decides. | `predictor`: alkynes |
| 33 | `predictor.js` alkyne hydration | Two tied alkyne sites returned one diketone, dropping the other choices. | The same shared rule: one tied site gives both ketones, several are declined. | `predictor`: alkynes |
| 34 | `predictor.js` rule record | Phenol + Br₂ (substitution, no mechanism) carried a rule record naming the alkene-addition mechanism, which the tutor received. | The applied rule record names the mechanism actually applied. | `predictor`: applied rule record |
| 36 | `skeletal.js` SMILES import | `c1cccc1` (aromatic atoms with no Kekulé structure) was imported as cyclopentane. | Refused with the reason; benzene, pyridine, naphthalene, pyrrole and caffeine still import. | `skeletal`: Kekulé |
| 39 | `stereo-outcome.js` | An ester reduction reported the acid half's new (planar-carbon) centre as a single stereoisomer, because the starting material's defined centre, which left with the alcohol half, counted. | A product is one stereoisomer only if it keeps a centre whose configuration the rule determines. | `stereo-outcome`: retained centres |
| 41 | `tests/organic-reference.test.mjs` | Exact-product expectations were compared as sets, so one molecule of ethanoic acid passed where two form. | Compared with counts; five reference cases now list their repeated products. | `organic-reference`: review pack |
| 35 | `scripts/organic-review.mjs` export | The export prefilled the verdict columns from recorded reviews, so returning an old sheet restored a replaced verdict. | The verdict columns start empty; the recorded review is shown read-only beside them. | `organic-reference`: review pack |
| 37 | `scripts/organic-review.mjs` CSV | A file ending inside a quoted field was imported, truncated last row included. | Refused, nothing imported. | `organic-reference`: review pack |
| 40 | `scripts/organic-review.mjs` write | `reviews.js` was rewritten in place, so a failed write could leave it truncated and break the next import. | Written to a temporary file beside it, then renamed over it. | code path (a disk failure can't be staged in a test) |
| 42 | `tests/data/organic-reference.mjs` | An "agree" stayed attached when a case's expected outcome was later edited, so the case still showed as reviewed. | A verdict records the outcome it was given for; an edited case goes back to provisional (flagged in the pack) until reviewed again. A "disagree" stays disputed. | `organic-reference`: review pack |

## 6. The review of the second round of fixes (head `5e082af5`)

| # | Where | Finding, as verified | Fix | Test |
|---|---|---|---|---|
| 43 | `scripts/organic-review.mjs` import | The #42 fix recorded each verdict against the case's outcome *at import time*, so an agreement returned on a sheet exported before the case changed still counted as reviewed, though the chemist saw the old outcome. | The exported sheet carries a machine-readable expectation key; the import records the key from the sheet, so an agreement on an older outcome stays provisional and is reported. A sheet without the column records no key (its agreements can't count as reviewed). | `organic-reference`: review pack, including an export → CSV → import round trip |

