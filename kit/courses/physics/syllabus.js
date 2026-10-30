// SciGradify Physics: the full syllabus, 54 units and every topic in them. Each "* topic" becomes a
// lesson on the unit's path; its notes are in notes/uNN.js. Units are grouped into tracks below.
export const SYLLABUS = `
1. Foundations of Physics
* Scope and aims of physics
* Physical quantities and observables
* SI base and derived units
* Dimensional analysis
* Unit conversions and prefixes
* Scalar and vector quantities
* Significant figures and scientific notation
* Estimation and order-of-magnitude calculations
* Physical constants
* Mathematical modelling
* Idealisation and simplifying assumptions
* Deterministic and probabilistic models
* Conservation laws
* Symmetry and invariance
* Physical laws, principles and theories
* Classical and modern physics
* Microscopic and macroscopic descriptions
* Uncertainty and measurement limitations
* Scientific reasoning and falsifiability
2. Mathematics for Physics
* Algebraic manipulation
* Equations and inequalities
* Simultaneous equations
* Trigonometry and circular functions
* Exponential and logarithmic functions
* Complex numbers
* Vectors and vector decomposition
* Matrices and linear algebra
* Coordinate systems
* Cartesian, polar, cylindrical and spherical coordinates
* Differentiation
* Integration
* Partial derivatives
* Ordinary differential equations
* Partial differential equations
* First- and second-order differential equations
* Boundary and initial conditions
* Taylor and Fourier series
* Fourier transforms
* Laplace transforms
* Multivariable calculus
* Gradient, divergence and curl
* Line, surface and volume integrals
* Vector calculus theorems
* Linear algebra eigenvalues and eigenvectors
* Tensor algebra
* Probability distributions
* Statistics and error propagation
* Numerical methods
* Optimisation
* Dimensional analysis
* Complex analysis
* Group theory and mathematical symmetry
* Variational calculus
3. Measurement, Experimental Physics and Uncertainty
* Measurement instruments and calibration
* Accuracy, precision and resolution
* Random and systematic errors
* Measurement uncertainty
* Absolute and relative uncertainty
* Significant figures in experimental results
* Propagation of uncertainty
* Error bars and confidence intervals
* Repeatability and reproducibility
* Experimental controls
* Independent, dependent and controlled variables
* Experimental design
* Calibration curves
* Linearisation of experimental relationships
* Least-squares fitting
* Regression analysis
* Residual analysis
* Hypothesis testing
* Statistical significance
* Instrument response and sensitivity
* Detection limits
* Signal-to-noise ratio
* Data acquisition systems
* Sensors and transducers
* Oscilloscopes and signal generators
* Lock-in amplifiers
* Vacuum systems
* Cryogenic measurement
* High-voltage and high-current safety
* Laboratory notebooks and reproducibility
* Experimental validation of physical models
4. Classical Mechanics
* Position, displacement, distance and time
* Speed and velocity
* Acceleration
* Motion in one dimension
* Motion in two and three dimensions
* Kinematic equations
* Projectile motion
* Relative motion
* Reference frames
* Newton's laws of motion
* Inertial and non-inertial frames
* Free-body diagrams
* Normal force and tension
* Friction and drag
* Inclined planes
* Circular motion
* Centripetal acceleration and force
* Work and energy
* Kinetic and potential energy
* Conservative and non-conservative forces
* Power and efficiency
* Momentum and impulse
* Conservation of momentum
* Collisions and explosions
* Elastic and inelastic collisions
* Centre of mass
* Systems of particles
* Variable-mass systems
* Motion under resistive forces
* Terminal velocity
* Equilibrium and statics
* Mechanical advantage
* Simple machines
5. Rotational Mechanics
* Angular displacement, velocity and acceleration
* Angular and linear motion relationships
* Torque and moment of force
* Moment of inertia
* Rotational kinetic energy
* Angular momentum
* Conservation of angular momentum
* Rotational dynamics
* Rolling without slipping
* Rotational equilibrium
* Parallel-axis theorem
* Perpendicular-axis theorem
* Gyroscopic motion
* Precession and nutation
* Rigid-body dynamics
* Euler's equations of rotation
* Rotating reference frames
* Centrifugal and Coriolis forces
* Top motion and stability
* Coupled translational and rotational motion
6. Oscillations and Vibrations
* Periodic motion
* Simple harmonic motion
* Amplitude, frequency, period and phase
* Mass-spring systems
* Simple and physical pendulums
* Energy in oscillatory systems
* Damped oscillations
* Underdamping, critical damping and overdamping
* Driven oscillations
* Resonance
* Quality factor
* Coupled oscillators
* Normal modes
* Beat frequencies
* Anharmonic oscillations
* Nonlinear oscillators
* Parametric resonance
* Mechanical vibration analysis
* Frequency response
* Fourier analysis of oscillations
7. Gravitation and Orbital Mechanics
* Newton's law of universal gravitation
* Gravitational fields
* Gravitational field strength
* Gravitational potential and potential energy
* Escape velocity
* Orbital velocity
* Circular and elliptical orbits
* Kepler's laws
* Satellite motion
* Orbital energy and angular momentum
* Two-body gravitational problem
* Tidal forces
* Roche limits
* Lagrange points
* Restricted three-body problem
* Orbital transfers
* Hohmann transfers
* Gravitational perturbations
* Precession of orbits
* General relativistic corrections
* Gravitational lensing
* Gravitational waves
8. Fluid Mechanics
* Density and pressure
* Hydrostatic equilibrium
* Pascal's principle
* Buoyancy and Archimedes' principle
* Fluid statics
* Fluid dynamics
* Continuity equation
* Conservation of mass in fluid flow
* Bernoulli's equation
* Viscosity
* Laminar and turbulent flow
* Reynolds number
* Poiseuille flow
* Drag and lift
* Boundary layers
* Surface tension
* Capillary action
* Compressible and incompressible fluids
* Navier–Stokes equations
* Euler equations for fluids
* Vorticity and circulation
* Flow instabilities
* Shock waves
* Turbulence modelling
* Computational fluid dynamics
9. Elasticity and Solid Mechanics
* Stress and strain
* Young's modulus
* Shear modulus
* Bulk modulus
* Hooke's law
* Elastic and plastic deformation
* Poisson's ratio
* Elastic energy
* Bending and torsion
* Beam deflection
* Pressure and material deformation
* Fracture and failure
* Viscoelasticity
* Crystal elasticity
* Mechanical waves in solids
* Stress tensors
* Continuum mechanics
* Material stability
* Fatigue and fracture mechanics
10. Waves and Wave Motion
* Wave properties
* Transverse and longitudinal waves
* Wavelength, frequency, period and speed
* Wave equations
* Wave propagation
* Phase and group velocity
* Superposition
* Interference
* Constructive and destructive interference
* Standing waves
* Reflection and transmission
* Refraction
* Diffraction
* Dispersion
* Polarisation
* Wave packets
* Beats
* Boundary conditions
* Resonant modes
* Coupled waves
* Nonlinear waves
* Solitons
* Wave energy and intensity
* Huygens' principle
* Fourier decomposition of waves
11. Acoustics and Sound
* Sound wave propagation
* Sound pressure and intensity
* Decibel scale
* Pitch, loudness and timbre
* Frequency spectra
* Harmonics and overtones
* Resonance in air columns
* Musical instruments and acoustics
* Doppler effect
* Beats and interference
* Acoustic impedance
* Reflection and absorption of sound
* Reverberation
* Architectural acoustics
* Ultrasound
* Infrasound
* Sonar
* Acoustic levitation
* Noise pollution
* Psychoacoustics
* Bioacoustics
12. Thermodynamics
* Temperature and thermal equilibrium
* Zeroth law of thermodynamics
* Heat and internal energy
* Specific heat capacity
* Latent heat
* Thermal expansion
* First law of thermodynamics
* Work done by thermodynamic systems
* Pressure-volume diagrams
* Isothermal processes
* Adiabatic processes
* Isobaric and isochoric processes
* Heat engines
* Refrigerators and heat pumps
* Thermal efficiency
* Second law of thermodynamics
* Entropy
* Reversible and irreversible processes
* Carnot cycle
* Thermodynamic potentials
* Enthalpy
* Helmholtz free energy
* Gibbs free energy
* Chemical and phase equilibrium
* Maxwell relations
* Third law of thermodynamics
* Thermodynamic cycles
* Equations of state
* Critical points
* Phase transitions
* Non-equilibrium thermodynamics
13. Statistical Mechanics
* Microstates and macrostates
* Statistical ensembles
* Microcanonical, canonical and grand canonical ensembles
* Boltzmann distribution
* Maxwell–Boltzmann distribution
* Partition functions
* Entropy and probability
* Multiplicity and state counting
* Equipartition theorem
* Classical ideal gases
* Mean free path
* Molecular speed distributions
* Chemical potential
* Fermi–Dirac statistics
* Bose–Einstein statistics
* Quantum gases
* Degenerate matter
* Blackbody radiation
* Fluctuations and correlations
* Phase transitions
* Critical phenomena
* Ising model
* Renormalisation group
* Statistical field theory
* Monte Carlo methods
* Nonequilibrium statistical mechanics
14. Heat Transfer and Thermal Physics
* Conduction
* Convection
* Thermal radiation
* Fourier's law of heat conduction
* Newton's law of cooling
* Stefan–Boltzmann law
* Wien's displacement law
* Thermal diffusivity
* Heat exchangers
* Insulation and thermal resistance
* Blackbody and greybody radiation
* Emissivity and absorptivity
* Greenhouse effect
* Thermoelectric effects
* Peltier and Seebeck effects
* Thermal contact resistance
* Cryogenics
* Low-temperature physics
* Heat transport in solids and fluids
* Thermal management in engineering
15. Electricity and Electrostatics
* Electric charge
* Conservation and quantisation of charge
* Conductors, insulators and dielectrics
* Coulomb's law
* Electric fields
* Electric field lines
* Electric potential
* Electric potential energy
* Voltage and potential difference
* Electric dipoles
* Electric flux
* Gauss's law
* Charge distributions
* Conductors in electrostatic equilibrium
* Capacitance
* Parallel-plate and spherical capacitors
* Capacitors in series and parallel
* Energy stored in electric fields
* Dielectric polarisation
* Boundary conditions for electric fields
* Electrostatic shielding
* Method of images
* Poisson's equation
* Laplace's equation
16. Electric Circuits
* Electric current
* Resistance and resistivity
* Ohm's law
* Conductivity
* Series and parallel circuits
* Kirchhoff's laws
* Electromotive force
* Internal resistance
* Electrical power and energy
* Resistor networks
* Capacitor charging and discharging
* RC circuits
* RL circuits
* RLC circuits
* Transient responses
* Alternating current
* Root-mean-square values
* Impedance and reactance
* Phasor diagrams
* Resonance in AC circuits
* Transformers
* Rectification
* Filters and frequency response
* Electrical measurement
* Circuit analysis methods
* Thevenin and Norton equivalents
* Operational amplifiers
* Semiconductor circuit fundamentals
17. Magnetism and Electromagnetism
* Magnetic fields
* Magnetic forces on charges
* Lorentz force
* Magnetic forces on current-carrying wires
* Motion of charged particles in magnetic fields
* Biot–Savart law
* Ampère's law
* Magnetic dipoles
* Magnetic flux
* Electromagnetic induction
* Faraday's law
* Lenz's law
* Inductance
* Self-induction and mutual induction
* Energy stored in magnetic fields
* Magnetic materials
* Diamagnetism
* Paramagnetism
* Ferromagnetism
* Hysteresis
* Electromagnets
* Solenoids and toroids
* Electric motors and generators
* Maxwell's equations
* Displacement current
* Electromagnetic potentials
* Gauge transformations
* Electromagnetic boundary conditions
* Electromagnetic momentum and energy
18. Electromagnetic Waves
* Electromagnetic wave propagation
* Speed of light
* Electric and magnetic field relationships
* Electromagnetic wave equation
* Electromagnetic spectrum
* Radio waves
* Microwaves
* Infrared radiation
* Visible light
* Ultraviolet radiation
* X-rays
* Gamma rays
* Polarisation
* Reflection and transmission
* Refraction
* Dispersion
* Absorption
* Electromagnetic wave intensity
* Poynting vector
* Radiation pressure
* Waveguides
* Antennas and radiation patterns
* Near-field and far-field behaviour
* Electromagnetic interference
* Electromagnetic shielding
* Microwave engineering
* Radio-frequency physics
19. Optics
* Geometrical optics
* Reflection and refraction
* Snell's law
* Total internal reflection
* Mirrors and image formation
* Thin lenses
* Lens equations
* Optical instruments
* Microscopes and telescopes
* Aberrations
* Dispersion and prisms
* Physical optics
* Young's double-slit experiment
* Interference and coherence
* Diffraction
* Single-slit and multiple-slit diffraction
* Diffraction gratings
* Michelson interferometer
* Fabry–Pérot interferometer
* Polarisation
* Brewster's angle
* Birefringence
* Optical activity
* Lasers
* Optical cavities
* Fibre optics
* Nonlinear optics
* Ultrafast optics
* Integrated photonics
* Adaptive optics
20. Quantum Mechanics
* Origins of quantum theory
* Blackbody radiation
* Photoelectric effect
* Compton scattering
* Wave-particle duality
* de Broglie wavelength
* Double-slit experiments
* Heisenberg uncertainty principle
* Wavefunctions
* Probability amplitudes
* Born rule
* Schrödinger equation
* Time-dependent and time-independent Schrödinger equations
* Quantum states and observables
* Operators and eigenvalues
* Expectation values
* Hilbert spaces
* Superposition
* Quantum measurement
* Commutators
* Compatible and incompatible observables
* Infinite and finite potential wells
* Quantum tunnelling
* Quantum harmonic oscillator
* Quantum barriers and scattering
* Angular momentum
* Spin
* Addition of angular momentum
* Identical particles
* Bosons and fermions
* Pauli exclusion principle
* Hydrogen atom
* Orbital angular momentum
* Approximation methods
* Perturbation theory
* Variational method
* WKB approximation
* Density matrices
* Mixed and pure states
* Quantum entanglement
* Decoherence
* Quantum information fundamentals
21. Atomic Physics
* Atomic structure
* Rutherford scattering
* Bohr model
* Quantum mechanical atomic models
* Atomic orbitals
* Electron configurations
* Atomic energy levels
* Hydrogen and hydrogen-like atoms
* Multi-electron atoms
* Electron spin
* Fine structure
* Hyperfine structure
* Spin-orbit coupling
* Zeeman effect
* Stark effect
* Atomic spectra
* Selection rules
* Spontaneous and stimulated emission
* Atomic transitions
* Lasers and atomic transitions
* Atomic clocks
* Laser cooling
* Magneto-optical trapping
* Bose–Einstein condensation in atomic gases
* Precision spectroscopy
22. Molecular Physics
* Molecular energy levels
* Rotational spectra
* Vibrational spectra
* Electronic molecular transitions
* Molecular bonding from a physical perspective
* Molecular symmetry
* Molecular orbitals
* Raman spectroscopy
* Infrared spectroscopy
* Fluorescence and phosphorescence
* Molecular collisions
* Molecular dynamics
* Energy transfer
* Non-radiative transitions
* Photodissociation
* Molecular beams
* Ultrafast molecular dynamics
* Quantum molecular physics
* Spectroscopic selection rules
23. Nuclear Physics
* Nuclear structure
* Protons, neutrons and nucleons
* Nuclear size and density
* Nuclear binding energy
* Mass defect
* Nuclear forces
* Nuclear stability
* Radioactive decay
* Alpha, beta and gamma decay
* Decay chains and half-life
* Nuclear reaction equations
* Nuclear cross-sections
* Nuclear scattering
* Nuclear fission
* Nuclear fusion
* Chain reactions
* Nuclear reactors
* Neutron moderation
* Nuclear energy and power
* Radiation detection
* Radiation shielding
* Nuclear spectroscopy
* Nuclear magnetic resonance
* Nuclear astrophysics
* Nuclear waste and radiation safety
24. Particle Physics
* Fundamental particles
* Quarks and leptons
* Fermions and bosons
* Fundamental interactions
* Electromagnetic interaction
* Weak interaction
* Strong interaction
* Gravitational interaction
* Standard Model
* Particle generations
* Quark flavours and colour charge
* Hadrons, baryons and mesons
* Antimatter and antiparticles
* Particle decay
* Conservation laws in particle reactions
* Feynman diagrams
* Quantum electrodynamics
* Quantum chromodynamics
* Electroweak theory
* Higgs mechanism
* Higgs boson
* Neutrino oscillations
* CP violation
* Symmetry breaking
* Particle accelerators
* Collider experiments
* Particle detectors
* Scattering experiments
* Beyond the Standard Model
* Supersymmetry
* Grand unified theories
* Dark matter candidates
* Open questions in particle physics
25. Special Relativity
* Historical foundations of relativity
* Galilean transformations
* Inertial reference frames
* Postulates of special relativity
* Speed of light invariance
* Lorentz transformations
* Relativity of simultaneity
* Time dilation
* Length contraction
* Relativistic velocity addition
* Spacetime diagrams
* Minkowski spacetime
* Proper time
* Four-vectors
* Relativistic momentum
* Mass-energy equivalence
* Relativistic energy
* Energy-momentum relation
* Relativistic collisions
* Relativistic Doppler effect
* Relativistic electromagnetism
* Causality and light cones
* Twin paradox
* Relativistic particle dynamics
26. General Relativity
* Equivalence principle
* Accelerated reference frames
* Gravity as spacetime curvature
* Metric tensors
* Geodesics
* Curvature and the Riemann tensor
* Einstein field equations
* Stress-energy tensor
* Schwarzschild solution
* Kerr black holes
* Gravitational time dilation
* Gravitational redshift
* Perihelion precession
* Light bending and gravitational lensing
* Black holes and event horizons
* Singularities
* Gravitational waves
* Binary systems and gravitational radiation
* Cosmological solutions
* Friedmann equations
* Tests of general relativity
* Numerical relativity
* Quantum gravity challenges
27. Condensed Matter Physics
* Crystalline and amorphous solids
* Crystal lattices and unit cells
* Bravais lattices
* Miller indices
* Crystal symmetry
* Reciprocal lattices
* X-ray diffraction
* Phonons and lattice vibrations
* Specific heat of solids
* Thermal conductivity
* Electronic band structure
* Metals, insulators and semiconductors
* Fermi energy and Fermi surfaces
* Density of states
* Electron transport
* Electrical resistivity
* Hall effect
* Magnetic ordering
* Ferromagnetic and antiferromagnetic materials
* Dielectric properties
* Piezoelectricity
* Ferroelectricity
* Superconductivity
* Conventional and unconventional superconductors
* Cooper pairs
* Josephson effect
* Semiconductor heterostructures
* Quantum Hall effect
* Topological insulators
* Strongly correlated electron systems
* Low-dimensional materials
* Graphene and two-dimensional materials
* Nanomaterials
* Soft condensed matter
* Polymers, colloids and liquid crystals
28. Semiconductor Physics and Electronics
* Energy bands in solids
* Intrinsic and extrinsic semiconductors
* Doping
* Electrons and holes
* Carrier concentration
* Fermi level
* Drift and diffusion
* Mobility and conductivity
* p-n junctions
* Diodes
* Transistors
* Bipolar junction transistors
* Field-effect transistors
* MOSFETs
* Semiconductor heterojunctions
* Photodiodes
* Solar cells
* LEDs
* Semiconductor lasers
* Integrated circuits
* Quantum wells, wires and dots
* Tunnel diodes
* Spintronics
* Semiconductor fabrication principles
* Nanoscale electronic devices
29. Plasma Physics
* Plasma as a state of matter
* Ionisation and recombination
* Debye shielding
* Debye length
* Plasma frequency
* Charged-particle motion
* Plasma oscillations
* Magnetised plasmas
* Magnetohydrodynamics
* Plasma waves
* Alfvén waves
* Plasma instabilities
* Magnetic confinement
* Tokamaks and stellarators
* Inertial confinement fusion
* Fusion energy
* Solar and astrophysical plasmas
* Space plasma physics
* Plasma diagnostics
* Industrial and technological plasmas
30. Astrophysics
* Celestial mechanics
* Stellar structure and evolution
* Star formation
* Hydrostatic equilibrium in stars
* Nuclear fusion in stars
* Stellar spectra and classification
* Main-sequence stars
* Red giants and supergiants
* White dwarfs
* Neutron stars
* Pulsars
* Black holes
* Supernovae
* Neutron star mergers
* Binary star systems
* Accretion discs
* Exoplanets
* Planetary systems
* Interstellar medium
* Molecular clouds
* Cosmic dust
* Nebulae
* Star clusters
* Galaxies and galaxy formation
* Galaxy dynamics
* Dark matter in galaxies
* Active galactic nuclei
* Quasars
* Gravitational lensing
* High-energy astrophysics
* Cosmic rays
* Neutrino astronomy
* Gravitational-wave astronomy
* Multi-messenger astronomy
31. Cosmology
* The observable universe
* Cosmological principles
* Expansion of the universe
* Hubble's law
* Redshift and distance measurements
* Friedmann–Lemaître–Robertson–Walker models
* Big Bang cosmology
* Cosmic microwave background
* Primordial nucleosynthesis
* Structure formation
* Dark matter
* Dark energy
* Cosmological constant
* Inflationary cosmology
* Baryon acoustic oscillations
* Large-scale structure
* Galaxy surveys
* Cosmic distance ladder
* Age and geometry of the universe
* Open, flat and closed cosmologies
* Matter-energy density parameters
* Modified gravity
* Cyclic and alternative cosmological models
* Observational constraints on cosmology
32. Geophysics
* Earth's internal structure
* Earth's gravitational field
* Earth's magnetic field
* Geothermal energy
* Seismology
* Earthquake waves
* Earthquake mechanisms
* Plate tectonics
* Mantle convection
* Earth's rotation
* Paleomagnetism
* Geophysical surveying
* Gravity and magnetic surveys
* Electrical resistivity methods
* Ground-penetrating radar
* Rock mechanics
* Geophysical fluid dynamics
* Earth's atmosphere and oceans
* Planetary geophysics
* Natural hazard monitoring
33. Atmospheric Physics and Climate
* Atmospheric structure
* Atmospheric pressure and temperature
* Gas laws in the atmosphere
* Radiative transfer
* Solar and terrestrial radiation
* Greenhouse gases
* Atmospheric energy balance
* Convection and atmospheric stability
* Cloud formation and microphysics
* Precipitation physics
* Atmospheric circulation
* Fluid dynamics of the atmosphere
* Weather systems
* Atmospheric waves
* Turbulence and boundary layers
* Aerosols and atmospheric optics
* Climate modelling
* Climate feedback mechanisms
* Ocean-atmosphere interactions
* Climate sensitivity
* Remote sensing of the atmosphere
* Atmospheric electricity and lightning
34. Biophysics
* Physical principles of living systems
* Biomechanics
* Biological fluid dynamics
* Diffusion and transport
* Osmosis and membrane transport
* Thermodynamics of biological systems
* Molecular motors
* Protein dynamics
* DNA mechanics
* Membrane biophysics
* Electrophysiology
* Ion channels
* Nerve impulses and action potentials
* Neural signal processing
* Muscle contraction
* Cellular mechanics
* Tissue mechanics
* Medical imaging physics
* Radiation biology
* Optical microscopy
* Fluorescence microscopy
* Single-molecule methods
* Biological networks
* Statistical physics of living systems
* Computational biophysics
35. Medical Physics
* Physics of diagnostic imaging
* X-ray production and imaging
* Computed tomography
* Magnetic resonance imaging
* Nuclear medicine
* Positron emission tomography
* Single-photon emission computed tomography
* Ultrasound imaging
* Doppler ultrasound
* Radiation therapy
* Ionising radiation dosimetry
* Radiation protection
* Medical accelerators
* Brachytherapy
* Radiobiological modelling
* Image reconstruction
* Image registration and analysis
* Medical detector systems
* Optical medical imaging
* Functional imaging
* Quality assurance in medical physics
* Radiation safety and clinical risk
36. Optoelectronics and Photonics
* Light-matter interactions
* Semiconductor light emission
* LEDs and laser diodes
* Photodetectors
* Optical modulators
* Photonic integrated circuits
* Optical waveguides
* Fibre-optic communications
* Nonlinear optical processes
* Frequency conversion
* Ultrafast lasers
* Femtosecond optics
* Quantum optics
* Single-photon sources
* Photonic crystals
* Plasmonics
* Optical sensors
* Lidar
* Optical communications
* Optical metrology
* Silicon photonics
37. Quantum Information and Quantum Computing
* Qubits and quantum states
* Bloch sphere
* Quantum gates
* Quantum circuits
* Quantum measurement
* Entanglement
* Bell inequalities
* Quantum teleportation
* Quantum cryptography
* Quantum key distribution
* Quantum algorithms
* Deutsch–Jozsa algorithm
* Grover's algorithm
* Shor's algorithm
* Quantum error correction
* Quantum noise and decoherence
* Fault-tolerant quantum computing
* Quantum complexity
* Quantum simulation
* Quantum communication
* Quantum networks
* Physical implementations of qubits
* Superconducting qubits
* Trapped-ion systems
* Neutral-atom quantum computing
* Photonic quantum computing
38. Nonlinear Dynamics and Chaos
* Linear and nonlinear systems
* Nonlinear differential equations
* Fixed points and stability
* Phase-space analysis
* Bifurcation theory
* Period-doubling
* Deterministic chaos
* Sensitivity to initial conditions
* Lyapunov exponents
* Strange attractors
* Logistic map
* Lorenz system
* Fractals
* Self-organisation
* Synchronisation
* Coupled nonlinear oscillators
* Pattern formation
* Reaction-diffusion systems
* Solitons and nonlinear waves
* Chaos in mechanical and electrical systems
* Complex systems and emergent behaviour
39. Computational Physics
* Scientific programming
* Numerical integration
* Numerical differentiation
* Root-finding algorithms
* Solving ordinary differential equations
* Solving partial differential equations
* Finite difference methods
* Finite element methods
* Finite volume methods
* Monte Carlo simulation
* Molecular dynamics
* N-body simulations
* Computational fluid dynamics
* Numerical linear algebra
* Eigenvalue algorithms
* Fourier transforms and spectral methods
* Optimisation and parameter estimation
* Random number generation
* Error and stability analysis
* Parallel computing
* High-performance computing
* GPU computing
* Scientific visualisation
* Data analysis and fitting
* Reproducible computational experiments
* Verification and validation of simulations
* Machine learning in physics
* Physics-informed neural networks
* Digital twins and surrogate models
40. Mathematical and Theoretical Physics
* Lagrangian mechanics
* Hamiltonian mechanics
* Principle of least action
* Generalised coordinates
* Canonical transformations
* Hamilton–Jacobi theory
* Symplectic geometry
* Noether's theorem
* Continuous and discrete symmetries
* Lie groups and Lie algebras
* Representation theory
* Tensor calculus
* Differential geometry
* Manifolds and curvature
* Classical field theory
* Quantum field theory
* Path integrals
* Feynman diagrams
* Renormalisation
* Gauge theories
* Effective field theories
* Scattering theory
* Green's functions
* Perturbative and non-perturbative methods
* Solvable models
* Integrable systems
* Mathematical methods for boundary-value problems
41. Classical Field Theory
* Scalar, vector and tensor fields
* Field equations
* Lagrangian field theory
* Hamiltonian field theory
* Field symmetries
* Noether currents
* Conservation laws
* Electromagnetic field theory
* Stress-energy tensors
* Classical wave fields
* Gauge invariance
* Green's functions for field equations
* Boundary conditions
* Radiation from sources
* Continuum field models
42. Quantum Field Theory
* Quantum fields and particles
* Creation and annihilation operators
* Canonical quantisation
* Path-integral quantisation
* Propagators
* Feynman rules
* Scattering amplitudes
* Perturbation theory
* Divergences and regularisation
* Renormalisation
* Gauge invariance
* Quantum electrodynamics
* Quantum chromodynamics
* Electroweak theory
* Spontaneous symmetry breaking
* Higgs mechanism
* Effective field theory
* Renormalisation group
* Anomalies
* Non-Abelian gauge theories
* Lattice field theory
* Quantum field theory in curved spacetime
43. Nuclear and Particle Detection Methods
* Ionisation chambers
* Geiger–Müller counters
* Scintillation detectors
* Semiconductor radiation detectors
* Photomultiplier tubes
* Silicon tracking detectors
* Time projection chambers
* Calorimeters
* Cherenkov detectors
* Time-of-flight measurements
* Particle identification
* Trigger systems
* Event reconstruction
* Background suppression
* Detector calibration
* Radiation spectroscopy
* Accelerator instrumentation
* Collider data analysis
* Statistical significance of discoveries
44. Experimental and Applied Physics
* Instrumentation and sensor design
* Precision measurement
* Vacuum technology
* Cryogenic systems
* High-field magnets
* Laser systems
* Optical benches and alignment
* Spectroscopy
* Interferometry
* Microwave and radio-frequency measurement
* Electronics and signal processing
* Materials characterisation
* Scanning probe microscopy
* Electron microscopy
* X-ray diffraction
* Neutron scattering
* Synchrotron methods
* Particle accelerator operation
* Radiation measurement
* Experimental control systems
* Automation and data acquisition
* Laboratory safety and risk assessment
45. Materials Physics
* Structure-property relationships
* Atomic bonding and crystal structure
* Defects and dislocations
* Diffusion in solids
* Phase diagrams
* Phase transformations
* Mechanical properties
* Thermal properties
* Electrical properties
* Magnetic properties
* Optical properties
* Dielectric materials
* Semiconductors
* Superconductors
* Magnetic materials
* Metamaterials
* Nanostructured materials
* Thin films and coatings
* Amorphous materials
* Biomaterials
* Smart materials
* Shape-memory alloys
* Materials under extreme conditions
* Materials characterisation techniques
46. Renewable Energy and Energy Physics
* Energy conversion and conservation
* Solar photovoltaic physics
* Solar thermal systems
* Wind energy
* Hydroelectric power
* Tidal and wave energy
* Geothermal energy
* Nuclear fission energy
* Nuclear fusion energy
* Hydrogen energy systems
* Fuel cells
* Batteries and electrochemical energy storage
* Supercapacitors
* Thermoelectric energy conversion
* Heat pumps
* Energy efficiency
* Grid storage
* Energy transmission and losses
* Energy systems modelling
* Life-cycle energy analysis
* Energy security and sustainability
47. Acoustics, Vibrations and Engineering Physics
* Mechanical vibration analysis
* Structural dynamics
* Resonance and damping
* Modal analysis
* Noise control
* Acoustic materials
* Sound propagation in structures
* Aeroacoustics
* Underwater acoustics
* Vibration isolation
* Seismic engineering physics
* Shock waves
* Impact mechanics
* Tribology and friction
* Fluid-structure interaction
* Engineering measurement systems
* Failure analysis
* Reliability and physical modelling
48. Space Physics and Planetary Science
* Solar physics
* Solar wind
* Heliosphere
* Magnetospheres
* Ionospheres
* Space weather
* Cosmic rays
* Radiation belts
* Planetary atmospheres
* Planetary interiors
* Planetary magnetic fields
* Planetary rings
* Moons and tidal heating
* Comets and asteroids
* Meteorites and impact physics
* Planetary formation
* Exoplanet detection
* Orbital dynamics
* Spacecraft propulsion physics
* Remote sensing
* Planetary exploration instrumentation
* Habitability and astrobiology interfaces
49. Historical Development of Physics
* Ancient Greek natural philosophy
* Early astronomy and mechanics
* Medieval scientific traditions
* Scientific Revolution
* Galileo and experimental mechanics
* Newtonian mechanics
* Development of thermodynamics
* Electromagnetism and Maxwell
* Discovery of radioactivity
* Origins of quantum theory
* Development of special and general relativity
* Nuclear physics and the atomic age
* Development of quantum mechanics
* Particle physics and the Standard Model
* Space exploration and modern astrophysics
* History of computing in physics
* Women and underrepresented groups in physics
* Scientific institutions and funding
* Physics, technology and society
* Philosophy and history of scientific revolutions
50. Philosophy and Foundations of Physics
* Scientific realism and instrumentalism
* Explanation and prediction in physics
* Laws of nature
* Causality and determinism
* Probability and chance
* Measurement and observation
* The problem of induction
* Reductionism and emergence
* Space and time
* The nature of spacetime
* Interpretations of quantum mechanics
* Copenhagen interpretation
* Many-worlds interpretation
* Pilot-wave theory
* Objective collapse theories
* Quantum measurement problem
* Locality and nonlocality
* Bell's theorem
* Scientific explanation and unification
* Symmetry and physical law
* Model dependence and idealisation
* Underdetermination of theory by evidence
* The limits of scientific knowledge
51. Physics Education and Communication
* Explaining physical concepts clearly
* Scientific diagrams and representations
* Deriving equations from first principles
* Translating physical situations into mathematical models
* Estimation and order-of-magnitude reasoning
* Solving multi-step problems
* Interpreting graphs and experimental data
* Demonstrations and practical investigations
* Laboratory report writing
* Scientific presentations
* Peer review and research critique
* Communicating uncertainty
* Public engagement with physics
* Science communication and misinformation
* Teaching and assessing conceptual understanding
* Identifying misconceptions
* Interdisciplinary communication
52. Advanced Problem-Solving Skills
* Identifying relevant physical principles
* Defining systems and boundaries
* Choosing coordinate systems
* Drawing free-body and field diagrams
* Applying conservation laws
* Deriving equations from fundamental laws
* Checking units and dimensions
* Evaluating limiting cases
* Estimating numerical answers
* Analysing approximations
* Solving coupled equations
* Selecting appropriate mathematical techniques
* Comparing analytical and numerical solutions
* Sensitivity analysis
* Physical interpretation of mathematical results
* Error checking and independent verification
* Communicating assumptions and limitations
53. Interdisciplinary Physics
* Physics and chemistry
* Physical chemistry
* Chemical physics
* Physics and biology
* Biomechanics
* Physics and medicine
* Physics and neuroscience
* Physics and materials science
* Physics and computer science
* Physics and mathematics
* Physics and engineering
* Physics and environmental science
* Physics and Earth science
* Physics and economics
* Complex systems
* Network science
* Statistical modelling of social systems
* Climate and energy systems
* Nanotechnology
* Quantum technologies
* Scientific machine learning
* Cross-disciplinary research design
54. Research and Professional Physics Skills
* Reading and evaluating scientific papers
* Literature searches and systematic reviews
* Formulating research questions
* Developing theoretical models
* Designing experiments
* Writing research proposals
* Grant applications and project planning
* Laboratory management
* Research ethics and integrity
* Data management and documentation
* Version control and reproducible workflows
* Collaboration across disciplines
* Research presentations and posters
* Scientific writing and publishing
* Peer review
* Intellectual property and technology transfer
* Project management
* Research impact and public engagement
* Communicating with industry and policymakers
* Careers in academia, industry and scientific computing
`;

