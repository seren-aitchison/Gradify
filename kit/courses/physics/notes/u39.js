// Unit 39: Computational Physics. Format: kit/course/notes.js
export default `
## Scientific programming
S: Scientific programming turns physical models into code that computes answers no pen-and-paper method can reach. Good scientific code is correct, readable, tested and efficient, written in languages such as Python, C++, Fortran and Julia.
H: The workflow
- Formulate the model: equations, parameters, boundary and initial conditions.
- Choose a numerical method and discretisation.
- Implement, test against known solutions, then run.
- Analyse, visualise and document results.
H: Languages and tools
- **Python** with NumPy, SciPy, Matplotlib: fast development; vectorised arrays call compiled code.
- **C, C++, Fortran**: speed and control for large simulations; Fortran still dominates climate and physics codes.
- **Julia**: high-level syntax with compiled speed.
- Version control (git), notebooks for exploration, scripts and packages for production.
H: Good practice
- Use vectorised operations instead of Python loops where possible (often 10–100× faster).
- Avoid "magic numbers": name constants and parameters.
- Write small functions with unit tests; compare with analytic cases.
- Check units and dimensions consistently; consider non-dimensionalising equations.
- Profile before optimising: find where time actually goes.
H: Floating point
P: Computers store real numbers as IEEE 754 floating point: double precision has ~16 significant digits, with machine epsilon ε ≈ 2.2 × 10^{-16}. Subtracting nearly equal numbers loses precision (catastrophic cancellation). Comparing floats should use tolerances, not ==. Integer overflow and float underflow are classic silent bugs.
E: ε_{mach} = 2^{−52} ≈ 2.2 × 10^{-16} :: double-precision machine epsilon
X: Compute 1 − cos x for x = 10^{-8} in double precision.
> cos(10^{-8}) rounds to exactly 1, so 1 − cos x = 0: total loss
> Rewrite as 2 sin^{2}(x/2) ≈ 5 × 10^{-17}, which is accurate
X: Why is a NumPy sum faster than a Python for loop?
> The loop runs in compiled C over contiguous memory, avoiding per-element interpreter overhead
K: Correct, tested and clearly written code matters more than clever tricks; respect floating-point limits.
!: Never test floating-point equality with ==; use a tolerance such as abs(a − b) < 1e-12 × scale.
Q: What is machine epsilon in double precision? | About 2.2 × 10^{-16}.
Q: What is catastrophic cancellation? | Loss of significant digits when subtracting nearly equal numbers.
M1: Double precision gives about: | 16 significant digits | 7 digits | 32 digits | 3 digits | 53-bit mantissa.
M2: Before optimising code you should: | Profile it | Rewrite in assembly | Remove tests | Add more loops | Find the real bottleneck.

## Numerical integration
S: Numerical integration (quadrature) approximates definite integrals by weighted sums of function values. Simple rules like the trapezium and Simpson's rule work well for smooth functions, while Gaussian quadrature, adaptive methods and Monte Carlo handle harder cases.
H: Newton–Cotes rules
- **Trapezium**: ∫f dx ≈ h[f_{0}/2 + f_{1} + … + f_{N−1} + f_{N}/2]; error O(h^{2}).
- **Simpson's rule**: (h/3)[f_{0} + 4f_{1} + 2f_{2} + 4f_{3} + … + f_{N}]; error O(h^{4}); needs even N.
- Halving h reduces trapezium error 4× and Simpson's error 16×.
E: E_{trap} = −(b − a)h^{2}f''(ξ)/12 :: trapezium error
E: E_{Simp} = −(b − a)h^{4}f^{(4)}(ξ)/180 :: Simpson error
H: Better methods
- **Gaussian quadrature**: chooses nodes and weights to integrate polynomials of degree 2n − 1 exactly with n points.
- **Romberg integration**: Richardson extrapolation of trapezium results.
- **Adaptive quadrature**: refines intervals where the integrand varies quickly.
- **Singularities**: change variables or use specialised rules.
H: High dimensions
P: Grid-based rules need N^{d} points in d dimensions, the curse of dimensionality. Monte Carlo integration's error falls as 1/√N regardless of dimension, so it wins for d ≳ 5. Quasi-Monte Carlo (Sobol sequences) can do better, ~1/N for smooth integrands.
X: Estimate ∫_{0}^{1} x^{2} dx with the trapezium rule, h = 0.5.
> Points: 0, 0.25, 1
> 0.5 × [0/2 + 0.25 + 1/2] = 0.375 (exact 1/3)
X: The same with Simpson's rule.
> (0.5/3)(0 + 4 × 0.25 + 1) = (1/6)(2) = 0.3333, exact for polynomials up to cubic
K: Higher-order rules converge faster for smooth functions; Monte Carlo wins in high dimensions.
!: High-order rules can perform worse on non-smooth or noisy integrands; check convergence by refining h.
Q: How does trapezium error scale with step size? | As h^{2}.
Q: Why use Monte Carlo for high-dimensional integrals? | Its error ∝ 1/√N doesn't depend on dimension.
M1: Halving h in Simpson's rule reduces error by about: | 16× | 4× | 2× | 8× | O(h^{4}).
M2: n-point Gaussian quadrature is exact for polynomials up to degree: | 2n − 1 | n | n + 1 | 2n + 1 | Optimally chosen nodes.

## Numerical differentiation
S: Numerical differentiation estimates derivatives from function values at nearby points. Finite-difference formulas are simple, but choosing the step size is a balance: too large gives truncation error, too small gives round-off error.
H: Finite-difference formulas
- **Forward**: f'(x) ≈ [f(x + h) − f(x)]/h; error O(h).
- **Central**: f'(x) ≈ [f(x + h) − f(x − h)]/(2h); error O(h^{2}).
- **Second derivative**: f''(x) ≈ [f(x + h) − 2f(x) + f(x − h)]/h^{2}; error O(h^{2}).
- Derived from Taylor series; higher-order stencils use more points.
E: f'(x) ≈ [f(x + h) − f(x − h)]/(2h) :: central difference
E: f''(x) ≈ [f(x + h) − 2f(x) + f(x − h)]/h^{2} :: second difference
H: Optimal step size
- Truncation error ~h^{2}f'''/6 (central); round-off error ~ε|f|/h.
- Total error is minimised at h ~ ε^{1/3} ≈ 6 × 10^{-6} for central differences in double precision.
- For forward differences, h ~ √ε ≈ 10^{-8}.
H: Alternatives
P: **Richardson extrapolation** combines estimates at h and h/2 to cancel leading errors. **Complex-step differentiation**: f'(x) ≈ Im f(x + ih)/h, with no subtraction, so h can be 10^{-20}. **Automatic differentiation** (forward or reverse mode) applies the chain rule to code, giving exact derivatives to machine precision; it powers machine learning and adjoint methods. Noisy data need smoothing or fitting first.
X: Estimate d/dx sin x at x = 1 with central difference, h = 0.1.
> [sin 1.1 − sin 0.9]/0.2 = (0.89121 − 0.78333)/0.2 = 0.53940
> Exact cos 1 = 0.54030; error ≈ 9 × 10^{-4} ≈ h^{2}/6 × cos 1
K: Central differences are second-order accurate; choose h to balance truncation and round-off.
!: Making h ever smaller does not keep improving accuracy; below the optimum, round-off error explodes.
Q: What is the error order of the central difference? | O(h^{2}).
Q: What is automatic differentiation? | Exact evaluation of derivatives by applying the chain rule to each operation in code.
M1: The forward difference has error of order: | h | h^{2} | h^{3} | 1/h | It uses one-sided Taylor expansion.
M2: Complex-step differentiation avoids: | Subtractive cancellation | Complex numbers | Taylor series | Step size choice entirely | No subtraction of close values.

## Root-finding algorithms
S: Root-finding algorithms solve f(x) = 0 when no formula exists. Bisection is slow but guaranteed; Newton's method is fast but can fail; hybrid methods combine safety and speed. Root-finding underlies solving equations of state, energy levels and implicit integration steps.
H: Methods
- **Bisection**: halve an interval [a, b] with sign change; error halves each step (linear convergence).
- **Newton–Raphson**: x_{n+1} = x_{n} − f(x_{n})/f'(x_{n}); quadratic convergence near a simple root.
- **Secant**: Newton with a finite-difference derivative; order ≈ 1.618.
- **Brent's method**: combines bisection, secant and inverse quadratic interpolation; robust and fast (SciPy's brentq).
E: x_{n+1} = x_{n} − f(x_{n})/f'(x_{n}) :: Newton–Raphson
E: n ≥ log_{2}((b − a)/tol) :: bisection steps needed
H: Pitfalls
- Newton can diverge, cycle or jump to the wrong root if f' ≈ 0 or the start is poor.
- Multiple roots slow Newton to linear convergence.
- Bisection needs a bracket with opposite signs.
H: Systems of equations
P: For F(x) = 0 in many dimensions, Newton's method solves J Δx = −F at each step, where J is the Jacobian. Quasi-Newton methods (Broyden) update J approximately. Line searches and trust regions improve robustness. Continuation methods track solutions as parameters vary, useful for bifurcation diagrams.
X: Find √2 by Newton on f = x^{2} − 2, x_{0} = 1.
> x_{1} = 1 − (−1)/2 = 1.5
> x_{2} = 1.5 − 0.25/3 = 1.41667
> x_{3} = 1.41667 − 0.00694/2.8333 ≈ 1.414216: digits roughly double each step
X: How many bisection steps to bracket a root in [0, 1] to 10^{-6}?
> log_{2}(10^{6}) ≈ 20 steps
K: Bracketing methods are safe, Newton is fast; robust solvers use both.
!: Newton's method needs a good initial guess; plot the function first.
Q: What is the convergence order of Newton's method? | Quadratic, near a simple root.
Q: What does Brent's method combine? | Bisection, secant and inverse quadratic interpolation.
M1: Bisection's convergence is: | Linear | Quadratic | Cubic | Superexponential | Error halves each step.
M2: Newton fails when: | f'(x) ≈ 0 near the iterate | f is smooth | The root is simple | Starting close to the root | Division by a tiny derivative.

## Solving ordinary differential equations
S: Most physical ODEs, such as orbits, circuits and reaction kinetics, must be solved numerically. Methods step forward in time, trading accuracy, stability and cost, and the right choice depends on whether the problem is smooth, stiff or conservative.
H: Explicit methods
- **Euler**: y_{n+1} = y_{n} + hf(t_{n}, y_{n}); first order, unstable for many problems.
- **Runge–Kutta 4 (RK4)**: four slope evaluations per step; error O(h^{4}).
- **Adaptive RK (RK45, Dormand–Prince)**: estimates error and adjusts h automatically.
E: k_{1} = f(t, y), k_{2} = f(t + h/2, y + hk_{1}/2), k_{3} = f(t + h/2, y + hk_{2}/2), k_{4} = f(t + h, y + hk_{3}) :: RK4 stages
E: y_{n+1} = y_{n} + (h/6)(k_{1} + 2k_{2} + 2k_{3} + k_{4}) :: RK4 update
H: Stiff problems
- Stiff systems mix very fast and slow timescales (chemistry, circuits).
- Explicit methods need tiny steps for stability.
- **Implicit methods** (backward Euler, BDF, Radau) are stable for large steps but require solving equations each step.
H: Conservative systems
P: For Hamiltonian problems like planetary orbits, ordinary methods slowly gain or lose energy. **Symplectic integrators** (leapfrog/Verlet, Yoshida) preserve phase-space structure, keeping energy errors bounded for billions of steps. Boundary-value problems use shooting methods (guess, integrate, adjust) or relaxation methods.
X: Euler for y' = −y, y(0) = 1, h = 0.1. Find y(0.2).
> y_{1} = 1 − 0.1 = 0.9
> y_{2} = 0.9 − 0.09 = 0.81 (exact e^{−0.2} = 0.8187)
X: For y' = −100y, what step size keeps explicit Euler stable?
> Need |1 − 100h| < 1 ⇒ h < 0.02
K: Choose RK45 for smooth problems, implicit methods for stiff ones, and symplectic integrators for long Hamiltonian runs.
!: A stable-looking result does not mean an accurate one; always check convergence by changing the step size.
Q: What is a stiff ODE? | One with widely separated timescales that forces explicit methods to take tiny steps.
Q: Why use symplectic integrators for orbits? | They preserve phase-space structure so energy errors stay bounded.
M1: RK4's global error scales as: | h^{4} | h | h^{2} | h^{5} | Fourth-order method.
M2: Shooting methods solve: | Boundary-value problems | Initial-value problems only | Integrals | Eigenvalues only | Adjust initial conditions to meet end conditions.

## Solving partial differential equations
S: Partial differential equations govern fields in space and time: heat, waves, fluids, electromagnetism and quantum mechanics. Numerical PDE methods discretise space and time, and the equation's type (elliptic, parabolic or hyperbolic) shapes which methods work.
H: Types of PDE
- **Elliptic** (Laplace, Poisson): steady states; boundary conditions everywhere; solved with relaxation or linear solvers.
- **Parabolic** (diffusion/heat): smoothing in time; stability constraints for explicit schemes.
- **Hyperbolic** (wave, advection): information travels at finite speeds along characteristics; CFL condition applies.
E: ∇^{2}φ = −ρ/ε_{0} :: Poisson (elliptic)
E: ∂u/∂t = D∇^{2}u :: diffusion (parabolic)
E: ∂^{2}u/∂t^{2} = c^{2}∇^{2}u :: wave (hyperbolic)
H: Discretisation families
- **Finite differences**: replace derivatives with differences on a grid.
- **Finite elements**: piecewise polynomial basis on meshes; flexible geometry.
- **Finite volumes**: conserve fluxes through cells; standard in CFD.
- **Spectral methods**: global basis functions (Fourier, Chebyshev) with exponential accuracy for smooth problems.
H: Boundary and initial conditions
P: Dirichlet (fixed value), Neumann (fixed gradient), periodic and absorbing boundaries must be implemented carefully; bad boundaries cause reflections and errors. Method of lines: discretise space to get many ODEs, then use an ODE solver in time. Multigrid solves elliptic problems in O(N) operations.
X: Classify u_{t} + cu_{x} = 0.
> First-order hyperbolic (advection): solutions travel at speed c without change
X: How many unknowns for a 3D Poisson grid of 200 points per side?
> 200^{3} = 8 × 10^{6} unknowns, so efficient sparse solvers are essential
K: Know your PDE type: it dictates boundary conditions, stability limits and suitable methods.
!: Unphysical boundary reflections and too-coarse grids are the most common sources of PDE simulation error.
Q: What kind of PDE is the heat equation? | Parabolic.
Q: What is the method of lines? | Discretising space only to obtain a system of ODEs, which are then integrated in time.
M1: Laplace's equation is: | Elliptic | Parabolic | Hyperbolic | Not a PDE | Steady-state, no time.
M2: Multigrid methods solve elliptic problems in: | O(N) operations | O(N^{3}) | O(e^{N}) | O(N^{2} log N) only | Hierarchy of grids removes all error scales.

## Finite difference methods
S: Finite difference methods replace derivatives with differences on a regular grid, turning PDEs into algebraic equations. They are simple to code and analyse, and stability conditions such as the CFL criterion decide which time steps work.
H: Heat equation schemes
- **FTCS (explicit)**: u_{i}^{n+1} = u_{i}^{n} + r(u_{i+1}^{n} − 2u_{i}^{n} + u_{i−1}^{n}), r = DΔt/Δx^{2}.
- Stable only if r ≤ 1/2.
- **Backward Euler (implicit)**: unconditionally stable; requires solving a tridiagonal system each step.
- **Crank–Nicolson**: average of both; second-order in time, unconditionally stable.
E: r = DΔt/Δx^{2} ≤ 1/2 :: FTCS stability
H: Wave and advection
- Leapfrog or explicit central schemes for the wave equation need the CFL condition.
- Upwind schemes for advection are stable but diffusive.
- Lax–Wendroff is second-order but can oscillate near discontinuities.
E: C = cΔt/Δx ≤ 1 :: Courant–Friedrichs–Lewy condition
H: Laplace and Poisson
P: On a grid, Laplace's equation says each point equals the average of its neighbours. Jacobi and Gauss–Seidel relaxation sweep until convergence; successive over-relaxation (SOR) speeds this up greatly. Von Neumann stability analysis substitutes Fourier modes to find amplification factors; |G| ≤ 1 means stable.
X: Diffusion with D = 10^{-4} m^{2} s^{-1}, Δx = 1 mm. Maximum stable FTCS time step?
> Δt ≤ Δx^{2}/(2D) = 10^{-6}/(2 × 10^{-4}) = 5 × 10^{-3} s
X: A wave travels at 340 m s^{-1} with Δx = 1 cm. Maximum Δt?
> Δt ≤ 0.01/340 ≈ 2.9 × 10^{-5} s
K: Finite differences are easy to implement; their stability limits must be respected or solutions blow up.
!: Halving Δx in explicit diffusion requires quartering Δt, so costs rise steeply; implicit schemes avoid this.
Q: What is the CFL condition? | The numerical domain of dependence must include the physical one: cΔt/Δx ≤ 1 for simple schemes.
Q: Why is Crank–Nicolson popular? | It is second-order accurate in time and unconditionally stable.
M1: Explicit FTCS for diffusion is stable if r is at most: | 1/2 | 1 | 2 | 1/4 | Von Neumann analysis.
M2: Upwind schemes suffer from: | Numerical diffusion | Instability always | No accuracy at all | Infinite cost | First-order smoothing.

## Finite element methods
S: The finite element method breaks a complicated region into small elements, approximates the solution on each with simple functions, and assembles a global system. Its flexibility with geometry makes it the standard in structural engineering, electromagnetics and biomechanics.
H: The idea
- Write the PDE in weak (variational) form: multiply by test functions and integrate by parts.
- Divide the domain into elements (triangles, tetrahedra, hexahedra).
- Approximate u ≈ Σ u_{j}φ_{j}, where φ_{j} are local basis functions (often piecewise linear "hat" functions).
- Assemble a sparse stiffness matrix: K u = F.
E: ∫ ∇u·∇v dΩ = ∫ f v dΩ :: weak form of Poisson's equation
E: K_{ij} = ∫ ∇φ_{i}·∇φ_{j} dΩ :: stiffness matrix
H: Strengths
- Handles irregular geometries and varying materials naturally.
- Natural boundary conditions (Neumann) emerge from the weak form.
- Adaptive mesh refinement concentrates elements where errors are large.
- Rigorous error estimates; higher-order elements (p-refinement) improve accuracy.
H: Applications
P: Bridge and aircraft stress analysis, crash simulations, heat flow in electronics, MRI coil design, bone implants and earthquake engineering all rely on FEM. Software includes Abaqus, ANSYS, COMSOL and open-source FEniCS and deal.II. Meshing quality strongly affects results: badly shaped elements cause large errors.
X: A 1D bar with linear elements of length h. What is the element stiffness matrix for −u'' = f?
> k_{e} = (1/h)[[1, −1], [−1, 1]]
> Assembling elements gives a tridiagonal global matrix
X: How does error scale for linear elements in the energy norm?
> O(h): halving element size halves the error (and O(h^{2}) in the L^{2} norm)
K: FEM turns PDEs into sparse linear systems using local basis functions on flexible meshes.
!: Results depend on mesh quality; always run a mesh-convergence study.
Q: What is the weak form? | An integral version of the PDE obtained by multiplying by test functions and integrating by parts.
Q: What is adaptive mesh refinement? | Refining the mesh where estimated errors are largest.
M1: FEM's main advantage over finite differences is: | Complex geometry handling | Always faster | No matrices | No boundary conditions | Unstructured meshes.
M2: Hat functions are: | Piecewise linear basis functions | Fourier modes | Random numbers | Splines only | Peaks at one node, zero at others.

## Finite volume methods
S: Finite volume methods divide space into cells and track the flux of conserved quantities across cell faces. Because what leaves one cell enters its neighbour, mass, momentum and energy are conserved exactly, which makes them the workhorse of computational fluid dynamics.
H: The approach
- Integrate the conservation law ∂u/∂t + ∇·F(u) = 0 over each cell.
- Cell averages change by the net flux through faces.
- Fluxes at faces are estimated from neighbouring cell values.
E: dū_{i}/dt = −(1/V_{i}) Σ_{faces} F·n A :: finite-volume update
H: Computing fluxes
- **Godunov's method**: solve a Riemann problem at each face.
- **Approximate Riemann solvers**: Roe, HLL, HLLC.
- **Higher order**: MUSCL reconstruction with slope limiters; WENO schemes.
- Limiters prevent spurious oscillations near shocks (total variation diminishing, TVD).
H: Uses
P: Finite volume codes simulate airflow over wings, combustion, weather and ocean circulation, astrophysical gas dynamics and blood flow. They handle shocks and discontinuities robustly. Popular codes: OpenFOAM, ANSYS Fluent, Athena++ in astrophysics. Unstructured meshes allow complex geometry, as in FEM.
X: A 1D cell of width 0.1 m has inflow flux 2 kg m^{-2} s^{-1} and outflow 1.5. Rate of change of density?
> dρ/dt = (2 − 1.5)/0.1 = 5 kg m^{-3} s^{-1}
K: Finite volumes conserve quantities exactly by balancing fluxes, making them ideal for fluids with shocks.
!: High-order reconstruction without limiters creates oscillations at shocks; limiters reduce accuracy locally to keep stability.
Q: Why are finite volumes conservative? | The flux leaving a cell through a face is exactly the flux entering its neighbour.
Q: What is a Riemann problem? | Evolution from an initial jump between two constant states, solved at cell faces.
M1: Slope limiters are used to: | Prevent oscillations near shocks | Increase time step | Remove conservation | Add noise | TVD schemes.
M2: OpenFOAM is mainly a: | Finite volume CFD code | Molecular dynamics code | Quantum chemistry code | Spreadsheet | Open-source fluid solver.

## Monte Carlo simulation
S: Monte Carlo methods use random sampling to estimate integrals, simulate stochastic processes and explore huge state spaces. From particle transport to statistical mechanics, they trade exactness for flexibility and errors that shrink as 1/√N.
H: Basic Monte Carlo
- Estimate ∫f(x)dx as the average of f at random points times the volume.
- Statistical error σ/√N.
- Example: estimate π from the fraction of random points inside a quarter circle.
E: I ≈ V(1/N)Σf(x_{i}), error ≈ Vσ_{f}/√N :: Monte Carlo integration
H: Variance reduction
- **Importance sampling**: sample where f is large; weight accordingly.
- **Stratified sampling**, control variates, antithetic variates.
- Better sampling can reduce error by orders of magnitude for the same N.
H: Markov chain Monte Carlo
- **Metropolis algorithm**: propose a move; accept with probability min(1, e^{−ΔE/k_{B}T}).
- Generates configurations distributed by the Boltzmann factor; used for Ising models, liquids, polymers.
- Detailed balance ensures the right equilibrium distribution.
- Watch for autocorrelation and equilibration; critical slowing down near phase transitions (cluster algorithms like Wolff help).
E: P_{accept} = min(1, e^{−ΔE/k_{B}T}) :: Metropolis rule
H: Particle transport
P: Geant4 and MCNP track individual photons, electrons and neutrons through matter, sampling interactions from cross-sections. Used in radiotherapy dose calculation, detector design and reactor shielding. Bayesian inference uses MCMC to sample posterior distributions of model parameters.
X: Of 10 000 random points in a unit square, 7850 fall inside the quarter circle. Estimate π and the uncertainty.
> π ≈ 4 × 0.785 = 3.14
> σ = 4√(p(1 − p)/N) = 4√(0.785 × 0.215/10^{4}) ≈ 0.016
X: Metropolis at k_{B}T = 1 proposes ΔE = +2. Acceptance probability?
> e^{−2} ≈ 0.135
K: Monte Carlo's error falls as 1/√N regardless of dimension; MCMC samples complex distributions like Boltzmann's.
!: MCMC samples are correlated; effective sample size can be much smaller than the number of steps.
Q: What does detailed balance guarantee in MCMC? | The chain converges to the desired equilibrium distribution.
Q: What is importance sampling? | Sampling more often where the integrand matters most, with compensating weights.
M1: To halve Monte Carlo error you need: | 4× more samples | 2× more | 8× more | No change | Error ∝ 1/√N.
M2: Geant4 is used for: | Particle transport through matter | Weather forecasting | Spreadsheets | Optics design only | Monte Carlo detector simulation.

## Molecular dynamics
S: Molecular dynamics simulates the motion of atoms and molecules by integrating Newton's equations with forces from interatomic potentials. It reveals how proteins fold, liquids flow, materials fracture and drugs bind, at femtosecond resolution.
H: The method
- Choose a force field: Lennard-Jones, Coulomb, bonded terms (bonds, angles, dihedrals), or forces from quantum calculations (ab initio MD).
- Integrate with velocity Verlet (time step ~1–2 fs for biomolecules).
- Apply periodic boundary conditions to mimic bulk systems.
- Control temperature and pressure with thermostats (Nosé–Hoover, Langevin) and barostats.
E: V_{LJ}(r) = 4ε[(σ/r)^{12} − (σ/r)^{6}] :: Lennard-Jones potential
E: x(t + Δt) = x + vΔt + ½aΔt^{2}; v(t + Δt) = v + ½(a + a')Δt :: velocity Verlet
H: Efficiency
- Neighbour lists and cutoffs reduce pair calculations from O(N^{2}) to O(N).
- Ewald summation and particle mesh Ewald (PME) handle long-range electrostatics in O(N log N).
- Constraints (SHAKE, LINCS) on fast bond vibrations allow larger steps.
H: What you can measure
P: Radial distribution functions, diffusion coefficients (from mean squared displacement), viscosity, free energies (via enhanced sampling), phase transitions and mechanical properties. Codes: GROMACS, LAMMPS, NAMD, AMBER. Machine-learned potentials now approach quantum accuracy at classical cost. Timescales remain limited: microseconds to milliseconds even on special hardware (Anton).
E: D = lim ⟨|r(t) − r(0)|^{2}⟩/(6t) :: diffusion from mean squared displacement
X: A protein simulation uses a 2 fs time step. How many steps for 1 μs?
> 10^{-6}/2 × 10^{-15} = 5 × 10^{8} steps
X: MSD reaches 6 × 10^{-18} m^{2} in 1 ns. Diffusion coefficient?
> D = 6 × 10^{-18}/(6 × 10^{-9}) = 10^{-9} m^{2} s^{-1}
K: MD integrates Newton's laws for atoms; force fields set accuracy, time steps set cost.
!: Results are only as good as the force field and the sampling; one short trajectory rarely captures rare events.
Q: Why use periodic boundary conditions? | To simulate a bulk material without surfaces, using a small replicated box.
Q: Why is the time step ~1–2 fs? | It must resolve the fastest motions, such as bond vibrations involving hydrogen.
M1: Lennard-Jones repulsion scales as: | 1/r^{12} | 1/r^{6} | 1/r | r^{2} | Steep short-range repulsion.
M2: PME is used for: | Long-range electrostatics | Thermostats | Visualisation | Neighbour lists | Particle mesh Ewald.

## N-body simulations
S: N-body simulations follow many particles interacting through long-range forces, mainly gravity. They model planetary systems, star clusters, galaxy collisions and the formation of the cosmic web of dark matter from tiny early fluctuations.
H: Direct summation
- Each particle feels Σ Gm_{j}(r_{j} − r_{i})/|r_{j} − r_{i}|^{3}.
- O(N^{2}) cost: feasible for up to ~10^{6} particles with GPUs.
- Softening ε avoids infinite forces in close encounters: replace r^{2} with r^{2} + ε^{2}.
- Symplectic, time-reversible integrators (leapfrog, Hermite) for accuracy.
E: a_{i} = Σ_{j≠i} Gm_{j}(r_{j} − r_{i})/(|r_{j} − r_{i}|^{2} + ε^{2})^{3/2} :: softened gravity
H: Fast methods
- **Barnes–Hut tree**: group distant particles into multipoles; O(N log N).
- **Fast multipole method**: O(N).
- **Particle-mesh (PM)**: deposit mass on a grid, solve Poisson with FFT.
- **TreePM** hybrids combine both; used in cosmological codes like GADGET and AREPO.
H: Cosmological simulations
P: Simulations such as Millennium, IllustrisTNG and EAGLE evolve billions of dark-matter particles in expanding boxes hundreds of megaparsecs wide, plus gas, star formation and black hole feedback. They reproduce filaments, voids and galaxy statistics, testing ΛCDM. Planetary N-body integrations show the solar system's long-term chaos.
X: Direct summation for N = 10^{6}: number of pair interactions per step?
> N(N − 1)/2 ≈ 5 × 10^{11}
> A tree code needs ~N log_{2}N ≈ 2 × 10^{7} operations, about 25 000× fewer
K: N-body codes use trees, meshes and multipoles to tame O(N^{2}) gravity for millions to trillions of particles.
!: Softening and resolution limits mean small-scale structure in simulations must be interpreted carefully.
Q: What does the Barnes–Hut algorithm do? | It approximates distant groups of particles by their centre of mass, giving O(N log N) cost.
Q: Why use softening in N-body codes? | To avoid singular forces and tiny time steps in close encounters.
M1: Particle-mesh methods solve gravity using: | FFTs on a grid | Direct summation only | Monte Carlo | Root finding | Poisson equation in Fourier space.
M2: IllustrisTNG is a: | Cosmological simulation | Particle accelerator | Telescope | Climate model | Galaxy formation in a box.

## Computational fluid dynamics
S: Computational fluid dynamics (CFD) solves the equations of fluid flow numerically, predicting forces, heat transfer and mixing. It designs aircraft, cars, turbines, buildings and blood vessels, and models weather, oceans and stars.
H: The equations
- Navier–Stokes: ρ(∂v/∂t + v·∇v) = −∇p + μ∇^{2}v + f, plus continuity ∂ρ/∂t + ∇·(ρv) = 0, which becomes ∇·v = 0 for incompressible flow.
- Compressible flows add energy equations and equations of state; shocks need special schemes.
E: ρ(∂v/∂t + v·∇v) = −∇p + μ∇^{2}v + f :: momentum equation
E: Re = ρvL/μ :: Reynolds number
H: Turbulence modelling
- **DNS** (direct numerical simulation): resolves all scales; cost ∝ Re^{3}, only feasible at modest Re.
- **LES** (large eddy simulation): resolves large eddies, models small ones.
- **RANS** (Reynolds-averaged): models all turbulence with closures (k–ε, k–ω SST); cheap, standard in industry.
- Wall functions handle thin boundary layers.
H: Workflow
P: Build geometry; mesh it (finer near walls and wakes); set boundary conditions; choose solver and turbulence model; run to convergence; post-process forces and flow fields. Validate against wind tunnel data. Pressure–velocity coupling algorithms (SIMPLE, PISO) solve incompressible flow. Lattice Boltzmann methods are an alternative for complex geometries.
X: Air flows past a car (L = 4 m, v = 30 m s^{-1}, ν = 1.5 × 10^{-5} m^{2} s^{-1}). Reynolds number?
> Re = vL/ν = 30 × 4/(1.5 × 10^{-5}) = 8 × 10^{6}: highly turbulent
> DNS would need ~Re^{9/4} ≈ 3 × 10^{15} grid points, impossible; use RANS or LES
K: CFD discretises Navier–Stokes; the turbulence model is often the biggest source of uncertainty.
!: A converged, colourful CFD plot is not necessarily correct; validate with experiments and mesh studies.
Q: What does DNS mean? | Direct numerical simulation, resolving all turbulent scales without modelling.
Q: Name a common RANS turbulence model. | k–ε or k–ω SST.
M1: LES resolves: | Large eddies and models small ones | Only the mean flow | All scales | No eddies | Filtering separates scales.
M2: High Reynolds number flows are usually: | Turbulent | Laminar | Static | Inviscid exactly | Inertia dominates viscosity.

## Numerical linear algebra
S: Numerical linear algebra solves systems of equations, least-squares problems and matrix factorisations, the core of almost every simulation. Efficiency depends on exploiting structure such as sparsity and symmetry, and accuracy depends on conditioning.
H: Direct methods
- **Gaussian elimination / LU decomposition**: A = LU; O(n^{3}) for dense matrices.
- **Partial pivoting** prevents division by tiny numbers.
- **Cholesky**: A = LL^{T} for symmetric positive-definite matrices, twice as fast.
- **QR decomposition**: stable least-squares solutions.
- **Banded and tridiagonal** solvers (Thomas algorithm) in O(n).
H: Iterative methods
- For large sparse systems: Jacobi, Gauss–Seidel, SOR.
- **Krylov methods**: conjugate gradient (symmetric positive-definite), GMRES and BiCGSTAB (general).
- **Preconditioners** (incomplete LU, multigrid) speed convergence dramatically.
E: κ(A) = ||A|| ||A^{−1}|| :: condition number
E: Relative error in x ≲ κ(A) × relative error in b :: error amplification
H: Conditioning and stability
P: A large condition number means small input errors cause large output errors: lose about log_{10}κ digits. The Hilbert matrix is notoriously ill-conditioned. Never compute A^{−1} explicitly just to solve Ax = b; factorise instead. Libraries like LAPACK, BLAS, PETSc and Eigen implement optimised routines.
X: A system has κ = 10^{8}. How many digits of accuracy remain in double precision?
> ~16 − 8 = 8 significant digits
X: Cost of LU for n = 10 000 (dense)?
> ~(2/3)n^{3} ≈ 6.7 × 10^{11} flops, a few seconds on a fast CPU
K: Use factorisations for dense systems, Krylov plus preconditioners for large sparse ones, and watch the condition number.
!: Explicitly inverting a matrix is slower and less accurate than solving with a factorisation.
Q: When can conjugate gradient be used? | For symmetric positive-definite systems.
Q: What does the condition number tell you? | How much input errors can be amplified in the solution.
M1: Cholesky factorisation requires the matrix to be: | Symmetric positive-definite | Diagonal | Singular | Rectangular | A = LL^{T}.
M2: The Thomas algorithm solves: | Tridiagonal systems in O(n) | Dense systems | Eigenvalues | Integrals | Special banded case.

## Eigenvalue algorithms
S: Eigenvalue problems give normal modes, energy levels, stability and principal components. Numerical algorithms find eigenvalues and eigenvectors of matrices too large to solve by hand, from small dense matrices to sparse ones with billions of entries.
H: Basic methods
- **Power iteration**: repeatedly multiply a vector by A; converges to the dominant eigenvector at rate |λ_{2}/λ_{1}|.
- **Inverse iteration** and shift-invert: find eigenvalues near a chosen shift σ.
- **Rayleigh quotient** iteration: cubic convergence for symmetric matrices.
E: v_{k+1} = Av_{k}/||Av_{k}|| :: power iteration
E: λ ≈ v^{T}Av/(v^{T}v) :: Rayleigh quotient
H: The QR algorithm
- Repeatedly factor A_{k} = Q_{k}R_{k}, set A_{k+1} = R_{k}Q_{k}; converges to triangular (Schur) form.
- First reduce to Hessenberg (or tridiagonal) form for efficiency; add shifts for fast convergence.
- O(n^{3}): the standard for dense matrices (LAPACK).
H: Large sparse problems
P: **Lanczos** (symmetric) and **Arnoldi** (general) build a small Krylov subspace whose eigenvalues approximate extreme ones of A. Used for quantum many-body ground states (exact diagonalisation), vibrational modes of structures and Google's original PageRank. **Singular value decomposition** (SVD) underlies PCA, low-rank compression and least squares. Davidson methods are standard in quantum chemistry.
X: Power iteration on A = [[2, 1], [1, 2]] from v = (1, 0).
> Av = (2, 1) → normalised (0.894, 0.447)
> Next: (2.236, 1.789) → (0.781, 0.625); converging to (1, 1)/√2 with λ = 3
K: Power-type methods find extreme eigenvalues; QR handles dense matrices fully; Krylov methods tackle huge sparse ones.
!: Power iteration converges slowly when the top two eigenvalues are close in magnitude.
Q: What does the QR algorithm converge to? | An upper-triangular (Schur) form whose diagonal holds the eigenvalues.
Q: What is the Lanczos method used for? | Finding extreme eigenvalues of large sparse symmetric matrices.
M1: Power iteration converges at a rate set by: | |λ_{2}/λ_{1}| | |λ_{1}| | trace | determinant | Ratio of the top two.
M2: SVD is the basis of: | Principal component analysis | Euler integration | Bisection | Monte Carlo | Low-rank structure.

## Fourier transforms and spectral methods
S: Fourier transforms decompose signals and fields into frequencies, and the fast Fourier transform computes them in N log N operations. Spectral methods use Fourier and other global bases to solve PDEs with exceptional accuracy for smooth problems.
H: The discrete Fourier transform
- X_{k} = Σ_{n=0}^{N−1} x_{n}e^{−2πikn/N}.
- Direct computation O(N^{2}); FFT (Cooley–Tukey) O(N log N).
- Frequency resolution Δf = 1/T; Nyquist frequency f_{s}/2.
- Aliasing: frequencies above Nyquist fold back.
E: X_{k} = Σ x_{n} e^{−2πikn/N} :: DFT
E: f_{Nyquist} = f_{s}/2, Δf = f_{s}/N :: sampling relations
H: Practical spectral analysis
- **Windowing** (Hann, Hamming) reduces spectral leakage.
- **Zero padding** interpolates the spectrum but does not add resolution.
- **Power spectral density** with Welch's method averages segments to reduce noise.
- Convolution becomes multiplication: fast filtering and correlation.
H: Spectral methods for PDEs
P: Expand the solution in Fourier modes (periodic problems) or Chebyshev polynomials (bounded domains). Derivatives become multiplication by ik. For smooth solutions, errors fall exponentially with the number of modes ("spectral accuracy"), far faster than finite differences. Pseudo-spectral methods evaluate nonlinear terms in real space via FFTs; dealiasing (2/3 rule) avoids errors. Used in turbulence DNS, weather models and quantum dynamics (split-operator method).
X: A signal is sampled at 1 kHz for 2 s. Frequency resolution and Nyquist?
> Δf = 1/2 = 0.5 Hz; Nyquist = 500 Hz
X: FFT speed-up for N = 2^{20} versus direct DFT?
> N^{2}/(N log_{2}N) = N/20 ≈ 52 000×
K: The FFT makes frequency analysis and spectral PDE solvers fast; sample above twice the highest frequency.
!: Zero padding makes spectra look smoother but cannot separate peaks closer than 1/T.
Q: What is aliasing? | Frequencies above the Nyquist limit appearing falsely as lower frequencies.
Q: Why are spectral methods so accurate for smooth problems? | Errors decrease exponentially with the number of basis functions.
M1: The FFT reduces DFT cost to: | O(N log N) | O(N^{2}) | O(N^{3}) | O(1) | Cooley–Tukey divide and conquer.
M2: Windowing reduces: | Spectral leakage | Sampling rate | Aliasing completely | Signal energy to zero | Tapering edges.

## Optimisation and parameter estimation
S: Optimisation finds the best parameters for a model or design by minimising a cost function. Parameter estimation fits physical models to data, and the choice of algorithm depends on smoothness, constraints and whether many local minima exist.
H: Local methods
- **Gradient descent**: x_{k+1} = x_{k} − η∇f; simple but can be slow.
- **Newton's method**: uses the Hessian; quadratic convergence near the minimum.
- **Quasi-Newton (BFGS, L-BFGS)**: builds approximate Hessians; standard for smooth problems.
- **Conjugate gradient**: memory-efficient for large problems.
- **Nelder–Mead simplex**: no derivatives needed.
- **Levenberg–Marquardt**: specialised for least-squares fitting.
E: x_{k+1} = x_{k} − η∇f(x_{k}) :: gradient descent
E: χ^{2} = Σ[(y_{i} − f(x_{i}; θ))/σ_{i}]^{2} :: least-squares cost
H: Global methods
- **Simulated annealing**: Metropolis moves with slowly decreasing temperature escape local minima.
- **Genetic algorithms and evolution strategies** (CMA-ES).
- **Basin hopping, particle swarm**, Bayesian optimisation for expensive functions.
H: Constraints and uncertainty
P: Constraints use Lagrange multipliers, penalty methods or interior-point algorithms. Parameter uncertainties come from the inverse Hessian (covariance matrix) at the minimum, from profile likelihoods, or from Bayesian MCMC sampling. Regularisation (ridge, LASSO) prevents overfitting in ill-posed problems. Adjoint methods give gradients of simulations with respect to thousands of parameters at the cost of one extra solve.
X: Minimise f(x) = (x − 3)^{2} with gradient descent, η = 0.25, from x = 0.
> ∇f = 2(x − 3); x_{1} = 0 − 0.25 × (−6) = 1.5
> x_{2} = 1.5 − 0.25 × (−3) = 2.25; converging to 3
X: A fit gives χ^{2} = 48 with 50 data points and 2 parameters. Is it reasonable?
> Reduced χ^{2} = 48/48 = 1.0: consistent with the stated errors
K: Pick local optimisers for smooth single-minimum problems and global methods for rugged landscapes; always estimate uncertainties.
!: A local optimiser finds a local minimum; try multiple starts if the landscape may have many.
Q: What is simulated annealing? | A global optimiser using random moves accepted by a Metropolis rule while temperature slowly decreases.
Q: What does reduced χ^{2} ≈ 1 indicate? | The model fits the data within the stated uncertainties.
M1: Levenberg–Marquardt is designed for: | Nonlinear least-squares fitting | Integer programming | Sorting | FFTs | Blends gradient descent and Gauss–Newton.
M2: Adjoint methods give: | Gradients for many parameters cheaply | Random numbers | Eigenvalues | Meshes | One extra solve per objective.

## Random number generation
S: Simulations need vast numbers of random-looking numbers. Pseudorandom number generators produce deterministic but statistically random sequences, and their quality, period and reproducibility matter for Monte Carlo results.
H: Pseudorandom generators
- **Linear congruential**: x_{n+1} = (ax_{n} + c) mod m; fast but poor in high dimensions (points lie on planes).
- **Mersenne Twister** (MT19937): period 2^{19937} − 1; long the default in many languages.
- **PCG, xoshiro, Philox**: modern, fast, high-quality; Philox suits parallel GPUs.
- Same seed ⇒ same sequence: essential for reproducibility.
E: x_{n+1} = (ax_{n} + c) mod m :: linear congruential generator
H: Generating distributions
- **Inverse transform**: x = F^{−1}(u) for uniform u. Exponential: x = −ln(1 − u)/λ.
- **Box–Muller**: two uniforms → two independent normals.
- **Rejection sampling**: sample from a simpler envelope and accept with probability f/(Mg).
E: z = √(−2 ln u_{1}) cos(2πu_{2}) :: Box–Muller transform
H: Testing and true randomness
P: Test suites (TestU01 BigCrush, PractRand, Dieharder) check uniformity, correlations and patterns. Cryptography needs cryptographically secure generators, which plain simulation PRNGs are not. True random numbers come from physical processes (thermal noise, radioactive decay, quantum photon arrival). In parallel simulations, each process needs an independent stream, not just a different seed.
X: Generate an exponential variate with λ = 2 from u = 0.6.
> x = −ln(1 − 0.6)/2 = −ln(0.4)/2 ≈ 0.458
X: Why is RANDU (an old LCG) infamous?
> Triplets of successive outputs fall on just 15 planes in 3D, ruining 3D Monte Carlo
K: Use modern, tested generators with recorded seeds; transform uniforms into whatever distribution you need.
!: Different seeds don't guarantee independent streams in parallel codes; use generators designed for parallel use.
Q: What is inverse transform sampling? | Applying the inverse cumulative distribution function to uniform random numbers.
Q: What is the Mersenne Twister's period? | 2^{19937} − 1.
M1: Box–Muller produces: | Normally distributed numbers | Uniform numbers | Primes | Exponential numbers only | From two uniforms.
M2: True random numbers can be generated from: | Quantum or thermal noise | An LCG | Mersenne Twister | A fixed seed | Physical processes.

## Error and stability analysis
S: Every numerical result carries errors from modelling, discretisation, iteration and round-off. Error and stability analysis identifies these sources, measures convergence, and ensures that small errors don't grow into nonsense.
H: Sources of error
- **Modelling error**: the equations simplify reality.
- **Truncation (discretisation) error**: from finite step sizes; ∝ h^{p} for order-p methods.
- **Round-off error**: finite precision.
- **Iteration error**: stopping solvers before full convergence.
- **Input/parameter error**: uncertain data.
H: Convergence testing
- Run at h, h/2, h/4; errors should fall by 2^{p}.
- **Observed order**: p = log_{2}[(u_{h} − u_{h/2})/(u_{h/2} − u_{h/4})].
- **Richardson extrapolation** estimates the exact answer: u ≈ u_{h/2} + (u_{h/2} − u_{h})/(2^{p} − 1).
E: p = log_{2}[(u_{h} − u_{h/2})/(u_{h/2} − u_{h/4})] :: observed order of convergence
H: Stability
- An algorithm is stable if errors don't grow unboundedly.
- **Lax equivalence theorem**: for well-posed linear problems, consistency + stability ⇔ convergence.
- **Von Neumann analysis**: amplification factor |G| ≤ 1.
- **Backward stability**: computed answer is the exact answer to a slightly perturbed problem.
H: Uncertainty quantification
P: Propagate input uncertainties using sensitivity analysis, Monte Carlo sampling or polynomial chaos expansions. Report numerical error estimates alongside results. A grid convergence index (GCI) is commonly used in CFD to report discretisation uncertainty.
X: A quantity is 1.100 (h), 1.025 (h/2), 1.00625 (h/4). Observed order and extrapolated value?
> Differences: 0.075 and 0.01875; ratio 4 ⇒ p = 2
> u ≈ 1.00625 + (1.00625 − 1.025)/3 ≈ 1.00000
K: Consistency plus stability gives convergence; always measure the observed order and estimate the error.
!: Agreement between two runs at similar resolution does not prove accuracy; both may share the same systematic error.
Q: What does the Lax equivalence theorem state? | For well-posed linear problems, a consistent scheme converges if and only if it is stable.
Q: What is Richardson extrapolation? | Combining results at different step sizes to cancel the leading error term.
M1: If error falls 8× when h halves, the order is: | 3 | 2 | 8 | 4 | 2^{3} = 8.
M2: Backward stability means: | The computed answer exactly solves a nearby problem | No errors at all | Running time reversed | Infinite precision | Wilkinson's concept.

## Parallel computing
S: Parallel computing splits a problem across many processors that work simultaneously. It is how modern simulations reach billions of grid cells or particles, but the speed-up depends on how much of the work can run in parallel and how much communication is needed.
H: Models
- **Shared memory** (OpenMP): threads on one node access common memory.
- **Distributed memory** (MPI): processes on many nodes exchange messages.
- **Hybrid**: MPI between nodes, OpenMP or GPUs within.
- **Data parallelism**: same operation on many data (vectorisation, GPUs).
H: Scaling laws
- **Amdahl's law**: speed-up S = 1/((1 − p) + p/N) for parallel fraction p; serial parts cap it.
- **Gustafson's law**: when the problem grows with the machine, the scaled speed-up is S = s + N(1 − s) for serial fraction s, close to N when s is small.
- **Strong scaling**: fixed problem, more processors. **Weak scaling**: problem grows with processors.
E: S(N) = 1/((1 − p) + p/N) :: Amdahl's law
E: Efficiency = S(N)/N :: parallel efficiency
H: Domain decomposition and pitfalls
P: Grids are split into subdomains, each owned by a process, exchanging "ghost" boundary layers. Communication cost scales with surface, computation with volume, so bigger subdomains are more efficient. Load imbalance, race conditions, deadlocks and non-deterministic floating-point sums are common problems. Parallel I/O and checkpointing matter at scale.
X: A code is 95% parallel. Maximum speed-up on 100 cores? On infinitely many?
> S = 1/(0.05 + 0.95/100) = 1/0.0595 ≈ 16.8
> As N → ∞, S → 1/0.05 = 20
K: Serial fractions and communication limit parallel speed-up; design codes to keep most work local.
!: Floating-point addition isn't associative, so parallel sums can give slightly different results run to run.
Q: What does Amdahl's law say? | The serial fraction of a program limits its maximum parallel speed-up.
Q: What is weak scaling? | Increasing problem size in proportion to processors, keeping work per processor fixed.
M1: MPI is used for: | Distributed-memory parallelism | Single-thread speed | Graphics | Random numbers | Message passing between nodes.
M2: A 99% parallel code has maximum speed-up: | 100 | 99 | 1000 | Infinite | 1/0.01.

## High-performance computing
S: High-performance computing (HPC) uses supercomputers with hundreds of thousands of processors and accelerators to tackle the largest scientific problems: climate projections, fusion plasmas, cosmology, materials design and AI training.
H: Supercomputers
- Measured in FLOPS; exascale (10^{18} FLOPS) arrived with Frontier (2022), then Aurora and El Capitan.
- Nodes with multicore CPUs and GPUs, linked by fast interconnects (InfiniBand, Slingshot).
- Parallel file systems (Lustre, GPFS) handle petabytes of data.
- Ranked twice yearly by the TOP500 list (LINPACK benchmark); Green500 ranks energy efficiency.
E: Peak FLOPS = nodes × cores × clock × FLOPs per cycle :: theoretical peak
H: Performance in practice
- **Memory bandwidth** often limits performance more than arithmetic ("memory wall").
- **Roofline model**: performance ≤ min(peak FLOPS, bandwidth × arithmetic intensity).
- Cache-aware algorithms, data locality, vectorisation (SIMD) and minimising communication are key.
E: P ≤ min(P_{peak}, B × I) :: roofline model
H: Working on HPC systems
P: Jobs are submitted to batch schedulers (Slurm), requesting nodes and time. Modules provide compilers and libraries. Checkpointing saves state for restarts. Energy is a major cost: exascale machines draw ~20–30 MW. Increasingly, HPC centres host AI workloads alongside simulations.
X: A kernel does 2 FLOPs per 16 bytes loaded on a machine with 1 TB s^{-1} bandwidth and 10 TFLOPS peak. Attainable performance?
> Arithmetic intensity = 2/16 = 0.125 FLOP/byte
> 1 × 10^{12} × 0.125 = 125 GFLOPS ≪ 10 TFLOPS: memory-bound
K: Real HPC performance depends on data movement; design algorithms for locality and parallelism.
!: Peak FLOPS figures rarely reflect real application performance; many codes reach only a few percent of peak.
Q: What is exascale? | Computing at 10^{18} floating-point operations per second.
Q: What does the roofline model show? | Whether a kernel is limited by compute or by memory bandwidth.
M1: Slurm is a: | Batch job scheduler | Compiler | File system | Programming language | Manages HPC jobs.
M2: Low arithmetic intensity code is usually: | Memory-bound | Compute-bound | I/O-free | Perfectly scalable | Limited by bandwidth.

## GPU computing
S: Graphics processing units contain thousands of simple cores that run the same instructions on many data at once. GPUs now power most of the world's fastest supercomputers, accelerating simulations, data analysis and machine learning by 10–100×.
H: Architecture
- Thousands of cores grouped into streaming multiprocessors; threads execute in warps of 32 (NVIDIA) running in lockstep.
- High memory bandwidth (HBM: 2–8 TB s^{-1}) but limited memory per device.
- Separate device memory: data must move between CPU and GPU over PCIe or NVLink.
- Tensor cores accelerate low-precision matrix multiplication for AI.
H: Programming
- **CUDA** (NVIDIA), **HIP** (AMD), **SYCL**, **OpenCL**.
- Directive-based: OpenACC, OpenMP offload.
- High-level: CuPy, JAX, PyTorch, Kokkos, Numba.
- Kernels are launched over grids of thread blocks.
H: Writing fast GPU code
P: Keep data on the GPU to avoid transfer bottlenecks. Coalesce memory accesses (neighbouring threads read neighbouring addresses). Avoid branch divergence within warps. Use shared memory for reuse. Ideal problems are massively data-parallel: particle interactions, stencils on grids, FFTs, linear algebra, Monte Carlo. Mixed precision can greatly speed up suitable algorithms.
E: t_{transfer} = data size/bandwidth :: transfer cost
X: Copying 8 GB over PCIe (32 GB s^{-1}) versus processing it in GPU memory (2 TB s^{-1}).
> Transfer: 8/32 = 0.25 s
> One pass in GPU memory: 8/2000 = 4 ms, about 60× faster: keep data resident
K: GPUs excel at massively parallel, data-heavy work; minimise transfers and organise memory access.
!: Moving data to and from the GPU can cost more than the computation; a "GPU port" can be slower if done naively.
Q: What is a warp? | A group of 32 GPU threads executing the same instruction in lockstep.
Q: What is branch divergence? | When threads in a warp take different branches, forcing serial execution of each path.
M1: GPU memory access should be: | Coalesced | Random | Serialised | Avoided entirely | Neighbouring threads read neighbouring data.
M2: Which is a GPU programming model? | CUDA | Slurm | Lustre | LAPACK | NVIDIA's platform.

## Scientific visualisation
S: Scientific visualisation turns numbers into images that reveal structure, trends and errors. Good visualisation choices, from colour maps to 3D rendering, can make discoveries obvious, while poor ones can mislead.
H: Plot types
- Line and scatter plots for 1D data; error bars show uncertainty.
- Heat maps and contour plots for 2D fields.
- Vector fields: arrows, streamlines, line integral convolution.
- 3D: isosurfaces, volume rendering, slices.
- Log axes for data spanning orders of magnitude.
H: Colour
- Use perceptually uniform colour maps (viridis, cividis, inferno); avoid rainbow ("jet") which creates false boundaries.
- Diverging maps (blue–white–red) for data with a meaningful zero.
- Consider colour-blind viewers (about 1 in 12 men).
H: Tools
- Matplotlib, Plotly, Bokeh (Python); ParaView, VisIt for large 3D data; yt for astrophysics.
- Animations show time evolution; in situ visualisation renders during runs when data are too big to store.
- Interactive dashboards for exploration.
H: Honesty and clarity
P: Label axes with quantities and units. Start bar charts at zero; mark where axes are truncated. Avoid 3D effects on 2D data. Show uncertainty. Visual checks catch bugs that summary numbers hide: conservation violations, boundary reflections and numerical noise often show up instantly in a plot.
X: Data span 10^{-3} to 10^{4}. Which axis scale?
> Logarithmic, so all seven decades are visible rather than everything below 10^{3} being squashed to zero
K: Choose plots and colour maps that represent data faithfully; label everything and show uncertainty.
!: Rainbow colour maps exaggerate some features and hide others; use perceptually uniform maps.
Q: Why avoid the "jet" rainbow colour map? | It isn't perceptually uniform, creating false features and hiding real ones.
Q: When is a diverging colour map appropriate? | When the data have a meaningful midpoint, such as zero.
M1: ParaView is mainly used for: | Large 3D scientific visualisation | Word processing | Compiling code | Random numbers | Open-source visual analysis.
M2: Isosurfaces show: | Surfaces of constant value in 3D | Time series | Histograms | Text | Like 3D contours.

## Data analysis and fitting
S: Data analysis extracts physical meaning from measurements and simulations: estimating parameters, testing hypotheses and quantifying uncertainty. Least-squares fitting, likelihood methods and Bayesian inference are the main tools.
H: Least squares
- Minimise χ^{2} = Σ[(y_{i} − f(x_{i}; θ))/σ_{i}]^{2}.
- Linear models have closed-form solutions (normal equations or QR).
- Nonlinear models: Levenberg–Marquardt; check for multiple minima.
- Parameter uncertainties from the covariance matrix (inverse Hessian of χ^{2}/2).
E: For y = mx + c: m = (NΣxy − ΣxΣy)/(NΣx^{2} − (Σx)^{2}) :: unweighted linear fit slope
H: Goodness of fit
- Reduced χ^{2}_{ν} = χ^{2}/(N − n_{params}); ≈ 1 for a good fit with correct errors.
- ≫ 1: model wrong or errors underestimated; ≪ 1: errors overestimated.
- Residual plots reveal systematic misfits.
- Compare models with likelihood ratios, AIC or BIC (penalise extra parameters).
H: Likelihood and Bayesian methods
P: Maximum likelihood generalises least squares for non-Gaussian noise (e.g. Poisson counts). Bayesian inference combines a prior with the likelihood to give a posterior distribution; MCMC samplers (emcee, Stan) explore it. Bootstrap resampling estimates uncertainties without strong assumptions. Always propagate both statistical and systematic uncertainties.
E: P(θ|D) ∝ P(D|θ)P(θ) :: Bayes' theorem
X: Fit y = mx to (1, 2.1), (2, 3.9), (3, 6.2) through the origin.
> m = Σxy/Σx^{2} = (2.1 + 7.8 + 18.6)/14 = 28.5/14 ≈ 2.04
K: Fit with appropriate statistics, check residuals and reduced χ^{2}, and report uncertainties honestly.
!: A high R^{2} does not mean the model is right; always look at the residuals.
Q: What does a reduced χ^{2} much greater than 1 suggest? | The model is inadequate or the uncertainties are underestimated.
Q: What is the bootstrap? | Estimating uncertainty by repeatedly resampling the data with replacement and refitting.
M1: For Poisson count data, the best fitting approach is: | Maximum likelihood with Poisson statistics | Unweighted least squares always | Ignoring errors | Fitting by eye | Low counts are non-Gaussian.
M2: BIC penalises: | Extra model parameters | Data points | Small errors | Residual plots | Guards against overfitting.

## Reproducible computational experiments
S: A computational result is reproducible if others (or you, later) can rerun the code and get the same answer. Reproducibility requires recording code versions, environments, parameters, random seeds and data, and it is now expected by journals and funders.
H: Why it matters
- Bugs and undocumented choices can change conclusions.
- Science builds on others' work; results must be checkable.
- A "reproducibility crisis" has affected many fields, including computational ones.
H: Practices
- **Version control** (git) with tagged releases for published results.
- **Environment capture**: requirements files, conda environments, containers (Docker, Apptainer).
- **Record parameters and seeds** in configuration files, not hard-coded.
- **Automate workflows** (Makefiles, Snakemake, Nextflow) so figures regenerate from raw data.
- **Archive data and code** with DOIs (Zenodo), following FAIR principles: findable, accessible, interoperable, reusable.
- **Literate programming**: notebooks or documents mixing code, results and explanation.
H: Levels of reproducibility
P: **Repeatable**: same team, same setup. **Reproducible**: different team, same code and data. **Replicable**: different team, independent implementation, consistent results. Bitwise reproducibility may fail across hardware due to floating-point and parallel ordering; scientific conclusions should be robust to such tiny differences.
X: A figure in a paper can't be regenerated six months later. Name three missing ingredients.
> Exact code version (commit hash)
> Software environment (library versions)
> Input data and random seeds or parameter files
K: Reproducibility needs version-controlled code, captured environments, recorded parameters and archived data.
!: Notebooks run out of order can hide state; restart and run all before sharing.
Q: What do FAIR principles stand for? | Findable, accessible, interoperable and reusable.
Q: What does a container like Docker provide? | A packaged software environment that runs the same on different machines.
M1: Replicability means: | An independent implementation gets consistent results | Running the same script twice | Copying files | Using the same laptop | Strongest test of a result.
M2: Zenodo provides: | DOIs for archived code and data | Supercomputing time | Compilers | Peer review | Permanent research archives.

## Verification and validation of simulations
S: Verification asks whether a code solves its equations correctly; validation asks whether those equations describe reality well enough. Together they build trust in simulations used for safety-critical design, climate projections and fundamental science.
H: Verification
- **Code verification**: does the code implement the maths correctly?
- **Method of manufactured solutions (MMS)**: choose an exact solution, derive the source term, check the code recovers it at the expected order.
- Compare with analytic solutions and benchmark problems.
- Unit tests and regression tests catch changes.
- **Solution verification**: estimate numerical error for a particular run (grid convergence).
H: Validation
- Compare predictions with experiments designed for validation, including measurement uncertainty.
- A validation hierarchy: unit problems → subsystems → full system.
- Quantify agreement with validation metrics rather than "looks similar".
- Validation is specific to a domain of applicability; extrapolation is risky.
H: Uncertainty and credibility
P: Combine numerical, parametric and model-form uncertainties into total prediction uncertainty. Standards include ASME V&V 20 and NASA's credibility assessment. Calibration (tuning parameters to data) is not validation; validation must use independent data. Climate models, nuclear reactor codes and aircraft certification all rely on formal V&V.
X: How would you verify a heat-equation solver with MMS?
> Pick u(x, t) = e^{−t}sin(πx); compute f = u_{t} − Du_{xx}
> Run the solver with source f; check error ∝ Δx^{2} for a second-order scheme
K: Verification: solving the equations right. Validation: solving the right equations.
!: Agreement with one experiment after tuning parameters is calibration, not validation.
Q: What is the method of manufactured solutions? | Choosing an exact solution, deriving matching source terms, and checking the code reproduces it at the expected convergence rate.
Q: What is the difference between verification and validation? | Verification checks the maths is solved correctly; validation checks the model matches reality.
M1: Validation requires: | Comparison with independent experimental data | Only code review | Faster computers | More parameters | Reality is the judge.
M2: Regression tests detect: | Unintended changes in results | Physics errors only | Hardware failures | Experimental noise | Results compared to stored references.

## Machine learning in physics
S: Machine learning finds patterns in data and builds fast models from examples. Physicists use it to classify collision events, find exoplanets, accelerate simulations, discover materials and control experiments, while physics in turn inspires new ML methods.
H: Main approaches
- **Supervised learning**: learn input→output maps from labelled data (regression, classification).
- **Unsupervised learning**: find structure without labels (clustering, dimensionality reduction, anomaly detection).
- **Reinforcement learning**: learn actions by reward (controlling fusion plasmas at TCV, optimising accelerators).
- **Generative models**: GANs, variational autoencoders, normalising flows, diffusion models generate samples (fast detector simulation).
H: Neural networks
- Layers of weighted sums plus nonlinear activations; trained by gradient descent with backpropagation.
- Convolutional networks for images (galaxy morphology, gravitational lenses).
- Graph neural networks for particle tracks, molecules and meshes.
- Transformers for sequences and, increasingly, for physical data.
E: y = σ(Wx + b) :: neuron layer
E: L = (1/N)Σ(y_{pred} − y_{true})^{2} :: mean squared error loss
H: Examples and caution
P: The Higgs boson search used boosted decision trees; neural nets now tag jets and trigger detectors. AlphaFold predicted protein structures (Nobel 2024 Chemistry); the 2024 Physics Nobel went to Hopfield and Hinton for foundations of neural networks rooted in statistical physics. ML interatomic potentials give near-quantum accuracy in MD. Pitfalls: overfitting, data leakage, poor uncertainty estimates and extrapolation outside training data.
X: A classifier achieves 99% accuracy on data where 99% of events are background. Is it good?
> Not necessarily: predicting "background" always also gives 99%
> Use precision, recall, ROC curves and signal efficiency at fixed background rejection
K: ML is a powerful tool for patterns and fast surrogates, but it needs careful validation and uncertainty estimates.
!: ML models interpolate well but often extrapolate badly; physics constraints and out-of-distribution tests help.
Q: What is overfitting? | Fitting noise in training data so the model generalises poorly to new data.
Q: Why did Hopfield and Hinton win the 2024 Nobel Prize in Physics? | For foundational discoveries enabling machine learning with artificial neural networks.
M1: Reinforcement learning has been used to: | Control tokamak plasma shapes | Measure charge | Build telescopes | Replace experiments entirely | DeepMind and TCV.
M2: Graph neural networks suit: | Particle tracks and molecules | Single numbers | Sorting text | Random numbers | Data with relational structure.

## Physics-informed neural networks
S: Physics-informed neural networks (PINNs) train a neural network to satisfy both data and the governing equations, by putting the PDE residual into the loss function. They can solve forward and inverse problems with sparse data, though they have important limitations.
H: How PINNs work
- A network u_{θ}(x, t) represents the solution.
- Automatic differentiation computes derivatives of u_{θ} with respect to inputs.
- Loss = data misfit + PDE residual at collocation points + boundary/initial condition terms.
- Minimise with Adam then L-BFGS.
E: L = λ_{d}Σ|u_{θ} − u_{data}|^{2} + λ_{r}Σ|N[u_{θ}]|^{2} + λ_{b}Σ|B[u_{θ}]|^{2} :: PINN loss
H: Strengths
- Mesh-free; handle irregular domains and high dimensions.
- **Inverse problems**: infer unknown parameters (viscosity, diffusivity) or fields from sparse measurements.
- Combine noisy data with physical laws naturally.
H: Limitations and alternatives
P: PINNs can be slow and inaccurate compared with classical solvers for forward problems, struggle with multi-scale or stiff problems and sharp gradients (spectral bias), and need careful loss weighting. **Neural operators** (DeepONet, Fourier neural operators) learn maps from inputs to entire solution fields and generalise across parameters. Hybrid approaches embed ML closures inside traditional solvers. Hard constraints (built into architecture) can enforce conservation exactly.
X: For the heat equation u_{t} = Du_{xx}, what residual does a PINN minimise?
> r(x, t) = ∂u_{θ}/∂t − D ∂^{2}u_{θ}/∂x^{2} at collocation points
> Plus data and boundary losses
K: PINNs embed equations in the loss, excelling at inverse problems with sparse data, but classical solvers often win for forward problems.
!: A low training loss doesn't guarantee an accurate solution; verify against reference solutions.
Q: How do PINNs compute derivatives? | Using automatic differentiation of the network with respect to its inputs.
Q: What is a Fourier neural operator? | A network that learns mappings between function spaces using Fourier-space layers.
M1: PINNs are especially useful for: | Inverse problems with sparse data | Replacing all CFD | Random number generation | Sorting data | Inferring hidden parameters.
M2: Spectral bias means networks: | Learn low frequencies first | Learn high frequencies first | Cannot learn | Need FFTs | Struggle with sharp features.

## Digital twins and surrogate models
S: A surrogate model is a fast approximation of an expensive simulation; a digital twin is a living virtual model of a real system, continuously updated with sensor data. Together they let engineers predict, optimise and control jet engines, power grids, patients and even the Earth.
H: Surrogate models
- Built from simulation runs: polynomial response surfaces, Gaussian processes (kriging), neural networks, reduced-order models.
- **Reduced-order models**: project dynamics onto a few dominant modes (proper orthogonal decomposition, POD).
- Enable optimisation, uncertainty quantification and real-time prediction.
- **Design of experiments** (Latin hypercube sampling) chooses training runs efficiently.
- Gaussian processes give uncertainty estimates; active learning adds runs where uncertainty is high.
E: f(x) ~ GP(m(x), k(x, x')) :: Gaussian process surrogate
H: Digital twins
- A model + live data + feedback loop to the physical asset.
- **Data assimilation** (Kalman filters, 4D-Var) updates the model state with observations, as in weather forecasting.
- Uses: predictive maintenance of turbines, managing water networks, monitoring bridges, personalised cardiology, fusion reactor design, factories.
- **Destination Earth** (EU): a digital twin of the climate system.
E: x̂ = x_{f} + K(y − Hx_{f}) :: Kalman update
H: Challenges
P: Twins need trustworthy models, reliable data streams, uncertainty quantification and validation against the real asset. Surrogates must not be used outside their training range. Cybersecurity and data governance matter for connected systems. The value lies in better decisions: when to maintain, how to operate, what to redesign.
X: A CFD run takes 10 hours; a surrogate trained on 200 runs evaluates in 1 ms. Cost of a 10^{5}-sample uncertainty study?
> Direct: 10^{6} hours (impossible)
> Surrogate: 2000 hours of training runs + 100 s of evaluation
K: Surrogates make expensive models fast; digital twins keep models synchronised with reality through data assimilation.
!: A surrogate is only valid within the space it was trained on; extrapolation can be badly wrong.
Q: What is data assimilation? | Combining model forecasts with observations to estimate the current state of a system.
Q: What is proper orthogonal decomposition? | Extracting dominant spatial modes from simulation snapshots to build reduced-order models.
M1: A digital twin differs from a simulation by: | Being continuously updated with real data | Being larger | Using no physics | Running offline only | Live feedback loop.
M2: Gaussian process surrogates provide: | Predictions with uncertainty | Exact answers always | Random numbers | Meshes | Mean and variance.
`;
