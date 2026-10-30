// Unit 23: Nuclear Physics. Format: kit/course/notes.js
export default `
## Nuclear structure
S: The nucleus is a tightly bound cluster of protons and neutrons held together by the strong nuclear force. Its structure, with shells, pairing and collective motions, explains stability, radioactivity and the energy of stars and reactors.
H: Notation
E: ^{A}_{Z}X :: Z protons, N = A − Z neutrons, mass number A
- Isotopes: same Z; isobars: same A; isotones: same N.
- ~3300 known nuclides; ~250 stable.
H: Models
- **Liquid drop**: nucleus as an incompressible charged drop; gives the semi-empirical mass formula, fission.
- **Shell model** (Mayer, Jensen, Nobel 1963): nucleons in orbits with strong spin–orbit coupling; magic numbers 2, 8, 20, 28, 50, 82, 126 give extra stability.
- **Collective model**: deformed nuclei rotate and vibrate (rotational bands).
- **Ab initio**: from nucleon–nucleon forces derived from QCD (chiral effective field theory) for light nuclei.
H: Shapes
P: Most nuclei are slightly deformed (rugby-ball shaped); some are pear-shaped (radium-224, probing symmetry violations); halo nuclei like lithium-11 have neutrons orbiting far outside the core, making them as large as lead nuclei.
X: How many neutrons in ^{238}_{92}U?
> N = 238 − 92 = 146
!: The nucleus isn't a static bag of balls; nucleons move rapidly (~0.25c) in quantum orbits.
Q: What are magic numbers? | Numbers of protons or neutrons (2, 8, 20, 28, 50, 82, 126) giving closed shells and extra stability.
Q: Which model explains nuclear fission well? | The liquid-drop model.
M1: Doubly magic lead-208 has: | 82 protons and 126 neutrons | 82 neutrons | 126 protons | 208 protons | Both magic.
M2: Isotopes have the same: | Number of protons | Number of neutrons | Mass number | Number of nucleons | Same element.

## Protons, neutrons and nucleons
S: Protons and neutrons, together called nucleons, are the building blocks of nuclei. They're nearly identical in mass and strong interaction, differing mainly in charge, and each is made of three quarks.
H: Properties
- Proton: +e, 938.27 MeV/c^{2}, spin ½, stable (lifetime > 10^{34} years).
- Neutron: 0, 939.57 MeV/c^{2}, spin ½; free neutrons decay (n → p + e^{−} + ν̄_{e}) with lifetime ~880 s.
- Magnetic moments: proton +2.79 μ_{N}; neutron −1.91 μ_{N} (a neutral particle with a magnetic moment shows internal structure).
- Proton charge radius ~0.84 fm.
H: Quark content
- Proton: uud; neutron: udd.
- Quarks contribute only ~1% of the mass; the rest is energy of the gluon field and quark motion (QCD).
H: Isospin
P: Because the strong force treats protons and neutrons almost identically, Heisenberg introduced isospin: they're two states of one particle, the nucleon. Mirror nuclei (³H and ³He) have nearly identical spectra. The small neutron–proton mass difference (1.29 MeV) comes from quark masses and electromagnetism, and makes hydrogen atoms stable.
H: The neutron lifetime puzzle
- Beam experiments give ~888 s; bottle (trap) experiments ~878 s: an unresolved discrepancy.
X: Why can a free neutron decay but a proton can't (in vacuum)?
> m_{n} > m_{p} + m_{e} (by 0.78 MeV): neutron decay releases energy
> p → n would need energy input
!: Neutrons are stable inside most nuclei, because decay there would leave the nucleus in a higher energy state.
Q: What is a nucleon? | A proton or neutron.
Q: Why is the neutron's magnetic moment evidence of structure? | A neutral point particle wouldn't have one; it comes from its charged quarks.
M1: The neutron's quark content is: | udd | uud | uuu | ddd | Charge 0.
M2: The free neutron lifetime is about: | 15 minutes | 1 second | 1 year | 10^{34} years | ~880 s.

## Nuclear size and density
S: Nuclei are a few femtometres across, and their radius grows as the cube root of the number of nucleons. This means all nuclei have roughly the same density, about 2 × 10^{17} kg m^{-3}.
H: Radius
E: R = r_{0}A^{1/3}, r_{0} ≈ 1.2 fm
- Measured by electron scattering (diffraction minima), muonic atoms and alpha scattering.
- Charge density roughly constant inside, falling off over a ~2 fm surface (Fermi distribution).
H: Constant density
P: Volume ∝ A, so density is constant: nucleons pack like an incompressible liquid. This saturation reflects the short range of the nuclear force: each nucleon only interacts with its neighbours. Neutron stars are essentially giant nuclei held by gravity, at similar densities.
H: Electron scattering
- Hofstadter (Nobel 1961) used high-energy electrons (λ ~ fm) to map nuclear and proton charge distributions.
- Diffraction-like minima give radii.
X: Radius of ^{208}Pb?
> R = 1.2 × 208^{1/3} = 1.2 × 5.92 = 7.1 fm
!: Nuclear "size" depends on what's probed: charge radius and matter radius can differ (neutron skins in heavy nuclei).
Q: How does nuclear radius depend on mass number? | R = r_{0}A^{1/3}.
Q: Why is nuclear density roughly constant? | The strong force saturates: nucleons interact only with near neighbours, packing like a liquid.
M1: A nucleus with 8 times the nucleons has radius: | 2 times larger | 8 times | 4 times | The same | Cube root.
M2: Nuclear density is about: | 2 × 10^{17} kg m^{-3} | 10^{3} kg m^{-3} | 10^{10} kg m^{-3} | 10^{30} kg m^{-3} | Same for all nuclei.

## Nuclear binding energy
S: Binding energy is the energy needed to pull a nucleus apart into separate protons and neutrons. Its value per nucleon peaks near iron, which is why fusing light nuclei and splitting heavy ones both release energy.
H: Definition
E: B = [Zm_{p} + Nm_{n} − M_{nucleus}]c^{2}
- Per nucleon: ~1.1 MeV (²H), 7.1 MeV (⁴He), 8.8 MeV peak (⁶²Ni, ⁵⁶Fe), ~7.6 MeV (²³⁸U).
H: Semi-empirical mass formula
E: B = a_{V}A − a_{S}A^{2/3} − a_{C}Z(Z − 1)/A^{1/3} − a_{A}(A − 2Z)^{2}/A ± δ
- Volume (+), surface (−), Coulomb (−), asymmetry (−), pairing (±).
- Coefficients (MeV): a_{V} ≈ 15.8, a_{S} ≈ 18.3, a_{C} ≈ 0.71, a_{A} ≈ 23.2.
H: The curve's meaning
P: Light nuclei gain binding by fusing (stars); heavy nuclei gain by splitting (reactors). Iron-56 and nickel-62 are near the peak: stars can't extract energy beyond iron, which triggers the collapse of massive stars into supernovae.
X: Binding energy of ⁴He (M = 4.002 602 u; m_{p} = 1.007 276 u, m_{n} = 1.008 665 u, m_{e} included via atomic masses: use ¹H = 1.007 825 u).
> Δm = 2(1.007 825) + 2(1.008 665) − 4.002 602 = 0.030 378 u
> B = 0.030 378 × 931.5 = 28.3 MeV (7.07 MeV per nucleon)
!: Binding energy is energy released when a nucleus forms, so more binding means less mass, not more.
Q: Where does binding energy per nucleon peak? | Near iron and nickel (A ≈ 56–62).
Q: What do the terms of the semi-empirical mass formula represent? | Volume, surface, Coulomb repulsion, neutron–proton asymmetry and pairing effects.
M1: Fission releases energy because: | Products have higher binding energy per nucleon | Neutrons gain mass | Electrons are released | Mass increases | Moving towards iron.
M2: The Coulomb term reduces binding because: | Protons repel each other | Neutrons attract | Electrons screen | Surface is curved | Electrostatic energy.

## Mass defect
S: A nucleus weighs less than the sum of its separate protons and neutrons. The missing mass, the mass defect, is the binding energy divided by c^{2}: direct evidence that E = mc^{2}.
H: Calculation
E: Δm = Zm_{p} + Nm_{n} − M_{nucleus}
E: B = Δmc^{2}; 1 u = 931.494 MeV/c^{2}
- Use atomic masses with hydrogen atom masses to account for electrons automatically.
H: Energy released in reactions
E: Q = (Σm_{initial} − Σm_{final})c^{2}
- Positive Q: exothermic (energy released).
- Nuclear reactions release ~MeV per reaction vs ~eV for chemical: ~10^{6} times more energy per kilogram of fuel.
H: Mass measurements
P: Penning traps measure atomic masses to parts in 10^{11}, enough to detect the mass of chemical binding energy and to test E = mc^{2} directly (Rainville et al., 2005: confirmed to 4 parts in 10^{7} by comparing nuclear gamma-ray energies with mass differences).
X: Q of D + T → ⁴He + n (masses 2.014 102, 3.016 049, 4.002 602, 1.008 665 u)?
> Δm = 5.030 151 − 5.011 267 = 0.018 884 u
> Q = 17.6 MeV
!: The mass defect isn't missing matter; the energy was released when the nucleus formed, and mass and energy are equivalent.
Q: What is the mass defect? | The difference between the mass of separated nucleons and the nucleus.
Q: How much energy is 1 u? | About 931.5 MeV.
M1: The D–T fusion reaction releases about: | 17.6 MeV | 200 MeV | 4 eV | 1 GeV | Fusion Q.
M2: Nuclear fuels release ~how many times more energy per kg than chemical? | ~10^{6} | ~10 | ~10^{12} | ~2 | MeV vs eV.

## Nuclear forces
S: The nuclear force binds protons and neutrons despite the electric repulsion of protons. It's very strong at around 1 fm, repulsive at shorter distances and negligible beyond about 3 fm. It's a residual effect of the strong force between quarks.
H: Properties
- Short range (~1–3 fm); much stronger than electromagnetism at those distances.
- Strongly repulsive core below ~0.5 fm.
- Charge-independent (pp, nn, np similar) to a good approximation.
- Spin-dependent: the deuteron (np) is bound only in the spin-1 state; no bound pp or nn.
- Has a tensor component: the deuteron is slightly non-spherical.
H: Meson exchange
E: range ≈ ħ/(m_{π}c) ≈ 1.4 fm
P: Yukawa (1935) proposed the force is carried by a massive particle; its mass sets the range. The pion (140 MeV), discovered in 1947, fits. Heavier mesons explain the shorter-range repulsion. Today chiral effective field theory derives nuclear forces systematically from QCD's symmetries, and lattice QCD computes them from quarks and gluons.
H: Three-nucleon forces
- Needed to reproduce binding energies of light nuclei and neutron-rich isotopes; important for neutron star matter.
X: Estimate the range of a force carried by a 140 MeV particle.
> r ≈ ħc/(mc^{2}) = 197 MeV fm/140 MeV = 1.4 fm
!: The nuclear force isn't a fundamental force itself; it's the leftover of the strong force between colour-neutral nucleons, like van der Waals forces between neutral molecules.
Q: What sets the range of the nuclear force in Yukawa's theory? | The mass of the exchanged particle (pion): r ≈ ħ/(mc).
Q: Why is there no bound diproton? | The nuclear force isn't strong enough in the spin-0 pp state to overcome repulsion and kinetic energy.
M1: The nuclear force is: | Short-range and strong | Long-range | Weaker than gravity | Only repulsive | ~fm range.
M2: Yukawa predicted which particle? | The pion | The muon | The neutrino | The photon | Meson.

## Nuclear stability
S: Only certain combinations of protons and neutrons are stable. Light stable nuclei have equal numbers; heavier ones need extra neutrons to dilute proton repulsion. Nuclei off this "valley of stability" decay towards it.
H: The chart of nuclides
- Plot N against Z: stable nuclei form a band, N ≈ Z for light, N ≈ 1.5Z for heavy (Pb: 82 protons, 126 neutrons).
- Neutron-rich nuclei undergo β^{−} decay; proton-rich undergo β^{+} or electron capture; very heavy ones alpha decay or fission.
- No stable nuclei beyond lead/bismuth (Bi-209 decays with half-life 2 × 10^{19} years).
H: Factors
- Pairing: even–even nuclei are most numerous stable (~150); odd–odd stable only for light (²H, ⁶Li, ¹⁰B, ¹⁴N).
- Magic numbers give extra stability: tin (Z = 50) has ten stable isotopes.
- Drip lines: limits beyond which nucleons are unbound.
H: Island of stability
P: Theory predicts superheavy nuclei near Z ≈ 114–120, N ≈ 184 may be relatively long-lived due to shell closures. Elements up to Z = 118 (oganesson) have been made, with half-lives of milliseconds; reaching the island needs more neutron-rich beams.
X: Is carbon-14 (6p, 8n) stable? Which way does it decay?
> Too many neutrons for its Z
> β^{−} decay to nitrogen-14 (half-life 5730 years)
!: "Stable" means no observed decay; some long-lived nuclei (like bismuth-209) were once thought stable.
Q: Why do heavy stable nuclei have more neutrons than protons? | Extra neutrons add nuclear binding without adding Coulomb repulsion.
Q: How do neutron-rich nuclei decay? | By β^{−} decay, turning a neutron into a proton.
M1: The heaviest element with a practically stable isotope is: | Lead | Uranium | Iron | Bismuth (very long-lived) | Pb-208.
M2: The island of stability is predicted near: | Z ≈ 114–120, N ≈ 184 | Iron | Helium | Z = 1 | Superheavy shell closures.

## Radioactive decay
S: Unstable nuclei spontaneously transform into more stable ones, emitting radiation. Each nucleus decays randomly, but large numbers follow a precise exponential law, characterised by a half-life.
H: The decay law
E: dN/dt = −λN ⇒ N = N_{0}e^{−λt}
E: A = λN :: activity (becquerel, Bq = decays per second)
E: t_{1/2} = ln 2/λ; τ = 1/λ :: half-life and mean lifetime
- 1 curie = 3.7 × 10^{10} Bq (activity of 1 g of radium).
H: Randomness
P: The decay of any individual nucleus is unpredictable; quantum mechanics gives only a probability per unit time, independent of age, temperature, pressure or chemistry (except electron capture, which changes slightly with chemical environment). Counts follow Poisson statistics.
H: Half-lives span huge ranges
- Polonium-212: 0.3 μs; carbon-14: 5730 y; uranium-238: 4.5 × 10^{9} y; tellurium-128: ~2 × 10^{24} y.
X: A sample has 8 × 10^{12} atoms of iodine-131 (t_{1/2} = 8.0 days). Activity?
> λ = 0.693/(8 × 86 400) = 1.0 × 10^{-6} s^{-1}
> A = 8 × 10^{6} Bq
!: After two half-lives, a quarter remains, not none: decay never reaches exactly zero for large samples.
Q: State the radioactive decay law. | N = N_{0}e^{−λt}.
Q: How is half-life related to the decay constant? | t_{1/2} = ln 2/λ.
M1: After 3 half-lives, the fraction remaining is: | 1/8 | 1/3 | 1/6 | 1/9 | (1/2)^{3}.
M2: Heating a radioactive sample changes its half-life: | Essentially not at all | By doubling | By halving | Dramatically | Nuclear processes are insensitive.

## Alpha, beta and gamma decay
S: The three classic types of radioactive decay emit helium nuclei (alpha), electrons or positrons (beta) or high-energy photons (gamma). They differ in what changes in the nucleus, in their energies and in how penetrating they are.
H: Alpha decay
E: ^{A}_{Z}X → ^{A−4}_{Z−2}Y + ^{4}_{2}He
- Heavy nuclei; discrete energies 4–9 MeV; stopped by paper or a few cm of air; highly ionising.
- Quantum tunnelling through the Coulomb barrier.
H: Beta decay
E: n → p + e^{−} + ν̄_{e} :: β^{−}
E: p → n + e^{+} + ν_{e} :: β^{+} (in nuclei)
- Electron capture: p + e^{−} → n + ν_{e}.
- Continuous electron energy spectrum: the missing energy led Pauli to propose the neutrino (1930).
- Weak interaction; stopped by a few mm of aluminium.
H: Gamma decay
- Nucleus drops between energy levels, emitting a photon (keV–MeV); Z and A unchanged.
- Usually follows alpha or beta decay; metastable states (technetium-99m, 6 h) are medically valuable.
- Highly penetrating: needs lead or concrete.
X: Radium-226 alpha decays. Product?
> ^{226}_{88}Ra → ^{222}_{86}Rn + ^{4}_{2}He: radon-222, a radioactive gas
!: Gamma rays carry no charge and no mass number change; they don't change the element.
Q: Why does beta decay need a neutrino? | Electron energies are continuous; a third particle must carry the missing energy and momentum.
Q: What stops alpha particles? | Paper, skin or a few centimetres of air.
M1: In β^{−} decay, Z: | Increases by 1 | Decreases by 1 | Stays the same | Decreases by 2 | n → p.
M2: Technetium-99m is useful in medicine because it: | Emits gamma rays with a short half-life | Emits alphas | Is stable | Emits neutrons | 140 keV gamma, 6 h.

## Decay chains and half-life
S: Many radioactive nuclei decay into products that are themselves radioactive, forming decay chains that end at a stable isotope. Their behaviour depends on the relative half-lives and enables radiometric dating of rocks, bones and the Earth itself.
H: Natural decay series
- Uranium-238 → … → lead-206 (14 steps, including radium-226, radon-222).
- Uranium-235 → lead-207; thorium-232 → lead-208.
- Neptunium series (extinct in nature).
H: Equilibrium
E: dN_{2}/dt = λ_{1}N_{1} − λ_{2}N_{2}
- **Secular equilibrium** (t_{1/2,parent} ≫ daughter's): activities equal: A_{1} = A_{2}.
- **Transient equilibrium**: parent somewhat longer-lived; daughter activity tracks parent's.
- Medical generators: molybdenum-99 (66 h) → technetium-99m (6 h), "milked" daily.
H: Radiometric dating
E: t = (1/λ) ln(1 + D/P) :: daughter D, parent P
- Carbon-14 (up to ~50 000 years).
- Potassium–argon, uranium–lead (zircons up to 4.4 billion years old), rubidium–strontium.
- Isochron methods remove the need to know initial daughter amounts.
X: A rock has equal numbers of ²³⁸U and its final daughter ²⁰⁶Pb (none initially). Age?
> D/P = 1 ⇒ t = t_{1/2} = 4.5 × 10^{9} years
!: Carbon dating assumes a known initial ¹⁴C level; calibration curves (tree rings, corals) correct for its variations.
Q: What is secular equilibrium? | When a long-lived parent and short-lived daughter have equal activities.
Q: Why is uranium–lead dating so reliable? | Two independent decay chains (U-238 and U-235) cross-check ages, and zircons exclude initial lead.
M1: Carbon-14 dating works up to about: | 50 000 years | 5 billion years | 100 years | 1 million years | ~10 half-lives.
M2: A Tc-99m generator relies on: | The decay of Mo-99 parent | Fission | Neutron capture in the hospital | Alpha decay | Transient equilibrium.

## Nuclear reaction equations
S: Nuclear reactions are written like chemical equations, but must conserve mass number, charge, energy and momentum. Balancing them predicts products, and mass differences give the energy released.
H: Conservation rules
- Total A (nucleon number) conserved.
- Total Z (charge) conserved.
- Lepton number and baryon number conserved.
- Mass–energy and momentum conserved.
H: Notation
E: a + X → Y + b, or X(a, b)Y
- E.g. ^{14}N(α, p)^{17}O: Rutherford's first artificial transmutation (1919).
- ^{9}Be(α, n)^{12}C: Chadwick's discovery of the neutron (1932).
H: Q-value and thresholds
E: Q = (m_{a} + m_{X} − m_{Y} − m_{b})c^{2}
E: E_{th} = −Q(1 + m_{a}/m_{X}) :: threshold for endothermic reactions (non-relativistic)
- Exothermic (Q > 0) reactions can occur at low energy (if Coulomb barriers allow).
X: Complete: ^{235}_{92}U + ^{1}_{0}n → ^{141}_{56}Ba + ^{92}_{36}Kr + ?
> A: 236 = 141 + 92 + 3; Z: 92 = 56 + 36 + 0
> 3 neutrons
!: Particles' kinetic energies count in energy conservation; mass number and charge balancing alone don't guarantee a reaction is energetically possible.
Q: What must be conserved in a nuclear reaction equation? | Nucleon number, charge, energy, momentum (and lepton and baryon numbers).
Q: What was Rutherford's first artificial transmutation? | Nitrogen-14 bombarded by alphas producing oxygen-17 and a proton.
M1: ^{27}Al(n, α)? produces: | ^{24}Na | ^{24}Mg | ^{28}Al | ^{23}Ne | A: 27 + 1 − 4 = 24; Z: 13 − 2 = 11.
M2: A reaction with Q < 0: | Needs a minimum kinetic energy to occur | Releases energy | Is impossible | Has no products | Endothermic threshold.

## Nuclear cross-sections
S: A cross-section measures how likely a nuclear reaction is, expressed as an effective target area. Cross-sections vary enormously with energy and determine reactor design, shielding and astrophysical reaction rates.
H: Definition
E: R = σΦN :: reaction rate = cross-section × flux × number of targets
E: 1 barn = 10^{-28} m^{2}
- Geometric size of a heavy nucleus ~2 barns.
- Differential cross-section dσ/dΩ: angular distribution.
H: Energy dependence
- **1/v law**: neutron absorption cross-sections often ∝ 1/v at low energies (slow neutrons linger near nuclei).
- **Resonances**: sharp peaks when energy matches a compound-nucleus level (Breit–Wigner shape).
- Thermal neutron capture: cadmium-113 ~20 000 b, boron-10 3840 b, xenon-135 ~2.6 million b (a reactor poison).
- U-235 thermal fission: 585 b; fast fission: ~1 b.
H: Attenuation
E: I = I_{0}e^{−nσx}; mean free path λ = 1/(nσ)
X: Thermal neutrons in water (hydrogen n = 6.7 × 10^{28} m^{-3}, σ_{capture} = 0.33 b). Mean free path for capture?
> λ = 1/(6.7 × 10^{28} × 3.3 × 10^{-29}) = 0.45 m
!: A cross-section isn't the physical size of the nucleus; quantum effects make it much larger or smaller depending on energy.
Q: What is a barn? | A unit of cross-section, 10^{-28} m^{2}.
Q: Why do slow neutrons often have larger absorption cross-sections? | They spend more time near the nucleus (1/v law).
M1: Xenon-135 matters in reactors because: | Its huge neutron absorption cross-section poisons the chain reaction | It's a fuel | It moderates neutrons | It's stable | Reactor poison.
M2: Reaction rate is proportional to: | Cross-section × flux × number of targets | Mass only | Temperature only | Half-life | R = σΦN.

## Nuclear scattering
S: Scattering particles off nuclei reveals nuclear sizes, shapes, forces and excited states. Elastic scattering maps the nucleus's shape; inelastic scattering excites it, and knockout reactions probe individual nucleons.
H: Types
- **Rutherford (Coulomb)**: low-energy charged particles; deviations show nuclear size.
- **Elastic electron scattering**: charge distributions (form factors).
- **Neutron scattering**: no Coulomb barrier; probes nuclear potential; resonances.
- **Inelastic**: excites nuclear levels; energy loss spectrum shows excited states.
- **Deep inelastic**: high-energy electrons scatter off quarks inside nucleons.
H: Optical model
P: The nucleus acts like a cloudy crystal ball for incoming particles: a complex potential where the real part refracts and the imaginary part absorbs (removing flux into reactions). It fits elastic scattering data across many nuclei and energies.
H: Form factors
E: dσ/dΩ = (dσ/dΩ)_{point}|F(q)|^{2}
- F(q) is the Fourier transform of the charge distribution; diffraction minima give the radius.
X: Electrons of what energy have a de Broglie wavelength ~ 1 fm?
> λ = hc/E for relativistic electrons: E = 1240 MeV fm/1 fm ≈ 1.2 GeV
!: To see small structures you need short wavelengths, so high energies: nuclear physics needs MeV–GeV probes.
Q: What does the form factor reveal? | The spatial distribution of charge inside a nucleus (its Fourier transform).
Q: Why are neutrons good probes of nuclei? | They have no charge, so no Coulomb barrier.
M1: Electron scattering is good for measuring: | Charge distributions | Neutron spins | Half-lives | Fission yields | Electromagnetic probe.
M2: In the optical model, absorption represents: | Flux lost to reactions | Light absorption | Electron capture | Gamma emission | Imaginary potential.

## Nuclear fission
S: In fission, a heavy nucleus such as uranium-235 splits into two medium nuclei plus neutrons, releasing about 200 MeV. The extra neutrons can trigger further fissions, enabling reactors and nuclear weapons.
H: The process
- U-235 absorbs a thermal neutron → U-236* (excited) → deforms → splits.
- Fragments typically asymmetric (masses ~95 and ~140).
- 2–3 prompt neutrons per fission; ~0.65% delayed neutrons (from fragment decays) make reactors controllable.
- Energy: ~165 MeV fragment kinetic energy, plus gammas, betas, neutrinos: ~200 MeV total.
H: Liquid-drop explanation
P: Deforming a heavy nucleus increases surface energy but decreases Coulomb energy. When Z^{2}/A is large enough, the fission barrier (~6 MeV) can be overcome by the binding energy released when a neutron is absorbed. U-235 (odd N) gains extra pairing energy on absorbing a neutron, so slow neutrons suffice; U-238 needs fast neutrons.
H: Discovery
- Hahn and Strassmann (1938) found barium from uranium bombarded with neutrons; Meitner and Frisch explained it as fission (1939).
X: Energy from fissioning 1 kg of U-235?
> Atoms = 1000/235 × 6.02 × 10^{23} = 2.56 × 10^{24}
> E = 2.56 × 10^{24} × 200 MeV × 1.6 × 10^{-13} J/MeV = 8.2 × 10^{13} J: about 20 kilotons of TNT
!: Fission fragments are neutron-rich and highly radioactive; that's the origin of most nuclear waste.
Q: Why does U-235 fission with slow neutrons but U-238 doesn't? | U-235 gains extra pairing energy on absorbing a neutron, exceeding its fission barrier.
Q: Why are delayed neutrons important? | They slow the reactor's response enough to make it controllable.
M1: Energy released per U-235 fission is about: | 200 MeV | 17.6 MeV | 2 MeV | 1 GeV | Typical.
M2: Who explained fission theoretically? | Meitner and Frisch | Hahn alone | Fermi | Bohr only | 1939.

## Nuclear fusion
S: Fusion joins light nuclei into heavier ones, releasing energy because the products are more tightly bound. It powers the Sun and stars and could provide abundant clean energy on Earth, if the plasma can be confined long enough.
H: Reactions
E: D + T → ⁴He (3.5 MeV) + n (14.1 MeV) :: easiest for reactors
E: D + D → ³He + n or T + p
E: 4p → ⁴He + 2e^{+} + 2ν_{e} + 26.7 MeV :: Sun (pp chain)
H: The Coulomb barrier
- Nuclei must get within ~fm despite repulsion (~0.4 MeV for D–T).
- Thermal energies in the Sun's core (~1.3 keV) are far below; quantum tunnelling and the high-energy tail make it work (Gamow peak).
- Fusion reactors need ~100–150 million K.
H: Lawson criterion
E: nτ_{E}T ≳ 3 × 10^{21} keV s m^{-3} :: ignition for D–T
- **Magnetic confinement**: tokamaks (ITER), stellarators (Wendelstein 7-X).
- **Inertial confinement**: lasers compress fuel pellets; NIF achieved ignition (more fusion energy out than laser energy in) in December 2022.
X: What fraction of D–T fusion energy goes to the neutron, and why?
> Momentum conservation: lighter particle gets more energy
> E_{n}/E_{α} = m_{α}/m_{n} ≈ 4: 14.1 of 17.6 MeV (80%)
!: Fusion in stars is slow precisely because it relies on rare tunnelling; that's why the Sun lasts 10 billion years.
Q: What is the Lawson criterion? | The minimum product of density, confinement time and temperature needed for fusion ignition.
Q: How do nuclei in the Sun overcome the Coulomb barrier? | Quantum tunnelling, aided by the high-energy tail of the Maxwell distribution.
M1: The easiest fusion reaction for power plants is: | D–T | p–p | D–D | He–He | Highest cross-section at lower T.
M2: NIF achieved ignition in: | 2022 | 1958 | 2005 | 2035 | December 2022.

## Chain reactions
S: In a chain reaction, each fission releases neutrons that cause more fissions. Whether the chain dies out, stays steady or grows depends on the multiplication factor k, which reactors keep exactly at 1.
H: Multiplication factor
E: k = neutrons in one generation/neutrons in the previous
- k < 1: subcritical; k = 1: critical (steady); k > 1: supercritical.
E: k_{∞} = ηfpε :: four-factor formula (infinite medium)
- η: neutrons per absorption in fuel; f: thermal utilisation; p: resonance escape; ε: fast fission factor.
- Finite reactors: k_{eff} = k_{∞} × non-leakage probability.
H: Critical mass
- Minimum mass for k_{eff} = 1: depends on shape, density, enrichment, reflectors.
- Bare sphere of U-235 ~52 kg; Pu-239 ~10 kg; less with reflectors or compression.
H: Reactor control
P: Prompt neutron generation times are ~10^{-4} s in thermal reactors, too fast to control. Delayed neutrons (from fission products, seconds to a minute) extend the effective generation time, so reactors are operated "delayed critical" and controlled by rods and boron. Prompt criticality causes rapid power excursions (as at Chernobyl).
X: A reactor with k = 1.001 and effective generation time 0.1 s. How fast does power grow?
> Growth per second: (1.001)^{10} ≈ 1.01: 1% per second, controllable
!: A critical reactor (k = 1) isn't dangerous; it simply means a steady chain reaction.
Q: What does k = 1 mean? | Each generation has the same number of neutrons: a steady chain reaction.
Q: Why are delayed neutrons essential for reactor control? | They lengthen the effective generation time from ~0.1 ms to ~0.1 s.
M1: A subcritical assembly has: | k < 1 | k = 1 | k > 1 | k = 0 | Dies out.
M2: Neutron reflectors reduce critical mass by: | Returning escaping neutrons | Absorbing neutrons | Heating fuel | Adding fuel | Less leakage.

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