// tracks group the units on the path and in the Tracks view; each has its own banner colours
export const TRACKS = [
  { name: "Foundations", units: [1, 2, 3], from: "#ff5600", to: "#f055dd" },
  { name: "Mechanics", units: [4, 5, 6, 7, 8, 9], from: "#ff3d6e", to: "#a24bff" },
  { name: "Waves and sound", units: [10, 11], from: "#00b3ff", to: "#4641ff" },
  { name: "Thermal physics", units: [12, 13, 14], from: "#ff8a00", to: "#ff2d55" },
  { name: "Electromagnetism and light", units: [15, 16, 17, 18, 19], from: "#ffc002", to: "#ff5600" },
  { name: "Modern physics", units: [20, 21, 22, 23, 24, 25, 26], from: "#8a5cff", to: "#ff3dc4" },
  { name: "Matter", units: [27, 28, 29, 45], from: "#00c2a8", to: "#0077ff" },
  { name: "The universe", units: [30, 31, 32, 33, 48], from: "#3a4bff", to: "#00d4ff" },
  { name: "Life and medicine", units: [34, 35], from: "#ff4d6d", to: "#ff9f40" },
  { name: "Technology", units: [36, 37, 43, 44, 46, 47], from: "#16c784", to: "#00a3ff" },
  { name: "Theory and computation", units: [38, 39, 40, 41, 42], from: "#b14bff", to: "#3d5cff" },
  { name: "Thinking like a physicist", units: [49, 50, 51, 52, 53, 54], from: "#ff7a3d", to: "#ffc002" },
];

