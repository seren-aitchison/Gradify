// SciGradify Physical Chemistry and Molecular Science (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Molecular structure
LV: Year 1 · Chemical reasoning
S: Molecular structure covers bond lengths, angles and symmetry. This lesson explains how structure is described and measured.
O: Describe the parameters that define molecular structure
O: Explain the use of point groups to describe symmetry
O: Describe experimental methods for determining structure
H: Describing structure
- **Bond lengths**, **bond angles** and **torsion (dihedral) angles** define geometry.
- Molecules vibrate, so measured values are averages.
- **Symmetry elements**: rotation axes, mirror planes, inversion centres.
- Molecules are grouped into **point groups** by their symmetry, such as C₂ᵥ for water.
D: chem-vsepr-lone-pairs
H: Measuring structure
- **X-ray and neutron diffraction** for crystals.
- **Microwave spectroscopy** for gas-phase molecules.
- **Electron diffraction** for gases.
- **Computational methods** predict structures.
P: Symmetry determines which vibrations are IR or Raman active and whether a molecule can be polar or chiral. A molecule with an inversion centre, such as CO₂, has no permanent dipole moment. Point groups simplify the description of molecular orbitals and spectra.
X: Symmetry of water.
> Water has a C₂ rotation axis through oxygen.
> It has two mirror planes containing the axis.
> Its point group is C₂ᵥ.
> It lacks an inversion centre, so it can be polar.
K: Molecular structure is defined by bond lengths, angles and torsion angles and classified by symmetry into point groups, which govern polarity, chirality and spectroscopic activity; diffraction, spectroscopy and computation determine structures.
!: Thinking molecules are rigid with fixed bond lengths. Vibration means measured values are averages.
EV: established | Point-group symmetry underpins selection rules in molecular spectroscopy (Cotton, 1990).
T: Point group | A set of symmetry operations describing a molecule
T: Torsion angle | The angle between planes defined by four bonded atoms
T: Inversion centre | A point through which every atom has an equivalent opposite
SUM: Lengths, angles, torsions.
SUM: Symmetry and point groups.
SUM: Many measuring methods.
SRC: Cotton F. A., Chemical Applications of Group Theory, 3rd edition, Wiley | secondary | 1990
SRC: Atkins P., de Paula J. and Keeler J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: What is the point group of water? | C₂ᵥ.
Q: Which technique measures structures of gas-phase molecules precisely? | Microwave spectroscopy.
M1#chemistry-u16-01-q1@1: Which symmetry element rules out a permanent dipole moment? | An inversion centre | A single mirror plane | A twofold rotation axis alone | No symmetry at all | Opposite equivalent atoms cancel any dipole.
M2#chemistry-u16-01-q2@2: Why are measured bond lengths averages? | Molecules constantly vibrate about their equilibrium positions | Bonds change length only when they are broken | Instruments cannot measure bond lengths at all | All bonds in molecules have exactly the same length | Vibrational motion blurs the exact positions.
MATCH1#chemistry-u16-01-q3@2: Match each molecule to a symmetry feature. | CO₂ = Inversion centre ; H₂O = C₂ᵥ point group ; CHFClBr = No symmetry, chiral ; CH₄ = Tetrahedral symmetry | Symmetry varies widely between molecules.
M3#chemistry-u16-01-q4@3: Why is symmetry useful in spectroscopy? | It determines which vibrations and transitions are allowed | It changes the overall mass of the molecule | It has no effect at all on observed spectra | It removes all vibrations from the molecule | Selection rules follow from symmetry, so it decides which bands appear.
SA2#chemistry-u16-01-q5@1,3: Explain how molecular structure is described and determined. | Molecular structure is defined by bond lengths, bond angles and torsion angles, which are averages because molecules vibrate. Symmetry elements such as rotation axes, mirror planes and inversion centres classify molecules into point groups: water is C₂ᵥ, while CO₂ has an inversion centre and no dipole. Symmetry controls polarity, chirality and which spectroscopic transitions are allowed. Structures are measured by X-ray and neutron diffraction, microwave spectroscopy, electron diffraction and computation. | Geometric parameters ; Vibrational averaging ; Symmetry ; Point groups ; Methods

## Molecular orbitals
LV: Year 1 · Chemical reasoning
S: This lesson applies molecular orbital theory to diatomic molecules and conjugated systems.
O: Construct MO diagrams for second-row diatomic molecules
O: Explain the paramagnetism of oxygen using MO theory
O: Describe Hückel theory for conjugated π systems
H: Diatomic molecules
- Atomic orbitals combine to form **bonding** and **antibonding** MOs.
- **Bond order** = ½(bonding − antibonding electrons).
- O₂ has two unpaired electrons in π* orbitals: it is **paramagnetic**.
- In B₂, C₂ and N₂, **s-p mixing** raises σ2p above π2p.
D: chem-mo-h2
H: Conjugated systems
- **Hückel theory** treats π orbitals separately from σ.
- n p orbitals combine into n π molecular orbitals.
- The **HOMO** (highest occupied) and **LUMO** (lowest unoccupied) control reactivity and colour.
- Longer conjugation narrows the HOMO-LUMO gap.
P: Lewis structures predict O₂ has all electrons paired, but liquid oxygen sticks to a magnet. MO theory explains this. Frontier orbital theory, using HOMO and LUMO, explains many reactions, including cycloadditions.
X: MO configuration of O₂.
> O₂ has 12 valence electrons.
> σ2s² σ*2s² σ2p² π2p⁴ π*2p².
> The two π* electrons occupy separate orbitals.
> Bond order = ½(8 − 4) = 2; two unpaired electrons.
K: Atomic orbitals combine into bonding and antibonding MOs; bond order is half the difference in electrons, O₂'s two unpaired π* electrons make it paramagnetic and Hückel theory describes conjugated π systems, whose HOMO-LUMO gap narrows with conjugation.
!: Using Lewis structures to predict magnetism. They fail for O₂, which MO theory explains.
EV: established | MO theory explains the paramagnetism of oxygen (Mulliken, 1932).
T: HOMO | Highest occupied molecular orbital
T: LUMO | Lowest unoccupied molecular orbital
T: Hückel theory | A simple MO method for π systems
SUM: Bonding and antibonding.
SUM: O₂ paramagnetic.
SUM: HOMO and LUMO.
SRC: Mulliken R. S., "Electronic structures of polyatomic molecules and valence", Physical Review 40(1), 55–62 | primary | 1932
SRC: Hückel E., "Quantentheoretische Beiträge zum Benzolproblem", Zeitschrift für Physik 70, 204–286 | primary | 1931
Q: What is the bond order of O₂? | 2.
Q: What does HOMO stand for? | Highest occupied molecular orbital.
M1#chemistry-u16-02-q1@1: Why is O₂ paramagnetic? | It has two unpaired electrons in π* orbitals | All its electrons are paired | It has an odd number of electrons | It contains metal atoms | Hund's rule places one electron in each π* orbital.
M2#chemistry-u16-02-q2@2: What happens to the HOMO-LUMO gap as conjugation increases? | It decreases, shifting absorption to longer wavelengths | It increases steadily with each bond | It stays exactly the same | It becomes zero immediately | More combined p orbitals bring levels closer.
NUM1#chemistry-u16-02-q3@2: N₂ has 8 bonding and 2 antibonding valence electrons. What is its bond order? | 3 | 0 | bond order | ½(8 − 2) = 3, matching the N≡N triple bond.
M3#chemistry-u16-02-q4@3: Why does s-p mixing change the MO order in N₂ but not in O₂? | The 2s and 2p energies are closer in lighter atoms, allowing mixing | O₂ has no p orbitals available for bonding | N₂ has no s orbitals in its valence shell | s-p mixing only ever happens in charged ions | Larger s-p gaps in O and F suppress mixing.
SA2#chemistry-u16-02-q5@1,3: Explain molecular orbital theory for diatomic and conjugated molecules. | Atomic orbitals combine into bonding and antibonding molecular orbitals, and bond order equals half the difference between bonding and antibonding electrons. O₂ has the configuration σ2s² σ*2s² σ2p² π2p⁴ π*2p², giving bond order 2 and two unpaired π* electrons, so it is paramagnetic, which Lewis structures cannot explain. In B₂ to N₂, s-p mixing raises σ2p above π2p. Hückel theory combines n p orbitals into n π MOs; the HOMO-LUMO gap narrows as conjugation increases. | MO formation ; Bond order ; Oxygen ; s-p mixing ; Hückel theory

## Quantum chemistry
LV: Year 1 · Chemical reasoning
S: Quantum chemistry applies quantum mechanics to chemical systems. This lesson introduces its key ideas and approximations.
O: Explain why quantum mechanics is needed in chemistry
O: Describe the Born-Oppenheimer approximation
O: Describe the main computational approaches
H: Key ideas
- Electrons behave as **waves**, described by **wavefunctions**.
- Energy is **quantised**.
- |ψ|² gives the **probability density** of finding an electron.
- Classical physics cannot explain atomic stability or spectra.
D: chem-mo-n2
H: Approximations
- **Born-Oppenheimer**: nuclei are much heavier and slower than electrons, so they are treated as fixed.
- **Hartree-Fock**: each electron moves in the average field of the others.
- **Density functional theory (DFT)**: uses electron density instead of the full wavefunction.
- Higher-level methods include electron correlation more fully.
P: Exact solutions exist only for one-electron systems such as the hydrogen atom, so approximations are essential. DFT, recognised by the 1998 Nobel Prize, balances accuracy and cost and is used for most molecular calculations today.
X: Why Born-Oppenheimer works.
> A proton is about 1,836 times heavier than an electron.
> Electrons adjust almost instantly to nuclear positions.
> Electronic energy is calculated for fixed nuclei.
> This gives a potential energy surface for nuclear motion.
H: The main computational approaches
- **Ab initio** methods start from the Schrödinger equation with no fitted data: Hartree-Fock, then more accurate methods such as Møller-Plesset perturbation theory and coupled cluster, which add electron correlation at a much higher computational cost.
- **Density functional theory** works from the electron density with an approximate exchange-correlation functional: the usual choice for molecules of tens to hundreds of atoms.
- **Semi-empirical** methods simplify the equations using parameters fitted to experiment: fast enough for large molecules, but less reliable outside the data they were fitted to.
- **Molecular mechanics** leaves out electrons and treats atoms as balls joined by springs (a force field): it handles proteins and materials with many thousands of atoms but cannot describe bonds breaking or forming.
- Choosing between these **approaches** is a trade-off between accuracy and computational cost, which rises steeply with the number of electrons.
K: Quantum chemistry describes electrons as wavefunctions with quantised energy; the Born-Oppenheimer approximation separates electronic and nuclear motion and methods such as Hartree-Fock and DFT approximate many-electron systems.
!: Thinking quantum chemistry solves molecules exactly. Only one-electron systems have exact solutions.
EV: established | Density functional theory is the most widely used quantum chemistry method (Kohn, 1999).
T: Wavefunction | A mathematical function describing a quantum system
T: Born-Oppenheimer approximation | Treating nuclei as fixed while solving for electrons
T: Density functional theory | A method based on electron density
SUM: Electrons as waves.
SUM: Born-Oppenheimer.
SUM: Hartree-Fock and DFT.
SRC: Kohn W., "Nobel lecture: Electronic structure of matter—wave functions and density functionals", Reviews of Modern Physics 71(5), 1253–1266 | primary | 1999
SRC: Born M. and Oppenheimer R., "Zur Quantentheorie der Molekeln", Annalen der Physik 389(20), 457–484 | primary | 1927
Q: What does |ψ|² represent? | The probability density of finding a particle.
Q: What does the Born-Oppenheimer approximation assume? | Nuclei are fixed while electrons move.
M1#chemistry-u16-03-q1@1: Which method uses electron density rather than the full wavefunction? | Density functional theory | Hartree-Fock theory | Classical mechanics | Molecular mechanics | DFT builds energy from the electron density.
M2#chemistry-u16-03-q2@2: Why can the Born-Oppenheimer approximation be used? | Nuclei are much heavier and slower than electrons | Electrons are heavier than nuclei | Nuclei have no mass | Electrons do not move | Electrons adjust almost instantly to nuclear positions.
MATCH1#chemistry-u16-03-q3@2: Match each idea to its description. | Wavefunction = Describes the quantum state ; Hartree-Fock = Average field method ; DFT = Uses electron density ; Born-Oppenheimer = Fixed nuclei | Quantum chemistry uses several approximations.
M3#chemistry-u16-03-q4@3: Why are approximations essential in quantum chemistry? | Exact solutions exist only for one-electron systems | All molecules can be solved exactly by hand | Electrons do not interact | Computers cannot do arithmetic | Electron-electron repulsion makes exact solution impossible.
SA2#chemistry-u16-03-q5@1,3: Explain the key ideas and approximations of quantum chemistry. | Quantum chemistry treats electrons as waves described by wavefunctions, with quantised energies and |ψ|² giving probability density, explaining atomic stability and spectra that classical physics cannot. Exact solutions exist only for one-electron systems. The Born-Oppenheimer approximation treats heavy nuclei as fixed while solving for electrons. Hartree-Fock places each electron in the average field of others, and DFT uses electron density, balancing accuracy and cost. Higher methods include electron correlation more fully. | Wavefunctions ; Quantisation ; Born-Oppenheimer ; Hartree-Fock ; DFT

