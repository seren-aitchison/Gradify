// Unit 19: Optics. Format: kit/course/notes.js
export default `
## Geometrical optics
S: Geometrical (ray) optics treats light as rays travelling in straight lines, bending at interfaces. It works when everything is much larger than the wavelength and explains mirrors, lenses, cameras, eyes and telescopes.
H: Principles
- Light travels in straight lines in uniform media.
- Law of reflection: angle of incidence = angle of reflection.
- Snell's law at refracting surfaces.
- Rays are reversible.
- Fermat's principle: light takes the path of stationary (usually least) optical path length ∫n dl.
H: Limits
- Fails when apertures or obstacles approach the wavelength: diffraction and interference need wave optics.
- Can't explain colours of thin films, resolution limits or polarisation.
H: Ray tracing
P: Lens and camera designers trace thousands of rays through optical systems to find focus, aberrations and image quality. The paraxial approximation (small angles, sin θ ≈ θ) gives the simple lens formulas; exact tracing reveals aberrations.
X: Why does a pencil look bent in water?
> Light from the submerged part refracts away from the normal leaving the water
> The eye traces rays back in straight lines, placing the image higher: apparent depth ≈ real depth/n
!: Rays are a model; light isn't really made of infinitely thin lines, and the model fails at small scales.
Q: State Fermat's principle. | Light travels between two points along the path of stationary optical path length.
Q: When does geometrical optics fail? | When apertures or features are comparable to the wavelength, so diffraction matters.
M1: A pool 2 m deep (n = 1.33) appears about: | 1.5 m deep | 2.7 m | 2 m | 1 m | Real/n.
M2: The paraxial approximation assumes: | Small angles to the axis | Large apertures | Short wavelengths only | No refraction | sin θ ≈ θ.

## Reflection and refraction
S: At a boundary, light partly reflects and partly refracts. Reflection follows equal angles; refraction follows Snell's law; the proportions depend on the refractive indices, angle and polarisation.
H: Reflection
- Specular (smooth surfaces, mirror images) vs diffuse (rough surfaces scatter in all directions, letting us see objects).
- Angle of incidence = angle of reflection, measured from the normal.
H: Refraction
E: n_{1} sin θ_{1} = n_{2} sin θ_{2}
E: apparent depth = real depth/n
- Light slows and bends towards the normal entering a denser (higher n) medium.
- Frequency unchanged; wavelength shortens by n.
H: How much reflects
- Fresnel equations; normal incidence R = ((n_{1} − n_{2})/(n_{1} + n_{2}))^{2}.
- Grazing incidence: almost total reflection (a lake mirrors distant hills).
X: Light enters glass (n = 1.52) at 40°. Refraction angle?
> sin θ_{2} = sin 40°/1.52 = 0.423 ⇒ θ_{2} = 25°
!: We see most objects by diffuse reflection; a perfect mirror is itself almost invisible.
Q: What is the difference between specular and diffuse reflection? | Specular: smooth surface, ordered reflection forming images. Diffuse: rough surface scattering light in all directions.
Q: What happens to wavelength when light enters glass? | It shortens by a factor of n; frequency is unchanged.
M1: Reflection angle when incidence is 30°: | 30° | 60° | 15° | 90° | Equal angles.
M2: Why does a still lake reflect strongly at low viewing angles? | Reflectance rises sharply towards grazing incidence | Water is a metal | Lakes are coated | Refraction stops | Fresnel equations.

## Snell's law
S: Snell's law gives the angle of a refracted ray: the product of refractive index and the sine of the angle is the same on both sides of an interface. It follows from the change in wave speed, via Huygens' or Fermat's principle.
H: The law
E: n_{1} sin θ_{1} = n_{2} sin θ_{2}
E: sin θ_{1}/sin θ_{2} = v_{1}/v_{2} = λ_{1}/λ_{2}
H: Derivations
- **Huygens**: wavelets travel slower in medium 2, so the wavefront tilts.
- **Fermat**: minimising travel time between two points across the interface gives Snell's law (like a lifeguard running then swimming).
- **Wave matching**: the tangential component of k must be continuous: k_{1} sin θ_{1} = k_{2} sin θ_{2}.
H: Measuring n
P: Trace rays through a glass block at several angles; plot sin i against sin r; the gradient is n. Or find the critical angle, or use a refractometer. Refractive index identifies gems and measures sugar concentration in fruit juice.
X: A gradient graph of sin i against sin r has gradient 1.48. What is the block likely made of?
> n = 1.48: Perspex/acrylic (crown glass ~1.52)
!: Use sines of angles, not the angles themselves; θ_{1}/θ_{2} ≠ n_{2}/n_{1} except at small angles.
Q: State Snell's law. | n_{1} sin θ_{1} = n_{2} sin θ_{2}.
Q: How does Fermat's principle explain Snell's law? | The refracted path minimises the travel time when speeds differ in the two media.
M1: Light goes from water (1.33) to glass (1.5) at 30°. Refraction angle: | 26° | 30° | 34° | 45° | sin θ_{2} = 1.33 × 0.5/1.5.
M2: A graph of sin i against sin r for light entering a block has gradient: | n of the block | 1/n | Critical angle | Zero | sin i = n sin r.

## Total internal reflection
S: When light travelling in a dense medium meets a less dense one at an angle above the critical angle, none refracts out: it's totally reflected. This traps light in optical fibres and makes diamonds sparkle.
H: Condition
E: sin θ_{c} = n_{2}/n_{1} (n_{1} > n_{2})
- Glass–air ~42°; water–air 49°; diamond–air 24.4°.
- 100% reflection (better than any mirror), apart from absorption.
H: Applications
- Optical fibres and endoscopes.
- Prisms in binoculars and periscopes (45° prisms reflect at 45° > 42°).
- Diamonds: cut so light reflects internally many times before escaping, maximising sparkle.
- Rain sensors on windscreens: water on the glass frustrates TIR.
- Fingerprint scanners: ridges in contact frustrate TIR.
H: Evanescent wave
P: Even during TIR, a field penetrates about a wavelength into the outer medium, decaying exponentially. Bring a second dense medium within that distance and light tunnels across (frustrated TIR), an optical analogue of quantum tunnelling; used in beam splitters and TIRF microscopy.
X: Critical angle for light leaving a fibre core (1.48) into cladding (1.46)?
> sin θ_{c} = 1.46/1.48 ⇒ θ_{c} = 80.6°
> Rays must strike the core boundary at more than 80.6° to the normal (nearly parallel to the axis)
!: TIR only happens going from higher to lower index; light entering a denser medium always refracts in.
Q: What is the critical angle? | The angle of incidence (in the denser medium) beyond which there's no refracted ray.
Q: Why do diamonds sparkle? | Their small critical angle traps light by total internal reflection until it exits through the top facets, and dispersion splits colours.
M1: Total internal reflection requires light to travel: | From higher to lower n above θ_{c} | From lower to higher n | At normal incidence | In a vacuum | Condition.
M2: Binoculars use prisms rather than mirrors because: | TIR gives near-100% reflection without coatings | Prisms magnify | Mirrors absorb light | It's cheaper | Better reflection.

## Mirrors and image formation
S: Mirrors form images by reflection. Plane mirrors give upright, same-size virtual images; curved mirrors can magnify, focus light and form real images, used in telescopes, headlamps and solar furnaces.
H: Plane mirrors
- Image as far behind the mirror as the object is in front; laterally inverted; virtual.
- You need a mirror only half your height to see your whole body.
H: Spherical mirrors
E: f = R/2
E: 1/f = 1/u + 1/v; m = −v/u :: mirror equation (real-is-positive convention)
- **Concave** (converging): real inverted images beyond f; virtual magnified images inside f (shaving mirrors).
- **Convex** (diverging): always virtual, upright, smaller; wide field of view (car wing mirrors, shop security).
H: Parabolic mirrors
P: Spherical mirrors don't focus all parallel rays to one point (spherical aberration). Parabolic mirrors do, so they're used in reflecting telescopes, satellite dishes, solar concentrators and headlamps (light source at the focus makes a parallel beam).
X: An object 30 cm from a concave mirror (f = 10 cm). Image position and magnification?
> 1/v = 1/10 − 1/30 = 2/30 ⇒ v = 15 cm (real)
> m = −15/30 = −0.5: inverted, half size
!: Sign conventions differ between textbooks (real-is-positive vs Cartesian); be consistent.
Q: Where is the image in a plane mirror? | As far behind the mirror as the object is in front.
Q: Why are convex mirrors used on cars? | They give a wide field of view with upright images.
M1: A concave mirror's focal length is: | Half its radius of curvature | Equal to its radius | Twice its radius | Zero | f = R/2.
M2: An object inside the focal point of a concave mirror gives: | A virtual, upright, magnified image | A real inverted image | No image | A smaller real image | Shaving mirror.

## Thin lenses
S: A thin lens refracts light at two curved surfaces to bring rays to a focus (converging) or spread them (diverging). Lenses form images in eyes, cameras, projectors and glasses.
H: Types
- **Converging (convex)**: thicker in the middle; positive focal length; forms real images of distant objects.
- **Diverging (concave)**: thinner in the middle; negative focal length; virtual images only.
- Power P = 1/f (dioptres, D): +2 D lens has f = 50 cm.
H: Lensmaker's equation
E: 1/f = (n − 1)(1/R_{1} − 1/R_{2})
- Focal length depends on curvature and refractive index (and so on wavelength: chromatic aberration).
- A lens's power changes in water (smaller n difference): why vision blurs underwater.
H: Ray rules
- Parallel ray → through focal point.
- Ray through centre → undeviated.
- Ray through focal point → emerges parallel.
X: A biconvex lens (n = 1.5) with radii 20 cm and −20 cm. Focal length?
> 1/f = 0.5(1/20 + 1/20) = 0.05 ⇒ f = 20 cm
!: Thin lenses combine by adding powers: P = P_{1} + P_{2} when in contact.
Q: What is lens power? | P = 1/f, in dioptres (m^{-1}).
Q: Why does vision blur underwater? | The cornea's refractive power drops because water's index is close to the eye's.
M1: A −4 D lens has focal length: | −25 cm | 4 m | −4 cm | 25 cm | f = 1/P.
M2: Two lenses of +3 D and +2 D in contact have power: | +5 D | +6 D | +1 D | +1.2 D | Powers add.

## Lens equations
S: The thin lens equation relates object distance, image distance and focal length; magnification gives image size. With them you can predict where and how large any lens forms an image.
H: Equations
E: 1/f = 1/u + 1/v :: real-is-positive convention
E: m = v/u = h_{i}/h_{o}
- Cartesian convention: 1/v − 1/u = 1/f with signed distances.
H: Converging lens cases
- u > 2f: real, inverted, smaller (camera, eye).
- u = 2f: real, inverted, same size.
- f < u < 2f: real, inverted, larger (projector).
- u = f: image at infinity.
- u < f: virtual, upright, larger (magnifying glass).
H: Combinations
- Image of the first lens is the object for the second.
- Total magnification = product of magnifications.
X: A projector lens (f = 10 cm) forms a sharp image on a screen 5 m away. Where's the slide, and magnification?
> 1/u = 1/10 − 1/500 = 0.098 ⇒ u = 10.2 cm
> m = 500/10.2 = 49
!: A virtual image can't be projected on a screen, but it can be seen or photographed through the lens.
Q: State the thin lens equation. | 1/f = 1/u + 1/v.
Q: What image does a magnifying glass form? | Virtual, upright and magnified, with the object inside the focal length.
M1: An object at 2f from a converging lens gives an image at: | 2f, same size | f | Infinity | Between f and 2f | Symmetric.
M2: A lens (f = 5 cm) with object 4 cm away forms an image at: | 20 cm, virtual | 20 cm, real | 2.2 cm | 9 cm | 1/v = 1/5 − 1/4 = −1/20.

## Optical instruments
S: Optical instruments combine lenses and mirrors to see things too small, too far or too faint for the eye. Understanding the eye itself is the starting point: cameras, glasses, magnifiers and projectors all extend it.
H: The eye
- Cornea (most focusing, ~43 D) and lens (~20 D, adjustable: accommodation).
- Near point ~25 cm (young adult); far point infinity.
- Myopia (short sight): diverging lens; hypermetropia (long sight): converging lens; presbyopia: reading glasses; astigmatism: cylindrical lens.
H: Magnifying glass
E: M = 25 cm/f (image at infinity); M = 1 + 25 cm/f (image at near point)
H: Cameras
- f-number N = f/D: smaller N, more light; exposure ∝ 1/N^{2}.
- Depth of field increases with N.
- Sensor pixel size and the lens's diffraction limit set resolution.
X: A myopic person's far point is 2 m. Lens power needed?
> Lens must image infinity at 2 m: f = −2 m
> P = −0.5 D
!: Magnification isn't the same as resolution: magnifying a blurred image only shows a bigger blur.
Q: How does the eye focus on near objects? | Ciliary muscles let the lens become more curved (accommodation), increasing its power.
Q: What corrects short sight? | A diverging lens.
M1: A camera at f/8 compared with f/4 lets in: | 1/4 the light | 1/2 | Twice | The same | ∝ 1/N^{2}.
M2: A magnifying glass of f = 5 cm gives angular magnification (image at infinity) of: | 5 | 25 | 0.2 | 125 | 25/5.

## Microscopes and telescopes
S: Microscopes magnify small, near objects; telescopes magnify the angular size of distant ones and collect their faint light. Both use an objective to form an image and an eyepiece (or sensor) to view it.
H: Compound microscope
E: M ≈ (L/f_{o})(25 cm/f_{e}) :: L = tube length
- Objective (short f) makes a magnified real image; eyepiece magnifies it further.
- Resolution limit d ≈ 0.61λ/NA (~200 nm for visible light); oil immersion raises NA to ~1.4.
- Super-resolution microscopy (STED, PALM, STORM; Nobel 2014) beats this using fluorescence tricks.
H: Telescopes
E: M = f_{o}/f_{e} :: angular magnification
E: θ_{min} = 1.22λ/D :: resolution
- **Refractors**: lenses; chromatic aberration; limited to ~1 m.
- **Reflectors**: mirrors; no chromatic aberration; segmented and up to 39 m (ELT).
- Light-gathering ∝ D^{2}: the main reason for large telescopes.
- Space telescopes avoid atmospheric blurring and absorption (Hubble, JWST).
X: A telescope with f_{o} = 1.2 m and f_{e} = 25 mm. Magnification? Resolution if D = 0.2 m (550 nm)?
> M = 48
> θ = 1.22 × 5.5 × 10^{-7}/0.2 = 3.4 × 10^{-6} rad ≈ 0.7″
!: Telescope magnification is less important than aperture; a high-magnification small telescope just shows a dim, blurry view.
Q: Why are large telescopes reflectors? | Large mirrors can be supported from behind and have no chromatic aberration.
Q: What limits an optical microscope's resolution? | Diffraction: about 0.61λ/NA.
M1: A telescope's light-gathering power depends on: | Aperture area | Magnification | Eyepiece | Length | ∝ D^{2}.
M2: Oil immersion improves microscope resolution by: | Increasing numerical aperture | Shortening λ in air | Brightening the lamp | Reducing magnification | NA = n sin θ.

## Aberrations
S: Aberrations are departures from perfect imaging in real lenses and mirrors. They blur, distort and colour images, and much of optical design is about correcting them.
H: Monochromatic (Seidel) aberrations
- **Spherical**: edge rays focus closer than central ones; fixed by aspheric surfaces or stopping down.
- **Coma**: off-axis points look like comets.
- **Astigmatism**: different foci for perpendicular planes.
- **Field curvature**: the sharp image lies on a curved surface.
- **Distortion**: barrel or pincushion (straight lines curve).
H: Chromatic aberration
- Dispersion makes different colours focus at different distances (axial) and magnifications (lateral).
- Achromatic doublet: crown + flint glass bring two colours to a focus; apochromats bring three.
- Mirrors have none.
H: Correction
P: Camera lenses use many elements of different glasses, aspheric surfaces and low-dispersion materials to cancel aberrations. Modern phones also correct distortion and colour fringing in software. Hubble's primary mirror had spherical aberration (2.2 μm error at the edge), corrected in 1993 by optics designed to have equal and opposite aberration.
X: Why does stopping a lens down (higher f-number) sharpen images, up to a point?
> Blocking edge rays reduces spherical aberration and other aberrations
> But a smaller aperture increases diffraction blur (∝ N), so very small apertures soften images again
!: Aberrations and diffraction trade off; the sharpest aperture is usually two or three stops below maximum.
Q: What causes chromatic aberration? | Dispersion: refractive index varies with wavelength, so colours focus differently.
Q: How was Hubble's spherical aberration fixed? | Corrective optics (COSTAR and new instruments) with equal and opposite aberration.
M1: Which optical element has no chromatic aberration? | Mirror | Single lens | Prism | Achromat | Reflection is wavelength-independent.
M2: Barrel distortion makes straight lines: | Curve outward | Curve inward | Disappear | Colour-fringed | Bulging.

## Dispersion and prisms
S: A prism refracts different colours by different amounts because glass's refractive index depends on wavelength. Newton used prisms to show white light is a mixture of colours, founding spectroscopy.
H: Prism deviation
E: n = sin((A + δ_{min})/2)/sin(A/2) :: minimum deviation for apex angle A
- Thin prism: δ ≈ (n − 1)A.
- Violet deviates most, red least (normal dispersion).
H: Rainbows
- Sunlight refracts entering a raindrop, reflects inside, refracts out.
- Primary bow at ~42° from the anti-solar point (red outside); secondary at ~51° (two reflections; colours reversed).
- Alexander's dark band between them.
H: Spectroscopy
P: Newton's prism experiments (1666) showed colours aren't added by glass but separated from white light, and recombined them. Fraunhofer (1814) saw dark lines in sunlight; Kirchhoff and Bunsen identified them as elemental absorption, letting astronomers find what stars are made of. Gratings have largely replaced prisms in spectrometers.
X: A 60° prism gives minimum deviation 39°. Refractive index?
> n = sin(49.5°)/sin(30°) = 0.760/0.5 = 1.52
!: Prisms separate colours by dispersion; gratings by diffraction. They spread colours in opposite orders (prisms bend violet most; gratings bend red most).
Q: How did Newton show white light is a mixture? | Separated it with a prism and recombined the colours into white with a second prism.
Q: Why is the secondary rainbow's colour order reversed? | An extra internal reflection inverts the order.
M1: Which colour does a glass prism deviate most? | Violet | Red | Green | Yellow | Highest n.
M2: The primary rainbow appears at about: | 42° from the anti-solar point | 90° | 10° | 180° | Minimum deviation in water drops.

## Physical optics
S: Physical (wave) optics treats light as a wave to explain what rays can't: interference, diffraction, coherence and polarisation. It sets the ultimate limits of optical instruments.
H: Key ideas
- Superposition of coherent waves gives interference patterns.
- Huygens–Fresnel principle explains diffraction.
- Optical path difference: Δ = Σn_{i}l_{i}; phase difference δ = 2πΔ/λ.
- Fraunhofer (far-field) diffraction = Fourier transform of the aperture.
H: When it matters
- Small apertures (pinholes, slits) and fine structures (gratings, cells, CD tracks).
- Thin films (soap bubbles, oil slicks, coatings).
- Resolution limits of every imaging system.
- Coherent sources (lasers) make wave effects obvious; speckle appears on any rough surface lit by a laser.
H: Historical victory
P: Young's double slit (1801) and Fresnel's diffraction theory (1818) overturned Newton's corpuscular theory. The Poisson spot, predicted from Fresnel's theory as an apparent absurdity, was observed by Arago, convincing the sceptics.
X: Why does a laser beam on a wall look grainy (speckle)?
> The rough surface scatters coherent light with random path differences
> Random interference produces bright and dark grains
!: Wave optics doesn't replace ray optics; ray optics is the short-wavelength limit of wave optics.
Q: What is optical path length? | The physical path length times refractive index, Σnl.
Q: What is speckle? | A granular interference pattern from coherent light scattered by a rough surface.
M1: Fraunhofer diffraction patterns are: | Fourier transforms of the aperture | Images of the aperture | Random | Always circular | Far-field.
M2: Which phenomenon requires wave optics? | Thin-film colours | Shadows | Mirror images | Snell's law | Interference.

## Young's double-slit experiment
S: Young's double-slit experiment sends light through two narrow slits and shows bright and dark fringes on a screen: interference of waves from the two slits. It proved light is a wave and, done one particle at a time, revealed quantum superposition.
H: Results
E: d sin θ = nλ :: bright fringes
E: x = λD/d :: fringe spacing (small angles)
E: I = 4I_{0} cos^{2}(πd sin θ/λ) :: intensity (ignoring single-slit envelope)
- Wider slit spacing gives closer fringes; longer wavelength gives wider fringes.
- The pattern is modulated by each slit's diffraction envelope.
H: Requirements
- Coherent sources: originally sunlight through a single pinhole; now lasers.
- Slits comparable in width and close together (sub-mm).
H: Quantum version
P: Fire photons, electrons, neutrons, atoms or even molecules of ~2000 atoms one at a time: each lands at a single point, but the pattern builds up into fringes. Each particle's wavefunction passes through both slits. Measuring which slit it went through destroys the pattern.
X: Laser light (633 nm), slits 0.25 mm apart, screen 2.0 m away. Fringe spacing?
> x = 633 × 10^{-9} × 2.0/2.5 × 10^{-4} = 5.1 mm
!: The fringes come from path difference to each point on the screen, not from light "bouncing" between the slits.
Q: What's the fringe spacing in Young's experiment? | x = λD/d.
Q: What happens to the pattern if you detect which slit each electron passes through? | The interference fringes disappear.
M1: Using blue light instead of red makes fringes: | Closer together | Farther apart | Disappear | Brighter only | x ∝ λ.
M2: Young's experiment with single electrons shows: | Interference builds up from single detections | Electrons are classical | No pattern | Only two bands | Wave–particle duality.

## Interference and coherence
S: Interference needs coherence: a stable phase relationship between waves. Temporal coherence describes how long a wave stays in phase with itself; spatial coherence describes how phase is correlated across a beam.
H: Temporal coherence
E: l_{c} ≈ λ^{2}/Δλ = c/Δf :: coherence length
- White light: ~1 μm (thin films only). LED: ~10 μm. Sodium lamp: ~1 mm. HeNe laser: ~0.1–1 m. Stabilised lasers: kilometres.
- Path differences must be shorter than l_{c} for fringes.
H: Spatial coherence
E: d_{c} ≈ λL/s :: coherence width from a source of size s at distance L
- Starlight is spatially coherent over metres because stars are tiny in angle; Michelson measured Betelgeuse's diameter this way (1920).
H: Fringe visibility
E: V = (I_{max} − I_{min})/(I_{max} + I_{min})
- V = 1 fully coherent; 0 incoherent.
- Hanbury Brown–Twiss intensity interferometry measures star sizes from intensity correlations.
X: Coherence length of an LED with λ = 630 nm, Δλ = 20 nm?
> l_{c} = (630 × 10^{-9})^{2}/(20 × 10^{-9}) ≈ 20 μm
!: Two independent lasers can interfere briefly (beats), but their relative phase drifts; for stable fringes, use beams from one source.
Q: What is coherence length? | The path difference over which a wave stays correlated with itself, l_{c} ≈ λ^{2}/Δλ.
Q: Why can thin films show colours in white light? | Their path differences are shorter than white light's tiny coherence length.
M1: A narrower spectral linewidth gives: | Longer coherence length | Shorter coherence length | No change | Lower intensity | l_{c} ∝ 1/Δλ.
M2: Fringe visibility of 0 means: | No interference fringes | Perfect fringes | Maximum intensity | Monochromatic light | Incoherent.

## Diffraction
S: Diffraction is the spreading and bending of light around obstacles and through apertures, producing patterns of light and dark. It's why light can't be focused to an arbitrarily small spot and why fine detail has a limit.
H: Regimes
- **Fraunhofer** (far field): source and screen effectively at infinity (or with lenses); pattern is the aperture's Fourier transform.
- **Fresnel** (near field): curved wavefronts; patterns change with distance (Fresnel number F = a^{2}/(Lλ)).
H: Key results
E: a sin θ = mλ :: single slit minima
E: sin θ = 1.22λ/D :: first dark ring of a circular aperture (Airy disc)
- Smaller apertures give wider patterns.
H: Uses and limits
- Resolution of eyes, cameras, telescopes and microscopes.
- Spectrometers (gratings), holograms, X-ray crystallography.
- Lithography: chip features are limited by the diffraction of the light used, so the industry moved from 248 nm to 193 nm (with immersion) to 13.5 nm EUV.
X: The pupil (3 mm) viewing at 550 nm. Smallest resolvable angle?
> θ = 1.22 × 5.5 × 10^{-7}/0.003 = 2.2 × 10^{-4} rad ≈ 0.8′
> About the eye's actual acuity (~1′)
!: Diffraction happens at every edge and aperture; it's not a defect but a fundamental property of waves.
Q: What is the Airy disc? | The central bright spot of the diffraction pattern from a circular aperture.
Q: Why does chip lithography use ever-shorter wavelengths? | Diffraction limits feature size to roughly the wavelength.
M1: Halving an aperture's diameter makes the Airy disc: | Twice as wide | Half as wide | The same | Four times wider | ∝ λ/D.
M2: Fraunhofer diffraction applies when: | Source and screen are effectively at infinity | The screen is very close | Light is incoherent | The aperture is large | Far field.

## Single-slit and multiple-slit diffraction
S: A single slit produces a broad central maximum with weaker side fringes. Adding more slits keeps that envelope but sharpens the bright fringes inside it, until many slits give the narrow lines of a diffraction grating.
H: Single slit
E: I = I_{0}(sin β/β)^{2}, β = (πa sin θ)/λ
- Minima at a sin θ = mλ (m ≠ 0); central maximum twice as wide as the others.
- Side maxima ~4.7%, 1.6%… of the central intensity.
H: N slits
E: I = I_{0}(sin β/β)^{2}(sin Nγ/sin γ)^{2}, γ = (πd sin θ)/λ
- Principal maxima at d sin θ = nλ, intensity ∝ N^{2}.
- N − 1 minima and N − 2 subsidiary maxima between principal maxima.
- Width of principal maxima ∝ 1/N: more slits, sharper lines.
- **Missing orders**: when a principal maximum falls on a single-slit minimum (d/a an integer).
X: Double slit with d = 0.3 mm and a = 0.1 mm. Which interference orders are missing?
> d/a = 3: orders 3, 6, 9… coincide with single-slit minima
!: The single-slit envelope multiplies the interference pattern; the two effects aren't separate patterns side by side.
Q: Why does adding slits sharpen the fringes? | More slits must all be in phase for a maximum; small angle changes destroy the agreement, narrowing peaks.
Q: What causes missing orders? | A principal maximum coinciding with a single-slit diffraction minimum.
M1: The central maximum of a single slit is: | Twice as wide as the others | The same width | Half as wide | Absent | Between the ±1 minima.
M2: Principal maxima intensity for N slits scales as: | N^{2} | N | √N | 1/N | Amplitudes add.

## Diffraction gratings
S: A diffraction grating has thousands of closely spaced slits or grooves. It produces very sharp, bright maxima at angles depending on wavelength, so it's the heart of most spectrometers.
H: The grating equation
E: d sin θ = nλ
E: d = 1/(lines per metre)
E: R = λ/Δλ = nN :: resolving power
- Higher orders spread colours more; maximum order n_{max} < d/λ.
- Reflection gratings, blazed to send most light into one order.
H: Uses
- Spectrometers in chemistry, astronomy and environmental monitoring.
- Separating wavelengths in fibre communications (WDM demultiplexers).
- Distributed Bragg reflectors in lasers.
- Natural gratings: CDs, DVDs, peacock feathers, butterfly wings.
H: Astronomical spectroscopy
P: High-resolution gratings (R ~ 100 000) measure Doppler shifts of stellar lines to ~1 m s^{-1} (ESPRESSO), detecting Earth-mass planets, and reveal stars' compositions, temperatures and magnetic fields.
X: A grating with 600 lines per mm: angle of the first-order sodium line (589 nm)? Can it resolve the sodium doublet (589.0, 589.6 nm) with 2 cm illuminated?
> d = 1.67 μm; sin θ = 0.353 ⇒ θ = 20.7°
> N = 12 000; R = 12 000 in first order; needed: 589/0.6 ≈ 1000 ✓
!: Gratings send red farther than violet (opposite to prisms) and produce several overlapping orders that can confuse spectra.
Q: State the grating equation. | d sin θ = nλ.
Q: What is a grating's resolving power? | R = λ/Δλ = nN, order times number of illuminated lines.
M1: A grating with 500 lines per mm can show orders up to (λ = 500 nm): | 3 | 4 | 2 | 10 | d/λ = 4, so n < 4.
M2: CD rainbow colours come from: | Diffraction from closely spaced tracks | Thin-film interference | Dispersion | Fluorescence | A natural reflection grating.

## Michelson interferometer
S: A Michelson interferometer splits a beam, sends the halves along two arms, and recombines them. Tiny changes in arm length shift the fringes, measuring distances to a fraction of a wavelength.
H: Operation
E: Δ = 2(L_{1} − L_{2}); bright when Δ = mλ
- Moving one mirror by λ/2 shifts one fringe.
- Counting fringes measures displacement or wavelength.
H: Uses
- **Michelson–Morley** (1887): no detectable ether wind; paved the way for relativity.
- **Fourier transform spectroscopy** (FTIR): scan the mirror, Fourier-transform the interferogram to get the spectrum.
- **Gravitational-wave detectors**: LIGO's 4 km arms with Fabry–Pérot cavities detect changes of 10^{-18} m.
- Defining the metre historically, testing optical flatness, measuring refractive index of gases.
- **Optical coherence tomography (OCT)**: low-coherence interferometry images the retina in 3D.
X: Moving a mirror changes the pattern by 2000 fringes for λ = 632.8 nm. Mirror movement?
> d = 2000 × λ/2 = 0.633 mm
!: Each fringe corresponds to a mirror movement of λ/2, not λ, because light travels the arm twice.
Q: How much must a Michelson mirror move to shift one fringe? | λ/2.
Q: What did the Michelson–Morley experiment find? | No evidence for motion through an ether.
M1: FTIR spectrometers are based on: | Michelson interferometers | Prisms | Gratings | Fabry–Pérot only | Interferogram → spectrum.
M2: OCT imaging of the retina uses: | Low-coherence interferometry | X-rays | Ultrasound | MRI | Coherence gating.

## Fabry–Pérot interferometer
S: A Fabry–Pérot interferometer is two parallel, highly reflective surfaces. Light bounces between them many times, and only wavelengths that fit a whole number of half-wavelengths are transmitted, giving extremely sharp resonances.
H: Transmission
E: 2nd cos θ = mλ :: resonance condition
E: FSR = c/(2nd) :: free spectral range
E: F = π√R/(1 − R) :: finesse (R = mirror reflectivity)
E: Δf = FSR/F :: linewidth
- High reflectivity gives very narrow peaks (finesse > 10^{5} with supermirrors).
H: Uses
- High-resolution spectroscopy (resolving fine structure, Zeeman splitting).
- Laser cavities and frequency stabilisation (reference cavities for optical clocks).
- Optical filters for telecoms (dense WDM).
- LIGO's arm cavities multiply effective arm length ~300 times.
- Etalons select single modes in lasers.
X: A Fabry–Pérot with d = 5 mm in air and mirrors of R = 0.95. FSR and linewidth?
> FSR = 3 × 10^{8}/0.01 = 30 GHz
> F = π√0.95/0.05 ≈ 61; Δf ≈ 0.49 GHz
!: High finesse requires both high reflectivity and very flat, parallel surfaces; imperfect surfaces limit the achievable finesse.
Q: What is the free spectral range? | The frequency spacing between successive transmission peaks, c/(2nd).
Q: What does finesse measure? | The ratio of free spectral range to peak width; set by mirror reflectivity.
M1: Increasing mirror reflectivity in a Fabry–Pérot makes peaks: | Narrower | Wider | Disappear | Shift in frequency | Higher finesse.
M2: LIGO uses Fabry–Pérot cavities in its arms to: | Increase the effective arm length | Filter colours | Polarise light | Reduce laser power | Many round trips.

## Polarisation
S: Polarisation describes the orientation of light's electric field oscillation. Natural light is unpolarised, but reflection, scattering, dichroic filters and birefringent crystals can polarise it, and many technologies depend on controlling it.
H: Producing polarised light
- **Dichroism**: Polaroid sheets absorb one field direction.
- **Reflection**: fully polarised at Brewster's angle.
- **Scattering**: skylight 90° from the Sun is strongly polarised.
- **Birefringence**: calcite and wave plates separate or alter polarisation.
H: Laws
E: I = I_{0} cos^{2}θ :: Malus
E: I = I_{0}/2 :: unpolarised through an ideal polariser
H: Applications
- Sunglasses cut horizontally polarised glare.
- LCDs: liquid crystal twists polarisation between crossed polarisers.
- Photoelastic stress analysis of transparent models.
- Polarimetry measures sugar concentration and probes cosmic magnetic fields.
- Navigation: bees and Vikings (sunstones) used sky polarisation.
X: A polariser and analyser at 30°. Unpolarised light of 100 W m^{-2}. Transmitted?
> After the polariser: 50 W m^{-2}
> After the analyser: 50 cos^{2}30° = 37.5 W m^{-2}
!: A polariser doesn't "rotate" light into its axis; it removes the perpendicular component.
Q: How does an LCD use polarisation? | Liquid crystals rotate light's polarisation between crossed polarisers; voltage controls how much passes.
Q: Why does skylight show polarisation? | Rayleigh scattering polarises light, most strongly at 90° from the Sun.
M1: Polarised sunglasses block: | Horizontally polarised glare | All light | Vertical polarisation | UV only | Reflected glare is horizontal.
M2: Photoelasticity reveals: | Stress patterns in transparent materials | Temperature | Magnetic fields | Composition | Stress-induced birefringence.

## Brewster's angle
S: At Brewster's angle, light polarised in the plane of incidence (p) isn't reflected at all, so reflected light is perfectly polarised. The reflected and refracted rays are then at right angles.
H: Condition
E: tan θ_{B} = n_{2}/n_{1}
E: θ_{B} + θ_{t} = 90°
- Air–water: 53°; air–glass (1.5): 56°.
H: Why it happens
P: The reflected wave is radiated by dipoles in the second medium oscillating along the refracted field. At Brewster's angle the p-polarised dipoles point exactly along the would-be reflected direction, and dipoles don't radiate along their axis: no p-reflection.
H: Uses
- **Brewster windows** on gas laser tubes: zero reflection loss for one polarisation, so the laser emits polarised light.
- Measuring refractive index from the angle of zero p-reflection.
- Photographers' polarising filters remove reflections from water and glass.
- Brewster angle microscopy images monolayers on water.
X: Brewster's angle for light hitting diamond (n = 2.42) from air?
> θ_{B} = tan^{-1} 2.42 = 67.5°
!: Only p-polarised light has zero reflection at Brewster's angle; s-polarised light still reflects.
Q: State Brewster's law. | tan θ_{B} = n_{2}/n_{1}.
Q: Why do gas lasers with Brewster windows emit polarised light? | The windows have no loss for p-polarisation, so it dominates lasing.
M1: At Brewster's angle the reflected and refracted rays are: | Perpendicular | Parallel | At 45° | Opposite | θ_{B} + θ_{t} = 90°.
M2: Brewster's angle for water (n = 1.33) is about: | 53° | 37° | 49° | 45° | tan^{-1} 1.33.

## Birefringence
S: Birefringent crystals have two refractive indices depending on the polarisation of light. A ray entering them splits in two, and the different speeds for the two polarisations let engineers build wave plates and polarisers.
H: Description
- Uniaxial crystals (calcite, quartz): ordinary ray (n_{o}) and extraordinary ray (n_{e} depends on direction).
- Calcite: n_{o} = 1.658, n_{e} = 1.486; very strong birefringence; double images through a crystal.
- Optic axis: light travelling along it sees no birefringence.
E: Δφ = 2π(n_{e} − n_{o})d/λ :: retardation
H: Devices
- **Quarter-wave plate** (Δφ = π/2): linear ↔ circular.
- **Half-wave plate** (Δφ = π): rotates linear polarisation by 2θ.
- **Polarising prisms** (Glan–Thompson, Wollaston): separate polarisations cleanly.
- **Electro-optic modulators** (Pockels cells): voltage changes birefringence, switching light in nanoseconds.
H: Induced birefringence
P: Stress (photoelasticity), electric fields (Kerr, Pockels effects) and magnetic fields (Cotton–Mouton) induce birefringence. Liquid crystals are strongly birefringent fluids whose axis can be turned by voltage, the basis of LCDs.
X: Thickness of a quartz quarter-wave plate (n_{e} − n_{o} = 0.0092) at 633 nm?
> d = λ/(4Δn) = 633/(4 × 0.0092) nm = 17 μm (first order)
!: A wave plate works properly only at its design wavelength; at other wavelengths its retardation is wrong.
Q: What is birefringence? | Having different refractive indices for two polarisations of light.
Q: What does a half-wave plate do to linear polarisation? | Rotates it by twice the angle between the polarisation and the plate's axis.
M1: Calcite produces: | Double images | No refraction | Total reflection | Fluorescence | Two rays.
M2: A Pockels cell changes birefringence using: | An electric field | Heat | Pressure only | Magnetism only | Electro-optic effect.

## Optical activity
S: Optically active materials rotate the plane of polarised light as it passes through. Many biological molecules are chiral (handed), so optical activity identifies and measures them, from sugars to drugs.
H: Description
E: θ = [α]lc :: rotation = specific rotation × path length × concentration
- Dextrorotatory (+, clockwise looking towards the source) and laevorotatory (−).
- Origin: different refractive indices for left and right circular polarisation (circular birefringence) in chiral media.
H: Examples
- Quartz crystals (left- and right-handed forms).
- Sucrose (+66.5°), glucose (+52.7°), fructose (−92°) in solution.
- Amino acids in life are left-handed (L); sugars right-handed (D): biological homochirality, whose origin is still debated.
H: Uses
- Polarimeters measure sugar concentration in the food industry.
- Pharmaceuticals: enantiomers can have very different effects (thalidomide's tragic history); chiral analysis is required.
- Circular dichroism spectroscopy reveals protein secondary structure.
X: A 20 cm tube of sucrose solution rotates light by 13.3°. Concentration ([α] = 66.5° dm^{-1} (g/mL)^{-1})?
> c = 13.3/(66.5 × 2) = 0.10 g mL^{-1}
!: Faraday rotation (magnetic) and optical activity both rotate polarisation, but Faraday rotation doubles on reflection back through the medium while optical activity cancels.
Q: What causes optical activity? | Chiral molecules with different refractive indices for left- and right-circular polarisation.
Q: How is optical activity used in industry? | Polarimeters measure concentrations of sugars and check the chirality of drugs.
M1: Optical activity requires: | Chiral molecules or structures | Magnetic fields | Metals | Lasers | Handedness.
M2: Rotation angle is proportional to: | Path length and concentration | Only temperature | Wavelength only | Intensity | θ = [α]lc.

## Lasers
S: A laser produces intense, coherent, highly directional, nearly monochromatic light by stimulated emission in a gain medium inside an optical cavity. Since 1960 lasers have transformed communications, medicine, manufacturing and science.
H: How it works
- **Stimulated emission**: an incoming photon triggers an excited atom to emit an identical photon (same frequency, phase, direction, polarisation).
- **Population inversion**: more atoms in the upper level than the lower, achieved by pumping (electrical, optical, chemical); requires three- or four-level systems.
- **Optical cavity**: mirrors feed light back for repeated amplification; one partially transmits the output beam.
E: B_{12} = B_{21} (equal degeneracies); A_{21}/B_{21} = 8πhf^{3}/c^{3} :: Einstein coefficients
H: Types
- Gas (HeNe, CO_{2} at 10.6 μm), solid-state (Nd:YAG, Ti:sapphire), fibre (Er, Yb), semiconductor diodes (most common; phones, DVD, telecoms), dye, free-electron lasers (X-rays).
H: Properties and uses
- Coherence (holography, interferometry), directionality (LIDAR, rangefinding, the lunar laser ranging retroreflectors), brightness (cutting, welding), short pulses (surgery, micromachining).
X: How many photons per second from a 1 W, 1064 nm laser?
> E = 1240/1064 = 1.17 eV = 1.87 × 10^{-19} J
> N = 5.4 × 10^{18} s^{-1}
!: Laser light isn't necessarily very powerful; its distinctive features are coherence, directionality and spectral purity.
Q: What is population inversion? | A state with more atoms in a higher energy level than a lower one, needed for net stimulated emission.
Q: Why can't a two-level system lase? | Pumping can at best equalise the populations; inversion needs three or more levels.
M1: LASER stands for: | Light Amplification by Stimulated Emission of Radiation | Light Absorption by Spontaneous Emission | Linear Amplified Source | None | Acronym.
M2: Stimulated emission produces a photon that is: | Identical to the stimulating photon | Random in phase | Lower in frequency | Opposite in direction | Coherent copy.

## Optical cavities
S: An optical cavity (resonator) traps light between mirrors so it circulates many times. It determines a laser's frequencies (modes), beam shape and linewidth, and high-quality cavities enable ultra-precise measurements.
H: Modes
E: f_{q} = qc/(2nL) :: longitudinal modes, spacing c/(2nL)
- Transverse modes (TEM_{mn}): Gaussian TEM_{00} is the cleanest beam.
- Cavity stability: 0 ≤ (1 − L/R_{1})(1 − L/R_{2}) ≤ 1.
H: Quality
E: Q = 2πf × (energy stored)/(power lost) ; photon lifetime τ = Q/(2πf)
- Ultra-high-finesse cavities (finesse ~10^{5}–10^{6}) store light for microseconds to milliseconds.
- Whispering-gallery microresonators (microspheres, rings) reach Q > 10^{9}.
H: Applications
- Laser resonators; mode-locking for ultrashort pulses.
- Stabilising lasers to sub-Hz linewidths for optical clocks.
- Cavity QED: single atoms and photons interacting strongly.
- Cavity ring-down spectroscopy detects trace gases at parts per trillion.
X: A 30 cm HeNe laser cavity. Longitudinal mode spacing? How many modes fit in the 1.5 GHz gain bandwidth?
> Δf = 3 × 10^{8}/0.6 = 500 MHz
> About 3 modes
!: A laser's linewidth is much narrower than its gain medium's bandwidth because the cavity selects discrete modes.
Q: What sets the frequency spacing of longitudinal modes? | The cavity length: c/(2nL).
Q: What is cavity ring-down spectroscopy? | Measuring how fast light leaks from a high-finesse cavity; absorbing gases shorten the ring-down time.
M1: Doubling cavity length makes mode spacing: | Half | Double | Unchanged | Quadruple | ∝ 1/L.
M2: The cleanest laser beam profile is: | TEM_{00} Gaussian | TEM_{11} | Multimode | Top-hat | Lowest-order mode.

## Fibre optics
S: Optical fibres guide light along thin glass strands by total internal reflection. They carry almost all long-distance internet traffic, and also illuminate, sense and image in medicine and industry.
H: Structure and guiding
E: NA = √(n_{core}^{2} − n_{clad}^{2}) = sin θ_{acceptance}
- Single-mode: ~9 μm core, one mode, long distance.
- Multimode: 50–62.5 μm core; modal dispersion limits bandwidth–distance.
- Graded-index fibres reduce modal dispersion.
H: Losses and windows
- Rayleigh scattering (∝ 1/λ^{4}) and infrared absorption give a minimum ~0.2 dB km^{-1} at 1550 nm.
- Windows at 850, 1310 and 1550 nm.
- Erbium-doped fibre amplifiers boost signals optically.
H: Capacity
P: Wavelength-division multiplexing puts ~100 channels on one fibre, each carrying hundreds of Gb s^{-1}; a single fibre pair can carry > 100 Tb s^{-1}. Charles Kao (Nobel 2009) showed in 1966 that purifying glass could make long-distance fibre communication practical.
H: Other uses
- Endoscopes (bundles of fibres), fibre lasers (industrial cutting), fibre sensors (strain, temperature, distributed acoustic sensing for earthquakes), gyroscopes.
X: A 100 km link at 0.2 dB km^{-1}. Fraction of power received?
> Loss = 20 dB ⇒ 1% received
!: Bending a fibre too tightly lets light escape: TIR fails when the angle drops below critical.
Q: What limits the distance of multimode fibres? | Modal dispersion: different modes travel different path lengths.
Q: Why is 1550 nm used for long-haul fibre? | It's the lowest-loss window, where erbium amplifiers work.
M1: Optical fibres guide light by: | Total internal reflection | Mirrors | Diffraction | Absorption | Core n > cladding n.
M2: A 30 dB loss means the power received is: | 0.1% | 1% | 3% | 30% | 10^{-3}.

## Nonlinear optics
S: At high intensities, a material's response to light is no longer proportional to the field. New frequencies appear and light can control light: the field of nonlinear optics, made possible by lasers.
H: The nonlinear polarisation
E: P = ε_{0}(χ^{(1)}E + χ^{(2)}E^{2} + χ^{(3)}E^{3} + …)
H: Second-order effects (χ^{(2)}, non-centrosymmetric crystals)
- Second-harmonic generation (SHG): 1064 nm → 532 nm green (green laser pointers).
- Sum- and difference-frequency generation; optical parametric oscillators (tunable sources).
- Pockels effect (electro-optic modulation).
- Phase matching (birefringence or periodic poling) is needed for efficient conversion.
H: Third-order effects (χ^{(3)}, all materials)
- Kerr effect: n = n_{0} + n_{2}I: self-focusing, self-phase modulation.
- Four-wave mixing; third-harmonic generation.
- Supercontinuum generation: a white-light "laser" from a fibre.
- Optical solitons in fibres.
H: Quantum uses
P: Spontaneous parametric down-conversion splits one photon into two entangled photons: the workhorse source for quantum optics experiments, including the Bell tests recognised by the 2022 Nobel Prize.
X: SHG from a 1550 nm telecom laser gives what wavelength?
> λ/2 = 775 nm
!: Nonlinear effects need high intensity and phase matching; ordinary light is far too weak to show them.
Q: What is second-harmonic generation? | Conversion of light at frequency ω into light at 2ω in a nonlinear crystal.
Q: Why is phase matching needed? | So that light generated along the crystal adds in phase instead of cancelling.
M1: Green laser pointers usually use: | Frequency doubling of infrared light | Green diodes only | Fluorescence | Filters | 1064 → 532 nm.
M2: Entangled photon pairs are commonly made by: | Spontaneous parametric down-conversion | Lasers directly | Fluorescent lamps | Mirrors | χ^{(2)} process.

## Ultrafast optics
S: Ultrafast optics creates and uses light pulses lasting femtoseconds to attoseconds. These pulses freeze the motion of molecules and electrons, cut materials with precision and reach extreme peak powers.
H: Making short pulses
- **Mode-locking**: many cavity modes locked in phase; pulses ~5–100 fs (Ti:sapphire, fibre lasers).
- Δt Δf ≳ 0.44 (Gaussian): a 10 fs pulse at 800 nm needs ~94 nm bandwidth.
- **Chirped pulse amplification** (Strickland and Mourou, Nobel 2018): stretch, amplify, compress; petawatt peak powers.
- **Attosecond pulses** (Agostini, Krausz, L'Huillier, Nobel 2023): high-harmonic generation in gases gives pulses ~50–100 as.
H: Applications
- Pump–probe spectroscopy: films of chemical reactions (femtochemistry, Zewail, Nobel 1999).
- Eye surgery (femtosecond LASIK), micromachining glass without heat damage.
- Frequency combs (Hall and Hänsch, Nobel 2005): rulers for light frequencies; optical clocks.
- Laser wakefield acceleration of electrons.
X: Peak power of a 1 mJ, 30 fs pulse?
> P = 10^{-3}/3 × 10^{-14} = 3.3 × 10^{10} W (33 GW)
!: Short pulses can't be monochromatic: the shorter the pulse, the broader its spectrum.
Q: What is mode-locking? | Fixing the phases of many laser cavity modes so they add into a train of ultrashort pulses.
Q: What is chirped pulse amplification? | Stretching a pulse in time, amplifying it, then compressing it, avoiding damage from high peak powers.
M1: Attosecond pulses are made by: | High-harmonic generation | Mode-locked diodes only | LEDs | Q-switching | Nobel 2023.
M2: A frequency comb is used to: | Measure optical frequencies precisely | Comb hair | Amplify radio | Heat samples | Optical ruler.

## Integrated photonics
S: Integrated photonics puts optical components (waveguides, modulators, detectors, lasers) on chips, as electronics did for circuits. It's transforming data centres, sensing and quantum computing.
H: Platforms
- **Silicon photonics**: uses CMOS fabrication; high index contrast (Si 3.48 vs SiO_{2} 1.44) allows tight bends; needs bonded or external lasers.
- **Indium phosphide**: integrates lasers and amplifiers.
- **Silicon nitride**: low loss, broad transparency; frequency combs and quantum photonics.
- **Lithium niobate (thin-film)**: fast electro-optic modulators.
H: Components
- Waveguides, splitters, directional couplers, Mach–Zehnder interferometers (switches and modulators), ring resonators (filters, sensors), grating couplers, germanium photodetectors, arrayed waveguide gratings (WDM).
H: Applications
P: Data-centre transceivers move terabits per second between servers with lower power than copper. Photonic chips are being developed for LIDAR, biosensing, optical neural-network accelerators, and photonic quantum computers that process single photons.
X: Why can silicon waveguides bend in a few micrometres while fibres need centimetres?
> Silicon–oxide index contrast (~2) is huge vs fibre's (~0.01)
> Light stays confined by TIR even in tight bends
!: Silicon doesn't emit light efficiently (indirect band gap), so silicon photonics usually integrates lasers made of III–V semiconductors.
Q: Why is silicon photonics attractive? | It uses existing CMOS fabrication for large-scale, low-cost optical chips.
Q: What is a Mach–Zehnder modulator? | An interferometer where a phase shift in one arm switches light between output states.
M1: Silicon photonics usually operates at: | 1.3–1.55 μm | 400 nm | 10 μm | 1 mm | Silicon transparent in near-IR.
M2: Ring resonators on chips act as: | Wavelength-selective filters | Lasers only | Detectors | Polarisers | Resonant at particular wavelengths.

## Adaptive optics
S: Adaptive optics corrects in real time for distortions in light, mainly from atmospheric turbulence, using a deformable mirror controlled by a wavefront sensor. It lets ground-based telescopes see nearly as sharply as space telescopes.
H: The problem
- Turbulent air has cells of varying refractive index (Fried parameter r_{0} ~ 10–20 cm in visible light).
- Without correction, resolution is limited to ~λ/r_{0} (~0.5–1″) however large the telescope.
H: The system
- **Wavefront sensor** (Shack–Hartmann lenslet array) measures distortions.
- **Deformable mirror** with hundreds to thousands of actuators corrects them, updating ~1000 times per second.
- **Guide stars**: a bright natural star, or an artificial one made by a laser exciting sodium atoms at ~90 km.
H: Beyond astronomy
P: Adaptive optics images individual photoreceptor cells in the living eye, sharpens microscopy deep in tissue, corrects laser beams for fusion and free-space optical communication, and was originally developed for military imaging. Andrea Ghez's and Reinhard Genzel's adaptive-optics tracking of stars around Sgr A* proved a supermassive black hole sits at our galaxy's centre (Nobel 2020).
X: Diffraction limit of an 8 m telescope at 2.2 μm vs typical seeing (0.6″)?
> θ = 1.22 × 2.2 × 10^{-6}/8 = 3.4 × 10^{-7} rad ≈ 0.07″
> Adaptive optics can improve resolution ~9 times
!: Adaptive optics works best at longer (infrared) wavelengths; visible correction needs many more actuators and faster updates.
Q: What limits ground-based telescope resolution without adaptive optics? | Atmospheric turbulence (seeing).
Q: What is a laser guide star? | An artificial reference star made by a laser exciting atoms high in the atmosphere.
M1: The device that corrects the wavefront is: | A deformable mirror | A prism | A grating | A filter | Hundreds of actuators.
M2: Adaptive optics helped prove: | A supermassive black hole at the Milky Way's centre | Dark energy | Exoplanet atmospheres only | Cosmic inflation | Stellar orbits around Sgr A*.
`;
