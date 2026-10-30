// Unit 38: Nonlinear Dynamics and Chaos. Format: kit/course/notes.js
export default `
## Linear and nonlinear systems
S: A linear system's response is proportional to its input, and solutions can be added together. Most of nature is nonlinear: outputs depend on inputs in curved, interacting ways, giving rise to thresholds, multiple equilibria, oscillations, chaos and patterns.
H: Linearity
- **Superposition**: if x_{1} and x_{2} are solutions, so is ax_{1} + bx_{2}.
- Linear ODEs have exponential, sinusoidal or polynomial solutions found by standard methods.
- A system can be broken into independent modes and analysed piece by piece.
E: L[ax_{1} + bx_{2}] = aL[x_{1}] + bL[x_{2}] :: linearity
H: Nonlinearity
- Terms such as x^{2}, sin x, xy or |x| break superposition.
- Small causes can have large effects; parts interact so the whole differs from the sum.
- Examples: the pendulum (sin θ), population growth with limits, fluid convection (v·∇v), lasers, neurons, climate.
- Most nonlinear equations have no closed-form solution; we use geometry, approximations and computation.
H: Linearisation
P: Near an equilibrium, a nonlinear system often behaves like its linearised version: expand f(x) ≈ f(x^{*}) + f'(x^{*})(x − x^{*}). This tells us whether an equilibrium is stable. But linearisation fails far from equilibrium and misses global behaviour such as limit cycles and chaos.
X: Is ẍ + ω^{2} sin x = 0 linear? Linearise for small x.
> sin x is nonlinear, so the full pendulum is nonlinear
> For small x, sin x ≈ x, giving ẍ + ω^{2}x = 0, simple harmonic motion
X: Show x^{2} breaks superposition.
> (x_{1} + x_{2})^{2} = x_{1}^{2} + x_{2}^{2} + 2x_{1}x_{2}; the cross term spoils addition
K: Nonlinear systems cannot be understood by adding up simple pieces; interactions create new behaviour.
!: A good small-amplitude linear model can give badly wrong predictions at large amplitude.
Q: What is the superposition principle? | For linear systems, any sum of solutions is also a solution.
Q: Why is the full pendulum nonlinear? | Its restoring torque depends on sin θ, not θ.
M1: Which equation is nonlinear? | ẋ = x − x^{3} | ẋ = 3x | ẍ + x = 0 | ẋ = −2x + 5 | The cubic term breaks linearity.
M2: Linearisation is valid: | Near an equilibrium | Everywhere | Only for chaos | For all amplitudes | It uses a first-order Taylor expansion.

## Nonlinear differential equations
S: Nonlinear differential equations describe how systems change when rates depend nonlinearly on the state. Few can be solved exactly, so physicists combine special solutions, qualitative geometry and numerical integration to understand them.
H: First-order examples
- **Logistic growth**: ẋ = rx(1 − x/K), solvable exactly; gives an S-shaped curve.
- **Bernoulli and Riccati** equations: some reduce to linear by substitution.
- **Separable equations**: dx/f(x) = dt.
E: x(t) = K/(1 + ((K − x_{0})/x_{0})e^{−rt}) :: logistic solution
H: Higher-order and systems
- **Van der Pol oscillator**: ẍ − μ(1 − x^{2})ẋ + x = 0; self-sustained oscillations.
- **Duffing oscillator**: ẍ + δẋ + αx + βx^{3} = F cos ωt; hysteresis and chaos.
- **Lotka–Volterra**: predator–prey cycles.
- Any n-th order ODE can be written as n first-order equations ẋ = f(x).
H: Existence and numerics
P: If f is smooth, solutions exist and are unique for given initial conditions, so trajectories never cross in phase space. Numerical methods (Euler, Runge–Kutta, adaptive and symplectic integrators) approximate solutions; step size must suit the fastest timescale. Stiff equations need implicit methods. For chaotic systems, numerical solutions diverge from the true one but still capture statistical behaviour.
E: x_{n+1} = x_{n} + hf(x_{n}) :: Euler method
X: Solve ẋ = x^{2}, x(0) = 1.
> dx/x^{2} = dt ⇒ −1/x = t − 1
> x = 1/(1 − t), which blows up at t = 1 (finite-time singularity)
X: Write the Duffing equation (no forcing) as a first-order system.
> ẋ = v, v̇ = −δv − αx − βx^{3}
K: Nonlinear ODEs rarely have formulas, but uniqueness, geometry and numerics reveal their behaviour.
!: Nonlinear equations can blow up in finite time, which never happens in linear ones with constant coefficients.
Q: What does the Van der Pol oscillator model? | Self-sustained oscillations with nonlinear damping, such as in valve circuits and heartbeats.
Q: Why can't trajectories cross in phase space for a smooth autonomous system? | Uniqueness: each point has only one future.
M1: Logistic growth approaches: | The carrying capacity K | Infinity | Zero always | Oscillates forever | x → K.
M2: The fourth-order Runge–Kutta method is used to: | Integrate ODEs numerically | Find Fourier series | Factor numbers | Measure entropy | It is a standard integrator.

## Fixed points and stability
S: Fixed points are states where a system stays put. Whether nearby states return or run away determines what we actually observe, and linear stability analysis classifies equilibria by the eigenvalues of the Jacobian.
H: One dimension
- Fixed point x^{*}: f(x^{*}) = 0.
- Stable if f'(x^{*}) < 0, unstable if f'(x^{*}) > 0; borderline if 0.
- Flow on a line: arrows point towards stable points and away from unstable ones.
E: ẋ = f(x), η̇ ≈ f'(x^{*})η :: linearisation in 1D
H: Two dimensions
- Jacobian J = [∂f_{i}/∂x_{j}] at the fixed point; eigenvalues λ_{1}, λ_{2}.
- Both negative real: **stable node**. Both positive: **unstable node**. Opposite signs: **saddle**.
- Complex with negative real part: **stable spiral**; positive: **unstable spiral**; purely imaginary: **centre** (linear analysis inconclusive in nonlinear systems).
- Trace τ and determinant Δ classify: saddle if Δ < 0; stable if τ < 0, Δ > 0; spirals if τ^{2} < 4Δ.
E: λ^{2} − τλ + Δ = 0 :: characteristic equation
H: Beyond linearisation
P: Lyapunov functions, energy-like quantities that always decrease, prove stability globally without solving equations. The Hartman–Grobman theorem says linearisation is faithful for hyperbolic fixed points (no eigenvalues with zero real part). Basins of attraction can have complex, even fractal, boundaries.
X: Classify fixed points of ẋ = x − x^{3}.
> x^{*} = 0, ±1; f'(x) = 1 − 3x^{2}
> f'(0) = 1 > 0: unstable; f'(±1) = −2 < 0: stable
X: J = [[−1, 2], [−2, −1]]. Classify.
> τ = −2, Δ = 1 + 4 = 5; τ^{2} − 4Δ = 4 − 20 < 0
> Stable spiral
K: Eigenvalues of the Jacobian classify equilibria: real parts decide stability, imaginary parts decide spiralling.
!: A linear centre may become a spiral when nonlinear terms are included; check further.
Q: What makes a fixed point a saddle? | Real eigenvalues of opposite sign (determinant negative).
Q: What is a Lyapunov function? | A function that decreases along trajectories, proving stability of an equilibrium.
M1: For ẋ = −x + x^{2}, the fixed point x = 1 is: | Unstable | Stable | A centre | A saddle in 1D | f'(1) = −1 + 2 = 1 > 0.
M2: Eigenvalues −2 ± 3i give a: | Stable spiral | Unstable node | Saddle | Centre | Negative real part, complex.

## Phase-space analysis
S: Phase-space analysis pictures every possible state of a system as a point and its evolution as a trajectory. Drawing the flow, with fixed points, nullclines, separatrices and limit cycles, shows the whole range of behaviour at a glance without solving the equations.
H: Phase portraits
- For ẍ = F(x, ẋ), plot ẋ against x.
- Each point has a velocity vector; trajectories follow the vector field.
- **Nullclines**: curves where one component of the flow is zero; fixed points lie at their intersections.
- **Separatrices** divide regions with different long-term behaviour (e.g. the pendulum's oscillating and rotating motions).
H: Conservative systems
- Energy is constant: trajectories are level curves of E(x, v).
- Phase-space area is conserved (Liouville's theorem).
- The pendulum: closed orbits (libration), open orbits (rotation), separated by a separatrix through the unstable upright position.
E: E = ½v^{2} + V(x) :: conserved energy defines orbits
H: Limit cycles
P: A limit cycle is an isolated closed orbit; nearby trajectories spiral onto it (stable) or away. Unlike centres, its amplitude is set by the system, not initial conditions: heartbeats, Van der Pol oscillators, predator–prey models with density dependence. The Poincaré–Bendixson theorem says that in 2D, a bounded trajectory without fixed points approaches a closed orbit, so chaos needs at least three dimensions in continuous flows.
X: Sketch the phase portrait of ẍ = −x (SHO).
> Energy ½v^{2} + ½x^{2} = const: circles around the origin, a centre
X: For ẋ = y, ẏ = −x − y, what happens?
> Damped oscillator: trajectories spiral into the origin, a stable spiral
K: Phase portraits show the full qualitative behaviour: equilibria, cycles and which initial states go where.
!: 2D autonomous flows cannot be chaotic; you need three dimensions or a driven (time-dependent) system.
Q: What does Liouville's theorem say? | Phase-space volume is conserved in Hamiltonian systems.
Q: What is a limit cycle? | An isolated closed trajectory that nearby orbits approach or leave.
M1: Nullclines are where: | One component of the flow is zero | Energy is zero | Trajectories cross | Chaos begins | Fixed points lie where they intersect.
M2: The minimum dimension for chaos in an autonomous ODE is: | 3 | 1 | 2 | 4 | Poincaré–Bendixson forbids it in 2D.

## Bifurcation theory
S: A bifurcation is a qualitative change in a system's behaviour as a parameter crosses a critical value: equilibria appear, disappear or swap stability, or oscillations begin. Bifurcations explain tipping points in lasers, ecosystems, climate and buckling beams.
H: Local bifurcations of fixed points
- **Saddle-node**: ẋ = r + x^{2}. Two fixed points collide and vanish at r = 0.
- **Transcritical**: ẋ = rx − x^{2}. Two fixed points exchange stability (laser threshold).
- **Pitchfork (supercritical)**: ẋ = rx − x^{3}. One stable state splits into two symmetric ones (buckling, ferromagnetism).
- **Subcritical pitchfork**: ẋ = rx + x^{3} − x^{5}. Sudden jumps and hysteresis.
E: ẋ = rx − x^{3}, x^{*} = 0, ±√r :: supercritical pitchfork
H: Hopf bifurcation
- A pair of complex eigenvalues crosses the imaginary axis; a stable spiral becomes unstable and a limit cycle is born.
- **Supercritical**: small oscillations grow smoothly as √(r − r_{c}).
- **Subcritical**: sudden jump to large oscillations; dangerous (flutter in aircraft wings).
H: Tipping points and hysteresis
P: Near a saddle-node, the system recovers slowly from disturbances (critical slowing down), which can warn of an approaching tipping point. After passing it, reversing the parameter may not restore the old state: hysteresis. Climate tipping elements (ice sheets, the Atlantic overturning circulation), lake eutrophication and the onset of convection are studied this way. Bifurcation diagrams plot equilibria against the parameter.
X: For ẋ = r + x^{2}, find fixed points for r = −4.
> x^{2} = 4 ⇒ x = ±2
> f'(x) = 2x: x = −2 stable, x = +2 unstable
> For r > 0 there are none
X: Pitchfork with r = 0.25: stable states?
> x = ±√0.25 = ±0.5 (x = 0 is unstable)
K: Bifurcations are where systems change character; their type predicts smooth change or sudden jumps.
!: Subcritical bifurcations cause abrupt, hysteretic transitions that small-signal models fail to warn about.
Q: Which bifurcation creates a limit cycle from a fixed point? | A Hopf bifurcation.
Q: What is critical slowing down? | Near a bifurcation, recovery from perturbations becomes very slow.
M1: In a saddle-node bifurcation, two fixed points: | Collide and annihilate | Swap stability | Split into three | Become a limit cycle | ẋ = r + x^{2}.
M2: Laser threshold is a classic example of a: | Transcritical bifurcation | Hopf bifurcation | Period-doubling | Saddle-node | Zero-output and lasing states swap stability.

## Period-doubling
S: Period-doubling is a route to chaos in which an oscillation repeatedly doubles its period as a parameter increases: period 2, 4, 8 and so on, faster and faster, until chaos appears. The cascade's geometry is universal, governed by Feigenbaum's constants.
H: The cascade
- A stable cycle loses stability as its multiplier passes −1, replaced by a cycle of twice the period.
- Bifurcation parameters r_{1}, r_{2}, r_{3}, … converge geometrically to r_{∞}.
- Beyond r_{∞}, behaviour is chaotic, interrupted by periodic windows.
E: δ = lim (r_{n} − r_{n−1})/(r_{n+1} − r_{n}) = 4.6692… :: Feigenbaum constant
E: α = 2.5029… :: Feigenbaum scaling of branch widths
H: Universality
- Any one-dimensional map with a smooth single hump (quadratic maximum) has the same δ and α.
- Observed in dripping taps, convection (Libchaber's helium experiments), electronic circuits, lasers and heart tissue.
- Renormalisation group ideas explain why: repeated self-similar rescaling has a universal fixed point.
H: Seeing it
P: In the logistic map x_{n+1} = rx_{n}(1 − x_{n}), period 2 begins at r = 3, period 4 at ≈ 3.449, period 8 at ≈ 3.544, and chaos at r_{∞} ≈ 3.5699. A bifurcation diagram plotting long-term x values against r shows the famous fig-tree branching. A period-3 window appears at r ≈ 3.828.
X: Estimate the next period-doubling given r_{1} = 3, r_{2} = 3.449, r_{3} = 3.544.
> Ratio (3.449 − 3)/(3.544 − 3.449) ≈ 0.449/0.095 ≈ 4.7
> r_{4} ≈ 3.544 + 0.095/4.669 ≈ 3.564
K: Period-doubling cascades converge geometrically with the universal ratio δ ≈ 4.669.
!: Universality applies to maps with a quadratic maximum; different shapes give different constants.
Q: What is Feigenbaum's δ? | About 4.669, the ratio of successive bifurcation intervals in period-doubling cascades.
Q: Where does chaos begin in the logistic map? | At r ≈ 3.5699.
M1: Period-doubling occurs when a cycle's multiplier passes: | −1 | +1 | 0 | i | Flip bifurcation.
M2: Feigenbaum's constants are universal because of: | Renormalisation and self-similarity | Quantum mechanics | Thermodynamics | Relativity | Rescaling maps to a universal fixed point.

## Deterministic chaos
S: Deterministic chaos is complex, unpredictable-looking behaviour arising from simple rules with no randomness. The future is fully determined by the present, yet tiny uncertainties grow exponentially, making long-term prediction impossible in practice.
H: Defining features
- **Determinism**: equations with no random terms.
- **Aperiodicity**: motion never exactly repeats.
- **Sensitive dependence on initial conditions**: nearby trajectories separate exponentially.
- **Boundedness**: motion stays in a finite region (on an attractor).
- Mixing: phase-space regions are stretched and folded.
H: Where it appears
- Weather and climate models, turbulence, double pendulum, three-body orbits, dripping taps.
- Heart arrhythmias, population dynamics, lasers, chemical reactions (Belousov–Zhabotinsky).
- Asteroid orbits and Hyperion's tumbling rotation.
H: Stretching and folding
P: Chaos needs stretching (to separate nearby states) and folding (to keep motion bounded), like kneading dough. The baker's map and Smale's horseshoe make this precise. Chaos is not noise: its structure shows up in attractors, Lyapunov exponents and fractal dimensions. Poincaré discovered it in the three-body problem; Lorenz rediscovered it in weather models in 1963.
E: δ(t) ≈ δ_{0}e^{λt} :: exponential divergence
H: Predictability horizon
P: If an initial error δ_{0} must stay below a tolerance Δ, the prediction time is T ≈ (1/λ)ln(Δ/δ_{0}). Improving measurement precision a thousandfold only adds ln(1000)/λ ≈ 7/λ. This is why weather forecasts are useful for about 1–2 weeks.
X: λ = 0.5 per day, δ_{0} = 0.01, Δ = 1. Prediction horizon?
> T = (1/0.5) × ln(100) ≈ 2 × 4.6 ≈ 9.2 days
> With δ_{0} = 0.0001, T ≈ 2 × 9.2 = 18.4 days: 100× precision only doubles T
K: Chaos is deterministic yet unpredictable long-term, because errors grow exponentially.
!: Chaotic does not mean random or structureless; chaotic motion lives on structured attractors with clear statistics.
Q: What two geometric operations produce chaos? | Stretching and folding of phase space.
Q: Who first found chaos in the three-body problem? | Henri Poincaré.
M1: Chaotic systems are: | Deterministic but unpredictable long-term | Random | Always periodic | Linear | No noise needed.
M2: Improving initial precision by 1000× extends prediction by: | About 7/λ | 1000× | 3× | Nothing | Logarithmic gain.

## Sensitivity to initial conditions
S: Sensitivity to initial conditions, the butterfly effect, means that two almost identical starting states end up completely different. It is the hallmark of chaos and sets fundamental limits on forecasting weather, orbits and many complex systems.
H: The butterfly effect
- Lorenz (1961) restarted a weather simulation with numbers rounded to three decimals; within weeks of model time it diverged completely.
- Title of his 1972 talk: "Does the flap of a butterfly's wings in Brazil set off a tornado in Texas?"
- Errors grow exponentially, not linearly.
H: Measuring it
- Run two simulations from slightly different starts; plot ln|δ(t)| against t.
- The slope gives the largest Lyapunov exponent.
- Error growth saturates once δ is as large as the attractor.
H: Consequences
- **Ensemble forecasting**: weather centres run ~50 perturbed forecasts to estimate uncertainty and probabilities.
- **Shadowing**: numerical trajectories, though wrong in detail, stay close to some true trajectory.
- **Control**: small, well-timed nudges can steer chaotic systems (OGY control), used in lasers and spacecraft trajectories.
- Interplanetary missions exploit chaotic dynamics to change orbits with little fuel.
E: N(t) ∝ e^{λt} :: number of distinguishable outcomes grows
H: Not all sensitivity is chaos
P: Unstable fixed points also show exponential divergence, but only temporarily and not in a bounded, recurring way. True chaos combines sensitivity with boundedness and aperiodicity, so trajectories keep separating and approaching across a bounded attractor.
X: A double pendulum has λ ≈ 2 s^{-1}. An error of 10^{-6} rad grows to 1 rad in about how long?
> t = ln(10^{6})/2 ≈ 13.8/2 ≈ 7 s
K: In chaotic systems, tiny initial differences grow exponentially; forecasts need ensembles and probabilities.
!: Sensitivity limits detailed prediction, not statistical prediction; climate averages remain forecastable even if weather is not.
Q: What did Lorenz's rounding experiment show? | Tiny differences in initial data led to completely different forecasts.
Q: What is ensemble forecasting? | Running many forecasts from slightly perturbed starting states to estimate uncertainty.
M1: Error growth in chaotic systems is: | Exponential until it saturates | Linear forever | Zero | Quadratic only | e^{λt}, bounded by attractor size.
M2: OGY control uses: | Small perturbations to stabilise orbits | Large forces | Random noise | Feedback disconnection | Chaos is easily nudged.

## Lyapunov exponents
S: Lyapunov exponents measure the average exponential rate at which nearby trajectories separate or converge. A positive largest exponent signals chaos, and the full spectrum reveals how phase-space volumes stretch, shrink and fold.
H: Definition
- For two trajectories separated by δ_{0}: |δ(t)| ≈ |δ_{0}|e^{λt}.
- An n-dimensional system has n exponents λ_{1} ≥ λ_{2} ≥ … ≥ λ_{n}.
- **λ_{1} > 0**: chaos. **λ = 0**: along the flow direction (or quasiperiodic tori). **All negative**: stable fixed point.
E: λ = lim_{t→∞} (1/t) ln(|δ(t)|/|δ_{0}|) :: largest Lyapunov exponent
E: λ = lim (1/N) Σ ln|f'(x_{n})| :: for 1D maps
H: Spectrum and dissipation
- Sum of exponents = average rate of phase-space volume change.
- Dissipative systems: sum < 0 (volumes shrink onto an attractor).
- Hamiltonian systems: exponents come in ± pairs, sum = 0.
- Lorenz attractor: λ ≈ (0.906, 0, −14.57).
H: Computing and using them
P: Compute by evolving a trajectory and a small perturbation, renormalising regularly (Benettin's algorithm), or via QR methods for the full spectrum. The Kaplan–Yorke dimension estimates fractal dimension from exponents. The Lyapunov time 1/λ_{1} is the predictability timescale: about 2 weeks for weather and ~5 million years for the inner solar system.
E: D_{KY} = j + Σ_{i≤j}λ_{i}/|λ_{j+1}| :: Kaplan–Yorke dimension
X: The logistic map at r = 4 has |f'(x)| averaging to λ = ln 2. Meaning?
> Errors double every iteration on average
> After 30 iterations, a 10^{-9} error grows to ~1
X: Kaplan–Yorke dimension of the Lorenz attractor?
> j = 2 (sum 0.906 + 0 > 0); D = 2 + 0.906/14.57 ≈ 2.06
K: λ_{1} > 0 means chaos; the full spectrum describes stretching, shrinking and the attractor's dimension.
!: Finite-time estimates fluctuate; reliable exponents need long runs and careful renormalisation.
Q: What does a zero Lyapunov exponent indicate in a flow? | The direction along the trajectory, which neither stretches nor shrinks on average.
Q: What is the Lyapunov time? | 1/λ_{1}, the timescale on which predictions lose accuracy.
M1: In a dissipative system the sum of Lyapunov exponents is: | Negative | Positive | Zero | Infinite | Volumes contract.
M2: The Lorenz attractor's Kaplan–Yorke dimension is about: | 2.06 | 1 | 3 | 0.9 | Slightly above 2.

## Strange attractors
S: A strange attractor is the set a chaotic dissipative system settles onto: bounded, with a fractal structure and chaotic motion on it. It combines the predictable shape of an attractor with the unpredictable motion of chaos.
H: Attractors in general
- **Fixed point**: motion stops.
- **Limit cycle**: periodic motion.
- **Torus**: quasiperiodic motion with incommensurate frequencies.
- **Strange attractor**: chaotic motion on a fractal set.
H: Properties
- Zero volume in phase space (dissipation) but infinitely detailed folded structure.
- Non-integer (fractal) dimension: Lorenz ≈ 2.06, Hénon ≈ 1.26, Rössler ≈ 2.01.
- Trajectories on it are dense and never repeat.
- Invariant measure: statistics of where trajectories spend time are well-defined.
H: Famous examples
- **Lorenz attractor**: butterfly-shaped, from convection.
- **Rössler attractor**: a single folded band, simple stretching and folding.
- **Hénon map**: x_{n+1} = 1 − ax_{n}^{2} + y_{n}, y_{n+1} = bx_{n} (a = 1.4, b = 0.3).
- **Chua's circuit**: double-scroll attractor in electronics.
E: x_{n+1} = 1 − ax_{n}^{2} + y_{n}, y_{n+1} = bx_{n} :: Hénon map
H: Reconstructing attractors from data
P: Takens' embedding theorem: from a single measured time series s(t), the vectors (s(t), s(t − τ), s(t − 2τ), …) reconstruct the attractor's geometry if the embedding dimension exceeds twice its dimension. This lets scientists study chaos in experiments, from lasers to brain signals, without knowing the equations.
X: The Hénon map has Jacobian determinant −b. What does this mean for area?
> |det J| = 0.3: each iteration shrinks area to 30%
> So orbits collapse onto a zero-area attractor with fractal structure
K: Strange attractors are fractal sets where dissipative chaotic motion lives; they have structure but no repetition.
!: An attractor can be strange (fractal) without being chaotic, and chaotic without being strange, though usually both go together.
Q: What does Takens' theorem allow? | Reconstructing an attractor from time-delayed measurements of a single variable.
Q: What shape is the Lorenz attractor? | A two-lobed "butterfly".
M1: A torus attractor gives: | Quasiperiodic motion | Chaos | A fixed point | Divergence | Two incommensurate frequencies.
M2: The Hénon attractor's dimension is about: | 1.26 | 2 | 0.5 | 3 | Fractal, between 1 and 2.

## Logistic map
S: The logistic map x_{n+1} = rx_{n}(1 − x_{n}) is a one-line model of population growth that shows the whole route from steady behaviour to chaos. Robert May's 1976 paper made it famous as a warning that simple models can behave wildly.
H: Behaviour versus r (0 ≤ r ≤ 4)
- **0 < r < 1**: extinction, x → 0.
- **1 < r < 3**: stable fixed point x^{*} = 1 − 1/r.
- **3 < r < 3.449**: period-2 cycle.
- **3.449–3.5699**: period-doubling cascade.
- **r > 3.5699**: chaos with periodic windows (period 3 at r ≈ 3.828).
- **r = 4**: fully chaotic, λ = ln 2.
E: x_{n+1} = rx_{n}(1 − x_{n}) :: logistic map
E: x^{*} = 1 − 1/r, f'(x^{*}) = 2 − r :: non-trivial fixed point and its slope
H: Cobweb diagrams
- Plot y = f(x) and y = x; bounce vertically to the curve, horizontally to the diagonal.
- Converging spirals or staircases show stable points; spreading webs show instability.
H: Deeper results
P: "Period three implies chaos" (Li and Yorke 1975): if a period-3 orbit exists, orbits of every period exist. Sharkovskii's theorem orders which periods imply which. At r = 4, the substitution x = sin^{2}(πθ) turns the map into θ → 2θ mod 1, a bit-shift, making the chaos exactly solvable. Intermittency appears just before periodic windows.
X: Find x^{*} and its stability for r = 2.5.
> x^{*} = 1 − 1/2.5 = 0.6
> f'(x^{*}) = 2 − 2.5 = −0.5, |f'| < 1: stable
X: At r = 3.2, is x^{*} stable?
> f' = 2 − 3.2 = −1.2, |f'| > 1: unstable; a 2-cycle takes over
K: One quadratic map shows extinction, equilibrium, cycles, period doubling and chaos as r rises.
!: Fixed points of maps are stable when |f'(x^{*})| < 1, not when f' < 0 as for flows.
Q: At what r does the logistic map's fixed point lose stability? | r = 3, where f'(x^{*}) = −1.
Q: What does "period three implies chaos" mean? | A period-3 orbit forces orbits of all periods and chaotic behaviour.
M1: For r = 0.8, the population: | Dies out | Reaches 1 − 1/r | Oscillates | Is chaotic | r < 1.
M2: Map stability requires: | |f'(x^{*})| < 1 | f'(x^{*}) < 0 | f'(x^{*}) > 1 | f(x^{*}) = 0 | Multipliers inside the unit circle.

## Lorenz system
S: The Lorenz system is three simple equations derived from atmospheric convection that became the icon of chaos. Its butterfly-shaped attractor showed in 1963 that deterministic weather models are fundamentally unpredictable beyond a certain time.
H: The equations
- ẋ = σ(y − x), ẏ = x(ρ − z) − y, ż = xy − βz.
- x: convection rate; y: horizontal temperature difference; z: vertical temperature deviation.
- Classic parameters σ = 10, β = 8/3, ρ = 28.
E: ẋ = σ(y − x), ẏ = x(ρ − z) − y, ż = xy − βz :: Lorenz equations
H: Behaviour versus ρ
- ρ < 1: origin stable (pure conduction).
- ρ > 1: two fixed points C^{±} = (±√(β(ρ−1)), ±√(β(ρ−1)), ρ − 1): steady convection rolls.
- ρ ≈ 24.74: C^{±} lose stability via subcritical Hopf bifurcation.
- ρ = 28: strange attractor; trajectories orbit one lobe, then switch unpredictably.
H: Properties
P: Volume contracts at rate −(σ + 1 + β) ≈ −13.7, so the attractor has zero volume. Symmetry (x, y) → (−x, −y). Lobe-switching follows a pattern captured by the Lorenz map of successive z maxima, a 1D tent-like map. Tucker (2002) proved rigorously that the attractor exists. Similar equations describe lasers, dynamos and water wheels.
X: Find C^{±} for ρ = 28, β = 8/3.
> √(β(ρ − 1)) = √(8/3 × 27) = √72 ≈ 8.49
> C^{±} = (±8.49, ±8.49, 27)
X: Divergence of the Lorenz flow?
> ∂ẋ/∂x + ∂ẏ/∂y + ∂ż/∂z = −σ − 1 − β = −10 − 1 − 2.67 ≈ −13.7
K: Three coupled nonlinear equations produce a strange attractor and sensitive dependence: the birth of modern chaos.
!: The Lorenz model is a severe truncation of real convection; its importance is conceptual, not as a weather model.
Q: What physical system inspired the Lorenz equations? | Rayleigh–Bénard convection in the atmosphere.
Q: What are the classic Lorenz parameters? | σ = 10, β = 8/3, ρ = 28.
M1: For ρ < 1, the Lorenz system: | Settles to the origin | Is chaotic | Has a limit cycle | Diverges | Conduction is stable.
M2: Phase-space volume in the Lorenz system: | Contracts exponentially | Expands | Is conserved | Oscillates | Divergence is negative.

## Fractals
S: Fractals are shapes with detail at every scale, often self-similar, and with non-integer dimensions. They describe coastlines, clouds, lungs, river networks and strange attractors, and arise naturally from repeated simple rules.
H: Self-similarity and dimension
- Exactly self-similar fractals contain smaller copies of themselves.
- If a shape consists of N copies scaled by factor s, its similarity dimension is D = ln N/ln(1/s).
- **Box-counting dimension**: count boxes N(ε) of size ε needed to cover the set; N ∝ ε^{−D}.
E: D = ln N / ln(1/s) :: similarity dimension
E: D = lim_{ε→0} ln N(ε)/ln(1/ε) :: box-counting dimension
H: Classic fractals
- **Cantor set**: remove middle thirds repeatedly; D = ln 2/ln 3 ≈ 0.631.
- **Koch curve**: D = ln 4/ln 3 ≈ 1.262; infinite length, enclosing finite area as a snowflake.
- **Sierpiński triangle**: D = ln 3/ln 2 ≈ 1.585.
- **Mandelbrot set**: points c where z → z^{2} + c stays bounded; boundary dimension 2.
- **Julia sets** for each c.
H: Fractals in nature and physics
P: Mandelbrot asked "How long is the coast of Britain?": measured length grows as the ruler shrinks, L ∝ ε^{1−D}, with D ≈ 1.25 for Britain's west coast. Lungs, blood vessels and trees use branching fractals to fill space efficiently. Diffusion-limited aggregation, percolation clusters, turbulence and critical phenomena all show fractal structure. Fractal antennas are compact and multi-band.
X: Dimension of the Sierpiński carpet (8 copies at 1/3 scale)?
> D = ln 8/ln 3 ≈ 1.893
X: Koch curve length after n steps, starting from 1?
> Each step multiplies length by 4/3: L_{n} = (4/3)^{n} → ∞
K: Fractal dimension measures how detail fills space as you zoom in; non-integer values are the signature of fractals.
!: Real-world fractals are self-similar only over a finite range of scales, not infinitely.
Q: What is the dimension of the Cantor set? | ln 2/ln 3 ≈ 0.631.
Q: How is the Mandelbrot set defined? | The set of c for which iterating z → z^{2} + c from z = 0 stays bounded.
M1: A shape of 4 copies at half scale has dimension: | 2 | 4 | 1 | 0.5 | ln 4/ln 2.
M2: Coastline length grows as the ruler shrinks because: | Its dimension exceeds 1 | It is perfectly smooth | Rulers are inaccurate | Tides change | L ∝ ε^{1−D}.

## Self-organisation
S: Self-organisation is the spontaneous emergence of order from local interactions, without a designer or external template. Driven, dissipative systems far from equilibrium can form patterns, rhythms and structures, from convection cells to flocks of birds.
H: Ingredients
- An energy flux keeps the system far from equilibrium (dissipative structures, Prigogine).
- Nonlinear interactions with positive and negative feedback.
- Many interacting units; fluctuations seeding order that is then amplified.
- Instabilities and bifurcations select particular structures.
H: Examples
- **Rayleigh–Bénard convection**: hexagonal rolls when heating exceeds a critical Rayleigh number (~1708).
- **Belousov–Zhabotinsky reaction**: chemical spirals and oscillations.
- **Lasers**: atoms self-organise into coherent emission above threshold.
- **Flocking**: birds aligning with neighbours (Vicsek model); fish schools; insect swarms.
- **Sand dunes, ripples, river networks**, termite mounds and ant trails.
- **Biology**: cell membranes, cytoskeleton, morphogenesis.
E: Ra = gαΔTd^{3}/(νκ) :: Rayleigh number
H: Self-organised criticality
P: Bak, Tang and Wiesenfeld's sandpile model (1987): grains added one at a time build a pile that organises itself to a critical state, where avalanches of all sizes follow a power law. Earthquakes (Gutenberg–Richter law), forest fires, solar flares and neural avalanches show similar scale-free statistics, though whether each is truly SOC is debated.
E: P(s) ∝ s^{−τ} :: power-law avalanche distribution
X: A fluid layer 1 cm thick with g = 9.8, α = 2 × 10^{-4} K^{-1}, ν = 10^{-6}, κ = 1.4 × 10^{-7} m^{2} s^{-1}. What ΔT starts convection?
> d^{3} = (0.01)^{3} = 10^{-6} m^{3}; νκ = 1.4 × 10^{-13} m^{4} s^{-2}
> Ra = 9.8 × 2 × 10^{-4} × 10^{-6} × ΔT/(1.4 × 10^{-13}) ≈ 1.4 × 10^{4} ΔT
> Setting Ra = 1708 gives ΔT ≈ 0.12 K
K: Order can emerge spontaneously when energy flows through systems with nonlinear feedback.
!: Self-organisation does not violate the second law; the system exports entropy to its surroundings.
Q: What is a dissipative structure? | An ordered pattern maintained by continuous energy flow and entropy export, such as convection cells.
Q: What is self-organised criticality? | Systems evolving by themselves to a critical state with power-law event sizes.
M1: Convection onset is set by the: | Rayleigh number | Reynolds number | Mach number | Prandtl number alone | Ra ≈ 1708 for rigid boundaries.
M2: The Vicsek model describes: | Flocking | Crystal growth | Superconductivity | Radioactive decay | Self-propelled particles aligning.

## Synchronisation
S: Synchronisation is the tendency of coupled oscillators to fall into step. Fireflies flash together, pendulum clocks on a shared beam swing in time, heart pacemaker cells fire in unison, and power grids lock to a common frequency.
H: Basic idea
- Each oscillator has a natural frequency ω_{i}; weak coupling nudges phases.
- If coupling exceeds the frequency differences, oscillators **phase-lock**.
- Huygens (1665) saw two pendulum clocks on a common beam synchronise in anti-phase.
H: The Kuramoto model
- dθ_{i}/dt = ω_{i} + (K/N) Σ_{j} sin(θ_{j} − θ_{i}).
- Order parameter r e^{iψ} = (1/N) Σ e^{iθ_{j}}: r = 0 incoherent, r = 1 fully synchronised.
- Above a critical coupling K_{c} = 2/(πg(0)) (g is the frequency distribution), a synchronised cluster forms: a phase transition.
E: dθ_{i}/dt = ω_{i} + (K/N)Σ sin(θ_{j} − θ_{i}) :: Kuramoto model
E: re^{iψ} = (1/N)Σ e^{iθ_{j}} :: order parameter
H: Locking and examples
P: Two oscillators lock when |Δω| < K; the Adler equation describes the phase difference. Driven oscillators lock to rational frequency ratios in Arnold tongues. Examples: circadian rhythms entrained by light, Millennium Bridge wobble (pedestrians synchronising with the swaying deck), laser arrays, Josephson junction arrays, neurons (healthy rhythms and epileptic seizures) and generators in power grids.
E: dφ/dt = Δω − K sin φ :: Adler equation, locked if |Δω| ≤ K
X: Two oscillators differ by Δω = 0.3 rad s^{-1} with coupling K = 0.5 rad s^{-1}. Do they lock? At what phase?
> |Δω| < K: yes
> sin φ = 0.3/0.5 = 0.6 ⇒ φ ≈ 37°
K: Coupled oscillators synchronise when coupling beats their frequency spread; the transition is like a phase transition.
!: Synchronisation can be harmful: the Millennium Bridge, epileptic seizures and power grid instabilities.
Q: What does the Kuramoto order parameter measure? | How coherent the phases are: 0 for random, 1 for full synchrony.
Q: What caused the Millennium Bridge wobble? | Pedestrians unconsciously synchronised their steps with the bridge's sideways sway.
M1: Two oscillators lock if: | |Δω| ≤ K | Δω > K | K = 0 | Frequencies are equal only | Adler equation.
M2: Huygens observed synchronisation in: | Pendulum clocks | Fireflies | Lasers | Neurons | 1665.

## Coupled nonlinear oscillators
S: Coupled nonlinear oscillators exchange energy and phase in rich ways: normal modes, beats, localisation, resonance and chaos. They model molecules, crystals, circuits, neurons, biological rhythms and engineering structures.
H: Linear coupling as a baseline
- Two identical coupled oscillators have normal modes: in-phase (ω_{0}) and anti-phase (√(ω_{0}^{2} + 2k)).
- Energy beats back and forth at the frequency difference.
E: ω_{±} = √(ω_{0}^{2} + k ± k) :: normal modes of two coupled oscillators (k coupling)
H: Nonlinear effects
- Frequencies depend on amplitude (Duffing: ω ≈ ω_{0}(1 + 3βA^{2}/8ω_{0}^{2})).
- Internal resonances (e.g. 1:2) transfer energy between modes.
- **Intrinsic localised modes (breathers)**: energy concentrates on a few sites in a nonlinear lattice.
- **Fermi–Pasta–Ulam–Tsingou** (1955): expected energy sharing among modes didn't happen; energy returned to the initial mode, leading to soliton theory.
- **Chimera states**: in identical coupled oscillators, some synchronise while others drift.
H: Applications
P: Central pattern generators in the spinal cord are coupled neural oscillators producing walking and swimming rhythms. Nanomechanical resonators exploit nonlinear coupling for sensing. Structural engineers avoid internal resonances in tall buildings and bridges. Arrays of spin-torque or laser oscillators combine power coherently.
X: Two pendulums (ω_{0} = 3 rad s^{-1}) are coupled with k = 0.5 s^{-2}. Find mode frequencies and beat period.
> ω_{−} = 3; ω_{+} = √(9 + 1) ≈ 3.162 rad s^{-1}
> Beat period ≈ 2π/0.162 ≈ 39 s
K: Coupling plus nonlinearity lets oscillators share, trap or synchronise energy in ways linear modes cannot.
!: Nonlinear systems don't necessarily share energy evenly among modes; FPUT recurrence showed equipartition can fail for long times.
Q: What did the FPUT experiment reveal? | Energy in a nonlinear chain returned to its initial mode instead of spreading out evenly.
Q: What is a chimera state? | A state where identical coupled oscillators split into synchronised and incoherent groups.
M1: A Duffing oscillator's frequency: | Depends on amplitude | Is constant | Is always zero | Depends only on damping | Hardening or softening springs.
M2: Central pattern generators produce: | Rhythmic movements like walking | Hormones | Vision | Memory | Coupled neural oscillators.

## Pattern formation
S: Pattern formation is how uniform states break into spatial structures such as stripes, spots, spirals and hexagons. Instabilities select a preferred wavelength, and nonlinear interactions decide which pattern wins, in fluids, chemistry, biology and geology.
H: How patterns form
- A uniform state becomes unstable to perturbations of a particular wavenumber k_{c}.
- Growth rate σ(k) peaks at k_{c}, so that wavelength grows fastest.
- Nonlinear saturation selects stripes, hexagons or squares depending on symmetries.
E: σ(k) = ε − (k^{2} − k_{c}^{2})^{2} :: Swift–Hohenberg-type growth rate
E: ∂u/∂t = εu − (∇^{2} + k_{c}^{2})^{2}u − u^{3} :: Swift–Hohenberg equation
H: Examples
- **Convection**: rolls and hexagons (Bénard cells).
- **Faraday waves**: patterns on vibrated liquid surfaces.
- **Turing patterns**: animal coat spots and stripes, fish skin, digit spacing.
- **Dendrites**: snowflakes and metal solidification (Mullins–Sekerka instability).
- **Geology**: sand ripples, mud cracks, columnar basalt (Giant's Causeway), vegetation bands in drylands.
- **Spirals** in excitable media: BZ reaction, cardiac tissue (re-entrant arrhythmias), slime moulds.
H: Universality and amplitude equations
P: Near onset, many systems are described by the same amplitude equation (Ginzburg–Landau) regardless of the underlying physics, explaining why similar patterns appear everywhere. Defects such as dislocations and grain boundaries behave much like those in crystals. Far from onset, patterns become disordered, leading to spatiotemporal chaos.
X: In a Swift–Hohenberg model, which wavelength grows fastest if k_{c} = 2π/(4 mm)?
> σ is maximum at k = k_{c}, so λ = 4 mm
> Neighbouring wavelengths grow more slowly or decay
K: Patterns arise when instabilities pick a length scale and nonlinearity chooses a shape.
!: The observed pattern can depend on history and boundaries; several patterns may be stable for the same parameters.
Q: What instability makes snowflake arms? | The Mullins–Sekerka instability of a growing solidification front.
Q: What equation describes amplitudes of patterns near onset universally? | The (complex) Ginzburg–Landau equation.
M1: Faraday waves are produced by: | Vertically vibrating a liquid | Heating from below | Chemical reactions | Magnetic fields | Parametric excitation.
M2: Columnar basalt forms hexagons due to: | Cooling and cracking patterns | Crystal structure of minerals | Wind erosion | Tides | Contraction cracks optimise.

## Reaction-diffusion systems
S: Reaction-diffusion systems combine local chemical reactions with diffusion, producing waves, spirals and stationary Turing patterns. Turing's 1952 insight, that diffusion can destabilise a uniform state, explains many biological patterns and chemical structures.
H: General form
- ∂u/∂t = D_{u}∇^{2}u + f(u, v), ∂v/∂t = D_{v}∇^{2}v + g(u, v).
- Reactions f, g create or destroy species; diffusion spreads them.
E: ∂u/∂t = D_{u}∇^{2}u + f(u, v) :: reaction-diffusion equation
H: Turing instability
- An **activator** promotes its own production and that of an **inhibitor**.
- The inhibitor suppresses the activator and diffuses faster (D_{v} ≫ D_{u}).
- Short-range activation plus long-range inhibition: spots or stripes with a characteristic spacing.
- Confirmed in the CIMA chemical reaction (1990), zebrafish stripes, mouse digit spacing, hair follicles.
H: Travelling waves
- **Fisher–KPP equation**: ∂u/∂t = D∇^{2}u + ru(1 − u); fronts invade at speed v = 2√(Dr).
- Used for spreading genes, invasive species, epidemics and flame fronts.
- **Excitable media** (FitzHugh–Nagumo): nerve impulses, cardiac waves, BZ spirals.
E: v = 2√(Dr) :: Fisher wave speed
H: Models in use
P: Gray–Scott, Brusselator and Gierer–Meinhardt models produce rich patterns: spots, labyrinths, self-replicating spots. Morphogen gradients and reaction-diffusion help explain development, though real biology also uses mechanics and gene networks. Spiral waves in heart tissue cause fibrillation; defibrillation resets them.
X: A species spreads with D = 10 km^{2} yr^{-1} and r = 0.4 yr^{-1}. Front speed?
> v = 2√(10 × 0.4) = 2 × 2 = 4 km yr^{-1}
X: Why must the inhibitor diffuse faster for Turing patterns?
> It spreads out to suppress activation around each peak while the activator stays local
> This sets a spacing between peaks
K: Diffusion, usually smoothing, can create patterns when coupled to reactions with short-range activation and long-range inhibition.
!: Turing patterns need different diffusion rates; with equal rates, diffusion only smooths the system.
Q: What did Turing propose in 1952? | That reaction and diffusion of morphogens can spontaneously form patterns.
Q: What is the Fisher–KPP front speed? | v = 2√(Dr).
M1: Turing patterns require: | Short-range activation, long-range inhibition | Equal diffusion coefficients | No reactions | Constant concentrations | The inhibitor diffuses faster.
M2: FitzHugh–Nagumo models describe: | Excitable media like nerves | Superconductors | Fractals | Black holes | Simplified Hodgkin–Huxley dynamics.

## Solitons and nonlinear waves
S: Solitons are solitary waves that keep their shape while travelling and survive collisions intact, because nonlinearity exactly balances dispersion. First seen as a canal wave in 1834, they now carry data in optical fibres and appear in plasmas, water and condensates.
H: Discovery
- John Scott Russell followed a "wave of translation" along the Union Canal near Edinburgh in 1834.
- Korteweg and de Vries (1895) derived the shallow-water equation.
- Zabusky and Kruskal (1965) found that solitons pass through each other, coining "soliton".
H: Key equations
- **KdV**: u_{t} + 6uu_{x} + u_{xxx} = 0; soliton u = (c/2)sech^{2}(√c(x − ct)/2).
- Taller solitons travel faster and are narrower.
- **Nonlinear Schrödinger (NLS)**: optical fibres, Bose–Einstein condensates, deep-water waves.
- **Sine-Gordon**: kinks in Josephson junctions, dislocations, DNA.
E: u_{t} + 6uu_{x} + u_{xxx} = 0 :: KdV equation
E: u(x, t) = (c/2) sech^{2}[√c(x − ct)/2] :: KdV soliton
H: Other nonlinear waves
P: Shock waves form when nonlinearity steepens waves without enough dispersion (Burgers equation, sonic booms). Rogue waves in the ocean may be explained by modulational instability in the NLS (Peregrine breather). Integrable equations can be solved exactly by the inverse scattering transform. Tsunamis, tidal bores (Severn bore), atmospheric morning glory clouds and nerve pulses are related phenomena.
X: A KdV soliton has speed c = 4. What are its amplitude and width scale?
> Amplitude = c/2 = 2
> Width ∝ 2/√c = 1
X: Why do fibre solitons need anomalous dispersion?
> Self-phase modulation chirps the pulse; anomalous dispersion compensates it, balancing to a stable shape
K: Solitons balance nonlinear steepening against dispersive spreading, giving stable, particle-like waves.
!: Not every solitary wave is a true soliton; strict solitons survive collisions with only a phase shift.
Q: Who first described a solitary wave? | John Scott Russell, on the Union Canal in 1834.
Q: How does soliton speed relate to height in KdV? | Taller solitons travel faster.
M1: Shock waves differ from solitons because: | Dissipation or insufficient dispersion lets them steepen | They are linear | They have no speed | They pass through each other unchanged | Burgers vs KdV.
M2: The NLS equation describes solitons in: | Optical fibres | Planetary orbits | Transistors | Radioactive decay | Kerr nonlinearity + dispersion.

## Chaos in mechanical and electrical systems
S: Chaos is not just theory: it appears in pendulums, rotating machines, electronic circuits, lasers and orbits. Engineers must recognise, avoid or exploit it, from preventing vibration failures to using chaotic signals for secure communication.
H: Mechanical systems
- **Double pendulum**: chaotic at moderate energies.
- **Driven damped pendulum**: θ̈ + γθ̇ + ω_{0}^{2} sin θ = A cos ωt; period doubling and chaos for large drive.
- **Duffing oscillator**: magnetoelastic beam (Moon's experiment), with jumps and chaos.
- **Magnetic pendulum** with three magnets: fractal basin boundaries.
- **Tumbling moons and asteroids**: Hyperion rotates chaotically; the solar system is chaotic on million-year scales.
- **Rattling gears, chatter in machine tools, train wheel hunting** are chaotic vibrations to avoid.
E: θ̈ + γθ̇ + ω_{0}^{2} sin θ = A cos ωt :: driven damped pendulum
H: Electrical systems
- **Chua's circuit**: a nonlinear resistor plus three energy-storage elements gives the double-scroll attractor.
- **Driven diode-resonator (RLD)** circuits show period doubling.
- **Power converters** (switching regulators) can bifurcate and become chaotic.
- **Lasers** with feedback or modulation behave like Lorenz systems.
H: Exploiting chaos
P: Chaotic synchronisation (Pecora and Carroll 1990) lets a receiver lock to a chaotic transmitter, used for masking communication. Chaos-based random number generators use laser chaos for Gbps randomness. Chaotic mixing improves microfluidic devices. Spacecraft use chaotic three-body dynamics to plan low-fuel trajectories.
X: Why does a pendulum need a drive to be chaotic?
> An undriven pendulum is a 2D autonomous system (θ, θ̇), which cannot be chaotic
> The drive adds time (phase) as a third dimension
K: Real mechanical and electronic systems become chaotic when nonlinearity, driving and enough dimensions combine.
!: Chaotic vibration can resemble random noise; misdiagnosing it can lead to wrong fixes in engineering.
Q: What makes Chua's circuit chaotic? | A piecewise-linear nonlinear resistor with three energy-storage elements (two capacitors and an inductor).
Q: Why is Hyperion's rotation chaotic? | Its irregular shape and eccentric orbit couple rotation to orbital motion chaotically.
M1: Fractal basin boundaries occur in the: | Magnetic pendulum | Simple harmonic oscillator | RC circuit | Free fall | The final magnet depends sensitively on the start.
M2: Pecora–Carroll synchronisation allows: | Receivers to lock to chaotic signals | Linear amplification | Faster CPUs | Superconductivity | Chaotic communication.

## Complex systems and emergent behaviour
S: Complex systems consist of many interacting parts whose collective behaviour is not obvious from the parts alone. Emergence, networks, feedback and adaptation describe phenomena from ecosystems and economies to the brain and the internet.
H: Emergence
- Collective properties arise from interactions: temperature from molecules, consciousness from neurons, traffic jams from drivers, market crashes from traders.
- "More is different" (P. W. Anderson, 1972): each level has its own laws.
- Universality: very different systems share behaviour near critical points.
H: Features of complex systems
- Many components, nonlinear interactions, feedback loops.
- Heterogeneity and adaptation (agents learn and change rules).
- Networks: small-world (short paths, high clustering) and scale-free (hubs, P(k) ∝ k^{−γ}).
- Power laws, heavy tails and extreme events.
- History dependence, tipping points and resilience.
E: P(k) ∝ k^{−γ} :: scale-free degree distribution
E: R_{0} > 1 :: epidemic threshold
H: Tools
P: Agent-based models simulate individuals following rules; network science maps connections; statistical physics (mean-field theory, percolation, renormalisation) explains collective transitions; information theory measures complexity. Applications: pandemic modelling, power grid cascading failures, financial contagion, climate tipping points, urban scaling (larger cities produce more patents per person). The 2021 Nobel Prize (Parisi, Manabe, Hasselmann) honoured complex physical systems.
X: An epidemic has R_{0} = 3. What fraction must be immune to stop spread?
> Herd immunity threshold = 1 − 1/R_{0} = 1 − 1/3 ≈ 67%
X: In a scale-free network, what happens if random nodes fail versus hubs being attacked?
> Random failures rarely hit hubs: robust
> Targeted hub attacks fragment the network quickly: fragile
K: Complex systems show emergent behaviour from interactions; understanding needs networks, feedback and statistical physics.
!: Emergent behaviour is real but not magical; it follows from the parts and their interactions, even if it cannot be easily predicted from them.
Q: What is a small-world network? | One with short average path lengths and high clustering.
Q: What did Anderson mean by "More is different"? | New laws and concepts emerge at each level of complexity.
M1: Scale-free networks are vulnerable to: | Targeted attacks on hubs | Random failures | Adding nodes | Small-world shortcuts | Hubs hold the network together.
M2: Herd immunity threshold for R_{0} = 5 is: | 80% | 20% | 50% | 95% | 1 − 1/5.
`;