## Schrödinger equation
LV: Year 1 · Chemical reasoning
S: The Schrödinger equation is the central equation of quantum mechanics. This lesson explains its form and meaning.
O: Write the time-independent Schrödinger equation
O: Explain the meaning of the Hamiltonian and eigenvalues
O: Describe conditions for acceptable wavefunctions
H: The equation
- **Ĥψ = Eψ**: the Hamiltonian operator acting on ψ gives energy times ψ.
- The **Hamiltonian** includes kinetic and potential energy.
- Solutions are **eigenfunctions** with **eigenvalues** E.
- Only certain energies are allowed: **quantisation**.
D: chem-schrodinger-well
H: Acceptable wavefunctions
- ψ must be **single-valued**, **continuous** and **finite**.
- ψ must be **normalisable**: total probability equals 1.
- **Boundary conditions** restrict the allowed solutions.
- These conditions produce quantised energy levels.
P: Schrödinger published his equation in 1926. Solving it for the hydrogen atom reproduces its energy levels and orbital shapes. For larger systems it is solved approximately using computers.
X: Hydrogen atom results.
> The potential is the attraction between proton and electron.
> Solutions are characterised by quantum numbers n, l and mₗ.
> Energies are Eₙ = −2.18 × 10⁻¹⁸ J ÷ n².
> These match the observed hydrogen emission spectrum.
K: The time-independent Schrödinger equation Ĥψ = Eψ gives allowed wavefunctions and energies; acceptable wavefunctions must be single-valued, continuous, finite and normalisable, and boundary conditions lead to quantisation, as in the hydrogen atom.
!: Thinking ψ itself is a probability. The probability density is |ψ|².
EV: established | The Schrödinger equation reproduces the energy levels of the hydrogen atom (Schrödinger, 1926).
T: Hamiltonian | The operator for total energy
T: Eigenvalue | An allowed value obtained from an operator equation
T: Normalisation | Scaling ψ so total probability is 1
SUM: Ĥψ = Eψ.
SUM: Eigenfunctions and eigenvalues.
SUM: Boundary conditions quantise.
SRC: Schrödinger E., "Quantisierung als Eigenwertproblem", Annalen der Physik 384(4), 361–376 | primary | 1926
SRC: Atkins P., de Paula J. and Keeler J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: What is the time-independent Schrödinger equation? | Ĥψ = Eψ.
Q: What does normalisation ensure? | The total probability of finding the particle is 1.
M1#chemistry-u16-04-q1@1: What does the Hamiltonian operator represent? | Total energy: kinetic plus potential | Only the potential energy | The momentum of a particle | The position of a particle | The Hamiltonian sums kinetic and potential terms.
M2#chemistry-u16-04-q2@2: Why does the Schrödinger equation lead to quantised energies? | Boundary conditions allow only certain solutions | All energies are always allowed | The equation has no solutions | Energy is never conserved | Only wavefunctions that fit the conditions are acceptable.
NUM1#chemistry-u16-04-q3@2: Using Eₙ = −2.18 × 10⁻¹⁸ J ÷ n², what is the size of E₂ in units of 10⁻¹⁹ J? | 5.45 | 0.05 | × 10⁻¹⁹ J | 2.18 × 10⁻¹⁸ ÷ 4 = 5.45 × 10⁻¹⁹ J, so E₂ = −5.45 × 10⁻¹⁹ J.
M3#chemistry-u16-04-q4@3: Why must acceptable wavefunctions be finite and continuous? | Probability must be physically meaningful everywhere | Wavefunctions must be infinite at nuclei | Continuity has no physical meaning | Only the energy needs to be finite | Infinite or broken ψ would give impossible probabilities.
SA2#chemistry-u16-04-q5@1,3: Explain the Schrödinger equation and its consequences. | The time-independent Schrödinger equation, Ĥψ = Eψ, has the Hamiltonian operator, representing kinetic plus potential energy, acting on a wavefunction to give the energy times the wavefunction. Solutions are eigenfunctions with eigenvalue energies. Acceptable wavefunctions are single-valued, continuous, finite and normalisable, and boundary conditions restrict solutions so energy is quantised. For hydrogen, solutions are labelled by n, l and mₗ with energies −2.18 × 10⁻¹⁸ J ÷ n², matching its spectrum. | Equation ; Hamiltonian ; Eigenvalues ; Acceptable wavefunctions ; Hydrogen atom

## Particle in a box
LV: Year 1 · Chemical reasoning
S: The particle in a box is the simplest quantum model. This lesson derives its energy levels and applies them to conjugated molecules.
O: Describe the particle-in-a-box model
O: Calculate energy levels using Eₙ = n²h²/8mL²
O: Apply the model to conjugated dyes
H: The model
- A particle is confined in a 1D box of length L with infinite walls.
- ψ must be zero at the walls.
- Allowed energies: **Eₙ = n²h² / (8mL²)**, n = 1, 2, 3…
- The lowest energy is **not zero**: **zero-point energy**.
D: chem-particle-box
H: Consequences
- Energy levels are spaced further apart as n increases.
- A **smaller box** gives **larger** energy gaps.
- A **heavier particle** gives smaller gaps.
- Nodes in ψ increase with n: n − 1 nodes.
P: π electrons in a conjugated chain behave roughly like particles in a box. Longer chains mean larger L and smaller gaps, so absorption shifts to longer wavelengths, explaining why long conjugated dyes are coloured. Quantum dots show size-dependent colours for the same reason.
X: Quantum dots.
> Quantum dots are nanocrystals a few nm across.
> Electrons are confined in a small "box".
> Smaller dots have larger energy gaps and emit blue light.
> Larger dots have smaller gaps and emit red light.
K: In the particle-in-a-box model, Eₙ = n²h²/8mL², with nonzero zero-point energy; energy gaps grow as the box shrinks, explaining colour in conjugated dyes and size-dependent emission from quantum dots.
!: Thinking the particle can have zero energy. Confinement guarantees a minimum zero-point energy.
EV: established | Size-dependent emission of quantum dots arises from quantum confinement (Brus, 1984).
T: Particle in a box | A quantum model of a confined particle
T: Zero-point energy | The lowest possible energy, which is not zero
T: Quantum dot | A nanocrystal with size-dependent optical properties
SUM: Eₙ ∝ n²/L².
SUM: Zero-point energy.
SUM: Dyes and quantum dots.
SRC: Brus L. E., "Electron-electron and electron-hole interactions in small semiconductor crystallites", Journal of Chemical Physics 80(9), 4403–4409 | primary | 1984
SRC: Kuhn H., "A quantum-mechanical theory of light absorption of organic dyes and similar compounds", Journal of Chemical Physics 17(12), 1198–1212 | primary | 1949
Q: What is the energy formula for a particle in a box? | Eₙ = n²h² / (8mL²).
Q: Why is the lowest energy not zero? | Confinement gives a zero-point energy.
M1#chemistry-u16-05-q1@1: How does the energy gap change if the box is made smaller? | It increases | It decreases | It stays the same | It becomes zero | Energy is inversely proportional to L², so a smaller box gives bigger gaps.
M2#chemistry-u16-05-q2@2: Why do longer conjugated chains absorb at longer wavelengths? | A longer "box" narrows the energy gaps | Longer chains have larger gaps | Conjugation does not affect absorption | Electrons are heavier in long chains | Larger L lowers the energy needed for transitions.
NUM1#chemistry-u16-05-q3@2: How many times higher is E₃ than E₁ for a particle in a box? | 9 | 0 | times | Eₙ ∝ n², so E₃ / E₁ = 9 / 1 = 9 times higher.
M3#chemistry-u16-05-q4@3: Why do smaller quantum dots emit bluer light? | Stronger confinement gives larger energy gaps and higher-energy photons | Smaller dots contain many more electrons | The size of the dot has no effect on emission | Larger dots always emit the bluest light | Energy rises as the box shrinks, so emitted photons have shorter wavelengths.
SA2#chemistry-u16-05-q5@1,3: Explain the particle-in-a-box model and its applications. | A particle confined in a box of length L with infinite walls must have ψ = 0 at the walls, giving energies Eₙ = n²h²/8mL² with n = 1, 2, 3; the lowest energy is not zero, the zero-point energy. Smaller boxes and lighter particles give larger gaps, and ψ has n − 1 nodes. π electrons in conjugated dyes behave like particles in a box, so longer chains absorb at longer wavelengths. Quantum dots show size-dependent colours, with smaller dots emitting bluer light. | Model ; Energy formula ; Zero-point energy ; Conjugated dyes ; Quantum dots

