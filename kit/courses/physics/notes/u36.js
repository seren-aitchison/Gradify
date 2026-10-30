// Unit 36: Optoelectronics and Photonics. Format: kit/course/notes.js
export default `
## Light-matter interactions
S: Every photonic device relies on a handful of ways light and matter exchange energy: absorption, spontaneous emission and stimulated emission, along with scattering and refraction. Einstein's rate picture and the photon energy E = hf explain lasers, LEDs, detectors and solar cells.
H: The three radiative processes
- **Absorption**: a photon of energy hf ≈ E_{2} − E_{1} lifts an electron to a higher level.
- **Spontaneous emission**: an excited electron drops randomly, emitting a photon in a random direction and phase.
- **Stimulated emission**: an incoming photon triggers emission of an identical photon (same frequency, direction, phase, polarisation), the basis of the laser.
E: E = hf = hc/λ :: photon energy
E: B_{12} = B_{21}, A_{21}/B_{21} = 8πhf^{3}/c^{3} :: Einstein relations (equal degeneracies)
H: Populations and gain
- In equilibrium, N_{2}/N_{1} = e^{−ΔE/k_{B}T}, so absorption beats stimulated emission.
- **Population inversion** (N_{2} > N_{1}) is needed for net optical gain; it requires pumping and at least three levels.
- Linewidth and lifetime are linked: a short-lived state has a broad line.
H: Other interactions
P: Refraction and dispersion come from bound electrons responding to the oscillating field, described by the refractive index n(λ). Rayleigh scattering (∝ 1/λ^{4}) makes skies blue and limits fibre loss; Raman scattering shifts photon energy by molecular vibrations; the photoelectric effect frees electrons. In semiconductors, the band gap sets which wavelengths are absorbed or emitted.
X: What photon energy corresponds to 1550 nm?
> E = 1240 eV nm / 1550 nm ≈ 0.80 eV
X: Two levels are 1.5 eV apart at 300 K. What is N_{2}/N_{1} in equilibrium?
> k_{B}T = 0.0259 eV; ratio = e^{−1.5/0.0259} = e^{−58} ≈ 10^{-25}
> Inversion is impossible thermally; pumping is required
K: Stimulated emission produces identical photons; a population inversion lets it outpace absorption and give gain.
!: A two-level system cannot reach steady-state inversion by optical pumping; at best it saturates to equal populations.
Q: What is the photon energy in eV at wavelength λ in nm? | E ≈ 1240/λ.
Q: What property makes stimulated emission special? | The emitted photon is identical in frequency, phase, direction and polarisation to the stimulating photon.
M1: Net optical gain requires: | Population inversion | Thermal equilibrium | Only spontaneous emission | A wider band gap | More atoms must be in the upper level.
M2: Rayleigh scattering scales as: | 1/λ^{4} | λ^{2} | 1/λ | Constant | Short wavelengths scatter much more.

## Semiconductor light emission
S: Semiconductors emit light when electrons in the conduction band recombine with holes in the valence band. The band gap sets the colour, and the band structure decides whether recombination produces light efficiently, which is why LEDs use compound semiconductors rather than silicon.
H: Direct and indirect gaps
- **Direct gap** (GaAs, InP, GaN): the conduction-band minimum and valence-band maximum share the same momentum, so a photon can be emitted directly. Efficient light emitters.
- **Indirect gap** (Si, Ge): a phonon must also take part, so radiative recombination is slow and inefficient.
E: λ = hc/E_{g} ≈ 1240/E_{g}(eV) nm :: emission wavelength
H: Recombination routes
- **Radiative** (B n p): band-to-band, producing light.
- **Shockley–Read–Hall**: via defects, producing heat.
- **Auger**: energy given to a third carrier, important at high density (a cause of LED "droop").
- Internal quantum efficiency = radiative rate / total rate.
H: Band-gap engineering
P: Alloys tune the gap: In_{x}Ga_{1−x}N spans violet to green, AlGaInP red to yellow, InGaAsP the 1.3–1.55 μm telecom bands. Quantum wells a few nanometres thick confine carriers, raising efficiency and shifting the emission. Heterostructures trap carriers and photons in the active region. The blue GaN LED (Nobel Prize 2014) enabled white LED lighting.
X: GaAs has E_{g} = 1.42 eV. What wavelength does it emit?
> λ ≈ 1240/1.42 ≈ 873 nm (near infrared)
X: Which gap is needed for 450 nm blue light?
> E_{g} ≈ 1240/450 ≈ 2.76 eV, achievable with InGaN
K: Light emission needs a direct band gap; the gap energy sets the wavelength.
!: Silicon is a poor light emitter because its gap is indirect, not because its gap is the wrong size.
Q: Why is GaAs a good light emitter but Si is not? | GaAs has a direct gap; Si's is indirect, needing a phonon for each photon.
Q: What causes LED efficiency droop at high current? | Mainly Auger recombination, plus carrier leakage.
M1: A semiconductor with E_{g} = 1.9 eV emits about: | 650 nm | 450 nm | 1550 nm | 250 nm | 1240/1.9.
M2: Quantum wells raise efficiency by: | Confining carriers | Making the gap indirect | Adding defects | Removing holes | Confinement increases overlap of electrons and holes.

## LEDs and laser diodes
S: LEDs and laser diodes are forward-biased p–n junctions that turn current into light. An LED emits incoherent spontaneous light over a broad spectrum; a laser diode adds an optical cavity and enough gain to produce narrow, intense, coherent beams.
H: LEDs
- Electrons and holes injected across the junction recombine in a quantum-well active region.
- Spectral width ~20–40 nm; emission in all directions.
- **External quantum efficiency** = internal efficiency × light extraction efficiency; extraction is hard because high n traps light by total internal reflection.
- White LEDs: a blue InGaN chip plus a yellow phosphor (Ce:YAG). Efficacy now exceeds 200 lm W^{-1}.
E: η_{ext} = η_{int} × η_{extr} :: external quantum efficiency
E: θ_{c} = sin^{−1}(1/n) :: critical angle for escape
H: Laser diodes
- Cleaved facets (R ≈ 30%) or Bragg gratings form the cavity.
- Above **threshold current**, gain equals loss and output rises steeply.
- Edge emitters (high power), **VCSELs** (vertical cavities, circular beams, used in face ID and data links), DFB lasers (single-mode for telecoms).
- Linewidths from MHz to GHz; direct modulation to tens of GHz.
E: P = η_{d}(hf/e)(I − I_{th}) :: output above threshold
H: Applications
P: LEDs light homes, screens and cars; micro-LEDs promise bright displays. Laser diodes drive fibre networks, barcode scanners, Blu-ray, laser printers and pump fibre and solid-state lasers. High-power diode bars cut and weld metal.
X: A blue LED chip has n = 2.5. What fraction of its sphere of emission escapes a flat top surface?
> θ_{c} = sin^{−1}(0.4) ≈ 23.6°
> Fraction of 4π in the escape cone ≈ (1 − cos θ_{c})/2 = (1 − 0.916)/2 ≈ 4%
> Hence textured surfaces and shaped chips
X: A laser diode has η_{d} = 0.8, λ = 980 nm, I_{th} = 20 mA. What power is emitted at 120 mA?
> hf/e = 1240/980 ≈ 1.27 V
> P = 0.8 × 1.27 × 0.1 = 0.10 W
K: An LED is spontaneous emission from a junction; a laser diode adds feedback so stimulated emission dominates above threshold.
!: LED efficiency is often limited by light extraction, not internal recombination.
Q: How is white light made in most LEDs? | A blue InGaN chip excites a yellow phosphor; blue plus yellow looks white.
Q: What is a VCSEL? | A vertical-cavity surface-emitting laser that emits perpendicular to the wafer.
M1: Below threshold a laser diode behaves like: | An LED | A photodiode | A resistor | A capacitor | Spontaneous emission dominates.
M2: Light extraction is hard from LEDs because: | High refractive index causes total internal reflection | They are too cold | Photons are absorbed in metal only | The gap is indirect | Only a small escape cone exists.

## Photodetectors
S: Photodetectors convert light into an electrical signal. Photodiodes, avalanche photodiodes, photomultipliers and image sensors each balance sensitivity, speed, noise and wavelength range to suit uses from fibre receivers to phone cameras and astronomy.
H: Photodiodes
- A reverse-biased p–n or p–i–n junction separates photo-generated electron–hole pairs, giving a current.
- **Quantum efficiency** η: electrons out per photon in.
- **Responsivity** R = I/P = ηeλ/(hc); for silicon at 850 nm, ~0.5 A W^{-1}.
- Cutoff wavelength λ_{c} = hc/E_{g}: Si to ~1.1 μm, InGaAs to ~1.7 μm, HgCdTe to the mid-infrared.
E: R = ηeλ/(hc) ≈ ηλ(μm)/1.24 A W^{-1} :: responsivity
H: Gain and speed
- **Avalanche photodiodes (APDs)**: high field causes impact ionisation, gain M ~ 10–100, with excess noise.
- **Single-photon avalanche diodes (SPADs)**: biased above breakdown, each photon triggers a pulse.
- **Photomultiplier tubes**: photocathode plus dynode chain, gain ~10^{6}.
- Speed limited by transit time and RC: high-speed p–i–n diodes reach ~100 GHz.
H: Noise and imaging
P: Shot noise i_{n} = √(2eIΔf), dark current and thermal (Johnson) noise set the noise floor; noise-equivalent power (NEP) and specific detectivity D* compare detectors. Image sensors (CMOS and CCD) are arrays of photodiodes; back-side illumination and microlenses lift efficiency above 80%.
E: i_{shot} = √(2eIΔf) :: shot noise current
X: An InGaAs photodiode has η = 0.8 at 1550 nm. Find its responsivity and the current for 10 μW.
> R = 0.8 × 1.55/1.24 = 1.0 A W^{-1}
> I = 1.0 × 10 × 10^{-6} = 10 μA
X: Why can't silicon detect 1550 nm light?
> Photon energy 0.80 eV < Si gap 1.12 eV, so no electron–hole pairs form
K: Responsivity rises with wavelength until photons no longer exceed the band gap.
!: More gain does not always mean better SNR: APD excess noise grows with gain.
Q: What is the cutoff wavelength of silicon? | About 1.1 μm, set by its 1.12 eV band gap.
Q: How does a SPAD detect single photons? | Biased above breakdown, one photo-electron triggers a self-sustaining avalanche that is then quenched.
M1: A photodiode with η = 1 at 1240 nm has responsivity: | 1 A W^{-1} | 0.5 A W^{-1} | 2 A W^{-1} | 1240 A W^{-1} | R = ηλ(μm)/1.24.
M2: Which detector suits 1.55 μm fibre receivers? | InGaAs p–i–n | Silicon CCD | Selenium | Germanium-free glass | InGaAs absorbs to 1.7 μm.

## Optical modulators
S: Optical modulators impose information on light by changing its intensity, phase or polarisation at high speed. They are the transmitters of the internet's fibre backbone and data centres, using electro-optic, electro-absorption and carrier-plasma effects.
H: Physical effects
- **Pockels effect** (linear electro-optic): Δn ∝ E in non-centrosymmetric crystals such as lithium niobate.
- **Kerr effect**: Δn ∝ E^{2}.
- **Electro-absorption** (Franz–Keldysh, quantum-confined Stark effect): a field shifts the absorption edge.
- **Plasma dispersion** in silicon: free-carrier density changes n and absorption.
- **Acousto-optic**: sound waves form a moving grating that deflects and shifts light.
H: Mach–Zehnder modulator
- Light splits into two arms; voltage changes the phase in one or both; recombination converts phase difference into intensity.
- **V_{π}**: voltage for a π phase shift (full on to off).
- Transfer: I_{out} = I_{in} cos^{2}(πV/2V_{π}).
E: Δφ = (2π/λ)ΔnL, Δn = ½n^{3}rE :: Pockels phase shift
E: I_{out}/I_{in} = cos^{2}(πV/(2V_{π})) :: MZ transfer
H: Advanced formats
P: Coherent systems encode data in both amplitude and phase on two polarisations: QPSK, 16-QAM, 64-QAM. IQ modulators, nested Mach–Zehnders, reach >100 GBd. Thin-film lithium niobate gives low V_{π} and bandwidths beyond 100 GHz. Ring modulators in silicon are tiny and power-efficient but sensitive to temperature.
X: An MZM has V_{π} = 3 V. What fraction of light is transmitted at V = 1.5 V?
> cos^{2}(π × 1.5/6) = cos^{2}(π/4) = 0.5
X: A 16-QAM signal on two polarisations at 64 GBd carries how many bits per second (raw)?
> 16-QAM = 4 bits per symbol; × 2 polarisations = 8 bits
> 64 × 10^{9} × 8 = 512 Gb s^{-1}
K: Modulators convert electrical signals into changes of optical phase or absorption, then often into intensity via interference.
!: Phase modulation alone changes no intensity; an interferometer is needed to see it on a simple detector.
Q: What is V_{π}? | The voltage needed to shift the optical phase by π, switching an MZM from fully on to fully off.
Q: Which effect do silicon modulators use? | The free-carrier plasma dispersion effect.
M1: The Pockels effect gives: | Δn ∝ E | Δn ∝ E^{2} | Δn ∝ 1/E | No change | It is linear in field.
M2: QPSK carries how many bits per symbol per polarisation? | 2 | 1 | 4 | 8 | Four phase states.

## Photonic integrated circuits
S: Photonic integrated circuits put many optical components, such as lasers, waveguides, modulators, filters and detectors, on a single chip, as electronic chips did for transistors. They make optical transceivers, sensors and quantum devices small, cheap and robust.
H: Building blocks
- Waveguides, bends and splitters (Y-junctions, multimode interference couplers).
- Directional couplers and Mach–Zehnder interferometers for switching.
- Ring resonators and arrayed waveguide gratings (AWGs) for wavelength filtering and multiplexing.
- Modulators, photodetectors and (in III–V platforms) lasers and amplifiers.
- Grating and edge couplers to connect to fibre.
H: Platforms
- **Indium phosphide**: monolithic lasers, amplifiers, modulators and detectors.
- **Silicon photonics**: CMOS-compatible, dense, cheap; lasers bonded or attached.
- **Silicon nitride**: very low loss, broad transparency, for lasers, sensing and quantum.
- **Thin-film lithium niobate**: fast, low-voltage modulators and nonlinear optics.
E: FSR = λ^{2}/(n_{g}L) :: ring resonator free spectral range
E: Q = λ/Δλ :: quality factor
H: Design and packaging
P: Foundries offer process design kits so designers can build circuits from validated components. Packaging and fibre coupling often dominate cost. Co-packaged optics put transceivers next to switch chips, cutting power in data centres. PICs also power LiDAR, biosensors, optical computing and quantum photonic processors.
X: A silicon ring has circumference 100 μm and group index 4.2. What is its FSR at 1550 nm?
> FSR = (1.55 × 10^{-6})^{2}/(4.2 × 100 × 10^{-6}) = 2.4 × 10^{-12}/4.2 × 10^{-4} ≈ 5.7 nm
K: PICs miniaturise optical systems onto chips; the choice of platform trades lasers, loss, speed and cost.
!: Silicon cannot easily make its own lasers; light sources must usually be added from III–V materials.
Q: What does an arrayed waveguide grating do? | It separates or combines many wavelength channels on a chip.
Q: Why is silicon photonics attractive? | It uses mature CMOS fabrication for dense, low-cost, high-volume chips.
M1: A ring resonator's FSR falls if: | The ring gets larger | The wavelength increases | The group index falls | The ring shrinks | FSR ∝ 1/L.
M2: Which platform makes monolithic lasers? | Indium phosphide | Silicon | Glass | Silicon dioxide | Direct-gap III–V material.

## Optical waveguides
S: Optical waveguides confine and guide light along a path using total internal reflection or more subtle interference effects. Optical fibres and on-chip waveguides both rely on a high-index core surrounded by lower-index cladding, supporting a discrete set of modes.
H: Guiding by total internal reflection
- Light in a core of index n_{1} surrounded by cladding n_{2} < n_{1} is trapped if it meets the boundary beyond the critical angle.
- **Numerical aperture** NA = √(n_{1}^{2} − n_{2}^{2}) sets the acceptance cone.
- Only certain field patterns (modes) propagate, each with its own effective index n_{eff}.
E: NA = √(n_{1}^{2} − n_{2}^{2}) = sin θ_{max} :: numerical aperture
E: V = (2πa/λ) NA :: normalised frequency (fibre)
H: Single-mode and multimode
- A step-index fibre is single-mode when V < 2.405.
- Multimode fibres (core 50–62.5 μm) are easy to couple but suffer modal dispersion.
- Single-mode fibre (core ~9 μm) is used for long-haul and high-speed links.
- Graded-index fibres reduce modal dispersion by slowing rays near the axis.
H: Planar waveguides
P: On chips, waveguides are rectangular strips or ribs (silicon in silica, silicon nitride, lithium niobate). High index contrast (Si 3.48 vs SiO_{2} 1.44) allows sub-micron cores and tight bends, but makes waveguides sensitive to sidewall roughness. Evanescent fields extend into the cladding and enable couplers and sensors.
X: A fibre has n_{1} = 1.468, n_{2} = 1.463, core radius 4.1 μm. Is it single-mode at 1550 nm?
> NA = √(1.468^{2} − 1.463^{2}) ≈ √0.0147 ≈ 0.121
> V = 2π × 4.1 × 0.121/1.55 ≈ 2.01 < 2.405: single-mode
K: Waveguides confine light with an index contrast; the V number decides how many modes fit.
!: A single-mode fibre is multimode at shorter wavelengths, because V rises as λ falls.
Q: What is the single-mode condition for a step-index fibre? | V < 2.405.
Q: What is the evanescent field? | The part of a guided mode that decays exponentially into the cladding.
M1: Numerical aperture increases if: | Core–cladding index difference grows | Core radius shrinks | Wavelength grows | Cladding index rises | NA depends on n_{1}^{2} − n_{2}^{2}.
M2: Modal dispersion affects: | Multimode fibres | Single-mode fibres | Neither | Only vacuum | Different modes travel at different speeds.

## Fibre-optic communications
S: Fibre-optic communication sends data as light pulses through glass fibres thinner than a hair, across oceans and into homes. Low loss, enormous bandwidth and optical amplifiers make fibre the backbone of the internet.
H: Loss
- Silica fibre loss ~0.15–0.2 dB km^{-1} at 1550 nm; ~0.35 dB km^{-1} at 1310 nm.
- Rayleigh scattering dominates at short wavelengths; infrared absorption at long ones.
- The old water absorption peak at 1383 nm is removed in low-water-peak fibre.
E: P_{out} = P_{in} × 10^{−αL/10} :: loss in dB
H: Dispersion
- **Chromatic dispersion**: different wavelengths travel at different speeds; ~17 ps nm^{-1} km^{-1} at 1550 nm in standard fibre.
- Zero dispersion near 1310 nm in standard fibre; dispersion-shifted fibres move it.
- **Polarisation-mode dispersion** from slight birefringence.
- Coherent receivers with digital signal processing undo dispersion electronically.
E: Δτ = D L Δλ :: chromatic pulse spreading
H: Amplification and capacity
P: Erbium-doped fibre amplifiers (EDFAs) boost all channels in the C-band (1530–1565 nm) without converting to electronics, enabling transoceanic links. Wavelength-division multiplexing (WDM) carries ~100 channels; with coherent modulation, one fibre carries tens of terabits per second. Raman amplifiers, multicore and few-mode fibres push towards petabits.
X: A 100 km link at 0.2 dB km^{-1} starts at 1 mW. What arrives?
> Loss = 20 dB ⇒ factor 10^{-2}
> P = 0.01 mW = 10 μW
X: A source has 0.1 nm linewidth over 80 km with D = 17 ps nm^{-1} km^{-1}. Pulse spread?
> Δτ = 17 × 80 × 0.1 = 136 ps
K: Fibre wins through ultra-low loss and huge bandwidth, with amplifiers and DSP handling loss and dispersion.
!: dB values add: 3 dB is half, 10 dB is a tenth, 20 dB is a hundredth.
Q: Why is 1550 nm used for long-haul fibre? | Lowest loss (~0.2 dB/km) and erbium amplifiers work there.
Q: What does WDM do? | It sends many wavelengths on one fibre, each carrying its own data channel.
M1: 30 dB of loss reduces power by: | 1000× | 30× | 100× | 3× | 10^{3}.
M2: EDFAs amplify around: | 1550 nm | 850 nm | 1310 nm | 650 nm | The erbium C-band.

## Nonlinear optical processes
S: At high intensities, a material's response to light is no longer proportional to the field, so new frequencies appear and beams change their own propagation. Nonlinear optics underpins frequency conversion, ultrafast lasers, optical switching and quantum light sources.
H: The nonlinear polarisation
- P = ε_{0}(χ^{(1)}E + χ^{(2)}E^{2} + χ^{(3)}E^{3} + …).
- **χ^{(2)}** processes need non-centrosymmetric crystals: second-harmonic generation, sum and difference frequency generation, parametric amplification, Pockels effect.
- **χ^{(3)}** processes occur in all materials: third-harmonic generation, the optical Kerr effect, four-wave mixing, self-phase modulation, Raman and Brillouin scattering.
E: P = ε_{0}(χ^{(1)}E + χ^{(2)}E^{2} + χ^{(3)}E^{3}) :: nonlinear polarisation
E: n = n_{0} + n_{2}I :: optical Kerr effect
H: Kerr effects
- **Self-focusing**: a beam with higher central intensity sees higher index and focuses itself.
- **Self-phase modulation**: intensity-dependent phase broadens the spectrum of short pulses.
- **Solitons** in fibre: SPM balances anomalous dispersion so pulses keep their shape.
- Kerr-lens mode-locking makes femtosecond lasers.
H: Why intensity matters
P: Nonlinear effects grow with field strength, so they need lasers, tight focusing or long interaction lengths (fibres, waveguides, resonators). Silica's n_{2} ≈ 2.6 × 10^{-20} m^{2} W^{-1} is tiny, but over kilometres of fibre it matters greatly. Phase matching is needed for efficient conversion.
X: Silica n_{2} = 2.6 × 10^{-20} m^{2} W^{-1}; a beam has 10^{14} W m^{-2}. What is Δn?
> Δn = 2.6 × 10^{-20} × 10^{14} = 2.6 × 10^{-6}
> Over 1 m at 1 μm wavelength, this gives a phase of 2π × 2.6 ≈ 16 rad
K: Nonlinear optics appears when intense light changes the material's response, mixing frequencies and modifying the beam itself.
!: χ^{(2)} vanishes in materials with inversion symmetry, such as glass and silicon, so they have no Pockels effect or efficient SHG.
Q: Which nonlinear order occurs in all materials? | Third order, χ^{(3)}.
Q: What is a fibre soliton? | A pulse whose self-phase modulation balances dispersion, so it travels without changing shape.
M1: Second-harmonic generation requires: | A non-centrosymmetric crystal | Any glass | A metal | Vacuum | χ^{(2)} must be nonzero.
M2: Self-focusing arises from: | Positive n_{2} with high central intensity | Absorption | Rayleigh scattering | Diffraction alone | The beam makes its own lens.

## Frequency conversion
S: Frequency conversion uses nonlinear crystals to make new colours of laser light: doubling, tripling, summing and splitting photons. It turns infrared lasers into green pointers and UV sources and creates widely tunable sources and entangled photons.
H: Processes
- **Second-harmonic generation (SHG)**: ω + ω → 2ω (1064 nm to 532 nm green).
- **Sum-frequency generation**: ω_{1} + ω_{2} → ω_{3}; third harmonic of Nd:YAG at 355 nm.
- **Difference-frequency generation**: ω_{3} − ω_{2} → ω_{1}, used for mid-infrared and terahertz.
- **Optical parametric amplification and oscillation (OPA/OPO)**: a pump photon splits into signal and idler, tunable over wide ranges.
- **Spontaneous parametric down-conversion (SPDC)**: makes entangled photon pairs.
E: ω_{3} = ω_{1} + ω_{2}, k_{3} = k_{1} + k_{2} :: energy and momentum conservation
E: Δk = k_{3} − k_{1} − k_{2}, L_{c} = π/Δk :: phase mismatch and coherence length
H: Phase matching
- Dispersion makes waves drift out of phase; conversion reverses after a coherence length.
- **Birefringent phase matching**: choose angle and polarisation so n(2ω) = n(ω).
- **Quasi-phase matching**: periodically poled crystals (PPLN, PPKTP) flip the sign of χ^{(2)} every coherence length.
- Common crystals: BBO, LBO, KTP, LiNbO_{3}.
H: Efficiency
P: In the low-conversion limit, SHG power scales with the square of input power and the square of length (when phase matched), so pulsed and tightly focused beams convert best. Practical green and UV lasers reach >50% efficiency. Waveguide PPLN gives high conversion even at milliwatt powers.
E: P_{2ω} ∝ (d_{eff}^{2} L^{2}/A) P_{ω}^{2} :: low-efficiency SHG scaling
X: Doubling a 1550 nm laser gives what wavelength?
> λ/2 = 775 nm
X: An OPO pumped at 532 nm produces a 1500 nm signal. What is the idler?
> 1/λ_{i} = 1/532 − 1/1500 = 0.001880 − 0.000667 = 0.001213 nm^{-1}
> λ_{i} ≈ 824 nm
K: Nonlinear conversion must conserve energy (frequencies) and momentum (phase matching) to be efficient.
!: Without phase matching, the generated wave keeps cycling back to zero, giving very little output.
Q: What is quasi-phase matching? | Periodically reversing the crystal's nonlinear coefficient to reset the phase every coherence length.
Q: How is a green laser pointer made? | An infrared diode pumps Nd:YVO_{4} at 1064 nm, and a KTP crystal doubles it to 532 nm.
M1: Doubling the input power to an SHG crystal (low efficiency) gives: | 4× the output | 2× | 8× | No change | P_{2ω} ∝ P_{ω}^{2}.
M2: SPDC is used to generate: | Entangled photon pairs | X-rays | Electron beams | Microwaves | One pump photon splits into two.

## Ultrafast lasers
S: Ultrafast lasers produce pulses lasting picoseconds to femtoseconds, the shortest controlled events humans can make. Mode-locking locks many cavity modes in phase so their interference produces a train of intense, brief pulses.
H: Mode-locking
- A laser cavity supports longitudinal modes separated by Δf = c/(2L).
- Locking N modes in phase produces pulses of duration ~1/(NΔf) at repetition rate c/(2L).
- **Active** mode-locking: a modulator in the cavity.
- **Passive**: saturable absorbers (SESAMs, graphene) or Kerr-lens mode-locking.
E: f_{rep} = c/(2L) :: repetition rate
E: Δt Δf ≥ 0.441 (Gaussian) :: time–bandwidth product
H: Gain media
- **Ti:sapphire**: 650–1100 nm gain, pulses below 10 fs.
- **Ytterbium** (fibre and thin-disk): high average power, ~100 fs–1 ps, used in industry.
- **Erbium fibre**: 1550 nm, compact, used for frequency combs.
H: Amplification
P: Chirped-pulse amplification (Nobel Prize 2018, Strickland and Mourou) stretches pulses in time, amplifies them safely, then compresses them, reaching petawatt peak powers. Ultrafast lasers machine materials with minimal heat damage, perform LASIK eye surgery, drive multiphoton microscopy, and generate attosecond pulses.
E: P_{peak} ≈ E_{pulse}/Δt :: peak power
X: A Ti:sapphire laser has L = 1.5 m. What is its repetition rate?
> f_{rep} = 3 × 10^{8}/(2 × 1.5) = 100 MHz
X: A 1 mJ, 30 fs pulse has what peak power?
> 10^{-3}/(30 × 10^{-15}) ≈ 3.3 × 10^{10} W = 33 GW
K: Short pulses need broad bandwidth; mode-locking brings that bandwidth into phase.
!: Peak power can be enormous while average power is modest; damage and nonlinear effects follow peak intensity.
Q: What did chirped-pulse amplification solve? | It stretched pulses before amplification to avoid damaging peak intensities, then compressed them.
Q: Why does a 10 fs pulse need a broad spectrum? | Time–bandwidth: short duration requires many frequencies.
M1: A 3 m cavity gives a repetition rate of: | 50 MHz | 100 MHz | 25 MHz | 3 GHz | c/(2L).
M2: Kerr-lens mode-locking relies on: | Intensity-dependent self-focusing | Saturable absorption in dye only | Electro-optic switching | Doppler shifts | Strong pulses focus and see less loss.

## Femtosecond optics
S: Femtosecond optics deals with how ultrashort pulses are measured, shaped and used. Dispersion, chirp and nonlinear effects matter hugely at these timescales, while the pulses open windows on chemical reactions, electron dynamics and precision timing.
H: Dispersion and chirp
- Group velocity dispersion (GVD) stretches pulses: red and blue components arrive at different times.
- A chirped pulse has frequency changing with time.
- Compression with prism pairs, grating pairs or chirped mirrors applies negative GVD.
E: τ_{out} = τ_{in}√(1 + (4 ln2 · GDD/τ_{in}^{2})^{2}) :: Gaussian pulse broadening
H: Measuring pulses
- Too fast for electronics; pulses must measure themselves.
- **Autocorrelation**: overlap with a delayed copy in a nonlinear crystal.
- **FROG** and **SPIDER** retrieve full amplitude and phase.
H: Applications
- **Pump–probe spectroscopy**: one pulse starts a process, another probes it after a delay (femtochemistry, Nobel 1999 Zewail).
- **Multiphoton microscopy**: nonlinear absorption only at the focus gives deep 3D imaging.
- **Frequency combs**: a mode-locked laser's evenly spaced lines act as an optical ruler (Nobel 2005 Hall and Hänsch).
- **High-harmonic generation**: intense pulses in gases produce attosecond XUV bursts (Nobel 2023).
E: f_{n} = n f_{rep} + f_{ceo} :: frequency comb lines
H: Precision and control
P: Pulse shapers with spatial light modulators sculpt spectral phase to control quantum pathways. Carrier-envelope phase stabilisation fixes the electric field under the envelope, essential for attosecond science and comb metrology. Optical clocks use combs to count optical frequencies.
X: A 20 fs pulse passes 1 cm of glass with GDD 360 fs^{2}. Roughly how long is it afterwards?
> 4 ln2 × 360/400 ≈ 2.5
> τ ≈ 20 × √(1 + 6.2) ≈ 20 × 2.7 ≈ 54 fs
K: At femtosecond scales, even a few millimetres of glass reshape a pulse, so dispersion management is essential.
!: An autocorrelation width is not the pulse width; it must be divided by a shape factor (√2 for a Gaussian).
Q: How do frequency combs work as rulers? | Each line is at n × f_{rep} + f_{ceo}; measuring both pins every line's frequency.
Q: What is pump–probe spectroscopy? | A pump pulse excites a system; a delayed probe pulse records its evolution.
M1: Shorter input pulses broaden in glass: | More | Less | Not at all | Only in vacuum | Broader spectra suffer more dispersion.
M2: Attosecond pulses are made by: | High-harmonic generation | LEDs | Q-switching | Fluorescence | Strong-field ionisation and recollision.

## Quantum optics
S: Quantum optics treats light as made of photons with quantum states, revealing effects classical waves cannot explain: antibunching, squeezing, entanglement and two-photon interference. These underpin quantum communication, sensing and photonic quantum computing.
H: Quantised light
- Each field mode is a harmonic oscillator; the number state |n⟩ has exactly n photons.
- **Coherent states**: laser light; Poissonian photon numbers with variance = mean.
- **Thermal light**: super-Poissonian, photons tend to bunch.
- **Squeezed light**: reduced noise in one quadrature below the vacuum level (used in LIGO).
- Vacuum fluctuations are real: they drive spontaneous emission and the Casimir effect.
E: g^{(2)}(0) = ⟨n(n−1)⟩/⟨n⟩^{2} :: second-order coherence
H: Photon statistics
- Coherent light: g^{(2)}(0) = 1. Thermal: 2. Single photon source: 0 (antibunched).
- Hanbury Brown–Twiss experiments measure g^{(2)} with two detectors.
H: Interference and entanglement
P: The Hong–Ou–Mandel effect: two identical photons entering a beam splitter from opposite sides always leave together, a purely quantum dip in coincidences. Entangled photons violate Bell inequalities (Nobel 2022: Aspect, Clauser, Zeilinger). Cavity QED couples single atoms and photons strongly.
X: A source gives g^{(2)}(0) = 0.05. What does this mean?
> Far below 1 (and below 0.5): strongly antibunched, almost always one photon at a time
K: Photon statistics, not just intensity, reveal the quantum nature of light.
!: A very attenuated laser is not a single-photon source; it still has Poissonian statistics and occasional multi-photon pulses.
Q: What is g^{(2)}(0) for a perfect single-photon source? | 0.
Q: What is the Hong–Ou–Mandel effect? | Two indistinguishable photons meeting at a 50:50 beam splitter always exit together.
M1: Laser light has photon statistics that are: | Poissonian | Sub-Poissonian | Super-Poissonian with g^{(2)} = 2 | Fixed number | Coherent states.
M2: Squeezed light improves LIGO by: | Reducing quantum noise in one quadrature | Making lasers brighter | Removing mirrors | Adding thermal noise | It lowers shot noise.

## Single-photon sources
S: Single-photon sources emit exactly one photon on demand, ideally indistinguishable from every other. They are essential for quantum key distribution, photonic quantum computing and quantum networks, and building good ones is a major engineering challenge.
H: Figures of merit
- **Purity**: g^{(2)}(0) ≈ 0.
- **Indistinguishability**: HOM visibility near 1.
- **Brightness / efficiency**: probability of a photon per trigger collected into a fibre.
- Repetition rate, wavelength and operating temperature.
H: Types
- **Quantum dots** in micropillar or waveguide cavities: bright, indistinguishable, but need cryogenic cooling.
- **Colour centres**: NV and SiV centres in diamond, defects in SiC and hBN; some work at room temperature.
- **Trapped atoms and ions**: very pure, linked to quantum memories.
- **Heralded SPDC or four-wave mixing**: detecting one photon of a pair heralds the other; probabilistic, so multiplexing is used.
H: Engineering
P: Placing an emitter in a cavity speeds emission and directs photons via the Purcell effect. Resonant excitation reduces jitter and improves indistinguishability. Superconducting nanowire detectors with >95% efficiency pair with these sources. Deterministic sources plus low-loss circuits are key to scaling photonic quantum computers.
E: F_{P} = (3/4π^{2})(λ/n)^{3}(Q/V) :: Purcell factor
X: A heralded source has pair probability 0.01 per pulse. Why not raise it to 0.5?
> Multi-pair emission grows as p^{2}, ruining purity
> Keep p low and multiplex many sources instead
K: An ideal single-photon source is pure, indistinguishable, efficient and on demand; real ones trade these off.
!: Heralded sources are probabilistic; "on demand" requires multiplexing or a deterministic emitter.
Q: What does heralding mean? | Detecting one photon of a pair to announce the presence of its partner.
Q: What does the Purcell effect do? | A cavity enhances and directs an emitter's spontaneous emission.
M1: Indistinguishability is tested with: | Hong–Ou–Mandel interference | A power meter | An oscilloscope | A thermometer | Identical photons bunch.
M2: Quantum dot sources usually require: | Cryogenic temperatures | High vacuum only | Microwaves | X-ray pumping | Typically ~4 K.

## Photonic crystals
S: Photonic crystals are materials with periodic refractive index on the scale of the wavelength of light. Like electrons in a crystal lattice, photons in them have band structures and band gaps, which let engineers trap, slow and steer light in new ways.
H: Band gaps for light
- Periodic index variation causes Bragg reflection; a stop band forms where reflected waves interfere constructively.
- In 1D: dielectric mirrors (Bragg stacks) reflect >99.9% in a band.
- In 2D and 3D: complete photonic band gaps forbid propagation in all directions within a range.
- Natural examples: opals, butterfly wings, peacock feathers (structural colour).
E: λ_{B} = 2n_{eff}Λ :: Bragg wavelength
E: Quarter-wave stack: n_{1}d_{1} = n_{2}d_{2} = λ/4 :: dielectric mirror design
H: Defects and devices
- A missing hole in a 2D crystal forms a cavity with Q of up to millions and tiny volume.
- A line defect guides light around sharp bends.
- **Slow light**: near the band edge, group velocity can drop by 100×, enhancing interaction.
- **Photonic crystal fibres**: holey fibres with endlessly single-mode guidance; hollow-core fibres guide light in air.
H: Applications
P: Distributed Bragg reflectors in VCSELs, fibre Bragg grating sensors, high-Q nanocavities for lasers and quantum optics, hollow-core fibres with lower latency for trading and data, and supercontinuum generation in PCFs. Topological photonics uses band structure to make edge states robust against defects.
X: A fibre Bragg grating with n_{eff} = 1.447 should reflect at 1550 nm. What period is needed?
> Λ = λ_{B}/(2n_{eff}) = 1550/(2 × 1.447) ≈ 536 nm
X: Quarter-wave layer thicknesses for 600 nm with n = 2.3 and 1.45?
> d_{1} = 600/(4 × 2.3) ≈ 65 nm; d_{2} = 600/(4 × 1.45) ≈ 103 nm
K: Periodic structures make photonic band gaps, letting us mirror, trap and slow light by design.
!: A band gap appears only for wavelengths comparable to the period; it is not a property of the material alone.
Q: What causes structural colour in butterfly wings? | Photonic nanostructures that reflect particular wavelengths by interference.
Q: What is a hollow-core fibre? | A fibre guiding light in an air core using a photonic band gap or anti-resonance.
M1: A fibre Bragg grating's reflected wavelength rises when it is: | Stretched | Cooled heavily | Removed | Painted | Strain increases Λ and changes n.
M2: Slow light occurs near: | Photonic band edges | Zero frequency | Total transmission | Metals | Group velocity drops at the band edge.

## Plasmonics
S: Plasmonics uses collective oscillations of electrons at metal surfaces, surface plasmons, to squeeze light into regions far smaller than its wavelength. This boosts local fields enormously and enables nanoscale sensors, enhanced spectroscopy and new optical components.
H: Surface plasmon polaritons
- At a metal–dielectric interface, light can couple to electron oscillations that propagate along the surface.
- They need metals with negative real permittivity (gold, silver, aluminium) at optical frequencies.
- Their wavevector exceeds light's in the dielectric, so prisms or gratings are needed to excite them.
- Propagation length micrometres; losses from metal absorption are the main drawback.
E: k_{sp} = (ω/c)√(ε_{m}ε_{d}/(ε_{m} + ε_{d})) :: surface plasmon dispersion
H: Localised plasmons
- Metal nanoparticles show localised surface plasmon resonances (LSPR).
- Gold nanospheres resonate near 520 nm (ruby colour of stained glass); rods tune into the infrared.
- Resonance condition for a small sphere: ε_{m} = −2ε_{d}.
- Hot spots in gaps enhance fields by 10–1000×.
H: Applications
P: Surface plasmon resonance (SPR) biosensors detect molecular binding through refractive-index shifts. Surface-enhanced Raman scattering (SERS) boosts Raman signals by up to 10^{10}, detecting single molecules. Plasmonic photothermal therapy heats tumours with nanoparticles. Metasurfaces of nano-antennas shape wavefronts for flat lenses. Heat-assisted magnetic recording uses a plasmonic near-field transducer.
X: Why do gold nanoparticles appear red in transmission?
> They absorb and scatter strongly near their 520 nm (green) plasmon resonance
> Transmitted light lacks green and looks red
K: Plasmons beat the diffraction limit by storing energy in electron oscillations, at the cost of metal losses.
!: Plasmonic confinement comes with high absorption; there is always a trade-off between confinement and propagation length.
Q: What condition gives a localised plasmon resonance in a small sphere? | ε_{metal} = −2ε_{dielectric}.
Q: How does SERS work? | Plasmonic hot spots greatly enhance the local field, boosting Raman signals.
M1: Surface plasmons can exist at the interface of: | A metal and a dielectric | Two glasses | Two vacuum regions | Two insulators of equal index | They need negative ε on one side.
M2: SPR biosensors detect: | Changes in refractive index at a surface | X-ray absorption | Magnetism | Electrical resistance | Binding shifts the resonance angle.

## Optical sensors
S: Optical sensors use light to measure temperature, strain, chemistry, rotation, pressure and more. They are immune to electromagnetic interference, often passive and can be multiplexed along a single fibre over kilometres.
H: Principles
- Changes in intensity, wavelength, phase, polarisation or travel time encode the measured quantity.
- **Interferometric** sensors detect tiny phase changes (Mach–Zehnder, Michelson, Fabry–Pérot).
- **Spectroscopic** sensors detect absorption lines (gas sensing, pulse oximetry).
- **Fluorescence** sensors: quenching measures oxygen; lifetime measures temperature.
H: Fibre sensors
- **Fibre Bragg gratings**: Bragg wavelength shifts ~1.2 pm per microstrain and ~10 pm K^{-1} at 1550 nm.
- **Distributed sensing**: Rayleigh, Raman and Brillouin backscatter measure strain, temperature and vibration along tens of kilometres (pipelines, power cables, earthquake detection on telecom fibre).
- **Fibre-optic gyroscopes**: the Sagnac effect measures rotation for navigation.
E: Δλ_{B}/λ_{B} = (1 − p_{e})ε + (α + ξ)ΔT :: FBG response
E: Δφ = 8πNAΩ/(λc) :: Sagnac phase
H: Chemical and biological sensing
P: Absorption spectroscopy in the mid-infrared fingerprints gases such as CO_{2}, CH_{4} and NO_{x}; tunable diode laser spectroscopy monitors emissions. Waveguide and ring resonator biosensors detect proteins via evanescent fields. Smartphone-based optical sensors bring diagnostics to the field.
X: An FBG at 1550 nm shifts 1.2 pm per microstrain. A beam strains it by 500 microstrain. Shift?
> 1.2 × 500 = 600 pm = 0.6 nm
X: Raman distributed sensing uses which ratio for temperature?
> The anti-Stokes to Stokes intensity ratio, which rises with temperature
K: Optical sensors convert physical changes into measurable shifts in light, often along a fibre over long distances.
!: FBGs respond to both strain and temperature; separate them with a reference grating or two-parameter design.
Q: What effect does a fibre-optic gyroscope use? | The Sagnac effect: rotation changes the phase between counter-propagating beams.
Q: Name an advantage of fibre sensors. | Immune to electromagnetic interference, intrinsically safe and multiplexable.
M1: Distributed acoustic sensing along a telecom fibre uses: | Rayleigh backscatter | LED emission | Photoelectric effect | Pair production | Phase changes in backscattered light.
M2: Pulse oximetry is an example of: | Absorption spectroscopy | Interferometry | Brillouin sensing | Plasmonics | Red and infrared absorption ratios.

## Lidar
S: Lidar measures distance by timing laser pulses or measuring frequency shifts of returning light, building precise 3D maps. It guides self-driving cars, surveys forests and terrain, measures wind and aerosols, and maps the Moon.
H: Ranging methods
- **Time of flight**: R = ct/2; nanosecond pulses give centimetre resolution.
- **FMCW**: a chirped laser beats with its reflection; beat frequency gives range, and Doppler gives velocity.
- **Phase-shift** ranging with modulated light for short distances.
E: R = ct/2 :: time-of-flight range
E: R = c f_{b} T/(2B) :: FMCW range, chirp bandwidth B over time T
H: Scanning and detectors
- Rotating mirrors, MEMS mirrors, optical phased arrays or flash illumination.
- Detectors: APDs, SPADs (single photons), SiPMs.
- Wavelengths: 905 nm (cheap silicon detectors, eye-safety limits power) or 1550 nm (more eye-safe power, InGaAs detectors).
H: Applications
P: Airborne lidar sees through forest canopy gaps to reveal ancient ruins and measure biomass. Automotive lidar gives centimetre-accurate 3D point clouds at hundreds of metres. Doppler lidar measures wind for wind farms and airports; atmospheric lidar measures aerosols, clouds and ozone. Lunar laser ranging uses Apollo retroreflectors to measure the Moon's distance to millimetres.
X: A pulse returns after 667 ns. What is the range?
> R = 3 × 10^{8} × 667 × 10^{-9}/2 ≈ 100 m
X: Lunar ranging: round trip ~2.56 s. Distance?
> R = 3 × 10^{8} × 2.56/2 ≈ 3.84 × 10^{8} m
K: Lidar is radar with light: shorter wavelength gives finer resolution and precise 3D mapping.
!: Fog, rain and dark surfaces reduce returns; lidar complements rather than replaces radar and cameras.
Q: Why use 1550 nm lidar? | Eye safety allows higher power, giving longer range, though detectors cost more.
Q: What extra information does FMCW lidar give? | Velocity of each point, from the Doppler shift.
M1: Range resolution of 15 cm requires timing to about: | 1 ns | 1 ms | 1 μs | 1 s | Δt = 2ΔR/c.
M2: Airborne lidar can map ground under forests because: | Some pulses pass through gaps to the ground | Light passes through leaves fully | It uses X-rays | It measures heat | Multiple returns per pulse.

## Optical communications
S: Optical communications covers the whole system that moves information with light: transmitters, channels, receivers and the coding that squeezes in more bits. It includes fibre networks, data-centre interconnects, free-space laser links and satellite communications.
H: System basics
- Transmitter: laser plus modulator (intensity or coherent).
- Channel: fibre, free space or underwater.
- Receiver: photodiode (direct detection) or coherent receiver with local oscillator and DSP.
- Performance: bit error rate (BER), optical signal-to-noise ratio, link budget.
E: C = B log_{2}(1 + SNR) :: Shannon capacity
E: Link margin = P_{tx} − losses − P_{rx,min} (dB) :: link budget
H: Network types
- **Long-haul and submarine**: coherent WDM, EDFAs every ~50–100 km, >20 Tb s^{-1} per fibre pair.
- **Data centres**: short-reach links at 400G–1.6T, using parallel fibres or WDM, with PAM4 modulation.
- **Access**: passive optical networks (PON) bring fibre to homes, splitting one fibre to 32–64 users.
- **Free space**: satellite laser links (Starlink), Li-Fi indoors, deep-space optical comms (NASA DSOC).
H: Pushing capacity
P: Forward error correction allows operation at raw BERs near 10^{-2}. Probabilistic constellation shaping approaches the Shannon limit. Space-division multiplexing with multicore and multimode fibres multiplies capacity. Nonlinear effects in fibre set a practical capacity limit, because higher power raises SNR but also distortion.
X: A link has 3 dBm launch power, 25 dB total loss, receiver sensitivity −28 dBm. What is the margin?
> Received = 3 − 25 = −22 dBm
> Margin = −22 − (−28) = 6 dB
X: Shannon capacity for 50 GHz bandwidth and SNR = 1000 (30 dB)?
> C = 50 × 10^{9} × log_{2}(1001) ≈ 50 × 10^{9} × 9.97 ≈ 500 Gb s^{-1}
K: Capacity depends on bandwidth and SNR; optical systems maximise both while managing loss, dispersion and nonlinearity.
!: Increasing launch power does not raise capacity forever; fibre nonlinearity eventually adds more noise than it removes.
Q: What is PAM4? | Four-level amplitude modulation, carrying 2 bits per symbol in direct detection links.
Q: What is a passive optical network? | A fibre access network using passive splitters to share one fibre among many homes.
M1: 0 dBm is: | 1 mW | 0 W | 1 W | 10 mW | dBm is referenced to 1 mW.
M2: The main limit on fibre capacity at high power is: | Nonlinear effects | Rayleigh scattering only | Gravity | Detector colour | Kerr effects distort signals.

## Optical metrology
S: Optical metrology uses light to measure length, shape, surface finish, vibration and time with extraordinary precision. Interferometers measure to fractions of a nanometre, and optical clocks keep time to one second in the age of the universe.
H: Interferometry
- Michelson and Mach–Zehnder interferometers measure displacement in fractions of a wavelength.
- Each fringe = λ/2 change in mirror position.
- **Heterodyne** laser interferometers in semiconductor lithography tools track stages to sub-nanometre levels.
- **White-light interferometry** profiles surfaces with nanometre height resolution.
- LIGO measures strains of 10^{-21}: displacements of ~10^{-18} m.
E: d = Nλ/2 :: displacement from fringe count
H: Other methods
- **Laser Doppler vibrometry**: measures vibration velocity without contact.
- **Structured light and fringe projection**: 3D shape of objects (phone face recognition).
- **Digital holography and speckle interferometry**: deformation and strain fields.
- **Ellipsometry**: thin-film thickness and optical constants from polarisation changes.
- **Confocal and chromatic sensors**: precise height measurement.
H: Standards and time
P: Since 1983 the metre is defined by fixing the speed of light; length is realised through laser wavelengths and frequency combs. Optical lattice clocks reach fractional uncertainties near 10^{-18}, sensitive enough to detect a 1 cm height change via gravitational time dilation. A redefinition of the second using optical clocks is planned.
X: A Michelson with a 633 nm HeNe laser counts 2000 fringes. How far did the mirror move?
> d = 2000 × 633 nm/2 = 633 μm
X: A clock at 10^{-18} uncertainty: how much time error in 13.8 billion years?
> 13.8 × 10^{9} × 3.15 × 10^{7} s ≈ 4.3 × 10^{17} s
> Error ≈ 0.4 s
K: Interference turns the wavelength of light into a ruler, and optical frequencies into the most precise clocks ever made.
!: Air refractive index changes with temperature, pressure and humidity, shifting interferometer readings unless compensated.
Q: How far does a mirror move per fringe in a Michelson interferometer? | λ/2.
Q: How is the metre defined? | By fixing the speed of light at 299 792 458 m s^{-1}; the metre is the distance light travels in 1/299 792 458 s.
M1: Ellipsometry measures: | Thin-film thickness and optical constants | Temperature only | Radio signals | Magnetic fields | From polarisation changes on reflection.
M2: Optical clocks can detect height changes because of: | Gravitational time dilation | Thermal expansion | Air pressure | Magnetism | Clocks tick faster higher up.

## Silicon photonics
S: Silicon photonics builds optical circuits in silicon using the same foundries that make computer chips. It powers high-speed data-centre transceivers and is moving into lidar, sensing, AI accelerators and quantum computing.
H: Why silicon
- Transparent above ~1.1 μm; high index (3.48) gives tight confinement in sub-micron waveguides.
- Silicon-on-insulator (SOI) wafers: a thin silicon layer on buried oxide.
- CMOS-compatible processes enable high volume, high yield and integration with electronics.
H: Components
- Waveguides (~500 × 220 nm), grating and edge couplers, splitters.
- Modulators using carrier depletion in p–n junctions (Mach–Zehnder or rings), >100 Gb s^{-1}.
- Germanium photodetectors grown on silicon absorb up to ~1.6 μm.
- Thermo-optic phase shifters (dn/dT ≈ 1.8 × 10^{-4} K^{-1}) for tuning and switching.
- Lasers via heterogeneous integration of III–V materials, or external light sources.
E: Δφ = (2π/λ)(dn/dT)ΔT L :: thermo-optic phase shift
H: Challenges and future
P: Silicon has no efficient light emission and no Pockels effect, so lasers are added and modulators use slower carrier effects (or bonded lithium niobate). Thermal sensitivity requires active stabilisation of rings. Co-packaged optics, optical I/O for chips, neural network accelerators and silicon-nitride quantum photonics are the next frontiers.
X: What temperature change gives a π phase shift in a 100 μm silicon heater arm at 1550 nm?
> π = (2π/1.55 μm) × 1.8 × 10^{-4} × ΔT × 100 μm
> ΔT = 1.55/(2 × 1.8 × 10^{-4} × 100) ≈ 43 K
K: Silicon photonics trades material limits (no laser, no Pockels effect) for the scale and cost of CMOS manufacturing.
!: Silicon waveguides only work at wavelengths longer than ~1.1 μm, where silicon is transparent.
Q: Why are germanium detectors used in silicon photonics? | Ge absorbs telecom wavelengths and can be grown on silicon.
Q: What is SOI? | Silicon-on-insulator: a thin silicon layer on buried oxide, forming high-contrast waveguides.
M1: Silicon modulators usually rely on: | Carrier depletion (plasma dispersion) | The Pockels effect | Electron-beam lithography | Stimulated emission | Silicon lacks χ^{(2)}.
M2: Silicon's main photonic weakness is: | No efficient light emission | High cost | Opacity at 1550 nm | Low index | Its gap is indirect.
`;
