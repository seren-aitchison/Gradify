// Unit 15: Electricity and Electrostatics. Format: kit/course/notes.js
export default `
## Electric charge
S: Electric charge is a basic property of matter that makes particles exert electric and magnetic forces on each other. It comes in two kinds, positive and negative: like charges repel, unlike charges attract.
O: State the unit of charge and the charges on the electron and proton
O: Explain charging by friction, contact and induction in terms of electron transfer
O: Calculate the number of electrons transferred for a given charge
PRE: SI base and derived units
LV: GCSE and A level · Foundation
H: Facts about charge
- Unit: coulomb (C). The electron carries −e, the proton +e, where e = 1.602 × 10^{-19} C.
- Ordinary matter is neutral: electrons balance protons. An object is charged when it has gained or lost electrons.
- Charging by **friction** (triboelectric: electrons move from one surface to the other), **contact** (charge shared with a conductor) or **induction** (a nearby charge separates charges in a conductor; earthing removes one kind).
- Quarks carry fractional charges (±⅓e, ±⅔e) but are always confined in whole-charge combinations.
E: Q = ±Ne :: N electrons gained or lost
H: Electrostatics in daily life
- Static shocks, lightning, dust on screens, clinging clothes.
- Photocopiers and laser printers use charged drums to hold toner; electrostatic precipitators remove smoke particles; spray painting uses charged droplets.
X: A balloon gains −5 nC by rubbing. How many extra electrons?
> N = Q/e = 5 × 10^{-9}/1.6 × 10^{-19} = 3.1 × 10^{10} electrons
> Tiny compared with the ~10^{24} electrons already in the balloon
K: Charging never creates charge: it moves electrons from one place to another, so one object's gain is the other's loss.
!: Saying protons move when an insulator is charged. Protons are fixed in nuclei; only electrons transfer.
T: Coulomb | The SI unit of charge: the charge carried by a current of 1 A in 1 s
T: Charging by induction | Charging a conductor without touching it, by separating its charges with a nearby charged object and then earthing it
SUM: Charge comes in two signs, is measured in coulombs and is carried by electrons (−e) and protons (+e).
SUM: Objects charge by gaining or losing electrons, through friction, contact or induction.
EV: established | All observed free particles carry charges that are whole-number multiples of e = 1.602 × 10^{-19} C.
SRC: OpenStax, University Physics Volume 2, section 5.1 "Electric Charge" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-charge
SRC: OpenStax, University Physics Volume 2, section 5.2 "Conductors, Insulators, and Charging by Induction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-2-conductors-insulators-and-charging-by-induction
Q: What is the charge on an electron? | −1.602 × 10^{-19} C.
Q: How does charging by induction work? | A nearby charged object pushes charges within a conductor; earthing removes one kind, leaving the conductor charged.
M1@2: A glass rod rubbed with silk becomes positive because: | Electrons moved from the rod to the silk | Protons moved to the rod | Charge was created on the rod | Neutrons moved off the rod | Only electrons transfer when insulators are rubbed; the rod lost electrons, so it is left with a net positive charge.
M2@1: Two small objects both carry negative charge. They: | Repel | Attract | Don't interact | Neutralise each other | Like charges repel and unlike charges attract, whatever the size of the charges.
M3@2: A charged rod is held near a neutral metal sphere, the sphere is earthed briefly, then the earth and the rod are removed in that order. The sphere ends up: | Charged opposite to the rod | Charged the same as the rod | Neutral | Charged only on the side nearest the rod | Earthing lets like charge escape (or opposite charge flow in), so the sphere keeps charge of the opposite sign once the earth link is broken first.
NUM2@3: How many electrons must be removed from a neutral object to give it a charge of +8.0 × 10^{-12} C? Give the answer in units of 10^{7} electrons. | 5.0 | 2% | × 10^{7} electrons | N = Q/e = 8.0 × 10^{-12}/1.6 × 10^{-19} = 5.0 × 10^{7} electrons.
SA2@2: Explain why a plastic comb rubbed on dry hair can pick up small pieces of paper, starting from what happens when the comb is rubbed. | Rubbing transfers electrons from the hair to the comb, so the comb becomes negatively charged. The comb's field polarises the neutral paper: electrons in the paper's molecules shift slightly away, leaving the near side slightly positive. The attraction to the nearer positive side is stronger than the repulsion from the further negative side, so there is a net attraction. | Electrons transferred from hair to comb ; Paper is polarised, not charged ; Near side attracted more strongly than far side repelled

## Conservation and quantisation of charge
S: Electric charge is conserved: the total in an isolated system never changes. It's also quantised: every free particle's charge is a whole-number multiple of e. Both facts are deep features of nature.
O: Apply charge conservation to reactions, decays and collisions
O: Use data to show that charge is quantised in units of e
O: Describe the principle of Millikan's oil-drop experiment
PRE: Electric charge
LV: A level · Foundation
H: Conservation
- In every reaction, decay and collision, total charge before = total charge after.
- Pair production: γ → e^{−} + e^{+} (net zero). Beta-minus decay: n → p + e^{−} + ν̄ (0 → +1 − 1 + 0).
- Local conservation: charge can't jump from place to place; it flows (continuity equation ∂ρ/∂t + ∇·J = 0).
- By Noether's theorem it follows from the gauge symmetry of electromagnetism.
H: Quantisation
E: q = mgd/V :: charge on a drop held stationary between plates d apart at p.d. V
P: In Millikan's oil-drop experiment (1909) charged oil drops were held still between charged plates, so that the electric force qV/d balanced the weight mg. The charges found were always multiples of 1.6 × 10^{-19} C. Why charge is quantised is still partly open: Dirac showed that if even one magnetic monopole exists, quantum mechanics forces all charges to be quantised, and grand unified theories also predict it.
X: A drop's measured charges: 3.2, 4.8, 8.0, 6.4 × 10^{-19} C. What's the basic unit?
> All are multiples of 1.6 × 10^{-19} C (2, 3, 5 and 4 times)
> The largest common factor of the data is the elementary charge
K: Charge is conserved in every process ever observed, and every free particle carries a whole-number multiple of e.
!: Quarks have fractional charge but are never seen free; observed charges remain integer multiples of e.
T: Conservation of charge | The total charge of an isolated system stays constant in every process
T: Quantisation of charge | The property that free charges occur only as whole-number multiples of e
SUM: Total charge is the same before and after any reaction, decay or collision.
SUM: Millikan's drops showed charge comes in multiples of e = 1.6 × 10^{-19} C.
EV: established | Charge conservation has been tested to very high precision; the deep reason for quantisation is not settled.
SRC: OpenStax, University Physics Volume 2, section 5.1 "Electric Charge" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-charge
SRC: AQA, A-level Physics specification (7408), section 3.12.1.4 Principle of Millikan's determination of the electronic charge | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What did Millikan's experiment show? | Charge comes in whole-number multiples of the elementary charge e.
Q: Is charge conserved in pair production? | Yes: the electron and positron charges sum to zero.
M1@1: In β^{+} decay, a proton becomes a neutron plus: | A positron and a neutrino | An electron | A photon only | Two neutrons | Charge must balance: +1 → 0 + (+1) + 0, so a positive particle (the positron) must be emitted with the neutrino.
M2@2: Which charge is impossible for an isolated particle? | 2.4 × 10^{-19} C | 3.2 × 10^{-19} C | 1.6 × 10^{-19} C | 0 | 2.4 × 10^{-19} C is 1.5e, not a whole-number multiple of e, so no free particle can carry it.
M3@1: A neutral pion (charge 0) decays into two particles, one of which is an electron. Ignoring photons, the other must be: | A positron | A neutron | A proton | Another electron | The products must total zero charge, so the partner of the electron (−e) must carry +e; with low mass available, that is a positron.
TF1@3: In Millikan's experiment a drop is held stationary when the electric force on it equals its weight. | true | With the drop still, qE = mg, so measuring E = V/d and the drop's weight gives its charge q = mgd/V.
SA2@2,3: A student measures drop charges of 4.9, 6.3, 9.8 and 11.4 × 10^{-19} C. Explain whether these support quantisation of charge and estimate the unit. | Each value is close to a whole-number multiple of about 1.6 × 10^{-19} C: about 3, 4, 6 and 7 times (4.8, 6.4, 9.6, 11.2). The small differences are consistent with measurement uncertainty, so the data support quantisation with a unit near 1.6 × 10^{-19} C. No value lies near a half-integer multiple. | Divides each value by about 1.6 × 10^{-19} C ; Finds near-integer multiples ; Attributes differences to experimental uncertainty

## Conductors, insulators and dielectrics
S: In conductors, charges move freely; in insulators, they're bound. Dielectrics are insulators whose bound charges shift slightly in a field (polarise), reducing the field inside and increasing a capacitor's capacitance.
O: Distinguish conductors, insulators, semiconductors and dielectrics by how their charges respond to a field
O: Explain why a charged object attracts a neutral insulator
O: Use relative permittivity and dielectric strength values
PRE: Electric charge
LV: GCSE and A level · Foundation
H: Conductors
- Metals: free electrons (~10^{28}–10^{29} m^{-3}); electrolytes: ions; plasmas: ions and electrons.
- In electrostatic equilibrium E = 0 inside; any excess charge sits on the surface.
H: Insulators and dielectrics
- Electrons tightly bound; band gaps of several eV.
- Polarisation: electronic (electron clouds shift), ionic, orientational (polar molecules like water align).
- Relative permittivity ε_{r}: vacuum 1, air 1.0006, glass ~5–10, water ~80, barium titanate > 1000.
- **Dielectric strength**: the field at which breakdown occurs (air ~3 MV m^{-1}; PTFE ~60 MV m^{-1}).
H: In between
- Semiconductors: conductivity controllable by doping, light and temperature.
- Superconductors: zero resistance below a critical temperature T_{c}.
X: Why does a charged balloon stick to a neutral wall?
> The balloon's field polarises the wall's molecules; opposite charges shift closer
> Attraction to the near charges exceeds repulsion from the farther ones
K: The difference between a conductor and an insulator is whether charges can move through the material, not whether it has charges.
!: Dielectrics don't conduct, but they still respond to fields; that response is what makes capacitors and microwave heating work.
T: Relative permittivity | The factor ε_{r} by which a material reduces the field (and increases capacitance) compared with a vacuum
T: Dielectric strength | The largest field a material withstands before it breaks down and conducts
SUM: Conductors have free charges; insulators have bound charges that can still polarise.
SUM: Polarisation explains attraction of neutral objects and the action of dielectrics.
EV: established | Polarisation of bound charges in insulators explains their relative permittivity and the attraction of neutral objects.
SRC: OpenStax, University Physics Volume 2, section 5.2 "Conductors, Insulators, and Charging by Induction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-2-conductors-insulators-and-charging-by-induction
SRC: AQA, A-level Physics specification (7408), section 3.7.4.2 Parallel plate capacitor | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is relative permittivity? | The factor by which a material reduces the electric field (and increases capacitance) compared with vacuum.
Q: What is dielectric strength? | The maximum field a material can withstand before breakdown.
M1@1: Water has high relative permittivity because: | Its polar molecules align with fields | It's a metal | It has many free electrons | It's very dense | Water molecules are permanent dipoles; orientational polarisation gives ε_{r} ≈ 80 at low frequencies.
M2@3: Air breaks down (sparks) at about: | 3 MV m^{-1} | 3 kV m^{-1} | 300 V m^{-1} | 3 GV m^{-1} | Air's dielectric strength is about 3 × 10^{6} V m^{-1}, so a 1 cm spark needs roughly 30 kV.
M3@2: A positively charged rod attracts a small neutral piece of paper. Which statement is correct? | The paper is polarised and its near side is attracted more strongly than its far side is repelled | The rod transfers positive charge to the paper | The paper must contain free electrons | Neutral objects are attracted equally by any field | The rod's field shifts bound charges; the field is stronger nearer the rod, so the attraction wins and there is a net force.
NUM2@3: Air breaks down at about 3.0 × 10^{6} V m^{-1}. Estimate the voltage needed for a spark across a 2.0 mm gap, in kV. | 6.0 | 5% | kV | V = Ed = 3.0 × 10^{6} × 2.0 × 10^{-3} = 6.0 × 10^{3} V.
SA2@1,2: Compare how charges respond to an external electric field in a metal and in an insulator such as glass. | In a metal, free electrons move through the material until the field inside is cancelled, so excess charge ends up on the surface. In glass, electrons are bound to atoms; the field only shifts them slightly relative to nuclei (and aligns any polar molecules), creating tiny dipoles. This polarisation reduces the field inside but no current flows. | Metal: free electrons move until E = 0 inside ; Insulator: bound charges only shift ; Polarisation partly reduces the field

## Coulomb's law
S: Coulomb's law gives the force between two point charges: proportional to the product of the charges and inversely proportional to the square of the distance. Electric forces are immensely stronger than gravity.
O: State and use Coulomb's law for point charges in a vacuum
O: Apply the inverse square law to changes in separation
O: Compare electric and gravitational forces between subatomic particles
PRE: Newton's law of universal gravitation
LV: A level · Application
H: The law
E: F = kq_{1}q_{2}/r^{2}, k = 1/(4πε_{0}) = 8.99 × 10^{9} N m^{2} C^{-2}
E: ε_{0} = 8.854 × 10^{-12} F m^{-1}
- Repulsive for like charges, attractive for unlike.
- Forces from several charges add as vectors (superposition).
- In a medium: F = q_{1}q_{2}/(4πε_{0}ε_{r}r^{2}); air can be treated as a vacuum.
- A uniformly charged sphere acts as a point charge at its centre (for points outside it).
H: Strength
P: The electric force between two protons is ~10^{36} times their gravitational attraction. Matter is neutral on large scales, so gravity dominates astronomy, but electric forces hold atoms, molecules and solids together and make things solid to the touch.
X: Force between the proton and electron in hydrogen (r = 5.3 × 10^{-11} m)?
> F = 8.99 × 10^{9} × (1.6 × 10^{-19})^{2}/(5.3 × 10^{-11})^{2} = 8.2 × 10^{-8} N
> Gravity: Gm_{e}m_{p}/r^{2} = 3.6 × 10^{-47} N, about 10^{39} times weaker
K: Coulomb's law has the same inverse-square form as Newton's law of gravitation, but charge comes in two signs, so electric forces can attract or repel.
!: Coulomb's law is for point charges (or spherically symmetric ones); extended shapes need integration.
P: **Investigate with the lab.** Place two charges and move them closer together, watching the force on the test charge grow.
IX: efield
T: Permittivity of free space | The constant ε_{0} = 8.85 × 10^{-12} F m^{-1} that sets the strength of electric forces in a vacuum
T: Superposition | The principle that the total force (or field) is the vector sum of those from each charge separately
SUM: F = q_{1}q_{2}/(4πε_{0}r^{2}): proportional to each charge, inversely proportional to r^{2}.
SUM: Electric forces dwarf gravity between particles but cancel in neutral bulk matter.
EV: established | The inverse-square form of Coulomb's law has been confirmed to extraordinary precision.
SRC: OpenStax, University Physics Volume 2, section 5.3 "Coulomb's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-3-coulombs-law
SRC: AQA, A-level Physics specification (7408), section 3.7.3.1 Coulomb's law | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: State Coulomb's law. | F = q_{1}q_{2}/(4πε_{0}r^{2}).
Q: How much stronger is electric than gravitational force between two protons? | About 10^{36} times.
M1@2: Two charges' separation is halved. The force: | Quadruples | Doubles | Halves | Stays the same | F ∝ 1/r^{2}, so halving r multiplies the force by 2^{2} = 4.
M2@1: Two 1 μC charges 1 m apart experience: | 9 mN | 9 N | 9 × 10^{9} N | 1 N | F = 8.99 × 10^{9} × (10^{-6})^{2}/1^{2} = 8.99 × 10^{-3} N, about 9 mN.
M2@2: The distance between two point charges is tripled. What happens to the force between them? | It falls to one ninth | It falls to one third | It triples | It increases nine times | Coulomb's law is an inverse square law, so tripling r divides the force by 3^{2} = 9.
M3@1,2: Charges +q and +4q are 0.30 m apart. Where between them does a third charge feel no force? | 0.10 m from +q | 0.15 m from +q | 0.20 m from +q | 0.06 m from +q | The forces balance where q/x^{2} = 4q/(0.30 − x)^{2}, so 0.30 − x = 2x and x = 0.10 m, nearer the smaller charge.
NUM2@3: Using k = 8.99 × 10^{9} N m^{2} C^{-2}, find the force between two protons 2.0 × 10^{-15} m apart in a nucleus, in newtons. | 58 | 3% | N | F = 8.99 × 10^{9} × (1.6 × 10^{-19})^{2}/(2.0 × 10^{-15})^{2} = 57.5 N, a huge force on such small particles.
SA3@3: Explain why gravity, not the electric force, dominates the motion of planets, even though the electric force between two protons is about 10^{36} times stronger. | Charge comes in positive and negative forms, and large bodies contain almost exactly equal amounts of each, so their electric forces cancel. Mass has only one sign, so gravitational attraction adds up with no cancellation. With huge masses and negligible net charge, gravity wins on astronomical scales. | Electric forces can attract or repel ; Bulk matter is very nearly neutral, so effects cancel ; Gravity always attracts and adds up

## Electric fields
S: An electric field is the force per unit charge that a test charge would feel at a point. It describes how charges affect the space around them, and fields carry energy and momentum in their own right.
O: Define electric field strength and calculate it for point charges and uniform fields
O: Describe the motion of a charged particle in a uniform field
O: Calculate the deflection of a particle entering a uniform field at right angles
PRE: Coulomb's law
LV: A level · Application
H: Definitions
E: E = F/q (N C^{-1} = V m^{-1})
E: E = Q/(4πε_{0}r^{2}) :: point charge (radial field)
E: E = V/d :: uniform field between parallel plates
E: E = σ/(2ε_{0}) :: infinite sheet; E = σ/ε_{0} between parallel plates
E: E = λ/(2πε_{0}r) :: infinite line charge
- Superposition: the total field is the vector sum of the fields of all the charges.
H: Motion in uniform fields
- A charged particle accelerates at a = qE/m, constant in a uniform field.
- Entering at right angles, it follows a parabola, like a projectile: constant velocity along the plates, constant acceleration across them (cathode-ray tubes, inkjet printers).
- Accelerating through potential difference V gives KE = qV.
H: Typical fields
- Near Earth's surface (fair weather): ~100 V m^{-1} downward. Air breakdown: 3 × 10^{6} V m^{-1}. At the electron in hydrogen: ~5 × 10^{11} V m^{-1}.
X: An electron enters a 2 × 10^{4} V m^{-1} field, travelling 2 × 10^{7} m s^{-1} perpendicular to it, for 5 cm. Deflection?
> t = 0.05/2 × 10^{7} = 2.5 × 10^{-9} s; a = eE/m = 3.5 × 10^{15} m s^{-2}
> y = ½at^{2} = 1.1 × 10^{-2} m = 1.1 cm
K: The field is a property of the point in space: E = F/q does not depend on the test charge used to measure it.
!: Field direction is the direction of force on a positive charge; electrons accelerate against the field.
P: **Investigate with the lab.** Move the test charge around a single charge and watch the field arrow change direction and size.
IX: efield
T: Electric field strength | The force per unit positive charge at a point, E = F/q, measured in N C^{-1} or V m^{-1}
T: Uniform field | A field with the same strength and direction everywhere, as between parallel plates away from the edges
SUM: E = F/q; for a point charge E = Q/(4πε_{0}r^{2}), between plates E = V/d.
SUM: In a uniform field a charge has constant acceleration qE/m and follows a parabola if it enters at right angles.
EV: established | The field description of electric forces is standard classical electromagnetism, confirmed by every electrostatic measurement.
SRC: OpenStax, University Physics Volume 2, section 5.4 "Electric Field" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-4-electric-field
SRC: AQA, A-level Physics specification (7408), section 3.7.3.2 Electric field strength | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define electric field strength. | Force per unit positive charge, E = F/q.
Q: What is the field between charged parallel plates? | Uniform, E = V/d = σ/ε_{0}.
M1@1: The field of a point charge falls with distance as: | 1/r^{2} | 1/r | 1/r^{3} | It is constant | E = Q/(4πε_{0}r^{2}) follows from Coulomb's law, so the field is an inverse square function of distance.
M2@2: A proton is released at rest in a uniform field. It moves: | Along the field, accelerating | Against the field | In a circle | Not at all | The force qE on a positive charge points along E and is constant, so the proton accelerates uniformly in the field direction.
M2@1: Which way does the electric field point near a positive charge? | Away from the charge | Towards the charge | Around the charge in circles | It has no direction | The field shows the force on a positive test charge, which is repelled, so it points radially outward.
M3@3: An electron crosses a uniform field at right angles. If its entry speed is doubled, its sideways deflection over the same plates becomes: | A quarter | A half | Double | Unchanged | Time in the field halves, and deflection y = ½at^{2} depends on t^{2}, so it falls to one quarter.
NUM2@1: Two parallel plates 4.0 cm apart have 600 V across them. What force acts on an electron between them, in units of 10^{-15} N? | 2.4 | 3% | × 10^{-15} N | E = V/d = 600/0.040 = 1.5 × 10^{4} V m^{-1}; F = eE = 1.6 × 10^{-19} × 1.5 × 10^{4} = 2.4 × 10^{-15} N.
SA3@2,3: An electron enters the gap between horizontal charged plates moving horizontally. Describe and explain its path while between the plates and after it leaves. | Between the plates the field is uniform, so the electron feels a constant force eE towards the positive plate and has a constant vertical acceleration, while its horizontal velocity is unchanged. Its path is therefore a parabola, like a projectile. After it leaves there is no force (ignoring gravity and fringing), so it moves in a straight line at the angle it had on exit. | Constant force towards the positive plate ; Horizontal velocity constant, vertical acceleration constant: parabola ; Straight line after leaving the field

## Electric field lines
S: Field lines map an electric field: their direction gives the field's direction, and their density gives its strength. They start on positive charges and end on negative ones, never crossing.
O: State the rules for drawing electric field lines
O: Sketch field patterns for point charges, dipoles and parallel plates
O: Relate equipotentials to field lines
PRE: Electric fields
LV: GCSE and A level · Foundation
H: Rules
- Point away from positive and towards negative charges.
- Number of lines from a charge ∝ its magnitude.
- Never cross (the field has one direction at each point).
- Meet conductor surfaces at right angles in electrostatics.
- Closer spacing means stronger field.
H: Patterns
- Isolated point charge: radial. Dipole: lines curve from + to −.
- Two like charges: lines repel; a neutral point between them where E = 0.
- Parallel plates: uniform, evenly spaced, with fringing at the edges.
H: Equipotentials
P: Equipotential surfaces are always perpendicular to field lines, so no work is done moving a charge along one. Like height contours on a map, closely spaced equipotentials show a strong field.
X: Two charges +2q and −q. How many field lines end on −q if 20 leave +2q?
> 10 end on −q; the other 10 go to infinity (the net charge is +q)
K: Field lines are a picture of E: direction from the tangent, strength from the density.
!: Field lines aren't the paths of charges in general; a charge's velocity isn't always along the line.
P: **Investigate with the lab.** Draw the field lines for two like charges and for a dipole. Compare where the lines are closest together.
IX: efield
T: Field line | A line whose tangent at each point gives the direction of the electric field there
T: Equipotential | A surface (or line) on which every point has the same electric potential
SUM: Lines run from + to −, never cross, and crowd together where the field is strong.
SUM: Equipotentials cross field lines at right angles.
EV: established | Field-line diagrams are a standard, exact representation of field direction, with line density proportional to field strength.
SRC: OpenStax, University Physics Volume 2, section 5.6 "Electric Field Lines" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-6-electric-field-lines
SRC: AQA, A-level Physics specification (7408), section 3.7.3.2 Electric field strength | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Why can't field lines cross? | The field has a unique direction at each point.
Q: How do field lines meet a conductor's surface in equilibrium? | At right angles.
M1@1: Closely spaced field lines indicate: | A strong field | A weak field | Zero field | A high potential | Line density is proportional to the field strength, so crowded lines mean a large |E|.
M2@3: Equipotentials and field lines are: | Perpendicular | Parallel | The same lines | Unrelated | E = −∇V points down the steepest potential slope, which is always at right angles to the equipotentials.
M2@1: What does the spacing of electric field lines show? | The field strength: closer lines mean a stronger field | The direction of the charge's motion | The potential at each point | Nothing about the field | Field line density indicates field strength; the direction is given by the tangent.
M3@2: Two equal positive charges sit 10 cm apart. Where is the field zero? | At the midpoint between them | Nowhere | At each charge | Far away on the line through them, at a finite distance | At the midpoint the two equal fields point in opposite directions and cancel; elsewhere on the axis one charge is nearer and wins.
TF1@1: Field lines can start on a negative charge if the charge is large enough. | false | Field lines always leave positive charges and end on negative ones (or at infinity), whatever the sizes of the charges.
SA2@2,3: Describe the field pattern between two oppositely charged parallel plates, including the edges, and the shape of the equipotentials there. | Between the plates the lines are straight, parallel and evenly spaced, running from the positive plate to the negative one, so the field is uniform. Near the edges the lines bulge outwards (fringing) and the field weakens. The equipotentials are flat planes parallel to the plates, evenly spaced in the uniform region, and curve round at the edges. | Parallel, evenly spaced lines from + to − ; Fringing at the edges ; Equipotentials parallel to the plates and perpendicular to lines

## Electric potential
S: Electric potential is the potential energy per unit charge at a point, measured relative to a reference (usually infinity, sometimes earth). It's a scalar, so potentials from many charges simply add, and the field is its downhill slope.
O: Define electric potential and calculate it for point charges
O: Add potentials from several charges as scalars
O: Relate field strength to potential gradient
PRE: Electric fields
LV: A level · Application
H: Definitions
E: V = U/q (volts, J C^{-1})
E: V = Q/(4πε_{0}r) :: point charge, zero at infinity
E: E = −dV/dr; E = −∇V
E: ΔV = −∫E·dl :: ΔV is the area under an E–r graph
H: Properties
- Scalar: add potentials algebraically, with sign.
- Uniform field: V changes linearly, V = Ed.
- Inside a conductor in equilibrium, V is constant.
- Positive charges move from high to low potential; electrons the reverse.
H: Electronvolts
E: 1 eV = 1.602 × 10^{-19} J :: energy gained by e through 1 V
- Atomic energies ~eV; nuclear ~MeV; LHC protons 6.8 TeV.
X: Potential midway between +4 nC and −2 nC charges 0.2 m apart?
> Each charge is 0.1 m away: V = k(4 × 10^{-9} − 2 × 10^{-9})/0.1
> V = 8.99 × 10^{9} × 2 × 10^{-8} = 180 V
K: Potential is a scalar and field is a vector: adding potentials needs only signs, adding fields needs directions.
!: Zero potential doesn't mean zero field (midway between equal and opposite charges, V = 0 but E ≠ 0).
P: **Investigate with the lab.** Turn on the equipotentials and check that they always cross field lines at right angles.
IX: efield
T: Electric potential | The work done per unit positive charge in bringing a charge from infinity to a point
T: Potential gradient | The rate of change of potential with distance; the field is minus the potential gradient
SUM: V = Q/(4πε_{0}r), zero at infinity, and potentials add as scalars.
SUM: E = −dV/dr: the field points down the potential slope.
EV: established | The electrostatic field is conservative, so a single-valued potential exists and E = −∇V.
SRC: OpenStax, University Physics Volume 2, section 7.2 "Electric Potential and Potential Difference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference
SRC: AQA, A-level Physics specification (7408), section 3.7.3.3 Electric potential | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How is field related to potential? | E = −∇V: the field points down the potential gradient.
Q: What is an electronvolt? | The energy an electron gains moving through 1 V: 1.6 × 10^{-19} J.
M1@1: The potential 0.3 m from a 3 nC charge is: | 90 V | 300 V | 30 V | 9 V | V = kQ/r = 8.99 × 10^{9} × 3 × 10^{-9}/0.3 = 89.9 V, about 90 V.
M2@3: Released from rest, electrons move towards: | Higher potential | Lower potential | Zero potential | The nearest equipotential | An electron's potential energy is U = −eV, which is lowest where V is highest, so it accelerates towards higher potential.
M2@3: How do equipotential lines relate to field lines? | They are always perpendicular | They are always parallel | They never meet | They are the same lines | No work is done moving along an equipotential, so it must be perpendicular to the field.
M3@2,3: Charges +q and −q are a distance d apart. At the midpoint: | V = 0 but E ≠ 0 | V = 0 and E = 0 | V ≠ 0 and E = 0 | V and E are both maximum | The equal and opposite potentials cancel, but both fields point from + towards −, so they add rather than cancel.
NUM2@3: The potential falls uniformly by 120 V over 0.040 m. What is the field strength, in V m^{-1}? | 3000 | 1% | V m^{-1} | E = −ΔV/Δx = 120/0.040 = 3000 V m^{-1}, pointing towards lower potential.
SA3@1,3: Sketch in words how V and E vary with distance r from a positive point charge, and explain how one graph can be obtained from the other. | V = kQ/r falls as 1/r and is positive everywhere, approaching zero at infinity; E = kQ/r^{2} falls faster, as 1/r^{2}. The field at any r equals minus the gradient of the V–r graph, so E is the steepness of the potential curve. Conversely the potential difference between two radii is the area under the E–r graph between them. | V ∝ 1/r, E ∝ 1/r^{2} ; E = −gradient of the V–r graph ; ΔV = area under the E–r graph

## Electric potential energy
S: Electric potential energy is the energy stored in a configuration of charges because of their positions. It's the work needed to assemble them from far apart, and it drives chemistry, batteries and nuclear stability.
O: Calculate the potential energy of a pair or system of point charges
O: Interpret the sign of electric potential energy
O: Use U = qV and energy conservation for accelerated charges
PRE: Electric potential
LV: A level · Application
H: Formulas
E: U = q_{1}q_{2}/(4πε_{0}r) :: two point charges (zero at infinity)
E: U = qV
E: U = ½Σ_{i≠j}q_{i}q_{j}/(4πε_{0}r_{ij}) :: system of charges (each pair counted once)
E: U = (3/5)Q^{2}/(4πε_{0}R) :: uniform sphere of charge
- Positive U: like charges (energy released if they fly apart). Negative U: unlike charges (a bound system).
H: Applications
- **Atomic binding**: hydrogen's ground-state energy −13.6 eV.
- **Nuclear fission**: Coulomb repulsion drives the fragments apart with about 200 MeV in total.
- **Particle accelerators**: ΔKE = qΔV.
- **Classical electron radius**: r_{e} = e^{2}/(4πε_{0}m_{e}c^{2}) = 2.8 fm, where Coulomb energy equals rest energy.
X: Energy to bring two protons from infinity to 1 fm apart?
> U = 8.99 × 10^{9} × (1.6 × 10^{-19})^{2}/10^{-15} = 2.3 × 10^{-13} J = 1.44 MeV
> This barrier is why fusion needs extreme temperatures (helped by quantum tunnelling)
K: Work done against electric forces is stored as potential energy and returned as kinetic energy when the charges are released.
!: Potential energy belongs to the system of charges, not to one charge alone.
P: **Investigate with the lab.** Move the test charge towards a like charge and watch the potential energy rise.
IX: efield
T: Electric potential energy | The energy of a system of charges due to their positions: the work done to assemble it from infinite separation
T: Electronvolt | The energy 1.6 × 10^{-19} J gained by a charge e moving through 1 V
SUM: U = q_{1}q_{2}/(4πε_{0}r): positive for like charges, negative for a bound pair.
SUM: A charge q accelerated through ΔV gains kinetic energy qΔV.
EV: established | Electric potential energy and its conversion to kinetic energy follow from the conservative Coulomb force.
SRC: OpenStax, University Physics Volume 2, section 7.1 "Electric Potential Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy
SRC: AQA, A-level Physics specification (7408), section 3.7.3.3 Electric potential | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the potential energy of two point charges? | U = q_{1}q_{2}/(4πε_{0}r).
Q: Why do fission fragments fly apart energetically? | Their mutual Coulomb repulsion converts electric potential energy into kinetic energy.
M1@3: An alpha particle (charge 2e) accelerated through 1000 V gains: | 2000 eV | 1000 eV | 500 eV | 4000 eV | The energy gained is qV = 2e × 1000 V = 2000 eV, since each unit of charge e gains 1 eV per volt.
M2@2: The potential energy of two unlike charges at finite separation is: | Negative | Positive | Zero | Infinite | q_{1}q_{2} is negative, so U < 0: energy must be supplied to pull them apart, which is what it means to be bound.
M2@2: A positive charge is pushed towards another positive charge. What happens to its potential energy? | It increases | It decreases | It stays the same | It becomes negative | Work is done against repulsion, so the electric potential energy of the pair rises.
M3@1: Three equal charges q sit at the corners of an equilateral triangle of side a. The system's potential energy is: | 3q^{2}/(4πε_{0}a) | q^{2}/(4πε_{0}a) | 6q^{2}/(4πε_{0}a) | 9q^{2}/(4πε_{0}a) | There are three distinct pairs, each at separation a, so U = 3 × q^{2}/(4πε_{0}a); counting each pair twice gives the wrong answer 6.
NUM2@3: An electron starts from rest and is accelerated through 500 V. Find its speed, in units of 10^{7} m s^{-1} (m_{e} = 9.11 × 10^{-31} kg). | 1.33 | 2% | × 10^{7} m s^{-1} | ½mv^{2} = eV gives v = √(2 × 1.6 × 10^{-19} × 500/9.11 × 10^{-31}) = 1.33 × 10^{7} m s^{-1}.
SA3@1,2: Explain why nuclear fusion of two protons requires very high temperatures, using electric potential energy. | Two protons repel, so their electric potential energy rises as they approach: at about 1 fm it is roughly 1.4 MeV. To get that close, their kinetic energy must be comparable with this barrier, which corresponds to temperatures of billions of kelvin. In stars, quantum tunnelling lets protons fuse at lower energies (about 10^{7} K in the Sun), but high temperatures are still needed. | Like charges: U rises as separation falls ; Barrier of about 1 MeV at nuclear distances ; KE (temperature) must be high; tunnelling lowers the requirement

## Voltage and potential difference
S: Voltage, or potential difference, is the energy transferred per unit charge between two points. It drives current through circuits and tells you how much energy each coulomb delivers.
O: Define potential difference and use V = W/Q
O: Describe how to measure potential difference with a voltmeter
O: Explain why danger depends on current as well as voltage
PRE: Electric potential
LV: GCSE and A level · Foundation
H: Definitions
E: V = W/Q :: 1 V = 1 J C^{-1}
E: V = Ed :: uniform field
- Measured with a voltmeter connected in parallel (ideally infinite resistance).
- Potential difference is between two points; a single point has a potential relative to a reference.
H: Typical voltages
- Nerve impulse ~0.1 V; AA cell 1.5 V; car battery 12 V; UK mains 230 V rms; transmission lines 400 kV; lightning ~100 MV.
H: Danger
P: Voltage drives current, but current through the body causes harm: I = V/R_{body}. A Van de Graaff generator at 300 kV gives a harmless spark because it stores very little charge; mains at 230 V can kill because it can deliver a sustained current.
X: A 9 V battery drives 2 C round a circuit. Energy transferred?
> W = QV = 2 × 9 = 18 J
K: One volt means one joule of energy transferred for every coulomb that passes between the two points.
!: "Voltage through" a component is wrong; voltage is across (between two points), current flows through.
P: **Investigate with the lab.** Check the uniform field between the plates and relate it to the voltage across them.
IX: efield
T: Potential difference | The work done (energy transferred) per unit charge moving between two points
T: Volt | One joule per coulomb
SUM: V = W/Q, measured across a component with a voltmeter in parallel.
SUM: High voltage is dangerous when the source can sustain a large current.
EV: established | Potential difference as energy per unit charge is the standard SI definition of the volt.
SRC: OpenStax, University Physics Volume 2, section 7.2 "Electric Potential and Potential Difference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference
SRC: AQA, A-level Physics specification (7408), section 3.5.1.1 Basics of electricity | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define potential difference. | The work done (energy transferred) per unit charge moving between two points.
Q: Why is a Van de Graaff shock usually harmless despite high voltage? | It stores little charge, so it can't sustain a dangerous current.
M1@1: How much energy does 3 C gain crossing 12 V? | 36 J | 4 J | 0.25 J | 15 J | W = QV = 3 C × 12 J C^{-1} = 36 J; dividing instead of multiplying gives the 4 J distractor.
M2@2: Voltmeters are connected: | In parallel | In series | Either way | Neither way | A voltmeter measures the difference in potential between two points, so it goes across the component, in parallel with it.
M2@1: Two plates 2 cm apart have 100 V across them. What is the field between them? | 5000 V/m | 50 V/m | 200 V/m | 2 V/m | E = V/d = 100/0.02 = 5000 V/m; remember to convert centimetres to metres.
M3@1: A lamp transfers 540 J while 45 C passes through it in 30 s. The p.d. across it is: | 12 V | 18 V | 1.5 V | 24 300 V | V = W/Q = 540/45 = 12 V; the time is not needed for p.d., only for current (1.5 A).
NUM1@1: A charge of 0.50 C moves through a p.d. of 230 V. How much energy is transferred, in joules? | 115 | 1% | J | W = QV = 0.50 × 230 = 115 J.
SA2@3: Explain why touching a 300 kV Van de Graaff dome usually gives only a sting, while touching a 230 V mains conductor can be fatal. | Harm depends on the current through the body and how long it lasts. The dome holds only a small charge (microcoulombs), so the current flows for a tiny fraction of a second and the voltage collapses. The mains supply can keep delivering charge, so a current of tens of milliamps can flow through the body continuously, which can stop the heart. | Harm depends on current and duration ; Dome stores little charge, so the discharge is brief ; Mains sustains a dangerous current

## Electric dipoles
S: An electric dipole is a pair of equal and opposite charges separated by a small distance. Many molecules are dipoles; their behaviour in fields explains dielectrics, microwave heating and the structure of water.
O: Define the dipole moment and describe the far field of a dipole
O: Calculate the torque and potential energy of a dipole in a uniform field
O: Explain why neutral polar objects are pulled towards regions of stronger field
PRE: Electric fields
LV: Year 1 · Application
H: Dipole moment and field
E: p = qd (C m), pointing from − to +
E: V = p cos θ/(4πε_{0}r^{2}); E ∝ p/r^{3} (far away)
- Falls off faster than a point-charge field because the two charges' fields nearly cancel.
H: In external fields
E: τ = p × E (|τ| = pE sin θ); U = −p·E
- Uniform field: torque turns p towards E; no net force.
- Non-uniform field: net force F = (p·∇)E, pulling an aligned dipole towards the stronger field (why neutral objects are attracted to charged ones).
H: Molecular dipoles
P: Water has p = 6.2 × 10^{-30} C m. The 2.45 GHz field in a microwave oven keeps twisting water dipoles back and forth, and their collisions with neighbours turn that energy into heat. Dipole–dipole forces and hydrogen bonds give water its high boiling point and surface tension.
X: Torque on a water molecule in 10^{5} V m^{-1} at 90°?
> τ = pE sin 90° = 6.2 × 10^{-30} × 10^{5} = 6.2 × 10^{-25} N m
K: A uniform field only rotates a dipole; a net force needs a field that varies in space.
!: A dipole in a uniform field feels torque but no net force; it's field gradients that pull.
P: **Investigate with the lab.** Put the test charge on the line between the dipole's charges and see the field point from + to −.
IX: efield
T: Electric dipole | A pair of equal and opposite charges a small distance apart
T: Dipole moment | The vector p = qd, from the negative to the positive charge, measuring a dipole's strength
SUM: p = qd; the dipole field falls as 1/r^{3}.
SUM: In a uniform field τ = pE sin θ and U = −pE cos θ; field gradients give a net force.
EV: established | The dipole field and the torque and energy of a dipole in a field follow directly from Coulomb's law.
SRC: OpenStax, University Physics Volume 2, section 5.7 "Electric Dipoles" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-7-electric-dipoles
SRC: OpenStax, University Physics Volume 2, section 8.5 "Molecular Model of a Dielectric" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-5-molecular-model-of-a-dielectric
Q: What is the electric dipole moment? | p = qd, pointing from the negative to the positive charge.
Q: Why do dipole fields fall faster than point-charge fields? | The opposite charges' fields largely cancel at large distances (E ∝ 1/r^{3}).
M1@2: The energy of a dipole is lowest when p is: | Parallel to E | Antiparallel to E | Perpendicular to E | Zero | U = −pE cos θ is most negative at θ = 0, so a dipole settles aligned with the field.
M2@2: In a uniform field a dipole experiences: | Torque but no net force | A net force only | Neither torque nor force | Equal torque and force | The forces +qE and −qE are equal and opposite, so they cancel, but they act at different points and so form a couple.
M2@1: What is an electric dipole? | Equal and opposite charges a small distance apart | Two equal positive charges | A single charge in a uniform field | A charge moving in a circle | A dipole is a pair of equal and opposite charges separated by a small distance; its strength is p = qd.
M3@1: At a large distance r along its axis, how does a dipole's field change when r doubles? | It falls to one eighth | It falls to one quarter | It halves | It is unchanged | The far field of a dipole is proportional to p/r^{3}, so doubling r divides it by 2^{3} = 8.
NUM2@2: A dipole of moment 4.0 × 10^{-29} C m makes 30° with a 2.0 × 10^{5} V m^{-1} field. Find the torque, in units of 10^{-24} N m. | 4.0 | 2% | × 10^{-24} N m | τ = pE sin θ = 4.0 × 10^{-29} × 2.0 × 10^{5} × 0.5 = 4.0 × 10^{-24} N m.
SA3@2,3: Explain how a microwave oven heats food, in terms of dipoles in a field. | Water molecules are permanent dipoles. The oven's oscillating electric field exerts a torque on each dipole, trying to align it, and reverses direction billions of times a second. The molecules keep rotating back and forth and collide with their neighbours, so the energy taken from the field becomes random thermal motion: the food heats. | Water molecules are permanent dipoles ; Oscillating field exerts an alternating torque ; Rotational energy shared by collisions as heat

## Electric flux
S: Electric flux measures how much electric field passes through a surface: field strength times area, counting only the component perpendicular to the surface. Gauss's law relates the flux through a closed surface to the charge inside.
O: Define electric flux and calculate it for a uniform field through a flat surface
O: Identify the correct angle in Φ = EA cos θ
O: Explain why the net flux through a closed surface depends only on the enclosed charge
PRE: Electric field lines
LV: Year 1 · Application
H: Definition
E: Φ_{E} = E·A = EA cos θ :: uniform field, flat surface; θ is between E and the normal
E: Φ_{E} = ∫E·dA :: general
- Units: N m^{2} C^{-1} (or V m).
- Closed surfaces: outward normal; outgoing flux positive, incoming negative.
H: Picture
P: Flux counts field lines crossing a surface. A closed surface with no charge inside has as many lines entering as leaving: zero net flux. Lines from charge inside must all cross the surface, giving flux Q/ε_{0} whatever the surface's shape or size.
X: A uniform field 500 N C^{-1} crosses a 0.1 m^{2} disc at 30° to its surface. Flux?
> Angle to the normal = 90° − 30° = 60°
> Φ = 500 × 0.1 × cos 60° = 25 N m^{2} C^{-1}
K: Flux is greatest when the field is along the normal (θ = 0) and zero when the field skims the surface (θ = 90°).
!: θ in Φ = EA cos θ is measured from the surface's normal, not from the surface.
T: Electric flux | Φ = ∫E·dA, the normal component of E integrated over a surface
T: Area vector | A vector of magnitude equal to the area, perpendicular to the surface (outwards for a closed surface)
SUM: Φ = EA cos θ, with θ measured from the normal.
SUM: Net flux through a closed surface is zero unless it encloses charge.
EV: established | Electric flux is a defined quantity; its relation to enclosed charge is Gauss's law, a Maxwell equation.
SRC: OpenStax, University Physics Volume 2, section 6.1 "Electric Flux" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-1-electric-flux
SRC: OpenStax, University Physics Volume 2, section 6.2 "Explaining Gauss's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-2-explaining-gausss-law
Q: Define electric flux. | Φ = ∫E·dA, the field component normal to a surface integrated over it.
Q: What is the net flux through a closed surface with no charge inside? | Zero.
M1@2: A field parallel to a flat surface gives flux: | 0 | EA | Its maximum value | A negative value | The field is at 90° to the normal, and cos 90° = 0, so no field lines cross the surface.
M2@3: The flux through a closed sphere around charge Q depends on: | Q only | The sphere's radius | The charge's position inside | Both the radius and Q | By Gauss's law the flux is Q/ε_{0}: a bigger sphere has more area but a weaker field, and the two effects cancel exactly.
M3@3: A cube encloses a point charge q at its centre. The flux through one face is: | q/(6ε_{0}) | q/ε_{0} | q/(4ε_{0}) | Zero | The total flux is q/ε_{0}, and by symmetry each of the six identical faces takes an equal share.
NUM2@1,2: A uniform field of 2.0 × 10^{3} N C^{-1} makes 40° with the normal to a 0.050 m^{2} flat surface. Find the flux, in N m^{2} C^{-1}. | 77 | 2% | N m^{2} C^{-1} | Φ = EA cos θ = 2.0 × 10^{3} × 0.050 × cos 40° = 76.6 N m^{2} C^{-1}.
SA2@3: Using field lines, explain why the net flux through a closed surface with no charge inside is zero, even in a non-uniform field. | Field lines begin and end only on charges. With no charge inside the surface, every line that enters must also leave somewhere. Entering lines count as negative flux and leaving lines as positive, so they cancel, whatever the shape of the surface or the field. | Lines start and end only on charges ; Every entering line leaves ; Inward and outward contributions cancel

## Gauss's law
S: Gauss's law states that the electric flux out of any closed surface equals the enclosed charge divided by ε_{0}. With symmetry, it finds fields in one line, and it's one of Maxwell's four equations.
O: State Gauss's law in integral and differential form
O: Choose a Gaussian surface and use it to find fields of symmetric charge distributions
O: Explain consequences such as zero field inside a charged shell
PRE: Electric flux
LV: Year 1 · Physical reasoning
H: The law
E: ∮E·dA = Q_{enc}/ε_{0}
E: ∇·E = ρ/ε_{0} :: differential form
H: Using it
- Choose a Gaussian surface matching the symmetry so E is constant (or zero, or parallel) on parts of it.
- **Sphere** around spherical charge: E·4πr^{2} = Q/ε_{0}.
- **Cylinder** around a line charge: E·2πrL = λL/ε_{0} ⇒ E = λ/(2πε_{0}r).
- **Pillbox** across a sheet: 2EA = σA/ε_{0} ⇒ E = σ/(2ε_{0}).
H: Consequences
- Charge inside a conductor resides on its surface.
- E just outside a conductor = σ/ε_{0}, perpendicular to the surface.
- Inside a uniform spherical shell, E = 0.
X: Field inside a uniformly charged solid sphere (charge Q, radius R) at r < R?
> Q_{enc} = Q(r/R)^{3}
> E·4πr^{2} = Q_{enc}/ε_{0} ⇒ E = Qr/(4πε_{0}R^{3}), rising linearly from zero
K: Gauss's law is equivalent to Coulomb's law for static charges, but it stays true for moving charges and changing fields.
!: Gauss's law is always true, but it only gives the field easily when symmetry makes E constant over the surface.
T: Gaussian surface | An imaginary closed surface chosen to apply Gauss's law, usually matching the symmetry of the charge
T: Enclosed charge | The net charge inside a Gaussian surface; charge outside contributes no net flux
SUM: ∮E·dA = Q_{enc}/ε_{0} for any closed surface.
SUM: Spheres, cylinders and pillboxes give the fields of spherical, line and sheet charges.
EV: established | Gauss's law is one of Maxwell's equations and holds for all electric fields, static or not.
SRC: OpenStax, University Physics Volume 2, section 6.2 "Explaining Gauss's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-2-explaining-gausss-law
SRC: OpenStax, University Physics Volume 2, section 6.3 "Applying Gauss's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-3-applying-gausss-law
Q: State Gauss's law. | The net electric flux through a closed surface equals the enclosed charge divided by ε_{0}.
Q: What Gaussian surface suits a long charged wire? | A coaxial cylinder.
M1@3: The field just outside a conductor with surface charge density σ is: | σ/ε_{0} | σ/2ε_{0} | 0 | 2σ/ε_{0} | A pillbox through the surface has flux only on its outer face (E = 0 inside the metal), so EA = σA/ε_{0}.
M2@3: The field inside a uniformly charged hollow sphere is: | Zero | Q/(4πε_{0}r^{2}) | Constant and non-zero | Infinite | A Gaussian sphere inside the shell encloses no charge, and by symmetry E is the same all over it, so E must be zero.
M3@2: Using Gauss's law, the field at distance r outside a uniformly charged solid sphere of total charge Q is: | Q/(4πε_{0}r^{2}), as if all the charge were at the centre | Qr/(4πε_{0}R^{3}) | Zero, because the charge is spread out | Q/(2πε_{0}r) | The Gaussian sphere of radius r encloses all of Q, and symmetry makes E uniform over it, giving E·4πr^{2} = Q/ε_{0}.
NUM2@2: A long wire carries 2.0 × 10^{-8} C m^{-1}. Find the field 0.10 m from it, in units of 10^{3} N C^{-1}. | 3.6 | 2% | × 10^{3} N C^{-1} | E = λ/(2πε_{0}r) = 2.0 × 10^{-8}/(2π × 8.85 × 10^{-12} × 0.10) = 3.6 × 10^{3} N C^{-1}.
SA3@2: Use Gauss's law to derive the field of an infinite plane sheet with charge density σ. | By symmetry E is perpendicular to the sheet and equal in size on both sides. Take a cylindrical pillbox of end area A straddling the sheet. No flux crosses the curved side; each end has flux EA, so the total is 2EA. The enclosed charge is σA, so 2EA = σA/ε_{0} and E = σ/(2ε_{0}), independent of distance. | Symmetry: E perpendicular and equal on both sides ; Pillbox: flux only through the two ends, 2EA ; 2EA = σA/ε_{0} gives E = σ/2ε_{0}

## Charge distributions
S: Real charges are spread over lines, surfaces and volumes. Their fields come from integrating Coulomb's law over the distribution, or from Gauss's law when there's enough symmetry.
O: Use line, surface and volume charge densities
O: Integrate Coulomb's law to find fields on the axis of rings and discs
O: Explain the multipole expansion of a distant charge distribution
PRE: Line, surface and volume integrals
LV: Year 1 · Application
H: Densities
E: dq = λ dl (line, C m^{-1}); dq = σ dA (surface, C m^{-2}); dq = ρ dV (volume, C m^{-3})
E: E = (1/4πε_{0})∫dq r̂/r^{2}; V = (1/4πε_{0})∫dq/r
H: Standard results
- Ring (radius a, on axis at z): E = Qz/(4πε_{0}(z^{2} + a^{2})^{3/2}).
- Disc (on axis): E = (σ/2ε_{0})(1 − z/√(z^{2} + a^{2})); → σ/2ε_{0} near the centre.
- Finite line segment: depends on the angles subtended at its ends.
H: Multipole expansion
P: Far from any distribution, V ≈ (1/4πε_{0})[Q/r + p·r̂/r^{2} + quadrupole/r^{3} + …]. The net charge dominates; if it's zero, the dipole moment does; and so on. Molecules and nuclei are characterised by their dipole and quadrupole moments.
X: Field on the axis of a ring (Q = 10 nC, a = 0.1 m) at z = 0.1 m?
> E = 8.99 × 10^{9} × 10^{-8} × 0.1/(0.02)^{3/2} = 3.2 × 10^{3} N C^{-1}
K: Potential is often easier to integrate than field because it is a scalar; find V first, then take E = −∇V.
!: Integrate field vectors component by component; symmetry often cancels components but don't assume it without checking.
T: Charge density | Charge per unit length (λ), area (σ) or volume (ρ) of a distribution
T: Multipole expansion | Writing a distribution's distant potential as monopole, dipole, quadrupole… terms falling as higher powers of 1/r
SUM: Fields of extended charges come from integrating dq over the distribution.
SUM: Far away, the lowest non-zero multipole dominates.
EV: established | The fields of continuous distributions follow from superposition of Coulomb fields.
SRC: OpenStax, University Physics Volume 2, section 5.5 "Calculating Electric Fields of Charge Distributions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-5-calculating-electric-fields-of-charge-distributions
SRC: OpenStax, University Physics Volume 2, section 7.3 "Calculations of Electric Potential" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-3-calculations-of-electric-potential
Q: What is the field on the axis of a charged ring at its centre? | Zero, by symmetry.
Q: What is the multipole expansion? | Writing a distribution's distant potential as monopole, dipole, quadrupole… terms falling as successively higher powers of 1/r.
M1@3: Far from a neutral molecule with a dipole moment, the potential falls as: | 1/r^{2} | 1/r | 1/r^{3} | It is constant | With zero net charge the monopole term vanishes, and the dipole term p cos θ/(4πε_{0}r^{2}) leads.
M2@1: Linear charge density has units: | C m^{-1} | C m^{-2} | C m^{-3} | C | λ is charge per unit length, so it is measured in coulombs per metre; σ and ρ use m^{-2} and m^{-3}.
M3@2: Very far along the axis of a charged ring (z ≫ a), the ring's field becomes: | Q/(4πε_{0}z^{2}), like a point charge | Zero | Q/(4πε_{0}a^{2}) | Qz/(4πε_{0}a^{3}) | When z ≫ a, (z^{2} + a^{2})^{3/2} ≈ z^{3}, so E ≈ Qz/(4πε_{0}z^{3}) = Q/(4πε_{0}z^{2}).
NUM2@1: A rod 0.40 m long carries a uniform charge of 6.0 nC. What is its linear charge density, in nC m^{-1}? | 15 | 1% | nC m^{-1} | λ = Q/L = 6.0/0.40 = 15 nC m^{-1}.
SA2@2: Explain why the field on the axis of a uniformly charged ring has no component perpendicular to the axis, and how this simplifies the integral. | Each small element dq on the ring has a partner directly opposite it. Their fields at an axial point have equal axial components but equal and opposite perpendicular components, which cancel. So only the axial components, dE cos α, need adding, and since every element is the same distance from the point the integral reduces to a simple sum. | Opposite elements pair up ; Perpendicular components cancel ; Only axial components are integrated

## Conductors in electrostatic equilibrium
S: In electrostatic equilibrium, charges in a conductor have stopped moving. This forces the field inside to be zero, all excess charge to sit on the surface, and the surface to be an equipotential.
O: State the properties of a conductor in electrostatic equilibrium
O: Explain why charge concentrates at sharp points
O: Describe the charges induced in a hollow conductor with a charge in its cavity
PRE: Gauss's law
LV: Year 1 · Physical reasoning
H: Properties
- E = 0 inside the material.
- Net charge on the outer surface only.
- Just outside, E is perpendicular to the surface with magnitude σ/ε_{0}.
- The whole conductor is at one potential.
- Charge concentrates where curvature is greatest (sharp points).
H: Sharp points
P: For connected conductors σ ∝ 1/radius of curvature, so fields at sharp points are intense. They can ionise air (corona discharge, St Elmo's fire). Lightning rods use points to provide a preferred strike path; high-voltage equipment uses rounded surfaces to avoid discharge.
H: Cavities
- A hollow conductor's cavity has zero field if it contains no charge (shielding).
- A charge in the cavity induces equal opposite charge on the inner wall; the outside sees the total.
X: Two connected metal spheres, radii 1 cm and 10 cm, share charge. Compare surface fields.
> Same potential: Q_{1}/r_{1} = Q_{2}/r_{2}
> E ∝ Q/r^{2} ∝ 1/r: the small sphere's field is 10 times stronger
K: Every property follows from one fact: free charges would move if there were any field inside, so in equilibrium there is none.
!: Equilibrium means no current; once current flows (in a circuit), there is a field inside the wire.
T: Electrostatic equilibrium | The state in which no charges in a conductor are moving
T: Corona discharge | Ionisation of air by the intense field near a sharp, highly charged conductor
SUM: In equilibrium E = 0 inside, charge sits on the surface and the conductor is an equipotential.
SUM: Surface charge and field are largest where the surface is most sharply curved.
EV: established | These properties follow from Gauss's law and the free movement of charge in conductors.
SRC: OpenStax, University Physics Volume 2, section 6.4 "Conductors in Electrostatic Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium
SRC: OpenStax, University Physics Volume 2, section 7.5 "Equipotential Surfaces and Conductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-5-equipotential-surfaces-and-conductors
Q: Why is the field zero inside a conductor in equilibrium? | Otherwise free charges would move, contradicting equilibrium.
Q: Why does charge concentrate at sharp points? | Equal potential requires higher surface charge density where curvature is greater.
M1@1: Excess charge on an isolated conductor resides: | On its outer surface | Uniformly through it | At its centre | Only at sharp points | A Gaussian surface just inside the metal has E = 0 on it, so it encloses no net charge: the excess must be on the surface.
M2@2: Corona discharge occurs at: | Sharp points of high-voltage conductors | Flat surfaces | Inside conductors | The surface of insulators | Charge density, and so the field σ/ε_{0}, is highest at sharp points, where it can exceed air's breakdown strength.
M3@3: A +5 μC charge sits inside the cavity of a neutral hollow metal sphere. The charges on the inner and outer surfaces are: | −5 μC inner, +5 μC outer | +5 μC inner, −5 μC outer | 0 inner, +5 μC outer | 0 inner, 0 outer | A Gaussian surface in the metal has E = 0, so it must enclose zero charge: the inner wall carries −5 μC, and since the sphere is neutral the outer surface carries +5 μC.
TF1@1: Every point of a conductor in electrostatic equilibrium is at the same potential. | true | With E = 0 inside the metal, no work is done moving a charge between any two points, so the potential is the same throughout.
SA3@2: Two metal spheres of radii 2 cm and 8 cm are joined by a long wire and charged. Explain which sphere has the stronger surface field and by what factor. | Joined conductors reach the same potential, so kQ_{1}/r_{1} = kQ_{2}/r_{2}, and charge is shared in proportion to radius. The surface field is E = kQ/r^{2} = V/r, so E is inversely proportional to radius. The 2 cm sphere has the field 8/2 = 4 times stronger, even though it carries less charge. | Same potential, so Q ∝ r ; E = V/r, so E ∝ 1/r ; Small sphere's field 4 times larger

## Capacitance
S: Capacitance is the charge a conductor arrangement stores per volt. Capacitors store energy in electric fields and are essential in electronics for timing, filtering, smoothing and quick bursts of power.
O: Define capacitance and use C = Q/V
O: Explain what capacitance depends on
O: Describe uses of capacitors in everyday technology
PRE: Electric potential
LV: A level · Foundation
H: Definition
E: C = Q/V (farads, 1 F = 1 C V^{-1})
E: C = 4πε_{0}R :: isolated sphere (Earth: ~0.7 mF)
- Depends only on geometry and the dielectric, not on Q or V: doubling V doubles Q.
- Practical capacitors: pF to F; supercapacitors reach thousands of F.
H: Types
- Ceramic, film, electrolytic (polarised, large C), tantalum, supercapacitors (electric double layer, huge effective area).
H: Uses
- Smoothing rectified DC; filters; timing (RC); coupling AC while blocking DC.
- Camera flashes and defibrillators (fast energy release).
- Touchscreens sense finger capacitance; capacitive microphones and sensors.
- DRAM: each bit is a tiny capacitor (~10 fF).
X: A capacitor stores 60 μC at 12 V. Capacitance?
> C = Q/V = 60 × 10^{-6}/12 = 5 × 10^{-6} F = 5 μF
K: A capacitor holds equal and opposite charges +Q and −Q on its plates; "charge stored" means Q on one plate, not the total, which is zero.
!: A farad is huge; isolated objects have tiny capacitance (a person ~100 pF).
P: **Investigate with the lab.** Change the capacitance and watch how much charge the capacitor stores and how long it takes to charge.
IX: transients
T: Capacitance | Charge stored per unit potential difference, C = Q/V
T: Farad | The unit of capacitance: one coulomb per volt
SUM: C = Q/V, fixed by geometry and dielectric.
SUM: Capacitors smooth, filter, time and deliver fast bursts of energy.
EV: established | Q is proportional to V for any fixed arrangement of conductors, which makes C a constant of the arrangement.
SRC: OpenStax, University Physics Volume 2, section 8.1 "Capacitors and Capacitance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance
SRC: AQA, A-level Physics specification (7408), section 3.7.4.1 Capacitance | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define capacitance. | Charge stored per unit potential difference, C = Q/V.
Q: How do touchscreens detect a finger? | The finger changes the capacitance of electrodes under the screen.
M1@1: A 100 μF capacitor at 9 V holds: | 900 μC | 11 μC | 9 μC | 0.9 μC | Q = CV = 100 μF × 9 V = 900 μC; the 11 μC distractor comes from dividing instead.
M2@2: Capacitance depends on: | Geometry and dielectric | The charge stored | The voltage applied | The current | Q rises in proportion to V, so Q/V is a constant set by the plates' size, spacing and the material between them.
M2@1: A 470 μF capacitor is charged to 10 V. How much charge does it store? | 4.7 mC | 47 C | 4.7 C | 0.047 mC | Q = CV = 470 × 10^{-6} × 10 = 4.7 × 10^{-3} C; keep track of the micro prefix.
M3@2: A capacitor's voltage is raised from 6 V to 9 V and its charge rises by 30 μC. Its capacitance is: | 10 μF | 3.3 μF | 5 μF | 270 μF | Since C is constant, ΔQ = CΔV, so C = 30 μC/3 V = 10 μF; dividing 30 by 9 or 6 uses the wrong voltage.
SA2@3: Give two different uses of capacitors and explain which property of the capacitor each relies on. | A camera flash or defibrillator relies on a capacitor storing energy and releasing it very quickly, giving a large current for a short time. A smoothing capacitor in a power supply relies on storing charge at the voltage peaks and releasing it between them, which keeps the output voltage nearly steady. Touchscreens rely on capacitance changing when a finger alters the field. | Fast energy release (flash, defibrillator) ; Charge storage smoothing ripple ; Capacitance change used for sensing

## Parallel-plate and spherical capacitors
S: Simple geometries give simple formulas for capacitance. Parallel plates are the standard model; spherical and cylindrical capacitors describe cables and isolated conductors.
O: Calculate the capacitance of a parallel-plate capacitor, with and without a dielectric
O: Use the formulas for spherical and coaxial capacitors
O: Predict changes in Q, V and C when plates move with charge or voltage held constant
PRE: Capacitance
LV: A level · Application
H: Formulas
E: C = ε_{0}ε_{r}A/d :: parallel plates (ignoring edge effects)
E: C = 4πε_{0}ε_{r}ab/(b − a) :: concentric spheres, radii a < b
E: C/L = 2πε_{0}ε_{r}/ln(b/a) :: coaxial cable per length
- Larger area, smaller gap or higher ε_{r} ⇒ larger C.
H: Design limits
- Smaller gap increases C but lowers the breakdown voltage (V_{max} = E_{breakdown}d).
- Multilayer ceramic capacitors stack hundreds of thin layers; electrolytic capacitors use a nanometre oxide layer as the dielectric.
X: Parallel plates 10 cm × 10 cm, 1 mm apart, in air. Capacitance? And with glass (ε_{r} = 6)?
> C = 8.85 × 10^{-12} × 0.01/0.001 = 8.85 × 10^{-11} F = 88.5 pF
> With glass: 6 × 88.5 = 531 pF
K: A dielectric raises C by ε_{r} because its polarisation cancels part of the field, so the same charge gives a smaller voltage.
!: Moving charged, isolated plates apart (Q fixed) raises V; with a battery attached (V fixed), Q falls. Keep track of what's held constant.
P: **Investigate with the lab.** Use the parallel plates and check the field between them is nearly uniform, except near the edges.
IX: efield
T: Dielectric constant | Another name for relative permittivity ε_{r}, the factor by which a dielectric increases capacitance
T: Fringing | The bulging of field lines at the edges of capacitor plates, ignored in C = ε_{0}A/d
SUM: C = ε_{0}ε_{r}A/d for parallel plates.
SUM: Thin gaps give large C but lower breakdown voltage.
EV: established | C = ε_{0}ε_{r}A/d follows from Gauss's law for plates whose size is large compared with their spacing.
SRC: OpenStax, University Physics Volume 2, section 8.1 "Capacitors and Capacitance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance
SRC: AQA, A-level Physics specification (7408), section 3.7.4.2 Parallel plate capacitor | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the capacitance of a parallel-plate capacitor? | C = ε_{0}ε_{r}A/d.
Q: Why does reducing the plate gap have a limit? | The breakdown voltage falls in proportion to the gap.
M1@1: Doubling plate area and halving the separation multiplies C by: | 4 | 2 | 1 | 1/4 | C ∝ A/d: doubling A doubles C and halving d doubles it again, giving 4 times.
M2@2: Coaxial cable capacitance per metre depends on: | ln(b/a) and ε_{r} | Length only | The current | Frequency only | C/L = 2πε_{0}ε_{r}/ln(b/a) depends only on the ratio of the radii and the insulating material.
M2@1: Why is the field between parallel plates uniform? | The field lines are parallel and evenly spaced away from the edges | The plates carry no charge | The voltage is zero between the plates | The plates are infinitely far apart | Away from the edges, the field is perpendicular to the plates and of constant strength σ/ε_{0}.
M3@3: An isolated charged parallel-plate capacitor has its plate spacing doubled. Which is correct? | Q unchanged, V doubles, stored energy doubles | Q halves, V unchanged | Q unchanged, V halves | Q doubles, V unchanged | Isolated means Q is fixed; C halves, so V = Q/C doubles and U = Q^{2}/2C doubles, the extra energy coming from the work done pulling the plates apart.
SA3@3: A capacitor stays connected to a battery while a slab of dielectric (ε_{r} = 3) is slid between its plates. Explain what happens to C, V and Q. | C triples because C = ε_{0}ε_{r}A/d. The battery holds V fixed. Since Q = CV, the charge on the plates triples, with the extra charge flowing from the battery. The polarised dielectric reduces the field from each coulomb, so more charge is needed for the same voltage. | C multiplied by ε_{r} ; V fixed by the battery ; Q = CV triples, charge drawn from the battery

## Capacitors in series and parallel
S: Capacitors combine opposite to resistors: in parallel their capacitances add; in series their reciprocals add. Parallel capacitors share voltage; series capacitors share charge.
O: Calculate the capacitance of series and parallel combinations
O: Find the charge on and voltage across each capacitor in a network
O: Explain the combination rules physically
PRE: Capacitance
LV: A level · Application
H: Rules
E: C_{parallel} = C_{1} + C_{2} + …
E: 1/C_{series} = 1/C_{1} + 1/C_{2} + …
- Parallel: same V across each; charges add.
- Series: same Q on each; voltages add; the smallest capacitor takes the largest voltage.
H: Why
P: Parallel capacitors are like one capacitor with more plate area. Series capacitors are like one with a wider gap: each plate's charge induces equal and opposite charge on the next, so every capacitor carries the same Q.
X: 2 μF and 3 μF in series across 10 V. Charge and voltages?
> C = (2 × 3)/(2 + 3) = 1.2 μF; Q = CV = 12 μC
> V_{2μF} = 12/2 = 6 V; V_{3μF} = 12/3 = 4 V (total 10 V)
K: The series combination is always smaller than the smallest capacitor; the parallel combination is always larger than the largest.
!: Series capacitors rated for a voltage don't share it equally unless they're identical; use balancing resistors in high-voltage banks.
T: Series connection | Components joined end to end so the same charge (or current) passes through each
T: Parallel connection | Components connected across the same two points, so each has the same voltage
SUM: Parallel: C adds, same V. Series: 1/C adds, same Q.
SUM: In series the smallest capacitor has the largest share of the voltage.
EV: established | The combination rules follow from conservation of charge and the addition of potential differences.
SRC: OpenStax, University Physics Volume 2, section 8.2 "Capacitors in Series and in Parallel" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-2-capacitors-in-series-and-in-parallel
SRC: AQA, A-level Physics specification (7408), section 3.7.4.1 Capacitance | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How do capacitors combine in parallel? | Their capacitances add.
Q: In series, what's the same for each capacitor? | The charge.
M1@1: Two 10 μF capacitors in series give: | 5 μF | 20 μF | 10 μF | 100 μF | 1/C = 1/10 + 1/10 = 1/5, so C = 5 μF: two equal capacitors in series give half of one.
M2@2: In series, the capacitor with the smallest C has: | The largest voltage | The smallest voltage | The same voltage as the others | Zero charge | Each carries the same Q, and V = Q/C, so the smallest capacitance takes the largest voltage.
M3@2: A 4 μF capacitor is in parallel with a 2 μF capacitor, and the pair is in series with a 3 μF capacitor across 12 V. The voltage across the 3 μF capacitor is: | 8 V | 4 V | 6 V | 12 V | The parallel pair is 6 μF; in series with 3 μF the total is 2 μF and Q = 24 μC, so the 3 μF has 24/3 = 8 V and the pair has 4 V.
NUM2@1: What single capacitance, in μF, is equivalent to 2.0 μF, 3.0 μF and 5.0 μF all in parallel? | 10 | 1% | μF | In parallel capacitances add: 2.0 + 3.0 + 5.0 = 10 μF.
SA2@3: Explain why capacitors in series all carry the same charge, even when their capacitances differ. | The plates joined between two capacitors form an isolated conductor that starts neutral. When the outer plates are charged, the charge +Q on one plate induces −Q on the facing plate, which leaves +Q on its connected partner, and so on along the chain. Charge is conserved on each isolated section, so every capacitor ends up with +Q and −Q. | Connected inner plates form an isolated neutral conductor ; Induction passes ±Q along the chain ; Conservation of charge gives equal Q

## Energy stored in electric fields
S: Charging a capacitor stores energy, and that energy lives in the electric field between the plates. Every electric field holds energy, with a density proportional to the field squared.
O: Calculate the energy stored in a capacitor using ½QV, ½CV^{2} or Q^{2}/2C
O: Interpret stored energy as the area under a Q–V graph
O: Use the energy density of an electric field
PRE: Capacitance
LV: A level · Application
H: Formulas
E: U = ½QV = ½CV^{2} = Q^{2}/(2C)
E: u = ½ε_{0}ε_{r}E^{2} :: energy density (J m^{-3})
- The ½ comes from the area under the Q–V graph: the voltage rises from 0 to V as charge is added.
- Charging through a resistor from a battery dissipates half the energy supplied as heat, whatever R is.
H: Applications
- Defibrillator: ~150–360 J from a ~100 μF capacitor at ~2 kV.
- Flash photography, pulsed lasers, fusion experiments (the National Ignition Facility's capacitor banks store ~400 MJ).
- Supercapacitors for regenerative braking and quick charging.
H: Field energy is real
P: Electromagnetic waves carry energy through empty space with density ε_{0}E^{2} (electric plus an equal magnetic share). The energy isn't in the charges but spread through the field.
X: A 2000 μF capacitor at 400 V. Stored energy?
> U = ½CV^{2} = ½ × 2 × 10^{-3} × 400^{2} = 160 J
K: The battery supplies QV, but the capacitor stores only ½QV: the rest is lost as heat in the circuit while it charges.
!: Large capacitors can stay charged long after power is removed; discharge them safely before handling.
T: Energy density | Energy stored per unit volume of field, u = ½ε_{0}E^{2} in a vacuum
T: Q–V graph | A straight line through the origin for a capacitor; the area under it is the stored energy
SUM: U = ½QV = ½CV^{2} = Q^{2}/2C, the area under the Q–V line.
SUM: Fields store energy with density ½ε_{0}ε_{r}E^{2}.
EV: established | Energy stored in fields with density ½ε_{0}E^{2} is standard electromagnetism and accounts for energy carried by light.
SRC: OpenStax, University Physics Volume 2, section 8.3 "Energy Stored in a Capacitor" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-3-energy-stored-in-a-capacitor
SRC: AQA, A-level Physics specification (7408), section 3.7.4.3 Energy stored by a capacitor | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the energy stored in a capacitor? | U = ½CV^{2}.
Q: What is the energy density of an electric field? | u = ½ε_{0}E^{2} (in vacuum).
M1@1: Doubling the voltage on a capacitor multiplies its energy by: | 4 | 2 | 8 | √2 | U = ½CV^{2}, so energy is proportional to V^{2}: doubling V multiplies it by 4.
M2@2: Charging a capacitor from a battery through a resistor wastes: | Half the energy supplied | None of it | All of it | A quarter of it | The battery supplies QV but the capacitor stores ½QV; the other half heats the resistor, independent of R.
M3@1,3: A capacitor stores 9.0 J at 300 V. What charge does it hold? | 60 mC | 30 mC | 2.7 kC | 0.20 mC | U = ½QV gives Q = 2U/V = 18/300 = 0.060 C; forgetting the ½ gives the 30 mC distractor.
NUM2@3: Find the energy density of a 3.0 × 10^{6} V m^{-1} field in air (the breakdown field), in J m^{-3}. | 40 | 3% | J m^{-3} | u = ½ε_{0}E^{2} = 0.5 × 8.85 × 10^{-12} × (3.0 × 10^{6})^{2} = 39.8 J m^{-3}.
SA2@2: Explain, using a Q–V graph, why the energy stored in a capacitor is ½QV and not QV. | For a capacitor Q is proportional to V, so the graph is a straight line through the origin. The energy to add a small charge ΔQ is VΔQ, a thin strip under the line. Early charge is moved through a small voltage and later charge through nearly V, so the total is the triangular area ½QV, not the rectangle QV. | Q–V graph is a straight line through the origin ; Work for each ΔQ is VΔQ, a strip of area ; Total is the triangle area ½QV

## Dielectric polarisation
S: In an electric field, a dielectric's bound charges shift, creating tiny dipoles throughout the material. Their combined effect reduces the field inside and increases the charge a capacitor can store at a given voltage.
O: Define polarisation, electric susceptibility and the displacement field D
O: Distinguish electronic, ionic and orientational polarisation and their frequency ranges
O: Predict the effect of inserting a dielectric into a capacitor
PRE: Electric dipoles
LV: Year 2 · Physical reasoning
H: Describing polarisation
E: P = dipole moment per unit volume (C m^{-2})
E: D = ε_{0}E + P = ε_{0}ε_{r}E :: electric displacement
E: P = ε_{0}χ_{e}E, ε_{r} = 1 + χ_{e} :: linear dielectric
E: σ_{bound} = P·n̂; ρ_{bound} = −∇·P; ∇·D = ρ_{free}
H: Mechanisms
- Electronic: all materials, fastest (works up to optical frequencies; gives refractive index n = √ε_{r} for non-magnetic materials).
- Ionic: ionic crystals (up to infrared frequencies).
- Orientational: polar molecules (up to microwave frequencies; water's ε_{r} falls from about 80 to about 1.8 at optical frequencies).
H: Special dielectrics
- **Ferroelectrics** (BaTiO_{3}): spontaneous polarisation, hysteresis; used in high-C capacitors and memories.
- **Piezoelectrics** (quartz, PZT): polarisation from strain and vice versa; sensors, actuators, clocks, ultrasound transducers.
- **Electrets**: permanently polarised (microphones).
X: Inserting a dielectric (ε_{r} = 4) into an isolated charged capacitor. What happens to V and U?
> Q fixed; C increases 4 times ⇒ V falls to V/4
> U = Q^{2}/(2C) falls to U/4; the lost energy is work done pulling the dielectric in
K: Bound surface charge on a polarised dielectric opposes the free charge on the plates, so the field inside falls by a factor ε_{r}.
!: Dielectric "constants" depend on frequency and temperature; a value for DC can be badly wrong for light.
T: Polarisation | The electric dipole moment per unit volume of a material, P
T: Electric displacement | The field D = ε_{0}E + P, whose divergence equals the free charge density
SUM: A field polarises a dielectric; bound charges reduce the field by ε_{r}.
SUM: Each polarisation mechanism stops working above its characteristic frequency.
EV: established | The linear dielectric model is well established for ordinary fields; it fails for ferroelectrics and very strong fields.
SRC: OpenStax, University Physics Volume 2, section 8.5 "Molecular Model of a Dielectric" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-5-molecular-model-of-a-dielectric
SRC: OpenStax, University Physics Volume 2, section 8.4 "Capacitor with a Dielectric" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-4-capacitor-with-a-dielectric
Q: What is the electric displacement D? | D = ε_{0}E + P; its divergence equals free charge density.
Q: Why does water's permittivity fall at optical frequencies? | Molecules can't reorient fast enough; only electronic polarisation remains.
M1@2: A piezoelectric material: | Polarises when strained | Conducts perfectly | Is strongly magnetic | Has ε_{r} = 1 | Mechanical strain shifts the ions in a piezoelectric crystal and creates polarisation; an applied field also deforms it.
M2@2: Refractive index is related to permittivity by: | n = √ε_{r} | n = ε_{r} | n = 1/ε_{r} | n = ε_{r}^{2} | For non-magnetic materials the speed of light is c/√ε_{r}, so n = √ε_{r}, using ε_{r} at the light's frequency.
M3@1,3: A slab with ε_{r} = 5 fills a capacitor whose plates carry free charge density σ. The field in the slab is: | σ/(5ε_{0}) | σ/ε_{0} | 5σ/ε_{0} | Zero | D = σ by Gauss's law for free charge, and E = D/(ε_{0}ε_{r}) = σ/(5ε_{0}): bound charge cancels four fifths of the field.
NUM2@1: A linear dielectric has susceptibility χ_{e} = 2.5. What is its relative permittivity? | 3.5 | 1% | – | ε_{r} = 1 + χ_{e} = 1 + 2.5 = 3.5.
SA3@3: A capacitor connected to a battery has a dielectric slab inserted, then the same is done to an identical isolated charged capacitor. Compare what happens to the stored energy in each case. | With the battery connected V stays fixed, C rises by ε_{r}, so Q and U = ½CV^{2} both rise by ε_{r}: the battery supplies the extra energy. In the isolated capacitor Q is fixed, so V and U = Q^{2}/2C fall by ε_{r}; the field does work pulling the slab in. | Connected: V fixed, U rises by ε_{r} ; Isolated: Q fixed, U falls by ε_{r} ; Energy supplied by the battery or released as work on the slab

## Boundary conditions for electric fields
S: At the boundary between two materials, electric fields obey simple matching rules derived from Maxwell's equations. They determine how fields bend at interfaces and how charge builds up on surfaces.
O: State the boundary conditions on tangential E and normal D
O: Derive the refraction law for field lines at a dielectric boundary
O: Explain why air gaps in insulation are dangerous
PRE: Dielectric polarisation
LV: Year 2 · Physical reasoning
H: The conditions
E: E_{1∥} = E_{2∥} :: tangential E is continuous (from ∮E·dl = 0)
E: D_{2⊥} − D_{1⊥} = σ_{free} :: normal D jumps by free surface charge (from Gauss)
- With no free surface charge: ε_{1}E_{1⊥} = ε_{2}E_{2⊥}.
H: Refraction of field lines
E: tan θ_{1}/tan θ_{2} = ε_{1}/ε_{2} :: θ measured from the normal
- Field lines bend away from the normal on entering a higher-ε material.
- At a conductor surface: E_{∥} = 0, E_{⊥} = σ/ε_{0}.
H: Consequences
P: Applied to oscillating fields, these conditions give the Fresnel equations for reflection and refraction of light, and explain optical coatings and waveguides. Air gaps in high-voltage insulation are dangerous: the field in the low-ε air is ε_{r} times higher than in the insulator around it, and air breaks down easily.
X: A capacitor has air (ε_{r} = 1) and glass (ε_{r} = 5) layers in series. Ratio of fields?
> D_{⊥} is continuous: ε_{0}E_{air} = 5ε_{0}E_{glass}, so E_{air} = 5E_{glass}
> The air layer may break down first
K: The rules come from applying Gauss's law to a thin pillbox and the loop law to a thin rectangle straddling the boundary.
!: It's D that's continuous across a dielectric boundary with no free charge, not E.
T: Tangential component | The part of a field parallel to a boundary surface
T: Normal component | The part of a field perpendicular to a boundary surface
SUM: Tangential E is continuous; normal D jumps by σ_{free}.
SUM: Field lines refract with tan θ_{1}/tan θ_{2} = ε_{1}/ε_{2}.
EV: established | The boundary conditions follow directly from the integral forms of Maxwell's equations.
SRC: OpenStax, University Physics Volume 2, section 8.4 "Capacitor with a Dielectric" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-4-capacitor-with-a-dielectric
SRC: OpenStax, University Physics Volume 2, section 6.4 "Conductors in Electrostatic Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium
Q: Which component of E is continuous across any boundary? | The tangential component.
Q: Why are air bubbles in insulation dangerous? | The field in the air is higher (lower ε), and air's breakdown strength is low.
M1@1: At a perfect conductor's surface, the tangential electric field is: | Zero | σ/ε_{0} | Its maximum value | Equal to the normal field | Any tangential field would drive surface charges along the surface; in equilibrium they move until it vanishes.
M2@1: Normal D changes across a boundary by: | The free surface charge density | The bound surface charge | Nothing, ever | The potential difference | A Gauss pillbox across the boundary encloses only the free surface charge as far as D is concerned, so D_{⊥} jumps by σ_{free}.
M3@2: A field line in air meets a slab with ε_{r} = 3 at 30° to the normal. Inside the slab, tan θ is: | √3 (θ = 60°) | 1/(3√3) | 1/√3 (θ = 30°) | 3 | tan θ_{2} = tan θ_{1} × ε_{2}/ε_{1} = (1/√3) × 3 = √3, so the line bends away from the normal to 60°.
TF1@3: In a capacitor with layers of air and a solid dielectric in series, the field is stronger in the solid. | false | Normal D is continuous, so E = D/(ε_{0}ε_{r}) is larger where ε_{r} is smaller: the air carries the stronger field.
SA3@1: Use a thin rectangular loop straddling a boundary to show that the tangential component of an electrostatic field is continuous. | In electrostatics ∮E·dl = 0 round any loop. Take a rectangle with long sides of length L on each side of the boundary and vanishingly short ends. The ends contribute nothing, so E_{1∥}L − E_{2∥}L = 0, giving E_{1∥} = E_{2∥}. | Uses ∮E·dl = 0 ; Short sides shrink to zero ; Long sides give E_{1∥} = E_{2∥}

## Electrostatic shielding
S: A closed conducting shell blocks external static electric fields from its interior: a Faraday cage. Charges on the shell rearrange to cancel the outside field inside, protecting sensitive electronics and people.
O: Explain how a conducting enclosure shields its interior from static electric fields
O: Describe when a mesh shields electromagnetic waves
O: Distinguish electric shielding from magnetic shielding
PRE: Conductors in electrostatic equilibrium
LV: Year 1 · Application
H: How it works
- External fields push the shell's free charges until the field inside the metal (and in an empty cavity) is zero.
- For electromagnetic waves a mesh works if its holes are much smaller than the wavelength.
- Shielding of time-varying fields also depends on the skin depth δ = √(2/(ωμσ)): the metal should be several δ thick.
H: Examples
- Cars and aircraft protect occupants from lightning (current flows over the metal skin).
- Microwave oven doors (holes ≪ 12 cm wavelength); MRI rooms, measurement labs, coaxial cable shields.
- Phones lose signal in lifts and metal buildings.
H: Limits
P: Static magnetic fields aren't blocked by ordinary metal shells; they need high-permeability materials (mu-metal) to divert the flux, or superconducting shields. Low-frequency magnetic shielding is much harder than electric shielding.
X: Why is it safe to sit in a car during a lightning strike (not because of the tyres)?
> The metal body conducts the current around the occupants to the ground
> Inside, the field from the strike is largely cancelled
K: Shielding works because induced surface charges produce a field that exactly cancels the external field inside the enclosure.
!: A Faraday cage protects only if it's continuous and well connected; gaps larger than the wavelength leak radiation.
T: Faraday cage | A conducting enclosure that blocks external electric fields from its interior
T: Skin depth | The depth at which an oscillating field in a conductor falls to 1/e of its surface value
SUM: A closed conductor has zero static field inside its empty cavity.
SUM: Meshes block waves much longer than their holes; magnetic fields need high-permeability shields.
EV: established | Electrostatic shielding by closed conductors follows from the properties of conductors in equilibrium.
SRC: OpenStax, University Physics Volume 2, section 6.4 "Conductors in Electrostatic Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium
SRC: OpenStax, University Physics Volume 2, section 7.5 "Equipotential Surfaces and Conductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-5-equipotential-surfaces-and-conductors
Q: What is a Faraday cage? | A conducting enclosure that blocks external electric fields from its interior.
Q: Why does a microwave oven door's mesh block microwaves but not light? | Its holes are much smaller than microwave wavelengths but much larger than light wavelengths.
M1@1: A car protects you from lightning because: | Its metal body acts as a Faraday cage | The tyres insulate it | It's earthed through the engine | The glass blocks current | The current flows over the conducting shell to ground, and the field inside is largely cancelled; tyres are no barrier to lightning.
M2@3: Static magnetic fields are best shielded by: | High-permeability materials | Thin copper sheet | Plastic | Glass | A static magnetic field induces no cancelling charges; mu-metal works by guiding the flux around the shielded region.
M3@2: Which mesh would best shield a room from a 2.4 GHz Wi-Fi signal (wavelength 12.5 cm)? | Metal mesh with 2 mm holes | Metal mesh with 20 cm holes | Plastic mesh with 2 mm holes | Glass with no holes | The mesh must conduct and have holes much smaller than the wavelength; 2 mm metal mesh meets both conditions.
NUM2@2: The skin depth of copper at 50 Hz is about 9 mm. Using δ ∝ 1/√f, estimate it at 5 kHz, in mm. | 0.9 | 5% | mm | Frequency rises 100 times, so δ falls by √100 = 10: 9/10 = 0.9 mm.
SA2@1: Explain how a hollow metal box keeps the static field inside it at zero when it is placed in a uniform external field. | The external field pushes free electrons in the metal towards one side, leaving the other side positive. These induced surface charges produce their own field, which opposes the external one. Electrons keep moving until the total field inside the metal is zero; with no charge inside the cavity, Gauss's law and the equipotential walls make the field in the cavity zero too. | Free electrons redistribute on the surface ; Induced charges produce an opposing field ; Movement stops when total internal field is zero

## Method of images
S: The method of images solves electrostatics problems near conductors by replacing the conductor with imaginary charges that reproduce the same boundary conditions. By uniqueness, the resulting field is the right one in the real region.
O: State the uniqueness theorem and explain why it justifies image charges
O: Find the image charge and force for a point charge near an earthed plane
O: Describe image solutions for spheres and dielectric interfaces
PRE: Conductors in electrostatic equilibrium
LV: Year 2 · Physical reasoning
H: The uniqueness theorem
P: If a potential satisfies Poisson's equation in a region and the given boundary conditions, it's the only solution. So any trick that gets the boundary right gives the answer.
H: Classic images
- **Point charge q at height d above an earthed plane**: image −q at depth d, so V = 0 on the plane. Force on q: q^{2}/(4πε_{0}(2d)^{2}) towards the plane.
- Induced surface charge: σ = −qd/(2π(x^{2} + y^{2} + d^{2})^{3/2}), totalling −q.
- **Charge q at distance a from the centre of an earthed sphere of radius R**: image −qR/a at R^{2}/a from the centre.
- Line charges near cylinders; dielectric interfaces (image charge q(ε_{1} − ε_{2})/(ε_{1} + ε_{2})).
H: Uses
- Capacitance of wires above ground (power lines, circuit-board traces).
- Image forces on electrons near metal surfaces lower the work function (the Schottky effect).
- Antenna design over ground planes.
X: An electron 1 nm from a flat metal surface. Image force?
> F = e^{2}/(4πε_{0}(2 × 10^{-9})^{2}) = 8.99 × 10^{9} × 2.56 × 10^{-38}/4 × 10^{-18} = 5.8 × 10^{-11} N
K: An image solution is valid only in the region outside the conductor, where it satisfies the same equation and boundary values as the real problem.
!: Image charges are fictional and only valid outside the conductor (in the real region); don't use them to find fields inside.
T: Uniqueness theorem | A potential satisfying Poisson's equation and the boundary conditions in a region is the only solution there
T: Image charge | A fictitious charge placed outside the region of interest so that the boundary conditions are met
SUM: Replace a conductor by image charges that make its surface an equipotential.
SUM: A charge near an earthed plane is attracted as if by −q at twice the distance.
EV: established | The method is exact wherever the uniqueness theorem applies.
SRC: OpenStax, University Physics Volume 2, section 6.4 "Conductors in Electrostatic Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium
SRC: OpenStax, University Physics Volume 2, section 7.5 "Equipotential Surfaces and Conductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-5-equipotential-surfaces-and-conductors
Q: What image charge represents an earthed plane? | An equal and opposite charge at the mirror position.
Q: Why does the method of images give the correct answer? | By the uniqueness theorem, a solution satisfying the boundary conditions is the only one.
M1@2: A charge q at distance d above an earthed plane is attracted with force: | q^{2}/(16πε_{0}d^{2}) | q^{2}/(4πε_{0}d^{2}) | 0 | q^{2}/(8πε_{0}d) | The image −q is 2d away, so F = q^{2}/(4πε_{0}(2d)^{2}) = q^{2}/(16πε_{0}d^{2}).
M2@2: The total induced charge on an earthed plane near charge q is: | −q | 0 | +q | −2q | Integrating σ over the whole plane gives −q, the same as the image charge, because every field line from q ends on the plane.
M3@3: A charge q is 3R from the centre of an earthed sphere of radius R. The image charge is: | −q/3 at R/3 from the centre | −q at R from the centre | −q/3 at 3R from the centre | −3q at R/3 from the centre | The image is −qR/a = −q/3 at R^{2}/a = R/3 from the centre, which makes the sphere's surface V = 0.
TF1@1: Image charges can be used to calculate the field inside the conductor. | false | The image reproduces the boundary conditions only for the real region outside; inside the conductor the true field is zero.
SA3@1,2: Explain why replacing an earthed conducting plane by an image charge −q gives the correct field above the plane. | Above the plane there is only the charge q, so the potential must satisfy Poisson's equation with that source, and V = 0 on the plane and at infinity. The pair q and −q at mirror positions satisfies the same equation above the plane, and by symmetry V = 0 everywhere on the plane. By the uniqueness theorem, it is therefore the actual potential in that region. | Same charge in the real region ; Pair gives V = 0 on the plane ; Uniqueness theorem makes it the true solution

## Poisson's equation
S: Poisson's equation relates the electric potential to the charge density producing it. Together with boundary conditions, it determines the potential everywhere: the master equation of electrostatics.
O: Derive Poisson's equation from Gauss's law and E = −∇V
O: Solve Poisson's equation in one dimension with boundary conditions
O: Recognise Poisson's equation in gravity and semiconductor physics
PRE: Gradient, divergence and curl
LV: Year 2 · Application
H: The equation
E: ∇^{2}V = −ρ/ε_{0}
- Combines E = −∇V with Gauss's law ∇·E = ρ/ε_{0}.
- In a dielectric: ∇·(ε∇V) = −ρ_{free}.
- Same equation in gravity (∇^{2}Φ = 4πGρ) and steady heat flow with sources.
H: Solutions
- Point charge: V = q/(4πε_{0}r) (the Green's function).
- General: V(r) = (1/4πε_{0})∫ρ(r′)/|r − r′| dV′, plus a solution of Laplace's equation to meet the boundaries.
- Numerically: finite differences, relaxation, multigrid, finite elements.
H: Semiconductors
P: In a p–n junction, Poisson's equation with the ionised dopant charge gives the depletion-region potential: parabolic on each side, producing the built-in voltage that makes diodes and solar cells work. Device simulators solve it coupled to carrier transport.
X: Uniform charge density ρ between x = 0 and x = d with V = 0 at both ends. Find V(x).
> d^{2}V/dx^{2} = −ρ/ε_{0}; integrate twice and apply V(0) = V(d) = 0
> V = (ρ/2ε_{0})x(d − x), maximum ρd^{2}/(8ε_{0}) at the centre
K: Poisson's equation is Gauss's law written for the potential: charge density sets the curvature of V.
!: Poisson's equation alone has infinitely many solutions; it's the boundary conditions that make the answer unique.
T: Laplacian | The operator ∇^{2} = ∂^{2}/∂x^{2} + ∂^{2}/∂y^{2} + ∂^{2}/∂z^{2}, the divergence of the gradient
T: Green's function | The potential of a unit point source, from which any solution can be built by superposition
SUM: ∇^{2}V = −ρ/ε_{0}, with boundary conditions, fixes V uniquely.
SUM: The same equation governs gravity and depletion regions in semiconductors.
EV: established | Poisson's equation follows exactly from Gauss's law for electrostatic fields.
SRC: OpenStax, University Physics Volume 2, section 7.4 "Determining Field from Potential" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-4-determining-field-from-potential
SRC: OpenStax, University Physics Volume 2, section 6.2 "Explaining Gauss's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-2-explaining-gausss-law
Q: State Poisson's equation. | ∇^{2}V = −ρ/ε_{0}.
Q: Where does Poisson's equation appear in semiconductor devices? | In finding the potential across depletion regions of p–n junctions.
M1@1: Poisson's equation reduces to Laplace's equation when: | ρ = 0 | V = 0 | E = 0 | ε = 0 | In a region with no charge the right-hand side −ρ/ε_{0} vanishes, leaving ∇^{2}V = 0.
M2@3: The gravitational analogue of Poisson's equation is: | ∇^{2}Φ = 4πGρ | F = ma | ∇·B = 0 | E = mc^{2} | Newtonian gravity is also an inverse-square field, so the same mathematics applies, with mass density as the source and a sign for attraction.
M3@2: In one dimension, a region has V'' = −ρ/ε_{0} with ρ > 0 and V = 0 at both ends. The potential inside is: | Positive, with a maximum in the middle | Zero everywhere | Negative, with a minimum in the middle | Linear between the ends | Negative curvature with zero ends makes an upside-down parabola: V rises to a maximum of ρd^{2}/8ε_{0} at the centre.
NUM2@2: For the slab V = (ρ/2ε_{0})x(d − x), with ρ = 1.0 × 10^{-6} C m^{-3} and d = 0.10 m, find the maximum potential, in V (ε_{0} = 8.85 × 10^{-12} F m^{-1}). | 141 | 2% | V | V_{max} = ρd^{2}/(8ε_{0}) = 10^{-6} × 0.01/(8 × 8.85 × 10^{-12}) = 141 V.
SA3@1: Derive Poisson's equation and explain what extra information is needed to find a unique potential. | Gauss's law in differential form is ∇·E = ρ/ε_{0}, and in electrostatics E = −∇V. Substituting gives ∇·(−∇V) = ρ/ε_{0}, so ∇^{2}V = −ρ/ε_{0}. Any solution of Laplace's equation can be added, so the boundary conditions (V or its normal derivative on the boundary) are needed to fix the solution uniquely. | Starts from ∇·E = ρ/ε_{0} ; Substitutes E = −∇V ; Boundary conditions needed for uniqueness

## Laplace's equation
S: In regions without charge, the electric potential obeys Laplace's equation. Its solutions, harmonic functions, are smooth, have no local maxima or minima inside the region, and are fixed entirely by the boundary values.
O: State Laplace's equation and the mean-value property of its solutions
O: Explain Earnshaw's theorem and how ion traps get round it
O: Apply the relaxation method to a grid
PRE: Poisson's equation
LV: Year 2 · Physical reasoning
H: The equation
E: ∇^{2}V = 0
- Cartesian: ∂^{2}V/∂x^{2} + ∂^{2}V/∂y^{2} + ∂^{2}V/∂z^{2} = 0.
H: Key properties
- **Mean-value property**: V at a point equals its average on any sphere around it.
- **No extrema inside**: maxima and minima occur only on the boundaries.
- **Earnshaw's theorem**: no static arrangement of charges can stably trap a charge, because there is no potential minimum in free space. Ion traps use oscillating fields (Paul trap) or a magnetic field (Penning trap) instead.
H: Solving
- Separation of variables in Cartesian, cylindrical (Bessel functions) or spherical (Legendre polynomials) coordinates.
- Relaxation: repeatedly replace each grid value by the average of its neighbours until converged.
- Also governs steady heat flow, ideal fluid flow and gravity in empty space.
X: Relaxation on a grid: one interior point with neighbours 10, 20, 30 and 40 V. Its converged value?
> Average = (10 + 20 + 30 + 40)/4 = 25 V (the discrete mean-value property)
K: Because V at each point is the average of its surroundings, a charge-free region can't contain a potential "bowl" to hold a charge.
!: Earnshaw's theorem rules out stable electrostatic trapping of charges, but dynamic (oscillating-field) and magnetic traps get around it.
T: Harmonic function | A solution of Laplace's equation
T: Earnshaw's theorem | A charge can't be held in stable equilibrium by electrostatic forces alone
SUM: ∇^{2}V = 0 in charge-free regions; solutions average their surroundings.
SUM: No interior extrema means no stable electrostatic trap.
EV: established | The properties of harmonic functions are mathematical theorems; Earnshaw's theorem follows from them.
SRC: OpenStax, University Physics Volume 2, section 7.4 "Determining Field from Potential" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-4-determining-field-from-potential
SRC: OpenStax, University Physics Volume 2, section 7.5 "Equipotential Surfaces and Conductors" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-5-equipotential-surfaces-and-conductors
Q: State Earnshaw's theorem. | A charge can't be held in stable equilibrium by electrostatic forces alone.
Q: What is the mean-value property of harmonic functions? | The value at a point equals the average over any surrounding sphere.
M1@1: Solutions of Laplace's equation have maxima: | Only on boundaries | At the centre of the region | Anywhere in the region | At the charges | By the mean-value property an interior point can't exceed all its neighbours, so extrema lie only on the boundary.
M2@2: Ion traps get around Earnshaw's theorem by using: | Oscillating or magnetic fields | Larger static charges | Gravity | Dielectrics | A Paul trap uses a rapidly oscillating field that averages to a confining force; a Penning trap adds a strong magnetic field.
M3@3: A 2D grid point has neighbours at 0, 0, 100 and 100 V, and the point currently holds 80 V. After one relaxation step it becomes: | 50 V | 80 V | 65 V | 100 V | Relaxation replaces the value with the mean of its four neighbours, (0 + 0 + 100 + 100)/4 = 50 V; its old value plays no part.
TF1@1: In a charge-free region, the potential can have a local minimum. | false | Laplace's equation forbids interior minima: the value at any point equals the average around it, so it can't be lower than all its surroundings.
SA3@2: Use Laplace's equation to explain why a positive ion cannot be trapped in stable equilibrium by fixed charges alone. | Stable equilibrium for a positive ion needs a potential minimum, so that every displacement raises its energy. In the charge-free space where the ion sits, V obeys Laplace's equation, whose solutions have no interior minima: the sum of the curvatures in x, y and z is zero, so if V curves upwards in one direction it must curve downwards in another. The ion can always escape along that direction. | Stability needs a potential minimum ; Laplace's equation: curvatures sum to zero, no interior minima ; There is always an escape direction
`;