## Harmonic oscillator
LV: Year 1 · Chemical reasoning
S: The harmonic oscillator models molecular vibrations. This lesson explains its energy levels and limitations.
O: Describe the harmonic oscillator model of a vibrating bond
O: Calculate vibrational energy levels
O: Explain anharmonicity and bond dissociation
H: The model
- A bond acts like a spring obeying Hooke's law.
- Energy levels: **Eᵥ = (v + ½)hν**, v = 0, 1, 2…
- Levels are **equally spaced** by hν.
- Frequency depends on **force constant k** and **reduced mass μ**: ν = (1/2π)√(k/μ).
D: chem-harmonic-oscillator
H: Real bonds
- Real bonds are **anharmonic**: levels get closer at high energy.
- Bonds eventually **dissociate**, which a spring cannot do.
- The **Morse potential** models this better.
- **Overtones** (Δv = 2, 3) appear weakly because of anharmonicity.
P: Stronger bonds and lighter atoms vibrate faster, which explains why C–H stretches appear at higher wavenumbers than C–Cl. Replacing hydrogen with deuterium lowers the frequency by about √2, used to assign IR peaks.
X: Isotope effect on vibration.
> C–H stretch: about 3000 cm⁻¹.
> Replace H with D: the reduced mass roughly doubles.
> Frequency falls by about √2.
> C–D stretch appears near 2100 cm⁻¹.
K: The harmonic oscillator gives equally spaced vibrational levels Eᵥ = (v + ½)hν with frequency depending on force constant and reduced mass; real bonds are anharmonic, with converging levels, overtones and dissociation described by the Morse potential.
!: Thinking vibrational energy can be zero. The lowest level has zero-point energy ½hν.
EV: established | The Morse potential models anharmonic molecular vibrations (Morse, 1929).
T: Force constant | A measure of bond stiffness
T: Reduced mass | μ = m₁m₂/(m₁ + m₂)
T: Anharmonicity | Deviation from ideal spring behaviour
SUM: Equal spacing.
SUM: k and μ set frequency.
SUM: Real bonds are anharmonic.
SRC: Morse P. M., "Diatomic molecules according to the wave mechanics. II. Vibrational levels", Physical Review 34(1), 57–64 | primary | 1929
SRC: Atkins P., de Paula J. and Keeler J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: What is the formula for harmonic oscillator energy levels? | Eᵥ = (v + ½)hν.
Q: What model describes anharmonic bonds? | The Morse potential.
M1#chemistry-u16-06-q1@1: How are harmonic oscillator energy levels spaced? | Equally, by hν | Further apart at higher v | Closer together at higher v | Randomly | The harmonic model gives constant spacing.
M2#chemistry-u16-06-q2@2: Why does a C–D bond vibrate at lower frequency than C–H? | Deuterium's greater mass increases the reduced mass | The C–D bond is much stronger | Deuterium has fewer electrons | Frequency does not depend on mass | Frequency is proportional to √(k/μ), so a larger reduced mass lowers it.
NUM1#chemistry-u16-06-q3@3: A C–H stretch is at 3000 cm⁻¹. Dividing by √2, where is the C–D stretch? | 2121 | 30 | cm⁻¹ | 3000 ÷ 1.414 ≈ 2121 cm⁻¹, matching the observed C–D region.
M3#chemistry-u16-06-q4@3: Why do overtone bands appear weakly in IR spectra? | Anharmonicity relaxes the Δv = ±1 selection rule | Harmonic oscillators allow all transitions equally | Overtones are always the strongest bands | Only Raman shows overtones | Without anharmonicity, overtones would be forbidden.
SA2#chemistry-u16-06-q5@1,3: Explain the harmonic oscillator model of molecular vibration. | A bond behaves like a spring obeying Hooke's law, giving equally spaced vibrational levels Eᵥ = (v + ½)hν, with zero-point energy ½hν. The frequency ν = (1/2π)√(k/μ) increases with force constant and decreases with reduced mass, so C–D vibrates at about 1/√2 of C–H. Real bonds are anharmonic: levels converge at higher energy and bonds dissociate, modelled by the Morse potential, and weak overtones appear because anharmonicity relaxes the Δv = ±1 rule. | Spring model ; Energy levels ; Frequency ; Isotope effect ; Anharmonicity

## Rotational spectroscopy
LV: Year 1 · Chemical reasoning
S: Rotational spectroscopy measures molecular rotation using microwaves. This lesson explains rotational levels and how they give bond lengths.
O: Describe rotational energy levels of a rigid rotor
O: Explain the selection rules for rotational spectra
O: Calculate bond lengths from rotational constants
H: Rigid rotor
- Energy levels: **E_J = BJ(J + 1)**, where J = 0, 1, 2…
- **B** is the rotational constant, inversely proportional to **moment of inertia I**.
- **I = μr²** for a diatomic molecule.
- Lines appear at 2B, 4B, 6B…, spaced by **2B**.
D: chem-rotational-levels
H: Selection rules
- The molecule must have a **permanent dipole moment**.
- **ΔJ = ±1**.
- Homonuclear diatomics such as N₂ have no microwave spectrum.
- Rotational transitions occur in the **microwave** region.
P: Rotational spectroscopy gives extremely precise bond lengths for gas-phase molecules. Radio astronomers identify molecules in interstellar space, such as CO and many organic species, from their rotational lines. Microwave ovens heat food by making water molecules rotate.
X: Bond length of CO.
> Lines in the CO spectrum are spaced by 3.86 cm⁻¹.
> So 2B = 3.86 cm⁻¹ and B = 1.93 cm⁻¹.
> B gives the moment of inertia I.
> With μ for CO, r = 0.113 nm.
K: Rigid rotor levels are E_J = BJ(J + 1), with B inversely proportional to the moment of inertia; molecules need a permanent dipole and follow ΔJ = ±1, giving microwave lines spaced by 2B that yield precise bond lengths.
!: Expecting all molecules to show rotational spectra. Molecules without a dipole, such as N₂, do not.
EV: established | Rotational spectra of interstellar molecules are detected by radio astronomy (Wilson, Jefferts and Penzias, 1970).
T: Rotational constant | B, related to the moment of inertia
T: Moment of inertia | I = μr² for a diatomic molecule
T: Microwave region | The part of the spectrum causing rotational transitions
SUM: E_J = BJ(J + 1).
SUM: Dipole needed.
SUM: Lines give bond lengths.
SRC: Wilson R. W., Jefferts K. B. and Penzias A. A., "Carbon monoxide in the Orion nebula", Astrophysical Journal 161, L43–L44 | primary | 1970
SRC: Banwell C. N. and McCash E. M., Fundamentals of Molecular Spectroscopy, 4th edition, McGraw-Hill | secondary | 1994
Q: What is the rotational selection rule? | ΔJ = ±1.
Q: What is the spacing between rotational lines? | 2B.
M1#chemistry-u16-07-q1@1: Which molecule has no pure rotational spectrum? | N₂ | HCl | CO | H₂O | N₂ has no permanent dipole moment, so it cannot absorb microwaves.
M2#chemistry-u16-07-q2@2: Why does a heavier molecule have closer rotational lines? | A larger moment of inertia gives a smaller B | Heavier molecules rotate faster | B increases with mass | Line spacing is independent of mass | B is inversely proportional to I, so a heavier molecule has smaller spacing.
NUM1#chemistry-u16-07-q3@2: Rotational lines are spaced by 20.8 cm⁻¹. What is B in cm⁻¹? | 10.4 | 0.1 | cm⁻¹ | Spacing is 2B, so B = 20.8 ÷ 2 = 10.4 cm⁻¹.
M3#chemistry-u16-07-q4@3: How do astronomers identify molecules in space? | By matching rotational lines observed with radio telescopes | By collecting samples directly from stars | By measuring the colour of clouds by eye | By weighing interstellar clouds of gas | Each molecule has a characteristic rotational spectrum.
SA2#chemistry-u16-07-q5@1,3: Explain rotational spectroscopy and its uses. | Treating a molecule as a rigid rotor gives levels E_J = BJ(J + 1), with B inversely proportional to the moment of inertia, I = μr². A permanent dipole is needed and ΔJ = ±1, so lines appear in the microwave region spaced by 2B; N₂ shows none. From the spacing, B and I give precise bond lengths, such as 0.113 nm for CO. Radio astronomers identify interstellar molecules from rotational lines, and microwave ovens heat food by rotating water molecules. | Rigid rotor ; Rotational constant ; Selection rules ; Bond lengths ; Applications

## Vibrational spectroscopy
LV: Year 1 · Chemical reasoning
S: Vibrational spectroscopy studies how molecules vibrate. This lesson explains normal modes and how to count them.
O: Calculate the number of vibrational modes of a molecule
O: Describe normal modes of vibration
O: Explain the gross selection rules for IR and Raman
H: Normal modes
- A molecule with N atoms has **3N** degrees of freedom.
- **Linear** molecules: 3N − 5 vibrations; **non-linear**: 3N − 6.
- Each **normal mode** is an independent pattern of motion.
- Modes include symmetric and asymmetric stretches and bends.
D: chem-morse
H: Selection rules
- **IR active**: the mode changes the dipole moment.
- **Raman active**: the mode changes polarisability.
- In molecules with an inversion centre, modes are IR or Raman active, not both (**mutual exclusion**).
- Vibrational spectra often show rotational fine structure in the gas phase.
P: CO₂ has four vibrational modes: a symmetric stretch (Raman active only), an asymmetric stretch and two bends (IR active). Its IR-active modes make it a greenhouse gas. Water's three modes are all IR active.
X: Counting modes of water.
> Water has N = 3 atoms and is non-linear.
> 3N − 6 = 3 vibrational modes.
> Symmetric stretch, asymmetric stretch and bend.
> All three change the dipole, so all are IR active.
K: Molecules have 3N − 6 vibrational modes (3N − 5 if linear), each an independent normal mode; modes changing the dipole are IR active and those changing polarisability are Raman active, with mutual exclusion in centrosymmetric molecules.
!: Forgetting that linear molecules have one extra vibration. They lose only two rotations, not three.
EV: established | The rule of mutual exclusion applies to centrosymmetric molecules (Herzberg, 1945).
T: Normal mode | An independent pattern of molecular vibration
T: Degrees of freedom | Independent ways a molecule can move
T: Mutual exclusion | In centrosymmetric molecules, modes are IR or Raman active, not both
SUM: 3N − 6 or 3N − 5.
SUM: Normal modes.
SUM: IR and Raman rules.
SRC: Herzberg G., Molecular Spectra and Molecular Structure II: Infrared and Raman Spectra of Polyatomic Molecules, Van Nostrand | secondary | 1945
SRC: Banwell C. N. and McCash E. M., Fundamentals of Molecular Spectroscopy, 4th edition, McGraw-Hill | secondary | 1994
Q: How many vibrational modes does a non-linear molecule have? | 3N − 6.
Q: Which CO₂ vibration is IR inactive? | The symmetric stretch.
M1#chemistry-u16-08-q1@1: How many vibrational modes does CO₂ have? | 4 | 3 | 2 | 6 | Linear CO₂ has 3 × 3 − 5 = 4 vibrational modes in total.
M2#chemistry-u16-08-q2@2: Why is CO₂'s symmetric stretch not IR active? | It does not change the dipole moment | It changes the dipole strongly | It breaks the molecule apart | It changes the mass of the molecule | Both C=O bonds stretch equally, keeping zero dipole.
NUM1#chemistry-u16-08-q3@2: How many vibrational modes does methane (CH₄, 5 atoms) have? | 9 | 0 | modes | Non-linear: 3 × 5 − 6 = 9 vibrational modes.
M3#chemistry-u16-08-q4@3: Why does the rule of mutual exclusion apply only to molecules with an inversion centre? | Symmetry under inversion makes dipole and polarisability changes incompatible | All molecules show mutual exclusion | It only applies to linear molecules without symmetry | It depends on molecular mass | Inversion symmetry separates the two activity types.
SA2#chemistry-u16-08-q5@1,3: Explain normal modes and selection rules in vibrational spectroscopy. | A molecule with N atoms has 3N degrees of freedom; removing translations and rotations leaves 3N − 6 vibrations for non-linear and 3N − 5 for linear molecules, so water has three and CO₂ four. Each normal mode is an independent pattern such as a symmetric stretch, asymmetric stretch or bend. Modes changing the dipole are IR active and those changing polarisability Raman active. In centrosymmetric molecules such as CO₂, mutual exclusion applies: the symmetric stretch is Raman only. | Counting modes ; Normal modes ; IR rule ; Raman rule ; Mutual exclusion

