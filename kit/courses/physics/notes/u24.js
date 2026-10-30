// Unit 24: Particle Physics. Format: kit/course/notes.js
export default `
## Fundamental particles
S: Fundamental particles have no known internal structure. In the Standard Model, matter is built from 12 fermions (six quarks and six leptons) and forces are carried by bosons, with the Higgs boson giving many of them mass.
H: The list
- **Quarks**: up, down, charm, strange, top, bottom.
- **Leptons**: electron, muon, tau and their neutrinos.
- **Gauge bosons**: photon, gluons (8), W^{+}, W^{−}, Z.
- **Scalar**: Higgs boson.
- Each fermion has an antiparticle.
H: Point-like?
P: Electrons scatter as point particles down to ~10^{-19} m; quarks show no substructure either at LHC energies. "Fundamental" is provisional: protons were once thought fundamental, and string theory proposes deeper structure.
H: Ordinary matter
- Everything around us uses only up and down quarks, electrons (and electron neutrinos in decays).
- Heavier particles appear in cosmic rays, accelerators and the early universe.
X: How many fundamental fermions, counting particles and antiparticles but not colours?
> 12 fermions + 12 antifermions = 24 (with colour, quarks triple: 18 + 18 + 12 = 48)
!: Protons and neutrons aren't fundamental; they're bound states of quarks and gluons.
Q: What are the fundamental fermions of the Standard Model? | Six quarks and six leptons.
Q: How do we know electrons are point-like? | Scattering experiments show no structure down to ~10^{-19} m.
M1: Which is not fundamental? | Proton | Electron | Up quark | Photon | uud bound state.
M2: The Standard Model has how many gluon types? | 8 | 1 | 3 | 6 | SU(3) octet.

## Quarks and leptons
S: Quarks feel the strong force and are always confined inside hadrons; leptons don't feel it and can exist freely. Both come in three generations of increasing mass.
H: Quarks
- Charges: up-type (u, c, t) +⅔e; down-type (d, s, b) −⅓e.
- Masses: u ~2 MeV, d ~5 MeV, s ~95 MeV, c ~1.3 GeV, b ~4.2 GeV, t ~173 GeV (heavier than a gold atom).
- Three colours each; confined.
- Top quark decays before it can form hadrons (~5 × 10^{-25} s).
H: Leptons
- Charged: e (0.511 MeV), μ (105.7 MeV, lifetime 2.2 μs), τ (1777 MeV, 0.29 ps).
- Neutrinos: ν_{e}, ν_{μ}, ν_{τ}; tiny masses (< 0.8 eV); interact only weakly.
- Lepton flavour numbers conserved in the Standard Model (except via neutrino oscillations).
H: Discovery timeline
P: Electron (1897), muon (1936, "who ordered that?"), electron antineutrino (1956), muon neutrino (1962), charm (1974), tau (1975), bottom (1977), top (1995), tau neutrino (2000). Quarks were proposed (Gell-Mann, Zweig, 1964) to explain hadron patterns and confirmed in deep inelastic scattering.
X: Charge of the Ω^{−} (sss)?
> 3 × (−⅓) = −1
!: Quark masses inside protons are tiny; most of the proton's mass comes from gluon field energy and quark kinetic energy.
Q: What charges do quarks carry? | +⅔e for up-type, −⅓e for down-type.
Q: Why does the top quark not form hadrons? | It decays faster than the time needed to hadronise.
M1: The muon is: | A heavier cousin of the electron | A quark | A boson | Stable | Second-generation lepton.
M2: Which quark is heaviest? | Top | Bottom | Charm | Strange | ~173 GeV.

## Fermions and bosons
S: Particles are either fermions (half-integer spin, obeying Pauli exclusion) or bosons (integer spin, able to share states). In the Standard Model, matter particles are fermions and force carriers are bosons.
H: Fermions
- Spin ½: quarks and leptons; protons and neutrons.
- Exclusion makes atoms, chemistry and stable matter possible.
H: Bosons
- Spin 1 (vector bosons): photon, gluons, W, Z (force carriers).
- Spin 0 (scalar): Higgs.
- Spin 2: graviton (hypothetical).
- Composite bosons: mesons (quark–antiquark), even-nucleon nuclei.
H: Why the distinction matters
P: The spin–statistics theorem (proved in relativistic quantum field theory) forces half-integer spin particles to have antisymmetric states. Forces from vector bosons between like charges repel (electromagnetism); scalar and tensor exchanges attract (Higgs, gravity), which is why gravity is always attractive.
X: Is a pion (quark + antiquark) a boson or fermion?
> Two spin-½ constituents combine to integer spin (0 for pions)
> Boson
!: Being a boson isn't the same as being a force carrier; mesons and helium-4 atoms are bosons too.
Q: What spin do the Standard Model's force carriers have? | Spin 1 (the Higgs is spin 0).
Q: Why is gravity always attractive in particle terms? | It's mediated by a spin-2 field, and even-spin exchanges between like sources attract.
M1: The Higgs boson has spin: | 0 | ½ | 1 | 2 | Scalar.
M2: Mesons are: | Bosons | Fermions | Leptons | Gauge bosons | q q̄.

## Fundamental interactions
S: All known physics arises from four interactions: gravity, electromagnetism, the weak force and the strong force. They differ hugely in strength and range, and three are described by quantum gauge theories in the Standard Model.
H: Comparison (relative strength at ~1 fm)
- **Strong**: 1; range ~1 fm (confinement); gluons.
- **Electromagnetic**: ~1/137; infinite range; photon.
- **Weak**: ~10^{-6}; range ~10^{-18} m (massive W, Z).
- **Gravity**: ~10^{-38}; infinite range; graviton (not observed; no quantum theory yet).
H: Unification
- Electricity + magnetism (Maxwell, 1860s).
- Electromagnetism + weak = electroweak (Glashow, Weinberg, Salam; confirmed by W and Z discoveries, 1983).
- Grand unification with the strong force (hypothetical, ~10^{16} GeV).
- Including gravity: string theory, loop quantum gravity (no experimental confirmation).
H: Running couplings
P: Interaction strengths change with energy: the strong coupling weakens at high energy (asymptotic freedom), electromagnetism strengthens slightly. Extrapolated, the three Standard Model couplings nearly meet around 10^{15}–10^{16} GeV, a hint of unification (they meet precisely in supersymmetric models).
X: Why does the weak force have such a short range?
> Range ~ ħ/(Mc) with M_{W} ≈ 80 GeV
> ħc/M_{W}c^{2} = 197 MeV fm/80 400 MeV ≈ 2.5 × 10^{-3} fm
!: The weak force isn't intrinsically weak: its coupling is similar to electromagnetism's; it seems weak at low energy because its carriers are heavy.
Q: Which interaction has the longest range and weakest strength? | Gravity.
Q: Why is the weak force short-ranged? | Its carriers, the W and Z bosons, are very massive.
M1: Which forces were unified in electroweak theory? | Electromagnetic and weak | Strong and weak | Gravity and electromagnetism | Strong and gravity | Glashow–Weinberg–Salam.
M2: The strong force coupling at higher energy: | Decreases | Increases | Is constant | Becomes infinite | Asymptotic freedom.

## Electromagnetic interaction
S: The electromagnetic interaction acts between electrically charged particles through the exchange of photons. Described by quantum electrodynamics, it governs atoms, chemistry, light and almost everything in everyday life.
H: Properties
- Massless photon ⇒ infinite range, 1/r^{2} force.
- Coupling α ≈ 1/137 (at low energy).
- Conserves charge, parity, flavour.
- Acts on charged leptons, quarks and W bosons; not on neutrinos or gluons.
H: Processes
- Coulomb scattering, Compton scattering, pair production, annihilation (e^{+}e^{−} → γγ), bremsstrahlung.
- Electromagnetic decays: π^{0} → γγ (8.5 × 10^{-17} s), Σ^{0} → Λγ.
- Typical EM decay times ~10^{-20}–10^{-16} s.
H: Precision tests
P: QED predicts the electron's anomalous magnetic moment to better than one part in a trillion, agreeing with experiment: the most precisely tested prediction in science. The muon's g − 2 is measured to 0.2 ppm; its comparison with theory is under intense study as a window to new physics.
X: Why can't a single photon turn into an electron–positron pair in empty space?
> Momentum and energy can't both be conserved: in the pair's centre-of-mass frame, there's no momentum, but a photon always has momentum
> A nucleus nearby absorbs recoil
!: The photon itself carries no electric charge, so photons don't interact directly with each other (except via quantum loops: light-by-light scattering, observed at the LHC).
Q: What particle mediates electromagnetism? | The photon.
Q: Why is π^{0} → γγ an electromagnetic decay? | It produces photons and conserves the quantum numbers that the weak force would violate; it's fast (~10^{-17} s).
M1: Which particle doesn't feel electromagnetism? | Neutrino | Electron | Up quark | W boson | Neutral.
M2: Light-by-light scattering happens through: | Virtual charged particle loops | Direct photon charge | Gravity | The strong force | Higher-order QED.

## Weak interaction
S: The weak interaction changes one type of quark or lepton into another, causing beta decay and powering the Sun's first fusion step. It's carried by the massive W and Z bosons and is the only force that violates parity and distinguishes particles from antiparticles.
H: Features
- Charged current (W^{±}): changes flavour and charge (d → u e^{−} ν̄_{e}).
- Neutral current (Z): no charge change (neutrino scattering; discovered 1973 at CERN).
- Short range; slow decays (10^{-13} s to minutes to billions of years).
- The only force felt by neutrinos (besides gravity).
H: Symmetry violation
- **Parity (P)**: Wu (1957): cobalt-60 electrons emitted preferentially opposite the nuclear spin. Only left-handed neutrinos (and right-handed antineutrinos) participate.
- **C** violated maximally; **CP** violated slightly (kaons, B mesons).
H: Quark mixing
E: CKM matrix :: quark weak eigenstates are mixtures of mass eigenstates
- Allows decays between generations (s → u, b → c), suppressed by small mixing angles (Cabibbo angle ~13°).
X: Beta decay at the quark level for a neutron.
> d → u + W^{−}; W^{−} → e^{−} + ν̄_{e}
> udd → uud: neutron becomes proton
!: The weak force doesn't only cause decays; neutral currents scatter particles too, and weak processes are essential in supernova explosions.
Q: What did Wu's experiment show? | The weak interaction violates parity symmetry.
Q: What's the difference between charged and neutral currents? | Charged currents (W) change particle charge and flavour; neutral currents (Z) don't.
M1: The W boson mass is about: | 80 GeV | 0.5 MeV | 1 TeV | 125 GeV | M_{W} ≈ 80.4 GeV.
M2: Neutrinos in the Standard Model are produced: | Left-handed | Right-handed | Unpolarised | With either handedness | Parity violation.

## Strong interaction
S: The strong interaction binds quarks into protons, neutrons and other hadrons, and indirectly binds nuclei. It's carried by gluons, which themselves carry colour charge, leading to confinement at long distances and asymptotic freedom at short distances.
H: Properties
- Acts on colour charge (red, green, blue and anticolours).
- Gluons are massless but carry colour: they interact with each other.
- **Confinement**: quarks and gluons are never seen isolated; the energy between separated quarks grows linearly (~1 GeV fm^{-1}), producing new quark–antiquark pairs instead (hadronisation, jets).
- **Asymptotic freedom**: at high energies quarks behave almost freely (Gross, Wilczek, Politzer, Nobel 2004).
H: Typical processes
- Strong decays are fast (~10^{-23} s): Δ^{++} → pπ^{+}, ρ → ππ.
- Hadron production in collisions; jets.
H: Quark–gluon plasma
P: At ~2 × 10^{12} K (energy densities ~1 GeV fm^{-3}), hadrons melt into a quark–gluon plasma, recreated in heavy-ion collisions at RHIC and the LHC. It behaves as a nearly perfect liquid, with the lowest viscosity-to-entropy ratio known. The universe was in this state for its first ~10 μs.
X: Why do energetic quarks produce jets?
> Pulling a quark away stretches a gluon flux tube with growing energy
> The tube breaks into quark–antiquark pairs, making a spray of hadrons along the quark's direction
!: The strong force between nucleons (nuclear force) is a residual effect; the fundamental strong force acts between quarks and gluons.
Q: What is confinement? | Quarks and gluons can't be isolated; they're always bound in colour-neutral hadrons.
Q: What is asymptotic freedom? | The strong coupling becomes weak at high energies (short distances).
M1: Gluons differ from photons because they: | Carry colour charge and interact with each other | Are massive | Have spin 2 | Are fermions | Non-abelian.
M2: Strong decays typically take about: | 10^{-23} s | 10^{-8} s | 1 s | 10^{-16} s | Fast.

## Gravitational interaction
S: Gravity is the weakest fundamental interaction but dominates on large scales because it's always attractive and acts on all energy. It's described by general relativity, and there is no accepted quantum theory of gravity.
H: In particle physics
- Utterly negligible in particle reactions: gravitational attraction between two protons is ~10^{-36} of their electric repulsion.
- Couples to energy–momentum, not charge: everything gravitates, including light.
- Hypothetical carrier: the graviton (massless, spin 2).
H: The Planck scale
E: E_{P} = √(ħc^{5}/G) ≈ 1.2 × 10^{19} GeV; l_{P} ≈ 1.6 × 10^{-35} m
- Where quantum gravity effects should become strong.
- Far beyond any accelerator (LHC: 10^{4} GeV).
H: Open problems
P: Combining general relativity with quantum field theory gives non-renormalisable infinities. Candidates include string theory, loop quantum gravity and asymptotic safety. Black hole entropy and Hawking radiation, the information paradox, and the cosmological constant problem are the main theoretical clues; experiments test quantum effects on gravitationally interacting masses at ever smaller scales.
X: Ratio of gravitational to electric force between two electrons?
> Gm_{e}^{2}/(ke^{2}) = 6.67 × 10^{-11} × (9.11 × 10^{-31})^{2}/(8.99 × 10^{9} × (1.6 × 10^{-19})^{2})
> ≈ 2.4 × 10^{-43}
!: Gravity isn't part of the Standard Model; the Standard Model works with gravity treated classically.
Q: What is the Planck energy? | About 10^{19} GeV, where quantum gravity effects should become important.
Q: Why does gravity dominate astronomy despite being weakest? | It's always attractive and can't be screened, while matter is electrically neutral overall.
M1: The hypothetical graviton has spin: | 2 | 1 | 0 | ½ | Tensor field.
M2: Gravity couples to: | Energy and momentum | Electric charge only | Colour charge | Weak isospin only | All forms of energy.

## Standard Model
S: The Standard Model is the quantum field theory of all known particles and three of the four forces. Built in the 1960s–70s, it has passed every collider test, but leaves out gravity, dark matter, neutrino masses (in its original form) and the matter–antimatter asymmetry.
H: Structure
E: SU(3)_{C} × SU(2)_{L} × U(1)_{Y} :: gauge symmetry group
- 12 matter fermions (3 generations), 12 gauge bosons, 1 Higgs boson.
- Electroweak symmetry broken by the Higgs field.
- 19 free parameters (masses, mixing angles, couplings), plus neutrino parameters.
H: Successes
- Predicted W, Z (1983), top quark (1995), Higgs (2012), and the gluon's properties.
- Precision electroweak tests at LEP to 0.1%.
- QED's g − 2 predictions; QCD's running coupling and jets.
H: What it doesn't explain
P: Gravity; dark matter (~85% of matter); dark energy; neutrino masses (need extension); why matter dominates antimatter; why there are three generations and why masses span a factor of ~10^{12}; the hierarchy problem (why the Higgs is so light). These motivate physics beyond the Standard Model.
X: Count the Standard Model's gauge bosons.
> 8 gluons (SU(3)) + W^{+}, W^{−}, Z (from SU(2) × U(1) after breaking) + photon = 12
!: The Standard Model is a "model" only in name; it's an extraordinarily precise and well-tested theory, though incomplete.
Q: What is the Standard Model's gauge group? | SU(3) × SU(2) × U(1).
Q: Name three things the Standard Model doesn't explain. | Gravity, dark matter, matter–antimatter asymmetry (also dark energy, neutrino masses, the hierarchy problem).
M1: Which particle was the last Standard Model particle discovered? | Higgs boson | Top quark | Tau neutrino | W boson | 2012.
M2: The Standard Model includes how many generations of fermions? | 3 | 2 | 4 | 6 | Confirmed by Z width.

## Particle generations
S: Quarks and leptons come in three generations, each a heavier copy of the first with the same charges and interactions. Only the first generation makes up ordinary matter; why there are three is unknown.
H: The three generations
- I: (u, d), (e, ν_{e}).
- II: (c, s), (μ, ν_{μ}).
- III: (t, b), (τ, ν_{τ}).
- Heavier generations decay to lighter ones via the weak interaction.
H: Why exactly three?
P: LEP measured the Z boson's decay width (1989): it allows exactly three types of light neutrinos (2.984 ± 0.008), ruling out a fourth generation with a light neutrino. The cosmic microwave background and Big Bang nucleosynthesis agree. Three generations are also the minimum needed for CP violation in the quark sector (Kobayashi and Maskawa, Nobel 2008).
H: Mass hierarchy
- Masses span ~0.5 MeV (electron) to 173 GeV (top), and neutrinos < 1 eV.
- Yukawa couplings to the Higgs set the masses; their pattern is unexplained ("flavour puzzle").
X: Why don't we find muons in ordinary matter?
> Muons decay (μ → e ν̄_{e} ν_{μ}) with lifetime 2.2 μs
> Only first-generation particles are stable enough to build atoms
!: Generations aren't excited states of each other; they're separate particles with identical gauge interactions but different masses.
Q: How was the number of light neutrino types measured? | From the Z boson's decay width at LEP.
Q: Why are three generations needed for CP violation in the Standard Model? | A complex phase in the CKM mixing matrix requires at least three generations.
M1: The second-generation charged lepton is the: | Muon | Tau | Electron | Charm | μ.
M2: The top and bottom quarks belong to the: | Third generation | First | Second | Fourth | Heaviest.

## Quark flavours and colour charge
S: Quarks come in six flavours (types) and three colours. Flavour is changed only by the weak force; colour is the charge of the strong force, and every observed particle is colour-neutral.
H: Flavour
- u, d, s, c, b, t, with quantum numbers: strangeness, charm, bottomness, topness.
- Conserved by strong and EM interactions; violated by weak interactions.
- Isospin groups u and d (near-equal masses).
H: Colour
- Three colours (r, g, b) and anticolours; SU(3) symmetry.
- Baryons: three quarks of different colours (rgb: "white").
- Mesons: quark–antiquark (colour–anticolour).
- Gluons carry colour–anticolour combinations (8 independent).
H: Evidence for colour
P: The Δ^{++} (uuu) has three identical quarks with aligned spins in the same state, forbidden by Pauli exclusion unless they differ in another quantum number: colour. The rate of e^{+}e^{−} → hadrons (R ratio) is three times what it would be without colour. π^{0} → γγ's rate also needs three colours.
X: R = σ(e^{+}e^{−} → hadrons)/σ(e^{+}e^{−} → μ^{+}μ^{−}) below the charm threshold?
> R = N_{c}Σq^{2} = 3 × (4/9 + 1/9 + 1/9) = 2
> Measured ≈ 2 (with small QCD corrections)
!: "Colour" has nothing to do with visual colour; it's just a name for a three-valued charge.
Q: What evidence supports quark colour? | The Δ^{++} spin–statistics puzzle and the R ratio in e^{+}e^{−} annihilation.
Q: Which interactions can change quark flavour? | Only the weak interaction.
M1: How many quark flavours are there? | 6 | 3 | 8 | 12 | u, d, s, c, b, t.
M2: A baryon is colour-neutral because it contains: | One quark of each colour | Two colours | Gluons only | An antiquark | rgb.

## Hadrons, baryons and mesons
S: Hadrons are composite particles made of quarks held by gluons. Baryons contain three quarks (protons, neutrons); mesons contain a quark and an antiquark (pions, kaons). Hundreds of hadrons are known.
H: Baryons (qqq)
- Proton (uud), neutron (udd), Λ (uds), Σ, Ξ, Ω^{−} (sss).
- Baryon number +1; the proton is the lightest, so it's stable.
- Spin ½ octet and spin 3/2 decuplet (eightfold way).
H: Mesons (qq̄)
- Pions (π^{+} = ud̄, π^{−}, π^{0}), kaons (K^{+} = us̄), D and B mesons, J/ψ (cc̄), Υ (bb̄).
- Baryon number 0; all unstable.
H: Exotic hadrons
P: QCD allows other colour-neutral combinations: tetraquarks (qqq̄q̄) and pentaquarks (qqqqq̄) were confirmed at LHCb (2015 onwards). Glueballs (bound gluons) are predicted but not clearly identified.
H: The eightfold way
- Gell-Mann (1961) organised hadrons by SU(3) flavour symmetry, predicting the Ω^{−} (found 1964).
X: Quark content and charge of K^{−}?
> K^{+} = us̄, so K^{−} = sū
> Charge −⅓ − ⅔ = −1
!: Hadrons aren't just their valence quarks: they contain a sea of gluons and quark–antiquark pairs that carry much of their momentum.
Q: What's the difference between baryons and mesons? | Baryons are three quarks; mesons are a quark and an antiquark.
Q: Why is the proton stable? | It's the lightest baryon, and baryon number is conserved.
M1: π^{+} is made of: | ud̄ | uud | ūd | uu | Charge +1.
M2: The Ω^{−} discovery confirmed: | The eightfold way (SU(3) flavour) | Quarks are free | Leptons | Parity violation | Gell-Mann's prediction.

## Antimatter and antiparticles
S: Every particle has an antiparticle with the same mass and opposite charges. Particles and antiparticles can annihilate into energy or be created in pairs, and the universe's lack of antimatter is one of physics' biggest puzzles.
H: Properties
- Same mass, lifetime and spin; opposite electric charge, baryon and lepton numbers, flavour.
- Some neutral particles are their own antiparticles (photon, π^{0}, Z); whether neutrinos are (Majorana) is unknown.
H: Discovery
- Dirac's equation (1928) predicted negative-energy solutions; interpreted as antimatter.
- Anderson found the positron in cosmic rays (1932).
- Antiproton (1955), antineutron (1956), antihydrogen (1995; trapped 2010), antihelium nuclei.
H: Annihilation and creation
E: e^{+} + e^{−} → 2γ (each 511 keV, at rest)
E: γ → e^{+} + e^{−} (near a nucleus, E_{γ} > 1.022 MeV)
H: Uses and puzzles
P: PET scans use positron annihilation. CERN's antimatter experiments test whether antimatter falls the same way (ALPHA-g, 2023: it falls down, as expected) and whether its spectra match matter's. The universe has essentially no primordial antimatter: explaining this baryon asymmetry needs CP violation beyond the Standard Model's amount.
X: Energy released when 1 g of antimatter annihilates with 1 g of matter?
> E = mc^{2} = 0.002 × 9 × 10^{16} = 1.8 × 10^{14} J (~43 kilotons of TNT)
!: Antimatter isn't "negative mass"; it has positive mass and falls downward in gravity.
Q: Who discovered the positron? | Carl Anderson (1932), in cosmic rays.
Q: What do PET scanners detect? | Pairs of 511 keV photons from positron–electron annihilation.
M1: An antiproton has charge: | −e | +e | 0 | −2e | Opposite of proton.
M2: Antimatter tested at CERN was found to: | Fall downward like matter | Fall upward | Float | Not be affected by gravity | ALPHA-g 2023.

## Particle decay
S: Unstable particles decay into lighter ones, at rates set by the interaction involved and the energy available. Lifetimes range from 10^{-25} s (top quark) to 880 s (neutron), while some particles appear completely stable.
H: Decay rates
E: N = N_{0}e^{−t/τ}; Γ = ħ/τ :: decay width
- Strong decays: ~10^{-23} s (widths ~100 MeV).
- EM: ~10^{-20}–10^{-16} s.
- Weak: ~10^{-13} s to minutes.
- Phase space: more energy available ⇒ faster decay (Sargent's rule for beta decay: rate ∝ Q^{5}).
H: Relativistic time dilation
E: L = γβcτ :: mean decay length in the lab
- Cosmic-ray muons (τ = 2.2 μs) reach the ground from 15 km because time dilation extends their lifetimes.
- B mesons at colliders travel ~mm before decaying, allowing their decay vertices to be measured.
H: Branching ratios
- A particle can decay several ways; branching ratio = partial width/total width.
- Higgs: ~58% bb̄, ~21% WW*, ~6% ττ, ~0.2% γγ (rare but clean).
X: A pion (τ = 26 ns) with γ = 10. Mean decay length?
> L = γβcτ ≈ 10 × 3 × 10^{8} × 2.6 × 10^{-8} = 78 m
!: Lifetimes quoted in tables are in the particle's rest frame; lab-frame lifetimes are longer by γ.
Q: How is decay width related to lifetime? | Γ = ħ/τ.
Q: Why do cosmic-ray muons reach the ground? | Relativistic time dilation extends their lifetime in Earth's frame.
M1: A particle with width 100 MeV decays via: | The strong interaction | Weak | EM | Gravity | τ ~ 10^{-23} s.
M2: A branching ratio is: | The fraction of decays into a given final state | The lifetime | The mass ratio | The cross-section | Partial width/total.

## Conservation laws in particle reactions
S: Particle reactions obey strict conservation laws: some absolute (energy, momentum, charge, baryon and lepton number), others respected only by some interactions (strangeness, parity). Checking them tells you which reactions can happen and which force is responsible.
H: Always conserved (observed)
- Energy, momentum, angular momentum.
- Electric charge.
- Baryon number B (quarks ⅓, antiquarks −⅓).
- Lepton number L (and separate e, μ, τ lepton numbers, except neutrino oscillations).
- Colour (in strong interactions; hadrons are neutral).
H: Partially conserved
- Strangeness, charm etc.: conserved in strong and EM, violated in weak (ΔS = ±1).
- Parity: conserved by strong and EM, violated by weak.
- Isospin: conserved by strong (approximately).
- CP: violated slightly by weak.
- CPT: always conserved (theorem of relativistic QFT).
X: Is p + p → p + p + π^{0} allowed? p + p → p + π^{+}?
> First: charge 2 = 2, B 2 = 2: allowed (if enough energy)
> Second: charge 2 = 2, but B 2 → 1: forbidden
!: A reaction obeying all conservation laws still needs enough energy and may be suppressed; conservation laws say what's possible, not how likely.
Q: Which quantities are conserved in all known interactions? | Energy, momentum, angular momentum, charge, baryon number, lepton number, CPT.
Q: Which interaction violates strangeness? | The weak interaction.
M1: Which decay is forbidden? | p → e^{+} + γ | n → p + e^{−} + ν̄_{e} | π^{0} → γγ | μ^{−} → e^{−} + ν̄_{e} + ν_{μ} | Violates B and L.
M2: Λ (uds) → p + π^{−} must be a weak decay because: | Strangeness changes by 1 | Charge changes | Baryon number changes | Energy isn't conserved | ΔS = 1.

## Feynman diagrams
S: Feynman diagrams are pictures of particle interactions that stand for precise mathematical terms in quantum field theory calculations. Lines represent particles; vertices represent interactions, each contributing a coupling constant.
H: Rules (qualitative)
- Straight lines with arrows: fermions (arrow backwards in time = antiparticle).
- Wavy lines: photons, W, Z; curly lines: gluons; dashed: Higgs.
- Each vertex conserves charge, momentum, and relevant quantum numbers; contributes √α (amplitude).
- Internal lines: virtual particles (off-shell).
- Time usually runs left to right (convention varies).
H: Orders of approximation
- Tree level: simplest diagrams; amplitudes ∝ α for two vertices.
- Loops: higher-order corrections (∝ α^{2}…), giving radiative corrections like the Lamb shift and g − 2.
- In QED, higher orders are small (α ≈ 1/137); in low-energy QCD they aren't (α_{s} ~ 1).
H: Examples
- e^{−}e^{−} → e^{−}e^{−}: photon exchange (Møller).
- e^{+}e^{−} → μ^{+}μ^{−}: annihilation into a virtual photon or Z.
- β decay: d → u via W^{−} → e^{−}ν̄_{e}.
X: How many vertices in the lowest-order diagram for Compton scattering, and the amplitude's order?
> Two vertices (absorb a photon, emit a photon)
> Amplitude ∝ e^{2} ∝ α; cross-section ∝ α^{2}
!: Virtual particles in diagrams are terms in a calculation, not literal particles flying between others; their energies and momenta needn't satisfy E^{2} = p^{2}c^{2} + m^{2}c^{4}.
Q: What does each vertex in a QED Feynman diagram contribute? | A factor of the coupling, e (√α), in the amplitude.
Q: What do loop diagrams represent? | Higher-order quantum corrections.
M1: An arrow pointing backwards in time on a fermion line means: | An antiparticle | A virtual particle | A photon | An error | Feynman–Stückelberg.
M2: In β decay's diagram, the exchanged boson is: | W^{−} | Z | Photon | Gluon | Charged current.

## Quantum electrodynamics
S: Quantum electrodynamics (QED) is the quantum field theory of electrons, positrons and photons. It's the most precisely tested theory in physics, predicting quantities like the electron's magnetic moment to better than a part in a trillion.
H: Key features
- Gauge theory with U(1) symmetry; the photon is massless.
- Coupling α ≈ 1/137 at low energy; grows slowly with energy (~1/128 at 91 GeV) due to vacuum polarisation screening.
- Renormalisation removes infinities by expressing results in terms of measured charge and mass (Feynman, Schwinger, Tomonaga, Nobel 1965).
H: Predictions
- Electron g − 2: a = α/2π − 0.328(α/π)^{2} + … matches experiment to ~10^{-12}.
- Lamb shift in hydrogen.
- Casimir effect (vacuum fluctuations between plates; also derivable from van der Waals forces).
- Light-by-light scattering (observed at the LHC in 2017).
H: Vacuum polarisation
P: Virtual electron–positron pairs screen charge: at larger distances the effective charge is smaller. Probing closer (higher energy) sees more of the "bare" charge. This running of α is measured at colliders and is a model for running couplings in all quantum field theories.
X: The leading QED correction to the electron's g-factor (Schwinger term)?
> a = α/(2π) ≈ 0.00116
> g ≈ 2(1 + 0.00116) = 2.00232
!: QED's success doesn't mean electrons are surrounded by literal clouds of particles; vacuum polarisation is a calculational effect with measurable consequences.
Q: What is renormalisation? | A procedure that absorbs infinities by expressing predictions in terms of measured physical quantities.
Q: What is the Schwinger term? | α/2π, the first QED correction to the electron's magnetic moment.
M1: QED's gauge symmetry group is: | U(1) | SU(2) | SU(3) | SO(3) | Abelian.
M2: The effective strength of electromagnetism at higher energy: | Increases slightly | Decreases | Is constant | Vanishes | Vacuum polarisation.

## Quantum chromodynamics
S: Quantum chromodynamics (QCD) is the theory of the strong interaction between quarks and gluons. Its gluons carry colour charge themselves, giving it two remarkable properties: asymptotic freedom at short distances and confinement at long ones.
H: Structure
- SU(3) gauge theory; 8 gluons.
- Quarks in three colours; colour-neutral hadrons.
- Coupling α_{s} ~ 0.1 at 100 GeV, ~1 at 1 GeV (non-perturbative).
H: Methods
- **Perturbative QCD** at high energies: jets, parton distributions, LHC cross-sections.
- **Lattice QCD**: numerical simulation on a spacetime lattice; computes hadron masses (proton mass to ~1%), decay constants, the quark–gluon plasma transition (~155 MeV).
- **Effective theories**: chiral perturbation theory, heavy-quark effective theory.
H: Mass from energy
P: The up and down quark masses add up to only ~10 MeV of the proton's 938 MeV. The rest comes from the energy of gluon fields and quark motion, through QCD's dynamics (and chiral symmetry breaking). Most of the visible mass of the universe is QCD binding energy.
H: Open problems
- A rigorous proof of confinement and the mass gap (a Millennium Prize problem).
- The proton's spin decomposition (quark spins carry only ~30%).
X: Why can't we isolate a single quark?
> Separating quarks stores energy in a gluon flux tube, rising linearly with distance
> Before quarks separate far, the tube breaks into new quark–antiquark pairs: hadrons, not free quarks
!: Lattice QCD calculations are first-principles, not fits; they predict masses from just quark masses and α_{s}.
Q: Where does most of the proton's mass come from? | Gluon field energy and quark kinetic energy, not the quarks' rest masses.
Q: What is lattice QCD? | Numerical calculation of QCD on a discrete spacetime lattice.
M1: QCD's coupling is large at: | Low energies | High energies | All energies | Never | Confinement scale.
M2: Proving QCD confinement rigorously is: | A Millennium Prize problem | Solved | Impossible | Irrelevant | Yang–Mills mass gap.

## Electroweak theory
S: Electroweak theory unifies electromagnetism and the weak force into a single interaction, broken at low energies by the Higgs field. It predicted the W and Z bosons and their masses, confirmed at CERN in 1983.
H: Structure
- SU(2)_{L} × U(1)_{Y}: weak isospin and hypercharge.
- Four gauge fields; symmetry breaking leaves the photon massless and gives W^{±} and Z mass.
E: e = g sin θ_{W}; sin^{2}θ_{W} ≈ 0.23 :: weak mixing angle
E: M_{W} = M_{Z} cos θ_{W}; M_{Z} ≈ 91.19 GeV, M_{W} ≈ 80.37 GeV
- Only left-handed fermions feel SU(2): built-in parity violation.
H: Confirmations
- Neutral currents (Gargamelle, 1973).
- W and Z discovery at CERN's SPS collider (Rubbia, van der Meer, Nobel 1984).
- LEP precision (millions of Z decays): tested quantum corrections, predicted the top quark and Higgs masses before discovery.
H: Unification energy
P: Above ~100 GeV, electromagnetic and weak interactions have similar strength; their difference at low energy comes from the W and Z masses. In the early universe (first ~10^{-12} s), the electroweak symmetry was unbroken.
X: Use M_{W} = M_{Z} cos θ_{W} with sin^{2}θ_{W} = 0.231.
> cos θ_{W} = √0.769 = 0.877
> M_{W} = 91.19 × 0.877 = 80.0 GeV (measured 80.37, with quantum corrections)
!: Electroweak unification doesn't make electromagnetism and the weak force identical at everyday energies; symmetry breaking separates them.
Q: What did electroweak theory predict that was found in 1983? | The W and Z bosons.
Q: What is the weak mixing angle? | The parameter describing how the neutral gauge fields mix into the photon and Z.
M1: The Z boson mass is about: | 91 GeV | 80 GeV | 125 GeV | 173 GeV | 91.19 GeV.
M2: Electroweak symmetry is broken by: | The Higgs field | Gravity | Colour | Neutrinos | Spontaneous symmetry breaking.

## Higgs mechanism
S: The Higgs mechanism explains how the W and Z bosons, quarks and charged leptons acquire mass without breaking the underlying gauge symmetry of the theory. A field fills all of space with a nonzero value, and particles interacting with it become massive.
H: How it works
- The Higgs field has a "Mexican hat" potential: V = −μ^{2}|φ|^{2} + λ|φ|^{4}.
- Its lowest energy is at nonzero |φ| = v/√2, v ≈ 246 GeV: spontaneous symmetry breaking.
- Three of the field's four components become the longitudinal polarisations of W^{+}, W^{−}, Z (making them massive); the fourth is the Higgs boson.
- Fermion masses come from Yukawa couplings: m_{f} = y_{f}v/√2 (top quark y ≈ 1).
H: Analogies and limits
P: Superconductivity is the condensed-matter analogue: the photon effectively gains mass inside a superconductor (Meissner effect). Englert, Brout, Higgs and others proposed the mechanism in 1964 (Nobel 2013 to Englert and Higgs). The Higgs mechanism doesn't explain the masses' values; they're set by unexplained couplings.
H: Not all mass
- Most of the mass of ordinary matter comes from QCD binding, not the Higgs.
- Neutrino masses may need a different mechanism.
X: The electron's Yukawa coupling?
> y = √2 m_{e}/v = 1.414 × 0.511 MeV/246 000 MeV ≈ 2.9 × 10^{-6}
!: The Higgs field doesn't "slow particles down like treacle"; it's a non-zero field that couples to particles and changes their dispersion relation.
Q: What does the Higgs field's vacuum value do? | Breaks electroweak symmetry, giving masses to W, Z and fermions.
Q: Does the Higgs give protons most of their mass? | No; most comes from QCD binding energy.
M1: The Higgs field's vacuum expectation value is about: | 246 GeV | 125 GeV | 1 TeV | 91 GeV | v.
M2: The longitudinal polarisations of W and Z come from: | Components of the Higgs field | Gluons | Photons | Neutrinos | "Eaten" Goldstone bosons.

## Higgs boson
S: The Higgs boson is the particle excitation of the Higgs field. Discovered in 2012 by ATLAS and CMS at the LHC at about 125 GeV, it completed the Standard Model and confirmed how elementary particles get their masses.
H: Properties
- Mass 125.2 GeV; spin 0; positive parity (measured).
- Couplings proportional to particle masses (confirmed for W, Z, t, b, τ, μ).
- Lifetime ~1.6 × 10^{-22} s (width ~4 MeV, too narrow to measure directly).
H: Production and decay
- Gluon fusion via a top-quark loop (dominant), vector boson fusion, associated production.
- Discovery channels: H → γγ (clean diphoton peak) and H → ZZ* → 4 leptons (golden channel).
- Most common decay H → bb̄ (58%), observed in 2018.
H: Open questions
P: Is the Higgs elementary or composite? Is there one or several? Its self-coupling (the shape of the potential) hasn't yet been measured; it determines the stability of the vacuum: with measured masses, our vacuum appears metastable with an astronomically long lifetime. The Higgs mass is also puzzling (hierarchy problem): quantum corrections should push it far higher.
X: Why was H → γγ important despite its 0.2% branching ratio?
> Photons are measured precisely, giving a sharp mass peak above a smooth background
> Clean signature outweighs the small rate
!: The Higgs boson isn't the "God particle" in any meaningful sense; it's one particle among many, whose field happens to give others mass.
Q: When and where was the Higgs boson discovered? | 2012, by ATLAS and CMS at CERN's LHC.
Q: What determines how strongly the Higgs couples to a particle? | The particle's mass.
M1: The Higgs boson mass is about: | 125 GeV | 91 GeV | 1 TeV | 0.5 MeV | 125.2 GeV.
M2: The most common Higgs decay is to: | bb̄ | γγ | e^{+}e^{−} | Neutrinos | 58%.

## Neutrino oscillations
S: Neutrinos change flavour as they travel: an electron neutrino can later be detected as a muon or tau neutrino. This proves neutrinos have mass, the first confirmed physics beyond the original Standard Model (Kajita and McDonald, Nobel 2015).
H: Mechanism
- Flavour states (ν_{e}, ν_{μ}, ν_{τ}) are superpositions of mass states (ν_{1}, ν_{2}, ν_{3}).
- Different masses make the mass states' phases evolve differently; the flavour content oscillates.
E: P(ν_{α} → ν_{β}) = sin^{2}2θ sin^{2}(1.27Δm^{2}L/E) :: two flavours (Δm^{2} in eV^{2}, L in km, E in GeV)
H: Evidence
- Solar neutrino problem: only ~⅓ of expected ν_{e} detected (Davis, Homestake); SNO (2001) showed the total of all flavours matched the solar model.
- Atmospheric neutrinos: Super-Kamiokande (1998) saw fewer upward-going ν_{μ} (travelled through Earth).
- Reactor (KamLAND, Daya Bay) and accelerator (T2K, NOvA) experiments.
H: Parameters and questions
- Δm^{2}_{21} ≈ 7.5 × 10^{-5} eV^{2}; |Δm^{2}_{31}| ≈ 2.5 × 10^{-3} eV^{2}.
- Unknown: absolute masses (KATRIN: < 0.45 eV), mass ordering, CP-violating phase, whether neutrinos are Majorana (neutrinoless double beta decay searches).
- DUNE and Hyper-Kamiokande aim to measure CP violation in neutrinos.
X: At what L/E is the first oscillation maximum for atmospheric Δm^{2} = 2.5 × 10^{-3} eV^{2}?
> 1.27 × 2.5 × 10^{-3} × L/E = π/2
> L/E ≈ 500 km GeV^{-1} (T2K: 295 km at 0.6 GeV)
!: Oscillations depend on mass differences, not absolute masses; they prove neutrinos are massive but don't measure the masses themselves.
Q: Why do neutrino oscillations prove neutrinos have mass? | Oscillation requires different mass states evolving with different phases.
Q: How was the solar neutrino problem solved? | SNO measured all flavours, showing electron neutrinos had changed flavour.
M1: Oscillation probability depends on: | Δm^{2}L/E and mixing angles | Absolute neutrino mass | Electric charge | Temperature | Phase difference.
M2: Super-Kamiokande saw fewer upward-going muon neutrinos because: | They oscillated over the longer path through Earth | Earth absorbs them | The detector was faulty | They decay | Longer L.

## CP violation
S: CP symmetry combines swapping particles with antiparticles (C) and mirror reflection (P). The weak interaction violates it slightly, making matter and antimatter behave differently, a necessary ingredient for explaining why the universe is made of matter.
H: Discovery and observations
- Kaons (Cronin and Fitch, 1964, Nobel 1980): K_{L} occasionally decays into two pions.
- B mesons (BaBar, Belle, 2001): large CP violation in B decays.
- D mesons (LHCb, 2019); baryons (Λ_{b}, LHCb, 2025).
- Neutrinos: hints (T2K) of CP violation; to be measured by DUNE and Hyper-K.
H: Standard Model source
P: A single complex phase in the 3 × 3 CKM quark-mixing matrix gives CP violation (Kobayashi–Maskawa, needing three generations, predicted before the third generation was found). It fits all measurements so far, but is far too small to explain the matter–antimatter asymmetry.
H: Sakharov conditions
- Baryon number violation.
- C and CP violation.
- Departure from thermal equilibrium.
- Needed to generate a matter excess in the early universe (~1 extra baryon per 10^{9} photons).
X: Why do we need more CP violation than the Standard Model provides?
> The CKM phase produces an asymmetry many orders of magnitude too small (~10^{-20} vs needed ~10^{-10})
> New sources (leptogenesis via neutrinos, extended Higgs sectors) are proposed
!: CP violation doesn't mean CPT violation; CPT symmetry is preserved, which is why particles and antiparticles have equal masses and lifetimes.
Q: Who discovered CP violation? | Cronin and Fitch, in neutral kaon decays (1964).
Q: What are the Sakharov conditions? | Baryon number violation, C and CP violation, and departure from equilibrium.
M1: In the Standard Model, quark CP violation comes from: | A complex phase in the CKM matrix | The Higgs mass | Gluons | Gravity | KM mechanism.
M2: CP violation is needed to explain: | The matter–antimatter asymmetry | Dark energy | Neutrino masses | The Higgs mass | Baryogenesis.

## Symmetry breaking
S: Symmetry breaking occurs when a system's lowest-energy state lacks a symmetry that its laws possess. It underlies magnetism, superconductivity, the Higgs mechanism and the variety of forces we see today.
H: Explicit vs spontaneous
- **Explicit**: the laws themselves lack the symmetry (quark masses break chiral symmetry slightly).
- **Spontaneous**: the laws are symmetric but the ground state isn't (a ferromagnet chooses one direction).
H: Goldstone's theorem
P: When a continuous global symmetry breaks spontaneously, massless particles appear (Goldstone bosons): spin waves in magnets, phonons in crystals. Pions are near-Goldstone bosons of broken chiral symmetry in QCD, explaining why they're much lighter than other hadrons. With gauge symmetries, Goldstone bosons are "eaten" by gauge fields, which become massive: the Higgs mechanism.
H: In cosmology
- As the universe cooled, symmetries broke in stages (electroweak at ~10^{-12} s, QCD at ~10^{-5} s).
- Phase transitions could create topological defects (cosmic strings, domain walls, monopoles) or gravitational waves.
X: Why are pions light (~140 MeV) compared with protons (938 MeV)?
> QCD's chiral symmetry breaks spontaneously; pions are its near-Goldstone bosons
> They'd be massless if quark masses were zero; small quark masses give them small masses
!: Spontaneous symmetry breaking doesn't mean the symmetry is gone from the laws; it's hidden in the ground state and still constrains physics.
Q: What is Goldstone's theorem? | Spontaneous breaking of a continuous global symmetry produces massless bosons.
Q: Give an example of spontaneous symmetry breaking in everyday physics. | A ferromagnet choosing a magnetisation direction (also crystals).
M1: In the Higgs mechanism, Goldstone bosons: | Become longitudinal modes of W and Z | Remain massless particles | Are photons | Disappear entirely | Eaten.
M2: Phonons are Goldstone bosons of broken: | Translational symmetry | Gauge symmetry | Time reversal | CP | Crystal lattice.

## Particle accelerators
S: Particle accelerators use electric fields to speed up charged particles and magnetic fields to steer and focus them. They probe nature at the smallest scales, and thousands more serve medicine and industry.
H: Types
- **Electrostatic** (Van de Graaff, Cockcroft–Walton): up to ~25 MV.
- **Linear accelerators (linacs)**: radiofrequency cavities in a line (SLAC 3 km; medical linacs for radiotherapy).
- **Cyclotrons**: spiral path in a constant field; protons for therapy and isotope production.
- **Synchrotrons**: ring with synchronised rising magnetic field and RF; LHC (27 km, 6.8 TeV protons).
H: Key physics
E: p = qBr :: bending (relativistic momentum)
E: P_{rad} ∝ γ^{4}/r^{2} :: synchrotron radiation loss
- Electrons radiate strongly (light, high γ), limiting circular electron colliders; protons radiate little.
- Superconducting magnets (LHC: 8.3 T dipoles at 1.9 K).
- Focusing by quadrupole magnets.
H: Uses beyond particle physics
P: Synchrotron light sources produce intense X-rays for protein crystallography and materials science; medical linacs treat cancer; proton and carbon-ion therapy; ion implantation for chips; isotope production for PET; food sterilisation. Over 30 000 accelerators operate worldwide.
X: Radius of a 7 TeV proton in a 8.3 T field?
> p = 7 TeV/c = 3.7 × 10^{-15} kg m s^{-1}
> r = p/(eB) = 3.7 × 10^{-15}/(1.6 × 10^{-19} × 8.3) = 2.8 km (LHC bending radius ~2.8 km)
!: Higher energy needs bigger rings or stronger magnets; synchrotron radiation makes circular electron machines impractical above a few hundred GeV.
Q: Why do circular electron colliders lose energy so fast? | Synchrotron radiation scales as γ^{4}, and electrons have huge γ for their energy.
Q: How does a synchrotron keep particles on a fixed orbit as they speed up? | The magnetic field and RF frequency rise in step with the particles' momentum.
M1: The LHC accelerates protons to about: | 6.8 TeV | 7 GeV | 1 MeV | 100 TeV | Run 3 energy.
M2: Medical linacs mainly produce: | High-energy X-rays for radiotherapy | Neutrinos | Antimatter | Microwaves | Bremsstrahlung beams.

## Collider experiments
S: Colliders smash particle beams head-on so all their energy is available to create new particles. Giant detectors record the debris, and statistical analysis of billions of events reveals rare processes like Higgs production.
H: Why collide
E: √s = 2E (symmetric collider) vs √(2Em c^{2}) (fixed target)
- Head-on collisions give vastly more usable energy.
H: Key quantities
E: N = σ × ∫L dt :: number of events = cross-section × integrated luminosity
- Luminosity (cm^{-2} s^{-1}): LHC ~2 × 10^{34}.
- Integrated luminosity in inverse femtobarns (fb^{-1}): LHC delivered ~300 fb^{-1} by 2023; HL-LHC aims for 3000.
H: Notable colliders
- LEP (e^{+}e^{−}, 209 GeV): precision Z and W physics.
- Tevatron (pp̄, 1.96 TeV): top quark.
- LHC (pp, 13.6 TeV; also heavy ions): Higgs.
- Future: FCC (91 km), muon colliders, linear e^{+}e^{−} colliders (ILC, CLIC).
H: Data challenges
P: The LHC produces ~1 billion collisions per second; triggers keep ~1000 per second. The Worldwide LHC Computing Grid processes exabytes. Discoveries require 5σ significance after accounting for backgrounds and the look-elsewhere effect.
X: How many Higgs bosons in 140 fb^{-1} at 13 TeV (σ ≈ 55 pb)?
> N = 55 000 fb × 140 fb^{-1} = 7.7 million
!: Hadron collisions aren't collisions of whole protons; the hard scatter is between individual quarks or gluons carrying fractions of the proton's energy.
Q: Why do colliders beat fixed-target machines for new particle searches? | Colliding beams make all the energy available in the centre-of-mass frame.
Q: How is the number of events related to luminosity? | N = σ × integrated luminosity.
M1: An inverse femtobarn measures: | Integrated luminosity | Energy | Cross-section | Mass | Data collected.
M2: Two 7 TeV proton beams colliding head-on give √s = | 14 TeV | 7 TeV | 49 TeV | 3.5 TeV | 2E.

## Particle detectors
S: Particle detectors reconstruct what happened in a collision by measuring the tracks, energies and identities of the particles produced. Modern collider detectors are layered like onions, each layer specialised for different particles.
H: The layers (inside out)
- **Vertex detector and tracker** (silicon pixels and strips): charged tracks curving in a magnetic field: momentum and charge; displaced vertices from b and τ decays.
- **Electromagnetic calorimeter**: absorbs electrons and photons (showers): energy.
- **Hadronic calorimeter**: absorbs hadrons (jets).
- **Muon chambers**: outermost; only muons get through.
- Neutrinos escape: inferred from missing transverse momentum.
H: Particle identification
- Electron: track + EM shower. Photon: EM shower, no track.
- Muon: track through everything. Jet: tracks + hadronic energy.
- Cherenkov and time-of-flight detectors distinguish pions, kaons and protons.
H: Specialised detectors
P: Neutrino detectors use enormous volumes: Super-Kamiokande (50 000 t water, Cherenkov rings), IceCube (a cubic kilometre of Antarctic ice), liquid-argon time projection chambers (DUNE). Dark matter detectors look for tiny nuclear recoils deep underground (LZ, XENONnT).
X: A track curves with radius 1 m in a 2 T field. Momentum?
> p = 0.3BR GeV/c (B in T, R in m) = 0.6 GeV/c
!: Neutral particles leave no tracks; they're detected through their energy deposits or decay products, or inferred from missing momentum.
Q: How is a charged particle's momentum measured? | From the curvature of its track in a magnetic field.
Q: How are neutrinos detected at collider experiments? | Indirectly, as missing transverse momentum.
M1: Which particles reach the outermost muon chambers? | Muons (and neutrinos, undetected) | Electrons | Photons | Pions | Minimal interaction.
M2: IceCube detects neutrinos using: | Cherenkov light in ice | Magnetic tracks | Calorimeters only | Radio waves only | Cubic kilometre of ice.

## Scattering experiments
S: Scattering experiments fire particles at targets and measure how they deflect, lose energy or create new particles. From Rutherford's alpha particles to the LHC, scattering is how physics sees inside matter.
H: The idea
- Wavelength λ = h/p sets the resolution: higher momentum sees smaller structure.
- Elastic scattering maps shapes (form factors).
- Inelastic scattering excites or breaks the target, revealing constituents and excitations.
H: Milestones
- Rutherford (1911): nucleus.
- Hofstadter (1950s): nuclear and nucleon sizes.
- SLAC deep inelastic scattering (1968): point-like quarks inside protons (Bjorken scaling; Friedman, Kendall, Taylor, Nobel 1990).
- HERA (1992–2007): gluons dominate the proton at small momentum fractions.
H: Parton distributions
P: In deep inelastic scattering, a virtual photon hits one parton carrying momentum fraction x of the proton. Measuring cross-sections versus x and Q^{2} maps parton distribution functions, essential for predicting LHC processes. Quarks carry only about half the proton's momentum; gluons carry the rest.
X: Resolution of a 50 GeV probe?
> λ = hc/E = 1.24 GeV fm/50 GeV = 0.025 fm (proton radius ~0.84 fm)
!: Scattering measures cross-sections, which depend on both the probe and the target; interpreting them needs a model of the interaction.
Q: What did deep inelastic scattering reveal? | Point-like constituents (quarks) inside protons.
Q: Why do higher-energy probes see smaller structures? | Their de Broglie wavelength is shorter.
M1: Bjorken scaling indicated: | Point-like partons inside the proton | Nuclear size | Neutrino mass | Parity violation | DIS.
M2: Quarks carry about what fraction of the proton's momentum? | Half | All | 10% | 90% | Gluons carry the rest.

## Beyond the Standard Model
S: Physics beyond the Standard Model seeks to explain what it leaves out: dark matter, neutrino masses, the matter–antimatter asymmetry, gravity, and the puzzling values of its parameters. Experiments at colliders, underground labs and in precision measurements search for clues.
H: Evidence for new physics
- Neutrino masses (oscillations).
- Dark matter (galaxies, CMB, lensing).
- Baryon asymmetry.
- Dark energy (or a cosmological constant).
- Inflation (needs a new field).
H: Theoretical motivations
- Hierarchy problem: why is the Higgs mass so much smaller than the Planck scale?
- Strong CP problem: why doesn't QCD violate CP (θ < 10^{-10})?
- Flavour puzzle: mass hierarchy and mixing patterns.
- Unification of forces, quantum gravity.
H: Approaches
P: Proposals include supersymmetry, extra dimensions, composite Higgs, axions (solving strong CP and possibly dark matter), sterile neutrinos, grand unification and string theory. The LHC hasn't found new particles so far, pushing many models to higher masses; anomalies (muon g − 2, B-meson decays, the W mass) come and go as data improve.
X: Why does the hierarchy problem suggest new physics near the TeV scale?
> Quantum corrections to the Higgs mass grow with the highest energy scale in the theory
> Keeping m_{H} = 125 GeV without fine-tuning suggests new particles near ~1 TeV
!: "Beyond the Standard Model" doesn't mean the Standard Model is wrong; it means it's incomplete, like Newtonian gravity before general relativity.
Q: Name three pieces of evidence for physics beyond the Standard Model. | Neutrino masses, dark matter and the matter–antimatter asymmetry (also dark energy).
Q: What is the strong CP problem? | QCD allows CP violation, but none is observed; why the parameter θ is so tiny is unexplained.
M1: Axions were proposed to solve: | The strong CP problem | The hierarchy problem | Neutrino mass | Confinement | Peccei–Quinn.
M2: The hierarchy problem concerns: | Why the Higgs mass is so light | Proton decay | Gravity's strength | Quark charges | Fine-tuning.

## Supersymmetry
S: Supersymmetry (SUSY) proposes that every boson has a fermion partner and vice versa. It would solve the hierarchy problem, unify forces precisely and offer a dark matter candidate, but no superpartners have yet been found.
H: The idea
- Each Standard Model particle gets a superpartner with spin differing by ½: squarks, sleptons, gluinos, photinos, higgsinos, winos, binos.
- Partner contributions cancel quantum corrections to the Higgs mass.
- Requires at least two Higgs doublets (five Higgs bosons).
H: Attractions
- Gauge couplings unify precisely at ~2 × 10^{16} GeV in minimal SUSY.
- The lightest superpartner (often a neutralino), if stable (R-parity), is a WIMP dark matter candidate.
- Natural in string theory.
H: Status
P: SUSY must be broken (superpartners would otherwise have equal masses and would have been seen). LHC searches exclude gluinos and squarks up to ~2 TeV in simple models. "Natural" SUSY solving the hierarchy problem is under pressure, though many variants remain viable.
X: Superpartner of the top quark, and its spin?
> The stop squark, spin 0
!: Supersymmetry isn't ruled out; its simplest, most natural forms are increasingly constrained.
Q: What does supersymmetry pair together? | Every fermion with a boson and every boson with a fermion.
Q: Why is the lightest superpartner a dark matter candidate? | If R-parity holds it's stable, neutral and weakly interacting.
M1: The superpartner of the photon is the: | Photino | Selectron | Squark | Gluino | Fermion partner.
M2: Superpartners haven't been seen because: | SUSY is broken, making them heavy (if they exist) | They're massless | They're identical to known particles | They decay instantly into gravitons | Mass bounds.

## Grand unified theories
S: Grand unified theories (GUTs) propose that the strong, weak and electromagnetic forces merge into one at extremely high energies (~10^{16} GeV). They explain charge quantisation and predict that protons decay, which hasn't been observed.
H: Ideas
- Embed SU(3) × SU(2) × U(1) in a larger group: SU(5) (Georgi–Glashow, 1974), SO(10), E_{6}.
- Quarks and leptons sit in the same multiplets, explaining why the proton and electron charges are exactly equal and opposite.
- New heavy X and Y bosons mediate transitions between quarks and leptons.
H: Predictions
- Proton decay (p → e^{+}π^{0}): minimal SU(5) predicted lifetime ~10^{30} years; Super-Kamiokande sets τ > 2.4 × 10^{34} years, ruling it out.
- Magnetic monopoles (none found; inflation could have diluted them).
- Neutrino masses via the seesaw mechanism (SO(10)).
H: Coupling unification
P: The three couplings, extrapolated with the Standard Model, nearly meet around 10^{14}–10^{16} GeV but miss slightly; in minimal supersymmetric models they meet within errors, an argument for both SUSY and GUTs.
X: How long would 50 000 t of water need to see a proton decay if τ = 10^{34} years?
> Protons ≈ 50 × 10^{6} kg × (10/18) × 6 × 10^{26} per kg ≈ 1.7 × 10^{34}
> Expected ~1.7 decays per year (none seen, so τ is longer)
!: GUT energies are about 10^{12} times beyond the LHC; tests are indirect (proton decay, coupling running, cosmology).
Q: What is a key prediction of grand unified theories? | Proton decay.
Q: How do GUTs explain charge quantisation? | Quarks and leptons share multiplets of a unified group, fixing their relative charges.
M1: The current lower limit on the proton lifetime is about: | 10^{34} years | 10^{10} years | 10^{20} years | 10^{50} years | Super-K.
M2: The original SU(5) GUT was proposed by: | Georgi and Glashow | Einstein | Feynman | Higgs | 1974.

## Dark matter candidates
S: Dark matter makes up about 85% of the universe's matter but emits no light. Its gravitational effects are certain; its identity is not. Candidates range from ultra-light fields to massive particles and primordial black holes.
H: Requirements
- Non-luminous, stable (lifetime ≫ age of universe), mostly cold (slow-moving), weakly interacting with ordinary matter and light.
H: Leading candidates
- **WIMPs** (weakly interacting massive particles, ~10 GeV–10 TeV): thermal relic abundance naturally right ("WIMP miracle"); searched for by direct detection (LZ, XENONnT, PandaX), colliders and gamma-ray telescopes.
- **Axions** (μeV–meV): from the strong CP solution; detected via conversion to photons in magnetic fields (ADMX, haloscopes).
- **Sterile neutrinos** (keV): possible X-ray line signals.
- **Primordial black holes**: constrained by microlensing and other limits in most mass windows.
- **Fuzzy dark matter** (~10^{-22} eV), dark sectors with their own forces.
H: Status
P: Direct detection experiments have pushed WIMP–nucleon cross-sections below 10^{-47} cm^{2}, approaching the "neutrino fog" where solar and atmospheric neutrinos produce identical signals. No convincing detection yet. Alternatives modify gravity (MOND), but struggle with clusters and the CMB.
X: Why are direct detection experiments deep underground?
> Cosmic rays produce backgrounds that mimic rare dark matter recoils
> Kilometres of rock reduce the muon flux by ~10^{6}
!: Dark matter isn't just "missing ordinary matter"; Big Bang nucleosynthesis and the CMB show most of it can't be made of atoms.
Q: What is the WIMP miracle? | Particles with weak-scale masses and interactions naturally produce the observed dark matter density as thermal relics.
Q: How do axion searches work? | Axions convert into microwave photons in strong magnetic fields inside resonant cavities.
M1: Dark matter makes up about what fraction of all matter? | 85% | 5% | 50% | 100% | ~5:1 with baryons.
M2: The neutrino fog is: | An irreducible neutrino background in direct detection | A cloud of neutrinos in space | A detector malfunction | Dark matter itself | Coherent neutrino scattering.

## Open questions in particle physics
S: Despite the Standard Model's success, deep questions remain unanswered: what dark matter is, why matter beat antimatter, what neutrino masses are, why particles have the masses they do, and how gravity fits with quantum theory.
H: The big questions
- What is dark matter, and dark energy?
- Why is there more matter than antimatter?
- What are neutrinos' masses, ordering and nature (Dirac or Majorana)?
- Why three generations and such different masses (the flavour puzzle)?
- Why is the Higgs so light, and is the vacuum stable?
- Why is the strong CP angle so small?
- Do the forces unify? Is the proton stable?
- What is quantum gravity?
H: Where answers may come from
- High-luminosity LHC and future colliders (FCC, muon collider).
- Neutrino experiments (DUNE, Hyper-K, JUNO, KATRIN, neutrinoless double beta decay).
- Dark matter searches (direct, indirect, axion).
- Precision measurements (electron EDM, muon g − 2, rare decays).
- Cosmology (CMB, galaxy surveys, gravitational waves).
H: Anomalies to watch
P: The muon g − 2 discrepancy, the W boson mass (CDF), and B-meson anomalies have each excited physicists; some have faded with better data or theory (lattice QCD now brings g − 2 theory closer to experiment). Distinguishing real signals from systematic effects is the everyday work of the field.
X: How could neutrinoless double beta decay show neutrinos are Majorana particles?
> Two neutrons → two protons + two electrons, no neutrinos
> Only possible if the neutrino is its own antiparticle (lepton number violated by 2)
!: Not finding new particles at the LHC is itself valuable information; it rules out many models and guides theory.
Q: Name three open questions in particle physics. | Dark matter's identity, the matter–antimatter asymmetry, neutrino masses (also quantum gravity, the hierarchy problem).
Q: What would neutrinoless double beta decay reveal? | That neutrinos are Majorana particles and lepton number isn't conserved.
M1: Which experiment measures the absolute neutrino mass from tritium decay? | KATRIN | LHC | Super-K | LIGO | Endpoint spectrum.
M2: A Majorana neutrino is: | Its own antiparticle | Massless | Charged | A boson | Self-conjugate.
`;
