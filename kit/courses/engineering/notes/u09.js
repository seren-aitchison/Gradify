// EngineerGradify Control Systems and Signals (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Introduction to control systems
LV: Year 1 · Foundation
S: A control system makes a physical process behave as we want, despite disturbances. This lesson introduces open-loop and closed-loop control, the elements of a feedback loop and the goals of control design.
O: Distinguish open-loop from closed-loop control with examples
O: Identify the elements of a feedback control system in a block diagram
O: State the main objectives of control system design
PRE: Engineering models and assumptions
H: Open and closed loop
- In **open-loop** control, the input is set without measuring the output, such as a toaster on a timer. It is simple but cannot correct for disturbances or changes in the system.
- In **closed-loop** (feedback) control, the output is measured and compared with the desired value; the difference drives corrective action, such as a thermostat controlling room temperature.
- **Negative feedback** reduces the error and is used in almost all control systems; positive feedback amplifies deviations and is usually avoided.
H: The feedback loop
- **Reference (set point)** r: the desired output.
- **Error** e = r − y: the difference between reference and measured output.
- **Controller**: decides the control action from the error.
- **Actuator** and **plant**: the device and process being controlled.
- **Sensor**: measures the output y and feeds it back.
- **Disturbances** act on the plant, and **noise** affects the measurement.
H: Design goals
P: A good control system is **stable** (does not oscillate out of control), **accurate** (small steady-state error), **fast** (quick rise and settling) with acceptable **overshoot**, **robust** to changes in the plant, and rejects disturbances while ignoring sensor noise. These goals often conflict: a faster response may give more overshoot or less robustness, so design involves trade-offs.
X: Cruise control.
> A driver sets 70 mph. The sensor measures road speed, and the controller compares it with 70 mph.
> On a hill (a disturbance), speed falls, the error becomes positive, and the controller opens the throttle.
> As speed returns to 70 mph, the error and throttle correction shrink.
> An open-loop system with a fixed throttle would simply slow down on the hill.
K: Closed-loop control measures the output and uses the error from the set point to correct it, giving accuracy and disturbance rejection that open-loop control lacks; design balances stability, accuracy, speed and robustness.
!: Assuming feedback always improves a system. Poorly designed feedback can cause oscillation or instability.
EV: established | Negative feedback control has been used in engineering since at least Watt's centrifugal governor in the eighteenth century.
T: Closed-loop control | Control in which the output is measured and fed back to correct the input
T: Set point | The desired value of the controlled output
T: Disturbance | An unwanted input that affects the output of a system
SUM: Open loop: no measurement; closed loop: feedback.
SUM: Reference, error, controller, plant, sensor.
SUM: Stability, accuracy, speed and robustness.
SRC: Nise N. S., Control Systems Engineering, 7th edition, Wiley | secondary | 2015
SRC: Åström K. J. and Murray R. M., Feedback Systems: An Introduction for Scientists and Engineers, Princeton University Press | secondary | 2008
Q: What is the error signal in a feedback loop? | The difference between the reference (set point) and the measured output.
Q: Why is open-loop control poor at rejecting disturbances? | It does not measure the output, so it cannot detect or correct the effect of a disturbance.
M1#engineering-u09-01-q1@1: Which is an example of closed-loop control? | A thermostat controlling a heater | A toaster set on a timer | A washing machine on a fixed programme | A tap opened to a fixed position | The thermostat measures temperature and adjusts the heater.
M2#engineering-u09-01-q2@2: In a feedback loop, what does the sensor do? | Measures the output and feeds it back | Generates the reference signal | Applies power to the plant | Removes all disturbances | The sensor provides the measured output for comparison.
M3#engineering-u09-01-q3@3: Why might making a controller more aggressive be undesirable? | It can increase overshoot and reduce stability margins | It always makes the system slower | It removes the need for a sensor | It reduces the accuracy to zero | Faster response often trades off against overshoot and robustness.
MATCH1#engineering-u09-01-q4@2: Match each element to its role in cruise control. | Set point = 70 mph chosen by driver ; Sensor = Speedometer ; Actuator = Throttle ; Disturbance = Hill | Each block in the loop has a physical counterpart.
SA2#engineering-u09-01-q5@1,3: Compare open-loop and closed-loop control, giving an advantage of each. | Open-loop control applies an input without measuring the output: it is simple, cheap and cannot become unstable through feedback, but it cannot correct for disturbances or changes. Closed-loop control measures the output and corrects errors: it is accurate and rejects disturbances, but needs sensors, is more complex and can become unstable if poorly designed. | Open-loop definition ; Simplicity ; Closed-loop correction ; Instability risk

## Laplace transforms
LV: Year 1 · Intermediate
S: The Laplace transform turns linear differential equations into algebraic equations, which makes analysing dynamic systems much easier. This lesson defines the transform, gives key transform pairs and properties, and uses them to solve differential equations.
O: Define the Laplace transform and use a table of transform pairs
O: Apply the derivative property and the final value theorem
O: Solve a linear differential equation using Laplace transforms and partial fractions
PRE: First-order differential equations
H: Definition and pairs
E: F(s) = ∫_{0}^{∞} f(t) e^{−st} dt :: the Laplace transform of f(t)
- Unit step 1 transforms to 1/s; t to 1/s^{2}; e^{−at} to 1/(s + a); sin ωt to ω/(s^{2} + ω^{2}); cos ωt to s/(s^{2} + ω^{2}).
- The transform is **linear**: the transform of af(t) + bg(t) is aF(s) + bG(s).
H: Key properties
E: L{df/dt} = sF(s) − f(0) :: differentiation becomes multiplication by s
E: lim_{t→∞} f(t) = lim_{s→0} sF(s) :: final value theorem, valid when the system settles
- Integration becomes division by s.
- The **final value theorem** gives the steady-state value directly, but only if the poles of sF(s) are in the left half-plane.
H: Solving equations
P: Transform the differential equation, substituting initial conditions; solve algebraically for Y(s); split Y(s) into **partial fractions**; and use the table to return to the time domain (the **inverse** transform). This method handles initial conditions and step or sinusoidal inputs systematically.
X: A first-order equation.
> Solve dy/dt + 2y = 4 with y(0) = 0.
> Transform: sY + 2Y = 4/s, so Y = 4 ÷ [s(s + 2)].
> Partial fractions: Y = 2/s − 2/(s + 2).
> Inverse: y(t) = 2(1 − e^{−2t}). Check with the final value theorem: lim s→0 of sY = 4/2 = 2.
K: The Laplace transform converts differentiation into multiplication by s, so linear ODEs become algebra; solve for Y(s), use partial fractions and a table to invert, and check steady state with the final value theorem.
!: Applying the final value theorem to an unstable or oscillating system. It is valid only if the system actually settles.
EV: established | Laplace transform methods are the standard tool for analysing linear time-invariant systems in control engineering.
T: Laplace transform | An integral transform converting a function of time into a function of the complex variable s
T: Partial fractions | Splitting a rational function into simpler fractions for inversion
T: Final value theorem | A result giving the steady-state value of f(t) from its transform
SUM: Differentiation becomes multiplication by s.
SUM: Use tables and partial fractions to invert.
SUM: Final value theorem gives steady state when stable.
SRC: James G., Modern Engineering Mathematics, 5th edition, Pearson | secondary | 2015
SRC: Ogata K., Modern Control Engineering, 5th edition, Prentice Hall | secondary | 2010
Q: What is the Laplace transform of e^{−at}? | 1/(s + a).
Q: When is the final value theorem valid? | When the system settles, with all poles of sF(s) in the left half-plane.
M1#engineering-u09-02-q1@1: What is the Laplace transform of a unit step? | 1/s | s | 1/s^{2} | 1 | The transform of the constant 1 for t ≥ 0 is 1/s.
M2#engineering-u09-02-q2@2: What is the transform of dy/dt if y(0) = 3? | sY(s) − 3 | sY(s) + 3 | Y(s)/s | s^{2}Y(s) | The derivative property subtracts the initial value.
NUM2#engineering-u09-02-q3@3: Use the final value theorem to find the steady-state value of y(t) when Y(s) = 10 ÷ [s(s + 5)]. | 2 | 0.01 | – | lim s→0 of sY(s) = 10/5 = 2.
M3#engineering-u09-02-q4@3: What is the inverse transform of 3/(s + 4)? | 3e^{−4t} | 3e^{4t} | 4e^{−3t} | 3 sin 4t | The pair 1/(s + a) corresponds to e^{−at}.
SA3#engineering-u09-02-q5@2,3: Explain why Laplace transforms are useful for analysing dynamic systems. | They turn linear differential equations into algebraic equations in s, which are easier to manipulate and combine. Initial conditions are included automatically. Transfer functions, block diagram algebra, stability analysis through pole positions and steady-state results via the final value theorem all follow, so the behaviour of complex systems can be analysed without solving every differential equation directly. | ODEs to algebra ; Initial conditions ; Transfer functions ; Poles and stability ; Final value theorem

