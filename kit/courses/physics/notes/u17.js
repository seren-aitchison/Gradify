// Unit 17: Magnetism and Electromagnetism. Format: kit/course/notes.js
export default `
## Magnetic fields
S: A magnetic field is the region around a magnet or moving charge where other moving charges and magnets feel a force. Field lines run from north to south outside a magnet and always form closed loops.
H: Sources
- Moving charges and currents.
- Intrinsic magnetic moments of particles (electron spin).
- Permanent magnets: aligned atomic moments.
- Changing electric fields (displacement current).
H: Units and sizes
E: B in tesla (T); 1 T = 1 N A^{-1} m^{-1}; 1 G = 10^{-4} T
- Earth's field ~25–65 μT; fridge magnet ~5 mT; MRI 1.5–7 T; strongest steady lab field ~45 T; neutron stars ~10^{8} T; magnetars up to ~10^{11} T.
H: Field lines
- Never cross; closed loops (no magnetic monopoles: ∇·B = 0).
- Denser lines = stronger field.
- Iron filings and compasses map them.
X: Earth's magnetic field at the surface is ~50 μT. How does that compare with a 1.5 T MRI?
> Ratio = 1.5/5 × 10^{-5} = 30 000
!: Earth's geographic North Pole is near a magnetic south pole (it attracts compass north poles).
Q: What are the sources of magnetic fields? | Moving charges (currents), intrinsic magnetic moments (spin) and changing electric fields.
Q: Why do magnetic field lines form closed loops? | There are no magnetic monopoles (∇·B = 0).
M1: The SI unit of magnetic flux density is: | Tesla | Weber | Henry | Gauss | T = N A^{-1} m^{-1}.
M2: Earth's magnetic field strength at the surface is about: | 50 μT | 1 T | 5 mT | 50 nT | Tens of microtesla.

## Magnetic forces on charges
S: A magnetic field exerts a force on a moving charge, perpendicular to both its velocity and the field. Because the force is always sideways, it changes the direction of motion but never the speed.
H: The force
E: F = qv × B; |F| = qvB sin θ
- Zero for charges at rest or moving parallel to B.
- Direction by the right-hand rule (or Fleming's left-hand rule for conventional current); reversed for negative charges.
- Does no work: F ⊥ v.
H: Consequences
- Charges circle in uniform fields (cyclotrons, mass spectrometers).
- Earth's field deflects cosmic rays and solar wind particles, funnelling them to the poles (aurorae).
- Hall effect: charges pushed to one side of a conductor create a measurable voltage.
X: A proton at 3 × 10^{6} m s^{-1} moves perpendicular to 0.5 T. Force?
> F = 1.6 × 10^{-19} × 3 × 10^{6} × 0.5 = 2.4 × 10^{-13} N
!: A magnetic force can't speed up or slow down a charge; it only changes direction. Accelerators use electric fields to add energy.
Q: Why does the magnetic force do no work? | It's always perpendicular to the velocity.
Q: When is the magnetic force on a moving charge zero? | When the charge moves parallel (or antiparallel) to B, or is at rest.
M1: An electron moving east in a field pointing north is pushed: | Up (out of the ground) | Down | West | North | F = −e(v × B): v × B is down, so force is up.
M2: The magnetic force on a charge depends on: | Its charge, speed and angle to B | Its mass | Only B | Its position only | qvB sin θ.

## Lorentz force
S: The Lorentz force is the total electromagnetic force on a charged particle: the electric force plus the magnetic force. With Maxwell's equations it completes classical electromagnetism.
H: The law
E: F = q(E + v × B)
- Electric part acts on all charges, does work.
- Magnetic part acts only on moving charges, does no work.
H: Crossed fields
E: v = E/B :: velocity selector: undeflected particles
- Thomson used crossed fields (1897) to find e/m for the electron, discovering it.
- Mass spectrometers combine a velocity selector with a magnetic field.
H: Relativity
P: Electric and magnetic forces are two aspects of one field. A charge at rest beside a current-carrying wire feels no force; in the frame of a charge moving along the wire, length contraction makes the wire's charge densities unequal, and the magnetic force appears as an electric force. The field tensor F^{μν} combines E and B.
X: A velocity selector has E = 2 × 10^{4} V m^{-1}, B = 0.1 T. Which speed passes?
> v = E/B = 2 × 10^{5} m s^{-1}
!: Whether a force is "electric" or "magnetic" depends on the observer's frame; the total Lorentz force transforms consistently.
Q: State the Lorentz force law. | F = q(E + v × B).
Q: How does a velocity selector work? | Crossed E and B fields balance for particles with v = E/B, which pass undeflected.
M1: Thomson measured the electron's: | Charge-to-mass ratio | Charge alone | Mass alone | Spin | e/m using crossed fields.
M2: In a frame moving with a charge, its magnetic force appears as: | An electric force | No force | A gravitational force | A stronger magnetic force | Fields transform.

## Magnetic forces on current-carrying wires
S: A current-carrying wire in a magnetic field feels a force because the moving charges in it do. This force drives electric motors, loudspeakers and electromagnetic rail guns.
H: The force
E: F = IL × B; |F| = BIL sin θ
- Fleming's left-hand rule: First finger Field, seCond finger Current, thuMb Motion.
- Maximum when the wire is perpendicular to B.
H: Parallel wires
E: F/L = μ_{0}I_{1}I_{2}/(2πd)
- Parallel currents attract; antiparallel repel.
- Historically defined the ampere (until 2019).
H: Torque on a loop
E: τ = NIAB sin θ = m × B :: m = NIA magnetic moment
- Basis of motors, moving-coil meters and galvanometers.
X: A 0.2 m wire carries 5 A perpendicular to 0.3 T. Force?
> F = 0.3 × 5 × 0.2 = 0.3 N
!: A wire parallel to the field feels no force however large the current.
Q: What is the force on a current in a magnetic field? | F = BIL sin θ.
Q: Do parallel currents attract or repel? | Attract.
M1: Two wires 1 m apart each carry 1 A in the same direction. Force per metre: | 2 × 10^{-7} N, attractive | 2 × 10^{-7} N, repulsive | 1 N | 0 | μ_{0}/(2π).
M2: The torque on a current loop is maximum when its plane is: | Parallel to B | Perpendicular to B | At 45° | Irrelevant | m ⊥ B.

## Motion of charged particles in magnetic fields
S: In a uniform magnetic field a charged particle moves in a circle (or helix), with a radius set by its momentum and a frequency independent of its speed. This underlies cyclotrons, mass spectrometers and particle detectors.
H: Circular motion
E: qvB = mv^{2}/r ⇒ r = mv/(qB) = p/(qB)
E: ω_{c} = qB/m; f_{c} = qB/(2πm) :: cyclotron frequency
- Velocity component along B is unaffected: motion is a helix.
H: Applications
- **Mass spectrometry**: r ∝ m/q at fixed v, separating isotopes.
- **Cyclotron**: f_{c} independent of v lets an AC field accelerate particles spiralling outward (until relativity spoils it; synchrocyclotrons and synchrotrons fix that).
- **Particle detectors**: track curvature measures momentum; curl direction gives charge sign.
- **Magnetic bottles and tokamaks**: confine plasmas.
- **Van Allen belts**: Earth's field traps particles bouncing between mirror points.
X: Radius of a 1 keV electron in 1 mT?
> v = √(2 × 1.6 × 10^{-16}/9.11 × 10^{-31}) = 1.9 × 10^{7} m s^{-1}
> r = 9.11 × 10^{-31} × 1.9 × 10^{7}/(1.6 × 10^{-19} × 10^{-3}) = 0.11 m
!: For relativistic particles use r = p/(qB) with the relativistic momentum γmv.
Q: What is the radius of a charged particle's path in a magnetic field? | r = mv/(qB).
Q: Why does the cyclotron frequency not depend on speed (non-relativistically)? | Faster particles move on proportionally larger circles, taking the same time per orbit.
M1: Doubling a particle's speed in a fixed field changes its orbit radius by: | ×2 | ×4 | ×1/2 | No change | r ∝ v.
M2: In a bubble chamber, an electron and positron with equal speeds curve: | Equally, in opposite directions | The same way | Only the electron curves | Not at all | Opposite charges.

## Biot–Savart law
S: The Biot–Savart law gives the magnetic field produced by a small element of current. Adding up (integrating) the contributions from all elements gives the field of any current distribution.
H: The law
E: dB = (μ_{0}/4π)(I dl × r̂)/r^{2}
E: μ_{0} = 4π × 10^{-7} T m A^{-1} (very nearly)
H: Standard results
E: B = μ_{0}I/(2πd) :: long straight wire
E: B = μ_{0}I/(2R) :: centre of a circular loop
E: B = μ_{0}IR^{2}/(2(R^{2} + z^{2})^{3/2}) :: on the axis of a loop
- Far from a loop, the field is a magnetic dipole field ∝ m/r^{3}.
H: Helmholtz coils
P: Two coaxial coils separated by their radius give a very uniform field at the centre: used to cancel Earth's field or calibrate magnetometers, and to measure e/m.
X: Field at the centre of a 50-turn coil of radius 0.1 m carrying 2 A?
> B = 50 × 4π × 10^{-7} × 2/(2 × 0.1) = 6.3 × 10^{-4} T
!: The Biot–Savart law is for steady currents; for time-varying fields, retardation effects (Jefimenko's equations) matter.
Q: What is the field of a long straight wire? | B = μ_{0}I/(2πd), circling the wire.
Q: Why are Helmholtz coils useful? | They produce a very uniform field in the region between them.
M1: The field of a long straight wire falls with distance as: | 1/d | 1/d^{2} | 1/d^{3} | Constant | From Biot–Savart or Ampère.
M2: Doubling the radius of a loop (same current) changes the field at its centre by: | ×1/2 | ×2 | ×1/4 | No change | B ∝ 1/R.

## Ampère's law
S: Ampère's law relates the magnetic field circulating around a closed loop to the current passing through it. With symmetry it finds fields quickly, and with Maxwell's correction it's one of the four fundamental equations.
H: The law
E: ∮B·dl = μ_{0}I_{enc}
E: ∇ × B = μ_{0}J :: differential form (steady currents)
H: Using it
- Straight wire: B·2πr = μ_{0}I ⇒ B = μ_{0}I/(2πr).
- Inside a uniform wire (radius R): B = μ_{0}Ir/(2πR^{2}).
- Long solenoid: B = μ_{0}nI inside, ~0 outside.
- Toroid: B = μ_{0}NI/(2πr) inside, zero outside.
- Coaxial cable: zero field outside (equal and opposite currents).
H: Maxwell's correction
P: For a charging capacitor, the current through a surface between the plates is zero, but through a surface cutting the wire it isn't. Maxwell resolved the contradiction by adding the displacement current ε_{0}∂Φ_{E}/∂t: ∮B·dl = μ_{0}(I + ε_{0}dΦ_{E}/dt). This predicted electromagnetic waves.
X: Field inside a 20 cm solenoid with 400 turns carrying 3 A?
> n = 2000 m^{-1}
> B = 4π × 10^{-7} × 2000 × 3 = 7.5 mT
!: Ampère's law always holds (with displacement current), but is only useful for finding B when symmetry makes B constant along the loop.
Q: State Ampère's law (steady currents). | The line integral of B round a closed loop equals μ_{0} times the enclosed current.
Q: What is the field outside an ideal long solenoid? | Approximately zero.
M1: The field inside a long solenoid depends on: | Turns per length and current | Its radius | Its total length only | Position inside | B = μ_{0}nI.
M2: Why is there no field outside a coaxial cable? | The enclosed net current is zero | The insulation blocks it | Copper is non-magnetic | It's AC | Equal and opposite currents.

## Magnetic dipoles
S: A current loop, a bar magnet, and an electron all behave as magnetic dipoles: they produce a characteristic field and twist to align with external fields. The magnetic moment measures their strength.
H: Magnetic moment
E: m = NIA (A m^{2}) :: current loop
E: τ = m × B; U = −m·B
E: F = ∇(m·B) :: force in a non-uniform field
- Field far away: B ∝ m/r^{3}, same shape as an electric dipole.
H: Atomic magnetic moments
E: μ_{B} = eħ/(2m_{e}) = 9.27 × 10^{-24} J T^{-1} :: Bohr magneton
- Electron spin moment ≈ 1 μ_{B} (g ≈ 2.002).
- Nuclear magneton μ_{N} ~1/1836 of μ_{B}: why NMR frequencies are much lower than electron spin resonance.
H: Stern–Gerlach experiment
P: Silver atoms passing through a non-uniform magnetic field split into two discrete beams (1922), not a smear. It showed that angular momentum (spin) is quantised in direction.
X: Torque on a 100-turn coil (A = 4 cm^{2}, I = 0.5 A) with its moment perpendicular to 0.2 T?
> m = 100 × 0.5 × 4 × 10^{-4} = 0.02 A m^{2}
> τ = 0.02 × 0.2 = 4 × 10^{-3} N m
!: A magnetic dipole in a uniform field feels only torque; a net force needs a field gradient.
Q: What is the magnetic moment of a current loop? | m = NIA, perpendicular to the loop by the right-hand rule.
Q: What did the Stern–Gerlach experiment show? | Spin angular momentum is quantised: atoms split into discrete beams.
M1: The Bohr magneton is about: | 9.3 × 10^{-24} J T^{-1} | 1.6 × 10^{-19} J T^{-1} | 5.1 × 10^{-27} J T^{-1} | 1 J T^{-1} | eħ/2m_{e}.
M2: A dipole's energy is lowest when m is: | Parallel to B | Antiparallel | Perpendicular | Zero | U = −m·B.

## Magnetic flux
S: Magnetic flux measures the total magnetic field passing through a surface. Changes in flux through a circuit induce EMFs, which makes flux the central quantity of electromagnetic induction.
H: Definitions
E: Φ = B·A = BA cos θ :: weber (Wb = T m^{2})
E: Φ = ∫B·dA :: general
E: NΦ :: flux linkage of an N-turn coil
- Net flux through any closed surface is zero (∇·B = 0).
H: Ways to change flux
- Change B (move a magnet, change a current).
- Change area (moving rod on rails, flexing loop).
- Change orientation (rotating coil in a generator).
H: Flux quantisation
P: In a superconducting ring, flux is quantised in units of the flux quantum Φ_{0} = h/(2e) = 2.07 × 10^{-15} Wb. SQUIDs exploit this to measure fields as small as 10^{-17} T, detecting brain activity (magnetoencephalography).
X: A 50-turn coil of area 0.01 m^{2} at 60° to a 0.4 T field (angle between B and the normal). Flux linkage?
> Φ = 0.4 × 0.01 × cos 60° = 2 × 10^{-3} Wb
> NΦ = 0.1 Wb-turns
!: θ is measured between B and the normal to the surface, not the surface itself.
Q: Define magnetic flux. | Φ = BA cos θ, the field component normal to a surface times its area.
Q: What is the flux quantum? | Φ_{0} = h/(2e) ≈ 2.07 × 10^{-15} Wb.
M1: The unit of magnetic flux is: | Weber | Tesla | Henry | Ampere | T m^{2}.
M2: A coil's plane is parallel to B. The flux through it is: | Zero | Maximum | BA/2 | Negative | Normal ⊥ B.

## Electromagnetic induction
S: Electromagnetic induction is the production of an EMF by a changing magnetic flux. Discovered by Faraday in 1831, it powers generators, transformers, induction cooktops, wireless chargers and electric guitars.
H: Two pictures
- **Motional EMF**: a conductor moving through B: charges feel qv × B, giving ε = BLv for a rod.
- **Transformer EMF**: a changing B induces a circulating electric field (∇ × E = −∂B/∂t) even in empty space.
- Faraday's law covers both: ε = −dΦ/dt.
H: Applications
- Generators: rotating coils give AC.
- Transformers, induction motors, induction hobs (eddy currents heat the pan).
- Eddy-current braking in trains and roller coasters; metal detectors.
- Magnetic pickups, dynamic microphones, credit-card readers.
- Wireless charging (Qi): coupled coils at ~100–200 kHz.
X: A 0.5 m rod moves at 4 m s^{-1} perpendicular to 0.2 T. EMF?
> ε = BLv = 0.2 × 0.5 × 4 = 0.4 V
!: A steady magnetic field through a stationary loop induces nothing; only change does.
Q: What is electromagnetic induction? | The generation of an EMF by a change in magnetic flux.
Q: What is the motional EMF of a rod? | ε = BLv.
M1: An induction hob heats: | Metal pans via eddy currents | The glass surface | Any material | Water directly | Changing B induces currents in the pan.
M2: A magnet held still inside a coil induces: | No EMF | A steady EMF | AC EMF | A large current | No flux change.

## Faraday's law
S: Faraday's law states that the EMF induced in a circuit equals the rate of change of magnetic flux linkage through it. It's one of Maxwell's equations and the basis of electric power generation.
H: The law
E: ε = −N dΦ/dt
E: ∮E·dl = −dΦ_{B}/dt; ∇ × E = −∂B/∂t
- The minus sign is Lenz's law.
H: AC generator
E: ε = NBAω sin ωt :: coil rotating at ω
- Peak EMF NBAω; frequency = rotation frequency.
H: Induced electric fields
P: A changing magnetic field creates an electric field with closed loops (non-conservative): ∮E·dl ≠ 0. That's why Kirchhoff's loop law fails in circuits threaded by changing flux. Betatrons accelerate electrons with such induced fields.
X: A 200-turn coil (A = 0.05 m^{2}) rotates at 50 rev s^{-1} in 0.1 T. Peak EMF?
> ω = 314 rad s^{-1}
> ε_{0} = 200 × 0.1 × 0.05 × 314 = 314 V
!: EMF depends on the rate of change of flux, not on how large the flux is.
Q: State Faraday's law. | The induced EMF equals the negative rate of change of flux linkage.
Q: What is the peak EMF of a rotating coil generator? | NBAω.
M1: Flux through a 10-turn coil falls from 0.3 to 0.1 Wb in 0.5 s. EMF: | 4 V | 0.4 V | 2 V | 40 V | 10 × 0.2/0.5.
M2: Doubling a generator's rotation speed changes peak EMF by: | ×2 | ×4 | ×1/2 | No change | ∝ ω.

## Lenz's law
S: Lenz's law says an induced current flows in the direction that opposes the change that caused it. It's energy conservation in disguise: if induced currents helped the change, you'd get energy for nothing.
H: Using it
- Magnet approaching a coil: induced current makes a like pole facing it (repels).
- Magnet leaving: induced current attracts it back.
- Increasing flux into a loop: induced current makes flux out of it.
H: Examples
- Magnet falling through a copper pipe falls slowly: eddy currents oppose its motion.
- Eddy-current brakes on trains and drop towers: smooth, contact-free.
- Jumping ring: a ring on a solenoid leaps off when AC is switched on (repelled).
- Generators get harder to turn when more current is drawn: the induced current opposes rotation, and that's how mechanical work becomes electrical energy.
X: A bar magnet's north pole is pushed towards a coil. Which pole does the coil face it with?
> North: the induced current opposes the approach by repelling
!: Lenz's law opposes the change in flux, not the flux itself; if flux is decreasing, the induced current tries to maintain it.
Q: State Lenz's law. | The induced current flows so as to oppose the change in flux that produced it.
Q: Why does a magnet fall slowly through a copper pipe? | Eddy currents induced in the pipe produce fields opposing its motion.
M1: Lenz's law is a consequence of: | Conservation of energy | Conservation of charge | Newton's first law | Ohm's law | Otherwise perpetual motion.
M2: A generator becomes harder to turn when: | More current is drawn from it | It's disconnected | It spins slower | The magnets are removed | Induced current opposes motion.

## Inductance
S: Inductance is the property of a circuit that opposes changes in current, by producing an EMF proportional to the rate of change. It measures how much flux a current links, per ampere.
H: Definition
E: L = NΦ/I (henry, H)
E: ε = −L dI/dt
E: L = μ_{0}μ_{r}N^{2}A/l :: long solenoid
- Iron cores increase L by μ_{r} (hundreds to thousands).
H: Behaviour in circuits
- Resists sudden current changes: smooths current, causes spikes at switch-off.
- Reactance X_{L} = ωL: blocks high-frequency AC, passes DC.
- Stores energy ½LI^{2}.
H: Uses
- Chokes and filters; switch-mode power supplies (energy storage in each cycle).
- LC tuned circuits.
- Ignition coils; inductive sensors (traffic loop detectors).
X: A coil of 500 turns, length 0.25 m, area 4 cm^{2}, air core. Inductance?
> L = 4π × 10^{-7} × 250 000 × 4 × 10^{-4}/0.25 = 0.50 mH
!: Inductance grows as N^{2}: doubling turns quadruples it.
Q: Define inductance. | Flux linkage per unit current, L = NΦ/I; the back EMF per rate of change of current.
Q: How does an iron core change inductance? | It multiplies it by the relative permeability.
M1: The unit of inductance is: | Henry | Farad | Tesla | Weber | V s A^{-1}.
M2: Current changes at 200 A s^{-1} in a 50 mH coil. Back EMF: | 10 V | 4 V | 250 V | 0.25 V | L dI/dt.

## Self-induction and mutual induction
S: Self-induction is a changing current inducing an EMF in its own circuit; mutual induction is a changing current in one circuit inducing an EMF in another nearby. Transformers, wireless chargers and many sensors depend on mutual induction.
H: Self-induction
E: ε = −L dI/dt
- Back EMF in motors limits current at speed.
H: Mutual induction
E: ε_{2} = −M dI_{1}/dt; M_{12} = M_{21}
E: M = k√(L_{1}L_{2}) :: coupling coefficient 0 ≤ k ≤ 1
- Tightly coupled (k ≈ 1): transformers on a shared iron core.
- Loosely coupled: wireless charging, RFID, NFC (k ~ 0.1–0.5).
H: Unwanted coupling
P: Mutual inductance causes crosstalk between nearby wires and circuits. Twisted pairs cancel induced EMFs because successive twists see opposite flux; ground loops pick up mains hum.
X: Two coils have M = 20 mH. Current in coil 1 rises at 50 A s^{-1}. EMF in coil 2?
> ε = 20 × 10^{-3} × 50 = 1.0 V
!: Mutual inductance is symmetric: coil 1's effect on coil 2 equals coil 2's on coil 1.
Q: What is mutual inductance? | The EMF induced in one circuit per unit rate of change of current in another.
Q: Why do twisted-pair cables reduce interference? | Each twist reverses the loop's orientation, cancelling induced EMFs.
M1: Coupling coefficient k = 1 means: | All flux from one coil links the other | No coupling | Half the flux links | Infinite inductance | Perfect coupling.
M2: NFC payment uses: | Mutual induction between coils | Radio broadcast only | Light | Sound | Near-field magnetic coupling.

## Energy stored in magnetic fields
S: Building up a current in an inductor stores energy in its magnetic field. Every magnetic field holds energy, with density proportional to B squared, and releasing it can be violent.
H: Formulas
E: U = ½LI^{2}
E: u = B^{2}/(2μ_{0}) :: energy density (vacuum)
E: u = B^{2}/(2μ) :: linear material
- A 1 T field stores ~400 kJ m^{-3}.
H: Examples
- MRI magnets store several MJ; a "quench" (loss of superconductivity) dumps it as heat, boiling off liquid helium.
- The LHC's magnets store ~10 GJ in total; a 2008 faulty joint released energy that damaged many magnets.
- Superconducting magnetic energy storage (SMES) for grid stability.
- Solar flares release magnetic energy stored in twisted coronal fields (~10^{25} J).
H: Magnetic pressure
E: p_{B} = B^{2}/(2μ_{0})
P: Fields exert pressure: 10 T exerts ~400 atm on its coil windings, a major engineering challenge for high-field magnets. Magnetic pressure confines fusion plasmas and shapes stellar atmospheres.
X: Energy in an MRI magnet: 3 T over ~1 m^{3}?
> u = 9/(2 × 4π × 10^{-7}) = 3.6 × 10^{6} J m^{-3}
> About 3.6 MJ
!: Interrupting current in a large inductor releases all its stored energy quickly; protection circuits are essential.
Q: What is the energy density of a magnetic field? | u = B^{2}/(2μ_{0}).
Q: What is a magnet quench? | A sudden loss of superconductivity that converts stored magnetic energy to heat.
M1: Doubling B multiplies the field's energy density by: | 4 | 2 | 8 | √2 | ∝ B^{2}.
M2: Energy in a 0.2 H inductor at 5 A: | 2.5 J | 1 J | 5 J | 0.5 J | ½ × 0.2 × 25.

## Magnetic materials
S: Materials respond to magnetic fields because their atoms carry magnetic moments from electron orbits and spins. Depending on how those moments interact, a material is diamagnetic, paramagnetic, ferromagnetic, antiferromagnetic or ferrimagnetic.
H: Describing magnetisation
E: M = magnetic moment per unit volume (A m^{-1})
E: B = μ_{0}(H + M); M = χH; μ_{r} = 1 + χ
- χ: magnetic susceptibility.
H: The classes
- **Diamagnetic** (χ ~ −10^{-5}): all materials; weakly repelled (water, copper, bismuth, carbon).
- **Paramagnetic** (χ ~ +10^{-5}–10^{-3}): unpaired spins align weakly (aluminium, oxygen).
- **Ferromagnetic** (χ up to 10^{5}): spins align spontaneously in domains (iron, nickel, cobalt, gadolinium).
- **Antiferromagnetic**: neighbouring spins antiparallel (MnO, chromium).
- **Ferrimagnetic**: unequal antiparallel moments (magnetite, ferrites).
H: Uses
- Soft magnets (transformer cores): easy to magnetise and demagnetise.
- Hard magnets (NdFeB, SmCo): permanent magnets for motors, wind turbines, headphones.
- Magnetic storage: hard drives use tiny magnetised domains.
X: Liquid oxygen is drawn between the poles of a strong magnet; liquid nitrogen isn't. Why?
> O_{2} has two unpaired electrons: paramagnetic
> N_{2} has all electrons paired: diamagnetic
!: Every material is diamagnetic; paramagnetism or ferromagnetism only dominate when unpaired spins are present.
Q: What is magnetic susceptibility? | χ = M/H, how strongly a material magnetises in a field.
Q: What distinguishes ferromagnets from paramagnets? | Ferromagnets have spontaneous alignment of moments in domains due to exchange interaction.
M1: Which is ferrimagnetic? | Magnetite | Iron | Copper | Oxygen | Unequal antiparallel sublattices.
M2: Diamagnetic materials are: | Weakly repelled by fields | Strongly attracted | Permanently magnetised | Superconductors only | χ < 0.

## Diamagnetism
S: Diamagnetism is a weak repulsion from magnetic fields shown by all materials. An applied field changes electron orbits so they produce a small opposing moment, a quantum version of Lenz's law.
H: Properties
- χ negative, small (~−10^{-5}); independent of temperature.
- Water −9 × 10^{-6}; bismuth −1.7 × 10^{-4}; pyrolytic graphite −4 × 10^{-4}.
- Classically, there'd be no diamagnetism at all (Bohr–van Leeuwen theorem): it's a quantum effect.
H: Diamagnetic levitation
P: In a strong enough field gradient, the repulsion balances gravity: B dB/dz > μ_{0}ρg/|χ|. For water about 1400 T^{2} m^{-1}. A live frog was levitated in a 16 T magnet (Geim and Berry, Ig Nobel 2000). Diamagnetic levitation is stable, getting around Earnshaw's theorem.
H: Perfect diamagnetism
- Superconductors expel fields entirely (χ = −1): the Meissner effect.
- Gives stable magnetic levitation of magnets above superconductors.
X: Why is pyrolytic graphite used for desk-toy levitation over magnets?
> It's strongly diamagnetic and light
> Above a checkerboard of NdFeB magnets, the repulsion supports its weight
!: Diamagnetism is present in all materials but is usually masked by stronger paramagnetic or ferromagnetic effects.
Q: Why are all materials diamagnetic? | Applied fields alter all electron orbits to produce opposing moments.
Q: What is the Meissner effect? | A superconductor's expulsion of magnetic field: perfect diamagnetism.
M1: Diamagnetic susceptibility depends on temperature: | Hardly at all | Strongly, as 1/T | Only above T_{c} | Exponentially | It's orbital, not thermal alignment.
M2: A frog was levitated using: | Diamagnetism in a strong field gradient | Superconductivity | Electrostatics | Air jets | Water is diamagnetic.

## Paramagnetism
S: Paramagnetic materials have atoms with unpaired electrons whose moments align partly with an applied field, giving weak attraction. Thermal motion fights the alignment, so paramagnetism weakens as temperature rises.
H: Curie's law
E: χ = C/T
E: M = nμ tanh(μB/k_{B}T) :: spin-½ (Brillouin function)
- At low field/high T: M ≈ nμ^{2}B/(k_{B}T).
- At high field/low T: saturates at nμ (all aligned).
H: Pauli paramagnetism
P: Conduction electrons in metals give a small, temperature-independent paramagnetism: only electrons near the Fermi level can flip spins, a direct consequence of Fermi–Dirac statistics.
H: Uses
- Adiabatic demagnetisation: magnetise a paramagnetic salt in a field at low T, isolate it, then reduce the field; the spins absorb entropy, cooling it to mK.
- MRI contrast agents (gadolinium) are paramagnetic.
- Electron paramagnetic resonance (EPR) studies radicals and defects.
X: A paramagnet's susceptibility is 2 × 10^{-4} at 300 K. At 30 K?
> Curie's law: χ ∝ 1/T
> χ = 2 × 10^{-3}
!: Paramagnets don't retain magnetisation when the field is removed (unlike ferromagnets).
Q: State Curie's law. | Paramagnetic susceptibility is inversely proportional to temperature: χ = C/T.
Q: How does adiabatic demagnetisation cool a sample? | Reducing the field at constant entropy lets spins disorder, absorbing energy from the lattice.
M1: Paramagnetism arises from: | Unpaired electron spins | Paired electrons | Superconductivity | Nuclear forces only | Permanent atomic moments.
M2: Gadolinium contrast agents work in MRI because they are: | Strongly paramagnetic | Diamagnetic | Radioactive | Superconducting | They shorten relaxation times.

## Ferromagnetism
S: In ferromagnets, a quantum-mechanical exchange interaction makes neighbouring spins align, producing strong spontaneous magnetisation in regions called domains. Above the Curie temperature, thermal motion destroys the order and the material becomes paramagnetic.
H: Origin
- Exchange interaction: a consequence of the Pauli principle and Coulomb repulsion, far stronger than magnetic dipole forces between spins.
- Iron, cobalt, nickel, gadolinium and many alloys (NdFeB, permalloy).
H: Curie temperature
E: χ = C/(T − T_{C}) :: Curie–Weiss law above T_{C}
- Iron 1043 K; nickel 627 K; cobalt 1388 K; gadolinium 293 K; NdFeB ~585 K.
H: Domains
P: A ferromagnet splits into domains, each magnetised in one direction, to reduce stray field energy. An unmagnetised iron bar has domains pointing every way. An applied field grows favourably aligned domains (by moving domain walls) and rotates others, magnetising the bar.
X: Why does heating a permanent magnet above its Curie temperature ruin it?
> Thermal energy destroys the aligned spin order
> On cooling without a field, domains form with random orientations: no net magnetisation
!: A ferromagnet's strength comes from the exchange interaction, not from magnetic attraction between atoms, which is a thousand times too weak.
Q: What causes ferromagnetism? | The quantum exchange interaction aligning neighbouring electron spins.
Q: What happens above the Curie temperature? | Spontaneous magnetisation vanishes; the material becomes paramagnetic.
M1: Domains form in ferromagnets to: | Reduce magnetostatic (stray field) energy | Increase energy | Conduct electricity | Absorb heat | Closure domains minimise external field.
M2: Iron's Curie temperature is about: | 1043 K | 300 K | 77 K | 2000 K | 770 °C.

## Hysteresis
S: Hysteresis is the lagging of a ferromagnet's magnetisation behind the applied field. Its loop shows how hard a material is to magnetise and demagnetise, and the loop's area is energy lost each cycle.
H: The loop
- Saturation: all domains aligned.
- **Remanence** B_{r}: magnetisation left when H returns to zero.
- **Coercivity** H_{c}: reverse field needed to remove it.
- Loop area = energy dissipated per unit volume per cycle.
H: Soft vs hard
- **Soft** (silicon steel, permalloy, ferrites): narrow loop, low coercivity, low losses. Transformer and motor cores.
- **Hard** (NdFeB, SmCo, alnico, ferrite magnets): wide loop, high coercivity and remanence. Permanent magnets.
- **Recording media**: moderate coercivity so bits can be written but stay put.
H: Energy product
P: The figure of merit for permanent magnets is (BH)_{max}: NdFeB reaches ~400 kJ m^{-3}, about 10 times older ferrite magnets, enabling small powerful motors in electric cars, drones and wind turbines.
X: A transformer core loses 50 J m^{-3} per cycle at 50 Hz; core volume 0.002 m^{3}. Hysteresis power loss?
> P = 50 × 0.002 × 50 = 5 W
!: A wide hysteresis loop is good for permanent magnets but bad for transformer cores.
Q: What is coercivity? | The reverse field needed to reduce a ferromagnet's magnetisation to zero.
Q: What does the area of a hysteresis loop represent? | Energy dissipated per unit volume per cycle.
M1: Transformer cores should have: | Narrow hysteresis loops | Wide loops | High coercivity | High remanence | Low losses.
M2: The best commercial permanent magnets are made of: | NdFeB | Copper | Soft iron | Aluminium | Highest energy product.

## Electromagnets
S: An electromagnet is a coil of wire, usually around an iron core, that becomes magnetic when current flows. Its strength can be controlled and switched, making electromagnets essential in motors, relays, cranes and MRI.
H: Field
E: B ≈ μ_{0}μ_{r}nI :: long solenoid with core (until saturation)
- Iron multiplies the field by μ_{r} (~thousands) up to saturation (~2 T).
- Beyond ~2 T, superconducting coils without iron are used.
H: Applications
- Relays and contactors: small currents switch large ones.
- Scrapyard lifting magnets, maglev trains, electric bells, door locks.
- Loudspeakers and solenoid valves.
- Particle accelerators (dipole bending, quadrupole focusing).
- MRI: superconducting magnets at 1.5–7 T (some research systems ~11.7 T).
H: Superconducting magnets
P: Niobium–titanium wire at 4.2 K carries huge currents with no resistance; once energised, the magnet can run in persistent mode for years. Newer high-temperature superconducting tapes (REBCO) reach > 20 T, enabling compact fusion devices.
X: A 1000-turn, 0.1 m solenoid with an iron core (μ_{r} = 500) carries 0.2 A. Estimate B (below saturation).
> n = 10^{4} m^{-1}
> B = 4π × 10^{-7} × 500 × 10^{4} × 0.2 = 1.26 T
!: Iron saturates around 2 T; adding more current then barely increases the field.
Q: Why do electromagnets usually have iron cores? | Iron's high permeability multiplies the field.
Q: Why do MRI scanners use superconducting magnets? | Iron saturates near 2 T, and resistive coils would need enormous power; superconductors carry large currents without loss.
M1: An electromagnet's field can be increased by: | More turns or current, or an iron core | A plastic core | Shorter wire only | Reversing current | B ∝ nIμ_{r}.
M2: A relay uses an electromagnet to: | Switch a large current with a small one | Measure voltage | Store energy | Generate AC | Control circuit.

## Solenoids and toroids
S: A solenoid is a long helical coil; a toroid is a coil wound around a ring. Both produce well-defined, nearly uniform fields inside and little outside, making them standard sources of magnetic fields and inductors.
H: Fields
E: B = μ_{0}nI :: inside a long solenoid (n = turns per metre)
E: B = μ_{0}NI/(2πr) :: inside a toroid at radius r
- Solenoid field outside ~0 (for long solenoids); end field ~half the centre value.
- Toroid field is entirely confined inside: no leakage, low interference.
H: Inductance
E: L = μ_{0}N^{2}A/l :: solenoid
E: L = μ_{0}N^{2}h ln(b/a)/(2π) :: toroid of rectangular cross-section
H: Uses
- Solenoid actuators (valves, door locks, starter motors).
- Toroidal transformers and inductors: compact, low stray field.
- Tokamaks: toroidal field coils confine plasma (ITER coils ~11.8 T).
X: A toroid with 600 turns, mean radius 0.1 m, current 2 A. Field at the mean radius?
> B = 4π × 10^{-7} × 600 × 2/(2π × 0.1) = 2.4 mT
!: The ideal-solenoid formula assumes length ≫ radius; short coils have weaker, less uniform fields.
Q: What is the field inside a long solenoid? | B = μ_{0}nI.
Q: Why do toroids have little stray field? | The field is confined inside the ring by its closed geometry.
M1: Halving the length of a solenoid but keeping the same turns: | Doubles the internal field | Halves it | Leaves it unchanged | Quadruples it | n doubles.
M2: Tokamaks use which coil shape to confine plasma? | Toroidal | Straight solenoid | Single loop | Helmholtz | Plasma in a doughnut.

## Electric motors and generators
S: Motors turn electrical energy into motion using the force on currents in magnetic fields; generators do the reverse using induction. They're the same machine run in opposite directions.
H: DC motors
- Force on current-carrying coil sides makes a torque; a commutator reverses current every half turn to keep it spinning.
- Back EMF ε_{b} = kω grows with speed and limits current: I = (V − ε_{b})/R. Motors draw most current when starting.
H: AC motors
- **Induction motors**: rotating magnetic field from three-phase windings induces currents in the rotor (no brushes); rotor lags slightly (slip). Industry's workhorse.
- **Synchronous and brushless DC (permanent magnet)**: rotor turns exactly with the field; electric vehicles, drones, computer fans.
H: Generators
E: ε = NBAω sin ωt
- Power stations: steam, gas, water or wind turns large synchronous generators at 50/60 Hz.
- Regenerative braking: motors become generators.
- Efficiency of large machines > 95%.
X: A DC motor (R = 2 Ω) runs on 24 V, drawing 3 A at full speed. Back EMF? Starting current?
> ε_{b} = 24 − 3 × 2 = 18 V
> At start (ε_{b} = 0): I = 12 A
!: A stalled motor has no back EMF, so current is maximal and windings can burn out.
Q: What is back EMF in a motor? | The EMF induced in the spinning coils, opposing the supply and limiting current.
Q: How does an induction motor work? | A rotating field induces currents in the rotor, which then experience a force, following the field with slight slip.
M1: A commutator in a DC motor: | Reverses the coil current every half turn | Smooths voltage | Increases speed | Generates AC | Keeps torque in one direction.
M2: Electric car regenerative braking works by: | Using the motor as a generator | Friction pads | Releasing magnets | Air resistance | Induction converts KE to electrical.

## Maxwell's equations
S: Maxwell's four equations describe all classical electric and magnetic phenomena: how charges and currents create fields, how changing fields create each other, and therefore how light propagates.
H: The equations (vacuum, SI)
E: ∇·E = ρ/ε_{0} :: Gauss's law: charges are sources of E
E: ∇·B = 0 :: no magnetic monopoles
E: ∇ × E = −∂B/∂t :: Faraday's law: changing B makes curling E
E: ∇ × B = μ_{0}J + μ_{0}ε_{0}∂E/∂t :: Ampère–Maxwell law
- With the Lorentz force, they're the complete classical theory.
H: Electromagnetic waves
E: ∇^{2}E = μ_{0}ε_{0}∂^{2}E/∂t^{2}; c = 1/√(μ_{0}ε_{0})
P: In empty space, a changing E creates B, which creates E: a self-sustaining wave at 3 × 10^{8} m s^{-1}, exactly the measured speed of light. Maxwell (1865) concluded light is an electromagnetic wave; Hertz produced radio waves in 1887.
H: Beyond Maxwell
- Lorentz invariant: special relativity was built to respect them.
- Quantised in quantum electrodynamics (QED), the most precisely tested theory in physics.
X: Compute c from μ_{0} and ε_{0}.
> c = 1/√(4π × 10^{-7} × 8.854 × 10^{-12}) = 2.998 × 10^{8} m s^{-1}
!: Maxwell's equations are linear in the fields; superposition of electromagnetic fields holds exactly in vacuum.
Q: Which Maxwell equation says there are no magnetic monopoles? | ∇·B = 0.
Q: What did Maxwell's equations predict about light? | It's an electromagnetic wave travelling at c = 1/√(μ_{0}ε_{0}).
M1: Faraday's law in Maxwell's equations is: | ∇ × E = −∂B/∂t | ∇·E = ρ/ε_{0} | ∇·B = 0 | ∇ × B = μ_{0}J | Changing B induces E.
M2: Who first produced and detected radio waves? | Hertz | Maxwell | Marconi | Faraday | 1887.

## Displacement current
S: Displacement current is Maxwell's addition to Ampère's law: a changing electric field produces a magnetic field just as a real current does. It made electromagnetism consistent and predicted electromagnetic waves.
H: Definition
E: I_{d} = ε_{0} dΦ_{E}/dt
E: ∮B·dl = μ_{0}(I + I_{d})
H: The capacitor paradox
P: Charging a capacitor, current flows in the wires but not across the gap. Ampère's law gives different answers for a surface pierced by the wire and one passing between the plates. The changing field between the plates supplies exactly I_{d} = I, restoring consistency and charge conservation.
H: Consequences
- Magnetic fields exist between charging capacitor plates (measurable).
- Electromagnetic waves: changing E fields in empty space create B.
- Needed for ∇·(∇ × B) = 0 to agree with charge conservation.
X: A parallel-plate capacitor (A = 0.01 m^{2}) has field changing at 10^{12} V m^{-1} s^{-1}. Displacement current?
> I_{d} = ε_{0}A dE/dt = 8.85 × 10^{-12} × 0.01 × 10^{12} = 0.089 A
!: Displacement current isn't a flow of charge; it's a changing electric field that acts as a source of magnetic field.
Q: What is displacement current? | ε_{0} times the rate of change of electric flux; it produces magnetic fields like a real current.
Q: Why did Maxwell add displacement current? | To make Ampère's law consistent with charge conservation (the capacitor paradox).
M1: Displacement current between capacitor plates equals: | The conduction current in the wires | Zero | Twice the current | The charge | Continuity.
M2: Displacement current was essential for predicting: | Electromagnetic waves | Electrostatics | Ohm's law | Coulomb's law | Changing E creates B in vacuum.

## Electromagnetic potentials
S: Instead of working with E and B directly, electromagnetism can be written in terms of a scalar potential V and a vector potential A. The potentials simplify calculations, are essential in quantum mechanics, and combine into a relativistic four-vector.
H: Definitions
E: B = ∇ × A
E: E = −∇V − ∂A/∂t
- Two of Maxwell's equations (∇·B = 0, Faraday) are then automatic.
H: Wave equations (Lorenz gauge)
E: ∇^{2}V − (1/c^{2})∂^{2}V/∂t^{2} = −ρ/ε_{0}
E: ∇^{2}A − (1/c^{2})∂^{2}A/∂t^{2} = −μ_{0}J
- Solutions: retarded potentials, with sources evaluated at the earlier time when the signal set out.
H: Physical reality of A
P: In quantum mechanics, a charge's wavefunction picks up a phase (q/ħ)∮A·dl. The Aharonov–Bohm effect (1959; confirmed by Tonomura, 1986): electrons passing either side of a shielded solenoid, through regions where B = 0, show an interference shift set by the enclosed flux. Potentials (or at least their loop integrals) are physically meaningful.
X: Vector potential outside a long solenoid of flux Φ?
> B = 0 outside, but ∮A·dl = Φ
> A = Φ/(2πr), circling the solenoid
!: V and A aren't unique; only gauge-invariant combinations (E, B, loop integrals) are measurable.
Q: How are E and B obtained from the potentials? | B = ∇ × A; E = −∇V − ∂A/∂t.
Q: What is the Aharonov–Bohm effect? | Charged particles are affected by electromagnetic potentials even in regions with zero field.
M1: The vector potential outside an ideal solenoid is: | Non-zero, circulating | Zero | Radial | Uniform | ∮A·dl = Φ.
M2: Retarded potentials account for: | The finite speed of propagation | Gauge freedom | Static charges only | Magnetic monopoles | Signals travel at c.

## Gauge transformations
S: The electromagnetic potentials can be changed by a gauge transformation without altering the physical fields. This freedom, gauge symmetry, turns out to be the organising principle behind all the fundamental forces.
H: The transformation
E: A → A + ∇χ; V → V − ∂χ/∂t
- E and B are unchanged for any function χ.
- In quantum mechanics: ψ → e^{iqχ/ħ}ψ at the same time.
H: Common gauges
- **Coulomb gauge**: ∇·A = 0; V given by instantaneous Coulomb potential. Useful in radiation and condensed matter.
- **Lorenz gauge**: ∇·A + (1/c^{2})∂V/∂t = 0; manifestly Lorentz invariant.
- **Temporal gauge**: V = 0.
H: Gauge theories
P: Requiring that the laws stay the same under local phase changes of charged fields forces the existence of the electromagnetic field (U(1) gauge theory). Generalising to SU(2) and SU(3) gives the weak and strong forces: the Standard Model is a gauge theory. Gauge invariance also guarantees charge conservation and a massless photon.
X: Show B is unchanged under A → A + ∇χ.
> ∇ × (A + ∇χ) = ∇ × A + ∇ × ∇χ
> The curl of a gradient is zero, so B is unchanged
!: Choosing a gauge is a calculational convenience; physical predictions must not depend on it.
Q: What is a gauge transformation? | A change of the potentials (A → A + ∇χ, V → V − ∂χ/∂t) that leaves E and B unchanged.
Q: Which gauge is manifestly Lorentz invariant? | The Lorenz gauge.
M1: Gauge symmetry of electromagnetism is related to conservation of: | Charge | Energy | Momentum | Mass | Noether's theorem.
M2: The strong force is described by a gauge theory based on: | SU(3) | U(1) | SU(2) | SO(3) | Quantum chromodynamics.

## Electromagnetic boundary conditions
S: At the boundary between two materials, Maxwell's equations require particular components of E, D, B and H to match. These conditions determine reflection and refraction of light, waveguide modes and how fields behave at conductor surfaces.
H: The four conditions
E: D_{1⊥} − D_{2⊥} = σ_{free}
E: B_{1⊥} = B_{2⊥}
E: E_{1∥} = E_{2∥}
E: H_{1∥} − H_{2∥} = K_{free} × n̂ :: surface current K
H: Perfect conductors
- E_{∥} = 0 and B_{⊥} = 0 at the surface.
- Fields don't penetrate; surface charges and currents adjust.
- Real conductors: fields penetrate a skin depth δ = √(2/(μσω)) (copper at 50 Hz: ~9 mm; at 1 GHz: ~2 μm).
H: Consequences
P: Applying the conditions to an incident light wave gives Fresnel's reflection and transmission coefficients, Brewster's angle and total internal reflection. In waveguides they allow only certain modes, each with a cut-off frequency.
X: Skin depth of copper (σ = 6 × 10^{7} S m^{-1}) at 1 MHz?
> δ = √(2/(4π × 10^{-7} × 6 × 10^{7} × 2π × 10^{6}))
> ≈ 65 μm: why RF conductors are often hollow or silver-plated
!: The normal component of B and tangential E are always continuous; D_{⊥} and H_{∥} jump only with free surface charge or current.
Q: What is the skin depth? | The depth at which an AC field in a conductor falls to 1/e: δ = √(2/(μσω)).
Q: Which field components are continuous across any boundary? | Normal B and tangential E.
M1: At a perfect conductor surface, tangential E is: | Zero | Maximum | Equal to normal E | Infinite | Charges cancel it.
M2: Skin depth decreases when frequency: | Increases | Decreases | Is constant | It doesn't depend on frequency | δ ∝ 1/√f.

## Electromagnetic momentum and energy
S: Electromagnetic fields carry energy and momentum. The Poynting vector gives the energy flow, and light exerts pressure when absorbed or reflected; conservation laws must include the fields as well as the charges.
H: Energy
E: u = ½(ε_{0}E^{2} + B^{2}/μ_{0}) :: energy density
E: S = (1/μ_{0})E × B :: Poynting vector: energy flux (W m^{-2})
E: ∂u/∂t + ∇·S = −J·E :: Poynting's theorem: energy conservation
- In a plane wave, electric and magnetic energies are equal; intensity I = ⟨S⟩ = ½cε_{0}E_{0}^{2}.
H: Momentum
E: g = S/c^{2} :: momentum density
E: p_{rad} = I/c (absorbed), 2I/c (reflected) :: radiation pressure
- Sunlight at Earth: ~4.6 μPa (absorbed).
- Solar sails (IKAROS, LightSail 2) use it for propulsion.
- Optical tweezers trap cells and molecules with focused laser light.
- Comet dust tails point away from the Sun partly due to radiation pressure.
H: Angular momentum
P: Circularly polarised light carries spin angular momentum (±ħ per photon), and beams with twisted wavefronts carry orbital angular momentum. Beth (1936) measured the torque on a wave plate from circularly polarised light.
X: Energy flows from a battery into a resistor. Where does the Poynting vector point?
> E along the wire, B circling it: S points radially into the resistor from the surrounding space
> Energy travels through the fields, not inside the wire
!: Energy in circuits flows through the fields around the wires, not as electrons carrying it.
Q: What does the Poynting vector represent? | The rate of energy flow per unit area in an electromagnetic field.
Q: What is the radiation pressure of light on a perfect reflector? | 2I/c.
M1: The Poynting vector is: | (1/μ_{0})E × B | E·B | ε_{0}E^{2} | qE | Energy flux.
M2: Optical tweezers hold particles using: | Radiation pressure and gradient forces of light | Magnetism | Electrostatics | Sound | Focused laser beams.
`;
