// Unit 44: Experimental and Applied Physics. Format: kit/course/notes.js
export default `
## Instrumentation and sensor design
S: Instrumentation turns physical quantities such as temperature, force, light and field into electrical signals we can record. Good sensor design balances sensitivity, range, speed, noise, stability and cost, and it starts from the physics of how the sensor responds.
H: The measurement chain
- **Transducer**: converts the quantity into an electrical signal (thermocouple, strain gauge, photodiode, Hall probe).
- **Conditioning**: amplification, filtering, bridge circuits, linearisation.
- **Digitisation**: an ADC samples and quantises the signal.
- **Processing and display**: calibration, averaging, storage.
H: Key specifications
- **Sensitivity** (output per unit input), **resolution** (smallest detectable change), **range** and **dynamic range**.
- **Linearity**, **hysteresis**, **drift** and **repeatability**.
- **Bandwidth** and **response time** (often a time constant τ).
- **Noise floor**, often quoted per √Hz.
E: DR = 20 log_{10}(V_{max}/V_{noise}) dB :: dynamic range
E: f_{3dB} = 1/(2πτ) :: bandwidth of a first-order sensor
H: Common sensors
P: Thermocouples (Seebeck effect, ~40 μV K^{-1} for type K), RTDs (platinum, R rises 0.385% per K), thermistors (very sensitive, nonlinear), strain gauges in Wheatstone bridges (gauge factor ~2), piezoelectric accelerometers, Hall-effect and fluxgate magnetometers, MEMS gyroscopes and pressure sensors in phones, capacitive sensors for displacement down to nanometres. Sensor choice also depends on environment: temperature, vibration, radiation and electromagnetic interference.
E: ΔR/R = GF × ε :: strain gauge
X: A strain gauge (R = 350 Ω, GF = 2.1) feels 500 microstrain. Resistance change?
> ΔR = 350 × 2.1 × 500 × 10^{-6} ≈ 0.37 Ω
> A quarter-bridge at 5 V gives ~V × GF × ε/4 ≈ 1.3 mV
X: A sensor has τ = 20 ms. Bandwidth?
> f = 1/(2π × 0.02) ≈ 8 Hz
K: Design the whole chain from transducer physics to digitisation, specifying sensitivity, noise, bandwidth and stability.
!: High resolution means nothing without accuracy; a precise sensor can still be badly calibrated.
Q: What is a transducer? | A device converting one physical quantity into another, usually an electrical signal.
Q: Why use a Wheatstone bridge with strain gauges? | It converts tiny resistance changes into a measurable voltage and cancels common-mode effects like temperature.
M1: Hysteresis means the output: | Depends on whether input is rising or falling | Is perfectly linear | Has no noise | Drifts with time only | Path dependence.
M2: A platinum RTD's resistance changes by about: | 0.385% per K | 40 μV per K | 10% per K | Nothing | Pt100 standard.

## Precision measurement
S: Precision measurement pushes uncertainties down to the limits set by noise and fundamental physics. It has tested relativity to parts in 10^{15}, measured the electron's magnetic moment to parts in 10^{13} and redefined the SI units on fundamental constants.
H: Accuracy and precision
- **Precision**: how closely repeated measurements agree (random error).
- **Accuracy**: how close to the true value (includes systematic error).
- **Type A** uncertainties: from statistics of repeated measurements.
- **Type B**: from other information (calibration certificates, specifications).
- Combine independent uncertainties in quadrature.
E: u_{c} = √(Σu_{i}^{2}) :: combined standard uncertainty
E: σ_{mean} = σ/√N :: standard error of the mean
H: Techniques
- **Averaging** reduces white noise as 1/√N, until drift dominates (Allan deviation shows where).
- **Modulation and lock-in detection** move signals away from 1/f noise.
- **Null measurements**: balance against a reference (bridges, Kibble balance).
- **Differential measurements** cancel common-mode drifts.
- **Blind analysis** and swapping configurations reveal systematics.
H: The SI on constants
P: Since 2019 the SI fixes h, e, k_{B}, N_{A}, c, Δν_{Cs} and K_{cd}. The kilogram is realised by Kibble balances (mass from h via electrical power) and silicon-sphere atom counting. Quantum standards (Josephson voltage, quantum Hall resistance) give the same values everywhere. Optical clocks reach 10^{-18}; atom interferometers measure g and G; tests of the equivalence principle reach 10^{-15} (MICROSCOPE).
X: Ten readings have σ = 0.5 mm. Standard error of the mean?
> 0.5/√10 ≈ 0.16 mm
X: A length has u_{stat} = 0.03 mm and u_{cal} = 0.04 mm. Combined?
> √(0.0009 + 0.0016) = 0.05 mm
K: Reduce random error by averaging and modulation, hunt systematics with null and differential methods, and report full uncertainty budgets.
!: Averaging doesn't reduce systematic errors; past a point, more data only makes a wrong answer more precise.
Q: What is the Allan deviation used for? | Characterising frequency or signal stability versus averaging time, showing when drift dominates.
Q: Which constant defines the kilogram since 2019? | The Planck constant h.
M1: Systematic errors are reduced by: | Changing methods and calibrating | Averaging more readings | Ignoring them | Adding noise | Not statistical.
M2: A Kibble balance relates mass to: | Planck's constant | The speed of sound | Gravity only | Avogadro only | Electrical power and h.

## Vacuum technology
S: Vacuum technology removes gas from enclosed volumes so particles can travel freely, surfaces stay clean and heat doesn't conduct away. It underpins electron microscopes, particle accelerators, semiconductor fabs, space simulation and surface science.
H: Vacuum ranges
- Rough: 10^{5}–10^{2} Pa; medium: 10^{2}–10^{-1} Pa; high: 10^{-1}–10^{-5} Pa; ultra-high (UHV): 10^{-5}–10^{-10} Pa; extreme: below 10^{-10} Pa.
- 1 atm ≈ 10^{5} Pa; 1 mbar = 100 Pa; 1 Torr ≈ 133 Pa.
- Mean free path λ ≈ k_{B}T/(√2πd^{2}P): ~68 nm at 1 atm, ~5 cm at 0.1 Pa, ~kilometres in UHV.
E: λ = k_{B}T/(√2 π d^{2} P) :: mean free path
E: t_{mono} ≈ 3 × 10^{-4}/P(Pa) s :: time to form a monolayer
H: Pumps
- **Roughing**: rotary vane, scroll, diaphragm pumps (to ~1 Pa).
- **Turbomolecular**: fast rotor blades (~1000 Hz) knock molecules out (to 10^{-8} Pa).
- **Ion pumps**, **getter (NEG)**, **cryopumps** for UHV.
- Pumping speed S (L s^{-1}) and conductance C of pipes in series: 1/S_{eff} = 1/S + 1/C.
E: P = Q/S_{eff} :: base pressure from gas load Q
H: Gauges and practice
P: Pirani and capacitance gauges cover rough to medium vacuum; Penning and Bayard–Alpert ionisation gauges reach UHV. Outgassing from surfaces, especially water, dominates at low pressure; baking at 150–250 °C speeds desorption. Materials: stainless steel, copper gaskets (ConFlat flanges), minimal plastics. Leaks are found with helium leak detectors. The LHC beam pipe reaches ~10^{-9} Pa.
X: Mean free path of N_{2} (d = 0.37 nm) at 300 K and 10^{-4} Pa?
> λ = 1.38 × 10^{-23} × 300/(1.414 × π × (3.7 × 10^{-10})^{2} × 10^{-4})
> ≈ 4.14 × 10^{-21}/(6.08 × 10^{-23}) ≈ 68 m
X: A 300 L s^{-1} pump connected via a 100 L s^{-1} conductance. Effective speed?
> 1/S = 1/300 + 1/100 ⇒ S = 75 L s^{-1}
K: Vacuum quality is set by pumping speed, conductance and gas load; UHV needs clean materials, baking and the right pumps.
!: A big pump behind a narrow tube is wasted; conductance often limits the effective pumping speed.
Q: Why bake a UHV system? | To drive water and other adsorbed gases off surfaces so they can be pumped away.
Q: How does a turbomolecular pump work? | Fast-spinning angled blades transfer momentum to gas molecules, directing them towards the exhaust.
M1: Monolayer formation time at 10^{-4} Pa is about: | 3 s | 3 ms | 3 hours | 3 years | 3 × 10^{-4}/P.
M2: Helium is used for leak detection because it: | Is light, inert and rare in air | Is heavy | Is reactive | Is cheap only | Penetrates small leaks, easy to detect.

## Cryogenic systems
S: Cryogenic systems cool apparatus to temperatures from 77 K down to microkelvin, where superconductivity, quantum effects and ultra-low noise appear. They are essential for MRI magnets, particle accelerators, quantum computers and sensitive detectors.
H: Cryogens and temperatures
- Liquid nitrogen: 77 K (cheap, safe-ish).
- Liquid helium-4: 4.2 K; pumped to ~1.5 K; superfluid below 2.17 K.
- Helium-3: 3.2 K boiling; pumped to ~0.3 K.
- **Dilution refrigerator**: ^{3}He–^{4}He mixture reaches ~5–10 mK continuously.
- **Adiabatic demagnetisation**: paramagnetic salts or nuclear spins to μK.
H: Cooling technologies
- **Pulse-tube and Gifford–McMahon cryocoolers**: reach 3–4 K without liquid helium; "dry" systems are now common.
- **Stirling coolers**, **Joule–Thomson** expansion, **evaporative cooling**.
- Cooling power falls steeply at low T: a dilution fridge may give ~10 μW at 20 mK.
E: COP_{Carnot} = T_{c}/(T_{h} − T_{c}) :: ideal refrigerator efficiency
H: Thermal design
P: Heat leaks arrive by conduction (supports, wires), radiation (σT^{4}, blocked by nested shields and multilayer insulation) and gas (removed by vacuum). Wiring uses low-conductivity materials (manganin, NbTi, stainless coax) and thermal anchoring at each stage. Materials change at low T: thermal contraction, brittleness, heat capacity falling as T^{3}. Hazards: asphyxiation from boil-off (1 L liquid He → ~750 L gas), cold burns, pressure build-up, magnet quenches.
X: Carnot COP for removing heat at 4 K with rejection at 300 K?
> 4/296 ≈ 0.0135: at least ~74 W of work per watt removed (real systems need ~1000 W/W)
X: Radiation from 300 K to a 77 K shield of 1 m^{2} (ε = 0.05 effective)?
> P ≈ 0.05 × 5.67 × 10^{-8} × (300^{4} − 77^{4}) ≈ 0.05 × 5.67 × 10^{-8} × 8.06 × 10^{9} ≈ 23 W
K: Cryogenics trades huge work for tiny cooling power at low T, so heat leaks must be minimised by careful design.
!: Liquid helium boil-off expands ~750× in volume; confined spaces can become asphyxiation hazards.
Q: How does a dilution refrigerator reach millikelvin temperatures? | ^{3}He crossing a phase boundary into a ^{3}He–^{4}He mixture absorbs heat, like evaporation.
Q: What is multilayer insulation? | Many thin reflective layers that reduce radiative heat transfer.
M1: Liquid nitrogen boils at: | 77 K | 4.2 K | 20 K | 273 K | Common first-stage cryogen.
M2: A pulse-tube cryocooler is a "dry" system because it: | Needs no liquid helium bath | Uses no gas | Works at room temperature | Uses water | Closed-cycle helium gas.

## High-field magnets
S: High-field magnets create intense magnetic fields for MRI, particle accelerators, fusion reactors and materials research. Superconducting magnets deliver steady fields to ~45 T, while pulsed magnets briefly exceed 100 T, constrained by forces, heat and superconductor limits.
H: Types
- **Iron-core electromagnets**: up to ~2 T (iron saturates).
- **Resistive (Bitter) magnets**: water-cooled copper plates, ~30–40 T, using megawatts of power.
- **Superconducting**: NbTi (to ~10 T at 1.9–4.2 K), Nb_{3}Sn (~16 T), REBCO high-temperature superconductors (>20 T; 32 T all-superconducting at NHMFL; 45.5 T test coil).
- **Hybrid**: superconducting outsert + resistive insert (45 T steady).
- **Pulsed**: capacitor banks drive copper coils to ~100 T for milliseconds.
E: B = μ_{0}nI :: long solenoid
E: P_{mag} = B^{2}/(2μ_{0}) :: magnetic pressure
H: Engineering challenges
- Magnetic pressure: at 20 T, B^{2}/2μ_{0} ≈ 160 MPa, comparable to steel strength.
- Stored energy E = ½LI^{2} (MJ–GJ) must be dumped safely in a **quench** when superconductivity is lost.
- Critical current density J_{c}(B, T) limits superconductors.
- Field quality and homogeneity: MRI needs ppm uniformity, achieved with shimming.
E: E = ∫B^{2}/(2μ_{0}) dV = ½LI^{2} :: stored energy
H: Applications
P: LHC dipoles: 8.3 T NbTi at 1.9 K; HL-LHC quadrupoles: Nb_{3}Sn ~11 T. ITER's toroidal field coils store ~41 GJ. Compact fusion devices (SPARC) use REBCO tape for ~12 T on plasma. MRI: 1.5–3 T clinical, 7–11.7 T research. High fields reveal quantum oscillations, the quantum Hall effect and new phases.
X: Magnetic pressure at 8.3 T?
> B^{2}/(2μ_{0}) = 68.9/(2 × 1.257 × 10^{-6}) ≈ 27 MPa (~270 atm)
X: Field of a solenoid with 5000 turns per metre and 100 A?
> B = 1.257 × 10^{-6} × 5000 × 100 ≈ 0.63 T
K: Higher fields need better superconductors and stronger structures; magnetic pressure and quench protection are central design constraints.
!: Superconducting magnets store enormous energy; an unprotected quench can destroy the magnet.
Q: What is a quench? | Sudden loss of superconductivity, converting stored magnetic energy into heat.
Q: Why are REBCO superconductors exciting for fusion? | They carry high currents in very strong fields at higher temperatures, enabling compact high-field magnets.
M1: Iron-core electromagnets are limited to ~2 T because: | Iron saturates | Copper melts | Superconductors fail | Air breaks down | Magnetisation maximum.
M2: Magnetic pressure scales as: | B^{2} | B | 1/B | B^{3} | B^{2}/2μ_{0}.

## Laser systems
S: Lasers produce intense, directional, coherent light by stimulated emission in a gain medium inside an optical cavity. Laser systems, from milliwatt diodes to petawatt facilities, are tools for spectroscopy, cutting, surgery, communication, metrology and fusion.
H: Components
- **Gain medium**: gas (HeNe, CO_{2}, argon ion), solid-state (Nd:YAG, Ti:sapphire, Yb fibre), semiconductor, dye.
- **Pump**: electrical discharge, flashlamps, diode lasers.
- **Resonator**: mirrors (one partially transmitting) supporting longitudinal and transverse modes.
- **Threshold**: gain must exceed round-trip losses.
E: R_{1}R_{2}e^{2(g−α)L} ≥ 1 :: laser threshold
E: Δν_{FSR} = c/(2nL) :: longitudinal mode spacing
H: Beam properties
- TEM_{00} Gaussian beam: waist w_{0}, Rayleigh range z_{R} = πw_{0}^{2}/λ, divergence θ = λ/(πw_{0}).
- Beam quality M^{2} (1 for ideal Gaussian).
- Operating modes: continuous wave, Q-switched (ns, high peak), mode-locked (fs–ps).
E: w(z) = w_{0}√(1 + (z/z_{R})^{2}) :: Gaussian beam radius
H: Safety and uses
P: Laser classes 1 (safe) to 4 (hazardous to eyes, skin, fire). Retinal damage from visible and near-IR beams happens in milliseconds because the eye focuses them; use appropriate goggles (optical density at the wavelength), interlocks and beam enclosures. Fibre lasers dominate industrial cutting (multi-kW); CO_{2} lasers at 10.6 μm cut non-metals; Ti:sapphire powers ultrafast science; NIF used 192 beams (~2 MJ) to achieve fusion ignition in 2022.
X: A HeNe (633 nm) beam has w_{0} = 0.5 mm. Rayleigh range and divergence?
> z_{R} = π(5 × 10^{-4})^{2}/(6.33 × 10^{-7}) ≈ 1.24 m
> θ = 6.33 × 10^{-7}/(π × 5 × 10^{-4}) ≈ 0.40 mrad
X: Mode spacing for a 30 cm cavity?
> c/2L = 3 × 10^{8}/0.6 = 500 MHz
K: A laser is gain plus feedback above threshold; Gaussian-beam optics and operating modes determine what it can do.
!: Never look into a beam path; reflections from shiny tools or jewellery can be as dangerous as the direct beam.
Q: What does M^{2} describe? | Beam quality relative to an ideal Gaussian beam (M^{2} = 1).
Q: What is Q-switching? | Holding off lasing to store energy, then releasing it as an intense nanosecond pulse.
M1: Rayleigh range scales as: | w_{0}^{2}/λ | λ/w_{0} | w_{0} | λ^{2} | πw_{0}^{2}/λ.
M2: Class 4 lasers can: | Damage eyes and skin and start fires | Never harm | Only affect cameras | Be viewed safely | Highest hazard class.

## Optical benches and alignment
S: Optical benches provide stable, vibration-isolated platforms where lenses, mirrors and lasers are mounted and aligned. Careful alignment techniques make interferometers, microscopes and laser systems work at their theoretical limits.
H: The platform
- Optical tables: honeycomb steel cores with tapped holes on a 25 mm (or 1 inch) grid.
- Pneumatic isolation legs suppress floor vibrations above a few Hz.
- Enclosures reduce air currents, dust and temperature drift.
- Kinematic mounts give repeatable positioning with fine adjustment screws.
H: Alignment techniques
- **Two-mirror walking**: adjust the near mirror to hit a target, the far mirror to hit a second target; iterate until the beam is collinear with the axis.
- Use irises at fixed heights and beam cards or cameras.
- Keep beams at one height and parallel to table holes.
- Align at low power with visible guide lasers for IR systems.
- **Autocollimation** checks surfaces are perpendicular to the beam.
H: Lenses and imaging
P: Thin lens equation 1/f = 1/u + 1/v; magnification m = −v/u. Telescopes (two lenses separated by f_{1} + f_{2}) expand beams by f_{2}/f_{1}. Spatial filters (lens + pinhole) clean beam profiles. Mode matching into cavities requires correct waist size and position. Polarisation optics (wave plates, polarisers, isolators) control polarisation and prevent back-reflections into lasers.
E: 1/f = 1/u + 1/v :: thin lens
E: M = f_{2}/f_{1} :: beam expander magnification
X: Expand a 1 mm beam to 5 mm with f_{1} = 25 mm. Second lens and spacing?
> f_{2} = 5 × 25 = 125 mm; spacing = 150 mm
X: Pinhole size for a spatial filter with f = 50 mm, λ = 633 nm, input beam 1 mm diameter?
> Focused spot diameter ≈ 4λf/(πD) = 4 × 633e-9 × 0.05/(π × 0.001) ≈ 40 μm
> Use a pinhole ~1.5× larger, ~60 μm
K: Stable mounts, isolation and systematic two-mirror alignment are the foundation of reliable optics.
!: Thermal drift and air currents misalign sensitive setups; let systems equilibrate and enclose them.
Q: What is beam walking? | Iteratively adjusting two mirrors to make a beam travel along a desired axis.
Q: What does a spatial filter do? | Removes high-spatial-frequency noise from a laser beam using a focusing lens and a pinhole.
M1: A Keplerian beam expander has lens spacing: | f_{1} + f_{2} | f_{1} − f_{2} | f_{1}f_{2} | 2f_{1} | Focal points coincide.
M2: Optical isolators protect lasers from: | Back-reflections | Heat | Vibration | Dust | Faraday rotation one-way.

## Spectroscopy
S: Spectroscopy measures how matter absorbs, emits or scatters light as a function of wavelength. Each atom and molecule has a unique spectral fingerprint, so spectroscopy reveals composition, temperature, motion and structure from the lab bench to distant galaxies.
H: Types
- **Atomic emission and absorption**: sharp lines from electronic transitions (flame tests, ICP-OES, stellar spectra).
- **UV–visible absorption**: electronic transitions in molecules; Beer–Lambert concentration measurements.
- **Infrared**: molecular vibrations; functional-group fingerprints (FTIR).
- **Raman**: inelastic scattering shifted by vibrational energies.
- **Fluorescence**: emission after absorption; very sensitive.
- **NMR and ESR**: nuclear and electron spin transitions in magnetic fields.
- **X-ray (XPS, XRF, XAS)** and **mass spectrometry** (not optical, but spectral).
E: A = εcl = log_{10}(I_{0}/I) :: Beer–Lambert law
E: Δν̃ = ν̃_{laser} − ν̃_{scattered} :: Raman shift (cm^{-1})
H: Instruments
- Dispersive spectrometers: gratings (d sin θ = mλ) with CCD detectors.
- Resolving power R = λ/Δλ = mN for a grating.
- Fourier-transform spectrometers: Michelson interferometer, Fourier transform of the interferogram; multiplex and throughput advantages.
- Laser spectroscopy: tunable lasers, saturated absorption, frequency combs for extreme precision.
E: R = λ/Δλ = mN :: grating resolving power
H: Line shapes
P: Natural broadening (lifetime), Doppler broadening (Gaussian, ∝ √(T/m)), pressure broadening (Lorentzian) and instrumental broadening shape lines. Line positions give composition and Doppler shifts; widths give temperature and pressure; ratios give abundances. Astronomers measure redshifts, exoplanet atmospheres and stellar compositions this way.
E: Δλ_{D}/λ = √(8k_{B}T ln2/(mc^{2})) :: Doppler FWHM
X: To resolve the sodium D lines (589.0, 589.6 nm), what resolving power is needed?
> R = 589.3/0.6 ≈ 982
> A 1200 lines/mm grating illuminated over 1 mm in first order gives R = 1200: enough
X: A solution has ε = 1.5 × 10^{4} L mol^{-1} cm^{-1}, path 1 cm, A = 0.6. Concentration?
> c = 0.6/(1.5 × 10^{4}) = 4 × 10^{-5} mol L^{-1}
K: Spectra are fingerprints: line positions identify species, widths and shifts reveal conditions.
!: Beer–Lambert fails at high concentrations and with scattering samples; stay within the linear range.
Q: What does Raman spectroscopy measure? | Inelastic light scattering shifted by molecular vibration energies.
Q: Why are FTIR spectrometers advantageous? | They record all wavelengths simultaneously with high throughput (Fellgett and Jacquinot advantages).
M1: Doppler broadening increases with: | Temperature | Mass | Pressure only | Lifetime | ∝ √(T/m).
M2: Grating resolving power equals: | mN | λN | d sin θ | m/N | Order × illuminated lines.

## Interferometry
S: Interferometry splits light (or matter waves) into paths, recombines them, and reads tiny path differences from the resulting fringes. It measures distances, surface shapes, refractive indices, rotations and gravitational waves with exquisite sensitivity.
H: Common interferometers
- **Michelson**: beam splitter and two mirrors; fringe shift per λ/2 mirror motion (FTIR, LIGO).
- **Mach–Zehnder**: two separate paths; refractive index and phase measurements, modulators.
- **Fabry–Pérot**: multiple reflections between parallel mirrors; very narrow transmission peaks for spectroscopy and laser cavities.
- **Sagnac**: counter-propagating loops for rotation sensing.
- **Fizeau and Twyman–Green**: optical surface testing to λ/20 or better.
E: I = I_{1} + I_{2} + 2√(I_{1}I_{2})cos Δφ :: two-beam interference
E: F = π√R/(1 − R) :: Fabry–Pérot finesse
H: Coherence
- Fringes require path differences within the coherence length l_{c} ≈ λ^{2}/Δλ.
- White light: l_{c} ~ μm; stabilised lasers: km.
- Fringe visibility V = (I_{max} − I_{min})/(I_{max} + I_{min}) measures coherence.
H: Frontiers
P: LIGO's 4 km arms with Fabry–Pérot cavities and power recycling detect strains ~10^{-21}; squeezed light reduces quantum noise. Stellar and radio interferometry (VLTI, ALMA, Event Horizon Telescope) synthesise huge apertures; the EHT imaged black hole shadows. Atom interferometers measure gravity and fundamental constants. Optical coherence tomography uses low-coherence interferometry for medical imaging.
X: A white-light source (λ = 550 nm, Δλ = 300 nm). Coherence length?
> l_{c} ≈ 550^{2}/300 ≈ 1000 nm ≈ 1 μm
X: Fabry–Pérot with R = 0.95. Finesse?
> F = π√0.95/0.05 ≈ 61
K: Interferometers convert phase differences into intensity changes, measuring lengths to tiny fractions of a wavelength.
!: Interferometers are extremely sensitive to vibration and air turbulence; isolation and enclosures are essential.
Q: What does finesse describe? | The sharpness of Fabry–Pérot resonances: free spectral range divided by linewidth.
Q: How long must path differences be to see fringes? | Within the coherence length λ^{2}/Δλ.
M1: Fringe visibility of 1 means: | Perfect coherence and equal intensities | No interference | Half intensity | Incoherent light | Full contrast.
M2: Surface flatness is tested with: | Fizeau interferometers | Geiger counters | Spectrometers | Thermocouples | Fringe patterns map height.

## Microwave and radio-frequency measurement
S: RF and microwave measurements characterise signals and components from kilohertz to hundreds of gigahertz. They are vital for communications, radar, accelerators, quantum computing and radio astronomy, using tools like vector network analysers and spectrum analysers.
H: Transmission lines and impedance
- Coaxial cables, waveguides and microstrip carry signals; characteristic impedance usually 50 Ω.
- Mismatched loads reflect power: reflection coefficient Γ = (Z_{L} − Z_{0})/(Z_{L} + Z_{0}).
- VSWR = (1 + |Γ|)/(1 − |Γ|); return loss = −20 log|Γ| dB.
- Smith charts visualise impedance and matching networks.
E: Γ = (Z_{L} − Z_{0})/(Z_{L} + Z_{0}) :: reflection coefficient
E: VSWR = (1 + |Γ|)/(1 − |Γ|) :: voltage standing-wave ratio
H: Instruments
- **Vector network analyser (VNA)**: measures S-parameters (S_{11} reflection, S_{21} transmission) in magnitude and phase.
- **Spectrum analyser**: power versus frequency; noise floor, harmonics, spurious signals.
- **Power meters**, **oscilloscopes** (up to ~100 GHz real-time), **signal generators**.
- Calibration (SOLT: short, open, load, thru) removes cable and fixture effects.
H: Noise and units
P: Power in dBm (0 dBm = 1 mW). Thermal noise floor k_{B}TB = −174 dBm/Hz at 290 K. Amplifier noise figure NF = 10 log(SNR_{in}/SNR_{out}); cascaded noise follows Friis' formula, so the first amplifier dominates. Cryogenic HEMT and quantum-limited parametric amplifiers read out superconducting qubits. Resonator Q-factors are measured from S_{21} linewidths.
E: P_{noise} = −174 dBm/Hz + 10 log_{10}B :: thermal noise floor
E: F_{total} = F_{1} + (F_{2} − 1)/G_{1} + … :: Friis formula
X: A 75 Ω load on a 50 Ω line. Γ and VSWR?
> Γ = 25/125 = 0.2
> VSWR = 1.2/0.8 = 1.5; reflected power 4%
X: Noise floor in a 1 MHz bandwidth at 290 K?
> −174 + 60 = −114 dBm
K: Match impedances, calibrate fixtures, and keep the first amplifier low-noise; S-parameters describe RF components.
!: Unmatched connections cause reflections and standing waves; always calibrate a VNA at the measurement plane.
Q: What does S_{21} measure? | Forward transmission from port 1 to port 2.
Q: Why does the first amplifier dominate system noise? | Later stages' noise is divided by the first stage's gain (Friis formula).
M1: 0 dBm corresponds to: | 1 mW | 1 W | 0 W | 1 μW | Reference power.
M2: A perfect match has: | Γ = 0, VSWR = 1 | Γ = 1 | VSWR = ∞ | Γ = −1 | No reflection.

## Electronics and signal processing
S: Electronics amplify, filter and digitise signals from sensors, while signal processing extracts information from noise. Op-amps, filters, ADCs and digital techniques like lock-in detection and Fourier analysis are core tools for every experimentalist.
H: Analogue building blocks
- **Op-amps**: inverting gain −R_{f}/R_{in}; non-inverting 1 + R_{f}/R_{in}; transimpedance for photodiodes (V = −IR_{f}).
- **Gain–bandwidth product** limits speed: GBW = gain × bandwidth.
- **Filters**: RC low-pass f_{c} = 1/(2πRC); active filters (Butterworth, Bessel) for sharper roll-off.
- **Instrumentation amplifiers** reject common-mode noise.
E: f_{c} = 1/(2πRC) :: RC cutoff
E: V_{out} = −(R_{f}/R_{in})V_{in} :: inverting amplifier
H: Noise
- **Johnson noise**: v_{n} = √(4k_{B}TRB).
- **Shot noise**: i_{n} = √(2eIB).
- **1/f (flicker) noise** dominates at low frequency.
- Shielding, grounding (avoid ground loops), twisted pairs and differential signalling reduce interference.
E: v_{n} = √(4k_{B}TRB) :: Johnson noise
H: Digital processing
P: ADCs sample at f_{s} > 2f_{max} (Nyquist), with anti-aliasing filters; an N-bit ADC has quantisation SNR ≈ 6.02N + 1.76 dB. Digital filters (FIR, IIR), FFT analysis, averaging and correlation extract signals. **Lock-in amplifiers** multiply the signal by a reference at the modulation frequency and low-pass filter, recovering signals buried under noise 10^{6} times larger. FPGAs perform real-time processing.
E: SNR_{q} = 6.02N + 1.76 dB :: ideal ADC SNR
X: Johnson noise of 1 MΩ at 300 K in 10 kHz bandwidth?
> v = √(4 × 1.38 × 10^{-23} × 300 × 10^{6} × 10^{4}) ≈ 12.9 μV
X: An op-amp with GBW 10 MHz at gain 100: bandwidth?
> 10 MHz/100 = 100 kHz
K: Amplify early with low noise, filter to the needed bandwidth, sample above Nyquist, and use lock-in or averaging for weak signals.
!: Ground loops inject mains hum; use a single ground point and differential inputs.
Q: How does a lock-in amplifier work? | It multiplies the signal by a reference at the modulation frequency and low-pass filters, isolating the component at that frequency.
Q: What is the gain–bandwidth product? | For an op-amp, gain times bandwidth is roughly constant.
M1: Johnson noise is reduced by: | Cooling and narrowing bandwidth | Increasing resistance | Raising temperature | Adding gain | ∝ √(TRB).
M2: A 16-bit ADC has ideal SNR of about: | 98 dB | 16 dB | 48 dB | 160 dB | 6.02 × 16 + 1.76.

## Materials characterisation
S: Materials characterisation measures a material's structure, composition and properties, linking how atoms are arranged to how the material behaves. Techniques span optical, electrical, mechanical, thermal and microscopic methods across many length scales.
H: Structure and composition
- **X-ray diffraction**: crystal structure, phases, strain.
- **Electron microscopy (SEM, TEM)** with EDX: morphology, composition, atomic imaging.
- **XPS**: surface chemistry and oxidation states.
- **Raman and FTIR**: bonding and phases (e.g. graphene layer count).
- **SIMS and Rutherford backscattering**: depth profiles of elements.
H: Properties
- **Electrical**: four-point probe resistivity, Hall effect (carrier density and mobility), impedance spectroscopy.
- **Mechanical**: tensile testing (Young's modulus, yield strength), nanoindentation (hardness).
- **Thermal**: DSC (phase transitions, heat capacity), TGA (mass change), laser flash (thermal diffusivity).
- **Magnetic**: SQUID and vibrating sample magnetometry.
- **Optical**: ellipsometry, UV-vis, photoluminescence (band gaps).
E: ρ = (π/ln2)(V/I)t ≈ 4.53(V/I)t :: four-point probe on thin film
E: n = IB/(eV_{H}t) :: Hall carrier density
H: Choosing techniques
P: Match length scale (atomic to bulk), information depth (surface vs bulk), destructiveness and sample environment. Combine complementary methods: e.g. XRD for phase, TEM for defects, XPS for surface chemistry. Correlative and in situ/operando characterisation (watching batteries charge in an X-ray beam) reveal how materials change in use.
X: A film 100 nm thick shows V/I = 10 Ω in a four-point probe. Resistivity?
> ρ = 4.53 × 10 × 10^{-7} m ≈ 4.5 × 10^{-6} Ω m
X: Hall: I = 1 mA, B = 0.5 T, V_{H} = 2 mV, t = 1 μm. Carrier density?
> n = 10^{-3} × 0.5/(1.6 × 10^{-19} × 2 × 10^{-3} × 10^{-6}) ≈ 1.6 × 10^{24} m^{-3}
K: Characterisation links structure to properties; combine complementary techniques at the right length scales.
!: Surface techniques (XPS, AFM) may not represent the bulk; contamination and oxide layers can mislead.
Q: What does the Hall effect measure? | Carrier type, density and (with resistivity) mobility.
Q: What does DSC detect? | Heat flow changes from phase transitions, melting, crystallisation and heat capacity.
M1: Four-point probes avoid errors from: | Contact resistance | Temperature | Light | Magnetic fields | Separate current and voltage contacts.
M2: XPS mainly probes: | The top few nanometres | Bulk centimetres | Nuclear spins | Grain size | Short photoelectron escape depth.

## Scanning probe microscopy
S: Scanning probe microscopes image surfaces by scanning a sharp tip just above or on them, measuring currents, forces or other interactions. They resolve individual atoms, manipulate molecules and map electrical, magnetic and mechanical properties at the nanoscale.
H: Scanning tunnelling microscopy (STM)
- A voltage between a conducting tip and sample drives a tunnelling current across a ~0.5 nm gap.
- Current falls exponentially: I ∝ e^{−2κd}, κ = √(2mφ)/ħ ≈ 10 nm^{-1}; a 0.1 nm change alters I by ~10×.
- Feedback keeps current constant; tip height maps topography convolved with electronic states.
- **STS** (dI/dV) maps local density of states.
- Invented by Binnig and Rohrer (Nobel 1986); IBM wrote "IBM" with xenon atoms in 1989.
E: I ∝ V e^{−2κd}, κ = √(2mφ)/ħ :: tunnelling current
H: Atomic force microscopy (AFM)
- A cantilever with a sharp tip senses forces (van der Waals, electrostatic, chemical).
- Deflection detected by a laser bouncing off the cantilever onto a split photodiode.
- **Contact**, **tapping** (intermittent) and **non-contact** modes.
- Works on insulators, liquids and biological samples.
- Frequency-modulation AFM with CO-functionalised tips resolves chemical bonds in molecules.
E: F = kΔz :: cantilever force (Hooke's law)
H: Variants
P: Magnetic force microscopy (MFM), Kelvin probe force microscopy (surface potential), conductive AFM, piezoresponse force microscopy, scanning near-field optical microscopy (SNOM, beating the diffraction limit), and scanning SQUID or NV-centre magnetometry. Piezoelectric scanners give picometre positioning; vibration isolation and low drift are essential.
X: φ = 4.5 eV. Estimate κ and how much the current changes if the gap grows by 0.1 nm.
> κ = √(2 × 9.11 × 10^{-31} × 7.2 × 10^{-19})/1.055 × 10^{-34} ≈ 1.09 × 10^{10} m^{-1}
> Factor e^{−2 × 1.09 × 10^{10} × 10^{-10}} = e^{−2.2} ≈ 0.11: about 9× smaller
X: A cantilever with k = 0.1 N m^{-1} deflects 2 nm. Force?
> F = 0.1 × 2 × 10^{-9} = 0.2 nN
K: STM uses tunnelling current, AFM uses force; both scan sharp tips to reach atomic resolution.
!: Images reflect tip–sample interaction, not pure topography; blunt or double tips create artefacts.
Q: Why is STM so sensitive to height? | Tunnelling current depends exponentially on the gap.
Q: Why can AFM image insulators? | It measures forces rather than electrical current.
M1: STS measures: | Local density of electronic states | Mass | Temperature | Magnetic moment only | dI/dV spectra.
M2: Tapping mode reduces: | Lateral forces that damage soft samples | Resolution | Scan speed | Noise only | Intermittent contact.

## Electron microscopy
S: Electron microscopes use beams of electrons, with wavelengths thousands of times shorter than light, to image materials and biological specimens down to individual atoms. SEM images surfaces; TEM looks through thin samples; cryo-EM determines protein structures.
H: Why electrons?
- de Broglie wavelength: λ = h/√(2m_{e}eV(1 + eV/2m_{e}c^{2})); at 200 kV, λ ≈ 2.5 pm.
- Resolution limited mainly by lens aberrations, not wavelength; aberration correctors now reach ~50 pm.
- Magnetic lenses focus the beam; vacuum is required.
E: λ ≈ 1.226/√V nm (non-relativistic) :: electron wavelength
H: SEM
- A focused beam rasters over the surface.
- **Secondary electrons**: topography with great depth of field.
- **Backscattered electrons**: atomic-number contrast.
- **EDX**: characteristic X-rays give elemental maps.
- **EBSD**: crystal orientation maps.
- Resolution ~1 nm; samples coated if insulating.
H: TEM and STEM
- Samples < ~100 nm thick; electrons transmit.
- Bright-field, dark-field, diffraction patterns, high-resolution phase-contrast imaging.
- **STEM** with annular dark-field detectors gives Z-contrast atomic images.
- **EELS** measures energy loss: composition, bonding, band gaps.
H: Cryo-EM
P: Biological samples are flash-frozen in vitreous ice to preserve structure. Tens of thousands of noisy images of randomly oriented molecules are averaged computationally to reconstruct 3D structures at near-atomic resolution (Nobel Chemistry 2017). Direct electron detectors made the "resolution revolution". Beam damage limits dose, especially for organic samples.
X: Electron wavelength at 100 V (non-relativistic)?
> λ ≈ 1.226/10 = 0.12 nm
X: Why does cryo-EM need many images?
> Low dose to avoid damage gives very noisy images; averaging N copies improves SNR by √N
K: Short electron wavelengths give atomic resolution; SEM images surfaces, TEM/STEM see inside, and cryo-EM solves biomolecules.
!: Electron beams damage samples; dose must be limited, especially for organics and beam-sensitive materials.
Q: What do backscattered electrons reveal? | Atomic-number (composition) contrast.
Q: Why must TEM samples be thin? | Electrons must pass through without excessive scattering or absorption.
M1: Aberration correctors allow resolution near: | 50 pm | 1 μm | 1 mm | 1 nm only | Sub-ångström.
M2: EDX analysis uses: | Characteristic X-rays | Secondary electrons | Light | Neutrons | Elemental fingerprint.

## X-ray diffraction
S: X-ray diffraction reveals how atoms are arranged in crystals by measuring the angles and intensities of X-rays scattered from lattice planes. It determined the structures of DNA, proteins and countless materials, and it identifies phases in everyday labs.
H: Bragg's law
- Constructive interference from planes spacing d: nλ = 2d sin θ.
- Cu Kα (λ = 0.15406 nm) is the common lab source.
- Peak positions give lattice parameters; cubic: d = a/√(h^{2} + k^{2} + l^{2}).
E: nλ = 2d sin θ :: Bragg's law
E: d_{hkl} = a/√(h^{2} + k^{2} + l^{2}) :: cubic spacing
H: Intensities and structure
- Peak intensities depend on the structure factor F_{hkl} = Σf_{j}e^{2πi(hx_{j} + ky_{j} + lz_{j})}.
- Systematic absences reveal lattice type: BCC needs h + k + l even; FCC needs all even or all odd.
- The phase problem: intensities give |F|, not phase; solved by direct methods, heavy atoms, molecular replacement.
E: I ∝ |F_{hkl}|^{2} :: intensity and structure factor
H: Powder and other methods
P: Powder XRD identifies phases by matching patterns to databases; Rietveld refinement fits full patterns for lattice parameters and phase fractions. Scherrer's equation estimates crystallite size from peak width: τ = Kλ/(β cos θ). Single-crystal diffraction solves full structures. Synchrotrons and X-ray free-electron lasers allow time-resolved and nanocrystal studies.
E: τ = Kλ/(β cos θ) :: Scherrer equation
X: Copper (FCC, a = 0.3615 nm). Angle of the (111) peak with Cu Kα?
> d = 0.3615/√3 = 0.2087 nm
> sin θ = 0.15406/(2 × 0.2087) = 0.369 ⇒ θ = 21.7°, 2θ ≈ 43.3°
X: Which of (100), (110), (111), (200) appear for FCC?
> (111) and (200) appear; (100) and (110) are absent (mixed parity)
K: Bragg's law gives spacings from angles; structure factors explain intensities and absences.
!: Peak broadening comes from both small crystallite size and strain, as well as instrument effects; separate them before quoting sizes.
Q: What is the phase problem in crystallography? | Measured intensities give structure-factor magnitudes but not phases.
Q: Which reflections appear for BCC lattices? | Those with h + k + l even.
M1: Bragg's law is: | nλ = 2d sin θ | λ = d sin θ | nλ = d cos θ | λ = 2d | Path difference between planes.
M2: Scherrer's equation estimates: | Crystallite size | Lattice type | Atomic number | Density | From peak width.

## Neutron scattering
S: Neutron scattering probes materials with neutrons from reactors or spallation sources. Neutrons penetrate deeply, see light atoms like hydrogen, distinguish isotopes and carry a magnetic moment, making them unique for studying magnetism, dynamics and soft matter.
H: Why neutrons?
- Neutral: penetrate cm of metal; study bulk samples in pressure cells, furnaces, magnets.
- Scatter from nuclei: scattering length varies irregularly with Z; hydrogen and deuterium very different (contrast variation).
- Magnetic moment: directly sees magnetic structures and excitations.
- Thermal neutrons: λ ~ 0.1–1 nm, energy ~meV, matching atomic spacings and excitation energies.
E: λ = h/√(2m_{n}E); E(meV) = 81.8/λ^{2}(Å^{2}) :: neutron wavelength–energy
H: Techniques
- **Diffraction**: crystal and magnetic structures.
- **Small-angle neutron scattering (SANS)**: 1–100 nm structures (polymers, proteins, micelles).
- **Inelastic neutron scattering**: phonon and magnon dispersions S(Q, ω) (triple-axis, time-of-flight spectrometers).
- **Reflectometry**: thin films and interfaces.
- **Quasi-elastic**: diffusion and molecular motion.
- **Imaging/radiography**: engines, batteries, archaeological objects.
E: Q = 4π sin θ/λ :: momentum transfer
H: Sources
P: Research reactors (ILL Grenoble, NIST) provide steady beams; spallation sources (ISIS, SNS, J-PARC, ESS in Sweden) hit heavy metal targets with protons for pulsed beams ideal for time-of-flight. Neutron facilities are national user facilities; beamtime is awarded by proposal. Flux is low compared with X-rays, so samples are larger and experiments longer.
X: A 5 Å neutron: energy and speed?
> E = 81.8/25 ≈ 3.3 meV
> v = h/(m_{n}λ) = 6.63 × 10^{-34}/(1.675 × 10^{-27} × 5 × 10^{-10}) ≈ 790 m s^{-1}
X: SANS at Q = 0.01 Å^{-1}: what length scale?
> d ≈ 2π/Q ≈ 630 Å ≈ 63 nm
K: Neutrons see nuclei and magnetism, penetrate deeply and match atomic energies, complementing X-rays.
!: Neutron flux is limited; experiments need large samples and long counting, and some isotopes (Cd, B, Gd) absorb strongly.
Q: Why is deuteration useful in neutron scattering? | H and D scatter very differently, allowing contrast matching to highlight parts of a sample.
Q: What does inelastic neutron scattering measure? | Excitation spectra such as phonons and magnons, S(Q, ω).
M1: Neutrons are sensitive to magnetism because they: | Have a magnetic moment | Are charged | Are massless | Emit light | Spin ½ moment.
M2: The European Spallation Source is in: | Sweden | France | USA | Japan | Lund.

## Synchrotron methods
S: Synchrotrons accelerate electrons around rings to produce extremely bright, tunable X-rays and other light. Thousands of scientists use them for diffraction, spectroscopy and imaging in materials science, chemistry, biology, medicine and cultural heritage.
H: How synchrotron light is made
- Electrons at ~3–6 GeV circulate in a storage ring; bending magnets and insertion devices make them radiate.
- **Undulators**: periodic magnets produce narrow, intense harmonics; brightness 10^{9}–10^{12} times a lab X-ray tube.
- **Fourth-generation** multi-bend achromat rings (MAX IV, ESRF-EBS) shrink emittance for near-diffraction-limited, highly coherent beams.
- **X-ray free-electron lasers** (LCLS, European XFEL) give femtosecond pulses with laser-like brightness.
E: λ_{n} = (λ_{u}/2nγ^{2})(1 + K^{2}/2 + γ^{2}θ^{2}) :: undulator harmonics
E: E_{c}(keV) = 0.665E^{2}(GeV)B(T) :: bending magnet critical energy
H: Techniques
- **Macromolecular crystallography**: most protein structures.
- **XAS (XANES, EXAFS)**: oxidation states and local bonding.
- **X-ray fluorescence mapping**: trace elements at sub-μm resolution.
- **Tomography and phase-contrast imaging**: 3D internal structure, fast in situ.
- **ARPES** with UV/soft X-rays: electronic band structures.
- **Ptychography** and coherent diffraction imaging: lensless nanoscale imaging.
H: Applications
P: Battery operation in real time, catalyst behaviour, viral protein structures for vaccines, fossils and paintings examined non-destructively, and microchips imaged in 3D at nanometre resolution. Experiments are run at beamlines with sample environments for temperature, pressure and gas. Radiation damage is a concern for biological samples.
X: Bending magnet critical energy for a 3 GeV ring with 1.4 T dipoles?
> E_{c} = 0.665 × 9 × 1.4 ≈ 8.4 keV
X: Why do XFELs allow "diffract before destroy"?
> Femtosecond pulses scatter before atoms move, so damage occurs after the diffraction pattern is recorded
K: Synchrotrons and XFELs provide tunable, brilliant X-rays enabling diffraction, spectroscopy and imaging impossible in home labs.
!: Intense X-rays damage samples; dose management, cryo-cooling or ultra-short pulses are needed.
Q: What does EXAFS reveal? | Local atomic structure around an absorbing element: neighbour distances and numbers.
Q: What makes fourth-generation synchrotrons special? | Very low emittance from multi-bend achromat lattices, giving highly coherent, brilliant beams.
M1: Undulators produce: | Narrow intense harmonics | Broad continuous spectra only | Neutrons | Visible light only | Constructive interference.
M2: XFEL pulses last about: | Femtoseconds | Seconds | Milliseconds | Nanoseconds only | Ultra-short.

## Particle accelerator operation
S: Operating a particle accelerator means injecting, accelerating, focusing, steering and colliding or extracting beams reliably for hours at a time. Operators balance beam quality, intensity and machine protection, using diagnostics and feedback systems.
H: Accelerator chain
- Sources (ion sources, electron guns) → linear accelerator → booster synchrotron → main ring.
- CERN example: Linac4 → PS Booster → PS → SPS → LHC (450 GeV injection, 6.8 TeV per beam).
- **RF cavities** accelerate and bunch particles; **dipoles** bend; **quadrupoles** focus (alternating gradient).
E: p(GeV/c) = 0.3B(T)ρ(m) :: magnetic rigidity
E: f_{rev} = βc/C :: revolution frequency
H: Beam dynamics
- Betatron oscillations about the design orbit; the **tune** (oscillations per turn) must avoid resonances.
- **Chromaticity** corrected by sextupoles.
- **Emittance** (beam size × divergence) is conserved without radiation; electron rings damp to equilibrium by synchrotron radiation.
- Collective effects: space charge, beam–beam, instabilities, electron clouds.
H: Operations
P: A fill cycle: inject, ramp energy, squeeze beams at collision points, declare "stable beams" for physics, then dump. Feedback loops control orbit, tune and RF. Machine protection uses beam loss monitors, collimators and interlocks. Availability and luminosity delivered are the key metrics. Operators train in control rooms with alarm systems and procedures; machine-learning tools now assist tuning.
X: LHC: 6.8 TeV protons with 8.3 T dipoles. Bending radius?
> ρ = p/(0.3B) = 6800/(0.3 × 8.3) ≈ 2730 m
X: Revolution frequency for the 26.7 km LHC?
> f ≈ 3 × 10^{8}/26 659 ≈ 11.2 kHz
K: Accelerators chain stages of acceleration; magnets focus and steer, RF accelerates, and diagnostics plus feedback keep beams stable and safe.
!: Integer and half-integer tunes cause resonances that blow up the beam; tunes are kept at carefully chosen values.
Q: What is the tune of an accelerator? | The number of betatron oscillations per revolution.
Q: Why do quadrupoles alternate in focusing direction? | A quadrupole focuses in one plane and defocuses in the other; alternating gives net focusing in both.
M1: Magnetic rigidity Bρ is proportional to: | Momentum | Energy only | Charge squared | Mass only | p = 0.3Bρ.
M2: Sextupoles correct: | Chromaticity | Orbit | Beam energy | Vacuum | Momentum-dependent focusing.

## Radiation measurement
S: Radiation measurement quantifies activity, dose and contamination to protect people and support research, medicine and industry. Choosing the right detector and understanding counting statistics are essential for reliable results.
H: Quantities
- **Activity** (Bq = decays per second).
- **Absorbed dose** (Gy), **equivalent and effective dose** (Sv).
- **Dose rate** (μSv h^{-1}); natural background ~0.1–0.3 μSv h^{-1}.
- **Fluence** and **contamination** (Bq cm^{-2}).
H: Instruments
- Ion chambers (dose rate), GM counters (contamination and presence), scintillation probes (low-level gamma), proportional counters (α/β discrimination).
- Personal dosimeters: TLD, OSL, electronic dosimeters.
- Spectrometers (NaI, HPGe) identify isotopes.
- Neutron detectors: He-3 or BF_{3} tubes in moderators.
H: Counting statistics
- Radioactive decay is Poisson: σ = √N.
- Net count = gross − background; σ_{net} = √(N_{g} + N_{b}) (for equal times).
- Minimum detectable activity depends on background, efficiency and count time.
E: σ_{N} = √N :: Poisson uncertainty
E: R_{net} = N_{g}/t_{g} − N_{b}/t_{b}, σ = √(N_{g}/t_{g}^{2} + N_{b}/t_{b}^{2}) :: net count rate
H: Good practice
P: Calibrate instruments with traceable sources, check response daily, use appropriate probes for the radiation type (thin windows for α and β), and correct for efficiency and geometry. Inverse-square law and shielding calculations predict dose rates. Record measurements systematically for regulatory compliance.
X: 400 gross counts in 100 s; background 100 counts in 100 s. Net rate and uncertainty?
> Net = 4 − 1 = 3 counts s^{-1}
> σ = √(400 + 100)/100 ≈ 0.22 counts s^{-1}
X: How long to measure 10 000 counts to 1% precision?
> σ/N = 1/√N = 1%: yes, 10 000 counts gives 1%
K: Pick detectors for the radiation type, subtract background with proper Poisson errors, and calibrate traceably.
!: A GM counter calibrated for Cs-137 can misread dose rates at very different energies.
Q: What is the uncertainty in N counts? | √N.
Q: Why use thin-window probes? | To let short-range alpha and low-energy beta particles reach the detector.
M1: 2500 counts gives relative uncertainty: | 2% | 0.04% | 50% | 25% | 1/√2500.
M2: He-3 tubes detect: | Thermal neutrons | Alpha only | Gamma only | Muons | n + ^{3}He → p + t.

## Experimental control systems
S: Control systems keep experiments at their set points: temperatures, positions, laser frequencies, beam orbits. Feedback loops measure, compare with targets and correct, while supervisory software coordinates instruments, interlocks and safety.
H: Feedback control
- **Error** e = set point − measurement; controller outputs a correction.
- **PID control**: u = K_{p}e + K_{i}∫e dt + K_{d}de/dt.
- Proportional reduces error, integral removes steady offset, derivative damps overshoot.
- Stability: too much gain or delay causes oscillation; Bode plots and phase margin quantify this.
E: u(t) = K_{p}e + K_{i}∫e dt + K_{d}de/dt :: PID controller
H: Tuning and examples
- Ziegler–Nichols: raise K_{p} until oscillation (K_{u}, period T_{u}); set K_{p} = 0.6K_{u}, T_{i} = T_{u}/2, T_{d} = T_{u}/8.
- Temperature stabilisation to mK; laser locking (Pound–Drever–Hall) to Hz-level linewidths; piezo position feedback; beam orbit feedback.
- Feedforward compensates known disturbances before they cause errors.
H: Supervisory systems
P: Large facilities use frameworks like EPICS and TANGO to network thousands of devices; PLCs handle industrial-grade interlocks. Safety systems are independent of control systems (separate hardware, fail-safe design, SIL ratings). Alarms, logging and archiving let operators diagnose faults; graphical interfaces present the state of the system.
X: A heater loop oscillates at K_{u} = 10 with period 60 s. Ziegler–Nichols PID?
> K_{p} = 6; T_{i} = 30 s; T_{d} = 7.5 s
X: Why does pure proportional control leave a steady-state error?
> A nonzero output (e.g. heater power) needs a nonzero error; integral action supplies it with zero error
K: Feedback measures and corrects; PID tuning balances speed, accuracy and stability, and safety interlocks must stand apart from control.
!: Delays in a loop limit achievable gain; adding gain to a slow loop causes oscillation.
Q: What does the integral term in PID do? | It eliminates steady-state error by accumulating past error.
Q: What is EPICS? | A distributed control software framework used at accelerators and large experiments.
M1: Derivative action: | Damps overshoot | Removes offset | Increases noise sensitivity only | Has no effect | Responds to rate of change.
M2: Safety interlocks should be: | Independent of the control system | Software-only | Disabled during runs | Shared with PID loops | Fail-safe, separate.

## Automation and data acquisition
S: Data acquisition (DAQ) systems capture signals from instruments, timestamp and store them, while automation runs experiments without constant human intervention. Good DAQ design ensures no important data are lost and every measurement is traceable.
H: DAQ components
- Sensors and front-end electronics, ADCs (resolution in bits, sample rate), digital I/O, counters.
- Interfaces: USB, Ethernet, GPIB, PCIe, VME/MicroTCA in physics.
- Timing: synchronised clocks (White Rabbit, PTP) and triggers align channels.
- Buffering and data rates: N channels × sample rate × bytes per sample.
E: Data rate = N_{ch} × f_{s} × bytes per sample :: throughput
E: Δ = V_{range}/2^{N} :: ADC step size
H: Automation
- Scripts (Python with PyVISA, LabVIEW, QCoDeS, Bluesky) sequence instruments: set parameters, wait for stability, measure, repeat.
- Parameter sweeps, adaptive sampling and Bayesian optimisation reduce measurement time.
- Logging of metadata: settings, timestamps, calibration, environment.
H: Reliability and data management
P: Handle errors gracefully (instrument timeouts, out-of-range readings); include watchdogs and safe states. Store raw data immutably in open formats (HDF5, NetCDF) with metadata; separate raw data from analysis. Version-control acquisition code. Remote monitoring and alerts allow overnight runs. Self-driving laboratories combine robotics, automated measurement and machine learning to explore materials autonomously.
X: 16 channels, 1 MS/s, 2 bytes per sample. Data rate and daily volume?
> 16 × 10^{6} × 2 = 32 MB s^{-1}
> × 86 400 s ≈ 2.8 TB per day
X: A 12-bit ADC over ±5 V. Step size?
> 10/4096 ≈ 2.4 mV
K: DAQ systems must capture, timestamp and store data reliably with full metadata; automation increases throughput and reproducibility.
!: Without metadata (settings, calibration, time) raw data quickly become useless.
Q: Why synchronise clocks across a DAQ system? | So events from different channels can be correlated in time.
Q: What is HDF5? | A hierarchical data format for storing large scientific datasets with metadata.
M1: Doubling sample rate doubles: | Data rate | ADC resolution | Signal amplitude | Noise floor | Throughput.
M2: Bayesian optimisation in experiments helps: | Choose informative next measurements | Remove noise | Store data | Calibrate clocks | Efficient exploration.

## Laboratory safety and risk assessment
S: Laboratory safety protects people, equipment and the environment from hazards such as lasers, high voltage, radiation, cryogens, chemicals and magnetic fields. Risk assessment identifies hazards, estimates risks and puts controls in place before work begins.
H: Risk assessment process
- Identify hazards (what can cause harm).
- Decide who might be harmed and how.
- Evaluate risk = likelihood × severity; decide controls.
- Record findings, implement, review regularly and after incidents.
E: Risk = likelihood × severity :: risk rating
H: Hierarchy of controls
- **Elimination**: remove the hazard.
- **Substitution**: use something less hazardous.
- **Engineering controls**: interlocks, enclosures, shielding, fume hoods.
- **Administrative controls**: training, procedures, signage, permits.
- **PPE**: goggles, gloves, lab coats; the last line of defence.
H: Common physics-lab hazards
- **Lasers**: eye damage; class-appropriate eyewear and enclosures.
- **Electrical**: mains and high-voltage supplies; capacitors store charge (discharge before work); lock-out/tag-out.
- **Cryogens**: cold burns, asphyxiation (oxygen monitors), pressure build-up.
- **Magnets**: projectile ferromagnetic objects; pacemakers (5 gauss line).
- **Radiation**: time, distance, shielding; dosimetry.
- **Vacuum and pressure**: implosion of glassware, gas cylinders (secure them).
- **Chemicals**: COSHH assessments, MSDS/SDS.
H: Culture
P: Safety works best as a shared culture: report near misses without blame, stop work if unsure, never work alone with serious hazards, and keep training current. Emergency procedures (first aid, spill kits, fire exits, emergency stops) should be known before starting. Good safety supports good science: careful planning prevents both accidents and lost data.
E: E = ½CV^{2} :: energy stored in a capacitor
X: A 1000 μF capacitor charged to 400 V. Stored energy?
> E = ½ × 10^{-3} × 1.6 × 10^{5} = 80 J: dangerous; discharge through a resistor before handling
X: 1 L of liquid nitrogen evaporates in a 20 m^{3} room. Gas volume and oxygen effect?
> ~700 L of gas = 0.7 m^{3}
> Displaces ~3.5% of the air: O_{2} falls from 20.9% to ~20.2%; larger spills or small rooms become dangerous
K: Assess risks before work, apply the hierarchy of controls with PPE last, and build a culture where anyone can stop unsafe work.
!: PPE is the last line of defence, not the first; engineering controls should do most of the work.
Q: What is the hierarchy of controls? | Elimination, substitution, engineering controls, administrative controls, then PPE.
Q: Why must capacitors be discharged before maintenance? | They can store lethal energy long after power is switched off.
M1: The most effective control is: | Elimination | PPE | Signage | Training | Remove the hazard entirely.
M2: Oxygen depletion monitors are used near: | Cryogen stores | Laser tables | Computers | Microscopes only | Boil-off displaces oxygen.
`;