## Transfer functions and block diagrams
LV: Year 1 · Intermediate
S: A transfer function describes how a linear system turns an input into an output in the Laplace domain. This lesson defines transfer functions, poles and zeros, and shows how to reduce block diagrams of connected systems.
O: Define a transfer function and identify its poles and zeros
O: Reduce series, parallel and feedback block diagrams
O: Derive the closed-loop transfer function of a feedback system
PRE: Laplace transforms
H: Transfer functions
E: G(s) = Y(s) ÷ U(s) :: the transfer function, with all initial conditions zero
- The **poles** are the values of s that make the denominator zero; the **zeros** make the numerator zero.
- Pole positions determine the natural response: poles in the left half of the s-plane give decaying responses.
- The **steady-state (DC) gain** is G(0) for a stable system.
H: Block diagram algebra
- **Series** (cascade): G_{1}(s)G_{2}(s).
- **Parallel**: G_{1}(s) + G_{2}(s).
- **Negative feedback** with forward path G(s) and feedback path H(s):
E: T(s) = G(s) ÷ [1 + G(s)H(s)] :: closed-loop transfer function with negative feedback
- With **unity feedback**, H(s) = 1. The equation 1 + G(s)H(s) = 0 is the **characteristic equation**, whose roots are the closed-loop poles.
H: Why it matters
P: Block diagrams show how sensors, controllers and plants interact. Reducing them gives the overall transfer function, from which stability, speed and steady-state accuracy follow. Feedback moves the poles: in the example below, feedback moves the pole from −1 to −11, making the response much faster.
X: Closing the loop.
> A plant G(s) = 10/(s + 1) has unity negative feedback.
> T(s) = [10/(s + 1)] ÷ [1 + 10/(s + 1)] = 10/(s + 11).
> The open-loop pole at −1 becomes a closed-loop pole at −11: the response is 11 times faster.
> The steady-state gain is T(0) = 10/11 ≈ 0.91, so there is a steady-state error of about 9% for a unit step.
K: A transfer function is output over input in the s-domain with zero initial conditions; poles govern the response; series blocks multiply, parallel blocks add, and negative feedback gives G/(1 + GH).
!: Forgetting the sign convention. With positive feedback the closed-loop transfer function is G/(1 − GH).
EV: established | Block diagram reduction and transfer function analysis are standard methods in classical control.
T: Transfer function | The ratio of the Laplace transform of the output to that of the input, with zero initial conditions
T: Pole | A value of s that makes a transfer function's denominator zero
T: Characteristic equation | 1 + G(s)H(s) = 0, whose roots are the closed-loop poles
SUM: G(s) = Y/U with zero initial conditions.
SUM: Series multiply, parallel add, feedback G/(1 + GH).
SUM: Feedback moves the poles.
SRC: Nise N. S., Control Systems Engineering, 7th edition, Wiley | secondary | 2015
SRC: Dorf R. C. and Bishop R. H., Modern Control Systems, 13th edition, Pearson | secondary | 2017
Q: What is the closed-loop transfer function for negative feedback? | G(s) ÷ [1 + G(s)H(s)].
Q: Where are the poles of G(s) = 5/(s + 3)? | At s = −3.
M1#engineering-u09-03-q1@1: Two blocks G_{1} and G_{2} are connected in series. What is the overall transfer function? | G_{1}G_{2} | G_{1} + G_{2} | G_{1}/G_{2} | G_{1} − G_{2} | Cascaded blocks multiply: the output of one is the input of the next.
M2#engineering-u09-03-q2@2: G(s) = 4/(s + 2) has unity negative feedback. What is the closed-loop transfer function? | 4/(s + 6) | 4/(s + 2) | 4/(s − 2) | 2/(s + 4) | T = G/(1 + G) = 4/(s + 2 + 4) = 4/(s + 6).
NUM2#engineering-u09-03-q3@3: What is the steady-state gain of the closed-loop system 4/(s + 6)? | 0.667 | 0.005 | – | Setting s = 0 gives the steady-state gain T(0) = 4/6 = 0.667.
M3#engineering-u09-03-q4@3: What is the characteristic equation of a unity feedback system with G(s) = K/[s(s + 3)]? | s^{2} + 3s + K = 0 | s^{2} + 3s = 0 | s + K = 0 | s^{2} − 3s + K = 0 | Setting 1 + G = 0 and clearing fractions gives s(s + 3) + K = 0.
SA3#engineering-u09-03-q5@2,3: Explain how negative feedback changes the behaviour of the system G(s) = 10/(s + 1). | Closing the loop gives T(s) = 10/(s + 11). The pole moves from −1 to −11, so the time constant falls from 1 s to about 0.09 s and the response is much faster. The steady-state gain falls from 10 to 10/11, so the output follows the reference closely, though with a small error. Feedback also makes the system less sensitive to changes in the plant gain. | Closed-loop TF ; Pole moves ; Faster response ; Gain and error ; Reduced sensitivity

## Modelling physical systems
LV: Year 1 · Intermediate
S: To design a controller we first need a mathematical model of the system. This lesson derives transfer functions for mechanical, electrical, thermal and electromechanical systems and shows the analogies between them.
O: Derive the transfer function of a mass-spring-damper system
O: Derive transfer functions for simple electrical and thermal systems
O: Explain the analogies between mechanical, electrical and thermal systems
PRE: Transfer functions and block diagrams
H: Mechanical systems
- A **mass-spring-damper** with mass m, damping coefficient c and spring stiffness k, driven by force F, obeys m d^{2}x/dt^{2} + c dx/dt + kx = F.
E: X(s) ÷ F(s) = 1 ÷ (ms^{2} + cs + k) :: mass-spring-damper transfer function
- Rotational systems are similar, with inertia, rotational damping and torsional stiffness.
H: Electrical and thermal systems
- An **RC circuit** with output across the capacitor: V_{out}/V_{in} = 1/(RCs + 1), a first-order system with time constant RC.
- An **RLC circuit** is second-order, analogous to the mass-spring-damper.
- A **thermal system** with thermal capacitance C_{t} and thermal resistance R_{t}: temperature rise over heat input = R_{t}/(R_{t}C_{t}s + 1).
- A **DC motor** combines an electrical circuit and a mechanical load; its speed response to voltage is often modelled as first-order.
H: Analogies and linearisation
P: Different physical systems share the same mathematics. In the **force–voltage analogy**, mass corresponds to inductance, damping to resistance and spring compliance to capacitance. Real systems are often non-linear (friction, saturation), so models are **linearised** about an operating point using Taylor series. Models are tested against experiments and refined.
X: Modelling a vehicle suspension.
> A quarter-car suspension has m = 250 kg, c = 1,000 N s/m and k = 10,000 N/m.
> G(s) = 1 ÷ (250s^{2} + 1,000s + 10,000).
> Steady-state deflection for a constant 1,000 N force: G(0) × 1,000 = 1,000/10,000 = 0.1 m.
> The second-order form shows the suspension can oscillate if damping is too low.
K: Physical laws give differential equations that become transfer functions: the mass-spring-damper gives 1/(ms^{2} + cs + k), an RC circuit 1/(RCs + 1); mechanical, electrical and thermal systems are analogous, and non-linear systems are linearised.
!: Forgetting that models are approximations. Friction, saturation and other non-linearities mean a linear model is valid only near its operating point.
EV: established | Lumped-parameter models and electromechanical analogies are standard in control and mechatronics.
T: Mass-spring-damper | A second-order mechanical system of mass, spring and damper
T: Thermal capacitance | The heat needed to raise a body's temperature by one degree
T: Linearisation | Approximating a non-linear system by a linear one near an operating point
SUM: Mass-spring-damper: 1/(ms^{2} + cs + k).
SUM: RC and thermal systems are first-order.
SUM: Different systems share the same equations.
SRC: Bolton W., Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering, 7th edition, Pearson | secondary | 2019
SRC: Nise N. S., Control Systems Engineering, 7th edition, Wiley | secondary | 2015
Q: What is the transfer function of an RC low-pass circuit? | 1/(RCs + 1), with time constant RC.
Q: In the force–voltage analogy, what corresponds to mass? | Inductance.
M1#engineering-u09-04-q1@1: What order is a mass-spring-damper system? | Second order | First order | Zero order | Third order | The equation contains a second derivative of position.
M2#engineering-u09-04-q2@2: In the force–voltage analogy, what does a damper correspond to? | A resistor | An inductor | A capacitor | A transformer | Both dissipate energy in proportion to a rate (velocity or current).
NUM2#engineering-u09-04-q3@3: A mass-spring-damper has k = 2,000 N/m. What is its steady-state deflection under a constant 500 N force, in m? | 0.25 | 0.005 | m | G(0) = 1/k, so x = 500/2,000 = 0.25 m.
M3#engineering-u09-04-q4@3: Why are real control models often linearised? | Many real systems are non-linear but behave nearly linearly near an operating point | Linear models are always exact for any input | Non-linear systems cannot be controlled at all | Linearisation removes the need for experiments | Linear tools apply only to linear models, so systems are approximated near operating points.
SA3#engineering-u09-04-q5@1,3: Derive the transfer function of a mass-spring-damper system and explain the role of each term. | Newton's second law: the applied force minus the spring force kx and damping force c dx/dt equals m d^{2}x/dt^{2}. So m d^{2}x/dt^{2} + c dx/dt + kx = F. Taking Laplace transforms with zero initial conditions gives (ms^{2} + cs + k)X = F, so X/F = 1/(ms^{2} + cs + k). Mass resists acceleration, the damper dissipates energy, and the spring stores energy and sets the stiffness. | Newton's law ; Differential equation ; Laplace transform ; Transfer function ; Physical roles

