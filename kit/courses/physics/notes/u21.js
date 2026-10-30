// Unit 21: Atomic Physics. Format: kit/course/notes.js
export default `
## Atomic structure
S: An atom is a tiny, dense, positively charged nucleus surrounded by a cloud of electrons. Almost all the mass is in the nucleus, but the electrons set the atom's size, chemistry and spectrum.
H: Scale
- Atom ~10^{-10} m (0.1 nm); nucleus ~10^{-15}–10^{-14} m: a pea in a stadium.
- Nucleus holds > 99.9% of the mass; electron mass is 1/1836 of a proton's.
- Atomic number Z (protons) fixes the element; mass number A = protons + neutrons; isotopes differ in neutrons.
H: Historical models
- Dalton (1808): indivisible atoms.
- Thomson (1904): "plum pudding" after discovering the electron (1897).
- Rutherford (1911): nuclear atom from alpha scattering.
- Bohr (1913): quantised orbits.
- Schrödinger (1926): wavefunctions and orbitals.
H: Why atoms are stable and the size they are
P: Classically, orbiting electrons would radiate and spiral in within ~10^{-11} s. Quantum mechanics prevents it: confining an electron near the nucleus costs kinetic energy (uncertainty principle), balancing Coulomb attraction at about the Bohr radius.
X: Density of a nucleus (A = 56, r = 1.2A^{1/3} fm)?
> r = 4.6 fm; V = 4.1 × 10^{-43} m^{3}; m = 56 × 1.67 × 10^{-27} kg
> ρ ≈ 2.3 × 10^{17} kg m^{-3}: the same for all nuclei
!: Atoms are mostly empty space in terms of mass, but the electron cloud fills that space; you can't push atoms through each other because of Pauli exclusion and electrostatics.
Q: What fixes an element's identity? | Its atomic number Z, the number of protons.
Q: Why doesn't the electron spiral into the nucleus? | Quantum mechanics: a confined electron has minimum kinetic energy, giving a stable ground state.
M1: An atom is roughly how many times larger than its nucleus? | 10^{5} | 10 | 10^{10} | 100 | 10^{-10}/10^{-15}.
M2: Isotopes of an element differ in their number of: | Neutrons | Protons | Electrons when neutral | Charge | Same Z.

## Rutherford scattering
S: Geiger and Marsden fired alpha particles at gold foil; a few bounced back at large angles. Rutherford (1911) showed this required all the positive charge and nearly all the mass to be concentrated in a tiny nucleus.
H: Observations
- Most alphas pass straight through: atoms are mostly empty.
- Some deflected by large angles; about 1 in 8000 bounces back: a dense, charged centre.
H: Rutherford's formula
E: dσ/dΩ = (zZe^{2}/(16πε_{0}E_{k}))^{2}/sin^{4}(θ/2)
- Strongly forward-peaked; agreed with data at all angles.
H: Distance of closest approach
E: r_{min} = zZe^{2}/(4πε_{0}E_{k}) :: head-on
- For 5 MeV alphas on gold: ~45 fm, an upper limit on the nucleus's size.
- At higher energies, deviations from the formula revealed the nuclear force and nuclear size.
H: Legacy
P: Deep inelastic scattering of electrons off protons (SLAC, 1968) repeated Rutherford's idea at higher energy and found quarks inside protons. Scattering remains physics' main way of seeing inside matter.
X: Closest approach of a 7.7 MeV alpha to gold (Z = 79)?
> r = 2 × 79 × 1.44 MeV fm/7.7 MeV = 30 fm
!: Rutherford scattering is pure Coulomb repulsion; the alphas never touch the nucleus at the energies Geiger and Marsden used.
Q: What did large-angle alpha scattering show? | Positive charge and mass are concentrated in a tiny nucleus.
Q: How does Rutherford's cross-section depend on angle? | As 1/sin^{4}(θ/2).
M1: Most alphas passed straight through the foil because: | Atoms are mostly empty space | Gold is transparent | Alphas are neutral | Electrons repel them | Small nucleus.
M2: Deep inelastic scattering revealed: | Quarks inside protons | The nucleus | Electrons | Neutrons | SLAC 1968.

## Bohr model
S: Bohr's 1913 model put hydrogen's electron in circular orbits with quantised angular momentum. It correctly gave hydrogen's energy levels and spectral lines, a crucial step towards quantum mechanics, though its picture of orbits was wrong.
H: Postulates
- Electrons orbit in stationary states without radiating.
- Angular momentum quantised: mvr = nħ.
- Light emitted or absorbed when electrons jump: hf = E_{i} − E_{f}.
H: Results
E: r_{n} = n^{2}a_{0}, a_{0} = 0.0529 nm
E: E_{n} = −13.6 eV/n^{2} (× Z^{2} for hydrogen-like ions)
E: v_{n} = αc/n :: α ≈ 1/137
H: Successes and failures
- Correct hydrogen energies and Rydberg constant from fundamental constants.
- Explains hydrogen-like ions (He^{+}, Li^{2+}).
- Fails for multi-electron atoms, fine structure, line intensities, and predicts nonzero ground-state angular momentum (actually zero).
- Superseded by the Schrödinger equation, which gives the same energies with orbitals instead of orbits.
X: Radius and speed of the electron in hydrogen's n = 2 orbit?
> r = 4a_{0} = 0.21 nm
> v = αc/2 = 1.1 × 10^{6} m s^{-1}
!: Bohr orbits don't exist; electrons in atoms aren't on circular tracks. The model's energies are right; its picture isn't.
Q: What did Bohr assume about angular momentum? | It's quantised in units of ħ: mvr = nħ.
Q: Why was the Bohr model abandoned? | It couldn't explain multi-electron atoms, fine structure or intensities, and its orbit picture conflicts with quantum mechanics.
M1: Energy of He^{+} in n = 1: | −54.4 eV | −13.6 eV | −27.2 eV | −3.4 eV | Z^{2} = 4.
M2: The Bohr radius is about: | 0.053 nm | 1 nm | 0.53 nm | 5.3 pm | a_{0}.

## Quantum mechanical atomic models
S: In the quantum model, electrons occupy orbitals: wavefunctions giving probability clouds around the nucleus. Solving the Schrödinger equation (approximately for many electrons) explains spectra, chemistry and the periodic table.
H: Features
- Orbitals labelled by quantum numbers n, l, m_{l}; plus spin m_{s}.
- No definite paths; |ψ|^{2} gives where an electron is likely to be found.
- Energy depends on n (hydrogen) or on n and l (multi-electron atoms, from screening).
H: Multi-electron methods
- **Central-field approximation**: each electron in an average spherically symmetric potential.
- **Hartree–Fock**: self-consistent orbitals with exchange.
- **Configuration interaction, coupled cluster, DFT**: include electron correlation.
- **Relativistic (Dirac–Fock)**: needed for heavy atoms; explains gold's colour and mercury being liquid.
H: Relativistic effects
P: In heavy atoms, inner electrons move at a large fraction of c; relativistic contraction of s orbitals changes energy gaps. Gold absorbs blue light (appearing yellow) and mercury's weak bonding (liquid at room temperature) are relativistic effects.
X: Why is the 2s orbital lower in energy than 2p in lithium but not in hydrogen?
> Hydrogen: energy depends only on n (special symmetry of 1/r)
> Lithium: 2s penetrates inside the 1s shell, feeling more nuclear charge: lower energy
!: Orbitals are one-electron approximations; the true many-electron wavefunction isn't a simple product of orbitals.
Q: What is an atomic orbital? | A one-electron wavefunction describing an electron's probability distribution in an atom.
Q: Why is gold yellow? | Relativistic effects shift its electron energy levels so it absorbs blue light.
M1: In hydrogen, the energy depends on: | n only | n and l | l only | m only | Accidental degeneracy.
M2: Hartree–Fock treats each electron as moving in: | The average field of the others | No field | A magnetic field only | A crystal | Self-consistent mean field.

## Atomic orbitals
S: Atomic orbitals are the shapes of electron probability clouds, set by the quantum numbers l and m. Their shapes and orientations determine how atoms bond and the geometry of molecules.
H: Shapes
- **s** (l = 0): spherical; one orbital per shell.
- **p** (l = 1): two lobes along x, y or z; three orbitals.
- **d** (l = 2): five orbitals, mostly four-lobed.
- **f** (l = 3): seven, complex shapes.
H: Nodes
- Total nodes = n − 1: radial nodes n − l − 1, angular nodes l.
- 2s has one radial node; 3p has one radial and one angular.
H: Bonding
P: Orbitals on neighbouring atoms overlap and combine into molecular orbitals (bonding and antibonding). Mixing s and p orbitals (hybridisation) gives sp^{3} (tetrahedral, methane), sp^{2} (trigonal, graphene), sp (linear, ethyne) geometries.
H: Seeing orbitals
- Probability distributions inferred from spectroscopy and scattering.
- Photoionisation microscopes have imaged nodal structure of hydrogen-like states.
X: How many radial and angular nodes does a 4d orbital have?
> Angular: l = 2
> Radial: n − l − 1 = 1
!: Orbital diagrams show regions of high probability (usually 90% boundary surfaces), not hard edges.
Q: How many p orbitals are there in a shell? | Three.
Q: What determines an orbital's number of angular nodes? | Its l value.
M1: A 3s orbital has how many radial nodes? | 2 | 1 | 0 | 3 | n − l − 1.
M2: Methane's tetrahedral shape comes from: | sp^{3} hybridisation | sp hybrids | Pure p orbitals | d orbitals | Four equivalent hybrids.

## Electron configurations
S: An electron configuration lists how an atom's electrons fill its orbitals. Filling follows energy order, the Pauli principle and Hund's rule, and the outer electrons determine chemistry and the periodic table's structure.
H: Rules
- **Aufbau**: fill lowest energy first (Madelung n + l rule: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d…).
- **Pauli**: at most two electrons per orbital, opposite spins.
- **Hund's rules**: in a subshell, maximise total spin (fill orbitals singly with parallel spins first).
H: Examples
- C: 1s^{2} 2s^{2} 2p^{2}; Fe: [Ar] 3d^{6} 4s^{2}.
- Exceptions: Cr [Ar] 3d^{5} 4s^{1}; Cu [Ar] 3d^{10} 4s^{1} (half-filled and filled d shells are especially stable).
H: The periodic table
P: Rows correspond to shells; columns to similar outer configurations. Blocks: s (groups 1–2), p (13–18), d (transition metals), f (lanthanides, actinides). Noble gases have full shells: chemically inert. Ionisation energies jump after each full shell.
X: Configuration of phosphorus (Z = 15) and its unpaired electrons?
> 1s^{2} 2s^{2} 2p^{6} 3s^{2} 3p^{3}
> Hund: three unpaired 3p electrons
!: 4s fills before 3d in neutral atoms, but in transition-metal ions 4s electrons are removed first.
Q: State Hund's first rule. | Electrons in a subshell occupy separate orbitals with parallel spins first, maximising total spin.
Q: Why are noble gases inert? | Their outer shells are completely filled.
M1: The configuration of sodium (Z = 11) is: | [Ne] 3s^{1} | [Ne] 3p^{1} | [Ar] 4s^{1} | [He] 2s^{1} | One outer s electron.
M2: Copper's configuration is [Ar] 3d^{10} 4s^{1} because: | A full d subshell is particularly stable | 4s is higher than 4p | Copper has 28 electrons | It's ionised | Exception.

## Atomic energy levels
S: Each atom has a characteristic set of energy levels determined by its electron configuration and the interactions between electrons. Transitions between them produce the spectral lines that fingerprint every element.
H: Structure of levels
- Gross structure: set by configuration (Coulomb attraction, screening): eV scale.
- Terms: electron–electron repulsion splits configurations into terms ^{2S+1}L (e.g. carbon's 2p^{2} gives ^{3}P, ^{1}D, ^{1}S).
- Fine structure: spin–orbit splits terms into levels J: meV scale.
- Hyperfine structure: nuclear spin: μeV scale.
H: Energy level diagrams
- Grotrian diagrams show allowed transitions.
- Ionisation energy: from ground state to removing an electron (H 13.6 eV, He 24.6 eV, Na 5.1 eV, Cs 3.9 eV).
- Rydberg states: highly excited, huge atoms (n ~ 100: ~1 μm across), very sensitive to fields.
X: Sodium's 3p → 3s transition gives 589 nm light. Energy gap?
> E = 1240/589 = 2.1 eV
!: Multi-electron atoms' levels depend on n and l, unlike hydrogen's, because of screening and electron interactions.
Q: What causes term splitting within a configuration? | Electron–electron repulsion depending on how spins and orbital momenta combine.
Q: What are Rydberg atoms? | Atoms with an electron in a very high n state, making them huge and highly sensitive to fields.
M1: Which has the lowest ionisation energy? | Caesium | Helium | Hydrogen | Neon | Outer electron far from nucleus.
M2: Fine structure splitting is typically: | ~meV | ~eV | ~keV | ~MeV | Smaller than gross structure.

## Hydrogen and hydrogen-like atoms
S: Hydrogen and ions with a single electron (He^{+}, Li^{2+}…) can be solved exactly. Their levels scale simply with nuclear charge, and they are benchmarks for testing quantum electrodynamics.
H: Energy and size scaling
E: E_{n} = −13.6 Z^{2}/n^{2} eV
E: ⟨r⟩ ∝ n^{2}a_{0}/Z
- Lines scale as Z^{2}: He^{+} Lyman alpha at 30.4 nm vs 121.6 nm for H.
H: Reduced mass
E: R_{M} = R_{∞}/(1 + m_{e}/M)
- Explains small shifts between isotopes: deuterium was discovered (Urey, 1932) from its slightly shifted Balmer lines.
H: Exotic hydrogen-like systems
- Positronium (e^{+}e^{−}): energies half of hydrogen's (reduced mass m_{e}/2).
- Muonic hydrogen: muon ~200 times heavier, orbiting ~200 times closer; measured the proton charge radius (2010), sparking the "proton radius puzzle".
- Antihydrogen: CERN's ALPHA experiment showed its spectrum matches hydrogen's to parts per trillion.
- Highly charged ions (U^{91+}): strong-field QED tests.
X: Wavelength of the n = 2 → 1 transition in Li^{2+}?
> E = 13.6 × 9 × (1 − 1/4) = 91.8 eV
> λ = 1240/91.8 = 13.5 nm
!: Hydrogen-like formulas only apply to one-electron systems; neutral helium needs the multi-electron treatment.
Q: How do hydrogen-like energies scale with Z? | As Z^{2}.
Q: What did muonic hydrogen measure? | The proton's charge radius, with surprising initial results (the proton radius puzzle).
M1: Positronium's binding energy is: | 6.8 eV | 13.6 eV | 27.2 eV | 0 | Reduced mass m_{e}/2.
M2: Deuterium was discovered through: | Isotope shifts in its spectral lines | Mass spectrometry | Radioactivity | Neutron scattering | Reduced-mass shift.

## Multi-electron atoms
S: In atoms with more than one electron, electron–electron repulsion makes the Schrödinger equation unsolvable exactly. Screening, exchange and correlation explain why energies depend on l, and why the periodic table has its shape.
H: Screening
E: Z_{eff} = Z − σ :: effective nuclear charge
- Inner electrons shield outer ones; s electrons penetrate more and are less shielded than p, d, f.
- Slater's rules estimate σ.
H: Helium
- Ground state 1s^{2}, energy −79.0 eV (two ionisations: 24.6 + 54.4 eV).
- Excited states split into singlet (para) and triplet (ortho) systems; triplets lower because exchange keeps parallel-spin electrons apart.
H: Trends
- Atomic radius decreases across a period (higher Z_{eff}), increases down a group.
- Ionisation energy increases across a period, drops sharply after noble gases.
- Electronegativity follows Z_{eff} and size.
H: X-ray spectra
P: Inner-shell (K, L) transitions in heavy atoms behave almost hydrogen-like with Z_{eff} ≈ Z − 1. Moseley (1913) found √f ∝ (Z − 1) for Kα lines, establishing that atomic number (not mass) orders the elements and predicting missing ones.
X: Moseley's law: Kα energy of copper (Z = 29)?
> E ≈ 10.2 eV × (Z − 1)^{2} = 10.2 × 784 = 8.0 keV (measured 8.05 keV)
!: Electrons in multi-electron atoms aren't independent; correlation effects matter for accurate energies.
Q: What is effective nuclear charge? | The net positive charge an electron experiences after shielding by other electrons.
Q: What did Moseley's law establish? | Atomic number is the true ordering principle of elements.
M1: Across a period, atomic radius generally: | Decreases | Increases | Stays the same | Doubles | Rising Z_{eff}.
M2: In helium, triplet states lie lower than singlets because: | Exchange keeps parallel-spin electrons apart, reducing repulsion | Triplets have more electrons | Spin–orbit coupling | Magnetism | Antisymmetric spatial wavefunction.

## Electron spin
S: The electron's intrinsic spin gives it a magnetic moment and two possible orientations in a field. Spin explains doublet spectral lines, atomic magnetism, chemical bonding rules and the structure of the periodic table.
H: Properties
E: S = ½; S_{z} = ±ħ/2
E: μ_{s} = −g_{s}μ_{B}S/ħ, g_{s} ≈ 2.0023
- The g-factor's deviation from 2 (a/2π ≈ α/2π + …) is predicted by QED to 12 digits: the most precise agreement between theory and experiment in science.
H: Evidence
- Stern–Gerlach splitting into two beams.
- Doublet structure of alkali lines (sodium D lines 589.0 and 589.6 nm).
- Anomalous Zeeman effect.
- Electron spin resonance (ESR): flipping spins with microwaves (~28 GHz per tesla).
H: Spin in technology
P: Spintronics uses electron spin as well as charge: giant magnetoresistance (Nobel 2007) made hard-disk read heads sensitive enough for gigabyte drives; MRAM stores bits in magnetic tunnel junctions. Electron spins in silicon and diamond (NV centres) are qubits and nanoscale magnetometers.
X: ESR frequency for a free electron in 0.35 T?
> f = gμ_{B}B/h = 2.0023 × 9.27 × 10^{-24} × 0.35/6.63 × 10^{-34}
> ≈ 9.8 GHz (X-band ESR)
!: The electron's g-factor is almost exactly 2, not 1 as for orbital motion; Dirac's theory explains why.
Q: What is the electron's spin g-factor? | About 2.0023.
Q: What is giant magnetoresistance? | A large change in electrical resistance of magnetic multilayers depending on the relative alignment of their magnetisations.
M1: The sodium D doublet arises from: | Spin–orbit splitting of the 3p level | Two isotopes | Hyperfine structure | The Stark effect | Fine structure.
M2: ESR flips electron spins using: | Microwaves | X-rays | Radio at 50 Hz | Visible light | ~10 GHz.

## Fine structure
S: Fine structure is the small splitting of atomic energy levels caused by relativistic effects and the coupling between an electron's spin and its orbital motion. It splits spectral lines into closely spaced multiplets.
H: Contributions (hydrogen)
- Relativistic correction to kinetic energy.
- Spin–orbit coupling.
- Darwin term (for s states).
E: ΔE ≈ α^{2}E_{n}(n/(j + ½) − ¾)/n^{2} :: depends on n and j only
- Scale: α^{2} ≈ 5 × 10^{-5} times the gross energy: ~10^{-4} eV for n = 2.
H: Fine-structure constant
E: α = e^{2}/(4πε_{0}ħc) ≈ 1/137.036
- Dimensionless strength of electromagnetism; measured to 0.1 ppb.
- Whether α varies over cosmic time is tested with quasar spectra and atomic clocks: no variation found so far (< 10^{-17} per year).
H: Beyond fine structure
P: Dirac's equation predicts fine structure exactly but says 2s_{1/2} and 2p_{1/2} have the same energy. Lamb and Retherford (1947) found them split by ~1 GHz: the Lamb shift, explained by QED's vacuum fluctuations, launching modern quantum field theory.
X: Fine-structure splitting of hydrogen n = 2 (2p_{1/2} vs 2p_{3/2}) is ~10.9 GHz. Energy?
> E = hf = 4.5 × 10^{-5} eV
!: Fine structure isn't caused by the nucleus's spin; that's hyperfine structure, about 1000 times smaller.
Q: What causes fine structure? | Relativistic corrections and spin–orbit coupling.
Q: What is the Lamb shift? | A small QED splitting between 2s_{1/2} and 2p_{1/2} in hydrogen, not predicted by Dirac's equation.
M1: The fine-structure constant is about: | 1/137 | 1/1836 | 137 | 1/2 | α.
M2: In hydrogen, fine-structure energies depend on: | n and j | n only | l only | m_{l} | Dirac result.

## Hyperfine structure
S: Hyperfine structure is a tiny splitting of atomic levels from the interaction between the electron and the nucleus's magnetic moment (and electric quadrupole). It's behind the 21 cm hydrogen line and the caesium atomic clock.
H: Origin
E: ΔE ∝ A I·J; F = I + J
- I: nuclear spin; F: total atomic angular momentum.
- Nuclear magnetic moments are ~1000 times smaller than electrons' (μ_{N} vs μ_{B}): splittings ~μeV, microwave frequencies.
H: Key examples
- **Hydrogen 21 cm line**: F = 1 → 0 at 1420.405 751 768 MHz; spontaneous lifetime ~10 million years, but abundant hydrogen makes it bright; maps galactic rotation and spiral arms.
- **Caesium-133**: ground-state splitting 9 192 631 770 Hz defines the second.
- **Rubidium**: compact atomic clocks in GPS satellites and phone networks.
H: Uses
P: Hyperfine structure measures nuclear spins and moments. Hydrogen masers (stable to 10^{-15}) time radio telescope arrays in VLBI. Hyperfine transitions in ions and atoms are qubits in trapped-ion quantum computers.
X: Energy of the 21 cm hydrogen transition?
> E = hf = 6.63 × 10^{-34} × 1.42 × 10^{9} = 9.4 × 10^{-25} J ≈ 5.9 μeV
!: Hyperfine transitions are extremely narrow and stable, which is why they make good clocks, not because they're energetic.
Q: What causes hyperfine structure? | Interaction of the electron's magnetic field with the nucleus's magnetic moment.
Q: Why is the 21 cm line important in astronomy? | It traces neutral hydrogen, mapping galaxies' structure and rotation.
M1: The second is defined by a hyperfine transition in: | Caesium-133 | Hydrogen | Rubidium | Strontium | 9 192 631 770 Hz.
M2: Hyperfine splittings are typically in the: | Microwave range | X-ray range | Visible | Gamma range | μeV energies.

## Spin-orbit coupling
S: Spin–orbit coupling is the interaction between an electron's spin magnetic moment and the magnetic field it feels from its orbital motion. It splits atomic levels, drives fine structure and is crucial in modern materials physics.
H: Physical picture
P: In the electron's rest frame, the nucleus orbits it, creating a magnetic field proportional to L. The electron's spin moment has energy in that field. A relativistic correction (Thomas precession) halves the naive result.
E: H_{SO} = (1/(2m^{2}c^{2}))(1/r)(dV/dr)L·S
E: L·S = ½[J(J + 1) − L(L + 1) − S(S + 1)]ħ^{2}
H: Scaling
- Grows rapidly with nuclear charge (~Z^{4} for hydrogen-like): small in light atoms, large in heavy ones.
- Heavy atoms switch from LS to jj coupling.
H: In materials
P: Spin–orbit coupling in solids underlies topological insulators (conducting surfaces protected by symmetry), the spin Hall effect, Rashba splitting in semiconductor interfaces, magnetic anisotropy (which way magnets point) and proposed Majorana qubits.
X: Sodium 3p splitting is 2.1 meV (0.6 nm between D lines). How does caesium compare?
> Caesium (Z = 55) 6p splitting ~69 meV: D1 894 nm, D2 852 nm (42 nm apart)
> Heavier atoms have much stronger spin–orbit coupling
!: Spin–orbit coupling is a relativistic magnetic effect, not an electrostatic one; it vanishes for s states (L = 0).
Q: What is spin–orbit coupling? | The interaction between an electron's spin and the magnetic field from its orbital motion relative to the nucleus.
Q: Why is spin–orbit coupling stronger in heavy atoms? | Stronger nuclear fields near the nucleus; it scales steeply with Z.
M1: Spin–orbit coupling is zero for: | s states (l = 0) | p states | d states | All states | No orbital angular momentum.
M2: Topological insulators rely heavily on: | Spin–orbit coupling | Gravity | Nuclear spin | Superconductivity | Band inversion.

## Zeeman effect
S: In a magnetic field, atomic energy levels split according to their magnetic quantum number, so spectral lines split into several components. The Zeeman effect measures magnetic fields from the lab to the Sun's surface.
H: Normal Zeeman effect
E: ΔE = m_{l}μ_{B}B
- Spin-zero states; lines split into three (Δm = 0, ±1), spacing μ_{B}B.
H: Anomalous Zeeman effect
E: ΔE = g_{J}m_{J}μ_{B}B
E: g_{J} = 1 + [J(J + 1) + S(S + 1) − L(L + 1)]/(2J(J + 1)) :: Landé g-factor
- Explained only after electron spin was understood.
- Strong fields: Paschen–Back effect (L and S decouple).
H: Applications
- Measuring sunspot fields (~0.1–0.4 T; Hale, 1908) and stellar magnetic fields.
- Zeeman slowers and magneto-optical traps in atom cooling.
- Optically pumped magnetometers and atomic clocks' "magic" field conditions.
- Polarisation: σ^{±} components are circularly polarised along the field.
X: Normal Zeeman splitting of a 500 nm line in 1 T, as a wavelength shift?
> ΔE = μ_{B}B = 5.79 × 10^{-5} eV
> Δλ = λ^{2}ΔE/(hc) = (500)^{2} × 5.79 × 10^{-5}/1240 nm ≈ 0.012 nm
!: The anomalous Zeeman effect is actually the more common one; the "normal" effect needs total spin zero.
Q: What is the Landé g-factor? | The factor relating a level's magnetic moment to its total angular momentum J.
Q: How did Hale measure sunspot magnetic fields? | From the Zeeman splitting of spectral lines.
M1: The normal Zeeman effect splits a line into: | 3 components | 2 | 5 | Many | Δm = 0, ±1.
M2: Zeeman splitting is proportional to: | Magnetic field strength | Wavelength | Temperature | Electric field | ΔE ∝ B.

## Stark effect
S: The Stark effect is the shifting and splitting of atomic and molecular energy levels in an electric field. It's usually much smaller than the Zeeman effect but matters in plasmas, semiconductors and precision measurements.
H: Linear and quadratic Stark effects
- **Linear**: degenerate states of opposite parity mix (hydrogen n = 2): ΔE ∝ E; hydrogen n = 2 splits into three.
- **Quadratic**: non-degenerate states: ΔE = −½αE^{2} (α = polarisability).
- Most atoms show the quadratic effect.
H: Where it matters
- **Stark broadening** of lines in plasmas measures electron densities (stellar atmospheres, fusion plasmas).
- **Rydberg atoms**: enormous polarisability; field ionisation detects them.
- **Quantum-confined Stark effect** in semiconductor quantum wells: electro-absorption modulators in optical communications.
- **AC Stark shift (light shift)**: laser fields shift levels; used in optical traps and must be cancelled in atomic clocks ("magic wavelength" lattices).
H: History
P: Johannes Stark (1913) observed the splitting of hydrogen's Balmer lines; Schrödinger's quantum mechanics explained it in 1926, an early triumph of the theory.
X: Ground-state helium has polarisability α ≈ 2.3 × 10^{-41} C m^{2} V^{-1}. Shift in 10^{7} V m^{-1}?
> ΔE = −½ × 2.3 × 10^{-41} × 10^{14} = −1.2 × 10^{-27} J ≈ −7 neV: tiny
!: Hydrogen shows a linear Stark effect only because of its special degeneracy between states of different l.
Q: Why does hydrogen show a linear Stark effect? | Its degenerate states of opposite parity mix in the field.
Q: What is an AC Stark shift? | The shift of atomic levels caused by an oscillating (laser) electric field.
M1: Most atoms show a Stark shift that is: | Quadratic in field | Linear | Cubic | Independent of field | Non-degenerate states.
M2: Stark broadening of plasma lines measures: | Electron density | Temperature only | Magnetic field | Composition only | Microfields from charged particles.

## Atomic spectra
S: Every element emits and absorbs light at its own set of wavelengths. Atomic spectra fingerprint elements in flames, stars and galaxies, and their patterns revealed the quantum structure of atoms.
H: Types
- **Emission**: hot gas emits bright lines.
- **Absorption**: cool gas in front of a continuous source removes lines (Fraunhofer lines in sunlight).
- **Continuous**: hot dense matter (blackbody).
- Kirchhoff's laws (1859) summarise these.
H: Hydrogen series
E: 1/λ = R(1/n_{f}^{2} − 1/n_{i}^{2})
- Balmer (visible): Hα 656, Hβ 486, Hγ 434, Hδ 410 nm.
H: Uses
- Chemical analysis: flame tests, atomic absorption and emission spectroscopy, ICP-MS.
- Astronomy: compositions, temperatures, redshifts, magnetic fields of stars; helium was discovered in the Sun's spectrum (1868) before on Earth.
- Plasma diagnostics; street lighting colours (sodium yellow, mercury blue-green).
X: A line in a quasar's spectrum: Hα observed at 984 nm. Redshift?
> z = (984 − 656)/656 = 0.5
!: Absorption and emission lines occur at the same wavelengths for the same transitions; whether you see bright or dark lines depends on the gas's temperature relative to the background.
Q: State Kirchhoff's laws of spectroscopy. | Hot dense objects give continuous spectra; hot thin gas gives emission lines; cool gas in front of a continuous source gives absorption lines.
Q: Where was helium first discovered? | In the Sun's spectrum, during an 1868 eclipse.
M1: Fraunhofer lines in sunlight are: | Absorption lines | Emission lines | Continuous | Artefacts | Cooler outer gas.
M2: The Balmer series ends on level: | n = 2 | n = 1 | n = 3 | n = ∞ | Visible lines.

## Selection rules
S: Selection rules state which transitions between atomic states can occur by emitting or absorbing a photon. They follow from conservation of angular momentum and parity, and they explain why some spectral lines are bright, some faint and some missing.
H: Electric dipole (E1) rules
E: Δl = ±1; Δm_{l} = 0, ±1; ΔS = 0; ΔJ = 0, ±1 (not 0 → 0)
- Photon carries one unit of angular momentum and odd parity.
- Parity must change.
H: Forbidden transitions
- Not truly forbidden: much slower (magnetic dipole M1, electric quadrupole E2, two-photon).
- Lifetimes from milliseconds to years (vs nanoseconds for allowed lines).
- Seen in low-density astrophysical gas where collisions don't de-excite atoms first: the green [O III] lines of nebulae (once attributed to a new element, "nebulium").
- 2s → 1s in hydrogen decays by two photons, lifetime 0.12 s.
H: Uses
P: Ultra-narrow forbidden transitions make the best clocks: strontium's 698 nm line (lifetime ~150 s, linewidth ~mHz) in optical lattice clocks; ytterbium's octupole transition in ions.
X: Can hydrogen go 3d → 1s by electric dipole emission?
> Δl = −2: forbidden for E1
> It goes 3d → 2p → 1s instead
!: "Forbidden" means suppressed by orders of magnitude, not impossible.
Q: What is the Δl selection rule for electric dipole transitions? | Δl = ±1.
Q: Why are forbidden lines seen in nebulae but not in the lab? | Low densities let long-lived states decay radiatively before collisions de-excite them.
M1: Which transition is electric-dipole allowed? | 2p → 1s | 2s → 1s | 3d → 1s | 3s → 2s | Δl = ±1.
M2: Forbidden transitions have: | Long lifetimes and narrow lines | Short lifetimes | Broad lines | No emission ever | Small transition rates.

## Spontaneous and stimulated emission
S: An excited atom can emit a photon spontaneously at a random time, or be stimulated to emit by an incoming photon, producing an identical copy. Einstein (1917) showed both must exist, laying the foundation for lasers.
H: Einstein's coefficients
- Absorption rate: B_{12}ρ(f)N_{1}.
- Stimulated emission rate: B_{21}ρ(f)N_{2}.
- Spontaneous emission rate: A_{21}N_{2}.
E: g_{1}B_{12} = g_{2}B_{21}; A_{21} = (8πhf^{3}/c^{3})B_{21}
- Derived by requiring thermal equilibrium to reproduce Planck's law.
H: Spontaneous emission
E: τ = 1/A; A ∝ f^{3}|d_{12}|^{2}
- Allowed visible transitions: τ ~ 10 ns.
- Not truly spontaneous: triggered by vacuum fluctuations of the EM field (QED); can be enhanced or suppressed in cavities (Purcell effect).
H: Stimulated emission
P: The stimulated photon has the same frequency, direction, phase and polarisation. With population inversion, stimulated emission exceeds absorption, so light is amplified: the principle of masers (1954) and lasers (1960).
X: Why are X-ray lasers hard to build?
> A ∝ f^{3}: spontaneous emission at X-ray frequencies is ~10^{9} times faster than in the visible
> Inversion decays almost instantly; free-electron lasers avoid this by not using atomic transitions
!: Spontaneous emission is random in direction and phase; it's the background noise from which lasers build coherent light.
Q: Why is stimulated emission necessary to explain Planck's law? | Einstein showed equilibrium with radiation requires both spontaneous and stimulated emission.
Q: How does spontaneous emission rate depend on frequency? | As f^{3}.
M1: A stimulated photon is: | Identical to the stimulating photon | Random in phase | Lower in energy | Opposite in direction | Coherent.
M2: The Purcell effect shows spontaneous emission can be: | Changed by the surrounding optical environment | Never changed | Only stimulated | Instant | Cavity QED.

## Atomic transitions
S: An atomic transition is a jump between energy levels, absorbing or emitting energy. Its frequency, strength, width and shape tell physicists about the atom and its environment.
H: Line properties
E: hf = E_{upper} − E_{lower}
- **Strength**: oscillator strength f or transition dipole moment.
- **Natural linewidth**: Δf = 1/(2πτ).
- **Doppler broadening**: Δf/f ≈ √(8k_{B}T ln 2/(mc^{2})); dominates for gases at room temperature (~GHz).
- **Pressure (collision) broadening**: proportional to collision rate.
- **Power broadening**: strong driving fields.
H: Line shapes
- Lorentzian (natural, collisional), Gaussian (Doppler), Voigt (both).
H: Driving transitions
P: A resonant field drives Rabi oscillations: the population sloshes between the two levels at the Rabi frequency Ω = dE/ħ. A π pulse flips the atom; a π/2 pulse creates an equal superposition. These are the basic operations of NMR, atomic clocks and qubits.
X: Natural linewidth of a transition with τ = 16 ns (sodium D)?
> Δf = 1/(2π × 16 × 10^{-9}) = 10 MHz
> Doppler width at 500 K ≈ 1.5 GHz, 150 times larger
!: Doppler broadening hides natural linewidths in gases; saturation spectroscopy and cold atoms remove it.
Q: What is natural linewidth? | The minimum linewidth set by the excited state's lifetime, Δf = 1/(2πτ).
Q: What is a Rabi oscillation? | Periodic exchange of population between two levels driven by a resonant field.
M1: Doppler broadening increases with: | Temperature | Atomic mass | Density only | Lifetime | ∝ √(T/m).
M2: A π pulse on a two-level atom: | Fully transfers population to the other level | Does nothing | Creates superposition | Ionises it | Half a Rabi cycle.

## Lasers and atomic transitions
S: Lasers depend on atomic (or molecular, or semiconductor) transitions arranged so that population inversion can be maintained. The choice of transition sets a laser's wavelength, efficiency and whether it runs continuously or in pulses.
H: Level schemes
- **Three-level** (ruby, 694 nm): pump to a high level, fast decay to a metastable upper laser level, emit to the ground state; needs > 50% of atoms excited.
- **Four-level** (Nd:YAG at 1064 nm, HeNe at 633 nm): lower laser level empties quickly; inversion is easy.
- **Semiconductor**: conduction band to valence band across a p–n junction.
H: Pumping
- Optical (flashlamps, diode lasers), electrical discharge (gas lasers), current injection (diodes), chemical reactions.
- Helium–neon: helium atoms excited by discharge transfer energy to neon by collisions (energy-level match).
H: Wavelength and gain
P: The gain bandwidth is set by the transition's linewidth: narrow for gases, broad for dyes and Ti:sapphire (650–1100 nm), which can be tuned or mode-locked for femtosecond pulses. Quantum cascade lasers engineer transitions between subbands in quantum wells for mid-infrared light.
X: Why is the HeNe laser four-level?
> Neon's lower laser level (3p) empties quickly to 3s
> Inversion between 5s and 3p is maintained even with modest pumping
!: Ruby was the first laser (Maiman, 1960) despite being three-level, because its long-lived metastable level helped.
Q: Why are four-level lasers more efficient than three-level? | The lower laser level isn't the ground state, so it empties quickly and inversion is easy.
Q: What sets a laser's gain bandwidth? | The linewidth of its gain transition.
M1: The first laser used: | Ruby | HeNe | CO_{2} | Semiconductor | Maiman 1960.
M2: Quantum cascade lasers emit in the: | Mid-infrared | Ultraviolet | X-ray | Microwave only | Intersubband transitions.

## Atomic clocks
S: Atomic clocks keep time by locking an oscillator to an atomic transition frequency. They're the most precise instruments ever made: the best now lose less than a second in the age of the universe.
H: How they work
- An oscillator (microwave or laser) probes atoms; feedback keeps it on resonance.
- Stability improves with higher frequency, narrower lines, more atoms and longer interrogation.
E: σ ∝ Δf/(f√N) :: fractional instability scaling
H: Generations
- **Caesium beam and fountain clocks**: 9.19 GHz hyperfine transition; define the SI second; ~10^{-16}.
- **Hydrogen masers**: excellent short-term stability.
- **Rubidium**: compact; GPS satellites, telecom.
- **Optical clocks**: strontium or ytterbium in optical lattices, aluminium or ytterbium ions: ~10^{-18}–10^{-19}; a redefinition of the second around 2030 is planned.
H: Applications
P: GPS positioning, internet and power grid synchronisation, VLBI astronomy, tests of relativity (optical clocks detect gravitational time dilation from a height change of 1 cm), searches for dark matter and variations of fundamental constants, and relativistic geodesy.
X: A clock with fractional uncertainty 10^{-18}. Error over the age of the universe (4.3 × 10^{17} s)?
> 4.3 × 10^{17} × 10^{-18} ≈ 0.4 s
!: Atomic clocks don't count radioactive decays; they're oscillators locked to atomic transition frequencies.
Q: Which transition defines the SI second? | The caesium-133 ground-state hyperfine transition, 9 192 631 770 Hz.
Q: Why are optical clocks more precise than microwave clocks? | Their transition frequencies are ~10^{5} times higher, with very narrow lines.
M1: Optical lattice clocks commonly use: | Strontium | Caesium | Hydrogen | Uranium | 698 nm transition.
M2: Optical clocks can detect height differences of about: | 1 cm | 1 km | 1 m | 1 mm only in space | Gravitational redshift ~10^{-18}.

## Laser cooling
S: Laser cooling slows atoms using the momentum of photons. Tuning lasers slightly below an atomic resonance makes atoms moving towards the light absorb more, so they're always pushed back: temperatures fall to microkelvin.
H: Doppler cooling
- Laser red-detuned (below resonance).
- Atoms moving towards a beam see it Doppler-shifted up to resonance: absorb, get a kick opposing motion.
- Spontaneous emission is random in direction: no net kick on average.
- Six beams make an "optical molasses" that damps motion in 3D.
E: T_{D} = ħΓ/(2k_{B}) :: Doppler limit (~140 μK for sodium)
H: Sub-Doppler cooling
- Polarisation gradient (Sisyphus) cooling: atoms climb light-shift potential hills and lose energy; reaches ~10 μK, below the Doppler limit.
- Raman and evaporative cooling reach nanokelvin.
H: Recognition
P: Chu, Cohen-Tannoudji and Phillips shared the 1997 Nobel Prize for laser cooling. It underlies atomic clocks, atom interferometers, Bose–Einstein condensates and many quantum computers.
X: Recoil velocity of a sodium atom absorbing a 589 nm photon?
> v = h/(mλ) = 6.63 × 10^{-34}/(3.8 × 10^{-26} × 5.89 × 10^{-7}) = 3 cm s^{-1}
> Stopping a 500 m s^{-1} atom takes ~17 000 photons, absorbed in milliseconds
!: Laser cooling works only for atoms with suitable closed transitions; molecules are much harder (though now achieved for some).
Q: How does Doppler cooling slow atoms? | Red-detuned light is absorbed preferentially by atoms moving towards it, giving momentum kicks that oppose motion.
Q: What is the Doppler cooling limit? | T = ħΓ/(2k_{B}), set by heating from random spontaneous emission.
M1: Laser cooling beams are tuned: | Slightly below resonance | Exactly on resonance | Far above | To any frequency | Red detuning.
M2: Optical molasses refers to: | Damping of atomic motion by counter-propagating beams | Sticky lasers | A type of BEC | Laser cutting | Viscous-like force.

## Magneto-optical trapping
S: A magneto-optical trap (MOT) combines laser cooling with a magnetic field gradient so the light both cools atoms and pushes them to the centre. It's the standard starting point for cold-atom experiments.
H: How it works
- Six circularly polarised beams in three axes, red-detuned.
- An anti-Helmholtz coil pair makes a quadrupole field, zero at the centre.
- Zeeman shifts bring the beam pushing an atom back towards the centre closer to resonance: position-dependent force.
- Captures atoms from a vapour or slowed beam; holds ~10^{6}–10^{10} atoms at ~100 μK.
H: After the MOT
- Optical molasses for sub-Doppler cooling.
- Transfer to magnetic traps or optical dipole traps (focused far-detuned lasers).
- Evaporative cooling to reach quantum degeneracy.
- Optical lattices and tweezer arrays position individual atoms for quantum simulation and computing.
H: Beyond atoms
P: MOTs now trap some molecules (SrF, CaF), enabling ultracold chemistry and precision tests like the electron's electric dipole moment. Antihydrogen has been laser-cooled at CERN (2021).
X: Why does the field gradient need circular polarisation?
> Zeeman-shifted sublevels absorb σ^{+} or σ^{−} light preferentially
> Matching each beam's polarisation to the field direction makes the force always point towards the centre
!: The magnetic field alone doesn't trap atoms in a MOT; it makes the radiation pressure position-dependent.
Q: What does the magnetic field do in a MOT? | It Zeeman-shifts transitions so radiation pressure pushes atoms towards the trap centre.
Q: How many atoms does a typical MOT hold? | About a million to ten billion.
M1: A MOT's magnetic field is: | Zero at the centre, increasing linearly | Uniform | Oscillating | Absent | Quadrupole field.
M2: Optical tweezer arrays are used for: | Arranging individual atoms for quantum computing | Cutting atoms | Heating atoms | Measuring magnetic fields only | Programmable atom arrays.

## Bose–Einstein condensation in atomic gases
S: When a dilute gas of bosonic atoms is cooled to nanokelvin temperatures, a large fraction collapses into the lowest quantum state, forming a Bose–Einstein condensate: a macroscopic matter wave. First made in 1995, BECs are laboratories for quantum physics.
H: Making a BEC
- Laser cool in a MOT, then load a magnetic or optical trap.
- **Evaporative cooling**: remove the hottest atoms; the rest rethermalise colder.
- Condensation when nλ^{3} ≈ 2.6, typically ~100 nK at ~10^{20} m^{-3}.
- Observed by releasing the cloud: a sharp peak in the velocity distribution appears.
H: Properties
- Coherent: two BECs interfere (Ketterle, 1997).
- Superfluid: quantised vortices form in rotating condensates.
- Interactions tunable with Feshbach resonances: from repulsive to attractive (collapse, "Bosenova").
- Atom lasers: coherent beams of atoms.
H: Uses
P: BECs simulate condensed matter (Mott insulator transition in optical lattices), analogue black holes (sonic horizons with Hawking-like radiation), and serve as ultra-sensitive sensors. Cornell, Wieman and Ketterle received the 2001 Nobel Prize. NASA's Cold Atom Lab makes BECs on the ISS.
X: Why evaporative cooling works: remove atoms with energy > 4k_{B}T.
> The removed atoms carry above-average energy
> After collisions, the remaining atoms have a lower average energy: lower T
!: A BEC isn't a solid or liquid; it's an extremely dilute gas whose atoms share one quantum state.
Q: What is evaporative cooling? | Removing the most energetic atoms so the remainder rethermalise at lower temperature.
Q: How was BEC first observed? | As a sharp peak in the atoms' velocity distribution after release from the trap.
M1: BECs are made from: | Bosonic atoms | Fermionic atoms only | Photons only | Electrons | Integer spin.
M2: Two overlapping BECs produce: | Interference fringes | Nothing | A solid | Heat only | Coherent matter waves.

## Precision spectroscopy
S: Precision spectroscopy measures atomic and molecular transition frequencies to extraordinary accuracy, testing fundamental physics: QED, the constancy of nature's constants, and the symmetry between matter and antimatter.
H: Techniques
- **Doppler-free methods**: saturated absorption, two-photon spectroscopy with counter-propagating beams.
- **Cold atoms and trapped ions**: long interrogation times.
- **Frequency combs** (Hänsch and Hall, Nobel 2005): directly link optical frequencies to microwave standards.
- **Ramsey interferometry**: separated oscillatory fields narrow resonances (Nobel 1989).
H: Landmark measurements
- Hydrogen 1s–2s at 2 466 061 413 187 kHz with ~10 Hz uncertainty: Rydberg constant and proton radius.
- Antihydrogen 1s–2s agrees with hydrogen to ~2 parts per trillion (ALPHA, CERN).
- Electron magnetic moment to 0.1 ppt: α to 0.1 ppb.
- Electron EDM limits (< 10^{-29} e cm) constrain new physics far beyond collider reach.
H: Fundamental constants
P: Comparing different atomic clocks over years limits any drift of α or the proton-to-electron mass ratio to < 10^{-17} per year. Molecular spectroscopy tests whether the proton mass varies. Precision measurements are a complementary route to new physics alongside particle colliders.
X: Why does two-photon spectroscopy with counter-propagating beams cancel Doppler broadening?
> An atom moving at v sees one beam shifted by +kv and the other by −kv
> Absorbing one photon from each, the shifts cancel: total energy 2ħω independent of v
!: Precision isn't just more digits; it lets tiny effects (QED corrections, possible new forces) become visible.
Q: How does a frequency comb help precision spectroscopy? | It provides a ruler of evenly spaced optical frequencies linked to a microwave standard.
Q: What did comparing hydrogen and antihydrogen spectra test? | CPT symmetry between matter and antimatter.
M1: Doppler-free spectroscopy techniques include: | Saturated absorption | Simple absorption at room temperature | X-ray diffraction | Flame tests | Velocity-selective.
M2: Limits on the electron's electric dipole moment test: | Physics beyond the Standard Model | Gravity directly | Nuclear fission | Chemical bonding | Time-reversal violation.
`;
