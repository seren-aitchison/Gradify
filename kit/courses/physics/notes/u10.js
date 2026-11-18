// Unit 10: Waves and Wave Motion. Format: kit/course/notes.js
export default `
## Wave properties
S: A wave is a travelling disturbance that carries energy and momentum from place to place without carrying the medium along with it. Every wave, from ripples to light to matter waves, shares the same core properties.
LV: Introductory · Foundation
O: Describe a wave as a travelling disturbance that carries energy, not matter
O: Identify amplitude, wavelength, frequency, period and speed on wave graphs
PRE: Simple harmonic motion
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
T: Wave | A disturbance that travels through a medium or field, carrying energy and momentum
T: Amplitude | The maximum displacement from the equilibrium position
T: Wavefront | A surface joining points of the wave that are in phase
SUM: Particles of the medium oscillate about fixed positions; the pattern moves on.
SUM: A displacement–distance graph shows wavelength; a displacement–time graph shows period.
SRC: OpenStax, University Physics Volume 1, section 16.1 "Traveling Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
SRC: Crawford F. S., Waves, Berkeley Physics Course volume 3, McGraw-Hill | secondary | 1968
EV: established | Standard wave physics.
Q: Does a wave on a rope carry the rope along with it? | No: each piece of rope oscillates in place; only energy and the pattern travel.
M3@2,3: A cork bobs up and down 3 times a second as waves pass, and crests are 0.50 m apart. How far does the cork travel along the water in 10 s? | Almost nowhere: it oscillates in place while the waves move 15 m | 15 m, the distance the wave pattern travels in that time | 1.5 m, one wavelength for each of the three bobs a second | 30 m, three bobs a second for ten seconds, a metre each | The wave speed is 1.5 m s^{-1}, so the pattern moves 15 m; the cork only moves up and down (with a small circular motion).
SA2@1: Explain how you'd find a wave's wavelength and period from two graphs. | On a graph of displacement against distance (a snapshot), the wavelength is the distance between successive crests. On a graph of displacement against time at one point, the period is the time between successive crests. Frequency is 1/period, and v = fλ. | displacement–distance gives wavelength ; displacement–time gives period ; f = 1/T ; v = fλ

## Transverse and longitudinal waves
S: In a transverse wave the oscillation is perpendicular to the direction of travel; in a longitudinal wave it's along it, forming compressions and rarefactions. Some waves are a mix of both.
LV: Introductory · Foundation
O: Distinguish transverse from longitudinal waves with examples
O: Explain why only transverse waves can be polarised
PRE: Wave properties
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
T: Transverse wave | A wave whose oscillations are perpendicular to its direction of travel
T: Longitudinal wave | A wave whose oscillations are parallel to its direction of travel
T: Compression and rarefaction | Regions of higher and lower pressure in a longitudinal wave
SUM: Transverse: light, waves on strings, S-waves. Longitudinal: sound in air, P-waves.
SUM: Water surface waves and Rayleigh waves are a mixture.
SRC: OpenStax, University Physics Volume 1, section 16.1 "Traveling Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves
SRC: Shearer P. M., Introduction to Seismology, 3rd edition, Cambridge University Press | secondary | 2019
EV: established | Standard classification.
Q: Why can't sound be polarised? | It is longitudinal: the oscillation is along the direction of travel, so it has no perpendicular direction to select.
M3@2,3: An S-wave from an earthquake reaches the liquid outer core. What happens? | It can't continue as an S-wave, because liquids can't carry shear | It speeds up, because liquids are denser | It turns into a surface wave inside the core | It continues unchanged through the core | Liquids have no shear modulus, so transverse elastic waves can't travel through them; part of the energy converts to P-waves.
SA2@1,2: Describe how the particles of air move as a sound wave passes, and how this differs from a wave on a guitar string. | In sound, air molecules oscillate back and forth along the direction the wave travels, forming compressions and rarefactions: longitudinal. On a string, each bit of string moves at right angles to the direction the wave travels along the string: transverse. | sound: oscillation along the direction of travel ; compressions and rarefactions ; string: perpendicular oscillation ; transverse

## Wavelength, frequency, period and speed
S: For any periodic wave, the speed equals frequency times wavelength. Frequency is set by the source; speed by the medium; so wavelength adjusts when a wave enters a new medium.
---
M3@2,3: A 2.0 kHz sound passes from air (343 m s^{-1}) into water (1480 m s^{-1}). What are its frequency and wavelength in water? | 2.0 kHz and 0.74 m | 8.6 kHz and 0.17 m | 2.0 kHz and 0.17 m | 0.46 kHz and 0.74 m | The source sets f, which stays 2.0 kHz; λ = v/f = 1480/2000 = 0.74 m.
LV: Introductory · Foundation
O: Use v = fλ and f = 1/T
O: Explain what sets frequency, speed and wavelength when a wave enters a new medium
PRE: Transverse and longitudinal waves
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
P: **Investigate with the lab.** Change the tension and mass per metre of the string and watch the wave speed change. Then check that v = fλ for the standing wave you make.
IX: waves
Q: What happens to frequency when a wave enters a new medium? | It stays the same.
Q: What is the wavenumber? | k = 2π/λ, radians per metre.
M1: A wave with f = 50 Hz and λ = 4 m has speed: | 200 m s^{-1} | 12.5 m s^{-1} | 54 m s^{-1} | 0.08 m s^{-1} | v = fλ.
M2: Sound at 1000 Hz moves from air (343 m s^{-1}) into water (1480 m s^{-1}). Its wavelength: | Increases to 1.48 m | Decreases | Stays at 0.34 m | Becomes zero | λ = v/f.
M2: A wave has frequency 50 Hz and wavelength 0.4 m. What is its speed? | 20 m/s | 125 m/s | 0.008 m/s | 50.4 m/s | v = fλ = 50 × 0.4 = 20 m/s.
T: Wave speed | The speed at which the wave pattern travels, set by the medium
T: Wavenumber | k = 2π/λ, radians per metre
SUM: v = fλ = ω/k; f = 1/T.
SUM: The source sets f; the medium sets v; so λ changes when a wave enters a new medium.
SRC: OpenStax, University Physics Volume 1, section 16.2 "Mathematics of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-2-mathematics-of-waves
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 16 | secondary | 2013
EV: established | Exact kinematic relation for periodic waves.
Q: What is the wavelength of a 100 MHz radio wave? | λ = c/f = 3.0 × 10^{8}/10^{8} = 3.0 m.
SA2@1,2: Explain why the pitch of a note doesn't change when sound goes from air into water, though its wavelength does. | Pitch depends on frequency, which is set by the source: each compression arriving at the boundary produces one in the water, so f is unchanged. Sound is about 4.3 times faster in water, so λ = v/f is about 4.3 times longer. | frequency set by the source ; unchanged across boundary ; speed changes ; wavelength changes in proportion

## Wave equations
S: The one-dimensional wave equation says the acceleration of each bit of medium is proportional to the curvature of the wave there. Any function of (x − vt) solves it, so shapes travel unchanged at speed v.
LV: Intermediate · Foundation
O: Write and interpret the one-dimensional wave equation
O: Show that any function f(x ± vt) solves it, and derive v for a string
PRE: Partial differential equations
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
T: Wave equation | ∂^{2}y/∂t^{2} = v^{2} ∂^{2}y/∂x^{2}
T: d'Alembert solution | y = f(x − vt) + g(x + vt): any shape travelling right plus any travelling left
SUM: String: v = √(T/μ). Sound in a gas: v = √(γp/ρ). Light: v = 1/√(εμ).
SUM: y = A sin(kx − ωt) is a solution when ω = vk.
SRC: OpenStax, University Physics Volume 1, section 16.3 "Wave Speed on a Stretched String" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-3-wave-speed-on-a-stretched-string
SRC: French A. P., Vibrations and Waves, chapter 7, Norton | secondary | 1971
EV: established | Exact for small-amplitude waves in a linear, non-dispersive medium.
Q: What sets the speed of a wave on a string? | The tension and the mass per unit length: v = √(T/μ).
M3@2,3: A guitar string's tension is increased by 21%. By how much does its wave speed (and pitch) rise? | About 10% | About 21% | About 44% | About 4.6% | v ∝ √T: √1.21 = 1.10, so speed and fundamental frequency rise by 10%.
SA2@2: Show that y = A sin(kx − ωt) satisfies the wave equation and find the condition on ω and k. | ∂^{2}y/∂t^{2} = −ω^{2}y and ∂^{2}y/∂x^{2} = −k^{2}y. Substituting: −ω^{2}y = −v^{2}k^{2}y, which holds when ω = vk, i.e. v = ω/k = fλ. | second time derivative ; second space derivative ; substitute ; ω = vk

## Wave propagation
S: As waves travel they spread out, lose energy to the medium, and may change speed and shape. Understanding propagation explains why sound fades, why radio reaches round the Earth, and why earthquakes are felt far away.
LV: Introductory · Foundation
O: Describe how waves spread, weaken and are absorbed as they travel
O: Use the inverse-square law for spherical waves
PRE: Wave properties
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
T: Attenuation | Loss of wave intensity with distance through absorption and scattering
T: Spherical wave | A wave spreading in all directions from a point source
SUM: Spherical spreading: I ∝ 1/r^{2}; cylindrical: I ∝ 1/r; plane waves don't spread.
SUM: Absorption adds an exponential decline, e^{−αx}, on top of spreading.
SRC: OpenStax, University Physics Volume 1, section 17.4 "Sound Intensity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-4-sound-intensity
SRC: Kinsler L. E., Frey A. R., Coppens A. B., Sanders J. V., Fundamentals of Acoustics, 4th edition, Wiley | secondary | 2000
EV: established | Standard wave propagation.
Q: Why do whale calls travel thousands of kilometres in the ocean? | Low frequencies are absorbed weakly, and a sound channel (the SOFAR layer) traps sound so it spreads cylindrically, not spherically.
M3@2,3: A speaker's sound intensity is 1.0 × 10^{-4} W m^{-2} at 2.0 m. What is it at 8.0 m, ignoring absorption? | 6.3 × 10^{-6} W m^{-2} | 2.5 × 10^{-5} W m^{-2}, using 1/r | 1.6 × 10^{-5} W m^{-2}, using 1/r^{1.3} | 1.0 × 10^{-4} W m^{-2}, unchanged | Four times further: I falls by 4^{2} = 16, to 6.25 × 10^{-6} W m^{-2}.
SA2@1,2: Explain why distant thunder sounds like a low rumble while nearby thunder cracks. | Air absorbs high frequencies more strongly than low ones, so over kilometres the sharp high-frequency components are lost and mainly low frequencies arrive. Sound from different parts of the long lightning channel also arrives at different times, spreading it into a rumble. | high frequencies absorbed more ; low frequencies survive distance ; long channel at different distances ; arrivals spread out

## Phase and group velocity
S: The phase velocity is how fast individual wave crests move; the group velocity is how fast the envelope of a wave packet, and hence energy and information, moves. They differ whenever the wave speed depends on frequency.
LV: Intermediate · Foundation
O: Distinguish phase velocity ω/k from group velocity dω/dk
O: Explain which one carries energy and information
PRE: Wave equations
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
T: Phase velocity | v_{p} = ω/k, the speed of individual crests
T: Group velocity | v_{g} = dω/dk, the speed of the envelope of a wave group
T: Dispersion relation | The function ω(k) for a medium
SUM: In a non-dispersive medium v_{p} = v_{g}; with dispersion they differ.
SUM: Energy and information travel at the group velocity (in normal dispersion, never faster than c).
SRC: Crawford F. S., Waves, Berkeley Physics Course volume 3, chapter 6, McGraw-Hill | secondary | 1968
SRC: Brillouin L., Wave Propagation and Group Velocity, Academic Press | secondary | 1960
EV: established | Standard wave physics; in anomalous dispersion v_{g} can exceed c without signals doing so.
Q: For deep-water waves, v_{p} = 2v_{g}. What do you see in a group of waves? | Crests appear at the back of the group, travel through it and vanish at the front.
M3@2,3: For deep-water waves ω = √(gk). What is the ratio of group to phase velocity? | 1/2 | 2 | 1 | 1/4 | v_{p} = √(g/k); v_{g} = dω/dk = ½√(g/k); so v_{g}/v_{p} = ½.
SA2@1,2: Explain why the phase velocity of X-rays in glass slightly exceeding c doesn't break relativity. | Phase velocity is the speed of crests of an infinite, unchanging wave, which carries no information. A signal needs a change in the wave (a pulse), which travels at the group velocity (more strictly, the front velocity), and that doesn't exceed c. | phase velocity carries no information ; signals need modulation ; travel at group or front velocity ; which is at most c

## Superposition
S: When waves overlap in a linear medium, the total displacement at each point is the sum of the individual displacements. Waves pass through each other unchanged; superposition explains interference, standing waves, beats and Fourier analysis.
LV: Introductory · Foundation
O: State the principle of superposition and when it applies
O: Add waves graphically and algebraically
PRE: Wave equations
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
P: **Investigate with the lab.** Add two waves with equal amplitude and set the phase difference to 180°: they cancel completely. Then set it to 0° and see the amplitude double.
IX: waves
Q: State the principle of superposition. | When waves overlap, the resultant displacement is the sum of the individual displacements.
Q: When does superposition fail? | In nonlinear media, typically at large amplitudes.
M1: Two waves of amplitude 4 cm meet in antiphase. The resultant amplitude is: | 0 | 8 cm | 4 cm | 16 cm | They cancel.
M2: Frequency doubling of laser light shows: | A nonlinear medium | Superposition | Diffraction | Polarisation | Nonlinear optics.
M2: Two equal waves meet exactly out of phase. What is the result? | They cancel to zero displacement | They double in amplitude | They reflect off each other | They change frequency | By superposition, displacements add; equal and opposite displacements cancel.
T: Principle of superposition | In a linear medium, the net displacement is the sum of the individual displacements
T: Linear medium | One where the restoring force is proportional to displacement, so wave equations are linear
SUM: Waves pass through each other unchanged after overlapping.
SUM: Superposition fails in nonlinear media (very loud sound, intense laser light, breaking waves).
SRC: OpenStax, University Physics Volume 1, section 16.5 "Interference of Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-5-interference-of-waves
SRC: French A. P., Vibrations and Waves, Norton | secondary | 1971
EV: established | Exact for linear media.
Q: What happens to two pulses after they pass through each other on a string? | They continue unchanged, as if they had never met.
M3@2,3: A +3 cm pulse and a −2 cm pulse of the same shape overlap exactly on a string. What is the displacement where they coincide? | +1 cm | +5 cm | −1 cm | 0 cm | Displacements add with sign: +3 + (−2) = +1 cm.
SA2@1: Explain why noise-cancelling headphones work and why they work best at low frequencies. | A microphone picks up outside noise and the speaker plays an inverted copy. By superposition the two cancel at the ear. Low frequencies have long wavelengths and change slowly, so the electronics' delay and small position differences matter little; high frequencies are harder to cancel accurately, so they rely on passive padding. | microphone detects noise ; speaker plays inverted signal ; superposition cancels ; easier for long wavelengths

## Interference
S: Interference is the pattern of reinforcement and cancellation when coherent waves overlap. It's the signature of wave behaviour, and it measures wavelengths, distances and surface flatness to a fraction of a wavelength.
LV: Introductory · Application
O: Explain the need for coherence in observing interference
O: Use Young's double-slit formula to find fringe spacing
PRE: Superposition
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
P: **Investigate with the lab.** Vary the phase difference between two waves from 0° to 360° and watch the combined amplitude rise and fall.
IX: waves
P: **Investigate with the lab.** Look at the double-slit pattern and identify where the waves from the two slits arrive in phase and in antiphase.
IX: interference
Q: What is coherence? | A constant phase relationship between waves.
Q: What is the fringe spacing in Young's experiment? | λD/d.
M1: Increasing the slit separation in Young's experiment makes fringes: | Closer together | Further apart | Brighter | Disappear | x ∝ 1/d.
M2: Interference of single electrons shows: | Each electron behaves as a wave going through both slits | Electrons are classical particles | Electrons interact with each other | The experiment is faulty | Quantum superposition.
M2: What phase difference gives maximum constructive interference? | 0° or a whole number of cycles | 90° | 180° | 270° | Waves in phase add to give the largest amplitude.
M2: On the screen of a double-slit experiment, what makes a dark fringe? | Waves from the two slits arriving in antiphase | Light being absorbed by the screen | No light passing through either slit | Waves arriving exactly in phase | A path difference of half a wavelength, or an odd number of half wavelengths, gives cancellation.
T: Coherence | A constant phase relationship between waves, needed for a stable interference pattern
T: Fringe spacing | w = λD/s for Young's slits (D: distance to screen, s: slit separation)
SUM: Bright fringes where path difference = nλ; dark where it is (n + ½)λ.
SUM: Young's experiment (1801–1804) was key evidence that light is a wave.
SRC: Young T., "The Bakerian Lecture: Experiments and calculations relative to physical optics", Philosophical Transactions of the Royal Society 94, 1–16 | primary | 1804 | https://doi.org/10.1098/rstl.1804.0001
SRC: Hecht E., Optics, 5th edition, chapter 9, Pearson | secondary | 2017
EV: established | Standard optics, confirmed for light, electrons, atoms and molecules.
Q: Why don't two car headlights produce an interference pattern? | They aren't coherent: their phases vary randomly and rapidly.
M3@2,3: In a Young's experiment, s = 0.50 mm, D = 2.0 m and the fringes are 2.4 mm apart. What is the wavelength? | 600 nm | 240 nm | 2.4 μm | 60 nm | λ = ws/D = 2.4 × 10^{-3} × 5.0 × 10^{-4}/2.0 = 6.0 × 10^{-7} m.
SA2@2: Explain what happens to Young's fringes if the slit separation is halved and why. | Fringe spacing w = λD/s, so halving s doubles w: the fringes spread out. Closer slits mean the path difference changes more slowly with angle, so a larger angle is needed to change it by one wavelength. | w = λD/s ; halving s doubles w ; path difference changes more slowly ; larger angle per fringe

## Constructive and destructive interference
S: Waves interfere constructively where they arrive in phase (path difference a whole number of wavelengths) and destructively where they arrive in antiphase (an odd number of half wavelengths).
LV: Introductory · Application
O: Relate path difference and phase difference to constructive and destructive interference
O: Apply this to two-source sound and thin-film colours
PRE: Interference
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
P: **Investigate with the lab.** Set the phase difference to 0°, 180° and 360° in turn and record the combined amplitude each time.
IX: waves
Q: What path difference gives destructive interference for in-phase sources? | An odd number of half wavelengths.
Q: What phase change occurs on reflection from a denser medium? | π (half a wavelength).
M1: Two speakers in phase are 3.0 m and 3.5 m from you; λ = 1.0 m. You hear: | A quiet spot (destructive) | A loud spot | No sound change | Beats | Δ = 0.5λ.
M2: Two equal waves interfering constructively give intensity: | 4 times one wave's | 2 times | The same | Zero | Amplitude doubles, intensity ∝ A^{2}.
M2: Two waves arrive with a path difference of 1.5 wavelengths. What kind of interference occurs? | Destructive | Constructive | Neither, they don't interact | It depends only on amplitude | A path difference of a whole number plus a half wavelength puts the waves in antiphase.
T: Path difference | The difference in distance travelled by two waves to a point
T: Phase difference | Δφ = 2π × path difference / λ, plus any phase changes on reflection
SUM: Constructive: Δφ = 2πn; destructive: Δφ = (2n + 1)π.
SUM: Reflection from a denser medium adds a phase change of π (half a wavelength).
SRC: OpenStax, University Physics Volume 3, section 3.4 "Interference in Thin Films" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/3-4-interference-in-thin-films
SRC: Hecht E., Optics, 5th edition, chapter 9, Pearson | secondary | 2017
EV: established | Standard optics.
Q: What path difference gives destructive interference for two in-phase sources? | An odd number of half-wavelengths: (n + ½)λ.
M3@2,3: An anti-reflection coating (n = 1.38) on glass (n = 1.5) should cancel 550 nm reflection. What is its minimum thickness? | About 100 nm | About 200 nm | About 400 nm | About 50 nm | Both reflections have a π shift, so cancellation needs 2nt = λ/2: t = 550/(4 × 1.38) ≈ 100 nm.
SA2@1,2: Two speakers play the same 340 Hz tone in phase. You stand 3.0 m from one and 3.5 m from the other. Is it loud or quiet there (v = 340 m s^{-1})? | λ = v/f = 1.0 m. The path difference is 0.50 m = λ/2, so the waves arrive in antiphase: destructive interference, a quiet spot (not silent, as the amplitudes differ slightly). | λ = 1.0 m ; path difference 0.50 m ; half a wavelength ; destructive, quiet

## Standing waves
S: A standing wave forms when two identical waves travel in opposite directions, usually a wave and its reflection. Some points (nodes) never move; others (antinodes) oscillate with maximum amplitude, and energy stays trapped between them.
LV: Introductory · Application
O: Explain how a standing wave forms from two opposite travelling waves
O: Find the harmonics of strings and pipes
PRE: Constructive and destructive interference
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
P: **Investigate with the lab.** Send two equal waves in opposite directions and get a standing wave. Find the nodes, where the string never moves.
IX: waves
Q: How far apart are adjacent nodes? | Half a wavelength.
Q: How does a standing wave differ from a travelling wave? | Its amplitude varies with position, points between nodes oscillate in phase, and it transfers no net energy.
M1: The fundamental of a 0.6 m string with v = 240 m s^{-1} is: | 200 Hz | 400 Hz | 100 Hz | 144 Hz | f = v/2L.
M2: Points on either side of a node oscillate: | In antiphase | In phase | Not at all | At different frequencies | sin kx changes sign at a node.
M2: What is the distance between two neighbouring nodes in a standing wave? | Half a wavelength | One wavelength | A quarter of a wavelength | Two wavelengths | Nodes occur every half wavelength.
T: Node | A point of zero amplitude in a standing wave
T: Antinode | A point of maximum amplitude in a standing wave
T: Harmonic | A standing-wave mode at a whole-number multiple of the fundamental frequency
SUM: Nodes are λ/2 apart; a standing wave transfers no net energy along the medium.
SUM: String or open pipe: f_{n} = nv/(2L), all n. Closed pipe: f_{n} = nv/(4L), odd n only.
SRC: OpenStax, University Physics Volume 1, section 16.6 "Standing Waves and Resonance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
EV: established | Standard; real pipes need an end correction of about 0.6 times the radius.
Q: How far apart are adjacent nodes? | Half a wavelength.
M3@2,3: A pipe closed at one end is 0.85 m long (v = 340 m s^{-1}). What are its two lowest resonant frequencies? | 100 Hz and 300 Hz | 200 Hz and 400 Hz | 100 Hz and 200 Hz | 50 Hz and 150 Hz | f_{1} = v/(4L) = 100 Hz; closed pipes have only odd harmonics, so next is 300 Hz.
SA2@1,2: Explain how the points on a standing wave between two nodes move, compared with a travelling wave. | In a standing wave all points between two adjacent nodes move in phase, reaching their maxima together, with amplitudes varying from zero at the nodes to a maximum at the antinode. In a travelling wave every point has the same amplitude but the phase changes steadily along the wave. | in phase between nodes ; amplitude varies with position ; travelling: same amplitude ; travelling: phase varies with position

## Reflection and transmission
S: When a wave meets a boundary between two media, part is reflected and part transmitted. The fractions and phases depend on how different the media's impedances are.
LV: Intermediate · Foundation
O: Calculate reflection and transmission at a boundary from impedances
O: Predict the phase of the reflected wave
PRE: Standing waves
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
T: Impedance | Z, a medium's opposition to wave motion: √(Tμ) for a string, ρv for sound
T: Reflection coefficient | r = (Z_{1} − Z_{2})/(Z_{1} + Z_{2}) for amplitude
SUM: Matched impedances transmit everything; a large mismatch reflects almost everything.
SUM: Reflection off a higher-impedance (fixed) end inverts the wave; off a lower-impedance (free) end it doesn't.
SRC: Crawford F. S., Waves, Berkeley Physics Course volume 3, chapter 5, McGraw-Hill | secondary | 1968
SRC: Kinsler L. E., Frey A. R., Coppens A. B., Sanders J. V., Fundamentals of Acoustics, 4th edition, Wiley | secondary | 2000
EV: established | Standard results for normal incidence.
Q: Why is gel used in ultrasound scans? | It removes the air gap: air's impedance is so different from skin's that almost all the ultrasound would reflect.
M3@2,3: Sound passes from air (Z ≈ 410 kg m^{-2} s^{-1}) into water (Z ≈ 1.5 × 10^{6}). What fraction of the intensity is transmitted? | About 0.1% | About 50% | About 99.9% | About 10% | Intensity transmission = 4Z_{1}Z_{2}/(Z_{1} + Z_{2})^{2} ≈ 4 × 410/1.5 × 10^{6} ≈ 0.0011.
SA2@1: A pulse travels from a light string to a heavy string. Describe the reflected and transmitted pulses. | The heavy string has the higher impedance. Part of the pulse is transmitted, upright and slower (with a smaller amplitude); part is reflected inverted, because the junction acts partly like a fixed end. | heavy string has higher impedance ; transmitted pulse upright and slower ; reflected pulse inverted ; acts like a partly fixed end

## Refraction
S: Refraction is the change in direction of a wave when it enters a medium where its speed is different, at an angle. Snell's law gives the new direction, and it explains lenses, rainbows, mirages and fibre optics.
LV: Introductory · Application
O: Apply Snell's law and calculate critical angles
O: Explain refraction from the change in wave speed
PRE: Wavelength, frequency, period and speed
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
T: Refractive index | n = c/v, how much a medium slows light
T: Critical angle | sin θ_{c} = n_{2}/n_{1}, beyond which total internal reflection occurs
T: Total internal reflection | Complete reflection of a wave at a boundary with a slower-to-faster speed change, beyond the critical angle
SUM: n_{1} sin θ_{1} = n_{2} sin θ_{2}; waves bend towards the normal when they slow down.
SUM: Optical fibres keep light in by total internal reflection.
SRC: OpenStax, University Physics Volume 3, section 1.3 "Refraction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction
SRC: Hecht E., Optics, 5th edition, chapter 4, Pearson | secondary | 2017
EV: established | Standard optics.
Q: Why do waves on a beach arrive nearly parallel to the shore? | They slow in shallower water, so the part nearer the shore lags, turning the wavefronts parallel to it.
M3@2,3: What is the critical angle for light going from glass (n = 1.50) into water (n = 1.33)? | About 62° | About 42° | About 49° | About 90° | sin θ_{c} = 1.33/1.50 = 0.887, θ_{c} ≈ 62°.
SA2@2: Light enters water (n = 1.33) from air at 40° to the normal. Find the angle of refraction and explain the direction of bending. | sin θ_{2} = sin 40°/1.33 = 0.643/1.33 = 0.483, so θ_{2} ≈ 29°. Light slows in water, so the side of the wavefront entering first lags, bending the ray towards the normal. | Snell's law ; sin θ_{2} ≈ 0.483 ; θ_{2} ≈ 29° ; bends towards the normal because it slows

## Diffraction
S: Diffraction is the spreading of waves when they pass through gaps or around obstacles. It's strongest when the gap is comparable to the wavelength, and it limits the resolution of every optical instrument.
LV: Introductory · Application
O: Explain when diffraction is significant
O: Use the single-slit and diffraction-grating formulae
PRE: Interference
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
P: **Investigate with the lab.** Narrow and widen a single slit and watch the central maximum change width. Compare the pattern with a double slit.
IX: interference
Q: When is diffraction most noticeable? | When the gap or obstacle size is comparable to the wavelength.
Q: State the Rayleigh criterion. | Two point sources are just resolved when θ ≈ 1.22λ/D.
M1: A grating with 500 lines per mm and 600 nm light gives a first order at: | 17.5° | 30° | 0.3° | 60° | d = 2 μm; sin θ = 0.3.
M2: Narrowing a single slit makes the central maximum: | Wider | Narrower | Brighter | Disappear | Width ∝ λ/a.
M2: When is diffraction through a gap most noticeable? | When the gap is about the same size as the wavelength | When the gap is much larger than the wavelength | When the light is very bright | Only when the wave is sound | Diffraction is greatest when the gap width is comparable to the wavelength.
T: Diffraction | Spreading of waves through gaps and around obstacles
T: Diffraction grating | Many equally spaced slits giving sharp maxima at d sin θ = nλ
SUM: Single slit: first minimum at sin θ = λ/a; spreading is large when a ~ λ.
SUM: Grating: d sin θ = nλ, used to measure wavelengths and in spectrometers.
SRC: OpenStax, University Physics Volume 3, chapter 4 "Diffraction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/4-introduction
SRC: Hecht E., Optics, 5th edition, chapter 10, Pearson | secondary | 2017
EV: established | Standard optics.
Q: Why can you hear round a corner but not see round it? | Sound wavelengths (metres) are comparable to doorways and diffract strongly; light wavelengths (under a micrometre) don't.
M3@2,3: A grating has 500 lines per mm. At what angle is the first-order maximum for 600 nm light? | About 17° | About 35° | About 0.3° | About 60° | d = 2.0 × 10^{-6} m; sin θ = 600 × 10^{-9}/2.0 × 10^{-6} = 0.30, θ ≈ 17.5°.
SA2@1,2: Explain why astronomers build telescopes with larger mirrors to see finer detail. | Light diffracts at the telescope's aperture, blurring each point into a spot of angular size about 1.22λ/D. A larger diameter D makes the spot smaller, so closer objects can be resolved; it also gathers more light. | diffraction at the aperture ; angular spread about 1.22λ/D ; larger D gives finer resolution ; more light gathered

## Dispersion
S: Dispersion is the dependence of wave speed on frequency. It splits white light into colours, spreads pulses in optical fibres, and shapes water waves and seismic signals.
LV: Intermediate · Foundation
O: Define dispersion and give examples in light, water and sound
O: Explain how dispersion spreads pulses in optical fibres
PRE: Phase and group velocity
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
T: Dispersion | Dependence of wave speed on frequency
T: Normal dispersion | Refractive index rising with frequency, so blue light travels slower than red in glass
T: Chromatic dispersion | Spreading of a light pulse because its different colours travel at different speeds
SUM: A prism separates colours because n depends on wavelength.
SUM: In fibres, dispersion lengthens pulses and limits the data rate; it is near zero around 1.3 μm in standard silica fibre.
SRC: Hecht E., Optics, 5th edition, chapter 3, Pearson | secondary | 2017
SRC: Agrawal G. P., Fiber-Optic Communication Systems, 4th edition, Wiley | secondary | 2010
EV: established | Standard optics.
Q: Which colour is bent most by a glass prism? | Violet, which has the highest refractive index (normal dispersion).
M3@2,3: Why do rainbows have red on the outside and violet on the inside? | Red is refracted less in water droplets, so it reaches the eye from a larger angle | Red light is scattered more strongly by the air around the drops | Violet light is mostly absorbed inside the water droplets | Red is reflected twice inside each drop and violet only once | The primary bow is at about 42° for red and 40° for violet from the antisolar point, because n is larger for violet.
SA2@2: Explain why dispersion limits how fast data can be sent along an optical fibre. | Each pulse contains a range of wavelengths that travel at slightly different speeds, so the pulse spreads out with distance. If pulses spread into their neighbours they can't be told apart, so pulses must be spaced further apart, limiting the bit rate for a given length. | pulses contain a range of wavelengths ; different speeds spread the pulse ; spreading causes overlap ; limits bit rate

## Polarisation
S: Polarisation describes the direction of oscillation of a transverse wave. Light can be polarised by filters, reflection, scattering and certain crystals, and polarisation is used in sunglasses, screens, 3D cinema and stress analysis.
LV: Introductory · Application
O: Explain polarisation of transverse waves
O: Apply Malus's law and Brewster's angle
PRE: Transverse and longitudinal waves
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
T: Plane polarised | Oscillating in a single plane
T: Malus's law | I = I_{0} cos^{2} θ, intensity through an analyser at angle θ
T: Brewster's angle | tan θ_{B} = n_{2}/n_{1}: reflected light is fully polarised
SUM: An ideal polariser halves unpolarised light; crossed polarisers block it.
SUM: Reflected glare is partly polarised, which is why polarising sunglasses cut it.
SRC: OpenStax, University Physics Volume 3, section 1.8 "Polarization" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-8-polarization
SRC: Hecht E., Optics, 5th edition, chapter 8, Pearson | secondary | 2017
EV: established | Standard optics.
Q: What fraction of unpolarised light passes through one ideal polariser? | Half.
M3@2,3: Unpolarised light passes three polarisers at 0°, 45° and 90°. What fraction gets through? | 1/8 | 0 | 1/4 | 1/2 | ½ × cos^{2} 45° × cos^{2} 45° = ½ × ½ × ½ = 1/8; without the middle one, none would.
SA2@1,2: Explain how polarising sunglasses reduce glare from a road. | Light reflected from a horizontal surface is partly polarised horizontally (fully at Brewster's angle). Polarising sunglasses have their transmission axis vertical, so they block much of the horizontally polarised reflected glare while passing about half of the unpolarised light from elsewhere. | reflected light partly horizontally polarised ; Brewster's angle ; lenses transmit vertical ; block glare

## Wave packets
S: A wave packet is a localised wave made by superposing many waves with a range of wavelengths. Its width and its spread in wavenumber are inversely related, which is the root of the quantum uncertainty principle.
LV: Intermediate · Foundation
O: Build a wave packet by superposing waves with a range of wavenumbers
O: Explain the reciprocal relation between packet width and wavenumber spread
PRE: Phase and group velocity
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
T: Wave packet | A localised wave made by adding waves with a spread of wavelengths
T: Bandwidth theorem | Δx Δk ≳ 1 (or Δt Δω ≳ 1): a short packet needs a wide spread of frequencies
SUM: A packet moves at the group velocity; in a dispersive medium it spreads as it travels.
SUM: With p = ħk, the bandwidth theorem becomes the uncertainty relation Δx Δp ≳ ħ.
SRC: Crawford F. S., Waves, Berkeley Physics Course volume 3, chapter 6, McGraw-Hill | secondary | 1968
SRC: OpenStax, University Physics Volume 3, section 7.2 "The Heisenberg Uncertainty Principle" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/7-2-the-heisenberg-uncertainty-principle
EV: established | Exact Fourier result.
Q: Why does a perfectly monochromatic wave have to be infinitely long? | A single wavenumber has Δk = 0, so its extent Δx must be infinite.
M3@2,3: A radar pulse lasts 1.0 μs. Roughly what bandwidth must the radar receiver accept? | About 1 MHz | About 1 kHz | About 1 GHz | About 1 Hz | Δf ≈ 1/Δt = 1/10^{-6} s = 10^{6} Hz.
SA2@2: Explain why a wave packet spreads out as it travels through a dispersive medium. | The packet is made of components with different wavelengths. In a dispersive medium they travel at different speeds, so their relative phases change with distance; the region where they add constructively grows wider, and the packet spreads (and its peak falls). | packet has many wavelengths ; different speeds in dispersive medium ; phases drift apart ; packet widens

## Beats
S: Beats are the slow periodic swelling and fading of loudness when two waves of slightly different frequencies combine. The beat frequency equals the difference of the two frequencies.
LV: Introductory · Application
O: Explain beats in terms of the superposition of travelling waves
O: Use beats to measure an unknown frequency
PRE: Superposition
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
P: **Investigate with the lab.** Tune two notes until you hear and see 2 beats per second. Then change one frequency and predict the new beat frequency before you listen.
IX: waves
Q: What is the beat frequency? | The difference between the two frequencies.
Q: Why do beats disappear when two strings are in tune? | Their frequency difference is zero.
M1: Two sources at 500 Hz and 506 Hz produce: | 6 beats per second | 3 beats per second | 1006 beats | 503 beats | Difference.
M2: The perceived pitch during beating is: | The average of the two frequencies | The difference | The sum | The lower frequency | The carrier is f̄.
M2: Two notes of 440 Hz and 443 Hz sound together. What is the beat frequency? | 3 Hz | 441.5 Hz | 883 Hz | 1.5 Hz | The beat frequency is the difference between the two frequencies.
T: Beat frequency | f_{beat} = |f_{1} − f_{2}|, the rate at which loudness rises and falls
T: Envelope | The slowly varying outline of the amplitude of a beating signal
SUM: Two waves of nearly equal frequency drift in and out of phase |f_{1} − f_{2}| times per second.
SUM: Beats measure small frequency differences precisely, in tuning and in heterodyne receivers.
SRC: OpenStax, University Physics Volume 1, section 17.7 "Beats" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-7-beats
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
EV: established | Exact result of superposition.
Q: What happens to the beats as two notes are tuned closer together? | They slow down, and stop when the frequencies are equal.
M3@2,3: A police radar sends 24.0 GHz and receives the echo from a car mixed back in, beating at 4.0 kHz. How fast is the car (c = 3.0 × 10^{8} m s^{-1})? | 25 m s^{-1} | 50 m s^{-1} | 12.5 m s^{-1} | 100 m s^{-1} | The echo's Doppler shift is Δf = 2vf/c, so v = cΔf/(2f) = 3 × 10^{8} × 4000/(4.8 × 10^{10}) = 25 m s^{-1}.
SA2@1: A tuning fork of 440 Hz and a violin string give 5 beats per second. Adding a little wax to the fork (lowering its frequency) makes the beats faster. What is the string's frequency? | The string is 435 or 445 Hz. Lowering the fork's frequency increased the difference, so the string must be below the fork: 435 Hz. | two possible values ; wax lowers the fork ; faster beats mean a larger difference ; 435 Hz

## Boundary conditions
S: Boundary conditions specify what a wave must do at the edges of its medium: fixed, free, or matched to another medium. They determine reflection, the allowed standing-wave patterns, and therefore the resonant frequencies.
LV: Intermediate · Foundation
O: State fixed, free and matched boundary conditions for waves
O: Explain how boundary conditions select allowed wavelengths
PRE: Reflection and transmission
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
P: **Investigate with the lab.** Make standing waves on the string and check that both fixed ends are always nodes.
IX: waves
Q: What boundary condition does an open pipe end impose on displacement? | An antinode (approximately, with an end correction).
Q: Why does a pipe closed at one end have only odd harmonics? | A node at one end and an antinode at the other fit only odd quarter-wavelengths.
M1: A string fixed at both ends supports wavelengths: | 2L/n | 4L/n odd n | L/n | 4L | Nodes at both ends.
M2: At the surface of a perfect conductor, the tangential electric field is: | Zero | Maximum | Equal to the normal field | Undefined | Charges move to cancel it.
M2: For a string fixed at both ends, what must the length be? | A whole number of half wavelengths | A whole number of quarter wavelengths | Exactly one wavelength | Any length at all | Both ends must be nodes, so L = nλ/2.
T: Fixed (Dirichlet) boundary | The displacement is zero at the boundary
T: Free (Neumann) boundary | The slope (or pressure, for an open pipe) is zero at the boundary
SUM: Fixed ends are nodes; free ends are antinodes.
SUM: At a junction, displacement and force (or pressure and flow) must match on both sides.
SRC: French A. P., Vibrations and Waves, chapter 6, Norton | secondary | 1971
SRC: Crawford F. S., Waves, Berkeley Physics Course volume 3, McGraw-Hill | secondary | 1968
EV: established | Standard wave physics.
Q: Is the open end of a pipe a displacement node or antinode? | An antinode of displacement (a node of pressure).
M3@2,3: A string fixed at x = 0 and free at x = L (a ring on a frictionless rod). What are its allowed wavelengths? | 4L/n for odd n | 2L/n for all n | L/n for all n | 4L/n for all n | A node at one end and an antinode at the other fit an odd number of quarter-wavelengths: L = nλ/4, n = 1, 3, 5…
SA2@1,2: Explain why boundary conditions lead to quantised energies for an electron in an atom. | The electron's wavefunction must satisfy boundary conditions (finite everywhere, falling to zero far away, single-valued around the nucleus). Like a string fixed at both ends, only certain standing-wave patterns fit, and each has a definite energy, so only discrete energy levels are allowed. | wavefunction must meet conditions ; only certain standing patterns fit ; each has a fixed energy ; discrete levels

## Resonant modes
S: A bounded system can only sustain standing waves whose shapes fit its boundary conditions: its resonant modes. Each mode has a particular frequency, and the set of them gives instruments their sound, cavities their colours and atoms their energy levels.
LV: Intermediate · Application
O: Find the resonant modes of strings, pipes, membranes and cavities
O: Explain why drums and bells sound less tuneful than strings
PRE: Standing waves
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
P: **Investigate with the lab.** Show the third harmonic and count its nodes. Predict the frequency of the fourth harmonic from the first.
IX: waves
Q: Why do drums have less definite pitch than strings? | Their mode frequencies aren't integer multiples of a fundamental.
Q: What is the spacing between longitudinal modes in a laser cavity? | c/(2L).
M1: The second harmonic of a 100 Hz fundamental string is: | 200 Hz | 150 Hz | 50 Hz | 400 Hz | 2f_{1}.
M2: Why do small rooms have uneven bass? | Low-frequency room modes are widely spaced | Bass is absorbed | Walls are too hard | Speakers can't produce bass | Few modes, separated in frequency.
M2: A string's fundamental frequency is 100 Hz. What is the frequency of its third harmonic? | 300 Hz | 150 Hz | 900 Hz | 33 Hz | For a string fixed at both ends, the nth harmonic is n times the fundamental.
T: Mode | A standing-wave pattern with its own resonant frequency
T: Overtone | Any resonant frequency above the fundamental; harmonic only if a whole-number multiple
SUM: Strings and pipes have harmonic overtones; membranes and plates have inharmonic ones.
SUM: Cavities (microwave ovens, lasers, rooms) have 3D modes set by all their dimensions.
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
SRC: Fletcher N. H., Rossing T. D., The Physics of Musical Instruments, 2nd edition, Springer | secondary | 1998
EV: established | Standard acoustics.
Q: Why does a drum sound less "pitched" than a guitar? | A drum membrane's overtones aren't whole-number multiples of its fundamental.
M3@2,3: A microwave oven's cavity has modes with nodes a few cm apart. Why do ovens use turntables? | Food at nodes would stay cold; turning it moves every part through the hot antinodes | To stop the microwaves from leaking out through the oven door | To change the frequency of the microwaves as the food heats up | To keep the magnetron running cool and at its best efficiency | The standing-wave pattern is fixed in the cavity, so moving the food averages out the hot and cold spots.
SA2@2: A room is 5.0 m long (v = 343 m s^{-1}). Find its lowest axial mode along that length and explain why it matters for listening to bass. | f = v/(2L) = 343/10 ≈ 34 Hz, with harmonics at 69, 103 Hz… At these frequencies standing waves make bass boom loudly at some places (antinodes) and nearly vanish at others (nodes), so bass sounds uneven around the room. | f = v/2L ; about 34 Hz ; harmonics follow ; uneven bass at nodes and antinodes

## Coupled waves
S: When two wave systems are linked, energy can pass between them. Coupled waves explain directional couplers in optics, energy exchange between pendulum chains, and mode conversion in seismology, plasmas and the ocean.
LV: Advanced · Foundation
O: Describe energy exchange between coupled wave systems
O: Explain directional couplers and avoided crossings
PRE: Coupled oscillators
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
T: Coupled-mode theory | A description of how energy transfers between interacting waves
T: Coupling length | The distance over which all the energy moves from one guide to the other
T: Avoided crossing | Two modes' frequencies repel instead of crossing when coupled
SUM: Two identical coupled guides swap energy periodically, like coupled pendulums in space rather than time.
SUM: Choosing the length (half or a full coupling length) splits or switches signals in optical and microwave circuits.
SRC: Yariv A., Yeh P., Photonics: Optical Electronics in Modern Communications, 6th edition, Oxford University Press | secondary | 2007
SRC: Pierce J. R., "Coupling of modes of propagation", Journal of Applied Physics 25, 179–183 | primary | 1954 | https://doi.org/10.1063/1.1721599
EV: established | Standard coupled-mode theory.
Q: What does a 3 dB directional coupler do? | Splits a signal equally between two outputs.
M3@2,3: Two identical optical waveguides fully swap power over 2.0 mm. What fraction is in the second guide after 1.0 mm? | Half | All of it | None | A quarter | Power transfers as sin^{2}(πz/2L_{c}); at half the coupling length sin^{2}(π/4) = ½.
SA2@1,2: Explain the analogy between coupled pendulums and two coupled waveguides. | Coupled pendulums exchange energy in time through a spring; coupled waveguides exchange power along their length through their overlapping fields. Both have two normal modes (symmetric and antisymmetric) with slightly different frequencies or propagation constants, and the beat between them moves energy back and forth. | pendulums exchange in time ; guides exchange along length ; two normal modes each ; beating moves energy

## Nonlinear waves
S: In nonlinear media, a wave's speed depends on its amplitude, so waves steepen, break, generate harmonics and interact with each other. Ocean waves breaking on a beach, sonic booms and frequency-doubling lasers are all nonlinear wave effects.
LV: Advanced · Foundation
O: Explain how amplitude-dependent speed makes waves steepen and break
O: Describe harmonic generation in nonlinear media
PRE: Superposition
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
T: Nonlinear medium | One whose response isn't proportional to the disturbance, so superposition fails
T: Wave steepening | The crest of a large wave travelling faster than its trough, so its front sharpens
T: Second-harmonic generation | Creation of light at twice the frequency in a nonlinear crystal
SUM: Large-amplitude waves steepen into shocks or breakers; ocean waves break when the crest outruns the base.
SUM: Nonlinear optics makes green laser pointers (1064 nm doubled to 532 nm).
SRC: Whitham G. B., Linear and Nonlinear Waves, Wiley | secondary | 1974
SRC: Boyd R. W., Nonlinear Optics, 3rd edition, Academic Press | secondary | 2008
EV: established | Standard nonlinear wave physics.
Q: Why do ocean waves break as they reach the shore? | In shallow water the crest moves faster than the trough, so the wave steepens until it topples.
M3@2,3: A green laser pointer emits 532 nm from a crystal pumped at 1064 nm. What process is this? | Second-harmonic generation, doubling the frequency | Fluorescence at a longer wavelength | Diffraction, which halves the wavelength | Superposition of two 1064 nm beams | A nonlinear crystal's response contains a term ∝ E^{2}, which produces light at 2ω, i.e. half the wavelength.
SA2@1,2: Explain why superposition fails for very loud sound. | At high amplitudes, compressions heat the air and raise the local sound speed, so compressions travel faster than rarefactions. The wave changes shape as it travels, steepening towards a shock; adding two such waves doesn't give the sum of their separate effects. | speed depends on amplitude ; compressions travel faster ; wave steepens ; sum of waves isn't the sum of effects

## Solitons
S: A soliton is a solitary wave that keeps its shape while travelling at constant speed, because nonlinear steepening exactly balances dispersive spreading. Solitons even pass through each other and emerge intact.
LV: Advanced · Foundation
O: Explain how a soliton keeps its shape by balancing nonlinearity and dispersion
O: Give examples of solitons in water, optical fibres and physics
PRE: Nonlinear waves
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
T: Soliton | A solitary wave that keeps its shape and speed, and survives collisions with others
T: KdV equation | The Korteweg–de Vries equation, describing shallow-water solitons
SUM: Nonlinearity steepens; dispersion spreads; balanced, they give a stable solitary wave.
SUM: First seen by John Scott Russell on a canal in 1834; used in optical-fibre communications.
SRC: Russell J. S., "Report on waves", Report of the 14th Meeting of the British Association for the Advancement of Science, 311–390 | primary | 1844
SRC: Zabusky N. J., Kruskal M. D., "Interaction of solitons in a collisionless plasma and the recurrence of initial states", Physical Review Letters 15, 240–243 | primary | 1965 | https://doi.org/10.1103/PhysRevLett.15.240
EV: established | Solitons are well established in theory and experiment.
Q: What did John Scott Russell see in 1834? | A single smooth wave travelling a long way along a canal without changing shape.
M3@2,3: Two KdV solitons of different heights collide. What happens? | They pass through each other and re-emerge with their shapes, shifted slightly in position | They merge into one larger wave that then travels on alone | They cancel each other out, leaving the water surface flat | They break up into many small ripples that spread out | Solitons survive collisions unchanged apart from a phase shift, behaving like particles, hence the name.
SA2@1,2: Explain why a soliton doesn't spread out like an ordinary wave packet. | An ordinary packet spreads because of dispersion. In a soliton the medium is also nonlinear, so the taller part travels faster and tends to steepen the pulse. The two effects balance exactly for a particular shape, which then travels without change. | dispersion spreads packets ; nonlinearity steepens ; effects balance ; shape preserved

## Wave energy and intensity
S: Waves carry energy at a rate set by their amplitude, frequency and medium. Intensity, the power per unit area, grows with the square of amplitude, which is why doubling the amplitude of a sound quadruples its power.
LV: Introductory · Application
O: Relate wave intensity to amplitude and frequency
O: Use the decibel scale for sound intensity level
PRE: Wave propagation
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
T: Intensity | Power per unit area, in W m^{-2}
T: Sound intensity level | β = 10 log_{10}(I/I_{0}) dB, with I_{0} = 10^{-12} W m^{-2}
SUM: I ∝ A^{2}ω^{2}: doubling the amplitude quadruples the intensity.
SUM: +10 dB is ten times the intensity; +3 dB is about double.
SRC: OpenStax, University Physics Volume 1, section 17.4 "Sound Intensity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-4-sound-intensity
SRC: Health and Safety Executive, Controlling noise at work: The Control of Noise at Work Regulations 2005 (L108) | guidance | 2021 | https://www.hse.gov.uk/pubns/books/l108.htm
EV: established | Standard; perceived loudness also depends on frequency.
Q: How much more intense is a 90 dB sound than a 60 dB sound? | 1000 times (30 dB).
M3@2,3: One machine makes 80 dB. What is the level with two identical machines running together? | About 83 dB | 160 dB | 80 dB | 90 dB | Intensities add (incoherent sources): twice the intensity is +10 log_{10} 2 ≈ +3 dB.
SA2@1: Find the intensity of a sound at 100 dB, and explain why it is dangerous though the power per square metre is small. | I = I_{0} × 10^{10} = 10^{-12} × 10^{10} = 0.01 W m^{-2}. The ear is extraordinarily sensitive (threshold 10^{-12} W m^{-2}), so even 0.01 W m^{-2} delivers enough energy to the delicate hair cells of the inner ear to damage them with prolonged exposure. | I = I_{0}10^{β/10} ; 0.01 W m^{-2} ; ear very sensitive ; damages hair cells

## Huygens' principle
S: Huygens' principle says every point on a wavefront acts as a source of secondary wavelets; the new wavefront is the envelope of these wavelets. It predicts reflection, refraction and, with Fresnel's addition of interference, diffraction.
LV: Intermediate · Foundation
O: Use Huygens' construction to explain reflection, refraction and diffraction
O: Derive Snell's law from Huygens' principle
PRE: Refraction
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
T: Huygens' principle | Every point on a wavefront acts as a source of secondary wavelets; their envelope is the new wavefront
T: Huygens–Fresnel principle | Huygens' idea with wavelets that interfere, giving diffraction patterns
SUM: Wavelets slow down in a denser medium, so the new wavefront tilts: that is refraction.
SUM: Fresnel's addition of interference and phase makes Huygens' construction quantitative.
SRC: Huygens C., Traité de la Lumière, Leiden | primary | 1690
SRC: Hecht E., Optics, 5th edition, chapter 4, Pearson | secondary | 2017
EV: established | Standard optics; the Huygens–Fresnel principle follows from the wave equation (Kirchhoff).
Q: How does Huygens' principle explain diffraction at a narrow slit? | Only a few wavelets pass the slit, so their envelope spreads out as a nearly circular wave.
M3@2,3: In Huygens' derivation of Snell's law, wavelets travel distances v_{1}t and v_{2}t. What relation results? | sin θ_{1}/v_{1} = sin θ_{2}/v_{2} | sin θ_{1}v_{1} = sin θ_{2}v_{2} | θ_{1}/v_{1} = θ_{2}/v_{2} | cos θ_{1}/v_{1} = cos θ_{2}/v_{2} | Both wavefronts share the same length along the boundary: v_{1}t/sin θ_{1} = v_{2}t/sin θ_{2}, which with n = c/v is Snell's law.
SA2@1,2: Use Huygens' principle to explain why the angle of reflection equals the angle of incidence. | As a wavefront reaches the surface, each point it touches emits a wavelet back into the same medium, at the same speed. By the time the far end arrives, the first wavelet has travelled the same distance, so the new wavefront makes the same angle with the surface: θ_{r} = θ_{i}. | points on the surface emit wavelets ; same medium, same speed ; equal distances in equal times ; congruent triangles give equal angles

## Fourier decomposition of waves
S: Any wave can be written as a sum (or integral) of sinusoidal waves of different frequencies, amplitudes and phases. Treating each component separately is often the easiest way to understand how complex waves travel, disperse and interact with systems.
LV: Intermediate · Application
O: Represent a travelling wave as a sum of sinusoidal components
O: Predict how a pulse changes in a dispersive medium from its components
PRE: Fourier transforms
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
T: Spectrum | The amplitudes and phases of the sinusoidal components of a wave
T: Plane-wave decomposition | Writing a wave as an integral over plane waves e^{i(kx − ωt)}
SUM: Any wave is a superposition of sinusoids; in a linear medium each evolves separately with its own ω(k).
SUM: Narrow pulses contain broad spectra (Δx Δk ≳ 1).
SRC: Bracewell R. N., The Fourier Transform and Its Applications, 3rd edition, McGraw-Hill | secondary | 2000
SRC: Crawford F. S., Waves, Berkeley Physics Course volume 3, chapter 6, McGraw-Hill | secondary | 1968
EV: established | Exact for linear media.
Q: Why is Fourier analysis so useful for waves in linear media? | Each sinusoidal component evolves independently, so you can follow each and add them back up.
M3@2,3: A sharp click passes through a medium that absorbs high frequencies strongly. What does it sound like far away? | A duller, smoother thump, since its high-frequency parts are lost | A sharper click, as high frequencies are boosted | Exactly the same, since all frequencies travel together | A pure single tone at the click's frequency | A click contains a broad spectrum; removing its high-frequency components rounds the pulse.
SA2@1,2: Explain how Fourier decomposition predicts what happens to a light pulse in a dispersive glass fibre. | Write the pulse as a sum of sinusoids with a range of frequencies. Each travels with its own speed set by the glass's ω(k). Adding them back after some distance, their phases have drifted, so the pulse is broadened (and chirped, with colours arriving at different times). | decompose into frequencies ; each travels at its own speed ; recombine after distance ; pulse broadened and chirped
`;