## First-order system response
LV: Year 1 · Intermediate
S: Many systems, from heaters to motors, respond like first-order systems. This lesson analyses the standard first-order transfer function, its step response and how the time constant and gain describe its behaviour.
O: Write the standard form of a first-order transfer function
O: Derive and sketch the unit step response of a first-order system
O: Calculate rise time and settling time from the time constant
PRE: Modelling physical systems
H: Standard form
E: G(s) = K ÷ (τs + 1) :: first-order system with steady-state gain K and time constant τ
- The single pole is at s = −1/τ; a smaller τ means a faster response.
- K is the steady-state output per unit of steady input.
H: Step response
E: y(t) = K(1 − e^{−t/τ}) :: response to a unit step
- After one time constant the output reaches **63.2%** of its final value; after 4τ, about 98%.
- **Settling time** (to within 2%) is about **4τ**.
- **Rise time** (10% to 90%) is about **2.2τ**.
- There is no overshoot: the response rises smoothly.
H: Identifying parameters
P: From an experimental step response, K is the final change in output divided by the step size, and τ is the time to reach 63.2% of that change. This simple identification lets engineers model heaters, tanks and motor speed loops quickly. Feedback changes both K and τ, as shown in the transfer function lesson.
X: An oven heater.
> An oven modelled as G(s) = 5/(2s + 1) °C per watt-unit, with τ in minutes, receives a step input of 40 units.
> Final temperature rise: 5 × 40 = 200 °C.
> After 2 minutes (one time constant): 200 × 0.632 = 126 °C.
> Settling time is about 4 × 2 = 8 minutes.
K: A first-order system K/(τs + 1) rises to K(1 − e^{−t/τ}) for a unit step, reaching 63.2% in one time constant and settling in about 4τ, with no overshoot.
!: Reading the time constant at 50% of the final value. It is the time to reach 63.2%.
EV: established | The first-order step response is an exact solution of the linear first-order differential equation.
T: Time constant | The time for a first-order response to reach 63.2% of its final change
T: Steady-state gain | The ratio of final output change to a constant input change
T: Settling time | The time for the response to stay within a band, often 2%, of its final value
SUM: G(s) = K/(τs + 1).
SUM: 63.2% at τ; settles in about 4τ.
SUM: No overshoot.
SRC: Nise N. S., Control Systems Engineering, 7th edition, Wiley | secondary | 2015
SRC: Ogata K., Modern Control Engineering, 5th edition, Prentice Hall | secondary | 2010
Q: What fraction of the final value does a first-order system reach after one time constant? | About 63.2%.
Q: What is the approximate 2% settling time of a first-order system? | About 4τ.
M1#engineering-u09-05-q1@1: Where is the pole of G(s) = 3/(0.5s + 1)? | s = −2 | s = −0.5 | s = −3 | s = 2 | The pole is where the denominator is zero: 0.5s + 1 = 0 gives s = −2.
NUM2#engineering-u09-05-q2@2: A first-order system has τ = 3 s. What is its 2% settling time, in s? | 12 | 0.1 | s | Settling time ≈ 4τ = 12 s.
M2#engineering-u09-05-q3@2: A step response rises from 0 to a final value of 50 and reaches 31.6 after 5 s. What is τ? | 5 s | 3.16 s | 10 s | 2.5 s | τ is the time to reach 63.2% of the final value; 31.6 is 63.2% of 50, so τ = 5 s.
M3#engineering-u09-05-q4@3: How does a first-order step response differ from an underdamped second-order one? | It never overshoots | It always oscillates | It never reaches steady state | It overshoots by exactly 63.2% | The single real pole gives a smooth exponential rise.
SA3#engineering-u09-05-q5@2,3: Explain how you would identify a first-order model from an experimental step test. | Apply a step change of known size and record the output. The steady-state gain K is the final change in output divided by the step size. The time constant τ is the time from the step to reaching 63.2% of the final change. Check that the response shows no overshoot or delay; if it does, a higher-order or dead-time model may be needed. | Step test ; Gain from final value ; τ at 63.2% ; Check fit

