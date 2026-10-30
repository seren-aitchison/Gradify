// Unit 15: Electricity and Electrostatics. Format: kit/course/notes.js
export default `
## Electric charge
S: Electric charge is a basic property of matter that makes particles exert electric and magnetic forces on each other. It comes in two kinds, positive and negative: like charges repel, unlike attract.
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

## Conservation and quantisation of charge
S: Electric charge is conserved: the total in an isolated system never changes. It's also quantised: every free particle's charge is a whole-number multiple of e. Both facts are deep features of nature.
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

## Conductors, insulators and dielectrics
S: In conductors, charges move freely; in insulators, they're bound. Dielectrics are insulators whose bound charges shift slightly in a field (polarise), reducing the field inside and increasing a capacitor's capacitance.
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

## Coulomb's law
S: Coulomb's law gives the force between two point charges: proportional to the product of the charges and inversely proportional to the square of the distance. Electric forces are immensely stronger than gravity.
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
Q: State Coulomb's law. | F = q_{1}q_{2}/(4πε_{0}r^{2}).
Q: How much stronger is electric than gravitational force between two protons? | About 10^{36} times.
M1: Two charges' separation is halved. The force: | Quadruples | Doubles | Halves | Stays the same | Inverse square.
M2: Two 1 μC charges 1 m apart experience: | 9 mN | 9 N | 9 × 10^{9} N | 1 N | k × 10^{-12}.

## Electric fields
S: An electric field is the force per unit charge that a test charge would feel at a point. It lets us describe how charges affect the space around them, and fields carry energy and momentum in their own right.
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
Q: Define electric field strength. | Force per unit positive charge, E = F/q.
Q: What is the field between charged parallel plates? | Uniform, E = V/d = σ/ε_{0}.
M1: The field of a point charge falls with distance as: | 1/r^{2} | 1/r | 1/r^{3} | Constant | Coulomb.
M2: A proton is released in a uniform field. It moves: | Along the field, accelerating | Against the field | In a circle | Not at all | Force qE along E.

## Electric field lines
S: Field lines map an electric field: their direction gives the field's direction, and their density gives its strength. They start on positive charges and end on negative ones, never crossing.
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
Q: Why can't field lines cross? | The field has a unique direction at each point.
Q: How do field lines meet a conductor's surface in equilibrium? | At right angles.
M1: Closely spaced field lines indicate: | A strong field | A weak field | Zero field | High potential | Line density ∝ |E|.
M2: Equipotentials and field lines are: | Perpendicular | Parallel | The same | Unrelated | E = −∇V.

## Electric potential
S: Electric potential is the potential energy per unit charge at a point, measured relative to a reference (often infinity or earth). It's a scalar, so potentials from many charges simply add, and the field is its downhill slope.
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
Q: How is field related to potential? | E = −∇V: the field points down the potential gradient.
Q: What is an electronvolt? | The energy an electron gains moving through 1 V: 1.6 × 10^{-19} J.
M1: The potential 0.3 m from a 3 nC charge is: | 90 V | 300 V | 30 V | 9 V | kQ/r = 8.99 × 10^{9} × 3 × 10^{-9}/0.3.
M2: Electrons naturally move towards: | Higher potential | Lower potential | Zero potential | Equipotentials | Negative charge, lower PE at higher V.

## Electric potential energy
S: Electric potential energy is the energy stored in a configuration of charges because of their positions. It's the work needed to assemble them from far apart, and it drives chemistry, batteries and nuclear stability.
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
Q: What is the potential energy of two point charges? | U = q_{1}q_{2}/(4πε_{0}r).
Q: Why do fission fragments fly apart energetically? | Their mutual Coulomb repulsion converts electric potential energy into kinetic energy.
M1: An alpha particle (2e) accelerated through 1000 V gains: | 2000 eV | 1000 eV | 500 eV | 4000 eV | qV.
M2: The potential energy of two unlike charges is: | Negative | Positive | Zero | Infinite | Attractive ⇒ bound.

## Voltage and potential difference
S: Voltage, or potential difference, is the energy transferred per unit charge between two points. It drives current through circuits and tells you how much energy each coulomb delivers.
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
Q: Define potential difference. | The work done (energy transferred) per unit charge moving between two points.
Q: Why is a van de Graaff shock usually harmless despite high voltage? | It stores little charge, so it can't sustain a dangerous current.
M1: How much energy does 3 C gain crossing 12 V? | 36 J | 4 J | 0.25 J | 15 J | W = QV.
M2: Voltmeters are connected: | In parallel | In series | Either | Neither | They measure across components.

## Electric dipoles
S: An electric dipole is a pair of equal and opposite charges separated by a small distance. Many molecules are dipoles; their behaviour in fields explains dielectrics, microwave heating and the structure of water.
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
Q: What is the electric dipole moment? | p = qd, pointing from the negative to the positive charge.
Q: Why do dipole fields fall faster than point-charge fields? | The opposite charges' fields largely cancel at large distances (E ∝ 1/r^{3}).
M1: The energy of a dipole is lowest when p is: | Parallel to E | Antiparallel | Perpendicular | Zero | U = −pE cos θ.
M2: In a uniform field a dipole experiences: | Torque but no net force | Net force only | Neither | Both equally | Equal opposite forces.

## Electric flux
S: Electric flux measures how much electric field passes through a surface: field strength times area, counting only the component perpendicular to the surface. Gauss's law relates the flux through a closed surface to the charge inside.
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

## Gauss's law
S: Gauss's law states that the electric flux out of any closed surface equals the enclosed charge divided by ε_{0}. With symmetry, it finds fields in one line, and it's one of Maxwell's four equations.
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

## Charge distributions
S: Real charges are spread over lines, surfaces and volumes. Their fields come from integrating Coulomb's law over the distribution, or from Gauss's law when there's enough symmetry.
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

## Conductors in electrostatic equilibrium
S: In electrostatic equilibrium, charges in a conductor have stopped moving. This forces the field inside to be zero, all excess charge to sit on the surface, and the surface to be an equipotential.
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

## Capacitance
S: Capacitance is the ability of a conductor arrangement to store charge per volt. Capacitors store energy in electric fields and are essential in electronics for timing, filtering, smoothing and quick bursts of power.
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
Q: Define capacitance. | Charge stored per unit potential difference, C = Q/V.
Q: How do touchscreens detect a finger? | The finger changes the capacitance of electrodes under the screen.
M1: A 100 μF capacitor at 9 V holds: | 900 μC | 11 μC | 9 μC | 0.9 μC | Q = CV.
M2: Capacitance depends on: | Geometry and dielectric | Charge stored | Voltage applied | Current | Q ∝ V.

## Parallel-plate and spherical capacitors
S: Simple geometries give simple formulas for capacitance. Parallel plates are the standard model; spherical and cylindrical capacitors describe cables and isolated conductors.
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
Q: What is the capacitance of a parallel-plate capacitor? | C = ε_{0}ε_{r}A/d.
Q: Why does reducing the plate gap have a limit? | The breakdown voltage falls in proportion to the gap.
M1: Doubling plate area and halving the separation multiplies C by: | 4 | 2 | 1 | 1/4 | A/d.
M2: Coaxial cable capacitance per metre depends on: | ln(b/a) and ε_{r} | Length only | Current | Frequency only | C/L = 2πε/ln(b/a).

## Capacitors in series and parallel
S: Capacitors combine opposite to resistors: in parallel their capacitances add; in series their reciprocals add. Parallel capacitors share voltage; series capacitors share charge.
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

## Energy stored in electric fields
S: Charging a capacitor stores energy, and that energy lives in the electric field between the plates. Every electric field holds energy, with a density proportional to the field squared.
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

## Dielectric polarisation
S: In an electric field, a dielectric's bound charges shift, creating tiny dipoles throughout the material. Their combined effect reduces the field inside and increases the charge a capacitor can store at a given voltage.
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

## Boundary conditions for electric fields
S: At the boundary between two materials, electric fields obey simple matching rules derived from Maxwell's equations. They determine how fields bend at interfaces and how charge builds up on surfaces.
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

## Electrostatic shielding
S: A closed conducting shell blocks external static electric fields from its interior: a Faraday cage. Charges on the shell rearrange to cancel the outside field inside, protecting sensitive electronics and people.
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

## Method of images
S: The method of images solves electrostatics problems near conductors by replacing the conductor with imaginary charges that reproduce the same boundary conditions. By uniqueness, the resulting field is the right one in the real region.
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

## Poisson's equation
S: Poisson's equation relates the electric potential to the charge density producing it. Together with boundary conditions, it determines the potential everywhere: the master equation of electrostatics.
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

## Laplace's equation
S: In regions without charge, the electric potential obeys Laplace's equation. Its solutions, harmonic functions, are smooth, have no local maxima or minima inside the region, and are fixed entirely by the boundary values.
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
`;
