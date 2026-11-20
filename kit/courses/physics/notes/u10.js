// Unit 10: Waves and Wave Motion. Format: kit/course/notes.js
export default `
## Wave properties
S: A wave is a travelling disturbance that carries energy and momentum from place to place without carrying the medium along with it. Every wave, from ripples to light to matter waves, shares the same core properties.
O: Define amplitude, wavelength, frequency, period and phase
O: Use v = fλ and T = 1/f to relate the properties of a wave
O: Explain what a wave transfers, and distinguish mechanical from electromagnetic waves
PRE: Amplitude, frequency, period and phase
LV: GCSE and A level · Foundation
H: The core properties
- **Amplitude**: maximum displacement from equilibrium.
- **Wavelength** λ: distance between successive points in phase, such as crest to crest.
- **Frequency** f: oscillations per second at a point; **period** T = 1/f.
- **Speed** v = fλ, set by the medium (for mechanical waves) or by the vacuum (light).
- **Phase**: where in its cycle a point is, as an angle; points λ/2 apart are in antiphase.
H: What all waves do
- Reflect, refract, diffract, interfere and superpose.
- Transverse waves can also be polarised.
- Carry energy at a rate proportional to amplitude squared.
H: Mechanical vs electromagnetic
P: Mechanical waves (sound, water, seismic, waves on strings) need a medium whose elastic and inertial properties set their speed. Electromagnetic waves are self-sustaining oscillations of electric and magnetic fields that cross a vacuum at c. Quantum matter waves describe probability amplitudes.
X: A stadium "Mexican wave" travels round but nobody moves sideways. What's travelling?
> Each person stands and sits: a local oscillation
> The disturbance (pattern) moves around; the people (medium) don't
X: A wave has period 0.02 s and wavelength 3.0 m. Find f and v.
> f = 1/T = 1/0.02 = 50 Hz
> v = fλ = 50 × 3.0 = 150 m s^{-1}
K: A wave transfers energy, momentum and information; the medium only oscillates about fixed positions.
!: Particles of the medium oscillate about fixed points; only energy and the pattern travel.
T: Wavelength | The distance between two successive points oscillating in phase, such as crest to crest
T: Frequency | The number of complete oscillations per second at a point, in hertz; f = 1/T
T: Phase | The stage a point has reached in its cycle of oscillation, measured as an angle
SUM: Amplitude, wavelength, frequency, period and phase describe every wave; v = fλ links them.
SUM: Waves move energy and pattern, not matter; mechanical waves need a medium, EM waves don't.
EV: established | Waves transfer energy and momentum while the particles of the medium only oscillate about fixed positions
SRC: OpenStax, University Physics Volume 1, section 16.1 "Traveling Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
SRC: AQA, A-level Physics specification (7408), section 3.3.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What does a wave transfer? | Energy and momentum (and information), not the medium itself.
Q: What sets the speed of a mechanical wave? | The properties of the medium (elastic restoring force and inertia).
M1@3: Which wave can travel through a vacuum? | Light | Sound | Seismic P-wave | Water wave | EM waves are oscillating electric and magnetic fields and need no medium; sound, seismic and water waves all do.
M2@2,3: Which property of a wave is set by the source rather than the medium? | Frequency | Speed | Wavelength | Both speed and wavelength | The source fixes how often the medium oscillates, so f stays constant across boundaries while v and λ change.
M3@1,2: The nearest two points oscillating in antiphase on a 20 Hz wave are 0.6 m apart. What is the wave speed? | 24 m s^{-1} | 12 m s^{-1} | 6 m s^{-1} | 48 m s^{-1} | Nearest antiphase points are half a wavelength apart, so λ = 1.2 m and v = fλ = 20 × 1.2 = 24 m s^{-1}.
NUM1@2: A wave has a period of 0.025 s. What is its frequency? | 40 | 0 | Hz | Frequency is the reciprocal of the period: f = 1/T = 1/0.025 s = 40 Hz.
TF1@3: In a water wave, the water itself travels with the wave from the source to the shore. | false | Each bit of water moves in a small loop about a fixed position; only the energy and the wave pattern travel to the shore.
SA2@1,3: Using a wave on a rope as your example, explain what it means to say a wave transfers energy but not matter. | Each section of rope moves up and down about its rest position and returns there; the rope does not move along. The disturbance passes from section to section because each pulls on the next, so energy travels along the rope at the wave speed. | Each section oscillates about a fixed equilibrium position ; No net movement of rope along the direction of travel ; Neighbouring sections exert forces on each other, passing the disturbance on ; Energy (and the waveform) moves at the wave speed

## Transverse and longitudinal waves
S: In a transverse wave the oscillation is perpendicular to the direction of travel; in a longitudinal wave it's along it, forming compressions and rarefactions. Some waves are a mix of both.
O: Distinguish transverse and longitudinal waves and give examples of each
O: Explain why only transverse waves can be polarised and why fluids carry only longitudinal bulk waves
O: Read wavelength and frequency from a longitudinal wave's compressions
PRE: Wave properties
LV: GCSE and A level · Foundation
H: Examples
- **Transverse**: waves on strings, EM waves, S-waves, ripples on a stretched membrane.
- **Longitudinal**: sound in air, P-waves, compression waves on a slinky, ultrasound in tissue.
- **Mixed**: water surface waves (particles move in circles or ellipses), Rayleigh seismic waves.
H: Key differences
- Only transverse waves can be polarised.
- Fluids support only longitudinal bulk waves (no shear stiffness); solids support both. This is why S-waves don't cross Earth's liquid outer core.
- A displacement–position graph of a longitudinal wave looks like a transverse wave, but the displacement it plots is along the direction of travel.
P: The type of wave a medium carries depends on which deformations it resists. Air resists compression but not shear, so sound in air is longitudinal; a taut string resists sideways bending through its tension, so it carries transverse waves.
X: A slinky shows compressions 30 cm apart, passing 4 per second. Find λ, f and v.
> λ = 0.30 m (compression to compression), f = 4 Hz
> v = fλ = 1.2 m s^{-1}
K: Transverse: oscillation perpendicular to travel. Longitudinal: oscillation parallel to travel, with compressions and rarefactions.
!: Don't confuse a graph of displacement against position with a picture of the wave. For sound, the displacement peaks are not where the pressure is highest: pressure peaks are 90° out of phase with displacement.
T: Compression | A region of a longitudinal wave where the particles are closer together than normal, so the pressure is higher
T: Rarefaction | A region of a longitudinal wave where the particles are further apart than normal, so the pressure is lower
T: Polarisation | Restriction of a transverse wave's oscillations to a single plane
SUM: Transverse waves oscillate across the direction of travel; longitudinal waves along it.
SUM: Only transverse waves can be polarised; fluids carry only longitudinal bulk waves.
EV: established | Seismic S-waves are transverse and cannot travel through liquids, which is the evidence that Earth's outer core is liquid
SRC: OpenStax, University Physics Volume 1, section 16.1 "Traveling Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
SRC: AQA, A-level Physics specification (7408), section 3.3.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is a longitudinal wave? | A wave in which the oscillations are parallel to the direction of energy transfer.
Q: Why can't sound waves be polarised? | They're longitudinal: there's only one direction of oscillation.
M1@1: Which waves are transverse? | Light waves | Sound in air | P-waves | Ultrasound in water | The electric and magnetic fields of EM waves oscillate perpendicular to the direction of travel; the other three are longitudinal.
M2@1: Water surface particles move in: | Circles or ellipses | Straight lines vertically | Straight lines horizontally | No motion | Surface water waves are a mix of transverse and longitudinal motion, so each particle traces a loop.
M3@2: Seismic stations on the far side of the Earth from an earthquake detect P-waves but no S-waves. What does this show? | Part of the Earth's interior is liquid, which can't carry shear waves | S-waves travel too slowly to arrive | The crust absorbs all transverse waves | P-waves cancel the S-waves by interference | S-waves are transverse and need shear stiffness; their shadow zone shows the outer core is liquid.
TF1@2: A longitudinal wave can be polarised by passing it through a narrow slit. | false | Polarising selects one plane of oscillation; a longitudinal wave oscillates only along its direction of travel, so there is nothing to select.
NUM2@3: Compressions on a slinky are 0.25 m apart and the wave travels at 1.5 m s^{-1}. What is the frequency? | 6 | 0 | Hz | The compression spacing is the wavelength, so f = v/λ = 1.5/0.25 = 6 Hz.
SA2@1,2: Describe the difference between transverse and longitudinal waves, and explain how polarisation can tell them apart. | In a transverse wave the particles or fields oscillate at right angles to the direction of energy transfer; in a longitudinal wave they oscillate along it, forming compressions and rarefactions. A polariser passes only oscillations in one plane: rotating it changes the transmitted intensity of a transverse wave but has no effect on a longitudinal wave. | Transverse: oscillation perpendicular to energy transfer ; Longitudinal: oscillation parallel, with compressions and rarefactions ; Polariser transmits only one plane of oscillation ; Only transverse waves show a change when the polariser is rotated

## Wavelength, frequency, period and speed
S: For any periodic wave, the speed equals frequency times wavelength. Frequency is set by the source; speed by the medium; so wavelength adjusts when a wave enters a new medium.
O: Use v = fλ = λ/T, and the angular forms ω = 2πf and k = 2π/λ
O: Predict how speed and wavelength change when a wave crosses into a new medium
O: Recall typical speeds, frequencies and wavelengths for sound, light and radio
PRE: Wave properties
LV: GCSE and A level · Application
H: The wave equation
E: v = fλ = λ/T = ω/k
E: k = 2π/λ :: wavenumber
E: ω = 2πf :: angular frequency
P: In one period the wave moves forward by one wavelength, so v = λ/T = fλ.
H: Typical values
- Sound in air: 343 m s^{-1} at 20 °C; middle C (262 Hz) has λ = 1.3 m.
- Visible light: 400–700 nm, f ≈ 4.3–7.5 × 10^{14} Hz.
- FM radio: ~100 MHz, λ ≈ 3 m. Wi-Fi: 2.4 GHz, λ ≈ 12.5 cm.
- Ocean swell: λ ~ 100 m, T ~ 8 s.
X: Light (λ = 600 nm in air) enters glass with n = 1.5. Find its frequency and new wavelength.
> f = c/λ = 3 × 10^{8}/6 × 10^{-7} = 5 × 10^{14} Hz (unchanged)
> v = c/1.5 = 2 × 10^{8} m s^{-1}; λ = v/f = 400 nm
K: At a boundary frequency stays fixed; speed and wavelength change together, in proportion.
!: Frequency doesn't change at a boundary; wavelength and speed do. The colour we see depends on frequency.
P: **Investigate with the lab.** Change the tension and mass per metre of the string and watch the wave speed change. Then check that v = fλ for the standing wave you make.
IX: waves
T: Wavenumber | k = 2π/λ, the number of radians of phase per metre along the wave
T: Angular frequency | ω = 2πf, the rate of change of phase with time in radians per second
SUM: v = fλ for every periodic wave; ω = 2πf and k = 2π/λ give v = ω/k.
SUM: Crossing a boundary changes v and λ but never f.
EV: established | The speed of a periodic wave equals its frequency multiplied by its wavelength
SRC: OpenStax, University Physics Volume 1, section 16.2 "Mathematics of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
SRC: AQA, A-level Physics specification (7408), section 3.3.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What happens to frequency when a wave enters a new medium? | It stays the same.
Q: What is the wavenumber? | k = 2π/λ, radians per metre.
M1@1: A wave with f = 50 Hz and λ = 4 m has speed: | 200 m s^{-1} | 12.5 m s^{-1} | 54 m s^{-1} | 0.08 m s^{-1} | v = fλ = 50 Hz × 4 m = 200 m s^{-1}; dividing or adding the two numbers gives the distractors.
M2@2: Sound at 1000 Hz moves from air (343 m s^{-1}) into water (1480 m s^{-1}). Its wavelength: | Increases to 1.48 m | Decreases to 0.23 m | Stays at 0.34 m | Becomes zero | The frequency stays 1000 Hz, so λ = v/f rises from 0.343 m in air to 1.48 m in water.
M2@1: A wave has frequency 50 Hz and wavelength 0.4 m. What is its speed? | 20 m/s | 125 m/s | 0.008 m/s | 50.4 m/s | v = fλ = 50 × 0.4 = 20 m/s; dividing either way gives the wrong options.
M3@1,2: A wave on a string is y = 0.01 sin(6.0x − 1200t) in SI units. It passes onto a second string where its speed halves. What is its wavelength there? | 0.52 m | 1.05 m | 2.1 m | 0.26 m | On the first string λ = 2π/k = 1.05 m. Frequency is unchanged, so halving v halves λ to 0.52 m.
NUM2@3: An FM radio station broadcasts at 100 MHz. What is the wavelength in metres? (c = 3.0 × 10^{8} m s^{-1}) | 3 | 0.05 | m | λ = c/f = 3.0 × 10^{8}/1.0 × 10^{8} = 3.0 m, which is why FM aerials are about a metre long.
TF1@2: When light passes from air into glass, its frequency falls because it slows down. | false | Frequency is fixed by the source and is unchanged at the boundary; the speed and wavelength both fall by the factor n.
SA2@1,2: Explain why the frequency of a wave stays the same when it passes into a new medium, and what happens to its wavelength if it slows down. | The boundary oscillates at the rate the incoming wave drives it, and that oscillation is the source of the transmitted wave, so the frequency must match on both sides (otherwise crests would pile up or be lost). Since v = fλ with f fixed, a slower wave has a proportionally shorter wavelength. | Boundary is driven at the incident frequency ; Crests can't accumulate or vanish at the boundary ; v = fλ with f constant ; Wavelength falls in proportion to speed

## Wave equations
S: The one-dimensional wave equation says the acceleration of each bit of medium is proportional to the curvature of the wave there. Any function of (x − vt) solves it, so shapes travel unchanged at speed v.
O: State the one-dimensional wave equation and its general solution
O: Read amplitude, wavenumber, angular frequency, speed and direction from y = A sin(kx − ωt + φ)
O: Calculate wave speeds from v = √(T/μ) and related results
PRE: Partial differential equations
LV: Year 1 · Application
H: The equation
E: ∂^{2}y/∂t^{2} = v^{2} ∂^{2}y/∂x^{2}
E: y = f(x − vt) + g(x + vt) :: d'Alembert's general solution
E: y = A sin(kx − ωt + φ) :: harmonic travelling wave (right-moving), speed ω/k
H: Derivations
- **String**: Newton's second law on a small segment gives v = √(T/μ) (tension / mass per length).
- **Sound**: gives v = √(K/ρ) (bulk modulus / density).
- **EM waves**: Maxwell's equations give v = 1/√(μ_{0}ε_{0}) = c.
P: In each case the speed is √(stiffness/inertia): a stiffer restoring force speeds the wave; more inertia slows it.
H: In 3D
E: ∂^{2}ψ/∂t^{2} = v^{2}∇^{2}ψ
- Plane waves: e^{i(k·r − ωt)}. Spherical waves: (A/r) sin(kr − ωt), amplitude ∝ 1/r.
X: A guitar string has T = 70 N and μ = 0.5 g m^{-1}. Find the wave speed.
> μ = 5 × 10^{-4} kg m^{-1}
> v = √(70/5 × 10^{-4}) = √(1.4 × 10^{5}) = 374 m s^{-1}
K: Any shape f(x − vt) moves to the right at speed v without changing; the wave equation is linear, so solutions add.
!: kx − ωt moves right; kx + ωt moves left. Sign errors reverse the direction of travel.
T: Wave equation | The partial differential equation ∂^{2}y/∂t^{2} = v^{2}∂^{2}y/∂x^{2} obeyed by small disturbances in a linear, non-dispersive medium
T: Linear mass density | μ, the mass per unit length of a string, in kg m^{-1}
SUM: The wave equation relates acceleration to curvature; its solutions are any shapes moving at ±v.
SUM: For a harmonic wave, v = ω/k; for a string, v = √(T/μ).
EV: established | Small transverse waves on a taut string obey the linear wave equation with speed √(T/μ)
SRC: OpenStax, University Physics Volume 1, section 16.2 "Mathematics of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
SRC: OpenStax, University Physics Volume 1, section 16.3 "Wave Speed on a Stretched String" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-3-wave-speed-on-a-stretched-string
Q: What is the speed of a wave on a string? | v = √(T/μ).
Q: What does d'Alembert's solution show? | Any shape travelling unchanged in either direction at speed v solves the wave equation.
M1@2: y = 0.02 sin(4x − 200t) travels at: | 50 m s^{-1} | 200 m s^{-1} | 800 m s^{-1} | 4 m s^{-1} | The speed is ω/k = 200/4 = 50 m s^{-1}; the coefficients alone are ω and k, not the speed.
M2@3: Quadrupling a string's tension changes the wave speed by: | ×2 | ×4 | ×16 | ×1/2 | v = √(T/μ), so the speed scales as the square root of tension: √4 = 2.
M3@2: Which wave travels in the negative x direction with speed 25 m s^{-1}? | y = A sin(2x + 50t) | y = A sin(2x − 50t) | y = A sin(50x + 2t) | y = A sin(25x − t) | A plus sign between kx and ωt means leftward travel, and ω/k = 50/2 = 25 m s^{-1}.
NUM2@3: A string has mass per unit length 0.01 kg m^{-1} and tension 100 N. What is the wave speed? | 100 | 0 | m s^{-1} | v = √(T/μ) = √(100/0.01) = √10 000 = 100 m s^{-1}.
TF1@1: Any function of (x − vt), whatever its shape, is a solution of the one-dimensional wave equation. | true | Substituting y = f(x − vt) gives ∂^{2}y/∂t^{2} = v^{2}f'' and ∂^{2}y/∂x^{2} = f'', so the equation holds for any twice-differentiable f.
SA3@1,3: Explain, with reference to the forces on a small segment, why waves travel faster on a string under higher tension and slower on a heavier string. | A curved segment feels a net restoring force from the tension at its two ends, proportional to T and to the curvature. Its acceleration is that force divided by its mass μ dx. Larger T gives a larger restoring acceleration for the same shape, so the disturbance is passed on faster; larger μ gives more inertia and smaller acceleration. The result is v = √(T/μ). | Net force on a curved segment comes from tension at its ends ; Force proportional to tension times curvature ; Acceleration = force / (μ dx) ; Hence v^{2} = T/μ: stiffness over inertia

## Wave propagation
S: As waves travel they spread out, lose energy to the medium, and may change speed and shape. Understanding propagation explains why sound fades, why radio reaches round the Earth, and why earthquakes are felt far away.
O: Apply inverse-square and cylindrical spreading to intensity and decibel levels
O: Describe exponential attenuation and its frequency dependence
O: Explain how waveguides and low-speed channels carry waves over long distances
PRE: Wavelength, frequency, period and speed
LV: A level · Application
H: Spreading
E: I ∝ 1/r^{2} :: spherical waves (point source in 3D)
E: I ∝ 1/r :: cylindrical waves (line source)
- Plane waves don't spread geometrically.
- Each tenfold fall in intensity lowers the sound level by 10 dB.
H: Attenuation
E: I = I_{0}e^{−αx} :: absorption, α the attenuation coefficient
- High frequencies are usually absorbed faster (distant thunder rumbles; whale song at low frequency crosses oceans).
H: Channels and guides
P: Waves can be trapped in layers where speed is lowest: the ocean's SOFAR channel carries low-frequency sound thousands of kilometres; optical fibres guide light by total internal reflection; radio reflects off the ionosphere. Waveguides confine waves in metal pipes.
X: A speaker produces 80 dB at 2 m. What level at 20 m, assuming spherical spreading only?
> Intensity falls by (20/2)^{2} = 100
> Level falls by 10 log_{10}100 = 20 dB: 60 dB
K: Geometric spreading spreads a fixed power over a growing area; absorption removes energy. Both reduce intensity.
!: Inverse-square spreading assumes a point source and no reflections; indoors or near large sources it doesn't hold.
T: Attenuation | The loss of wave intensity with distance through absorption and scattering in the medium
T: Inverse-square law | For a point source radiating equally in all directions, intensity falls as 1/r^{2} because the power spreads over a sphere of area 4πr^{2}
SUM: Point sources spread as 1/r^{2}, line sources as 1/r; absorption adds an exponential fall.
SUM: Low frequencies usually travel further; channels and guides stop waves spreading.
EV: established | For a point source in a uniform, non-absorbing medium, intensity falls as the inverse square of distance
SRC: OpenStax, University Physics Volume 1, section 17.3 "Sound Intensity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-3-sound-intensity
SRC: OpenStax, University Physics Volume 1, section 16.4 "Energy and Power of a Wave" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-4-energy-and-power-of-a-wave
Q: How does intensity fall with distance from a point source? | As 1/r^{2}.
Q: What is the SOFAR channel? | A layer in the ocean where sound speed is lowest, trapping and guiding low-frequency sound over huge distances.
M1@1: Moving three times farther from a point source reduces intensity by: | 9 | 3 | 27 | √3 | Intensity falls as 1/r^{2}, so tripling the distance divides it by 3^{2} = 9.
M2@2: Why does distant thunder sound like a low rumble? | High frequencies are absorbed more over distance | Thunder is only low frequency | Sound speeds up | The ear adapts | Air absorbs high frequencies more strongly, so after a long path mainly the low frequencies remain.
M3@1: A long straight motorway acts as a line source. A house 50 m away measures 70 dB. Ignoring absorption, what level would a house 500 m away measure? | 60 dB | 50 dB | 67 dB | 63 dB | A line source spreads cylindrically, I ∝ 1/r: ten times the distance is a tenfold intensity drop, which is 10 dB.
NUM2@2: Ultrasound in tissue has an attenuation coefficient of 0.23 cm^{-1} (intensity). What fraction of the intensity remains after 3 cm? Give two decimal places. | 0.5 | 0.02 |  | I/I_{0} = e^{−0.23 × 3} = e^{−0.69} = 0.50: about half the intensity is left.
TF1@3: Light can travel along a curved optical fibre because it is trapped by repeated total internal reflection. | true | The core has a higher refractive index than the cladding, so rays hitting the boundary beyond the critical angle are totally reflected and stay in the core.
SA2@1,2: Explain why the sound from a distant thunderstorm is both quieter and lower-pitched than near by. | It is quieter because the sound energy spreads over an ever larger area (roughly 1/r^{2}) and is also absorbed by the air. It sounds lower because air absorbs high frequencies much more strongly than low ones, so the spectrum that arrives is dominated by low frequencies. | Geometric spreading lowers intensity ; Absorption also removes energy ; Absorption is stronger at high frequency ; Remaining sound is mainly low frequency, heard as a rumble

## Phase and group velocity
S: The phase velocity is how fast individual wave crests move; the group velocity is how fast the envelope of a wave packet, and hence energy and information, moves. They differ whenever the wave speed depends on frequency.
O: Define phase and group velocity and calculate both from a dispersion relation
O: Explain why phase velocity can exceed c without violating relativity
O: Recognise normal and anomalous dispersion from the relation between v_{g} and v_{p}
PRE: Wavelength, frequency, period and speed
LV: Year 1 · Physical reasoning
H: Definitions
E: v_{p} = ω/k
E: v_{g} = dω/dk
- Non-dispersive (ω ∝ k): v_{g} = v_{p}.
- Normal dispersion: v_{g} < v_{p} (crests run forward through the packet).
- Anomalous dispersion: v_{g} > v_{p}, and v_{g} can even exceed c or be negative; it then no longer gives the signal speed.
H: Examples
- Deep water waves: ω = √(gk) ⇒ v_{g} = v_{p}/2. Watch a boat's wake: crests appear at the back of a group and vanish at the front.
- Light in glass: group index n_{g} = n − λ dn/dλ.
- Electron matter waves: v_{g} equals the particle's velocity; v_{p} = c^{2}/v exceeds c, harmlessly.
X: In a waveguide ω^{2} = ω_{c}^{2} + c^{2}k^{2}. Show v_{p}v_{g} = c^{2}.
> v_{p} = ω/k; differentiating, 2ω dω = 2c^{2}k dk, so v_{g} = c^{2}k/ω
> Product = c^{2}: v_{p} > c while v_{g} < c
K: Crests move at ω/k; energy and information move with the envelope at dω/dk.
!: Phase velocity can exceed c without breaking relativity; no information travels with the crests. Signal speed is bounded by c.
T: Phase velocity | v_{p} = ω/k, the speed of a point of constant phase such as a crest
T: Group velocity | v_{g} = dω/dk, the speed of the envelope of a wave packet, which normally carries its energy
T: Dispersion relation | The function ω(k) linking angular frequency and wavenumber for waves in a medium
SUM: v_{p} = ω/k and v_{g} = dω/dk are equal only in a non-dispersive medium.
SUM: Deep water waves have v_{g} = v_{p}/2; in a waveguide v_{p}v_{g} = c^{2}.
EV: established | In a dispersive medium the envelope of a narrow-band wave packet moves at the group velocity dω/dk
SRC: OpenStax, University Physics Volume 1, section 16.2 "Mathematics of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
SRC: OpenStax, University Physics Volume 3, section 1.5 "Dispersion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-5-dispersion
Q: What is group velocity? | dω/dk: the speed of the envelope of a wave packet, which carries energy.
Q: Why can phase velocity exceed c? | Crests carry no information; only the group (signal) velocity is limited.
M1@1: For deep-water waves, group velocity is: | Half the phase velocity | Equal to it | Twice it | Zero | With ω = √(gk), dω/dk = ½√(g/k) = ½(ω/k), so the group moves at half the crest speed.
M2@3: A medium is non-dispersive when: | ω is proportional to k | v_{g} = 0 | ω is constant | k is constant | If ω = vk then ω/k and dω/dk both equal v, so every frequency travels at the same speed.
M3@1: For a wave with dispersion relation ω = ak^{2} (a constant), how does the group velocity compare with the phase velocity? | v_{g} = 2v_{p} | v_{g} = v_{p}/2 | v_{g} = v_{p} | v_{g} = v_{p}^{2} | v_{p} = ω/k = ak and v_{g} = dω/dk = 2ak, so the envelope moves twice as fast as the crests (as for a free quantum particle).
TF2@2: Because the phase velocity of waves in a waveguide exceeds c, signals can be sent along it faster than light. | false | Information travels with the envelope at the group velocity, which is c^{2}/v_{p} and so less than c.
NUM2@1: Deep-water waves of wavelength 100 m have phase speed 12.5 m s^{-1}. At what speed does the energy of a group of such waves travel? | 6.25 | 0.1 | m s^{-1} | For deep water v_{g} = v_{p}/2 = 12.5/2 = 6.25 m s^{-1}.
SA3@1,2: Explain the difference between phase velocity and group velocity, and why only one of them is limited by the speed of light. | Phase velocity ω/k is the speed of individual crests of a single-frequency wave. A real signal is a packet of many frequencies; its envelope moves at dω/dk. A pure sinusoid is identical everywhere and carries no information, so its crests may move faster than c. Information and energy are carried by changes in the envelope, which travel at (at most) the group velocity, and relativity limits that signal speed to c. | v_{p} = ω/k for crests ; v_{g} = dω/dk for the envelope ; They differ in a dispersive medium ; Unmodulated crests carry no information ; Signal (envelope) speed cannot exceed c

## Superposition
S: When waves overlap in a linear medium, the total displacement at each point is the sum of the individual displacements. Waves pass through each other unchanged; superposition explains interference, standing waves, beats and Fourier analysis.
O: State the principle of superposition and add displacements of overlapping waves
O: Explain how interference, standing waves and beats follow from superposition
O: Describe when superposition fails in nonlinear media
PRE: Wave properties
LV: GCSE and A level · Foundation
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
K: In a linear medium displacements add point by point, and the waves emerge unchanged.
!: Superposition adds displacements (amplitudes), not intensities, for coherent waves.
P: **Investigate with the lab.** Add two waves with equal amplitude and set the phase difference to 180°: they cancel completely. Then set it to 0° and see the amplitude double.
IX: waves
T: Principle of superposition | When two or more waves overlap, the resultant displacement at any point is the vector sum of their individual displacements
T: Linear medium | A medium whose restoring force is proportional to displacement, so wave solutions can be added
SUM: Overlapping waves add displacements; afterwards each carries on unchanged.
SUM: Interference, standing waves, beats and Fourier analysis all rest on superposition, which fails in nonlinear media.
EV: established | In linear media the resultant displacement of overlapping waves is the sum of the individual displacements
SRC: OpenStax, University Physics Volume 1, section 16.5 "Interference of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves
SRC: AQA, A-level Physics specification (7408), section 3.3.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State the principle of superposition. | When waves overlap, the resultant displacement is the sum of the individual displacements.
Q: When does superposition fail? | In nonlinear media, typically at large amplitudes.
M1@1: Two waves of amplitude 4 cm meet in antiphase. The resultant amplitude is: | 0 | 8 cm | 4 cm | 16 cm | In antiphase one displacement is always the negative of the other, so they sum to zero everywhere.
M2@3: Frequency doubling of laser light shows: | A nonlinear medium | Superposition | Diffraction | Polarisation | A new frequency appears only if the medium's response is not proportional to the field, so superposition has broken down.
M2@1: Two equal waves meet exactly out of phase. What is the result? | They cancel to zero displacement | They double in amplitude | They reflect off each other | They change frequency | By superposition, displacements add; equal and opposite displacements cancel.
M3@1,2: Two waves of amplitude 3 mm and 5 mm, same frequency, overlap at a point. Which resultant amplitude is impossible there? | 9 mm | 2 mm | 5 mm | 8 mm | The resultant lies between |5 − 3| = 2 mm (antiphase) and 5 + 3 = 8 mm (in phase); 9 mm exceeds the sum.
TF1@1: When two pulses on a string pass through each other, each is permanently changed by the encounter. | false | In a linear medium each pulse emerges with its original shape and speed; they only add while they overlap.
SA2@2: Explain how the principle of superposition leads to standing waves when a wave reflects from the end of a string. | The incident and reflected waves have the same frequency and amplitude and travel in opposite directions. Adding their displacements gives y = 2A sin kx cos ωt: at some points (nodes) the two always cancel, at others (antinodes) they reinforce, so the pattern stays in place instead of travelling. | Incident and reflected waves overlap ; Same frequency and amplitude, opposite directions ; Displacements add point by point ; Fixed nodes where they always cancel and antinodes where they reinforce

## Interference
S: Interference is the pattern of reinforcement and cancellation when coherent waves overlap. It's the signature of wave behaviour, and it measures wavelengths, distances and surface flatness to a fraction of a wavelength.
O: State the conditions for an observable, stable interference pattern
O: Use x = λD/d and d sin θ = nλ for Young's double slits
O: Describe applications of interference, from interferometers to thin films
PRE: Superposition
LV: GCSE and A level · Application
H: Conditions
- **Coherence**: constant phase relationship (same frequency, stable phase).
- Similar amplitudes give the clearest patterns.
- Path difference Δ sets the phase difference δ = 2πΔ/λ.
H: Young's double slit
E: x = λD/d :: fringe spacing (slit separation d, screen distance D, valid for D ≫ d)
E: d sin θ = nλ :: bright fringes
- Showed light is a wave (Young, 1801).
- With single photons or electrons, the pattern still builds up dot by dot.
H: Applications
- Interferometers (Michelson, Mach–Zehnder, LIGO).
- Thin-film colours (soap bubbles, anti-reflection coatings).
- Noise-cancelling headphones; radio antenna arrays steering beams.
X: Light through slits 0.5 mm apart gives fringes 1.2 mm apart on a screen 1.0 m away. Find λ.
> λ = xd/D = 1.2 × 10^{-3} × 5 × 10^{-4}/1.0 = 6.0 × 10^{-7} m = 600 nm
K: A stable pattern needs coherent sources; the path difference, as a fraction of λ, decides bright or dark.
!: Two separate light bulbs don't produce visible interference: they aren't coherent with each other.
P: **Investigate with the lab.** Vary the phase difference between two waves from 0° to 360° and watch the combined amplitude rise and fall.
IX: waves
P: **Investigate with the lab.** Look at the double-slit pattern and identify where the waves from the two slits arrive in phase and in antiphase.
IX: interference
T: Coherence | A constant phase relationship between two waves, which requires the same frequency
T: Path difference | The difference in distance travelled by two waves from their sources to a point
T: Fringe spacing | The distance between the centres of adjacent bright (or dark) fringes, x = λD/d
SUM: Coherent waves overlapping give fixed bright and dark fringes set by path difference.
SUM: Young's slits: x = λD/d; maxima at d sin θ = nλ.
EV: established | Young's double-slit fringes show that light behaves as a wave, and single-particle experiments show the same pattern building up
SRC: OpenStax, University Physics Volume 3, section 3.1 "Young's Double-Slit Interference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference
SRC: AQA, A-level Physics specification (7408), section 3.3.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is coherence? | A constant phase relationship between waves.
Q: What is the fringe spacing in Young's experiment? | λD/d.
M1@2: Increasing the slit separation in Young's experiment makes fringes: | Closer together | Further apart | Brighter | Disappear | The fringe spacing x = λD/d is inversely proportional to d, so wider-spaced slits give closer fringes.
M2@3: Interference of single electrons shows: | Each electron behaves as a wave going through both slits | Electrons are classical particles | Electrons interact with each other | The experiment is faulty | The pattern builds up one electron at a time, so each electron's wave must pass through both slits and interfere with itself.
M2@1: What phase difference gives maximum constructive interference? | 0° or a whole number of cycles | 90° | 180° | 270° | Waves in phase add to give the largest amplitude, which also happens for any whole number of cycles of phase difference.
M2@1,2: On the screen of a double-slit experiment, what makes a dark fringe? | Waves from the two slits arriving in antiphase | Light being absorbed by the screen | No light passing through either slit | Waves arriving exactly in phase | A path difference of half a wavelength, or an odd number of half wavelengths, gives cancellation.
M3@2: In a double-slit experiment with green light (530 nm), the fringe spacing is 2.0 mm. The green light is replaced by red light (650 nm) and the screen distance is halved. What is the new fringe spacing? | 1.2 mm | 2.5 mm | 4.9 mm | 0.8 mm | x ∝ λD: 2.0 mm × (650/530) × ½ = 1.23 mm.
NUM2@2: Slits 0.25 mm apart are lit with 500 nm light. How far apart are the fringes on a screen 2.0 m away, in mm? | 4 | 0.05 | mm | x = λD/d = 5.0 × 10^{-7} × 2.0/2.5 × 10^{-4} = 4.0 × 10^{-3} m = 4.0 mm.
SA2@1,2: Explain why two car headlights never produce an interference pattern, while one laser shone through two slits does. | Interference fringes stay still only if the waves keep a constant phase difference. Each headlight emits light from many atoms with random, rapidly changing phases and a spread of frequencies, so any pattern shifts millions of times a second and averages out. The two slits are lit by the same laser wavefront, so the two sources have the same frequency and a fixed phase relationship: they are coherent. | Stable fringes need a constant phase difference (coherence) ; Independent sources have random, changing phases ; Patterns from incoherent sources average out ; Slits share one wavefront, so they are coherent

## Constructive and destructive interference
S: Waves interfere constructively where they arrive in phase (path difference a whole number of wavelengths) and destructively where they arrive in antiphase (an odd number of half wavelengths).
O: Use the path-difference conditions for maxima and minima from in-phase sources
O: Calculate resultant intensity from two interfering waves
O: Include phase changes on reflection to analyse thin films
PRE: Interference
LV: A level · Application
H: Conditions (sources in phase)
E: Δ = nλ :: constructive (maxima)
E: Δ = (n + ½)λ :: destructive (minima)
E: I = I_{1} + I_{2} + 2√(I_{1}I_{2}) cos δ :: resultant intensity
- Equal intensities: I ranges from 4I_{0} (constructive) to 0 (destructive). Energy isn't destroyed; it's redistributed.
H: Phase changes on reflection
- Reflection off a medium of higher refractive index (or a fixed end) adds a phase shift of π (half a wavelength); reflection off a lower index adds none.
- Thin films: compare the extra path 2nt (at normal incidence) plus any reflection phase shifts.
X: An anti-reflection coating (n = 1.38) on glass (n = 1.5) for 550 nm light. Minimum thickness?
> Both reflections (air–coating, coating–glass) have a π shift, so these cancel; need 2nt = λ/2
> t = 550/(4 × 1.38) = 100 nm
K: Interference moves energy from dark regions to bright ones; the average intensity is unchanged.
!: Destructive interference at one place always comes with constructive interference elsewhere; total energy is conserved.
P: **Investigate with the lab.** Set the phase difference to 0°, 180° and 360° in turn and record the combined amplitude each time.
IX: waves
T: Constructive interference | Superposition of waves in phase, giving a resultant amplitude equal to the sum of the amplitudes
T: Destructive interference | Superposition of waves in antiphase, giving a resultant amplitude equal to the difference of the amplitudes
SUM: In-phase sources: maxima where Δ = nλ, minima where Δ = (n + ½)λ.
SUM: Two equal waves give between 0 and 4 times one wave's intensity; thin films need reflection phase shifts too.
EV: established | Interference redistributes wave energy without creating or destroying it
SRC: OpenStax, University Physics Volume 3, section 3.4 "Interference in Thin Films" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/3-4-interference-in-thin-films
SRC: AQA, A-level Physics specification (7408), section 3.3.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What path difference gives destructive interference for in-phase sources? | An odd number of half wavelengths.
Q: What phase change occurs on reflection from a denser medium? | π (half a wavelength).
M1@1: Two speakers in phase are 3.0 m and 3.5 m from you; λ = 1.0 m. You hear: | A quiet spot (destructive) | A loud spot | No sound change | Beats | The path difference is 0.5 m, which is half a wavelength, so the two waves arrive in antiphase.
M2@2: Two equal waves interfering constructively give intensity: | 4 times one wave's | 2 times | The same | Zero | The amplitude doubles and intensity is proportional to amplitude squared, so it rises by 2^{2} = 4.
M2@1: Two waves arrive with a path difference of 1.5 wavelengths. What kind of interference occurs? | Destructive | Constructive | Neither, they don't interact | It depends only on amplitude | A path difference of a whole number plus a half wavelength puts the waves in antiphase.
M3@3: A soap film (n = 1.33) in air looks bright in reflected light of 532 nm. What is its smallest possible thickness? | 100 nm | 200 nm | 50 nm | 400 nm | Only the top reflection has a π shift, so brightness needs 2nt = λ/2: t = 532/(4 × 1.33) = 100 nm.
NUM2@2: Two coherent waves of intensity 1.0 and 4.0 W m^{-2} meet in antiphase. What is the resultant intensity in W m^{-2}? | 1 | 0.05 | W m^{-2} | I = 1 + 4 − 2√(1 × 4) = 5 − 4 = 1 W m^{-2}: amplitudes 1 and 2 subtract to 1.
TF1@2: Where two waves interfere destructively, their energy is destroyed. | false | The energy is redistributed: it appears in the bright fringes, which have more than the sum of the separate intensities.
SA3@3: Explain how a single thin coating can reduce reflection from a camera lens, and why it works best for one colour. | Light reflects from both the top and bottom surfaces of the coating. With a coating index between air and glass, both reflections have the same π shift, so if the extra path 2nt equals λ/2 the two reflected waves are in antiphase and cancel (fully if their amplitudes match). Since the condition depends on λ, the cancellation is complete for one wavelength, usually mid-spectrum green, and partial for others, which gives coated lenses a purple tint. | Reflections from both surfaces of the film ; Equal phase shifts at both surfaces cancel out ; Extra path 2nt = λ/2 gives antiphase reflections ; Thickness t = λ/(4n) ; Condition depends on wavelength, so only one colour is fully cancelled

## Standing waves
S: A standing wave forms when two identical waves travel in opposite directions, usually a wave and its reflection. Some points (nodes) never move; others (antinodes) oscillate with maximum amplitude, and energy stays trapped between them.
O: Explain how a standing wave forms and locate its nodes and antinodes
O: Calculate harmonic frequencies for strings and for open and closed pipes
O: Compare the amplitude, phase and energy transport of standing and travelling waves
PRE: Superposition
LV: GCSE and A level · Application
H: Form
E: y = 2A sin kx cos ωt
- Nodes every λ/2; antinodes midway between.
- All points between adjacent nodes move in phase; across a node, in antiphase.
- No net energy transport.
H: On strings and pipes
E: f_{n} = nv/(2L) :: string fixed at both ends, or pipe open at both ends (n = 1, 2, 3…)
E: f_{n} = nv/(4L) :: pipe closed at one end (n = 1, 3, 5…)
E: f_{1} = (1/2L)√(T/μ) :: fundamental of a stretched string
H: Comparison with travelling waves
- Travelling: every point has the same amplitude; phase varies along the wave; energy moves.
- Standing: amplitude varies with position; phase is the same between nodes; energy stays.
X: Microwaves in an oven form standing waves with nodes 6 cm apart. Find f.
> λ/2 = 6 cm ⇒ λ = 12 cm
> f = 3 × 10^{8}/0.12 = 2.5 GHz (hence the turntable: food at nodes wouldn't heat)
K: Adjacent nodes are λ/2 apart, and only wavelengths that fit the boundaries can form standing waves.
!: The distance between adjacent nodes is λ/2, not λ.
P: **Investigate with the lab.** Send two equal waves in opposite directions and get a standing wave. Find the nodes, where the string never moves.
IX: waves
T: Node | A point on a standing wave where the displacement is always zero
T: Antinode | A point on a standing wave where the amplitude of oscillation is greatest
T: Harmonic | A standing-wave mode whose frequency is a whole-number multiple of the fundamental
SUM: Two equal waves moving opposite ways make a standing wave with fixed nodes λ/2 apart.
SUM: Strings and open pipes have f_{n} = nv/(2L); closed pipes only odd n in f_{n} = nv/(4L).
EV: established | Standing waves on strings and in pipes occur only at frequencies whose wavelengths fit the boundary conditions
SRC: OpenStax, University Physics Volume 1, section 16.6 "Standing Waves and Resonance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance
SRC: AQA, A-level Physics specification (7408), section 3.3.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How far apart are adjacent nodes? | Half a wavelength.
Q: How does a standing wave differ from a travelling wave? | Its amplitude varies with position, points between nodes oscillate in phase, and it transfers no net energy.
M1@2: The fundamental of a 0.6 m string with v = 240 m s^{-1} is: | 200 Hz | 400 Hz | 100 Hz | 144 Hz | f_{1} = v/(2L) = 240/(2 × 0.6) = 200 Hz; 400 Hz forgets the factor of 2 in 2L.
M2@1,3: Points on either side of a node oscillate: | In antiphase | In phase | Not at all | At different frequencies | The factor sin kx changes sign at a node, so the two sides always move in opposite directions.
M2@1: What is the distance between two neighbouring nodes in a standing wave? | Half a wavelength | One wavelength | A quarter of a wavelength | Two wavelengths | Nodes occur every half wavelength, where sin kx = 0.
M3@2: A pipe closed at one end has its fundamental at 125 Hz. Which frequency could NOT be one of its resonances? | 250 Hz | 375 Hz | 625 Hz | 875 Hz | A closed pipe has only odd harmonics (125, 375, 625, 875 Hz…); 250 Hz would be the missing second harmonic.
NUM2@2: A string 0.80 m long has tension 64 N and mass per unit length 0.010 kg m^{-1}. What is its fundamental frequency? | 50 | 0.5 | Hz | v = √(64/0.010) = 80 m s^{-1}; f_{1} = v/(2L) = 80/1.6 = 50 Hz.
TF1@3: A standing wave on a string carries energy steadily from one end to the other. | false | The two travelling waves carry equal energy in opposite directions, so there is no net transport; energy sloshes between kinetic and potential within each loop.
SA2@1,3: Describe how a stationary wave forms on a string fixed at both ends, and state two differences between it and a progressive wave. | A wave travels to a fixed end, reflects (inverted) and overlaps the incoming wave; the two have equal frequency and amplitude and travel in opposite directions, so they superpose to form a stationary pattern. At the fixed ends and every λ/2 there are nodes; antinodes lie between. Unlike a progressive wave, the amplitude varies with position, all points between two nodes are in phase, and no net energy is transferred. | Reflection at a fixed end gives two opposite travelling waves ; Same frequency and amplitude, superposed ; Nodes at the ends and every λ/2, antinodes between ; Amplitude varies with position (progressive: constant) ; Points between nodes in phase / no net energy transfer

## Reflection and transmission
S: When a wave meets a boundary between two media, part is reflected and part transmitted. The fractions and phases depend on how different the media's impedances are.
O: Use the amplitude reflection and transmission coefficients for a boundary between impedances Z_{1} and Z_{2}
O: Predict whether a reflected pulse is inverted or upright
O: Explain impedance matching in ultrasound, transmission lines and optics
PRE: Wave equations
LV: Year 1 · Application
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
- Light: the Fresnel equations give ~4% reflection at each air–glass surface at normal incidence, R = ((n_{1} − n_{2})/(n_{1} + n_{2}))^{2}.
X: What fraction of light reflects at normal incidence from water (n = 1.33)?
> R = ((1.33 − 1)/(1.33 + 1))^{2} = (0.142)^{2} = 0.020 = 2%
K: Reflection is set by the impedance mismatch: matched impedances transmit everything.
!: Reflection depends on the contrast between media, not on either medium alone: matched media reflect nothing.
T: Wave impedance | A property of a medium, Z = √(Tμ) for a string or ρv for sound, that measures its resistance to being set in motion by a wave
T: Impedance matching | Making the impedances on either side of a boundary equal, or bridging them, so that little of the wave is reflected
SUM: r = (Z_{1} − Z_{2})/(Z_{1} + Z_{2}); a higher-impedance boundary inverts the reflection.
SUM: Reflected and transmitted powers add to the incident power; matching removes reflection.
EV: established | The fraction of a wave reflected at a boundary depends on the impedance mismatch between the two media
SRC: OpenStax, University Physics Volume 1, section 16.3 "Wave Speed on a Stretched String" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-3-wave-speed-on-a-stretched-string
SRC: OpenStax, College Physics 2e, section 17.7 "Ultrasound" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/17-7-ultrasound
Q: When is a reflected pulse on a string inverted? | When it reflects from a fixed end or a denser (higher impedance) medium.
Q: Why is gel used in ultrasound scanning? | It removes air between probe and skin, reducing a large impedance mismatch that would reflect almost all the sound.
M1@2: A wave passes from a light string to a heavy string. The reflected pulse is: | Inverted | Upright | Absent | Doubled | The heavy string has higher impedance, so r = (Z_{1} − Z_{2})/(Z_{1} + Z_{2}) is negative: the reflection is inverted.
M2@1,3: At normal incidence, about how much light reflects from one air–glass surface (n = 1.5)? | 4% | 50% | 0.4% | 96% | R = ((1.5 − 1)/(1.5 + 1))^{2} = (0.5/2.5)^{2} = 0.04, so about 4% is reflected and 96% transmitted.
M3@1: A string of impedance Z joins a string of impedance 3Z. What fraction of the incident power is reflected? | 1/4 | 1/2 | 1/9 | 3/4 | r = (Z − 3Z)/(Z + 3Z) = −1/2, so R = r^{2} = 1/4; the other 3/4 is transmitted.
TF2@3: Ultrasound gel works by absorbing the stray sound reflected from the skin. | false | The gel replaces air, whose impedance is tiny compared with the probe and skin, so far less sound is reflected at the boundary in the first place.
NUM2@1: Light passes at normal incidence from air into diamond (n = 2.4). What percentage of the intensity is reflected? Give a whole number. | 17 | 1 | % | R = ((2.4 − 1)/(2.4 + 1))^{2} = (1.4/3.4)^{2} = 0.17, about 17%: one reason diamonds look so bright.
SA2@1,2: A pulse travels along a light rope tied to a heavy rope. Describe what happens at the join, and explain why. | Part of the pulse is transmitted into the heavy rope and part is reflected back along the light rope. The heavy rope has a higher impedance, so it resists being moved and acts partly like a fixed end: the reflected pulse is inverted and smaller. The transmitted pulse is upright, slower and smaller in amplitude. The reflected and transmitted powers add up to the incident power. | Partial reflection and partial transmission ; Heavy rope has higher impedance ; Reflected pulse inverted (r negative) ; Transmitted pulse upright and slower ; Energy is conserved across the join

## Refraction
S: Refraction is the change in direction of a wave when it enters a medium where its speed is different, at an angle. Snell's law gives the new direction, and it explains lenses, rainbows, mirages and fibre optics.
O: Apply Snell's law, n_{1} sin θ_{1} = n_{2} sin θ_{2}, with n = c/v
O: Calculate critical angles and explain total internal reflection
O: Explain refraction of sound, water and seismic waves
PRE: Wavelength, frequency, period and speed
LV: GCSE and A level · Application
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
> sin θ_{2} = sin 50°/1.33 = 0.766/1.33 = 0.576 ⇒ θ_{2} = 35°
K: Refraction happens because the wave's speed changes; the side of the wavefront that slows first swings it round.
!: Angles in Snell's law are measured from the normal, not from the surface.
T: Refractive index | n = c/v, the ratio of the speed of light in a vacuum to its speed in the medium
T: Critical angle | The angle of incidence, in the denser medium, for which the refracted ray grazes the boundary at 90°
T: Total internal reflection | Complete reflection of a wave inside a medium when it meets a lower-index boundary beyond the critical angle
SUM: n_{1} sin θ_{1} = n_{2} sin θ_{2}; slower media bend waves towards the normal.
SUM: Beyond sin θ_{c} = n_{2}/n_{1}, light is totally internally reflected.
EV: established | Snell's law describes the refraction of light at a boundary between media of different refractive index
SRC: OpenStax, University Physics Volume 3, section 1.3 "Refraction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction
SRC: OpenStax, University Physics Volume 3, section 1.4 "Total Internal Reflection" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-4-total-internal-reflection
SRC: AQA, A-level Physics specification (7408), section 3.3.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Snell's law. | n_{1} sin θ_{1} = n_{2} sin θ_{2}.
Q: When does total internal reflection occur? | When light goes from a higher to a lower index medium at an angle greater than the critical angle.
M1@2: The critical angle for glass (n = 1.5) to air is about: | 42° | 48° | 30° | 90° | sin θ_{c} = 1/1.5 = 0.667, so θ_{c} = 41.8°, about 42°.
M2@3: Ocean waves approaching a beach turn to become: | Nearly parallel to the shore | Perpendicular to it | Unchanged | Faster | Waves slow in shallower water, so the part of a crest nearer the shore lags and the crest swings round to lie along the beach.
M3@1,2: Light travels from glass (n = 1.50) into water (n = 1.33) at 65° to the normal. What happens? | It is totally internally reflected | It refracts towards the normal | It refracts away from the normal at about 75° | It passes straight through | The critical angle is sin^{-1}(1.33/1.50) = 62.5°; 65° exceeds it, so no refracted ray exists.
NUM2@1: Light in air hits glass (n = 1.52) at 30° to the normal. What is the angle of refraction in degrees? | 19.2 | 0.3 | ° | sin θ_{2} = sin 30°/1.52 = 0.5/1.52 = 0.329, so θ_{2} = 19.2°.
TF1@1: Light slows down when it enters glass from air, so it bends towards the normal. | true | A higher refractive index means a lower speed; by Snell's law sin θ_{2} < sin θ_{1}, so the ray bends towards the normal.
SA2@2: Explain how an optical fibre keeps light inside it over long distances. | The fibre has a core of higher refractive index surrounded by cladding of lower index. Light entering near the axis hits the core–cladding boundary at angles of incidence greater than the critical angle, sin θ_{c} = n_{clad}/n_{core}, so it is totally internally reflected each time and zigzags along the core. The cladding also protects the boundary and stops light crossing between touching fibres. | Core has higher index than cladding ; Light meets boundary beyond the critical angle ; Total internal reflection at every bounce ; sin θ_{c} = n_{clad}/n_{core} ; Cladding protects the surface and prevents leakage

## Diffraction
S: Diffraction is the spreading of waves when they pass through gaps or around obstacles. It's strongest when the gap is comparable to the wavelength, and it limits the resolution of every optical instrument.
O: Describe how diffraction depends on gap size and wavelength
O: Use a sin θ = nλ for single-slit minima and d sin θ = nλ for a grating
O: Apply the Rayleigh criterion to the resolution of instruments
PRE: Interference
LV: GCSE and A level · Application
H: Single slit
E: a sin θ = nλ :: minima (slit width a), n = ±1, ±2…
- Central maximum twice as wide as the others; width ∝ λ/a.
H: Diffraction grating
E: d sin θ = nλ :: bright maxima (very sharp with many slits)
- Highest order: n_{max} is the largest whole number below d/λ.
- Resolving power λ/Δλ = nN (order × number of lines illuminated).
- Spectrometers, CD rainbow colours.
H: Resolution
E: θ_{min} ≈ 1.22λ/D :: Rayleigh criterion, circular aperture
- Larger telescopes and shorter wavelengths resolve finer detail; electron microscopes use tiny de Broglie wavelengths.
- X-ray diffraction from crystal lattices: Bragg's law 2d sin θ = nλ revealed DNA's helix and thousands of protein structures.
X: Can a 10 cm telescope resolve car headlights 1.5 m apart, 10 km away (λ = 550 nm)?
> θ_{min} = 1.22 × 5.5 × 10^{-7}/0.1 = 6.7 × 10^{-6} rad
> Separation angle = 1.5/10^{4} = 1.5 × 10^{-4} rad: easily resolved
K: The spreading angle is about λ/(aperture size): small gaps and long wavelengths diffract most.
!: You hear round corners but don't see round them because sound wavelengths (~1 m) match doorways while light's (~500 nm) are far smaller.
P: **Investigate with the lab.** Narrow and widen a single slit and watch the central maximum change width. Compare the pattern with a double slit.
IX: interference
T: Diffraction | The spreading of a wave as it passes through a gap or round an obstacle
T: Diffraction grating | A plate with many equally spaced slits that produces sharp maxima at d sin θ = nλ
T: Rayleigh criterion | Two point sources are just resolved when the central maximum of one falls on the first minimum of the other, θ ≈ 1.22λ/D
SUM: Diffraction is strongest when the gap is comparable to λ; single-slit minima at a sin θ = nλ.
SUM: Gratings give sharp maxima at d sin θ = nλ; apertures limit resolution to θ ≈ 1.22λ/D.
EV: established | The angular resolution of a circular aperture is limited by diffraction to about 1.22λ/D
SRC: OpenStax, University Physics Volume 3, section 4.1 "Single-Slit Diffraction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/4-1-single-slit-diffraction
SRC: OpenStax, University Physics Volume 3, section 4.5 "Circular Apertures and Resolution" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/4-5-circular-apertures-and-resolution
SRC: AQA, A-level Physics specification (7408), section 3.3.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: When is diffraction most noticeable? | When the gap or obstacle size is comparable to the wavelength.
Q: State the Rayleigh criterion. | Two point sources are just resolved when θ ≈ 1.22λ/D.
M1@2: A grating with 500 lines per mm and 600 nm light gives a first order at: | 17.5° | 30° | 0.3° | 60° | d = 1/500 mm = 2 µm, so sin θ = λ/d = 0.6/2 = 0.3 and θ = 17.5°.
M2@1,2: Narrowing a single slit makes the central maximum: | Wider | Narrower | Brighter | Disappear | The first minima are at sin θ = λ/a, so a smaller slit width a pushes them further out.
M2@1: When is diffraction through a gap most noticeable? | When the gap is about the same size as the wavelength | When the gap is much larger than the wavelength | When the light is very bright | Only when the wave is sound | Diffraction is greatest when the gap width is comparable to the wavelength.
M3@2: A grating has 300 lines per mm. What is the highest order visible with 650 nm light? | 5 | 4 | 6 | 3 | d = 3.33 µm and d/λ = 5.13; sin θ cannot exceed 1, so n_{max} = 5.
NUM2@3: What is the smallest angle, in microradians, that a telescope with a 2.4 m mirror can resolve at 500 nm? | 0.25 | 0.01 | µrad | θ = 1.22 × 5.0 × 10^{-7}/2.4 = 2.5 × 10^{-7} rad = 0.25 µrad.
TF1@1: Radio waves diffract round hills more than visible light does because their wavelengths are much longer. | true | Diffraction spreading grows with λ/(size); radio wavelengths of metres to kilometres are comparable to hills, light's are not.
SA3@1,3: Explain why astronomers build large telescopes, and why a radio telescope must be far larger than an optical one to see the same detail. | Diffraction at the aperture spreads each point source into a disc of angular size about 1.22λ/D. Two sources are resolved only if their separation exceeds this, so a larger D gives finer detail (and collects more light). Radio wavelengths are about a million times longer than visible ones, so for the same θ the dish (or array baseline) must be about a million times larger. | Aperture diffraction spreads point images ; Rayleigh criterion θ ≈ 1.22λ/D ; Larger D gives smaller resolvable angle ; Radio λ much longer, so D must be proportionally larger ; Arrays/interferometers give large effective D

## Dispersion
S: Dispersion is the dependence of wave speed on frequency. It splits white light into colours, spreads pulses in optical fibres, and shapes water waves and seismic signals.
O: Explain how dispersion separates white light into a spectrum in prisms and raindrops
O: Describe how dispersion spreads pulses and limits data rates in fibres
O: Give examples of dispersion in water, plasma and astrophysical waves
PRE: Refraction
LV: A level · Application
H: In optics
E: n(λ) ≈ A + B/λ^{2} :: Cauchy's formula for glass in the visible
- Normal dispersion: n higher for blue light, so blue bends more (prisms, rainbows).
- Abbe number measures dispersion; lens designers combine glasses (achromatic doublets) to cancel chromatic aberration.
H: In fibres
P: A short pulse contains many frequencies. Dispersion makes them travel at different speeds, so pulses spread and overlap, limiting data rates. Standard fibre has zero dispersion near 1310 nm and lowest loss near 1550 nm, where dispersion compensation is used; solitons can balance dispersion with nonlinearity.
H: Other waves
- Deep-water waves: long waves travel fastest (swell arrives before chop from a distant storm).
- Plasma: radio waves below the plasma frequency reflect (ionospheric reflection).
- Dispersed pulsar signals: low radio frequencies arrive later, measuring electrons along the line of sight.
X: Why is the rainbow's red on the outside?
> Red has a lower n in water, so it's deviated less inside the drop
> Red light emerges at ~42° from the anti-solar point, violet at ~40°
K: A dispersive medium has a speed that depends on frequency, so the components of a mixed wave separate.
!: Dispersion isn't the same as diffraction or scattering; it's about speed varying with frequency.
T: Dispersion | The variation of wave speed (or refractive index) with frequency
T: Chromatic aberration | Coloured fringes in a lens image because different colours are focused at different distances
SUM: In glass n is higher for blue light, so prisms and raindrops spread white light into colours.
SUM: Dispersion spreads pulses in fibres and sorts water waves and pulsar signals by frequency.
EV: established | The refractive index of glass and water varies with wavelength, which is why prisms and raindrops separate white light into colours
SRC: OpenStax, University Physics Volume 3, section 1.5 "Dispersion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-5-dispersion
SRC: OpenStax, College Physics 2e, section 25.5 "Dispersion: The Rainbow and Prisms" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/25-5-dispersion-the-rainbow-and-prisms
Q: What causes a prism to split white light? | Dispersion: the refractive index varies with wavelength.
Q: Why does dispersion limit data rates in fibres? | Different frequency components travel at different speeds, spreading pulses.
M1@1: In glass, which colour travels slowest? | Violet | Red | Green | All equal | Glass has its highest refractive index for violet, and v = c/n, so violet is slowest.
M2@3: Swell from a distant storm arrives as long waves first because: | Deep-water waves with longer λ travel faster | Short waves are absorbed | Wind speeds them | Tides | Deep-water phase speed is √(gλ/2π), so long-wavelength swell outruns the short waves.
M3@1: White light enters a glass prism. Red light has n = 1.51 and violet n = 1.53. At 45° incidence on the first face, how far apart in angle are the refracted red and violet rays? | About 0.5° | About 5° | About 0.05° | They are not separated | sin^{-1}(0.707/1.51) = 27.9° and sin^{-1}(0.707/1.53) = 27.5°, a difference of about 0.5°.
TF1@2: In a fibre, dispersion makes a short light pulse longer as it travels. | true | The pulse's frequency components travel at slightly different speeds, so they arrive spread out in time.
NUM2@1: Crown glass has n = 1.509 for red light and 1.528 for violet light. What is the ratio of the speed of red light to violet light in the glass? Give three decimal places. | 1.013 | 0.001 |  | v = c/n, so v_{red}/v_{violet} = n_{violet}/n_{red} = 1.528/1.509 = 1.013: red travels about 1.3% faster.
SA2@1,2: Explain why a rainbow shows colours, and why red is on the outside of the primary bow. | Sunlight refracts entering a raindrop, reflects off the back and refracts again leaving it. The refractive index of water is slightly larger for violet than for red, so violet is deviated more. Red emerges at about 42° from the anti-solar point and violet at about 40°, so we see red from drops higher in the sky: red forms the outer edge. | Refraction in, internal reflection, refraction out ; Refractive index depends on wavelength ; Violet deviated more than red ; Red at ~42°, violet ~40° from anti-solar point ; Red seen from higher drops, so on the outside

## Polarisation
S: Polarisation describes the direction of oscillation of a transverse wave. Light can be polarised by filters, reflection, scattering and certain crystals, and polarisation is used in sunglasses, screens, 3D cinema and stress analysis.
O: Describe linear, circular and unpolarised light
O: Use Malus's law and Brewster's angle
O: Explain everyday uses of polarisation and why it shows light is transverse
PRE: Transverse and longitudinal waves
LV: GCSE and A level · Application
H: Types
- **Linear**: oscillation in one plane.
- **Circular/elliptical**: field rotates as the wave travels.
- **Unpolarised**: random, rapidly changing directions (sunlight, bulbs).
H: Producing polarised light
E: I = I_{0} cos^{2}θ :: Malus's law (through an analyser at angle θ)
E: tan θ_{B} = n_{2}/n_{1} :: Brewster's angle: reflected light fully polarised
- An ideal polariser halves the intensity of unpolarised light (the average of cos^{2}θ is ½).
- Scattering: sky light is partially polarised, most strongly at 90° from the Sun (bees navigate by it).
- Birefringent crystals (calcite) split light into two polarisations; wave plates convert linear to circular.
H: Applications
- Polarising sunglasses block horizontally polarised glare from water and roads.
- LCD screens use polarisers and liquid crystals that rotate polarisation.
- Photoelasticity: stressed plastics become birefringent, revealing stress patterns.
- Radio and TV aerials must be aligned with the transmitted polarisation.
X: Unpolarised light (I_{0}) passes through two polarisers at 60°. Final intensity?
> After the first: I_{0}/2
> After the second: (I_{0}/2) cos^{2}60° = (I_{0}/2) × ¼ = I_{0}/8
K: Only transverse waves can be polarised; a polariser passes the field component along its transmission axis.
!: Only transverse waves can be polarised; polarisation of light was key evidence that light is transverse.
T: Polariser | A filter that transmits only the component of a transverse wave's oscillation along one axis
T: Malus's law | The intensity transmitted by an analyser is I_{0} cos^{2}θ, where θ is the angle between the polarisation and the analyser axis
T: Brewster's angle | The angle of incidence at which reflected light is completely polarised parallel to the surface, tan θ_{B} = n_{2}/n_{1}
SUM: Polarisation is the direction of oscillation of a transverse wave.
SUM: Malus's law, I = I_{0} cos^{2}θ; reflection at Brewster's angle gives fully polarised light.
EV: established | Light can be polarised, which shows that it is a transverse wave
SRC: OpenStax, University Physics Volume 3, section 1.7 "Polarization" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-7-polarization
SRC: AQA, A-level Physics specification (7408), section 3.3.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Malus's law. | I = I_{0} cos^{2}θ.
Q: What is Brewster's angle? | The angle of incidence at which reflected light is completely polarised: tan θ_{B} = n_{2}/n_{1}.
M1@2: Two crossed polarisers transmit: | No light | Half | A quarter | All | After the first, the light is polarised at 90° to the second, and cos^{2}90° = 0, so nothing gets through.
M2@2: Brewster's angle for glass (n = 1.5) is about: | 56° | 42° | 34° | 90° | tan θ_{B} = 1.5, so θ_{B} = 56.3°; 42° is the critical angle, a different quantity.
M3@2: Unpolarised light passes through three polarisers with axes at 0°, 45° and 90°. What fraction of the original intensity emerges? | 1/8 | 0 | 1/4 | 1/2 | I_{0}/2 after the first, × cos^{2}45° = I_{0}/4, × cos^{2}45° again = I_{0}/8. Inserting the middle filter lets light through crossed polarisers.
TF1@3: Polarising sunglasses cut glare because light reflected from water and roads is partly horizontally polarised. | true | Reflection near Brewster's angle favours polarisation parallel to the surface; lenses with vertical transmission axes block it.
NUM2@2: Vertically polarised light of intensity 80 W m^{-2} meets a polariser at 30° to the vertical. What intensity is transmitted? | 60 | 0.5 | W m^{-2} | I = I_{0} cos^{2}30° = 80 × 0.75 = 60 W m^{-2}.
SA2@1,3: Describe an experiment with two polarising filters that shows light is a transverse wave. | Look at a lamp through two polarising filters and rotate one. The transmitted brightness changes, falling to almost zero when the axes are crossed at 90° and returning to a maximum after a further 90°. This happens because the first filter passes only one plane of oscillation and the second blocks it when crossed. A longitudinal wave has no plane of oscillation to select, so brightness would not change. | Two polarisers, one rotated ; Intensity varies, near zero when crossed ; First filter produces plane-polarised light ; Second transmits only the component along its axis ; Only transverse waves can be polarised

## Wave packets
S: A wave packet is a localised wave made by superposing many waves with a range of wavelengths. Its width and its spread in wavenumber are inversely related, which is the root of the quantum uncertainty principle.
O: Describe how a localised packet is built from a spread of wavenumbers
O: Use Δx Δk ≳ 1 and Δt Δω ≳ 1 to estimate bandwidths
O: Explain why packets spread in dispersive media and connect this to the uncertainty principle
PRE: Phase and group velocity
LV: Year 2 · Physical reasoning
H: Building a packet
E: ψ(x) = ∫A(k)e^{ikx}dk
E: Δx Δk ≳ 1 (and Δt Δω ≳ 1)
- A pure sine wave (single k) extends forever; a short pulse needs many k.
- The packet moves at the group velocity.
H: Spreading
P: In a dispersive medium the components travel at different speeds, so the packet spreads over time. A free quantum particle's packet spreads too: for a Gaussian, Δx(t) = √(Δx_{0}^{2} + (ħt/(2mΔx_{0}))^{2}), so the narrower the starting packet, the faster it spreads. An electron packet 1 Å wide doubles its width in about 3 × 10^{-16} s.
H: Applications
- Ultrashort laser pulses (femtoseconds) need broad spectra (tens of nm).
- Radar and ultrasound trade pulse length (range resolution) against bandwidth.
- Quantum particles as wave packets with Δx Δp ≥ ħ/2.
X: A laser pulse at 800 nm lasts 10 fs. Estimate its spread of wavelengths.
> Δf ≈ 1/Δt = 10^{14} Hz (order of magnitude); f = c/λ = 3.75 × 10^{14} Hz
> Δλ/λ = Δf/f ≈ 0.27, so Δλ is of order 200 nm (for a smooth Gaussian pulse, ΔfΔt ≈ 0.44 gives about 90 nm)
K: The shorter or narrower the packet, the wider the range of frequencies or wavenumbers it must contain.
!: A wave packet isn't a particle; it has a definite group velocity but no single wavelength.
T: Wave packet | A localised disturbance formed by superposing waves with a range of wavenumbers
T: Bandwidth | The spread of frequencies Δf contained in a signal or pulse
SUM: Packets are sums of many waves; Δx Δk ≳ 1 and Δt Δω ≳ 1.
SUM: Packets travel at v_{g} and spread in dispersive media; with p = ħk this gives Δx Δp ≥ ħ/2.
EV: established | The product of a wave packet's width and its wavenumber spread cannot be made smaller than about one
SRC: OpenStax, University Physics Volume 1, section 16.5 "Interference of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves
SRC: OpenStax, University Physics Volume 3, section 1.5 "Dispersion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-5-dispersion
Q: Why must a short pulse contain many frequencies? | Because Δt Δω ≳ 1: localising in time requires spreading in frequency.
Q: At what speed does a wave packet travel? | The group velocity.
M1@2: Making a wave packet narrower in space makes its range of wavenumbers: | Larger | Smaller | Zero | Unchanged | Δx Δk ≳ 1, so reducing Δx forces Δk to grow; a narrow packet needs many wavenumbers.
M2@3: The uncertainty principle Δx Δp ≥ ħ/2 follows from: | Fourier properties of wave packets with p = ħk | Measurement disturbance only | Classical mechanics | Relativity | Any packet obeys Δx Δk ≳ 1; multiplying by ħ with p = ħk gives the position–momentum relation.
M3@2: A radar sends 1 µs pulses. Roughly what bandwidth does its receiver need? | About 1 MHz | About 1 kHz | About 1 GHz | No bandwidth, since one frequency is used | Δf ≈ 1/Δt = 1/10^{-6} s = 10^{6} Hz; a shorter pulse would need more bandwidth.
TF1@1: A perfectly sinusoidal wave of a single wavelength can be confined to a small region of space. | false | A single-k sinusoid has the same amplitude everywhere; confining a wave requires adding a spread of wavenumbers.
NUM2@2: A pulse lasts 2.0 ns. Using Δf ≈ 1/Δt, estimate its bandwidth in MHz. | 500 | 10 | MHz | Δf ≈ 1/(2.0 × 10^{-9} s) = 5 × 10^{8} Hz = 500 MHz.
SA3@1,3: Explain why a very short laser pulse cannot have a single, sharp colour, and what happens to such a pulse in glass. | A pulse is a superposition of waves; to make them cancel everywhere except in a short interval needs a range of frequencies with Δt Δf of order 1, so a femtosecond pulse spans tens or hundreds of nanometres of wavelength. Glass is dispersive, so those components travel at different speeds: the pulse spreads out (chirps) as it travels, with red usually leading violet. | A short pulse is a superposition of many frequencies ; Δt Δf ≳ 1 links duration and bandwidth ; Femtosecond pulses have broad spectra ; In a dispersive medium components travel at different speeds ; The pulse spreads/lengthens

## Beats
S: Beats are the slow periodic swelling and fading of loudness when two waves of slightly different frequencies combine. The beat frequency equals the difference of the two frequencies.
O: Explain beats as superposition of two close frequencies
O: Calculate beat frequencies and use beats to find an unknown frequency
O: Describe practical uses of beats in tuning and measurement
PRE: Superposition
LV: A level · Application
H: The result
E: y = 2A cos(2π(Δf/2)t) sin(2πf̄t)
E: f_{beat} = |f_{1} − f_{2}|
- The carrier oscillates at the average frequency f̄; the envelope at Δf/2, giving loudness maxima at Δf (two per envelope cycle).
H: Uses
- Tuning instruments: beats vanish when in tune.
- Measuring an unknown frequency against a known one.
- Optical heterodyne detection and laser frequency combs.
- Doppler ultrasound: the beat between sent and echoed waves gives blood velocity.
X: A piano string beats 2 times per second with a 440 Hz fork. Adding a little tape (mass) to the fork raises the beat rate to 3 per second. What's the string's frequency?
> The string is 438 or 442 Hz
> Mass lowers the fork's frequency (say to 439 Hz). If the string were 438 Hz the beats would slow; they speed up, so the string is above the fork: 442 Hz
K: Two close frequencies drift in and out of phase |f_{1} − f_{2}| times a second, so the loudness pulses at that rate.
!: Beats only arise with nearly equal frequencies; with large differences you hear two separate tones (or a combination tone).
P: **Investigate with the lab.** Tune two notes until you hear and see 2 beats per second. Then change one frequency and predict the new beat frequency before you listen.
IX: waves
T: Beats | The periodic rise and fall in amplitude when two waves of slightly different frequency superpose
T: Beat frequency | The number of loudness maxima per second, equal to |f_{1} − f_{2}|
SUM: Two close frequencies give a tone at their average whose loudness pulses at |f_{1} − f_{2}|.
SUM: Beats are used to tune instruments and to measure small frequency differences.
EV: established | The beat frequency of two superposed tones equals the difference of their frequencies
SRC: OpenStax, University Physics Volume 1, section 17.6 "Beats" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-6-beats
SRC: OpenStax, College Physics 2e, section 17.5 "Sound Interference and Resonance: Standing Waves in Air Columns" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/17-5-sound-interference-and-resonance-standing-waves-in-air-columns
Q: What is the beat frequency? | The difference between the two frequencies.
Q: Why do beats disappear when two strings are in tune? | Their frequency difference is zero.
M1@2: Two sources at 500 Hz and 506 Hz produce: | 6 beats per second | 3 beats per second | 1006 beats | 503 beats | The beat frequency is the difference, 506 − 500 = 6 Hz; 503 Hz is the pitch heard, not the beat rate.
M2@1: The perceived pitch during beating is: | The average of the two frequencies | The difference | The sum | The lower frequency | The combined wave oscillates at the carrier frequency f̄ = (f_{1} + f_{2})/2 inside the slow envelope.
M2@2: Two notes of 440 Hz and 443 Hz sound together. What is the beat frequency? | 3 Hz | 441.5 Hz | 883 Hz | 1.5 Hz | The beat frequency is the difference between the two frequencies: 443 − 440 = 3 Hz.
M3@2: A guitar string beats 4 times a second with a 330 Hz fork. Tightening the string slightly makes the beats slower. What was the string's original frequency? | 326 Hz | 334 Hz | 330 Hz | 322 Hz | Tightening raises the string's frequency. Slower beats mean it moved towards 330 Hz, so it started below: 326 Hz.
TF1@1: Beats are produced when two waves of exactly equal frequency are superposed with a phase difference. | false | Equal frequencies keep a fixed phase difference, giving a steady amplitude; beats need slightly different frequencies so the phase drifts.
NUM1@2: Two tuning forks of 256 Hz and 260 Hz sound together. How many beats are heard per second? | 4 | 0 | Hz | f_{beat} = |260 − 256| = 4 Hz.
SA2@1,3: Explain how a musician can use beats to tune a string to a reference note. | Sounding the string with the reference note gives beats at the difference of their frequencies. The musician adjusts the tension: if the beats slow down the string is getting closer to the reference, if they speed up it is moving away. When the beats disappear entirely, the frequencies are equal. | Sound string and reference together ; Beat frequency = |f_{1} − f_{2}| ; Adjust tension and watch the beat rate ; Slower beats mean closer ; In tune when beats vanish

## Boundary conditions
S: Boundary conditions specify what a wave must do at the edges of its medium: fixed, free, or matched to another medium. They determine reflection, the allowed standing-wave patterns, and therefore the resonant frequencies.
O: State the boundary conditions for fixed ends, free ends and interfaces
O: Derive the allowed wavelengths for fixed–fixed, free–free and fixed–free systems
O: Distinguish displacement and pressure nodes in pipes and apply end corrections
PRE: Standing waves
LV: Year 1 · Application
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
> f_{1} = v/(4L) = 343/1.2 = 286 Hz
> Next: 3f_{1} = 858 Hz (no even harmonics)
K: Each boundary fixes a node or antinode; only wavelengths that satisfy both ends can form standing waves.
!: For sound in pipes, a closed end is a displacement node but a pressure antinode. Be clear which quantity you mean.
P: **Investigate with the lab.** Make standing waves on the string and check that both fixed ends are always nodes.
IX: waves
T: Boundary condition | A condition the wave must satisfy at the edge of its medium, such as zero displacement at a fixed end
T: End correction | The extra length, about 0.6 times the radius, added to an open pipe end because the antinode lies just outside it
SUM: Fixed ends are displacement nodes, free ends antinodes; interfaces require continuity.
SUM: Fixed–fixed and free–free give all harmonics; fixed–free only odd ones.
EV: established | The boundary conditions at the ends of a string or pipe determine its allowed standing-wave frequencies
SRC: OpenStax, University Physics Volume 1, section 16.6 "Standing Waves and Resonance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance
SRC: OpenStax, University Physics Volume 1, section 17.4 "Normal Modes of a Standing Sound Wave" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-4-normal-modes-of-a-standing-sound-wave
Q: What boundary condition does an open pipe end impose on displacement? | An antinode (approximately, with an end correction).
Q: Why does a pipe closed at one end have only odd harmonics? | A node at one end and an antinode at the other fit only odd quarter-wavelengths.
M1@2: A string fixed at both ends supports wavelengths: | 2L/n | 4L/n odd n | L/n | 4L | With a node at each end the length must hold a whole number of half wavelengths: L = nλ/2, so λ = 2L/n.
M2@1: At the surface of a perfect conductor, the tangential electric field is: | Zero | Maximum | Equal to the normal field | Undefined | Free charges in the conductor move instantly to cancel any tangential field, so it must vanish at the surface.
M2@2: For a string fixed at both ends, what must the length be? | A whole number of half wavelengths | A whole number of quarter wavelengths | Exactly one wavelength | Any length at all | Both ends must be nodes, so the length holds a whole number of half wavelengths: L = nλ/2.
M3@3: An open pipe of length 0.50 m and radius 2.0 cm is used with v = 340 m s^{-1}. Including end corrections, what is its fundamental? | 324 Hz | 340 Hz | 680 Hz | 170 Hz | Effective length = 0.50 + 2 × 0.6 × 0.02 = 0.524 m; f_{1} = v/(2L_{eff}) = 340/1.048 = 324 Hz.
TF1@3: At the closed end of a pipe the air pressure varies most, even though the air there cannot move. | true | A displacement node is a pressure antinode: air compresses and expands against the closed end, so the pressure swing is largest there.
NUM2@2: A pipe closed at one end is 0.85 m long. What is its fundamental frequency, ignoring end corrections, with v = 340 m s^{-1}? | 100 | 1 | Hz | A closed pipe holds a quarter wavelength: f_{1} = v/(4L) = 340/3.4 = 100 Hz.
SA2@2,3: Explain why a pipe open at both ends produces all harmonics, while a pipe closed at one end produces only odd harmonics. | Both open ends must be displacement antinodes; the patterns that fit have L = nλ/2 for any n, so all harmonics f_{n} = nv/(2L) are allowed. A closed end must be a node and the open end an antinode; the length must then be an odd number of quarter wavelengths, L = nλ/4 with n odd, so only f_{1}, 3f_{1}, 5f_{1}… occur. | Open end: displacement antinode ; Closed end: displacement node ; Open–open: L = nλ/2, all n ; Closed–open: L = nλ/4, odd n only ; Hence all versus odd harmonics

## Resonant modes
S: A bounded system can only sustain standing waves whose shapes fit its boundary conditions: its resonant modes. Each mode has a particular frequency, and the set of them gives instruments their sound, cavities their colours and atoms their energy levels.
O: Calculate mode frequencies in one, two and three dimensions
O: Distinguish harmonics from overtones and explain why drums sound less pitched than strings
O: Connect resonant modes to laser cavities and quantum energy levels
PRE: Boundary conditions
LV: Year 1 · Application
H: In 1D
E: f_{n} = nv/(2L) :: string or open pipe
- The lowest is the fundamental; higher modes are overtones, called harmonics when they are integer multiples of it.
H: In 2D and 3D
- Rectangular membrane: f_{mn} = (v/2)√((m/a)^{2} + (n/b)^{2}).
- Circular drums: Bessel-function modes; frequencies aren't harmonic, so drums have less definite pitch.
- 3D rooms: modes at f = (c/2)√((l/L_{x})^{2} + (m/L_{y})^{2} + (n/L_{z})^{2}); small rooms have uneven bass.
- Laser cavities: longitudinal modes separated by c/(2L).
H: Quantum analogy
P: An electron confined in an atom or box has allowed energies for the same reason: only certain standing matter waves fit. Energy levels are the resonant modes of the electron's wave.
X: A 1.5 m laser cavity: what is the frequency spacing between modes?
> Δf = c/(2L) = 3 × 10^{8}/3 = 1 × 10^{8} Hz = 100 MHz
K: A bounded system responds strongly only near its mode frequencies, which are set by its size, wave speed and boundaries.
!: Exciting a system at a non-resonant frequency gives only a small, forced response; strong response needs a mode near the drive.
P: **Investigate with the lab.** Show the third harmonic and count its nodes. Predict the frequency of the fourth harmonic from the first.
IX: waves
T: Normal mode | A pattern of motion in which every part of a system oscillates at the same frequency with a fixed shape
T: Overtone | Any mode above the fundamental; called a harmonic if its frequency is an integer multiple of the fundamental
SUM: Each bounded system has a discrete set of mode frequencies fixed by its geometry and boundaries.
SUM: Harmonic modes give definite pitch; non-harmonic ones (drums) don't; atoms' energy levels are modes too.
EV: established | The allowed standing-wave modes of a bounded system occur at discrete frequencies set by its geometry and boundary conditions
SRC: OpenStax, University Physics Volume 1, section 16.6 "Standing Waves and Resonance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance
SRC: OpenStax, University Physics Volume 1, section 17.5 "Sources of Musical Sound" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-5-sources-of-musical-sound
Q: Why do drums have less definite pitch than strings? | Their mode frequencies aren't integer multiples of a fundamental.
Q: What is the spacing between longitudinal modes in a laser cavity? | c/(2L).
M1@1: The second harmonic of a 100 Hz fundamental string is: | 200 Hz | 150 Hz | 50 Hz | 400 Hz | The nth harmonic of a string is n times the fundamental, so the second harmonic is 2 × 100 Hz = 200 Hz.
M2@1: Why do small rooms have uneven bass? | Low-frequency room modes are widely spaced | Bass is absorbed | Walls are too hard | Speakers can't produce bass | At low frequency there are only a few room modes, far apart in frequency, so some bass notes resonate and others don't.
M2@1: A string's fundamental frequency is 100 Hz. What is the frequency of its third harmonic? | 300 Hz | 150 Hz | 900 Hz | 33 Hz | For a string fixed at both ends, the nth harmonic is n times the fundamental.
M3@1,3: A rectangular room is 5.0 m × 4.0 m × 2.5 m. With c = 340 m s^{-1}, what is the lowest room mode? | 34 Hz | 68 Hz | 43 Hz | 136 Hz | The lowest mode fits half a wavelength across the longest dimension: f = c/(2 × 5.0) = 34 Hz.
TF1@2: The overtones of a circular drum skin are whole-number multiples of its fundamental. | false | A circular membrane's modes follow zeros of Bessel functions, at about 1.59, 2.14, 2.30… times the fundamental, so they are not harmonic.
NUM2@3: A laser cavity is 0.30 m long. What is the frequency spacing of its longitudinal modes, in MHz? (c = 3.0 × 10^{8} m s^{-1}) | 500 | 5 | MHz | Δf = c/(2L) = 3.0 × 10^{8}/0.60 = 5.0 × 10^{8} Hz = 500 MHz.
SA2@2: Explain why a violin note sounds clearly pitched while a drum hit does not, using the idea of resonant modes. | A violin string is one-dimensional with fixed ends, so its modes are at f, 2f, 3f… When bowed, these harmonics combine into a periodic waveform with a clear pitch at f. A drum skin is two-dimensional; its mode frequencies are set by Bessel functions and are not integer multiples of the lowest, so the sound is not periodic and has no single clear pitch. | String modes are integer multiples of the fundamental ; Harmonic modes give a periodic waveform and clear pitch ; Drum is a 2D membrane with Bessel-function modes ; Drum mode frequencies are not integer multiples ; Hence no definite pitch

## Coupled waves
S: When two wave systems are linked, energy can pass between them. Coupled waves explain directional couplers in optics, energy exchange between pendulum chains, and mode conversion in seismology, plasmas and the ocean.
O: Describe how energy transfers back and forth between two coupled modes
O: Calculate coupling lengths and split ratios for identical coupled guides
O: Explain phase matching and avoided crossings
PRE: Coupled oscillators
LV: Year 3 · Physical reasoning
H: Coupled-mode theory
E: da_{1}/dz = iκa_{2}, da_{2}/dz = iκa_{1} :: two identical coupled modes
E: P_{2}(z) = P_{0} sin^{2}(κz) :: power in guide 2 when all starts in guide 1
- Power transfers fully from one guide to the other over the coupling length L_{c} = π/(2κ), then back.
- If the two modes have different propagation constants (phase mismatch), transfer is incomplete.
H: Examples
- Optical directional couplers and fibre splitters.
- Phase-matched frequency conversion in nonlinear crystals.
- Avoided crossings: coupled modes' dispersion curves repel instead of crossing (polaritons, where light couples to matter).
- Mode conversion: sound in ducts, waves at coastlines, plasma waves in fusion heating.
X: Two identical fibres have coupling κ = 100 m^{-1}. What length splits power 50:50?
> Power in guide 2: sin^{2}(κz) = 0.5 ⇒ κz = π/4
> z = π/(4κ) = π/400 = 7.9 mm
K: Coupled waves exchange energy periodically, completely only when they are phase-matched.
!: Coupling only transfers energy efficiently when the waves are phase-matched (similar wave speeds).
T: Coupling coefficient | κ, the rate per unit length at which one mode drives the other, in m^{-1}
T: Phase matching | Equality of the propagation constants of two coupled waves, needed for complete energy transfer
T: Avoided crossing | The repulsion of two coupled modes' frequencies where, uncoupled, they would be equal
SUM: Identical coupled guides swap power as sin^{2}(κz); full transfer takes L_{c} = π/(2κ).
SUM: Phase mismatch limits transfer; strong coupling turns crossings into avoided crossings.
EV: established | Two phase-matched coupled waveguides exchange power periodically along their length
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: OpenStax, University Physics Volume 1, section 16.5 "Interference of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves
Q: What is an avoided crossing? | When coupled modes' frequencies approach, they repel and exchange character instead of crossing.
Q: What condition maximises energy transfer between coupled waves? | Phase matching (equal propagation constants).
M1@2: A 3 dB fibre coupler: | Splits power equally | Doubles power | Blocks light | Reverses light | A 3 dB drop is a factor of 10^{-0.3} ≈ ½, so each output gets half the input power.
M2@3: Polaritons are: | Coupled states of light and matter excitations | Particles of sound | Electrons | Polarised photons only | Where photon and phonon or exciton dispersion curves would cross, coupling mixes them into polariton branches with an avoided crossing.
M3@1,2: Two identical coupled waveguides fully transfer power from guide 1 to guide 2 in 5.0 mm. What fraction of the power is in guide 2 after 15 mm? | All of it | None of it | Half of it | A quarter of it | L_{c} = 5 mm, so 15 mm is three coupling lengths: 1→2, 2→1, 1→2. The power ends in guide 2.
TF2@3: Two coupled waveguides with very different propagation constants still exchange all their power, only more slowly. | false | Phase mismatch makes the two contributions drift out of step, so only part of the power ever transfers before it flows back.
NUM2@2: Identical coupled guides have κ = 200 m^{-1}. What is the coupling length for complete transfer, in mm? | 7.85 | 0.05 | mm | L_{c} = π/(2κ) = π/400 m = 7.85 × 10^{-3} m = 7.85 mm.
SA3@1,3: Describe how energy moves between two identical coupled pendulums or waveguides, and explain why the transfer is incomplete if they are not identical. | Start with all the energy in one. The coupling drives the second in step, and because the two are matched the second's motion builds up coherently while the first's falls; after one coupling length (or beat period) all the energy is in the second, then it flows back. If their natural frequencies or propagation constants differ, the drive and response drift out of phase, the build-up reverses before it is complete, and only part of the energy transfers. | Coupling drives the second system from the first ; Matched systems stay in step, so transfer builds coherently ; Complete transfer after L_{c} = π/(2κ) (or one beat half-period), then back ; Mismatch causes drift out of phase ; Transfer is partial when mismatched

## Nonlinear waves
S: In nonlinear media, a wave's speed depends on its amplitude, so waves steepen, break, generate harmonics and interact with each other. Ocean waves breaking on a beach, sonic booms and frequency-doubling lasers are all nonlinear wave effects.
O: Explain why amplitude-dependent speed makes waves steepen and form shocks
O: Recognise the Burgers, KdV and nonlinear Schrödinger equations and what each describes
O: Describe nonlinear effects such as harmonic generation, modulational instability and breaking
PRE: Wave equations
LV: Year 3 · Physical reasoning
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
- Superposition fails: overlapping waves interact instead of passing through unchanged.
X: Why do waves break on a beach?
> In shallow water speed ∝ √(depth); the crest stands in deeper water than the trough, so it moves faster
> The crest overtakes the front of the wave and spills or plunges over
K: Nonlinearity makes wave speed depend on amplitude, so shapes distort, new frequencies appear and waves interact.
!: Linear theory works only for small amplitudes; extreme events like rogue waves need nonlinear models.
T: Nonlinear medium | A medium whose response is not proportional to the disturbance, so wave speed or polarisation depends on amplitude
T: Shock wave | A near-discontinuous jump in pressure or height formed when a steepening wave front is limited by dissipation
SUM: Amplitude-dependent speed steepens waves into breakers or shocks.
SUM: Burgers, KdV and NLS model steepening, its balance with dispersion, and wave-packet nonlinearity.
EV: established | Waves of large amplitude in nonlinear media steepen, generate harmonics and interact, so linear superposition no longer holds
SRC: OpenStax, University Physics Volume 1, section 17.8 "Shock Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-8-shock-waves
SRC: OpenStax, University Physics Volume 1, section 16.2 "Mathematics of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
Q: Why do large-amplitude waves steepen? | Higher-amplitude parts travel faster and catch up with lower parts.
Q: What does the KdV equation balance? | Nonlinear steepening against dispersion.
M1@3: Turning a laser beam into light of twice its frequency (second-harmonic generation) requires: | A nonlinear medium | A vacuum | Low intensity | Linear superposition | A response containing the square of the field, a χ^{(2)} nonlinearity, is needed to create light at twice the frequency.
M2@3: Rogue waves may arise from: | Modulational instability | Linear superposition only | Tides | Earthquakes only | In deep water the nonlinear Schrödinger equation predicts that uniform wave trains break into groups that can focus energy into one huge wave.
M3@1: In the inviscid Burgers equation ∂u/∂t + u ∂u/∂x = 0, why does an initially smooth hump develop a vertical front? | Each point moves at a speed equal to its own value of u, so the higher parts overtake the lower parts ahead | Dispersion spreads the hump into a front | Viscosity sharpens the front | The hump reflects from a boundary | Burgers' equation says u is carried at speed u; the taller back catches the shorter front until the slope becomes infinite.
TF1@2: The Korteweg–de Vries equation includes both a nonlinear steepening term and a dispersive term. | true | The 6u ∂u/∂x term steepens waves and the ∂^{3}u/∂x^{3} term disperses them; their balance allows solitary waves.
NUM2@1: In shallow water the wave speed is √(gh). A wave crest stands in water 2.0 m deep and its trough in 1.6 m. How much faster does the crest move, in m s^{-1}? (g = 9.8 m s^{-2}) | 0.47 | 0.03 | m s^{-1} | √(9.8 × 2.0) = 4.43 and √(9.8 × 1.6) = 3.96 m s^{-1}; the crest gains 0.47 m s^{-1} and overtakes the trough.
SA3@1,3: Explain why an ocean wave approaching a beach breaks, using the idea that wave speed depends on depth. | In shallow water the wave speed is about √(gh), so it depends on the local depth. As the seabed shelves, the depth at the crest is noticeably greater than at the trough in front, so the crest travels faster. The front face steepens until the crest overtakes it, and the wave spills or plunges: it breaks. This is nonlinear because the speed depends on the wave's own height. | Shallow-water speed ≈ √(gh) depends on depth ; Crest is in deeper water than trough ; Crest moves faster and catches up ; Front steepens and overturns (breaks) ; Amplitude-dependent speed is a nonlinear effect

## Solitons
S: A soliton is a solitary wave that keeps its shape while travelling at constant speed, because nonlinear steepening exactly balances dispersive spreading. Solitons even pass through each other and emerge intact.
O: Explain how a balance of nonlinearity and dispersion produces a soliton
O: Use the KdV soliton to relate amplitude, width and speed
O: Describe the history of solitons and where they occur
PRE: Nonlinear waves
LV: Year 3 · Physical reasoning
H: History
P: In 1834 John Scott Russell followed a smooth, rounded heap of water that travelled miles along the Union Canal without changing shape. Korteweg and de Vries explained it in 1895; the name "soliton" came in 1965, when Zabusky and Kruskal found such waves collide like particles.
H: KdV soliton
E: u(x, t) = (c/2) sech^{2}[(√c/2)(x − ct)]
- Taller solitons are narrower and faster: amplitude ∝ c, width ∝ 1/√c.
- After collisions, solitons emerge with only a phase shift.
H: Where they appear
- Shallow water waves; tidal bores; internal waves in the ocean (visible from space near Gibraltar).
- Optical fibre solitons for long-distance communication.
- Nerve impulses (in some models), DNA dynamics, Bose–Einstein condensates.
- Topological solitons in field theory: kinks, vortices, magnetic skyrmions.
X: A KdV soliton has speed c = 4. How do its amplitude and width compare with a c = 1 soliton?
> Amplitude ∝ c: 4 times taller
> Width ∝ 1/√c: half as wide
K: Dispersion spreads a pulse and nonlinearity steepens it; when they cancel exactly the pulse keeps its shape.
!: Not every solitary wave is a soliton in the strict mathematical sense; true solitons survive collisions unchanged.
T: Soliton | A localised wave that keeps its shape and speed, and survives collisions with other solitons, through a balance of nonlinearity and dispersion
T: Solitary wave | A single localised hump that travels without changing shape
SUM: Solitons balance nonlinear steepening against dispersion and survive collisions.
SUM: For KdV, speed ∝ amplitude and width ∝ 1/√speed.
EV: established | Solitons of the KdV equation keep their shape and emerge from collisions unchanged apart from a phase shift
SRC: OpenStax, University Physics Volume 1, section 16.2 "Mathematics of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
SRC: OpenStax, University Physics Volume 3, section 1.5 "Dispersion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-5-dispersion
Q: What balance creates a soliton? | Nonlinear steepening balanced by dispersion.
Q: What happens when two solitons collide? | They pass through each other and emerge with their shapes and speeds unchanged, apart from a phase shift.
M1@2: For KdV solitons, taller solitons travel: | Faster | Slower | At the same speed | Backward | For the KdV soliton the amplitude is c/2, so the speed is proportional to the amplitude: taller means faster.
M2@3: Who first observed a soliton? | John Scott Russell | Newton | Huygens | Fourier | Scott Russell followed a solitary wave along the Union Canal near Edinburgh in 1834 and later studied them in tanks.
M3@1,2: A KdV soliton is replaced by one nine times taller. How do its speed and width change? | 9 times faster and one third as wide | 3 times faster and 3 times wider | 9 times faster and 9 times narrower | Same speed and one third as wide | Amplitude ∝ c, so c rises ninefold; width ∝ 1/√c = 1/3.
TF1@1: A soliton could exist in a medium that is dispersive but perfectly linear. | false | In a linear dispersive medium every pulse spreads; nonlinearity is needed to counter the spreading.
NUM2@2: A KdV soliton u = (c/2) sech^{2}[(√c/2)(x − ct)] has amplitude 8 (in the equation's units). What is its speed c? | 16 | 0 |  | The amplitude is c/2, so c = 2 × 8 = 16.
SA3@1,3: Explain why a soliton in an optical fibre can carry a pulse over thousands of kilometres without spreading, when an ordinary pulse spreads. | An ordinary pulse contains a spread of frequencies that travel at different speeds (dispersion), so it broadens. In an intense pulse, the fibre's refractive index also depends on intensity (Kerr nonlinearity), which shifts the frequencies across the pulse. With the right pulse shape and power these two effects cancel, so the pulse keeps its shape: an optical soliton. Losses still need amplification. | Dispersion makes ordinary pulses broaden ; Intensity-dependent refractive index (nonlinearity) ; Nonlinear frequency shift opposes dispersive spreading ; Balance at the right shape and power keeps the pulse intact ; Amplifiers still make up for loss

## Wave energy and intensity
S: Waves carry energy at a rate set by their amplitude, frequency and medium. Intensity, the power per unit area, grows with the square of amplitude, which is why doubling the amplitude of a sound quadruples its power.
O: Define intensity and use I = P/A with I ∝ A^{2}
O: Calculate power and intensity for strings, sound and EM waves
O: Explain radiation pressure and the momentum carried by waves
PRE: Wave properties
LV: A level · Application
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
K: Intensity ∝ amplitude squared: energy in an oscillation goes as the square of its size.
!: Intensity scales with amplitude squared, not amplitude: halving amplitude quarters intensity.
T: Intensity | The power transmitted per unit area perpendicular to the direction of travel, in W m^{-2}
T: Radiation pressure | The pressure exerted by a wave on a surface because the wave carries momentum, I/c for light that is absorbed
SUM: I = P/A, and for any wave I ∝ A^{2}.
SUM: Waves carry momentum: light pushes with I/c on an absorber and 2I/c on a mirror.
EV: established | The intensity of a wave is proportional to the square of its amplitude
SRC: OpenStax, University Physics Volume 1, section 16.4 "Energy and Power of a Wave" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-4-energy-and-power-of-a-wave
SRC: OpenStax, University Physics Volume 2, section 16.4 "Momentum and Radiation Pressure" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/16-4-momentum-and-radiation-pressure
SRC: AQA, A-level Physics specification (7408), section 3.3.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How does wave intensity depend on amplitude? | I ∝ A^{2}.
Q: What radiation pressure does light exert on a perfect absorber? | I/c.
M1@1: Tripling a wave's amplitude increases its intensity by: | 9 | 3 | 27 | √3 | Intensity is proportional to the square of the amplitude, so tripling A multiplies I by 3^{2} = 9.
M2@2: The solar constant is about: | 1360 W m^{-2} | 1 W m^{-2} | 13 600 W m^{-2} | 136 W m^{-2} | Sunlight delivers about 1.36 kW per square metre above the atmosphere; less reaches the ground.
M3@3: Sunlight of intensity 1360 W m^{-2} falls on a perfectly reflecting solar sail of area 100 m^{2}. What force does it exert? | 9.1 × 10^{-4} N | 4.5 × 10^{-4} N | 0.27 N | 1.4 × 10^{5} N | A reflector feels 2I/c: 2 × 1360/3 × 10^{8} = 9.1 × 10^{-6} Pa, times 100 m^{2} gives 9.1 × 10^{-4} N.
NUM2@1: A 60 W point source radiates sound equally in all directions. What is the intensity 2.0 m away, in W m^{-2}? Give two significant figures. | 1.2 | 0.05 | W m^{-2} | I = P/(4πr^{2}) = 60/(4π × 4.0) = 1.19 W m^{-2}.
TF1@1: Halving the amplitude of a sound wave halves its intensity. | false | I ∝ A^{2}, so halving the amplitude reduces the intensity to a quarter, a drop of about 6 dB.
SA2@1,3: Explain why the intensity of a wave depends on the square of its amplitude, and state one consequence. | The energy of each oscillating element of the medium is like that of a simple harmonic oscillator, ½kA^{2} = ½mω^{2}A^{2}, so the energy stored per unit volume, and the rate at which the wave carries it, go as A^{2}. Consequences: doubling the amplitude quadruples the power, and coherent waves add amplitudes before squaring, which is why interference redistributes intensity. | Each element oscillates like an SHM oscillator ; Energy of SHM ∝ A^{2} (½mω^{2}A^{2}) ; Energy density and intensity therefore ∝ A^{2} ; Consequence, e.g. doubling A gives 4 × intensity

## Huygens' principle
S: Huygens' principle says every point on a wavefront acts as a source of secondary wavelets; the new wavefront is the envelope of these wavelets. It predicts reflection, refraction and, with Fresnel's addition of interference, diffraction.
O: State Huygens' principle and use it to construct a new wavefront
O: Derive the laws of reflection and refraction from wavelets
O: Explain diffraction and the Poisson–Arago spot with the Huygens–Fresnel idea
PRE: Refraction
LV: Year 1 · Application
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
K: Treat every point of a wavefront as a new source; the envelope of the wavelets is the next wavefront.
!: Huygens' principle is a geometric tool; the full justification comes from the wave equation (Kirchhoff's diffraction formula).
T: Wavefront | A surface joining points of a wave that are in the same phase
T: Secondary wavelet | A spherical wave imagined to spread from each point of a wavefront in Huygens' construction
SUM: Wavelets from every point of a wavefront build the next wavefront.
SUM: The construction gives reflection and Snell's law; adding interference (Fresnel) gives diffraction.
EV: established | The Huygens–Fresnel principle correctly predicts reflection, refraction and diffraction patterns, including the Poisson–Arago spot
SRC: OpenStax, University Physics Volume 3, section 1.6 "Huygens's Principle" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-6-huygenss-principle
SRC: OpenStax, College Physics 2e, section 27.2 "Huygens's Principle: Diffraction" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/27-2-huygenss-principle-diffraction
Q: State Huygens' principle. | Every point on a wavefront acts as a source of secondary wavelets; their envelope forms the new wavefront.
Q: What is the Poisson–Arago spot? | A bright spot at the centre of the shadow of a circular obstacle, predicted by wave theory.
M1@3: Huygens–Fresnel theory explains: | Diffraction | Photoelectric effect | Radioactivity | Nuclear fission | Wavelets from the unobstructed part of a wavefront spread into the shadow and interfere, giving diffraction patterns.
M2@2: Huygens' construction derives Snell's law from: | Different wave speeds in the two media | Particle collisions | Gravity | Polarisation | Wavelets in the slower medium grow less in the same time, tilting the wavefront so that sin θ_{1}/sin θ_{2} = v_{1}/v_{2}.
M3@2: A plane wavefront meets a boundary at an angle and enters a medium where its speed is 0.75 times as large. In Huygens' construction, what sets the new direction? | Wavelets in the second medium have radius 0.75 vΔt, so the envelope tilts towards the boundary | The wavelets in the second medium are larger, so the wave bends away from the normal | The wavelets keep the same radius, so there is no change | The frequency changes, so the wavelets change colour | Smaller wavelets in the slower medium tilt the envelope, bending the wave towards the normal with sin θ_{2} = 0.75 sin θ_{1}.
TF1@3: Wave theory predicts a bright spot at the centre of the shadow of a small circular disc. | true | Wavelets from the rim all travel the same distance to the axis and arrive in phase; Arago saw the spot in 1818.
NUM2@2: Using Huygens' construction, a wave meets a boundary at 40° and enters a medium with v_{2}/v_{1} = 0.75. What is the refraction angle in degrees? | 28.8 | 0.3 | ° | sin θ_{2} = 0.75 × sin 40° = 0.75 × 0.643 = 0.482, so θ_{2} = 28.8°.
SA2@1,2: Use Huygens' principle to explain why light bends towards the normal as it enters glass from air. | Consider a plane wavefront hitting the surface at an angle. One edge reaches the glass first and its wavelets spread more slowly in the glass, while the other edge is still in air and moves faster. In the time the air edge travels v_{1}Δt to the surface, the glass wavelet only grows to v_{2}Δt. The new envelope is tilted closer to the surface, so the direction of travel is closer to the normal, giving sin θ_{1}/sin θ_{2} = v_{1}/v_{2}. | Wavefront arrives at an angle, one edge first ; Wavelets in glass travel more slowly ; In time Δt: v_{1}Δt in air versus v_{2}Δt in glass ; Envelope tilts, so ray bends towards normal ; Gives sin θ_{1}/sin θ_{2} = v_{1}/v_{2}

## Fourier decomposition of waves
S: Any wave can be written as a sum (or integral) of sinusoidal waves of different frequencies, amplitudes and phases. Treating each component separately is often the easiest way to understand how complex waves travel, disperse and interact with systems.
O: Write a periodic wave as a Fourier series and a pulse as a Fourier integral
O: Identify the harmonic content of square, sawtooth and plucked-string waveforms
O: Use Fourier ideas to explain dispersion, spectra and diffraction patterns
PRE: Taylor and Fourier series
LV: Year 2 · Application
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
K: In a linear medium, split a wave into sinusoids, move each on with its own speed, and add them back.
!: A Fourier spectrum shows which frequencies are present over the whole record; it hides when they occur. Use a spectrogram for changing signals.
T: Fourier series | The representation of a periodic function as a sum of sines and cosines at multiples of its fundamental frequency
T: Spectrum | The set of amplitudes (or powers) of the frequency components of a signal
SUM: Any wave is a sum of sinusoids; periodic waves contain only harmonics of the fundamental.
SUM: Square waves have odd harmonics, sawtooth waves all harmonics, both with amplitudes 1/n.
EV: established | Any physically reasonable waveform can be represented as a sum or integral of sinusoidal components
SRC: OpenStax, University Physics Volume 1, section 17.5 "Sources of Musical Sound" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-5-sources-of-musical-sound
SRC: OpenStax, University Physics Volume 1, section 16.5 "Interference of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves
Q: Why does plucking a string at its middle remove even harmonics? | Even harmonics have a node at the midpoint, so they can't be excited there.
Q: How does Fourier decomposition help with dispersion? | Each frequency component travels at its own speed; recombining them shows how the wave changes shape.
M1@2: A sawtooth wave contains: | All harmonics | Only odd harmonics | Only the fundamental | No harmonics | The Fourier series of a sawtooth has every harmonic n, with amplitudes falling as 1/n.
M2@3: The far-field diffraction pattern of an aperture is: | Its Fourier transform | Its image | A uniform patch | Its derivative | In Fraunhofer diffraction the amplitude at each angle is the Fourier transform of the aperture's transmission at spatial frequency sin θ/λ.
M3@2: A square wave of fundamental 100 Hz and amplitude 1 is passed through a filter that removes everything above 400 Hz. Which components remain, and with what amplitudes relative to the fundamental? | 100 Hz (1) and 300 Hz (1/3) | 100, 200, 300 and 400 Hz, all equal | 100 Hz (1), 200 Hz (1/2) and 400 Hz (1/4) | Only 100 Hz | A square wave has only odd harmonics with amplitude 1/n, so below 400 Hz only 100 Hz and 300 Hz (amplitude 1/3) are present.
TF1@1: A Fourier series can represent only waves that are already sinusoidal. | false | Fourier's theorem says any periodic waveform, even one with sharp corners like a square wave, is a sum of sinusoids.
NUM2@2: A square wave has fundamental amplitude 12 mV. What is the amplitude of its fifth harmonic, in mV? | 2.4 | 0.05 | mV | Square-wave harmonics have amplitude ∝ 1/n, so the fifth harmonic is 12/5 = 2.4 mV.
SA2@2,3: Explain why a note from a clarinet sounds different from the same note on a flute, using the idea of Fourier decomposition. | Both notes repeat at the same fundamental frequency, so they have the same pitch. But their waveforms differ in shape, and so have different Fourier spectra: different relative amplitudes of the harmonics. A clarinet, which behaves like a pipe closed at one end, is strong in odd harmonics; a flute's spectrum is closer to a sine wave with weaker harmonics. The ear hears the harmonic content as timbre. | Same fundamental gives same pitch ; Different waveform shapes ; Different harmonic amplitudes in the Fourier spectrum ; Clarinet rich in odd harmonics (closed pipe) ; Harmonic content heard as timbre
`;
