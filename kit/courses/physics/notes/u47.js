// Unit 47: Acoustics, Vibrations and Engineering Physics. Format: kit/course/notes.js
export default `
## Mechanical vibration analysis
S: Vibration analysis studies how machines and structures oscillate when disturbed or driven. Engineers use it to predict resonances, diagnose faults in rotating machinery and keep vibration within safe and comfortable limits.
H: The single-degree-of-freedom model
- Mass m, spring k, damper c: mẍ + cẋ + kx = F(t).
- Natural frequency ω_{n} = √(k/m); damping ratio ζ = c/(2√(km)).
- Underdamped (ζ < 1) oscillates at ω_{d} = ω_{n}√(1 − ζ^{2}); critically damped ζ = 1; overdamped ζ > 1.
E: mẍ + cẋ + kx = F(t) :: equation of motion
E: ω_{n} = √(k/m), ζ = c/(2√(km)) :: natural frequency and damping ratio
H: Forced response
- Harmonic force F_{0}cos ωt: amplitude X = (F_{0}/k)/√((1 − r^{2})^{2} + (2ζr)^{2}), r = ω/ω_{n}.
- Peak near r = 1 with dynamic amplification ≈ 1/(2ζ).
- Phase lag passes 90° at resonance.
E: X/X_{static} = 1/√((1 − r^{2})^{2} + (2ζr)^{2}) :: dynamic amplification
H: Condition monitoring
P: Accelerometers on bearings and gearboxes record vibration spectra. Characteristic frequencies reveal faults: imbalance (1× running speed), misalignment (2×), bearing defects (BPFO, BPFI frequencies), gear mesh frequencies and sidebands. Trend analysis and ISO 10816/20816 severity limits schedule maintenance before failure. Logarithmic decrement measures damping from free decay.
E: δ = ln(x_{n}/x_{n+1}) ≈ 2πζ :: logarithmic decrement
X: A 50 kg machine on mounts with k = 2 × 10^{5} N m^{-1}. Natural frequency?
> ω_{n} = √(2 × 10^{5}/50) = 63.2 rad s^{-1} ⇒ f_{n} ≈ 10 Hz
X: Successive peaks are 10 mm and 8 mm. Damping ratio?
> δ = ln(1.25) = 0.223 ⇒ ζ ≈ 0.223/2π ≈ 0.036
K: Natural frequency and damping ratio describe vibration; driving near resonance amplifies response by ~1/(2ζ).
!: Light damping makes resonance peaks sharp and dangerous; small changes in speed can produce large vibrations.
Q: What is the damping ratio? | The ratio of actual damping to critical damping, ζ = c/(2√(km)).
Q: What does vibration at 1× running speed usually indicate? | Imbalance of a rotor.
M1: At resonance with ζ = 0.05, amplification is about: | 10 | 1 | 100 | 0.05 | 1/(2ζ).
M2: Critically damped systems: | Return fastest without oscillating | Oscillate forever | Never return | Resonate strongly | ζ = 1.

## Structural dynamics
S: Structural dynamics analyses how buildings, bridges, aircraft and towers respond to time-varying loads such as wind, traffic, earthquakes and machinery. It predicts natural frequencies, mode shapes and dynamic stresses to keep structures safe and comfortable.
H: Multi-degree-of-freedom systems
- Matrix equation: Mẍ + Cẋ + Kx = F(t).
- Natural frequencies and modes from det(K − ω^{2}M) = 0.
- Modes are orthogonal; responses decompose into modal contributions.
- Continuous systems (beams, plates) have infinitely many modes.
E: (K − ω^{2}M)φ = 0 :: eigenvalue problem
E: f_{n} = (β_{n}^{2}/2πL^{2})√(EI/(ρA)) :: beam natural frequencies (β_{1}L = π for simply supported)
H: Dynamic loads
- **Wind**: buffeting, vortex shedding (Strouhal number St ≈ 0.2: f = St·v/D), galloping, flutter.
- **Footfall**: walking at ~2 Hz; floors and footbridges designed above ~3–5 Hz or with dampers.
- **Earthquakes**: response spectra.
- **Machinery and traffic**.
E: f_{shedding} = St·v/D :: vortex shedding frequency
H: Mitigation
P: Tuned mass dampers (Taipei 101's 660 t pendulum), viscous and friction dampers, base isolation and stiffening shift or damp problematic modes. The Tacoma Narrows Bridge (1940) failed by aeroelastic flutter; London's Millennium Bridge (2000) swayed from pedestrian lock-in and was fixed with dampers. Finite element models plus field measurements (operational modal analysis) verify designs.
X: A 30 m chimney of 2 m diameter in 15 m s^{-1} wind. Vortex shedding frequency?
> f = 0.2 × 15/2 = 1.5 Hz; dangerous if near a chimney natural frequency
X: A simply supported steel beam: doubling its length changes f_{1} by?
> f ∝ 1/L^{2}: one quarter
K: Structures have many modes; dynamic loads near those frequencies must be avoided or damped.
!: A structure strong enough statically can still fail dynamically through resonance or flutter.
Q: What caused the Tacoma Narrows Bridge collapse? | Aeroelastic flutter, a self-excited torsional oscillation driven by wind.
Q: What is a tuned mass damper? | An auxiliary mass–spring–damper tuned to a structure's mode to absorb vibration energy.
M1: Vortex shedding frequency increases with: | Wind speed | Diameter | Damping | Height only | f = St·v/D.
M2: Beam natural frequency scales with length as: | 1/L^{2} | L | 1/L | L^{2} | Euler–Bernoulli beam.

## Resonance and damping
S: Resonance occurs when a system is driven at its natural frequency, building large amplitudes from small inputs. Damping removes energy, limiting resonance. Both are exploited in instruments, filters and clocks, and both must be managed in machines and structures.
H: Resonance
- Driving at ω ≈ ω_{n} feeds energy in phase with motion.
- Quality factor Q = ω_{n}/Δω ≈ 1/(2ζ) measures the sharpness of the resonance; equivalently, Q = 2π × energy stored/energy lost per cycle.
- High-Q examples: quartz crystals (~10^{5}), tuning forks (~10^{3}), superconducting cavities (~10^{10}).
E: Q = 2π E_{stored}/E_{lost per cycle} ≈ 1/(2ζ) :: quality factor
E: Δω = ω_{n}/Q :: half-power bandwidth
H: Damping mechanisms
- **Viscous**: force ∝ velocity (dashpots, fluid).
- **Coulomb (friction)**: constant magnitude.
- **Hysteretic (material)**: internal friction; loss factor η.
- **Radiation**: energy carried away as sound or waves.
- **Viscoelastic layers** (constrained layer damping) on panels.
H: Uses and dangers
P: Resonance is useful in musical instruments, radio tuning, MRI, ultrasonic cleaners and MEMS sensors. It's dangerous in rotating machinery (critical speeds), bridges, aircraft (flutter) and wine glasses shattered by sound. Damping trades peak reduction against transmissibility at higher frequencies and energy loss.
X: A resonator at 1000 Hz has half-power bandwidth 5 Hz. Q and ζ?
> Q = 1000/5 = 200; ζ ≈ 1/(2Q) = 0.0025
X: Time for amplitude to decay by e in free vibration (τ = Q/(πf))?
> τ = 200/(π × 1000) ≈ 64 ms
K: Resonance amplifies response by ~Q; damping lowers Q and broadens the peak.
!: Adding damping reduces peak response but also reduces the efficiency of resonant devices like sensors and clocks.
Q: What is the quality factor Q? | A measure of resonance sharpness: centre frequency divided by bandwidth.
Q: Name a material damping technique for panels. | Constrained-layer damping with a viscoelastic layer.
M1: High-Q systems have: | Narrow resonance peaks and slow decay | Broad peaks | Fast decay | No resonance | Little energy loss per cycle.
M2: Coulomb damping force is: | Constant in magnitude | Proportional to velocity | Proportional to displacement | Zero | Dry friction.

## Modal analysis
S: Modal analysis identifies the natural frequencies, mode shapes and damping of a structure. It is used to validate computer models, troubleshoot vibration problems and design products, from car bodies and guitars to aircraft wings and wind turbine blades.
H: Experimental modal analysis
- Excite with an impact hammer or shaker; measure response with accelerometers or laser vibrometers.
- Frequency response function H(ω) = X(ω)/F(ω).
- Peaks give natural frequencies; widths give damping; amplitudes and phases across points give mode shapes.
- Curve-fitting methods (peak picking, circle fit, polyreference) extract modal parameters.
E: H(ω) = Σ_{r} φ_{r}φ_{r}^{T}/(ω_{r}^{2} − ω^{2} + 2iζ_{r}ω_{r}ω) :: modal FRF expansion
H: Operational modal analysis
- Uses ambient excitation (wind, traffic) without measuring input force.
- Ideal for bridges, buildings, offshore structures.
- Long-term monitoring tracks frequency changes that may indicate damage.
H: Numerical modal analysis and correlation
P: Finite element models compute modes; correlation with tests uses the Modal Assurance Criterion: MAC = |φ_{a}^{T}φ_{e}|^{2}/((φ_{a}^{T}φ_{a})(φ_{e}^{T}φ_{e})). MAC near 1 indicates matching shapes. Model updating adjusts stiffness, mass and boundary conditions to match test data. Mode shapes guide placement of stiffeners, dampers and sensors.
E: MAC = |φ_{a}^{T}φ_{e}|^{2}/((φ_{a}^{T}φ_{a})(φ_{e}^{T}φ_{e})) :: modal assurance criterion
X: An FRF peak at 120 Hz has half-power points at 118.8 and 121.2 Hz. Damping ratio?
> Δf = 2.4 Hz; ζ = Δf/(2f) = 2.4/240 = 0.01
X: Two mode vectors (1, 2, 1) and (1, 1.9, 1.1). MAC?
> φ_{a}·φ_{e} = 1 + 3.8 + 1.1 = 5.9; |φ_{a}|^{2} = 6; |φ_{e}|^{2} = 1 + 3.61 + 1.21 = 5.82
> MAC = 34.81/(6 × 5.82) ≈ 0.997
K: Modal analysis extracts frequencies, damping and shapes from FRFs, and validates models through MAC correlation.
!: Accelerometer mass and poor boundary conditions can shift measured frequencies; light sensors and realistic supports matter.
Q: What is a frequency response function? | The ratio of response to input force as a function of frequency.
Q: What is operational modal analysis? | Identifying modes from ambient vibration without measuring the input.
M1: MAC = 1 means: | Identical mode shapes | Orthogonal modes | No data | Different frequencies | Perfect correlation.
M2: Impact hammers excite: | A broad frequency range | One frequency | Only static loads | Light | Short pulse, broad spectrum.

## Noise control
S: Noise control reduces unwanted sound at its source, along its path or at the receiver. It protects hearing, improves comfort and meets regulations in workplaces, cities, vehicles and buildings, using absorption, insulation, enclosures and active cancellation.
H: Measuring noise
- Sound pressure level L_{p} = 20 log_{10}(p/p_{0}), p_{0} = 20 μPa.
- A-weighting (dBA) mimics human hearing sensitivity.
- Adding levels: L_{total} = 10 log_{10}(Σ10^{L_{i}/10}); two equal sources add 3 dB.
- Equivalent continuous level L_{eq}; daily exposure L_{EX,8h}.
E: L_{p} = 20 log_{10}(p/20 μPa) :: sound pressure level
E: L_{total} = 10 log_{10}Σ10^{L_{i}/10} :: combining levels
H: Strategies
- **At source**: quieter machines, balancing, mufflers, reduced speed, vibration isolation.
- **Path**: barriers, enclosures, distance (point source −6 dB per doubling, line source −3 dB), absorption.
- **Receiver**: hearing protection, quiet rooms, scheduling.
- **Active noise control**: anti-phase sound cancels low frequencies (headphones, cars, aircraft cabins).
E: ΔL = 20 log_{10}(r_{2}/r_{1}) :: point-source distance attenuation
H: Health and regulation
P: Prolonged exposure above ~85 dBA risks hearing loss; UK action levels are 80 and 85 dBA, limit 87 dBA (with protection). Environmental noise (traffic, aircraft) is linked to sleep disturbance and cardiovascular risk. Low-frequency noise is hardest to block, needing mass, enclosures or active control.
X: Two machines at 85 dB and 88 dB. Combined level?
> 10 log(10^{8.5} + 10^{8.8}) = 10 log(3.16 × 10^{8} + 6.31 × 10^{8}) ≈ 89.8 dB
X: A point source gives 90 dB at 2 m. Level at 16 m?
> 3 doublings ⇒ −18 dB ⇒ 72 dB
K: Use dB arithmetic correctly and tackle noise at source first, then path, then receiver.
!: Decibels don't add arithmetically; two 80 dB sources give 83 dB, not 160 dB.
Q: What does A-weighting do? | Adjusts levels to match human hearing sensitivity, reducing low and very high frequencies.
Q: How does active noise control work? | It generates anti-phase sound to cancel unwanted noise, mainly at low frequencies.
M1: Ten equal sources compared with one increase the level by: | 10 dB | 3 dB | 20 dB | 100 dB | 10 log 10.
M2: A line source (busy road) attenuates per doubling of distance by: | 3 dB | 6 dB | 10 dB | 0 dB | Cylindrical spreading.

## Acoustic materials
S: Acoustic materials control sound by absorbing, reflecting, transmitting or diffusing it. Porous absorbers, resonators, heavy barriers and engineered metamaterials shape the acoustics of concert halls, offices, vehicles and machinery.
H: Absorption
- Absorption coefficient α: fraction of incident energy not reflected (0 to 1).
- **Porous absorbers** (mineral wool, foam): friction in pores; effective at mid–high frequencies; thickness ≳ λ/4 for good low-frequency absorption.
- **Panel absorbers**: membranes resonate at low frequencies.
- **Helmholtz resonators**: perforated panels and slots; tuned absorption.
- Sabine reverberation time T_{60} = 0.161V/(ΣSα).
E: T_{60} = 0.161V/A, A = ΣS_{i}α_{i} :: Sabine equation
E: f_{H} = (c/2π)√(S/(VL_{eff})) :: Helmholtz resonance
H: Insulation
- Transmission loss TL = 10 log(1/τ).
- **Mass law**: TL ≈ 20 log(mf) − 47 dB (m in kg m^{-2}); doubling mass or frequency adds ~6 dB.
- Coincidence dip where bending waves match sound waves.
- Double walls with cavities and decoupling give much better insulation; flanking paths and gaps ruin it.
E: TL ≈ 20 log_{10}(mf) − 47 dB :: mass law
H: Diffusers and new materials
P: Diffusers (quadratic residue, Schroeder) scatter sound to avoid echoes. Acoustic metamaterials and membrane-type absorbers achieve strong low-frequency absorption in thin layers. Concert halls target T_{60} ~1.8–2.2 s; classrooms ~0.6 s for speech clarity.
X: A 300 m^{3} classroom with total absorption 80 m^{2} sabins. T_{60}?
> 0.161 × 300/80 ≈ 0.6 s
X: A 10 kg m^{-2} wall at 500 Hz. Mass-law TL?
> 20 log(5000) − 47 ≈ 74 − 47 = 27 dB
K: Absorbers reduce reflections and reverberation; heavy, decoupled, airtight constructions block transmission.
!: Absorbent foam does little to stop sound passing through walls; insulation needs mass and airtightness.
Q: What does the Sabine equation predict? | Reverberation time from room volume and total absorption.
Q: What is the mass law? | Transmission loss rises ~6 dB per doubling of surface mass or frequency.
M1: Porous absorbers work best at: | Mid to high frequencies | Very low frequencies | DC | Infrasound only | Thickness vs wavelength.
M2: A small gap in a wall: | Greatly reduces sound insulation | Has no effect | Improves insulation | Adds mass | Sound leaks through openings.

## Sound propagation in structures
S: Sound also travels through solids as structure-borne vibration, carried by longitudinal, shear and bending waves. Footsteps, machinery and plumbing transmit noise through floors and frames, radiating sound far from the source.
H: Waves in solids
- **Longitudinal**: c_{L} = √(E/ρ) in thin bars (steel ~5100 m s^{-1}).
- **Shear**: c_{S} = √(G/ρ).
- **Bending (flexural) waves**: dispersive, c_{B} = (ω^{2}D/(ρh))^{1/4} with plate stiffness D = Eh^{3}/(12(1 − ν^{2})); dominate sound radiation.
- **Coincidence (critical) frequency**: bending wave speed equals the speed of sound in air; panels radiate efficiently above it.
E: c_{B} = (Dω^{2}/(ρh))^{1/4} :: bending wave speed
E: f_{c} = (c^{2}/2π)√(ρh/D) :: critical frequency
H: Transmission and radiation
- Impedance mismatches at joints reflect vibration energy.
- Radiation efficiency σ: how well a vibrating surface produces sound.
- Statistical energy analysis (SEA) models energy flow between subsystems at high frequencies.
H: Control
P: Resilient mounts, floating floors, isolating hangers and flexible connectors break transmission paths. Damping treatments reduce resonant vibration of panels. Impact sound in buildings (footsteps) is tested with tapping machines; floating screeds and soft coverings reduce it. In vehicles, body panel damping and mounts reduce interior noise.
X: Speed of longitudinal waves in an aluminium bar (E = 70 GPa, ρ = 2700 kg m^{-3})?
> c = √(70 × 10^{9}/2700) ≈ 5090 m s^{-1}
X: How does bending-wave speed scale with frequency?
> c_{B} ∝ √ω, so higher frequencies travel faster (dispersive)
K: Structure-borne sound travels as bending and other waves; isolation and damping break the path before it radiates.
!: Above the critical frequency, panels radiate sound very efficiently; thin, stiff panels have high critical frequencies.
Q: Why are bending waves important for noise? | They produce out-of-plane surface motion that radiates sound.
Q: What is statistical energy analysis? | A high-frequency method modelling average vibrational energy flow between coupled subsystems.
M1: Bending waves are: | Dispersive | Non-dispersive | Only in fluids | Faster than light | Speed depends on frequency.
M2: Floating floors reduce: | Impact and structure-borne sound | Light | Heat loss only | Air pressure | Resilient layer isolates.

## Aeroacoustics
S: Aeroacoustics studies sound generated by moving air: jet noise, fan and propeller noise, turbulence around wings and wind noise on cars. Lighthill's theory shows that turbulent flow acts like a distribution of acoustic quadrupoles, whose power rises steeply with speed.
H: Sources
- **Monopole**: fluctuating mass (pulsating flow, sirens); power ∝ U^{4}.
- **Dipole**: fluctuating forces on surfaces (fans, propellers, edges); power ∝ U^{6}.
- **Quadrupole**: free turbulence (jet mixing); Lighthill's U^{8} law.
E: P_{jet} ∝ ρU^{8}D^{2}/c^{5} :: Lighthill's eighth-power law
E: ∂^{2}ρ'/∂t^{2} − c^{2}∇^{2}ρ' = ∂^{2}T_{ij}/∂x_{i}∂x_{j} :: Lighthill's acoustic analogy
H: Aircraft noise
- Jet noise dominated early jets; high-bypass turbofans reduced jet velocity, cutting noise by ~20 dB.
- Fan tones at blade passing frequency f = NB/60 (N rpm, B blades).
- Airframe noise (landing gear, flaps) dominates on approach.
- Chevrons, liners, swept stators and sonic boom shaping (X-59) reduce noise.
E: f_{BPF} = NB/60 :: blade passing frequency
H: Other applications
P: Wind turbine trailing-edge noise ("swish") is reduced by serrated edges inspired by owls. Car wind noise around mirrors and seals; HVAC fan noise; drone propeller noise. Computational aeroacoustics combines CFD with acoustic analogies (Ffowcs Williams–Hawkings) to predict far-field sound.
X: Jet exhaust velocity is halved. Jet noise change?
> P ∝ U^{8}: (1/2)^{8} = 1/256 ⇒ −24 dB
X: A fan with 12 blades at 3000 rpm. Blade passing frequency?
> f = 3000 × 12/60 = 600 Hz
K: Flow noise rises steeply with speed (U^{6}–U^{8}); reducing velocities and smoothing flows is the main lever.
!: Small speed reductions give large noise reductions; doubling speed can raise jet noise by 24 dB.
Q: What is Lighthill's eighth-power law? | Jet noise power scales with the eighth power of jet velocity.
Q: Why are high-bypass turbofans quieter? | They move more air at lower exhaust velocity, greatly reducing jet noise.
M1: Fan blade-passing tones occur at: | NB/60 Hz | N/60 Hz | B Hz | 1 kHz always | Blades passing per second.
M2: Owl-inspired serrated edges reduce: | Trailing-edge noise | Engine power | Lift | Weight | Smoother flow mixing.

## Underwater acoustics
S: Sound travels far in water where light and radio cannot, making acoustics the main way to sense and communicate underwater. Sonar, ocean science, marine animals and submarines all depend on how sound propagates in the sea.
H: Sound in seawater
- Speed ~1500 m s^{-1}, rising with temperature, salinity and pressure (~1.6 m s^{-1} per 100 m depth).
- Sound speed profile creates channels: the SOFAR channel (~1 km depth) traps sound for thousands of km.
- Absorption increases with frequency: ~0.06 dB km^{-1} at 1 kHz, ~30 dB km^{-1} at 100 kHz.
- Reference pressure 1 μPa (so underwater dB differ from air dB by ~26 dB plus impedance effects).
E: SL − TL − (NL − DI) = DT :: passive sonar equation
E: TL = 20 log_{10}r + αr :: spherical spreading plus absorption
H: Sonar
- **Active**: transmit pings, listen for echoes; range r = ct/2.
- **Passive**: listen for radiated noise from ships and submarines.
- Side-scan and multibeam sonar map seabeds; synthetic aperture sonar gives high resolution.
- Doppler shifts reveal target speed.
H: Applications and concerns
P: Ocean acoustic tomography measures temperature over basins; hydrophones detect nuclear tests (CTBTO), earthquakes and whales. Acoustic modems communicate with underwater vehicles at low data rates. Shipping noise and seismic surveys affect marine mammals that rely on sound; mitigation includes quieter propellers and seasonal restrictions.
X: An echo returns after 2 s. Target range?
> r = 1500 × 2/2 = 1500 m
X: Transmission loss at 10 km with spherical spreading and α = 1 dB km^{-1}?
> 20 log(10 000) + 10 = 80 + 10 = 90 dB
K: Water carries sound far, especially at low frequencies; sonar uses echoes and listening, guided by sound-speed profiles.
!: Underwater decibels use a 1 μPa reference, not 20 μPa; comparing directly with in-air levels is misleading.
Q: What is the SOFAR channel? | A depth layer of minimum sound speed that traps and guides sound over long distances.
Q: Why use low frequencies for long-range sonar? | Absorption increases strongly with frequency.
M1: Sound speed in seawater is about: | 1500 m s^{-1} | 343 m s^{-1} | 5000 m s^{-1} | 3 × 10^{8} m s^{-1} | ~4.4× faster than air.
M2: Passive sonar: | Listens without transmitting | Sends pings | Uses light | Uses radar | Covert detection.

## Vibration isolation
S: Vibration isolation prevents vibrations passing between a source and its surroundings, protecting sensitive instruments or keeping machinery vibrations out of buildings. Springs and dampers that make the mounted system's natural frequency well below the disturbing frequency are the basic tool.
H: Transmissibility
- T = √(1 + (2ζr)^{2})/√((1 − r^{2})^{2} + (2ζr)^{2}), r = f/f_{n}.
- Isolation only begins above r = √2; T < 1 there.
- Lower f_{n} (softer mounts) gives better isolation at a given frequency.
- Static deflection δ_{st} = g/ω_{n}^{2}: f_{n} ≈ 15.8/√(δ_{st} in mm) Hz.
E: T = √(1 + (2ζr)^{2})/√((1 − r^{2})^{2} + (2ζr)^{2}) :: transmissibility
E: f_{n} ≈ 15.76/√δ_{st}(mm) Hz :: natural frequency from static deflection
H: Isolator types
- Rubber/elastomer mounts (f_{n} ~ 5–15 Hz), steel springs (2–5 Hz), air springs (1–3 Hz).
- **Active isolation**: sensors and actuators cancel vibration (lithography tools, gravitational-wave detectors).
- **Negative-stiffness** isolators achieve very low frequencies compactly.
- Inertia blocks add mass to lower motion.
H: Damping trade-off
P: Damping limits the resonance peak (important during machine start-up) but increases transmissibility at high frequencies. Sensitive labs (electron microscopes, AFMs) use isolated slabs, pneumatic tables and active systems; LIGO uses multi-stage pendulums and active seismic isolation to reduce ground motion by ~10^{10} at 10 Hz.
X: A machine runs at 25 Hz; mounts give f_{n} = 5 Hz, ζ ≈ 0. Transmissibility?
> r = 5; T ≈ 1/(r^{2} − 1) = 1/24 ≈ 0.042: 96% isolation
X: Spring mounts deflect 10 mm under load. Natural frequency?
> f_{n} ≈ 15.76/√10 ≈ 5 Hz
K: Isolate by making the mount's natural frequency much lower than the disturbance; isolation starts above √2 times f_{n}.
!: Mounts tuned near the disturbing frequency amplify vibration; poorly chosen isolators make things worse.
Q: Above what frequency ratio does isolation begin? | r = √2.
Q: How does static deflection relate to natural frequency? | f_{n} ≈ 15.76/√δ_{st} Hz, with δ in mm.
M1: Softer mounts give: | Lower natural frequency and better isolation | Higher frequency | No change | Worse isolation always | f_{n} ∝ √k.
M2: Active isolation is used in: | Lithography tools and LIGO | Car tyres only | Kitchen tables | Speakers | Sensors plus actuators.

## Seismic engineering physics
S: Seismic engineering applies wave physics and structural dynamics to design buildings and infrastructure that survive earthquakes. It combines knowledge of ground motion, soil behaviour and structural response to protect lives.
H: Earthquake ground motion
- P-waves (fastest, compressional), S-waves (shear, more damaging), surface waves (Love, Rayleigh; large amplitude).
- Magnitude: moment magnitude M_{w} = (2/3)log_{10}M_{0} − 6.07 (M_{0} in N m); each unit ≈ 32× energy.
- Peak ground acceleration (PGA) and response spectra describe shaking.
- Site amplification: soft soils amplify and lengthen shaking (Mexico City 1985); liquefaction in saturated sands.
E: M_{w} = (2/3)(log_{10}M_{0} − 9.1) :: moment magnitude
E: T ≈ 0.1N s :: rough building period (N storeys)
H: Design principles
- **Response spectrum**: peak response vs natural period for given damping; codes (Eurocode 8, ASCE 7) set design spectra.
- **Ductility**: structures designed to yield and dissipate energy without collapse ("strong column, weak beam").
- **Base isolation**: lead–rubber bearings or friction pendulums lengthen the period to ~2–3 s, reducing accelerations.
- **Dampers**: viscous, friction, buckling-restrained braces.
H: Resonance with the ground
P: Buildings whose periods match dominant ground periods suffer most: in Mexico City 1985, 6–15-storey buildings (T ~1–2 s) collapsed on lake-bed soils resonating at ~2 s. Early warning systems detect P-waves and warn seconds before S-waves arrive. Retrofitting and enforcing codes save more lives than prediction.
X: An earthquake has M_{0} = 4 × 10^{19} N m. Moment magnitude?
> log_{10}(4 × 10^{19}) = 19.6; M_{w} = (2/3)(19.6 − 9.1) = 7.0
X: S-wave arrives 10 s after P-wave (v_{P} = 6, v_{S} = 3.5 km s^{-1}). Distance?
> d(1/3.5 − 1/6) = 10 ⇒ d × 0.119 = 10 ⇒ d ≈ 84 km
K: Seismic design avoids resonance, adds ductility, and uses isolation and damping to survive strong shaking.
!: Soft soils can amplify shaking dramatically; site conditions matter as much as magnitude.
Q: What does base isolation do? | Lengthens a building's natural period to reduce earthquake accelerations transmitted to it.
Q: Why do S-waves cause more damage than P-waves? | They have larger amplitudes and shear motion that structures resist poorly.
M1: Each unit of moment magnitude corresponds to about how much more energy? | 32× | 10× | 2× | 1000× | 10^{1.5}.
M2: Liquefaction occurs in: | Saturated loose sands | Solid granite | Dry clay | Concrete | Pore pressure builds up.

## Shock waves
S: Shock waves are abrupt, nearly discontinuous jumps in pressure, density and temperature that travel faster than sound. They arise from supersonic aircraft, explosions, lightning and supernovae, and they are used in medicine and materials science.
H: Formation
- Large-amplitude waves steepen because high-pressure regions travel faster.
- Supersonic objects (Mach M = v/c > 1) produce a Mach cone with half-angle sin μ = 1/M.
- Shock thickness is a few mean free paths in gases.
E: sin μ = 1/M :: Mach angle
H: Rankine–Hugoniot relations
- Conservation of mass, momentum and energy across the shock.
- For a normal shock in a perfect gas: p_{2}/p_{1} = 1 + (2γ/(γ + 1))(M_{1}^{2} − 1).
- Downstream flow is subsonic; entropy rises (shocks are irreversible).
- Density ratio limited to (γ + 1)/(γ − 1) (6 for air) even for strong shocks.
E: p_{2}/p_{1} = 1 + 2γ(M_{1}^{2} − 1)/(γ + 1) :: normal shock pressure ratio
E: ρ_{2}/ρ_{1} = (γ+1)M_{1}^{2}/((γ−1)M_{1}^{2} + 2) :: density ratio
H: Applications
P: Sonic booms from supersonic flight (Concorde, X-59 low-boom design). Blast waves from explosions (Sedov–Taylor scaling: R ∝ (Et^{2}/ρ)^{1/5}). Lithotripsy uses focused shock waves to break kidney stones. Shock tubes and light-gas guns study high-pressure materials. Astrophysical shocks accelerate cosmic rays and trigger star formation. Hypersonic vehicles face extreme shock heating.
E: R = ξ(Et^{2}/ρ)^{1/5} :: Sedov–Taylor blast radius
X: An aircraft at Mach 2. Mach cone half-angle?
> sin μ = 0.5 ⇒ μ = 30°
X: Pressure ratio across a normal shock at M = 2 in air (γ = 1.4)?
> 1 + (2.8/2.4)(4 − 1) = 1 + 3.5 = 4.5
K: Shocks are thin, irreversible jumps governed by conservation laws; their strength rises with Mach number.
!: Density can't increase without limit across a shock; for air the maximum ratio is 6.
Q: What are the Rankine–Hugoniot relations? | Conservation of mass, momentum and energy across a shock.
Q: What is lithotripsy? | Breaking kidney stones with focused shock waves.
M1: The Mach cone angle shrinks as speed: | Increases | Decreases | Stays constant | Is subsonic | sin μ = 1/M.
M2: Flow behind a normal shock is: | Subsonic | Supersonic | Static | At light speed | Always.

## Impact mechanics
S: Impact mechanics studies collisions where large forces act over short times: car crashes, sports, bird strikes, ballistic protection and dropped phones. It combines momentum, energy, contact stresses and stress waves.
H: Collisions
- Impulse J = ∫F dt = Δp; average force F = Δp/Δt.
- Coefficient of restitution e = relative separation speed/approach speed (0 perfectly inelastic, 1 elastic).
- Energy lost in collisions: ΔKE = ½μ(1 − e^{2})v_{rel}^{2}, μ the reduced mass.
E: F_{avg} = Δp/Δt :: impulse–momentum
E: ΔKE = ½μ(1 − e^{2})v_{rel}^{2} :: collision energy loss
H: Contact and waves
- **Hertz contact**: elastic spheres; contact force ∝ δ^{3/2}; contact time depends weakly on velocity.
- Stress waves in bars: σ = ρcv (impact velocity v); spalling from reflected tension waves.
- High strain rates raise strength (strain-rate sensitivity).
E: σ = ρcv :: stress from impact wave
H: Protection
P: Crumple zones extend collision time, reducing forces on occupants; helmets use foam to spread impact over time and area (Head Injury Criterion). Body armour uses hard ceramics to blunt projectiles and fibres (aramid, UHMWPE) to absorb energy. Drop tests and crash tests (Euro NCAP) validate designs; explicit FE simulations (LS-DYNA) model crashes.
X: A 1200 kg car at 15 m s^{-1} stops in 0.1 s (crumple) vs 0.02 s (rigid). Average forces?
> Δp = 18 000 N s
> 0.1 s: 180 kN; 0.02 s: 900 kN
X: A steel bar (ρ = 7850, c = 5100 m s^{-1}) is struck at 10 m s^{-1}. Stress?
> σ = 7850 × 5100 × 10 ≈ 400 MPa
K: Lengthening impact time reduces force; stress waves and material rate effects govern damage.
!: Peak forces can far exceed averages; short impacts with stiff materials create very high stresses.
Q: What is the coefficient of restitution? | Ratio of relative separation speed to approach speed in a collision.
Q: How do crumple zones protect passengers? | They extend the collision time, reducing average force.
M1: A perfectly inelastic collision has e equal to: | 0 | 1 | 0.5 | −1 | Objects stick.
M2: Impact stress in a bar is proportional to: | Impact velocity | Velocity squared | Length | Temperature | σ = ρcv.

## Tribology and friction
S: Tribology is the science of friction, wear and lubrication of surfaces in contact. It matters enormously: friction and wear consume about a fifth of the world's energy, and every engine, bearing, joint and brake depends on tribology.
H: Friction
- Amontons–Coulomb laws: F = μN, independent of apparent area; kinetic μ_{k} < static μ_{s}.
- Origin: real contact area is tiny (asperities); friction ∝ real area × shear strength, and real area ∝ load.
- Typical μ: steel on steel ~0.6 dry, ~0.1 lubricated; PTFE ~0.05; rubber on dry road ~0.8–1.0.
- **Stick–slip**: squealing brakes, violin bows, earthquakes.
E: F = μN :: Coulomb friction
E: A_{real} ≈ N/H :: real contact area (H = hardness)
H: Lubrication
- **Hydrodynamic**: fluid film fully separates surfaces (journal bearings).
- **Elastohydrodynamic (EHL)**: thin films with elastic deformation (gears, rolling bearings).
- **Boundary**: molecular layers; additives protect surfaces.
- Stribeck curve: friction vs ηN/P shows boundary, mixed and hydrodynamic regimes.
E: Stribeck number = ηω/P :: lubrication regime parameter
H: Wear
P: Mechanisms: adhesive, abrasive, fatigue, corrosive wear. Archard's law: wear volume V = kNs/H (k wear coefficient, s sliding distance). Hard coatings (DLC, TiN), surface texturing and solid lubricants (graphite, MoS_{2}) reduce wear. Superlubricity (near-zero friction) occurs in some layered materials. Nanotribology with AFM probes single-asperity contacts.
E: V = kNs/H :: Archard wear law
X: A 50 kg box on a floor with μ_{s} = 0.5. Force to start it moving?
> F = 0.5 × 50 × 9.81 ≈ 245 N
X: Archard: k = 10^{-4}, N = 100 N, s = 1 km, H = 2 GPa. Wear volume?
> V = 10^{-4} × 100 × 1000/(2 × 10^{9}) = 5 × 10^{-9} m^{3} = 5 mm^{3}
K: Friction comes from real asperity contacts; lubrication regimes and wear mechanisms determine performance and lifetime.
!: Friction doesn't depend on apparent contact area because real contact area scales with load, not size.
Q: What does the Stribeck curve show? | How friction varies across boundary, mixed and hydrodynamic lubrication regimes.
Q: What is stick–slip? | Alternating sticking and sliding causing jerky motion and noise.
M1: Archard's law says wear volume is proportional to: | Load × sliding distance / hardness | Hardness | Speed only | Temperature | V = kNs/H.
M2: Hydrodynamic lubrication means: | A fluid film fully separates the surfaces | Dry contact | Solid lubricant only | Molecular layers only | Lowest wear.

## Fluid-structure interaction
S: Fluid–structure interaction describes how flowing fluids and flexible structures affect each other: wind making bridges sway, blood flow deforming arteries, flags flapping and pipes vibrating. Coupled effects can cause dangerous instabilities like flutter.
H: Coupling types
- **One-way**: fluid loads deform a structure, but deformation barely changes the flow.
- **Two-way**: deformation changes the flow, which changes loads (flutter, heart valves).
- Added mass: accelerating a body in fluid moves fluid too, effectively increasing its mass (important for ships and underwater structures).
E: m_{added} = ρ_{f}V (sphere: ½ρ_{f}V) :: added mass
H: Flow-induced vibration
- **Vortex-induced vibration (VIV)**: lock-in when shedding frequency matches a natural frequency (risers, chimneys, cables).
- **Galloping**: aerodynamic instability of non-circular sections (ice-coated power lines).
- **Flutter**: coupled bending–torsion instability in wings and bridges.
- **Fluidelastic instability** in heat-exchanger tube bundles.
- **Water hammer**: pressure surges in pipes when valves close quickly: Δp = ρcΔv (Joukowsky).
E: Δp = ρcΔv :: Joukowsky water hammer
E: U_{r} = U/(f_{n}D) :: reduced velocity
H: Analysis and mitigation
P: Coupled CFD and FE simulations, wind-tunnel tests and scaling with reduced velocity, mass ratio and damping. Mitigation: helical strakes on chimneys and risers, fairings, tuned mass dampers, aerodynamic deck shaping, slow-closing valves and surge tanks. Biomedical FSI models aneurysms and artificial heart valves.
X: A valve suddenly stops water flowing at 2 m s^{-1} (c ≈ 1200 m s^{-1} in pipe). Pressure surge?
> Δp = 1000 × 1200 × 2 = 2.4 MPa (24 bar)
X: A riser (D = 0.5 m, f_{n} = 0.4 Hz) in a 1 m s^{-1} current. Reduced velocity? Risk of VIV lock-in (U_{r} ≈ 5)?
> U_{r} = 1/(0.4 × 0.5) = 5: yes, lock-in likely
K: Fluids and structures can feed back on each other; resonance with flow phenomena and flutter must be designed out.
!: Ignoring added mass overestimates natural frequencies of submerged structures.
Q: What is added mass? | The extra effective inertia from fluid that must accelerate with a body.
Q: What causes water hammer? | Sudden changes in flow velocity create pressure waves in pipes.
M1: Helical strakes on chimneys reduce: | Vortex-induced vibration | Weight | Heat loss | Corrosion | Disrupt coherent shedding.
M2: Flutter is a: | Self-excited aeroelastic instability | Forced resonance only | Material fatigue | Thermal effect | Coupled bending and torsion.

## Engineering measurement systems
S: Engineering measurement systems monitor strain, displacement, force, pressure, temperature, flow and vibration in tests and operating equipment. Choosing transducers, conditioning signals and estimating uncertainty ensure the data can be trusted for design and safety decisions.
H: Common measurands and sensors
- **Strain**: foil gauges, fibre Bragg gratings, digital image correlation (DIC).
- **Force and torque**: load cells (strain-gauge, piezoelectric).
- **Displacement**: LVDTs, capacitive, eddy-current, laser triangulation.
- **Acceleration**: piezoelectric and MEMS accelerometers.
- **Pressure**: diaphragm gauges (piezoresistive), Pitot tubes for flow speed.
- **Flow**: orifice plates, Venturi meters, ultrasonic, Coriolis, electromagnetic.
- **Temperature**: thermocouples, RTDs, infrared thermography.
E: v = √(2Δp/ρ) :: Pitot-tube velocity
E: Q = C_{d}A_{2}√(2Δp/(ρ(1 − β^{4}))) :: orifice/Venturi flow
H: System characteristics
- Static: sensitivity, linearity, hysteresis, resolution, range.
- Dynamic: natural frequency, damping, bandwidth; sensor bandwidth must exceed the signal's.
- Loading effects: the sensor changes what it measures (mass of accelerometers, thermal mass of probes).
H: Uncertainty and calibration
P: Uncertainty budgets combine sensor, conditioning, DAQ and environmental contributions (GUM methodology). Calibrate against traceable standards. Structural health monitoring uses sensor networks (strain, acceleration, acoustic emission) on bridges, aircraft and wind turbines to detect damage early. Digital image correlation gives full-field strain maps.
X: A Pitot tube in air (ρ = 1.2) reads Δp = 600 Pa. Air speed?
> v = √(2 × 600/1.2) ≈ 31.6 m s^{-1}
X: A 20 g accelerometer on a 100 g panel: concern?
> The sensor adds 20% mass, lowering the panel's natural frequency (~√(100/120) ≈ 0.91×); use a lighter sensor or laser vibrometer
K: Match sensors to measurand, range and bandwidth; avoid loading effects and quantify uncertainty with traceable calibration.
!: Heavy sensors change lightweight structures' behaviour; the act of measuring can alter the result.
Q: What is digital image correlation? | A camera-based method tracking surface patterns to give full-field displacement and strain.
Q: What is a loading effect? | Distortion of the measured quantity caused by the sensor itself.
M1: LVDTs measure: | Displacement | Temperature | Pressure | Light | Linear variable differential transformer.
M2: Coriolis flowmeters measure: | Mass flow directly | Temperature | Voltage | Density only | Tube twist from flow.

## Failure analysis
S: Failure analysis investigates why components and structures break, using physics, materials science and detective work. Identifying root causes, such as fatigue, overload, corrosion or design flaws, prevents repeat failures and improves safety.
H: Failure modes
- **Ductile overload**: necking, cup-and-cone fracture, dimpled surfaces.
- **Brittle fracture**: flat, cleavage facets, chevron marks pointing to origin.
- **Fatigue**: beach marks and striations; initiation at stress concentrations; most common in service.
- **Creep**: voids at grain boundaries at high temperature.
- **Corrosion**: pitting, stress-corrosion cracking, hydrogen embrittlement.
- **Wear**, **buckling**, **thermal fatigue**.
H: Methodology
- Collect evidence and history (loads, environment, maintenance).
- Visual and macroscopic examination; preserve fracture surfaces.
- Non-destructive testing (ultrasound, X-ray CT, dye penetrant, magnetic particle).
- SEM fractography, metallography, chemical analysis, hardness.
- Stress analysis (FEA), fracture mechanics, testing replicas.
- Root cause analysis (5 whys, fishbone, fault trees).
E: K_{t} = σ_{max}/σ_{nominal} :: stress concentration factor
E: da/dN = C(ΔK)^{m} :: Paris law (fatigue crack growth)
H: Famous cases
P: de Havilland Comet (1954): fatigue cracks at window corners from pressurisation cycles. Liberty ships: brittle fracture of welded steel in cold seas. Challenger (1986): O-ring failure in cold temperatures. Hyatt Regency walkway (1981): design change doubled load on connections. Lessons: avoid sharp corners, inspect for cracks, respect temperature limits and check design changes.
X: A plate with a circular hole (K_{t} = 3) under 100 MPa nominal stress. Peak stress?
> σ_{max} = 300 MPa
X: Paris law: C = 10^{-11}, m = 3, ΔK = 10 MPa m^{1/2} (units m/cycle). Crack growth per cycle?
> da/dN = 10^{-11} × 1000 = 10^{-8} m per cycle
K: Read fracture surfaces, test materials and analyse stresses to find root causes; fatigue at stress concentrations is the commonest culprit.
!: The obvious broken part may be a victim, not the cause; trace the failure sequence before concluding.
Q: What are beach marks? | Macroscopic bands on fatigue fracture surfaces marking crack-front positions.
Q: What caused the Comet airliner failures? | Fatigue cracking at stress concentrations near window corners.
M1: Chevron marks on brittle fractures point: | Back towards the origin | Away from the origin | Randomly | Downward only | Indicate crack start.
M2: The Paris law describes: | Fatigue crack growth rate | Creep | Yield stress | Thermal expansion | da/dN = C(ΔK)^{m}.

## Reliability and physical modelling
S: Reliability engineering predicts and improves how long systems work before failing. Combining physical models of degradation with statistics lets engineers set maintenance intervals, warranties and safety margins for everything from chips to aircraft.
H: Reliability statistics
- Reliability R(t) = probability of survival to time t; failure rate λ(t).
- Constant failure rate: R = e^{−λt}, MTTF = 1/λ.
- **Bathtub curve**: infant mortality, useful life (constant λ), wear-out.
- **Weibull distribution**: R(t) = exp(−(t/η)^{β}); β < 1 early failures, β = 1 random, β > 1 wear-out.
E: R(t) = exp[−(t/η)^{β}] :: Weibull reliability
E: R_{series} = ΠR_{i}, R_{parallel} = 1 − Π(1 − R_{i}) :: system reliability
H: Physics of failure
- **Arrhenius** acceleration for temperature-driven mechanisms: AF = exp[(E_{a}/k_{B})(1/T_{use} − 1/T_{test})].
- Electromigration in chips (Black's equation), corrosion, fatigue (Miner's rule: Σn_{i}/N_{i} = 1), creep.
- Accelerated life testing at high stress predicts normal-use lifetimes.
E: AF = exp[(E_{a}/k_{B})(1/T_{use} − 1/T_{test})] :: Arrhenius acceleration factor
H: Design for reliability
P: Redundancy (parallel systems), derating components, FMEA, fault tree analysis and condition-based maintenance improve reliability. Aircraft use damage-tolerant design with inspection intervals tied to crack-growth predictions. Digital twins combine sensor data with physics models to predict remaining useful life. Safety-critical systems target failure probabilities ~10^{-9} per hour.
X: A component with λ = 10^{-5} per hour. Reliability over 1000 hours? MTTF?
> R = e^{−0.01} ≈ 0.990; MTTF = 10^{5} hours
X: Two such components in parallel over 1000 h?
> R = 1 − (0.01)^{2} = 0.9999
X: E_{a} = 0.7 eV; test at 125 °C, use at 55 °C. Acceleration factor?
> (0.7/8.617 × 10^{-5})(1/328 − 1/398) = 8123 × 5.36 × 10^{-4} ≈ 4.36 ⇒ AF ≈ e^{4.36} ≈ 78
K: Reliability combines statistics (Weibull, bathtub) with physics of failure (Arrhenius, fatigue); redundancy and testing improve it.
!: Accelerated tests can introduce failure mechanisms that don't occur in normal use; validate the acceleration model.
Q: What does a Weibull shape parameter β > 1 indicate? | Wear-out failures with increasing failure rate.
Q: What is Miner's rule? | Cumulative fatigue damage: failure when Σ(n_{i}/N_{i}) reaches 1.
M1: Series systems are: | Less reliable than any component | More reliable | Equally reliable | Unaffected | R = ΠR_{i}.
M2: The bathtub curve's middle section shows: | Constant random failure rate | Infant mortality | Wear-out | Zero failures | Useful life.
`;
