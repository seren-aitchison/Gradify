// Unit 22: Molecular Physics. Format: kit/course/notes.js
export default `
## Molecular energy levels
S: Molecules store energy in electronic states, vibrations and rotations, each on a very different scale. This hierarchy explains why molecules absorb in the UV/visible, infrared and microwave regions respectively.
H: The hierarchy
- **Electronic**: ~1–10 eV (UV/visible).
- **Vibrational**: ~0.05–0.5 eV (infrared).
- **Rotational**: ~10^{-4}–10^{-2} eV (microwave and far-IR).
E: E ≈ E_{el} + E_{vib} + E_{rot}
H: Born–Oppenheimer approximation
P: Nuclei are thousands of times heavier than electrons, so electrons adjust almost instantly to nuclear positions. Solving for electrons at fixed nuclei gives a potential energy surface on which the nuclei vibrate and rotate. This separation makes molecular physics tractable.
H: Scales from ratios
- E_{el} : E_{vib} : E_{rot} ≈ 1 : (m_{e}/M)^{1/2} : (m_{e}/M).
- With m_{e}/M ~ 10^{-4}: about 1 : 10^{-2} : 10^{-4}.
X: At room temperature (k_{B}T ≈ 0.025 eV), which modes are excited in N_{2}?
> Rotations (~0.0005 eV spacing): many levels populated
> Vibration (0.29 eV): almost all in ground state; electronic: ground state
!: Vibrational and rotational energies aren't independent exactly; vibration changes the bond length and so the rotational constant.
Q: Why are molecular rotational energies so much smaller than electronic ones? | They scale with the electron-to-nucleus mass ratio; nuclei are heavy and rotate slowly.
Q: What is the Born–Oppenheimer approximation? | Treating electron motion separately from the much slower nuclear motion.
M1: Vibrational transitions occur mainly in the: | Infrared | Ultraviolet | Radio | X-ray | ~0.1 eV.
M2: The ratio E_{el}:E_{vib}:E_{rot} is roughly: | 1 : 10^{-2} : 10^{-4} | 1 : 1 : 1 | 1 : 10^{2} : 10^{4} | 1 : 0.5 : 0.25 | Mass ratio scaling.

## Rotational spectra
S: Molecules with a permanent electric dipole moment absorb and emit microwaves as they change rotational state. The spacing of the lines gives the molecule's moment of inertia and hence its bond length very precisely.
H: Rigid rotor
E: E_{J} = BJ(J + 1), B = ħ^{2}/(2I) :: J = 0, 1, 2…
E: ΔJ = ±1 :: selection rule (needs a permanent dipole)
E: f = 2B(J + 1)/h :: absorption lines equally spaced by 2B
- Real molecules stretch at high J (centrifugal distortion), slightly compressing the spacing.
H: Populations
E: N_{J} ∝ (2J + 1)e^{−BJ(J+1)/k_{B}T}
- The strongest line is at intermediate J, not J = 0.
H: Applications
- Bond lengths to 10^{-4} nm.
- Radio astronomy: over 280 molecules identified in space, mostly by rotational lines (CO is the main tracer of molecular clouds).
- Microwave ovens heat liquid water by dielectric relaxation, not rotational lines (rotations are hindered in the liquid).
X: CO's lines are spaced by 115 GHz (2B/h). Bond length?
> B/h = 57.6 GHz, and B = ħ^{2}/(2I), so I = h/(8π^{2} × 57.6 × 10^{9}) = 1.46 × 10^{-46} kg m^{2}
> μ = 1.14 × 10^{-26} kg ⇒ r = √(I/μ) = 0.113 nm
!: Homonuclear molecules (N_{2}, O_{2}, H_{2}) have no permanent dipole, so no pure rotational absorption spectrum; they're seen by Raman spectroscopy.
Q: What is the rotational energy of a rigid rotor? | E_{J} = BJ(J + 1), with B = ħ^{2}/(2I).
Q: Why can't N_{2} show a pure rotational absorption spectrum? | It has no permanent electric dipole moment.
M1: Rotational absorption lines are spaced by: | 2B | B | B/2 | Increasing amounts | f ∝ 2B(J + 1).
M2: The main molecule used to trace cold molecular clouds is: | CO | H_{2} | N_{2} | O_{2} | Bright rotational lines.

## Vibrational spectra
S: Molecules vibrate like masses on springs. Transitions between vibrational levels absorb infrared light, and each molecule's pattern of vibrational frequencies is a fingerprint used in chemistry, medicine and climate science.
H: Harmonic and anharmonic oscillator
E: E_{v} = (v + ½)ħω, ω = √(k/μ)
E: E_{v} = (v + ½)ħω − (v + ½)^{2}ħωx_{e} :: anharmonic (Morse)
- Selection rule Δv = ±1 (harmonic); overtones Δv = ±2… weakly allowed by anharmonicity.
- Infrared activity requires the dipole moment to change during the vibration.
H: Polyatomic molecules
- 3N − 6 normal modes (3N − 5 if linear).
- CO_{2}: symmetric stretch (IR inactive), bend (667 cm^{-1}, 15 μm: the key greenhouse band), asymmetric stretch (2349 cm^{-1}).
- H_{2}O: three IR-active modes.
H: Rovibrational spectra
P: In gases, vibrational transitions come with rotational changes: P and R branches (ΔJ = −1, +1), giving the comb of lines seen in HCl's infrared spectrum. The spacing gives bond lengths; isotopes shift the lines (H^{35}Cl vs H^{37}Cl doublets).
X: HCl absorbs at 2886 cm^{-1}. Force constant?
> ω = 2πc × 288 600 m^{-1} = 5.44 × 10^{14} rad s^{-1}
> μ = 1.63 × 10^{-27} kg ⇒ k = μω^{2} ≈ 480 N m^{-1}
!: Not every vibration absorbs infrared light; symmetric vibrations with no dipole change are IR-inactive (but often Raman-active).
Q: What determines a vibration's frequency? | The bond's force constant and the reduced mass: ω = √(k/μ).
Q: How many vibrational modes does CO_{2} have? | Four (3N − 5): symmetric stretch, asymmetric stretch and a doubly degenerate bend.
M1: Which CO_{2} vibration is IR-inactive? | Symmetric stretch | Bend | Asymmetric stretch | All are active | No dipole change.
M2: Replacing H by D in a bond lowers the vibrational frequency because: | The reduced mass increases | The bond is stiffer | Charge changes | Temperature changes | ω ∝ 1/√μ.

## Electronic molecular transitions
S: Electronic transitions move a molecule's electrons between molecular orbitals, absorbing UV or visible light. They give dyes, pigments, chlorophyll and our eyes' photoreceptors their colours, and they drive photochemistry.
H: Franck–Condon principle
P: Electronic transitions happen so fast (~10^{-15} s) that nuclei don't move during them. Transitions are vertical on a potential energy diagram; the overlap of vibrational wavefunctions (Franck–Condon factors) sets the intensities of the vibrational bands within an electronic transition.
H: Types
- σ → σ*: deep UV (alkanes).
- π → π*: UV–visible; extended conjugation shifts absorption to longer wavelengths (carotene, chlorophyll, retinal).
- n → π*: weak, near-UV (carbonyls).
- Charge transfer: intense colours (permanganate, many pigments).
- d–d transitions in transition-metal complexes (ruby's red, blue copper sulfate).
H: Particle-in-a-box dyes
P: Electrons delocalised along a conjugated chain behave like particles in a box: the longer the chain, the smaller the gap and the redder the absorption. This simple model predicts the colours of cyanine dyes well.
X: Retinal absorbs at ~500 nm. Energy of the transition?
> E = 1240/500 = 2.5 eV, triggering cis–trans isomerisation and vision
!: The colour we see is complementary to what's absorbed: chlorophyll absorbs red and blue, so leaves look green.
Q: State the Franck–Condon principle. | Electronic transitions occur without change in nuclear positions; intensities depend on vibrational wavefunction overlap.
Q: Why does longer conjugation shift absorption to the red? | The electrons' "box" is longer, so energy gaps are smaller.
M1: Leaves look green because chlorophyll: | Absorbs red and blue | Emits green | Absorbs green | Reflects all | Complementary colour.
M2: Electronic transitions are drawn as vertical lines because: | Nuclei don't move during the fast transition | Energy is conserved | Molecules don't vibrate | Spin flips | Franck–Condon.

## Molecular bonding from a physical perspective
S: Chemical bonds form because sharing or transferring electrons lowers the total energy of nuclei and electrons. Physics explains bond types through electrostatics, quantum kinetic energy and the Pauli principle.
H: Bond types
- **Covalent**: shared electrons in bonding orbitals; lower kinetic energy from delocalisation (H_{2}: 4.5 eV).
- **Ionic**: electron transfer, then Coulomb attraction (NaCl).
- **Metallic**: delocalised electron sea.
- **Hydrogen bonds**: ~0.1–0.3 eV; water's structure, DNA base pairs, protein folding.
- **Van der Waals**: induced dipole attractions ∝ 1/r^{6}; ~0.01–0.1 eV; geckos' feet, noble-gas liquids.
H: Potential energy curves
E: V(r) = D_{e}(1 − e^{−a(r − r_{e})})^{2} :: Morse potential
E: V(r) = 4ε[(σ/r)^{12} − (σ/r)^{6}] :: Lennard-Jones (van der Waals)
- Short-range repulsion from Pauli exclusion; longer-range attraction.
H: Why H_{2} binds
P: In the bonding orbital, the electrons spread over both nuclei: their wavefunction is less confined, lowering kinetic energy, and they spend time between the nuclei, attracting both. Antisymmetry requires the two electrons to have opposite spins (singlet). H_{2}^{+}, with one electron, already binds (2.65 eV).
X: Lennard-Jones: equilibrium separation in terms of σ?
> dV/dr = 0 ⇒ r_{min} = 2^{1/6}σ ≈ 1.12σ
!: Covalent bonds aren't "two electrons sitting between atoms"; they're delocalised quantum states with lower total energy.
Q: Why does sharing electrons lower energy in a covalent bond? | Delocalisation lowers kinetic energy and electrons attract both nuclei.
Q: How do van der Waals forces depend on distance? | Attractive potential ∝ 1/r^{6}.
M1: Hydrogen bonds have typical energies of: | 0.1–0.3 eV | 5 eV | 10 keV | 0.001 eV | Intermediate strength.
M2: The repulsive part of interatomic potentials comes mainly from: | Pauli exclusion | Gravity | Magnetism | Nuclear force | Overlapping electron clouds.

## Molecular symmetry
S: A molecule's symmetry (its rotations, reflections and inversions that leave it unchanged) determines which vibrations are infrared or Raman active, which orbitals can mix and which transitions are allowed. Group theory turns symmetry into predictions.
H: Symmetry elements
- Rotation axes C_{n}, mirror planes σ, inversion centre i, improper rotations S_{n}.
- Point groups: H_{2}O is C_{2v}; NH_{3} is C_{3v}; CH_{4} is T_{d}; benzene D_{6h}; CO_{2} D_{∞h}.
H: Uses
- **Vibrational activity**: IR-active modes transform like x, y, z; Raman-active like quadratic functions (x^{2}, xy…).
- **Mutual exclusion rule**: in centrosymmetric molecules, no mode is both IR and Raman active (CO_{2}).
- **Orbital mixing**: only orbitals of the same symmetry combine.
- **Crystal field splitting** in transition-metal complexes.
H: Chirality
P: Molecules without improper rotation symmetry are chiral: they exist as non-superimposable mirror images. Enantiomers have identical energies but rotate polarised light oppositely and can act completely differently in the body.
X: Is the symmetric stretch of CO_{2} IR-active?
> The dipole moment stays zero by symmetry
> IR-inactive (but Raman-active, by mutual exclusion)
!: Symmetry predicts which transitions are zero, not how strong the allowed ones are.
Q: What is the mutual exclusion rule? | In molecules with an inversion centre, vibrations can't be both IR and Raman active.
Q: What makes a molecule chiral? | Lacking any improper rotation symmetry (no mirror plane or inversion centre).
M1: Water belongs to point group: | C_{2v} | D_{6h} | T_{d} | C_{∞v} | Two mirror planes and a C_{2} axis.
M2: Group theory in spectroscopy predicts: | Which transitions are allowed | Exact intensities | Bond energies | Temperatures | Selection by symmetry.

## Molecular orbitals
S: Molecular orbitals are one-electron wavefunctions spread over a whole molecule, built from combinations of atomic orbitals. Filling them with electrons predicts bond strength, magnetism and spectra.
H: LCAO approach
E: ψ = c_{A}φ_{A} ± c_{B}φ_{B}
- In-phase combination: bonding orbital (lower energy, electron density between nuclei).
- Out-of-phase: antibonding (higher energy, node between nuclei).
E: bond order = ½(bonding electrons − antibonding electrons)
H: Diatomic examples
- H_{2}: bond order 1; He_{2}: 0 (doesn't exist except as a fragile van der Waals dimer).
- N_{2}: bond order 3, very stable (945 kJ mol^{-1}).
- O_{2}: bond order 2 with two unpaired electrons in π* orbitals: paramagnetic (liquid oxygen sticks to magnets), something simple Lewis structures can't explain.
H: Frontier orbitals
P: The highest occupied (HOMO) and lowest unoccupied (LUMO) molecular orbitals control chemical reactivity and optical gaps. Organic semiconductors (OLEDs, organic solar cells) are designed by tuning HOMO–LUMO gaps.
X: Bond order of O_{2}^{+}?
> O_{2} has 8 bonding and 4 antibonding valence electrons; O_{2}^{+} loses one of the antibonding ones
> Bond order = ½(8 − 3) = 2.5: stronger and shorter bond than O_{2}
!: Antibonding electrons cancel bonding ones; adding electrons doesn't always strengthen a bond.
Q: What is bond order? | Half the difference between bonding and antibonding electrons.
Q: Why is O_{2} paramagnetic? | It has two unpaired electrons in degenerate π* antibonding orbitals.
M1: He_{2} doesn't form a stable bond because its bond order is: | 0 | 1 | 2 | ½ | Equal bonding and antibonding.
M2: OLED colours are tuned by: | The HOMO–LUMO gap | The bond order only | Nuclear spin | Pressure | Frontier orbitals.

## Raman spectroscopy
S: Raman spectroscopy shines monochromatic light on a sample and detects the tiny fraction scattered at shifted frequencies. The shifts equal vibrational (and rotational) energies, giving a fingerprint complementary to infrared spectroscopy.
H: The effect
- **Rayleigh scattering**: same frequency (most scattered light).
- **Stokes Raman**: scattered photon loses a vibrational quantum: f − f_{vib}.
- **Anti-Stokes**: gains one (needs excited molecules; weaker at low T).
- Raman activity requires the polarisability to change during the vibration.
- Discovered by C. V. Raman (1928; Nobel 1930).
H: Advantages
- Water is a weak Raman scatterer: biological samples and solutions work well.
- Visible or near-IR lasers; no special IR optics.
- Microscopy with ~1 μm resolution; chemical imaging of cells, pharmaceuticals, art and minerals (Mars rovers carry Raman spectrometers).
H: Enhancements
P: Raman scattering is weak (~1 in 10^{7} photons). Surface-enhanced Raman (SERS) uses metal nanostructures to boost signals up to 10^{10}, detecting single molecules. Coherent anti-Stokes Raman (CARS) and stimulated Raman scattering enable fast label-free imaging.
X: A 532 nm laser; a Raman line at 1000 cm^{-1} shift. Scattered wavelength (Stokes)?
> 1/λ = 18 797 − 1000 = 17 797 cm^{-1}
> λ = 562 nm
!: Raman shifts are independent of the laser wavelength; quote them in wavenumbers from the laser line.
Q: What is the difference between Stokes and anti-Stokes Raman lines? | Stokes photons lose energy to the molecule; anti-Stokes photons gain energy from it.
Q: What makes a vibration Raman active? | A change in the molecule's polarisability during the vibration.
M1: Anti-Stokes lines are weaker at low temperature because: | Few molecules are vibrationally excited | The laser is weaker | They're forbidden | Water absorbs them | Boltzmann population.
M2: SERS enhances Raman signals using: | Metal nanostructures | Strong magnets | Low temperatures | X-rays | Plasmonic field enhancement.

## Infrared spectroscopy
S: Infrared spectroscopy measures which infrared wavelengths a substance absorbs, revealing its molecular vibrations. Each functional group absorbs at characteristic frequencies, so IR spectra identify molecules quickly and non-destructively.
H: Characteristic bands (wavenumber, cm^{-1})
- O–H stretch: 3200–3600 (broad if hydrogen-bonded).
- C–H stretch: 2850–3000.
- C≡N: ~2250; C=O: 1650–1750 (strong).
- Fingerprint region 500–1500: unique to each molecule.
H: FTIR
P: Fourier-transform infrared spectrometers use a Michelson interferometer: one scan measures all wavelengths at once (multiplex advantage), with precise wavenumber calibration from a reference laser. They dominate modern IR spectroscopy.
H: Applications
- Identifying compounds and following reactions.
- Breathalysers (C–H absorption of ethanol), gas analysers (CO_{2} monitors).
- Atmospheric and climate monitoring from satellites.
- Forensics, polymers, food quality, medical diagnostics (tissue spectra).
- Astronomy: water, CO_{2} and methane in exoplanet atmospheres with JWST.
X: A strong band appears at 1715 cm^{-1}. Wavelength and likely group?
> λ = 1/1715 cm = 5.83 μm
> A C=O (ketone carbonyl) stretch
!: Water and CO_{2} in the air absorb strongly in the IR; instruments subtract background spectra.
Q: Why is FTIR faster than scanning spectrometers? | It measures all wavelengths simultaneously using an interferometer.
Q: What is the fingerprint region? | 500–1500 cm^{-1}, where complex vibrations give each molecule a unique pattern.
M1: A broad band near 3300 cm^{-1} indicates: | O–H (hydrogen-bonded) | C=O | C≡N | C–Cl | Hydroxyl.
M2: JWST detects exoplanet atmospheric molecules by: | Infrared absorption features | X-rays | Radio | Gravitational waves | Transmission spectroscopy.

## Fluorescence and phosphorescence
S: After absorbing light, a molecule can re-emit it. Fast emission between states of the same spin is fluorescence (nanoseconds); slow emission involving a spin flip is phosphorescence (milliseconds to hours), as in glow-in-the-dark materials.
H: Jablonski diagram
- Absorption S_{0} → S_{n} (singlets).
- Fast internal conversion and vibrational relaxation to the lowest vibrational level of S_{1} (~ps).
- **Fluorescence**: S_{1} → S_{0}, ~1–10 ns; red-shifted from absorption (Stokes shift).
- **Intersystem crossing** to a triplet T_{1} (spin flip).
- **Phosphorescence**: T_{1} → S_{0}, spin-forbidden: slow.
H: Quantum yield
E: Φ = photons emitted/photons absorbed
- Competition with non-radiative decay.
H: Applications
- Fluorescence microscopy, green fluorescent protein (GFP, Nobel 2008), super-resolution imaging.
- Fluorescent lamps and white LEDs (phosphors convert blue to yellow).
- OLEDs: phosphorescent emitters harvest triplets for ~100% internal efficiency.
- Safety signs, watch dials; FRET measures nanometre distances in biomolecules.
X: A dye absorbs at 490 nm and fluoresces at 520 nm. Stokes shift energy?
> 1240/490 − 1240/520 = 2.53 − 2.38 = 0.15 eV, lost to vibrational relaxation
!: Fluorescence is always at equal or longer wavelength than the absorbed light (except multiphoton processes).
Q: What distinguishes phosphorescence from fluorescence? | Phosphorescence involves a spin-forbidden triplet-to-singlet transition, so it's much slower.
Q: What is the Stokes shift? | The red-shift of emission relative to absorption due to vibrational relaxation.
M1: Fluorescence lifetimes are typically: | Nanoseconds | Seconds | Hours | Femtoseconds | Spin-allowed.
M2: White LEDs use: | A blue LED plus a yellow phosphor | Three white chips | Incandescence | Phosphorescence only | Down-conversion.

## Molecular collisions
S: Molecules constantly collide in gases and liquids, exchanging energy and sometimes reacting. Collision physics sets reaction rates, transport properties and the conditions for chemistry in flames, atmospheres and space.
H: Collision theory
E: Z = n^{2}σ√(8k_{B}T/(πμ)) :: collision rate per volume (like molecules, ÷2)
E: k = Pσ√(8k_{B}T/πμ)e^{−E_{a}/k_{B}T} :: rate constant
- σ: collision cross-section; P: steric factor (orientation).
- Only collisions with enough energy along the line of centres react (Arrhenius factor).
H: Types of collisions
- Elastic: kinetic energy conserved.
- Inelastic: energy goes into rotation, vibration or electronic states.
- Reactive: bonds break and form.
H: Studying collisions
P: Crossed molecular beams (Herschbach, Lee, Polanyi: Nobel 1986) collide molecules at controlled energies and orientations, revealing how reactions happen step by step. Ultracold molecule experiments now study reactions at microkelvin, where quantum effects dominate.
X: How often does an N_{2} molecule collide at STP?
> Mean free path ~70 nm; mean speed ~470 m s^{-1}
> ~7 × 10^{9} collisions per second
!: Most collisions don't cause reactions: the energy and orientation must be right.
Q: What does the Arrhenius factor represent? | The fraction of collisions with enough energy to overcome the activation barrier.
Q: What is the steric factor? | The fraction of collisions with suitable orientation to react.
M1: In an elastic collision: | Total kinetic energy is conserved | Molecules always react | Vibrations are excited | Mass changes | Definition.
M2: Crossed molecular beams study: | Single-collision reaction dynamics | Bulk viscosity | Crystal structure | Nuclear decay | Controlled collisions.

## Molecular dynamics
S: Molecular dynamics (MD) simulates the motion of atoms by solving Newton's equations with forces from interatomic potentials. It predicts properties of liquids, proteins, materials and drugs from the bottom up.
H: The method
- Choose a force field (bonds, angles, torsions, van der Waals, electrostatics) or compute forces quantum mechanically (ab initio MD).
- Integrate with velocity Verlet, time steps ~1 fs (set by the fastest vibrations).
- Control temperature and pressure with thermostats and barostats.
- Use periodic boundary conditions to mimic bulk matter.
H: What it gives
- Structure (radial distribution functions), diffusion coefficients, viscosity, phase transitions.
- Protein folding, membrane dynamics, drug binding.
- Material properties: crack propagation, melting, thermal conductivity.
H: Limits and advances
P: Typical simulations follow millions of atoms for nanoseconds to microseconds; folding some proteins needs milliseconds. Specialised hardware (Anton) and enhanced sampling extend reach; machine-learned potentials combine near-quantum accuracy with classical speed. Karplus, Levitt and Warshel won the 2013 Chemistry Nobel for multiscale models.
X: Why is the time step ~1 fs?
> C–H vibrations have periods ~11 fs
> Several steps per period are needed for stable, accurate integration
!: MD is only as good as its force field; results for situations the potential wasn't fitted to can be wrong.
Q: What does molecular dynamics simulate? | The motion of atoms by integrating Newton's equations with interatomic forces.
Q: What limits MD time steps? | The fastest molecular vibrations (~10 fs periods).
M1: Periodic boundary conditions are used to: | Mimic an infinite bulk system | Speed up computers | Remove forces | Fix temperature | Avoid surface effects.
M2: Ab initio MD computes forces from: | Quantum mechanical electronic structure | Empirical springs | Gravity | Experiments | First principles.

## Energy transfer
S: Energy moves between molecules, and within them, through collisions, radiation and near-field coupling. Energy transfer powers photosynthesis, OLEDs and lasers, and controls how fast molecules cool.
H: Mechanisms
- **Förster resonance energy transfer (FRET)**: dipole–dipole coupling between donor and acceptor; rate ∝ 1/r^{6}; works over 1–10 nm.
- **Dexter transfer**: electron exchange; very short range (< 1 nm); transfers triplets.
- **Collisional (V–T, V–V)**: vibrational energy to translation or other vibrations.
- **Radiative**: emission and reabsorption.
E: E_{FRET} = 1/(1 + (r/R_{0})^{6}) :: efficiency; R_{0} = Förster radius
H: Photosynthesis
P: Light-harvesting complexes funnel absorbed energy to reaction centres with ~95% efficiency, through networks of chlorophylls coupled by FRET-like interactions; some experiments suggest quantum coherence helps, though its role is debated.
H: Lasers
- CO_{2} lasers: N_{2} vibrational energy transfers to CO_{2} (near-resonant).
- HeNe: He metastables transfer to Ne by collisions.
X: FRET efficiency at r = R_{0}? At 2R_{0}?
> r = R_{0}: 50%
> r = 2R_{0}: 1/(1 + 64) ≈ 1.5%: a sensitive molecular ruler
!: FRET doesn't involve emitting and reabsorbing a photon; it's a direct near-field coupling.
Q: How does FRET efficiency depend on distance? | As 1/(1 + (r/R_{0})^{6}), falling steeply beyond the Förster radius.
Q: How does nitrogen help a CO_{2} laser? | Excited N_{2} vibrations transfer energy efficiently to the CO_{2} upper laser level.
M1: FRET is used as a: | Molecular ruler at nanometre scales | Thermometer | Magnetometer | Clock | Distance-sensitive.
M2: Dexter energy transfer requires: | Orbital overlap (very short range) | Long distances | Photons | Magnetic fields | Electron exchange.

## Non-radiative transitions
S: Excited molecules often return to lower states without emitting light, turning the energy into heat through vibrations. These non-radiative processes compete with fluorescence and decide how bright, efficient or photostable a material is.
H: Processes
- **Internal conversion**: between states of the same spin (S_{n} → S_{1}, S_{1} → S_{0}).
- **Intersystem crossing**: spin-changing (S_{1} → T_{1}), enhanced by heavy atoms (spin–orbit coupling).
- **Vibrational relaxation**: within a state to its lowest vibrational level (ps).
- **Quenching**: collisions with other molecules (oxygen is a strong quencher).
H: Energy gap law
P: The larger the energy gap to a lower state, the slower non-radiative decay (it needs more vibrational quanta at once). That's why molecules emit from S_{1} (Kasha's rule) and why infrared emitters tend to be inefficient: small gaps decay non-radiatively.
H: Conical intersections
- Points where two potential energy surfaces meet allow ultrafast (fs) non-radiative transitions.
- Protect DNA: absorbed UV energy converts to heat in < 1 ps, preventing damage.
- Drive the first step of vision (retinal isomerisation in ~200 fs).
X: A molecule has radiative lifetime 10 ns and observed fluorescence lifetime 2 ns. Quantum yield?
> Φ = τ_{obs}/τ_{rad} = 0.2: 80% decays non-radiatively
!: Low fluorescence doesn't mean low absorption; the energy may simply go into heat.
Q: What is Kasha's rule? | Emission occurs from the lowest excited state of a given multiplicity.
Q: Why is DNA relatively resistant to UV damage? | Conical intersections convert absorbed UV energy to heat within picoseconds.
M1: Heavy atoms increase: | Intersystem crossing | Fluorescence lifetime | Vibrational frequency | Absorption only | Spin–orbit coupling.
M2: The energy gap law says non-radiative decay is slower for: | Larger energy gaps | Smaller gaps | Heavier molecules only | Higher temperatures | More quanta needed.

## Photodissociation
S: Photodissociation is the breaking of a molecule by absorbing a photon. It drives atmospheric chemistry, creates and destroys ozone, shapes interstellar chemistry and is a tool for studying how chemical bonds break.
H: Mechanisms
- **Direct**: excitation to a repulsive state; fragments fly apart in ~100 fs.
- **Predissociation**: excitation to a bound state that crosses a repulsive one; dissociation after a delay.
- **Multiphoton**: intense lasers.
- Energy above the bond energy goes into fragment kinetic and internal energy.
H: Atmospheric importance
- O_{2} + UV (< 242 nm) → 2O; O + O_{2} → O_{3}: ozone formation.
- O_{3} + UV (200–320 nm) → O_{2} + O: absorbs UVB; the ozone layer's protective role.
- CFCs photolysed in the stratosphere release chlorine, which destroys ozone catalytically.
- NO_{2} photolysis drives smog chemistry.
H: Studying it
P: Ion imaging (velocity map imaging) photographs the fragments' speeds and angles, showing how energy partitions and how fast bonds break. Femtochemistry watches the process in real time (Zewail, Nobel 1999).
X: The O_{2} bond energy is 5.1 eV. Longest wavelength that can break it?
> λ = 1240/5.1 = 243 nm
!: Absorbing enough energy isn't always sufficient; the molecule must reach a dissociative state.
Q: What is predissociation? | Dissociation after excitation to a bound state that couples to a repulsive one.
Q: How does the ozone layer absorb UV? | Ozone molecules photodissociate on absorbing UVB and UVC.
M1: Photons that break O_{2} must be shorter than about: | 243 nm | 500 nm | 1 μm | 10 nm | 5.1 eV.
M2: Velocity map imaging measures: | Fragment velocity distributions | Bond lengths only | Temperatures | Magnetic moments | Photofragment imaging.

## Molecular beams
S: A molecular beam is a stream of molecules travelling in one direction through a vacuum with few collisions. Beams let physicists study isolated molecules, their collisions and their quantum states precisely.
H: Making beams
- **Effusive beams**: molecules leak through a small hole; Maxwellian speeds.
- **Supersonic beams**: high-pressure gas expands through a nozzle, converting thermal energy into directed flow; internal temperatures drop to ~1 K with a narrow speed spread.
- Seeding molecules in a carrier gas (He, Ar).
H: Manipulating beams
- Stern–Gerlach magnets and electrostatic hexapoles select quantum states.
- Stark and Zeeman decelerators slow polar or paramagnetic molecules to rest.
- Buffer-gas cooling makes slow, cold beams for laser cooling.
H: Landmark experiments
P: Stern and Gerlach's silver beam (1922) revealed spin quantisation. Rabi's molecular beam magnetic resonance (1938) measured nuclear moments, leading to NMR, atomic clocks and the maser. Crossed beams revealed reaction dynamics. Today beams of polar molecules (ThO, YbF, HfF^{+} in traps) set the tightest limits on the electron's electric dipole moment.
X: Why do supersonic beams cool molecules' rotations?
> Collisions in the expansion transfer internal energy into directed kinetic energy
> Only the lowest rotational levels remain populated: simple spectra
!: In a supersonic beam the lab-frame speed is high, but the molecules' relative motion and internal states are very cold.
Q: Why are supersonic beams useful for spectroscopy? | They cool molecules' internal states to a few kelvin, simplifying spectra.
Q: What did Rabi's molecular beam experiments lead to? | Magnetic resonance methods, including NMR and atomic clocks.
M1: An effusive beam has a speed distribution that is: | Maxwellian (flux-weighted) | Narrow | Zero | Monoenergetic | Thermal leak.
M2: Stark decelerators slow molecules that have: | Electric dipole moments | No charge or moment | Only spin | Large mass only | Electric field gradients.

## Ultrafast molecular dynamics
S: Ultrafast lasers with femtosecond pulses let scientists watch molecules vibrate, bonds break and electrons move in real time. This field reveals the fundamental steps of chemical reactions and biological processes.
H: Pump–probe method
- A pump pulse starts a process; a delayed probe pulse records the state.
- Scanning the delay builds up a "movie" with femtosecond resolution.
- Probes: absorption, fluorescence, photoelectrons, X-ray or electron diffraction.
H: Discoveries
- Wave-packet motion in molecules: NaI dissociation observed oscillating between covalent and ionic states (Zewail).
- Vision: retinal isomerisation in ~200 fs.
- Photosynthesis: energy transfer within ~ps.
- Electron dynamics on attosecond timescales: tunnel ionisation, charge migration.
H: New tools
P: X-ray free-electron lasers (LCLS, European XFEL) produce femtosecond X-ray pulses bright enough to image structures before radiation damage sets in ("diffract before destroy"), and ultrafast electron diffraction captures atomic motion directly, making molecular movies.
X: A C–C vibration has a period of ~30 fs. What pulse duration resolves it?
> Need pulses shorter than ~10 fs to follow the motion
!: Femtosecond resolution needs broad-bandwidth pulses; energy resolution is correspondingly limited.
Q: How does pump–probe spectroscopy work? | A pump pulse triggers a process and a time-delayed probe measures it.
Q: What is "diffract before destroy"? | Using femtosecond X-ray pulses to record diffraction before the sample is destroyed by the radiation.
M1: Femtochemistry was recognised by the Nobel Prize to: | Ahmed Zewail | Linus Pauling | Marie Curie | Richard Feynman | 1999.
M2: X-ray free-electron lasers provide: | Ultrashort, very bright X-ray pulses | Continuous visible light | Radio waves | Neutrons | XFELs.

## Quantum molecular physics
S: Molecules are quantum systems with rich internal structure: electronic, vibrational, rotational and spin states. Controlling molecules quantum mechanically opens new frontiers in chemistry, precision measurement and quantum computing.
H: Quantum effects in molecules
- Zero-point energy affects bond strengths and isotope effects in chemistry.
- Tunnelling of protons and hydrogen atoms (enzymes, ammonia inversion at 24 GHz: the first maser).
- Nuclear spin isomers: ortho- and para-hydrogen with different rotational states.
- Geometric (Berry) phases near conical intersections.
H: Ultracold molecules
- Assembled from ultracold atoms (KRb, NaK) via Feshbach resonances and stimulated Raman transfer.
- Directly laser-cooled molecules (SrF, CaF, CaOH).
- At nanokelvin, chemical reactions become quantum: controlled by single quantum states, electric fields and quantum statistics.
H: Applications
P: Polar molecules in optical tweezer arrays are qubit candidates (long-range dipolar interactions, many internal states). Molecules probe fundamental symmetries (electron EDM), possible variation of constants, and dark matter. Quantum simulations of molecules are a leading target for quantum computers.
X: Why does deuterium substitution slow some reactions (kinetic isotope effect)?
> D has lower zero-point energy in its bond than H (heavier)
> More energy is needed to reach the transition state; tunnelling is also less likely
!: Quantum effects in chemistry aren't limited to electrons; nuclei show zero-point motion and tunnelling too.
Q: What is the kinetic isotope effect? | Reaction rate changes when an atom is replaced by an isotope, mainly due to zero-point energy and tunnelling differences.
Q: Why are polar molecules interesting for quantum computing? | Long-range dipolar interactions and many controllable internal states.
M1: The ammonia maser used: | Tunnelling inversion of NH_{3} | Hydrogen fine structure | Electron spin | Nuclear fission | 24 GHz.
M2: Ortho- and para-hydrogen differ in: | Total nuclear spin | Number of protons | Electron spin | Bond length | Nuclear spin isomers.

## Spectroscopic selection rules
S: Molecular selection rules determine which transitions between electronic, vibrational and rotational states absorb or emit light. They follow from symmetry and angular momentum conservation and decide what each spectroscopic technique can see.
H: Rotational
- Microwave: permanent dipole needed; ΔJ = ±1.
- Raman: anisotropic polarisability; ΔJ = 0, ±2.
H: Vibrational
- IR: dipole must change; Δv = ±1 (harmonic), overtones weak.
- Raman: polarisability must change.
- Rovibrational IR: ΔJ = ±1 (P and R branches); Q branch (ΔJ = 0) for some molecules.
H: Electronic
- Spin selection rule: ΔS = 0 (relaxed by spin–orbit coupling).
- Laporte rule: in centrosymmetric molecules, g ↔ u only (why d–d transitions in octahedral complexes are weak).
- Vibronic coupling allows nominally forbidden transitions weakly.
H: Practical consequences
P: N_{2} and O_{2} (no dipole) don't absorb thermal infrared, which is why they aren't greenhouse gases while CO_{2}, H_{2}O and CH_{4} are. Raman and IR together reveal all vibrations of most molecules.
X: Which spectroscopy sees H_{2}'s vibration?
> No dipole change: IR-inactive
> Polarisability changes: Raman-active (4161 cm^{-1})
!: Selection rules tell you what's forbidden in the leading approximation; weak "forbidden" lines often appear through higher-order effects.
Q: Why aren't N_{2} and O_{2} greenhouse gases? | Their vibrations don't change the dipole moment, so they don't absorb infrared.
Q: What is the Laporte rule? | In centrosymmetric systems, electric dipole transitions must change parity (g ↔ u).
M1: Rotational Raman transitions obey: | ΔJ = 0, ±2 | ΔJ = ±1 | ΔJ = ±3 | Any ΔJ | Two-photon process.
M2: d–d transitions in octahedral complexes are weak because: | They're Laporte-forbidden | They're spin-allowed | They're in the X-ray region | They don't exist | g → g.
`;
