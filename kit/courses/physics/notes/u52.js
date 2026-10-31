// Unit 52: Advanced Problem-Solving Skills. Format: kit/course/notes.js
export default `
## Identifying relevant physical principles
S: The hardest step in many physics problems is deciding which principles apply. Recognising cues in the problem, such as collisions, rotation, fields or equilibrium, and matching them to conservation laws, Newton's laws or field equations, unlocks the solution.
H: Matching cues to principles
- **Speeds at different heights or positions, no time asked**: energy conservation.
- **Collisions, explosions, recoil**: momentum conservation.
- **Forces, accelerations, tensions**: Newton's second law.
- **Rotation about an axis, spinning objects**: torque and angular momentum.
- **Equilibrium, no acceleration**: ΣF = 0 and Στ = 0.
- **Charges, fields, potentials**: Gauss's law, Coulomb's law, energy.
- **Changing flux**: Faraday's law.
- **Waves, interference**: superposition and path differences.
- **Gases, heat, engines**: first and second laws of thermodynamics.
H: Experts vs novices
- Novices sort problems by surface features (inclined planes, pulleys).
- Experts sort by deep principles (energy conservation, Newton's second law) (Chi, Feltovich and Glaser, 1981).
- Practise classifying problems by principle before solving.
E: E_{i} + W_{nc} = E_{f} :: work–energy principle, often the most efficient choice
H: Combining principles
P: Many problems need several principles in sequence: a ballistic pendulum uses momentum conservation in the collision (energy is lost) then energy conservation in the swing. Choosing the wrong principle at a stage (energy across an inelastic collision) gives wrong answers. Ask at each stage: which quantities are conserved? Which forces do work? Is the system isolated?
X: A bullet embeds in a hanging block, which then swings up. Which principles apply, and where?
> Collision: momentum conserved (KE not), mv = (m + M)V
> Swing: energy conserved, ½(m + M)V^{2} = (m + M)gh
X: A ball rolls without slipping down a ramp. Principle for its speed at the bottom?
> Energy conservation including rotational KE: mgh = ½mv^{2} + ½Iω^{2}
K: Read problems for cues, classify by underlying principle, and check which quantities are conserved at each stage.
!: Surface similarity can mislead; two inclined-plane problems may need completely different principles.
Q: When is momentum conserved? | When the net external force on the system is zero (or negligible during a brief impact).
Q: How do experts classify physics problems? | By the underlying principles, not surface features.
M1: For speed after a frictionless slide, the best principle is: | Energy conservation | Momentum conservation | Faraday's law | Ohm's law | No time needed.
M2: In a ballistic pendulum, kinetic energy is conserved: | Only during the swing, not the collision | During both | Never | Only in the collision | Inelastic impact.

## Defining systems and boundaries
S: Choosing the system, what's included and what's outside, determines which forces are internal or external, which energies are counted and which quantities are conserved. A good choice can turn a messy problem into a simple one.
H: Why it matters
- Internal forces cancel in pairs (Newton's third law); only external forces change total momentum.
- Energy transfers across boundaries as work or heat.
- Conservation laws apply to isolated (or closed) systems.
H: System types (thermodynamics)
- **Isolated**: no exchange of energy or matter.
- **Closed**: energy can cross, matter can't.
- **Open**: both cross (control volumes in fluid flow).
E: ΔE_{system} = Q + W :: first law with work done on the system
E: Σ F_{ext} = dP_{total}/dt :: only external forces change momentum
H: Choosing well
P: For a person jumping off a boat, take person + boat to use momentum conservation. For tension in a rope between blocks, isolate one block. For a rocket, define a system including expelled fuel (or use a control volume). In gravitational potential energy, include Earth in the system; otherwise treat gravity as external work. Draw the boundary on your diagram.
X: Two blocks (2 kg and 3 kg) linked by a string are pulled by 10 N on a frictionless surface. Tension in the string?
> Whole system: a = 10/5 = 2 m s^{-2}
> Rear block (2 kg) alone: T = 2 × 2 = 4 N
X: A 60 kg person jumps from a 120 kg boat at 2 m s^{-1}. Boat recoil?
> System person + boat: 0 = 60 × 2 + 120v ⇒ v = −1 m s^{-1}
K: Define the system deliberately; internal forces cancel, and boundaries determine how energy and momentum are exchanged.
!: Mixing systems mid-problem (counting a force as both internal and external) leads to double-counting.
Q: What is an isolated system? | One with no exchange of energy or matter with its surroundings.
Q: Why include Earth when using gravitational potential energy? | Potential energy belongs to the interacting pair; otherwise gravity is treated as external work.
M1: Internal forces in a system: | Cancel in action–reaction pairs | Change total momentum | Are always zero | Are external | Newton's third law.
M2: A control volume is used for: | Open systems like fluid flow | Isolated systems only | Static charges | Quantum states | Mass crosses the boundary.

## Choosing coordinate systems
S: The right coordinate system can make a problem simple: aligning axes with motion, using polar coordinates for circles and spherical coordinates for spheres. Physics doesn't depend on coordinates, but the difficulty of the maths does.
H: Common choices
- **Cartesian (x, y, z)**: straight-line motion, rectangular boundaries.
- **Tilted axes on inclines**: x along the slope, y perpendicular, so acceleration lies along one axis.
- **Polar (r, θ)**: circular and central-force motion.
- **Cylindrical (r, φ, z)**: wires, solenoids, pipes.
- **Spherical (r, θ, φ)**: point charges, planets, hydrogen atom.
- **Generalised coordinates**: angles of pendulums, normal modes.
E: a = (r̈ − rθ̇^{2})r̂ + (rθ̈ + 2ṙθ̇)θ̂ :: acceleration in polar coordinates
E: ∇^{2}f = (1/r^{2})∂_{r}(r^{2}∂_{r}f) + … :: spherical Laplacian (radial part)
H: Frames of reference
- Inertial frames simplify Newton's laws; rotating frames add centrifugal and Coriolis terms.
- Centre-of-mass frame simplifies collisions (total momentum zero).
- Frames moving with a current or conveyor can simplify relative motion problems.
H: Tips
P: Choose axes along accelerations or symmetry directions. Put the origin where the most things are zero. Define positive directions clearly and stick to them; signs are a major source of error. Exploit symmetry: a uniformly charged sphere needs only r. Switch frames if it simplifies (centre-of-mass frame for elastic collisions).
X: A block slides down a 30° frictionless incline. With tilted axes, what's the acceleration?
> Along slope: a = g sin 30° = 4.9 m s^{-2}; perpendicular: N = mg cos 30° (no acceleration)
X: In the CM frame, two equal masses collide elastically head-on at ±v. Outcome?
> They reverse velocities: ∓v; transform back to the lab frame afterward
K: Align coordinates with motion and symmetry; switch frames (CM, rotating) when it simplifies the physics.
!: Mixing sign conventions between steps (e.g. up positive, then down positive) is a classic error.
Q: Why use tilted axes on an incline? | So acceleration lies along one axis, avoiding coupled components.
Q: What extra forces appear in rotating frames? | Centrifugal and Coriolis forces (fictitious forces).
M1: Point-charge problems are simplest in: | Spherical coordinates | Cartesian coordinates | Cylindrical always | Tilted axes | Spherical symmetry.
M2: The centre-of-mass frame has total momentum: | Zero | Maximum | Equal to the energy | Undefined | By definition.

## Drawing free-body and field diagrams
S: Free-body diagrams isolate one object and show every force on it, while field diagrams map electric, magnetic or gravitational fields. Drawing them carefully is often the decisive step in solving force and field problems correctly.
H: Free-body diagram checklist
- Choose one object; draw it simply (a dot or box).
- Identify each interaction: contact forces (normal, friction, tension, drag) and non-contact (gravity, electric, magnetic).
- Draw arrows from the object with directions and labels; lengths roughly proportional to magnitude.
- Don't include forces the object exerts on others, or "ma" as a force.
- Choose axes; resolve components; apply ΣF = ma.
E: ΣF_{x} = ma_{x}, ΣF_{y} = ma_{y} :: component form of Newton's second law
H: Field diagrams
- Electric field lines start on positive charges, end on negative; density shows strength.
- Equipotential lines are perpendicular to field lines.
- Magnetic field lines form closed loops; right-hand rule for currents.
- Gravitational fields point towards masses.
E: E = −∇V :: field perpendicular to equipotentials
H: Common errors
P: Adding a "centripetal force" alongside the real forces providing it; forgetting the normal force or friction direction; drawing the force of the object on the floor; putting weight at the wrong angle on inclines (it's always vertical). For pulleys, draw separate diagrams for each mass with the same tension (ideal rope).
X: A 2 kg mass hangs at rest from two strings at 30° and 60° to the horizontal. Tensions?
> Horizontal: T_{1}cos 30° = T_{2}cos 60°
> Vertical: T_{1}sin 30° + T_{2}sin 60° = 19.6 N
> T_{2} = √3T_{1} ⇒ 0.5T_{1} + 1.5T_{1} = 19.6 ⇒ T_{1} = 9.8 N, T_{2} ≈ 17.0 N
X: Sketch fields for a dipole. What happens along the perpendicular bisector?
> The field is parallel to the dipole axis (pointing from + to − side), and the potential is zero there
K: Isolate the object, draw only real forces acting on it, resolve along sensible axes; field lines and equipotentials are perpendicular.
!: "ma" is not a force; it's the result of the net force.
Q: What forces appear on a book resting on a table? | Weight (down) and normal force (up), equal and opposite.
Q: How are equipotentials related to field lines? | They are always perpendicular.
M1: Weight on an incline always points: | Vertically down | Perpendicular to the slope | Along the slope | Upward | Towards Earth's centre.
M2: Magnetic field lines: | Form closed loops | Start on north monopoles | End on charges | Are perpendicular to currents always | No monopoles.

## Applying conservation laws
S: Conservation laws, of energy, momentum, angular momentum and charge, are among the most powerful problem-solving tools because they connect initial and final states without needing details in between. Knowing when each applies is the key.
H: The laws and their conditions
- **Energy**: always conserved overall; mechanical energy conserved if only conservative forces do work.
- **Linear momentum**: conserved if net external force is zero.
- **Angular momentum**: conserved if net external torque is zero (about the chosen point).
- **Charge**: always conserved.
- Others: mass–energy in relativity, baryon and lepton numbers in particle physics.
E: ΣE_{initial} + W_{external} = ΣE_{final} + Q_{lost} :: energy accounting
E: Iω = const :: angular momentum with no external torque
H: Problem patterns
- **Speeds from heights, springs**: energy.
- **Collisions**: momentum (always), energy (elastic only).
- **Spinning skaters, collapsing stars, satellites**: angular momentum.
- **Kirchhoff's current law**: charge conservation at junctions.
- **Particle decays**: energy, momentum, charge and quantum numbers.
H: Strategy
P: Define system and initial/final states; list conserved quantities; write equations; solve. Conservation laws often reduce problems to algebra. When forces are unknown or complicated (collisions, explosions), conservation laws bypass them. Combine with other principles when a stage involves non-conservative effects.
X: A skater spins at 2 rev s^{-1} with I = 4 kg m^{2}, then pulls in arms to I = 1.6 kg m^{2}. New spin rate? KE change?
> ω_{f} = 2 × 4/1.6 = 5 rev s^{-1}
> KE ∝ Iω^{2}: ratio = (1.6 × 25)/(4 × 4) = 2.5: kinetic energy rises (work done by arms)
X: A 0.5 kg ball compresses a spring (k = 200 N m^{-1}) by 0.1 m. Launch speed?
> ½kx^{2} = ½mv^{2} ⇒ v = x√(k/m) = 0.1 × 20 = 2 m s^{-1}
K: Conservation laws relate initial and final states directly; check conditions (no external force, torque or non-conservative work).
!: Angular momentum is conserved about a point only if external torque about that point is zero; choose the point carefully.
Q: When is mechanical energy conserved? | When only conservative forces do work.
Q: Why does a skater's kinetic energy increase when they pull in their arms? | They do work pulling their arms inward against centrifugal effects, while angular momentum is conserved.
M1: In all collisions, which is conserved for an isolated system? | Momentum | Kinetic energy | Velocity | Mass distribution | KE only if elastic.
M2: Kirchhoff's current law reflects conservation of: | Charge | Energy | Momentum | Mass | At junctions.

## Deriving equations from fundamental laws
S: Many problems require building your own equations from fundamental laws rather than using memorised formulas. Practising derivations develops flexibility, so you can tackle situations no textbook formula covers exactly.
H: Approach
- Start from the most general relevant law: Newton's second law, Maxwell's equations, conservation laws, the Schrödinger equation, the first law of thermodynamics.
- Specialise to the situation with stated assumptions.
- Set up differential equations if quantities vary (forces depending on speed, position or time).
- Solve and interpret.
E: m dv/dt = mg − bv :: linear drag equation
E: v(t) = (mg/b)(1 − e^{−bt/m}) :: solution
H: Examples
- **Linear drag**: Newton's second law with F = −bv gives exponential approach to terminal velocity.
- **RC circuit**: Kirchhoff's voltage law gives dQ/dt = (V − Q/C)/R, so Q = CV(1 − e^{−t/RC}).
- **Rocket**: momentum conservation in small time steps gives Δv = v_{e}ln(m_{0}/m_{f}).
- **Gauss's law for a wire**: E = λ/(2πε_{0}r).
- **Hydrostatic pressure**: dp/dz = −ρg ⇒ p = p_{0} + ρgh.
H: Tips
P: Keep track of signs and directions; state assumptions (constant mass, small angles, uniform field). Check limits: at t → ∞, drag velocity tends to mg/b; at t → 0, v ≈ gt (free fall). Recognise standard ODE forms: first-order linear (exponential), SHM (sinusoidal), damped oscillation. Dimensional consistency at each step catches errors.
X: Derive the time constant for an RC discharge.
> Kirchhoff: Q/C + R dQ/dt = 0 ⇒ dQ/dt = −Q/(RC)
> Q = Q_{0}e^{−t/RC}; time constant τ = RC
X: Check the drag solution's limits.
> t → 0: e^{−x} ≈ 1 − x ⇒ v ≈ gt ✓; t → ∞: v → mg/b (terminal) ✓
K: Build equations from fundamental laws plus assumptions; solve the resulting ODEs and check limits.
!: Using a constant-acceleration formula when forces depend on velocity or position gives wrong answers.
Q: What is the time constant of an RC circuit? | τ = RC.
Q: What equation describes hydrostatic pressure? | dp/dz = −ρg, giving p = p_{0} + ρgh for constant density.
M1: Linear drag leads to velocity that: | Approaches terminal value exponentially | Grows linearly forever | Oscillates | Is constant | 1 − e^{−t/τ}.
M2: The rocket equation is derived from: | Momentum conservation | Energy conservation only | Ohm's law | Gauss's law | Small mass ejections.

## Checking units and dimensions
S: Dimensional analysis checks whether equations make sense and can even predict how quantities depend on each other. Every valid physics equation must be dimensionally consistent, so checking units is one of the fastest ways to catch mistakes.
H: Dimensions
- Base dimensions: mass [M], length [L], time [T], current [I], temperature [Θ], amount [N], luminous intensity [J].
- Force [MLT^{-2}], energy [ML^{2}T^{-2}], power [ML^{2}T^{-3}], pressure [ML^{-1}T^{-2}].
- Arguments of exp, log and sin must be dimensionless.
- Both sides of an equation, and every added term, must have the same dimensions.
E: [E] = ML^{2}T^{-2} :: dimensions of energy
H: Dimensional analysis to find relationships
- Assume a quantity depends on others as a power law; match dimensions to find exponents.
- **Buckingham π theorem**: n variables with k dimensions form n − k dimensionless groups.
- Example: pendulum period depends on L, g, m: T ∝ √(L/g) (mass drops out).
E: Number of π groups = n − k :: Buckingham π theorem
H: Uses and limits
P: Check final answers ("my velocity came out in m s^{-2}": error!). Derive scaling laws (drag ∝ ρv^{2}A; blast radius ∝ (Et^{2}/ρ)^{1/5}, used by G. I. Taylor to estimate the Trinity bomb yield from photographs). Dimensional analysis can't determine dimensionless constants (the 2π in a pendulum) or distinguish quantities with the same dimensions (torque vs energy).
X: Use dimensional analysis to find the speed of waves on a string from tension T and linear density μ.
> [T] = MLT^{-2}, [μ] = ML^{-1}; v = T^{a}μ^{b}
> M: a + b = 0; L: a − b = 1; T: −2a = −1 ⇒ a = ½, b = −½ ⇒ v ∝ √(T/μ)
X: Is s = ut + ½at^{3} dimensionally correct?
> [at^{3}] = LT^{-2}T^{3} = LT ≠ L: no
K: Check that every term has consistent dimensions; dimensional analysis also reveals scaling laws up to dimensionless constants.
!: Dimensional consistency is necessary but not sufficient; a dimensionally correct equation can still be wrong.
Q: What does the Buckingham π theorem state? | A relation among n variables with k independent dimensions can be written using n − k dimensionless groups.
Q: Why must the argument of an exponential be dimensionless? | Exponentials are power series in their argument; terms of different powers could not add unless dimensionless.
M1: The dimensions of power are: | ML^{2}T^{-3} | ML^{2}T^{-2} | MLT^{-2} | ML^{-1}T^{-2} | Energy per time.
M2: Dimensional analysis cannot determine: | Dimensionless constants like 2π | Exponents | Scaling laws | Unit consistency | Pure numbers.

## Evaluating limiting cases
S: Checking what an answer does in extreme or special cases, like zero mass, infinite time or a vanishing angle, is a powerful test. If an answer misbehaves in a limit where you know the physics, it's wrong.
H: Common limits to check
- **Zero or infinite parameter**: m → 0, k → ∞, R → 0, t → ∞.
- **Symmetric cases**: equal masses, θ = 45°, identical components.
- **Known special cases**: v ≪ c recovers Newtonian results; ħ → 0 recovers classical physics; large n recovers classical (correspondence principle).
- **Sign checks**: does a quantity have the right sign or direction?
E: E = γmc^{2} ≈ mc^{2} + ½mv^{2} (v ≪ c) :: relativistic energy's Newtonian limit
H: Examples
- Atwood machine: a = (m_{1} − m_{2})g/(m_{1} + m_{2}); equal masses give a = 0 ✓, m_{2} = 0 gives a = g ✓.
- Projectile range R = v^{2}sin 2θ/g: θ = 0 or 90° gives R = 0 ✓; maximum at 45° ✓.
- Resistors in parallel: R → ∞ for one branch gives the other's resistance ✓.
- Damped oscillator: ζ → 0 gives undamped SHM ✓.
H: Why it works
P: Limits often correspond to simpler problems you can solve intuitively. Experts routinely check limits before trusting results. Limits also guide guessing forms of answers and spotting errors in derivations, and help interpret results physically (what dominates when?).
X: A block on a frictionless incline: a = g sin θ. Check limits.
> θ = 0: a = 0 (flat) ✓; θ = 90°: a = g (free fall) ✓
X: Check T = 2π√(L/g) in a lift accelerating upward at a (effective g → g + a).
> a → −g (free fall): T → ∞ (pendulum doesn't swing) ✓
K: Test answers in limits where the physics is obvious; failing a limit check reveals an error.
!: Passing limit checks doesn't prove an answer correct, but failing one proves it wrong.
Q: What is the correspondence principle? | Quantum results approach classical ones in the limit of large quantum numbers.
Q: What limit should relativistic formulas reduce to? | Newtonian expressions when v ≪ c.
M1: For an Atwood machine with equal masses, acceleration is: | 0 | g | g/2 | 2g | Balanced.
M2: As θ → 90° on a frictionless incline, acceleration approaches: | g | 0 | g/2 | Infinity | Free fall.

## Estimating numerical answers
S: Before calculating, estimate roughly what the answer should be. Afterwards, compare. Estimation catches order-of-magnitude errors, misplaced powers of ten and unit mistakes, and builds the intuition that experts use to judge results.
H: Techniques
- Round numbers to one significant figure and powers of ten.
- Use known reference values (g ≈ 10 m s^{-2}, c ≈ 3 × 10^{8} m s^{-1}, 1 eV ≈ 1.6 × 10^{-19} J).
- Bound the answer: lower and upper estimates.
- Compare with familiar quantities (a car's mass ~1000 kg, power of a kettle ~2 kW).
H: Calculation hygiene
- Keep symbols until the end; plug in numbers once.
- Write units on every number; cancel them.
- Use scientific notation consistently.
- Sanity checks: speeds less than c, efficiencies below 100%, probabilities between 0 and 1.
E: E ≈ mc^{2} = 1 kg × (3 × 10^{8})^{2} ≈ 10^{17} J :: quick reference estimate
H: Examples of red flags
P: A car's kinetic energy at motorway speed should be ~10^{5}–10^{6} J. A falling human reaching 10^{4} m s^{-1} is wrong (terminal speed ~50 m s^{-1}). A capacitor storing a gigajoule in a phone is wrong. If your answer differs from your estimate by more than ~10×, look for an error before moving on.
X: Estimate the kinetic energy of a 1500 kg car at 30 m s^{-1}.
> ½ × 1500 × 900 ≈ 7 × 10^{5} J
X: Estimate the gravitational force between two 70 kg people 1 m apart.
> 6.7 × 10^{-11} × 70 × 70/1 ≈ 3 × 10^{-7} N, tiny
K: Estimate first, calculate symbolically, then compare; big discrepancies signal errors.
!: Calculators don't catch unit or power-of-ten errors; estimation does.
Q: Why estimate before calculating? | To have a benchmark for catching errors in the detailed calculation.
Q: What's a quick sanity check for speeds? | They must be less than the speed of light (and usually far less).
M1: The kinetic energy of a running person (70 kg, 5 m s^{-1}) is about: | 900 J | 9 J | 90 kJ | 9 MJ | ½ × 70 × 25.
M2: An efficiency over 100% indicates: | An error | Excellent design | Perpetual motion | Nothing | Energy conservation violated.

## Analysing approximations
S: Approximations make problems tractable: small angles, weak fields, low speeds, thin films, ideal gases. Analysing an approximation means knowing when it's valid, estimating its error and recognising when it breaks down.
H: Common approximations
- **Small angle**: sin θ ≈ θ, cos θ ≈ 1 − θ^{2}/2, tan θ ≈ θ (error ~θ^{3}/6).
- **Binomial**: (1 + x)^{n} ≈ 1 + nx for |x| ≪ 1.
- **Taylor expansion** around equilibrium: potential ≈ quadratic (harmonic approximation).
- **Weak-field gravity**: uniform g near Earth; Newtonian limit of GR.
- **Low speed**: Galilean instead of Lorentz transformations.
- **Ideal gas**, **thin lens**, **far-field**, **point charge**, **perturbation theory**.
E: (1 + x)^{n} ≈ 1 + nx :: binomial approximation
E: f(x) ≈ f(a) + f'(a)(x − a) + ½f''(a)(x − a)^{2} :: Taylor expansion
H: Estimating error
- The next term in the expansion estimates the error.
- Compare approximate and exact results for test values.
- Dimensionless parameters measure validity: v/c, θ, x/R, kT/E.
H: Breakdown
P: Small-angle pendulum: at 20°, the period differs from 2π√(L/g) by ~0.8%; at 90°, by ~18%. Ideal gas fails near condensation; thin-lens fails for thick lenses; Newtonian gravity fails near black holes. State approximations explicitly and check their parameters stay small. Sometimes an approximation fails qualitatively (e.g. perturbation theory missing tunnelling).
X: Use the binomial approximation for γ at v = 0.1c.
> γ = (1 − 0.01)^{−1/2} ≈ 1 + ½ × 0.01 = 1.005 (exact 1.00504)
X: Gravitational field at height h: g(h) = g(1 + h/R)^{−2}. Approximate at h = 10 km.
> ≈ g(1 − 2h/R) = g(1 − 2 × 10/6400) ≈ 0.9969g
K: Approximations simplify problems when small parameters exist; estimate the error from the next term and check validity.
!: An approximation valid in one regime can fail badly in another; always note its assumptions.
Q: What is the binomial approximation? | (1 + x)^{n} ≈ 1 + nx for small x.
Q: How do you estimate the error in a truncated expansion? | Evaluate the size of the first neglected term.
M1: sin θ ≈ θ is accurate to about 1% for θ up to: | ~14° (0.24 rad) | 90° | 45° | 1° only | Error ~θ^{2}/6 relative.
M2: The harmonic approximation expands the potential to: | Second order near a minimum | First order | Zeroth order | Fourth order only | Quadratic potential.

## Solving coupled equations
S: Many physical systems involve several interacting quantities described by coupled equations: masses on springs, circuits with multiple loops, predator–prey populations and simultaneous force balances. Solving them requires systematic algebra, matrices or eigenvalue methods.
H: Simultaneous linear equations
- Substitution and elimination for small systems.
- Matrix form Ax = b; solve by Gaussian elimination, Cramer's rule or computer.
- Examples: forces on connected bodies, Kirchhoff's laws in multi-loop circuits.
E: Ax = b ⇒ x = A^{−1}b :: matrix solution
H: Coupled differential equations
- Coupled oscillators: mẍ_{1} = −kx_{1} + k'(x_{2} − x_{1}), etc.
- Try solutions x = Ae^{iωt}; get an eigenvalue problem det(K − ω^{2}M) = 0.
- **Normal modes**: independent oscillation patterns; any motion is a superposition.
- Decoupling: change variables (sum and difference coordinates).
E: det(K − ω^{2}M) = 0 :: normal-mode frequencies
H: Nonlinear and numerical
P: Nonlinear coupled equations (Lotka–Volterra, Lorenz) usually need phase-plane analysis or numerical integration. Linearise about equilibria to find stability via Jacobian eigenvalues. For large linear systems, use numerical linear algebra. Always check solutions by substituting back.
X: Two equal masses m linked to walls and each other by three identical springs k. Normal mode frequencies?
> In phase: ω_{1} = √(k/m) (middle spring unstretched)
> Out of phase: ω_{2} = √(3k/m)
X: Solve 2x + y = 5, x − y = 1.
> Add: 3x = 6 ⇒ x = 2; y = 1
K: Write coupled equations in matrix form; normal modes from eigenvalues decouple oscillating systems.
!: Coupled systems rarely have simple sinusoidal motion of each part; motion is generally a mix of normal modes.
Q: What is a normal mode? | A pattern of motion where all parts oscillate at the same frequency with fixed relative amplitudes.
Q: How do you find normal mode frequencies? | Solve det(K − ω^{2}M) = 0.
M1: Kirchhoff's laws for a two-loop circuit give: | Simultaneous linear equations | One differential equation only | No equations | A single number | Two unknown currents.
M2: Sum and difference coordinates help: | Decouple symmetric oscillators | Add dimensions | Remove energy | Increase coupling | Normal coordinates.

## Selecting appropriate mathematical techniques
S: Physics problems use a toolkit of mathematical techniques: calculus, vectors, differential equations, series, complex numbers, linear algebra and Fourier analysis. Choosing the right tool saves time and reveals structure.
H: Matching tools to problems
- **Calculus**: rates (derivatives) and accumulation (integrals): work, charge, flux.
- **Vectors**: forces, fields, torque (cross products), work (dot products).
- **Differential equations**: dynamics, circuits, heat flow, quantum mechanics.
- **Complex numbers**: oscillations, AC circuits (impedance), waves, quantum amplitudes.
- **Linear algebra**: coupled systems, rotations, quantum states.
- **Fourier analysis**: signals, diffraction, solving PDEs.
- **Series expansions**: approximations and perturbation theory.
- **Probability and statistics**: thermal physics, quantum measurement, data analysis.
E: Z = R + i(ωL − 1/(ωC)) :: complex impedance simplifies AC circuits
H: Symmetry and special functions
- Separation of variables with symmetric boundaries leads to sines, Bessel functions, Legendre polynomials, spherical harmonics.
- Gauss's and Ampère's laws exploit symmetry to avoid integrals.
- Integrals: substitution, integration by parts, Gaussian integrals ∫e^{−ax^{2}}dx = √(π/a).
E: ∫_{−∞}^{∞}e^{−ax^{2}}dx = √(π/a) :: Gaussian integral
H: Developing judgement
P: Ask what structure the problem has: linear or nonlinear, symmetric, periodic, probabilistic, small parameter? Simple methods first; reach for heavy machinery only when needed. Sometimes a clever choice (energy method, symmetry argument) replaces pages of algebra. Practise recognising which technique a problem "wants".
X: Field of an infinite line charge: integrate Coulomb's law or use Gauss's law?
> Gauss's law: cylindrical symmetry gives E × 2πrL = λL/ε_{0} ⇒ E = λ/(2πε_{0}r) in one line
X: Why use complex exponentials for oscillators?
> Derivatives become multiplication by iω, turning ODEs into algebra; take real parts at the end
K: Match mathematical tools to the problem's structure; symmetry and complex numbers often turn hard problems easy.
!: Using brute-force integration when symmetry offers a shortcut wastes time and invites errors.
Q: When is Gauss's law useful for computing fields? | When charge distributions have high symmetry (spherical, cylindrical, planar).
Q: Why use Fourier analysis? | To decompose signals or solutions into frequency components, often simplifying linear problems.
M1: AC circuits are simplified by: | Complex impedance | Fourier series only | Probability | Tensors | Phasors.
M2: The Gaussian integral ∫e^{−x^{2}}dx over all x equals: | √π | π | 1 | 2 | √(π/a) with a = 1.

## Comparing analytical and numerical solutions
S: Analytical solutions give exact formulas and insight; numerical solutions handle problems no formula can. Comparing the two, using analytical cases to test codes and numerical results to explore beyond analytic reach, is a key modern skill.
H: Analytical solutions
- Exact expressions show dependence on parameters and limits.
- Available for idealised, often linear or symmetric problems.
- Approximations (perturbation, asymptotics) extend their reach.
H: Numerical solutions
- Handle nonlinearity, complex geometry, many bodies, real data.
- Methods: finite differences, Runge–Kutta, finite elements, Monte Carlo.
- Results depend on discretisation; need convergence checks.
- Python (NumPy, SciPy), MATLAB, Julia, specialised codes.
E: y_{n+1} = y_{n} + hf(y_{n}) :: Euler step
E: Error_{RK4} ∝ h^{4} :: fourth-order accuracy
H: Using them together
P: **Verify** codes against known analytical solutions (SHM, projectile without drag, hydrogen energy levels). **Explore** beyond: large-angle pendulums, drag, chaos. **Interpret** numerical results with analytical scaling arguments. **Benchmark** accuracy and efficiency. Plot both to compare; quantify differences.
X: Compare Euler and exact solutions for dy/dt = −y, y(0) = 1, at t = 1 with h = 0.1.
> Euler: (1 − 0.1)^{10} ≈ 0.349; exact e^{−1} ≈ 0.368: error ~5%
> With h = 0.01: (0.99)^{100} ≈ 0.366: error ~0.5% (first-order convergence)
X: A large-amplitude pendulum (θ_{0} = 90°): analytical or numerical?
> Exact period involves an elliptic integral: T ≈ 1.18 × 2π√(L/g); numerics confirm and handle damping or driving
K: Use analytical solutions for insight and code verification, numerics for complexity, and compare to build confidence.
!: A numerical result without a convergence check or comparison can be precisely wrong.
Q: Why test numerical codes against analytical solutions? | To verify correctness and measure accuracy before tackling unsolvable cases.
Q: How does Euler's method error scale with step size? | Linearly (first-order): halving h roughly halves the error.
M1: Numerical solutions are essential for: | Nonlinear and complex systems | Only linear problems | Avoiding computers | Exact symbolic forms | E.g. chaos.
M2: Halving h in RK4 reduces error by about: | 16× | 2× | 4× | 8× | Fourth order.

## Sensitivity analysis
S: Sensitivity analysis asks how much a result changes when inputs change. It identifies which parameters matter most, guides where to improve measurements, and quantifies how input uncertainties propagate to outputs.
H: Local sensitivity
- Partial derivative ∂y/∂x_{i} measures how output y changes with input x_{i}.
- Relative (logarithmic) sensitivity S_{i} = (∂y/∂x_{i})(x_{i}/y) = ∂ln y/∂ln x_{i}.
- For power laws y = kx^{n}, S = n: a 1% change in x gives n% change in y.
E: S_{i} = ∂ln y/∂ln x_{i} :: relative sensitivity
E: (σ_{y}/y)^{2} = Σ S_{i}^{2}(σ_{i}/x_{i})^{2} :: uncertainty propagation (independent inputs)
H: Global sensitivity
- Vary inputs over their full ranges (Monte Carlo sampling).
- Variance-based methods (Sobol indices) apportion output variance to inputs and interactions.
- Tornado diagrams rank the influence of each parameter.
H: Applications
P: Designing experiments: measure the most sensitive quantities most precisely. Engineering design: tolerances for components. Climate models: which feedbacks drive uncertainty in warming. Medical physics: dose sensitivity to patient positioning. Sensitivity analysis also reveals whether conclusions are robust or fragile.
X: Pendulum: g = 4π^{2}L/T^{2}. Relative sensitivities?
> S_{L} = 1, S_{T} = −2: a 1% error in T gives 2% error in g, so time precisely
X: Wind power P ∝ v^{3}. A 5% error in wind speed gives what error in power?
> 3 × 5% = 15%
K: Sensitivity shows which inputs dominate; for power laws, relative sensitivity equals the exponent.
!: High-exponent dependencies (v^{3}, T^{4}, r^{−6}) amplify small input errors dramatically.
Q: What is relative sensitivity for y = kx^{n}? | n.
Q: What are Sobol indices? | Variance-based measures of how much each input (and interactions) contributes to output variance.
M1: For Stefan–Boltzmann P ∝ T^{4}, a 1% error in T gives: | 4% error in P | 1% | 0.25% | 16% | Exponent 4.
M2: Tornado diagrams show: | Ranked parameter influences | Wind speeds | Time series | Feynman diagrams | Sensitivity ranking.

## Physical interpretation of mathematical results
S: A mathematical answer is only half the job: you must understand what it means physically. Interpreting signs, dependencies, limits and magnitudes connects equations back to reality and often reveals deeper insight.
H: What to interpret
- **Sign**: a negative result may mean opposite direction, attractive force, energy released or bound state.
- **Dependence on parameters**: how does the answer change as mass, length or temperature increase? Does it make sense?
- **Magnitude**: is it reasonable? Compare with everyday values.
- **Form**: exponential decay, oscillation, power law, resonance: what physical behaviour does it imply?
- **Dimensionless groups**: which effects compete?
E: E_{n} = −13.6 eV/n^{2} :: negative energy means a bound state
H: Examples
- Pendulum period independent of mass: gravity's equivalence of inertial and gravitational mass.
- Imaginary frequency in a stability analysis: exponential growth (instability).
- Complex refractive index: absorption.
- Negative heat capacity of self-gravitating systems: stars heat up as they lose energy.
H: Telling the story
P: After solving, write a sentence explaining the result: "The tension is greater than the weight because the mass accelerates upward." Ask: what happens if I double this parameter? Which term dominates? Interpretation turns problem-solving into understanding, and it's what examiners and collaborators look for.
X: A solution gives x(t) = Ae^{−γt}cos(ωt). Interpret it.
> Oscillation at angular frequency ω whose amplitude decays with time constant 1/γ: an underdamped oscillator
X: Gravitational potential energy U = −GMm/r is negative. Meaning?
> Bound systems have negative total energy relative to infinite separation; energy must be supplied to separate them
K: Interpret signs, magnitudes, forms and dependencies; explain results in words to connect maths to physics.
!: A correct number with no interpretation misses the point; examiners often reward explanation as much as calculation.
Q: What does an imaginary frequency indicate in stability analysis? | Exponential growth, i.e. instability.
Q: Why is a pendulum's period independent of mass? | Gravitational and inertial mass cancel in the equation of motion.
M1: A negative total energy for an orbit means: | It is bound | It escapes | It is impossible | It's moving backward | Below zero at infinity.
M2: Exponential decay e^{−t/τ} implies: | Rate ∝ amount present | Constant rate | Oscillation | Growth | First-order process.

## Error checking and independent verification
S: Even experts make mistakes, so good physicists check their work systematically and seek independent verification. Multiple approaches, consistency checks and fresh eyes catch errors before they matter.
H: Self-checks
- Units and dimensions of every term.
- Limiting and special cases.
- Order-of-magnitude estimate.
- Symmetry: does the answer respect the problem's symmetry?
- Conservation: is energy, momentum or charge balanced?
- Substitute the answer back into the original equations.
E: Residual = |LHS − RHS| :: substitute back to check
H: Independent verification
- Solve a different way (energy vs forces, analytical vs numerical).
- Compare with literature or experimental data.
- Have someone else check (pair programming, peer review).
- In large collaborations, independent analyses of the same data (e.g. ATLAS and CMS both found the Higgs; LIGO's multiple pipelines).
- Blind analyses avoid bias.
H: Lessons from errors
P: NASA's Mars Climate Orbiter (1999) was lost due to a unit mismatch (pound-force seconds vs newton-seconds). The Hubble mirror flaw (1990) came from a mis-assembled test instrument; an independent check would have caught it. OPERA's faster-than-light neutrinos came from a loose cable, found by careful verification. Habitual checking is a professional skill.
X: You compute a car's stopping distance as 0.2 m from 30 m s^{-1} with μ = 0.7. Check it.
> Estimate d = v^{2}/(2μg) = 900/13.7 ≈ 66 m; 0.2 m is absurd: error found (perhaps a missing square)
X: Solve a projectile range both by components and by the formula R = v^{2}sin 2θ/g for v = 20, θ = 30°.
> Formula: 400 × 0.866/9.81 ≈ 35.3 m
> Components: t = 2 × 10/9.81 = 2.04 s; R = 17.32 × 2.04 ≈ 35.3 m ✓
K: Check units, limits, estimates and conservation; verify independently with different methods or people.
!: The Mars Climate Orbiter was lost to a unit error; don't skip unit checks.
Q: What caused the Mars Climate Orbiter loss? | A mismatch between imperial and SI units in navigation software.
Q: Why do large experiments use independent analyses? | To catch errors and biases, increasing confidence in results.
M1: Substituting an answer back into the original equation checks: | That it satisfies the equation | Units only | The estimate | Nothing | Residual zero.
M2: Blind analysis prevents: | Bias toward expected results | Random errors | Unit errors | Calibration | Unconscious tuning.

## Communicating assumptions and limitations
S: Every physics result rests on assumptions and has limitations. Stating them clearly lets others judge reliability, reproduce work and know when a result applies, which is a hallmark of honest, professional science.
H: Types of assumptions
- **Physical idealisations**: frictionless, point mass, rigid body, ideal gas, uniform field.
- **Approximations**: small angles, low speeds, linear response, weak coupling.
- **Boundary and initial conditions**.
- **Parameter values** and their uncertainties.
- **Model choices**: classical vs quantum, Newtonian vs relativistic.
- **Data assumptions**: independence of errors, calibration validity.
H: How to communicate
- State assumptions at the start of a solution or method section.
- Give the validity range: "valid for θ < 15°", "for v ≪ c".
- Quantify uncertainties and dominant error sources.
- Discuss what would change if assumptions fail.
- In conclusions, avoid overgeneralising beyond tested conditions.
E: Result = value ± uncertainty (valid for stated conditions) :: complete reporting
H: Why it matters
P: Engineering failures often come from applying results outside their assumptions (e.g. linear elastic analysis beyond yield). Policymakers need to know confidence and limits (climate projections under scenarios). In exams, stating assumptions earns credit and shows understanding. Transparent limitations build trust and guide future work.
X: State assumptions for calculating a ball's range with R = v^{2}sin 2θ/g.
> Launch and landing at the same height; no air resistance; uniform g; flat ground; point particle
X: Rewrite "Our model predicts the bridge is safe" with limitations.
> "Under linear-elastic assumptions and design loads up to X, the model predicts stresses below yield with a safety factor of 2; dynamic wind effects were not modelled."
K: State assumptions, validity ranges and uncertainties explicitly so results are interpreted and applied correctly.
!: Results presented without assumptions may be misused in situations where they don't apply.
Q: Why state the validity range of a result? | So others know when it applies and when it may fail.
Q: Name assumptions in a basic projectile range formula. | No air resistance, uniform gravity, same launch and landing height, flat ground.
M1: A complete result includes: | Value, uncertainty and conditions | Value only | Uncertainty only | Assumptions only | Full reporting.
M2: Applying a linear-elastic model beyond yield is an example of: | Ignoring model assumptions | Good practice | Sensitivity analysis | Verification | Outside validity.
`;
