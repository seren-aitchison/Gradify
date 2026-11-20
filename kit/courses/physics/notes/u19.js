// Unit 19: Optics. Format: kit/course/notes.js. Content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, level, key terms, summaries, evidence status, typed and dated sources, and questions at three levels.
export default `
## Geometrical optics
S: Geometrical (ray) optics treats light as rays travelling in straight lines and bending at interfaces. It works when everything is much larger than the wavelength, and explains mirrors, lenses, cameras, eyes and telescopes.
O: State the principles of ray optics, including Fermat's principle
O: Explain when ray optics fails and wave optics is needed
O: Use ray reversibility and apparent depth to explain everyday observations
PRE: Visible light
LV: GCSE and A level · Foundation
H: Principles
- Light travels in straight lines in a uniform medium.
- Law of reflection: angle of incidence = angle of reflection, measured from the normal.
- Snell's law at refracting surfaces.
- Rays are reversible.
- Fermat's principle: light takes a path of stationary (usually least) optical path length ∫n dl, which means least time.
H: Limits
- Fails when apertures or obstacles approach the wavelength: diffraction and interference need wave optics.
- Can't explain thin-film colours, resolution limits or polarisation.
H: Ray tracing
P: Lens and camera designers trace thousands of rays through optical systems to find focus, aberrations and image quality. The paraxial approximation (small angles, sin θ ≈ tan θ ≈ θ) gives the simple lens formulas; exact tracing reveals the aberrations.
X: Why does a pencil look bent in water?
> Light from the submerged part refracts away from the normal as it leaves the water
> The eye traces rays back in straight lines, placing the image higher: apparent depth ≈ real depth/n near the normal
K: Ray optics is the short-wavelength limit of wave optics: rays are the directions in which wavefronts travel.
!: Rays are a model; light isn't really made of infinitely thin lines, and the model fails at small scales.
P: **Investigate with the lab.** Trace rays through the lens and mirror and check they travel in straight lines between surfaces.
IX: optics
T: Ray | A line showing the direction in which light energy travels, perpendicular to the wavefronts
T: Optical path length | The geometric path length multiplied by the refractive index, ∫n dl
SUM: Rays travel straight in uniform media, reflect with equal angles and refract by Snell's law.
SUM: Fermat's principle unifies these: light follows a path of stationary optical path length.
SUM: Ray optics fails at scales comparable to the wavelength.
EV: established | Ray optics accurately describes light when all apertures are much larger than the wavelength
SRC: OpenStax, University Physics Volume 3, section 1.1 "The Propagation of Light" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-1-the-propagation-of-light
SRC: OpenStax, College Physics 2e, section 25.1 "The Ray Aspect of Light" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/25-1-the-ray-aspect-of-light
Q: State Fermat's principle. | Light travels between two points along the path of stationary optical path length.
Q: When does geometrical optics fail? | When apertures or features are comparable to the wavelength, so diffraction matters.
M1@3: A pool 2 m deep (n = 1.33) appears about: | 1.5 m deep | 2.7 m deep | 2.0 m deep | 1.0 m deep | Apparent depth = real depth/n = 2/1.33 ≈ 1.5 m when viewed from directly above.
M2@1: The paraxial approximation assumes: | Small angles to the axis | Large apertures compared with f | Short wavelengths only | That no refraction occurs | Paraxial rays stay close to and nearly parallel to the axis, so sin θ ≈ θ and the lens formulas become linear.
M2@1: What does geometrical optics assume about light? | It travels in straight-line rays | It always diffracts noticeably | It is made only of particles | It has no finite speed | Ray optics works when objects are much larger than the wavelength, so light can be treated as straight rays.
M3@2: Light passes through a 0.5 mm pinhole and then a 2 μm pinhole. Which statement is right? | Ray optics describes the first well but fails for the second, where diffraction spreads the light widely | Ray optics describes both equally well | Ray optics fails for both, since all pinholes diffract strongly | The smaller pinhole gives a sharper geometrical shadow | Diffraction spread is about λ/a: tiny for 0.5 mm but large for 2 μm (a few wavelengths), where rays no longer describe the light.
TF1@1: Because rays are reversible, if you can see someone's eyes in a mirror, they can see yours. | true | Reversing a ray path through a reflection gives another valid path, so the light can travel either way along it.
SA2@1,3: Use Fermat's principle to explain why light travelling from air into water bends towards the normal. | Fermat's principle says light takes the path of least time. Light travels more slowly in water (v = c/n), so the quickest route between a point in air and a point in water is not the straight line: it is quicker to travel a little further in air and a shorter distance in water. The least-time path therefore bends at the surface, entering the water closer to the normal, and minimising the time gives exactly Snell's law n_{1} sin θ_{1} = n_{2} sin θ_{2}. | Least time (stationary optical path) ; Light slower in water ; Longer path in fast medium, shorter in slow medium ; Path bends towards normal in water ; Minimisation gives Snell's law

## Reflection and refraction
S: At a boundary, light partly reflects and partly refracts. Reflection follows equal angles; refraction follows Snell's law; the proportions depend on the refractive indices, the angle and the polarisation.
O: Distinguish specular from diffuse reflection and apply the law of reflection
O: Use n = c/v and Snell's law, and describe what happens to speed, wavelength and frequency
O: Estimate how much light is reflected at a boundary
PRE: Geometrical optics
LV: GCSE and A level · Foundation
H: Reflection
- Specular (smooth surfaces, mirror images) vs diffuse (rough surfaces scatter in all directions, letting us see objects).
- Angle of incidence = angle of reflection, both measured from the normal.
H: Refraction
E: n = c/v; n_{1} sin θ_{1} = n_{2} sin θ_{2}
E: apparent depth = real depth/n
- Light slows and bends towards the normal entering a medium of higher n.
- Frequency unchanged; wavelength shortens by a factor n.
H: How much reflects
- Fresnel equations; at normal incidence R = ((n_{1} − n_{2})/(n_{1} + n_{2}))^{2}: about 4% for air–glass.
- Towards grazing incidence reflection approaches 100% (a lake mirrors distant hills).
X: Light enters glass (n = 1.52) at 40°. What is the refraction angle?
> sin θ_{2} = sin 40°/1.52 = 0.643/1.52 = 0.423
> θ_{2} = 25°
K: At a boundary frequency stays fixed while speed and wavelength change by n; the fraction reflected grows with the index step and the angle.
!: We see most objects by diffuse reflection; a perfect mirror is itself almost invisible.
P: **Investigate with the lab.** Change the angle of incidence and compare the reflected and refracted rays.
IX: optics
T: Refractive index | n = c/v, the ratio of the speed of light in vacuum to its speed in the medium
T: Diffuse reflection | Reflection from a rough surface that scatters light in many directions, so no image forms
SUM: Reflection: equal angles from the normal; specular or diffuse.
SUM: Refraction: n_{1} sin θ_{1} = n_{2} sin θ_{2}; v and λ fall by n, f is unchanged.
SUM: About 4% reflects at normal incidence on glass, rising towards grazing incidence.
EV: established | Light at a boundary obeys the law of reflection and Snell's law of refraction
SRC: OpenStax, University Physics Volume 3, section 1.2 "The Law of Reflection" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-2-the-law-of-reflection
SRC: OpenStax, University Physics Volume 3, section 1.3 "Refraction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction
SRC: AQA, A-level Physics specification (7408), section 3.3.2.3 "Refraction at a plane surface" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the difference between specular and diffuse reflection? | Specular: smooth surface, ordered reflection forming images. Diffuse: rough surface scattering light in all directions.
Q: What happens to wavelength when light enters glass? | It shortens by a factor of n; frequency is unchanged.
M1@1: Reflection angle when incidence is 30°: | 30° | 60° | 15° | 90° | Both angles are measured from the normal and are equal; 60° would be the angle to the surface.
M2@3: Why does a still lake reflect strongly at low viewing angles? | Reflectance rises sharply towards grazing incidence | Still water behaves like a metal at low angles | Lakes have a reflective surface film | Refraction stops completely at low angles | The Fresnel equations show reflectance climbing towards 100% as the angle of incidence approaches 90°.
M2@2: When light enters glass from air at an angle, which way does it bend? | Towards the normal | Away from the normal | It doesn't bend | Along the surface | Light slows in glass (higher n), so by Snell's law the angle from the normal is smaller.
NUM2@2: Red light of wavelength 650 nm in air enters water (n = 1.33). What is its wavelength in the water, in nm? | 489 | 1% | nm | λ = λ_{0}/n = 650/1.33 = 489 nm; the frequency, and so the colour seen by the eye, is unchanged.
M3@3: Roughly what fraction of light is reflected at normal incidence from an air–diamond surface (n = 2.42)? | 17% | 4% | 42% | 1% | R = ((2.42 − 1)/(2.42 + 1))^{2} = (1.42/3.42)^{2} = 0.17; the large index step is one reason diamond looks bright.
SA2@2: Explain why light changes direction when it enters glass at an angle, and what happens to its speed, frequency and wavelength. | Light travels more slowly in glass (v = c/n). When a wavefront meets the surface at an angle, the part that enters first slows down while the rest is still moving at c, so the wavefront swings round and the direction of travel bends towards the normal. The frequency is set by the source and is unchanged across the boundary; since v = fλ, the wavelength falls by the same factor n as the speed. | Speed lower in glass, v = c/n ; Wavefront enters unevenly and swings round ; Bends towards normal ; Frequency unchanged ; Wavelength reduced by factor n

## Snell's law
S: Snell's law gives the angle of a refracted ray: the product of refractive index and the sine of the angle is the same on both sides of an interface. It follows from the change in wave speed, via Huygens' or Fermat's principle.
O: Use Snell's law to calculate angles of refraction
O: Explain Snell's law using Huygens' construction, Fermat's principle or phase matching
O: Describe how to measure refractive index with a glass block
PRE: Reflection and refraction
LV: A level · Application
H: The law
E: n_{1} sin θ_{1} = n_{2} sin θ_{2}
E: sin θ_{1}/sin θ_{2} = v_{1}/v_{2} = λ_{1}/λ_{2}
H: Derivations
- **Huygens**: wavelets travel more slowly in medium 2, so the wavefront tilts.
- **Fermat**: minimising travel time between two points across the interface gives Snell's law (like a lifeguard running then swimming).
- **Wave matching**: the tangential component of the wavevector must be continuous: k_{1} sin θ_{1} = k_{2} sin θ_{2}.
H: Measuring n
P: Trace rays through a glass block at several angles; plot sin i against sin r; the gradient is n. Or find the critical angle, or use a refractometer. Refractive index identifies gems and measures sugar concentration in fruit juice.
X: A graph of sin i against sin r has gradient 1.48. What is the block likely made of?
> n = 1.48, close to Perspex (acrylic, about 1.49)
> Crown glass would give about 1.52
K: n sin θ is conserved across a boundary; light bends towards the normal in the slower medium.
!: Use sines of angles, not the angles themselves; θ_{1}/θ_{2} ≠ n_{2}/n_{1} except at small angles.
P: **Investigate with the lab.** Measure the angles of incidence and refraction at three settings and check that sin i / sin r stays constant.
IX: optics
T: Snell's law | n_{1} sin θ_{1} = n_{2} sin θ_{2} for the angles of incidence and refraction measured from the normal
T: Angle of refraction | The angle between the refracted ray and the normal to the surface
SUM: n_{1} sin θ_{1} = n_{2} sin θ_{2}.
SUM: It follows from the change in wave speed (Huygens, Fermat or phase matching).
SUM: The gradient of sin i against sin r for a block in air is its refractive index.
EV: established | The ratio of the sines of incidence and refraction angles is constant for a given pair of media
SRC: OpenStax, University Physics Volume 3, section 1.3 "Refraction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-3-refraction
SRC: OpenStax, College Physics 2e, section 25.3 "The Law of Refraction" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/25-3-the-law-of-refraction
SRC: AQA, A-level Physics specification (7408), section 3.3.2.3 "Refraction at a plane surface" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Snell's law. | n_{1} sin θ_{1} = n_{2} sin θ_{2}.
Q: How does Fermat's principle explain Snell's law? | The refracted path minimises the travel time when speeds differ in the two media.
M1@1: Light goes from water (1.33) to glass (1.5) at 30°. Refraction angle: | 26° | 30° | 34° | 45° | sin θ_{2} = 1.33 × 0.5/1.5 = 0.443, so θ_{2} ≈ 26°: smaller, because glass has the higher index.
M2@3: A graph of sin i against sin r for light entering a block has gradient: | n of the block | 1/n of the block | The critical angle | Zero | sin i = n sin r for light entering from air, so the gradient of sin i against sin r is n.
M2@1: Light enters glass (n = 1.5) at 30°. What is sin r? | About 0.33 | About 0.75 | Exactly 0.50 | About 1.50 | sin r = sin 30°/1.5 = 0.5/1.5 ≈ 0.33, so r ≈ 19°.
NUM2@1: Light passes from glass (n = 1.50) into water (n = 1.33), meeting the surface at 35° to the normal. What is the angle of refraction, in degrees? | 40.3 | 2% | ° | sin θ_{2} = 1.50 × sin 35°/1.33 = 0.647, so θ_{2} = 40.3°: it bends away from the normal into the lower-index water.
M3@1,2: A ray crosses a stack of parallel layers with indices 1.0, 1.4, 1.7 and back to 1.0. Compared with its entry angle, its final angle in air is: | The same, since n sin θ is conserved through every layer | Larger, because it has passed through dense layers | Smaller, because it has slowed down | It depends on the layer thicknesses | n sin θ is the same at every parallel interface, so returning to n = 1.0 gives the original angle (the ray is only shifted sideways).
SA2@2,3: Describe how to measure the refractive index of a glass block with a ray box and protractor, and how to get the best value from the data. | Draw round the block on paper, shine a narrow ray at a measured angle of incidence i, and mark the emerging ray. Remove the block, join entry and exit points to find the refracted ray inside and measure r from the normal. Repeat for at least five angles between about 10° and 70°. Plot sin i against sin r: the gradient of the best-fit straight line through the origin is n, which averages out reading errors; use a thin ray and sharp pencil to reduce uncertainty. | Trace block and rays, measure i and r from the normal ; Range of angles ; Plot sin i against sin r ; Gradient equals n ; Error reduction: narrow ray, repeat, best-fit line

## Total internal reflection
S: When light travelling in a denser medium meets a less dense one at more than the critical angle, none refracts out: it is totally reflected. This traps light in optical fibres and makes diamonds sparkle.
O: Calculate the critical angle for a boundary
O: State the conditions for total internal reflection and apply them to devices
O: Describe the evanescent wave and frustrated total internal reflection
PRE: Snell's law
LV: A level · Application
H: Condition
E: sin θ_{c} = n_{2}/n_{1} (n_{1} > n_{2})
- Glass–air ~42°; water–air ~49°; diamond–air 24.4°.
- Reflection is 100% (better than any metal mirror), apart from absorption.
H: Applications
- Optical fibres and endoscopes.
- Prisms in binoculars and periscopes (light meets the 45° face at 45° > 42°).
- Diamonds: cut so light reflects internally many times before escaping, maximising sparkle.
- Rain sensors on windscreens and fingerprint scanners: contact by water or skin ridges frustrates TIR.
H: Evanescent wave
P: Even during TIR, a field penetrates about a wavelength into the outer medium, decaying exponentially. Bring a second dense medium within that distance and light tunnels across (frustrated TIR), an optical analogue of quantum tunnelling, used in beam splitters and TIRF microscopy.
X: What is the critical angle for light in a fibre core (n = 1.48) meeting cladding (n = 1.46)?
> sin θ_{c} = 1.46/1.48 = 0.986 ⇒ θ_{c} = 80.6°
> Rays must strike the core boundary at more than 80.6° to the normal, nearly parallel to the axis
K: TIR needs both conditions: light going from higher to lower n, and an angle of incidence greater than θ_{c}.
!: TIR only happens going from higher to lower index; light entering a denser medium always refracts in.
P: **Investigate with the lab.** With light leaving glass, increase the angle until you find the critical angle and get total internal reflection.
IX: optics
T: Critical angle | The angle of incidence in the denser medium for which the refracted ray grazes the surface (90°): sin θ_{c} = n_{2}/n_{1}
T: Evanescent wave | The field that penetrates a short distance beyond a totally reflecting surface, decaying exponentially
SUM: sin θ_{c} = n_{2}/n_{1}; beyond θ_{c} all the light is reflected.
SUM: TIR guides light in fibres and turns it in prisms.
SUM: An evanescent field leaks across a very thin gap, allowing frustrated TIR.
EV: established | Light incident above the critical angle on a lower-index medium is totally reflected
SRC: OpenStax, University Physics Volume 3, section 1.4 "Total Internal Reflection" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-4-total-internal-reflection
SRC: OpenStax, College Physics 2e, section 25.4 "Total Internal Reflection" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/25-4-total-internal-reflection
SRC: AQA, A-level Physics specification (7408), section 3.3.2.3 "Refraction at a plane surface" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the critical angle? | The angle of incidence (in the denser medium) beyond which there's no refracted ray.
Q: Why do diamonds sparkle? | Their small critical angle traps light by total internal reflection until it exits through the top facets, and dispersion splits colours.
M1@2: Total internal reflection requires light to travel: | From higher to lower n above θ_{c} | From lower to higher n | At normal incidence | In a vacuum | Both are needed: a step down in index and an angle of incidence larger than the critical angle.
M2@2: Binoculars use prisms rather than mirrors because: | TIR gives near-100% reflection without coatings | Prisms magnify the image | Mirrors absorb most of the light | Prisms are far cheaper to make | Total internal reflection loses almost nothing, whereas a metal coating absorbs a few per cent and can tarnish.
M2@1: What is the critical angle for glass with n = 1.5? | About 42° | About 30° | About 60° | 90° | sin c = 1/n = 1/1.5 = 0.67, so c ≈ 42° (glass to air).
NUM2@1: What is the critical angle for a water–air boundary (n = 1.33), in degrees? | 48.8 | 1% | ° | sin θ_{c} = 1/1.33 = 0.752, so θ_{c} = 48.8°; a diver looking up sees the whole sky squeezed into a cone of this half-angle.
M3@2,3: A glass prism (n = 1.5) used for TIR in a periscope is dipped in water (n = 1.33). What happens at its 45° face? | Light leaks out, because the critical angle rises to about 62° | It still totally reflects, as 45° exceeds 42° | All light is absorbed by the water | The critical angle falls, making TIR easier | sin θ_{c} = 1.33/1.5 = 0.887, so θ_{c} ≈ 62°; 45° is now below it and light refracts into the water.
SA2@1,2: Explain what happens to a ray inside a glass block as its angle of incidence at the glass–air surface is increased from 0° to 60°, given n = 1.5. | At small angles most light refracts out into the air, bent away from the normal, with a weak partial reflection. As the angle increases the refracted ray bends further from the normal and the reflected ray gets brighter. At the critical angle, sin θ_{c} = 1/1.5, θ_{c} ≈ 42°, the refracted ray travels along the surface. Above 42° there is no refracted ray: all the light is totally internally reflected, obeying the law of reflection. | Refraction away from normal at small angles, weak reflection ; Refracted ray bends further, reflection strengthens ; Critical angle 42° from sin θ_{c} = 1/n ; Refracted ray grazes surface at θ_{c} ; Above θ_{c}, total internal reflection

## Mirrors and image formation
S: Mirrors form images by reflection. Plane mirrors give upright, same-size virtual images; curved mirrors can magnify, focus light and form real images, which is why they are used in telescopes, headlamps and solar furnaces.
O: Describe the image formed by a plane mirror
O: Use f = R/2 and the mirror equation to locate images in curved mirrors
O: Explain why parabolic mirrors are used instead of spherical ones
PRE: Reflection and refraction
LV: A level · Application
H: Plane mirrors
- Image as far behind the mirror as the object is in front; laterally inverted; virtual.
- You need a mirror only half your height to see your whole body.
H: Spherical mirrors
E: f = R/2
E: 1/f = 1/u + 1/v; m = −v/u :: real-is-positive convention; negative m means inverted
- **Concave** (converging): real inverted images when the object is beyond f; virtual magnified images inside f (shaving mirrors).
- **Convex** (diverging): always virtual, upright and smaller; wide field of view (car wing mirrors, shop security).
H: Parabolic mirrors
P: Spherical mirrors don't focus all parallel rays to one point (spherical aberration). Parabolic mirrors do, so they are used in reflecting telescopes, satellite dishes, solar concentrators and headlamps (a source at the focus makes a parallel beam).
X: An object is 30 cm from a concave mirror with f = 10 cm. Find the image position and magnification.
> 1/v = 1/10 − 1/30 = 2/30 ⇒ v = 15 cm (real)
> m = −15/30 = −0.5: inverted, half size
K: A concave mirror behaves like a converging lens: real images beyond f, virtual magnified images inside f.
!: Sign conventions differ between textbooks (real-is-positive vs Cartesian); be consistent.
P: **Investigate with the lab.** Switch to a curved mirror and move the object to find a real image and a virtual one.
IX: optics
T: Focal point | The point where rays parallel to the axis meet (or appear to diverge from) after reflection, at distance f = R/2
T: Virtual image | An image from which rays only appear to come; it cannot be formed on a screen
SUM: Plane mirrors make virtual, upright, same-size images as far behind as the object is in front.
SUM: Curved mirrors obey 1/f = 1/u + 1/v with f = R/2.
SUM: Parabolic mirrors focus parallel light without spherical aberration.
EV: established | Images in mirrors follow from the law of reflection, summarised by the mirror equation
SRC: OpenStax, University Physics Volume 3, section 2.1 "Images Formed by Plane Mirrors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-1-images-formed-by-plane-mirrors
SRC: OpenStax, University Physics Volume 3, section 2.2 "Spherical Mirrors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-2-spherical-mirrors
Q: Where is the image in a plane mirror? | As far behind the mirror as the object is in front.
Q: Why are convex mirrors used on cars? | They give a wide field of view with upright images.
M1@2: A concave mirror's focal length is: | Half its radius of curvature | Equal to its radius | Twice its radius | Zero | For paraxial rays f = R/2: the focus is midway between the mirror and its centre of curvature.
M2@2: An object inside the focal point of a concave mirror gives: | A virtual, upright, magnified image | A real, inverted, magnified image | No image of any kind | A smaller, real, inverted image | Inside f the reflected rays diverge and appear to come from behind the mirror, giving a magnified upright image, as in a shaving mirror.
M2@2: When does a concave mirror form a virtual image? | When the object is closer than the focal point | When the object is beyond the centre of curvature | When the object is at infinity | Never | Inside the focal length, reflected rays diverge and appear to come from behind the mirror.
NUM2@2: An object is 6.0 cm from a concave mirror of focal length 12 cm. How far behind the mirror is the virtual image, in cm? | 12 | 2% | cm | 1/v = 1/12 − 1/6 = −1/12, so v = −12 cm: a virtual image 12 cm behind the mirror, magnified ×2 and upright.
M3@1,3: A person stands 2 m in front of a plane mirror and walks 0.5 m towards it. How far are they now from their image? | 3 m | 1.5 m | 4 m | 2 m | The image is as far behind as the person is in front: 1.5 m + 1.5 m = 3 m.
SA2@2,3: Explain why a concave spherical mirror gives a blurred focus for a wide beam, and why satellite dishes and headlamps use paraboloids. | A spherical mirror focuses paraxial rays at R/2, but rays striking near the rim reflect more steeply and cross the axis closer to the mirror, so a wide parallel beam has no single focus: spherical aberration. A paraboloid is the surface for which every ray parallel to the axis reflects through the same focal point, because all paths from a plane wavefront to the focus are equal in length. A dish therefore collects all incoming signal at one receiver; by reversibility, a lamp at the focus produces a parallel beam. | Paraxial rays focus at R/2 ; Marginal rays focus closer: spherical aberration ; Paraboloid sends all axial rays through one focus ; Equal path lengths ; Reversibility: source at focus gives parallel beam

## Thin lenses
S: A thin lens refracts light at two curved surfaces to bring rays to a focus (converging) or spread them out (diverging). Lenses form images in eyes, cameras, projectors and glasses.
O: Distinguish converging and diverging lenses and use lens power P = 1/f
O: Use the lensmaker's equation
O: Construct ray diagrams with the three principal rays
PRE: Snell's law
LV: Year 1 · Application
H: Types
- **Converging (convex)**: thicker in the middle; positive focal length; forms real images of distant objects.
- **Diverging (concave)**: thinner in the middle; negative focal length; virtual images of real objects.
- Power P = 1/f (dioptres, D = m^{-1}): a +2 D lens has f = 50 cm.
H: Lensmaker's equation
E: 1/f = (n − 1)(1/R_{1} − 1/R_{2}) :: lens in air; R positive for a surface convex towards the incoming light
- Focal length depends on curvature and refractive index, and so on wavelength: chromatic aberration.
- A lens's power falls in water (smaller index step): why vision blurs underwater.
H: Ray rules
- Parallel ray → through the focal point.
- Ray through the centre → undeviated.
- Ray through the focal point → emerges parallel.
X: A biconvex lens (n = 1.5) has radii 20 cm and −20 cm. What is its focal length?
> 1/f = 0.5(1/20 + 1/20) = 0.05 cm^{-1}
> f = 20 cm
K: A lens's power depends on its surface curvatures and on the index difference with its surroundings.
!: Thin lenses combine by adding powers: P = P_{1} + P_{2} when in contact.
P: **Investigate with the lab.** Make a real, inverted image the same size as the object with a converging lens. Then try a diverging lens.
IX: optics
T: Lens power | P = 1/f with f in metres, measured in dioptres (D)
T: Principal focus | The point to which rays parallel to the axis converge (or from which they appear to diverge) after the lens
SUM: Converging lenses have positive f; diverging lenses negative f.
SUM: 1/f = (n − 1)(1/R_{1} − 1/R_{2}); powers add for lenses in contact.
SUM: Three principal rays locate any thin-lens image.
EV: established | Thin-lens focal length follows from refraction at its two surfaces (lensmaker's equation)
SRC: OpenStax, University Physics Volume 3, section 2.4 "Thin Lenses" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-4-thin-lenses
SRC: OpenStax, College Physics 2e, section 25.6 "Image Formation by Lenses" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/25-6-image-formation-by-lenses
Q: What is lens power? | P = 1/f, in dioptres (m^{-1}).
Q: Why does vision blur underwater? | The cornea's refractive power drops because water's index is close to the eye's.
M1@1: A −4 D lens has focal length: | −25 cm | 4 m | −4 cm | 25 cm | f = 1/P = 1/(−4 D) = −0.25 m: a diverging lens of focal length 25 cm.
M2@1: Two lenses of +3 D and +2 D in contact have power: | +5 D | +6 D | +1 D | +1.2 D | For thin lenses in contact the powers add: 3 + 2 = +5 D (f = 20 cm).
M2@3: Where must the object be for a converging lens to form a real image the same size? | At twice the focal length | At the focal point | Inside the focal length | At infinity | At u = 2f, the image forms at v = 2f with magnification 1.
NUM2@2: A plano-convex lens (n = 1.50) has one flat face and one face of radius 15 cm. What is its focal length, in cm? | 30 | 2% | cm | 1/f = (1.50 − 1)(1/15 − 0) = 0.0333 cm^{-1}, so f = 30 cm; a flat face has infinite radius.
M3@2: A glass lens (n = 1.5) with f = 20 cm in air is placed in water (n = 1.33). Its focal length becomes about: | 78 cm | 20 cm | 15 cm | 27 cm | The factor (n − 1) becomes (1.5/1.33 − 1) = 0.128 instead of 0.5, so f grows by 0.5/0.128 ≈ 3.9: about 78 cm.
SA2@3: Describe the three principal rays used to locate the image of an object placed between f and 2f from a converging lens, and the image they show. | From the top of the object draw: a ray parallel to the axis, which refracts through the far focal point; a ray through the optical centre, which passes straight on; and a ray through the near focal point, which emerges parallel to the axis. The three rays meet beyond 2f on the far side. The image there is real (it can be caught on a screen), inverted and magnified, as in a projector. | Parallel ray through far focus ; Central ray undeviated ; Ray through near focus emerges parallel ; Rays meet beyond 2f ; Image real, inverted, magnified

## Lens equations
S: The thin lens equation relates object distance, image distance and focal length; magnification gives the image size. With them you can predict where, and how large, any lens forms an image.
O: Use 1/f = 1/u + 1/v and m = v/u to locate images
O: Predict the nature of the image for each object position
O: Analyse two-lens combinations
PRE: Thin lenses
LV: A level · Application
H: Equations
E: 1/f = 1/u + 1/v :: real-is-positive convention (virtual image distances negative)
E: |m| = v/u = h_{i}/h_{o}
- Cartesian convention: 1/v − 1/u = 1/f with signed distances.
H: Converging lens cases
- u > 2f: real, inverted, smaller (camera, eye).
- u = 2f: real, inverted, same size.
- f < u < 2f: real, inverted, larger (projector).
- u = f: image at infinity.
- u < f: virtual, upright, larger (magnifying glass).
H: Combinations
- The image of the first lens is the object for the second.
- Total magnification = product of the magnifications.
X: A projector lens (f = 10 cm) forms a sharp image on a screen 5 m away. Where is the slide, and what is the magnification?
> 1/u = 1/10 − 1/500 = 0.098 cm^{-1} ⇒ u = 10.2 cm
> m = 500/10.2 = 49
K: The closer the object comes to f, the further and larger the image; inside f the image becomes virtual.
!: A virtual image can't be projected on a screen, but it can be seen or photographed through the lens.
P: **Investigate with the lab.** Set the focal length and object distance, predict the image distance with the lens equation, then check.
IX: optics
T: Linear magnification | The ratio of image height to object height, equal to v/u for a thin lens
T: Real image | An image where rays actually converge, which can be formed on a screen
SUM: 1/f = 1/u + 1/v, magnification v/u.
SUM: Converging lens: real images for u > f, virtual for u < f.
SUM: In combinations, each image is the next lens's object; magnifications multiply.
EV: established | The thin lens equation predicts image positions for paraxial rays
SRC: OpenStax, University Physics Volume 3, section 2.4 "Thin Lenses" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-4-thin-lenses
SRC: OpenStax, College Physics 2e, section 25.6 "Image Formation by Lenses" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/25-6-image-formation-by-lenses
SRC: AQA, A-level Physics specification (7408), section 3.10.1.2 "Defects of vision and their correction using lenses" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State the thin lens equation. | 1/f = 1/u + 1/v.
Q: What image does a magnifying glass form? | Virtual, upright and magnified, with the object inside the focal length.
M1@2: An object at 2f from a converging lens gives an image at: | 2f, same size | f, smaller | Infinity | Between f and 2f, smaller | 1/v = 1/f − 1/(2f) = 1/(2f), so v = 2f and the magnification is 1, inverted.
M2@1: A lens (f = 5 cm) with object 4 cm away forms an image at: | 20 cm, virtual | 20 cm, real | 2.2 cm, real | 9 cm, virtual | 1/v = 1/5 − 1/4 = −1/20, so v = −20 cm: a virtual image on the same side as the object.
M2@1: A lens has f = 10 cm and the object is 30 cm away. Where is the image? | 15 cm from the lens | 20 cm from the lens | 30 cm from the lens | 7.5 cm from the lens | 1/v = 1/10 − 1/30 = 2/30, so v = 15 cm, a real inverted image.
NUM2@1: A camera lens of focal length 50 mm focuses on a person 2.0 m away. How far is the sensor from the lens, in mm? | 51.3 | 1% | mm | 1/v = 1/50 − 1/2000 = 0.0195 mm^{-1}, so v = 51.3 mm: focusing moves the lens slightly away from the sensor for near objects.
M3@3: Two converging lenses, f_{1} = 10 cm and f_{2} = 5.0 cm, are 40 cm apart. An object is 15 cm in front of lens 1. Where is the final image? | 10 cm beyond lens 2 | 30 cm beyond lens 2 | 5.0 cm beyond lens 2 | At infinity beyond lens 2 | Lens 1: 1/v = 1/10 − 1/15 gives v = 30 cm, so its image is 10 cm in front of lens 2; then 1/v = 1/5 − 1/10 gives v = 10 cm beyond lens 2.
SA3@1,3: An object 4.0 cm tall is placed 15 cm from a converging lens of focal length 10 cm. Find the image distance, its height and nature, and say what happens as the object is moved slowly towards the lens. | 1/v = 1/10 − 1/15 = 1/30, so v = 30 cm. Magnification v/u = 30/15 = 2, so the image is 8.0 cm tall, real and inverted, on the far side. As the object approaches the focal point the image moves further away and grows; at u = f it goes to infinity; for u < f the image becomes virtual, upright and magnified on the same side as the object. | v = 30 cm ; m = 2, height 8.0 cm ; Real and inverted ; Image recedes and enlarges as u approaches f ; At u = f image at infinity; inside f virtual and upright

## Optical instruments
S: Optical instruments combine lenses and mirrors to see things too small, too far or too faint for the eye. The eye itself is the starting point: glasses, magnifiers, cameras and projectors all extend it.
O: Describe how the eye focuses and how defects of vision are corrected
O: Calculate the power of a correcting lens and the angular magnification of a magnifier
O: Explain how f-number controls a camera's exposure and depth of field
PRE: Lens equations
LV: A level · Application
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
X: A myopic person's far point is 2 m. What lens power do they need?
> The lens must form an image of a distant object at 2 m: f = −2 m
> P = 1/f = −0.5 D
K: Correcting lenses move the image of an object to where the eye can focus: diverging for short sight, converging for long sight.
!: Magnification isn't the same as resolution: magnifying a blurred image only shows a bigger blur.
P: **Investigate with the lab.** Move the object inside the focal length to make a magnifying glass: the image is virtual and upright.
IX: optics
T: Accommodation | The eye's change of lens shape, controlled by the ciliary muscles, to focus on objects at different distances
T: f-number | N = f/D, the focal length divided by the aperture diameter of a lens
SUM: The cornea does most of the focusing; the lens adjusts it.
SUM: Myopia needs a diverging lens, hypermetropia a converging lens.
SUM: Magnifier M = 25 cm/f; camera exposure ∝ 1/N^{2}.
EV: established | The eye forms images by refraction at the cornea and lens, and defects are corrected with lenses
SRC: OpenStax, University Physics Volume 3, section 2.5 "The Eye" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-5-the-eye
SRC: OpenStax, University Physics Volume 3, section 2.6 "The Camera" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-6-the-camera
SRC: AQA, A-level Physics specification (7408), section 3.10.1.2 "Defects of vision and their correction using lenses" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How does the eye focus on near objects? | Ciliary muscles let the lens become more curved (accommodation), increasing its power.
Q: What corrects short sight? | A diverging lens.
M1@3: A camera at f/8 compared with f/4 lets in: | 1/4 the light | 1/2 the light | Twice the light | The same light | Light gathered ∝ D^{2} ∝ 1/N^{2}: doubling N from 4 to 8 lets in a quarter as much.
M2@2: A magnifying glass of f = 5 cm gives angular magnification (image at infinity) of: | 5 | 25 | 0.2 | 125 | M = 25 cm/f = 25/5 = 5 for an image at infinity (relaxed eye).
M2@2: How does a simple magnifying glass work? | The object is inside the focal length, giving a virtual, magnified, upright image | The object is beyond 2f, giving a real image | It uses total internal reflection | It uses a diverging lens | Inside f, a converging lens forms a magnified virtual image.
NUM2@2: A long-sighted person's near point is 75 cm. What power of lens lets them read at 25 cm, in D? | 2.67 | 2% | D | The lens must image an object at 25 cm at 75 cm (virtual): 1/f = 1/0.25 − 1/0.75 = 2.67 D, a converging lens.
M3@1: A person can focus clearly only between 15 cm and 60 cm. Which defect do they have? | Myopia, since the far point is not at infinity | Hypermetropia, since the near point is too close | Presbyopia only | Normal vision | A far point of 60 cm instead of infinity is short sight; distant objects need a diverging lens of −1.7 D.
SA2@1,2: Explain what causes myopia and how a lens corrects it, including a calculation for a far point of 1.5 m. | In myopia the eye is too powerful for its length (or too long), so parallel light from distant objects focuses in front of the retina; only objects nearer than the far point are sharp. A diverging lens spreads the incoming rays so that distant objects appear to come from the far point. It must form a virtual image of an object at infinity at 1.5 m, so f = −1.5 m and P = −0.67 D. | Eye too strong or too long ; Distant light focuses in front of retina ; Diverging lens used ; Image of distant object placed at far point ; f = −1.5 m, P ≈ −0.67 D

## Microscopes and telescopes
S: Microscopes magnify small, near objects; telescopes magnify the angular size of distant ones and collect their faint light. Both use an objective to form an image and an eyepiece (or sensor) to view it.
O: Calculate the magnification of a compound microscope and an astronomical telescope
O: Use the Rayleigh criterion to find the resolving limit of a telescope
O: Compare refracting and reflecting telescopes
PRE: Optical instruments
LV: A level · Application
H: Compound microscope
E: M ≈ (L/f_{o})(25 cm/f_{e}) :: L = tube length
- The objective (short f) makes a magnified real image; the eyepiece magnifies it further.
- Resolution limit d ≈ 0.61λ/NA (~200 nm for visible light); oil immersion raises the numerical aperture NA to ~1.4.
- Super-resolution microscopy (STED, PALM, STORM; Nobel 2014) beats this using fluorescence tricks.
H: Telescopes
E: M = f_{o}/f_{e} :: angular magnification in normal adjustment
E: θ_{min} ≈ 1.22λ/D :: resolution (Rayleigh criterion)
- **Refractors**: lenses; chromatic aberration; practical limit about 1 m aperture.
- **Reflectors**: mirrors; no chromatic aberration; segmented primaries up to 39 m (ELT).
- Light-gathering power ∝ D^{2}: the main reason for large telescopes.
- Space telescopes avoid atmospheric blurring and absorption (Hubble, JWST).
X: A telescope has f_{o} = 1.2 m and f_{e} = 25 mm. What is its magnification, and its resolution if D = 0.2 m at 550 nm?
> M = f_{o}/f_{e} = 1.2/0.025 = 48
> θ = 1.22 × 5.5 × 10^{-7}/0.2 = 3.4 × 10^{-6} rad ≈ 0.7″
K: Aperture sets both the light gathered (∝ D^{2}) and the finest detail (∝ λ/D); magnification only enlarges what the aperture delivers.
!: Telescope magnification is less important than aperture; a high-magnification small telescope just shows a dim, blurry view.
T: Normal adjustment | Telescope setting with the lenses separated by f_{o} + f_{e}, so the final image is at infinity
T: Numerical aperture | NA = n sin θ for the half-angle θ of the cone of light a microscope objective accepts
SUM: Microscope M ≈ (L/f_{o})(25 cm/f_{e}); telescope M = f_{o}/f_{e}.
SUM: Resolution is limited by diffraction: 1.22λ/D for telescopes, ~0.61λ/NA for microscopes.
SUM: Large telescopes are reflectors: mirrors can be supported from behind and have no chromatic aberration.
EV: established | Optical resolution is limited by diffraction at the aperture
SRC: OpenStax, University Physics Volume 3, section 2.8 "Microscopes and Telescopes" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-8-microscopes-and-telescopes
SRC: OpenStax, College Physics 2e, section 26.5 "Telescopes" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/26-5-telescopes
SRC: AQA, A-level Physics specification (7408), section 3.9.1.1 "Astronomical telescope consisting of two converging lenses" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why are large telescopes reflectors? | Large mirrors can be supported from behind and have no chromatic aberration.
Q: What limits an optical microscope's resolution? | Diffraction: about 0.61λ/NA.
M1@3: A telescope's light-gathering power depends on: | Aperture area | Magnification | The eyepiece used | Tube length | Collected light ∝ area ∝ D^{2}; magnification spreads the same light over a bigger image.
M2@2: Oil immersion improves microscope resolution by: | Increasing numerical aperture | Shortening λ in air | Brightening the lamp | Reducing magnification | NA = n sin θ: oil (n ≈ 1.5) between lens and slide raises NA from below 1 to about 1.4, so d = 0.61λ/NA falls.
NUM2@2: What is the smallest angle (in μrad) resolvable by a 10 m telescope at 500 nm, ignoring the atmosphere? | 0.061 | 3% | μrad | θ = 1.22λ/D = 1.22 × 5.0 × 10^{-7}/10 = 6.1 × 10^{-8} rad = 0.061 μrad, about 0.013″.
M3@1,3: An astronomical telescope in normal adjustment has M = 40 and is 41 cm long. What are the focal lengths? | f_{o} = 40 cm, f_{e} = 1 cm | f_{o} = 41 cm, f_{e} = 1 cm | f_{o} = 20 cm, f_{e} = 0.5 cm | f_{o} = 1 cm, f_{e} = 40 cm | In normal adjustment f_{o} + f_{e} = 41 cm and f_{o}/f_{e} = 40, so f_{e} = 1 cm and f_{o} = 40 cm.
SA2@2,3: Explain why astronomers build ever larger telescopes, and why the largest are reflectors. | A larger aperture D collects more light (∝ D^{2}), so fainter objects can be detected in a given time, and it improves the diffraction limit θ ≈ 1.22λ/D, so finer detail can be resolved. Large lenses are impractical: they can only be supported at their edges and sag, they absorb light, and they suffer chromatic aberration. Mirrors reflect all wavelengths equally, can be supported across their backs, and can be made in segments, so apertures of tens of metres are possible. | Light gathered ∝ D^{2} ; Resolution 1.22λ/D improves with D ; Lenses sag, absorb and have chromatic aberration ; Mirrors have no chromatic aberration and can be supported from behind ; Segmented mirrors allow very large apertures

## Aberrations
S: Aberrations are departures from perfect imaging in real lenses and mirrors. They blur, distort and colour images, and much of optical design is about correcting them.
O: Describe the main monochromatic (Seidel) aberrations
O: Explain chromatic aberration and how an achromatic doublet corrects it
O: Explain the trade-off between aberrations and diffraction when stopping down a lens
PRE: Thin lenses
LV: Year 1 · Application
H: Monochromatic (Seidel) aberrations
- **Spherical**: edge rays focus closer than central ones; reduced by aspheric surfaces or stopping down.
- **Coma**: off-axis points look like comets.
- **Astigmatism**: different foci for rays in perpendicular planes.
- **Field curvature**: the sharp image lies on a curved surface.
- **Distortion**: barrel or pincushion (straight lines curve).
H: Chromatic aberration
- Dispersion makes different colours focus at different distances (axial) and with different magnifications (lateral).
- Achromatic doublet: a converging crown-glass lens and a weaker diverging flint-glass lens bring two colours to the same focus; apochromats bring three.
- Mirrors have none.
H: Correction
P: Camera lenses use many elements of different glasses, aspheric surfaces and low-dispersion materials to cancel aberrations; phones also correct distortion and colour fringing in software. Hubble's primary mirror had spherical aberration (an error of about 2.2 μm at its edge), corrected in 1993 by optics with equal and opposite aberration.
X: Why does stopping a lens down (higher f-number) sharpen images, up to a point?
> Blocking edge rays reduces spherical and other aberrations
> But a smaller aperture increases diffraction blur (∝ N), so very small apertures soften images again
K: Aberrations come from geometry (monochromatic) or from dispersion (chromatic); designs cancel them with several elements of different glasses.
!: Aberrations and diffraction trade off; the sharpest aperture is usually two or three stops below maximum.
T: Spherical aberration | Failure of a spherical surface to focus rays at different distances from the axis to the same point
T: Achromatic doublet | A pair of lenses of different glasses (crown and flint) cemented so that two wavelengths share a focus
SUM: Seidel aberrations: spherical, coma, astigmatism, field curvature and distortion.
SUM: Chromatic aberration comes from dispersion; doublets and mirrors avoid it.
SUM: Stopping down reduces aberrations but increases diffraction.
EV: established | Real lenses and mirrors show aberrations that can be reduced but not removed entirely by design
SRC: OpenStax, College Physics 2e, section 26.6 "Aberrations" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/26-6-aberrations
SRC: OpenStax, University Physics Volume 3, section 2.4 "Thin Lenses" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/2-4-thin-lenses
Q: What causes chromatic aberration? | Dispersion: refractive index varies with wavelength, so colours focus differently.
Q: How was Hubble's spherical aberration fixed? | Corrective optics (COSTAR and new instruments) with equal and opposite aberration.
M1@2: Which optical element has no chromatic aberration? | Mirror | Single lens | Prism | Achromat | The law of reflection doesn't depend on wavelength, so a mirror focuses all colours at the same point; an achromat only corrects two.
M2@1: Barrel distortion makes straight lines: | Curve outward | Curve inward | Disappear | Become colour-fringed | Magnification falls away from the centre, so straight lines near the edges bulge outwards like a barrel.
M2@2: In an achromatic doublet, the flint-glass element is: | A weaker diverging lens with higher dispersion | A stronger converging lens with lower dispersion | Identical to the crown element | A flat window that only protects the crown lens | Flint's higher dispersion lets a weak diverging lens cancel the crown lens's colour spread while leaving net converging power.
TF1@1: Stopping a lens down to its smallest aperture always gives the sharpest image. | false | At very small apertures diffraction blur (∝ f-number) exceeds the aberrations removed, so sharpness falls again.
M3@3: A photographer finds a lens sharpest at f/5.6, softer at f/1.8 and also softer at f/22. Why? | Aberrations dominate wide open; diffraction dominates when stopped right down | Depth of field causes all three effects | The sensor is less sensitive at f/22 | Only chromatic aberration varies with aperture | Wide apertures admit rays far from the axis (aberrations); tiny apertures increase diffraction spread; the best compromise lies between.
SA2@1,2: Describe spherical and chromatic aberration in a single converging lens and one way to reduce each. | Spherical aberration: rays striking the lens far from the axis are bent too strongly and focus closer than paraxial rays, so a point becomes a blur. It is reduced by stopping down, by aspheric surfaces, or by sharing the bending between several elements. Chromatic aberration: the refractive index is larger for blue than red light, so blue focuses closer and images have coloured fringes. It is reduced by an achromatic doublet (crown and flint glass), by low-dispersion glass, or by using mirrors instead. | Spherical: marginal rays focus closer ; Reduce: stop down, aspheric or multiple elements ; Chromatic: n depends on wavelength; blue focuses closer ; Reduce: achromatic doublet or low-dispersion glass ; Mirrors free of chromatic aberration

## Dispersion and prisms
S: A prism refracts different colours by different amounts because glass's refractive index depends on wavelength. Newton used prisms to show white light is a mixture of colours, founding spectroscopy.
O: Explain dispersion in terms of the variation of refractive index with wavelength
O: Use the minimum-deviation formula to find a prism's refractive index
O: Explain how rainbows form
PRE: Snell's law
LV: Year 1 · Application
H: Prism deviation
E: n = sin((A + δ_{min})/2)/sin(A/2) :: minimum deviation for apex angle A
- Thin prism: δ ≈ (n − 1)A.
- In glass n is larger for violet than red (normal dispersion), so violet deviates most.
H: Rainbows
- Sunlight refracts entering a raindrop, reflects inside, refracts out.
- Primary bow at ~42° from the anti-solar point (red outside); secondary at ~51° (two reflections; colours reversed).
- Alexander's dark band lies between them.
H: Spectroscopy
P: Newton's prism experiments (1666) showed that glass doesn't add colours but separates them from white light, and he recombined them. Fraunhofer (1814) saw dark lines in sunlight; Kirchhoff and Bunsen identified them as absorption by elements, letting astronomers find what stars are made of. Gratings have largely replaced prisms in spectrometers.
X: A 60° prism gives minimum deviation 39°. What is its refractive index?
> n = sin((60° + 39°)/2)/sin 30° = sin 49.5°/0.5
> n = 0.760/0.5 = 1.52
K: Dispersion is the dependence of n on wavelength: in glass, shorter wavelengths are slowed and bent more.
!: Prisms separate colours by dispersion; gratings by diffraction. They spread colours in opposite orders (prisms bend violet most; gratings bend red most).
T: Dispersion | The variation of refractive index (and so wave speed) with wavelength
T: Minimum deviation | The smallest angle through which a prism turns a ray, reached when the ray passes symmetrically through it
SUM: n depends on wavelength, so a prism spreads white light into a spectrum, violet bent most.
SUM: Minimum deviation gives n = sin((A + δ_{min})/2)/sin(A/2).
SUM: Rainbows are dispersion plus internal reflection in raindrops.
EV: established | White light is a mixture of wavelengths that glass refracts by different amounts
SRC: OpenStax, University Physics Volume 3, section 1.5 "Dispersion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-5-dispersion
SRC: OpenStax, College Physics 2e, section 25.5 "Dispersion: The Rainbow and Prisms" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/25-5-dispersion-the-rainbow-and-prisms
Q: How did Newton show white light is a mixture? | Separated it with a prism and recombined the colours into white with a second prism.
Q: Why is the secondary rainbow's colour order reversed? | An extra internal reflection inverts the order.
M1@1: Which colour does a glass prism deviate most? | Violet | Red | Green | Yellow | Glass has its highest refractive index for the shortest visible wavelengths, so violet is bent most.
M2@3: The primary rainbow appears at about: | 42° from the anti-solar point | 90° from the Sun | 10° from the anti-solar point | 180° from the anti-solar point | Light leaving raindrops after one internal reflection bunches near minimum deviation, 138°, which is 42° from the anti-solar point.
NUM2@2: A thin prism of apex angle 6.0° has n = 1.52. Through what angle does it deviate light, in degrees? | 3.1 | 3% | ° | For a thin prism δ ≈ (n − 1)A = 0.52 × 6.0° = 3.1°.
M3@2: An equilateral prism has n = 1.65 for violet and 1.62 for red. Which ray has the larger minimum deviation, and by about how much? | Violet, by about 3° | Red, by about 3° | Violet, by about 0.03° | They are equal, as the apex angle is the same | δ_{min} = 2 sin^{-1}(n sin 30°) − 60° gives 51.2° for violet and 48.2° for red: violet deviates more because its n is larger.
SA2@1,3: Explain how a rainbow forms and why red appears on the outside of the primary bow. | Sunlight enters spherical raindrops and refracts, reflects once off the back of the drop and refracts again on leaving. Because the refractive index of water is slightly larger for violet than for red, each colour leaves with its strongest concentration at a slightly different angle to the incoming sunlight: about 42° for red and 40° for violet, measured from the anti-solar point. Drops higher in the sky send red light to the observer and lower drops send violet, so red forms the outer edge of the bow. | Refraction in, one internal reflection, refraction out ; Dispersion: n larger for violet ; Light concentrated near minimum deviation ; Red at ~42°, violet ~40° from anti-solar point ; Red from higher drops, so red outermost

## Physical optics
S: Physical (wave) optics treats light as a wave to explain what rays can't: interference, diffraction, coherence and polarisation. It sets the ultimate limits of optical instruments.
O: Use optical path difference to find the phase difference between waves
O: Identify situations where wave optics is needed
O: Describe the evidence that established the wave theory of light
PRE: Superposition
LV: Year 1 · Foundation
H: Key ideas
- Superposition of coherent waves gives interference patterns.
- The Huygens–Fresnel principle explains diffraction: every point on a wavefront acts as a source of secondary wavelets.
- Optical path difference Δ = Σn_{i}l_{i} differences; phase difference δ = 2πΔ/λ.
- Fraunhofer (far-field) diffraction pattern = Fourier transform of the aperture.
H: When it matters
- Small apertures (pinholes, slits) and fine structures (gratings, cells, CD tracks).
- Thin films (soap bubbles, oil slicks, coatings).
- The resolution limit of every imaging system.
- Coherent sources (lasers) make wave effects obvious; speckle appears on any rough surface lit by a laser.
H: Historical victory
P: Young's double slit (1801) and Fresnel's diffraction theory (1818) overturned Newton's corpuscular theory. The Poisson spot, a bright point at the centre of a disc's shadow, was derived from Fresnel's theory by Poisson as an apparent absurdity; Arago observed it, convincing the sceptics.
X: Why does a laser beam on a wall look grainy (speckle)?
> The rough surface scatters coherent light with random path differences
> Random interference produces bright and dark grains
K: Wave effects appear whenever path differences of a wavelength or so matter: tiny apertures, thin films and coherent light.
!: Wave optics doesn't replace ray optics; ray optics is the short-wavelength limit of wave optics.
T: Optical path difference | The difference between the optical path lengths (n × distance) of two waves to the same point
T: Huygens–Fresnel principle | Each point on a wavefront is a source of secondary wavelets whose superposition forms the later wavefront
SUM: Phase difference = 2π × optical path difference/λ.
SUM: Wave optics explains interference, diffraction, coherence and polarisation.
SUM: Young, Fresnel and the Poisson spot established the wave theory in the early 1800s.
EV: established | Interference and diffraction of light show that it behaves as a wave
SRC: OpenStax, University Physics Volume 3, section 1.6 "Huygens’s Principle" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/1-6-huygenss-principle
SRC: OpenStax, University Physics Volume 3, section 3.1 "Young's Double-Slit Interference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference
SRC: AQA, A-level Physics specification (7408), section 3.3.2.1 "Interference" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is optical path length? | The physical path length times refractive index, Σnl.
Q: What is speckle? | A granular interference pattern from coherent light scattered by a rough surface.
M1@2: Fraunhofer diffraction patterns are: | Fourier transforms of the aperture | Sharp images of the aperture | Random patterns | Always circular | In the far field the amplitude pattern is the Fourier transform of the aperture's transmission function.
M2@2: Which phenomenon requires wave optics? | Thin-film colours | Sharp shadows | Mirror images | Snell's law | Thin-film colours come from interference between reflections from the two surfaces; the others are explained by rays.
NUM2@1: Light of wavelength 600 nm travels through 3.0 μm of glass (n = 1.5) instead of the same length of air. What phase difference results, in units of π? | 5 | 2% | π rad | Extra optical path = (1.5 − 1) × 3.0 μm = 1.5 μm = 2.5λ, so δ = 2π × 2.5 = 5π.
M3@3: Why was the bright Poisson spot such strong evidence for the wave theory? | A particle theory predicts complete darkness at the centre of a disc's shadow | It showed light travels faster in water | It proved light is a transverse wave | It was seen only with a laser | Particles travelling in straight lines cannot reach the shadow's centre; waves diffracting round the rim arrive there in phase, making it bright.
SA2@1,2: Explain, using optical path difference, why a thin film of oil on water shows colours in white light. | Light reflects from both the top and bottom surfaces of the film. The ray from the bottom travels an extra optical path of about 2nt (n film index, t thickness) and there may be an extra half-wavelength shift at reflection. For a given thickness this path difference gives constructive interference for some wavelengths and destructive for others, so those colours are reinforced or removed. Because the film's thickness varies, different colours are seen in different places. | Reflections from top and bottom surfaces ; Extra optical path about 2nt ; Possible half-wave phase change on reflection ; Constructive for some wavelengths, destructive for others ; Varying thickness gives coloured bands

## Young's double-slit experiment
S: Young's double-slit experiment sends light through two narrow slits and shows bright and dark fringes on a screen: interference of the waves from the two slits. It showed light is a wave and, done one particle at a time, revealed quantum superposition.
O: Use d sin θ = nλ and w = λD/d to analyse double-slit fringes
O: State the conditions needed to see two-source interference
O: Describe the single-particle version and what it shows
PRE: Interference
LV: A level · Application
H: Results
E: d sin θ = nλ :: bright fringes (d = slit separation)
E: w = λD/d :: fringe spacing for small angles (D = slit–screen distance)
E: I = 4I_{0} cos^{2}(πd sin θ/λ) :: intensity, ignoring the single-slit envelope
- Wider slit spacing gives closer fringes; longer wavelength gives wider fringes.
- The pattern is modulated by each slit's diffraction envelope.
H: Requirements
- Coherent sources (constant phase difference): originally sunlight through a single pinhole; now lasers.
- Narrow slits, close together (sub-millimetre).
- Laser safety: never look into the beam or its reflections.
H: Quantum version
P: Fire photons, electrons, neutrons, atoms or even molecules of ~2000 atoms one at a time: each lands at a single point, but the pattern builds up into fringes. Each particle's wavefunction passes through both slits; measuring which slit it went through destroys the pattern.
X: Laser light (633 nm) passes through slits 0.25 mm apart onto a screen 2.0 m away. What is the fringe spacing?
> w = λD/d = 633 × 10^{-9} × 2.0/(2.5 × 10^{-4})
> w = 5.1 mm
K: Bright fringes appear where the path difference from the two slits is a whole number of wavelengths: spacing λD/d.
!: The fringes come from path difference to each point on the screen, not from light "bouncing" between the slits.
P: **Investigate with the lab.** In double-slit mode, halve the slit separation and see the fringes spread twice as far apart. Then move the screen further away.
IX: interference
T: Coherent sources | Sources with the same frequency and a constant phase difference
T: Fringe spacing | The distance between neighbouring bright (or dark) fringes, w = λD/d for small angles
SUM: Bright fringes where d sin θ = nλ; spacing w = λD/d.
SUM: The sources must be coherent; lasers make it easy.
SUM: Single particles build up the same fringes, showing quantum superposition.
EV: established | Light passing through two slits produces interference fringes with spacing λD/d
SRC: OpenStax, University Physics Volume 3, section 3.1 "Young's Double-Slit Interference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference
SRC: OpenStax, College Physics 2e, section 27.3 "Young’s Double Slit Experiment" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/27-3-youngs-double-slit-experiment
SRC: AQA, A-level Physics specification (7408), section 3.3.2.1 "Interference" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What's the fringe spacing in Young's experiment? | x = λD/d.
Q: What happens to the pattern if you detect which slit each electron passes through? | The interference fringes disappear.
M1@1: Using blue light instead of red makes fringes: | Closer together | Farther apart | Disappear | Brighter only | w = λD/d is proportional to wavelength, and blue light has the shorter wavelength.
M2@3: Young's experiment with single electrons shows: | Interference builds up from single detections | Electrons behave as classical particles | No pattern forms with single electrons | Only two bands appear, behind the slits | Each electron arrives at one point, but the distribution of many arrivals shows fringes: wave–particle duality.
M2@1: In Young's experiment, what happens to the fringe spacing if the slit separation is halved? | It doubles | It halves | It stays the same | It quadruples | Fringe spacing w = λD/d (AQA writes s for d), so halving d doubles w.
NUM2@1: Fringes 3.0 mm apart are seen on a screen 1.5 m from slits 0.30 mm apart. What is the wavelength, in nm? | 600 | 2% | nm | λ = wd/D = 3.0 × 10^{-3} × 0.30 × 10^{-3}/1.5 = 6.0 × 10^{-7} m = 600 nm.
M3@1,2: White light is used in a double-slit experiment. What is seen? | A white central fringe with coloured fringes either side, fading out | Identical sharp fringes in white | No fringes, because white light is not coherent | A single continuous spectrum | All wavelengths have zero path difference at the centre (white); elsewhere maxima of different colours fall at different places, so the fringes are coloured and wash out.
SA2@1,2: Describe how to use a laser and a double slit to measure the wavelength of laser light, with the precautions you would take. | Shine the laser through a double slit of known separation d onto a screen a measured distance D away (several metres, with a tape measure). Measure across as many fringes as possible with a ruler and divide by the number of spacings to find w. Calculate λ = wd/D. Precautions: never look into the beam or reflections, remove reflective jewellery and keep the beam below eye level; use a large D and many fringes to reduce percentage uncertainty. | Laser through double slit of known d onto screen at distance D ; Measure across several fringes to find w ; λ = wd/D ; Large D and many fringes reduce uncertainty ; Laser safety precautions

## Interference and coherence
S: Interference needs coherence: a stable phase relationship between waves. Temporal coherence describes how long a wave stays in phase with itself; spatial coherence describes how phase is correlated across a beam.
O: Calculate coherence length from spectral width
O: Explain spatial coherence and how it limits interference from extended sources
O: Calculate and interpret fringe visibility
PRE: Young's double-slit experiment
LV: Year 2 · Application
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
X: What is the coherence length of an LED with λ = 630 nm and Δλ = 20 nm?
> l_{c} = (630 × 10^{-9})^{2}/(20 × 10^{-9})
> l_{c} ≈ 20 μm
K: The narrower the spectrum, the longer the coherence length; the smaller the source's angular size, the wider the coherence width.
!: Two independent lasers can interfere briefly (beats), but their relative phase drifts; for stable fringes, use beams from one source.
P: **Investigate with the lab.** Compare the fringes for different slit separations and screen distances, and note that clear fringes need a steady phase relationship between the slits.
IX: interference
T: Coherence length | The path difference over which a wave stays correlated with itself, l_{c} ≈ λ^{2}/Δλ
T: Fringe visibility | V = (I_{max} − I_{min})/(I_{max} + I_{min}), from 0 (no fringes) to 1 (perfect contrast)
SUM: Temporal coherence: l_{c} ≈ λ^{2}/Δλ.
SUM: Spatial coherence: d_{c} ≈ λL/s for a source of size s.
SUM: Visibility measures fringe contrast and so the degree of coherence.
EV: established | Interference fringes are visible only when path differences are within the coherence length
SRC: OpenStax, University Physics Volume 3, section 3.1 "Young's Double-Slit Interference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference
SRC: AQA, A-level Physics specification (7408), section 3.3.2.1 "Interference" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is coherence length? | The path difference over which a wave stays correlated with itself, l_{c} ≈ λ^{2}/Δλ.
Q: Why can thin films show colours in white light? | Their path differences are shorter than white light's tiny coherence length.
M1@1: A narrower spectral linewidth gives: | Longer coherence length | Shorter coherence length | No change in coherence | Lower intensity only | l_{c} ≈ λ^{2}/Δλ, so a smaller Δλ means the wave stays in step with itself over a longer distance.
M2@3: Fringe visibility of 0 means: | No interference fringes | Perfect fringes | Maximum intensity | Monochromatic light | V = 0 when I_{max} = I_{min}: the light is incoherent over the path difference, so the screen is uniformly lit.
M2@1: Why must the two sources in an interference experiment be coherent? | They need a constant phase difference for a stable pattern | They must have different frequencies | They must be very bright | They must be at different distances from the screen | Without a constant phase difference, the fringes move too fast to see.
NUM2@3: Fringes have maximum intensity 9.0 units and minimum 1.0 unit. What is the visibility? | 0.8 | 2% |  | V = (9 − 1)/(9 + 1) = 0.8: good but not perfect coherence, or unequal beam intensities.
M3@2: A pinhole 0.5 mm wide is 1.0 m from a double slit, lit with 500 nm light. Roughly how far apart can the slits be and still give clear fringes? | About 1 mm | About 1 μm | About 1 m | Any distance | The coherence width d_{c} ≈ λL/s = 5 × 10^{-7} × 1.0/5 × 10^{-4} = 1 mm; wider slit spacings see incoherent light.
SA3@1,3: Explain why thin soap films show colours in white light but a 1 cm thick glass plate does not. | Colours come from interference between light reflected from the two surfaces, which needs the path difference (about twice the thickness times n) to be shorter than the coherence length. White light contains a wide range of wavelengths, so its coherence length is only about a micrometre. A soap film is a few hundred nanometres thick, so its path difference is within this and fringes form, coloured because different wavelengths interfere constructively at different thicknesses. For a 1 cm plate the path difference is about 3 cm, vastly longer than the coherence length, so the two reflections are incoherent and their intensities simply add. | Interference between two surface reflections ; Path difference about 2nt ; White light coherence length ~1 μm ; Film path difference within coherence length, plate far beyond ; Plate reflections incoherent: no fringes

## Diffraction
S: Diffraction is the spreading and bending of light around obstacles and through apertures, producing patterns of light and dark. It is why light can't be focused to an arbitrarily small spot and why fine detail has a limit.
O: Use a sin θ = mλ and θ ≈ 1.22λ/D to find diffraction angles
O: Distinguish Fraunhofer and Fresnel diffraction
O: Explain how diffraction limits the resolution of optical systems and lithography
PRE: Huygens' principle
LV: Year 1 · Application
H: Regimes
- **Fraunhofer** (far field): source and screen effectively at infinity (or with lenses); the pattern is the aperture's Fourier transform.
- **Fresnel** (near field): curved wavefronts; the pattern changes with distance (Fresnel number F = a^{2}/(Lλ); far field when F ≪ 1).
H: Key results
E: a sin θ = mλ :: single-slit minima
E: sin θ = 1.22λ/D :: first dark ring of a circular aperture (Airy disc)
- Smaller apertures and longer wavelengths give wider patterns.
H: Uses and limits
- Resolution of eyes, cameras, telescopes and microscopes.
- Spectrometers (gratings), holograms, X-ray crystallography.
- Lithography: chip features are limited by the diffraction of the light used, so the industry moved from 248 nm to 193 nm (with immersion) to 13.5 nm EUV.
X: The pupil (3 mm) views light of 550 nm. What is the smallest resolvable angle?
> θ = 1.22 × 5.5 × 10^{-7}/0.003 = 2.2 × 10^{-4} rad ≈ 0.8′
> About the eye's actual acuity (~1′)
K: Diffraction spreads light by an angle of about λ/a: the smaller the opening compared with the wavelength, the wider the spread.
!: Diffraction happens at every edge and aperture; it's not a defect but a fundamental property of waves.
P: **Investigate with the lab.** Switch to single-slit mode and narrow the slit: the central maximum gets wider. Widen it and the light spreads less.
IX: interference
T: Airy disc | The central bright spot of the diffraction pattern of a circular aperture, bounded by the first dark ring at sin θ = 1.22λ/D
T: Rayleigh criterion | Two point sources are just resolved when the centre of one Airy disc falls on the first minimum of the other
SUM: Single slit minima: a sin θ = mλ; circular aperture: 1.22λ/D.
SUM: Fraunhofer (far field) versus Fresnel (near field) regimes.
SUM: Diffraction sets the resolution of every optical system.
EV: established | Waves passing through an aperture spread by an angle of order λ divided by the aperture width
SRC: OpenStax, University Physics Volume 3, section 4.1 "Single-Slit Diffraction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/4-1-single-slit-diffraction
SRC: OpenStax, University Physics Volume 3, section 4.5 "Circular Apertures and Resolution" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/4-5-circular-apertures-and-resolution
SRC: AQA, A-level Physics specification (7408), section 3.3.2.2 "Diffraction" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the Airy disc? | The central bright spot of the diffraction pattern from a circular aperture.
Q: Why does chip lithography use ever-shorter wavelengths? | Diffraction limits feature size to roughly the wavelength.
M1@1: Halving an aperture's diameter makes the Airy disc: | Twice as wide | Half as wide | The same size | Four times wider | The angular size 1.22λ/D is inversely proportional to D.
M2@2: Fraunhofer diffraction applies when: | Source and screen are effectively at infinity | The screen is very close to the aperture | The light is incoherent | The aperture is much larger than the screen distance | Far-field conditions (Fresnel number ≪ 1, or lenses) give plane wavefronts at the aperture and screen.
M2@1: What happens to the diffraction pattern when the slit is made narrower? | The central maximum gets wider | The central maximum gets narrower | The pattern disappears | The colours separate | The spread of the central maximum is roughly λ/a, so a narrower slit spreads the light more.
NUM2@1: Light of 600 nm passes through a slit 0.12 mm wide. At what angle is the first minimum, in degrees? | 0.29 | 3% | ° | sin θ = λ/a = 6.0 × 10^{-7}/1.2 × 10^{-4} = 5.0 × 10^{-3}, so θ = 0.29°.
M3@3: A car's two headlights are 1.5 m apart. Using a 3 mm pupil at 550 nm, about how far away can the eye just resolve them? | About 7 km | About 70 m | About 700 km | About 70 km | θ_{min} = 1.22λ/D = 2.2 × 10^{-4} rad; distance ≈ 1.5/2.2 × 10^{-4} ≈ 6800 m (in practice less, as the eye is not perfect).
SA2@1,3: Explain why a radio telescope must be much larger than an optical telescope to achieve the same resolution. | Resolution is limited by diffraction: the smallest resolvable angle is θ ≈ 1.22λ/D. Radio wavelengths (centimetres to metres) are about 10^{5}–10^{7} times longer than visible wavelengths (~500 nm). To give the same θ, the aperture D must be larger by the same factor, so radio dishes are tens to hundreds of metres across, and interferometer arrays spread over thousands of kilometres are used for the finest detail. | θ ≈ 1.22λ/D ; Radio wavelength far longer than visible ; D must scale with λ for same θ ; Hence very large dishes ; Arrays (interferometry) give effective D of km

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
P: **Investigate with the lab.** Set the slit separation to three times the slit width and find the missing bright fringe where it meets a diffraction minimum.
IX: interference
Q: Why does adding slits sharpen the fringes? | More slits must all be in phase for a maximum; small angle changes destroy the agreement, narrowing peaks.
Q: What causes missing orders? | A principal maximum coinciding with a single-slit diffraction minimum.
M1: The central maximum of a single slit is: | Twice as wide as the others | The same width | Half as wide | Absent | Between the ±1 minima.
M2: Principal maxima intensity for N slits scales as: | N^{2} | N | √N | 1/N | Amplitudes add.
M2: In a double-slit pattern with d = 3a, which interference order is missing? | The third order | The first order | The second order | No order is missing | The third bright fringe falls exactly on the first diffraction minimum, so it vanishes.

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
P: **Investigate with the lab.** Use a grating with 600 lines per mm and find how many orders red light at 700 nm can show. Then try shorter wavelengths.
IX: interference
Q: State the grating equation. | d sin θ = nλ.
Q: What is a grating's resolving power? | R = λ/Δλ = nN, order times number of illuminated lines.
M1: A grating with 500 lines per mm can show orders up to (λ = 500 nm): | 3 | 4 | 2 | 10 | d/λ = 4, so n < 4.
M2: CD rainbow colours come from: | Diffraction from closely spaced tracks | Thin-film interference | Dispersion | Fluorescence | A natural reflection grating.
M2: A grating has 600 lines per mm. What is the highest order visible for 700 nm light? | The second order | The first order | The third order | The fifth order | d = 1/600 mm ≈ 1.67 μm; n_max = d/λ ≈ 2.4, so the second order is the highest.

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
P: **Investigate with the lab.** Find the critical angle for light leaving glass and push beyond it to trap the light by total internal reflection.
IX: optics
Q: What limits the distance of multimode fibres? | Modal dispersion: different modes travel different path lengths.
Q: Why is 1550 nm used for long-haul fibre? | It's the lowest-loss window, where erbium amplifiers work.
M1: Optical fibres guide light by: | Total internal reflection | Mirrors | Diffraction | Absorption | Core n > cladding n.
M2: A 30 dB loss means the power received is: | 0.1% | 1% | 3% | 30% | 10^{-3}.
M2: Why does light stay inside an optical fibre? | Total internal reflection at the core's boundary | Refraction out of the fibre at each bend | Absorption by the cladding | The fibre is a mirror | Light hits the boundary above the critical angle, so it is totally reflected.

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