## Second-order system response
LV: Year 1 · Advanced
S: Second-order systems, such as suspensions and positioning systems, can oscillate. This lesson explains natural frequency and damping ratio, the types of response and the formulas for overshoot and settling time.
O: Write the standard second-order transfer function and identify ω_{n} and ζ
O: Classify responses as underdamped, critically damped or overdamped
O: Calculate percentage overshoot, peak time and settling time
PRE: First-order system response
H: Standard form
E: G(s) = ω_{n}^{2} ÷ (s^{2} + 2ζω_{n}s + ω_{n}^{2}) :: second-order system with natural frequency ω_{n} and damping ratio ζ
- **ζ = 0**: undamped, sustained oscillation.
- **0 < ζ < 1**: **underdamped**, oscillatory response with overshoot; poles are complex.
- **ζ = 1**: **critically damped**, fastest response without overshoot.
- **ζ > 1**: **overdamped**, slow, with no overshoot; poles are real and distinct.
H: Performance measures
E: %OS = 100 exp(−ζπ ÷ √(1 − ζ^{2})) :: percentage overshoot for an underdamped system
E: t_{s} ≈ 4 ÷ (ζω_{n}) :: 2% settling time
E: t_{p} = π ÷ (ω_{n}√(1 − ζ^{2})) :: time to the first peak
- The **damped natural frequency** ω_{d} = ω_{n}√(1 − ζ^{2}) is the frequency of oscillation.
- Overshoot depends only on ζ; a ζ of about 0.7 gives roughly 5% overshoot and a good balance of speed and damping.
H: Using the formulas
P: Matching a system's characteristic equation to s^{2} + 2ζω_{n}s + ω_{n}^{2} gives ω_{n} and ζ. Designers then choose gains to place ζ and ω_{n} where overshoot and settling time meet the specification. Pole positions show this graphically: the real part −ζω_{n} sets decay rate and the angle from the negative real axis sets damping.
X: A mass-spring-damper.
> m = 1 kg, c = 4 N s/m, k = 16 N/m, so s^{2} + 4s + 16.
> ω_{n} = √16 = 4 rad/s; 2ζω_{n} = 4, so ζ = 0.5.
> %OS = 100 exp(−0.5π ÷ √0.75) = 100 exp(−1.814) = 16.3%.
> Settling time ≈ 4 ÷ (0.5 × 4) = 2 s.
K: Second-order systems are described by ω_{n} and ζ; underdamped systems overshoot by an amount set by ζ, settle in about 4/(ζω_{n}), and designers tune ζ and ω_{n} to meet specifications.
!: Thinking critical damping is always best. A slightly underdamped response, with ζ around 0.7, is often faster with acceptable overshoot.
EV: established | The standard second-order response formulas are exact for the canonical second-order system without zeros.
T: Natural frequency | The frequency at which an undamped system would oscillate
T: Damping ratio | A measure of how quickly oscillations decay, ζ
T: Overshoot | The amount by which the response exceeds its final value
SUM: ω_{n} and ζ describe second-order systems.
SUM: Underdamped overshoot depends only on ζ.
SUM: Settling time ≈ 4/(ζω_{n}).
SRC: Nise N. S., Control Systems Engineering, 7th edition, Wiley | secondary | 2015
SRC: Franklin G. F., Powell J. D. and Emami-Naeini A., Feedback Control of Dynamic Systems, 8th edition, Pearson | secondary | 2019
Q: What value of ζ gives critical damping? | ζ = 1.
Q: What is the damped natural frequency? | ω_{d} = ω_{n}√(1 − ζ^{2}), the frequency of the decaying oscillation.
M1#engineering-u09-06-q1@1: What type of response has 0 < ζ < 1? | Underdamped | Overdamped | Critically damped | Undamped | Complex poles give an oscillatory, decaying response with overshoot.
M2#engineering-u09-06-q2@2: A system has characteristic equation s^{2} + 6s + 25 = 0. What is ζ? | 0.6 | 0.24 | 1.2 | 3 | Matching to the standard form, ω_{n} = 5 and 2ζω_{n} = 6, so ζ = 0.6.
NUM3#engineering-u09-06-q3@3: For s^{2} + 6s + 25, what is the 2% settling time, in s? | 1.33 | 0.02 | s | t_{s} ≈ 4 ÷ (ζω_{n}) = 4 ÷ 3 = 1.33 s.
M3#engineering-u09-06-q4@3: Which change reduces overshoot in an underdamped second-order system? | Increasing the damping ratio | Decreasing the damping ratio | Increasing ω_{n} with ζ fixed | Removing all damping | Overshoot depends only on ζ and falls as ζ rises.
SA3#engineering-u09-06-q5@2,3: A positioning system has ζ = 0.2. Explain the consequences and how a designer might improve it. | With ζ = 0.2 the response is lightly damped: overshoot is about 53%, and many oscillations occur before settling, which may cause damage, wear or inaccuracy. The designer could add damping physically, use derivative or velocity feedback, or retune the controller to raise ζ towards about 0.7, accepting a slightly slower rise for much less overshoot. | Light damping ; Large overshoot ; Slow settling ; Adding damping ; Target ζ

## Steady-state error
LV: Year 1 · Advanced
S: Steady-state error is the difference between the desired and actual output after transients die away. This lesson explains system type, the error constants and how to calculate steady-state errors for step and ramp inputs.
O: Determine the type of a unity feedback system
O: Calculate the position and velocity error constants
O: Calculate steady-state errors for step and ramp inputs and explain how to reduce them
PRE: Second-order system response
H: System type
- For a unity feedback system with open-loop transfer function G(s), the **type** is the number of pure integrators (poles at s = 0) in G(s).
- Type 0: no integrator; type 1: one integrator; and so on.
- Integrators come from the plant (such as a motor positioning system) or the controller (integral action).
H: Error constants
E: K_{p} = lim_{s→0} G(s) and e_{ss} = 1 ÷ (1 + K_{p}) :: position constant and steady-state error for a unit step
E: K_{v} = lim_{s→0} sG(s) and e_{ss} = 1 ÷ K_{v} :: velocity constant and steady-state error for a unit ramp
- A type 0 system has a finite step error and an infinite ramp error.
- A type 1 system has zero step error and a finite ramp error.
- A type 2 system has zero step and ramp errors.
H: Reducing error
P: Increasing the loop gain reduces finite errors but may reduce stability. Adding **integral action** raises the system type, removing step error, but can slow the response or cause overshoot. These results come from the final value theorem and apply only to stable closed-loop systems.
X: Two systems.
> System A: G(s) = 10/(s + 2), type 0. K_{p} = 10/2 = 5, so the unit step error is 1/(1 + 5) = 0.167.
> System B: G(s) = 10/[s(s + 2)], type 1. Step error is zero.
> For B, K_{v} = lim s × 10/[s(s + 2)] = 10/2 = 5, so the unit ramp error is 1/5 = 0.2.
> Adding an integrator to A would remove its step error.
K: The system type (number of integrators) sets which inputs can be tracked without error; step error is 1/(1 + K_{p}) and ramp error 1/K_{v}; integral action raises the type.
!: Calculating steady-state error for an unstable closed-loop system. Check stability first; the formulas are meaningless otherwise.
EV: established | Error constants and system type are classical results derived from the final value theorem.
T: System type | The number of pure integrators in the open-loop transfer function
T: Position error constant | K_{p} = lim G(s) as s → 0, which sets the step error
T: Velocity error constant | K_{v} = lim sG(s) as s → 0, which sets the ramp error
SUM: Type equals the number of integrators.
SUM: Step error 1/(1 + K_{p}); ramp error 1/K_{v}.
SUM: Integral action removes step error.
SRC: Nise N. S., Control Systems Engineering, 7th edition, Wiley | secondary | 2015
SRC: Dorf R. C. and Bishop R. H., Modern Control Systems, 13th edition, Pearson | secondary | 2017
Q: What is the steady-state error of a type 1 system to a step input? | Zero.
Q: How is the velocity error constant defined? | K_{v} = lim sG(s) as s → 0.
M1#engineering-u09-07-q1@1: What is the type of G(s) = 5/[s(s + 1)]? | Type 1 | Type 0 | Type 2 | Type 5 | There is one pole at s = 0, so one integrator.
NUM2#engineering-u09-07-q2@2: What is the unit step steady-state error for G(s) = 9/(s + 1) with unity feedback? | 0.1 | 0.005 | – | K_{p} = 9, so e_{ss} = 1/(1 + 9) = 0.1.
M2#engineering-u09-07-q3@2: What is the unit ramp error of G(s) = 20/[s(s + 4)] with unity feedback? | 0.2 | 0.05 | 0 | Infinite | The velocity constant K_{v} = 20/4 = 5, so the ramp error is 1/5 = 0.2.
M3#engineering-u09-07-q4@3: Why does adding integral action remove steady-state error to a step? | It adds an integrator, raising the system type | It increases the damping ratio to one | It removes all poles from the system | It makes the sensor more accurate | The added integrator makes the loop type 1, which has zero step error.
SA3#engineering-u09-07-q5@2,3: A temperature controller with proportional control settles 2 °C below the set point. Explain why and how to fix it. | The loop is type 0, so with finite proportional gain there is a steady-state error 1/(1 + K_{p}) times the step. Some error is needed to keep the heater on against losses. Raising the gain reduces the error but may cause overshoot or instability. Adding integral action makes the loop type 1, so the controller keeps adjusting until the error is zero. | Type 0 ; Finite gain error ; Gain trade-off ; Integral action ; Zero error

