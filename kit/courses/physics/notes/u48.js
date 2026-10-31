// Unit 48: Space Physics and Planetary Science. Format: kit/course/notes.js
export default `
## Solar physics
S: The Sun is a G2V main-sequence star powered by hydrogen fusion in its core. Its layered interior, magnetic activity cycle, flares and coronal mass ejections drive space weather throughout the solar system.
H: Structure
- **Core** (to ~0.25 R_{☉}): ~15 million K; pp chain fuses ~600 million tonnes of hydrogen per second.
- **Radiative zone** (to ~0.7 R_{☉}): photons random-walk out over ~10^{5} years.
- **Convection zone**: hot plasma rises in cells; granulation visible at the surface.
- **Photosphere** (~5800 K), **chromosphere**, **transition region**, **corona** (1–3 million K).
E: L_{☉} = 4πR_{☉}^{2}σT_{eff}^{4} ≈ 3.83 × 10^{26} W :: solar luminosity
E: t_{diff} ≈ R^{2}/(lc) :: photon random-walk time (mean free path l)
H: Magnetic activity
- Differential rotation (equator ~25 days, poles ~35 days) winds up field lines: the solar dynamo.
- **Sunspots**: cooler (~4000 K) regions of strong field (~0.3 T).
- ~11-year sunspot cycle; magnetic polarity reverses each cycle (22-year Hale cycle).
- **Flares**: sudden magnetic reconnection releasing up to ~10^{25} J.
- **Coronal mass ejections**: billions of tonnes of plasma ejected at 300–3000 km s^{-1}.
H: Probing the Sun
P: Helioseismology uses surface oscillations (p-modes, ~5-minute periods) to map interior sound speed and rotation. Solar neutrinos confirmed core fusion and revealed neutrino oscillations. Missions: SOHO, SDO, Parker Solar Probe (closest approach ~6.1 million km), Solar Orbiter, DKIST telescope. The coronal heating problem (why the corona is so hot) involves waves and nanoflares.
X: Mass converted to energy per second in the Sun?
> Δm = L/c^{2} = 3.83 × 10^{26}/9 × 10^{16} ≈ 4.3 × 10^{9} kg s^{-1}
X: Wien peak of the photosphere at 5800 K?
> λ = 2.9 × 10^{-3}/5800 ≈ 500 nm
K: The Sun fuses hydrogen in its core; its magnetic dynamo drives sunspots, flares and CMEs on an 11-year cycle.
!: The corona is far hotter than the photosphere; heat doesn't simply flow outward from hot to cold here.
Q: What is helioseismology? | Studying the Sun's interior by analysing surface oscillation modes.
Q: How long is the sunspot cycle? | About 11 years (22 years for the full magnetic cycle).
M1: The solar corona's temperature is about: | 1–3 million K | 5800 K | 15 million K | 300 K | Coronal heating problem.
M2: Solar flares release energy by: | Magnetic reconnection | Nuclear fusion at the surface | Chemical burning | Gravitational collapse | Field lines reconnect.

## Solar wind
S: The solar wind is a continuous outflow of plasma from the Sun's corona, carrying the Sun's magnetic field throughout the solar system. Its speed, density and field shape space weather, planetary magnetospheres and comet tails.
H: Origin
- Parker (1958) showed a hot corona can't be in static equilibrium; it must expand supersonically.
- **Slow wind**: ~300–400 km s^{-1}, from near streamers; variable.
- **Fast wind**: ~700–800 km s^{-1}, from coronal holes (open field lines).
- At 1 AU: density ~5 protons cm^{-3}, temperature ~10^{5} K, field ~5 nT.
- Mass loss ~1.5 × 10^{9} kg s^{-1}.
E: ṁ = 4πr^{2}ρv :: mass-loss rate
H: The Parker spiral
- Field lines are frozen into the plasma; solar rotation winds them into an Archimedean spiral.
- At Earth the field is at ~45° to the Sun–Earth line.
- The heliospheric current sheet separates opposite polarities ("ballerina skirt").
E: tan ψ = Ωr/v :: Parker spiral angle
H: Structures and effects
P: Corotating interaction regions form where fast wind catches slow wind. Interplanetary CMEs carry strong, rotating fields (magnetic clouds). The solar wind shapes magnetospheres, strips atmospheres from unmagnetised planets like Mars, and blows comet ion tails anti-sunward. Parker Solar Probe has found magnetic "switchbacks" near the Sun.
X: Parker spiral angle at 1 AU for v = 400 km s^{-1} (Ω = 2.7 × 10^{-6} rad s^{-1})?
> tan ψ = 2.7 × 10^{-6} × 1.5 × 10^{11}/4 × 10^{5} ≈ 1.0 ⇒ ψ ≈ 45°
X: Travel time from Sun to Earth at 400 km s^{-1}?
> 1.5 × 10^{11}/4 × 10^{5} ≈ 3.75 × 10^{5} s ≈ 4.3 days
K: The solar wind is the supersonic expansion of the corona, dragging the magnetic field into a spiral.
!: The solar wind is not just fast particles; it carries magnetic field, which controls how it interacts with planets.
Q: Where does the fast solar wind come from? | Coronal holes, regions of open magnetic field.
Q: Why does the solar wind field form a spiral? | Field lines frozen into radially flowing plasma are wound up by solar rotation.
M1: Solar wind density at Earth is about: | 5 protons cm^{-3} | 10^{19} cm^{-3} | 0.001 cm^{-3} | 10^{6} cm^{-3} | Very tenuous.
M2: Who predicted the solar wind? | Eugene Parker | Einstein | Chapman | Van Allen | 1958.

## Heliosphere
S: The heliosphere is the vast bubble carved into interstellar space by the solar wind. Its edges, the termination shock and heliopause, were crossed by Voyager 1 and 2, revealing where the Sun's influence gives way to the galaxy.
H: Structure
- **Termination shock**: solar wind slows to subsonic (~94 AU for Voyager 1, ~84 AU for Voyager 2).
- **Heliosheath**: compressed, heated solar wind.
- **Heliopause**: boundary where solar wind pressure balances interstellar medium (~121 AU, Voyager 1, 2012; ~119 AU, Voyager 2, 2018).
- Possible bow wave or shock ahead, as the Sun moves at ~26 km s^{-1} through the local interstellar cloud.
E: ρ_{sw}v_{sw}^{2} ≈ p_{ISM} :: pressure balance setting the heliopause
H: Observations
- Voyager plasma instruments measured density jumps and cosmic-ray changes at the heliopause.
- IBEX images energetic neutral atoms, revealing a "ribbon" shaped by the interstellar field.
- The heliosphere shields the inner solar system from ~75% of galactic cosmic rays below ~1 GeV.
H: Shape and variability
P: The heliosphere's shape (comet-like with a tail, or rounder "croissant") is debated. Its size breathes with the solar cycle. Interstellar neutral atoms penetrate it and are measured near Earth. IMAP (launched 2025) maps the boundary in detail. Understanding the heliosphere helps interpret astrospheres around other stars and their effect on exoplanet habitability.
X: At what distance does solar wind ram pressure (falling as 1/r^{2}) equal 2 × 10^{-14} Pa, if at 1 AU it is 2 nPa?
> r^{2} = 2 × 10^{-9}/2 × 10^{-14} = 10^{5} ⇒ r ≈ 316 AU (actual heliopause is closer because of thermal and magnetic pressures and slowing)
X: Light travel time to Voyager 1 at ~165 AU?
> 165 × 8.3 min ≈ 23 hours
K: The heliosphere is the solar wind's bubble, bounded by the termination shock and heliopause, which shield us from many cosmic rays.
!: The heliopause isn't the edge of the solar system gravitationally; the Oort cloud extends tens of thousands of AU further.
Q: Where did Voyager 1 cross the heliopause? | About 121 AU, in 2012.
Q: What is the termination shock? | Where the solar wind slows abruptly from supersonic to subsonic speed.
M1: IBEX images: | Energetic neutral atoms | Radio emission | Visible light | Gravitational waves | Neutral atoms from charge exchange.
M2: The heliosphere reduces: | Galactic cosmic ray flux | Sunlight | Gravity | Solar neutrinos | Magnetic shielding.

## Magnetospheres
S: A magnetosphere is the region where a planet's magnetic field dominates over the solar wind. Earth's magnetosphere deflects the solar wind, stores energy and drives aurorae and storms, protecting the atmosphere and surface from much space radiation.
H: Shape and boundaries
- **Bow shock**: solar wind slows from supersonic upstream of the magnetosphere.
- **Magnetosheath**: shocked, turbulent solar wind.
- **Magnetopause**: boundary where planetary magnetic pressure balances solar wind ram pressure; ~10 R_{E} on Earth's dayside.
- **Magnetotail**: stretched field extending hundreds of R_{E} on the nightside.
E: r_{mp} ≈ R_{E}(B_{0}^{2}/(2μ_{0}ρv^{2}))^{1/6} :: Chapman–Ferraro magnetopause distance
H: Dynamics
- **Dungey cycle**: dayside reconnection with southward interplanetary field opens field lines; nightside reconnection closes them; drives convection.
- **Substorms**: sudden release of tail energy, intense aurorae.
- **Geomagnetic storms**: from CMEs; ring current enhancement measured by the Dst index.
H: Other planets
P: Jupiter's magnetosphere is the largest structure in the solar system (magnetopause ~50–100 R_{J}), filled with plasma from Io's volcanoes. Saturn's is fed by Enceladus. Mercury has a small magnetosphere; Venus and Mars have induced magnetospheres from ionospheric interaction. Missions: Cluster, THEMIS, MMS (reconnection), Juno.
X: Earth's magnetopause with B_{0} = 3 × 10^{-5} T, n = 5 cm^{-3}, v = 400 km s^{-1}.
> ρv^{2} = 5 × 10^{6} × 1.67 × 10^{-27} × 1.6 × 10^{11} ≈ 1.34 × 10^{-9} Pa
> B_{0}^{2}/(2μ_{0}) = 9 × 10^{-10}/2.51 × 10^{-6} ≈ 3.6 × 10^{-4} Pa
> ratio^{1/6} = (2.7 × 10^{5})^{1/6} ≈ 8 R_{E} (compression factor raises this to ~10)
K: Magnetospheres balance planetary field pressure against the solar wind; reconnection drives their dynamics.
!: The magnetosphere doesn't block all solar particles; reconnection lets energy and plasma in, especially with southward IMF.
Q: What is the Dungey cycle? | Magnetospheric convection driven by dayside and nightside magnetic reconnection.
Q: What feeds Jupiter's magnetosphere with plasma? | Volcanic gases from Io.
M1: Earth's dayside magnetopause is at about: | 10 R_{E} | 1 R_{E} | 100 R_{E} | 1000 R_{E} | Pressure balance.
M2: Geomagnetic storms are measured by the: | Dst index | Richter scale | pH | Kelvin scale | Ring current strength.

## Ionospheres
S: The ionosphere is the layer of the upper atmosphere ionised by solar extreme ultraviolet and X-rays. It reflects radio waves, affects GPS accuracy, hosts aurorae and changes dramatically between day and night and during space weather.
H: Layers
- **D region** (60–90 km): absorbs HF radio during the day; disappears at night.
- **E region** (90–150 km): sporadic E layers.
- **F region** (150–500 km): highest electron density (~10^{12} m^{-3}); F1 and F2 by day.
- Produced by photoionisation; lost by recombination.
E: f_{p} ≈ 9√(n_{e}) Hz (n_{e} in m^{-3}) :: plasma frequency
E: f_{MUF} = f_{c}/cos θ :: maximum usable frequency (secant law)
H: Radio propagation
- Waves below the plasma frequency reflect; above it they pass through.
- HF "skywave" radio bounces between ionosphere and ground for global communication.
- Total electron content (TEC) delays GPS signals by up to tens of metres; dual-frequency receivers correct this.
E: Δt ∝ 40.3 TEC/f^{2} :: ionospheric group delay (in metres: 40.3 TEC/f^{2})
H: Variability
P: Diurnal and seasonal changes, solar cycle variations, sudden ionospheric disturbances from flares (radio blackouts), and storm-time effects. Scintillation from irregularities disrupts GPS and satellite links near the equator and poles. Ionosondes, incoherent scatter radars and GNSS TEC maps monitor it. Other planets (Venus, Mars, Titan) have ionospheres too.
X: The F2 peak has n_{e} = 10^{12} m^{-3}. Critical frequency?
> f_{p} ≈ 9 × 10^{6} Hz = 9 MHz
X: GPS L1 (1.575 GHz) with TEC = 50 × 10^{16} m^{-2}. Range error?
> 40.3 × 5 × 10^{17}/(1.575 × 10^{9})^{2} ≈ 8.1 m
K: The ionosphere's electron density sets which radio waves reflect and how much GPS signals are delayed.
!: Higher frequencies pass through the ionosphere; HF skywave works only below the maximum usable frequency.
Q: Why does AM radio reach further at night? | The absorbing D layer disappears after sunset.
Q: How do dual-frequency GPS receivers correct ionospheric delay? | The delay scales as 1/f^{2}, so comparing two frequencies removes it.
M1: The F region has: | The highest electron density | No ions | Only neutral gas | The lowest altitude | ~10^{12} m^{-3}.
M2: Radio blackouts from flares are caused by: | Enhanced D-region absorption | Solar wind | Cosmic rays | Lightning | X-ray ionisation.

## Space weather
S: Space weather is the changing conditions in space, driven by the Sun, that affect technology and people. Solar flares, CMEs and energetic particles can disrupt power grids, satellites, GPS, aviation and astronauts' health.
H: Drivers and impacts
- **Flares**: X-rays cause radio blackouts within minutes (classes A, B, C, M, X).
- **Solar energetic particles**: arrive within minutes to hours; radiation hazard for astronauts and polar flights; satellite upsets.
- **CMEs**: arrive in 1–4 days; geomagnetic storms if the field is southward.
- **Geomagnetically induced currents (GICs)** in long conductors damage transformers.
- Atmospheric heating increases drag on low-orbit satellites.
E: E ≈ −dB/dt × (ground conductivity factors) :: geoelectric fields driving GICs
H: Historical events
- **Carrington event** (1859): telegraph fires, aurorae seen near the tropics.
- **March 1989**: Hydro-Québec grid collapse, 9 hours of blackout for 6 million people.
- **Halloween storms 2003**: satellite damage, aviation rerouting.
- **February 2022**: 38 Starlink satellites lost to increased drag after a minor storm.
- **May 2024 "Gannon" storm**: strongest in two decades, aurorae worldwide.
H: Forecasting and protection
P: Monitoring by SOHO, SDO, DSCOVR and ACE at L1 gives ~15–60 minutes warning of CME arrival. Models (WSA–ENLIL) forecast arrivals. NOAA scales: G (geomagnetic), S (radiation), R (radio). Grid operators reconfigure networks; satellites enter safe modes; airlines reroute polar flights. Space weather is on national risk registers.
X: A CME travels at 1500 km s^{-1}. Arrival time at Earth?
> 1.5 × 10^{11}/1.5 × 10^{6} = 10^{5} s ≈ 28 hours
X: L1 is 1.5 million km sunward. Warning time for 600 km s^{-1} wind?
> 1.5 × 10^{9}/6 × 10^{5} = 2500 s ≈ 42 minutes
K: Space weather from flares, particles and CMEs threatens grids, satellites, navigation and people; monitoring at L1 gives short warnings.
!: A CME's impact depends strongly on its magnetic orientation; southward fields cause the biggest storms.
Q: What was the Carrington event? | An extreme 1859 geomagnetic storm that disrupted telegraphs worldwide.
Q: What are geomagnetically induced currents? | Currents driven in power lines and pipelines by rapidly changing geomagnetic fields.
M1: Solar flare classes in increasing strength are: | A, B, C, M, X | X, M, C, B, A | 1 to 10 | G1 to G5 | Logarithmic X-ray flux.
M2: The Starlink loss in 2022 was due to: | Increased atmospheric drag | Radiation dose | Radio blackout | Collision | Storm heating expanded the atmosphere.

## Cosmic rays
S: Cosmic rays are high-energy charged particles, mostly protons and nuclei, arriving from the Sun, the galaxy and beyond. They create air showers in the atmosphere, contribute to radiation dose, and reach energies far beyond any human accelerator.
H: Composition and spectrum
- ~89% protons, ~10% helium, ~1% heavier nuclei, plus electrons and positrons.
- Energy spectrum follows a power law dN/dE ∝ E^{−2.7} up to the "knee" (~3 × 10^{15} eV), then steeper (E^{−3.1}), then flattens at the "ankle" (~5 × 10^{18} eV).
- Highest energies ~10^{20} eV (the "Oh-My-God" particle, 3 × 10^{20} eV, 1991; Amaterasu 2.4 × 10^{20} eV, 2023).
- GZK cutoff: interactions with CMB photons limit propagation above ~5 × 10^{19} eV.
E: dN/dE ∝ E^{−γ}, γ ≈ 2.7 :: cosmic-ray power-law spectrum
E: r_{L} = E/(ZecB) :: Larmor radius
H: Origins
- **Solar**: low energies, during flares and CMEs.
- **Galactic**: supernova remnant shocks via diffusive shock acceleration (Fermi acceleration).
- **Extragalactic**: highest energies, possibly AGN or starburst galaxies (Pierre Auger Observatory found a dipole anisotropy).
H: Effects
P: Air showers produce muons that reach the ground (~1 per cm^{2} per minute); cosmic rays dominate aircrew radiation dose (~2–5 μSv per hour at cruise); they make carbon-14 used in radiocarbon dating; they cause single-event upsets in electronics. Detected by balloons, satellites (AMS-02), ground arrays and water Cherenkov detectors.
X: Larmor radius of a 10^{15} eV proton in a 3 μG galactic field?
> r = 10^{15} × 1.6 × 10^{-19}/(1.6 × 10^{-19} × 3 × 10^{8} × 3 × 10^{-10}) ≈ 1.1 × 10^{16} m ≈ 0.36 pc
X: Muons at sea level: how many through a 100 cm^{2} detector per minute?
> ~100
K: Cosmic rays follow a steep power-law spectrum; galactic ones come from supernova shocks, the highest-energy ones from beyond the galaxy.
!: Most cosmic rays are charged, so galactic magnetic fields scramble their arrival directions; only the highest energies point back to sources.
Q: What is the knee of the cosmic-ray spectrum? | A steepening around 3 × 10^{15} eV, possibly marking the limit of galactic accelerators.
Q: What is the GZK cutoff? | A suppression of cosmic rays above ~5 × 10^{19} eV due to interactions with CMB photons.
M1: Most cosmic rays are: | Protons | Electrons | Photons | Neutrinos | ~89%.
M2: Galactic cosmic rays are mainly accelerated in: | Supernova remnant shocks | The Sun | Planetary magnetospheres | Black hole interiors | Diffusive shock acceleration.

## Radiation belts
S: Earth's radiation belts are doughnut-shaped regions where the magnetic field traps energetic electrons and protons. Discovered by James Van Allen in 1958, they threaten satellites and astronauts and change dramatically during storms.
H: Structure
- **Inner belt** (~1.2–2 R_{E}): energetic protons (10–100s MeV) from cosmic-ray albedo neutron decay; relatively stable.
- **Outer belt** (~3–7 R_{E}): relativistic electrons (0.1–10 MeV); highly variable.
- Slot region between them, kept clear by wave scattering.
- Sometimes a third belt forms temporarily (Van Allen Probes, 2013).
- **South Atlantic Anomaly**: inner belt dips closest to Earth, where the field is weakest.
H: Particle motion
- **Gyration** around field lines (ms or faster).
- **Bounce** between mirror points (~seconds).
- **Drift** around Earth (minutes to hours) due to gradient and curvature.
- Three adiabatic invariants: μ = p_{⊥}^{2}/(2mB), J (bounce), Φ (drift).
E: μ = p_{⊥}^{2}/(2mB) :: first adiabatic invariant
E: sin^{2}α_{eq} = B_{eq}/B_{m} :: mirror condition
H: Gains, losses and hazards
P: Electrons are accelerated by chorus waves and radial diffusion, and lost by hiss scattering into the atmosphere and magnetopause shadowing. The belts can empty and refill within hours. Satellites passing through suffer total dose, displacement damage, deep dielectric charging and single-event effects; GPS and geostationary satellites sit in or near the outer belt. Apollo crews passed through quickly, receiving modest doses.
X: A particle has pitch angle 30° at the equator where B = 100 nT. Mirror field?
> B_{m} = B_{eq}/sin^{2}30° = 100/0.25 = 400 nT
X: Why are particles with small equatorial pitch angles lost?
> Their mirror points lie in the atmosphere, where collisions remove them (the loss cone)
K: Radiation belts trap particles via magnetic mirroring; waves accelerate and scatter them, causing rapid variations.
!: The outer belt is not constant; storms can increase relativistic electron fluxes by orders of magnitude.
Q: Who discovered the radiation belts? | James Van Allen, using Explorer 1 and 3 data in 1958.
Q: What is the South Atlantic Anomaly? | A region where the inner radiation belt comes closest to Earth's surface.
M1: The inner belt is dominated by: | Energetic protons | Relativistic electrons | Neutrons | Photons | From albedo neutron decay.
M2: The loss cone contains particles that: | Mirror in the atmosphere and are lost | Stay trapped forever | Escape to space | Are neutral | Small pitch angles.

## Planetary atmospheres
S: Planetary atmospheres range from Venus's crushing CO_{2} hothouse to Mars's thin cold air and Jupiter's deep hydrogen weather layers. Their physics, set by gravity, radiation, composition and rotation, determines climate and habitability.
H: Structure
- Hydrostatic balance gives pressure falling with height: p = p_{0}e^{−z/H}.
- Scale height H = k_{B}T/(mg): Earth ~8.5 km, Venus ~15 km, Mars ~11 km, Titan ~20 km (each varies with temperature).
- Temperature layers: troposphere (convective), stratosphere (ozone heating on Earth), mesosphere, thermosphere.
E: H = k_{B}T/(mg) :: scale height
E: T_{eq} = [(1 − A)S/(4σ)]^{1/4} :: radiative equilibrium temperature
H: Greenhouse effect and climate
- Earth: T_{eq} ≈ 255 K, actual ~288 K: greenhouse warming ~33 K.
- Venus: 92 bar CO_{2}, surface ~737 K, runaway greenhouse.
- Mars: 6 mbar CO_{2}, ~210 K; dust storms; seasonal CO_{2} caps.
- Titan: 1.5 bar N_{2} with methane cycle (rain, lakes).
H: Dynamics and escape
P: Rotation shapes circulation: Hadley cells, jet streams, Jupiter's bands and the Great Red Spot. Atmospheric escape (Jeans, hydrodynamic, sputtering, ion pickup) depends on escape velocity versus thermal speeds: Mars lost much of its atmosphere after its magnetic field faded. Exoplanet atmospheres are now probed with JWST transmission spectra.
E: v_{esc} = √(2GM/R) :: escape velocity
X: Earth's equilibrium temperature with A = 0.3, S = 1361 W m^{-2}?
> T = [0.7 × 1361/(4 × 5.67 × 10^{-8})]^{1/4} = (4.2 × 10^{9})^{1/4} ≈ 255 K
X: Scale height of Mars (T = 210 K, CO_{2} m = 44 u, g = 3.7 m s^{-2})?
> H = 1.38 × 10^{-23} × 210/(44 × 1.66 × 10^{-27} × 3.7) ≈ 10.7 km
K: Atmospheres follow hydrostatic balance; radiation, composition and greenhouse gases set surface temperature.
!: Equilibrium temperature ignores greenhouse warming; actual surface temperatures can be much higher (Venus by ~500 K).
Q: What is scale height? | The height over which atmospheric pressure falls by a factor of e.
Q: Why is Venus hotter than Mercury despite being further from the Sun? | Its thick CO_{2} atmosphere traps heat via a runaway greenhouse effect.
M1: Earth's greenhouse warming is about: | 33 K | 3 K | 300 K | 0 K | 288 − 255.
M2: Titan's atmosphere is mainly: | Nitrogen | CO_{2} | Hydrogen | Oxygen | ~95% N_{2}.

## Planetary interiors
S: Planetary interiors are layered by density: metal cores, rocky or icy mantles and crusts. Seismology, gravity, magnetic fields and moments of inertia reveal structures we can't see directly, from Earth's solid inner core to Jupiter's diffuse core.
H: Probing interiors
- **Mean density**: Earth 5.51 g cm^{-3}, Moon 3.34, Mars 3.93, Jupiter 1.33, Saturn 0.69.
- **Moment of inertia factor** I/(MR^{2}): 0.4 for uniform sphere; Earth 0.331 (central concentration), Moon 0.393.
- **Seismology**: P and S waves; S-wave shadow reveals Earth's liquid outer core; InSight measured Mars's core (~1830 km radius).
- **Gravity fields** (GRACE, Juno) and tidal Love numbers.
E: ρ̄ = 3M/(4πR^{3}) :: mean density
E: I = αMR^{2} :: moment of inertia
H: Earth's interior
- Crust (5–70 km), mantle (to 2890 km), liquid outer core (to 5150 km), solid inner core (radius ~1220 km).
- Core is Fe–Ni plus light elements; temperature ~5000–6000 K at the centre.
- Mantle convection drives plate tectonics.
H: Other worlds
P: Mercury has a huge core (~85% of its radius). Venus may lack plate tectonics. Jupiter's core is "fuzzy" (Juno), with metallic hydrogen above. Icy moons (Europa, Enceladus, Ganymede) have subsurface oceans detected by induced magnetic fields and plumes. Heat sources: accretion, differentiation, radioactive decay and tidal heating.
X: Earth's mean density from M = 5.97 × 10^{24} kg, R = 6.37 × 10^{6} m.
> ρ = 3 × 5.97 × 10^{24}/(4π × 2.58 × 10^{20}) ≈ 5520 kg m^{-3}
> Surface rocks ~2700–3300, so the core must be dense
X: What does I/MR^{2} = 0.33 tell us?
> Mass is concentrated towards the centre (less than 0.4 of a uniform sphere)
K: Density, moment of inertia, seismology and gravity reveal layered interiors with dense metallic cores.
!: Surface rock density is much lower than the planet's mean; you can't infer interiors from surfaces alone.
Q: How do we know Earth's outer core is liquid? | S-waves don't pass through it, creating an S-wave shadow zone.
Q: What did InSight measure on Mars? | Marsquakes revealing crust, mantle and a liquid core about 1830 km in radius.
M1: A uniform sphere has I/MR^{2} = : | 0.4 | 0.33 | 1 | 0.5 | 2/5.
M2: Juno found Jupiter's core is: | Diluted or "fuzzy" | Solid iron only | Absent | Made of ice | Gradual transition.

## Planetary magnetic fields
S: Planetary magnetic fields are generated by dynamos: convecting, electrically conducting fluids in rotating planets. They shield atmospheres, create magnetospheres and record a planet's history in magnetised rocks.
H: The dynamo
- Needs a conducting fluid (liquid iron, metallic hydrogen, salty water), convection (thermal or compositional) and rotation (Coriolis organises flow).
- Magnetic Reynolds number Rm = μ_{0}σvL must be large (≫ 10–100).
- Earth's field: dipole ~25–65 μT at the surface, tilted ~10° from the rotation axis.
E: Rm = μ_{0}σvL :: magnetic Reynolds number
E: B_{dipole}(r, λ) = B_{0}(R/r)^{3}√(1 + 3sin^{2}λ) :: dipole field magnitude
H: Reversals and history
- Earth's field reverses irregularly, on average every few hundred thousand years; last full reversal ~780 000 years ago.
- Seafloor magnetic stripes confirmed plate tectonics.
- Paleomagnetism shows a field for at least ~3.5 billion years.
- Excursions and the weakening South Atlantic Anomaly.
H: Across the solar system
P: Mercury: weak, offset dipole. Venus: no intrinsic field (slow rotation, possibly no core convection). Mars: no global field now, but crustal magnetisation shows an ancient dynamo. Jupiter: strongest (~400 μT at the equator), from metallic hydrogen. Saturn: almost perfectly axisymmetric. Uranus and Neptune: tilted, offset fields from shallow ionic oceans. Ganymede has its own field.
X: Earth's surface equatorial field is 30 μT. Field at 6.6 R_{E} (geostationary orbit) at the equator?
> 30 μT/6.6^{3} ≈ 30/287 ≈ 0.10 μT = 100 nT
X: Rm for Earth's core with σ = 10^{6} S m^{-1}, v = 5 × 10^{-4} m s^{-1}, L = 10^{6} m.
> Rm = 4π × 10^{-7} × 10^{6} × 5 × 10^{-4} × 10^{6} ≈ 630: dynamo action possible
K: Dynamos need conducting, convecting, rotating fluid; field histories record planetary evolution.
!: A planet having an iron core doesn't guarantee a field; the core must be convecting.
Q: Why does Mars lack a global magnetic field today? | Its core dynamo stopped, probably because the core cooled and convection ceased.
Q: How did seafloor magnetic stripes support plate tectonics? | Symmetric stripes of reversed magnetisation either side of ridges showed spreading seafloor.
M1: Dipole field strength falls with distance as: | 1/r^{3} | 1/r^{2} | 1/r | constant | Dipole scaling.
M2: Uranus's and Neptune's fields are: | Strongly tilted and offset | Aligned with rotation | Absent | Stronger than Jupiter's | Shallow dynamo sources.

## Planetary rings
S: Planetary rings are flat discs of countless orbiting particles, from dust to house-sized boulders. Saturn's dazzling icy rings are the most famous, but all giant planets have rings, shaped by gravity, collisions and moons.
H: Why rings form
- Inside the **Roche limit**, tidal forces tear apart bodies held by self-gravity.
- Rings may come from disrupted moons, comets or leftover formation material.
- Collisions flatten rings into thin discs (Saturn's main rings ~10 m to 1 km thick but ~280 000 km wide).
E: d_{Roche} ≈ 2.44R_{p}(ρ_{p}/ρ_{m})^{1/3} :: fluid Roche limit
H: Structure and dynamics
- Kepler's laws: inner particles orbit faster (differential rotation).
- **Resonances** with moons create gaps (Cassini Division at the 2:1 resonance with Mimas).
- **Shepherd moons** confine narrow rings (Prometheus and Pandora with the F ring).
- Density and bending waves, propellers from embedded moonlets, spokes from charged dust.
E: T_{1}/T_{2} = (r_{1}/r_{2})^{3/2} :: Kepler's third law for resonances
H: Ages and other systems
P: Cassini's "Grand Finale" (2017) measured Saturn's ring mass (~40% of Mimas) and suggested the rings may be young (~100–400 million years), though this is debated. Jupiter's faint dusty rings, Uranus's narrow dark rings, Neptune's arcs. Rings around minor bodies (Chariklo, Haumea, Quaoar, whose ring lies outside its Roche limit). Rings are laboratories for disc physics relevant to planet formation.
X: Roche limit for icy particles (ρ = 900 kg m^{-3}) around Saturn (ρ = 690, R = 58 000 km)?
> 2.44 × 58 000 × (690/900)^{1/3} ≈ 2.44 × 58 000 × 0.915 ≈ 130 000 km
X: Mimas orbits at 185 500 km. Where is the 2:1 resonance?
> r = 185 500 × (1/2)^{2/3} ≈ 117 000 km: the Cassini Division
K: Rings live inside the Roche limit; moons sculpt them through resonances and shepherding.
!: Rings aren't solid sheets; they are swarms of independent particles orbiting at Keplerian speeds.
Q: What is the Roche limit? | The distance inside which tidal forces disrupt a body held together only by its gravity.
Q: What creates the Cassini Division? | A 2:1 orbital resonance with the moon Mimas.
M1: Saturn's main rings are about how thick? | 10 m to 1 km | 1000 km | 1 mm | 100 000 km | Extremely thin.
M2: Shepherd moons: | Confine narrow rings | Destroy rings | Are made of rings | Orbit far outside | Gravitational nudging.

## Moons and tidal heating
S: Moons are shaped by tidal forces from their planets, which lock their rotation, alter their orbits and, through flexing, generate internal heat. Tidal heating powers Io's volcanoes and keeps oceans liquid inside Europa and Enceladus.
H: Tides and locking
- Tidal force ∝ 2GMR/d^{3}: differential gravity across a body.
- Friction delays tidal bulges, transferring angular momentum: the Moon recedes ~3.8 cm per year and Earth's day lengthens ~2 ms per century.
- **Tidal locking**: most large moons always show one face.
- Orbits circularise over time unless resonances pump eccentricity.
E: F_{tidal} ≈ 2GMmR/d^{3} :: tidal force on mass m at distance R from centre
E: Ė_{tidal} = (21/2)(k_{2}/Q)(GM^{2}R^{5}nε^{2}/a^{6}) :: tidal heating rate
H: Tidal heating
- Orbital eccentricity makes tidal bulges flex as distance changes.
- **Laplace resonance** (Io : Europa : Ganymede = 1 : 2 : 4) maintains eccentricities.
- **Io**: ~100 TW of tidal heat, ~400 active volcanoes; the most volcanically active body in the solar system.
- **Europa**: ice shell over a global salty ocean, ~100 km deep.
- **Enceladus**: plumes from a south-polar ocean; organic molecules and silica detected by Cassini.
H: Implications
P: Tidal heating extends habitability beyond the classical habitable zone: oceans can exist far from the Sun. Titan's orbit, Triton's retrograde capture and heating, and exoplanet tidal effects (heating and locking in M-dwarf habitable zones) follow similar physics. Missions: Europa Clipper (launched 2024), JUICE (Ganymede, launched 2023).
X: Ratio of lunar to solar tidal forces on Earth.
> (M_{Moon}/M_{Sun})(d_{Sun}/d_{Moon})^{3} = (7.35 × 10^{22}/2 × 10^{30})(3.89 × 10^{2})^{3}
> ≈ 3.7 × 10^{-8} × 5.9 × 10^{7} ≈ 2.2
X: Moon recedes 3.8 cm per year. Distance gained over 100 million years?
> 3.8 × 10^{8} cm ≈ 3800 km
K: Tides lock rotations, evolve orbits and, with forced eccentricity, heat moons internally, sustaining volcanoes and oceans.
!: The Moon dominates Earth's tides even though the Sun's pull is stronger, because tidal force depends on 1/d^{3}.
Q: What maintains Io's eccentricity? | The Laplace resonance with Europa and Ganymede.
Q: Why does the Moon recede from Earth? | Tidal friction transfers Earth's rotational angular momentum to the Moon's orbit.
M1: Tidal force scales with distance as: | 1/d^{3} | 1/d^{2} | 1/d | d | Gradient of gravity.
M2: Enceladus's plumes come from: | A subsurface ocean | Surface volcanoes of lava | Rings | Solar wind | Cassini sampled them.

## Comets and asteroids
S: Comets and asteroids are leftover building blocks of the solar system. Asteroids are rocky or metallic, mostly between Mars and Jupiter; comets are icy bodies from the distant Kuiper belt and Oort cloud that grow tails when they approach the Sun.
H: Asteroids
- Main belt (2.1–3.3 AU); Kirkwood gaps at resonances with Jupiter.
- Types: C (carbonaceous, dark), S (silicate), M (metallic).
- Near-Earth asteroids; Trojans at Jupiter's L4/L5.
- Many are rubble piles (Bennu, Ryugu), loosely bound aggregates.
- Yarkovsky effect: thermal emission slowly changes orbits.
E: a_{Kirkwood} = a_{J}(p/q)^{2/3} :: resonance locations
H: Comets
- Nucleus: dirty snowball of ice, dust and organics, a few km across (67P/Churyumov–Gerasimenko visited by Rosetta).
- Near the Sun, sublimation forms a **coma** and two **tails**: dust tail (curved, radiation pressure) and ion tail (straight, anti-sunward, solar wind).
- Short-period (Kuiper belt, Jupiter family) and long-period (Oort cloud, up to ~100 000 AU).
- Interstellar visitors: 1I/'Oumuamua (2017), 2I/Borisov (2019), 3I/ATLAS (2025).
E: β = F_{rad}/F_{grav} ≈ 5.7 × 10^{-4}Q_{pr}/(ρs) (SI units) :: radiation pressure parameter for dust
H: Planetary defence
P: Surveys (Catalina, ATLAS, Pan-STARRS, Vera Rubin Observatory) find near-Earth objects; NASA's DART mission (2022) changed Dimorphos's orbit by ~33 minutes, proving kinetic deflection. Sample returns (Hayabusa2 from Ryugu, OSIRIS-REx from Bennu) found water-bearing minerals and amino acids, informing the origin of Earth's water and organics.
X: Kirkwood gap at the 3:1 resonance with Jupiter (a = 5.2 AU)?
> a = 5.2 × (1/3)^{2/3} ≈ 5.2 × 0.481 ≈ 2.50 AU
X: Why does a comet's ion tail point straight away from the Sun?
> Ions are swept by the fast solar wind and its magnetic field, much faster than the comet's orbital motion
K: Asteroids and comets are primitive leftovers; resonances sculpt the asteroid belt, and solar heating gives comets their tails.
!: The asteroid belt is mostly empty space; spacecraft pass through it without danger.
Q: What are Kirkwood gaps? | Gaps in the asteroid belt at orbital resonances with Jupiter.
Q: What did DART demonstrate? | That a kinetic impact can change an asteroid's orbit.
M1: A comet's dust tail is pushed by: | Radiation pressure | Solar wind only | Gravity of Jupiter | Magnetic fields | Curved tail.
M2: Bennu and Ryugu are: | Rubble-pile asteroids | Solid iron | Comets | Moons | Loosely bound.

## Meteorites and impact physics
S: Meteorites are pieces of asteroids, the Moon and Mars that survive passage through the atmosphere. Impact physics explains how collisions at kilometres per second shape planetary surfaces, cause mass extinctions and deliver material between worlds.
H: Meteorites
- **Chondrites**: primitive, contain chondrules and CAIs (oldest solids, 4.567 billion years).
- **Achondrites**: melted and differentiated.
- **Iron** and **stony-iron** meteorites: from cores and core–mantle boundaries of shattered planetesimals; Widmanstätten patterns reveal slow cooling.
- Martian (SNC) and lunar meteorites.
- Entry: ablation forms fusion crust; most mass burns away.
E: KE = ½mv^{2}, v ≈ 11–72 km s^{-1} :: entry kinetic energy
H: Cratering
- Impacts at ~20 km s^{-1} release energy far exceeding equivalent explosives (1 kt TNT = 4.18 × 10^{12} J).
- Stages: contact and compression (shock), excavation, modification.
- Crater diameter ~10–20× impactor size; simple (bowl) vs complex (central peaks, terraces).
- Shock indicators: shocked quartz, shatter cones, high-pressure minerals.
E: D ∝ E^{1/3.4} (roughly) :: crater scaling with energy
H: Famous impacts
P: Chicxulub (66 Ma): ~10 km impactor, ~180 km crater, linked to dinosaur extinction via global debris and climate effects. Meteor Crater (Arizona, ~50 000 years). Tunguska (1908): airburst flattening 2000 km^{2} of forest. Chelyabinsk (2013): ~20 m object, airburst ~500 kt, ~1500 injured by glass. Crater counting dates planetary surfaces.
X: Energy of a 20 m stony asteroid (ρ = 3300 kg m^{-3}) at 19 km s^{-1}.
> m = 3300 × (4/3)π × 10^{3} ≈ 1.38 × 10^{7} kg
> KE = ½ × 1.38 × 10^{7} × (1.9 × 10^{4})^{2} ≈ 2.5 × 10^{15} J ≈ 600 kt
X: A 10 km impactor at 20 km s^{-1} (ρ = 3000)?
> m ≈ 1.6 × 10^{15} kg; KE ≈ 3 × 10^{23} J ≈ 7 × 10^{7} Mt TNT
K: High impact speeds make even small objects release enormous energy; crater form and shock features record impacts.
!: Small asteroids often explode in the air rather than reaching the ground; airbursts can still cause widespread damage.
Q: What do Widmanstätten patterns indicate? | Very slow cooling of iron–nickel meteorites inside planetesimal cores.
Q: What links Chicxulub to the dinosaur extinction? | Its age matches the extinction, with an iridium layer and shocked quartz worldwide.
M1: 1 kiloton of TNT equals: | 4.18 × 10^{12} J | 4.18 × 10^{9} J | 1 MJ | 10^{15} J | Standard definition.
M2: Chelyabinsk's damage was mostly from: | The airburst shock wave | A crater | A tsunami | Fire | Shattered windows.

## Planetary formation
S: Planets form in discs of gas and dust around young stars. Dust grows into pebbles and planetesimals, which grow into planets; giant planets must capture gas before the disc disperses within a few million years.
H: Protoplanetary discs
- Collapse of a rotating cloud forms a star plus disc (angular momentum conservation).
- Discs last ~1–10 Myr; ALMA images show rings and gaps (HL Tau).
- **Snow line**: beyond ~3 AU (today's Sun), water ice condenses, increasing solid mass.
E: T(r) ≈ 280 K (r/1 AU)^{−1/2} :: simple disc temperature profile
H: Growth stages
- Dust sticking → pebbles (cm) → planetesimals (km); the "metre barrier" overcome by **streaming instability** concentrating pebbles.
- **Runaway and oligarchic growth** to protoplanets.
- **Pebble accretion**: fast growth of cores by gas-drag-assisted capture.
- **Core accretion**: cores of ~10 Earth masses capture gas rapidly to become giants.
- **Disc instability**: direct gravitational collapse may form distant giants.
E: t_{growth} ∝ a^{3/2}/Σ :: growth time increasing outward
H: Migration and the solar system
P: Gas discs drive migration (Type I for small planets, Type II for gap-opening giants). Hot Jupiters probably migrated inward. The Grand Tack model has Jupiter migrating in then out, truncating Mars's mass; the Nice model's giant planet instability explains Kuiper belt structure and possibly the Late Heavy Bombardment. Isotopes date events: CAIs 4.567 Gyr, Earth–Moon impact ~4.5 Gyr.
X: Disc temperature at 5 AU using the simple profile?
> 280 × 5^{−1/2} ≈ 125 K: beyond the snow line
X: Why do giant planets need to form within a few million years?
> The gas disc disperses; without gas, cores can't accrete massive envelopes
K: Planets grow from dust via pebbles and planetesimals; giant planets race to capture gas before discs vanish, and migration reshapes systems.
!: Planets don't necessarily form where they are found today; migration can move them large distances.
Q: What is the snow line? | The distance beyond which water ice condenses in a protoplanetary disc.
Q: What is the streaming instability? | A gas–dust interaction that concentrates pebbles into dense clumps that collapse into planetesimals.
M1: Protoplanetary discs typically last: | 1–10 million years | 1 billion years | 1000 years | Forever | Gas dispersal.
M2: Hot Jupiters are explained by: | Inward migration | Formation in place always | Captured stars | Tidal heating only | Disc-driven migration.

## Exoplanet detection
S: Thousands of planets have been found orbiting other stars, using methods that detect tiny wobbles, dips in starlight, gravitational lensing and direct images. Each method favours different kinds of planets and reveals different properties.
H: Main methods
- **Transit**: planet blocks starlight; depth = (R_{p}/R_{*})^{2}. Kepler and TESS found thousands.
- **Radial velocity**: Doppler wobble of the star; gives minimum mass M_{p}sin i. Earth induces only ~9 cm s^{-1} on the Sun.
- **Direct imaging**: block starlight with coronagraphs; best for young, massive, distant planets.
- **Microlensing**: planet's gravity briefly magnifies a background star; finds cold and free-floating planets.
- **Astrometry**: star's position wobble (Gaia).
- **Transit timing variations** reveal unseen companions.
E: ΔF/F = (R_{p}/R_{*})^{2} :: transit depth
E: K = (2πG/P)^{1/3} M_{p} sin i/M_{*}^{2/3} :: radial-velocity semi-amplitude (M_{p} ≪ M_{*}, circular)
H: Characterisation
- Transit + RV gives density (rocky vs gaseous).
- Transmission spectroscopy (JWST) detects H_{2}O, CO_{2}, CH_{4}, SO_{2} in atmospheres.
- Phase curves and secondary eclipses measure temperatures.
H: Demographics
P: Over 6000 confirmed exoplanets (2025). Common types: super-Earths and sub-Neptunes, absent in our solar system; a "radius valley" near 1.5–2 Earth radii suggests atmospheric loss. Hot Jupiters are rare (~1% of Sun-like stars). Earth-sized planets in habitable zones exist (TRAPPIST-1 system, Proxima b). Future: PLATO, Roman, Habitable Worlds Observatory.
X: Transit depth of Jupiter across the Sun (R_{J}/R_{☉} ≈ 0.1) and Earth (≈ 0.0092)?
> Jupiter: 1%; Earth: 8.4 × 10^{-5} (84 ppm)
X: Jupiter's RV signal on the Sun (P = 11.9 yr)?
> K ≈ 12.5 m s^{-1}
K: Transits give radius, radial velocity gives mass, and together with spectroscopy they reveal composition and atmospheres.
!: Each method has selection biases; hot, large planets close to their stars are easiest to find, so raw counts don't reflect true populations.
Q: What does the transit method measure? | The planet's radius relative to its star, from the depth of the dip.
Q: Why does radial velocity give only M sin i? | Only the line-of-sight component of the star's motion is measured.
M1: Microlensing is especially good at finding: | Cold planets far from stars and free-floating planets | Hot Jupiters only | Planets around nearby bright stars only | Moons | Lens events are independent of planet brightness.
M2: JWST characterises atmospheres by: | Transmission spectroscopy | Microlensing | Astrometry | Radar | Starlight filtered through atmosphere.

## Orbital dynamics
S: Orbital dynamics describes the motion of planets, moons and spacecraft under gravity. Kepler's laws, energy conservation and orbital manoeuvres let mission designers send probes across the solar system with remarkable precision.
H: Kepler orbits
- Ellipses with the central body at one focus; semi-major axis a, eccentricity e.
- Kepler's third law: T^{2} = 4π^{2}a^{3}/(GM).
- **Vis-viva**: v^{2} = GM(2/r − 1/a).
- Circular speed v_{c} = √(GM/r); escape speed √2 v_{c}.
E: v^{2} = GM(2/r − 1/a) :: vis-viva equation
E: T = 2π√(a^{3}/GM) :: orbital period
H: Manoeuvres
- **Hohmann transfer**: two burns between circular orbits via an ellipse; most fuel-efficient for coplanar orbits.
- **Gravity assists**: swing past planets to gain or lose heliocentric speed (Voyager, Cassini).
- **Plane changes** are costly: Δv = 2v sin(Δi/2).
- Lagrange points: L1/L2 (JWST at Sun–Earth L2), L4/L5 stable.
E: Δv_{1} = √(GM/r_{1})(√(2r_{2}/(r_{1} + r_{2})) − 1) :: first Hohmann burn
H: Perturbations
P: Real orbits are perturbed by planetary oblateness (J_{2} drives nodal precession, used for Sun-synchronous orbits), atmospheric drag, third bodies, solar radiation pressure and relativity (Mercury's perihelion). Three-body dynamics can be chaotic; low-energy transfers exploit invariant manifolds (the "interplanetary superhighway"). Space debris tracking relies on precise orbit determination.
X: Period of a satellite at 400 km altitude (r = 6771 km)?
> T = 2π√((6.771 × 10^{6})^{3}/3.986 × 10^{14}) ≈ 5545 s ≈ 92 min
X: Hohmann transfer time from Earth (1 AU) to Mars (1.52 AU)?
> a = 1.26 AU; T = 1.26^{1.5} yr ≈ 1.41 yr; half = 0.71 yr ≈ 259 days
K: Kepler's laws and vis-viva describe orbits; Hohmann transfers and gravity assists move spacecraft efficiently.
!: To catch up with something ahead in the same orbit, you slow down (drop to a lower, faster orbit), which is counterintuitive.
Q: What is a Hohmann transfer? | A two-burn elliptical transfer between circular coplanar orbits, minimising Δv.
Q: Why is JWST at Sun–Earth L2? | It keeps Sun, Earth and Moon on one side for shielding, with a stable thermal environment.
M1: Escape speed is how many times circular speed? | √2 | 2 | 1 | π | v_{esc} = √2 v_{c}.
M2: Gravity assists change a spacecraft's speed relative to: | The Sun | The planet | Nothing | Light | Exchange with planet's orbital motion.

## Spacecraft propulsion physics
S: Spacecraft propulsion changes velocity by expelling mass at high speed. The rocket equation shows why fuel requirements grow exponentially with Δv, driving the search for high-exhaust-velocity engines like ion drives and nuclear propulsion.
H: The rocket equation
- Δv = v_{e} ln(m_{0}/m_{f}) (Tsiolkovsky).
- Specific impulse I_{sp} = v_{e}/g_{0} (seconds).
- Thrust F = ṁv_{e} + (p_{e} − p_{a})A_{e}.
- Staging discards dead mass to improve mass ratios.
E: Δv = v_{e} ln(m_{0}/m_{f}) :: Tsiolkovsky rocket equation
E: I_{sp} = v_{e}/g_{0} :: specific impulse
H: Engine types
- **Chemical**: solids (I_{sp} ~250 s), kerosene/LOX (~310–350 s), methane/LOX (~330–380 s), hydrogen/LOX (~450 s). High thrust.
- **Electric**: ion thrusters (I_{sp} ~3000–10 000 s), Hall thrusters (~1500–3000 s); low thrust, high efficiency (Dawn, Starlink, BepiColombo).
- **Nuclear thermal**: ~900 s (NERVA, DRACO).
- **Solar sails**: photon pressure (IKAROS, LightSail).
E: F_{sail} = 2IA/c (perfect reflector) :: radiation pressure thrust
H: Δv budgets
P: Low Earth orbit needs ~9.4 km s^{-1} including gravity and drag losses; LEO to Mars transfer ~3.6 km s^{-1}; Moon landing and return add more. Reusable boosters (Falcon 9, Starship) cut costs. Electric propulsion's power-limited thrust means months-long spirals. Breakthrough Starshot proposes laser-driven light sails to reach Alpha Centauri.
X: A rocket with v_{e} = 3.3 km s^{-1} needs Δv = 9.4 km s^{-1}. Mass ratio?
> m_{0}/m_{f} = e^{9.4/3.3} = e^{2.85} ≈ 17: ~94% of launch mass is propellant
X: Ion engine I_{sp} = 3000 s. Exhaust velocity and mass ratio for 5 km s^{-1}?
> v_{e} = 29.4 km s^{-1}; m_{0}/m_{f} = e^{0.17} ≈ 1.19
K: Δv depends logarithmically on mass ratio and linearly on exhaust speed; high I_{sp} engines save propellant but give low thrust.
!: High specific impulse isn't everything; launching from Earth needs high thrust, which only chemical (or nuclear) rockets provide.
Q: What is specific impulse? | Exhaust velocity divided by standard gravity, measuring propellant efficiency.
Q: Why use multiple stages? | Dropping empty tanks and engines improves the mass ratio of later stages.
M1: Hydrogen/LOX engines have I_{sp} around: | 450 s | 3000 s | 100 s | 900 s | High chemical efficiency.
M2: Solar sails get thrust from: | Photon momentum | Solar wind ions mainly | Fuel | Magnetic fields | 2I/c for reflection.

## Remote sensing
S: Remote sensing gathers information about planets from a distance, using reflected sunlight, emitted heat, radar and other signals. Earth observation satellites monitor climate, weather, land use and disasters; planetary missions map surfaces and atmospheres.
H: Passive sensing
- **Visible and near-IR**: reflectance spectra identify vegetation (NDVI), minerals, water.
- **Thermal IR**: surface temperature and emissivity.
- **Microwave radiometry**: soil moisture, sea ice, atmospheric temperature profiles.
- **Spectrometers**: atmospheric gases (CO_{2}, CH_{4}, O_{3}) via absorption lines.
E: NDVI = (NIR − Red)/(NIR + Red) :: vegetation index
E: Δx ≈ 1.22λh/D :: diffraction-limited ground resolution
H: Active sensing
- **Radar** and **synthetic aperture radar (SAR)**: all-weather imaging, topography, deformation (InSAR measures mm-level ground motion).
- **Lidar**: forest height, ice sheet elevation (ICESat-2), aerosols.
- **Radar altimetry**: sea level to ~cm.
- **Gravimetry** (GRACE-FO): groundwater, ice mass changes.
H: Planetary applications
P: Magellan's radar mapped cloud-covered Venus; Cassini radar saw Titan's lakes; HiRISE images Mars at 25 cm per pixel; orbiters map minerals (CRISM) and ice. On Earth, Sentinel and Landsat programmes provide open data on deforestation, floods, crop health and urban growth; satellite methane detection identifies leaks. Spatial, spectral, temporal and radiometric resolutions trade off.
X: A 30 cm telescope at 500 km altitude, λ = 0.5 μm. Diffraction-limited resolution?
> Δx = 1.22 × 5 × 10^{-7} × 5 × 10^{5}/0.3 ≈ 1.0 m
X: Healthy vegetation: NIR = 0.5, red = 0.05. NDVI?
> (0.5 − 0.05)/(0.55) ≈ 0.82: dense healthy vegetation
K: Remote sensing uses reflected, emitted and active signals across the spectrum to map surfaces and atmospheres from orbit.
!: Clouds block visible and IR sensing; radar and microwave instruments are needed for all-weather observations.
Q: What does InSAR measure? | Tiny ground deformations by comparing radar phase between passes.
Q: Why does healthy vegetation reflect strongly in near-infrared? | Leaf cell structure scatters NIR light strongly while chlorophyll absorbs red.
M1: GRACE-FO measures: | Changes in Earth's gravity field | Sea surface temperature | Lightning | Ozone only | Mass redistribution.
M2: SAR works: | Day and night through clouds | Only on clear days | Only at night | Only underwater | Active microwaves.

## Planetary exploration instrumentation
S: Planetary missions carry instruments that measure composition, structure, fields and environment on other worlds. They must be small, light, power-efficient and robust to radiation, temperature extremes and launch vibration, often working millions of kilometres from home.
H: Remote instruments
- Cameras and imaging spectrometers (visible, IR, UV).
- Gamma-ray and neutron spectrometers: surface composition and buried water ice.
- Radar sounders (MARSIS, SHARAD): subsurface layers and ice.
- Magnetometers and plasma instruments: fields and particles.
- Radio science: gravity fields from Doppler tracking; atmospheres from occultations.
H: In situ instruments
- **Mass spectrometers** (SAM on Curiosity): gases and organics.
- **X-ray diffraction** (CheMin): mineralogy.
- **Laser-induced breakdown spectroscopy** (ChemCam, SuperCam): zaps rocks from metres away.
- **Alpha particle X-ray spectrometer**: elemental composition.
- **Seismometers** (InSight SEIS), heat-flow probes, weather stations.
- **Sample caching** (Perseverance) for Mars Sample Return.
E: Data rate ∝ P_{t}G_{t}G_{r}/(d^{2}T_{sys}) :: telecom link budget scaling
H: Engineering constraints
P: Power from solar panels (falls as 1/r^{2}) or RTGs for outer planets; thermal control in extreme environments; radiation hardening (Jupiter's belts); planetary protection to avoid contamination; communication delays (Mars 4–24 min one way) requiring autonomy. Instruments are calibrated pre-flight and with onboard targets. Dragonfly will fly a rotorcraft on Titan (launch 2028).
X: Solar power at Jupiter (5.2 AU) relative to Earth?
> 1/5.2^{2} ≈ 1/27; Juno needs ~60 m^{2} of panels
X: Data rate falls as 1/d^{2}. From 1.5 AU to 9.5 AU (Saturn)?
> (1.5/9.5)^{2} ≈ 0.025: ~40× lower
K: Instruments measure composition, structure and fields remotely or in situ, constrained by power, mass, radiation and distance.
!: Light-time delays prevent real-time control; rovers and landers must operate autonomously.
Q: What does LIBS do on Mars rovers? | A laser vaporises rock to make plasma whose emission spectrum reveals composition.
Q: Why do outer-planet missions often use RTGs? | Sunlight is too weak for practical solar power far from the Sun (though Juno used large panels).
M1: Neutron spectrometers detect: | Hydrogen (water ice) below the surface | Magnetic fields | Visible colour | Sound | Neutron moderation by hydrogen.
M2: One-way light time to Mars ranges from about: | 4 to 24 minutes | 1 second | 1 hour to 1 day | 1 to 2 seconds | Distance varies.

## Habitability and astrobiology interfaces
S: Astrobiology asks where life could exist beyond Earth and how to detect it. Physics sets the conditions: liquid water, energy sources, protection from radiation and stable climates, while spectroscopy searches for biosignatures in alien atmospheres.
H: The habitable zone
- Region where a planet could keep liquid water on its surface.
- Inner edge: runaway greenhouse; outer edge: maximum CO_{2} greenhouse.
- For the Sun: ~0.95–1.7 AU (estimates vary).
- Scales with luminosity: d ∝ √(L/L_{☉}).
E: d_{HZ} ≈ √(L/L_{☉}) AU :: habitable-zone distance scaling
H: Beyond the classical zone
- Subsurface oceans heated by tides or radioactivity (Europa, Enceladus, Ganymede, Titan).
- Requirements: liquid solvent, energy (light, chemical gradients), CHNOPS elements, stability.
- Hazards: stellar flares (M dwarfs), atmospheric loss without magnetic fields, tidal locking.
H: Biosignatures and searches
P: Possible biosignatures: O_{2} with CH_{4} (chemical disequilibrium), O_{3}, N_{2}O, the vegetation "red edge"; false positives from abiotic processes must be ruled out. Mars missions seek ancient life in Jezero crater sediments. Enceladus plume molecules and phosphates make it a strong target. JWST examines TRAPPIST-1 planets; the Habitable Worlds Observatory aims to image Earth-like exoplanets. SETI searches for technosignatures.
X: Habitable zone for a star with L = 0.01 L_{☉}?
> d ≈ √0.01 = 0.1 AU, so very close-in, likely tidally locked
X: Why is O_{2} alone not a definitive biosignature?
> It can build up abiotically, e.g. from water photolysis and hydrogen escape on planets around active stars
K: Habitability needs liquid water, energy and stability; biosignatures must be interpreted carefully against abiotic explanations.
!: Being in the habitable zone doesn't make a planet habitable; atmosphere, magnetic field and history matter.
Q: What is the habitable zone? | The range of orbital distances where liquid water could exist on a planet's surface.
Q: What is a biosignature? | An observable feature, such as gas combinations, indicating the presence of life.
M1: The habitable zone moves outward for: | More luminous stars | Smaller stars | Colder planets | Moons only | d ∝ √L.
M2: A strong biosignature combination is: | O_{2} with CH_{4} | CO_{2} alone | H_{2} alone | N_{2} alone | Chemical disequilibrium.
`;
