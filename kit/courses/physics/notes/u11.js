// Unit 11: Acoustics and Sound. Format: kit/course/notes.js
export default `
## Sound wave propagation
S: Sound is a longitudinal pressure wave: regions of compression and rarefaction travel through a medium. Its speed depends on the medium's stiffness and density, and in gases on temperature.
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

## Sound pressure and intensity
S: Sound can be measured by its pressure amplitude (what microphones detect) or its intensity (power per unit area). The two are related through the medium's acoustic impedance.
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

## Decibel scale
S: The decibel scale measures sound level logarithmically, matching the ear's roughly logarithmic response and compressing a trillion-fold range into 0–120 dB.
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

## Pitch, loudness and timbre
S: Pitch, loudness and timbre are how we perceive sound. They correspond roughly, but not exactly, to frequency, intensity and spectrum, because the ear and brain interpret sound in complex ways.
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

## Frequency spectra
S: A frequency spectrum shows how much of each frequency a sound contains. Musical notes have line spectra of harmonics; noises have broad, continuous spectra; speech has formant peaks that make vowels recognisable.
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

## Harmonics and overtones
S: Most musical sounds contain a fundamental plus higher frequencies. When these are whole-number multiples of the fundamental they're harmonics; the general term for frequencies above the fundamental is overtones.
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

## Resonance in air columns
S: Air in a tube resonates at frequencies where standing sound waves fit its length. Open ends are displacement antinodes, closed ends are nodes, and these conditions set the notes of flutes, clarinets, organ pipes and bottles.
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

## Musical instruments and acoustics
S: Every instrument couples a vibrating source to a resonator and a radiator. Physics explains why each sounds as it does and how players change pitch, loudness and tone.
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

## Doppler effect
S: The Doppler effect is the change in observed frequency when the source and observer move relative to each other. Approaching sounds are higher-pitched; receding ones lower. The same effect for light measures stellar velocities and the expansion of the universe.
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

## Beats and interference
S: Sound waves interfere like all waves: overlapping coherent sounds reinforce or cancel at different places, and nearly equal frequencies beat. These effects are used in tuning, noise cancellation and speaker design.
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

## Acoustic impedance
S: Acoustic impedance is a medium's resistance to sound: the product of its density and sound speed. The difference in impedance between two media decides how much sound reflects at the boundary, which is the basis of ultrasound imaging.
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

## Reflection and absorption of sound
S: When sound hits a surface, some reflects, some is absorbed, and some is transmitted. Hard smooth surfaces reflect strongly; soft porous materials absorb, especially high frequencies. Managing these processes is the core of noise control.
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

## Reverberation
S: Reverberation is the persistence of sound in a room after the source stops, as countless reflections decay. Its duration shapes how a space sounds: long for cathedrals and organ music, short for lecture rooms and studios.
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

## Architectural acoustics
S: Architectural acoustics designs spaces so sound is clear, balanced and free of defects, and so unwanted noise is kept out. It balances reverberation, reflections, diffusion, background noise and insulation.
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

## Ultrasound
S: Ultrasound is sound above the range of human hearing (> 20 kHz). Its short wavelengths make it ideal for imaging inside the body, testing materials, cleaning, and even breaking kidney stones.
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

## Infrasound
S: Infrasound is sound below about 20 Hz, too low to hear as a tone. It travels enormous distances with little absorption and is produced by volcanoes, storms, earthquakes, meteors, wind turbines and explosions, and used by elephants and whales.
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

## Sonar
S: Sonar (sound navigation and ranging) uses sound in water to detect, locate and image objects. Because light and radio waves are absorbed quickly in seawater, sound is the ocean's main sensing tool.
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

## Acoustic levitation
S: Intense standing sound waves can hold small objects suspended in air at their pressure nodes. Acoustic radiation pressure balances gravity, letting scientists handle droplets and particles without touching them.
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

## Noise pollution
S: Noise is unwanted sound. Long-term exposure damages hearing and is linked to stress, sleep disturbance and heart disease, making noise one of the largest environmental health problems in cities.
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

## Psychoacoustics
S: Psychoacoustics studies how we perceive sound. The ear and brain aren't a neutral microphone: they compress loudness, mask quiet sounds, locate sources, and fill in missing information, and audio compression exploits all of this.
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

## Bioacoustics
S: Bioacoustics studies sound production, hearing and communication in animals, and how sound is used to study them. Animals use sound to navigate, hunt, attract mates and warn each other, over frequencies from infrasound to ultrasound.
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
`;
