// Unit 27: Condensed Matter Physics. Format: kit/course/notes.js
export default `
## Crystalline and amorphous solids
S: In crystalline solids, atoms sit in a regular repeating pattern extending over long distances; in amorphous solids like glass, they have only short-range order. The difference shapes melting, strength, optics and electronic behaviour.
H: Crystalline
- Long-range periodic order; sharp diffraction peaks.
- Sharp melting point.
- Single crystals (silicon wafers, quartz, gemstones) vs polycrystals (most metals: many grains).
- Anisotropic properties in single crystals.
H: Amorphous
- Short-range order only (nearest neighbours similar), no periodicity.
- Diffuse diffraction rings.
- Soften gradually over a glass transition temperature T_{g} rather than melting sharply.
- Examples: window glass, amorphous silicon (solar cells), polymers, metallic glasses.
H: Quasicrystals
P: Shechtman (1982) found aluminium–manganese alloys with sharp diffraction showing five-fold symmetry, forbidden for periodic crystals. Quasicrystals have long-range order without periodicity, like Penrose tilings. Once dismissed, the discovery won the 2011 Chemistry Nobel and changed the definition of a crystal.
X: How does cooling rate decide whether silica forms quartz or glass?
> Slow cooling: atoms have time to arrange into a crystal (quartz)
> Fast cooling: atoms are frozen in a disordered arrangement (glass)
!: Glass isn't a slow-flowing liquid; medieval windows thicker at the bottom were made that way, not shaped by flow.
Q: What distinguishes crystalline from amorphous solids? | Long-range periodic order in crystals; only short-range order in amorphous solids.
Q: What is a quasicrystal? | A solid with long-range order but no periodic repetition, allowing symmetries like five-fold.
M1: Window glass is: | Amorphous | Crystalline | A quasicrystal | A liquid crystal | No long-range order.
M2: A sharp melting point is typical of: | Crystalline solids | Amorphous solids | Polymers | Gases | Uniform bonding.

## Crystal lattices and unit cells
S: A crystal is a lattice (an infinite array of points with identical surroundings) plus a basis (the group of atoms attached to each point). The unit cell is the repeating box that builds the whole crystal.
H: Definitions
E: R = n_{1}a_{1} + n_{2}a_{2} + n_{3}a_{3} :: lattice vectors
- Primitive cell: smallest repeating unit (one lattice point).
- Conventional cell: larger but shows symmetry clearly (e.g. cubic).
- Wigner–Seitz cell: region closer to one lattice point than any other.
H: Common structures
- **Simple cubic**: 1 atom per cell (polonium only).
- **Body-centred cubic (BCC)**: 2 per cell; iron, tungsten, sodium; packing 68%.
- **Face-centred cubic (FCC)**: 4 per cell; copper, aluminium, gold; packing 74% (close-packed).
- **Hexagonal close-packed (HCP)**: magnesium, titanium, zinc; 74%.
- **Diamond**: two interpenetrating FCC lattices; silicon, germanium, carbon.
- **Rock salt (NaCl)**, **caesium chloride**, **zinc blende** (GaAs), **perovskite** (ABO_{3}).
H: Coordination and packing
P: Coordination number (nearest neighbours): 12 for FCC/HCP, 8 for BCC, 4 for diamond. Low coordination in diamond-structure semiconductors reflects directional covalent bonds. Close packing (FCC, HCP) suits non-directional metallic bonding.
X: Density of copper (FCC, a = 0.361 nm, M = 63.5 g mol^{-1})?
> 4 atoms per cell; cell volume 4.70 × 10^{-29} m^{3}
> ρ = 4 × 63.5 × 10^{-3}/(6.02 × 10^{23} × 4.70 × 10^{-29}) = 8980 kg m^{-3} (measured 8960)
!: A lattice is a set of points, not atoms; the crystal structure is lattice + basis.
Q: What is a basis in crystallography? | The group of atoms associated with each lattice point.
Q: How many atoms per conventional cell in FCC? | Four.
M1: The packing fraction of FCC is: | 74% | 68% | 52% | 34% | Close-packed.
M2: Silicon has the: | Diamond structure | FCC metal structure | BCC structure | Rock salt structure | Tetrahedral bonding.

## Bravais lattices
S: In three dimensions there are exactly 14 distinct ways to arrange points so every point has identical surroundings: the Bravais lattices. They fall into seven crystal systems by shape of the unit cell.
H: Seven crystal systems
- Cubic (a = b = c, all 90°): simple, BCC, FCC.
- Tetragonal (a = b ≠ c): simple, body-centred.
- Orthorhombic (a ≠ b ≠ c, 90°): simple, base-, body-, face-centred.
- Hexagonal (a = b ≠ c, 120°).
- Trigonal/rhombohedral.
- Monoclinic: simple, base-centred.
- Triclinic (lowest symmetry).
H: Why only 14
P: Lattice periodicity restricts rotational symmetry to 1, 2, 3, 4 and 6-fold (the crystallographic restriction theorem): five-fold or seven-fold symmetry can't tile space periodically. Bravais (1848) showed that all centrings consistent with each system's symmetry give just 14 distinct lattices.
H: Combining with the basis
- 32 crystallographic point groups.
- 230 space groups describe all possible crystal symmetries in 3D (Fedorov, Schoenflies, 1891).
- In 2D: 5 Bravais lattices, 17 wallpaper groups (seen in Alhambra tilings).
X: Why can't you tile a floor with regular pentagons?
> Interior angle 108°: 360/108 isn't a whole number
> Five-fold symmetry is incompatible with periodic lattices
!: Base-centred cubic isn't a separate Bravais lattice; it breaks cubic symmetry and is equivalent to simple tetragonal.
Q: How many Bravais lattices are there in 3D? | 14.
Q: Which rotational symmetries are allowed for periodic lattices? | 1, 2, 3, 4 and 6-fold.
M1: The number of crystallographic space groups in 3D is: | 230 | 14 | 32 | 7 | Fedorov and Schoenflies.
M2: How many Bravais lattices are cubic? | 3 | 1 | 2 | 4 | Simple, BCC, FCC.

## Miller indices
S: Miller indices (hkl) label planes and directions in a crystal using whole numbers. They're used to specify crystal faces, cutting directions for wafers, and diffraction peaks.
H: Finding Miller indices
- Find the plane's intercepts with the axes in units of the lattice constants.
- Take reciprocals.
- Clear fractions to the smallest integers.
- Negative indices shown with a bar (written here as −1).
- Plane parallel to an axis: intercept ∞ → index 0.
H: Notation
- (hkl): a specific plane; {hkl}: family of equivalent planes.
- [uvw]: a direction; ⟨uvw⟩: family of directions.
- In cubic crystals, [hkl] is perpendicular to (hkl).
H: Plane spacing (cubic)
E: d_{hkl} = a/√(h^{2} + k^{2} + l^{2})
H: Uses
P: Silicon wafers are cut along (100) or (111) planes, which etch, oxidise and conduct differently. Diffraction peaks are labelled by Miller indices; which ones appear depends on the lattice type (e.g. FCC requires h, k, l all odd or all even).
X: Miller indices of a plane cutting the axes at 2a, 3a and ∞?
> Reciprocals: ½, ⅓, 0
> Multiply by 6: (320)
!: Miller indices describe orientation, not position: parallel planes share the same indices.
Q: How are Miller indices found? | Take the reciprocals of the plane's axial intercepts and clear fractions.
Q: What is the spacing of (hkl) planes in a cubic crystal? | d = a/√(h^{2} + k^{2} + l^{2}).
M1: The (100) plane in a cubic crystal is: | Perpendicular to the x-axis | Parallel to the x-axis | Diagonal | At 45° to all axes | Intercept only at x.
M2: In FCC, the first allowed diffraction peak is: | (111) | (100) | (110) | (210) | All odd.

## Crystal symmetry
S: Crystal symmetry describes the operations (rotations, reflections, inversions, translations, screw axes and glide planes) that map a crystal onto itself. Symmetry determines which physical properties a crystal can have.
H: Symmetry operations
- Point operations: rotations (2, 3, 4, 6-fold), mirrors, inversion, rotoinversions.
- Space operations: translations, screw axes (rotate + translate), glide planes (reflect + translate).
H: Neumann's principle
P: Any physical property of a crystal must have at least the symmetry of the crystal's point group. This forbids many properties: piezoelectricity requires no inversion centre (only 20 of 32 point groups allow it); pyroelectricity and ferroelectricity need a polar axis (10 groups); optical activity needs chirality.
H: Consequences
- Cubic crystals are optically isotropic (no birefringence) and have isotropic conductivity.
- Lower symmetry: anisotropic properties, more independent elastic constants.
- Symmetry breaking at phase transitions (cubic → tetragonal in BaTiO_{3}) creates domains and new properties.
- Topological materials are classified by symmetry plus band topology.
X: Can a cubic crystal like NaCl be birefringent?
> Neumann: optical properties must have cubic symmetry
> The permittivity tensor must be isotropic: no birefringence
!: High symmetry doesn't mean simple physics; symmetry constrains which tensor components can be non-zero but not their values.
Q: State Neumann's principle. | A crystal's physical properties must include all the symmetries of its point group.
Q: Why can't crystals with an inversion centre be piezoelectric? | Inversion symmetry forbids a linear relation between strain and polarisation.
M1: A screw axis combines: | Rotation and translation | Two reflections | Inversion and rotation | Only translation | Space-group operation.
M2: Cubic crystals are: | Optically isotropic | Always birefringent | Piezoelectric | Chiral | High symmetry.

## Reciprocal lattices
S: The reciprocal lattice is the Fourier transform of the crystal lattice: a lattice in wavevector space. It makes diffraction, electron waves in crystals and lattice vibrations easy to describe.
H: Definition
E: b_{1} = 2π(a_{2} × a_{3})/(a_{1}·(a_{2} × a_{3})), and cyclic
E: a_{i}·b_{j} = 2πδ_{ij}
E: G = hb_{1} + kb_{2} + lb_{3} :: reciprocal lattice vectors
- |G_{hkl}| = 2π/d_{hkl}; G is perpendicular to the (hkl) planes.
- Reciprocal of FCC is BCC and vice versa.
H: Brillouin zones
- First Brillouin zone: Wigner–Seitz cell of the reciprocal lattice.
- Electron and phonon states are labelled by wavevectors within it (Bloch's theorem).
- Band gaps open at zone boundaries.
H: Why it's useful
P: Any periodic function in the crystal (electron density, potential) is a sum of plane waves e^{iG·r}. Diffraction occurs when the change in wavevector equals a reciprocal lattice vector. Electrons and phonons in crystals have wavevectors defined only up to adding G, making the Brillouin zone the natural map of their states.
X: Reciprocal lattice of a simple cubic lattice with spacing a?
> b_{i} = (2π/a) along each axis
> Also simple cubic, spacing 2π/a
!: Reciprocal space has units of inverse length; distances there are wavevectors, not positions.
Q: What is the reciprocal lattice? | The set of wavevectors G for which e^{iG·R} = 1 for all lattice vectors R.
Q: What is the first Brillouin zone? | The Wigner–Seitz cell of the reciprocal lattice.
M1: The reciprocal lattice of FCC is: | BCC | FCC | Simple cubic | Hexagonal | Duality.
M2: |G_{hkl}| equals: | 2π/d_{hkl} | d_{hkl} | 2πd_{hkl} | 1/d^{2} | Plane spacing.

## X-ray diffraction
S: X-rays have wavelengths similar to atomic spacings, so crystals diffract them into sharp beams. The angles and intensities reveal crystal structures, from simple salts to DNA and proteins.
H: Bragg's law
E: 2d sin θ = nλ
- Reflections from planes of spacing d interfere constructively at specific angles.
- Laue condition (equivalent): k′ − k = G.
H: Intensities
E: F_{hkl} = Σf_{j}e^{iG·r_{j}} :: structure factor
- Atomic scattering factors f ∝ number of electrons.
- Systematic absences reveal lattice type (BCC: h + k + l even; FCC: all odd or all even).
- The phase problem: detectors measure |F|^{2}, not phases; solved by direct methods, heavy-atom substitution or anomalous scattering.
H: Methods and impact
- Powder diffraction: identifies phases in materials.
- Single-crystal: full 3D structures.
- Landmarks: NaCl (Braggs, 1913), DNA (Franklin, Wilkins, Watson, Crick, 1953), myoglobin (Kendrew, 1958), ribosome (2000). Over 200 000 protein structures determined.
- Also electron and neutron diffraction (neutrons see light atoms and magnetic order).
X: Copper Kα X-rays (0.154 nm) diffract from (111) planes of silicon (d = 0.314 nm). First-order angle?
> sin θ = 0.154/(2 × 0.314) = 0.245
> θ = 14.2° (2θ = 28.4°)
!: Bragg's "reflection" is constructive interference from many planes, not mirror reflection; it only occurs at precise angles.
Q: State Bragg's law. | 2d sin θ = nλ.
Q: What is the phase problem? | Diffraction measures intensities, losing the phases needed to reconstruct the structure directly.
M1: X-ray crystallography revealed the structure of: | DNA | Electrons | Neutrinos | Quarks | Photo 51.
M2: Neutron diffraction is especially useful for locating: | Hydrogen atoms and magnetic order | Heavy atoms only | Electrons | Photons | Neutrons scatter from nuclei.

## Phonons and lattice vibrations
S: Atoms in a crystal vibrate collectively in waves. Quantised, these vibrations are phonons, quasiparticles that carry sound and heat and interact with electrons, light and neutrons.
H: Dispersion relations
E: ω = 2√(K/m)|sin(ka/2)| :: 1D monatomic chain
- Linear at small k (sound waves, v = a√(K/m)); flattens at the zone boundary.
- Two atoms per cell: acoustic and optical branches.
- 3D: three acoustic branches (one longitudinal, two transverse) and 3(p − 1) optical.
H: Phonons as particles
- Energy ħω, crystal momentum ħk.
- Bosons; number not conserved; Bose–Einstein distribution with μ = 0.
- Measured by inelastic neutron scattering, Raman and infrared spectroscopy.
H: Roles
P: Phonons carry heat in insulators, set heat capacities, scatter electrons (resistance), glue electrons into Cooper pairs in conventional superconductors, limit carrier mobility in semiconductors, and soften at structural phase transitions (soft modes).
X: Maximum frequency of a chain with K = 10 N m^{-1}, m = 4.7 × 10^{-26} kg (silicon-like)?
> ω_{max} = 2√(K/m) = 2√(2.1 × 10^{26}) = 2.9 × 10^{13} rad s^{-1}
> f ≈ 4.6 THz
!: Crystal momentum ħk isn't true momentum; it's conserved only modulo reciprocal lattice vectors (Umklapp processes).
Q: What is a phonon? | A quantum of collective lattice vibration.
Q: What's the difference between acoustic and optical phonons? | Acoustic: neighbouring atoms move together, ω → 0 at small k. Optical: atoms in a cell move oppositely, finite ω at k = 0.
M1: At long wavelengths, acoustic phonons have: | ω ∝ k (sound) | Constant ω | ω = 0 | ω ∝ k^{2} | Linear dispersion.
M2: Optical phonons interact strongly with infrared light in: | Ionic crystals | Metals only | Vacuum | Monatomic chains | Oscillating dipoles.

## Specific heat of solids
S: The heat capacity of solids is constant at high temperatures but falls towards zero as temperature drops. Explaining this required quantum theory: Einstein and Debye's models of quantised lattice vibrations.
H: Classical: Dulong–Petit
E: C = 3R per mole (~25 J mol^{-1} K^{-1})
- Works at room temperature for many solids; fails at low T and for light, stiff solids (diamond).
H: Einstein model (1907)
- All atoms as independent oscillators at one frequency ω_{E}.
- C → 0 exponentially at low T: right trend, wrong form.
H: Debye model (1912)
E: C ∝ T^{3} at low T :: Debye T^{3} law
E: θ_{D} = ħω_{D}/k_{B} :: Debye temperature
- Treats phonons as sound waves up to a cut-off.
- θ_{D}: lead 105 K, copper 343 K, silicon 645 K, diamond 2230 K.
H: Metals
E: C = γT + βT^{3} :: electronic + phonon
P: Electrons contribute only a small term linear in T, because only those within k_{B}T of the Fermi energy can be excited. Plotting C/T against T^{2} gives a straight line: the intercept is γ (electronic), the gradient β (phonons). Heavy-fermion materials have γ values hundreds of times larger.
X: Why is diamond's heat capacity at room temperature well below 3R?
> θ_{D} = 2230 K ≫ 300 K
> Many vibrational modes are frozen out
!: Dulong–Petit is a high-temperature limit; "room temperature" isn't always high compared with θ_{D}.
Q: What does the Debye model predict at low temperatures? | Heat capacity ∝ T^{3}.
Q: Why is the electronic heat capacity of metals small? | Only electrons near the Fermi energy (within ~k_{B}T) can be thermally excited.
M1: At high temperatures, molar heat capacity of a solid approaches: | 3R | R | (3/2)R | 0 | Dulong–Petit.
M2: Plotting C/T against T^{2} for a metal gives intercept: | The electronic coefficient γ | The Debye temperature | Zero | The Fermi energy | Linear term.

## Thermal conductivity
S: Heat in solids is carried by phonons and, in metals, mostly by electrons. Their mean free paths, limited by scattering, set how well materials conduct heat: from diamond's record to aerogels' insulation.
H: Kinetic formula
E: κ = ⅓Cvl
H: Phonon conduction
- **Umklapp scattering** dominates at high T: κ ∝ 1/T.
- **Boundary and defect scattering** dominate at low T: κ ∝ T^{3} (heat capacity).
- Peak at intermediate T.
- Isotopically pure diamond: ~3300 W m^{-1} K^{-1} at room temperature.
H: Electronic conduction
E: κ_{e}/σ = LT, L = 2.44 × 10^{-8} W Ω K^{-2} :: Wiedemann–Franz law
- Good electrical conductors are good thermal conductors.
H: Engineering heat flow
P: Thermoelectrics want low κ with high electrical conductivity ("phonon glass, electron crystal"): nanostructuring scatters phonons more than electrons. Electronics want high-κ substrates (diamond, SiC, boron arsenide). Thermal barrier coatings on jet engine blades use low-κ ceramics.
X: Copper (σ = 6 × 10^{7} S m^{-1}) at 300 K: predict κ from Wiedemann–Franz.
> κ = LσT = 2.44 × 10^{-8} × 6 × 10^{7} × 300 = 440 W m^{-1} K^{-1} (measured ~400)
!: Electrical insulators can be excellent thermal conductors (diamond, sapphire): electrons aren't needed for heat flow.
Q: What is Umklapp scattering? | Phonon–phonon scattering that changes total crystal momentum by a reciprocal lattice vector, limiting heat flow.
Q: State the Wiedemann–Franz law. | The ratio of electronic thermal conductivity to electrical conductivity is proportional to temperature.
M1: At high temperatures phonon thermal conductivity typically: | Falls as 1/T | Rises as T^{3} | Is constant | Vanishes | Umklapp.
M2: Thermoelectric materials aim for: | High electrical and low thermal conductivity | High thermal conductivity | Low electrical conductivity | Zero Seebeck coefficient | ZT.

## Electronic band structure
S: In a crystal, electrons' allowed energies form bands separated by gaps, because their waves interact with the periodic lattice. Band structure explains why materials are metals, insulators or semiconductors.
H: Bloch's theorem
E: ψ_{k}(r) = e^{ik·r}u_{k}(r) :: u has the lattice periodicity
- Electrons in a perfect crystal move without scattering; only defects and phonons cause resistance.
H: Origins of gaps
- **Nearly-free electrons**: waves Bragg-reflect at zone boundaries; standing waves concentrate electrons either on or between ions, splitting energies by 2|V_{G}|.
- **Tight binding**: atomic orbitals overlap and broaden into bands; width ∝ overlap.
H: Key concepts
- Effective mass m* = ħ^{2}/(d^{2}E/dk^{2}): band curvature.
- Holes: missing electrons near a band top behave as positive carriers.
- Direct vs indirect gaps (GaAs direct: efficient light emission; Si indirect).
- Computed by density functional theory; measured by ARPES.
X: An electron in GaAs has m* = 0.067m_{e}. Why does that help fast transistors?
> Low effective mass ⇒ high mobility μ = eτ/m*
> Electrons accelerate easily in fields
!: Electrons in bands aren't free, but near band edges they behave as if free with an effective mass, which can even be negative.
Q: State Bloch's theorem. | Electron wavefunctions in a periodic potential are plane waves times functions with the lattice periodicity.
Q: What is effective mass? | The mass describing how an electron accelerates in a band, set by the band's curvature.
M1: Band gaps open at: | Brillouin zone boundaries | Zone centre only | Random energies | The Fermi energy always | Bragg reflection.
M2: Silicon is a poor light emitter because its band gap is: | Indirect | Direct | Zero | Too large | Phonon needed.

## Metals, insulators and semiconductors
S: Whether a material conducts depends on how electrons fill its bands. Metals have partly filled bands; insulators have filled bands and large gaps; semiconductors have small gaps that thermal energy, light or doping can bridge.
H: The categories
- **Metals**: Fermi level inside a band; conductivity ~10^{7} S m^{-1}; resistance rises with T.
- **Insulators**: gap > ~4 eV (diamond 5.5, SiO_{2} ~9).
- **Semiconductors**: gap ~0.1–3 eV (Si 1.12, GaAs 1.42, Ge 0.66, GaN 3.4).
- **Semimetals**: slight band overlap (bismuth, graphite).
H: Intrinsic carriers
E: n_{i} ∝ T^{3/2}e^{−E_{g}/(2k_{B}T)}
- Silicon at 300 K: n_{i} ≈ 10^{16} m^{-3}: very few.
H: Doping
P: Adding donor atoms (phosphorus in silicon, one extra electron) makes n-type; acceptors (boron, one fewer) make p-type. Doping at parts per million raises conductivity by orders of magnitude and lets engineers build p–n junctions, transistors and solar cells. Semiconductors' conductivity rises with temperature (more carriers), opposite to metals.
H: Beyond band theory
- Mott insulators: half-filled bands that insulate because of electron repulsion (NiO, cuprate parent compounds).
X: Ratio of intrinsic carrier densities in silicon and germanium at 300 K (ignoring prefactors)?
> e^{−(1.12 − 0.66)/(2 × 0.0259)} = e^{−8.9} ≈ 1.4 × 10^{-4}
!: Semiconductor resistance falls with temperature; metal resistance rises: a quick experimental test.
Q: Why are metals conductors in band theory? | Their highest occupied band is only partly filled.
Q: What is n-type doping? | Adding donor impurities that contribute free electrons.
M1: Silicon's band gap at room temperature is: | 1.12 eV | 5.5 eV | 0.01 eV | 3.4 eV | Standard value.
M2: A Mott insulator insulates because of: | Strong electron repulsion | A full band | Doping | Disorder | Correlations.

## Fermi energy and Fermi surfaces
S: The Fermi energy is the highest occupied electron energy at absolute zero; the Fermi surface is the surface in momentum space separating filled from empty states. Almost all of a metal's electronic properties come from electrons near the Fermi surface.
H: Free-electron results
E: E_{F} = (ħ^{2}/2m)(3π^{2}n)^{2/3}; k_{F} = (3π^{2}n)^{1/3}
E: T_{F} = E_{F}/k_{B} :: ~10^{4}–10^{5} K for metals
- Free-electron Fermi surface: a sphere.
H: Real Fermi surfaces
- Crystal potentials distort the sphere: copper's has "necks" touching the zone boundary.
- Electron and hole pockets in semimetals.
- Nesting (parallel sections) can drive charge or spin density waves.
H: Measuring them
P: Quantum oscillations (de Haas–van Alphen effect): in strong magnetic fields, magnetisation and resistance oscillate with 1/B; the frequencies give extremal cross-sections of the Fermi surface (Onsager relation). ARPES maps bands and Fermi surfaces directly by photoemission.
X: Fermi velocity in copper (E_{F} = 7.0 eV)?
> v_{F} = √(2E_{F}/m) = √(2 × 7 × 1.6 × 10^{-19}/9.11 × 10^{-31})
> ≈ 1.6 × 10^{6} m s^{-1}: fast, even at 0 K
!: Fermi energy depends only on electron density (for free electrons), not on temperature; Fermi–Dirac smearing is just ~k_{B}T wide.
Q: What is the Fermi surface? | The constant-energy surface in k-space separating occupied from unoccupied states at T = 0.
Q: How are Fermi surfaces measured? | Quantum oscillations in strong fields and angle-resolved photoemission (ARPES).
M1: Fermi temperatures of metals are typically: | 10^{4}–10^{5} K | 300 K | 1 K | 10^{9} K | Much higher than room T.
M2: The de Haas–van Alphen effect oscillates periodically in: | 1/B | B | T | E | Onsager relation.

## Density of states
S: The density of states counts how many electron (or phonon) states there are per unit energy. It controls heat capacity, conductivity, optical absorption and how a material responds to doping or light.
H: Free electrons
E: g(E) = (V/2π^{2})(2m/ħ^{2})^{3/2}√E :: 3D
- 2D: constant; 1D: ∝ 1/√E; 0D (quantum dots): discrete delta functions.
H: Why dimension matters
P: Lower dimensions concentrate states at band edges: quantum wells have step-like densities of states, improving laser efficiency; quantum wires have sharp peaks; quantum dots act as artificial atoms. Dimensional engineering is central to optoelectronics.
H: Van Hove singularities
- Kinks or peaks where bands are flat (dE/dk = 0).
- Enhance optical absorption and can boost superconductivity or magnetism.
H: Measuring it
- Scanning tunnelling spectroscopy: dI/dV ∝ local density of states.
- Photoemission; electronic heat capacity (γ ∝ g(E_{F})).
X: How does the electronic heat capacity coefficient depend on g(E_{F})?
> γ = (π^{2}/3)k_{B}^{2}g(E_{F})
> Heavy-fermion metals have huge g(E_{F}), giving large γ
!: Density of states counts available states, not occupied ones; occupation needs the Fermi–Dirac function too.
Q: How does the 3D free-electron density of states depend on energy? | g(E) ∝ √E.
Q: What does scanning tunnelling spectroscopy measure? | The local density of electronic states (dI/dV).
M1: In 2D, the free-electron density of states is: | Constant | ∝ √E | ∝ 1/√E | Discrete | Step-like.
M2: Quantum dots have a density of states that is: | Discrete, atom-like | Continuous | Constant | Zero | 0D confinement.

## Electron transport
S: Electron transport describes how electrons carry current and heat through materials under fields and temperature gradients. Scattering by phonons, impurities and other electrons sets resistance; at small scales, quantum effects take over.
H: Drude–Sommerfeld model
E: σ = ne^{2}τ/m*; μ = eτ/m*
E: l = v_{F}τ :: mean free path
- Copper at 300 K: τ ≈ 2.5 × 10^{-14} s, l ≈ 40 nm.
H: Boltzmann transport
P: The Boltzmann equation tracks how the electron distribution shifts under forces and relaxes by scattering. It gives conductivity, thermopower and Hall coefficients from the band structure and scattering rates, and is used to design semiconductors and thermoelectrics.
H: Mesoscopic and quantum transport
- **Ballistic** transport when devices are shorter than l.
- **Conductance quantum**: G_{0} = 2e^{2}/h ≈ 77.5 μS per channel (quantised point contacts).
- **Weak localisation**: interference raises resistance at low T.
- **Coulomb blockade** in single-electron transistors.
- **Spintronics**: spin-polarised currents.
X: Mean free path of electrons in pure copper at 4 K, if resistivity drops 1000-fold?
> τ (and l) increase ~1000×: l ≈ 40 μm
!: Resistance isn't caused by electrons bumping into ions of a perfect lattice; Bloch waves pass through it freely. Imperfections and vibrations cause scattering.
Q: What causes electrical resistance in metals? | Scattering of electrons by phonons, impurities and defects.
Q: What is the conductance quantum? | G_{0} = 2e^{2}/h ≈ 77.5 μS.
M1: In the Drude model, conductivity is proportional to: | Scattering time τ | Mass | 1/n | Temperature always | σ = ne^{2}τ/m.
M2: Ballistic transport occurs when the device is: | Shorter than the mean free path | Longer than it | Very hot | Superconducting only | No scattering.

## Electrical resistivity
S: Resistivity measures how strongly a material opposes current. In metals it rises with temperature as phonons scatter electrons; in semiconductors it falls as more carriers are freed; in superconductors it vanishes.
H: Metals
E: ρ = ρ_{0} + ρ_{ph}(T) :: Matthiessen's rule
- ρ_{0}: residual resistivity from impurities and defects (independent of T).
- ρ_{ph}: ∝ T above θ_{D}; ∝ T^{5} at low T (Bloch–Grüneisen).
- Residual resistivity ratio (ρ_{300K}/ρ_{4K}) measures purity.
H: Semiconductors
- Intrinsic: ρ falls exponentially with T.
- Doped: freeze-out at low T, extrinsic plateau, then intrinsic at high T.
H: Unusual behaviour
- **Kondo effect**: resistivity minimum and rise at low T from magnetic impurities.
- **Strange metals** (cuprates, heavy fermions): ρ ∝ T down to low temperatures, unexplained by standard theory.
- **Superconductors**: ρ = 0 below T_{c}.
- **Metal–insulator transitions**.
H: Measurement
P: Four-probe (van der Pauw) methods remove contact resistance; Hall bars measure resistivity and Hall coefficient together.
X: A copper wire's resistance is 10 Ω at 20 °C. At 80 °C (α = 0.0039 K^{-1})?
> R = 10(1 + 0.0039 × 60) = 12.3 Ω
!: Matthiessen's rule is approximate; scattering mechanisms aren't always independent.
Q: What is Matthiessen's rule? | Resistivity is the sum of contributions from independent scattering mechanisms.
Q: What is the Kondo effect? | A rise in resistivity at low temperature caused by magnetic impurities.
M1: In a metal at high T, resistivity is roughly: | ∝ T | ∝ T^{5} | Constant | Exponential | Phonon scattering.
M2: Residual resistivity comes from: | Impurities and defects | Phonons | Superconductivity | Light | T-independent.

## Hall effect
S: When current flows through a conductor in a perpendicular magnetic field, a voltage appears across it. The Hall effect reveals the sign and density of charge carriers and is used in countless magnetic sensors.
H: Classical Hall effect
E: V_{H} = IB/(nqt); R_{H} = 1/(nq) :: t = thickness
- Sign of V_{H} gives the carriers' charge: positive in p-type semiconductors (holes) and some metals (Al, Zn).
- Semiconductors (low n) give large Hall voltages: ideal sensors.
H: Applications
- Hall probes measure magnetic fields.
- Brushless motor position sensing, phone compasses, car ignition timing, current sensors.
- Characterising semiconductors: carrier density and mobility (μ = R_{H}σ).
- Hall thrusters for spacecraft (different physics, related geometry).
H: Anomalous and spin Hall effects
P: In ferromagnets, an extra anomalous Hall voltage depends on magnetisation and band topology (Berry curvature). The spin Hall effect separates spins to opposite edges without a magnetic field, used to switch magnetic memory. At low temperature and high field, the Hall resistance becomes quantised: the quantum Hall effect.
X: A copper strip (n = 8.5 × 10^{28} m^{-3}, t = 0.1 mm) carries 5 A in 1 T. Hall voltage?
> V = 5 × 1/(8.5 × 10^{28} × 1.6 × 10^{-19} × 10^{-4}) = 3.7 μV: small in metals
!: The Hall effect can show positive carriers even in metals, because "holes" in nearly full bands behave as positive charges.
Q: What does the sign of the Hall voltage reveal? | Whether the charge carriers are positive (holes) or negative (electrons).
Q: Why are semiconductors used in Hall sensors? | Their low carrier density gives large Hall voltages.
M1: The Hall voltage is inversely proportional to: | Carrier density | Magnetic field | Current | Charge sign only | V_{H} = IB/(nqt).
M2: Hall sensors in phones are used as: | Magnetometers (compasses, cover detection) | Microphones | Cameras | Batteries | Magnetic field sensing.

## Magnetic ordering
S: In many materials, electron spins order spontaneously below a critical temperature into patterns: all parallel (ferromagnets), alternating (antiferromagnets), unequal antiparallel (ferrimagnets) or more complex spirals and frustrated states.
H: Exchange interaction
E: H = −JΣS_{i}·S_{j} :: Heisenberg model
- J > 0: ferromagnetic; J < 0: antiferromagnetic.
- Origin: Pauli exclusion plus Coulomb repulsion (direct exchange, superexchange through oxygen ions, RKKY through conduction electrons).
H: Types of order
- **Ferromagnetic**: Fe, Co, Ni; T_{C}.
- **Antiferromagnetic**: MnO, Cr, NiO; Néel temperature T_{N}; zero net moment; revealed by neutron diffraction (Shull, Nobel 1994).
- **Ferrimagnetic**: magnetite, ferrites.
- **Helical/spiral**: rare earths; multiferroics.
- **Frustrated systems**: spin ice, spin liquids (no order even at T = 0).
H: Excitations
- Magnons (spin waves): quantised spin precession waves; ω ∝ k^{2} in ferromagnets, ∝ k in antiferromagnets.
- Magnonics uses them to carry information.
X: Why do antiferromagnets have no net magnetisation but still order?
> Neighbouring spins point opposite ways: moments cancel
> The spins are still ordered (a staggered pattern), seen as extra neutron diffraction peaks
!: Antiferromagnets are increasingly important in spintronics because they're fast and immune to stray fields.
Q: What is the exchange interaction? | An effective spin–spin interaction from Pauli exclusion and Coulomb repulsion that aligns or anti-aligns neighbouring spins.
Q: What is a magnon? | A quantised spin wave.
M1: Antiferromagnetic order disappears above the: | Néel temperature | Curie temperature | Debye temperature | Fermi temperature | T_{N}.
M2: Antiferromagnetic order was first directly observed using: | Neutron diffraction | X-rays | Optical microscopes | Hall probes | Magnetic Bragg peaks.

## Ferromagnetic and antiferromagnetic materials
S: Ferromagnets and antiferromagnets are the workhorses of magnetic technology: permanent magnets, transformer cores, hard drives and new spintronic memories. Their properties come from exchange, anisotropy and domain structure.
H: Ferromagnets
- **Magnetic anisotropy**: preferred magnetisation directions (easy axes) from spin–orbit coupling and crystal structure; key to permanent magnets.
- **Domains and domain walls**: walls ~10–100 nm thick; magnetisation changes by wall motion and domain rotation.
- **Soft** (low coercivity, high permeability) vs **hard** (high coercivity and remanence).
H: Antiferromagnets
- Zero stray fields; robust against external fields; dynamics at THz frequencies (much faster than ferromagnets' GHz).
- Used in exchange bias: pinning layers in hard-drive read heads.
- Can be switched electrically in some materials (CuMnAs).
H: Technologies
P: Giant magnetoresistance (Fert, Grünberg, Nobel 2007) and tunnelling magnetoresistance read hard drives. MRAM stores bits in magnetic tunnel junctions, switched by spin-transfer or spin–orbit torques. Rare-earth magnets (NdFeB, SmCo) power EV motors and wind turbines.
X: Why are hard-disk bits very small but stable for years?
> High-anisotropy materials (CoCrPt alloys, FePt) give a large energy barrier KV
> Need KV/(k_{B}T) > ~60 for 10-year stability
!: Making magnetic bits smaller reduces their energy barrier (superparamagnetic limit); higher anisotropy materials and heat-assisted recording push this back.
Q: What is magnetic anisotropy? | Dependence of a magnet's energy on magnetisation direction, giving easy axes.
Q: Why are antiferromagnets attractive for spintronics? | No stray fields, robustness to external fields and ultrafast (THz) dynamics.
M1: Giant magnetoresistance was used first in: | Hard-disk read heads | Solar cells | LEDs | Batteries | 1997 onwards.
M2: The superparamagnetic limit concerns: | Thermal instability of very small magnetic bits | Magnets at high field | Superconductors | Paramagnets only | KV vs k_{B}T.

## Dielectric properties
S: Dielectrics are insulators that polarise in electric fields, storing energy and slowing light. Their permittivity and losses, which depend strongly on frequency, decide their use in capacitors, cables, microwave devices and optics.
H: Permittivity and polarisation
E: D = ε_{0}ε_{r}E; P = ε_{0}χE; ε_{r} = 1 + χ
E: ε(ω) = ε′ − iε″ :: complex permittivity (loss in ε″)
- Loss tangent tan δ = ε″/ε′.
H: Frequency response
- Orientational polarisation: up to GHz (Debye relaxation).
- Ionic: infrared resonances.
- Electronic: ultraviolet resonances; sets the optical refractive index.
- Clausius–Mossotti relation links ε_{r} to molecular polarisability.
H: Applications
- High-κ dielectrics (hafnium oxide, κ ≈ 25) replaced SiO_{2} (κ = 3.9) in transistor gates to cut leakage.
- Low-κ dielectrics between chip wiring reduce delays.
- Microwave substrates and resonators (low loss).
- Microwave heating exploits water's high ε″ at GHz.
X: A capacitor's SiO_{2} gate (κ = 3.9, 1.2 nm) is replaced by HfO_{2} (κ = 25). Same capacitance thickness?
> d = 1.2 × 25/3.9 ≈ 7.7 nm: thicker layer, far less tunnelling leakage
!: Permittivity values depend on frequency; using a DC value for an optical calculation gives wrong answers.
Q: What is the loss tangent? | The ratio of the imaginary to real permittivity, measuring dielectric energy loss.
Q: Why did chipmakers switch to high-κ gate dielectrics? | To keep capacitance high with a thicker layer that reduces tunnelling leakage.
M1: Electronic polarisation responds up to: | Ultraviolet frequencies | Only DC | Microwaves only | Radio | Light electrons.
M2: The Clausius–Mossotti relation links permittivity to: | Molecular polarisability | Conductivity | Magnetisation | Density of states | Microscopic to macroscopic.

## Piezoelectricity
S: Piezoelectric materials produce a voltage when squeezed and change shape when a voltage is applied. They're in quartz watches, ultrasound probes, inkjet printers, gas lighters and precision positioners.
H: Physics
E: P_{i} = d_{ijk}σ_{jk} :: direct effect
E: S_{ij} = d_{kij}E_{k} :: converse effect
- Requires no centre of symmetry: 20 of 32 point groups.
- Discovered by Pierre and Jacques Curie (1880) in quartz.
H: Materials
- Quartz (stable, precise; d ≈ 2 pC N^{-1}).
- Lead zirconate titanate (PZT): ceramic, d ~ 300–600 pC N^{-1}, poled after manufacture.
- Aluminium nitride, zinc oxide (thin films for MEMS and RF filters).
- PVDF polymer (flexible sensors).
- Lead-free alternatives (KNN, BNT) under development.
H: Applications
- Quartz crystal oscillators (32 768 Hz in watches; MHz in electronics).
- Ultrasound transducers and sonar.
- Inkjet heads, fuel injectors, nanopositioners in scanning probe microscopes.
- Surface/bulk acoustic wave filters in phones.
- Energy harvesting from vibrations.
X: A PZT stack (d = 500 pm V^{-1}, 100 layers) gets 100 V. Expansion?
> Per layer: 500 × 10^{-12} × 100 = 5 × 10^{-8} m
> Total: 5 μm: precise nanoscale motion
!: Piezoelectricity needs a non-centrosymmetric structure; ceramics like PZT must be "poled" to align their domains, or the effects cancel.
Q: What is the converse piezoelectric effect? | An applied electric field produces mechanical strain.
Q: Why do quartz oscillators keep accurate time? | Quartz's piezoelectric resonance is very stable and high-Q.
M1: Quartz watches oscillate at: | 32 768 Hz | 50 Hz | 1 MHz | 1 Hz | 2^{15} Hz.
M2: Piezoelectricity requires a crystal lacking: | An inversion centre | Any symmetry | Mirrors | Electrons | Non-centrosymmetric.

## Ferroelectricity
S: Ferroelectrics have a spontaneous electric polarisation that can be reversed by an applied field. Like ferromagnets with magnetisation, they show domains, hysteresis and a critical (Curie) temperature.
H: Properties
- Spontaneous polarisation P_{s} below T_{C}; switchable.
- Hysteresis loop of P against E: remanent polarisation, coercive field.
- All ferroelectrics are piezoelectric and pyroelectric.
- Very high permittivity near T_{C}.
H: Examples
- Barium titanate (BaTiO_{3}, T_{C} ≈ 120 °C): perovskite; titanium shifts off-centre.
- PZT, lithium niobate (optics), hafnium oxide (thin films, CMOS-compatible).
- Rochelle salt (first discovered, 1920).
H: Applications
- High-κ multilayer capacitors (billions made yearly).
- Ferroelectric RAM (FeRAM) and ferroelectric transistors: non-volatile memory.
- Electro-optic modulators (lithium niobate), pyroelectric infrared detectors.
- Multiferroics: coupled ferroelectric and magnetic order (BiFeO_{3}).
H: Soft modes
P: As T_{C} is approached, a particular optical phonon softens: its frequency falls towards zero, and the lattice distorts into the polar phase. Ferroelectric transitions are a classic example of displacive structural phase transitions.
X: Why does BaTiO_{3}'s permittivity peak sharply near 120 °C?
> Near T_{C}, the lattice is very soft against the polar distortion
> Small fields produce large polarisation: ε_{r} rises to ~10 000
!: Ferroelectrics don't contain iron; the name comes from the analogy with ferromagnetism.
Q: What is ferroelectricity? | Spontaneous electric polarisation reversible by an applied field.
Q: Why are ferroelectrics used in memory? | Their two stable polarisation states store bits without power.
M1: Barium titanate's ferroelectricity arises from: | Off-centre displacement of Ti ions | Iron atoms | Free electrons | Magnetic spins | Perovskite distortion.
M2: All ferroelectrics are also: | Piezoelectric and pyroelectric | Magnetic | Superconducting | Metallic | Symmetry.

## Superconductivity
S: Below a critical temperature, superconductors carry current with exactly zero resistance and expel magnetic fields. Discovered in 1911, superconductivity is a macroscopic quantum state used in MRI magnets, particle accelerators and quantum computers.
H: Defining properties
- Zero DC resistance (persistent currents flow for years).
- **Meissner effect**: field expulsion; levitation of magnets.
- Critical temperature T_{c}, critical field B_{c}, critical current density J_{c}.
- Flux quantisation: Φ_{0} = h/(2e) (the 2e shows pairing).
H: Types
- **Type I**: complete expulsion up to B_{c} (pure metals: Pb, Sn, Hg).
- **Type II**: above B_{c1}, flux enters as quantised vortices; superconductivity persists to B_{c2} (NbTi to ~10 T, Nb_{3}Sn ~25 T, REBCO > 100 T). Vortex pinning gives high J_{c}.
H: Theory
P: London equations (1935) explain the Meissner effect with penetration depth λ ~ 50–500 nm. Ginzburg–Landau theory (1950) uses an order parameter. BCS theory (1957) explains conventional superconductors microscopically through Cooper pairs bound by phonons, with an energy gap Δ ≈ 1.76k_{B}T_{c}.
H: Applications
- MRI (NbTi at 4 K), LHC magnets, fusion (ITER, compact tokamaks using REBCO).
- SQUIDs, superconducting qubits, single-photon detectors.
- Power cables, fault-current limiters, maglev (SCMaglev).
X: Energy gap of niobium (T_{c} = 9.3 K)?
> Δ ≈ 1.76 × 8.62 × 10^{-5} × 9.3 = 1.4 meV
!: A superconductor isn't just a perfect conductor; perfect conductors would trap fields, but superconductors actively expel them.
Q: What is the Meissner effect? | The expulsion of magnetic flux from a superconductor below T_{c}.
Q: How do type II superconductors carry large currents in high fields? | Flux enters as pinned vortices, while superconductivity persists.
M1: The flux quantum in superconductors is h/2e because: | Charge carriers are pairs of electrons | Electrons are halved | Flux is doubled | Holes carry charge | Cooper pairs.
M2: MRI magnets typically use: | NbTi at about 4 K | Copper at room temperature | Iron cores | Permanent magnets only | Superconducting wire.

## Conventional and unconventional superconductors
S: Conventional superconductors are explained by BCS theory, with electrons paired by lattice vibrations. Unconventional ones (cuprates, iron-based, heavy fermions) pair through other mechanisms, often magnetic, and reach much higher critical temperatures.
H: Conventional
- Elements and alloys: Al (1.2 K), Nb (9.3 K), NbTi (10 K), Nb_{3}Sn (18 K), MgB_{2} (39 K, 2001).
- s-wave pairing (gap same in all directions).
- Isotope effect T_{c} ∝ M^{−1/2}: phonon involvement.
- Hydrides under megabar pressure: H_{3}S (203 K, 2015), LaH_{10} (~250 K); room-temperature claims have been retracted.
H: Unconventional
- **Cuprates** (Bednorz and Müller, 1986, Nobel 1987): YBCO 93 K (above liquid nitrogen's 77 K), HgBaCaCuO 133 K (164 K under pressure). d-wave pairing; parent compounds are Mott insulators.
- **Iron pnictides and chalcogenides** (2008): up to ~55 K.
- **Heavy fermions**, organics, Sr_{2}RuO_{4}, nickelates (2019), twisted bilayer graphene (2018).
H: The open problem
P: No accepted theory explains high-T_{c} superconductivity; spin fluctuations are a leading candidate for the pairing glue. Understanding it might lead to room-temperature superconductors at ambient pressure, which would transform power transmission and technology.
X: Why was YBCO's 93 K T_{c} a technological breakthrough?
> Above liquid nitrogen's boiling point (77 K)
> Cooling with cheap liquid nitrogen instead of liquid helium
!: High-T_{c} doesn't mean room temperature; the record at ambient pressure is still ~133 K.
Q: What is the isotope effect? | T_{c} ∝ M^{−1/2}, showing phonons are involved in conventional pairing.
Q: What symmetry does pairing have in cuprates? | d-wave (the gap changes sign around the Fermi surface).
M1: The first cuprate superconductor was discovered in: | 1986 | 1911 | 1957 | 2008 | Bednorz and Müller.
M2: MgB_{2} is notable as: | A conventional superconductor with T_{c} = 39 K | A cuprate | A room-temperature superconductor | An insulator | 2001 discovery.

## Cooper pairs
S: Cooper pairs are bound pairs of electrons with opposite momenta and spins, formed by a weak effective attraction in a metal. Their condensation into a single coherent quantum state produces superconductivity.
H: Cooper's insight (1956)
- Any attraction, however weak, binds two electrons above a filled Fermi sea (the Fermi sea blocks lower states).
- Binding energy ~2Δ, much smaller than E_{F}.
H: The attraction
P: An electron passing through the lattice attracts positive ions, leaving a region of extra positive charge that lingers (ions are slow). A second electron is attracted to it. This phonon-mediated attraction can beat Coulomb repulsion for electrons near the Fermi surface.
H: BCS theory (Bardeen, Cooper, Schrieffer, 1957)
- All pairs share one many-body wavefunction: a coherent condensate.
- Energy gap 2Δ to break a pair; Δ(0) ≈ 1.76k_{B}T_{c}.
- Coherence length ξ (pair size) ~100–1000 nm in conventional superconductors; much larger than electron spacing, so pairs overlap enormously.
- Explains zero resistance: scattering a single electron can't change the collective state without breaking pairs.
X: Gap-to-photon conversion: what frequency breaks pairs in aluminium (Δ ≈ 0.18 meV)?
> 2Δ = 0.36 meV ⇒ f = 2Δ/h ≈ 87 GHz: microwave/mm-wave
> Basis of superconducting photon detectors
!: Cooper pairs aren't tightly bound molecules; they're huge, overlapping correlations among millions of electrons.
Q: What binds electrons into Cooper pairs in conventional superconductors? | An effective attraction mediated by lattice vibrations (phonons).
Q: How large are Cooper pairs in conventional superconductors? | Hundreds of nanometres to micrometres (the coherence length).
M1: BCS theory was developed by: | Bardeen, Cooper and Schrieffer | Bednorz and Müller | Josephson | Onnes | 1957.
M2: Cooper pairs have total spin: | 0 (in conventional s-wave pairing) | ½ | 1 always | 2 | Opposite spins.

## Josephson effect
S: When two superconductors are separated by a thin barrier, Cooper pairs tunnel through it, creating a supercurrent with no voltage. Josephson junctions are the basis of superconducting qubits, SQUID magnetometers and the voltage standard.
H: The Josephson relations
E: I = I_{c} sin φ :: DC Josephson effect
E: dφ/dt = 2eV/ħ :: AC Josephson effect
E: f = (2e/h)V = 483.6 MHz per μV :: Josephson frequency
H: Applications
- **Voltage standard**: arrays of junctions under microwave irradiation produce exact voltage steps (Shapiro steps): V = nf h/(2e). Defines the volt.
- **SQUIDs**: superconducting loops with junctions measure flux to fractions of Φ_{0}; sensitivity ~10^{-15} T: brain imaging (MEG), geophysics, searches for dark matter.
- **Superconducting qubits**: junctions provide the nonlinearity making anharmonic oscillators (transmons) used in IBM and Google quantum processors.
- **Rapid single-flux-quantum logic**.
H: Discovery
P: Brian Josephson predicted the effect in 1962 as a PhD student; confirmed in 1963. Nobel 1973. It shows the superconducting state has a macroscopic quantum phase, and its precise frequency–voltage relation links metrology to fundamental constants.
X: Josephson frequency for 10 μV across a junction?
> f = 483.6 MHz × 10 = 4.8 GHz
!: The DC Josephson current flows with zero voltage across the junction; it's a pure quantum tunnelling supercurrent.
Q: What is the AC Josephson effect? | A voltage V across a junction makes the supercurrent oscillate at f = 2eV/h.
Q: What do SQUIDs measure? | Extremely small magnetic fluxes and fields.
M1: The Josephson constant 2e/h is about: | 483.6 GHz per mV | 1 Hz per V | 50 Hz per V | 1 THz per μV | 483.6 MHz per μV.
M2: Transmon qubits use Josephson junctions to provide: | Nonlinearity (anharmonic energy levels) | Resistance | Light emission | Magnetism | Distinct qubit levels.

## Semiconductor heterostructures
S: Heterostructures stack different semiconductors in nanometre-thin layers, engineering band edges to confine electrons. They're behind laser diodes, LEDs, high-speed transistors and the discovery of the quantum Hall effects.
H: Band alignment
- Type I (straddling): both electrons and holes confined in the narrow-gap layer (GaAs in AlGaAs): lasers, LEDs.
- Type II (staggered): electrons and holes in different layers.
- Lattice matching or controlled strain needed (epitaxy: MBE, MOCVD).
H: Structures
- **Quantum wells**: 2D confinement; discrete subbands E_{n} ∝ n^{2}.
- **Superlattices**: periodic layers, minibands.
- **Modulation doping**: dopants in the barrier, electrons in the well: very high mobility 2D electron gases (> 10^{7} cm^{2} V^{-1} s^{-1} at low T).
- Quantum wires and dots.
H: Devices
P: Double-heterostructure lasers (Alferov and Kroemer, Nobel 2000) made room-temperature semiconductor lasers possible: fibre optics, CD/DVD/Blu-ray, barcode scanners. HEMTs (high-electron-mobility transistors) power phone and satellite amplifiers. Blue InGaN LEDs (Akasaki, Amano, Nakamura, Nobel 2014) enabled white LED lighting. Quantum cascade lasers emit mid-infrared.
X: Ground-state energy of an electron in a 10 nm GaAs well (m* = 0.067m_{e}, infinite-well estimate)?
> E_{1} = h^{2}/(8m*L^{2}) = (6.63 × 10^{-34})^{2}/(8 × 0.067 × 9.11 × 10^{-31} × 10^{-16})
> ≈ 9 × 10^{-21} J ≈ 56 meV
!: Heterostructure interfaces must be atomically sharp and lattice-matched; defects there destroy performance.
Q: What is a quantum well? | A thin layer of narrow-gap semiconductor between wider-gap layers, confining carriers in one dimension.
Q: What is modulation doping? | Placing dopants in barriers so carriers in the well scatter little from ionised impurities.
M1: Blue LEDs, enabling white LED lighting, are made from: | InGaN heterostructures | Silicon | Germanium | Copper | Nobel 2014.
M2: HEMTs achieve high speed using: | A high-mobility 2D electron gas | Heavy doping in the channel | Superconductivity | Optical fibres | Modulation doping.

## Quantum Hall effect
S: In a two-dimensional electron gas at low temperature and high magnetic field, the Hall resistance takes exactly quantised values h/(νe^{2}). Its precision makes it the standard of resistance, and it revealed topology in condensed matter.
H: Integer quantum Hall effect (von Klitzing, 1980; Nobel 1985)
E: R_{xy} = h/(νe^{2}), ν = 1, 2, 3…; h/e^{2} = 25 812.807 Ω
- Plateaus with R_{xx} = 0 (dissipationless edge transport).
- Landau levels: cyclotron orbits quantised, E_{n} = ħω_{c}(n + ½).
- Quantised to parts in 10^{10}, independent of sample details.
H: Topology
P: Thouless and colleagues (TKNN, 1982) showed the Hall conductance equals a topological invariant (Chern number) of the filled bands: it can't change without closing the gap, which is why it's so robust. Current flows in chiral edge states that can't backscatter (Nobel 2016).
H: Fractional quantum Hall effect
- Tsui, Störmer (1982), explained by Laughlin (1983): ν = 1/3, 2/5…
- Strong electron correlations produce quasiparticles with fractional charge (e/3, measured by shot noise).
- Some states (ν = 5/2) may host non-abelian anyons for topological quantum computing.
- Graphene shows a quantum Hall effect even at room temperature in high fields.
X: Hall resistance on the ν = 2 plateau?
> R = 25 812.8/2 = 12 906.4 Ω
!: The quantisation doesn't depend on the sample's shape, impurities or material; that universality comes from topology.
Q: What is the von Klitzing constant? | R_{K} = h/e^{2} ≈ 25 812.807 Ω.
Q: Why is the quantum Hall resistance so precise? | It's a topological invariant (Chern number), insensitive to disorder.
M1: The fractional quantum Hall effect arises from: | Strong electron interactions | Disorder alone | Classical orbits | Phonons | Correlated states.
M2: Quantum Hall edge states: | Carry current without backscattering | Are insulating | Only exist at the centre | Are classical | Chiral.

## Topological insulators
S: Topological insulators are insulating inside but conduct along their surfaces or edges through special states protected by symmetry and topology. These states resist disorder and have spin locked to momentum.
H: Key ideas
- Band topology: a property of the whole band structure, characterised by integer invariants (Z_{2} for time-reversal-invariant insulators).
- At a boundary between topologically different materials (including vacuum), the gap must close: metallic surface states are guaranteed.
- Strong spin–orbit coupling causes band inversion.
H: Examples
- 2D: HgTe quantum wells (quantum spin Hall effect, 2007).
- 3D: Bi_{2}Se_{3}, Bi_{2}Te_{3}: a single Dirac cone on the surface (ARPES, 2008–09).
- Topological semimetals (Weyl, Dirac), topological superconductors, topological crystalline insulators.
H: Properties
- **Spin–momentum locking**: surface electrons' spins are tied to their direction of motion.
- Backscattering by non-magnetic impurities is forbidden (time-reversal symmetry).
- Quantum anomalous Hall effect in magnetic TIs (2013): quantised Hall resistance with no field.
H: Prospects
P: Potential uses include low-dissipation electronics, spintronics (spin currents from charge currents), and topological quantum computing with Majorana modes at superconductor–TI interfaces. Topology now classifies photonic, acoustic and mechanical systems too.
X: Why do surface states of a TI survive non-magnetic disorder?
> Time-reversal partners have opposite spins and momenta
> Backscattering would need a spin flip, forbidden without magnetic impurities
!: Topological insulators are real insulators in their bulk; only the boundary conducts.
Q: What is a topological insulator? | A material insulating in its bulk with protected conducting surface or edge states due to band topology.
Q: What is spin–momentum locking? | Surface electrons' spin direction is fixed by their momentum.
M1: Bi_{2}Se_{3} surface states form: | A Dirac cone | A flat band | A band gap | Nothing | Linear dispersion.
M2: Topological protection of TI surface states relies on: | Time-reversal symmetry | Magnetism | High temperature | Doping | Kramers pairs.

## Strongly correlated electron systems
S: In strongly correlated materials, electron–electron interactions dominate over kinetic energy, so simple band theory fails. They produce high-temperature superconductivity, colossal magnetoresistance, heavy fermions and exotic quantum phases.
H: Hallmarks
- Mott insulators: half-filled bands insulate because double occupancy costs energy U.
- Hubbard model: H = −tΣc^{†}_{i}c_{j} + UΣn_{i↑}n_{i↓}; U/t controls correlation strength.
- Rich phase diagrams: antiferromagnetism, superconductivity, charge order, pseudogap, strange metals.
H: Examples
- **Cuprates**: doped Mott insulators with high-T_{c} superconductivity.
- **Heavy fermions** (CeCu_{6}, YbRh_{2}Si_{2}): electrons with effective masses ~1000 m_{e}.
- **Manganites**: colossal magnetoresistance.
- **Quantum spin liquids**: magnetically disordered even at T = 0 (herbertsmithite, α-RuCl_{3}).
- **Moiré materials**: twisted bilayer graphene's flat bands (2018).
H: Methods
P: Exact solutions are rare. Physicists use dynamical mean-field theory, quantum Monte Carlo (limited by the sign problem), tensor networks (DMRG), and quantum simulators (ultracold atoms in optical lattices). Correlated materials are a leading application for quantum computers.
X: Why is NiO an insulator though band theory says it should be a metal?
> Partly filled d bands, but placing two electrons on one Ni site costs U ~ 8 eV
> Electrons localise: a Mott insulator
!: Being half-filled isn't enough to be a metal; correlations can open a gap where band theory predicts none.
Q: What is a Mott insulator? | A material that band theory predicts to be metallic but insulates because of strong electron repulsion.
Q: What does the Hubbard model capture? | Competition between electron hopping (t) and on-site repulsion (U).
M1: Heavy fermion materials have electrons with: | Very large effective masses | Zero mass | Negative charge only | No spin | Strong correlations.
M2: Twisted bilayer graphene shows correlated states because of: | Flat bands at the magic angle | High temperatures | Doping only | Magnetism | Moiré.

## Low-dimensional materials
S: When electrons or atoms are confined to two, one or zero dimensions, new quantum effects emerge. Low-dimensional materials range from atomically thin sheets to nanowires and quantum dots, with properties tunable by size.
H: Dimensional effects
- 2D: quantum wells, graphene, transition-metal dichalcogenides (MoS_{2}).
- 1D: carbon nanotubes, semiconductor nanowires, polymer chains.
- 0D: quantum dots, nanocrystals, single molecules.
- Density of states changes with dimension; confinement energies grow as size shrinks.
H: New physics
- Enhanced fluctuations: no long-range order at finite T in 1D; Mermin–Wagner theorem in 2D.
- Berezinskii–Kosterlitz–Thouless transition in 2D (vortex unbinding).
- Luttinger liquids in 1D: electrons split into separate spin and charge excitations.
- Peierls instability: 1D metals distort and become insulators.
- Excitons strongly bound in 2D semiconductors.
H: Applications
P: Quantum dots in displays and biological imaging, nanowire transistors and lasers, carbon nanotube composites and sensors, 2D materials for flexible electronics and transistors at the end of silicon scaling.
X: Why do smaller CdSe quantum dots glow bluer?
> Confinement raises the energy gap as size shrinks (~1/R^{2})
> 2 nm dots emit blue; 6 nm dots emit red
!: Low-dimensional doesn't mean mathematically 2D; it means confined so that motion in some directions is quantised.
Q: What is a Luttinger liquid? | The 1D interacting electron state where spin and charge excitations travel separately.
Q: What is the BKT transition? | A 2D phase transition driven by unbinding of vortex–antivortex pairs.
M1: Long-range magnetic order at finite T in 1D is: | Impossible (for short-range interactions) | Common | Stronger than 3D | Required | Fluctuations dominate.
M2: MoS_{2} monolayers are: | Direct-gap 2D semiconductors | Metals | Superconductors | Insulators with no gap | TMD.

## Graphene and two-dimensional materials
S: Graphene is a single layer of carbon atoms in a honeycomb lattice: the first true 2D material, isolated in 2004 with sticky tape (Geim and Novoselov, Nobel 2010). Its electrons behave like massless relativistic particles, and it's exceptionally strong and conductive.
H: Graphene's properties
E: E = ±ħv_{F}|k|, v_{F} ≈ 10^{6} m s^{-1} :: Dirac cones at K points
- Zero band gap semimetal; massless Dirac fermions.
- Electron mobility > 10^{5} cm^{2} V^{-1} s^{-1} (suspended or encapsulated).
- Strongest material measured (tensile strength ~130 GPa), stiff (E ≈ 1 TPa).
- Absorbs 2.3% (πα) of visible light per layer: a fundamental constant you can see.
- Thermal conductivity ~2000–5000 W m^{-1} K^{-1}.
H: The 2D family
- Hexagonal boron nitride (insulator, ideal substrate).
- Transition-metal dichalcogenides (MoS_{2}, WSe_{2}): direct-gap semiconductors as monolayers.
- Phosphorene, MXenes, 2D magnets (CrI_{3}), 2D superconductors.
- Van der Waals heterostructures: stacking different 2D layers like Lego.
H: Twistronics
P: Twisting two graphene layers by the "magic angle" ~1.1° creates flat bands where interactions dominate: correlated insulators and superconductivity (Cao, Jarillo-Herrero, 2018). Moiré materials now host fractional Chern insulators without magnetic fields.
X: Fraction of light transmitted through 5 graphene layers?
> Each absorbs ~2.3%: 0.977^{5} ≈ 0.89
!: Graphene's lack of a band gap makes it unsuitable for conventional digital transistors, despite its high mobility.
Q: How was graphene first isolated? | By mechanical exfoliation of graphite with sticky tape (2004).
Q: What is unusual about graphene's electrons? | Near the Dirac points they behave as massless relativistic particles with linear dispersion.
M1: A single graphene layer absorbs about: | 2.3% of visible light | 50% | 0.01% | 23% | πα.
M2: The magic angle for twisted bilayer graphene is about: | 1.1° | 45° | 10° | 0.01° | Flat bands.

## Nanomaterials
S: Nanomaterials have structures between about 1 and 100 nm. At this scale, surface effects and quantum confinement change optical, electronic, magnetic, mechanical and chemical properties, opening uses from medicine to energy.
H: Why size matters
- Surface-to-volume ratio ∝ 1/size: catalysis, reactivity, sensing.
- Quantum confinement: size-tunable band gaps (quantum dots).
- Melting point depression for small particles.
- Plasmon resonances in metal nanoparticles (gold nanoparticles look red, not gold).
- Single-domain magnetic particles (superparamagnetism).
H: Examples
- Quantum dots (QLED TVs, bio-imaging).
- Gold and silver nanoparticles (sensors, photothermal therapy, antibacterial coatings).
- Carbon nanotubes and graphene composites.
- Lipid nanoparticles (mRNA vaccine delivery).
- Nanoporous materials (MOFs for gas storage and capture).
H: Making and seeing
P: Top-down (lithography, etching) and bottom-up (chemical synthesis, self-assembly) fabrication. Electron microscopes, AFM and STM image individual atoms. Nanotoxicology studies risks, as small particles can enter cells and tissues differently from bulk materials.
X: Fraction of atoms at the surface of a 3 nm gold particle (atom size 0.29 nm)?
> Outer shell one atom thick: fraction = 1 − ((3 − 2 × 0.29)/3)^{3} = 1 − 0.81^{3} ≈ 0.47
> About half the atoms are at the surface, so surface chemistry dominates
!: Nanoscale effects aren't just miniaturisation; properties qualitatively change, which can be useful or hazardous.
Q: Why are nanoparticles good catalysts? | Their large surface-to-volume ratio exposes many active atoms.
Q: Why do gold nanoparticles look red? | Localised surface plasmon resonance absorbs green light.
M1: Nanomaterials have structures roughly: | 1–100 nm | 1–100 μm | 1–100 mm | Below 0.01 nm | Definition.
M2: mRNA vaccines are delivered using: | Lipid nanoparticles | Gold nanoparticles | Carbon nanotubes | Quantum dots | LNPs.

## Soft condensed matter
S: Soft condensed matter covers materials easily deformed by thermal fluctuations or small forces: polymers, colloids, gels, foams, liquid crystals and biological matter. Their physics is dominated by entropy, weak interactions and self-assembly at mesoscopic scales.
H: Characteristic features
- Energies comparable to k_{B}T: thermal fluctuations matter.
- Length scales from nm to μm: between atoms and everyday objects.
- Slow dynamics, viscoelasticity, history dependence.
- Self-assembly: structures form spontaneously (micelles, membranes, colloidal crystals).
H: Examples
- Polymers: rubber, plastics, DNA.
- Colloids: paint, milk, blood, ink.
- Surfactants: soap films, micelles, cell membranes.
- Granular matter: sand, powders (jamming).
- Active matter: bacteria, flocking birds, cytoskeleton.
H: Entropy-driven order
P: Hard spheres crystallise at high density purely through entropy: ordered packing gives each sphere more room to move. Depletion forces (smaller particles pushing larger ones together) arise from entropy too. De Gennes (Nobel 1991) showed that methods from phase transitions apply broadly to soft matter.
X: Why does mayonnaise behave like a solid until you spread it?
> A dense emulsion of oil droplets jammed together: yield stress
> Above the yield stress, droplets rearrange and it flows
!: "Soft" doesn't mean simple; soft materials often have complex, non-equilibrium behaviour.
Q: What makes soft matter "soft"? | Interaction energies comparable to k_{B}T, so thermal fluctuations and small forces deform it.
Q: What is a depletion force? | An effective attraction between large particles caused by smaller particles' entropy.
M1: Which is a colloid? | Milk | Pure water | Copper | Diamond | Fat droplets dispersed.
M2: Hard spheres crystallise at high density because of: | Entropy | Attraction | Magnetism | Gravity | More free volume per particle.

## Polymers, colloids and liquid crystals
S: Polymers are long chain molecules; colloids are particles suspended in a fluid; liquid crystals flow like liquids but have orientational order like crystals. These soft materials underpin plastics, biology and display technology.
H: Polymers
E: R ≈ bN^{1/2} (ideal chain); R ∝ N^{3/5} (self-avoiding, good solvent)
- Random-walk conformations; entropy elasticity (rubber).
- Glass transition, crystallinity, entanglement (reptation).
- Biopolymers: DNA (persistence length ~50 nm), proteins.
H: Colloids
- Particles ~1 nm–1 μm; Brownian motion (Einstein, Perrin: proof of atoms).
- Stability: electrostatic or steric repulsion vs van der Waals attraction (DLVO theory).
- Colloidal crystals, gels and glasses; photonic crystals (opals).
H: Liquid crystals
- Phases: nematic (orientational order), smectic (layers), cholesteric (twisted).
- Order parameter S = ⟨(3cos^{2}θ − 1)/2⟩.
- Anisotropic optical properties; molecules reorient in electric fields (Fréedericksz transition).
H: LCDs
P: In a twisted nematic display, liquid crystals twist light's polarisation by 90° between crossed polarisers, letting light through. Applying a few volts aligns the molecules with the field, removing the twist, and the pixel goes dark. Billions of LCD screens use this physics.
X: Size of a polymer with N = 10 000 segments of 0.5 nm (ideal chain)?
> R ≈ 0.5 × √10 000 = 50 nm (fully stretched would be 5 μm)
!: A polymer coil isn't stretched out; random-walk statistics make it compact, which is why rubber stores elastic energy in entropy.
Q: How does an ideal polymer's size scale with chain length? | R ∝ N^{1/2}.
Q: What distinguishes a nematic liquid crystal? | Molecules share a common orientation but have no positional order.
M1: Rubber's elasticity is mainly: | Entropic | Due to bond stretching | Magnetic | Electrostatic | Coiled chains.
M2: Perrin's study of colloids confirmed: | The existence of atoms (Avogadro's number) | Quantum mechanics | Relativity | Superconductivity | Brownian motion.
`;
