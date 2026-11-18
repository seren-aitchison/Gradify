// Unit 7: Gravitation and Orbital Mechanics. Format: kit/course/notes.js
export default `
## Newton's law of universal gravitation
S: Every pair of masses attracts with a force proportional to the product of their masses and inversely proportional to the square of their separation. Newton's law unified falling apples and orbiting moons under one rule.
LV: Introductory · Foundation
O: State Newton's law of gravitation and calculate gravitational forces
O: Explain the inverse-square dependence and how G was measured
PRE: Newton's laws of motion
H: The law
E: F = Gm_{1}m_{2}/r^{2}, G = 6.674 × 10^{-11} N m^{2} kg^{-2}
- Acts along the line joining the centres; always attractive.
- Spherically symmetric bodies act as if all their mass were at the centre (Newton's shell theorem).
- Gravity is the weakest fundamental force (~10^{-36} of electromagnetism between two protons) but dominates at large scales because mass has only one sign.
H: Newton's Moon test
P: The Moon is 60 Earth radii away, so gravity there should be g/3600 = 2.7 × 10^{-3} m s^{-2}. The Moon's centripetal acceleration (4π^{2}r/T^{2}, with T = 27.3 days) is exactly that, showing the same force governs both.
X: Find the force between two 1000 kg cars 2 m apart.
> F = 6.67 × 10^{-11} × 10^{6}/4 = 1.7 × 10^{-5} N: utterly negligible
!: r is measured between centres, not between surfaces.
P: **Investigate with the lab.** Launch the planet from different distances and watch its acceleration change. Check that doubling the distance makes the pull four times weaker.
IX: orbits
Q: State Newton's law of gravitation. | F = Gm_{1}m_{2}/r^{2}, attractive, along the line between centres.
Q: What does the shell theorem say? | A spherically symmetric mass attracts outside bodies as if all its mass were at its centre (and exerts no net force inside a hollow shell).
M1: If the distance between two masses triples, the force: | Falls to 1/9 | Falls to 1/3 | Triples | Is unchanged | Inverse square.
M2: Who first measured G in the laboratory? | Cavendish (1798) | Newton | Kepler | Einstein | Using a torsion balance.
M2: The distance between two masses is doubled. What happens to the gravitational force? | It falls to a quarter | It halves | It doubles | It stays the same | Newton's law is an inverse square law: F ∝ 1/r².
T: Gravitational constant | G = 6.674 × 10^{-11} N m^{2} kg^{-2}
T: Inverse-square law | A force falling as 1/r^{2}: doubling the distance quarters it
SUM: F = GMm/r^{2}, attractive, along the line between the centres.
SUM: A spherically symmetric body attracts as if all its mass were at its centre (shell theorem).
SRC: OpenStax, University Physics Volume 1, section 13.1 "Newton's Law of Universal Gravitation" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-1-newtons-law-of-universal-gravitation
SRC: Cavendish H., "Experiments to determine the density of the Earth", Philosophical Transactions of the Royal Society 88, 469–526 | primary | 1798 | https://doi.org/10.1098/rstl.1798.0022
EV: established | Newtonian gravity is accurate for weak fields and low speeds; general relativity corrects it otherwise.
Q: What happens to the gravitational force if the distance between two masses triples? | It falls to one ninth.
M3@1,2: What is the gravitational force between two 1000 kg masses 1.0 m apart? | About 6.7 × 10^{-5} N | About 6.7 × 10^{-11} N, just G | About 6.7 × 10^{-8} N, using one mass | About 6.7 × 10^{-2} N, a noticeable pull | F = GMm/r^{2} = 6.67 × 10^{-11} × 10^{6}/1 ≈ 6.7 × 10^{-5} N, which is why G is hard to measure.
SA2@1,2: Explain why the force of the Earth on an apple equals the force of the apple on the Earth, yet only the apple visibly accelerates. | Newton's third law makes the forces equal and opposite (F = GMm/r^{2} on each). But a = F/m: the apple's tiny mass gives it a = g, while the Earth's enormous mass gives it an acceleration about 10^{-25} m s^{-2}, far too small to notice. | third law: equal forces ; same F ; a = F/m ; Earth's mass makes its acceleration negligible

## Gravitational fields
S: A gravitational field is the region around a mass where other masses feel a force. Field lines show its direction; their density shows its strength. It replaces "action at a distance" with a local property of space.
LV: Introductory · Foundation
O: Describe a gravitational field with field lines and as force per unit mass
O: Distinguish radial and uniform fields
PRE: Newton's law of universal gravitation
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
!: The real Earth isn't uniform: its dense core makes g increase slightly with depth at first, peaking at the core–mantle boundary.
Q: How does g vary inside a uniform solid sphere? | Proportionally to distance from the centre.
Q: What is the gravitational field inside a hollow spherical shell? | Zero.
M1: Gravitational field lines near Earth's surface are: | Nearly parallel and evenly spaced | Circular | Radiating outward | Absent | A small region of a radial field looks uniform.
M2: Gauss's law for gravity has a minus sign because: | Gravity attracts, so the field points inward | G is negative | Mass is negative | It's a convention only | Field lines end on masses.
T: Gravitational field | The region in which a mass feels a gravitational force; g = F/m
T: Field line | A line showing the direction of the force on a test mass; closer lines mean a stronger field
SUM: Field lines point towards masses; radial far away, nearly uniform close to the surface.
SUM: Gravitational fields from several masses add as vectors.
SRC: OpenStax, University Physics Volume 1, section 13.2 "Gravitation Near Earth's Surface" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 13 | secondary | 2013
EV: established | Standard Newtonian gravity.
Q: Why can the field in a classroom be treated as uniform? | The room is tiny compared with Earth's radius, so g barely changes in size or direction across it.
M3@2,3: Where between the Earth and Moon (M_{Moon} ≈ M_{E}/81) is the net gravitational field zero? | About 0.9 of the way from Earth to Moon | Exactly halfway, by symmetry | About 0.1 of the way from Earth | Nowhere, since fields always add | GM_{E}/x^{2} = G(M_{E}/81)/(d − x)^{2} gives (d − x)/x = 1/9, so x = 0.9d.
SA2@1: Explain why field lines around a planet get further apart with distance and what this shows. | The same number of lines spreads over spheres of area 4πr^{2}, so their density falls as 1/r^{2}: the field strength falls with the inverse square of distance. | lines spread over larger spheres ; area ∝ r^{2} ; density ∝ 1/r^{2} ; field falls as inverse square

## Gravitational field strength
S: Gravitational field strength g is the force per unit mass at a point. Near the Earth's surface it's about 9.81 N kg^{-1}, numerically equal to the free-fall acceleration in m s^{-2}.
LV: Introductory · Application
O: Calculate g at a planet's surface and at height
O: Explain variations of g on Earth
PRE: Gravitational fields
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
!: Weightlessness in orbit doesn't mean zero g; it means everything around you falls with the same acceleration.
Q: Why are astronauts on the ISS weightless? | They and the station are in free fall together; g there is still about 90% of surface g.
Q: Where on Earth's surface is g largest? | At the poles.
M1: At a height equal to Earth's radius, g is: | g_{0}/4 | g_{0}/2 | g_{0} | 0 | Distance from centre doubles.
M2: A planet has twice Earth's mass and twice its radius. Surface g is: | g_{0}/2 | 2g_{0} | g_{0} | g_{0}/4 | g ∝ M/R^{2} = 2/4.
T: Gravitational field strength | g = GM/r^{2}, force per unit mass, in N kg^{-1}
T: Free-fall acceleration | The acceleration of a body under gravity alone; numerically equal to g
SUM: g = GM/r^{2} outside the planet; g ∝ r inside a uniform sphere.
SUM: On Earth g ranges from about 9.78 at the equator to 9.83 N kg^{-1} at the poles (spin and shape).
SRC: OpenStax, University Physics Volume 1, section 13.2 "Gravitation Near Earth's Surface" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-2-gravitation-near-earths-surface
SRC: NASA Goddard, Earth Fact Sheet | data | 2024 | https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
EV: established | Values are measured; local variations come from latitude, altitude and geology.
Q: At what height above Earth's surface is g a quarter of its surface value? | One Earth radius (r = 2R).
M3@2: Mars has about 0.11 Earth's mass and 0.53 Earth's radius. What is g on Mars? | About 3.8 N kg^{-1} | About 2.0 N kg^{-1}, using 0.11/0.53 | About 1.1 N kg^{-1}, using mass alone | About 20 N kg^{-1}, using 0.53^{2}/0.11 | g ∝ M/R^{2}: 9.8 × 0.11/0.53^{2} ≈ 3.8 N kg^{-1}.
SA2@1,2: Find g at the height of the ISS, 400 km above Earth (g_{surface} = 9.8 N kg^{-1}, R = 6.37 × 10^{6} m), and explain why astronauts there seem weightless. | g = 9.8 × (6.37/6.77)^{2} ≈ 8.7 N kg^{-1}, about 89% of the surface value. They seem weightless because they and the station are in free fall together, so nothing pushes on them. | g scales as 1/r^{2} ; r = 6.77 × 10^{6} m ; about 8.7 N kg^{-1} ; free fall, not absence of gravity

## Gravitational potential and potential energy
S: Gravitational potential is the work done per unit mass to bring a mass from infinity to a point. It's negative everywhere (zero at infinity), and differences in potential give the energy needed to move between places.
LV: Intermediate · Foundation
O: Define gravitational potential and potential energy, and explain why they are negative
O: Calculate energy changes for large changes in height
PRE: Gravitational field strength
H: Definitions
E: V = −GM/r :: potential (J kg^{-1})
E: U = −GMm/r :: potential energy of mass m
E: g = −dV/dr :: field is minus the potential gradient
- Equipotentials are spheres around a planet; no work is done moving along one.
- Near the surface, ΔU = mgh is a good approximation to the difference of −GMm/r values.
H: Potential wells
P: A planet sits in a potential well. To escape you must climb out: at Earth's surface V = −62.5 MJ kg^{-1}. Low orbit is about half way out in energy terms; that's why "getting to orbit is halfway to anywhere".
X: How much energy lifts a 1000 kg satellite from the surface to 400 km?
> ΔU = GMm(1/R − 1/(R + h)) = 6.67 × 10^{-11} × 6 × 10^{24} × 1000 × (1/6.37 × 10^{6} − 1/6.77 × 10^{6})
> ≈ 3.7 × 10^{9} J (mgh with g = 9.8 would give 3.9 × 10^{9} J)
!: Potential is negative and becomes less negative (increases) with height. "Higher potential" means closer to zero.
Q: Why is gravitational potential negative? | Zero is defined at infinity, and gravity is attractive, so work must be done to move away.
Q: How is field related to potential? | g = −dV/dr: the field points down the potential gradient.
M1: Earth's surface potential is about −62.5 MJ kg^{-1}. The energy to fully escape for 1 kg is: | 62.5 MJ | 9.8 J | 0 | 125 MJ | You must raise V to zero.
M2: Moving a mass along an equipotential requires: | No work | Positive work | Negative work | Infinite work | ΔV = 0.
T: Gravitational potential | V = −GM/r, work per unit mass to bring a mass from infinity to the point
T: Equipotential | A surface of constant potential; no work is done moving along it
SUM: U = −GMm/r; ΔU = mgΔh only near the surface.
SUM: g = −dV/dr: the field points down the potential gradient.
SRC: OpenStax, University Physics Volume 1, section 13.3 "Gravitational Potential Energy and Total Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-3-gravitational-potential-energy-and-total-energy
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 13 | secondary | 2013
EV: established | Standard Newtonian gravity.
Q: Why is gravitational potential negative? | Zero is defined at infinity and gravity is attractive, so work must be done to move a mass out to infinity.
M3@2,3: How much energy is needed to lift a 1000 kg satellite from Earth's surface (R) to a height R? | GMm/(2R), about 3.1 × 10^{10} J | mgR, about 6.2 × 10^{10} J | GMm/R, about 6.2 × 10^{10} J | GMm/(4R), about 1.6 × 10^{10} J | ΔU = −GMm/2R − (−GMm/R) = GMm/2R = ½mgR ≈ ½ × 1000 × 9.8 × 6.37 × 10^{6} ≈ 3.1 × 10^{10} J. mgh overestimates because g weakens.
SA2@1: Explain why no work is done moving a satellite around a circular orbit. | A circular orbit lies on an equipotential (constant r), so the potential energy doesn't change; equivalently, gravity is always perpendicular to the motion, so it does no work. | circular orbit is an equipotential ; no change in potential energy ; force perpendicular to motion ; zero work

## Escape velocity
S: Escape velocity is the minimum launch speed for an unpowered object to escape a body's gravity completely. It's set by making kinetic energy equal to the depth of the potential well.
LV: Introductory · Application
O: Derive the escape velocity from energy conservation
O: Explain what escape velocity does and doesn't mean in practice
PRE: Gravitational potential and potential energy
H: Derivation
E: ½mv_{esc}^{2} = GMm/R ⇒ v_{esc} = √(2GM/R) = √(2gR)
- Independent of the projectile's mass and launch direction (ignoring the atmosphere and obstacles).
- Earth: 11.2 km s^{-1}; Moon: 2.4; Mars: 5.0; Jupiter: 59.5; Sun's surface: 618 km s^{-1}.
H: Atmospheres
P: A gas molecule's thermal speed ~√(3kT/m). If a significant fraction of molecules exceed ~1/6 of v_{esc}, the gas leaks away over billions of years. That's why the Moon has no atmosphere and Earth has lost most of its hydrogen and helium.
H: Black holes
E: R_{s} = 2GM/c^{2} :: radius where v_{esc} would equal c (exact result in general relativity)
- Earth compressed to ~9 mm; the Sun to ~3 km.
X: Find the escape velocity from the Moon (M = 7.35 × 10^{22} kg, R = 1.74 × 10^{6} m).
> v = √(2 × 6.67 × 10^{-11} × 7.35 × 10^{22}/1.74 × 10^{6}) = 2.4 km s^{-1}
!: Rockets don't need to reach escape velocity at launch; with continuous thrust they can climb slowly. v_{esc} applies to an unpowered launch.
P: **Investigate with the lab.** Increase the launch speed until the planet never comes back. Compare that speed with the circular orbital speed at the same distance: it is √2 times larger.
IX: orbits
Q: What is the escape velocity from Earth's surface? | About 11.2 km s^{-1}.
Q: What is the Schwarzschild radius? | R_{s} = 2GM/c^{2}, the radius at which escape speed equals c.
M1: Escape velocity depends on the projectile's: | Nothing about the projectile | Mass | Shape | Charge | v_{esc} = √(2GM/R).
M2: A planet has the same density as Earth but twice its radius. Its escape velocity: | Doubles | Is the same | Halves | Quadruples | M ∝ R^{3}, so √(M/R) ∝ R.
M2: How does escape velocity compare with circular orbital speed at the same distance? | It is √2 times larger | It is the same | It is twice as large | It is half as large | v_esc = √(2GM/r) and v_orb = √(GM/r), so v_esc = √2 × v_orb.
T: Escape velocity | v_{esc} = √(2GM/R), the minimum launch speed to escape with no further thrust
SUM: ½mv^{2} = GMm/R gives v_{esc} = √(2GM/R); about 11.2 km s^{-1} for Earth, independent of mass and direction (ignoring air).
SUM: Rockets don't need to reach escape speed at launch: continued thrust does the same work.
T: Event horizon | The radius around a black hole within which even light can't escape: R_{s} = 2GM/c^{2}
SRC: OpenStax, University Physics Volume 1, section 13.3 "Gravitational Potential Energy and Total Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-3-gravitational-potential-energy-and-total-energy
SRC: NASA Goddard, Planetary Fact Sheet | data | 2024 | https://nssdc.gsfc.nasa.gov/planetary/factsheet/
EV: established | Exact Newtonian result; atmospheres add drag losses.
Q: What is Earth's escape velocity? | About 11.2 km s^{-1}.
M3@2,3: A planet has twice Earth's mass and twice its radius. How does its escape velocity compare with Earth's? | The same | Twice as large | Half as large | √2 times larger | v_{esc} ∝ √(M/R), and M/R is unchanged.
SA2@2: Explain why the Moon has no atmosphere but the Earth does. | The Moon's escape velocity is only about 2.4 km s^{-1}. Gas molecules move at a few hundred m s^{-1} on average, but some in the fast tail of the distribution exceed escape speed; on the Moon so many can escape that, over billions of years, it lost its gas. Earth's 11.2 km s^{-1} keeps all but the lightest gases. | lunar escape speed low ; molecular speed distribution has a fast tail ; gas escapes over long times ; Earth's higher escape speed retains it

## Orbital velocity
S: A satellite in a circular orbit falls continuously around the planet: gravity supplies exactly the centripetal force needed at its speed. Orbital speed falls with distance, and is 1/√2 of the escape speed at the same radius.
LV: Introductory · Application
O: Derive the speed and period of a circular orbit
O: Calculate the radius of a geostationary orbit
PRE: Centripetal acceleration and force
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
!: Higher orbits are slower, though they have more total energy. To catch up with a spacecraft ahead of you in orbit, you first slow down to drop lower.
P: **Investigate with the lab.** Put the planet in a circular orbit (eccentricity below 0.02). Then start it further out and find the circular speed again: it is lower.
IX: orbits
Q: What is the orbital speed of a circular orbit of radius r? | v = √(GM/r).
Q: How do orbital and escape speeds at the same radius compare? | v_{esc} = √2 v_{orb}.
M1: A satellite moves to an orbit 4 times larger in radius. Its speed: | Halves | Doubles | Quarters | Stays the same | v ∝ 1/√r.
M2: The period of a geostationary orbit is: | One sidereal day (23 h 56 min) | 24 h exactly | 12 h | 90 min | It matches Earth's rotation relative to the stars.
M2: How does circular orbital speed change with distance from the star? | It decreases as 1/√r | It increases as √r | It is the same at every distance | It increases as r² | v = √(GM/r), so more distant orbits are slower.
T: Orbital velocity | v = √(GM/r), the speed of a circular orbit at radius r
T: Geostationary orbit | An equatorial orbit with a 24-hour (sidereal day) period, staying above one point
SUM: GMm/r^{2} = mv^{2}/r gives v = √(GM/r) and T = 2π√(r^{3}/GM).
SUM: Higher orbits are slower; v_{esc} = √2 × v_{orbit} at the same radius.
SRC: OpenStax, University Physics Volume 1, section 13.4 "Satellite Orbits and Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy
SRC: Curtis H. D., Orbital Mechanics for Engineering Students, 3rd edition, Butterworth-Heinemann | secondary | 2014
EV: established | Exact for circular orbits around a spherical body.
Q: What is the speed of a low Earth orbit near the surface? | About 7.9 km s^{-1}.
M3@2,3: What is the radius of a geostationary orbit (GM_{E} = 3.99 × 10^{14} m^{3} s^{-2}, T = 86 164 s)? | About 4.2 × 10^{7} m | About 3.6 × 10^{7} m, the height not the radius | About 6.4 × 10^{6} m, Earth's radius | About 3.8 × 10^{8} m, the Moon's distance | r^{3} = GMT^{2}/4π^{2} ≈ 7.5 × 10^{22} m^{3}, r ≈ 4.22 × 10^{7} m (about 35 800 km above the surface).
SA2@1,2: Show that a satellite's orbital speed doesn't depend on its own mass. | Gravity provides the centripetal force: GMm/r^{2} = mv^{2}/r. The satellite's mass m cancels, leaving v = √(GM/r), which depends only on the planet's mass and the orbit radius. | gravity provides centripetal force ; equation written ; m cancels ; v = √(GM/r)

## Circular and elliptical orbits
S: Bound orbits under an inverse-square force are ellipses with the central body at one focus; a circle is the special case of zero eccentricity. Unbound orbits are parabolas or hyperbolas.
LV: Intermediate · Foundation
O: Describe elliptical orbits by semi-major axis and eccentricity
O: Explain how speed varies around an elliptical orbit
PRE: Orbital velocity
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
!: The Sun is at a focus of the ellipse, not at its centre.
P: **Investigate with the lab.** Make an ellipse with eccentricity above 0.6 and watch the planet speed up near the star and slow down far away.
IX: orbits
Q: What is the vis-viva equation? | v^{2} = GM(2/r − 1/a).
Q: What decides whether an orbit is bound? | Its total energy: negative energy means a bound ellipse.
M1: An orbit with e = 0 is: | A circle | A parabola | A hyperbola | A straight line | Zero eccentricity.
M2: Where is an orbiting body fastest? | At periapsis | At apoapsis | Everywhere the same | At the end of the minor axis | Angular momentum conservation.
M2: Where is a planet on an elliptical orbit moving fastest? | At closest approach to the star | At its furthest point from the star | Halfway along the orbit | It moves at constant speed | Angular momentum is conserved, so the planet moves fastest where it is closest.
T: Eccentricity | e, how elongated an ellipse is: 0 for a circle, close to 1 for a very long ellipse
T: Periapsis and apoapsis | The closest and furthest points of an orbit from the central body
SUM: Bound orbits are ellipses with the central body at one focus; speed is greatest at periapsis.
SUM: The vis-viva equation v^{2} = GM(2/r − 1/a) gives the speed anywhere on the orbit.
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, chapter 2, Cambridge University Press | secondary | 1999
SRC: Curtis H. D., Orbital Mechanics for Engineering Students, 3rd edition, chapter 2, Butterworth-Heinemann | secondary | 2014
EV: established | Exact for the two-body inverse-square problem.
Q: What is the shape of an unbound orbit with exactly escape energy? | A parabola (e = 1); above escape energy, a hyperbola.
M3@2,3: A comet's perihelion distance is 1 AU and its aphelion is 9 AU. What is its speed ratio at perihelion to aphelion? | 9 | 3, from √9 | 81, from 9^{2} | 1, since energy is conserved | Angular momentum: r_{p}v_{p} = r_{a}v_{a} at the two ends, so v_{p}/v_{a} = r_{a}/r_{p} = 9.
SA2@1: Explain why a satellite fired horizontally slightly faster than circular speed goes into an elliptical orbit. | With more than circular speed, gravity can't bend its path into a circle at that radius, so it climbs. As it rises it slows (converting kinetic to potential energy) until, at the far side, it falls back. The launch point becomes the periapsis of an ellipse. | more than circular speed ; gravity insufficient to curve it at that radius ; rises and slows ; launch point is periapsis

## Kepler's laws
S: Kepler found three laws in Tycho Brahe's planetary data; Newton showed they follow from an inverse-square gravitational force. They still describe moons, exoplanets and binary stars.
LV: Introductory · Foundation
O: State Kepler's three laws
O: Derive the third law for circular orbits and use it to find periods and masses
PRE: Circular and elliptical orbits
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
!: The third law in its simple form T^{2} ∝ a^{3} compares bodies orbiting the same central mass; Earth's satellites and the planets have different constants.
P: **Investigate with the lab.** Try orbits of two sizes and compare T² with a³. Then check equal areas in equal times on an eccentric orbit.
IX: orbits
Q: What does Kepler's second law express physically? | Conservation of angular momentum.
Q: How can Kepler's third law measure a star's mass? | From a planet's period and orbit size: M = 4π^{2}a^{3}/(GT^{2}).
M1: A planet at 4 AU has a period of: | 8 years | 4 years | 16 years | 2 years | T = a^{3/2}.
M2: Kepler's laws were derived from observations by: | Tycho Brahe | Galileo | Copernicus | Ptolemy | Kepler analysed Tycho's precise data.
M2: One planet's orbit has four times the semi-major axis of another's. How do their periods compare? | Eight times longer | Four times longer | Sixteen times longer | Twice as long | Kepler's third law: T² ∝ a³, so T ∝ a^{1.5} = 4^{1.5} = 8.
T: Semi-major axis | a, half the longest diameter of an ellipse: the orbit's average size
T: Kepler's third law | T^{2} = 4π^{2}a^{3}/GM, so T^{2} ∝ a^{3} for bodies orbiting the same mass
SUM: 1: ellipses with the Sun at a focus. 2: equal areas in equal times. 3: T^{2} ∝ a^{3}.
SUM: The third law weighs the central body: M = 4π^{2}a^{3}/(GT^{2}).
SRC: Kepler J., Harmonices Mundi, Linz (the third law) | primary | 1619
SRC: OpenStax, University Physics Volume 1, section 13.5 "Kepler's Laws of Planetary Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-5-keplers-laws-of-planetary-motion
EV: established | Kepler's laws follow from Newtonian gravity for a dominant central mass; small corrections come from other planets and relativity.
Q: Which conservation law gives Kepler's second law? | Conservation of angular momentum.
M3@2: An asteroid's semi-major axis is 4.0 AU. What is its orbital period? | 8.0 years | 4.0 years, the same as a | 16 years, from a^{2} | 2.0 years, from √a | T^{2} = a^{3} in years and AU: T = √64 = 8.0 years.
SA2@2: Use the Moon (a = 3.84 × 10^{8} m, T = 27.3 days) to estimate the mass of the Earth. | T = 27.3 × 86 400 ≈ 2.36 × 10^{6} s. M = 4π^{2}a^{3}/(GT^{2}) = 39.5 × 5.66 × 10^{25}/(6.67 × 10^{-11} × 5.57 × 10^{12}) ≈ 6.0 × 10^{24} kg. | convert T to seconds ; M = 4π^{2}a^{3}/(GT^{2}) ; substitute ; about 6.0 × 10^{24} kg

## Satellite motion
S: Satellites are placed in orbits chosen for their purpose: low orbits for imaging and the ISS, sun-synchronous polar orbits for Earth observation, medium orbits for navigation, and geostationary orbits for communications and weather.
LV: Introductory · Application
O: Compare low, medium, polar, sun-synchronous and geostationary orbits
O: Choose an orbit for a given purpose
PRE: Kepler's laws
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
!: Drag on a satellite makes it speed up, not slow down: it drops to a lower orbit where the orbital speed is higher.
P: **Investigate with the lab.** Find the circular orbit for a satellite close in, then one further out, and compare their periods.
IX: orbits
Q: Why are Earth observation satellites often sun-synchronous? | So they pass over each place at the same local solar time, giving consistent lighting.
Q: What happens to a LEO satellite's speed as drag lowers its orbit? | It increases.
M1: GPS satellites orbit in: | Medium Earth orbit (~20 000 km) | Geostationary orbit | LEO | Polar LEO only | About 12-hour orbits.
M2: The net relativistic clock offset for GPS satellites is about: | +38 μs per day | −7 μs per day | 0 | +1 s per day | Gravitational blueshift exceeds velocity time dilation.
M2: Why must a geostationary satellite orbit at one particular height? | Its period must be exactly one day, which fixes its orbital radius | It must be beyond the reach of Earth's gravity | It must avoid the Moon's orbit | Its speed must be zero relative to the stars | T² ∝ r³ means only one radius gives a 24-hour period.
T: Low Earth orbit | An orbit roughly 200–2000 km up, with periods of about 90–130 minutes
T: Sun-synchronous orbit | A near-polar orbit whose plane precesses once a year, so it crosses each latitude at the same local time
SUM: LEO: imaging, the ISS, low latency. MEO: navigation (GPS ~20 200 km). GEO: communications and weather.
SUM: Polar and sun-synchronous orbits see the whole Earth as it turns beneath them.
SRC: Curtis H. D., Orbital Mechanics for Engineering Students, 3rd edition, chapter 4, Butterworth-Heinemann | secondary | 2014
SRC: European Space Agency, "Types of orbits" | guidance | 2020 | https://www.esa.int/Enabling_Support/Space_Transportation/Types_of_orbits
EV: established | Standard orbital engineering.
Q: Why are communications satellites placed in geostationary orbit? | They stay over one point, so fixed dishes on the ground can point at them.
M3@2,3: Why does a geostationary satellite give about a quarter-second delay on a phone call? | The signal travels about 4 × 35 800 km up and down twice, at the speed of light | Its onboard electronics process and store each signal for about 0.25 s | Its high orbital speed stretches the signal out by about a quarter second | The ionosphere slows radio waves to about a quarter of the speed of light | Up and down for each direction: ~143 000 km at 3 × 10^{8} m s^{-1} ≈ 0.48 s round trip, about 0.24 s one way.
SA2@1,2: Explain why imaging satellites use low orbits while GPS satellites use medium orbits. | Imaging needs fine detail, so the satellite should be close: low orbits give high resolution. GPS needs each satellite to be visible over a large area for long periods with a manageable number of satellites; higher MEO orbits cover more of the Earth each, so about 24–31 satellites give global coverage. | imaging needs closeness for resolution ; low orbit ; navigation needs wide coverage ; medium orbit with fewer satellites

## Orbital energy and angular momentum
S: An orbit's total energy fixes its size (semi-major axis); its angular momentum fixes its shape. In circular orbits, kinetic energy is half the magnitude of potential energy and total energy is negative.
LV: Intermediate · Application
O: Calculate kinetic, potential and total energy of an orbit
O: Explain why a satellite speeds up when drag lowers its orbit
PRE: Orbital velocity
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
!: Total orbital energy is negative for bound orbits; "more energy" means less negative.
P: **Investigate with the lab.** On an eccentric orbit, watch the kinetic and potential energy exchange while the total stays constant. Then give the planet escape velocity and note the total energy reaches zero.
IX: orbits
Q: State the virial theorem for circular gravitational orbits. | 2KE = −U, so E = −KE = U/2.
Q: What sets the shape of an orbit at fixed energy? | Its angular momentum (larger L means less eccentric).
M1: For a circular orbit, if KE = 5 GJ, the total energy is: | −5 GJ | 5 GJ | −10 GJ | 10 GJ | E = −KE.
M2: The L^{2}/(2mr^{2}) term in the effective potential: | Prevents the orbit reaching r = 0 | Represents drag | Is the gravitational PE | Is always zero | It's a centrifugal barrier.
M2: What is the sign of the total energy of a bound orbit? | Negative | Positive | Zero | It changes sign each orbit | A bound orbit has total energy below zero; at escape velocity it reaches zero.
T: Bound orbit | An orbit with negative total energy
T: Specific orbital energy | Total energy per unit mass: −GM/(2a)
SUM: Circular orbit: KE = GMm/2r, PE = −GMm/r, total E = −GMm/2r = −KE.
SUM: Total energy fixes the semi-major axis; angular momentum fixes the shape.
SRC: OpenStax, University Physics Volume 1, section 13.4 "Satellite Orbits and Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-4-satellite-orbits-and-energy
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, chapter 2, Cambridge University Press | secondary | 1999
EV: established | Exact for two-body orbits.
Q: What is the sign of a bound orbit's total energy? | Negative.
M3@2,3: Air drag slowly lowers a satellite's circular orbit. What happens to its speed? | It increases: falling releases twice as much potential energy as drag removes | It decreases, because drag removes kinetic energy every orbit | It stays the same, because orbital speed is fixed at launch | It drops towards zero as it nears the denser lower atmosphere | Total E = −KE; drag makes E more negative, so KE rises: the "satellite drag paradox".
SA2@2: A 1000 kg satellite moves from a 7000 km to an 8000 km radius circular orbit. How much energy is needed (GM = 3.99 × 10^{14} m^{3} s^{-2})? | ΔE = −GMm/2 × (1/r_{2} − 1/r_{1}) = 3.99 × 10^{17}/2 × (1/7.0 × 10^{6} − 1/8.0 × 10^{6}) ≈ 2.0 × 10^{17} × 1.79 × 10^{-8} ≈ 3.6 × 10^{9} J. | E = −GMm/2r ; difference between orbits ; substitute ; about 3.6 × 10^{9} J

## Two-body gravitational problem
S: Two bodies orbiting under mutual gravity both circle their common centre of mass. Their relative motion is equivalent to one body of reduced mass orbiting a fixed centre, so Kepler's results apply exactly.
LV: Intermediate · Foundation
O: Reduce a two-body problem to a one-body problem with the reduced mass
O: Explain how stellar wobble reveals exoplanets
PRE: Orbital energy and angular momentum
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
!: Kepler's third law with only the central mass, M, is an approximation; use M + m when the companion isn't negligible.
Q: What is the reduced mass? | μ = m_{1}m_{2}/(m_{1} + m_{2}).
Q: How do the orbits of two stars about their CM compare in size? | In inverse proportion to their masses.
M1: The Sun wobbles around the Solar System's CM mainly due to: | Jupiter | Earth | Mercury | Comets | Jupiter has most of the planetary mass.
M2: Two equal-mass stars orbit their CM. Their orbits are: | The same size, on opposite sides | Different sizes | One star is stationary | Circular only | Equal masses ⇒ symmetric orbits.
T: Reduced mass | μ = m_{1}m_{2}/(m_{1} + m_{2}), the effective mass of the equivalent one-body problem
T: Barycentre | The centre of mass of an orbiting system, about which both bodies move
SUM: Both bodies orbit the barycentre; Kepler's third law becomes T^{2} = 4π^{2}a^{3}/G(m_{1} + m_{2}).
SUM: A planet makes its star wobble; Doppler shifts reveal the wobble (the radial-velocity method).
SRC: Goldstein H., Poole C., Safko J., Classical Mechanics, 3rd edition, chapter 3, Addison-Wesley | secondary | 2002
SRC: Mayor M., Queloz D., "A Jupiter-mass companion to a solar-type star", Nature 378, 355–359 | primary | 1995 | https://doi.org/10.1038/378355a0
EV: established | Exact for two point (or spherical) masses.
Q: Where is the Earth–Moon barycentre? | About 4700 km from Earth's centre, inside the Earth.
M3@2,3: The Sun–Jupiter barycentre lies just outside the Sun's surface. Roughly what is Jupiter's mass compared with the Sun's? | About 1/1000 | About 1/10 | About 1/100 000 | About 1/10^{7} | The barycentre is at a × m_{J}/(M + m_{J}); with a ≈ 7.8 × 10^{11} m and the Sun's radius ≈ 7 × 10^{8} m, m_{J}/M ≈ 10^{-3}.
SA2@1,2: Explain how the radial-velocity method detected the first exoplanet around a Sun-like star. | The planet and star both orbit their barycentre, so the star moves towards and away from us periodically. That motion Doppler-shifts its spectral lines. Mayor and Queloz measured a 4.2-day periodic shift of about 50 m s^{-1} in 51 Pegasi, implying a Jupiter-mass planet in a tight orbit. | star orbits the barycentre ; periodic Doppler shift ; period and amplitude measured ; implies planet mass and orbit

## Tidal forces
S: Tidal forces arise because gravity varies across an extended body: the near side is pulled more strongly than the far side. They raise ocean tides, lock moons' rotations, heat Io's volcanoes and stretch objects falling into black holes.
LV: Intermediate · Application
O: Explain tides as the difference in gravitational pull across a body
O: Show that tidal force falls as 1/r^{3}
PRE: Gravitational field strength
H: The tidal acceleration
E: Δg ≈ 2GMd/r^{3} :: difference across a size d at distance r from mass M
- Falls as 1/r^{3}: the Moon's tidal effect on Earth is about 2.2 times the Sun's, though the Sun's pull is much stronger.
- Produces two bulges: towards and away from the Moon, hence two high tides a day (every ~12 h 25 min).
- Spring tides (Sun and Moon aligned, new and full moon) and neap tides (at right angles).
H: Tidal evolution
P: Earth's rotation drags the tidal bulge ahead of the Moon. The bulge pulls the Moon forward (it recedes ~3.8 cm a year) and the Moon pulls the bulge back (days lengthen ~2 ms per century). Most large moons, including ours, are tidally locked, always showing one face.
X: Compare the Moon's and Sun's tidal effects on Earth.
> Ratio = (M_{moon}/M_{sun})(r_{sun}/r_{moon})^{3} = (7.35 × 10^{22}/2 × 10^{30})(1.5 × 10^{11}/3.84 × 10^{8})^{3}
> = 3.7 × 10^{-8} × 6.0 × 10^{7} ≈ 2.2
!: Tides aren't caused by the Moon "pulling the water up" on the near side only; the far-side bulge comes from the Earth being pulled away from the water there.
Q: Why are there two tidal bulges? | Gravity is stronger on the near side and weaker on the far side than at Earth's centre, stretching the Earth–ocean system.
Q: How does tidal force depend on distance? | As 1/r^{3}.
M1: Spring tides occur at: | New and full moon | First and last quarter | Only in spring | Equinoxes only | Sun and Moon aligned.
M2: Tidal friction is making the Moon: | Recede from Earth | Approach Earth | Speed up its orbit | Stop rotating | Angular momentum moves from Earth's spin to the Moon's orbit.
T: Tidal force | The difference between the gravitational pull on different parts of an extended body
T: Tidal locking | When tidal friction makes a body's spin match its orbit, so it always shows one face
SUM: Tidal acceleration ≈ 2GMΔr/r^{3}, stretching the body along the line to the attractor.
SUM: Two bulges give two high tides a day; the Moon's tide is about twice the Sun's.
SRC: OpenStax, University Physics Volume 1, section 13.6 "Tidal Forces" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/13-6-tidal-forces
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, chapter 4, Cambridge University Press | secondary | 1999
EV: established | The equilibrium tide theory is standard; real tides are shaped by ocean basins and coastlines.
Q: Why does the Moon cause bigger tides than the much more massive Sun? | Tidal force goes as M/r^{3}; the Moon is so much closer that it wins by about a factor of two.
M3@2,3: Using tide ∝ M/r^{3}, how does the Sun's tide (M ≈ 2.7 × 10^{7} M_{Moon}, r ≈ 390 r_{Moon}) compare with the Moon's? | About 0.46 times as strong | About 180 times as strong, from M/r^{2} | About 7 × 10^{4} times as strong, from M/r | About equal, as their sizes in the sky match | 2.7 × 10^{7}/390^{3} = 2.7 × 10^{7}/5.9 × 10^{7} ≈ 0.46.
SA2@1: Explain why there are high tides on both the side of the Earth facing the Moon and the opposite side. | The Moon pulls the near side more strongly than Earth's centre, and the centre more strongly than the far side. Relative to the centre, the near side is pulled towards the Moon and the far side is "left behind", away from it. Both sides bulge outwards. | pull falls with distance ; near side pulled more than centre ; far side pulled less ; bulges on both sides

## Roche limits
S: The Roche limit is the distance within which a body held together only by its own gravity is torn apart by a planet's tides. It explains why Saturn's rings are rings and not a moon.
LV: Intermediate · Application
O: Explain the Roche limit from tidal and self-gravity forces
O: Use it to explain planetary rings
PRE: Tidal forces
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
!: The Roche limit applies to gravitationally bound bodies; your body falling towards Earth isn't torn apart, because chemical bonds are far stronger than its self-gravity.
Q: What is the Roche limit? | The distance inside which tidal forces disrupt a body held together by its own gravity.
Q: Why can't Saturn's rings form a moon? | They lie inside the Roche limit, where tides prevent clumping.
M1: A denser satellite's Roche limit is: | Closer to the planet | Farther from the planet | The same | Undefined | d ∝ (ρ_{p}/ρ_{s})^{1/3}.
M2: Shoemaker–Levy 9 broke apart because: | It passed inside Jupiter's Roche limit | It hit an asteroid | Solar heating | Its rotation was too fast | Tidal disruption.
T: Roche limit | The distance within which a body held together by its own gravity is torn apart by tides
SUM: For a fluid satellite, d ≈ 2.44R(ρ_{planet}/ρ_{satellite})^{1/3}; for a rigid one, about 1.26R(…)^{1/3}.
SUM: Saturn's main rings lie largely inside its Roche limit, where moons can't form.
T: Tensile strength | The internal strength that lets small rocky bodies or spacecraft survive inside the Roche limit
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, chapter 4, Cambridge University Press | secondary | 1999
SRC: Asphaug E., Benz W., "Size, density, and structure of comet Shoemaker–Levy 9 inferred from the physics of tidal breakup", Icarus 121, 225–248 | primary | 1996 | https://doi.org/10.1006/icar.1996.0083
EV: established | The Roche formula is idealised; real breakup distances depend on structure and strength.
Q: Why isn't the ISS torn apart inside Earth's Roche limit? | It is held together by its structural strength, not by its own gravity.
M3@2,3: How does the fluid Roche limit change if a satellite is eight times less dense? | It doubles | It is eight times larger | It halves | It is unchanged | d ∝ (ρ_{planet}/ρ_{satellite})^{1/3}; a factor 8 in density ratio gives 8^{1/3} = 2.
SA2@1,2: Comet Shoemaker–Levy 9 broke into fragments in 1992 before hitting Jupiter in 1994. Explain why. | It passed within Jupiter's Roche limit. A comet is a loosely bound rubble pile held mainly by its own weak gravity, so Jupiter's tidal stretching exceeded that self-gravity and pulled it into a string of fragments, which later struck Jupiter. | close pass within the Roche limit ; comet weakly bound by self-gravity ; tidal force exceeded it ; broke into fragments

## Lagrange points
S: In a system of two orbiting masses there are five points where a small third body can orbit in step with them, the gravitational and centrifugal forces balancing in the rotating frame. Spacecraft and asteroids use them.
LV: Intermediate · Foundation
O: Locate the five Lagrange points of a two-body system
O: Explain which are stable and how spacecraft use them
PRE: Two-body gravitational problem
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
!: Lagrange points are equilibria in the rotating frame; in an inertial frame objects there are orbiting the larger body.
Q: Why is JWST at L2? | It keeps Sun, Earth and Moon on one side for shielding and cooling, with constant geometry and continuous communications.
Q: Which Lagrange points are stable? | L4 and L5 (when the mass ratio exceeds about 25).
M1: The Trojan asteroids are at Jupiter's: | L4 and L5 | L1 | L2 | L3 | Stable triangle points.
M2: Spacecraft at L1 need station-keeping because: | L1 is an unstable equilibrium | Drag is large there | The Sun's gravity is zero there | It's inside Earth's atmosphere | Small displacements grow.
T: Lagrange point | A point where a small body can stay fixed relative to two orbiting masses
T: Halo orbit | An orbit around an unstable Lagrange point, kept with small station-keeping burns
SUM: L1, L2, L3 lie on the line through both masses and are unstable; L4 and L5 form equilateral triangles and are stable when the mass ratio exceeds about 25.
SUM: Sun–Earth L1 suits solar observatories (SOHO); L2 suits telescopes (JWST); Jupiter's L4/L5 hold the Trojan asteroids.
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, chapter 3, Cambridge University Press | secondary | 1999
SRC: NASA, "What is a Lagrange Point?" | guidance | 2018 | https://science.nasa.gov/resource/what-is-a-lagrange-point/
EV: established | Standard celestial mechanics; L4/L5 stability holds for mass ratios above about 24.96.
Q: Why is JWST at the Sun–Earth L2 point? | It stays behind Earth relative to the Sun, so one sunshield blocks Sun, Earth and Moon, keeping it cold.
M3@2,3: Why do objects collect at L4 and L5 of Jupiter but not at L1 or L2? | L4 and L5 are stable for Sun–Jupiter, so small pushes don't remove bodies; L1 and L2 are unstable | L1 and L2 lie too close to Jupiter for asteroids to reach them at all | Jupiter's gravity is exactly zero at L4 and L5, so nothing pulls them away | Only L4 and L5 are points where the Sun's and Jupiter's pulls balance | At L4/L5 the Coriolis effect keeps disturbed bodies circling nearby; at L1/L2 a small push grows.
SA2@2: Explain why the Sun–Earth L1 point lies slightly closer to the Sun than Earth but still orbits in one year. | An object closer to the Sun would normally orbit faster. At L1 Earth's gravity pulls outward, partly cancelling the Sun's pull, so the net inward force is exactly what's needed for a one-year orbit at that smaller radius. | normally a smaller orbit is faster ; Earth's pull opposes the Sun's ; reduced net force ; period matches one year

## Restricted three-body problem
S: The general three-body problem has no closed-form solution and can be chaotic. The restricted version, a tiny mass moving in the field of two massive bodies in circular orbits, is solvable enough to reveal Lagrange points, zero-velocity curves and low-energy transfer routes.
LV: Advanced · Foundation
O: Describe the circular restricted three-body problem and the Jacobi integral
O: Explain why the general three-body problem can be chaotic
PRE: Lagrange points
H: Setup
- Two primaries in circular orbit; a test mass doesn't affect them.
- In the rotating frame there's a conserved quantity, the **Jacobi constant**: C = 2U_{eff} − v^{2}.
- Zero-velocity curves bound the regions the test mass can reach for a given C.
H: Chaos and its uses
P: Poincaré discovered chaos studying this problem (1890): tiny changes in starting conditions lead to wildly different paths. Mission designers exploit it: the "interplanetary transport network" uses manifolds through Lagrange points to move spacecraft with very little fuel (Genesis, Japan's Hiten).
H: Other results
- Horseshoe and tadpole orbits (Saturn's co-orbital moons Janus and Epimetheus swap orbits every 4 years).
- Kirkwood gaps in the asteroid belt at resonances with Jupiter.
X: Why can a comet be captured temporarily by Jupiter?
> With a Jacobi constant just allowing passage through L1 or L2, it enters Jupiter's region
> It can loop chaotically before leaving: Shoemaker–Levy 9 was such a temporary capture
!: The restricted problem assumes the small body has negligible mass; for comparable masses (three stars) the full problem is needed.
Q: What is the Jacobi constant? | The conserved energy-like quantity of the circular restricted three-body problem in the rotating frame.
Q: Who discovered chaos while studying the three-body problem? | Henri Poincaré.
M1: The general three-body problem: | Has no general closed-form solution | Is always periodic | Reduces to Kepler's laws | Was solved by Newton | It can be chaotic.
M2: Kirkwood gaps in the asteroid belt are due to: | Orbital resonances with Jupiter | Collisions | Solar radiation | Mars's gravity | Resonant perturbations clear orbits.
T: Restricted three-body problem | A massless body moving in the field of two masses on circular orbits
T: Jacobi integral | The conserved quantity in the rotating frame of the restricted problem
T: Zero-velocity curve | The boundary the Jacobi integral sets on where the small body can go
SUM: In the rotating frame the effective potential has five stationary points: the Lagrange points.
SUM: The general three-body problem has no closed-form solution and can be chaotic (Poincaré).
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, chapter 3, Cambridge University Press | secondary | 1999
SRC: Szebehely V., Theory of Orbits: The Restricted Problem of Three Bodies, Academic Press | secondary | 1967
EV: established | Poincaré's results on non-integrability are proven; chaos is confirmed numerically.
Q: Who showed that the three-body problem has no general closed-form solution? | Henri Poincaré (1890s).
M3@2,3: Why do mission designers use the restricted problem rather than pure two-body orbits near the Moon? | Earth and Moon both matter there, so two-body ellipses give badly wrong paths | Two-body orbits don't exist near the Moon | The restricted problem has a simple closed-form solution | Spacecraft mass is too large for two-body orbits | Near the Moon both bodies' gravity is comparable; low-energy transfers and halo orbits only appear in the three-body model.
SA2@1,2: Explain what the Jacobi integral tells a spacecraft designer. | In the rotating frame, the Jacobi constant is conserved and combines kinetic energy and the effective potential. For a given value, zero-velocity curves mark regions the craft can't enter; changing the value with a burn opens "gates" near L1 or L2, setting which regions it can travel between. | conserved in the rotating frame ; defines zero-velocity curves ; forbidden regions ; gates open at L1/L2 with enough energy

## Orbital transfers
S: Changing orbit means changing velocity with rocket burns (Δv). Mission design minimises total Δv because fuel needed grows exponentially with it. Burn direction and position decide the new orbit.
LV: Intermediate · Application
O: Explain why orbital changes are measured in Δv
O: Compare transfer strategies and plane changes
PRE: Variable-mass systems
H: Basic manoeuvres
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
!: A gravity assist doesn't break energy conservation: the spacecraft gains energy from the planet, which slows imperceptibly in its orbit.
Q: Why are plane changes expensive? | They need a velocity change proportional to orbital speed: Δv = 2v sin(Δi/2).
Q: How does a gravity assist work? | Flying past a moving planet, the spacecraft's velocity in the Sun's frame changes while its speed relative to the planet is unchanged.
M1: Firing a rocket prograde at periapsis raises: | Apoapsis | Periapsis | Inclination | Nothing | It raises the far side of the orbit.
M2: Ion engines are efficient because: | Their exhaust speed is very high | Their thrust is very large | They use no propellant | They work only in atmospheres | High exhaust velocity means more Δv per kg of propellant.
T: Delta-v | Δv, the total change in velocity a manoeuvre needs; it sets the fuel through the rocket equation
T: Plane change | A burn that changes an orbit's inclination, costly at high speed
SUM: Fuel grows exponentially with Δv (m_{0}/m_{f} = e^{Δv/u}), so missions minimise Δv.
SUM: Burn where speed is high to change energy efficiently (Oberth effect); change plane where speed is low.
SRC: Curtis H. D., Orbital Mechanics for Engineering Students, 3rd edition, chapter 6, Butterworth-Heinemann | secondary | 2014
SRC: Bate R. R., Mueller D. D., White J. E., Fundamentals of Astrodynamics, Dover | secondary | 1971
EV: established | Standard astrodynamics.
Q: Why are plane changes expensive in low orbit? | The Δv needed is about 2v sin(Δi/2), and v is large in low orbit.
M3@2,3: What Δv does a 30° plane change cost in a 7.7 km s^{-1} orbit? | About 4.0 km s^{-1} | About 0.13 km s^{-1}, from 30° in radians × 0.25 | About 7.7 km s^{-1}, the full speed | About 2.0 km s^{-1}, from v sin 15° | Δv = 2v sin(15°) = 2 × 7.7 × 0.259 ≈ 4.0 km s^{-1}, more than half the orbital speed.
SA2@1: Explain why rockets launch eastwards from sites near the equator. | Earth's rotation gives the launch site an eastward speed (about 465 m s^{-1} at the equator), which the rocket keeps. Launching east adds this to the orbital speed for free, saving Δv; near the equator the boost is largest and reaching an equatorial or geostationary orbit needs less plane change. | Earth's rotation gives eastward speed ; largest at the equator ; saves Δv ; less plane change for equatorial orbits

## Hohmann transfers
S: A Hohmann transfer moves a spacecraft between two circular orbits using two burns and half an elliptical orbit that touches both. It's the most fuel-efficient two-burn transfer for most orbit ratios.
LV: Intermediate · Application
O: Calculate the two burns of a Hohmann transfer between circular orbits
O: Find the transfer time and launch windows
PRE: Orbital transfers
H: The transfer
E: a_{t} = (r_{1} + r_{2})/2
E: Δv_{1} = √(GM/r_{1})(√(2r_{2}/(r_{1} + r_{2})) − 1)
E: Δv_{2} = √(GM/r_{2})(1 − √(2r_{1}/(r_{1} + r_{2})))
E: t = π√(a_{t}^{3}/GM) :: half the transfer orbit's period
H: Launch windows
P: For an interplanetary Hohmann transfer the target must arrive at the meeting point when the spacecraft does, so launches happen only at particular planetary alignments: every ~26 months for Mars. Earth to Mars takes about 8.5 months.
X: Earth (1 AU) to Mars (1.52 AU) transfer time.
> a_{t} = 1.26 AU; T = a^{3/2} = 1.41 years
> Transfer = T/2 = 0.71 years ≈ 259 days
!: Hohmann transfers are efficient but slow; when r_{2}/r_{1} > ~11.9, a three-burn bi-elliptic transfer uses less Δv.
Q: What is a Hohmann transfer orbit? | An ellipse tangent to both the initial and final circular orbits, needing one burn at each.
Q: How often do Earth–Mars Hohmann launch windows occur? | About every 26 months (the synodic period).
M1: The semi-major axis of a Hohmann transfer from r_{1} to r_{2} is: | (r_{1} + r_{2})/2 | r_{2} − r_{1} | √(r_{1}r_{2}) | r_{1}r_{2} | Periapsis r_{1}, apoapsis r_{2}.
M2: An Earth–Mars Hohmann transfer takes about: | 8.5 months | 3 days | 3 years | 1 month | Half the period of the transfer ellipse.
T: Hohmann transfer | A two-burn transfer between circular orbits using half an ellipse tangent to both
T: Launch window | The time when the planets are positioned so a transfer orbit arrives at the target
SUM: Transfer semi-major axis a = (r_{1} + r_{2})/2; time = half its period.
SUM: Speeds come from vis-viva: v^{2} = GM(2/r − 1/a); Δv_{1} and Δv_{2} are the differences from circular speed.
SRC: Hohmann W., Die Erreichbarkeit der Himmelskörper, Oldenbourg, Munich | primary | 1925
SRC: Curtis H. D., Orbital Mechanics for Engineering Students, 3rd edition, chapter 6, Butterworth-Heinemann | secondary | 2014
EV: established | The Hohmann transfer is the minimum-Δv two-impulse transfer for most radius ratios (below about 11.9).
Q: Roughly how long does a Hohmann transfer from Earth to Mars take? | About 260 days (8.5 months).
M3@2,3: A Hohmann transfer goes from 1.0 AU to 1.52 AU. What is the transfer time? | About 0.71 years | About 1.0 year, Earth's period | About 1.42 years, a full ellipse | About 1.88 years, Mars's period | a = 1.26 AU, period = 1.26^{1.5} ≈ 1.41 years; half of it ≈ 0.71 years.
SA2@2: Describe the steps of a Hohmann transfer from a low orbit to geostationary orbit, and explain why two burns are needed. | Burn 1 (prograde, at low orbit) raises the apoapsis to the GEO radius, putting the craft on the transfer ellipse. It coasts half an orbit to apoapsis, where it's moving slower than circular GEO speed. Burn 2 (prograde) raises the periapsis to circularise. One burn can't do it, since an orbit always returns to the point of its last burn. | burn 1 raises apoapsis ; coast half an ellipse ; burn 2 circularises ; orbit returns through its burn point

## Gravitational perturbations
S: Real orbits are perturbed by other bodies, by the non-spherical shapes of planets, by drag and by radiation pressure. Perturbation theory treats these as small corrections that slowly change the orbital elements.
LV: Advanced · Foundation
O: Name the main perturbations of real orbits
O: Explain how perturbations led to the discovery of Neptune
PRE: Kepler's laws
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
T: Perturbation | A small force that makes an orbit deviate from a fixed Keplerian ellipse
T: J_{2} | The coefficient measuring a planet's equatorial bulge, the largest perturbation for low Earth orbits
SUM: Perturbations: other bodies, oblateness (J_{2}), atmospheric drag, solar radiation pressure, relativity.
SUM: Uranus's unexplained perturbations predicted Neptune, found in 1846 within about 1° of Le Verrier's position.
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, chapter 6, Cambridge University Press | secondary | 1999
SRC: Galle J. G., "Account of the discovery of the planet of Le Verrier at Berlin", Monthly Notices of the Royal Astronomical Society 7, 153 | primary | 1846 | https://doi.org/10.1093/mnras/7.9.153
EV: established | Perturbation theory is standard; its predictions are confirmed to great precision.
Q: Which perturbation dominates for a satellite at 300 km? | Atmospheric drag (with J_{2} dominating the orbit's precession).
M3@1,2: How was Neptune discovered? | Its position was predicted from unexplained perturbations of Uranus's orbit | It was seen by chance in a survey of comets | It was found by its radio emission | It was predicted from its effect on Earth's tides | Le Verrier (and independently Adams) calculated where an unseen planet must be; Galle found it at once.
SA2@1,2: Explain how Earth's equatorial bulge is used to make an orbit sun-synchronous. | The bulge (J_{2}) exerts a torque that makes an inclined orbit's plane precess. Choosing an inclination slightly over 90° (about 98° at 700 km) makes the plane precess eastward by about 1° a day, matching Earth's motion round the Sun, so the orbit keeps the same orientation relative to the Sun. | equatorial bulge torques the orbit ; plane precesses ; rate set by inclination ; matched to about 1° per day

## Precession of orbits
S: Under a pure inverse-square force around a point mass, an orbit's ellipse stays fixed. Any deviation (other planets, a planet's oblateness, general relativity) makes the ellipse rotate slowly: apsidal precession.
LV: Advanced · Foundation
O: Explain why non-inverse-square forces make orbits precess
O: Account for the perihelion precession of Mercury
PRE: Gravitational perturbations
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
T: Apsidal precession | Slow rotation of an orbit's long axis
T: Perihelion | The point of a solar orbit closest to the Sun
SUM: Only an exact inverse-square (or linear) force gives closed ellipses; any deviation makes the orbit precess.
SUM: Mercury precesses about 574″ per century; planets explain about 531″, general relativity the remaining 43″.
SRC: Will C. M., "The Confrontation between General Relativity and Experiment", Living Reviews in Relativity 17, 4 | primary | 2014 | https://doi.org/10.12942/lrr-2014-4
SRC: Murray C. D., Dermott S. F., Solar System Dynamics, Cambridge University Press | secondary | 1999
EV: established | The 43″ per century anomaly and GR's prediction agree to better than 1%.
Q: How much of Mercury's perihelion precession does general relativity explain? | About 43 arcseconds per century.
M3@2,3: Why does a force not exactly proportional to 1/r^{2} make an orbit's ellipse rotate? | The radial and angular periods no longer match, so periapsis falls at a slightly different angle each orbit | Energy isn't conserved for any force law other than the inverse square | Angular momentum isn't conserved unless the force is exactly 1/r^{2} | The planet's mass changes slightly on each orbit, shifting the ellipse | Bertrand's theorem: only 1/r^{2} and linear forces give closed orbits; otherwise the radial oscillation's period differs from the orbital period.
SA2@1: Explain why Mercury's perihelion precession was an important test of general relativity. | Newtonian gravity, including all the other planets, left 43″ per century unexplained; proposals such as an unseen planet "Vulcan" failed. Einstein's 1915 theory predicted exactly 43″ with no adjustable parameters, a decisive success. | Newtonian leftover of 43″ per century ; alternatives failed ; GR predicted it ; no free parameters

## General relativistic corrections
S: General relativity treats gravity as curved spacetime. For weak fields it reproduces Newton, but it adds small, measurable corrections: clocks run slower deeper in gravity, light bends twice the Newtonian amount, orbits precess, and signals are delayed.
LV: Advanced · Foundation
O: Describe the main weak-field predictions of general relativity
O: Explain why GPS needs relativistic corrections
PRE: Precession of orbits
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
T: Gravitational time dilation | Clocks deeper in a gravitational potential run slower
T: Shapiro delay | The extra travel time of light passing close to a mass
SUM: Weak-field effects: perihelion precession, light bending (1.75″ at the Sun's edge), time dilation, Shapiro delay.
SUM: GPS satellite clocks gain about 38 μs per day net (45 from gravity minus 7 from speed), corrected in the system.
SRC: Ashby N., "Relativity in the Global Positioning System", Living Reviews in Relativity 6, 1 | primary | 2003 | https://doi.org/10.12942/lrr-2003-1
SRC: Dyson F. W., Eddington A. S., Davidson C., "A determination of the deflection of light by the Sun's gravitational field", Philosophical Transactions of the Royal Society A 220, 291–333 | primary | 1920 | https://doi.org/10.1098/rsta.1920.0009
EV: established | Every listed weak-field effect has been measured and agrees with general relativity.
Q: Do GPS satellite clocks run fast or slow compared with ground clocks? | Fast by about 38 μs per day overall.
M3@2,3: If GPS ignored the 38 μs per day clock drift, roughly how fast would position errors grow? | About 10 km per day | About 1 m per day | About 38 m per day | About 38 km per second | 38 × 10^{-6} s × 3 × 10^{8} m s^{-1} ≈ 11 km of ranging error per day.
SA2@2: Explain the two competing relativistic effects on a GPS satellite clock. | Special relativity: the satellite moves at about 3.9 km s^{-1}, so its clock runs slow by about 7 μs per day. General relativity: it is higher in Earth's gravitational potential, so its clock runs fast by about 45 μs per day. The net effect is about 38 μs per day fast. | speed makes it slow, about 7 μs ; altitude makes it fast, about 45 μs ; net 38 μs per day fast ; correction needed

## Gravitational lensing
S: Mass bends light, so a galaxy or cluster in front of a distant source acts as a lens, distorting, magnifying and multiplying its images. Lensing weighs dark matter, finds exoplanets and magnifies the most distant galaxies.
LV: Advanced · Foundation
O: Explain how mass bends light and produces multiple images, arcs and rings
O: Describe how lensing measures mass, including dark matter
PRE: General relativistic corrections
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
T: Einstein ring | A ring image formed when source, lens and observer are aligned
T: Microlensing | Brightening of a background star as a compact mass passes in front of it
T: Weak lensing | Slight statistical distortion of many background galaxy shapes by intervening mass
SUM: Lensing depends only on mass, light or dark, so it weighs clusters and maps dark matter.
SUM: The deflection is twice the naive Newtonian value: α = 4GM/(c^{2}b).
SRC: Schneider P., Ehlers J., Falco E. E., Gravitational Lenses, Springer | secondary | 1992
SRC: Clowe D. et al., "A direct empirical proof of the existence of dark matter", Astrophysical Journal Letters 648, L109–L113 | primary | 2006 | https://doi.org/10.1086/508162
EV: established | Lensing is well established; interpreting the Bullet Cluster as evidence for dark matter is the mainstream view, debated by a minority.
Q: Why is lensing a powerful tool for detecting dark matter? | It responds to all mass whether or not it emits light.
M3@2,3: What does the Bullet Cluster's lensing map show? | Most mass is offset from the hot gas that holds most ordinary matter | The mass sits exactly where the X-ray-emitting gas is concentrated | The clusters contain far less mass than their visible galaxies imply | Light from behind is bent away from the clusters, not towards them | After the collision the gas lagged behind, but lensing puts most mass with the galaxies, implying non-interacting dark matter.
SA2@1,2: Explain how microlensing can detect planets around distant stars. | When a foreground star passes in front of a background star, its gravity focuses the light and the background star brightens smoothly over days. If the foreground star has a planet, the planet's own lensing adds a brief extra spike in brightness, revealing the planet and its mass ratio. | foreground star lenses background star ; smooth brightening ; planet adds a short spike ; gives planet mass ratio

## Gravitational waves
S: Gravitational waves are ripples in spacetime that travel at the speed of light, produced by accelerating masses. Predicted by Einstein in 1916, they were first detected directly in 2015 by LIGO from two merging black holes.
LV: Advanced · Foundation
O: Describe gravitational waves and how they are produced
O: Explain how laser interferometers detect them
PRE: Gravitational lensing
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
T: Gravitational wave | A ripple in spacetime travelling at the speed of light, produced by accelerating masses
T: Strain | h = ΔL/L, the fractional change in length a wave produces
SUM: Merging black holes or neutron stars produce strains of about 10^{-21}; LIGO measures arm changes of about 10^{-18} m.
SUM: The first detection, GW150914, came from two black holes of about 36 and 29 solar masses merging 1.3 billion light years away.
SRC: LIGO Scientific Collaboration and Virgo Collaboration, "Observation of Gravitational Waves from a Binary Black Hole Merger", Physical Review Letters 116, 061102 | primary | 2016 | https://doi.org/10.1103/PhysRevLett.116.061102
SRC: Abbott B. P. et al., "GW170817: Observation of Gravitational Waves from a Binary Neutron Star Inspiral", Physical Review Letters 119, 161101 | primary | 2017 | https://doi.org/10.1103/PhysRevLett.119.161101
EV: established | Gravitational waves are now routinely detected; GW170817 also showed they travel at c to about 1 part in 10^{15}.
Q: What is the strain of a typical detected gravitational wave? | About 10^{-21}.
M3@2,3: A strain of 10^{-21} passes a 4 km LIGO arm. By how much does the arm length change? | About 4 × 10^{-18} m | About 4 × 10^{-21} m, just h | About 10^{-21} m, the strain alone | About 4 × 10^{-15} m, a proton width | ΔL = hL = 10^{-21} × 4000 m = 4 × 10^{-18} m, a few thousandths of a proton's diameter.
SA2@1,2: Explain why gravitational-wave detectors are built in pairs thousands of kilometres apart. | Local noise (seismic, traffic) affects one site independently, while a real wave reaches both within about 10 ms (the light travel time between them). Requiring coincident signals rejects local noise, and the arrival-time difference helps locate the source on the sky. | local noise is independent at each site ; real waves arrive at both ; time difference within about 10 ms ; coincidence rejects noise and locates the source
`;
