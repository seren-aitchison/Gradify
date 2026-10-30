// Unit 26: General Relativity. Format: kit/course/notes.js
export default `
## Equivalence principle
S: The equivalence principle says that, locally, the effects of gravity are indistinguishable from those of acceleration. A freely falling observer feels no gravity at all. This insight led Einstein to describe gravity as the curvature of spacetime.
H: Forms
- **Weak (WEP)**: all bodies fall with the same acceleration regardless of composition (inertial mass = gravitational mass). Tested to ~10^{-15} (MICROSCOPE satellite, 2022).
- **Einstein (EEP)**: in a small freely falling lab, all non-gravitational physics is the same as in special relativity.
- **Strong**: extends this to gravitational experiments and self-gravitating bodies (tested with lunar laser ranging and pulsars).
H: Einstein's elevator
P: In a sealed lift accelerating at g in deep space, dropped objects fall exactly as on Earth. In a freely falling lift on Earth, everything floats. Einstein called this "the happiest thought of my life" (1907): gravity can be transformed away locally, so it must be a property of spacetime itself.
H: Consequences
- Light bends in gravity (it "falls" in an accelerating lift).
- Clocks run slower deeper in gravitational potential.
- Gravity isn't a force in the usual sense; free fall is natural, unforced motion.
X: Light crosses a 3 m lift accelerating at g. How far does it "fall"?
> t = 3/(3 × 10^{8}) = 10^{-8} s
> Drop = ½gt^{2} = 4.9 × 10^{-16} m: tiny, but real
!: The equivalence is only local: over large regions tidal forces (differences in gravity) reveal true curvature.
Q: State the weak equivalence principle. | All bodies fall with the same acceleration in a gravitational field, regardless of their composition.
Q: Why must light bend in gravity, by the equivalence principle? | In an accelerating frame light appears to curve; by equivalence it must curve in gravity too.
M1: Astronauts on the ISS float because: | They're in free fall with the station | There's no gravity at that height | They're above the atmosphere | Magnetism | Equivalence.
M2: Tidal forces show that equivalence is only: | Local | Global | Exact everywhere | False | Gravity gradients.

## Accelerated reference frames
S: Accelerated frames experience inertial forces that mimic gravity. Studying them in special relativity shows how clocks and light behave under acceleration, a stepping stone to general relativity.
H: Uniform acceleration
- **Rindler coordinates**: the frame of an observer with constant proper acceleration a.
- A horizon forms at distance c^{2}/a behind the observer: light from beyond can never catch up.
- Clocks at different heights in the frame run at different rates: dτ_{top}/dτ_{bottom} ≈ 1 + ah/c^{2}.
H: Rotating frames
- Centrifugal and Coriolis effects.
- **Sagnac effect**: light sent both ways round a rotating loop returns at different times; used in ring-laser and fibre-optic gyroscopes in aircraft navigation.
- Ehrenfest's paradox: a rotating disc's circumference contracts but its radius doesn't, so its geometry isn't Euclidean: a hint that gravity (equivalent to acceleration) means curved geometry.
H: Unruh effect
P: An accelerating observer should see the vacuum as a warm bath of particles at T = ħa/(2πck_{B}). For a = 10^{20} m s^{-2}, T is only ~0.4 K: far too small to have been measured directly yet. It's closely related to Hawking radiation.
X: Fractional clock-rate difference between the top and bottom of a 10 m rocket accelerating at g?
> Δτ/τ ≈ gh/c^{2} = 9.8 × 10/(9 × 10^{16}) ≈ 1.1 × 10^{-15}
!: Special relativity handles acceleration perfectly well; general relativity is needed for gravity (curved spacetime), not for acceleration itself.
Q: What is the Sagnac effect? | A time difference for light travelling opposite ways round a rotating loop, used in optical gyroscopes.
Q: What is the Unruh effect? | An accelerating observer perceives the vacuum as thermal radiation at a temperature proportional to acceleration.
M1: A uniformly accelerating observer has a horizon at distance: | c^{2}/a | c/a | a/c^{2} | Infinite | Rindler horizon.
M2: Ring-laser gyroscopes use: | The Sagnac effect | The Doppler effect | Lenz's law | Hall effect | Rotation sensing.

## Gravity as spacetime curvature
S: General relativity describes gravity not as a force but as the curvature of spacetime caused by mass and energy. Objects in free fall follow the straightest possible paths through curved spacetime, which look like orbits and falling motion.
H: The core idea
- "Spacetime tells matter how to move; matter tells spacetime how to curve" (Wheeler).
- Free particles follow geodesics.
- Mass–energy, momentum, pressure and stress all source curvature.
H: Curvature vs tidal forces
- Locally, curvature is invisible (equivalence principle).
- It appears as tidal forces: nearby free-falling particles accelerate relative to each other (geodesic deviation).
- Earth's tides are spacetime curvature from the Moon and Sun.
H: Time curvature dominates
P: For everyday gravity, it's mostly the curvature of time that matters: clocks run slower closer to Earth, and objects move towards where time runs slowest. The spatial curvature near Earth is tiny; spatial curvature becomes significant for light bending (doubling Newton's prediction) and near compact objects.
X: Fractional clock-rate difference between Earth's surface and a GPS satellite orbit (from gravity alone)?
> ΔΦ/c^{2} = GM(1/R − 1/r)/c^{2} with R = 6.37 × 10^{6} m, r = 2.66 × 10^{7} m
> ≈ 5.3 × 10^{-10}: about +45 μs per day for the satellite
!: The "rubber sheet" picture of curved space shows spatial curvature, but in reality it's mostly time curvature that makes things fall.
Q: How does general relativity describe gravity? | As the curvature of spacetime by mass and energy, with free particles following geodesics.
Q: How does curvature show up physically? | As tidal forces: relative accelerations between nearby free-falling objects.
M1: In GR, a planet orbits the Sun because it: | Follows a geodesic in curved spacetime | Is pulled by a force | Is pushed by the ether | Is magnetic | Free fall.
M2: What sources spacetime curvature? | Energy, momentum, pressure and stress | Mass only | Charge only | Light only | Stress–energy tensor.

## Metric tensors
S: The metric tensor defines distances and times in spacetime, determining its geometry. Given the metric, you can calculate proper times, light paths, curvature and orbits.
H: Definition
E: ds^{2} = g_{μν}dx^{μ}dx^{ν}
- Symmetric 4 × 4 tensor: 10 independent components.
- Flat spacetime: Minkowski metric η_{μν}.
- Weak gravity: g_{00} ≈ 1 + 2Φ/c^{2}, linking to the Newtonian potential Φ.
H: Uses
- Proper time along a worldline: dτ = √(g_{μν}dx^{μ}dx^{ν})/c.
- Raising and lowering indices: A_{μ} = g_{μν}A^{ν}.
- Christoffel symbols (from derivatives of g) give how vectors change along curves.
H: Coordinates
P: The same spacetime can be described in many coordinate systems, giving different-looking metrics. Physical predictions must be coordinate-independent. Some apparent singularities (like r = 2GM/c^{2} in Schwarzschild coordinates) disappear in better coordinates; others (r = 0) are real.
X: In the weak-field metric, how much slower does a clock at Earth's surface run than one far away?
> dτ/dt ≈ 1 + Φ/c^{2} = 1 − GM/(Rc^{2})
> GM/(Rc^{2}) = 7 × 10^{-10}: 0.06 ms per day
!: The metric's components depend on coordinates; curvature (computed from them) is what's physically meaningful.
Q: What does the metric tensor determine? | Spacetime intervals: distances, times and the geometry of spacetime.
Q: How is the Newtonian potential related to the metric in weak fields? | g_{00} ≈ 1 + 2Φ/c^{2}.
M1: The metric tensor has how many independent components in 4D? | 10 | 16 | 4 | 6 | Symmetric.
M2: A coordinate singularity is: | An artefact of coordinates removable by changing them | A true infinity in curvature | Always at r = 0 | Physical | E.g. Schwarzschild horizon.

## Geodesics
S: A geodesic is the straightest possible path in curved spacetime. Freely falling particles follow timelike geodesics; light follows null geodesics. Planetary orbits, light bending and falling apples are all geodesic motion.
H: The geodesic equation
E: d^{2}x^{μ}/dτ^{2} + Γ^{μ}_{αβ}(dx^{α}/dτ)(dx^{β}/dτ) = 0
- Γ: Christoffel symbols, encoding how coordinates curve.
- In weak fields reduces to Newton's d^{2}x/dt^{2} = −∇Φ.
H: Properties
- Timelike geodesics maximise proper time (locally).
- Null geodesics: ds = 0; light paths.
- Geodesic deviation measures curvature: initially parallel geodesics converge or diverge.
H: Examples
- Earth's orbit: a geodesic in the Sun's curved spacetime.
- Great circles on a sphere: geodesics of 2D curved space (aircraft routes).
- Photon sphere around black holes at r = 1.5r_{s}: light can orbit (unstably).
- ISCO (innermost stable circular orbit) at 3r_{s} for non-rotating black holes: inner edge of accretion discs.
X: Why does a thrown ball follow a parabola if it's moving "straight"?
> In spacetime, its worldline is a geodesic, maximising proper time between launch and landing
> Projected into space alone, that path looks curved
!: Geodesics in spacetime aren't geodesics in space; a straight spacetime path can look like an orbit in space.
Q: What path does a freely falling object follow in GR? | A timelike geodesic.
Q: What is the photon sphere? | The radius (1.5r_{s} for a non-rotating black hole) where light can orbit.
M1: Great circles are geodesics on: | A sphere | A plane | A cylinder only | A cone | Shortest paths.
M2: The ISCO for a non-rotating black hole is at: | 3r_{s} | r_{s} | 1.5r_{s} | 10r_{s} | Innermost stable orbit.

## Curvature and the Riemann tensor
S: The Riemann curvature tensor measures how spacetime is curved: how much a vector changes when carried around a small loop, and how nearby geodesics converge or diverge. It contains all the information about tidal gravity.
H: Definition
E: R^{ρ}_{σμν} = ∂_{μ}Γ^{ρ}_{νσ} − ∂_{ν}Γ^{ρ}_{μσ} + Γ^{ρ}_{μλ}Γ^{λ}_{νσ} − Γ^{ρ}_{νλ}Γ^{λ}_{μσ}
- 20 independent components in 4D.
- Zero everywhere if and only if spacetime is flat.
H: Contractions
E: R_{μν} = R^{λ}_{μλν} :: Ricci tensor
E: R = g^{μν}R_{μν} :: Ricci scalar
- Ricci curvature: how volumes of small balls of test particles change (determined locally by matter).
- Weyl tensor: the remaining tidal curvature that can exist in empty space (gravitational waves, tidal fields of distant masses).
H: Parallel transport
P: Carry an arrow around a closed loop on a sphere, keeping it "parallel" at each step: it returns rotated. The rotation angle equals the enclosed curvature. On a flat plane, it returns unchanged. Spacetime curvature is detected the same way, in principle.
X: Parallel-transport a vector around a triangle on a sphere with three 90° angles (one octant). Rotation?
> Excess angle = 90° + 90° + 90° − 180° = 90°
> The vector rotates by 90°, equal to the enclosed area/R^{2} = (4πR^{2}/8)/R^{2} = π/2
!: Curvature isn't the same as non-zero Christoffel symbols; those can appear in flat space with curvilinear coordinates.
Q: What does the Riemann tensor measure? | Spacetime curvature: tidal effects and the change in vectors carried around loops.
Q: What is the Weyl tensor? | The part of curvature not determined locally by matter: tidal fields and gravitational waves in vacuum.
M1: Spacetime is flat if and only if: | The Riemann tensor vanishes | The metric is diagonal | Christoffel symbols vanish | Mass is zero nearby | Coordinate-independent test.
M2: The Riemann tensor in 4D has how many independent components? | 20 | 10 | 256 | 6 | Symmetries reduce it.

## Einstein field equations
S: Einstein's field equations relate spacetime curvature to the energy and momentum within it. They're ten coupled nonlinear equations whose solutions describe everything from planetary orbits to black holes and the expanding universe.
H: The equations
E: G_{μν} + Λg_{μν} = (8πG/c^{4})T_{μν}
E: G_{μν} = R_{μν} − ½Rg_{μν} :: Einstein tensor
- Λ: cosmological constant (dark energy).
- ∇^{μ}G_{μν} = 0 automatically, guaranteeing energy–momentum conservation.
H: Properties
- Nonlinear: gravity's own energy gravitates; superposition fails.
- Weak-field limit gives Newton's ∇^{2}Φ = 4πGρ.
- 8πG/c^{4} ≈ 2 × 10^{-43} N^{-1}: spacetime is extremely stiff; huge energies give small curvature.
H: Exact solutions
P: Schwarzschild (1916, spherical mass), Reissner–Nordström (charged), Kerr (1963, rotating), Friedmann–Lemaître–Robertson–Walker (cosmology), gravitational plane waves. Most realistic situations (merging black holes) need numerical relativity.
X: Show the weak-field limit gives Newton's law (outline).
> Static, slow, weak field: only g_{00} matters; T_{00} = ρc^{2}
> The 00 component reduces to ∇^{2}Φ = 4πGρ
!: The field equations don't just apply to "mass"; pressure contributes to gravity too, important inside neutron stars and in cosmology.
Q: State Einstein's field equations. | G_{μν} + Λg_{μν} = (8πG/c^{4})T_{μν}.
Q: Why are the field equations nonlinear? | Gravitational field energy itself gravitates.
M1: The cosmological constant represents: | Vacuum energy (dark energy) | Dark matter | Black holes | Photons | Λ.
M2: In the weak-field limit, Einstein's equations reduce to: | Poisson's equation for gravity | Maxwell's equations | Schrödinger's equation | Hooke's law | Newtonian gravity.

## Stress-energy tensor
S: The stress–energy tensor describes the density and flow of energy and momentum in spacetime. It's the source term in Einstein's equations: not just mass but energy, momentum, pressure and stress all curve spacetime.
H: Components
- T^{00}: energy density.
- T^{0i}: energy flux (momentum density × c).
- T^{ij}: stress: pressure (diagonal) and shear (off-diagonal).
- Symmetric; conserved: ∂_{μ}T^{μν} = 0 (or covariant version).
H: Perfect fluid
E: T^{μν} = (ρ + p/c^{2})U^{μ}U^{ν} − pg^{μν}
- Dust (p = 0): pressureless matter.
- Radiation: p = ρc^{2}/3.
- Vacuum energy: p = −ρc^{2} (negative pressure, accelerating expansion).
H: Pressure gravitates
P: In GR the effective gravitating density is ρ + 3p/c^{2}. Inside neutron stars, pressure adds to gravity, which is why there's a maximum mass beyond which collapse is unavoidable. In cosmology, dark energy's negative pressure gives ρ + 3p/c^{2} < 0: repulsive gravity and accelerating expansion.
X: Effective gravitating density of radiation with energy density ρc^{2}?
> ρ + 3p/c^{2} = ρ + ρ = 2ρ: radiation gravitates twice as strongly as dust of the same energy density
!: Negative pressure isn't negative energy; vacuum energy has positive energy density but negative pressure.
Q: What does the stress–energy tensor describe? | The density and flux of energy and momentum, including pressure and stress.
Q: Why does dark energy accelerate expansion? | Its negative pressure makes ρ + 3p/c^{2} negative, giving repulsive gravity.
M1: For radiation, pressure is: | ρc^{2}/3 | 0 | −ρc^{2} | ρc^{2} | Equation of state w = 1/3.
M2: The T^{00} component is: | Energy density | Pressure | Momentum flux | Shear | Time–time.

## Schwarzschild solution
S: The Schwarzschild solution describes spacetime outside a spherical, non-rotating, uncharged mass. Found in 1916 within months of Einstein's equations, it predicts perihelion precession, light bending and black holes.
H: The metric
E: ds^{2} = (1 − r_{s}/r)c^{2}dt^{2} − dr^{2}/(1 − r_{s}/r) − r^{2}dΩ^{2}
E: r_{s} = 2GM/c^{2} :: Schwarzschild radius
- Sun: 3 km; Earth: 9 mm; Sgr A* (4 × 10^{6} M_{⊙}): 12 million km.
- Birkhoff's theorem: any spherically symmetric vacuum is Schwarzschild (so a pulsating spherical star doesn't radiate gravitational waves).
H: Key radii
- r_{s}: event horizon (if the mass is inside it).
- 1.5r_{s}: photon sphere.
- 3r_{s}: innermost stable circular orbit.
H: Physics near the horizon
P: A distant observer sees an infalling clock slow and its light redden infinitely as it approaches r_{s}; the infaller notices nothing special crossing it (for a large black hole), reaching r = 0 in finite proper time. The singularity at r_{s} in these coordinates is removable (Eddington–Finkelstein, Kruskal coordinates); r = 0 is a true curvature singularity.
X: Schwarzschild radius of a 10 M_{⊙} black hole?
> r_{s} = 2 × 6.67 × 10^{-11} × 2 × 10^{31}/(9 × 10^{16}) ≈ 30 km
!: Outside a spherical star, spacetime is the same as for a black hole of the same mass; you wouldn't be sucked in if the Sun became a black hole.
Q: What is the Schwarzschild radius? | r_{s} = 2GM/c^{2}, the event horizon radius of a non-rotating black hole.
Q: What does Birkhoff's theorem state? | Any spherically symmetric vacuum solution is Schwarzschild (static).
M1: The Sun's Schwarzschild radius is about: | 3 km | 3 m | 300 km | 3 mm | r_{s} ∝ M.
M2: At r = r_{s}, Schwarzschild coordinates show a: | Coordinate singularity | True curvature singularity | Photon sphere | Wormhole | Removable.

## Kerr black holes
S: The Kerr solution describes a rotating black hole, defined by just mass and spin. Real astrophysical black holes rotate, and their spin drives jets, shapes accretion discs and imprints gravitational waves from mergers.
H: Features
- Spin parameter a = J/(Mc), dimensionless χ = a/(GM/c^{2}) between 0 and 1.
- Outer event horizon r_{+} = GM/c^{2}(1 + √(1 − χ^{2})): shrinks with spin.
- **Ergosphere**: region outside the horizon where spacetime is dragged so strongly nothing can stay still (frame dragging).
- Ring singularity inside.
- ISCO moves from 6GM/c^{2} (χ = 0) to GM/c^{2} (prograde, χ = 1): faster spin allows discs closer in, radiating more efficiently (up to 42% of rest mass energy).
H: Extracting energy
P: The Penrose process: a particle splitting in the ergosphere can send one piece into the hole on a negative-energy orbit, the other escaping with more energy than the original. The Blandford–Znajek mechanism extracts rotational energy through magnetic fields, probably powering jets from active galactic nuclei.
H: No-hair theorem
- Black holes are described only by mass, spin and charge.
- Tested by ringdown frequencies of merger remnants in gravitational-wave data.
X: Horizon radius of a maximally spinning (χ = 1) black hole compared with non-rotating?
> r_{+} = GM/c^{2} vs 2GM/c^{2}: half the size
!: Rotating black holes don't spin like solid objects; frame dragging forces everything near them to co-rotate.
Q: What is the ergosphere? | The region outside a rotating black hole's horizon where nothing can remain stationary relative to distant stars.
Q: What does the no-hair theorem say? | Black holes are fully described by their mass, spin and charge.
M1: Black hole spin parameter χ ranges from: | 0 to 1 | 0 to infinity | −1 to 0 | 1 to 10 | Kerr bound.
M2: The Penrose process extracts energy from: | A black hole's rotation | Its charge | Hawking radiation | Its mass only | Ergosphere.

## Gravitational time dilation
S: Clocks deeper in a gravitational potential run slower than clocks higher up. The effect is tiny on Earth but measurable with atomic clocks over a single centimetre, and enormous near black holes.
H: Formulas
E: dτ/dt = √(1 − r_{s}/r) :: Schwarzschild
E: Δτ/τ ≈ gh/c^{2} :: near Earth's surface
- Earth's surface vs infinity: 7 × 10^{-10}.
- At the surface of a neutron star: ~20–30% slower.
H: Evidence
- Pound–Rebka (1959): gamma rays climbing a 22.5 m tower shifted by 2.5 × 10^{-15}.
- Gravity Probe A (1976): hydrogen maser rocket to 10 000 km: confirmed to 7 × 10^{-5}.
- Optical clocks (2010, 2022): differences over 33 cm, then across a millimetre-scale atom cloud.
- GPS: satellite clocks run faster by ~45 μs per day.
H: Consequences
P: Gravitational time dilation means the Earth's core is ~2.5 years younger than its surface over its history. Near a black hole, clocks freeze as seen from far away. Relativistic geodesy uses optical clocks to measure height differences in the geoid to centimetres.
X: A clock 1 km higher than another runs fast by what fraction? Per year?
> gh/c^{2} = 9.8 × 1000/9 × 10^{16} = 1.1 × 10^{-13}
> × 3.15 × 10^{7} s ≈ 3.4 μs per year
!: Gravitational time dilation depends on potential, not on the local strength of gravity: a clock at the centre of a hollow shell runs slow though it feels no gravity.
Q: Do clocks run faster or slower lower in a gravitational field? | Slower.
Q: What did the Pound–Rebka experiment measure? | The gravitational frequency shift of gamma rays over a 22.5 m height.
M1: Optical clocks have detected gravitational time dilation over: | Centimetres | Kilometres only | Light-years | Never | Height differences ~1 cm.
M2: GPS satellite clocks run fast mainly because of: | Weaker gravity at altitude | Their speed | Temperature | Solar wind | Gravitational effect dominates.

## Gravitational redshift
S: Light climbing out of a gravitational well loses energy and is shifted to longer wavelengths. Gravitational redshift is seen from white dwarfs, neutron stars, black-hole surroundings and in precise laboratory measurements.
H: Formulas
E: z = 1/√(1 − r_{s}/r) − 1 :: from r to infinity (Schwarzschild)
E: z ≈ GM/(rc^{2}) = ΔΦ/c^{2} :: weak field
- Sun's surface: z ≈ 2 × 10^{-6} (636 m s^{-1} equivalent).
- White dwarf Sirius B: ~3 × 10^{-4} (80 km s^{-1}).
- Neutron star: ~0.2–0.3.
H: Equivalent descriptions
- Photon energy loss climbing out (like a ball losing KE).
- Clocks at the bottom run slow, so emitted frequencies look low from above.
- Both describe the same effect.
H: Observations
P: The star S2, orbiting Sgr A* at closest approach (2018), showed a combined gravitational redshift and transverse Doppler shift of ~200 km s^{-1}, matching GR (GRAVITY collaboration). X-ray iron lines from accretion discs near black holes are broadened and redshifted by strong gravity.
X: Gravitational redshift of light from Sirius B (M = 1.0 M_{⊙}, R = 5800 km)?
> z ≈ GM/(Rc^{2}) = 1.33 × 10^{20}/(5.8 × 10^{6} × 9 × 10^{16}) ≈ 2.5 × 10^{-4}
!: Gravitational redshift isn't a Doppler shift; it occurs even when source and observer are at rest relative to each other.
Q: What is gravitational redshift? | The increase in wavelength of light escaping a gravitational potential well.
Q: Where has gravitational redshift been measured in astronomy? | White dwarfs, the Sun, stars orbiting Sgr A*, and accretion discs near black holes.
M1: Light from a neutron star's surface has redshift around: | 0.2–0.3 | 10^{-6} | 10 | 0 | Compact object.
M2: Gravitational redshift and time dilation are: | Two views of the same effect | Unrelated | Opposite | Only in Newtonian gravity | Equivalent descriptions.

## Perihelion precession
S: General relativity predicts that orbits around a massive body aren't closed ellipses: the point of closest approach slowly advances. It explained Mercury's anomalous 43″ per century, GR's first triumph.
H: The prediction
E: Δφ = 6πGM/(c^{2}a(1 − e^{2})) per orbit
- Mercury: 43.0″ per century (observed 43.1 ± 0.5).
- Venus 8.6″; Earth 3.8″ per century.
- Binary pulsars: degrees per year (PSR B1913+16: 4.2° per year).
- Star S2 around Sgr A*: 12′ per orbit, confirmed in 2020.
H: Why it happens
P: In GR the effective potential gains an extra term ∝ −1/r^{3}, which strengthens gravity close in. The orbit's radial and angular frequencies no longer match, so each loop finishes slightly ahead of where it began. Only the 1/r Newtonian potential gives closed orbits.
H: History
- Le Verrier (1859) found Mercury's excess precession; astronomers postulated a planet "Vulcan" inside Mercury's orbit, never found.
- Einstein (1915) calculated 43″ per century from his new theory; he said it gave him heart palpitations.
X: Precession per orbit of Mercury (a = 5.79 × 10^{10} m, e = 0.206)?
> Δφ = 6π × 1.33 × 10^{20}/(9 × 10^{16} × 5.79 × 10^{10} × 0.958) = 5.0 × 10^{-7} rad
> × 415 orbits per century = 2.1 × 10^{-4} rad = 43″
!: Most of Mercury's observed precession (~531″ per century) is Newtonian, caused by other planets; only the 43″ residue needs GR.
Q: How much of Mercury's perihelion precession does GR explain? | About 43 arcseconds per century.
Q: Why do GR orbits precess? | An extra term in the effective potential makes radial and angular periods differ slightly.
M1: The hypothetical planet proposed to explain Mercury's precession was: | Vulcan | Nemesis | Planet X | Neptune | Le Verrier.
M2: Precession is largest for orbits that are: | Close and eccentric | Far and circular | Around light stars | Retrograde | ∝ 1/(a(1 − e^{2})).

## Light bending and gravitational lensing
S: Light follows curved paths near massive objects. GR predicts twice the deflection Newtonian reasoning gives, first confirmed during the 1919 eclipse, and now used to weigh galaxies and find planets.
H: Deflection
E: α = 4GM/(c^{2}b) :: impact parameter b
- Sun's edge: 1.75″ (Newtonian corpuscles: 0.87″).
- Half comes from time curvature, half from space curvature.
H: Tests
- Eddington and Dyson (1919): eclipse star positions.
- VLBI radio measurements of quasars near the Sun: GR confirmed to 10^{-4}.
- Gaia measures light bending by the Sun and planets across the whole sky.
H: Lensing regimes
- **Strong**: multiple images, arcs, Einstein rings.
- **Weak**: statistical shape distortions mapping dark matter.
- **Microlensing**: brightening events; planets found around distant stars.
- **Shapiro delay**: signals passing the Sun are delayed (~200 μs), confirmed by Cassini to 2 × 10^{-5}.
H: Cosmic magnifiers
P: Galaxy clusters magnify distant galaxies, letting Hubble and JWST see objects from the first few hundred million years. Time delays between multiple images of variable quasars and supernovae measure the Hubble constant independently.
X: Deflection of starlight grazing a white dwarf (M = M_{⊙}, R = 7000 km)?
> α = 4 × 1.33 × 10^{20}/(9 × 10^{16} × 7 × 10^{6}) = 8.4 × 10^{-4} rad ≈ 3′
!: GR's light bending is twice the naive Newtonian value; the factor of 2 is a key test distinguishing the theories.
Q: How much does light bend grazing the Sun? | 1.75 arcseconds.
Q: What is the Shapiro delay? | The extra time for signals passing near a massive body due to spacetime curvature.
M1: The 1919 eclipse expedition was led by: | Eddington and Dyson | Einstein | Hubble | Michelson | Confirmed light bending.
M2: Microlensing can detect: | Planets around distant stars | Black hole spins | Neutrinos | Dark energy directly | Brightening light curves.

## Black holes and event horizons
S: A black hole is a region of spacetime where gravity is so strong that nothing, not even light, can escape. Its boundary, the event horizon, is a one-way membrane; black holes form from collapsing massive stars and grow at galaxy centres.
H: Formation and types
- Stellar-mass (~5–100 M_{⊙}): from core collapse of massive stars, or mergers.
- Supermassive (10^{6}–10^{10} M_{⊙}): at galactic centres; Sgr A* (4.3 million M_{⊙}), M87* (6.5 billion M_{⊙}).
- Intermediate-mass: rarer; GW190521 produced ~142 M_{⊙}.
- Primordial: hypothetical, from the early universe.
H: Evidence
- X-ray binaries (Cygnus X-1, 1971).
- Stars orbiting Sgr A* (Genzel, Ghez: Nobel 2020).
- Gravitational waves from mergers (LIGO 2015 onwards).
- Event Horizon Telescope images of M87* (2019) and Sgr A* (2022) shadows.
H: Horizons
P: The event horizon is defined globally: points from which no signal reaches distant observers. Falling in, a large black hole's tidal forces are gentle at the horizon; small ones would "spaghettify" an infaller first. Black hole thermodynamics: area never decreases (Hawking area theorem, confirmed with GW150914 data), and horizons have entropy S = k_{B}Ac^{3}/(4Għ).
X: Density inside the Schwarzschild radius of a 10^{8} M_{⊙} black hole?
> r_{s} = 3 × 10^{11} m; V ≈ 1.1 × 10^{35} m^{3}; M = 2 × 10^{38} kg
> ρ ≈ 1800 kg m^{-3}: about the density of water; large black holes aren't necessarily "dense"
!: Black holes don't suck things in; at a distance, they attract exactly like any other object of the same mass.
Q: What is an event horizon? | The boundary beyond which nothing can escape to infinity.
Q: What did the Event Horizon Telescope image? | The shadows of the black holes M87* and Sgr A*.
M1: The supermassive black hole at the Milky Way's centre has about: | 4 million solar masses | 4 solar masses | 4 billion | 400 | Sgr A*.
M2: Black hole entropy is proportional to: | Horizon area | Volume | Mass only | Temperature | Bekenstein–Hawking.

## Singularities
S: Singularities are places where general relativity predicts infinite curvature and the theory breaks down. The Penrose–Hawking theorems show they're generic: inside black holes and at the Big Bang, classical GR can't be the full story.
H: Types
- **Coordinate singularities**: artefacts of coordinates (Schwarzschild horizon).
- **Curvature singularities**: invariants like R_{μνρσ}R^{μνρσ} diverge (r = 0 in Schwarzschild).
- **Spacelike** (Schwarzschild: a moment in the future for infallers) vs **timelike** (Kerr ring singularity).
H: Singularity theorems
P: Penrose (1965) showed that once a trapped surface forms (light can't escape outward), a singularity is inevitable under reasonable energy conditions: black hole formation is generic, not an artefact of perfect symmetry (Nobel 2020). Hawking extended this to cosmology: the universe began with a singularity if GR holds all the way back.
H: Cosmic censorship
- Penrose's conjecture: singularities formed by collapse are always hidden inside horizons (no "naked" singularities).
- Not proven; some counterexamples exist in special conditions.
H: Resolution
- Quantum gravity is expected to replace singularities with something finite: loop quantum cosmology's bounce, string theory's fuzzballs, or other proposals.
X: Tidal acceleration across a 2 m person at r_{s} of a 10 M_{⊙} black hole?
> Δa ≈ 2GMh/r^{3} with r = 30 km: 2 × 1.33 × 10^{21} × 2/(2.7 × 10^{13}) ≈ 2 × 10^{8} m s^{-2}
> Lethal before reaching the horizon; for a 10^{8} M_{⊙} hole it'd be ~10^{-5} m s^{-2}
!: A singularity isn't a point of infinite density "sitting" inside the black hole; for Schwarzschild it's a moment in time that infallers inevitably reach.
Q: What do the Penrose–Hawking theorems show? | Under general conditions, GR predicts singularities in gravitational collapse and the Big Bang.
Q: What is cosmic censorship? | The conjecture that singularities from collapse are hidden behind event horizons.
M1: The Kerr singularity is shaped like: | A ring | A point | A sphere | A plane | Rotating black holes.
M2: Singularities signal: | The breakdown of classical GR | Infinite mass | Wormholes | White holes always | Need quantum gravity.

## Gravitational waves
S: Gravitational waves are ripples in spacetime curvature that travel at the speed of light, produced by accelerating masses. Predicted in 1916 and detected in 2015, they've opened a new window on black holes, neutron stars and gravity itself.
H: Properties
- Transverse, two polarisations (+, ×), stretching and squeezing space perpendicular to travel.
- Quadrupole radiation: L_{GW} = (G/5c^{5})⟨d^{3}Q_{ij}/dt^{3}⟩^{2}.
- Strain h ~ 10^{-21} at Earth from merging stellar black holes in other galaxies.
- Barely interact with matter: travel unimpeded across the universe.
H: Detectors
- Ground interferometers (LIGO, Virgo, KAGRA): 10 Hz–kHz; stellar-mass mergers.
- Pulsar timing arrays (NANOGrav, EPTA, PPTA): nanohertz; supermassive black hole binaries (background evidence 2023).
- Space interferometer LISA (2030s): millihertz; massive black hole mergers, galactic binaries.
H: Highlights
P: GW150914: two black holes (36 and 29 M_{⊙}) merged, radiating 3 M_{⊙}c^{2} in 0.2 s, more power than all stars in the observable universe combined (Nobel 2017: Weiss, Barish, Thorne). GW170817: neutron-star merger with light seen across the spectrum, confirming gravitational waves travel at c to 10^{-15} and that mergers forge gold.
X: Peak power of GW150914 (≈ 3.6 × 10^{49} W) compared with the Sun (3.8 × 10^{26} W)?
> Ratio ≈ 10^{23}
!: Gravitational waves stretch the detector arms but also the light's wavelength; the measurement works because the light spends time in the arms while the strain changes.
Q: How were gravitational waves first directly detected? | By LIGO in 2015 (GW150914), from merging black holes.
Q: Why do gravitational waves carry information so cleanly? | They interact very weakly with matter, passing through it unaltered.
M1: Gravitational-wave strain from distant mergers at Earth is about: | 10^{-21} | 10^{-6} | 1 | 10^{-50} | Tiny.
M2: LISA will detect gravitational waves at: | Millihertz frequencies | Kilohertz | Nanohertz | Gigahertz | Space-based.

## Binary systems and gravitational radiation
S: Two compact objects orbiting each other emit gravitational waves, losing energy and spiralling together. This inspiral, ending in a merger and ringdown, has been measured precisely in binary pulsars and gravitational-wave detectors.
H: The Hulse–Taylor pulsar
- PSR B1913+16 (discovered 1974): two neutron stars, 7.75-hour orbit.
- Orbital period shrinks by 76.5 μs per year, matching GR's gravitational-wave prediction to 0.2% (Nobel 1993).
- Double pulsar J0737−3039 tests GR to 0.01% (2021).
H: Inspiral, merger, ringdown
E: f_{GW} = 2f_{orbit}; chirp mass M_{c} = (m_{1}m_{2})^{3/5}/(m_{1} + m_{2})^{1/5}
E: df/dt ∝ M_{c}^{5/3}f^{11/3}
- Inspiral: frequency and amplitude rise ("chirp").
- Merger: strong-field, non-linear: numerical relativity needed.
- Ringdown: the remnant settles into a Kerr black hole, ringing at quasi-normal mode frequencies.
H: What waveforms reveal
P: Fitting waveforms gives masses, spins, distance (making mergers "standard sirens" for measuring the Hubble constant), orbital eccentricity and tests of GR in the strongest fields ever probed. Neutron-star mergers also measure tidal deformability, constraining the equation of state of dense matter.
X: Two 30 M_{⊙} black holes: chirp mass?
> M_{c} = (900)^{3/5}/(60)^{1/5} M_{⊙} = 59.3/2.27 ≈ 26 M_{⊙}
!: A binary's gravitational-wave frequency is twice its orbital frequency, since the mass quadrupole repeats twice per orbit.
Q: What did the Hulse–Taylor binary pulsar demonstrate? | Orbital decay matching energy loss to gravitational waves predicted by GR.
Q: What is the chirp mass? | The mass combination controlling a binary's frequency evolution during inspiral.
M1: The three phases of a merger signal are: | Inspiral, merger, ringdown | Rise, fall, rise | Pulse, pause, pulse | Inflation, collapse, bounce | Waveform.
M2: Standard sirens measure: | Distances (for the Hubble constant) | Masses only | Spin only | Temperatures | Amplitude gives distance.

## Cosmological solutions
S: Applying general relativity to the whole universe, assuming it's uniform on large scales, gives expanding or contracting models. These Friedmann–Lemaître–Robertson–Walker solutions are the foundation of modern cosmology.
H: The cosmological principle
- On scales above ~100 Mpc the universe is homogeneous and isotropic.
- Supported by the CMB (uniform to 1 part in 10^{5}) and galaxy surveys.
H: FLRW metric
E: ds^{2} = c^{2}dt^{2} − a(t)^{2}[dr^{2}/(1 − kr^{2}) + r^{2}dΩ^{2}]
- a(t): scale factor; k: spatial curvature (+1 closed, 0 flat, −1 open).
- Observations: k ≈ 0 (flat to < 0.2%).
H: History of solutions
- Einstein's static universe (1917) needed Λ; unstable.
- de Sitter (1917): empty expanding universe with Λ.
- Friedmann (1922) and Lemaître (1927): expanding universes; Lemaître linked expansion to galaxy redshifts.
- Hubble (1929): expansion observed.
H: Expansion
P: Space itself stretches: galaxies aren't flying through space but being carried apart. Light's wavelength stretches with a: 1 + z = a_{now}/a_{then}. Distant galaxies can recede faster than light without violating relativity, because nothing moves through space faster than c locally.
X: Light emitted at z = 3: how much smaller was the universe?
> a_{then}/a_{now} = 1/(1 + z) = 1/4
!: The Big Bang wasn't an explosion at a point in space; it happened everywhere, as space itself expanded.
Q: What does the FLRW metric assume? | A homogeneous, isotropic universe (the cosmological principle).
Q: How is redshift related to the scale factor? | 1 + z = a_{now}/a_{then}.
M1: Observations indicate the universe's spatial curvature is: | Nearly flat | Strongly closed | Strongly open | Undefined | k ≈ 0.
M2: Who first linked cosmic expansion to galaxy redshifts? | Lemaître | Einstein | Newton | Eddington | 1927.

## Friedmann equations
S: The Friedmann equations govern how the universe's expansion rate changes over time, given its contents: matter, radiation, dark energy and curvature. They show how the universe evolved from a hot dense start to today's accelerating expansion.
H: The equations
E: H^{2} = (ȧ/a)^{2} = (8πG/3)ρ − kc^{2}/a^{2} + Λc^{2}/3
E: ä/a = −(4πG/3)(ρ + 3p/c^{2}) + Λc^{2}/3
E: ρ_{c} = 3H^{2}/(8πG) :: critical density (~10^{-26} kg m^{-3}, ~6 protons per m^{3})
H: Components
- Matter: ρ ∝ a^{−3}. Radiation: ρ ∝ a^{−4}. Dark energy (Λ): constant.
- Density parameters today: Ω_{Λ} ≈ 0.69, Ω_{m} ≈ 0.31 (dark matter 0.26, baryons 0.05), Ω_{r} ≈ 10^{-4}.
H: Eras
- Radiation-dominated (first ~50 000 years): a ∝ t^{1/2}.
- Matter-dominated: a ∝ t^{2/3}.
- Dark energy-dominated (since ~5 billion years ago): exponential a ∝ e^{Ht}.
H: Age of the universe
P: Integrating the Friedmann equations with measured parameters gives an age of 13.8 billion years. The Hubble tension: early-universe (CMB) estimates give H_{0} ≈ 67 km s^{-1} Mpc^{-1}, while local distance-ladder measurements give ~73. Whether this signals new physics is a major open question.
X: Critical density for H_{0} = 70 km s^{-1} Mpc^{-1} (2.27 × 10^{-18} s^{-1})?
> ρ_{c} = 3(2.27 × 10^{-18})^{2}/(8π × 6.67 × 10^{-11}) = 9.2 × 10^{-27} kg m^{-3}
!: The Hubble "constant" changes over time; H_{0} is its value today.
Q: How does radiation energy density scale with the scale factor? | As a^{−4} (dilution plus redshift).
Q: What is the Hubble tension? | Disagreement between early-universe and local measurements of the Hubble constant.
M1: Today the largest component of the universe's energy is: | Dark energy | Dark matter | Ordinary matter | Radiation | ~69%.
M2: In the matter-dominated era, a grows as: | t^{2/3} | t^{1/2} | e^{Ht} | t | Friedmann solution.

## Tests of general relativity
S: General relativity has passed every experimental test for over a century, from the solar system to merging black holes. Physicists keep testing it because any deviation would point to quantum gravity, dark energy or new fields.
H: Classic tests
- Mercury's perihelion precession (1915).
- Light deflection (1919; now 10^{-4} with VLBI).
- Gravitational redshift (Pound–Rebka 1959; Gravity Probe A 1976).
- Shapiro delay (Cassini 2003: 2 × 10^{-5}).
H: Modern tests
- Lunar laser ranging: strong equivalence principle, G constant over time.
- Gravity Probe B (2011): geodetic effect and frame dragging.
- Binary pulsars: gravitational-wave emission, strong-field dynamics.
- Gravitational waves: speed of gravity, waveform consistency, ringdown spectroscopy, area theorem.
- EHT shadow sizes; stars orbiting Sgr A*.
- MICROSCOPE: equivalence principle to 10^{-15}.
H: Parametrised post-Newtonian framework
P: PPN parameters quantify deviations: γ (space curvature per unit mass) and β (nonlinearity) are both 1 in GR. Cassini gives |γ − 1| < 2.3 × 10^{-5}. Alternative theories (scalar–tensor, massive gravity) must reproduce these bounds while perhaps explaining dark energy.
X: Why are binary pulsars such good laboratories?
> They're precise clocks moving at ~10^{-3}c in strong fields
> Several relativistic effects measured independently over-determine the masses, testing GR consistency
!: Passing tests doesn't prove GR final; it constrains how any new theory must agree with it in tested regimes.
Q: Name three classic tests of general relativity. | Mercury's perihelion precession, light deflection and gravitational redshift.
Q: What did Gravity Probe B measure? | The geodetic effect and frame dragging around Earth.
M1: In GR, the PPN parameter γ equals: | 1 | 0 | 2 | ½ | Space curvature.
M2: Lunar laser ranging uses: | Retroreflectors left by Apollo | Radio telescopes | Gravitational waves | Satellites only | Measures Earth–Moon distance to mm.

## Numerical relativity
S: Numerical relativity solves Einstein's equations on supercomputers when no exact solution exists, most famously for merging black holes and neutron stars. Its waveforms made gravitational-wave detection and interpretation possible.
H: The challenge
- Einstein's equations are 10 coupled nonlinear PDEs with constraints.
- Must handle singularities, horizons and coordinate freedom.
- Decades of instabilities before success.
H: The breakthrough (2005)
- Pretorius, and independently the "moving puncture" groups (Campanelli et al., Baker et al.), first simulated binary black hole mergers through to ringdown.
- Formulations: BSSN, generalised harmonic coordinates.
- Excision or punctures deal with singularities.
H: Uses
P: Numerical waveforms calibrate analytic models (effective one-body, phenomenological templates) used to search LIGO data. Simulations of neutron-star mergers include magnetohydrodynamics, neutrino transport and nuclear physics, predicting kilonova light and r-process yields. They also model supernova collapse and black hole kicks: merger remnants can recoil at thousands of km s^{-1}.
X: Why can't LIGO searches simply use numerical waveforms for every possible binary?
> Each simulation takes weeks on supercomputers
> Instead, a few hundred simulations calibrate fast approximate models covering the full parameter space
!: Numerical relativity is exact GR within numerical accuracy; approximate waveform models are fitted to it, not the other way round.
Q: What was achieved in 2005 in numerical relativity? | The first stable simulations of binary black hole mergers.
Q: How do numerical simulations help gravitational-wave astronomy? | They provide accurate merger waveforms for searching and interpreting data.
M1: Merging black holes can give the remnant a recoil "kick" of up to: | Thousands of km s^{-1} | 1 m s^{-1} | The speed of light | Zero always | Asymmetric emission.
M2: Neutron-star merger simulations must include: | Magnetohydrodynamics and nuclear physics | Only vacuum GR | Quantum gravity | Nothing beyond Newton | Matter physics.

## Quantum gravity challenges
S: Quantum mechanics and general relativity are both spectacularly successful but don't fit together. A quantum theory of gravity is needed to understand black hole interiors, the Big Bang and the nature of spacetime, but none is yet established.
H: Why it's hard
- GR treated as a quantum field theory is non-renormalisable: infinities can't be absorbed at high energies.
- Quantum effects become important only near the Planck scale (10^{19} GeV, 10^{-35} m): far beyond experiments.
- In GR, spacetime is dynamical; in quantum theory, time is a fixed background: they treat time differently ("problem of time").
H: Black hole puzzles
- **Hawking radiation**: black holes emit thermal radiation, T = ħc^{3}/(8πGMk_{B}) (~60 nK for a solar-mass hole), and slowly evaporate.
- **Information paradox**: does evaporation destroy information, violating quantum unitarity? Recent work (Page curve, islands) suggests information escapes.
- Black hole entropy S = A/(4l_{P}^{2}): counting microstates is a key test for theories.
H: Approaches
P: String theory (gravitons as string vibrations; holography: AdS/CFT relates gravity in a volume to quantum field theory on its boundary), loop quantum gravity (quantised geometry), causal sets, asymptotic safety, emergent gravity. Experiments seek indirect signs: gravitationally induced entanglement of masses, Planck-scale effects on light from gamma-ray bursts, primordial gravitational waves in the CMB.
X: Hawking temperature of a black hole with the Moon's mass (7 × 10^{22} kg)?
> T = ħc^{3}/(8πGMk_{B}) = 1.2 × 10^{23}/M K ≈ 1.7 K
> Slightly hotter than the CMB: it would just be evaporating
!: Quantum gravity isn't needed for everyday gravitational physics; it matters at extreme curvatures and energies.
Q: What is Hawking radiation? | Thermal radiation emitted by black holes due to quantum effects near the horizon.
Q: What is the black hole information paradox? | Whether information falling into a black hole is lost when it evaporates, conflicting with quantum unitarity.
M1: The Planck length is about: | 10^{-35} m | 10^{-15} m | 10^{-10} m | 10^{-20} m | √(ħG/c^{3}).
M2: AdS/CFT is an example of: | Holography relating gravity to quantum field theory | A particle collider | A gravitational-wave detector | Classical GR | String theory duality.
`;
