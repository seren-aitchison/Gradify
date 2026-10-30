// Unit 10: Waves and Wave Motion. Format: kit/course/notes.js
export default `
## Wave properties
S: A wave is a travelling disturbance that carries energy and momentum from place to place without carrying the medium along with it. Every wave, from ripples to light to matter waves, shares the same core properties.
H: The core properties
- **Amplitude**: maximum displacement from equilibrium.
- **Wavelength** λ: distance between successive points in phase.
- **Frequency** f and **period** T = 1/f.
- **Speed** v = fλ, set by the medium (for mechanical waves) or by the vacuum (light).
- **Phase**: where in the cycle a point is.
H: What all waves do
- Reflect, refract, diffract, interfere and superpose.
- Transverse waves can also be polarised.
- Carry energy at a rate proportional to amplitude squared.
H: Mechanical vs electromagnetic
P: Mechanical waves (sound, water, seismic, waves on strings) need a medium whose elastic and inertial properties set their speed. Electromagnetic waves are self-sustaining oscillations of electric and magnetic fields that cross a vacuum at c. Quantum matter waves describe probability amplitudes.
X: A stadium "Mexican wave" travels round but nobody moves sideways. What's travelling?
> Each person stands and sits: a local oscillation
> The disturbance (pattern) moves around; the people (medium) don't
!: Particles of the medium oscillate about fixed points; only energy and the pattern travel.
Q: What does a wave transfer? | Energy and momentum (and information), not the medium itself.
Q: What sets the speed of a mechanical wave? | The properties of the medium (elastic restoring force and inertia).
M1: Which wave can travel through a vacuum? | Light | Sound | Seismic P-wave | Water wave | EM waves need no medium.
M2: Which property of a wave is set by the source rather than the medium? | Frequency | Speed | Wavelength | Both speed and wavelength | f stays constant across boundaries.

## Transverse and longitudinal waves
S: In a transverse wave the oscillation is perpendicular to the direction of travel; in a longitudinal wave it's along it, forming compressions and rarefactions. Some waves are a mix of both.
H: Examples
- **Transverse**: waves on strings, EM waves, S-waves, ripples on a stretched membrane.
- **Longitudinal**: sound in air, P-waves, compression waves on a slinky, ultrasound in tissue.
- **Mixed**: water surface waves (particles move in circles or ellipses), Rayleigh seismic waves.
H: Key differences
- Only transverse waves can be polarised.
- Fluids support only longitudinal bulk waves (no shear stiffness); solids support both.
- Longitudinal displacement graphs look transverse when plotted, but the displacement is along the direction of travel.
X: A slinky shows compressions 30 cm apart, passing 4 per second. Find λ, f and v.
> λ = 0.30 m, f = 4 Hz
> v = fλ = 1.2 m s^{-1}
!: Don't confuse a graph of displacement against position with a picture of the wave; for sound, the "peaks" are where molecules are displaced most, not where pressure is highest (pressure peaks are 90° out of phase).
Q: What is a longitudinal wave? | A wave in which the oscillations are parallel to the direction of energy transfer.
Q: Why can't sound waves be polarised? | They're longitudinal: there's only one direction of oscillation.
M1: Which waves are transverse? | Light waves | Sound in air | P-waves | Ultrasound in water | EM oscillations are perpendicular to travel.
M2: Water surface particles move in: | Circles or ellipses | Straight lines vertically | Straight lines horizontally | No motion | Mixed transverse and longitudinal.

## Wavelength, frequency, period and speed
S: For any periodic wave, the speed equals frequency times wavelength. Frequency is set by the source; speed by the medium; so wavelength adjusts when a wave enters a new medium.
H: The wave equation
E: v = fλ = λ/T = ω/k
E: k = 2π/λ :: wavenumber
E: ω = 2πf :: angular frequency
H: Typical values
- Sound in air: 343 m s^{-1}; middle C (262 Hz) has λ = 1.3 m.
- Visible light: 400–700 nm, f ~ 4–7.5 × 10^{14} Hz.
- FM radio: ~100 MHz, λ ≈ 3 m. Wi-Fi: 2.4 GHz, λ ≈ 12.5 cm.
- Ocean swell: λ ~ 100 m, T ~ 8 s.
X: Light (λ = 600 nm in air) enters glass with n = 1.5. Find its frequency and new wavelength.
> f = c/λ = 3 × 10^{8}/6 × 10^{-7} = 5 × 10^{14} Hz (unchanged)
> v = c/1.5 = 2 × 10^{8} m s^{-1}; λ = 400 nm
!: Frequency doesn't change at a boundary; wavelength and speed do. The colour we see depends on frequency.
Q: What happens to frequency when a wave enters a new medium? | It stays the same.
Q: What is the wavenumber? | k = 2π/λ, radians per metre.
M1: A wave with f = 50 Hz and λ = 4 m has speed: | 200 m s^{-1} | 12.5 m s^{-1} | 54 m s^{-1} | 0.08 m s^{-1} | v = fλ.
M2: Sound at 1000 Hz moves from air (343 m s^{-1}) into water (1480 m s^{-1}). Its wavelength: | Increases to 1.48 m | Decreases | Stays at 0.34 m | Becomes zero | λ = v/f.

## Wave equations
S: The one-dimensional wave equation says the acceleration of each bit of medium is proportional to the curvature of the wave there. Any function of (x − vt) solves it, so shapes travel unchanged at speed v.
H: The equation
E: ∂^{2}y/∂t^{2} = v^{2} ∂^{2}y/∂x^{2}
E: y = f(x − vt) + g(x + vt) :: d'Alembert's general solution
E: y = A sin(kx − ωt + φ) :: harmonic travelling wave (right-moving)
H: Derivations
- **String**: Newton's law on a small segment gives v = √(T/μ) (tension / mass per length).
- **Sound**: gives v = √(K/ρ).
- **EM waves**: Maxwell's equations give v = 1/√(μ_{0}ε_{0}) = c.
H: In 3D
E: ∂^{2}ψ/∂t^{2} = v^{2}∇^{2}ψ
- Plane waves: e^{i(k·r − ωt)}. Spherical waves: (A/r) sin(kr − ωt), amplitude ∝ 1/r.
X: A guitar string has T = 70 N and μ = 0.5 g m^{-1}. Find the wave speed.
> v = √(70/5 × 10^{-4}) = 374 m s^{-1}
!: kx − ωt moves right; kx + ωt moves left. Sign errors reverse the direction of travel.
Q: What is the speed of a wave on a string? | v = √(T/μ).
Q: What does d'Alembert's solution show? | Any shape travelling unchanged in either direction at speed v solves the wave equation.
M1: y = 0.02 sin(4x − 200t) travels at: | 50 m s^{-1} | 200 m s^{-1} | 800 m s^{-1} | 4 m s^{-1} | v = ω/k.
M2: Quadrupling a string's tension changes the wave speed by: | ×2 | ×4 | ×16 | ×1/2 | v ∝ √T.

## Wave propagation
S: As waves travel they spread out, lose energy to the medium, and may change speed and shape. Understanding propagation explains why sound fades, why radio reaches round the Earth, and why earthquakes are felt far away.
H: Spreading
E: I ∝ 1/r^{2} :: spherical waves (point source in 3D)
E: I ∝ 1/r :: cylindrical waves (line source)
- Plane waves don't spread geometrically.
H: Attenuation
E: I = I_{0}e^{−αx} :: absorption
- High frequencies are usually absorbed faster (distant thunder rumbles; whale song at low frequency crosses oceans).
H: Channels and guides
P: Waves can be trapped in layers where speed is lowest: the ocean's SOFAR channel carries low-frequency sound thousands of kilometres; optical fibres guide light by total internal reflection; radio reflects off the ionosphere. Waveguides confine waves in metal pipes.
X: A speaker produces 80 dB at 2 m. What level at 20 m, assuming spherical spreading only?
> Intensity falls by (20/2)^{2} = 100
> Level falls by 20 dB: 60 dB
!: Inverse-square spreading assumes a point source and no reflections; indoors or near large sources it doesn't hold.
Q: How does intensity fall with distance from a point source? | As 1/r^{2}.
Q: What is the SOFAR channel? | A layer in the ocean where sound speed is lowest, trapping and guiding low-frequency sound over huge distances.
M1: Moving three times farther from a point source reduces intensity by: | 9 | 3 | 27 | √3 | Inverse square.
M2: Why does distant thunder sound like a low rumble? | High frequencies are absorbed more over distance | Thunder is only low frequency | Sound speeds up | The ear adapts | Frequency-dependent attenuation.

## Phase and group velocity
S: The phase velocity is how fast individual wave crests move; the group velocity is how fast the envelope of a wave packet, and hence energy and information, moves. They differ whenever the wave speed depends on frequency.
H: Definitions
E: v_{p} = ω/k
E: v_{g} = dω/dk
- Non-dispersive (ω ∝ k): v_{g} = v_{p}.
- Normal dispersion: v_{g} < v_{p} (crests run forward through the packet).
- Anomalous dispersion: v_{g} > v_{p} or even negative.
H: Examples
- Deep water waves: ω = √(gk) ⇒ v_{g} = v_{p}/2. Watch a boat's wake: crests appear at the back of a group and vanish at the front.
- Light in glass: group index n_{g} = n − λ dn/dλ.
- Electron matter waves: v_{g} equals the particle's velocity; v_{p} = c^{2}/v exceeds c, harmlessly.
X: In a waveguide ω^{2} = ω_{c}^{2} + c^{2}k^{2}. Show v_{p}v_{g} = c^{2}.
> v_{p} = ω/k; v_{g} = c^{2}k/ω
> Product = c^{2}: v_{p} > c while v_{g} < c
!: Phase velocity can exceed c without breaking relativity; no information travels with the crests. Signal speed is bounded by c.
Q: What is group velocity? | dω/dk: the speed of the envelope of a wave packet, which carries energy.
Q: Why can phase velocity exceed c? | Crests carry no information; only the group (signal) velocity is limited.
M1: For deep-water waves, group velocity is: | Half the phase velocity | Equal to it | Twice it | Zero | ω ∝ √k.
M2: A medium is non-dispersive when: | ω is proportional to k | v_{g} = 0 | ω is constant | k is constant | All frequencies travel at the same speed.

## Superposition
S: When waves overlap in a linear medium, the total displacement at each point is the sum of the individual displacements. Waves pass through each other unchanged; superposition explains interference, standing waves, beats and Fourier analysis.
H: The principle
E: y_{total} = y_{1} + y_{2} + …
- Valid for linear systems: waves on strings at small amplitude, sound at normal levels, light in vacuum.
- Each wave continues afterwards as if the other had never been there.
H: Consequences
- **Interference**: fixed patterns of reinforcement and cancellation.
- **Standing waves**: two identical waves travelling in opposite directions.
- **Beats**: waves of slightly different frequency.
- **Fourier synthesis**: any waveform is a sum of sinusoids.
H: When it fails
P: In nonlinear media (very loud sound, intense laser light in crystals, large water waves), waves interact: they generate harmonics, mix frequencies (frequency doubling turns infrared lasers green) and can form shocks or solitons.
X: Two pulses, +3 cm and −2 cm, overlap on a string. Peak displacement where they coincide?
> +3 + (−2) = +1 cm
> After passing, each continues with its original shape
!: Superposition adds displacements (amplitudes), not intensities, for coherent waves.
Q: State the principle of superposition. | When waves overlap, the resultant displacement is the sum of the individual displacements.
Q: When does superposition fail? | In nonlinear media, typically at large amplitudes.
M1: Two waves of amplitude 4 cm meet in antiphase. The resultant amplitude is: | 0 | 8 cm | 4 cm | 16 cm | They cancel.
M2: Frequency doubling of laser light shows: | A nonlinear medium | Superposition | Diffraction | Polarisation | Nonlinear optics.

## Interference
S: Interference is the pattern of reinforcement and cancellation when coherent waves overlap. It's the signature of wave behaviour, and it measures wavelengths, distances and surface flatness to a fraction of a wavelength.
H: Conditions
- **Coherence**: constant phase relationship (same frequency, stable phase).
- Similar amplitudes give the clearest patterns.
- Path difference Δ sets the phase difference δ = 2πΔ/λ.
H: Young's double slit
E: x = λD/d :: fringe spacing (slit separation d, screen distance D)
E: d sin θ = nλ :: bright fringes
- Showed light is a wave (Young, 1801).
- With single photons or electrons, the pattern still builds up dot by dot.
H: Applications
- Interferometers (Michelson, Mach–Zehnder, LIGO).
- Thin-film colours (soap bubbles, anti-reflection coatings).
- Noise-cancelling headphones; radio antenna arrays steering beams.
X: Light through slits 0.5 mm apart gives fringes 1.2 mm apart on a screen 1.0 m away. Find λ.
> λ = xd/D = 1.2 × 10^{-3} × 5 × 10^{-4}/1.0 = 600 nm
!: Two separate light bulbs don't produce visible interference: they aren't coherent with each other.
Q: What is coherence? | A constant phase relationship between waves.
Q: What is the fringe spacing in Young's experiment? | λD/d.
M1: Increasing the slit separation in Young's experiment makes fringes: | Closer together | Further apart | Brighter | Disappear | x ∝ 1/d.
M2: Interference of single electrons shows: | Each electron behaves as a wave going through both slits | Electrons are classical particles | Electrons interact with each other | The experiment is faulty | Quantum superposition.

## Constructive and destructive interference
S: Waves interfere constructively where they arrive in phase (path difference a whole number of wavelengths) and destructively where they arrive in antiphase (an odd number of half wavelengths).
H: Conditions (sources in phase)
E: Δ = nλ :: constructive (maxima)
E: Δ = (n + ½)λ :: destructive (minima)
E: I = I_{1} + I_{2} + 2√(I_{1}I_{2}) cos δ :: resultant intensity
- Equal intensities: I ranges from 4I_{0} (constructive) to 0 (destructive). Energy isn't destroyed; it's redistributed.
H: Phase changes on reflection
- Reflection off a denser medium (higher n, or a fixed end) adds a phase shift of π (half a wavelength).
- Thin films: compare path difference 2nt plus any reflection phase shifts.
X: An anti-reflection coating (n = 1.38) on glass (n = 1.5) for 550 nm light. Minimum thickness?
> Both reflections have a π shift, so they cancel; need 2nt = λ/2
> t = 550/(4 × 1.38) = 100 nm
!: Destructive interference at one place always comes with constructive interference elsewhere; total energy is conserved.
Q: What path difference gives destructive interference for in-phase sources? | An odd number of half wavelengths.
Q: What phase change occurs on reflection from a denser medium? | π (half a wavelength).
M1: Two speakers in phase are 3.0 m and 3.5 m from you; λ = 1.0 m. You hear: | A quiet spot (destructive) | A loud spot | No sound change | Beats | Δ = 0.5λ.
M2: Two equal waves interfering constructively give intensity: | 4 times one wave's | 2 times | The same | Zero | Amplitude doubles, intensity ∝ A^{2}.

## Standing waves
S: A standing wave forms when two identical waves travel in opposite directions, usually a wave and its reflection. Some points (nodes) never move; others (antinodes) oscillate with maximum amplitude, and energy stays trapped between them.
H: Form
E: y = 2A sin kx cos ωt
- Nodes every λ/2; antinodes midway between.
- All points between adjacent nodes move in phase; across a node, in antiphase.
- No net energy transport.
H: On strings and pipes
E: f_{n} = nv/(2L) :: string fixed at both ends, or pipe open at both ends (n = 1, 2, 3…)
E: f_{n} = nv/(4L) :: pipe closed at one end (n = 1, 3, 5…)
H: Comparison with travelling waves
- Travelling: every point has the same amplitude; phase varies along the wave; energy moves.
- Standing: amplitude varies with position; phase is the same between nodes; energy stays.
X: Microwaves in an oven form standing waves with nodes 6 cm apart. Find f.
> λ/2 = 6 cm ⇒ λ = 12 cm
> f = 3 × 10^{8}/0.12 = 2.5 GHz (hence the turntable: food at nodes wouldn't heat)
!: The distance between adjacent nodes is λ/2, not λ.
Q: How far apart are adjacent nodes? | Half a wavelength.
Q: How does a standing wave differ from a travelling wave? | Its amplitude varies with position, points between nodes oscillate in phase, and it transfers no net energy.
M1: The fundamental of a 0.6 m string with v = 240 m s^{-1} is: | 200 Hz | 400 Hz | 100 Hz | 144 Hz | f = v/2L.
M2: Points on either side of a node oscillate: | In antiphase | In phase | Not at all | At different frequencies | sin kx changes sign at a node.

## Reflection and transmission
S: When a wave meets a boundary between two media, part is reflected and part transmitted. The fractions and phases depend on how different the media's impedances are.
H: On strings
E: r = (Z_{1} − Z_{2})/(Z_{1} + Z_{2}); t = 2Z_{1}/(Z_{1} + Z_{2}) :: amplitude coefficients, Z = √(Tμ)
- Fixed end (Z_{2} → ∞): inverted reflection (phase π).
- Free end (Z_{2} → 0): upright reflection.
- Matched impedance (Z_{1} = Z_{2}): no reflection.
H: Energy
E: R + T = 1, with R = r^{2} and T = (Z_{2}/Z_{1})t^{2}
H: Examples
- Ultrasound gel removes the air gap (huge impedance mismatch) between probe and skin.
- Transmission lines: mismatched loads cause reflections; terminators prevent echoes.
- Light: the Fresnel equations give ~4% reflection at each air–glass surface at normal incidence.
X: What fraction of light reflects at normal incidence from water (n = 1.33)?
> R = ((1.33 − 1)/(1.33 + 1))^{2} = 0.02 = 2%
!: Reflection depends on the contrast between media, not on either medium alone: matched media reflect nothing.
Q: When is a reflected pulse on a string inverted? | When it reflects from a fixed end or a denser (higher impedance) medium.
Q: Why is gel used in ultrasound scanning? | It removes air between probe and skin, reducing a large impedance mismatch that would reflect almost all the sound.
M1: A wave passes from a light string to a heavy string. The reflected pulse is: | Inverted | Upright | Absent | Doubled | Higher impedance.
M2: At normal incidence, about how much light reflects from one air–glass surface (n = 1.5)? | 4% | 50% | 0.4% | 96% | ((0.5)/(2.5))^{2}.

## Refraction
S: Refraction is the change in direction of a wave when it enters a medium where its speed is different, at an angle. Snell's law gives the new direction, and it explains lenses, rainbows, mirages and fibre optics.
H: Snell's law
E: n_{1} sin θ_{1} = n_{2} sin θ_{2}
E: n = c/v :: refractive index
E: sin θ_{1}/sin θ_{2} = v_{1}/v_{2} = λ_{1}/λ_{2}
- Entering a slower medium bends the wave towards the normal.
- Derivable from Huygens' principle or Fermat's principle of least time.
H: Total internal reflection
E: sin θ_{c} = n_{2}/n_{1} :: critical angle, going from higher to lower index
- Glass–air: 42°; water–air: 49°; diamond–air: 24° (why diamonds sparkle).
- Optical fibres, prisms in binoculars, endoscopes.
H: Other waves
P: Sound refracts in temperature gradients (sound carries further on cold evenings when air near the ground is cooler). Ocean waves refract as they slow in shallow water, so they arrive nearly parallel to the shore. Seismic waves curve through Earth's layers.
X: Light enters water (n = 1.33) at 50° from the normal. Find the refraction angle.
> sin θ_{2} = sin 50°/1.33 = 0.576 ⇒ θ_{2} = 35°
!: Angles in Snell's law are measured from the normal, not from the surface.
Q: State Snell's law. | n_{1} sin θ_{1} = n_{2} sin θ_{2}.
Q: When does total internal reflection occur? | When light goes from a higher to a lower index medium at an angle greater than the critical angle.
M1: The critical angle for glass (n = 1.5) to air is about: | 42° | 48° | 30° | 90° | sin^{-1}(1/1.5).
M2: Ocean waves approaching a beach turn to become: | Nearly parallel to the shore | Perpendicular to it | Unchanged | Faster | They slow in shallow water and refract.

## Diffraction
S: Diffraction is the spreading of waves when they pass through gaps or around obstacles. It's strongest when the gap is comparable to the wavelength, and it limits the resolution of every optical instrument.
H: Single slit
E: a sin θ = nλ :: minima (slit width a), n = ±1, ±2…
- Central maximum twice as wide as the others; width ∝ λ/a.
H: Diffraction grating
E: d sin θ = nλ :: bright maxima (very sharp with many slits)
- Resolving power λ/Δλ = nN (order × number of lines illuminated).
- Spectrometers, CD rainbow colours.
H: Resolution
E: θ_{min} ≈ 1.22λ/D :: Rayleigh criterion, circular aperture
- Larger telescopes and shorter wavelengths resolve finer detail; electron microscopes use tiny de Broglie wavelengths.
- X-ray diffraction from crystal lattices: Bragg's law 2d sin θ = nλ revealed DNA's helix and thousands of protein structures.
X: Can a 10 cm telescope resolve car headlights 1.5 m apart, 10 km away (λ = 550 nm)?
> θ_{min} = 1.22 × 5.5 × 10^{-7}/0.1 = 6.7 × 10^{-6} rad
> Separation angle = 1.5/10^{4} = 1.5 × 10^{-4} rad: easily resolved
!: You hear round corners but don't see round them because sound wavelengths (~1 m) match doorways while light's (~500 nm) are far smaller.
Q: When is diffraction most noticeable? | When the gap or obstacle size is comparable to the wavelength.
Q: State the Rayleigh criterion. | Two point sources are just resolved when θ ≈ 1.22λ/D.
M1: A grating with 500 lines per mm and 600 nm light gives a first order at: | 17.5° | 30° | 0.3° | 60° | d = 2 μm; sin θ = 0.3.
M2: Narrowing a single slit makes the central maximum: | Wider | Narrower | Brighter | Disappear | Width ∝ λ/a.

## Dispersion
S: Dispersion is the dependence of wave speed on frequency. It splits white light into colours, spreads pulses in optical fibres, and shapes water waves and seismic signals.
H: In optics
E: n(λ) ≈ A + B/λ^{2} :: Cauchy's formula for glass in the visible
- Normal dispersion: n higher for blue light, so blue bends more (prisms, rainbows).
- Abbe number measures dispersion; lens designers combine glasses (achromatic doublets) to cancel chromatic aberration.
H: In fibres
P: A short pulse contains many frequencies. Dispersion makes them travel at different speeds, so pulses spread and overlap, limiting data rates. Fibres operate near 1310 nm (zero dispersion) or use dispersion compensation; solitons can balance dispersion with nonlinearity.
H: Other waves
- Deep-water waves: long waves travel fastest (swell arrives before chop from a distant storm).
- Plasma: radio waves below the plasma frequency reflect (ionospheric reflection).
- Dispersed pulsar signals: low radio frequencies arrive later, measuring electrons along the line of sight.
X: Why is the rainbow's red on the outside?
> Red has a lower n in water, so it's deviated less inside the drop
> Red light emerges at ~42° from the anti-solar point, violet at ~40°
!: Dispersion isn't the same as diffraction or scattering; it's about speed varying with frequency.
Q: What causes a prism to split white light? | Dispersion: the refractive index varies with wavelength.
Q: Why does dispersion limit data rates in fibres? | Different frequency components travel at different speeds, spreading pulses.
M1: In glass, which colour travels slowest? | Violet | Red | Green | All equal | Highest n.
M2: Swell from a distant storm arrives as long waves first because: | Deep-water waves with longer λ travel faster | Short waves are absorbed | Wind speeds them | Tides | v ∝ √λ.

## Polarisation
S: Polarisation describes the direction of oscillation of a transverse wave. Light can be polarised by filters, reflection, scattering and certain crystals, and polarisation is used in sunglasses, screens, 3D cinema and stress analysis.
H: Types
- **Linear**: oscillation in one plane.
- **Circular/elliptical**: field rotates as the wave travels.
- **Unpolarised**: random, rapidly changing directions (sunlight, bulbs).
H: Producing polarised light
E: I = I_{0} cos^{2}θ :: Malus's law (through an analyser at angle θ)
E: tan θ_{B} = n_{2}/n_{1} :: Brewster's angle: reflected light fully polarised
- A polariser halves the intensity of unpolarised light.
- Scattering: sky light is partially polarised at 90° from the Sun (bees navigate by it).
- Birefringent crystals (calcite) split light into two polarisations; wave plates convert linear to circular.
H: Applications
- Polarising sunglasses block horizontally polarised glare from water and roads.
- LCD screens use polarisers and liquid crystals that rotate polarisation.
- Photoelasticity: stressed plastics become birefringent, revealing stress patterns.
X: Unpolarised light (I_{0}) passes through two polarisers at 60°. Final intensity?
> After the first: I_{0}/2
> After the second: (I_{0}/2) cos^{2}60° = I_{0}/8
!: Only transverse waves can be polarised; polarisation of light was key evidence that light is transverse.
Q: State Malus's law. | I = I_{0} cos^{2}θ.
Q: What is Brewster's angle? | The angle of incidence at which reflected light is completely polarised: tan θ_{B} = n_{2}/n_{1}.
M1: Two crossed polarisers transmit: | No light | Half | A quarter | All | cos^{2}90° = 0.
M2: Brewster's angle for glass (n = 1.5) is about: | 56° | 42° | 34° | 90° | tan^{-1}(1.5).

## Wave packets
S: A wave packet is a localised wave made by superposing many waves with a range of wavelengths. Its width and its spread in wavenumber are inversely related, which is the root of the quantum uncertainty principle.
H: Building a packet
E: ψ(x) = ∫A(k)e^{ikx}dk
E: Δx Δk ≳ 1 (and Δt Δω ≳ 1)
- A pure sine wave (single k) extends forever; a short pulse needs many k.
- The packet moves at the group velocity.
H: Spreading
P: In a dispersive medium the components travel at different speeds, so the packet spreads over time. A free quantum particle's packet spreads too: its width grows as Δx(t) ≈ √(Δx_{0}^{2} + (ħt/(2mΔx_{0}))^{2}), so the narrower the starting packet, the faster it spreads. An electron confined to 1 Å doubles its width in about 10^{-16} s.
H: Applications
- Ultrashort laser pulses (femtoseconds) need broad spectra (tens of nm).
- Radar and ultrasound trade pulse length (range resolution) against bandwidth.
- Quantum particles as wave packets with Δx Δp ≥ ħ/2.
X: A laser pulse lasts 10 fs. Estimate its frequency spread.
> Δf ≈ 1/Δt = 10^{14} Hz (order of magnitude)
> At 800 nm, f = 3.75 × 10^{14} Hz, so Δλ/λ = Δf/f ≈ 0.27: a spread of about 100 nm
!: A wave packet isn't a particle; it has a definite group velocity but no single wavelength.
Q: Why must a short pulse contain many frequencies? | Because Δt Δω ≳ 1: localising in time requires spreading in frequency.
Q: At what speed does a wave packet travel? | The group velocity.
M1: Making a wave packet narrower in space makes its range of wavenumbers: | Larger | Smaller | Zero | Unchanged | Δx Δk ≳ 1.
M2: The uncertainty principle Δx Δp ≥ ħ/2 follows from: | Fourier properties of wave packets with p = ħk | Measurement disturbance only | Classical mechanics | Relativity | It's a property of waves.

## Beats
S: Beats are the slow periodic swelling and fading of loudness when two waves of slightly different frequencies combine. The beat frequency equals the difference of the two frequencies.
H: The result
E: y = 2A cos(2π(Δf/2)t) sin(2πf̄t)
E: f_{beat} = |f_{1} − f_{2}|
- The carrier oscillates at the average frequency f̄; the envelope at Δf/2, giving loudness maxima at Δf.
H: Uses
- Tuning instruments: beats vanish when in tune.
- Measuring an unknown frequency against a known one.
- Optical heterodyne detection and laser frequency combs.
- Doppler ultrasound: the beat between sent and echoed waves gives blood velocity.
X: A piano string beats 2 times per second with a 440 Hz fork. Adding a little tape (mass) to the fork raises the beat rate to 3 per second. What's the string's frequency?
> String is 438 or 442 Hz
> Mass lowers the fork's frequency; beats increased, so the string is below: 438 Hz
!: Beats only arise with nearly equal frequencies; with large differences you hear two separate tones (or a combination tone).
Q: What is the beat frequency? | The difference between the two frequencies.
Q: Why do beats disappear when two strings are in tune? | Their frequency difference is zero.
M1: Two sources at 500 Hz and 506 Hz produce: | 6 beats per second | 3 beats per second | 1006 beats | 503 beats | Difference.
M2: The perceived pitch during beating is: | The average of the two frequencies | The difference | The sum | The lower frequency | The carrier is f̄.

## Boundary conditions
S: Boundary conditions specify what a wave must do at the edges of its medium: fixed, free, or matched to another medium. They determine reflection, the allowed standing-wave patterns, and therefore the resonant frequencies.
H: Types
- **Fixed end** (string clamped, closed pipe end for displacement): y = 0 ⇒ node.
- **Free end** (string ring on a frictionless rod, open pipe end for displacement): ∂y/∂x = 0 ⇒ antinode.
- **Interface**: displacement and force (or tangential E and H fields for light) must be continuous.
- **Periodic**: ψ(x + L) = ψ(x) for rings and crystals.
H: Consequences
- Fixed–fixed and free–free: λ_{n} = 2L/n (all harmonics).
- Fixed–free: λ_{n} = 4L/n for odd n (odd harmonics only).
- Open pipes have a small end correction: effective length L + 0.6r per open end.
H: Electromagnetism
P: At a perfect conductor the tangential electric field must vanish. That's why microwave cavities and waveguides only allow certain modes, and why a metal box shields its contents.
X: A pipe 0.30 m long, closed at one end. Lowest two resonances (v = 343 m s^{-1})?
> f_{1} = v/(4L) = 286 Hz
> Next: 3f_{1} = 858 Hz (no even harmonics)
!: For sound in pipes, a closed end is a displacement node but a pressure antinode. Be clear which quantity you mean.
Q: What boundary condition does an open pipe end impose on displacement? | An antinode (approximately, with an end correction).
Q: Why does a pipe closed at one end have only odd harmonics? | A node at one end and an antinode at the other fit only odd quarter-wavelengths.
M1: A string fixed at both ends supports wavelengths: | 2L/n | 4L/n odd n | L/n | 4L | Nodes at both ends.
M2: At the surface of a perfect conductor, the tangential electric field is: | Zero | Maximum | Equal to the normal field | Undefined | Charges move to cancel it.

## Resonant modes
S: A bounded system can only sustain standing waves whose shapes fit its boundary conditions: its resonant modes. Each mode has a particular frequency, and the set of them gives instruments their sound, cavities their colours and atoms their energy levels.
H: In 1D
E: f_{n} = nv/(2L) :: string or open pipe
- The lowest is the fundamental; higher modes are harmonics (if integer multiples) or overtones.
H: In 2D and 3D
- Rectangular membrane: f_{mn} = (v/2)√((m/a)^{2} + (n/b)^{2}).
- Circular drums: Bessel-function modes; frequencies aren't harmonic, so drums have less definite pitch.
- 3D rooms: modes at f = (c/2)√((l/L_{x})^{2} + (m/L_{y})^{2} + (n/L_{z})^{2}); small rooms have uneven bass.
- Laser cavities: longitudinal modes separated by c/(2L).
H: Quantum analogy
P: An electron confined in an atom or box has allowed energies for the same reason: only certain standing matter waves fit. Energy levels are the resonant modes of the electron's wave.
X: A 1.5 m laser cavity: what is the frequency spacing between modes?
> Δf = c/(2L) = 3 × 10^{8}/3 = 100 MHz
!: Exciting a system at a non-resonant frequency gives only a small, forced response; strong response needs a mode near the drive.
Q: Why do drums have less definite pitch than strings? | Their mode frequencies aren't integer multiples of a fundamental.
Q: What is the spacing between longitudinal modes in a laser cavity? | c/(2L).
M1: The second harmonic of a 100 Hz fundamental string is: | 200 Hz | 150 Hz | 50 Hz | 400 Hz | 2f_{1}.
M2: Why do small rooms have uneven bass? | Low-frequency room modes are widely spaced | Bass is absorbed | Walls are too hard | Speakers can't produce bass | Few modes, separated in frequency.

## Coupled waves
S: When two wave systems are linked, energy can pass between them. Coupled waves explain directional couplers in optics, energy exchange between pendulum chains, and mode conversion in seismology, plasmas and the ocean.
H: Coupled-mode theory
E: da_{1}/dz = iκa_{2}, da_{2}/dz = iκa_{1} :: two identical coupled modes
- Power transfers fully from one guide to the other over the coupling length L_{c} = π/(2κ), then back.
- If the two modes have different propagation constants (phase mismatch), transfer is incomplete.
H: Examples
- Optical directional couplers and fibre splitters.
- Phase-matched frequency conversion in nonlinear crystals.
- Avoided crossings: coupled modes' dispersion curves repel instead of crossing (polaritons, where light couples to matter).
- Mode conversion: sound in ducts, waves at coastlines, plasma waves in fusion heating.
X: Two identical fibres have coupling κ = 100 m^{-1}. What length splits power 50:50?
> Power in guide 2: sin^{2}(κz) = 0.5
> z = π/(4κ) = 7.9 mm
!: Coupling only transfers energy efficiently when the waves are phase-matched (similar wave speeds).
Q: What is an avoided crossing? | When coupled modes' frequencies approach, they repel and exchange character instead of crossing.
Q: What condition maximises energy transfer between coupled waves? | Phase matching (equal propagation constants).
M1: A 3 dB fibre coupler: | Splits power equally | Doubles power | Blocks light | Reverses light | 3 dB = half.
M2: Polaritons are: | Coupled states of light and matter excitations | Particles of sound | Electrons | Polarised photons only | Avoided crossing between photon and, e.g., phonon or exciton modes.

## Nonlinear waves
S: In nonlinear media, a wave's speed depends on its amplitude, so waves steepen, break, generate harmonics and interact with each other. Ocean waves breaking on a beach, sonic booms and frequency-doubling lasers are all nonlinear wave effects.
H: Steepening
P: If larger amplitudes travel faster, the crest catches up with the trough ahead and the wave steepens. Without dissipation it would overturn; with dissipation it forms a shock. Loud sound, tidal bores and waves running onto a beach all steepen this way.
H: Key equations
E: ∂u/∂t + u ∂u/∂x = 0 :: inviscid Burgers' equation: steepening
E: ∂u/∂t + 6u ∂u/∂x + ∂^{3}u/∂x^{3} = 0 :: Korteweg–de Vries: steepening balanced by dispersion
E: i∂ψ/∂t + ∂^{2}ψ/∂x^{2} + |ψ|^{2}ψ = 0 :: nonlinear Schrödinger: optics, deep water
H: Effects
- Harmonic generation and frequency mixing (nonlinear optics).
- Modulational instability: uniform wave trains break into groups; possibly rogue waves at sea.
- Self-focusing of intense laser beams.
X: Why do waves break on a beach?
> In shallow water speed ∝ √(depth); the crest is deeper than the trough, so it moves faster
> The crest overtakes the front of the wave and spills or plunges over
!: Linear theory works only for small amplitudes; extreme events like rogue waves need nonlinear models.
Q: Why do large-amplitude waves steepen? | Higher-amplitude parts travel faster and catch up with lower parts.
Q: What does the KdV equation balance? | Nonlinear steepening against dispersion.
M1: Second-harmonic generation requires: | A nonlinear medium | A vacuum | Low intensity | Linear superposition | χ^{(2)} nonlinearity.
M2: Rogue waves may arise from: | Modulational instability | Linear superposition only | Tides | Earthquakes only | Nonlinear focusing of energy.

## Solitons
S: A soliton is a solitary wave that keeps its shape while travelling at constant speed, because nonlinear steepening exactly balances dispersive spreading. Solitons even pass through each other and emerge intact.
H: History
P: In 1834 John Scott Russell followed a smooth, rounded heap of water that travelled miles along the Union Canal without changing shape. Korteweg and de Vries explained it in 1895; the name "soliton" came in 1965, when Zabusky and Kruskal found such waves collide like particles.
H: KdV soliton
E: u(x, t) = (c/2) sech^{2}[(√c/2)(x − ct)]
- Taller solitons are narrower and faster.
- After collisions, solitons emerge with only a phase shift.
H: Where they appear
- Shallow water waves; tidal bores; internal waves in the ocean (visible from space near Gibraltar).
- Optical fibre solitons for long-distance communication.
- Nerve impulses (in some models), DNA dynamics, Bose–Einstein condensates.
- Topological solitons in field theory: kinks, vortices, magnetic skyrmions.
X: A KdV soliton has speed c = 4. How do its amplitude and width compare with a c = 1 soliton?
> Amplitude ∝ c: 4 times taller
> Width ∝ 1/√c: half as wide
!: Not every solitary wave is a soliton in the strict mathematical sense; true solitons survive collisions unchanged.
Q: What balance creates a soliton? | Nonlinear steepening balanced by dispersion.
Q: What happens when two solitons collide? | They pass through each other and emerge with their shapes and speeds unchanged, apart from a phase shift.
M1: For KdV solitons, taller solitons travel: | Faster | Slower | At the same speed | Backward | Speed ∝ amplitude.
M2: Who first observed a soliton? | John Scott Russell | Newton | Huygens | Fourier | On the Union Canal, 1834.

## Wave energy and intensity
S: Waves carry energy at a rate set by their amplitude, frequency and medium. Intensity, the power per unit area, grows with the square of amplitude, which is why doubling the amplitude of a sound quadruples its power.
H: Formulas
E: I = P/A (W m^{-2})
E: I ∝ A^{2}ω^{2} :: mechanical waves
E: P = ½μvω^{2}A^{2} :: power along a string
E: I = p_{0}^{2}/(2ρv) :: sound, pressure amplitude p_{0}
E: I = ½cε_{0}E_{0}^{2} :: EM wave
H: Examples
- Sunlight at Earth: ~1360 W m^{-2} above the atmosphere (solar constant).
- Threshold of hearing 10^{-12} W m^{-2}; pain ~1 W m^{-2}.
- Ocean waves: power per metre of wave front ∝ H^{2}T (tens of kW m^{-1} in the Atlantic).
H: Momentum and pressure
P: Waves carry momentum too: light exerts radiation pressure I/c (absorbed) or 2I/c (reflected). Solar sails use it; acoustic radiation pressure levitates small objects.
X: Find the electric field amplitude of sunlight at Earth (I = 1360 W m^{-2}).
> E_{0} = √(2I/(cε_{0})) = √(2720/(3 × 10^{8} × 8.85 × 10^{-12})) ≈ 1010 V m^{-1}
!: Intensity scales with amplitude squared, not amplitude: halving amplitude quarters intensity.
Q: How does wave intensity depend on amplitude? | I ∝ A^{2}.
Q: What radiation pressure does light exert on a perfect absorber? | I/c.
M1: Tripling a wave's amplitude increases its intensity by: | 9 | 3 | 27 | √3 | Square.
M2: The solar constant is about: | 1360 W m^{-2} | 1 W m^{-2} | 13 600 W m^{-2} | 136 W m^{-2} | Above the atmosphere.

## Huygens' principle
S: Huygens' principle says every point on a wavefront acts as a source of secondary wavelets; the new wavefront is the envelope of these wavelets. It predicts reflection, refraction and, with Fresnel's addition of interference, diffraction.
H: The construction
- Draw wavelets of radius vΔt from points on the current wavefront.
- The forward tangent envelope is the wavefront at t + Δt.
- Fresnel added that wavelets interfere, and that backward wavelets cancel (with an obliquity factor).
H: Deriving the laws
- **Reflection**: wavelets from successive points on the surface make the angle of reflection equal the angle of incidence.
- **Refraction**: wavelets in the slower medium are smaller, tilting the wavefront: sin θ_{1}/sin θ_{2} = v_{1}/v_{2}.
- **Diffraction**: at a slit, only part of the wavefront contributes, and wavelets spread into the shadow.
H: Fresnel zones
P: Dividing a wavefront into zones whose distances to a point differ by λ/2 explains the Poisson–Arago spot: a bright spot at the centre of a circular obstacle's shadow, a startling prediction confirmed in 1818 that helped convince physicists light is a wave.
X: Use Huygens' construction to explain why a straight wave bends round a harbour wall.
> Points at the end of the wall act as sources
> Their wavelets spread into the sheltered region: the wave diffracts round the end
!: Huygens' principle is a geometric tool; the full justification comes from the wave equation (Kirchhoff's diffraction formula).
Q: State Huygens' principle. | Every point on a wavefront acts as a source of secondary wavelets; their envelope forms the new wavefront.
Q: What is the Poisson–Arago spot? | A bright spot at the centre of the shadow of a circular obstacle, predicted by wave theory.
M1: Huygens–Fresnel theory explains: | Diffraction | Photoelectric effect | Radioactivity | Nuclear fission | Interference of wavelets.
M2: Huygens' construction derives Snell's law from: | Different wave speeds in the two media | Particle collisions | Gravity | Polarisation | Wavelet radii differ.

## Fourier decomposition of waves
S: Any wave can be written as a sum (or integral) of sinusoidal waves of different frequencies, amplitudes and phases. Treating each component separately is often the easiest way to understand how complex waves travel, disperse and interact with systems.
H: Periodic and non-periodic
E: f(x) = Σ c_{n}e^{inkx} :: periodic waveform (Fourier series)
E: f(x) = (1/2π)∫F(k)e^{ikx}dk :: arbitrary shape (Fourier transform)
- In a linear system, each component evolves independently: e^{i(kx − ω(k)t)}.
- Recombining at a later time gives the evolved wave (including dispersion).
H: Examples
- Square wave: fundamental plus odd harmonics with amplitudes 1/n.
- Sawtooth: all harmonics, amplitudes 1/n.
- A struck string's shape decomposes into its normal modes; where you pluck changes which harmonics are strong (plucking at the middle suppresses even harmonics).
H: Spectral analysis
- Spectrum analysers and FFTs show which frequencies are present.
- Diffraction patterns are Fourier transforms of apertures.
- Spectroscopy reads atomic and molecular structure from frequency components.
X: A guitar string plucked at its midpoint. Which harmonics are missing?
> Even harmonics have a node at the midpoint
> Plucking there can't excite them: the sound has only odd harmonics, giving a hollow tone
!: A Fourier spectrum shows which frequencies are present over the whole record; it hides when they occur. Use a spectrogram for changing signals.
Q: Why does plucking a string at its middle remove even harmonics? | Even harmonics have a node at the midpoint, so they can't be excited there.
Q: How does Fourier decomposition help with dispersion? | Each frequency component travels at its own speed; recombining them shows how the wave changes shape.
M1: A sawtooth wave contains: | All harmonics | Only odd harmonics | Only the fundamental | No harmonics | Amplitudes 1/n for all n.
M2: The far-field diffraction pattern of an aperture is: | Its Fourier transform | Its image | A uniform patch | Its derivative | Fraunhofer diffraction.
`;