## Stability and the Routh–Hurwitz criterion
LV: Year 1 · Advanced
S: A control system must be stable before anything else. This lesson defines stability in terms of pole positions and shows how the Routh–Hurwitz criterion tests stability and finds the range of gain for which a system is stable.
O: Define stability in terms of the poles of a system
O: Construct a Routh array and interpret its first column
O: Find the range of gain K for which a closed-loop system is stable
PRE: Transfer functions and block diagrams
H: Stability and poles
- A linear system is **stable** if every bounded input produces a bounded output; equivalently, all closed-loop poles lie in the **left half** of the s-plane (negative real parts).
- Poles on the imaginary axis give sustained oscillation (**marginal stability**); any pole in the right half-plane gives an unstable, growing response.
- The closed-loop poles are the roots of the characteristic equation 1 + G(s)H(s) = 0.
H: The Routh–Hurwitz criterion
- A **necessary** condition is that all coefficients of the characteristic polynomial are present and have the same sign.
- The **Routh array** is built from the coefficients: the first two rows hold alternate coefficients, and each later entry is calculated from the two rows above.
- The number of **sign changes** in the first column equals the number of roots in the right half-plane.
- A system is stable if every entry in the first column is positive (assuming a positive leading coefficient).
H: Using it for design
P: Routh–Hurwitz is especially useful for finding the range of a gain K that keeps a system stable without solving for the roots. A row of zeros indicates roots symmetric about the origin, such as a pair on the imaginary axis, which gives the gain and frequency of sustained oscillation.
X: Range of gain.
> Characteristic equation: s^{3} + 2s^{2} + 3s + K = 0.
> Routh array rows: s^{3}: 1, 3; s^{2}: 2, K; s^{1}: (2 × 3 − 1 × K)/2 = (6 − K)/2; s^{0}: K.
> For stability, all first-column entries must be positive: (6 − K)/2 > 0 and K > 0.
> So the system is stable for 0 < K < 6; at K = 6 it oscillates steadily.
K: A system is stable when all closed-loop poles have negative real parts; the Routh–Hurwitz criterion counts right-half-plane roots from sign changes in the first column and finds the stable range of gain.
!: Assuming positive coefficients guarantee stability. That is necessary but not sufficient for systems above second order; the Routh array is needed.
EV: established | The Routh–Hurwitz criterion, developed in the nineteenth century, remains a standard algebraic stability test.
T: Stability | The property that bounded inputs produce bounded outputs; all poles in the left half-plane
T: Routh array | A table built from the characteristic polynomial's coefficients to test stability
T: Marginal stability | Sustained oscillation from poles on the imaginary axis
SUM: Stable means all poles in the left half-plane.
SUM: Sign changes in the Routh first column count unstable roots.
SUM: Routh finds the stable range of gain.
SRC: Routh E. J., A Treatise on the Stability of a Given State of Motion, Macmillan | primary | 1877
SRC: Nise N. S., Control Systems Engineering, 7th edition, Wiley | secondary | 2015
Q: Where must the poles of a stable system lie? | In the left half of the s-plane, with negative real parts.
Q: What does a sign change in the first column of the Routh array indicate? | A root in the right half-plane, so the system is unstable.
M1#engineering-u09-08-q1@1: A system has a closed-loop pole at s = +2. What does this mean? | The system is unstable | The system is stable | The system is marginally stable | The system has no poles | A pole with a positive real part gives a growing response.
M2#engineering-u09-08-q2@2: Which characteristic equation fails the necessary condition for stability? | s^{3} + 4s^{2} − 2s + 5 = 0 | s^{3} + 4s^{2} + 2s + 5 = 0 | s^{2} + 3s + 2 = 0 | s + 7 = 0 | A negative coefficient means at least one root lies in the right half-plane.
NUM3#engineering-u09-08-q3@3: For s^{3} + 4s^{2} + 5s + K = 0, what is the largest K for stability? | 20 | 0.5 | – | The s^{1} row is (4 × 5 − K)/4, which must be positive, so K < 20.
M3#engineering-u09-08-q4@3: What does a whole row of zeros in a Routh array indicate? | Roots symmetric about the origin, such as a pair on the imaginary axis | The system is always stable | The calculation has no meaning | All poles are at the origin | A zero row arises from an even polynomial factor, often indicating marginal stability.
SA3#engineering-u09-08-q5@2,3: Explain how the Routh–Hurwitz criterion helps a designer choose a controller gain. | The designer writes the closed-loop characteristic equation with the gain K as a parameter, builds the Routh array and requires every first-column entry to be positive. This gives inequalities on K and so the stable range without solving for roots. The boundary value of K gives marginal stability, and the auxiliary equation from that row gives the oscillation frequency. The designer then chooses K well inside the range for good margins. | Characteristic equation with K ; Routh array ; Inequalities ; Marginal gain and frequency ; Margin

## Feedback and PID control
LV: Year 1 · Advanced
S: The PID controller is the most widely used controller in industry. This lesson explains proportional, integral and derivative action, their effects on the response, and practical tuning with the Ziegler–Nichols method.
O: Describe the effect of proportional, integral and derivative action
O: Explain practical issues such as integral windup and derivative noise
O: Tune a PID controller using the Ziegler–Nichols ultimate gain method
PRE: Steady-state error
H: The PID law
E: u(t) = K_{p}e(t) + K_{i}∫e dt + K_{d} de/dt :: PID control law
- **Proportional**: control action proportional to the current error; increasing K_{p} speeds the response and reduces (but does not remove) steady-state error in type 0 systems, but can cause overshoot and instability.
- **Integral**: acts on accumulated error, removing steady-state error, but adds lag and can increase overshoot.
- **Derivative**: acts on the rate of change of error, adding damping and reducing overshoot, but amplifies high-frequency noise.
H: Practical issues
- **Integral windup**: when the actuator saturates, the integral keeps growing, causing large overshoot; anti-windup schemes stop or limit integration.
- Derivative action is usually filtered, and often applied to the measured output rather than the error to avoid "derivative kick" on set-point changes.
- Many industrial loops use PI control only.
H: Ziegler–Nichols tuning
P: In the **ultimate gain** method, the controller is set to proportional only and K_{p} is increased until the loop oscillates steadily at the **ultimate gain** K_{u} with period P_{u}. Ziegler and Nichols (1942) suggested K_{p} = 0.6K_{u}, integral time T_{i} = P_{u}/2 and derivative time T_{d} = P_{u}/8 for PID. These settings give a fast but fairly oscillatory response and are usually refined.
X: Tuning a loop.
> A test finds K_{u} = 10 and P_{u} = 2 s.
> Ziegler–Nichols PID: K_{p} = 0.6 × 10 = 6; T_{i} = 2/2 = 1 s; T_{d} = 2/8 = 0.25 s.
> In parallel form, K_{i} = K_{p}/T_{i} = 6 s^{−1} and K_{d} = K_{p}T_{d} = 1.5 s.
> The engineer then reduces K_{p} slightly to cut overshoot.
K: PID combines proportional action for speed, integral action to remove steady-state error and derivative action for damping; practical controllers need anti-windup and filtered derivatives, and can be tuned with Ziegler–Nichols then refined.
!: Adding derivative action to a noisy measurement without filtering. The derivative amplifies noise and can make the actuator chatter.
EV: established | PID and PI controllers account for the large majority of industrial feedback loops.
T: PID controller | A controller combining proportional, integral and derivative action
T: Integral windup | Excessive build-up of the integral term while the actuator is saturated
T: Ultimate gain | The proportional gain at which a loop oscillates with constant amplitude
SUM: P speeds response; I removes error; D adds damping.
SUM: Guard against windup and derivative noise.
SUM: Ziegler–Nichols gives starting settings.
SRC: Ziegler J. G. and Nichols N. B., "Optimum settings for automatic controllers", Transactions of the ASME 64, 759–768 | primary | 1942
SRC: Åström K. J. and Hägglund T., Advanced PID Control, ISA | secondary | 2006
Q: What does integral action do? | Removes steady-state error by acting on the accumulated error.
Q: What is integral windup? | Build-up of the integral term while the actuator is saturated, causing overshoot when it recovers.
M1#engineering-u09-09-q1@1: Which term in a PID controller adds damping? | Derivative | Proportional | Integral | Feedforward | Derivative action opposes rapid changes in error.
M2#engineering-u09-09-q2@2: A proportional-only temperature loop settles below its set point. Which addition removes the offset? | Integral action | Derivative action | A larger sensor | A slower actuator | Integral action continues to act until the error is zero.
NUM2#engineering-u09-09-q3@3: Using Ziegler–Nichols PID rules, what is K_{p} if K_{u} = 15? | 9 | 0.1 | – | K_{p} = 0.6 × K_{u} = 0.6 × 15 = 9.
M3#engineering-u09-09-q4@3: A valve saturates fully open during start-up, and the loop then overshoots badly. What is the likely cause? | Integral windup | Derivative kick | Too little proportional gain | Sensor noise only | The integral grows while the valve cannot respond, then drives a large overshoot.
SA3#engineering-u09-09-q5@1,2: Explain the effect of increasing each PID gain on the closed-loop response. | Increasing K_{p} speeds the response and reduces steady-state error in a type 0 loop but increases overshoot and can destabilise. Increasing K_{i} removes steady-state error faster but increases overshoot and oscillation and risks windup. Increasing K_{d} adds damping and reduces overshoot but amplifies noise and can make the actuator noisy. Tuning balances these effects. | Proportional ; Integral ; Derivative ; Trade-offs