## Electronic transitions
LV: Year 1 · Chemical reasoning
S: Electronic transitions move electrons between molecular orbitals. This lesson classifies transitions and explains their selection rules.
O: Classify electronic transitions in organic molecules
O: Explain the Franck-Condon principle
O: Describe spin and symmetry selection rules
H: Types of transition
- **σ → σ***: high energy, far UV.
- **π → π***: strong absorption, in UV-visible for conjugated systems.
- **n → π***: weak, from lone pairs, as in carbonyls.
- **Charge transfer**: electron moves between parts of a molecule or complex.
D: chem-franck-condon
H: Rules and shapes
- **Franck-Condon principle**: electrons move so fast that nuclei do not move during a transition.
- This gives **vibrational structure** in electronic bands.
- **Spin selection rule**: singlet-to-triplet transitions are forbidden.
- **Laporte rule**: transitions within the same subshell (d-d) are forbidden in centrosymmetric molecules.
P: Forbidden transitions are not impossible but are weak. This is why d-d bands in octahedral complexes are pale, while charge-transfer bands are intense. The weak n → π* band of propanone appears near 280 nm.
X: Propanone's absorptions.
> A strong π → π* band near 190 nm.
> A weak n → π* band near 280 nm.
> The n → π* transition is partly symmetry forbidden.
> So it has a much lower molar absorptivity.
K: Electronic transitions include σ → σ*, π → π*, n → π* and charge transfer; the Franck-Condon principle explains vibrational structure in bands and spin and Laporte selection rules make some transitions weak.
!: Thinking forbidden transitions never occur. They occur weakly when rules are partly relaxed.
EV: established | The Franck-Condon principle explains intensity patterns in electronic spectra (Franck, 1926; Condon, 1926).
T: Franck-Condon principle | Nuclei stay fixed during an electronic transition
T: Laporte rule | Forbids transitions without parity change in centrosymmetric systems
T: n → π* transition | Promotion of a lone-pair electron into a π* orbital
SUM: σσ*, ππ*, nπ*.
SUM: Franck-Condon.
SUM: Spin and Laporte rules.
SRC: Condon E., "A theory of intensity distribution in band systems", Physical Review 28(6), 1182–1201 | primary | 1926
SRC: Atkins P., de Paula J. and Keeler J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: What does the Franck-Condon principle state? | Nuclei do not move during an electronic transition.
Q: Which transition gives a weak band in carbonyl compounds? | n → π*.
M1#chemistry-u16-09-q1@1: Which transition is typically strongest in conjugated molecules? | π → π* | n → π* | σ → σ* in the far UV only | Spin-forbidden singlet to triplet | Allowed π → π* transitions have high absorptivity.
M2#chemistry-u16-09-q2@2: Why are d-d bands in octahedral complexes weak? | They are Laporte forbidden in centrosymmetric complexes | They are fully allowed by every rule | They involve charge transfer to ligands | They occur in the X-ray region only | Parity rules suppress transitions within d orbitals.
MATCH1#chemistry-u16-09-q3@2: Match each transition to its feature. | π → π* = Strong, conjugated systems ; n → π* = Weak, lone pairs ; σ → σ* = High energy, far UV ; Charge transfer = Intense colours | Electronic transitions differ in energy and intensity.
M3#chemistry-u16-09-q4@3: Why do electronic absorption bands show vibrational structure? | Transitions end in several vibrational levels of the excited state | Electrons vibrate while nuclei stay still | Bands are always single sharp lines | Vibrations do not affect electronic spectra | Franck-Condon overlap spreads intensity across levels.
SA2#chemistry-u16-09-q5@1,3: Explain types of electronic transition and their selection rules. | Electronic transitions include high-energy σ → σ*, strong π → π* in conjugated systems, weak n → π* from lone pairs, as in propanone near 280 nm, and intense charge-transfer transitions. The Franck-Condon principle says nuclei do not move during the fast transition, producing vibrational structure. Spin selection forbids singlet-triplet transitions, and the Laporte rule forbids d-d transitions in centrosymmetric molecules, so octahedral d-d bands are weak. Forbidden transitions occur weakly when rules are relaxed. | Transition types ; Intensities ; Franck-Condon ; Spin rule ; Laporte rule

## Atomic and molecular spectra
LV: Year 1 · Chemical reasoning
S: Atomic and molecular spectra arise from different kinds of energy change. This lesson compares them across the electromagnetic spectrum.
O: Compare energy scales of electronic, vibrational and rotational transitions
O: Explain why atomic spectra are lines and molecular spectra are bands
O: Relate spectral regions to the information they give
H: Energy scales
- **Electronic**: UV-visible, largest energy gaps.
- **Vibrational**: infrared.
- **Rotational**: microwave, smallest gaps.
- **Nuclear spin**: radio waves in a magnetic field (NMR).
D: chem-hydrogen-spectrum
H: Lines and bands
- Atoms have only electronic levels: sharp **line spectra**.
- Molecules add vibrational and rotational levels: **band spectra**.
- In solution, collisions broaden bands further.
- Gas-phase molecular spectra show fine structure.
P: Line spectra of atoms identify elements in stars and flames. The hydrogen spectrum's series (Lyman, Balmer, Paschen) correspond to transitions to n = 1, 2 and 3. Molecular band spectra combine electronic, vibrational and rotational changes.
X: The Balmer series.
> Electrons fall from higher levels to n = 2.
> The emitted light is in the visible region.
> The red line is from n = 3 to n = 2 at 656 nm.
> Lines converge at higher energy towards the ionisation limit.
K: Electronic, vibrational, rotational and nuclear spin transitions occur in UV-visible, infrared, microwave and radio regions; atoms give sharp line spectra, while molecules give bands due to added vibrational and rotational levels.
!: Expecting molecules to show sharp lines like atoms. Extra levels and collisions broaden their spectra.
EV: established | The Balmer series fits the Rydberg formula for hydrogen (Rydberg, 1890).
T: Line spectrum | A spectrum of sharp lines from atoms
T: Band spectrum | A spectrum of broad bands from molecules
T: Spectral series | A set of lines ending on the same level
SUM: Energy scales.
SUM: Lines versus bands.
SUM: Region gives information.
SRC: Rydberg J. R., "On the structure of the line-spectra of the chemical elements", Philosophical Magazine 29(179), 331–337 | primary | 1890
SRC: Banwell C. N. and McCash E. M., Fundamentals of Molecular Spectroscopy, 4th edition, McGraw-Hill | secondary | 1994
Q: Which region corresponds to vibrational transitions? | Infrared.
Q: What level do Balmer series transitions end on? | n = 2.
M1#chemistry-u16-10-q1@1: Which transitions have the smallest energy gaps? | Rotational transitions in the microwave region | Electronic transitions in the UV | Vibrational transitions in the IR | X-ray core transitions | Rotational levels are very closely spaced.
M2#chemistry-u16-10-q2@2: Why do molecules give band spectra rather than lines? | Vibrational and rotational levels add many closely spaced transitions | Molecules have no electronic levels | Atoms have more energy levels than molecules | Bands are produced only by collisions with walls | Each electronic transition is split by many sublevels.
MATCH1#chemistry-u16-10-q3@2: Match each transition to its spectral region. | Electronic = UV-visible ; Vibrational = Infrared ; Rotational = Microwave ; Nuclear spin = Radio | Energy gap sets the region.
M3#chemistry-u16-10-q4@3: How do astronomers use atomic line spectra? | Each element's unique lines reveal stellar composition | Stars emit only continuous spectra | Lines only show temperature | Lines are identical for all elements | Absorption and emission lines are elemental fingerprints.
SA2#chemistry-u16-10-q5@1,3: Compare atomic and molecular spectra across the electromagnetic spectrum. | Electronic transitions have the largest gaps and occur in the UV-visible, vibrational transitions in the infrared, rotational transitions in the microwave and nuclear spin transitions at radio frequencies in a magnetic field. Atoms have only electronic levels and give sharp line spectra, such as hydrogen's Balmer series ending on n = 2 with a red line at 656 nm. Molecules add vibrational and rotational levels and give band spectra, broadened further by collisions in solution. Line spectra reveal stellar composition. | Energy scales ; Regions ; Line spectra ; Band spectra ; Applications

## Statistical thermodynamics
LV: Year 1 · Chemical reasoning
S: Statistical thermodynamics links molecular energy levels to bulk properties. This lesson introduces its key ideas.
O: Explain how microscopic states relate to macroscopic properties
O: Describe the Boltzmann distribution
O: Relate entropy to the number of microstates
H: Microstates and macrostates
- A **macrostate** is described by bulk properties such as T, P and V.
- A **microstate** is one specific arrangement of molecules among energy levels.
- Many microstates correspond to one macrostate.
- The most probable macrostate has the most microstates.
D: chem-boltzmann-populations
H: Key results
- **Boltzmann distribution**: Nᵢ/N₀ = e^(−ΔE/kT).
- **Boltzmann entropy**: **S = k ln W**, where W is the number of microstates.
- Higher temperature populates higher levels.
- Thermodynamic quantities follow from energy levels.
P: Statistical thermodynamics explains why entropy increases: systems move towards macrostates with more microstates simply because they are overwhelmingly more probable. Boltzmann's equation S = k ln W is engraved on his tombstone in Vienna.
X: Population of an excited level.
> A level lies 2.0 × 10⁻²¹ J above the ground state.
> At 300 K, kT = 4.14 × 10⁻²¹ J.
> N₁/N₀ = e^(−2.0/4.14) = e^(−0.48) ≈ 0.62.
> About 62% as many molecules occupy the upper level.
K: Statistical thermodynamics connects microstates to bulk properties; the Boltzmann distribution gives relative populations of energy levels and S = k ln W links entropy to the number of microstates.
!: Thinking entropy is just disorder. It is a measure of the number of accessible microstates.
EV: established | Boltzmann's equation relates entropy to microstates (Boltzmann, 1877).
T: Microstate | A specific arrangement of particles among energy levels
T: Boltzmann distribution | Populations of levels as a function of energy and temperature
T: Boltzmann constant | k = 1.38 × 10⁻²³ J K⁻¹
SUM: Micro to macro.
SUM: Boltzmann distribution.
SUM: S = k ln W.
SRC: Boltzmann L., "Über die Beziehung zwischen dem zweiten Hauptsatze der mechanischen Wärmetheorie und der Wahrscheinlichkeitsrechnung", Wiener Berichte 76, 373–435 | primary | 1877
SRC: McQuarrie D. A., Statistical Mechanics, University Science Books | secondary | 2000
Q: What is Boltzmann's entropy formula? | S = k ln W.
Q: What happens to populations of higher levels as temperature rises? | They increase.
M1#chemistry-u16-11-q1@1: What does W represent in S = k ln W? | The number of microstates | The work done by the system | The weight of the sample | The wavelength of light | More accessible microstates mean higher entropy, as S = k ln W shows.
M2#chemistry-u16-11-q2@2: Why does entropy tend to increase? | Macrostates with more microstates are overwhelmingly more probable | Energy is always destroyed in natural processes | Molecules naturally prefer ordered arrangements | Temperature always falls as time passes | Probability drives systems towards the most numerous arrangements.
NUM1#chemistry-u16-11-q3@3: Using Nᵢ/N₀ = e^(−ΔE/kT), what ratio results when ΔE = kT? | 0.37 | 0.01 | ratio | e⁻¹ ≈ 0.37, so the upper level has 37% of the lower population.
M3#chemistry-u16-11-q4@3: Why do few molecules occupy high electronic levels at room temperature? | Electronic gaps are much larger than kT | kT is larger than electronic gaps | Boltzmann's law does not apply | All levels are equally occupied | A large ΔE/kT makes the Boltzmann factor e^(−ΔE/kT) extremely small.
SA2#chemistry-u16-11-q5@1,3: Explain the key ideas of statistical thermodynamics. | A macrostate is described by bulk properties, while a microstate is one specific arrangement of molecules among energy levels; many microstates make up each macrostate, and the most probable macrostate has the most. The Boltzmann distribution, Nᵢ/N₀ = e^(−ΔE/kT), gives relative populations, rising with temperature, so electronic levels are barely populated at room temperature. Boltzmann's equation S = k ln W relates entropy to the number of microstates, explaining why entropy increases. | Microstates ; Macrostates ; Boltzmann distribution ; Entropy ; Temperature

