// Unit 31: Cosmology. Format: kit/course/notes.js
export default `
## The observable universe
S: The observable universe is the region from which light has had time to reach us since the Big Bang. Because space has expanded, its edge is now about 46 billion light-years away, though the universe is 13.8 billion years old.
H: Size and contents
- Radius ~46.5 billion light-years (comoving); diameter ~93 billion.
- ~2 trillion galaxies (estimate), ~10^{22}–10^{24} stars.
- ~10^{80} protons; ~10^{89} photons (mostly CMB).
- Total mass–energy: ~5% ordinary matter, ~27% dark matter, ~68% dark energy.
H: Horizons
- **Particle horizon**: the farthest distance from which light could have reached us: the edge of the observable universe.
- **Event horizon** (with accelerating expansion): beyond ~16 billion light-years today, light emitted now will never reach us.
- **Hubble sphere**: where recession speed equals c (~14 billion light-years).
H: Beyond what we see
P: The whole universe may be much larger, even infinite. Inflation suggests our observable patch is a tiny part of a vastly larger region. The CMB is the oldest light we can see (the "surface of last scattering"); neutrinos and gravitational waves could in principle probe earlier.
X: Why is the observable universe's radius larger than 13.8 billion light-years?
> Light from the most distant regions was emitted when they were much closer
> Space has expanded since, carrying those regions to ~46 billion light-years now
!: Distant galaxies receding faster than light don't violate relativity; it's space expanding, not motion through space.
Q: What is the particle horizon? | The maximum distance from which light could have reached us since the Big Bang.
Q: How old is the universe? | About 13.8 billion years.
M1: The radius of the observable universe is about: | 46 billion light-years | 13.8 billion | 100 million | Infinite | Comoving.
M2: Ordinary matter makes up about what fraction of the universe's energy? | 5% | 27% | 68% | 50% | Baryons.

## Cosmological principles
S: The cosmological principle states that, on large enough scales, the universe looks the same everywhere (homogeneous) and in every direction (isotropic). It's the foundational assumption that makes cosmology mathematically tractable and is supported by observations.
H: Statements
- **Homogeneity**: same average properties at every location.
- **Isotropy**: same in every direction.
- Isotropy around every point implies homogeneity.
- **Copernican principle**: we don't occupy a special place.
H: Evidence
- CMB temperature uniform to 1 part in 10^{5} across the sky.
- Galaxy surveys: structure becomes uniform above ~100 Mpc ("end of greatness").
- Distribution of radio sources, X-ray background, gamma-ray bursts.
H: Challenges
P: Some observations hint at tension: anomalies in the CMB at large angles (low quadrupole, "axis of evil", cold spot), large structures like the Hercules–Corona Borealis Great Wall, and a possible dipole in distant quasar counts larger than expected. Most cosmologists regard these as statistical flukes or systematics, but they're actively tested.
H: Perfect cosmological principle
- Steady-state theory added "unchanging in time": ruled out by the CMB and evolving galaxy populations.
X: The CMB dipole (3.4 mK) isn't a violation of isotropy. Why?
> It's due to our motion (~370 km s^{-1}) relative to the CMB rest frame
> After subtracting it, the CMB is isotropic to ~10^{-5}
!: The universe is very inhomogeneous on small scales (galaxies, voids); the principle applies only on very large scales.
Q: State the cosmological principle. | On large scales, the universe is homogeneous and isotropic.
Q: What causes the CMB dipole? | Our motion relative to the CMB rest frame.
M1: Above what scale does the universe look homogeneous? | ~100 Mpc | 1 kpc | 1 AU | 1 Gpc only | End of greatness.
M2: The perfect cosmological principle was used by: | Steady-state theory | Big Bang theory | Inflation | ΛCDM | Unchanging in time.

## Expansion of the universe
S: The universe is expanding: distant galaxies are moving apart, not through space but because space itself stretches. The expansion was discovered in the 1920s and has been accelerating for the last ~5 billion years.
H: Describing expansion
E: d(t) = a(t)χ :: proper distance = scale factor × comoving distance
E: H = ȧ/a :: Hubble parameter
- No centre: every observer sees others receding, faster with distance.
- Bound systems (atoms, Solar System, galaxies, clusters) don't expand.
H: History
- Slipher (1912–1917): galaxy redshifts.
- Friedmann (1922), Lemaître (1927): theoretical expanding universes; Lemaître derived the velocity–distance relation.
- Hubble (1929): observed it with Cepheid distances.
- 1998: Riess, Schmidt, Perlmutter found the expansion accelerating using type Ia supernovae (Nobel 2011).
H: The balloon analogy
P: Dots on an inflating balloon all move apart, none at the centre: the surface (2D) represents space. Limits: the balloon's interior and exterior have no counterpart, and real galaxies don't expand. A raisin loaf analogy shows bound raisins stay the same size while dough expands.
X: If the scale factor doubles, what happens to the distance between two unbound galaxies and to the CMB temperature?
> Distance doubles
> CMB temperature halves (T ∝ 1/a)
!: The expansion isn't an explosion into pre-existing space; space itself grows.
Q: What is the scale factor? | The function a(t) describing how distances between unbound objects grow with time.
Q: Who discovered the accelerating expansion? | Riess, Schmidt and Perlmutter's teams using type Ia supernovae (1998).
M1: Galaxies held together by gravity: | Don't expand | Expand with space | Shrink | Vanish | Bound systems.
M2: The CMB temperature scales with scale factor as: | 1/a | a | a^{2} | Constant | Redshift.

## Hubble's law
S: Hubble's law states that galaxies recede at speeds proportional to their distance. The constant of proportionality, the Hubble constant, sets the current expansion rate and the universe's scale and age.
H: The law
E: v = H_{0}d
E: H_{0} ≈ 67–73 km s^{-1} Mpc^{-1}
E: t_{H} = 1/H_{0} ≈ 14 billion years :: Hubble time
H: Measuring H_{0}
- **Distance ladder** (SH0ES): Cepheids and type Ia supernovae: 73.0 ± 1.0.
- **CMB** (Planck, with ΛCDM): 67.4 ± 0.5.
- **TRGB** (tip of the red giant branch): ~70.
- Gravitational-wave standard sirens, lensing time delays, maser distances.
H: The Hubble tension
P: The ~5σ disagreement between early-universe and local measurements is one of cosmology's biggest puzzles. Possible explanations include unrecognised systematics in distance measurements or new physics (early dark energy, extra relativistic species, modified gravity). JWST observations of Cepheids have so far confirmed the local measurements' calibration.
X: Recession speed of a galaxy 100 Mpc away (H_{0} = 70)?
> v = 70 × 100 = 7000 km s^{-1}
!: Hubble's law is linear only at small distances; at high redshift, the relation depends on the expansion history.
Q: State Hubble's law. | Recession velocity is proportional to distance: v = H_{0}d.
Q: What is the Hubble tension? | The disagreement between early-universe (~67) and local (~73) measurements of H_{0}.
M1: The Hubble time 1/H_{0} is roughly: | The age of the universe | The age of the Sun | 1 billion years | Infinite | ~14 Gyr.
M2: Early-universe estimates of H_{0} come from: | The CMB | Cepheids | Supernovae only | Radar | Planck.

## Redshift and distance measurements
S: Redshift measures how much the universe has expanded since light left a source; turning redshift into distance requires a cosmological model. Astronomers use several distance measures, each defined for a different purpose.
H: Redshift
E: 1 + z = λ_{obs}/λ_{emit} = a_{now}/a_{then}
- z = 1: universe half its present size. CMB: z ≈ 1100. Most distant galaxies: z ≈ 14.
H: Distance measures
- **Comoving distance**: distance today in expanding coordinates.
- **Luminosity distance** d_{L}: defined by F = L/(4πd_{L}^{2}); d_{L} = (1 + z) × comoving (flat universe).
- **Angular diameter distance** d_{A}: θ = size/d_{A}; d_{A} = comoving/(1 + z): objects look larger beyond z ≈ 1.6!
- **Light-travel distance**: c × lookback time.
H: Standard candles and rulers
P: Standard candles (known luminosity: Cepheids, type Ia supernovae) give d_{L}; standard rulers (known size: BAO scale, CMB sound horizon) give d_{A}. Comparing d_{L}(z) with models revealed acceleration and constrains dark energy.
X: Light from a galaxy at z = 3: by what factor have wavelengths stretched, and how bright does it look compared with no expansion?
> λ × 4
> Surface brightness falls as (1 + z)^{4} = 256 (Tolman dimming)
!: "Distance" is ambiguous in cosmology; always specify which one, especially at high redshift.
Q: What is luminosity distance? | The distance inferred from observed flux and known luminosity, F = L/(4πd_{L}^{2}).
Q: Why do very distant galaxies appear larger than intermediate ones? | Angular diameter distance decreases beyond z ≈ 1.6: we see them when the universe was smaller.
M1: A galaxy at z = 2 emitted light when the universe was: | 1/3 its current size | Half its size | Twice its size | The same size | 1/(1 + z).
M2: Type Ia supernovae are used as: | Standard candles | Standard rulers | Clocks | Lenses | Known luminosity.

## Friedmann–Lemaître–Robertson–Walker models
S: FLRW models are the family of general-relativistic universes that are homogeneous and isotropic. With the Friedmann equations and the universe's measured contents, they describe its expansion history from the Big Bang to the far future.
H: The metric
E: ds^{2} = c^{2}dt^{2} − a(t)^{2}[dχ^{2} + S_{k}(χ)^{2}dΩ^{2}]
- S_{k} = sin χ (closed), χ (flat), sinh χ (open).
H: Dynamics
E: H^{2}(a) = H_{0}^{2}[Ω_{r}a^{-4} + Ω_{m}a^{-3} + Ω_{k}a^{-2} + Ω_{Λ}]
- Each component dominates in turn: radiation, then matter, then dark energy.
- Equations of state w = p/(ρc^{2}): radiation ⅓, matter 0, Λ −1.
H: Simple solutions
- Radiation only: a ∝ t^{1/2}.
- Matter only (Einstein–de Sitter): a ∝ t^{2/3}; age = (2/3)/H_{0}.
- Λ only (de Sitter): a ∝ e^{Ht}.
- Our universe: matter–Λ transition at z ≈ 0.3 (acceleration began ~5 billion years ago).
H: Fate
P: With Λ dominant, expansion accelerates forever: galaxies beyond the Local Group will vanish from view in ~100 billion years; star formation ends in ~10^{14} years; the universe approaches a cold "heat death". If dark energy grows (phantom, w < −1), a "Big Rip" could tear everything apart; current data are consistent with w ≈ −1, though DESI (2024–25) hints that dark energy may weaken over time.
X: Age of an Einstein–de Sitter universe with H_{0} = 70 km s^{-1} Mpc^{-1}?
> 1/H_{0} = 14.0 Gyr
> Age = (2/3) × 14.0 = 9.3 Gyr: too young for the oldest stars, one historical hint of dark energy
!: FLRW models assume perfect homogeneity; real structure is treated as perturbations on top.
Q: What does the equation of state parameter w describe? | The ratio of pressure to energy density for a cosmic component.
Q: When did cosmic acceleration begin? | About 5 billion years ago (z ≈ 0.6–0.7 for onset of acceleration; Λ dominance near z ≈ 0.3).
M1: A matter-dominated universe expands as: | t^{2/3} | t^{1/2} | e^{Ht} | t | Einstein–de Sitter.
M2: Dark energy as a cosmological constant has w = : | −1 | 0 | ⅓ | 1 | Negative pressure.

## Big Bang cosmology
S: The Big Bang theory states that the universe began about 13.8 billion years ago in an extremely hot, dense state and has been expanding and cooling ever since. It's supported by the expansion, the CMB, light element abundances and cosmic evolution.
H: Timeline
- ~10^{-36}–10^{-32} s: inflation (proposed).
- ~10^{-12} s: electroweak symmetry breaking.
- ~10^{-6} s: quarks bind into protons and neutrons (QCD transition).
- 1 s: neutrinos decouple; ~3 min: nucleosynthesis (H, He, Li).
- 47 000 years: matter–radiation equality.
- 380 000 years: recombination; CMB released.
- 100–200 Myr: first stars (cosmic dawn).
- ~1 Gyr: reionisation complete.
- 9.2 Gyr: Solar System forms. 13.8 Gyr: today.
H: Evidence (the four pillars)
- Hubble expansion.
- Cosmic microwave background (blackbody, 2.725 K).
- Abundances of light elements.
- Evolution of galaxies and quasars over cosmic time.
H: What it doesn't say
P: The Big Bang theory describes the evolution from a hot dense state; it doesn't explain what (if anything) came "before" or caused it. Extrapolating classical GR gives a singularity, but quantum gravity is expected to change the picture. The term "Big Bang" was coined (dismissively) by Fred Hoyle in 1949.
X: Temperature of the universe when the CMB was released (z ≈ 1100)?
> T = 2.725 × (1 + 1100) ≈ 3000 K
!: The Big Bang didn't happen at a point in space; it happened everywhere at once.
Q: What are the four main pieces of evidence for the Big Bang? | Expansion, the CMB, light-element abundances and cosmic evolution of galaxies.
Q: When was the CMB released? | About 380 000 years after the Big Bang.
M1: Big Bang nucleosynthesis happened at about: | 3 minutes | 380 000 years | 1 billion years | 10^{-36} s | First minutes.
M2: Who coined the term "Big Bang"? | Fred Hoyle | Lemaître | Einstein | Hubble | 1949 radio.

## Cosmic microwave background
S: The cosmic microwave background is the afterglow of the Big Bang: light released when the universe became transparent 380 000 years after it began. Its near-perfect blackbody spectrum and tiny fluctuations are cosmology's most precise data.
H: Properties
- Temperature 2.7255 K; peak ~1 mm (160 GHz).
- Perfect blackbody (COBE FIRAS, 1990; Mather and Smoot, Nobel 2006).
- ~410 photons per cm^{3}.
- Dipole (3.4 mK) from our motion; anisotropies ~1 part in 10^{5}.
H: Discovery
P: Predicted by Alpher and Herman (1948). Penzias and Wilson (1965) found unexplained antenna noise at Bell Labs; Dicke's group nearby recognised it as the Big Bang's afterglow (Nobel 1978). It ruled out the steady-state theory.
H: Anisotropies
- Power spectrum peaks from acoustic oscillations in the photon–baryon plasma.
- First peak (~1°): spatial flatness. Peak ratios: baryon and dark matter densities.
- Polarisation: E-modes confirmed; B-modes from primordial gravitational waves sought (CMB-S4, LiteBIRD) to test inflation.
- COBE (1992), WMAP (2001–10), Planck (2009–13), ACT, SPT.
X: Number density of CMB photons from T = 2.725 K?
> n ≈ 2 × 10^{7}T^{3} m^{-3} = 2 × 10^{7} × 20.2 ≈ 4.1 × 10^{8} m^{-3}
> ≈ 410 per cm^{3}
!: The CMB isn't from the Big Bang "moment" itself; it was released 380 000 years later when atoms formed.
Q: Why is the CMB a blackbody? | The early universe was in thermal equilibrium, and expansion preserves the blackbody shape while lowering the temperature.
Q: What does the first acoustic peak's position tell us? | The universe is spatially flat.
M1: The CMB was discovered by: | Penzias and Wilson | Hubble | COBE | Planck | 1965.
M2: CMB anisotropies are about: | 1 part in 10^{5} | 1% | 10% | 1 part in 10^{12} | Tiny.

## Primordial nucleosynthesis
S: In the first few minutes after the Big Bang, protons and neutrons fused into deuterium, helium and a little lithium. The predicted abundances match observations, a major success of the Big Bang theory and a measure of ordinary matter's density.
H: The process
- At ~1 s, weak interactions freeze out: neutron-to-proton ratio ~1/6, falling to ~1/7 by decay.
- Deuterium bottleneck: deuterium is destroyed by energetic photons until T ≈ 0.07 MeV (~3 minutes).
- Then nearly all neutrons end up in helium-4.
- Gaps at A = 5 and 8 block heavier elements; only traces of Li-7.
H: Predictions
E: Y_{p} ≈ 2(n/p)/(1 + n/p) ≈ 0.25 :: helium mass fraction
- D/H ≈ 2.5 × 10^{-5}; ³He/H ~ 10^{-5}; ⁷Li/H ~ 5 × 10^{-10}.
- Abundances depend on the baryon-to-photon ratio η ≈ 6 × 10^{-10}.
H: Results
P: Deuterium measured in distant gas clouds (quasar absorption) gives Ω_{b}h^{2} ≈ 0.022, agreeing with the CMB: ordinary matter is only ~5% of the universe, so dark matter isn't baryonic. Helium agrees well. Lithium-7 is ~3 times lower than predicted: the "lithium problem", possibly from stellar destruction.
X: Helium mass fraction if n/p = 1/7 at nucleosynthesis?
> Y = 2 × (1/7)/(1 + 1/7) = (2/7)/(8/7) = 0.25
!: Big Bang nucleosynthesis made almost no carbon or heavier elements; those came from stars.
Q: What did Big Bang nucleosynthesis produce? | Hydrogen, helium-4 (~25% by mass), deuterium, helium-3 and traces of lithium-7.
Q: Why couldn't BBN make heavier elements? | No stable nuclei at mass 5 or 8, and the universe cooled too fast.
M1: The primordial helium mass fraction is about: | 25% | 75% | 2% | 50% | Y_{p}.
M2: The lithium problem is that observed lithium-7 is: | About three times lower than predicted | Higher | Absent | Exactly right | Unresolved.

## Structure formation
S: Galaxies, clusters and the cosmic web grew from tiny density fluctuations in the early universe, amplified by gravity over billions of years. Dark matter provided the scaffolding; ordinary matter fell in and formed stars.
H: Growth of fluctuations
- Seeds: quantum fluctuations stretched by inflation (nearly scale-invariant, Gaussian).
- Dark matter perturbations grow from matter–radiation equality; baryons coupled to photons can't collapse until recombination, then fall into dark matter wells.
- Linear growth: δ ∝ a in matter domination; slowed by dark energy.
- Non-linear collapse: haloes form when δ ≈ 1.69 (linear theory).
H: Hierarchical (bottom-up) formation
- Small haloes form first, merge into larger ones (cold dark matter).
- Hot dark matter (neutrinos) would erase small structure: ruled out as dominant.
H: Simulations
P: N-body and hydrodynamic simulations (Millennium, Illustris, EAGLE, FLAMINGO) follow billions of particles, reproducing the cosmic web of filaments, walls, voids and clusters seen in galaxy surveys. Galaxy properties need models of gas cooling, star formation and feedback.
X: By what factor has a density fluctuation grown since recombination (z ≈ 1100), assuming matter domination?
> δ ∝ a ∝ 1/(1 + z): about 1100 times
> Fluctuations of 10^{-5} in the CMB (baryons) alone couldn't reach δ ~ 1; dark matter fluctuations started growing earlier
!: Without dark matter, there wouldn't have been enough time to form galaxies from the tiny CMB fluctuations.
Q: What seeded cosmic structure? | Quantum fluctuations stretched to cosmic scales by inflation.
Q: Why is structure formation called hierarchical? | Small objects form first and merge into larger ones.
M1: Hot dark matter would: | Suppress small-scale structure | Form galaxies first | Cause acceleration | Heat the CMB | Free streaming.
M2: The cosmic web consists of: | Filaments, walls, clusters and voids | Uniform gas | Only galaxies | Black holes | Large-scale structure.

## Dark matter
S: Dark matter is invisible matter making up about 27% of the universe's energy (85% of its matter). It interacts through gravity but not light, holds galaxies and clusters together and shaped cosmic structure. Its nature is unknown.
H: Evidence across scales
- Galaxy rotation curves.
- Galaxy cluster dynamics and hot gas (X-rays).
- Gravitational lensing (Bullet Cluster).
- CMB acoustic peaks (third peak needs dark matter).
- Large-scale structure growth and BAO.
- Big Bang nucleosynthesis limits baryons to ~5%.
H: Properties
- Cold (non-relativistic at structure formation).
- Collisionless or weakly self-interacting.
- Stable over the age of the universe.
- Not baryonic.
H: Candidates and searches
P: WIMPs, axions, sterile neutrinos, primordial black holes, ultralight "fuzzy" dark matter. Searches: direct detection underground (LZ, XENONnT), indirect detection of annihilation products (Fermi, AMS-02), collider production (LHC), axion haloscopes (ADMX), astrophysical constraints from dwarf galaxies and lensing. No detection yet.
X: Ratio of dark matter to baryon density from Ω_{c} = 0.26 and Ω_{b} = 0.049?
> 0.26/0.049 ≈ 5.3
!: Dark matter isn't the same as dark energy; one attracts and clumps, the other is smooth and drives acceleration.
Q: What fraction of matter is dark? | About 85%.
Q: Why can't dark matter be ordinary matter? | Nucleosynthesis and the CMB limit baryons to ~5% of the universe, far below total matter.
M1: The Bullet Cluster shows dark matter: | Separated from hot gas | Is hot gas | Doesn't exist | Is dark energy | Lensing offset.
M2: Cold dark matter means it was: | Non-relativistic when structures formed | At 0 K | Frozen | Inside stars | Slow-moving.

## Dark energy
S: Dark energy is the mysterious component causing the universe's expansion to accelerate. Making up about 68% of the universe's energy, it acts like a smooth energy with negative pressure, possibly the energy of empty space.
H: Evidence
- Type Ia supernovae fainter than expected (1998).
- CMB: flat geometry plus matter density ~0.31 implies a missing ~0.69.
- BAO and galaxy clustering; weak lensing; cluster counts.
- Age of the universe consistent with oldest stars.
H: Properties
E: w = p/(ρc^{2}) ≈ −1
- Smooth: doesn't clump.
- Repulsive gravity when w < −⅓.
- Density nearly constant as the universe expands (for w = −1).
H: Candidates
- **Cosmological constant Λ** (vacuum energy).
- **Quintessence**: a slowly rolling scalar field with w varying.
- **Modified gravity**: changes to GR on large scales.
H: Latest results
P: DESI's BAO measurements (2024–25), combined with supernovae and the CMB, hint at dynamical dark energy (w evolving, possibly weakening) at ~3–4σ. Euclid, Rubin and Roman will test this. If confirmed, it would overturn the simple cosmological constant.
X: How does dark energy density compare with matter density at z = 1 (Ω_{Λ} = 0.69, Ω_{m} = 0.31 today, w = −1)?
> Matter ∝ (1 + z)^{3}: 0.31 × 8 = 2.48; Λ stays 0.69
> Matter dominated by ~3.6× at z = 1
!: Dark energy's effects are only significant on cosmic scales; it doesn't affect the Solar System measurably.
Q: What is dark energy? | The component causing the accelerating expansion, with negative pressure.
Q: What equation of state does a cosmological constant have? | w = −1.
M1: Dark energy makes up about: | 68% of the universe | 27% | 5% | 95% | Largest component.
M2: DESI results hint that dark energy may be: | Evolving over time | Exactly constant | Nonexistent | Made of neutrinos | Dynamical.

## Cosmological constant
S: The cosmological constant Λ is a term in Einstein's equations representing a constant energy density of empty space. Einstein added and abandoned it; it returned as the simplest explanation for cosmic acceleration, with a deep puzzle about its size.
H: History
- Einstein (1917): added Λ to allow a static universe.
- After Hubble's expansion discovery, Einstein reportedly called it his "biggest blunder".
- 1998: acceleration revived it.
H: Physics
E: ρ_{Λ} = Λc^{2}/(8πG) ≈ 6 × 10^{-27} kg m^{-3}
- Equivalent to vacuum energy with p = −ρc^{2}.
- Its density stays constant while matter dilutes: it inevitably dominates.
H: The cosmological constant problem
P: Quantum field theory predicts vacuum energy from zero-point fluctuations; naive estimates with a Planck-scale cut-off exceed the observed value by ~10^{120}, "the worst prediction in physics". Even with supersymmetry, the mismatch is ~10^{60}. Why Λ is so small but not zero, and why it's comparable to matter density today ("coincidence problem"), is unexplained. Anthropic arguments in a multiverse are one controversial response.
X: Vacuum energy in a cubic metre at the observed density?
> E = ρ_{Λ}c^{2} = 6 × 10^{-27} × 9 × 10^{16} ≈ 5 × 10^{-10} J
!: The cosmological constant isn't a force pushing galaxies apart locally; its effect is negligible within bound systems.
Q: Why did Einstein introduce the cosmological constant? | To allow a static universe.
Q: What is the cosmological constant problem? | Quantum field theory predicts vacuum energy vastly larger (~10^{120}) than observed.
M1: The cosmological constant behaves like: | Vacuum energy with negative pressure | Dark matter | Radiation | Ordinary matter | w = −1.
M2: The coincidence problem asks why: | Dark energy and matter densities are similar today | Λ is negative | Galaxies exist | The CMB is uniform | Fine-tuned timing.

## Inflationary cosmology
S: Inflation is a proposed period of extremely rapid exponential expansion in the first ~10^{-32} s. It explains why the universe is so flat and uniform and provides the seeds of all cosmic structure from quantum fluctuations.
H: Problems it solves
- **Horizon problem**: why opposite sides of the CMB, never in causal contact in standard Big Bang, have the same temperature.
- **Flatness problem**: why the universe is so close to flat.
- **Monopole problem**: why no relic magnetic monopoles are seen.
H: Mechanism
- A scalar field (the inflaton) with large potential energy acts like a temporary cosmological constant.
- Expansion by at least ~e^{60} (~10^{26}).
- Inflation ends when the field rolls to its minimum; its energy reheats the universe into hot particles.
H: Predictions (confirmed)
- Flat geometry (Ω_{k} ≈ 0).
- Nearly scale-invariant fluctuations: spectral index n_{s} ≈ 0.965 (slightly below 1, as predicted).
- Gaussian, adiabatic perturbations; superhorizon correlations.
H: Still to test
P: Inflation predicts primordial gravitational waves, giving B-mode CMB polarisation; current limits (tensor-to-scalar ratio r < 0.036) rule out the simplest models. The BICEP2 claim (2014) turned out to be dust. Guth (1981), Linde, Albrecht and Steinhardt developed the theory; eternal inflation and multiverse implications remain controversial.
X: Expansion factor for 60 e-folds?
> e^{60} ≈ 10^{26}
!: Inflation doesn't explain the origin of the universe; it describes a phase within its early history.
Q: What three problems does inflation solve? | The horizon, flatness and monopole problems.
Q: What would detecting primordial B-modes confirm? | Gravitational waves from inflation.
M1: Inflation was first proposed by: | Alan Guth | Einstein | Hubble | Hawking | 1981.
M2: The measured scalar spectral index is about: | 0.965 | 1.5 | 0 | 2 | Slightly red tilt.

## Baryon acoustic oscillations
S: Before recombination, sound waves rippled through the hot plasma of photons and baryons. When the universe became transparent, they froze in place, leaving a characteristic separation of ~150 Mpc between galaxies: a cosmic standard ruler.
H: Physics
- Overdensities launched spherical sound waves at ~c/√3.
- At recombination (~380 000 years), photons decoupled; baryon shells stopped at the sound horizon r_{s} ≈ 147 Mpc (comoving).
- Dark matter at the centre and baryons in the shell both seeded galaxies.
H: Observations
- CMB acoustic peaks: the same physics seen at z ≈ 1100.
- First detected in galaxy clustering in 2005 (SDSS, 2dFGRS): a bump in the correlation function at ~150 Mpc.
- Now measured with BOSS, eBOSS, DESI (tens of millions of galaxies and quasars).
H: Uses
P: Comparing the known ruler length with its apparent size at different redshifts gives d_{A}(z) and H(z), mapping the expansion history and dark energy. BAO is robust because the ruler is set by simple early-universe physics, largely immune to galaxy astrophysics.
X: Angular size of the BAO scale at a comoving distance of 3000 Mpc?
> θ ≈ 147/3000 = 0.049 rad ≈ 2.8°
!: The BAO signal is statistical: a slight excess of galaxy pairs at ~150 Mpc separation, not visible rings around individual galaxies.
Q: What are baryon acoustic oscillations? | Frozen sound waves from the early universe, imprinting a preferred galaxy separation of ~150 Mpc.
Q: Why is BAO a good standard ruler? | Its scale is set by well-understood early-universe physics.
M1: The BAO scale is about: | 150 Mpc | 1 Mpc | 15 kpc | 1.5 Gpc | Sound horizon.
M2: BAO was first detected in galaxy surveys in: | 2005 | 1965 | 1998 | 2020 | SDSS and 2dF.

## Large-scale structure
S: On scales of millions of light-years, galaxies form a cosmic web: dense clusters linked by filaments and sheets surrounding vast empty voids. Its statistics test cosmological models and the nature of dark matter and dark energy.
H: Components
- **Galaxy groups and clusters**: up to ~10^{15} M_{⊙}; Virgo, Coma.
- **Superclusters**: Laniakea (our home supercluster, ~500 million light-years).
- **Filaments and walls**: Sloan Great Wall (~1.4 billion light-years).
- **Voids**: ~30–300 Mpc; Boötes Void.
H: Statistics
E: ξ(r) :: two-point correlation function: excess probability of galaxy pairs
E: P(k) :: power spectrum: fluctuation amplitude versus scale
- σ_{8}: amplitude of fluctuations on 8 h^{-1} Mpc scales.
- Redshift-space distortions: peculiar velocities distort maps, measuring growth rate.
H: Tensions
P: Weak lensing surveys find slightly lower clustering (S_{8}) than predicted from the CMB in ΛCDM (~2–3σ), the "S_{8} tension". Possible causes include baryonic feedback, systematics or new physics. Cosmic voids and the largest structures provide further tests.
X: Why does the cosmic web form filaments?
> Gravitational collapse amplifies anisotropies: collapse happens first along one axis (sheets), then two (filaments), then three (haloes)
> Zel'dovich approximation explains this "pancake" formation
!: Large-scale structure isn't static; galaxies flow along filaments towards clusters.
Q: What is the cosmic web? | The network of galaxy clusters, filaments and sheets surrounding cosmic voids.
Q: What is the S_{8} tension? | Weak lensing measures less clumpy matter than ΛCDM predicts from the CMB.
M1: Our home supercluster is: | Laniakea | Virgo | Coma | Shapley | 2014.
M2: The correlation function measures: | Excess probability of galaxy pairs at given separations | Galaxy temperatures | Star formation | Black hole spin | Clustering.

## Galaxy surveys
S: Galaxy surveys map the positions, distances and properties of millions to billions of galaxies. They trace large-scale structure, measure cosmic expansion and growth, and test dark energy and gravity.
H: Types
- **Spectroscopic**: precise redshifts (3D maps): 2dFGRS, SDSS/BOSS/eBOSS, DESI (40 million+ redshifts).
- **Photometric**: many galaxies, approximate redshifts from colours: DES, KiDS, HSC, Rubin LSST, Euclid.
- **Radio**: 21 cm hydrogen surveys; SKA; intensity mapping.
- **Sky surveys in other bands**: eROSITA (X-ray clusters), Gaia (Milky Way).
H: What they measure
- BAO (standard ruler).
- Redshift-space distortions (growth rate fσ_{8}).
- Weak lensing (dark matter distribution).
- Cluster counts (sensitive to σ_{8} and Ω_{m}).
- Galaxy evolution and populations.
H: Challenges
P: Surveys produce petabytes of data; systematic errors (photometric redshift biases, shape measurement, selection effects, dust) must be controlled to ~0.1% level. Blind analyses and end-to-end simulations guard against bias. Machine learning helps classify objects and estimate redshifts.
X: How many galaxies will Rubin LSST catalogue?
> About 20 billion galaxies over ten years
!: Photometric redshifts are approximate (errors ~0.02–0.05 × (1 + z)); spectroscopic surveys are needed for precise 3D clustering.
Q: What's the difference between spectroscopic and photometric surveys? | Spectroscopic gives precise redshifts for fewer objects; photometric gives approximate redshifts for many more.
Q: What does DESI measure? | Baryon acoustic oscillations and redshift-space distortions from tens of millions of galaxy redshifts.
M1: Redshift-space distortions measure: | The growth rate of structure | Galaxy colours | Star ages | Black hole masses | Peculiar velocities.
M2: The Vera C. Rubin Observatory performs: | A wide photometric survey (LSST) | Spectroscopy only | Radio surveys | X-ray surveys | Legacy Survey of Space and Time.

## Cosmic distance ladder
S: The cosmic distance ladder measures distances step by step: each method calibrates the next, reaching from the Solar System to the edge of the observable universe. It's how astronomers measure the Hubble constant locally.
H: The rungs
- **Radar and parallax**: Solar System; stellar parallax (Gaia: ~1% to thousands of light-years).
- **Main-sequence fitting**: star clusters.
- **Cepheid variables**: period–luminosity relation (Leavitt, 1912) to ~40 Mpc.
- **Tip of the red giant branch (TRGB)**, **J-region AGB stars**.
- **Type Ia supernovae**: to billions of light-years.
- **Tully–Fisher, fundamental plane, surface brightness fluctuations**.
- **Redshift**: with a cosmological model.
H: Anchors
- Gaia parallaxes of Milky Way Cepheids.
- Detached eclipsing binaries in the Large Magellanic Cloud.
- Water masers in NGC 4258.
H: Systematics
P: Errors propagate up the ladder: dust extinction, metallicity effects on Cepheids, crowding in distant galaxies, supernova standardisation. The Hubble tension prompted checks with JWST (sharper Cepheid photometry) and independent rungs (TRGB, JAGB); results remain debated.
X: Parallax of a star at 100 pc?
> p = 1/d = 0.01″ = 10 milliarcseconds
!: Each rung's uncertainty adds to the next; that's why independent anchors and methods matter.
Q: What is Leavitt's law? | Cepheid variables' periods correlate with their luminosities.
Q: What is the most direct way to measure stellar distances? | Trigonometric parallax.
M1: Gaia measures distances using: | Parallax | Redshift | Supernovae | Cepheids only | Astrometry.
M2: A star with parallax 0.1″ is at: | 10 pc | 0.1 pc | 100 pc | 1 pc | d = 1/p.

## Age and geometry of the universe
S: Combining the expansion rate and the universe's contents gives its age, 13.8 billion years, and its geometry, flat to within 0.2%. Independent ages from the oldest stars agree.
H: The age
E: t_{0} = ∫da/(aH(a))
- ΛCDM with Planck parameters: 13.797 ± 0.023 Gyr.
- Oldest stars: ~12–13.5 Gyr (globular clusters, metal-poor stars like HD 140283).
- White dwarf cooling ages; radioactive dating of old stars (uranium, thorium).
H: Geometry
- Curvature parameter Ω_{k} = 1 − Ω_{total}: measured |Ω_{k}| < 0.002.
- Flat: triangles have angles summing to 180°; parallel lines stay parallel.
- Closed (positive curvature): finite volume, angles > 180°.
- Open (negative): angles < 180°.
H: How we measure geometry
P: The CMB's acoustic peaks have a known physical size (the sound horizon at recombination); their angular size (~1°) depends on geometry. In a closed universe, they'd look larger; in an open one, smaller. Combined with BAO, the data show a flat universe, as inflation predicts.
X: Why was a 1990s Hubble constant near 80 a problem without dark energy?
> Einstein–de Sitter age = (2/3)/H_{0} ≈ 8 Gyr
> Younger than the oldest stars (~12 Gyr): dark energy resolves this
!: "Flat" refers to spatial geometry; spacetime is still curved because of expansion.
Q: How old is the universe? | About 13.8 billion years.
Q: How does the CMB reveal geometry? | The angular size of acoustic peaks (a known ruler) depends on spatial curvature.
M1: The universe's spatial curvature is: | Consistent with flat | Strongly positive | Strongly negative | Unmeasured | |Ω_{k}| < 0.002.
M2: The oldest stars are about: | 12–13.5 billion years old | 4.6 billion | 20 billion | 1 billion | Globular clusters.

## Open, flat and closed cosmologies
S: The overall geometry of the universe depends on its total density compared with the critical density. Closed universes curve back on themselves, open ones curve like saddles, and flat ones follow Euclidean geometry.
H: The three cases
- **Closed** (Ω > 1, k = +1): finite volume; like a 3D sphere's surface; without Λ, recollapses (Big Crunch).
- **Flat** (Ω = 1, k = 0): infinite (in the simplest topology); Euclidean.
- **Open** (Ω < 1, k = −1): infinite; hyperbolic; expands forever.
H: With dark energy
- Geometry and fate decouple: a closed universe with enough Λ still expands forever.
- Our universe: flat, accelerating, expanding forever (if Λ stays constant).
H: Topology
P: Geometry is local curvature; topology is global shape. A flat universe could be finite if it wraps around (like a 3-torus). Searches for repeated patterns ("circles in the sky") in the CMB find no evidence of small topology, so any wrapping is larger than the observable universe.
X: Critical density today (H_{0} = 67.4 km s^{-1} Mpc^{-1})?
> ρ_{c} = 3H_{0}^{2}/(8πG) ≈ 8.5 × 10^{-27} kg m^{-3}
> About 5 hydrogen atoms per cubic metre
!: A flat universe isn't flat like a sheet of paper; it's three-dimensional space with zero curvature.
Q: What determines whether the universe is open, flat or closed? | Its total density relative to the critical density.
Q: Does a closed universe necessarily recollapse? | No; with enough dark energy, it can expand forever.
M1: Ω > 1 corresponds to: | Closed (positive curvature) | Open | Flat | Static | k = +1.
M2: The critical density is about: | 5 hydrogen atoms per m^{3} | 1 g cm^{-3} | 1 atom per km^{3} | Water density | ~10^{-26} kg m^{-3}.

## Matter-energy density parameters
S: The universe's contents are summarised by density parameters: each component's density as a fraction of the critical density. Measuring them precisely is the main goal of observational cosmology.
H: Definitions
E: Ω_{i} = ρ_{i}/ρ_{c}; Σ Ω_{i} + Ω_{k} = 1
H: Current values (Planck + BAO)
- Ω_{Λ} ≈ 0.685 (dark energy).
- Ω_{c} ≈ 0.265 (cold dark matter).
- Ω_{b} ≈ 0.049 (baryons).
- Ω_{ν} ≈ 0.001–0.003 (neutrinos).
- Ω_{γ} ≈ 5 × 10^{-5} (photons).
- Ω_{k} ≈ 0.
H: Where baryons are
P: Of the baryons, stars hold ~7%, cold gas a few per cent, and most is in hot gas around galaxies and in the warm–hot intergalactic medium. Fast radio bursts' dispersion measures (2020) found the "missing baryons" in intergalactic space, confirming the census.
H: The Hubble parameter h
- Densities often quoted as Ω_{i}h^{2} (physical density), e.g. Ω_{b}h^{2} = 0.0224.
X: Matter density fraction at z = 3 (Ω_{m} = 0.31, Ω_{Λ} = 0.69 today)?
> Matter: 0.31 × 64 = 19.8; Λ: 0.69
> Ω_{m}(z = 3) = 19.8/20.5 ≈ 0.97: matter dominated
!: Density parameters change with time; quoted values are today's.
Q: What is a density parameter? | A component's density divided by the critical density.
Q: Where are most of the universe's baryons? | In hot, diffuse gas around and between galaxies.
M1: Baryons make up about what fraction of all matter? | ~16% | 50% | 85% | 100% | 0.049/0.31.
M2: Fast radio bursts helped locate: | The missing baryons | Dark matter | Dark energy | Neutrinos | Dispersion measures.

## Modified gravity
S: Modified gravity theories change general relativity on large scales or at low accelerations, aiming to explain cosmic acceleration or galaxy dynamics without dark energy or dark matter. Observations increasingly constrain them.
H: Motivations
- Explain acceleration without a cosmological constant.
- Explain galaxy rotation without dark matter (MOND).
- Address the cosmological constant problem.
H: Examples
- **f(R) gravity**: replaces R in the action with a function f(R).
- **Scalar–tensor** (Brans–Dicke, Horndeski theories).
- **DGP braneworld**: gravity leaks into extra dimensions.
- **Massive gravity**: graviton with tiny mass.
- **MOND/TeVeS**: modified dynamics below a ~10^{-10} m s^{-2}.
H: Screening and tests
P: Modifications must hide in the Solar System (screening mechanisms: chameleon, Vainshtein) where GR is tested to high precision. GW170817 showed gravitational waves travel at c to 10^{-15}, ruling out many scalar–tensor theories in one stroke. Surveys compare expansion (geometry) with structure growth and lensing; GR plus Λ still fits, though dark energy evolution hints keep the question open.
X: Why did GW170817 kill many modified gravity models?
> Gravitational waves and light arrived 1.7 s apart after 130 million years
> |c_{GW} − c|/c < 10^{-15}: theories predicting different speeds were excluded
!: Modified gravity must reproduce all the successes of GR, from GPS to binary pulsars; that's a demanding requirement.
Q: What is a screening mechanism? | A way for modified gravity effects to be suppressed in dense regions like the Solar System.
Q: What is MOND? | Modified Newtonian Dynamics, altering gravity at very low accelerations to explain galaxy rotation without dark matter.
M1: GW170817 constrained the speed of gravity to equal c within: | 10^{-15} | 1% | 10% | 10^{-3} | Arrival times.
M2: f(R) gravity modifies: | The Einstein–Hilbert action | Newton's constant only | Quantum mechanics | The speed of light | R → f(R).

## Cyclic and alternative cosmological models
S: Besides the standard inflationary Big Bang, physicists explore alternatives: cyclic universes, bouncing cosmologies and steady-state theories. They address the origin of the Big Bang and the initial conditions inflation assumes.
H: Historical alternatives
- **Steady state** (Hoyle, Bondi, Gold, 1948): continuous creation of matter; ruled out by the CMB and evolving radio source counts.
- **Tired light**: redshift from photons losing energy; ruled out by time dilation of supernova light curves and the CMB spectrum.
H: Modern alternatives
- **Ekpyrotic/cyclic** (Steinhardt, Turok): colliding branes or repeated bounces; slow contraction smooths the universe instead of inflation. Predicts negligible primordial gravitational waves.
- **Conformal cyclic cosmology** (Penrose): aeons connected through conformal rescaling; claimed signals ("Hawking points") disputed.
- **Loop quantum cosmology bounce**: quantum gravity replaces the singularity with a bounce.
- **String gas cosmology, emergent universes**.
H: Testing them
P: Primordial gravitational waves (B-modes) would favour inflation over ekpyrotic models; non-Gaussianity and spectral tilt also distinguish them. The question "what came before the Big Bang?" may be meaningful only in a quantum theory of gravity.
X: How did type Ia supernova light curves rule out tired light?
> Distant supernovae's light curves are stretched by (1 + z) (cosmological time dilation)
> Tired-light models predict no stretching
!: Alternatives aren't fringe if they make testable predictions; the steady-state theory was respectable until data refuted it.
Q: Why was the steady-state theory abandoned? | The CMB and evolving galaxy and quasar populations contradicted it.
Q: How could B-mode polarisation discriminate between inflation and cyclic models? | Inflation predicts primordial gravitational waves; ekpyrotic models predict almost none.
M1: Supernova time dilation rules out: | Tired light | The Big Bang | Dark energy | Inflation | Light-curve stretching.
M2: Loop quantum cosmology replaces the Big Bang singularity with: | A bounce | A black hole | Nothing | Inflation | Quantum geometry.

## Observational constraints on cosmology
S: Modern cosmology combines many independent observations, each constraining different parameters. The six-parameter ΛCDM model fits them remarkably well, though several tensions hint at possible new physics.
H: Main probes
- **CMB** (Planck, ACT, SPT): Ω_{b}h^{2}, Ω_{c}h^{2}, n_{s}, A_{s}, τ, θ_{*}.
- **BAO** (DESI): expansion history.
- **Type Ia supernovae** (Pantheon+, DES): relative distances, dark energy.
- **Weak lensing and galaxy clustering** (DES, KiDS, HSC, Euclid): growth of structure, S_{8}.
- **Cluster counts**, **local H_{0}**, **BBN**, **gravitational-wave sirens**.
H: The six ΛCDM parameters
- Baryon density, dark matter density, angular sound horizon, optical depth to reionisation, amplitude and tilt of primordial fluctuations.
- Derived: H_{0} ≈ 67.4, Ω_{m} ≈ 0.315, age 13.8 Gyr, σ_{8} ≈ 0.81.
H: Tensions
P: H_{0} (~5σ), S_{8} (~2–3σ), and hints of evolving dark energy (~3–4σ) are under scrutiny. Each could be systematics or new physics; upcoming data from DESI, Euclid, Rubin, Roman, Simons Observatory and CMB-S4 should decide. Neutrino mass sums are constrained below ~0.07–0.12 eV, near the minimum from oscillations.
X: Why combine probes rather than rely on one?
> Each probe has different degeneracies between parameters
> Combining breaks degeneracies and cross-checks systematics
!: A good fit doesn't prove a model; ΛCDM fits well but leaves dark matter and dark energy unexplained.
Q: How many free parameters does basic ΛCDM have? | Six.
Q: Name two current tensions in cosmology. | The Hubble tension and the S_{8} tension (also evolving dark energy hints).
M1: Cosmological data constrain the sum of neutrino masses to below about: | 0.1 eV | 10 eV | 1 keV | 1 eV | Tight bound.
M2: Combining probes helps by: | Breaking parameter degeneracies | Hiding errors | Removing dark energy | Lowering costs only | Complementary constraints.
`;