## Root locus
LV: Year 1 · Advanced
S: The root locus shows how the closed-loop poles move as a gain changes, giving a visual guide to stability and response. This lesson explains the rules for sketching a root locus and how to use it in design.
O: Explain what a root locus represents
O: Sketch a root locus using the main construction rules
O: Use a root locus to choose a gain for a desired damping or stability
PRE: Stability and the Routh–Hurwitz criterion
H: What it shows
P: For a unity feedback system with open-loop transfer function KG(s), the closed-loop poles are the roots of 1 + KG(s) = 0. The **root locus**, introduced by Walter Evans in 1948, plots these poles as K increases from 0 to infinity. Because pole positions determine stability, overshoot and speed, the locus shows how changing K changes the response.
H: Construction rules
- The locus starts at the **open-loop poles** (K = 0) and ends at the **open-loop zeros** or at infinity (K → ∞).
- It is symmetric about the real axis.
- A point on the **real axis** is on the locus if there is an odd number of real poles and zeros to its right.
- Branches going to infinity follow **asymptotes** at angles (2k + 1)180°/(n − m) from a centroid at (sum of poles − sum of zeros)/(n − m), where n is the number of poles and m of zeros.
- **Breakaway** points occur where branches leave the real axis; **imaginary-axis crossings** (found with Routh) give the gain at the stability limit.
H: Design use
P: Specifications on overshoot correspond to lines of constant damping ratio from the origin; settling time corresponds to a vertical line of constant real part. The designer picks a point where the locus meets these regions and calculates K there. If no suitable point exists, a compensator (adding poles or zeros) reshapes the locus.
X: A second-order locus.
> G(s) = K/[s(s + 2)]: poles at 0 and −2, no zeros.
> Characteristic equation: s^{2} + 2s + K = 0.
> For K < 1 the poles are real; at K = 1 they meet at s = −1 (breakaway); for K > 1 they are −1 ± j√(K − 1).
> The real part stays at −1, so the system is stable for all K > 0, but larger K gives more oscillation.
K: The root locus plots closed-loop poles as gain varies, starting at open-loop poles and ending at zeros or infinity; rules for real-axis segments, asymptotes and crossings let designers choose gains for stability and damping.
!: Assuming the locus can pass through any region. Its shape is fixed by the open-loop poles and zeros; reshaping it needs compensation.
EV: established | Evans's root locus method has been a standard design tool in classical control since 1948.
T: Root locus | The path of closed-loop poles in the s-plane as a gain varies from zero to infinity
T: Breakaway point | Where branches of the locus leave or join the real axis
T: Asymptote | A straight line that branches of the locus approach as gain becomes very large
SUM: The locus plots closed-loop poles against gain.
SUM: Starts at poles, ends at zeros or infinity.
SUM: Choose K where the locus meets the specification.
SRC: Evans W. R., "Graphical analysis of control systems", Transactions of the American Institute of Electrical Engineers 67(1), 547–551 | primary | 1948
SRC: Ogata K., Modern Control Engineering, 5th edition, Prentice Hall | secondary | 2010
Q: Where does a root locus start and end? | It starts at the open-loop poles and ends at the open-loop zeros or at infinity.
Q: Which real-axis points lie on the root locus? | Points with an odd number of real poles and zeros to their right.
M1#engineering-u09-10-q1@1: What does a root locus plot? | Closed-loop pole positions as a gain varies | Open-loop gain against frequency | Output against time | Error against input | It shows how the closed-loop poles move as K increases.
M2#engineering-u09-10-q2@2: G(s) = K/[s(s + 4)]. At what value of K do the closed-loop poles meet on the real axis? | K = 4 | K = 2 | K = 16 | K = 1 | s^{2} + 4s + K = 0 has a repeated root when 16 − 4K = 0, so K = 4.
NUM3#engineering-u09-10-q3@3: A system has 3 open-loop poles and no zeros. What is the angle of the asymptote nearest the positive real axis, in degrees? | 60 | 0.5 | ° | Angles are (2k + 1)180°/3 = 60°, 180° and 300°.
M3#engineering-u09-10-q4@3: A designer cannot find any gain giving the required damping on the root locus. What should they do? | Add a compensator to reshape the locus | Increase the gain to infinity | Remove the feedback loop | Reverse the sign of all poles | Adding poles and zeros changes the locus shape.
SA3#engineering-u09-10-q5@1,3: Explain how a root locus helps a designer meet an overshoot specification. | Overshoot depends on the damping ratio, which corresponds to a line from the origin at a fixed angle. The designer sketches the root locus, finds where it crosses the line for the required ζ, and calculates the gain at that point using the magnitude condition. If the dominant poles are there, the overshoot is met; if not, a compensator reshapes the locus. | Overshoot and ζ ; Constant damping line ; Intersection ; Gain calculation ; Compensation

## Frequency response and Bode plots
LV: Year 1 · Advanced
S: Frequency response describes how a system responds to sinusoidal inputs of different frequencies. This lesson explains Bode plots, the asymptotes of simple factors, and gain and phase margins as measures of stability.
O: Explain frequency response and how to obtain it from G(jω)
O: Sketch Bode plots for gains, integrators and first-order factors
O: Determine gain and phase margins and interpret them
PRE: Impedance and AC circuit analysis
H: Frequency response
- A stable linear system driven by a sinusoid settles to a sinusoid of the **same frequency**, with amplitude scaled by |G(jω)| and phase shifted by ∠G(jω).
- A **Bode plot** shows magnitude in decibels (20 log_{10}|G|) and phase in degrees against frequency on a logarithmic axis.
H: Building blocks
- A **constant gain** K gives a flat line at 20 log_{10}K dB and zero phase.
- An **integrator** 1/s gives a line falling at −20 dB per decade, with −90° phase.
- A **first-order lag** 1/(1 + s/ω_{c}) is flat below the **corner frequency** ω_{c} and falls at −20 dB per decade above it; at ω_{c} the magnitude is −3 dB and the phase −45°, tending to −90°.
- Factors multiply, so on a Bode plot their dB values and phases **add**.
H: Stability margins
P: For a feedback loop, the **gain margin** is how much the open-loop gain can increase before instability, measured where the phase is −180°. The **phase margin** is how much extra phase lag can be tolerated, measured where the open-loop gain is 0 dB (the gain crossover). Positive margins indicate a stable closed loop for typical systems; designers often aim for a phase margin of 45° to 60° for good damping.
X: A first-order system.
> G(s) = 10/(1 + s/100).
> At low frequency: 20 log_{10}10 = 20 dB, phase 0°.
> At the corner, 100 rad/s: 17 dB, phase −45°.
> At 1,000 rad/s: about 0 dB (falling 20 dB per decade), phase approaching −90°.
K: Frequency response gives gain and phase at each frequency; Bode plots add the dB and phase of simple factors; gain and phase margins measure how close a loop is to instability.
!: Using phase margin alone for systems with several gain crossovers or unusual responses. Margins summarise stability only for typical well-behaved loops.
EV: established | Bode's methods, developed at Bell Laboratories in the 1930s and 1940s, remain central to frequency-domain control design.
T: Bode plot | Plots of magnitude in decibels and phase against log frequency
T: Corner frequency | The frequency at which a first-order factor's asymptotes meet
T: Phase margin | The extra phase lag at gain crossover that would make the loop marginally stable
SUM: Same frequency out, scaled and shifted.
SUM: Bode plots add factors in dB and phase.
SUM: Gain and phase margins measure robustness.
SRC: Bode H. W., Network Analysis and Feedback Amplifier Design, Van Nostrand | primary | 1945
SRC: Franklin G. F., Powell J. D. and Emami-Naeini A., Feedback Control of Dynamic Systems, 8th edition, Pearson | secondary | 2019
Q: What is the slope of a first-order lag above its corner frequency? | −20 dB per decade.
Q: What is the phase margin? | The additional phase lag at the gain crossover frequency that would bring the loop to instability.
M1#engineering-u09-11-q1@1: What is the magnitude in dB of a gain of 100? | 40 dB | 20 dB | 100 dB | 2 dB | In decibels, 20 log_{10}100 = 20 × 2 = 40 dB above unity gain.
M2#engineering-u09-11-q2@2: What is the phase of a first-order lag at its corner frequency? | −45° | −90° | 0° | −180° | At ω = ω_{c}, the phase of 1/(1 + jω/ω_{c}) is −45°.
NUM2#engineering-u09-11-q3@3: A first-order lag has DC gain 1. What is its magnitude at the corner frequency, in dB, to one decimal place? | -3 | 0.1 | dB | |G| = 1/√2, and 20 log_{10}(0.707) is about −3.0 dB.
M3#engineering-u09-11-q4@3: Why do designers aim for a phase margin of about 45° to 60°? | It gives adequate damping and robustness without being too slow | It guarantees zero steady-state error | It maximises overshoot | It makes the system type 2 | Phase margin relates to damping; too little gives large overshoot.
SA3#engineering-u09-11-q5@2,3: Explain how gain and phase margins describe the robustness of a feedback system. | The gain margin is how far the loop gain can rise at the phase crossover (−180°) before the closed loop becomes unstable; the phase margin is how much extra lag at the gain crossover (0 dB) would cause instability. Large margins mean the loop tolerates uncertainty in gain, delays and modelling errors; small margins give oscillatory responses and risk instability. Phase margin also correlates with damping. | Gain margin definition ; Phase margin definition ; Tolerance to uncertainty ; Small margins ; Damping link