## Partition functions
LV: Year 1 · Chemical reasoning
S: The partition function summarises how molecules spread over energy levels. This lesson explains how it connects to thermodynamics.
O: Define the molecular partition function
O: Interpret the partition function physically
O: Describe contributions from different types of motion
H: Definition
- **q = Σ e^(−εᵢ/kT)**, summed over all energy levels.
- q measures the **number of thermally accessible states**.
- At very low T, q ≈ 1; at high T, q becomes large.
- Fraction in level i: **pᵢ = e^(−εᵢ/kT) / q**.
D: chem-partition-function
H: Contributions
- q = q_trans × q_rot × q_vib × q_elec.
- **Translational**: very large, many accessible states.
- **Rotational**: moderate at room temperature.
- **Vibrational and electronic**: usually close to 1.
P: Once q is known, thermodynamic properties such as internal energy, entropy and equilibrium constants can be calculated from molecular data. This allows equilibrium constants to be predicted from spectroscopic information.
X: A two-level system.
> Levels at 0 and ε, with ε = kT.
> q = 1 + e⁻¹ = 1.37.
> Fraction in ground state = 1 / 1.37 = 0.73.
> Fraction in upper state = 0.27.
K: The molecular partition function q = Σ e^(−εᵢ/kT) measures how many states are thermally accessible, gives level populations and factorises into translational, rotational, vibrational and electronic parts from which thermodynamic properties follow.
!: Thinking q is a fixed property of a molecule. It depends strongly on temperature.
EV: established | Partition functions connect molecular energy levels to thermodynamic properties (McQuarrie, 2000).
T: Partition function | q = Σ e^(−εᵢ/kT)
T: Thermally accessible | Populated significantly at a given temperature
T: Factorisation | Splitting q into independent contributions
SUM: Sum over states.
SUM: Accessible states.
SUM: Leads to thermodynamics.
SRC: McQuarrie D. A., Statistical Mechanics, University Science Books | secondary | 2000
SRC: Atkins P., de Paula J. and Keeler J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: What does the partition function measure? | The number of thermally accessible states.
Q: What is q close to at very low temperature? | 1.
M1#chemistry-u16-12-q1@1: Which contribution to q is usually largest? | Translational | Electronic | Vibrational | Nuclear | Translational levels are extremely closely spaced.
M2#chemistry-u16-12-q2@2: Why are vibrational partition functions often close to 1 at room temperature? | Vibrational gaps are large compared with kT, so mainly v = 0 is populated | Vibrational levels are very closely spaced | Molecules do not vibrate at all at room temperature | kT is much larger than any vibrational gap | Only the ground vibrational level contributes significantly.
NUM1#chemistry-u16-12-q3@3: Two levels at 0 and ε with ε = kT give q = 1.37. What fraction is in the ground state? | 0.73 | 0.01 | fraction | p₀ = 1 ÷ 1.37 = 0.73 of molecules in the ground state.
M3#chemistry-u16-12-q4@3: Why is the partition function so useful? | Thermodynamic properties can be calculated from it using molecular data | It replaces the need for energy levels | It is constant at all temperatures | It only applies to solids | It bridges molecular structure and bulk behaviour.
SA2#chemistry-u16-12-q5@1,3: Explain the molecular partition function. | The partition function q = Σ e^(−εᵢ/kT) sums Boltzmann factors over energy levels and measures the number of thermally accessible states: about 1 at low temperature and large at high temperature. The fraction in level i is e^(−εᵢ/kT)/q, so a two-level system with ε = kT has 73% in the ground state. q factorises into translational, rotational, vibrational and electronic parts; translational is largest, and vibrational and electronic are often near 1. Thermodynamic properties and equilibrium constants follow from q. | Definition ; Interpretation ; Populations ; Contributions ; Thermodynamics

## Molecular energy distributions
LV: Year 1 · Chemical reasoning
S: Molecules in a gas have a range of speeds and energies. This lesson explores the Maxwell-Boltzmann distribution and its consequences.
O: Describe the Maxwell-Boltzmann distribution of molecular speeds
O: Explain how temperature and mass affect the distribution
O: Relate the distribution to reaction rates
H: The distribution
- Molecules have a range of speeds, not one speed.
- The curve starts at zero, rises to a peak and has a long tail.
- **Most probable speed** < **mean speed** < **root-mean-square speed**.
- Area under the curve equals the total number of molecules.
D: chem-collision-ea
H: Effects
- **Higher temperature**: curve flattens and shifts to higher speeds.
- **Heavier molecules**: lower speeds at the same temperature.
- The fraction with energy above Eₐ rises sharply with temperature.
- This explains the strong temperature dependence of rates.
P: The mean speed of N₂ molecules at room temperature is about 470 m s⁻¹. Light gases such as hydrogen and helium escape from Earth's atmosphere because a significant fraction of molecules exceed escape velocity.
X: Effect of a 10 °C rise.
> At 300 K, a small fraction of molecules exceed Eₐ.
> At 310 K, the curve shifts slightly right.
> The area beyond Eₐ can roughly double.
> The reaction rate roughly doubles.
K: The Maxwell-Boltzmann distribution describes the range of molecular speeds and energies; higher temperature flattens and shifts it, heavier molecules move slower and the fraction above the activation energy rises steeply with temperature, explaining rate changes.
!: Thinking all molecules in a gas move at the same speed. There is a broad distribution.
EV: established | Maxwell derived the distribution of molecular speeds in gases (Maxwell, 1860).
T: Maxwell-Boltzmann distribution | Distribution of molecular speeds or energies in a gas
T: Most probable speed | The speed at the peak of the distribution
T: Root-mean-square speed | Square root of the mean of squared speeds
SUM: Range of speeds.
SUM: Temperature and mass.
SUM: Links to rate.
SRC: Maxwell J. C., "Illustrations of the dynamical theory of gases", Philosophical Magazine 19(124), 19–32 | primary | 1860
SRC: Atkins P., de Paula J. and Keeler J., Atkins' Physical Chemistry, 11th edition, Oxford University Press | secondary | 2018
Q: What happens to the distribution at higher temperature? | It flattens and shifts to higher speeds.
Q: Which is larger, the most probable or the mean speed? | The mean speed.
M1#chemistry-u16-13-q1@1: How does molecular mass affect speed at the same temperature? | Heavier molecules move more slowly on average | Heavier molecules move faster | Mass has no effect on speed | All gases have identical speed distributions | Equal average kinetic energy means lower speed for larger mass.
M2#chemistry-u16-13-q2@2: Why does a small temperature rise greatly increase reaction rate? | The fraction of molecules above Eₐ increases sharply | All molecules gain exactly Eₐ | The activation energy falls to zero | The number of molecules doubles | The high-energy tail grows rapidly with temperature.
MATCH1#chemistry-u16-13-q3@2: Match each speed to its position. | Most probable speed = Peak of the curve ; Mean speed = Slightly above the peak ; RMS speed = Highest of the three ; Escape fraction = Far tail | The distribution is skewed to the right.
M3#chemistry-u16-13-q4@3: Why does hydrogen slowly escape from Earth's atmosphere? | Its light molecules have a tail of speeds exceeding escape velocity | Hydrogen molecules are heavier than nitrogen | Gravity does not act on hydrogen molecules | Hydrogen molecules do not move in the air | Light molecules move fastest at a given temperature.
SA2#chemistry-u16-13-q5@1,3: Explain the Maxwell-Boltzmann distribution and its effects. | Molecules in a gas have a range of speeds: the distribution rises from zero to a peak and has a long tail, with most probable < mean < root-mean-square speed. Higher temperature flattens the curve and shifts it to higher speeds, and heavier molecules move more slowly. The fraction of molecules with energy above the activation energy rises sharply with temperature, so a 10 °C rise can roughly double a rate. Light gases such as hydrogen escape Earth because some molecules exceed escape velocity. | Shape ; Speeds ; Temperature ; Mass ; Reaction rates

## Chemical kinetics
LV: Year 1 · Chemical reasoning
S: This lesson explores advanced kinetics, including collision and transition state theories and complex mechanisms.
O: Compare collision theory and transition state theory
O: Apply the steady-state approximation
O: Describe chain and enzyme kinetics
H: Theories
- **Collision theory**: rate depends on collision frequency, energy and orientation (steric factor).
- **Transition state theory**: reactants are in equilibrium with an **activated complex**.
- The **Eyring equation** relates k to ΔG‡, the Gibbs energy of activation.
- ΔH‡ and ΔS‡ give insight into the transition state.
D: chem-kinetics-integrated
H: Complex mechanisms
- **Steady-state approximation**: concentrations of reactive intermediates stay constant.
- **Chain reactions** have initiation, propagation and termination.
- **Michaelis-Menten** kinetics describes enzyme reactions.
- Rate laws are derived from proposed mechanisms and compared with experiment.
P: Transition state theory improves on collision theory by including entropy effects. A large negative ΔS‡ indicates a highly ordered transition state, as in bimolecular associations. Enzyme rates saturate at high substrate concentration, reaching Vmax.
X: Michaelis-Menten behaviour.
> At low [S], rate ∝ [S] (first order).
> At high [S], all enzymes are occupied.
> Rate approaches Vmax (zero order).
> Km is [S] at half Vmax.
K: Collision theory considers collision frequency, energy and orientation, while transition state theory uses an activated complex and the Eyring equation; the steady-state approximation handles intermediates, and chain and Michaelis-Menten kinetics describe complex mechanisms.
!: Assuming every collision with enough energy reacts. Orientation also matters.
EV: established | Transition state theory relates rate constants to activation parameters (Eyring, 1935).
T: Transition state theory | Theory treating an activated complex in equilibrium with reactants
T: Steady-state approximation | Intermediate concentrations stay roughly constant
T: Michaelis constant | Km, substrate concentration at half Vmax
SUM: Collision and TST.
SUM: Steady state.
SUM: Chains and enzymes.
SRC: Eyring H., "The activated complex in chemical reactions", Journal of Chemical Physics 3(2), 107–115 | primary | 1935
SRC: Michaelis L. and Menten M. L., "Die Kinetik der Invertinwirkung", Biochemische Zeitschrift 49, 333–369 | primary | 1913
Q: What does the steric factor account for? | The need for correct orientation in collisions.
Q: What is Km? | The substrate concentration at half the maximum rate.
M1#chemistry-u16-14-q1@1: What does a large negative ΔS‡ suggest? | A highly ordered transition state | A very disordered transition state | No transition state at all | A reaction that never occurs | Losing freedom forming the complex lowers entropy.
M2#chemistry-u16-14-q2@2: Why does enzyme rate level off at high substrate concentration? | All enzyme active sites are occupied | The substrate decomposes | The enzyme is destroyed | The rate always rises without limit | Saturation of all active sites gives the maximum rate, Vmax.
NUM1#chemistry-u16-14-q3@2: An enzyme has Vmax = 80 μmol min⁻¹. What is the rate when [S] = Km? | 40 | 1 | μmol min⁻¹ | At [S] = Km, the rate equals Vmax ÷ 2 = 40 μmol min⁻¹.
M3#chemistry-u16-14-q4@3: Why is the steady-state approximation useful? | It lets rate laws be derived for mechanisms with short-lived intermediates | It assumes all concentrations are zero | It removes the need for experiments | It only applies to equilibria | Setting d[I]/dt ≈ 0 simplifies the algebra.
SA2#chemistry-u16-14-q5@1,3: Compare theories and models used in chemical kinetics. | Collision theory says rate depends on collision frequency, the fraction with enough energy and a steric factor for orientation. Transition state theory treats reactants in equilibrium with an activated complex, and the Eyring equation relates rate constants to ΔG‡, with ΔH‡ and ΔS‡ describing the transition state. The steady-state approximation keeps intermediate concentrations constant to derive rate laws. Chain reactions involve initiation, propagation and termination, and Michaelis-Menten kinetics shows enzyme rates saturating at Vmax, with Km at half Vmax. | Collision theory ; Transition state theory ; Steady state ; Chains ; Enzymes

