// Unit 25: Special Relativity. Format: kit/course/notes.js
export default `
## Historical foundations of relativity
S: By 1900, Newtonian mechanics and Maxwell's electromagnetism clashed: Maxwell's equations gave light a fixed speed, but in which frame? Experiments failed to find any "ether", and Einstein's 1905 theory resolved the conflict by changing our ideas of space and time.
H: The problems
- Maxwell's equations predict c = 1/√(μ_{0}ε_{0}), with no mention of a frame.
- Galilean transformations change Maxwell's equations: they aren't invariant.
- If light moved through an ether, Earth's motion should change its measured speed.
H: Experiments
- **Michelson–Morley** (1887): no ether wind to ~1/40 of Earth's orbital speed.
- **Fizeau** (1851): light in moving water is only partly dragged.
- **Stellar aberration**: the apparent shift of star positions with Earth's motion.
H: Pre-Einstein attempts
- FitzGerald and Lorentz proposed length contraction of moving objects to explain the null result.
- Lorentz and Poincaré derived the Lorentz transformations, interpreting them dynamically.
H: Einstein's step
P: Einstein (1905, "On the Electrodynamics of Moving Bodies") took the principle of relativity and constancy of c as postulates, deriving the transformations from them. Time and space themselves change between frames; the ether is unnecessary. Minkowski (1908) recast it as four-dimensional spacetime.
X: Expected Michelson–Morley fringe shift for v = 30 km s^{-1}, L = 11 m, λ = 500 nm?
> Shift ≈ 2Lv^{2}/(λc^{2}) = 2 × 11 × 10^{-8}/(5 × 10^{-7}) = 0.44 fringe
> Observed: < 0.01 fringe
!: Einstein didn't need the Michelson–Morley result specifically; his reasoning started from the symmetry of electromagnetism.
Q: Why were Maxwell's equations a problem for Newtonian mechanics? | They aren't invariant under Galilean transformations and imply a fixed speed of light.
Q: What did the Michelson–Morley experiment show? | No detectable motion through an ether.
M1: Who first proposed length contraction to explain Michelson–Morley? | FitzGerald and Lorentz | Einstein | Newton | Maxwell | 1889–92.
M2: Einstein's 1905 paper was titled: | On the Electrodynamics of Moving Bodies | The Theory of Relativity | Space and Time | Gravitation | Annus mirabilis.

## Galilean transformations
S: Galilean transformations convert positions and times between frames moving at constant velocity, assuming time is absolute. They work at everyday speeds but fail near the speed of light.
H: The transformation
E: x′ = x − vt; y′ = y; z′ = z; t′ = t
E: u′ = u − v :: velocity addition
- Accelerations are the same in both frames: Newton's laws are Galilean-invariant.
- Lengths and time intervals are the same for all observers.
H: Where they fail
- Light would have different speeds in different frames.
- Maxwell's equations change form.
- High-speed particles don't add velocities simply: two particles at 0.9c approaching each other have relative speed 0.994c, not 1.8c.
H: As a limit
P: Lorentz transformations reduce to Galilean ones when v ≪ c: γ → 1 and vx/c^{2} → 0. Newtonian mechanics is the low-speed limit of relativity, which is why it works so well for everyday engineering.
X: A train moves at 30 m s^{-1}; a passenger walks forward at 2 m s^{-1}. Speed relative to the ground?
> Galilean: 32 m s^{-1}
> Relativistic correction: ~uv/c^{2} ≈ 7 × 10^{-16}: negligible
!: Galilean relativity isn't "wrong" for everyday use; its errors are far below anything measurable at normal speeds.
Q: What does the Galilean transformation assume about time? | That it's absolute: t′ = t.
Q: When do Galilean transformations fail? | At speeds comparable to light; they can't keep c the same in all frames.
M1: In Galilean relativity, which is invariant? | Acceleration | Velocity | Position | Momentum | Constant relative velocity.
M2: Under Galilean transformations, Maxwell's equations: | Change form | Stay the same | Become Newton's laws | Disappear | Not invariant.

## Inertial reference frames
S: An inertial frame is one in which a free object moves in a straight line at constant speed. Special relativity says the laws of physics are the same in all inertial frames, and none is special.
H: Properties
- Newton's first law holds.
- Any frame moving at constant velocity relative to an inertial frame is also inertial.
- No experiment inside a closed laboratory can detect its uniform motion.
H: Realisations
- Approximately: a lab on Earth (rotation and gravity give small effects), a spacecraft coasting far from masses.
- In general relativity, freely falling frames are locally inertial: gravity disappears locally (equivalence principle).
H: Observers and coordinates
P: In relativity an "observer" means a whole frame filled with synchronised clocks and rulers, not a single person's eyesight. Measurements record events at the clock where they happen, removing light-travel delays. Clocks in one frame are synchronised by Einstein's procedure: send light out and back and set the distant clock to the midpoint time.
X: Is a satellite in orbit an inertial frame?
> Locally, freely falling: yes in general relativity (objects float)
> Globally, it accelerates around Earth: not inertial in Newtonian terms
!: "Observing" in relativity isn't seeing; seeing includes light-travel delays, which produce different visual effects from length contraction (Terrell rotation).
Q: What is an inertial frame? | One in which free objects move in straight lines at constant speed.
Q: How are clocks synchronised in a frame? | By exchanging light signals and accounting for travel time (Einstein synchronisation).
M1: A frame accelerating at 2 m s^{-2} is: | Non-inertial | Inertial | Inertial if slow | Undefined | Fictitious forces appear.
M2: The principle of relativity says: | Laws of physics are the same in all inertial frames | All motion is relative including acceleration | Light is slow | Time is absolute | Einstein's first postulate.

## Postulates of special relativity
S: Special relativity rests on two postulates: the laws of physics are the same in every inertial frame, and the speed of light in vacuum is the same for every inertial observer. Everything else, including time dilation and E = mc^{2}, follows logically.
H: The postulates
- **Principle of relativity**: no inertial frame is preferred; all physical laws take the same form.
- **Invariance of c**: light travels at c in every inertial frame, independent of the source's motion.
H: Consequences
- Simultaneity is relative.
- Moving clocks run slow; moving lengths contract.
- Velocities add non-linearly; nothing with mass reaches c.
- Mass and energy are equivalent.
- Space and time combine into spacetime.
H: Why accept them
P: The first extends Galileo's principle to electromagnetism and optics. The second follows from Maxwell's equations plus the first (if c is a law of physics, it must be the same in every frame). Together they're consistent only if space and time measurements depend on the observer.
X: A spaceship at 0.5c fires a laser forward. Speed of the light measured on Earth?
> c, not 1.5c (second postulate)
!: Relativity doesn't say "everything is relative": c, the spacetime interval, proper time and physical laws are absolute.
Q: State the two postulates of special relativity. | The laws of physics are the same in all inertial frames, and the speed of light is the same for all inertial observers.
Q: What does the second postulate imply about simultaneity? | Events simultaneous in one frame need not be in another.
M1: The speed of light from a moving source is: | c in all inertial frames | c + v | c − v | Depends on frequency | Postulate.
M2: Which quantity is the same for all observers in relativity? | The spacetime interval | Time intervals | Lengths | Simultaneity | Invariant.

## Speed of light invariance
S: The speed of light in vacuum is the same for every inertial observer, whatever their motion or the source's motion. Countless experiments confirm it, and it's built into the SI definition of the metre.
H: Evidence
- Michelson–Morley and modern versions (rotating optical cavities: anisotropy < 10^{-18}).
- Kennedy–Thorndike: no dependence on velocity.
- Light from fast pion decays (π^{0} → γγ at 0.99975c) travels at c (CERN, 1964).
- Binary stars: light from approaching and receding stars arrives together (de Sitter).
- Gamma-ray bursts: photons of different energies arrive together over billions of light-years.
H: Implications
- c is a limiting speed for all signals and causal influences.
- c is really a conversion factor between space and time units (1 m ≈ 3.3 ns).
- Particles with mass can approach but never reach c.
H: c and the SI
P: Since 1983 the metre has been the distance light travels in 1/299 792 458 s. Measuring "the speed of light" now really calibrates lengths and times; c can't change by definition, and any variation would show up as a change in the dimensionless constants.
X: How long does light take to cross a 30 cm ruler?
> t = 0.3/3 × 10^{8} = 1 ns: "a light-nanosecond is about a foot"
!: Light slows in materials (v = c/n), but c, the vacuum speed, is the invariant one.
Q: What evidence shows light's speed is independent of the source's motion? | Pion decay photons, binary star observations and modern cavity experiments.
Q: How is the metre defined? | The distance light travels in vacuum in 1/299 792 458 of a second.
M1: The speed of light in vacuum is: | Exactly 299 792 458 m s^{-1} | Approximately 3 × 10^{8} only | Different for each frame | Infinite | Defined.
M2: Light from π^{0} mesons moving at 0.99975c was measured to travel at: | c | 2c | 0.5c | 1.99975c | 1964 test.

## Lorentz transformations
S: The Lorentz transformations convert space and time coordinates between inertial frames moving relative to each other, keeping the speed of light the same in both. They replace the Galilean transformations and contain all the effects of special relativity.
H: The transformations (motion along x)
E: x′ = γ(x − vt); t′ = γ(t − vx/c^{2}); y′ = y; z′ = z
E: γ = 1/√(1 − v^{2}/c^{2})
E: x = γ(x′ + vt′); t = γ(t′ + vx′/c^{2}) :: inverse
- γ = 1 at rest; 1.15 at 0.5c; 2.29 at 0.9c; 7.09 at 0.99c; ~7000 for LHC protons.
H: Rapidity
E: v/c = tanh φ; γ = cosh φ
- Rapidities add simply under successive boosts: φ_{total} = φ_{1} + φ_{2}.
H: Invariant interval
E: s^{2} = (cΔt)^{2} − Δx^{2} − Δy^{2} − Δz^{2}
P: The Lorentz transformations preserve this combination, as rotations preserve distances in space. They're "rotations" in spacetime (hyperbolic rotations), mixing space and time.
X: Event at x = 100 m, t = 0 in frame S. In S′ moving at 0.6c?
> γ = 1.25
> x′ = 125 m; t′ = 1.25 × (0 − 0.6 × 100/c) = −2.5 × 10^{-7} s: earlier in S′
!: The vx/c^{2} term in t′ is easy to forget; it's the source of the relativity of simultaneity.
Q: What is the Lorentz factor? | γ = 1/√(1 − v^{2}/c^{2}).
Q: What quantity do Lorentz transformations preserve? | The spacetime interval.
M1: γ at v = 0.8c is: | 1.67 | 1.25 | 0.6 | 5 | 1/√0.36.
M2: Lorentz transformations reduce to Galilean ones when: | v ≪ c | v = c | v > c | Always | γ → 1.

## Relativity of simultaneity
S: Events that happen at the same time in one inertial frame generally happen at different times in another. There's no universal "now": simultaneity depends on the observer's motion.
H: The rule
E: Δt′ = γ(Δt − vΔx/c^{2})
- If Δt = 0 but Δx ≠ 0, then Δt′ ≠ 0.
- In a frame moving along +x, of two events simultaneous in S, the one further along +x happens earlier.
H: Einstein's train
P: Lightning strikes both ends of a train simultaneously in the platform frame. A passenger at the middle, moving towards the front flash, meets its light first. Since light travels at c in the train frame too and she is equidistant from both ends, she concludes the front strike happened first. Both observers are right in their own frames.
H: Consequences
- Resolves paradoxes like the barn-and-pole (ladder) paradox.
- No contradiction with causality: only spacelike-separated events can change order; causally connected events keep their order in all frames.
X: Two clocks 600 m apart are synchronised in their rest frame. A ship passes at 0.8c. Time difference between the clocks as seen from the ship?
> Δt′ = γvΔx/c^{2} = (5/3)(0.8)(600)/(3 × 10^{8}) = 2.7 μs
!: Simultaneity differences aren't caused by light delays; they remain after correcting for travel times.
Q: Why isn't simultaneity absolute? | The Lorentz transformation mixes space and time: Δt′ depends on Δx.
Q: Can the time order of causally connected events change? | No; only events with spacelike separation can appear in different orders.
M1: Two events simultaneous in S and separated in x will, in a frame moving along x, be: | Not simultaneous | Simultaneous | Reversed in causality | At the same place | Δt′ ∝ Δx.
M2: The relativity of simultaneity arises from the term: | vx/c^{2} | γ | c | v^{2} | In t′.

## Time dilation
S: A clock moving relative to you ticks more slowly than one at rest beside you, by the factor γ. The effect is tiny at everyday speeds but large near c, and it's confirmed by particle decays and atomic clocks in aircraft and satellites.
H: The formula
E: Δt = γΔτ :: Δτ = proper time (in the clock's rest frame)
- Symmetric: each observer sees the other's clock run slow (no contradiction, because of relative simultaneity).
H: Light clock derivation
P: A light pulse bounces between mirrors a distance L apart. At rest it takes 2L/c per tick. Moving sideways at v, the light travels a longer diagonal path at the same speed c, so each tick takes longer: Δt = (2L/c)/√(1 − v^{2}/c^{2}).
H: Evidence
- Cosmic-ray muons reach the ground.
- Muons at CERN's storage ring live 29.3 times longer (γ = 29.3), matching to 0.1%.
- Hafele–Keating (1971): atomic clocks flown around the world.
- GPS satellites: −7 μs per day from speed (plus +45 μs from gravity).
- Particle accelerators routinely rely on it.
X: Muons (τ = 2.2 μs) created at 15 km travel at 0.999c. Do they reach the ground?
> Without dilation: range ≈ 660 m
> γ = 22.4: mean range ≈ 14.7 km, so a good fraction survive
!: Time dilation isn't an illusion or a clock malfunction; all processes in the moving frame, including biological ones, slow down.
Q: What is proper time? | Time measured by a clock moving with the object, in its rest frame.
Q: Give evidence for time dilation. | Cosmic-ray muons reaching the ground; muon lifetimes in storage rings; atomic clocks on aircraft; GPS.
M1: A clock moving at 0.6c runs slow by factor: | 1.25 | 0.8 | 1.67 | 0.6 | γ.
M2: Time dilation affects: | All physical processes in the moving frame | Only light clocks | Only electronic clocks | Nothing real | Universal.

## Length contraction
S: An object moving relative to you is shorter along its direction of motion than when measured at rest, by the factor γ. Its dimensions perpendicular to the motion are unchanged.
H: The formula
E: L = L_{0}/γ :: L_{0} = proper length (rest length)
- Only along the motion.
- Symmetric: each observer measures the other's rulers as contracted.
H: Why it happens
P: Measuring a moving object's length means marking both ends at the same time in your frame. Because simultaneity differs between frames, your "same time" isn't the object's, and the measured length comes out shorter. Length contraction and time dilation are two sides of one transformation.
H: Muon's view
- In the muon's frame, its lifetime is 2.2 μs, but the atmosphere is contracted: 15 km becomes ~670 m at γ = 22.4, short enough to cross. Both frames agree on what happens.
H: Seeing vs measuring
- A fast-moving sphere still looks circular (Terrell–Penrose rotation): light-travel-time effects distort the visual image differently from the contraction.
X: A 100 m spaceship passes at 0.8c. Its length as measured by you?
> γ = 5/3
> L = 60 m
!: Length contraction isn't a physical squashing due to forces; it's a property of how spacetime coordinates relate between frames.
Q: In which direction does length contraction occur? | Only along the direction of relative motion.
Q: How is the muon paradox explained in the muon's frame? | The atmosphere's thickness is length-contracted.
M1: A rod of proper length 2 m moving at 0.6c has length: | 1.6 m | 2.5 m | 2 m | 1.2 m | L_{0}/γ = 2/1.25.
M2: The perpendicular dimensions of a moving object are: | Unchanged | Contracted | Expanded | Doubled | Only longitudinal.

## Relativistic velocity addition
S: Velocities don't simply add in relativity. Combining speeds below c always gives a speed below c, and adding anything to the speed of light still gives c.
H: The formula (collinear)
E: u = (u′ + v)/(1 + u′v/c^{2})
- u′ = c gives u = c for any v.
- Low speeds: denominator ≈ 1, giving Galilean addition.
E: u_{y} = u′_{y}/(γ(1 + u′_{x}v/c^{2})) :: perpendicular component
H: Examples
- 0.5c + 0.5c = 0.8c.
- 0.9c + 0.9c = 0.994c.
- Rapidities add linearly: a cleaner way to combine boosts.
H: Fizeau experiment
P: Light in water moving at v travels at c/n + v(1 − 1/n^{2}), not c/n + v. Fresnel's "drag coefficient" (1 − 1/n^{2}) was explained by Einstein's velocity addition formula, a test of relativity half a century before the theory existed.
X: Two particles approach each other at 0.75c each (lab frame). Relative speed?
> u = (0.75 + 0.75)/(1 + 0.5625) = 0.96c
!: Closing speeds in the lab (1.5c here) can exceed c, since that's not the speed of any object; the speed of one particle relative to the other can't.
Q: State the relativistic velocity addition formula. | u = (u′ + v)/(1 + u′v/c^{2}).
Q: What do you get adding v to the speed of light? | c.
M1: 0.6c + 0.6c (relativistically) = | 0.88c | 1.2c | 0.6c | 0.36c | 1.2/1.36.
M2: The Fizeau experiment showed light in moving water is: | Only partially dragged | Fully dragged | Not affected | Slowed to zero | Consistent with velocity addition.

## Spacetime diagrams
S: Spacetime diagrams plot time against position, showing events as points and objects' histories as worldlines. They make relativity visual: light travels on 45° lines, and frames are skewed coordinate grids.
H: Elements
- Axes: ct (vertical) and x (horizontal), same units.
- **Event**: a point. **Worldline**: an object's path.
- Light rays: lines at 45°.
- Massive objects: worldlines steeper than 45° (slower than light).
H: Moving frames
- The ct′ axis (worldline of x′ = 0) tilts towards the light line by angle arctan(v/c).
- The x′ axis (line of t′ = 0, simultaneous events) tilts up by the same angle.
- Lines of simultaneity in S′ are parallel to x′: visibly different from S.
- Unit lengths on primed axes are stretched (hyperbolic calibration).
H: Using them
P: Spacetime diagrams resolve paradoxes (twins, ladder in barn) by showing which events are simultaneous in which frame. Light cones divide spacetime into past, future and elsewhere. In general relativity, curved spacetime diagrams (Penrose diagrams) map black holes and the universe.
X: Draw the worldline of an object at rest at x = 2 m and of a light flash leaving the origin.
> Object: vertical line at x = 2 m
> Light: 45° line from the origin
!: Spacetime diagrams use Minkowski geometry; the "length" of a tilted worldline segment isn't its Euclidean length on paper.
Q: What angle do light rays make on a spacetime diagram? | 45° (with ct and x in the same units).
Q: How do a moving frame's axes appear? | The ct′ and x′ axes tilt towards the light line, closing like scissors.
M1: A vertical worldline represents an object: | At rest | Moving at c | Accelerating | Moving left | Δx = 0.
M2: A worldline at less than 45° to the x-axis would represent: | Faster-than-light motion | Rest | Light | Normal motion | Spacelike.

## Minkowski spacetime
S: Minkowski spacetime is the four-dimensional geometry of special relativity, combining three dimensions of space and one of time. Its "distance", the interval, is the same for all observers, making spacetime the absolute stage of physics.
H: The metric
E: ds^{2} = c^{2}dt^{2} − dx^{2} − dy^{2} − dz^{2}
E: η_{μν} = diag(1, −1, −1, −1) :: (or −, +, +, + convention)
H: Kinds of interval
- **Timelike** (s^{2} > 0): events can be causally connected; there's a frame where they happen at the same place; √s^{2}/c is proper time.
- **Lightlike** (s^{2} = 0): connected by light.
- **Spacelike** (s^{2} < 0): no causal connection; there's a frame where they're simultaneous.
H: Geometry
P: Minkowski (1908): "Henceforth space by itself, and time by itself, are doomed to fade away into mere shadows, and only a kind of union of the two will preserve an independent reality." Lorentz transformations are rotations in this space, and physics laws are written as tensor equations, the same in every frame.
X: Two events: Δt = 5 μs, Δx = 900 m. Type of interval?
> (cΔt)^{2} = (1500 m)^{2}; Δx^{2} = (900 m)^{2}
> s^{2} > 0: timelike; proper time = √(1500^{2} − 900^{2})/c = 4 μs
!: The minus sign in the metric means spacetime "distances" can be zero between distinct events; it's not Euclidean geometry.
Q: What is the spacetime interval? | s^{2} = c^{2}Δt^{2} − Δx^{2} − Δy^{2} − Δz^{2}, invariant for all inertial observers.
Q: What does a spacelike interval mean? | The events can't be causally connected; some frame sees them as simultaneous.
M1: Two events connected by a light signal have interval: | Zero | Positive | Negative | Infinite | Lightlike.
M2: Proper time between timelike events is: | √(s^{2})/c | s^{2} | Δt | Δx/c | Invariant.

## Proper time
S: Proper time is the time measured by a clock carried along a worldline. It's the same for all observers, and it's maximised by straight (unaccelerated) worldlines between two events: the key to the twin paradox.
H: Definitions
E: dτ = dt√(1 − v^{2}/c^{2}) = dt/γ
E: τ = ∫dτ along the worldline
E: c^{2}dτ^{2} = ds^{2} :: proper time is the timelike interval
H: Properties
- Invariant: every observer computes the same proper time for a given worldline.
- Between two timelike-separated events, the inertial (straight) worldline has the longest proper time.
- Light has zero proper time: photons don't "experience" time.
H: In general relativity
P: Free-falling bodies follow geodesics that extremise proper time, which replaces Newton's law of gravity. A clock deeper in a gravitational well accumulates less proper time; GPS and optical clocks measure this precisely.
X: A traveller moves at 0.8c for 10 years of Earth time. Proper time elapsed?
> τ = 10 × √(1 − 0.64) = 6 years
!: Proper time isn't the time in "the proper frame" of observation; it's the time along a particular object's own worldline.
Q: What is proper time? | The time measured by a clock moving along a given worldline.
Q: Which worldline between two events has the most proper time? | The straight (inertial) one.
M1: A particle at γ = 2 for 1 s of lab time ages: | 0.5 s | 2 s | 1 s | 0.25 s | dτ = dt/γ.
M2: A photon's proper time between emission and absorption is: | Zero | Infinite | c | Equal to coordinate time | Lightlike.

## Four-vectors
S: Four-vectors combine a time-like component and three space components into objects that transform by Lorentz transformations. Writing physics with four-vectors makes relativistic invariance automatic.
H: Examples
E: x^{μ} = (ct, x, y, z) :: position
E: U^{μ} = γ(c, v) :: four-velocity; U·U = c^{2}
E: P^{μ} = (E/c, p) = mU^{μ} :: four-momentum
E: K^{μ} = (ω/c, k) :: wave four-vector
E: J^{μ} = (cρ, J) :: four-current
H: Invariants
E: A·B = A^{0}B^{0} − A·B (three-vector dot product)
- Same value in every frame: e.g. P·P = m^{2}c^{2}.
- Use invariants to solve problems in the most convenient frame.
H: Transformations
P: Four-vectors transform like (ct, x) under boosts: A′^{0} = γ(A^{0} − βA^{1}), A′^{1} = γ(A^{1} − βA^{0}). The relativistic Doppler effect and aberration follow from transforming K^{μ}; conservation laws become a single statement: total four-momentum is conserved.
X: A particle of mass m moves at 0.6c. Four-velocity components?
> γ = 1.25
> U = (1.25c, 0.75c, 0, 0); U·U = (1.5625 − 0.5625)c^{2} = c^{2} ✓
!: Ordinary three-velocity isn't part of a four-vector by itself; the four-velocity includes the factor γ.
Q: What is four-momentum? | P^{μ} = (E/c, p), with invariant P·P = m^{2}c^{2}.
Q: Why are four-vector dot products useful? | They're the same in all frames, so they can be evaluated in the easiest one.
M1: The magnitude of four-velocity is always: | c | v | γc | 0 | Normalised.
M2: Charge density and current density form: | A four-vector | Two scalars | A tensor of rank 2 | Nothing relativistic | J^{μ}.

## Relativistic momentum
S: Momentum in relativity is p = γmv, which grows without limit as an object approaches c. With this definition, momentum is conserved in all inertial frames.
H: The formula
E: p = γmv
E: p = √(E^{2} − m^{2}c^{4})/c
- Newtonian limit p ≈ mv for v ≪ c.
- As v → c, p → ∞: infinite force would be needed to reach c.
H: Why not p = mv?
P: In a collision analysed in two frames, mv isn't conserved in both: Lorentz transformations change velocities non-linearly. Demanding conservation in all frames forces p = γmv. Some older texts call γm "relativistic mass", but modern physics treats m as the invariant rest mass.
H: Evidence
- Particle tracks in magnetic fields: r = p/(qB) with p = γmv (Bucherer, 1908; all accelerators).
- Accelerator design: magnet strength must rise with γ.
X: Momentum of an electron with γ = 10?
> v ≈ 0.995c
> p = 10 × 9.11 × 10^{-31} × 0.995 × 3 × 10^{8} = 2.7 × 10^{-21} kg m s^{-1} (≈ 5.1 MeV/c)
!: "Relativistic mass increase" is an outdated way of describing p = γmv; inertia in different directions isn't simply γm.
Q: What is relativistic momentum? | p = γmv.
Q: Why can't a massive object reach c? | Its momentum and energy would become infinite.
M1: At v = 0.6c, p/mv (Newtonian) = | 1.25 | 1 | 0.8 | 1.6 | γ.
M2: Particle physicists quote momentum in: | MeV/c or GeV/c | kg m s^{-1} only | Joules | Newtons | Natural units.

## Mass-energy equivalence
S: Mass and energy are equivalent: any system's rest mass corresponds to an energy E = mc^{2}. Adding energy to a system increases its mass; releasing energy decreases it. This powers stars, nuclear energy and particle creation.
H: The relation
E: E_{0} = mc^{2}
- c^{2} ≈ 9 × 10^{16} J kg^{-1}: tiny masses hold enormous energy.
- 1 u = 931.5 MeV; m_{e}c^{2} = 0.511 MeV; m_{p}c^{2} = 938.3 MeV.
H: Examples
- Nuclear binding: nuclei weigh less than their parts.
- Sun loses ~4 × 10^{9} kg s^{-1} as radiated energy.
- A hot cup of tea is heavier than a cold one (by ~10^{-14} kg).
- Pair production and annihilation: γ ↔ e^{+}e^{−}.
- Proton mass mostly from QCD energy.
H: Einstein's argument
P: Einstein (1905) considered a body emitting two equal light pulses in opposite directions. In a moving frame, momentum conservation requires the body's mass to drop by E/c^{2}. Inertia and energy are the same thing.
X: How much mass becomes energy when a reactor delivers 1 MW for a year (3.15 × 10^{13} J)?
> m = E/c^{2} = 3.15 × 10^{13}/9 × 10^{16} = 3.5 × 10^{-4} kg = 0.35 g
> A 3 GW (thermal) reactor converts about 1 kg of mass to energy each year
!: E = mc^{2} isn't only about nuclear reactions; chemical reactions also change mass, just by amounts too small to weigh.
Q: What does E = mc^{2} mean? | A system's rest mass is equivalent to energy; adding energy increases mass.
Q: How much energy is the rest mass of an electron? | 0.511 MeV.
M1: The Sun's mass loss rate to radiation is about: | 4 × 10^{9} kg s^{-1} | 4 kg s^{-1} | 4 × 10^{20} kg s^{-1} | 0 | L/c^{2}.
M2: In chemical reactions, mass: | Changes very slightly | Never changes | Changes a lot | Doubles | ~eV per atom.

## Relativistic energy
S: A moving object's total energy is its rest energy multiplied by γ. Kinetic energy is the difference between total and rest energy, reducing to ½mv^{2} at low speed but growing without limit as v approaches c.
H: Formulas
E: E = γmc^{2}
E: KE = (γ − 1)mc^{2}
E: KE ≈ ½mv^{2} + (3/8)mv^{4}/c^{2} + … :: low-speed expansion
H: Accelerating particles
- Energy gained through voltage V: KE = qV.
- An electron through 1 MV: γ = 2.96, v = 0.94c.
- Through 10 GV (SLAC-like): γ ≈ 20 000, v differs from c by ~1 part in 10^{9}.
- At high energies, speed barely changes; energy and momentum keep growing.
H: Bertozzi's experiment
P: Bertozzi (1964) accelerated electrons to measured kinetic energies and timed their flight over 8.4 m. Speeds approached c as energy increased, and the heat deposited matched KE: a direct demonstration that v^{2} ∝ KE fails at high speed.
X: Kinetic energy of a proton at 0.9c?
> γ = 2.29
> KE = 1.29 × 938 MeV = 1.21 GeV (Newtonian would give 380 MeV)
!: Don't use ½mv^{2} at speeds above about 0.1c; errors exceed ~1%.
Q: What is relativistic kinetic energy? | KE = (γ − 1)mc^{2}.
Q: Why does speed barely increase for very high-energy particles? | γ grows enormously as v approaches c; energy rises while v stays just below c.
M1: An electron accelerated through 511 kV has γ = | 2 | 1.5 | 511 | 0.5 | KE = mc^{2}.
M2: At low speed, (γ − 1)mc^{2} approaches: | ½mv^{2} | mc^{2} | mv | 0 always | Binomial expansion.

## Energy-momentum relation
S: The energy–momentum relation links a particle's total energy, momentum and mass, valid at any speed. It applies to massless particles too, which carry momentum E/c.
H: The relation
E: E^{2} = (pc)^{2} + (mc^{2})^{2}
E: v = pc^{2}/E
- Massless (photons, gluons): E = pc; always travel at c.
- At rest: E = mc^{2}.
- Ultra-relativistic (E ≫ mc^{2}): E ≈ pc.
H: Invariant mass
E: M^{2}c^{4} = (ΣE)^{2} − (Σpc)^{2}
- The invariant mass of a group of particles is the same in all frames.
- Particle physicists find new particles as peaks in invariant mass distributions (Higgs → γγ at 125 GeV; Z → μμ at 91 GeV).
H: Natural units
P: With c = 1, E^{2} = p^{2} + m^{2}, and energy, momentum and mass all carry units of eV. Particle physicists say "a 125 GeV Higgs" and "a 0.511 MeV electron" for exactly this reason.
X: Two photons of 60 GeV each, at 180° to each other. Invariant mass?
> ΣE = 120 GeV; Σp = 0
> M = 120 GeV/c^{2}
!: Mass isn't additive in relativity: two photons, each massless, can together have a large invariant mass.
Q: State the energy–momentum relation. | E^{2} = (pc)^{2} + (mc^{2})^{2}.
Q: How do physicists discover short-lived particles in colliders? | As peaks in the invariant mass distribution of their decay products.
M1: A photon of energy 3 eV has momentum: | 3 eV/c | 0 | 3 eV | 1.5 eV/c | E = pc.
M2: Two 5 GeV photons moving in the same direction have invariant mass: | 0 | 10 GeV | 5 GeV | 25 GeV | Σp = ΣE/c.

## Relativistic collisions
S: In high-energy collisions, energy and momentum are conserved as four-vectors, but rest mass isn't: kinetic energy can turn into new particles. Analysing collisions with invariants tells you threshold energies and what can be produced.
H: Tools
- Conservation of four-momentum: ΣP_{in} = ΣP_{out}.
- Invariant mass √s (centre-of-mass energy) is the energy available.
E: s = (E_{1} + E_{2})^{2} − (p_{1} + p_{2})^{2}c^{2}
E: √s ≈ √(2E_{beam}mc^{2}) :: fixed target, E ≫ mc^{2}
E: √s = 2E_{beam} :: symmetric collider
H: Threshold energies
E: E_{th} = ((Σm_{f})^{2} − m_{1}^{2} − m_{2}^{2})c^{2}/(2m_{2}) :: fixed target (projectile 1)
- Antiproton production (p + p → p + p + p + p̄): threshold 5.6 GeV beam energy (Bevatron, 1955).
H: Compton and other examples
- Compton scattering from four-momentum conservation.
- GZK limit: cosmic-ray protons above ~5 × 10^{19} eV lose energy creating pions on CMB photons.
X: Minimum proton beam energy to produce an antiproton on a stationary proton target?
> Need Σm_{f} = 4m_{p}: (16 − 2)m_{p}^{2}c^{4}/(2m_{p}c^{2}) = 7m_{p}c^{2}
> Total E = 6.6 GeV, kinetic 5.6 GeV
!: In fixed-target collisions most energy goes into moving the centre of mass, not into creating particles.
Q: What is √s? | The total energy in the centre-of-mass frame, available for producing particles.
Q: Why are colliders more efficient than fixed targets? | All the beam energy is available in the centre-of-mass frame.
M1: Kinetic energy threshold to make an antiproton on a fixed proton target: | 5.6 GeV | 1.9 GeV | 938 MeV | 100 GeV | Bevatron.
M2: The GZK limit arises from cosmic rays interacting with: | CMB photons | Earth's atmosphere | Magnetic fields | Dark matter | Pion production.

## Relativistic Doppler effect
S: The relativistic Doppler effect is the change in frequency of light from a moving source, including time dilation. Unlike sound, it depends only on the relative velocity, and it measures speeds of stars, galaxies and quasars.
H: Formulas
E: f_{obs} = f_{s}√((1 − β)/(1 + β)) :: receding (β = v/c)
E: f_{obs} = f_{s}√((1 + β)/(1 − β)) :: approaching
E: f_{obs} = f_{s}/γ :: transverse (pure time dilation)
E: 1 + z = λ_{obs}/λ_{emit}
H: Transverse Doppler effect
P: Even moving perpendicular to the line of sight, a source is redshifted by time dilation alone: a purely relativistic effect. Ives and Stilwell (1938) confirmed it using fast hydrogen ions; modern ion-storage-ring experiments test it to parts per billion.
H: Astronomy
- Radial velocities of stars from spectral line shifts (exoplanets: ~1 m s^{-1}).
- Quasars with z > 7; cosmological redshift (due to expansion, related but distinct).
- Relativistic jets: Doppler boosting makes approaching jets far brighter.
X: A galaxy's Hα (656 nm) is seen at 788 nm. Recession speed (special-relativistic formula)?
> 1 + z = 1.2; (1 + β)/(1 − β) = 1.44
> β = 0.18: 54 000 km s^{-1}
!: Cosmological redshifts aren't strictly Doppler shifts; they arise from the expansion of space, and z can exceed 1 without implying faster-than-light motion through space.
Q: What is the transverse Doppler effect? | A redshift from time dilation of a source moving perpendicular to the line of sight.
Q: How is redshift z defined? | 1 + z = λ_{observed}/λ_{emitted}.
M1: A source receding at 0.6c has frequency reduced by factor: | 0.5 | 0.6 | 0.8 | 0.4 | √(0.4/1.6).
M2: Relativistic Doppler depends on: | Only the relative velocity | Source and observer velocities separately | The medium | Wind | No medium for light.

## Relativistic electromagnetism
S: Electricity and magnetism are two aspects of one electromagnetic field that transforms between frames. What one observer calls a magnetic force, another calls an electric force; relativity was born from this unity.
H: Field transformations (boost along x)
E: E′_{∥} = E_{∥}; B′_{∥} = B_{∥}
E: E′_{⊥} = γ(E + v × B)_{⊥}; B′_{⊥} = γ(B − v × E/c^{2})_{⊥}
H: Field tensor
E: F^{μν} :: combines E and B into one antisymmetric tensor
E: ∂_{μ}F^{μν} = μ_{0}J^{ν} :: Maxwell's equations in two lines
- Invariants: E^{2} − c^{2}B^{2} and E·B are the same in all frames.
H: Magnetism from electricity
P: A wire with equal densities of positive ions and moving electrons is neutral in the lab. For a charge moving alongside, length contraction makes the electron density and ion density differ in its frame: the wire is charged, and the charge feels an electric force. That's the magnetic force in the lab frame. Magnetism is a relativistic effect of electricity, even at drift speeds of mm s^{-1}, because the charge densities involved are enormous.
X: A charge q moves at v parallel to a wire carrying current I, distance r away. Lab-frame force?
> F = qvB = qvμ_{0}I/(2πr)
> In the charge's frame, the same force appears as electric, from the wire's net charge density
!: Maxwell's equations were already relativistic; it was Newtonian mechanics that needed to change.
Q: Which quantities are invariant for electromagnetic fields? | E^{2} − c^{2}B^{2} and E·B.
Q: How can magnetism be seen as a relativistic effect? | Length contraction changes charge densities in a moving frame, so a magnetic force in one frame is an electric force in another.
M1: A pure electric field in one frame appears, in a moving frame, as: | Electric plus magnetic fields | Only magnetic | Zero | Gravitational | Field transformation.
M2: Maxwell's equations are invariant under: | Lorentz transformations | Galilean transformations | Neither | Both | Relativistic.

## Causality and light cones
S: The light cone of an event divides spacetime into its causal future, causal past and the elsewhere region it can never influence. Since nothing travels faster than light, cause must precede effect in every frame.
H: Regions
- **Future light cone**: events reachable by signals at or below c.
- **Past light cone**: events that could have influenced this one.
- **Elsewhere** (spacelike): no causal connection possible; their time order is frame-dependent.
H: Faster-than-light signals
P: If a signal could travel faster than light, some frames would see it arrive before it was sent; combining two such signals could send a message into your own past, causing paradoxes. That's why relativity forbids it. Quantum entanglement doesn't violate this: it can't transmit information.
H: Apparent superluminal motion
- Quasar jets moving at ~0.99c towards us can appear to move sideways at 5–10c because light from later positions has less distance to travel.
- Phase velocities, shadows and laser spots can exceed c, carrying no information.
- Expanding space lets distant galaxies recede faster than c; that's not motion through space.
X: Event A: (t = 0, x = 0). Event B: (t = 1 s, x = 4 × 10^{8} m). Can A cause B?
> Light covers 3 × 10^{8} m in 1 s; B is farther
> Spacelike: no causal connection
!: Apparent faster-than-light effects never carry information or causes; check whether anything physical travels.
Q: What is the elsewhere region of an event? | Spacelike-separated events that can't be causally connected to it.
Q: Why does faster-than-light signalling threaten causality? | It would allow effects before causes in some frames, and messages into the past.
M1: Events inside an event's future light cone: | Can be influenced by it | Can't be influenced | Are simultaneous | Are in its past | Timelike future.
M2: Apparent superluminal jet motion is caused by: | Light-travel-time effects for jets moving towards us | Real faster-than-light motion | Lensing | Errors | Geometry.

## Twin paradox
S: One twin travels to a distant star at high speed and returns younger than the twin who stayed home. It seems paradoxical because each sees the other's clock run slow, but the situation isn't symmetric: the traveller changes inertial frames.
H: The numbers
- Trip to a star 4 light-years away at 0.8c and back.
- Earth twin: 10 years pass.
- Traveller: γ = 5/3, each leg 3 years: 6 years.
H: Resolving it
- Only the traveller accelerates (feels forces) and changes frames at turnaround.
- In spacetime terms: the Earth twin's worldline is straight; the traveller's is bent. Straight worldlines have the longest proper time.
- At turnaround, the traveller's plane of simultaneity swings, and her assignment of "now" on Earth jumps forward by years.
- Doppler analysis gives the same answer without any frame-switching: count signals each twin sends per year.
H: Experiments
P: Muons in storage rings (circular motion) live longer exactly as predicted; atomic clocks flown around the world and returned show the predicted time differences (Hafele–Keating, 1971, including gravitational effects). The "paradox" is fully real.
X: Doppler check: outbound at 0.8c, how many birthday signals per year (Earth's) does the traveller receive?
> Receding factor √(0.2/1.8) = 1/3: one per 3 traveller-years
> Returning factor 3: three per traveller-year
> Over 3 + 3 years: 1 + 9 = 10 Earth birthdays ✓
!: The acceleration itself doesn't cause the age difference; the asymmetry in worldlines (and frames) does. The effect grows with distance, not acceleration time.
Q: Why isn't the twin paradox symmetric? | Only the travelling twin changes inertial frames; her worldline is bent.
Q: Which worldline between two events has the longest proper time? | The straight, inertial one.
M1: A twin travels at 0.6c for 8 years (Earth time) round trip. She ages: | 6.4 years | 8 years | 10 years | 4.8 years | 8/1.25.
M2: The twin effect has been confirmed with: | Atomic clocks on aircraft | Real twins | Only thought experiments | Light only | Hafele–Keating.

## Relativistic particle dynamics
S: Relativistic dynamics describes how forces change momentum and energy at any speed. It underlies accelerator design, cosmic-ray physics, plasma physics and astrophysical jets.
H: Equations of motion
E: F = dp/dt = d(γmv)/dt
E: dE/dt = F·v
E: dP^{μ}/dτ = qF^{μν}U_{ν} :: covariant Lorentz force
- Force and acceleration needn't be parallel: longitudinal and transverse responses differ (γ^{3}m and γm).
H: Constant force (hyperbolic motion)
E: x(t) = (c^{2}/a)(√(1 + (at/c)^{2}) − 1)
- Speed approaches c asymptotically; proper acceleration a constant.
- At 1g, a traveller could cross the galaxy (~100 000 ly) in ~25 years of their own time (needing impossible fuel).
H: Radiation
E: P = q^{2}a^{2}γ^{6}/(6πε_{0}c^{3}) :: linear acceleration (Liénard)
- Circular motion: γ^{4}; synchrotron radiation, emitted in a narrow forward cone of angle ~1/γ.
- Synchrotron radiation limits electron accelerators but powers light sources and explains radio emission from jets and pulsar nebulae.
X: Time for a ship at 1g proper acceleration to reach 0.99c (ship time)?
> Rapidity φ = artanh 0.99 = 2.65; τ = cφ/a
> τ = 3 × 10^{8} × 2.65/9.8 = 8.1 × 10^{7} s ≈ 2.6 years
!: Constant force doesn't give constant acceleration in the lab frame at relativistic speeds; acceleration falls as γ^{−3}.
Q: State the relativistic form of Newton's second law. | F = dp/dt with p = γmv.
Q: Why is synchrotron radiation emitted in a narrow cone? | Relativistic beaming concentrates radiation into an angle ~1/γ around the velocity.
M1: Under constant proper acceleration, speed: | Approaches c asymptotically | Exceeds c | Stays constant | Falls | Hyperbolic motion.
M2: Synchrotron radiation power for circular motion scales as: | γ^{4} | γ | γ^{2} | γ^{−1} | Strong γ dependence.
`;
