// Unit 21: Atomic Physics. Format: kit/course/notes.js. Content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives, level, key terms, summaries, evidence status, typed and dated sources, and questions at three levels.
export default `
## Atomic structure
S: An atom is a tiny, dense, positively charged nucleus surrounded by a cloud of electrons. Almost all the mass is in the nucleus, but the electrons set the atom's size, chemistry and spectrum.
O: Describe the nuclear model of the atom and the sizes of atom and nucleus
O: Use proton number Z, nucleon number A and neutron number N to describe nuclides and isotopes
O: Explain why atoms are stable and estimate the density of nuclear matter
PRE: Heisenberg uncertainty principle
LV: GCSE and A level · Foundation
H: Scale
- Atom ~10^{-10} m (0.1 nm); nucleus ~10^{-15}–10^{-14} m: a pea in a stadium.
- The nucleus holds over 99.9% of the mass; an electron's mass is 1/1836 of a proton's.
- Proton number Z fixes the element; nucleon number A = Z + N; isotopes have the same Z but different N.
H: Historical models
- Dalton (1808): indivisible atoms.
- Thomson (1904): "plum pudding", after his discovery of the electron (1897).
- Rutherford (1911): the nuclear atom, from alpha scattering.
- Bohr (1913): quantised orbits.
- Schrödinger (1926): wavefunctions and orbitals.
H: Why atoms are stable and the size they are
P: Classically, an orbiting electron accelerates, radiates and would spiral into the nucleus within ~10^{-11} s. Quantum mechanics prevents this: confining an electron to a small region raises its minimum kinetic energy (uncertainty principle). The balance between this and the Coulomb attraction fixes the ground state at about the Bohr radius, 0.053 nm.
X: Density of a nucleus with A = 56, using r = 1.2A^{1/3} fm?
> r = 1.2 × 56^{1/3} = 4.6 fm; V = (4/3)πr^{3} = 4.1 × 10^{-43} m^{3}
> m = 56 × 1.67 × 10^{-27} kg = 9.4 × 10^{-26} kg
> ρ = m/V ≈ 2.3 × 10^{17} kg m^{-3}: about the same for all nuclei
K: The atom's mass is concentrated in a nucleus 10^{5} times smaller than the atom; its size is set by the quantum mechanics of the electrons.
!: "Atoms are mostly empty space" refers to mass. The electron cloud fills the volume, and atoms can't be pushed through each other because of electrostatic repulsion and the Pauli exclusion principle.
T: Proton number (Z) | The number of protons in a nucleus; it fixes the element
T: Nucleon number (A) | The total number of protons and neutrons in a nucleus
T: Isotopes | Nuclides of the same element (same Z) with different numbers of neutrons
SUM: An atom is a nucleus of radius ~10^{-15} m holding almost all the mass, inside an electron cloud ~10^{-10} m across.
SUM: Z identifies the element; A = Z + N; isotopes differ only in N.
SUM: Quantum confinement energy, not a classical orbit, makes atoms stable.
EV: established | Atoms consist of a small, massive, positively charged nucleus surrounded by electrons described by quantum mechanics
SRC: OpenStax, College Physics 2e, section 30.2 "Discovery of the Parts of the Atom: Electrons and Nuclei" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-2-discovery-of-the-parts-of-the-atom-electrons-and-nuclei
SRC: AQA, A-level Physics specification (7408), section 3.2.1.1 Constituents of the atom | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What fixes an element's identity? | Its proton number Z, the number of protons in the nucleus.
Q: Why doesn't the electron spiral into the nucleus? | Quantum mechanics: a confined electron has a minimum kinetic energy, so there is a stable ground state.
M1@1: An atom is roughly how many times larger than its nucleus? | 10^{5} | 10 | 10^{10} | 100 | An atom is about 10^{-10} m across and a nucleus about 10^{-15} m, a ratio of about 10^{5}.
M2@2: Isotopes of an element differ in their number of: | Neutrons | Protons | Electrons when neutral | Charge on the nucleus | Isotopes share Z (protons, and so nuclear charge and neutral electron count) but have different numbers of neutrons.
TF1@1: Nearly all of an atom's mass is in its nucleus. | true | Protons and neutrons are each about 1836 times heavier than an electron, so the nucleus carries over 99.9% of the mass.
NUM2@2: How many neutrons are in a nucleus of ^{235}_{92}U? | 143 | 0 | neutrons | N = A − Z = 235 − 92 = 143 neutrons.
M3@3: Nuclear radius grows as A^{1/3}. How does nuclear density change from A = 27 to A = 216? | It stays about the same | It rises by a factor of 8 | It rises by a factor of 2 | It falls by a factor of 2 | Volume ∝ r^{3} ∝ A, and mass ∝ A, so density = mass/volume is independent of A: all nuclei have about the same density.
SA3@3: Explain why classical physics predicts that atoms should collapse, and how quantum mechanics explains their stability and size. | An orbiting electron is accelerating, so classical electromagnetism says it radiates energy and spirals into the nucleus in about 10^{-11} s. In quantum mechanics, confining the electron to a region of size r gives it momentum of order ħ/r, so its kinetic energy rises as r shrinks while its Coulomb energy falls. The total energy has a minimum at about the Bohr radius, giving a stable ground state from which it cannot radiate further. | Accelerating charge radiates classically ; Predicts collapse on a very short timescale ; Uncertainty principle gives confinement kinetic energy ; Balance with Coulomb attraction gives a minimum energy ; Ground state at about the Bohr radius cannot radiate

## Rutherford scattering
S: Geiger and Marsden fired alpha particles at thin gold foil; a few bounced back through large angles. Rutherford (1911) showed this required all the positive charge and nearly all the mass to be concentrated in a tiny nucleus.
O: Describe the Geiger–Marsden observations and what each implies about the atom
O: Calculate the distance of closest approach for a head-on collision
O: Explain how the angular distribution and its deviations reveal nuclear size
PRE: Coulomb's law
LV: A level · Application
H: Observations
- Most alphas pass straight through: the atom is mostly empty.
- A few are deflected through large angles; about 1 in 8000 is turned back through more than 90°: a small, dense, charged centre.
- The plum-pudding model spreads charge out, so it predicts only tiny deflections.
H: Rutherford's formula
E: dσ/dΩ = (zZe^{2}/(16πε_{0}E_{k}))^{2}/sin^{4}(θ/2)
- Strongly forward-peaked; it matched the counts at all angles measured.
H: Distance of closest approach
E: r_{min} = zZe^{2}/(4πε_{0}E_{k}) :: head-on: all kinetic energy becomes electric potential energy
- Useful shortcut: e^{2}/(4πε_{0}) = 1.44 MeV fm.
- For 5 MeV alphas on gold: about 45 fm, an upper limit on the nuclear radius.
- At higher energies the counts fall below the formula: the alpha reaches the nuclear force, which measures the nuclear size.
H: Legacy
P: Deep inelastic scattering of electrons off protons (SLAC, 1968) repeated Rutherford's idea at much higher energy and found quarks inside protons. Scattering remains the main way physicists see inside matter.
X: Closest approach of a 7.7 MeV alpha (z = 2) to gold (Z = 79)?
> r = zZ × 1.44 MeV fm/E_{k} = 2 × 79 × 1.44/7.7 fm
> r ≈ 30 fm
K: Large-angle scattering is only possible if the positive charge and mass are concentrated in a region much smaller than the atom.
!: Rutherford scattering is pure Coulomb repulsion; at Geiger and Marsden's energies the alphas never touch the nucleus.
T: Distance of closest approach | The minimum separation reached in a head-on collision, where the alpha momentarily stops
T: Differential cross-section | The effective target area per unit solid angle for scattering into a given direction
SUM: Most alphas pass through; a few rebound: the atom has a tiny, dense, positive nucleus.
SUM: Closest approach r = zZe^{2}/(4πε_{0}E_{k}) gives an upper limit on nuclear size.
EV: established | Alpha-scattering data require the positive charge and mass of an atom to be concentrated in a nucleus about 10^{-14} m or smaller
SRC: OpenStax, College Physics 2e, section 30.2 "Discovery of the Parts of the Atom: Electrons and Nuclei" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-2-discovery-of-the-parts-of-the-atom-electrons-and-nuclei
SRC: AQA, A-level Physics specification (7408), section 3.8.1.1 Rutherford scattering | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What did large-angle alpha scattering show? | Positive charge and mass are concentrated in a tiny nucleus.
Q: How does Rutherford's cross-section depend on angle? | As 1/sin^{4}(θ/2).
M1@1: Most alphas passed straight through the foil because: | Atoms are mostly empty space | Gold foil is transparent to alphas | Alpha particles are neutral | The electrons attract them forward | Only alphas passing very close to the tiny nucleus are deflected appreciably, so most go straight through.
M2@3: Deep inelastic electron scattering at SLAC revealed: | Quarks inside protons | The atomic nucleus itself | The existence of the electron | Neutrons inside nuclei | In 1968 high-energy electrons scattered off point-like charges inside the proton, the first direct evidence for quarks.
NUM2@2: Find the distance of closest approach, in fm, of a 5.0 MeV alpha particle (z = 2) to a gold nucleus (Z = 79). Use e^{2}/(4πε_{0}) = 1.44 MeV fm. | 45.5 | 1 | fm | r = 2 × 79 × 1.44/5.0 = 45.5 fm: the nucleus must be smaller than this.
M3@1,3: What would the plum-pudding model predict for the Geiger–Marsden experiment? | Small deflections, almost none above a few degrees | About 1 in 8000 alphas turned back | Most alphas absorbed by the foil | Alphas deflected equally in all directions | Spread-out positive charge gives only weak fields, so it can't turn an alpha back; the observed back-scattering ruled the model out.
SA3@1,3: Explain how Rutherford scattering experiments give an upper limit on the size of the nucleus, and why higher-energy alphas eventually disagree with the Rutherford formula. | At closest approach in a head-on collision, all the alpha's kinetic energy has become electric potential energy, so r = zZe^{2}/(4πε_{0}E_{k}); since the data fit pure Coulomb scattering, the nucleus must be smaller than this distance. Raising the energy reduces r_{min}; when it becomes comparable to the nuclear radius, the alpha feels the strong nuclear force and the counts at large angles fall below the formula, which gives the radius. | Energy conservation at closest approach ; Formula for r_{min} ; Agreement with Coulomb law means nucleus is smaller than r_{min} ; Higher energy means closer approach ; Deviation when the nuclear force acts gives the size

## Bohr model
S: Bohr's 1913 model put hydrogen's electron in circular orbits with quantised angular momentum. It gave hydrogen's energy levels and spectral lines correctly, a crucial step towards quantum mechanics, though its picture of orbits was wrong.
O: State Bohr's postulates
O: Calculate radii, speeds and energies of Bohr orbits for hydrogen-like atoms
O: Explain the successes and failures of the model
PRE: Photoelectric effect
LV: Year 1 · Application
H: Postulates
- Electrons orbit in stationary states without radiating.
- Angular momentum is quantised: mvr = nħ.
- Light is emitted or absorbed when the electron jumps: hf = E_{i} − E_{f}.
H: Results
E: r_{n} = n^{2}a_{0}, a_{0} = 0.0529 nm
E: E_{n} = −13.6 eV/n^{2} (× Z^{2} for hydrogen-like ions)
E: v_{n} = αc/n :: α ≈ 1/137
H: Successes and failures
- Gives hydrogen's energies and the Rydberg constant from fundamental constants.
- Works for hydrogen-like ions (He^{+}, Li^{2+}).
- Fails for multi-electron atoms, fine structure and line intensities, and wrongly gives the ground state angular momentum ħ (it is zero).
- Superseded by the Schrödinger equation, which gives the same energies with orbitals instead of orbits.
X: Radius and speed of the electron in hydrogen's n = 2 orbit?
> r = 4a_{0} = 0.21 nm
> v = αc/2 = 1.1 × 10^{6} m s^{-1}
K: Quantising angular momentum makes the energy levels discrete, E_{n} = −13.6 eV/n^{2}, which explains hydrogen's line spectrum.
!: Bohr orbits don't exist; electrons in atoms aren't on circular tracks. The model's energies are right; its picture isn't.
T: Stationary state | An allowed orbit in which, Bohr postulated, the electron does not radiate
T: Bohr radius | a_{0} = 4πε_{0}ħ^{2}/(m_{e}e^{2}) ≈ 0.0529 nm, the radius of hydrogen's n = 1 orbit
SUM: Bohr: quantised angular momentum mvr = nħ gives r_{n} = n^{2}a_{0} and E_{n} = −13.6 eV/n^{2}.
SUM: Photon energies equal differences between levels.
SUM: The model works only for one-electron systems and was replaced by quantum mechanics.
EV: established | The Bohr energy levels of hydrogen agree with experiment to about one part in 10^{4}, but the orbit picture is not correct
SRC: OpenStax, University Physics Volume 3, section 6.4 "Bohr's Model of the Hydrogen Atom" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/6-4-bohrs-model-of-the-hydrogen-atom
SRC: OpenStax, College Physics 2e, section 30.3 "Bohr's Theory of the Hydrogen Atom" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-3-bohrs-theory-of-the-hydrogen-atom
Q: What did Bohr assume about angular momentum? | It's quantised in units of ħ: mvr = nħ.
Q: Why was the Bohr model abandoned? | It couldn't explain multi-electron atoms, fine structure or intensities, and its orbit picture conflicts with quantum mechanics.
M1@2: Energy of He^{+} in n = 1: | −54.4 eV | −13.6 eV | −27.2 eV | −3.4 eV | For a hydrogen-like ion E_{n} = −13.6Z^{2}/n^{2} eV; with Z = 2 and n = 1 that is −54.4 eV.
M2@2: The Bohr radius is about: | 0.053 nm | 1 nm | 0.53 nm | 5.3 pm | a_{0} = 0.0529 nm, so hydrogen atoms are about 0.1 nm across in the ground state.
TF1@1: In the Bohr model, an electron radiates continuously while it stays in an allowed orbit. | false | Bohr postulated stationary states that do not radiate; light is emitted only during a jump between orbits.
NUM2@2: What photon energy, in eV, is emitted when hydrogen's electron drops from n = 3 to n = 2? | 1.89 | 0.02 | eV | ΔE = 13.6(1/4 − 1/9) = 13.6 × 5/36 = 1.89 eV, the red Hα line at 656 nm.
M3@3: Which observation can the Bohr model NOT explain? | The splitting of hydrogen lines into close doublets | The wavelengths of the Balmer series | The ionisation energy of hydrogen | The spectrum of He^{+} | Fine-structure doublets come from electron spin and relativity, which Bohr's model lacks; the other three follow from E_{n} = −13.6Z^{2}/n^{2}.
SA2@1,3: Describe Bohr's model of hydrogen and evaluate how far it succeeded. | Bohr assumed the electron moves in circular orbits in which it does not radiate, with angular momentum quantised as nħ, and that photons are emitted or absorbed with hf equal to the energy difference between orbits. This gives r_{n} = n^{2}a_{0} and E_{n} = −13.6/n^{2} eV, reproducing the hydrogen series and the Rydberg constant. It fails for atoms with more than one electron, cannot give line intensities or fine structure, and its definite orbits and nonzero ground-state angular momentum contradict quantum mechanics. | States non-radiating orbits ; States angular momentum quantisation ; States hf = energy difference ; Successes: hydrogen energies and spectra ; Failures: multi-electron atoms, fine structure, orbit picture

## Quantum mechanical atomic models
S: In the quantum model, electrons occupy orbitals: wavefunctions that give probability clouds around the nucleus. Solving the Schrödinger equation, approximately for many electrons, explains spectra, chemistry and the periodic table.
O: Describe how the quantum model replaces orbits with orbitals labelled by quantum numbers
O: Explain why energies depend on l in multi-electron atoms but not in hydrogen
O: Outline the main approximation methods for many-electron atoms
PRE: Schrödinger equation
LV: Year 2 · Physical reasoning
H: Features
- Orbitals labelled by quantum numbers n, l, m_{l}, plus spin m_{s}.
- No definite paths: |ψ|^{2} gives the probability density for finding the electron.
- Energy depends on n only in hydrogen; on n and l in multi-electron atoms, because of screening.
H: Multi-electron methods
- **Central-field approximation**: each electron moves in an average, spherically symmetric potential.
- **Hartree–Fock**: self-consistent orbitals including exchange.
- **Configuration interaction, coupled cluster, density functional theory**: include electron correlation.
- **Relativistic (Dirac–Fock)**: needed for heavy atoms.
H: Relativistic effects
P: In heavy atoms, inner electrons move at a large fraction of c, and s orbitals contract. This shifts energy gaps: gold absorbs blue light and so looks yellow, and mercury's weak bonding (it is liquid at room temperature) are both relativistic effects.
X: Why is 2s lower in energy than 2p in lithium but not in hydrogen?
> Hydrogen: the pure 1/r potential makes energy depend only on n
> Lithium: a 2s electron penetrates inside the 1s shell, feels more nuclear charge and is more tightly bound
K: The quantum atom gives probabilities, not paths; its energy levels come from solving the Schrödinger equation with suitable approximations.
!: Orbitals are one-electron approximations; the true many-electron wavefunction isn't a simple product of orbitals.
T: Orbital | A one-electron wavefunction describing an electron's probability distribution in an atom
T: Central-field approximation | Treating each electron as moving in the average spherically symmetric field of the nucleus and the other electrons
T: Electron correlation | The part of electron–electron interaction missed by a mean-field (Hartree–Fock) treatment
SUM: Electrons are described by orbitals with quantum numbers n, l, m_{l}, m_{s}.
SUM: Screening and penetration make energies depend on l in multi-electron atoms.
SUM: Accurate atomic calculations need correlation and, for heavy atoms, relativity.
EV: established | Approximate solutions of the Schrödinger (or Dirac) equation reproduce measured atomic energy levels and the structure of the periodic table
SRC: OpenStax, University Physics Volume 3, section 8.1 "The Hydrogen Atom" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom
SRC: OpenStax, University Physics Volume 3, section 8.4 "The Exclusion Principle and the Periodic Table" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-4-the-exclusion-principle-and-the-periodic-table
Q: What is an atomic orbital? | A one-electron wavefunction describing an electron's probability distribution in an atom.
Q: Why is gold yellow? | Relativistic effects shift its electron energy levels so it absorbs blue light.
M1@2: In hydrogen, the energy depends on: | n only | n and l | l only | m_{l} only | The pure Coulomb potential gives an "accidental" degeneracy: all states with the same n have the same energy.
M2@3: Hartree–Fock treats each electron as moving in: | The average field of the others | No field at all | A magnetic field only | The field of a crystal lattice | It is a self-consistent mean-field method: each orbital is found in the averaged field of all the other electrons.
TF1@1: In the quantum model, |ψ|^{2} gives the probability density of finding the electron. | true | The Born rule interprets |ψ|^{2} as probability per unit volume, replacing Bohr's definite orbits.
M3@2: In sodium, which of these subshells has the lowest energy? | 3s | 3p | 3d | They are all equal | The 3s electron penetrates the inner shells most and is least screened, so it is most tightly bound; in hydrogen all three would be degenerate.
SA3@2,3: Explain why the 2s and 2p levels have the same energy in hydrogen but different energies in lithium, and what this implies for atomic models. | In hydrogen the single electron moves in a pure 1/r Coulomb potential, whose special symmetry makes the energy depend only on n. In lithium the 2s or 2p electron moves in the field of the nucleus partly screened by the two 1s electrons. The 2s wavefunction penetrates inside the 1s shell, so it feels a larger effective charge and lies lower than 2p. Multi-electron models therefore need an effective, non-Coulomb central potential, as in the central-field and Hartree–Fock methods. | Hydrogen degeneracy from pure 1/r potential ; Screening by 1s electrons in lithium ; Penetration of 2s ; 2s lower than 2p ; Need for central-field or mean-field models

## Atomic orbitals
S: Atomic orbitals are the shapes of electron probability clouds, set by the quantum numbers l and m. Their shapes and orientations determine how atoms bond and the geometry of molecules.
O: Describe the shapes and numbers of s, p, d and f orbitals
O: Count radial and angular nodes from n and l
O: Explain how orbital overlap and hybridisation lead to molecular shapes
PRE: Orbital angular momentum
LV: Year 1 · Application
H: Shapes
- **s** (l = 0): spherical; one orbital per shell.
- **p** (l = 1): two lobes along x, y or z; three orbitals.
- **d** (l = 2): five orbitals, mostly four-lobed.
- **f** (l = 3): seven orbitals with complex shapes.
- A subshell has 2l + 1 orbitals; a shell has n^{2} orbitals.
H: Nodes
- Total nodes = n − 1: radial nodes n − l − 1, angular nodes l.
- 2s has one radial node; 3p has one radial and one angular node.
H: Bonding
P: Orbitals on neighbouring atoms overlap and combine into bonding and antibonding molecular orbitals. Mixing s and p orbitals (hybridisation) gives sp^{3} (tetrahedral, as in methane), sp^{2} (trigonal planar, as in graphene) and sp (linear, as in ethyne) geometries.
H: Seeing orbitals
- Probability distributions are inferred from spectroscopy and scattering.
- Photoionisation microscopy has imaged the nodal structure of excited hydrogen atoms.
X: How many radial and angular nodes does a 4d orbital have?
> Angular: l = 2
> Radial: n − l − 1 = 4 − 2 − 1 = 1
K: l sets an orbital's shape and number of angular nodes; n − l − 1 gives its radial nodes.
!: Orbital diagrams show regions of high probability (usually 90% boundary surfaces), not hard edges.
T: Node | A surface on which the wavefunction, and so the probability density, is zero
T: Hybridisation | Mixing of atomic orbitals on one atom to form equivalent orbitals suited to bonding
SUM: s, p, d, f orbitals have l = 0, 1, 2, 3 and 1, 3, 5, 7 orientations.
SUM: Radial nodes = n − l − 1; angular nodes = l.
EV: established | Orbital shapes from the hydrogen-atom solutions explain the directional bonding and geometry of molecules
SRC: OpenStax, University Physics Volume 3, section 8.1 "The Hydrogen Atom" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom
SRC: OpenStax, College Physics 2e, section 30.8 "Quantum Numbers and Rules" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-8-quantum-numbers-and-rules
Q: How many p orbitals are there in a shell? | Three.
Q: What determines an orbital's number of angular nodes? | Its l value.
M1@2: A 3s orbital has how many radial nodes? | 2 | 1 | 0 | 3 | Radial nodes = n − l − 1 = 3 − 0 − 1 = 2; s orbitals have no angular nodes.
M2@3: Methane's tetrahedral shape comes from: | sp^{3} hybridisation | sp hybrid orbitals | Pure p orbitals at 90° | d orbitals on carbon | Mixing carbon's 2s with all three 2p orbitals gives four equivalent sp^{3} hybrids pointing to the corners of a tetrahedron.
NUM1@1: How many orbitals are in the n = 3 shell? | 9 | 0 | orbitals | n^{2} = 9: one 3s, three 3p and five 3d orbitals.
TF2@2: A 2p orbital has one radial node. | false | Radial nodes = n − l − 1 = 2 − 1 − 1 = 0; its single node is angular (a nodal plane through the nucleus).
M3@2,3: Which orbital has two angular nodes and one radial node? | 4d | 3d | 4p | 5s | Two angular nodes means l = 2 (d); one radial node means n − 3 = 1, so n = 4.
SA2@1,2: Describe the shapes of s and p orbitals and explain how the number of nodes in an orbital depends on its quantum numbers. | An s orbital (l = 0) is spherically symmetric, with one per shell. A p orbital (l = 1) has two lobes on opposite sides of the nucleus, along x, y or z, with three per shell. An orbital has n − 1 nodes in total: l angular nodes (planes or cones through the nucleus) and n − l − 1 radial nodes (spheres). For example 3p has one angular and one radial node. | s spherical ; p two lobes, three orientations ; Total nodes n − 1 ; Angular nodes = l ; Radial nodes = n − l − 1 with an example

## Electron configurations
S: An electron configuration lists how an atom's electrons fill its orbitals. Filling follows energy order, the Pauli principle and Hund's rule, and the outer electrons determine chemistry and the structure of the periodic table.
O: Write ground-state electron configurations using the aufbau order and the Pauli principle
O: Apply Hund's rule to find the number of unpaired electrons
O: Relate configurations to the structure of the periodic table and its exceptions
PRE: Pauli exclusion principle
LV: Year 1 · Foundation
H: Rules
- **Aufbau**: fill the lowest energy first (Madelung n + l rule: 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d…).
- **Pauli**: at most two electrons per orbital, with opposite spins.
- **Hund's first rule**: within a subshell, maximise total spin, filling orbitals singly with parallel spins first.
H: Examples
- C: 1s^{2} 2s^{2} 2p^{2}; Fe: [Ar] 3d^{6} 4s^{2}.
- Exceptions: Cr [Ar] 3d^{5} 4s^{1}; Cu [Ar] 3d^{10} 4s^{1}: half-filled and filled d subshells are especially stable.
H: The periodic table
P: Rows correspond to shells; columns group atoms with similar outer configurations. Blocks: s (groups 1–2), p (13–18), d (transition metals), f (lanthanides and actinides). Noble gases have filled shells and are chemically inert; ionisation energies drop sharply just after each filled shell.
X: Configuration of phosphorus (Z = 15) and its unpaired electrons?
> 1s^{2} 2s^{2} 2p^{6} 3s^{2} 3p^{3}
> Hund: the three 3p electrons occupy separate orbitals: three unpaired electrons
K: Configurations follow from filling orbitals in energy order, two per orbital, with parallel spins first within a subshell.
!: 4s fills before 3d in neutral atoms, but in transition-metal ions the 4s electrons are removed first.
T: Aufbau principle | Electrons occupy the lowest-energy available orbitals first
T: Hund's rule | In a partly filled subshell, electrons occupy separate orbitals with parallel spins before pairing
SUM: Fill orbitals in the order 1s, 2s, 2p, 3s, 3p, 4s, 3d…, with at most two electrons each.
SUM: Hund's rule maximises unpaired parallel spins in a subshell.
SUM: Outer configurations explain the periodic table's groups and blocks.
EV: established | Ground-state configurations from the aufbau order, Pauli principle and Hund's rule agree with spectroscopic data, with known exceptions such as Cr and Cu
SRC: OpenStax, University Physics Volume 3, section 8.4 "The Exclusion Principle and the Periodic Table" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-4-the-exclusion-principle-and-the-periodic-table
SRC: OpenStax, College Physics 2e, section 30.9 "The Pauli Exclusion Principle" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-9-the-pauli-exclusion-principle
Q: State Hund's first rule. | Electrons in a subshell occupy separate orbitals with parallel spins first, maximising total spin.
Q: Why are noble gases inert? | Their outer shells are completely filled.
M1@1: The configuration of sodium (Z = 11) is: | [Ne] 3s^{1} | [Ne] 3p^{1} | [Ar] 4s^{1} | [He] 2s^{1} | Ten electrons fill the neon core (1s^{2} 2s^{2} 2p^{6}); the eleventh goes into 3s, the lowest available level.
M2@3: Copper's configuration is [Ar] 3d^{10} 4s^{1} because: | A filled 3d subshell is especially stable | 4s lies above 4p in copper | Copper has only 28 electrons | Copper atoms are normally ionised | Moving one electron from 4s into 3d completes the d subshell, which lowers the total energy.
NUM2@2: How many unpaired electrons does a ground-state nitrogen atom (Z = 7) have? | 3 | 0 | electrons | 1s^{2} 2s^{2} 2p^{3}: by Hund's rule the three 2p electrons occupy separate orbitals with parallel spins.
TF1@1: Each atomic orbital can hold at most two electrons. | true | The Pauli principle forbids two electrons with the same four quantum numbers, so an orbital holds two, with opposite spins.
M3@1,3: Which is the configuration of the Fe^{2+} ion? | [Ar] 3d^{6} | [Ar] 3d^{4} 4s^{2} | [Ar] 3d^{5} 4s^{1} | [Ar] 3d^{6} 4s^{2} | Neutral Fe is [Ar] 3d^{6} 4s^{2}; in forming ions the 4s electrons are lost first, leaving [Ar] 3d^{6}.
SA2@1,3: Explain how the Pauli principle and the energy order of subshells together account for the structure of the periodic table. | The Pauli principle allows only two electrons per orbital, so each subshell holds 2(2l + 1) electrons and each shell a limited number. Filling in energy order (1s, 2s, 2p, 3s, 3p, 4s, 3d…) means the outer configuration repeats periodically. Elements with the same outer configuration fall in the same group and behave alike; the block (s, p, d, f) is the subshell being filled. Filled shells give the inert noble gases, and periods of 2, 8, 8, 18, 18 and 32 follow from the subshell capacities. | Two electrons per orbital ; Subshell capacity 2(2l + 1) ; Aufbau order ; Repeating outer configuration gives groups ; Blocks or period lengths explained

## Atomic energy levels
S: Each atom has a characteristic set of energy levels determined by its electron configuration and the interactions between electrons. Transitions between them produce the spectral lines that fingerprint every element.
O: Describe the hierarchy of gross, term, fine and hyperfine structure
O: Calculate photon energies and wavelengths from level differences, in eV and J
O: Explain excitation and ionisation by electron collisions
PRE: Bohr model
LV: A level · Application
H: Structure of levels
- Gross structure: set by the configuration (Coulomb attraction, screening): eV scale.
- Terms: electron–electron repulsion splits a configuration into terms ^{2S+1}L (carbon's 2p^{2} gives ^{3}P, ^{1}D, ^{1}S).
- Fine structure: spin–orbit coupling splits terms into levels of different J: meV scale in light atoms.
- Hyperfine structure: from nuclear spin: μeV scale.
P: Energy-level diagrams (Grotrian diagrams) draw each level as a horizontal line, with the ground state at the bottom and the ionisation limit at E = 0, so bound levels have negative energies.
H: Excitation and ionisation
- Ionisation energy: from the ground state to removing an electron (H 13.6 eV, He 24.6 eV, Na 5.1 eV, Cs 3.9 eV).
- An electron colliding with an atom can excite it if its kinetic energy exceeds a level gap; the atom then de-excites by emitting photons (fluorescent tubes).
- 1 eV = 1.60 × 10^{-19} J; hc = 1240 eV nm.
- Rydberg states: highly excited atoms (n ~ 100 is ~1 μm across), very sensitive to fields.
X: Sodium's 3p → 3s transition gives 589 nm light. Energy gap?
> E = hc/λ = 1240 eV nm/589 nm = 2.1 eV
> In joules: 2.1 × 1.60 × 10^{-19} = 3.4 × 10^{-19} J
K: A photon emitted or absorbed carries exactly the energy difference between two levels: hf = E_{1} − E_{2}.
!: Multi-electron atoms' levels depend on n and l, unlike hydrogen's, because of screening and electron interactions.
T: Excitation | Raising an electron to a higher energy level without removing it from the atom
T: Ionisation energy | The minimum energy needed to remove an electron from an atom in its ground state
T: Electronvolt | The energy gained by an electron accelerated through 1 V: 1.60 × 10^{-19} J
SUM: Levels have a hierarchy: gross (eV), fine (meV), hyperfine (μeV).
SUM: Photon energy = level difference; E (eV) = 1240/λ (nm).
SUM: Electron collisions excite or ionise atoms when they carry enough energy.
EV: established | Line spectra are evidence that atoms have discrete energy levels, with photon energies equal to level differences
SRC: AQA, A-level Physics specification (7408), section 3.2.2.3 Energy levels and photon emission | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 30.3 "Bohr's Theory of the Hydrogen Atom" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-3-bohrs-theory-of-the-hydrogen-atom
Q: What causes term splitting within a configuration? | Electron–electron repulsion, which depends on how spins and orbital momenta combine.
Q: What are Rydberg atoms? | Atoms with an electron in a very high n state, making them huge and highly sensitive to fields.
M1@3: Which has the lowest ionisation energy? | Caesium | Helium | Hydrogen | Neon | Caesium's single 6s electron is far from the nucleus and well screened, so only 3.9 eV removes it.
M2@1: Fine-structure splitting in light atoms is typically: | ~meV | ~eV | ~keV | ~MeV | Spin–orbit splitting is about α^{2} times the gross energy scale, so around 10^{-3} eV, much smaller than the eV gaps between configurations.
NUM2@2: An atom emits a 2.5 eV photon. What is its wavelength in nm? | 496 | 2 | nm | λ = 1240 eV nm/2.5 eV = 496 nm, blue-green light.
TF1@3: An electron with 5 eV of kinetic energy can excite an atom whose first excited level is 10 eV above the ground state. | false | Excitation needs at least the level gap; with only 5 eV the collision must be elastic.
M3@2,3: Mercury's first excitation energy is 4.9 eV. Electrons of 7.0 eV hit mercury atoms. What happens? | Some excite atoms, leaving with about 2.1 eV, and UV photons of 4.9 eV are emitted | The atoms are ionised, emitting 7.0 eV photons | Each atom absorbs all 7.0 eV and re-emits 7.0 eV photons | Nothing happens because 7.0 eV is not a level energy | A free electron can transfer just the 4.9 eV gap and keep the rest; the excited atom then emits a 4.9 eV (253 nm) photon, as in the Franck–Hertz experiment.
SA2@1,2: Explain how a line emission spectrum provides evidence for discrete energy levels, and how you would find a level gap from a measured line. | Excited atoms emit light only at particular wavelengths, seen as separate bright lines. If photons are emitted when electrons drop between levels, each line's photon energy hf = hc/λ equals one level difference, so a discrete set of lines implies a discrete set of levels. To find a gap, measure λ (for example with a diffraction grating) and calculate E = hc/λ, converting to eV by dividing by 1.60 × 10^{-19} J. | Lines at specific wavelengths only ; Each photon from a transition between levels ; Photon energy equals level difference ; Discrete lines imply discrete levels ; E = hc/λ with unit conversion

## Hydrogen and hydrogen-like atoms
S: Hydrogen and ions with a single electron (He^{+}, Li^{2+}…) can be solved exactly. Their levels scale simply with nuclear charge, and they are benchmarks for testing quantum electrodynamics.
O: Use the Z^{2}/n^{2} scaling to find energies and wavelengths for hydrogen-like ions
O: Apply the reduced-mass correction to explain isotope shifts
O: Describe exotic hydrogen-like systems and what they test
PRE: Hydrogen atom
LV: Year 2 · Application
H: Energy and size scaling
E: E_{n} = −13.6 Z^{2}/n^{2} eV
E: ⟨r⟩ ∝ n^{2}a_{0}/Z
- Lines scale as Z^{2}: He^{+} Lyman alpha is at 30.4 nm, against 121.6 nm for H.
H: Reduced mass
E: R_{M} = R_{∞}/(1 + m_{e}/M)
- The nucleus also moves, so energies depend slightly on its mass M. Urey discovered deuterium (1932) from its slightly shifted Balmer lines.
H: Exotic hydrogen-like systems
- Positronium (e^{+}e^{−}): reduced mass m_{e}/2, so energies are half of hydrogen's.
- Muonic hydrogen: the muon is ~207 times heavier and orbits ~186 times closer; it measured the proton charge radius (2010), starting the "proton radius puzzle".
- Antihydrogen: CERN's ALPHA experiment showed its 1s–2s line matches hydrogen's to a few parts in 10^{12}.
- Highly charged ions (U^{91+}): tests of QED in strong fields.
X: Wavelength of the n = 2 → 1 transition in Li^{2+}?
> E = 13.6 × 9 × (1 − 1/4) = 91.8 eV
> λ = 1240/91.8 = 13.5 nm
K: For any one-electron system, energies scale as Z^{2} times the reduced-mass ratio; precise comparisons then test QED and nuclear size.
!: Hydrogen-like formulas only apply to one-electron systems; neutral helium needs the multi-electron treatment.
T: Hydrogen-like ion | An ion with a single electron bound to a nucleus of charge Ze
T: Reduced mass | μ = m_{e}M/(m_{e} + M), the effective mass in a two-body system
SUM: E_{n} = −13.6Z^{2}/n^{2} eV; wavelengths shrink as 1/Z^{2}.
SUM: Reduced-mass corrections shift lines between isotopes.
SUM: Positronium, muonic hydrogen and antihydrogen test QED, the proton radius and matter–antimatter symmetry.
EV: established | One-electron atoms follow the Z^{2}/n^{2} energy scaling with reduced-mass corrections, confirmed by spectroscopy of H, D, He^{+} and exotic atoms
SRC: OpenStax, University Physics Volume 3, section 8.1 "The Hydrogen Atom" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom
SRC: OpenStax, College Physics 2e, section 30.3 "Bohr's Theory of the Hydrogen Atom" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-3-bohrs-theory-of-the-hydrogen-atom
Q: How do hydrogen-like energies scale with Z? | As Z^{2}.
Q: What did muonic hydrogen measure? | The proton's charge radius, with surprising initial results (the proton radius puzzle).
M1@3: Positronium's binding energy is: | 6.8 eV | 13.6 eV | 27.2 eV | 0 eV | The reduced mass of an electron–positron pair is m_{e}/2, so all energies are half of hydrogen's: 13.6/2 = 6.8 eV.
M2@2: Deuterium was discovered through: | Isotope shifts in its spectral lines | Measuring its radioactive decay | Detecting neutrons it emitted | Its greater chemical reactivity | Urey saw faint Balmer lines slightly shifted from hydrogen's, the reduced-mass effect of a heavier nucleus.
NUM2@1: What is the ionisation energy, in eV, of a ground-state He^{+} ion? | 54.4 | 0.2 | eV | E = 13.6 × Z^{2}/n^{2} = 13.6 × 4/1 = 54.4 eV.
TF1@1: The Lyman alpha line of He^{+} has a shorter wavelength than that of hydrogen. | true | Energies scale as Z^{2}, so He^{+} lines have one quarter of hydrogen's wavelength: 30.4 nm against 121.6 nm.
M3@2,3: Why does a muon in muonic hydrogen probe the proton's size much more strongly than an electron does? | Its orbit is about 186 times smaller, so its wavefunction overlaps the proton far more | It carries a larger electric charge than the electron | It interacts with quarks by the strong force | It moves more slowly, so it spends longer near the nucleus | The Bohr radius scales as 1/(reduced mass); the heavier muon sits much closer, so the finite proton size shifts its levels far more.
SA3@1,2: Explain how the spectra of hydrogen, deuterium and He^{+} differ, and why. | All three have one electron, so their levels follow E_{n} = −13.6Z^{2}(μ/m_{e})/n^{2} eV. He^{+} has Z = 2, so its energies are four times larger and its wavelengths four times shorter than hydrogen's. Deuterium has the same Z as hydrogen but a nucleus twice as heavy, so its reduced mass is slightly closer to m_{e}; its levels are slightly deeper and its lines shift to slightly shorter wavelength (about 0.03%), the isotope shift used to discover it. | Same one-electron formula ; Z^{2} scaling for He^{+} ; Four times shorter wavelengths ; Reduced-mass effect for deuterium ; Small isotope shift to shorter wavelength

## Multi-electron atoms
S: In atoms with more than one electron, electron–electron repulsion makes the Schrödinger equation unsolvable exactly. Screening, exchange and correlation explain why energies depend on l, and why the periodic table has its shape.
O: Use effective nuclear charge to explain screening and periodic trends
O: Explain the singlet and triplet structure of helium in terms of exchange
O: Apply Moseley's law to inner-shell X-ray lines
PRE: Identical particles
LV: Year 2 · Application
H: Screening
E: Z_{eff} = Z − σ :: effective nuclear charge; σ is the screening constant
- Inner electrons shield outer ones; s electrons penetrate more and are less shielded than p, d, f.
- Slater's rules estimate σ.
H: Helium
- Ground state 1s^{2}, total energy −79.0 eV (two ionisations: 24.6 + 54.4 eV).
- Excited states split into singlet (para) and triplet (ortho) systems; triplets lie lower because their antisymmetric spatial wavefunction keeps the electrons apart, reducing repulsion (exchange).
H: Trends
- Atomic radius decreases across a period (rising Z_{eff}) and increases down a group.
- Ionisation energy increases across a period and drops sharply after each noble gas.
H: X-ray spectra
P: Inner-shell (K, L) transitions in heavy atoms behave almost like hydrogen with Z_{eff} ≈ Z − 1, because one remaining 1s electron screens the nucleus. Moseley (1913) found √f ∝ (Z − 1) for Kα lines, establishing that atomic number, not atomic mass, orders the elements, and predicting missing ones.
X: Moseley's law: Kα energy of copper (Z = 29)?
> E ≈ 10.2 eV × (Z − 1)^{2} = 10.2 × 28^{2} = 8.0 keV (measured 8.05 keV)
K: Screening and penetration make an electron's binding depend on l, and exchange makes it depend on the total spin.
!: Electrons in multi-electron atoms aren't independent; correlation effects matter for accurate energies.
T: Effective nuclear charge | The net positive charge an electron experiences after shielding by other electrons
T: Exchange energy | The energy difference from the symmetry of the wavefunction under swapping identical electrons
T: Moseley's law | The square root of a Kα frequency is proportional to Z − 1
SUM: Z_{eff} = Z − σ explains size and ionisation trends.
SUM: Exchange lowers helium's triplet states below its singlets.
SUM: Kα energies ≈ 10.2 eV × (Z − 1)^{2}, ordering elements by atomic number.
EV: established | Screening and exchange in the central-field picture explain periodic trends, helium's spectrum and Moseley's X-ray law
SRC: OpenStax, University Physics Volume 3, section 8.4 "The Exclusion Principle and the Periodic Table" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-4-the-exclusion-principle-and-the-periodic-table
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
Q: What is effective nuclear charge? | The net positive charge an electron experiences after shielding by other electrons.
Q: What did Moseley's law establish? | Atomic number is the true ordering principle of elements.
M1@1: Across a period, atomic radius generally: | Decreases | Increases | Stays the same | Doubles | Z rises while added electrons in the same shell screen each other poorly, so Z_{eff} rises and pulls the outer shell in.
M2@2: In helium, triplet states lie lower than singlets because: | Exchange keeps the electrons apart, reducing repulsion | Triplet states contain an extra electron | Spin–orbit coupling is strongest in triplets | The nucleus attracts triplet electrons magnetically | Parallel spins need an antisymmetric spatial wavefunction, which vanishes when the electrons coincide, so their mutual repulsion is smaller.
NUM2@3: Using E ≈ 10.2 eV × (Z − 1)^{2}, estimate the Kα energy of iron (Z = 26) in keV. | 6.4 | 0.1 | keV | E ≈ 10.2 × 25^{2} = 6375 eV ≈ 6.4 keV (measured 6.40 keV).
TF1@1: An outer electron in sodium feels the full nuclear charge of +11e. | false | The ten inner electrons screen most of the nucleus, so the 3s electron feels a Z_{eff} of only about 2.5.
M3@1,3: Why does the first ionisation energy fall from neon (21.6 eV) to sodium (5.1 eV)? | Sodium's outer electron is in a new, well-screened shell further out | Sodium has a smaller nuclear charge than neon | Neon's outer electrons are in s orbitals | Sodium's 3s electron feels stronger nuclear attraction | The 3s electron is in the n = 3 shell, screened by ten inner electrons, so Z_{eff} is small and it is weakly bound.
SA3@1,2: Explain, using screening and exchange, why multi-electron atoms cannot be described by hydrogen's energy formula. | In hydrogen the energy depends only on n. With several electrons, each outer electron is partly shielded by inner ones, so it feels Z_{eff} = Z − σ rather than Z, and orbitals that penetrate the inner shells (s more than p, p more than d) feel more charge and are lower in energy, so energies depend on n and l. In addition, identical electrons must have antisymmetric wavefunctions, so states of the same configuration with different total spin have different repulsion energies (exchange), as in helium's singlets and triplets. | Hydrogen energies depend on n only ; Screening reduces effective charge ; Penetration makes energy depend on l ; Antisymmetry of identical electrons ; Exchange splits spin states, helium example

## Electron spin
S: The electron's intrinsic spin gives it a magnetic moment and two possible orientations in a field. Spin explains doublet spectral lines, atomic magnetism, chemical bonding rules and the structure of the periodic table.
O: State the electron's spin quantum numbers and magnetic moment
O: Describe the experimental evidence for electron spin
O: Calculate electron spin resonance frequencies
PRE: Spin
LV: Year 2 · Application
H: Properties
E: s = ½; S_{z} = ±ħ/2
E: μ_{s} = −g_{s}μ_{B}S/ħ, g_{s} ≈ 2.0023
- The anomaly a = (g − 2)/2 ≈ α/(2π) + … is predicted by QED; theory and experiment agree to about one part in 10^{12} in g, among the most precise agreements in science.
H: Evidence
- Stern–Gerlach: a beam of silver atoms splits into two.
- Doublet structure of alkali lines (sodium D lines at 589.0 and 589.6 nm).
- The anomalous Zeeman effect.
- Electron spin resonance (ESR): flipping spins with microwaves, about 28 GHz per tesla.
H: Spin in technology
P: Spintronics uses electron spin as well as charge. Giant magnetoresistance (Nobel 2007) made hard-disk read heads sensitive enough for very dense drives; MRAM stores bits in magnetic tunnel junctions. Electron spins in silicon and in diamond (NV centres) serve as qubits and nanoscale magnetometers.
X: ESR frequency for a free electron in 0.35 T?
> f = gμ_{B}B/h = 2.0023 × 9.27 × 10^{-24} × 0.35/(6.63 × 10^{-34})
> ≈ 9.8 GHz (X-band ESR)
K: Spin is an intrinsic angular momentum of ħ/2 with a magnetic moment of about one Bohr magneton, giving two states in a field.
!: The electron's g-factor is almost exactly 2, not 1 as for orbital motion; Dirac's relativistic theory explains why.
T: Spin | Intrinsic angular momentum of a particle, not due to motion through space; s = ½ for the electron
T: Bohr magneton | μ_{B} = eħ/(2m_{e}) = 9.27 × 10^{-24} J T^{-1}, the natural unit of electron magnetic moment
T: g-factor | The ratio of a magnetic moment to the value expected from angular momentum in units of μ_{B}
SUM: The electron has s = ½, S_{z} = ±ħ/2 and g ≈ 2.0023.
SUM: Stern–Gerlach splitting, alkali doublets and ESR are direct evidence.
SUM: ESR frequency f = gμ_{B}B/h ≈ 28 GHz T^{-1}.
EV: established | The electron has intrinsic spin ½ with g ≈ 2.0023, measured and predicted by QED to about one part in 10^{12}
SRC: OpenStax, University Physics Volume 3, section 8.3 "Electron Spin" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-3-electron-spin
SRC: OpenStax, College Physics 2e, section 30.8 "Quantum Numbers and Rules" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-8-quantum-numbers-and-rules
Q: What is the electron's spin g-factor? | About 2.0023.
Q: What is giant magnetoresistance? | A large change in electrical resistance of magnetic multilayers depending on the relative alignment of their magnetisations.
M1@2: The sodium D doublet arises from: | Spin–orbit splitting of the 3p level | Two isotopes of sodium in the lamp | Hyperfine splitting of the 3s level | The Stark effect of the lamp's field | The 3p level splits into 3p_{1/2} and 3p_{3/2} because of the electron's spin, giving lines at 589.6 and 589.0 nm.
M2@3: ESR flips electron spins using: | Microwaves | X-rays | Mains-frequency radio waves | Visible light | At about 28 GHz per tesla, fields of a fraction of a tesla give resonances near 10 GHz, in the microwave band.
NUM2@3: What is the ESR frequency, in GHz, of a free electron (g = 2.00) in a 1.00 T field? (μ_{B} = 9.27 × 10^{-24} J T^{-1}, h = 6.63 × 10^{-34} J s) | 28.0 | 0.3 | GHz | f = gμ_{B}B/h = 2.00 × 9.27 × 10^{-24} × 1.00/(6.63 × 10^{-34}) = 2.80 × 10^{10} Hz.
TF1@1: An electron's spin component along any chosen axis can only be +ħ/2 or −ħ/2. | true | With s = ½ there are 2s + 1 = 2 values of m_{s}, so a measurement along any axis gives one of two results.
M3@2: In the Stern–Gerlach experiment, silver atoms were used. Why does the beam split into exactly two? | The single unpaired 5s electron has zero orbital angular momentum, so only its spin matters | Silver has two stable isotopes | The magnet has two poles | Silver atoms have l = 1 orbital angular momentum | Orbital momentum would give an odd number of beams (2l + 1); two beams require a half-integer angular momentum, the electron spin.
SA2@2,3: Describe two pieces of experimental evidence for electron spin and explain what each shows. | In the Stern–Gerlach experiment, silver atoms (with one unpaired s electron and no orbital angular momentum) passing through a non-uniform magnetic field split into two beams; two components means an angular momentum with only two orientations, a half-integer spin with a magnetic moment. The sodium D line is a close doublet because the 3p level splits in two by spin–orbit coupling, which requires the electron to have its own magnetic moment. ESR, absorption of microwaves at f = gμ_{B}B/h, measures g ≈ 2 directly. | Stern–Gerlach two beams ; Two orientations imply half-integer spin ; Alkali doublets from spin–orbit splitting ; Or ESR measuring g ≈ 2 ; Links each observation to a magnetic moment

## Fine structure
S: Fine structure is the small splitting of atomic energy levels caused by relativistic effects and the coupling between an electron's spin and its orbital motion. It splits spectral lines into closely spaced multiplets.
O: Identify the contributions to fine structure in hydrogen
O: Estimate fine-structure splittings using the fine-structure constant
O: Explain the Lamb shift and why it needed QED
PRE: Spin
LV: Year 3 · Physical reasoning
H: Contributions (hydrogen)
- Relativistic correction to the kinetic energy.
- Spin–orbit coupling.
- Darwin term (for s states).
E: ΔE ≈ α^{2}E_{n}(n/(j + ½) − ¾)/n^{2} :: depends on n and j only
- Scale: α^{2} ≈ 5 × 10^{-5} times the gross energy: about 10^{-4} eV for n = 2.
H: Fine-structure constant
E: α = e^{2}/(4πε_{0}ħc) ≈ 1/137.036
- The dimensionless strength of electromagnetism; measured to about 0.1 parts per billion.
- Quasar spectra and atomic-clock comparisons test whether α varies: no variation found so far (less than ~10^{-17} per year today).
H: Beyond fine structure
P: Dirac's equation predicts fine structure exactly, but gives 2s_{1/2} and 2p_{1/2} the same energy. Lamb and Retherford (1947) found them split by about 1 GHz. This Lamb shift, explained by QED's vacuum fluctuations, launched modern quantum field theory.
X: The fine-structure splitting of hydrogen n = 2 (2p_{1/2} to 2p_{3/2}) is 10.9 GHz. Energy?
> E = hf = 4.14 × 10^{-15} eV s × 1.09 × 10^{10} Hz
> E ≈ 4.5 × 10^{-5} eV
K: Fine structure is about α^{2} times the gross structure; in hydrogen it depends only on n and j.
!: Fine structure isn't caused by the nucleus's spin; that's hyperfine structure, about 1000 times smaller.
T: Fine-structure constant | α = e^{2}/(4πε_{0}ħc) ≈ 1/137, the dimensionless strength of electromagnetism
T: Lamb shift | A small QED splitting between hydrogen's 2s_{1/2} and 2p_{1/2} levels, not predicted by Dirac's equation
SUM: Fine structure comes from relativity, spin–orbit coupling and the Darwin term.
SUM: Its size is ~α^{2} of the level energy; in hydrogen it depends on n and j.
SUM: The Lamb shift showed the need for QED.
EV: established | Hydrogen's fine structure follows the Dirac equation, with QED corrections such as the Lamb shift confirmed to high precision
SRC: OpenStax, University Physics Volume 3, section 8.3 "Electron Spin" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-3-electron-spin
SRC: OpenStax, College Physics 2e, section 30.7 "Patterns in Spectra Reveal More Quantization" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-7-patterns-in-spectra-reveal-more-quantization
Q: What causes fine structure? | Relativistic corrections and spin–orbit coupling.
Q: What is the Lamb shift? | A small QED splitting between 2s_{1/2} and 2p_{1/2} in hydrogen, not predicted by Dirac's equation.
M1@2: The fine-structure constant is about: | 1/137 | 1/1836 | 137 | 1/2 | α = e^{2}/(4πε_{0}ħc) ≈ 1/137.036; 1/1836 is the electron-to-proton mass ratio.
M2@1: In hydrogen, fine-structure energies depend on: | n and j | n only | l only | m_{l} only | Dirac's result depends only on n and j, so 2s_{1/2} and 2p_{1/2} coincide until the Lamb shift is included.
NUM2@2: Estimate the ratio of the fine-structure correction to the gross energy using α^{2}, with α = 1/137. Give the answer × 10^{-5}. | 5.3 | 0.2 | × 10^{-5} | α^{2} = 1/18 769 = 5.3 × 10^{-5}: fine structure is about 50 parts per million of the level energy.
TF1@3: Dirac's equation predicts that hydrogen's 2s_{1/2} and 2p_{1/2} levels have exactly the same energy. | true | They have the same n and j; the observed 1 GHz Lamb shift between them comes from QED effects beyond Dirac's theory.
M3@2,3: Fine-structure splittings grow steeply with nuclear charge. Roughly how does the fine-structure energy of a hydrogen-like ion scale with Z? | As Z^{4} | As Z | As Z^{2} | It is independent of Z | The gross energy scales as Z^{2} and the relative correction as (Zα)^{2}, so the splitting goes as Z^{4}.
SA3@1,3: Explain why the Lamb shift was important for physics. | Dirac's relativistic equation includes spin–orbit coupling and relativistic corrections and predicts that states with the same n and j, such as 2s_{1/2} and 2p_{1/2} in hydrogen, are degenerate. In 1947 Lamb and Retherford used microwaves to show that 2s_{1/2} lies about 1 GHz above 2p_{1/2}. The shift could not be explained by any single-particle theory; it comes from the electron's interaction with vacuum fluctuations of the electromagnetic field. Calculating it forced the development of renormalised quantum electrodynamics, the first successful quantum field theory. | Dirac predicts degeneracy of same n and j ; Lamb–Retherford measured ~1 GHz splitting ; Not explained by Dirac theory ; Caused by vacuum fluctuations ; Led to renormalised QED

## Hyperfine structure
S: Hyperfine structure is a tiny splitting of atomic levels from the interaction between the electrons and the nucleus's magnetic moment (and electric quadrupole). It's behind the 21 cm hydrogen line and the caesium atomic clock.
O: Explain the origin of hyperfine structure and its size relative to fine structure
O: Find the allowed values of F from I and J
O: Describe the 21 cm line and other uses of hyperfine transitions
PRE: Fine structure
LV: Year 3 · Application
H: Origin
E: ΔE ∝ A I·J; F = I + J :: A is the hyperfine constant
- I: nuclear spin; J: electronic angular momentum; F: total atomic angular momentum, from |I − J| to I + J.
- Nuclear magnetic moments are ~1000 times smaller than electrons' (μ_{N} against μ_{B}): splittings are μeV, at microwave frequencies.
H: Key examples
- **Hydrogen 21 cm line**: F = 1 → 0 at 1420.405 751 768 MHz; spontaneous lifetime ~10 million years, but abundant hydrogen makes it bright; it maps galactic rotation and spiral arms.
- **Caesium-133**: the ground-state splitting, exactly 9 192 631 770 Hz, defines the second.
- **Rubidium**: compact atomic clocks for satellites and telecoms.
H: Uses
P: Hyperfine structure measures nuclear spins and moments. Hydrogen masers (stable to about 10^{-15}) time radio-telescope arrays in VLBI. Hyperfine levels of trapped ions and atoms are used as qubits.
X: Energy of the 21 cm hydrogen transition?
> E = hf = 6.63 × 10^{-34} × 1.42 × 10^{9} = 9.4 × 10^{-25} J
> ≈ 5.9 μeV
K: Hyperfine splittings come from the nuclear magnetic moment and are ~10^{3} times smaller than fine structure, at microwave frequencies.
!: Hyperfine transitions make good clocks because they are extremely narrow and stable, not because they are energetic.
T: Nuclear spin (I) | The total angular momentum quantum number of a nucleus
T: Total angular momentum F | The vector sum of nuclear spin I and electronic angular momentum J
SUM: Hyperfine structure couples I and J into F; splittings are μeV.
SUM: The hydrogen 21 cm line (1420 MHz) maps neutral hydrogen in galaxies.
SUM: Caesium-133's hyperfine frequency defines the SI second.
EV: established | Hyperfine splittings arise from the interaction of electrons with nuclear moments; hydrogen's is known to 13 significant figures
SRC: OpenStax, University Physics Volume 3, section 8.3 "Electron Spin" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-3-electron-spin
SRC: OpenStax, University Physics Volume 3, section 8.2 "Orbital Magnetic Dipole Moment of the Electron" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-2-orbital-magnetic-dipole-moment-of-the-electron
Q: What causes hyperfine structure? | Interaction of the electrons' magnetic field with the nucleus's magnetic moment.
Q: Why is the 21 cm line important in astronomy? | It traces neutral hydrogen, mapping galaxies' structure and rotation.
M1@3: The second is defined by a hyperfine transition in: | Caesium-133 | Hydrogen-1 | Rubidium-87 | Strontium-87 | Since 1967 the second has been defined by the caesium-133 ground-state hyperfine frequency, fixed at 9 192 631 770 Hz.
M2@1: Hyperfine splittings are typically in the: | Microwave range | X-ray range | Visible range | Gamma-ray range | Energies of μeV correspond to frequencies of MHz to GHz: 21 cm (1.4 GHz) and 9.2 GHz are typical.
NUM2@3: What is the wavelength, in cm, of radiation at 1420 MHz? | 21.1 | 0.2 | cm | λ = c/f = 3.00 × 10^{8}/1.420 × 10^{9} = 0.211 m.
TF1@2: In hydrogen's ground state (I = ½, J = ½), F can be 0 or 1. | true | F runs from |I − J| = 0 to I + J = 1 in integer steps, giving the two hyperfine levels of the 21 cm line.
M3@1,2: Which statement best compares fine and hyperfine structure? | Hyperfine is about 1000 times smaller, because nuclear moments are about 1000 times smaller | Hyperfine is larger, because nuclei carry more charge | They are equal, both coming from electron spin | Hyperfine is smaller only because nuclei are far from the electrons | Nuclear magnetons are smaller than Bohr magnetons by m_{e}/m_{p} ≈ 1/1836, so hyperfine splittings are roughly 10^{-3} of fine structure.
SA2@1,3: Explain how a transition with a 10 million year lifetime can be one of the brightest features of the radio sky. | The 21 cm line comes from the hyperfine flip F = 1 → 0 in ground-state hydrogen, a magnetic dipole transition with a tiny rate of about 3 × 10^{-15} s^{-1}. But interstellar space holds enormous numbers of hydrogen atoms, kept in the upper level by collisions, so the total emission is large. The line is very narrow, its frequency is precisely known, and radio waves pass through dust, so Doppler shifts of the line map the motion and distribution of hydrogen across galaxies. | Identifies the hyperfine F = 1 to 0 transition ; Very low rate per atom ; Huge numbers of atoms, collisionally excited ; Narrow line with known frequency ; Doppler shifts map galactic rotation and dust is transparent

## Spin-orbit coupling
S: Spin–orbit coupling is the interaction between an electron's spin magnetic moment and the magnetic field it feels from its orbital motion. It splits atomic levels, drives fine structure and is crucial in modern materials physics.
O: Explain the physical origin of spin–orbit coupling
O: Evaluate L·S for given L, S and J
O: Explain how spin–orbit coupling scales with Z and matters in materials
PRE: Addition of angular momentum
LV: Year 3 · Physical reasoning
H: Physical picture
P: In the electron's rest frame the nucleus orbits it, creating a magnetic field proportional to L. The electron's spin moment has energy in that field. A relativistic correction (Thomas precession) halves the naive result.
E: H_{SO} = (1/(2m^{2}c^{2}))(1/r)(dV/dr)L·S
E: L·S = ½[J(J + 1) − L(L + 1) − S(S + 1)]ħ^{2}
H: Scaling
- Grows steeply with nuclear charge (~Z^{4} for hydrogen-like ions): small in light atoms, large in heavy ones.
- In heavy atoms LS (Russell–Saunders) coupling gives way to jj coupling.
H: In materials
P: Spin–orbit coupling in solids underlies topological insulators (conducting surfaces protected by symmetry), the spin Hall effect, Rashba splitting at semiconductor interfaces and magnetic anisotropy (which way a magnet prefers to point).
X: Sodium's 3p splitting is 2.1 meV (0.6 nm between the D lines). How does caesium compare?
> Caesium (Z = 55) 6p splitting ~69 meV: D1 894 nm, D2 852 nm, 42 nm apart
> Heavier atoms have much stronger spin–orbit coupling
K: Spin–orbit coupling makes energy depend on J, splitting each l > 0 level into j = l ± ½.
!: Spin–orbit coupling is a relativistic magnetic effect, not an electrostatic one; it vanishes for s states (L = 0).
T: Spin–orbit coupling | The interaction between an electron's spin and the magnetic field from its orbital motion relative to the nucleus
T: Thomas precession | A relativistic kinematic effect that halves the naive spin–orbit energy
T: jj coupling | The scheme in heavy atoms where each electron's l and s couple to j before the j values combine
SUM: Spin–orbit energy ∝ L·S, evaluated from J, L and S.
SUM: It splits l > 0 levels and scales steeply with Z.
SUM: In solids it underlies topological and spintronic effects.
EV: established | Spin–orbit coupling explains doublet and multiplet splittings in atomic spectra and their rapid growth with nuclear charge
SRC: OpenStax, University Physics Volume 3, section 8.3 "Electron Spin" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-3-electron-spin
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
Q: What is spin–orbit coupling? | The interaction between an electron's spin and the magnetic field from its orbital motion relative to the nucleus.
Q: Why is spin–orbit coupling stronger in heavy atoms? | The fields near a highly charged nucleus are much stronger; it scales steeply with Z.
M1@1: Spin–orbit coupling is zero for: | s states (l = 0) | p states | d states | All states | With no orbital angular momentum there is no orbital magnetic field to act on the spin, so L·S = 0.
M2@3: Topological insulators rely heavily on: | Spin–orbit coupling | Gravitational effects | Nuclear spin | Superconducting pairing | Strong spin–orbit coupling inverts the bands of materials such as Bi_{2}Se_{3}, producing protected conducting surface states.
NUM3@2: For a single p electron (L = 1, S = ½) in the J = 3/2 level, find L·S in units of ħ^{2}. | 0.5 | 0.01 | ħ^{2} | L·S = ½[(3/2)(5/2) − 1(2) − (1/2)(3/2)] = ½[3.75 − 2 − 0.75] = 0.5.
TF2@2: A p level split by spin–orbit coupling gives j = 1/2 and j = 3/2 sublevels. | true | j = l ± s = 1 ± ½ gives 1/2 and 3/2, the origin of the alkali D1 and D2 lines.
M3@1,3: Why is the spin–orbit interaction usually described as relativistic? | It comes from the magnetic field the electron sees in its own moving frame | It needs electrons to travel faster than light | It is caused by the nucleus's mass increase | It only occurs in particle accelerators | A charge moving through the nucleus's electric field experiences a magnetic field in its rest frame: a relativistic transformation of fields, with Thomas precession as a further correction.
SA3@1,3: Explain why the sodium D lines are 0.6 nm apart but the caesium D lines are 42 nm apart. | Both lines come from the outer electron's p level split by spin–orbit coupling into j = 1/2 and j = 3/2. The splitting depends on the gradient of the potential the electron feels, (1/r)dV/dr, which is dominated by the region close to the nucleus. The caesium 6p electron penetrates near a nucleus of charge 55, where the field is far stronger than near sodium's charge of 11, and spin–orbit coupling grows steeply with Z (roughly Z^{4} for unscreened charge). So caesium's splitting (~69 meV) is about 30 times sodium's (2.1 meV). | Both are spin–orbit doublets of a p level ; j = 1/2 and 3/2 ; Depends on field near nucleus ; Steep growth with Z ; Quantitative comparison of splittings

## Zeeman effect
S: In a magnetic field, atomic energy levels split according to their magnetic quantum number, so spectral lines split into several components. The Zeeman effect measures magnetic fields from the laboratory to the Sun's surface.
O: Calculate normal Zeeman splittings in energy and wavelength
O: Use the Landé g-factor for the anomalous Zeeman effect
O: Describe applications of Zeeman splitting
PRE: Magnetic dipoles
LV: Year 2 · Application
H: Normal Zeeman effect
E: ΔE = m_{l}μ_{B}B
- Seen for states with total spin zero; a line splits into three (Δm = 0, ±1), spaced by μ_{B}B.
H: Anomalous Zeeman effect
E: ΔE = g_{J}m_{J}μ_{B}B
E: g_{J} = 1 + [J(J + 1) + S(S + 1) − L(L + 1)]/(2J(J + 1)) :: Landé g-factor
- Explained only after electron spin was understood.
- In strong fields, L and S decouple: the Paschen–Back effect.
H: Applications
- Measuring sunspot fields (~0.1–0.4 T; Hale, 1908) and stellar magnetic fields.
- Zeeman slowers and magneto-optical traps for cold atoms.
- Optically pumped magnetometers.
- Polarisation: viewed along the field, the σ^{±} components are circularly polarised.
X: Normal Zeeman splitting of a 500 nm line in 1 T, as a wavelength shift?
> ΔE = μ_{B}B = 5.79 × 10^{-5} eV
> Δλ = λ^{2}ΔE/(hc) = (500 nm)^{2} × 5.79 × 10^{-5} eV/(1240 eV nm) ≈ 0.012 nm
K: Zeeman shifts are proportional to the field, ΔE = g m μ_{B}B, so measured splittings give the field strength.
!: The anomalous Zeeman effect is actually the more common one; the "normal" effect needs total spin zero.
T: Zeeman effect | The splitting of spectral lines in a magnetic field
T: Landé g-factor | The factor g_{J} relating a level's magnetic moment to its total angular momentum J
SUM: Normal Zeeman: three components spaced μ_{B}B (5.8 × 10^{-5} eV per tesla).
SUM: Anomalous Zeeman: ΔE = g_{J}m_{J}μ_{B}B with the Landé factor.
SUM: Zeeman splitting measures astrophysical fields and enables atom trapping.
EV: established | Zeeman splittings follow ΔE = g_{J}m_{J}μ_{B}B and are used routinely to measure solar and stellar magnetic fields
SRC: OpenStax, University Physics Volume 3, section 8.2 "Orbital Magnetic Dipole Moment of the Electron" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-2-orbital-magnetic-dipole-moment-of-the-electron
SRC: OpenStax, College Physics 2e, section 30.7 "Patterns in Spectra Reveal More Quantization" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-7-patterns-in-spectra-reveal-more-quantization
Q: What is the Landé g-factor? | The factor relating a level's magnetic moment to its total angular momentum J.
Q: How did Hale measure sunspot magnetic fields? | From the Zeeman splitting of spectral lines.
M1@1: The normal Zeeman effect splits a line into: | 3 components | 2 components | 5 components | Many components | Selection rules allow Δm_{l} = 0, ±1, and in the normal effect all transitions with the same Δm coincide, giving three lines.
M2@3: Zeeman splitting is proportional to: | Magnetic field strength | The square of the wavelength only | Gas temperature | Applied electric field | ΔE = g m μ_{B}B is linear in B (until the Paschen–Back regime), which is why it measures fields.
NUM2@1: What is the normal Zeeman energy spacing, in units of 10^{-5} eV, in a 0.40 T sunspot field? (μ_{B} = 5.79 × 10^{-5} eV T^{-1}) | 2.32 | 0.03 | × 10^{-5} eV | ΔE = μ_{B}B = 5.79 × 10^{-5} × 0.40 = 2.32 × 10^{-5} eV.
TF1@2: A level with J = 0 is not split by a magnetic field. | true | J = 0 has only m_{J} = 0, so there is a single sublevel and no Zeeman shift.
M3@2: What is the Landé g-factor of a ^{2}P_{3/2} level (L = 1, S = ½, J = 3/2)? | 4/3 | 2/3 | 1 | 2 | g = 1 + [3.75 + 0.75 − 2]/(2 × 3.75) = 1 + 2.5/7.5 = 4/3.
SA2@1,3: Explain how the Zeeman effect can be used to measure the magnetic field in a sunspot. | In a magnetic field each atomic level splits into sublevels shifted by g_{J}m_{J}μ_{B}B, so a spectral line splits into components separated by an amount proportional to B. Observing a known line with a high-resolution spectrograph, the separation Δλ = λ^{2}ΔE/(hc) is measured, the known g-factor gives ΔE per tesla, and B follows. The circular polarisation of the σ components also shows the field direction. Hale used this in 1908 to find fields of a few tenths of a tesla in sunspots. | Levels split in proportion to B ; Line splits into components ; Measure wavelength separation ; Convert using g-factor and μ_{B} to find B ; Polarisation gives direction or Hale example

## Stark effect
S: The Stark effect is the shifting and splitting of atomic and molecular energy levels in an electric field. It's usually much smaller than the Zeeman effect but matters in plasmas, semiconductors and precision measurements.
O: Distinguish the linear and quadratic Stark effects and explain when each occurs
O: Calculate quadratic Stark shifts from the polarisability
O: Describe situations where Stark shifts and light shifts matter
PRE: Perturbation theory
LV: Year 3 · Application
H: Linear and quadratic Stark effects
- **Linear**: degenerate states of opposite parity mix (hydrogen n = 2): ΔE ∝ E; the n = 2 level splits into three.
- **Quadratic**: non-degenerate states: ΔE = −½αE^{2}, where α is the polarisability.
- Most atoms show only the quadratic effect, because a non-degenerate state has no permanent dipole moment.
H: Where it matters
- **Stark broadening** of lines in plasmas measures electron densities (stellar atmospheres, fusion plasmas).
- **Rydberg atoms**: enormous polarisability; field ionisation detects them.
- **Quantum-confined Stark effect** in semiconductor quantum wells: electro-absorption modulators in optical communications.
- **AC Stark shift (light shift)**: laser fields shift levels; used in optical traps, and cancelled in atomic clocks at a "magic wavelength".
H: History
P: Johannes Stark (1913) observed the splitting of hydrogen's Balmer lines; Schrödinger's quantum mechanics explained it in 1926, an early triumph of the theory.
X: Ground-state helium has polarisability α ≈ 2.3 × 10^{-41} C m^{2} V^{-1}. Shift in 10^{7} V m^{-1}?
> ΔE = −½ × 2.3 × 10^{-41} × (10^{7})^{2} = −1.2 × 10^{-27} J
> ≈ −7 neV: tiny even in a very strong field
K: A linear Stark effect needs degenerate states of opposite parity; otherwise shifts are quadratic in the field and small.
!: Hydrogen shows a linear Stark effect only because of its special degeneracy between states of different l.
T: Stark effect | The shift and splitting of energy levels in an electric field
T: Polarisability | The constant α relating the induced dipole moment to the applied field, p = αE
T: Light shift | The AC Stark shift of levels caused by the oscillating field of a laser
SUM: Linear Stark effect: degenerate opposite-parity states (hydrogen).
SUM: Quadratic Stark effect: ΔE = −½αE^{2}, usually tiny.
SUM: Stark broadening, quantum wells and light shifts make it practically important.
EV: established | Stark shifts follow from perturbation theory: linear for degenerate hydrogen levels, quadratic for non-degenerate states
SRC: OpenStax, University Physics Volume 3, section 8.1 "The Hydrogen Atom" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-1-the-hydrogen-atom
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
Q: Why does hydrogen show a linear Stark effect? | Its degenerate states of opposite parity mix in the field.
Q: What is an AC Stark shift? | The shift of atomic levels caused by an oscillating (laser) electric field.
M1@1: Most atoms show a Stark shift that is: | Quadratic in field | Linear in field | Cubic in field | Independent of field | Non-degenerate states have no permanent dipole, so the first-order shift vanishes and the second-order shift goes as E^{2}.
M2@3: Stark broadening of plasma lines measures: | Electron density | The magnetic field only | Nuclear spin | Isotope ratios | The microfields from nearby charged particles scale with their density, so the line width gives the electron density.
NUM2@2: An atom has polarisability 4.0 × 10^{-40} C m^{2} V^{-1}. What is the magnitude of its quadratic Stark shift, in units of 10^{-26} J, in a field of 1.0 × 10^{7} V m^{-1}? | 2.0 | 0.05 | × 10^{-26} J | ΔE = ½αE^{2} = 0.5 × 4.0 × 10^{-40} × 10^{14} = 2.0 × 10^{-26} J.
TF1@1: Doubling the electric field quadruples a quadratic Stark shift. | true | ΔE = −½αE^{2}, so the shift scales as the square of the field.
M3@1,3: Why do optical lattice clocks use a "magic wavelength" for the trapping laser? | The light shifts both clock levels equally, so the clock frequency is unchanged | It makes the lattice laser invisible to the atoms | It cancels the Zeeman effect | It is the only wavelength that can trap neutral atoms | The trap's AC Stark shift would change the clock frequency; at the magic wavelength upper and lower levels shift by the same amount.
SA3@1,2: Explain why hydrogen's n = 2 level shows a linear Stark effect while the ground state of helium shows only a quadratic one. | A first-order (linear) shift needs a permanent dipole moment. In hydrogen, 2s and 2p have the same energy but opposite parity, so a field mixes them into states with a permanent dipole, shifting energy in proportion to E and splitting n = 2 into three. Helium's ground state is non-degenerate and of definite parity, so it has no permanent dipole; the field only induces a dipole p = αE, giving a second-order shift −½αE^{2}, which is tiny (about 7 neV at 10^{7} V m^{-1}). | Linear shift needs a permanent dipole ; Hydrogen 2s and 2p degenerate with opposite parity ; Mixing gives shift ∝ E ; Helium ground state non-degenerate, no permanent dipole ; Induced dipole gives −½αE^{2}

## Atomic spectra
S: Every element emits and absorbs light at its own set of wavelengths. Atomic spectra fingerprint elements in flames, stars and galaxies, and their patterns revealed the quantum structure of atoms.
O: Distinguish emission, absorption and continuous spectra and state Kirchhoff's laws
O: Use the Rydberg formula for hydrogen's series
O: Use spectral lines to identify elements and measure redshifts
PRE: Atomic energy levels
LV: A level · Foundation
H: Types
- **Emission**: hot, low-density gas emits bright lines.
- **Absorption**: cooler gas in front of a continuous source removes lines (Fraunhofer lines in sunlight).
- **Continuous**: hot, dense matter (close to a blackbody).
- Kirchhoff's laws (1859) summarise these.
H: Hydrogen series
E: 1/λ = R(1/n_{f}^{2} − 1/n_{i}^{2}) :: R = 1.097 × 10^{7} m^{-1}
- Lyman (n_{f} = 1, ultraviolet); Balmer (n_{f} = 2, visible): Hα 656, Hβ 486, Hγ 434, Hδ 410 nm; Paschen (n_{f} = 3, infrared).
H: Uses
- Chemical analysis: flame tests, atomic absorption and emission spectroscopy.
- Astronomy: compositions, temperatures, redshifts and magnetic fields of stars; helium was found in the Sun's spectrum (1868) before it was found on Earth.
- Plasma diagnostics; lamp colours (sodium yellow, mercury blue-green).
X: Hα (656 nm) is observed at 984 nm in a quasar's spectrum. Redshift?
> z = (λ_{obs} − λ_{emit})/λ_{emit} = (984 − 656)/656
> z = 0.50
K: Each line is one transition between two levels, so a spectrum is a fingerprint of the element's energy levels.
!: Absorption and emission lines of the same transition occur at the same wavelength; whether they appear bright or dark depends on the gas's temperature relative to the background.
T: Line spectrum | A spectrum of discrete wavelengths from transitions between atomic energy levels
T: Fraunhofer lines | Dark absorption lines in the solar spectrum from cooler gas in the Sun's outer layers
T: Redshift z | The fractional increase in wavelength, (λ_{obs} − λ_{emit})/λ_{emit}
SUM: Hot thin gas gives emission lines; cool gas in front of a continuum gives absorption lines.
SUM: Hydrogen lines obey 1/λ = R(1/n_{f}^{2} − 1/n_{i}^{2}).
SUM: Line patterns identify elements and give redshifts.
EV: established | Each element has a unique line spectrum set by its energy levels, the basis of spectroscopic chemical analysis and astronomy
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
SRC: AQA, A-level Physics specification (7408), section 3.2.2.3 Energy levels and photon emission | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Kirchhoff's laws of spectroscopy. | Hot dense objects give continuous spectra; hot thin gas gives emission lines; cool gas in front of a continuous source gives absorption lines.
Q: Where was helium first discovered? | In the Sun's spectrum, during an 1868 eclipse.
M1@1: Fraunhofer lines in sunlight are: | Absorption lines | Emission lines | A continuous spectrum | Instrument artefacts | Cooler gas in the Sun's outer layers absorbs specific wavelengths from the hotter continuum below.
M2@2: The Balmer series ends on level: | n = 2 | n = 1 | n = 3 | n = ∞ | Balmer lines are transitions down to n = 2, which places them in the visible; transitions to n = 1 form the ultraviolet Lyman series.
NUM2@2: Use 1/λ = R(1/4 − 1/16), with R = 1.097 × 10^{7} m^{-1}, to find the Hβ wavelength in nm. | 486 | 1 | nm | 1/λ = 1.097 × 10^{7} × 0.1875 = 2.057 × 10^{6} m^{-1}, so λ = 486 nm.
TF1@1: A cool gas absorbs light at the same wavelengths at which it would emit when hot. | true | Both are transitions between the same pair of levels, so emission and absorption lines coincide.
M3@3: A galaxy's calcium K line (393.4 nm) is observed at 397.3 nm. What is its redshift? | 0.0099 | 0.99 | 0.039 | −0.0099 | z = (397.3 − 393.4)/393.4 = 3.9/393.4 = 0.0099, a recession speed of about 3000 km s^{-1}.
SA2@1,3: Explain how astronomers can tell what a distant star is made of and how fast it is moving away. | Light from the star's hot interior passes through cooler outer gas, which absorbs at wavelengths set by its atoms' energy levels, giving dark lines. Each element has a unique pattern of lines, so matching the pattern to laboratory spectra identifies the elements present. If the whole pattern is shifted to longer wavelengths, the star is receding; the redshift z = Δλ/λ gives its speed, v ≈ zc for small z. | Absorption by cooler outer gas ; Lines set by energy levels ; Unique pattern identifies elements ; Shift of whole pattern indicates motion ; Speed from z = Δλ/λ, v ≈ zc

## Selection rules
S: Selection rules state which transitions between atomic states can occur by emitting or absorbing a photon. They follow from conservation of angular momentum and parity, and explain why some spectral lines are bright, some faint and some missing.
O: State the electric dipole selection rules and justify them from photon angular momentum and parity
O: Decide whether a given transition is allowed
O: Explain what "forbidden" transitions are and where they are observed
PRE: Atomic spectra
LV: Year 2 · Application
H: Electric dipole (E1) rules
E: Δl = ±1; Δm_{l} = 0, ±1; ΔS = 0; ΔJ = 0, ±1 (not J = 0 → 0)
- The photon carries one unit of angular momentum and odd parity.
- So the atom's parity must change.
H: Forbidden transitions
- Not truly forbidden, just much slower: magnetic dipole (M1), electric quadrupole (E2) or two-photon decays.
- Lifetimes from milliseconds to years, against nanoseconds for allowed lines.
- Seen in low-density astrophysical gas where collisions don't de-excite atoms first: the green [O III] lines of nebulae, once attributed to a new element, "nebulium".
- 2s → 1s in hydrogen decays by two photons, lifetime 0.12 s.
H: Uses
P: Ultra-narrow forbidden transitions make the best clocks: strontium's 698 nm line (excited-state lifetime ~100 s, natural linewidth ~mHz) in optical lattice clocks, and an octupole transition in ytterbium ions.
X: Can hydrogen go 3d → 1s by electric dipole emission?
> Δl = −2: forbidden for E1
> It cascades 3d → 2p → 1s instead, each step with Δl = −1
K: Allowed (E1) transitions change l by exactly one and change parity; everything else is orders of magnitude slower.
!: "Forbidden" means suppressed by many orders of magnitude, not impossible.
T: Selection rule | A condition on quantum numbers that must hold for a transition to occur at a significant rate
T: Forbidden transition | A transition not allowed as electric dipole, occurring only by much slower processes
T: Parity | The behaviour of a wavefunction under inversion r → −r; (−1)^{l} for an orbital
SUM: E1 rules: Δl = ±1, Δm_{l} = 0, ±1, ΔS = 0, ΔJ = 0, ±1 (not 0 → 0).
SUM: They follow from the photon's spin 1 and odd parity.
SUM: Forbidden lines are slow and narrow: seen in nebulae, used in clocks.
EV: established | Electric dipole selection rules follow from angular momentum and parity conservation and match the observed pattern of atomic lines
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
SRC: OpenStax, College Physics 2e, section 30.8 "Quantum Numbers and Rules" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-8-quantum-numbers-and-rules
Q: What is the Δl selection rule for electric dipole transitions? | Δl = ±1.
Q: Why are forbidden lines seen in nebulae but not in the lab? | Low densities let long-lived states decay radiatively before collisions de-excite them.
M1@2: Which transition is electric-dipole allowed? | 2p → 1s | 2s → 1s | 3d → 1s | 3s → 2s | Only 2p → 1s has Δl = −1; the others have Δl = 0 or −2 and so are forbidden for E1.
M2@3: Forbidden transitions have: | Long lifetimes and narrow lines | Short lifetimes and broad lines | Very large emission rates | No emission under any conditions | Their tiny transition rates mean long-lived upper states and, since Δf = 1/(2πτ), very narrow natural linewidths.
TF1@1: An electric dipole transition must change the parity of the atomic state. | true | The photon carries odd parity, so the initial and final atomic states must have opposite parity, which is why Δl = ±1.
MS2@2: Which of these hydrogen transitions are electric-dipole allowed? | 3p → 1s ; 3s → 2p ; 4d → 2p | 3d → 2s ; 4f → 2p | Allowed transitions have Δl = ±1: p → s, s → p and d → p qualify; d → s and f → p have Δl = 2.
M3@1,3: A J = 0 → J = 0 transition is strictly forbidden for single-photon emission. Why? | A photon must carry away at least one unit of angular momentum | Both states have the same energy | Parity cannot change between them | The electron would have to leave the atom | A real photon has spin 1 and no J = 0 state; with J = 0 at both ends, angular momentum can't be conserved by one photon.
SA3@1,3: Explain why the 2s state of hydrogen lives for about 0.12 s while the 2p state lives for only about 1.6 ns. | Both lie at the same energy above 1s. The 2p → 1s transition has Δl = −1 and changes parity, so it is electric-dipole allowed and fast. The 2s → 1s transition has Δl = 0 and no parity change, so it is forbidden for single-photon electric dipole emission; the photon's angular momentum and odd parity can't be supplied. 2s must decay by a much slower process, mainly emission of two photons, giving a lifetime about 10^{8} times longer: the state is metastable. | 2p → 1s allowed, Δl = −1 ; 2s → 1s has Δl = 0 ; Parity and angular momentum argument ; Decays by two-photon emission ; Lifetime ratio or metastability stated

## Spontaneous and stimulated emission
S: An excited atom can emit a photon spontaneously at a random time, or be stimulated to emit by an incoming photon, producing an identical copy. Einstein (1917) showed both must exist, laying the foundation for lasers.
O: Describe absorption, spontaneous emission and stimulated emission using Einstein coefficients
O: Explain why population inversion gives light amplification
O: Explain how the spontaneous rate depends on frequency and environment
PRE: Blackbody radiation
LV: Year 2 · Application
H: Einstein's coefficients
- Absorption rate: B_{12}ρ(f)N_{1}.
- Stimulated emission rate: B_{21}ρ(f)N_{2}.
- Spontaneous emission rate: A_{21}N_{2}.
E: g_{1}B_{12} = g_{2}B_{21}; A_{21} = (8πhf^{3}/c^{3})B_{21}
- Derived by requiring thermal equilibrium to reproduce Planck's law.
H: Spontaneous emission
E: τ = 1/A; A ∝ f^{3}|d_{12}|^{2}
- Allowed visible transitions: τ ~ 10 ns.
- Not truly spontaneous: in QED it is driven by vacuum fluctuations of the field, and it can be enhanced or suppressed in cavities (the Purcell effect).
H: Stimulated emission
P: The stimulated photon has the same frequency, direction, phase and polarisation as the one that triggered it. Normally N_{1} > N_{2}, so absorption wins. With population inversion (N_{2} > N_{1} for equal degeneracies), stimulated emission exceeds absorption and light is amplified: the principle of masers (1954) and lasers (1960).
X: Why are X-ray lasers hard to build?
> A ∝ f^{3}: at X-ray frequencies (~10^{3} times visible) spontaneous emission is ~10^{9} times faster
> Inversion decays almost instantly; free-electron lasers avoid this by not using atomic transitions
K: Stimulated emission copies photons; amplification needs more atoms in the upper level than the lower.
!: Spontaneous emission is random in direction and phase; it's the noise from which a laser builds coherent light, not the lasing process itself.
T: Stimulated emission | Emission of a photon triggered by an incident photon of the same frequency, giving an identical copy
T: Population inversion | A state in which more atoms occupy the upper level of a transition than the lower
T: Einstein A coefficient | The probability per unit time of spontaneous emission from an excited level
SUM: Three processes: absorption, spontaneous emission (rate A), stimulated emission (rate Bρ).
SUM: Einstein's relations follow from thermal equilibrium with Planck radiation.
SUM: Inversion makes stimulated emission win: the basis of lasers.
EV: established | Einstein's A and B coefficients and stimulated emission are confirmed by the operation of every maser and laser
SRC: OpenStax, University Physics Volume 3, section 8.6 "Lasers" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-6-lasers
SRC: OpenStax, College Physics 2e, section 30.5 "Applications of Atomic Excitations and De-Excitations" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-5-applications-of-atomic-excitations-and-de-excitations
Q: Why is stimulated emission necessary to explain Planck's law? | Einstein showed equilibrium with radiation requires both spontaneous and stimulated emission.
Q: How does spontaneous emission rate depend on frequency? | As f^{3}.
M1@1: A stimulated photon is: | Identical to the stimulating photon | Random in phase | Lower in energy | Opposite in direction | It matches the incident photon in frequency, phase, direction and polarisation, which is why laser light is coherent.
M2@3: The Purcell effect shows spontaneous emission can be: | Changed by the surrounding optical environment | Never altered by any surroundings | Converted fully into absorption | Made instantaneous by heating | An optical cavity changes the density of field modes the atom can emit into, enhancing or suppressing the spontaneous rate.
NUM2@3: A transition has a spontaneous lifetime of 10 ns at 600 nm. Assuming the same dipole moment, what would the lifetime be, in ns, at 300 nm? | 1.25 | 0.05 | ns | A ∝ f^{3}; halving λ doubles f, so A rises 8 times and τ falls to 10/8 = 1.25 ns.
TF1@2: In thermal equilibrium at room temperature, more atoms are in the upper level of a visible transition than the lower. | false | The Boltzmann factor e^{−ΔE/kT} is tiny for eV gaps at kT ≈ 0.025 eV, so the lower level dominates; inversion needs pumping.
M3@2: Why can't a simple two-level system be pumped optically into population inversion? | Pumping also stimulates emission, so populations at most equalise | Two-level atoms can't absorb light | Their spontaneous emission is too slow | The upper level is always forbidden | With absorption and stimulated emission equally likely per atom, strong pumping drives N_{2} towards N_{1} but never past it (saturation).
SA2@1,2: Explain the difference between spontaneous and stimulated emission and why a laser needs population inversion. | In spontaneous emission an excited atom decays at a random time, emitting a photon in a random direction and phase, at rate A. In stimulated emission an incoming photon of the right frequency causes the excited atom to emit a second photon identical in frequency, phase, direction and polarisation, at rate proportional to the radiation density. Light passing through a medium is absorbed by lower-level atoms and amplified by upper-level atoms; for net gain, stimulated emission must exceed absorption, which needs more atoms in the upper level than the lower: population inversion. | Spontaneous: random time, direction and phase ; Stimulated: triggered, identical photon ; Absorption competes with stimulated emission ; Net gain needs N_{2} > N_{1} ; Inversion must be maintained by pumping

## Atomic transitions
S: An atomic transition is a jump between energy levels, absorbing or emitting energy. Its frequency, strength, width and shape tell physicists about the atom and its environment.
O: Calculate natural and Doppler linewidths
O: Identify the broadening mechanisms and the line shape each produces
O: Describe Rabi oscillations and the effect of π and π/2 pulses
PRE: Spontaneous and stimulated emission
LV: Year 3 · Application
H: Line properties
E: hf = E_{upper} − E_{lower}
- **Strength**: oscillator strength or transition dipole moment.
- **Natural linewidth**: Δf = 1/(2πτ).
- **Doppler broadening**: Δf/f ≈ √(8k_{B}T ln 2/(mc^{2})); dominates for gases at room temperature (~GHz).
- **Pressure (collision) broadening**: proportional to the collision rate.
- **Power broadening**: from strong driving fields.
H: Line shapes
- Lorentzian (natural, collisional), Gaussian (Doppler), Voigt (a convolution of both).
H: Driving transitions
P: A resonant field drives Rabi oscillations: the population swings between the two levels at the Rabi frequency Ω = dE/ħ (d the transition dipole, E the field amplitude). A π pulse flips the atom completely; a π/2 pulse creates an equal superposition. These are the basic operations of NMR, atomic clocks and qubits.
X: Natural linewidth of a transition with τ = 16 ns (sodium D)?
> Δf = 1/(2π × 16 × 10^{-9} s) = 10 MHz
> Doppler width at 500 K ≈ 1.7 GHz, about 170 times larger
K: A line's width has a floor set by the lifetime, Δf = 1/(2πτ); in gases, Doppler broadening usually dominates.
!: Doppler broadening hides natural linewidths in gases; saturation spectroscopy and cold atoms remove it.
T: Natural linewidth | The minimum linewidth set by the excited state's lifetime, Δf = 1/(2πτ)
T: Doppler broadening | Line broadening from the spread of atomic velocities along the line of sight
T: Rabi oscillation | Periodic exchange of population between two levels driven by a resonant field
SUM: Natural width Δf = 1/(2πτ); Doppler width ∝ f√(T/m).
SUM: Lorentzian, Gaussian and Voigt shapes reveal the broadening mechanisms.
SUM: π and π/2 pulses flip or split a two-level atom.
EV: established | Linewidths and shapes follow from lifetimes, thermal motion and collisions, as confirmed by laser spectroscopy
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
SRC: OpenStax, University Physics Volume 2, section 2.4 "Distribution of Molecular Speeds" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-4-distribution-of-molecular-speeds
Q: What is natural linewidth? | The minimum linewidth set by the excited state's lifetime, Δf = 1/(2πτ).
Q: What is a Rabi oscillation? | Periodic exchange of population between two levels driven by a resonant field.
M1@2: The Doppler width of an atomic line increases with: | Temperature | Atomic mass | Excited-state lifetime | Laser power | The Doppler width scales as √(T/m): hotter atoms move faster, while heavier atoms move more slowly and give narrower lines.
M2@3: A π pulse on a two-level atom: | Fully transfers population to the other level | Leaves the populations unchanged | Ionises the atom completely | Puts the atom into a 50:50 superposition | A π pulse is half a Rabi cycle, taking ground to excited (or back); a π/2 pulse gives the equal superposition.
NUM1@1: An excited state lives 25 ns. What is the natural linewidth, in MHz? | 6.4 | 0.1 | MHz | Δf = 1/(2π × 25 × 10^{-9}) = 6.4 × 10^{6} Hz.
TF2@2: Natural broadening gives a Gaussian line shape. | false | Exponential decay of the excited state gives a Lorentzian shape; the Gaussian comes from the Maxwell distribution of velocities (Doppler).
M3@1,2: A gas is cooled from 400 K to 100 K. By what factor does its Doppler width change? | It halves | It quarters | It doubles | It stays the same | The Doppler width is proportional to √T, and √(100/400) = 1/2, so the width halves.
SA3@2,3: Explain why the observed width of a spectral line from a gas is usually much larger than its natural width, and describe one way to recover the natural width. | The natural width is set by the lifetime, Δf = 1/(2πτ), about 10 MHz for an allowed visible line. Atoms in a gas move with a Maxwell distribution of velocities; each sees the light Doppler-shifted by its velocity component, so the line is smeared into a Gaussian of width ~f√(8kT ln 2/(mc^{2})), around 1 GHz at room temperature, plus collisional broadening at higher pressure. The natural width can be recovered by Doppler-free methods: saturated absorption or counter-propagating two-photon spectroscopy, or by laser-cooling the atoms so their velocity spread is tiny. | Natural width from lifetime with value ; Velocity distribution causes Doppler shifts ; Doppler width typically ~GHz ; Collisional broadening mentioned ; A valid Doppler-free method

## Lasers and atomic transitions
S: Lasers depend on atomic (or molecular, or semiconductor) transitions arranged so that population inversion can be maintained. The choice of transition sets a laser's wavelength, efficiency and whether it runs continuously or in pulses.
O: Compare three-level and four-level laser schemes
O: Describe common pumping methods, including energy transfer in the HeNe laser
O: Explain how the gain bandwidth depends on the transition
PRE: Spontaneous and stimulated emission
LV: Year 2 · Application
H: Level schemes
- **Three-level** (ruby, 694 nm): pump to a high level, fast decay to a metastable upper laser level, emission to the ground state; more than half the atoms must be excited.
- **Four-level** (Nd:YAG at 1064 nm, HeNe at 633 nm): the lower laser level empties quickly, so inversion is easy.
- **Semiconductor**: conduction band to valence band across a forward-biased p–n junction.
H: Pumping
- Optical (flashlamps, diode lasers), electrical discharge (gas lasers), current injection (diodes), chemical reactions.
- Helium–neon: helium atoms excited in the discharge transfer energy to neon in collisions, because their metastable levels nearly match neon's upper laser levels.
H: Wavelength and gain
P: The gain bandwidth is set by the transition's linewidth: narrow for gases, broad for dyes and Ti:sapphire (650–1100 nm), which can be tuned or mode-locked for femtosecond pulses. Quantum cascade lasers engineer transitions between subbands in quantum wells to emit mid-infrared light.
X: Why is the HeNe laser four-level?
> Neon's lower laser level (3p) empties quickly to 3s
> Inversion between 5s and 3p is kept even with modest pumping
K: A long-lived upper level and a quickly emptied lower level make inversion easy; that is why most lasers are four-level.
!: Ruby was the first laser (Maiman, 1960) despite being three-level, because its long-lived metastable level and intense flashlamp pumping made inversion possible.
T: Metastable level | An excited level with a long lifetime, usually because decay from it is forbidden
T: Four-level laser | A laser whose lower laser level lies above the ground state and empties rapidly
T: Gain bandwidth | The range of frequencies over which the laser medium amplifies light
SUM: Three-level lasers need over half the atoms excited; four-level lasers don't.
SUM: Pumping is optical, electrical or chemical; HeNe uses collisional energy transfer.
SUM: Broad transitions give tunable and ultrashort-pulse lasers.
EV: established | Laser operation follows from population inversion between suitable atomic or solid-state levels
SRC: OpenStax, University Physics Volume 3, section 8.6 "Lasers" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-6-lasers
SRC: OpenStax, College Physics 2e, section 30.5 "Applications of Atomic Excitations and De-Excitations" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/30-5-applications-of-atomic-excitations-and-de-excitations
Q: Why are four-level lasers more efficient than three-level? | The lower laser level isn't the ground state, so it empties quickly and inversion is easy.
Q: What sets a laser's gain bandwidth? | The linewidth of its gain transition.
M1@1: The first laser used: | Ruby | Helium–neon | Carbon dioxide | A semiconductor | Maiman's 1960 laser was a flashlamp-pumped ruby crystal emitting at 694 nm.
M2@3: Quantum cascade lasers emit in the: | Mid-infrared | Ultraviolet | X-ray region | Microwave band only | They use transitions between engineered subbands in quantum wells, whose small spacings correspond to mid-infrared wavelengths.
NUM2@2: A Nd:YAG laser emits 1064 nm photons. What is the photon energy, in eV? | 1.17 | 0.01 | eV | E = 1240 eV nm/1064 nm = 1.17 eV.
TF1@1: In a three-level laser, the lower laser level is the ground state. | true | That is why more than half of all the atoms must be pumped out of the ground state before there is inversion.
M3@2: In the HeNe laser, why is helium included? | Its metastable levels transfer energy to neon's upper laser levels in collisions | Helium atoms emit the 633 nm light | Helium absorbs the unwanted infrared lines | Helium cools the tube walls | Discharge electrons excite long-lived helium levels; these nearly coincide with neon levels, so collisions pass the energy on and pump neon selectively.
SA2@1,3: Compare three-level and four-level lasers, explaining why four-level schemes reach threshold more easily. | In a three-level laser atoms are pumped to a high level, fall quickly to a metastable upper laser level and lase down to the ground state. Because the lower laser level is the ground state, which starts full, more than half of all atoms must be moved out of it before inversion exists. In a four-level laser the lower laser level lies above the ground state, is almost empty at room temperature, and empties rapidly, so even a small upper-level population gives inversion. Four-level lasers therefore need far less pump power and run continuously more easily. | Three-level scheme described ; Lower level is ground state ; Need more than half the atoms excited ; Four-level lower level empty and fast-decaying ; Lower threshold or easier CW operation

## Atomic clocks
S: Atomic clocks keep time by locking an oscillator to an atomic transition frequency. They're the most precise instruments ever made: the best would gain or lose less than a second over the age of the universe.
O: Explain how an atomic clock locks an oscillator to a transition
O: State what limits clock stability and why optical clocks outperform microwave clocks
O: Describe applications that depend on atomic clocks
PRE: Hyperfine structure
LV: Year 2 · Application
H: How they work
- An oscillator (microwave or laser) probes the atoms; feedback keeps it on resonance.
- Stability improves with higher frequency, narrower lines, more atoms and longer interrogation.
E: σ ∝ Δf/(f√N) :: fractional instability scaling
H: Generations
- **Caesium beam and fountain clocks**: 9.19 GHz hyperfine transition; realise the SI second; ~10^{-16}.
- **Hydrogen masers**: excellent short-term stability.
- **Rubidium**: compact; satellite navigation, telecoms.
- **Optical clocks**: strontium or ytterbium atoms in optical lattices, aluminium or ytterbium ions: ~10^{-18}; a redefinition of the second in terms of an optical transition is under discussion.
H: Applications
P: Satellite navigation, network and power-grid synchronisation, VLBI astronomy, tests of relativity (optical clocks detect gravitational time dilation from a height change of about 1 cm), searches for dark matter and for variation of fundamental constants, and relativistic geodesy.
X: A clock has fractional uncertainty 10^{-18}. Error over the age of the universe (4.3 × 10^{17} s)?
> Δt = 4.3 × 10^{17} s × 10^{-18}
> ≈ 0.4 s
K: A clock's precision scales with f/Δf: optical transitions are ~10^{4}–10^{5} times higher in frequency than microwave ones, with very narrow lines.
!: Atomic clocks don't count radioactive decays; they are oscillators locked to atomic transition frequencies.
T: Fractional frequency uncertainty | The uncertainty in a clock's frequency divided by the frequency itself
T: Optical lattice clock | A clock using many neutral atoms held in a standing-wave laser trap, probed on a narrow optical transition
SUM: Clocks lock an oscillator to an atomic resonance.
SUM: Caesium defines the second; optical clocks reach ~10^{-18}.
SUM: They underpin navigation and test gravity and fundamental constants.
EV: established | Optical atomic clocks have reached fractional uncertainties near 10^{-18} and measure gravitational time dilation over centimetre heights
SRC: OpenStax, University Physics Volume 3, section 8.3 "Electron Spin" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-3-electron-spin
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
Q: Which transition defines the SI second? | The caesium-133 ground-state hyperfine transition, 9 192 631 770 Hz.
Q: Why are optical clocks more precise than microwave clocks? | Their transition frequencies are ~10^{4}–10^{5} times higher, with very narrow lines.
M1@2: Optical lattice clocks commonly use: | Strontium | Caesium | Hydrogen | Uranium | Strontium's narrow 698 nm transition, probed on thousands of trapped atoms at once, is a leading optical clock standard.
M2@3: Optical clocks can detect height differences of about: | 1 cm | 1 km | 10 m | 1 mm only in space | Gravitational time dilation is gΔh/c^{2} ≈ 10^{-18} per centimetre, within reach of the best clocks.
NUM2@3: What is the fractional frequency shift gΔh/c^{2} for a height change of 1.0 m? Give it in units of 10^{-16}. (g = 9.8 m s^{-2}) | 1.09 | 0.02 | × 10^{-16} | 9.8 × 1.0/(3.0 × 10^{8})^{2} = 1.09 × 10^{-16}.
TF1@1: An atomic clock works by counting radioactive decays. | false | It locks an oscillator to the frequency of an atomic transition; radioactivity plays no part.
M3@2: Why does probing more atoms at once improve a clock's stability? | Quantum projection noise falls as 1/√N | More atoms give a higher transition frequency | More atoms narrow the natural linewidth | Atoms shield each other from magnetic fields | Each measurement on N independent atoms averages their random projection outcomes, reducing the frequency noise as 1/√N.
SA2@1,3: Explain how an atomic clock works and why its "ticking" is so much more reliable than a quartz oscillator's. | A local oscillator, a quartz-referenced microwave source or a stabilised laser, is tuned near an atomic transition. Atoms are probed, the fraction excited is measured, and a feedback loop steers the oscillator to the centre of the resonance; counting its cycles gives time. The atomic frequency is set by fundamental constants, the same for every atom of the isotope, and barely affected by temperature or ageing, whereas a quartz crystal's frequency depends on its cut, temperature and wear. Narrow lines at high frequency, many atoms and long probe times make the lock very precise. | Oscillator probes atoms ; Feedback locks to resonance ; Counting cycles gives time ; Atomic frequency identical and fundamental ; Quartz drifts with temperature and ageing

## Laser cooling
S: Laser cooling slows atoms using the momentum of photons. Tuning lasers slightly below an atomic resonance makes atoms moving towards the light absorb more, so they're always pushed back: temperatures fall to microkelvin.
O: Explain Doppler cooling and the role of red detuning
O: Calculate photon recoil velocities and the Doppler limit
O: Describe sub-Doppler and further cooling methods
PRE: Doppler effect
LV: Year 3 · Physical reasoning
H: Doppler cooling
- The laser is red-detuned (below resonance).
- An atom moving towards a beam sees it Doppler-shifted up towards resonance, absorbs, and gets a kick opposing its motion.
- Spontaneous emission is random in direction, so it gives no net kick on average.
- Six beams make an "optical molasses" that damps motion in 3D.
E: T_{D} = ħΓ/(2k_{B}) :: Doppler limit (~240 μK for sodium, ~150 μK for rubidium)
H: Sub-Doppler cooling
- Polarisation-gradient (Sisyphus) cooling: atoms climb light-shift hills and lose energy; it reaches ~10 μK, below the Doppler limit.
- Raman and evaporative cooling reach nanokelvin.
H: Recognition
P: Chu, Cohen-Tannoudji and Phillips shared the 1997 Nobel Prize for laser cooling. It underlies atomic clocks, atom interferometers, Bose–Einstein condensates and many quantum computers.
X: Recoil velocity of a sodium atom absorbing a 589 nm photon?
> v = h/(mλ) = 6.63 × 10^{-34}/(3.8 × 10^{-26} × 5.89 × 10^{-7}) = 3 cm s^{-1}
> Stopping a 500 m s^{-1} atom takes ~17 000 photons, absorbed in milliseconds
K: Red-detuned light makes the scattering force depend on velocity, so it acts like friction; random spontaneous emission sets the Doppler limit.
!: Laser cooling works only for atoms with suitable closed transitions; molecules are much harder (though now achieved for some).
T: Red detuning | Tuning a laser to a frequency slightly below the atomic resonance
T: Optical molasses | Counter-propagating red-detuned beams that produce a viscous damping force on atoms
T: Doppler limit | The lowest temperature reachable by Doppler cooling, k_{B}T = ħΓ/2
SUM: Red-detuned light preferentially kicks atoms moving towards it.
SUM: Each photon changes velocity by ħk/m, a few cm s^{-1}.
SUM: Doppler limit ħΓ/(2k_{B}); sub-Doppler methods go lower.
EV: established | Laser cooling routinely produces atomic gases at microkelvin temperatures, below the Doppler limit with polarisation-gradient cooling
SRC: OpenStax, University Physics Volume 2, section 16.4 "Momentum and Radiation Pressure" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/16-4-momentum-and-radiation-pressure
SRC: OpenStax, University Physics Volume 1, section 17.7 "The Doppler Effect" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-7-the-doppler-effect
Q: How does Doppler cooling slow atoms? | Red-detuned light is absorbed preferentially by atoms moving towards it, giving momentum kicks that oppose motion.
Q: What is the Doppler cooling limit? | T = ħΓ/(2k_{B}), set by heating from random spontaneous emission.
M1@1: Laser cooling beams are tuned: | Slightly below resonance | Exactly on resonance | Far above resonance | To any frequency at all | Red detuning means only atoms moving towards a beam are Doppler-shifted into resonance, so the force always opposes motion.
M2@1: Optical molasses refers to: | Damping of atomic motion by counter-propagating beams | Atoms stuck to a cold surface | A type of Bose–Einstein condensate | Using lasers to cut metals | The velocity-dependent scattering force acts like a viscous drag, slowing atoms in every direction where beams cross.
NUM2@2: What is the recoil velocity, in mm s^{-1}, of a rubidium-87 atom (m = 1.44 × 10^{-25} kg) absorbing a 780 nm photon? | 5.9 | 0.1 | mm s^{-1} | v = h/(mλ) = 6.63 × 10^{-34}/(1.44 × 10^{-25} × 7.80 × 10^{-7}) = 5.9 × 10^{-3} m s^{-1}.
TF1@3: Sisyphus cooling can cool atoms below the Doppler limit. | true | Polarisation-gradient cooling relies on light shifts and optical pumping, not just Doppler shifts, and reaches about 10 μK in alkali atoms.
M3@2: A transition has natural linewidth Γ/2π = 6.0 MHz. What is its Doppler limit? (ħ = 1.05 × 10^{-34} J s, k_{B} = 1.38 × 10^{-23} J K^{-1}) | About 140 μK | About 14 μK | About 1.4 mK | About 280 μK | Γ = 3.8 × 10^{7} s^{-1}; T = ħΓ/(2k_{B}) = 1.05 × 10^{-34} × 3.8 × 10^{7}/(2.76 × 10^{-23}) ≈ 1.4 × 10^{-4} K.
SA3@1,2: Explain how laser light, which carries energy into an atom, can cool a gas. | Each absorbed photon gives the atom momentum ħk along the beam; the re-emitted photon goes in a random direction, so over many cycles the emission kicks average to zero. If the laser is tuned slightly below resonance, an atom moving towards the beam sees it Doppler-shifted up into resonance and scatters many photons, each slowing it, while an atom moving away sees it shifted further from resonance and scatters few. With beams from all directions, the net force opposes velocity, like friction, so the spread of velocities, and hence the temperature, falls. The energy is carried off by the scattered photons, which are on average slightly bluer than those absorbed. | Photon momentum kick ħk ; Random spontaneous emission averages out ; Red detuning plus Doppler shift ; Velocity-dependent force from opposing beams ; Energy removed by scattered light

## Magneto-optical trapping
S: A magneto-optical trap (MOT) combines laser cooling with a magnetic field gradient so the light both cools atoms and pushes them to the centre. It's the standard starting point for cold-atom experiments.
O: Explain how a MOT produces a position-dependent restoring force
O: Describe the beam polarisations and field geometry of a MOT
O: Outline what happens to atoms after the MOT stage
PRE: Laser cooling
LV: Year 3 · Physical reasoning
H: How it works
- Six circularly polarised, red-detuned beams along three axes.
- An anti-Helmholtz coil pair makes a quadrupole field, zero at the centre and growing linearly outwards.
- Zeeman shifts bring the beam that pushes an atom back towards the centre closer to resonance: a position-dependent force.
- It captures atoms from a vapour or a slowed beam, holding ~10^{6}–10^{10} atoms at ~100 μK.
H: After the MOT
- Optical molasses for sub-Doppler cooling.
- Transfer to magnetic traps or optical dipole traps (focused far-detuned lasers).
- Evaporative cooling to reach quantum degeneracy.
- Optical lattices and tweezer arrays position individual atoms for quantum simulation and computing.
H: Beyond atoms
P: MOTs now trap some molecules (SrF, CaF), enabling ultracold chemistry and precision tests such as searches for the electron's electric dipole moment. Antihydrogen has been laser-cooled at CERN (2021).
X: Why does the field gradient need circular polarisation?
> Zeeman-shifted sublevels absorb σ^{+} or σ^{−} light preferentially
> Matching each beam's polarisation to the field direction makes the force always point towards the centre
K: In a MOT the magnetic gradient makes the radiation pressure depend on position, so the light both cools and traps.
!: The magnetic field alone doesn't trap atoms in a MOT; it makes the radiation pressure position-dependent.
T: Magneto-optical trap | A trap combining red-detuned circularly polarised beams with a quadrupole magnetic field to cool and confine atoms
T: Quadrupole field | A magnetic field that is zero at a point and grows linearly in every direction from it
T: Anti-Helmholtz coils | Two coils carrying opposite currents, producing a quadrupole field
SUM: A MOT = optical molasses + quadrupole field + circular polarisation.
SUM: Zeeman shifts make the force point to the field zero.
SUM: MOTs load traps, lattices and tweezers for further cooling and quantum control.
EV: established | Magneto-optical traps reliably cool and confine millions to billions of atoms at about 100 μK
SRC: OpenStax, University Physics Volume 3, section 8.2 "Orbital Magnetic Dipole Moment of the Electron" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-2-orbital-magnetic-dipole-moment-of-the-electron
SRC: OpenStax, University Physics Volume 2, section 16.4 "Momentum and Radiation Pressure" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/16-4-momentum-and-radiation-pressure
Q: What does the magnetic field do in a MOT? | It Zeeman-shifts transitions so radiation pressure pushes atoms towards the trap centre.
Q: How many atoms does a typical MOT hold? | About a million to ten billion.
M1@2: A MOT's magnetic field is: | Zero at the centre, increasing linearly | Uniform throughout the trap | Oscillating at radio frequency | Absent during trapping | Anti-Helmholtz coils give a quadrupole field with a zero at the centre, so Zeeman shifts grow with distance from it.
M2@3: Optical tweezer arrays are used for: | Arranging individual atoms for quantum computing | Cutting atoms into fragments | Heating atoms above room temperature | Measuring magnetic fields only | Tightly focused beams each hold one atom, and can be moved to build programmable arrays for quantum simulation.
TF1@1: Switching off the coils of a MOT leaves an optical molasses that cools atoms but no longer confines them. | true | Without the field gradient the force depends only on velocity, so atoms are slowed but slowly diffuse away.
NUM2@1: A MOT holds 10^{8} sodium atoms (m = 3.8 × 10^{-26} kg). What is the total mass, in units of 10^{-18} kg? | 3.8 | 0.1 | × 10^{-18} kg | 10^{8} × 3.8 × 10^{-26} kg = 3.8 × 10^{-18} kg: a few femtograms.
M3@1,2: An atom sits to the right of the MOT centre. Which beam does the Zeeman shift bring closer to resonance? | The beam travelling to the left, pushing it back | The beam travelling to the right | Both beams equally | Neither: the shift moves both away | The field and polarisations are arranged so that, off-centre, the beam directed back towards the centre is shifted towards resonance and scatters more.
SA3@1,2: Explain how a magneto-optical trap confines atoms as well as cooling them. | Red-detuned counter-propagating beams in three directions give a velocity-dependent force that cools the atoms (optical molasses). Adding a quadrupole field, zero at the centre and increasing linearly, makes the Zeeman shifts of the atomic sublevels grow with displacement. The beams are circularly polarised so that, for an atom displaced from the centre, the sublevel shifted towards resonance is the one driven by the beam pointing back towards the centre. That beam then scatters more photons, giving a restoring force proportional to displacement, so atoms are both slowed and pushed to the centre. | Molasses gives velocity damping ; Quadrupole field zero at centre ; Zeeman shift grows with displacement ; Circular polarisation selects the restoring beam ; Restoring force ∝ displacement

## Bose–Einstein condensation in atomic gases
S: When a dilute gas of bosonic atoms is cooled to nanokelvin temperatures, a large fraction collapses into the lowest quantum state, forming a Bose–Einstein condensate: a macroscopic matter wave. First made in 1995, BECs are laboratories for quantum physics.
O: State the condition for Bose–Einstein condensation in terms of phase-space density
O: Describe how BECs are made and observed
O: Explain the coherence and superfluid properties of BECs
PRE: Bose–Einstein statistics
LV: Year 3 · Physical reasoning
H: Making a BEC
- Laser-cool in a MOT, then load a magnetic or optical trap.
- **Evaporative cooling**: remove the most energetic atoms; the rest rethermalise colder.
- Condensation when nλ_{dB}^{3} ≈ 2.6, with λ_{dB} the thermal de Broglie wavelength; typically 0.1–1 μK at densities of 10^{19}–10^{20} m^{-3}.
- Observed by releasing the cloud: a sharp peak appears in the velocity distribution.
H: Properties
- Coherent: two BECs interfere (Ketterle, 1997).
- Superfluid: quantised vortices form in rotating condensates.
- Interactions tunable with Feshbach resonances, from repulsive to attractive (collapse: the "Bosenova").
- Atom lasers: coherent beams of atoms.
H: Uses
P: BECs simulate condensed matter (the Mott insulator transition in optical lattices) and analogue black holes (sonic horizons), and serve as very sensitive sensors. Cornell, Wieman and Ketterle received the 2001 Nobel Prize. NASA's Cold Atom Lab makes BECs on the International Space Station.
X: Why evaporative cooling works: remove atoms with energy above 4k_{B}T.
> The removed atoms carry well above the average energy
> After collisions the remaining atoms share a lower average energy: lower T
K: Condensation happens when the atoms' de Broglie wavelength becomes comparable to their spacing, so their wavefunctions overlap.
!: A BEC isn't a solid or liquid; it's an extremely dilute gas whose atoms share one quantum state.
T: Bose–Einstein condensate | A state in which a macroscopic fraction of bosons occupies the single lowest quantum state
T: Thermal de Broglie wavelength | λ_{dB} = h/√(2πmk_{B}T), the typical quantum wavelength of an atom at temperature T
T: Evaporative cooling | Removing the most energetic atoms so the remainder rethermalise at a lower temperature
SUM: BEC forms when nλ_{dB}^{3} ≈ 2.6, at ~100 nK for dilute alkali gases.
SUM: Laser cooling plus evaporative cooling reaches it.
SUM: BECs are coherent, superfluid and tunable quantum simulators.
EV: established | Dilute atomic gases form Bose–Einstein condensates at sub-microkelvin temperatures, first achieved in rubidium and sodium in 1995
SRC: OpenStax, University Physics Volume 3, section 8.4 "The Exclusion Principle and the Periodic Table" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-4-the-exclusion-principle-and-the-periodic-table
SRC: OpenStax, University Physics Volume 3, section 6.5 "De Broglie's Matter Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/6-5-de-broglies-matter-waves
Q: What is evaporative cooling? | Removing the most energetic atoms so the remainder rethermalise at lower temperature.
Q: How was BEC first observed? | As a sharp peak in the atoms' velocity distribution after release from the trap.
M1@1: BECs are made from: | Bosonic atoms | Fermionic atoms only | Free electrons | Neutrinos | Only bosons (integer total spin, such as rubidium-87) can share a single quantum state; fermions are blocked by the Pauli principle.
M2@3: Two overlapping BECs produce: | Interference fringes | No measurable effect | A solid crystal | Only extra heat | Each condensate is a single coherent matter wave, so where they overlap their amplitudes add, giving fringes as Ketterle's group saw in 1997.
NUM2@1: Condensation needs nλ_{dB}^{3} ≈ 2.6. If λ_{dB} = 0.30 μm, what density, in units of 10^{19} m^{-3}, is needed? | 9.6 | 0.3 | × 10^{19} m^{-3} | n = 2.6/(3.0 × 10^{-7})^{3} = 2.6/2.7 × 10^{-20} = 9.6 × 10^{19} m^{-3}.
TF1@2: Cooling a gas lengthens its atoms' thermal de Broglie wavelength. | true | λ_{dB} = h/√(2πmk_{B}T) grows as 1/√T, so cold atoms have long wavelengths that overlap.
M3@2,3: Why must evaporative cooling be done slowly enough for collisions to occur? | Collisions refill the high-energy tail so more hot atoms can be removed | Collisions add energy that is needed for condensation | Collisions turn fermions into bosons | Fast evaporation would heat the trap coils | Without rethermalisation the distribution isn't Maxwellian and no new hot atoms appear to be cut off, so cooling stalls.
SA3@1,2: Explain why Bose–Einstein condensation in atomic gases requires such low temperatures, and how they are reached. | Condensation occurs when the thermal de Broglie wavelength, which grows as 1/√T, becomes comparable to the spacing between atoms, so nλ_{dB}^{3} ≈ 2.6. Atomic gases must be very dilute (10^{19}–10^{20} m^{-3}) to avoid forming molecules or solids, so the spacing is large and the temperature must be tiny, around 0.1–1 μK. Atoms are first laser-cooled in a MOT to ~100 μK, then held in a magnetic or optical trap and evaporatively cooled: the most energetic atoms are removed and the rest rethermalise colder, until the phase-space density passes the threshold. | Phase-space density condition ; Wavelength comparable to spacing ; Dilute gas means very low T needed ; Laser cooling stage ; Evaporative cooling stage

## Precision spectroscopy
S: Precision spectroscopy measures atomic and molecular transition frequencies with extraordinary accuracy, testing fundamental physics: QED, the constancy of nature's constants, and the symmetry between matter and antimatter.
O: Describe Doppler-free techniques and the role of frequency combs
O: Explain how precision measurements test QED, CPT symmetry and constant constants
O: Evaluate why table-top measurements can probe physics beyond the Standard Model
PRE: Atomic transitions
LV: Postgraduate · Physical reasoning
H: Techniques
- **Doppler-free methods**: saturated absorption, two-photon spectroscopy with counter-propagating beams.
- **Cold atoms and trapped ions**: long interrogation times.
- **Frequency combs** (Hänsch and Hall, Nobel 2005): link optical frequencies directly to microwave standards.
- **Ramsey interferometry**: separated oscillatory fields narrow resonances (Nobel 1989).
H: Landmark measurements
- Hydrogen 1s–2s at 2 466 061 413 187 kHz with ~10 Hz uncertainty: the Rydberg constant and the proton radius.
- Antihydrogen 1s–2s agrees with hydrogen to ~2 parts in 10^{12} (ALPHA, CERN).
- Electron magnetic moment to ~0.1 parts per trillion, giving α to ~0.1 parts per billion.
- Electron electric dipole moment limits (below 10^{-29} e cm) constrain new physics at energies beyond collider reach.
H: Fundamental constants
P: Comparing different atomic clocks over years limits any present-day drift of α or of the proton-to-electron mass ratio to below ~10^{-17} per year. Precision measurements are a complementary route to new physics alongside particle colliders: a heavy new particle would shift energies slightly through virtual effects.
X: Why does two-photon spectroscopy with counter-propagating beams cancel Doppler broadening?
> An atom moving at v sees one beam shifted by +kv and the other by −kv
> Absorbing one photon from each, the shifts cancel: the total energy 2ħω is independent of v
K: Precision lets tiny effects (QED corrections, symmetry violations, possible new forces) become visible in atomic energies.
!: Precision isn't just more digits; a disagreement with theory at the 12th digit is as significant as a new particle seen at a collider.
T: Frequency comb | A mode-locked laser whose spectrum is a ruler of evenly spaced optical frequencies linked to a microwave standard
T: CPT symmetry | The combined symmetry of charge conjugation, parity and time reversal, predicting identical spectra for matter and antimatter
T: Electric dipole moment (EDM) | A separation of charge along a particle's spin; a nonzero electron EDM would violate time-reversal symmetry
SUM: Doppler-free methods, cold atoms and combs give frequencies to ~10^{-15} or better.
SUM: Hydrogen, antihydrogen and electron g-2 measurements test QED and CPT.
SUM: EDM searches and clock comparisons probe physics beyond the Standard Model.
EV: established | Precision spectroscopy confirms QED and CPT symmetry at the parts-per-trillion level; no electron EDM or drift of constants has been found
SRC: OpenStax, University Physics Volume 3, section 8.5 "Atomic Spectra and X-rays" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-5-atomic-spectra-and-x-rays
SRC: OpenStax, University Physics Volume 3, section 8.6 "Lasers" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-6-lasers
Q: How does a frequency comb help precision spectroscopy? | It provides a ruler of evenly spaced optical frequencies linked to a microwave standard.
Q: What did comparing hydrogen and antihydrogen spectra test? | CPT symmetry between matter and antimatter.
M1@1: Doppler-free spectroscopy techniques include: | Saturated absorption | Absorption in a hot vapour cell | X-ray diffraction | Flame tests | Saturated absorption uses a strong pump and weak probe that interact only with atoms of near-zero velocity along the beam.
M2@3: Limits on the electron's electric dipole moment test: | Physics beyond the Standard Model | Newtonian gravity directly | Rates of nuclear fission | Models of chemical bonding | The Standard Model predicts an EDM far below current limits; new time-reversal-violating particles would give a larger one.
NUM3@1: Two-photon spectroscopy of hydrogen 1s–2s uses 243 nm light. What is the total energy, in eV, of the two absorbed photons? | 10.2 | 0.05 | eV | Each photon has 1240/243 = 5.10 eV; two give 10.2 eV, the 1s–2s gap (13.6 × 3/4).
TF1@2: In counter-propagating two-photon absorption, an atom's first-order Doppler shifts from the two beams cancel. | true | The shifts +kv and −kv add to zero, so all velocity classes absorb at the same frequency.
M3@2,3: A proposed new particle couples very weakly to electrons and has a mass far beyond collider energies. How could atomic spectroscopy detect it? | Virtual effects could slightly shift energies or induce an electron EDM | It would emit visible light in atomic vapours | It would ionise atoms in the laboratory | It would change atomic masses by several per cent | Heavy particles appear in quantum loops, producing tiny energy shifts or symmetry-violating moments that precision measurements can resolve.
SA3@2,3: Explain how precision atomic spectroscopy tests fundamental physics, giving two examples. | Theory, mainly QED with known constants, predicts atomic energies to many significant figures, so comparing a measured transition frequency with prediction tests the theory and determines constants. Hydrogen's 1s–2s frequency, measured to about 10 Hz in 2.5 × 10^{15} Hz, gives the Rydberg constant and, with the Lamb shift, the proton radius. The antihydrogen 1s–2s frequency matching hydrogen's to about 2 parts in 10^{12} tests CPT symmetry. Electron EDM searches test time-reversal violation predicted by many extensions of the Standard Model, and comparisons of clocks limit drifts of α. | Measurement compared with precise theory ; Hydrogen 1s–2s or electron g-factor example ; Antihydrogen and CPT ; EDM or varying constants as beyond-Standard-Model test ; Explains why high precision matters
`;