## Surface chemistry
LV: Year 1 · Chemical reasoning
S: Surface chemistry studies processes at the boundaries of solids. This lesson explains why surfaces are special and how they are studied.
O: Explain why surface atoms behave differently from bulk atoms
O: Describe the importance of surface area
O: Describe techniques for studying surfaces
H: Why surfaces matter
- Surface atoms have **fewer neighbours**, so they are more reactive.
- **Surface energy** makes surfaces tend to minimise their area.
- **Nanoparticles** have a high proportion of surface atoms.
- Many reactions happen only at surfaces, as in heterogeneous catalysis.
D: chem-langmuir
H: Studying surfaces
- **Scanning tunnelling microscopy (STM)** images individual atoms.
- **X-ray photoelectron spectroscopy (XPS)** identifies surface elements and oxidation states.
- **Ultra-high vacuum** keeps surfaces clean.
- **BET** analysis measures surface area by gas adsorption.
P: Gerhard Ertl's studies of reactions on surfaces, including the Haber process on iron, earned the 2007 Nobel Prize. Surface science explains catalysis, corrosion, sensors and semiconductor devices.
X: Surface area of nanoparticles.
> A 1 cm cube of gold has a tiny fraction of atoms at the surface.
> Divided into 5 nm particles, a large fraction is at the surface.
> Gold nanoparticles become catalytically active.
> Bulk gold is famously unreactive.
K: Surface atoms have fewer neighbours and higher energy, making surfaces reactive; high surface area, especially in nanoparticles, increases activity, and techniques such as STM, XPS and BET reveal surface structure and composition.
!: Thinking materials behave the same at all sizes. Nanoparticles can behave very differently from bulk.
EV: established | Surface science revealed mechanisms of heterogeneous catalysis (Ertl, 2008).
T: Surface energy | Extra energy of atoms at a surface
T: STM | Scanning tunnelling microscopy
T: BET analysis | Measuring surface area by gas adsorption
SUM: Surface atoms differ.
SUM: Surface area matters.
SUM: STM, XPS, BET.
SRC: Ertl G., "Reactions at surfaces: from atoms to complexity (Nobel lecture)", Angewandte Chemie International Edition 47(19), 3524–3535 | primary | 2008
SRC: Somorjai G. A. and Li Y., Introduction to Surface Chemistry and Catalysis, 2nd edition, Wiley | secondary | 2010
Q: Why are surface atoms more reactive than bulk atoms? | They have fewer neighbouring atoms.
Q: What does XPS identify? | Surface elements and their oxidation states.
M1#chemistry-u16-15-q1@1: Which technique can image individual surface atoms? | Scanning tunnelling microscopy | Infrared spectroscopy | Thin-layer chromatography | Flame testing | STM measures a tunnelling current at atomic resolution.
M2#chemistry-u16-15-q2@2: Why are gold nanoparticles catalytically active while bulk gold is not? | A large fraction of their atoms are at the surface with unusual properties | Nanoparticles contain completely different elements | Bulk gold has much more surface area per gram | Gold changes into another metal when divided | Size changes surface structure and electronic properties.
MATCH1#chemistry-u16-15-q3@2: Match each technique to what it measures. | STM = Atomic images ; XPS = Surface composition ; BET = Surface area ; LEED = Surface ordering | Surface techniques reveal different features.
M3#chemistry-u16-15-q4@3: Why are surface experiments often done in ultra-high vacuum? | To keep surfaces free of contaminating gas molecules | To make surfaces hotter | Vacuum increases surface energy | Air improves all measurements | Even trace gases cover a surface quickly.
SA2#chemistry-u16-15-q5@1,3: Explain why surfaces are important and how they are studied. | Surface atoms have fewer neighbours than bulk atoms, giving surface energy and higher reactivity, and many reactions, such as heterogeneous catalysis, occur only at surfaces. Nanoparticles have a large proportion of surface atoms, so gold nanoparticles become catalytic while bulk gold is inert. Surfaces are studied in ultra-high vacuum to keep them clean, using STM to image atoms, XPS to identify elements and oxidation states and BET gas adsorption to measure area. Ertl's work explained the Haber process. | Surface atoms ; Surface area ; Nanoparticles ; Techniques ; Applications

## Adsorption
LV: Year 1 · Chemical reasoning
S: Adsorption is the binding of molecules to a surface. This lesson compares physisorption and chemisorption and introduces adsorption isotherms.
O: Distinguish physisorption and chemisorption
O: Describe the Langmuir isotherm
O: Explain the role of adsorption in catalysis
H: Types
- **Physisorption**: weak London forces, low enthalpy (about −20 kJ mol⁻¹), multilayers possible, reversible.
- **Chemisorption**: chemical bonds form, high enthalpy (about −200 kJ mol⁻¹), monolayer only.
- Adsorption is usually **exothermic**.
- **Adsorption** (on a surface) differs from **absorption** (into a bulk).
D: chem-physisorption
H: Langmuir isotherm
- Assumes a **monolayer** with equivalent, independent sites.
- **θ = KP / (1 + KP)**, where θ is the fraction of sites covered.
- At low pressure, θ ∝ P; at high pressure, θ → 1.
- Real surfaces may deviate from these assumptions.
P: In heterogeneous catalysis, reactants chemisorb on the surface, weakening bonds; products then desorb. The **Sabatier principle** says binding should be neither too weak nor too strong. Activated carbon removes pollutants by physisorption on its huge surface area.
X: Langmuir coverage.
> K = 0.5 kPa⁻¹, P = 2 kPa.
> KP = 1.0.
> θ = 1.0 / (1 + 1.0) = 0.5.
> Half the surface sites are covered.
K: Physisorption is weak and reversible with multilayers, while chemisorption forms bonds in a monolayer; the Langmuir isotherm θ = KP/(1 + KP) describes monolayer coverage and catalysts need intermediate binding strength (Sabatier principle).
!: Confusing adsorption with absorption. Adsorption occurs only on the surface.
EV: established | The Langmuir isotherm describes monolayer adsorption (Langmuir, 1918).
T: Physisorption | Weak adsorption by intermolecular forces
T: Chemisorption | Adsorption by forming chemical bonds
T: Langmuir isotherm | θ = KP/(1 + KP) for monolayer adsorption
SUM: Physi- versus chemi-.
SUM: Langmuir isotherm.
SUM: Sabatier principle.
SRC: Langmuir I., "The adsorption of gases on plane surfaces of glass, mica and platinum", Journal of the American Chemical Society 40(9), 1361–1403 | primary | 1918
SRC: Somorjai G. A. and Li Y., Introduction to Surface Chemistry and Catalysis, 2nd edition, Wiley | secondary | 2010
Q: Which type of adsorption forms chemical bonds? | Chemisorption.
Q: What happens to θ at very high pressure in the Langmuir model? | It approaches 1.
M1#chemistry-u16-16-q1@1: Which type of adsorption can form multilayers? | Physisorption | Chemisorption | Absorption into the bulk | Neither type | Weak forces allow molecules to stack in layers.
M2#chemistry-u16-16-q2@2: Why should a catalyst bind reactants neither too weakly nor too strongly? | Too weak gives no activation; too strong blocks the surface | Strong binding always speeds reactions | Weak binding always gives the best rates | Binding strength has no effect | The Sabatier principle balances activation and release.
NUM1#chemistry-u16-16-q3@2: For a Langmuir surface with KP = 3, what fraction of sites is covered? | 0.75 | 0.01 | fraction | θ = 3 ÷ (1 + 3) = 0.75 of surface sites covered.
M3#chemistry-u16-16-q4@3: Why is activated carbon an effective adsorbent? | Its enormous surface area provides many physisorption sites | It chemically destroys all pollutants | It has very little surface area | It absorbs pollutants into its bulk | Pores give hundreds of square metres per gram.
SA2#chemistry-u16-16-q5@1,3: Compare physisorption and chemisorption and explain the Langmuir isotherm. | Physisorption involves weak London forces, low enthalpy near −20 kJ mol⁻¹, multilayers and reversibility, while chemisorption forms bonds with enthalpies near −200 kJ mol⁻¹ in a monolayer. The Langmuir isotherm, θ = KP/(1 + KP), assumes a monolayer of equivalent independent sites: coverage rises linearly at low pressure and approaches 1 at high pressure. In catalysis, reactants chemisorb and products desorb, with the Sabatier principle requiring intermediate binding. Activated carbon removes pollutants by physisorption. | Physisorption ; Chemisorption ; Langmuir isotherm ; Catalysis ; Applications

