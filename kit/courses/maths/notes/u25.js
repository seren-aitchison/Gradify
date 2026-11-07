// School 25: Control Theory and Systems. Format: kit/course/notes.js. Standard: docs/CURRICULUM_CONTENT_STANDARD.md
// Systems, feedback and stability, frequency methods, and advanced control.
export default `
## Control Theory
S: Control theory designs inputs that make a dynamical system behave as we want: a thermostat holding temperature, cruise control holding speed, an autopilot holding course. Feedback, stability and performance are its central ideas, expressed in differential equations and transforms.
O: Describe the elements of a control system and its goals
O: Explain why feedback is used and what can go wrong
T: Plant | The system being controlled, such as a motor, aircraft or chemical reactor
T: Reference signal | The desired output (set point) that the controller tries to make the system follow
H: Elements
- Plant, sensor, controller and actuator.
- Reference r, output y, error e = r − y, control input u.
- Disturbances and measurement noise.
- Models: differential equations, transfer functions, state space.
H: Goals
- Stability: responses stay bounded and settle.
- Tracking: follow the reference with small error.
- Disturbance rejection and robustness to model errors.
- Performance: speed, overshoot, energy use.
H: History and reach
- Watt's centrifugal governor (1788) and Maxwell's analysis (1868).
- Classical frequency methods (Nyquist, Bode) in the 1930s–40s.
- State-space and optimal control (Kalman, Pontryagin) in the 1960s.
- Aerospace, robotics, power grids, medicine, economics.
X: A room heater turns on when the temperature is below 20 °C and off above it. Identify the plant, sensor, controller and actuator.
> Plant: the room's thermal dynamics
> Sensor: the thermometer; controller: the thermostat logic comparing temperature with 20 °C
> Actuator: the heater, which changes the heat input u
K: Control systems combine plant, sensor, controller and actuator; goals are stability, tracking, disturbance rejection and robustness; feedback compares output with reference.
!: Designing a controller without considering sensor noise and actuator limits.
Q: What is the error signal in a feedback loop? | The reference minus the measured output.
Q: Who analysed the stability of governors mathematically in 1868? | James Clerk Maxwell.
SUM: Control makes systems behave.
SUM: Feedback is the key idea.
SRC: Åström KJ, Murray RM, Feedback Systems: An Introduction for Scientists and Engineers (2nd edn, Princeton University Press 2021) | textbook | 2021 | https://fbswiki.org/
SRC: Maxwell JC, On governors, Proceedings of the Royal Society of London 16, 270 | journal | 1868 | https://doi.org/10.1098/rspl.1867.0055
NUM1#maths-u25-01-q1@1: A cruise controller targets 70 mph and the car is doing 64 mph. What is the error signal in mph? | 6 | 0 | mph | e = r − y = 70 − 64 = 6.
M1#maths-u25-01-q2@1: In a car's cruise control, which component is the actuator? | The throttle that changes engine power | The speedometer measuring speed | The driver's chosen set speed | The gradient of the road ahead | The total mass of the car | The actuator applies the control input to the plant.
M2#maths-u25-01-q3@2: Why do control engineers model disturbances explicitly? | Controllers must keep performance despite unknown inputs like wind, load changes or hills | Disturbances never occur in well-designed systems, so modelling them is a formality | Modelling disturbances makes the system linear, which simplifies the design | Disturbances replace the reference signal, so they must be known exactly | They don't model them; feedback handles any disturbance automatically | Disturbance rejection is a main purpose of feedback.

## Linear Systems
S: Linear systems obey superposition: the response to a sum of inputs is the sum of the responses. Linear time-invariant (LTI) models are the workhorse of control because they can be analysed exactly with matrices, Laplace transforms and eigenvalues.
O: Write linear ODE and state-space models and test linearity
O: Solve linear systems using the matrix exponential and eigenvalues
T: Superposition | For linear systems, input au₁ + bu₂ produces output ay₁ + by₂
T: Matrix exponential | e^{At} = Σ (At)ᵏ/k!, giving the solution x(t) = e^{At}x(0) of ẋ = Ax
H: Models
- Linear ODEs with constant coefficients: mẍ + cẋ + kx = u.
- State space ẋ = Ax + Bu, y = Cx + Du.
- Transfer functions G(s) = Y(s)/U(s).
- Linearisation of non-linear systems about an operating point.
H: Solutions
- x(t) = e^{At}x(0) + ∫₀ᵗ e^{A(t−τ)}Bu(τ) dτ.
- Modes e^{λt} for eigenvalues λ of A.
- Real parts set growth or decay; imaginary parts set oscillation.
- Time constant τ = 1/|Re λ| for first-order decay.
H: Why linear models dominate
- Exact analysis and design tools.
- Good local approximations near equilibrium.
- Feedback often makes systems more linear.
- But saturation, friction and large motions are non-linear.
X: Solve ẋ = −2x with x(0) = 5 and give the time constant.
> Solution x(t) = 5e^{−2t}
> Eigenvalue λ = −2, so the time constant τ = 1/2 s
> After one time constant x ≈ 5 × 0.368 ≈ 1.84
K: Linear systems obey superposition; state-space and transfer-function models describe them; solutions use the matrix exponential; eigenvalues determine growth, decay and oscillation.
!: Applying superposition to a system with saturation or other non-linearity.
Q: What does superposition mean? | The response to a sum of inputs is the sum of responses.
Q: What is the time constant of ẋ = −ax? | 1/a.
SUM: Linear means superposition.
SUM: Eigenvalues set behaviour.
SRC: Chen CT, Linear System Theory and Design (4th edn, Oxford University Press 2013) | textbook | 2013 | https://global.oup.com/
SRC: Hespanha JP, Linear Systems Theory (2nd edn, Princeton University Press 2018) | textbook | 2018 | https://press.princeton.edu/
NUM1#maths-u25-02-q1@1: A first-order system has time constant 4 s. About how long does it take to settle to within 2% of its final value, in seconds? | 16 | 0 | s | The 2% settling time is about 4τ = 16 s.
M1#maths-u25-02-q2@1: A system has eigenvalues −1 ± 3i. How does its unforced response behave? | Decaying oscillation | Growing oscillation | Pure exponential decay | Constant | Pure exponential growth | Negative real parts decay; imaginary parts give oscillation at 3 rad/s.
M2#maths-u25-02-q3@2: Why are non-linear systems often linearised for control design? | Near an operating point a linear model approximates the behaviour well, enabling exact design tools | Non-linear systems are always linear near every point, so nothing is lost | Linearisation removes all modelling errors from the design process | Linearisation makes the system unstable, which simplifies control | They're never linearised; non-linear design tools are always used | Small deviations obey the Jacobian dynamics.

## Nonlinear Systems
S: Real systems are often non-linear: saturating actuators, friction, aerodynamics, chemical kinetics. Non-linear systems can have several equilibria, limit cycles and chaos, and their stability depends on where they start, so linear tools alone aren't enough.
O: Find equilibria and linearise non-linear systems
O: Recognise behaviours unique to non-linear systems
T: Equilibrium point | A state x* where f(x*) = 0, so the system stays there if undisturbed
T: Region of attraction | The set of initial states from which trajectories converge to a stable equilibrium
H: Features
- Multiple equilibria (a pendulum hangs down or balances up).
- Limit cycles (van der Pol oscillator).
- Finite escape time: solutions can blow up in finite time.
- Chaos in three or more dimensions.
H: Analysis
- Linearise: ẋ ≈ J(x*)(x − x*) with Jacobian J.
- Hartman–Grobman: valid when no eigenvalue has zero real part.
- Phase-plane analysis for 2D systems.
- Lyapunov methods for global stability.
H: Common non-linearities in control
- Actuator saturation and integrator windup.
- Dead zones, backlash, hysteresis.
- Describing functions to predict limit cycles.
- Non-linear control methods (see Nonlinear Control).
X: Find the equilibria of the pendulum θ̈ = −sin θ and their stability.
> Equilibria where sin θ = 0: θ = 0 and θ = π
> At θ = 0: θ̈ ≈ −θ, eigenvalues ±i (a centre, neutrally stable without friction)
> At θ = π: θ̈ ≈ +(θ − π), eigenvalues ±1, a saddle: unstable
K: Non-linear systems can have many equilibria, limit cycles, finite escape and chaos; linearisation gives local behaviour; regions of attraction and Lyapunov methods address global behaviour.
!: Concluding global stability from a linearisation, which only describes behaviour near the equilibrium.
Q: What is a region of attraction? | The set of starting states that converge to a stable equilibrium.
Q: What is integrator windup? | Integral action accumulating error while an actuator is saturated.
SUM: Non-linear systems behave richly.
SUM: Linearisation is only local.
SRC: Khalil HK, Nonlinear Systems (3rd edn, Prentice Hall 2002) | textbook | 2002 | https://www.pearson.com/
SRC: Strogatz SH, Nonlinear Dynamics and Chaos (2nd edn, CRC Press 2015) | textbook | 2015 | https://www.routledge.com/
NUM1#maths-u25-03-q1@1: For ẋ = x − x^{3}, how many equilibrium points are there? | 3 | 0 |  | x(1 − x^{2}) = 0 gives x = −1, 0 and 1.
M1#maths-u25-03-q2@1: For ẋ = x − x^{3}, what is the stability of x = 0? | Unstable, since the linearisation ẋ ≈ x grows | Stable, since x^{3} dominates | Neutrally stable | Asymptotically stable | Undefined | The linearisation at 0 is ẋ ≈ f′(0)x = x, with f′(0) = 1 > 0, so small deviations grow and the origin is unstable.
M3#maths-u25-03-q3@2: Why can a linearisation predict local stability but not the region of attraction? | It describes only small deviations; far away, non-linear terms can push trajectories elsewhere | Linearisation is exact everywhere, so it predicts the region too | Regions of attraction are always the whole state space | Non-linear terms vanish far from the equilibrium | It predicts both local stability and the region exactly | The Jacobian ignores higher-order terms that matter for large deviations.

## State-Space Representation
S: State-space models describe a system by a vector of state variables and first-order differential equations, ẋ = Ax + Bu and y = Cx + Du. They handle multiple inputs and outputs naturally and underpin modern control, estimation and computer simulation.
O: Convert higher-order ODEs to state-space form
O: Relate state-space models to transfer functions and eigenvalues
T: State vector | x(t), the minimal set of variables whose current values, with future inputs, determine future behaviour
T: State-space model | ẋ = Ax + Bu, y = Cx + Du, with system, input, output and feedthrough matrices A, B, C, D
H: Building models
- Choose states: positions and velocities, capacitor voltages, inductor currents.
- mẍ + cẋ + kx = u with x₁ = x, x₂ = ẋ gives A = [[0, 1], [−k/m, −c/m]], B = [0, 1/m]ᵀ.
- Multiple inputs and outputs fit easily.
H: Connections
- Transfer function G(s) = C(sI − A)^{−1}B + D.
- Poles are eigenvalues of A.
- Change of coordinates x = Tz gives equivalent models.
- Canonical forms (controllable, observable, modal).
H: Uses
- State feedback u = −Kx and pole placement.
- Observers and Kalman filters estimate states.
- Discretisation for digital control: x_{k+1} = A_{d}x_{k} + B_{d}u_{k}.
- Simulation and optimal control.
X: Write ẍ + 3ẋ + 2x = u in state-space form and find the poles.
> States x₁ = x, x₂ = ẋ: ẋ₁ = x₂, ẋ₂ = −2x₁ − 3x₂ + u
> A = [[0, 1], [−2, −3]], B = [0, 1]ᵀ, C = [1, 0]
> Eigenvalues solve λ^{2} + 3λ + 2 = 0: poles −1 and −2
K: State-space models use first-order matrix equations; higher-order ODEs convert via position and velocity states; eigenvalues of A are poles; G(s) = C(sI − A)^{−1}B + D links to transfer functions.
!: Choosing too few state variables, so the model can't capture the system's memory.
Q: How are a state-space model's poles found? | As eigenvalues of A.
Q: What is the transfer function of a state-space model? | C(sI − A)^{−1}B + D.
SUM: States capture a system's memory.
SUM: Matrices make analysis systematic.
SRC: Franklin GF, Powell JD, Emami-Naeini A, Feedback Control of Dynamic Systems (8th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Kalman RE, Mathematical description of linear dynamical systems, Journal of the Society for Industrial and Applied Mathematics A 1(2), 152 | journal | 1963 | https://doi.org/10.1137/0301010
NUM1#maths-u25-04-q1@1: How many state variables does a third-order ODE need in state-space form? | 3 | 0 | states | An nth-order ODE needs n first-order states.
M1#maths-u25-04-q2@1: For A = [[0, 1], [−4, 0]], what are the poles? | ±2i | ±4 | −2 and −2 | 0 and 4 | ±4i | λ^{2} + 4 = 0 gives λ = ±2i: undamped oscillation.
M2#maths-u25-04-q3@2: Why are state-space models well suited to multi-input, multi-output systems? | Matrices B and C handle any number of inputs and outputs in one framework | They only work for systems with a single input and output | Transfer functions handle multi-input systems more simply | State variables can't include any of the outputs | They aren't suited; MIMO systems need separate models | Single matrix equations replace many coupled transfer functions.

## Transfer Functions
S: A transfer function is the Laplace transform of a system's output divided by that of its input, assuming zero initial conditions. It turns differential equations into algebra, and its poles and zeros reveal stability, speed and resonance at a glance.
O: Derive transfer functions from ODEs and block diagrams
O: Use poles, zeros, DC gain and the final value theorem
T: Transfer function | G(s) = Y(s)/U(s), the ratio of Laplace transforms of output and input
T: Final value theorem | lim_{t→∞} y(t) = lim_{s→0} sY(s), valid when the limit exists (stable system)
H: Derivation
- Laplace transform turns d/dt into s (zero initial conditions).
- ẍ + 3ẋ + 2x = u gives G(s) = 1/(s^{2} + 3s + 2).
- Block diagrams: series multiply, parallel add, feedback G/(1 + GH).
H: Poles and zeros
- Poles: roots of the denominator; left half-plane means stable.
- Zeros: roots of the numerator; shape the response.
- Right-half-plane zeros cause initial undershoot.
- Dominant poles closest to the imaginary axis govern speed.
H: Standard forms
- First order: K/(τs + 1).
- Second order: ωₙ^{2}/(s^{2} + 2ζωₙs + ωₙ^{2}), damping ratio ζ, natural frequency ωₙ.
- DC gain G(0): steady-state response to a unit step.
- Percentage overshoot e^{−πζ/√(1 − ζ^{2})} × 100%.
X: Find the steady-state output of G(s) = 4/(s + 2) for a unit step input.
> Y(s) = G(s)/s
> Final value = lim_{s→0} s × 4/(s(s + 2)) = 4/2
> = 2 (the DC gain)
K: Transfer functions turn ODEs into algebra; poles determine stability and speed; zeros shape responses; DC gain and the final value theorem give steady states; second-order forms use ζ and ωₙ.
!: Applying the final value theorem to an unstable system, where it gives a meaningless answer.
Q: Where must poles lie for a continuous-time system to be stable? | In the left half of the complex plane.
Q: What is the closed-loop transfer function with forward G and feedback H? | G/(1 + GH).
SUM: Transfer functions make dynamics algebraic.
SUM: Poles tell stability.
SRC: Ogata K, Modern Control Engineering (5th edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
SRC: Dorf RC, Bishop RH, Modern Control Systems (14th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u25-05-q1@1: A second-order system has damping ratio ζ = 0.5. What is its percentage overshoot, to the nearest whole number? | 16 | 0.5 | % | e^{−π × 0.5/√0.75} = e^{−1.814} ≈ 0.163, about 16%.
M1#maths-u25-05-q2@1: What is the DC gain of G(s) = 10/(s^{2} + 4s + 5)? | 2 | 10 | 5 | 0.5 | 4 | The DC gain is G(0), the steady response to a unit step: 10/5 = 2.
M2#maths-u25-05-q3@2: Why does a right-half-plane zero make control harder? | It causes the response to start in the wrong direction and limits achievable speed | It makes the open-loop system unstable by itself, whatever the poles | It has no effect on the response, only on the plot's appearance | It speeds up the response, causing excessive overshoot | It removes all poles, so the system has no dynamics left | Non-minimum-phase zeros impose fundamental bandwidth limits.

## Hybrid Systems
S: Hybrid systems combine continuous dynamics with discrete events and modes, like a bouncing ball, a thermostat switching a heater, or a car changing gears. Their mathematics joins differential equations with automata, and verifying their safety is a major challenge.
O: Model systems with hybrid automata
O: Describe Zeno behaviour and reachability analysis
T: Hybrid automaton | A model with discrete modes, continuous dynamics in each mode, guard conditions for switching and reset maps
T: Zeno behaviour | Infinitely many discrete transitions in finite time, as in an idealised bouncing ball
H: Modelling
- Modes with their own ODEs ẋ = f_{q}(x).
- Guards: conditions triggering transitions.
- Resets: state jumps at transitions (velocity reverses on impact).
- Invariants: conditions for staying in a mode.
H: Behaviour
- Bouncing ball: impacts with restitution e cause Zeno behaviour.
- Thermostat: limit cycle between two thresholds.
- Chattering when switching very fast.
H: Analysis and verification
- Reachability: which states can the system reach?
- Safety verification of cyber-physical systems (cars, aircraft, medical devices).
- Tools: SpaceEx, KeYmaera X.
- Undecidable in general; decidable for timed automata.
X: A ball is dropped from 1 m and bounces with restitution e = 0.5. How does each bounce height compare with the last?
> Velocity after impact is e times the impact velocity
> Height scales with velocity squared, so each bounce reaches e^{2} = 0.25 of the previous height
> Heights 1, 0.25, 0.0625, …: infinitely many bounces in finite total time (Zeno)
K: Hybrid systems mix continuous flows with discrete jumps via modes, guards and resets; Zeno behaviour and chattering can occur; reachability analysis verifies safety of cyber-physical systems.
!: Simulating Zeno systems naively, which gets stuck taking ever smaller steps.
Q: What is a guard in a hybrid automaton? | A condition that triggers a transition between modes.
Q: What is Zeno behaviour? | Infinitely many transitions in finite time.
SUM: Continuous dynamics with discrete switches.
SUM: Verification is hard but vital.
SRC: Goebel R, Sanfelice RG, Teel AR, Hybrid Dynamical Systems (Princeton University Press 2012) | textbook | 2012 | https://press.princeton.edu/
SRC: Alur R et al., The algorithmic analysis of hybrid systems, Theoretical Computer Science 138(1), 3 | journal | 1995 | https://doi.org/10.1016/0304-3975(94)00202-T
NUM1#maths-u25-06-q1@1: A ball dropped from 2 m bounces with restitution e = 0.6. What height does it reach after the first bounce, in m? | 0.72 | 0.001 | m | Height scales by e^{2} = 0.36: 2 × 0.36 = 0.72 m.
M1#maths-u25-06-q2@1: Which system is naturally modelled as hybrid? | A thermostat switching a heater on and off | A pure mass–spring system | A linear RC circuit without switches | Exponential decay | A constant signal | It has continuous temperature dynamics and discrete heater modes.
M2#maths-u25-06-q3@2: Why is safety verification of hybrid systems difficult? | Mixing flows with discrete switches makes reachable sets hard to compute; it's undecidable in general | Hybrid systems are always safe, so verification is a formality | They have no continuous states, so reachability is trivial | Verification needs only a few simulations to be complete | It isn't difficult; standard ODE solvers prove safety directly | Even simple hybrid automata can encode undecidable problems.

## Switched Systems
S: A switched system changes between several dynamical modes according to a switching signal, as in power converters or gear changes. Surprisingly, switching between stable modes can create instability, and switching between unstable ones can stabilise.
O: Describe switched linear systems and switching signals
O: Use common Lyapunov functions and dwell-time conditions
T: Switched linear system | ẋ = A_{σ(t)}x, where the switching signal σ(t) selects one of several matrices A₁, …, A_{m}
T: Common Lyapunov function | A function V decreasing along every mode's trajectories, guaranteeing stability under arbitrary switching
H: Surprising behaviour
- Two stable modes can produce an unstable switched system.
- Two unstable modes can be stabilised by clever switching.
- Stability depends on the switching signal.
H: Stability tools
- Common quadratic Lyapunov function: AᵢᵀP + PAᵢ < 0 for all i (LMIs).
- Multiple Lyapunov functions for constrained switching.
- Dwell time: switching slowly enough preserves stability.
- Average dwell-time conditions.
H: Applications
- DC–DC power converters.
- Gear shifting and automotive control.
- Networked systems with changing topology.
- Gain scheduling as smooth switching.
X: Why can switching between two stable linear systems be unstable?
> Each mode alone makes trajectories spiral inwards, but along different elliptical paths
> Switching at the right moments can keep jumping onto the outward-moving part of each spiral
> The combined trajectory then grows, even though each mode is stable
K: Switched systems change modes by a switching signal; stability depends on switching; common Lyapunov functions guarantee stability under any switching; dwell-time conditions limit fast switching.
!: Assuming a system that switches only between stable modes must be stable.
Q: What does a common Lyapunov function guarantee? | Stability under arbitrary switching.
Q: What is dwell time? | A minimum time spent in each mode between switches.
SUM: Switching changes stability.
SUM: Lyapunov tools cover all modes.
SRC: Liberzon D, Switching in Systems and Control (Birkhäuser 2003) | textbook | 2003 | https://link.springer.com/
SRC: Hespanha JP, Morse AS, Stability of switched systems with average dwell-time, Proceedings of the 38th IEEE Conference on Decision and Control, 2655 | journal | 1999 | https://doi.org/10.1109/CDC.1999.831330
NUM1#maths-u25-07-q1@1: A switched system must dwell at least 0.2 s in each mode. What is the maximum number of switches in 10 s? | 50 | 0 | switches | 10/0.2 = 50 switches at most.
M1#maths-u25-07-q2@1: Which condition guarantees a switched linear system is stable under any switching? | A common Lyapunov function exists for all modes | Each mode is stable on its own | The modes commute with no extra conditions | The switching is random | No condition can guarantee it | Individual stability isn't enough; a shared Lyapunov function is.
M3#maths-u25-07-q3@2: How can switching between two unstable modes produce a stable system? | Well-timed switching uses each mode's contracting directions, so the state shrinks | Unstable modes become stable on their own after enough time | Switching removes all dynamics, so the state stays fixed | It's impossible: switching between unstable modes always diverges | The two modes cancel exactly whenever they're switched together | Each unstable mode may still contract in some directions, and switching exploits them.

## Open-Loop Control
S: Open-loop control applies a pre-planned input without measuring the result, like a toaster timer or a washing machine cycle. It's simple and can't be destabilised by feedback, but it can't correct for disturbances or model errors.
O: Distinguish open-loop from closed-loop control
O: Design simple open-loop inputs using a model inverse
T: Open-loop control | Control where the input is computed from the reference and a model, without using measurements of the output
T: Feedforward | An open-loop component that anticipates the required input from the reference or measured disturbances
H: How it works
- Use the model to compute u that should give the desired y.
- For a static plant y = Ku: choose u = r/K.
- Trajectory planning for robots and spacecraft.
- Timers and sequences (traffic lights on fixed cycles).
H: Strengths and weaknesses
- Simple, cheap, no sensors needed.
- Can't become unstable through feedback.
- Errors in K or disturbances cause steady errors.
- Unstable plants can't be controlled open-loop.
H: Combining with feedback
- Feedforward plus feedback: fast response with error correction.
- Disturbance feedforward when disturbances are measured.
- Inverse dynamics in robotics.
X: A heater's steady temperature rise is 5 °C per kW. To raise a room by 15 °C open-loop, what power is needed? What if the true gain is 4 °C per kW?
> u = 15/5 = 3 kW
> With true gain 4: the rise is 4 × 3 = 12 °C
> A 3 °C error remains, since open-loop control can't detect it
K: Open-loop control applies planned inputs without measuring outputs; it's simple and stable but can't correct model errors or disturbances; feedforward combined with feedback gets the best of both.
!: Relying on open-loop control when the plant model is uncertain or disturbances are large.
Q: Does open-loop control use output measurements? | No.
Q: Can an unstable plant be stabilised with open-loop control? | No.
SUM: Plan the input, don't measure.
SUM: Simple but can't correct errors.
SRC: Åström KJ, Murray RM, Feedback Systems: An Introduction for Scientists and Engineers (2nd edn, Princeton University Press 2021) | textbook | 2021 | https://fbswiki.org/
SRC: Franklin GF, Powell JD, Emami-Naeini A, Feedback Control of Dynamic Systems (8th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
NUM1#maths-u25-08-q1@1: A pump gives 2 L/min per volt. What open-loop voltage gives 9 L/min? | 4.5 | 0.001 | V | u = r/K = 9/2 = 4.5 V.
M1#maths-u25-08-q2@1: Which device uses open-loop control? | A toaster that heats for a set time | A thermostat-controlled boiler | Cruise control using speed measurements | An autopilot using gyroscopes | A balancing robot | The toaster doesn't measure how brown the toast is.
M2#maths-u25-08-q3@2: Why is feedforward often combined with feedback? | Feedforward gives a fast response to known changes, while feedback corrects remaining errors | Feedback alone is always fastest, so feedforward only adds cost | Feedforward makes systems unstable unless feedback is added | They can't be combined in a single controller | There's no benefit; one or the other is always enough | Feedforward handles the predictable part; feedback handles uncertainty.

## Closed-Loop Control
S: Closed-loop control measures the output and uses the error to adjust the input continuously. It corrects disturbances and model errors automatically, but it can also introduce instability, so its design balances performance against stability margins.
O: Derive closed-loop transfer functions and steady-state errors
O: Explain sensitivity, complementary sensitivity and their trade-off
T: Sensitivity function | S = 1/(1 + L), with loop gain L = GC; it measures how disturbances and model errors affect the output
T: Complementary sensitivity | T = L/(1 + L), the closed-loop transfer from reference to output; S + T = 1
H: Closed-loop equations
- y = (GC/(1 + GC))r + (1/(1 + GC))d − (GC/(1 + GC))n.
- High loop gain: good tracking and disturbance rejection.
- Noise n passes through T: high gain amplifies sensor noise at high frequencies.
H: Steady-state error
- Unit step with proportional control: e_{ss} = 1/(1 + K_{p}), where K_{p} = L(0).
- Integral action (a pole at s = 0) gives zero step error.
- System type: number of integrators in L.
H: Trade-offs
- S + T = 1: can't make both small at the same frequency.
- Bode's integral: reducing sensitivity at some frequencies raises it at others (waterbed effect).
- Stability margins guard against model errors.
X: A plant G = 2/(s + 1) has proportional control C = 4. Find the closed-loop DC gain and the step steady-state error.
> L(0) = GC at s = 0 = 2 × 4 = 8
> Closed-loop DC gain T(0) = 8/9 ≈ 0.889
> Steady-state error = 1/(1 + 8) = 1/9 ≈ 0.111
K: Closed-loop control uses error feedback; S and T describe disturbance and reference responses with S + T = 1; integral action removes step error; the waterbed effect limits shaping.
!: Increasing gain indefinitely to cut error, ignoring stability and noise amplification.
Q: What is the sensitivity function? | S = 1/(1 + L).
Q: What eliminates steady-state error for a step input? | Integral action in the loop.
SUM: Feedback corrects errors.
SUM: Sensitivity trade-offs are unavoidable.
SRC: Skogestad S, Postlethwaite I, Multivariable Feedback Control: Analysis and Design (2nd edn, Wiley 2005) | textbook | 2005 | https://www.wiley.com/
SRC: Bode HW, Network Analysis and Feedback Amplifier Design (Van Nostrand 1945) | textbook | 1945 | https://archive.org/
NUM1#maths-u25-09-q1@1: A loop has L(0) = 19 with proportional control. What is the steady-state error for a unit step? | 0.05 | 0.001 |  | e_{ss} = 1/(1 + 19) = 0.05.
M1#maths-u25-09-q2@1: Which signal does the complementary sensitivity T pass to the output? | Measurement noise (as well as the reference) | Only the disturbances acting on the plant | Nothing at all, since T is a design aid | Only the control effort sent to the actuator | Only errors in the plant model | y contains −Tn, so high T at high frequency amplifies sensor noise.
M3#maths-u25-09-q3@2: What does Bode's sensitivity integral (the waterbed effect) imply? | Pushing sensitivity down over some frequencies forces it up over others | Sensitivity can be made zero at every frequency at once | Sensitivity doesn't depend on frequency for stable loops | Feedback always increases sensitivity at all frequencies | It implies nothing about how sensitivity can be shaped | For stable open loops, ∫ ln|S(iω)| dω = 0, so reductions must be balanced.

## Feedback Control
S: Feedback is the principle behind all closed-loop control: measure, compare, correct. It reduces sensitivity to uncertainty, rejects disturbances, linearises behaviour and can stabilise unstable systems, as in balancing robots and fighter jets.
O: Explain the benefits and costs of feedback
O: Design state feedback by pole placement
T: Pole placement | Choosing state-feedback gains K in u = −Kx so the closed-loop matrix A − BK has desired eigenvalues
T: Loop gain | The product of all transfer functions around the feedback loop, L = GC
H: Benefits of feedback
- Reduces sensitivity to plant variations: dT/T = S dG/G.
- Rejects disturbances.
- Stabilises unstable plants (inverted pendulum, Segway).
- Makes amplifiers precise despite variable components (Black 1927).
H: Costs and risks
- Needs sensors, which add noise and cost.
- Can destabilise if gain is too high or delays are large.
- Bandwidth limits from delays and right-half-plane zeros.
H: State feedback
- u = −Kx + k_{r}r.
- Controllable systems allow arbitrary pole placement (Ackermann's formula).
- Choose poles for speed and damping, within actuator limits.
- Needs states, often from an observer.
X: The plant ẋ = 2x + u is unstable. Choose K in u = −Kx to place the pole at −3.
> Closed loop: ẋ = (2 − K)x
> Set 2 − K = −3
> K = 5 stabilises it with time constant 1/3 s
K: Feedback reduces sensitivity, rejects disturbances and stabilises unstable plants; it costs sensors and risks instability; state feedback places closed-loop poles when the system is controllable.
!: Placing poles very far left without considering actuator saturation and noise.
Q: What does pole placement choose? | State-feedback gains that set the closed-loop eigenvalues.
Q: Who invented the negative-feedback amplifier in 1927? | Harold Black.
SUM: Measure, compare, correct.
SUM: Feedback can stabilise.
SRC: Black HS, Stabilized feedback amplifiers, Bell System Technical Journal 13(1), 1 | journal | 1934 | https://doi.org/10.1002/j.1538-7305.1934.tb00652.x
SRC: Åström KJ, Murray RM, Feedback Systems: An Introduction for Scientists and Engineers (2nd edn, Princeton University Press 2021) | textbook | 2021 | https://fbswiki.org/
NUM1#maths-u25-10-q1@1: For ẋ = 4x + u with u = −Kx, what gain K places the pole at −6? | 10 | 0 |  | 4 − K = −6 gives K = 10.
M1#maths-u25-10-q2@1: Which plant needs feedback to be stabilised? | An inverted pendulum balanced upright | A damped mass–spring system | A stable first-order filter | A resistor | A cooling cup of tea | Its upright equilibrium is unstable without corrective control.
M2#maths-u25-10-q3@2: Why does feedback reduce sensitivity to plant variations? | Relative changes in G are scaled by S = 1/(1 + L), small at high loop gain | Feedback removes the plant from the loop entirely | It makes the plant's transfer function constant | Sensitivity rises with feedback, not falls | It doesn't reduce sensitivity to plant changes | dT/T = S dG/G, so high gain suppresses parameter effects.

## PID Control
S: PID controllers combine proportional, integral and derivative actions on the error. They're simple, robust and used in over 90% of industrial control loops, from heating systems to drones, and well-known tuning rules make them practical without detailed models.
O: Explain the effect of P, I and D terms
O: Apply Ziegler–Nichols tuning and anti-windup
T: PID controller | u = K_{p}e + K_{i}∫e dt + K_{d} de/dt, or C(s) = K_{p} + K_{i}/s + K_{d}s
T: Integral windup | Accumulation of the integral term while the actuator is saturated, causing large overshoot
H: The three terms
- P: reacts to present error; higher gain is faster but may oscillate and leaves steady error.
- I: removes steady-state error; can slow response and cause overshoot.
- D: anticipates using rate of change; adds damping but amplifies noise (filter it).
H: Tuning
- Ziegler–Nichols ultimate gain: find K_{u} and period T_{u} at sustained oscillation.
- Classic PID: K_{p} = 0.6K_{u}, T_{i} = T_{u}/2, T_{d} = T_{u}/8.
- Lambda tuning and IMC-based methods.
- Auto-tuning by relay feedback (Åström–Hägglund).
H: Practical issues
- Anti-windup: stop integrating when saturated.
- Derivative on measurement, not error, avoids "derivative kick".
- Set-point weighting.
- Discrete implementation in digital controllers.
X: Ziegler–Nichols gives K_{u} = 10 and T_{u} = 2 s. Find classic PID settings.
> K_{p} = 0.6 × 10 = 6
> T_{i} = 2/2 = 1 s, so K_{i} = K_{p}/T_{i} = 6
> T_{d} = 2/8 = 0.25 s, so K_{d} = K_{p}T_{d} = 1.5
K: PID combines proportional, integral and derivative actions; I removes steady error, D adds damping; Ziegler–Nichols and other rules tune it; anti-windup and filtering are essential in practice.
!: Using derivative action on noisy measurements without filtering.
Q: Which PID term removes steady-state error? | The integral term.
Q: What causes integral windup? | Integrating error while the actuator is saturated.
SUM: Three simple actions, many applications.
SUM: Tune and protect against windup.
SRC: Åström KJ, Hägglund T, Advanced PID Control (ISA 2006) | textbook | 2006 | https://www.isa.org/
SRC: Ziegler JG, Nichols NB, Optimum settings for automatic controllers, Transactions of the ASME 64, 759 | journal | 1942 | https://doi.org/10.1115/1.4019264
NUM1#maths-u25-11-q1@1: Using Ziegler–Nichols with K_{u} = 20, what is the classic PID proportional gain? | 12 | 0 |  | K_{p} = 0.6 × 20 = 12.
M1#maths-u25-11-q2@1: Which PID term amplifies high-frequency measurement noise most? | The derivative term | The proportional term | The integral term | None of them | All equally | Differentiation multiplies a sinusoid's amplitude by its frequency.
M2#maths-u25-11-q3@2: Why does proportional-only control usually leave a steady-state error? | A non-zero error is needed to produce the non-zero control input that holds the output | Proportional control always removes all steady-state error | The error grows without bound under proportional control | Proportional gain is zero at steady state, so it does nothing | It doesn't leave one for any plant or reference | u = K_{p}e, so a steady input needs a steady error unless the plant has an integrator.

## Stability Theory
S: Stability theory asks whether a system returns to equilibrium after a disturbance, or whether its responses stay bounded. For linear systems eigenvalues decide; for non-linear systems Lyapunov's methods and their relatives give the answers.
O: Distinguish Lyapunov, asymptotic, exponential and BIBO stability
O: Apply the Routh–Hurwitz criterion
T: Asymptotic stability | Trajectories starting near the equilibrium stay near it and converge to it
T: BIBO stability | Bounded-input bounded-output: every bounded input gives a bounded output
H: Definitions
- Lyapunov stable: small perturbations stay small.
- Asymptotically stable: and they decay to zero.
- Exponentially stable: decay at least like e^{−αt}.
- Marginal stability: poles on the imaginary axis (undamped oscillation).
H: Linear tests
- Continuous time: all eigenvalues with negative real parts.
- Discrete time: all eigenvalues inside the unit circle.
- Routh–Hurwitz: count right-half-plane roots without solving.
- For s^{2} + a₁s + a₀: stable iff a₁ > 0 and a₀ > 0.
H: Beyond eigenvalues
- Lyapunov's direct method (next lesson).
- Input-to-state stability for systems with inputs.
- Robust stability under uncertainty.
- Stability of delay and infinite-dimensional systems.
X: Use Routh–Hurwitz to test s^{3} + 2s^{2} + 3s + 10.
> Routh array rows: [1, 3], [2, 10], [(2 × 3 − 1 × 10)/2, 0] = [−2, 0], [10]
> The first column 1, 2, −2, 10 has two sign changes
> So two roots lie in the right half-plane: unstable
K: Stability types range from Lyapunov to exponential and BIBO; linear stability needs left-half-plane poles (or inside the unit circle); Routh–Hurwitz counts unstable roots without solving.
!: Calling a system with poles on the imaginary axis asymptotically stable.
Q: For s^{2} + a₁s + a₀, when is the system stable? | When a₁ > 0 and a₀ > 0.
Q: Where must discrete-time poles lie for stability? | Inside the unit circle.
SUM: Stability means returning or staying bounded.
SUM: Routh–Hurwitz counts unstable roots.
SRC: Routh EJ, A Treatise on the Stability of a Given State of Motion (Macmillan 1877) | textbook | 1877 | https://archive.org/
SRC: Hurwitz A, Über die Bedingungen, unter welchen eine Gleichung nur Wurzeln mit negativen reellen Theilen besitzt, Mathematische Annalen 46, 273 | journal | 1895 | https://doi.org/10.1007/BF01446812
NUM1#maths-u25-12-q1@1: For s^{3} + 4s^{2} + 5s + K, the Routh condition is 4 × 5 > K. What is the largest K for stability? | 20 | 0 |  | The cubic s^{3} + a₂s^{2} + a₁s + a₀ is stable iff all coefficients are positive and a₂a₁ > a₀, so K < 20.
M1#maths-u25-12-q2@1: A system has poles at −2 and ±3i. What kind of stability does it have? | Marginal stability with sustained oscillation | Asymptotic stability | Exponential stability | Instability with growth | BIBO stability for all inputs | Imaginary-axis poles give undamped oscillation that doesn't decay.
M3#maths-u25-12-q3@2: Why is a system with a pole at s = 0 not BIBO stable? | A bounded step input produces a ramp output, which grows without bound | Poles at zero always cause oscillation | It is always BIBO stable | Bounded inputs give zero output | The pole has no effect on stability | An integrator 1/s turns a constant into an unbounded ramp.

## Lyapunov Stability
S: Lyapunov's direct method proves stability without solving the equations, by finding an energy-like function that always decreases along trajectories. It works for non-linear systems and underlies much of modern control design.
O: Apply Lyapunov's direct method with candidate functions
O: Use the Lyapunov equation for linear systems and LaSalle's principle
T: Lyapunov function | A function V(x) with V(0) = 0, V(x) > 0 elsewhere and V̇ = ∇V·f(x) ≤ 0 along trajectories
T: Lyapunov equation | AᵀP + PA = −Q; for Q > 0, a positive definite solution P exists iff A is stable
H: Direct method
- V positive definite and V̇ negative definite ⇒ asymptotic stability.
- V̇ ≤ 0 ⇒ stability (Lyapunov sense).
- Radially unbounded V ⇒ global results.
- Physical energy is often a good candidate.
H: Linear systems
- Try V = xᵀPx; then V̇ = xᵀ(AᵀP + PA)x.
- Solve the Lyapunov equation for P.
- Linear matrix inequalities generalise this.
H: Extensions
- LaSalle's invariance principle: with V̇ ≤ 0, trajectories approach the largest invariant set in {V̇ = 0}.
- Control Lyapunov functions for design.
- Converse theorems: stable systems have Lyapunov functions.
- Lyapunov (1892).
X: Show ẋ = −x^{3} is asymptotically stable at 0 using V = x^{2}.
> V = x^{2} > 0 for x ≠ 0
> V̇ = 2xẋ = 2x(−x^{3}) = −2x^{4} < 0 for x ≠ 0
> So the origin is (globally) asymptotically stable, though linearisation (ẋ ≈ 0) is inconclusive
K: Lyapunov functions prove stability by decreasing along trajectories; the Lyapunov equation handles linear systems; LaSalle's principle covers V̇ ≤ 0; the method works where linearisation fails.
!: Concluding instability because one candidate V fails; another function might work.
Q: What must V̇ satisfy for asymptotic stability? | Negative definite (V̇ < 0 away from the origin).
Q: What does the Lyapunov equation AᵀP + PA = −Q test? | Stability of the linear system ẋ = Ax.
SUM: Energy-like functions prove stability.
SUM: No need to solve the equations.
SRC: Lyapunov AM, The general problem of the stability of motion, International Journal of Control 55(3), 531 (English translation of the 1892 thesis) | journal | 1992 | https://doi.org/10.1080/00207179208934253
SRC: Khalil HK, Nonlinear Systems (3rd edn, Prentice Hall 2002) | textbook | 2002 | https://www.pearson.com/
NUM1#maths-u25-13-q1@1: For ẋ = −3x and V = x^{2}, what is V̇ at x = 2? | -24 | 0 |  | V̇ = 2xẋ = 2 × 2 × (−6) = −24.
M1#maths-u25-13-q2@1: Which function is a valid Lyapunov candidate for proving stability at the origin? | V = x₁^{2} + x₂^{2} | V = x₁ + x₂ | V = −x₁^{2} | V = x₁x₂ | V = 1 | It's zero at the origin and positive elsewhere.
M2#maths-u25-13-q3@2: Why does Lyapunov's method succeed for ẋ = −x^{3} when linearisation fails? | The linearisation has a zero eigenvalue and is inconclusive, but V = x^{2} decreases along all trajectories | Linearisation shows the system is unstable, so Lyapunov is needed instead | Lyapunov's method only works for linear systems like this one | The system is actually unstable, and Lyapunov's method confirms it | Both fail; this system's stability can't be determined | Higher-order terms decide stability here, which V captures.

## Controllability
S: A system is controllable if inputs can steer it from any state to any other in finite time. Kalman's rank test checks this from the system matrices, and controllability is exactly what's needed to place closed-loop poles anywhere by state feedback.
O: Apply the Kalman controllability rank test
O: Explain the link between controllability, pole placement and stabilisability
T: Controllability matrix | 𝒞 = [B, AB, A^{2}B, …, A^{n−1}B]; the system is controllable iff rank 𝒞 = n
T: Stabilisable | A system whose uncontrollable modes are all stable, so it can still be stabilised by feedback
H: Tests
- Kalman rank condition: rank[B, AB, …, A^{n−1}B] = n.
- PBH test: rank[λI − A, B] = n for every eigenvalue λ.
- Controllability Gramian W = ∫ e^{At}BBᵀe^{Aᵀt} dt positive definite.
H: Meaning
- Every state direction can be influenced by the inputs.
- Controllable ⇔ arbitrary pole placement with u = −Kx.
- Uncontrollable modes keep their eigenvalues under any feedback.
- Gramian's small eigenvalues mean some directions need large inputs.
H: Examples
- Two identical tanks driven by one input in parallel can't be controlled independently.
- A double integrator ẍ = u is controllable.
- Model reduction (balanced truncation) uses Gramians.
X: Is ẋ = [[0, 1], [0, 0]]x + [0, 1]ᵀu controllable?
> B = [0, 1]ᵀ and AB = [1, 0]ᵀ
> 𝒞 = [[0, 1], [1, 0]] has determinant −1 ≠ 0
> Rank 2 = n, so it's controllable (the double integrator)
K: Controllability means inputs can reach any state; Kalman's rank test and PBH test check it; controllability allows arbitrary pole placement; stabilisability needs only unstable modes to be controllable.
!: Assuming a system with as many inputs as states is automatically controllable.
Q: What rank must the controllability matrix have? | n, the number of states.
Q: What does controllability allow in state feedback? | Arbitrary placement of closed-loop poles.
SUM: Can inputs reach every state?
SUM: Rank tests decide.
SRC: Kalman RE, On the general theory of control systems, Proceedings of the First IFAC Congress 1, 481 | journal | 1960 | https://doi.org/10.1016/S1474-6670(17)70094-8
SRC: Chen CT, Linear System Theory and Design (4th edn, Oxford University Press 2013) | textbook | 2013 | https://global.oup.com/
NUM1#maths-u25-14-q1@1: For A = [[1, 0], [0, 2]] and B = [1, 0]ᵀ, what is the rank of the controllability matrix? | 1 | 0 |  | B = [1, 0]ᵀ and AB = [1, 0]ᵀ are parallel, so the rank is 1: the second state can't be influenced.
M1#maths-u25-14-q2@1: What is the controllability matrix for a system with 3 states? | [B, AB, A^{2}B] | [B, A] | [A, A^{2}, A^{3}] | [C, CA, CA^{2}] | [B] | The controllability matrix stacks B, AB, …, A^{n−1}B; with n = 3 states that's [B, AB, A^{2}B].
M3#maths-u25-14-q3@2: Why can't state feedback move an uncontrollable mode's eigenvalue? | The input can't influence that mode, so feedback can't change it | Feedback always moves every eigenvalue of the system | Uncontrollable modes have no eigenvalues to move | The mode becomes unstable whenever feedback is applied | It can move it, given enough feedback gain | In controllable/uncontrollable decomposition, the uncontrollable block of A − BK equals that of A.

## Observability
S: A system is observable if its internal state can be worked out from its outputs and inputs over time. Observability is the dual of controllability, and it's what's needed to build observers and Kalman filters that estimate states you can't measure directly.
O: Apply the observability rank test
O: Explain duality with controllability and detectability
T: Observability matrix | 𝒪 = [C; CA; CA^{2}; …; CA^{n−1}]; the system is observable iff rank 𝒪 = n
T: Detectable | A system whose unobservable modes are all stable, so state estimates still converge
H: Tests
- Rank of 𝒪 equals n.
- PBH test: rank [λI − A; C] = n for every eigenvalue.
- Observability Gramian positive definite.
H: Duality
- (A, C) observable ⇔ (Aᵀ, Cᵀ) controllable.
- Observer design mirrors state-feedback design.
- Kalman's duality principle (1960).
H: Meaning and examples
- Measuring only position of a mass–spring system: observable (velocity inferred from changes).
- Measuring only the sum of two identical decoupled states: unobservable difference.
- Sensor placement to ensure observability.
- Observable systems allow observers with any chosen error dynamics.
X: For A = [[0, 1], [0, 0]] and C = [1, 0] (measuring position), is the system observable?
> C = [1, 0] and CA = [0, 1]
> 𝒪 = [[1, 0], [0, 1]] has rank 2
> Observable: velocity can be inferred from how position changes
K: Observability means states can be reconstructed from outputs; the rank test on [C; CA; …] checks it; it's dual to controllability; detectability requires only unstable modes to be observable.
!: Placing sensors without checking that every unstable mode is observable.
Q: What is the dual of observability? | Controllability.
Q: What does detectability require? | All unobservable modes are stable.
SUM: Can outputs reveal the state?
SUM: Duality mirrors controllability.
SRC: Kalman RE, On the general theory of control systems, Proceedings of the First IFAC Congress 1, 481 | journal | 1960 | https://doi.org/10.1016/S1474-6670(17)70094-8
SRC: Hespanha JP, Linear Systems Theory (2nd edn, Princeton University Press 2018) | textbook | 2018 | https://press.princeton.edu/
NUM1#maths-u25-15-q1@1: For A = [[0, 1], [0, 0]] and C = [0, 1] (measuring velocity only), what is the rank of the observability matrix? | 1 | 0 |  | C = [0, 1] and CA = [0, 0], so the rank is 1: position can't be determined from velocity alone.
M1#maths-u25-15-q2@1: Which pair is dual to (A, C) being observable? | (Aᵀ, Cᵀ) being controllable | (A, B) being controllable | (C, A) being stable | (A, D) being observable | No dual exists | Transposing turns the observability matrix into a controllability matrix.
M3#maths-u25-15-q3@2: Why can position be observed from position measurements alone, but not from velocity alone? | Position changes reveal velocity, but velocity can't fix position's offset | Velocity measurements contain no information at all | Position sensors measure velocity directly as well | Both quantities are equally observable from either sensor | Neither is observable from a single sensor | Integrating velocity gives position only up to an unknown starting value.

## Frequency Response
S: The frequency response describes how a stable linear system scales and shifts sinusoids of each frequency. It's measured easily in experiments, summarised in Bode and Nyquist plots, and used to judge bandwidth, resonance and stability margins.
O: Compute gain and phase from a transfer function at a given frequency
O: Interpret bandwidth, resonance and gain and phase margins
T: Frequency response | G(iω), whose magnitude |G(iω)| is the gain and whose argument is the phase shift at angular frequency ω
T: Phase margin | 180° plus the phase of the loop gain at the frequency where |L(iω)| = 1
H: Computing
- Substitute s = iω into G(s).
- For G(s) = 1/(τs + 1): |G| = 1/√(1 + ω^{2}τ^{2}), phase −arctan(ωτ).
- At ω = 1/τ: gain 1/√2 (−3 dB), phase −45°.
H: Features
- Bandwidth: frequency where gain drops 3 dB below its low-frequency value.
- Resonant peak for lightly damped second-order systems.
- Time delay e^{−sT} adds phase −ωT without changing gain.
H: Stability margins
- Gain margin: how much gain can rise before instability (at phase −180°).
- Phase margin: extra phase lag tolerable at gain crossover.
- Typical targets: gain margin > 6 dB, phase margin 30°–60°.
- Margins guard against model errors and delays.
X: Find the gain and phase of G(s) = 10/(s + 10) at ω = 10 rad/s.
> G(10i) = 10/(10 + 10i) = 1/(1 + i)
> |G| = 1/√2 ≈ 0.707 (−3 dB)
> Phase = −45°
K: Frequency response G(iω) gives gain and phase at each frequency; bandwidth and resonance describe performance; gain and phase margins measure robustness of feedback loops.
!: Ignoring the phase lag of time delays, which can destroy stability margins.
Q: What phase does a first-order lag have at its corner frequency? | −45°.
Q: What does phase margin measure? | How much extra phase lag the loop tolerates before instability.
SUM: Sinusoids reveal system behaviour.
SUM: Margins measure robustness.
SRC: Franklin GF, Powell JD, Emami-Naeini A, Feedback Control of Dynamic Systems (8th edn, Pearson 2019) | textbook | 2019 | https://www.pearson.com/
SRC: Skogestad S, Postlethwaite I, Multivariable Feedback Control: Analysis and Design (2nd edn, Wiley 2005) | textbook | 2005 | https://www.wiley.com/
NUM1#maths-u25-16-q1@1: A time delay of 0.1 s adds how many degrees of phase lag at ω = 5 rad/s, to 1 decimal place? | 28.6 | 0.1 | ° | Phase = −ωT = −0.5 rad ≈ −28.6°.
M1#maths-u25-16-q2@1: At which frequency does G(s) = 1/(2s + 1) have gain 1/√2? | 0.5 rad/s | 2 rad/s | 1 rad/s | 0.25 rad/s | 4 rad/s | A first-order lag 1/(τs + 1) has gain 1/√2 (−3 dB) at its corner frequency ω = 1/τ = 1/2 rad/s.
M2#maths-u25-16-q3@2: Why do engineers specify a minimum phase margin? | It provides a safety buffer against unmodelled delays and parameter changes that add phase lag | It maximises the loop gain at every frequency | It removes all overshoot from the step response | It's required only for open-loop control systems | It isn't specified; only gain margin matters | Low phase margin means small extra lag could cause instability.

## Bode Plots
S: Bode plots show a system's gain in decibels and its phase against frequency on a logarithmic scale. Straight-line approximations make them quick to sketch, and they show at a glance a loop's bandwidth, roll-off and stability margins.
O: Sketch asymptotic Bode plots for simple factors
O: Read gain and phase margins from Bode plots
T: Decibel gain | 20 log₁₀|G(iω)| dB
T: Corner frequency | The frequency (1/τ for a first-order factor) where asymptotic Bode lines change slope
H: Building blocks
- Constant K: flat at 20 log₁₀K dB, phase 0° (or −180° if negative).
- Integrator 1/s: −20 dB/decade, phase −90°.
- First-order pole 1/(τs + 1): flat then −20 dB/decade after 1/τ; phase 0° to −90°.
- Zero: +20 dB/decade; second-order pole: −40 dB/decade with a resonant peak if lightly damped.
H: Combining
- Multiplying transfer functions adds dB and phases.
- Sketch each factor and sum.
- Phase: −45° at a first-order corner.
H: Reading margins
- Gain crossover (0 dB): phase margin = 180° + phase there.
- Phase crossover (−180°): gain margin = −gain in dB there.
- Bode's gain–phase relation for minimum-phase systems.
- Loop shaping designs controllers by shaping these plots.
X: Sketch the gain of G(s) = 100/(s + 10) at ω = 1, 10 and 100 rad/s.
> Low frequency: G(0) = 10, i.e. 20 dB
> At ω = 10: about 20 − 3 = 17 dB
> At ω = 100: one decade past the corner, about 20 − 20 = 0 dB
K: Bode plots show dB gain and phase against log frequency; poles, zeros and integrators add straight-line slopes; margins are read at crossover frequencies; loop shaping uses them for design.
!: Forgetting that a negative gain adds −180° of phase.
Q: What slope does one pole add to a Bode magnitude plot? | −20 dB per decade.
Q: Where is phase margin read? | At the gain crossover frequency (0 dB).
SUM: Log scales make gain and phase additive.
SUM: Margins read off the plot.
SRC: Bode HW, Network Analysis and Feedback Amplifier Design (Van Nostrand 1945) | textbook | 1945 | https://archive.org/
SRC: Dorf RC, Bishop RH, Modern Control Systems (14th edn, Pearson 2021) | textbook | 2021 | https://www.pearson.com/
NUM1#maths-u25-17-q1@1: A gain of 1000 is how many decibels? | 60 | 0 | dB | 20 log₁₀ 1000 = 20 × 3 = 60 dB.
M1#maths-u25-17-q2@1: What is the high-frequency slope of G(s) = 1/(s(s + 1)) on a Bode magnitude plot? | −40 dB/decade | −20 dB/decade | 0 dB/decade | +20 dB/decade | −60 dB/decade | Two poles (one integrator and one first-order) give −40 dB/decade.
M2#maths-u25-17-q3@2: At phase crossover the loop gain is −8 dB. What is the gain margin? | 8 dB | −8 dB | 0 dB | 16 dB | 180 dB | Gain could rise by 8 dB before the loop reaches 0 dB at −180°.

## Nyquist Stability Criterion
S: The Nyquist criterion decides closed-loop stability from the open-loop frequency response by counting how the Nyquist plot encircles the point −1. It handles delays and unstable open-loop systems and gives a geometric picture of robustness.
O: Apply the Nyquist criterion Z = N + P
O: Interpret distance to −1 as a robustness measure
T: Nyquist plot | The curve of L(iω) in the complex plane as ω runs from −∞ to ∞
T: Nyquist criterion | Z = N + P: closed-loop RHP poles Z equal clockwise encirclements N of −1 plus open-loop RHP poles P
H: The criterion
- Based on Cauchy's argument principle.
- For stable open loops (P = 0): stable iff the plot doesn't encircle −1.
- For open-loop unstable systems, need N = −P (anticlockwise encirclements).
- Indentations around poles on the imaginary axis.
H: Robustness
- Gain margin: how far the crossing of the negative real axis is from −1.
- Phase margin: angle at the unit circle crossing.
- Distance from −1 equals 1/|S|: the stability margin.
- Delays rotate the plot, possibly into encirclement.
H: Strengths
- Works with measured frequency responses.
- Handles time delays exactly.
- Extends to multivariable systems (generalised Nyquist).
- Nyquist (1932).
X: L(s) = K/(s + 1)^{3}. For which K is the closed loop stable?
> Phase −180° when 3 arctan ω = 180°, so ω = √3
> |L| there = K/(1 + 3)^{3/2} = K/8
> Stable (no encirclement of −1) if K/8 < 1, so K < 8
K: The Nyquist criterion counts encirclements of −1 to determine closed-loop stability; Z = N + P; distance from −1 measures robustness; it handles delays and unstable plants.
!: Forgetting to count open-loop unstable poles P when applying the criterion.
Q: What point do Nyquist plots encircle to indicate instability? | −1.
Q: What theorem underlies the Nyquist criterion? | Cauchy's argument principle.
SUM: Count encirclements of −1.
SUM: Distance to −1 measures robustness.
SRC: Nyquist H, Regeneration theory, Bell System Technical Journal 11(1), 126 | journal | 1932 | https://doi.org/10.1002/j.1538-7305.1932.tb02344.x
SRC: Åström KJ, Murray RM, Feedback Systems: An Introduction for Scientists and Engineers (2nd edn, Princeton University Press 2021) | textbook | 2021 | https://fbswiki.org/
NUM1#maths-u25-18-q1@1: For L(s) = K/(s + 1)^{3}, what is the gain margin (as a factor) when K = 2? | 4 | 0 |  | The critical gain is 8, so the margin is 8/2 = 4 (about 12 dB).
M1#maths-u25-18-q2@1: A stable open-loop system's Nyquist plot encircles −1 once clockwise. How many closed-loop RHP poles are there? | 1 | 0 | 2 | −1 | It can't be determined | By the Nyquist criterion Z = N + P, with N = 1 clockwise encirclement and P = 0 open-loop RHP poles, so Z = 1.
M3#maths-u25-18-q3@2: Why does a time delay threaten stability in Nyquist terms? | It rotates each point clockwise by ωT, which can swing the plot round −1 | It shrinks the Nyquist plot to the origin | It removes all encirclements of −1 | It moves the critical point away from −1 | It has no effect on the Nyquist plot | e^{−iωT} adds phase lag growing with frequency.

## Root Locus
S: The root locus shows how the closed-loop poles move in the complex plane as a gain varies from zero to infinity. Evans's sketching rules let engineers see at once which gains give fast, well-damped or unstable responses.
O: Sketch root loci using Evans's rules
O: Choose gains to meet damping and speed specifications
T: Root locus | The set of closed-loop pole locations of 1 + KL(s) = 0 as K varies from 0 to ∞
T: Angle condition | A point s is on the locus iff ∠L(s) = ±180°(2k + 1)
H: Rules (Evans 1948)
- Starts at open-loop poles (K = 0), ends at zeros or infinity.
- On the real axis to the left of an odd number of poles and zeros.
- Asymptotes at angles (2k + 1)180°/(n − m) centred at (Σ poles − Σ zeros)/(n − m).
- Break-away points where dK/ds = 0.
H: Design
- Damping ratio ζ = cos θ for poles at angle θ from the negative real axis.
- Choose K where the locus crosses the desired ζ line.
- Imaginary-axis crossings give the gain limit for stability.
- Add zeros (lead) to pull the locus left; poles (lag) to improve steady state.
H: Uses
- Insight into how gain trades speed and stability.
- Lead–lag compensator design.
- Discrete-time loci in the z-plane.
X: For L(s) = 1/(s(s + 2)), find the closed-loop poles as K varies and the K giving critical damping.
> Characteristic equation s^{2} + 2s + K = 0
> Poles s = −1 ± √(1 − K): real for K ≤ 1, complex for K > 1
> Critical damping (double pole at −1) at K = 1
K: Root loci trace closed-loop poles as gain varies; Evans's rules sketch them; damping-ratio lines guide gain choice; zeros and poles from compensators reshape the locus.
!: Choosing a gain beyond the imaginary-axis crossing, which makes the closed loop unstable.
Q: Where does a root locus start? | At the open-loop poles.
Q: What damping ratio corresponds to poles at 45° from the negative real axis? | About 0.707.
SUM: Watch poles move with gain.
SUM: Pick gains for damping and speed.
SRC: Evans WR, Graphical analysis of control systems, Transactions of the AIEE 67(1), 547 | journal | 1948 | https://doi.org/10.1109/T-AIEE.1948.5059708
SRC: Ogata K, Modern Control Engineering (5th edn, Pearson 2010) | textbook | 2010 | https://www.pearson.com/
NUM1#maths-u25-19-q1@1: For L(s) = 1/(s(s + 4)), at what gain K are the closed-loop poles a repeated real pair? | 4 | 0 |  | s^{2} + 4s + K = 0 has a double root when 16 − 4K = 0, so K = 4.
M1#maths-u25-19-q2@1: Three open-loop poles and no zeros: at what angles do the root locus asymptotes lie? | ±60° and 180° | ±90° only | 0° and 180° | ±45° and ±135° | ±30° and 90° | Angles (2k + 1)180°/3 give 60°, 180° and 300°.
M2#maths-u25-19-q3@2: Why does adding a zero in the left half-plane (lead compensation) often improve stability? | It pulls the root locus branches to the left, away from the imaginary axis | It adds a pole at the origin to the loop | It increases the phase lag of the loop | It removes all the open-loop poles | It doesn't change the root locus at all | Zeros attract locus branches and add phase lead.

## State Estimation
S: State estimation reconstructs a system's internal state from noisy, incomplete measurements. Observers such as the Luenberger observer and probabilistic filters like the Kalman filter let controllers act on states they can't measure directly.
O: Design a Luenberger observer and analyse its error dynamics
O: Explain the separation principle
T: Luenberger observer | x̂̇ = Ax̂ + Bu + L(y − Cx̂), a model copy corrected by the output error
T: Separation principle | For linear systems, state-feedback and observer gains can be designed independently, and the closed-loop poles are the union of both sets
H: Observers
- Error e = x − x̂ obeys ė = (A − LC)e.
- Choose L so A − LC has fast stable eigenvalues (needs observability).
- Faster observers amplify noise; balance speed and noise.
H: Output feedback
- Use u = −Kx̂ instead of −Kx.
- Separation principle: poles of A − BK and A − LC together.
- Observer poles usually 2–5 times faster than controller poles.
- Robustness isn't guaranteed (Doyle 1978).
H: Probabilistic estimation
- Kalman filter: optimal L for Gaussian noise (next lesson).
- Extended and unscented Kalman filters, particle filters.
- Moving-horizon estimation solves an optimisation each step.
X: For scalar ẋ = −x + u, y = x, choose observer gain L to make the estimation error decay with rate 5.
> Error dynamics ė = (A − LC)e = (−1 − L)e
> Set −1 − L = −5
> L = 4
K: Observers copy the model and correct with output errors; error dynamics A − LC are set by L; the separation principle lets controller and observer be designed separately; Kalman filters choose L optimally.
!: Making observer poles extremely fast, which amplifies measurement noise.
Q: What equation governs a Luenberger observer's error? | ė = (A − LC)e.
Q: What does the separation principle allow? | Designing controller and observer gains independently.
SUM: Estimate what you can't measure.
SUM: Design controller and observer separately.
SRC: Luenberger DG, Observing the state of a linear system, IEEE Transactions on Military Electronics 8(2), 74 | journal | 1964 | https://doi.org/10.1109/TME.1964.4323124
SRC: Doyle JC, Guaranteed margins for LQG regulators, IEEE Transactions on Automatic Control 23(4), 756 | journal | 1978 | https://doi.org/10.1109/TAC.1978.1101812
NUM1#maths-u25-20-q1@1: For ẋ = 2x + u, y = x, what observer gain L gives error dynamics with eigenvalue −8? | 10 | 0 |  | 2 − L = −8 gives L = 10.
M1#maths-u25-20-q2@1: Which condition must hold to place observer poles arbitrarily? | The system must be observable | The system must be stable | The input must be zero | C must be the identity | No condition | Observability of (A, C) is dual to controllability for pole placement.
M2#maths-u25-20-q3@2: Why are observer poles usually chosen faster than controller poles? | So state estimates converge before the controller relies heavily on them | Slower observers are always better at rejecting noise | Observer speed has no effect on closed-loop behaviour | Fast observer poles reduce noise sensitivity | They're chosen slower than the controller poles | Estimation error should die out quickly relative to the closed-loop dynamics.

## Kalman Filtering
S: In control, the Kalman filter is the optimal state observer for linear systems with Gaussian process and measurement noise. Combined with LQR it gives LQG control, and its steady-state gain comes from a Riccati equation dual to the LQR one.
O: Write the Kalman filter in state-space form with covariances
O: Explain the steady-state Kalman gain and LQG control
T: Process noise covariance | Q_{w}, the covariance of random disturbances w in x_{k+1} = Ax_{k} + Bu_{k} + w_{k}
T: LQG control | Linear–quadratic–Gaussian control: an LQR controller acting on Kalman filter state estimates
H: Matrix equations
- Predict: x̂⁻ = Ax̂ + Bu; P⁻ = APAᵀ + Q_{w}.
- Gain: K = P⁻Cᵀ(CP⁻Cᵀ + R)^{−1}.
- Update: x̂ = x̂⁻ + K(y − Cx̂⁻); P = (I − KC)P⁻.
- Innovations are white if the model is right.
H: Steady state
- P converges to the solution of a discrete algebraic Riccati equation.
- Steady-state gain gives a fixed observer (like a tuned Luenberger observer).
- Duality with LQR: swap A ↔ Aᵀ, B ↔ Cᵀ.
H: In control practice
- LQG: separation principle holds; robustness margins aren't guaranteed.
- Tuning Q_{w} and R trades responsiveness against noise.
- Sensor fusion: GPS plus inertial measurements.
- Extended Kalman filters for non-linear systems.
X: A scalar system x_{k+1} = x_{k} + w with Q_{w} = 1 is measured with R = 1. Find the steady-state predicted variance P⁻ and gain.
> At steady state P⁻ = P + 1 and P = P⁻R/(P⁻ + R) = P⁻/(P⁻ + 1)
> So P⁻ = P⁻/(P⁻ + 1) + 1, giving P⁻^{2} − P⁻ − 1 = 0, so P⁻ = (1 + √5)/2 ≈ 1.618
> Gain K = 1.618/2.618 ≈ 0.618
K: The Kalman filter is the optimal linear estimator under Gaussian noise; its matrix form uses process and measurement covariances; steady-state gains solve a Riccati equation; LQG combines it with LQR.
!: Assuming LQG controllers inherit LQR's robustness margins (they don't).
Q: What does LQG combine? | An LQR controller with a Kalman filter.
Q: What equation gives the steady-state Kalman gain? | An algebraic Riccati equation.
SUM: Optimal estimation under Gaussian noise.
SUM: Dual to LQR.
SRC: Kalman RE, Bucy RS, New results in linear filtering and prediction theory, Journal of Basic Engineering 83(1), 95 | journal | 1961 | https://doi.org/10.1115/1.3658902
SRC: Anderson BDO, Moore JB, Optimal Filtering (Prentice Hall 1979; Dover 2005) | textbook | 2005 | https://store.doverpublications.com/
NUM1#maths-u25-21-q1@1: In the scalar example, what is the steady-state updated variance P = P⁻/(P⁻ + 1), to 3 decimal places? | 0.618 | 0.001 |  | P = 1.618/2.618 ≈ 0.618 (the golden ratio conjugate).
M1#maths-u25-21-q2@1: What happens to the Kalman gain when process noise Q_{w} increases? | It increases, trusting measurements more | It decreases, trusting the model more | It stays exactly the same | It becomes zero immediately | It becomes negative | Larger model uncertainty raises P⁻ and hence K.
M3#maths-u25-21-q3@2: Why doesn't LQG automatically have good robustness margins? | Adding an observer changes the loop; Doyle showed margins can be tiny | LQG controllers are always unstable in practice | Kalman filters remove all stability margins by design | LQR itself has no robustness margins to inherit | It does automatically; LQG keeps all of LQR's margins | Separation gives stability, but not the guaranteed margins of full-state LQR.

## System Identification
S: System identification builds mathematical models of dynamical systems from measured input–output data. It turns experiments into transfer functions or state-space models for control design, balancing fit against complexity and testing on fresh data.
O: Fit ARX models by least squares and design identification experiments
O: Validate models and describe subspace and frequency-domain methods
T: ARX model | y_{t} = −a₁y_{t−1} − … + b₁u_{t−1} + … + e_{t}, linear in parameters and fitted by least squares
T: Persistent excitation | An input rich enough in frequencies to reveal all the system's dynamics
H: Methods
- Step and impulse response tests.
- Prediction-error methods (ARX, ARMAX, Box–Jenkins, output-error).
- Subspace identification (N4SID) for state-space models.
- Frequency-response identification with swept sines or random inputs.
H: Experiment design
- Persistently exciting inputs: PRBS, multisines.
- Sampling rate about 10 times the bandwidth.
- Closed-loop identification needs care with feedback correlation.
H: Validation
- Fit on one dataset, validate on another.
- Residual whiteness and cross-correlation tests.
- Information criteria (AIC) for model order.
- Ljung's System Identification Toolbox and textbook.
X: Data satisfy y_{t} = 0.8y_{t−1} + 2u_{t−1}. What are the ARX parameters and the system's DC gain?
> a₁ = −0.8 and b₁ = 2 in the convention y_{t} + a₁y_{t−1} = b₁u_{t−1}
> At steady state y = 0.8y + 2u
> DC gain y/u = 2/0.2 = 10
K: System identification fits models to data; ARX uses least squares; subspace and frequency methods give state-space and frequency models; inputs must excite the dynamics; validate on new data.
!: Using a single step test with a noisy plant and expecting accurate high-frequency dynamics.
Q: What is persistent excitation? | An input rich enough to reveal all the system's dynamics.
Q: Why validate a model on separate data? | To check it predicts beyond the data it was fitted to.
SUM: Learn models from data.
SUM: Excite, fit, validate.
SRC: Ljung L, System Identification: Theory for the User (2nd edn, Prentice Hall 1999) | textbook | 1999 | https://www.pearson.com/
SRC: Van Overschee P, De Moor B, N4SID: subspace algorithms for the identification of combined deterministic-stochastic systems, Automatica 30(1), 75 | journal | 1994 | https://doi.org/10.1016/0005-1098(94)90230-5
NUM1#maths-u25-22-q1@1: An ARX model is y_{t} = 0.5y_{t−1} + 3u_{t−1}. What is its DC gain? | 6 | 0 |  | y(1 − 0.5) = 3u gives y/u = 6.
M1#maths-u25-22-q2@1: Which input is commonly used to identify system dynamics because it excites many frequencies? | A pseudo-random binary sequence (PRBS) | A constant zero input | A single slow sinusoid | A one-off step with no repetition | No input at all | A PRBS switches between two levels pseudo-randomly, giving a broad, flat spectrum that excites the system across many frequencies.
M2#maths-u25-22-q3@2: Why is identification in closed loop harder than in open loop? | Feedback makes the input correlated with the noise, which can bias standard estimators | Closed loops produce no useful data for identification | Controllers remove all the dynamics from the data | Open-loop data are always too noisy to use | It isn't harder; closed-loop data are always better | The controller feeds disturbances back into u, violating estimator assumptions.

## Linear Quadratic Regulation
S: The linear quadratic regulator chooses state feedback that minimises a weighted sum of state deviations and control effort. It gives an optimal, easy-to-tune controller with guaranteed robustness margins, computed from an algebraic Riccati equation.
O: Formulate the LQR cost and solve for the optimal gain
O: Interpret the weights Q and R and LQR robustness properties
T: LQR cost | J = ∫₀^{∞} (xᵀQx + uᵀRu) dt, with Q ≥ 0 penalising states and R > 0 penalising control
T: Algebraic Riccati equation | AᵀP + PA − PBR^{−1}BᵀP + Q = 0, whose solution gives the optimal gain K = R^{−1}BᵀP
H: Solution
- Optimal control u = −Kx with K = R^{−1}BᵀP.
- Requires (A, B) stabilisable and (A, Q^{1/2}) detectable.
- Closed loop A − BK is stable.
H: Tuning
- Larger Q: faster state regulation, more control effort.
- Larger R: gentler control, slower response.
- Bryson's rule: Qᵢᵢ = 1/(max xᵢ)^{2}, Rⱼⱼ = 1/(max uⱼ)^{2}.
- Trade-off visible in pole locations (symmetric root locus).
H: Robustness and extensions
- Single-input LQR: gain margin infinite upward, at least ½ downward; phase margin ≥ 60°.
- Finite-horizon and discrete-time versions.
- LQG adds a Kalman filter.
- Integral action via augmented states.
X: For ẋ = u with Q = 9 and R = 1, find the LQR gain.
> Riccati: −P^{2} + 9 = 0 (A = 0, B = 1), so P = 3
> K = R^{−1}BP = 3
> Closed loop ẋ = −3x
K: LQR minimises quadratic state and control costs; the Riccati equation gives K = R^{−1}BᵀP; Q and R tune speed versus effort; single-input LQR has at least 60° phase margin.
!: Choosing Q and R without scaling for units, giving unbalanced performance.
Q: What does increasing R do in LQR? | Penalises control effort more, giving gentler control.
Q: What phase margin does single-input LQR guarantee? | At least 60°.
SUM: Optimal quadratic regulation.
SUM: Riccati gives the gain.
SRC: Kalman RE, Contributions to the theory of optimal control, Boletín de la Sociedad Matemática Mexicana 5, 102 | journal | 1960 | https://www.semanticscholar.org/
SRC: Anderson BDO, Moore JB, Optimal Control: Linear Quadratic Methods (Prentice Hall 1990; Dover 2007) | textbook | 2007 | https://store.doverpublications.com/
NUM1#maths-u25-23-q1@1: For ẋ = u with Q = 16 and R = 4, what is the LQR gain K? | 2 | 0 |  | Riccati −P^{2}/4 + 16 = 0 gives P = 8, so K = P/R = 2.
M1#maths-u25-23-q2@1: Using Bryson's rule, a state with maximum allowed deviation 0.5 gets which weight? | 4 | 0.5 | 2 | 0.25 | 1 | Bryson's rule sets Qᵢᵢ = 1/(max xᵢ)^{2}, so a maximum deviation of 0.5 gives weight 1/0.25 = 4.
M2#maths-u25-23-q3@2: Why does LQR guarantee good robustness margins for single-input systems? | Its loop satisfies |1 + L(iω)| ≥ 1, keeping the Nyquist plot away from −1 | It removes all model errors from the plant | It has infinite phase margin for every system | It uses no feedback, so margins don't apply | It doesn't guarantee any margins at all | Kalman's inequality gives at least 60° phase margin and infinite gain margin upward.

## Model Predictive Control
S: Model predictive control repeatedly solves an optimisation over a future horizon using a model, applies the first input, then re-plans with new measurements. It handles constraints explicitly and is the leading advanced control method in process industries and autonomous vehicles.
O: Describe the receding-horizon MPC algorithm
O: Explain constraint handling, stability and computation in MPC
T: Receding horizon | Optimising inputs over N future steps, applying only the first, and repeating at the next step
T: Terminal constraint | A condition on the final predicted state (such as a terminal set or cost) used to guarantee stability
H: The algorithm
- Measure or estimate the current state.
- Solve min Σ (x_{k}ᵀQx_{k} + u_{k}ᵀRu_{k}) subject to dynamics and constraints for k = 0 … N − 1.
- Apply u₀; shift the horizon; repeat.
H: Strengths
- Handles input and state limits directly.
- Multivariable and anticipates known future references.
- Linear MPC is a quadratic program each step.
- Unconstrained linear MPC with long horizon approaches LQR.
H: Theory and practice
- Stability via terminal costs and constraints.
- Explicit MPC precomputes piecewise-affine laws.
- Fast QP solvers for embedded use (cars, drones).
- Robust and stochastic MPC handle uncertainty.
X: An MPC with a 10-step horizon runs at 10 Hz. How far ahead does it look, and how many inputs does it apply per optimisation?
> Horizon 10 steps × 0.1 s = 1 s ahead
> It computes 10 future inputs
> It applies only the first, then re-solves 0.1 s later with new measurements
K: MPC optimises over a receding horizon and applies the first input; constraints are handled explicitly; terminal ingredients ensure stability; QP solvers make it fast enough for many applications.
!: Using a horizon too short to see the effect of constraints, which can lead to instability.
Q: How many of the planned inputs does MPC apply before re-planning? | Only the first.
Q: What optimisation does linear MPC solve each step? | A quadratic program.
SUM: Plan ahead, act, re-plan.
SUM: Constraints are built in.
SRC: Rawlings JB, Mayne DQ, Diehl M, Model Predictive Control: Theory, Computation, and Design (2nd edn, Nob Hill 2017) | textbook | 2017 | https://sites.engineering.ucsb.edu/~jbraw/mpc/
SRC: Qin SJ, Badgwell TA, A survey of industrial model predictive control technology, Control Engineering Practice 11(7), 733 | journal | 2003 | https://doi.org/10.1016/S0967-0661(02)00186-7
NUM1#maths-u25-24-q1@1: An MPC runs every 50 ms with a 2-second prediction horizon. How many steps is the horizon? | 40 | 0 | steps | 2/0.05 = 40 steps.
M1#maths-u25-24-q2@1: What advantage does MPC have over LQR? | It handles input and state constraints explicitly | It needs no model of the plant | It never needs to solve an optimisation | It works only for systems with one state | It ignores the future behaviour of the plant | Constraints enter the optimisation directly rather than being violated or clipped.
M3#maths-u25-24-q3@2: Why does MPC re-solve its optimisation at every step instead of applying the whole plan? | New measurements correct for disturbances and model errors, giving feedback | The plan is always wrong at the first step | Solvers can only output one input at a time | It saves computation compared with one long plan | It doesn't re-solve; it applies the whole plan | Receding-horizon re-planning turns open-loop optimisation into closed-loop control.

## Robust Control
S: Robust control designs controllers that keep stability and performance despite uncertainty in the plant model. H∞ methods minimise worst-case gains, structured singular value (μ) analysis handles structured uncertainty, and the small-gain theorem underlies them.
O: State the small-gain theorem and robust stability conditions
O: Describe H∞ control and mixed-sensitivity design
T: H∞ norm | ‖G‖_{∞} = sup_{ω} σ_{max}(G(iω)), the largest gain over all frequencies and input directions
T: Small-gain theorem | A feedback loop of stable systems with ‖G₁‖‖G₂‖ < 1 is stable
H: Uncertainty
- Unstructured: multiplicative G = G₀(1 + WΔ) with ‖Δ‖ ≤ 1.
- Parametric: uncertain coefficients.
- Robust stability for multiplicative uncertainty: ‖WT‖_{∞} < 1.
H: H∞ design
- Minimise ‖[W₁S; W₂KS; W₃T]‖_{∞} (mixed sensitivity).
- Solved by two Riccati equations (Doyle, Glover, Khargonekar, Francis 1989).
- Weights encode performance and uncertainty by frequency.
- μ-synthesis for structured uncertainty.
H: Uses
- Aerospace flight control.
- Hard disk drives and precision positioning.
- Process control with model uncertainty.
- Trade-off: robustness costs nominal performance.
X: A plant has multiplicative uncertainty up to 50% at all frequencies (W = 0.5). What bound must T satisfy for robust stability?
> Condition ‖WT‖_{∞} < 1
> 0.5|T(iω)| < 1 at every frequency
> |T(iω)| < 2 for all ω
K: Robust control guarantees stability under model uncertainty; the small-gain theorem gives conditions; H∞ design minimises weighted worst-case gains; μ handles structured uncertainty.
!: Designing for the nominal model only and assuming the real plant matches it.
Q: What does the H∞ norm measure? | The largest gain of a system over all frequencies.
Q: What is the robust stability condition for multiplicative uncertainty W? | ‖WT‖_{∞} < 1.
SUM: Design for the worst case.
SUM: Small gains guarantee stability.
SRC: Zhou K, Doyle JC, Glover K, Robust and Optimal Control (Prentice Hall 1996) | textbook | 1996 | https://www.pearson.com/
SRC: Doyle JC, Glover K, Khargonekar PP, Francis BA, State-space solutions to standard H2 and H∞ control problems, IEEE Transactions on Automatic Control 34(8), 831 | journal | 1989 | https://doi.org/10.1109/9.29425
NUM1#maths-u25-25-q1@1: Two stable systems with H∞ norms 0.8 and 1.1 are connected in feedback. What is the product of norms? | 0.88 | 0.001 |  | 0.8 × 1.1 = 0.88 < 1, so the small-gain theorem guarantees stability.
M1#maths-u25-25-q2@1: What does the small-gain theorem require for loop stability? | The product of the subsystems' H∞ norms is below 1 | Each subsystem's gain is above 1 | The two gains are exactly equal | The loop contains no feedback | Nothing about the gains at all | If the loop gain is less than 1 everywhere, signals can't grow around the loop.
M2#maths-u25-25-q3@2: Why does robust control usually cost some nominal performance? | Guarding against worst-case uncertainty forces more conservative, lower-bandwidth designs | Robustness always improves nominal performance as well | Nominal performance doesn't matter in robust design | Robust controllers remove feedback from the loop | It doesn't cost anything compared with nominal design | Keeping |T| small where uncertainty is large limits how aggressive the controller can be.

## Adaptive Control
S: Adaptive controllers adjust their own parameters online as they learn about an uncertain or changing plant. Model reference adaptive control and self-tuning regulators let aircraft, ships and industrial processes keep good performance as conditions change.
O: Describe model reference adaptive control and self-tuning regulators
O: Explain the MIT rule, Lyapunov-based adaptation and robustness issues
T: Model reference adaptive control | MRAC: adjusting controller parameters so the plant's output tracks a reference model's output
T: Certainty equivalence | Designing the controller as if current parameter estimates were exact, updating them as data arrive
H: Approaches
- MRAC: adapt gains to drive tracking error to zero.
- Self-tuning regulators: estimate the plant online (recursive least squares), then redesign.
- Gain scheduling: pre-designed gains switched with operating conditions (not truly adaptive).
H: Adaptation laws
- MIT rule: θ̇ = −γ e ∂e/∂θ (gradient of squared error); can go unstable.
- Lyapunov-based laws guarantee boundedness and convergence of tracking error.
- Parameter convergence needs persistent excitation.
H: Practice and caution
- The X-15 crash (1967) involved adaptive control problems.
- Robustness modifications: σ-modification, projection, dead zones.
- L1 adaptive control decouples adaptation from robustness.
- Learning-based control extends these ideas.
X: With the MIT rule θ̇ = −γeφ, γ = 0.5, error e = 2 and sensitivity φ = 1, how fast does θ change?
> θ̇ = −0.5 × 2 × 1
> = −1 per second
> The parameter moves to reduce the squared error
K: Adaptive control updates parameters online; MRAC tracks a reference model; self-tuning regulators estimate then design; Lyapunov-based laws ensure stability; robustness modifications are needed in practice.
!: Using the MIT rule with a large adaptation gain, which can destabilise the loop.
Q: What does MRAC make the plant follow? | A reference model's output.
Q: What does parameter convergence in adaptive control require? | Persistently exciting signals.
SUM: Controllers that learn as they go.
SUM: Stability needs careful adaptation laws.
SRC: Åström KJ, Wittenmark B, Adaptive Control (2nd edn, Addison-Wesley 1995; Dover 2008) | textbook | 2008 | https://store.doverpublications.com/
SRC: Ioannou PA, Sun J, Robust Adaptive Control (Prentice Hall 1996; Dover 2012) | textbook | 2012 | https://store.doverpublications.com/
NUM1#maths-u25-26-q1@1: Using θ̇ = −γeφ with γ = 0.2, e = −5 and φ = 3, what is θ̇? | 3 | 0 |  | −0.2 × (−5) × 3 = 3.
M1#maths-u25-26-q2@1: Which method estimates plant parameters online and redesigns the controller from them? | A self-tuning regulator | A fixed PID controller | Open-loop control | A static gain | A lookup table | It combines recursive estimation with certainty-equivalence design.
M3#maths-u25-26-q3@2: Why can adaptive controllers lose robustness to unmodelled dynamics and disturbances? | Adaptation can drift parameters in response to disturbances, driving gains to destabilising values | Adaptation always improves robustness to every kind of disturbance | Disturbances never affect the parameter estimates in adaptive control | Adaptive controllers have fixed gains, so they can't drift at all | It can't happen if the adaptation law is gradient-based | Rohrs et al. (1985) showed instability from small unmodelled dynamics without robust modifications.

## Stochastic Control
S: Stochastic control chooses actions for systems driven by random disturbances, optimising expected performance. It covers linear–quadratic–Gaussian problems, Markov decision processes and the Hamilton–Jacobi–Bellman equation for diffusions, with applications from finance to robotics.
O: Formulate stochastic optimal control problems with expected costs
O: Use certainty equivalence and the HJB equation for diffusions
T: Stochastic differential equation | dx = f(x, u)dt + σ(x, u)dW, a system driven by Brownian motion W
T: Stochastic HJB equation | V_{t} + min_{u}[ℓ + f·∇V + ½ tr(σσᵀ∇^{2}V)] = 0, characterising the optimal expected cost
H: Linear–quadratic–Gaussian
- Minimise E[∫ (xᵀQx + uᵀRu) dt] with Gaussian noise.
- Certainty equivalence: optimal control is the LQR gain on the Kalman estimate.
- Noise raises the cost but not the optimal gain.
H: General problems
- Dynamic programming over expected costs.
- Discrete time: Markov decision processes (School 18).
- Continuous time: stochastic HJB with a diffusion (second-order) term.
- Partial observation: decisions based on beliefs (POMDPs).
H: Applications
- Merton's portfolio problem: optimal investment and consumption.
- Inventory and production with random demand.
- Robotics under uncertainty.
- Risk-sensitive and chance-constrained control.
X: In scalar LQG, noise variance doubles. How does the optimal feedback gain change?
> By certainty equivalence the LQR gain depends only on A, B, Q and R
> It doesn't depend on the noise
> The gain stays the same, though the expected cost rises
K: Stochastic control optimises expected costs under random disturbances; LQG has certainty equivalence; HJB with a diffusion term covers continuous problems; partial observation leads to belief-state control.
!: Assuming certainty equivalence holds for non-linear or non-Gaussian problems.
Q: What is certainty equivalence in LQG? | Using the deterministic optimal gain on the state estimate.
Q: What extra term appears in the stochastic HJB equation? | The second-order diffusion term ½ tr(σσᵀ∇^{2}V).
SUM: Optimise expected performance under noise.
SUM: Certainty equivalence in LQG.
SRC: Fleming WH, Soner HM, Controlled Markov Processes and Viscosity Solutions (2nd edn, Springer 2006) | textbook | 2006 | https://link.springer.com/
SRC: Merton RC, Optimum consumption and portfolio rules in a continuous-time model, Journal of Economic Theory 3(4), 373 | journal | 1971 | https://doi.org/10.1016/0022-0531(71)90038-X
NUM1#maths-u25-27-q1@1: For dx = σdW with σ = 0.5, what is the variance of x after 4 time units, starting at 0? | 1 | 0 |  | Var = σ^{2}t = 0.25 × 4 = 1.
M1#maths-u25-27-q2@1: In LQG control, what determines the optimal feedback gain? | The system matrices and the cost weights Q and R, not the noise level | The noise level only, not the cost weights | The initial state of the system | The colour and type of the sensor | Random chance during operation | Certainty equivalence separates the gain from the noise statistics.
M2#maths-u25-27-q3@2: Why does partial observation make stochastic control harder? | Decisions must use the belief (a distribution over states), a far larger object | Observations are always perfect in stochastic control | It makes the problem fully deterministic | Beliefs are never needed when observations are partial | It doesn't make the problem any harder to solve | POMDP belief spaces grow quickly, making exact solutions intractable.

## Nonlinear Control
S: Nonlinear control designs controllers that work across large operating ranges where linear approximations fail. Feedback linearisation, backstepping, sliding-mode control and control Lyapunov functions are its main tools, used in robotics, aerospace and power electronics.
O: Apply feedback linearisation and Lyapunov-based design
O: Describe backstepping and sliding-mode control
T: Feedback linearisation | Choosing u to cancel non-linearities so that the closed loop becomes linear, then applying linear control
T: Sliding-mode control | Driving the state onto a chosen surface s(x) = 0 and keeping it there with switching control, giving robustness to matched uncertainty
H: Methods
- Feedback linearisation: for ẋ = f(x) + g(x)u, set u = (v − f(x))/g(x).
- Backstepping: build controllers recursively for strict-feedback systems.
- Sliding mode: robust but causes chattering; boundary layers smooth it.
- Control Lyapunov functions and Sontag's formula.
H: Robot manipulators
- Computed torque: τ = M(q)(q̈_{d} + K_{d}ė + K_{p}e) + C(q, q̇)q̇ + g(q).
- Passivity-based control uses energy.
- Exact cancellation needs an accurate model.
H: Cautions
- Cancelling non-linearities can be fragile to model errors.
- Actuator limits remain.
- Zero dynamics may be unstable.
- Gain scheduling and LPV methods as practical alternatives.
X: For ẋ = x^{2} + u, design u so the closed loop is ẋ = −2x.
> Choose u = −x^{2} + v to cancel the non-linearity
> Then ẋ = v; choose v = −2x
> u = −x^{2} − 2x gives ẋ = −2x, globally stable
K: Nonlinear control uses feedback linearisation, backstepping, sliding modes and Lyapunov design; cancellation needs accurate models; sliding modes are robust but chatter; zero dynamics must be stable.
!: Relying on exact cancellation of non-linear terms that are poorly known.
Q: What does feedback linearisation do? | Cancels non-linearities with feedback so the closed loop is linear.
Q: What is chattering in sliding-mode control? | Rapid switching of the control around the sliding surface.
SUM: Control beyond linear approximations.
SUM: Lyapunov and cancellation are key tools.
SRC: Khalil HK, Nonlinear Systems (3rd edn, Prentice Hall 2002) | textbook | 2002 | https://www.pearson.com/
SRC: Slotine JJE, Li W, Applied Nonlinear Control (Prentice Hall 1991) | textbook | 1991 | https://www.pearson.com/
NUM1#maths-u25-28-q1@1: For ẋ = x^{3} + u with u = −x^{3} − 5x, what is ẋ when x = 2? | -10 | 0 |  | ẋ = x^{3} − x^{3} − 5x = −5 × 2 = −10.
M1#maths-u25-28-q2@1: Which method is designed to be robust to matched uncertainties by forcing the state onto a surface? | Sliding-mode control | Open-loop control | Pure feedforward | Proportional control only | Gain scheduling | Switching control keeps s(x) = 0 despite bounded matched disturbances.
M3#maths-u25-28-q3@2: Why can feedback linearisation perform poorly when the model is uncertain? | It relies on cancelling exact non-linear terms; mismatched terms remain and can destabilise the loop | It never uses a model of the plant, so errors don't arise | Model uncertainty always improves its performance | It is inherently robust to any model mismatch | It performs perfectly whatever the model quality | Imperfect cancellation leaves residual non-linear dynamics.

## Distributed Control
S: Distributed control coordinates many agents, such as drones, robots, power generators or sensors, each acting on local information and communicating with neighbours. Consensus algorithms and graph theory explain how groups can agree, flock or share load without a central controller.
O: Analyse consensus dynamics with the graph Laplacian
O: Describe formation control and distributed optimisation
T: Graph Laplacian | L = D − A, with degree matrix D and adjacency matrix A of the communication graph
T: Consensus | All agents' states converging to a common value through local interactions
H: Consensus
- Dynamics ẋᵢ = Σ_{j∈Nᵢ}(xⱼ − xᵢ), i.e. ẋ = −Lx.
- Connected undirected graphs converge to the average of initial values.
- Convergence rate set by the algebraic connectivity λ₂(L) (Fiedler value).
- Directed graphs need spanning trees.
H: Applications
- Formation control and flocking (Reynolds, Vicsek, Olfati-Saber).
- Sensor networks averaging measurements.
- Microgrid frequency and load sharing.
- Vehicle platooning.
H: Distributed optimisation
- Agents minimise Σ fᵢ(x) by local gradients plus consensus (ADMM, gradient tracking).
- Federated learning as distributed optimisation.
- Robustness to link failures and delays.
- Scalability versus performance trade-offs.
X: Three agents in a line (1–2–3) start at 0, 3 and 6 with undirected consensus. What value do they agree on?
> The graph is connected and undirected
> Consensus converges to the average of initial values
> (0 + 3 + 6)/3 = 3
K: Distributed control coordinates agents with local information; consensus ẋ = −Lx reaches the average on connected graphs; λ₂ sets the speed; applications include formations, sensor networks and power systems.
!: Assuming consensus holds when the communication graph is disconnected.
Q: What do agents converge to under undirected consensus on a connected graph? | The average of their initial values.
Q: What does the algebraic connectivity λ₂ determine? | The consensus convergence rate.
SUM: Local rules, global agreement.
SUM: Graphs govern convergence.
SRC: Olfati-Saber R, Fax JA, Murray RM, Consensus and cooperation in networked multi-agent systems, Proceedings of the IEEE 95(1), 215 | journal | 2007 | https://doi.org/10.1109/JPROC.2006.887293
SRC: Mesbahi M, Egerstedt M, Graph Theoretic Methods in Multiagent Networks (Princeton University Press 2010) | textbook | 2010 | https://press.princeton.edu/
NUM1#maths-u25-29-q1@1: Four agents on a connected undirected graph start at 2, 4, 6 and 12. What consensus value do they reach? | 6 | 0 |  | The average is 24/4 = 6.
M1#maths-u25-29-q2@1: What property of the graph Laplacian guarantees consensus for undirected graphs? | A single zero eigenvalue, which holds when the graph is connected | All its eigenvalues are exactly zero | It is a diagonal matrix for every graph | Its determinant is always equal to 1 | It has some negative eigenvalues | Connectedness gives one zero eigenvalue with eigenvector (1, …, 1).
M2#maths-u25-29-q3@2: Why does adding communication links usually speed up consensus? | It increases the algebraic connectivity λ₂, which sets the slowest convergence rate | Extra links slow convergence by adding more disagreement | Convergence speed doesn't depend on the number of links | It removes the average, so agents reach zero instead | It doesn't speed anything up; only gains matter | Better-connected graphs mix information faster.

## Networked Control Systems
S: Networked control systems close feedback loops over communication networks, which add delays, packet losses and limited data rates. Their mathematics asks how much network imperfection a loop can tolerate, and how to schedule and encode data to keep it stable.
O: Analyse the effects of delay, packet loss and quantisation on feedback
O: Describe event-triggered control and the data-rate theorem
T: Data-rate theorem | Stabilising a linear plant over a channel needs a bit rate above Σ log₂|λᵢ| over unstable eigenvalues (discrete time)
T: Event-triggered control | Sending measurements or updates only when a condition (such as error exceeding a threshold) is met, saving communication
H: Network effects
- Delays reduce phase margin.
- Packet dropouts: stability under loss probability below a critical value.
- Quantisation: finite bits per sample.
- Asynchrony and jitter.
H: Fundamental limits
- Data-rate theorem (Nair, Evans, Tatikonda, Mitter).
- Critical packet-loss probability for Kalman filtering over lossy networks (Sinopoli et al. 2004).
- Delay margins from frequency analysis.
H: Design approaches
- Event-triggered and self-triggered control.
- Predictive compensation for delays (Smith predictor).
- Co-design of control and communication schedules.
- Security: resilience to cyber-attacks (Stuxnet as a warning).
X: A discrete-time plant has one unstable eigenvalue λ = 4. What minimum data rate (bits per sample) is needed for stabilisation?
> Data-rate bound Σ log₂|λᵢ|
> log₂ 4 = 2
> At least 2 bits per sample
K: Networked control must cope with delays, packet loss and limited bit rates; the data-rate theorem sets a minimum rate; event-triggered control saves bandwidth; security matters for cyber-physical systems.
!: Designing the controller as if the network were ideal, ignoring delays and losses.
Q: What does the data-rate theorem bound? | The minimum bit rate needed to stabilise an unstable plant.
Q: What does event-triggered control do? | Communicates only when a triggering condition is met.
SUM: Feedback over imperfect networks.
SUM: Information limits stabilisation.
SRC: Nair GN, Evans RJ, Stabilizability of stochastic linear systems with finite feedback data rates, SIAM Journal on Control and Optimization 43(2), 413 | journal | 2004 | https://doi.org/10.1137/S0363012902402116
SRC: Sinopoli B et al., Kalman filtering with intermittent observations, IEEE Transactions on Automatic Control 49(9), 1453 | journal | 2004 | https://doi.org/10.1109/TAC.2004.834121
NUM1#maths-u25-30-q1@1: A discrete-time plant has unstable eigenvalues 2 and 8. What minimum data rate in bits per sample does the data-rate theorem require? | 4 | 0 | bits | log₂ 2 + log₂ 8 = 1 + 3 = 4 bits per sample.
M1#maths-u25-30-q2@1: How does a network delay affect a feedback loop's stability margin? | It adds phase lag, reducing the phase margin | It adds gain margin | It has no effect | It always stabilises the loop | It removes all poles | A delay e^{−sT} leaves gain unchanged but adds phase lag ωT, which eats into the phase margin and can cause instability.
M3#maths-u25-30-q3@2: Why can't an unstable plant be stabilised with arbitrarily few bits per sample? | Uncertainty grows by the unstable eigenvalues each step, and the bits must undo it | Bits don't matter for stabilisation, only for accuracy | Stable plants need more bits than unstable ones | Any data rate works if the controller is well designed | It can be stabilised with one bit per sample always | log₂|λ| bits are needed per step just to counter the expansion of uncertainty.
`;
