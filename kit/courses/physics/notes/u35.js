// Unit 35: Medical Physics. Format: kit/course/notes.js
export default `
## Physics of diagnostic imaging
S: Diagnostic imaging uses waves and particles to see inside the body without cutting it open. Each modality, from X-rays and CT to MRI, ultrasound and nuclear medicine, exploits a different physical interaction and measures a different tissue property.
H: What each modality measures
- **X-ray and CT**: attenuation of photons, which depends on electron density and atomic number. Best for bone, lung and contrast-filled vessels.
- **MRI**: proton density and relaxation times (T_{1}, T_{2}) of hydrogen nuclei. Superb soft-tissue contrast.
- **Ultrasound**: reflections at acoustic impedance boundaries. Real time, portable, no ionising radiation.
- **Nuclear medicine (PET, SPECT)**: where an injected radioactive tracer accumulates. It shows function rather than anatomy.
- **Optical**: light absorption and scattering at shallow depths (endoscopy, OCT, near-infrared spectroscopy).
H: Image quality
- **Spatial resolution**: the smallest separation at which two points can be told apart (CT ~0.5 mm, PET ~4 mm).
- **Contrast**: the difference in signal between tissues.
- **Noise**: random fluctuations, often Poisson counting noise, which falls as 1/√N.
- **Contrast-to-noise ratio (CNR)**: what really sets whether a lesion is detectable.
E: CNR = |S_{A} − S_{B}| / σ :: contrast-to-noise ratio
H: The trade-offs
P: Better images usually cost something: more dose for X-ray and CT, longer scan time for MRI, lower penetration for higher-frequency ultrasound. Medical physicists optimise protocols so the image answers the clinical question at the lowest reasonable cost to the patient.
X: A lesion gives 120 counts and background 100 counts per pixel. What is the CNR, assuming Poisson noise in the background?
> σ = √100 = 10
> CNR = (120 − 100)/10 = 2
> Quadrupling the counts gives 480 vs 400, σ = 20, CNR = 4: the CNR doubles
K: Every imaging modality is a physical measurement; choosing one means choosing which tissue property you want to see.
!: A sharper image is not always a better one. If noise rises with resolution, the CNR can fall and lesions become harder to see.
Q: What tissue property does ultrasound image? | Changes in acoustic impedance, which produce reflections.
Q: How does Poisson noise scale with the number of counts N? | As √N, so the relative noise falls as 1/√N.
M1: Which modality shows function rather than anatomy? | PET | Plain X-ray | CT without contrast | Ultrasound B-mode | PET maps where a metabolic tracer accumulates.
M2: Detectability of a lesion is best described by: | Contrast-to-noise ratio | Pixel count alone | Field of view | Scan length | CNR combines contrast and noise.

## X-ray production and imaging
S: X-rays are produced when fast electrons strike a metal target, creating a continuous bremsstrahlung spectrum topped with characteristic lines. Passing through the body, they are attenuated by different amounts, and the transmitted pattern forms a shadow image.
H: The X-ray tube
- A heated tungsten filament (cathode) emits electrons by thermionic emission.
- A tube voltage of 25–150 kV accelerates them to a tungsten (or molybdenum for mammography) anode.
- Only ~1% of the electron energy becomes X-rays; the other 99% is heat, so anodes rotate to spread the heat load.
- **Bremsstrahlung**: continuous spectrum up to E_{max} = eV.
- **Characteristic lines**: from inner-shell vacancies (tungsten K lines at ~59 and ~67 keV).
- Aluminium filtration removes low-energy photons that would only add skin dose.
E: E_{max} = eV, λ_{min} = hc/(eV) :: Duane–Hunt limit
E: I = I_{0} e^{−μx} :: Beer–Lambert attenuation
H: Interactions in tissue
- **Photoelectric effect**: dominant at low energy; probability ∝ Z^{3}/E^{3}. This gives the strong bone–soft tissue contrast.
- **Compton scattering**: dominant at diagnostic energies in soft tissue; depends on electron density, and scattered photons blur the image.
- An anti-scatter grid of lead strips absorbs most scattered photons before they reach the detector.
H: Detectors
P: Modern radiography uses flat-panel detectors: a caesium iodide scintillator converts X-rays to light read by amorphous silicon photodiodes (indirect), or amorphous selenium converts X-rays straight to charge (direct). Mammography uses low kV (25–35 kV) to maximise photoelectric contrast between similar soft tissues.
X: A 100 kV tube. What is the maximum photon energy and minimum wavelength?
> E_{max} = 100 keV
> λ_{min} = 1240 eV nm / 100 000 eV = 0.0124 nm
X: Soft tissue has μ = 0.2 cm^{-1} at 60 keV. What fraction is transmitted through 20 cm?
> I/I_{0} = e^{−0.2 × 20} = e^{−4} ≈ 0.018, about 2%
K: Image contrast comes from differences in μ, which depends strongly on Z through the photoelectric effect.
!: Raising kV improves penetration but reduces contrast, because the photoelectric effect falls steeply with energy.
Q: What fraction of electron energy in an X-ray tube becomes X-rays? | About 1%; the rest is heat.
Q: Why is bone so visible on X-ray images? | Its higher atomic number (calcium) strongly increases photoelectric absorption, which scales as Z^{3}.
M1: The maximum photon energy from an 80 kV tube is: | 80 keV | 40 keV | 160 keV | 8 keV | E_{max} = eV.
M2: Anti-scatter grids remove photons from: | Compton scattering | Photoelectric absorption | Characteristic emission | Pair production | Scattered photons blur the image.
M3: Mammography uses low kV because: | Photoelectric contrast between soft tissues is higher | It is cheaper | It reduces scatter to zero | It gives higher dose | Low energies enhance small differences in Z and density.

## Computed tomography
S: Computed tomography rotates an X-ray source and detector around the patient, measuring attenuation along thousands of lines. A computer reconstructs a cross-sectional map of attenuation, removing the overlapping shadows that limit plain radiographs.
H: How CT works
- A fan or cone beam passes through the patient to a curved array of detectors.
- The gantry rotates in ~0.25–0.5 s; the table moves through for helical (spiral) scanning.
- Each measurement gives a line integral ∫μ dl along one ray.
- Reconstruction (filtered back projection or iterative methods) recovers μ(x, y) in each voxel.
E: ln(I_{0}/I) = ∫ μ(l) dl :: projection measurement
E: HU = 1000 × (μ − μ_{water})/(μ_{water} − μ_{air}) :: Hounsfield units
H: The Hounsfield scale
- Air −1000, fat ≈ −100, water 0, soft tissue +20 to +80, bone +400 to +1000 or more.
- **Windowing** maps a chosen HU range onto the display greyscale: lung, soft-tissue and bone windows.
H: Dose and modern advances
P: A typical chest CT gives ~5–7 mSv effective dose, about two years of natural background. Dose modulation, iterative reconstruction, deep-learning denoising and photon-counting detectors (which measure each photon's energy) cut dose and allow material separation. Dual-energy CT distinguishes iodine, calcium and uric acid.
X: A tissue has μ = 0.209 cm^{-1}; water has 0.200 cm^{-1} and air ≈ 0. What is its HU?
> HU = 1000 × (0.209 − 0.200)/(0.200 − 0) = 1000 × 0.045 = 45 HU
> That is typical of soft tissue such as liver
K: CT turns many projections into a map of attenuation coefficients, expressed in Hounsfield units.
!: HU values depend on beam energy and calibration; they are not universal constants of the tissue.
Q: What is the HU of water and air? | Water 0, air −1000.
Q: What does helical CT mean? | The table moves continuously while the gantry rotates, so the beam traces a spiral through the patient.
M1: Fat has a Hounsfield value of roughly: | −100 | +100 | 0 | −1000 | Fat attenuates slightly less than water.
M2: Each CT detector reading measures: | A line integral of μ | μ at a single point | Proton density | Acoustic impedance | ln(I_{0}/I) = ∫μ dl.

## Magnetic resonance imaging
S: Magnetic resonance imaging uses a strong magnetic field and radiofrequency pulses to make hydrogen nuclei in the body emit signals. Magnetic field gradients encode position, and differences in relaxation times give exceptional soft-tissue contrast without ionising radiation.
H: Nuclear magnetic resonance
- Protons have spin; in a field B_{0} they precess at the Larmor frequency.
- A slight excess align with the field, giving a net magnetisation M along B_{0}.
- An RF pulse at the Larmor frequency tips M into the transverse plane; the precessing M induces a signal in a receiver coil.
E: f = (γ/2π) B_{0}, γ/2π = 42.58 MHz T^{-1} :: Larmor frequency for ^{1}H
H: Relaxation
- **T_{1}** (spin–lattice): recovery of longitudinal magnetisation; ~250 ms (fat) to ~4000 ms (CSF) at 1.5 T.
- **T_{2}** (spin–spin): decay of transverse magnetisation from dephasing; ~40–200 ms in soft tissue, longer in fluid.
- **T_{2}***: faster decay including field inhomogeneities; a spin echo refocuses these.
E: M_{z}(t) = M_{0}(1 − e^{−t/T_{1}}), M_{xy}(t) = M_{0} e^{−t/T_{2}} :: relaxation
H: Contrast and encoding
- Short TR and TE give T_{1}-weighting (fat bright, fluid dark); long TR and TE give T_{2}-weighting (fluid bright).
- Slice selection, frequency encoding and phase encoding with gradients fill k-space; a 2D Fourier transform gives the image.
- Gadolinium contrast agents shorten T_{1}, brightening leaky or vascular tissue.
H: Safety
P: The static field (1.5–3 T clinically, up to 7 T) pulls ferromagnetic objects violently, so strict screening is essential. RF heating is limited by specific absorption rate (SAR) limits; switching gradients make loud noise and can stimulate nerves. MRI involves no ionising radiation.
X: What is the proton Larmor frequency at 3 T?
> f = 42.58 × 3 = 127.7 MHz
X: After a 90° pulse, a tissue has T_{2} = 80 ms. What fraction of signal remains at TE = 80 ms?
> e^{−80/80} = e^{−1} ≈ 0.37
K: MRI signal comes from precessing proton magnetisation, and contrast comes from T_{1}, T_{2} and proton density.
!: T_{2} is always shorter than or equal to T_{1}; T_{2}* is shorter still.
Q: What does a 180° refocusing pulse undo? | Dephasing from static field inhomogeneities, recovering a spin echo.
Q: Which appears bright on a T_{2}-weighted image, fat or fluid? | Fluid (long T_{2}), such as CSF and oedema.
M1: The proton Larmor frequency at 1.5 T is about: | 64 MHz | 42.58 MHz | 128 MHz | 1.5 GHz | 42.58 × 1.5 ≈ 63.9 MHz.
M2: Gadolinium contrast works mainly by: | Shortening T_{1} | Increasing proton density | Absorbing X-rays | Raising B_{0} | Paramagnetic ions speed up longitudinal relaxation.
M3: MRI position encoding uses: | Magnetic field gradients | Rotating X-ray tubes | Ultrasound echoes | Radioactive tracers | Gradients make the frequency and phase depend on position.

## Nuclear medicine
S: Nuclear medicine images and treats disease using radioactive tracers given to the patient. The tracer follows a biological pathway, so the emitted radiation reveals function such as blood flow, bone turnover, thyroid uptake or cancer metabolism.
H: Radiopharmaceuticals
- A radionuclide attached to a carrier molecule that targets an organ or process.
- **Technetium-99m**: the workhorse; 140 keV gamma, 6 h half-life, produced on site from a molybdenum-99 generator.
- **Fluorine-18** (110 min) for PET; **iodine-131** (8 days) for thyroid therapy; **lutetium-177** for targeted therapy.
- Ideal imaging nuclide: gamma energy ~100–200 keV, half-life comparable to the study, no particulate emissions.
E: 1/T_{eff} = 1/T_{phys} + 1/T_{bio} :: effective half-life
E: A = A_{0} e^{−λt}, λ = ln 2/T_{1/2} :: decay
H: The gamma camera
- A lead collimator admits only photons travelling in chosen directions, giving position information.
- A large NaI(Tl) crystal converts gamma rays to light; photomultipliers (or silicon photomultipliers) locate each event by Anger logic.
- An energy window rejects scattered photons.
H: Therapy
P: Unsealed-source therapy uses beta or alpha emitters that deposit energy locally: iodine-131 for hyperthyroidism and thyroid cancer, lutetium-177 PSMA for prostate cancer, radium-223 for bone metastases. Theranostics pairs an imaging isotope and a therapy isotope on the same targeting molecule.
X: A tracer has T_{phys} = 6 h and T_{bio} = 3 h. What is the effective half-life?
> 1/T_{eff} = 1/6 + 1/3 = 1/2
> T_{eff} = 2 h
X: 600 MBq of Tc-99m is prepared. What remains after 12 h?
> Two half-lives: 600/4 = 150 MBq
K: Nuclear medicine images physiology: where the tracer goes, and how fast it gets there and leaves.
!: Effective half-life is always shorter than both the physical and biological half-lives.
Q: Why is Tc-99m so widely used? | Ideal 140 keV gamma, 6 h half-life, no beta emission, and it is made on site from a Mo-99 generator.
Q: What does a gamma camera collimator do? | It passes only photons travelling in set directions, so each event's position is meaningful.
M1: The effective half-life when T_{phys} = T_{bio} = 4 h is: | 2 h | 4 h | 8 h | 1 h | 1/T = 1/4 + 1/4.
M2: Iodine-131 therapy targets the: | Thyroid | Liver | Brain | Lungs | The thyroid actively takes up iodine.

## Positron emission tomography
S: Positron emission tomography detects pairs of 511 keV photons from positron annihilation. Because the photons fly apart in opposite directions, coincidence detection pins each decay to a line, building quantitative 3D maps of metabolism and receptor binding.
H: The physics
- A proton-rich nuclide (^{18}F, ^{11}C, ^{68}Ga, ^{82}Rb) emits a positron.
- The positron travels ~1 mm (range depends on energy), then annihilates with an electron.
- Two 511 keV photons are emitted ~180° apart.
- A ring of detectors registers both within a coincidence window of a few nanoseconds, defining a line of response.
H: Detectors and corrections
- Dense scintillators (LSO, LYSO, BGO) coupled to photodetectors.
- **Time of flight**: the arrival-time difference localises the event along the line; 200 ps gives ~3 cm.
- Corrections: attenuation (from a CT scan), random coincidences, scatter, dead time and decay.
- Resolution limits: positron range, photon non-collinearity and detector size, giving ~3–5 mm clinically.
E: Δx = cΔt/2 :: time-of-flight localisation
E: SUV = C_{tissue} / (A_{injected}/mass) :: standardised uptake value
H: FDG
P: ^{18}F-fluorodeoxyglucose is taken up like glucose and trapped in cells after phosphorylation. Many cancers, active brain regions and inflamed tissue use lots of glucose, so they light up. PET–CT and PET–MRI combine function with anatomy. Long axial field-of-view scanners image the whole body at once with far higher sensitivity.
X: A TOF system has 400 ps timing resolution. What is the localisation along the line?
> Δx = (3 × 10^{8} × 400 × 10^{-12})/2 = 0.06 m = 6 cm
X: A tumour has 15 kBq mL^{-1}; 350 MBq is injected into a 70 kg patient. What is the SUV (1 mL ≈ 1 g)?
> Average = 350 × 10^{6}/70 000 g = 5000 Bq g^{-1} = 5 kBq g^{-1}
> SUV = 15/5 = 3
K: PET's coincidence detection gives electronic collimation, making it far more sensitive than single-photon imaging.
!: Attenuation correction is essential. Both photons must escape, so the total path through the body matters, and an uncorrected image under-represents deep structures.
Q: Why are PET photons 511 keV? | Each carries the rest energy of an electron (or positron), m_{e}c^{2} = 511 keV.
Q: Why does FDG accumulate in many tumours? | Tumours consume lots of glucose; FDG is trapped after phosphorylation.
M1: Time-of-flight PET improves: | Localisation along the line of response | Positron range | Photon energy | Half-life | Arrival-time difference narrows the event's position.
M2: PET attenuation correction is usually derived from: | A CT scan | Ultrasound | An ECG | The injected activity alone | CT gives an attenuation map.

## Single-photon emission computed tomography
S: Single-photon emission computed tomography rotates gamma cameras around the patient to build 3D images from single gamma photons. It is cheaper and more widely available than PET, and it is central to cardiac perfusion, bone and brain imaging.
H: How SPECT works
- One to three gamma camera heads rotate around the patient, acquiring projections every few degrees.
- Collimators determine where photons come from; they also absorb most photons, limiting sensitivity.
- Reconstruction uses iterative algorithms (OSEM) with attenuation, scatter and resolution modelling.
- SPECT–CT adds attenuation correction and anatomical localisation.
H: Common tracers
- ^{99m}Tc sestamibi or tetrofosmin: myocardial perfusion.
- ^{99m}Tc MDP: bone scans.
- ^{123}I ioflupane (DaTscan): dopamine transporters in Parkinson's disease.
- ^{111}In and ^{67}Ga for infection and some tumours.
H: Collimator trade-offs
P: Parallel-hole collimators balance resolution and sensitivity: longer, narrower holes sharpen the image but pass fewer photons. Resolution degrades with distance from the collimator, so keeping the camera close matters. New cadmium zinc telluride (CZT) semiconductor detectors give better energy resolution and allow dedicated cardiac cameras with much higher sensitivity.
E: R_{coll} ≈ d(L + z)/L :: collimator resolution, hole width d, length L, distance z
X: Holes 1.5 mm wide, 25 mm long; source 100 mm away. Estimate collimator resolution.
> R ≈ 1.5 × (25 + 100)/25 = 1.5 × 5 = 7.5 mm
> At 200 mm it becomes 1.5 × 9 = 13.5 mm
K: SPECT trades PET's sensitivity for availability and a wide range of long-lived tracers.
!: Keep the camera close to the patient; resolution worsens rapidly with distance.
Q: Why is SPECT less sensitive than PET? | It needs physical collimators that absorb most photons, whereas PET uses coincidence timing.
Q: What is a typical SPECT tracer for cardiac perfusion? | Tc-99m sestamibi (or tetrofosmin).
M1: Making collimator holes longer will: | Improve resolution but lower sensitivity | Raise both | Lower both | Change photon energy | Fewer oblique photons get through.
M2: CZT detectors offer: | Better energy resolution | Positron detection | Higher X-ray dose | Larger crystals | Semiconductors convert gamma rays directly to charge.

## Ultrasound imaging
S: Ultrasound imaging sends short pulses of high-frequency sound into the body and listens for echoes from tissue boundaries. Timing gives depth, echo strength gives brightness, and the whole process is safe, cheap, portable and fast enough to watch the heart beat.
H: Sound in tissue
- Clinical frequencies 2–15 MHz (up to 50 MHz for skin and eyes).
- Average speed in soft tissue c ≈ 1540 m s^{-1}; the scanner assumes this value.
- Wavelength at 5 MHz ≈ 0.31 mm, which sets the best axial resolution scale.
E: Z = ρc :: acoustic impedance
E: R = ((Z_{2} − Z_{1})/(Z_{2} + Z_{1}))^{2} :: intensity reflection coefficient
E: d = ct/2 :: echo depth from round-trip time
H: Attenuation and frequency
- Attenuation ≈ 0.5–1 dB cm^{-1} MHz^{-1} in soft tissue.
- Higher frequency: better resolution but less penetration. Abdomen 3–5 MHz; superficial structures 10–15 MHz.
- Time-gain compensation amplifies later (deeper) echoes.
H: Transducers and modes
P: Piezoelectric arrays (PZT or single crystals) convert voltage to sound and back. Electronic beam steering and focusing build B-mode (brightness) images at 20–100 frames per second. M-mode records motion along one line; 3D and 4D imaging show volumes. Coupling gel removes air, because the huge impedance mismatch at a tissue–air boundary reflects almost everything.
X: An echo returns after 65 μs. How deep is the reflector?
> d = 1540 × 65 × 10^{-6}/2 = 0.050 m = 5.0 cm
X: Find the intensity reflected at a soft tissue (Z = 1.63 MRayl) and bone (Z = 7.8 MRayl) boundary.
> R = ((7.8 − 1.63)/(7.8 + 1.63))^{2} = (6.17/9.43)^{2} ≈ 0.43
> About 43% is reflected, which is why bone casts acoustic shadows
K: Ultrasound images are maps of echoes: impedance changes and their depths, assuming c = 1540 m s^{-1}.
!: Air and bone block ultrasound almost completely, so the lungs and adult brain are hard to image.
Q: Why is coupling gel used? | It removes air between transducer and skin; a tissue–air boundary would reflect nearly all the sound.
Q: What trade-off governs the choice of frequency? | Higher frequency gives better resolution but more attenuation, so less penetration.
M1: An echo arrives 130 μs after the pulse. Depth is about: | 10 cm | 20 cm | 5 cm | 1 cm | d = 1540 × 130 μs / 2.
M2: Acoustic impedance is: | Density × speed of sound | Speed/density | Frequency × wavelength | Attenuation × depth | Z = ρc.
M3: Imaging a thyroid near the skin would best use: | 12 MHz | 2 MHz | 50 kHz | 500 Hz | Shallow targets allow high frequency for resolution.

## Doppler ultrasound
S: Doppler ultrasound measures the frequency shift of echoes from moving blood cells to find how fast and in which direction blood flows. It diagnoses narrowed arteries, leaky heart valves, clots and fetal wellbeing.
H: The Doppler equation
- Moving red cells shift the echo frequency; the transducer is both source and receiver, so the shift is doubled.
- Only the velocity component along the beam counts, giving a cos θ factor.
- Shifts are typically 0.1–10 kHz, which happen to be audible.
E: Δf = 2 f_{0} v cos θ / c :: Doppler shift
H: Modes
- **Continuous wave**: separate transmit and receive crystals; measures high velocities but no depth information.
- **Pulsed wave**: samples a chosen depth; limited by aliasing at the Nyquist limit PRF/2.
- **Colour Doppler**: overlays mean velocity (red towards, blue away by convention) on the B-mode image.
- **Power Doppler**: displays signal strength, sensitive to slow flow but not direction.
- **Spectral Doppler**: shows the full velocity distribution against time.
H: Clinical use
P: Stenosis speeds up the flow through a narrowing; peak velocity ratios grade carotid disease. The simplified Bernoulli equation ΔP ≈ 4v^{2} (P in mmHg, v in m s^{-1}) estimates pressure gradients across heart valves. Angle correction is critical: at θ near 90° the shift vanishes and errors explode.
E: ΔP ≈ 4v^{2} :: simplified Bernoulli, mmHg with v in m s^{-1}
X: At 4 MHz and θ = 60°, the shift is 2.6 kHz. What is the blood speed?
> v = Δf c/(2 f_{0} cos θ) = 2600 × 1540/(2 × 4 × 10^{6} × 0.5)
> v = 4.0 × 10^{6}/4 × 10^{6} ≈ 1.0 m s^{-1}
X: Jet velocity through a stenosed aortic valve is 4 m s^{-1}. Estimate the pressure gradient.
> ΔP ≈ 4 × 16 = 64 mmHg, a severe stenosis
K: The Doppler shift measures velocity along the beam; angle matters as much as frequency.
!: Pulsed Doppler aliases if the shift exceeds PRF/2; high-velocity jets wrap around and look like reverse flow.
Q: What do red and blue mean in colour Doppler? | By convention, red is flow towards the transducer and blue away (not arterial vs venous).
Q: Why does the Doppler shift fall at 90° insonation? | cos 90° = 0, so there is no velocity component along the beam.
M1: Doubling the transmit frequency makes the Doppler shift: | Double | Halve | Unchanged | Quadruple | Δf ∝ f_{0}.
M2: Continuous-wave Doppler cannot give: | Depth of the moving blood | High velocities | Direction | An audible signal | It receives from the whole overlapping beam.

## Radiation therapy
S: Radiation therapy uses ionising radiation to kill cancer cells by damaging their DNA, while sparing normal tissue as much as possible. About half of all cancer patients receive it, and modern techniques shape dose to the tumour with millimetre accuracy.
H: How radiation kills cells
- Ionisation breaks DNA directly or via free radicals from water (indirect action, about two thirds of damage for photons).
- Double-strand breaks are the lethal lesions; cells die mainly when they next try to divide.
- Oxygen fixes damage, so hypoxic tumour cells are ~2–3 times more resistant.
H: Treatment approaches
- **External beam**: megavoltage X-rays (6–18 MV) from linear accelerators; electrons for shallow tumours.
- **Protons and carbon ions**: deposit dose in a Bragg peak, with little exit dose.
- **Brachytherapy**: sealed sources inside or beside the tumour.
- **Radionuclide therapy**: unsealed sources targeted biologically.
H: Shaping dose
- 3D conformal, intensity-modulated radiotherapy (IMRT) and volumetric arc therapy (VMAT) shape dose with multileaf collimators.
- Stereotactic radiosurgery and SBRT give a few very large doses with sub-millimetre precision.
- Image guidance (cone-beam CT, MRI-linacs) checks tumour position daily.
- Target volumes: GTV (visible tumour) ⊂ CTV (microscopic spread) ⊂ PTV (margin for motion and setup).
H: Fractionation
P: Dose is usually split into fractions (e.g. 2 Gy per day, 30 fractions). Normal tissues repair sublethal damage between fractions better than many tumours, and tumours reoxygenate and redistribute through the cell cycle. Hypofractionation (fewer, larger fractions) is now common for breast and prostate cancer.
X: A course gives 60 Gy in 30 fractions, five per week. How long does it take?
> 30/5 = 6 weeks, at 2 Gy per fraction
K: Radiotherapy succeeds by delivering a lethal dose to the tumour while keeping normal-tissue dose below tolerance.
!: Megavoltage photon beams deposit maximum dose a centimetre or more below the skin (build-up), which spares skin. This is a benefit, not a fault.
Q: Why are hypoxic tumour cells radioresistant? | Oxygen fixes radiation damage to DNA; without it, more damage is repaired.
Q: What is the PTV? | The planning target volume: the clinical target plus a margin for motion and setup error.
M1: The lethal DNA lesion in radiotherapy is mainly the: | Double-strand break | Single base change | Methylation | Single-strand break | Double-strand breaks are hard to repair correctly.
M2: Protons are attractive because of the: | Bragg peak | Photoelectric effect | Compton edge | Cherenkov light | Dose peaks at depth then falls sharply.

## Ionising radiation dosimetry
S: Dosimetry measures and calculates how much energy ionising radiation deposits in matter and what that means biologically. Absorbed dose, equivalent dose and effective dose each answer a different question, and mixing them up is a classic error.
H: Quantities
- **Absorbed dose** D: energy per unit mass, in gray (1 Gy = 1 J kg^{-1}).
- **Equivalent dose** H = w_{R} D, in sievert: weights radiation type (photons and electrons 1, protons 2, alpha 20, neutrons 2.5–20 depending on energy).
- **Effective dose** E = Σ w_{T} H_{T}: weights organ sensitivity (e.g. lung, stomach, colon, bone marrow, breast 0.12; gonads 0.08; skin 0.01). It estimates whole-body stochastic risk.
- **Kerma**: kinetic energy released per unit mass, used for beams.
E: D = E/m :: absorbed dose
E: H = w_{R} D, E = Σ w_{T} H_{T} :: equivalent and effective dose
H: Measuring dose
- **Ionisation chambers**: the reference instrument; measure charge from ionised air.
- **Thermoluminescent and OSL dosimeters**: personal badges and in-vivo checks.
- **Diodes, diamonds, film and gel dosimeters** for small fields and 2D or 3D maps.
- Calibration traces back to primary standards (calorimeters) at national labs.
H: Typical doses
P: UK natural background averages ~2.7 mSv per year. Chest X-ray ~0.02 mSv; CT abdomen ~8 mSv; transatlantic flight ~0.05 mSv. The occupational limit is 20 mSv per year. A radiotherapy course delivers ~60 Gy to the tumour, which would be lethal as a whole-body dose (LD_{50} ≈ 4–5 Gy).
X: A 70 kg person absorbs 0.14 J uniformly. What is the dose?
> D = 0.14/70 = 2 × 10^{-3} Gy = 2 mGy
X: Lungs receive 10 mGy from alpha particles. What is the equivalent dose and its contribution to effective dose?
> H = 20 × 10 = 200 mSv
> Contribution = 0.12 × 200 = 24 mSv
K: Gray measures energy; sievert estimates risk. Use Gy for radiotherapy and deterministic effects, Sv for protection.
!: Effective dose is for populations and comparisons, not for estimating an individual patient's precise risk.
Q: What is 1 Gy? | 1 joule of energy absorbed per kilogram.
Q: What is the radiation weighting factor for alpha particles? | 20.
M1: An effective dose of 8 mSv is typical of: | A CT abdomen | A chest X-ray | A dental X-ray | A day of background | CT gives several mSv.
M2: Equivalent dose accounts for: | Radiation type | Organ sensitivity | Time of exposure | Body mass | w_{R} weights the radiation type; w_{T} the organ.

## Radiation protection
S: Radiation protection keeps exposures to patients, staff and the public as low as reasonably achievable while allowing the benefits of radiation. It rests on three principles, justification, optimisation and dose limits, and three practical tools: time, distance and shielding.
H: The principles
- **Justification**: an exposure must do more good than harm.
- **Optimisation (ALARA)**: keep doses as low as reasonably achievable, using diagnostic reference levels for patients.
- **Dose limits**: for workers and the public, not for patients (whose benefit is weighed directly).
H: Time, distance, shielding
- **Time**: dose ∝ exposure time.
- **Distance**: for a point source, dose rate ∝ 1/r^{2}.
- **Shielding**: lead aprons, lead glass, concrete bunkers; half-value layer (HVL) halves intensity.
E: Ḋ_{2} = Ḋ_{1}(r_{1}/r_{2})^{2} :: inverse square law
E: I = I_{0}(1/2)^{x/HVL} :: shielding with half-value layers
H: Limits and models
P: UK and ICRP limits: workers 20 mSv per year effective; public 1 mSv per year; eye lens 20 mSv per year for workers. Protection uses the linear no-threshold (LNT) model, assuming risk ∝ dose even at low doses (about 5% fatal cancer risk per Sv). Pregnant patients and children receive extra care because they are more sensitive.
X: Dose rate is 80 μSv h^{-1} at 0.5 m. What is it at 2 m?
> Ratio (0.5/2)^{2} = 1/16
> 80/16 = 5 μSv h^{-1}
X: Lead has an HVL of 0.25 mm at 80 kV. What fraction passes 0.5 mm apron lead?
> 0.5/0.25 = 2 HVLs ⇒ 1/4 = 25%
> In practice, scatter is lower energy and the apron stops >90%
K: Doubling your distance from a source cuts dose rate to a quarter; distance is often the cheapest protection.
!: Dose limits do not apply to patients; their exposures are controlled by justification and optimisation.
Q: What is the annual effective dose limit for the public? | 1 mSv (excluding natural background and medical exposures).
Q: What does ALARA stand for? | As low as reasonably achievable.
M1: Tripling distance from a point source changes dose rate by: | 1/9 | 1/3 | 1/6 | 3 | Inverse square.
M2: Three half-value layers transmit: | 12.5% | 33% | 25% | 3% | (1/2)^{3}.
M3: The occupational effective dose limit is: | 20 mSv per year | 1 mSv per year | 100 mSv per year | 500 mSv per year | ICRP and UK IRR17.

## Medical accelerators
S: Medical linear accelerators accelerate electrons to several MeV using microwaves, then turn them into therapeutic X-ray beams or use them directly. Cyclotrons and synchrotrons accelerate protons and ions for particle therapy and make PET isotopes.
H: The linac
- An electron gun injects electrons into a waveguide powered by a magnetron or klystron at ~3 GHz (S-band).
- The microwave field accelerates bunches to 4–25 MeV over ~1 m.
- A bending magnet steers the beam to a tungsten target, producing bremsstrahlung X-rays (e.g. 6 MV).
- A flattening filter (or none, for flattening-filter-free high dose rates) shapes the beam; a multileaf collimator (MLC) shapes the field.
- In electron mode the target is removed and scattering foils spread the beam.
H: Beam properties
- A 6 MV beam has a mean photon energy of ~2 MeV; depth of maximum dose ~1.5 cm.
- Percentage depth dose (PDD) falls slowly with depth: ~67% at 10 cm for 6 MV in a 10 × 10 cm field.
- Electron beams: practical range in cm ≈ E (MeV)/2, with a sharp fall-off.
E: R_{p} ≈ E/2 cm :: electron practical range in water
H: Particle accelerators
P: Cyclotrons accelerate protons in a spiral using a fixed field and alternating voltage, reaching ~230 MeV for therapy (range ~32 cm in water); synchrocyclotrons and superconducting designs make them compact. Synchrotrons accelerate carbon ions for heavy-ion therapy. Small cyclotrons in hospitals make ^{18}F and other PET isotopes. Gantries rotate beams around the patient; pencil-beam scanning paints the tumour spot by spot.
E: f = qB/(2πm) :: cyclotron frequency
X: What is the practical range of a 12 MeV electron beam in tissue?
> R_{p} ≈ 12/2 = 6 cm
> Useful for tumours within ~4 cm (the 80% depth is roughly E/3)
X: Proton cyclotron frequency at B = 3 T?
> f = (1.6 × 10^{-19} × 3)/(2π × 1.67 × 10^{-27}) ≈ 46 MHz
K: Linacs make megavoltage X-rays by stopping fast electrons in a target; cyclotrons accelerate protons for therapy and isotope production.
!: "6 MV" describes the accelerating potential; the photon spectrum is continuous with a mean energy about a third of the maximum.
Q: What produces the microwaves in a linac? | A magnetron or klystron, at about 3 GHz.
Q: What does the multileaf collimator do? | Its many tungsten leaves shape the field to the tumour outline and modulate intensity.
M1: A 9 MeV electron beam has a practical range of about: | 4.5 cm | 9 cm | 18 cm | 1 cm | E/2.
M2: Medical PET isotopes are usually made in: | A cyclotron | A linac | A nuclear reactor only | An X-ray tube | Proton bombardment of targets.

## Brachytherapy
S: Brachytherapy places sealed radioactive sources inside or next to a tumour, delivering a high dose locally with a steep fall-off that spares surrounding tissue. It is used for prostate, cervical, breast, skin and eye cancers.
H: Techniques
- **Permanent implants (low dose rate, LDR)**: iodine-125 seeds (59 days, ~28 keV) or palladium-103 left in the prostate.
- **High dose rate (HDR) afterloading**: an iridium-192 source (74 days, mean ~380 keV) on a cable steps through catheters under remote control; staff are outside the room.
- **Intracavitary** (cervix), **interstitial** (prostate, breast), **surface moulds** (skin), **eye plaques** (ruthenium-106 or iodine-125).
H: Dose fall-off
- Close to a point source, dose rate falls roughly as 1/r^{2}, so dose is highly concentrated.
- Dwell times at each source position shape the dose (like painting with the source).
- Calculations follow the AAPM TG-43 formalism: air-kerma strength, dose-rate constant, radial dose and anisotropy functions.
E: Ḋ(r) ∝ S_{K} Λ / r^{2} :: point-source approximation
H: Advantages and safety
P: Brachytherapy delivers very high doses to the target in short times, uses little equipment and avoids beam setup errors since the source moves with the organ. Risks include source loss, stuck sources and dosimetry errors, so afterloaders have emergency retraction, and every source is accounted for before and after treatment.
X: Dose rate at 1 cm from a source is 10 Gy h^{-1}. Estimate the rate at 3 cm (inverse square only).
> 10 × (1/3)^{2} ≈ 1.1 Gy h^{-1}
> Real rates are slightly lower because of attenuation and scatter
X: An I-125 implant initially delivers 7 cGy h^{-1}. What is the total dose if all the activity decays (T_{1/2} = 59.4 days)?
> Total = Ḋ_{0} × T_{1/2}/ln 2 = 7 × 59.4 × 24/0.693
> ≈ 14 400 cGy ≈ 144 Gy
K: Brachytherapy's steep 1/r^{2} fall-off gives dose concentration that external beams struggle to match.
!: A positioning error of a few millimetres changes dose substantially because the gradient is so steep.
Q: What isotope is used in most HDR afterloaders? | Iridium-192.
Q: What is afterloading? | Placing empty applicators first, then sending the source in remotely, which reduces staff exposure.
M1: Permanent prostate seeds commonly contain: | Iodine-125 | Cobalt-60 | Caesium-137 | Fluorine-18 | Low-energy, ~59-day half-life.
M2: Total dose from a permanent implant is: | Initial dose rate × mean life | Initial dose rate × half-life | Initial rate only | Infinite | Integrating e^{−λt} gives Ḋ_{0}/λ.

## Radiobiological modelling
S: Radiobiological models predict how cells, tumours and normal tissues respond to radiation dose, dose per fraction and time. The linear-quadratic model and biologically effective dose let clinicians compare and design fractionation schedules.
H: Cell survival
- Survival fraction falls exponentially with dose, curving downwards at higher doses.
- The **linear-quadratic (LQ) model**: one track (αD) and two-track (βD^{2}) lethal damage.
- α/β ratio: dose where the two components are equal. Tumours and early-reacting tissues ~10 Gy; late-reacting tissues (spinal cord, rectum) ~3 Gy; prostate cancer ~1.5 Gy.
E: S = e^{−(αD + βD^{2})} :: linear-quadratic survival
E: BED = nd(1 + d/(α/β)) :: biologically effective dose
E: EQD_{2} = BED/(1 + 2/(α/β)) :: equivalent dose in 2 Gy fractions
H: The four Rs
- **Repair** of sublethal damage between fractions.
- **Repopulation** of tumour cells during treatment (why gaps hurt).
- **Reoxygenation** of hypoxic cells.
- **Redistribution** through the cell cycle (sensitive phases G_{2}/M).
- A fifth, **radiosensitivity**, varies between cell types.
H: Using the models
P: Low α/β tissues are more sensitive to fraction size, so hypofractionation can spare them only if the tumour also has low α/β (as in prostate cancer). Tumour control probability (TCP) and normal tissue complication probability (NTCP) models link dose to outcome. LQ is less reliable at very high doses per fraction, as used in SBRT.
X: Compare 60 Gy in 30 fractions with 42.7 Gy in 16 fractions for late effects (α/β = 3 Gy).
> 30 × 2: BED = 60(1 + 2/3) = 100 Gy
> 16 × 2.67: BED = 42.7(1 + 2.67/3) = 42.7 × 1.89 ≈ 80.7 Gy
> The shorter course is gentler on late-reacting tissue
X: What is EQD_{2} for 36.25 Gy in 5 fractions (prostate, α/β = 1.5)?
> d = 7.25 Gy; BED = 36.25(1 + 7.25/1.5) = 36.25 × 5.83 ≈ 211 Gy
> EQD_{2} = 211/(1 + 2/1.5) = 211/2.33 ≈ 90.6 Gy
K: BED lets you compare schedules: larger fractions hit low α/β tissues harder.
!: LQ parameters come from limited data with big uncertainties; treat outputs as guides, not exact predictions.
Q: Which tissue type has low α/β? | Late-reacting normal tissues (about 3 Gy) and prostate cancer (about 1.5 Gy).
Q: Name the four Rs of radiobiology. | Repair, repopulation, reoxygenation, redistribution.
M1: BED for 10 × 3 Gy with α/β = 10 is: | 39 Gy | 30 Gy | 60 Gy | 33 Gy | 30 × (1 + 0.3).
M2: Treatment gaps mainly hurt outcomes through: | Tumour repopulation | Reoxygenation | Repair | Redistribution | Surviving clonogens keep dividing.

## Image reconstruction
S: Image reconstruction turns raw measurements, such as projections, k-space samples or coincidence counts, into images. The same mathematics of inverse problems underpins CT, PET, SPECT and MRI, from the Radon transform to iterative and deep-learning methods.
H: Projections and the Radon transform
- A projection is a set of line integrals at one angle; the full set is a sinogram.
- The Radon transform maps an object to its sinogram; reconstruction inverts it.
- **Fourier slice theorem**: the 1D Fourier transform of a projection equals a radial line through the 2D Fourier transform of the object.
H: Filtered back projection
- Simple back projection smears each projection back across the image, giving a 1/r blur.
- Filtering each projection with a ramp filter |k| before back projecting removes the blur.
- The ramp amplifies noise, so it is rolled off with windows (Hann, Shepp–Logan).
- Fast and linear, but noisy at low dose and prone to streaks.
H: Iterative methods
- Model the system (geometry, physics, noise) and repeatedly update the image to match the data.
- **MLEM / OSEM** for emission tomography assume Poisson statistics; OSEM uses subsets to speed convergence.
- Model-based iterative reconstruction in CT lowers dose by ~30–60% at similar quality.
- Regularisation (penalties on roughness, total variation) controls noise.
H: MRI and deep learning
P: MRI data are samples of k-space; a fast Fourier transform gives the image. Parallel imaging (SENSE, GRAPPA) uses coil sensitivities to skip lines, and compressed sensing exploits sparsity to undersample further. Deep-learning reconstruction learns to remove noise and artefacts, but it must be validated so it does not invent or erase features.
E: p(s, θ) = ∫∫ f(x, y) δ(x cos θ + y sin θ − s) dx dy :: Radon transform
X: To reconstruct a 512 × 512 CT image well, roughly how many projection angles are needed?
> Rule of thumb: about (π/2) × N ≈ 1.57 × 512 ≈ 800 views
> Fewer views cause streak artefacts
K: Reconstruction is an inverse problem: know the physics, model the noise, and regularise wisely.
!: Iterative and AI methods can change noise texture and fine detail; radiologists need to know what they are looking at.
Q: Why is a ramp filter used in filtered back projection? | It removes the 1/r blurring caused by simple back projection.
Q: What does the Fourier slice theorem state? | The Fourier transform of a projection is a central slice of the object's 2D Fourier transform.
M1: OSEM is an iterative method suited to: | Poisson-distributed emission data | Ultrasound echoes only | Plain radiographs | Optical photographs | It is maximum-likelihood for counts.
M2: Compressed sensing in MRI allows: | Undersampling k-space | Higher B_{0} | Ionising contrast | Removing gradients | Sparsity lets fewer samples suffice.

## Image registration and analysis
S: Image registration aligns images from different times, patients or modalities so they can be compared or fused. Image analysis then extracts quantities such as volumes, shapes and textures, turning pictures into measurements that guide diagnosis and treatment.
H: Registration
- **Rigid**: 6 parameters (3 rotations, 3 translations); good for the head.
- **Affine**: adds scaling and shear (12 parameters).
- **Deformable**: allows local warping for breathing, organ filling and tumour shrinkage.
- Similarity metrics: sum of squared differences (same modality), mutual information (different modalities such as MRI–CT).
- Optimisation searches parameters to maximise similarity.
E: MI(A, B) = H(A) + H(B) − H(A, B) :: mutual information
H: Uses
- PET–CT and MRI–CT fusion for radiotherapy planning.
- Tracking tumour change between scans.
- Adaptive radiotherapy: mapping dose onto changing anatomy.
- Building atlases and population averages for brain imaging.
H: Analysis
P: Segmentation outlines organs and tumours, by hand, by thresholding and region growing, or increasingly with deep-learning networks (U-Net). Quantitative imaging measures volumes, SUV, perfusion and diffusion coefficients. Radiomics extracts many texture features to predict outcomes, but it needs careful validation because features depend on scanner and protocol.
E: Dice = 2|A ∩ B| / (|A| + |B|) :: overlap between two segmentations
X: Two outlines have volumes 40 mL and 50 mL with 36 mL overlap. What is the Dice score?
> Dice = 2 × 36/(40 + 50) = 72/90 = 0.80
K: Registration puts images into the same coordinates so information can be combined; segmentation turns them into numbers.
!: A good similarity score does not guarantee anatomically correct deformation; always check registrations visually.
Q: Why is mutual information used for multimodality registration? | It measures statistical dependence without assuming the intensities are similar.
Q: How many parameters does a rigid 3D registration have? | Six: three translations and three rotations.
M1: A Dice coefficient of 1 means: | Perfect overlap | No overlap | Half overlap | Undefined | Identical segmentations.
M2: Deformable registration is needed for: | Breathing-induced organ motion | A fixed skull only | Changing pixel size only | Colour display | Organs warp, not just move rigidly.

## Medical detector systems
S: Medical detectors convert X-rays, gamma rays and particles into electrical signals. Choosing between scintillators, semiconductors and gas detectors depends on the needed efficiency, energy resolution, speed, spatial resolution and cost.
H: Detector types
- **Gas detectors**: ionisation chambers (dosimetry), proportional counters, Geiger–Müller tubes (survey and contamination monitoring).
- **Scintillators**: NaI(Tl) (gamma cameras), CsI(Tl) (flat-panel X-ray), LSO/LYSO (PET, fast and dense), BGO (very dense, slower). Light is read by photomultipliers or silicon photomultipliers (SiPMs).
- **Semiconductors**: silicon (diodes, dosimetry), amorphous selenium (mammography), CdTe and CZT (photon-counting CT, cardiac SPECT), germanium (high-resolution spectroscopy).
H: Key figures of merit
- **Detection efficiency**: fraction of photons that interact; rises with density, Z and thickness.
- **Energy resolution**: FWHM of a photopeak as a percentage; NaI ~10% at 140 keV, CZT ~5%.
- **Dead time**: time after an event during which another cannot be recorded.
- **Detective quantum efficiency (DQE)**: how well SNR is preserved from input to output.
E: DQE = SNR_{out}^{2}/SNR_{in}^{2} :: detective quantum efficiency
E: η = 1 − e^{−μt} :: interaction efficiency
H: Photon counting
P: Photon-counting detectors count each photon and sort it into energy bins, removing electronic noise, giving spectral (colour) CT and improving contrast and resolution at lower dose. Their challenge is very high count rates, causing pile-up and charge sharing between pixels.
X: A crystal has μ = 0.34 cm^{-1} at 511 keV for NaI and 0.87 cm^{-1} for LSO. What fraction does 2 cm of each stop?
> NaI: 1 − e^{−0.68} ≈ 0.49
> LSO: 1 − e^{−1.74} ≈ 0.82
> Hence dense LSO is preferred for PET
K: Detector choice is a balance of stopping power, light or charge yield, speed and cost.
!: High count rates cause dead-time losses; a detector can under-read a strong source dramatically.
Q: Why is NaI(Tl) used in gamma cameras? | Good light output and efficiency at 140 keV, and it can be grown in large crystals cheaply.
Q: What does DQE measure? | How efficiently a detector preserves the signal-to-noise ratio of the incoming photons.
M1: Silicon photomultipliers replace: | Photomultiplier tubes | Collimators | Anodes | X-ray filters | They read scintillation light compactly, even in MRI fields.
M2: Photon-counting CT detectors are typically made from: | CdTe or CZT | Lead | Air | Plastic scintillator | High-Z semiconductors.

## Optical medical imaging
S: Optical imaging uses visible and near-infrared light to see tissue structure and chemistry at high resolution without ionising radiation. Its challenge is scattering, which limits depth, so methods range from endoscopy to optical coherence tomography and diffuse optics.
H: Light in tissue
- Absorption by haemoglobin, melanin, water and lipids; scattering by cells and organelles dominates.
- The **optical window** at ~650–950 nm has lowest absorption, allowing light to reach a few centimetres.
- Reduced scattering coefficient μ_{s}' ~ 10 cm^{-1}; absorption μ_{a} ~ 0.1 cm^{-1}.
H: Techniques
- **Endoscopy**: cameras on flexible scopes; narrow-band imaging highlights vessels.
- **Optical coherence tomography (OCT)**: low-coherence interferometry gives micrometre depth sections, standard in ophthalmology and used in coronary arteries.
- **Fluorescence imaging**: indocyanine green or targeted dyes guide surgeons to tumours and vessels.
- **Pulse oximetry**: ratio of red and infrared absorption gives oxygen saturation.
- **Near-infrared spectroscopy and diffuse optical tomography**: brain oxygenation and breast imaging.
- **Photoacoustic imaging**: laser pulses cause tissue to expand and emit ultrasound, combining optical contrast and ultrasound depth.
E: Δz ≈ (2 ln2/π)(λ_{0}^{2}/Δλ) :: OCT axial resolution
H: Strengths and limits
P: Optical methods are cheap, fast and safe, and they measure function such as oxygenation. But beyond about 1 mm, scattering destroys sharp images, so deep optical imaging gives only blurry, low-resolution maps. Pulse oximeters can read less accurately in darker skin, a known equity issue that newer devices aim to correct.
X: OCT with λ_{0} = 840 nm and bandwidth 50 nm. What is the axial resolution?
> Δz ≈ 0.44 × (840^{2}/50) nm = 0.44 × 14 112 nm ≈ 6.2 μm
K: Optical imaging offers molecular and functional contrast, but scattering limits sharp imaging to shallow depths.
!: The near-infrared window improves penetration but does not abolish scattering; resolution still falls with depth.
Q: How does a pulse oximeter work? | It compares absorption of red and infrared light by oxygenated and deoxygenated haemoglobin during each pulse.
Q: What sets OCT axial resolution? | The source's coherence length: broader bandwidth gives finer resolution.
M1: The tissue optical window lies around: | 650–950 nm | 200–300 nm | 10 μm | 1 mm | Lower absorption by haemoglobin and water.
M2: Photoacoustic imaging detects: | Ultrasound produced by absorbed light | Reflected light only | X-rays | Radio waves | Light in, sound out.

## Functional imaging
S: Functional imaging measures what tissue is doing rather than what it looks like: blood flow, metabolism, oxygenation, diffusion and neural activity. Functional MRI, PET, perfusion and diffusion imaging are vital in neuroscience, oncology and cardiology.
H: Functional MRI (BOLD)
- Active neurons increase local blood flow more than oxygen use, so deoxyhaemoglobin falls.
- Deoxyhaemoglobin is paramagnetic; less of it lengthens T_{2}*, raising signal by ~1–5%.
- The haemodynamic response lags activity by ~5 s, limiting time resolution.
- Used for brain mapping before surgery and in cognitive neuroscience.
H: Diffusion imaging
- Diffusion-weighted MRI senses random water motion; restricted diffusion (stroke, dense tumours) appears bright.
- The apparent diffusion coefficient (ADC) quantifies it.
- Diffusion tensor imaging and tractography map white-matter fibre directions.
E: S = S_{0} e^{−b·ADC} :: diffusion-weighted signal
H: Perfusion and other methods
P: Dynamic contrast-enhanced CT or MRI tracks how contrast flows in and out, giving blood flow, blood volume and permeability. Arterial spin labelling uses magnetically tagged blood as a natural tracer. PET quantifies glucose use, oxygen consumption and receptor density. Magnetic resonance spectroscopy measures metabolites such as N-acetylaspartate, choline and lactate. MEG and EEG measure neural activity directly with millisecond timing.
X: A DWI signal drops from 1000 (b = 0) to 368 (b = 1000 s mm^{-2}). What is the ADC?
> 368/1000 = e^{−1000 × ADC}
> ADC = −ln(0.368)/1000 = 1.0 × 10^{-3} mm^{2} s^{-1}, typical of brain tissue
K: Functional imaging measures physiology; BOLD fMRI sees blood oxygenation changes, not neurons directly.
!: BOLD signals are small and noisy; statistical thresholds and motion correction matter enormously.
Q: Why does neural activity raise the BOLD signal? | Blood flow overshoots oxygen demand, reducing paramagnetic deoxyhaemoglobin and lengthening T_{2}*.
Q: What does a low ADC indicate? | Restricted diffusion, as in acute stroke or highly cellular tumours.
M1: Diffusion tensor tractography maps: | White-matter fibre tracts | Bone density | Blood glucose | Lung ventilation | Water diffuses along axons.
M2: Which gives the best time resolution for brain activity? | MEG | fMRI | PET | Perfusion CT | MEG measures magnetic fields from neural currents in milliseconds.

## Quality assurance in medical physics
S: Quality assurance makes sure imaging and therapy equipment performs consistently and safely, so every patient gets the intended image quality or dose. Medical physicists design tests, set tolerances and track trends from daily checks to annual audits.
H: What QA covers
- **Acceptance testing** of new equipment against specification.
- **Commissioning**: measuring beam data or baselines before clinical use.
- **Routine QA**: daily, weekly, monthly and annual checks with tolerances and action levels.
- **Patient-specific QA**: verifying complex plans (IMRT, VMAT) before treatment.
- **Audits**: independent dosimetry checks between centres.
H: Examples
- **Linac**: output constancy (±2–3% daily), laser and isocentre alignment (~1 mm), MLC position, imaging–treatment coincidence.
- **CT**: CT number of water (0 ± 4 HU), noise, uniformity, slice thickness, dose index (CTDI).
- **Gamma camera**: uniformity floods, energy peaking, centre of rotation for SPECT.
- **MRI**: SNR, geometric distortion, uniformity with phantoms.
- **Ultrasound**: transducer element dropout, depth and distance accuracy.
E: Gamma index: γ = min √(Δr^{2}/δr^{2} + ΔD^{2}/δD^{2}) :: dose comparison, pass if γ ≤ 1
H: Tracking and culture
P: Results are logged and plotted against time; control charts flag drifts before they exceed tolerances. Patient QA often uses gamma analysis with 3%/2 mm criteria, requiring ~95% of points to pass. Good QA culture includes peer review, incident learning systems and independent checks, because most serious errors come from processes, not machines.
X: A linac reads 101.8 cGy for an expected 100 cGy; tolerance is ±2%. Is it in tolerance?
> Deviation = 1.8% < 2%: within tolerance, but note the trend
X: A plan point differs by 2% in dose at a position with 1 mm distance-to-agreement. With 3%/3 mm criteria, does it pass?
> γ ≈ √(1/9 + (2/3)^{2}) = √(0.11 + 0.44) = √0.56 ≈ 0.75 < 1: passes
K: QA catches drift and faults before they reach patients; documentation and trends matter as much as single readings.
!: Passing gamma analysis does not guarantee a clinically correct plan; it only tests agreement under the chosen criteria.
Q: What is commissioning? | Measuring and verifying a machine's data and performance before its first clinical use.
Q: What does CTDI measure? | A standardised CT dose index measured in a phantom.
M1: A daily CT check measures water's HU as: | About 0 | About −1000 | About +1000 | About +100 | Water defines 0 HU.
M2: A typical IMRT QA gamma criterion is: | 3%/2 mm | 30%/20 mm | 0.1%/0.1 mm | 50%/1 cm | With ~95% pass rate.

## Radiation safety and clinical risk
S: Radiation safety in hospitals combines physics, regulation and human factors to prevent accidents and manage risk. Learning from incidents, clear roles and a just culture protect patients, staff and the public every day.
H: Regulation
- UK: Ionising Radiations Regulations (IRR17) protect workers; IR(ME)R 2017 protects patients.
- Roles: radiation protection adviser (RPA), medical physics expert (MPE), radiation protection supervisors, referrers, practitioners and operators.
- Controlled and supervised areas, local rules, risk assessments and dose monitoring.
H: Learning from accidents
- **Therac-25 (1985–87)**: software race conditions caused massive overdoses; a lesson in system safety and independent interlocks.
- **Epinal, France (2004–05)**: wrong dosimetry settings overdosed prostate patients.
- **Goiânia, Brazil (1987)**: an abandoned caesium-137 source was opened; four died.
- Common causes: miscommunication, wrong patient or site, calculation errors, poor software design, and missing checks.
H: Managing risk
- Failure mode and effects analysis (FMEA) ranks risk priority before errors happen.
- Checklists, timeouts and two-person independent checks for calculations.
- Incident reporting and near-miss analysis drive improvements.
- Patient pregnancy checks and paediatric protocols.
- Communication: explaining benefits and risks in plain terms (e.g. a CT dose ≈ a few years of background).
E: RPN = S × O × D :: risk priority number (severity, occurrence, detectability)
H: Deterministic and stochastic effects
P: Deterministic (tissue) effects have thresholds and severity rising with dose: skin erythema from ~2 Gy in long fluoroscopy, cataracts, hair loss. Stochastic effects, cancer and heritable effects, have probability rising with dose and no assumed threshold. Interventional procedures need careful skin-dose monitoring.
X: A failure mode scores severity 9, occurrence 3, detectability 7. What is its RPN?
> RPN = 9 × 3 × 7 = 189
> High scores get priority for extra checks
X: A CT scan gives 10 mSv. With ~5% per Sv lifetime fatal cancer risk, estimate the added risk.
> 0.01 Sv × 0.05 = 5 × 10^{-4}, about 1 in 2000
> Compare with a baseline lifetime cancer risk of about 1 in 2
K: Most radiation incidents come from systems and people, not physics; layered independent checks and a reporting culture keep patients safe.
!: Do not quote LNT-based risks to individuals as certainties; they are population estimates with large uncertainty at low dose.
Q: What does IR(ME)R regulate? | Medical exposures of patients to ionising radiation.
Q: What was the main lesson of Therac-25? | Software errors can kill; safety needs independent hardware interlocks and rigorous system design.
M1: Skin erythema in fluoroscopy is a: | Deterministic effect | Stochastic effect | Heritable effect | Psychological effect | It has a dose threshold.
M2: FMEA is used to: | Anticipate and rank failures before they happen | Calibrate dosimeters | Reconstruct images | Measure T_{1} | It is a prospective risk method.
`;
