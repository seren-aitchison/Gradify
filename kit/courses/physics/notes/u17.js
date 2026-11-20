// Unit 17: Magnetism and Electromagnetism. Format: kit/course/notes.js. Content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, level, key terms, summaries, evidence status, typed and dated sources, and questions at three levels.
export default `
## Magnetic fields
S: A magnetic field is the region around a magnet or a moving charge in which other moving charges and magnets feel a force. Its strength is the magnetic flux density B, measured in tesla, and its field lines always form closed loops.
O: State the sources of magnetic fields and the unit of magnetic flux density
O: Describe the properties of magnetic field lines and use them to compare field strengths
O: Compare the sizes of typical magnetic fields using powers of ten
PRE: Electric fields
LV: GCSE and A level · Foundation
H: Sources
- Moving charges and electric currents.
- Intrinsic magnetic moments of particles (electron spin).
- Permanent magnets: atomic moments aligned in the same direction.
- Changing electric fields (Maxwell's displacement current).
H: Units and sizes
E: B in tesla (T); 1 T = 1 N A^{-1} m^{-1}; 1 G = 10^{-4} T
P: One tesla is the flux density that exerts a force of 1 N on each metre of wire carrying 1 A at right angles to the field.
- Earth's field ~25–65 μT; fridge magnet ~5 mT; MRI 1.5–7 T; strongest steady laboratory field ~45 T; neutron stars ~10^{8} T; magnetars up to ~10^{11} T.
H: Field lines
- Outside a magnet they run from north to south; inside, from south to north, closing the loop.
- They never cross, and they have no start or end: there are no magnetic monopoles (∇·B = 0).
- Denser lines mean a stronger field; iron filings and plotting compasses map them.
X: Earth's magnetic field at the surface is ~50 μT. How does that compare with a 1.5 T MRI scanner?
> Ratio = 1.5/(5 × 10^{-5}) = 3 × 10^{4}
> The scanner's field is about 30 000 times stronger
K: Magnetic fields come from moving charges and spins; their lines are closed loops, so the net flux out of any closed surface is zero.
!: Earth's geographic North Pole is near a magnetic south pole: it attracts the north pole of a compass needle.
P: **Investigate with the lab.** With no electric field, increase B and watch the circle get tighter.
IX: lorentz
T: Magnetic flux density (B) | The strength of a magnetic field, in tesla; the force per unit current per unit length on a wire at right angles to the field
T: Magnetic field line | A line whose direction at each point is that of the field, drawn closer together where the field is stronger
SUM: Magnetic fields are made by moving charges, spins and changing electric fields.
SUM: B is measured in tesla; Earth's field is tens of microtesla, an MRI magnet a few tesla.
SUM: Field lines never cross and always form closed loops, because there are no magnetic monopoles.
EV: established | Magnetic field lines form closed loops; no isolated magnetic monopole has ever been observed
SRC: OpenStax, University Physics Volume 2, section 11.2 "Magnetic Fields and Lines" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines
SRC: OpenStax, College Physics 2e, section 22.3 "Magnetic Fields and Magnetic Field Lines" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/22-3-magnetic-fields-and-magnetic-field-lines
SRC: AQA, A-level Physics specification (7408), section 3.7.5.1 "Magnetic flux density" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What are the sources of magnetic fields? | Moving charges (currents), intrinsic magnetic moments (spin) and changing electric fields.
Q: Why do magnetic field lines form closed loops? | There are no magnetic monopoles (∇·B = 0).
M1@1: The SI unit of magnetic flux density is: | Tesla | Weber | Henry | Gauss | The tesla (T = N A^{-1} m^{-1}); the weber is the unit of flux, the henry of inductance, and the gauss is a non-SI unit.
M2@3: Earth's magnetic field strength at the surface is about: | 50 μT | 1 T | 5 mT | 50 nT | Earth's field is tens of microtesla (25–65 μT); 5 mT is a fridge magnet and 1 T is MRI territory.
M2@1: A charged particle moves at right angles to a magnetic field. What is its path? | A circle | A straight line | A parabola | A spiral outwards | The magnetic force is always perpendicular to the velocity, so it acts as a centripetal force and the path is a circle.
M3@2: A diagram shows two magnetic field lines crossing at a point. Why must the diagram be wrong? | The field would have two directions at one point | Field lines may only cross inside magnets | Crossing lines would mean a monopole is present | Crossing lines would make the field zero there | The field at any point has a single direction, which is the direction of the line through it; two lines crossing would give two directions at once.
TF1@2: Magnetic field lines start on north poles and end on south poles. | false | They continue through the magnet from south to north, forming closed loops with no start or end.
SA2@2,3: Explain how field-line diagrams show the strength and direction of a magnetic field, and compare the field of Earth with that of an MRI scanner. | The direction of the field at a point is the tangent to the field line through it, shown by an arrow from north to south outside a magnet. The strength is shown by how close the lines are: closer lines mean a larger B. Earth's field is about 50 μT; an MRI scanner's is about 1.5–3 T, tens of thousands of times stronger. | Direction is the tangent to the line ; Lines closer together mean a stronger field ; Lines run north to south outside a magnet and never cross ; Earth about 50 μT against MRI about 1.5–3 T, roughly 10^{4}–10^{5} times larger

## Magnetic forces on charges
S: A magnetic field exerts a force on a moving charge, perpendicular to both its velocity and the field. Because the force is always sideways, it changes the direction of motion but never the speed.
O: Calculate the magnetic force on a moving charge using F = qvB sin θ
O: Find the direction of the force on positive and negative charges
O: Explain why a magnetic force does no work on a charge
PRE: Magnetic fields
LV: A level · Foundation
H: The force
E: F = qv × B; |F| = qvB sin θ :: θ is the angle between v and B
- Zero for charges at rest or moving parallel to B; largest (F = BQv) when v ⊥ B.
- Direction by the right-hand rule for v × B, or Fleming's left-hand rule with the second finger along the conventional current (the direction of motion of positive charge); reversed for negative charges.
- Does no work: F ⊥ v, so the kinetic energy is constant.
H: Consequences
- Charges circle in uniform fields (cyclotrons, mass spectrometers).
- Earth's field deflects cosmic rays and solar-wind particles, guiding some towards the poles (aurorae).
- Hall effect: charges pushed to one side of a conductor create a measurable voltage across it.
X: A proton at 3 × 10^{6} m s^{-1} moves perpendicular to a 0.5 T field. What is the force?
> F = qvB = 1.6 × 10^{-19} × 3 × 10^{6} × 0.5
> F = 2.4 × 10^{-13} N
K: The magnetic force is perpendicular to the velocity: it bends a charge's path but never changes its speed or kinetic energy.
!: A magnetic force can't speed up or slow down a charge; it only changes direction. Accelerators use electric fields to add energy.
P: **Investigate with the lab.** Watch the particle move in a circle at constant speed: the magnetic force changes its direction but not its speed.
IX: lorentz
T: Right-hand rule | Point the fingers along v and curl them towards B; the thumb gives the direction of v × B, the force on a positive charge
T: Fleming's left-hand rule | First finger along the field, second finger along the conventional current, thumb along the force (motion)
SUM: F = qvB sin θ, zero when the charge moves along the field and largest when it moves across it.
SUM: The force is perpendicular to v and B, opposite for negative charges, and does no work.
EV: established | The magnetic force on a moving charge is qv × B, perpendicular to its velocity
SRC: OpenStax, University Physics Volume 2, section 11.2 "Magnetic Fields and Lines" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/11-2-magnetic-fields-and-lines
SRC: OpenStax, College Physics 2e, section 22.4 "Magnetic Field Strength: Force on a Moving Charge in a Magnetic Field" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/22-4-magnetic-field-strength-force-on-a-moving-charge-in-a-magnetic-field
SRC: AQA, A-level Physics specification (7408), section 3.7.5.2 "Moving charges in a magnetic field" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why does the magnetic force do no work? | It's always perpendicular to the velocity.
Q: When is the magnetic force on a moving charge zero? | When the charge moves parallel (or antiparallel) to B, or is at rest.
M1@2: An electron moving east in a magnetic field pointing north is pushed: | Down (into the ground) | Up (out of the ground) | West | North | v × B for east × north points up; the electron's negative charge reverses it, so the force is downwards.
M2@1: The magnetic force on a charge depends on: | Its charge, speed and angle to B | Its mass and its speed | Only the field strength B | Its position in the field only | F = qvB sin θ: charge, speed, field and the angle between velocity and field; mass does not appear.
M2@3: Why does a magnetic field do no work on a moving charge? | The force is always perpendicular to the velocity | The force is always zero | The charge stops moving | Magnetic fields store no energy | Work needs a force component along the motion; the magnetic force has none, so kinetic energy is unchanged.
NUM2@1: An alpha particle (charge 3.2 × 10^{-19} C) moves at 2.0 × 10^{6} m s^{-1} at 30° to a 0.40 T field. What is the size of the magnetic force, in units of 10^{-13} N? | 1.28 | 2% | × 10^{-13} N | F = qvB sin θ = 3.2 × 10^{-19} × 2.0 × 10^{6} × 0.40 × 0.5 = 1.28 × 10^{-13} N; only the component of velocity across the field counts.
M3@2,3: A proton and an electron enter the same uniform field with the same velocity, perpendicular to B. Which statement is correct? | Equal-sized forces in opposite directions, but the electron's path curves far more tightly | Equal forces in the same direction, and identical paths | The proton feels a larger force because it is heavier | Neither is deflected, since magnetic forces do no work | Both have charge of size e, so qvB is the same, but the signs reverse the direction; the electron's much smaller mass gives a much smaller radius r = mv/(eB).
SA2@2,3: Explain how the direction of the magnetic force on a moving charge is found, and why the charge's speed stays constant. | Use the right-hand rule for v × B (or Fleming's left-hand rule with conventional current): for a positive charge the force is along v × B; for a negative charge it is reversed. The force is always perpendicular to the velocity, so it has no component along the motion and does no work. The kinetic energy and speed are therefore constant; only the direction changes. | Force perpendicular to both v and B ; Correct rule stated (right-hand rule or Fleming's left-hand rule) ; Direction reversed for negative charge ; No component along motion so no work done ; Speed constant, direction changes

## Lorentz force
S: The Lorentz force is the total electromagnetic force on a charged particle: the electric force qE plus the magnetic force qv × B. With Maxwell's equations it completes classical electromagnetism.
O: Use F = q(E + v × B) to find the total force on a charge
O: Explain how crossed electric and magnetic fields select particles with speed v = E/B
O: Explain why the split into electric and magnetic forces depends on the observer's frame
PRE: Magnetic forces on charges
LV: Year 1 · Application
H: The law
E: F = q(E + v × B)
- The electric part acts on all charges, at rest or moving, and can do work.
- The magnetic part acts only on moving charges and does no work.
H: Crossed fields
E: qE = qvB ⇒ v = E/B :: velocity selector: these particles pass undeflected
- J. J. Thomson used crossed fields (1897) to measure e/m for cathode rays, showing they were particles far lighter than atoms: the discovery of the electron.
- Mass spectrometers often pass ions through a velocity selector, then bend them in a field alone.
H: Relativity
P: Electric and magnetic forces are two aspects of one electromagnetic field. A charge moving beside a current-carrying wire feels a magnetic force in the wire's frame. In the charge's own rest frame there is no magnetic force on it, but length contraction makes the wire's positive and negative charge densities unequal, and the same push appears as an electric force. The field tensor F^{μν} combines E and B.
X: A velocity selector has E = 2 × 10^{4} V m^{-1} and B = 0.1 T. Which speed passes straight through?
> v = E/B = 2 × 10^{4}/0.1
> v = 2 × 10^{5} m s^{-1}, whatever the particle's charge or mass
K: The total force on a charge is q(E + v × B); only the electric part can change its kinetic energy.
!: Whether a force is "electric" or "magnetic" depends on the observer's frame; the total Lorentz force transforms consistently.
P: **Investigate with the lab.** Turn on an electric field as well as B and watch the particle drift. Then set E so the particle goes straight through.
IX: lorentz
T: Lorentz force | The total force q(E + v × B) on a charge q moving with velocity v in fields E and B
T: Velocity selector | Crossed electric and magnetic fields that let through undeflected only particles with speed v = E/B
SUM: F = q(E + v × B): the electric part does work, the magnetic part only turns the particle.
SUM: In crossed fields the forces cancel for v = E/B, the principle of velocity selectors and Thomson's e/m experiment.
SUM: Electric and magnetic forces mix when you change frame: they are parts of one field.
EV: established | The force on a charge is q(E + v × B), and the split into E and B depends on the frame
SRC: OpenStax, University Physics Volume 2, section 11.7 "Applications of Magnetic Forces and Fields" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/11-7-applications-of-magnetic-forces-and-fields
SRC: OpenStax, College Physics 2e, section 22.5 "Force on a Moving Charge in a Magnetic Field: Examples and Applications" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/22-5-force-on-a-moving-charge-in-a-magnetic-field-examples-and-applications
Q: State the Lorentz force law. | F = q(E + v × B).
Q: How does a velocity selector work? | Crossed E and B fields balance for particles with v = E/B, which pass undeflected.
M1@2: Thomson measured the electron's: | Charge-to-mass ratio | Charge alone | Mass alone | Spin | Thomson's crossed-field apparatus gave e/m; the charge itself was measured later by Millikan.
M2@3: In a frame moving with a charge, its magnetic force appears as: | An electric force | No force at all | A gravitational force | A stronger magnetic force | The charge is at rest in its own frame, so it feels no magnetic force; fields transform and the same effect appears as an electric force.
M2@2: In a velocity selector, which particles pass straight through? | Those with v = E/B | Those with v = B/E | All particles at any speed | Only uncharged particles | The electric and magnetic forces balance when qE = qvB, so v = E/B whatever the charge and mass.
NUM2@2: A velocity selector uses B = 0.25 T. What electric field (in kV m^{-1}) lets ions at 4.0 × 10^{5} m s^{-1} pass undeflected? | 100 | 1% | kV m^{-1} | E = vB = 4.0 × 10^{5} × 0.25 = 1.0 × 10^{5} V m^{-1} = 100 kV m^{-1}; the ions' charge and mass do not matter.
M3@1,2: In a velocity selector set for v = E/B, a particle arrives slightly faster than E/B. What happens? | It is deflected in the direction of the magnetic force | It is deflected in the direction of the electric force | It passes straight through anyway | It slows down until it reaches E/B | For v > E/B the magnetic force qvB exceeds the electric force qE, so the net force is along the magnetic force; the magnetic part cannot slow it.
SA3@1,3: A charge q moves at constant velocity next to a long wire carrying a current. Describe the force on it in the wire's frame and in the charge's rest frame, and explain why both observers agree it is pushed. | In the wire's frame the wire is neutral, so there is no electric force, but the moving charge feels a magnetic force qv × B from the wire's field. In the charge's rest frame it is not moving, so there is no magnetic force; however the positive and negative charges in the wire move at different speeds in this frame, so length contraction makes their densities unequal and the wire has a net charge. Its electric field gives an electric force. The Lorentz force law and relativity guarantee the two descriptions predict the same motion. | Wire frame: neutral wire, magnetic force qv × B ; Charge frame: v = 0 so no magnetic force ; Length contraction makes charge densities unequal ; Net charge gives an electric force ; Both are the same physical effect: E and B transform together

## Magnetic forces on current-carrying wires
S: A current-carrying wire in a magnetic field feels a force because the moving charges in it do. This force drives electric motors, loudspeakers and moving-coil meters, and makes parallel currents attract.
O: Calculate the force on a straight wire using F = BIL sin θ
O: Find the direction of the force with Fleming's left-hand rule
O: Calculate the force between parallel currents and the torque on a coil
PRE: Magnetic forces on charges
LV: A level · Application
H: The force
E: F = IL × B; |F| = BIL sin θ
- Fleming's left-hand rule: First finger Field, seCond finger Current, thuMb Motion.
- Maximum when the wire is perpendicular to B; zero when parallel.
- The force on the wire is the sum of the forces qv_{d} × B on its moving charge carriers.
H: Parallel wires
E: F/L = μ_{0}I_{1}I_{2}/(2πd)
- Parallel currents attract; antiparallel currents repel.
- This force defined the ampere until the 2019 SI redefinition fixed the value of e instead.
H: Torque on a loop
E: τ = NIAB sin θ = |m × B| :: m = NIA, magnetic moment; θ between the normal and B
- Basis of motors, moving-coil meters and galvanometers.
X: A 0.2 m wire carries 5 A perpendicular to a 0.3 T field. What is the force?
> F = BIL = 0.3 × 5 × 0.2
> F = 0.3 N
K: F = BIL sin θ: a current feels the largest force when it crosses the field at right angles and none when it runs along it.
!: A wire parallel to the field feels no force however large the current.
T: Fleming's left-hand rule | Field (first finger), current (second finger) and motion (thumb) are mutually at right angles
T: Magnetic moment of a coil | m = NIA, directed along the coil's normal by the right-hand grip rule; it sets the torque in a field
SUM: F = BIL sin θ, direction by Fleming's left-hand rule.
SUM: Parallel currents attract with F/L = μ_{0}I_{1}I_{2}/(2πd); antiparallel currents repel.
SUM: A coil feels a torque τ = NIAB sin θ, the working principle of motors and meters.
EV: established | A current-carrying conductor in a magnetic field experiences a force F = IL × B
SRC: OpenStax, University Physics Volume 2, section 11.4 "Magnetic Force on a Current-Carrying Conductor" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/11-4-magnetic-force-on-a-current-carrying-conductor
SRC: OpenStax, University Physics Volume 2, section 12.3 "Magnetic Force between Two Parallel Currents" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-3-magnetic-force-between-two-parallel-currents
SRC: AQA, A-level Physics specification (7408), section 3.7.5.1 "Magnetic flux density" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the force on a current in a magnetic field? | F = BIL sin θ.
Q: Do parallel currents attract or repel? | Attract.
M1@3: Two wires 1 m apart each carry 1 A in the same direction. Force per metre: | 2 × 10^{-7} N, attractive | 2 × 10^{-7} N, repulsive | 1 N, attractive | Zero, as the fields cancel | F/L = μ_{0}I_{1}I_{2}/(2πd) = 2 × 10^{-7} N m^{-1}; currents in the same direction attract.
M2@3: The torque on a current loop is maximum when its plane is: | Parallel to B | Perpendicular to B | At 45° to B | Irrelevant: the torque is constant | Torque is NIAB sin θ with θ between the normal and B; it is largest when the normal is perpendicular to B, so the plane is parallel to B.
M2@1,2: A horizontal wire carries current due east in a horizontal magnetic field pointing north. What is the direction of the force on it? | Vertically upwards | Vertically downwards | Due west | Due north | F = IL × B with L east and B north gives east × north = up; Fleming's left-hand rule agrees.
NUM2@1: A 5.0 cm length of wire carrying 3.0 A lies at 60° to a 0.20 T field. What is the force on it, in mN? | 26 | 3% | mN | F = BIL sin θ = 0.20 × 3.0 × 0.050 × sin 60° = 0.026 N = 26 mN.
M3@1,3: In the AQA top-pan balance practical, a horizontal wire across a magnet's field is clamped and the balance reading rises by 2.4 g when 4.0 A flows through 5.0 cm of wire. What is B? | 0.12 T | 0.0012 T | 1.2 T | 0.60 T | The force is mg = 2.4 × 10^{-3} × 9.81 = 0.0235 N; B = F/(IL) = 0.0235/(4.0 × 0.050) = 0.12 T.
SA2@1,2: Describe how to show experimentally that the force on a wire is proportional to the current, and how the direction of the force is predicted. | Place a magnet (or a pair of magnadur magnets on a yoke) on a top-pan balance and clamp a straight wire horizontally across the field at right angles. Pass a range of measured currents and record the change in mass reading; F = Δm g. A graph of F against I is a straight line through the origin, showing F ∝ I with gradient BL. Fleming's left-hand rule (field, current, motion) predicts the direction; by Newton's third law the magnet is pushed the opposite way, changing the reading. | Wire fixed at right angles across field on top-pan balance ; Vary current, measure change in reading, F = Δm g ; Straight line through origin shows F ∝ I ; Gradient equals BL ; Fleming's left-hand rule gives direction; reaction on magnet changes reading

## Motion of charged particles in magnetic fields
S: In a uniform magnetic field a charged particle moves in a circle (or helix), with a radius set by its momentum and an orbital frequency that does not depend on its speed. This underlies cyclotrons, mass spectrometers and particle detectors.
O: Derive and use r = mv/(qB) for circular motion in a magnetic field
O: Explain why the cyclotron frequency does not depend on speed
O: Explain how magnetic fields are used in cyclotrons, mass spectrometers and detectors
PRE: Magnetic forces on charges
LV: A level · Application
H: Circular motion
E: qvB = mv^{2}/r ⇒ r = mv/(qB) = p/(qB)
E: ω_{c} = qB/m; f_{c} = qB/(2πm) :: cyclotron frequency
- The magnetic force provides the centripetal force.
- The velocity component along B is unaffected, so in general the motion is a helix.
H: Applications
- **Mass spectrometry**: r ∝ m/q at fixed v, separating isotopes.
- **Cyclotron**: because f_{c} doesn't depend on v, a fixed-frequency alternating voltage across the gap between two D-shaped electrodes accelerates particles that spiral outwards, until relativity spoils the timing (synchrocyclotrons and synchrotrons fix that).
- **Particle detectors**: track curvature measures momentum; the curl direction gives the sign of the charge.
- **Magnetic bottles and tokamaks** confine plasmas; Earth's field traps particles in the Van Allen belts.
X: What is the radius of a 1 keV electron's path in a 1 mT field?
> v = √(2E/m) = √(2 × 1.6 × 10^{-16}/9.11 × 10^{-31}) = 1.9 × 10^{7} m s^{-1}
> r = mv/(eB) = 9.11 × 10^{-31} × 1.9 × 10^{7}/(1.6 × 10^{-19} × 10^{-3}) = 0.11 m
K: r = p/(qB): faster or heavier particles curve less, but every particle of the same q/m takes the same time per orbit.
!: For relativistic particles use r = p/(qB) with the relativistic momentum γmv; the cyclotron frequency then falls as γ rises.
P: **Investigate with the lab.** Double the speed and check the radius doubles. Then change the speed and see the time for one circle stay the same.
IX: lorentz
T: Cyclotron frequency | The orbital frequency f = qB/(2πm) of a charge in a uniform magnetic field, independent of speed at non-relativistic speeds
T: Cyclotron | An accelerator in which particles spiral outwards in a magnetic field, given energy by an alternating voltage at the cyclotron frequency
SUM: The magnetic force is centripetal: r = mv/(qB).
SUM: The period T = 2πm/(qB) does not depend on speed, which makes the cyclotron work.
SUM: Curvature measures momentum and charge sign in detectors and separates masses in spectrometers.
EV: established | A charge in a uniform magnetic field moves on a circle or helix of radius p/(qB)
SRC: OpenStax, University Physics Volume 2, section 11.3 "Motion of a Charged Particle in a Magnetic Field" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/11-3-motion-of-a-charged-particle-in-a-magnetic-field
SRC: OpenStax, University Physics Volume 2, section 11.7 "Applications of Magnetic Forces and Fields" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/11-7-applications-of-magnetic-forces-and-fields
SRC: AQA, A-level Physics specification (7408), section 3.7.5.2 "Moving charges in a magnetic field" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the radius of a charged particle's path in a magnetic field? | r = mv/(qB).
Q: Why does the cyclotron frequency not depend on speed (non-relativistically)? | Faster particles move on proportionally larger circles, taking the same time per orbit.
M1@1: Doubling a particle's speed in a fixed field changes its orbit radius by: | ×2 | ×4 | ×1/2 | No change | r = mv/(qB) is proportional to v, so doubling the speed doubles the radius.
M2@3: In a bubble chamber, an electron and positron with equal speeds curve: | Equally, in opposite directions | Equally, in the same direction | Only the electron curves | Not at all, being so light | They have equal mass and opposite charge, so the same radius r = mv/(eB) but opposite senses of rotation.
M2@2: A proton circling in a magnetic field has its speed doubled. What happens to its period? | It stays the same | It doubles | It halves | It quadruples | r = mv/qB grows with v, but T = 2πr/v = 2πm/(qB) doesn't depend on speed.
NUM2@1: A proton (m = 1.67 × 10^{-27} kg) moves at 2.0 × 10^{6} m s^{-1} perpendicular to a 0.50 T field. What is the radius of its path, in cm? | 4.2 | 3% | cm | r = mv/(qB) = 1.67 × 10^{-27} × 2.0 × 10^{6}/(1.6 × 10^{-19} × 0.50) = 0.042 m = 4.2 cm.
M3@1,3: Singly charged ions of carbon-12 and carbon-14, at the same speed, enter a spectrometer's field. The carbon-12 radius is 30 cm. What is the carbon-14 radius? | 35 cm | 26 cm | 30 cm | 41 cm | At fixed v, q and B, r ∝ m, so r = 30 × 14/12 = 35 cm; the heavier isotope curves less.
SA3@2,3: Explain how a cyclotron accelerates protons, why it can use a fixed-frequency supply, and why it fails at very high energies. | Protons move in two hollow D-shaped electrodes in a uniform magnetic field perpendicular to their plane. Inside a D they move on a semicircle; at the gap an alternating voltage accelerates them. Each semicircle takes half a period, T/2 = πm/(qB), which does not depend on speed, so the voltage can reverse at a fixed frequency qB/(2πm) and the protons gain energy at each crossing, spiralling outwards. At high energy the relativistic mass γm grows, so the orbital period lengthens and the particles fall out of step with the supply; synchrocyclotrons vary the frequency to fix this. | Magnetic field bends path into semicircles in the Ds ; Electric field in the gap does the accelerating ; Period 2πm/(qB) independent of speed, so fixed frequency works ; Radius grows with speed: outward spiral ; Relativistic increase in γ lengthens period, losing synchronism

## Biot–Savart law
S: The Biot–Savart law gives the magnetic field produced by a small element of current. Adding up (integrating) the contributions from all the elements gives the field of any steady current distribution.
O: State the Biot–Savart law and the meaning of each term
O: Use standard results for a straight wire and a circular loop
O: Explain how Helmholtz coils produce a nearly uniform field
PRE: Magnetic fields
LV: Year 1 · Application
H: The law
E: dB = (μ_{0}/4π)(I dl × r̂)/r^{2}
E: μ_{0} = 4π × 10^{-7} T m A^{-1} (very nearly, since 2019 a measured value)
- dB is perpendicular to both the current element and the line to the field point.
- Like Coulomb's law, it falls as 1/r^{2} for each element.
H: Standard results
E: B = μ_{0}I/(2πd) :: long straight wire
E: B = μ_{0}NI/(2R) :: centre of a flat coil of N turns
E: B = μ_{0}IR^{2}/(2(R^{2} + z^{2})^{3/2}) :: on the axis of a loop
- Far from a loop, the field is a magnetic dipole field, falling as m/r^{3}.
H: Helmholtz coils
P: Two coaxial coils separated by their radius give a very uniform field at the centre: used to cancel Earth's field, calibrate magnetometers and measure e/m.
X: What is the field at the centre of a 50-turn coil of radius 0.1 m carrying 2 A?
> B = μ_{0}NI/(2R) = 50 × 4π × 10^{-7} × 2/(2 × 0.1)
> B = 6.3 × 10^{-4} T
K: Each current element makes a field that circles it and falls as 1/r^{2}; integration gives fields such as μ_{0}I/(2πd) for a long wire.
!: The Biot–Savart law is for steady currents; for time-varying fields, retardation effects (Jefimenko's equations) matter.
T: Biot–Savart law | The field of a current element: dB = (μ_{0}/4π)I dl × r̂/r^{2}
T: Permeability of free space (μ_{0}) | The constant, about 4π × 10^{-7} T m A^{-1}, that sets the strength of magnetic fields made by currents in vacuum
SUM: The Biot–Savart law builds any steady field from current elements.
SUM: Long wire: B = μ_{0}I/(2πd); loop centre: B = μ_{0}NI/(2R).
SUM: Far from a loop the field is a dipole field; Helmholtz coils make a uniform field.
EV: established | The magnetic field of a steady current is given by the Biot–Savart law
SRC: OpenStax, University Physics Volume 2, section 12.1 "The Biot-Savart Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-1-the-biot-savart-law
SRC: OpenStax, University Physics Volume 2, section 12.4 "Magnetic Field of a Current Loop" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-4-magnetic-field-of-a-current-loop
Q: What is the field of a long straight wire? | B = μ_{0}I/(2πd), circling the wire.
Q: Why are Helmholtz coils useful? | They produce a very uniform field in the region between them.
M1@2: The field of a long straight wire falls with distance as: | 1/d | 1/d^{2} | 1/d^{3} | It is constant | Integrating Biot–Savart (or using Ampère's law) gives B = μ_{0}I/(2πd), proportional to 1/d.
M2@2: Doubling the radius of a loop (same current) changes the field at its centre by: | ×1/2 | ×2 | ×1/4 | No change | B = μ_{0}I/(2R) is inversely proportional to the radius, so doubling R halves B.
NUM2@2: What is the magnetic field 5.0 cm from a long straight wire carrying 10 A, in μT? | 40 | 2% | μT | B = μ_{0}I/(2πd) = 2 × 10^{-7} × 10/0.050 = 4.0 × 10^{-5} T = 40 μT, comparable with Earth's field.
M3@1,2: On the axis of a loop, at a distance z much larger than its radius R, the field falls approximately as: | 1/z^{3} | 1/z^{2} | 1/z | It stays constant | For z ≫ R the axial formula becomes μ_{0}IR^{2}/(2z^{3}): a dipole field falling as 1/z^{3}.
TF2@1: In the Biot–Savart law, the field from a current element points along the line from the element to the field point. | false | dB is along dl × r̂, perpendicular to both the element and the line joining it to the point.
SA2@1,3: State the Biot–Savart law and explain how it is used to find the field at the centre of a circular loop. | dB = (μ_{0}/4π) I dl × r̂/r^{2}. At the centre of a loop of radius R every element is at distance R and perpendicular to r̂, so each contributes dB = μ_{0}I dl/(4πR^{2}) along the axis, all in the same direction. Adding round the loop, the total length is 2πR, so B = μ_{0}I/(2R), or μ_{0}NI/(2R) for N turns. | Statement with all terms ; Every element at distance R, dl perpendicular to r̂ ; All contributions along the axis add ; Sum of dl is 2πR ; Result B = μ_{0}I/(2R)

## Ampère's law
S: Ampère's law relates the magnetic field circulating around a closed loop to the current passing through it. With symmetry it finds fields quickly, and with Maxwell's correction it is one of the four fundamental equations of electromagnetism.
O: State Ampère's law in integral and differential form
O: Use Ampère's law with a symmetric loop to find the field of a wire, solenoid or toroid
O: Explain why Maxwell added the displacement current
PRE: Biot–Savart law
LV: Year 1 · Application
H: The law
E: ∮B·dl = μ_{0}I_{enc}
E: ∇ × B = μ_{0}J :: differential form (steady currents)
- Choose an Amperian loop on which B is constant and either along or perpendicular to the path.
H: Using it
- Straight wire: B·2πr = μ_{0}I ⇒ B = μ_{0}I/(2πr).
- Inside a uniform wire of radius R: B = μ_{0}Ir/(2πR^{2}).
- Long solenoid: B = μ_{0}nI inside, ~0 outside.
- Toroid: B = μ_{0}NI/(2πr) inside, zero outside.
- Coaxial cable: zero field outside (equal and opposite currents).
H: Maxwell's correction
P: For a charging capacitor, the current through a surface between the plates is zero, but through a surface cutting the wire it isn't. Maxwell resolved the contradiction by adding the displacement current ε_{0}dΦ_{E}/dt: ∮B·dl = μ_{0}(I + ε_{0}dΦ_{E}/dt). This predicted electromagnetic waves.
X: What is the field inside a 20 cm solenoid with 400 turns carrying 3 A?
> n = 400/0.20 = 2000 m^{-1}
> B = μ_{0}nI = 4π × 10^{-7} × 2000 × 3 = 7.5 mT
K: The circulation of B round any loop equals μ_{0} times the current through it; with enough symmetry this gives B in one line.
!: Ampère's law always holds (with displacement current), but is only useful for finding B when symmetry makes B constant along the loop.
T: Amperian loop | A closed path chosen so that B is constant along it, used to apply Ampère's law
T: Enclosed current | The net current passing through any surface bounded by the loop, counting direction
SUM: ∮B·dl = μ_{0}I_{enc}; with symmetry it gives the fields of wires, solenoids and toroids.
SUM: Inside a long solenoid B = μ_{0}nI; outside it is nearly zero.
SUM: Maxwell's displacement current makes the law consistent for changing fields.
EV: established | The circulation of B equals μ_{0} times the enclosed conduction plus displacement current
SRC: OpenStax, University Physics Volume 2, section 12.5 "Ampère’s Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-5-amperes-law
SRC: OpenStax, University Physics Volume 2, section 12.6 "Solenoids and Toroids" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-6-solenoids-and-toroids
Q: State Ampère's law (steady currents). | The line integral of B round a closed loop equals μ_{0} times the enclosed current.
Q: What is the field outside an ideal long solenoid? | Approximately zero.
M1@2: The field inside a long solenoid depends on: | Turns per length and current | Its radius | Its total length only | Position inside it | B = μ_{0}nI depends only on turns per metre and current, and is uniform across the interior.
M2@2: Why is there no field outside a coaxial cable? | The enclosed net current is zero | The insulation blocks the field | Copper is non-magnetic | Only AC flows in cables | A loop outside encloses equal and opposite currents, so ∮B·dl = 0 and by symmetry B = 0.
NUM2@2: A long straight wire of radius 2.0 mm carries 8.0 A spread uniformly. What is B at 1.0 mm from its axis, in mT? | 0.40 | 2% | mT | Inside, B = μ_{0}Ir/(2πR^{2}) = 2 × 10^{-7} × 8.0 × 1.0 × 10^{-3}/(2.0 × 10^{-3})^{2} = 4.0 × 10^{-4} T = 0.40 mT.
M3@1,3: For a capacitor that is charging, why does applying ∮B·dl = μ_{0}I_{enc} to the same loop give two answers? | Different surfaces on the loop enclose different currents, one cutting the wire and one passing between the plates | The magnetic field between the plates is infinite | Charge is not conserved while the capacitor charges | The loop must be circular for the law to apply | A surface through the wire encloses I, but one ballooning between the plates encloses none; Maxwell's term ε_{0}dΦ_{E}/dt supplies the missing current.
SA2@2: Use Ampère's law to derive the field inside a long solenoid with n turns per metre carrying current I. | Take a rectangular Amperian loop with one side of length l inside the solenoid, parallel to the axis, and the opposite side outside. Outside the field is negligible; along the short sides B is perpendicular to the path (or zero). So ∮B·dl = Bl. The loop encloses nl turns, each carrying I, so the enclosed current is nlI. Ampère's law gives Bl = μ_{0}nlI, so B = μ_{0}nI. | Rectangular loop half inside, half outside ; Outside field negligible; short sides contribute nothing ; Line integral equals Bl ; Enclosed current nlI ; B = μ_{0}nI

## Magnetic dipoles
S: A current loop, a bar magnet and an electron all behave as magnetic dipoles: they produce a characteristic field and twist to align with an external field. The magnetic moment m measures their strength.
O: Calculate the magnetic moment of a coil and the torque on it in a field
O: Use U = −m·B to find stable and unstable orientations
O: Explain the Stern–Gerlach experiment and why a net force needs a field gradient
PRE: Magnetic forces on current-carrying wires
LV: Year 1 · Application
H: Magnetic moment
E: m = NIA (A m^{2}) :: current loop
E: τ = m × B; U = −m·B
E: F = ∇(m·B) :: force in a non-uniform field
- Far away the field falls as m/r^{3}, the same shape as an electric dipole's field.
H: Atomic magnetic moments
E: μ_{B} = eħ/(2m_{e}) = 9.27 × 10^{-24} J T^{-1} :: Bohr magneton
- Electron spin moment ≈ 1 μ_{B} (g ≈ 2.002).
- The nuclear magneton μ_{N} is about 1/1836 of μ_{B}: why NMR frequencies are much lower than electron spin resonance frequencies.
H: Stern–Gerlach experiment
P: Silver atoms passing through a non-uniform magnetic field split into two discrete beams (1922), not a continuous smear. It showed that the component of angular momentum along the field is quantised; the two beams were later explained by electron spin.
X: What is the torque on a 100-turn coil (A = 4 cm^{2}, I = 0.5 A) with its moment perpendicular to a 0.2 T field?
> m = NIA = 100 × 0.5 × 4 × 10^{-4} = 0.02 A m^{2}
> τ = mB = 0.02 × 0.2 = 4 × 10^{-3} N m
K: A dipole in a uniform field feels a torque mB sin θ turning it towards alignment; its energy −mB cos θ is lowest when aligned.
!: A magnetic dipole in a uniform field feels only torque; a net force needs a field gradient.
T: Magnetic dipole moment | m = NIA for a coil: a vector along the normal that sets the torque (m × B) and energy (−m·B) in a field
T: Bohr magneton | The natural unit of atomic magnetic moment, eħ/(2m_{e}) ≈ 9.27 × 10^{-24} J T^{-1}
SUM: m = NIA; torque m × B; energy −m·B.
SUM: Uniform fields twist dipoles; non-uniform fields also push them.
SUM: Atomic moments are of order μ_{B}, and Stern–Gerlach showed they are quantised in direction.
EV: established | Atomic magnetic moments are quantised in direction, as the Stern–Gerlach experiment showed
SRC: OpenStax, University Physics Volume 2, section 11.5 "Force and Torque on a Current Loop" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/11-5-force-and-torque-on-a-current-loop
SRC: OpenStax, University Physics Volume 3, section 8.3 "Electron Spin" | secondary | 2016 | https://openstax.org/books/university-physics-volume-3/pages/8-3-electron-spin
Q: What is the magnetic moment of a current loop? | m = NIA, perpendicular to the loop by the right-hand rule.
Q: What did the Stern–Gerlach experiment show? | Spin angular momentum is quantised: atoms split into discrete beams.
M1@1: The Bohr magneton is about: | 9.3 × 10^{-24} J T^{-1} | 1.6 × 10^{-19} J T^{-1} | 5.1 × 10^{-27} J T^{-1} | 1 J T^{-1} | μ_{B} = eħ/(2m_{e}) ≈ 9.27 × 10^{-24} J T^{-1}; 5.1 × 10^{-27} J T^{-1} is the much smaller nuclear magneton.
M2@2: A dipole's energy is lowest when m is: | Parallel to B | Antiparallel to B | Perpendicular to B | Zero | U = −mB cos θ is most negative at θ = 0, so alignment with the field is the stable state.
NUM2@2: How much work is needed to turn a dipole of moment 0.05 A m^{2} from parallel to antiparallel in a 0.4 T field, in J? | 0.04 | 2% | J | ΔU = (+mB) − (−mB) = 2mB = 2 × 0.05 × 0.4 = 0.04 J.
M3@3: A small bar magnet is placed in the uniform field between large Helmholtz coils. What does it experience? | A torque but no net force | A net force but no torque | Both a torque and a net force | Neither force nor torque | In a uniform field the forces on the two poles are equal and opposite, giving a torque only; a net force F = ∇(m·B) needs a gradient.
SA3@1,3: Explain why the Stern–Gerlach experiment uses a non-uniform field, and what its result shows. | A uniform field only exerts a torque on a magnetic dipole, so it would not separate atoms. A non-uniform field exerts a force F_{z} = m_{z} dB/dz that depends on the component of the moment along the field, so atoms are deflected by an amount set by m_{z}. Classically m_{z} could take any value, giving a continuous smear; silver atoms instead formed two discrete spots, showing the component of magnetic moment (and angular momentum) is quantised, with two values corresponding to electron spin ±½. | Uniform field gives torque only ; Gradient gives force proportional to m_{z} ; Classical expectation: continuous spread ; Observed: two discrete beams ; Quantisation of angular momentum component, explained by spin ½

## Magnetic flux
S: Magnetic flux measures the total magnetic field passing through a surface. Changes in the flux through a circuit induce emfs, which makes flux the central quantity of electromagnetic induction.
O: Calculate magnetic flux and flux linkage for a coil at an angle to a field
O: Describe the ways in which the flux through a circuit can change
O: Explain why the net flux out of any closed surface is zero
PRE: Magnetic fields
LV: A level · Foundation
H: Definitions
E: Φ = BA cos θ :: weber (Wb = T m^{2}); θ between B and the normal to the surface
E: Φ = ∫B·dA :: general surface
E: NΦ = BAN cos θ :: flux linkage of an N-turn coil
- Net flux through any closed surface is zero (∇·B = 0).
H: Ways to change flux
- Change B (move a magnet, change a current).
- Change area (moving rod on rails, flexing loop).
- Change orientation (rotating coil in a generator).
H: Flux quantisation
P: In a superconducting ring, flux is quantised in units of the flux quantum Φ_{0} = h/(2e) = 2.07 × 10^{-15} Wb. SQUIDs exploit this to measure fields of femtotesla size, small enough to detect brain activity (magnetoencephalography).
X: A 50-turn coil of area 0.01 m^{2} has its normal at 60° to a 0.4 T field. What is the flux linkage?
> Φ = BA cos θ = 0.4 × 0.01 × cos 60° = 2 × 10^{-3} Wb
> NΦ = 50 × 2 × 10^{-3} = 0.1 Wb-turns
K: Flux is B times the area it crosses at right angles; flux linkage multiplies by the number of turns.
!: θ is measured between B and the normal to the surface, not the surface itself.
T: Magnetic flux | Φ = BA cos θ: the field component normal to a surface times its area, in webers
T: Flux linkage | NΦ: the flux through a coil multiplied by its number of turns, in Wb-turns
SUM: Φ = BA cos θ, measured in webers; flux linkage is NΦ.
SUM: Flux changes when B, the area or the orientation changes.
SUM: Field lines are closed, so the net flux out of a closed surface is zero.
EV: established | The net magnetic flux through any closed surface is zero
SRC: OpenStax, University Physics Volume 2, section 13.1 "Faraday’s Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law
SRC: AQA, A-level Physics specification (7408), section 3.7.5.3 "Magnetic flux and flux linkage" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define magnetic flux. | Φ = BA cos θ, the field component normal to a surface times its area.
Q: What is the flux quantum? | Φ_{0} = h/(2e) ≈ 2.07 × 10^{-15} Wb.
M1@1: The unit of magnetic flux is: | Weber | Tesla | Henry | Ampere | Flux is field times area, so its unit is T m^{2}, called the weber; the tesla is the unit of flux density.
M2@1: A coil's plane is parallel to B. The flux through it is: | Zero | Maximum | BA/2 | Negative | The normal is then perpendicular to B, so cos 90° = 0 and no field lines pass through the coil.
NUM2@1: A 200-turn square coil of side 4.0 cm lies with its normal along a 0.25 T field. What is its flux linkage, in Wb-turns? | 0.08 | 2% | Wb-turns | NΦ = NBA = 200 × 0.25 × (0.040)^{2} = 0.080 Wb-turns.
M3@1,2: A coil is rotated from having its normal along B to having its normal at 60° to B. What fraction of the original flux linkage remains? | One half | None | Three-quarters | 0.87 | NΦ = BAN cos θ and cos 60° = 0.5, so half remains; 0.87 would be sin 60°, the result of measuring from the wrong reference.
SA2@1,2: Describe how a search coil and oscilloscope can show how flux linkage depends on the angle between a coil and a field, and state the expected result. | Place a small search coil in an alternating field (for example near a coil driven by an AC supply) and connect it to an oscilloscope. Rotate the coil with a protractor and record the peak emf at each angle θ between the field and the coil's normal. Because the induced emf is proportional to the flux linkage, a graph of peak emf against cos θ is a straight line through the origin: NΦ = BAN cos θ. | Search coil in alternating field, connected to oscilloscope ; Angle varied and measured ; Peak emf recorded at each angle ; emf proportional to flux linkage ; Linear plot against cos θ

## Electromagnetic induction
S: Electromagnetic induction is the production of an emf by a changing magnetic flux. Discovered by Faraday in 1831, it powers generators, transformers, induction hobs, wireless chargers and electric guitars.
O: Describe simple experiments that show electromagnetic induction
O: Calculate the motional emf of a conductor moving through a field
O: Explain how everyday devices use induction, including eddy currents
PRE: Magnetic flux
LV: GCSE and A level · Foundation
H: Two pictures
- **Motional emf**: a conductor moving through B: its charges feel qv × B, giving ε = BLv for a rod.
- **Transformer emf**: a changing B induces a circulating electric field (∇ × E = −∂B/∂t), even in empty space.
- Faraday's law covers both: ε = −dΦ/dt.
H: Simple demonstrations
- Push a magnet into a coil connected to a meter: a current flows only while the magnet moves; it reverses when the magnet is withdrawn.
- Faster motion, a stronger magnet or more turns give a bigger emf.
H: Applications
- Generators and transformers; induction hobs (eddy currents heat the pan).
- Eddy-current braking in trains and roller coasters; metal detectors.
- Magnetic guitar pickups and dynamic microphones.
- Wireless charging (Qi): coupled coils at ~100–200 kHz.
X: A 0.5 m rod moves at 4 m s^{-1} perpendicular to a 0.2 T field. What is the emf?
> ε = BLv = 0.2 × 0.5 × 4
> ε = 0.4 V
K: Only a change in flux linkage induces an emf; the size of the emf depends on how fast the flux changes.
!: A steady magnetic field through a stationary loop induces nothing; only change does.
T: Electromagnetic induction | The production of an emf in a conductor by a change in the magnetic flux linking it
T: Eddy currents | Loops of induced current in a bulk conductor exposed to a changing flux, which heat it and oppose the change
SUM: A changing flux induces an emf: ε = −dΦ/dt.
SUM: A rod moving across a field has ε = BLv.
SUM: Induction underlies generators, transformers, induction heating and eddy-current braking.
EV: established | A changing magnetic flux through a circuit induces an emf in it
SRC: OpenStax, University Physics Volume 2, section 13.3 "Motional Emf" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-3-motional-emf
SRC: OpenStax, University Physics Volume 2, section 13.5 "Eddy Currents" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-5-eddy-currents
SRC: AQA, A-level Physics specification (7408), section 3.7.5.4 "Electromagnetic induction" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is electromagnetic induction? | The generation of an EMF by a change in magnetic flux.
Q: What is the motional EMF of a rod? | ε = BLv.
M1@3: An induction hob heats: | Metal pans via eddy currents | The glass surface directly | Any material placed on it | The water directly by microwaves | A changing B field induces eddy currents in the conducting pan, whose resistance turns them into heat.
M2@1: A magnet held still inside a coil induces: | No EMF | A steady EMF | An alternating EMF | A large current | With nothing moving or changing, the flux linkage is constant, so no emf is induced.
NUM1@2: An aircraft wing of span 30 m flies at 250 m s^{-1} through a vertical field component of 40 μT. What emf is induced across the wingtips, in V? | 0.3 | 2% | V | ε = BLv = 40 × 10^{-6} × 30 × 250 = 0.30 V.
M3@1: A magnet is dropped through a coil connected to a data logger. Which describes the emf trace? | A pulse one way as it enters, then a larger, shorter pulse the opposite way as it leaves | A single steady emf while the magnet is inside | Two identical pulses in the same direction | No emf, because the magnet passes right through | Entering increases the flux and leaving decreases it, so the emf reverses; the magnet is faster when leaving, so the second pulse is larger and shorter.
SA2@2: Derive the emf induced across a rod of length L moving at speed v perpendicular to a uniform field B, using the force on its charges. | Each free charge q in the rod moves with velocity v, so it feels a magnetic force qvB along the rod. Charges move until they set up an electric field E that balances this: qE = qvB, so E = vB. The potential difference across the rod is E × L, so ε = BLv. The same result follows from the rate at which the rod sweeps out area: dΦ/dt = BLv. | Magnetic force qvB on charges along the rod ; Charge separation builds an electric field ; Equilibrium qE = qvB ; emf = EL = BLv ; Agreement with rate of change of flux BLv

## Faraday's law
S: Faraday's law states that the emf induced in a circuit equals the rate of change of magnetic flux linkage through it. It is one of Maxwell's equations and the basis of electric power generation.
O: Calculate induced emf from a rate of change of flux linkage
O: Derive and use ε = BANω sin ωt for a rotating coil
O: Explain why a changing magnetic field produces a non-conservative electric field
PRE: Electromagnetic induction
LV: A level · Application
H: The law
E: ε = −N dΦ/dt
E: ∮E·dl = −dΦ_{B}/dt; ∇ × E = −∂B/∂t
- The minus sign is Lenz's law: the emf opposes the change.
H: AC generator
E: NΦ = BAN cos ωt ⇒ ε = BANω sin ωt :: coil rotating at angular speed ω
- Peak emf BANω; the emf frequency equals the rotation frequency.
- The emf is largest when the coil's plane is parallel to B, where the flux is zero but changing fastest.
H: Induced electric fields
P: A changing magnetic field creates an electric field whose lines form closed loops (non-conservative): ∮E·dl ≠ 0. That's why Kirchhoff's loop law fails in circuits threaded by changing flux. Betatrons accelerate electrons with such induced fields.
X: A 200-turn coil (A = 0.05 m^{2}) rotates at 50 rev s^{-1} in 0.1 T. What is the peak emf?
> ω = 2π × 50 = 314 rad s^{-1}
> ε_{0} = BANω = 0.1 × 0.05 × 200 × 314 = 314 V
K: The emf is the rate of change of flux linkage, not the flux itself: zero flux can give the largest emf.
!: EMF depends on the rate of change of flux, not on how large the flux is.
T: Faraday's law | The induced emf equals the rate of change of flux linkage, ε = −N dΦ/dt
T: Induced electric field | A circulating, non-conservative electric field produced by a changing magnetic field
SUM: ε = −N dΦ/dt; the sign expresses Lenz's law.
SUM: A coil rotating at ω gives ε = BANω sin ωt, peak BANω.
SUM: Changing B makes curling E even in empty space.
EV: established | The emf round a circuit equals minus the rate of change of the flux linkage through it
SRC: OpenStax, University Physics Volume 2, section 13.1 "Faraday’s Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law
SRC: OpenStax, University Physics Volume 2, section 13.4 "Induced Electric Fields" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-4-induced-electric-fields
SRC: AQA, A-level Physics specification (7408), section 3.7.5.4 "Electromagnetic induction" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Faraday's law. | The induced EMF equals the negative rate of change of flux linkage.
Q: What is the peak EMF of a rotating coil generator? | NBAω.
M1@1: Flux through a 10-turn coil falls from 0.3 to 0.1 Wb in 0.5 s. EMF: | 4 V | 0.4 V | 2 V | 40 V | ε = NΔΦ/Δt = 10 × 0.2/0.5 = 4 V; forgetting the turns gives 0.4 V.
M2@2: Doubling a generator's rotation speed changes peak EMF by: | ×2 | ×4 | ×1/2 | No change | Peak emf BANω is proportional to ω (and the frequency doubles too).
NUM2@2: A 500-turn coil of area 2.0 × 10^{-3} m^{2} spins at 25 rev s^{-1} in a 0.15 T field. What is the peak emf, in V? | 23.6 | 2% | V | ω = 2π × 25 = 157 rad s^{-1}; ε_{0} = BANω = 0.15 × 2.0 × 10^{-3} × 500 × 157 = 23.6 V.
M3@2: At the instant a generator coil's plane is perpendicular to the field, the emf is: | Zero, because the flux is momentarily not changing | Maximum, because the flux is maximum | Half its peak value | Equal to BAN | Flux linkage BAN cos ωt is at its peak, where its gradient is zero; the emf BANω sin ωt is zero then.
SA3@3: Explain why Kirchhoff's loop rule cannot be applied to a circuit threaded by a changing magnetic flux. | Kirchhoff's loop rule says the sum of potential differences round a loop is zero, which requires the electric field to be conservative (∮E·dl = 0). Faraday's law says ∮E·dl = −dΦ/dt, so when the flux through the loop changes the induced electric field circulates and its loop integral is not zero. There is no single-valued potential, and a voltmeter's reading depends on the path of its leads. The rule must be replaced by including the induced emf in the loop. | Loop rule assumes conservative field ; Faraday: circulation of E equals −dΦ/dt ; Changing flux makes E non-conservative ; Potential not single-valued; readings depend on path ; Must include induced emf explicitly

## Lenz's law
S: Lenz's law says an induced current flows in the direction that opposes the change that caused it. It is energy conservation in disguise: if induced currents helped the change, you would get energy for nothing.
O: Use Lenz's law to find the direction of an induced current
O: Explain Lenz's law as a consequence of conservation of energy
O: Explain eddy-current braking and the falling-magnet experiment
PRE: Faraday's law
LV: GCSE and A level · Foundation
H: Using it
- Magnet approaching a coil: the induced current makes a like pole facing it (repels).
- Magnet leaving: the induced current attracts it back.
- Increasing flux into a loop: the induced current makes flux out of it.
P: Think of the coil as an electromagnet whose poles are chosen to resist whatever you are doing: pushing is resisted by repulsion, pulling by attraction.
H: Examples
- A magnet falls slowly through a copper pipe: eddy currents oppose its motion.
- Eddy-current brakes on trains and drop towers: smooth and contact-free.
- Jumping ring: a ring on a solenoid leaps off when AC is switched on (repelled).
- Generators get harder to turn when more current is drawn: the induced current opposes rotation, and that is how mechanical work becomes electrical energy.
X: A bar magnet's north pole is pushed towards a coil. Which pole does the coil present to it?
> North: the induced current opposes the approach by repelling
> So the work done pushing the magnet becomes electrical energy in the circuit
K: The induced current always opposes the change in flux, so work must be done to produce it: energy is conserved.
!: Lenz's law opposes the change in flux, not the flux itself; if flux is decreasing, the induced current tries to maintain it.
T: Lenz's law | The direction of an induced current is such as to oppose the change that produces it
T: Eddy-current braking | Slowing a moving conductor using the opposing forces from currents induced in it by a magnetic field
SUM: Induced currents oppose the change in flux that causes them.
SUM: That opposition means work is done, which is where induced electrical energy comes from.
SUM: Eddy currents use the same rule to brake, damp and heat.
EV: established | Induced currents oppose the change in flux that produces them, as energy conservation requires
SRC: OpenStax, University Physics Volume 2, section 13.2 "Lenz's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-2-lenzs-law
SRC: OpenStax, University Physics Volume 2, section 13.5 "Eddy Currents" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-5-eddy-currents
SRC: AQA, A-level Physics specification (7408), section 3.7.5.4 "Electromagnetic induction" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Lenz's law. | The induced current flows so as to oppose the change in flux that produced it.
Q: Why does a magnet fall slowly through a copper pipe? | Eddy currents induced in the pipe produce fields opposing its motion.
M1@2: Lenz's law is a consequence of: | Conservation of energy | Conservation of charge | Newton's first law | Ohm's law | If induced currents aided the change, a small push would grow without limit, creating energy from nothing.
M2@3: A generator becomes harder to turn when: | More current is drawn from it | It's disconnected from any load | It spins more slowly | The magnets are removed | A larger induced current gives a larger opposing force, so more work per turn supplies the extra electrical energy.
M3@1: A magnet's south pole is pulled away from one end of a coil. Seen from the magnet, which way does the induced current flow at that end? | Anticlockwise, making a north pole that attracts the magnet back | Clockwise, making a south pole that repels | No current, since the magnet is moving away | Clockwise, making a north pole | Withdrawal must be opposed, so that end becomes a north pole, attracting the south pole back; a north pole seen face-on has anticlockwise current.
TF1@3: A magnet dropped through a slotted copper tube (cut along its length) falls more slowly than through a complete tube. | false | The slot breaks the circular eddy-current paths, so the opposing currents are much smaller and the magnet falls faster.
SA2@2,3: A strong magnet is dropped down a vertical copper pipe and falls much more slowly than in air. Explain why, and say what happens to its energy. | As the magnet falls, the flux through each section of pipe below it increases and above it decreases. Eddy currents are induced in rings of the pipe, and by Lenz's law their magnetic fields oppose the change: the ring below repels the magnet and the ring above attracts it, both opposing the fall. The magnet quickly reaches a terminal speed where the magnetic drag equals its weight. Its lost gravitational potential energy becomes electrical energy in the eddy currents, dissipated as heat in the pipe. | Changing flux through rings of the pipe ; Eddy currents induced ; Lenz's law: fields oppose motion (below repels, above attracts) ; Terminal speed when drag equals weight ; GPE converted to heat in the pipe

## Inductance
S: Inductance is the property of a circuit that opposes changes in current by producing an emf proportional to the rate of change. It measures how much flux linkage a current produces, per ampere.
O: Define inductance and use ε = −L dI/dt
O: Calculate the inductance of a long solenoid
O: Describe how inductors behave in DC and AC circuits
PRE: Faraday's law
LV: Year 1 · Application
H: Definition
E: L = NΦ/I (henry, H = Wb A^{-1})
E: ε = −L dI/dt
E: L = μ_{0}μ_{r}N^{2}A/l :: long solenoid
- Iron cores increase L by μ_{r} (hundreds to thousands), until the iron saturates.
H: Behaviour in circuits
- Resists sudden current changes: smooths current, causes voltage spikes at switch-off.
- Reactance X_{L} = ωL: blocks high-frequency AC, passes DC.
- Stores energy ½LI^{2}.
H: Uses
- Chokes and filters; switch-mode power supplies (energy stored and released each cycle).
- LC tuned circuits; ignition coils; traffic loop detectors.
X: A coil of 500 turns, length 0.25 m, area 4 cm^{2}, air core. What is its inductance?
> L = μ_{0}N^{2}A/l = 4π × 10^{-7} × 250 000 × 4 × 10^{-4}/0.25
> L = 5.0 × 10^{-4} H = 0.50 mH
K: An inductor produces an emf L dI/dt opposing any change in current; it has no effect on a steady current apart from its resistance.
!: Inductance grows as N^{2}: doubling turns quadruples it.
P: **Investigate with the lab.** Increase the inductance and see the current take longer to reach its final value.
IX: transients
T: Inductance | Flux linkage per unit current, L = NΦ/I; equivalently the back emf per unit rate of change of current
T: Henry | The unit of inductance: 1 H gives 1 V of emf when the current changes at 1 A s^{-1}
SUM: L = NΦ/I and ε = −L dI/dt.
SUM: A long solenoid has L = μ_{0}μ_{r}N^{2}A/l.
SUM: Inductors smooth current, block high frequencies and store energy ½LI^{2}.
EV: established | A changing current in a coil induces an emf proportional to its rate of change
SRC: OpenStax, University Physics Volume 2, section 14.2 "Self-Inductance and Inductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors
SRC: OpenStax, College Physics 2e, section 23.9 "Inductance" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/23-9-inductance
Q: Define inductance. | Flux linkage per unit current, L = NΦ/I; the back EMF per rate of change of current.
Q: How does an iron core change inductance? | It multiplies it by the relative permeability.
M1@1: The unit of inductance is: | Henry | Farad | Tesla | Weber | The henry, H = V s A^{-1} = Wb A^{-1}; the farad is capacitance and the weber is flux.
M2@1: Current changes at 200 A s^{-1} in a 50 mH coil. Back EMF: | 10 V | 4 V | 250 V | 0.25 V | ε = L dI/dt = 0.050 H × 200 A s^{-1} = 10 V of back emf.
M2@3: What does an inductor oppose? | Changes in current | Steady current | Voltage across a resistor | Charge stored on a plate | Self-inductance produces a back emf whenever the current changes, but not for a steady current.
NUM2@2: A 2000-turn solenoid is 0.40 m long with cross-section 1.0 × 10^{-3} m^{2}, air-cored. What is its inductance, in mH? | 12.6 | 2% | mH | L = μ_{0}N^{2}A/l = 4π × 10^{-7} × 4.0 × 10^{6} × 1.0 × 10^{-3}/0.40 = 0.0126 H = 12.6 mH.
M3@2: A solenoid is rewound with twice as many turns on the same former. Its inductance becomes: | Four times larger | Twice as large | Unchanged | Half as large | Doubling N doubles both the field per ampere and the number of turns it links, so L ∝ N^{2} rises fourfold.
SA2@3: A switch disconnects a large inductor carrying a steady current, and a spark jumps across the switch. Explain why, and how a diode across the coil prevents it. | Opening the switch tries to reduce the current to zero almost instantly, so dI/dt is huge and the emf L dI/dt is very large. This voltage appears across the opening contacts and can ionise the air, making a spark. A diode connected across the coil (reverse-biased in normal running) gives the current a path when the switch opens, so the current decays gradually through the diode and coil resistance; dI/dt and the emf stay small and the stored energy ½LI^{2} is dissipated safely. | Sudden switch-off gives huge dI/dt ; Back emf L dI/dt very large ; Large voltage across contacts causes spark ; Flyback diode provides a path for the current ; Current decays slowly; energy dissipated in diode and coil

## Self-induction and mutual induction
S: Self-induction is a changing current inducing an emf in its own circuit; mutual induction is a changing current in one circuit inducing an emf in another nearby. Transformers, wireless chargers and many sensors depend on mutual induction.
O: Distinguish self-induction from mutual induction
O: Calculate emfs using ε = −L dI/dt and ε_{2} = −M dI_{1}/dt
O: Explain how coupling and geometry control mutual inductance and unwanted pick-up
PRE: Inductance
LV: Year 1 · Application
H: Self-induction
E: ε = −L dI/dt
- Back emf in motors limits current at speed.
H: Mutual induction
E: ε_{2} = −M dI_{1}/dt; M_{12} = M_{21}
E: M = k√(L_{1}L_{2}) :: coupling coefficient 0 ≤ k ≤ 1
- Tightly coupled (k ≈ 1): transformers on a shared iron core.
- Loosely coupled: wireless charging, RFID and NFC (k well below 1).
H: Unwanted coupling
P: Mutual inductance causes crosstalk between nearby wires and circuits. Twisted pairs cancel induced emfs because successive twists see opposite flux; ground loops pick up mains hum.
X: Two coils have M = 20 mH. The current in coil 1 rises at 50 A s^{-1}. What emf appears in coil 2?
> ε = M dI_{1}/dt = 20 × 10^{-3} × 50
> ε = 1.0 V
K: A changing current induces an emf in its own circuit (L) and in neighbouring circuits (M); M is the same whichever coil drives.
!: Mutual inductance is symmetric: coil 1's effect on coil 2 equals coil 2's on coil 1.
P: **Investigate with the lab.** Switch the RL circuit on and watch the inductor's voltage: it is largest when the current is changing fastest.
IX: transients
T: Mutual inductance | M = N_{2}Φ_{21}/I_{1}: the flux linkage in one circuit per unit current in another
T: Coupling coefficient | k = M/√(L_{1}L_{2}), the fraction of flux shared between two coils, from 0 to 1
SUM: Self-induction: ε = −L dI/dt; mutual induction: ε_{2} = −M dI_{1}/dt.
SUM: M = k√(L_{1}L_{2}); transformers have k ≈ 1, wireless chargers much less.
SUM: Twisted pairs and careful layout reduce unwanted mutual coupling.
EV: established | A changing current in one circuit induces an emf in a nearby circuit in proportion to M
SRC: OpenStax, University Physics Volume 2, section 14.1 "Mutual Inductance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-1-mutual-inductance
SRC: OpenStax, University Physics Volume 2, section 14.2 "Self-Inductance and Inductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors
Q: What is mutual inductance? | The EMF induced in one circuit per unit rate of change of current in another.
Q: Why do twisted-pair cables reduce interference? | Each twist reverses the loop's orientation, cancelling induced EMFs.
M1@3: Coupling coefficient k = 1 means: | All flux from one coil links the other | There is no coupling at all | Half the flux links the other coil | The inductance is infinite | k = M/√(L_{1}L_{2}) = 1 is perfect coupling: every field line of one coil threads the other.
M2@3: NFC payment uses: | Mutual induction between coils | Long-range radio broadcast | Infrared light pulses | Ultrasound signals | NFC uses near-field magnetic coupling: the reader's changing current induces an emf in the card's coil a few centimetres away.
M2@2: When is the back emf across an inductor largest? | When the current is changing fastest | When the current is largest | When the current is zero and steady | It is constant at all times | Back emf = L × dI/dt, so it is largest when the current changes fastest.
NUM2@2: Two coils have L_{1} = 40 mH and L_{2} = 90 mH with coupling coefficient 0.50. What is their mutual inductance, in mH? | 30 | 2% | mH | M = k√(L_{1}L_{2}) = 0.50 × √(40 × 90) = 0.50 × 60 = 30 mH.
M3@1,3: A coil is placed beside a second coil carrying a steady 2 A current. When is an emf induced in the first coil? | Only while the current in the second coil is changing | Continuously, because 2 A is flowing | Only if the first coil is a superconductor | Only when the coils touch | Mutual induction needs dI_{1}/dt ≠ 0; a steady current gives a steady flux and no emf.
SA2@1,3: Explain the difference between self-induction and mutual induction, giving one useful application and one problem caused by each. | Self-induction is an emf induced in a circuit by the change of its own current (ε = −L dI/dt); it is used in chokes that smooth current and in ignition coils, but causes damaging voltage spikes when inductive loads are switched off. Mutual induction is an emf induced in one circuit by a changing current in another (ε_{2} = −M dI_{1}/dt); it is used in transformers and wireless chargers, but causes crosstalk and hum pick-up between nearby circuits. | Self: own changing current, ε = −L dI/dt ; Mutual: neighbouring circuit's changing current, ε = −M dI/dt ; Useful example of each ; Problem caused by each

## Energy stored in magnetic fields
S: Building up a current in an inductor stores energy in its magnetic field. Every magnetic field holds energy, with density proportional to B squared, and releasing it suddenly can be violent.
O: Derive and use U = ½LI^{2}
O: Calculate magnetic energy density u = B^{2}/(2μ_{0}) and magnetic pressure
O: Explain the hazards and uses of large stored magnetic energies
PRE: Inductance
LV: Year 1 · Application
H: Formulas
E: U = ½LI^{2} :: from the work ∫LI dI done against the back emf
E: u = B^{2}/(2μ_{0}) :: energy density (vacuum)
E: u = B^{2}/(2μ) :: linear material
- A 1 T field stores about 400 kJ m^{-3}.
H: Examples
- MRI magnets store several MJ; a "quench" (loss of superconductivity) dumps it as heat, boiling off liquid helium.
- The LHC's magnets store about 10 GJ in total; in 2008 a faulty joint released energy that damaged dozens of magnets.
- Superconducting magnetic energy storage (SMES) for grid stability.
- Solar flares release magnetic energy stored in twisted coronal fields (up to ~10^{25} J).
H: Magnetic pressure
E: p_{B} = B^{2}/(2μ_{0})
P: Fields exert pressure: 10 T exerts about 400 atmospheres on its coil windings, a major engineering challenge for high-field magnets. Magnetic pressure confines fusion plasmas and shapes stellar atmospheres.
X: About how much energy is stored in an MRI magnet with 3 T over roughly 1 m^{3}?
> u = B^{2}/(2μ_{0}) = 9/(2 × 4π × 10^{-7}) = 3.6 × 10^{6} J m^{-3}
> About 3.6 MJ
K: Magnetic energy lives in the field, at B^{2}/(2μ_{0}) per cubic metre; for an inductor this totals ½LI^{2}.
!: Interrupting current in a large inductor releases all its stored energy quickly; protection circuits are essential.
T: Magnetic energy density | The energy stored per unit volume in a magnetic field, u = B^{2}/(2μ_{0}) in vacuum
T: Quench | The sudden loss of superconductivity in a magnet, converting its stored magnetic energy into heat
SUM: An inductor stores U = ½LI^{2}.
SUM: Field energy density is B^{2}/(2μ_{0}), which is also the magnetic pressure.
SUM: Big magnets store megajoules to gigajoules, so quench protection matters.
EV: established | A magnetic field stores energy with density B^{2}/(2μ_{0}) in vacuum
SRC: OpenStax, University Physics Volume 2, section 14.3 "Energy in a Magnetic Field" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-3-energy-in-a-magnetic-field
SRC: OpenStax, College Physics 2e, section 23.9 "Inductance" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/23-9-inductance
Q: What is the energy density of a magnetic field? | u = B^{2}/(2μ_{0}).
Q: What is a magnet quench? | A sudden loss of superconductivity that converts stored magnetic energy to heat.
M1@2: Doubling B multiplies the field's energy density by: | 4 | 2 | 8 | √2 | u = B^{2}/(2μ_{0}) is proportional to B^{2}, so doubling B quadruples u.
M2@1: Energy in a 0.2 H inductor at 5 A: | 2.5 J | 1 J | 5 J | 0.5 J | U = ½LI^{2} = ½ × 0.2 H × (5 A)^{2} = 2.5 J stored in the field.
NUM2@2: What is the magnetic pressure of a 5.0 T field, in MPa? | 9.9 | 2% | MPa | p = B^{2}/(2μ_{0}) = 25/(2 × 4π × 10^{-7}) = 9.9 × 10^{6} Pa ≈ 9.9 MPa, about 100 atmospheres.
M3@1,2: The current in an inductor is increased from 2 A to 4 A. How much extra energy is stored, compared with the energy at 2 A? | Three times as much again | The same amount again | Twice as much again | Half as much again | U ∝ I^{2}: going from 4 to 16 units adds 12, three times the original 4.
SA3@1: Derive U = ½LI^{2} for the energy stored in an inductor as its current rises from 0 to I. | While the current is rising, the inductor's back emf is L dI/dt, so the source must supply power P = (L dI/dt) × i to push current i against it. The work done in a time dt is dW = L i di. Integrating from 0 to I gives W = ∫L i di = ½LI^{2}. This energy is not dissipated: it is stored in the magnetic field and returned when the current falls. | Back emf L di/dt opposes the rising current ; Power supplied equals L i di/dt ; Work element dW = L i di ; Integrate from 0 to I to get ½LI^{2} ; Energy stored in the field, recoverable

## Magnetic materials
S: Materials respond to magnetic fields because their atoms carry magnetic moments from electron orbits and spins. Depending on how those moments interact, a material is diamagnetic, paramagnetic, ferromagnetic, antiferromagnetic or ferrimagnetic.
O: Define magnetisation, susceptibility and relative permeability
O: Classify materials by their magnetic behaviour and give examples
O: Match soft and hard magnetic materials to their uses
PRE: Magnetic dipoles
LV: Year 2 · Foundation
H: Describing magnetisation
E: M = magnetic moment per unit volume (A m^{-1})
E: B = μ_{0}(H + M); M = χH; μ_{r} = 1 + χ
- χ is the magnetic susceptibility: negative for diamagnets, small and positive for paramagnets, large for ferromagnets.
H: The classes
- **Diamagnetic** (χ ~ −10^{-5}): present in all materials; weakly repelled (water, copper, bismuth, carbon).
- **Paramagnetic** (χ ~ +10^{-5}–10^{-3}): unpaired spins align weakly (aluminium, oxygen).
- **Ferromagnetic** (χ up to ~10^{5}): spins align spontaneously in domains (iron, nickel, cobalt, gadolinium).
- **Antiferromagnetic**: neighbouring spins antiparallel (MnO, chromium).
- **Ferrimagnetic**: unequal antiparallel moments (magnetite, ferrites).
H: Uses
- Soft magnets (transformer cores): easy to magnetise and demagnetise.
- Hard magnets (NdFeB, SmCo): permanent magnets for motors, wind turbines, headphones.
- Magnetic storage: hard drives use tiny magnetised regions.
X: Liquid oxygen is drawn between the poles of a strong magnet; liquid nitrogen isn't. Why?
> O_{2} has two unpaired electrons: paramagnetic
> N_{2} has all electrons paired: diamagnetic
K: The sign and size of χ classify a material: negative and tiny (dia), positive and small (para), or huge with spontaneous order (ferro).
!: Every material is diamagnetic; paramagnetism or ferromagnetism only dominate when unpaired spins are present.
T: Magnetisation (M) | The magnetic moment per unit volume of a material, in A m^{-1}
T: Magnetic susceptibility (χ) | χ = M/H, how strongly a material magnetises in an applied field
SUM: M = χH and μ_{r} = 1 + χ describe a linear material's response.
SUM: Diamagnets are repelled, paramagnets weakly attracted, ferromagnets strongly attracted and can stay magnetised.
SUM: Antiferro- and ferrimagnets have antiparallel ordering; ferrites are ferrimagnetic.
EV: established | Magnetic behaviour of materials arises from the orbital and spin moments of their electrons
SRC: OpenStax, University Physics Volume 2, section 12.7 "Magnetism in Matter" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-7-magnetism-in-matter
SRC: OpenStax, College Physics 2e, section 22.2 "Ferromagnets and Electromagnets" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/22-2-ferromagnets-and-electromagnets
Q: What is magnetic susceptibility? | χ = M/H, how strongly a material magnetises in a field.
Q: What distinguishes ferromagnets from paramagnets? | Ferromagnets have spontaneous alignment of moments in domains due to exchange interaction.
M1@2: Which is ferrimagnetic? | Magnetite | Iron | Copper | Oxygen | Magnetite (Fe_{3}O_{4}) has two antiparallel sublattices with unequal moments; iron is ferromagnetic, copper diamagnetic, oxygen paramagnetic.
M2@2: Diamagnetic materials are: | Weakly repelled by fields | Strongly attracted to magnets | Permanently magnetised | Superconductors only | χ is small and negative, so the induced moment opposes the field and the material is weakly pushed towards weaker field.
NUM2@1: A material has susceptibility χ = 2.2 × 10^{-5}. What is its relative permeability? (Give 6 significant figures.) | 1.000022 | 0.000001 |  | μ_{r} = 1 + χ = 1.000022: paramagnets barely differ from vacuum, unlike ferromagnets with μ_{r} in the thousands.
M3@3: A motor designer needs a permanent magnet and a transformer designer needs a core. Which pairing is right? | NdFeB for the magnet; silicon steel for the core | Silicon steel for the magnet; NdFeB for the core | Copper for both | Aluminium for the magnet; bismuth for the core | Permanent magnets need high coercivity and remanence (hard, NdFeB); cores need easy, low-loss magnetisation (soft, silicon steel).
SA2@1,2: Explain the difference between diamagnetic, paramagnetic and ferromagnetic materials in terms of their atomic moments, and state the sign and typical size of χ for each. | Diamagnetism: an applied field changes electron orbits to induce a moment opposing the field; present in all materials; χ ~ −10^{-5}. Paramagnetism: atoms with unpaired electrons have permanent moments that partly align with the field against thermal disorder; χ ~ +10^{-5} to 10^{-3}. Ferromagnetism: the exchange interaction aligns neighbouring moments spontaneously in domains; an applied field aligns domains, giving very large χ (up to ~10^{5}) and possible permanent magnetisation. | Dia: induced opposing moment, all materials, χ negative ~10^{-5} ; Para: permanent moments partly aligned, χ small positive ; Thermal motion opposes paramagnetic alignment ; Ferro: exchange gives spontaneous alignment in domains ; Ferro χ very large, can retain magnetisation

## Diamagnetism
S: Diamagnetism is a weak repulsion from magnetic fields shown by all materials. An applied field changes the electrons' orbital motion so that they produce a small opposing moment, a quantum version of Lenz's law.
O: Explain the origin of diamagnetism and why it is temperature independent
O: Use the condition for diamagnetic levitation
O: Describe superconductors as perfect diamagnets
PRE: Magnetic materials
LV: Year 2 · Physical reasoning
H: Properties
- χ negative and small (~−10^{-5}); nearly independent of temperature.
- Water −9 × 10^{-6}; bismuth −1.7 × 10^{-4}; pyrolytic graphite −4 × 10^{-4} (across its planes).
- Classically there would be no diamagnetism at all in thermal equilibrium (Bohr–van Leeuwen theorem): it is a quantum effect.
H: Diamagnetic levitation
E: B dB/dz > μ_{0}ρg/|χ| :: condition to levitate against gravity
P: In a strong enough field gradient the repulsion balances gravity. For water about 1400 T^{2} m^{-1} is needed. A live frog was levitated in a 16 T magnet (Geim and Berry, Ig Nobel 2000). Diamagnetic levitation is stable, getting around Earnshaw's theorem, which forbids stable levitation with static fields only for materials with positive χ.
H: Perfect diamagnetism
- Superconductors expel magnetic fields from their interior (χ = −1): the Meissner effect.
- This gives stable levitation of magnets above superconductors.
X: Why is pyrolytic graphite used for desk-toy levitation over magnets?
> It is unusually strongly diamagnetic and has low density
> Above a checkerboard of NdFeB magnets the repulsion supports its weight
K: Diamagnetism is an induced, opposing moment from changes in electron orbits; it is weak, negative and present in everything.
!: Diamagnetism is present in all materials but is usually masked by stronger paramagnetic or ferromagnetic effects.
T: Diamagnetism | A weak magnetic response, with negative susceptibility, produced by field-induced changes in electron orbital motion
T: Meissner effect | The expulsion of magnetic field from a superconductor's interior, making it a perfect diamagnet (χ = −1)
SUM: All materials are diamagnetic, with χ ~ −10^{-5}, independent of temperature.
SUM: In strong field gradients diamagnets levitate stably: water needs about 1400 T^{2} m^{-1}.
SUM: Superconductors are perfect diamagnets.
EV: established | Diamagnetism is a quantum effect present in all matter
SRC: OpenStax, University Physics Volume 2, section 12.7 "Magnetism in Matter" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-7-magnetism-in-matter
SRC: Kittel C., Introduction to Solid State Physics, 8th edn, Wiley | secondary | 2005
Q: Why are all materials diamagnetic? | Applied fields alter all electron orbits to produce opposing moments.
Q: What is the Meissner effect? | A superconductor's expulsion of magnetic field: perfect diamagnetism.
M1@1: Diamagnetic susceptibility depends on temperature: | Hardly at all | Strongly, as 1/T | Only above T_{c} | Exponentially | Diamagnetism comes from induced orbital currents, not from thermal alignment of permanent moments, so it barely changes with T.
M2@2: A frog was levitated using: | Diamagnetism in a strong field gradient | A superconductor under the frog | Electrostatic repulsion | Upward air jets | The frog is mostly water, which is diamagnetic; a 16 T magnet's gradient pushed it up with a force balancing its weight.
NUM3@2: Estimate the value of B dB/dz (in T^{2} m^{-1}) needed to levitate water, given χ = −9.0 × 10^{-6} and ρ = 1000 kg m^{-3}. | 1370 | 5% | T^{2} m^{-1} | B dB/dz = μ_{0}ρg/|χ| = 4π × 10^{-7} × 1000 × 9.81/(9.0 × 10^{-6}) ≈ 1370 T^{2} m^{-1}.
M3@3: A superconductor differs from a strong ordinary diamagnet such as bismuth because: | It expels the field completely, with χ = −1 | It attracts magnets strongly | Its susceptibility is positive | It is diamagnetic only at room temperature | Bismuth's χ is about −1.7 × 10^{-4}; a superconductor in the Meissner state has χ = −1, excluding the field from its bulk.
SA3@1,2: Explain why water, which is not magnetic in everyday life, can be levitated in a strong magnet, and why the levitation is stable. | Water is diamagnetic: the field induces opposing moments in its molecules, so it has an energy U = −χVB^{2}/(2μ_{0}) that rises with field strength (χ < 0) and is pushed towards weaker field with force proportional to B dB/dz. The effect is tiny (χ ~ −10^{-5}), so it is unnoticeable in everyday fields, but in a magnet giving B dB/dz ≈ 1400 T^{2} m^{-1} the upward force balances gravity. Because a diamagnet seeks a field minimum, which can exist in free space, the equilibrium is stable; Earnshaw's theorem only rules out stable levitation for positive-χ objects. | Water diamagnetic, induced opposing moment ; Pushed towards weaker field with force ∝ B dB/dz ; χ tiny, so needs very strong gradient (~1400 T^{2} m^{-1}) ; Balances weight ; Stable because diamagnets seek a field minimum (Earnshaw does not forbid it)

## Paramagnetism
S: Paramagnetic materials have atoms with unpaired electrons whose moments align partly with an applied field, giving weak attraction. Thermal motion fights the alignment, so paramagnetism weakens as temperature rises.
O: Explain paramagnetism as competition between alignment energy and thermal energy
O: Use Curie's law χ = C/T
O: Describe uses of paramagnets, including adiabatic demagnetisation
PRE: Magnetic materials
LV: Year 2 · Application
H: Curie's law
E: χ = C/T
E: M = nμ tanh(μB/k_{B}T) :: two-level (spin-½) moments
- Weak field or high T (μB ≪ k_{B}T): M ≈ nμ^{2}B/(k_{B}T), Curie's law.
- Strong field or low T: saturates at nμ (all aligned).
H: Pauli paramagnetism
P: Conduction electrons in metals give a small, temperature-independent paramagnetism: only electrons near the Fermi level can flip their spins, a direct consequence of Fermi–Dirac statistics.
H: Uses
- Adiabatic demagnetisation: magnetise a paramagnetic salt in a field at low T, isolate it thermally, then reduce the field; as the spins disorder they take entropy from the lattice, cooling it to millikelvin temperatures.
- MRI contrast agents (gadolinium compounds) are strongly paramagnetic.
- Electron paramagnetic resonance (EPR) studies radicals and defects.
X: A paramagnet's susceptibility is 2 × 10^{-4} at 300 K. What is it at 30 K?
> Curie's law: χ ∝ 1/T, and T has fallen by a factor of 10
> χ = 2 × 10^{-3}
K: Paramagnetic alignment is a contest between μB and k_{B}T, so χ grows as the temperature falls (χ = C/T).
!: Paramagnets don't retain magnetisation when the field is removed (unlike ferromagnets).
T: Paramagnetism | Weak attraction to a magnetic field caused by partial alignment of permanent atomic moments
T: Curie's law | For a paramagnet in weak fields, susceptibility is inversely proportional to absolute temperature, χ = C/T
SUM: Paramagnets have unpaired spins that partly align with B.
SUM: χ = C/T in weak fields; at low T and high B the magnetisation saturates.
SUM: Conduction electrons give small temperature-independent Pauli paramagnetism.
EV: established | Paramagnetic susceptibility of dilute moments varies as 1/T (Curie's law)
SRC: OpenStax, University Physics Volume 2, section 12.7 "Magnetism in Matter" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-7-magnetism-in-matter
SRC: Kittel C., Introduction to Solid State Physics, 8th edn, Wiley | secondary | 2005
Q: State Curie's law. | Paramagnetic susceptibility is inversely proportional to temperature: χ = C/T.
Q: How does adiabatic demagnetisation cool a sample? | Reducing the field at constant entropy lets spins disorder, absorbing energy from the lattice.
M1@1: Paramagnetism arises from: | Unpaired electron spins | Paired electrons | Superconductivity | Nuclear forces only | Atoms with unpaired electrons carry permanent moments that a field can partly align.
M2@3: Gadolinium contrast agents work in MRI because they are: | Strongly paramagnetic | Diamagnetic | Radioactive | Superconducting | Gd^{3+} has seven unpaired electrons; its large moment shortens the relaxation times of nearby water protons, changing image contrast.
NUM2@2: A paramagnetic salt has χ = 5.0 × 10^{-4} at 4.0 K. Using Curie's law, what is χ at 1.0 K, in units of 10^{-3}? | 2.0 | 2% | × 10^{-3} | χ ∝ 1/T, so cooling from 4.0 K to 1.0 K multiplies χ by 4: 2.0 × 10^{-3}.
M3@1,2: At 1 K a strong field is applied to a paramagnet so that μB ≫ k_{B}T. Doubling B now: | Barely changes M, which is near saturation | Doubles M, as Curie's law predicts | Halves M | Makes χ negative | Curie's law only holds for μB ≪ k_{B}T; when nearly all moments are aligned M is close to nμ and cannot grow much more.
SA3@1,3: Explain how adiabatic demagnetisation of a paramagnetic salt reaches temperatures below 1 K. | Start with the salt in thermal contact with a liquid-helium bath at about 1 K. Apply a strong field: the moments align, reducing the spin entropy, and the heat released flows to the bath. Then isolate the salt thermally and slowly reduce the field. With no heat exchange the total entropy stays constant; as the field falls, spin disorder would rise, so entropy flows from the lattice vibrations into the spin system, and the lattice temperature drops, reaching millikelvin values. | Magnetise isothermally in contact with a bath ; Alignment lowers spin entropy; heat removed ; Isolate thermally ; Reduce field adiabatically at constant entropy ; Spins disorder by taking entropy from the lattice, which cools

## Ferromagnetism
S: In ferromagnets, a quantum-mechanical exchange interaction makes neighbouring spins align, producing strong spontaneous magnetisation in regions called domains. Above the Curie temperature, thermal motion destroys the order and the material becomes paramagnetic.
O: Explain the exchange interaction as the origin of ferromagnetism
O: Describe magnetic domains and how an applied field magnetises a ferromagnet
O: Use the Curie temperature and the Curie–Weiss law
PRE: Paramagnetism
LV: Year 2 · Physical reasoning
H: Origin
- Exchange interaction: a consequence of the Pauli principle and Coulomb repulsion, far stronger than the magnetic dipole forces between spins.
- Iron, cobalt, nickel, gadolinium and many alloys (NdFeB, permalloy).
H: Curie temperature
E: χ = C/(T − T_{C}) :: Curie–Weiss law above T_{C}
- Iron 1043 K; nickel 627 K; cobalt 1388 K; gadolinium 293 K; NdFeB ~585 K.
H: Domains
P: A ferromagnet splits into domains, each magnetised in one direction, to reduce its stray-field energy. An unmagnetised iron bar has domains pointing every way, so their moments cancel. An applied field grows favourably aligned domains (by moving domain walls) and rotates others, magnetising the bar.
X: Why does heating a permanent magnet above its Curie temperature ruin it?
> Thermal energy destroys the aligned spin order
> On cooling without a field, domains form with random orientations: no net magnetisation
K: Exchange aligns spins within each domain; magnetising a ferromagnet means lining up its domains, not creating new moments.
!: A ferromagnet's strength comes from the exchange interaction, not from magnetic attraction between atoms, which is about a thousand times too weak.
T: Exchange interaction | A quantum effect of the Pauli principle and electron repulsion that makes neighbouring spins prefer to be parallel (in ferromagnets)
T: Curie temperature | The temperature above which a ferromagnet loses its spontaneous magnetisation and becomes paramagnetic
SUM: Exchange gives spontaneous parallel alignment of spins.
SUM: Domains form to reduce stray-field energy; applied fields move walls and rotate domains.
SUM: Above T_{C} the order is lost and χ = C/(T − T_{C}).
EV: established | Ferromagnetism arises from the exchange interaction between electron spins
SRC: OpenStax, University Physics Volume 2, section 12.7 "Magnetism in Matter" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-7-magnetism-in-matter
SRC: OpenStax, College Physics 2e, section 22.2 "Ferromagnets and Electromagnets" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/22-2-ferromagnets-and-electromagnets
Q: What causes ferromagnetism? | The quantum exchange interaction aligning neighbouring electron spins.
Q: What happens above the Curie temperature? | Spontaneous magnetisation vanishes; the material becomes paramagnetic.
M1@2: Domains form in ferromagnets to: | Reduce magnetostatic (stray field) energy | Increase the total energy | Conduct electricity better | Absorb heat | Splitting into oppositely magnetised domains, with closure domains, reduces the external field and its stored energy.
M2@3: Iron's Curie temperature is about: | 1043 K | 300 K | 77 K | 2000 K | Iron loses ferromagnetism at about 1043 K (770 °C); gadolinium's Curie point is near room temperature.
TF1@3: Gadolinium is ferromagnetic on a cold day but not on a hot summer day. | true | Its Curie temperature is about 293 K (20 °C), so it is ferromagnetic just below and paramagnetic just above room temperature.
M3@1: Why can't magnetic dipole–dipole forces between atoms explain ferromagnetism in iron? | They correspond to temperatures of about 1 K, far below iron's Curie temperature | They are repulsive between all neighbours | Iron atoms have no magnetic moment | They would make iron diamagnetic | Dipole interaction energies are ~10^{-4} eV (about 1 K); keeping order up to 1043 K needs ~0.1 eV, which exchange provides.
SA2@2: Describe what happens to the domains in an unmagnetised iron bar as an increasing magnetic field is applied, up to saturation. | Initially the domains point in many directions and their moments cancel. A small field makes domain walls move so that domains aligned near the field grow at the expense of others; at first this is reversible. Larger fields cause irreversible wall jumps as walls break free of defects. At high fields the remaining domains rotate their magnetisation towards the field direction. At saturation the whole bar is effectively one domain aligned with the field and M cannot increase further. | Random domains give no net magnetisation ; Wall motion grows aligned domains ; Irreversible jumps at defects ; Rotation of magnetisation at high fields ; Saturation: all aligned

## Hysteresis
S: Hysteresis is the lagging of a ferromagnet's magnetisation behind the applied field. Its loop shows how hard a material is to magnetise and demagnetise, and the loop's area is the energy lost each cycle.
O: Identify saturation, remanence and coercivity on a hysteresis loop
O: Calculate hysteresis power loss from the loop area
O: Choose soft or hard magnetic materials for a given use
PRE: Ferromagnetism
LV: Year 1 · Application
H: The loop
- Saturation: all domains aligned.
- **Remanence** B_{r}: flux density left when H returns to zero.
- **Coercivity** H_{c}: reverse field needed to remove it.
- Loop area = energy dissipated per unit volume per cycle.
H: Soft vs hard
- **Soft** (silicon steel, permalloy, ferrites): narrow loop, low coercivity, low losses. Transformer and motor cores.
- **Hard** (NdFeB, SmCo, alnico, ferrite magnets): wide loop, high coercivity and remanence. Permanent magnets.
- **Recording media**: moderate coercivity so bits can be written but stay put.
H: Energy product
P: The figure of merit for permanent magnets is (BH)_{max}: NdFeB reaches ~400 kJ m^{-3}, about ten times older ferrite magnets, enabling small powerful motors in electric cars, drones and wind turbines.
X: A transformer core loses 50 J m^{-3} per cycle at 50 Hz; core volume 0.002 m^{3}. What is the hysteresis power loss?
> P = (loss per volume per cycle) × volume × frequency
> P = 50 × 0.002 × 50 = 5 W
K: The loop's width measures coercivity and its area the energy lost per cycle: narrow for cores, wide for permanent magnets.
!: A wide hysteresis loop is good for permanent magnets but bad for transformer cores.
T: Remanence | The magnetisation (or flux density) that remains in a ferromagnet when the applied field is reduced to zero
T: Coercivity | The reverse field needed to reduce a ferromagnet's magnetisation to zero
SUM: Magnetisation lags behind H, tracing a loop.
SUM: Loop area is energy per unit volume per cycle; power loss = area × volume × frequency.
SUM: Soft magnets for cores, hard magnets for permanent magnets.
EV: established | The area of a hysteresis loop equals the energy dissipated per unit volume per cycle
SRC: OpenStax, University Physics Volume 2, section 12.7 "Magnetism in Matter" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-7-magnetism-in-matter
SRC: Kittel C., Introduction to Solid State Physics, 8th edn, Wiley | secondary | 2005
Q: What is coercivity? | The reverse field needed to reduce a ferromagnet's magnetisation to zero.
Q: What does the area of a hysteresis loop represent? | Energy dissipated per unit volume per cycle.
M1@3: Transformer cores should have: | Narrow hysteresis loops | Wide hysteresis loops | High coercivity | High remanence | A narrow loop means little energy lost per cycle, which matters at 50 Hz; the other options describe hard magnets.
M2@3: The best commercial permanent magnets are made of: | NdFeB | Copper | Soft iron | Aluminium | Neodymium–iron–boron has the highest energy product (BH)_{max}, about 400 kJ m^{-3}.
NUM2@2: A ferrite core of volume 5.0 × 10^{-5} m^{3} has a loop area of 120 J m^{-3} and runs at 20 kHz. What is the hysteresis loss, in W? | 120 | 2% | W | P = 120 × 5.0 × 10^{-5} × 20 000 = 120 W: at high frequency even a narrow loop is costly, so ferrites with very small loops are used.
M3@1: On a B–H loop, the point where the curve crosses the H axis (B = 0) gives: | The coercivity | The remanence | The saturation flux density | The permeability of free space | B = 0 is reached only after a reverse field H_{c} is applied: that intercept is the coercivity; the B-axis intercept is the remanence.
SA2@1,3: Sketch in words the hysteresis loops of a material for a transformer core and one for a permanent magnet, and explain why each suits its use. | A core material (soft, e.g. silicon steel) has a tall, narrow loop: high saturation, low coercivity and small area. It magnetises easily and reverses every cycle with little energy lost, so the transformer runs cool and efficiently. A permanent-magnet material (hard, e.g. NdFeB) has a wide, square loop: high remanence and high coercivity, with large area. It stays strongly magnetised and resists demagnetising fields, but would waste a great deal of energy if cycled. | Soft: narrow loop, low coercivity, small area ; Small area means low loss per cycle for AC cores ; Hard: wide loop, high remanence and coercivity ; High remanence and coercivity keep a permanent magnet magnetised ; Large area unsuitable for cycling

## Electromagnets
S: An electromagnet is a coil of wire, usually around an iron core, that becomes magnetic when current flows. Its strength can be controlled and switched, which makes electromagnets essential in motors, relays, cranes and MRI scanners.
O: Estimate the field of an iron-cored electromagnet and explain saturation
O: Explain how relays and other devices use electromagnets
O: Explain why the highest fields need superconducting coils
PRE: Ferromagnetism
LV: GCSE and A level · Foundation
H: Field
E: B ≈ μ_{0}μ_{r}nI :: long solenoid with core (until saturation)
- Iron multiplies the field by μ_{r} (~thousands) up to saturation (~2 T).
- Beyond ~2 T, superconducting coils without iron are used.
- Strength rises with turns per metre, current and core permeability.
H: Applications
- Relays and contactors: a small current switches a large one.
- Scrapyard lifting magnets, maglev trains, electric bells, door locks.
- Loudspeakers and solenoid valves.
- Particle accelerators (dipole bending, quadrupole focusing).
- MRI: superconducting magnets at 1.5–7 T (some research systems ~11.7 T).
H: Superconducting magnets
P: Niobium–titanium wire at 4.2 K carries huge currents with no resistance; once energised, the magnet can run in persistent mode for years. Newer high-temperature superconducting tapes (REBCO) reach more than 20 T, enabling compact fusion devices.
X: A 1000-turn, 0.1 m solenoid with an iron core (μ_{r} = 500) carries 0.2 A. Estimate B (below saturation).
> n = 1000/0.1 = 10^{4} m^{-1}
> B = μ_{0}μ_{r}nI = 4π × 10^{-7} × 500 × 10^{4} × 0.2 = 1.26 T
K: An iron core multiplies a coil's field by μ_{r}, but only up to about 2 T, where the iron saturates.
!: Iron saturates around 2 T; adding more current then barely increases the field.
T: Electromagnet | A coil, usually with a soft-iron core, that is magnetised only while a current flows in it
T: Saturation | The state in which all a ferromagnet's domains are aligned, so its magnetisation cannot increase further
SUM: B ≈ μ_{0}μ_{r}nI until the core saturates near 2 T.
SUM: Electromagnets can be switched and controlled: relays, cranes, valves, accelerators.
SUM: Fields above ~2 T use superconducting coils without iron.
EV: established | A soft-iron core multiplies a coil's field by its relative permeability until it saturates
SRC: OpenStax, College Physics 2e, section 22.2 "Ferromagnets and Electromagnets" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/22-2-ferromagnets-and-electromagnets
SRC: OpenStax, University Physics Volume 2, section 12.6 "Solenoids and Toroids" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-6-solenoids-and-toroids
Q: Why do electromagnets usually have iron cores? | Iron's high permeability multiplies the field.
Q: Why do MRI scanners use superconducting magnets? | Iron saturates near 2 T, and resistive coils would need enormous power; superconductors carry large currents without loss.
M1@1: An electromagnet's field can be increased by: | More turns or current, or an iron core | Replacing the core with plastic | Using a shorter wire only | Reversing the current | B ≈ μ_{0}μ_{r}nI rises with turns per metre, current and core permeability.
M2@2: A relay uses an electromagnet to: | Switch a large current with a small one | Measure the voltage of a supply | Store energy for later use | Generate AC from DC | A small control current magnetises a core that pulls a contact closed in a separate, high-current circuit.
NUM1@1: An air-cored solenoid with 5000 turns per metre carries 2.0 A. What is the field inside, in mT? | 12.6 | 2% | mT | B = μ_{0}nI = 4π × 10^{-7} × 5000 × 2.0 = 1.26 × 10^{-2} T = 12.6 mT; an iron core could raise this to about 1–2 T.
M3@1,3: An iron-cored electromagnet gives 1.8 T. The current is doubled. The field becomes about: | A little over 1.8 T, as the iron saturates | 3.6 T | 7.2 T | 0.9 T | Near 2 T the iron is almost saturated, so μ_{r} falls and extra current adds only the small air-core contribution μ_{0}nΔI.
SA2@2: Explain how an electromagnetic relay lets a small current switch on a large one, and give one advantage of doing so. | The control circuit sends a small current through a coil wound on a soft-iron core. The core becomes magnetised and attracts a hinged iron armature, which closes (or opens) a pair of contacts in a separate circuit carrying the large current. When the control current stops, the soft iron loses its magnetism and a spring returns the armature. The low-current, low-voltage control circuit is isolated from the high-current one, so it can be operated safely or by delicate electronics. | Small current in coil magnetises soft-iron core ; Core attracts armature ; Armature closes contacts in second circuit ; Soft iron demagnetises when current stops; spring returns ; Advantage: safety or isolation of control circuit

## Solenoids and toroids
S: A solenoid is a long helical coil; a toroid is a coil wound around a ring. Both produce well-defined, nearly uniform fields inside and little outside, making them standard sources of magnetic field and standard inductors.
O: Calculate the fields inside a solenoid and a toroid
O: Calculate the inductance of a solenoid
O: Explain why a toroid confines its field and where solenoids depart from the ideal
PRE: Ampère's law
LV: Year 1 · Application
H: Fields
E: B = μ_{0}nI :: inside a long solenoid (n = turns per metre)
E: B = μ_{0}NI/(2πr) :: inside a toroid at radius r
- Solenoid field outside ≈ 0 (for long solenoids); at each end about half the centre value.
- Toroid field is entirely confined inside: no leakage, low interference.
H: Inductance
E: L = μ_{0}N^{2}A/l :: solenoid
E: L = μ_{0}N^{2}h ln(b/a)/(2π) :: toroid of rectangular cross-section (inner radius a, outer b, height h)
H: Uses
- Solenoid actuators (valves, door locks, starter motors).
- Toroidal transformers and inductors: compact, low stray field.
- Tokamaks: toroidal field coils confine plasma (ITER's coils reach a peak of about 11.8 T).
X: A toroid has 600 turns, mean radius 0.1 m and current 2 A. What is the field at the mean radius?
> B = μ_{0}NI/(2πr) = 4π × 10^{-7} × 600 × 2/(2π × 0.1)
> B = 2.4 mT
K: A long solenoid gives uniform B = μ_{0}nI inside; a toroid gives μ_{0}NI/(2πr), falling across the ring, with no field outside.
!: The ideal-solenoid formula assumes length ≫ radius; short coils have weaker, less uniform fields.
T: Solenoid | A long helical coil that produces a nearly uniform magnetic field inside it
T: Toroid | A coil wound round a ring, whose field is confined within the ring
SUM: Solenoid: B = μ_{0}nI and L = μ_{0}N^{2}A/l.
SUM: Toroid: B = μ_{0}NI/(2πr) inside and zero outside.
SUM: Real short solenoids leak field and are weaker at the ends.
EV: established | The field inside a long solenoid is μ_{0}nI and outside it is negligible
SRC: OpenStax, University Physics Volume 2, section 12.6 "Solenoids and Toroids" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/12-6-solenoids-and-toroids
SRC: OpenStax, University Physics Volume 2, section 14.2 "Self-Inductance and Inductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/14-2-self-inductance-and-inductors
Q: What is the field inside a long solenoid? | B = μ_{0}nI.
Q: Why do toroids have little stray field? | The field is confined inside the ring by its closed geometry.
M1@1: Halving the length of a solenoid but keeping the same turns: | Doubles the internal field | Halves it | Leaves it unchanged | Quadruples it | Turns per metre n = N/l doubles, so B = μ_{0}nI doubles (while the coil stays long compared with its radius).
M2@3: Tokamaks use which coil shape to confine plasma? | Toroidal | A straight solenoid | A single loop | A Helmholtz pair | The plasma is held in a doughnut-shaped vessel threaded by the closed field of toroidal coils.
NUM2@2: A solenoid 0.30 m long has 900 turns and area 2.0 × 10^{-4} m^{2}. What is its inductance, in mH? | 0.68 | 3% | mH | L = μ_{0}N^{2}A/l = 4π × 10^{-7} × 8.1 × 10^{5} × 2.0 × 10^{-4}/0.30 = 6.8 × 10^{-4} H = 0.68 mH.
M3@1,3: In a toroid with inner radius 5 cm and outer radius 10 cm, how does the field at the inner edge compare with that at the outer edge? | Twice as strong | Half as strong | The same, since the field is uniform | Four times as strong | B = μ_{0}NI/(2πr) ∝ 1/r, so at r = 5 cm it is twice the value at r = 10 cm.
SA2@1,3: Use Ampère's law to show that the field outside an ideal toroid is zero and find the field inside. | Take a circular Amperian loop of radius r coaxial with the toroid. By symmetry B is constant and tangential on the loop, so ∮B·dl = 2πrB. Inside the windings the loop encloses N turns each carrying I, so 2πrB = μ_{0}NI and B = μ_{0}NI/(2πr). For a loop outside the toroid (larger than the outer radius) each turn passes current up through the surface once and back down once, so the net enclosed current is zero and B = 0; in the central hole no current is enclosed either. | Circular loop coaxial with toroid ; Symmetry: ∮B·dl = 2πrB ; Inside: enclosed current NI gives μ_{0}NI/(2πr) ; Outside: net enclosed current zero, so B = 0 ; Hole: no current, B = 0

## Electric motors and generators
S: Motors turn electrical energy into motion using the force on currents in magnetic fields; generators do the reverse using induction. They are the same machine run in opposite directions.
O: Explain how a DC motor produces continuous rotation, including the role of the commutator
O: Use back emf to calculate the current in a motor
O: Explain how generators and induction motors work
PRE: Faraday's law
LV: A level · Application
H: DC motors
- Forces on the coil's sides (F = BIL) make a torque; a commutator reverses the coil current every half turn to keep it turning the same way.
- Back emf ε_{b} = kω grows with speed and limits the current: I = (V − ε_{b})/R. Motors draw most current when starting.
H: AC motors
- **Induction motors**: a rotating magnetic field from three-phase windings induces currents in the rotor (no brushes); the rotor turns slightly slower than the field (slip). Industry's workhorse.
- **Synchronous and brushless DC (permanent-magnet) motors**: the rotor turns exactly with the field; electric vehicles, drones, computer fans.
H: Generators
E: ε = BANω sin ωt
- Power stations: steam, gas, water or wind turns large synchronous generators at 50 or 60 Hz.
- Regenerative braking: motors become generators.
- Large machines are more than 95% efficient.
X: A DC motor (R = 2 Ω) runs on 24 V, drawing 3 A at full speed. What is its back emf, and what current does it draw when starting?
> ε_{b} = V − IR = 24 − 3 × 2 = 18 V
> At start ε_{b} = 0, so I = V/R = 24/2 = 12 A
K: A spinning motor is also a generator: its back emf rises with speed and limits the current it draws.
!: A stalled motor has no back emf, so current is maximal and windings can burn out.
T: Commutator | A split-ring switch on a DC motor's shaft that reverses the coil current every half turn
T: Back emf | The emf induced in a motor's rotating coils, opposing the supply voltage and proportional to speed
SUM: Motors use F = BIL on a coil; a commutator keeps the torque one way.
SUM: Back emf limits running current: I = (V − ε_{b})/R.
SUM: Generators produce ε = BANω sin ωt; the same machine can do both jobs.
EV: established | Electric motors and generators convert energy using the magnetic force on currents and electromagnetic induction
SRC: OpenStax, University Physics Volume 2, section 13.6 "Electric Generators and Back Emf" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/13-6-electric-generators-and-back-emf
SRC: OpenStax, College Physics 2e, section 22.8 "Torque on a Current Loop: Motors and Meters" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/22-8-torque-on-a-current-loop-motors-and-meters
SRC: AQA, A-level Physics specification (7408), section 3.7.5.4 "Electromagnetic induction" | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is back EMF in a motor? | The EMF induced in the spinning coils, opposing the supply and limiting current.
Q: How does an induction motor work? | A rotating field induces currents in the rotor, which then experience a force, following the field with slight slip.
M1@1: A commutator in a DC motor: | Reverses the coil current every half turn | Smooths the supply voltage | Increases the motor's speed | Turns the DC into AC for the supply | Reversing the current as the coil passes the vertical keeps the torque in the same rotational direction.
M2@3: Electric car regenerative braking works by: | Using the motor as a generator | Pressing friction pads on discs | Releasing the permanent magnets | Increasing air resistance | The wheels drive the motor, which generates current to recharge the battery; the induced current's opposing torque slows the car.
NUM2@2: A 12 V DC motor with coil resistance 0.80 Ω draws 2.5 A when running. What is its back emf, in V? | 10 | 2% | V | ε_{b} = V − IR = 12 − 2.5 × 0.80 = 10 V.
M3@2: A motor running unloaded is suddenly given a heavy load and slows down. What happens to its current? | It rises, because the back emf falls as it slows | It falls, because the motor is doing less work | It stays the same, set by the supply | It reverses direction | I = (V − ε_{b})/R and ε_{b} ∝ ω: slowing lowers the back emf, so more current flows, providing the extra torque.
SA2@1,3: Explain how a simple DC motor produces continuous rotation, and why it draws a large current at start-up. | Current in the coil sides lying across the magnetic field gives forces F = BIL in opposite directions on the two sides, making a torque. As the coil passes the position where its plane is perpendicular to the field, the split-ring commutator reverses the current, so the forces reverse and the torque continues in the same rotational direction. As the coil spins it cuts the field and a back emf proportional to speed is induced, opposing the supply. At start-up the speed and back emf are zero, so the current is limited only by the small coil resistance: I = V/R is large. | Forces BIL on coil sides give a torque ; Commutator reverses current each half turn ; So torque stays in one direction ; Rotating coil generates back emf ∝ speed ; At start back emf zero, so I = V/R large

## Maxwell's equations
S: Maxwell's four equations describe all classical electric and magnetic phenomena: how charges and currents create fields, how changing fields create each other, and therefore how light propagates.
O: State Maxwell's four equations and what each one means physically
O: Show that the equations predict waves travelling at c = 1/√(μ_{0}ε_{0})
O: Relate each equation to an experimental law
PRE: Faraday's law
LV: Year 2 · Application
H: The equations (vacuum, SI)
E: ∇·E = ρ/ε_{0} :: Gauss's law: charges are sources of E
E: ∇·B = 0 :: no magnetic monopoles
E: ∇ × E = −∂B/∂t :: Faraday's law: changing B makes curling E
E: ∇ × B = μ_{0}J + μ_{0}ε_{0}∂E/∂t :: Ampère–Maxwell law
- With the Lorentz force, they are the complete classical theory.
- Each has an integral form: ∮E·dA = Q/ε_{0}, ∮B·dA = 0, ∮E·dl = −dΦ_{B}/dt, ∮B·dl = μ_{0}(I + ε_{0}dΦ_{E}/dt).
H: Electromagnetic waves
E: ∇^{2}E = μ_{0}ε_{0}∂^{2}E/∂t^{2}; c = 1/√(μ_{0}ε_{0})
P: In empty space a changing E creates B, which creates E: a self-sustaining wave at 3 × 10^{8} m s^{-1}, exactly the measured speed of light. Maxwell (1865) concluded light is an electromagnetic wave; Hertz produced and detected radio waves in 1887.
H: Beyond Maxwell
- Lorentz invariant: special relativity was built to respect them.
- Quantised in quantum electrodynamics (QED), one of the most precisely tested theories in physics.
X: Compute c from μ_{0} and ε_{0}.
> c = 1/√(4π × 10^{-7} × 8.854 × 10^{-12})
> c = 2.998 × 10^{8} m s^{-1}
K: Charges source E, nothing sources B, and each field's change curls the other: together they predict light.
!: Maxwell's equations are linear in the fields; superposition of electromagnetic fields holds exactly in vacuum.
T: Maxwell's equations | The four equations giving the divergence and curl of E and B in terms of charges, currents and changing fields
T: Ampère–Maxwell law | ∇ × B = μ_{0}J + μ_{0}ε_{0}∂E/∂t: currents and changing electric fields produce circulating magnetic fields
SUM: Gauss, no monopoles, Faraday and Ampère–Maxwell are the four equations.
SUM: In vacuum they give waves with speed c = 1/√(μ_{0}ε_{0}).
SUM: With the Lorentz force they are the whole of classical electromagnetism.
EV: established | Maxwell's equations describe all classical electromagnetic phenomena and predict light as an electromagnetic wave
SRC: OpenStax, University Physics Volume 2, section 16.1 "Maxwell’s Equations and Electromagnetic Waves" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves
SRC: OpenStax, College Physics 2e, section 24.1 "Maxwell’s Equations: Electromagnetic Waves Predicted and Observed" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/24-1-maxwells-equations-electromagnetic-waves-predicted-and-observed
Q: Which Maxwell equation says there are no magnetic monopoles? | ∇·B = 0.
Q: What did Maxwell's equations predict about light? | It's an electromagnetic wave travelling at c = 1/√(μ_{0}ε_{0}).
M1@1: Faraday's law in Maxwell's equations is: | ∇ × E = −∂B/∂t | ∇·E = ρ/ε_{0} | ∇·B = 0 | ∇ × B = μ_{0}J | A changing magnetic field produces a curling electric field; the others are Gauss's law, no monopoles and Ampère's law.
M2@3: Who first produced and detected radio waves? | Hertz | Maxwell | Marconi | Faraday | Heinrich Hertz did so in 1887, confirming Maxwell's prediction; Marconi later developed radio communication.
NUM2@2: In a material with relative permittivity 2.25 and μ_{r} = 1, what speed do Maxwell's equations predict for light, in units of 10^{8} m s^{-1}? | 2.0 | 2% | × 10^{8} m s^{-1} | v = 1/√(μ_{0}ε_{0}ε_{r}) = c/√2.25 = 3.0 × 10^{8}/1.5 = 2.0 × 10^{8} m s^{-1}, so n = 1.5.
MATCH2@1,3: Match each Maxwell equation to the experimental law or fact behind it. | Gauss's law for E = Coulomb's inverse-square law ; Gauss's law for B = No isolated magnetic poles found ; Curl of E equation = Faraday's induction experiments ; Curl of B equation = Ampère's law plus Maxwell's displacement current | Each equation generalises an experimental law, with Maxwell's displacement-current term the one theoretical addition.
M3@2: Why could the speed of light be predicted from electrical measurements alone? | The wave speed depends only on μ_{0} and ε_{0}, found from forces between currents and charges | Light is made of moving electric charges | Hertz had already measured the speed of radio waves | Optical measurements fixed the values of μ_{0} and ε_{0} | c = 1/√(μ_{0}ε_{0}) combines constants measured with magnets and capacitors; Weber and Kohlrausch's value matched the optical speed.
SA3@1,2: Explain qualitatively how Maxwell's equations allow an electromagnetic wave to travel through empty space without charges or currents. | In empty space ρ = 0 and J = 0, but Faraday's law says a changing magnetic field produces a curling electric field, and the Ampère–Maxwell law says a changing electric field (the displacement current term) produces a curling magnetic field. So a disturbance in E generates B, which in turn regenerates E further along, and the pair propagate together, at right angles to each other and to the direction of travel. Combining the curl equations gives a wave equation with speed 1/√(μ_{0}ε_{0}) = 3.0 × 10^{8} m s^{-1}, the speed of light. | No charges or currents needed ; Changing B gives E (Faraday) ; Changing E gives B (displacement current) ; Mutual regeneration propagates; E ⊥ B ⊥ direction ; Wave equation speed 1/√(μ_{0}ε_{0}) = c

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
