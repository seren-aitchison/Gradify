// Unit 7: Gravitation and Orbital Mechanics. Format: kit/course/notes.js
export default `
## Newton's law of universal gravitation
S: Every pair of masses attracts with a force proportional to the product of their masses and inversely proportional to the square of their separation. Newton's law unified falling apples and orbiting moons under one rule.
O: State and use Newton's law of gravitation, F = Gm_{1}m_{2}/r^{2}
O: Apply the inverse-square dependence to changes in separation
O: Explain how Newton's Moon test linked falling bodies to orbits
PRE: Newton's laws of motion
PRE: Centripetal acceleration and force
LV: A level · Foundation
H: The law
E: F = Gm_{1}m_{2}/r^{2}, G = 6.674 × 10^{-11} N m^{2} kg^{-2}
- Acts along the line joining the centres; always attractive.
- Spherically symmetric bodies act as if all their mass were at the centre (Newton's shell theorem).
- Gravity is the weakest fundamental force (~10^{-36} of electromagnetism between two protons) but dominates at large scales because mass has only one sign.
H: Newton's Moon test
P: The Moon is 60 Earth radii away, so gravity there should be g/3600 = 2.7 × 10^{-3} m s^{-2}. The Moon's centripetal acceleration (4π^{2}r/T^{2}, with T = 27.3 days) is very nearly that, showing the same force governs both.
X: Find the force between two 1000 kg cars 2 m apart.
> F = 6.67 × 10^{-11} × 10^{6}/4 = 1.7 × 10^{-5} N: utterly negligible
K: Gravity is universal and inverse-square: double the separation and the force falls to a quarter; double either mass and it doubles.
!: r is measured between centres, not between surfaces.
P: **Investigate with the lab.** Launch the planet from different distances and watch its acceleration change. Check that doubling the distance makes the pull four times weaker.
IX: orbits
T: Gravitational constant | G = 6.674 × 10^{-11} N m^{2} kg^{-2}, the constant in Newton's law of gravitation
T: Inverse-square law | A law in which a quantity falls as 1/r^{2} with distance from its source
T: Shell theorem | A spherically symmetric body attracts outside masses as if its mass were at its centre, and a hollow shell exerts no net force inside
SUM: F = Gm_{1}m_{2}/r^{2}, attractive, between centres.
SUM: The same inverse-square force explains falling apples and the Moon's orbit.
EV: established | Newton's inverse-square law of gravitation describes gravitational forces accurately wherever fields are weak and speeds are much less than c
SRC: OpenStax, University Physics Volume 1, section 13.1 "Newton's Law of Universal Gravitation" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-1-newtons-law-of-universal-gravitation
SRC: AQA, A-level Physics specification (7408), section 3.7.2.1 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Newton's law of gravitation. | F = Gm_{1}m_{2}/r^{2}, attractive, along the line between centres.
Q: What does the shell theorem say? | A spherically symmetric mass attracts outside bodies as if all its mass were at its centre (and exerts no net force inside a hollow shell).
M1@2: If the distance between two masses triples, the force: | Falls to 1/9 | Falls to 1/3 | Triples | Is unchanged | F ∝ 1/r^{2}, so tripling r divides the force by 3^{2} = 9; 1/3 would be an inverse (not inverse-square) law.
M2@1: Who first measured G in the laboratory? | Cavendish (1798) | Newton (1687) | Kepler (1609) | Einstein (1915) | Cavendish's torsion balance measured the tiny attraction between lead spheres; Newton never knew G's value, only GM for the Sun and Earth.
M2@2: The distance between two masses is doubled. What happens to the gravitational force? | It falls to a quarter | It halves | It doubles | It stays the same | Newton's law is an inverse square law: F ∝ 1/r², so doubling r quarters the force.
NUM2@1: Find the gravitational force between the Earth (6.0 × 10^{24} kg) and the Moon (7.35 × 10^{22} kg), 3.84 × 10^{8} m apart, in units of 10^{20} N. | 2.0 | 3% | × 10^{20} N | F = 6.67 × 10^{-11} × 6.0 × 10^{24} × 7.35 × 10^{22}/(3.84 × 10^{8})^{2} = 2.94 × 10^{37}/1.47 × 10^{17} = 2.0 × 10^{20} N.
M3@3: The Moon is about 60 Earth radii from Earth's centre. What centripetal acceleration should it have if gravity is inverse-square? | About 2.7 × 10^{-3} m s^{-2} | About 0.16 m s^{-2} | About 9.8 m s^{-2} | About 1.6 m s^{-2} | g falls by 60^{2} = 3600, so 9.8/3600 = 2.7 × 10^{-3} m s^{-2}, matching 4π^{2}r/T^{2} for the Moon; 1.6 m s^{-2} is the Moon's own surface gravity.
SA2@1,3: Explain how Newton used the Moon's orbit to test the idea that the force making an apple fall also holds the Moon in orbit. | If gravity falls as 1/r^{2}, then at the Moon, about 60 Earth radii away, the acceleration due to Earth's gravity should be g/60^{2} = 9.8/3600 ≈ 2.7 × 10^{-3} m s^{-2}. The Moon's actual centripetal acceleration can be found from its orbital radius and period, a = 4π^{2}r/T^{2}, which gives the same value. The agreement shows one inverse-square force explains both. | Inverse square predicts g/3600 at 60 Earth radii ; Centripetal acceleration from 4π^{2}r/T^{2} ; The two values agree ; One force explains falling and orbiting

## Gravitational fields
S: A gravitational field is the region around a mass where other masses feel a force. Field lines show its direction; their density shows its strength. It replaces "action at a distance" with a local property of space.
O: Draw and interpret field-line patterns for radial and uniform fields
O: Describe how g varies inside and outside a uniform sphere
O: Use Gauss's law for gravity with spherical symmetry
PRE: Newton's law of universal gravitation
LV: A level · Application
H: Field patterns
- Point or spherical mass: radial lines pointing inward; field ∝ 1/r^{2}.
- Near the Earth's surface: nearly uniform parallel lines (g ≈ constant).
- Inside a uniform solid sphere: g ∝ r, falling to zero at the centre.
E: g(r) = GM/r^{2} (r ≥ R); g(r) = GMr/R^{3} (r < R)
H: Gauss's law for gravity
E: ∯g·dA = −4πGM_{enc}
P: The same law as electrostatics with a sign change (masses attract). It gives the shell theorem in one line and generalises to ∇·g = −4πGρ.
X: Find g at half the Earth's radius (uniform density assumed).
> g = g_{0} × (r/R) = 9.8/2 = 4.9 N kg^{-1}
K: Outside a spherical mass only the total mass matters; inside, only the mass closer to the centre than you pulls you overall.
!: The real Earth isn't uniform: its dense core makes g increase slightly with depth at first, peaking at the core–mantle boundary.
T: Gravitational field | A region in which a mass experiences a force because of other masses
T: Field line | A line showing the direction of the force on a test mass; closer lines mean a stronger field
T: Uniform field | A field with the same strength and direction everywhere, shown by parallel, evenly spaced lines
SUM: Radial fields fall as 1/r^{2} outside a sphere; inside a uniform sphere g ∝ r.
SUM: Gauss's law, flux of g = −4πGM_{enc}, gives these results directly.
EV: established | Outside a spherically symmetric mass the gravitational field is GM/r^{2}, and inside a uniform sphere it grows linearly from zero at the centre
SRC: OpenStax, University Physics Volume 1, section 13.2 "Gravitation Near Earth's Surface" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface
SRC: AQA, A-level Physics specification (7408), section 3.7.2.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How does g vary inside a uniform solid sphere? | Proportionally to distance from the centre.
Q: What is the gravitational field inside a hollow spherical shell? | Zero.
M1@1: Gravitational field lines near Earth's surface are: | Nearly parallel and evenly spaced | Circular loops around the Earth | Radiating outward from the surface | Absent at ground level | Over a small region a radial field looks uniform, so the lines are drawn parallel, evenly spaced and pointing down.
M2@3: Gauss's law for gravity has a minus sign because: | Gravity attracts, so the field points inward | G is a negative constant | Mass can be negative | It's an arbitrary convention only | Field lines point towards masses, so the outward flux through a surface around a mass is negative: the minus sign expresses attraction.
NUM2@2: Assuming uniform density, what is g at a depth of 1600 km inside the Earth (R = 6400 km, g_{0} = 9.8 N kg^{-1})? | 7.35 | 2% | N kg^{-1} | Inside a uniform sphere g ∝ r, and r = 4800 km = 0.75R, so g = 0.75 × 9.8 = 7.35 N kg^{-1}.
M3@2: A hollow spherical shell of mass M and radius R. What is the field at r = R/2 and at r = 2R? | 0 and GM/(4R^{2}) | GM/R^{2} and GM/(4R^{2}) | 4GM/R^{2} and GM/(4R^{2}) | 0 and 0 | Inside a shell the pulls from all parts cancel, so g = 0; outside it acts as a point mass: GM/(2R)^{2} = GM/(4R^{2}).
SA2@1,2: Sketch in words a graph of g against distance r from the centre of a uniform planet of radius R, from r = 0 to r = 3R, and explain its shape. | g rises linearly from zero at the centre to a maximum GM/R^{2} at the surface, because inside only the mass within radius r (∝ r^{3}) pulls, giving g ∝ r^{3}/r^{2} = r. Outside, all the mass acts as if at the centre, so g = GM/r^{2} falls as an inverse square: to a quarter of the surface value at 2R and a ninth at 3R. | Zero at the centre ; Linear rise to GM/R^{2} at the surface ; Enclosed mass ∝ r^{3} explains the inside ; Inverse-square fall outside: g/4 at 2R, g/9 at 3R

## Gravitational field strength
S: Gravitational field strength g is the force per unit mass at a point. Near the Earth's surface it's about 9.81 N kg^{-1}, numerically equal to the free-fall acceleration in m s^{-2}.
O: Define g as force per unit mass and calculate it for a planet
O: Calculate how g changes with height above a planet
O: Explain weightlessness in orbit
PRE: Gravitational fields
LV: A level · Foundation
H: Definition
E: g = F/m = GM/r^{2}
- Units N kg^{-1} ≡ m s^{-2}.
- Varies with latitude (9.78 at the equator to 9.83 at the poles), altitude and local geology.
- Fields add as vectors (superposition).
H: Variation with height
E: g(h) = g_{0}R^{2}/(R + h)^{2} ≈ g_{0}(1 − 2h/R)
- At the ISS (400 km), g ≈ 8.7 N kg^{-1}: astronauts are weightless because they're in free fall, not because gravity is absent.
H: Gravimetry
P: Sensitive gravimeters (precision ~10^{-9}g) map density variations underground: oil fields, ore bodies, cavities, magma chambers. The GRACE satellites mapped changes in ice and groundwater from tiny changes in Earth's field.
X: Find g on Mars (M = 6.42 × 10^{23} kg, R = 3.39 × 10^{6} m).
> g = 6.67 × 10^{-11} × 6.42 × 10^{23}/(3.39 × 10^{6})^{2} = 3.7 N kg^{-1}
K: g is a property of the place, not of the object: every mass at that point feels F = mg and falls with acceleration g.
!: Weightlessness in orbit doesn't mean zero g; it means everything around you falls with the same acceleration.
T: Gravitational field strength | The gravitational force per unit mass at a point, g = F/m, in N kg^{-1}
T: Weightlessness | The sensation when a body and its surroundings fall freely together, so no support force acts
SUM: g = GM/r^{2}; surface g ∝ M/R^{2}.
SUM: g falls with height as 1/(R + h)^{2}; orbiting astronauts are in free fall, not out of gravity.
EV: established | The gravitational field strength at distance r from a spherical mass M is GM/r^{2}
SRC: OpenStax, University Physics Volume 1, section 13.2 "Gravitation Near Earth's Surface" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface
SRC: AQA, A-level Physics specification (7408), section 3.7.2.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why are astronauts on the ISS weightless? | They and the station are in free fall together; g there is still about 90% of surface g.
Q: Where on Earth's surface is g largest? | At the poles.
M1@2: At a height equal to Earth's radius, g is: | g_{0}/4 | g_{0}/2 | g_{0} | 0 | At height R the distance from the centre is 2R, and g ∝ 1/r^{2}, so g = g_{0}/4.
M2@1: A planet has twice Earth's mass and twice its radius. Surface g is: | g_{0}/2 | 2g_{0} | g_{0} | g_{0}/4 | g ∝ M/R^{2}, so the factor is 2/2^{2} = 1/2: doubling the radius outweighs doubling the mass.
NUM2@2: What is g at the altitude of a geostationary satellite, r = 4.22 × 10^{7} m from Earth's centre (GM = 3.99 × 10^{14} m^{3} s^{-2})? | 0.224 | 3% | N kg^{-1} | g = GM/r^{2} = 3.99 × 10^{14}/(1.78 × 10^{15}) = 0.224 N kg^{-1}, about 2% of surface g.
TF1@3: Astronauts on the International Space Station float because there is almost no gravity at its altitude. | false | At 400 km g is still about 8.7 N kg^{-1}, roughly 90% of its surface value; they float because they and the station are falling freely together.
M3@1: A spring balance reads the weight of a 1.000 kg mass as 9.83 N at the North Pole. At the equator it would read about: | 9.78 N | 9.83 N | 9.81 N exactly | 9.92 N | The equator is further from the centre (Earth bulges) and part of gravity supplies the centripetal force of Earth's rotation, so the reading drops to about 9.78 N.
SA2@2,3: Explain why an astronaut in the International Space Station feels weightless even though g there is about 8.7 N kg^{-1}. | The astronaut's weight, mg, is still about 90% of its surface value, and it is the only force acting. Both the astronaut and the station are in orbit, falling towards Earth with the same acceleration g while moving sideways fast enough to keep missing it. Because they fall together, the floor exerts no support (normal) force on the astronaut, and it is that support force we feel as weight. | g at the ISS is still about 90% of surface g ; Astronaut and station fall with the same acceleration ; No normal (support) force acts ; The felt weight is the support force, so it is zero

## Gravitational potential and potential energy
S: Gravitational potential is the work done per unit mass to bring a mass from infinity to a point. It's negative everywhere (zero at infinity), and differences in potential give the energy needed to move between places.
O: Define gravitational potential and explain why it is negative
O: Calculate the work done moving a mass between two points, ΔW = mΔV
O: Relate field strength to the potential gradient, g = −dV/dr
PRE: Gravitational field strength
PRE: Work and energy
LV: A level · Application
H: Definitions
E: V = −GM/r :: potential (J kg^{-1})
E: U = −GMm/r :: potential energy of mass m
E: g = −dV/dr :: field is minus the potential gradient
E: ΔW = mΔV :: work done moving mass m through a potential difference ΔV
- Equipotentials are spheres around a planet; no work is done moving along one.
- ΔV is also the area under a graph of g against r.
- Near the surface, ΔU = mgh is a good approximation to the difference of −GMm/r values.
H: Potential wells
P: A planet sits in a potential well. To escape you must climb out: at Earth's surface V = −62.5 MJ kg^{-1}. Low orbit is about half way out in energy terms; that's why "getting to orbit is halfway to anywhere".
X: How much energy lifts a 1000 kg satellite from the surface to 400 km?
> ΔU = GMm(1/R − 1/(R + h)) = 6.67 × 10^{-11} × 6 × 10^{24} × 1000 × (1/6.37 × 10^{6} − 1/6.77 × 10^{6})
> ≈ 3.7 × 10^{9} J (mgh with g = 9.8 would give 3.9 × 10^{9} J)
K: Only differences in potential matter physically; choosing V = 0 at infinity makes every bound point negative.
!: Potential is negative and becomes less negative (increases) with height. "Higher potential" means closer to zero.
T: Gravitational potential | The work done per unit mass in bringing a small mass from infinity to a point, V = −GM/r
T: Equipotential | A surface on which the potential is the same everywhere, so no work is done moving along it
SUM: V = −GM/r, zero at infinity; the work to move m is mΔV.
SUM: g = −dV/dr, and equipotentials are perpendicular to field lines.
EV: established | The gravitational potential outside a spherical mass is −GM/r with the zero taken at infinity
SRC: OpenStax, University Physics Volume 1, section 13.3 "Gravitational Potential Energy and Total Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-3-gravitational-potential-energy-and-total-energy
SRC: AQA, A-level Physics specification (7408), section 3.7.2.3 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why is gravitational potential negative? | Zero is defined at infinity, and gravity is attractive, so work must be done to move away.
Q: How is field related to potential? | g = −dV/dr: the field points down the potential gradient.
M1@2: Earth's surface potential is about −62.5 MJ kg^{-1}. The energy to fully escape for 1 kg is: | 62.5 MJ | 9.8 J | 0 | 125 MJ | To escape you must raise V from −62.5 MJ kg^{-1} to zero at infinity, so 1 kg needs 62.5 MJ.
M2@2: Moving a mass along an equipotential requires: | No work | Positive work | Negative work | Infinite work | Work done is mΔV, and ΔV = 0 along an equipotential, so no work is needed (ignoring friction).
NUM2@2: How much work is needed to move a 500 kg probe from Earth's surface (V = −62.5 MJ kg^{-1}) to a point where V = −15.6 MJ kg^{-1}? In GJ. | 23.5 | 2% | GJ | ΔW = mΔV = 500 × (−15.6 − (−62.5)) × 10^{6} = 500 × 46.9 × 10^{6} = 2.35 × 10^{10} J = 23.5 GJ.
M3@3: The potential at distance r from a planet is −40 MJ kg^{-1}. What is it at 2r? | −20 MJ kg^{-1} | −10 MJ kg^{-1} | −80 MJ kg^{-1} | −160 MJ kg^{-1} | V ∝ −1/r, so doubling r halves the magnitude: −20 MJ kg^{-1}. −10 would be the inverse-square law that applies to g, not V.
SA3@1,3: Explain the significance of the negative sign in V = −GM/r, and how g can be found from a graph of V against r. | V is defined as the work done per unit mass bringing a mass from infinity, where V = 0. Gravity is attractive, so the field does work on the mass as it comes in and an external agent does negative work: V is negative everywhere at finite r and rises towards zero as r increases. The field strength is minus the gradient, g = −dV/dr, so the steepness of the V–r graph at a point gives the size of g, which is greatest close to the planet where the curve is steepest. | Zero of potential at infinity ; Attraction makes V negative, rising towards zero with r ; g = −dV/dr ; Gradient of the V–r graph gives g

## Escape velocity
S: Escape velocity is the minimum launch speed for an unpowered object to escape a body's gravity completely. It's set by making kinetic energy equal to the depth of the potential well.
O: Derive v_{esc} = √(2GM/R) from energy conservation
O: Calculate escape velocities and compare them with orbital speeds
O: Explain why some bodies keep atmospheres and others lose them
PRE: Gravitational potential and potential energy
LV: A level · Application
H: Derivation
E: ½mv_{esc}^{2} = GMm/R ⇒ v_{esc} = √(2GM/R) = √(2gR)
- Independent of the projectile's mass and launch direction (ignoring the atmosphere and obstacles).
- Earth: 11.2 km s^{-1}; Moon: 2.4; Mars: 5.0; Jupiter: 59.5; Sun's surface: 618 km s^{-1}.
H: Atmospheres
P: A gas molecule's thermal speed ~√(3kT/m). If the typical thermal speed of a gas is more than about one sixth of v_{esc}, enough molecules in the fast tail escape for the gas to leak away over billions of years. That's why the Moon has no atmosphere and Earth has lost most of its hydrogen and helium.
H: Black holes
E: R_{s} = 2GM/c^{2} :: radius where v_{esc} would equal c (exact result in general relativity)
- Earth compressed to ~9 mm; the Sun to ~3 km.
X: Find the escape velocity from the Moon (M = 7.35 × 10^{22} kg, R = 1.74 × 10^{6} m).
> v = √(2 × 6.67 × 10^{-11} × 7.35 × 10^{22}/1.74 × 10^{6}) = 2.4 km s^{-1}
K: Escape needs total energy of at least zero: kinetic energy equal to the depth of the potential well, GMm/R.
!: Rockets don't need to reach escape velocity at launch; with continuous thrust they can climb slowly. v_{esc} applies to an unpowered launch.
P: **Investigate with the lab.** Increase the launch speed until the planet never comes back. Compare that speed with the circular orbital speed at the same distance: it is √2 times larger.
IX: orbits
T: Escape velocity | The minimum speed an unpowered object needs to reach infinity, v_{esc} = √(2GM/r)
T: Schwarzschild radius | R_{s} = 2GM/c^{2}, the radius of the event horizon of a non-rotating black hole
SUM: v_{esc} = √(2GM/R), independent of the projectile's mass and direction.
SUM: v_{esc} = √2 × circular orbital speed; low v_{esc} relative to thermal speeds means a planet loses its atmosphere.
EV: established | An unpowered projectile escapes a spherical body if its kinetic energy at least equals GMm/R, giving v_{esc} = √(2GM/R)
SRC: OpenStax, University Physics Volume 1, section 13.3 "Gravitational Potential Energy and Total Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-3-gravitational-potential-energy-and-total-energy
SRC: AQA, A-level Physics specification (7408), section 3.7.2.4 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the escape velocity from Earth's surface? | About 11.2 km s^{-1}.
Q: What is the Schwarzschild radius? | R_{s} = 2GM/c^{2}, the radius at which escape speed equals c.
M1@1: Escape velocity depends on the projectile's: | Nothing about the projectile | Mass, because heavier objects need more speed | Shape, because of air resistance in space | Charge, because of the planet's magnetic field | Mass cancels in ½mv^{2} = GMm/R, so v_{esc} = √(2GM/R) depends only on the planet and the launch radius.
M2@2: A planet has the same density as Earth but twice its radius. Its escape velocity: | Doubles | Is the same | Halves | Quadruples | With fixed density M ∝ R^{3}, so v_{esc} ∝ √(M/R) ∝ √(R^{2}) = R: twice the radius gives twice the escape speed.
M2@2: How does escape velocity compare with circular orbital speed at the same distance? | It is √2 times larger | It is the same | It is twice as large | It is half as large | v_esc = √(2GM/r) and v_orb = √(GM/r), so v_esc = √2 × v_orb.
NUM2@2: Find the escape velocity from Mars (M = 6.42 × 10^{23} kg, R = 3.39 × 10^{6} m) in km s^{-1}. | 5.03 | 2% | km s^{-1} | v = √(2GM/R) = √(2 × 6.67 × 10^{-11} × 6.42 × 10^{23}/3.39 × 10^{6}) = √(2.53 × 10^{7}) = 5.0 km s^{-1}.
M3@3: Why has the Moon lost any atmosphere it had, while Earth kept nitrogen and oxygen? | Its escape speed is low compared with gas molecules' thermal speeds | It is too far from the Sun to hold gas | Its weak magnetic field lets the gas be pulled away by Earth | Its surface is too cold for any gas to exist | v_{esc} on the Moon is 2.4 km s^{-1}, so a significant fraction of molecules in the fast tail of the thermal distribution escape over geological time; Earth's 11.2 km s^{-1} retains heavier gases.
SA3@1: Derive the escape velocity from a planet of mass M and radius R, stating the assumptions. | Assume no air resistance, no thrust after launch and a non-rotating planet. The object must reach infinity with at least zero kinetic energy, where its potential energy is zero, so its total energy at launch must be at least zero: ½mv^{2} − GMm/R ≥ 0. The minimum speed is when this equals zero, giving v_{esc} = √(2GM/R) = √(2gR), independent of m. | Assumptions: no drag, no thrust, unpowered ; Total energy at least zero to reach infinity ; ½mv^{2} = GMm/R ; v_{esc} = √(2GM/R), independent of m

## Orbital velocity
S: A satellite in a circular orbit falls continuously around the planet: gravity supplies exactly the centripetal force needed at its speed. Orbital speed falls with distance, and is 1/√2 of the escape speed at the same radius.
O: Derive and use v = √(GM/r) and T = 2π√(r^{3}/GM)
O: Calculate the radius of a geostationary orbit
O: Explain why higher orbits are slower
PRE: Centripetal acceleration and force
PRE: Gravitational field strength
LV: A level · Application
H: Circular orbits
E: GMm/r^{2} = mv^{2}/r ⇒ v = √(GM/r)
E: T = 2π√(r^{3}/GM)
- Low Earth orbit (~400 km): 7.7 km s^{-1}, period ~92 min.
- Geostationary: r = 42 160 km, T = 23 h 56 min, v = 3.07 km s^{-1}.
- The Moon: ~1.0 km s^{-1}, 27.3 days.
H: Newton's cannon
P: Fire a cannonball horizontally from a mountain faster and faster: it lands farther away, until at ~7.9 km s^{-1} (at the surface, without air) the ground curves away as fast as it falls. It's in orbit.
X: Find the altitude of a geostationary satellite.
> r^{3} = GMT^{2}/4π^{2} = 3.99 × 10^{14} × (86 164)^{2}/39.5 = 7.5 × 10^{22} m^{3}
> r = 4.22 × 10^{7} m; altitude ≈ 35 800 km
K: In a circular orbit gravity is the centripetal force; the satellite's mass cancels, so every object at the same radius orbits at the same speed.
!: Higher orbits are slower, though they have more total energy. To catch up with a spacecraft ahead of you in orbit, you first slow down to drop lower.
P: **Investigate with the lab.** Put the planet in a circular orbit (eccentricity below 0.02). Then start it further out and find the circular speed again: it is lower.
IX: orbits
T: Orbital speed | The speed of a body in a circular orbit, v = √(GM/r)
T: Geostationary orbit | An equatorial circular orbit with a period of one sidereal day, so the satellite stays above one point
SUM: v = √(GM/r) and T^{2} = 4π^{2}r^{3}/GM; neither depends on the satellite's mass.
SUM: Higher orbits are slower and longer; a geostationary orbit is at r = 42 200 km.
EV: established | A body in a circular orbit of radius r about a mass M moves at v = √(GM/r) whatever its own mass
SRC: OpenStax, University Physics Volume 1, section 13.4 "Satellite Orbits and Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy
SRC: AQA, A-level Physics specification (7408), section 3.7.2.4 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the orbital speed of a circular orbit of radius r? | v = √(GM/r).
Q: How do orbital and escape speeds at the same radius compare? | v_{esc} = √2 v_{orb}.
M1@3: A satellite moves to an orbit 4 times larger in radius. Its speed: | Halves | Doubles | Quarters | Stays the same | v = √(GM/r) ∝ 1/√r, so four times the radius gives half the speed.
M2@2: The period of a geostationary orbit is: | One sidereal day (23 h 56 min) | One solar day, 24 h exactly | Half a day, 12 h | About 90 min, like the ISS | It must match Earth's rotation relative to the stars, which takes 23 h 56 min; the 24 h solar day includes Earth's motion around the Sun.
M2@3: How does circular orbital speed change with distance from the star? | It decreases as 1/√r | It increases as √r | It is the same at every distance | It increases as r² | v = √(GM/r), so more distant orbits are slower.
NUM2@1: What is the orbital period, in minutes, of a satellite in a circular orbit 600 km above Earth (R = 6370 km, GM = 3.99 × 10^{14} m^{3} s^{-2})? | 96.5 | 2% | min | r = 6.97 × 10^{6} m; T = 2π√(r^{3}/GM) = 2π√(3.386 × 10^{20}/3.99 × 10^{14}) = 2π × 921 = 5790 s = 96.5 min.
M3@1: Two satellites share a circular orbit; one has ten times the mass of the other. Compared with the light one, the heavy one moves: | At the same speed | √10 times faster | Ten times slower | √10 times slower | The satellite's mass cancels in GMm/r^{2} = mv^{2}/r, so all bodies at one radius move at √(GM/r).
SA2@1,2: Show that the period of a circular orbit is proportional to r^{3/2}, and use this to explain why there is only one possible radius for a geostationary orbit. | Gravity provides the centripetal force: GMm/r^{2} = mv^{2}/r, and v = 2πr/T, so GM/r^{2} = 4π^{2}r/T^{2}, giving T^{2} = 4π^{2}r^{3}/GM and T ∝ r^{3/2}. A geostationary satellite must have T equal to one sidereal day, and since T fixes r uniquely, r = (GMT^{2}/4π^{2})^{1/3} = 4.22 × 10^{7} m; it must also orbit over the equator in the direction of Earth's rotation. | Equate gravitational and centripetal force ; Substitute v = 2πr/T ; T^{2} = 4π^{2}r^{3}/GM so T ∝ r^{3/2} ; A fixed period fixes a single radius ; Equatorial and in the direction of rotation

## Circular and elliptical orbits
S: Bound orbits under an inverse-square force are ellipses with the central body at one focus; a circle is the special case of zero eccentricity. Unbound orbits are parabolas or hyperbolas.
O: Describe an orbit by its semi-major axis and eccentricity
O: Relate an orbit's total energy to its shape and whether it is bound
O: Use the vis-viva equation to find speeds anywhere on an orbit
PRE: Orbital velocity
LV: Year 1 · Application
H: Ellipse geometry
E: r = a(1 − e^{2})/(1 + e cos θ) :: a = semi-major axis, e = eccentricity
E: r_{peri} = a(1 − e), r_{apo} = a(1 + e)
- e = 0 circle; 0 < e < 1 ellipse; e = 1 parabola; e > 1 hyperbola.
- Earth's orbit e = 0.017 (nearly circular); Mercury 0.21; Halley's comet 0.97.
H: Energy decides the shape
E: E = −GMm/(2a) :: total energy depends only on a
- E < 0 bound (ellipse); E = 0 parabola (just escapes); E > 0 hyperbola (flyby).
H: Speeds
E: v^{2} = GM(2/r − 1/a) :: vis-viva equation
- Fastest at periapsis, slowest at apoapsis.
X: A comet has perihelion 0.6 AU and aphelion 35 AU. Find a and e.
> a = (0.6 + 35)/2 = 17.8 AU
> e = (35 − 0.6)/(35 + 0.6) = 0.97
K: The semi-major axis alone fixes the energy (and period); the eccentricity says how stretched the orbit is.
!: The Sun is at a focus of the ellipse, not at its centre.
P: **Investigate with the lab.** Make an ellipse with eccentricity above 0.6 and watch the planet speed up near the star and slow down far away.
IX: orbits
T: Eccentricity | A number e describing an orbit's shape: 0 for a circle, between 0 and 1 for an ellipse, 1 for a parabola
T: Semi-major axis | Half the longest diameter of an ellipse, a = (r_{peri} + r_{apo})/2
T: Periapsis | The point of an orbit closest to the central body (perihelion for the Sun)
SUM: Inverse-square orbits are conic sections with the central mass at a focus.
SUM: E = −GMm/(2a) decides bound or unbound; vis-viva gives the speed at any r.
EV: established | Orbits under an inverse-square attraction are conic sections with the attracting body at one focus
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
SRC: OpenStax, College Physics 2e, section 6.6 "Satellites and Kepler's Laws: An Argument for Simplicity" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/6-6-satellites-and-keplers-laws-an-argument-for-simplicity
Q: What is the vis-viva equation? | v^{2} = GM(2/r − 1/a).
Q: What decides whether an orbit is bound? | Its total energy: negative energy means a bound ellipse.
M1@1: An orbit with e = 0 is: | A circle | A parabola | A hyperbola | A straight line | Eccentricity measures departure from a circle, so e = 0 means a circle; e = 1 is a parabola and e > 1 a hyperbola.
M2@3: Where is an orbiting body fastest? | At periapsis | At apoapsis | Everywhere the same | At the end of the minor axis | Angular momentum mvr is conserved (and vis-viva gives larger v at smaller r), so the speed is greatest where r is least.
M2@3: Where is a planet on an elliptical orbit moving fastest? | At closest approach to the star | At its furthest point from the star | Halfway along the orbit | It moves at constant speed | Angular momentum is conserved, so the planet moves fastest where it is closest.
NUM2@3: A satellite has a = 10 000 km about Earth (GM = 3.99 × 10^{14} m^{3} s^{-2}). What is its speed, in km s^{-1}, when r = 7000 km? | 8.61 | 2% | km s^{-1} | v^{2} = GM(2/r − 1/a) = 3.99 × 10^{14} × (2.857 × 10^{-7} − 1.0 × 10^{-7}) = 7.41 × 10^{7} m^{2} s^{-2}, so v = 8.61 km s^{-1}.
M3@2: A probe passes Earth with total orbital energy exactly zero relative to Earth. Its path is: | A parabola, just escaping | A circle | A closed ellipse | A hyperbola that returns | E = 0 is the boundary between bound ellipses (E < 0) and hyperbolic flybys (E > 0): a parabola, escaping with zero speed at infinity.
SA2@1,2: Two comets have the same perihelion distance, but one has total energy −1 × 10^{9} J and the other +1 × 10^{9} J. Describe and explain how their orbits differ. | The comet with negative energy is bound: it follows an ellipse with the Sun at one focus, with a semi-major axis set by E = −GMm/(2a), and it returns periodically. The comet with positive energy is unbound: it follows a hyperbola, swings once around the Sun and leaves for ever with some speed left at infinity. At the shared perihelion the unbound comet moves faster. | Negative energy: bound ellipse that returns ; Semi-major axis fixed by energy ; Positive energy: hyperbola, never returns ; Unbound comet faster at perihelion

## Kepler's laws
S: Kepler found three laws in Tycho Brahe's planetary data; Newton showed they follow from an inverse-square gravitational force. They still describe moons, exoplanets and binary stars.
O: State Kepler's three laws and the physics behind each
O: Use T^{2} ∝ a^{3} to compare orbits about the same body
O: Use Newton's form of the third law to find a central mass
PRE: Circular and elliptical orbits
LV: A level · Application
H: The laws
- **First**: planets move in ellipses with the Sun at one focus.
- **Second**: the line from Sun to planet sweeps equal areas in equal times (conservation of angular momentum).
- **Third**: T^{2} ∝ a^{3}, the same constant for all planets of one star.
E: T^{2} = 4π^{2}a^{3}/(G(M + m)) :: Newton's form of the third law
H: Weighing the universe
P: Kepler's third law measures masses: the Sun's from Earth's orbit, Jupiter's from its moons, the supermassive black hole Sgr A* (4 million solar masses) from stars orbiting it, and exoplanet host stars from their planets.
X: Jupiter is 5.2 AU from the Sun. Find its period.
> T^{2} = a^{3} (years, AU) = 140.6
> T = 11.9 years
K: Kepler's laws are consequences of an inverse-square central force: the first of its form, the second of angular momentum conservation, the third of the force's strength.
!: The third law in its simple form T^{2} ∝ a^{3} compares bodies orbiting the same central mass; Earth's satellites and the planets have different constants.
P: **Investigate with the lab.** Try orbits of two sizes and compare T² with a³. Then check equal areas in equal times on an eccentric orbit.
IX: orbits
T: Kepler's third law | The square of an orbital period is proportional to the cube of the semi-major axis, T^{2} ∝ a^{3}
T: Astronomical unit | The mean Earth–Sun distance, about 1.50 × 10^{11} m
SUM: Ellipses, equal areas, T^{2} ∝ a^{3}.
SUM: Newton's form T^{2} = 4π^{2}a^{3}/(GM) lets orbits weigh central bodies.
EV: established | Kepler's laws follow from Newton's inverse-square law and describe planetary, satellite and binary orbits
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
SRC: AQA, A-level Physics specification (7408), section 3.7.2.4 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What does Kepler's second law express physically? | Conservation of angular momentum.
Q: How can Kepler's third law measure a star's mass? | From a planet's period and orbit size: M = 4π^{2}a^{3}/(GT^{2}).
M1@2: A planet at 4 AU has a period of: | 8 years | 4 years | 16 years | 2 years | In years and AU, T^{2} = a^{3} = 64, so T = 8 years; 16 years would come from T ∝ a^{2}.
M2@1: Kepler's laws were derived from observations by: | Tycho Brahe | Galileo | Copernicus | Ptolemy | Kepler analysed Tycho Brahe's precise naked-eye measurements of planetary positions, especially those of Mars.
M2@2: One planet's orbit has four times the semi-major axis of another's. How do their periods compare? | Eight times longer | Four times longer | Sixteen times longer | Twice as long | Kepler's third law: T² ∝ a³, so T ∝ a^{1.5} = 4^{1.5} = 8.
NUM2@3: Io orbits Jupiter at 4.22 × 10^{8} m with period 1.77 days. Find Jupiter's mass in units of 10^{27} kg. | 1.90 | 3% | × 10^{27} kg | T = 1.529 × 10^{5} s; M = 4π^{2}a^{3}/(GT^{2}) = 39.48 × 7.515 × 10^{25}/(6.67 × 10^{-11} × 2.338 × 10^{10}) = 1.90 × 10^{27} kg.
M3@1: A comet's speed at perihelion (0.5 AU) is v. Using Kepler's second law, its speed at aphelion (5 AU) is: | v/10 | v | v/100 | 10v | At the ends of the major axis the velocity is perpendicular to r, so equal areal rate means r_{p}v_{p} = r_{a}v_{a}: v_{a} = v × 0.5/5 = v/10.
SA2@1: Explain how Kepler's second law follows from conservation of angular momentum, and what it implies for a planet's speed. | Gravity on a planet acts along the line to the Sun, so it exerts no torque about the Sun and the planet's angular momentum L = mr × v is constant. The area swept per unit time is ½|r × v| = L/(2m), which is therefore constant: equal areas in equal times. To sweep equal areas the planet must move faster when it is close to the Sun and slower when far away. | Gravity is central, so no torque about the Sun ; Angular momentum is conserved ; Areal rate dA/dt = L/(2m) is constant ; Faster near the Sun, slower far away

## Satellite motion
S: Satellites are placed in orbits chosen for their purpose: low orbits for imaging and the ISS, sun-synchronous polar orbits for Earth observation, medium orbits for navigation, and geostationary orbits for communications and weather.
O: Compare the main types of Earth orbit and their uses
O: Explain the conditions for a geostationary orbit
O: Explain the effects of drag and why GPS needs relativistic corrections
PRE: Orbital velocity
LV: A level · Application
H: Common orbits
- **LEO** (160–2000 km): ~90 min periods; ISS, Starlink, imaging; atmospheric drag means orbits decay.
- **Sun-synchronous**: near-polar, precessing once a year (using Earth's bulge) so each pass sees the same local time of day.
- **MEO** (~20 000 km): GPS, Galileo, ~12 h periods.
- **Geostationary** (35 786 km, equatorial): fixed in the sky; communications and weather.
- **Molniya**: highly elliptical, inclined 63.4°, long dwell over high latitudes.
H: Practical issues
- Drag: LEO satellites need reboosts; ISS loses ~2 km per month without them.
- Station-keeping against perturbations from the Moon, Sun and Earth's bulge.
- Space debris and Kessler syndrome: collisions creating more debris.
X: Why does GPS need relativity?
> Satellite clocks run fast by ~45 μs per day (weaker gravity) and slow by ~7 μs per day (speed): net +38 μs per day
> Uncorrected, position errors would grow by ~10 km per day
K: A geostationary satellite must be over the equator, moving eastward, with a period of one sidereal day: that fixes a single orbit at 35 786 km altitude.
!: Drag on a satellite makes it speed up, not slow down: it drops to a lower orbit where the orbital speed is higher.
P: **Investigate with the lab.** Find the circular orbit for a satellite close in, then one further out, and compare their periods.
IX: orbits
T: Low Earth orbit | An orbit roughly 160–2000 km up, with a period of about 90–130 minutes
T: Sun-synchronous orbit | A near-polar orbit whose plane precesses once a year, so it passes each place at the same local solar time
T: Polar orbit | An orbit passing over or near both poles, so Earth turns beneath it and it scans the whole surface
SUM: Low orbits suit imaging but suffer drag; geostationary orbits stay above one point for communications.
SUM: GPS clocks gain a net 38 μs per day from relativity and must be corrected.
EV: established | Satellite orbits are chosen by altitude, inclination and period to suit their purpose, and GPS requires general and special relativistic clock corrections
SRC: OpenStax, University Physics Volume 1, section 13.4 "Satellite Orbits and Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy
SRC: AQA, A-level Physics specification (7408), section 3.7.2.4 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why are Earth observation satellites often sun-synchronous? | So they pass over each place at the same local solar time, giving consistent lighting.
Q: What happens to a LEO satellite's speed as drag lowers its orbit? | It increases.
M1@1: GPS satellites orbit in: | Medium Earth orbit (~20 000 km) | Geostationary orbit (~36 000 km) | Very low orbit (~300 km) | A polar orbit at ~800 km | GPS uses medium orbits at about 20 200 km altitude with periods of about 12 hours, so each satellite covers a large area.
M2@3: The net relativistic clock offset for GPS satellites is about: | +38 μs per day | −7 μs per day | 0 | +1 s per day | Weaker gravity makes the clocks gain about 45 μs per day and their speed makes them lose about 7 μs: a net gain of about 38 μs per day.
M2@2: Why must a geostationary satellite orbit at one particular height? | Its period must be exactly one day, which fixes its orbital radius | It must be beyond the reach of Earth's gravity | It must avoid the Moon's orbit | Its speed must be zero relative to the stars | T² ∝ r³ means only one radius gives a 24-hour period.
MS2@2: Which conditions must a geostationary satellite meet? | Orbit above the equator ; Period of one sidereal day ; Move in the same direction as Earth rotates | Polar orbit ; Altitude of about 400 km ; Zero speed relative to the stars | It must stay above one point: so it orbits in the equatorial plane, eastward, with a period equal to Earth's rotation period.
M3@3: A satellite's clock gains 45 μs per day from gravity and loses 7 μs from speed. Light travels about 300 m per μs. Roughly how big would the daily ranging error be uncorrected? | About 11 km | About 2 km | About 14 km | About 300 m | Net error 38 μs per day; distance = 38 × 300 m ≈ 11 km. 14 km comes from adding the two effects instead of subtracting.
SA2@1,3: A weather agency wants (a) continuous images of one hemisphere and (b) high-resolution images of the whole globe. Recommend an orbit for each and explain. | (a) A geostationary orbit: at 35 786 km over the equator with a one-day period, the satellite stays above one point and sees the same hemisphere continuously, though at low resolution because it is far away. (b) A low, sun-synchronous polar orbit at a few hundred to about 800 km: Earth turns beneath it so it scans the whole globe, it is close enough for high resolution, and it passes each place at the same local time, giving consistent lighting. | Geostationary for continuous coverage ; Equatorial, one-day period, stays above one point ; Low polar or sun-synchronous for global high resolution ; Earth rotates beneath it; consistent lighting

## Orbital energy and angular momentum
S: An orbit's total energy fixes its size (semi-major axis); its angular momentum fixes its shape. In circular orbits, kinetic energy is half the magnitude of potential energy and total energy is negative.
O: Calculate the kinetic, potential and total energy of a circular orbit
O: Explain why raising an orbit lowers the speed but raises the total energy
O: Use the effective potential to explain turning points
PRE: Gravitational potential and potential energy
PRE: Angular momentum
LV: Year 1 · Physical reasoning
H: Circular orbit energies
E: KE = GMm/(2r); U = −GMm/r; E = −GMm/(2r) = −KE :: virial theorem: 2KE = −U
H: Ellipses
E: E = −GMm/(2a)
E: L = m√(GMa(1 − e^{2}))
- For fixed energy, maximum L gives a circle; L → 0 gives a straight-line plunge.
- Effective potential U_{eff} = −GMm/r + L^{2}/(2mr^{2}): the L term acts like a centrifugal barrier; the turning points are periapsis and apoapsis.
H: Raising an orbit
P: To raise a circular orbit you add energy (fire forward), but at the new, higher orbit the speed is lower. KE falls by the same amount the total energy rises; potential energy rises by twice that.
X: A 500 kg satellite moves from r = 7000 km to 8000 km (circular). Find ΔE, ΔKE and ΔU.
> GMm = 3.99 × 10^{14} × 500 = 2.0 × 10^{17}
> E: −14.25 GJ → −12.47 GJ, ΔE = +1.78 GJ; ΔKE = −1.78 GJ; ΔU = +3.56 GJ
K: In a circular orbit E = −KE = U/2: adding energy raises the orbit, which lowers the kinetic energy.
!: Total orbital energy is negative for bound orbits; "more energy" means less negative.
P: **Investigate with the lab.** On an eccentric orbit, watch the kinetic and potential energy exchange while the total stays constant. Then give the planet escape velocity and note the total energy reaches zero.
IX: orbits
T: Virial theorem | For a bound inverse-square orbit, 2⟨KE⟩ = −⟨U⟩, so the total energy is −⟨KE⟩
T: Effective potential | U_{eff} = U + L^{2}/(2mr^{2}), which reduces orbital motion to motion in r alone
SUM: Circular orbit: KE = GMm/2r, U = −GMm/r, E = −GMm/2r.
SUM: Energy sets a; angular momentum sets e; turning points lie where E = U_{eff}.
EV: established | For bound inverse-square orbits the total energy is −GMm/(2a) and in circular orbits KE = −E = −U/2
SRC: OpenStax, University Physics Volume 1, section 13.4 "Satellite Orbits and Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
Q: State the virial theorem for circular gravitational orbits. | 2KE = −U, so E = −KE = U/2.
Q: What sets the shape of an orbit at fixed energy? | Its angular momentum (larger L means less eccentric).
M1@1: For a circular orbit, if KE = 5 GJ, the total energy is: | −5 GJ | 5 GJ | −10 GJ | 10 GJ | In a circular orbit E = −KE, so E = −5 GJ; −10 GJ is the potential energy U = −2KE.
M2@3: The L^{2}/(2mr^{2}) term in the effective potential: | Prevents the orbit reaching r = 0 | Represents the drag of the atmosphere | Is the gravitational potential energy | Is always zero for elliptical orbits | It grows as 1/r^{2}, faster than gravity's −1/r, so it acts as a centrifugal barrier keeping a body with L ≠ 0 away from the centre.
M2@1: What is the sign of the total energy of a bound orbit? | Negative | Positive | Zero | It changes sign each orbit | A bound orbit has total energy below zero; at escape velocity it reaches zero.
NUM2@1: A 1000 kg satellite is in a circular orbit of radius 7.0 × 10^{6} m about Earth (GM = 3.99 × 10^{14} m^{3} s^{-2}). What is its total energy in GJ? | -28.5 | 2% | GJ | E = −GMm/(2r) = −3.99 × 10^{14} × 1000/(1.4 × 10^{7}) = −2.85 × 10^{10} J = −28.5 GJ.
M3@2: A satellite fires its engine briefly to move to a higher circular orbit. Compared with before, its kinetic energy and total energy are: | KE lower, total energy higher | KE higher, total energy higher | KE lower, total energy lower | Both unchanged | E = −KE, so a less negative (higher) total energy means a smaller KE: the higher orbit is slower even though energy was added; U rises by twice ΔE.
SA3@2,3: A spacecraft in a circular orbit wants to catch up with a station 100 km ahead of it in the same orbit. Explain, using orbital energy, why it should first fire its engine backwards. | Firing backwards removes energy, so the spacecraft drops into a lower orbit (a smaller semi-major axis). Lower orbits have shorter periods and higher speeds, since E = −KE and T ∝ a^{3/2}. It therefore gains on the station. When it has caught up it fires forwards to raise its orbit back to the station's. Firing forwards first would raise it into a slower, higher orbit and it would fall further behind. | Retrograde burn lowers the orbit ; Lower orbit: shorter period, higher speed ; E = −KE links lower energy to higher speed ; Prograde burn later to rejoin ; Firing forwards first would make it fall behind

## Two-body gravitational problem
S: Two bodies orbiting under mutual gravity both circle their common centre of mass. Their relative motion is equivalent to one body of reduced mass orbiting a fixed centre, so Kepler's results apply exactly.
O: Reduce a two-body orbit to a one-body problem using the reduced mass
O: Find the masses and orbit sizes of a binary system from its period and separation
O: Explain how the reflex motion of a star reveals exoplanets
PRE: Centre of mass
PRE: Kepler's laws
LV: Year 1 · Application
H: Reduction to one body
E: μ = m_{1}m_{2}/(m_{1} + m_{2}); r = r_{1} − r_{2}
E: μ r̈ = −Gm_{1}m_{2} r̂/r^{2}
E: T^{2} = 4π^{2}a^{3}/(G(m_{1} + m_{2})) :: a = separation semi-major axis
- Each body's orbit about the CM is an ellipse with the same e and period, sizes in inverse ratio of masses.
H: Applications
- Binary stars: measuring both orbits gives each mass, the main way stellar masses are known.
- Exoplanets: the star's wobble (radial velocity of metres per second) reveals planets.
- Pluto–Charon: CM outside Pluto, so both visibly orbit a point in space.
X: Two stars of 2 and 1 solar masses orbit with separation 3 AU. Find the period.
> T^{2} = a^{3}/(M_{1} + M_{2}) (years, AU, solar masses) = 27/3 = 9
> T = 3 years; the 2 M_{⊙} star is 1 AU from the CM, the other 2 AU
K: Neither body is fixed: both orbit the centre of mass, and the period depends on the total mass, while the ratio of orbit sizes gives the mass ratio.
!: Kepler's third law with only the central mass, M, is an approximation; use M + m when the companion isn't negligible.
T: Reduced mass | μ = m_{1}m_{2}/(m_{1} + m_{2}), the mass used to treat two-body motion as one body orbiting a fixed point
T: Barycentre | The centre of mass of an orbiting system, about which both bodies move
SUM: Both bodies orbit the centre of mass with distances in inverse ratio to their masses.
SUM: T^{2} = 4π^{2}a^{3}/(G(m_{1} + m_{2})) gives the total mass; the orbit-size ratio splits it.
EV: established | Two gravitating bodies move on similar conic orbits about their common centre of mass, with a period fixed by their total mass and separation
SRC: OpenStax, University Physics Volume 1, section 13.4 "Satellite Orbits and Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
Q: What is the reduced mass? | μ = m_{1}m_{2}/(m_{1} + m_{2}).
Q: How do the orbits of two stars about their CM compare in size? | In inverse proportion to their masses.
M1@3: The Sun wobbles around the Solar System's CM mainly due to: | Jupiter | Earth | Mercury | Comets | Jupiter holds most of the planets' mass, and its pull moves the Sun around a barycentre just outside the Sun's surface.
M2@1: Two equal-mass stars orbit their CM. Their orbits are: | The same size, on opposite sides | Different sizes | One star is stationary | Circular only | Orbit sizes are in inverse ratio of the masses, so equal masses give equal orbits, always diametrically opposite across the CM.
NUM2@2: Two stars 4.0 AU apart orbit each other every 4.0 years. What is their total mass in solar masses? | 4 | 2% | M_{⊙} | In years, AU and solar masses, M_{1} + M_{2} = a^{3}/T^{2} = 64/16 = 4.0 solar masses.
M3@2: In a binary, star A moves on an orbit about the centre of mass three times as large as star B's. What is the ratio of their masses, m_{A}/m_{B}? | 1/3 | 3 | 9 | 1/9 | m_{A}r_{A} = m_{B}r_{B}, so the star with the larger orbit is the lighter one: m_{A}/m_{B} = r_{B}/r_{A} = 1/3.
TF2@3: An exoplanet can be detected even if it is never seen, because its star moves in a small orbit about their common centre of mass. | true | The star's reflex motion periodically Doppler-shifts its spectral lines by metres per second, revealing the planet's period and a lower limit on its mass.
SA2@1,2: Explain how astronomers can find the individual masses of two stars in a visual binary. | Measure the period T and, with the distance to the system, the semi-major axis a of the relative orbit. Newton's form of Kepler's third law, T^{2} = 4π^{2}a^{3}/(G(m_{1} + m_{2})), gives the total mass. Then measure each star's orbit about the centre of mass: since m_{1}a_{1} = m_{2}a_{2}, the ratio of the orbit sizes gives the mass ratio, and combining the sum and the ratio gives each mass. | Measure period and separation ; Third law gives the total mass ; Orbit sizes about the CM give the mass ratio ; Combine sum and ratio for each mass

## Tidal forces
S: Tidal forces arise because gravity varies across an extended body: the near side is pulled more strongly than the far side. They raise ocean tides, lock moons' rotations, heat Io's volcanoes and stretch objects falling into black holes.
O: Derive the 1/r^{3} dependence of the tidal acceleration
O: Explain two tidal bulges and spring and neap tides
O: Explain tidal locking and the Moon's recession
PRE: Gravitational field strength
LV: Year 1 · Physical reasoning
H: The tidal acceleration
E: Δg ≈ 2GMd/r^{3} :: difference across a size d at distance r from mass M
- It is the difference between GM/r^{2} at two points, so it falls as 1/r^{3}: the Moon's tidal effect on Earth is about 2.2 times the Sun's, though the Sun's pull is much stronger.
- Produces two bulges: towards and away from the Moon, hence two high tides a day (every ~12 h 25 min).
- Spring tides (Sun and Moon aligned, new and full moon) and neap tides (at right angles).
H: Tidal evolution
P: Earth's rotation drags the tidal bulge ahead of the Moon. The bulge pulls the Moon forward (it recedes ~3.8 cm a year) and the Moon pulls the bulge back (days lengthen ~2 ms per century). Most large moons, including ours, are tidally locked, always showing one face.
X: Compare the Moon's and Sun's tidal effects on Earth.
> Ratio = (M_{moon}/M_{sun})(r_{sun}/r_{moon})^{3} = (7.35 × 10^{22}/2 × 10^{30})(1.5 × 10^{11}/3.84 × 10^{8})^{3}
> = 3.7 × 10^{-8} × 6.0 × 10^{7} ≈ 2.2
K: Tides depend on the difference in gravity across a body, not on gravity's strength, which is why the nearby Moon beats the far more massive Sun.
!: Tides aren't caused by the Moon "pulling the water up" on the near side only; the far-side bulge comes from the Earth being pulled away from the water there.
T: Tidal force | The difference in gravitational force across an extended body, which stretches it along the line to the attracting mass
T: Tidal locking | The state in which a body's rotation period equals its orbital period, so it always shows the same face
T: Spring tide | An unusually large tidal range when the Sun and Moon are in line, at new and full moon
SUM: Tidal acceleration ≈ 2GMd/r^{3}; the Moon's tides on Earth are about twice the Sun's.
SUM: Tidal friction slows Earth's spin, moves the Moon outward and locks moons' rotations.
EV: established | Ocean tides result from the variation of the Moon's and Sun's gravity across the Earth, which falls as the inverse cube of distance
SRC: OpenStax, University Physics Volume 1, section 13.6 "Tidal Forces" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-6-tidal-forces
SRC: OpenStax, Astronomy 2e, section 4.6 "Ocean Tides and the Moon" | secondary | 2022 | https://openstax.org/books/astronomy-2e/pages/4-6-ocean-tides-and-the-moon
Q: Why are there two tidal bulges? | Gravity is stronger on the near side and weaker on the far side than at Earth's centre, stretching the Earth–ocean system.
Q: How does tidal force depend on distance? | As 1/r^{3}.
M1@2: Spring tides occur at: | New and full moon | First and last quarter | Only in spring | Equinoxes only | At new and full moon the Sun and Moon are in line, so their tidal bulges add, giving the largest range; "spring" has nothing to do with the season.
M2@3: Tidal friction is making the Moon: | Recede from Earth | Approach Earth | Speed up its orbit | Stop rotating | The bulge, dragged ahead by Earth's spin, pulls the Moon forward, transferring angular momentum from Earth's rotation to the Moon's orbit, so the Moon moves outward (about 3.8 cm a year).
NUM2@1: By what factor would the Moon's tidal effect on Earth increase if it were at half its present distance? | 8 | 1% |  | Tidal acceleration ∝ 1/r^{3}, so halving r multiplies it by 2^{3} = 8, whereas the ordinary pull would rise only by 4.
M3@1: The Sun's gravitational pull on Earth is about 180 times the Moon's, yet the Moon raises larger tides. Why? | Tides depend on the gradient of gravity, which falls as 1/r^{3} | The Moon is denser than the Sun | The Sun's pull is cancelled by Earth's orbital motion everywhere | Tides depend on the Moon's light, not its gravity | The tidal effect is the change of g across Earth, ∝ M/r^{3}; the Moon's closeness outweighs its small mass, giving about 2.2 times the Sun's effect.
SA3@2,3: Explain why the Earth has two tidal bulges, one facing the Moon and one on the opposite side. | The Moon's gravitational field decreases with distance. Earth's near-side ocean is pulled towards the Moon more strongly than Earth's centre, and the centre more strongly than the far-side ocean. Relative to Earth's centre, the near-side water is pulled towards the Moon and the far-side water is left behind, so both sides bulge outward along the Earth–Moon line. As Earth rotates through these bulges each place has two high tides a day. | Moon's field weakens with distance ; Near side pulled more than centre, centre more than far side ; Relative to the centre both sides bulge outward ; Rotation through two bulges gives two tides a day

## Roche limits
S: The Roche limit is the distance within which a body held together only by its own gravity is torn apart by a planet's tides. It explains why Saturn's rings are rings and not a moon.
O: Explain the Roche limit as a balance between tidal stretching and self-gravity
O: Estimate a Roche limit from the planet's radius and the two densities
O: Explain why rings, comet break-ups and ordinary objects behave as they do near a planet
PRE: Tidal forces
LV: Year 2 · Application
H: The estimate
E: d ≈ 2.44 R_{p}(ρ_{p}/ρ_{s})^{1/3} :: fluid satellite
E: d ≈ 1.26 R_{p}(ρ_{p}/ρ_{s})^{1/3} :: rigid satellite
- Denser satellites can orbit closer.
- Objects held together by material strength (rocks, spacecraft, people) can survive inside the Roche limit.
H: Examples
- Saturn's main rings lie inside its Roche limit for icy bodies: material there can't gather into a moon.
- Comet Shoemaker–Levy 9 was torn into ~21 fragments passing inside Jupiter's Roche limit (1992), and hit Jupiter in 1994.
- Mars's moon Phobos is spiralling inward and may break into a ring in ~50 million years.
X: Estimate the fluid Roche limit for an icy moon (ρ = 1000 kg m^{-3}) around Saturn (R = 58 000 km, ρ = 690 kg m^{-3}).
> d ≈ 2.44 × 58 000 × (0.69)^{1/3} = 2.44 × 58 000 × 0.88 ≈ 125 000 km
> Saturn's bright rings end at ~137 000 km: about right
K: Inside the Roche limit the planet's tidal stretching across a loose body exceeds the body's own gravity holding it together, so it cannot form or stay whole.
!: The Roche limit applies to gravitationally bound bodies; your body falling towards Earth isn't torn apart, because chemical bonds are far stronger than its self-gravity.
T: Roche limit | The orbital distance inside which a body held together only by its own gravity is pulled apart by tidal forces
T: Rubble pile | A body made of loosely bound fragments held together mainly by self-gravity
SUM: The Roche limit is about 2.44 R_{p}(ρ_{p}/ρ_{s})^{1/3} for a fluid body.
SUM: It explains planetary rings and tidal break-ups; strong solid objects can survive inside it.
EV: established | A self-gravitating body orbiting closer than about 2.4 planetary radii (for similar densities) is disrupted by tidal forces
SRC: OpenStax, University Physics Volume 1, section 13.6 "Tidal Forces" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-6-tidal-forces
SRC: OpenStax, Astronomy 2e, section 12.5 "Planetary Rings (and Enceladus)" | secondary | 2022 | https://openstax.org/books/astronomy-2e/pages/12-5-planetary-rings-and-enceladus
Q: What is the Roche limit? | The distance inside which tidal forces disrupt a body held together by its own gravity.
Q: Why can't Saturn's rings form a moon? | They lie inside the Roche limit, where tides prevent clumping.
M1@2: A denser satellite's Roche limit is: | Closer to the planet | Farther from the planet | The same | Undefined | d ∝ (ρ_{p}/ρ_{s})^{1/3}, so a denser satellite, with stronger self-gravity for its size, can survive closer in.
M2@3: Shoemaker–Levy 9 broke apart because: | It passed inside Jupiter's Roche limit | It collided with an asteroid | Solar heating boiled it apart | It was spinning too fast | In 1992 the comet, a loosely bound body, passed inside Jupiter's Roche limit and tidal forces pulled it into about 21 fragments.
NUM2@2: Estimate the fluid Roche limit, in km, for a rocky body (ρ = 3000 kg m^{-3}) approaching Earth (R = 6370 km, ρ = 5500 kg m^{-3}). | 19000 | 5% | km | d ≈ 2.44 × 6370 × (5500/3000)^{1/3} = 2.44 × 6370 × 1.22 ≈ 1.9 × 10^{4} km, about 3 Earth radii.
TF1@3: An astronaut orbiting inside Earth's Roche limit, like everyone on the ISS, is in danger of being pulled apart by tides. | false | The Roche limit applies only to bodies held together by gravity; an astronaut is held together by chemical bonds billions of times stronger than the tidal stretching.
M3@1: If a moon's density is doubled while the planet stays the same, its fluid Roche limit changes by a factor of: | 1/2^{1/3} ≈ 0.79 | 1/2 | 1/4 | 2^{1/3} ≈ 1.26 | d ∝ ρ_{s}^{-1/3}, so doubling ρ_{s} multiplies d by 2^{-1/3} = 0.79: the limit moves only a little closer.
SA3@1,3: Explain why a loose cloud of ice particles orbiting close to Saturn forms a ring rather than gathering into a moon. | For particles to clump into a moon, their mutual gravity must hold them together. Saturn's gravity is stronger on the side of a would-be clump nearer the planet than on the far side, and this tidal difference stretches the clump apart. Inside the Roche limit (about 2.4 Saturn radii for icy material) the tidal stretching exceeds the clump's self-gravity, so particles cannot stay together and remain spread in orbit around the planet as a ring. | Clumping needs self-gravity to bind particles ; Tidal force stretches a clump along the line to the planet ; Inside the Roche limit tides exceed self-gravity ; Material stays spread out as a ring

## Lagrange points
S: In a system of two orbiting masses there are five points where a small third body can orbit in step with them, the gravitational and centrifugal forces balancing in the rotating frame. Spacecraft and asteroids use them.
O: Locate the five Lagrange points of a two-body system
O: Estimate the distance of L1 and L2 from the smaller body
O: Explain which Lagrange points are stable and how spacecraft use the unstable ones
PRE: Two-body gravitational problem
PRE: Rotating reference frames
LV: Year 2 · Physical reasoning
H: The five points
- **L1**: between the bodies (Sun–Earth L1, 1.5 million km sunward: SOHO, DSCOVR solar monitors).
- **L2**: beyond the smaller body (Sun–Earth L2: JWST, Gaia, Planck).
- **L3**: opposite side of the larger body.
- **L4, L5**: 60° ahead of and behind the smaller body, forming equilateral triangles.
E: r_{L1,L2} ≈ R(m/3M)^{1/3} :: distance from the smaller body (Hill radius)
H: Stability
P: L1, L2 and L3 are unstable (saddle points of the effective potential); spacecraft use small, regular manoeuvres to stay in halo orbits around them. L4 and L5 are stable if the mass ratio M/m > 25: Jupiter's L4/L5 hold thousands of Trojan asteroids, visited by the Lucy mission.
X: Find the distance of Sun–Earth L2 from Earth.
> r ≈ 1.5 × 10^{11} × (3 × 10^{-6}/3)^{1/3} = 1.5 × 10^{11} × 0.01 = 1.5 × 10^{9} m
> 1.5 million km
K: At a Lagrange point a small body has exactly the angular speed needed to orbit with the two large bodies, because their combined pull supplies its centripetal force at that radius.
!: Lagrange points are equilibria in the rotating frame; in an inertial frame objects there are orbiting the larger body.
T: Lagrange point | One of five positions where a small body can stay fixed relative to two larger orbiting bodies
T: Halo orbit | A periodic orbit around an unstable Lagrange point, maintained by small station-keeping burns
T: Trojan | An asteroid sharing a planet's orbit near its L4 or L5 point
SUM: L1–L3 lie on the line through the two bodies and are unstable; L4 and L5 form equilateral triangles and can be stable.
SUM: L1 and L2 lie about R(m/3M)^{1/3} from the smaller body: 1.5 million km for Sun–Earth.
EV: established | A two-body system in circular orbit has five equilibrium points in the rotating frame, of which L4 and L5 are stable when the mass ratio exceeds about 25
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
SRC: OpenStax, Astronomy 2e, section 3.6 "Gravity with More Than Two Bodies" | secondary | 2022 | https://openstax.org/books/astronomy-2e/pages/3-6-gravity-with-more-than-two-bodies
Q: Why is JWST at L2? | It keeps Sun, Earth and Moon on one side for shielding and cooling, with constant geometry and continuous communications.
Q: Which Lagrange points are stable? | L4 and L5 (when the mass ratio exceeds about 25).
M1@1: The Trojan asteroids are at Jupiter's: | L4 and L5 points | L1 point, sunward | L2 point, beyond Jupiter | L3 point, across the Sun | Trojans gather 60° ahead of and behind Jupiter, at the stable triangular points L4 and L5.
M2@3: Spacecraft at L1 need station-keeping because: | L1 is an unstable equilibrium | Drag is large there | The Sun's gravity is zero there | It's inside Earth's atmosphere | L1 is a saddle point of the effective potential, so a small displacement grows; regular small burns keep a spacecraft in a halo orbit around it.
NUM2@2: Estimate the distance, in km, of the Earth–Moon L1 point from the Moon (separation 3.84 × 10^{5} km, m/M = 0.0123). | 61500 | 5% | km | r ≈ R(m/3M)^{1/3} = 3.84 × 10^{5} × (0.0041)^{1/3} = 3.84 × 10^{5} × 0.160 ≈ 6.1 × 10^{4} km.
M3@3: A Trojan asteroid is nudged slightly away from Jupiter's L4 point. What happens next? | It oscillates around L4 while sharing Jupiter's orbit | It drifts steadily further from Jupiter's orbit | It falls inwards and collides with Jupiter | It moves along the orbit to settle at L1 | Jupiter's L4 is stable because the Sun–Jupiter mass ratio (about 1000) exceeds 25: the Coriolis effect in the rotating frame turns the drift into a slow oscillation (libration) around the point.
TF2@1: The Sun–Earth L2 point lies about 1.5 million km from Earth on the side away from the Sun. | true | r ≈ R(m/3M)^{1/3} = 1.5 × 10^{11} m × 0.01 = 1.5 × 10^{9} m, in the Earth's shadow direction, where JWST orbits.
SA3@1,3: Explain why a spacecraft placed at the Sun–Earth L2 point can orbit the Sun with the same period as Earth, even though it is further from the Sun. | Further out, the Sun's pull alone would give a longer period. At L2 the spacecraft is pulled by both the Sun and Earth in the same direction (towards the Sun), so the combined force supplies the extra centripetal force needed to keep pace with Earth. The point is unstable, so the spacecraft follows a halo orbit around it with small correcting burns. | Further from the Sun normally means a longer period ; Sun and Earth pull in the same direction at L2 ; Combined pull gives the centripetal force for Earth's period ; Unstable, so station-keeping in a halo orbit

## Restricted three-body problem
S: The general three-body problem has no closed-form solution and can be chaotic. The restricted version, a tiny mass moving in the field of two massive bodies in circular orbits, is solvable enough to reveal Lagrange points, zero-velocity curves and low-energy transfer routes.
O: State the assumptions of the circular restricted three-body problem
O: Explain the Jacobi constant and zero-velocity curves
O: Describe how chaos and resonances shape orbits and mission design
PRE: Lagrange points
LV: Year 3 · Physical reasoning
H: Setup
- Two primaries in circular orbit; a test mass doesn't affect them.
- In the rotating frame there's a conserved quantity, the **Jacobi constant**: C = 2U_{eff} − v^{2}, with U_{eff} the effective potential written as a positive quantity (gravitational plus centrifugal).
- Zero-velocity curves bound the regions the test mass can reach for a given C.
H: Chaos and its uses
P: Poincaré discovered chaos studying this problem (1890): tiny changes in starting conditions lead to wildly different paths. Mission designers exploit it: the "interplanetary transport network" uses manifolds through Lagrange points to move spacecraft with very little fuel (Genesis, Japan's Hiten).
H: Other results
- Horseshoe and tadpole orbits (Saturn's co-orbital moons Janus and Epimetheus swap orbits every 4 years).
- Kirkwood gaps in the asteroid belt at resonances with Jupiter.
X: Why can a comet be captured temporarily by Jupiter?
> With a Jacobi constant just allowing passage through L1 or L2, it enters Jupiter's region
> It can loop chaotically before leaving: Shoemaker–Levy 9 was such a temporary capture
K: The Jacobi constant is the rotating-frame energy: because v^{2} cannot be negative, it marks out forbidden regions, and the necks at L1 and L2 are the gates between them.
!: The restricted problem assumes the small body has negligible mass; for comparable masses (three stars) the full problem is needed.
T: Jacobi constant | The conserved energy-like quantity of the circular restricted three-body problem in the rotating frame
T: Zero-velocity curve | The boundary where a test body's speed in the rotating frame would be zero for its Jacobi constant
T: Chaos | Deterministic motion so sensitive to initial conditions that long-term prediction is impossible in practice
SUM: The restricted problem has one conserved quantity, the Jacobi constant, which fences the test body into allowed regions.
SUM: Its motion can be chaotic; resonances and Lagrange-point gateways shape asteroid belts and low-fuel trajectories.
EV: established | The general three-body problem has no general closed-form solution and its motion can be chaotic
SRC: OpenStax, Astronomy 2e, section 3.6 "Gravity with More Than Two Bodies" | secondary | 2022 | https://openstax.org/books/astronomy-2e/pages/3-6-gravity-with-more-than-two-bodies
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
Q: What is the Jacobi constant? | The conserved energy-like quantity of the circular restricted three-body problem in the rotating frame.
Q: Who discovered chaos while studying the three-body problem? | Henri Poincaré.
M1@3: The general three-body problem: | Has no general closed-form solution | Is always periodic in the long run | Reduces exactly to Kepler's laws | Was solved in closed form by Newton | Apart from special cases, three mutually gravitating bodies have no general formula for their motion, and their orbits can be chaotic.
M2@3: Kirkwood gaps in the asteroid belt are due to: | Orbital resonances with Jupiter | Collisions between asteroids | Pressure of solar radiation | The gravity of Mars | Asteroids whose periods are simple fractions of Jupiter's receive repeated tugs at the same point of their orbit, which pump their eccentricity and clear those orbits.
TF1@1: In the restricted three-body problem the small body's gravity is assumed to have no effect on the two large bodies. | true | That assumption is what makes it "restricted": the two primaries move on fixed circular orbits, and only the test body's motion has to be found.
NUM2@3: An asteroid in the 3:1 Kirkwood gap completes three orbits for every one of Jupiter's (11.86 years). What is its orbital radius in AU? | 2.5 | 2% | AU | T = 11.86/3 = 3.95 years; a = T^{2/3} = 3.95^{0.667} = 2.50 AU.
M3@2: A spacecraft's Jacobi constant is too large for the "neck" at L1 to be open. What does this mean? | It cannot pass between the regions around the two bodies | It must crash into the larger body | It will escape to infinity | It moves on a circular orbit | A large Jacobi constant means low rotating-frame energy: the zero-velocity curves close off the L1 gateway, trapping the spacecraft in its current region.
SA2@1,3: Explain how mission designers can move spacecraft between the Earth and Moon regions using very little fuel, and what the trade-off is. | In the restricted three-body problem, a spacecraft with a Jacobi constant just low enough for the necks at L1 or L2 to open can drift through these gateways. The dynamics near the Lagrange points are chaotic, so small, precisely timed burns divert the spacecraft along paths (invariant manifolds) that carry it from one region to another with little propellant. The trade-off is time and precision: such transfers take weeks or months instead of days, and need careful navigation. | Jacobi constant chosen so the L1 or L2 neck is open ; Chaotic dynamics near Lagrange points ; Small burns redirect along low-energy paths ; Trade-off: long transfer times and precise control

## Orbital transfers
S: Changing orbit means changing velocity with rocket burns (Δv). Mission design minimises total Δv because fuel needed grows exponentially with it. Burn direction and position decide the new orbit.
O: Predict how prograde, retrograde and plane-change burns alter an orbit
O: Calculate the Δv for a plane change
O: Explain gravity assists and low-thrust propulsion
PRE: Orbital energy and angular momentum
PRE: Variable-mass systems
LV: Year 2 · Application
H: Basic manoeuvres
E: Δv = v_{e} ln(m_{0}/m_{f}) :: rocket equation: fuel needed grows exponentially with Δv
- **Prograde burn** (along velocity): raises the opposite side of the orbit.
- **Retrograde burn**: lowers the opposite side (used for de-orbiting).
- **Plane change**: Δv = 2v sin(Δi/2), very costly at high speed, so done at the slowest point.
- **Gravity assist**: a flyby of a moving planet changes the spacecraft's heliocentric velocity for free (Voyager, Cassini, Parker Solar Probe).
- **Low-thrust** (ion engines): small, continuous Δv for very efficient but slow spirals (Dawn, BepiColombo).
H: Δv budgets
- Earth surface to LEO: ~9.4 km s^{-1} including drag and gravity losses.
- LEO to GEO: ~3.9 km s^{-1}; LEO to lunar orbit: ~4 km s^{-1}; LEO to Mars transfer: ~3.6 km s^{-1}.
X: How much Δv to change a 7.7 km s^{-1} circular orbit's inclination by 10°?
> Δv = 2 × 7.7 × sin 5° = 1.34 km s^{-1}
> That's why launch sites near the equator help geostationary missions
K: A burn changes the orbit most at the opposite side: speeding up at one point raises the far point, slowing down lowers it.
!: A gravity assist doesn't break energy conservation: the spacecraft gains energy from the planet, which slows imperceptibly in its orbit.
T: Delta-v | The total change of velocity a manoeuvre needs, the currency of mission design
T: Gravity assist | A planetary flyby that changes a spacecraft's velocity relative to the Sun by exchanging momentum with the planet
T: Specific impulse | A measure of propellant efficiency, proportional to exhaust speed
SUM: Prograde burns raise the far side of an orbit, retrograde burns lower it; plane changes cost 2v sin(Δi/2).
SUM: Gravity assists borrow a planet's orbital energy; high exhaust speed means more Δv per kilogram of propellant.
EV: established | An orbit is changed by a velocity change at a point, and the propellant needed rises exponentially with the total Δv
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
SRC: OpenStax, Astronomy 2e, section 3.5 "Motions of Satellites and Spacecraft" | secondary | 2022 | https://openstax.org/books/astronomy-2e/pages/3-5-motions-of-satellites-and-spacecraft
Q: Why are plane changes expensive? | They need a velocity change proportional to orbital speed: Δv = 2v sin(Δi/2).
Q: How does a gravity assist work? | Flying past a moving planet, the spacecraft's velocity in the Sun's frame changes while its speed relative to the planet is unchanged.
M1@1: Firing a rocket prograde at periapsis raises: | Apoapsis | Periapsis | Inclination | Nothing | Adding speed at periapsis increases the orbit's energy and semi-major axis; the orbit still passes through the burn point, so the opposite side, apoapsis, rises.
M2@3: Ion engines are efficient because: | Their exhaust speed is very high | Their thrust is very large | They use no propellant at all | They need an atmosphere to push on | The rocket equation gives Δv = v_{e} ln(m_{0}/m_{f}), so a very high exhaust speed gives more Δv per kilogram of propellant, though the thrust is tiny.
NUM2@2: What Δv is needed to change the inclination of a 3.07 km s^{-1} geostationary-speed orbit by 28.5°? In km s^{-1}. | 1.51 | 2% | km s^{-1} | Δv = 2v sin(Δi/2) = 2 × 3.07 × sin 14.25° = 6.14 × 0.246 = 1.51 km s^{-1}.
M3@2: A spacecraft's engine has exhaust speed 3.0 km s^{-1}. To gain Δv = 6.0 km s^{-1}, its initial mass must be what multiple of its final mass? | About 7.4 | About 2 | About 3 | About 20 | m_{0}/m_{f} = e^{Δv/v_{e}} = e^{2} = 7.4: about 86% of the launch mass must be propellant, which is why Δv is so precious.
SEQ2@1: Put the stages of de-orbiting a satellite from a circular orbit in order. | Turn to face backwards along the orbit ; Fire a retrograde burn ; Coast on an ellipse whose periapsis is now lower ; Enter the dense atmosphere near periapsis ; Drag slows it further until it re-enters | Slowing at one point lowers the opposite side of the orbit; once periapsis is in the atmosphere, drag completes the descent.
SA3@3: Explain how a gravity assist can increase a spacecraft's speed relative to the Sun without breaking conservation of energy. | In the planet's frame the flyby is like an elastic collision: the spacecraft arrives and leaves with the same speed, only its direction changes. But the planet is moving around the Sun, so in the Sun's frame the spacecraft's velocity is its velocity relative to the planet plus the planet's velocity. Turning the relative velocity towards the planet's direction of motion increases the heliocentric speed. The energy comes from the planet, which loses an imperceptible amount of orbital energy, so total energy and momentum are conserved. | Same speed relative to the planet before and after ; Direction changed by the flyby ; Add the planet's orbital velocity in the Sun's frame ; Planet loses a tiny amount of energy

## Hohmann transfers
S: A Hohmann transfer moves a spacecraft between two circular orbits using two burns and half an elliptical orbit that touches both. It's the most fuel-efficient two-burn transfer for most orbit ratios.
O: Find the semi-major axis and duration of a Hohmann transfer
O: Calculate the two burns of a Hohmann transfer
O: Explain launch windows and when other transfers do better
PRE: Orbital transfers
PRE: Kepler's laws
LV: Year 2 · Application
H: The transfer
E: a_{t} = (r_{1} + r_{2})/2
E: Δv_{1} = √(GM/r_{1})(√(2r_{2}/(r_{1} + r_{2})) − 1)
E: Δv_{2} = √(GM/r_{2})(1 − √(2r_{1}/(r_{1} + r_{2})))
E: t = π√(a_{t}^{3}/GM) :: half the transfer orbit's period
- Burn 1 (prograde at r_{1}) puts the spacecraft on the transfer ellipse; burn 2 (prograde at r_{2}) circularises.
- Total Δv = Δv_{1} + Δv_{2}; LEO to GEO this is about 3.9 km s^{-1} before any plane change.
H: Launch windows
P: For an interplanetary Hohmann transfer the target must arrive at the meeting point when the spacecraft does, so launches happen only at particular planetary alignments: every ~26 months for Mars. Earth to Mars takes about 8.5 months.
X: Earth (1 AU) to Mars (1.52 AU) transfer time.
> a_{t} = 1.26 AU; T = a^{3/2} = 1.41 years
> Transfer = T/2 = 0.71 years ≈ 259 days
K: Both burns are prograde and tangential, where they change the orbit most efficiently: the first raises the far side to the target orbit, the second circularises there.
!: Hohmann transfers are efficient but slow; when r_{2}/r_{1} > ~11.9, a three-burn bi-elliptic transfer uses less Δv.
T: Hohmann transfer | A two-burn transfer between circular coplanar orbits along half of an ellipse tangent to both
T: Launch window | The period when the planets' positions allow a transfer to arrive at the target
T: Synodic period | The time between repeats of the same alignment of two orbiting bodies, as seen from the central body
SUM: The transfer ellipse has a = (r_{1} + r_{2})/2 and takes half its period.
SUM: Two tangential prograde burns; launches wait for the right alignment (every ~26 months for Mars).
EV: established | For most pairs of coplanar circular orbits the Hohmann transfer needs the least Δv of any two-burn transfer
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
SRC: OpenStax, Astronomy 2e, section 3.5 "Motions of Satellites and Spacecraft" | secondary | 2022 | https://openstax.org/books/astronomy-2e/pages/3-5-motions-of-satellites-and-spacecraft
Q: What is a Hohmann transfer orbit? | An ellipse tangent to both the initial and final circular orbits, needing one burn at each.
Q: How often do Earth–Mars Hohmann launch windows occur? | About every 26 months (the synodic period).
M1@1: The semi-major axis of a Hohmann transfer from r_{1} to r_{2} is: | (r_{1} + r_{2})/2 | r_{2} − r_{1} | √(r_{1}r_{2}) | r_{1}r_{2} | The transfer ellipse has periapsis r_{1} and apoapsis r_{2}, and its major axis is their sum, so a = (r_{1} + r_{2})/2.
M2@1: An Earth–Mars Hohmann transfer takes about: | 8.5 months | 3 days | 3 years | 1 month | The transfer lasts half the period of an ellipse with a = 1.26 AU: 0.71 years, about 8.5 months.
NUM2@2: For a Hohmann transfer from LEO (r = 6700 km) to GEO (r = 42 200 km) about Earth (GM = 3.99 × 10^{14} m^{3} s^{-2}), what is the first burn Δv_{1} in km s^{-1}? | 2.42 | 3% | km s^{-1} | √(GM/r_{1}) = 7.72 km s^{-1}; √(2r_{2}/(r_{1} + r_{2})) = √(84 400/48 900) = 1.314; Δv_{1} = 7.72 × 0.314 = 2.42 km s^{-1}.
M3@3: Mission planners must launch an Earth–Mars Hohmann transfer when Mars is about 44° ahead of Earth. Why? | Mars must reach the transfer's far point when the spacecraft does | The spacecraft must avoid crossing Mars's orbit early | Earth's rotation must point the launch site at Mars | The Sun's glare blocks launches at other angles | During the 259-day transfer Mars moves about 136° along its orbit; the spacecraft covers 180°, so Mars must start about 44° ahead to meet it.
SA3@2,3: Describe a Hohmann transfer from a low circular orbit to a higher one, explaining what each burn does and why the spacecraft ends up moving more slowly than it started. | The first burn, prograde at the lower orbit, adds speed so the orbit becomes an ellipse with periapsis at r_{1} and apoapsis at r_{2}. The spacecraft coasts for half an orbit, slowing as it climbs and trades kinetic for potential energy. At apoapsis it is moving slower than the circular speed there, so a second prograde burn raises the periapsis and circularises the orbit at r_{2}. Its final speed √(GM/r_{2}) is lower than the initial √(GM/r_{1}) because higher circular orbits are slower, even though energy was added. | First prograde burn at r_{1} creates the transfer ellipse ; Coast half an orbit, slowing as it climbs ; Second prograde burn at apoapsis circularises ; Final circular speed lower: higher orbits are slower

## Gravitational perturbations
S: Real orbits are perturbed by other bodies, by the non-spherical shapes of planets, by drag and by radiation pressure. Perturbation theory treats these as small corrections that slowly change the orbital elements.
H: Main perturbations
- **Third bodies**: the Moon and Sun on Earth satellites; planets on each other.
- **Oblateness (J_{2})**: Earth's equatorial bulge makes orbits' planes precess and their ellipses rotate. Exploited for sun-synchronous orbits.
- **Atmospheric drag**: shrinks low orbits.
- **Solar radiation pressure**: important for light, large spacecraft and solar sails.
- **Resonances**: repeated tugs at the same orbital phase build up effects (Kirkwood gaps, Laplace resonance of Io, Europa, Ganymede at 1:2:4).
H: Neptune
P: In 1846 Le Verrier and Adams used unexplained perturbations of Uranus to predict an unseen planet; Galle found Neptune within 1° of the prediction. Today, perturbations of distant Kuiper belt objects motivate searches for a hypothetical "Planet Nine".
X: How do you choose a sun-synchronous orbit's inclination?
> The J_{2} nodal precession rate depends on inclination and altitude
> At ~800 km, an inclination of ~98.6° (slightly retrograde) gives 360° per year, matching Earth's orbit around the Sun
!: Perturbations add up over many orbits; an effect too small to matter in one orbit can dominate over years.
Q: How was Neptune discovered? | By predicting its position from unexplained perturbations in Uranus's orbit.
Q: What is J_{2}? | The coefficient describing a planet's oblateness, the main perturbation on low satellite orbits.
M1: Io, Europa and Ganymede are in a: | 1:2:4 orbital resonance | 1:1 resonance | Random pattern | 2:3 resonance | The Laplace resonance.
M2: Solar radiation pressure matters most for: | Light, large-area spacecraft | Planets | Dense small satellites | Rockets during launch | Force ∝ area, acceleration ∝ area/mass.

## Precession of orbits
S: Under a pure inverse-square force around a point mass, an orbit's ellipse stays fixed. Any deviation (other planets, a planet's oblateness, general relativity) makes the ellipse rotate slowly: apsidal precession.
H: Causes
- Planetary perturbations: most of Mercury's 574″ per century perihelion precession.
- Oblateness of the central body.
- General relativity: an extra 43″ per century for Mercury, unexplained by Newtonian theory until Einstein (1915).
- Nodal precession: the orbital plane itself swings around (Earth satellites, the Moon's 18.6-year cycle).
H: The GR formula
E: Δφ = 6πGM/(c^{2}a(1 − e^{2})) per orbit
- Largest for close, eccentric orbits around massive objects.
- Binary pulsars precess by degrees per year; star S2 around Sgr A* showed GR precession (2020).
X: Calculate Mercury's GR precession per orbit.
> 6π × 6.67 × 10^{-11} × 2 × 10^{30}/(9 × 10^{16} × 5.79 × 10^{10} × 0.957) = 5.0 × 10^{-7} rad per orbit
> × 415 orbits per century = 2.1 × 10^{-4} rad = 43″ per century
!: Most of Mercury's precession is Newtonian (from other planets); only the 43″ residue needed new physics.
Q: How much of Mercury's perihelion precession is due to GR? | About 43 arcseconds per century.
Q: Why does an orbit precess if the force isn't exactly inverse-square? | Only the 1/r^{2} force (and the harmonic force) give closed orbits (Bertrand's theorem).
M1: The Moon's orbital plane precesses with a period of: | 18.6 years | 1 month | 26 000 years | 1 year | Nodal precession.
M2: GR precession is largest for orbits that are: | Close and eccentric around massive bodies | Distant and circular | Around light bodies | Retrograde | ∝ M/(a(1 − e^{2})).

## General relativistic corrections
S: General relativity treats gravity as curved spacetime. For weak fields it reproduces Newton, but it adds small, measurable corrections: clocks run slower deeper in gravity, light bends twice the Newtonian amount, orbits precess, and signals are delayed.
H: Key effects
E: Δt/t ≈ ΔΦ/c^{2} = gh/c^{2} :: gravitational time dilation near Earth
E: θ = 4GM/(c^{2}b) :: bending of light passing mass M at distance b (1.75″ at the Sun's edge)
- **Gravitational redshift**: light climbing out of a well loses frequency (Pound–Rebka, 1959: 22.5 m tower).
- **Shapiro delay**: radar signals passing the Sun are delayed by ~200 μs.
- **Frame dragging**: rotating masses twist spacetime (Gravity Probe B, LAGEOS).
H: Where they matter
- GPS (38 μs per day correction).
- Atomic clocks detect a height difference of ~1 cm in the gravitational potential.
- Strong fields: neutron stars, black holes, binary pulsars, gravitational waves.
X: How much faster does a clock 1 km higher run per day?
> Δt/t = 9.8 × 1000/(9 × 10^{16}) = 1.1 × 10^{-13}
> × 86 400 s ≈ 9.4 ns per day
!: GR corrections aren't "tiny so irrelevant": in GPS and precise timekeeping they're essential engineering.
Q: How much does light bend passing the edge of the Sun? | 1.75 arcseconds (twice the Newtonian prediction).
Q: What is gravitational redshift? | The decrease in frequency of light climbing out of a gravitational potential well.
M1: Which experiment first confirmed light bending? | Eddington's 1919 eclipse expedition | Michelson–Morley | Pound–Rebka | LIGO | Star positions near the eclipsed Sun shifted.
M2: A clock at a lower altitude runs: | Slower | Faster | At the same rate | Backwards | Deeper in the potential well.

## Gravitational lensing
S: Mass bends light, so a galaxy or cluster in front of a distant source acts as a lens, distorting, magnifying and multiplying its images. Lensing weighs dark matter, finds exoplanets and magnifies the most distant galaxies.
H: Regimes
- **Strong lensing**: multiple images, arcs and Einstein rings when source, lens and observer align.
- **Weak lensing**: small, statistical distortions of many background galaxy shapes; maps mass including dark matter.
- **Microlensing**: a star passing in front of another brightens it temporarily; planets around the lens star add short blips.
E: θ_{E} = √(4GM D_{ls}/(c^{2}D_{l}D_{s})) :: Einstein radius
H: Discoveries
- The Bullet Cluster: lensing mass is offset from the hot gas, strong evidence for dark matter.
- JWST and Hubble use cluster lenses to see galaxies from the first few hundred million years.
- A lensed supernova (Refsdal) reappeared on schedule, testing models and measuring the Hubble constant from time delays.
X: Why do lensed images of the same quasar flicker at different times?
> Light paths have different lengths and gravitational delays
> Measuring the delay (days to months) and the lens mass model gives distances and H_{0}
!: Gravitational lenses aren't like glass lenses: they have no single focal point, producing arcs and rings rather than sharp images.
Q: What is an Einstein ring? | A ring image formed when a source, lens and observer are exactly aligned.
Q: How does weak lensing reveal dark matter? | It measures the total mass from distortions of background galaxies, including mass that emits no light.
M1: Microlensing has been used to discover: | Exoplanets | Black hole spins | Neutrinos | Cosmic rays | Planets add brief features to lensing light curves.
M2: The Bullet Cluster is evidence for dark matter because: | Lensing mass is separated from the visible gas | It is very bright | It has no galaxies | Its light isn't bent | Most mass doesn't follow the baryons.

## Gravitational waves
S: Gravitational waves are ripples in spacetime that travel at the speed of light, produced by accelerating masses. Predicted by Einstein in 1916, they were first detected directly in 2015 by LIGO from two merging black holes.
H: Properties
- Transverse; two polarisations (+ and ×) that stretch and squeeze space at 90°.
- Strain h = ΔL/L; typical detected strains ~10^{-21}: a change of 10^{-18} m in a 4 km arm.
- Produced by changing mass quadrupoles (not monopoles or dipoles): binary systems, supernovae, the early universe.
- Carry energy away: binary pulsars spiral together at exactly GR's predicted rate (Hulse–Taylor, Nobel 1993).
H: Detection
- Laser interferometers (LIGO, Virgo, KAGRA): arms of 3–4 km, Fabry–Pérot cavities, power recycling, squeezed light, seismic isolation.
- Pulsar timing arrays detect nanohertz waves from supermassive black hole binaries (background reported in 2023).
- LISA (planned) in space for millihertz waves.
H: What we've learned
P: Over 90 mergers detected by 2023: black holes of tens of solar masses, neutron-star mergers. GW170817's merger was also seen as a gamma-ray burst and kilonova, showing gravitational waves travel at c (to 1 part in 10^{15}) and that such mergers make heavy elements like gold.
X: Estimate the arm-length change for h = 10^{-21} in LIGO.
> ΔL = hL = 10^{-21} × 4000 = 4 × 10^{-18} m
> About 1/1000 of a proton's diameter
!: Gravitational waves are not "gravity waves" in fluids (waves on water restored by gravity); they're oscillations of spacetime itself.
Q: What was the first direct detection of gravitational waves? | GW150914 by LIGO in 2015, from two merging black holes.
Q: What is gravitational-wave strain? | The fractional change in length, h = ΔL/L.
M1: Gravitational waves travel at: | The speed of light | Faster than light | The speed of sound | 0.1c | Confirmed by GW170817.
M2: The Hulse–Taylor binary pulsar provided evidence of gravitational waves because: | Its orbit shrinks at the rate GR predicts for wave emission | It emits radio waves | It's very massive | It's rotating fast | Indirect evidence via energy loss.
`;
