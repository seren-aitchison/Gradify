// Unit 11: Acoustics and Sound. Format: kit/course/notes.js
export default `
## Sound wave propagation
S: Sound is a longitudinal pressure wave: regions of compression and rarefaction travel through a medium. Its speed depends on the medium's stiffness and density, and in gases on temperature.
LV: Introductory · Foundation
O: Describe sound as a longitudinal pressure wave needing a medium
O: Calculate the speed of sound in gases, liquids and solids, and its temperature dependence
PRE: Transverse and longitudinal waves
H: Speed of sound
E: v = √(K/ρ) :: fluids
E: v = √(γRT/M) :: ideal gas
E: v ≈ 331 + 0.6T_{°C} m s^{-1} :: air
- Air (20 °C) 343 m s^{-1}; helium ~1000; water 1480; steel ~5900; can't travel in vacuum.
- In gases, speed is independent of pressure (at fixed temperature) and of frequency.
H: Displacement and pressure
P: Molecules oscillate back and forth along the direction of travel. Pressure variation is greatest where displacement is zero: the pressure wave is 90° out of phase with the displacement wave. The pressure variations are tiny: normal speech is ~0.02 Pa on top of 101 325 Pa.
X: Thunder arrives 6 s after lightning. How far away is the storm?
> d = 343 × 6 ≈ 2 km (roughly 1 km per 3 s)
!: Sound travels faster in warm air, not in "thicker" air; humidity raises it slightly too.
Q: Why is sound faster in helium than in air? | Helium's molar mass is much lower, so v = √(γRT/M) is larger.
Q: How are pressure and displacement waves related in sound? | They're 90° out of phase: pressure extremes occur where displacement is zero.
M1: Sound travels fastest in: | Steel | Air | Water | Vacuum | High stiffness.
M2: The speed of sound in air at 0 °C is about 331 m s^{-1}. At 30 °C it's about: | 349 m s^{-1} | 331 m s^{-1} | 361 m s^{-1} | 300 m s^{-1} | +0.6 m s^{-1} per °C.
T: Speed of sound | v = √(K/ρ); in an ideal gas v = √(γRT/M)
T: Adiabatic | Too fast for heat to flow, so sound compressions heat slightly and rarefactions cool
SUM: Air ≈ 343 m s^{-1} at 20 °C, rising about 0.6 m s^{-1} per °C; water ≈ 1480; steel ≈ 5000–6000.
SUM: In a gas, speed depends on temperature, not on pressure.
SRC: OpenStax, University Physics Volume 1, section 17.2 "Speed of Sound" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-2-speed-of-sound
SRC: Kinsler L. E., Frey A. R., Coppens A. B., Sanders J. V., Fundamentals of Acoustics, 4th edition, Wiley | secondary | 2000
EV: established | Standard acoustics; values for dry air.
Q: Why can't sound travel through space? | There is no medium to carry the pressure wave.
M3@2,3: What is the speed of sound in helium at 20 °C (γ = 5/3, M = 0.0040 kg mol^{-1}, R = 8.31 J mol^{-1} K^{-1})? | About 1000 m s^{-1} | About 343 m s^{-1}, the same as air | About 200 m s^{-1}, slower than air | About 3000 m s^{-1}, as in solids | v = √(γRT/M) = √(1.667 × 8.31 × 293/0.0040) ≈ 1010 m s^{-1}, which is why helium raises the pitch of a voice's resonances.
SA2@1,2: Explain why the speed of sound in air depends on temperature but not on pressure. | For an ideal gas v = √(γp/ρ). Raising the pressure at fixed temperature raises the density in proportion, so p/ρ, and v, are unchanged. p/ρ = RT/M, so v = √(γRT/M), which rises with temperature: molecules move faster and pass the disturbance on more quickly. | v = √(γp/ρ) ; p and ρ rise together at fixed T ; p/ρ = RT/M ; v ∝ √T

## Sound pressure and intensity
S: Sound can be measured by its pressure amplitude (what microphones detect) or its intensity (power per unit area). The two are related through the medium's acoustic impedance.
LV: Introductory · Application
O: Relate sound intensity to pressure amplitude
O: Calculate intensity at a distance from a source of known power
PRE: Sound wave propagation
H: Relations
E: I = p_{rms}^{2}/(ρv) = p_{0}^{2}/(2ρv)
E: I = P/(4πr^{2}) :: point source radiating equally
- Threshold of hearing: 2 × 10^{-5} Pa, 10^{-12} W m^{-2} (at 1 kHz).
- Threshold of pain: ~20–60 Pa, ~1–10 W m^{-2}.
- The ear spans 10^{12} in intensity: hence logarithmic scales.
H: Displacement amplitudes
P: At the threshold of hearing, air molecules move only ~10^{-11} m, smaller than an atom. The ear is close to the limit set by thermal noise.
X: A loudspeaker radiates 1 W uniformly. Find the intensity and pressure amplitude 5 m away (ρv = 415 kg m^{-2} s^{-1}).
> I = 1/(4π × 25) = 3.2 × 10^{-3} W m^{-2}
> p_{0} = √(2 × 415 × 3.2 × 10^{-3}) = 1.6 Pa
!: Microphones measure pressure; intensity also needs the particle velocity (or an assumption of plane waves).
Q: What is the threshold of hearing in intensity? | About 10^{-12} W m^{-2}.
Q: How does sound intensity relate to pressure amplitude? | I = p_{0}^{2}/(2ρv), proportional to pressure amplitude squared.
M1: Doubling pressure amplitude multiplies intensity by: | 4 | 2 | √2 | 8 | I ∝ p^{2}.
M2: At the threshold of hearing, air molecules move about: | 10^{-11} m | 1 mm | 1 μm | 1 cm | Tiny displacements.
T: Pressure amplitude | p_{0}, the maximum change in pressure from the ambient value as sound passes
T: Acoustic power | The total sound energy a source emits per second, in watts
SUM: I = p_{0}^{2}/(2ρv) = p_{rms}^{2}/(ρv).
SUM: For a point source, I = P/(4πr^{2}).
SRC: OpenStax, University Physics Volume 1, section 17.4 "Sound Intensity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-4-sound-intensity
SRC: Kinsler L. E., Frey A. R., Coppens A. B., Sanders J. V., Fundamentals of Acoustics, 4th edition, chapter 5, Wiley | secondary | 2000
EV: established | Standard acoustics for plane and spherical waves.
Q: How does intensity depend on pressure amplitude? | As its square: doubling p_{0} quadruples I.
M3@2,3: A conversation at 1 m is about 60 dB (I = 10^{-6} W m^{-2}). What is the rms pressure (ρv ≈ 410 kg m^{-2} s^{-1})? | About 0.02 Pa | About 410 Pa | About 2 × 10^{-5} Pa | About 1 Pa | p_{rms} = √(Iρv) = √(10^{-6} × 410) ≈ 0.020 Pa, about 2 × 10^{-7} of atmospheric pressure.
SA2@1: A speaker radiates 1.0 W of sound equally in all directions. Find the intensity 5.0 m away. | I = P/(4πr^{2}) = 1.0/(4π × 25) ≈ 3.2 × 10^{-3} W m^{-2} (about 95 dB). | I = P/4πr^{2} ; area 4π × 25 m^{2} ; about 3.2 × 10^{-3} W m^{-2} ; about 95 dB

## Decibel scale
S: The decibel scale measures sound level logarithmically, matching the ear's roughly logarithmic response and compressing a trillion-fold range into 0–120 dB.
LV: Introductory · Application
O: Convert between intensity and sound intensity level in decibels
O: Add sound levels from several sources
PRE: Sound pressure and intensity
H: Definitions
E: L = 10 log_{10}(I/I_{0}) dB, I_{0} = 10^{-12} W m^{-2}
E: L = 20 log_{10}(p/p_{0}) dB, p_{0} = 20 μPa
- +10 dB = 10 × intensity (sounds about twice as loud); +3 dB = double intensity.
- Two equal incoherent sources together: +3 dB, not double the dB.
H: Typical levels
- Rustling leaves 20 dB; conversation 60 dB; busy traffic 80 dB; rock concert 110 dB; jet at 30 m 140 dB.
- Hearing damage risk from long exposure above ~85 dB.
H: Weighting
P: dB(A) weights frequencies like the ear at moderate levels, reducing low and very high frequencies. Regulations use dB(A); dB(C) is flatter, for loud and low-frequency noise.
X: One machine gives 80 dB. What do four identical machines give?
> Intensity × 4 ⇒ +10 log_{10} 4 = +6 dB
> 86 dB
!: Decibels don't add arithmetically: 80 dB + 80 dB = 83 dB.
Q: What intensity change does +10 dB represent? | A tenfold increase.
Q: What does two equal sources add to the level? | 3 dB.
M1: A sound at 70 dB has an intensity of: | 10^{-5} W m^{-2} | 70 W m^{-2} | 10^{-7} W m^{-2} | 7 × 10^{-12} W m^{-2} | I = 10^{-12} × 10^{7}.
M2: Moving from 1 m to 10 m from a point source changes the level by: | −20 dB | −10 dB | −3 dB | −100 dB | Intensity falls 100 times.
T: Decibel | A logarithmic unit: 10 log_{10} of a power ratio
T: Threshold of hearing | I_{0} = 10^{-12} W m^{-2} (0 dB) at about 1 kHz
T: dB(A) | A level weighted to match the ear's sensitivity at different frequencies
SUM: β = 10 log_{10}(I/I_{0}); every 10 dB is ten times the intensity.
SUM: Sound pressure level uses 20 log_{10}(p/p_{0}) with p_{0} = 20 μPa; the two give the same number in air.
SRC: OpenStax, University Physics Volume 1, section 17.4 "Sound Intensity" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-4-sound-intensity
SRC: International Electrotechnical Commission, IEC 61672-1: Electroacoustics, Sound level meters, Part 1 | standard | 2013
EV: established | Standard definitions.
Q: By how many decibels does the level fall when you move twice as far from a point source? | About 6 dB (intensity ÷ 4).
M3@2,3: Ten identical machines together give 90 dB. What level does one give? | 80 dB | 9 dB | 87 dB | 81 dB | Ten times less intensity is 10 log_{10} 10 = 10 dB less.
SA2@2: A rock concert is 110 dB at the front and a quiet library is 30 dB. How many times more intense is the concert, and why don't we hear it as that many times louder? | The difference is 80 dB, so the intensity ratio is 10^{8}. Perceived loudness grows roughly logarithmically: about a doubling for each 10 dB, so the concert sounds roughly 2^{8} ≈ 250 times louder, not 10^{8}. | 80 dB difference ; ratio 10^{8} ; perception roughly logarithmic ; about doubling per 10 dB

## Pitch, loudness and timbre
S: Pitch, loudness and timbre are how we perceive sound. They correspond roughly, but not exactly, to frequency, intensity and spectrum, because the ear and brain interpret sound in complex ways.
LV: Introductory · Foundation
O: Link pitch, loudness and timbre to frequency, intensity and spectrum
O: Explain why perception doesn't map exactly onto physical quantities
PRE: Decibel scale
H: Pitch
- Mostly set by the fundamental frequency (or by harmonic spacing: we hear the "missing fundamental" from its harmonics alone, which is why small phone speakers still sound deep).
- Human range ~20 Hz–20 kHz, upper limit falling with age.
- An octave is a frequency ratio of 2; 12 equal semitones each ratio 2^{1/12}.
H: Loudness
- Depends on intensity and frequency: the ear is most sensitive at 2–5 kHz (ear canal resonance).
- Equal-loudness contours (phons); loudness in sones roughly doubles per +10 dB.
H: Timbre
- The "colour" that distinguishes instruments playing the same note.
- Set by harmonic content and its changes in time, especially the attack (start of the note).
X: A 440 Hz A, an octave up, and a perfect fifth (ratio 3/2) above it?
> Octave: 880 Hz
> Fifth: 660 Hz (equal temperament: 440 × 2^{7/12} = 659.3 Hz)
!: Doubling intensity doesn't double perceived loudness; you need about 10 times the intensity.
Q: What sets the timbre of a note? | Its spectrum of harmonics and how it changes over time, especially the attack.
Q: What is the missing fundamental effect? | Perceiving the pitch of a fundamental that isn't present, from the spacing of its harmonics.
M1: An octave above 300 Hz is: | 600 Hz | 450 Hz | 900 Hz | 150 Hz | Ratio 2.
M2: The ear is most sensitive around: | 2–5 kHz | 50 Hz | 15 kHz | 200 Hz | Ear canal resonance.
T: Pitch | The perceived highness of a sound, mainly set by its fundamental frequency
T: Loudness | The perceived strength of a sound, depending on intensity and frequency
T: Timbre | The tone quality that distinguishes sounds of the same pitch and loudness
SUM: Pitch ↔ frequency; loudness ↔ intensity (and frequency); timbre ↔ spectrum and attack.
SUM: Each octave doubles the frequency; the ear hears about 20 Hz to 20 kHz when young.
SRC: Moore B. C. J., An Introduction to the Psychology of Hearing, 6th edition, Brill | secondary | 2012
SRC: International Organization for Standardization, ISO 226: Acoustics, Normal equal-loudness-level contours | standard | 2023
EV: established | Well-established psychoacoustics; individual hearing varies.
Q: What happens to the frequency of a note when it goes up one octave? | It doubles.
M3@2,3: A 50 Hz tone and a 3000 Hz tone both measure 60 dB. Which sounds louder? | The 3000 Hz tone, because the ear is far more sensitive there | The 50 Hz tone, because low notes carry more energy | They sound equally loud at the same level | Neither can be heard at 60 dB | Equal-loudness contours show the ear is most sensitive around 2–5 kHz and much less so at 50 Hz.
SA2@1,2: Explain why a violin and a trumpet playing the same 440 Hz note at the same level sound different. | Both have a 440 Hz fundamental, giving the same pitch, and the same level, but their harmonics have different relative strengths and their notes start and decay differently (attack and transients). These differences in spectrum and envelope are timbre. | same fundamental, same pitch ; different harmonic strengths ; different attack and decay ; timbre

## Frequency spectra
S: A frequency spectrum shows how much of each frequency a sound contains. Musical notes have line spectra of harmonics; noises have broad, continuous spectra; speech has formant peaks that make vowels recognisable.
LV: Intermediate · Application
O: Interpret line and continuous spectra of sounds
O: Explain how a spectrum analyser or spectrogram works
PRE: Pitch, loudness and timbre
H: Kinds of spectra
- **Pure tone**: one line (tuning fork, sine generator).
- **Musical note**: lines at f, 2f, 3f… with varying heights.
- **White noise**: equal power per Hz; **pink noise**: equal power per octave (sounds more balanced).
- **Transients**: clicks and plucks have broad spectra (short in time ⇒ wide in frequency).
H: Speech
P: Vocal folds produce a buzz rich in harmonics; the vocal tract filters it, with resonances called formants. The first two formants (F1, F2) identify vowels: "ee" has low F1, high F2; "ah" has high F1, mid F2. Helium raises formants, not the pitch, so voices sound squeaky but the fundamental barely changes.
H: Spectrograms
- Frequency against time, with intensity as brightness.
- Used for speech recognition, birdsong, whale calls and machinery diagnostics.
X: Why does a voice on helium sound high?
> Sound speed in the vocal tract roughly triples (in pure He), raising formant frequencies
> Vocal-fold rate (pitch) is nearly unchanged; the timbre shifts
!: Spectra and waveforms are two views of the same signal; very different-looking waveforms can sound identical if only the phases differ.
Q: What are formants? | Resonance peaks of the vocal tract that shape vowel sounds.
Q: What is pink noise? | Noise with equal power per octave.
M1: A click has a spectrum that is: | Broad and continuous | A single line | Harmonics only | Zero | Short in time.
M2: Breathing helium mainly changes: | Formant frequencies | Vocal-fold pitch greatly | Loudness | Nothing | Resonances of the tract shift.
T: Line spectrum | A spectrum of discrete frequencies, typical of steady musical notes
T: Continuous spectrum | A spread of frequencies, typical of noise and clicks
T: Spectrogram | A plot of frequency against time with intensity as brightness or colour
SUM: Periodic sounds have line spectra; noise has continuous spectra.
SUM: A spectrogram trades frequency resolution against time resolution (Δt Δf ≳ 1).
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
SRC: Bracewell R. N., The Fourier Transform and Its Applications, 3rd edition, McGraw-Hill | secondary | 2000
EV: established | Standard signal analysis.
Q: What kind of spectrum does white noise have? | Continuous, with equal power per unit frequency.
M3@2,3: A spectrogram uses 0.10 s analysis windows. About how finely can it resolve frequency? | About 10 Hz | About 0.1 Hz | About 100 Hz | About 1 kHz | Δf ≈ 1/Δt = 1/0.10 s = 10 Hz; shorter windows show timing better but blur frequency.
SA2@1: Explain how vowel sounds can be told apart on a spectrogram. | The vocal folds produce a line spectrum at the voice's pitch; the shape of the throat and mouth makes resonances (formants) that boost certain bands. Each vowel has its own pattern of formant frequencies, visible as dark bands on the spectrogram whatever the pitch. | vocal folds give harmonics ; vocal tract resonances are formants ; each vowel has its own formants ; bands visible on the spectrogram

## Harmonics and overtones
S: Most musical sounds contain a fundamental plus higher frequencies. When these are whole-number multiples of the fundamental they're harmonics; the general term for frequencies above the fundamental is overtones.
LV: Introductory · Foundation
O: Distinguish harmonics from overtones
O: Explain the missing-fundamental effect
PRE: Frequency spectra
H: Definitions
- Harmonic n: frequency nf_{1} (the first harmonic is the fundamental).
- Overtone: any resonance above the fundamental; the first overtone may or may not be the 2nd harmonic.
- Strings and open pipes: all harmonics. Closed pipes: odd harmonics only.
- Bells, drums, xylophone bars: inharmonic overtones.
H: Why harmonics matter
- Harmonic spectra sound like a clear pitch.
- Consonance: notes whose harmonics coincide (octave 2:1, fifth 3:2, fourth 4:3) sound smooth.
- Brass players change notes by selecting different harmonics of the tube (bugles play only harmonics).
H: Harmonic series
E: f_{n} = nf_{1}: 100, 200, 300, 400, 500 Hz…
P: The 7th harmonic sounds noticeably flat compared with equal temperament; piano strings are slightly stiff, so their overtones are stretched sharper than true harmonics (inharmonicity), and tuners "stretch" octaves to match.
X: An open pipe has fundamental 220 Hz. List its first three overtones.
> Harmonics 2, 3, 4: 440, 660, 880 Hz
!: For a closed pipe, the first overtone is the 3rd harmonic, not the 2nd.
Q: What is the difference between a harmonic and an overtone? | Harmonics are integer multiples of the fundamental; overtones are any resonances above it.
Q: Why are octaves and fifths consonant? | Their harmonics coincide frequently (ratios 2:1 and 3:2).
M1: A closed pipe with fundamental 100 Hz has first overtone at: | 300 Hz | 200 Hz | 150 Hz | 400 Hz | Odd harmonics only.
M2: Bells sound less "pitched" because: | Their overtones aren't harmonic | They have no overtones | They're too loud | They're metal | Inharmonic spectra.
T: Fundamental | The lowest frequency of a periodic sound
T: Inharmonic overtone | An overtone that isn't a whole-number multiple of the fundamental
SUM: Harmonic n has frequency nf_{1}; the first overtone of a string is the second harmonic.
SUM: The brain infers the fundamental from its harmonics even if it's missing (how small speakers seem to play bass).
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
SRC: Moore B. C. J., An Introduction to the Psychology of Hearing, 6th edition, chapter 6, Brill | secondary | 2012
EV: established | The missing-fundamental effect is robustly demonstrated.
Q: For a pipe closed at one end, which harmonics are present? | Only the odd ones.
M3@2,3: A sound contains 600, 800 and 1000 Hz components only. What pitch do most listeners hear? | 200 Hz, the missing fundamental | 600 Hz, the lowest component | 800 Hz, the middle component | 2400 Hz, the sum of the three | They are the 3rd, 4th and 5th harmonics of 200 Hz; the auditory system reconstructs that fundamental.
SA2@1,2: Explain why a telephone line, which cuts frequencies below about 300 Hz, still lets you hear a man's voice at 120 Hz pitch. | The voice contains many harmonics of 120 Hz (240, 360, 480 Hz…), most of which pass through. The brain uses their common spacing to infer the 120 Hz fundamental, so the pitch is heard although the fundamental itself is filtered out. | fundamental removed ; harmonics remain ; spacing reveals the fundamental ; brain infers pitch

## Resonance in air columns
S: Air in a tube resonates at frequencies where standing sound waves fit its length. Open ends are displacement antinodes, closed ends are nodes, and these conditions set the notes of flutes, clarinets, organ pipes and bottles.
LV: Introductory · Application
O: Find resonant frequencies of open and closed pipes, including the end correction
O: Measure the speed of sound with a resonance tube
PRE: Standing waves
H: The formulas
E: f_{n} = nv/(2L) :: open at both ends (all n)
E: f_{n} = nv/(4L) :: closed at one end (odd n)
E: L_{eff} ≈ L + 0.6r :: end correction per open end
H: Measuring the speed of sound
P: Hold a tuning fork over a tube partly filled with water and adjust the water level. The first resonance occurs at L_{1} + e = λ/4, the second at L_{2} + e = 3λ/4. Then λ = 2(L_{2} − L_{1}), cancelling the end correction, and v = fλ.
H: Helmholtz resonators
E: f = (v/2π)√(A/(VL)) :: bottle with neck area A, length L, volume V
- Blowing across a bottle; bass reflex ports in speakers; tuned absorbers in rooms.
X: Resonances at 17.0 cm and 52.0 cm with a 512 Hz fork. Find v and the end correction.
> λ = 2 × 0.35 = 0.70 m ⇒ v = 358 m s^{-1}
> e = λ/4 − L_{1} = 0.175 − 0.170 = 0.5 cm
!: The end correction makes the effective length longer than the physical tube, so resonances are slightly lower than the simple formula gives.
Q: Why use two resonances to measure the speed of sound? | The difference removes the unknown end correction.
Q: What is a Helmholtz resonator? | A cavity with a neck, where air in the neck oscillates on the "spring" of the cavity air.
M1: An open pipe 0.5 m long (v = 340) has fundamental: | 340 Hz | 170 Hz | 680 Hz | 85 Hz | v/2L.
M2: Closing one end of an open pipe changes its fundamental to: | Half | Double | The same | A third | v/4L vs v/2L.
T: End correction | The extra length (about 0.6 times the radius per open end) added to a pipe's effective length
T: Resonance tube | A tube whose air column is adjusted to resonate with a tuning fork, used to measure v
SUM: Open pipe: f_{n} = nv/2(L + 1.2r). Closed pipe: f_{n} = nv/4(L + 0.6r), n odd.
SUM: Successive resonance lengths in a resonance tube differ by λ/2, cancelling the end correction.
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
SRC: Levine H., Schwinger J., "On the radiation of sound from an unflanged circular pipe", Physical Review 73, 383–406 | primary | 1948 | https://doi.org/10.1103/PhysRev.73.383
EV: established | The 0.61r end correction for an unflanged pipe was calculated by Levine and Schwinger.
Q: Why does using two resonance lengths cancel the end correction? | Their difference is exactly half a wavelength; the end correction appears in both and drops out.
M3@2,3: A 512 Hz fork resonates a closed tube at air lengths 16.0 cm and 49.5 cm. What is the speed of sound? | About 343 m s^{-1} | About 330 m s^{-1}, using 4 × 16.0 cm | About 507 m s^{-1}, using 49.5 cm | About 172 m s^{-1}, using a quarter-wave difference | λ/2 = 49.5 − 16.0 = 33.5 cm, so λ = 0.670 m and v = 512 × 0.670 ≈ 343 m s^{-1}.
SA2@2: Explain why the note you get by blowing across a bottle rises as you fill it with water. | The air in the bottle resonates roughly like a pipe closed at the bottom (strictly, a Helmholtz resonator). Adding water shortens the air column (and shrinks the air volume), so the resonant wavelength is shorter and the frequency higher: f ≈ v/4L rises as L falls. | air column resonates ; water shortens the column ; shorter wavelength ; higher frequency

## Musical instruments and acoustics
S: Every instrument couples a vibrating source to a resonator and a radiator. Physics explains why each sounds as it does and how players change pitch, loudness and tone.
LV: Intermediate · Foundation
O: Describe the source, resonator and radiator of strings, winds and percussion
O: Explain how each family sets and changes pitch
PRE: Resonance in air columns
H: Families
- **Strings** (violin, guitar, piano): f = (1/2L)√(T/μ). The body amplifies and colours the sound; the bridge transmits vibration.
- **Woodwind**: air columns excited by an edge tone (flute, open–open: all harmonics) or a reed (clarinet, closed–open: odd harmonics, so it sounds an octave lower than a flute of similar length).
- **Brass**: lips buzz into a tube; the bell and mouthpiece make resonances nearly harmonic; valves add tubing.
- **Percussion**: bars, membranes and shells with inharmonic modes; tuned bars (marimba) are carved to make overtones harmonic.
- **Voice**: vocal folds plus vocal-tract formants.
H: Controlling pitch
- Strings: change length (fingering), tension (tuning) or mass (thicker strings for bass).
- Wind: open tone holes to shorten the effective length; overblow to jump to higher harmonics.
X: A violin string (L = 0.33 m) plays 440 Hz. Where must you press it to play 660 Hz?
> f ∝ 1/L: L′ = 0.33 × 440/660 = 0.22 m
> Press 11 cm from the nut
!: A piano's loudness comes from how hard the hammer hits, which also changes timbre (louder notes are brighter).
Q: Why does a clarinet sound an octave lower than a flute of similar length? | It acts as a pipe closed at one end, with fundamental v/4L instead of v/2L.
Q: How does a guitarist raise a string's pitch? | Shorten its vibrating length, increase tension, or use a lighter string.
M1: Tightening a guitar string makes its pitch: | Higher | Lower | Unchanged | Disappear | f ∝ √T.
M2: Opening a tone hole in a flute: | Shortens the effective air column, raising pitch | Lengthens it | Stops the sound | Lowers pitch | The open hole acts as the end.
T: Resonator | The part of an instrument that selects and reinforces certain frequencies
T: Radiator | The part that couples the vibration efficiently to the air, such as a violin's body or a horn's bell
SUM: Strings: pitch from length, tension and mass. Winds: from air-column length, changed by holes, valves or slides.
SUM: Percussion often has inharmonic modes; bells and tuned bars are shaped to make some modes harmonic.
SRC: Fletcher N. H., Rossing T. D., The Physics of Musical Instruments, 2nd edition, Springer | secondary | 1998
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
EV: established | Standard musical acoustics.
Q: Why does a guitar need a hollow body? | A string alone moves little air; the body couples its vibration to the air and radiates far more sound.
M3@2,3: A violinist presses a string to shorten its vibrating length by a quarter. What happens to the pitch? | It rises by a ratio of 4/3 (a perfect fourth) | It falls to three quarters of the frequency | It rises by a factor of 4, two octaves | It rises by a quarter of an octave | f ∝ 1/L: L × 3/4 gives f × 4/3, the musical interval of a perfect fourth.
SA2@1,2: Explain how a trumpet player can play many notes with only three valves. | With no valves pressed the tube's resonances form a harmonic series; the player selects different harmonics by changing lip tension and air pressure. Each valve adds extra tubing, lengthening the air column and lowering the whole series; combinations of three valves give seven lengths, filling the gaps between harmonics. | resonances form a harmonic series ; lips select a harmonic ; valves add tubing ; seven combinations fill the gaps

## Doppler effect
S: The Doppler effect is the change in observed frequency when the source and observer move relative to each other. Approaching sounds are higher-pitched; receding ones lower. The same effect for light measures stellar velocities and the expansion of the universe.
LV: Introductory · Application
O: Calculate observed frequency for moving sources and observers
O: Apply the Doppler effect to medical ultrasound and radar
PRE: Sound wave propagation
H: Sound
E: f′ = f (v + v_{o})/(v − v_{s}) :: source and observer approaching (v_{o}, v_{s} positive towards each other)
- Moving source: wavelengths compressed in front, stretched behind.
- Moving observer: meets wavefronts more or less often.
- Asymmetric for sound because there's a medium.
H: Light (relativistic)
E: f′ = f√((1 + β)/(1 − β)) :: approaching, β = v/c
E: z = Δλ/λ ≈ v/c :: small speeds
H: Uses
- Police radar, Doppler ultrasound (blood flow), weather radar (storm rotation).
- Exoplanets: star wobble velocities of ~1 m s^{-1}.
- Redshift of galaxies: Hubble's law.
- Laser cooling uses Doppler shifts to slow atoms.
X: An ambulance siren (700 Hz) approaches at 30 m s^{-1}. What do you hear? And after it passes?
> Approaching: 700 × 343/(343 − 30) = 767 Hz
> Receding: 700 × 343/(343 + 30) = 644 Hz
!: The pitch heard from an approaching source is constant (higher), not rising; it drops as the source passes.
Q: Why is the Doppler formula for sound asymmetric between moving source and moving observer? | Sound travels through a medium, so motion relative to the medium matters.
Q: How is the Doppler effect used in medicine? | Doppler ultrasound measures blood flow speed from frequency shifts of echoes.
M1: A source moves away. The observed frequency is: | Lower | Higher | Unchanged | Zero | Wavelengths stretched.
M2: A star's spectral line at 500 nm is observed at 500.1 nm. Its radial velocity is: | 60 km s^{-1} away | 60 km s^{-1} toward | 600 km s^{-1} away | 6 km s^{-1} away | v = cΔλ/λ.
T: Doppler effect | The change in observed frequency due to relative motion of source and observer
T: Doppler shift | The difference between observed and emitted frequency
SUM: f′ = f(v + v_{o})/(v − v_{s}), with speeds positive when moving towards each other.
SUM: Reflection from a moving target doubles the shift: Δf ≈ 2fv/c for v ≪ c.
SRC: Doppler C., "Über das farbige Licht der Doppelsterne", Abhandlungen der Königlichen Böhmischen Gesellschaft der Wissenschaften 2, 465–482 | primary | 1842
SRC: OpenStax, University Physics Volume 1, section 17.8 "The Doppler Effect" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-8-the-doppler-effect
EV: established | The classical formulae need the medium's frame; for light the relativistic formula applies.
Q: Why does a passing siren drop in pitch? | Approaching, the waves are compressed (higher f); receding, they are stretched (lower f).
M3@2,3: An ambulance siren is 700 Hz. It approaches you at 30 m s^{-1} (v = 340 m s^{-1}). What frequency do you hear? | About 768 Hz | About 643 Hz, as it recedes | About 762 Hz, using a moving observer | About 700 Hz, unchanged | f′ = 700 × 340/(340 − 30) ≈ 768 Hz.
SA2@2: Explain how Doppler ultrasound measures the speed of blood. | Ultrasound reflects from moving red blood cells. The reflected frequency is shifted by about 2fv cos θ/c, where c is the speed of sound in tissue and θ the angle between beam and flow. Measuring the shift gives the blood speed, and its sign gives the direction. | ultrasound reflects off moving cells ; shift ≈ 2fv cos θ/c ; measure shift to find speed ; sign gives direction

## Beats and interference
S: Sound waves interfere like all waves: overlapping coherent sounds reinforce or cancel at different places, and nearly equal frequencies beat. These effects are used in tuning, noise cancellation and speaker design.
LV: Introductory · Application
O: Predict loud and quiet positions from two coherent sound sources
O: Explain how active noise control uses interference
PRE: Constructive and destructive interference
H: Spatial interference
- Two speakers driven by the same signal create loud and quiet zones (path difference nλ or (n + ½)λ).
- Low frequencies (long λ) give widely spaced zones; you notice them when walking in front of stereo speakers.
- Wrongly wired (antiphase) speakers cancel bass, making music thin.
H: Active noise cancellation
P: A microphone samples incoming noise; electronics produce an inverted copy through the headphone speaker. Destructive interference cancels steady, low-frequency noise (engines) well; high frequencies and sudden sounds are harder because the wavelengths are short and timing must be precise.
H: Beats
E: f_{beat} = |f_{1} − f_{2}|
- Used to tune instruments to each other.
X: Two speakers 2 m apart play 343 Hz in phase. You stand 4 m from one and 4.5 m from the other. Loud or quiet?
> λ = 1 m; path difference 0.5 m = λ/2
> Destructive: quiet spot
!: Noise cancellation removes energy at your ear by redirecting it, not by destroying it; other places get louder.
Q: Why does active noise cancellation work best at low frequencies? | Long wavelengths make the anti-noise easy to align in time and space.
Q: What happens if stereo speakers are wired out of phase? | Bass cancels, especially between them.
M1: Two speakers in phase; path difference 2λ. At that point: | Constructive interference | Destructive | Beats | Silence | Whole number of wavelengths.
M2: A 256 Hz fork and a string produce 4 beats per second. The string could be: | 252 or 260 Hz | 256 Hz | 1024 Hz | 64 Hz | ±4 Hz.
T: Coherent sources | Sources with a fixed phase relationship, such as two speakers fed by one amplifier
T: Active noise control | Cancelling noise by adding sound of equal amplitude and opposite phase
SUM: Two in-phase speakers: loud where path difference = nλ, quiet where it is (n + ½)λ.
SUM: Two slightly different frequencies give beats at |f_{1} − f_{2}|; equal frequencies give a fixed pattern.
SRC: Kinsler L. E., Frey A. R., Coppens A. B., Sanders J. V., Fundamentals of Acoustics, 4th edition, Wiley | secondary | 2000
SRC: Nelson P. A., Elliott S. J., Active Control of Sound, Academic Press | secondary | 1992
EV: established | Standard acoustics.
Q: Why do you rarely notice interference between speakers in a normal room? | Reflections and a broad spectrum blur the pattern, and the ear averages over positions and frequencies.
M3@2,3: Two speakers 2.0 m apart play 686 Hz in phase (v = 343 m s^{-1}). Along the line joining them, how far apart are the quiet spots? | 0.25 m | 0.50 m | 1.0 m | 0.125 m | Between the speakers a standing-wave-like pattern forms with nodes λ/2 apart; λ = 0.50 m, so 0.25 m.
SA2@1,2: Explain why active noise control works well inside headphones but poorly in a large room. | In headphones the region to quieten is tiny and close to the anti-noise speaker, so the cancelling wave can match the noise's amplitude and phase there. In a room, the anti-noise interferes destructively in some places but constructively in others, because the path differences vary with position; only small zones can be quietened. | small region in headphones ; amplitude and phase can match ; in a room path differences vary ; cancellation in some places, reinforcement in others

## Acoustic impedance
S: Acoustic impedance is a medium's resistance to sound: the product of its density and sound speed. The difference in impedance between two media decides how much sound reflects at the boundary, which is the basis of ultrasound imaging.
LV: Intermediate · Application
O: Calculate acoustic impedance and the fraction of sound reflected at a boundary
O: Explain matching layers and the role of the middle ear
PRE: Reflection and transmission
H: Definition and reflection
E: Z = ρv (kg m^{-2} s^{-1}, rayl)
E: R = ((Z_{2} − Z_{1})/(Z_{2} + Z_{1}))^{2} :: intensity reflection at normal incidence
E: T = 1 − R
H: Typical values (× 10^{6} rayl)
- Air 0.0004; water 1.48; soft tissue ~1.6; fat 1.38; muscle 1.7; bone 4–8; steel 45.
H: Consequences
- Air–tissue: R ≈ 99.9%; gel is essential in ultrasound.
- Tissue–bone: strong echoes; bone shadows what's behind it.
- Fat–muscle: small reflections reveal organ boundaries.
- The middle ear matches air to the fluid-filled cochlea: lever action and the area ratio of eardrum to oval window (~17:1) give ~30 dB gain.
X: What fraction of ultrasound reflects at a fat–muscle boundary?
> R = ((1.70 − 1.38)/(3.08))^{2} = 0.011
> About 1%: weak echo but enough to image
!: Impedance matching isn't about making materials identical, just their Z; quarter-wave matching layers with Z = √(Z_{1}Z_{2}) maximise transmission.
Q: Define acoustic impedance. | Z = ρv, density times speed of sound.
Q: Why does the middle ear need to match impedance? | Air and cochlear fluid differ hugely in impedance; without matching most sound would reflect.
M1: Sound passing from air to water mostly: | Reflects | Transmits | Is absorbed | Speeds up without reflection | Huge impedance mismatch.
M2: An ideal quarter-wave matching layer has impedance: | √(Z_{1}Z_{2}) | Z_{1} + Z_{2} | (Z_{1} + Z_{2})/2 | 0 | Geometric mean.
T: Specific acoustic impedance | Z = ρv, in kg m^{-2} s^{-1} (rayl)
T: Matching layer | A layer of intermediate impedance, about a quarter-wavelength thick, that improves transmission
SUM: Intensity reflection R = ((Z_{2} − Z_{1})/(Z_{2} + Z_{1}))^{2}.
SUM: The middle ear's lever and area ratio boost pressure about 20-fold, partly matching air to the fluid of the inner ear.
SRC: Kinsler L. E., Frey A. R., Coppens A. B., Sanders J. V., Fundamentals of Acoustics, 4th edition, chapter 6, Wiley | secondary | 2000
SRC: Szabo T. L., Diagnostic Ultrasound Imaging: Inside Out, 2nd edition, Academic Press | secondary | 2014
EV: established | Standard acoustics; tissue impedances are approximate.
Q: What is the impedance of water? | About 1000 × 1480 ≈ 1.5 × 10^{6} kg m^{-2} s^{-1}.
M3@2,3: Ultrasound meets a boundary between soft tissue (Z = 1.6 × 10^{6}) and bone (Z = 7.8 × 10^{6}). What fraction of intensity is reflected? | About 43% | About 99.9% | About 5% | About 66% | R = ((7.8 − 1.6)/(7.8 + 1.6))^{2} = (6.2/9.4)^{2} ≈ 0.43, which is why bone casts acoustic shadows.
SA2@2: Explain why an ultrasound transducer has a matching layer on its face. | The piezoelectric crystal's impedance (about 30 × 10^{6}) is far higher than skin's (about 1.6 × 10^{6}), so most sound would reflect back into the crystal. A layer of intermediate impedance, a quarter-wavelength thick, makes reflections cancel and passes much more energy into the body. | crystal impedance much higher than tissue ; most sound would reflect ; intermediate-impedance layer ; quarter-wavelength thickness improves transmission

## Reflection and absorption of sound
S: When sound hits a surface, some reflects, some is absorbed, and some is transmitted. Hard smooth surfaces reflect strongly; soft porous materials absorb, especially high frequencies. Managing these processes is the core of noise control.
LV: Introductory · Application
O: Distinguish reflection, absorption, diffusion and transmission of sound at surfaces
O: Use absorption coefficients to compare materials
PRE: Acoustic impedance
H: Absorption coefficient
E: α = absorbed/incident energy (0 to 1)
- Concrete ~0.02; carpet ~0.3 (higher at high f); acoustic foam ~0.8; open window = 1.
- Porous absorbers turn sound into heat through air friction in pores; they work best when thick compared with λ/4.
- Panel and Helmholtz absorbers target low frequencies.
H: Echoes
- An echo is a distinct reflection arriving > ~50 ms after the direct sound (> ~17 m extra path).
- Shorter delays merge into the sound as reverberation.
- Diffusers scatter sound evenly instead of creating echoes.
H: Sound insulation
P: Blocking sound between rooms needs mass and airtightness, not absorption. The mass law: transmission loss rises ~6 dB per doubling of wall mass (or frequency). Double walls with an air gap and decoupled studs do much better than a single heavy wall.
X: How far away must a cliff be to hear a distinct echo of a clap?
> Delay ≥ 0.05 s; total path ≥ 343 × 0.05 = 17 m
> Cliff ≥ 8.6 m away
!: Foam on a wall improves a room's acoustics but does little to stop sound passing through to the neighbours.
Q: What is the absorption coefficient? | The fraction of incident sound energy absorbed by a surface.
Q: What is the mass law? | Sound transmission loss through a wall increases about 6 dB per doubling of its mass per area.
M1: Which absorbs high frequencies best? | Thick porous foam | Concrete | Glass | Steel | Porous absorbers.
M2: To stop noise passing through a wall, the most important factor is: | Mass and airtightness | Soft surface | Colour | Foam on the surface | Mass law.
T: Absorption coefficient | α, the fraction of incident sound energy not reflected by a surface
T: Echo | A reflection heard separately from the direct sound, after about 50 ms or more
T: Diffuser | A surface shaped to scatter sound in many directions
SUM: Hard surfaces (α ≈ 0.02) reflect; porous ones (α up to about 1) absorb, mainly at high frequency.
SUM: An echo needs a reflecting surface more than about 17 m away (50 ms round trip).
SRC: Everest F. A., Pohlmann K. C., Master Handbook of Acoustics, 6th edition, McGraw-Hill | secondary | 2015
SRC: Kuttruff H., Room Acoustics, 6th edition, CRC Press | secondary | 2016
EV: established | Standard architectural acoustics; coefficients vary with frequency and mounting.
Q: Why do curtains make a room sound less echoey? | Their porous fabric absorbs sound energy instead of reflecting it.
M3@2,3: You clap and hear an echo from a cliff 0.60 s later (v = 340 m s^{-1}). How far away is the cliff? | 102 m | 204 m | 51 m | 340 m | The sound travels there and back: d = vt/2 = 340 × 0.60/2 = 102 m.
SA2@1,2: Explain why thin foam panels absorb high frequencies well but do little for bass. | Porous absorbers work by friction as air moves through their pores, which is greatest where particle velocity is large, about a quarter-wavelength from a wall. High frequencies have short wavelengths, so that point lies within thin foam; for bass the quarter-wavelength is a metre or more, far beyond the foam, so little energy is absorbed. | absorption by air friction in pores ; needs high particle velocity ; at about λ/4 from the wall ; bass wavelengths too long for thin foam

## Reverberation
S: Reverberation is the persistence of sound in a room after the source stops, as countless reflections decay. Its duration shapes how a space sounds: long for cathedrals and organ music, short for lecture rooms and studios.
LV: Intermediate · Application
O: Define reverberation time and calculate it with Sabine's formula
O: Choose suitable reverberation times for speech and music
PRE: Reflection and absorption of sound
H: Reverberation time
E: RT_{60} = 0.161V/A :: Sabine's formula: time to fall 60 dB; V in m^{3}, A = Σα_{i}S_{i} in m^{2}
- Eyring's formula is better for very absorbent rooms.
- Typical ideal RT_{60}: speech 0.6–1.0 s; chamber music ~1.5 s; symphony 1.8–2.2 s; cathedrals 5–10 s.
H: Effects
- Too long: speech blurs (syllables overlap).
- Too short: music sounds dry and dead.
- Reverberation varies with frequency; bass often lingers longer.
H: History
P: Wallace Sabine developed his formula (1895) to fix Harvard's Fogg lecture hall, timing how long organ pipes stayed audible with cushions added. He then designed Boston Symphony Hall, still considered one of the world's best.
X: A 2000 m^{3} hall has total absorption 200 m^{2} (sabins). Find RT_{60}. How much absorption gives 1.0 s for speech?
> RT_{60} = 0.161 × 2000/200 = 1.6 s
> For 1.0 s: A = 322 m^{2}: add ~120 m^{2} of absorption
!: People absorb sound: an empty hall can sound very different from a full one, so seats are designed to absorb like audiences.
Q: What does RT_{60} measure? | The time for sound to decay by 60 dB after the source stops.
Q: State Sabine's formula. | RT_{60} = 0.161V/A.
M1: Adding carpets and curtains to a room: | Reduces reverberation time | Increases it | Has no effect | Makes echoes | More absorption.
M2: Ideal reverberation for a lecture room is about: | 0.6–1.0 s | 5 s | 3 s | 0.01 s | Speech clarity.
T: Reverberation time | RT_{60}, the time for sound to decay by 60 dB after the source stops
T: Sabine's formula | RT_{60} ≈ 0.161V/A, with V in m^{3} and A = Σα_{i}S_{i} in m^{2}
SUM: More volume lengthens reverberation; more absorption shortens it.
SUM: Speech wants about 0.5–1 s; concert halls about 1.8–2.2 s; cathedrals can exceed 5 s.
SRC: Sabine W. C., Collected Papers on Acoustics, Harvard University Press | primary | 1922
SRC: Kuttruff H., Room Acoustics, 6th edition, CRC Press | secondary | 2016
EV: established | Sabine's formula works well for fairly live, diffuse rooms; Eyring's formula is better for very absorbent rooms.
Q: Why does an empty concert hall sound more echoey than a full one? | The audience absorbs a lot of sound; without them A is smaller and RT_{60} longer.
M3@2,3: A 1000 m^{3} classroom has total absorption 80 m^{2}. What is its reverberation time? | About 2.0 s | About 0.50 s | About 12 s | About 0.08 s | RT_{60} = 0.161 × 1000/80 ≈ 2.0 s, too long for clear speech; more absorption is needed.
SA2@2: A classroom's reverberation time is 1.6 s and should be 0.6 s. How much extra absorption is needed (V = 300 m^{3})? | Now A = 0.161 × 300/1.6 ≈ 30 m^{2}. Target A = 0.161 × 300/0.6 ≈ 80 m^{2}. About 50 m^{2} of extra absorption (for example acoustic ceiling tiles with α ≈ 0.8 over about 60 m^{2}). | current A ≈ 30 m^{2} ; target A ≈ 80 m^{2} ; about 50 m^{2} more ; practical example

## Architectural acoustics
S: Architectural acoustics designs spaces so sound is clear, balanced and free of defects, and so unwanted noise is kept out. It balances reverberation, reflections, diffusion, background noise and insulation.
LV: Intermediate · Application
O: Describe the goals of room acoustic design: clarity, warmth, even coverage, low noise
O: Explain sound insulation by mass, separation and sealing
PRE: Reverberation
H: Goals
- Appropriate reverberation time for the use.
- Strong early reflections (within ~50–80 ms) that support clarity and loudness.
- Lateral reflections from side walls create a sense of envelopment (why shoebox halls work well).
- Even coverage, no echoes, flutter echoes or focusing.
- Low background noise (HVAC, traffic): noise criteria (NC) curves.
H: Defects to avoid
- **Flutter echo**: rapid repeats between parallel hard walls; fix with absorption or angled surfaces.
- **Focusing** by concave surfaces (domes, curved walls), creating hot spots and whispering galleries.
- **Room modes** in small rooms: uneven bass.
H: Tools
- Ray tracing and image-source simulations; scale models; measurement of impulse responses.
- Variable acoustics: movable panels, curtains, adjustable canopies.
X: Why is St Paul's Cathedral's whispering gallery famous?
> Sound hugs the curved wall, reflecting at grazing angles (whispering-gallery waves)
> A whisper is heard clearly across the 33 m dome
!: Adding absorption isn't always the answer; a good concert hall needs reflective surfaces placed correctly.
Q: What is a flutter echo? | A rapid series of echoes between parallel reflective surfaces.
Q: Why are early lateral reflections valued in concert halls? | They increase clarity and a sense of envelopment.
M1: Concave surfaces in a hall tend to: | Focus sound into hot spots | Spread it evenly | Absorb it | Reduce reverberation | Like a curved mirror.
M2: Shoebox-shaped concert halls are prized for: | Strong lateral reflections | Long echoes | Low cost only | Absorbing all sound | Narrow, tall halls give side reflections.
T: Sound insulation | Reducing sound transmitted between spaces
T: Mass law | Transmission loss rises about 6 dB per doubling of a wall's mass per area (or of frequency)
T: Flutter echo | Rapid repeated echoes between parallel hard surfaces
SUM: Good rooms balance reverberation, avoid echoes and focusing, and spread sound evenly.
SUM: Insulation needs mass, airtightness and separated (decoupled) layers; absorption alone doesn't block sound.
SRC: Everest F. A., Pohlmann K. C., Master Handbook of Acoustics, 6th edition, McGraw-Hill | secondary | 2015
SRC: Beranek L., Concert Halls and Opera Houses: Music, Acoustics, and Architecture, 2nd edition, Springer | secondary | 2004
EV: established | Standard building acoustics; the mass law is an approximation above the wall's resonances.
Q: Why does a small gap round a door spoil its sound insulation? | Sound passes easily through air gaps, bypassing the door's mass.
M3@2,3: A wall's mass per area is doubled. By about how much does its transmission loss rise, according to the mass law? | About 6 dB | About 3 dB | About 20 dB | About 0 dB | The mass law gives TL ∝ 20 log_{10}(mf), so doubling m adds 20 log_{10} 2 ≈ 6 dB.
SA2@1,2: Explain why lining a wall with foam barely reduces noise from next door. | Foam absorbs sound inside the room, reducing reflections, but it's light and porous, so it adds little mass and air passes through it. Blocking transmitted sound needs mass, airtightness and decoupled layers (such as double plasterboard on separate studs with insulation between). | foam absorbs, doesn't block ; little mass ; porous and leaky ; insulation needs mass, sealing and decoupling

## Ultrasound
S: Ultrasound is sound above the range of human hearing (> 20 kHz). Its short wavelengths make it ideal for imaging inside the body, testing materials, cleaning, and even breaking kidney stones.
LV: Intermediate · Application
O: Explain how pulse-echo ultrasound forms images
O: Describe the trade-off between frequency, resolution and penetration
PRE: Acoustic impedance
H: Imaging
- Piezoelectric transducers send short pulses (2–15 MHz) and listen for echoes.
- Depth from echo time: d = vt/2 (v ≈ 1540 m s^{-1} in tissue).
- Higher frequency: better resolution, less penetration (attenuation ~0.5 dB cm^{-1} MHz^{-1}).
- A-scans (1D), B-scans (2D images), 3D/4D; Doppler for blood flow.
- Safe: non-ionising; used in pregnancy.
H: Therapy and industry
- Lithotripsy (focused shock waves break kidney stones), HIFU (focused heating destroys tumours), physiotherapy.
- Non-destructive testing of welds, rails and aircraft parts.
- Ultrasonic cleaning (cavitation bubbles), welding plastics, humidifiers.
H: In nature
P: Bats echolocate at 20–200 kHz, resolving insects a few mm across; dolphins use clicks up to 150 kHz. Some moths evolved hearing tuned to bat calls and jamming clicks.
X: An echo returns 65 μs after a 5 MHz pulse. How deep is the boundary? What's the wavelength?
> d = 1540 × 65 × 10^{-6}/2 = 5.0 cm
> λ = 1540/5 × 10^{6} = 0.31 mm
!: Ultrasound can't image through air or bone well: huge impedance mismatches reflect nearly everything (lungs and brain are hard to scan).
Q: How is depth found in ultrasound imaging? | From the echo time: d = vt/2.
Q: What trade-off sets ultrasound frequency choice? | Higher frequency gives better resolution but less penetration.
M1: Ultrasound is sound above: | 20 kHz | 20 Hz | 2 MHz | 200 kHz | Upper limit of hearing.
M2: Why is ultrasound preferred to X-rays in pregnancy? | It is non-ionising | It's higher resolution | It sees through bone | It's faster | No ionising radiation.
T: Pulse-echo imaging | Timing echoes of short ultrasound pulses to find the depth of tissue boundaries
T: Piezoelectric transducer | A crystal that converts electrical signals to ultrasound and back
T: Attenuation coefficient | Loss in dB per cm per MHz; about 0.5 dB cm^{-1} MHz^{-1} in soft tissue
SUM: Depth = vt/2 with v ≈ 1540 m s^{-1} in soft tissue.
SUM: Higher frequency gives finer resolution but less penetration.
SRC: Szabo T. L., Diagnostic Ultrasound Imaging: Inside Out, 2nd edition, Academic Press | secondary | 2014
SRC: British Medical Ultrasound Society, Guidelines for the safe use of diagnostic ultrasound equipment | guidance | 2009
EV: established | Standard medical physics; diagnostic ultrasound is considered safe at regulated exposures.
Q: Why is ultrasound safer than X-rays for imaging a fetus? | It is non-ionising; at diagnostic levels it causes no known harm.
M3@2,3: An echo returns 65 μs after the pulse (v = 1540 m s^{-1}). How deep is the reflecting boundary? | About 5.0 cm | About 10 cm | About 2.5 cm | About 1.0 cm | d = vt/2 = 1540 × 65 × 10^{-6}/2 ≈ 0.050 m.
SA2@2: Explain why a 3 MHz probe is used for abdominal scans but a 10 MHz probe for imaging a tendon near the skin. | Resolution improves with frequency (shorter wavelength: 0.5 mm at 3 MHz, 0.15 mm at 10 MHz), but attenuation rises with frequency. Deep abdominal organs need penetration of 15–20 cm, so a lower frequency is used; a shallow tendon allows a high frequency for fine detail. | resolution better at high frequency ; attenuation rises with frequency ; deep organs need lower frequency ; shallow structures allow higher

## Infrasound
S: Infrasound is sound below about 20 Hz, too low to hear as a tone. It travels enormous distances with little absorption and is produced by volcanoes, storms, earthquakes, meteors, wind turbines and explosions, and used by elephants and whales.
LV: Intermediate · Foundation
O: Describe natural and artificial sources of infrasound
O: Explain why infrasound travels so far and how it is used for monitoring
PRE: Sound wave propagation
H: Properties
- Long wavelengths (17 m at 20 Hz, 340 m at 1 Hz) pass round obstacles.
- Very low atmospheric absorption: detectable thousands of kilometres away.
- Can be felt as pressure or vibration at high levels; claims of eerie effects at moderate levels are weakly supported.
H: Sources and uses
- Natural: volcanic eruptions (Krakatoa 1883 and Hunga Tonga 2022 pressure waves circled Earth several times), avalanches, auroras, ocean "microbaroms".
- The CTBTO's International Monitoring System uses 60 infrasound stations to detect nuclear explosions.
- Meteors: the 2013 Chelyabinsk airburst was located and its energy (~500 kt) estimated by infrasound.
- Animals: elephants communicate at 14–35 Hz over several km.
X: Why could Hunga Tonga's eruption be detected worldwide by barometers?
> Its pressure pulse (a Lamb wave) had huge wavelengths and low absorption
> It travelled ~310 m s^{-1} and circled Earth at least four times
!: Infrasound isn't inaudible because it's quiet; the ear's sensitivity drops sharply below 20 Hz.
Q: Why does infrasound travel so far? | Atmospheric absorption is very low at low frequencies.
Q: Give a use of infrasound monitoring. | Detecting nuclear tests, volcanic eruptions or meteors.
M1: Infrasound is sound below about: | 20 Hz | 20 kHz | 200 Hz | 2 Hz | Lower limit of hearing.
M2: Elephants communicate over long distances using: | Infrasound | Ultrasound | Radio waves | Light | Low-frequency rumbles.
T: Infrasound | Sound below about 20 Hz
T: Microbarometer | A sensitive pressure sensor used to detect infrasound
SUM: Sources: volcanoes, storms, ocean waves (microbaroms), meteors, explosions, wind turbines, elephants.
SUM: Absorption falls steeply with frequency, so infrasound crosses continents; a global network monitors for nuclear tests.
SRC: Le Pichon A., Blanc E., Hauchecorne A. (eds), Infrasound Monitoring for Atmospheric Studies, 2nd edition, Springer | secondary | 2019
SRC: Comprehensive Nuclear-Test-Ban Treaty Organization, "Infrasound monitoring" | guidance | 2024 | https://www.ctbto.org/our-work/monitoring-technologies/infrasound-monitoring
EV: established | Infrasound propagation is well studied; claims about health effects of everyday infrasound levels are not supported by current evidence.
Q: Why does infrasound travel thousands of kilometres? | Air absorbs very low frequencies extremely weakly, and atmospheric layers duct it.
M3@2,3: The 2022 Hunga Tonga eruption's pressure wave circled Earth several times. Roughly how long did one circuit take at about 310 m s^{-1}? | About 36 hours | About 4 hours | About 5 days | About 10 minutes | Circumference ≈ 4.0 × 10^{7} m; 4.0 × 10^{7}/310 ≈ 1.3 × 10^{5} s ≈ 36 h.
SA2@1,2: Explain why nuclear-test monitoring uses infrasound as well as seismometers. | An atmospheric or near-surface explosion couples little energy into the ground but sends a strong pressure wave through the air. Its infrasound travels thousands of kilometres with little loss, so a global network of microbarometer arrays can detect and locate it. | atmospheric blasts couple weakly to the ground ; strong pressure wave in air ; infrasound travels far ; arrays detect and locate

## Sonar
S: Sonar (sound navigation and ranging) uses sound in water to detect, locate and image objects. Because light and radio waves are absorbed quickly in seawater, sound is the ocean's main sensing tool.
LV: Intermediate · Application
O: Explain active and passive sonar and calculate ranges
O: Describe how sound speed changes with depth create ducts and shadow zones
PRE: Ultrasound
H: Types
- **Active**: send a ping, time the echo: d = vt/2 (v ≈ 1500 m s^{-1}).
- **Passive**: listen for sounds made by ships, whales or submarines.
- **Side-scan** and **multibeam**: map the seabed in swaths; synthetic aperture sonar gives cm resolution.
H: Physics of performance
- The sonar equation balances source level, transmission loss (spreading + absorption), target strength, noise and detection threshold, all in dB.
- Absorption rises steeply with frequency: low frequencies reach far, high give detail.
- Sound-speed profiles bend rays: shadow zones and the SOFAR channel.
H: History and biology
P: Sonar developed after the Titanic (1912) and through both World Wars. Dolphins and porpoises use biological sonar far more refined than early devices, distinguishing materials and shapes. Military sonar can harm whales, causing strandings.
X: A ping returns from the seabed in 2.4 s. How deep is it?
> d = 1500 × 2.4/2 = 1800 m
!: Sound speed in seawater varies with temperature, salinity and depth (1450–1550 m s^{-1}); accurate ranging needs the profile.
Q: Why is sound used underwater rather than radio or light? | Seawater absorbs EM waves strongly but transmits sound over long distances.
Q: What is passive sonar? | Listening for sounds emitted by targets, without transmitting.
M1: An echo from a submarine returns in 4 s. Distance (v = 1500)? | 3 km | 6 km | 1.5 km | 12 km | d = vt/2.
M2: Low-frequency sonar is used for long range because: | Absorption is lower | It's quieter | Resolution is better | It's cheaper | Absorption rises with frequency.
T: Active sonar | Emitting sound pulses and timing their echoes
T: Passive sonar | Listening for sounds made by targets
T: SOFAR channel | A layer about 1 km deep where sound speed is minimum, trapping sound over thousands of km
SUM: Range = vt/2 with v ≈ 1500 m s^{-1} in seawater.
SUM: Sound speed in the sea depends on temperature, pressure and salinity, so rays bend into ducts and leave shadow zones.
SRC: Urick R. J., Principles of Underwater Sound, 3rd edition, McGraw-Hill | secondary | 1983
SRC: Munk W., Wunsch C., "Ocean acoustic tomography: a scheme for large scale monitoring", Deep Sea Research 26A, 123–161 | primary | 1979 | https://doi.org/10.1016/0198-0149(79)90073-6
EV: established | Standard underwater acoustics.
Q: Why does sonar use sound rather than radar under water? | Seawater absorbs electromagnetic waves strongly, but sound travels far.
M3@2,3: A ship's sonar pulse returns from the sea floor after 4.0 s (v = 1500 m s^{-1}). How deep is the water? | 3000 m | 6000 m | 1500 m | 375 m | d = vt/2 = 1500 × 4.0/2 = 3000 m.
SA2@2: Explain why there is a sound channel (SOFAR) about 1 km deep in the ocean. | Near the surface, warm water makes sound fast; deeper down, temperature falls and so does speed; deeper still, pressure increases speed again. The speed has a minimum around 1 km. Sound rays bend towards the slower water (refraction), so sound in that layer is trapped and travels thousands of kilometres. | temperature lowers speed with depth ; pressure raises it deeper ; minimum near 1 km ; refraction traps sound

## Acoustic levitation
S: Intense standing sound waves can hold small objects suspended in air at their pressure nodes. Acoustic radiation pressure balances gravity, letting scientists handle droplets and particles without touching them.
LV: Advanced · Foundation
O: Explain how acoustic radiation pressure holds objects at nodes of a standing wave
O: Describe uses and limits of acoustic levitation
PRE: Resonance in air columns
H: How it works
- A transducer and reflector (or arrays of transducers) set up a standing wave.
- Small objects (< ~λ/2) feel a time-averaged force towards pressure nodes (Gor'kov potential).
- Nodes are λ/2 apart: at 40 kHz, about 4.3 mm.
H: Applications
- Containerless processing: mixing chemicals or growing crystals with no container contamination.
- Pharmaceutical research: drying drug droplets into amorphous forms.
- Acoustic tweezers in microfluidics sort cells.
- Phased arrays move levitated objects in 3D and even create mid-air haptic feedback and volumetric displays.
X: For a 40 kHz levitator in air, what's the spacing between trapping positions?
> λ = 343/40 000 = 8.6 mm
> Nodes every λ/2 = 4.3 mm
!: Acoustic levitation needs very high sound levels (~150–160 dB), mostly ultrasonic so it's inaudible but still needs care.
Q: Where are particles trapped in an acoustic levitator? | Near pressure nodes of the standing wave.
Q: Why is containerless processing useful? | It avoids contamination and nucleation from container walls.
M1: Trapping positions in an acoustic standing wave are separated by: | λ/2 | λ | λ/4 | 2λ | Node spacing.
M2: Acoustic levitation relies on: | Acoustic radiation pressure | Magnetism | Electrostatics | Buoyancy | Time-averaged force of sound.
T: Acoustic radiation force | A steady force from an intense sound field, from its nonlinear (second-order) effects
T: Pressure node | A point of a standing sound wave where the pressure doesn't vary
SUM: Small, light objects settle near pressure nodes, spaced λ/2 apart.
SUM: Objects must be smaller than about half a wavelength; ultrasonic levitators (around 40 kHz) hold millimetre-sized droplets and beads.
SRC: Andrade M. A. B., Pérez N., Adamowski J. C., "Review of progress in acoustic levitation", Brazilian Journal of Physics 48, 190–213 | secondary | 2018 | https://doi.org/10.1007/s13538-017-0552-6
SRC: Gor'kov L. P., "On the forces acting on a small particle in an acoustical field in an ideal fluid", Soviet Physics Doklady 6, 773–775 | primary | 1962
EV: established | Gor'kov's theory describes small particles; large or dense objects need stronger fields and other designs.
Q: Why is levitation used to study molten materials and droplets? | It holds samples without contact, avoiding contamination from containers.
M3@2,3: A 40 kHz levitator (v = 343 m s^{-1}) holds several beads in a line. How far apart are they? | About 4.3 mm | About 8.6 mm | About 2.1 mm | About 17 mm | λ = 343/40 000 ≈ 8.6 mm; nodes are λ/2 ≈ 4.3 mm apart.
SA2@1,2: Explain why acoustic levitation works only for small, light objects. | The radiation force is a weak second-order effect of the sound field. It must exceed the object's weight, so dense or heavy objects need impractically intense sound. The object must also be smaller than about half a wavelength (a few mm at 40 kHz), or it spans regions of differing pressure and disturbs the standing wave. | radiation force is weak ; must exceed weight ; size below about λ/2 ; large objects disturb the field

## Noise pollution
S: Noise is unwanted sound. Long-term exposure damages hearing and is linked to stress, sleep disturbance and heart disease, making noise one of the largest environmental health problems in cities.
LV: Introductory · Application
O: Describe the effects of noise on hearing and health
O: Apply the exposure–time trade-off and protection measures
SAFE: Hearing damage is permanent. At work, follow your employer's noise assessment and wear the hearing protection provided; for health concerns about hearing, see a qualified professional.
PRE: Decibel scale
H: Health effects
- Noise-induced hearing loss: from sustained exposure above ~85 dB(A) or impulsive sounds above ~140 dB; damage to cochlear hair cells is permanent.
- Tinnitus.
- Non-auditory: disturbed sleep, raised blood pressure, impaired learning in children (WHO guidelines: road traffic below 53 dB L_{den}).
H: Measuring exposure
- L_{eq}: equivalent continuous level over a time period.
- Exchange rate: each +3 dB halves the safe exposure time (85 dB for 8 h ≈ 88 dB for 4 h ≈ 100 dB for 15 min).
H: Control
- At source: quieter engines, tyres and road surfaces; electric vehicles (tyre noise dominates above ~40 km h^{-1}).
- Path: barriers, distance, insulation, planning.
- Receiver: hearing protection, quiet areas.
X: A worker experiences 94 dB(A). How long is the daily safe limit (85 dB for 8 h, 3 dB exchange)?
> 94 − 85 = 9 dB = 3 halvings
> 8 h/8 = 1 hour
!: Hearing damage is cumulative and painless at first; by the time it's noticed, it's permanent.
Q: What is the 3 dB exchange rate? | Each 3 dB increase halves the permissible exposure time.
Q: Name non-auditory effects of chronic noise. | Sleep disturbance, stress, raised blood pressure, cardiovascular disease, learning impairment.
M1: Which reduces traffic noise at the receiver? | A noise barrier | A louder engine | A smaller window | Faster driving | Path control.
M2: Hearing loss from noise is due to damage to: | Cochlear hair cells | The eardrum only | The ear canal | The auditory nerve only | Hair cells don't regrow in humans.
T: Noise-induced hearing loss | Permanent damage to the hair cells of the inner ear from loud or prolonged sound
T: Exchange rate | The rule that each 3 dB rise halves the safe exposure time
T: Daily exposure level | L_{EP,d}, noise exposure averaged over an 8-hour working day
SUM: UK workplace action values: 80 and 85 dB(A) daily exposure, limit 87 dB(A) (Control of Noise at Work Regulations 2005).
SUM: Reduce noise at source, then on its path, then at the listener with protection.
SRC: The Control of Noise at Work Regulations 2005 (SI 2005/1643) | legislation | 2005 | https://www.legislation.gov.uk/uksi/2005/1643
SRC: World Health Organization Regional Office for Europe, Environmental Noise Guidelines for the European Region | guidance | 2018 | https://www.who.int/europe/publications/i/item/9789289053563
EV: established | Hearing damage from sustained high levels is well established; links to cardiovascular and sleep effects are supported but weaker.
Q: Why does a 3 dB rise halve the safe exposure time? | 3 dB is double the intensity, so the same energy is delivered in half the time.
M3@2,3: A worker is exposed to 85 dB(A) for 8 hours. Under the 3 dB rule, how long gives the same dose at 94 dB(A)? | 1 hour | 4 hours | 2 hours | 30 minutes | 94 − 85 = 9 dB, three halvings: 8 → 4 → 2 → 1 hour.
SA2@1,2: Explain why loud music through earphones can damage hearing though it doesn't feel painful. | Pain begins around 120–130 dB, but hair cells are damaged by long exposure at much lower levels, such as 85–100 dB for hours. Earphones deliver sound close to the eardrum and are often played loud for long periods; the damage builds up gradually and is permanent, often noticed first as ringing (tinnitus). | damage threshold far below pain ; dose depends on level and time ; earphones often loud and long ; permanent, cumulative loss

## Psychoacoustics
S: Psychoacoustics studies how we perceive sound. The ear and brain aren't a neutral microphone: they compress loudness, mask quiet sounds, locate sources, and fill in missing information, and audio compression exploits all of this.
LV: Intermediate · Foundation
O: Describe masking, equal-loudness contours and critical bands
O: Explain how perceptual audio coding uses them
PRE: Pitch, loudness and timbre
H: The ear
- Outer ear collects and filters (pinna cues for direction); middle ear matches impedance; cochlea separates frequencies along the basilar membrane (high at the base, low at the apex).
- Critical bands: the ear analyses sound in ~25 overlapping frequency bands.
H: Key effects
- **Masking**: a loud sound hides quieter ones at nearby frequencies (and briefly before and after).
- **Localisation**: interaural time differences (up to ~0.7 ms) for low frequencies, interaural level differences for high; pinna shape for elevation.
- **Precedence effect**: we locate sound by the first arrival, ignoring early reflections.
- **Missing fundamental** and auditory illusions (Shepard tone).
H: Applications
P: MP3 and AAC compression remove sounds the ear can't detect because of masking, cutting data by ~10 times with little audible loss. Spatial audio uses head-related transfer functions to place sounds around you in headphones.
X: Why is it hard to tell whether a low hum comes from in front or behind?
> Low frequencies give little level difference and pinna filtering is weak
> Front–back confusion; turning your head breaks the ambiguity
!: Perceived loudness, pitch and timbre aren't simple physical measurements; they depend on context and listener.
Q: What is auditory masking? | A loud sound making quieter sounds at nearby frequencies inaudible.
Q: How does lossy audio compression exploit psychoacoustics? | It discards sounds masked by louder ones.
M1: The cochlea separates frequencies: | Along the basilar membrane | In the eardrum | In the ear canal | In the brain only | Place coding.
M2: For low-frequency sounds we localise mainly using: | Interaural time differences | Pinna reflections | Colour | Level differences | ITD dominates below ~1.5 kHz.
T: Masking | A sound becoming inaudible because of another louder sound nearby in frequency or time
T: Critical band | The frequency range within which sounds interact strongly in the ear
T: Phon | The loudness level of a sound: equal to the dB of a 1 kHz tone that sounds equally loud
SUM: The ear compresses, filters and masks; it is not a flat microphone.
SUM: MP3 and AAC discard components masked by louder ones, saving data with little audible loss.
SRC: Moore B. C. J., An Introduction to the Psychology of Hearing, 6th edition, Brill | secondary | 2012
SRC: Zwicker E., Fastl H., Psychoacoustics: Facts and Models, 3rd edition, Springer | secondary | 2007
EV: established | Robust psychoacoustic findings; individual hearing differs.
Q: How does MP3 compression save space? | It drops sound components that would be masked by louder ones and so not heard.
M3@2,3: Why is a quiet 1.1 kHz tone hard to hear while a loud 1.0 kHz tone plays, but easy to hear next to a loud 4 kHz tone? | It falls in the same critical band as the 1.0 kHz tone, so it is masked | Tones above 1 kHz are always inaudible | The 4 kHz tone amplifies nearby sounds | The ear can only hear one tone at a time | Masking is strongest within a critical band, and far weaker for widely separated frequencies.
SA2@2: Explain how we tell which direction a sound comes from. | For low frequencies the brain uses the tiny time difference between the ears (up to about 0.7 ms); for high frequencies the head shadows sound, giving a level difference. The outer ear's shape filters sound differently by elevation and front/back, and small head movements resolve ambiguities. | interaural time difference ; interaural level difference ; pinna filtering ; head movements

## Bioacoustics
S: Bioacoustics studies sound production, hearing and communication in animals, and how sound is used to study them. Animals use sound to navigate, hunt, attract mates and warn each other, over frequencies from infrasound to ultrasound.
LV: Intermediate · Foundation
O: Describe how animals produce and hear sound, including echolocation
O: Explain how acoustic monitoring is used in conservation
PRE: Sonar
H: Producing and hearing sound
- Birds: the syrinx, which can make two notes at once.
- Insects: stridulation (crickets rub wings), tymbals (cicadas, up to ~100 dB).
- Whales: songs (humpbacks) and low-frequency calls (blue whales, ~10–40 Hz, among the loudest animal sounds).
- Hearing ranges: humans 20 Hz–20 kHz, dogs to ~45 kHz, bats to ~200 kHz, elephants down to infrasound.
H: Echolocation
P: Bats and toothed whales emit calls and analyse echoes for range (delay), size (intensity), texture (spectrum) and motion (Doppler). Some bats compensate for their own flight's Doppler shift to keep echoes in their most sensitive band.
H: Passive acoustic monitoring
- Microphone and hydrophone networks track species, migration and ecosystem health; machine learning classifies calls.
- Soundscape ecology: biodiversity reflected in the richness of natural sound.
- Human noise (shipping, construction) interferes with animal communication.
X: A bat calls at 50 kHz. What's the smallest prey it can detect well?
> λ = 343/50 000 = 6.9 mm
> Objects comparable to λ or larger reflect well: insects of several mm
!: Animals perceive sound very differently from us; "silent" environments can be noisy at frequencies we can't hear.
Q: How do bats judge the distance to prey? | From the delay between their call and the returning echo.
Q: What is passive acoustic monitoring? | Using recordings of animal sounds to study populations and ecosystems without disturbing them.
M1: Which animal echolocates? | Dolphin | Elephant | Cricket | Humpback whale (song) | Toothed whales use clicks.
M2: Blue whale calls are around: | 10–40 Hz | 2 kHz | 50 kHz | 200 kHz | Very low frequency.
T: Echolocation | Locating objects by emitting sounds and analysing their echoes
T: Passive acoustic monitoring | Recording natural soundscapes to survey animals
SUM: Bats echolocate at about 20–200 kHz; toothed whales use clicks; elephants communicate with infrasound.
SUM: Recordings let biologists count species and track behaviour without disturbing them.
SRC: Griffin D. R., Listening in the Dark: The Acoustic Orientation of Bats and Men, Yale University Press | primary | 1958
SRC: Au W. W. L., The Sonar of Dolphins, Springer | secondary | 1993
EV: established | Echolocation in bats and toothed whales is thoroughly documented.
Q: Why do bats use high frequencies for echolocation? | Short wavelengths reflect well from small insects and give fine detail.
M3@2,3: A bat uses 50 kHz calls (v = 343 m s^{-1}). About what is the smallest insect it can easily detect? | A few millimetres, about one wavelength (6.9 mm) | A few metres, much bigger than the wavelength | A few micrometres, much smaller than the wavelength | Any size, since echolocation has no limit | Objects much smaller than λ scatter weakly; λ = 343/50 000 ≈ 6.9 mm.
SA2@1,2: Explain why noise from ships is a concern for whales. | Whales rely on sound to communicate, navigate and find food, often over long distances. Ship engines and propellers produce loud low-frequency noise that travels far in water and overlaps whale call frequencies, masking their calls, reducing their communication range and causing stress and changes in behaviour. | whales rely on sound ; ship noise is low-frequency and travels far ; masks calls ; affects behaviour and communication
`;