## Colloids
LV: Year 1 · Application
S: Colloids are mixtures with particles between 1 nm and 1 μm. This lesson explains their types, stability and uses.
O: Classify colloids by their phases
O: Explain the stability of colloids
O: Describe properties and uses of colloids
H: Types
- **Sol**: solid in liquid (paint, ink).
- **Emulsion**: liquid in liquid (milk, mayonnaise).
- **Foam**: gas in liquid (whipped cream).
- **Aerosol**: liquid or solid in gas (fog, smoke).
- **Gel**: liquid trapped in a solid network (jelly).
D: chem-colloid
H: Stability and properties
- Particles are kept apart by **charge repulsion** or **steric** barriers.
- **Electrolytes** can cause **coagulation** by screening charges.
- **Tyndall effect**: colloids scatter light, making a beam visible.
- **Emulsifiers** such as lecithin stabilise emulsions.
P: Colloids are everywhere in food, medicines, cosmetics and the environment. Rivers deposit clay colloids when they meet salty seawater, forming deltas, because salt causes the particles to coagulate. Car headlights show the Tyndall effect in fog.
X: Making mayonnaise.
> Oil and vinegar do not mix on their own.
> Egg yolk contains lecithin, an emulsifier.
> Lecithin's polar head sits in water and its tail in oil.
> Tiny oil droplets stay dispersed: a stable emulsion.
K: Colloids contain dispersed particles of 1 nm to 1 μm as sols, emulsions, foams, aerosols and gels; they are stabilised by charge or steric barriers, coagulated by electrolytes and scatter light in the Tyndall effect.
!: Thinking colloids are true solutions. Their larger particles scatter light, unlike dissolved molecules.
EV: established | The DLVO theory explains colloid stability by balancing attraction and repulsion (Derjaguin and Landau, 1941; Verwey and Overbeek, 1948).
T: Colloid | A dispersion with particles 1 nm to 1 μm in size
T: Tyndall effect | Scattering of light by colloidal particles
T: Coagulation | Clumping of colloidal particles
SUM: Five types.
SUM: Charge and steric stability.
SUM: Tyndall effect.
SRC: Verwey E. J. W. and Overbeek J. Th. G., Theory of the Stability of Lyophobic Colloids, Elsevier | secondary | 1948
SRC: Hiemenz P. C. and Rajagopalan R., Principles of Colloid and Surface Chemistry, 3rd edition, CRC Press | secondary | 1997
Q: What is an emulsion? | A colloid of one liquid dispersed in another.
Q: What is the Tyndall effect? | Scattering of light by colloidal particles.
M1#chemistry-u16-17-q1@1: Which everyday substance is a foam? | Whipped cream, gas in liquid | Milk, liquid in liquid | Fog, liquid in gas | Ink, solid in liquid | A foam has gas bubbles dispersed in a liquid.
M2#chemistry-u16-17-q2@2: Why do river deltas form where rivers meet the sea? | Salt in seawater coagulates charged clay colloids | Seawater dissolves all clay | Rivers flow faster at the coast | Clay particles grow larger in fresh water | Electrolytes in seawater screen the repulsive charges, so clay settles.
MATCH1#chemistry-u16-17-q3@2: Match each colloid to its type. | Milk = Emulsion ; Paint = Sol ; Fog = Aerosol ; Jelly = Gel | Colloids are classified by phases.
M3#chemistry-u16-17-q4@3: How does lecithin stabilise mayonnaise? | Its polar head sits in water and non-polar tail in oil, coating droplets | It dissolves all the oil | It makes oil denser than water | It reacts with vinegar | Emulsifiers sit at the oil-water interface.
SA2#chemistry-u16-17-q5@1,3: Describe colloids and what makes them stable. | Colloids contain dispersed particles between 1 nm and 1 μm: sols such as paint, emulsions such as milk, foams such as whipped cream, aerosols such as fog and gels such as jelly. They are stabilised by charge repulsion or steric barriers, and emulsifiers such as lecithin coat droplets. Electrolytes screen charges and cause coagulation, as when clay settles in river deltas. Colloids scatter light in the Tyndall effect, unlike true solutions. They are vital in food, medicine and cosmetics. | Definition ; Types ; Stability ; Coagulation ; Tyndall effect

## Interfaces
LV: Year 1 · Chemical reasoning
S: Interfaces are boundaries between phases. This lesson explains surface tension, surfactants and wetting.
O: Explain surface tension at liquid interfaces
O: Describe how surfactants work
O: Explain wetting and contact angles
H: Surface tension and surfactants
- Molecules at a liquid surface have unbalanced forces, giving **surface tension**.
- **Surfactants** have a polar head and non-polar tail.
- They gather at interfaces, **lowering** surface tension.
- Above the **critical micelle concentration (CMC)**, they form **micelles**.
D: chem-surfactant-interface
H: Wetting
- The **contact angle** measures how a liquid spreads on a solid.
- **< 90°**: the liquid wets the surface (hydrophilic).
- **> 90°**: the liquid beads up (hydrophobic).
- Superhydrophobic surfaces have angles above 150°.
P: Detergents remove grease by trapping it inside micelles. Lungs produce surfactants that reduce surface tension so alveoli can inflate easily; premature babies may lack them. The lotus leaf's rough, waxy surface is superhydrophobic, so water rolls off and cleans it.
X: How detergent removes grease.
> Surfactant tails dissolve in the grease.
> Polar heads face the water.
> Grease is lifted into micelles.
> Micelles are rinsed away in water.
K: Surface tension arises from unbalanced forces at interfaces; surfactants lower it and form micelles above the CMC, removing grease, while contact angles describe wetting, from hydrophilic to superhydrophobic surfaces.
!: Thinking detergents dissolve grease directly in water. They trap it inside micelles.
EV: established | Pulmonary surfactant reduces surface tension in alveoli (Avery and Mead, 1959).
T: Surfactant | A molecule with polar and non-polar parts that acts at interfaces
T: Micelle | A cluster of surfactant molecules with tails inside
T: Contact angle | The angle a liquid makes with a solid surface
SUM: Surface tension.
SUM: Surfactants and micelles.
SUM: Wetting.
SRC: Avery M. E. and Mead J., "Surface properties in relation to atelectasis and hyaline membrane disease", American Journal of Diseases of Children 97(5), 517–523 | primary | 1959
SRC: Adamson A. W. and Gast A. P., Physical Chemistry of Surfaces, 6th edition, Wiley | secondary | 1997
Q: What is the critical micelle concentration? | The concentration above which surfactants form micelles.
Q: What contact angle shows a hydrophobic surface? | More than 90°.
M1#chemistry-u16-18-q1@1: What does a surfactant do to surface tension? | Lowers it | Raises it | Leaves it unchanged | Makes it infinite | Surfactants gather at the surface and reduce cohesive forces.
M2#chemistry-u16-18-q2@2: Why do premature babies sometimes struggle to breathe? | Their lungs may lack surfactant, so alveoli are hard to inflate | Their lungs contain too much surfactant | Surface tension does not affect lungs | Babies have no alveoli | High surface tension resists expansion of air sacs.
MATCH1#chemistry-u16-18-q3@2: Match each contact angle to its surface. | 20° = Hydrophilic, wets well ; 110° = Hydrophobic ; 160° = Superhydrophobic ; 0° = Complete wetting | Contact angle describes wetting behaviour.
M3#chemistry-u16-18-q4@3: Why does water roll off a lotus leaf? | Its rough, waxy surface is superhydrophobic | It is coated in detergent | The leaf absorbs all water | Water wets the leaf completely | Microstructure and wax give very high contact angles.
SA2#chemistry-u16-18-q5@1,3: Explain surface tension, surfactants and wetting. | Molecules at a liquid surface have unbalanced forces, causing surface tension. Surfactants have polar heads and non-polar tails, gather at interfaces, lower surface tension and form micelles above the critical micelle concentration, so detergents trap grease in micelles. Lung surfactant lets alveoli inflate. Wetting is described by the contact angle: below 90° the liquid wets a hydrophilic surface, above 90° it beads on a hydrophobic one and above 150° the surface is superhydrophobic, like a lotus leaf. | Surface tension ; Surfactants ; Micelles ; Contact angle ; Applications

## Photochemistry
LV: Year 1 · Chemical reasoning
S: Photochemistry studies reactions started by light. This lesson explains how absorbed light drives chemical change.
O: State the laws of photochemistry
O: Describe processes of excited states using a Jablonski diagram
O: Calculate quantum yield
H: Principles
- **Grotthuss-Draper law**: only absorbed light causes reaction.
- **Stark-Einstein law**: each absorbed photon excites one molecule.
- **Quantum yield** Φ = molecules reacted ÷ photons absorbed.
- Chain reactions can have Φ much greater than 1.
D: chem-photochem
H: Excited states
- A **Jablonski diagram** shows singlet (S) and triplet (T) states.
- Paths: fluorescence (S₁ → S₀), intersystem crossing (S₁ → T₁), phosphorescence (T₁ → S₀).
- Excited molecules can react, transfer energy or lose it as heat.
- Photosensitisers transfer energy to other molecules.
P: Photosynthesis, vision, sunburn, ozone formation and photographic film all depend on photochemistry. The H₂ + Cl₂ reaction in light has a quantum yield up to 10⁶ because of a chain mechanism. Photodynamic therapy uses photosensitisers to kill cancer cells.
X: Quantum yield of a chain reaction.
> 1.0 × 10⁻⁹ mol of photons is absorbed.
> 1.0 × 10⁻³ mol of HCl forms.
> Φ = 10⁻³ ÷ 10⁻⁹ = 10⁶.
> Each photon starts a long chain.
K: Photochemistry follows the Grotthuss-Draper and Stark-Einstein laws; quantum yield measures efficiency and can exceed 1 for chains, and Jablonski diagrams show fluorescence, intersystem crossing and phosphorescence.
!: Thinking each photon can only cause one reaction. Chain reactions multiply the effect.
EV: established | Jablonski diagrams describe excited-state processes (Jablonski, 1933).
T: Quantum yield | Molecules reacted per photon absorbed
T: Intersystem crossing | Transition between singlet and triplet states
T: Photosensitiser | A molecule that absorbs light and transfers energy
SUM: Two laws.
SUM: Quantum yield.
SUM: Jablonski diagram.
SRC: Jablonski A., "Efficiency of anti-Stokes fluorescence in dyes", Nature 131, 839–840 | primary | 1933
SRC: Turro N. J., Ramamurthy V. and Scaiano J. C., Modern Molecular Photochemistry of Organic Molecules, University Science Books | secondary | 2010
Q: What is quantum yield? | Molecules reacted per photon absorbed.
Q: What is intersystem crossing? | A transition from a singlet to a triplet state.
M1#chemistry-u16-19-q1@1: Which emission comes from a triplet state? | Phosphorescence | Fluorescence | Rayleigh scattering | Absorption | T₁ → S₀ is spin forbidden, so it is slow.
M2#chemistry-u16-19-q2@2: Why can a quantum yield be greater than 1? | One photon can start a chain reaction producing many molecules | Photons can be absorbed twice | Quantum yields are always 1 | Light creates extra molecules | Each initiation step leads to many propagation steps.
NUM1#chemistry-u16-19-q3@2: 2.0 × 10⁻⁶ mol of photons forms 1.0 × 10⁻⁶ mol of product. What is the quantum yield? | 0.5 | 0.01 | no units | Φ = 1.0 × 10⁻⁶ ÷ 2.0 × 10⁻⁶ = 0.5 molecules per photon.
M3#chemistry-u16-19-q4@3: How does photodynamic therapy work? | A photosensitiser absorbs light and produces reactive oxygen that kills target cells | Light alone heats tumours | It uses X-rays only | The drug works without light | Energy transfer creates singlet oxygen locally.
SA2#chemistry-u16-19-q5@1,3: Explain the principles of photochemistry. | Only absorbed light causes reaction (Grotthuss-Draper), and each absorbed photon excites one molecule (Stark-Einstein). Quantum yield is molecules reacted per photon absorbed and can reach 10⁶ for chain reactions such as H₂ with Cl₂. A Jablonski diagram shows singlet and triplet states: fluorescence from S₁, intersystem crossing to T₁ and phosphorescence from T₁. Excited molecules react, transfer energy or lose heat. Photosynthesis, vision and photodynamic therapy depend on photochemistry. | Laws ; Quantum yield ; Excited states ; Jablonski diagram ; Applications

