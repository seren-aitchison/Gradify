// School 1: Engineering Mathematics. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives,
// key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels (Foundation,
// Application, Evaluation) in every lesson, with numerical (NUM) questions for calculations. SI units throughout.
// Explanations are original; sources are those used and cited for checking, pending human verification (qa.js).
// Level: first-year undergraduate engineering (Engineering Council AHEP outcomes on science and mathematics).
export default `
## SI units and dimensional analysis
LV: Year 1 · Foundation
S: Every engineering number carries a unit, and every valid equation balances its dimensions. This lesson sets out the SI system, the prefixes engineers use daily, and dimensional analysis as a check on equations and a way to discover how quantities relate.
O: State the SI base units and express derived units such as the newton, pascal, joule and watt in base units
O: Check an equation for dimensional homogeneity and convert between prefixed units without error
O: Use dimensional analysis to predict the form of a relationship and judge what it cannot tell you
H: The SI system
P: The **International System of Units (SI)** has seven base units: the metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol) and candela (cd). Since 2019 every one is defined by fixing the numerical value of a constant of nature, such as the speed of light c, the Planck constant h and the elementary charge e, so the definitions no longer depend on a physical artefact.
E: 1 N = 1 kg m s^{-2} :: force: mass × acceleration
E: 1 Pa = 1 N m^{-2} = 1 kg m^{-1} s^{-2} :: pressure and stress
E: 1 J = 1 N m; 1 W = 1 J s^{-1} :: energy and power
E: 1 V = 1 W A^{-1}; 1 Ω = 1 V A^{-1} :: potential difference and resistance
- Prefixes: G = 10^{9}, M = 10^{6}, k = 10^{3}, m = 10^{-3}, µ = 10^{-6}, n = 10^{-9}.
- A useful identity for stress: 1 MPa = 1 N mm^{-2}, because 1 mm^{2} = 10^{-6} m^{2}.
- Squared and cubed prefixes apply to the whole unit: 1 mm^{3} = 10^{-9} m^{3}, not 10^{-3} m^{3}.
X: A steel bar 20 mm in diameter carries an axial load of 50 kN. Find the stress.
> Area A = πd^{2}/4 = π × 20^{2}/4 = 314.2 mm^{2}
> σ = F/A = 50 000 N / 314.2 mm^{2} = 159 N mm^{-2} = 159 MPa
> Working in N and mm gives MPa directly; mixing kN with m^{2} is where most slips happen.
H: Dimensional homogeneity
P: Every term in a physically valid equation must have the same **dimensions**, written in terms of mass [M], length [L], time [T] (plus current, temperature and so on). Dimensions can be multiplied and divided but only like can be added to like. A dimension check catches algebra errors before any numbers go in.
X: Check T = 2π√(L/g) for a pendulum.
> [L/g] = L/(L T^{-2}) = T^{2}, so √(L/g) has dimension T.
> 2π is dimensionless, so the right-hand side is a time: the equation is homogeneous.
H: Dimensional analysis as a tool
P: If a quantity depends on a known list of variables, requiring dimensions to balance fixes the exponents. This **Rayleigh method** gave, for example, the drag on a body as F = kρv^{2}d^{2} from density, speed and size alone; only an experiment can give the dimensionless constant k.
K: A dimensionally wrong equation is certainly wrong; a dimensionally right one may still be wrong, because dimensionless constants and missing variables are invisible to the check.
!: Mixing unit systems. In 1999 NASA lost the Mars Climate Orbiter after ground software reported thruster impulse in pound-force seconds where newton seconds were expected; the investigation board identified the units mismatch as the root cause.
EV: established | The Mars Climate Orbiter was lost in 1999 because of a mismatch between imperial and SI units in trajectory software, according to NASA's mishap investigation board.
T: Dimensional homogeneity | The requirement that every term in an equation has the same dimensions
T: Derived unit | An SI unit formed from base units, such as N = kg m s^{-2}
SUM: Express quantities in SI base or derived units, handle prefixes carefully (especially squared and cubed), and use dimensional checks to catch errors and suggest the form of relationships.
SRC: BIPM, The International System of Units (SI Brochure), 9th edition | standard | 2019 | https://www.bipm.org/en/publications/si-brochure
SRC: NASA, Mars Climate Orbiter Mishap Investigation Board Phase I Report | primary | 1999
SRC: Ling S. J., Sanny J. and Moebs W., University Physics Volume 1, OpenStax, sections 1.2 and 1.4 | secondary | 2016 | https://openstax.org/details/books/university-physics-volume-1
Q: Express the pascal in SI base units. | kg m^{-1} s^{-2} (one newton per square metre).
Q: What can a dimensional check never confirm? | The value of dimensionless constants, or that no variable is missing: a homogeneous equation may still be wrong.
M1#engineering-u01-01-q1@1: Which is the pascal written in SI base units? | kg m^{-1} s^{-2} | kg m s^{-2} | kg m^{2} s^{-2} | kg m^{2} s^{-3} | A pascal is a newton (kg m s^{-2}) per square metre, giving kg m^{-1} s^{-2}. The distractors are the newton, joule and watt.
M2#engineering-u01-01-q2@2: Which of these equations of motion is dimensionally consistent (s distance, u and v speeds, a acceleration, t time)? | v^{2} = u^{2} + 2as | s = ut + ½at^{3} | v = u + as | v^{2} = u + 2at | Each term of v^{2} = u^{2} + 2as has dimension L^{2} T^{-2}. In s = ut + ½at^{3} the last term is L T, and in v = u + as the last term is L^{2} T^{-2}, so neither balances.
NUM2#engineering-u01-01-q3@2: A 25 mm diameter bolt carries a tensile load of 40 kN. What is the tensile stress in the bolt? | 81.5 | 1% | MPa | A = π × 25^{2}/4 = 490.9 mm^{2}; σ = 40 000/490.9 = 81.5 N mm^{-2} = 81.5 MPa.
M3#engineering-u01-01-q4@3: A student derives a formula for the deflection of a beam and finds it is dimensionally homogeneous. What can she conclude? | Only that it may be correct: its numerical constant and any missing dimensionless group are untested | That it is correct, because every term has the same dimensions | That the exponents are right but the constant may be wrong, since dimensions fix all exponents | That it is correct in SI units but may fail in other unit systems | Dimensional homogeneity is necessary, not sufficient. When more variables are involved than dimensions, exponents are not fully fixed either, and a homogeneous equation holds in any consistent unit system.
SA3#engineering-u01-01-q5@3: Use dimensional analysis to find how the power P of a fan depends on air density ρ, rotational speed N (in s^{-1}) and diameter D, and state what the analysis cannot tell you. | Write P = kρ^{a}N^{b}D^{c}. P has dimensions M L^{2} T^{-3}. Mass gives a = 1; time gives −b = −3 so b = 3; length gives −3a + c = 2 so c = 5. Hence P = kρN^{3}D^{5}, one of the fan laws. The analysis cannot give the constant k, which must come from tests, and it assumes the listed variables are the only ones that matter (viscosity, for example, is neglected). | Sets up a power-law product ; Uses correct dimensions for P ; Solves for exponents a = 1, b = 3, c = 5 ; States k must be found experimentally ; Notes the assumption that no relevant variable is missing

## Uncertainty, significant figures and estimation
LV: Year 1 · Foundation
S: No measurement is exact, and an engineering result is only useful with an honest statement of how uncertain it is. This lesson covers types of error, standard uncertainty, how uncertainties combine, sensible significant figures and quick order-of-magnitude estimates.
O: Distinguish accuracy from precision and systematic from random error
O: Combine standard uncertainties for sums, products and quotients and report a result to sensible significant figures
O: Use order-of-magnitude estimates to check a calculation and evaluate how a measurement could be improved
H: Error and uncertainty
P: The **error** is the difference between a measured value and the true value, which is never known exactly. The **uncertainty** quantifies the doubt about the result. **Random errors** scatter readings either side of the mean and are reduced by averaging; **systematic errors** shift every reading the same way (a zero offset, a miscalibrated gauge) and are not reduced by averaging. **Accuracy** is closeness to the true value; **precision** is closeness of repeated readings to each other.
P: The international Guide to the Expression of Uncertainty in Measurement (GUM) separates **Type A** evaluations, from the statistics of repeated readings, and **Type B** evaluations, from other information such as a calibration certificate or instrument resolution.
E: u(x̄) = s/√n :: standard uncertainty of the mean of n readings with standard deviation s
E: u = a/√3 :: Type B uncertainty for a rectangular distribution of half-width a
E: U = k u, k ≈ 2 :: expanded uncertainty giving about 95% coverage
H: Combining uncertainties
- Sums and differences: add absolute standard uncertainties in quadrature, u(y) = √(u_{1}^{2} + u_{2}^{2}).
- Products and quotients: add relative uncertainties in quadrature, u(y)/y = √((u_{1}/x_{1})^{2} + (u_{2}/x_{2})^{2}).
- Powers: the relative uncertainty is multiplied by the power, so a cubed diameter triples its relative uncertainty.
X: A resistance is found from V = 12.0 ± 0.1 V and I = 2.00 ± 0.02 A (standard uncertainties). Find R and its uncertainty.
> R = V/I = 6.00 Ω
> Relative uncertainty = √((0.1/12.0)^{2} + (0.02/2.00)^{2}) = √(0.0000694 + 0.0001) = 0.0130, or 1.3%
> u(R) = 0.013 × 6.00 = 0.078 Ω; report R = 6.00 ± 0.08 Ω
H: Significant figures and estimation
P: Quote the uncertainty to one or two significant figures and round the result to the same decimal place. A **Fermi estimate** checks scale: the air in a 10 m × 8 m × 3 m lecture room is about 240 m^{3} × 1.2 kg m^{-3} ≈ 290 kg. If a detailed calculation disagrees by a factor of ten, look for a slipped prefix.
K: Averaging reduces random error but never systematic error; only calibration, a different method or a correction removes a bias.
!: Reporting every digit from the calculator. A result of 6.0247 Ω with an uncertainty of 0.078 Ω should be written 6.02 ± 0.08 Ω: the extra digits imply precision that does not exist.
EV: established | The GUM framework of Type A and Type B evaluations and combination in quadrature is the international standard method for stating measurement uncertainty.
T: Systematic error | An error that shifts every reading in the same direction and is not reduced by repetition
T: Standard uncertainty | The uncertainty of a result expressed as a standard deviation
SUM: State uncertainties, combine them in quadrature (absolute for sums, relative for products), round results to match, and check scale with estimates.
SRC: JCGM 100:2008, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM) | standard | 2008
SRC: Taylor J. R., An Introduction to Error Analysis, 2nd edition, University Science Books | secondary | 1997
Q: What is the difference between accuracy and precision? | Accuracy is closeness to the true value; precision is how closely repeated readings agree with each other.
Q: How do relative uncertainties combine for a product of independent quantities? | In quadrature: the square root of the sum of the squared relative uncertainties.
M1#engineering-u01-02-q1@1: A micrometer reads 0.02 mm when its jaws are fully closed. What kind of error does this cause? | A systematic (zero) error | A random error that averaging will remove | A resolution limit of the instrument | A blunder in reading the scale | A zero offset shifts every reading by the same amount, so it is systematic; repeating and averaging would reproduce it every time.
M2#engineering-u01-02-q2@2: Ten repeated force readings have a standard deviation of 0.50 N. What is the standard uncertainty of their mean? | 0.16 N | 0.50 N | 0.05 N | 1.58 N | u = s/√n = 0.50/√10 = 0.16 N. Dividing by n (0.05 N) understates it; multiplying by √10 (1.58 N) inverts the formula.
NUM2#engineering-u01-02-q3@2: A rectangular plate measures 200.0 ± 0.5 mm by 50.0 ± 0.5 mm (standard uncertainties). What is the relative standard uncertainty of its area, in per cent? | 1.03 | 0.03 | % | Relative uncertainties 0.25% and 1.0% combine in quadrature: √(0.25^{2} + 1.0^{2}) = 1.03%.
M3#engineering-u01-02-q4@2,3: A calculation gives a resistance of 6.0247 Ω with a standard uncertainty of 0.078 Ω. How should it be reported? | 6.02 ± 0.08 Ω | 6.0247 ± 0.078 Ω | 6 ± 0.078 Ω | 6.025 ± 0.0780 Ω | Round the uncertainty to one or two significant figures (0.08 Ω), then round the value to the same decimal place (6.02 Ω). Keeping all digits implies false precision; dropping to 6 discards real information.
SA3#engineering-u01-02-q5@1,3: A student measures g with a pendulum, repeats the timing 20 times and finds a mean 2% above the accepted value with a small spread. Explain what this suggests and how to improve the experiment. | The small spread shows good precision, but the 2% offset that persists after averaging points to a systematic error, such as measuring length to the top of the bob rather than its centre, a reaction-time bias in starting and stopping the clock, or large swing amplitude. More repeats would not remove it. Improvements: measure length to the centre of mass, time many oscillations per trial, use a light gate, keep the amplitude small and check the method against a known standard. | Recognises good precision but poor accuracy ; Identifies systematic error ; Gives a plausible source ; States that averaging will not remove it ; Proposes specific improvements

## Engineering models and assumptions
LV: Year 1 · Foundation
S: Engineers predict how things will behave by building models: simplified representations that can be calculated. This lesson explains the common idealisations, the modelling cycle, and the difference between verifying and validating a model.
O: Describe the main types of engineering model and the idealisations they use
O: Apply the modelling cycle to set up a simple calculation with stated assumptions
O: Evaluate whether a model is fit for its purpose and distinguish verification from validation
H: What a model is
P: An **engineering model** is a simplified representation of a real system, chosen to answer a specific question. It may be **physical** (a scale model in a wind tunnel), **mathematical** (an equation such as F = kx), **numerical** (a finite element or computational fluid dynamics model) or **empirical** (a curve fitted to test data).
- **Particle**: size ignored, all mass at a point.
- **Rigid body**: no deformation between points.
- **Linear elastic**: stress proportional to strain, fully recoverable.
- **Lumped parameter**: a distributed property, such as mass or temperature, concentrated in one value.
- **Steady state**: nothing changes with time.
H: The modelling cycle
P: Define the question; list assumptions; write governing equations (equilibrium, conservation, constitutive laws); solve; check the answer for units, scale and limiting cases; compare with evidence; and refine if needed. **Verification** asks whether the equations were solved correctly; **validation** asks whether they were the right equations, by comparison with experiment or field data.
X: Estimate the electrical power needed for a hoist lifting 800 kg at a steady 1.5 m s^{-1}, assuming a drive efficiency of 80%.
> Assumptions: steady speed (no acceleration), no counterweight, all losses lumped into the efficiency.
> Mechanical power P = mgv = 800 × 9.81 × 1.5 = 11.8 kW
> Electrical input = 11.8/0.80 = 14.7 kW; a real design would add margin for acceleration and starting.
K: A model is only as good as its assumptions: state them, check them against the real system, and know which ones the answer is sensitive to.
!: Trusting a numerical model because it produces detailed, colourful output. A finite element result with the wrong boundary conditions is precisely wrong; check reactions balance the loads and compare with a hand calculation.
H: When models fail
P: The Tacoma Narrows Bridge collapsed in 1940 in a moderate wind because of aeroelastic flutter, an interaction between the deck's twisting and the airflow that the static wind-load methods then used did not capture. Since then, long-span bridges have been tested aerodynamically. The lesson is that a model can be internally correct yet omit the mechanism that matters.
EV: established | The 1940 Tacoma Narrows Bridge failure was caused by aerodynamic instability (torsional flutter) not represented in the static design approach of the time.
EV: contested | How much numerical simulation can replace physical testing in certification is debated and differs between industries.
T: Validation | Checking a model against real measurements to show it represents the physical system adequately
T: Verification | Checking that a model's equations have been solved correctly
SUM: Models simplify reality to answer a question; state assumptions, verify the solution, validate against evidence and know the model's limits.
SRC: Box G. E. P., "Science and statistics", Journal of the American Statistical Association 71(356):791–799 | primary | 1976
SRC: Engineering Council, The Accreditation of Higher Education Programmes (AHEP), 4th edition | standard | 2020
SRC: Petroski H., To Engineer Is Human: The Role of Failure in Successful Design, St Martin's Press | secondary | 1985
Q: What is the difference between verification and validation? | Verification checks the equations are solved correctly; validation checks they are the right equations by comparison with reality.
Q: What does a lumped-parameter model assume? | That a distributed property (mass, temperature, resistance) can be concentrated in a single value.
M1#engineering-u01-03-q1@1: Which activity is validation of a model? | Comparing its predictions with measurements from a physical test | Checking that the software solves the equations correctly | Refining the mesh until the result stops changing | Confirming the units of every input are consistent | Validation compares the model with reality. Mesh refinement and checking the solver are verification; unit checks are part of verifying inputs.
M2#engineering-u01-03-q2@1,2: A motor must raise a 500 kg load at a steady 2.0 m s^{-1}. Which assumption most affects whether the calculated power of 9.8 kW is enough in service? | Neglecting the extra power needed to accelerate the load from rest | Treating the load as a particle | Taking g as 9.81 m s^{-2} | Ignoring the mass of the air around the load | The steady-speed model ignores acceleration, which needs extra force and power at start-up; the particle idealisation and the value of g change little, and air mass is negligible.
NUM2#engineering-u01-03-q3@2: A pump lifts water at 0.020 m^{3} s^{-1} through a height of 15 m. Taking water density as 1000 kg m^{-3} and pump efficiency as 70%, what input power is needed, in kW? | 4.20 | 2% | kW | Hydraulic power = ρgQH = 1000 × 9.81 × 0.020 × 15 = 2.94 kW; input = 2.94/0.70 = 4.20 kW.
M3#engineering-u01-03-q4@3: A finite element model of a bracket gives a peak stress well below yield, but the bracket cracks in service. Which is the most likely shortcoming of the model? | It omitted a mechanism such as fatigue under cyclic loading or a stress concentration the mesh did not resolve | The software must have solved the equations wrongly | The material's yield strength must have been mis-typed | A finer mesh would always have predicted the crack | Cracking below yield in service usually means a missing mechanism (fatigue, a sharp corner, a load case not modelled). Blaming the solver skips the more common failure: correct maths on the wrong model.
SA3#engineering-u01-03-q5@2,3: Evaluate the statement "All models are wrong, but some are useful" for an engineer modelling a building's floor as a uniformly loaded simply supported beam. | The model is wrong in detail: real loads are not uniform, supports are neither perfect pins nor rollers, the floor acts in two directions and concrete is not linear elastic. It is still useful because it gives bending moments and deflections close enough for preliminary sizing, is easy to check, and its errors are often on the safe side. Its usefulness depends on purpose: it would be inadequate for vibration under footfall or for a floor with large openings, where a fuller model is needed. | Identifies specific idealisations ; Explains why the model is still useful ; Links usefulness to the question being asked ; Gives a case where the model would be inadequate ; Reaches a judgement

## Functions and graphs in engineering
LV: Year 1 · Foundation
S: Engineers describe how one quantity depends on another with functions and read behaviour off graphs. This lesson covers the common function types, what gradients and areas mean physically, and how to straighten data on log scales to find a law.
O: Recognise linear, quadratic, power-law, exponential and piecewise functions in engineering contexts
O: Interpret the gradient and the area under a graph physically and find a law from two data points
O: Linearise data using logarithms and judge which model fits
H: Common functions
- **Linear**, y = mx + c: a spring (F = kx), Ohm's law (V = IR), thermal expansion.
- **Quadratic**: kinetic energy ½mv^{2}, power dissipated I^{2}R, a projectile's height against time.
- **Power law**, y = ax^{n}: drag on a body (roughly proportional to v^{2}), fan power (proportional to N^{3}).
- **Exponential**: capacitor discharge, cooling, radioactive decay.
- **Piecewise**: a stress–strain curve that is linear up to yield and then curved.
H: Gradients and areas
P: The **gradient** of a graph is the rate of change of the vertical quantity with the horizontal one; the **area** beneath it is the accumulated product. On a velocity–time graph the gradient is acceleration and the area is displacement. On a force–extension graph the area is work done. On a stress–strain graph the initial gradient is Young's modulus.
X: A spring is loaded: 120 N gives an extension of 15 mm, 200 N gives 25 mm. Find the stiffness and the work done stretching it to 25 mm.
> k = (200 − 120)/(25 − 15) = 8 N mm^{-1} = 8000 N m^{-1}; the line passes through the origin (120 − 8 × 15 = 0).
> Work = area under the line = ½ × 200 N × 0.025 m = 2.5 J
H: Finding laws with logarithms
P: For y = ax^{n}, taking logs gives log y = log a + n log x: a straight line on log–log axes with gradient n. For y = ae^{bx}, ln y = ln a + bx: a straight line on a log–linear plot.
X: Drag on a car model is 50 N at 10 m s^{-1} and 200 N at 20 m s^{-1}. Find n in F = av^{n}.
> n = log(200/50)/log(20/10) = log 4/log 2 = 2, so drag is proportional to v^{2} here.
K: Ask what the gradient and the area of a graph mean physically: that is usually where the engineering answer is.
!: Fitting a straight line to curved data because a spreadsheet will draw one. Plot the residuals: a systematic curve in them means the model is wrong, however high R^{2} is.
EV: established | Aerodynamic drag on bluff bodies at high Reynolds number is close to proportional to the square of speed, which is why the drag coefficient is defined with ½ρv^{2}.
T: Gradient | The rate of change of one quantity with respect to another, the slope of its graph
T: Power law | A relationship of the form y = ax^{n}, a straight line on log–log axes
SUM: Match the function type to the physics, read meaning from gradients and areas, and use log plots to find exponents.
SRC: Stroud K. A. and Booth D. J., Engineering Mathematics, 8th edition, Red Globe Press | secondary | 2020
SRC: Strang G. and Herman E., Calculus Volume 1, OpenStax, chapter 1 | secondary | 2016 | https://openstax.org/details/books/calculus-volume-1
Q: What does the area under a force–extension graph represent? | The work done (energy stored, if elastic) in producing the extension.
Q: What straight-line plot reveals the exponent n in y = ax^{n}? | log y against log x: the gradient is n.
M1#engineering-u01-04-q1@1: What does the gradient of a velocity–time graph represent? | Acceleration | Displacement | Jerk | Kinetic energy | Gradient is the rate of change of velocity with time, which is acceleration; displacement is the area under the graph.
M2#engineering-u01-04-q2@2: Data for a fan show power rising from 100 W to 800 W when speed doubles. What exponent n fits P = aN^{n}? | 3 | 2 | 8 | 4 | n = log(800/100)/log 2 = log 8/log 2 = 3, consistent with the fan law P ∝ N^{3}. Taking n = 8 confuses the ratio with the exponent.
NUM1#engineering-u01-04-q3@2: A linear spring needs 150 N to extend it by 30 mm. What is its stiffness in N m^{-1}? | 5000 | 0 | N m^{-1} | k = 150 N / 0.030 m = 5000 N m^{-1}.
M3#engineering-u01-04-q4@3: Measured data for y against x give a straight line on log–linear axes (ln y against x) but a curve on log–log axes. Which model fits? | y = ae^{bx} | y = ax^{n} | y = mx + c | y = a ln x | A straight line of ln y against x means ln y = ln a + bx, so y is exponential in x. A power law would be straight on log–log axes instead.
SA3#engineering-u01-04-q5@2,3: A student fits a straight line to stress–strain data from a tensile test and reports R^{2} = 0.97 as proof the material is linear elastic. Evaluate this. | A high R^{2} does not show the right model: it can be high for curved data. Stress–strain data are usually linear only up to the limit of proportionality and then curve as the material yields, so a single line through all the data mixes two regimes. The student should plot the data and residuals, fit only the initial linear region to find Young's modulus, and describe the plastic region separately. | R^{2} alone does not validate a model ; Stress–strain is piecewise ; Residuals reveal systematic misfit ; Fit only the elastic region for E ; Clear conclusion

## Exponentials and logarithms in engineering
LV: Year 1 · Foundation
S: Whenever a rate of change is proportional to the amount present, the result is exponential growth or decay. This lesson covers time constants, half-lives, decibels and the belt-friction law, all built on e^{x} and the logarithm.
O: State the laws of logarithms and the meaning of the time constant τ
O: Solve exponential decay problems, including the time to reach a given level
O: Use decibels and the capstan equation and judge when an exponential model applies
H: Exponential change
E: x(t) = x_{0} e^{−t/τ} :: decay with time constant τ
E: t_{½} = τ ln 2 ≈ 0.693τ :: half-life
- After one time constant 36.8% remains (the process is 63.2% complete); after 5τ less than 1% remains, so engineers treat a first-order system as settled.
- Examples: a capacitor discharging through a resistor (τ = RC), a small hot part cooling in air, the decay of a sensor signal.
X: A 100 µF capacitor charged to 12 V discharges through 10 kΩ. When is its voltage 3 V?
> τ = RC = 10 000 × 100 × 10^{-6} = 1.0 s
> 3 = 12e^{−t/1.0}, so t = ln(12/3) = ln 4 = 1.39 s
IX: explog
H: Logarithms in practice
- Laws: log(ab) = log a + log b; log(a/b) = log a − log b; log a^{n} = n log a; ln is log to base e.
- Logarithms undo exponentials, so they turn "how long until…" questions into algebra.
E: Gain in dB = 10 log_{10}(P_{2}/P_{1}) = 20 log_{10}(V_{2}/V_{1}) :: power and voltage ratios (same impedance)
E: T_{2}/T_{1} = e^{μθ} :: capstan equation: tension ratio for a rope or belt wrapped through angle θ (radians) with friction coefficient μ
X: A rope makes half a turn round a post (θ = π) with μ = 0.3. What is the tension ratio?
> T_{2}/T_{1} = e^{0.3π} = e^{0.942} = 2.57: a small pull holds a much larger load, and every extra turn multiplies the ratio again.
K: An exponential model applies when the rate of change is proportional to the current value; its time constant summarises the whole response.
!: Using 20 log for power ratios. Power ratios use 10 log_{10}; 20 log_{10} is for voltage or current ratios, because power is proportional to their square.
EV: established | The capstan (Euler–Eytelwein) equation describes belt and rope friction well for flexible cords on rigid surfaces, though μ is an empirical value that varies with conditions.
T: Time constant | The time for a first-order exponential response to complete 63.2% of its change
T: Decibel | A logarithmic unit for ratios: 10 log_{10} of a power ratio
SUM: Exponentials describe proportional rates of change; logs solve for time or exponent, express ratios in dB, and give the capstan friction law.
SRC: Stroud K. A. and Booth D. J., Engineering Mathematics, 8th edition, Red Globe Press | secondary | 2020
SRC: Strang G. and Herman E., Calculus Volume 1, OpenStax, section 6.8 | secondary | 2016 | https://openstax.org/details/books/calculus-volume-1
Q: What fraction of the change is complete after one time constant? | About 63.2%, leaving 36.8% (e^{-1}) still to go.
Q: How is a half-life related to the time constant? | t½ = τ ln 2 ≈ 0.693τ.
M1#engineering-u01-05-q1@1: Which law of logarithms is correct? | log a^{n} = n log a | log(a + b) = log a + log b | log(ab) = log a × log b | log(a/b) = log a/log b | Only the power law is correct. Logs turn products into sums, so log(ab) = log a + log b; there is no rule for log(a + b).
M2#engineering-u01-05-q2@2: A component cools with a time constant of 200 s. Roughly how long until its excess temperature above ambient has fallen to below 1% of its starting value? | About 1000 s | About 200 s | About 400 s | About 20 000 s | After 5τ, e^{-5} ≈ 0.7% remains, so about 1000 s. One time constant leaves 37%.
NUM2#engineering-u01-05-q3@2: An amplifier raises a signal from 0.10 V to 5.0 V across the same impedance. What is its voltage gain in decibels? | 33.98 | 0.1 | dB | Gain = 20 log_{10}(5.0/0.10) = 20 log_{10} 50 = 20 × 1.699 = 33.98 dB.
M3#engineering-u01-05-q4@3: A belt drive is slipping. Using T_{2}/T_{1} = e^{μθ}, which change most increases the tension ratio it can transmit before slipping? | Doubling the angle of wrap on the smaller pulley | Doubling the belt width at the same μ and wrap | Doubling the belt's tensile strength | Halving the pulley speed | The tension ratio depends only on μ and θ, exponentially: doubling θ squares the ratio. Width and strength allow more tension overall but don't change the ratio at slip; speed doesn't appear in the basic equation.
SA3#engineering-u01-05-q5@1,3: Explain why a capacitor discharging through a resistor follows an exponential law, and state one situation where the exponential model would fail. | The current through the resistor is V/R, and this current removes charge from the capacitor: C dV/dt = −V/R. The rate of fall of voltage is proportional to the voltage itself, which is the defining property of exponential decay, with τ = RC. The model fails if components are non-linear, for example if the "resistor" is a diode or a lamp whose resistance changes with temperature, or if the capacitor leaks significantly or its capacitance depends on voltage. | Uses I = V/R and I = −C dV/dt ; Rate proportional to amount ; τ = RC ; Names a non-linear or non-ideal case ; Explains why it breaks the model

## Trigonometry and sinusoids
LV: Year 1 · Foundation
S: Trigonometry resolves forces into components and describes everything that oscillates: alternating current, vibration and rotating machinery. This lesson covers the sine and cosine rules, radians, sinusoidal signals and combining sinusoids of the same frequency.
O: Use radians and apply the sine and cosine rules to force and geometry problems
O: Describe a sinusoid by its amplitude, frequency, angular frequency and phase, and find RMS values
O: Combine a sin ωt + b cos ωt into a single sinusoid and interpret the phase
H: Triangles and radians
E: a/sin A = b/sin B = c/sin C :: sine rule
E: c^{2} = a^{2} + b^{2} − 2ab cos C :: cosine rule
P: An angle in **radians** is arc length divided by radius, so a full turn is 2π rad and 1 rad ≈ 57.3°. Calculus results such as d(sin x)/dx = cos x hold only in radians.
X: Two forces of 300 N and 500 N act at a point with 60° between their lines of action. Find the resultant.
> The force triangle has the two forces joined head to tail, so the angle opposite the resultant is 180° − 60° = 120°.
> R^{2} = 300^{2} + 500^{2} − 2 × 300 × 500 × cos 120° = 90 000 + 250 000 + 150 000 = 490 000
> R = 700 N
IX: trig
H: Sinusoidal signals
E: y(t) = A sin(ωt + φ) :: amplitude A, angular frequency ω (rad s^{-1}), phase φ
E: ω = 2πf; T = 1/f :: frequency f in Hz, period T in s
E: V_{rms} = V_{peak}/√2 :: for a pure sinusoid
P: UK mains is 230 V RMS at 50 Hz, so its peak is 230 × √2 ≈ 325 V and ω = 2π × 50 ≈ 314 rad s^{-1}. The **RMS** value is the steady (DC) value that would deliver the same average power to a resistor.
H: Combining sinusoids
E: a sin ωt + b cos ωt = R sin(ωt + α), R = √(a^{2} + b^{2}), tan α = b/a :: same frequency only; choose the quadrant of α from the signs of a and b
X: Combine 3 sin ωt + 4 cos ωt.
> R = √(9 + 16) = 5 and α = arctan(4/3) = 53.1°, so the sum is 5 sin(ωt + 53.1°): it leads 3 sin ωt by 53.1°.
K: Sinusoids of the same frequency always add to another sinusoid of that frequency, which is why AC circuits can be analysed with phasors.
!: Calculators in degree mode. Evaluating sin(ωt) with ωt in radians while the calculator is in degrees gives wrong answers with no warning.
EV: established | The RMS value of a sinusoid is its peak divided by √2; this follows directly from averaging sin^{2} over a cycle.
T: Angular frequency | ω = 2πf, the rate of change of phase in radians per second
T: RMS value | The square root of the mean of the square of a signal: the equivalent DC value for power
SUM: Use the sine and cosine rules for triangles, radians for calculus, and R sin(ωt + α) to describe and combine sinusoids.
SRC: Stroud K. A. and Booth D. J., Engineering Mathematics, 8th edition, Red Globe Press | secondary | 2020
SRC: Ling S. J., Sanny J. and Moebs W., University Physics Volume 2, OpenStax, chapter 15 (alternating-current circuits) | secondary | 2016 | https://openstax.org/details/books/university-physics-volume-2
Q: What is the peak voltage of 230 V RMS mains? | About 325 V (230 × √2).
Q: What is the angular frequency of a 50 Hz supply? | ω = 2π × 50 ≈ 314 rad s^{-1}.
M1#engineering-u01-06-q1@1: How many radians are there in 90°? | π/2 | π | π/4 | 2π | A full turn is 2π rad, so a quarter turn is π/2 rad.
M2#engineering-u01-06-q2@2: A vibration signal is 0.2 sin(100πt) mm. What are its frequency and period? | 50 Hz and 20 ms | 100 Hz and 10 ms | 314 Hz and 3.2 ms | 50 Hz and 0.2 ms | ω = 100π rad s^{-1}, so f = ω/2π = 50 Hz and T = 1/f = 0.02 s = 20 ms. Taking 100π as f confuses angular and ordinary frequency.
NUM2#engineering-u01-06-q3@2: Two forces of 400 N and 300 N act at a point at right angles. What is the magnitude of their resultant? | 500 | 0.5% | N | At right angles R = √(400^{2} + 300^{2}) = 500 N (the cosine rule with a 90° angle in the force triangle).
M3#engineering-u01-06-q4@3: Which single sinusoid equals 4 sin ωt − 3 cos ωt? | 5 sin(ωt − 36.9°) | 5 sin(ωt + 36.9°) | 7 sin(ωt − 36.9°) | 5 sin(ωt − 53.1°) | R = √(16 + 9) = 5 and tan α = −3/4 with a > 0, so α = −36.9°: the sum lags. Adding the amplitudes (7) ignores the phase; 53.1° uses the wrong ratio.
SA3#engineering-u01-06-q5@2,3: Explain why the RMS value, not the average value, is used to rate AC voltages, and show why it equals the peak divided by √2 for a sinusoid. | The average of a sinusoid over a full cycle is zero, so it says nothing about heating or power. Power in a resistor is V^{2}/R, so the useful measure is the value whose square equals the mean of V^{2}. The mean of sin^{2} over a cycle is ½ (since sin^{2} = (1 − cos 2ωt)/2 and the cosine averages to zero), so the mean of V^{2} is V_{peak}^{2}/2 and V_{rms} = V_{peak}/√2. | Average over a cycle is zero ; Power depends on V squared ; Defines RMS ; Mean of sin squared is one half ; Derives the √2 factor

## Complex numbers and phasors
LV: Year 1 · Intermediate
S: Complex numbers make AC circuits, vibrations and control systems solvable with algebra instead of trigonometry. This lesson covers rectangular and polar forms, Euler's formula and the phasor method that turns differential equations into complex arithmetic.
O: Convert complex numbers between rectangular and polar form and perform arithmetic in each
O: Represent a sinusoid as a phasor and use impedance to analyse a simple AC circuit
O: Explain why phasors work and the conditions under which they apply
PRE: Trigonometry and sinusoids
H: Complex numbers
P: Engineers write **j** for √−1 because i is reserved for current. A complex number z = a + jb has real part a and imaginary part b. In **polar form** z = r∠θ, where the modulus r = √(a^{2} + b^{2}) and the argument θ = arctan(b/a), taking the quadrant into account.
E: e^{jθ} = cos θ + j sin θ :: Euler's formula, so z = re^{jθ}
E: (r_{1}∠θ_{1})(r_{2}∠θ_{2}) = r_{1}r_{2}∠(θ_{1} + θ_{2}) :: multiply moduli, add arguments
E: (r_{1}∠θ_{1})/(r_{2}∠θ_{2}) = (r_{1}/r_{2})∠(θ_{1} − θ_{2}) :: divide moduli, subtract arguments
- Add and subtract in rectangular form; multiply and divide in polar form.
- The complex conjugate of a + jb is a − jb; z times its conjugate is r^{2}, a real number.
IX: complex
H: Phasors
P: A sinusoid v(t) = V_{m} cos(ωt + φ) is the real part of V_{m}e^{jφ}e^{jωt}. When every quantity in a linear circuit oscillates at the same ω, the factor e^{jωt} is common and can be dropped, leaving the **phasor** V = V_{m}∠φ. Differentiation becomes multiplication by jω, so the impedances are:
E: Z_{R} = R; Z_{L} = jωL; Z_{C} = 1/(jωC) = −j/(ωC) :: resistor, inductor, capacitor
X: A 230 V RMS, 50 Hz supply feeds a resistor of 30 Ω in series with an inductor of reactance 40 Ω. Find the current.
> Z = 30 + j40 = 50∠53.1° Ω
> I = V/Z = 230∠0° / 50∠53.1° = 4.6∠−53.1° A RMS: the current lags the voltage by 53.1°.
K: Phasors replace a linear differential equation at a single frequency by complex algebra: impedances combine like resistances.
!: Using phasors for transients or non-linear components. The method gives only the steady-state response of linear circuits at one frequency; switching transients need the full differential equation or the Laplace transform.
EV: established | Phasor analysis is exact for the sinusoidal steady state of linear time-invariant circuits; it was introduced into electrical engineering by Steinmetz in the 1890s.
T: Phasor | A complex number giving the amplitude and phase of a sinusoid at a known frequency
T: Impedance | The complex ratio of voltage phasor to current phasor, Z = R + jX, in ohms
SUM: Use rectangular form to add and polar form to multiply; phasors and impedances turn sinusoidal steady-state problems into complex arithmetic.
SRC: Hughes E., Hughes Electrical and Electronic Technology, revised by Hiley J., Brown K. and Smith I. M., 12th edition, Pearson | secondary | 2016
SRC: Kreyszig E., Advanced Engineering Mathematics, 10th edition, Wiley | secondary | 2011
Q: Why do electrical engineers use j rather than i? | Because i denotes current.
Q: What is the impedance of an inductor L at angular frequency ω? | jωL: purely imaginary, so current lags voltage by 90°.
M1#engineering-u01-07-q1@1: What is j^{2}? | −1 | 1 | j | 0 | By definition j = √−1, so j^{2} = −1; this is what makes jωL a 90° phase shift.
M2#engineering-u01-07-q2@1,2: What is (8∠60°)/(2∠15°)? | 4∠45° | 4∠75° | 16∠75° | 6∠45° | Divide the moduli (8/2 = 4) and subtract the arguments (60° − 15° = 45°).
NUM2#engineering-u01-07-q3@1: What is the modulus of (3 + j4)(1 − j2)? | 11.18 | 0.01 |  | The product is 3 − j6 + j4 + 8 = 11 − j2, modulus √(121 + 4) = 11.18. Equivalently, multiply the moduli: 5 × √5 = 11.18.
M3#engineering-u01-07-q4@3: Why can the impedance method be used for a series RLC circuit driven at 50 Hz but not to find the current in the first few milliseconds after switching on? | Phasors give only the sinusoidal steady state; the switch-on transient is a decaying solution the method discards | Impedances of capacitors are undefined at 50 Hz | The method only works for resistors and inductors | Complex numbers cannot represent quantities that change with time | The phasor method assumes every quantity oscillates at one frequency forever. The transient is a solution of the homogeneous differential equation that decays, which needs time-domain or Laplace analysis.
SA3#engineering-u01-07-q5@2,3: A series circuit has R = 40 Ω and a capacitor with reactance 30 Ω, fed by 100 V RMS. Find the current and its phase relative to the supply, and explain the sign of the phase. | Z = 40 − j30 = 50∠−36.9° Ω. I = 100∠0°/50∠−36.9° = 2∠36.9° A RMS. The phase is positive: the current leads the voltage by 36.9°. A capacitor's impedance is −j/(ωC), so its current leads its voltage by 90°; combined with the resistor the circuit is partly capacitive and the current leads by less than 90°. | Writes Z with a negative imaginary part ; Converts to polar form ; I = 2 A ; Current leads by 36.9° ; Explains the capacitive lead

## Vectors and their products
LV: Year 1 · Foundation
S: Forces, velocities, moments and fields all have direction as well as size. This lesson covers vector components, unit vectors and the two products engineers use constantly: the dot product (work, projection) and the cross product (moments).
O: Express a vector in Cartesian components and find its magnitude and a unit vector along it
O: Use the dot product to find work, angles and the component of a vector along a line
O: Use the cross product to find a moment and explain its direction and non-commutativity
H: Components and unit vectors
P: A vector a = a_{x}i + a_{y}j + a_{z}k has magnitude a = √(a_{x}^{2} + a_{y}^{2} + a_{z}^{2}). Dividing a vector by its magnitude gives a **unit vector** along it. A force F along a line from A to B is F multiplied by the unit vector from A to B.
H: The dot product
E: a · b = ab cos θ = a_{x}b_{x} + a_{y}b_{y} + a_{z}b_{z} :: a scalar
- Work done by a constant force: W = F · s.
- Component of F along a unit vector u: F · u.
- a · b = 0 means the vectors are perpendicular.
X: A force F = (10i + 5j) N moves its point of application through s = (3i − 2j) m. Find the work done.
> W = F · s = 10 × 3 + 5 × (−2) = 30 − 10 = 20 J
H: The cross product
E: a × b = (a_{y}b_{z} − a_{z}b_{y})i + (a_{z}b_{x} − a_{x}b_{z})j + (a_{x}b_{y} − a_{y}b_{x})k :: a vector of magnitude ab sin θ
P: The result is perpendicular to both a and b, in the direction given by the **right-hand rule**. The moment of a force about a point O is M = r × F, where r runs from O to any point on the force's line of action. Order matters: b × a = −(a × b).
X: A force F = (3i + 4j − 2k) kN acts at r = (2i + j) m from O. Find its moment about O.
> M_{x} = r_{y}F_{z} − r_{z}F_{y} = 1 × (−2) − 0 × 4 = −2
> M_{y} = r_{z}F_{x} − r_{x}F_{z} = 0 × 3 − 2 × (−2) = 4
> M_{z} = r_{x}F_{y} − r_{y}F_{x} = 2 × 4 − 1 × 3 = 5, so M = (−2i + 4j + 5k) kN m, of magnitude √45 = 6.71 kN m
K: Dot product: how much of one vector lies along another (a scalar). Cross product: the turning effect, perpendicular to both (a vector).
!: Writing F × r instead of r × F for a moment. Reversing the order reverses the sign of every component and the sense of rotation.
EV: established | Vector algebra in Cartesian components, including the dot and cross products, is the standard language of engineering mechanics.
T: Unit vector | A vector of magnitude one giving a direction
T: Cross product | The vector a × b of magnitude ab sin θ, perpendicular to a and b by the right-hand rule
SUM: Work in components, use unit vectors for directions, the dot product for work and projection, and r × F for moments.
SRC: Hibbeler R. C., Engineering Mechanics: Statics, 14th edition, Pearson, chapters 2 and 4 | secondary | 2016
SRC: Strang G. and Herman E., Calculus Volume 3, OpenStax, chapter 2 (vectors in space) | secondary | 2016 | https://openstax.org/details/books/calculus-volume-3
Q: What does a zero dot product between two non-zero vectors mean? | They are perpendicular.
Q: How is the moment of a force about a point written as a vector? | M = r × F, with r from the point to the line of action of F.
M1#engineering-u01-08-q1@1: What is the magnitude of the vector (2i − 3j + 6k) m? | 7 m | 5 m | 11 m | 49 m | √(4 + 9 + 36) = √49 = 7 m. 11 adds the components; 49 forgets the square root.
M2#engineering-u01-08-q2@2: A 50 N force acts at 60° to the direction of a 4 m displacement. How much work does it do? | 100 J | 200 J | 173 J | 50 J | W = Fs cos θ = 50 × 4 × cos 60° = 100 J. 173 J uses sin 60°, which would be the magnitude of a cross product.
NUM2#engineering-u01-08-q3@2: Find the work done by F = (6i + 2j − k) N moving through s = (2i − 3j + 4k) m. | 2 | 0 | J | F · s = 12 − 6 − 4 = 2 J.
M3#engineering-u01-08-q4@3: For r = (1i) m and F = (5j) N, a student computes F × r and reports a moment of 5k N m about O. What is wrong? | The order is reversed: r × F = +5k N m, so F × r gives −5k N m, the opposite sense | Nothing: the cross product is commutative | The moment should be a scalar, 5 N m, with no direction | The moment should be zero because r and F are perpendicular | i × j = k, so r × F = 5k N m (anticlockwise about z). F × r = −5k. The cross product is anticommutative, and perpendicular vectors give the largest, not zero, moment.
SA3#engineering-u01-08-q5@2,3: A cable runs from A(0, 0, 0) to B(3, 4, 12) m and carries a tension of 2.6 kN, pulling A towards B. Write the force on A as a vector and find its component along the x axis, explaining each step. | The vector from A to B is (3i + 4j + 12k) m with length √(9 + 16 + 144) = 13 m. The unit vector is (3i + 4j + 12k)/13. F = 2.6 kN × that unit vector = (0.6i + 0.8j + 2.4k) kN. Its component along x is F · i = 0.6 kN. | Finds the position vector A to B ; Computes length 13 m ; Forms the unit vector ; Multiplies by the tension ; Uses the dot product with i to get 0.6 kN

## Matrices and simultaneous equations
LV: Year 1 · Intermediate
S: Engineering analysis often produces many linear equations at once: forces at the joints of a truss, currents in a circuit, displacements in a finite element model. This lesson covers matrix notation, determinants and inverses, Gaussian elimination and what a singular or ill-conditioned system means physically.
O: Write a set of linear equations as Ax = b and carry out matrix multiplication
O: Solve 2×2 and 3×3 systems by inverse, Cramer's rule or Gaussian elimination
O: Interpret a zero or near-zero determinant in an engineering system
H: Matrix notation
P: A system of linear equations is written **Ax = b**, where A holds the coefficients, x the unknowns and b the known right-hand side. Matrix multiplication takes rows into columns; in general AB ≠ BA. The **identity** I leaves a matrix unchanged, and the **inverse** A^{-1} satisfies AA^{-1} = I.
E: det [a b; c d] = ad − bc :: 2×2 determinant
E: [a b; c d]^{-1} = (1/(ad − bc)) [d −b; −c a] :: 2×2 inverse
E: x = A^{-1}b :: solution when det A ≠ 0
X: Mesh analysis of a two-loop circuit gives 10I_{1} − 4I_{2} = 12 and −4I_{1} + 8I_{2} = 0. Find the currents.
> det A = 10 × 8 − (−4)(−4) = 64
> I_{1} = (12 × 8 − (−4) × 0)/64 = 1.5 A; I_{2} = (10 × 0 − (−4) × 12)/64 = 0.75 A
> Check: 10 × 1.5 − 4 × 0.75 = 12 and −6 + 6 = 0.
IX: matrix
H: Larger systems
P: For more than three unknowns, **Gaussian elimination** is used: subtract multiples of rows to reach an upper-triangular form, then back-substitute. Software does this (with **pivoting**, swapping rows so that it never divides by a small number) for systems with millions of unknowns, such as the stiffness equations Ku = F of a finite element model.
H: When there is no unique solution
- **det A = 0**: the matrix is **singular**; the equations are dependent or inconsistent. In a structure this signals a **mechanism**: it can move without resistance, so its supports or members are inadequate.
- **det A small relative to the entries**: the system is **ill-conditioned**; small errors in the data produce large changes in the answer.
K: A singular stiffness or equilibrium matrix is not a maths problem to work round: it is telling you the structure or circuit is incompletely constrained.
!: Assuming AB = BA. Matrix multiplication is not commutative, so the order of transformations and of factors in an equation matters.
EV: established | Gaussian elimination with partial pivoting is the standard direct method for dense linear systems and is numerically stable in practice for most engineering problems.
T: Singular matrix | A square matrix with zero determinant and no inverse
T: Ill-conditioned system | A system whose solution is very sensitive to small changes in its coefficients or data
SUM: Write linear systems as Ax = b, solve by elimination or inverse, and read a zero determinant as a mechanism or dependency.
SRC: Kreyszig E., Advanced Engineering Mathematics, 10th edition, Wiley, chapter 7 | secondary | 2011
SRC: Chapra S. C. and Canale R. P., Numerical Methods for Engineers, 7th edition, McGraw-Hill | secondary | 2015
Q: What does det A = 0 mean for Ax = b? | A is singular: there is no unique solution (the equations are dependent or inconsistent).
Q: What is pivoting in Gaussian elimination? | Swapping rows so the largest available coefficient is used as the divisor, limiting round-off error.
M1#engineering-u01-09-q1@1: What is the determinant of [4 2; 3 5]? | 14 | 26 | 2 | 20 | det = 4 × 5 − 2 × 3 = 20 − 6 = 14. 26 adds the products instead of subtracting.
M2#engineering-u01-09-q2@2: Solve 3x + 2y = 16 and x − y = 2. | x = 4, y = 2 | x = 2, y = 4 | x = 5, y = 0.5 | x = 6, y = −1 | From the second equation x = 2 + y; substituting, 6 + 5y = 16 so y = 2 and x = 4. Check: 12 + 4 = 16.
NUM2#engineering-u01-09-q3@2: For the system 2x + y = 5 and x + 3y = 10, what is y? | 3 | 0 |  | det = 6 − 1 = 5; y = (2 × 10 − 1 × 5)/5 = 15/5 = 3 (and x = 1).
M3#engineering-u01-09-q4@3: A finite element model of a frame fails to solve because its stiffness matrix is singular. What is the most likely cause? | The model is not fully restrained, so it can move as a rigid body or mechanism | The loads are too large for the material | The mesh is too fine for the solver | The material's Young's modulus is too high | A singular stiffness matrix means some displacement pattern needs no force: a missing support or a released joint that allows a mechanism. Load size and modulus don't make K singular.
SA3#engineering-u01-09-q5@2,3: Explain what an ill-conditioned system of equations is and why it matters when the coefficients come from measurements. | A system is ill-conditioned when its matrix is close to singular, for example two equations that are nearly multiples of each other, so the lines (or planes) they represent are nearly parallel. Then small changes in coefficients or the right-hand side move the intersection a long way, so measurement error or rounding in the data is greatly amplified in the solution. The engineer should check the condition number, reformulate the problem (choose better-separated measurements or variables), use pivoting and higher precision, and report the sensitivity. | Defines near-singularity ; Gives the geometric picture ; Explains amplification of data error ; Links to measured coefficients ; Suggests a remedy

## Eigenvalues and eigenvectors
LV: Year 1 · Advanced
S: An eigenvector is a direction a matrix only stretches, and its eigenvalue is the stretch factor. In engineering they give the natural frequencies and mode shapes of vibrating structures, the principal stresses at a point and the stability of dynamic systems.
O: Define eigenvalues and eigenvectors and find them for a 2×2 matrix
O: Relate eigenvalues to natural frequencies, principal stresses and stability
O: Interpret the physical meaning of eigenvectors as mode shapes or principal directions
PRE: Matrices and simultaneous equations
H: The eigenvalue problem
E: Av = λv :: v is an eigenvector of A with eigenvalue λ
E: det(A − λI) = 0 :: the characteristic equation
E: λ^{2} − (trace A)λ + det A = 0 :: for a 2×2 matrix
X: Find the eigenvalues and eigenvectors of A = [2 1; 1 2].
> trace = 4, det = 3, so λ^{2} − 4λ + 3 = 0 and λ = 1 or 3.
> λ = 3: (A − 3I)v = 0 gives −v_{1} + v_{2} = 0, so v = (1, 1). λ = 1: v_{1} + v_{2} = 0, so v = (1, −1).
IX: matrix
H: Engineering meanings
- **Vibration**: for masses M and stiffnesses K, free vibration satisfies (K − ω^{2}M)φ = 0. Each eigenvalue gives a natural frequency ω and each eigenvector φ a **mode shape**.
- **Principal stresses**: the eigenvalues of the stress matrix are the principal stresses and the eigenvectors their directions, where shear stress is zero.
- **Stability**: a linear system dx/dt = Ax is stable if every eigenvalue of A has a negative real part.
X: Two equal masses m are joined to each other and to two walls by three equal springs k. Describe the modes.
> The eigenvalue problem gives ω_{1} = √(k/m) with the masses moving together (the middle spring unstretched) and ω_{2} = √(3k/m) with the masses moving in opposition.
X: A point is in plane stress with σ_{x} = 80 MPa, σ_{y} = 20 MPa and τ_{xy} = 40 MPa. Find the principal stresses.
> The stress matrix [80 40; 40 20] has trace 100 and determinant 1600 − 1600 = 0, so λ^{2} − 100λ = 0.
> Principal stresses: 100 MPa and 0 MPa.
K: Eigenvalues are the special numbers of a system (frequencies, principal stresses, decay rates); eigenvectors are its special shapes or directions.
!: Treating eigenvectors as having a definite length. Any non-zero multiple of an eigenvector is also an eigenvector; only its direction (or the ratio of its components) is meaningful.
EV: established | Modal analysis of structures solves the generalised eigenvalue problem of stiffness and mass matrices; it underpins design against resonance in bridges, buildings and machines.
T: Eigenvalue | A scalar λ for which Av = λv has a non-zero solution v
T: Mode shape | The pattern of relative displacements in which a structure vibrates at one natural frequency
SUM: Solve det(A − λI) = 0 for eigenvalues, then (A − λI)v = 0 for eigenvectors; read them as frequencies and modes, principal stresses and directions, or stability.
SRC: Kreyszig E., Advanced Engineering Mathematics, 10th edition, Wiley, chapter 8 | secondary | 2011
SRC: Rao S. S., Mechanical Vibrations, 6th edition (SI), Pearson | secondary | 2017
Q: What equation gives the eigenvalues of A? | The characteristic equation det(A − λI) = 0.
Q: What condition on eigenvalues makes dx/dt = Ax stable? | Every eigenvalue has a negative real part.
M1#engineering-u01-10-q1@1: If Av = λv for non-zero v, what is v called? | An eigenvector of A | The inverse of A | The determinant of A | A null vector of A | v is an eigenvector: A only scales it, by the eigenvalue λ.
M2#engineering-u01-10-q2@2: What are the eigenvalues of [5 0; 0 −2]? | 5 and −2 | 3 and 0 | 5 and 2 | −10 and 1 | A diagonal matrix's eigenvalues are its diagonal entries; trace 3 and determinant −10 confirm λ^{2} − 3λ − 10 = (λ − 5)(λ + 2).
NUM2#engineering-u01-10-q3@2: What is the larger eigenvalue of [4 1; 2 3]? | 5 | 0 |  | trace 7, det 12 − 2 = 10: λ^{2} − 7λ + 10 = 0 gives λ = 2 or 5.
M3#engineering-u01-10-q4@3: A system dx/dt = Ax has eigenvalues −2 and +0.1. What happens after a small disturbance? | It grows without limit, because one eigenvalue has a positive real part | It decays, because the larger eigenvalue in magnitude is negative | It oscillates steadily at 0.1 rad s^{-1} | It settles to a new equilibrium at 0.1 | Stability needs every eigenvalue to have a negative real part. The +0.1 mode grows as e^{0.1t}, however small, so the system is unstable; the dominant magnitude doesn't matter.
SA3#engineering-u01-10-q5@2,3: Explain how eigenvalue analysis is used to avoid resonance in the design of a footbridge. | The bridge is modelled with mass and stiffness matrices, and the eigenvalue problem (K − ω^{2}M)φ = 0 is solved for natural frequencies and mode shapes. These are compared with the frequencies of expected excitation, such as walking (vertical and lateral components) or wind. If a natural frequency lies near an excitation frequency, the design is changed (stiffness, mass, span) or damping is added. The mode shapes show where motion will be largest, guiding where to place dampers. | Mass and stiffness model ; Eigenvalues give natural frequencies ; Eigenvectors give mode shapes ; Compare with excitation frequencies such as footfall ; Change stiffness or mass or add damping

## Differentiation and rates of change
LV: Year 1 · Foundation
S: The derivative measures how fast one quantity changes with another. Engineers use it for velocity and acceleration, for the current through a capacitor, and to find the dimensions that maximise or minimise something. This lesson reviews the rules and applies them.
O: Differentiate polynomial, trigonometric, exponential and logarithmic functions using the product, quotient and chain rules
O: Apply derivatives to kinematics and to capacitors and inductors
O: Find and classify stationary points to solve an optimisation problem
H: The rules
E: d(x^{n})/dx = nx^{n−1}; d(e^{ax})/dx = ae^{ax}; d(ln x)/dx = 1/x
E: d(sin ωt)/dt = ω cos ωt; d(cos ωt)/dt = −ω sin ωt :: radians only
E: (uv)' = u'v + uv'; (u/v)' = (u'v − uv')/v^{2}; dy/dx = (dy/du)(du/dx) :: product, quotient, chain
IX: tangent
H: Rates of change
- Kinematics: v = ds/dt, a = dv/dt = d^{2}s/dt^{2}.
- Capacitor: i = C dv/dt; inductor: v = L di/dt.
- Sensitivity: dP/dx tells you how much an output changes per unit change of an input.
X: A slider moves with s = 2t^{3} − 6t^{2} + 4 m. Find its velocity and acceleration at t = 3 s.
> v = 6t^{2} − 12t = 54 − 36 = 18 m s^{-1}
> a = 12t − 12 = 24 m s^{-2}
H: Optimisation
P: At a **stationary point** dy/dx = 0. If d^{2}y/dx^{2} < 0 it is a maximum; if > 0, a minimum; if zero, the test is inconclusive and the sign of dy/dx either side must be checked. Always check the end points of the allowed range too.
X: An open box is made from a 300 mm square sheet by cutting squares of side x from each corner. Find x for maximum volume.
> V = x(300 − 2x)^{2}; dV/dx = (300 − 2x)^{2} − 4x(300 − 2x) = (300 − 2x)(300 − 6x)
> dV/dx = 0 at x = 50 mm (x = 150 gives zero volume); V = 50 × 200^{2} = 2 × 10^{6} mm^{3} = 2 litres
K: Differentiate to find rates and sensitivities; set the derivative to zero, then check the second derivative and the end points, to optimise.
!: Forgetting the chain rule factor. d(sin 2πft)/dt is 2πf cos 2πft, not cos 2πft; missing the factor puts frequency errors into every AC and vibration calculation.
EV: established | The derivative rules here are exact results of calculus; the physical relations i = C dv/dt and v = L di/dt hold for ideal linear capacitors and inductors.
T: Derivative | The instantaneous rate of change of a function, the limit of the gradient of a chord
T: Stationary point | A point where the derivative is zero: a maximum, minimum or point of inflection
SUM: Use the rules (with the chain rule) to find rates; apply them to motion and circuit elements; optimise by setting derivatives to zero and classifying.
SRC: Strang G. and Herman E., Calculus Volume 1, OpenStax, chapters 3 and 4 | secondary | 2016 | https://openstax.org/details/books/calculus-volume-1
SRC: Stroud K. A. and Booth D. J., Engineering Mathematics, 8th edition, Red Globe Press | secondary | 2020
Q: What is the current through a capacitor C whose voltage is changing? | i = C dv/dt.
Q: How do you classify a stationary point? | Use the second derivative: negative for a maximum, positive for a minimum; if zero, check the sign of the gradient either side.
M1#engineering-u01-11-q1@1: What is d(e^{3t})/dt? | 3e^{3t} | e^{3t} | 3te^{3t−1} | e^{3t}/3 | By the chain rule, d(e^{at})/dt = ae^{at}. The power rule does not apply to exponentials.
M2#engineering-u01-11-q2@2: The voltage across a 10 µF capacitor rises at 2000 V s^{-1}. What current flows into it? | 20 mA | 2 mA | 200 mA | 0.2 mA | i = C dv/dt = 10 × 10^{-6} × 2000 = 0.02 A = 20 mA.
NUM2#engineering-u01-11-q3@2: A cam follower has displacement s = 0.5t^{4} − 2t^{2} (m, s). What is its acceleration at t = 2 s? | 20 | 0 | m s^{-2} | v = 2t^{3} − 4t, a = 6t^{2} − 4 = 24 − 4 = 20 m s^{-2}.
M3#engineering-u01-11-q4@3: For y = x^{4}, dy/dx = 0 and d^{2}y/dx^{2} = 0 at x = 0. What is the stationary point? | A minimum, found by checking that dy/dx changes from negative to positive | A point of inflection, because the second derivative is zero | A maximum, because the second derivative is not positive | Not a stationary point, because both derivatives vanish | A zero second derivative makes the test inconclusive, not an inflection. Here dy/dx = 4x^{3} is negative just left of 0 and positive just right, so x = 0 is a minimum.
SA3#engineering-u01-11-q5@3: A cylindrical can must hold 1 litre. Show how calculus finds the radius that minimises the sheet metal used, and comment on why real cans are not made to this shape. | Volume πr^{2}h = 10^{-3} m^{3} gives h = 10^{-3}/(πr^{2}). Area A = 2πr^{2} + 2πrh = 2πr^{2} + 2 × 10^{-3}/r. dA/dr = 4πr − 2 × 10^{-3}/r^{2} = 0 gives r^{3} = 10^{-3}/(2π), r ≈ 54 mm, h = 2r ≈ 108 mm; d^{2}A/dr^{2} > 0 so it is a minimum. Real cans differ because the model ignores the thicker ends, seams, stacking, handling, filling-line constraints and marketing; the optimum of a simplified model is not the optimum of the whole design. | Expresses h from the volume constraint ; Writes area as a function of r ; Differentiates and solves ; Confirms a minimum and h = 2r ; Explains model limitations

## Partial differentiation and error propagation
LV: Year 1 · Intermediate
S: Most engineering quantities depend on several variables. Partial derivatives measure the effect of each one alone, and the total differential predicts how small changes or errors in the inputs move the output, which is the basis of tolerance and uncertainty analysis.
O: Find partial derivatives of functions of two or more variables
O: Use the total differential to estimate the change or error in a calculated quantity
O: Compare worst-case and statistical (quadrature) combination of errors and judge which to use
PRE: Differentiation and rates of change
H: Partial derivatives
P: For f(x, y), the **partial derivative** ∂f/∂x is the derivative with respect to x while y is held constant. For f = x^{2}y^{3}, ∂f/∂x = 2xy^{3} and ∂f/∂y = 3x^{2}y^{2}.
E: δf ≈ (∂f/∂x)δx + (∂f/∂y)δy :: total differential for small changes
E: δq/q ≈ a δx/x + b δy/y :: for q = kx^{a}y^{b} (signed changes)
H: Errors and tolerances
- **Worst case**: add the magnitudes of every term; guarantees a bound but is pessimistic.
- **Statistical**: for independent random errors, combine in quadrature, as the GUM law of propagation of uncertainty does.
- Exponents amplify: a quantity depending on d^{3} has three times the relative error of d.
X: A heater's power is P = V^{2}/R with V = 230 V ± 2% and R = 50 Ω ± 1%. Estimate the uncertainty in P.
> P = 230^{2}/50 = 1058 W
> Worst case: δP/P = 2 × 2% + 1 × 1% = 5%, about ±53 W
> Quadrature (independent): √(4^{2} + 1^{2}) = 4.1%, about ±44 W
X: The second moment of area of a rectangular section is I = bh^{3}/12. What does a 1% error in depth h do?
> δI/I = 3 × 1% = 3%: depth matters three times as much as breadth, which is why beam depth is controlled tightly.
K: The exponent of a variable is its error multiplier: identify the variable with the largest exponent times relative error, and control that one.
!: Adding signed relative errors that should be magnitudes. In a worst-case bound for q = x/y, the terms add (δx/x + δy/y), even though y appears with a negative exponent.
EV: established | The first-order (linear) law of propagation of uncertainty is the method given in the GUM; it is accurate when uncertainties are small compared with the values.
T: Partial derivative | The rate of change of a function with respect to one variable, all others held constant
T: Total differential | The sum of partial derivatives times small changes in each variable, estimating the change in a function
SUM: Partial derivatives isolate each input's effect; the total differential propagates small errors, worst-case or in quadrature.
SRC: Strang G. and Herman E., Calculus Volume 3, OpenStax, chapter 4 | secondary | 2016 | https://openstax.org/details/books/calculus-volume-3
SRC: JCGM 100:2008, Guide to the expression of uncertainty in measurement (GUM), section 5 | standard | 2008
Q: What is ∂(x^{2}y^{3})/∂y? | 3x^{2}y^{2}.
Q: Why are worst-case error bounds pessimistic? | They assume every error takes its extreme value in the most damaging direction at once, which is unlikely for independent errors.
M1#engineering-u01-12-q1@1: What is ∂f/∂x for f = 3x^{2}y + sin y? | 6xy | 6xy + cos y | 3x^{2} + cos y | 6x | Treat y as constant: d(3x^{2}y)/dx = 6xy and sin y is a constant whose x derivative is zero.
M2#engineering-u01-12-q2@2: The bending stress in a solid shaft is σ = 32M/(πd^{3}). If the diameter is 2% undersize, roughly how much higher is the stress? | 6% | 2% | 8% | 3% | δσ/σ ≈ −3 δd/d = −3 × (−2%) = +6%. Diameter appears cubed, so its error is tripled.
NUM2#engineering-u01-12-q3@2: A pendulum gives g = 4π^{2}L/T^{2}. If L is uncertain by ±0.5% and T by ±0.2%, what is the worst-case relative uncertainty in g, in per cent? | 0.9 | 0.01 | % | δg/g = δL/L + 2δT/T = 0.5 + 2 × 0.2 = 0.9%.
M3#engineering-u01-12-q4@3: Three independent dimensions each with a tolerance of ±0.1 mm add to give a gap. Which statement about the gap's tolerance is best? | Worst case is ±0.3 mm; if the errors are independent and random, a statistical estimate is about ±0.17 mm | It is ±0.1 mm because each part has that tolerance | It is ±0.3 mm in every case, so statistical estimates are invalid | It is ±0.03 mm because errors average out | Worst case adds the tolerances; the statistical (root-sum-square) estimate is √3 × 0.1 ≈ 0.17 mm. Which to use depends on the consequence of exceeding it and the number of parts made.
SA3#engineering-u01-12-q5@2,3: A designer must decide between worst-case and root-sum-square tolerance stacking for a safety-critical assembly. Advise, with reasons. | Worst-case stacking guarantees that every assembly fits if each part is within tolerance, but it forces tighter, more expensive part tolerances. Root-sum-square assumes independent, roughly normal, centred variations and accepts a small fraction of assemblies outside the limit. For a safety-critical feature where any misfit could cause harm, worst case (or root-sum-square with a large margin and inspection of every assembly) is the prudent choice; for high-volume, non-critical fits, root-sum-square is economical. The assumptions of independence and centring should be checked against process data. | Explains worst case ; Explains root-sum-square and its assumptions ; Weighs cost against risk ; Recommends worst case for safety-critical ; Mentions checking process data

## Integration in engineering
LV: Year 1 · Foundation
S: Integration adds up a quantity that varies continuously: work from a varying force, displacement from velocity, charge from current, and the centroids and second moments that describe a cross-section. This lesson covers the definite integral, key techniques and these applications.
O: Evaluate definite integrals of standard functions and use substitution
O: Apply integration to find work, displacement, charge and mean and RMS values
O: Set up integrals for centroids and second moments of area and interpret the result
PRE: Differentiation and rates of change
H: The definite integral
P: The **definite integral** of f(x) from a to b is the limit of the sum of f(x)δx over strips, the signed area under the curve. By the fundamental theorem of calculus it equals F(b) − F(a), where F is any antiderivative of f.
E: ∫x^{n} dx = x^{n+1}/(n + 1) + C (n ≠ −1); ∫(1/x) dx = ln x + C; ∫e^{ax} dx = e^{ax}/a + C
E: ∫sin ωt dt = −cos(ωt)/ω + C; ∫cos ωt dt = sin(ωt)/ω + C
IX: riemann
H: Accumulating physical quantities
- Work: W = ∫F dx. Displacement: s = ∫v dt. Charge: q = ∫i dt. Energy: E = ∫P dt.
- Mean value over a period T: (1/T)∫f dt; RMS value: √((1/T)∫f^{2} dt).
X: How much work is needed to stretch a spring of stiffness 2000 N m^{-1} from 0.05 m to 0.15 m extension?
> W = ∫kx dx from 0.05 to 0.15 = ½k(0.15^{2} − 0.05^{2}) = 1000 × (0.0225 − 0.0025) = 20 J
H: Properties of sections
E: x̄ = ∫x dA / ∫dA :: centroid
E: I_{x} = ∫y^{2} dA :: second moment of area about the x axis
X: Derive the second moment of area of a rectangle b wide and h deep about its centroidal axis.
> Strips of width b and thickness dy at distance y: I = ∫ y^{2} b dy from −h/2 to h/2
> I = b[y^{3}/3] = b(h^{3}/24 + h^{3}/24) = bh^{3}/12
K: Set up an integral by choosing a small element, writing the quantity it contributes, and summing over the range: the physics is in the element.
!: Integrating over the wrong limits or forgetting a sign. The mean of a sinusoid over a whole period is zero, which is why AC is described by RMS values, not means.
EV: established | The fundamental theorem of calculus links integration and differentiation exactly; numerical integration approximates it when no antiderivative is available.
T: Definite integral | The limit of a sum of f(x)δx between two limits, equal to F(b) − F(a)
T: Second moment of area | The integral of y^{2} over an area, a measure of a section's resistance to bending
SUM: Integrals accumulate continuously varying quantities; choose an element, write its contribution and sum, for work, charge, centroids and second moments.
SRC: Strang G. and Herman E., Calculus Volume 1, OpenStax, chapter 5 | secondary | 2016 | https://openstax.org/details/books/calculus-volume-1
SRC: Strang G. and Herman E., Calculus Volume 2, OpenStax, chapter 2 (applications of integration) | secondary | 2016 | https://openstax.org/details/books/calculus-volume-2
Q: How do you find displacement from a velocity–time function? | Integrate the velocity over the time interval: s = ∫v dt.
Q: What is the second moment of area of a rectangle about its centroidal axis parallel to its breadth? | bh^{3}/12.
M1#engineering-u01-13-q1@1: What is ∫ from 0 to 2 of 3x^{2} dx? | 8 | 12 | 6 | 4 | The antiderivative is x^{3}, so the integral is 2^{3} − 0 = 8.
M2#engineering-u01-13-q2@2: A current i = 4t A flows into a capacitor from t = 0 to 3 s. How much charge is delivered? | 18 C | 12 C | 36 C | 4 C | q = ∫4t dt from 0 to 3 = 2t^{2} = 18 C. 12 C multiplies the final current by the time, ignoring that it ramps.
NUM2#engineering-u01-13-q3@2: A force F = 50 + 20x N (x in m) moves a slider from x = 0 to x = 3 m. How much work does it do? | 240 | 0.5 | J | W = ∫(50 + 20x) dx = 50x + 10x^{2} from 0 to 3 = 150 + 90 = 240 J.
M3#engineering-u01-13-q4@3: Over one full period, what are the mean and RMS values of v = 10 sin ωt V? | Mean 0 V, RMS 7.07 V | Mean 6.37 V, RMS 7.07 V | Mean 0 V, RMS 0 V | Mean 7.07 V, RMS 10 V | Positive and negative halves cancel, so the mean is zero; the RMS is 10/√2 = 7.07 V. 6.37 V is the mean of a half-cycle (2/π × 10), a common confusion.
SA3#engineering-u01-13-q5@2,3: Explain why an I-section beam is much stiffer in bending than a solid rectangular beam of the same area, using the definition of second moment of area. | I = ∫y^{2} dA weights each element of area by the square of its distance from the neutral axis. An I-section puts most of its area in the flanges, far from the axis, where y^{2} is large, and only a thin web near the axis. A solid rectangle of the same area has much of its material near the axis contributing little. So the I-section has a much larger I and, since bending stiffness is EI, deflects far less and has lower bending stress for the same moment and weight. | States I = ∫y^{2} dA ; Explains the y-squared weighting ; Flanges far from neutral axis ; Links I to stiffness EI and stress ; Compares at equal area

## Taylor series and linearisation
LV: Year 1 · Intermediate
S: Near any point, a smooth function looks like a polynomial. Taylor series give that polynomial; truncating it at the linear term gives the linearisations engineers use for small-angle approximations, small-signal models and the linear control of non-linear plants.
O: Write the Taylor and Maclaurin series of standard functions
O: Linearise a non-linear relationship about an operating point
O: Estimate the error of a truncated series and judge when a linear approximation is acceptable
H: The series
E: f(x) = f(a) + f'(a)(x − a) + f''(a)(x − a)^{2}/2! + f'''(a)(x − a)^{3}/3! + … :: Taylor series about a
E: e^{x} = 1 + x + x^{2}/2! + …; sin x = x − x^{3}/3! + …; cos x = 1 − x^{2}/2! + … :: Maclaurin series (a = 0)
E: (1 + x)^{n} ≈ 1 + nx + n(n − 1)x^{2}/2 :: binomial, for small x
P: The first term left out is a good guide to the error when x is small. For sin θ ≈ θ, the error is about θ^{3}/6: at 0.2 rad (11.5°) this is 0.0013, under 1% of the value.
H: Linearisation
P: To **linearise** f about an operating point a, keep f(a) + f'(a)(x − a). Writing δx = x − a, the change δf ≈ f'(a)δx is linear in δx. This is how a pendulum becomes simple harmonic motion, how a transistor gets a small-signal gain, and how a non-linear process is controlled with linear control theory near its set point.
X: Linearise the pendulum equation θ'' + (g/l) sin θ = 0 for small swings.
> sin θ ≈ θ, so θ'' + (g/l)θ = 0: simple harmonic motion with ω = √(g/l).
> The period 2π√(l/g) is then independent of amplitude, which holds only while θ stays small.
X: Flow from a tank orifice is Q = C√h. Linearise about h_{0} = 4 m.
> dQ/dh = C/(2√h) = C/4 at h = 4, so Q ≈ C(2 + (h − 4)/4): valid for small changes of level.
K: A linearisation is a tangent line: accurate near the operating point and increasingly wrong away from it, so always state the range over which it is used.
!: Applying a small-angle approximation at large angles. At 45° (0.785 rad) sin θ = 0.707, so taking sin θ ≈ θ is 11% out.
EV: established | Linearisation about an operating point is the foundation of classical linear control and small-signal circuit analysis; its validity is limited to small deviations.
T: Linearisation | Replacing a function near a point by its tangent: f(a) + f'(a)(x − a)
T: Operating point | The steady condition about which a non-linear system is linearised
SUM: Taylor series approximate functions by polynomials; keep the linear term to linearise about an operating point and check the error with the next term.
SRC: Strang G. and Herman E., Calculus Volume 2, OpenStax, section 6.3 (Taylor and Maclaurin series) | secondary | 2016 | https://openstax.org/details/books/calculus-volume-2
SRC: Kreyszig E., Advanced Engineering Mathematics, 10th edition, Wiley | secondary | 2011
Q: What is the first-order (linear) approximation of f(x) near x = a? | f(a) + f'(a)(x − a).
Q: What is the first neglected term in sin θ ≈ θ? | −θ^{3}/6.
M1#engineering-u01-14-q1@1: What is the Maclaurin series of e^{x} up to x^{2}? | 1 + x + x^{2}/2 | 1 + x + x^{2} | x + x^{2}/2 | 1 + x^{2}/2 | Every derivative of e^{x} is e^{x} = 1 at 0, so the terms are 1, x and x^{2}/2!.
M2#engineering-u01-14-q2@2: A rod of length 2.000 m has α = 12 × 10^{-6} K^{-1}. Using L = L_{0}(1 + αΔT), by how much does it lengthen for a 50 K rise? | 1.2 mm | 0.6 mm | 12 mm | 0.12 mm | δL = L_{0}αΔT = 2.000 × 12 × 10^{-6} × 50 = 1.2 × 10^{-3} m; the expansion formula is itself a first-order Taylor approximation.
NUM2#engineering-u01-14-q3@3: Using sin θ ≈ θ at θ = 0.2 rad, what is the percentage error relative to the true value of sin θ? | 0.67 | 0.02 | % | sin 0.2 = 0.19867; (0.2 − 0.19867)/0.19867 = 0.67%.
M3#engineering-u01-14-q4@3: A level controller was designed by linearising Q = C√h at h = 4 m. It performs well at 3.5 to 4.5 m but poorly when the tank is nearly empty. Why? | The gain dQ/dh = C/(2√h) rises sharply at low level, so the linear model's gain is far from the true one there | Linear models are never accurate for flow problems | The controller needs a higher gain at every level | The square-root law stops applying when the tank is nearly empty | The linearised gain is only correct near the operating point. As h falls the slope of √h grows, so the plant becomes more sensitive than the model; gain scheduling or a non-linear model is needed.
SA3#engineering-u01-14-q5@2,3: Explain why the period of a simple pendulum is described as "independent of amplitude", and evaluate this claim. | Linearising sin θ ≈ θ gives simple harmonic motion with period 2π√(l/g), which contains no amplitude. The claim is therefore only as good as the small-angle approximation: the next term (−θ^{3}/6) makes the restoring torque weaker at larger angles, so the true period increases with amplitude, by roughly 0.2% at 10° and about 7% at 60°. For clocks and precise timing the amplitude must be kept small and constant; the claim is an approximation, not a law. | Derives the linear model ; Notes amplitude does not appear ; Explains the neglected cubic term ; States that real period grows with amplitude ; Judges the claim as an approximation

## First-order differential equations
LV: Year 1 · Intermediate
S: A first-order differential equation relates a quantity to its own rate of change. It models anything with one energy store: a capacitor charging, a part cooling, a tank filling. This lesson solves the standard forms and interprets the time constant.
O: Recognise and solve separable and linear first-order differential equations
O: Model an RC circuit and Newton cooling as first-order systems and find their responses
O: Evaluate the assumptions behind a first-order (lumped) model
PRE: Exponentials and logarithms in engineering
H: Standard forms
E: τ dy/dt + y = y_{∞} :: first-order system with time constant τ and final value y_{∞}
E: y(t) = y_{∞} + (y_{0} − y_{∞})e^{−t/τ} :: solution from initial value y_{0}
P: A **separable** equation dy/dx = f(x)g(y) is solved by integrating dy/g(y) = f(x)dx. A **linear** equation dy/dx + P(x)y = Q(x) is solved with the integrating factor e^{∫P dx}. Either way one constant appears, fixed by the initial condition.
IX: ode
H: Engineering first-order systems
- RC circuit charging from a source V_{s}: RC dv/dt + v = V_{s}, so τ = RC and v = V_{s}(1 − e^{−t/RC}).
- Newton cooling: mc dT/dt = −hA(T − T_{∞}), so τ = mc/(hA).
- A tank with outflow proportional to level: A dh/dt = Q_{in} − h/R.
X: A steel part at 400 °C cools in air at 20 °C with τ = 600 s. How long until it reaches 100 °C?
> T − 20 = 380e^{−t/600}; at 100 °C, 80 = 380e^{−t/600}
> t = 600 ln(380/80) = 600 × 1.558 = 935 s, about 15.6 minutes
X: An RC circuit has R = 4.7 kΩ and C = 220 µF and is switched onto 9 V. Find the voltage after 2 s.
> τ = 4700 × 220 × 10^{-6} = 1.03 s; v = 9(1 − e^{−2/1.03}) = 9(1 − 0.145) = 7.7 V
P: **Investigate with the lab.** Charge the capacitor and time the rise to 63%. Then double R and see the time constant double.
IX: transients
K: Every first-order system responds to a step the same way: exponentially to its final value with one time constant, 63% of the way after τ and settled after about 5τ.
!: Using a lumped (single-temperature) cooling model for a thick part. It assumes the temperature is uniform inside, which needs the Biot number hL/k below about 0.1; otherwise the surface cools much faster than the core.
EV: established | First-order linear models accurately describe ideal RC circuits; lumped thermal models are accurate when the Biot number is small (commonly taken as below 0.1).
T: First-order system | A system described by one first-order differential equation, with one energy store and one time constant
T: Integrating factor | A multiplier e^{∫P dx} that makes a linear first-order equation directly integrable
SUM: First-order systems approach their final value exponentially with one time constant; solve by separation or integrating factor and fix the constant from the initial condition.
SRC: Kreyszig E., Advanced Engineering Mathematics, 10th edition, Wiley, chapter 1 | secondary | 2011
SRC: Çengel Y. A. and Ghajar A. J., Heat and Mass Transfer: Fundamentals and Applications, 5th edition, McGraw-Hill, chapter 4 (lumped system analysis) | secondary | 2015
Q: What is the time constant of an RC circuit? | τ = RC (seconds when R is in ohms and C in farads).
Q: When is a lumped thermal model valid? | When the body's internal temperature is nearly uniform: Biot number hL/k below about 0.1.
M1#engineering-u01-15-q1@1: Which equation is first-order linear? | dy/dt + 3y = 6 | d^{2}y/dt^{2} + y = 0 | dy/dt + y^{2} = 1 | (dy/dt)^{2} = y | Only dy/dt + 3y = 6 has a first derivative and y appearing linearly. The second is second-order; the others are non-linear.
M2#engineering-u01-15-q2@2: A thermometer with τ = 10 s is plunged from 20 °C into water at 80 °C. What does it read after 10 s? | About 58 °C | About 50 °C | About 80 °C | About 42 °C | After one time constant 63.2% of the 60 K change is complete: 20 + 0.632 × 60 ≈ 58 °C.
NUM2#engineering-u01-15-q3@2: A 220 µF capacitor charges through 4.7 kΩ from a 9.0 V supply, starting uncharged. What is its voltage after 2.0 s? | 7.70 | 1% | V | τ = 1.034 s; v = 9(1 − e^{−2/1.034}) = 9(1 − 0.1445) = 7.70 V.
M3#engineering-u01-15-q4@3: A 50 mm thick steel block is modelled as cooling with a single temperature and τ = mc/(hA). Measured core temperatures fall more slowly than predicted. Why? | Its Biot number is too large for a lumped model, so the core lags the surface | The time constant should be hA/(mc) | Newton's law of cooling does not apply to metals | The model predicts the core temperature too high | A lumped model assumes uniform temperature. If conduction inside is slow compared with surface convection (a larger Biot number), the core cools more slowly than the average; a transient conduction model is needed.
SA3#engineering-u01-15-q5@1,3: Derive the voltage on a capacitor charging through a resistor from a constant supply V_{s}, and state the assumptions. | Kirchhoff's voltage law gives V_{s} = iR + v with i = C dv/dt, so RC dv/dt + v = V_{s}. Separating: dv/(V_{s} − v) = dt/RC; integrating, −ln(V_{s} − v) = t/RC + constant. With v = 0 at t = 0, v = V_{s}(1 − e^{−t/RC}). Assumptions: ideal linear R and C, an ideal source with no internal resistance (or include it in R), no leakage and a switch that closes instantly. | Applies KVL ; Uses i = C dv/dt ; Separates and integrates ; Applies the initial condition ; States ideal-component assumptions
M2#engineering-u01-15-q6@1: An RC circuit has R = 2 kΩ and C = 500 μF. What is its time constant? | 1 s | 0.5 s | 2 s | 4 s | The time constant is τ = RC = 2,000 Ω × 0.0005 F = 1 s.

## Second-order differential equations
LV: Year 1 · Advanced
S: Systems with two energy stores, such as a mass and a spring or an inductor and a capacitor, obey second-order differential equations. Their behaviour is summarised by two numbers, the natural frequency and the damping ratio, which this lesson defines and uses.
O: Solve linear constant-coefficient second-order equations from the characteristic equation
O: Calculate the natural frequency and damping ratio of mechanical and electrical systems
O: Classify and interpret underdamped, critically damped and overdamped responses
PRE: First-order differential equations
H: The equation and its solutions
E: m x'' + c x' + k x = F(t) :: mass–spring–damper
E: ω_{n} = √(k/m); ζ = c/(2√(km)); c_{c} = 2√(km) :: natural frequency, damping ratio, critical damping
E: ω_{d} = ω_{n}√(1 − ζ^{2}) :: damped natural frequency (ζ < 1)
P: Trying x = e^{rt} in the unforced equation gives the **characteristic equation** mr^{2} + cr + k = 0. Real distinct roots give a sum of decaying exponentials (overdamped, ζ > 1); a repeated root gives (A + Bt)e^{rt} (critically damped, ζ = 1); complex roots give a decaying sinusoid e^{−ζω_{n}t}(A cos ω_{d}t + B sin ω_{d}t) (underdamped, ζ < 1).
IX: oscillator
H: Mechanical and electrical analogues
- Series RLC: L q'' + R q' + q/C = V(t), so ω_{n} = 1/√(LC) and ζ = (R/2)√(C/L).
- Mass ↔ inductance, damping ↔ resistance, stiffness ↔ 1/capacitance.
- For a forced system the full solution is the transient (which decays) plus a steady-state particular solution at the forcing frequency.
X: A machine of mass 10 kg sits on mounts of stiffness 4000 N m^{-1} with damping 80 N s m^{-1}. Find ω_{n}, ζ and ω_{d}.
> ω_{n} = √(4000/10) = 20 rad s^{-1} (3.18 Hz)
> ζ = 80/(2√(4000 × 10)) = 80/400 = 0.2: underdamped
> ω_{d} = 20√(1 − 0.04) = 19.6 rad s^{-1}
K: Natural frequency sets how fast a second-order system responds; damping ratio sets whether it overshoots and rings (ζ < 1) or creeps (ζ > 1).
!: Assuming a damped system oscillates at ω_{n}. It oscillates at ω_{d}, slightly lower; for light damping the difference is small, but it grows quickly as ζ approaches 1.
EV: established | The linear mass–spring–damper model and its electrical analogue describe small vibrations and RLC circuits accurately; real damping is often not purely viscous.
T: Damping ratio | ζ = c/c_{c}, the ratio of actual to critical damping
T: Natural frequency | ω_{n} = √(k/m), the frequency of free undamped oscillation
SUM: Solve via the characteristic equation; ω_{n} and ζ classify the response as under-, critically or overdamped, in mechanical and electrical systems alike.
SRC: Kreyszig E., Advanced Engineering Mathematics, 10th edition, Wiley, chapter 2 | secondary | 2011
SRC: Rao S. S., Mechanical Vibrations, 6th edition (SI), Pearson | secondary | 2017
Q: What is the critical damping coefficient of a mass–spring system? | c_{c} = 2√(km).
Q: What sort of roots does the characteristic equation have for an underdamped system? | A complex conjugate pair, giving a decaying sinusoid.
M1#engineering-u01-16-q1@1: What is the natural frequency of a mass m on a spring k? | √(k/m) rad s^{-1} | √(m/k) rad s^{-1} | k/m rad s^{-1} | 2π√(k/m) Hz | ω_{n} = √(k/m) in rad s^{-1}; in hertz it is √(k/m)/(2π), not multiplied by 2π.
M2#engineering-u01-16-q2@2: A series RLC circuit has L = 10 mH, C = 1 µF and R = 50 Ω. What is its damping ratio? | 0.25 | 0.5 | 1.0 | 0.025 | ζ = (R/2)√(C/L) = 25 × √(10^{-6}/10^{-2}) = 25 × 0.01 = 0.25: underdamped.
NUM2#engineering-u01-16-q3@2: What damping coefficient gives critical damping for a 2.0 kg mass on a spring of stiffness 800 N m^{-1}? | 80 | 0.5 | N s m^{-1} | c_{c} = 2√(km) = 2√(800 × 2) = 2 × 40 = 80 N s m^{-1}.
M3#engineering-u01-16-q4@3: A measuring instrument's pointer must reach its reading as fast as possible without overshooting. Which damping should the designer aim for? | Critical damping (ζ = 1), or very slightly below it | Light damping (ζ ≈ 0.1), because it responds fastest | Heavy overdamping (ζ ≈ 5), because it can never overshoot | No damping, because energy is not wasted | Critical damping is the fastest return without overshoot. Light damping rises quickly but overshoots and rings; heavy damping never overshoots but is sluggish. Many instruments use ζ a little below 1 as a compromise.
SA3#engineering-u01-16-q5@2,3: Using the mechanical and electrical analogy, explain how increasing the resistance in a series RLC circuit changes its response to a step, and why. | Resistance plays the role of the damper. Since ζ = (R/2)√(C/L), increasing R increases ζ. With small R the circuit is underdamped: the current and capacitor voltage overshoot and ring at ω_{d} with a slowly decaying envelope. As R rises the ringing dies faster and ω_{d} falls; at R = 2√(L/C) the circuit is critically damped and settles fastest without overshoot; beyond that it is overdamped and responds sluggishly. Physically, resistance dissipates the energy that would otherwise swap between the inductor and capacitor. | Maps R to damping ; Uses ζ = (R/2)√(C/L) ; Describes underdamped ringing ; Identifies critical damping value ; Explains energy dissipation

## Numerical methods
LV: Year 1 · Intermediate
S: Most real engineering equations have no neat closed-form answer, so they are solved numerically. This lesson covers root-finding (bisection and Newton–Raphson), numerical integration (trapezium and Simpson's rules) and stepping through ODEs (Euler and Runge–Kutta), with their errors.
O: Find roots by bisection and Newton–Raphson and compare their convergence
O: Apply the trapezium rule, Simpson's rule and Euler's method to engineering problems
O: Distinguish truncation from round-off error and judge whether a numerical answer can be trusted
PRE: Differentiation and rates of change
H: Root-finding
E: x_{n+1} = x_{n} − f(x_{n})/f'(x_{n}) :: Newton–Raphson
- **Bisection** halves an interval containing a sign change each step: guaranteed but slow (one binary digit per step).
- **Newton–Raphson** follows the tangent: very fast near a root (quadratic convergence, roughly doubling the correct digits each step) but can diverge or cycle from a poor start or where f' ≈ 0.
X: Solve x^{3} − 2x − 5 = 0 by Newton–Raphson from x_{0} = 2.
> f(2) = −1, f'(2) = 3 × 4 − 2 = 10, so x_{1} = 2 + 0.1 = 2.1
> f(2.1) = 0.061, f'(2.1) = 11.23, so x_{2} = 2.1 − 0.0054 = 2.0946 (the root is 2.09455)
IX: roots
H: Integration and ODEs
E: ∫f dx ≈ (h/2)[f_{0} + 2f_{1} + … + 2f_{n−1} + f_{n}] :: trapezium rule, error proportional to h^{2}
E: ∫f dx ≈ (h/3)[f_{0} + 4f_{1} + 2f_{2} + 4f_{3} + … + f_{n}] :: Simpson's rule (n even), error proportional to h^{4}
E: y_{n+1} = y_{n} + h f(t_{n}, y_{n}) :: Euler's method, global error proportional to h
X: Use Euler's method with h = 0.1 for dy/dt = −2y, y(0) = 1, up to t = 0.2.
> y_{1} = 1 + 0.1 × (−2) = 0.8; y_{2} = 0.8 + 0.1 × (−1.6) = 0.64
> Exact: e^{−0.4} = 0.670. The 4.5% error halves roughly with each halving of h; fourth-order Runge–Kutta (RK4) would be accurate to about 10^{-5} with the same step.
IX: ode
H: Can you trust it?
P: **Truncation error** comes from the method's approximation and falls as the step shrinks; **round-off error** comes from finite precision and grows as steps multiply. Check convergence by repeating with half the step: if the answer barely changes, it has converged. Check it against a hand estimate or a known special case.
P: **Investigate with the lab.** Approximate an integral with rectangles, midpoints and trapezia, and watch the error shrink as you add strips.
IX: riemann
K: A numerical answer is not trustworthy until you have shown it converges as the step is refined and agrees with an independent check.
!: Taking a step so large that an explicit method goes unstable. For dy/dt = −ky, Euler's method oscillates and blows up if h > 2/k, even though the true solution decays smoothly.
EV: established | Newton–Raphson converges quadratically to a simple root from a close enough start; the error orders of the trapezium, Simpson and Euler methods are standard results.
T: Truncation error | The error from approximating a mathematical process by a finite numerical one
T: Convergence | The approach of a numerical result to a limit as the step size is reduced or iterations increase
SUM: Bisection is safe, Newton fast; Simpson beats the trapezium rule; RK4 beats Euler; always check convergence and stability.
SRC: Chapra S. C. and Canale R. P., Numerical Methods for Engineers, 7th edition, McGraw-Hill | secondary | 2015
SRC: Strang G. and Herman E., Calculus Volume 2, OpenStax, section 3.6 (numerical integration) | secondary | 2016 | https://openstax.org/details/books/calculus-volume-2
Q: What is the Newton–Raphson iteration? | x_{n+1} = x_{n} − f(x_{n})/f'(x_{n}).
Q: How do you check that a numerical solution has converged? | Repeat it with a smaller step (or more iterations) and confirm the result barely changes.
M1#engineering-u01-17-q1@1: Which root-finding method is guaranteed to converge once an interval with a sign change is found? | Bisection | Newton–Raphson | Fixed-point iteration | The secant method | Bisection always keeps the root bracketed and halves the interval. Newton and the secant method are faster but can diverge.
M2#engineering-u01-17-q2@2: Use one Newton–Raphson step from x_{0} = 1 to estimate √2 (solve x^{2} − 2 = 0). | 1.5 | 1.414 | 2 | 1.25 | f(1) = −1, f'(1) = 2, so x_{1} = 1 + 0.5 = 1.5. A second step gives 1.4167.
NUM2#engineering-u01-17-q3@2: Estimate ∫ from 0 to 2 of x^{2} dx using the trapezium rule with h = 1. | 3 | 0 |  | (1/2)[0 + 2 × 1 + 4] = 3. The exact value is 8/3; the trapezium rule overestimates a curve that bends upwards.
M3#engineering-u01-17-q4@3: Euler's method for dy/dt = −50y with step h = 0.05 s gives values that oscillate and grow. What is the best explanation? | The step exceeds the stability limit 2/k = 0.04 s for an explicit method | Euler's method cannot solve exponential decay | Round-off error dominates at that step size | The exact solution also oscillates | With h k = 2.5 > 2, each step multiplies y by (1 − hk) = −1.5, so the result alternates and grows. Reducing h below 0.04 s, or using an implicit method, fixes it.
SA3#engineering-u01-17-q5@2,3: A colleague runs a simulation once with a large time step and reports the result to four significant figures. What would you ask them to do before you used it, and why? | Ask for a convergence study: rerun with the step halved (and halved again) and show the result changes by much less than the precision quoted, which tests truncation error. Ask whether the method is stable at that step for the fastest dynamics in the model. Ask for an independent check, such as a hand calculation, a limiting case with a known answer or a comparison with test data, which tests the model as well as the numerics. Four significant figures mean nothing until the numerical error is shown to be smaller than that. | Convergence with smaller step ; Stability limit ; Independent check or validation ; Distinguishes numerical from modelling error ; Precision quoted must match demonstrated error
M2#engineering-u01-17-q6@1: When the number of strips is doubled, roughly how does the trapezium rule's error change? | It falls to about a quarter | It halves | It stays about the same | It doubles | The trapezium rule's error is proportional to h², so halving h quarters it.

## Engineering statistics
LV: Year 1 · Intermediate
S: Materials, measurements and manufactured parts all vary. Statistics describes that variation, estimates how far a sample mean can be trusted, and fits models to data. This lesson covers the descriptive statistics, the normal distribution, confidence intervals, process capability and regression.
O: Calculate the mean and sample standard deviation and use the normal distribution
O: Find a confidence interval for a mean and a process capability index
O: Fit and evaluate a least-squares line and interpret correlation without overclaiming
H: Describing variation
E: x̄ = Σx_{i}/n; s = √(Σ(x_{i} − x̄)^{2}/(n − 1)) :: mean and sample standard deviation
- The **normal distribution** describes many measurement and process variations: about 68% of values lie within ±1σ of the mean, 95% within ±2σ and 99.7% within ±3σ.
- The mean of n readings varies less than single readings: its standard error is s/√n.
X: Five tensile tests give 412, 405, 418, 409 and 416 MPa. Find the mean and standard deviation.
> x̄ = 2060/5 = 412 MPa; deviations 0, −7, 6, −3, 4; sum of squares 110
> s = √(110/4) = 5.2 MPa
IX: clt
H: Confidence and capability
E: x̄ ± t s/√n :: confidence interval for the mean (t from the t distribution with n − 1 degrees of freedom)
E: C_{p} = (USL − LSL)/(6σ) :: process capability: specification width over process spread
X: A shaft is specified 25.00 ± 0.03 mm; the process has σ = 0.008 mm. Find C_{p}.
> C_{p} = 0.06/(6 × 0.008) = 1.25: the spread fits inside the tolerance, if the process is also centred (C_{pk} checks that).
H: Regression and correlation
P: **Least-squares regression** fits y = a + bx by minimising the sum of squared residuals. The correlation coefficient r (from −1 to +1) measures the strength of a linear association, and R^{2} the fraction of variance explained. Residual plots reveal curvature or outliers that r hides.
IX: regression
K: Every engineering measurement is a sample from a distribution: report the spread and the confidence in the mean, not just the average.
!: Reading correlation as causation. A strong r between two variables may come from a third that drives both, or from chance in a small sample; it also says nothing about non-linear relationships.
EV: established | Material strengths and manufactured dimensions are routinely described statistically; design values such as characteristic strengths are defined as percentiles of a distribution.
EV: contested | The normal distribution is a poor model for some properties, such as the strength of brittle materials, which is often modelled with a Weibull distribution instead.
T: Standard deviation | A measure of spread: the root-mean-square deviation from the mean (n − 1 divisor for a sample)
T: Process capability | How well a process's natural spread fits within the specification limits, measured by C_{p} and C_{pk}
SUM: Describe data by mean and standard deviation, quantify confidence in the mean, compare process spread with tolerance, and fit models with care.
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
SRC: Montgomery D. C. and Runger G. C., Applied Statistics and Probability for Engineers, 7th edition, Wiley | secondary | 2018
Q: Why divide by n − 1 for a sample standard deviation? | Because the deviations are measured from the sample mean, which uses up one degree of freedom; dividing by n would underestimate the spread.
Q: What fraction of a normal population lies within ±2σ of the mean? | About 95%.
M1#engineering-u01-18-q1@1: What is the standard error of the mean of 25 readings with s = 2.0 N? | 0.4 N | 2.0 N | 0.08 N | 10 N | s/√n = 2.0/√25 = 2.0/5 = 0.4 N; dividing by n instead (0.08 N) understates the uncertainty.
M2#engineering-u01-18-q2@2: A process has σ = 0.01 mm and a tolerance of ±0.02 mm. What is C_{p} and what does it suggest? | 0.67: the process spread is wider than the tolerance, so some parts will be out of specification | 2.0: the process is highly capable | 1.0: exactly capable with no rejects | 0.33: no parts can be within specification | C_{p} = 0.04/(6 × 0.01) = 0.67. Below 1, the ±3σ spread exceeds the tolerance band.
NUM2#engineering-u01-18-q3@2: Five measurements of a length are 20.1, 19.8, 20.3, 20.0 and 19.8 mm. What is the sample standard deviation? | 0.212 | 0.002 | mm | Mean 20.0; squared deviations 0.01, 0.04, 0.09, 0, 0.04 sum to 0.18; s = √(0.18/4) = 0.212 mm.
M3#engineering-u01-18-q4@3: Data on 30 bridges show a strong positive correlation (r = 0.8) between number of inspections and number of defects found. Which conclusion is best supported? | Inspection and defects are associated; older or more heavily used bridges may both be inspected more and have more defects | Inspecting bridges causes defects | Reducing inspections would reduce defects | Since r is not 1, there is no real relationship | Correlation shows association, not cause. A third factor (age, traffic) plausibly drives both, and more inspection also finds more defects. r = 0.8 is a strong association, not "no relationship".
SA3#engineering-u01-18-q5@2,3: Explain how you would decide whether a new supplier's steel is weaker than the current supplier's, given ten tensile test results from each. | Calculate each sample's mean and standard deviation and plot the data. State a null hypothesis of equal mean strengths and use a two-sample t test (checking the data are roughly normal and the variances similar, or use Welch's test), or compare confidence intervals for the two means. A small p value would indicate a real difference; report the size of the difference with its confidence interval, not just significance. Also check the lower tail, since design depends on characteristic (low percentile) strength, and that test conditions were the same. | Descriptive statistics and plots ; Hypothesis test or confidence intervals ; Checks assumptions ; Reports effect size not just significance ; Considers lower-tail strength and test consistency

## Probability and reliability
LV: Year 1 · Intermediate
S: Reliability engineering asks how likely a component or system is to keep working. This lesson covers the probability rules, the constant-failure-rate model, the bathtub curve and how series and parallel (redundant) arrangements combine reliabilities.
O: Apply the addition and multiplication rules of probability
O: Calculate reliability, failure rate and MTBF for the exponential model and for series and parallel systems
O: Evaluate how redundancy improves reliability and how common-cause failures undermine it
H: Probability rules
- **Independent events** A and B: P(A and B) = P(A)P(B).
- **Either or both**: P(A or B) = P(A) + P(B) − P(A and B).
- **Complement**: P(not A) = 1 − P(A); often easier to compute "at least one" as 1 − P(none).
IX: lln
H: Reliability
E: R(t) = e^{−λt} :: reliability with a constant failure rate λ
E: MTTF = 1/λ :: mean time to failure (MTBF for repairable items with constant λ)
P: The **bathtub curve** shows failure rate against age: a falling rate early in life (infant mortality, from manufacturing defects, reduced by burn-in), a roughly constant rate in useful life (random failures), and a rising rate at wear-out (fatigue, corrosion, wear). The exponential model applies only to the flat middle section; the **Weibull distribution**, with shape parameter β below, equal to or above 1, covers all three.
X: An electronic unit has λ = 2 × 10^{-5} per hour. What is its reliability over a year of continuous use?
> λt = 2 × 10^{-5} × 8760 = 0.175; R = e^{−0.175} = 0.84
H: Systems
E: R_{series} = R_{1}R_{2}…R_{n} :: every component must work
E: R_{parallel} = 1 − (1 − R_{1})(1 − R_{2})…(1 − R_{n}) :: at least one must work
X: Three components each of R = 0.95 in series, then two of R = 0.9 in parallel.
> Series: 0.95^{3} = 0.857: weaker than any single component.
> Parallel: 1 − 0.1^{2} = 0.99: stronger than either.
K: Series systems are weaker than their weakest part; redundancy helps only if the redundant parts fail independently.
!: Assuming redundant parts are independent. A shared power supply, a common software bug, the same maintenance error or one fire can disable both channels at once: these common-cause failures often dominate redundant systems.
EV: established | The exponential reliability model is appropriate only for constant failure rates; wear-out failures need models such as Weibull.
EV: contested | How to quantify common-cause failures (for example by a beta factor) involves engineering judgement, and estimates for a given system can differ widely.
T: Failure rate | The rate at which surviving items fail, λ, in failures per unit time
T: Redundancy | Providing more than one means of performing a function so that one failure does not cause system failure
SUM: Combine probabilities with the multiplication and complement rules; use R = e^{−λt} in useful life; series lowers and parallel raises reliability, unless common causes intervene.
SRC: O'Connor P. D. T. and Kleyner A., Practical Reliability Engineering, 5th edition, Wiley | secondary | 2012
SRC: NIST/SEMATECH, e-Handbook of Statistical Methods, chapter 8 (assessing product reliability) | guidance | 2012 | https://www.itl.nist.gov/div898/handbook/
Q: What is the reliability of a series system? | The product of the component reliabilities.
Q: What are the three regions of the bathtub curve? | Infant mortality (falling failure rate), useful life (constant), wear-out (rising).
M1#engineering-u01-19-q1@1: Two independent alarms each detect a fault with probability 0.9. What is the probability at least one detects it? | 0.99 | 0.81 | 0.9 | 1.8 | P(at least one) = 1 − P(both miss) = 1 − 0.1 × 0.1 = 0.99. 0.81 is the probability both detect it.
M2#engineering-u01-19-q2@2: A component has an MTBF of 50 000 h with a constant failure rate. What is the probability it survives 50 000 h? | 0.37 | 0.5 | 1.0 | 0.63 | R = e^{−t/MTBF} = e^{−1} = 0.37. The MTBF is not a median life: most units fail before it.
NUM2#engineering-u01-19-q3@2: Two pumps in parallel, each with reliability 0.80, feed a single valve with reliability 0.95. What is the system reliability? | 0.912 | 0.001 |  | Pumps: 1 − 0.2^{2} = 0.96; in series with the valve: 0.96 × 0.95 = 0.912.
M3#engineering-u01-19-q4@3: A safety system uses two identical sensors in parallel, both powered from one supply. The sensors each have R = 0.99 and the supply R = 0.98. What limits the system's reliability? | The single supply: the system reliability is at most 0.98, whatever the sensor redundancy | The sensors, since 0.99 × 0.99 = 0.98 | Nothing: parallel sensors give 0.9999 | The number of sensors, which should be increased to three | The sensors in parallel give 0.9999, but they are in series with the shared supply: 0.9999 × 0.98 ≈ 0.98. The common supply is a single point of failure that redundancy can't overcome.
SA3#engineering-u01-19-q5@2,3: Explain why the exponential model R = e^{−λt} would be a poor basis for planning the replacement of bearings in a fleet of machines, and suggest a better approach. | The exponential model assumes a constant failure rate, which implies a used bearing is as good as new and that planned replacement gives no benefit. Bearings fail mainly by wear-out mechanisms (fatigue of rolling surfaces, wear, lubrication breakdown), so their failure rate rises with age. A Weibull model with shape parameter above 1, fitted to field or test life data, captures the rising rate and allows a replacement interval to be chosen that balances the cost of failures against the cost of early replacement; condition monitoring (vibration, temperature) can refine it. | Constant rate implies no ageing ; Bearings wear out ; Weibull with shape above one ; Fit to life data to set replacement interval ; Mentions condition monitoring or cost balance
`;
