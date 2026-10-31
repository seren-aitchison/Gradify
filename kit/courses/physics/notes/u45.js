// Unit 45: Materials Physics. Format: kit/course/notes.js
export default `
## Structure-property relationships
S: A material's properties, such as strength, conductivity, colour and magnetism, come from its structure at every scale: the bonding between atoms, the crystal lattice, defects, grains and microstructure. Controlling structure through processing is how engineers design materials.
H: Levels of structure
- **Electronic**: bonding type and band structure set conductivity, optical absorption, magnetism.
- **Atomic arrangement**: crystal structure or amorphous order.
- **Defects**: vacancies, dislocations, grain boundaries control strength and diffusion.
- **Microstructure** (μm): grains, phases, precipitates, porosity.
- **Macrostructure**: shape, composites, coatings.
H: The materials tetrahedron
- Processing → structure → properties → performance, all linked.
- Example: quenching steel traps carbon in martensite (structure), making it hard but brittle (property); tempering trades some hardness for toughness.
H: Examples
P: Grain refinement strengthens metals (Hall–Petch: σ_{y} = σ_{0} + k/√d). Diamond and graphite are both carbon, but sp^{3} versus sp^{2} bonding makes one the hardest insulator and the other a soft conductor. Glass is brittle because it lacks dislocations to absorb energy; adding fibres makes tough composites. Doping silicon with one part per million of boron raises conductivity by many orders of magnitude.
E: σ_{y} = σ_{0} + k_{y}d^{−1/2} :: Hall–Petch relation
X: A steel has σ_{0} = 100 MPa, k = 0.6 MPa m^{1/2}. Yield stress for 25 μm and 4 μm grains?
> 25 μm: 100 + 0.6/0.005 = 220 MPa
> 4 μm: 100 + 0.6/0.002 = 400 MPa
K: Properties follow from structure at many scales, and processing controls structure.
!: The same composition can give wildly different properties depending on processing and microstructure.
Q: What does the Hall–Petch relation describe? | Yield strength increasing as grain size decreases, σ_{y} ∝ d^{−1/2}.
Q: Why are diamond and graphite so different? | Different bonding (sp^{3} 3D network vs sp^{2} layers) gives different structures and properties.
M1: Quenching steel produces: | Hard, brittle martensite | Soft ferrite | Liquid steel | Amorphous glass only | Trapped carbon distorts the lattice.
M2: The materials tetrahedron links processing, structure, properties and: | Performance | Price | Colour | Density | Four corners.

## Atomic bonding and crystal structure
S: Atoms bond through ionic, covalent, metallic and van der Waals interactions, and their arrangement into crystal lattices determines density, slip systems, cleavage and much more. Crystallography gives the language to describe these arrangements.
H: Bonding types
- **Ionic** (NaCl): electron transfer, strong, brittle, insulating, high melting.
- **Covalent** (diamond, Si): shared electrons, directional, hard.
- **Metallic** (Cu, Al): delocalised electron sea, ductile, conductive.
- **Van der Waals and hydrogen bonds**: weak, between molecules or layers (graphite, ice, polymers).
- Bond energy versus separation: equilibrium at the minimum; curvature gives stiffness, asymmetry gives thermal expansion.
E: U(r) = −A/r^{m} + B/r^{n} :: bond energy (n > m)
H: Crystal structures
- 14 Bravais lattices in 7 crystal systems.
- **FCC** (Cu, Al, Au): coordination 12, packing fraction 0.74, ductile (12 slip systems on close-packed planes).
- **BCC** (Fe at room T, W): coordination 8, packing 0.68.
- **HCP** (Mg, Ti, Zn): coordination 12, 0.74, fewer slip systems, less ductile.
- Miller indices (hkl) label planes, [uvw] directions.
E: APF = N V_{atom}/V_{cell} :: atomic packing fraction
E: ρ = nA/(V_{cell}N_{A}) :: theoretical density
H: Polymorphism
P: Many materials take different structures under different conditions: iron is BCC (α) below 912 °C, FCC (γ) to 1394 °C, then BCC (δ); carbon forms graphite, diamond, fullerenes and nanotubes; SiO_{2} has quartz, cristobalite and glass. Allotropic changes drive steel heat treatment.
X: Copper is FCC with a = 0.3615 nm, A = 63.55 g mol^{-1}. Density?
> n = 4 atoms per cell; V = (3.615 × 10^{-8} cm)^{3} = 4.72 × 10^{-23} cm^{3}
> ρ = 4 × 63.55/(4.72 × 10^{-23} × 6.022 × 10^{23}) ≈ 8.94 g cm^{-3}
X: Packing fraction of simple cubic?
> 1 atom, a = 2r: (4/3)πr^{3}/(8r^{3}) = π/6 ≈ 0.52
K: Bonding sets strength and conductivity; lattice structure sets packing, slip and anisotropy.
!: Close-packed structures (FCC, HCP) have the same packing fraction but different ductility because of slip-system geometry.
Q: What is the coordination number of BCC? | 8.
Q: Why are FCC metals typically ductile? | They have 12 slip systems on close-packed planes.
M1: Ionic solids are usually: | Brittle and insulating | Ductile and conducting | Soft | Magnetic | Fixed ion arrangement.
M2: The FCC atomic packing fraction is: | 0.74 | 0.68 | 0.52 | 1.0 | Closest packing.

## Defects and dislocations
S: No crystal is perfect. Point defects, dislocations, grain boundaries and voids control diffusion, strength, colour and conductivity. Dislocations, in particular, explain why metals deform at stresses thousands of times lower than perfect-crystal theory predicts.
H: Types of defect
- **Point (0D)**: vacancies, interstitials, substitutional impurities, Frenkel and Schottky pairs.
- **Line (1D)**: edge and screw dislocations.
- **Planar (2D)**: grain boundaries, twin boundaries, stacking faults, surfaces.
- **Volume (3D)**: voids, precipitates, inclusions, cracks.
E: n_{v}/N = exp(−E_{v}/k_{B}T) :: equilibrium vacancy fraction
H: Dislocations
- Burgers vector b describes the lattice displacement.
- Edge: b ⊥ line; screw: b ∥ line.
- Slip happens by dislocations moving, breaking a row of bonds at a time.
- Shear stress needed ~10^{-3}–10^{-4} of the theoretical strength G/2π.
- Resolved shear stress on a slip system: τ = σ cos φ cos λ (Schmid's law).
E: τ_{R} = σ cos φ cos λ :: Schmid's law
H: Strengthening mechanisms
P: Anything that impedes dislocation motion strengthens metals: work hardening (dislocations tangle), grain refinement (boundaries block slip), solid-solution strengthening (solute atoms distort the lattice), and precipitation hardening (fine particles pin dislocations; aluminium alloys in aircraft). Dislocation density ranges from ~10^{10} m^{-2} in annealed metals to ~10^{16} m^{-2} after heavy deformation. Point defects colour crystals (F-centres) and enable ionic conduction.
X: Vacancy fraction in copper (E_{v} = 0.9 eV) at 1000 K and 300 K?
> 1000 K: e^{−0.9/0.0862} = e^{−10.4} ≈ 3 × 10^{-5}
> 300 K: e^{−34.8} ≈ 8 × 10^{-16}
X: Tensile stress 50 MPa, slip plane normal at 45° and slip direction at 45°. Resolved shear stress?
> τ = 50 × 0.707 × 0.707 = 25 MPa
K: Dislocations make metals ductile; blocking them makes metals strong.
!: A perfect, dislocation-free crystal (like a whisker) can be enormously strong; real metals are weak because of dislocations.
Q: What is a Burgers vector? | The vector describing the magnitude and direction of lattice distortion caused by a dislocation.
Q: How does precipitation hardening work? | Fine precipitates obstruct dislocation motion.
M1: Schmid factor is maximal (0.5) when: | φ = λ = 45° | φ = 0° | λ = 90° | φ = 90° | cos 45° cos 45°.
M2: Work hardening occurs because: | Dislocations multiply and tangle | Grains grow | Vacancies vanish | Temperature rises | Higher density impedes motion.

## Diffusion in solids
S: Atoms in solids move by hopping between sites, driven by random thermal motion and concentration gradients. Diffusion controls heat treatment, doping of semiconductors, corrosion, sintering, creep and the lifetime of batteries and turbine blades.
H: Fick's laws
- First law: flux J = −D dc/dx (steady state).
- Second law: ∂c/∂t = D ∂^{2}c/∂x^{2}.
- Diffusion length ~√(Dt).
- Solutions: error function for a constant surface concentration; Gaussian for a thin source.
E: J = −D ∂c/∂x :: Fick's first law
E: c(x, t) = c_{s}[1 − erf(x/(2√(Dt)))] :: constant-surface-source solution
H: Mechanisms and temperature
- **Vacancy diffusion**: atoms swap with neighbouring vacancies (substitutional atoms).
- **Interstitial diffusion**: small atoms (C, H, N in metals) hop between interstices; much faster.
- **Arrhenius dependence**: D = D_{0}exp(−Q/k_{B}T).
- Fast paths: grain boundaries, dislocations and surfaces have lower activation energies.
E: D = D_{0}exp(−Q/RT) :: Arrhenius diffusion
H: Applications
P: Carburising steel diffuses carbon into surfaces for hard, wear-resistant cases. Semiconductor doping by diffusion and annealing after ion implantation. Lithium diffusion limits battery charging rates. Kirkendall voids form when atoms diffuse at unequal rates. Hydrogen diffusion causes embrittlement in pipelines and high-strength steels.
X: Carbon in iron at 1000 °C has D ≈ 3 × 10^{-11} m^{2} s^{-1}. Diffusion length after 1 hour?
> √(Dt) = √(3 × 10^{-11} × 3600) ≈ 3.3 × 10^{-4} m ≈ 0.33 mm
X: Q = 150 kJ mol^{-1}. How much faster is diffusion at 1100 K than at 1000 K?
> ratio = exp[(Q/R)(1/1000 − 1/1100)] = exp(18 042 × 9.09 × 10^{-5}) = e^{1.64} ≈ 5.2
K: Diffusion follows Fick's laws with Arrhenius temperature dependence; distances scale as √(Dt).
!: Doubling the diffusion distance needs four times the time.
Q: Why is interstitial diffusion faster than substitutional? | Interstitial atoms don't need a vacancy next to them and have lower activation energies.
Q: What is the Kirkendall effect? | Marker movement and voids caused by unequal diffusion rates of two species.
M1: Diffusion length scales as: | √(Dt) | Dt | D/t | t^{2} | Random walk.
M2: Grain-boundary diffusion is faster because: | Activation energy is lower | Atoms are heavier | Boundaries are colder | Grains rotate | More open structure.

## Phase diagrams
S: Phase diagrams map which phases are stable at each temperature and composition. They are the road maps of materials processing, telling metallurgists how to melt, cast, heat-treat and alloy materials to get desired microstructures.
H: Basics
- **Phase**: a region with uniform structure and composition.
- **Gibbs phase rule**: F = C − P + 2 (or F = C − P + 1 at fixed pressure).
- Lines mark phase boundaries (liquidus, solidus, solvus).
- **Lever rule**: fractions of two coexisting phases from tie-line lengths.
E: F = C − P + 2 :: Gibbs phase rule
E: f_{α} = (C_{β} − C_{0})/(C_{β} − C_{α}) :: lever rule
H: Binary diagram types
- **Isomorphous** (Cu–Ni): complete solid solubility.
- **Eutectic** (Pb–Sn solder, Al–Si): liquid → α + β at a single lowest melting point.
- **Peritectic**, **eutectoid** (γ → α + Fe_{3}C at 727 °C in steel), **intermetallic compounds**.
H: The iron–carbon diagram
P: Steel (< 2.1 wt% C) and cast iron (> 2.1%). Austenite (γ, FCC) dissolves up to 2.1% C; ferrite (α, BCC) only 0.022%. Slow cooling of 0.76% C austenite forms pearlite (layers of ferrite and cementite). Phase diagrams show equilibrium; rapid cooling produces non-equilibrium phases such as martensite, described by TTT diagrams.
X: A Pb–Sn alloy at 40 wt% Sn and 150 °C: α phase at 10% Sn, β at 98% Sn. Fraction of α?
> f_{α} = (98 − 40)/(98 − 10) = 58/88 ≈ 0.66
X: Degrees of freedom at a binary eutectic point (fixed pressure)?
> F = 2 − 3 + 1 = 0: invariant point
K: Phase diagrams show stable phases; the lever rule gives phase fractions and the phase rule counts freedoms.
!: Phase diagrams describe equilibrium; fast processing can produce structures not on the diagram.
Q: What is a eutectic? | A composition where liquid transforms directly into two solid phases at the lowest melting temperature.
Q: What is pearlite? | Alternating layers of ferrite and cementite formed from austenite at the eutectoid.
M1: The eutectoid temperature in steel is: | 727 °C | 1538 °C | 912 °C | 183 °C | γ → α + Fe_{3}C.
M2: The lever rule gives: | Phase fractions | Melting points | Diffusion rates | Crystal structure | From tie-line lengths.

## Phase transformations
S: Phase transformations change a material's structure: solidification, precipitation, eutectoid reactions and martensitic changes. Their rates and mechanisms control microstructure and properties, and they are manipulated through cooling rate and heat treatment.
H: Nucleation and growth
- Homogeneous nucleation: free energy ΔG(r) = (4/3)πr^{3}ΔG_{v} + 4πr^{2}γ.
- Critical radius r* = −2γ/ΔG_{v}; barrier ΔG* = 16πγ^{3}/(3ΔG_{v}^{2}).
- Undercooling increases driving force, shrinking r*.
- Heterogeneous nucleation at walls, impurities and grain boundaries needs a lower barrier.
E: r* = −2γ/ΔG_{v} :: critical nucleus radius
E: f = 1 − exp(−kt^{n}) :: Avrami equation
H: Kinetics
- Transformation rate peaks at intermediate undercooling (driving force vs diffusion).
- **TTT and CCT diagrams** show transformation progress versus time and temperature.
- Diffusional transformations (pearlite, bainite) versus diffusionless (martensite: shear, very fast).
H: Examples
P: Steel: slow cooling → pearlite; moderate → bainite; fast quench → martensite. Precipitation hardening of Al–Cu: solution treat, quench, age to form fine coherent precipitates (GP zones, θ″). Glass-ceramics nucleate crystals in glass deliberately. Spinodal decomposition separates phases without a nucleation barrier. Shape-memory alloys use reversible martensitic transformations.
X: γ = 0.1 J m^{-2}, ΔG_{v} = −2 × 10^{8} J m^{-3}. Critical radius?
> r* = 2 × 0.1/(2 × 10^{8}) = 1 × 10^{-9} m = 1 nm
X: Avrami with n = 3, k = 10^{-3} s^{-3}. Fraction transformed after 10 s?
> f = 1 − exp(−10^{-3} × 1000) = 1 − e^{−1} ≈ 0.63
K: Transformations proceed by nucleation and growth (or shear); their kinetics, captured in TTT diagrams, set microstructures.
!: Larger undercooling doesn't always speed transformation; at low temperature diffusion becomes too slow.
Q: What is martensite? | A hard, metastable phase formed by diffusionless shear transformation during rapid quenching.
Q: Why is heterogeneous nucleation easier? | Surfaces reduce the interfacial energy cost, lowering the barrier.
M1: The critical nucleus radius shrinks with: | Greater undercooling | Higher surface energy | Higher temperature | Less driving force | |ΔG_{v}| grows.
M2: Spinodal decomposition: | Has no nucleation barrier | Requires nucleation | Is diffusionless | Only occurs in liquids | Uphill diffusion.

## Mechanical properties
S: Mechanical properties describe how materials respond to forces: stiffness, strength, ductility, hardness, toughness and resistance to fatigue and creep. They decide whether a bridge stands, a turbine survives or a phone screen cracks.
H: Stress–strain behaviour
- Stress σ = F/A; strain ε = ΔL/L.
- **Elastic**: σ = Eε (Young's modulus: steel ~200 GPa, Al ~70 GPa, rubber ~0.01 GPa).
- **Yield strength** σ_{y}: onset of plastic deformation (0.2% offset).
- **Ultimate tensile strength**: maximum engineering stress before necking.
- **Ductility**: elongation at fracture.
- Poisson's ratio ν ≈ 0.3 for metals; G = E/(2(1 + ν)).
E: σ = Eε :: Hooke's law
E: G = E/(2(1 + ν)) :: shear modulus
H: Fracture and toughness
- **Fracture toughness** K_{IC}: resistance to crack growth; fracture when K = Yσ√(πa) ≥ K_{IC}.
- Ceramics ~1–5 MPa m^{1/2}, steels ~50–150 MPa m^{1/2}.
- Ductile fracture (necking, dimples) vs brittle (cleavage, sudden).
- Ductile-to-brittle transition in BCC steels at low temperature (Titanic, Liberty ships).
E: K_{I} = Yσ√(πa) :: stress intensity factor
H: Time-dependent failure
P: **Fatigue**: cyclic stresses below yield grow cracks; S–N curves and endurance limits; most mechanical failures are fatigue (Comet airliner disasters). **Creep**: slow deformation at high temperature (T > 0.4T_{m}); turbine blades use single-crystal nickel superalloys. **Hardness** tests (Vickers, Brinell, Rockwell) correlate with strength. Ashby charts compare properties across material classes for design.
X: A steel plate (K_{IC} = 50 MPa m^{1/2}, Y = 1) has a 2 mm edge crack. Fracture stress?
> σ = K_{IC}/√(πa) = 50/√(π × 0.002) ≈ 50/0.0793 ≈ 630 MPa
X: An aluminium rod (E = 70 GPa), 2 m long, under 140 MPa. Extension?
> ε = 140/70 000 = 0.002; ΔL = 4 mm
K: Stiffness, strength, ductility and toughness are distinct; fracture and fatigue often control real failures.
!: A strong material isn't necessarily tough; glass is strong in compression but shatters from small flaws.
Q: What is fracture toughness? | A material's resistance to crack propagation, K_{IC}.
Q: What is creep? | Slow, time-dependent plastic deformation under constant load, usually at high temperature.
M1: Young's modulus of steel is about: | 200 GPa | 2 GPa | 2000 GPa | 20 MPa | Stiff metal.
M2: Fatigue failure occurs under: | Cyclic loading below yield | Single overload only | Zero stress | Compression only | Crack growth per cycle.

## Thermal properties
S: Thermal properties describe how materials store heat, conduct it and change size with temperature. They decide how electronics are cooled, why rails buckle in summer, and which materials protect spacecraft during re-entry.
H: Heat capacity
- Classical Dulong–Petit: C ≈ 3R per mole of atoms at high T.
- Debye model: C ∝ T^{3} at low T (phonons); electrons add γT in metals.
- Debye temperature θ_{D}: diamond ~2230 K, Cu ~343 K, Pb ~105 K.
E: C_{V} ≈ (12π^{4}/5)Nk_{B}(T/θ_{D})^{3} (T ≪ θ_{D}) :: Debye T^{3} law
H: Thermal expansion
- Linear coefficient α: ΔL/L = αΔT. Steel ~12 × 10^{-6} K^{-1}, aluminium ~23, Invar ~1, fused silica ~0.5.
- Caused by asymmetric interatomic potentials (anharmonicity).
- Thermal stress in constrained parts: σ = EαΔT.
- Some materials expand on cooling (ZrW_{2}O_{8}, water near 4 °C).
E: σ_{thermal} = EαΔT :: constrained thermal stress
H: Thermal conductivity
P: Metals conduct mainly via electrons (Cu ~400 W m^{-1} K^{-1}); Wiedemann–Franz links κ to electrical conductivity: κ/(σT) = L ≈ 2.44 × 10^{-8} W Ω K^{-2}. Insulators conduct via phonons: diamond ~2000 W m^{-1} K^{-1}, glass ~1, aerogel ~0.015. Phonon scattering at boundaries and defects lowers κ, exploited in thermoelectrics and thermal barrier coatings. Thermal shock resistance depends on strength, conductivity and expansion.
E: κ = LσT :: Wiedemann–Franz law
X: A 20 m steel rail heats by 30 K. Free expansion? Stress if fully constrained (E = 200 GPa)?
> ΔL = 12 × 10^{-6} × 20 × 30 = 7.2 mm
> σ = 200 × 10^{9} × 12 × 10^{-6} × 30 = 72 MPa
X: Copper at 300 K has σ = 5.96 × 10^{7} S m^{-1}. Predict κ.
> κ = 2.44 × 10^{-8} × 5.96 × 10^{7} × 300 ≈ 436 W m^{-1} K^{-1}
K: Phonons and electrons carry heat; heat capacity follows Debye at low T; expansion comes from anharmonic bonds.
!: Constrained thermal expansion creates large stresses; expansion joints and matched materials prevent cracking.
Q: What does the Wiedemann–Franz law state? | The ratio of thermal to electrical conductivity in metals is proportional to temperature.
Q: Why does diamond conduct heat so well? | Stiff bonds and light atoms give fast phonons with little scattering.
M1: At low temperature, insulator heat capacity scales as: | T^{3} | T | constant | T^{−1} | Debye law.
M2: Invar is used for its: | Very low thermal expansion | High conductivity | Magnetism only | Softness | ~1 × 10^{-6} K^{-1}.

## Electrical properties
S: Electrical properties range over more than 25 orders of magnitude, from superconductors to insulators. Band structure, carrier density and scattering explain why copper conducts, silicon semiconducts and quartz insulates.
H: Conductivity basics
- σ = neμ (carrier density × charge × mobility); ρ = 1/σ.
- Drude model: μ = eτ/m*; τ is the mean scattering time.
- Metals: n ~ 10^{28}–10^{29} m^{-3}; semiconductors 10^{15}–10^{25}; insulators tiny.
E: σ = neμ :: conductivity
E: ρ(T) = ρ_{0} + ρ_{ph}(T) :: Matthiessen's rule
H: Temperature dependence
- Metals: resistivity rises roughly linearly with T (phonon scattering); residual resistivity from impurities at low T.
- Semiconductors: carrier density rises exponentially with T, so resistivity falls.
- Insulators: large gaps; conduction via defects or ions.
H: Band picture and special cases
P: Partially filled bands give metals; filled bands with gaps give insulators (E_{g} > ~4 eV) or semiconductors (~0.1–3 eV). Ionic conductors (solid electrolytes) carry current by ions, important in batteries and fuel cells. Conducting polymers (polyacetylene, PEDOT) are doped organics. Alloys have higher resistivity (nichrome for heaters). Residual resistance ratio (RRR) measures metal purity.
X: Copper: n = 8.5 × 10^{28} m^{-3}, ρ = 1.7 × 10^{-8} Ω m. Mobility and scattering time?
> μ = 1/(ρne) = 1/(1.7 × 10^{-8} × 8.5 × 10^{28} × 1.6 × 10^{-19}) ≈ 4.3 × 10^{-3} m^{2} V^{-1} s^{-1}
> τ = μm/e ≈ 4.3 × 10^{-3} × 9.11 × 10^{-31}/1.6 × 10^{-19} ≈ 2.5 × 10^{-14} s
K: Conductivity = carrier density × charge × mobility; band structure decides density, scattering decides mobility.
!: Semiconductors conduct better when hot; metals conduct worse. Opposite temperature behaviour reveals different physics.
Q: What is Matthiessen's rule? | Total resistivity is the sum of contributions from independent scattering mechanisms.
Q: Why does a semiconductor's resistivity fall with temperature? | More carriers are thermally excited across the band gap.
M1: Metal resistivity at low T is dominated by: | Impurities and defects | Phonons | Band gap | Superconductivity always | Residual resistivity.
M2: σ = neμ links conductivity to: | Carrier density and mobility | Temperature only | Mass only | Thermal expansion | Drude picture.

## Magnetic properties
S: Materials respond to magnetic fields in different ways: weakly opposing (diamagnetism), weakly aligning (paramagnetism), or strongly ordering (ferro-, ferri- and antiferromagnetism). These behaviours come from electron spins and orbits and their quantum interactions.
H: Types of magnetism
- **Diamagnetism**: χ ~ −10^{-5}; all materials; superconductors are perfect diamagnets (χ = −1).
- **Paramagnetism**: χ ~ 10^{-5}–10^{-3}; unpaired spins align weakly; Curie law χ = C/T.
- **Ferromagnetism** (Fe, Co, Ni, Gd): spontaneous alignment below T_{C} via exchange interaction.
- **Antiferromagnetism** (MnO, Cr): neighbouring spins antiparallel below T_{N}.
- **Ferrimagnetism** (magnetite Fe_{3}O_{4}, ferrites): unequal antiparallel moments.
E: M = χH, B = μ_{0}(H + M) :: magnetisation relations
E: χ = C/(T − θ) :: Curie–Weiss law
H: Atomic origins
- Moments from electron spin (μ_{B} = 9.27 × 10^{-24} J T^{-1}) and orbital motion.
- Hund's rules determine ionic moments.
- Exchange interaction (quantum, from Pauli exclusion + Coulomb) aligns spins; J > 0 ferro, J < 0 antiferro.
H: Ferromagnetic behaviour
P: Domains minimise magnetostatic energy; applying a field moves domain walls and rotates moments, giving a hysteresis loop with remanence M_{r} and coercivity H_{c}. Above the Curie temperature (Fe 1043 K, Ni 627 K) order is lost. Magnetic anisotropy fixes easy axes. Spintronics uses spin-dependent transport (giant magnetoresistance, Nobel 2007).
X: A paramagnet has χ = 3 × 10^{-4} at 300 K. Susceptibility at 30 K (Curie law)?
> χ ∝ 1/T: 3 × 10^{-3}
X: Saturation magnetisation of iron (2.2 μ_{B} per atom, n = 8.5 × 10^{28} m^{-3})?
> M_{s} = 8.5 × 10^{28} × 2.2 × 9.27 × 10^{-24} ≈ 1.73 × 10^{6} A m^{-1} (μ_{0}M_{s} ≈ 2.2 T)
K: Magnetism comes from electron moments; exchange interaction produces spontaneous order in ferro-, ferri- and antiferromagnets.
!: Ferromagnetism is a quantum effect; the classical dipole–dipole interaction is far too weak to explain room-temperature magnets.
Q: What is the Curie temperature? | The temperature above which a ferromagnet loses spontaneous magnetisation.
Q: What is coercivity? | The reverse field needed to reduce magnetisation to zero.
M1: Diamagnetic susceptibility is: | Small and negative | Large positive | Zero | Infinite | All materials, weak.
M2: Magnetite is: | Ferrimagnetic | Diamagnetic | Antiferromagnetic only | Superconducting | Unequal sublattices.

## Optical properties
S: A material's optical properties, how it absorbs, reflects, transmits and emits light, come from its electrons and their band structure. They explain why metals shine, glass is transparent, gold is yellow and semiconductors make LEDs and solar cells.
H: Complex refractive index
- ñ = n + iκ: n gives speed and refraction; κ gives absorption.
- Absorption coefficient α = 4πκ/λ; Beer–Lambert I = I_{0}e^{−αx}.
- Reflectance at normal incidence R = ((n − 1)^{2} + κ^{2})/((n + 1)^{2} + κ^{2}).
E: R = [(n − 1)^{2} + κ^{2}]/[(n + 1)^{2} + κ^{2}] :: normal reflectance
E: α = 4πκ/λ :: absorption coefficient
H: By material class
- **Metals**: free electrons reflect below the plasma frequency ω_{p} = √(ne^{2}/(ε_{0}m)); ~UV for most metals. Gold and copper absorb blue (interband transitions), looking yellow/red.
- **Semiconductors**: absorb photons above E_{g}; transparent below. Silicon is opaque to visible but transparent at 1.5 μm.
- **Insulators**: wide gaps (>3 eV) transparent in visible; colour from impurities (ruby's Cr^{3+}) or colour centres.
- **Dispersion**: n varies with λ (prisms, chromatic aberration), described by Sellmeier equations.
E: ω_{p} = √(ne^{2}/(ε_{0}m)) :: plasma frequency
H: Emission and engineering
P: Luminescence (photo-, electro-, cathodoluminescence) underlies LEDs, phosphors and scintillators. Anti-reflection coatings (quarter-wave layers), dielectric mirrors, photonic crystals and plasmonic nanoparticles engineer optical response. Nonlinear and electro-optic materials (LiNbO_{3}) enable frequency conversion and modulation. Transparent conductors (ITO) combine conductivity with transparency for screens.
X: Reflectance of glass (n = 1.5, κ = 0)?
> R = (0.5/2.5)^{2} = 0.04: 4% per surface
X: Plasma frequency of aluminium (n = 1.8 × 10^{29} m^{-3})?
> ω_{p} = √(1.8 × 10^{29} × 2.56 × 10^{-38}/(8.85 × 10^{-12} × 9.11 × 10^{-31})) ≈ 2.4 × 10^{16} rad s^{-1}
> ħω_{p} ≈ 15 eV (deep UV), so Al reflects visible light
K: Absorption and reflection depend on electronic structure: band gaps for semiconductors and insulators, plasma frequency for metals.
!: A material transparent in the visible can be opaque in UV or IR, and vice versa; always specify wavelength.
Q: Why are metals shiny? | Free electrons reflect light below the plasma frequency.
Q: Why is ruby red? | Cr^{3+} impurities absorb green and violet light.
M1: Silicon is transparent at: | 1.5 μm | 500 nm | 300 nm | 100 nm | Below its band gap energy.
M2: Anti-reflection coatings use layers of thickness: | λ/4 | λ | λ/2 | 2λ | Destructive interference of reflections.

## Dielectric materials
S: Dielectrics are insulators that polarise in electric fields, storing energy and reducing field strength inside. They are essential in capacitors, insulation, microwave circuits, sensors and memory, with special classes such as piezoelectrics and ferroelectrics.
H: Polarisation
- P = ε_{0}χ_{e}E; ε_{r} = 1 + χ_{e}.
- Mechanisms: electronic (THz–UV), ionic (IR), orientational (dipoles; microwave), space charge (low frequency).
- Higher-frequency fields "freeze out" slower mechanisms, so ε_{r} drops with frequency.
- Loss tangent tan δ = ε″/ε′ measures energy dissipation.
E: C = ε_{0}ε_{r}A/d :: parallel-plate capacitor
E: ε(ω) = ε′ − iε″, tan δ = ε″/ε′ :: complex permittivity
H: Classes
- **Linear dielectrics**: SiO_{2} (ε_{r} ≈ 3.9), Al_{2}O_{3} (~9), HfO_{2} (~25, high-k gates).
- **Piezoelectrics** (quartz, PZT): strain ↔ polarisation; sensors, actuators, ultrasound.
- **Pyroelectrics**: polarisation changes with temperature; infrared detectors.
- **Ferroelectrics** (BaTiO_{3}, ε_{r} up to ~10 000): switchable spontaneous polarisation with hysteresis; FeRAM, MLCC capacitors.
E: D = d_{ij}σ (direct piezoelectric effect) :: piezoelectric response
H: Breakdown and applications
P: Dielectric strength (V m^{-1}) limits fields before breakdown: air ~3 MV m^{-1}, SiO_{2} ~10^{9} V m^{-1}. Water's high ε_{r} ≈ 80 comes from molecular dipoles, which is why microwaves (orientational loss near GHz) heat food. Low-k dielectrics reduce capacitance between chip wires; high-k gate oxides let transistors shrink without leaking.
X: A capacitor with HfO_{2} (ε_{r} = 25), A = 1 μm^{2}, d = 3 nm. Capacitance?
> C = 8.85 × 10^{-12} × 25 × 10^{-12}/(3 × 10^{-9}) ≈ 7.4 × 10^{-17} F ≈ 74 aF
X: Energy density in a field of 10^{8} V m^{-1} with ε_{r} = 10?
> u = ½ε_{0}ε_{r}E^{2} = ½ × 8.85 × 10^{-12} × 10 × 10^{16} ≈ 4.4 × 10^{5} J m^{-3}
K: Dielectrics polarise in fields by several mechanisms; permittivity, loss and breakdown strength define applications.
!: ε_{r} is frequency-dependent; a material's static permittivity may differ greatly from its GHz value.
Q: What is a ferroelectric? | A material with spontaneous electric polarisation that can be switched by an applied field.
Q: Why are high-k dielectrics used in transistors? | They give high capacitance with a thicker layer, reducing leakage current.
M1: Piezoelectric materials convert: | Mechanical stress to electric polarisation | Heat to light | Magnetism to heat | Light to sound only | And vice versa.
M2: Dielectric loss is measured by: | tan δ | ε′ only | Breakdown voltage | Capacitance alone | ε″/ε′.

## Semiconductors
S: Semiconductors have band gaps small enough that their conductivity can be controlled by temperature, doping, light and electric fields. This controllability makes them the basis of transistors, LEDs, lasers, solar cells and sensors.
H: Intrinsic and extrinsic
- Intrinsic carrier density n_{i} ∝ T^{3/2}exp(−E_{g}/2k_{B}T); Si: n_{i} ≈ 10^{10} cm^{-3} at 300 K.
- **n-type**: donors (P, As in Si) add electrons.
- **p-type**: acceptors (B) add holes.
- Mass action: np = n_{i}^{2}.
- Fermi level moves towards the conduction band (n-type) or valence band (p-type).
E: np = n_{i}^{2} :: mass-action law
E: n_{i} = √(N_{C}N_{V}) e^{−E_{g}/2k_{B}T} :: intrinsic carrier density
H: Transport
- Drift J = neμE; diffusion J = eD∇n; Einstein relation D/μ = k_{B}T/e.
- Mobility: Si electrons ~1400 cm^{2} V^{-1} s^{-1}, holes ~450; GaAs electrons ~8500.
- Recombination: radiative, SRH, Auger.
E: D/μ = k_{B}T/e :: Einstein relation
H: Devices and materials
P: The p–n junction rectifies; MOSFETs switch with gate fields; bipolar transistors amplify. Silicon dominates electronics; GaAs and InP make fast and optical devices; GaN and SiC wide-gap semiconductors handle high power and voltage (EV chargers, 5G). 2D materials (MoS_{2}) and organic semiconductors are emerging. Transistor gates are now a few nanometres, with gate-all-around architectures.
X: Si doped with 10^{16} cm^{-3} phosphorus at 300 K. Electron and hole densities?
> n ≈ 10^{16} cm^{-3}
> p = n_{i}^{2}/n = 10^{20}/10^{16} = 10^{4} cm^{-3}
X: Diffusion coefficient of electrons in Si at 300 K (μ = 1400 cm^{2} V^{-1} s^{-1})?
> D = 0.0259 × 1400 ≈ 36 cm^{2} s^{-1}
K: Doping controls carrier type and density; np = n_{i}^{2} links electrons and holes.
!: Dopant concentrations of parts per million change conductivity by orders of magnitude; purity is critical.
Q: What is an acceptor? | A dopant (like boron in silicon) that creates holes by accepting electrons from the valence band.
Q: Why are GaN and SiC used in power electronics? | Wide band gaps give high breakdown fields and operation at high temperature.
M1: In n-type Si, majority carriers are: | Electrons | Holes | Ions | Phonons | Donors provide electrons.
M2: Intrinsic Si carrier density at 300 K is about: | 10^{10} cm^{-3} | 10^{22} cm^{-3} | 10^{2} cm^{-3} | 10^{16} cm^{-3} | Small gap 1.12 eV.

## Superconductors
S: Superconductors carry current with zero resistance and expel magnetic fields below a critical temperature. Explained by Cooper pairing (BCS theory) in conventional materials, they power MRI scanners, accelerators and quantum computers, while high-temperature cuprates still hold mysteries.
H: Key properties
- Zero DC resistance below T_{c}.
- **Meissner effect**: magnetic flux expelled (perfect diamagnetism), not just perfect conductivity.
- Critical field H_{c} and critical current density J_{c}.
- **Type I** (Pb, Hg): single H_{c}. **Type II** (NbTi, Nb_{3}Sn, YBCO): vortices between H_{c1} and H_{c2}, allowing high fields.
- London penetration depth λ_{L} ~ 50–500 nm; coherence length ξ.
E: B(x) = B_{0}e^{−x/λ_{L}} :: field penetration
E: Δ(0) ≈ 1.76k_{B}T_{c} :: BCS gap
H: Theory
- **BCS** (1957): phonon-mediated attraction binds electrons into Cooper pairs, which condense into a coherent state with an energy gap.
- Flux quantised in units Φ_{0} = h/2e = 2.07 × 10^{-15} Wb (the 2e reveals pairing).
- **Josephson effect**: supercurrent tunnels through thin barriers; basis of SQUIDs and qubits.
- Ginzburg–Landau theory: κ = λ/ξ > 1/√2 means type II.
H: Materials
P: Conventional: Nb (9.2 K), NbTi (~10 K), Nb_{3}Sn (18 K), MgB_{2} (39 K). Cuprates (YBCO 92 K, above liquid nitrogen) and iron-based superconductors have unconventional pairing not fully understood. Hydrides under megabar pressures reach ~250 K. Applications: MRI and NMR magnets, LHC dipoles, maglev, fault-current limiters, SQUID magnetometers, superconducting qubits and RF cavities. Room-temperature ambient-pressure claims (e.g. LK-99 in 2023) have not been confirmed.
X: BCS gap for niobium (T_{c} = 9.2 K)?
> Δ = 1.76 × 8.617 × 10^{-5} × 9.2 ≈ 1.4 meV
X: Flux through a 10 μm × 10 μm SQUID loop in 10 μT, in flux quanta?
> Φ = 10^{-5} × 10^{-10} = 10^{-15} Wb ≈ 0.48 Φ_{0}
K: Superconductors have zero resistance and expel flux; Cooper pairing explains conventional ones, while high-T_{c} mechanisms remain open.
!: Zero resistance alone doesn't make a superconductor; the Meissner effect distinguishes it from a perfect conductor.
Q: What is the Meissner effect? | Expulsion of magnetic flux from a superconductor below T_{c}.
Q: Why is the flux quantum h/2e? | The charge carriers are Cooper pairs with charge 2e.
M1: Type II superconductors allow: | Partial flux penetration as vortices | No flux ever | Only zero field | Ferromagnetism | Between H_{c1} and H_{c2}.
M2: YBCO's T_{c} is about: | 92 K | 9 K | 300 K | 4 K | Above liquid nitrogen.

## Magnetic materials
S: Magnetic materials are engineered for specific jobs: soft magnets that switch easily in transformers and motors, hard magnets that hold strong fields in electric vehicles and wind turbines, and thin films that store data and sense fields.
H: Soft magnets
- Low coercivity, high permeability, low hysteresis loss.
- Silicon steel (transformers), Permalloy (Ni–Fe), amorphous and nanocrystalline alloys, soft ferrites (MnZn, NiZn) at high frequency.
- Losses: hysteresis (∝ loop area × frequency) and eddy currents (∝ f^{2}t^{2}/ρ; reduced by laminations or insulating ferrites).
E: P_{eddy} ∝ f^{2}B^{2}t^{2}/ρ :: eddy-current loss
H: Hard (permanent) magnets
- High coercivity and remanence; figure of merit (BH)_{max}.
- Alnico, hard ferrites (cheap), SmCo (high temperature), NdFeB (strongest, (BH)_{max} up to ~450 kJ m^{-3}).
- Dysprosium additions keep NdFeB coercive at high temperatures; supply concerns drive research.
E: (BH)_{max} :: energy product of a permanent magnet
H: Magnetic data and sensing
P: Hard drives store bits in magnetic grains read by GMR/TMR heads; heat-assisted recording (HAMR) increases density. MRAM uses magnetic tunnel junctions and spin-transfer torque for non-volatile memory. Magnetic sensors (Hall, fluxgate, AMR/GMR/TMR) serve cars and phones. Magnetocaloric materials enable magnetic refrigeration; magnetostrictive materials (Terfenol-D) act as actuators.
X: Doubling frequency and lamination thickness: how does eddy loss change?
> ∝ f^{2}t^{2}: (2)^{2} × (2)^{2} = 16× more loss
X: Why are ferrites used in high-frequency transformers?
> High resistivity suppresses eddy currents, which grow with f^{2}
K: Soft magnets minimise loss for switching; hard magnets maximise stored energy; thin films enable memory and sensing.
!: Permanent magnets lose coercivity when hot; exceeding their maximum temperature can demagnetise them.
Q: What does (BH)_{max} measure? | The maximum magnetic energy a permanent magnet can supply per unit volume.
Q: Why are transformer cores laminated? | Thin insulated layers reduce eddy-current losses.
M1: The strongest commercial permanent magnets are: | NdFeB | Alnico | Ferrite | Iron | Neodymium magnets.
M2: MRAM uses: | Magnetic tunnel junctions | Capacitors | Floating gates | Phase-change glass | Spin-dependent tunnelling.

## Metamaterials
S: Metamaterials are engineered structures whose properties come from their designed architecture rather than chemistry. With unit cells smaller than the wavelength they control, they can bend light backwards, cloak objects, focus beyond the diffraction limit and manipulate sound and vibration.
H: Electromagnetic metamaterials
- Arrays of resonators (split rings, wires) give effective permittivity ε and permeability μ.
- **Negative index**: ε < 0 and μ < 0 simultaneously give n < 0, reversing refraction (Veselago, demonstrated at microwave frequencies in 2000).
- **Perfect lens** concept (Pendry): negative-index slabs could image beyond the diffraction limit (in practice limited by losses).
- **Transformation optics**: design ε(r), μ(r) to bend light around objects, enabling cloaking (narrowband demonstrations).
E: n = −√(εμ) (ε, μ < 0) :: negative refractive index
H: Metasurfaces
- 2D arrays of sub-wavelength antennas impose local phase shifts.
- Flat lenses ("metalenses"), beam steering, holograms, polarisation control.
- Generalised Snell's law: n_{2}sin θ_{t} − n_{1}sin θ_{i} = (λ/2π)dφ/dx.
H: Beyond optics
P: Acoustic metamaterials block or steer sound and give negative effective density; seismic metamaterials have been proposed to shield buildings. Mechanical metamaterials have negative Poisson's ratio (auxetics expand sideways when stretched), negative compressibility transitions or programmable stiffness. Thermal metamaterials guide heat. Challenges: losses, bandwidth, manufacturing at optical scales.
X: A metasurface imposes a phase gradient of 2π over 1 μm at λ = 600 nm. Deflection angle at normal incidence in air?
> sin θ = (λ/2π)(2π/1 μm) = 0.6 ⇒ θ ≈ 37°
K: Metamaterials get their properties from sub-wavelength structure, enabling negative refraction, cloaking and flat optics.
!: Most cloaks work only at narrow bands and specific angles; losses limit performance, especially at optical frequencies.
Q: What is a metasurface? | A thin layer of sub-wavelength scatterers that imposes designed phase and amplitude changes on waves.
Q: What is an auxetic material? | One with a negative Poisson's ratio: it gets wider when stretched.
M1: Negative refraction requires: | ε < 0 and μ < 0 | ε > 0 only | μ = 0 | Very high temperature | Double-negative medium.
M2: Metamaterial unit cells must be: | Smaller than the wavelength | Larger than the wavelength | Exactly one wavelength | Atomic only | Effective medium.

## Nanostructured materials
S: Nanostructured materials have features between about 1 and 100 nm, where surface effects and quantum confinement change properties dramatically. Quantum dots, nanotubes, graphene and nanoparticles show new optical, electronic, mechanical and catalytic behaviour.
H: Why size matters
- **Surface-to-volume ratio** grows as 1/r: a 3 nm particle has ~50% of atoms at the surface; boosts catalysis and reactivity, lowers melting points.
- **Quantum confinement**: when size approaches the exciton Bohr radius, energy levels discretise and band gaps widen.
- **Mechanical**: nanocrystalline metals are stronger (Hall–Petch) down to ~10–20 nm, then can soften (inverse Hall–Petch).
E: E_{g}(R) ≈ E_{g,bulk} + ħ^{2}π^{2}/(2μR^{2}) :: quantum dot confinement (Brus, leading term)
H: Examples
- **Quantum dots** (CdSe, InP, perovskite): size-tuned colour; QLED displays; biological labels; Nobel Chemistry 2023.
- **Carbon nanotubes**: tensile strength ~50–100 GPa; metallic or semiconducting depending on chirality.
- **Graphene**: one atom thick; mobility up to ~10^{5}–10^{6} cm^{2} V^{-1} s^{-1}; thermal conductivity ~3000–5000 W m^{-1} K^{-1}.
- **Gold nanoparticles**: plasmonic colours; ruby glass.
- **Nanoporous materials**: zeolites, MOFs for gas storage and separation.
H: Making and risks
P: Top-down (lithography, milling) and bottom-up (chemical synthesis, self-assembly, CVD) fabrication. Characterisation needs TEM, AFM, XRD peak broadening. Health and environmental effects of nanoparticles (inhalation, toxicity) need careful assessment. Applications include catalysts, batteries, sunscreens (ZnO, TiO_{2}), drug delivery and stronger composites.
X: Fraction of atoms at the surface of a 5 nm sphere with atomic diameter 0.25 nm?
> Shell volume fraction ≈ 3 × (shell thickness)/(radius) = 3 × 0.25/2.5 ≈ 0.3, about 30%
X: Why do smaller CdSe dots emit bluer light?
> Confinement energy ∝ 1/R^{2} increases the effective gap, shifting emission to shorter wavelengths
K: At the nanoscale, surfaces and quantum confinement dominate, giving size-tunable properties.
!: "Nano" doesn't automatically mean better; agglomeration, defects and toxicity can undermine performance.
Q: Why do quantum dots change colour with size? | Quantum confinement widens the band gap as size shrinks.
Q: What determines whether a carbon nanotube is metallic? | Its chirality (how the graphene sheet is rolled).
M1: Surface-to-volume ratio scales as: | 1/r | r | r^{2} | constant | Smaller particles, more surface.
M2: The 2023 Nobel Prize in Chemistry honoured: | Quantum dots | Graphene | Fullerenes | Zeolites | Ekimov, Brus, Bawendi.

## Thin films and coatings
S: Thin films, layers from a few atoms to several micrometres thick, give surfaces new functions: anti-reflection, hardness, corrosion protection, conductivity and the active layers of chips, solar cells and displays. Their growth and properties often differ from bulk material.
H: Deposition methods
- **Physical vapour deposition (PVD)**: thermal evaporation, electron-beam evaporation, sputtering.
- **Chemical vapour deposition (CVD)**: precursors react on hot surfaces; PECVD at lower T.
- **Atomic layer deposition (ALD)**: self-limiting surface reactions build films one atomic layer at a time; perfect conformality (high-k gate oxides).
- **Molecular beam epitaxy (MBE)**: ultra-high vacuum, atomic precision for quantum wells.
- **Solution methods**: spin coating, sol-gel, electroplating.
H: Growth modes
- **Frank–van der Merwe**: layer by layer.
- **Volmer–Weber**: islands.
- **Stranski–Krastanov**: layers then islands (self-assembled quantum dots).
- Epitaxy: crystalline films aligned to the substrate; lattice mismatch f = (a_{f} − a_{s})/a_{s} causes strain and dislocations beyond a critical thickness.
E: f = (a_{film} − a_{sub})/a_{sub} :: lattice mismatch
E: σ = E_{f}ε/(1 − ν) :: biaxial film stress
H: Applications and characterisation
P: Hard coatings (TiN, DLC) on tools; thermal barrier coatings (yttria-stabilised zirconia) on turbine blades; low-emissivity glass; transparent conductors (ITO); solar absorbers (CdTe, CIGS, perovskites); magnetic multilayers in hard-drive heads. Thickness is measured by ellipsometry, X-ray reflectivity and profilometry; stress by wafer curvature (Stoney equation); adhesion by scratch tests.
X: GaAs (a = 0.5653 nm) on Si (0.5431 nm). Mismatch?
> f = (0.5653 − 0.5431)/0.5431 ≈ 4.1%: large, so many misfit dislocations form
X: An ALD process deposits 0.1 nm per cycle. Cycles for a 3 nm gate oxide?
> 30 cycles
K: Deposition method and growth mode control film structure; mismatch strain and stress decide quality and adhesion.
!: Film properties (density, stress, conductivity) can differ greatly from bulk values.
Q: What makes ALD special? | Self-limiting surface reactions give atomic-level thickness control and conformal coating.
Q: What is Stranski–Krastanov growth? | Layer-by-layer growth followed by island formation, used to make quantum dots.
M1: MBE requires: | Ultra-high vacuum | Atmospheric pressure | Liquid solvents | No substrate | Atomic beams.
M2: Thermal barrier coatings are made of: | Yttria-stabilised zirconia | Copper | Graphite | Silver | Low conductivity ceramic.

## Amorphous materials
S: Amorphous materials lack long-range crystalline order while keeping short-range order between neighbouring atoms. Glasses, many polymers, amorphous silicon and metallic glasses have properties shaped by this disorder, including transparency, isotropy and unique mechanical behaviour.
H: Structure
- Short-range order (bond lengths, coordination) similar to crystals; no periodicity beyond ~1 nm.
- Described by radial distribution functions g(r), measured by X-ray or neutron scattering (broad halos instead of Bragg peaks).
- Continuous random network model for silica glass (Zachariasen).
H: The glass transition
- Cooling a liquid fast enough avoids crystallisation; viscosity rises until the liquid "freezes" at T_{g} (~10^{12} Pa s).
- T_{g} depends on cooling rate; it is kinetic, not a true equilibrium phase transition.
- Heat capacity and thermal expansion change at T_{g}.
- Fragile vs strong glass formers (Angell plot).
E: η = η_{0}exp(B/(T − T_{0})) :: Vogel–Fulcher–Tammann viscosity
H: Types and uses
P: Silicate glasses (windows, fibres, screens; Gorilla glass ion-exchanged for strength). Amorphous silicon (thin-film transistors, solar cells, a-Si:H). Metallic glasses (very high strength and elasticity, no grain boundaries; transformer cores; golf clubs). Polymers below T_{g} (polystyrene, PMMA). Chalcogenide glasses switch between amorphous and crystalline states in phase-change memory and rewritable discs. Glasses have low-temperature anomalies from two-level tunnelling systems.
X: Why is window glass transparent while polycrystalline alumina is often translucent?
> Glass has no grain boundaries to scatter light; polycrystals scatter at boundaries and pores
X: A glass's T_{g} rises when cooled faster. Why?
> The liquid falls out of equilibrium sooner, at higher temperature, because there's less time for rearrangement
K: Amorphous solids have short-range but no long-range order; the glass transition is a kinetic freezing of the liquid.
!: Glass is not a slow-flowing liquid at room temperature; old windows are thicker at the bottom because of manufacturing, not flow.
Q: What is the glass transition temperature? | The temperature where a supercooled liquid's viscosity becomes so high it behaves as a solid (~10^{12} Pa s).
Q: Why are metallic glasses strong? | No grain boundaries or dislocations to allow easy plastic flow.
M1: Amorphous materials' diffraction patterns show: | Broad halos | Sharp Bragg peaks | Nothing | Single spots | No long-range order.
M2: Phase-change memory uses: | Switching between amorphous and crystalline states | Magnetism | Ferroelectricity | Superconductivity | Chalcogenide glasses.

## Biomaterials
S: Biomaterials are materials designed to interact with the body: implants, prosthetics, scaffolds and drug-delivery systems. They must perform mechanically while being biocompatible, avoiding harmful immune responses, toxicity or failure inside a living environment.
H: Material classes
- **Metals**: titanium alloys (Ti-6Al-4V) for hip stems and dental implants; stainless steel; cobalt–chrome for bearings; nitinol stents.
- **Ceramics**: alumina and zirconia (wear-resistant hip heads), hydroxyapatite and bioactive glass (bond to bone).
- **Polymers**: UHMWPE (joint liners), PMMA (bone cement), silicones, PLGA (biodegradable sutures).
- **Natural**: collagen, chitosan, alginate, decellularised tissues.
H: Key requirements
- **Biocompatibility**: appropriate host response, no toxicity.
- **Mechanical matching**: bone E ~10–30 GPa vs titanium ~110 GPa; mismatch causes stress shielding (bone loss).
- **Corrosion and wear resistance**; wear debris causes inflammation.
- **Surface properties**: roughness, chemistry and porosity guide cell attachment and osseointegration.
- **Sterilisability** and degradation rate (for resorbable materials).
E: Stress shielding ∝ E_{implant}/E_{bone} :: load-sharing mismatch
H: Frontiers
P: 3D-printed porous titanium implants match bone stiffness and allow ingrowth. Tissue engineering scaffolds seed cells to regenerate tissue. Hydrogels deliver drugs responsively. Biodegradable magnesium stents dissolve after healing. Antibacterial surfaces fight infection. Regulatory testing (ISO 10993) evaluates safety.
X: A titanium stem (E = 110 GPa) replaces bone (E = 20 GPa) in parallel. Fraction of load carried by implant if cross-sectional areas are equal?
> Load splits by stiffness: 110/(110 + 20) ≈ 85% carried by the implant
> The bone carries only 15% and may resorb (stress shielding)
K: Biomaterials must meet mechanical needs while being biocompatible, durable and suited to the body's environment.
!: Stiffer isn't better in implants: mismatch with bone causes stress shielding and loosening.
Q: What is osseointegration? | Direct structural and functional connection between living bone and an implant surface.
Q: Why is hydroxyapatite used as a coating? | It is chemically similar to bone mineral and promotes bone bonding.
M1: Nitinol stents use: | Superelasticity and shape memory | Magnetism | Biodegradation | Piezoelectricity | Ni–Ti alloy.
M2: UHMWPE is used for: | Joint liners | Electrical wiring | Bone cement | Stents | Low friction, wear resistant.

## Smart materials
S: Smart materials change a property, such as shape, colour, stiffness or electrical output, in a controlled way in response to stimuli like stress, temperature, light or fields. They enable sensors, actuators, adaptive structures and self-healing systems.
H: Types and responses
- **Piezoelectrics**: stress ↔ voltage (PZT, PVDF); sensors, ultrasound, inkjet heads, energy harvesting.
- **Shape-memory alloys and polymers**: recover shape on heating.
- **Magnetostrictives** (Terfenol-D): strain in magnetic fields.
- **Electroactive polymers**: large strains with voltage (artificial muscles).
- **Electro/magnetorheological fluids**: viscosity changes in fields (adaptive dampers in cars, bridges).
- **Thermochromic, photochromic, electrochromic**: colour changes (smart windows, sunglasses).
- **Self-healing materials**: capsules or reversible bonds repair cracks.
E: D = d·T + ε^{T}E :: piezoelectric constitutive relation (charge form)
H: Systems
- Smart structures integrate sensors, actuators and control (vibration suppression in aircraft, adaptive optics).
- Energy harvesting from vibration or body motion powers wireless sensors.
- 4D printing: printed objects change shape over time.
H: Design trade-offs
P: Actuators are compared by strain, stress, speed, efficiency and fatigue life: piezoelectrics are fast but small strain (~0.1%); SMAs give large strain (~5–8%) but slow and inefficient; electroactive polymers give large strain at high voltage. Electrochromic windows reduce building energy use; MR dampers react in milliseconds.
X: A PZT actuator stack with d_{33} = 500 pm V^{-1}, 100 layers, 100 V. Displacement?
> Δx = n d_{33} V = 100 × 500 × 10^{-12} × 100 = 5 μm
X: Why use MR fluids in car suspensions?
> Field-controlled viscosity changes damping within milliseconds to adapt to road conditions
K: Smart materials couple mechanical, thermal, electrical, magnetic and optical responses for sensing and actuation.
!: Every smart material involves trade-offs in strain, force, speed and efficiency; none is best at everything.
Q: What is a magnetorheological fluid? | A suspension whose viscosity increases sharply in a magnetic field.
Q: What do electrochromic windows do? | Change tint when a voltage is applied, controlling light and heat.
M1: Piezoelectric actuators are known for: | Fast response, small strain | Huge strain, slow | No response | Only heating | ~0.1% strain.
M2: Self-healing polymers can use: | Microcapsules or reversible bonds | Magnets only | Lasers | Radioactivity | Repair mechanisms.

## Shape-memory alloys
S: Shape-memory alloys like nickel–titanium remember a shape: deform them when cold and they spring back on heating, or stretch them several percent at body temperature and they recover instantly. These effects come from a reversible martensitic phase transformation.
H: The transformation
- High-temperature **austenite** (cubic B2 in NiTi) ↔ low-temperature **martensite** (monoclinic B19′).
- Transformation temperatures: M_{s}, M_{f} (martensite start/finish on cooling), A_{s}, A_{f} (austenite on heating); hysteresis ~10–40 K.
- Martensite forms in twinned variants that can reorient under stress without permanent slip.
H: Two effects
- **Shape-memory effect**: deform twinned martensite (detwinning) at low T; heating above A_{f} restores austenite and original shape. Recoverable strain up to ~8%.
- **Superelasticity (pseudoelasticity)**: above A_{f}, stress induces martensite, which reverts on unloading; large recoverable strain with a hysteresis loop.
- Clausius–Clapeyron: transformation stress rises with temperature, dσ/dT ≈ 5–8 MPa K^{-1} for NiTi.
E: dσ/dT = −ΔH/(Tε_{0}) :: Clausius–Clapeyron for stress-induced transformation
H: Applications and limits
P: Medical: self-expanding stents, orthodontic wires, guidewires, bone staples. Engineering: actuators, couplings for pipes, eyeglass frames, aerospace morphing structures, Mars rover wheels. Limits: fatigue under cycling, cost, slow response (thermal), low efficiency (~5%), composition sensitivity (0.1% change in Ni shifts temperatures ~10 K). Elastocaloric cooling uses the latent heat of superelastic cycles.
X: NiTi has A_{f} = 20 °C and dσ/dT = 6 MPa K^{-1}. Stress to induce martensite at 37 °C, if 100 MPa is needed at 20 °C?
> Δσ = 6 × 17 ≈ 102 MPa ⇒ about 200 MPa
X: A 50 mm SMA wire recovers 4% strain. Stroke?
> 0.04 × 50 = 2 mm
K: Reversible martensitic transformation gives shape memory on heating and superelasticity under load.
!: SMA transformation temperatures are very composition-sensitive; small chemistry changes shift performance greatly.
Q: What is superelasticity? | Large, recoverable strain due to stress-induced martensite that reverts on unloading above A_{f}.
Q: How does the shape-memory effect work? | Deformed martensite reverts to austenite on heating, recovering the original shape.
M1: The NiTi high-temperature phase is: | Austenite (B2 cubic) | Martensite | Ferrite | Amorphous | Parent phase.
M2: SMA actuators are limited by: | Slow thermal response and low efficiency | Being too fast | High efficiency | No strain | Heating and cooling time.

## Materials under extreme conditions
S: Extreme pressures, temperatures, radiation and strain rates transform materials, creating new phases and revealing fundamental physics. Studying them helps understand planetary interiors, design fusion reactors and spacecraft, and discover materials like superconducting hydrides.
H: High pressure
- **Diamond anvil cells** reach >300 GPa (Earth's core ~360 GPa) using tiny anvil tips.
- Pressure measured by ruby fluorescence shift.
- Phenomena: metallisation (hydrogen metallisation sought near ~400–500 GPa), new phases (superionic water ice), hydride superconductors (H_{3}S 203 K, LaH_{10} ~250 K).
- **Shock compression** (gas guns, lasers like NIF) reaches TPa for nanoseconds.
E: P_{shock} = ρ_{0}U_{s}u_{p} :: Rankine–Hugoniot pressure
H: High temperature and radiation
- Ultra-high-temperature ceramics (HfC, ZrB_{2}) above 3000 °C for hypersonic vehicles.
- Turbine blades: Ni superalloys at ~1100 °C with thermal barrier coatings and internal cooling.
- Radiation damage: displacement per atom (dpa), swelling, embrittlement, helium bubbles; fusion first walls (tungsten) face ~10–20 dpa per year of 14 MeV neutrons.
H: Other extremes
P: High strain rates (explosions, impacts) change strength and failure (adiabatic shear bands). Extreme cold makes some steels brittle and enables quantum phases. Intense magnetic fields reveal quantum oscillations. Planetary science: water may be superionic in Uranus and Neptune; iron's properties at core conditions affect the geodynamo.
X: A shock in aluminium: ρ_{0} = 2700 kg m^{-3}, U_{s} = 8 km s^{-1}, u_{p} = 2 km s^{-1}. Pressure?
> P = 2700 × 8000 × 2000 ≈ 4.3 × 10^{10} Pa = 43 GPa
X: A diamond anvil with culet 50 μm diameter under 1 kN. Pressure?
> A = π(25 × 10^{-6})^{2} ≈ 1.96 × 10^{-9} m^{2}
> P ≈ 1000/1.96 × 10^{-9} ≈ 5 × 10^{11} Pa = 500 GPa (in practice gaskets and bevels limit it)
K: Extreme conditions create new phases and failure modes; experiments with anvils, shocks and irradiation map them.
!: Many high-pressure phases are unstable at ambient conditions; superconducting hydrides need megabar pressures.
Q: How is pressure measured in a diamond anvil cell? | From the shift of ruby fluorescence lines (or Raman of diamond).
Q: What does dpa measure? | Displacements per atom, the average number of times each atom is knocked from its site by radiation.
M1: Hydride superconductors like LaH_{10} need: | Megabar pressures | Ambient conditions | Vacuum | Liquid helium only | ~170 GPa.
M2: Superionic water ice may exist in: | Uranus and Neptune | Earth's crust | The Sun | Mars' poles only | High P and T.

## Materials characterisation techniques
S: Characterisation techniques probe materials from atomic to macroscopic scales. Selecting the right combination of diffraction, microscopy, spectroscopy, thermal and mechanical tests answers questions about structure, composition, defects and performance.
H: A practical toolkit
- **Structure**: XRD (phases, lattice, texture), neutron diffraction (light elements, magnetism), electron diffraction.
- **Imaging**: optical microscopy, SEM (surfaces), TEM/STEM (atomic structure, defects), AFM/STM (surface topography), X-ray CT (3D internal).
- **Composition**: EDX, WDS, XPS (surface chemistry), SIMS (trace depth profiles), ICP-MS (bulk trace elements), APT (atom probe tomography: 3D atom maps).
- **Bonding and phases**: Raman, FTIR, NMR, XAS.
- **Thermal**: DSC, TGA, dilatometry, laser flash.
- **Mechanical**: tensile, hardness, nanoindentation, fatigue, DMA.
- **Electrical/magnetic**: four-point probe, Hall, SQUID, impedance.
H: Choosing methods
- Information needed (structure, chemistry, property).
- Length scale and depth (surface nm vs bulk mm).
- Detection limits (ppm, ppb) and spatial resolution.
- Destructive vs non-destructive; sample preparation effort.
- In situ/operando capability.
E: Interaction volume ∝ E^{1.7}/ρ (SEM, approx.) :: electron range scaling
H: Workflow example
P: A failed turbine blade: visual and optical inspection, SEM fractography (fatigue striations?), EDX for contamination, metallography for microstructure (γ′ precipitate coarsening?), hardness mapping, and CT for internal cracks. Combining techniques (correlative microscopy) reveals cause: e.g. overheating coarsened precipitates and initiated creep cracks. Data from many techniques increasingly feed machine-learning and materials databases.
X: Which techniques would identify a thin oxide on a metal surface and its thickness?
> XPS for chemistry and oxidation state; ellipsometry or XPS depth profiling or TEM cross-section for thickness
X: What does atom probe tomography offer that EDX doesn't?
> 3D maps of individual atoms with near-atomic resolution and ppm sensitivity, versus EDX's micron-scale averages
K: No single technique tells the whole story; combine complementary methods matched to scale, depth and sensitivity.
!: Sample preparation can create artefacts (polishing damage, FIB amorphisation); always consider how preparation affects results.
Q: What does atom probe tomography do? | Field-evaporates atoms from a sharp tip to reconstruct 3D compositional maps atom by atom.
Q: Why use X-ray computed tomography in materials science? | To see internal pores, cracks and structure in 3D non-destructively.
M1: Fatigue striations are observed with: | SEM fractography | XRD | DSC | Hall measurements | Fracture surface imaging.
M2: ICP-MS measures: | Trace elements in bulk samples | Crystal structure | Surface topography | Magnetic moments | Very low detection limits.
`;
