// Unit 6: Oscillations and Vibrations. Format: kit/course/notes.js
export default `
## Periodic motion
S: Periodic motion repeats itself after a fixed time, the period. Pendulums, hearts, planets, AC currents, vibrating atoms and light waves are all periodic, and almost any stable system disturbed slightly will oscillate.
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
Q: What is periodic motion? | Motion that repeats itself after a fixed time, the period.
Q: What is the period of an oscillation? | The time for one complete cycle.
Q: What is frequency? | The number of cycles per second, f = 1/T, measured in hertz.
Q: How is angular frequency related to frequency? | ω = 2πf.
Q: What does the restoring force do in an oscillator? | Pulls the object back towards equilibrium.
Q: What role does inertia play in oscillation? | It makes the object overshoot the equilibrium position.
Q: Give two examples of periodic motion that isn't sinusoidal. | A bouncing ball and a heartbeat.
Q: What does Fourier's idea say about any periodic motion? | It is a sum of sinusoids.
Q: A heart beats 72 times a minute. What are f and T? | f = 1.2 Hz and T ≈ 0.83 s.
Q: What is one of the commonest errors with oscillation frequencies? | Mixing up f and ω, which differ by a factor of 2π.

## Simple harmonic motion
S: Simple harmonic motion (SHM) is oscillation in which the acceleration is proportional to the displacement and directed towards equilibrium. Its displacement varies sinusoidally, and its period doesn't depend on amplitude.
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
D: phys-u06-shm-a-against-x
!: SHM requires a ∝ −x exactly. A bouncing ball has periodic motion but isn't SHM (its acceleration is constant while airborne).
P: **Investigate with the lab.** Set damping to zero, pull the mass and release it. Watch the displacement trace and check that the acceleration always points back towards equilibrium.
IX: oscillator
Q: State the defining condition for SHM. | Acceleration is proportional to displacement and opposite in direction: a = −ω^{2}x.
Q: Where is the speed greatest in SHM? | At the equilibrium position.
M1: In SHM, acceleration is greatest: | At maximum displacement | At equilibrium | Halfway | It is constant | |a| = ω^{2}|x|.
M2: An oscillator has A = 4 cm, ω = 10 rad s^{-1}. Its speed at x = 2 cm is: | 0.35 m s^{-1} | 0.4 m s^{-1} | 0.2 m s^{-1} | 0 | ω√(A^{2} − x^{2}) = 10√(0.0016 − 0.0004).
M2: What defines simple harmonic motion? | Acceleration proportional to displacement and directed towards equilibrium | Constant acceleration towards the equilibrium point | Velocity proportional to displacement at all times | Constant speed around a circle of fixed radius | In SHM, a = −ω²x: the restoring acceleration is proportional to displacement.
Q: What is the displacement equation of SHM? | x = A cos(ωt + φ).
Q: What is the velocity of an SHM oscillator in terms of displacement? | v = ±ω√(A^{2} − x^{2}).
Q: What is the maximum speed in SHM? | Aω, at equilibrium.
Q: What is the maximum acceleration in SHM, and where? | Aω^{2}, at the extremes.
Q: What is the phase relationship between velocity and displacement in SHM? | Velocity leads displacement by 90°.
Q: What is the phase relationship between acceleration and displacement in SHM? | They are 180° out of phase.
Q: What is isochronism? | The period of SHM doesn't depend on the amplitude.
Q: Who noticed isochronism in a swinging lamp? | Galileo, and it made pendulum clocks possible.
Q: A mass oscillates with A = 0.05 m at 2.0 Hz. What is its maximum speed? | About 0.63 m s^{-1}.
Q: Why is a bouncing ball not in SHM? | Its acceleration is constant while airborne, not proportional to −x.

## Amplitude, frequency, period and phase
S: An oscillation x = A cos(ωt + φ) is fully specified by its amplitude A, angular frequency ω and phase constant φ. Phase tells you where in its cycle an oscillator is, and phase differences describe how two oscillations line up.
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
D: phys-u06-phase-difference
!: Phase is often quoted in degrees or fractions of a cycle; check which, and remember 2π rad = 360° = 1 cycle.
P: **Investigate with the lab.** Change the amplitude and check that the period stays the same. Then read the period and work out the frequency from f = 1/T.
IX: oscillator
Q: What determines the amplitude and phase of an oscillator? | Its initial conditions (initial displacement and velocity).
Q: What does a phase difference of π mean? | The oscillations are in antiphase: one is at a maximum when the other is at a minimum.
M1: x = 0.2 cos(5t + π/3). The amplitude and ω are: | 0.2 m, 5 rad s^{-1} | 5 m, 0.2 rad s^{-1} | 0.2 m, π/3 | 0.4 m, 5 | Read from the standard form.
M2: An oscillator released from rest at x = A has φ = ? | 0 | π/2 | π | −π/2 | x = A cos(ωt) at t = 0 gives A.
M2: For an ideal mass-spring oscillator, what happens to the period if you double the amplitude? | It stays the same | It doubles | It halves | It increases by √2 | The period of SHM is independent of amplitude.
Q: What is amplitude? | The maximum displacement from equilibrium.
Q: What sets the angular frequency of an oscillator? | The system's physics.
Q: What is the phase of an oscillation? | The angle ωt + φ in the cycle.
Q: What is the phase constant φ? | The phase at t = 0.
Q: How is amplitude found from initial conditions? | A = √(x_{0}^{2} + (v_{0}/ω)^{2}).
Q: How is phase difference calculated from a time difference? | Δφ = 2πΔt/T.
Q: What phase difference means quadrature? | π/2.
Q: How are oscillations shown on a phasor diagram? | As rotating vectors, with the phase difference as the angle between them.
Q: Two pendulums of period 2.0 s pass equilibrium 0.5 s apart. What is the phase difference? | π/2, or 90°.
Q: How many degrees is 2π radians of phase? | 360°, one full cycle.

## Mass-spring systems
S: A mass on a spring is the model simple harmonic oscillator. Hooke's law gives a restoring force proportional to extension, so the motion is SHM with a period set by the mass and the spring constant.
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
D: phys-u06-spring-period
!: Cutting a spring in half doubles its spring constant; each half stretches half as much under the same force.
P: **Investigate with the lab.** Double the mass and see the period grow by √2, not 2. Then double the spring constant instead and compare.
IX: oscillator
Q: What is the period of a mass–spring oscillator? | T = 2π√(m/k).
Q: Does gravity change the period of a vertical spring oscillator? | No, it only shifts the equilibrium position.
M1: Two identical springs (k each) in series have combined constant: | k/2 | 2k | k | k/4 | 1/k_{tot} = 2/k.
M2: To halve the period of a mass–spring system, the mass must be: | Quartered | Halved | Doubled | Unchanged | T ∝ √m.
M2: A mass-spring system has period 2.0 s. The mass is quadrupled. What is the new period? | 4.0 s | 8.0 s | 2.8 s | 1.0 s | T = 2π√(m/k), so four times the mass doubles the period.
Q: Why does a mass on a spring perform SHM? | Hooke's law gives a restoring force proportional to extension.
Q: What is the angular frequency of a mass-spring system? | ω = √(k/m).
Q: By how much does gravity shift the equilibrium of a vertical spring? | By mg/k.
Q: What is the combined spring constant of two springs in series? | 1/k = 1/k_{1} + 1/k_{2}, softer than either.
Q: What is the combined spring constant of two springs in parallel? | k = k_{1} + k_{2}, stiffer.
Q: How does a spring's own mass affect the period? | It adds about one third of its mass: T = 2π√((m + m_{s}/3)/k).
Q: How is k found dynamically? | Plot T^{2} against m; the gradient is 4π^{2}/k.
Q: How is k found statically? | Hang masses and plot extension against load; k is the load per unit extension.
Q: What happens to the period if the mass is quadrupled? | It doubles.
Q: What happens to a spring's constant if it is cut in half? | It doubles.

## Simple and physical pendulums
S: A simple pendulum is a point mass on a light string; a physical (compound) pendulum is any rigid body swinging about a pivot. For small angles both do SHM, with periods set by length, gravity and (for the physical pendulum) the mass distribution.
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
Q: What is a simple pendulum? | A point mass on a light string.
Q: What is a physical pendulum? | Any rigid body swinging about a pivot.
Q: What is the period of a simple pendulum at small angles? | T = 2π√(l/g).
Q: Does the period of a simple pendulum depend on its mass? | No.
Q: How long is a seconds pendulum? | About 0.994 m, with T = 2 s.
Q: What is the equivalent simple length of a physical pendulum? | l_{eq} = I/(Md).
Q: How does Kater's reversible pendulum measure g? | It uses two pivots adjusted to give equal periods.
Q: What is the period of a 1.0 m uniform rod swinging from one end? | About 1.64 s.
Q: What is the amplitude correction to a pendulum's period? | T ≈ 2π√(l/g)(1 + θ_{0}^{2}/16).
Q: How wrong is the small-angle formula at 30°? | About 1.7% too short.

## Energy in oscillatory systems
S: An undamped oscillator continually exchanges kinetic and potential energy while the total stays constant. Total energy is proportional to the square of the amplitude, which is why amplitude is a measure of an oscillator's energy.
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
D: phys-u06-shm-energy
!: Doubling the amplitude quadruples the energy, not doubles it.
P: **Investigate with the lab.** Watch the kinetic and potential energy bars swap during each cycle with no damping, then switch damping on and watch the total fall.
IX: oscillator
Q: How does an oscillator's energy depend on its amplitude? | E ∝ A^{2}.
Q: At what frequency do KE and PE oscillate in SHM? | Twice the oscillation frequency.
M1: At x = A/2 in SHM, what fraction of the energy is kinetic? | 3/4 | 1/2 | 1/4 | 1/√2 | PE = ¼ of max; KE = ¾.
M2: An oscillator's amplitude is tripled. Its energy: | ×9 | ×3 | ×√3 | ×27 | E ∝ A^{2}.
M2: In undamped SHM, where is the kinetic energy greatest? | At the equilibrium position | At maximum displacement | Halfway to maximum displacement | It is the same everywhere | Speed is greatest at equilibrium, where all the energy is kinetic.
Q: What happens to energy in an undamped oscillator? | It continually exchanges between kinetic and potential while the total stays constant.
Q: What is the total energy of a mass-spring oscillator? | E = ½kA^{2} = ½mω^{2}A^{2}.
Q: What is the kinetic energy at displacement x in SHM? | KE = ½k(A^{2} − x^{2}).
Q: What is the potential energy at displacement x in SHM? | PE = ½kx^{2}.
Q: What are the time-averaged KE and PE in SHM? | Each is E/2.
Q: How does the energy method give an oscillator's frequency? | Write E = ½M_{eff}ẋ^{2} + ½K_{eff}x^{2}; then ω = √(K_{eff}/M_{eff}).
Q: A 0.5 kg mass on a 200 N m^{-1} spring has A = 0.1 m. What is its energy? | 1.0 J.
Q: In that example, what is the speed at x = 0.06 m? | About 1.6 m s^{-1}.
Q: What happens to energy if amplitude doubles? | It quadruples.
Q: Why is amplitude a measure of an oscillator's energy? | Energy is proportional to amplitude squared.

## Damped oscillations
S: Real oscillators lose energy to friction, air resistance or electrical resistance, so their amplitude decays. With damping proportional to velocity the amplitude falls exponentially and the frequency drops slightly.
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
D: phys-u06-damped-amplitude
!: Damping changes the frequency only slightly for light damping; the big effect is on the amplitude.
P: **Investigate with the lab.** Add a little damping and watch the amplitude decay. Check that each peak is the same fraction of the one before.
IX: oscillator
Q: How does amplitude decay for viscous damping? | Exponentially, as e^{−γt/2}.
Q: What is the logarithmic decrement? | The natural log of the ratio of successive amplitudes.
M1: Light damping makes the oscillation frequency: | Slightly lower | Slightly higher | Unchanged exactly | Zero | ω_{d} < ω_{0}.
M2: Friction (constant force) damping makes amplitude decrease: | Linearly with time | Exponentially | Not at all | Quadratically | Each cycle loses a fixed amount.
M2: How does the amplitude of a lightly damped oscillator decrease? | Exponentially, by the same fraction each cycle | Linearly, by the same amount each cycle | It stays constant until the motion stops suddenly | It drops to zero after one cycle | Viscous damping removes a fixed fraction of the amplitude per cycle, giving exponential decay.
Q: What causes damping in real oscillators? | Energy loss to friction, air resistance or electrical resistance.
Q: What is the equation of a damped oscillator? | mẍ + bẋ + kx = 0.
Q: What is the damped angular frequency? | ω_{d} = √(ω_{0}^{2} − γ^{2}/4).
Q: How does energy decay in viscous damping? | E(t) = E_{0}e^{−γt}, twice as fast as amplitude.
Q: What is the amplitude time constant? | 2/γ.
Q: How is the logarithmic decrement related to γ? | δ = γT_{d}/2.
Q: How does amplitude decay with dry (Coulomb) friction? | Linearly, by a fixed amount each cycle.
Q: How does quadratic drag damping behave? | Decay is faster at large amplitude.
Q: A pendulum's amplitude halves in 40 s. What is γ? | About 0.035 s^{-1}.
Q: What is the main effect of light damping? | It reduces the amplitude; the frequency changes only slightly.

## Underdamping, critical damping and overdamping
S: How strongly an oscillator is damped decides whether it oscillates as it settles. Underdamped systems ring, critically damped systems return fastest without overshooting, and overdamped systems creep back slowly.
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
D: phys-u06-damping-regimes
!: Critical damping isn't "the most damping"; overdamped systems are slower to return.
P: **Investigate with the lab.** Increase the damping until the mass returns fastest with no overshoot: that is critical damping. Go beyond it and see the return slow down.
IX: oscillator
Q: What is critical damping? | The damping that returns a system to equilibrium fastest without oscillating.
Q: What is the critical damping coefficient for a mass–spring system? | b_{c} = 2√(km).
M1: A system with damping ratio 3 is: | Overdamped | Underdamped | Critically damped | Undamped | ζ > 1.
M2: Why are car suspensions slightly underdamped rather than overdamped? | Overdamped suspensions react too slowly to bumps | Underdamping removes all bounce | It's cheaper | Critical damping is impossible | They need to respond quickly while settling in about a cycle.
M2: Which damping returns a displaced system to equilibrium fastest without overshooting? | Critical damping | Heavy overdamping | Light underdamping | No damping at all | Critical damping gives the quickest return with no oscillation; overdamping is slower.
Q: What is the damping ratio ζ? | ζ = γ/(2ω_{0}).
Q: How does an underdamped system behave? | It oscillates with decaying amplitude (ζ < 1).
Q: What is the motion of a critically damped system? | x = (A + Bt)e^{−ω_{0}t}.
Q: How does an overdamped system return to equilibrium? | Slowly, as a sum of two decaying exponentials with no oscillation.
Q: What damping ratio do car suspensions use? | Slightly underdamped, about 0.2 to 0.4, for comfort and grip.
Q: What happens with worn shock absorbers? | The car bounces.
Q: Give two devices designed near critical damping. | Analogue meters, door closers and building dampers.
Q: Why are musical instruments very lightly damped? | So they ring.
Q: What damping constant critically damps a 2.0 kg mass on a 50 N m^{-1} spring? | 20 kg s^{-1}.
Q: Is critical damping the most damping possible? | No. Overdamped systems have more damping and return more slowly.

## Driven oscillations
S: A periodic driving force makes an oscillator vibrate at the driving frequency, not its natural one. After transients die away, the steady-state amplitude and phase depend on how the driving frequency compares with the natural frequency.
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
Q: What is the equation of a driven damped oscillator? | mẍ + bẋ + kx = F_{0} cos ωt.
Q: What is the steady-state amplitude of a driven oscillator? | A = (F_{0}/m)/√[(ω_{0}^{2} − ω^{2})^{2} + γ^{2}ω^{2}].
Q: How does a driven oscillator behave well below its natural frequency? | It follows the force in phase with A ≈ F_{0}/k: stiffness-controlled.
Q: What is the amplitude at resonance in terms of damping? | A = F_{0}/(bω_{0}): damping-controlled.
Q: How does a driven oscillator behave well above its natural frequency? | It lags by 180° with A ≈ F_{0}/(mω^{2}): mass-controlled.
Q: When is power absorbed from the driver greatest? | When the force is in phase with the velocity, at the natural frequency.
Q: What is the phase lag formula for a driven oscillator? | tan δ = γω/(ω_{0}^{2} − ω^{2}).
Q: Why must swing pushes be timed with the swing? | Power F·v is greatest when force is in phase with velocity.
Q: Why can a driven oscillator's motion look messy at start-up? | A transient at the natural frequency is present before it dies away.
Q: Does a driven oscillator in steady state vibrate at its natural frequency? | No, at the driving frequency.

## Resonance
S: Resonance is the large response of a system driven at (or near) its natural frequency. It's harnessed in musical instruments, radios, MRI and lasers, and guarded against in bridges, buildings and engines.
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
D: phys-u06-resonance-curves
!: Resonance needs matching frequency and low enough damping; a loud sound at the wrong frequency does little.
P: **Investigate with the lab.** Tune the driving frequency to within 2% of resonance and watch the amplitude grow. Then add damping and see the peak fall and widen.
IX: oscillator
Q: What is resonance? | A large-amplitude response when a system is driven at or near its natural frequency.
Q: How does damping affect a resonance peak? | More damping makes the peak lower and broader, and shifts it slightly to lower frequency.
M1: Soldiers break step crossing bridges to avoid: | Driving a resonance | Friction | Noise | Overloading | Synchronised steps could drive a natural mode.
M2: Reducing damping in a resonant system makes the peak: | Taller and narrower | Shorter and wider | Move to higher frequency | Disappear | A ∝ 1/γ at resonance; width ∝ γ.
M2: What does increasing the damping do to a resonance peak? | Lowers it and makes it broader | Raises it and makes it sharper | Moves it to a much higher frequency | Has no effect on its height | More damping removes energy faster, so the peak amplitude falls and the resonance broadens.
Q: At what frequency is the amplitude peak of a damped driven oscillator? | ω_{res} = √(ω_{0}^{2} − γ^{2}/2), close to ω_{0} for light damping.
Q: How does the resonance peak height depend on damping? | It is proportional to 1/γ.
Q: Why does energy build up at resonance? | Each push adds energy in phase over many cycles.
Q: How is resonance used to tune a radio? | An LC circuit selects one frequency.
Q: At what frequency do quartz watch crystals resonate? | 32 768 Hz.
Q: What destroyed the Tacoma Narrows Bridge in 1940? | Wind drove a torsional mode by aeroelastic flutter, a self-excited oscillation.
Q: Why did the London Millennium Bridge sway in 2000? | Pedestrians synchronised their steps with its sway; dampers fixed it.
Q: How do engines and washing machines avoid harmful resonance? | By avoiding running at structural resonances and using mass dampers.
Q: How can a singer break a wine glass? | A loud note at its lightly damped natural frequency builds vibration until it breaks.
Q: What two conditions does resonance need for a big response? | A matching frequency and low enough damping.

## Quality factor
S: The quality factor Q measures how lightly damped an oscillator is: how many cycles it rings for, and how sharp its resonance peak is. High-Q systems store energy well and select frequencies precisely.
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
Q: What does the quality factor Q measure? | How lightly damped an oscillator is.
Q: How is Q related to the damping constant? | Q = ω_{0}/γ.
Q: In how many cycles does amplitude fall by 1/e? | About Q/π cycles.
Q: How large is the resonant amplitude compared with the static response? | Q times larger.
Q: What is the typical Q of a car suspension? | About 1.
Q: What is the typical Q of a quartz crystal? | About 10^{5} to 10^{6}.
Q: What is the Q of a superconducting microwave cavity? | About 10^{10}.
Q: A 440 Hz tuning fork's energy falls to 1/e in 10 s. Estimate Q. | About 2.8 × 10^{4}.
Q: What is the downside of a high-Q filter? | It responds slowly to changes, because its bandwidth is narrow.
Q: What is Δω in Q = ω_{0}/Δω? | The full width of the power resonance at half maximum.

## Coupled oscillators
S: When oscillators are linked, energy flows between them. Two pendulums joined by a spring take turns swinging; the motion is a mix of special patterns, the normal modes, each oscillating at its own frequency.
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
Q: What happens when oscillators are linked? | Energy flows between them.
Q: What are normal modes of coupled oscillators? | Special patterns, each oscillating at its own frequency.
Q: What is the frequency of the antiphase mode of two spring-coupled pendulums? | ω_{2} = √(g/l + 2k/m).
Q: At what rate does energy slosh between two coupled pendulums? | At the beat frequency ω_{2} − ω_{1}.
Q: How does weak coupling affect energy exchange? | The mode frequencies are close, so exchange is slow.
Q: Give a molecular example of coupled oscillations. | The symmetric and asymmetric stretches of CO_{2}.
Q: What do coupled atoms in crystals give? | Phonons.
Q: Two 1.0 m pendulums have ω_{2} = 1.05ω_{1}. How long does complete energy transfer take? | About 20 s.
Q: How do coupled qubits exchange excitations? | The same way as coupled oscillators.
Q: Does a single normal mode transfer energy between parts? | No. Energy transfer happens only when modes are mixed.

## Normal modes
S: A normal mode is a pattern of motion in which every part of a system oscillates at the same frequency with fixed relative amplitudes. Any small motion of a linear system is a superposition of its normal modes.
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
Q: What can any small motion of a linear system be written as? | A superposition of its normal modes.
Q: What equation gives normal mode frequencies? | det(K − ω^{2}M) = 0.
Q: What do the eigenvectors of the normal mode problem give? | The mode shapes.
Q: What happens to energy put into one normal mode of a linear system? | It stays in that mode.
Q: What are the modes of a string fixed at both ends? | sin(nπx/L), with f_{n} = nv/(2L).
Q: How do the mode frequencies of drumheads and bells differ from strings? | They are not harmonically related.
Q: How many vibrational modes does a non-linear molecule of N atoms have? | 3N − 6.
Q: How many vibrational modes does H_{2}O have? | Three: symmetric stretch, asymmetric stretch and bend.
Q: Why do engineers study building sway modes? | To keep them away from earthquake and wind frequencies.
Q: What patterns show the 2D modes of a drumhead? | Chladni patterns with nodal lines.

## Beat frequencies
S: When two oscillations of slightly different frequency add, the result swells and fades at the difference frequency: beats. Musicians tune with them and engineers use the same idea to measure frequencies precisely.
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
Q: What are beats? | The swelling and fading of two added oscillations of slightly different frequency.
Q: What is the sum cos ω_{1}t + cos ω_{2}t? | 2 cos(½Δω t) cos(ω̄t).
Q: Why is the heard beat rate twice the envelope frequency? | Loudness peaks twice per envelope cycle.
Q: How do heterodyne radio receivers use beats? | They mix a signal with a local oscillator to get a fixed intermediate frequency.
Q: How are optical frequencies measured with beats? | Laser beat notes with frequency combs.
Q: How does Doppler radar measure speed? | From the beat between sent and reflected waves.
Q: A 440 Hz fork and a string give 3 beats per second. What are the possible string frequencies? | 437 Hz or 443 Hz.
Q: If tightening that string slows the beats, what was its frequency? | 437 Hz.
Q: Within what frequency difference are beats heard clearly? | About 15 Hz.
Q: What do larger frequency differences than beats sound like? | Roughness or two separate notes.

## Anharmonic oscillations
S: An anharmonic oscillator has a restoring force that isn't exactly proportional to displacement. Then the period depends on amplitude, harmonics appear in the motion, and important physics like thermal expansion follows.
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
Q: What is an anharmonic oscillator? | One whose restoring force isn't exactly proportional to displacement.
Q: Name three signs of anharmonicity. | Amplitude-dependent period, harmonics in the motion, and an average position that shifts with amplitude.
Q: What is the general potential expansion for an anharmonic oscillator? | U(x) = ½kx^{2} + ⅓αx^{3} + ¼βx^{4}.
Q: Why is a pendulum anharmonic? | Its restoring torque is proportional to sin θ, softer than linear.
Q: What potential describes molecular bonds? | The Morse potential, steep on compression and gentle on stretching.
Q: How do molecular vibration levels behave near dissociation? | They crowd together.
Q: Would a perfectly harmonic crystal expand on heating? | No.
Q: Why does a pendulum clock run slow if its swing grows from 2° to 6°? | The period increases with amplitude, by about 0.06%, or 53 s per day.
Q: When are harmonic approximations valid? | Only for small amplitudes.
Q: What harmonics appear in anharmonic motion? | 2ω, 3ω and so on.

## Nonlinear oscillators
S: Nonlinear oscillators obey equations where superposition fails. They show behaviour linear systems can't: amplitude-dependent frequencies, jumps and hysteresis, self-sustained limit cycles, synchronisation and chaos.
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
Q: What fails for nonlinear oscillators that works for linear ones? | Superposition.
Q: Name three behaviours unique to nonlinear oscillators. | Amplitude-dependent frequencies, jumps and hysteresis, limit cycles, synchronisation or chaos.
Q: What is the Duffing oscillator? | An oscillator with a cubic stiffening or softening spring term βx^{3}.
Q: What is the van der Pol equation? | ẍ − μ(1 − x^{2})ẋ + x = 0, which has a self-sustained limit cycle.
Q: How does van der Pol damping depend on amplitude? | Negative at small amplitude and positive at large.
Q: Give two systems modelled by van der Pol oscillators. | Heartbeats, valve circuits and lasers.
Q: What did Huygens observe about two pendulum clocks on one beam? | They synchronised.
Q: Give two examples of synchronisation. | Fireflies flashing together, heart pacemaker cells, or grid generators locked to 50 Hz.
Q: Why does a bowed violin string sustain a steady note? | Stick-slip friction feeds energy in, losses grow with amplitude, so it settles on a limit cycle.
Q: Can driven nonlinear oscillators become chaotic? | Yes, such as driven pendulums and Duffing oscillators.

## Parametric resonance
S: Parametric resonance grows oscillations by periodically varying a parameter of the system (length, stiffness) rather than pushing it. The strongest effect comes from varying the parameter at twice the natural frequency.
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
Q: What is parametric resonance? | Growing oscillations by periodically varying a system parameter, such as length or stiffness.
Q: What equation describes parametric resonance? | The Mathieu equation, ẍ + ω_{0}^{2}[1 + h cos(Ωt)]x = 0.
Q: What threshold does damping set for parametric resonance? | h must exceed about 2γ/ω_{0}.
Q: How does parametric amplitude grow, and what limits it? | Exponentially, until nonlinearity limits it.
Q: How is the Botafumeiro censer swung? | By pulling its rope twice per cycle.
Q: What are Faraday waves? | Waves on a vertically vibrated liquid at half the driving frequency.
Q: Give an engineering example of parametric resonance. | Parametric amplifiers, or ships' parametric rolling in head seas.
Q: A swing has a period of 3.0 s. How often should you stand and squat? | Every 1.5 s, about 0.67 Hz.
Q: Can parametric resonance start from exactly zero amplitude? | No. It needs a small initial disturbance to amplify.
Q: How many times per cycle is energy pumped in at the main parametric instability? | Twice per cycle.

## Mechanical vibration analysis
S: Vibration analysis measures and models how machines and structures vibrate, to prevent fatigue, noise and failure and to diagnose faults early. It combines modal analysis, spectra and isolation design.
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
D: phys-u06-transmissibility
!: Soft mounts amplify vibration when passing through resonance during start-up; add damping or pass through quickly.
Q: Above what frequency ratio does a spring mount isolate vibration? | ω/ω_{0} > √2.
Q: What does a peak at twice running speed in a vibration spectrum often indicate? | Shaft misalignment.
M1: A tuned mass damper works by: | Absorbing energy at a target frequency with its own resonance | Stiffening the building | Adding friction everywhere | Changing gravity | Its resonance opposes the structure's motion.
M2: To isolate a machine running at 50 Hz, the mount's natural frequency should be: | Well below 35 Hz, e.g. 10 Hz | 50 Hz | Above 50 Hz | Exactly 35 Hz | Need ω/ω_{0} ≫ √2.
Q: Why is vibration analysis used? | To prevent fatigue, noise and failure and diagnose faults early.
Q: What instruments measure vibration? | Piezoelectric or MEMS accelerometers and laser vibrometers.
Q: What does a spectrum peak at running speed indicate? | Imbalance.
Q: What is modal testing? | Tapping with an instrumented hammer and measuring the response to find frequencies, damping and mode shapes.
Q: How are vibration modes predicted before building? | With finite element models.
Q: What is the undamped transmissibility of a mount? | T = 1/(1 − (ω/ω_{0})^{2}), taking its magnitude.
Q: How should machines be mounted to isolate vibration? | On soft springs so ω_{0} is well below the operating frequency.
Q: What is a tuned mass damper? | A device that absorbs a specific frequency, such as Taipei 101's 660-tonne pendulum.
Q: A 1500 rpm machine sits on 5 Hz mounts. What is the transmissibility? | About 4%, giving 96% isolation.
Q: What problem do soft mounts cause during start-up? | They amplify vibration when passing through resonance.

## Frequency response
S: A system's frequency response describes how it amplifies (or attenuates) and phase-shifts sinusoidal inputs at each frequency. For linear systems it completely characterises their behaviour, since any input is a sum of sinusoids.
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
D: phys-u06-rc-low-pass
!: Frequency response describes steady state only; transients (start-up ringing) need the full time-domain solution.
P: **Investigate with the lab.** Sweep the driving frequency and watch the resonance curve build up. Compare the curves for light and heavy damping.
IX: oscillator
Q: What does a Bode plot show? | Gain (in dB) and phase against log frequency.
Q: What is the cut-off frequency of an RC filter? | f_{c} = 1/(2πRC).
M1: A gain of −20 dB in amplitude means: | One tenth | One hundredth | Half | Doubled | 20 log_{10}(0.1) = −20.
M2: A first-order low-pass filter rolls off at: | −20 dB per decade | −40 dB per decade | −6 dB per decade | 0 | Gain ∝ 1/f above cut-off.
M2: What does a frequency response curve show? | Steady-state amplitude against driving frequency | Displacement against time for one cycle | Energy against amplitude | Period against mass | It plots how strongly the system responds at each driving frequency.
Q: What is a system's frequency response? | How it amplifies or attenuates and phase-shifts sinusoidal inputs at each frequency.
Q: Why does frequency response fully characterise a linear system? | Any input is a sum of sinusoids.
Q: What is the transfer function H(ω)? | The complex ratio of output to input; its size is the gain and its argument the phase.
Q: What is the displacement transfer function of a driven oscillator? | H(ω) = 1/(k − mω^{2} + ibω).
Q: What do the −3 dB points define? | The bandwidth, where power is halved.
Q: What is the transfer function of a low-pass RC filter? | H = 1/(1 + iωRC).
Q: How fast does a first-order filter roll off? | At −20 dB per decade.
Q: How fast does a second-order system roll off? | At −40 dB per decade.
Q: What is the cut-off of a low-pass filter with R = 10 kΩ and C = 100 nF? | About 159 Hz.
Q: What does frequency response not describe? | Transients, such as start-up ringing, which need the time-domain solution.

## Fourier analysis of oscillations
S: Fourier analysis breaks any oscillation into a sum of pure sinusoids. Musical timbre, vibration diagnosis, signal processing and spectroscopy all rest on seeing a motion as a spectrum of frequencies.
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
Q: What does Fourier analysis do? | Breaks any oscillation into a sum of pure sinusoids.
Q: What spectrum does a periodic signal have? | A line spectrum: the fundamental and its harmonics.
Q: What spectral shape does a decaying oscillation give? | A Lorentzian peak of width about γ.
Q: What spectrum does noise have? | A continuous spectrum.
Q: What is the time-frequency trade-off? | Δf Δt is at least about 1.
Q: Which harmonics does a clarinet emphasise? | Odd harmonics, because it is a closed pipe.
Q: How do a violin's harmonics fall off? | It contains all harmonics, falling as 1/n.
Q: Why is a window function used with an FFT? | To reduce spectral leakage.
Q: What is a spectrogram? | A display of how a spectrum changes in time.
Q: What are the resolution and range for 2.0 s sampled at 10 kHz? | 0.5 Hz resolution and up to 5 kHz.
`;