## Sensors and actuators
LV: Year 1 · Intermediate
S: Sensors measure the variables a control system needs, and actuators apply its decisions to the physical world. This lesson describes common sensors and actuators, their key characteristics and the signal conditioning that links them to controllers.
O: Describe common sensors for position, speed, force, strain and temperature
O: Explain sensor characteristics such as accuracy, resolution, sensitivity and bandwidth
O: Describe common actuators and the role of signal conditioning
PRE: Introduction to control systems
H: Sensors
- **Position**: potentiometers, linear variable differential transformers (LVDTs) and **encoders** (incremental or absolute).
- **Speed**: tachogenerators and encoders.
- **Force and strain**: **strain gauges** in a Wheatstone bridge; load cells.
- **Temperature**: **thermocouples** (two dissimilar metals producing a voltage, the Seebeck effect), resistance thermometers (RTDs) and thermistors.
- **Acceleration**: MEMS accelerometers.
H: Characteristics
- **Range** and **resolution** (smallest detectable change).
- **Accuracy** (closeness to the true value) versus **precision** (repeatability).
- **Sensitivity** (output change per input change), **linearity** and **hysteresis**.
- **Response time** or **bandwidth**: the sensor must be faster than the dynamics being controlled.
E: ΔR ÷ R = GF × ε :: strain gauge, where GF is the gauge factor and ε the strain
H: Actuators and signal conditioning
P: Actuators include **DC and brushless motors**, **stepper motors** (which move in fixed steps), **servomotors**, **solenoids**, and **hydraulic and pneumatic** cylinders and valves. Sensor signals are usually small and noisy, so **signal conditioning** amplifies, filters and converts them, often to digital form with an analogue-to-digital converter. Actuators need power electronics, such as motor drives using pulse-width modulation.
X: A strain gauge on a beam.
> A strain gauge with gauge factor 2 and resistance 120 Ω is bonded to a beam strained by 500 × 10^{−6}.
> ΔR/R = 2 × 500 × 10^{−6} = 0.001.
> ΔR = 0.001 × 120 = 0.12 Ω, a tiny change.
> A Wheatstone bridge and amplifier convert this into a usable voltage.
K: Control relies on sensors such as encoders, strain gauges and thermocouples, chosen for range, resolution, accuracy and speed, and on actuators such as motors, solenoids and hydraulic cylinders, linked through signal conditioning and power electronics.
!: Confusing accuracy with precision. A sensor can give very repeatable readings that are all wrong by the same amount.
EV: established | Strain gauges, thermocouples and encoders are standard industrial sensors described in measurement texts.
T: Encoder | A sensor producing digital pulses or codes that measure position or speed
T: Gauge factor | The ratio of fractional change in resistance to strain for a strain gauge
T: Signal conditioning | Amplifying, filtering and converting sensor signals for use by a controller
SUM: Sensors measure position, speed, force, strain and temperature.
SUM: Accuracy, resolution, sensitivity and bandwidth matter.
SUM: Actuators and conditioning complete the loop.
SRC: Bolton W., Mechatronics: Electronic Control Systems in Mechanical and Electrical Engineering, 7th edition, Pearson | secondary | 2019
SRC: Morris A. S. and Langari R., Measurement and Instrumentation: Theory and Application, 3rd edition, Academic Press | secondary | 2020
Q: What effect does a thermocouple use? | The Seebeck effect: a junction of two dissimilar metals produces a voltage that depends on temperature.
Q: What is the difference between accuracy and precision? | Accuracy is closeness to the true value; precision is repeatability of readings.
M1#engineering-u09-12-q1@1: Which sensor measures rotational position digitally? | An encoder | A thermocouple | A strain gauge | A solenoid | Encoders output pulses or codes corresponding to angle.
M2#engineering-u09-12-q2@2: Why are strain gauges used in a Wheatstone bridge? | To convert very small resistance changes into a measurable voltage | To increase the strain in the material | To remove the need for any amplifier | To measure temperature directly | The bridge detects tiny changes in resistance accurately.
NUM2#engineering-u09-12-q3@3: A strain gauge has gauge factor 2.1 and resistance 350 Ω. What is ΔR for a strain of 1,000 × 10^{−6}, in Ω? | 0.735 | 0.005 | Ω | ΔR = 2.1 × 0.001 × 350 = 0.735 Ω.
M3#engineering-u09-12-q4@3: Why must a sensor's bandwidth exceed that of the controlled system? | Otherwise it adds lag and hides fast changes, degrading control | A slow sensor always improves stability | Bandwidth only affects the actuator | Sensors never affect the loop dynamics | The sensor is in the loop, so its delay adds phase lag.
SA3#engineering-u09-12-q5@2,3: Choose and justify a sensor and actuator for controlling the position of a robot arm joint. | An absolute or incremental optical encoder on the joint gives high-resolution, digital position (and speed by differentiation) and is fast and robust to noise. A brushless DC servomotor with a gearbox, driven by a PWM motor drive, provides precise, responsive torque. A stepper motor could be used for simple, low-load joints without feedback, but risks missing steps. Signal conditioning and limits protect the system. | Encoder choice ; Resolution and speed ; Servomotor ; Drive electronics ; Alternatives

