// Unit 15: Electricity and Electrostatics. Format: kit/course/notes.js
export default `
## Electric charge
S: Electric charge is a basic property of matter that makes particles exert electric and magnetic forces on each other. It comes in two kinds, positive and negative: like charges repel, unlike attract.
LV: Introductory · Foundation
O: Describe positive and negative charge and the forces between them
O: Explain charging by friction, conduction and induction
PRE: Newton's law of universal gravitation
H: Facts about charge
- Unit: coulomb (C). The electron carries −e, the proton +e, e = 1.602 × 10^{-19} C.
- Ordinary matter is neutral: electrons balance protons.
- Charging by friction (triboelectric), conduction (contact) or induction (nearby charge rearranges charges, then earthing).
- Quarks carry fractional charges (±⅓e, ±⅔e) but are always confined in whole-charge combinations.
H: Electrostatics in daily life
- Static shocks, lightning, dust on screens, clinging clothes.
- Photocopiers and laser printers use charged drums to hold toner.
- Electrostatic precipitators remove smoke particles from chimneys; spray painting uses charged droplets.
X: A balloon gains −5 nC by rubbing. How many extra electrons?
> N = 5 × 10^{-9}/1.6 × 10^{-19} = 3.1 × 10^{10} electrons
> Tiny compared with the ~10^{24} electrons in the balloon
!: Rubbing doesn't create charge; it transfers electrons from one material to the other.
Q: What is the charge on an electron? | −1.602 × 10^{-19} C.
Q: How does charging by induction work? | A nearby charged object pushes charges within a conductor; earthing removes one kind, leaving the conductor charged.
M1: A rod rubbed with silk becomes positive because: | Electrons moved from the rod to the silk | Protons moved to the rod | Charge was created | Neutrons moved | Only electrons transfer.
M2: Like charges: | Repel | Attract | Don't interact | Neutralise | Basic rule.
T: Electric charge | A property of matter that produces electric and magnetic forces, in coulombs
T: Charging by induction | Charging a conductor without contact, by moving charges with a nearby charged object then earthing
SUM: Like charges repel, unlike attract; objects charge by gaining or losing electrons, not protons.
SUM: The electric force between two electrons is about 10^{42} times their gravitational attraction.
SRC: OpenStax, University Physics Volume 2, section 5.1 "Electric Charge" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-charge
SRC: Purcell E. M., Morin D. J., Electricity and Magnetism, 3rd edition, chapter 1, Cambridge University Press | secondary | 2013
EV: established | Standard electrostatics.
Q: Why does a charged balloon stick to a neutral wall? | It polarises the wall's molecules; the nearer opposite charges are attracted more strongly than the further like charges are repelled.
M3@2,3: A polythene rod rubbed with wool gains −8.0 nC. How many electrons did it gain (e = 1.60 × 10^{−19} C)? | 5.0 × 10^{10} | 5.0 × 10^{−10} | 8.0 × 10^{9} | 1.3 × 10^{−27} | n = q/e = 8.0 × 10^{−9}/1.60 × 10^{−19} = 5.0 × 10^{10}.
SA2@1,2: Describe how to give a metal sphere a positive charge by induction using a negatively charged rod. | Bring the negative rod near (not touching) the sphere: free electrons are repelled to the far side. Earth the far side briefly (touch it or connect to ground) so those electrons flow away. Remove the earth connection, then the rod. The sphere is left with a deficit of electrons: a positive charge spread over its surface. | bring rod near ; electrons repelled ; earth then disconnect ; remove rod, sphere positive

## Conservation and quantisation of charge
S: Electric charge is conserved: the total in an isolated system never changes. It's also quantised: every free particle's charge is a whole-number multiple of e. Both facts are deep features of nature.
LV: Introductory · Foundation
O: Apply conservation of charge to processes including particle reactions
O: Describe Millikan's experiment and the quantisation of charge
PRE: Electric charge
H: Conservation
- In every reaction, decay and collision, total charge before = total charge after.
- Pair production: γ → e^{−} + e^{+} (net zero).
- Beta decay: n → p + e^{−} + ν̄ (0 → +1 − 1 + 0).
- Local conservation: charge can't jump; it flows (continuity equation ∂ρ/∂t + ∇·J = 0).
- Follows (via Noether) from gauge symmetry of electromagnetism.
H: Quantisation
P: Millikan's oil-drop experiment (1909) showed charges on drops are always multiples of 1.6 × 10^{-19} C. Why charge is quantised remains partly mysterious: Dirac showed that if even one magnetic monopole exists, quantum mechanics forces all charges to be quantised; grand unified theories also predict it.
X: A drop's measured charges: 3.2, 4.8, 8.0, 6.4 × 10^{-19} C. What's the basic unit?
> All are multiples of 1.6 × 10^{-19} C (2, 3, 5, 4 times)
!: Quarks have fractional charge but are never seen free; observed charges remain integer multiples of e.
Q: What did Millikan's experiment show? | Charge comes in whole-number multiples of the elementary charge e.
Q: Is charge conserved in pair production? | Yes: the electron and positron charges sum to zero.
M1: In β^{+} decay, a proton becomes a neutron plus: | A positron and neutrino | An electron | A photon only | Two neutrons | Charge +1 → 0 + 1.
M2: Which charge is impossible for an isolated particle? | 2.4 × 10^{-19} C | 3.2 × 10^{-19} C | 1.6 × 10^{-19} C | 0 | Not a multiple of e.
T: Elementary charge | e = 1.602 176 634 × 10^{−19} C, exact since 2019
T: Charge quantisation | Every free charge is a whole-number multiple of e
SUM: Charge is conserved in every interaction, including pair creation (γ → e^{−} + e^{+}).
SUM: Quarks carry ±⅓e or ±⅔e but are always confined in combinations with whole-number charge.
SRC: Millikan R. A., "On the elementary electrical charge and the Avogadro constant", Physical Review 2, 109–143 | primary | 1913 | https://doi.org/10.1103/PhysRev.2.109
SRC: BIPM, The International System of Units (SI Brochure), 9th edition | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
EV: established | No violation of charge conservation has been observed; quantisation holds for every free particle.
Q: How did Millikan show charge is quantised? | Charges on oil drops were always whole-number multiples of one smallest value.
M3@2,3: In Millikan's experiment, a drop of mass 1.6 × 10^{−15} kg is held still between plates 5.0 mm apart at 490 V. How many excess electrons does it carry (g = 9.8 m s^{−2})? | 1 | 10 | 5 | 2 | E = 490/0.0050 = 9.8 × 10^{4} V m^{−1}; q = mg/E = 1.57 × 10^{−14}/9.8 × 10^{4} ≈ 1.6 × 10^{−19} C = e.
SA2@1: Check that charge is conserved in neutron decay: n → p + e^{−} + ν̄_{e}. | Before: the neutron has charge 0. After: proton +e, electron −e, antineutrino 0, totalling 0. Charge is conserved. | neutron charge 0 ; proton +e ; electron −e ; antineutrino 0, total 0

## Conductors, insulators and dielectrics
S: In conductors, charges move freely; in insulators, they're bound. Dielectrics are insulators whose bound charges shift slightly in a field (polarise), reducing the field inside and increasing a capacitor's capacitance.
LV: Introductory · Foundation
O: Explain the difference between conductors and insulators in terms of free charges
O: Describe what a dielectric does in an electric field
PRE: Electric charge
H: Conductors
- Metals: free electrons (~10^{28}–10^{29} m^{-3}); electrolytes: ions; plasmas: ions and electrons.
- In electrostatic equilibrium E = 0 inside; any excess charge sits on the surface.
H: Insulators and dielectrics
- Electrons tightly bound; band gaps of several eV.
- Polarisation: electronic (electron clouds shift), ionic, orientational (polar molecules like water align).
- Relative permittivity ε_{r}: vacuum 1, air 1.0006, glass ~5–10, water ~80, barium titanate > 1000.
- **Dielectric strength**: field at which breakdown occurs (air ~3 MV m^{-1}; PTFE ~60 MV m^{-1}).
H: In between
- Semiconductors: conductivity controllable by doping, light and temperature.
- Superconductors: zero resistance below T_{c}.
X: Why does a charged balloon stick to a neutral wall?
> The balloon's field polarises the wall's molecules; opposite charges shift closer
> Attraction to the near charges exceeds repulsion from the farther ones
!: Dielectrics don't conduct, but they still respond to fields; that response is what makes capacitors and microwave heating work.
Q: What is relative permittivity? | The factor by which a material reduces the electric field (and increases capacitance) compared with vacuum.
Q: What is dielectric strength? | The maximum field a material can withstand before breakdown.
M1: Water has high relative permittivity because: | Its polar molecules align with fields | It's a metal | It has free electrons | It's dense | Orientational polarisation.
M2: Air breaks down (sparks) at about: | 3 MV m^{-1} | 3 kV m^{-1} | 300 V m^{-1} | 3 GV m^{-1} | Dielectric strength.
T: Conductor | A material with charges free to move, such as metals and electrolytes
T: Insulator | A material whose charges are bound in place
T: Dielectric | An insulator that becomes polarised in an electric field
SUM: Conductors: free electrons (metals) or ions (solutions). Insulators: tightly bound electrons.
SUM: Semiconductors lie between, with conductivity strongly dependent on temperature and doping.
SRC: OpenStax, University Physics Volume 2, section 5.2 "Conductors, Insulators, and Charging by Induction" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-2-conductors-insulators-and-charging-by-induction
SRC: Kittel C., Introduction to Solid State Physics, 8th edition, chapters 6–8, Wiley | secondary | 2005
EV: established | Standard; band theory explains the differences.
Q: Why is pure water a poor conductor but tap water a fair one? | Pure water has very few ions; dissolved salts in tap water provide mobile ions.
M3@2,3: Why does a strong enough electric field make air conduct (a spark)? | Free electrons gain enough energy between collisions to ionise molecules, triggering an avalanche | The field heats the air until it melts | The field turns oxygen into a metal | Air molecules align and form a wire | Breakdown in dry air occurs near 3 × 10^{6} V m^{−1}, when ionisation avalanches create a conducting plasma.
SA2@2: Explain why a plastic comb can pick up small bits of paper. | The charged comb's field polarises the paper's molecules: their charges shift slightly, so the side facing the comb has opposite charge. Since the field is stronger closer to the comb, the attraction on the near side beats the repulsion on the far side, and the light paper is lifted. | comb is charged ; paper is polarised ; non-uniform field ; net attraction

## Coulomb's law
S: Coulomb's law gives the force between two point charges: proportional to the product of the charges and inversely proportional to the square of the distance. Electric forces are immensely stronger than gravity.
LV: Introductory · Application
O: Calculate the force between point charges, including as vectors
O: Compare electric and gravitational forces
PRE: Conservation and quantisation of charge
H: The law
E: F = kq_{1}q_{2}/r^{2}, k = 1/(4πε_{0}) = 8.99 × 10^{9} N m^{2} C^{-2}
E: ε_{0} = 8.854 × 10^{-12} F m^{-1}
- Repulsive for like charges, attractive for unlike.
- Forces from several charges add as vectors (superposition).
- In a medium: F = q_{1}q_{2}/(4πε_{0}ε_{r}r^{2}).
H: Strength
P: The electric force between two protons is ~10^{36} times their gravitational attraction. Matter is neutral on large scales, so gravity dominates astronomy, but electric forces hold atoms, molecules and solids together and make things solid to the touch.
X: Force between the proton and electron in hydrogen (r = 5.3 × 10^{-11} m)?
> F = 8.99 × 10^{9} × (1.6 × 10^{-19})^{2}/(5.3 × 10^{-11})^{2} = 8.2 × 10^{-8} N
> Gravity: 3.6 × 10^{-47} N
!: Coulomb's law is for point charges (or spherically symmetric ones); extended shapes need integration.
P: **Investigate with the lab.** Place two charges and move them closer together, watching the force on the test charge grow.
IX: efield
Q: State Coulomb's law. | F = q_{1}q_{2}/(4πε_{0}r^{2}).
Q: How much stronger is electric than gravitational force between two protons? | About 10^{36} times.
M1: Two charges' separation is halved. The force: | Quadruples | Doubles | Halves | Stays the same | Inverse square.
M2: Two 1 μC charges 1 m apart experience: | 9 mN | 9 N | 9 × 10^{9} N | 1 N | k × 10^{-12}.
M2: The distance between two point charges is halved. What happens to the force between them? | It increases four times | It doubles | It halves | It stays the same | Coulomb's law is an inverse square law.
T: Coulomb's law | F = kq_{1}q_{2}/r^{2}, with k = 1/(4πε_{0}) ≈ 8.99 × 10^{9} N m^{2} C^{−2}
T: Permittivity of free space | ε_{0} ≈ 8.854 × 10^{−12} F m^{−1}
SUM: Forces from several charges add as vectors (superposition).
SUM: Inverse-square, like gravity, but can attract or repel and is vastly stronger between particles.
SRC: Coulomb C.-A., "Premier mémoire sur l'électricité et le magnétisme", Mémoires de l'Académie Royale des Sciences, 569–577 | primary | 1785
SRC: OpenStax, University Physics Volume 2, section 5.3 "Coulomb's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-3-coulombs-law
EV: established | Tested to show the exponent is 2 within about 1 part in 10^{16}.
Q: What happens to the Coulomb force if both charges double and the distance doubles? | It stays the same (×4 from charges, ÷4 from distance).
M3@2,3: Charges +2.0 μC and +8.0 μC are 0.30 m apart. Where between them is the net force on a third charge zero? | 0.10 m from the 2.0 μC charge | 0.15 m, at the midpoint | 0.20 m from the 2.0 μC charge | 0.06 m from the 2.0 μC charge | 2/x^{2} = 8/(0.30 − x)^{2} gives (0.30 − x) = 2x, so x = 0.10 m.
SA2@1,2: Calculate the ratio of the electric to gravitational force between a proton and an electron, and explain why gravity still dominates on astronomical scales. | F_{e}/F_{g} = ke^{2}/(Gm_{p}m_{e}) = (8.99 × 10^{9} × 2.56 × 10^{−38})/(6.67 × 10^{−11} × 1.67 × 10^{−27} × 9.11 × 10^{−31}) ≈ 2.3 × 10^{39}. Large bodies are almost exactly neutral, so electric forces cancel, while gravity only attracts and adds up. | ratio formula ; about 2 × 10^{39} ; matter is neutral overall ; gravity always adds

## Electric fields
S: An electric field is the force per unit charge that a test charge would feel at a point. It lets us describe how charges affect the space around them, and fields carry energy and momentum in their own right.
LV: Introductory · Application
O: Calculate electric fields of point charges and uniform fields between plates
O: Describe the motion of a charged particle in a uniform field
PRE: Coulomb's law
H: Definitions
E: E = F/q (N C^{-1} = V m^{-1})
E: E = Q/(4πε_{0}r^{2}) :: point charge
E: E = σ/(2ε_{0}) :: infinite sheet; E = σ/ε_{0} between parallel plates
E: E = λ/(2πε_{0}r) :: infinite line charge
- Superposition: total field is the vector sum.
H: Motion in uniform fields
- A charged particle accelerates at a = qE/m.
- Electron beams in fields follow parabolic paths (like projectiles): cathode-ray tubes, mass spectrometers, inkjet printers.
- Accelerating through potential V gives KE = qV.
H: Typical fields
- Near Earth's surface (fair weather): ~100 V m^{-1} downward.
- Air breakdown: 3 × 10^{6} V m^{-1}.
- In a hydrogen atom: ~5 × 10^{11} V m^{-1}.
X: An electron enters a 2 × 10^{4} V m^{-1} field, travelling 2 × 10^{7} m s^{-1} perpendicular to it, for 5 cm. Deflection?
> t = 0.05/2 × 10^{7} = 2.5 × 10^{-9} s; a = eE/m = 3.5 × 10^{15} m s^{-2}
> y = ½at^{2} = 1.1 cm
!: Field direction is the direction of force on a positive charge; electrons accelerate against the field.
P: **Investigate with the lab.** Move the test charge around a single charge and watch the field arrow change direction and size.
IX: efield
Q: Define electric field strength. | Force per unit positive charge, E = F/q.
Q: What is the field between charged parallel plates? | Uniform, E = V/d = σ/ε_{0}.
M1: The field of a point charge falls with distance as: | 1/r^{2} | 1/r | 1/r^{3} | Constant | Coulomb.
M2: A proton is released in a uniform field. It moves: | Along the field, accelerating | Against the field | In a circle | Not at all | Force qE along E.
M2: Which way does the electric field point near a positive charge? | Away from the charge | Towards the charge | Around the charge in circles | It has no direction | The field shows the force on a positive test charge, which is repelled.
T: Electric field | E = F/q, the force per unit positive test charge, in N C^{−1} or V m^{−1}
T: Uniform field | A field of the same magnitude and direction everywhere, as between parallel plates (E = V/d)
SUM: Point charge: E = kq/r^{2}, radially outward for positive q.
SUM: In a uniform field a charge accelerates like a projectile under gravity: a = qE/m.
SRC: OpenStax, University Physics Volume 2, section 5.4 "Electric Field" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-4-electric-field
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, chapter 2, Pearson | secondary | 2013
EV: established | Standard electrostatics.
Q: What is the field between plates 2.0 cm apart with 100 V across them? | E = V/d = 5000 V m^{−1}.
M3@2,3: An electron enters a 2.0 × 10^{4} V m^{−1} field at 2.0 × 10^{7} m s^{−1}, perpendicular to it, for 5.0 cm. How far is it deflected (e/m = 1.76 × 10^{11} C kg^{−1})? | About 11 mm | About 5.5 mm | About 1.1 mm | About 5.5 cm | t = 0.050/2.0 × 10^{7} = 2.5 × 10^{−9} s; a = eE/m = 3.52 × 10^{15} m s^{−2}; y = ½at^{2} = ½ × 3.52 × 10^{15} × 6.25 × 10^{−18} ≈ 0.011 m.
SA2@2: Explain why the electron's path between deflecting plates is a parabola. | The field is uniform and perpendicular to the electron's initial velocity. Along the plates there's no force, so the electron moves at constant speed; across them it has constant acceleration qE/m. Constant velocity in one direction with constant acceleration in the other gives a parabola, as for a projectile. | uniform field ; constant velocity along the plates ; constant acceleration across ; parabola

## Electric field lines
S: Field lines map an electric field: their direction gives the field's direction, and their density gives its strength. They start on positive charges and end on negative ones, never crossing.
LV: Introductory · Foundation
O: Draw field lines for point charges, dipoles and parallel plates
O: Interpret line density and the rules lines obey
PRE: Electric fields
H: Rules
- Point away from positive, towards negative charges.
- Number of lines from a charge ∝ its magnitude.
- Never cross (the field has one direction at each point).
- Meet conductors at right angles in electrostatics.
- Closer spacing means stronger field.
H: Patterns
- Isolated point charge: radial.
- Dipole: lines curve from + to −.
- Two like charges: lines repel; a neutral point between them.
- Parallel plates: uniform, evenly spaced (with fringing at the edges).
H: Equipotentials
P: Equipotential surfaces are always perpendicular to field lines. No work is done moving a charge along an equipotential. Contour maps of potential, like height contours, show field strength by how close the lines are.
X: Two charges +2q and −q. How many field lines end on −q if 20 leave +2q?
> 10 end on −q; the other 10 go to infinity (the net charge +q)
!: Field lines aren't paths of charges in general; a charge's velocity isn't always along the line.
P: **Investigate with the lab.** Draw the field lines for two like charges and for a dipole. Compare where the lines are closest together.
IX: efield
Q: Why can't field lines cross? | The field has a unique direction at each point.
Q: How do field lines meet a conductor's surface in equilibrium? | At right angles.
M1: Closely spaced field lines indicate: | A strong field | A weak field | Zero field | High potential | Line density ∝ |E|.
M2: Equipotentials and field lines are: | Perpendicular | Parallel | The same | Unrelated | E = −∇V.
M2: What does the spacing of electric field lines show? | The field strength: closer lines mean a stronger field | The direction of the charge's motion | The potential at each point | Nothing about the field | Field line density indicates field strength.
T: Field line | A curve whose tangent gives the field direction at each point
T: Field-line density | The number of lines per unit area crossing a surface, proportional to field strength
SUM: Lines start on positive and end on negative charges, never cross, and meet conductors at right angles.
SUM: The number of lines leaving a charge is proportional to its size.
SRC: OpenStax, University Physics Volume 2, section 5.6 "Electric Field Lines" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-6-electric-field-lines
SRC: Feynman R. P., Leighton R. B., Sands M., The Feynman Lectures on Physics, vol. II, chapter 4 | secondary | 1964 | https://www.feynmanlectures.caltech.edu/II_04.html
EV: established | A standard representation.
Q: Why must field lines meet a conductor's surface at right angles? | A parallel component would push charges along the surface, which can't happen in equilibrium.
M3@2,3: A diagram shows 12 lines leaving charge A and 4 ending on charge B, with no other charges. What can you say? | A is positive and three times the size of B, which is negative; 8 lines go to infinity | A and B have equal and opposite charges | A is negative and B positive | B is three times the size of A | Line number ∝ charge; lines start on positive and end on negative charges, and the extras run off to infinity.
SA2@1,2: Explain why electric field lines can never cross. | At a crossing point the field would have two directions at once, but a field has one definite direction at each point (the direction of force on a test charge). So lines can't cross. | crossing means two directions ; field has one direction at each point ; force on a test charge is unique ; lines can't cross

## Electric potential
S: Electric potential is the potential energy per unit charge at a point, measured relative to a reference (often infinity or earth). It's a scalar, so potentials from many charges simply add, and the field is its downhill slope.
LV: Introductory · Application
O: Calculate potential due to point charges and in uniform fields
O: Relate field to potential gradient: E = −dV/dx
PRE: Electric fields
H: Definitions
E: V = U/q (volts, J C^{-1})
E: V = Q/(4πε_{0}r) :: point charge, zero at infinity
E: E = −dV/dr; E = −∇V
E: ΔV = −∫E·dl
H: Properties
- Scalar: add potentials algebraically.
- Uniform field: V changes linearly, V = Ed.
- Inside a conductor in equilibrium, V is constant.
- Positive charges move from high to low potential; electrons the reverse.
H: Electronvolts
E: 1 eV = 1.602 × 10^{-19} J :: energy gained by e through 1 V
- Atomic energies ~eV; nuclear ~MeV; LHC protons 6.8 TeV.
X: Potential midway between +4 nC and −2 nC charges 0.2 m apart?
> V = k(4 × 10^{-9} − 2 × 10^{-9})/0.1 = 8.99 × 10^{9} × 2 × 10^{-8} = 180 V
!: Zero potential doesn't mean zero field (midway between equal and opposite charges, V = 0 but E ≠ 0).
P: **Investigate with the lab.** Turn on the equipotentials and check that they always cross field lines at right angles.
IX: efield
Q: How is field related to potential? | E = −∇V: the field points down the potential gradient.
Q: What is an electronvolt? | The energy an electron gains moving through 1 V: 1.6 × 10^{-19} J.
M1: The potential 0.3 m from a 3 nC charge is: | 90 V | 300 V | 30 V | 9 V | kQ/r = 8.99 × 10^{9} × 3 × 10^{-9}/0.3.
M2: Electrons naturally move towards: | Higher potential | Lower potential | Zero potential | Equipotentials | Negative charge, lower PE at higher V.
M2: How do equipotential lines relate to field lines? | They are always perpendicular | They are always parallel | They never meet | They are the same lines | No work is done moving along an equipotential, so it must be perpendicular to the field.
T: Electric potential | V, the potential energy per unit charge, in volts (J C^{−1})
T: Equipotential surface | A surface of constant potential; field lines cross it at right angles
SUM: Point charge: V = kq/r (a scalar, so contributions add simply).
SUM: E = −∇V: the field points from high to low potential, strongest where equipotentials are closest.
SRC: OpenStax, University Physics Volume 2, section 7.3 "Electric Potential and Potential Difference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-3-calculations-of-electric-potential
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, chapter 2, Pearson | secondary | 2013
EV: established | Standard electrostatics.
Q: What is the potential midway between equal and opposite point charges? | Zero (but the field isn't zero there).
M3@2,3: The potential along x is V = 50x^{2} V (x in m). What is the field at x = 0.20 m? | −20 V m^{−1} | +20 V m^{−1} | −2.0 V m^{−1} | −10 V m^{−1} | E = −dV/dx = −100x = −20 V m^{−1}, pointing towards decreasing x.
SA2@2: Explain why a bird can sit safely on a high-voltage line. | Both of its feet are on the same wire, at nearly the same potential, so the potential difference across its body is tiny and almost no current flows through it. It's only dangerous if it touches another wire or an earthed object at a different potential. | both feet at the same potential ; no potential difference ; negligible current ; danger only with another conductor

## Electric potential energy
S: Electric potential energy is the energy stored in a configuration of charges because of their positions. It's the work needed to assemble them from far apart, and it drives chemistry, batteries and nuclear stability.
LV: Introductory · Application
O: Calculate the potential energy of point-charge systems
O: Use energy conservation for charges moving in fields
PRE: Electric potential
H: Formulas
E: U = q_{1}q_{2}/(4πε_{0}r) :: two point charges (zero at infinity)
E: U = qV
E: U = ½Σ_{i≠j}q_{i}q_{j}/(4πε_{0}r_{ij}) :: system of charges
E: U = (3/5)Q^{2}/(4πε_{0}R) :: uniform sphere of charge
- Positive U: like charges (energy released if they fly apart). Negative: unlike charges (bound).
H: Applications
- **Atomic binding**: hydrogen's ground-state energy −13.6 eV.
- **Nuclear fission**: the Coulomb energy of a large nucleus helps it split; fragments fly apart with ~200 MeV.
- **Particle accelerators**: ΔKE = qΔV.
- **Classical electron radius**: r_{e} = e^{2}/(4πε_{0}m_{e}c^{2}) = 2.8 fm, where Coulomb self-energy equals rest energy.
X: Energy to bring two protons from infinity to 1 fm apart?
> U = 8.99 × 10^{9} × (1.6 × 10^{-19})^{2}/10^{-15} = 2.3 × 10^{-13} J = 1.44 MeV
> Why fusion needs extreme temperatures (or quantum tunnelling)
!: Potential energy belongs to the system of charges, not to one charge alone.
P: **Investigate with the lab.** Move the test charge towards a like charge and watch the potential energy rise.
IX: efield
Q: What is the potential energy of two point charges? | U = q_{1}q_{2}/(4πε_{0}r).
Q: Why do fission fragments fly apart energetically? | Their mutual Coulomb repulsion converts electric potential energy into kinetic energy.
M1: An alpha particle (2e) accelerated through 1000 V gains: | 2000 eV | 1000 eV | 500 eV | 4000 eV | qV.
M2: The potential energy of two unlike charges is: | Negative | Positive | Zero | Infinite | Attractive ⇒ bound.
M2: A positive charge is pushed towards another positive charge. What happens to its potential energy? | It increases | It decreases | It stays the same | It becomes negative | Work is done against repulsion, so electric potential energy rises.
T: Electric potential energy | U = kq_{1}q_{2}/r for two point charges, zero at infinite separation
T: Electronvolt | The energy gained by one electron through 1 V: 1 eV = 1.60 × 10^{−19} J
SUM: For a system of charges, add kq_{i}q_{j}/r_{ij} over every pair once.
SUM: A charge accelerated through V gains kinetic energy qV.
SRC: OpenStax, University Physics Volume 2, section 7.1 "Electric Potential Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.4, Pearson | secondary | 2013
EV: established | Standard electrostatics.
Q: What is the sign of the potential energy of two opposite charges? | Negative: they attract, so work is needed to separate them.
M3@2,3: An alpha particle (q = 2e) at 5.0 MeV heads straight at a gold nucleus (Z = 79). What is its closest approach distance? | About 45 fm | About 4.5 fm | About 450 fm | About 23 fm | ½mv^{2} = k(2e)(79e)/r: r = 8.99 × 10^{9} × 158 × (1.6 × 10^{−19})^{2}/(8.0 × 10^{−13} J) ≈ 4.5 × 10^{−14} m.
SA2@1: An electron is accelerated from rest through 2000 V. Find its kinetic energy in joules and eV, and its speed (non-relativistic). | KE = eV = 2000 eV = 3.2 × 10^{−16} J. v = √(2KE/m) = √(2 × 3.2 × 10^{−16}/9.11 × 10^{−31}) ≈ 2.65 × 10^{7} m s^{−1}. | KE = eV ; 2000 eV ; 3.2 × 10^{−16} J ; about 2.7 × 10^{7} m s^{−1}

## Voltage and potential difference
S: Voltage, or potential difference, is the energy transferred per unit charge between two points. It drives current through circuits and tells you how much energy each coulomb delivers.
LV: Introductory · Foundation
O: Define potential difference as energy per unit charge
O: Distinguish e.m.f. from potential difference
PRE: Electric potential energy
H: Definitions
E: V = W/Q :: 1 V = 1 J C^{-1}
E: V = Ed :: uniform field
- Measured with a voltmeter in parallel (high resistance).
- Potential difference is between two points; a single point has a potential relative to a reference.
H: Typical voltages
- Nerve impulse: ~0.1 V; AA cell 1.5 V; car battery 12 V; UK mains 230 V rms; power lines 400 kV; lightning ~100 MV.
H: Danger
P: Voltage drives current, but current through the body causes harm: I = V/R_{body}. A van de Graaff generator at 300 kV gives a harmless spark because it stores very little charge; mains at 230 V can kill because it can deliver a sustained current.
X: A 9 V battery drives 2 C round a circuit. Energy transferred?
> W = QV = 18 J
!: "Voltage through" a component is wrong; voltage is across (between two points), current flows through.
P: **Investigate with the lab.** Check the uniform field between the plates and relate it to the voltage across them.
IX: efield
Q: Define potential difference. | The work done (energy transferred) per unit charge moving between two points.
Q: Why is a van de Graaff shock usually harmless despite high voltage? | It stores little charge, so it can't sustain a dangerous current.
M1: How much energy does 3 C gain crossing 12 V? | 36 J | 4 J | 0.25 J | 15 J | W = QV.
M2: Voltmeters are connected: | In parallel | In series | Either | Neither | They measure across components.
M2: Two plates 2 cm apart have 100 V across them. What is the field between them? | 5000 V/m | 50 V/m | 200 V/m | 2 V/m | E = V/d = 100/0.02 = 5000 V/m.
T: Potential difference | Work done per unit charge moving between two points: V = W/q
T: Electromotive force | Energy given per unit charge by a source, such as a cell, as it drives charge round a circuit
SUM: 1 V = 1 J C^{−1}; only differences of potential are physically meaningful.
SUM: e.m.f. is energy supplied per coulomb; terminal p.d. is less when current flows through internal resistance.
SRC: OpenStax, University Physics Volume 2, section 7.2 "Electric Potential and Potential Difference" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/7-2-electric-potential-and-potential-difference
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 24 | secondary | 2013
EV: established | Standard definitions.
Q: How much energy does a 9 V battery give each coulomb of charge? | 9 J.
M3@2,3: A 12 V car battery delivers 50 A for 2.0 s to the starter motor. How much energy does it transfer? | 1.2 kJ | 600 J | 100 J | 24 J | Charge = 50 × 2.0 = 100 C; energy = QV = 100 × 12 = 1200 J.
SA2@1,2: Explain why we say the potential of the Earth is "zero" and why this choice doesn't affect any physical result. | Only differences in potential determine forces and energy changes, so the zero can be put anywhere. The Earth is a huge conductor at a nearly constant potential that everything can be connected to, so it's a convenient reference; shifting all potentials by the same amount leaves every difference, and every result, unchanged. | only differences matter ; zero is a choice ; Earth is a large stable reference ; shifting all potentials changes nothing

## Electric dipoles
S: An electric dipole is a pair of equal and opposite charges separated by a small distance. Many molecules are dipoles; their behaviour in fields explains dielectrics, microwave heating and the structure of water.
LV: Intermediate · Application
O: Calculate the torque and potential energy of a dipole in a uniform field
O: Describe the far field of a dipole
PRE: Electric potential
H: Dipole moment and field
E: p = qd (C m), from − to +
E: V = p cos θ/(4πε_{0}r^{2}); E ∝ p/r^{3} (far away)
- Falls off faster than a point charge field because the charges nearly cancel.
H: In external fields
E: τ = p × E; U = −p·E
- Uniform field: torque aligns p with E; no net force.
- Non-uniform field: net force F = (p·∇)E, pulling dipoles towards stronger field (why neutral objects are attracted to charged ones).
H: Molecular dipoles
P: Water has p = 6.2 × 10^{-30} C m. Microwave ovens' 2.45 GHz fields twist water dipoles back and forth; friction with neighbours heats the food. Dipole–dipole forces and hydrogen bonds give water its high boiling point and surface tension.
X: Torque on a water molecule in 10^{5} V m^{-1} at 90°?
> τ = pE = 6.2 × 10^{-30} × 10^{5} = 6.2 × 10^{-25} N m
!: A dipole in a uniform field feels torque but no net force; it's field gradients that pull.
P: **Investigate with the lab.** Put the test charge on the line between the dipole's charges and see the field point from + to −.
IX: efield
Q: What is the electric dipole moment? | p = qd, pointing from the negative to the positive charge.
Q: Why do dipole fields fall faster than point-charge fields? | The opposite charges' fields largely cancel at large distances (E ∝ 1/r^{3}).
M1: The energy of a dipole is lowest when p is: | Parallel to E | Antiparallel | Perpendicular | Zero | U = −pE cos θ.
M2: In a uniform field a dipole experiences: | Torque but no net force | Net force only | Neither | Both equally | Equal opposite forces.
M2: What is an electric dipole? | Equal and opposite charges a small distance apart | Two equal positive charges | A single charge in a uniform field | A charge moving in a circle | A dipole is a pair of equal and opposite charges separated by a small distance.
T: Dipole moment | p = qd, pointing from the negative to the positive charge
T: Polar molecule | A molecule with a permanent dipole moment, such as water
SUM: Torque τ = p × E; energy U = −p·E, lowest when p is aligned with E.
SUM: Far away, a dipole's field falls as 1/r^{3}, faster than a single charge's 1/r^{2}.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 4.1, Pearson | secondary | 2013
SRC: OpenStax, University Physics Volume 2, section 5.7 "Electric Dipoles" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-7-electric-dipoles
EV: established | Standard electrostatics.
Q: Does a dipole feel a net force in a uniform field? | No, only a torque; a net force needs a non-uniform field.
M3@2,3: A water molecule (p = 6.2 × 10^{−30} C m) is in a 1.0 × 10^{6} V m^{−1} field. How much energy does it take to turn it from aligned to anti-aligned? | 1.2 × 10^{−23} J | 6.2 × 10^{−24} J | 6.2 × 10^{−36} J | 1.2 × 10^{−17} J | ΔU = 2pE = 2 × 6.2 × 10^{−30} × 10^{6} = 1.24 × 10^{−23} J, far below k_{B}T ≈ 4 × 10^{−21} J, so alignment is only slight.
SA2@2: Explain how a microwave oven heats water using dipoles. | Water molecules are polar. The oven's oscillating field (2.45 GHz) keeps exerting torques that try to align the dipoles first one way, then the other. Their rotation is resisted by collisions with neighbours, turning the field's energy into random thermal motion, so the water heats. | water molecules are dipoles ; oscillating field gives changing torque ; rotation resisted by neighbours ; energy becomes heat

## Electric flux
S: Electric flux measures how much electric field passes through a surface: field strength times area, counting only the component perpendicular to the surface. Gauss's law relates the flux through a closed surface to the charge inside.
LV: Intermediate · Foundation
O: Calculate electric flux through flat and closed surfaces
O: Explain why flux through a closed surface depends only on enclosed charge
PRE: Electric field lines
H: Definition
E: Φ_{E} = E·A = EA cos θ :: uniform field, flat surface
E: Φ_{E} = ∫E·dA :: general
- Units: N m^{2} C^{-1} (or V m).
- Closed surfaces: outward normal; outgoing flux positive.
H: Picture
P: Flux counts field lines crossing a surface. A closed surface with no charge inside has as many lines entering as leaving: zero net flux. Lines from charge inside must all cross the surface, giving flux Q/ε_{0} whatever the surface's shape or size.
X: A uniform field 500 N C^{-1} crosses a 0.1 m^{2} disc at 30° to its surface. Flux?
> Angle to the normal = 60°
> Φ = 500 × 0.1 × cos 60° = 25 N m^{2} C^{-1}
!: θ in Φ = EA cos θ is measured from the surface's normal, not from the surface.
Q: Define electric flux. | Φ = ∫E·dA, the field component normal to a surface integrated over it.
Q: What is the net flux through a closed surface with no charge inside? | Zero.
M1: A field parallel to a surface gives flux: | 0 | EA | Maximum | Negative | cos 90°.
M2: The flux through a closed sphere around charge Q depends on: | Q only | The sphere's radius | The charge's position inside | Both radius and Q | Gauss's law.
T: Electric flux | Φ = ∫E·dA, the field passing through a surface
T: Closed surface | A surface with no edges that encloses a volume, used in Gauss's law
SUM: Uniform field through a flat area: Φ = EA cos θ.
SUM: Field lines from outside charges enter and leave a closed surface, contributing no net flux.
SRC: OpenStax, University Physics Volume 2, section 6.1 "Electric Flux" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-1-electric-flux
SRC: Purcell E. M., Morin D. J., Electricity and Magnetism, 3rd edition, chapter 2, Cambridge University Press | secondary | 2013
EV: established | Standard electrostatics.
Q: What is the flux through a surface parallel to a uniform field? | Zero.
M3@2,3: A uniform field of 200 N C^{−1} passes through a 0.50 m^{2} square tilted at 60° to the field lines. What is the flux? | About 87 N m^{2} C^{−1} | 50 N m^{2} C^{−1} | 100 N m^{2} C^{−1} | 0 N m^{2} C^{−1} | The angle to the normal is 30°: Φ = EA cos 30° = 200 × 0.50 × 0.866 ≈ 87 N m^{2} C^{−1}.
SA2@1: A charge of 1.0 nC is at the centre of a cube. What is the flux through one face? | The total flux through the closed cube is q/ε_{0} = 10^{−9}/8.85 × 10^{−12} ≈ 113 N m^{2} C^{−1}. By symmetry each of the 6 faces gets a sixth: about 19 N m^{2} C^{−1}. | total flux q/ε_{0} ; about 113 N m^{2} C^{−1} ; symmetry ; one sixth, about 19

## Gauss's law
S: Gauss's law states that the electric flux out of any closed surface equals the enclosed charge divided by ε_{0}. With symmetry, it finds fields in one line, and it's one of Maxwell's four equations.
LV: Intermediate · Application
O: State Gauss's law and use it to find fields of symmetric charge distributions
O: Choose a Gaussian surface that matches the symmetry
PRE: Electric flux
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
> E = Qr/(4πε_{0}R^{3}), rising linearly from zero
!: Gauss's law is always true, but it only gives the field easily when symmetry makes E constant over the surface.
Q: State Gauss's law. | The net electric flux through a closed surface equals the enclosed charge divided by ε_{0}.
Q: What Gaussian surface suits a long charged wire? | A coaxial cylinder.
M1: The field just outside a conductor with surface charge density σ is: | σ/ε_{0} | σ/2ε_{0} | 0 | 2σ/ε_{0} | Only one side has field.
M2: The field inside a uniformly charged hollow sphere is: | Zero | Q/(4πε_{0}r^{2}) | Constant non-zero | Infinite | No enclosed charge.
T: Gauss's law | ∮E·dA = Q_{enc}/ε_{0}
T: Gaussian surface | An imaginary closed surface chosen to make E·dA simple to evaluate
SUM: Spherical: E = kQ/r^{2}. Line charge: E = λ/(2πε_{0}r). Infinite sheet: E = σ/(2ε_{0}).
SUM: Gauss's law always holds, but it only gives E easily when symmetry makes |E| constant on the surface.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.2, Pearson | secondary | 2013
SRC: OpenStax, University Physics Volume 2, section 6.3 "Applying Gauss's Law" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-3-applying-gausss-law
EV: established | One of Maxwell's equations.
Q: What is the field inside a uniformly charged hollow spherical shell? | Zero: a Gaussian sphere inside encloses no charge.
M3@2,3: A long wire carries λ = 2.0 nC m^{−1}. What is the field 0.10 m from it? | About 360 N C^{−1} | About 1800 N C^{−1} | About 36 N C^{−1} | About 3600 N C^{−1} | E = λ/(2πε_{0}r) = 2.0 × 10^{−9}/(2π × 8.85 × 10^{−12} × 0.10) ≈ 360 N C^{−1}.
SA2@1,2: Use Gauss's law to find the field inside a uniformly charged solid sphere of radius R and total charge Q. | A Gaussian sphere of radius r < R encloses Q(r/R)^{3}. By symmetry E is radial and uniform on it: E × 4πr^{2} = Q r^{3}/(ε_{0}R^{3}). So E = Qr/(4πε_{0}R^{3}), rising linearly from zero at the centre to kQ/R^{2} at the surface. | Gaussian sphere inside ; enclosed charge ∝ r^{3} ; E × 4πr^{2} = Q_{enc}/ε_{0} ; E ∝ r

## Charge distributions
S: Real charges are spread over lines, surfaces and volumes. Their fields come from integrating Coulomb's law over the distribution, or from Gauss's law when there's enough symmetry.
LV: Intermediate · Application
O: Describe line, surface and volume charge densities
O: Calculate fields by integrating Coulomb's law over a distribution
PRE: Gauss's law
H: Densities
E: dq = λ dl (line, C m^{-1}); dq = σ dA (surface, C m^{-2}); dq = ρ dV (volume, C m^{-3})
E: E = (1/4πε_{0})∫dq r̂/r^{2}; V = (1/4πε_{0})∫dq/r
H: Standard results
- Ring (radius a, on axis at z): E = Qz/(4πε_{0}(z^{2} + a^{2})^{3/2}).
- Disc (on axis): E = (σ/2ε_{0})(1 − z/√(z^{2} + a^{2})); → σ/2ε_{0} near the centre.
- Finite line segment: depends on the angles subtended.
H: Multipole expansion
P: Far from any distribution, V ≈ (1/4πε_{0})[Q/r + p·r̂/r^{2} + quadrupole/r^{3} + …]. The net charge dominates; if it's zero, the dipole moment does; and so on. Molecules and nuclei are characterised by their dipole and quadrupole moments.
X: Field on the axis of a ring (Q = 10 nC, a = 0.1 m) at z = 0.1 m?
> E = 8.99 × 10^{9} × 10^{-8} × 0.1/(0.02)^{3/2} = 3.2 × 10^{3} N C^{-1}
!: Integrate field vectors component by component; symmetry often cancels components but don't assume it without checking.
Q: What is the field on the axis of a charged ring at its centre? | Zero, by symmetry.
Q: What is the multipole expansion? | Writing a distribution's distant potential as monopole, dipole, quadrupole… terms falling as successively higher powers of 1/r.
M1: Far from a neutral molecule with a dipole moment, the potential falls as: | 1/r^{2} | 1/r | 1/r^{3} | Constant | Dipole term.
M2: Linear charge density has units: | C m^{-1} | C m^{-2} | C m^{-3} | C | Charge per length.
T: Linear charge density | λ, charge per unit length, in C m^{−1}
T: Surface charge density | σ, charge per unit area, in C m^{−2}
T: Volume charge density | ρ, charge per unit volume, in C m^{−3}
SUM: E = k∫dq r̂/r^{2}; use symmetry to cancel components before integrating.
SUM: On the axis of a ring of charge Q and radius a: E = kQx/(x^{2} + a^{2})^{3/2}.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.1, Pearson | secondary | 2013
SRC: OpenStax, University Physics Volume 2, section 5.5 "Calculating Electric Fields of Charge Distributions" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/5-5-calculating-electric-fields-of-charge-distributions
EV: established | Standard electrostatics.
Q: What is the field at the centre of a uniformly charged ring? | Zero, by symmetry.
M3@2,3: Far from a ring of charge (x ≫ a), what does the axial field E = kQx/(x^{2} + a^{2})^{3/2} become? | kQ/x^{2}, like a point charge | kQ/a^{2}, independent of distance | kQx/a^{3}, growing with x | zero, at every large distance | For x ≫ a, (x^{2} + a^{2})^{3/2} ≈ x^{3}, so E ≈ kQ/x^{2}: from far away the ring looks like a point.
SA2@2: Explain why the field just outside a large, uniformly charged flat sheet doesn't depend on the distance from it. | Field lines from an infinite sheet are all perpendicular to it and parallel to one another, so they don't spread out with distance. Equivalently, a Gaussian pillbox gives E = σ/(2ε_{0}) whatever its height; moving away, more distant parts of the sheet contribute at angles that compensate. | lines perpendicular and parallel ; no spreading ; Gauss's law with a pillbox ; E = σ/2ε_{0}

## Conductors in electrostatic equilibrium
S: In electrostatic equilibrium, charges in a conductor have stopped moving. This forces the field inside to be zero, all excess charge to sit on the surface, and the surface to be an equipotential.
LV: Intermediate · Foundation
O: State the properties of a conductor in electrostatic equilibrium
O: Explain why charge concentrates at sharp points
PRE: Gauss's law
H: Properties
- E = 0 inside the material.
- Net charge on the outer surface only.
- Just outside, E is perpendicular to the surface with magnitude σ/ε_{0}.
- The whole conductor is at one potential.
- Charge concentrates where curvature is greatest (sharp points).
H: Sharp points
P: σ ∝ 1/radius of curvature for connected conductors, so fields at sharp points are intense. They can ionise air (corona discharge, St Elmo's fire). Lightning rods use points to provide a preferred strike path; high-voltage equipment uses rounded surfaces to avoid discharge.
H: Cavities
- A hollow conductor's cavity has zero field if it contains no charge (shielding).
- A charge in the cavity induces equal opposite charge on the inner wall; the outside sees the total.
X: Two connected metal spheres, radii 1 cm and 10 cm, share charge. Compare surface fields.
> Same potential: Q_{1}/r_{1} = Q_{2}/r_{2}
> E ∝ Q/r^{2} ∝ 1/r: the small sphere's field is 10 times stronger
!: Equilibrium means no current; once current flows (in a circuit), there is a field inside the wire.
Q: Why is the field zero inside a conductor in equilibrium? | Otherwise free charges would move, contradicting equilibrium.
Q: Why does charge concentrate at sharp points? | Equal potential requires higher surface charge density where curvature is greater.
M1: Excess charge on an isolated conductor resides: | On its outer surface | Uniformly through it | At its centre | Only at points | Gauss's law inside.
M2: Corona discharge occurs at: | Sharp points of high-voltage conductors | Flat surfaces | Inside conductors | Insulators | Intense local fields.
T: Electrostatic equilibrium | The state in which no charges in a conductor are moving
T: Corona discharge | Ionisation of air near sharp, highly charged points
SUM: Inside: E = 0 and no net charge; outside surface: E = σ/ε_{0}, perpendicular; the conductor is an equipotential.
SUM: Charge density, and so field, is greatest where the surface curves most sharply.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.5, Pearson | secondary | 2013
SRC: OpenStax, University Physics Volume 2, section 6.4 "Conductors in Electrostatic Equilibrium" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium
EV: established | Standard electrostatics.
Q: Why are lightning conductors pointed? | Strong fields at the point ionise air, providing a safe discharge path.
M3@2,3: Two conducting spheres of radii 1.0 cm and 3.0 cm are joined by a long wire and charged. What is the ratio of surface field at the small sphere to the large one? | 3 | 1/3 | 1 | 9 | Equal potentials: kQ_{1}/r_{1} = kQ_{2}/r_{2}, so Q ∝ r and E = kQ/r^{2} ∝ 1/r; the small sphere's field is three times larger.
SA2@1,2: Explain why the electric field inside a conductor in equilibrium is zero. | If there were a field inside, the free charges would feel a force and move, so it wouldn't be in equilibrium. Charges rearrange (within about 10^{−19} s in metals) on the surface until their own field exactly cancels any applied field inside. | free charges move in any field ; equilibrium means no motion ; charges rearrange on the surface ; their field cancels the applied field

## Capacitance
S: Capacitance is the ability of a conductor arrangement to store charge per volt. Capacitors store energy in electric fields and are essential in electronics for timing, filtering, smoothing and quick bursts of power.
LV: Introductory · Foundation
O: Define capacitance and use Q = CV
O: Describe how capacitance depends on geometry and the material between the plates
PRE: Conductors in electrostatic equilibrium
H: Definition
E: C = Q/V (farads)
E: C = 4πε_{0}R :: isolated sphere (Earth: ~0.7 mF)
- Depends only on geometry and the dielectric, not on Q or V.
- Practical capacitors: pF to F; supercapacitors reach thousands of F.
H: Types
- Ceramic, film, electrolytic (polarised, large C), tantalum, supercapacitors (electric double layer, huge effective area).
H: Uses
- Smoothing rectified DC; filters; timing (RC); coupling AC while blocking DC.
- Camera flashes and defibrillators (fast energy release).
- Touchscreens sense finger capacitance; capacitive microphones and sensors.
- DRAM: each bit is a tiny capacitor (~10 fF).
X: A capacitor stores 60 μC at 12 V. Capacitance?
> C = 60 × 10^{-6}/12 = 5 μF
!: A farad is huge; isolated objects have tiny capacitance (a person ~100 pF).
P: **Investigate with the lab.** Change the capacitance and watch how much charge the capacitor stores and how long it takes to charge.
IX: transients
Q: Define capacitance. | Charge stored per unit potential difference, C = Q/V.
Q: How do touchscreens detect a finger? | The finger changes the capacitance of electrodes under the screen.
M1: A 100 μF capacitor at 9 V holds: | 900 μC | 11 μC | 9 μC | 0.9 μC | Q = CV.
M2: Capacitance depends on: | Geometry and dielectric | Charge stored | Voltage applied | Current | Q ∝ V.
M2: A 470 μF capacitor is charged to 10 V. How much charge does it store? | 4.7 mC | 47 C | 4.7 C | 0.047 mC | Q = CV = 470 × 10⁻⁶ × 10 = 4.7 × 10⁻³ C.
T: Capacitance | C = Q/V, charge stored per volt, in farads
T: Relative permittivity | ε_{r}, the factor by which a dielectric raises capacitance
SUM: C depends only on geometry and the dielectric, not on Q or V.
SUM: A 1 F capacitor is very large; typical circuit values are pF to μF (supercapacitors reach thousands of farads).
SRC: OpenStax, University Physics Volume 2, section 8.1 "Capacitors and Capacitance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance
SRC: Horowitz P., Hill W., The Art of Electronics, 3rd edition, chapter 1, Cambridge University Press | secondary | 2015
EV: established | Standard electrostatics.
Q: What charge does a 470 μF capacitor hold at 12 V? | Q = CV = 5.6 × 10^{−3} C.
M3@2,3: An isolated metal sphere of radius 0.10 m: what is its capacitance? | About 11 pF | About 11 μF | About 1.1 nF | About 0.11 pF | C = 4πε_{0}R = 4π × 8.85 × 10^{−12} × 0.10 ≈ 1.1 × 10^{−11} F; even the Earth is only about 710 μF.
SA2@2: A capacitor is charged and then disconnected; its plates are pulled further apart. What happens to Q, C and V? | Disconnected, Q can't change. C = ε_{0}A/d falls as d increases. So V = Q/C rises in proportion to d (the field Q/ε_{0}A stays the same, over a longer distance). | Q constant when isolated ; C falls with d ; V rises ; field unchanged

## Parallel-plate and spherical capacitors
S: Simple geometries give simple formulas for capacitance. Parallel plates are the standard model; spherical and cylindrical capacitors describe cables and isolated conductors.
LV: Intermediate · Application
O: Derive the capacitance of parallel-plate, spherical and cylindrical capacitors
O: Calculate the effect of a dielectric
PRE: Capacitance
H: Formulas
E: C = ε_{0}ε_{r}A/d :: parallel plates (ignoring edge effects)
E: C = 4πε_{0}ε_{r}ab/(b − a) :: concentric spheres, radii a < b
E: C/L = 2πε_{0}ε_{r}/ln(b/a) :: coaxial cable per length
- Larger area, smaller gap or higher ε_{r} ⇒ larger C.
H: Design limits
- Smaller gap increases C but lowers breakdown voltage (V_{max} = E_{breakdown}d).
- Multilayer ceramic capacitors stack hundreds of thin layers.
- Electrolytic capacitors use a nanometre oxide layer as the dielectric.
X: Parallel plates 10 cm × 10 cm, 1 mm apart, in air. Capacitance? And with glass (ε_{r} = 6)?
> C = 8.85 × 10^{-12} × 0.01/0.001 = 88.5 pF
> With glass: 531 pF
!: Moving charged, isolated plates apart (Q fixed) raises V; with a battery attached (V fixed), Q falls. Keep track of what's held constant.
P: **Investigate with the lab.** Use the parallel plates and check the field between them is nearly uniform, except near the edges.
IX: efield
Q: What is the capacitance of a parallel-plate capacitor? | C = ε_{0}ε_{r}A/d.
Q: Why does reducing the plate gap have a limit? | The breakdown voltage falls in proportion to the gap.
M1: Doubling plate area and halving the separation multiplies C by: | 4 | 2 | 1 | 1/4 | A/d.
M2: Coaxial cable capacitance per metre depends on: | ln(b/a) and ε_{r} | Length only | Current | Frequency only | C/L = 2πε/ln(b/a).
M2: Why is the field between parallel plates uniform? | The field lines are parallel and evenly spaced away from the edges | The plates carry no charge | The voltage is zero between the plates | The plates are infinitely far apart | Away from the edges, the field is perpendicular to the plates and of constant strength.
T: Parallel-plate capacitance | C = ε_{0}ε_{r}A/d
T: Spherical capacitor | Concentric spheres of radii a < b: C = 4πε_{0}ab/(b − a)
T: Fringing field | The non-uniform field near the edges of real plates
SUM: Cylindrical (coaxial): C per length = 2πε_{0}/ln(b/a).
SUM: Inserting a dielectric of ε_{r} multiplies C by ε_{r}.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.5, Pearson | secondary | 2013
SRC: OpenStax, University Physics Volume 2, section 8.1 "Capacitors and Capacitance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance
EV: established | Exact for ideal geometries; real plates have fringing.
Q: How does halving the plate separation affect capacitance? | It doubles.
M3@2,3: Plates of area 0.010 m^{2} are 0.10 mm apart with a dielectric of ε_{r} = 4.0. What is the capacitance? | About 3.5 nF | About 0.89 nF | About 35 nF | About 3.5 pF | C = ε_{0}ε_{r}A/d = 8.85 × 10^{−12} × 4.0 × 0.010/1.0 × 10^{−4} ≈ 3.5 × 10^{−9} F.
SA2@1,2: Show that a spherical capacitor becomes a parallel-plate capacitor when the gap is small. | C = 4πε_{0}ab/(b − a). If b − a = d ≪ a, then ab ≈ a^{2}, so C ≈ ε_{0}(4πa^{2})/d = ε_{0}A/d with A the sphere's area: the parallel-plate formula. | spherical formula ; gap small compared with radius ; ab ≈ a^{2} ; gives ε_{0}A/d

## Capacitors in series and parallel
S: Capacitors combine opposite to resistors: in parallel their capacitances add; in series their reciprocals add. Parallel capacitors share voltage; series capacitors share charge.
LV: Introductory · Application
O: Combine capacitors in series and parallel
O: Find the charge and p.d. on each capacitor in a network
PRE: Capacitance
H: Rules
E: C_{parallel} = C_{1} + C_{2} + …
E: 1/C_{series} = 1/C_{1} + 1/C_{2} + …
- Parallel: same V across each; charges add.
- Series: same Q on each; voltages add; the smallest capacitor takes the largest voltage.
H: Why
P: Parallel capacitors are like one capacitor with more plate area. Series capacitors are like one with a wider gap: each plate's charge induces equal and opposite charge on the next.
X: 2 μF and 3 μF in series across 10 V. Charge and voltages?
> C = 6/5 = 1.2 μF; Q = 12 μC
> V_{2μF} = 6 V; V_{3μF} = 4 V
!: Series capacitors rated for a voltage don't share it equally unless they're identical; use balancing resistors in high-voltage banks.
Q: How do capacitors combine in parallel? | Their capacitances add.
Q: In series, what's the same for each capacitor? | The charge.
M1: Two 10 μF capacitors in series give: | 5 μF | 20 μF | 10 μF | 100 μF | Reciprocal sum.
M2: In series, the capacitor with the smallest C has: | The largest voltage | The smallest voltage | The same voltage | Zero charge | V = Q/C.
T: Parallel combination | C = C_{1} + C_{2}: same p.d., charges add
T: Series combination | 1/C = 1/C_{1} + 1/C_{2}: same charge, p.d.s add
SUM: Capacitors combine the opposite way to resistors.
SUM: In series, the smallest capacitor takes the largest share of the voltage.
SRC: OpenStax, University Physics Volume 2, section 8.2 "Capacitors in Series and in Parallel" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-2-capacitors-in-series-and-in-parallel
SRC: Halliday D., Resnick R., Walker J., Fundamentals of Physics, 10th edition, chapter 25 | secondary | 2013
EV: established | Standard circuit theory.
Q: Why do capacitors in series carry equal charge? | Charge drawn onto one plate induces an equal and opposite charge on the next, which is isolated between them.
M3@2,3: 2.0 μF and 6.0 μF capacitors in series across 12 V. What is the p.d. across the 2.0 μF capacitor? | 9.0 V | 3.0 V | 6.0 V | 12 V | C = 1.5 μF; Q = 18 μC; V = Q/C = 18/2.0 = 9.0 V on the smaller capacitor.
SA2@2: Three 3.0 μF capacitors: two in parallel, in series with the third, across 9.0 V. Find the total capacitance and the charge from the supply. | The parallel pair gives 6.0 μF; in series with 3.0 μF: 1/C = 1/6 + 1/3 = 1/2, so C = 2.0 μF. Q = CV = 2.0 × 9.0 = 18 μC. | parallel pair 6.0 μF ; series with 3.0 μF ; C = 2.0 μF ; Q = 18 μC

## Energy stored in electric fields
S: Charging a capacitor stores energy, and that energy lives in the electric field between the plates. Every electric field holds energy, with a density proportional to the field squared.
LV: Intermediate · Application
O: Calculate energy stored in a capacitor in three equivalent forms
O: Use the energy density ½ε_{0}E^{2}
PRE: Capacitors in series and parallel
H: Formulas
E: U = ½QV = ½CV^{2} = Q^{2}/(2C)
E: u = ½ε_{0}ε_{r}E^{2} :: energy density (J m^{-3})
- Half the energy drawn from a battery while charging a capacitor through a resistor is dissipated as heat, regardless of R.
H: Applications
- Defibrillator: ~150–360 J from a ~100 μF capacitor at ~2 kV.
- Flash photography, pulsed lasers, railguns, fusion experiments (NIF capacitor banks store ~400 MJ).
- Supercapacitors for regenerative braking and quick charging.
H: Field energy is real
P: Electromagnetic waves carry energy through empty space at u = ε_{0}E^{2} (electric plus equal magnetic). The energy isn't in the charges but spread through the field.
X: A 2000 μF capacitor at 400 V. Stored energy?
> U = ½ × 2 × 10^{-3} × 160 000 = 160 J
!: Large capacitors can stay charged long after power is removed; discharge them safely.
Q: What is the energy stored in a capacitor? | U = ½CV^{2}.
Q: What is the energy density of an electric field? | u = ½ε_{0}E^{2} (in vacuum).
M1: Doubling the voltage on a capacitor multiplies its energy by: | 4 | 2 | 8 | √2 | ∝ V^{2}.
M2: Charging a capacitor from a battery through a resistor wastes: | Half the energy supplied | None | All of it | A quarter | Independent of R.
T: Energy stored | U = ½QV = ½CV^{2} = Q^{2}/(2C)
T: Energy density | u = ½ε_{0}E^{2}, the energy per unit volume of an electric field
SUM: Half the energy drawn from a battery while charging a capacitor through a resistor is lost as heat.
SUM: Energy is stored in the field itself, wherever E is non-zero.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.4, Pearson | secondary | 2013
SRC: OpenStax, University Physics Volume 2, section 8.3 "Energy Stored in a Capacitor" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-3-energy-stored-in-a-capacitor
EV: established | Standard electrostatics.
Q: Why is the energy stored ½QV, not QV? | The voltage rises from 0 to V as charge is added, so the average voltage is V/2.
M3@2,3: A camera flash's 150 μF capacitor is charged to 300 V and discharged in 1.0 ms. What is the average power? | About 6.8 kW | About 45 W | About 13.5 kW | About 6.8 W | U = ½CV^{2} = ½ × 150 × 10^{−6} × 9.0 × 10^{4} = 6.75 J; P = 6.75/0.0010 ≈ 6.8 kW.
SA2@1,2: Show that charging a capacitor from a battery through a resistor always wastes half the battery's energy, whatever the resistance. | The battery moves charge Q = CV at a constant e.m.f. V, supplying QV = CV^{2}. The capacitor stores ½CV^{2}. The rest, ½CV^{2}, is dissipated in the resistor; R only changes how fast it happens, not how much. | battery supplies QV = CV^{2} ; capacitor stores ½CV^{2} ; difference dissipated ; independent of R

## Dielectric polarisation
S: In an electric field, a dielectric's bound charges shift, creating tiny dipoles throughout the material. Their combined effect reduces the field inside and increases the charge a capacitor can store at a given voltage.
LV: Intermediate · Foundation
O: Explain polarisation by induced and permanent dipoles
O: Relate polarisation, bound charge and relative permittivity
PRE: Electric dipoles
H: Describing polarisation
E: P = dipole moment per unit volume (C m^{-2})
E: D = ε_{0}E + P = ε_{0}ε_{r}E :: electric displacement
E: P = ε_{0}χ_{e}E, ε_{r} = 1 + χ_{e} :: linear dielectric
E: σ_{bound} = P·n̂; ρ_{bound} = −∇·P
H: Mechanisms
- Electronic: all materials, fastest (works up to optical frequencies; gives refractive index n = √ε_{r}).
- Ionic: ionic crystals (infrared frequencies).
- Orientational: polar molecules (microwave frequencies; water's ε_{r} falls from 80 to ~1.8 at optical frequencies).
H: Special dielectrics
- **Ferroelectrics** (BaTiO_{3}): spontaneous polarisation, hysteresis; used in memories and high-C capacitors.
- **Piezoelectrics** (quartz, PZT): polarisation from strain and vice versa; used in sensors, actuators, clocks, ultrasound transducers.
- **Electrets**: permanently polarised (microphones).
X: Inserting a dielectric (ε_{r} = 4) into an isolated charged capacitor. What happens to V and U?
> Q fixed; C increases 4 times ⇒ V falls to V/4
> U = Q^{2}/(2C) falls to U/4; the dielectric is pulled in
!: Dielectric "constants" depend on frequency and temperature; a value for DC can be badly wrong for light.
Q: What is the electric displacement D? | D = ε_{0}E + P; its divergence equals free charge density.
Q: Why does water's permittivity fall at optical frequencies? | Molecules can't reorient fast enough; only electronic polarisation remains.
M1: A piezoelectric material: | Polarises when strained | Conducts perfectly | Is magnetic | Has ε_{r} = 1 | Mechanical ↔ electrical coupling.
M2: Refractive index is related to permittivity by: | n = √ε_{r} | n = ε_{r} | n = 1/ε_{r} | n = ε_{r}^{2} | For non-magnetic materials.
T: Polarisation | P, the dipole moment per unit volume of a material
T: Bound charge | Surface and volume charge arising from polarisation, not free to move
T: Dielectric strength | The largest field a dielectric can take before breaking down
SUM: Bound charges partly cancel the applied field inside, reducing it by ε_{r}: E = E_{0}/ε_{r}.
SUM: Water has ε_{r} ≈ 80 because its molecules have large permanent dipoles; air ≈ 1.0006.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, chapter 4, Pearson | secondary | 2013
SRC: OpenStax, University Physics Volume 2, section 8.5 "Molecular Model of a Dielectric" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/8-5-molecular-model-of-a-dielectric
EV: established | Standard; ε_{r} depends on frequency and temperature.
Q: Why does water dissolve salts so well? | Its high ε_{r} weakens the attraction between ions by a factor of about 80, so they separate easily.
M3@2,3: A capacitor at 100 V stays connected to its battery while a dielectric of ε_{r} = 3.0 slides in. What happens to Q and the stored energy? | Both triple | Q triples, energy stays the same | Both fall to a third | Q stays the same, energy falls to a third | With V fixed, C triples, so Q = CV and U = ½CV^{2} both triple; the battery supplies the extra.
SA2@1,2: Explain why inserting a dielectric into an isolated charged capacitor lowers its voltage. | The dielectric's molecules polarise, creating bound surface charges opposite to the plates' charges. These partly cancel the field inside, reducing it by ε_{r}. With Q fixed and the field smaller, V = Ed falls by ε_{r} (equivalently C rises by ε_{r}). | molecules polarise ; bound charges oppose plate charges ; field reduced by ε_{r} ; V = Ed falls

## Boundary conditions for electric fields
S: At the boundary between two materials, electric fields obey simple matching rules derived from Maxwell's equations. They determine how fields bend at interfaces and how charge builds up on surfaces.
LV: Advanced · Foundation
O: State the boundary conditions on E and D at an interface
O: Use them to find the refraction of field lines at a dielectric boundary
PRE: Dielectric polarisation
H: The conditions
E: E_{1∥} = E_{2∥} :: tangential E is continuous (from ∮E·dl = 0)
E: D_{2⊥} − D_{1⊥} = σ_{free} :: normal D jumps by free surface charge (from Gauss)
- With no free surface charge: ε_{1}E_{1⊥} = ε_{2}E_{2⊥}.
H: Refraction of field lines
E: tan θ_{1}/tan θ_{2} = ε_{1}/ε_{2}
- Field lines bend away from the normal entering a higher-ε material.
- At a conductor surface: E_{∥} = 0, E_{⊥} = σ/ε_{0}.
H: Consequences
P: These conditions, applied to oscillating fields, give the Fresnel equations for reflection and refraction of light, and explain why optical coatings, waveguides and capacitors with mixed dielectrics behave as they do. Air gaps in high-voltage insulation are dangerous: the field in the low-ε air is ε_{r} times higher than in the insulator around it.
X: A capacitor has air (ε = 1) and glass (ε = 5) layers in series. Ratio of fields?
> D_{⊥} is continuous: E_{air} = 5E_{glass}
> The air layer may break down first
!: It's D that's continuous across a dielectric boundary with no free charge, not E.
Q: Which component of E is continuous across any boundary? | The tangential component.
Q: Why are air bubbles in insulation dangerous? | The field in the air is higher (lower ε), and air's breakdown strength is low.
M1: At a perfect conductor's surface, the tangential electric field is: | Zero | σ/ε_{0} | Maximum | Equal to the normal field | Charges move to cancel it.
M2: Normal D changes across a boundary by: | The free surface charge density | The bound charge | Nothing ever | The potential | Gauss's law.
T: Electric displacement | D = ε_{0}E + P = εE, whose divergence gives the free charge
T: Tangential continuity | The component of E parallel to a boundary is the same on both sides
SUM: E_{∥} is continuous; D_{⊥} jumps by the free surface charge σ_{f} (continuous if σ_{f} = 0).
SUM: At a charge-free boundary, tan θ_{1}/tan θ_{2} = ε_{1}/ε_{2}.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 4.4, Pearson | secondary | 2013
SRC: Jackson J. D., Classical Electrodynamics, 3rd edition, section 4.4, Wiley | secondary | 1999
EV: established | Follows from Maxwell's equations.
Q: Which component of E is continuous across a boundary with no surface charge? | Both the tangential E and the normal D = εE (so the normal E jumps by the ratio of permittivities).
M3@2,3: A field line in air (ε_{r} = 1) meets glass (ε_{r} = 4) at 45° to the normal. At what angle to the normal does it continue in the glass? | About 76° | About 14° | 45°, unchanged | About 63° | tan θ_{2} = (ε_{2}/ε_{1}) tan θ_{1} = 4 × 1 = 4, so θ_{2} ≈ 76°: field lines bend away from the normal entering the higher-ε material.
SA2@2: Derive the tangential boundary condition on E using a small rectangular loop. | In electrostatics ∮E·dl = 0 (E is conservative). Take a thin rectangle straddling the boundary with long sides parallel to it. The short sides contribute nothing as their height → 0, leaving E_{1∥}l − E_{2∥}l = 0, so E_{∥} is continuous. | ∮E·dl = 0 ; thin loop across boundary ; short sides negligible ; E_{∥} equal on both sides

## Electrostatic shielding
S: A closed conducting shell blocks external static electric fields from its interior: a Faraday cage. Charges on the shell rearrange to cancel the outside field inside, protecting sensitive electronics and people.
LV: Intermediate · Application
O: Explain why a closed conducting shell shields its interior from static fields
O: Apply shielding to cables, cars and Faraday cages
PRE: Conductors in electrostatic equilibrium
H: How it works
- External fields push the shell's free charges until the field inside the metal (and in an empty cavity) is zero.
- It doesn't need to be solid: a mesh works if holes are much smaller than the wavelength (for EM waves).
- Shielding of time-varying fields also depends on skin depth δ = √(2/(ωμσ)).
H: Examples
- Cars and aircraft protect occupants from lightning (current flows over the skin).
- Microwave ovens' door mesh (holes ≪ 12 cm wavelength).
- MRI rooms, sensitive measurement labs, coaxial cable shields.
- Phones lose signal in lifts and metal buildings.
H: Limits
P: Static magnetic fields aren't blocked by ordinary metal shells; they need high-permeability materials (mu-metal) to divert flux, or superconducting shields. Low-frequency magnetic shielding is much harder than electric.
X: Why is it safe to sit in a car during a lightning strike (not because of the tyres)?
> The metal body conducts the current around the occupants to the ground
> Inside, the field from the strike is largely cancelled
!: A Faraday cage protects only if it's continuous and well connected; gaps larger than the wavelength leak radiation.
Q: What is a Faraday cage? | A conducting enclosure that blocks external electric fields from its interior.
Q: Why does a microwave oven door's mesh block microwaves but not light? | Its holes are much smaller than microwave wavelengths but much larger than light wavelengths.
M1: A car protects you from lightning because: | Its metal body acts as a Faraday cage | The tyres insulate it | It's grounded through the engine | Glass blocks current | Current flows over the shell.
M2: Static magnetic fields are best shielded by: | High-permeability materials | Thin copper | Plastic | Glass | Mu-metal diverts flux.
T: Faraday cage | A conducting enclosure that blocks external electric fields from its interior
T: Coaxial cable | A cable with a central wire surrounded by an earthed conducting shield
SUM: Charges on the shell rearrange to cancel any external field inside.
SUM: Mesh cages work for wavelengths much longer than their holes; static and slowly varying fields are blocked best.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.5, Pearson | secondary | 2013
SRC: Faraday M., Experimental Researches in Electricity, vol. 1, paragraph 1174, London | primary | 1839
EV: established | Exact for static fields and closed conductors.
Q: Why is a car a fairly safe place in a thunderstorm? | Its metal body acts roughly as a Faraday cage, carrying lightning current round the outside.
M3@2,3: A mobile phone works inside a wire-mesh cage with 5 cm holes but not inside a solid metal box. Why? | 5 cm holes are much smaller than the waves' wavelength (about 30 cm at 1 GHz) yet still leak some signal; a solid box blocks it fully | Mesh conducts better than solid metal | Phones use static fields, which mesh can't block | The phone's signal is too strong for any mesh | A mesh shields well only when holes are far smaller than the wavelength; 5 cm is not small enough to block 1 GHz completely.
SA2@1,2: Explain why there's no field inside an empty closed conductor even when a charge is placed outside it. | The external charge's field drives free charges in the conductor to rearrange on its outer surface. They settle when their field exactly cancels the external one throughout the metal and the cavity; with no charge inside the cavity, the only consistent solution is E = 0 there (the conductor is an equipotential). | free charges rearrange ; cancel field in the metal ; cavity bounded by equipotential ; E = 0 inside

## Method of images
S: The method of images solves electrostatics problems near conductors by replacing the conductor with imaginary charges that reproduce the same boundary conditions. By uniqueness, the resulting field is the right one in the real region.
LV: Advanced · Application
O: Use image charges to solve problems near conducting planes and spheres
O: Calculate the force on a charge near an earthed plane
PRE: Laplace's equation
H: The uniqueness theorem
P: If a potential satisfies Poisson's equation in a region and the correct boundary conditions, it's the only solution. So any trick that gets the boundary right gives the answer.
H: Classic images
- **Point charge q at height d above an earthed plane**: image −q at depth d. Force on q: q^{2}/(4πε_{0}(2d)^{2}) towards the plane.
- Induced surface charge: σ = −qd/(2π(x^{2} + y^{2} + d^{2})^{3/2}), totalling −q.
- **Charge q at distance a from an earthed sphere of radius R**: image −qR/a at R^{2}/a from the centre.
- Line charges near cylinders; dielectric interfaces (image charge q(ε_{1} − ε_{2})/(ε_{1} + ε_{2})).
H: Uses
- Capacitance of wires above ground (power lines, PCB traces).
- Image forces on electrons near metal surfaces (they lower the work function: the Schottky effect).
- Antenna design over ground planes.
X: An electron 1 nm from a flat metal surface. Image force?
> F = e^{2}/(4πε_{0}(2 × 10^{-9})^{2}) = 8.99 × 10^{9} × 2.56 × 10^{-38}/4 × 10^{-18} = 5.8 × 10^{-11} N
!: Image charges are fictional and only valid outside the conductor (in the real region); don't use them to find fields inside.
Q: What image charge represents an earthed plane? | An equal and opposite charge at the mirror position.
Q: Why does the method of images give the correct answer? | By the uniqueness theorem, a solution satisfying the boundary conditions is the only one.
M1: A charge q at distance d above an earthed plane is attracted with force: | q^{2}/(16πε_{0}d^{2}) | q^{2}/(4πε_{0}d^{2}) | 0 | q^{2}/(8πε_{0}d) | Distance to image 2d.
M2: The total induced charge on an earthed plane near charge q is: | −q | 0 | +q | −2q | Image charge equals induced total.
T: Image charge | A fictitious charge placed so that the combined potential satisfies the conductor's boundary condition
T: Uniqueness theorem | A solution to Laplace's or Poisson's equation that meets the boundary conditions is the only one
SUM: Charge q at distance d from an earthed plane: image −q at d behind it; force q^{2}/(4πε_{0}(2d)^{2}) towards the plane.
SUM: Earthed sphere of radius R: image −qR/a at R^{2}/a from the centre.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 3.2, Pearson | secondary | 2013
SRC: Jackson J. D., Classical Electrodynamics, 3rd edition, chapter 2, Wiley | secondary | 1999
EV: established | Exact by the uniqueness theorem.
Q: Why does the method of images give the right answer? | The image arrangement satisfies the same equation and boundary conditions, and by uniqueness the solution is the only one.
M3@2,3: A 1.0 nC charge is 1.0 cm above a large earthed metal plate. What force acts on it? | About 22 μN towards the plate | About 90 μN towards the plate | About 22 μN away from the plate | Zero, because the plate is neutral | The image −1.0 nC sits 2.0 cm away: F = 8.99 × 10^{9} × 10^{−18}/(0.020)^{2} ≈ 2.2 × 10^{−5} N, attractive.
SA2@2: Explain why the induced charge on an earthed plane near a point charge q totals exactly −q. | The field above the plane is that of q and its image −q. By Gauss's law, the total induced surface charge equals the total flux into the conductor times ε_{0}; every field line from q ends on the plane, which is exactly the flux of the image −q. So the induced charge is −q. | field equals that of q and image ; all lines from q end on the plane ; Gauss's law ; total −q

## Poisson's equation
S: Poisson's equation relates the electric potential to the charge density producing it. Together with boundary conditions, it determines the potential everywhere: the master equation of electrostatics.
LV: Advanced · Foundation
O: Derive Poisson's equation from Gauss's law and E = −∇V
O: Solve it for simple one-dimensional charge distributions
PRE: Gauss's law
H: The equation
E: ∇^{2}V = −ρ/ε_{0}
- Combines E = −∇V with Gauss's law ∇·E = ρ/ε_{0}.
- In a dielectric: ∇·(ε∇V) = −ρ_{free}.
- Same equation in gravity (∇^{2}Φ = 4πGρ) and steady heat flow with sources.
H: Solutions
- Point charge: V = q/(4πε_{0}r) (the Green's function).
- General: V(r) = (1/4πε_{0})∫ρ(r′)/|r − r′| dV′ plus a solution of Laplace's equation for boundaries.
- Numerically: finite differences, relaxation, multigrid, finite elements.
H: Semiconductors
P: In a p–n junction, Poisson's equation with the ionised dopant charge gives the depletion-region potential: parabolic in each side, producing the built-in voltage that makes diodes and solar cells work. Device simulators solve it coupled to carrier transport.
X: Uniform charge density ρ between x = 0 and x = d with V = 0 at both ends. Find V(x).
> d^{2}V/dx^{2} = −ρ/ε_{0} ⇒ V = (ρ/2ε_{0})x(d − x)
> Maximum ρd^{2}/(8ε_{0}) at the centre
!: Poisson's equation alone has infinitely many solutions; it's the boundary conditions that make the answer unique.
Q: State Poisson's equation. | ∇^{2}V = −ρ/ε_{0}.
Q: Where does Poisson's equation appear in semiconductor devices? | In finding the potential across depletion regions of p–n junctions.
M1: Poisson's equation reduces to Laplace's equation when: | ρ = 0 | V = 0 | E = 0 | ε = 0 | No charge in the region.
M2: The gravitational analogue of Poisson's equation is: | ∇^{2}Φ = 4πGρ | F = ma | ∇·B = 0 | E = mc^{2} | Same mathematics.
T: Poisson's equation | ∇^{2}V = −ρ/ε_{0}
T: Space charge | A volume density of charge in a region, such as in a diode's depletion layer
SUM: Gauss's law ∇·E = ρ/ε_{0} with E = −∇V gives ∇^{2}V = −ρ/ε_{0}.
SUM: With boundary conditions, Poisson's equation determines V uniquely.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 2.3, Pearson | secondary | 2013
SRC: Sze S. M., Ng K. K., Physics of Semiconductor Devices, 3rd edition, chapter 2, Wiley | secondary | 2007
EV: established | Exact electrostatics.
Q: What does Poisson's equation reduce to where there is no charge? | Laplace's equation, ∇^{2}V = 0.
M3@2,3: In a 1D region with uniform charge density ρ between x = 0 and d, both edges at V = 0, where is V greatest? | At the midpoint, x = d/2 | At x = 0 | At x = d | Everywhere equally | d^{2}V/dx^{2} = −ρ/ε_{0} gives V = (ρ/2ε_{0})x(d − x), a parabola peaking at d/2 (for ρ > 0).
SA2@1,2: Explain how Poisson's equation is used to find the electric field in a semiconductor p–n junction. | Near the junction a depletion layer has fixed ion charges (negative on the p side, positive on the n side). Treating ρ as constant on each side, integrating d^{2}V/dx^{2} = −ρ/ε once gives a field that rises linearly to a maximum at the junction, and again gives the potential step (the built-in voltage) across the layer. | depletion layer has fixed charge ; ρ roughly constant each side ; integrate once for E ; integrate again for V

## Laplace's equation
S: In regions without charge, the electric potential obeys Laplace's equation. Its solutions, harmonic functions, are smooth, have no local maxima or minima inside the region, and are fixed entirely by the boundary values.
LV: Advanced · Application
O: State the properties of solutions of Laplace's equation
O: Solve Laplace's equation for simple boundaries
PRE: Poisson's equation
H: The equation
E: ∇^{2}V = 0
- Cartesian: ∂^{2}V/∂x^{2} + ∂^{2}V/∂y^{2} + ∂^{2}V/∂z^{2} = 0.
H: Key properties
- **Mean-value property**: V at a point equals its average on any sphere around it.
- **No extrema inside**: maxima and minima occur only on the boundaries.
- **Earnshaw's theorem**: no static arrangement of charges can stably trap a charge (no potential minimum in free space). Ion traps use oscillating fields (Paul trap) or magnetic fields (Penning trap) instead.
H: Solving
- Separation of variables in Cartesian, cylindrical (Bessel functions) or spherical (Legendre polynomials) coordinates.
- Relaxation: repeatedly replace each grid value by the average of its neighbours until converged.
- Also governs steady heat flow, ideal fluid flow and gravity in empty space.
X: Relaxation on a grid: one interior point with neighbours 10, 20, 30 and 40 V. Its converged value?
> Average = 25 V (mean-value property)
!: Earnshaw's theorem rules out stable electrostatic levitation of charges, but diamagnetic and dynamic (oscillating-field) traps get around it.
Q: State Earnshaw's theorem. | A charge can't be held in stable equilibrium by electrostatic forces alone.
Q: What is the mean-value property of harmonic functions? | The value at a point equals the average over any surrounding sphere.
M1: Solutions of Laplace's equation have maxima: | Only on boundaries | At the centre | Anywhere | At charges | No interior extrema.
M2: Ion traps get around Earnshaw's theorem by using: | Oscillating or magnetic fields | Larger static charges | Gravity | Dielectrics | Paul and Penning traps.
T: Harmonic function | A solution of Laplace's equation, ∇^{2}V = 0
T: Mean-value property | V at any point equals its average over any sphere centred there, if the sphere contains no charge
SUM: Solutions have no maxima or minima inside a charge-free region, only on its boundary (Earnshaw's theorem follows).
SUM: Methods: separation of variables, images, numerical relaxation.
SRC: Griffiths D. J., Introduction to Electrodynamics, 4th edition, section 3.1, Pearson | secondary | 2013
SRC: Jackson J. D., Classical Electrodynamics, 3rd edition, chapters 1–3, Wiley | secondary | 1999
EV: established | Exact mathematical results.
Q: What does Earnshaw's theorem say? | A charge can't be held in stable equilibrium by electrostatic forces alone, since V has no minimum in free space.
M3@2,3: In a numerical relaxation solution of Laplace's equation on a square grid, what value replaces each interior point? | The average of its four neighbours | The largest of its neighbours | The sum of its four neighbours | The boundary value nearest to it | The discrete Laplace equation says V_{i,j} = ¼(V_{i+1,j} + V_{i−1,j} + V_{i,j+1} + V_{i,j−1}), the mean-value property; iterating converges to the solution.
SA2@2: Explain why an ion trap can't hold ions with static electric fields alone, and how real traps manage it. | In a charge-free region V obeys Laplace's equation, so it has no minimum: a static potential can't confine a charge in all three directions (Earnshaw). Paul traps use rapidly oscillating fields, giving an effective time-averaged confining potential; Penning traps add a strong magnetic field. | Laplace solutions have no minimum ; Earnshaw's theorem ; Paul trap uses oscillating fields ; Penning trap adds a magnetic field
`;
