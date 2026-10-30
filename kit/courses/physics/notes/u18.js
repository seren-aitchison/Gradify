// Unit 18: Electromagnetic Waves. Format: kit/course/notes.js
export default `
## Electromagnetic wave propagation
S: Electromagnetic waves are self-sustaining oscillations of electric and magnetic fields that travel through space at the speed of light. They need no medium and carry energy, momentum and information across the universe.
H: How they propagate
- A changing E field creates a changing B field (Ampère–Maxwell), which creates E (Faraday), and so on.
- E and B are perpendicular to each other and to the direction of travel: transverse waves.
- Produced by accelerating charges: oscillating currents in antennas, electron transitions in atoms, accelerated particles in synchrotrons.
H: In matter
E: v = c/n; n = √(ε_{r}μ_{r})
- Slower in matter because the field drives bound charges, which re-radiate, and the combined wave is delayed.
- Absorption and dispersion depend on frequency.
H: Spreading and attenuation
- Point sources: intensity ∝ 1/r^{2}; field amplitude ∝ 1/r.
- In conductors waves decay within a skin depth; in plasmas below the plasma frequency they reflect.
X: Light from the Sun takes how long to reach Earth (1.5 × 10^{11} m)?
> t = 1.5 × 10^{11}/3 × 10^{8} = 500 s ≈ 8.3 min
!: EM waves don't need a medium; the 19th-century "luminiferous ether" was abandoned after Michelson–Morley and special relativity.
Q: What produces electromagnetic waves? | Accelerating charges.
Q: Why does light travel slower in glass? | The field drives bound electrons to re-radiate, and the superposed wave advances more slowly.
M1: EM waves are: | Transverse | Longitudinal | Both | Neither | E and B perpendicular to travel.
M2: The amplitude of E from a point source falls as: | 1/r | 1/r^{2} | 1/r^{3} | Constant | Intensity ∝ 1/r^{2}.

## Speed of light
S: The speed of light in vacuum, c = 299 792 458 m s^{-1}, is a universal constant: the same for all observers and the maximum speed for any signal. Since 1983 it's exact by definition, fixing the metre.
H: History of measurement
- Rømer (1676): delays in eclipses of Jupiter's moon Io.
- Fizeau (1849): toothed wheel; Foucault: rotating mirror.
- Michelson: refined rotating mirrors to ~0.01%.
- Laser interferometry and frequency measurements (1970s) led to defining c exactly.
H: Physical significance
- c = 1/√(μ_{0}ε_{0}) from Maxwell's equations.
- Invariant in all inertial frames: the foundation of special relativity.
- Converts mass and energy (E = mc^{2}) and time and space (light-year ≈ 9.46 × 10^{15} m).
- Gravitational waves travel at c too (GW170817).
H: Slow and fast light
P: In media with strong dispersion, light pulses can be slowed to metres per second (Hau, 1999, in a Bose–Einstein condensate) or appear to travel "faster than c" (group velocity > c in anomalous dispersion), but no information ever exceeds c.
X: A signal to the Moon (3.84 × 10^{8} m) and back. Delay?
> 2 × 3.84 × 10^{8}/3 × 10^{8} = 2.56 s
!: "Light-year" is a distance, not a time.
Q: Why is the speed of light exact? | Since 1983 the metre has been defined from it.
Q: How did Rømer estimate the speed of light? | From delays in the eclipses of Io when Jupiter was farther from Earth.
M1: c in m s^{-1} is: | 299 792 458 | 300 000 000 exactly | 3 × 10^{6} | 186 000 | Defined value.
M2: Light has been slowed to walking speed in: | A Bose–Einstein condensate | Glass | Water | Diamond | Electromagnetically induced transparency.

## Electric and magnetic field relationships
S: In an electromagnetic wave, the electric and magnetic fields are locked together: perpendicular to each other and the direction of travel, in phase, and with sizes in the fixed ratio E/B = c.
H: Relationships (plane wave in vacuum)
E: E = cB
E: E × B points along the direction of propagation
E: E = E_{0} cos(kz − ωt) x̂; B = (E_{0}/c) cos(kz − ωt) ŷ
- Equal energy densities: ½ε_{0}E^{2} = B^{2}/(2μ_{0}).
- In a medium: E/B = v = c/n.
H: Near sources
P: Close to an antenna (the near field) the fields aren't in phase and E/B isn't c; they store energy that sloshes back and forth. The wave relationships only hold in the far field.
X: Sunlight at Earth has E_{rms} ≈ 720 V m^{-1}. B_{rms}?
> B = E/c = 2.4 × 10^{-6} T, about 1/20 of Earth's magnetic field
!: B in a wave is numerically small in tesla, but its energy density equals E's: don't conclude that the magnetic part is negligible.
Q: How are E and B related in an EM wave in vacuum? | Perpendicular, in phase, with E = cB.
Q: Which direction does an EM wave travel? | Along E × B.
M1: An EM wave has E_{0} = 300 V m^{-1}. B_{0} = ? | 1 μT | 300 T | 1 mT | 9 × 10^{10} T | E/c.
M2: In a plane EM wave, the electric and magnetic energy densities are: | Equal | E's is larger | B's is larger | Zero | ε_{0}E^{2} = B^{2}/μ_{0}.

## Electromagnetic wave equation
S: Combining Maxwell's equations in empty space gives a wave equation for E and B, with wave speed 1/√(μ_{0}ε_{0}) = c. Its plane-wave solutions describe all electromagnetic radiation.
H: Derivation
- Take the curl of Faraday's law: ∇ × (∇ × E) = −∂(∇ × B)/∂t.
- Use ∇ × (∇ × E) = ∇(∇·E) − ∇^{2}E with ∇·E = 0 and the Ampère–Maxwell law.
E: ∇^{2}E = μ_{0}ε_{0}∂^{2}E/∂t^{2}; same for B
H: Solutions
E: E = E_{0}e^{i(k·r − ωt)}, ω = c|k|
- Transversality: k·E = 0, k·B = 0.
- In conductors: ∇^{2}E = μσ∂E/∂t + με∂^{2}E/∂t^{2}: damped waves, skin depth.
- In plasmas: ω^{2} = ω_{p}^{2} + c^{2}k^{2}: no propagation below the plasma frequency.
H: Significance
P: The wave speed came out as a combination of electrical constants measured on the bench (Weber and Kohlrausch, 1856), and matched the measured speed of light. Maxwell wrote that "light consists in the transverse undulations of the same medium which is the cause of electric and magnetic phenomena".
X: Ionosphere electron density 10^{12} m^{-3}. Plasma frequency?
> f_{p} ≈ 9√n Hz = 9 × 10^{6} Hz = 9 MHz
> Shortwave below this reflects; FM (100 MHz) passes through
!: The wave equation in vacuum is non-dispersive: all frequencies travel at c.
Q: What wave speed comes from Maxwell's equations? | c = 1/√(μ_{0}ε_{0}).
Q: Why do AM/shortwave signals reflect off the ionosphere while FM doesn't? | Frequencies below the plasma frequency reflect; FM frequencies are above it.
M1: In vacuum, ω and k are related by: | ω = ck | ω = ck^{2} | ω = c/k | ω = constant | Non-dispersive.
M2: EM waves in a conductor: | Decay within a skin depth | Travel unattenuated | Speed up | Become longitudinal | Damping by currents.

## Electromagnetic spectrum
S: Electromagnetic waves range from radio waves kilometres long to gamma rays smaller than nuclei. They're all the same phenomenon; frequency (and photon energy) decides how they're produced, how they interact with matter, and what they're used for.
H: The bands
- **Radio**: λ > 1 m (f < 300 MHz).
- **Microwaves**: 1 mm–1 m.
- **Infrared**: 700 nm–1 mm.
- **Visible**: 400–700 nm.
- **Ultraviolet**: 10–400 nm.
- **X-rays**: 0.01–10 nm.
- **Gamma rays**: < 0.01 nm (nuclear origin, or > ~100 keV).
H: Photon energy
E: E = hf = hc/λ; hc ≈ 1240 eV nm
- Visible photons: 1.8–3.1 eV (chemistry). UV above ~3 eV breaks bonds; X-rays and gamma rays ionise.
H: Atmospheric windows
P: Earth's atmosphere transmits visible light, some infrared and radio waves, but blocks most UV, X-rays, gamma rays and much infrared. That's why X-ray and gamma-ray telescopes, and many infrared ones, must fly in space.
X: Photon energy of green light (λ = 520 nm)?
> E = 1240/520 = 2.4 eV
!: All EM waves travel at c in vacuum; only frequency and wavelength differ.
Q: List the EM spectrum from longest to shortest wavelength. | Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.
Q: Why must X-ray telescopes be in space? | The atmosphere absorbs X-rays.
M1: Photon energy of 124 nm UV: | 10 eV | 1 eV | 100 eV | 0.1 eV | 1240/124.
M2: Which band has the highest frequency? | Gamma rays | Radio | Visible | Microwave | Shortest λ.

## Radio waves
S: Radio waves have the longest wavelengths in the EM spectrum. Produced by oscillating currents in antennas, they carry broadcasting, mobile phones, Wi-Fi, navigation and much of astronomy.
H: Bands and uses
- LF/MF (30 kHz–3 MHz): AM radio, navigation; ground waves follow Earth's curvature.
- HF (3–30 MHz): shortwave; reflects off the ionosphere for worldwide range.
- VHF/UHF (30 MHz–3 GHz): FM, TV, mobile phones, Wi-Fi (2.4 GHz), GPS (1.2–1.6 GHz); line of sight.
H: Modulation
- AM: amplitude varies with the signal.
- FM: frequency varies; better noise immunity.
- Digital: phase and amplitude keyed (QAM in Wi-Fi and 5G).
- Bandwidth needed grows with data rate (Shannon: C = B log_{2}(1 + SNR)).
H: Radio astronomy
P: Radio telescopes detect the 21 cm hydrogen line (mapping galaxies), pulsars, quasars and the cosmic microwave background. Very-long-baseline interferometry combines dishes across Earth; the Event Horizon Telescope imaged black-hole shadows (M87*, 2019; Sgr A*, 2022).
X: Wavelength of a 100 MHz FM signal? Suitable antenna length (half-wave)?
> λ = 3 × 10^{8}/10^{8} = 3 m
> Half-wave dipole: 1.5 m
!: Radio waves aren't sound; they're EM waves that carry sound information after demodulation.
Q: Why does HF radio travel round the world? | It reflects off the ionosphere.
Q: What does the 21 cm line reveal? | The distribution of neutral hydrogen in galaxies.
M1: Wi-Fi at 2.4 GHz has wavelength: | 12.5 cm | 1.25 m | 1.25 cm | 125 m | c/f.
M2: FM has better noise immunity than AM because: | Noise mostly affects amplitude | FM is louder | FM is lower frequency | FM uses light | Information in frequency.

## Microwaves
S: Microwaves span wavelengths from about 1 mm to 1 m. They heat food, carry mobile and satellite communications, power radar, and reveal the cosmic microwave background left over from the Big Bang.
H: Uses
- **Cooking**: 2.45 GHz drives rotation of water molecules; heating penetrates a few cm.
- **Communications**: mobile networks (to ~40 GHz for 5G mmWave), satellite links, Wi-Fi.
- **Radar**: timing echoes for distance, Doppler for speed (weather radar, speed guns, aircraft).
- **Remote sensing**: sees through clouds; synthetic aperture radar maps terrain.
- **Astronomy**: the CMB at 2.725 K peaks at ~1 mm.
H: Generation
- Magnetrons (ovens, early radar), klystrons and travelling-wave tubes (high power), solid-state transistors (GaN, GaAs) for phones and radar arrays.
- Masers: microwave amplification by stimulated emission (precursor of lasers; hydrogen masers are precise clocks).
H: Safety
P: Microwaves are non-ionising: photon energy ~10^{-5} eV, far below what breaks chemical bonds. Their effect at high power is heating; exposure limits keep heating negligible. Mobile phones emit < 2 W.
X: A radar echo returns after 200 μs. Range?
> d = ct/2 = 3 × 10^{8} × 2 × 10^{-4}/2 = 30 km
!: Microwave ovens heat water molecules mainly by dielectric loss, not at a special "resonance" of water; 2.45 GHz is chosen for penetration and regulation.
Q: How do microwave ovens heat food? | The oscillating field rotates polar water molecules; dielectric friction produces heat.
Q: Why are microwaves non-ionising? | Their photon energies are far too small to break bonds or ionise atoms.
M1: The CMB is observed mainly as: | Microwaves | X-rays | Visible light | Gamma rays | 2.7 K.
M2: Radar measures distance from: | Echo time delay | Brightness | Colour | Polarisation only | d = ct/2.

## Infrared radiation
S: Infrared radiation lies between visible light and microwaves. Every warm object emits it, making it the radiation of heat, night vision and thermal imaging, as well as remote controls and fibre-optic communications.
H: Regions
- Near-IR (0.7–1.4 μm): fibre optics (1.3, 1.55 μm), remote controls, night-vision with illumination.
- Mid-IR (3–8 μm): molecular vibrations (spectroscopy), heat-seeking sensors.
- Thermal IR (8–15 μm): emission from objects at room temperature; thermal cameras.
- Far-IR (15 μm–1 mm): cold dust in space.
H: Uses
- Thermal imaging: building heat loss, medicine, firefighting, search and rescue.
- IR spectroscopy identifies molecules from absorption bands (C=O at ~5.8 μm).
- Astronomy: JWST sees through dust and detects highly redshifted early galaxies.
- Greenhouse effect: CO_{2} and H_{2}O absorb thermal IR.
H: Discovery
P: William Herschel (1800) placed a thermometer beyond the red end of a prism's spectrum and found it heated more than in the visible: the first discovery of invisible light.
X: Peak emission of a person at 310 K?
> λ = 2.9 × 10^{-3}/310 = 9.4 μm (thermal infrared)
!: Glass is transparent to visible but opaque to thermal infrared; thermal cameras use germanium or chalcogenide lenses.
Q: Who discovered infrared radiation and how? | William Herschel, by finding a thermometer heated beyond the red end of the spectrum.
Q: Why does JWST observe in infrared? | It sees through dust and detects light from distant galaxies redshifted from visible to infrared.
M1: Fibre-optic communication commonly uses: | 1.55 μm | 10 μm | 500 nm | 1 mm | Low loss window.
M2: Thermal cameras detect mostly: | 8–14 μm | 400–700 nm | 1 mm | X-rays | Room-temperature emission.

## Visible light
S: Visible light is the narrow band of EM wavelengths, about 400–700 nm, that human eyes detect. It's where the Sun's output peaks and where the atmosphere and water are transparent, which is probably why eyes evolved to use it.
H: Colour
- Violet ~400 nm, blue ~470, green ~530, yellow ~580, orange ~600, red ~700 nm.
- White light is a mixture of wavelengths.
- Colour vision: three cone types (S, M, L) peaking near 420, 530 and 560 nm; colours are the brain's interpretation of their relative responses.
- Additive mixing (screens: RGB); subtractive mixing (pigments: CMY).
H: Why the sky is blue and sunsets red
E: I_{scattered} ∝ 1/λ^{4} :: Rayleigh scattering
P: Air molecules scatter short wavelengths far more than long ones, so blue fills the sky. At sunset, light passes through more air and loses its blue, leaving reds and oranges. Larger particles (clouds) scatter all wavelengths equally (Mie scattering): clouds look white.
H: Interaction with matter
- Electronic transitions in molecules absorb particular wavelengths, giving colours to dyes, leaves (chlorophyll absorbs red and blue) and gems.
X: How much more strongly is 450 nm light scattered than 700 nm?
> (700/450)^{4} = 5.9 times
!: An object's colour depends on the light illuminating it; a red apple under blue light looks dark.
Q: Why is the sky blue? | Air molecules scatter shorter (blue) wavelengths much more strongly (Rayleigh, ∝ 1/λ^{4}).
Q: How do screens make colours? | Additive mixing of red, green and blue light.
M1: The visible range is about: | 400–700 nm | 100–400 nm | 700–1000 nm | 1–10 μm | Human eye sensitivity.
M2: Clouds look white because: | Large droplets scatter all wavelengths similarly | They emit white light | They absorb blue | They're cold | Mie scattering.

## Ultraviolet radiation
S: Ultraviolet radiation has wavelengths shorter than violet light, 10–400 nm. Its photons carry enough energy to break chemical bonds, so it causes sunburn and skin cancer but also sterilises water and makes vitamin D.
H: Bands
- **UVA** (315–400 nm): penetrates deep into skin; ageing; reaches the ground.
- **UVB** (280–315 nm): sunburn, vitamin D synthesis, DNA damage; mostly absorbed by ozone.
- **UVC** (100–280 nm): germicidal; fully absorbed by the atmosphere.
- **Extreme UV** (10–100 nm): absorbed by air; used in chip lithography (13.5 nm EUV).
H: Uses
- Sterilisation: UVC lamps (254 nm) damage microbial DNA.
- Fluorescence: UV excites materials that emit visible light (security marks, mineral identification).
- Lithography: EUV light patterns the smallest transistor features (~few nm).
- Astronomy: hot young stars and the solar corona.
H: Ozone layer
P: Stratospheric ozone absorbs most UVB and all UVC. CFCs destroyed ozone, creating the Antarctic ozone hole; the 1987 Montreal Protocol banned them, and the layer is slowly recovering, a rare global environmental success.
X: Photon energy at 254 nm?
> E = 1240/254 = 4.9 eV, enough to break many organic bonds
!: Clouds don't block much UV; you can burn on cloudy days.
Q: Why is UVC used for sterilisation? | Its photons damage microbial DNA.
Q: What does the ozone layer absorb? | Most UVB and all UVC.
M1: Which UV band causes most sunburn? | UVB | UVA | UVC | EUV | 280–315 nm.
M2: EUV lithography uses: | 13.5 nm light | 254 nm | 400 nm | 1 nm | Advanced chipmaking.

## X-rays
S: X-rays are high-energy photons (about 100 eV to 100 keV) produced by decelerating electrons and by inner-shell electron transitions. They pass through soft tissue but are absorbed by bone and metal, revolutionising medicine since 1895.
H: Production
- X-ray tube: electrons accelerated through tens of kV hit a tungsten target.
- **Bremsstrahlung**: continuous spectrum up to eV_{max} (Duane–Hunt limit λ_{min} = hc/eV).
- **Characteristic lines**: inner-shell transitions (Kα, Kβ) specific to the target.
- Synchrotrons: intense, tunable X-ray beams from electrons circling in storage rings.
H: Interactions
E: I = I_{0}e^{−μx}
- Photoelectric absorption (∝ Z^{3}/E^{3} roughly: why bone and contrast agents show up).
- Compton scattering (dominant at higher energies in tissue).
H: Uses
- Radiography, CT scans (3D from many angles), mammography.
- X-ray crystallography: diffraction reveals atomic structures (DNA, proteins, drugs).
- Airport security; astronomy (black hole accretion, hot cluster gas).
- Ionising: doses kept as low as reasonably achievable.
X: Minimum wavelength from a 50 kV X-ray tube?
> λ_{min} = 1240 eV nm/50 000 eV = 0.025 nm
!: The continuous X-ray spectrum's cut-off depends only on the tube voltage, not the target material.
Q: How are X-rays produced in a tube? | Fast electrons decelerate in a metal target (bremsstrahlung) and knock out inner electrons (characteristic lines).
Q: Why does bone show up on X-rays? | Calcium's higher atomic number absorbs X-rays far more (photoelectric effect ∝ Z^{3}).
M1: Who discovered X-rays? | Röntgen (1895) | Curie | Becquerel | Thomson | Nobel 1901.
M2: X-ray crystallography reveals: | Atomic arrangements in crystals | Temperatures | Magnetic fields | Chemical reactions in real time only | Diffraction by lattices.

## Gamma rays
S: Gamma rays are the most energetic photons, emitted by atomic nuclei, particle annihilations and the most violent events in the universe. They're highly penetrating and ionising.
H: Sources
- Nuclear de-excitation after alpha or beta decay (e.g. Co-60: 1.17, 1.33 MeV).
- Electron–positron annihilation: two 511 keV photons.
- Cosmic sources: gamma-ray bursts (brightest explosions known), pulsars, blazars, solar flares, lightning (terrestrial gamma flashes).
H: Interactions with matter
- Photoelectric effect (low energy), Compton scattering (medium), pair production (> 1.022 MeV).
- Attenuation by dense, high-Z materials (lead, tungsten); half-value thickness of lead for 1 MeV ~9 mm.
H: Uses
- Radiotherapy (linac X-rays, Co-60 Gamma Knife for brain tumours).
- PET scans detect annihilation photon pairs.
- Sterilising medical equipment and food irradiation.
- Gamma spectroscopy identifies isotopes; Mössbauer spectroscopy probes tiny energy shifts.
X: A gamma beam passes through lead with μ = 0.77 cm^{-1}. Fraction transmitted through 3 cm?
> e^{−2.31} = 0.10: 10% gets through
!: Gamma rays and X-rays overlap in energy; the name reflects the source (nuclear vs electronic), not a sharp energy boundary.
Q: Where do gamma rays come from? | Nuclear transitions, particle annihilation and high-energy astrophysical processes.
Q: How do PET scanners work? | Positrons from a tracer annihilate with electrons; detectors catch the back-to-back 511 keV gamma pairs.
M1: Pair production requires photon energy above: | 1.022 MeV | 511 keV | 10 keV | 100 MeV | 2m_{e}c^{2}.
M2: The best shielding for gamma rays is: | Dense, high-Z material like lead | Paper | Aluminium foil | Plastic | High attenuation.

## Polarisation
S: The polarisation of an electromagnetic wave is the direction in which its electric field oscillates. Light can be unpolarised, linearly, circularly or elliptically polarised, and controlling polarisation is central to optics and communications.
H: States
- Linear: E oscillates along one line.
- Circular: E rotates at constant length; left or right handed.
- Elliptical: general case.
- Described by Jones vectors (pure states) or Stokes parameters (including partial polarisation).
H: Producing and controlling
E: I = I_{0} cos^{2}θ :: Malus's law
E: tan θ_{B} = n_{2}/n_{1} :: Brewster angle
- Polarisers: dichroic films (Polaroid), wire grids (for microwaves and IR).
- Wave plates: a quarter-wave plate turns linear into circular polarisation.
- Faraday rotation: magnetic fields rotate the plane of polarisation (optical isolators, measuring cosmic magnetic fields).
H: Uses
- LCD screens, 3D cinema (circular polarisation), polarised sunglasses.
- Satellite communications use two polarisations to double capacity.
- CMB polarisation patterns probe the early universe.
X: Three polarisers at 0°, 45° and 90°. Fraction of unpolarised light transmitted?
> ½ × cos^{2}45° × cos^{2}45° = ½ × ½ × ½ = 1/8
> Without the middle polariser, none would pass
!: Polarisation applies to transverse waves only; it was key evidence that light is transverse.
Q: What does a quarter-wave plate do? | Introduces a 90° phase shift between two polarisation components, turning linear into circular polarisation (at 45°).
Q: What is Faraday rotation? | Rotation of the plane of polarisation by a magnetic field along the propagation direction.
M1: Crossed polarisers with a third at 45° between them transmit: | 1/8 of unpolarised intensity | Nothing | Half | All | Malus twice.
M2: 3D cinema glasses usually use: | Circular polarisation | Colour filters | Shutters only | Diffraction | Left and right handed.

## Reflection and transmission
S: When an EM wave meets a boundary, part reflects and part transmits. The amounts depend on the refractive indices, the angle and the polarisation, as given by the Fresnel equations.
H: Normal incidence
E: R = ((n_{1} − n_{2})/(n_{1} + n_{2}))^{2}; T = 1 − R
- Air–glass: 4%; air–water: 2%; air–diamond: 17% (sparkle); air–silicon: ~31%.
H: Oblique incidence (Fresnel)
- s-polarisation (E perpendicular to plane of incidence) and p-polarisation reflect differently.
- p reflection vanishes at Brewster's angle.
- Above the critical angle (going to lower n): total internal reflection, with an evanescent wave penetrating ~λ beyond the surface (used in TIRF microscopy and frustrated TIR).
H: Coatings and metals
- Anti-reflection coatings: quarter-wave layers of index √(n_{1}n_{2}).
- Dielectric mirrors: stacks of alternating layers reflecting > 99.99% (laser cavities, LIGO).
- Metals reflect strongly because free electrons respond to the field (below the plasma frequency, in the UV for most metals).
X: Reflection loss from a camera lens with 10 uncoated air–glass surfaces?
> Each transmits 96%: 0.96^{10} = 0.66
> 34% lost, and stray reflections cause flare: hence coatings
!: Total internal reflection isn't perfectly "total" when another medium comes within a wavelength: light can tunnel across.
Q: What fraction of light reflects from glass at normal incidence? | About 4%.
Q: What is an evanescent wave? | An exponentially decaying field beyond a totally internally reflecting surface.
M1: At Brewster's angle, reflected light is: | Completely s-polarised | Unpolarised | Completely p-polarised | Absent entirely | p reflection vanishes.
M2: Dielectric mirrors work by: | Constructive interference of reflections from many layers | Metallic reflection | Absorption | Diffraction gratings | Multilayer stacks.

## Refraction
S: Refraction bends light as it crosses into a medium of different refractive index, because its speed changes. It makes lenses, prisms, fibres and rainbows work, and creates mirages and the twinkling of stars.
H: Laws
E: n_{1} sin θ_{1} = n_{2} sin θ_{2}
E: n = c/v
- Toward the normal entering higher n.
- Indices: air 1.0003, water 1.33, glass 1.5, diamond 2.42, silicon (IR) ~3.5.
H: Refractive index in depth
P: n comes from how the material's charges respond to the field: n = √(ε_{r}μ_{r}) at that frequency. Near resonances n changes rapidly (dispersion) and absorption rises. Metamaterials engineered with tiny resonant structures can even have negative refractive index, bending light the "wrong" way.
H: Atmospheric refraction
- The Sun is visible for a few minutes after it has geometrically set.
- Mirages: hot air near the ground has lower n, bending light upward.
- Twinkling: turbulent cells of varying n; adaptive optics corrects it in telescopes.
X: A ray in water hits the surface at 45°. Does it escape?
> Critical angle: sin θ_{c} = 1/1.33 ⇒ θ_{c} = 48.8°
> 45° < 48.8°: it escapes, bending to sin^{-1}(1.33 sin 45°) = 70°
!: Light doesn't bend because it "chooses" a shorter path; Fermat's principle describes the result, but the cause is the change of speed at the interface.
Q: What is refractive index? | The ratio of the speed of light in vacuum to its speed in the medium.
Q: Why do stars twinkle? | Turbulent air with varying refractive index deflects their light randomly.
M1: Light entering glass from air bends: | Toward the normal | Away from the normal | Not at all | Backwards | Slower medium.
M2: Mirages on hot roads occur because hot air near the surface has: | Lower refractive index | Higher refractive index | No refractive index | Negative index | Light curves upward.

## Dispersion
S: Dispersion is the variation of a medium's refractive index with frequency. It separates colours in prisms, makes rainbows, causes chromatic aberration, and spreads optical pulses in fibres.
H: Normal and anomalous
- Normal dispersion: n increases with frequency (blue bends more); typical of transparent materials away from absorption.
- Anomalous dispersion: near absorption resonances, n falls with frequency.
- Lorentz oscillator model: bound electrons as driven damped oscillators give n(ω) and absorption.
H: Effects
- Prisms and rainbows.
- **Chromatic aberration**: lenses focus colours at different points; achromatic doublets combine crown and flint glass.
- **Group velocity dispersion** spreads short pulses; chirped pulse amplification (Nobel 2018) stretches pulses deliberately, amplifies them, then compresses them.
H: Dispersion relations
P: Causality links absorption and dispersion: the Kramers–Kronig relations give n(ω) at all frequencies from the absorption spectrum. Wherever a material absorbs, it must disperse.
X: Crown glass has n = 1.514 (blue) and 1.509 (red). Angular separation for a 60° prism near minimum deviation?
> Roughly Δδ ≈ Δn × (deviation per unit n) ≈ 0.005 × 1.3 rad ≈ 0.4°
!: Dispersion is about speed depending on frequency, not about light being "split" by the prism; each colour was already there.
Q: What is anomalous dispersion? | A region near absorption where refractive index decreases with increasing frequency.
Q: How is chromatic aberration corrected? | With achromatic doublets combining glasses of different dispersion.
M1: In normal dispersion, which colour has the higher refractive index? | Blue | Red | Both equal | Neither | n rises with frequency.
M2: Kramers–Kronig relations connect: | Absorption and refractive index | Reflection and transmission | E and B | Energy and momentum | Causality.

## Absorption
S: Matter absorbs electromagnetic waves when their frequency matches a way for the material to take up energy: electronic transitions, molecular vibrations and rotations, or free charges. Absorption decides what's transparent, what's coloured and what heats up.
H: Beer–Lambert law
E: I = I_{0}e^{−αx} = I_{0}10^{−εcl}
- α: absorption coefficient; absorbance A = εcl (molar absorptivity × concentration × path length).
- Used to measure concentrations in chemistry and medicine (pulse oximeters compare red and IR absorption of blood).
H: Mechanisms by band
- Radio/microwave: free charges, molecular rotations, dipole relaxation (water).
- Infrared: molecular vibrations (greenhouse gases).
- Visible/UV: electronic transitions (dyes, chlorophyll, ozone).
- X-ray: inner-shell photoelectric absorption.
- Metals: free electrons absorb in a skin depth.
H: Why water is transparent
P: Water absorbs strongly in the infrared and microwaves but has a narrow transparency window in the visible, where sunlight peaks. Life evolved to see in that window. Water's slight absorption of red makes deep water and glaciers look blue.
X: A solution absorbs 50% of light in 1 cm. What fraction passes through 3 cm?
> (0.5)^{3} = 12.5%
!: Absorption and scattering both remove light from a beam; only absorption converts it to heat or chemical energy.
Q: State the Beer–Lambert law. | Intensity decays exponentially with path length: I = I_{0}e^{−αx}.
Q: How does a pulse oximeter work? | It compares red and infrared absorption of blood, which differ for oxygenated and deoxygenated haemoglobin.
M1: Greenhouse gases absorb mainly via: | Molecular vibrations in the infrared | Electronic transitions in visible | Nuclear transitions | Free electrons | IR vibrational bands.
M2: Deep water looks blue partly because water: | Absorbs red light slightly | Absorbs blue | Emits blue | Is blue-tinted by salt | Weak vibrational overtone absorption.

## Electromagnetic wave intensity
S: The intensity of an electromagnetic wave is the average power it carries per unit area. It depends on the square of the field amplitude and sets everything from the brightness of stars to the dose from a laser.
H: Formulas
E: I = ½cε_{0}E_{0}^{2} = cε_{0}E_{rms}^{2} = E_{rms}B_{rms}/μ_{0}
E: I = P/(4πr^{2}) :: isotropic point source
E: I = I_{0}cos^{2}θ :: after a polariser
H: Examples
- Sunlight at Earth: 1361 W m^{-2} above the atmosphere (~1000 W m^{-2} at ground on a clear day).
- 1 mW laser pointer focused to 1 mm^{2}: 1000 W m^{-2}: brighter than the Sun per area (eye hazard).
- Petawatt lasers focused to μm spots: > 10^{26} W m^{-2}; fields exceed atomic fields.
- Mobile phone signal at a few km: ~10^{-9} W m^{-2}.
H: Photon flux
E: Φ = I/(hf) :: photons per second per m^{2}
X: Number of photons per second from a 5 mW red laser (650 nm)?
> E_{photon} = 1240/650 = 1.9 eV = 3.06 × 10^{-19} J
> N = 5 × 10^{-3}/3.06 × 10^{-19} = 1.6 × 10^{16} s^{-1}
!: A small laser can be more dangerous to the eye than the Sun because its power is concentrated into a tiny area.
Q: How does EM intensity depend on field amplitude? | I ∝ E_{0}^{2}.
Q: How is photon flux found from intensity? | Divide intensity by photon energy hf.
M1: Doubling E_{0} multiplies intensity by: | 4 | 2 | √2 | 8 | ∝ E^{2}.
M2: Intensity from an isotropic 100 W source at 10 m: | 0.08 W m^{-2} | 10 W m^{-2} | 1 W m^{-2} | 0.8 W m^{-2} | 100/(4π × 100).

## Poynting vector
S: The Poynting vector S = E × B/μ_{0} describes the direction and rate of electromagnetic energy flow. It shows where energy goes in waves, antennas and even simple circuits.
H: Definition
E: S = (1/μ_{0})E × B (W m^{-2})
E: ⟨S⟩ = I :: time average for a wave
E: ∂u/∂t + ∇·S = −J·E :: Poynting's theorem
H: Surprising flows
- In a DC circuit, S points from the battery outwards through the space around the wires into the resistor, where it's absorbed. Energy travels through the fields, not inside the wires.
- A charged capacitor next to a bar magnet has static E and B, so S ≠ 0: energy circulates without going anywhere, carrying angular momentum (Feynman's disc paradox).
H: Uses
- Antenna design: integrate S over a sphere to find radiated power.
- Waveguides and fibres: S shows where power travels.
- Momentum density g = S/c^{2}: radiation pressure.
X: S at the surface of a resistor (R, length L, radius a) carrying I.
> E = IR/L along the wire; B = μ_{0}I/(2πa) around it
> S = EB/μ_{0} = I^{2}R/(2πaL) inward; × surface area 2πaL = I^{2}R ✓
!: The Poynting vector can be non-zero in static fields; only its divergence matters for energy conservation.
Q: What does the Poynting vector describe? | The rate and direction of electromagnetic energy flow per unit area.
Q: Where does energy flow in a circuit according to Poynting? | Through the space around the wires, into the resistors.
M1: S is proportional to: | E × B | E·B | E + B | E/B | Cross product.
M2: Integrating S over a closed surface gives: | The net power leaving | Charge enclosed | Magnetic flux | Zero always | Poynting's theorem.

## Radiation pressure
S: Electromagnetic waves carry momentum, so they exert pressure on surfaces that absorb or reflect them. Tiny on Earth, radiation pressure shapes comet tails, holds up massive stars, propels solar sails and traps atoms.
H: Formulas
E: p = I/c :: perfect absorber
E: p = 2I/c :: perfect reflector
E: p_{photon} = E/c = h/λ
- Sunlight at Earth: 4.5 μPa absorbed, 9 μPa reflected.
H: In astronomy
- Comet dust tails pushed away from the Sun.
- **Eddington limit**: maximum luminosity where radiation pressure on electrons balances gravity, L_{Edd} ≈ 3.2 × 10^{4}(M/M_{⊙})L_{⊙}. Limits the brightest stars and accreting black holes.
- Yarkovsky effect: thermal emission subtly alters asteroid orbits.
H: Technology
- Solar sails: IKAROS (2010), LightSail 2 (2019).
- Optical tweezers (Ashkin, Nobel 2018) trap and move cells and DNA.
- Laser cooling: photon recoil slows atoms to microkelvin.
- Breakthrough Starshot concept: laser-pushed gram-scale sails to 0.2c.
X: Force of sunlight on a 100 m × 100 m perfectly reflecting sail at Earth's distance?
> F = 2IA/c = 2 × 1361 × 10^{4}/3 × 10^{8} = 0.09 N
!: Radiation pressure is tiny but constant and fuel-free; over months it builds up large velocity changes.
Q: What pressure does light exert on a perfect reflector? | 2I/c.
Q: What is the Eddington limit? | The luminosity at which radiation pressure balances gravity on ionised gas.
M1: Light reflected from a mirror transfers momentum: | Twice that of absorption | Equal to absorption | None | Half | Reversal doubles Δp.
M2: Optical tweezers were developed by: | Arthur Ashkin | Einstein | Maxwell | Hertz | Nobel 2018.

## Waveguides
S: A waveguide is a structure that confines and guides electromagnetic waves: hollow metal pipes for microwaves, optical fibres for light. Only certain field patterns (modes) can travel, each above its own cut-off frequency.
H: Metal waveguides
E: f_{c} = c/(2a) :: TE_{10} cut-off for a rectangular guide of width a
E: v_{g} = c√(1 − (f_{c}/f)^{2}); v_{p} = c/√(1 − (f_{c}/f)^{2})
- Below cut-off, waves decay (evanescent): the microwave oven door mesh uses this.
- Modes: TE, TM (no TEM in hollow guides; coaxial cables support TEM).
H: Optical fibres
- Core (higher n) and cladding (lower n): total internal reflection.
- Single-mode fibres (core ~9 μm) carry one mode: no modal dispersion; used for long-distance links.
- Multimode fibres (50–62.5 μm): cheaper, shorter links.
- Loss ~0.2 dB km^{-1} at 1550 nm; erbium-doped fibre amplifiers boost signals every ~80 km.
- Global undersea cables carry > 95% of intercontinental data.
H: Numerical aperture
E: NA = √(n_{core}^{2} − n_{clad}^{2}) = sin θ_{max}
X: Cut-off of a waveguide with a = 2.29 cm (WR-90)?
> f_{c} = 3 × 10^{8}/(2 × 0.0229) = 6.6 GHz; used for X-band (8–12 GHz)
!: Waveguides don't carry DC or frequencies below cut-off at all, unlike two-conductor lines.
Q: What is a waveguide's cut-off frequency? | The lowest frequency a mode can propagate at; below it the wave is evanescent.
Q: Why use single-mode fibres for long distances? | They avoid modal dispersion, which spreads pulses.
M1: Light is confined in an optical fibre by: | Total internal reflection | Metal walls | Absorption | Diffraction | Higher-index core.
M2: In a waveguide, the group velocity is: | Less than c | Greater than c | Equal to c | Zero above cut-off | v_{g}v_{p} = c^{2}.

## Antennas and radiation patterns
S: An antenna converts electrical signals into electromagnetic waves and back. Its size, shape and arrangement determine which frequencies it handles and in which directions it radiates most strongly.
H: Basic antennas
- **Half-wave dipole**: length λ/2; radiation resistance ~73 Ω; doughnut pattern, no radiation along its axis.
- **Quarter-wave monopole** over a ground plane (car aerials, phones).
- **Yagi–Uda**: dipole plus director and reflector elements: directional TV aerials.
- **Parabolic dishes**: high gain; beamwidth ~70λ/D degrees.
- **Patch antennas**: flat, in phones and GPS receivers.
H: Key quantities
E: P_{rad} ∝ ω^{4}p^{2} :: oscillating dipole (Larmor)
- Gain (dBi): concentration relative to isotropic.
- Directivity, beamwidth, side lobes, polarisation.
- Reciprocity: transmitting and receiving patterns are the same.
H: Phased arrays
P: Arrays of antennas with electronically controlled phases steer beams without moving parts: 5G base stations, military radars, Starlink user terminals and radio telescopes (LOFAR, SKA). Beamforming focuses signals on individual users.
X: A 3 m dish receives 12 GHz satellite TV. Beamwidth?
> λ = 2.5 cm
> θ ≈ 70 × 0.025/3 = 0.58°: it must point accurately
!: A bigger dish gives a narrower beam and higher gain, but needs more precise pointing.
Q: Why is a half-wave dipole a common antenna? | It resonates efficiently at its design frequency with a convenient impedance (~73 Ω).
Q: How do phased arrays steer beams? | By adjusting the relative phases of signals fed to many antenna elements.
M1: A dipole antenna doesn't radiate: | Along its own axis | Perpendicular to it | In any direction | Only upward | Doughnut pattern.
M2: Antenna reciprocity means: | Transmit and receive patterns are identical | Antennas can't receive | Gain is zero | Polarisation reverses | Same pattern both ways.

## Near-field and far-field behaviour
S: Close to an antenna or source, electromagnetic fields store energy and fall off rapidly; far away, they form radiating waves that fall as 1/r. The boundary depends on wavelength and antenna size, and it matters for measurement, wireless charging and safety.
H: Regions
- **Reactive near field**: r < λ/2π; fields store energy and oscillate back and forth; E and B not in phase or in the ratio c.
- **Radiating near field (Fresnel)**: transition; pattern depends on distance.
- **Far field (Fraunhofer)**: r > 2D^{2}/λ (D = antenna size); plane-wave-like; fixed pattern; E/B = c, intensity ∝ 1/r^{2}.
H: Uses of the near field
- Inductive charging, NFC and RFID (13.56 MHz, λ = 22 m) work in the near field: short range, little radiation.
- Near-field scanning optical microscopy beats the diffraction limit by using evanescent fields from a sub-wavelength probe.
H: Measurement
P: Antenna patterns must be measured in the far field, which for large dishes can be kilometres; compact ranges use reflectors to create a plane wave locally, or near-field scanners compute the far field mathematically.
X: Far-field distance for a 1 m antenna at 10 GHz?
> λ = 3 cm
> r > 2D^{2}/λ = 2/0.03 ≈ 67 m
!: Near-field exposure limits and measurements can't use far-field formulas like I = E^{2}/(377 Ω).
Q: What characterises the far field? | Radiating fields with E/B = c, intensity ∝ 1/r^{2}, and a fixed angular pattern.
Q: Why does NFC work only at short range? | It uses near-field magnetic coupling that falls off steeply with distance.
M1: The far-field boundary is roughly: | 2D^{2}/λ | λ/2π | D | λ | Fraunhofer distance.
M2: Near-field optical microscopy beats the diffraction limit using: | Evanescent fields | Shorter wavelengths only | Larger lenses | Polarisation | Sub-wavelength probe.

## Electromagnetic interference
S: Electromagnetic interference (EMI) is unwanted electromagnetic energy disrupting electronic devices. Electromagnetic compatibility (EMC) design ensures devices neither emit too much nor are too easily disturbed.
H: Sources
- Switching power supplies, motors, digital clocks (harmonics), radio transmitters, lightning, electrostatic discharge.
- Coupling paths: conducted (along power and signal cables), radiated, capacitive and inductive crosstalk.
H: Reducing EMI
- Shielding (Faraday cages, metal enclosures).
- Filtering: ferrite beads, common-mode chokes, decoupling capacitors.
- Good grounding and short return paths; avoid ground loops.
- Twisted pairs and differential signalling.
- PCB layout: ground planes, controlled impedance traces.
- Spread-spectrum clocks spread emissions over a band.
H: Regulation
P: Products must pass EMC tests (CE marking in Europe, FCC in the US) for emissions and immunity. Aircraft and medical devices have strict requirements; that's why phones were once restricted on planes and in hospitals.
X: Why does a cheap phone charger cause hum on an AM radio?
> Its switching at tens of kHz produces harmonics into the MHz range
> Poor filtering lets them radiate and conduct onto mains wiring
!: Every fast edge in a digital circuit is a broadband emitter; slowing edges where possible reduces EMI.
Q: Name two ways EMI couples into a circuit. | Conduction along cables and radiation through the air (also capacitive and inductive crosstalk).
Q: What does a ferrite bead do? | Suppresses high-frequency noise currents on a cable.
M1: Differential signalling reduces EMI because: | Interference affects both wires equally and cancels | It uses higher voltages | It's slower | It uses optical fibre | Common-mode rejection.
M2: Electrostatic discharge is a form of: | Electromagnetic interference | Magnetic storage | Thermal noise | Shot noise only | Transient disturbance.

## Electromagnetic shielding
S: Shielding blocks electromagnetic fields from entering or leaving a region. How well it works depends on the frequency, the material's conductivity and permeability, and how carefully holes and seams are controlled.
H: Mechanisms
- **Reflection**: impedance mismatch between free space (377 Ω) and the conductor reflects most incident power.
- **Absorption**: fields decay in the conductor over the skin depth δ = √(2/(ωμσ)).
- **Multiple reflections** inside thin shields.
E: SE(dB) = R + A + B :: shielding effectiveness
H: Practical points
- High-frequency electric fields: thin conductive layers (foil, conductive paint) suffice.
- Low-frequency magnetic fields: hard; need high-permeability alloys (mu-metal) or thick conductors.
- Apertures leak: a slot of length l leaks strongly near λ/2 = l. Keep openings much smaller than the wavelength.
- Seams and cables are the usual weak points: gaskets, filtered feedthroughs.
H: Examples
- MRI rooms (copper-lined Faraday cages), anechoic test chambers.
- Coaxial cable braid, shielded enclosures, phone RF cans.
- Magnetically shielded rooms for brain imaging and fundamental-physics experiments.
X: Skin depth in aluminium (σ = 3.5 × 10^{7} S m^{-1}) at 100 MHz?
> δ = √(2/(2π × 10^{8} × 4π × 10^{-7} × 3.5 × 10^{7})) = 8.5 μm
> Household foil (~16 μm) attenuates strongly at these frequencies
!: A shield with a long slit can be almost useless at frequencies where the slit is half a wavelength long.
Q: Why is low-frequency magnetic shielding difficult? | Skin depths are large and reflection is weak; it needs high-permeability materials to divert flux.
Q: What limits a shield's effectiveness in practice? | Holes, seams and cable penetrations.
M1: A shield's absorption improves with: | Greater thickness relative to skin depth | Lower conductivity | Larger holes | Lower frequency | e^{−t/δ}.
M2: Mu-metal is used to shield: | Low-frequency magnetic fields | Light | Gamma rays | Sound | High permeability.

## Microwave engineering
S: Microwave engineering designs circuits and systems at frequencies (~300 MHz–300 GHz) where wavelengths are comparable to component sizes. Wires become transmission lines, and every structure behaves like a circuit element.
H: Transmission lines
E: Z_{0} = √(L′/C′) :: characteristic impedance (50 Ω standard; 75 Ω for TV)
E: Γ = (Z_{L} − Z_{0})/(Z_{L} + Z_{0}) :: reflection coefficient
E: VSWR = (1 + |Γ|)/(1 − |Γ|)
- Mismatched loads reflect power; matching networks (stubs, quarter-wave transformers) fix it.
- The Smith chart visualises impedance transformations.
H: Components
- Microstrip and coplanar lines on circuit boards; waveguides at high power.
- Couplers, circulators (ferrite, non-reciprocal), filters, mixers, low-noise amplifiers.
- S-parameters describe how devices reflect and transmit signals; measured with vector network analysers.
H: Applications
P: Radar, satellite links, 5G and 6G, microwave ovens, particle accelerator cavities, radio astronomy receivers and superconducting quantum computers (qubits controlled at 4–8 GHz) all depend on microwave engineering.
X: A 75 Ω antenna is connected to a 50 Ω line. Reflection coefficient and power reflected?
> Γ = (75 − 50)/(125) = 0.2
> Power reflected = Γ^{2} = 4%
!: At microwave frequencies, a few millimetres of wire is a significant fraction of a wavelength; ordinary circuit rules break down.
Q: What is characteristic impedance? | The ratio of voltage to current for a wave travelling along a transmission line.
Q: What does a VSWR of 1 mean? | Perfect matching: no reflected wave.
M1: The standard impedance for RF test equipment is: | 50 Ω | 75 Ω | 377 Ω | 1 kΩ | Convention.
M2: A circulator: | Routes signals between ports in one direction | Amplifies signals | Filters frequencies | Converts AC to DC | Non-reciprocal ferrite device.

## Radio-frequency physics
S: Radio-frequency (RF) physics covers electromagnetic phenomena from kHz to GHz: how RF fields interact with matter, plasmas and biological tissue, and how they're generated, transmitted and detected.
H: RF interactions
- **Conductors**: skin effect; resistance rises as √f; surface currents.
- **Dielectrics**: heating via dielectric loss (RF welding, microwave drying); loss tangent tan δ.
- **Plasmas**: RF heating and generating plasmas (ICP etchers in chipmaking, fusion heating at ion and electron cyclotron frequencies).
- **Magnetic resonance**: NMR/MRI use RF at the Larmor frequency (64 MHz at 1.5 T for protons).
- **Biological**: specific absorption rate (SAR) limits; phone limit 2 W kg^{-1} (EU, head).
H: Propagation effects
- Ground wave, sky wave (ionosphere), line of sight; Fresnel zones; multipath fading.
- Rain fade at high GHz (satellite TV dropouts in storms).
- Atmospheric absorption peaks (oxygen at 60 GHz, water at 22 GHz).
H: Noise
E: P_{noise} = k_{B}TB :: thermal noise power (−174 dBm Hz^{-1} at 290 K)
P: Receivers are judged by noise figure. Cryogenically cooled amplifiers and masers let radio telescopes detect signals far below room-temperature noise levels; Penzias and Wilson's excess antenna noise turned out to be the cosmic microwave background.
X: Thermal noise in a 1 MHz bandwidth at 290 K?
> P = 1.38 × 10^{-23} × 290 × 10^{6} = 4 × 10^{-15} W (−114 dBm)
!: RF exposure limits are set by heating; RF photons can't ionise, so concern is with absorbed power, not bond breaking.
Q: What is SAR? | Specific absorption rate: RF power absorbed per kg of tissue.
Q: What is the thermal noise power per hertz at room temperature? | k_{B}T ≈ 4 × 10^{-21} W Hz^{-1} (−174 dBm Hz^{-1}).
M1: MRI at 1.5 T uses RF around: | 64 MHz | 2.4 GHz | 50 Hz | 1 THz | 42.6 MHz T^{-1}.
M2: Satellite TV signals at ~12 GHz can drop out in heavy rain because: | Raindrops absorb and scatter the signal | The ionosphere reflects them | Clouds are conductors | The dish freezes | Rain fade.
`;
