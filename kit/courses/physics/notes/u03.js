// Unit 3: Measurement, Experimental Physics and Uncertainty. Format: kit/course/notes.js
export default `
## Measurement instruments and calibration
S: An instrument converts a physical quantity into a reading. Calibration compares its readings with a trusted standard so that the readings mean what they claim, and it links every measurement back to the SI through an unbroken chain (traceability).
H: Choosing an instrument
- **Range**: the span it can measure. **Resolution**: the smallest change it can show.
- **Sensitivity**: output change per input change. **Linearity**: whether output ∝ input across the range.
- **Response time**, **loading** (does it disturb what it measures?) and **drift** (slow change over time).
- Typical resolutions: metre rule 1 mm; vernier caliper 0.02 mm; micrometer 0.01 mm; stopwatch 0.01 s (but human reaction ~0.2 s).
H: Calibration
- Measure known standards across the range; record readings against true values.
- Correct for **zero error** (offset) and **gain error** (wrong slope).
- Recalibrate at intervals and after damage; record the date and standard used.
- Traceability: your thermometer → lab reference → national lab (NPL, NIST) → SI definition.
X: A thermometer reads 1.5 °C in melting ice and 98.0 °C in boiling water at 1 atm. What is the true temperature when it reads 50.0 °C?
> Scale factor = 100/(98.0 − 1.5) = 1.036
> T = (50.0 − 1.5) × 1.036 = 50.3 °C
!: A high-resolution digital display doesn't make an instrument accurate; an uncalibrated 6-digit meter can be wrong in the second digit.
Q: What is traceability? | An unbroken chain of calibrations linking a measurement back to national standards and the SI.
Q: What is a zero error? | A non-zero reading when the true value is zero; it offsets every reading.
M1: Which instrument has the best resolution for a 5 mm wire diameter? | Micrometer screw gauge | Metre rule | Vernier caliper | Tape measure | A micrometer resolves 0.01 mm.
M2: A voltmeter with low internal resistance connected across a high-resistance component will: | Read low, because it draws current and changes the circuit | Read high | Read correctly | Be damaged | Loading: the meter in parallel lowers the effective resistance.

## Accuracy, precision and resolution
S: Accuracy is how close a result is to the true value; precision is how closely repeated results agree; resolution is the smallest change an instrument can register. They are different things, and a good experiment needs all three.
H: The dartboard picture
- Precise and accurate: tight cluster on the bullseye.
- Precise but inaccurate: tight cluster off-centre (a systematic error).
- Accurate but imprecise: wide scatter centred on the bullseye (random error).
- Neither: wide scatter off-centre.
H: How they're improved
- **Precision**: repeat and average; reduce noise; use better instruments.
- **Accuracy**: calibrate; remove systematic errors; compare methods.
- **Resolution**: better instrument, or measure a larger quantity (time 20 swings, measure the thickness of 100 sheets).
E: resolution uncertainty ≈ ± half the smallest division (analogue) or ± 1 in the last digit (digital)
X: How can you find the thickness of one sheet of paper with a ruler?
> Measure a stack of 500 sheets: 50 ± 1 mm
> One sheet: 0.100 ± 0.002 mm, much better than the ruler's 1 mm resolution
!: Precision isn't accuracy. Averaging a thousand readings from a miscalibrated instrument gives a very precise wrong answer.
Q: Define accuracy and precision. | Accuracy: closeness to the true value. Precision: closeness of repeated measurements to each other.
Q: How can you beat an instrument's resolution? | Measure many identical units together (e.g. 20 oscillations, 100 sheets) and divide.
M1: Readings 4.31, 4.32, 4.31, 4.30 V when the true value is 5.00 V are: | Precise but inaccurate | Accurate but imprecise | Accurate and precise | Neither | Small spread, wrong centre.
M2: Which improves accuracy but not precision? | Correcting a calibration error | Taking more readings | Using a finer scale | Reducing electrical noise | Calibration removes systematic offset; it doesn't reduce scatter.

## Random and systematic errors
S: Random errors scatter readings unpredictably either side of the true value; systematic errors shift all readings the same way. They need different remedies, and identifying which you have is half of good experimental practice.
H: Random errors
- Causes: reading judgement, reaction time, electrical noise, fluctuating conditions.
- Show up as scatter; reduced by repeating and averaging (∝ 1/√n).
- Estimated statistically from the spread of repeats.
H: Systematic errors
- Causes: zero error, calibration error, parallax at a fixed angle, heat loss in calorimetry, a meter loading the circuit, a wrong assumption in the method.
- Don't show up as scatter; averaging doesn't help.
- Found by calibration, changing the method or apparatus, or by a graph that misses the origin when theory says it shouldn't.
X: A plot of extension against load for a spring gives a straight line that crosses the extension axis at 3 mm. What does this suggest?
> Hooke's law predicts a line through the origin
> A constant 3 mm offset is a systematic (zero) error, perhaps from measuring length from the wrong point
> The gradient (stiffness) is unaffected
!: Taking more repeats only reduces random error. If your result disagrees with an accepted value by many standard errors, look for a systematic error.
Q: How can a graph reveal a systematic error? | A straight line that should pass through the origin has a non-zero intercept.
Q: Why doesn't averaging remove systematic error? | Every reading is shifted the same way, so the mean is shifted too.
M1: Parallax from always reading a scale from above is: | Systematic | Random | A resolution limit | Not an error | A consistent viewing angle shifts all readings the same way.
M2: Reaction time when hand-timing a pendulum causes mostly: | Random error (plus some systematic delay) | Only systematic error | No error over many swings | A zero error | Reaction times vary, scattering readings; timing many swings reduces their effect.

## Measurement uncertainty
S: Uncertainty is the range within which the true value is expected to lie, at a stated confidence. The international Guide to the Expression of Uncertainty in Measurement (GUM) gives a standard way to estimate and combine it.
H: Type A and Type B
- **Type A**: evaluated statistically from repeated readings (standard error of the mean).
- **Type B**: evaluated by other means: resolution, calibration certificates, manufacturer specs, judgement.
- Both are expressed as standard uncertainties u and combined in quadrature.
E: u_{c} = √(u_{A}^{2} + u_{B1}^{2} + u_{B2}^{2} + …) :: combined standard uncertainty
E: U = k u_{c}, k = 2 for ~95% confidence :: expanded uncertainty
E: u = a/√3 :: rectangular distribution of half-width a (e.g. a digital display's ±a)
H: Reporting
P: Give the value, its uncertainty, the unit and the coverage: "L = 25.43 ± 0.06 mm (k = 2)". Uncertainty to 1 or 2 significant figures; the value to the same decimal place.
X: A digital caliper reads 25.43 mm (resolution 0.01 mm). Five repeats have standard error 0.02 mm. Find u_{c}.
> Resolution: a = 0.005 mm, u_{B} = 0.005/√3 = 0.003 mm
> u_{c} = √(0.02^{2} + 0.003^{2}) ≈ 0.020 mm; U (k = 2) = 0.04 mm
!: "Error" is the (unknown) difference from the true value; "uncertainty" is your estimate of how big it could be. They aren't the same thing.
Q: What is the difference between Type A and Type B uncertainty? | Type A comes from statistics of repeated readings; Type B from other information like resolution or calibration certificates.
Q: What does k = 2 mean in an expanded uncertainty? | About 95% coverage for a normal distribution.
M1: How should a result be reported? | Value ± uncertainty with units | Value only | Uncertainty only | Value to as many digits as the calculator gives | Both value and uncertainty are needed.
M2: A scale has ±0.5 mm reading limits treated as rectangular. What is the standard uncertainty? | 0.29 mm | 0.5 mm | 0.25 mm | 1.0 mm | 0.5/√3 ≈ 0.29 mm.

## Absolute and relative uncertainty
S: Absolute uncertainty has the units of the quantity (± 0.2 cm); relative (fractional or percentage) uncertainty is the absolute uncertainty divided by the value. Absolute uncertainties add for sums; relative ones for products.
H: Definitions
E: relative uncertainty = Δx/x; percentage = 100 Δx/x
- 5.0 ± 0.1 cm: absolute 0.1 cm, relative 0.02, percentage 2%.
- Relative uncertainty is dimensionless, so it compares precision across different quantities.
H: Which to use
- Adding or subtracting: combine absolute uncertainties.
- Multiplying, dividing or powers: combine relative uncertainties.
- Subtracting nearly equal numbers inflates the relative uncertainty enormously.
X: Two lengths, 50.0 ± 0.2 cm and 48.0 ± 0.2 cm, are subtracted.
> Difference = 2.0 cm; absolute uncertainty √(0.2^{2} + 0.2^{2}) = 0.3 cm
> Relative uncertainty jumps from 0.4% to 14%
!: Never quote a percentage uncertainty on a quantity that can be near zero (like a temperature in °C): the percentage is meaningless.
Q: Which uncertainties combine for a quotient? | Relative (fractional) uncertainties.
Q: Why is subtracting nearly equal quantities risky? | The absolute uncertainty stays similar while the result becomes small, so the relative uncertainty becomes large.
M1: What is the percentage uncertainty of 8.0 ± 0.4 s? | 5% | 0.4% | 2% | 50% | 0.4/8.0 = 0.05.
M2: A cube's side is 2.00 ± 0.02 cm. What is the percentage uncertainty in its volume? | 3% | 1% | 6% | 0.3% | Power 3 multiplies the 1% relative uncertainty by 3.

## Significant figures in experimental results
S: In experimental work significant figures follow the uncertainty, not the calculator. The uncertainty is quoted to one or two significant figures, and the result is rounded to the same decimal place.
H: The rules
- Round the uncertainty to 1 s.f. (or 2 if its first digit is 1 or 2).
- Round the value to match: 9.8165 ± 0.0234 → 9.82 ± 0.02.
- Use scientific notation with the same power for both: (6.67 ± 0.05) × 10^{-11}.
- In tables, record raw data to the instrument's resolution and keep it consistent down a column.
H: When there's no stated uncertainty
- Treat the last quoted digit as uncertain.
- In multi-step calculations keep at least one or two extra digits (guard digits) until the end.
X: A calculation gives a = 2.34567 m s^{-2} with uncertainty 0.1543 m s^{-2}.
> Uncertainty starts with 1, so keep two figures: 0.15
> a = 2.35 ± 0.15 m s^{-2}
!: Writing 2.34567 ± 0.2 claims precision you don't have: the trailing digits are noise.
Q: How many significant figures should an uncertainty usually have? | One (or two if its first digit is 1 or 2).
Q: How do you choose the decimal places of the value? | Match the last decimal place of the rounded uncertainty.
M1: A result is 127.452 ± 3.8. How should it be written? | 127 ± 4 | 127.45 ± 3.8 | 130 ± 3.8 | 127.452 ± 4 | Round uncertainty to 4 and value to the units digit.
M2: In a results table, length readings should be recorded: | To the instrument's resolution, consistently | To 2 decimal places always | To as many digits as possible | Rounded to whole numbers | Consistency and honesty about resolution matter.

## Propagation of uncertainty
S: When a result is calculated from measured quantities, their uncertainties propagate into the result. For independent errors you add contributions in quadrature using partial derivatives; simpler worst-case rules give upper bounds.
H: The general rule
E: σ_{f}^{2} = Σ (∂f/∂x_{i})^{2} σ_{i}^{2} :: independent variables
H: Common cases
E: f = a ± b: σ_{f} = √(σ_{a}^{2} + σ_{b}^{2})
E: f = ab or a/b: σ_{f}/f = √[(σ_{a}/a)^{2} + (σ_{b}/b)^{2}]
E: f = a^{n}: σ_{f}/f = |n|σ_{a}/a
E: f = ln a: σ_{f} = σ_{a}/a; f = e^{a}: σ_{f} = f σ_{a}
- At A level, the worst-case (linear) sum is often used: add absolute or percentage uncertainties directly.
- Find the dominant source: the largest term in the sum. Improving anything else is wasted effort.
X: Density from m = 125.0 ± 0.5 g and a sphere's diameter d = 3.10 ± 0.02 cm.
> ρ = m/(πd^{3}/6) = 8.01 g cm^{-3}
> Relative: m 0.4%, d^{3}: 3 × 0.65% = 1.9%
> σ_{ρ}/ρ = √(0.4^{2} + 1.9^{2}) = 2.0%: ρ = 8.0 ± 0.2 g cm^{-3}. The diameter dominates.
!: Quadrature addition assumes independent errors. If two inputs share a systematic error (same instrument), they're correlated and need a covariance term.
Q: What is the uncertainty rule for f = a^{n}? | The relative uncertainty is multiplied by |n|.
Q: Why identify the dominant uncertainty? | Improving the largest contribution is the only effective way to reduce the total.
M1: Which variable dominates the uncertainty in g = 4π^{2}l/T^{2} if l has 0.2% and T has 0.5%? | T, contributing 1.0% | l | Both equally | π | T is squared, so its 0.5% doubles.
M2: What is the uncertainty in ln(x) for x = 20 ± 1? | 0.05 | 1 | 0.5 | 3.0 | σ = σ_{x}/x = 1/20.

## Error bars and confidence intervals
S: Error bars show the uncertainty of each data point on a graph; confidence intervals state the range within which a parameter lies with a given probability. Both let readers judge whether results agree.
H: Error bars
- Usually ±1 standard uncertainty (68%); say so in the caption, since some fields use 2σ or 95%.
- Draw them vertically (y) and horizontally (x) where significant.
- Use them to draw lines of best and worst fit: the steepest and shallowest lines through all bars give the gradient's uncertainty.
E: Δm ≈ (m_{max} − m_{min})/2 :: gradient uncertainty from worst lines
H: Confidence intervals
E: x̄ ± t σ_{x̄} :: t ≈ 1.96 for 95% with many readings; larger t for small samples (Student's t)
- A 95% confidence interval means: if the experiment were repeated many times, 95% of intervals would contain the true value.
- Two results agree if the difference is within about 2 combined σ; overlapping 1σ bars are a rough sign.
X: Five readings have mean 12.40 and standard error 0.05. Give a 95% CI.
> With n = 5, t (4 degrees of freedom) = 2.78
> 12.40 ± 0.14
!: A 95% CI does not mean a 95% probability that this particular interval contains the true value in the frequentist sense; it's a statement about the procedure.
Q: How do worst-fit lines give a gradient uncertainty? | Draw the steepest and shallowest lines consistent with the error bars; half their difference estimates Δm.
Q: Why use Student's t for small samples? | The standard deviation is itself uncertain when n is small, widening the interval.
M1: Error bars on a graph usually represent: | The uncertainty in each data point | The range of the axes | The best-fit line | The number of repeats | They show each point's uncertainty (state the convention).
M2: Two results are 9.78 ± 0.02 and 9.84 ± 0.02. Are they consistent? | Only marginally: they differ by about 2.1 combined standard uncertainties | Yes, comfortably within 1σ | They are identical | Agreement can't be judged without more data | The difference is 0.06 and the combined σ is √(0.02^{2} + 0.02^{2}) = 0.028, so 0.06/0.028 ≈ 2.1σ.

## Repeatability and reproducibility
S: Repeatability is agreement between results under the same conditions (same person, apparatus, lab, short time); reproducibility is agreement under changed conditions (different people, methods, labs). Reproducibility is the stronger test of a result.
H: Repeatability
- Measured by repeated trials in one session.
- Spread estimates random error.
- Good repeatability doesn't guarantee correctness: the same systematic error repeats.
H: Reproducibility
- Requires a full, clear method so others can repeat it.
- Inter-laboratory comparisons find hidden systematic errors.
- The "reproducibility crisis" in some sciences comes from small samples, flexible analysis and publication bias.
X: Measurements of G in different labs disagree by more than their stated uncertainties.
> Each lab is repeatable to ~10 ppm
> Labs disagree by ~500 ppm: unidentified systematic errors
> This is why G remains the least well-known constant
!: Don't report repeatability as if it were the total uncertainty of your result.
Q: What is reproducibility? | Agreement of results obtained under changed conditions: different people, equipment, methods or labs.
Q: Why is reproducibility a stronger test than repeatability? | Changing conditions exposes systematic errors that repeat identically in one setup.
M1: Repeating a measurement 10 times in one session tests: | Repeatability | Reproducibility | Accuracy | Calibration | Same conditions, same session.
M2: Independent labs getting different G values beyond their errors indicates: | Unrecognised systematic errors | G varies with location | Random errors only | The SI is inconsistent | Reproducibility failures point to systematics.

## Experimental controls
S: A control removes alternative explanations for a result. Controlled variables are held fixed, control experiments run without the factor being tested, and blank measurements remove backgrounds.
H: Kinds of control
- **Controlled variables**: everything except the independent variable kept constant (temperature, wire length).
- **Control run / null measurement**: same setup without the cause (no sample, source removed) to measure background.
- **Blind and double-blind**: analysts don't know which data are which, to stop bias (used in particle physics: "blind analysis").
- **Randomisation**: vary order of measurements so slow drifts don't line up with the variable.
X: Measuring the count rate from a radioactive source.
> Measure background with the source removed: 24 counts per minute
> With source: 350 counts per minute
> Corrected rate = 326 counts per minute
H: Blind analysis
P: Many large experiments hide the final result (add a secret offset, or mask the signal region) until all cuts and corrections are fixed. This stops analysts unconsciously tuning the analysis towards an expected answer.
!: Measuring in increasing order of the variable can confound it with drift (warming up, battery running down); randomise or go up and back down.
Q: What is a blind analysis? | An analysis where the result is hidden until the method is fixed, so expectations can't bias it.
Q: Why measure background count before using a radioactive source? | To subtract it from the source count rate.
M1: In measuring how wire resistance varies with length, a controlled variable is: | Temperature of the wire | Length | Resistance | The current reading | Temperature affects resistance, so it must be fixed.
M2: Why randomise the order of measurements? | So slow drifts don't correlate with the independent variable | To make data look random | To reduce resolution error | It is required by SI | Randomising breaks the link between drift and the variable.

## Independent, dependent and controlled variables
S: In an experiment you change the independent variable, measure the dependent variable, and keep the controlled variables constant. Clear variables make a fair test whose result can be attributed to one cause.
H: Definitions
- **Independent**: chosen and changed by the experimenter (plotted on the x-axis).
- **Dependent**: measured as a response (y-axis).
- **Controlled**: held constant because they could affect the dependent variable.
- **Confounding variable**: an uncontrolled factor that varies with the independent variable and could explain the result.
H: Choosing ranges
- At least 5–6 values across as wide a range as practical; more points where the graph curves.
- Repeat each value to estimate scatter.
- Include values close to zero if theory predicts the origin.
X: Investigating how the period of a mass–spring system depends on mass.
> Independent: mass (100–600 g in 100 g steps)
> Dependent: period (time 10 oscillations, three repeats)
> Controlled: the same spring, amplitude, and vertical alignment
!: Correlation isn't causation. Without controlling confounders, a link between two variables doesn't show one causes the other.
Q: Which variable goes on the x-axis? | The independent variable.
Q: What is a confounding variable? | An uncontrolled factor that changes along with the independent variable and could cause the observed effect.
M1: In a light-intensity vs distance experiment, distance is: | Independent | Dependent | Controlled | Confounding | It's set by the experimenter.
M2: Why take more readings where a graph curves? | To define the shape accurately where it changes most | To make the graph look smoother | To reduce systematic error | It's a convention without purpose | Curvature needs more points to be resolved.

## Experimental design
S: Experimental design plans what to measure, how, and how many times so that the result answers the question with the smallest uncertainty for the effort. Good design is decided before taking data.
H: The design process
- State the question and the model being tested (e.g. T ∝ √l).
- Identify variables, ranges and the measurement method for each.
- Estimate uncertainties in advance and find the dominant one.
- Choose a linearised plot to test the model (T^{2} against l).
- Plan controls, repeats, calibration and safety.
- Pilot run: check the method works, then refine.
H: Efficient design
- Spend effort on the dominant uncertainty.
- Use differential or null methods (balance bridges, comparison) to cancel systematics.
- Measure many cycles or large quantities to beat resolution.
- In multi-factor problems, factorial designs vary several factors systematically instead of one at a time.
X: Design an experiment to measure g with a pendulum to 0.5%.
> T = 2π√(l/g): σ_{g}/g = √[(σ_{l}/l)^{2} + (2σ_{T}/T)^{2}]
> With l = 1.000 ± 0.002 m (0.2%), need σ_{T}/T ≲ 0.2%
> Hand timing (0.2 s): time 50 swings (~100 s) to get 0.2%
!: Don't decide what to measure after looking at the data (p-hacking, "garden of forking paths"): plan the analysis in advance.
Q: Why estimate uncertainties before doing an experiment? | To find the dominant source and plan where effort will reduce the final uncertainty.
Q: What is a null method? | A method that adjusts a known quantity until a detector reads zero, cancelling many systematic errors (like a Wheatstone bridge).
M1: To test T = 2π√(l/g) with a straight-line graph, plot: | T^{2} against l | T against l | T against l^{2} | ln T against l | T^{2} = (4π^{2}/g)l is linear through the origin.
M2: What is the main purpose of a pilot run? | To test and refine the method before collecting final data | To obtain the final result quickly | To calibrate the SI | To replace repeats | It catches practical problems early.

## Calibration curves
S: A calibration curve maps an instrument's raw output to the true quantity using measurements of known standards. You then read unknowns off the curve, ideally by interpolation inside the calibrated range.
H: Building one
- Measure several standards spanning the range of interest (at least 5, more if non-linear).
- Plot output (y) against known value (x); fit a line or smooth curve.
- Invert to find the unknown: x = (y − c)/m for a line.
- Report the calibration's uncertainty, which adds to the measurement uncertainty.
H: Examples
- Thermistor resistance → temperature.
- Spectrometer absorbance → concentration (Beer–Lambert).
- Photodiode current → light power; strain gauge voltage → force.
X: A thermistor's calibration gives 2.50 kΩ at 20.0 °C and 2.00 kΩ at 25.0 °C. It now reads 2.20 kΩ. Estimate the temperature.
> Over this small range, interpolate linearly: the slope is −0.10 kΩ per °C
> T = 20.0 + (2.50 − 2.20)/0.10 = 23.0 °C
> Over wider ranges, fit the proper curve (ln R against 1/T is close to linear for a thermistor)
!: Extrapolating a calibration curve beyond the measured standards is risky: many sensors become non-linear outside their calibrated range.
Q: What is a calibration curve? | A graph of instrument response against known standard values, used to convert readings to true values.
Q: Why avoid extrapolating calibration curves? | The response may be non-linear outside the calibrated range.
M1: A sensor gives y = 2.0x + 0.5 from calibration. A reading y = 6.5 corresponds to: | x = 3.0 | x = 13.5 | x = 3.5 | x = 2.5 | x = (6.5 − 0.5)/2.0.
M2: The uncertainty of a value read from a calibration curve includes: | Both the measurement and the calibration fit uncertainties | Only the measurement | Only the standards | Neither | Both contribute.

## Linearisation of experimental relationships
S: Straight lines are easy to test and fit. Linearisation transforms a suspected relationship into the form y = mx + c, so a straight-line graph confirms the model and the gradient and intercept give its constants.
H: Standard transforms
E: y = kx^{n}: plot log y against log x; gradient n, intercept log k
E: y = Ae^{kx}: plot ln y against x; gradient k, intercept ln A
E: T = 2π√(l/g): plot T^{2} against l; gradient 4π^{2}/g
E: 1/f = 1/u + 1/v: plot 1/v against 1/u; intercept 1/f
E: I = I_{0}e^{−μx}: plot ln I against x; gradient −μ
H: Why linearise
- The eye spots deviations from a line easily (curvature reveals a wrong model).
- Least-squares line fitting is simple and gives uncertainties in m and c.
- The intercept tests for systematic errors (should a line pass through the origin?).
X: Data for the energy E stored vs voltage V on a capacitor are thought to follow E = ½CV^{2}.
> Plot E against V^{2}: a straight line through the origin
> Gradient = C/2, so C = 2 × gradient
!: Transforming data also transforms its uncertainties: error bars on ln y are σ_{y}/y, not σ_{y}.
Q: What graph tests y = kx^{n} and finds n? | log y against log x; the gradient is n.
Q: What are the error bars on ln y? | σ_{y}/y (the fractional uncertainty of y).
M1: To find the decay constant from A = A_{0}e^{−λt}, plot: | ln A against t | A against t | A against ln t | 1/A against t | Gradient = −λ.
M2: A log-log plot of power against frequency has gradient 3. The relationship is: | P ∝ f^{3} | P ∝ e^{3f} | P ∝ 3f | P ∝ ln f^{3} | The gradient of a log-log plot is the exponent.

## Least-squares fitting
S: Least squares finds the line (or curve) that minimises the sum of squared vertical distances between data and model. It's the standard, statistically justified way to fit data, and it gives uncertainties in the fitted parameters.
H: Straight line y = mx + c
E: minimise S = Σ (y_{i} − mx_{i} − c)^{2}
E: m = [nΣxy − ΣxΣy]/[nΣx^{2} − (Σx)^{2}]; c = ȳ − m x̄
- The best-fit line passes through the centroid (x̄, ȳ).
- With different uncertainties σ_{i}, weight each point by 1/σ_{i}^{2} (minimise χ^{2}).
H: Assumptions
- Uncertainty is mainly in y, and errors are independent and normally distributed.
- If x also has uncertainty, use orthogonal or "effective variance" methods.
- Least squares is sensitive to outliers; robust methods down-weight them.
X: Fit y = mx to points (1, 2.1), (2, 3.9), (3, 6.2) through the origin.
> For a line through the origin, m = Σxy/Σx^{2}
> Σxy = 2.1 + 7.8 + 18.6 = 28.5; Σx^{2} = 14; m = 2.04
P: Why squares? If errors are Gaussian, minimising χ^{2} gives the maximum-likelihood parameters.
!: A fit always gives numbers, even for the wrong model. Check residuals and χ^{2} before trusting the parameters.
Q: What point does a least-squares line always pass through? | The centroid (x̄, ȳ).
Q: Why weight points by 1/σ^{2}? | More precise points should have more influence on the fit.
M1: Least squares minimises: | The sum of squared vertical residuals | The sum of residuals | The largest residual | The sum of horizontal distances | Squares avoid cancellation and match Gaussian likelihood.
M2: Least squares with Gaussian errors gives parameters that are: | Maximum-likelihood estimates | Always exact | Biased by design | Only valid for lines | Minimising χ^{2} maximises the Gaussian likelihood.

## Regression analysis
S: Regression models how a dependent variable depends on one or more predictors, estimates the model's parameters, and quantifies how well it fits. In physics it's how theory meets data quantitatively.
H: Measures of fit
E: R^{2} = 1 − SS_{res}/SS_{tot} :: fraction of variance explained
E: χ^{2}_{ν} = χ^{2}/(N − p) :: reduced chi-squared, ≈ 1 for a good fit with correct errors
- Parameter uncertainties come from the covariance matrix of the fit.
- Correlated parameters (like slope and intercept) need their covariance when propagating.
H: Types
- Linear regression (linear in parameters, even if the function of x isn't, e.g. y = a + bx + cx^{2}).
- Non-linear regression: iterative fitting (Levenberg–Marquardt) for y = A e^{−kt} + B.
- Multiple regression: several predictors.
- Model selection: compare models with Δχ^{2}, F-tests, or information criteria (AIC, BIC) that penalise extra parameters.
X: A quadratic fit improves χ^{2} from 25 to 22 with one extra parameter and 20 data points. Is the extra term justified?
> Δχ^{2} = 3 for one extra parameter
> Rough rule: Δχ^{2} > ~4 (2σ) needed; here it isn't clearly justified
!: R^{2} close to 1 doesn't prove a model right; a straight line can have R^{2} = 0.99 through data that are clearly curved.
Q: What is reduced χ^{2}, and what value indicates a good fit? | χ^{2} divided by degrees of freedom; about 1.
Q: Why do information criteria penalise extra parameters? | To avoid overfitting: more parameters always reduce χ^{2}.
M1: A fit has χ^{2}_{ν} = 0.1. This suggests: | Uncertainties are overestimated | An excellent model with correct errors | The model is wrong | Too few parameters | Residuals are much smaller than the claimed errors.
M2: y = a + bx + cx^{2} is a ___ regression problem. | Linear (linear in a, b, c) | Non-linear | Logistic | Impossible | Linear refers to the parameters.

## Residual analysis
S: Residuals are the differences between data and the fitted model. Plotting them reveals what summary statistics hide: the wrong model, outliers, changing uncertainties or drifts.
H: What to look for
- **Random scatter about zero** with constant spread: a good fit.
- **A curve or trend**: the model has the wrong shape (e.g. fitting a line to quadratic data).
- **Funnel shape**: uncertainty changes with x (needs weighting).
- **Isolated large residuals**: outliers; investigate before removing.
- **Runs or patterns in time order**: drift or correlated errors.
E: r_{i} = y_{i} − f(x_{i}); normalised residual r_{i}/σ_{i}
P: About 68% of normalised residuals should lie within ±1 and 95% within ±2 if the model and errors are right.
X: Residuals from a linear fit to a cooling curve are positive at both ends and negative in the middle.
> A systematic U shape means the data curve (exponential cooling)
> Fit the right model: T = T_{room} + ΔT e^{−kt}
!: Don't delete outliers just because they're inconvenient. Have a physical reason (a recorded mistake) or use a pre-agreed rule, and report it.
Q: What does a curved residual pattern mean? | The fitted model has the wrong functional form.
Q: What fraction of normalised residuals should lie within ±2? | About 95%.
M1: Residuals that widen as x increases indicate: | Uncertainty growing with x | A perfect fit | A zero error | Too many points | Heteroscedastic errors: weight the fit.
M2: A single residual of 6σ appears. The best response is: | Check the record for a mistake before deciding | Delete it immediately | Ignore it | Refit with a higher-order polynomial | Investigate; remove only with justification.

## Hypothesis testing
S: Hypothesis testing asks whether data are consistent with a null hypothesis (no effect, or the standard model). If data this extreme would be very unlikely under the null, you reject it in favour of the alternative.
H: The procedure
- State the null hypothesis H_{0} (e.g. no new particle) and alternative H_{1}.
- Choose a test statistic (χ^{2}, a z-score, a likelihood ratio) and a significance level α (e.g. 0.05 or 5σ).
- Compute the p-value: the probability, if H_{0} is true, of data at least as extreme.
- Reject H_{0} if p < α.
E: z = (x̄ − μ_{0})/σ_{x̄} :: how many standard errors from the null value
H: Errors
- **Type I**: rejecting a true H_{0} (false positive), probability α.
- **Type II**: failing to reject a false H_{0} (false negative), probability β; power = 1 − β.
- Larger samples increase power.
X: A measured g = 9.70 ± 0.04 m s^{-2}. Is it consistent with 9.81?
> z = (9.81 − 9.70)/0.04 = 2.75
> p ≈ 0.006 (two-sided): inconsistent at 5%; look for a systematic error
!: The p-value is not the probability that H_{0} is true. It's the probability of the data (or more extreme) given H_{0}.
Q: What is a p-value? | The probability, if the null hypothesis is true, of getting data at least as extreme as observed.
Q: What is a Type I error? | Rejecting a null hypothesis that is actually true (a false positive).
M1: Increasing the sample size mainly increases: | The power of the test | α | The p-value always | Systematic error | More data reduce the standard error, making real effects easier to detect.
M2: p = 0.03 means: | Data this extreme would occur 3% of the time if H_{0} were true | H_{0} is 3% likely | H_{1} is 97% likely | The effect is 3% in size | It's a statement about data given H_{0}.

## Statistical significance
S: A result is statistically significant when chance alone is an unlikely explanation. Physics quantifies this in standard deviations ("sigma"), with 5σ the conventional threshold for claiming a discovery.
H: Sigma levels
- 1σ: p ≈ 0.32 (two-sided); 2σ: 0.046; 3σ: 0.0027 ("evidence"); 5σ: 5.7 × 10^{-7} (one-sided 2.9 × 10^{-7}, "discovery").
- Particle physics uses 5σ because of the look-elsewhere effect and past false alarms at 3–4σ.
H: Look-elsewhere effect
P: If you search for a bump at many masses, a 3σ fluctuation somewhere is likely. The local significance must be corrected to a global one that accounts for all the places you looked.
H: Significance vs importance
- A tiny, unimportant effect can be highly significant with enough data.
- A large effect can be non-significant with too little data.
- Always report the effect size and its uncertainty, not just p.
X: The Higgs boson announcement (2012).
> ATLAS and CMS each saw an excess near 125 GeV at about 5σ
> Two independent experiments, the same mass: a discovery, later confirmed with much more data
!: The 2016 "750 GeV diphoton" excess reached ~3–4σ locally and vanished with more data, a reminder of why 5σ is required.
Q: What significance is required for a discovery in particle physics? | 5σ.
Q: What is the look-elsewhere effect? | Searching many places raises the chance of a large fluctuation somewhere, so local significance must be corrected.
M1: Roughly what is the two-sided p-value for 2σ? | 0.05 | 0.32 | 0.003 | 0.5 | About 4.6%.
M2: A very large dataset finds a statistically significant but tiny effect. This means: | It's probably real but may not matter practically | It must be important | It must be an error | p-values don't apply | Significance and importance differ.

## Instrument response and sensitivity
S: An instrument's response describes how its output follows its input: how much (sensitivity), how linearly, how fast (time response) and over which frequencies (bandwidth). Knowing it lets you correct readings and pick the right instrument.
H: Static characteristics
- **Sensitivity** S = Δoutput/Δinput (e.g. 10 mV per °C).
- **Linearity**, **hysteresis** (different readings going up and down), **offset** and **drift**.
- **Dynamic range**: ratio of largest to smallest measurable signal.
H: Dynamic response
E: y(t) = y_{∞}(1 − e^{−t/τ}) :: first-order sensor (thermometer) after a step change
E: f_{−3dB} = 1/(2πτ) :: bandwidth of a first-order system
- Second-order instruments (galvanometers, accelerometers) can ring; damping is chosen near critical.
- A sensor slower than the signal smooths it out and lags behind it.
X: A thermocouple has τ = 0.5 s. How long until it reads within 1% of a sudden new temperature?
> e^{−t/τ} = 0.01 ⇒ t = τ ln 100 = 4.6τ
> t ≈ 2.3 s
!: High sensitivity often comes with a smaller range and more noise; the most sensitive instrument isn't always the best choice.
Q: What is the time constant of a first-order sensor? | The time to reach 63% of a step change.
Q: What is hysteresis in an instrument? | Different outputs for the same input depending on whether the input is rising or falling.
M1: A sensor gives 2.0 V at 0 °C and 3.0 V at 100 °C. Its sensitivity is: | 10 mV per °C | 1 V per °C | 100 mV per °C | 30 mV per °C | 1.0 V / 100 °C.
M2: A first-order sensor's bandwidth is set by: | Its time constant, f = 1/(2πτ) | Its resolution | Its range | Its calibration | Faster response means higher bandwidth.

## Detection limits
S: The detection limit is the smallest signal an instrument or method can reliably distinguish from noise and background. Below it, a measured "signal" could just be a fluctuation.
H: Defining it
E: L_{D} ≈ 3σ_{blank} :: a common definition: three times the standard deviation of blank measurements
E: L_{Q} ≈ 10σ_{blank} :: limit of quantification: where a value can be stated with useful precision
- For counting experiments with background B, a source is detected if counts exceed B by about 3√B (more carefully, with the Currie formulas).
H: Improving it
- Reduce noise (cooling, shielding, filtering, averaging).
- Reduce or measure background accurately.
- Increase signal (longer counting, larger detector, stronger excitation).
- Use modulation and lock-in detection to escape 1/f noise.
X: A detector's background is 400 counts in 10 min. What is the minimum detectable source count?
> σ_{B} = √400 = 20
> Detection needs ~3σ = 60 extra counts in 10 min
!: Report results below the detection limit as upper limits ("< 60 counts at 95% confidence"), not as zero or as a measured value.
Q: What is a common definition of detection limit? | About three times the standard deviation of the blank or background.
Q: How should you report a non-detection? | As an upper limit at a stated confidence level.
M1: Doubling the counting time with a steady background improves the detection limit on rate by about: | √2 | 2 | 4 | Not at all | Counts ∝ t, noise ∝ √t: rate limit ∝ 1/√t.
M2: The limit of quantification is higher than the limit of detection because: | Quantifying needs a signal measurable with reasonable relative precision | Detection is impossible | They're equal by definition | It includes systematic errors only | You can tell something is there before you can say how much.

## Signal-to-noise ratio
S: The signal-to-noise ratio (SNR) compares the strength of a wanted signal with the random fluctuations hiding it. Most experimental technique comes down to raising the SNR.
H: Definitions
E: SNR = P_{signal}/P_{noise} = (A_{signal}/A_{noise})^{2}; in decibels 10 log_{10}(P_{s}/P_{n})
H: Sources of noise
- **Thermal (Johnson) noise**: V_{rms} = √(4k_{B}TRΔf) in any resistor.
- **Shot noise**: from discrete charges or photons; relative noise 1/√N.
- **1/f (flicker) noise**: grows at low frequency; drifts.
- **Interference**: mains hum at 50/60 Hz, radio pickup, vibrations.
H: Improving SNR
- Average N repeats: SNR improves by √N (for random noise).
- Reduce bandwidth Δf to just what the signal needs (filtering).
- Cool detectors; shield and ground properly; use twisted pairs and differential inputs.
- Modulate the signal to a quiet frequency and use lock-in detection.
X: Find the thermal noise of a 1 MΩ resistor at 300 K over 10 kHz.
> V_{rms} = √(4 × 1.38 × 10^{-23} × 300 × 10^{6} × 10^{4})
> ≈ 13 μV
!: Averaging doesn't help with interference or drift that's correlated between repeats; those must be removed at source.
Q: By what factor does averaging N repeats improve SNR (amplitude)? | √N.
Q: What is Johnson noise? | Thermal voltage noise in any resistor, V_{rms} = √(4k_{B}TRΔf).
M1: An SNR of 100 in power is how many decibels? | 20 dB | 100 dB | 10 dB | 40 dB | 10 log_{10} 100.
M2: Narrowing the measurement bandwidth reduces: | White noise power, ∝ Δf | The signal | Systematic errors | 1/f noise only | White noise power is proportional to bandwidth.

## Data acquisition systems
S: A data acquisition (DAQ) system converts physical signals into digital numbers a computer can store: sensor, signal conditioning, sampling and analogue-to-digital conversion, then software for logging and analysis.
H: The chain
- **Sensor/transducer** → **conditioning** (amplify, filter, isolate) → **ADC** → **computer**.
- Anti-aliasing filter removes frequencies above half the sampling rate before sampling.
- Timestamps and synchronisation matter for multiple channels.
H: Sampling and resolution
E: f_{s} > 2f_{max} :: Nyquist criterion: sample at least twice the highest frequency
E: LSB = V_{range}/2^{n} :: voltage step of an n-bit ADC
- A 12-bit ADC on a 10 V range has 2.4 mV steps; 16 bits give 0.15 mV.
- Quantisation noise ≈ LSB/√12.
- Use the ADC's full range: amplify small signals first.
X: A 0–5 V, 10-bit ADC measures a 1.2 V sensor output. What is the resolution?
> LSB = 5/1024 = 4.9 mV
> Relative resolution at 1.2 V: 0.4%. Amplifying ×4 to fill the range gives 0.1%.
!: Sampling a signal below the Nyquist rate produces aliases: false low frequencies that no software can remove afterwards.
Q: What is the Nyquist criterion? | Sample at more than twice the highest frequency present.
Q: Why use an anti-aliasing filter? | To remove frequencies above half the sampling rate before they alias.
M1: How many levels does a 12-bit ADC have? | 4096 | 1024 | 12 | 65 536 | 2^{12}.
M2: A 3 kHz tone sampled at 4 kHz appears at: | 1 kHz | 3 kHz | 7 kHz | 2 kHz | It aliases to |4 − 3| = 1 kHz.

## Sensors and transducers
S: A transducer converts energy from one form into another; a sensor is a transducer that produces a measurable signal (usually electrical) from a physical quantity. Choosing the sensing principle sets the range, sensitivity and speed of a measurement.
H: Common sensors
- **Temperature**: thermocouple (Seebeck voltage), thermistor (resistance falls with T for NTC), platinum RTD, infrared pyrometer.
- **Light**: photodiode (current ∝ power), phototransistor, LDR (slow), photomultiplier (single photons), CCD/CMOS.
- **Strain and force**: strain gauge (ΔR/R = G × strain, G ≈ 2), load cell, piezoelectric.
- **Position and motion**: potentiometer, LVDT, optical encoder, accelerometer (MEMS), Hall sensor (magnetic field).
- **Pressure**: piezoresistive diaphragm, capacitive gauge.
H: Bridges and conditioning
P: Small resistance changes are measured in a Wheatstone bridge: balanced, the output is zero, and a change ΔR gives an output ∝ ΔR, while temperature effects on matching gauges cancel.
X: A strain gauge (G = 2.0, R = 120 Ω) sees strain 5 × 10^{-4}. Find ΔR.
> ΔR/R = G × strain = 1.0 × 10^{-3}
> ΔR = 0.12 Ω: tiny, hence the bridge and amplifier
!: Every sensor responds to more than one quantity (a strain gauge also to temperature); design so unwanted sensitivities cancel or are measured.
Q: What does a thermocouple measure, physically? | A voltage generated by a temperature difference between junctions of two different metals (the Seebeck effect).
Q: Why are strain gauges used in Wheatstone bridges? | To measure tiny resistance changes sensitively and cancel temperature effects.
M1: Which sensor measures magnetic field? | Hall probe | Thermistor | LDR | Strain gauge | The Hall voltage is proportional to B.
M2: An NTC thermistor's resistance: | Falls as temperature rises | Rises as temperature rises | Is independent of temperature | Depends only on light | More charge carriers are freed at higher T.

## Oscilloscopes and signal generators
S: An oscilloscope displays voltage against time, so you can see waveforms, measure amplitudes, periods and phase, and catch glitches. A signal generator supplies known test waveforms. Together they are the basic tools of electronic measurement.
H: Using an oscilloscope
- Vertical scale (V/div) and timebase (s/div): read amplitude and period from divisions.
- **Triggering** fixes the waveform on screen by starting each sweep at the same point (level and slope).
- **Coupling**: DC shows everything; AC blocks the DC level; ground shows the zero line.
- **Probes**: ×10 probes reduce loading (10 MΩ, low capacitance) but divide the signal by 10; compensate them with the calibrator square wave.
- Digital scopes: sample rate and bandwidth limit what you see; use cursors and automatic measurements.
H: Measurements
E: f = 1/T; V_{rms} = V_{0}/√2 for a sine
- Phase difference: Δφ = 360° × Δt/T, or from a Lissajous figure in XY mode.
H: Signal generators
- Sine, square, triangle, pulse, sweeps and arbitrary waveforms; set frequency, amplitude, offset.
- Output impedance (often 50 Ω) affects the voltage delivered to low-impedance loads.
X: A sine wave spans 6 divisions peak to peak at 0.5 V/div, and one cycle spans 4 divisions at 2 ms/div.
> V_{pp} = 3.0 V ⇒ V_{0} = 1.5 V, V_{rms} = 1.06 V
> T = 8 ms ⇒ f = 125 Hz
!: A scope's bandwidth must be well above the signal frequency (rule of thumb 5×), or fast edges look rounded and amplitudes read low.
Q: What does triggering do on an oscilloscope? | Starts each sweep at the same point on the waveform so the display is stable.
Q: How do you measure phase difference on a scope? | Δφ = 360° × (time shift)/(period).
M1: A trace has period 5 divisions at 0.1 ms/div. The frequency is: | 2 kHz | 500 Hz | 20 kHz | 200 Hz | T = 0.5 ms.
M2: Why use a ×10 probe? | It loads the circuit less | It amplifies the signal | It removes noise | It increases the timebase | Higher input impedance and lower capacitance disturb the circuit less.

## Lock-in amplifiers
S: A lock-in amplifier extracts a tiny signal buried in noise by modulating it at a known frequency and detecting only what varies at exactly that frequency and phase. It can recover signals thousands of times smaller than the noise.
H: How it works
- Modulate the signal (chop a light beam, modulate a current) at reference frequency f_{r}.
- Multiply the detector output by a reference sine at f_{r} (phase-sensitive detection).
- The product contains a DC term ∝ signal amplitude × cos(phase difference), plus terms at other frequencies.
- A low-pass filter with time constant τ keeps the DC term and rejects everything else; the effective bandwidth is ~1/(4τ).
E: V_{out} ∝ V_{s} cos φ (X); with two references 90° apart, R = √(X^{2} + Y^{2}), φ = arctan(Y/X)
H: Why it helps
- Shifts the measurement away from DC, escaping 1/f noise and drift.
- The tiny bandwidth rejects nearly all white noise.
- Gives amplitude and phase, useful for impedance and time-delay measurements.
X: A 1 nV signal sits in 1 μV of broadband noise (over 100 kHz). Using a 1 Hz bandwidth:
> Noise scales with √bandwidth: 1 μV × √(1/10^{5}) ≈ 3 nV
> Longer τ (0.01 Hz) gives ~0.3 nV: the signal emerges
!: A longer time constant means a slower response; wait about 5τ after any change before reading.
Q: What does a lock-in amplifier detect? | Only the component of a signal at the reference frequency and phase.
Q: Why modulate a signal before lock-in detection? | To move it away from DC where 1/f noise and drift are worst.
M1: Increasing the lock-in time constant: | Reduces noise but slows the response | Increases noise | Speeds up the response | Changes the reference frequency | Narrower bandwidth, slower settling.
M2: X = 3 μV and Y = 4 μV. The signal amplitude is: | 5 μV | 7 μV | 1 μV | 12 μV | R = √(X^{2} + Y^{2}).

## Vacuum systems
S: Many experiments need low pressure: to let particles travel without collisions, to keep surfaces clean, or to insulate thermally. Vacuum technology combines pumps, gauges and clean materials to reach pressures from 10^{2} down to 10^{-11} Pa.
H: Ranges and the mean free path
- Rough (10^{5}–10^{2} Pa), medium (10^{2}–10^{-1} Pa), high (10^{-1}–10^{-5} Pa), ultra-high (< 10^{-5} Pa).
E: λ = k_{B}T/(√2 πd^{2}p) :: mean free path; for air at room temperature λ ≈ 7 mm/(p in Pa)
H: Pumps and gauges
- Pumps: rotary vane or scroll (rough), turbomolecular and diffusion (high vacuum, need a backing pump), ion and cryopumps, getters (UHV).
- Gauges: Pirani (thermal conductivity, rough), capacitance manometer (accurate, rough to medium), ionisation gauges (high vacuum).
H: Practice
- Outgassing from surfaces limits pressure; UHV systems are baked at 150–250 °C.
- Use metal seals (Conflat) for UHV; avoid fingerprints and plastics.
- Leaks are found with helium leak detectors.
X: What is the mean free path at 10^{-4} Pa?
> λ ≈ 7 mm/10^{-4} = 70 m
> Molecules cross a chamber without colliding: "molecular flow"
!: Venting a turbopump at full speed or exposing it to atmosphere can wreck it; follow the venting procedure.
Q: Why is UHV needed for surface science? | At 10^{-4} Pa a surface is covered by a monolayer of gas in about a second; UHV keeps it clean for hours.
Q: What limits the ultimate pressure in a sealed vacuum chamber? | Outgassing from surfaces (and leaks and permeation).
M1: Which pump needs a backing pump? | Turbomolecular | Rotary vane | Scroll | None of these | Turbopumps can't exhaust to atmosphere.
M2: The mean free path is inversely proportional to: | Pressure | Temperature | Chamber size | Pump speed | λ ∝ T/p.

## Cryogenic measurement
S: Cryogenics studies matter at very low temperatures, where superconductivity, superfluidity and quantum effects appear and thermal noise falls. Measuring there demands special coolants, refrigerators and thermometers.
H: Reaching low temperatures
- Liquid nitrogen: 77 K. Liquid helium-4: 4.2 K, pumped to ~1.5 K.
- Helium-3 systems: ~0.3 K. Dilution refrigerators (³He–⁴He mixtures): ~10 mK, used for superconducting qubits.
- Adiabatic demagnetisation: below 1 mK.
- Pulse-tube cryocoolers reach ~3 K without liquid helium.
H: Thermometry
- Silicon diodes and platinum resistors down to tens of K; ruthenium oxide and germanium resistors below 1 K.
- Primary thermometers rely on physics (noise thermometry, Coulomb blockade, ³He melting curve).
H: Practical problems
- Heat leaks: radiation (use shields), conduction along wires (thin, low-conductivity leads, thermal anchoring), and vibration.
- Measurement currents must be tiny to avoid self-heating.
- Materials change: metals contract, insulators become brittle, specific heats fall towards zero.
X: Why do superconducting quantum computers run at ~10 mK?
> Qubit transitions are ~5 GHz: hf ≈ 3.3 × 10^{-24} J
> k_{B}T at 10 mK ≈ 1.4 × 10^{-25} J ≪ hf, so thermal excitation is negligible
!: Liquid nitrogen and helium boil to large gas volumes; in a closed room they can displace oxygen. Use oxygen monitors and ventilation.
Q: What temperature does a dilution refrigerator reach? | About 10 mK.
Q: Why must thermometer currents be small at millikelvin temperatures? | Self-heating would raise the sensor's temperature above that of the sample.
M1: The boiling point of liquid nitrogen is: | 77 K | 4.2 K | 273 K | 20 K | At 1 atm.
M2: Why are heat capacities tiny at very low T? | Few vibrational and electronic modes are excited | Matter becomes massless | Atoms stop moving entirely | Heat flows faster | Debye T^{3} law and electronic ∝ T contributions vanish as T → 0.

## High-voltage and high-current safety
S: Electricity becomes dangerous through current passing through the body, burns, arcs, fire and stored energy. Laboratory safety relies on assessing the risks, designing them out, and following procedures every time.
H: Hazards
- Current through the chest: ~10 mA can prevent letting go; ~50–100 mA AC can cause ventricular fibrillation.
- Body resistance drops from ~100 kΩ (dry skin) to ~1 kΩ (wet or broken skin); I = V/R.
- Capacitors store energy E = ½CV^{2} long after switch-off.
- High currents cause heating and arcing; arcs produce intense UV, molten metal and blast.
- Inductive circuits produce large voltages when interrupted (V = L dI/dt).
H: Controls
- Eliminate or reduce: use the lowest voltage that works; enclose and interlock.
- Isolation, earthing and residual current devices (RCDs trip at ~30 mA imbalance).
- Fuses and breakers sized to protect wiring.
- Discharge and earth capacitors with a shorting stick before touching; lock-out/tag-out of power.
- One hand rule; never work alone on live high-voltage equipment; trained people only.
X: A 100 μF capacitor is charged to 400 V. How much energy does it store?
> E = ½ × 100 × 10^{-6} × 400^{2} = 8 J
> Enough to deliver a dangerous shock and to weld a screwdriver tip
!: "Switched off" isn't "safe": capacitors, batteries and induced voltages can remain. Test before touching.
Q: Why is wet skin more dangerous? | It lowers body resistance, so the same voltage drives a larger current.
Q: What does an RCD detect? | An imbalance between live and neutral currents, indicating leakage (e.g. through a person).
M1: Which hazard remains after unplugging equipment? | Charged capacitors | Mains current | Earth faults | Fuse failure | Capacitors can hold charge.
M2: Approximately what AC current through the chest can cause fibrillation? | 50–100 mA | 1 μA | 1 mA | 10 A only | Tens of milliamps are lethal.

## Laboratory notebooks and reproducibility
S: A lab notebook is the permanent, dated record of what you did, saw and thought. It makes your work reproducible, defends priority and integrity, and saves you when results need rechecking months later.
H: What to record
- Date, aims, apparatus (with serial numbers and settings), diagrams.
- Raw data as taken, with units and uncertainties; never only processed data.
- Calibrations, environmental conditions, problems and changes of plan.
- Analysis steps, file names and software versions for electronic data.
- Thoughts, ideas and conclusions, clearly marked.
H: Good practice
- Bound book or a managed electronic notebook; ink; no erasing: cross out with a single line so the original stays legible.
- Write it at the time, not from memory.
- Someone else should be able to repeat your experiment from it.
- Link to stored data with stable names; back them up.
X: You notice the room temperature rose 3 °C during a resistance measurement.
> Record it, with times
> Later this explains a drift in the data, and you can correct it with the temperature coefficient
!: Rewriting a "neat copy" of results and discarding the original record destroys evidence and can hide mistakes or invite suspicion.
Q: Why should raw data, not just processed results, be recorded? | So the analysis can be checked and redone if a mistake or better method is found.
Q: How should mistakes in a lab notebook be corrected? | Strike through with a single line so the original remains readable, and write the correction.
M1: Which is good notebook practice? | Recording conditions and problems as they happen | Writing up only successful runs | Using pencil for easy corrections | Copying data neatly at the end of the week | Contemporaneous, complete records.
M2: For electronic data, the notebook should record: | File names, locations and software versions | Nothing; files are enough | Only the final graph | The computer's brand | Links make the analysis reproducible.

## Experimental validation of physical models
S: A model is validated when its predictions agree with independent measurements within uncertainties across its claimed range. Validation includes testing assumptions, limiting cases, and predictions the model wasn't tuned to fit.
H: Steps
- State the model, its assumptions and its domain of validity.
- Derive testable predictions with uncertainties (including parameter uncertainties).
- Measure with independently calibrated apparatus; quantify experimental uncertainties.
- Compare quantitatively: residuals, χ^{2}, normalised differences.
- Test outside the fitting data (cross-validation), and at extremes where assumptions may fail.
H: Interpreting disagreement
- Check the experiment for systematic errors first.
- Check the model's assumptions (is friction really negligible?).
- A persistent, reproducible disagreement may be new physics: Mercury's perihelion, the black-body spectrum, the muon g − 2 anomaly.
X: Validating the damped pendulum model x = A e^{−γt} cos ωt.
> Fit γ and ω from one run
> Predict the amplitude after 100 s for a different starting amplitude; measure it
> Agreement within uncertainty supports the model; amplitude-dependent γ would show air drag ∝ v^{2} matters
!: A model that fits the data it was tuned on hasn't been validated; it has to predict data it hasn't seen.
Q: What is cross-validation? | Testing a model on data that weren't used to fit its parameters.
Q: What should you check first when model and experiment disagree? | Systematic errors in the experiment, then the model's assumptions.
M1: Which result best validates a model? | It correctly predicts a new, independent measurement | It fits the data it was tuned on | It has many parameters | It's mathematically elegant | Predictive success on unseen data.
M2: A model works at low speeds but fails at high speeds. This shows: | Its domain of validity is limited | It's useless | The experiment is wrong | Physics is inconsistent | Models are valid within a range of conditions.
`;
