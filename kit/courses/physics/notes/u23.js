// Unit 23: Nuclear Physics. Format: kit/course/notes.js. Content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives, level, key terms, summaries, evidence status, typed and dated sources, and questions at three levels.
export default `
## Nuclear structure
S: The nucleus is a tightly bound cluster of protons and neutrons held together by the strong nuclear force. Its structure, with shells, pairing and collective motions, explains stability, radioactivity and the energy of stars and reactors.
O: Use nuclide notation to find Z, N and A, and classify isotopes, isobars and isotones
O: Compare the liquid-drop, shell and collective models and what each explains
O: Explain the significance of magic numbers
PRE: Atomic structure
LV: A level · Foundation
H: Notation
E: ^{A}_{Z}X :: Z protons, N = A − Z neutrons, nucleon number A
- Isotopes: same Z; isobars: same A; isotones: same N.
- About 3300 nuclides are known; about 250 are stable.
H: Models
- **Liquid drop**: the nucleus as an incompressible charged drop; gives the semi-empirical mass formula and explains fission.
- **Shell model** (Mayer and Jensen, Nobel 1963): nucleons in orbits with strong spin–orbit coupling; magic numbers 2, 8, 20, 28, 50, 82, 126 give extra stability.
- **Collective model**: deformed nuclei rotate and vibrate (rotational bands).
- **Ab initio**: calculations from nucleon–nucleon forces derived from QCD's symmetries (chiral effective field theory), for light nuclei.
H: Shapes
P: Many nuclei are slightly deformed (rugby-ball shaped); a few are pear-shaped (radium-224, used to probe symmetry violations). Halo nuclei such as lithium-11 have neutrons extending far outside the core, making them comparable in size to much heavier nuclei.
X: How many neutrons in ^{238}_{92}U?
> N = A − Z = 238 − 92 = 146
K: No single model describes every nucleus: the liquid drop captures bulk energy, the shell model the extra stability of magic numbers.
!: The nucleus isn't a static bag of balls; nucleons move rapidly (~0.25c) in quantum orbits.
T: Nuclide | A nucleus with a specified number of protons and neutrons
T: Magic number | A proton or neutron number (2, 8, 20, 28, 50, 82, 126) that completes a shell and gives extra stability
T: Isobars | Nuclides with the same nucleon number A but different Z
SUM: ^{A}_{Z}X: Z protons, A − Z neutrons.
SUM: Liquid-drop, shell and collective models each explain different features.
SUM: Magic numbers mark closed nuclear shells.
EV: established | The shell model with spin–orbit coupling explains the observed magic numbers; the liquid-drop model explains bulk binding and fission
SRC: OpenStax, University Physics Volume 3, section 10.1 "Properties of Nuclei" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-1-properties-of-nuclei
SRC: OpenStax, College Physics 2e, section 31.3 "Substructure of the Nucleus" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-3-substructure-of-the-nucleus
Q: What are magic numbers? | Numbers of protons or neutrons (2, 8, 20, 28, 50, 82, 126) giving closed shells and extra stability.
Q: Which model explains nuclear fission well? | The liquid-drop model.
M1@3: Doubly magic lead-208 has: | 82 protons and 126 neutrons | 126 protons and 82 neutrons | 82 protons and 82 neutrons | 208 protons and no neutrons | Lead has Z = 82, so N = 208 − 82 = 126: both numbers are magic, making it exceptionally stable.
M2@1: Isotopes have the same: | Number of protons | Number of neutrons | Nucleon number | Nuclear mass | Isotopes are the same element, so they share Z, but differ in N and therefore in A and mass.
TF1@1: Carbon-14 and nitrogen-14 are isobars. | true | Both have A = 14, with different Z (6 and 7), which is the definition of isobars.
NUM2@1: How many neutrons are in ^{56}_{26}Fe? | 30 | 0 | neutrons | N = A − Z = 56 − 26 = 30 neutrons, a little more than the 26 protons.
M3@2,3: Why does the simple liquid-drop model fail to predict the extra stability of tin (Z = 50)? | It treats nucleons as a uniform fluid with no shell structure | It ignores Coulomb repulsion between protons | It only applies to light nuclei | It assumes nuclei have no surface | The liquid drop varies smoothly with Z and N; shell closures are quantum effects of individual orbits, captured only by the shell model.
SA2@2,3: Compare the liquid-drop and shell models of the nucleus, giving one success of each. | The liquid-drop model treats the nucleus as a uniform, incompressible charged drop, with volume, surface, Coulomb and asymmetry energies; it reproduces the smooth trend of binding energy and explains fission as deformation of a drop. The shell model treats nucleons as moving independently in an average potential with strong spin–orbit coupling; it explains the magic numbers, the spins of ground states and the extra stability of nuclei such as lead-208. | Liquid drop: uniform charged drop ; Its energy terms or binding trend ; Explains fission ; Shell model: independent nucleons with spin–orbit coupling ; Explains magic numbers or spins

## Protons, neutrons and nucleons
S: Protons and neutrons, together called nucleons, are the building blocks of nuclei. They're nearly identical in mass and strong interaction, differing mainly in charge, and each is made of three quarks.
O: State the charges, masses and quark content of the proton and neutron
O: Explain why a free neutron decays but a free proton does not
O: Explain what isospin and the nucleon magnetic moments reveal
PRE: Atomic structure
LV: GCSE and A level · Foundation
H: Properties
- Proton: +e (1.60 × 10^{-19} C), 938.27 MeV/c^{2} (1.673 × 10^{-27} kg), spin ½, stable (lifetime > 10^{34} years).
- Neutron: charge 0, 939.57 MeV/c^{2}, spin ½; a free neutron decays (n → p + e^{−} + ν̄_{e}) with lifetime ~880 s.
- Magnetic moments: proton +2.79 μ_{N}; neutron −1.91 μ_{N}: a neutral particle with a magnetic moment must have internal structure.
- Proton charge radius ~0.84 fm.
H: Quark content
- Proton uud (2/3 + 2/3 − 1/3 = +1); neutron udd (2/3 − 1/3 − 1/3 = 0).
- Quark masses supply only ~1% of the nucleon mass; the rest is the energy of the gluon field and quark motion (QCD).
H: Isospin
P: Because the strong force treats protons and neutrons almost identically, Heisenberg described them as two states of one particle, the nucleon (isospin). Mirror nuclei such as ^{3}H and ^{3}He have nearly identical spectra. The small neutron–proton mass difference (1.29 MeV) comes from quark masses and electromagnetism, and it is what makes hydrogen atoms stable.
H: The neutron lifetime puzzle
- Beam experiments give ~888 s; bottle (trap) experiments ~878 s: an unresolved discrepancy.
X: Why can a free neutron decay but a proton can't (in vacuum)?
> m_{n} > m_{p} + m_{e} by 0.78 MeV: neutron decay releases energy
> p → n + e^{+} + ν_{e} would need energy input
K: Proton and neutron differ by one quark (uud against udd) and 0.14% in mass; that small difference makes the free neutron unstable.
!: Neutrons are stable inside most nuclei, because decay there would leave the nucleus in a higher energy state.
T: Nucleon | A proton or neutron
T: Isospin | A quantum number treating proton and neutron as two states of one particle under the strong force
SUM: Proton uud, +e, stable; neutron udd, neutral, free lifetime ~15 min.
SUM: m_{n} − m_{p} = 1.29 MeV/c^{2} allows free neutron decay.
SUM: Magnetic moments and isospin reveal internal quark structure.
EV: established | Nucleons are three-quark bound states; the free neutron decays with a lifetime of about 880 s, though beam and bottle methods disagree by about 9 s
SRC: AQA, A-level Physics specification (7408), section 3.2.1.1 Constituents of the atom | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 31.3 "Substructure of the Nucleus" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-3-substructure-of-the-nucleus
Q: What is a nucleon? | A proton or neutron.
Q: Why is the neutron's magnetic moment evidence of structure? | A neutral point particle wouldn't have one; it comes from its charged quarks.
M1@1: The neutron's quark content is: | udd | uud | uuu | ddd | Charges 2/3 − 1/3 − 1/3 add to zero; uud gives the proton's +1.
M2@2: The free neutron lifetime is about: | 15 minutes | 1 second | 1 year | 10^{34} years | About 880 s, roughly 15 minutes; 10^{34} years is the lower limit on the proton's lifetime.
TF1@1: The proton and neutron have almost the same mass. | true | 938.27 and 939.57 MeV/c^{2} differ by only 0.14%, which is why both are taken as 1 u in simple calculations.
NUM2@2: Using m_{n} = 939.57, m_{p} = 938.27 and m_{e} = 0.511 MeV/c^{2}, find the energy, in MeV, released in free neutron decay (ignore the neutrino mass). | 0.79 | 0.01 | MeV | Q = 939.57 − 938.27 − 0.511 = 0.789 MeV, shared between the electron, antineutrino and recoiling proton.
M3@2,3: Why doesn't the neutron in a deuteron decay? | The decay products would have less binding, so the process would need energy | The strong force forbids beta decay | Deuterons contain no down quarks | Neutrinos can't escape from nuclei | Converting the bound neutron to a proton would give two protons, which are unbound; the total energy would rise, so decay is impossible.
SA2@1,3: Describe the evidence that protons and neutrons are not fundamental particles. | The neutron is electrically neutral yet has a magnetic moment of −1.91 μ_{N}, and the proton's moment, 2.79 μ_{N}, differs from the value of 1 μ_{N} expected for a point Dirac particle; both are explained by moving charged constituents. Electron scattering shows the proton has a finite charge radius (~0.84 fm), and deep inelastic scattering reveals point-like quarks inside it. The quark model (uud, udd) also accounts for their charges and for the whole family of related hadrons. | Neutron magnetic moment despite zero charge ; Proton moment not equal to 1 μ_{N} ; Finite size from electron scattering ; Deep inelastic scattering shows quarks ; Quark content explains charges

## Nuclear size and density
S: Nuclei are a few femtometres across, and their radius grows as the cube root of the number of nucleons. This means all nuclei have roughly the same density, about 2 × 10^{17} kg m^{-3}.
O: Use R = r_{0}A^{1/3} to calculate nuclear radii and compare nuclei
O: Show that nuclear density is independent of A and explain why
O: Describe how electron scattering measures nuclear radii
PRE: Rutherford scattering
LV: A level · Application
H: Radius
E: R = r_{0}A^{1/3}, r_{0} ≈ 1.2 fm
- Measured by electron diffraction (the first minimum gives the radius), muonic atoms and alpha scattering.
- Charge density is roughly constant inside, falling off over a ~2 fm surface (Fermi distribution).
H: Constant density
P: Volume ∝ R^{3} ∝ A, so density is constant: nucleons pack like an incompressible liquid. This saturation reflects the short range of the nuclear force: each nucleon interacts only with its neighbours. Neutron stars are like giant nuclei held together by gravity, at similar densities.
H: Electron scattering
- Hofstadter (Nobel 1961) used high-energy electrons (λ ~ fm) to map nuclear and proton charge distributions.
- Electrons feel only the electromagnetic force, so they probe charge cleanly; for a first minimum at θ, sin θ ≈ 1.22λ/(2R).
X: Radius of ^{208}Pb?
> R = 1.2 fm × 208^{1/3} = 1.2 × 5.92 = 7.1 fm
K: R ∝ A^{1/3} means nuclear volume ∝ A: every nucleus has about the same density, ~2 × 10^{17} kg m^{-3}.
!: Nuclear "size" depends on what's probed: charge radius and matter radius can differ (neutron skins in heavy nuclei).
T: r_{0} | The constant in R = r_{0}A^{1/3}, about 1.2 fm (1.2 × 10^{-15} m)
T: Saturation | The property that each nucleon binds only to near neighbours, giving constant density and binding per nucleon
SUM: R = 1.2 A^{1/3} fm.
SUM: Nuclear density ≈ 2 × 10^{17} kg m^{-3}, the same for all nuclei.
SUM: Electron diffraction gives radii without the strong force complicating the picture.
EV: established | Electron-scattering data show nuclear radii scale as A^{1/3} with r_{0} ≈ 1.2 fm and a nearly constant interior density
SRC: AQA, A-level Physics specification (7408), section 3.8.1.5 Nuclear radius | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, University Physics Volume 3, section 10.1 "Properties of Nuclei" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-1-properties-of-nuclei
Q: How does nuclear radius depend on mass number? | R = r_{0}A^{1/3}.
Q: Why is nuclear density roughly constant? | The strong force saturates: nucleons interact only with near neighbours, packing like a liquid.
M1@1: A nucleus with 8 times the nucleons has radius: | 2 times larger | 8 times larger | 4 times larger | Exactly the same | R ∝ A^{1/3}, and 8^{1/3} = 2, so the radius doubles while the volume grows eightfold.
M2@2: Nuclear density is about: | 2 × 10^{17} kg m^{-3} | 10^{3} kg m^{-3} | 10^{10} kg m^{-3} | 10^{30} kg m^{-3} | A nucleon mass of 1.67 × 10^{-27} kg in a volume of (4/3)π(1.2 fm)^{3} gives about 2.3 × 10^{17} kg m^{-3}.
NUM2@1: Calculate the radius, in fm, of a ^{27}Al nucleus using r_{0} = 1.2 fm. | 3.6 | 0.05 | fm | R = 1.2 × 27^{1/3} = 1.2 × 3 = 3.6 fm.
TF1@3: High-energy electrons are better than alpha particles for measuring nuclear radii because they don't feel the strong force. | true | Electrons interact only electromagnetically (and weakly), so their diffraction pattern reflects the charge distribution directly.
M3@2,3: Gold (A = 197) and aluminium (A = 27) nuclei are compared. What is the ratio of their densities? | About 1 | About 7.3 | About 1.9 | About 53 | Mass ∝ A and volume ∝ A, so the ratio is close to 1; only the radii differ, by (197/27)^{1/3} ≈ 1.9.
SA3@1,2: Show that nuclear density is independent of nucleon number, estimate its value, and explain what this tells us about the nuclear force. | The mass is about A × 1.67 × 10^{-27} kg and the volume (4/3)π(r_{0}A^{1/3})^{3} = (4/3)πr_{0}^{3}A, so A cancels in the density. With r_{0} = 1.2 fm the volume per nucleon is 7.2 × 10^{-45} m^{3}, giving ρ ≈ 2.3 × 10^{17} kg m^{-3}. Constant density means adding nucleons doesn't compress the nucleus: each nucleon interacts only with its nearest neighbours, so the nuclear force is short-range and saturates, with a repulsive core keeping nucleons apart. | Mass ∝ A ; Volume ∝ A so A cancels ; Numerical estimate ~10^{17} kg m^{-3} ; Implies short-range, saturating force ; Mentions repulsive core or liquid analogy

## Nuclear binding energy
S: Binding energy is the energy needed to pull a nucleus apart into separate protons and neutrons. Its value per nucleon peaks near iron, which is why fusing light nuclei and splitting heavy ones both release energy.
O: Calculate binding energy and binding energy per nucleon from masses
O: Interpret the binding energy per nucleon curve for fission and fusion
O: Explain the terms of the semi-empirical mass formula
PRE: Protons, neutrons and nucleons
LV: A level · Application
H: Definition
E: B = [Zm_{H} + Nm_{n} − M_{atom}]c^{2} :: using atomic masses, so electron masses cancel
- Per nucleon: 1.1 MeV (^{2}H), 7.1 MeV (^{4}He), 8.8 MeV peak (^{62}Ni, ^{56}Fe), 7.6 MeV (^{238}U).
H: Semi-empirical mass formula
E: B = a_{V}A − a_{S}A^{2/3} − a_{C}Z(Z − 1)/A^{1/3} − a_{A}(A − 2Z)^{2}/A ± δ
- Volume (+), surface (−), Coulomb (−), asymmetry (−), pairing (±).
- Coefficients (MeV): a_{V} ≈ 15.8, a_{S} ≈ 18.3, a_{C} ≈ 0.71, a_{A} ≈ 23.2.
H: The curve's meaning
P: Light nuclei gain binding by fusing (stars); heavy nuclei gain by splitting (reactors). Iron and nickel sit near the peak, so fusion beyond the iron group absorbs energy: a massive star's core that has burned to iron can no longer support itself and collapses, triggering a supernova.
X: Binding energy of ^{4}He (atomic mass 4.002 602 u; ^{1}H 1.007 825 u; n 1.008 665 u)?
> Δm = 2(1.007 825) + 2(1.008 665) − 4.002 602 = 0.030 378 u
> B = 0.030 378 × 931.5 = 28.3 MeV, or 7.07 MeV per nucleon
K: Any reaction that moves nuclei towards the peak of the B/A curve (near iron) releases energy.
!: Binding energy is energy released when a nucleus forms, so more binding means less mass, not more.
T: Binding energy | The energy needed to separate a nucleus completely into its protons and neutrons
T: Binding energy per nucleon | B/A, a measure of how tightly each nucleon is held; a higher value means a more stable nucleus
SUM: B = Δmc^{2}; B/A peaks at ~8.8 MeV near iron.
SUM: Fusion of light and fission of heavy nuclei both increase B/A and release energy.
SUM: The liquid-drop formula gives B from volume, surface, Coulomb, asymmetry and pairing terms.
EV: established | Measured nuclear masses give a binding energy per nucleon curve peaking near A ≈ 56–62, reproduced to about 1% by the semi-empirical mass formula
SRC: OpenStax, University Physics Volume 3, section 10.2 "Nuclear Binding Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-2-nuclear-binding-energy
SRC: AQA, A-level Physics specification (7408), section 3.8.1.6 Mass and energy | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Where does binding energy per nucleon peak? | Near iron and nickel (A ≈ 56–62).
Q: What do the terms of the semi-empirical mass formula represent? | Volume, surface, Coulomb repulsion, neutron–proton asymmetry and pairing effects.
M1@2: Fission releases energy because: | The products have higher binding energy per nucleon | Neutrons gain mass as they move | Electrons are released from the atom | The total mass of the products is larger | The fragments lie nearer the iron peak, so they are more tightly bound; the extra binding energy is released.
M2@3: The Coulomb term reduces binding because: | Protons repel each other | Neutrons attract each other | Electrons screen the nucleus | The nuclear surface is curved | Every pair of protons repels electrically, an energy growing as Z^{2}/A^{1/3}, which offsets part of the nuclear attraction.
NUM2@1: Uranium-235 has a binding energy of 1784 MeV. What is its binding energy per nucleon, in MeV? | 7.59 | 0.02 | MeV | B/A = 1784/235 = 7.59 MeV per nucleon.
TF1@2: Splitting a nucleus of iron-56 into two lighter nuclei would release energy. | false | Iron is near the peak of the B/A curve; lighter fragments are less tightly bound, so energy would have to be supplied.
M3@2,3: A U-235 nucleus (B/A = 7.6 MeV) splits into two fragments with B/A = 8.5 MeV. Roughly how much energy is released? | About 210 MeV | About 0.9 MeV | About 2000 MeV | About 8.5 MeV | ΔB ≈ 235 × (8.5 − 7.6) ≈ 212 MeV, consistent with the ~200 MeV per fission observed.
SA3@2,3: Explain, using the binding energy per nucleon curve, why both fission and fusion release energy, and why stars can't gain energy by fusing beyond iron. | B/A rises steeply for light nuclei, peaks at about 8.8 MeV near iron and nickel, and falls slowly for heavy nuclei. Fusing light nuclei produces a nucleus with larger B/A, and splitting a heavy nucleus gives fragments with larger B/A; in each case the total binding increases, the products have less mass, and the difference is released as kinetic energy. Beyond the peak, fusion would decrease B/A, so it absorbs energy; once a star's core is iron, nuclear burning can't support it and it collapses. | Describes the curve with a peak near iron ; Fusion increases B/A ; Fission increases B/A ; Extra binding released as energy, less mass ; Fusion beyond iron absorbs energy, core collapse

## Mass defect
S: A nucleus weighs less than the sum of its separate protons and neutrons. The missing mass, the mass defect, is the binding energy divided by c^{2}: direct evidence that E = mc^{2}.
O: Calculate a mass defect and convert it to energy in MeV and J
O: Calculate the Q-value of a nuclear reaction from masses
O: Compare nuclear and chemical energy release
PRE: Protons, neutrons and nucleons
LV: A level · Application
H: Calculation
E: Δm = Zm_{p} + Nm_{n} − M_{nucleus}
E: B = Δmc^{2}; 1 u = 931.5 MeV/c^{2} = 1.661 × 10^{-27} kg
- With atomic masses, use the hydrogen-atom mass for each proton so that electron masses cancel.
H: Energy released in reactions
E: Q = (Σm_{initial} − Σm_{final})c^{2}
- Positive Q: energy released (exothermic).
- Nuclear reactions release ~MeV per reaction against ~eV for chemical ones: ~10^{6} times more energy per kilogram of fuel.
H: Mass measurements
P: Penning traps measure atomic masses to parts in 10^{11}. Comparing mass differences with the energies of emitted gamma rays tested E = mc^{2} directly, confirming it to about 4 parts in 10^{7} (Rainville and colleagues, 2005).
X: Q of D + T → ^{4}He + n (masses 2.014 102, 3.016 049, 4.002 602, 1.008 665 u)?
> Δm = 5.030 151 − 5.011 267 = 0.018 884 u
> Q = 0.018 884 × 931.5 = 17.6 MeV
K: Mass and energy are equivalent: whenever binding increases, the total rest mass falls by B/c^{2}.
!: The mass defect isn't missing matter; the energy was released when the nucleus formed, and mass and energy are equivalent.
T: Mass defect | The difference between the total mass of the separated nucleons and the mass of the nucleus
T: Atomic mass unit (u) | One twelfth of the mass of a carbon-12 atom, 1.661 × 10^{-27} kg, equivalent to 931.5 MeV
T: Q-value | The energy released in a reaction, the decrease in total rest mass times c^{2}
SUM: Δm = (sum of nucleon masses) − (nuclear mass); B = Δmc^{2}.
SUM: 1 u ↔ 931.5 MeV; Q > 0 means energy released.
SUM: Nuclear energy per kg is ~10^{6} times chemical.
EV: established | Measured mass defects agree with binding and reaction energies, testing E = mc^{2} to better than one part in 10^{6}
SRC: OpenStax, College Physics 2e, section 31.6 "Binding Energy" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-6-binding-energy
SRC: AQA, A-level Physics specification (7408), section 3.8.1.6 Mass and energy | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the mass defect? | The difference between the mass of separated nucleons and the nucleus.
Q: How much energy is 1 u? | About 931.5 MeV.
M1@2: The D–T fusion reaction releases about: | 17.6 MeV | 200 MeV | 4 eV | 1 GeV | The mass decrease of 0.0189 u times 931.5 MeV u^{-1} gives 17.6 MeV, shared by the alpha and the neutron.
M2@3: Nuclear fuels release ~how many times more energy per kg than chemical fuels? | ~10^{6} | ~10 | ~10^{12} | ~2 | Nuclear reactions release MeV per event and chemical ones eV, a ratio of about a million per reacting particle and per kilogram.
NUM2@1: A nucleus has a mass defect of 0.0300 u. What is its binding energy in MeV? | 27.9 | 0.1 | MeV | B = 0.0300 × 931.5 = 27.9 MeV.
TF1@1: A nucleus has a smaller mass than the sum of the masses of its separate protons and neutrons. | true | Energy is released when the nucleus forms, so its rest mass is lower by B/c^{2}: the mass defect.
M3@1,2: Using atomic masses, why do we use m(^{1}H) rather than m_{p} for each proton? | The hydrogen atoms bring Z electrons that cancel those in the atomic mass | Hydrogen atoms are lighter than protons | Neutrons need an electron each | It corrects for the neutrino mass | An atomic mass includes Z electrons; Z hydrogen atoms supply the same Z electrons, so they cancel (ignoring tiny electron binding energies).
SA2@1,3: Explain what is meant by mass defect and how it is related to binding energy, using helium-4 as an example. | A helium-4 nucleus has less mass than two free protons and two free neutrons. Using atomic masses, 2(1.007 825) + 2(1.008 665) − 4.002 602 = 0.030 378 u. This mass defect corresponds, by E = mc^{2}, to the binding energy: 0.030 378 × 931.5 = 28.3 MeV, the energy that would be needed to separate the nucleons and that was released when the nucleus formed. Binding energy per nucleon is 7.07 MeV. | Defines mass defect ; Correct calculation for helium-4 ; Uses E = mc^{2} or 931.5 MeV per u ; Binding energy as energy needed to separate or released on formation ; Per-nucleon value

## Nuclear forces
S: The nuclear force binds protons and neutrons despite the electric repulsion of protons. It's very strong at around 1 fm, repulsive at shorter distances and negligible beyond about 3 fm. It's a residual effect of the strong force between quarks.
O: Describe the range, strength, charge independence and spin dependence of the nuclear force
O: Estimate the range of a force from the mass of the exchanged particle
O: Explain why the nuclear force is a residual strong force
PRE: Coulomb's law
LV: Year 2 · Application
H: Properties
- Short range (~1–3 fm); much stronger than electromagnetism at those distances.
- Strongly repulsive core below ~0.5 fm.
- Charge-independent (pp, nn, np similar) to a good approximation.
- Spin-dependent: the deuteron (np) is bound only in the spin-1 state; there is no bound pp or nn.
- It has a tensor component: the deuteron is slightly non-spherical.
H: Meson exchange
E: range ≈ ħ/(m_{π}c) ≈ 1.4 fm
P: Yukawa (1935) proposed that the force is carried by a massive particle whose mass sets the range. The pion (140 MeV), discovered in 1947, fits. Heavier mesons explain the shorter-range repulsion. Today chiral effective field theory derives nuclear forces from QCD's symmetries, and lattice QCD computes them from quarks and gluons.
H: Three-nucleon forces
- Needed to reproduce binding energies of light nuclei and neutron-rich isotopes; important for neutron-star matter.
X: Estimate the range of a force carried by a 140 MeV particle.
> r ≈ ħc/(mc^{2}) = 197 MeV fm/140 MeV
> r ≈ 1.4 fm
K: The exchanged particle's mass sets the range: a pion of 140 MeV gives about 1.4 fm, the size of a nucleon.
!: The nuclear force isn't a fundamental force itself; it's the leftover of the strong force between colour-neutral nucleons, like van der Waals forces between neutral molecules.
T: Strong nuclear force | The short-range attraction between nucleons that binds nuclei
T: Yukawa potential | A potential ∝ e^{−r/R}/r for a force carried by a massive particle, with range R = ħ/(mc)
SUM: Attractive at ~1 fm, repulsive below ~0.5 fm, negligible beyond ~3 fm.
SUM: Charge-independent, spin-dependent, with a tensor part.
SUM: Pion exchange gives range ħ/(m_{π}c) ≈ 1.4 fm.
EV: established | The nuclear force is short-range, charge-independent and spin-dependent, and is described by meson exchange and chiral effective field theory derived from QCD
SRC: OpenStax, College Physics 2e, section 31.3 "Substructure of the Nucleus" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-3-substructure-of-the-nucleus
SRC: OpenStax, College Physics 2e, section 33.1 "The Yukawa Particle and the Heisenberg Uncertainty Principle Revisited" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/33-1-the-yukawa-particle-and-the-heisenberg-uncertainty-principle-revisited
Q: What sets the range of the nuclear force in Yukawa's theory? | The mass of the exchanged particle (pion): r ≈ ħ/(mc).
Q: Why is there no bound diproton? | The nuclear force isn't strong enough in the spin-0 pp state to overcome repulsion and kinetic energy.
M1@1: The nuclear force is: | Short-range and strong | Long-range and weak | Weaker than gravity | Purely repulsive | It is much stronger than electromagnetism within ~2 fm but falls off almost completely by ~3 fm.
M2@2: Yukawa predicted which particle? | The pion | The muon | The neutrino | The photon | He predicted a meson of ~100–200 MeV from the nuclear range; the pion (140 MeV) was found in 1947, while the muon found earlier was a lepton.
NUM2@2: Estimate the range, in fm, of a force carried by the ω meson (mass 783 MeV/c^{2}). Use ħc = 197 MeV fm. | 0.25 | 0.01 | fm | R ≈ ħc/(mc^{2}) = 197/783 = 0.25 fm: heavy-meson exchange explains the short-range repulsive core.
TF1@1: The nuclear force between two neutrons is about as strong as that between two protons at the same separation. | true | The nuclear force is charge-independent to a good approximation; only the extra Coulomb repulsion distinguishes pp from nn.
M3@1,3: Why doesn't the nuclear force bind nuclei into one huge lump, as gravity can for stars? | It saturates: each nucleon attracts only its near neighbours, and a repulsive core keeps them apart | It is weaker than gravity at all distances | It becomes repulsive beyond 3 fm | Neutrinos carry its energy away | Short range and the repulsive core mean binding energy grows only in proportion to A, giving constant density rather than collapse.
SA3@1,3: Explain why the nuclear force is described as a residual force and what sets its range. | Nucleons are colour-neutral bound states of quarks held by the strong force carried by gluons. Outside a nucleon the colour fields largely cancel, but when two nucleons come within about 1–2 fm, their quark and gluon distributions overlap and a residual attraction remains, like the van der Waals force between neutral molecules. In Yukawa's picture this residual force is carried by mesons; the lightest, the pion (140 MeV), gives range ħ/(m_{π}c) ≈ 1.4 fm, and heavier mesons produce the short-range repulsion. | Nucleons are colour-neutral ; Residual effect of strong force between quarks ; van der Waals analogy ; Meson exchange ; Range ħ/(mc) ≈ 1.4 fm for the pion

## Nuclear stability
S: Only certain combinations of protons and neutrons are stable. Light stable nuclei have equal numbers; heavier ones need extra neutrons to dilute proton repulsion. Nuclei off this "valley of stability" decay towards it.
O: Use the N–Z chart to predict how an unstable nuclide will decay
O: Explain why heavy stable nuclei have more neutrons than protons
O: Explain the effects of pairing and magic numbers on stability
PRE: Nuclear binding energy
LV: A level · Application
H: The chart of nuclides
- Plot N against Z: stable nuclei form a band, N ≈ Z for light nuclei and N ≈ 1.5Z for heavy ones (lead-208: 82 protons, 126 neutrons).
- Neutron-rich nuclei undergo β^{−} decay; proton-rich ones β^{+} decay or electron capture; very heavy ones alpha decay or fission.
- Nothing beyond lead is truly stable: bismuth-209 decays with half-life 2 × 10^{19} years.
H: Factors
- Pairing: even–even nuclei are the most numerous stable ones (~150); odd–odd nuclei are stable only for a few light ones (^{2}H, ^{6}Li, ^{10}B, ^{14}N).
- Magic numbers give extra stability: tin (Z = 50) has ten stable isotopes.
- Drip lines: limits beyond which an extra nucleon is not bound at all.
H: Island of stability
P: Theory predicts that superheavy nuclei near Z ≈ 114–120, N ≈ 184 may be relatively long-lived because of shell closures. Elements up to Z = 118 (oganesson) have been made, with half-lives of milliseconds; reaching the island needs more neutron-rich beams.
X: Is carbon-14 (6p, 8n) stable? Which way does it decay?
> Too many neutrons for its Z (stable carbon has 6 or 7)
> β^{−} decay to nitrogen-14 (half-life 5730 years)
K: Unstable nuclei decay in the direction that moves them back towards the stability band on the N–Z chart.
!: "Stable" means no observed decay; some long-lived nuclei (like bismuth-209) were once thought stable.
T: Valley of stability | The band of stable nuclides on a plot of N against Z
T: Drip line | The limit of the nuclide chart beyond which a nucleus can't bind another proton or neutron
SUM: N ≈ Z for light stable nuclei, N ≈ 1.5Z for heavy ones.
SUM: Neutron-rich → β^{−}; proton-rich → β^{+}/EC; heavy → α or fission.
SUM: Pairing and magic numbers enhance stability.
EV: established | The pattern of stable nuclides follows from the balance between nuclear binding, Coulomb repulsion, asymmetry and pairing energies
SRC: AQA, A-level Physics specification (7408), section 3.8.1.4 Nuclear instability | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 31.3 "Substructure of the Nucleus" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-3-substructure-of-the-nucleus
Q: Why do heavy stable nuclei have more neutrons than protons? | Extra neutrons add nuclear binding without adding Coulomb repulsion.
Q: How do neutron-rich nuclei decay? | By β^{−} decay, turning a neutron into a proton.
M1@1: The heaviest element with a stable isotope (no decay ever observed) is: | Lead | Uranium | Iron | Bismuth | Lead-208 is stable; bismuth-209 was found in 2003 to alpha-decay with a half-life of about 2 × 10^{19} years.
M2@3: The island of stability is predicted near: | Z ≈ 114–120, N ≈ 184 | Iron, Z = 26 | Helium, Z = 2 | Z ≈ 60, N ≈ 90 | Shell-model calculations predict the next closed shells for superheavy nuclei around these numbers, which could give longer half-lives.
TF1@1: A proton-rich nucleus will typically undergo β^{−} decay. | false | β^{−} turns a neutron into a proton, making it even more proton-rich; proton-rich nuclei undergo β^{+} decay or electron capture.
NUM2@2: Lead-208 has Z = 82. What is its ratio N/Z, to two decimal places? | 1.54 | 0.01 | (ratio) | N = 208 − 82 = 126; 126/82 = 1.54, typical of heavy stable nuclei.
M3@1,2: Phosphorus-30 (Z = 15, N = 15) lies on the proton-rich side for its mass. How is it most likely to decay? | β^{+} decay to silicon-30 | β^{−} decay to sulfur-30 | Alpha decay to aluminium-26 | Gamma decay only | Stable nuclei with A ≈ 30 have N slightly above Z; P-30 converts a proton to a neutron, giving ^{30}Si (Z = 14).
SA2@2,3: Explain why the line of stable nuclei curves away from N = Z for heavy elements, and why there are no stable nuclei much heavier than lead. | The nuclear force acts equally between all nucleons but only between near neighbours, while the Coulomb repulsion acts between every pair of protons and grows as Z^{2}. In light nuclei the asymmetry energy favours N = Z, but in heavy nuclei the Coulomb energy is large, so it is energetically better to have extra neutrons, which add binding without repulsion; the stable line bends towards N ≈ 1.5Z. Beyond lead the total Coulomb energy is so large that emitting an alpha particle (or fission) lowers the energy, so all heavier nuclei are unstable. | Short-range nuclear force versus long-range Coulomb ; Coulomb energy grows as Z^{2} ; Asymmetry favours N = Z in light nuclei ; Extra neutrons in heavy nuclei ; Alpha decay or fission becomes favourable beyond lead

## Radioactive decay
S: Unstable nuclei spontaneously transform into more stable ones, emitting radiation. Each nucleus decays randomly, but large numbers follow a precise exponential law, characterised by a half-life.
O: Use the decay law N = N_{0}e^{−λt} and A = λN
O: Relate half-life, mean lifetime and decay constant
O: Explain the random, spontaneous nature of decay
PRE: Exponential and logarithmic functions
LV: A level · Application
H: The decay law
E: dN/dt = −λN ⇒ N = N_{0}e^{−λt}
E: A = λN :: activity, in becquerels (Bq = decays per second)
E: t_{1/2} = ln 2/λ; τ = 1/λ :: half-life and mean lifetime
- 1 curie = 3.7 × 10^{10} Bq (about the activity of 1 g of radium).
H: Randomness
P: The decay of an individual nucleus can't be predicted; quantum mechanics gives only a probability per unit time, independent of the nucleus's age and of temperature, pressure or chemistry (except electron capture, which changes very slightly with chemical environment). Counts in a fixed time follow Poisson statistics, so a count N has an uncertainty of about √N.
H: Half-lives span huge ranges
- Polonium-212: 0.3 μs; carbon-14: 5730 y; uranium-238: 4.5 × 10^{9} y; tellurium-128: ~2 × 10^{24} y.
X: A sample has 8 × 10^{12} atoms of iodine-131 (t_{1/2} = 8.0 days). Activity?
> λ = 0.693/(8.0 × 86 400 s) = 1.0 × 10^{-6} s^{-1}
> A = λN = 1.0 × 10^{-6} × 8 × 10^{12} = 8 × 10^{6} Bq
K: Every nucleus has the same fixed probability per second, λ, of decaying; that alone gives the exponential law and a constant half-life.
!: After two half-lives a quarter remains, not none: decay never reaches exactly zero for large samples.
P: **Investigate with the lab.** Run the same settings twice: the curves differ, but the half-life doesn't. Then run it with only 20 nuclei.
IX: decay
T: Decay constant (λ) | The probability per unit time that a given nucleus decays
T: Half-life | The time for half the nuclei in a sample (or the activity) to decay
T: Activity | The number of decays per second in a sample, A = λN, measured in becquerels
SUM: N = N_{0}e^{−λt}; A = λN.
SUM: t_{1/2} = ln 2/λ = 0.693τ.
SUM: Decay is random and spontaneous; only its probability is fixed.
EV: established | Radioactive decay follows the exponential law with a decay constant unaffected by ordinary physical and chemical conditions
SRC: OpenStax, University Physics Volume 3, section 10.3 "Radioactive Decay" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-3-radioactive-decay
SRC: AQA, A-level Physics specification (7408), section 3.8.1.3 Radioactive decay | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State the radioactive decay law. | N = N_{0}e^{−λt}.
Q: How is half-life related to the decay constant? | t_{1/2} = ln 2/λ.
M1@2: After 3 half-lives, the fraction remaining is: | 1/8 | 1/3 | 1/6 | 1/9 | Each half-life halves the number, so (1/2)^{3} = 1/8 remains.
M2@3: Heating a radioactive sample changes its half-life: | Essentially not at all | By doubling it | By halving it | By orders of magnitude | Nuclear energies are MeV while thermal energies are a fraction of an eV, so heating can't affect the nucleus.
M2@3: Why is radioactive decay described as random? | We can't predict when a particular nucleus will decay | Every nucleus decays at the same moment | The half-life changes from one run to the next | Decay depends on temperature | Only the probability per unit time is fixed; individual decays are unpredictable.
NUM2@1: A source has a half-life of 30 s. What is its decay constant, in s^{-1}? | 0.0231 | 0.0003 | s^{-1} | λ = ln 2/t_{1/2} = 0.693/30 = 0.0231 s^{-1}.
NUM3@1,2: A source's activity is 6400 Bq. Its half-life is 5.0 h. What is its activity, in Bq, after 20 h? | 400 | 1 | Bq | 20 h is four half-lives; 6400 × (1/2)^{4} = 400 Bq.
SA2@2,3: Explain why the decay of a large number of nuclei gives a smooth exponential curve even though each decay is random. | Each nucleus has the same constant probability λ per second of decaying, independent of its history, so its decay time can't be predicted. In a large sample, the expected number decaying per second is λN, proportional to the number left, giving dN/dt = −λN and N = N_{0}e^{−λt}. Random fluctuations about this are of order √N, so for large N they are a tiny fraction and the curve looks smooth; for small samples the curve is visibly irregular, though the half-life is the same. | Constant probability per unit time ; Individual decays unpredictable ; Rate proportional to N ; Gives exponential solution ; Fluctuations ~√N small for large N

## Alpha, beta and gamma decay
S: The three classic types of radioactive decay emit helium nuclei (alpha), electrons or positrons (beta) or high-energy photons (gamma). They differ in what changes in the nucleus, in their energies and in how penetrating they are.
O: Write balanced equations for alpha, beta-minus, beta-plus and gamma decay
O: Compare the ionising and penetrating properties of the three radiations
O: Explain the continuous beta spectrum and the need for the neutrino
PRE: Nuclear stability
LV: GCSE and A level · Foundation
H: Alpha decay
E: ^{A}_{Z}X → ^{A−4}_{Z−2}Y + ^{4}_{2}He
- Heavy nuclei; discrete energies of 4–9 MeV; stopped by paper or a few cm of air; strongly ionising.
- The alpha escapes by quantum tunnelling through the Coulomb barrier.
H: Beta decay
E: n → p + e^{−} + ν̄_{e} :: β^{−}
E: p → n + e^{+} + ν_{e} :: β^{+} (only inside nuclei)
- Electron capture: p + e^{−} → n + ν_{e}.
- The electrons have a continuous energy spectrum: the missing energy led Pauli to propose the neutrino (1930).
- A weak-interaction process; betas are stopped by a few mm of aluminium.
H: Gamma decay
- The nucleus drops between its own energy levels, emitting a photon (keV–MeV); Z and A are unchanged.
- It usually follows alpha or beta decay; metastable states (technetium-99m, 6 h) are medically valuable.
- Weakly ionising but highly penetrating: needs lead or thick concrete.
X: Radium-226 alpha decays. Product?
> ^{226}_{88}Ra → ^{222}_{86}Rn + ^{4}_{2}He
> Radon-222, a radioactive gas
K: Alpha lowers Z by 2 and A by 4; β^{−} raises Z by 1; β^{+} lowers Z by 1; gamma changes neither.
!: Gamma rays carry no charge and no nucleon number, so they don't change the element.
P: **Investigate with the lab.** Watch the nuclei change as they decay and note that each decay emits radiation from the nucleus.
IX: decay
T: Alpha particle | A helium-4 nucleus, two protons and two neutrons, emitted by heavy nuclei
T: Beta particle | An electron (β^{−}) or positron (β^{+}) created and emitted in a weak decay of the nucleus
T: Gamma ray | A high-energy photon emitted when a nucleus drops to a lower energy level
SUM: α: ^{4}_{2}He, range a few cm of air; β: e^{∓} with a neutrino, a few mm of aluminium; γ: photon, cm of lead.
SUM: Ionising power falls and penetration rises from α to β to γ.
SUM: The continuous β spectrum revealed the neutrino.
EV: established | Alpha, beta and gamma decay conserve charge and nucleon number, and beta decay's continuous spectrum requires the (now detected) neutrino
SRC: AQA, A-level Physics specification (7408), section 3.8.1.2 α, β and γ radiation | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 31.4 "Nuclear Decay and Conservation Laws" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-4-nuclear-decay-and-conservation-laws
Q: Why does beta decay need a neutrino? | Electron energies are continuous; a third particle must carry the missing energy and momentum.
Q: What stops alpha particles? | Paper, skin or a few centimetres of air.
M1@1: In β^{−} decay, Z: | Increases by 1 | Decreases by 1 | Stays the same | Decreases by 2 | A neutron becomes a proton, so the proton number rises by 1 while A stays the same.
M2@2: Technetium-99m is useful in medicine because it: | Emits only gamma rays and has a short half-life | Emits strongly ionising alpha particles | Is completely stable in the body | Emits a beam of neutrons | Its 140 keV gammas escape the body to reach a camera, and its 6 h half-life keeps the patient's dose low.
M2@1: Which type of decay doesn't change the proton number? | Gamma decay | Alpha decay | Beta-minus decay | Beta-plus decay | Gamma emission releases energy without changing the nucleus's composition.
NUM2@1: Thorium-232 (Z = 90) alpha decays. What is the proton number of the product? | 88 | 0 | (proton number) | Alpha emission removes two protons: 90 − 2 = 88, radium-228.
TF1@2: Alpha particles are the most penetrating of the three radiations. | false | Alphas are the most ionising, so they lose energy fastest and are stopped by paper; gamma rays are the most penetrating.
M3@3: Why do alpha particles from one nuclide have a single energy, while beta electrons have a spread? | Alpha decay has two products, beta decay three | Alphas are heavier than electrons | Beta decay is electromagnetic | Electrons lose energy inside the nucleus | With two bodies, momentum conservation fixes each share of the energy; with three (electron, neutrino, nucleus) the energy can be shared in many ways.
SA2@1,2: Compare alpha, beta and gamma radiation in terms of their nature, effect on the nucleus, ionising ability and penetration. | Alpha particles are helium-4 nuclei; emitting one lowers Z by 2 and A by 4. They are strongly ionising and are stopped by paper or a few cm of air. Beta-minus particles are fast electrons (with an antineutrino) from a neutron becoming a proton; Z rises by 1 and A is unchanged; they are moderately ionising and stopped by a few mm of aluminium. Gamma rays are photons from a nucleus dropping to a lower energy level; Z and A are unchanged; they are weakly ionising and penetrating, reduced but not stopped by several cm of lead. | Alpha: helium nucleus, Z − 2, A − 4 ; Beta: electron, Z + 1 ; Gamma: photon, no change ; Ionising order α > β > γ ; Penetration and absorbers correct

## Decay chains and half-life
S: Many radioactive nuclei decay into products that are themselves radioactive, forming decay chains that end at a stable isotope. Their behaviour depends on the relative half-lives and enables radiometric dating of rocks, bones and the Earth itself.
O: Describe natural decay series and secular and transient equilibrium
O: Calculate ages from parent and daughter amounts
O: Use half-lives to find remaining fractions and activities
PRE: Radioactive decay
LV: Year 1 · Application
H: Natural decay series
- Uranium-238 → … → lead-206 (14 steps: 8 alpha and 6 beta decays, including radium-226 and radon-222).
- Uranium-235 → lead-207; thorium-232 → lead-208.
- The neptunium series is extinct in nature.
H: Equilibrium
E: dN_{2}/dt = λ_{1}N_{1} − λ_{2}N_{2}
- **Secular equilibrium** (parent half-life ≫ daughter's): activities equal, A_{1} = A_{2}.
- **Transient equilibrium**: parent somewhat longer-lived; the daughter's activity tracks the parent's.
- Medical generators: molybdenum-99 (66 h) → technetium-99m (6 h), "milked" daily.
H: Radiometric dating
E: t = (1/λ) ln(1 + D/P) :: daughter D, parent P, no daughter at the start
- Carbon-14 (up to ~50 000 years).
- Potassium–argon, uranium–lead (zircons up to 4.4 billion years old), rubidium–strontium.
- Isochron methods remove the need to know the initial daughter amount.
X: A rock has equal numbers of ^{238}U and its final daughter ^{206}Pb (none initially). Age?
> D/P = 1 ⇒ t = ln 2/λ = t_{1/2}
> t = 4.5 × 10^{9} years
K: In a chain, a short-lived daughter's activity quickly matches its long-lived parent's: secular equilibrium.
!: Carbon dating assumes a known initial ^{14}C level; calibration curves (tree rings, corals) correct for its variations.
P: **Investigate with the lab.** Mark the moment half the nuclei are left, then run the decay chain and watch the daughter build up, peak and decay away.
IX: decay
T: Decay chain | A sequence of radioactive decays from a parent through radioactive daughters to a stable end product
T: Secular equilibrium | The state in which a long-lived parent and short-lived daughter have equal activities
T: Radiometric dating | Finding an age from the measured amounts of a radioactive parent and its daughter
SUM: Natural series end at stable lead isotopes.
SUM: Secular equilibrium: A_{daughter} = A_{parent}.
SUM: Age t = (1/λ) ln(1 + D/P).
EV: established | Radiometric ages from independent decay chains agree, giving an age of the Earth of about 4.5 billion years
SRC: OpenStax, College Physics 2e, section 31.5 "Half-Life and Activity" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-5-half-life-and-activity
SRC: OpenStax, University Physics Volume 3, section 10.3 "Radioactive Decay" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-3-radioactive-decay
Q: What is secular equilibrium? | When a long-lived parent and short-lived daughter have equal activities.
Q: Why is uranium–lead dating so reliable? | Two independent decay chains (U-238 and U-235) cross-check ages, and zircons exclude initial lead.
M1@2: Carbon-14 dating works up to about: | 50 000 years | 5 billion years | 100 years | 1 million years | After about 9 half-lives of 5730 years, too little ^{14}C remains to measure reliably.
M2@1: A Tc-99m generator relies on: | The decay of the parent Mo-99 | Fission inside the hospital | Neutron capture in the hospital | Alpha decay of technetium | Mo-99 (66 h) continuously produces Tc-99m (6 h) in transient equilibrium, so it can be extracted each day.
M2@3: A sample has a half-life of 2 hours. What fraction remains after 6 hours? | One eighth | One sixth | One third | One quarter | Six hours is three half-lives: ½ × ½ × ½ = ⅛.
NUM2@2: A mineral contains three ^{206}Pb atoms for every ^{238}U atom (no lead at formation). What is its age, in billions of years? (t_{1/2} = 4.5 × 10^{9} y) | 9.0 | 0.1 | × 10^{9} y | D/P = 3, so t = t_{1/2} log_{2}(1 + 3) = 2 half-lives = 9.0 × 10^{9} y (older than the Earth, so the sample would be suspect).
TF1@1: In secular equilibrium, the parent and daughter have equal numbers of atoms. | false | They have equal activities, λ_{1}N_{1} = λ_{2}N_{2}; the short-lived daughter has far fewer atoms.
M3@1,3: Radon-222 (3.8 days) comes from radium-226 (1600 years). In an old radium sample, how does the radon activity compare with the radium activity? | They are equal | Radon's is far greater | Radon's is far smaller | Radon's is zero | Within a few weeks radon reaches secular equilibrium: it decays as fast as it is made, so the activities match.
SA3@2,3: Explain how uranium–lead dating gives the age of a zircon crystal and why it is considered reliable. | Zircon incorporates uranium but excludes lead when it crystallises, so any lead now present comes from decay. Measuring the ratio of ^{206}Pb to ^{238}U gives the age from t = (1/λ) ln(1 + D/P). The ^{235}U → ^{207}Pb chain has a different half-life and gives an independent age from the same crystal; agreement of the two (concordance) shows the crystal has neither gained nor lost uranium or lead. The long half-lives (4.5 and 0.7 billion years) suit geological ages. | No initial lead in zircon ; Daughter/parent ratio gives age with formula ; Second independent chain U-235 to Pb-207 ; Concordance checks a closed system ; Suitable half-lives

## Nuclear reaction equations
S: Nuclear reactions are written like chemical equations, but must conserve nucleon number, charge, energy and momentum. Balancing them predicts products, and mass differences give the energy released.
O: Balance nuclear equations by conserving A and Z
O: Use X(a, b)Y notation and identify historic reactions
O: Calculate Q-values and decide whether a reaction needs a threshold energy
PRE: Mass defect
LV: A level · Foundation
H: Conservation rules
- Total nucleon number A is conserved.
- Total charge Z is conserved.
- Lepton number and baryon number are conserved.
- Mass–energy and momentum are conserved.
H: Notation
E: a + X → Y + b, or X(a, b)Y
- ^{14}N(α, p)^{17}O: Rutherford's first artificial transmutation (1919).
- ^{9}Be(α, n)^{12}C: Chadwick's discovery of the neutron (1932).
H: Q-value and thresholds
E: Q = (m_{a} + m_{X} − m_{Y} − m_{b})c^{2}
E: E_{th} = −Q(1 + m_{a}/m_{X}) :: threshold for endothermic reactions (non-relativistic)
- Exothermic (Q > 0) reactions can occur at low energy, if Coulomb barriers allow.
- Some kinetic energy must go into moving the products, so the threshold exceeds |Q|.
X: Complete: ^{235}_{92}U + ^{1}_{0}n → ^{141}_{56}Ba + ^{92}_{36}Kr + ?
> A: 236 = 141 + 92 + 3; Z: 92 = 56 + 36 + 0
> 3 neutrons
K: Balancing A and Z gives the products; masses then give Q, and Q < 0 means a threshold energy is needed.
!: Balancing A and Z alone doesn't guarantee a reaction is energetically possible; the kinetic energies count in energy conservation.
T: Transmutation | The change of one element into another by a nuclear reaction or decay
T: Threshold energy | The minimum kinetic energy of the projectile for an endothermic reaction to occur
SUM: Conserve A, Z, lepton and baryon numbers, energy and momentum.
SUM: X(a, b)Y is shorthand for a + X → Y + b.
SUM: Q = (initial − final mass)c^{2}; E_{th} = −Q(1 + m_{a}/m_{X}).
EV: established | Nuclear reactions conserve nucleon number, charge, energy and momentum, with Q-values matching measured mass differences
SRC: OpenStax, University Physics Volume 3, section 10.4 "Nuclear Reactions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-4-nuclear-reactions
SRC: OpenStax, College Physics 2e, section 31.4 "Nuclear Decay and Conservation Laws" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/31-4-nuclear-decay-and-conservation-laws
Q: What must be conserved in a nuclear reaction equation? | Nucleon number, charge, energy, momentum (and lepton and baryon numbers).
Q: What was Rutherford's first artificial transmutation? | Nitrogen-14 bombarded by alphas producing oxygen-17 and a proton.
M1@1: ^{27}Al(n, α)? produces: | ^{24}Na | ^{24}Mg | ^{28}Al | ^{23}Ne | A: 27 + 1 − 4 = 24; Z: 13 − 2 = 11, which is sodium.
M2@3: A reaction with Q < 0: | Needs a minimum kinetic energy to occur | Releases energy when it occurs | Can never take place at all | Produces no particles at all | An endothermic reaction absorbs energy, so the projectile must bring at least the threshold energy −Q(1 + m_{a}/m_{X}).
NUM2@3: A reaction has Q = −1.19 MeV, with an alpha (m = 4 u) striking nitrogen-14. What is the threshold energy, in MeV? | 1.53 | 0.02 | MeV | E_{th} = 1.19 × (1 + 4/14) = 1.19 × 1.286 = 1.53 MeV.
TF1@1: In any nuclear reaction the total mass number on each side must be equal. | true | Baryon number is conserved, so the total count of protons and neutrons is the same before and after.
M3@1,2: Which particle completes ^{9}_{4}Be + ^{4}_{2}He → ^{12}_{6}C + ? | A neutron | A proton | An electron | A gamma ray only | A: 9 + 4 − 12 = 1; Z: 4 + 2 − 6 = 0, so it is ^{1}_{0}n, Chadwick's neutron.
SA2@1,3: Explain how to decide what product is formed in a nuclear reaction and whether the reaction can occur at low energy. | Write the equation with the unknown product and conserve nucleon number and charge: the sums of A and of Z on each side must match, which identifies the unknown nuclide or particle (its Z gives the element). Then calculate Q from the total rest mass before minus after, times c^{2} (931.5 MeV per u). If Q is positive the reaction releases energy and can occur at low energy, provided Coulomb barriers can be overcome; if Q is negative it needs a projectile with at least the threshold energy. | Conserve A ; Conserve Z to identify element ; Q from mass difference ; Q > 0 releases energy ; Q < 0 needs threshold, or Coulomb barrier mentioned

## Nuclear cross-sections
S: A cross-section measures how likely a nuclear reaction is, expressed as an effective target area. Cross-sections vary enormously with energy and determine reactor design, shielding and astrophysical reaction rates.
O: Use R = σΦN and the barn to calculate reaction rates
O: Explain the 1/v law and resonances in neutron cross-sections
O: Calculate attenuation and mean free paths from cross-sections
PRE: Nuclear reaction equations
LV: Year 2 · Application
H: Definition
E: R = σΦN :: reaction rate = cross-section × flux × number of targets
E: 1 barn = 10^{-28} m^{2}
- The geometric area of a heavy nucleus is ~2 barns.
- The differential cross-section dσ/dΩ gives the angular distribution.
H: Energy dependence
- **1/v law**: neutron absorption cross-sections often ∝ 1/v at low energies (slow neutrons linger near nuclei).
- **Resonances**: sharp peaks when the energy matches a compound-nucleus level (Breit–Wigner shape).
- Thermal neutron capture: cadmium-113 ~20 000 b, boron-10 3840 b, xenon-135 ~2.6 million b (a reactor poison).
- U-235 thermal fission: 585 b; fast fission: ~1 b.
H: Attenuation
E: I = I_{0}e^{−nσx}; mean free path λ = 1/(nσ)
X: Thermal neutrons in water (hydrogen n = 6.7 × 10^{28} m^{-3}, σ_{capture} = 0.33 b). Mean free path for capture?
> λ = 1/(6.7 × 10^{28} × 3.3 × 10^{-29} m^{2})
> λ ≈ 0.45 m
K: A cross-section is a probability expressed as an area: rate = σ × flux × number of target nuclei.
!: A cross-section isn't the physical size of the nucleus; quantum effects make it much larger or smaller depending on energy.
T: Cross-section | The effective area a target nucleus presents for a given reaction
T: Barn | A unit of cross-section, 10^{-28} m^{2}
T: Neutron flux | The number of neutrons crossing unit area per second
SUM: R = σΦN; 1 b = 10^{-28} m^{2}.
SUM: Slow-neutron cross-sections follow 1/v and show resonances.
SUM: Mean free path = 1/(nσ).
EV: established | Measured neutron cross-sections show 1/v behaviour and Breit–Wigner resonances, and are tabulated for reactor and shielding design
SRC: OpenStax, University Physics Volume 3, section 10.4 "Nuclear Reactions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-4-nuclear-reactions
SRC: OpenStax, College Physics 2e, section 32.6 "Fission" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/32-6-fission
Q: What is a barn? | A unit of cross-section, 10^{-28} m^{2}.
Q: Why do slow neutrons often have larger absorption cross-sections? | They spend more time near the nucleus (1/v law).
M1@2: Xenon-135 matters in reactors because: | Its huge neutron absorption cross-section poisons the chain | It is the main fissile fuel isotope | It moderates fast neutrons well | It is stable and builds up as ash | With ~2.6 million barns it absorbs thermal neutrons strongly, so its build-up after power changes reduces reactivity.
M2@1: Reaction rate is proportional to: | Cross-section × flux × number of targets | The target's mass alone | Temperature alone | The product's half-life | R = σΦN: each of N nuclei presents area σ to a flux Φ of particles per unit area per second.
NUM2@1: A foil holds 1.0 × 10^{20} nuclei with σ = 2.0 b in a flux of 1.0 × 10^{16} m^{-2} s^{-1}. What is the reaction rate, in s^{-1}? | 2.0 | 0.05 | × 10^{8} s^{-1} | R = σΦN = 2.0 × 10^{-28} × 1.0 × 10^{16} × 1.0 × 10^{20} = 2.0 × 10^{8} reactions per second.
TF1@2: The 1/v law means slower neutrons are more likely to be absorbed. | true | Absorption probability rises as the neutron spends longer within range of the nucleus, so σ ∝ 1/v at low energy.
M3@2,3: The thermal capture cross-section of a nuclide is 100 b at 0.025 eV. Following the 1/v law, what is it at 0.1 eV? | 50 b | 25 b | 200 b | 400 b | v ∝ √E, so quadrupling E doubles v and halves σ: 100/2 = 50 b.
SA3@1,3: Explain what a nuclear cross-section is, and why the absorption cross-section of a nucleus can be much larger than its geometric size. | A cross-section σ is the effective target area per nucleus for a reaction, defined so that the rate is R = σΦN; it is a probability expressed as an area, measured in barns. A heavy nucleus has a geometric area of about 1–2 b, but slow neutrons have de Broglie wavelengths far larger than the nucleus and interact quantum mechanically: at low energies σ ∝ 1/v because the neutron spends longer near the nucleus, and when its energy matches a level of the compound nucleus there is a resonance. So xenon-135 absorbs thermal neutrons with σ ≈ 2.6 × 10^{6} b. | Defines σ via R = σΦN ; Probability as area, barns ; Neutron wavelength larger than nucleus ; 1/v law or resonance explanation ; Example such as Xe-135 or Cd-113

## Nuclear scattering
S: Scattering particles off nuclei reveals nuclear sizes, shapes, forces and excited states. Elastic scattering maps the nucleus's shape; inelastic scattering excites it, and knockout reactions probe individual nucleons.
O: Distinguish elastic, inelastic and deep inelastic scattering and what each probes
O: Relate the probe's wavelength to the size of structure it can resolve
O: Explain form factors and the optical model
PRE: Rutherford scattering
LV: Year 3 · Application
H: Types
- **Rutherford (Coulomb)**: low-energy charged particles; deviations reveal nuclear size.
- **Elastic electron scattering**: charge distributions (form factors).
- **Neutron scattering**: no Coulomb barrier; probes the nuclear potential and resonances.
- **Inelastic**: excites nuclear levels; the energy-loss spectrum shows excited states.
- **Deep inelastic**: high-energy electrons scatter off quarks inside nucleons.
H: Optical model
P: The nucleus acts like a "cloudy crystal ball" for incoming particles: a complex potential whose real part refracts the wave and whose imaginary part absorbs it (removing flux into reactions). It fits elastic scattering data across many nuclei and energies.
H: Form factors
E: dσ/dΩ = (dσ/dΩ)_{point}|F(q)|^{2}
- F(q) is the Fourier transform of the charge distribution; diffraction minima give the radius.
X: Electrons of what energy have a de Broglie wavelength ~ 1 fm?
> Relativistic: λ = hc/E, so E = 1240 MeV fm/1 fm
> E ≈ 1.2 GeV
K: To resolve a structure of size d, the probe's wavelength must be about d or smaller, so smaller structures need higher energies.
!: To see small structures you need short wavelengths and so high energies: nuclear physics needs MeV–GeV probes.
T: Form factor | F(q), the Fourier transform of a target's charge distribution, measured from scattering
T: Inelastic scattering | Scattering in which the target is left in an excited state and the projectile loses energy
T: Optical model | A complex potential describing elastic scattering, with absorption representing loss into reactions
SUM: Elastic scattering gives shape and size; inelastic gives excited states.
SUM: Wavelength must match the structure: ~GeV electrons for fm scales.
SUM: Form factors and the optical model turn data into structure.
EV: established | Electron and hadron scattering data determine nuclear charge distributions and excited states, and revealed quarks inside nucleons
SRC: OpenStax, College Physics 2e, section 30.2 "Discovery of the Parts of the Atom: Electrons and Nuclei" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-2-discovery-of-the-parts-of-the-atom-electrons-and-nuclei
SRC: OpenStax, University Physics Volume 3, section 10.1 "Properties of Nuclei" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-1-properties-of-nuclei
Q: What does the form factor reveal? | The spatial distribution of charge inside a nucleus (its Fourier transform).
Q: Why are neutrons good probes of nuclei? | They have no charge, so no Coulomb barrier.
M1@1: Electron scattering is good for measuring: | Charge distributions | Neutron spins | Half-lives | Fission yields | Electrons interact electromagnetically and are point-like, so they map the nuclear charge without strong-force complications.
M2@3: In the optical model, absorption represents: | Flux lost to reactions | Absorption of visible light | Capture of electrons | Emission of gamma rays | The imaginary part of the potential removes particles from the elastic channel into inelastic and reaction channels.
NUM2@2: What electron energy, in GeV, gives a de Broglie wavelength of 0.5 fm? (hc = 1240 MeV fm) | 2.5 | 0.05 | GeV | E ≈ hc/λ = 1240/0.5 = 2480 MeV ≈ 2.5 GeV.
TF1@1: In inelastic scattering the nucleus is left in an excited state. | true | The projectile loses an energy equal to the excitation energy, so the energy-loss spectrum maps the nuclear levels.
M3@2,3: Electrons scattered from a nucleus show a diffraction minimum. If the electron energy is doubled, the minimum moves to: | A smaller angle | A larger angle | The same angle | It disappears completely | Doubling E halves λ, and sin θ_{min} ∝ λ/R, so the minimum moves to a smaller angle.
SA3@1,2: Explain why GeV electrons are needed to study the internal structure of nucleons, while MeV alphas sufficed for Rutherford's discovery of the nucleus. | Resolving a structure requires a probe wavelength comparable to or smaller than the structure. Rutherford needed only to show that charge is concentrated within ~10^{-14} m; MeV alphas, whose closest approach was tens of femtometres, were enough, and Coulomb scattering showed a point-like centre. Nucleons are about 1 fm across, and their quarks much smaller, so the probe needs λ < 1 fm, which for electrons means energies of order GeV (E ≈ hc/λ = 1.24 GeV at 1 fm). Electrons are also point-like and feel no strong force, so the data are cleaner. | Resolution needs wavelength comparable to size ; Rutherford's question needed only ~10 fm scale ; Nucleon size ~1 fm ; E ≈ hc/λ gives ~GeV ; Electrons point-like, no strong force

## Nuclear fission
S: In fission, a heavy nucleus such as uranium-235 splits into two medium nuclei plus neutrons, releasing about 200 MeV. The extra neutrons can trigger further fissions, enabling reactors and nuclear weapons.
O: Describe induced fission of U-235 and the energy released
O: Explain fission using the liquid-drop model and why U-235 fissions with slow neutrons
O: Calculate the energy released by fissioning a given mass of fuel
PRE: Nuclear binding energy
LV: A level · Application
H: The process
- U-235 absorbs a thermal neutron → U-236* (excited) → deforms → splits.
- Fragments are usually unequal (masses around 95 and 140).
- 2–3 prompt neutrons per fission; ~0.65% of neutrons are delayed (from fragment decays), which makes reactors controllable.
- Energy: ~165 MeV fragment kinetic energy, plus gammas, betas and neutrinos: ~200 MeV in total.
H: Liquid-drop explanation
P: Deforming a heavy nucleus increases its surface energy but decreases its Coulomb energy. For large Z^{2}/A the fission barrier is only ~6 MeV, and the binding energy released when a neutron is absorbed can exceed it. U-235 (odd N) gains extra pairing energy on absorbing a neutron, so even slow neutrons suffice; U-238 needs fast neutrons.
H: Discovery
- Hahn and Strassmann (1938) found barium in uranium bombarded with neutrons; Meitner and Frisch explained it as fission (1939).
X: Energy from fissioning 1 kg of U-235?
> Atoms = (1000/235) × 6.02 × 10^{23} = 2.56 × 10^{24}
> E = 2.56 × 10^{24} × 200 MeV × 1.6 × 10^{-13} J MeV^{-1} = 8.2 × 10^{13} J: about 20 kilotons of TNT
K: Fission releases ~200 MeV because the fragments have about 0.9 MeV more binding per nucleon than uranium.
!: Fission fragments are neutron-rich and highly radioactive; they are the origin of most high-level nuclear waste.
T: Induced fission | Splitting of a heavy nucleus after it absorbs a neutron
T: Fission barrier | The energy needed to deform a nucleus to the point where it splits
T: Delayed neutrons | Neutrons emitted seconds after fission by decaying fragments
SUM: U-235 + n → two fragments + 2–3 neutrons + ~200 MeV.
SUM: Liquid drop: Coulomb energy favours splitting, surface energy resists.
SUM: 1 kg of U-235 releases ~8 × 10^{13} J.
EV: established | Thermal-neutron fission of U-235 releases about 200 MeV and 2.4 neutrons on average per event
SRC: OpenStax, University Physics Volume 3, section 10.5 "Fission" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-5-fission
SRC: AQA, A-level Physics specification (7408), section 3.8.1.7 Induced fission | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why does U-235 fission with slow neutrons but U-238 doesn't? | U-235 gains extra pairing energy on absorbing a neutron, exceeding its fission barrier.
Q: Why are delayed neutrons important? | They slow the reactor's response enough to make it controllable.
M1@1: Energy released per U-235 fission is about: | 200 MeV | 17.6 MeV | 2 MeV | 1 GeV | Most of the ~200 MeV appears as fragment kinetic energy (~165 MeV), the rest as gammas, betas and neutrinos; 17.6 MeV is D–T fusion.
M2@2: Who explained fission theoretically? | Meitner and Frisch | Otto Hahn alone | Enrico Fermi | Niels Bohr alone | In 1939 Meitner and Frisch interpreted Hahn and Strassmann's barium as the splitting of a liquid-drop uranium nucleus.
NUM2@3: A reactor fissions 1.0 g of U-235 each day. What average thermal power, in MW, does this give? (8.2 × 10^{10} J per gram) | 0.95 | 0.02 | MW | P = 8.2 × 10^{10} J/86 400 s = 9.5 × 10^{5} W ≈ 0.95 MW; about 1 g per day per MW.
TF1@2: In the liquid-drop model, deforming a heavy nucleus lowers its Coulomb energy. | true | Stretching moves protons further apart on average, reducing repulsion, while the larger surface raises the surface energy; fission occurs when Coulomb wins.
M3@2,3: Why can't U-238 sustain a chain reaction with thermal neutrons? | The energy gained on absorbing a slow neutron is below its fission barrier | U-238 has no neutrons to release | U-238 is not radioactive | Its fragments absorb all the neutrons | Adding a neutron to even-N U-238 releases less binding energy (no pairing gain) than its ~6 MeV barrier, so only fast neutrons above ~1 MeV cause fission.
SA2@1,2: Describe the process of induced fission in uranium-235 and explain where the energy released comes from. | A slow neutron is absorbed by U-235, forming excited U-236. The excitation, from the binding energy of the added neutron, makes the nucleus oscillate and stretch; once Coulomb repulsion between the two ends outweighs the surface tension of the nuclear force, it splits into two unequal fragments such as barium and krypton, with two or three neutrons. The fragments have greater binding energy per nucleon (about 8.5 against 7.6 MeV), so the total mass decreases and about 200 MeV is released, mostly as kinetic energy of the fragments, which becomes heat. | Neutron absorption forming U-236 ; Deformation, Coulomb versus surface ; Two fragments and 2–3 neutrons ; Higher binding energy per nucleon, mass decrease ; ~200 MeV mostly fragment kinetic energy

## Nuclear fusion
S: Fusion joins light nuclei into heavier ones, releasing energy because the products are more tightly bound. It powers the Sun and stars and could provide abundant low-carbon energy on Earth, if the plasma can be confined long enough.
O: Write the main fusion reactions and calculate how their energy is shared
O: Explain the Coulomb barrier and how tunnelling allows fusion in stars
O: State the Lawson criterion and compare magnetic and inertial confinement
PRE: Nuclear binding energy
LV: A level · Application
H: Reactions
E: D + T → ^{4}He (3.5 MeV) + n (14.1 MeV) :: easiest for reactors
E: D + D → ^{3}He + n or T + p
E: 4p → ^{4}He + 2e^{+} + 2ν_{e} :: the Sun's pp chain, 26.7 MeV including positron annihilation
H: The Coulomb barrier
- Nuclei must get within a few fm despite their repulsion (~0.4 MeV barrier for D–T).
- Thermal energies in the Sun's core (~1.3 keV) are far below; quantum tunnelling and the high-energy tail of the Maxwell distribution make fusion possible (the Gamow peak).
- Fusion reactors need ~100–150 million K.
H: Lawson criterion
E: nτ_{E}T ≳ 3 × 10^{21} keV s m^{-3} :: ignition for D–T
- **Magnetic confinement**: tokamaks (ITER), stellarators (Wendelstein 7-X).
- **Inertial confinement**: lasers compress fuel pellets; NIF achieved ignition (more fusion energy out than laser energy delivered to the target) in December 2022.
X: What fraction of D–T fusion energy goes to the neutron, and why?
> Momentum conservation: equal and opposite momenta, so E = p^{2}/2m favours the lighter particle
> E_{n}/E_{α} = m_{α}/m_{n} ≈ 4: 14.1 of 17.6 MeV (80%)
K: Fusion needs nuclei hot and dense enough, for long enough, to tunnel through their Coulomb barrier: the Lawson criterion.
!: Fusion in stars is slow precisely because it relies on rare tunnelling; that's why the Sun lasts about 10 billion years.
T: Coulomb barrier | The electric potential energy that two nuclei must overcome or tunnel through to get within range of the strong force
T: Lawson criterion | The minimum product of density, energy confinement time and temperature for a fusion plasma to ignite
T: Ignition | The condition in which fusion heating sustains the plasma without external heating (at NIF: fusion yield exceeding laser energy on target)
SUM: D–T gives 17.6 MeV, 80% to the neutron.
SUM: Tunnelling and the Maxwell tail let stars fuse at ~10^{7} K; reactors need ~10^{8} K.
SUM: Ignition needs nτ_{E}T above ~3 × 10^{21} keV s m^{-3}.
EV: established | Fusion powers the Sun and achieved target gain at NIF in 2022; net electricity from fusion has not yet been demonstrated
SRC: OpenStax, University Physics Volume 3, section 10.6 "Nuclear Fusion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-6-nuclear-fusion
SRC: OpenStax, College Physics 2e, section 32.5 "Fusion" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/32-5-fusion
Q: What is the Lawson criterion? | The minimum product of density, confinement time and temperature needed for fusion ignition.
Q: How do nuclei in the Sun overcome the Coulomb barrier? | Quantum tunnelling, aided by the high-energy tail of the Maxwell distribution.
M1@1: The easiest fusion reaction for power plants is: | D–T | p–p | D–D | He–He | D–T has the largest cross-section at the lowest temperature, so it reaches the Lawson criterion most easily.
M2@3: NIF achieved ignition in: | 2022 | 1958 | 2005 | 2035 | In December 2022 a laser shot delivering 2.05 MJ to the target produced about 3.15 MJ of fusion energy.
NUM2@2: Estimate the Coulomb barrier, in MeV, for two deuterons touching at 4.0 fm. (e^{2}/(4πε_{0}) = 1.44 MeV fm) | 0.36 | 0.01 | MeV | U = 1.44 MeV fm × 1 × 1/4.0 fm = 0.36 MeV, far above thermal energies of ~1 keV.
TF1@2: In the Sun's core, the average thermal energy of protons is large enough to overcome the Coulomb barrier classically. | false | kT ≈ 1.3 keV is hundreds of times below the barrier; fusion relies on tunnelling by the fastest protons.
M3@2,3: Why is it harder to reach ignition with D–D fuel than with D–T? | Its fusion cross-section is much smaller at accessible temperatures | Deuterium is radioactive | D–D releases more energy per reaction | D–D produces no neutrons | The D–T cross-section is about 100 times larger at ~10 keV, so D–D needs higher nτT for the same fusion rate.
SA3@2,3: Explain why controlled fusion on Earth needs temperatures about ten times higher than the Sun's core. | Fusion requires nuclei to approach within a few fm, against a Coulomb barrier of ~0.4 MeV, so it relies on tunnelling by the fastest nuclei. The Sun's core, at about 15 million K, has an enormous mass, high density (~150 g cm^{-3}) and billions of years, so even a tiny rate per nucleus gives its output, and gravity provides confinement. A reactor plasma is about 10^{8} times less dense and must be confined for only seconds by magnetic fields, so it needs a much higher rate per nucleus: temperatures of 100–150 million K, where D–T tunnelling probability and cross-section are near their maximum, to satisfy the Lawson criterion. | Coulomb barrier and tunnelling ; Sun's large mass, density and time ; Gravity confines the Sun ; Reactor plasma less dense, short confinement ; Higher T needed to meet Lawson criterion

## Chain reactions
S: In a chain reaction, each fission releases neutrons that cause more fissions. Whether the chain dies out, stays steady or grows depends on the multiplication factor k, which reactors keep at exactly 1.
O: Define the multiplication factor and classify subcritical, critical and supercritical assemblies
O: Explain critical mass and the factors that affect it
O: Explain how delayed neutrons make a reactor controllable
PRE: Nuclear fission
LV: A level · Application
H: Multiplication factor
E: k = neutrons in one generation/neutrons in the previous
- k < 1: subcritical; k = 1: critical (steady); k > 1: supercritical.
E: k_{∞} = ηfpε :: four-factor formula (infinite medium)
- η: neutrons per absorption in fuel; f: thermal utilisation; p: resonance escape; ε: fast fission factor.
- Finite reactors: k_{eff} = k_{∞} × non-leakage probability.
H: Critical mass
- The minimum mass for k_{eff} = 1: it depends on shape, density, enrichment and reflectors.
- A bare sphere of U-235 needs ~52 kg; Pu-239 ~10 kg; less with reflectors or compression.
H: Reactor control
P: Prompt neutron generation times are ~10^{-4} s in thermal reactors, too fast to control. Delayed neutrons (from fission products, after seconds to a minute) lengthen the effective generation time to ~0.1 s, so reactors are operated "delayed critical" and controlled with rods and dissolved boron. Prompt criticality causes rapid power excursions, as at Chernobyl.
X: A reactor with k = 1.001 and effective generation time 0.1 s. How fast does power grow?
> 10 generations per second: (1.001)^{10} ≈ 1.01
> About 1% per second: controllable
K: k = 1 means a steady chain; delayed neutrons stretch the generation time so small excesses of k grow slowly.
!: A critical reactor (k = 1) isn't dangerous; it simply means a steady chain reaction.
T: Multiplication factor (k) | The ratio of neutrons in one generation to those in the previous one
T: Critical mass | The smallest mass of fissile material that can sustain a chain reaction (k_{eff} = 1)
T: Prompt critical | A state in which the chain grows on prompt neutrons alone, too fast for control
SUM: k < 1 dies out; k = 1 steady; k > 1 grows.
SUM: Critical mass depends on shape, density, enrichment and reflection.
SUM: Delayed neutrons make control possible.
EV: established | Reactor kinetics with delayed neutrons is well understood and underlies the control of every power reactor
SRC: OpenStax, University Physics Volume 3, section 10.5 "Fission" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/10-5-fission
SRC: AQA, A-level Physics specification (7408), section 3.8.1.7 Induced fission | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What does k = 1 mean? | Each generation has the same number of neutrons: a steady chain reaction.
Q: Why are delayed neutrons essential for reactor control? | They lengthen the effective generation time from ~0.1 ms to ~0.1 s.
M1@1: A subcritical assembly has: | k < 1 | k = 1 | k > 1 | k = 2 exactly | Each generation has fewer neutrons than the last, so the chain dies out.
M2@2: Neutron reflectors reduce critical mass by: | Returning escaping neutrons to the core | Absorbing neutrons in the fuel | Heating the fuel to expand it | Adding extra fissile fuel | Fewer neutrons leak out, raising the non-leakage probability, so k_{eff} = 1 is reached with less fuel.
NUM2@1: A chain starts with 1000 neutrons and k = 0.9. How many neutrons are in the third generation after it? | 729 | 1 | neutrons | 1000 × 0.9^{3} = 729: the chain dies away.
TF1@2: Compressing a subcritical mass of plutonium can make it supercritical. | true | Higher density shortens the neutron mean free path, so fewer neutrons escape before causing fission, raising k_{eff}.
M3@3: If a reactor relied only on prompt neutrons (generation time 10^{-4} s) with k = 1.001, by roughly what factor would power grow in one second? | About e^{10} ≈ 2 × 10^{4} | About 1.01 | About 2 | About 10^{100} | 10^{4} generations: 1.001^{10 000} = e^{10 000 × 0.001} ≈ e^{10}, a 22 000-fold rise that no control rod could follow.
SA2@1,3: Explain the meaning of the multiplication factor k and how a reactor is kept at k = 1. | k is the ratio of the number of neutrons in one generation to the number in the previous one; k < 1 the chain dies out, k = 1 it is steady, k > 1 it grows. In a reactor, neutrons are lost by leakage and absorption in non-fuel materials; control rods of boron or cadmium absorb neutrons and are moved in or out to adjust k, together with dissolved boron. Because about 0.65% of neutrons are delayed by seconds, the effective generation time is ~0.1 s, so small deviations change power slowly enough for the control system to respond, and negative temperature feedback helps stabilise it. | Defines k ; Three regimes ; Control rods absorb neutrons ; Delayed neutrons lengthen generation time ; Feedback or slow response allows control

## Nuclear reactors
S: A nuclear reactor sustains a controlled fission chain reaction, using the heat to make steam and generate electricity. Its core contains fuel, a moderator, control rods and coolant, surrounded by shielding and containment.
H: Components
- **Fuel**: uranium oxide enriched to 3–5% U-235 (or natural uranium in CANDU; MOX).
- **Moderator**: slows neutrons (water, heavy water, graphite).
- **Control rods**: absorb neutrons (boron carbide, cadmium, hafnium).
- **Coolant**: removes heat (water, CO_{2}, liquid sodium, helium, molten salt).
- **Containment**: steel and concrete structures.
H: Reactor types
- **PWR**: pressurised water (most common); secondary loop makes steam.
- **BWR**: water boils in the core.
- **CANDU**: heavy water, natural uranium.
- **Fast breeders**: no moderator; convert U-238 into Pu-239.
- **Generation IV and SMRs**: molten salt, high-temperature gas, small modular designs.
H: Safety
P: Reactors are designed with negative temperature coefficients: heating reduces reactivity. Decay heat (~7% of power just after shutdown, falling over days) must always be removed; losing cooling caused Three Mile Island (1979) and Fukushima (2011). Chernobyl (1986) combined a positive void coefficient with unsafe testing.
X: A 1 GW(e) reactor at 33% efficiency. Fissions per second?
> Thermal power 3 GW = 3 × 10^{9} J s^{-1}
> 200 MeV = 3.2 × 10^{-11} J ⇒ 9.4 × 10^{19} fissions per second
!: A reactor can't explode like a nuclear bomb; fuel enrichment is far too low. The hazards are overheating, steam or hydrogen explosions and radioactive release.
Q: What does a moderator do? | Slows fast neutrons to thermal energies where U-235 fission is likely.
Q: Why must cooling continue after shutdown? | Radioactive fission products keep producing decay heat.
M1: Most commercial reactors are: | Pressurised water reactors | Fast breeders | Fusion reactors | Molten salt | PWRs.
M2: Control rods contain: | Neutron absorbers like boron | Uranium | Water | Graphite | Absorb neutrons.

## Neutron moderation
S: Fission neutrons are born fast (~2 MeV) but U-235 fissions far more readily with slow (thermal, ~0.025 eV) neutrons. A moderator slows them through elastic collisions with light nuclei.
H: Physics of slowing
E: average logarithmic energy loss per collision: ξ ≈ 2/(A + 2/3)
E: collisions to thermalise ≈ ln(2 MeV/0.025 eV)/ξ = 18.2/ξ
- Hydrogen (A = 1): ξ = 1: ~18 collisions.
- Deuterium: ~25; carbon: ~115; uranium: ~2000 (useless).
H: Moderating ratio
- A good moderator must slow neutrons (high ξΣ_{s}) without absorbing them (low Σ_{a}).
- Light water: excellent slowing but absorbs (needs enriched fuel).
- Heavy water: excellent ratio; allows natural uranium.
- Graphite: low absorption, large size needed; fire risk.
H: Thermal neutrons
P: Thermalised neutrons follow a Maxwell distribution at the moderator temperature (most probable speed ~2200 m s^{-1} at 20 °C). Their wavelengths (~0.18 nm) suit diffraction: research reactors provide neutron beams for materials science.
X: Maximum fractional energy a neutron can lose hitting a carbon-12 nucleus head-on?
> Energy remaining ratio α = ((A − 1)/(A + 1))^{2} = (11/13)^{2} = 0.716
> Maximum loss 28%
!: Heavy nuclei make poor moderators: a neutron bounces off them like a ball off a wall, losing little energy.
Q: Why are light nuclei good moderators? | Elastic collisions with similar-mass nuclei transfer the most energy.
Q: Why can heavy-water reactors use natural uranium? | Heavy water absorbs very few neutrons while still moderating well.
M1: The best slowing per collision is with: | Hydrogen | Carbon | Lead | Uranium | Equal masses.
M2: Thermal neutrons at room temperature have energy about: | 0.025 eV | 2 MeV | 1 keV | 1 eV | k_{B}T.

## Nuclear energy and power
S: Nuclear power generates about 10% of the world's electricity with very low carbon emissions. Its strengths are reliability and energy density; its challenges are cost, waste, proliferation and public perception.
H: Energy density
- 1 kg of U-235 fissioned ≈ 8 × 10^{13} J ≈ 3 million kg of coal.
- A 1 GW reactor uses ~25–30 t of fuel per year (low-enriched).
H: Fuel cycle
- Mining → conversion → enrichment (centrifuges) → fuel fabrication → reactor (3–6 years) → spent fuel (cooling ponds, dry casks) → reprocessing (some countries) or disposal.
H: Comparisons
- Lifecycle emissions ~5–15 g CO_{2} per kWh (similar to wind; coal ~1000).
- Deaths per TWh among the lowest of all energy sources, including accidents.
- High capacity factor (~90%): steady baseload.
- Long construction times and high capital costs in many countries.
H: Future
P: Small modular reactors aim for factory-built, cheaper, safer units. Thorium cycles, fast reactors that burn long-lived waste, and fusion are longer-term options. Nuclear also powers submarines, icebreakers and spacecraft (RTGs).
X: A 1 GW(e) reactor running at 90% for a year produces how much electricity?
> E = 1 × 0.9 × 8760 h = 7.9 TWh
!: Radiation risk from normally operating plants is tiny compared with natural background; the debate centres on accidents, waste and cost.
Q: Why is nuclear power low-carbon? | Fission produces no CO_{2}; lifecycle emissions come mainly from construction and mining.
Q: What fraction of world electricity is nuclear? | About 10%.
M1: Uranium enrichment increases the fraction of: | U-235 | U-238 | Pu-239 | Thorium | 0.7% → 3–5%.
M2: A key advantage of nuclear power is: | High energy density and steady output | Zero waste | Low capital cost | Instant construction | Baseload.

## Radiation detection
S: Radiation detectors turn invisible ionising radiation into measurable signals by collecting the charge or light it produces. Different detectors suit different radiations, energies and purposes, from Geiger counters to giant neutrino observatories.
H: Gas detectors
- **Ionisation chambers**: collect ion pairs; measure dose rates.
- **Proportional counters**: gas gain; energy information.
- **Geiger–Müller tubes**: avalanche discharge; count particles, no energy information; dead time ~100 μs.
H: Scintillators
- NaI(Tl), CsI, plastic: light flashes detected by photomultipliers or SiPMs.
- Gamma spectroscopy, PET scanners, particle physics calorimeters.
H: Semiconductor detectors
- Silicon: tracking of charged particles (μm precision in LHC trackers).
- High-purity germanium: excellent gamma energy resolution (~0.15% at 1.3 MeV); cooled to 77 K.
- CdTe/CZT: room-temperature gamma detection.
H: Other
- Film badges and TLDs (thermoluminescent dosimeters) for personal dose.
- Cloud and bubble chambers (historic track imaging); Cherenkov detectors (Super-Kamiokande); neutron detectors (He-3, BF_{3}, Li-6).
X: A Geiger counter registers 4500 counts per minute with dead time 100 μs. True rate?
> Measured n = 75 s^{-1}; true N = n/(1 − nτ) = 75/(1 − 0.0075) ≈ 75.6 s^{-1}
> Small correction at this rate
!: A Geiger counter counts events but can't tell their energy or type without additional shielding tests.
Q: Why can't a Geiger counter measure particle energy? | Every event triggers a full avalanche of the same size.
Q: Which detector gives the best gamma-ray energy resolution? | High-purity germanium.
M1: Scintillators detect radiation by: | Emitting light when excited | Collecting gas ions | Changing colour permanently | Heating | Fluorescence.
M2: Background radiation should be measured because: | It must be subtracted from source counts | It's zero | It's dangerous | It calibrates energy | Correction.

## Radiation shielding
S: Shielding reduces radiation exposure by placing material between the source and people. The right material depends on the radiation: thin layers stop alphas and betas, dense materials attenuate gamma rays, and hydrogen-rich materials slow neutrons.
H: By radiation type
- **Alpha**: paper or skin; hazardous only if inhaled or ingested.
- **Beta**: few mm of plastic or aluminium; avoid high-Z materials, which produce bremsstrahlung X-rays.
- **Gamma/X-ray**: lead, tungsten, concrete, water; exponential attenuation.
- **Neutrons**: hydrogen-rich materials (water, polyethylene, concrete) to slow them, plus absorbers (boron, cadmium, lithium) and gamma shielding for capture gammas.
H: Attenuation
E: I = I_{0}e^{−μx}; HVL = ln 2/μ
- Half-value layer for 1 MeV gamma: lead ~9 mm, concrete ~5 cm, water ~10 cm.
- Build-up factors account for scattered photons.
H: Time, distance, shielding
P: Radiation protection relies on minimising time near sources, maximising distance (inverse square law for point sources), and shielding. The ALARA principle: keep doses As Low As Reasonably Achievable.
X: How much lead (HVL 9 mm) cuts a gamma dose rate by a factor of 1000?
> 1000 ≈ 2^{10}: 10 half-value layers
> 9 cm of lead
!: Shielding beta emitters with lead can increase dose by generating bremsstrahlung X-rays; use plastic first.
Q: What are the three principles of radiation protection? | Time, distance and shielding (under ALARA).
Q: Why are hydrogen-rich materials used for neutron shielding? | Hydrogen nuclei slow neutrons efficiently by elastic collisions.
M1: The best shield for alpha particles is: | Paper | Lead | Concrete | Water | Short range.
M2: Doubling distance from a point source reduces dose rate by: | 4 | 2 | 8 | 1 | Inverse square.

## Nuclear spectroscopy
S: Nuclear spectroscopy measures the energies of radiation emitted by nuclei to map their energy levels, spins and shapes. It identifies isotopes in everything from reactor fuel to meteorites and reveals how nuclear structure changes far from stability.
H: Gamma-ray spectroscopy
- Germanium detectors resolve lines to ~1 keV; peaks identify isotopes (Cs-137 662 keV, Co-60 1173 and 1332 keV, K-40 1461 keV).
- Coincidence measurements build level schemes.
- Large arrays (GRETA, AGATA) track gamma interactions for high efficiency.
H: Other probes
- Alpha spectroscopy (silicon detectors) for actinides.
- Beta spectroscopy; conversion electrons.
- Mass spectrometry (Penning traps, storage rings) for nuclear masses.
- Laser spectroscopy for charge radii and moments (isotope shifts, hyperfine structure).
H: Applications
P: Nuclear spectroscopy finds trace elements via neutron activation analysis, monitors fallout and nuclear materials, identifies elements on planetary surfaces (gamma-ray spectrometers on Mars and lunar orbiters), and tests nuclear models for stellar nucleosynthesis.
X: A spectrum shows peaks at 1173 and 1332 keV. Source?
> These are the cobalt-60 gamma lines
!: A gamma peak's energy identifies the transition, but its intensity depends on detector efficiency and geometry, which must be calibrated.
Q: Why are germanium detectors used in gamma spectroscopy? | Their excellent energy resolution separates closely spaced lines.
Q: What is neutron activation analysis? | Irradiating a sample with neutrons and identifying elements from the gamma rays of the resulting isotopes.
M1: The 662 keV gamma line identifies: | Caesium-137 | Cobalt-60 | Potassium-40 | Radium-226 | Common calibration source.
M2: Coincidence measurements help: | Build nuclear level schemes | Reduce resolution | Measure half-life only | Detect alphas | Cascades.

## Nuclear magnetic resonance
S: Nuclei with spin behave like tiny magnets that precess in a magnetic field. NMR detects radio waves absorbed and emitted as they flip, revealing molecular structure in chemistry and creating detailed images of the body in MRI.
H: Principles
E: f = γB/(2π) :: Larmor frequency (proton: 42.58 MHz T^{-1})
- Spin-½ nuclei: ¹H, ¹³C, ¹⁵N, ¹⁹F, ³¹P.
- A radiofrequency pulse tips magnetisation; it precesses and induces a signal (free induction decay).
- Relaxation: T_{1} (spin–lattice, return to equilibrium) and T_{2} (spin–spin, dephasing).
H: NMR spectroscopy
- **Chemical shift**: electrons shield nuclei slightly (ppm), depending on chemical environment.
- **J-coupling**: splitting from neighbouring spins.
- Determines organic molecular structures and protein structures in solution (Nobel prizes: Bloch and Purcell 1952, Ernst 1991, Wüthrich 2002).
H: MRI
P: Magnetic field gradients make the Larmor frequency depend on position, so the signal encodes location (Lauterbur and Mansfield, Nobel 2003). Contrast comes from differences in T_{1}, T_{2} and proton density between tissues. Functional MRI tracks blood oxygenation to map brain activity. No ionising radiation is involved.
X: Proton Larmor frequency in a 3 T MRI scanner?
> f = 42.58 × 3 = 128 MHz
!: MRI signal comes mainly from hydrogen nuclei in water and fat, not from electrons or ionising radiation.
Q: What is the Larmor frequency? | The precession frequency of nuclear spins in a field, f = γB/(2π).
Q: How does MRI locate signals in space? | Magnetic field gradients make the resonance frequency depend on position.
M1: T_{2} relaxation describes: | Loss of phase coherence among spins | Return of longitudinal magnetisation | Heating | Field strength | Spin–spin dephasing.
M2: Chemical shifts in NMR come from: | Electron shielding of nuclei | Nuclear mass | Temperature | Gravity | Local electronic environment.

## Nuclear astrophysics
S: Nuclear astrophysics explains how stars shine and how the chemical elements were made. Hydrogen and helium came from the Big Bang; heavier elements were forged in stars, supernovae and neutron-star mergers.
H: Big Bang nucleosynthesis
- First ~3 minutes: ~75% H, ~25% He-4 by mass, traces of D, He-3, Li-7.
- Predicted abundances match observations; the deuterium abundance measures the density of ordinary matter.
H: Stellar burning
- **pp chain** (Sun) and **CNO cycle** (heavier stars): hydrogen to helium.
- **Triple-alpha**: 3 ⁴He → ¹²C (via a resonance predicted by Hoyle); then oxygen, neon, magnesium, silicon burning up to iron-group elements.
- Each stage faster: silicon burning lasts about a day in a massive star.
H: Beyond iron
- **s-process** (slow neutron capture) in asymptotic giant branch stars: half of heavy elements (barium, lead).
- **r-process** (rapid neutron capture) in neutron-star mergers (confirmed by GW170817's kilonova) and possibly some supernovae: gold, platinum, uranium.
- **p-process** for proton-rich isotopes.
H: Laboratory challenges
P: Many key reactions occur at energies too low to measure directly (tiny cross-sections); underground labs (LUNA) shield from cosmic rays. Rare isotope facilities (FRIB) make the neutron-rich nuclei of the r-process.
X: Why do the Sun's core reactions need 15 million K but bombs need different conditions?
> Stellar fusion relies on huge masses, densities and long times with slow tunnelling rates
> The Sun's power density is only ~280 W m^{-3} in the core: less than a compost heap
!: Stars can't make elements heavier than iron by fusion for energy; heavier elements need neutron capture.
Q: Where were most elements heavier than iron made? | By neutron capture: the s-process in giant stars and the r-process in neutron-star mergers and some supernovae.
Q: What did Big Bang nucleosynthesis produce? | Mostly hydrogen and helium-4, with traces of deuterium, helium-3 and lithium-7.
M1: The triple-alpha process produces: | Carbon-12 | Iron-56 | Gold | Helium-4 | 3 ⁴He → ¹²C.
M2: GW170817 confirmed that neutron-star mergers make: | r-process elements like gold | Helium only | Hydrogen | Nothing | Kilonova.

## Nuclear waste and radiation safety
S: Nuclear technology produces radioactive waste and exposes people to radiation, so it's governed by strict safety principles. Understanding doses, risks and waste management lets these be weighed honestly against the benefits.
H: Dose quantities
E: absorbed dose (Gy) = J kg^{-1}
E: equivalent dose (Sv) = absorbed dose × radiation weighting (alpha 20, gamma/beta 1, neutrons 2.5–20)
E: effective dose (Sv) = Σ tissue weighting × equivalent dose
- Natural background: ~2.4 mSv per year worldwide (radon ~half).
- Chest X-ray ~0.02 mSv; CT scan ~2–10 mSv; occupational limit 20 mSv per year.
- Acute ~4–5 Sv is lethal to about half without treatment.
H: Risk
- Linear no-threshold model (used for protection): ~5% extra lifetime cancer risk per sievert.
- Deterministic effects (burns, radiation sickness) above thresholds (~0.5–1 Sv).
H: Waste
- Low-level (gloves, tools): most volume, little activity.
- Intermediate.
- High-level (spent fuel): ~3% of volume, ~95% of radioactivity; needs isolation for ~10^{4}–10^{5} years.
- Deep geological repositories: Finland's Onkalo is the first, opening in the mid-2020s.
- Reprocessing recovers uranium and plutonium; fast reactors could burn long-lived actinides.
X: A worker receives 0.5 mGy from gamma rays and 0.05 mGy from alphas. Equivalent dose?
> Gamma: 0.5 mSv; alpha: 0.05 × 20 = 1.0 mSv
> Total 1.5 mSv
!: Becquerels (activity) and sieverts (dose) measure different things; a high-activity source may give little dose if shielded or distant.
Q: What is the difference between gray and sievert? | Gray measures absorbed energy per kg; sievert weights it for biological effect.
Q: How is high-level waste to be disposed of long term? | Deep geological repositories that isolate it for tens of thousands of years.
M1: Typical annual natural background dose is about: | 2–3 mSv | 2 Sv | 0.02 mSv | 200 mSv | Radon dominates.
M2: Alpha radiation has a high weighting factor because: | It deposits energy densely, damaging DNA heavily | It penetrates deeply | It's a photon | It's uncharged | High LET.
`;
