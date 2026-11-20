// Unit 6: Oscillations and Vibrations. Format: kit/course/notes.js
export default `
## Periodic motion
S: Periodic motion repeats itself after a fixed time, the period. Pendulums, hearts, planets, AC currents, vibrating atoms and light waves are all periodic, and almost any stable system disturbed slightly will oscillate.
O: Define period, frequency and angular frequency and convert between them
O: Explain why an oscillation needs both a restoring force and inertia
O: Explain why small oscillations about a stable equilibrium are usually simple harmonic
PRE: Trigonometry and circular functions
LV: GCSE and A level · Foundation
H: Describing it
E: f = 1/T; ω = 2πf :: frequency (Hz) and angular frequency (rad s^{-1})
- Period T: time for one complete cycle. Frequency f: cycles per second.
- Oscillation needs a **restoring force** (pulls back towards equilibrium) and **inertia** (makes it overshoot).
- Not all periodic motion is sinusoidal (a bouncing ball, a heartbeat), but any periodic motion is a sum of sinusoids (Fourier).
H: Why oscillation is universal
P: Near a stable equilibrium, any smooth potential energy curve looks like a parabola, U ≈ ½kx^{2}. So small oscillations about any equilibrium are simple harmonic: atoms in solids, molecules, bridges, electrical circuits.
X: A heart beats 72 times a minute. Find f, T and ω.
> f = 72/60 = 1.2 Hz; T = 0.83 s; ω = 2π × 1.2 = 7.5 rad s^{-1}
K: Period and frequency are reciprocals, f = 1/T. Angular frequency ω = 2πf is measured in rad s^{-1}, not Hz.
!: Frequency f and angular frequency ω differ by 2π; mixing them is one of the commonest errors.
T: Period | The time for one complete cycle of a repeating motion, in seconds
T: Frequency | The number of complete cycles per second, f = 1/T, in hertz (Hz)
T: Restoring force | A force that always acts back towards the equilibrium position
SUM: Periodic motion repeats every period T; f = 1/T and ω = 2πf.
SUM: Oscillation needs a restoring force and inertia; near any stable equilibrium the motion is close to simple harmonic.
EV: established | Small oscillations about a stable equilibrium are approximately simple harmonic, because the potential energy near a minimum is approximately quadratic
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: OpenStax, College Physics 2e, section 16.2 "Period and Frequency in Oscillations" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/16-2-period-and-frequency-in-oscillations
Q: What two ingredients does an oscillator need? | A restoring force and inertia.
Q: Why are small oscillations about equilibrium usually simple harmonic? | Near a minimum the potential energy is approximately quadratic.
M1@1: A pendulum makes 20 complete oscillations in 30 s. Its period is: | 1.5 s | 0.67 s | 30 s | 600 s | T = total time ÷ number of cycles = 30/20 = 1.5 s; 0.67 s is the frequency in hertz, not the period.
M2@1: ω = 50 rad s^{-1} corresponds to f = ? | 8.0 Hz | 50 Hz | 314 Hz | 0.13 Hz | f = ω/2π = 50/6.28 = 8.0 Hz; 314 Hz comes from multiplying by 2π instead of dividing.
NUM1@1: A guitar string vibrates at 440 Hz. What is its period in milliseconds? | 2.27 | 2% | ms | T = 1/f = 1/440 s = 2.27 × 10^{-3} s, which is 2.27 ms.
TF2@2: A system with a restoring force but no inertia would still overshoot its equilibrium position and oscillate. | false | Without inertia nothing carries the system past equilibrium: it would simply relax back to equilibrium without overshooting.
M3@3: Why does a marble displaced slightly in any smooth bowl oscillate almost harmonically, whatever the bowl's exact shape? | Near the lowest point the potential energy curve is close to a parabola | The wall pushes on the marble with a force of constant size | Gravity grows in proportion to the marble's height | Friction forces every oscillation to be sinusoidal | Any smooth minimum is approximately U = ½kx^{2}, giving a restoring force proportional to x, which is the condition for SHM.
SA2@2,3: Explain why a mass on a spring oscillates about its equilibrium position instead of simply coming to rest there. | When the mass is displaced, the spring exerts a restoring force towards equilibrium, so the mass accelerates back. At equilibrium the force is zero but the mass is moving, and its inertia carries it past. Beyond equilibrium the restoring force reverses and slows it, then returns it. Kinetic and potential energy are exchanged each cycle. | Restoring force towards equilibrium ; Force is zero at equilibrium but the speed is greatest ; Inertia carries the mass past equilibrium ; Energy is exchanged between kinetic and elastic potential

## Simple harmonic motion
S: Simple harmonic motion (SHM) is oscillation in which the acceleration is proportional to the displacement and directed towards equilibrium. Its displacement varies sinusoidally, and its period doesn't depend on amplitude.
O: State the defining condition for SHM, a = −ω^{2}x
O: Use x = A cos(ωt + φ) and its derivatives to find velocity and acceleration at any time or displacement
O: Calculate the maximum speed and maximum acceleration of an oscillator
PRE: Periodic motion
LV: A level · Foundation
H: Defining equation
E: a = −ω^{2}x :: the condition for SHM
E: x = A cos(ωt + φ)
E: v = −Aω sin(ωt + φ); v = ±ω√(A^{2} − x^{2})
E: a = −Aω^{2} cos(ωt + φ)
- Maximum speed Aω at equilibrium; maximum acceleration Aω^{2} at the extremes.
- Velocity leads displacement by 90°; acceleration is 180° out of phase with displacement.
- The v–t graph is the gradient of the x–t graph, and the a–t graph is the gradient of the v–t graph.
H: Isochronism
P: The period 2π/ω depends only on the system (k/m, g/l), not on the amplitude. Galileo noticed this in a swinging lamp; it made pendulum clocks possible.
X: A mass oscillates with A = 0.05 m at 2.0 Hz. Find v_{max} and a_{max}.
> ω = 4π = 12.6 rad s^{-1}
> v_{max} = Aω = 0.63 m s^{-1}; a_{max} = Aω^{2} = 7.9 m s^{-2}
K: SHM is defined by a = −ω^{2}x: the acceleration is proportional to the displacement and always points back towards equilibrium.
!: SHM requires a ∝ −x exactly. A bouncing ball has periodic motion but isn't SHM (its acceleration is constant while airborne).
P: **Investigate with the lab.** Set damping to zero, pull the mass and release it. Watch the displacement trace and check that the acceleration always points back towards equilibrium.
IX: oscillator
T: Simple harmonic motion | Oscillation in which acceleration is proportional to displacement from equilibrium and directed towards it
T: Isochronous | Having a period that does not depend on the amplitude
SUM: In SHM a = −ω^{2}x, so displacement, velocity and acceleration all vary sinusoidally at the same ω.
SUM: Maximum speed Aω occurs at equilibrium; maximum acceleration Aω^{2} occurs at the extremes.
EV: established | Any system obeying a = −ω^{2}x moves sinusoidally with a period 2π/ω that is independent of amplitude
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: AQA, A-level Physics specification (7408), section 3.6.1.2 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State the defining condition for SHM. | Acceleration is proportional to displacement and opposite in direction: a = −ω^{2}x.
Q: Where is the speed greatest in SHM? | At the equilibrium position.
M1@1: In SHM, acceleration is greatest: | At maximum displacement | At equilibrium | Halfway | It is constant | The size of the acceleration is ω^{2} times the displacement, so it is largest at the extremes and zero at equilibrium.
M2@2: An oscillator has A = 4 cm, ω = 10 rad s^{-1}. Its speed at x = 2 cm is: | 0.35 m s^{-1} | 0.4 m s^{-1} | 0.2 m s^{-1} | 0 | v = ω√(A^{2} − x^{2}) = 10√(0.0016 − 0.0004) = 0.35 m s^{-1}; 0.4 m s^{-1} is the maximum speed, reached only at x = 0.
M2@1: What defines simple harmonic motion? | Acceleration proportional to displacement and directed towards equilibrium | Constant acceleration towards the equilibrium point | Velocity proportional to displacement at all times | Constant speed around a circle of fixed radius | In SHM, a = −ω²x: the restoring acceleration is proportional to displacement and always points back to equilibrium.
NUM2@3: A mass in SHM has amplitude 3.0 cm and period 0.50 s. Find its maximum acceleration. | 4.74 | 3% | m s^{-2} | ω = 2π/0.50 = 12.6 rad s^{-1}, so a_{max} = Aω^{2} = 0.030 × 158 = 4.7 m s^{-2}.
M3@2: An oscillator x = A cos ωt starts at x = A. Where is it, and how is it moving, at t = T/4? | At equilibrium, moving in the negative direction | At x = −A and momentarily at rest | At equilibrium, moving in the positive direction | At x = A/2, moving back towards x = A | At t = T/4, ωt = π/2, so x = A cos(π/2) = 0 and v = −Aω sin(π/2) = −Aω: it passes equilibrium at full speed in the negative direction.
SA3@1,2: Explain why a ball bouncing elastically on a hard floor is periodic but not simple harmonic, whereas a mass on a spring is simple harmonic. | Both repeat, so both are periodic. SHM needs an acceleration proportional to displacement and directed towards equilibrium. The spring gives F = −kx, so a = −(k/m)x, which is SHM. The ball's acceleration is a constant g downwards while it is in the air, whatever its height, with a brief large force at each bounce, so a is not proportional to displacement and its motion is not sinusoidal. | Both motions repeat, so both are periodic ; SHM requires a proportional to −x ; Spring: a = −(k/m)x ; Ball: constant acceleration g while airborne, not proportional to displacement

## Amplitude, frequency, period and phase
S: An oscillation x = A cos(ωt + φ) is fully specified by its amplitude A, angular frequency ω and phase constant φ. Phase tells you where in its cycle an oscillator is, and phase differences describe how two oscillations line up.
O: Identify the amplitude, angular frequency and phase constant in x = A cos(ωt + φ)
O: Find the amplitude and phase constant from the initial displacement and velocity
O: Calculate a phase difference from a time offset
PRE: Simple harmonic motion
LV: A level · Application
H: The parameters
- **Amplitude** A: maximum displacement from equilibrium (set by initial conditions).
- **Angular frequency** ω: set by the system's physics.
- **Phase** ωt + φ: the angle in the cycle; φ is the phase at t = 0.
- Initial conditions fix A and φ: A = √(x_{0}^{2} + (v_{0}/ω)^{2}), tan φ = −v_{0}/(ωx_{0}).
H: Phase difference
E: Δφ = 2πΔt/T
- In phase: Δφ = 0 (or 2π). Antiphase: π. Quadrature: π/2.
- On a phasor diagram, oscillations are rotating vectors; phase difference is the angle between them.
X: Two pendulums of period 2.0 s pass equilibrium (moving right) 0.5 s apart. Find their phase difference.
> Δφ = 2π × 0.5/2.0 = π/2 (90°)
K: The system fixes ω; the starting conditions fix A and φ. Changing how you start an oscillator changes its amplitude and phase but not its period.
!: Phase is often quoted in degrees or fractions of a cycle; check which, and remember 2π rad = 360° = 1 cycle.
P: **Investigate with the lab.** Change the amplitude and check that the period stays the same. Then read the period and work out the frequency from f = 1/T.
IX: oscillator
T: Amplitude | The maximum displacement from the equilibrium position
T: Phase constant | The phase φ of an oscillation at t = 0, fixed by the initial conditions
T: Phase difference | The difference in phase between two oscillations of the same frequency, Δφ = 2πΔt/T
SUM: x = A cos(ωt + φ): ω comes from the system, A and φ from the initial displacement and velocity.
SUM: A time offset Δt between two oscillations of period T is a phase difference 2πΔt/T.
EV: established | Any simple harmonic oscillation is fully described by its amplitude, angular frequency and phase constant
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: OpenStax, University Physics Volume 1, section 15.3 "Comparing Simple Harmonic Motion and Circular Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-3-comparing-simple-harmonic-motion-and-circular-motion
Q: What determines the amplitude and phase of an oscillator? | Its initial conditions (initial displacement and velocity).
Q: What does a phase difference of π mean? | The oscillations are in antiphase: one is at a maximum when the other is at a minimum.
M1@1: x = 0.2 cos(5t + π/3). The amplitude and ω are: | 0.2 m, 5 rad s^{-1} | 5 m, 0.2 rad s^{-1} | 0.2 m, π/3 | 0.4 m, 5 | Compare with x = A cos(ωt + φ): A = 0.2 m and ω = 5 rad s^{-1}; π/3 is the phase constant, not a frequency.
M2@2: An oscillator released from rest at x = A has φ = ? | 0 | π/2 | π | −π/2 | At t = 0, x = A cos φ must equal A, so cos φ = 1 and φ = 0; φ = π would start the motion at x = −A.
M2@1: For an ideal mass-spring oscillator, what happens to the period if you double the amplitude? | It stays the same | It doubles | It halves | It increases by √2 | T = 2π√(m/k) contains no amplitude: SHM is isochronous, so the period is unchanged.
NUM2@3: Two oscillators of period 0.80 s pass through equilibrium in the same direction 0.10 s apart. What is their phase difference in degrees? | 45 | 1 | ° | Δφ = 360° × Δt/T = 360° × 0.10/0.80 = 45°, an eighth of a cycle.
M3@2: An oscillator with ω = 2.0 rad s^{-1} starts at x_{0} = 0.03 m with v_{0} = 0.08 m s^{-1}. Its amplitude is: | 0.05 m | 0.03 m | 0.04 m | 0.07 m | A = √(x_{0}^{2} + (v_{0}/ω)^{2}) = √(0.0009 + 0.0016) = 0.05 m; 0.07 m wrongly adds 0.03 and 0.04 instead of combining them in quadrature.
MATCH1@3: Match each phase difference to what it means. | 0 = in phase, peaks together ; π/2 = a quarter of a cycle apart ; π = antiphase, one peaks as the other troughs ; 3π/2 = three quarters of a cycle apart | One full cycle is 2π, so each phase difference is that fraction of a cycle between matching points of the two oscillations.
SA2@1,2: For a mass-spring oscillator, explain what sets its amplitude, its angular frequency and its phase constant, and how an experimenter could change each. | The angular frequency ω = √(k/m) is set by the spring constant and mass, so it changes only if the spring or mass is changed. The amplitude and phase constant are set by the initial displacement and velocity: pulling the mass further gives a larger amplitude, and choosing when and how it is released (from rest at an extreme, or pushed from equilibrium) sets the phase. | ω set by k and m only ; A and φ set by initial displacement and velocity ; Change ω by changing k or m ; Change A and φ by how and when the mass is released

## Mass-spring systems
S: A mass on a spring is the model simple harmonic oscillator. Hooke's law gives a restoring force proportional to extension, so the motion is SHM with a period set by the mass and the spring constant.
O: Derive and use T = 2π√(m/k)
O: Combine springs in series and in parallel
O: Describe how to measure a spring constant statically and dynamically
PRE: Simple harmonic motion
PRE: Newton's laws of motion
LV: A level · Application
H: Results
E: F = −kx ⇒ ω = √(k/m); T = 2π√(m/k)
- Newton's second law gives ma = −kx, so a = −(k/m)x: SHM with ω^{2} = k/m.
- Vertical springs: gravity just shifts the equilibrium (by mg/k); the period is the same.
- Springs in series: 1/k = 1/k_{1} + 1/k_{2} (softer). In parallel: k = k_{1} + k_{2} (stiffer).
- A spring's own mass adds about one third of its mass: T = 2π√((m + m_{s}/3)/k).
H: Measuring k
- Static: hang masses and plot extension against load; the gradient is 1/k.
- Dynamic: time several oscillations for each mass and plot T^{2} against m; the gradient is 4π^{2}/k.
X: A 0.25 kg mass on a spring of k = 100 N m^{-1}. Find T. How does it change with 1.0 kg?
> T = 2π√(0.25/100) = 0.31 s
> Quadrupling m doubles T: 0.63 s
K: T = 2π√(m/k): heavier masses and softer springs oscillate more slowly, and neither the amplitude nor g appears.
!: Cutting a spring in half doubles its spring constant; each half stretches half as much under the same force.
P: **Investigate with the lab.** Double the mass and see the period grow by √2, not 2. Then double the spring constant instead and compare.
IX: oscillator
T: Spring constant | The force needed per unit extension of a spring, k = F/x, in N m^{-1}
T: Hooke's law | The extension of a spring is proportional to the applied force, up to the limit of proportionality
SUM: Hooke's law plus Newton's second law gives SHM with T = 2π√(m/k).
SUM: Series springs are softer, parallel springs stiffer; a vertical spring has the same period as a horizontal one.
EV: established | A mass on an ideal spring obeying Hooke's law performs SHM with period 2π√(m/k)
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: AQA, A-level Physics specification (7408), section 3.6.1.3 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the period of a mass–spring oscillator? | T = 2π√(m/k).
Q: Does gravity change the period of a vertical spring oscillator? | No, it only shifts the equilibrium position.
M1@2: Two identical springs (k each) in series have combined constant: | k/2 | 2k | k | k/4 | 1/k_{tot} = 1/k + 1/k = 2/k, so k_{tot} = k/2: each spring carries the full force, so the total extension doubles.
M2@1: To halve the period of a mass–spring system, the mass must be: | Quartered | Halved | Doubled | Unchanged | T ∝ √m, so halving T needs √m halved, which means dividing the mass by four.
M2@1: A mass-spring system has period 2.0 s. The mass is quadrupled. What is the new period? | 4.0 s | 8.0 s | 2.8 s | 1.0 s | T = 2π√(m/k), so four times the mass doubles the period.
NUM2@1: A 0.40 kg mass oscillates on a spring with period 0.80 s. Find the spring constant. | 24.7 | 3% | N m^{-1} | k = 4π^{2}m/T^{2} = 39.5 × 0.40/0.64 = 24.7 N m^{-1}.
M3@2: A mass hangs from two identical springs side by side. One spring is removed, leaving the mass on the other alone. The period: | Increases by a factor of √2 | Doubles | Halves | Decreases by a factor of √2 | Side by side (parallel) the stiffness is 2k; removing one halves k, and T ∝ 1/√k, so the period rises by √2.
SEQ2@3: Put the steps of the dynamic method for measuring k in order. | Hang a known mass and displace it slightly ; Time ten oscillations and divide by ten ; Repeat for several different masses ; Plot T^{2} against m ; Calculate k = 4π^{2}/gradient | Timing many oscillations cuts the reaction-time uncertainty, and the straight line T^{2} = (4π^{2}/k)m gives k from its gradient.
SA3@1: Derive the period of a mass-spring oscillator from Hooke's law and Newton's second law. | The restoring force is F = −kx. Newton's second law gives ma = −kx, so a = −(k/m)x. This has the SHM form a = −ω^{2}x with ω^{2} = k/m, so ω = √(k/m) and T = 2π/ω = 2π√(m/k). | Hooke's law F = −kx ; ma = −kx gives a = −(k/m)x ; Compare with a = −ω^{2}x so ω = √(k/m) ; T = 2π/ω = 2π√(m/k)

## Simple and physical pendulums
S: A simple pendulum is a point mass on a light string; a physical (compound) pendulum is any rigid body swinging about a pivot. For small angles both do SHM, with periods set by length, gravity and (for the physical pendulum) the mass distribution.
O: Show that a simple pendulum performs SHM for small angles and use T = 2π√(l/g)
O: Calculate the period of a physical pendulum from its moment of inertia
O: Explain why the period grows at large amplitude
PRE: Moment of inertia
LV: A level · Application
H: Simple pendulum
P: The restoring force along the arc is −mg sin θ. For small θ (in radians) sin θ ≈ θ = x/l, so a ≈ −(g/l)x: SHM with ω^{2} = g/l.
E: T = 2π√(l/g) :: small angles
E: T ≈ 2π√(l/g)(1 + θ_{0}^{2}/16 + …) :: amplitude correction
- Independent of mass and (for small swings) amplitude.
- A "seconds pendulum" (T = 2 s) is about 0.994 m long.
H: Physical pendulum
E: T = 2π√(I/(Mgd)) :: d = pivot to centre of mass
- Equivalent simple length l_{eq} = I/(Md). The point at l_{eq} from the pivot is the centre of percussion: hit there and the pivot feels no jolt (the bat's sweet spot).
- Kater's reversible pendulum measures g precisely using two pivots with equal periods.
X: A 1.0 m uniform rod swings from one end. Find T.
> I = ML^{2}/3, d = L/2 ⇒ T = 2π√(2L/(3g)) = 2π√(0.068) = 1.64 s
> A simple pendulum of length 1.0 m: 2.01 s
K: The small-angle period depends only on l and g. Mass cancels because both the restoring force and the inertia are proportional to it.
!: The small-angle formula underestimates the period at large amplitude: 0.5% too short at 16°, 1.7% at 30°.
P: **Investigate with the lab.** Release from 10° or less and check that the exact period agrees with 2π√(L/g) to within 0.2%. Then make the pendulum four times longer and see the period double.
IX: pendulum
T: Simple pendulum | A point mass on a light, inextensible string swinging under gravity
T: Physical pendulum | A rigid body swinging about a fixed pivot, with period 2π√(I/(Mgd))
T: Small-angle approximation | sin θ ≈ θ for small angles measured in radians
SUM: For small angles a simple pendulum does SHM with T = 2π√(l/g), independent of mass.
SUM: A physical pendulum's period depends on its moment of inertia about the pivot; large swings lengthen any pendulum's period.
EV: established | For small amplitudes a pendulum's period is 2π√(l/g), independent of the mass of the bob
SRC: OpenStax, University Physics Volume 1, section 15.4 "Pendulums" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums
SRC: AQA, A-level Physics specification (7408), section 3.6.1.3 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the period of a physical pendulum? | T = 2π√(I/(Mgd)).
Q: What is the centre of percussion? | The point where an impact produces no reaction at the pivot (the sweet spot).
M1@1: A pendulum's period on the Moon (g = 1.6) compared with Earth (9.8): | About 2.5 times longer | The same | 6 times longer | Shorter | T ∝ 1/√g, so the ratio is √(9.8/1.6) = √6.1 ≈ 2.5; a factor of 6 is the ratio of the g values, not of the periods.
M2@1: Doubling the mass of a simple pendulum's bob changes its period: | Not at all | ×2 | ×√2 | ×1/2 | Mass cancels: the restoring force mg sin θ and the inertia are both proportional to m, so T = 2π√(l/g).
M2@1: A pendulum's length is quadrupled. What happens to its small-angle period? | It doubles | It quadruples | It halves | It stays the same | T = 2π√(L/g), so four times the length doubles the period.
NUM2@1: A pendulum 0.800 m long makes 20 oscillations in 35.9 s. Find g. | 9.80 | 1% | m s^{-2} | T = 35.9/20 = 1.795 s, so g = 4π^{2}l/T^{2} = 39.48 × 0.800/3.222 = 9.80 m s^{-2}.
TF2@2: A uniform rod pivoted at one end has a shorter period than a simple pendulum of the same length. | true | The rod's equivalent length is I/(Md) = 2L/3, shorter than L, so for L = 1.0 m it swings with T = 1.64 s against 2.01 s.
M3@3: A pendulum clock keeps perfect time with a 3° swing. Its swing grows to 10°. The clock now: | Runs slow, because the period lengthens at larger amplitude | Runs fast, because the bob moves faster at the bottom | Keeps time, because the period is independent of amplitude | Runs slow, because the string stretches more on wide swings | T ≈ T_{0}(1 + θ_{0}^{2}/16): a bigger swing gives a longer period, so the clock loses time. Independence of amplitude holds only in the small-angle limit.
SA2@1: Describe how you would use a simple pendulum to measure g accurately, including how you would reduce the uncertainty. | Measure the length from the pivot to the centre of the bob with a metre rule. Release from a small angle (under about 10°) and time at least 20 oscillations from the centre of the swing, using a fiducial marker, then divide. Repeat for several lengths and plot T^{2} against l; the gradient is 4π^{2}/g, so g = 4π^{2}/gradient. | Small angles so the SHM formula applies ; Time many oscillations and repeat ; Length measured to the centre of the bob ; Plot T^{2} against l and use g = 4π^{2}/gradient

## Energy in oscillatory systems
S: An undamped oscillator continually exchanges kinetic and potential energy while the total stays constant. Total energy is proportional to the square of the amplitude, which is why amplitude is a measure of an oscillator's energy.
O: Calculate the total, kinetic and potential energy of an oscillator at any displacement
O: Describe how kinetic and potential energy vary with displacement and with time
O: Use an energy method to find the frequency of an oscillating system
PRE: Kinetic and potential energy
PRE: Simple harmonic motion
LV: A level · Application
H: Energy in SHM
E: E = ½kA^{2} = ½mω^{2}A^{2}
E: KE = ½k(A^{2} − x^{2}); PE = ½kx^{2}
- Against displacement: PE is a parabola, KE an inverted parabola, and their sum a horizontal line.
- Against time: KE and PE each oscillate at 2ω (twice the oscillation frequency).
- Time-averaged KE = time-averaged PE = E/2.
H: Energy method for frequency
P: If the energy can be written as E = ½M_{eff}ẋ^{2} + ½K_{eff}x^{2}, then ω = √(K_{eff}/M_{eff}). This quickly gives periods for systems with springs, pulleys and rolling parts.
X: A 0.5 kg mass on a spring (k = 200 N m^{-1}) has A = 0.1 m. Find E and the speed at x = 0.06 m.
> E = ½ × 200 × 0.01 = 1.0 J
> KE = 1.0 − ½ × 200 × 0.0036 = 0.64 J ⇒ v = 1.6 m s^{-1}
K: In undamped SHM the total energy ½kA^{2} is constant; it moves between kinetic (all of it at equilibrium) and potential (all of it at the extremes).
!: Doubling the amplitude quadruples the energy, not doubles it.
P: **Investigate with the lab.** Watch the kinetic and potential energy bars swap during each cycle with no damping, then switch damping on and watch the total fall.
IX: oscillator
T: Total mechanical energy | The sum of kinetic and potential energy, constant for an undamped oscillator
T: Effective mass | The coefficient M_{eff} in a system's kinetic energy ½M_{eff}ẋ^{2}, used in the energy method
SUM: E = ½kA^{2}: energy is proportional to amplitude squared.
SUM: KE and PE swap twice per cycle, each averaging half the total.
EV: established | The total energy of an undamped simple harmonic oscillator is constant and equal to ½kA^{2}
SRC: OpenStax, University Physics Volume 1, section 15.2 "Energy in Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-2-energy-in-simple-harmonic-motion
SRC: AQA, A-level Physics specification (7408), section 3.6.1.3 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How does an oscillator's energy depend on its amplitude? | E ∝ A^{2}.
Q: At what frequency do KE and PE oscillate in SHM? | Twice the oscillation frequency.
M1@1: At x = A/2 in SHM, what fraction of the energy is kinetic? | 3/4 | 1/2 | 1/4 | 1/√2 | PE = ½k(A/2)^{2} is a quarter of ½kA^{2}, so the remaining three quarters is kinetic; 1/4 is the potential fraction.
M2@1: An oscillator's amplitude is tripled. Its energy: | ×9 | ×3 | ×√3 | ×27 | E = ½kA^{2}, so tripling A multiplies the energy by 3^{2} = 9.
M2@2: In undamped SHM, where is the kinetic energy greatest? | At the equilibrium position | At maximum displacement | Halfway to maximum displacement | It is the same everywhere | Speed is greatest at equilibrium, where all the energy is kinetic.
NUM2@1: A 0.20 kg mass on a spring with k = 80 N m^{-1} oscillates with amplitude 0.050 m. What is its maximum speed? | 1.0 | 2% | m s^{-1} | E = ½kA^{2} = 0.10 J; at equilibrium ½mv^{2} = 0.10 J, so v = √(2 × 0.10/0.20) = 1.0 m s^{-1} (check: Aω = 0.05 × 20).
M3@3: A solid cylinder of mass M rolls without slipping on a horizontal surface, attached to a spring k at its axle. Its kinetic energy is ¾Mẋ^{2}. Its angular frequency is: | √(2k/(3M)) | √(k/M) | √(3k/(2M)) | √(k/(2M)) | With E = ½(3M/2)ẋ^{2} + ½kx^{2}, M_{eff} = 3M/2, so ω = √(k/M_{eff}) = √(2k/(3M)); rotation adds inertia and slows it.
SA2@2: Describe how the kinetic, potential and total energy of an undamped mass-spring oscillator vary during one cycle, starting from release at maximum displacement. | At release all the energy ½kA^{2} is elastic potential and the KE is zero. As the mass moves to equilibrium the PE falls and the KE rises until, at x = 0, all the energy is kinetic. It then converts back to PE, reaching zero KE at the opposite extreme, and the process repeats. The total stays constant, and KE and PE each go through two maxima per cycle. | Starts with all PE, zero KE ; All KE at equilibrium ; Total energy constant throughout ; KE and PE oscillate at twice the oscillation frequency

## Damped oscillations
S: Real oscillators lose energy to friction, air resistance or electrical resistance, so their amplitude decays. With damping proportional to velocity the amplitude falls exponentially and the frequency drops slightly.
O: Write the equation of motion of a viscously damped oscillator and describe its solution
O: Calculate a damping constant from the decay of amplitude
O: Distinguish exponential (viscous) from linear (dry friction) amplitude decay
PRE: Energy in oscillatory systems
LV: Year 1 · Application
H: The damped oscillator
E: mẍ + bẋ + kx = 0 ⇒ ẍ + γẋ + ω_{0}^{2}x = 0, γ = b/m
E: x = A_{0}e^{−γt/2} cos(ω_{d}t + φ), ω_{d} = √(ω_{0}^{2} − γ^{2}/4)
E: E(t) = E_{0}e^{−γt} :: energy decays twice as fast as amplitude
- Amplitude time constant 2/γ; energy time constant 1/γ.
- Logarithmic decrement δ = ln(A_{n}/A_{n+1}) = γT_{d}/2.
H: Other damping
- Dry (Coulomb) friction: amplitude decreases linearly by a fixed amount each cycle.
- Quadratic drag: decay faster at large amplitude.
X: A pendulum's amplitude falls from 10° to 5° in 40 s. Find γ and the time for energy to fall to 1%.
> e^{−γ × 40/2} = 0.5 ⇒ γ = 2 ln 2/40 = 0.035 s^{-1}
> Energy: e^{−γt} = 0.01 ⇒ t = 4.6/0.035 = 133 s
K: Viscous damping removes the same fraction of the amplitude every cycle, so successive peaks form a geometric sequence and the envelope is exponential.
!: Damping changes the frequency only slightly for light damping; the big effect is on the amplitude.
P: **Investigate with the lab.** Add a little damping and watch the amplitude decay. Check that each peak is the same fraction of the one before.
IX: oscillator
T: Damping | The loss of an oscillator's energy to its surroundings, which makes the amplitude decrease
T: Logarithmic decrement | The natural log of the ratio of successive peak amplitudes, δ = γT_{d}/2
SUM: With damping force −bẋ the amplitude decays as e^{−γt/2} and the energy as e^{−γt}.
SUM: Light damping lowers the frequency only slightly; dry friction gives linear rather than exponential decay.
EV: established | A velocity-proportional damping force makes an oscillator's amplitude decay exponentially
SRC: OpenStax, University Physics Volume 1, section 15.5 "Damped Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations
SRC: AQA, A-level Physics specification (7408), section 3.6.1.3 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How does amplitude decay for viscous damping? | Exponentially, as e^{−γt/2}.
Q: What is the logarithmic decrement? | The natural log of the ratio of successive amplitudes.
M1@1: Light damping makes the oscillation frequency: | Slightly lower | Slightly higher | Unchanged exactly | Zero | ω_{d} = √(ω_{0}^{2} − γ^{2}/4) is a little below ω_{0}, so light damping lowers the frequency very slightly.
M2@3: Friction (constant force) damping makes amplitude decrease: | Linearly with time | Exponentially | Not at all | Quadratically | A constant friction force removes a fixed amount of amplitude each cycle, so the decay is linear, not exponential.
M2@3: How does the amplitude of a lightly damped oscillator decrease? | Exponentially, by the same fraction each cycle | Linearly, by the same amount each cycle | It stays constant until the motion stops suddenly | It drops to zero after one cycle | Viscous damping removes a fixed fraction of the amplitude per cycle, giving exponential decay.
NUM2@2: Successive peaks of a damped oscillator are 8.0 cm and 6.0 cm, one period of 0.50 s apart. Find γ. | 1.15 | 3% | s^{-1} | δ = ln(8/6) = 0.288 = γT_{d}/2, so γ = 2 × 0.288/0.50 = 1.15 s^{-1}.
M3@2: An oscillator's amplitude halves in 10 s. How long does its energy take to fall to a quarter? | 10 s | 20 s | 5 s | 40 s | Energy ∝ amplitude^{2}, so when the amplitude halves the energy falls to a quarter: the same 10 s. 20 s is the tempting answer from treating energy like amplitude.
SA3@2,3: Peak amplitudes of a damped pendulum are recorded each cycle. Explain how you would decide whether the damping is mainly viscous or mainly dry friction, and how you would find γ. | Plot the peak amplitudes against time (or cycle number). If they fall by equal amounts each cycle (a straight line), dry friction dominates. If they fall by equal fractions, the damping is viscous: then a graph of ln A against t is a straight line whose gradient is −γ/2, so γ = −2 × gradient. | Viscous: equal fractions per cycle ; Dry friction: equal amounts per cycle (linear) ; Plot ln A against t for a straight line ; Gradient −γ/2 gives γ

## Underdamping, critical damping and overdamping
S: How strongly an oscillator is damped decides whether it oscillates as it settles. Underdamped systems ring, critically damped systems return fastest without overshooting, and overdamped systems creep back slowly.
O: Classify a system as underdamped, critically damped or overdamped from its damping ratio
O: Calculate the critical damping coefficient of a mass-spring system
O: Explain why engineers choose particular damping for suspensions, meters and instruments
PRE: Damped oscillations
LV: Year 1 · Application
H: The three regimes (ζ = γ/(2ω_{0}), the damping ratio)
- **Underdamped** (ζ < 1): oscillates with decaying amplitude.
- **Critically damped** (ζ = 1): x = (A + Bt)e^{−ω_{0}t}; fastest return without overshoot.
- **Overdamped** (ζ > 1): sum of two decaying exponentials; slow, no oscillation.
E: b_{c} = 2√(km) = 2mω_{0} :: critical damping coefficient
H: Design choices
- Car suspension: underdamped (typically ζ ≈ 0.2–0.4) for comfort and grip; worn shock absorbers make the car bounce.
- Analogue meters, door closers and building dampers: near critical, so they settle quickly.
- Musical instruments and clocks: very lightly damped, to ring.
X: A 2.0 kg mass on a spring (k = 50 N m^{-1}). What damping constant b gives critical damping?
> b_{c} = 2√(km) = 2√100 = 20 kg s^{-1}
K: Critical damping (ζ = 1) is the boundary between oscillating and not: it gives the quickest return to equilibrium with no overshoot.
!: Critical damping isn't "the most damping"; overdamped systems are slower to return.
P: **Investigate with the lab.** Increase the damping until the mass returns fastest with no overshoot: that is critical damping. Go beyond it and see the return slow down.
IX: oscillator
T: Damping ratio | ζ = γ/(2ω_{0}) = b/(2√(km)), the damping compared with the critical value
T: Critical damping | The damping at which a displaced system returns to equilibrium fastest without oscillating
T: Overdamping | Damping above critical: the system returns slowly with no oscillation
SUM: ζ < 1 rings, ζ = 1 returns fastest without overshoot, ζ > 1 creeps back.
SUM: For a mass-spring system b_{c} = 2√(km); design picks ζ to suit the job.
EV: established | A damped linear oscillator is underdamped, critically damped or overdamped according to whether its damping ratio is below, equal to or above one
SRC: OpenStax, University Physics Volume 1, section 15.5 "Damped Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations
SRC: OpenStax, College Physics 2e, section 16.7 "Damped Harmonic Motion" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/16-7-damped-harmonic-motion
Q: What is critical damping? | The damping that returns a system to equilibrium fastest without oscillating.
Q: What is the critical damping coefficient for a mass–spring system? | b_{c} = 2√(km).
M1@1: A system with damping ratio 3 is: | Overdamped | Underdamped | Critically damped | Undamped | ζ = 3 is greater than 1, so the system is overdamped: it returns without oscillating, but slowly.
M2@3: Why are car suspensions slightly underdamped rather than overdamped? | Overdamped suspensions react too slowly to bumps | Underdamping removes all bounce | It's cheaper | Critical damping is impossible | An overdamped suspension is slow to recover from one bump before the next; light underdamping responds quickly and settles within about a cycle.
M2@1: Which damping returns a displaced system to equilibrium fastest without overshooting? | Critical damping | Heavy overdamping | Light underdamping | No damping at all | Critical damping gives the quickest return with no oscillation; overdamping is slower.
NUM2@2: A 0.50 kg mass on a spring of k = 200 N m^{-1} has a damper with b = 4.0 kg s^{-1}. What is its damping ratio? | 0.2 | 3% |  | b_{c} = 2√(km) = 2√100 = 20 kg s^{-1}, so ζ = b/b_{c} = 4.0/20 = 0.2: underdamped.
M3@3: An analogue voltmeter's needle overshoots and swings several times before settling. The best fix is to: | Increase the damping to near critical | Remove all damping so it moves freely | Make the damping much greater than critical | Use a stiffer needle with the same damping | The needle is underdamped; damping close to critical settles it fastest without overshoot, whereas heavy overdamping makes it creep slowly to the reading.
SA2@1,3: Sketch in words the displacement–time graphs of an underdamped, a critically damped and an overdamped system released from the same displacement, and give one use of each. | Underdamped: oscillates about zero with an exponentially shrinking envelope (a guitar string, a clock pendulum). Critically damped: falls smoothly to zero in the shortest time with no overshoot (a door closer or meter needle). Overdamped: falls smoothly but more slowly than critical, with no overshoot (a heavy door damper or a fluid-filled shock that must never bounce). | Underdamped oscillates with decaying envelope ; Critical: fastest return without overshoot ; Overdamped: slower return without overshoot ; A sensible use for each

## Driven oscillations
S: A periodic driving force makes an oscillator vibrate at the driving frequency, not its natural one. After transients die away, the steady-state amplitude and phase depend on how the driving frequency compares with the natural frequency.
O: State that the steady-state response is at the driving frequency
O: Describe how the amplitude and phase lag change from below to above the natural frequency
O: Explain why power transfer is greatest when the force is in phase with the velocity
PRE: Damped oscillations
LV: Year 1 · Physical reasoning
H: The driven damped oscillator
E: mẍ + bẋ + kx = F_{0} cos ωt
E: A(ω) = (F_{0}/m)/√[(ω_{0}^{2} − ω^{2})^{2} + γ^{2}ω^{2}]
E: tan δ = γω/(ω_{0}^{2} − ω^{2}) :: phase lag of displacement behind the force
- Well below ω_{0}: x follows F in phase, A ≈ F_{0}/k (stiffness-controlled).
- At ω_{0}: lag 90°, A = F_{0}/(bω_{0}) (damping-controlled); velocity in phase with force, maximum power absorbed.
- Well above ω_{0}: lag 180°, A ≈ F_{0}/(mω^{2}) (mass-controlled).
H: Why timing matters
X: Why does a child on a swing need pushes timed with the swing?
> Power absorbed = F·v; maximised when force is in phase with velocity
> That happens when driving at the natural frequency
K: In the steady state a driven oscillator moves at the driving frequency; its natural frequency only decides how big the response is and how far it lags.
!: The general solution includes a transient at the natural frequency; at start-up the motion can look messy before the steady state appears.
P: **Investigate with the lab.** Switch on the driving force and set a frequency well below, then well above, the natural frequency. Compare the steady amplitude and the phase of the motion.
IX: oscillator
T: Forced (driven) oscillation | Oscillation maintained by a periodic external force, at the force's frequency
T: Natural frequency | The frequency at which a system oscillates when displaced and left free
T: Steady state | The motion left once the start-up transient has decayed
SUM: Driven oscillators settle to the driving frequency; the transient at ω_{0} dies away.
SUM: The lag rises from 0 through 90° at ω_{0} to 180°; the response is stiffness-, damping- then mass-controlled.
EV: established | A linear damped oscillator driven sinusoidally settles to oscillate at the driving frequency with an amplitude and phase set by the frequency ratio and damping
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: OpenStax, College Physics 2e, section 16.8 "Forced Oscillations and Resonance" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/16-8-forced-oscillations-and-resonance
Q: At what frequency does a driven oscillator vibrate in steady state? | The driving frequency.
Q: What is the phase lag at resonance? | 90° (displacement lags force; velocity is in phase with it).
M1@2: Driving far above resonance, the displacement is: | Small and in antiphase with the force | Large and in phase | Zero | At the natural frequency | Far above ω_{0} the mass's inertia dominates: A ≈ F_{0}/(mω^{2}) is small and the displacement lags the force by nearly 180°.
M2@2: At very low driving frequency, the amplitude is about: | F_{0}/k | F_{0}/b | 0 | Infinite | Driven very slowly, the spring just follows the force as if it were static, so x ≈ F/k and A ≈ F_{0}/k.
M2@2: A system is driven far below its natural frequency. How does its displacement compare with the driving force? | Nearly in phase, with small amplitude | Exactly 90° out of phase | In antiphase, with large amplitude | It has no steady motion at all | At low driving frequency the system follows the force closely, nearly in phase.
TF1@1: Once transients have died away, a driven oscillator vibrates at its own natural frequency whatever the driving frequency. | false | In the steady state the oscillator moves at the driving frequency; motion at the natural frequency is the transient that decays away.
M3@3: A driven oscillator is at resonance, with its displacement lagging the force by 90°. Why does it absorb power at the greatest rate? | Its velocity is then in phase with the force | Its displacement is then in phase with the force | Its acceleration is then zero at every instant | The driving force then does no work at all | Velocity leads displacement by 90°, so a 90° displacement lag puts velocity in phase with the force; power F·v is then positive throughout the cycle.
SA3@2,3: A mass on a spring is driven by a vibration generator whose frequency is slowly increased from well below to well above the natural frequency. Describe and explain how the amplitude and phase of the mass's motion change. | At low frequency the mass follows the generator nearly in phase with an amplitude about F_{0}/k, set by the spring stiffness. As the frequency approaches ω_{0} the amplitude rises to a peak limited only by damping, and the displacement lags by 90°, so the velocity is in phase with the force and energy is fed in fastest. Above ω_{0} the amplitude falls because the mass's inertia dominates, and the lag approaches 180°. | Low frequency: in phase, A about F_{0}/k ; Near ω_{0}: large amplitude limited by damping, 90° lag ; Velocity in phase with force at resonance ; High frequency: small amplitude, lag near 180°

## Resonance
S: Resonance is the large response of a system driven at (or near) its natural frequency. It's harnessed in musical instruments, radios, MRI and lasers, and guarded against in bridges, buildings and engines.
O: Explain resonance in terms of energy transfer from the driver
O: Describe how damping affects the height, width and position of a resonance peak
O: Give examples of useful and harmful resonance and how harmful resonance is controlled
PRE: Driven oscillations
LV: A level · Application
H: Key features
E: ω_{res} = √(ω_{0}^{2} − γ^{2}/2) :: amplitude peak (≈ ω_{0} for light damping)
- Peak height ∝ 1/γ: less damping, taller and sharper peak.
- Energy builds up over many cycles because each push adds energy in phase.
H: Useful resonance
- Tuning a radio: an LC circuit selects one frequency.
- Musical instruments: air columns and strings resonate at their harmonics.
- MRI excites nuclear spins at the Larmor frequency.
- Quartz crystals in watches resonate at 32 768 Hz.
H: Harmful resonance
- Tacoma Narrows Bridge (1940): wind drove a torsional mode (aeroelastic flutter, a self-excited oscillation).
- London Millennium Bridge (2000): pedestrians synchronised their steps with the bridge's sway; fixed with dampers.
- Engines and washing machines: avoid running at structural resonances; use mass dampers.
X: Why can a singer break a wine glass?
> The glass has a lightly damped mode (high Q) near 500–1000 Hz
> A loud note at exactly that frequency builds the vibration until the strain exceeds the breaking strain
K: At resonance the driver feeds energy in on every cycle; the amplitude grows until the energy lost to damping per cycle equals the energy supplied, so damping sets the peak.
!: Resonance needs matching frequency and low enough damping; a loud sound at the wrong frequency does little.
!: Microwave ovens are often said to work by resonance with water molecules. They don't: at 2.45 GHz, far from any sharp resonance, the oscillating field heats water by dielectric (polarisation) losses.
P: **Investigate with the lab.** Tune the driving frequency to within 2% of resonance and watch the amplitude grow. Then add damping and see the peak fall and widen.
IX: oscillator
T: Resonance | A large-amplitude response when the driving frequency is close to a system's natural frequency
T: Resonant frequency | The driving frequency at which the amplitude is greatest, slightly below ω_{0} for a damped system
T: Tuned mass damper | An auxiliary oscillator tuned to absorb energy from a structure's resonant mode
SUM: Driving at the natural frequency feeds energy in every cycle, giving a large response limited by damping.
SUM: More damping gives a lower, broader peak at a slightly lower frequency.
EV: established | A lightly damped system driven near its natural frequency responds with an amplitude limited mainly by damping
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: AQA, A-level Physics specification (7408), section 3.6.1.4 | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is resonance? | A large-amplitude response when a system is driven at or near its natural frequency.
Q: How does damping affect a resonance peak? | More damping makes the peak lower and broader, and shifts it slightly to lower frequency.
M1@3: Soldiers break step crossing bridges to avoid: | Driving a resonance | Friction | Noise | Overloading | Marching in step applies a periodic force; if its frequency matched a natural mode of the bridge, energy would build up in that mode.
M2@2: Reducing damping in a resonant system makes the peak: | Taller and narrower | Shorter and wider | Move to higher frequency | Disappear | The peak amplitude is proportional to 1/γ and the width to γ, so less damping gives a taller, sharper peak.
M2@2: What does increasing the damping do to a resonance peak? | Lowers it and makes it broader | Raises it and makes it sharper | Moves it to a much higher frequency | Has no effect on its height | More damping removes energy faster, so the peak amplitude falls and the resonance broadens.
MS2@3: Which of these are examples of resonance being put to use? | Tuning a radio with an LC circuit ; Timekeeping with a quartz crystal ; Exciting nuclear spins in MRI | Breaking step on a bridge ; Fitting dampers to a footbridge ; Mounting a machine on soft springs | The radio, quartz watch and MRI all rely on a sharp resonance; the others are ways of avoiding or suppressing resonance.
M3@1: A footbridge has a lateral mode at 1.0 Hz. Why might a crowd make it sway strongly even though people walk at about 2 steps per second? | Sideways force from walking repeats once per stride, at about 1 Hz | Each step pushes downward at exactly 1 Hz | The crowd's weight lowers the natural frequency to 2 Hz | Footsteps produce sound waves that drive the bridge | Each foot pushes sideways in opposite directions, so the lateral force repeats once per two steps (about 1 Hz), matching the mode; this is what happened on the Millennium Bridge.
SA3@1,2: Explain why the amplitude of a driven oscillator at resonance does not grow without limit, and how adding damping changes the resonance curve. | At resonance the driving force is in phase with the velocity, so the driver does positive work every cycle and the amplitude grows. The energy lost to damping per cycle increases with amplitude, so the amplitude rises until the energy lost per cycle equals the energy supplied; that sets the peak. More damping makes this balance occur at a smaller amplitude, so the peak is lower, broader, and moves slightly below the natural frequency. | Driver supplies energy each cycle at resonance ; Damping losses grow with amplitude ; Steady amplitude when loss equals input ; More damping: lower, broader peak at slightly lower frequency

## Quality factor
S: The quality factor Q measures how lightly damped an oscillator is: how many cycles it rings for, and how sharp its resonance peak is. High-Q systems store energy well and select frequencies precisely.
O: Define Q from the resonance width and from energy loss per cycle
O: Calculate Q from a bandwidth or a ringing time
O: Explain the trade-off between sharp frequency selection and slow response
PRE: Resonance
LV: Year 1 · Application
H: Definitions
E: Q = ω_{0}/γ = ω_{0}/Δω :: Δω = full width of the power resonance at half maximum
E: Q = 2π × (energy stored)/(energy lost per cycle)
- Amplitude decays by 1/e in about Q/π cycles.
- At resonance, the amplitude is Q times the low-frequency (static) response.
H: Typical Q values
- Car suspension ~1; guitar string ~10^{3}; tuning fork ~10^{3}–10^{4}.
- Quartz crystal ~10^{5}–10^{6}; superconducting microwave cavity ~10^{10}; optical atomic clock transitions ~10^{17}.
X: A tuning fork at 440 Hz rings for about 10 s before its sound energy falls to 1/e. Estimate Q.
> Energy decay time τ = 1/γ = 10 s ⇒ γ = 0.1 s^{-1}
> Q = ω_{0}/γ = 2π × 440/0.1 ≈ 2.8 × 10^{4}
K: One number describes both the time and the frequency behaviour: a high-Q oscillator rings for many cycles and has a narrow resonance, because both depend on how little energy it loses per cycle.
!: High Q means narrow bandwidth: a high-Q filter selects a frequency well but responds slowly to changes.
P: **Investigate with the lab.** Make a sharp resonance with a quality factor above 10, then increase the damping and watch Q fall as the peak widens.
IX: oscillator
T: Quality factor | Q = ω_{0}/Δω = 2π × energy stored/energy lost per cycle, a measure of how lightly damped an oscillator is
T: Bandwidth | The width of a resonance between its half-power points, Δω = γ
SUM: Q = ω_{0}/γ = f_{0}/Δf: high Q means light damping, long ringing and a sharp peak.
SUM: A high-Q resonance selects frequency precisely but takes about Q/π cycles to respond.
EV: established | The quality factor of a lightly damped oscillator equals both its resonant frequency divided by its bandwidth and 2π times the energy stored divided by the energy lost per cycle
SRC: OpenStax, University Physics Volume 2, section 15.5 "Resonance in an AC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
Q: Give two definitions of Q. | ω_{0}/Δω (resonance sharpness) and 2π × energy stored / energy lost per cycle.
Q: Why do atomic clocks need high-Q resonances? | A narrow resonance defines the frequency very precisely.
M1@2: An oscillator with f_{0} = 1000 Hz has a half-power bandwidth of 10 Hz. Q = ? | 100 | 10 | 1000 | 0.01 | Q = f_{0}/Δf = 1000/10 = 100; the ratio is the same whether you use f or ω, since the 2π cancels.
M2@1: Increasing Q makes a system ring for: | Longer | Shorter | The same time | Zero time | Higher Q means less energy lost per cycle, so free oscillations take more cycles (about Q/π) to decay by 1/e in amplitude.
M2@2: A resonance has a natural frequency of 50 Hz and a width of 2 Hz. What is its quality factor? | 25 | 100 | 52 | 0.04 | Q = f₀/Δf = 50/2 = 25; 0.04 is the inverse ratio Δf/f₀.
NUM2@2: An oscillator stores 2.0 J and loses 0.010 J per cycle. What is its Q? | 1257 | 2% |  | Q = 2π × 2.0/0.010 = 2π × 200 = 1.26 × 10^{3}.
M3@3: A radio receiver must separate stations 10 kHz apart near 1 MHz. Roughly what minimum Q does its tuned circuit need? | About 100 | About 10 | About 1 | About 10^{6} | The bandwidth must be no more than about 10 kHz, so Q ≈ f_{0}/Δf = 10^{6}/10^{4} = 100; much higher Q would cut off the edges of the audio signal.
SA2@1,3: Explain why a very high-Q resonator is excellent for a clock but would be poor for a car suspension. | High Q means very little energy is lost per cycle, so the resonance is very narrow and the oscillation frequency is precisely defined: ideal for timekeeping. But a high-Q system also keeps ringing for many cycles after a disturbance. A suspension must absorb a bump and settle within about a cycle, so it needs Q of order 1, which means heavy damping. | High Q: narrow resonance, precise frequency ; High Q: rings for many cycles ; Clock benefits from precise frequency ; Suspension needs quick settling, Q about 1

## Coupled oscillators
S: When oscillators are linked, energy flows between them. Two pendulums joined by a spring take turns swinging; the motion is a mix of special patterns, the normal modes, each oscillating at its own frequency.
O: Find the normal-mode frequencies of two identical pendulums coupled by a spring
O: Explain energy exchange between coupled oscillators as beating between modes
O: Calculate the time for complete energy transfer
PRE: Simple and physical pendulums
LV: Year 1 · Physical reasoning
H: Two coupled pendulums
E: ω_{1} = √(g/l) :: in-phase mode: spring not stretched
E: ω_{2} = √(g/l + 2k/m) :: antiphase mode: spring stretched
- Start one pendulum only and the motion is a superposition of both modes: energy sloshes back and forth at the beat frequency ω_{2} − ω_{1}.
- Weak coupling ⇒ close frequencies ⇒ slow energy exchange.
H: Where coupling appears
- Molecules: coupled atomic vibrations (CO_{2} symmetric and asymmetric stretches).
- Crystals: coupled atoms give phonons.
- Circuits: coupled LC circuits in transformers and filters.
- Quantum: coupled two-level systems (qubits) exchange excitations the same way.
X: Two identical pendulums (l = 1.0 m) are coupled so that ω_{2} = 1.05ω_{1}. How often does the energy transfer completely?
> ω_{1} = 3.13 rad s^{-1}; Δω = 0.157 rad s^{-1}
> Complete transfer from one to the other takes π/Δω = 20 s
K: Coupled motion that looks complicated is a sum of normal modes; energy moves between the oscillators because the modes drift in and out of step.
!: Each normal mode, on its own, oscillates at a single frequency with a fixed shape; energy transfer happens only when modes are mixed.
T: Coupling | A link (spring, shared support, mutual inductance) through which one oscillator exerts forces on another
T: Normal mode | A pattern of motion in which every part oscillates at the same frequency with fixed relative amplitude
SUM: Two coupled pendulums have an in-phase mode at √(g/l) and a faster antiphase mode.
SUM: Starting one pendulum excites both modes, and their beating swaps the energy back and forth every π/Δω.
EV: established | Small motions of linearly coupled oscillators are superpositions of normal modes, and energy exchange between them is the beating of those modes
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: OpenStax, University Physics Volume 1, section 17.6 "Beats" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-6-beats
Q: Why does energy pass back and forth between two weakly coupled pendulums? | The motion is a superposition of two normal modes with slightly different frequencies, which beat.
Q: In the in-phase mode of two pendulums coupled by a spring, why is the frequency √(g/l)? | The spring isn't stretched, so it has no effect.
M1@2: Stronger coupling makes energy transfer: | Faster | Slower | Stop | Unchanged | Stronger coupling separates the two mode frequencies further, so they beat faster and the energy swaps more quickly.
M2@1: How many normal modes do N coupled oscillators (1D) have? | N | 1 | 2N | N^{2} | There is one normal mode per degree of freedom, so N oscillators moving along one line have N modes.
NUM2@1: Two pendulums of length 0.50 m and mass 0.20 kg are joined by a spring of k = 0.40 N m^{-1}. What is the antiphase mode's angular frequency? | 4.86 | 2% | rad s^{-1} | ω_{2} = √(g/l + 2k/m) = √(19.6 + 4.0) = √23.6 = 4.86 rad s^{-1}, compared with 4.43 for the in-phase mode.
M3@3: Coupled pendulums with mode frequencies 3.00 and 3.10 rad s^{-1} start with only pendulum A moving. When is A first at rest? | After about 31 s | After about 1 s | After about 63 s | Never: A keeps its energy | All the energy has moved to B after π/Δω = π/0.10 = 31 s; 63 s (2π/Δω) is when it has all returned to A.
TF2@2: If two coupled pendulums are started in their antiphase normal mode, energy flows back and forth between them. | false | A single normal mode keeps a fixed shape and amplitude: both pendulums swing equally for ever (without damping). Exchange needs a mixture of modes.
SA3@1,2: Two identical pendulums hang from a slack string and pendulum A is set swinging. Explain why B gradually starts to swing while A stops, and why the exchange then reverses. | The initial state (A displaced, B at rest) is the sum of the in-phase and antiphase normal modes with equal amplitudes. The modes have slightly different frequencies, so they drift out of step: when they are in step at A they add there and cancel at B, and after a time π/Δω they have slipped by half a cycle, so they cancel at A and add at B. They keep slipping, so the energy swaps back and forth. | Initial motion is a superposition of two normal modes ; Modes have slightly different frequencies ; Relative phase drift moves the energy between pendulums ; Complete transfer after π/Δω, then reversal

## Normal modes
S: A normal mode is a pattern of motion in which every part of a system oscillates at the same frequency with fixed relative amplitudes. Any small motion of a linear system is a superposition of its normal modes.
O: Find normal-mode frequencies and shapes as an eigenvalue problem
O: Describe the normal modes of a stretched string and their frequencies
O: Count the vibrational modes of a molecule
PRE: Coupled oscillators
PRE: Linear algebra eigenvalues and eigenvectors
LV: Year 2 · Physical reasoning
H: Finding normal modes
E: Mẍ = −Kx; try x = a cos ωt ⇒ (K − ω^{2}M)a = 0 ⇒ det(K − ω^{2}M) = 0
- Each eigenvalue gives a mode frequency; each eigenvector gives the mode shape.
- Modes are independent: energy put in one stays in it (for linear systems).
H: Examples
- A string fixed at both ends: modes sin(nπx/L) with f_{n} = nv/(2L).
- Drumheads (Chladni patterns) and bells: 2D modes with nodal lines; frequencies not harmonically related.
- Molecules: 3N − 6 vibrational modes for a non-linear molecule of N atoms (3N − 5 for linear).
- Buildings: sway modes engineers keep away from earthquake and wind frequencies.
X: How many vibrational modes does H_{2}O have?
> N = 3, non-linear: 3 × 3 − 6 = 3
> Symmetric stretch, asymmetric stretch and bend: the absorptions that make water a greenhouse gas
K: Normal modes turn a coupled problem into independent oscillators: find the modes once and any small motion is just a sum of them.
!: Real systems have many modes; a structure's lowest mode isn't the only one that can be excited.
T: Eigenfrequency | The frequency of a normal mode, found from det(K − ω^{2}M) = 0
T: Node | A point or line that stays at rest in a particular normal mode
T: Degree of freedom | An independent coordinate needed to describe the system's configuration
SUM: Normal modes are the eigenvectors of the equations of motion; their frequencies are the eigenvalues.
SUM: A string's modes form a harmonic series f_{n} = nf_{1}; plates and bells have inharmonic modes.
EV: established | Small oscillations of a linear system can be written as a superposition of independent normal modes
SRC: OpenStax, University Physics Volume 1, section 16.6 "Standing Waves and Resonance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/16-6-standing-waves-and-resonance
SRC: OpenStax, University Physics Volume 1, section 17.5 "Sources of Musical Sound" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-5-sources-of-musical-sound
Q: What is a normal mode? | A motion in which all parts oscillate at one frequency with fixed relative amplitude and phase.
Q: How many vibrational modes does a linear molecule of N atoms have? | 3N − 5.
M1@2: The modes of a string fixed at both ends have frequencies: | f_{n} = nf_{1} | f_{n} = n^{2}f_{1} | All the same | f_{n} = f_{1}/n | Mode n fits n half-wavelengths on the string, so f_{n} = nv/(2L) = nf_{1}: a harmonic series.
M2@2: Why does a bell sound different from a guitar? | Its mode frequencies aren't harmonics of a fundamental | It has no modes | It is louder | It's lightly damped | A bell is a two-dimensional shell whose mode frequencies are not whole-number multiples of one fundamental, so it sounds inharmonic.
NUM1@3: How many vibrational normal modes does carbon dioxide (CO_{2}, a linear molecule) have? | 4 | 0 |  | For a linear molecule 3N − 5 = 9 − 5 = 4: symmetric stretch, asymmetric stretch and two perpendicular bends.
M3@1: Two equal masses m between three identical springs k (wall–spring–mass–spring–mass–spring–wall) have mode frequencies: | √(k/m) and √(3k/m) | √(k/m) and √(2k/m) | √(k/2m) and √(k/m) | Both equal to √(2k/m) | In-phase, the middle spring is unstretched: ω^{2} = k/m. In antiphase it is stretched twice as much: ω^{2} = (k + 2k)/m = 3k/m.
TF2@2: For a string fixed at both ends, the ends are nodes in every normal mode. | true | The fixed ends cannot move, so every mode sin(nπx/L) is zero at x = 0 and x = L; higher modes add further nodes between.
SA3@1: Explain how you would find the normal modes of a system of masses and springs, and what the results tell you. | Write Newton's second law for each mass as a matrix equation Mẍ = −Kx. Try a solution in which every coordinate oscillates at the same frequency, x = a cos ωt, giving (K − ω^{2}M)a = 0. Non-zero solutions need det(K − ω^{2}M) = 0: its roots are the mode frequencies, and each corresponding vector a gives the relative amplitudes (the mode shape). Any small motion is then a sum of these modes. | Equations of motion as Mẍ = −Kx ; Trial solution with one common frequency ; det(K − ω^{2}M) = 0 gives frequencies ; Eigenvectors give mode shapes ; General motion is a superposition

## Beat frequencies
S: When two oscillations of slightly different frequency add, the result swells and fades at the difference frequency: beats. Musicians tune with them and engineers use the same idea to measure frequencies precisely.
O: Explain beats as the superposition of two close frequencies
O: Calculate a beat frequency and use beats to find an unknown frequency
O: Describe uses of beats in tuning, radio and measurement
PRE: Superposition
PRE: Trigonometry and circular functions
LV: A level · Application
H: The maths
E: cos ω_{1}t + cos ω_{2}t = 2 cos(½Δω t) cos(ω̄t)
E: f_{beat} = |f_{1} − f_{2}|
- A fast oscillation at the average frequency, with a slowly varying envelope.
- The envelope repeats at Δf/2, but loudness peaks twice per envelope cycle, so the heard beat rate is |f_{1} − f_{2}|.
H: Uses
- Tuning instruments: adjust until beats vanish.
- Heterodyne radio receivers mix a signal with a local oscillator to get a fixed intermediate frequency.
- Laser beat notes measure optical frequencies with frequency combs.
- Doppler radar and ultrasound measure speed from the beat between sent and reflected waves.
X: A tuning fork of 440 Hz and a string give 3 beats per second. The beats slow when the string is tightened slightly. What was the string's frequency?
> f = 437 or 443 Hz
> Tightening raises f; beats slowing means it approached 440, so it was 437 Hz
K: Beats come from the two waves drifting in and out of step: loud when in phase, quiet in antiphase, repeating |f_{1} − f_{2}| times a second.
!: Beats are only heard clearly when the two frequencies are close (within ~15 Hz); larger differences sound like roughness or two separate notes.
P: **Investigate with the lab.** Tune two nearly equal notes and watch the loudness rise and fall. Make the frequencies closer and see the beats slow down.
IX: waves
T: Beats | The periodic rise and fall in loudness when two waves of slightly different frequency superpose
T: Beat frequency | The number of loudness maxima per second, equal to the difference of the two frequencies
T: Heterodyning | Mixing a signal with a local oscillator to shift it to the difference frequency
SUM: Two close frequencies add to give a tone at their average, swelling and fading at |f_{1} − f_{2}|.
SUM: A beat measurement gives only the size of the difference; a second change is needed to tell which frequency is higher.
EV: established | Two superposed oscillations of nearby frequencies produce intensity beats at their difference frequency
SRC: OpenStax, University Physics Volume 1, section 17.6 "Beats" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-6-beats
SRC: OpenStax, College Physics 2e, section 16.10 "Superposition and Interference" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/16-10-superposition-and-interference
Q: What is the beat frequency of two tones? | The difference of their frequencies.
Q: How do musicians use beats to tune? | They adjust until the beats between two notes disappear.
M1@2: Tones of 256 Hz and 260 Hz produce beats at: | 4 Hz | 258 Hz | 2 Hz | 516 Hz | The beat frequency is the difference, 260 − 256 = 4 Hz; 258 Hz is the pitch you hear, the average frequency.
M2@3: A heterodyne receiver mixes a 100.0 MHz signal with a 89.3 MHz oscillator. The difference frequency is: | 10.7 MHz | 189.3 MHz | 100 MHz | 5.35 MHz | Mixing produces sum and difference frequencies; the difference, 100.0 − 89.3 = 10.7 MHz, is the standard FM intermediate frequency.
M2@1: As two notes are tuned closer together, what happens to the beats? | They become slower | They become faster | They disappear immediately | The pitch doubles | Beat frequency equals the frequency difference, so it falls as the notes converge.
NUM1@2: Two tuning forks sounded together give 12 beats in 4.0 s. One is 512 Hz and the other is known to be lower. What is its frequency? | 509 | 0.1 | Hz | Beat frequency = 12/4.0 = 3 Hz, so the other fork is 512 − 3 = 509 Hz.
M3@2: A fork of unknown frequency gives 5 beats per second with a 300 Hz fork. A little wax is added to the unknown fork and the beats speed up to 7 per second. Its original frequency was: | 295 Hz | 305 Hz | 293 Hz | 307 Hz | Wax adds mass and lowers the frequency. The beats increased, so lowering moved it further from 300 Hz: it was below, at 295 Hz (then 293 Hz).
SA2@1: Use the identity for the sum of two cosines to explain why two notes of 440 Hz and 444 Hz are heard as a 442 Hz tone whose loudness rises and falls four times a second. | cos ω_{1}t + cos ω_{2}t = 2 cos(½Δω t) cos(ω̄t). The fast factor oscillates at the average frequency, 442 Hz, which is the pitch heard. The slow factor is an envelope at Δf/2 = 2 Hz. Loudness depends on the size of the envelope, which reaches a maximum twice in each envelope cycle, so the loudness peaks 2 × 2 = 4 times per second, equal to the difference frequency. | Product of a fast and a slow cosine ; Fast term at the average, 442 Hz ; Envelope at Δf/2 = 2 Hz ; Loudness peaks twice per envelope cycle, so 4 Hz

## Anharmonic oscillations
S: An anharmonic oscillator has a restoring force that isn't exactly proportional to displacement. Then the period depends on amplitude, harmonics appear in the motion, and important physics like thermal expansion follows.
O: Recognise the signs of anharmonic motion
O: Explain how an asymmetric potential leads to thermal expansion
O: Estimate the amplitude correction to a pendulum's period
PRE: Simple and physical pendulums
PRE: Taylor and Fourier series
LV: Year 2 · Physical reasoning
H: Signs of anharmonicity
- Period changes with amplitude (a pendulum at large swings).
- Motion contains harmonics 2ω, 3ω… (not a pure sinusoid).
- Asymmetric potentials shift the average position as the amplitude grows.
H: Examples
E: U(x) = ½kx^{2} + ⅓αx^{3} + ¼βx^{4} :: general expansion
- **Pendulum**: restoring torque ∝ sin θ, softer than linear; period increases with amplitude.
- **Molecular bonds**: Morse potential, steep on compression and gentle on stretching. Vibration levels crowd together towards dissociation.
- **Thermal expansion**: in an asymmetric potential, the average separation increases with vibration energy, so solids expand on heating. A perfectly harmonic crystal wouldn't expand.
X: Why does a pendulum clock run slow if its swing grows from 2° to 6°?
> T ≈ T_{0}(1 + θ_{0}^{2}/16)
> At 6° (0.105 rad): extra 6.9 × 10^{-4}; at 2°: 7.6 × 10^{-5}; difference ≈ 0.06% ≈ 53 s per day
K: The quadratic (harmonic) term of a potential gives SHM; the cubic term makes it asymmetric and the quartic term stiffens or softens it, and these terms grow in importance with amplitude.
!: Harmonic approximations are only valid for small amplitudes; check how large the next term in the potential is.
P: **Investigate with the lab.** Release from 90° or more and compare the exact period with the small-angle formula. Find how much longer it is.
IX: pendulum
T: Anharmonic oscillator | An oscillator whose restoring force is not exactly proportional to displacement
T: Morse potential | A model interatomic potential, steep at short range and levelling off at long range as the bond breaks
SUM: Anharmonic motion has an amplitude-dependent period and contains harmonics.
SUM: An asymmetric (cubic) term in the interatomic potential is why solids expand when heated.
EV: established | Thermal expansion of solids arises from the anharmonic, asymmetric shape of the interatomic potential
SRC: OpenStax, University Physics Volume 1, section 15.2 "Energy in Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-2-energy-in-simple-harmonic-motion
SRC: OpenStax, University Physics Volume 1, section 15.4 "Pendulums" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums
Q: Why do solids expand when heated? | The interatomic potential is asymmetric (anharmonic), so the average separation increases with vibration amplitude.
Q: How does a large-amplitude pendulum's period compare with the small-angle value? | It's longer.
M1@1: An anharmonic oscillator's motion contains: | Harmonics of the fundamental | Only the fundamental | No periodic motion | Only lower frequencies | A restoring force that isn't linear distorts the sinusoid, and a distorted periodic motion contains harmonics 2ω, 3ω and so on.
M2@2: The Morse potential describes: | Diatomic molecular bonds | Springs | Planets | Pendulums | The Morse potential models a chemical bond: steep repulsion at short range and a well that flattens out as the bond stretches towards dissociation.
M2@3: Why does a pendulum released from 90° take longer per swing than 2π√(L/g) predicts? | The restoring force grows more slowly than the angle, so the motion isn't SHM | Air resistance always slows larger swings | Gravity is weaker at large angles | The string stretches more at large angles | The restoring force is proportional to sin θ, which falls below θ at large angles.
NUM2@3: Using T ≈ T_{0}(1 + θ_{0}^{2}/16), by what percentage does a pendulum's period exceed the small-angle value at an amplitude of 20°? | 0.76 | 3% | % | 20° = 0.349 rad; θ_{0}^{2}/16 = 0.122/16 = 0.0076, so the period is about 0.76% longer.
M3@2: A crystal's interatomic potential were exactly ½kx^{2}. On heating, the crystal would: | Not expand, because the average separation stays at equilibrium | Expand, because atoms vibrate with larger amplitude | Contract, because the atoms pull closer together | Expand linearly with the square of the temperature | A symmetric potential gives vibrations centred on the equilibrium separation however large they are; only asymmetry shifts the mean outward.
SA3@2: Explain, using the shape of the potential energy curve between two atoms, why most solids expand when heated. | The interatomic potential is asymmetric: it rises steeply when atoms are pushed together and more gently when they are pulled apart. At higher temperature the atoms vibrate with more energy, so they oscillate between turning points higher up the well. Because the outer wall is gentler, the outer turning point moves out further than the inner one moves in, so the mean separation increases and the solid expands. In a symmetric (harmonic) well the mean would stay fixed. | Potential is asymmetric: steep inside, gentle outside ; Higher temperature means larger vibration energy ; Outer turning point moves out more than inner moves in ; Mean separation increases ; A harmonic well would give no expansion

## Nonlinear oscillators
S: Nonlinear oscillators obey equations where superposition fails. They show behaviour linear systems can't: amplitude-dependent frequencies, jumps and hysteresis, self-sustained limit cycles, synchronisation and chaos.
O: Explain why superposition fails for nonlinear equations
O: Describe the Duffing and van der Pol oscillators and what each shows
O: Explain limit cycles and synchronisation with examples
PRE: Anharmonic oscillations
LV: Year 3 · Physical reasoning
H: Key models
E: ẍ + γẋ + ω_{0}^{2}x + βx^{3} = F cos ωt :: Duffing oscillator: stiffening or softening spring
E: ẍ − μ(1 − x^{2})ẋ + x = 0 :: van der Pol: self-sustained limit cycle
- Duffing: resonance curve bends; two stable amplitudes at one frequency; sudden jumps when sweeping (hysteresis).
- Van der Pol: negative damping at small amplitude, positive at large, so any start settles on the same oscillation (heartbeats, valve circuits, lasers).
- Driven pendulums and Duffing oscillators can become chaotic.
H: Synchronisation
P: Nonlinear oscillators can lock to each other or to a drive: Huygens saw two pendulum clocks on one beam synchronise; fireflies flash together; the heart's pacemaker cells fire in step; power grid generators stay locked to 50 Hz.
X: Why do bowed violin strings sustain a steady note?
> Stick–slip friction feeds energy in each cycle (effective negative damping)
> Losses grow with amplitude, so the oscillation settles on a limit cycle (Helmholtz motion)
K: A limit cycle's amplitude is set by the system itself, where energy gained per cycle balances energy lost, not by how it was started; that is what makes clocks, hearts and lasers self-sustaining.
!: You can't predict a nonlinear system's response to a combined input by adding responses to each part.
P: **Investigate with the lab.** Compare small and large release angles: at large angles the period depends on amplitude, a sign of a nonlinear oscillator.
IX: pendulum
T: Limit cycle | An isolated closed trajectory in phase space that nearby motions approach: a self-sustained oscillation
T: Hysteresis | Dependence of a system's state on its history, such as different jump points when a frequency is swept up or down
T: Synchronisation | Locking of coupled or driven nonlinear oscillators to a common frequency
SUM: Nonlinear equations break superposition, giving amplitude-dependent frequencies, jumps and hysteresis.
SUM: Van der Pol-type systems settle on a limit cycle fixed by the system; nonlinear oscillators can synchronise or become chaotic.
EV: established | Nonlinear oscillators can show self-sustained limit cycles, multistability with hysteresis, synchronisation and chaos, none of which occur in linear systems
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: OpenStax, University Physics Volume 1, section 15.4 "Pendulums" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums
Q: What is a limit cycle? | An isolated closed trajectory in phase space that nearby motions approach: a self-sustained oscillation.
Q: What does the Duffing oscillator's bent resonance curve cause? | Multiple stable amplitudes, jumps and hysteresis when the frequency is swept.
M1@2: Which is a self-sustained oscillator? | Van der Pol oscillator | Mass on a spring | Simple pendulum | Damped LC circuit | The van der Pol oscillator settles on a limit cycle without any periodic drive; the others either oscillate at a set amplitude or decay.
M2@1: Superposition fails for nonlinear systems because: | The equations aren't linear in the variables | They have no solutions | They are always chaotic | They're undamped | With terms like x^{3} or x^{2}ẋ, the sum of two solutions does not satisfy the equation, so solutions cannot simply be added.
M2@1: What distinguishes a nonlinear oscillator from a simple harmonic one? | Its period depends on its amplitude | Its period is always exactly constant | It cannot oscillate at all | Its energy is never conserved | In a nonlinear oscillator the restoring force isn't proportional to displacement, so the period changes with amplitude.
TF2@3: A van der Pol oscillator started with a tiny disturbance and one started with a large one end up with the same steady amplitude. | true | Both trajectories approach the same limit cycle: negative damping grows small motions and positive damping shrinks large ones, so the final amplitude is set by the system.
M3@2: The driving frequency of a stiffening Duffing oscillator is swept slowly upward, then back down. What is observed? | The amplitude jumps at different frequencies on the way up and down | The response is identical in both directions | The amplitude grows without limit at ω_{0} | The response shifts down to half the drive frequency | The bent resonance curve has a region with two stable branches; sweeping up the system stays on the high branch longer, sweeping down on the low one, so the jumps occur at different frequencies (hysteresis).
SA3@3: Explain how a bowed violin string or a pendulum clock keeps oscillating at a steady amplitude, using the idea of a limit cycle. | A source of energy (the moving bow through stick–slip friction, or the clock's escapement) feeds energy in each cycle, acting like negative damping. Losses to friction and sound grow with amplitude. At small amplitude the energy input exceeds the losses, so the motion grows; at large amplitude losses win, so it shrinks. The motion settles where the two balance: a limit cycle whose amplitude is set by the system, not by how it was started. | Energy fed in each cycle (negative damping) ; Losses grow with amplitude ; Balance point fixes the steady amplitude ; Same final oscillation from different starts

## Parametric resonance
S: Parametric resonance grows oscillations by periodically varying a parameter of the system (length, stiffness) rather than pushing it. The strongest effect comes from varying the parameter at twice the natural frequency.
O: Distinguish parametric excitation from ordinary forced resonance
O: State the frequency condition and damping threshold for parametric instability
O: Explain examples such as pumping a swing and Faraday waves
PRE: Resonance
LV: Year 3 · Physical reasoning
H: The Mathieu equation
E: ẍ + ω_{0}^{2}[1 + h cos(Ωt)]x = 0 :: unstable growth near Ω = 2ω_{0}/n
- Main instability when Ω ≈ 2ω_{0}: energy pumped in twice per cycle.
- Damping sets a threshold: h must exceed ~2γ/ω_{0}.
- Amplitude grows exponentially until nonlinearity limits it.
H: Examples
- Pumping a swing by standing and squatting (raising the centre of mass at the low point, lowering at the ends).
- The Botafumeiro censer in Santiago Cathedral, swung by pulling its rope twice per cycle.
- Faraday waves on a vertically vibrated liquid at half the driving frequency.
- Parametric amplifiers in electronics and optics; ships' parametric rolling in head seas.
X: A swing has a natural period of 3.0 s. At what rate should you stand and squat for parametric pumping?
> Twice per cycle: period 1.5 s, frequency 0.67 Hz
K: In parametric resonance the growth rate is proportional to the amplitude already there, so the growth is exponential, and the strongest response is at twice the natural frequency, not at it.
!: Parametric resonance can't start from exactly zero amplitude; it needs a small initial disturbance to amplify, unlike ordinary forced resonance.
T: Parametric excitation | Driving an oscillator by periodically changing one of its parameters, such as length or stiffness
T: Mathieu equation | ẍ + ω_{0}^{2}[1 + h cos(Ωt)]x = 0, the standard model of parametric resonance
SUM: Varying a parameter at Ω ≈ 2ω_{0} pumps energy in twice per cycle and makes small oscillations grow exponentially.
SUM: Damping sets a minimum modulation depth; nonlinearity eventually limits the growth.
EV: established | Modulating an oscillator's parameter near twice its natural frequency produces exponential growth once damping losses are exceeded
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: OpenStax, University Physics Volume 1, section 15.4 "Pendulums" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums
Q: At what frequency is parametric resonance strongest? | At twice the natural frequency.
Q: How does a child pump a swing without a push? | By shifting their centre of mass up and down twice per cycle, changing the effective length.
M1@1: Parametric resonance varies: | A parameter like length or stiffness | The driving force directly | Only the mass | Only the damping | Parametric excitation modulates a property of the system itself rather than applying an external periodic force.
M2@3: Faraday waves on a vibrating liquid oscillate at: | Half the drive frequency | The drive frequency | Twice the drive frequency | Unrelated frequencies | Vertical shaking modulates the effective gravity, a parametric drive, so the surface waves respond at Ω/2: half the drive frequency.
NUM1@2: A pendulum has natural frequency 0.40 Hz. At what frequency should its length be modulated for the strongest parametric resonance? | 0.8 | 2% | Hz | The main parametric instability is at twice the natural frequency: 2 × 0.40 = 0.80 Hz.
TF2@1: A pendulum hanging perfectly still at its lowest point will start to swing if its length is modulated at twice its natural frequency. | false | Parametric pumping multiplies an existing oscillation; with exactly zero amplitude there is nothing to amplify, so a small initial disturbance is needed.
M3@2: An oscillator's stiffness is modulated at 2ω_{0}, but its oscillation stays small and dies away. The most likely reason is that: | The modulation depth is below the threshold set by damping | The modulation should be at exactly ω_{0} instead | Parametric resonance only works for pendulums | The amplitude is already too large to grow | Energy is pumped in only if h exceeds about 2γ/ω_{0}; below that threshold damping removes energy faster than the modulation adds it.
SA3@1,3: Explain how a child pumps a swing by standing and squatting, and why this is parametric rather than forced resonance. | The child squats at the ends of the swing and stands up at the bottom. Standing at the bottom, where the speed and tension are greatest, raises the centre of mass against a large force, doing extra work; squatting at the ends, where the tension is small, gives back less. The net energy gain each half-swing increases the amplitude. No external periodic force acts: the child varies the effective length (a parameter) twice per cycle, so it is parametric excitation, and it multiplies the existing swing rather than starting one from rest. | Stand at the bottom, squat at the ends ; Work done against the larger tension at the bottom gives a net energy gain ; Length modulated twice per cycle ; A parameter changes rather than an external force ; Needs an existing swing to amplify

## Mechanical vibration analysis
S: Vibration analysis measures and models how machines and structures vibrate, to prevent fatigue, noise and failure and to diagnose faults early. It combines modal analysis, spectra and isolation design.
O: Identify common machine faults from peaks in a vibration spectrum
O: Use transmissibility to design a vibration isolation mount
O: Explain how tuned mass dampers and modal testing are used
PRE: Resonance
PRE: Normal modes
LV: Year 2 · Application
H: Tools
- **Accelerometers** (piezoelectric or MEMS) and laser vibrometers measure motion.
- **Spectrum (FFT) analysis**: peaks at running speed (imbalance), 2× (misalignment), bearing frequencies, gear mesh frequencies.
- **Modal testing**: tap with an instrumented hammer, measure the response; find natural frequencies, damping and mode shapes.
- **Finite element models** predict modes before building.
H: Vibration isolation
E: transmissibility T = 1/|1 − (ω/ω_{0})^{2}| (undamped)
- Isolation only works for ω > √2 ω_{0}: mount machines on soft springs so ω_{0} is well below the operating frequency.
- Tuned mass dampers absorb a specific frequency (Taipei 101's 660-tonne pendulum).
X: A 1500 rpm machine is mounted on springs with ω_{0} corresponding to 5 Hz. Find the transmissibility.
> f = 25 Hz; ratio r = 5
> T = 1/(25 − 1) ≈ 4%: 96% isolation
K: A mount isolates only when the operating frequency is above √2 times its natural frequency; below that it transmits or even amplifies vibration.
!: Soft mounts amplify vibration when passing through resonance during start-up; add damping or pass through quickly.
T: Transmissibility | The ratio of force (or motion) transmitted through a mount to that applied
T: Modal testing | Measuring a structure's response to a known excitation to find its natural frequencies, damping and mode shapes
SUM: Spectrum peaks at multiples of running speed and at bearing or gear frequencies diagnose faults.
SUM: Isolation needs ω/ω_{0} > √2; tuned mass dampers absorb one problem frequency.
EV: established | A spring mount reduces transmitted vibration only when the forcing frequency exceeds √2 times the mount's natural frequency
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: OpenStax, College Physics 2e, section 16.8 "Forced Oscillations and Resonance" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/16-8-forced-oscillations-and-resonance
Q: Above what frequency ratio does a spring mount isolate vibration? | ω/ω_{0} > √2.
Q: What does a peak at twice running speed in a vibration spectrum often indicate? | Shaft misalignment.
M1@3: A tuned mass damper works by: | Absorbing energy at a target frequency with its own resonance | Stiffening the building | Adding friction everywhere | Changing gravity | Tuned to the structure's mode, the damper swings out of phase with the structure, so its forces oppose the motion and its own damping removes the energy.
M2@2: To isolate a machine running at 50 Hz, the mount's natural frequency should be: | Well below 35 Hz, e.g. 10 Hz | 50 Hz | Above 50 Hz | Exactly 35 Hz | Isolation needs f/f_{0} > √2, so f_{0} < 50/√2 = 35 Hz; well below, such as 10 Hz, gives strong isolation.
NUM2@2: A machine runs at 30 Hz on undamped mounts with natural frequency 10 Hz. What fraction of the vibrating force is transmitted? | 0.125 | 3% |  | r = 30/10 = 3, so T = 1/(r^{2} − 1) = 1/8 = 0.125: about 12.5% transmitted.
MATCH2@1: Match each spectrum peak to its usual cause. | Peak at running speed = rotor imbalance ; Peak at twice running speed = shaft misalignment ; Peak at teeth × shaft speed = gear meshing ; Peaks at non-integer multiples of shaft speed = rolling-bearing defects | Each fault produces a force that repeats at a characteristic rate, so the frequency of a peak points to its source.
M3@2: A machine running at 20 Hz sits on mounts with natural frequency 18 Hz. An engineer fits stiffer mounts (natural frequency 25 Hz). The transmitted vibration will: | Probably stay large, because the ratio is still near resonance | Fall to almost nothing, because stiffer mounts always isolate better | Become zero, because the ratio is now below one | Double, because stiffness doubles the force | r = 20/25 = 0.8 gives T = 1/(1 − 0.64) ≈ 2.8: still amplified. The fix is softer mounts, with f_{0} well below 20/√2 = 14 Hz.
SA2@2,3: A large fan running at 1200 rpm makes the floor of an office vibrate. Explain two ways an engineer could reduce the problem, with the physics of each. | First, mount the fan on soft springs so that the mount's natural frequency is well below the forcing frequency (20 Hz), for example 5 Hz: with r = 4 the transmissibility is about 1/15, and damping should be added to limit the motion while passing through resonance at start-up. Second, if the floor itself resonates near 20 Hz, fit a tuned mass damper tuned to that frequency, which oscillates out of phase and absorbs the energy; or balance the fan to reduce the force at its source. | Forcing frequency 20 Hz identified ; Soft mounts with f_{0} well below 20/√2 Hz ; Transmissibility reduced, damping for start-up ; Tuned mass damper or balancing as a second method

## Frequency response
S: A system's frequency response describes how it amplifies (or attenuates) and phase-shifts sinusoidal inputs at each frequency. For linear systems it completely characterises their behaviour, since any input is a sum of sinusoids.
O: Interpret a transfer function's gain and phase and plot them on a Bode plot
O: Convert amplitude ratios to decibels
O: Calculate the cut-off frequency and roll-off of a first-order filter
PRE: Driven oscillations
PRE: Complex numbers
LV: Year 2 · Application
H: Transfer function
E: H(ω) = output/input (complex); |H| gain, arg H phase
E: H(ω) = 1/(k − mω^{2} + ibω) :: displacement response of a driven oscillator
E: gain in dB = 20 log_{10}(amplitude ratio) = 10 log_{10}(power ratio)
- Bode plots: log gain (dB) and phase against log frequency.
- −3 dB points define the bandwidth (power halved).
H: Filters
- Low-pass RC: H = 1/(1 + iωRC); cut-off f_{c} = 1/(2πRC); rolls off at −20 dB per decade.
- High-pass and band-pass filters; second-order systems roll off at −40 dB per decade.
- Mechanical analogues: suspension (low-pass for road bumps), loudspeaker enclosures.
X: A low-pass RC filter has R = 10 kΩ, C = 100 nF. Find f_{c} and the gain at 10f_{c}.
> f_{c} = 1/(2π × 10^{4} × 10^{-7}) = 159 Hz
> At 1.59 kHz: |H| ≈ 0.1 (−20 dB)
K: Because a linear system treats each frequency independently, knowing its gain and phase at every frequency predicts its steady response to any input.
!: Frequency response describes steady state only; transients (start-up ringing) need the full time-domain solution.
P: **Investigate with the lab.** Sweep the driving frequency and watch the resonance curve build up. Compare the curves for light and heavy damping.
IX: oscillator
T: Transfer function | The complex ratio H(ω) of output to input for a sinusoidal input of angular frequency ω
T: Bode plot | A pair of graphs of gain in decibels and phase against the logarithm of frequency
T: Cut-off frequency | The frequency at which the gain has fallen by 3 dB (power halved), f_{c} = 1/(2πRC) for an RC filter
SUM: The transfer function's size gives the gain and its argument the phase shift at each frequency.
SUM: A first-order filter is −3 dB at f_{c} and falls by 20 dB per decade beyond; second-order systems by 40 dB per decade.
EV: established | The steady-state response of a linear time-invariant system to any input is fixed by its frequency response
SRC: OpenStax, University Physics Volume 2, section 15.3 "RLC Series Circuits with AC" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-3-rlc-series-circuits-with-ac
SRC: OpenStax, University Physics Volume 2, section 15.5 "Resonance in an AC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit
Q: What does a Bode plot show? | Gain (in dB) and phase against log frequency.
Q: What is the cut-off frequency of an RC filter? | f_{c} = 1/(2πRC).
M1@2: A gain of −20 dB in amplitude means: | One tenth | One hundredth | Half | Doubled | 20 log_{10}(0.1) = −20 dB, so the output amplitude is a tenth of the input; one hundredth would be −40 dB.
M2@3: A first-order low-pass filter rolls off at: | −20 dB per decade | −40 dB per decade | −6 dB per decade | 0 | Above cut-off the gain is proportional to 1/f, so each tenfold rise in frequency cuts the amplitude tenfold: −20 dB per decade.
M2@1: What does a frequency response curve show? | Steady-state amplitude against driving frequency | Displacement against time for one cycle | Energy against amplitude | Period against mass | It plots how strongly the system responds at each driving frequency.
NUM2@3: What is the cut-off frequency of a low-pass RC filter with R = 2.2 kΩ and C = 47 nF? | 1539 | 2% | Hz | f_{c} = 1/(2πRC) = 1/(2π × 2200 × 47 × 10^{-9}) = 1/(6.50 × 10^{-4}) = 1.54 kHz.
TF1@2: A gain of −3 dB means the output power is half the input power. | true | 10 log_{10}(0.5) = −3.0 dB; the amplitude ratio at that point is 1/√2 ≈ 0.71.
M3@1: For the driven oscillator H(ω) = 1/(k − mω^{2} + ibω), what is the phase of the displacement relative to the force at ω = ω_{0}? | It lags by 90° | It is in phase | It lags by 180° | It leads by 90° | At ω_{0}, k − mω^{2} = 0, so H = 1/(ibω) = −i/(bω): a purely negative imaginary value, which is a 90° lag.
SA2@1,3: A loudspeaker's response is flat up to its resonance and falls at 40 dB per decade above it, while a simple RC filter falls at 20 dB per decade. Explain what this tells you about the two systems, and what a Bode plot of each would show. | The RC filter is a first-order system: above cut-off its gain falls as 1/f, a straight line of slope −20 dB per decade on a log–log Bode plot, with the phase moving from 0 to −90°. The loudspeaker behaves like a second-order (mass-spring-damper) system: its gain falls as 1/f^{2} above resonance, −40 dB per decade, possibly with a peak at resonance if lightly damped, and the phase moves from 0 through −90° to −180°. | RC filter first order, −20 dB per decade ; Loudspeaker second order, −40 dB per decade ; Bode plot: straight-line slopes on log axes ; Phase: up to 90° lag for first order, 180° for second order ; Possible resonance peak for the second-order system

## Fourier analysis of oscillations
S: Fourier analysis breaks any oscillation into a sum of pure sinusoids. Musical timbre, vibration diagnosis, signal processing and spectroscopy all rest on seeing a motion as a spectrum of frequencies.
O: Describe the spectra of periodic, decaying and noisy signals
O: Explain timbre in terms of harmonic content
O: Calculate the frequency resolution and range of a sampled record
PRE: Taylor and Fourier series
PRE: Beat frequencies
LV: Year 2 · Application
H: Spectra
- A periodic signal has a line spectrum: the fundamental and its harmonics.
- A decaying oscillation has a peak of width ~γ (a Lorentzian): the shorter the ring, the broader the line.
- Noise has a continuous spectrum.
E: Δf Δt ≳ 1 :: time–frequency trade-off
H: Timbre
P: Different instruments playing the same note share a fundamental but differ in their harmonic amplitudes and attack: a clarinet (closed pipe) emphasises odd harmonics; a violin's sawtooth-like motion contains all harmonics falling as 1/n.
H: In practice
- FFT of sampled data, with a window function to reduce spectral leakage.
- Resolution Δf = 1/(record length); maximum frequency = half the sample rate.
- Spectrograms show how spectra change in time (speech, birdsong, gravitational-wave chirps).
X: You record a vibration for 2.0 s at 10 kHz sampling. What are the frequency resolution and range?
> Δf = 1/2.0 = 0.5 Hz
> f_{max} = 5 kHz
K: Record length sets frequency resolution and sample rate sets the highest frequency: to resolve close lines record for longer; to see high frequencies sample faster.
!: A short record can't resolve close frequencies, however fast you sample; resolution depends on duration.
!: Frequencies above half the sample rate don't vanish: they appear falsely at lower frequencies (aliasing) unless filtered out before sampling.
T: Spectrum | The amplitudes (or powers) of the sinusoidal components of a signal as a function of frequency
T: Harmonic | A component at a whole-number multiple of the fundamental frequency
T: Nyquist frequency | Half the sampling rate, the highest frequency a sampled record can represent
SUM: Periodic signals have line spectra of harmonics; decaying signals have broadened lines; noise is continuous.
SUM: Δf = 1/record length and f_{max} = half the sample rate.
EV: established | Any periodic signal can be represented as a sum of sinusoids at its fundamental frequency and harmonics
SRC: OpenStax, University Physics Volume 1, section 17.5 "Sources of Musical Sound" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-5-sources-of-musical-sound
SRC: OpenStax, College Physics 2e, section 16.10 "Superposition and Interference" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/16-10-superposition-and-interference
Q: Why do a flute and a violin sound different playing the same note? | Different harmonic content (and attack and decay).
Q: What limits the frequency resolution of an FFT? | The length of the recording: Δf = 1/T.
M1@1: A square wave contains: | Odd harmonics | Even harmonics only | Only the fundamental | No harmonics | A symmetric square wave's Fourier series has only odd harmonics, with amplitudes falling as 1/n (1, 1/3, 1/5…).
M2@1: A rapidly decaying oscillation has a spectral peak that is: | Broad | Narrow | Absent | At zero frequency | Short duration means wide bandwidth: Δf Δt ≳ 1, so a quickly decaying ring has a broad spectral line of width about γ.
NUM1@3: A signal is recorded for 0.25 s. What is the frequency resolution of its FFT? | 4 | 1% | Hz | Δf = 1/record length = 1/0.25 s = 4 Hz, whatever the sampling rate.
M3@3: Two vibration components at 100.0 Hz and 100.4 Hz must be told apart in a spectrum. What is the shortest record that can do it? | About 2.5 s | About 0.4 s | About 0.01 s | About 0.25 s | The resolution must be at least 0.4 Hz, and Δf = 1/T, so T ≳ 1/0.4 = 2.5 s; sampling faster does not help.
MS2@2: Which statements about musical timbre are correct? | Instruments playing the same note share the fundamental frequency ; A clarinet's low register emphasises odd harmonics ; The attack and decay affect how a note sounds | Timbre is set only by the fundamental frequency ; A pure sine wave contains many harmonics | Timbre comes from the mix of harmonics and from the note's changes in time; the fundamental sets only the pitch, and a pure sine has no harmonics.
SA2@1,2: A guitar string is plucked near its end and then near its middle. Explain, in terms of Fourier analysis, why the two notes have the same pitch but different tone. | Both notes have the same fundamental frequency, set by the string's length, tension and mass per length, so the pitch is the same. The initial shape of the string decides which normal modes are excited and how strongly. Plucking at the middle cannot excite modes with a node there (the even harmonics) and gives a mellow tone dominated by low harmonics; plucking near the end excites many higher harmonics strongly, giving a brighter tone. | Same fundamental, so same pitch ; Pluck point sets the harmonic amplitudes ; Middle pluck: no even harmonics, mellow ; End pluck: strong high harmonics, bright
`;