## Digital control and sampling
LV: Year 1 · Advanced
S: Most modern controllers run on microprocessors that sample signals at discrete times. This lesson explains the structure of a digital control loop, the sampling theorem and aliasing, quantisation and the effect of sampling on control performance.
O: Describe the elements of a digital control loop
O: Apply the sampling theorem and explain aliasing
O: Calculate ADC resolution and explain the effect of sampling on stability
PRE: Feedback and PID control
H: The digital loop
- A sensor signal passes through an **anti-aliasing filter** and an **analogue-to-digital converter (ADC)**.
- A microcontroller runs the control algorithm (such as a discrete PID) at a fixed **sampling period** T.
- The output is sent through a **digital-to-analogue converter** or as **pulse-width modulation**, usually held constant between samples (a **zero-order hold**).
- Digital control is flexible and cheap, allowing complex algorithms, logging and communication.
H: Sampling and aliasing
- The **sampling theorem** (Nyquist and Shannon) states that a signal can be reconstructed from its samples only if the sampling frequency is more than **twice** the highest frequency present.
- Frequencies above half the sampling frequency (the **Nyquist frequency**) appear falsely as lower frequencies: **aliasing**. Anti-aliasing filters remove them before sampling.
- For control, the sampling rate is usually chosen much faster than twice the bandwidth, often 10 to 30 times the closed-loop bandwidth.
H: Quantisation and delay
E: Resolution = full-scale range ÷ 2^{n} :: ADC resolution for an n-bit converter
P: An n-bit ADC has 2^{n} levels, so readings are rounded (**quantisation**). Sampling and computation also add an effective **delay**, about half a sampling period from the hold, which reduces phase margin. If sampling is too slow, a loop that is stable in continuous time can become oscillatory or unstable. Discrete-time analysis uses the **z-transform**.
X: Choosing ADC and sample rate.
> A temperature loop has a 0 to 5 V sensor and a closed-loop bandwidth of about 1 Hz.
> A 12-bit ADC gives a resolution of 5 ÷ 4,096 = 1.22 mV.
> Sampling at 20 to 30 Hz is ample, far above the 2 Hz Nyquist minimum.
> An anti-aliasing filter removes mains interference at 50 Hz before sampling.
K: Digital control samples signals with an ADC, computes control actions and holds outputs; sampling must exceed twice the highest frequency to avoid aliasing, ADC resolution is range over 2^{n}, and sampling delay reduces stability margins.
!: Sampling at just twice the control bandwidth. In practice control loops need much faster sampling to keep delay and phase loss small.
EV: established | The Nyquist–Shannon sampling theorem underpins all digital signal processing and digital control.
T: Sampling period | The time between successive samples in a digital system
T: Aliasing | The misrepresentation of high-frequency signals as lower frequencies due to insufficient sampling
T: Zero-order hold | Holding the output constant between samples
SUM: ADC, algorithm, DAC or PWM, hold.
SUM: Sample above twice the highest frequency; filter first.
SUM: Resolution = range/2^{n}; sampling adds delay.
SRC: Shannon C. E., "Communication in the presence of noise", Proceedings of the IRE 37(1), 10–21 | primary | 1949
SRC: Franklin G. F., Powell J. D. and Workman M. L., Digital Control of Dynamic Systems, 3rd edition, Addison-Wesley | secondary | 1998
Q: What does the sampling theorem state? | A signal must be sampled at more than twice its highest frequency to be reconstructed without aliasing.
Q: What is a zero-order hold? | Holding the controller output constant between sampling instants.
M1#engineering-u09-13-q1@1: What does an ADC do? | Converts an analogue voltage into a digital number | Converts a digital number into a voltage | Filters out noise only | Drives a motor directly | The analogue-to-digital converter lets a processor read sensor signals.
NUM2#engineering-u09-13-q2@2: What is the resolution of a 10-bit ADC with a 0 to 10 V range, in mV? | 9.77 | 0.05 | mV | 10 V ÷ 1,024 = 9.77 mV.
M2#engineering-u09-13-q3@2: A 70 Hz vibration is sampled at 100 Hz. At what frequency does it appear? | 30 Hz | 70 Hz | 170 Hz | 100 Hz | Above the 50 Hz Nyquist frequency it aliases to 100 − 70 = 30 Hz.
M3#engineering-u09-13-q4@3: Why can slow sampling destabilise a control loop? | Sampling and hold add delay that reduces phase margin | Slow sampling increases the loop gain to infinity | It removes the controller from the loop | It makes the sensor more accurate | Extra lag from sampling erodes stability margins.
SA3#engineering-u09-13-q5@2,3: Explain how to choose the sampling rate for a digital control loop. | The rate must exceed twice the highest frequency in the measured signal (after an anti-aliasing filter) to avoid aliasing. For good control, it should be much faster than the closed-loop bandwidth, typically 10 to 30 times, to keep the delay and phase loss from sampling and hold small. Too fast wastes computation and may amplify noise in derivative terms. | Nyquist limit ; Anti-aliasing filter ; Multiple of bandwidth ; Delay and phase ; Practical limits

## Signals and the Fourier series
LV: Year 1 · Advanced
S: Any periodic signal can be built from sinusoids. This lesson introduces the Fourier series, the spectrum of a periodic signal, the square wave example and applications in engineering.
O: Write the trigonometric Fourier series of a periodic signal
O: Interpret the frequency spectrum of a square wave and other signals
O: Describe engineering applications of Fourier analysis
PRE: Frequency response and Bode plots
H: The Fourier series
E: f(t) = a_{0} + Σ [a_{n} cos(nω_{0}t) + b_{n} sin(nω_{0}t)] :: Fourier series with fundamental angular frequency ω_{0} = 2π/T
- Joseph **Fourier** (1822) showed that periodic functions can be expressed as sums of sinusoids.
- a_{0} is the **average (DC) value**; the terms at ω_{0} are the **fundamental**, and those at nω_{0} the **harmonics**.
- **Even** functions contain only cosine terms; **odd** functions only sine terms.
H: The square wave
- A square wave alternating between +A and −A has only **odd** harmonics:
E: f(t) = (4A/π)[sin ω_{0}t + (1/3) sin 3ω_{0}t + (1/5) sin 5ω_{0}t + …] :: Fourier series of a square wave
- Harmonic amplitudes fall as 1/n.
- Adding more terms approaches the square wave, but an overshoot of about 9% near each jump remains: the **Gibbs phenomenon**.
H: Applications
P: The **spectrum** (amplitude of each harmonic) reveals what frequencies a signal contains. Engineers use Fourier analysis to measure **harmonic distortion** in power systems, analyse **vibrations** in machines, design **filters** and process audio and images. Non-periodic signals are analysed with the **Fourier transform**, computed digitally with the **fast Fourier transform (FFT)**. Because linear systems treat each frequency separately, the output can be found by applying the frequency response to each harmonic.
X: A 50 Hz square wave.
> A square wave of amplitude 1 V at 50 Hz is applied to a circuit.
> Fundamental at 50 Hz: amplitude 4/π = 1.27 V.
> Third harmonic at 150 Hz: 1.27/3 = 0.42 V; fifth at 250 Hz: 0.25 V.
> A low-pass filter with a cut-off around 100 Hz would pass mainly the fundamental, leaving a near-sine wave.
K: Periodic signals are sums of a DC term, a fundamental and harmonics; a square wave contains odd harmonics falling as 1/n; Fourier analysis underpins spectrum analysis, filtering, vibration and power quality work.
!: Assuming a square wave contains all harmonics. A symmetric square wave contains only odd harmonics.
EV: established | Fourier analysis, introduced in Fourier's 1822 work on heat, is foundational to signal processing and engineering analysis.
T: Fourier series | A representation of a periodic signal as a sum of sinusoids at multiples of a fundamental frequency
T: Harmonic | A sinusoidal component at an integer multiple of the fundamental frequency
T: Gibbs phenomenon | The persistent overshoot near discontinuities when a Fourier series is truncated
SUM: Periodic signals are sums of sinusoids.
SUM: Square waves have odd harmonics falling as 1/n.
SUM: Fourier methods underpin filtering and spectrum analysis.
SRC: Fourier J., Théorie analytique de la chaleur, Firmin Didot | primary | 1822
SRC: James G., Modern Engineering Mathematics, 5th edition, Pearson | secondary | 2015
Q: Which harmonics does a symmetric square wave contain? | Only odd harmonics (1st, 3rd, 5th, ...).
Q: What is the Gibbs phenomenon? | An overshoot of about 9% near jumps that remains when a Fourier series is truncated.
M1#engineering-u09-14-q1@1: What does the a_{0} term of a Fourier series represent? | The average (DC) value of the signal | The amplitude of the fundamental | The highest frequency present | The phase of the signal | a_{0} is the mean value of the signal taken over one period.
NUM2#engineering-u09-14-q2@2: What is the amplitude of the fundamental of a square wave alternating between +2 V and −2 V, in V? | 2.55 | 0.02 | V | 4A/π = 4 × 2/π = 2.55 V.
M2#engineering-u09-14-q3@2: A 1 kHz square wave is analysed. At which frequency is the second-largest harmonic? | 3 kHz | 2 kHz | 500 Hz | 4 kHz | Only odd harmonics are present, so the next after the fundamental is 3 kHz.
M3#engineering-u09-14-q4@3: Why is Fourier analysis useful for predicting the output of a linear system to a periodic input? | Each harmonic can be passed through the frequency response separately and the results added | Linear systems remove all harmonics | It replaces the need for a model | It only works for sine wave inputs | Superposition lets each frequency component be treated independently.
SA3#engineering-u09-14-q5@1,3: Explain how Fourier analysis can be used to diagnose faults in rotating machinery. | Vibration from a machine is measured with an accelerometer and analysed with an FFT to show its spectrum. Different faults produce characteristic frequencies: imbalance at the running speed, misalignment at twice running speed, bearing defects at specific bearing frequencies, and gear faults at gear-mesh frequencies. Rising amplitude at these frequencies indicates developing faults, allowing maintenance before failure. | Measurement and FFT ; Spectrum ; Fault frequencies ; Trend monitoring ; Predictive maintenance
`;
