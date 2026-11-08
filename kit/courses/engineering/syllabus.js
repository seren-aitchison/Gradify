// EngineerGradify Engineering: the full curriculum, 12 schools, modelled on the Engineering Council's Accreditation of
// Higher Education Programmes (AHEP, 4th edition) learning outcomes and the common first and second years of a UK
// engineering degree (mechanical, civil, electrical and general engineering). Each topic is taught as one lesson,
// grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock engineering): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Engineering Mathematics
> Quantities and models
* SI units and dimensional analysis
* Uncertainty, significant figures and estimation
* Engineering models and assumptions
> Algebra and functions
* Functions and graphs in engineering
* Exponentials and logarithms in engineering
* Trigonometry and sinusoids
* Complex numbers and phasors
> Vectors and matrices
* Vectors and their products
* Matrices and simultaneous equations
* Eigenvalues and eigenvectors
> Calculus
* Differentiation and rates of change
* Partial differentiation and error propagation
* Integration in engineering
* Taylor series and linearisation
> Differential equations and numerical methods
* First-order differential equations
* Second-order differential equations
* Numerical methods
> Statistics and reliability
* Engineering statistics
* Probability and reliability
2. Statics
> Forces and moments
* Forces as vectors
* Moments and couples
* Equivalent force systems
* Free-body diagrams
> Equilibrium
* Equilibrium of a particle
* Equilibrium of a rigid body in two dimensions
* Equilibrium in three dimensions
* Statical determinacy and stability
> Structures
* Plane trusses: the method of joints
* Plane trusses: the method of sections
* Frames and machines
> Distributed loads and section properties
* Distributed loads
* Centroids and centres of gravity
* Second moment of area
> Friction and internal forces
* Dry friction
* Shear force and bending moment diagrams
3. Dynamics
> Kinematics of particles
* Rectilinear motion
* Curvilinear motion: rectangular components
* Normal and tangential components
* Projectile motion
* Relative motion
> Kinetics of particles
* Newton's second law for particles
* Work and energy
* Power and efficiency
* Impulse and momentum
* Impacts
> Rigid-body dynamics
* Rotation about a fixed axis
* General plane motion and the instantaneous centre
* Mass moment of inertia
* Kinetics of rigid bodies in plane motion
* Energy methods for rigid bodies
> Vibrations
* Free undamped vibration
* Damped vibration
* Forced vibration and resonance
4. Mechanics of Materials
> Stress and strain
* Normal stress and strain
* Shear stress and strain
* Hooke's law and elastic constants
* Axially loaded members
* Thermal stress
> Torsion and bending
* Torsion of circular shafts
* Bending stress in beams
* Shear stress in beams
* Beam deflection
> Combined loading and stability
* Combined loading
* Stress transformation and Mohr's circle
* Failure theories
* Buckling of columns
* Thin-walled pressure vessels
* Strain energy
5. Materials Science
> Structure of materials
* Atomic bonding in materials
* Crystal structures
* Defects and dislocations
* Phase diagrams
* The iron–carbon system
> Properties and failure
* The tensile test
* Hardness and impact testing
* Fracture and fracture toughness
* Fatigue
* Creep
* Corrosion and degradation
> Material classes and selection
* Metals and alloys
* Polymers
* Ceramics and glasses
* Composites
* Heat treatment of steels
* Materials selection and Ashby charts
6. Thermodynamics
> Concepts and properties
* Systems, properties and states
* Energy, work and heat
* Properties of pure substances and steam tables
* Ideal gases
> The first law
* The first law for closed systems
* The first law for steady-flow systems
* Nozzles, turbines, compressors and heat exchangers
> The second law
* The second law and heat engines
* The Carnot cycle
* Entropy
* Isentropic efficiency
> Cycles and heat transfer
* The Rankine cycle
* Gas power cycles: Otto, Diesel and Brayton
* Refrigeration and heat pumps
* Heat transfer by conduction
* Convection and radiation
7. Fluid Mechanics
> Fluid statics
* Fluid properties
* Pressure and manometry
* Hydrostatic forces on surfaces
* Buoyancy and stability
> Fluid dynamics
* Conservation of mass and continuity
* The Bernoulli equation
* The momentum equation and jet forces
* Flow measurement
> Real flows
* Viscous flow and the Reynolds number
* Pipe flow and friction losses
* Minor losses and pipe systems
* Pumps and system curves
* Boundary layers, drag and lift
* Dimensional analysis and similitude
8. Electrical Circuits and Electronics
> DC circuits
* Charge, current, voltage and power
* Ohm's law and resistor networks
* Kirchhoff's laws
* Nodal and mesh analysis
* Thévenin and Norton equivalents
* Maximum power transfer
> Transients and AC
* Capacitors and inductors
* RC and RL transients
* AC fundamentals
* Impedance and AC circuit analysis
* AC power and power factor
* Three-phase systems
> Electronics and machines
* Diodes and rectifiers
* Transistors as switches and amplifiers
* Operational amplifiers
* Digital logic
* Transformers
* Electric motors and generators
9. Control Systems and Signals
> Modelling dynamic systems
* Introduction to control systems
* Laplace transforms
* Transfer functions and block diagrams
* Modelling physical systems
> System response
* First-order system response
* Second-order system response
* Steady-state error
* Stability and the Routh–Hurwitz criterion
> Controller design
* Feedback and PID control
* Root locus
* Frequency response and Bode plots
* Sensors and actuators
* Digital control and sampling
* Signals and the Fourier series
10. Design and Manufacturing
> The design process
* The engineering design process
* Requirements and specifications
* Concept generation and selection
* Engineering drawing and CAD
* Tolerances and fits
* Design for manufacture and assembly
> Machine elements
* Factors of safety and design codes
* Bolted and welded joints
* Shafts and bearings
* Gears and power transmission
> Manufacturing processes
* Casting and forming
* Machining processes
* Additive manufacturing
* Quality, metrology and inspection
* Lean manufacturing and production systems
11. Engineering in Society
> Ethics and the profession
* The statement of ethical principles
* Professional responsibility and whistleblowing
* Learning from engineering failures
* Codes, standards and regulation
> Health and safety
* Health and safety law and the HSE
* Risk assessment
* Hazard analysis: FMEA and HAZOP
* Human factors and safety culture
> Sustainability
* Sustainable development and engineering
* Life-cycle assessment
* Energy systems and net zero
* The circular economy and materials efficiency
* Embodied carbon in infrastructure
* Engineering for global development
* Diversity and inclusion in engineering
12. Projects and Professional Practice
> Managing projects
* The project lifecycle and planning
* Scheduling: Gantt charts and the critical path
* Engineering economics
* Risk management in projects
* Teamwork and roles
> Communicating engineering
* Technical report writing
* Presentations and technical communication
* Searching literature and standards
* Laboratory practice and experimental design
> The professional engineer
* Professional registration: EngTech, IEng and CEng
* The UK-SPEC competences
* Continuing professional development
* Intellectual property and contracts
* The individual project
`;

export const TRACKS = [
  { name: "Stage 1 · Mathematics and mechanics", units: [1, 2, 3], from: "#ff7a2a", to: "#f59e0b" },
  { name: "Stage 2 · Solids and materials", units: [4, 5], from: "#f97316", to: "#ef4444" },
  { name: "Stage 3 · Thermofluids", units: [6, 7], from: "#fb923c", to: "#22d3ee" },
  { name: "Stage 4 · Electrical and control", units: [8, 9], from: "#fbbf24", to: "#6366f1" },
  { name: "Stage 5 · Design, society and practice", units: [10, 11, 12], from: "#ff7a2a", to: "#10b981" },
];

export const PATHS = [
  { id: "year1", name: "University year 1", sub: "The common first year of most engineering degrees: maths, statics, dynamics, materials, circuits and an introduction to design and professional practice.", units: [1, 2, 3, 5, 8, 10, 11] },
  { id: "mechanical", name: "Mechanical engineering", sub: "Mechanics, materials, thermofluids, control and machine design: the core of a mechanical degree.", units: [1, 2, 3, 4, 5, 6, 7, 9, 10] },
  { id: "civil", name: "Civil and structural engineering", sub: "Statics, mechanics of materials, materials, fluids and the safety, sustainability and project skills infrastructure depends on.", units: [1, 2, 4, 5, 7, 11, 12] },
  { id: "electrical", name: "Electrical and electronic engineering", sub: "Circuits, electronics, machines, signals and control, built on the mathematics they need.", units: [1, 8, 9, 3, 10] },
  { id: "professional", name: "The professional engineer", sub: "Ethics, safety, sustainability, projects and the road to registration as EngTech, IEng or CEng.", units: [11, 12, 10] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Units, models, functions, complex numbers, vectors, matrices, calculus, differential equations, numerical methods and statistics, all applied.",
  2: "Forces, moments and equilibrium, from free-body diagrams to trusses, frames, centroids, friction and bending moment diagrams.",
  3: "How things move and why: particle and rigid-body kinematics and kinetics, energy, momentum and vibration.",
  4: "Stress, strain, torsion, bending, deflection, combined loading, failure theories and buckling.",
  5: "Bonding, crystals, defects and phase diagrams, how materials fail, and how to choose one.",
  6: "Energy, work and heat, the first and second laws, entropy, power and refrigeration cycles and heat transfer.",
  7: "Pressure, buoyancy, continuity, Bernoulli and momentum, pipe flow, pumps, drag and similitude.",
  8: "DC and AC circuit analysis, transients, power, semiconductors, op-amps, digital logic and machines.",
  9: "Laplace transforms, transfer functions, transient response, stability, PID control and frequency response.",
  10: "From requirements to a made part: design process, drawing, tolerances, machine elements and manufacturing.",
  11: "Ethics, safety law, risk, failure, sustainability and net zero: what engineers owe society.",
  12: "Project planning, economics, risk, communication, experiments and the path to professional registration.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
