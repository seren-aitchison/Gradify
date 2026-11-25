// Unit 7: Gravitation and Orbital Mechanics. Format: kit/course/notes.js
export default `
## Newton's law of universal gravitation
S: Every pair of masses attracts with a force proportional to the product of their masses and inversely proportional to the square of their separation. Newton's law unified falling apples and orbiting moons under one rule.
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
M1#physics-u07-01-q1: If the distance between two masses triples, the force: | Falls to 1/9 | Falls to 1/3 | Triples | Is unchanged | Inverse square.
M2#physics-u07-01-q2: Who first measured G in the laboratory? | Cavendish (1798) | Newton | Kepler | Einstein | Using a torsion balance.
M2#physics-u07-01-q3: The distance between two masses is doubled. What happens to the gravitational force? | It falls to a quarter | It halves | It doubles | It stays the same | Newton's law is an inverse square law: F ∝ 1/r².
Q: What is the value of G? | 6.674 × 10^{-11} N m^{2} kg^{-2}.
Q: Is gravity ever repulsive? | No. It is always attractive.
Q: How weak is gravity compared with electromagnetism between two protons? | About 10^{-36} as strong.
Q: Why does gravity dominate at large scales despite being weakest? | Mass has only one sign, so it doesn't cancel.
Q: How far away is the Moon in Earth radii? | About 60 Earth radii.
Q: What should gravity at the Moon's distance be, according to Newton's Moon test? | g/3600, about 2.7 × 10^{-3} m s^{-2}.
Q: What did Newton's Moon test show? | The Moon's centripetal acceleration matches g/3600, so the same force governs falling apples and the Moon.
Q: What is the gravitational force between two 1000 kg cars 2 m apart? | About 1.7 × 10^{-5} N, utterly negligible.
Q: Between which points is r measured in Newton's law? | Between the centres, not the surfaces.
Q: What did Newton's law unify? | Falling objects on Earth and orbiting moons under one rule.

## Gravitational fields
S: A gravitational field is the region around a mass where other masses feel a force. Field lines show its direction; their density shows its strength. It replaces "action at a distance" with a local property of space.
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
D: phys-u07-g-inside-outside
!: The real Earth isn't uniform: its dense core makes g increase slightly with depth at first, peaking at the core–mantle boundary.
Q: How does g vary inside a uniform solid sphere? | Proportionally to distance from the centre.
Q: What is the gravitational field inside a hollow spherical shell? | Zero.
M1#physics-u07-02-q1: Gravitational field lines near Earth's surface are: | Nearly parallel and evenly spaced | Circular | Radiating outward | Absent | A small region of a radial field looks uniform.
M2#physics-u07-02-q2: Gauss's law for gravity has a minus sign because: | Gravity attracts, so the field points inward | G is negative | Mass is negative | It's a convention only | Field lines end on masses.
Q: What is a gravitational field? | The region around a mass where other masses feel a force.
Q: What do the density of field lines show? | The strength of the field.
Q: What is the field pattern around a spherical mass? | Radial lines pointing inward, with strength proportional to 1/r^{2}.
Q: What does the field look like near the Earth's surface? | Nearly uniform parallel lines.
Q: What is g inside a uniform solid sphere? | g = GMr/R^{3}.
Q: What is Gauss's law for gravity? | The flux of g through a closed surface equals −4πGM_{enc}.
Q: How does Gauss's law for gravity differ from electrostatics? | It has a sign change, because masses attract.
Q: What is the differential form of Gauss's law for gravity? | ∇·g = −4πGρ.
Q: What is g at half the Earth's radius, assuming uniform density? | About 4.9 N kg^{-1}.
Q: How does g really vary with depth in the Earth? | It increases slightly at first, peaking at the core-mantle boundary, because the core is dense.

## Gravitational field strength
S: Gravitational field strength g is the force per unit mass at a point. Near the Earth's surface it's about 9.81 N kg^{-1}, numerically equal to the free-fall acceleration in m s^{-2}.
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
M1#physics-u07-03-q1: At a height equal to Earth's radius, g is: | g_{0}/4 | g_{0}/2 | g_{0} | 0 | Distance from centre doubles.
M2#physics-u07-03-q2: A planet has twice Earth's mass and twice its radius. Surface g is: | g_{0}/2 | 2g_{0} | g_{0} | g_{0}/4 | g ∝ M/R^{2} = 2/4.
Q: What is gravitational field strength? | The force per unit mass at a point: g = F/m.
Q: What are the units of g? | N kg^{-1}, equivalent to m s^{-2}.
Q: What factors make g vary on Earth? | Latitude, altitude and local geology.
Q: How do gravitational fields from several masses combine? | They add as vectors.
Q: How does g vary with height above the surface? | g(h) = g_{0}R^{2}/(R + h)^{2} ≈ g_{0}(1 − 2h/R).
Q: What is g at the height of the ISS? | About 8.7 N kg^{-1}.
Q: What do gravimeters map? | Underground density variations such as oil fields, ore bodies, cavities and magma chambers.
Q: What did the GRACE satellites measure? | Changes in ice and groundwater from tiny changes in Earth's field.
Q: What is g on Mars? | About 3.7 N kg^{-1}.
Q: Does weightlessness in orbit mean g is zero? | No. Everything around you falls with the same acceleration.

## Gravitational potential and potential energy
S: Gravitational potential is the work done per unit mass to bring a mass from infinity to a point. It's negative everywhere (zero at infinity), and differences in potential give the energy needed to move between places.
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
D: phys-u07-potential-well
!: Potential is negative and becomes less negative (increases) with height. "Higher potential" means closer to zero.
Q: Why is gravitational potential negative? | Zero is defined at infinity, and gravity is attractive, so work must be done to move away.
Q: How is field related to potential? | g = −dV/dr: the field points down the potential gradient.
M1#physics-u07-04-q1: Earth's surface potential is about −62.5 MJ kg^{-1}. The energy to fully escape for 1 kg is: | 62.5 MJ | 9.8 J | 0 | 125 MJ | You must raise V to zero.
M2#physics-u07-04-q2: Moving a mass along an equipotential requires: | No work | Positive work | Negative work | Infinite work | ΔV = 0.
Q: What is gravitational potential? | The work done per unit mass to bring a mass from infinity to a point.
Q: What is the formula for gravitational potential? | V = −GM/r.
Q: What is the gravitational potential energy of mass m? | U = −GMm/r.
Q: What shape are equipotentials around a planet? | Spheres.
Q: How much work is done moving along an equipotential? | None.
Q: When is ΔU = mgh a good approximation? | Near the surface, for small heights.
Q: What is the gravitational potential at Earth's surface? | About −62.5 MJ kg^{-1}.
Q: Why is getting to orbit called halfway to anywhere? | Low orbit is about half way out of the potential well in energy terms.
Q: About how much energy lifts a 1000 kg satellite to 400 km? | About 3.7 × 10^{9} J.
Q: What does higher potential mean for a negative potential? | Closer to zero, which is less negative.

## Escape velocity
S: Escape velocity is the minimum launch speed for an unpowered object to escape a body's gravity completely. It's set by making kinetic energy equal to the depth of the potential well.
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
M1#physics-u07-05-q1: Escape velocity depends on the projectile's: | Nothing about the projectile | Mass | Shape | Charge | v_{esc} = √(2GM/R).
M2#physics-u07-05-q2: A planet has the same density as Earth but twice its radius. Its escape velocity: | Doubles | Is the same | Halves | Quadruples | M ∝ R^{3}, so √(M/R) ∝ R.
M2#physics-u07-05-q3: How does escape velocity compare with circular orbital speed at the same distance? | It is √2 times larger | It is the same | It is twice as large | It is half as large | v_esc = √(2GM/r) and v_orb = √(GM/r), so v_esc = √2 × v_orb.
Q: What is escape velocity? | The minimum launch speed for an unpowered object to escape a body's gravity completely.
Q: What is the formula for escape velocity? | v_{esc} = √(2GM/R) = √(2gR).
Q: Does escape velocity depend on the projectile's mass? | No, nor on its launch direction.
Q: What is the escape velocity from the Moon? | About 2.4 km s^{-1}.
Q: What is the escape velocity from Jupiter? | About 59.5 km s^{-1}.
Q: What is a gas molecule's thermal speed? | About √(3kT/m).
Q: When does a planet lose a gas from its atmosphere? | When a significant fraction of molecules exceed about 1/6 of the escape speed.
Q: Why does the Moon have no atmosphere? | Its low escape velocity let the gas leak away.
Q: How small would the Sun be at its Schwarzschild radius? | About 3 km.
Q: Do rockets need to reach escape velocity at launch? | No. With continuous thrust they can climb slowly; escape velocity applies to an unpowered launch.

## Orbital velocity
S: A satellite in a circular orbit falls continuously around the planet: gravity supplies exactly the centripetal force needed at its speed. Orbital speed falls with distance, and is 1/√2 of the escape speed at the same radius.
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
M1#physics-u07-06-q1: A satellite moves to an orbit 4 times larger in radius. Its speed: | Halves | Doubles | Quarters | Stays the same | v ∝ 1/√r.
M2#physics-u07-06-q2: The period of a geostationary orbit is: | One sidereal day (23 h 56 min) | 24 h exactly | 12 h | 90 min | It matches Earth's rotation relative to the stars.
M2#physics-u07-06-q3: How does circular orbital speed change with distance from the star? | It decreases as 1/√r | It increases as √r | It is the same at every distance | It increases as r² | v = √(GM/r), so more distant orbits are slower.
Q: What supplies the centripetal force for a satellite in circular orbit? | Gravity.
Q: What is the period of a circular orbit? | T = 2π√(r^{3}/GM).
Q: What are the speed and period in low Earth orbit at about 400 km? | About 7.7 km s^{-1} and 92 minutes.
Q: What is the period of a geostationary orbit? | 23 h 56 min.
Q: What is the orbital speed of a geostationary satellite? | About 3.07 km s^{-1}.
Q: What is the Moon's orbital speed? | About 1.0 km s^{-1}.
Q: What is Newton's cannon thought experiment? | A cannonball fired fast enough from a mountain falls as fast as the ground curves away, so it orbits.
Q: At what speed would Newton's cannonball orbit at the surface without air? | About 7.9 km s^{-1}.
Q: What is the altitude of a geostationary satellite? | About 35 800 km.
Q: How do you catch up with a spacecraft ahead of you in orbit? | Slow down to drop to a lower, faster orbit.

## Circular and elliptical orbits
S: Bound orbits under an inverse-square force are ellipses with the central body at one focus; a circle is the special case of zero eccentricity. Unbound orbits are parabolas or hyperbolas.
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
M1#physics-u07-07-q1: An orbit with e = 0 is: | A circle | A parabola | A hyperbola | A straight line | Zero eccentricity.
M2#physics-u07-07-q2: Where is an orbiting body fastest? | At periapsis | At apoapsis | Everywhere the same | At the end of the minor axis | Angular momentum conservation.
M2#physics-u07-07-q3: Where is a planet on an elliptical orbit moving fastest? | At closest approach to the star | At its furthest point from the star | Halfway along the orbit | It moves at constant speed | Angular momentum is conserved, so the planet moves fastest where it is closest.
Q: What shape are bound orbits under an inverse-square force? | Ellipses with the central body at one focus.
Q: What is the equation of an elliptical orbit? | r = a(1 − e^{2})/(1 + e cos θ).
Q: What is the periapsis distance of an ellipse? | r_{peri} = a(1 − e).
Q: What is the apoapsis distance of an ellipse? | r_{apo} = a(1 + e).
Q: What orbit has eccentricity greater than 1? | A hyperbola.
Q: What is the eccentricity of Earth's orbit? | About 0.017, nearly circular.
Q: What is the eccentricity of Halley's comet? | About 0.97.
Q: What is the total energy of an elliptical orbit? | E = −GMm/(2a), depending only on a.
Q: What kind of orbit has zero total energy? | A parabola, which just escapes.
Q: Where is an orbiting body fastest? | At periapsis.

## Kepler's laws
S: Kepler found three laws in Tycho Brahe's planetary data; Newton showed they follow from an inverse-square gravitational force. They still describe moons, exoplanets and binary stars.
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
D: phys-u07-kepler-period
!: The third law in its simple form T^{2} ∝ a^{3} compares bodies orbiting the same central mass; Earth's satellites and the planets have different constants.
P: **Investigate with the lab.** Try orbits of two sizes and compare T² with a³. Then check equal areas in equal times on an eccentric orbit.
IX: orbits
Q: What does Kepler's second law express physically? | Conservation of angular momentum.
Q: How can Kepler's third law measure a star's mass? | From a planet's period and orbit size: M = 4π^{2}a^{3}/(GT^{2}).
M1#physics-u07-08-q1: A planet at 4 AU has a period of: | 8 years | 4 years | 16 years | 2 years | T = a^{3/2}.
M2#physics-u07-08-q2: Kepler's laws were derived from observations by: | Tycho Brahe | Galileo | Copernicus | Ptolemy | Kepler analysed Tycho's precise data.
M2#physics-u07-08-q3: One planet's orbit has four times the semi-major axis of another's. How do their periods compare? | Eight times longer | Four times longer | Sixteen times longer | Twice as long | Kepler's third law: T² ∝ a³, so T ∝ a^{1.5} = 4^{1.5} = 8.
Q: What is Kepler's first law? | Planets move in ellipses with the Sun at one focus.
Q: What is Kepler's second law? | The Sun-planet line sweeps equal areas in equal times.
Q: What is Kepler's third law? | T^{2} is proportional to a^{3}, with the same constant for all planets of one star.
Q: What is Newton's form of Kepler's third law? | T^{2} = 4π^{2}a^{3}/(G(M + m)).
Q: Whose data did Kepler use? | Tycho Brahe's planetary data.
Q: Who showed that Kepler's laws follow from an inverse-square force? | Newton.
Q: How massive is the black hole Sgr A*? | About 4 million solar masses.
Q: How was Sgr A*'s mass measured? | Using Kepler's third law on stars orbiting it.
Q: Jupiter is 5.2 AU from the Sun. What is its period? | About 11.9 years.
Q: Can T^{2} ∝ a^{3} compare Earth satellites with planets? | No. The simple form only compares bodies orbiting the same central mass.

## Satellite motion
S: Satellites are placed in orbits chosen for their purpose: low orbits for imaging and the ISS, sun-synchronous polar orbits for Earth observation, medium orbits for navigation, and geostationary orbits for communications and weather.
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
M1#physics-u07-09-q1: GPS satellites orbit in: | Medium Earth orbit (~20 000 km) | Geostationary orbit | LEO | Polar LEO only | About 12-hour orbits.
M2#physics-u07-09-q2: The net relativistic clock offset for GPS satellites is about: | +38 μs per day | −7 μs per day | 0 | +1 s per day | Gravitational blueshift exceeds velocity time dilation.
M2#physics-u07-09-q3: Why must a geostationary satellite orbit at one particular height? | Its period must be exactly one day, which fixes its orbital radius | It must be beyond the reach of Earth's gravity | It must avoid the Moon's orbit | Its speed must be zero relative to the stars | T² ∝ r³ means only one radius gives a 24-hour period.
Q: What altitudes count as low Earth orbit? | About 160 to 2000 km.
Q: Why do LEO orbits decay? | Atmospheric drag.
Q: How does a sun-synchronous orbit stay in step with the Sun? | It is near-polar and precesses once a year using Earth's bulge.
Q: Which orbit do GPS and Galileo use? | Medium Earth orbit, about 20 000 km, with periods of about 12 h.
Q: What is a Molniya orbit? | A highly elliptical orbit inclined at 63.4° with a long dwell over high latitudes.
Q: Why are geostationary orbits used for communications? | Satellites there appear fixed in the sky.
Q: How much height does the ISS lose per month without reboosts? | About 2 km.
Q: What is Kessler syndrome? | Collisions between debris creating more debris.
Q: How much do GPS clocks gain per day overall from relativity? | About 38 μs per day.
Q: What would happen to GPS if relativity were ignored? | Position errors would grow by about 10 km per day.

## Orbital energy and angular momentum
S: An orbit's total energy fixes its size (semi-major axis); its angular momentum fixes its shape. In circular orbits, kinetic energy is half the magnitude of potential energy and total energy is negative.
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
D: phys-u07-orbit-energies
!: Total orbital energy is negative for bound orbits; "more energy" means less negative.
P: **Investigate with the lab.** On an eccentric orbit, watch the kinetic and potential energy exchange while the total stays constant. Then give the planet escape velocity and note the total energy reaches zero.
IX: orbits
Q: State the virial theorem for circular gravitational orbits. | 2KE = −U, so E = −KE = U/2.
Q: What sets the shape of an orbit at fixed energy? | Its angular momentum (larger L means less eccentric).
M1#physics-u07-10-q1: For a circular orbit, if KE = 5 GJ, the total energy is: | −5 GJ | 5 GJ | −10 GJ | 10 GJ | E = −KE.
M2#physics-u07-10-q2: The L^{2}/(2mr^{2}) term in the effective potential: | Prevents the orbit reaching r = 0 | Represents drag | Is the gravitational PE | Is always zero | It's a centrifugal barrier.
M2#physics-u07-10-q3: What is the sign of the total energy of a bound orbit? | Negative | Positive | Zero | It changes sign each orbit | A bound orbit has total energy below zero; at escape velocity it reaches zero.
Q: What fixes an orbit's size? | Its total energy, through the semi-major axis.
Q: What is the kinetic energy of a circular orbit? | KE = GMm/(2r).
Q: What is the total energy of a circular orbit? | E = −GMm/(2r) = −KE.
Q: What is the angular momentum of an elliptical orbit? | L = m√(GMa(1 − e^{2})).
Q: For fixed energy, which orbit has maximum angular momentum? | A circle.
Q: What happens as an orbit's angular momentum tends to zero? | It becomes a straight-line plunge.
Q: What is the effective potential for an orbit? | U_{eff} = −GMm/r + L^{2}/(2mr^{2}).
Q: What does the L^{2} term in the effective potential act like? | A centrifugal barrier.
Q: When an orbit is raised, how do KE and PE change? | KE falls by the rise in total energy; PE rises by twice that.
Q: A 500 kg satellite moves from 7000 km to 8000 km. What is ΔE? | About +1.78 GJ.

## Two-body gravitational problem
S: Two bodies orbiting under mutual gravity both circle their common centre of mass. Their relative motion is equivalent to one body of reduced mass orbiting a fixed centre, so Kepler's results apply exactly.
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
M1#physics-u07-11-q1: The Sun wobbles around the Solar System's CM mainly due to: | Jupiter | Earth | Mercury | Comets | Jupiter has most of the planetary mass.
M2#physics-u07-11-q2: Two equal-mass stars orbit their CM. Their orbits are: | The same size, on opposite sides | Different sizes | One star is stationary | Circular only | Equal masses ⇒ symmetric orbits.
Q: What do two bodies under mutual gravity orbit? | Their common centre of mass.
Q: How is the two-body problem simplified? | Into one body of reduced mass orbiting a fixed centre.
Q: What is the period of a two-body orbit? | T^{2} = 4π^{2}a^{3}/(G(m_{1} + m_{2})).
Q: What do the two bodies' orbits about the centre of mass share? | The same eccentricity and period.
Q: How are stellar masses mainly measured? | By measuring both orbits of binary stars.
Q: How are exoplanets found from a star's wobble? | From radial velocity changes of metres per second.
Q: Why do Pluto and Charon both visibly orbit a point in space? | Their centre of mass lies outside Pluto.
Q: Two stars of 2 and 1 solar masses orbit 3 AU apart. What is the period? | 3 years.
Q: In that binary, how far is each star from the centre of mass? | The 2 solar mass star is 1 AU away; the other is 2 AU.
Q: When should M + m be used in Kepler's third law? | When the companion's mass isn't negligible.

## Tidal forces
S: Tidal forces arise because gravity varies across an extended body: the near side is pulled more strongly than the far side. They raise ocean tides, lock moons' rotations, heat Io's volcanoes and stretch objects falling into black holes.
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
M1#physics-u07-12-q1: Spring tides occur at: | New and full moon | First and last quarter | Only in spring | Equinoxes only | Sun and Moon aligned.
M2#physics-u07-12-q2: Tidal friction is making the Moon: | Recede from Earth | Approach Earth | Speed up its orbit | Stop rotating | Angular momentum moves from Earth's spin to the Moon's orbit.
Q: What causes tidal forces? | Gravity varying across an extended body, so the near side is pulled more than the far side.
Q: What is the tidal acceleration across a size d? | Δg ≈ 2GMd/r^{3}.
Q: How does the Moon's tidal effect compare with the Sun's? | About 2.2 times larger.
Q: How often do high tides occur? | About every 12 h 25 min.
Q: When do spring tides occur? | When the Sun and Moon are aligned, at new and full moon.
Q: When do neap tides occur? | When the Sun and Moon are at right angles.
Q: How fast is the Moon receding? | About 3.8 cm a year.
Q: How fast are Earth's days lengthening? | About 2 ms per century.
Q: What does tidally locked mean? | A moon always shows the same face to its planet.
Q: What causes the far-side tidal bulge? | The Earth is pulled away from the water there.

## Roche limits
S: The Roche limit is the distance within which a body held together only by its own gravity is torn apart by a planet's tides. It explains why Saturn's rings are rings and not a moon.
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
M1#physics-u07-13-q1: A denser satellite's Roche limit is: | Closer to the planet | Farther from the planet | The same | Undefined | d ∝ (ρ_{p}/ρ_{s})^{1/3}.
M2#physics-u07-13-q2: Shoemaker–Levy 9 broke apart because: | It passed inside Jupiter's Roche limit | It hit an asteroid | Solar heating | Its rotation was too fast | Tidal disruption.
Q: What is the fluid Roche limit? | d ≈ 2.44 R_{p}(ρ_{p}/ρ_{s})^{1/3}.
Q: What is the rigid Roche limit? | d ≈ 1.26 R_{p}(ρ_{p}/ρ_{s})^{1/3}.
Q: Can denser satellites orbit closer or further in? | Closer.
Q: Why can rocks and spacecraft survive inside the Roche limit? | They are held together by material strength, not gravity.
Q: What happened to comet Shoemaker-Levy 9? | It was torn into about 21 fragments inside Jupiter's Roche limit in 1992 and hit Jupiter in 1994.
Q: What may happen to Phobos? | It is spiralling inward and may break into a ring in about 50 million years.
Q: What is the estimated Roche limit for an icy moon around Saturn? | About 125 000 km.
Q: Where do Saturn's bright rings end? | At about 137 000 km.
Q: Why aren't people torn apart falling towards Earth? | Chemical bonds are far stronger than their self-gravity.
Q: What kind of bodies does the Roche limit apply to? | Bodies held together only by their own gravity.

## Lagrange points
S: In a system of two orbiting masses there are five points where a small third body can orbit in step with them, the gravitational and centrifugal forces balancing in the rotating frame. Spacecraft and asteroids use them.
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
M1#physics-u07-14-q1: The Trojan asteroids are at Jupiter's: | L4 and L5 | L1 | L2 | L3 | Stable triangle points.
M2#physics-u07-14-q2: Spacecraft at L1 need station-keeping because: | L1 is an unstable equilibrium | Drag is large there | The Sun's gravity is zero there | It's inside Earth's atmosphere | Small displacements grow.
Q: How many Lagrange points does a two-body system have? | Five.
Q: Where is L1? | Between the two bodies.
Q: Which spacecraft sit at Sun-Earth L1? | Solar monitors such as SOHO and DSCOVR.
Q: Which spacecraft sit at Sun-Earth L2? | JWST, Gaia and Planck.
Q: Where are L4 and L5? | 60° ahead of and behind the smaller body, forming equilateral triangles.
Q: How far are L1 and L2 from the smaller body? | About R(m/3M)^{1/3}, the Hill radius.
Q: How do spacecraft stay near unstable Lagrange points? | With small regular manoeuvres in halo orbits.
Q: What objects occupy Jupiter's L4 and L5 points? | Thousands of Trojan asteroids.
Q: How far is Sun-Earth L2 from Earth? | About 1.5 million km.
Q: Are Lagrange points equilibria in an inertial frame? | No, only in the rotating frame; in an inertial frame objects there orbit the larger body.

## Restricted three-body problem
S: The general three-body problem has no closed-form solution and can be chaotic. The restricted version, a tiny mass moving in the field of two massive bodies in circular orbits, is solvable enough to reveal Lagrange points, zero-velocity curves and low-energy transfer routes.
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
M1#physics-u07-15-q1: The general three-body problem: | Has no general closed-form solution | Is always periodic | Reduces to Kepler's laws | Was solved by Newton | It can be chaotic.
M2#physics-u07-15-q2: Kirkwood gaps in the asteroid belt are due to: | Orbital resonances with Jupiter | Collisions | Solar radiation | Mars's gravity | Resonant perturbations clear orbits.
Q: Does the general three-body problem have a closed-form solution? | No, and it can be chaotic.
Q: What is the restricted three-body problem? | A tiny mass moving in the field of two massive bodies in circular orbits.
Q: What is the formula for the Jacobi constant? | C = 2U_{eff} − v^{2}.
Q: What do zero-velocity curves show? | The regions a test mass can reach for a given Jacobi constant.
Q: When did Poincaré discover chaos in this problem? | 1890.
Q: What is the interplanetary transport network? | Routes using manifolds through Lagrange points to move spacecraft with very little fuel.
Q: Name a mission that used low-energy transfer routes. | Genesis or Japan's Hiten.
Q: Which Saturn moons swap orbits every 4 years? | Janus and Epimetheus, in horseshoe orbits.
Q: What causes the Kirkwood gaps? | Resonances with Jupiter in the asteroid belt.
Q: When must the full three-body problem be used instead of the restricted one? | When all three masses are comparable, such as three stars.

## Orbital transfers
S: Changing orbit means changing velocity with rocket burns (Δv). Mission design minimises total Δv because fuel needed grows exponentially with it. Burn direction and position decide the new orbit.
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
M1#physics-u07-16-q1: Firing a rocket prograde at periapsis raises: | Apoapsis | Periapsis | Inclination | Nothing | It raises the far side of the orbit.
M2#physics-u07-16-q2: Ion engines are efficient because: | Their exhaust speed is very high | Their thrust is very large | They use no propellant | They work only in atmospheres | High exhaust velocity means more Δv per kg of propellant.
Q: Why does mission design minimise total Δv? | The fuel needed grows exponentially with Δv.
Q: What does a prograde burn do? | Raises the opposite side of the orbit.
Q: What is a retrograde burn used for? | Lowering the opposite side of the orbit, such as for de-orbiting.
Q: Where should plane changes be done? | At the slowest point of the orbit.
Q: Name a mission that used gravity assists. | Voyager, Cassini or Parker Solar Probe.
Q: What are low-thrust ion engines good for? | Very efficient but slow spirals, as on Dawn and BepiColombo.
Q: What Δv is needed from Earth's surface to LEO? | About 9.4 km s^{-1} including drag and gravity losses.
Q: What Δv is needed from LEO to GEO? | About 3.9 km s^{-1}.
Q: What Δv changes a 7.7 km s^{-1} orbit's inclination by 10°? | About 1.34 km s^{-1}.
Q: Does a gravity assist break energy conservation? | No. The spacecraft gains energy from the planet, which slows imperceptibly.

## Hohmann transfers
S: A Hohmann transfer moves a spacecraft between two circular orbits using two burns and half an elliptical orbit that touches both. It's the most fuel-efficient two-burn transfer for most orbit ratios.
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
M1#physics-u07-17-q1: The semi-major axis of a Hohmann transfer from r_{1} to r_{2} is: | (r_{1} + r_{2})/2 | r_{2} − r_{1} | √(r_{1}r_{2}) | r_{1}r_{2} | Periapsis r_{1}, apoapsis r_{2}.
M2#physics-u07-17-q2: An Earth–Mars Hohmann transfer takes about: | 8.5 months | 3 days | 3 years | 1 month | Half the period of the transfer ellipse.
Q: How many burns does a Hohmann transfer use? | Two.
Q: What is the semi-major axis of a Hohmann transfer orbit? | a_{t} = (r_{1} + r_{2})/2.
Q: How long does a Hohmann transfer take? | Half the transfer orbit's period: t = π√(a_{t}^{3}/GM).
Q: Why is a Hohmann transfer used? | It is the most fuel-efficient two-burn transfer for most orbit ratios.
Q: Why are there launch windows for interplanetary transfers? | The target must arrive at the meeting point when the spacecraft does.
Q: How long does an Earth to Mars Hohmann transfer take? | About 8.5 months, or roughly 259 days.
Q: What is the semi-major axis of the Earth-Mars transfer orbit? | About 1.26 AU.
Q: What is the main disadvantage of Hohmann transfers? | They are slow.
Q: When does a bi-elliptic transfer beat a Hohmann transfer? | When r_{2}/r_{1} is greater than about 11.9.
Q: How many burns does a bi-elliptic transfer use? | Three.

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
M1#physics-u07-18-q1: Io, Europa and Ganymede are in a: | 1:2:4 orbital resonance | 1:1 resonance | Random pattern | 2:3 resonance | The Laplace resonance.
M2#physics-u07-18-q2: Solar radiation pressure matters most for: | Light, large-area spacecraft | Planets | Dense small satellites | Rockets during launch | Force ∝ area, acceleration ∝ area/mass.
Q: What is a gravitational perturbation? | A small correction to an orbit from other bodies, planet shapes, drag or radiation pressure.
Q: How does perturbation theory treat these effects? | As small corrections that slowly change the orbital elements.
Q: What does Earth's oblateness do to satellite orbits? | Makes their planes precess and their ellipses rotate.
Q: For which spacecraft is solar radiation pressure important? | Light, large spacecraft and solar sails.
Q: Why do resonances matter in perturbations? | Repeated tugs at the same orbital phase build up large effects.
Q: What is the Laplace resonance? | The 1:2:4 resonance of Io, Europa and Ganymede.
Q: Who found Neptune near the predicted position in 1846? | Galle, within 1° of Le Verrier's and Adams' prediction.
Q: What motivates the search for Planet Nine? | Perturbations of distant Kuiper belt objects.
Q: What inclination gives a sun-synchronous orbit at about 800 km? | About 98.6°, slightly retrograde.
Q: Why can tiny perturbations dominate over time? | Their effects add up over many orbits.

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
M1#physics-u07-19-q1: The Moon's orbital plane precesses with a period of: | 18.6 years | 1 month | 26 000 years | 1 year | Nodal precession.
M2#physics-u07-19-q2: GR precession is largest for orbits that are: | Close and eccentric around massive bodies | Distant and circular | Around light bodies | Retrograde | ∝ M/(a(1 − e^{2})).
Q: What is apsidal precession? | The slow rotation of an orbit's ellipse.
Q: Does an orbit precess under a pure inverse-square force from a point mass? | No. The ellipse stays fixed.
Q: What is Mercury's total perihelion precession? | About 574 arcseconds per century.
Q: What causes most of Mercury's precession? | Perturbations from other planets.
Q: When did Einstein explain Mercury's extra precession? | 1915.
Q: What is nodal precession? | The swinging around of the orbital plane itself.
Q: What is the GR precession per orbit? | Δφ = 6πGM/(c^{2}a(1 − e^{2})).
Q: Which orbits show the largest GR precession? | Close, eccentric orbits around massive objects.
Q: Which star showed GR precession around Sgr A* in 2020? | Star S2.
Q: What is Bertrand's theorem? | Only the inverse-square and harmonic forces give closed orbits.

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
M1#physics-u07-20-q1: Which experiment first confirmed light bending? | Eddington's 1919 eclipse expedition | Michelson–Morley | Pound–Rebka | LIGO | Star positions near the eclipsed Sun shifted.
M2#physics-u07-20-q2: A clock at a lower altitude runs: | Slower | Faster | At the same rate | Backwards | Deeper in the potential well.
Q: How does general relativity describe gravity? | As curved spacetime.
Q: What is gravitational time dilation near Earth? | Δt/t ≈ gh/c^{2}: clocks deeper in gravity run slower.
Q: What is the formula for light bending past a mass? | θ = 4GM/(c^{2}b).
Q: What did the Pound-Rebka experiment measure? | Gravitational redshift, using a 22.5 m tower in 1959.
Q: What is the Shapiro delay? | The delay of radar signals passing the Sun, about 200 μs.
Q: What is frame dragging? | Rotating masses twisting spacetime.
Q: Which experiments tested frame dragging? | Gravity Probe B and LAGEOS.
Q: How small a height difference can atomic clocks detect through gravity? | About 1 cm.
Q: How much faster does a clock 1 km higher run per day? | About 9.4 ns per day.
Q: Why are GR corrections not irrelevant despite being small? | They are essential engineering in GPS and precise timekeeping.

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
M1#physics-u07-21-q1: Microlensing has been used to discover: | Exoplanets | Black hole spins | Neutrinos | Cosmic rays | Planets add brief features to lensing light curves.
M2#physics-u07-21-q2: The Bullet Cluster is evidence for dark matter because: | Lensing mass is separated from the visible gas | It is very bright | It has no galaxies | Its light isn't bent | Most mass doesn't follow the baryons.
Q: What is gravitational lensing? | The bending of light by a mass in front of a distant source, distorting, magnifying and multiplying its images.
Q: What is strong lensing? | Multiple images, arcs and Einstein rings when source, lens and observer align.
Q: What is weak lensing? | Small statistical distortions of many background galaxy shapes.
Q: What is microlensing? | A star passing in front of another and temporarily brightening it.
Q: How does microlensing find planets? | Planets around the lens star add short blips to the brightening.
Q: What is the Einstein radius? | θ_{E} = √(4GM D_{ls}/(c^{2}D_{l}D_{s})).
Q: Why is the Bullet Cluster evidence for dark matter? | Its lensing mass is offset from its hot gas.
Q: How do telescopes use cluster lenses? | To see galaxies from the first few hundred million years, magnified.
Q: What did the lensed supernova Refsdal do? | It reappeared on schedule, testing models and measuring the Hubble constant.
Q: How do gravitational lenses differ from glass lenses? | They have no single focal point, making arcs and rings rather than sharp images.

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
M1#physics-u07-22-q1: Gravitational waves travel at: | The speed of light | Faster than light | The speed of sound | 0.1c | Confirmed by GW170817.
M2#physics-u07-22-q2: The Hulse–Taylor binary pulsar provided evidence of gravitational waves because: | Its orbit shrinks at the rate GR predicts for wave emission | It emits radio waves | It's very massive | It's rotating fast | Indirect evidence via energy loss.
Q: What are gravitational waves? | Ripples in spacetime travelling at the speed of light, produced by accelerating masses.
Q: When did Einstein predict gravitational waves? | 1916.
Q: How many polarisations do gravitational waves have? | Two, + and ×, which stretch and squeeze space at 90°.
Q: What kind of mass change produces gravitational waves? | Changing mass quadrupoles, not monopoles or dipoles.
Q: What did the Hulse-Taylor binary pulsar show? | It spirals together at exactly GR's predicted rate, as waves carry energy away.
Q: Name three gravitational-wave interferometers. | LIGO, Virgo and KAGRA.
Q: What do pulsar timing arrays detect? | Nanohertz waves from supermassive black hole binaries.
Q: What frequencies will LISA detect? | Millihertz waves, from space.
Q: What did GW170817 show? | Gravitational waves travel at c, and neutron-star mergers make heavy elements like gold.
Q: How much does a 4 km LIGO arm change for a strain of 10^{-21}? | About 4 × 10^{-18} m, a thousandth of a proton's diameter.
`;
