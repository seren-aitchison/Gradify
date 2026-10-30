// Unit 30: Astrophysics. Format: kit/course/notes.js
export default `
## Celestial mechanics
S: Celestial mechanics applies gravity and the laws of motion to planets, moons, stars and spacecraft. From Kepler's laws to modern N-body simulations, it predicts eclipses, guides missions and discovers unseen worlds.
H: Foundations
- Kepler's laws (elliptical orbits, equal areas, T^{2} ∝ a^{3}).
- Newton's law of gravitation: F = GMm/r^{2}.
- Two-body problem solvable exactly; three or more generally not (chaos possible).
H: Methods
- Orbital elements: a, e, i, Ω, ω, mean anomaly.
- Perturbation theory for small effects (other planets, oblateness).
- Numerical integration (symplectic integrators) for long-term evolution.
H: Results
- Predicted Neptune (1846) from Uranus's perturbations.
- Resonances: Kirkwood gaps; Pluto's 3:2 resonance with Neptune; the Laplace resonance of Io, Europa and Ganymede.
- Long-term chaos: the inner Solar System is chaotic over ~5 million years (Lyapunov time); Mercury has a ~1% chance of instability in 5 billion years.
- Milankovitch cycles: orbital variations drive ice ages.
X: Period of a moon orbiting a planet of mass 2 × 10^{27} kg at 4 × 10^{8} m?
> T = 2π√(a^{3}/(GM)) = 2π√(6.4 × 10^{25}/1.33 × 10^{17}) = 2π × 2.2 × 10^{4} s ≈ 1.6 days
!: Planets don't orbit the Sun's centre exactly; they orbit the Solar System's centre of mass, which is sometimes outside the Sun.
Q: What are orbital elements? | Six numbers describing an orbit's size, shape, orientation and position.
Q: What causes the Kirkwood gaps? | Orbital resonances with Jupiter clearing those regions of the asteroid belt.
M1: Pluto and Neptune are in a: | 3:2 resonance | 1:1 resonance | 2:1 resonance | No resonance | Pluto orbits twice per three Neptune orbits.
M2: Milankovitch cycles are variations in Earth's: | Orbit and tilt, affecting climate | Rotation speed only | Magnetic field | Core temperature | Ice ages.

## Stellar structure and evolution
S: Stars are balls of plasma held up by pressure against gravity, powered by nuclear fusion in their cores. Their mass decides how bright they shine, how long they live, and whether they end as white dwarfs, neutron stars or black holes.
H: Equations of stellar structure
- Hydrostatic equilibrium: dP/dr = −Gmρ/r^{2}.
- Mass continuity: dm/dr = 4πr^{2}ρ.
- Energy generation: dL/dr = 4πr^{2}ρε.
- Energy transport by radiation or convection.
- Plus an equation of state and opacity.
H: Life cycles by mass
- **< 0.5 M_{⊙}**: red dwarfs; burn for trillions of years; end as helium white dwarfs.
- **~1 M_{⊙}**: main sequence ~10 billion years → red giant → helium flash → horizontal branch → asymptotic giant branch → planetary nebula + carbon–oxygen white dwarf.
- **> 8 M_{⊙}**: burn through C, Ne, O, Si to iron; core collapse supernova → neutron star or black hole.
H: Scaling
E: L ∝ M^{3.5} (roughly, on the main sequence); lifetime ∝ M/L ∝ M^{−2.5}
P: A 10 M_{⊙} star is ~3000 times more luminous than the Sun and lives only ~20–30 million years. The most massive stars burn out in a few million years.
X: Main-sequence lifetime of a 2 M_{⊙} star (Sun: 10^{10} years)?
> t ∝ M^{−2.5}: 10^{10} × 2^{−2.5} ≈ 1.8 × 10^{9} years
!: More fuel doesn't mean a longer life: massive stars burn their fuel disproportionately fast.
Q: What decides a star's fate? | Mainly its initial mass.
Q: How does main-sequence lifetime scale with mass? | Roughly as M^{−2.5}.
M1: The Sun will end as a: | White dwarf | Neutron star | Black hole | Supernova remnant only | Low mass.
M2: Stars above about 8 M_{⊙} end in: | Core-collapse supernovae | Planetary nebulae only | Nothing | Brown dwarfs | Massive star fate.

## Star formation
S: Stars form when cold, dense regions of molecular clouds collapse under their own gravity. Rotation flattens infalling gas into discs, where planets can form, while the central protostar heats up until fusion begins.
H: Collapse
E: M_{J} ∝ T^{3/2}ρ^{−1/2} :: Jeans mass: minimum mass for collapse
- Cold (10–20 K), dense cores of giant molecular clouds.
- Triggers: turbulence, shock waves from supernovae, spiral arms, cloud collisions.
- Magnetic fields and turbulence resist collapse; ambipolar diffusion lets it proceed.
H: Stages
- Prestellar core → protostar (Class 0/I) embedded in an envelope.
- Accretion disc and bipolar outflows/jets (Herbig–Haro objects).
- T Tauri stars (Class II): disc visible; pre-main-sequence contraction.
- Hydrogen fusion ignites: zero-age main sequence. Sun-like stars take ~50 million years.
H: Outcomes
P: Stars form in clusters; the initial mass function makes many more low-mass stars than high-mass ones (Salpeter: dN/dM ∝ M^{−2.35}). Objects below ~0.08 M_{⊙} never sustain hydrogen fusion: brown dwarfs. JWST and ALMA image discs with gaps carved by forming planets.
X: Why do protostellar discs form?
> Infalling gas conserves angular momentum
> It spins up and flattens, unable to fall directly onto the star
!: Star formation is inefficient: only a few per cent of a molecular cloud's mass becomes stars.
Q: What is the Jeans mass? | The minimum mass a cloud needs for gravity to overcome thermal pressure and collapse.
Q: What is a brown dwarf? | An object too low in mass (< 0.08 M_{⊙}) to sustain hydrogen fusion.
M1: Stars form in: | Cold, dense molecular clouds | Hot ionised gas | Black holes | Planetary nebulae | 10–20 K.
M2: Bipolar outflows from protostars are driven by: | Accretion discs and magnetic fields | Supernovae | Fusion | Planets | Jets.

## Hydrostatic equilibrium in stars
S: A stable star balances the inward pull of gravity with the outward push of pressure at every depth. This balance sets the central pressure and temperature and keeps stars stable for billions of years.
H: The equation
E: dP/dr = −Gm(r)ρ(r)/r^{2}
E: P_{c} ~ GM^{2}/R^{4} :: order-of-magnitude central pressure
- Sun: P_{c} ≈ 2.5 × 10^{16} Pa; T_{c} ≈ 1.5 × 10^{7} K.
H: Virial theorem
E: 2K + U = 0 :: K = thermal energy, U = gravitational energy
E: k_{B}T ~ GMm_{p}/R :: typical core temperature
P: The virial theorem gives stars a "negative heat capacity": losing energy makes them contract and heat up. This self-regulates fusion: if burning speeds up, the star expands and cools, slowing it. Contraction also heats cores to ignite new fuels as old ones run out.
H: Pressure sources
- Ideal gas pressure (most stars).
- Radiation pressure (important in massive stars; Eddington limit).
- Electron degeneracy pressure (white dwarfs); neutron degeneracy (neutron stars).
X: Estimate the Sun's central temperature from the virial theorem.
> k_{B}T ~ GMm_{p}/R = 6.67 × 10^{-11} × 2 × 10^{30} × 1.67 × 10^{-27}/7 × 10^{8}
> ≈ 3 × 10^{-16} J ⇒ T ~ 2 × 10^{7} K (actual 1.5 × 10^{7} K)
!: Losing energy makes stars hotter, not cooler: a consequence of gravity's negative heat capacity.
Q: What balances gravity in a main-sequence star? | The gas (and radiation) pressure gradient.
Q: Why do stars have negative heat capacity? | Losing energy makes them contract, converting gravitational energy so their temperature rises.
M1: The Sun's central temperature is about: | 15 million K | 5800 K | 1 million K | 1 billion K | Core.
M2: The virial theorem relates: | Thermal and gravitational energies | Mass and luminosity | Temperature and colour | Rotation and magnetism | 2K + U = 0.

## Nuclear fusion in stars
S: Stars shine by fusing light nuclei into heavier ones in their cores. Hydrogen fusion powers the main sequence; later stages fuse helium, carbon and beyond, forging the elements up to iron.
H: Hydrogen burning
- **pp chain** (Sun, ~99%): 4 ¹H → ⁴He + 2e^{+} + 2ν_{e} + 26.7 MeV; rate ∝ T^{4}.
- **CNO cycle** (stars > 1.3 M_{⊙}): carbon, nitrogen and oxygen catalyse the same net reaction; rate ∝ T^{16–20}.
- Slow first step (p + p → d + e^{+} + ν, a weak interaction): the Sun's average proton waits billions of years.
H: Later stages (massive stars)
- Helium: triple-alpha (3 ⁴He → ¹²C) at ~10^{8} K; ¹²C + ⁴He → ¹⁶O.
- Carbon (~6 × 10^{8} K), neon, oxygen, silicon (~3 × 10^{9} K).
- Each stage shorter: hydrogen millions of years, silicon about a day.
- Iron-group elements: fusion stops releasing energy.
H: Evidence
P: Solar neutrinos (Homestake, Super-K, SNO, Borexino) confirm the pp chain and CNO cycle in the Sun; Borexino detected CNO neutrinos in 2020. Helioseismology measures the Sun's interior structure and matches the standard solar model.
X: Hydrogen mass converted per second in the Sun (L = 3.8 × 10^{26} W, 0.7% mass converted)?
> Mass to energy: L/c^{2} = 4.2 × 10^{9} kg s^{-1}
> Hydrogen fused: 4.2 × 10^{9}/0.007 ≈ 6 × 10^{11} kg s^{-1} (600 million tonnes)
!: The Sun's core power density is low (~280 W m^{-3}); its enormous output comes from its enormous volume.
Q: What are the two main hydrogen-burning processes? | The proton–proton chain and the CNO cycle.
Q: Why do massive stars use the CNO cycle? | Their hotter cores make the strongly temperature-dependent CNO cycle dominant.
M1: Fusion in stars stops releasing energy at: | Iron | Helium | Carbon | Uranium | Binding energy peak.
M2: The Sun's first fusion step is slow because it involves: | The weak interaction | Gravity | The strong force only | Photons | p + p → d.

## Stellar spectra and classification
S: A star's spectrum reveals its temperature, composition, surface gravity, motion and magnetic field. Stars are classified by spectral type, from hot O stars to cool M stars, and by luminosity class.
H: Spectral sequence
- O (> 30 000 K, blue), B, A (~10 000 K, white, strong hydrogen lines), F, G (Sun, 5800 K), K, M (< 3500 K, red, molecular bands).
- Subclasses 0–9 (G2 for the Sun); L, T, Y for brown dwarfs.
- Mnemonic: "Oh Be A Fine Girl/Guy, Kiss Me".
H: Why the sequence works
P: Cecilia Payne-Gaposchkin (1925) used the Saha equation to show that spectral differences come mainly from temperature, not composition: stars are mostly hydrogen and helium. Hydrogen Balmer lines peak in A stars (~10 000 K), where enough atoms are in n = 2 but not too many are ionised.
H: Luminosity classes
- I (supergiants), II, III (giants), IV, V (main sequence: the Sun is G2 V).
- Larger stars have lower surface gravity and narrower lines.
H: More information
- Doppler shifts: radial velocity, binaries, exoplanets.
- Line broadening: rotation, pressure.
- Zeeman splitting: magnetic fields.
X: Why do M stars show molecular bands (TiO) but O stars don't?
> M stars are cool enough (< 3500 K) for molecules to survive
> In O stars, molecules dissociate and atoms are highly ionised
!: Spectral class tracks temperature, not mass directly: giants and dwarfs can share a spectral type.
Q: What is the order of spectral types? | O, B, A, F, G, K, M (hottest to coolest).
Q: What did Payne-Gaposchkin discover? | Stars are mostly hydrogen and helium; spectral differences reflect temperature.
M1: The Sun's spectral type is: | G2 V | M5 V | O5 I | A0 V | Yellow dwarf.
M2: Hydrogen Balmer lines are strongest in: | A stars | M stars | O stars | Brown dwarfs | ~10 000 K.

## Main-sequence stars
S: Main-sequence stars fuse hydrogen into helium in their cores. They spend about 90% of their lives here, and their position on the Hertzsprung–Russell diagram depends almost entirely on their mass.
H: The HR diagram
- Luminosity against temperature (hotter on the left).
- Main sequence: diagonal band from hot, bright O stars to cool, dim M dwarfs.
- Giants and supergiants above; white dwarfs below.
H: Mass relations
E: L ∝ M^{3.5}; R ∝ M^{0.8} (roughly)
- Mass range: ~0.08 to ~150 M_{⊙}.
- Low-mass stars: fully convective; burn slowly (red dwarfs live > 10^{12} years).
- High-mass stars: convective cores, radiative envelopes; strong winds.
H: The Sun on the main sequence
P: The Sun has been on the main sequence for 4.6 billion years and will stay ~5 billion more. It's slowly brightening (~1% per 100 million years): in about a billion years, Earth will become too hot for liquid oceans. Most stars in the galaxy are red dwarfs, too faint to see with the naked eye.
X: Luminosity of a 0.5 M_{⊙} star?
> L ≈ 0.5^{3.5} ≈ 0.09 L_{⊙}
!: The main sequence isn't an evolutionary path; stars stay at nearly one point on it while burning hydrogen.
Q: What defines a main-sequence star? | Core hydrogen fusion into helium.
Q: What determines a star's position on the main sequence? | Mainly its mass.
M1: The most common stars in the Milky Way are: | Red dwarfs | Blue giants | Sun-like stars | White dwarfs | M dwarfs.
M2: The HR diagram plots: | Luminosity against temperature | Mass against radius | Age against distance | Colour against mass | Hertzsprung–Russell.

## Red giants and supergiants
S: When a star exhausts hydrogen in its core, the core contracts and heats while the outer layers swell enormously and cool. It becomes a red giant, or for massive stars a supergiant, hundreds to a thousand times larger than the Sun.
H: Red giants (low and intermediate mass)
- Hydrogen burns in a shell around a contracting helium core.
- Envelope expands to ~10–100 R_{⊙}; surface ~4000 K.
- Helium flash (in stars ≲ 2 M_{⊙}): degenerate core ignites helium explosively.
- Horizontal branch: helium core burning.
- Asymptotic giant branch: helium and hydrogen shells; strong winds; s-process element production; thermal pulses.
H: Supergiants (massive stars)
- Red supergiants: Betelgeuse (~760 R_{⊙}), Antares; blue supergiants: Rigel.
- Successive burning stages in onion-like shells.
- Strong mass loss; end in core-collapse supernovae.
H: The Sun's future
P: In ~5 billion years the Sun will become a red giant ~200 times its current radius, probably engulfing Mercury and Venus; Earth's fate is uncertain. It will shed its envelope as a planetary nebula and leave a white dwarf of ~0.55 M_{⊙}.
X: Why do red giants have cool surfaces despite high luminosity?
> L = 4πR^{2}σT^{4}: a huge R means lower T for the same L
> Betelgeuse: L ~ 10^{5} L_{⊙} at only ~3500 K
!: Red giants aren't hotter inside because they're bigger; their cores contract and heat, while envelopes expand and cool.
Q: Why does a star become a red giant? | Core hydrogen runs out; shell burning makes the envelope expand and cool.
Q: What is the helium flash? | Explosive ignition of helium in a degenerate core of a low-mass red giant.
M1: Betelgeuse is a: | Red supergiant | White dwarf | Main-sequence star | Neutron star | Orion.
M2: AGB stars are important for producing: | s-process elements | Iron | Hydrogen | Uranium only | Slow neutron capture.

## White dwarfs
S: A white dwarf is the hot, dense core left behind when a low- or medium-mass star dies. About the size of Earth but with roughly the Sun's mass, it's held up by electron degeneracy pressure and slowly cools for billions of years.
H: Properties
- Mass ~0.6 M_{⊙} typical; radius ~7000 km; density ~10^{9} kg m^{-3}.
- Composition: carbon–oxygen (most), helium, or oxygen–neon–magnesium.
- No fusion; shines from stored heat.
- Mass–radius relation: heavier white dwarfs are smaller.
- Chandrasekhar limit: ~1.4 M_{⊙}.
H: Cooling
P: White dwarfs cool over billions of years, from ~100 000 K to dim and red. The oldest are still a few thousand kelvin, so their cooling sequence dates the galaxy's oldest stars (~11–13 billion years). Cooling white dwarfs crystallise from the centre, releasing latent heat (confirmed by Gaia, 2019). Eventually they'd become cold black dwarfs, but the universe isn't old enough for any yet.
H: White dwarfs in binaries
- Accreting white dwarfs produce novae (surface hydrogen explosions).
- Approaching the Chandrasekhar limit → type Ia supernovae (standard candles).
- Double white dwarf binaries will be strong LISA gravitational-wave sources.
X: Surface gravity of a 0.6 M_{⊙}, 8700 km white dwarf?
> g = GM/R^{2} = 6.67 × 10^{-11} × 1.2 × 10^{30}/(8.7 × 10^{6})^{2} ≈ 10^{6} m s^{-2}: ~100 000 g
!: White dwarfs don't contract as they cool; degeneracy pressure doesn't depend on temperature.
Q: What supports a white dwarf? | Electron degeneracy pressure.
Q: Why are white dwarfs useful for dating the galaxy? | Their predictable cooling ages the oldest stellar populations.
M1: A typical white dwarf is about the size of: | Earth | The Sun | Jupiter | A city | ~7000 km.
M2: Type Ia supernovae come from: | White dwarfs exceeding (or near) the Chandrasekhar limit | Massive star collapse | Neutron star mergers only | Planets | Thermonuclear.

## Neutron stars
S: A neutron star is the collapsed core of a massive star: about 1.4–2 solar masses packed into a sphere ~20–25 km across. Supported by neutron degeneracy and nuclear forces, it's the densest matter known outside black holes.
H: Properties
- Density ~10^{17}–10^{18} kg m^{-3}: a teaspoon would weigh ~a billion tonnes.
- Surface gravity ~10^{11}–10^{12} g; escape speed ~0.5c.
- Magnetic fields 10^{4}–10^{11} T (magnetars the strongest).
- Rotation: up to ~700 times per second.
- Maximum mass ~2.2–2.3 M_{⊙} (heaviest measured ~2.1–2.35 M_{⊙}).
H: Structure
- Iron crust; inner crust with neutron-rich nuclei and free neutrons ("nuclear pasta").
- Core of neutrons, protons and electrons, possibly hyperons or quark matter.
- Superfluid neutrons and superconducting protons; glitches in rotation from superfluid vortices.
H: Probing dense matter
P: NICER X-ray timing measures neutron star radii and masses; gravitational waves from mergers measure tidal deformability. Together they constrain the equation of state of matter at densities beyond atomic nuclei, a regime no lab can reach.
X: Rotation speed at the equator of a 12 km neutron star spinning 700 times per second?
> v = 2π × 12 000 × 700 ≈ 5.3 × 10^{7} m s^{-1} ≈ 0.18c
!: Neutron stars aren't just giant nuclei of neutrons; they have crusts, superfluids and possibly exotic cores.
Q: What supports a neutron star? | Neutron degeneracy pressure and repulsive nuclear forces.
Q: What is a magnetar? | A neutron star with an extremely strong magnetic field (~10^{10}–10^{11} T).
M1: A neutron star's radius is about: | 12 km | 1000 km | 1 km | 7000 km | Tiny.
M2: The maximum neutron star mass is about: | 2–2.3 solar masses | 1.4 | 10 | 0.5 | TOV limit.

## Pulsars
S: Pulsars are rotating neutron stars that sweep beams of radiation across Earth like a lighthouse, producing extremely regular pulses. They're precise cosmic clocks used to test gravity and detect gravitational waves.
H: Discovery
- Jocelyn Bell Burnell and Antony Hewish (1967): regular radio pulses every 1.337 s, nicknamed "LGM-1".
- Explained as rotating magnetised neutron stars.
H: Properties
- Periods from ~1.4 ms to ~20 s.
- Beams along the magnetic axis, misaligned with the rotation axis.
- Spin down as rotational energy powers radiation and winds: dP/dt ~ 10^{-15} s s^{-1}.
- Characteristic age τ = P/(2dP/dt); field B ∝ √(PdP/dt).
H: Millisecond pulsars
P: Old pulsars spun up by accreting matter from a companion ("recycled") rotate hundreds of times a second with stability rivalling atomic clocks. Pulsar timing arrays monitor dozens of them to detect nanohertz gravitational waves; in 2023 they reported evidence for a background, likely from supermassive black hole binaries.
H: Uses
- Binary pulsars test general relativity (Hulse–Taylor; double pulsar).
- First exoplanets (1992) found around a pulsar (PSR B1257+12).
- Dispersion measures map interstellar electrons.
X: Characteristic age of the Crab pulsar (P = 0.033 s, dP/dt = 4.2 × 10^{-13})?
> τ = 0.033/(2 × 4.2 × 10^{-13}) ≈ 3.9 × 10^{10} s ≈ 1240 years (supernova seen in 1054: ~970 years ago)
!: Pulsars don't pulse; they rotate, and we see a pulse when the beam sweeps past Earth.
Q: Who discovered pulsars? | Jocelyn Bell Burnell (with Antony Hewish), 1967.
Q: What are millisecond pulsars? | Old pulsars spun up by accretion from a companion, rotating hundreds of times per second.
M1: The first exoplanets were found around: | A pulsar | The Sun | A white dwarf | A red giant | 1992.
M2: Pulsar timing arrays search for: | Nanohertz gravitational waves | Dark matter only | Neutrinos | Exoplanet atmospheres | Supermassive BH binaries.

## Black holes
S: Black holes are regions where gravity is so strong that nothing escapes. Astronomers find them as stellar remnants in binaries, as giants at the centres of galaxies, and through gravitational waves when they merge.
H: Types
- **Stellar** (~5–100 M_{⊙}): from massive star collapse; ~20 known in X-ray binaries in the Milky Way, more from Gaia astrometry (Gaia BH1–3).
- **Intermediate** (10^{2}–10^{5} M_{⊙}): rare; some candidates in clusters and dwarf galaxies.
- **Supermassive** (10^{6}–10^{10} M_{⊙}): in most large galaxies; Sgr A* 4.3 × 10^{6} M_{⊙}; M87* 6.5 × 10^{9} M_{⊙}.
H: Observing them
- X-ray binaries: hot accretion discs.
- Stellar orbits (S2 around Sgr A*).
- Event Horizon Telescope shadows.
- Gravitational waves from mergers.
- Tidal disruption events: stars torn apart.
H: Supermassive black hole growth
P: JWST finds supermassive black holes already present less than a billion years after the Big Bang, challenging models of how they grew so fast. Their masses correlate with host galaxies' bulges (M–σ relation): black holes and galaxies co-evolve, with feedback from active nuclei regulating star formation.
X: Shadow size of M87* (r_{s} ≈ 1.9 × 10^{13} m, distance 1.7 × 10^{23} m)?
> Shadow diameter ≈ 5.2r_{s} = 9.9 × 10^{13} m
> Angle ≈ 5.8 × 10^{-10} rad ≈ 40 μas (observed ~42)
!: Most black holes are found indirectly; we see their effects on matter and light around them.
Q: How are stellar black holes detected? | In X-ray binaries, via gravitational waves, and from companions' orbits.
Q: What is the M–σ relation? | Correlation between supermassive black hole mass and host galaxy bulge velocity dispersion.
M1: The EHT imaged black holes using: | Very-long-baseline radio interferometry | Optical telescopes | X-rays only | Neutrinos | Earth-sized virtual telescope.
M2: A tidal disruption event is: | A star torn apart by a black hole | A supernova | A merger | A pulsar glitch | Spaghettification.

## Supernovae
S: Supernovae are stellar explosions briefly outshining entire galaxies. They come from collapsing massive stars or exploding white dwarfs, scatter heavy elements, trigger star formation, and serve as cosmic distance markers.
H: Core-collapse (types II, Ib, Ic)
- Iron core of a massive star exceeds ~1.4 M_{⊙} and collapses in < 1 s.
- Core bounces at nuclear density; shock stalls, revived by neutrino heating (99% of energy, ~10^{46} J, emerges as neutrinos).
- Leaves a neutron star or black hole.
- SN 1987A: neutrinos detected hours before the light (Kamiokande, IMB).
H: Thermonuclear (type Ia)
- White dwarf in a binary approaches the Chandrasekhar mass (or white dwarf mergers).
- Carbon fusion runs away and destroys the star; no remnant.
- Nickel-56 decay (to cobalt, then iron) powers the light curve.
- Peak luminosity standardisable (Phillips relation): distance indicators that revealed accelerating expansion (Nobel 2011).
H: Impact
P: Supernovae produce and spread oxygen, silicon, iron and much else; their shocks accelerate cosmic rays and compress clouds into new stars. A supernova within ~30 light-years could damage Earth's ozone layer. The last naked-eye galactic supernova was Kepler's in 1604; one is expected every few decades, often hidden by dust.
X: Energy released in a core-collapse supernova, from gravitational binding of a 1.4 M_{⊙}, 12 km neutron star?
> E ~ GM^{2}/R = 6.67 × 10^{-11} × (2.8 × 10^{30})^{2}/1.2 × 10^{4} ≈ 4 × 10^{46} J
> Mostly carried off by neutrinos
!: Only ~1% of a core-collapse supernova's energy goes into the explosion and light; neutrinos carry nearly all of it.
Q: What powers a type Ia supernova's light? | Radioactive decay of nickel-56 to cobalt-56 and iron-56.
Q: How were neutrinos from SN 1987A detected? | By underground detectors (Kamiokande, IMB) hours before the light was seen.
M1: Type Ia supernovae are standard candles because: | Their peak luminosity can be calibrated | They're all at the same distance | They're dim | They have no spectra | Phillips relation.
M2: Most of a core-collapse supernova's energy escapes as: | Neutrinos | Light | Gravitational waves | Kinetic energy | 99%.

## Neutron star mergers
S: When two neutron stars spiral together and merge, they emit gravitational waves, a gamma-ray burst and a glowing kilonova rich in heavy elements. The 2017 event GW170817 was seen in both gravitational waves and light, launching multi-messenger astronomy.
H: GW170817
- Gravitational waves detected by LIGO and Virgo (August 2017), ~40 Mpc away.
- Short gamma-ray burst 1.7 s later (Fermi, INTEGRAL).
- Optical/infrared kilonova located in galaxy NGC 4993.
- X-ray and radio afterglow from a relativistic jet.
H: What it revealed
- Gravitational waves travel at c (to 10^{-15}).
- Short gamma-ray bursts come from neutron-star mergers.
- Kilonovae produce r-process elements: gold, platinum, lanthanides (several Earth masses of gold).
- Independent Hubble constant measurement (standard siren): ~70 km s^{-1} Mpc^{-1}.
- Constraints on neutron-star radius (~11–13 km) and the dense-matter equation of state.
H: Outcomes
P: The merger remnant may be a short-lived massive neutron star collapsing to a black hole. Mergers of neutron stars with black holes have also been detected (2020 onwards) in gravitational waves, though without confirmed light.
X: Why is a kilonova red and slow to fade?
> Lanthanide-rich ejecta have very high opacity
> Light diffuses out slowly and at longer wavelengths
!: Not every neutron-star merger will be seen in light; it depends on viewing angle, distance and the remnant.
Q: What was special about GW170817? | First event seen in both gravitational waves and electromagnetic radiation, a neutron-star merger.
Q: What is a kilonova? | A transient powered by radioactive decay of r-process elements made in a neutron-star merger.
M1: GW170817 confirmed short gamma-ray bursts come from: | Neutron-star mergers | Supernovae | Pulsars | White dwarfs | 1.7 s delay.
M2: Kilonovae produce: | Heavy r-process elements like gold | Only helium | Hydrogen | Iron only | Rapid neutron capture.

## Binary star systems
S: Most stars are in binary or multiple systems. Binaries are essential for measuring stellar masses, and when stars interact by transferring mass, they produce novae, supernovae, X-ray sources and gravitational-wave sources.
H: Types
- **Visual**: resolved; orbits give masses directly.
- **Spectroscopic**: Doppler shifts of lines.
- **Eclipsing**: dips in brightness give radii and inclination (Algol).
- **Astrometric**: wobble of a visible star (Gaia).
H: Interacting binaries
- **Roche lobes**: teardrop regions; overflowing star transfers mass through L1.
- Cataclysmic variables and novae: white dwarf accreting from a companion.
- X-ray binaries: neutron star or black hole accretors.
- Common envelope phases shrink orbits dramatically, creating close compact binaries.
- Blue stragglers: stars rejuvenated by mass transfer or mergers.
H: Algol paradox
P: In Algol, the less massive star is more evolved (a subgiant), contrary to expectations that massive stars evolve faster. Resolution: the originally more massive star evolved first and transferred much of its mass to its companion. Binary evolution reshapes stellar fates.
X: Total mass of a binary with period 10 years and separation 5 AU?
> M = a^{3}/T^{2} = 125/100 = 1.25 M_{⊙}
!: Binary stars orbit their common centre of mass, not each other's centre.
Q: Why are binaries important for stellar physics? | Their orbits give stellar masses directly.
Q: What is Roche lobe overflow? | Mass transfer when a star expands beyond its Roche lobe, spilling matter through L1 to its companion.
M1: Eclipsing binaries give: | Stellar radii and inclinations | Only colours | Temperatures only | Nothing | Light curves.
M2: The Algol paradox was solved by: | Mass transfer between the stars | New physics | Measurement errors | Dark matter | Binary evolution.

## Accretion discs
S: When gas falls towards a star or black hole with angular momentum, it forms a flattened, rotating accretion disc. Friction and turbulence heat the gas as it spirals inward, making accretion the most efficient power source in the universe after matter–antimatter annihilation.
H: Physics
- Angular momentum transported outward, mass inward.
- Turbulent viscosity from the magnetorotational instability.
- Temperature rises inward: T ∝ r^{−3/4} (thin disc).
E: L = ηṀc^{2} :: η ≈ 6% (non-rotating BH) to 42% (maximally spinning)
E: L_{Edd} ≈ 1.3 × 10^{31}(M/M_{⊙}) W :: Eddington luminosity
H: Where they occur
- Protoplanetary discs: planet formation.
- Cataclysmic variables, X-ray binaries (keV X-rays from inner discs).
- Active galactic nuclei and quasars.
- Tidal disruption events.
H: Phenomena
P: Discs launch jets along their rotation axes, show outbursts (dwarf novae) when instabilities change viscosity, and produce quasi-periodic oscillations. X-ray iron lines broadened by relativistic motion and gravitational redshift measure black hole spins.
X: Accretion luminosity onto a black hole at 10^{-8} M_{⊙} per year with η = 0.1?
> Ṁ = 2 × 10^{22} kg/3.15 × 10^{7} s = 6.3 × 10^{14} kg s^{-1}
> L = 0.1 × 6.3 × 10^{14} × 9 × 10^{16} ≈ 5.7 × 10^{30} W (~15 000 L_{⊙})
!: Accretion is far more efficient than fusion (0.7%): up to ~42% of rest-mass energy for spinning black holes.
Q: How efficient is accretion onto black holes? | Between about 6% and 42% of rest-mass energy.
Q: What transports angular momentum in accretion discs? | Turbulence from the magnetorotational instability.
M1: The Eddington luminosity is set by: | Radiation pressure balancing gravity | Fusion | Disc size | Rotation | L_{Edd} ∝ M.
M2: Accretion discs around stellar black holes glow mainly in: | X-rays | Radio | Infrared only | Ultraviolet only | Millions of K.

## Exoplanets
S: Exoplanets are planets orbiting other stars. Since the first confirmed discoveries in the 1990s, over 5000 have been found, revealing worlds unlike any in our Solar System and showing planets are common.
H: Detection methods
- **Transit**: dip in brightness as the planet crosses the star (Kepler, TESS); gives radius.
- **Radial velocity**: star's Doppler wobble; gives mass (Mayor and Queloz, 51 Peg b, 1995; Nobel 2019).
- **Direct imaging**: blocking starlight (coronagraphs).
- **Microlensing**: planets around distant stars.
- **Astrometry** (Gaia), **pulsar timing**.
H: Diversity
- Hot Jupiters (orbits of days).
- Super-Earths and mini-Neptunes: most common types, absent from our Solar System.
- Lava worlds, water worlds, puffy low-density planets.
- Circumbinary planets ("Tatooine").
- TRAPPIST-1: seven Earth-sized planets around a red dwarf.
H: Atmospheres
P: Transmission spectroscopy (starlight filtering through an atmosphere during transit) and emission spectra reveal water, CO_{2}, methane, sulfur dioxide and clouds. JWST measures atmospheres of Jupiter-sized to rocky planets. The search for biosignatures (gas combinations out of chemical equilibrium) is a key goal.
X: Transit depth of a Jupiter (R = 0.1 R_{⊙}) across a Sun-like star?
> Depth = (R_{p}/R_{*})^{2} = 1%
> Earth: (0.009)^{2} ≈ 0.008%
!: Transit surveys only see planets whose orbits are edge-on from our viewpoint; occurrence rates must correct for this geometric bias.
Q: How does the transit method find planets? | By detecting periodic dips in a star's brightness as a planet crosses it.
Q: What was the first exoplanet found around a Sun-like star? | 51 Pegasi b (1995), a hot Jupiter.
M1: The radial velocity method measures: | A planet's minimum mass | Its radius | Its temperature | Its atmosphere | Star wobble.
M2: The most common known planet types are: | Super-Earths and mini-Neptunes | Hot Jupiters | Earth twins | Gas giants like Saturn | Kepler statistics.

## Planetary systems
S: Planetary systems form from discs of gas and dust around young stars. Their architectures, from our Solar System to compact multi-planet systems, record how planets grow, migrate and interact.
H: Formation
- Dust grains stick and grow into pebbles and planetesimals (km-sized).
- Core accretion: rocky cores grow; beyond the snow line, cores of ~10 Earth masses capture gas: giant planets.
- Gravitational instability may form some giant planets directly.
- Discs disperse in a few million years, setting a deadline for gas giants.
H: Migration and dynamics
- Planets exchange angular momentum with discs and migrate (explaining hot Jupiters).
- Resonant chains (TRAPPIST-1, Kepler-223).
- The Nice model and Grand Tack: Jupiter and Saturn's migration may have shaped the Solar System, delivering water and causing the Late Heavy Bombardment.
H: Our Solar System
P: Four rocky planets, two gas giants, two ice giants, asteroid and Kuiper belts, Oort cloud. Compared with exoplanet systems, it's unusual in lacking super-Earths and having giant planets on wide orbits. ALMA images rings and gaps in young discs, likely carved by forming planets (HL Tauri).
X: Where is the snow line in the solar nebula, and why does it matter?
> ~2.7 AU, where water ice condenses (~150 K)
> More solid material beyond it lets giant planet cores form faster
!: Planetary systems aren't static; migration and instabilities can rearrange orbits long after formation.
Q: What is core accretion? | Formation of giant planets by building a solid core that then captures gas.
Q: What is the snow line? | The distance from a young star beyond which water ice can condense.
M1: Hot Jupiters probably reached small orbits by: | Migration | Forming there | Collisions only | Capture from other stars | Disc interactions.
M2: ALMA images of HL Tauri showed: | Rings and gaps in a protoplanetary disc | A black hole | A supernova | Exoplanet atmospheres | Planet formation.

## Interstellar medium
S: The interstellar medium (ISM) is the gas, dust, cosmic rays and magnetic fields between the stars. It's the reservoir from which stars form and into which they return enriched material, in a cycle that drives galactic evolution.
H: Phases
- **Molecular clouds**: 10–20 K, n > 10^{8} m^{-3}; star-forming.
- **Cold neutral medium**: ~100 K atomic hydrogen.
- **Warm neutral and ionised media**: ~8000 K.
- **Hot ionised medium**: ~10^{6} K from supernova bubbles; X-ray emitting.
- Roughly pressure balance between phases.
H: Composition
- ~70% hydrogen, ~28% helium, ~2% heavier elements by mass; ~1% of mass is dust.
- Over 280 molecules detected, including complex organics (glycine precursors, fullerenes C_{60}).
H: Observing the ISM
- 21 cm hydrogen line; CO rotational lines (molecular gas); Hα (ionised gas); dust extinction, reddening and infrared emission; X-rays (hot gas); Faraday rotation (magnetic fields); pulsar dispersion (electrons).
H: The galactic ecosystem
P: Stars form from cold clouds, return gas through winds and supernovae, and enrich it with metals. Supernova feedback heats and stirs the ISM, regulating star formation. The Sun sits in the Local Bubble, a hot cavity carved by supernovae over the past ~15 million years.
X: How many hydrogen atoms in a 1 cm^{3} sample of the warm ISM (n ≈ 0.3 cm^{-3})?
> About 0.3: on average less than one atom per cubic centimetre
!: The ISM is far emptier than the best laboratory vacuums in its diffuse phases, yet it holds enough mass to form future generations of stars.
Q: What are the main phases of the ISM? | Molecular, cold neutral, warm neutral and ionised, and hot ionised.
Q: How is atomic hydrogen in the ISM mapped? | With the 21 cm hyperfine line.
M1: The Sun sits within: | The Local Bubble | A molecular cloud | A globular cluster | The galactic halo | Supernova cavity.
M2: About what fraction of ISM mass is dust? | 1% | 50% | 10% | 0.0001% | Gas-to-dust ~100.

## Molecular clouds
S: Molecular clouds are cold, dense regions of the interstellar medium where hydrogen exists as molecules. Giant molecular clouds, up to millions of solar masses, are the birthplaces of stars and planets.
H: Properties
- Temperature 10–20 K; density 10^{8}–10^{12} m^{-3} (cores higher).
- Masses 10^{3}–10^{7} M_{⊙}; sizes tens of parsecs.
- H_{2} is hard to detect directly (no dipole); traced by CO and dust.
- Supported by turbulence and magnetic fields against collapse.
H: Chemistry
- Molecules form on dust grain surfaces and through ion–molecule reactions.
- Rich organic chemistry: methanol, formaldehyde, complex organics, prebiotic molecules.
- Dust shields molecules from UV.
H: Structure and evolution
P: Clouds are filamentary (Herschel images), with dense cores forming along filaments. Star formation efficiency is low (~1–5%); clouds are dispersed by young stars' radiation, winds and supernovae within ~10–30 million years. Famous examples: the Orion molecular cloud, Taurus, the Eagle Nebula's "Pillars of Creation".
X: Jeans mass in a cloud with T = 10 K, n = 10^{10} m^{-3}?
> M_{J} ≈ (5k_{B}T/(Gμm_{H}))^{3/2}(3/(4πρ))^{1/2}
> ≈ a few solar masses: such clumps can collapse into stars
!: Molecular clouds are mostly H_{2}, but we see them mainly through trace molecules like CO.
Q: Why is CO used to trace molecular clouds? | H_{2} has no dipole and is hard to detect; CO is abundant and emits bright rotational lines.
Q: What disperses molecular clouds? | Radiation, winds and supernovae from the stars they form.
M1: Molecular clouds have temperatures around: | 10–20 K | 10 000 K | 1 million K | 300 K | Cold.
M2: Herschel images show molecular clouds are: | Filamentary | Perfect spheres | Uniform | Empty | Filaments and cores.

## Cosmic dust
S: Cosmic dust is made of tiny solid grains of silicates, carbon and ices that make up about 1% of the interstellar medium's mass. Dust dims and reddens starlight, catalyses molecule formation and builds planets.
H: Properties
- Grain sizes ~1 nm–1 μm.
- Silicates, graphite, polycyclic aromatic hydrocarbons (PAHs), ice mantles in cold clouds.
- Made in winds of AGB stars and in supernovae; destroyed by shocks.
H: Effects on light
- **Extinction**: dimming, strongest at short wavelengths (blue light more).
- **Reddening**: colours shift red; corrected using colour excesses.
- **Polarisation**: aligned grains polarise starlight, mapping magnetic fields.
- **Thermal emission**: dust absorbs UV/visible and re-emits in the infrared (~20–100 K).
H: Roles
P: About half the starlight ever emitted has been absorbed and re-radiated by dust. Grains provide surfaces where H_{2} and organic molecules form. In protoplanetary discs, dust grows into pebbles and planetesimals. Infrared telescopes (Spitzer, Herschel, JWST) see through dust to star-forming regions and the galactic centre.
X: Why does the galactic centre need infrared or radio telescopes?
> Visible light is dimmed by ~30 magnitudes (10^{12} times) by dust
> Infrared extinction is much lower, letting telescopes see stars orbiting Sgr A*
!: Interstellar reddening isn't a Doppler redshift; spectral lines don't move, only the continuum colour changes.
Q: What is interstellar extinction? | Dimming of starlight by dust absorption and scattering, stronger at shorter wavelengths.
Q: How does dust reveal magnetic fields? | Aligned grains polarise starlight and their own emission.
M1: Interstellar dust makes stars look: | Redder and dimmer | Bluer | Brighter | Unchanged | Reddening.
M2: Dust re-emits absorbed starlight mainly in the: | Infrared | Ultraviolet | X-ray | Gamma ray | Cool grains.

## Nebulae
S: Nebulae are clouds of gas and dust in space, glowing, reflecting or blocking light. They mark where stars are born and how they die, and include some of astronomy's most famous images.
H: Types
- **Emission nebulae (H II regions)**: gas ionised by hot young stars, glowing red with Hα (Orion Nebula, Lagoon).
- **Reflection nebulae**: dust scattering starlight, blue (Pleiades).
- **Dark nebulae**: dense dust blocking background light (Horsehead).
- **Planetary nebulae**: shells ejected by dying Sun-like stars, ionised by the hot core (Ring, Helix, Cat's Eye); last ~10 000 years.
- **Supernova remnants**: expanding debris and shocks (Crab Nebula, Cassiopeia A).
H: Physics
- Photoionisation and recombination give emission lines (H, He, O III green, N II red, S II).
- Forbidden lines from low-density gas reveal temperatures and densities.
- Strömgren spheres: ionised regions around hot stars, size set by ionising photon output.
H: Planetary nebula shapes
P: Many planetary nebulae are bipolar or intricately structured, shaped by binary companions, magnetic fields and fast winds hitting slower earlier ejecta. They return carbon and nitrogen to the ISM; the Sun will produce one in ~5 billion years.
X: Why are H II regions red in photographs?
> Hydrogen recombination emits strongly at Hα (656 nm)
> Dominates the visible output
!: Despite the name, planetary nebulae have nothing to do with planets; early telescopes showed them as planet-like discs.
Q: What powers an emission nebula? | UV light from hot young stars ionising the gas.
Q: What is a planetary nebula? | A glowing shell of gas ejected by a dying low-mass star, ionised by its hot core.
M1: Reflection nebulae look blue because: | Dust scatters blue light more | They're hot | They emit Hα | They contain oxygen | Scattering.
M2: The Crab Nebula is a: | Supernova remnant | Planetary nebula | H II region | Dark nebula | SN 1054.

## Star clusters
S: Star clusters are groups of stars born together from the same cloud, sharing age and composition. They're laboratories for stellar evolution and tracers of galactic history.
H: Types
- **Open clusters**: tens to thousands of young stars in the disc; loosely bound; disperse over ~100 million years (Pleiades, Hyades).
- **Globular clusters**: 10^{5}–10^{6} old stars, dense spheres in the halo; ages ~10–13 billion years; ~150 in the Milky Way.
- **Associations**: young, unbound groups of massive stars (OB associations).
- **Super star clusters** in starburst galaxies.
H: Using clusters
- HR diagrams of clusters show turn-off points: the mass leaving the main sequence gives the cluster's age.
- Distance from main-sequence fitting.
- Globular cluster ages give a lower limit on the universe's age.
H: Dynamics
P: Clusters evolve dynamically: mass segregation sinks heavy stars to the centre; evaporation loses stars; core collapse in globulars produces dense cores where stellar collisions and binaries form exotic objects (blue stragglers, millisecond pulsars, possibly intermediate-mass black holes). Multiple stellar populations within globulars challenge simple formation models.
X: A cluster's main-sequence turn-off is at 2 M_{⊙}. Age?
> Lifetime ≈ 10^{10} × 2^{−2.5} ≈ 1.8 × 10^{9} years
!: Cluster stars aren't all the same mass; they're the same age, which is what makes clusters useful.
Q: How is a cluster's age found? | From the main-sequence turn-off point on its HR diagram.
Q: How do open and globular clusters differ? | Open: young, loose, in the disc. Globular: old, dense, in the halo.
M1: The Pleiades is a: | Young open cluster | Globular cluster | Galaxy | Nebula only | Seven Sisters.
M2: Globular clusters are about: | 10–13 billion years old | 1 million years | 100 million years | 1 billion years | Oldest stars.

## Galaxies and galaxy formation
S: Galaxies are vast systems of stars, gas, dust and dark matter bound by gravity. They formed as gas cooled within dark matter haloes that grew from tiny density fluctuations, merging and evolving over 13 billion years.
H: Types (Hubble sequence)
- **Spirals** (Milky Way, Andromeda): discs, arms, bulges; active star formation; barred and unbarred.
- **Ellipticals**: smooth, old stars, little gas; often in clusters.
- **Lenticulars**: discs without arms.
- **Irregulars and dwarfs**: most numerous.
H: Formation (ΛCDM)
- Dark matter haloes grow hierarchically by mergers.
- Gas cools and settles into discs, forming stars.
- Feedback from supernovae and active nuclei regulates star formation.
- Mergers transform spirals into ellipticals.
- Cosmic star formation peaked ~10 billion years ago ("cosmic noon").
H: JWST era
P: JWST finds surprisingly bright, massive galaxies within 300–400 million years of the Big Bang (e.g. JADES-GS-z14-0 at z ≈ 14), and early black holes. Models are being revised to explain such rapid early growth.
H: The Milky Way
- Barred spiral; ~100 000 light-years across; ~100–400 billion stars; mass ~1.5 × 10^{12} M_{⊙} including dark matter.
- Sun 26 000 light-years from the centre, orbiting every ~230 million years.
- Will merge with Andromeda in ~4–5 billion years.
X: How fast does the Sun orbit the galaxy (r = 8.2 kpc, period 230 Myr)?
> v = 2π × 2.5 × 10^{20}/(7.3 × 10^{15}) ≈ 2.2 × 10^{5} m s^{-1} (220 km s^{-1})
!: The Hubble sequence isn't an evolutionary sequence; ellipticals don't turn into spirals.
Q: How do galaxies form in the standard model? | Gas cools within hierarchically growing dark matter haloes.
Q: What is "cosmic noon"? | The epoch ~10 billion years ago when cosmic star formation peaked.
M1: The Milky Way is a: | Barred spiral | Elliptical | Irregular | Lenticular | SBbc.
M2: Andromeda will collide with the Milky Way in about: | 4–5 billion years | 1 million years | 100 billion years | Never | Approaching at 110 km s^{-1}.

## Galaxy dynamics
S: Galaxy dynamics studies how stars and gas move under gravity within galaxies. Stellar motions reveal galaxies' masses, the shapes of their dark matter haloes, and the origin of spiral arms and bars.
H: Key concepts
- Collisionless dynamics: stars rarely collide (relaxation time ≫ age of universe for galaxies).
- Rotation curves for discs; velocity dispersions for ellipticals.
- Virial theorem: M ≈ σ^{2}R/G.
- Epicyclic motion and resonances (corotation, Lindblad resonances).
H: Spiral arms
- Density wave theory (Lin and Shu): arms are patterns rotating slower than stars; gas compressed passing through them forms stars.
- Transient arms from swing amplification; arms induced by tidal interactions (M51).
H: Bars
- Most disc galaxies have bars; drive gas inward, feeding central star formation and black holes.
H: Scaling relations
P: Tully–Fisher (spirals: L ∝ v_{rot}^{4}) and Faber–Jackson (ellipticals: L ∝ σ^{4}) relations link luminosity to velocity, giving distances. The fundamental plane relates size, surface brightness and dispersion for ellipticals. Gaia maps 6D phase space for over a billion stars, revealing the Milky Way's past mergers (Gaia–Enceladus).
X: Mass within the Sun's orbit from v = 220 km s^{-1}, r = 8.2 kpc (2.5 × 10^{20} m)?
> M = v^{2}r/G = (2.2 × 10^{5})^{2} × 2.5 × 10^{20}/(6.67 × 10^{-11}) ≈ 1.8 × 10^{41} kg ≈ 9 × 10^{10} M_{⊙}
!: Spiral arms aren't fixed structures of the same stars; stars move through them.
Q: What is density wave theory? | Spiral arms are density patterns rotating slower than stars, compressing gas as it passes through.
Q: What is the Tully–Fisher relation? | Luminosity of spiral galaxies scales as rotation speed to about the fourth power.
M1: Stars in galaxies are: | Essentially collisionless | Constantly colliding | Fixed in place | Moving randomly at light speed | Huge separations.
M2: Gaia revealed the ancient merger: | Gaia–Enceladus | Andromeda | LMC collision | Sagittarius A* | Halo debris.

## Dark matter in galaxies
S: Galaxies rotate too fast for the visible matter alone to hold them together. Their flat rotation curves, along with lensing and cluster dynamics, show they're embedded in massive haloes of dark matter, about five times the mass of ordinary matter.
H: Evidence
- **Rotation curves** (Vera Rubin, Kent Ford, 1970s; radio 21 cm): stay flat far beyond the visible disc instead of falling as Kepler predicts.
- **Galaxy clusters** (Zwicky, 1933): galaxy speeds imply far more mass than seen.
- **Gravitational lensing**: total mass maps, including the Bullet Cluster's offset.
- **CMB acoustic peaks** and structure formation require non-baryonic matter.
H: Haloes
- Dark matter haloes extend ~10 times the visible disc.
- Simulations predict NFW profiles (cuspy centres); dwarf galaxies often show cores: the "core–cusp problem".
- Satellite counts and "too big to fail" problems also test models.
H: Alternatives
P: Modified Newtonian Dynamics (MOND) changes gravity at very low accelerations and fits many galaxy rotation curves well, but struggles with clusters, the Bullet Cluster and the CMB. Most physicists favour particle dark matter; its identity remains unknown.
X: Flat rotation curve v = 200 km s^{-1}: how does enclosed mass grow with radius?
> M(r) = v^{2}r/G ∝ r: mass keeps increasing linearly with radius
> Implies density ρ ∝ 1/r^{2} in the halo
!: Dark matter isn't simply undiscovered dim stars or gas; Big Bang nucleosynthesis and the CMB limit ordinary matter to ~5% of the universe.
Q: What do flat rotation curves imply? | Mass continues to increase with radius: an extended dark matter halo.
Q: Who measured galaxy rotation curves showing dark matter? | Vera Rubin and Kent Ford (1970s).
M1: Dark matter outweighs ordinary matter by about: | 5 to 1 | 1 to 1 | 100 to 1 | 1 to 5 | Ω_{dm}/Ω_{b}.
M2: MOND has difficulty explaining: | Galaxy clusters and the CMB | Spiral rotation curves | Tully–Fisher | Dwarf galaxies | Beyond galaxies.

## Active galactic nuclei
S: Active galactic nuclei (AGN) are galaxy centres outshining their entire galaxies, powered by gas falling into supermassive black holes. They include quasars, Seyfert galaxies, radio galaxies and blazars.
H: Components
- Supermassive black hole and accretion disc (UV/optical/X-ray).
- Broad-line region (fast gas clouds near the black hole) and narrow-line region (slower, farther).
- Dusty torus (infrared).
- Relativistic jets (radio, gamma rays) in some.
H: Unified model
P: Many AGN types are the same object seen from different angles: looking down the jet gives a blazar; through the torus, a type 2 (narrow-line) AGN; at intermediate angles, a type 1 with broad lines. Accretion rate and black hole spin add further differences.
H: Feedback
- AGN winds and jets heat and expel gas, quenching star formation in massive galaxies.
- Radio bubbles in galaxy clusters stop hot gas cooling.
- Explains why massive galaxies stop forming stars and why black hole and bulge masses correlate.
H: Reverberation mapping
- Broad-line region responds to continuum changes after light-travel delays: gives size, and with line widths, black hole mass.
X: A broad line responds 20 days after the continuum, with v = 4000 km s^{-1}. Black hole mass (virial, f ≈ 1)?
> R = c × 20 days = 5.2 × 10^{14} m
> M ≈ v^{2}R/G = (4 × 10^{6})^{2} × 5.2 × 10^{14}/6.67 × 10^{-11} ≈ 1.2 × 10^{38} kg ≈ 6 × 10^{7} M_{⊙}
!: AGN are powered by accretion, not by the black hole itself; inactive galaxies have equally massive but quiet black holes.
Q: What powers an AGN? | Accretion onto a supermassive black hole.
Q: What is the AGN unified model? | Different AGN types are explained by viewing angle and accretion properties of the same structure.
M1: A blazar is an AGN viewed: | Down its jet | Edge-on through the torus | From behind | With no black hole | Beamed emission.
M2: AGN feedback can: | Quench star formation | Create dark matter | Stop the black hole forever | Form planets | Heating gas.

## Quasars
S: Quasars are the most luminous active galactic nuclei, shining with up to thousands of times the light of a whole galaxy from a region smaller than the Solar System. Seen across the universe, they reveal early black holes and the gas between galaxies.
H: Discovery
- 3C 273 (Maarten Schmidt, 1963): redshift z = 0.158; enormous luminosity implied.
- "Quasi-stellar radio sources": point-like optically.
H: Properties
- Luminosities 10^{39}–10^{41} W.
- Black holes of 10^{8}–10^{10} M_{⊙} accreting near the Eddington limit.
- Variability on days: small emitting regions (light-days across).
- Most common at z ~ 2–3; most distant beyond z = 7 (only ~700 million years after the Big Bang).
H: Quasars as probes
P: Quasar light passes through intervening gas, producing absorption: the Lyman-alpha forest maps the intergalactic medium's structure; Gunn–Peterson troughs show the universe's reionisation ending around z ≈ 6. Lensed quasars measure the Hubble constant from time delays. Quasars serve as the fixed reference frame for astrometry (ICRF).
X: How big can a region varying in 1 day be?
> R ≲ c × 1 day = 2.6 × 10^{13} m ≈ 170 AU
!: Quasar redshifts are cosmological; early proposals that they were nearby objects with odd redshifts were ruled out.
Q: What did Schmidt discover about 3C 273? | Its spectrum was highly redshifted, implying great distance and enormous luminosity.
Q: What is the Lyman-alpha forest? | Many absorption lines in quasar spectra from intergalactic hydrogen clouds at different redshifts.
M1: Rapid quasar variability implies: | A very compact emitting region | Large size | Nearby objects | Errors | Light-travel time.
M2: Quasars were most common around redshift: | 2–3 | 0 | 20 | 0.1 | Quasar era.

## Gravitational lensing
S: Mass bends light, so galaxies and clusters act as lenses that magnify, distort and multiply images of objects behind them. Lensing maps dark matter, finds exoplanets and lets astronomers see the faintest, most distant galaxies.
H: Regimes
- **Strong lensing**: arcs, rings, multiple images (Einstein Cross).
- **Weak lensing**: subtle shape distortions; cosmic shear surveys (DES, KiDS, Euclid) map dark matter and constrain dark energy.
- **Microlensing**: temporary brightening by stars and planets; also constrains compact dark matter.
E: θ_{E} = √(4GMD_{ls}/(c^{2}D_{l}D_{s}))
H: Applications
- Cluster mass maps (Bullet Cluster).
- Magnifying the most distant galaxies (Earendel: a single star at z ≈ 6.2 magnified thousands of times).
- Time-delay cosmography for H_{0}.
- Microlensing exoplanet surveys; free-floating planets.
- Testing GR on cosmic scales.
H: Euclid and Rubin
P: The Euclid space telescope (launched 2023) and the Vera C. Rubin Observatory will measure shapes of billions of galaxies, mapping dark matter across cosmic time with weak lensing.
X: Einstein radius of a 10^{14} M_{⊙} cluster with D_{l} = 1 Gpc, D_{s} = 2 Gpc, D_{ls} ≈ 1 Gpc?
> θ_{E} = √(4 × 6.67 × 10^{-11} × 2 × 10^{44} × 3.1 × 10^{25}/(9 × 10^{16} × 3.1 × 10^{25} × 6.2 × 10^{25}))
> ≈ 1.2 × 10^{-4} rad ≈ 25″
!: Lensing magnifies by focusing light, not by making sources intrinsically brighter; surface brightness is conserved.
Q: What is weak lensing used for? | Mapping dark matter statistically from small distortions of many background galaxies.
Q: What is Earendel? | A very distant individual star at z ≈ 6.2, magnified by lensing.
M1: The Einstein Cross is an example of: | Strong lensing | Weak lensing | Microlensing | A supernova | Four quasar images.
M2: Euclid's main goal is to study: | Dark matter and dark energy via lensing and clustering | Exoplanets | The Sun | Comets | Cosmology.

## High-energy astrophysics
S: High-energy astrophysics studies X-rays, gamma rays, cosmic rays and neutrinos from the most violent places in the universe: black holes, neutron stars, supernovae and gamma-ray bursts.
H: Telescopes
- X-ray (grazing-incidence mirrors): Chandra, XMM-Newton, eROSITA, XRISM.
- Gamma-ray: Fermi (space), and ground-based Cherenkov telescopes (H.E.S.S., MAGIC, VERITAS, CTAO) detecting air showers.
- Water Cherenkov arrays (HAWC, LHAASO): PeV photons.
H: Sources
- X-ray binaries, AGN, galaxy clusters, supernova remnants, stellar coronae.
- Gamma-ray bursts (GRBs): long (collapsars, massive star deaths) and short (neutron-star mergers); the brightest flashes in the universe (GRB 221009A, "BOAT").
- Pulsars and pulsar wind nebulae; magnetar flares.
- Fast radio bursts (millisecond radio flashes, some from magnetars).
H: Radiation processes
P: Non-thermal emission dominates: synchrotron from relativistic electrons in magnetic fields, inverse Compton scattering boosting photons, pion decay from cosmic-ray protons colliding with gas, bremsstrahlung, and thermal X-rays from million-degree gas. Spectra reveal particle acceleration in shocks and jets.
X: Why must X-ray telescopes use grazing-incidence mirrors?
> X-rays penetrate or are absorbed by normal mirrors
> They reflect only at very shallow angles (< ~1°): nested cylindrical mirrors
!: High-energy photons can't be focused like visible light; their detection uses very different technologies.
Q: What are gamma-ray bursts? | Brief, extremely energetic flashes from collapsing massive stars or merging neutron stars.
Q: How do ground-based gamma-ray telescopes detect photons? | By imaging Cherenkov light from particle showers they create in the atmosphere.
M1: Long gamma-ray bursts come from: | Collapsing massive stars | Neutron-star mergers | Comets | Planets | Collapsars.
M2: Synchrotron radiation comes from: | Relativistic electrons in magnetic fields | Hot gas | Nuclear decay | Molecules | Non-thermal.

## Cosmic rays
S: Cosmic rays are high-energy charged particles, mostly protons and nuclei, arriving from space. They span energies from MeV to beyond 10^{20} eV, far exceeding any human accelerator, and their origins are still partly mysterious.
H: Properties
- ~90% protons, ~9% helium, ~1% heavier nuclei, plus electrons and some antimatter.
- Energy spectrum ∝ E^{−2.7}, with a "knee" at ~3 × 10^{15} eV and "ankle" at ~5 × 10^{18} eV.
- Highest energies ~3 × 10^{20} eV (the "Oh-My-God" particle, 1991; Amaterasu, 2021).
- Discovered by Victor Hess (1912) in balloon flights (Nobel 1936).
H: Origins
- Galactic cosmic rays: accelerated in supernova remnant shocks (diffusive shock acceleration); confirmed by gamma-ray signatures of pion decay.
- Ultra-high-energy: extragalactic; possible AGN, starburst galaxies, gamma-ray bursts; Pierre Auger Observatory found a dipole anisotropy.
- GZK cut-off: interactions with CMB photons limit their travel distance above ~5 × 10^{19} eV.
H: Effects
P: Cosmic rays create air showers detected by ground arrays; produce carbon-14 in the atmosphere; contribute ~0.4 mSv per year of human dose (more for aircrew and astronauts); cause errors in electronics (single-event upsets); and discovered the positron, muon and pion in early particle physics.
X: Why are galactic cosmic-ray directions scrambled?
> Charged particles spiral in galactic magnetic fields (~μG)
> A 10^{15} eV proton's gyroradius is ~1 pc, far smaller than galactic distances
!: Cosmic rays aren't rays; the name stuck from early 20th-century assumptions.
Q: Who discovered cosmic rays? | Victor Hess, using balloon flights (1912).
Q: What is the GZK cut-off? | The energy (~5 × 10^{19} eV) above which cosmic-ray protons lose energy interacting with CMB photons.
M1: Most cosmic rays are: | Protons | Electrons | Photons | Neutrinos | ~90%.
M2: Galactic cosmic rays are thought to be accelerated mainly in: | Supernova remnant shocks | The Sun | Planets | Black hole interiors | Diffusive shock acceleration.

## Neutrino astronomy
S: Neutrinos pass almost unhindered through matter, so they carry information straight from the cores of stars, supernovae and the most violent cosmic accelerators. Neutrino astronomy uses vast detectors to catch the rare interactions.
H: Sources
- **Sun**: pp chain and CNO neutrinos (Homestake, Super-K, SNO, Borexino).
- **Supernovae**: SN 1987A gave ~25 neutrino events, confirming core-collapse theory.
- **Atmospheric neutrinos**: from cosmic rays; revealed oscillations.
- **High-energy astrophysical neutrinos**: IceCube (2013 onwards), TeV–PeV.
- **Geoneutrinos**: from radioactive decay in Earth.
H: Detectors
- Water/ice Cherenkov (Super-Kamiokande, IceCube's cubic kilometre of Antarctic ice, KM3NeT in the Mediterranean).
- Liquid scintillators (Borexino, JUNO).
- Heavy water (SNO), radiochemical (chlorine, gallium).
H: Discoveries
P: IceCube found a diffuse flux of cosmic neutrinos, identified the blazar TXS 0506+056 as a source (2017, with gamma-ray flaring), saw neutrinos from the Seyfert galaxy NGC 1068 (2022) and mapped neutrino emission from the Milky Way's plane (2023). KM3NeT detected a ~220 PeV neutrino (2025), the most energetic yet.
X: Why must neutrino detectors be enormous?
> Interaction cross-sections are tiny (~10^{-38} cm^{2} at GeV)
> Only one in ~10^{12} solar neutrinos passing through Earth interacts
!: Neutrinos travel straight from sources (no deflection, little absorption), so their directions point back to where they were made.
Q: Why are neutrinos valuable astronomical messengers? | They travel unimpeded and undeflected from dense, distant sources.
Q: What did SN 1987A's neutrinos confirm? | That core-collapse supernovae release most energy as neutrinos.
M1: IceCube is located in: | Antarctic ice | The Pacific | A mountain | Space | South Pole.
M2: The first identified high-energy neutrino source was: | A blazar | The Sun | A pulsar | Jupiter | TXS 0506+056.

## Gravitational-wave astronomy
S: Gravitational-wave astronomy observes ripples in spacetime from merging black holes and neutron stars, opening a window on the universe independent of light. It measures masses, spins and distances directly from gravity.
H: Detections so far
- ~90 confirmed events in the first three LIGO–Virgo–KAGRA runs; hundreds more in O4 (2023–25).
- Mostly binary black holes; several neutron-star mergers; neutron star–black hole mergers.
- Black holes in the "pair-instability mass gap" (GW190521).
- A mystery object of ~2.6 M_{⊙} (GW190814): heaviest neutron star or lightest black hole?
H: What it teaches
- Black hole populations: masses, spins, formation channels (isolated binaries vs dynamical capture in clusters).
- Tests of GR in strong fields; graviton mass limits.
- Neutron-star equation of state.
- Hubble constant from standard sirens.
- Nanohertz background from pulsar timing arrays (2023).
H: Future
P: Upgrades (A+), third-generation detectors (Einstein Telescope, Cosmic Explorer) will see mergers throughout the observable universe. LISA (2030s) will detect massive black hole mergers and thousands of galactic white dwarf binaries; atom interferometers may cover intermediate frequencies.
X: Distance range scaling: if detector sensitivity improves 10 times in strain, how much does the volume surveyed grow?
> Range ∝ sensitivity: 10 times further
> Volume ∝ range^{3}: 1000 times more events
!: Gravitational-wave detectors are nearly omnidirectional; locating sources needs several detectors and triangulation.
Q: What are gravitational-wave "standard sirens"? | Mergers whose gravitational-wave signals give distances directly, for measuring cosmic expansion.
Q: What did GW190521 reveal? | A black hole merger with components in the pair-instability mass gap.
M1: Third-generation detectors planned include: | Einstein Telescope and Cosmic Explorer | Hubble | JWST | ALMA | Next-gen interferometers.
M2: Improving strain sensitivity 2 times increases detection volume by: | 8 | 2 | 4 | 16 | Cube.

## Multi-messenger astronomy
S: Multi-messenger astronomy combines light, gravitational waves, neutrinos and cosmic rays from the same event. Each messenger reveals different physics, and together they give a far more complete picture than any alone.
H: The messengers
- **Electromagnetic radiation**: radio to gamma rays: composition, temperature, motion.
- **Gravitational waves**: masses, spins, distances, dynamics of compact objects.
- **Neutrinos**: dense interiors, hadronic acceleration, nuclear processes.
- **Cosmic rays**: particle acceleration (deflected, so poor directions).
H: Landmark events
- **SN 1987A** (1987): neutrinos + light.
- **GW170817** (2017): gravitational waves + gamma rays + kilonova across the spectrum.
- **TXS 0506+056** (2017): high-energy neutrino + gamma-ray flare from a blazar.
H: Making it work
P: Rapid alerts (GCN, SNEWS for supernova neutrinos) let telescopes worldwide respond within minutes. Wide-field surveys (Rubin, ZTF) catch transients; sky localisation from gravitational waves improves with more detectors. Coordinated campaigns require international collaboration and fast data sharing.
H: What's next
- A galactic supernova would give neutrinos, gravitational waves and light simultaneously.
- Joint detections of neutron star–black hole mergers.
- Neutrino and gamma-ray associations in starburst galaxies and tidal disruption events.
X: Why did SNEWS form?
> Supernova neutrinos arrive hours before light breaks out
> An alert lets telescopes point at the explosion's first moments
!: Different messengers from one event can arrive at different times because they're emitted at different stages or travel through different paths.
Q: What is multi-messenger astronomy? | Combining observations of light, gravitational waves, neutrinos and cosmic rays from the same sources.
Q: Why did neutrinos from SN 1987A arrive before the light? | They escaped immediately, while light took hours to break out of the star.
M1: GW170817 was observed in: | Gravitational waves and across the electromagnetic spectrum | Neutrinos only | Radio only | Cosmic rays | Multi-messenger.
M2: SNEWS provides early alerts using: | Supernova neutrinos | Gravitational waves only | Optical telescopes | Radio | Neutrino burst.
`;