## Molecular interactions
LV: Year 1 · Chemical reasoning
S: Molecules attract and repel each other through non-covalent interactions. This lesson describes their physical origins and strengths.
O: Describe the physical origins of intermolecular interactions
O: Explain how interaction energy depends on distance
O: Describe the role of non-covalent interactions in biology and materials
H: Types
- **Ion-ion**: strongest, energy ∝ 1/r.
- **Ion-dipole** and **dipole-dipole**: depend on orientation.
- **London dispersion**: from fluctuating dipoles, energy ∝ 1/r⁶.
- **π-stacking** and **hydrogen bonding** are directional.
D: chem-lennard-jones
H: Distance dependence
- At large distances, attraction dominates.
- At short distances, electron clouds overlap and **repulsion** dominates.
- The **Lennard-Jones potential** combines 1/r¹² repulsion and 1/r⁶ attraction.
- The minimum gives the equilibrium separation.
P: Non-covalent interactions hold DNA strands together, fold proteins and let drugs bind to receptors. Geckos climb walls using London forces between millions of tiny hairs and the surface. Supramolecular chemistry uses these interactions to build self-assembling structures.
X: Gecko adhesion.
> A gecko's foot has millions of tiny hairs (setae).
> Each hair splits into hundreds of tips.
> Tips come very close to the surface.
> Summed London forces support the gecko's weight.
K: Non-covalent interactions include ion-ion, ion-dipole, dipole-dipole, London dispersion, π-stacking and hydrogen bonding; their energies depend strongly on distance, modelled by the Lennard-Jones potential and they control biological structure and self-assembly.
!: Thinking London forces are always negligible. Summed over many contacts, they can be very strong.
EV: established | Gecko adhesion arises from London forces between setae and surfaces (Autumn et al., 2002).
T: Lennard-Jones potential | A model combining short-range repulsion and long-range attraction
T: π-stacking | Attraction between aromatic rings
T: Supramolecular chemistry | Chemistry of assemblies held by non-covalent forces
SUM: Many interaction types.
SUM: Distance dependence.
SUM: Biology and materials.
SRC: Autumn K. et al., "Evidence for van der Waals adhesion in gecko setae", Proceedings of the National Academy of Sciences 99(19), 12252–12256 | primary | 2002
SRC: Israelachvili J. N., Intermolecular and Surface Forces, 3rd edition, Academic Press | secondary | 2011
Q: How does London dispersion energy depend on distance? | It is proportional to 1/r⁶.
Q: What does the Lennard-Jones potential combine? | Short-range repulsion and long-range attraction.
M1#chemistry-u16-20-q1@1: Which interaction is longest-range? | Ion-ion attraction | London dispersion | Dipole-dipole in solution | Repulsion between electron clouds | Ion-ion energy falls only as 1/r, much more slowly than other forces.
M2#chemistry-u16-20-q2@2: Why does repulsion dominate at very short distances? | Electron clouds overlap and repel strongly | Nuclei attract each other more closely | Attraction increases without limit | Molecules have no electrons | Pauli repulsion between overlapping clouds rises steeply, as r⁻¹².
MATCH1#chemistry-u16-20-q3@2: Match each interaction to an example. | Hydrogen bonding = DNA base pairs ; π-stacking = Stacked DNA bases ; London forces = Gecko feet ; Ion-dipole = Hydrated Na⁺ | Non-covalent interactions appear widely.
M3#chemistry-u16-20-q4@3: How can geckos stick to walls using weak forces? | Millions of tiny contacts add up to a large total force | Geckos secrete a strong chemical glue | Gecko feet are magnetic and grip metal | Their sharp claws pierce the wall surface | Many weak interactions combine into strong adhesion.
SA2#chemistry-u16-20-q5@1,3: Explain the nature and importance of molecular interactions. | Non-covalent interactions include ion-ion forces, strongest and falling as 1/r, ion-dipole and dipole-dipole forces, London dispersion from fluctuating dipoles falling as 1/r⁶, π-stacking and hydrogen bonding. At large distances attraction dominates, while overlapping electron clouds repel strongly at short range; the Lennard-Jones potential combines 1/r¹² repulsion and 1/r⁶ attraction, with a minimum at the equilibrium distance. These interactions hold DNA together, fold proteins, bind drugs and let geckos climb walls. | Types ; Distance dependence ; Lennard-Jones ; Biology ; Adhesion

## Solvation
LV: Year 1 · Chemical reasoning
S: Solvation is the interaction of a solute with solvent molecules. This lesson explains how solvation affects solubility and reactions.
O: Describe the solvation of ions and molecules
O: Explain the hydrophobic effect
O: Explain how solvents affect reaction rates and equilibria
H: Solvation
- Solvent molecules surround solute particles, forming a **solvation shell**.
- In water this is **hydration**; ions are strongly hydrated by ion-dipole forces.
- Smaller, more highly charged ions have larger **hydration enthalpies**.
- Solubility depends on the balance of lattice and solvation energies.
D: chem-solvation-shell
H: Hydrophobic effect
- Non-polar molecules in water force water into **ordered** cages.
- Clustering non-polar groups together **releases** water, increasing entropy.
- This drives protein folding, membrane formation and micelles.
- It is mainly an **entropy** effect.
P: Solvents affect reactions: polar protic solvents stabilise ions and favour SN1, while polar aprotic solvents leave anions reactive and favour SN2. Solvent polarity can shift equilibria and even colours of dyes (solvatochromism).
X: Why oil and water separate.
> Oil molecules cannot hydrogen bond with water.
> Water molecules around oil become more ordered.
> Oil droplets merge to reduce the oil-water surface.
> More water molecules are freed, raising entropy.
K: Solvation surrounds solutes with solvent molecules, with strong hydration of small, highly charged ions; the hydrophobic effect, driven by entropy, clusters non-polar groups, and solvents influence reaction rates, mechanisms and equilibria.
!: Thinking the hydrophobic effect is caused by oil molecules attracting each other strongly. It is driven mainly by water's entropy.
EV: established | The hydrophobic effect drives protein folding and membrane formation (Tanford, 1978).
T: Solvation shell | Solvent molecules surrounding a solute
T: Hydration enthalpy | Enthalpy change when gaseous ions are hydrated
T: Hydrophobic effect | Clustering of non-polar groups in water
SUM: Solvation shells.
SUM: Hydrophobic effect.
SUM: Solvents steer reactions.
SRC: Tanford C., "The hydrophobic effect and the organization of living matter", Science 200(4345), 1012–1018 | primary | 1978
SRC: Reichardt C. and Welton T., Solvents and Solvent Effects in Organic Chemistry, 4th edition, Wiley | secondary | 2011
Q: What drives the hydrophobic effect? | An increase in the entropy of water.
Q: Which ions have the largest hydration enthalpies? | Small, highly charged ions.
M1#chemistry-u16-21-q1@1: Which ion has the most exothermic hydration enthalpy? | Mg²⁺ | Na⁺ | K⁺ | Cs⁺ | Small size and double charge attract water most strongly.
M2#chemistry-u16-21-q2@2: Why do non-polar groups cluster together in water? | Clustering frees ordered water molecules, increasing entropy | Non-polar groups form hydrogen bonds | Water repels all molecules equally | Clustering decreases entropy | Fewer water molecules need to be ordered.
MATCH1#chemistry-u16-21-q3@2: Match each solvent effect to its outcome. | Polar protic solvent = Favours SN1 ; Polar aprotic solvent = Favours SN2 ; Hydrophobic effect = Protein folding ; Solvatochromism = Colour changes with solvent | Solvents steer chemical behaviour.
M3#chemistry-u16-21-q4@3: Why is the hydrophobic effect described as entropy-driven? | Water gains freedom when non-polar surfaces are reduced | Non-polar molecules release large amounts of heat | Entropy decreases when oil droplets cluster | It depends only on enthalpy, not entropy | The main gain is in the freedom of water molecules released from cages.
SA2#chemistry-u16-21-q5@1,3: Explain solvation and the hydrophobic effect. | Solvation surrounds solutes with a shell of solvent molecules; in water, hydration by ion-dipole forces is strongest for small, highly charged ions such as Mg²⁺, and solubility depends on the balance of lattice and solvation energies. Non-polar molecules force water into ordered cages, so clustering them frees water and increases entropy; this hydrophobic effect drives protein folding, membranes and micelles. Solvents also steer reactions: protic solvents favour SN1 and aprotic solvents SN2, and polarity can shift equilibria and colours. | Solvation shells ; Hydration ; Hydrophobic effect ; Entropy ; Solvent effects

## Computational molecular modelling
LV: Year 1 · Chemical reasoning
S: Computers model molecules to predict structures and properties. This lesson compares molecular mechanics, quantum methods and simulations.
O: Compare molecular mechanics and quantum mechanical methods
O: Describe geometry optimisation and energy calculations
O: Describe molecular dynamics simulations
H: Methods
- **Molecular mechanics (MM)**: atoms as balls and bonds as springs using a **force field**; fast but no electrons.
- **Quantum mechanical (QM)** methods such as DFT: include electrons; slower but can model bond breaking.
- **QM/MM** combines both for large systems such as enzymes.
- **Geometry optimisation** finds the lowest-energy structure.
D: chem-energy-landscape
H: Simulations
- **Molecular dynamics (MD)** follows atoms over time using Newton's laws.
- **Monte Carlo** methods sample random configurations.
- **Docking** predicts how drugs fit protein binding sites.
- Results must be **validated** against experiment.
P: Computational chemistry helps design drugs, catalysts and materials before they are made, saving time and cost. The 2013 Nobel Prize recognised multiscale models of complex chemical systems. AI methods now predict protein structures with high accuracy.
X: Choosing a method.
> Conformations of a large protein: molecular mechanics or MD.
> Bond breaking in a small molecule: DFT.
> Reaction in an enzyme active site: QM/MM.
> Drug binding to a target: docking, then MD.
K: Molecular mechanics uses force fields for fast modelling without electrons, quantum methods such as DFT model electrons and bond breaking and QM/MM combines both; geometry optimisation, molecular dynamics, Monte Carlo and docking predict structures and behaviour, validated by experiment.
!: Trusting computational results without checking them. Models must be validated experimentally.
EV: established | Multiscale QM/MM models enable simulations of complex chemical systems (Warshel, 2014).
T: Force field | A set of parameters for energies in molecular mechanics
T: Molecular dynamics | Simulating atomic motion over time
T: QM/MM | Combining quantum and molecular mechanics
SUM: MM, QM and QM/MM.
SUM: Optimisation and MD.
SUM: Validate results.
SRC: Warshel A., "Multiscale modeling of biological functions: from enzymes to molecular machines (Nobel lecture)", Angewandte Chemie International Edition 53(38), 10020–10031 | primary | 2014
SRC: Leach A. R., Molecular Modelling: Principles and Applications, 2nd edition, Pearson | secondary | 2001
Q: What does a force field describe? | Energy parameters for bonds, angles and interactions in molecular mechanics.
Q: What does geometry optimisation find? | The lowest-energy structure.
M1#chemistry-u16-22-q1@1: Which method can model bond breaking? | Quantum mechanical methods such as DFT | Classical molecular mechanics | Simple ball-and-stick models | Docking alone | Bond breaking requires treating electrons explicitly.
M2#chemistry-u16-22-q2@2: Why is molecular mechanics used for very large systems? | It is fast because it ignores electrons | It is more accurate than quantum methods | It models bond breaking well | It needs no parameters | Speed allows millions of atoms to be simulated.
MATCH1#chemistry-u16-22-q3@2: Match each task to a suitable method. | Protein conformations = Molecular dynamics ; Small-molecule reaction = DFT ; Enzyme active site = QM/MM ; Drug binding pose = Docking | Methods are chosen for the task.
M3#chemistry-u16-22-q4@3: Why must computational results be validated experimentally? | Approximations in models can give inaccurate predictions | Computers never make errors | Experiments are less reliable than models | Validation is only needed for small molecules | Models are only as good as their assumptions.
SA2#chemistry-u16-22-q5@1,3: Compare computational methods for modelling molecules. | Molecular mechanics treats atoms as balls and bonds as springs using force fields; it is fast and suits large systems but ignores electrons and cannot model bond breaking. Quantum methods such as DFT include electrons and model reactions but are slower. QM/MM combines them for enzymes. Geometry optimisation finds minimum-energy structures, molecular dynamics follows motion over time, Monte Carlo samples configurations and docking predicts drug binding. Results must be validated experimentally. | Molecular mechanics ; Quantum methods ; QM/MM ; Simulations ; Validation
`;
