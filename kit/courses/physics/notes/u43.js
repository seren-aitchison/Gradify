// Unit 43: Nuclear and Particle Detection Methods. Format: kit/course/notes.js
export default `
## Ionisation chambers
S: An ionisation chamber measures radiation by collecting the electrons and ions it creates in a gas. With no gas amplification, the signal is directly proportional to the energy deposited, making ion chambers the reference instruments for radiation dosimetry and beam monitoring.
H: How it works
- A gas-filled volume between two electrodes with a voltage of ~100–1000 V.
- Radiation ionises gas atoms; electrons and positive ions drift to the electrodes.
- At this voltage all charge is collected, but none is multiplied (gain = 1): the "saturation" region.
- Average energy to make an ion pair in air W ≈ 33.97 eV.
E: Q = eE_{dep}/W :: collected charge
E: D = (Q/m_{air})(W/e) :: absorbed dose in air
H: Operating regions of gas detectors
- Recombination region (too low voltage), ionisation chamber region, proportional region, limited proportional, Geiger–Müller region, continuous discharge.
- Ion chambers sit on the flat plateau where current is independent of voltage.
H: Uses
P: Thimble chambers (Farmer type, 0.6 cm^{3}) calibrate radiotherapy linacs to ~1%; parallel-plate chambers measure electron beams; well chambers check radiopharmaceutical activity; large ion chambers monitor beam loss in accelerators and area radiation. Corrections for temperature, pressure, recombination and polarity are applied. Pulse-mode ion chambers (Frisch grid) do alpha spectroscopy.
E: k_{TP} = (273.15 + T)/(293.15) × (101.325/P) :: temperature–pressure correction
X: A chamber collects 1 nC. How much energy was deposited in the air?
> N = 10^{-9}/1.6 × 10^{-19} ≈ 6.25 × 10^{9} ion pairs
> E = 6.25 × 10^{9} × 34 eV ≈ 2.1 × 10^{11} eV ≈ 34 nJ
X: A chamber at 25 °C and 98 kPa: correction factor?
> k_{TP} = (298.15/293.15)(101.325/98) ≈ 1.017 × 1.034 ≈ 1.052
K: Ion chambers collect all ionisation charge without multiplication, giving a stable, energy-proportional signal ideal for dosimetry.
!: Ion chamber signals are tiny (pA–nA); electrometer leakage and environmental corrections matter.
Q: What is W for air? | About 34 eV per ion pair.
Q: Why is an ion chamber operated on the saturation plateau? | All charge is collected without amplification, so the signal is independent of small voltage changes.
M1: An ionisation chamber's gas gain is: | 1 | 10^{3} | 10^{6} | 0 | No multiplication.
M2: Ion chambers are the reference instrument for: | Radiotherapy dosimetry | Particle tracking | Photon counting | Time-of-flight | Stable, absolute dose.

## Geiger–Müller counters
S: A Geiger–Müller tube produces a large, uniform pulse each time radiation triggers an avalanche in its gas. It is cheap, simple and sensitive, ideal for detecting and counting radiation, but it cannot measure particle energy.
H: How it works
- A thin central anode wire at high voltage (~400–1000 V) inside a cylindrical cathode with low-pressure gas (e.g. Ne or Ar).
- Strong field near the wire (E ∝ 1/r) multiplies electrons in an avalanche.
- In the GM region, UV photons spread the discharge along the whole wire: every event gives the same large pulse regardless of energy.
- A quench gas (halogen or alcohol) stops the discharge.
E: E(r) = V/(r ln(b/a)) :: field in a cylindrical counter
H: Dead time
- After each pulse the tube is insensitive for τ ~ 50–200 μs.
- At high rates, counts are lost.
- Non-paralysable correction: n = m/(1 − mτ), where m is measured rate.
E: n = m/(1 − mτ) :: dead-time correction
H: Uses and limits
P: GM counters are used for contamination monitoring, survey meters, school experiments and environmental monitoring. Thin mica end-windows let alpha and beta particles in; gamma detection efficiency is low (~1%). They count, but can't distinguish radiation types or energies; dose-rate readings depend on energy calibration (energy-compensated tubes help).
X: A GM counter with τ = 100 μs reads 2000 counts s^{-1}. True rate?
> n = 2000/(1 − 0.2) = 2500 counts s^{-1}
X: Field at the wire surface (a = 25 μm, b = 1 cm, V = 800 V)?
> ln(b/a) = ln 400 ≈ 6.0
> E = 800/(25 × 10^{-6} × 6) ≈ 5.3 × 10^{6} V m^{-1}
K: GM tubes give large identical pulses ideal for counting, but no energy information and significant dead time.
!: GM counters saturate in very high fields and can read low or even zero ("fold-back") at extreme dose rates.
Q: What is a quench gas for? | It stops the self-sustaining discharge after each pulse.
Q: Why can't a GM tube measure energy? | Every event triggers a full discharge of the same size.
M1: GM dead time causes the measured rate to be: | Lower than true | Higher than true | Exact | Random | Missed events.
M2: GM tubes detect gamma rays with efficiency around: | 1% | 50% | 99% | 0% | Gas has low stopping power.

## Scintillation detectors
S: Scintillation detectors convert radiation energy into flashes of visible light, which photodetectors turn into electrical pulses. Large crystals give high efficiency and energy information, and fast plastics give nanosecond timing, so scintillators are used everywhere from PET scanners to particle physics.
H: Scintillator types
- **Inorganic crystals**: NaI(Tl) (38 photons per keV, energy resolution ~7% at 662 keV), CsI(Tl), BGO (dense, Z_{eff} ~ 74), LYSO (fast, dense), LaBr_{3}(Ce) (~3% resolution).
- **Organic/plastic**: fast (~2 ns decay), cheap, large; low Z, good for charged particles and neutrons.
- **Liquid scintillators**: large neutrino detectors (KamLAND, JUNO), pulse-shape discrimination for neutrons.
- **Noble liquids**: liquid argon and xenon for dark matter and neutrinos.
H: Performance
- Light yield, decay time, density/Z (stopping power), refractive index, emission wavelength matched to photodetector.
- Energy resolution limited by photon statistics: R ∝ 1/√N_{pe}.
- **Pulse-shape discrimination**: different particles produce different pulse shapes (neutron vs gamma).
E: R(FWHM) ≈ 2.355/√N_{pe} :: statistical resolution limit
H: Gamma spectra
P: A gamma spectrum from a scintillator shows the photopeak (full absorption), the Compton continuum and edge, backscatter peak and, above 1.022 MeV, escape peaks from pair production. Efficiency depends on crystal size and density. Readout uses photomultipliers or silicon photomultipliers.
E: E_{edge} = E_{γ}(2E_{γ}/m_{e}c^{2})/(1 + 2E_{γ}/m_{e}c^{2}) :: Compton edge
X: Compton edge for Cs-137 (662 keV)?
> 2E/m_{e}c^{2} = 1324/511 ≈ 2.59
> E_{edge} = 662 × 2.59/3.59 ≈ 478 keV
X: 2000 photoelectrons are collected per event. Resolution limit?
> 2.355/√2000 ≈ 5.3% FWHM
K: Scintillators turn energy into light; light yield sets energy resolution, density sets efficiency, decay time sets speed.
!: The Compton continuum can hide weak photopeaks; larger or denser crystals improve peak-to-Compton ratios.
Q: Why is LaBr_{3}(Ce) valued? | High light yield and fast decay give excellent energy resolution (~3% at 662 keV) and timing.
Q: What is pulse-shape discrimination? | Using differences in scintillation pulse shapes to identify particle types, e.g. neutrons vs gammas.
M1: The photopeak represents: | Full absorption of the gamma ray | Compton scattering only | Backscatter | Noise | All energy deposited.
M2: Plastic scintillators are best for: | Fast timing and charged particles | High-resolution gamma spectroscopy | X-ray imaging only | Low-energy alpha only | Fast, low Z.

## Semiconductor radiation detectors
S: Semiconductor detectors collect electron–hole pairs created by radiation in a reverse-biased diode. Because a pair needs only a few eV, they give many more charge carriers than gases or scintillators, and so the best energy resolution of any common detector.
H: Principles
- Reverse bias creates a depletion region with no free carriers and a strong field.
- Radiation creates electron–hole pairs; the field sweeps them to electrodes.
- Energy per pair: Si 3.6 eV, Ge 2.96 eV (vs ~30 eV in gas).
- Statistical fluctuation is smaller than Poisson by the Fano factor F ≈ 0.1.
E: σ_{E} = √(FEw) :: statistical energy resolution (w = energy per pair)
E: d = √(2εV/(eN)) :: depletion depth
H: Detector types
- **High-purity germanium (HPGe)**: gamma spectroscopy, FWHM ~1.8 keV at 1.33 MeV; must be cooled to ~77 K.
- **Silicon**: charged particles, X-rays (silicon drift detectors), tracking.
- **CdTe/CZT**: room-temperature gamma and X-ray detection; medical imaging and photon-counting CT.
- **Diamond**: radiation-hard, fast; beam monitors.
H: Comparisons
P: HPGe resolves gamma lines that NaI blurs together, essential for identifying isotopes in environmental, nuclear safeguards and nuclear physics work. Its drawbacks: cryogenic cooling, cost and lower efficiency per volume than dense scintillators. Radiation damage creates traps that degrade charge collection, so detectors must be annealed or replaced.
X: Statistical resolution of HPGe at 1332 keV (F = 0.1, w = 2.96 eV).
> σ = √(0.1 × 1.332 × 10^{6} × 2.96) ≈ √(3.94 × 10^{5}) ≈ 628 eV
> FWHM = 2.355 × 0.628 ≈ 1.5 keV (electronic noise adds a little)
X: Pairs created in silicon by a 5.5 MeV alpha?
> 5.5 × 10^{6}/3.6 ≈ 1.5 × 10^{6} pairs
K: Low energy per carrier pair gives semiconductors superb energy resolution; HPGe is the gold standard for gamma spectroscopy.
!: Germanium must be cooled; at room temperature its small band gap gives huge leakage currents.
Q: What is the Fano factor? | A factor (~0.1 for Si and Ge) by which pair-creation fluctuations are smaller than Poisson.
Q: Why do HPGe detectors need cooling? | Ge's small band gap (0.67 eV) causes large thermal leakage current at room temperature.
M1: Energy per electron–hole pair in silicon is about: | 3.6 eV | 34 eV | 1 keV | 0.1 eV | Much less than gas.
M2: CZT detectors operate at: | Room temperature | 77 K only | 4 K | 1000 K | Wide band gap.

## Photomultiplier tubes
S: A photomultiplier tube converts a faint flash of light into a measurable electrical pulse by turning photons into electrons and multiplying them in a chain of dynodes. It can detect single photons with nanosecond timing and is the classic readout for scintillators and Cherenkov detectors.
H: How it works
- **Photocathode**: photons eject photoelectrons (quantum efficiency ~25–35% for bialkali at ~400 nm).
- **Dynodes**: each electron striking a dynode releases δ ≈ 3–6 secondaries.
- With n dynodes, gain G = δ^{n} ~ 10^{6}–10^{7}.
- **Anode** collects the electron cloud as a current pulse lasting a few ns.
E: G = δ^{n} :: PMT gain
H: Characteristics
- Transit time ~20–50 ns, transit time spread ~0.2–2 ns.
- Dark counts from thermionic emission: ~10–1000 Hz cm^{-2}.
- Very sensitive to magnetic fields (even Earth's): mu-metal shields are used.
- Gain depends steeply on voltage: G ∝ V^{kn}, so stable supplies are essential.
H: Alternatives and uses
P: Silicon photomultipliers (SiPMs: arrays of Geiger-mode APDs) are compact, insensitive to magnetic fields and low-voltage, replacing PMTs in PET/MRI and many particle detectors, though with higher dark rates. Microchannel plate PMTs give ~30 ps timing. Super-Kamiokande uses 11 000 PMTs of 50 cm diameter; IceCube uses 5160 in Antarctic ice.
X: A PMT has 10 dynodes, each with δ = 4. Gain? Charge from one photoelectron?
> G = 4^{10} ≈ 1.05 × 10^{6}
> Q = 1.05 × 10^{6} × 1.6 × 10^{-19} ≈ 0.17 pC
X: A 10% rise in voltage with k ≈ 0.7 and n = 10: gain change?
> (1.1)^{7} ≈ 1.95: gain nearly doubles
K: PMTs give enormous low-noise gain and fast timing; SiPMs are taking over where size and magnetic fields matter.
!: PMT gain is very sensitive to supply voltage and magnetic fields; calibrate and shield.
Q: What is quantum efficiency for a PMT? | The fraction of incident photons producing photoelectrons at the photocathode.
Q: Why are SiPMs used in PET/MRI scanners? | They work in strong magnetic fields where PMTs fail.
M1: A PMT with δ = 5 and 8 dynodes has gain: | ~3.9 × 10^{5} | 40 | 5 × 10^{8} | 8^{5} | 5^{8}.
M2: Mu-metal shields protect PMTs from: | Magnetic fields | Light | Heat | Radiation | Electron paths bend.

## Silicon tracking detectors
S: Silicon tracking detectors measure where charged particles pass with micrometre precision. Layers of silicon strips and pixels around collision points reconstruct tracks, momenta and decay vertices, essential for finding b-quarks, tau leptons and the Higgs boson.
H: Strip and pixel sensors
- Thin silicon (~150–300 μm) fully depleted; a minimum-ionising particle creates ~80 electron–hole pairs per μm (~22 000 in 300 μm).
- **Strips**: pitch ~50–100 μm; resolution ~pitch/√12 for binary readout, better with charge sharing.
- **Pixels**: 50 × 50 μm^{2} or smaller; give true 2D points; essential near the beam.
- **Monolithic active pixel sensors (MAPS)**: sensor and electronics on one chip (ALICE ITS).
E: σ = p/√12 :: binary resolution for pitch p
H: Measuring momentum and vertices
- Tracks curve in a solenoid field: p_{T} (GeV) = 0.3 B (T) R (m).
- Sagitta s = 0.3BL^{2}/(8p_{T}); momentum resolution worsens as p_{T}^{2}.
- Impact parameter resolution ~10–20 μm reveals displaced vertices from b-hadron decays (cτ ≈ 450 μm).
E: p_{T} = 0.3BR :: momentum from curvature
E: σ_{p}/p ∝ p σ_{x}/(BL^{2}) :: momentum resolution scaling
H: Challenges
P: Radiation damage at the LHC (fluences ~10^{15}–10^{16} n_{eq} cm^{-2}) increases leakage current and trapping, so sensors run cold (−20 to −30 °C) at high bias. Material budget (support, cooling, cables) causes multiple scattering and photon conversions. The HL-LHC upgrades replace whole trackers with finer, radiation-harder pixels and add track timing (~30 ps) to separate pile-up collisions.
X: A track in a 2 T field has radius 1.67 m. Transverse momentum?
> p_{T} = 0.3 × 2 × 1.67 ≈ 1.0 GeV
X: Binary resolution for 80 μm strips?
> 80/√12 ≈ 23 μm
K: Silicon trackers give micrometre hit positions; in a magnetic field, curvature gives momentum and extrapolation gives vertices.
!: Momentum resolution degrades at high p_{T} because tracks curve less; larger B and longer lever arms help.
Q: What does p_{T} = 0.3BR give? | Transverse momentum in GeV from field in tesla and radius in metres.
Q: Why are pixels used close to the beam? | They give unambiguous 2D points at very high track densities.
M1: A minimum-ionising particle in 300 μm silicon creates about: | 22 000 electron–hole pairs | 22 pairs | 2 × 10^{6} pairs | 220 pairs | ~80 per μm.
M2: b-quark identification relies on: | Displaced secondary vertices | Muon chambers only | Calorimeter timing | Cherenkov rings | b hadrons travel ~mm before decaying.

## Time projection chambers
S: A time projection chamber is a large gas or liquid volume where charged particles leave ionisation trails that drift to a readout plane. The 2D readout plus drift time gives full 3D tracks, and the charge measured along each track identifies the particle.
H: How it works
- A uniform electric field (~100–500 V cm^{-1}) drifts electrons over up to several metres.
- At the end plate, wire chambers or GEM/Micromegas amplify and read x and y.
- z comes from drift time: z = v_{d}t (v_{d} ~ 5 cm μs^{-1} in gas).
- A magnetic field parallel to E reduces transverse diffusion and curves tracks for momentum.
E: z = v_{d}(t − t_{0}) :: position from drift time
E: σ_{T} = √(2D_{T}L/v_{d}) :: diffusion spread over drift length L
H: Particle identification
- Many samples of dE/dx along each track (up to ~150 in ALICE).
- Truncated mean of dE/dx versus momentum separates pions, kaons, protons and electrons (Bethe–Bloch curves).
H: Applications
P: TPCs track thousands of particles per event in heavy-ion collisions (ALICE, STAR). Liquid argon TPCs (MicroBooNE, DUNE) image neutrino interactions with mm precision in kilotonne volumes. Dual-phase xenon TPCs (LZ, XENONnT) search for dark matter: prompt scintillation (S1) and delayed electroluminescence (S2) give 3D position and recoil type. Drawbacks: slow drift (tens of μs) limits rate, and space charge distorts fields.
X: Drift velocity 2.7 cm μs^{-1}, signal arrives 25 μs after t_{0}. Drift distance?
> z = 2.7 × 25 = 67.5 cm
X: Liquid argon drift at 1.6 mm μs^{-1} across 3.6 m (DUNE). Maximum drift time?
> 3600/1.6 ≈ 2250 μs ≈ 2.25 ms
K: TPCs give 3D tracks from 2D readout plus drift time, and many dE/dx samples for particle identification.
!: Long drift times make TPCs slow; at high rates, overlapping events and space charge become serious problems.
Q: How does a TPC measure the coordinate along the drift direction? | From the drift time multiplied by the drift velocity.
Q: Why use a magnetic field parallel to the drift field? | It curves tracks for momentum and suppresses transverse diffusion.
M1: Dark matter xenon TPCs use S1 and S2 signals from: | Scintillation and electroluminescence | Cherenkov and fluorescence | Heat and sound | Muons only | Two-phase detection.
M2: TPC particle ID mainly uses: | dE/dx along the track | Time of flight only | Calorimetry | Cherenkov angles | Energy loss per length.

## Calorimeters
S: Calorimeters measure particle energy by absorbing it completely and sampling the resulting shower. Electromagnetic calorimeters catch electrons and photons; hadronic calorimeters catch protons, neutrons, pions and jets, and both are central to discoveries like the Higgs boson.
H: Electromagnetic showers
- High-energy e^{±} radiate photons (bremsstrahlung); photons make e^{+}e^{−} pairs; this cascades until energies fall below the critical energy E_{c}.
- **Radiation length** X_{0}: distance over which an electron's energy falls by 1/e (lead 0.56 cm, PbWO_{4} 0.89 cm).
- Shower maximum at t_{max} ≈ ln(E/E_{c}) − 0.5 (electrons) or + 0.5 (photons); ~25 X_{0} contains it.
- **Molière radius** sets lateral size (~90% within R_{M}).
E: t_{max} ≈ ln(E/E_{c}) ± 0.5 :: shower maximum depth in X_{0}
E: σ_{E}/E = a/√E ⊕ b/E ⊕ c :: energy resolution (stochastic, noise, constant)
H: Hadronic showers
- Strong interactions; nuclear interaction length λ_{I} (iron 16.8 cm) ≫ X_{0}.
- Invisible energy (nuclear binding, neutrinos) and EM fraction fluctuations worsen resolution (~50–100%/√E).
- **Compensation** (equalising e/h response) or dual readout improves it.
H: Types
P: **Homogeneous** calorimeters (CMS PbWO_{4} crystals: ~3%/√E) measure all energy in active material. **Sampling** calorimeters alternate dense absorbers with active layers (ATLAS liquid argon/lead: ~10%/√E). **Particle-flow** algorithms combine tracker and finely segmented calorimeters for best jet resolution. High-granularity calorimeters (CMS HGCAL) for HL-LHC also measure timing.
X: A 100 GeV photon in PbWO_{4} (E_{c} ≈ 9 MeV). Depth of shower maximum?
> ln(100 000/9) ≈ 9.3; + 0.5 ⇒ ~9.8 X_{0} ≈ 8.7 cm
X: Resolution 3%/√E ⊕ 0.5%: at 100 GeV?
> 3%/10 = 0.3%; ⊕ 0.5% ⇒ √(0.09 + 0.25)% ≈ 0.58%
K: Calorimeters absorb particles to measure energy; resolution improves as 1/√E, limited at high energy by the constant term.
!: Hadronic calorimeters are much less precise than EM ones because of invisible energy and fluctuating EM fractions.
Q: What is a radiation length? | The mean distance over which a high-energy electron loses all but 1/e of its energy by bremsstrahlung.
Q: What is a sampling calorimeter? | Alternating layers of dense absorber and active material, measuring a fraction of the shower energy.
M1: The constant term in calorimeter resolution dominates at: | High energy | Low energy | All energies equally | Zero energy | Stochastic term shrinks as 1/√E.
M2: Hadronic showers are characterised by the: | Nuclear interaction length | Radiation length only | Molière radius only | Debye length | λ_{I} ≫ X_{0}.

## Cherenkov detectors
S: A charged particle moving faster than light in a medium emits Cherenkov radiation, a cone of blue light like an optical sonic boom. The cone angle reveals the particle's speed, allowing identification of particles and detection of neutrinos and cosmic rays.
H: The physics
- Threshold: v > c/n, i.e. β > 1/n.
- Cone angle: cos θ_{c} = 1/(nβ).
- Photon yield ∝ sin^{2}θ_{c}; ~200–500 photons per cm in water, mostly in the blue/UV.
- Momentum threshold p_{th} = m/√(n^{2} − 1) (in units of c).
E: cos θ_{c} = 1/(nβ) :: Cherenkov angle
E: dN/dx ≈ 490 sin^{2}θ_{c} photons per cm (300–600 nm) :: Frank–Tamm yield
H: Detector types
- **Threshold counters**: light or no light tells whether β > 1/n.
- **RICH** (ring-imaging Cherenkov): image the ring to measure θ_{c} and hence β; combined with momentum gives mass (LHCb, ALICE).
- **DIRC**: uses internal reflection in quartz bars (BaBar, Belle II).
- **Water Cherenkov**: Super-Kamiokande, Hyper-Kamiokande (neutrinos, proton decay); IceCube (Antarctic ice).
- **Imaging air Cherenkov telescopes**: H.E.S.S., MAGIC, VERITAS, CTA detect TeV gamma rays from air showers.
H: Uses
P: In water, muon rings are sharp while electron rings are fuzzy (from showering), distinguishing ν_{μ} and ν_{e}. The blue glow in nuclear reactor pools is Cherenkov light from fast electrons. Radiotherapy uses Cherenkov imaging to check beam delivery. Ring images in LHCb separate pions, kaons and protons up to ~100 GeV.
X: Threshold β and Cherenkov angle for β = 1 in water (n = 1.33)?
> β_{th} = 1/1.33 = 0.75
> cos θ = 1/1.33 ⇒ θ ≈ 41°
X: Momentum threshold for kaons (m = 494 MeV) in C_{4}F_{10} gas (n = 1.0014)?
> √(n^{2} − 1) ≈ √0.0028 ≈ 0.0529
> p_{th} ≈ 494/0.0529 ≈ 9.3 GeV
K: Cherenkov light appears above β = 1/n; its angle measures speed, which with momentum identifies particle mass.
!: Cherenkov radiation doesn't mean exceeding c in vacuum; only the phase velocity of light in the medium is exceeded.
Q: What is the Cherenkov threshold condition? | The particle's speed exceeds c/n, i.e. β > 1/n.
Q: How does Super-Kamiokande distinguish electrons from muons? | Muons give sharp rings, electrons give fuzzy rings from their showers.
M1: The maximum Cherenkov angle in a medium of index n is: | cos^{−1}(1/n) | 90° | 0° | sin^{−1}(n) | When β → 1.
M2: The blue glow in reactor pools is: | Cherenkov radiation | Fluorescence of water | Thermal emission | Bremsstrahlung only | Fast beta electrons.

## Time-of-flight measurements
S: Time-of-flight systems measure how long a particle takes to travel a known distance. Combined with momentum from tracking, the speed gives the particle's mass, identifying pions, kaons and protons, and similar timing powers PET, lidar and neutron spectroscopy.
H: Principles
- β = L/(ct); with p known, m = p√(1/β^{2} − 1).
- Time difference between two masses at the same momentum: Δt ≈ (L/2cp^{2})(m_{1}^{2} − m_{2}^{2}) for p ≫ m.
- Separation power falls as 1/p^{2}: TOF is best at low momentum.
E: m = p√(1/β^{2} − 1), β = L/(ct) :: mass from TOF
E: Δt ≈ L(m_{1}^{2} − m_{2}^{2})/(2cp^{2}) :: high-momentum approximation
H: Technology
- Plastic scintillators with fast PMTs (~100 ps).
- **Multigap resistive plate chambers (MRPCs)**: ~50 ps (ALICE TOF).
- LGADs (low-gain avalanche diodes): ~30 ps; HL-LHC timing layers.
- Picosecond MCP-PMTs and SiPMs for PET (time-of-flight PET ~200 ps).
H: Other uses
P: Neutron TOF spectroscopy determines neutron energies from flight times over tens of metres (n_TOF at CERN). Mass spectrometers separate ions by TOF. In fixed-target and nuclear experiments, TOF identifies fragments. Precise timing (4D tracking) helps untangle ~200 simultaneous collisions per bunch crossing at HL-LHC.
X: Pion vs kaon separation at p = 1 GeV over L = 3.7 m.
> m_{K}^{2} − m_{π}^{2} = 0.244 − 0.019 = 0.225 GeV^{2}
> Δt ≈ 3.7 × 0.225/(2 × 3 × 10^{8} × 1) ≈ 1.39 ns
> With 80 ps resolution, separation ≈ 17σ
X: A neutron covers 20 m in 1 μs. Energy?
> v = 2 × 10^{7} m s^{-1}; E = ½mv^{2} = ½ × 1.675 × 10^{-27} × 4 × 10^{14} ≈ 3.3 × 10^{-13} J ≈ 2.1 MeV
K: TOF gives velocity; with momentum, it gives mass. Separation shrinks as 1/p^{2}, so it suits lower momenta.
!: Start time (t_{0}) uncertainty often limits TOF resolution as much as the detector itself.
Q: Why does TOF separation fall at high momentum? | All particles approach c, so time differences shrink as 1/p^{2}.
Q: What timing do MRPCs achieve? | About 50 ps.
M1: TOF PET improves images by: | Localising annihilation along each line | Increasing dose | Changing isotopes | Using X-rays | Arrival-time difference.
M2: Mass from TOF requires also measuring: | Momentum | Charge only | Spin | Temperature | m = p√(1/β^{2} − 1).

## Particle identification
S: Particle identification (PID) determines what kind of particle left a signal: electron, muon, pion, kaon, proton, photon, neutron or neutrino. Experiments combine several detector signatures, because no single detector identifies everything at all momenta.
H: Signatures in a general-purpose detector
- **Photons**: EM shower with no track.
- **Electrons**: track + EM shower with E/p ≈ 1.
- **Muons**: track through calorimeters into outer muon chambers.
- **Charged hadrons**: track + hadronic shower.
- **Neutral hadrons**: hadronic shower, no track.
- **Neutrinos**: missing transverse momentum.
- **Taus**: narrow jets with 1 or 3 tracks; **b-jets**: displaced vertices.
H: Hadron PID techniques
- **dE/dx** (silicon, TPC): good below ~1 GeV and in the relativistic rise.
- **Time-of-flight**: up to a few GeV.
- **Cherenkov (RICH, DIRC)**: up to ~100 GeV.
- **Transition radiation detectors**: X-rays emitted at boundaries when γ ≳ 1000, identifying electrons.
E: Bethe–Bloch: −dE/dx ∝ (z^{2}/β^{2})[ln(2m_{e}c^{2}β^{2}γ^{2}/I) − β^{2}] :: energy loss
H: Combining information
P: Likelihoods from each subsystem combine into a global PID probability; increasingly, machine-learning classifiers (boosted trees, neural nets) use all features. Performance is described by efficiency (fraction of true particles kept) and misidentification rate; calibration uses clean samples such as K_{S} → π^{+}π^{−}, Λ → pπ^{−}, J/ψ → μ^{+}μ^{−} and D* tagged D^{0} → K^{−}π^{+}.
X: At p = 0.5 GeV, compare β for pion and proton.
> π: E = √(0.25 + 0.0195) ≈ 0.519 ⇒ β ≈ 0.963
> p: E = √(0.25 + 0.880) ≈ 1.063 ⇒ β ≈ 0.470
> dE/dx ∝ 1/β^{2}: the proton loses ~4× more energy
K: PID combines tracking, calorimetry, timing, Cherenkov and dE/dx; each technique covers a momentum range.
!: PID performance must be calibrated on data; simulations rarely reproduce misidentification rates perfectly.
Q: How is a muon identified? | It penetrates the calorimeters and leaves hits in the outer muon chambers.
Q: What does missing transverse momentum indicate? | Invisible particles such as neutrinos (or new weakly interacting particles).
M1: An electron is identified by: | A track and EM shower with E/p ≈ 1 | No track | Hits in muon chambers | Hadronic shower only | Energy matches momentum.
M2: Transition radiation detectors identify: | Electrons | Neutrons | Neutrinos | Protons only | Very high γ particles.

## Trigger systems
S: Trigger systems decide in microseconds which collisions to keep, since detectors produce far more data than can be stored. At the LHC, of 40 million bunch crossings per second, only about a thousand are recorded, chosen to contain potentially interesting physics.
H: Why triggers are needed
- LHC: 40 MHz crossings × ~1 MB per event ≈ 40 TB s^{-1} raw.
- Storage limited to ~1–10 GB s^{-1}.
- Most collisions are low-energy "minimum bias" events.
H: Multi-level design
- **Level-1 (hardware)**: FPGAs/ASICs use coarse calorimeter and muon data; decision within ~2.5–4 μs (HL-LHC ~12.5 μs); reduces to ~100 kHz.
- **High-level trigger (software)**: farm of thousands of CPUs/GPUs runs fast reconstruction; output ~1–5 kHz.
- **Trigger menus**: thresholds on single and di-leptons, photons, jets, missing E_{T}; prescales for high-rate triggers.
E: Rejection factor = input rate/output rate :: trigger rejection
H: Trends and pitfalls
P: Data scouting and "turbo" streams save compact reconstructed objects at higher rates. LHCb Run 3 uses a fully software, GPU-based trigger at 30 MHz. Trigger efficiency must be measured in data (tag-and-probe, orthogonal triggers); signals outside the menu are lost forever, so designing triggers for unknown physics (displaced decays, long-lived particles) matters. Machine-learning triggers on FPGAs detect anomalies.
X: L1 accepts 100 kHz from 40 MHz; HLT outputs 1 kHz. Total rejection?
> 40 × 10^{6}/10^{3} = 4 × 10^{4}
X: A prescale of 1000 applies to a 2 MHz trigger. Accepted rate?
> 2 × 10^{6}/1000 = 2 kHz
K: Triggers select rare interesting events in real time through fast hardware and software stages; what isn't triggered is lost.
!: Trigger biases shape the recorded data; efficiencies must be measured, not assumed.
Q: Why does the LHC need a trigger? | Collision rates and data volumes far exceed what can be stored.
Q: What is a prescale? | Keeping only one in N events passing a high-rate trigger.
M1: Level-1 triggers typically use: | Custom hardware such as FPGAs | Full offline reconstruction | Human inspection | Only tracker data | Microsecond decisions.
M2: Tag-and-probe is used to measure: | Trigger efficiency | Luminosity | Detector alignment | Magnet strength | Using a known clean sample.

## Event reconstruction
S: Event reconstruction turns millions of raw detector signals into physics objects: tracks, vertices, electrons, photons, muons, jets and missing energy. It combines pattern recognition, fitting and calibration, and its quality sets the reach of every analysis.
H: Steps
- **Hit reconstruction**: clusters in silicon, calorimeter cells, drift times.
- **Track finding**: seeds from a few hits, then Kalman-filter extension through layers.
- **Track fitting**: Kalman filter or global χ^{2}, accounting for material and magnetic field.
- **Vertexing**: find primary collision vertex and secondary decays.
- **Calorimeter clustering** into energy deposits.
- **Object identification**: electrons, photons, muons, taus.
- **Jets**: anti-k_{T} clustering with radius R = 0.4 or 0.8.
- **Missing transverse momentum**: negative vector sum of all visible p_{T}.
E: E_{T}^{miss} = −|Σ p_{T}(visible)| :: missing transverse momentum (magnitude of the negative vector sum)
H: Particle flow
- Links tracks, calorimeter clusters and muon hits into individual particle candidates.
- Uses the best detector for each particle: tracker for charged hadrons, ECAL for photons, HCAL for neutral hadrons.
- Improves jet energy resolution significantly (CMS).
H: Challenges
P: Pile-up (~60 collisions per crossing now, ~200 at HL-LHC) creates combinatorial explosions in tracking; timing and machine learning (graph neural networks) help. Alignment of detector elements to micrometres uses tracks from collisions and cosmic rays. Reconstruction runs on worldwide computing grids; algorithms must be fast as well as precise.
E: d_{ij} = min(p_{T,i}^{−2}, p_{T,j}^{−2})ΔR_{ij}^{2}/R^{2} :: anti-k_{T} distance
X: Two visible objects have p_{T} vectors (50, 0) and (0, 30) GeV. Missing p_{T}?
> Sum = (50, 30); missing = (−50, −30)
> |E_{T}^{miss}| = √(2500 + 900) ≈ 58 GeV
K: Reconstruction builds physics objects from raw hits; algorithms like Kalman filters, anti-k_{T} and particle flow are standard.
!: Mis-measured jets or detector noise can fake missing energy; quality cuts and cleaning are essential.
Q: What does the Kalman filter do in tracking? | Recursively combines hits with predictions, accounting for noise and material, to fit tracks.
Q: Why is anti-k_{T} the standard jet algorithm? | It produces regular, cone-like jets and is infrared and collinear safe.
M1: Particle flow combines: | Tracker, calorimeter and muon information | Only calorimeters | Only triggers | Luminosity data | Best detector for each particle.
M2: Pile-up refers to: | Multiple simultaneous collisions per bunch crossing | Detector heating | Magnetic quench | Data storage | Overlapping events.

## Background suppression
S: Background suppression removes ordinary events that mimic the signal being searched for. Through careful selection, shielding, vetoes and clever estimation, experiments find rare processes buried under backgrounds that can be billions of times larger.
H: Sources of background
- **Physics backgrounds**: Standard Model processes with similar final states (e.g. tt̄ for new physics, ZZ for H → 4ℓ).
- **Instrumental**: fake leptons from jets, mismeasured energy, noise, beam-induced backgrounds.
- **Environmental** (rare-event searches): radioactivity in materials (U, Th, K, radon), cosmic-ray muons and neutrons.
H: Suppression techniques
- Kinematic cuts (thresholds, invariant mass windows, angular separations).
- Isolation requirements for leptons and photons.
- Multivariate classifiers (BDTs, neural networks).
- **Shielding**: underground labs (SNOLAB 2 km, Gran Sasso 1.4 km) reduce muons by 10^{6}; lead, copper, water shielding; active vetoes.
- **Radiopurity**: material screening, electroformed copper, radon-free air.
- **Fiducialisation**: use only the quiet inner volume of large detectors.
E: S/√B :: approximate significance for large B
H: Estimating what remains
P: Backgrounds are estimated from simulations validated in control regions, or directly from data (sidebands, ABCD method, fake-factor methods). Blind analyses hide the signal region until methods are fixed, to avoid bias. Dark matter experiments now approach the "neutrino fog," an irreducible background from coherent solar and atmospheric neutrino scattering.
X: A cut keeps 80% of signal and 5% of background. Initial S = 100, B = 10 000. Significance before and after?
> Before: 100/√10 000 = 1.0
> After: 80/√500 ≈ 3.6
X: Shielding reduces muon flux from 1 to 10^{-6} per cm^{2} per minute. Muons through 1 m^{2} per day underground?
> 10^{4} cm^{2} × 1440 min × 10^{-6} ≈ 14 per day
K: Find the signal by rejecting look-alikes: kinematics, isolation, shielding, purity and data-driven background estimates.
!: Over-tuning cuts on the data inflates significance; blinding and pre-registered selections prevent this.
Q: What is a blind analysis? | Hiding the signal region until the analysis procedure is finalised, to avoid unconscious bias.
Q: Why are dark matter detectors placed deep underground? | To shield against cosmic-ray muons and their secondary neutrons.
M1: The ABCD method estimates backgrounds using: | Control regions defined by two uncorrelated variables | Simulation only | Shielding | Luminosity | Data-driven extrapolation.
M2: The "neutrino fog" is a background from: | Coherent neutrino scattering | Radon | Cosmic rays | Detector noise | Irreducible for dark matter searches.

## Detector calibration
S: Calibration translates raw detector signals into physical quantities such as energy, position and time. Precision measurements, like the Higgs mass or W mass, depend on calibrations accurate to fractions of a percent, using known sources and well-understood physics processes.
H: Energy calibration
- **Radioactive sources** with known lines: Cs-137 (662 keV), Co-60 (1173, 1332 keV), Am-241 (59.5 keV), Th-228 chain (2615 keV).
- **Test beams**: particles of known energy.
- **Physics standard candles**: Z → ee and Z → μμ (mass known to 2 MeV), J/ψ, π^{0} → γγ, Υ.
- **Intercalibration**: equalising response across channels using φ-symmetry, laser or LED pulses.
H: Position and timing
- **Alignment**: tracks from collisions and cosmic muons fix element positions to ~1–10 μm.
- **Magnetic field maps** for momentum scale.
- **Timing**: laser pulses, clock distribution, collision time reference.
H: Monitoring and stability
P: Response changes with temperature, radiation damage, gain drifts and ageing; continuous monitoring (laser systems in CMS ECAL, LED pulsers) tracks changes. Linearity is checked across energy ranges. Detector simulation is tuned to match calibrated data. Calibration uncertainties propagate into systematic uncertainties of physics results; the W mass measurement needed lepton energy scales known to ~10^{-4}.
E: E = a·ADC + b :: linear calibration
E: Linearity residual = (E_{meas} − E_{true})/E_{true} :: check
X: Peaks at ADC 1650 (662 keV) and 3240 (1332 keV). Calibration?
> a = (1332 − 662)/(3240 − 1650) = 670/1590 ≈ 0.421 keV per ADC count
> b = 662 − 0.421 × 1650 ≈ −33 keV
> An ADC value of 2500 corresponds to ≈ 0.421 × 2500 − 33 ≈ 1020 keV
X: A Z → ee peak reconstructs at 90.5 GeV (true 91.19 GeV). Scale correction?
> 91.19/90.5 ≈ 1.0076: scale energies up by 0.76%
K: Calibrate with known sources and standard candles, align with tracks, and monitor continuously.
!: A calibration valid at one energy may not hold at another; check linearity across the full range.
Q: Why is Z → ee used for calibration? | The Z mass is precisely known, giving a high-energy standard candle for electron energy scale.
Q: What is detector alignment? | Determining the exact positions and orientations of detector elements using tracks.
M1: Co-60 gamma lines are at: | 1173 and 1332 keV | 662 keV | 511 keV | 59.5 keV | Two common calibration lines.
M2: Laser monitoring in calorimeters tracks: | Response changes over time | Particle charge | Beam energy | Luminosity | Transparency loss.

## Radiation spectroscopy
S: Radiation spectroscopy measures the energy distribution of emitted gamma rays, X-rays, alpha and beta particles to identify isotopes and study nuclear structure. Spectra reveal what is radioactive, how much is present and how nuclei arrange their energy levels.
H: Gamma spectroscopy
- Peaks at characteristic energies identify isotopes (K-40 at 1461 keV, Cs-137 at 662 keV, Tl-208 at 2615 keV).
- Features: photopeak, Compton continuum and edge, backscatter peak (~200 keV), single and double escape peaks (E − 511, E − 1022 keV), X-ray fluorescence from shielding (Pb ~75 keV), sum peaks.
- Activity A = N_{peak}/(ε I_{γ} t), with efficiency ε and emission probability I_{γ}.
E: A = N/(ε I_{γ} t) :: activity from peak counts
E: L_{D} ≈ 2.71 + 4.65√B :: Currie detection limit (counts)
H: Other spectroscopies
- **Alpha**: silicon detectors in vacuum, sharp lines (~20 keV FWHM); U, Pu, Am, Po identification.
- **Beta**: continuous spectra up to endpoint E_{max}; liquid scintillation counting for H-3, C-14.
- **X-ray fluorescence (XRF)**: elemental analysis via characteristic X-rays.
- **Neutron spectroscopy**: TOF, recoil detectors, Bonner spheres.
H: Applications
P: Environmental monitoring after Fukushima and Chernobyl, nuclear safeguards and border security (identifying special nuclear materials), medical isotope QA, archaeology (neutron activation analysis), geology (K, U, Th mapping from aircraft) and nuclear structure research with arrays like GRETA and AGATA.
X: A 1461 keV peak has 1200 counts in 10 000 s; ε = 0.02, I_{γ} = 0.107. Activity of K-40?
> A = 1200/(0.02 × 0.107 × 10 000) ≈ 56 Bq
X: Escape peaks for 2615 keV in HPGe?
> Single: 2104 keV; double: 1593 keV
K: Spectra identify isotopes by their characteristic lines; peak areas with efficiency calibration give activity.
!: Peak interference and summing can mislead; always check all lines of an isotope and coincidence summing corrections.
Q: What causes escape peaks? | After pair production, one or both 511 keV annihilation photons escape the detector.
Q: What is the backscatter peak? | Photons Compton scattered by ~180° in surrounding material then absorbed, around 200–250 keV.
M1: Beta spectra are continuous because: | Energy is shared with an antineutrino | Electrons scatter | Detectors are imperfect | Nuclei recoil only | Three-body decay.
M2: The 1461 keV line identifies: | Potassium-40 | Caesium-137 | Cobalt-60 | Radon-222 | Natural potassium.

## Accelerator instrumentation
S: Accelerator instrumentation measures the beam's position, size, intensity, energy and losses so operators can steer, focus and protect a machine. Without these diagnostics, modern colliders and light sources couldn't run or stay safe.
H: Key measurements
- **Beam position monitors (BPMs)**: button or stripline electrodes sense image currents; resolution ~μm.
- **Beam current**: current transformers (DCCT for DC, fast BCT for bunches); Faraday cups for low energy.
- **Beam profile**: wire scanners, screens (OTR, YAG), synchrotron light monitors, ionisation profile monitors.
- **Beam loss monitors**: ion chambers along the ring trigger beam dumps in microseconds.
- **Tune and chromaticity**: excite and measure betatron oscillation frequencies.
- **Luminosity monitors**: forward detectors measuring rates of known processes.
E: x ≈ (k/2)(U_{R} − U_{L})/(U_{R} + U_{L}) :: BPM position from electrode signals
E: L = f n_{b}N_{1}N_{2}/(4πσ_{x}σ_{y}) :: collider luminosity
H: Machine protection
- The LHC beam stores ~360 MJ, enough to melt half a tonne of copper.
- Thousands of beam loss monitors and an interlock system dump the beam safely within three turns (~270 μs) into graphite absorbers.
- Collimators intercept the beam halo.
H: Advanced diagnostics
P: Longitudinal profiles of femtosecond bunches use electro-optic sampling and transverse deflecting cavities. Schottky monitors measure momentum spread non-invasively. Van der Meer scans calibrate luminosity by sweeping beams across each other. Machine-learning tools now optimise tuning and predict faults.
X: LHC luminosity with f = 11 245 Hz, n_{b} = 2556, N = 1.15 × 10^{11}, σ = 16.7 μm.
> L = 11 245 × 2556 × (1.15 × 10^{11})^{2}/(4π × (16.7 × 10^{-4} cm)^{2})
> ≈ 3.8 × 10^{29}/(3.5 × 10^{-5}) ≈ 1.1 × 10^{34} cm^{-2} s^{-1}
K: Diagnostics measure position, current, profile, losses and luminosity; protection systems keep huge stored energies safe.
!: A single mis-steered high-energy bunch can damage equipment; loss monitoring and fast dumps are non-negotiable.
Q: What does a beam position monitor detect? | Image currents induced on electrodes, giving the beam's transverse position.
Q: What is a Van der Meer scan? | Sweeping colliding beams across each other to measure their overlap and calibrate luminosity.
M1: Beam loss monitors are usually: | Ionisation chambers | PMTs only | Silicon trackers | Thermometers | Detect showers from lost particles.
M2: Luminosity increases if beam size: | Decreases | Increases | Doesn't matter | Becomes zero length | L ∝ 1/(σ_{x}σ_{y}).

## Collider data analysis
S: Collider data analysis turns petabytes of recorded collisions into physics measurements: cross-sections, masses, couplings and searches for new particles. It combines event selection, simulation, background estimation, statistical inference and careful systematic uncertainties.
H: The workflow
- Define the target signal and its signature.
- Select events with triggers and cuts; optimise with simulation (or ML) for sensitivity.
- Estimate backgrounds (simulation corrected by control regions, data-driven methods).
- Account for systematic uncertainties: luminosity (~1–2%), energy scales, efficiencies, theory (PDFs, scales).
- Statistical fit (profile likelihood) to extract signal strength μ = σ/σ_{SM} or set limits.
E: N_{events} = σ × ∫L dt × ε × A :: expected event count
E: m_{inv}^{2} = (ΣE)^{2} − |Σp|^{2} :: invariant mass
H: Key tools
- Monte Carlo generators (Pythia, Herwig, MadGraph, Sherpa) and detector simulation (Geant4).
- **Invariant mass** peaks for resonances (H → γγ at 125 GeV).
- **Transverse mass** for W → ℓν.
- **Unfolding** removes detector effects for comparisons with theory.
- ROOT, Python (uproot, coffea), RooFit/RooStats, pyhf.
H: Good practice
P: Use control and validation regions; blind signal regions; perform the analysis with independent cross-checks; publish results with likelihoods for reinterpretation (HEPData). Global fits and combinations of channels and experiments improve precision. Reproducibility through analysis preservation (REANA, RECAST) lets new theories be tested against old data.
X: σ = 50 fb, ∫L = 140 fb^{-1}, ε × A = 0.3. Expected signal events?
> N = 50 × 140 × 0.3 = 2100
X: Two photons with E = 62.5 GeV each, back to back. Invariant mass?
> m^{2} = (125)^{2} − 0 ⇒ m = 125 GeV
K: Analyses combine selection, simulation, background estimation and likelihood fits with full systematic uncertainties.
!: Systematic uncertainties often dominate large datasets; more data alone won't improve precision then.
Q: What does the signal strength μ represent? | The measured cross-section relative to the Standard Model prediction.
Q: What is unfolding? | Correcting measured distributions for detector resolution and efficiency to compare with theory.
M1: Expected events equal: | σ × integrated luminosity × efficiency × acceptance | σ/L | L/σ | ε only | Basic counting formula.
M2: The transverse mass is used for: | W → ℓν decays | Z → ℓℓ only | Photons | Jets | Neutrino escapes.

## Statistical significance of discoveries
S: Particle physicists claim a discovery when the chance that background alone produced the observed excess is below about 1 in 3.5 million: five sigma. Understanding p-values, the look-elsewhere effect and systematic uncertainties is essential for judging such claims.
H: p-values and sigma
- **p-value**: probability, if only background exists, of seeing data at least as extreme as observed.
- Converted to Gaussian significance Z: p = 1 − Φ(Z) (one-sided).
- 3σ (p ≈ 1.35 × 10^{-3}): "evidence"; 5σ (p ≈ 2.9 × 10^{-7}): "discovery".
- Simple counting: Z ≈ S/√B; better: Z = √(2[(S + B)ln(1 + S/B) − S]).
E: Z = √(2[(S + B)ln(1 + S/B) − S]) :: Asimov significance
E: p(5σ) ≈ 2.9 × 10^{-7} :: discovery threshold
H: Look-elsewhere effect
- Searching many mass bins raises the chance that one fluctuates high.
- **Local** vs **global** significance; trials factor reduces global significance.
- The 750 GeV diphoton excess (2015) had local ~3.9σ but global ~2σ, and disappeared with more data.
H: Statistical methods
P: Profile likelihood ratio tests with nuisance parameters for systematics are standard (Wilks' theorem and asymptotic formulae). Exclusion limits use CL_{s} at 95% confidence. Bayesian methods report posterior probabilities. Five sigma guards against systematics, look-elsewhere and the high prior improbability of new physics; extraordinary claims need extraordinary evidence. Faster-than-light neutrinos (OPERA 2011) reached 6σ but came from a loose cable: significance doesn't protect against systematic errors.
X: S = 25, B = 16. Significance by S/√B and by the Asimov formula?
> S/√B = 25/4 = 6.25
> Asimov: √(2[41 ln(1 + 25/16) − 25]) = √(2[41 × 0.9410 − 25]) = √(2 × 13.58) ≈ 5.2
X: A search over 100 independent bins finds a local 3σ (p = 1.35 × 10^{-3}). Global p?
> 1 − (1 − 0.00135)^{100} ≈ 0.126, about 1.1σ globally
K: Five sigma is the discovery standard; account for look-elsewhere effects and systematics before claiming anything.
!: A p-value is not the probability that the signal is fake; it is the probability of data this extreme if there were no signal.
Q: What p-value corresponds to 5σ? | About 2.9 × 10^{-7} (one-sided), roughly 1 in 3.5 million.
Q: What is the look-elsewhere effect? | The increased chance of a large fluctuation somewhere when searching many places.
M1: 3σ is conventionally called: | Evidence | Discovery | Exclusion | Proof | p ≈ 0.00135.
M2: OPERA's superluminal neutrino result was caused by: | A loose fibre-optic cable | New physics | Statistics only | Gravity | Systematic error.
`;
