// Unit 6: Oscillations and Vibrations. Format: kit/course/notes.js
export default `
## Periodic motion
S: Periodic motion repeats itself after a fixed time, the period. Pendulums, hearts, planets, AC currents, vibrating atoms and light waves are all periodic, and almost any stable system disturbed slightly will oscillate.
LV: Introductory · Foundation
O: Define period, frequency and angular frequency, and convert between them
O: Distinguish periodic motion in general from simple harmonic motion
PRE: Circular motion
H: Describing it
E: f = 1/T; ω = 2πf :: frequency (Hz) and angular frequency (rad s^{-1})
- Period T: time for one complete cycle. Frequency f: cycles per second.
- Oscillation needs a **restoring force** (pulls back towards equilibrium) and **inertia** (makes it overshoot).
- Not all periodic motion is sinusoidal (a bouncing ball, a heartbeat), but any periodic motion is a sum of sinusoids (Fourier).
H: Why oscillation is universal
P: Near a stable equilibrium, any smooth potential energy curve looks like a parabola, U ≈ ½kx^{2}. So small oscillations about any equilibrium are simple harmonic: atoms in solids, molecules, bridges, electrical circuits.
X: A heart beats 72 times a minute. Find f, T and ω.
> f = 72/60 = 1.2 Hz; T = 0.83 s; ω = 2π × 1.2 = 7.5 rad s^{-1}
!: Frequency f and angular frequency ω differ by 2π; mixing them is one of the commonest errors.
Q: What two ingredients does an oscillator need? | A restoring force and inertia.
Q: Why are small oscillations about equilibrium usually simple harmonic? | Near a minimum the potential energy is approximately quadratic.
M1: A pendulum makes 20 swings in 30 s. Its period is: | 1.5 s | 0.67 s | 30 s | 600 s | T = 30/20.
M2: ω = 50 rad s^{-1} corresponds to f = ? | 8.0 Hz | 50 Hz | 314 Hz | 0.13 Hz | f = ω/2π.
T: Period | T, the time for one complete cycle
T: Frequency | f = 1/T, the number of cycles per second, in hertz
T: Angular frequency | ω = 2πf, in rad s^{-1}
SUM: T = 1/f, ω = 2πf = 2π/T.
SUM: Every SHM is periodic, but not every periodic motion is SHM (a bouncing ball, a square wave).
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: French A. P., Vibrations and Waves, MIT Introductory Physics Series, Norton | secondary | 1971
EV: established | Standard definitions.
Q: What is the period of a 50 Hz mains supply? | 0.020 s (20 ms).
M3@2: A heart beats 72 times a minute. What are its period and angular frequency? | About 0.83 s and 7.5 rad s^{-1} | 1.2 s and 1.2 rad s^{-1}, from 72/60 | 0.83 s and 1.2 rad s^{-1}, using f for ω | 72 s and 0.087 rad s^{-1}, per minute | f = 72/60 = 1.2 Hz, T = 1/f ≈ 0.83 s, ω = 2πf ≈ 7.5 rad s^{-1}.
SA2@2: Explain why a ball bouncing on a hard floor without energy loss is periodic but not simple harmonic. | It repeats with a fixed period, so it is periodic. But its acceleration is g downwards almost all the time, then a huge brief force at each bounce; it is not proportional to the displacement from a centre, and its motion isn't sinusoidal, so it isn't SHM (its period also depends on the drop height). | repeats with fixed period ; acceleration not proportional to displacement ; not sinusoidal ; period depends on amplitude

## Simple harmonic motion
S: Simple harmonic motion (SHM) is oscillation in which the acceleration is proportional to the displacement and directed towards equilibrium. Its displacement varies sinusoidally, and its period doesn't depend on amplitude.
LV: Introductory · Foundation
O: State the defining equation of SHM, a = −ω^{2}x, and its solution
O: Find displacement, velocity and acceleration at any point in the cycle
PRE: Periodic motion
H: Defining equation
E: a = −ω^{2}x :: the condition for SHM
E: x = A cos(ωt + φ)
E: v = −Aω sin(ωt + φ); v = ±ω√(A^{2} − x^{2})
E: a = −Aω^{2} cos(ωt + φ)
- Maximum speed Aω at equilibrium; maximum acceleration Aω^{2} at the extremes.
- Velocity leads displacement by 90°; acceleration is 180° out of phase with displacement.
H: Isochronism
P: The period 2π/ω depends only on the system (k/m, g/l), not on the amplitude. Galileo noticed this in a swinging lamp; it made pendulum clocks possible.
X: A mass oscillates with A = 0.05 m at 2.0 Hz. Find v_{max} and a_{max}.
> ω = 4π = 12.6 rad s^{-1}
> v_{max} = Aω = 0.63 m s^{-1}; a_{max} = Aω^{2} = 7.9 m s^{-2}
!: SHM requires a ∝ −x exactly. A bouncing ball has periodic motion but isn't SHM (its acceleration is constant while airborne).
P: **Investigate with the lab.** Set damping to zero, pull the mass and release it. Watch the displacement trace and check that the acceleration always points back towards equilibrium.
IX: oscillator
Q: State the defining condition for SHM. | Acceleration is proportional to displacement and opposite in direction: a = −ω^{2}x.
Q: Where is the speed greatest in SHM? | At the equilibrium position.
M1: In SHM, acceleration is greatest: | At maximum displacement | At equilibrium | Halfway | It is constant | |a| = ω^{2}|x|.
M2: An oscillator has A = 4 cm, ω = 10 rad s^{-1}. Its speed at x = 2 cm is: | 0.35 m s^{-1} | 0.4 m s^{-1} | 0.2 m s^{-1} | 0 | ω√(A^{2} − x^{2}) = 10√(0.0016 − 0.0004).
M2: What defines simple harmonic motion? | Acceleration proportional to displacement and directed towards equilibrium | Constant acceleration towards the equilibrium point | Velocity proportional to displacement at all times | Constant speed around a circle of fixed radius | In SHM, a = −ω²x: the restoring acceleration is proportional to displacement.
T: Simple harmonic motion | Oscillation with acceleration proportional and opposite to displacement: a = −ω^{2}x
T: Restoring force | A force that acts towards the equilibrium position
SUM: x = A cos(ωt + φ); v_{max} = ωA at the centre; a_{max} = ω^{2}A at the extremes.
SUM: v = ±ω√(A^{2} − x^{2}); the period doesn't depend on the amplitude.
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: French A. P., Vibrations and Waves, chapter 1, Norton | secondary | 1971
EV: established | Exact for a linear restoring force.
Q: Where in SHM is the speed greatest? | At the equilibrium position, where the displacement is zero.
M3@2,3: An oscillator has A = 0.10 m and ω = 5.0 rad s^{-1}. What is its speed when x = 0.060 m? | 0.40 m s^{-1} | 0.50 m s^{-1}, the maximum speed | 0.30 m s^{-1}, from ωx | 0.20 m s^{-1}, from ω(A − x) × 4 | v = ω√(A^{2} − x^{2}) = 5.0 × √(0.010 − 0.0036) = 5.0 × 0.080 = 0.40 m s^{-1}.
SA2@1,2: Show that x = A cos ωt satisfies a = −ω^{2}x and say what this means physically. | v = dx/dt = −Aω sin ωt; a = dv/dt = −Aω^{2} cos ωt = −ω^{2}x. The acceleration is always proportional to the displacement and directed back towards equilibrium, the defining property of SHM. | differentiate twice ; a = −ω^{2}x ; proportional to displacement ; directed towards equilibrium

## Amplitude, frequency, period and phase
S: An oscillation x = A cos(ωt + φ) is fully specified by its amplitude A, angular frequency ω and phase constant φ. Phase tells you where in its cycle an oscillator is, and phase differences describe how two oscillations line up.
LV: Introductory · Foundation
O: Read amplitude, period and phase from an equation or a graph
O: Calculate the phase difference between two oscillations
PRE: Simple harmonic motion
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
!: Phase is often quoted in degrees or fractions of a cycle; check which, and remember 2π rad = 360° = 1 cycle.
P: **Investigate with the lab.** Change the amplitude and check that the period stays the same. Then read the period and work out the frequency from f = 1/T.
IX: oscillator
Q: What determines the amplitude and phase of an oscillator? | Its initial conditions (initial displacement and velocity).
Q: What does a phase difference of π mean? | The oscillations are in antiphase: one is at a maximum when the other is at a minimum.
M1: x = 0.2 cos(5t + π/3). The amplitude and ω are: | 0.2 m, 5 rad s^{-1} | 5 m, 0.2 rad s^{-1} | 0.2 m, π/3 | 0.4 m, 5 | Read from the standard form.
M2: An oscillator released from rest at x = A has φ = ? | 0 | π/2 | π | −π/2 | x = A cos(ωt) at t = 0 gives A.
M2: For an ideal mass-spring oscillator, what happens to the period if you double the amplitude? | It stays the same | It doubles | It halves | It increases by √2 | The period of SHM is independent of amplitude.
T: Amplitude | The maximum displacement from equilibrium
T: Phase constant | φ in x = A cos(ωt + φ), set by the starting conditions
SUM: Phase difference Δφ = 2πΔt/T; in phase means Δφ = 0, antiphase means Δφ = π.
SUM: In SHM, velocity leads displacement by π/2 and acceleration is in antiphase with displacement.
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: French A. P., Vibrations and Waves, chapter 1, Norton | secondary | 1971
EV: established | Standard definitions.
Q: What is the phase difference between displacement and acceleration in SHM? | π rad (180°): they are in antiphase.
M3@2,3: An oscillator starts at x = A/2 moving towards +A. Writing x = A cos(ωt + φ), what is φ? | −π/3 | +π/3, the same magnitude | 0, as it starts near +A | π/6, from sin^{-1}(½) | cos φ = ½ gives φ = ±π/3; moving towards +A needs v = −Aω sin φ > 0, so sin φ < 0 and φ = −π/3.
SA2@1: Two pendulums have period 2.0 s; one passes the centre 0.25 s after the other. Find their phase difference in radians and degrees. | Δφ = 2πΔt/T = 2π × 0.25/2.0 = π/4 rad = 45°. | Δφ = 2πΔt/T ; π/4 rad ; 45°

## Mass-spring systems
S: A mass on a spring is the model simple harmonic oscillator. Hooke's law gives a restoring force proportional to extension, so the motion is SHM with a period set by the mass and the spring constant.
LV: Introductory · Application
O: Derive T = 2π√(m/k) for a mass on a spring
O: Find the effective stiffness of springs in series and parallel
PRE: Simple harmonic motion
H: Results
E: F = −kx ⇒ ω = √(k/m); T = 2π√(m/k)
- Vertical springs: gravity just shifts the equilibrium (by mg/k); the period is the same.
- Springs in series: 1/k = 1/k_{1} + 1/k_{2} (softer). In parallel: k = k_{1} + k_{2} (stiffer).
- A spring's own mass adds about one third of its mass: T = 2π√((m + m_{s}/3)/k).
H: Measuring k
- Static: hang masses and plot extension against load; k = 1/gradient (load/extension).
- Dynamic: plot T^{2} against m; gradient 4π^{2}/k.
X: A 0.25 kg mass on a spring of k = 100 N m^{-1}. Find T. How does it change with 1.0 kg?
> T = 2π√(0.25/100) = 0.31 s
> Quadrupling m doubles T: 0.63 s
!: Cutting a spring in half doubles its spring constant; each half stretches half as much under the same force.
P: **Investigate with the lab.** Double the mass and see the period grow by √2, not 2. Then double the spring constant instead and compare.
IX: oscillator
Q: What is the period of a mass–spring oscillator? | T = 2π√(m/k).
Q: Does gravity change the period of a vertical spring oscillator? | No, it only shifts the equilibrium position.
M1: Two identical springs (k each) in series have combined constant: | k/2 | 2k | k | k/4 | 1/k_{tot} = 2/k.
M2: To halve the period of a mass–spring system, the mass must be: | Quartered | Halved | Doubled | Unchanged | T ∝ √m.
M2: A mass-spring system has period 2.0 s. The mass is quadrupled. What is the new period? | 4.0 s | 8.0 s | 2.8 s | 1.0 s | T = 2π√(m/k), so four times the mass doubles the period.
T: Spring constant | k, the force per unit extension: F = −kx
T: Effective stiffness | The single k that behaves like a combination of springs
SUM: ω = √(k/m); T = 2π√(m/k), independent of amplitude and of g.
SUM: Parallel springs: k = k_{1} + k_{2}; series springs: 1/k = 1/k_{1} + 1/k_{2}.
SRC: OpenStax, University Physics Volume 1, section 15.1 "Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-1-simple-harmonic-motion
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 15 | secondary | 2013
EV: established | Exact for an ideal massless spring obeying Hooke's law; a spring's own mass adds about a third of it to m.
Q: Does a vertical mass-spring system have the same period as a horizontal one? | Yes: gravity only shifts the equilibrium position.
M3@2,3: A mass on a spring has T = 1.0 s. It is hung from two such springs in series. What is the new period? | About 1.41 s | 0.71 s, as springs add | 2.0 s, double the period | 1.0 s, unchanged | Two identical springs in series have k/2, so T ∝ 1/√k rises by √2.
SA2@1,2: A 0.50 kg mass stretches a spring by 0.10 m when hung from it. Find the spring constant and the period of oscillation (g = 9.8 m s^{-2}). | k = mg/x = 0.50 × 9.8/0.10 = 49 N m^{-1}. T = 2π√(m/k) = 2π√(0.50/49) ≈ 0.63 s (equivalently 2π√(x/g)). | k = mg/x ; 49 N m^{-1} ; T = 2π√(m/k) ; about 0.63 s

## Simple and physical pendulums
S: A simple pendulum is a point mass on a light string; a physical (compound) pendulum is any rigid body swinging about a pivot. For small angles both do SHM, with periods set by length, gravity and (for the physical pendulum) the mass distribution.
LV: Introductory · Application
O: Derive the small-angle period of a simple pendulum
O: Find the period of a physical pendulum from its moment of inertia
PRE: Mass-spring systems
H: Simple pendulum
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
!: The small-angle formula underestimates the period at large amplitude: 0.5% too short at 16°, 1.7% at 30°.
P: **Investigate with the lab.** Release from 10° or less and check that the exact period agrees with 2π√(L/g) to within 0.2%. Then make the pendulum four times longer and see the period double.
IX: pendulum
Q: What is the period of a physical pendulum? | T = 2π√(I/(Mgd)).
Q: What is the centre of percussion? | The point where an impact produces no reaction at the pivot (the sweet spot).
M1: A pendulum's period on the Moon (g = 1.6) compared with Earth (9.8): | About 2.5 times longer | The same | 6 times longer | Shorter | T ∝ 1/√g: √6.1 ≈ 2.5.
M2: Doubling the mass of a simple pendulum's bob changes its period: | Not at all | ×2 | ×√2 | ×1/2 | Mass cancels.
M2: A pendulum's length is quadrupled. What happens to its small-angle period? | It doubles | It quadruples | It halves | It stays the same | T = 2π√(L/g), so four times the length doubles the period.
T: Simple pendulum | A point mass on a light, inextensible string
T: Physical pendulum | A rigid body swinging about a fixed pivot
SUM: Simple pendulum: T = 2π√(l/g) for small angles. Physical pendulum: T = 2π√(I/(Mgd)).
SUM: The period doesn't depend on the mass; it rises slightly at large amplitude.
SRC: OpenStax, University Physics Volume 1, section 15.4 "Pendulums" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-4-pendulums
SRC: Baker G. L., Blackburn J. A., The Pendulum: A Case Study in Physics, Oxford University Press | secondary | 2005
EV: established | The small-angle formula is accurate to better than 1% below about 23°.
Q: How long must a simple pendulum be for a period of 2.0 s (g = 9.8 m s^{-2})? | l = gT^{2}/4π^{2} ≈ 0.99 m.
M3@2,3: A uniform rod 1.0 m long swings about one end. What is its small-angle period (g = 9.8 m s^{-2})? | About 1.6 s | About 2.0 s, as for a 1.0 m simple pendulum | About 1.4 s, as for a 0.5 m simple pendulum | About 1.2 s, using I = ML^{2}/12 | I = ML^{2}/3, d = L/2: T = 2π√(2L/3g) = 2π√(0.068) ≈ 1.64 s.
SA2@2: Explain why a pendulum clock taken up a high mountain runs slow. | The period T = 2π√(l/g) depends on g. Higher up, g is slightly smaller (further from Earth's centre), so T is longer: each swing takes more time and the clock counts fewer seconds than really pass. | T depends on g ; g smaller at altitude ; longer period ; clock loses time

## Energy in oscillatory systems
S: An undamped oscillator continually exchanges kinetic and potential energy while the total stays constant. Total energy is proportional to the square of the amplitude, which is why amplitude is a measure of an oscillator's energy.
LV: Introductory · Foundation
O: Describe the exchange between kinetic and potential energy in SHM
O: Show that total energy is proportional to amplitude squared
PRE: Simple harmonic motion
H: Energy in SHM
E: E = ½kA^{2} = ½mω^{2}A^{2}
E: KE = ½k(A^{2} − x^{2}); PE = ½kx^{2}
- KE and PE each oscillate at 2ω (twice the oscillation frequency).
- Time-averaged KE = time-averaged PE = E/2 (equipartition between the two).
H: Energy method for frequency
P: If the energy can be written as E = ½M_{eff}ẋ^{2} + ½K_{eff}x^{2}, then ω = √(K_{eff}/M_{eff}). This quickly gives periods for systems with springs, pulleys and rolling parts.
X: A 0.5 kg mass on a spring (k = 200 N m^{-1}) has A = 0.1 m. Find E and the speed at x = 0.06 m.
> E = ½ × 200 × 0.01 = 1.0 J
> KE = 1.0 − ½ × 200 × 0.0036 = 0.64 J ⇒ v = 1.6 m s^{-1}
!: Doubling the amplitude quadruples the energy, not doubles it.
P: **Investigate with the lab.** Watch the kinetic and potential energy bars swap during each cycle with no damping, then switch damping on and watch the total fall.
IX: oscillator
Q: How does an oscillator's energy depend on its amplitude? | E ∝ A^{2}.
Q: At what frequency do KE and PE oscillate in SHM? | Twice the oscillation frequency.
M1: At x = A/2 in SHM, what fraction of the energy is kinetic? | 3/4 | 1/2 | 1/4 | 1/√2 | PE = ¼ of max; KE = ¾.
M2: An oscillator's amplitude is tripled. Its energy: | ×9 | ×3 | ×√3 | ×27 | E ∝ A^{2}.
M2: In undamped SHM, where is the kinetic energy greatest? | At the equilibrium position | At maximum displacement | Halfway to maximum displacement | It is the same everywhere | Speed is greatest at equilibrium, where all the energy is kinetic.
T: Total energy (SHM) | E = ½kA^{2} = ½mω^{2}A^{2}, constant without damping
SUM: KE = ½k(A^{2} − x^{2}), PE = ½kx^{2}; their sum is ½kA^{2}.
SUM: Doubling the amplitude quadruples the energy.
T: Average energy | Over a cycle, the mean KE and mean PE are each half the total energy
SRC: OpenStax, University Physics Volume 1, section 15.2 "Energy in Simple Harmonic Motion" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-2-energy-in-simple-harmonic-motion
SRC: French A. P., Vibrations and Waves, chapter 3, Norton | secondary | 1971
EV: established | Exact for an undamped linear oscillator.
Q: At what displacement are KE and PE equal in SHM? | x = A/√2 ≈ 0.71A.
M3@2: A 0.20 kg mass oscillates on a spring (k = 80 N m^{-1}) with amplitude 0.050 m. What is its maximum speed? | 1.0 m s^{-1} | 0.10 m s^{-1}, from kA/m^{2} | 20 m s^{-1}, from kA/m | 0.50 m s^{-1}, from √(k/m)A/2 | ½kA^{2} = ½mv_{max}^{2}: v_{max} = A√(k/m) = 0.050 × 20 = 1.0 m s^{-1}.
SA2@1,2: Sketch (describe) how KE and PE vary with displacement in SHM, and explain the shape. | PE = ½kx^{2} is a parabola, zero at the centre and ½kA^{2} at ±A. KE = ½k(A^{2} − x^{2}) is an inverted parabola, maximum at the centre and zero at ±A. They always add to the constant total ½kA^{2}. | PE parabola zero at centre ; KE inverted parabola ; KE max at centre ; sum constant

## Damped oscillations
S: Real oscillators lose energy to friction, air resistance or electrical resistance, so their amplitude decays. With damping proportional to velocity the amplitude falls exponentially and the frequency drops slightly.
LV: Intermediate · Foundation
O: Write and solve the equation of motion with linear damping
O: Describe exponential decay of amplitude and energy
PRE: Energy in oscillatory systems
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
!: Damping changes the frequency only slightly for light damping; the big effect is on the amplitude.
P: **Investigate with the lab.** Add a little damping and watch the amplitude decay. Check that each peak is the same fraction of the one before.
IX: oscillator
Q: How does amplitude decay for viscous damping? | Exponentially, as e^{−γt/2}.
Q: What is the logarithmic decrement? | The natural log of the ratio of successive amplitudes.
M1: Light damping makes the oscillation frequency: | Slightly lower | Slightly higher | Unchanged exactly | Zero | ω_{d} < ω_{0}.
M2: Friction (constant force) damping makes amplitude decrease: | Linearly with time | Exponentially | Not at all | Quadratically | Each cycle loses a fixed amount.
M2: How does the amplitude of a lightly damped oscillator decrease? | Exponentially, by the same fraction each cycle | Linearly, by the same amount each cycle | It stays constant until the motion stops suddenly | It drops to zero after one cycle | Viscous damping removes a fixed fraction of the amplitude per cycle, giving exponential decay.
T: Damping | Loss of an oscillator's energy to friction, drag or resistance
T: Damping constant | b in F = −bv, setting how fast energy is lost
SUM: mẍ + bẋ + kx = 0; light damping gives x = A_{0}e^{−bt/2m} cos(ω′t + φ).
SUM: Amplitude decays with time constant 2m/b; energy decays twice as fast, with time constant m/b.
SRC: OpenStax, University Physics Volume 1, section 15.5 "Damped Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations
SRC: French A. P., Vibrations and Waves, chapter 3, Norton | secondary | 1971
EV: established | Linear damping is a model; real damping (dry friction, quadratic drag) can differ.
Q: If the amplitude of a damped oscillator falls by half, by what factor has its energy fallen? | To a quarter: energy ∝ A^{2}.
M3@2,3: An oscillator's amplitude falls from 10 cm to 5.0 cm in 20 s. What will it be after another 40 s? | 1.25 cm | 0 cm, as it falls by 5 cm each 20 s | 2.5 cm, halving once more | 3.75 cm, from linear decay | Exponential decay halves the amplitude every 20 s: 5.0 → 2.5 → 1.25 cm.
SA2@1: Explain why a lightly damped oscillator's frequency is slightly lower than its undamped frequency. | Damping opposes the motion, slowing the mass so each cycle takes a little longer: ω′ = √(ω_{0}^{2} − (b/2m)^{2}). For light damping the correction is tiny (second order in b). | damping slows the motion ; ω′ = √(ω_{0}^{2} − (b/2m)^{2}) ; slightly below ω_{0} ; small for light damping

## Underdamping, critical damping and overdamping
S: How strongly an oscillator is damped decides whether it oscillates as it settles. Underdamped systems ring, critically damped systems return fastest without overshooting, and overdamped systems creep back slowly.
LV: Intermediate · Application
O: Classify damping from the equation of motion
O: Explain why systems such as car suspensions are designed near critical damping
PRE: Damped oscillations
H: The three regimes (ζ = γ/(2ω_{0}), the damping ratio)
- **Underdamped** (ζ < 1): oscillates with decaying amplitude.
- **Critically damped** (ζ = 1): x = (A + Bt)e^{−ω_{0}t}; fastest return without overshoot.
- **Overdamped** (ζ > 1): sum of two decaying exponentials; slow, no oscillation.
H: Design choices
- Car suspension: slightly underdamped (ζ ≈ 0.2–0.4) for comfort and grip; worn shock absorbers make the car bounce.
- Analogue meters, door closers and building dampers: near critical, so they settle quickly.
- Musical instruments and clocks: very lightly damped, to ring.
X: A 2.0 kg mass on a spring (k = 50 N m^{-1}). What damping constant b gives critical damping?
> b_{c} = 2√(km) = 2√100 = 20 kg s^{-1}
!: Critical damping isn't "the most damping"; overdamped systems are slower to return.
P: **Investigate with the lab.** Increase the damping until the mass returns fastest with no overshoot: that is critical damping. Go beyond it and see the return slow down.
IX: oscillator
Q: What is critical damping? | The damping that returns a system to equilibrium fastest without oscillating.
Q: What is the critical damping coefficient for a mass–spring system? | b_{c} = 2√(km).
M1: A system with damping ratio 3 is: | Overdamped | Underdamped | Critically damped | Undamped | ζ > 1.
M2: Why are car suspensions slightly underdamped rather than overdamped? | Overdamped suspensions react too slowly to bumps | Underdamping removes all bounce | It's cheaper | Critical damping is impossible | They need to respond quickly while settling in about a cycle.
M2: Which damping returns a displaced system to equilibrium fastest without overshooting? | Critical damping | Heavy overdamping | Light underdamping | No damping at all | Critical damping gives the quickest return with no oscillation; overdamping is slower.
T: Underdamped | γ < ω_{0}: the system oscillates while its amplitude decays
T: Critically damped | γ = ω_{0}: the fastest return to equilibrium without oscillating
T: Overdamped | γ > ω_{0}: a slow return to equilibrium without oscillating
SUM: With γ = b/2m: underdamped if γ < ω_{0}, critical if γ = ω_{0}, overdamped if γ > ω_{0}.
SUM: Critical damping settles fastest without overshoot; overdamping is slower.
SRC: OpenStax, University Physics Volume 1, section 15.5 "Damped Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations
SRC: Boyce W. E., DiPrima R. C., Elementary Differential Equations and Boundary Value Problems, 10th edition, chapter 3, Wiley | secondary | 2012
EV: established | Exact classification for the linear damped oscillator.
Q: Why are analogue meter needles critically damped? | So they settle on the reading quickly without swinging past it.
M3@2,3: For m = 1.0 kg and k = 100 N m^{-1}, what damping constant b gives critical damping? | 20 kg s^{-1} | 10 kg s^{-1}, from √(k/m) | 100 kg s^{-1}, equal to k | 200 kg s^{-1}, from 2k | Critical damping needs b/2m = √(k/m) = 10 s^{-1}, so b = 2√(km) = 20 kg s^{-1}.
SA2@2: Explain why a car's suspension is designed to be slightly underdamped rather than overdamped. | Overdamping makes the wheel return slowly, so it can't follow the next bump and the ride feels harsh. Heavy underdamping makes the car bounce. Slightly below critical damping gives a quick return with only a small overshoot, a good compromise of comfort and grip. | overdamped is slow to respond ; heavily underdamped bounces ; near-critical returns quickly ; small overshoot acceptable

## Driven oscillations
S: A periodic driving force makes an oscillator vibrate at the driving frequency, not its natural one. After transients die away, the steady-state amplitude and phase depend on how the driving frequency compares with the natural frequency.
LV: Intermediate · Foundation
O: Describe transient and steady-state response to a periodic driving force
O: Describe how amplitude and phase of the steady state depend on driving frequency
PRE: Damped oscillations
H: The driven damped oscillator
E: mẍ + bẋ + kx = F_{0} cos ωt
E: A(ω) = (F_{0}/m)/√[(ω_{0}^{2} − ω^{2})^{2} + γ^{2}ω^{2}]
E: tan δ = γω/(ω_{0}^{2} − ω^{2}) :: phase lag of displacement behind the force
- Well below ω_{0}: x follows F in phase, A ≈ F_{0}/k (stiffness-controlled).
- At ω_{0}: lag 90°, A = F_{0}/(bω_{0}) (damping-controlled); velocity in phase with force, maximum power absorbed.
- Well above ω_{0}: lag 180°, A ≈ F_{0}/(mω^{2}) (mass-controlled).
X: Why does a child on a swing need pushes timed with the swing?
> Power absorbed = F·v; maximised when force is in phase with velocity
> That happens when driving at the natural frequency
!: The general solution includes a transient at the natural frequency; at start-up the motion can look messy before the steady state appears.
P: **Investigate with the lab.** Switch on the driving force and set a frequency well below, then well above, the natural frequency. Compare the steady amplitude and the phase of the motion.
IX: oscillator
Q: At what frequency does a driven oscillator vibrate in steady state? | The driving frequency.
Q: What is the phase lag at resonance? | 90° (displacement lags force; velocity is in phase with it).
M1: Driving far above resonance, the displacement is: | Small and in antiphase with the force | Large and in phase | Zero | At the natural frequency | Mass-controlled, 180° lag.
M2: At very low driving frequency, the amplitude is about: | F_{0}/k | F_{0}/b | 0 | Infinite | The spring just follows the slowly varying force.
M2: A system is driven far below its natural frequency. How does its displacement compare with the driving force? | Nearly in phase, with small amplitude | Exactly 90° out of phase | In antiphase, with large amplitude | It has no steady motion at all | At low driving frequency the system follows the force closely, nearly in phase.
T: Steady state | The motion after transients die away, at the driving frequency
T: Transient | The part of the motion at the natural frequency that decays after the drive starts
SUM: Steady-state amplitude A = (F_{0}/m)/√((ω_{0}^{2} − ω^{2})^{2} + (2γω)^{2}).
SUM: Below resonance the response is in phase with the drive; at resonance it lags by π/2; far above, by π.
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: French A. P., Vibrations and Waves, chapter 4, Norton | secondary | 1971
EV: established | Exact for the linear driven damped oscillator.
Q: At what frequency does a driven oscillator vibrate in the steady state? | At the driving frequency, not its natural frequency.
M3@2,3: A mass on a spring is driven far below its natural frequency. How does its displacement relate to the drive? | Almost in phase, with amplitude about F_{0}/k | In antiphase, with very large amplitude | Lagging by π/2, at maximum amplitude | Out of phase by π, with amplitude about F_{0}/k | At low frequency the spring force dominates: x ≈ F/k, following the force in phase.
SA2@1,2: Explain why a child on a swing is pushed once per cycle at the right moment rather than at random times. | Pushing at the swing's natural frequency and in step with its motion does positive work every cycle, so energy builds up (resonance). Random pushes sometimes oppose the motion and do negative work, so on average energy isn't added effectively. | drive at the natural frequency ; push in the direction of motion ; positive work each cycle ; random pushes cancel out

## Resonance
S: Resonance is the large response of a system driven at (or near) its natural frequency. It's harnessed in musical instruments, radios, MRI and lasers, and guarded against in bridges, buildings and engines.
LV: Intermediate · Application
O: Explain resonance and calculate the resonant frequency of a system
O: Describe useful and harmful examples of resonance
PRE: Driven oscillations
H: Key features
E: ω_{res} = √(ω_{0}^{2} − γ^{2}/2) :: amplitude peak (≈ ω_{0} for light damping)
- Peak height ∝ 1/γ: less damping, taller and sharper peak.
- Energy builds up over many cycles because each push adds energy in phase.
H: Useful resonance
- Tuning a radio: an LC circuit selects one frequency.
- Musical instruments: air columns and strings resonate at their harmonics.
- Microwave ovens heat water by driving molecular rotations; MRI excites nuclear spins at the Larmor frequency.
- Quartz crystals in watches resonate at 32 768 Hz.
H: Harmful resonance
- Tacoma Narrows Bridge (1940): wind drove a torsional mode (aeroelastic flutter, a self-excited oscillation).
- London Millennium Bridge (2000): pedestrians synchronised their steps with the bridge's sway; fixed with dampers.
- Engines and washing machines: avoid running at structural resonances; use mass dampers.
X: Why can a singer break a wine glass?
> The glass has a lightly damped mode (high Q) near 500–1000 Hz
> A loud note at exactly that frequency builds the vibration until the strain exceeds the breaking strain
!: Resonance needs matching frequency and low enough damping; a loud sound at the wrong frequency does little.
P: **Investigate with the lab.** Tune the driving frequency to within 2% of resonance and watch the amplitude grow. Then add damping and see the peak fall and widen.
IX: oscillator
Q: What is resonance? | A large-amplitude response when a system is driven at or near its natural frequency.
Q: How does damping affect a resonance peak? | More damping makes the peak lower and broader, and shifts it slightly to lower frequency.
M1: Soldiers break step crossing bridges to avoid: | Driving a resonance | Friction | Noise | Overloading | Synchronised steps could drive a natural mode.
M2: Reducing damping in a resonant system makes the peak: | Taller and narrower | Shorter and wider | Move to higher frequency | Disappear | A ∝ 1/γ at resonance; width ∝ γ.
M2: What does increasing the damping do to a resonance peak? | Lowers it and makes it broader | Raises it and makes it sharper | Moves it to a much higher frequency | Has no effect on its height | More damping removes energy faster, so the peak amplitude falls and the resonance broadens.
T: Resonance | A large-amplitude response when the driving frequency is near the natural frequency
T: Natural frequency | The frequency at which a system oscillates freely when disturbed
SUM: Resonant amplitude is limited only by damping; light damping gives a tall, narrow peak.
SUM: Resonance is used in radios, musical instruments and MRI, and is avoided in bridges, buildings and machinery.
SRC: OpenStax, University Physics Volume 1, section 15.6 "Forced Oscillations" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations
SRC: Dallard P. et al., "The London Millennium Footbridge", The Structural Engineer 79(22), 17–33 | primary | 2001
EV: established | The Millennium Bridge's 2000 sway came from people walking in step with its lateral (sideways) mode, and was fixed with dampers.
Q: What limits the amplitude at resonance? | Damping: energy lost per cycle equals energy supplied per cycle.
M3@2,3: A bridge has a natural sideways frequency of 1.0 Hz. Why can a crowd walking at about 2 steps per second excite it? | Sideways sway alternates each step, at half the step rate: about 1 Hz | Walking at 2 Hz always excites any structure | Vertical footfalls at 2 Hz drive sideways modes directly | The crowd's weight lowers the frequency to 2 Hz | Each step pushes left then right, so the sideways force repeats at 1 Hz, matching the mode (the Millennium Bridge mechanism).
SA2@2: Explain how a radio tuner uses resonance to select one station. | The tuner is an LC circuit with resonant frequency f = 1/(2π√(LC)). Adjusting C sets f to the wanted station's carrier frequency. The circuit responds strongly at that frequency and weakly at others, so that signal is selected; a high Q gives a narrow, selective response. | LC resonant circuit ; f = 1/(2π√(LC)) ; tune C to the station ; strong response only near resonance

## Quality factor
S: The quality factor Q measures how lightly damped an oscillator is: how many cycles it rings for, and how sharp its resonance peak is. High-Q systems store energy well and select frequencies precisely.
LV: Intermediate · Application
O: Define Q in terms of energy loss per cycle and resonance width
O: Calculate Q from ringing time or bandwidth
PRE: Resonance
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
!: High Q means narrow bandwidth: a high-Q filter selects a frequency well but responds slowly to changes.
P: **Investigate with the lab.** Make a sharp resonance with a quality factor above 10, then increase the damping and watch Q fall as the peak widens.
IX: oscillator
Q: Give two definitions of Q. | ω_{0}/Δω (resonance sharpness) and 2π × energy stored / energy lost per cycle.
Q: Why do atomic clocks need high-Q resonances? | A narrow resonance defines the frequency very precisely.
M1: An oscillator with f_{0} = 1000 Hz has a half-power bandwidth of 10 Hz. Q = ? | 100 | 10 | 1000 | 0.01 | Q = f_{0}/Δf.
M2: Increasing Q makes a system ring for: | Longer | Shorter | The same time | Zero time | Less energy lost per cycle.
M2: A resonance has a natural frequency of 50 Hz and a width of 2 Hz. What is its quality factor? | 25 | 100 | 52 | 0.04 | Q = f₀/Δf = 50/2 = 25.
T: Quality factor | Q = ω_{0}/Δω = 2π × (energy stored)/(energy lost per cycle)
T: Bandwidth | Δω, the full width of the resonance peak at half maximum power
SUM: High Q means the oscillator rings for many cycles (its amplitude falls by e^{−π} in about Q cycles) and has a sharp resonance peak.
SUM: Q ≈ ω_{0}/Δω; a guitar string has Q ~ 10^{3}, a quartz crystal ~ 10^{5}, a car suspension ~ 1.
SRC: French A. P., Vibrations and Waves, chapter 4, Norton | secondary | 1971
SRC: OpenStax, University Physics Volume 2, section 15.6 "Resonance in an AC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-6-resonance-in-an-ac-circuit
EV: established | Standard definitions; the two forms agree for light damping.
Q: What does a high Q mean? | Low energy loss per cycle: the system rings for a long time and has a sharp resonance.
M3@2,3: A resonance at 1000 Hz has a half-power bandwidth of 20 Hz. What is Q? | 50 | 20, equal to the bandwidth | 1000, equal to the frequency | 0.02, from 20/1000 | Q = f_{0}/Δf = 1000/20 = 50.
SA2@1,2: Explain why quartz crystals with Q around 10^{5} make good clocks. | A high Q means the resonance is extremely sharp, so the oscillator runs at a very precise frequency and small disturbances barely shift it. It also loses little energy per cycle, so it is easy to keep going with little drive. | high Q gives a sharp resonance ; frequency very precise ; small disturbances have little effect ; low energy loss

## Coupled oscillators
S: When oscillators are linked, energy flows between them. Two pendulums joined by a spring take turns swinging; the motion is a mix of special patterns, the normal modes, each oscillating at its own frequency.
LV: Intermediate · Foundation
O: Write the equations of motion for two coupled oscillators
O: Explain the periodic transfer of energy between them
PRE: Mass-spring systems
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
!: Each normal mode, on its own, oscillates at a single frequency with a fixed shape; energy transfer happens only when modes are mixed.
Q: Why does energy pass back and forth between two weakly coupled pendulums? | The motion is a superposition of two normal modes with slightly different frequencies, which beat.
Q: In the in-phase mode of two pendulums coupled by a spring, why is the frequency √(g/l)? | The spring isn't stretched, so it has no effect.
M1: Stronger coupling makes energy transfer: | Faster | Slower | Stop | Unchanged | The mode frequencies separate more, so beats are faster.
M2: How many normal modes do N coupled oscillators (1D) have? | N | 1 | 2N | N^{2} | One per degree of freedom.
T: Coupling | A link (spring, string, shared support) through which oscillators exchange energy
T: Weak coupling | Coupling small compared with each oscillator's own restoring force
SUM: Two identical coupled pendulums have an in-phase mode at ω_{0} and an antiphase mode at a higher frequency.
SUM: Starting one alone excites both modes, and their beating moves energy back and forth.
SRC: French A. P., Vibrations and Waves, chapter 5, Norton | secondary | 1971
SRC: Crawford F. S., Waves, Berkeley Physics Course volume 3, chapter 1, McGraw-Hill | secondary | 1968
EV: established | Exact for linear coupled oscillators.
Q: How often does energy swap between two weakly coupled pendulums? | At the beat frequency of their two normal-mode frequencies.
M3@2,3: Two coupled pendulums have mode frequencies 1.00 Hz and 1.05 Hz. How long does it take for the energy to move completely from one to the other? | 10 s | 20 s, a full beat period | 1.0 s, one swing | 0.05 s, from the difference | The energy swaps fully in half a beat period: 1/(2 × 0.05 Hz) = 10 s.
SA2@2: Explain why the antiphase mode of two pendulums joined by a spring has a higher frequency than the in-phase mode. | In-phase, the pendulums move together and the spring isn't stretched, so only gravity restores them: ω = √(g/l). In antiphase, the spring is stretched and compressed, adding to the restoring force, so the effective stiffness and frequency are higher: ω = √(g/l + 2k/m). | in-phase: spring unstretched ; only gravity restores ; antiphase: spring adds restoring force ; higher stiffness gives higher frequency

## Normal modes
S: A normal mode is a pattern of motion in which every part of a system oscillates at the same frequency with fixed relative amplitudes. Any small motion of a linear system is a superposition of its normal modes.
LV: Intermediate · Application
O: Find the normal-mode frequencies of a simple system as an eigenvalue problem
O: Write any motion as a superposition of normal modes
PRE: Coupled oscillators
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
!: Real systems have many modes; a structure's lowest mode isn't the only one that can be excited.
Q: What is a normal mode? | A motion in which all parts oscillate at one frequency with fixed relative amplitude and phase.
Q: How many vibrational modes does a linear molecule of N atoms have? | 3N − 5.
M1: The modes of a string fixed at both ends have frequencies: | f_{n} = nf_{1} | f_{n} = n^{2}f_{1} | All the same | f_{n} = f_{1}/n | Harmonic series.
M2: Why does a bell sound different from a guitar? | Its mode frequencies aren't harmonics of a fundamental | It has no modes | It is louder | It's lightly damped | 2D shells have inharmonic modes.
T: Normal mode | A pattern in which every part oscillates at the same frequency with fixed relative amplitudes
T: Degrees of freedom | The number of independent coordinates; a system has as many normal modes
SUM: Substituting x = Ae^{iωt} turns the equations of motion into an eigenvalue problem for ω^{2}.
SUM: N coupled masses have N modes; any motion is a combination of them.
SRC: French A. P., Vibrations and Waves, chapter 5, Norton | secondary | 1971
SRC: Goldstein H., Poole C., Safko J., Classical Mechanics, 3rd edition, chapter 6, Addison-Wesley | secondary | 2002
EV: established | Exact for small oscillations of linear systems.
Q: How many normal modes do three masses joined in a line by springs have, for motion along the line? | Three (one may be a zero-frequency translation if the ends are free).
M3@2,3: A CO_{2} molecule (O=C=O) is modelled as three masses on two springs, moving along the axis. How many non-zero-frequency normal modes are there? | 2 | 3, one per atom | 1, the stretch | 4, two per bond | Three masses give three modes; one is uniform translation (zero frequency), leaving the symmetric and asymmetric stretches.
SA2@1,2: Explain why normal modes simplify coupled-oscillator problems. | In normal coordinates the equations decouple: each mode behaves as an independent simple harmonic oscillator with its own frequency. You solve each separately and add them, with amounts set by the initial conditions, instead of solving coupled equations. | modes decouple the equations ; each is an independent SHO ; superpose the solutions ; initial conditions set amplitudes

## Beat frequencies
S: When two oscillations of slightly different frequency add, the result swells and fades at the difference frequency: beats. Musicians tune with them and engineers use the same idea to measure frequencies precisely.
LV: Introductory · Application
O: Explain beats as the superposition of two close frequencies
O: Calculate the beat frequency and use it to tune instruments
PRE: Amplitude, frequency, period and phase
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
!: Beats are only heard clearly when the two frequencies are close (within ~15 Hz); larger differences sound like roughness or two separate notes.
P: **Investigate with the lab.** Tune two nearly equal notes and watch the loudness rise and fall. Make the frequencies closer and see the beats slow down.
IX: waves
Q: What is the beat frequency of two tones? | The difference of their frequencies.
Q: How do musicians use beats to tune? | They adjust until the beats between two notes disappear.
M1: Tones of 256 Hz and 260 Hz produce beats at: | 4 Hz | 258 Hz | 2 Hz | 516 Hz | Difference.
M2: A heterodyne receiver mixes a 100.0 MHz signal with a 89.3 MHz oscillator. The difference frequency is: | 10.7 MHz | 189.3 MHz | 100 MHz | 5.35 MHz | Standard FM IF.
M2: As two notes are tuned closer together, what happens to the beats? | They become slower | They become faster | They disappear immediately | The pitch doubles | Beat frequency equals the frequency difference, so it falls as the notes converge.
T: Beats | Periodic swelling and fading of loudness when two close frequencies add
T: Beat frequency | f_{beat} = |f_{1} − f_{2}|
SUM: Sum of two close tones: a tone at the average frequency whose loudness varies at |f_{1} − f_{2}|.
SUM: Tuning to zero beats makes two notes the same frequency.
SRC: OpenStax, University Physics Volume 1, section 17.7 "Beats" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/17-7-beats
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
EV: established | Exact result of superposition.
Q: A 440 Hz fork and a string give 3 beats per second. What can the string's frequency be? | 437 Hz or 443 Hz.
M3@2,3: A string gives 4 beats/s with a 256 Hz fork. Tightening it slightly makes the beats faster. What was its frequency? | 260 Hz | 252 Hz | 256 Hz | 264 Hz | Tightening raises the pitch; if beats speed up, the string was already above 256 Hz, moving further away: 260 Hz.
SA2@1: Show that cos ω_{1}t + cos ω_{2}t gives a beat pattern, and identify the beat frequency. | Using the sum-to-product identity: 2 cos((ω_{1} − ω_{2})t/2) cos((ω_{1} + ω_{2})t/2). The fast term oscillates at the average frequency; the slow envelope has frequency (f_{1} − f_{2})/2, but loudness peaks twice per envelope cycle, so beats occur at |f_{1} − f_{2}|. | sum-to-product identity ; average-frequency carrier ; slow envelope ; beat frequency |f_{1} − f_{2}|

## Anharmonic oscillations
S: An anharmonic oscillator has a restoring force that isn't exactly proportional to displacement. Then the period depends on amplitude, harmonics appear in the motion, and important physics like thermal expansion follows.
LV: Intermediate · Foundation
O: Recognise when a restoring force is not linear and its consequences
O: Explain how anharmonicity explains thermal expansion
PRE: Energy in oscillatory systems
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
!: Harmonic approximations are only valid for small amplitudes; check how large the next term in the potential is.
P: **Investigate with the lab.** Release from 90° or more and compare the exact period with the small-angle formula. Find how much longer it is.
IX: pendulum
Q: Why do solids expand when heated? | The interatomic potential is asymmetric (anharmonic), so the average separation increases with vibration amplitude.
Q: How does a large-amplitude pendulum's period compare with the small-angle value? | It's longer.
M1: An anharmonic oscillator's motion contains: | Harmonics of the fundamental | Only the fundamental | No periodic motion | Only lower frequencies | Non-linear forces generate harmonics.
M2: The Morse potential describes: | Diatomic molecular bonds | Springs | Planets | Pendulums | It captures bond stretching and dissociation.
M2: Why does a pendulum released from 90° take longer per swing than 2π√(L/g) predicts? | The restoring force grows more slowly than the angle, so the motion isn't SHM | Air resistance always slows larger swings | Gravity is weaker at large angles | The string stretches more at large angles | The restoring force is proportional to sin θ, which falls below θ at large angles.
T: Anharmonic | Having a restoring force not exactly proportional to displacement
T: Harmonics | Frequencies at whole multiples of the fundamental, generated by anharmonic motion
SUM: Anharmonic: the period depends on amplitude and harmonics appear.
SUM: Asymmetric interatomic potentials make atoms' mean separation grow with vibration amplitude, so solids expand on heating.
SRC: Landau L. D., Lifshitz E. M., Mechanics, 3rd edition, section 28, Pergamon | secondary | 1976
SRC: Kittel C., Introduction to Solid State Physics, 8th edition, chapter 5, Wiley | secondary | 2005
EV: established | Standard mechanics and solid-state physics.
Q: Is a pendulum at large amplitude harmonic? | No: its restoring force is ∝ sin θ, so its period grows with amplitude.
M3@2,3: The potential between two atoms is steeper on compression than on stretching. What happens to their mean separation as temperature rises? | It increases: they spend longer on the gentler, stretched side | It decreases, as they collide harder | It stays the same, as motion is symmetric | It oscillates between larger and smaller values | An asymmetric well shifts the average position outwards at larger amplitudes: thermal expansion.
SA2@2: A pendulum's period at 60° amplitude is about 7% longer than the small-angle value. Explain why. | The restoring torque is ∝ sin θ, which is less than θ at large angles, so the restoring force is weaker than the linear approximation assumes. The pendulum accelerates back more slowly and each swing takes longer; the period depends on amplitude. | restoring torque ∝ sin θ ; sin θ < θ ; weaker restoring force ; longer period, amplitude-dependent

## Nonlinear oscillators
S: Nonlinear oscillators obey equations where superposition fails. They show behaviour linear systems can't: amplitude-dependent frequencies, jumps and hysteresis, self-sustained limit cycles, synchronisation and chaos.
LV: Advanced · Foundation
O: Describe behaviours of nonlinear oscillators that linear ones can't show
O: Describe limit cycles and chaotic motion with examples
PRE: Anharmonic oscillations
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
!: You can't predict a nonlinear system's response to a combined input by adding responses to each part.
P: **Investigate with the lab.** Compare small and large release angles: at large angles the period depends on amplitude, a sign of a nonlinear oscillator.
IX: pendulum
Q: What is a limit cycle? | An isolated closed trajectory in phase space that nearby motions approach: a self-sustained oscillation.
Q: What does the Duffing oscillator's bent resonance curve cause? | Multiple stable amplitudes, jumps and hysteresis when the frequency is swept.
M1: Which is a self-sustained oscillator? | Van der Pol oscillator | Mass on a spring | Simple pendulum | Damped LC circuit | It settles on a limit cycle without a periodic drive.
M2: Superposition fails for nonlinear systems because: | The equations aren't linear in the variables | They have no solutions | They are always chaotic | They're undamped | Sums of solutions aren't solutions.
M2: What distinguishes a nonlinear oscillator from a simple harmonic one? | Its period depends on its amplitude | Its period is always exactly constant | It cannot oscillate at all | Its energy is never conserved | In a nonlinear oscillator the restoring force isn't proportional to displacement, so the period changes with amplitude.
T: Limit cycle | An isolated closed path in phase space that nearby motions approach
T: Duffing oscillator | ẍ + δẋ + αx + βx^{3} = F cos ωt, a standard nonlinear model
T: Chaos | Bounded, aperiodic motion with sensitive dependence on initial conditions
SUM: Nonlinear: no superposition, amplitude-dependent frequency, jumps and hysteresis, limit cycles, chaos.
SUM: Self-sustained oscillators (heartbeats, violin strings, clocks) settle onto a limit cycle whatever their start.
SRC: Strogatz S. H., Nonlinear Dynamics and Chaos, 2nd edition, Westview Press | secondary | 2015
SRC: van der Pol B., "On relaxation-oscillations", Philosophical Magazine 2, 978–992 | primary | 1926
EV: established | These behaviours are well established mathematically and experimentally.
Q: What is a limit cycle? | A closed orbit in phase space that nearby trajectories spiral towards: a self-sustained oscillation of fixed amplitude.
M3@1,2: A driven pendulum is set going twice with starts differing by 0.001 rad, and the motions soon differ completely. What does this show? | Chaos: sensitive dependence on initial conditions | Random forces acting on the pendulum | Measurement error in the second run | Damping that's too large | The equations are deterministic; tiny differences grow exponentially in a chaotic system.
SA2@1,2: Explain why superposition fails for nonlinear oscillators. | Superposition needs the equation to be linear: if x_{1} and x_{2} are solutions, so is x_{1} + x_{2}. With a nonlinear term such as x^{3}, (x_{1} + x_{2})^{3} ≠ x_{1}^{3} + x_{2}^{3}, so the sum doesn't satisfy the equation, and motions can't be built from simpler ones. | superposition requires linearity ; nonlinear term such as x^{3} ; cross terms appear ; sums of solutions aren't solutions

## Parametric resonance
S: Parametric resonance grows oscillations by periodically varying a parameter of the system (length, stiffness) rather than pushing it. The strongest effect comes from varying the parameter at twice the natural frequency.
LV: Advanced · Foundation
O: Explain how varying a parameter can pump energy into an oscillator
O: State the condition for the strongest parametric resonance
PRE: Resonance
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
!: Parametric resonance can't start from exactly zero amplitude; it needs a small initial disturbance to amplify, unlike ordinary forced resonance.
Q: At what frequency is parametric resonance strongest? | At twice the natural frequency.
Q: How does a child pump a swing without a push? | By shifting their centre of mass up and down twice per cycle, changing the effective length.
M1: Parametric resonance varies: | A parameter like length or stiffness | The driving force directly | Only the mass | Only the damping | It's a modulation of the system itself.
M2: Faraday waves on a vibrating liquid oscillate at: | Half the drive frequency | The drive frequency | Twice the drive frequency | Unrelated frequencies | Parametric response at Ω/2.
T: Parametric resonance | Growth of oscillation caused by periodically varying a system parameter, such as length or stiffness
T: Mathieu equation | ẍ + ω_{0}^{2}(1 + h cos Ωt)x = 0, the standard model
SUM: Strongest when the parameter varies at twice the natural frequency (Ω ≈ 2ω_{0}).
SUM: Oscillations grow exponentially from small disturbances, unlike ordinary resonance, which grows linearly.
SRC: Landau L. D., Lifshitz E. M., Mechanics, 3rd edition, section 27, Pergamon | secondary | 1976
SRC: Strogatz S. H., Nonlinear Dynamics and Chaos, 2nd edition, Westview Press | secondary | 2015
EV: established | The Mathieu equation's stability regions are proven mathematically.
Q: How does a child pump a swing without being pushed? | By raising and lowering their centre of mass twice per cycle, changing the pendulum's effective length.
M3@2,3: A pendulum's length is varied periodically. At what rate is the parametric pumping most effective? | Twice per swing cycle | Once per swing cycle | Four times per swing cycle | Once every two swing cycles | The main parametric resonance is at Ω = 2ω_{0}: lengthen at the extremes, shorten at the bottom, each half-cycle.
SA2@1,2: Explain how standing up at the bottom of each swing and squatting at the ends adds energy to a swing. | Standing at the bottom raises the centre of mass against the large centripetal plus gravitational force there, doing a lot of work. Squatting at the ends lowers it where the string tension is smaller, so less energy is returned. The net work each half-cycle adds energy, so the amplitude grows. | standing at the bottom does work against high tension ; squatting at the ends returns less ; net energy gained ; twice per cycle

## Mechanical vibration analysis
S: Vibration analysis measures and models how machines and structures vibrate, to prevent fatigue, noise and failure and to diagnose faults early. It combines modal analysis, spectra and isolation design.
LV: Intermediate · Application
O: Describe how vibration is measured and analysed in machines and structures
O: Explain vibration isolation and the role of the frequency ratio
PRE: Driven oscillations
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
!: Soft mounts amplify vibration when passing through resonance during start-up; add damping or pass through quickly.
Q: Above what frequency ratio does a spring mount isolate vibration? | ω/ω_{0} > √2.
Q: What does a peak at twice running speed in a vibration spectrum often indicate? | Shaft misalignment.
M1: A tuned mass damper works by: | Absorbing energy at a target frequency with its own resonance | Stiffening the building | Adding friction everywhere | Changing gravity | Its resonance opposes the structure's motion.
M2: To isolate a machine running at 50 Hz, the mount's natural frequency should be: | Well below 35 Hz, e.g. 10 Hz | 50 Hz | Above 50 Hz | Exactly 35 Hz | Need ω/ω_{0} ≫ √2.
T: Vibration isolation | Mounting a machine on springs so little vibration passes to its support
T: Transmissibility | The ratio of transmitted to applied force amplitude
SUM: Isolation works only when the driving frequency exceeds √2 times the mount's natural frequency.
SUM: A vibration spectrum shows faults as peaks at characteristic frequencies (imbalance at the running speed, bearing defects at higher ones).
SRC: Rao S. S., Mechanical Vibrations, 6th edition, Pearson | secondary | 2017
SRC: Inman D. J., Engineering Vibration, 4th edition, Pearson | secondary | 2014
EV: established | Standard vibration engineering.
Q: What does a vibration peak at exactly the shaft's rotation frequency usually indicate? | Imbalance of the rotor.
M3@2,3: A machine running at 50 Hz sits on mounts with natural frequency 10 Hz. Do the mounts isolate it? | Yes: 50/10 = 5 is well above √2, so transmissibility is low | No: the mounts should match the 50 Hz running speed | No: isolation needs the mounts stiffer than the machine | Yes, but only because the mounts add damping | Transmissibility ≈ 1/((f/f_{n})^{2} − 1) = 1/24 for light damping, about 4%.
SA2@2: Explain why a washing machine shakes most during spin-up and then runs more smoothly at full speed. | As the drum speeds up, its rotation frequency passes through the natural frequency of the drum on its suspension, causing resonance and big shaking. At full speed the drive is well above that natural frequency, so the response and transmitted force are small. | rotation frequency rises ; passes through the natural frequency ; resonance gives large shaking ; above it the response falls

## Frequency response
S: A system's frequency response describes how it amplifies (or attenuates) and phase-shifts sinusoidal inputs at each frequency. For linear systems it completely characterises their behaviour, since any input is a sum of sinusoids.
LV: Intermediate · Application
O: Describe a linear system by the gain and phase of its response at each frequency
O: Read a Bode plot
PRE: Resonance
H: Transfer function
E: H(ω) = output/input (complex); |H| gain, arg H phase
E: H(ω) = 1/(k − mω^{2} + ibω) :: displacement response of a driven oscillator
- Bode plots: log gain (dB) and phase against log frequency.
- −3 dB points define the bandwidth (power halved).
H: Filters
- Low-pass RC: H = 1/(1 + iωRC); cut-off f_{c} = 1/(2πRC); rolls off at −20 dB per decade.
- High-pass and band-pass filters; second-order systems roll off at −40 dB per decade.
- Mechanical analogues: suspension (low-pass for road bumps), loudspeaker enclosures.
X: A low-pass RC filter has R = 10 kΩ, C = 100 nF. Find f_{c} and the gain at 10f_{c}.
> f_{c} = 1/(2π × 10^{4} × 10^{-7}) = 159 Hz
> At 1.59 kHz: |H| ≈ 0.1 (−20 dB)
!: Frequency response describes steady state only; transients (start-up ringing) need the full time-domain solution.
P: **Investigate with the lab.** Sweep the driving frequency and watch the resonance curve build up. Compare the curves for light and heavy damping.
IX: oscillator
Q: What does a Bode plot show? | Gain (in dB) and phase against log frequency.
Q: What is the cut-off frequency of an RC filter? | f_{c} = 1/(2πRC).
M1: A gain of −20 dB in amplitude means: | One tenth | One hundredth | Half | Doubled | 20 log_{10}(0.1) = −20.
M2: A first-order low-pass filter rolls off at: | −20 dB per decade | −40 dB per decade | −6 dB per decade | 0 | Gain ∝ 1/f above cut-off.
M2: What does a frequency response curve show? | Steady-state amplitude against driving frequency | Displacement against time for one cycle | Energy against amplitude | Period against mass | It plots how strongly the system responds at each driving frequency.
T: Transfer function | Output over input, as a complex function of frequency
T: Bode plot | Graphs of gain (in dB) and phase against log frequency
T: Cut-off frequency | The frequency where the gain has fallen by 3 dB (power halved)
SUM: A linear system turns a sinusoid into a sinusoid of the same frequency, changing only amplitude and phase.
SUM: An RC low-pass filter has f_{c} = 1/(2πRC) and falls at 20 dB per decade above it.
SRC: Horowitz P., Hill W., The Art of Electronics, 3rd edition, chapter 1, Cambridge University Press | secondary | 2015
SRC: Ogata K., Modern Control Engineering, 5th edition, Pearson | secondary | 2010
EV: established | Exact for linear time-invariant systems.
Q: What is the gain of an RC low-pass filter at its cut-off frequency? | 1/√2 of the input amplitude (−3 dB), with a phase lag of 45°.
M3@2: An RC low-pass filter has R = 1.0 kΩ and C = 1.0 μF. What is its cut-off frequency? | About 160 Hz | 1000 Hz, from 1/RC | About 6.3 kHz, from 2π/RC | 1.0 Hz, from RC | f_{c} = 1/(2πRC) = 1/(2π × 10^{-3}) ≈ 159 Hz.
SA2@1,2: Explain why the frequency response fully describes a linear system. | Any input signal can be written as a sum of sinusoids (Fourier analysis). A linear system responds to each sinusoid independently by scaling and phase-shifting it, and superposition adds the results. Knowing gain and phase at every frequency therefore predicts the output for any input. | any input is a sum of sinusoids ; each sinusoid scaled and shifted ; superposition applies ; so the response predicts any output

## Fourier analysis of oscillations
S: Fourier analysis breaks any oscillation into a sum of pure sinusoids. Musical timbre, vibration diagnosis, signal processing and spectroscopy all rest on seeing a motion as a spectrum of frequencies.
LV: Intermediate · Application
O: Decompose a periodic oscillation into its harmonics
O: Interpret a spectrum to explain timbre and diagnose vibration
PRE: Taylor and Fourier series
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
!: A short record can't resolve close frequencies, however fast you sample; resolution depends on duration.
Q: Why do a flute and a violin sound different playing the same note? | Different harmonic content (and attack and decay).
Q: What limits the frequency resolution of an FFT? | The length of the recording: Δf = 1/T.
M1: A square wave contains: | Odd harmonics | Even harmonics only | Only the fundamental | No harmonics | Fourier series of a symmetric square wave.
M2: A rapidly decaying oscillation has a spectral peak that is: | Broad | Narrow | Absent | At zero frequency | Short duration ⇒ wide bandwidth.
T: Spectrum | The amplitudes (and phases) of the frequency components of a signal
T: Timbre | The quality of a sound, set by the relative strengths of its harmonics
SUM: A periodic signal = fundamental + harmonics; the spectrum is a set of lines at nf.
SUM: Instruments playing the same note differ in timbre because their harmonic amplitudes differ.
SRC: Rossing T. D., Moore F. R., Wheeler P. A., The Science of Sound, 3rd edition, Addison-Wesley | secondary | 2002
SRC: Bracewell R. N., The Fourier Transform and Its Applications, 3rd edition, McGraw-Hill | secondary | 2000
EV: established | Standard signal analysis.
Q: Why do a flute and a violin playing the same note sound different? | They have the same fundamental but different strengths of harmonics.
M3@2,3: A clarinet's spectrum shows strong 1st, 3rd and 5th harmonics but weak even ones. What does this suggest about its tube? | It behaves like a tube closed at one end, which supports odd harmonics | It is open at both ends, supporting all harmonics | It has no resonances at all | Its walls are vibrating instead of the air | A closed–open tube supports only odd multiples of the fundamental; the clarinet's reed end acts as a closed end.
SA2@1: Explain how a frequency spectrum can reveal a worn bearing in a motor. | Defects in a bearing produce impacts each time a ball passes the flaw, at characteristic frequencies set by the bearing's geometry and speed. These show as peaks (and harmonics) in the vibration spectrum that aren't present when the bearing is healthy, so comparing spectra over time diagnoses the wear. | defects cause repeated impacts ; at characteristic frequencies ; peaks in the spectrum ; comparison over time shows wear
`;