// curated routes through the units, for the Paths view
export const PATHS = [
  { id: "alevel", name: "A level Physics", sub: "Everything for A level and equivalent exams, in exam order.", units: [1, 3, 4, 6, 7, 10, 12, 15, 16, 17, 19, 20, 23, 30] },
  { id: "year1", name: "University year 1", sub: "The first-year core of a physics degree.", units: [2, 3, 4, 5, 6, 10, 12, 15, 16, 17, 25] },
  { id: "quantum", name: "Quantum physics", sub: "From the photoelectric effect to quantum computers.", units: [20, 21, 22, 13, 37, 42] },
  { id: "universe", name: "Astrophysics and cosmology", sub: "Stars, galaxies, black holes and the universe.", units: [7, 25, 26, 30, 31, 48] },
  { id: "medical", name: "Medical physics", sub: "The physics behind imaging, radiotherapy and the body.", units: [11, 23, 34, 35, 43] },
  { id: "engineering", name: "Engineering physics", sub: "Physics for engineers: materials, energy, vibration and electronics.", units: [8, 9, 14, 28, 46, 47] },
  { id: "theory", name: "Theoretical physics", sub: "The mathematics and theory behind modern physics.", units: [2, 40, 41, 42, 38, 50] },
  { id: "research", name: "Research-ready", sub: "Skills for projects, dissertations and a career in physics.", units: [3, 39, 51, 52, 54] },
];

// the syllabus as units and lessons; lesson ids are u01-01 style
export const UNITS = SYLLABUS.trim().split(/\n(?=\d+\. )/).map((block) => {
  const [head, ...rest] = block.split("\n");
  const n = Number(head.match(/^(\d+)\./)[1]), id = `u${String(n).padStart(2, "0")}`;
  return { n, id, title: head.replace(/^\d+\.\s*/, ""), lessons: rest.filter((l) => l.startsWith("* ")).map((l, i) => ({ id: `${id}-${String(i + 1).padStart(2, "0")}`, title: l.slice(2).trim() })) };
});
