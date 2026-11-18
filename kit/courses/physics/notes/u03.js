// Unit 3: Measurement, Experimental Physics and Uncertainty. Format: kit/course/notes.js
export default `
## Measurement instruments and calibration
S: An instrument converts a physical quantity into a reading. Calibration compares its readings with a trusted standard so that the readings mean what they claim, and it links every measurement back to the SI through an unbroken chain (traceability).
LV: Introductory · Foundation
O: Explain what calibration is and why it makes readings traceable
O: Identify zero and scale (gain) errors and correct for them
PRE: Uncertainty and measurement limitations
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
> Scale factor = 100/(98.0 − 1.5) = 1.0363
> T = (50.0 − 1.5) × 1.0363 = 50.26 ≈ 50.3 °C
!: A high-resolution digital display doesn't make an instrument accurate; an uncalibrated 6-digit meter can be wrong in the second digit.
Q: What is traceability? | An unbroken chain of calibrations linking a measurement back to national standards and the SI.
Q: What is a zero error? | A non-zero reading when the true value is zero; it offsets every reading.
M1: Which instrument has the best resolution for a 5 mm wire diameter? | Micrometer screw gauge | Metre rule | Vernier caliper | Tape measure | A micrometer resolves 0.01 mm.
M2: A voltmeter with low internal resistance connected across a high-resistance component will: | Read low, because it draws current and changes the circuit | Read high | Read correctly | Be damaged | Loading: the meter in parallel lowers the effective resistance.
T: Calibration | Comparing an instrument's readings with a trusted standard and recording the correction
T: Traceability | An unbroken chain of calibrations linking a measurement to the SI
T: Zero error | A non-zero reading when the true value is zero
SUM: Calibrate against a standard, record the correction and its uncertainty, and recalibrate on a schedule.
SUM: A zero error shifts every reading equally; a scale error grows in proportion to the reading.
SRC: JCGM 200, International vocabulary of metrology (VIM), 3rd edition | standard | 2012 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, Oxford University Press | secondary | 2010
EV: established | Traceable calibration is the international basis of measurement (VIM, ISO/IEC 17025).
Q: What is traceability? | An unbroken chain of calibrations, each with a stated uncertainty, linking a measurement back to the SI.
M3@2: A thermometer reads 1.5 °C in ice water and 101.0 °C in boiling water at 1 atm. What is the true temperature when it reads 50.0 °C? | About 48.7 °C | About 50.0 °C, since one reading can't fix a scale | About 48.5 °C, correcting only the zero error | About 51.5 °C, adding the zero error back | Assuming a linear scale: T = (50.0 − 1.5) × 100/(101.0 − 1.5) = 48.5 × 100/99.5 ≈ 48.7 °C; both a zero and a scale error are corrected.
SA2@1,2: Explain why repeating measurements with an uncalibrated balance can't reveal that it reads 2% high. | A 2% scale error is systematic: every reading is high by the same fraction, so repeats agree with each other and look precise. Only comparing with a known standard mass (calibration), or using a different method, reveals the offset. | the error is systematic ; repeats agree with each other ; precision is not accuracy ; calibration against a standard reveals it

## Accuracy, precision and resolution
S: Accuracy is how close a result is to the true value; precision is how closely repeated results agree; resolution is the smallest change an instrument can register. They are different things, and a good experiment needs all three.
LV: Introductory · Foundation
O: Distinguish accuracy, precision and resolution
O: Judge from a data set which of them limits a measurement
PRE: Measurement instruments and calibration
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
T: Accuracy | Closeness of a result to the true value
T: Precision | Closeness of repeated results to one another
T: Resolution | The smallest change in the quantity an instrument can register
SUM: Precise but inaccurate means a systematic error; accurate on average but imprecise means large random error.
SUM: Fine resolution doesn't guarantee accuracy or precision.
SRC: JCGM 200, International vocabulary of metrology (VIM), 3rd edition, sections 2.13–2.15 | standard | 2012 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Taylor J. R., An Introduction to Error Analysis, 2nd edition, University Science Books | secondary | 1997
EV: established | These definitions are those of the international vocabulary of metrology.
Q: Can a measurement be precise but not accurate? | Yes: tightly grouped readings offset from the true value, caused by a systematic error.
M3@2: Ten readings of g give 9.62, 9.63, 9.61, 9.62… m s^{-2} (true value 9.81). What is the main problem? | A systematic error: the readings are precise but inaccurate | Too much random scatter between the ten readings | The resolution of the timer is too coarse to tell | Too few readings to give a reliable mean value | The scatter is about 0.01 but the mean is 0.19 low, so a bias, not scatter, dominates.
SA2@1: A digital meter shows 4 decimal places. Explain why that does not mean the reading is accurate to 4 decimal places. | The display sets only the resolution. The meter can still have a calibration (systematic) error and noise (random error) much larger than the last digit, so accuracy is set by its specification and calibration, not by how many digits it shows. | digits show resolution ; systematic calibration error possible ; random noise possible ; accuracy comes from the specification and calibration

## Random and systematic errors
S: Random errors scatter readings unpredictably either side of the true value; systematic errors shift all readings the same way. They need different remedies, and identifying which you have is half of good experimental practice.
LV: Introductory · Foundation
O: Classify sources of error as random or systematic
O: Choose the right remedy: repeat and average, or calibrate and redesign
PRE: Accuracy, precision and resolution
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
T: Random error | Unpredictable scatter either side of the true value
T: Systematic error | A consistent offset or scale error that affects every reading the same way
T: Parallax | A reading error from viewing a scale at an angle
SUM: Averaging reduces random error as 1/√n; it does nothing for systematic error.
SUM: Find systematic errors by calibration, by a different method, or by changing the apparatus.
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM), section 3.2 | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, chapter 1, Oxford University Press | secondary | 2010
EV: established | The random/systematic distinction is standard; the GUM instead classes uncertainty evaluations as type A (statistical) and type B (other).
Q: Why doesn't averaging remove a systematic error? | Every reading is shifted the same way, so the average is shifted by the same amount.
M3@1,2: A stopwatch is started by hand at each swing. Which error does human reaction time mostly cause? | Random, with a possible systematic part if starts and stops are delayed differently | Only a systematic error, the same every time | No error, if the watch reads to 0.01 s | Only a resolution error from the display | Reaction times vary (random), and if the start lags more than the stop there is also a bias; timing many swings reduces both relative to the total.
SA2@2: Describe a way to detect a systematic error in measuring g with a pendulum. | Measure g a different way (for example a falling-object light gate) and compare; or vary the length and plot T^{2} against l: a non-zero intercept reveals a constant offset in the measured length (such as measuring to the top of the bob instead of its centre). | use an independent method ; or vary length and plot T^{2} against l ; non-zero intercept shows an offset ; example of a length offset

## Measurement uncertainty
S: Uncertainty is the range within which the true value is expected to lie, at a stated confidence. The international Guide to the Expression of Uncertainty in Measurement (GUM) gives a standard way to estimate and combine it.
LV: Introductory · Application
O: State a result as a best estimate with an uncertainty and confidence level
O: Combine type A (statistical) and type B (other) uncertainty components
PRE: Random and systematic errors
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
T: Standard uncertainty | The uncertainty expressed as a standard deviation
T: Expanded uncertainty | The standard uncertainty multiplied by a coverage factor k, usually 2 for about 95% confidence
T: Type B evaluation | An uncertainty estimated by means other than repeated measurement, such as a specification or resolution
SUM: Result = best estimate ± uncertainty, with units and the confidence level stated.
SUM: A reading resolution a contributes a standard uncertainty of about a/(2√3).
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM) | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Bell S., A Beginner's Guide to Uncertainty of Measurement, NPL Measurement Good Practice Guide 11 | guidance | 1999 | https://www.npl.co.uk/resources/gpgs
EV: established | The GUM framework is the international standard for expressing uncertainty.
Q: What coverage factor gives about 95% confidence for a Gaussian? | k = 2.
M3@2: A ruler's smallest division is 1 mm. Using a rectangular distribution, what is the standard uncertainty from resolution? | About 0.29 mm | 1 mm, the full width of one division | 0.5 mm, half of one division on the scale | 0.1 mm, a tenth of the smallest division | Half-width 0.5 mm; standard uncertainty = 0.5/√3 ≈ 0.29 mm.
SA2@1,2: A length has a statistical standard uncertainty of 0.3 mm and a calibration uncertainty of 0.4 mm. Find the combined and expanded (k = 2) uncertainties. | Independent components add in quadrature: u_{c} = √(0.3^{2} + 0.4^{2}) = 0.5 mm. Expanded: U = 2 × 0.5 = 1.0 mm, about 95% confidence. | quadrature sum ; u_{c} = 0.5 mm ; multiply by k = 2 ; U = 1.0 mm

## Absolute and relative uncertainty
S: Absolute uncertainty has the units of the quantity (± 0.2 cm); relative (fractional or percentage) uncertainty is the absolute uncertainty divided by the value. Absolute uncertainties add for sums; relative ones for products.
LV: Introductory · Foundation
O: Convert between absolute and relative uncertainties
O: Decide which form to use when combining uncertainties
PRE: Measurement uncertainty
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
T: Absolute uncertainty | Uncertainty in the units of the quantity, such as ± 0.2 cm
T: Relative uncertainty | Absolute uncertainty divided by the value, often as a percentage
SUM: Adding or subtracting: combine absolute uncertainties. Multiplying or dividing: combine relative ones.
SUM: Small differences of large numbers have large relative uncertainties.
SRC: Taylor J. R., An Introduction to Error Analysis, 2nd edition, chapter 2, University Science Books | secondary | 1997
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM) | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
EV: established | These are standard rules of uncertainty analysis.
Q: What is the relative uncertainty of 25.0 ± 0.5 cm? | 0.5/25.0 = 0.02, or 2%.
M3@2: Two masses are 100.0 ± 0.2 g and 98.0 ± 0.2 g. What is the relative uncertainty in their difference? | About 14% | About 0.2%, the uncertainty of each mass | About 0.4%, the two uncertainties added | About 2%, from 0.4 g out of 20 g | The difference is 2.0 g with uncertainty √(0.2^{2} + 0.2^{2}) ≈ 0.28 g, so 0.28/2.0 ≈ 14%.
SA2@1,2: Explain why an experiment measuring a small temperature change ΔT = T_{2} − T_{1} needs a very precise thermometer. | Each reading's absolute uncertainty carries into the difference, but the difference itself is small, so the relative uncertainty of ΔT is large. For example ±0.5 °C on each reading gives about ±0.7 °C on a 3 °C change, over 20%. | absolute uncertainties combine for a difference ; ΔT is small ; relative uncertainty becomes large ; a worked example

## Significant figures in experimental results
S: In experimental work significant figures follow the uncertainty, not the calculator. The uncertainty is quoted to one or two significant figures, and the result is rounded to the same decimal place.
LV: Introductory · Foundation
O: Round a result to match its uncertainty
O: Quote the uncertainty to one or two significant figures
PRE: Absolute and relative uncertainty
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
T: Rounding to the uncertainty | Giving the result to the same decimal place as its uncertainty
SUM: Round the uncertainty to 1 (or 2) significant figures, then the value to the same decimal place.
SUM: Keep full precision in intermediate steps; round only the final answer.
T: Guard digits | Extra digits kept during working so that rounding doesn't add error
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM), section 7.2.6 | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, chapter 2, Oxford University Press | secondary | 2010
EV: established | The GUM recommends at most two significant figures for an uncertainty.
Q: How should 9.81346 ± 0.0237 m s^{-2} be written? | 9.81 ± 0.02 m s^{-2} (or 9.813 ± 0.024 with two figures in the uncertainty).
M3@1,2: A calculator gives R = 47.2381 Ω with ΔR = 1.6 Ω. How should it be reported? | 47 ± 2 Ω | 47.2381 ± 1.6 Ω | 47.2 ± 1.6 Ω only | 50 ± 2 Ω | Round the uncertainty to one figure (2 Ω) and the value to the same place: 47 Ω. (47.2 ± 1.6 Ω with two figures is also acceptable.)
SA2@1: Explain what is wrong with reporting a speed as 3.456789 ± 0.2 m s^{-1}. | The uncertainty shows the value is uncertain in the first decimal place, so the extra digits are meaningless and claim false precision. It should be 3.5 ± 0.2 m s^{-1}. | uncertainty sets the last meaningful digit ; extra digits are false precision ; correct form 3.5 ± 0.2 m s^{-1}

## Propagation of uncertainty
S: When a result is calculated from measured quantities, their uncertainties propagate into the result. For independent errors you add contributions in quadrature using partial derivatives; simpler worst-case rules give upper bounds.
LV: Intermediate · Application
O: Propagate independent uncertainties through a formula using partial derivatives
O: Identify which input dominates the uncertainty of a result
PRE: Absolute and relative uncertainty
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
T: Sensitivity coefficient | ∂f/∂x, how strongly a result depends on an input
T: Dominant uncertainty | The input contributing most to the combined uncertainty
SUM: u_{f}^{2} = Σ(∂f/∂x_{i})^{2} u_{i}^{2} for independent inputs.
SUM: Improve the dominant input first; reducing a minor one barely helps.
SRC: JCGM 100, Evaluation of measurement data: Guide to the expression of uncertainty in measurement (GUM), section 5 | standard | 2008 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Taylor J. R., An Introduction to Error Analysis, 2nd edition, chapter 3, University Science Books | secondary | 1997
EV: established | The first-order propagation formula is accurate when uncertainties are small; Monte Carlo methods (GUM Supplement 1) handle large or non-linear cases.
Q: Which input should you measure more carefully to improve a result? | The one with the largest contribution (∂f/∂x × u_{x}) to the combined uncertainty.
M3@2,3: The kinetic energy E = ½mv^{2} has m known to 1% and v to 3%. What is the relative uncertainty of E? | About 6.1% | 4%, adding the 1% and 3% directly | 7%, adding 1% and twice 3% | 3.2%, from √(1^{2} + 3^{2}) | Relative contributions: m gives 1%, v^{2} gives 2 × 3% = 6%; √(1^{2} + 6^{2}) ≈ 6.1%. The speed dominates.
SA2@1,2: The density of a sphere is ρ = 6m/(πd^{3}), with m measured to 0.1% and d to 0.5%. Find the relative uncertainty in ρ and say how to improve it. | Contributions: m gives 0.1%; d^{3} gives 3 × 0.5% = 1.5%. Combined: √(0.1^{2} + 1.5^{2}) ≈ 1.5%. The diameter dominates, so measure it more precisely (micrometer, several diameters averaged). | power of 3 triples d's relative uncertainty ; combined about 1.5% ; diameter dominates ; improve the diameter measurement

## Error bars and confidence intervals
S: Error bars show the uncertainty of each data point on a graph; confidence intervals state the range within which a parameter lies with a given probability. Both let readers judge whether results agree.
LV: Intermediate · Foundation
O: Draw and interpret error bars on a graph
O: Explain what a 68% or 95% confidence interval means
PRE: Measurement uncertainty
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
T: Error bar | A line on a graph point showing its uncertainty, usually ±1 standard uncertainty
T: Confidence interval | A range constructed so that it contains the true value with a stated probability over repeated experiments
SUM: State what error bars show (standard deviation, standard error or 95% interval): they differ by large factors.
SUM: About two-thirds of ±1σ error bars should touch the best-fit line; if nearly all do, the uncertainties are probably overestimated.
SRC: Cumming G., Fidler F., Vaux D. L., "Error bars in experimental biology", Journal of Cell Biology 177, 7–11 | primary | 2007 | https://doi.org/10.1083/jcb.200611141
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, chapter 6, Oxford University Press | secondary | 2010
EV: established | These interpretations are standard in frequentist statistics.
Q: If 20 points have ±1σ error bars and the model is right, about how many should miss the line? | About a third: roughly 6 or 7.
M3@2,3: Two measurements are 10.0 ± 0.3 and 10.8 ± 0.4 (standard uncertainties). Do they agree? | Marginally: they differ by 0.8 against a combined uncertainty of 0.5, about 1.6σ | No: their error bars don't overlap at all | Yes: whenever two error bars touch they agree | They can't be compared without more readings | Compare the difference with √(0.3^{2} + 0.4^{2}) = 0.5; 1.6σ is not significant, though worth noting.
SA2@2: A student says "the 95% confidence interval means there's a 95% chance the true value is in this range." Explain the more careful statement. | In frequentist statistics the true value is fixed, not random. A 95% confidence interval comes from a procedure that, if the experiment were repeated many times, would produce intervals containing the true value 95% of the time. Any one interval either does or doesn't contain it. (A Bayesian credible interval does make the probability statement.) | the true value is fixed ; the interval is random ; 95% of intervals from repeats contain it ; Bayesian credible interval contrast

## Repeatability and reproducibility
S: Repeatability is agreement between results under the same conditions (same person, apparatus, lab, short time); reproducibility is agreement under changed conditions (different people, methods, labs). Reproducibility is the stronger test of a result.
LV: Introductory · Foundation
O: Distinguish repeatability from reproducibility
O: Explain why independent replication is the strongest test of a result
PRE: Random and systematic errors
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
T: Repeatability | Agreement of results under the same conditions, operator, apparatus and place, over a short time
T: Reproducibility | Agreement of results under changed conditions: different people, apparatus or laboratories
SUM: Repeatability tests random scatter; reproducibility also exposes hidden systematic errors.
SUM: A result accepted by physics has been reproduced independently.
SRC: JCGM 200, International vocabulary of metrology (VIM), 3rd edition, sections 2.21 and 2.25 | standard | 2012 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: OPERA Collaboration, "Measurement of the neutrino velocity with the OPERA detector in the CNGS beam", Journal of High Energy Physics 2012(10), 093 | primary | 2012 | https://doi.org/10.1007/JHEP10(2012)093
EV: established | These definitions are from the VIM.
Q: Why is reproducibility a stronger test than repeatability? | Changing people, equipment and labs exposes systematic errors that repeating the same setup can't.
M3@2: Two labs measure the same constant with small error bars but disagree by 5σ. What does this most likely indicate? | An unidentified systematic error in at least one lab | Both labs have too few readings | The constant varies with location | Random errors were underestimated by chance | Repeatable but irreproducible results point to a systematic effect; the proton-radius puzzle and G measurements are real examples.
SA2@1,2: Explain why journals and funders increasingly ask researchers to share data and code. | Sharing lets others check the analysis and repeat it, and lets independent groups attempt to reproduce the result with the same methods. That exposes errors and strengthens trust. Without the data and code, an apparent result can't be properly verified. | allows checking the analysis ; supports independent reproduction ; exposes errors ; builds confidence in results

## Experimental controls
S: A control removes alternative explanations for a result. Controlled variables are held fixed, control experiments run without the factor being tested, and blank measurements remove backgrounds.
LV: Introductory · Foundation
O: Explain the purpose of controlled variables, control experiments and blanks
O: Design a control that rules out a named alternative explanation
PRE: Repeatability and reproducibility
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
T: Control experiment | A run identical to the real one except for the factor being tested
T: Blank | A measurement with no sample, giving the background to subtract
SUM: Every alternative explanation needs a control that would reveal it.
SUM: Subtract the blank (background) before analysing the signal.
SRC: Montgomery D. C., Design and Analysis of Experiments, 9th edition, Wiley | secondary | 2017
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, Oxford University Press | secondary | 2010
EV: established | Controls are standard experimental practice in every science.
Q: What is a blank measurement for? | Measuring the background (signal with no sample) so it can be subtracted.
M3@2: A detector shows more counts with a radioactive sample than without. What control rules out a temperature effect on the detector? | Repeat the run without the sample at the same detector temperature | Repeat it with a stronger sample at a higher temperature | Count for much longer with the sample still in place | Swap to a different sample in a warmer room | The only change between the runs should be the sample, so any difference can be attributed to it.
SA2@2: A student measures how a solar cell's output depends on lamp distance. Describe two controls needed. | Keep the room dark or measure the background output with the lamp off and subtract it; keep the cell's temperature constant (it affects output), for example by short exposures or a heat filter; keep the angle of the cell to the lamp fixed. | background measured and subtracted ; temperature controlled ; angle or alignment fixed

## Independent, dependent and controlled variables
S: In an experiment you change the independent variable, measure the dependent variable, and keep the controlled variables constant. Clear variables make a fair test whose result can be attributed to one cause.
LV: Introductory · Foundation
O: Identify the independent, dependent and controlled variables in an experiment
O: Explain why only one independent variable should change at a time
PRE: Experimental controls
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
T: Independent variable | The quantity the experimenter changes deliberately
T: Dependent variable | The quantity measured in response
T: Controlled variable | A quantity held constant so it can't affect the result
SUM: Change one thing, measure its effect, hold everything else fixed.
SUM: Plot the independent variable on the x-axis and the dependent on the y-axis.
SRC: Montgomery D. C., Design and Analysis of Experiments, 9th edition, chapter 1, Wiley | secondary | 2017
SRC: AQA, GCSE Physics (8463) specification, "Required practical activities" | guidance | 2019 | https://www.aqa.org.uk/subjects/science/gcse/physics-8463
EV: established | This is the standard fair-test framework taught at school and used in research design.
Q: In an experiment on how wire length affects resistance, which variable is controlled? | Examples: the wire's material, cross-sectional area and temperature.
M3@2: Investigating how the drop height of a ball affects its bounce height, which is the dependent variable? | Bounce height | Drop height | The ball's mass | The surface | You change the drop height and measure the bounce height in response.
SA2@1,2: Explain why changing both the length and the thickness of a wire at once makes a resistance experiment inconclusive. | Both affect resistance (R = ρL/A), so any change in R could be due to either, or to both in some mixture. With two independent variables changed together their effects can't be separated, so neither relationship is tested. | both variables affect R ; effects can't be separated ; change one at a time ; reference to R = ρL/A

## Experimental design
S: Experimental design plans what to measure, how, and how many times so that the result answers the question with the smallest uncertainty for the effort. Good design is decided before taking data.
LV: Intermediate · Application
O: Plan the range, spacing and number of measurements to answer a question efficiently
O: Choose methods that reduce the dominant uncertainty
PRE: Independent, dependent and controlled variables
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
T: Range | The span of independent-variable values measured
T: Pilot experiment | A quick preliminary run to find suitable ranges and the main sources of uncertainty
SUM: Measure over the widest practical range, with enough points to test the model's shape.
SUM: Do a pilot run, find the dominant uncertainty, then design to reduce it.
SRC: Montgomery D. C., Design and Analysis of Experiments, 9th edition, Wiley | secondary | 2017
SRC: Squires G. L., Practical Physics, 4th edition, Cambridge University Press | secondary | 2001
EV: established | These principles are standard in experimental physics and statistics.
Q: Why measure over a wide range of the independent variable? | It reduces the uncertainty in a fitted gradient and shows whether the model holds across the range.
M3@2,3: Timing a pendulum, the stopwatch reaction uncertainty is ±0.2 s. How can the relative uncertainty in T be made smaller than 1% for T ≈ 2 s? | Time at least 10 oscillations and divide by the number | Use a stopwatch with 0.001 s resolution | Repeat one-swing timings twice | Use a heavier bob | Timing 10 swings (20 s) makes 0.2 s a 1% uncertainty on the total, shared over 10 periods; 20 swings gives 0.5%.
SA2@2: Describe a good design to test whether a capacitor's discharge is exponential. | Measure voltage at regular, closely spaced times over several time constants; repeat and average; plot ln V against t, where an exponential gives a straight line; check residuals for curvature. Choose R and C so τ is long enough to measure (several seconds) or use a data logger. | many readings over several time constants ; repeats ; linearise with ln V against t ; check the residuals ; suitable τ or data logger

## Calibration curves
S: A calibration curve maps an instrument's raw output to the true quantity using measurements of known standards. You then read unknowns off the curve, ideally by interpolation inside the calibrated range.
LV: Intermediate · Application
O: Construct a calibration curve from standards and use it to read unknowns
O: Explain why interpolation is safer than extrapolation
PRE: Measurement instruments and calibration
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
T: Calibration curve | A graph of instrument output against known values of the quantity
T: Interpolation | Reading a value within the range of the calibration standards
T: Extrapolation | Reading a value beyond the standards, where the curve is untested
SUM: Bracket unknowns with standards and interpolate.
SUM: The curve's own uncertainty adds to the uncertainty of every value read from it.
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, chapter 4, W. H. Freeman | secondary | 2015
SRC: JCGM 200, International vocabulary of metrology (VIM), 3rd edition | standard | 2012 | https://www.bipm.org/en/committees/jc/jcgm/publications
EV: established | Calibration-curve methods are standard analytical practice.
Q: Why should unknowns lie within the calibration range? | Outside it the curve hasn't been tested; non-linearity or saturation could make an extrapolated value wrong.
M3@2: A light sensor gives 0.12 V at 100 lux and 0.48 V at 400 lux, linearly. What light level gives 0.30 V? | 250 lux | 300 lux | 200 lux | 150 lux | The gradient is 0.36 V per 300 lux; 0.30 V is 0.18 V above 0.12 V, i.e. 150 lux above 100 lux = 250 lux.
SA2@1,2: Explain why a calibration curve is usually redone periodically. | Instruments drift with age, temperature, contamination and use, so the relationship between output and true value changes. Recalibrating with standards checks for and corrects this drift, keeping the readings traceable and their uncertainty valid. | instruments drift ; causes such as ageing or temperature ; recalibration detects and corrects it ; keeps readings traceable

## Linearisation of experimental relationships
S: Straight lines are easy to test and fit. Linearisation transforms a suspected relationship into the form y = mx + c, so a straight-line graph confirms the model and the gradient and intercept give its constants.
LV: Intermediate · Application
O: Transform power-law and exponential relationships into straight-line form
O: Extract physical constants from the gradient and intercept
PRE: Exponential and logarithmic functions
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
T: Linearisation | Rearranging a relationship into y = mx + c so that a straight-line graph tests it
T: Log–log plot | A graph of log y against log x; a power law y = kx^{n} gives a line of gradient n
SUM: y = kx^{n}: plot log y against log x, gradient n. y = Ae^{−kx}: plot ln y against x, gradient −k.
SUM: Transform the error bars too: Δ(ln y) = Δy/y.
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, chapter 5, Oxford University Press | secondary | 2010
SRC: Squires G. L., Practical Physics, 4th edition, Cambridge University Press | secondary | 2001
EV: established | These are exact algebraic transformations; fits should weight transformed points correctly.
Q: What graph tests T = 2π√(l/g)? | T^{2} against l: a straight line through the origin with gradient 4π^{2}/g.
M3@2,3: A log–log plot of a planet's orbital period against orbital radius has gradient 1.50. What law does this show? | T^{2} ∝ r^{3} (Kepler's third law) | T ∝ r, so period is proportional to radius | T^{3} ∝ r^{2}, the inverse of Kepler's law | T ∝ r^{2}, so period grows with radius squared | log T = 1.5 log r + c means T ∝ r^{1.5}, i.e. T^{2} ∝ r^{3}.
SA2@1,2: Intensity through an absorber follows I = I_{0}e^{−μx}. Describe how to find μ and I_{0} from a graph. | Take natural logs: ln I = ln I_{0} − μx. Plot ln I against x: a straight line confirms the model; the gradient is −μ and the intercept is ln I_{0}, so I_{0} = e^{intercept}. | take logs ; plot ln I against x ; gradient −μ ; intercept gives I_{0}

## Least-squares fitting
S: Least squares finds the line (or curve) that minimises the sum of squared vertical distances between data and model. It's the standard, statistically justified way to fit data, and it gives uncertainties in the fitted parameters.
LV: Intermediate · Application
O: Explain the least-squares criterion and when it is justified
O: Use weighted least squares when points have different uncertainties
PRE: Linearisation of experimental relationships
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
T: Least squares | Choosing parameters that minimise the sum of squared residuals
T: Chi-squared | χ^{2} = Σ((y_{i} − f(x_{i}))/σ_{i})^{2}, the weighted sum of squared residuals
T: Degrees of freedom | Number of data points minus number of fitted parameters
SUM: Least squares is the maximum-likelihood fit for independent Gaussian errors in y.
SUM: A good fit has χ^{2} close to the number of degrees of freedom.
SRC: Bevington P. R., Robinson D. K., Data Reduction and Error Analysis for the Physical Sciences, 3rd edition, McGraw-Hill | secondary | 2003
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, chapters 6–8, Oxford University Press | secondary | 2010
EV: established | The statistical justification of least squares (Gauss–Markov theorem, maximum likelihood) is proven.
Q: What does a reduced chi-squared much greater than 1 suggest? | The model is wrong or the uncertainties are underestimated.
M3@2: Fitting a straight line to 12 points gives χ^{2} = 9.6. Is the fit acceptable? | Yes: χ^{2} per degree of freedom = 9.6/10 ≈ 1 | No: a good fit needs χ^{2} to be zero | No: χ^{2} should equal 12, the number of points | Only if χ^{2} is below 1 for the whole fit | Two parameters leave 10 degrees of freedom; a reduced χ^{2} near 1 means scatter matches the stated uncertainties.
SA2@1: Explain why points with smaller uncertainties should count more in a fit. | A more precise point carries more information about the true relationship, so it should constrain the fit more strongly. Weighting each squared residual by 1/σ_{i}^{2} does this, and gives the maximum-likelihood estimate when errors are Gaussian. | precise points carry more information ; weight by 1/σ^{2} ; weighted least squares ; maximum likelihood for Gaussian errors

## Regression analysis
S: Regression models how a dependent variable depends on one or more predictors, estimates the model's parameters, and quantifies how well it fits. In physics it's how theory meets data quantitatively.
LV: Intermediate · Application
O: Fit and interpret a regression model, including parameter uncertainties
O: Distinguish correlation from causation and from goodness of fit
PRE: Least-squares fitting
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
T: Regression | Modelling how a dependent variable depends on predictors, and estimating the model's parameters
T: Coefficient of determination | R^{2}, the fraction of variance in y explained by the model
T: Correlation | A statistical association between variables, which does not by itself show cause
SUM: Report fitted parameters with uncertainties; R^{2} alone doesn't show the model is right.
SUM: Correlation is not causation: a controlled experiment, not a regression, establishes cause.
SRC: Bevington P. R., Robinson D. K., Data Reduction and Error Analysis for the Physical Sciences, 3rd edition, chapters 6–7, McGraw-Hill | secondary | 2003
SRC: Anscombe F. J., "Graphs in Statistical Analysis", The American Statistician 27, 17–21 | primary | 1973 | https://doi.org/10.1080/00031305.1973.10478966
EV: established | Anscombe's quartet shows that identical summary statistics can hide completely different data.
Q: What does Anscombe's quartet show? | Four data sets with the same means, variances, correlation and regression line can look completely different, so always plot the data.
M3@2,3: A straight-line fit to clearly curved data gives R^{2} = 0.97. What should you conclude? | R^{2} is high but the model is wrong: check the residuals | The straight line is correct because R^{2} > 0.95 | The data are too noisy | R^{2} shows the line causes the curve | A smooth curve can be close to a line overall; systematic residuals reveal the wrong model.
SA2@2: Ice-cream sales and drowning numbers are strongly correlated. Explain why this doesn't show one causes the other. | Both rise in hot weather: temperature is a confounding variable that drives both. Correlation shows association only; showing cause needs a controlled experiment or careful control of confounders. | correlation is association ; confounding variable such as temperature ; both depend on it ; causation needs control of confounders

## Residual analysis
S: Residuals are the differences between data and the fitted model. Plotting them reveals what summary statistics hide: the wrong model, outliers, changing uncertainties or drifts.
LV: Intermediate · Application
O: Plot and interpret residuals from a fit
O: Diagnose a wrong model, outliers or non-constant uncertainties from residual patterns
PRE: Least-squares fitting
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
T: Residual | Data value minus model value at the same x
T: Normalised residual | The residual divided by the point's uncertainty
T: Outlier | A point far from the model compared with its uncertainty
SUM: Good residuals scatter randomly about zero, with about two-thirds within ±1σ.
SUM: A curve in the residuals means the wrong model; a funnel means the uncertainties change with x.
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, chapter 8, Oxford University Press | secondary | 2010
SRC: Bevington P. R., Robinson D. K., Data Reduction and Error Analysis for the Physical Sciences, 3rd edition, McGraw-Hill | secondary | 2003
EV: established | Residual analysis is standard practice in data fitting.
Q: What should the residuals of a good fit look like? | Random scatter about zero, with no trend, and about two-thirds within one error bar.
M3@2: After fitting a line, residuals are positive at both ends and negative in the middle. What does this suggest? | The data curve upwards: a quadratic or other model is needed | The fit is excellent, as residuals cancel overall | The uncertainties are too large for the data | There is one outlier pulling the middle down | A U-shaped pattern of residuals shows systematic curvature that the straight line misses.
SA2@1,2: Explain why you shouldn't simply delete a point that lies far from the fitted line. | It may be a real effect showing the model fails, not a mistake. Check the notebook for a recording or procedural error and, if possible, repeat the measurement. Remove a point only with a documented reason, and report that it was removed. | it may reveal real physics ; check records for a mistake ; remeasure ; remove only with a stated reason

## Hypothesis testing
S: Hypothesis testing asks whether data are consistent with a null hypothesis (no effect, or the standard model). If data this extreme would be very unlikely under the null, you reject it in favour of the alternative.
LV: Intermediate · Application
O: Set up a null hypothesis and calculate a test statistic
O: Interpret a p-value correctly
PRE: Regression analysis
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
T: Null hypothesis | The default claim tested, such as "no effect" or "the model is correct"
T: p-value | The probability, if the null hypothesis were true, of data at least as extreme as observed
T: Type I error | Rejecting a null hypothesis that is actually true (a false positive)
SUM: A small p-value means the data would be surprising if the null hypothesis were true; it isn't the probability the null is true.
SUM: Choose the significance threshold before looking at the data.
SRC: Lyons L., Statistics for Nuclear and Particle Physicists, Cambridge University Press | secondary | 1986
SRC: Wasserstein R. L., Lazar N. A., "The ASA Statement on p-Values: Context, Process, and Purpose", The American Statistician 70, 129–133 | guidance | 2016 | https://doi.org/10.1080/00031305.2016.1154108
EV: established | The definitions are standard; how to use p-values well is actively debated (the ASA statement).
Q: What does p = 0.03 mean? | If the null hypothesis were true, data at least this extreme would occur 3% of the time.
M3@2,3: A student tests 20 independent hypotheses, all actually false effects, at p < 0.05. How many "significant" results should they expect by chance? | About 1 | 0 | About 5 | 20 | 20 × 0.05 = 1: the look-elsewhere effect. Correct for multiple tests or use a stricter threshold.
SA2@2: A coin gives 60 heads in 100 tosses. Test whether it is fair, at the 5% level. | Null: p(heads) = 0.5. Expected 50, standard deviation √(100 × 0.5 × 0.5) = 5. 60 is 2σ above, two-sided p ≈ 0.05, borderline (exact binomial p ≈ 0.057). So at 5% we don't quite reject fairness; more tosses are needed. | null hypothesis stated ; mean 50 and σ = 5 ; 2σ deviation ; p about 0.05 so borderline

## Statistical significance
S: A result is statistically significant when chance alone is an unlikely explanation. Physics quantifies this in standard deviations ("sigma"), with 5σ the conventional threshold for claiming a discovery.
LV: Intermediate · Foundation
O: Convert between sigma levels and p-values
O: Explain why particle physics requires 5σ for a discovery
PRE: Hypothesis testing
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
T: Sigma level | The number of standard deviations a result lies from the null expectation
T: Look-elsewhere effect | The increased chance of a fluctuation when searching many places for a signal
SUM: 3σ ≈ p = 1.3 × 10^{−3} ("evidence"); 5σ ≈ p = 2.9 × 10^{−7} ("discovery"), one-sided.
SUM: Significance says a fluctuation is unlikely, not that the effect is large or important.
SRC: ATLAS Collaboration, "Observation of a new particle in the search for the Standard Model Higgs boson with the ATLAS detector at the LHC", Physics Letters B 716, 1–29 | primary | 2012 | https://doi.org/10.1016/j.physletb.2012.08.020
SRC: Lyons L., "Discovering the Significance of 5 sigma", arXiv:1310.1284 | secondary | 2013 | https://arxiv.org/abs/1310.1284
EV: established | The 5σ convention is a community standard, not a law; Lyons discusses its limits.
Q: Why isn't statistical significance the same as importance? | A tiny effect can be highly significant with enough data; significance measures how unlikely chance is, not the size of the effect.
M3@2,3: The 2011 OPERA neutrino result was 6σ, yet was wrong. What does this show? | Significance only covers random error; an unknown systematic error can produce a "significant" wrong result | 6σ results are always right, so it was sound | Sigma levels say nothing about reliability at all | Neutrinos really do travel faster than light | The loose cable was a systematic error outside the statistical calculation.
SA2@1,2: Explain why particle physicists use 5σ rather than 2σ for discoveries. | Searches look in many places (masses, channels), so 2σ fluctuations happen often by chance (the look-elsewhere effect). Unknown systematic errors can also fake signals, and extraordinary claims need strong evidence. A 5σ threshold, p ≈ 3 × 10^{−7}, makes false discoveries rare. | many searches create chance fluctuations ; look-elsewhere effect ; systematic errors ; 5σ means a very small false-positive probability

## Instrument response and sensitivity
S: An instrument's response describes how its output follows its input: how much (sensitivity), how linearly, how fast (time response) and over which frequencies (bandwidth). Knowing it lets you correct readings and pick the right instrument.
LV: Intermediate · Foundation
O: Describe an instrument's sensitivity, linearity, time response and bandwidth
O: Calculate the response time of a first-order instrument
PRE: Measurement instruments and calibration
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
T: Sensitivity | Change in output per unit change in input
T: Time constant | For a first-order instrument, the time to reach 63% of a step change
T: Bandwidth | The range of frequencies an instrument follows faithfully
SUM: Wait about 5 time constants after a step for a reading within 1% of the final value.
SUM: A signal changing faster than the bandwidth is smoothed and delayed.
SRC: Bentley J. P., Principles of Measurement Systems, 4th edition, Pearson | secondary | 2005
SRC: Fraden J., Handbook of Modern Sensors, 5th edition, Springer | secondary | 2016
EV: established | First-order response (1 − e^{−t/τ}) is a standard model; many real sensors are close to it.
Q: How long does a first-order sensor take to reach 99% of a step? | About 4.6 time constants (ln 100).
M3@2: A thermometer has τ = 10 s. It is moved from 20 °C to 80 °C water. What does it read after 10 s? | About 58 °C | 80 °C, since thermometers read instantly | 50 °C, halfway between the two temperatures | 26 °C, only a tenth of the way there | Reading = 80 − 60e^{−1} ≈ 80 − 22 = 58 °C.
SA2@1: Explain why a slow thermometer gives wrong readings of a rapidly changing temperature. | A first-order instrument lags behind: its reading approaches the true value exponentially with time constant τ. If the temperature changes on a timescale shorter than τ, the reading is smoothed and delayed and never reaches the peaks, so both amplitude and timing are wrong. | instrument lags with time constant τ ; changes faster than τ ; reading smoothed and delayed ; peaks underestimated

## Detection limits
S: The detection limit is the smallest signal an instrument or method can reliably distinguish from noise and background. Below it, a measured "signal" could just be a fluctuation.
LV: Intermediate · Foundation
O: Define the detection limit in terms of background noise
O: Decide whether a measured signal is a detection or an upper limit
PRE: Statistical significance
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
T: Detection limit | The smallest signal reliably distinguished from background noise
T: Upper limit | The largest true signal consistent with a null result, at a stated confidence
SUM: A common working rule: detection limit ≈ 3 × the standard deviation of the blank.
SUM: Below the limit, report an upper limit, not a value.
SRC: Currie L. A., "Limits for qualitative detection and quantitative determination", Analytical Chemistry 40, 586–593 | primary | 1968 | https://doi.org/10.1021/ac60259a007
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, chapter 5, W. H. Freeman | secondary | 2015
EV: established | The 3σ rule is a convention; IUPAC and ISO define detection limits more formally (Currie).
Q: What should you report if a signal is below the detection limit? | An upper limit at a stated confidence, not a measured value.
M3@2: A blank gives 200 counts with σ = √200 ≈ 14. A sample gives 230 counts in the same time. Is it a detection at 3σ? | No: the excess of 30 is under 2σ, well short of a 3σ detection | Yes: 230 counts is clearly more than 200 | Yes: any excess at all counts as a detection | Only if both runs used the same count time | The uncertainty on the excess is √(200 + 230) ≈ 21 counts, so 30 counts is about 1.4σ; a 3σ detection would need an excess of roughly 60.
SA2@1,2: Explain how counting for longer lowers the detection limit for a weak radioactive sample. | Both signal and background counts grow in proportion to time t, but the background's fluctuation grows only as √t. The ratio of signal to fluctuation rises as √t, so a smaller activity becomes distinguishable from background. | counts proportional to time ; noise grows as √t ; signal-to-noise rises as √t ; smaller activities detectable

## Signal-to-noise ratio
S: The signal-to-noise ratio (SNR) compares the strength of a wanted signal with the random fluctuations hiding it. Most experimental technique comes down to raising the SNR.
LV: Intermediate · Application
O: Calculate a signal-to-noise ratio, including in decibels
O: Choose a method (averaging, filtering, shielding, cooling) to improve it
PRE: Detection limits
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
T: Signal-to-noise ratio | The power (or amplitude) of the wanted signal divided by that of the noise
T: Decibel | 10 log_{10} of a power ratio, or 20 log_{10} of an amplitude ratio
T: Shot noise | Fluctuation from the discreteness of charge or photons, proportional to √N
SUM: Averaging N repeats improves amplitude SNR by √N.
SUM: Remove noise at its source first: shielding, grounding, cooling, then filtering.
SRC: Horowitz P., Hill W., The Art of Electronics, 3rd edition, chapter 8, Cambridge University Press | secondary | 2015
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, Oxford University Press | secondary | 2010
EV: established | √N averaging assumes independent noise; correlated noise (such as 1/f drift) averages down more slowly.
Q: How much does averaging 100 repeated scans improve amplitude SNR? | By √100 = 10 times, if the noise is independent from scan to scan.
M3@2: A signal amplitude is 1.0 mV and the noise is 10 μV rms. What is the SNR in decibels? | 40 dB | 20 dB | 100 dB | 10 dB | Amplitude ratio 100; 20 log_{10} 100 = 40 dB.
SA2@2: Explain why cooling a detector improves its signal-to-noise ratio. | Thermal (Johnson) noise in resistors and thermal generation of charge carriers in semiconductors both rise with temperature. Cooling reduces these random noise sources while leaving the signal unchanged, so the SNR rises (why astronomical CCDs and infrared detectors are cooled). | thermal noise rises with temperature ; thermally generated carriers ; cooling reduces noise ; signal unchanged so SNR rises

## Data acquisition systems
S: A data acquisition (DAQ) system converts physical signals into digital numbers a computer can store: sensor, signal conditioning, sampling and analogue-to-digital conversion, then software for logging and analysis.
LV: Intermediate · Foundation
O: Describe the stages of a data acquisition chain
O: Choose a sampling rate and resolution, avoiding aliasing
PRE: Signal-to-noise ratio
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
T: Analogue-to-digital converter | A circuit that converts a voltage into a binary number
T: Nyquist rate | Twice the highest frequency in a signal: the minimum sampling rate that avoids aliasing
T: Aliasing | A false low frequency produced by sampling a signal too slowly
SUM: Sensor → conditioning (amplify, filter) → sample → digitise → store.
SUM: Sample faster than twice the highest frequency, and use an anti-aliasing filter.
SRC: Horowitz P., Hill W., The Art of Electronics, 3rd edition, chapter 13, Cambridge University Press | secondary | 2015
SRC: Shannon C. E., "Communication in the presence of noise", Proceedings of the IRE 37, 10–21 | primary | 1949 | https://doi.org/10.1109/JRPROC.1949.232969
EV: established | The sampling theorem is a proven result for band-limited signals.
Q: What is the voltage resolution of a 12-bit ADC with a 0–5 V range? | 5 V/4096 ≈ 1.2 mV.
M3@2,3: A 900 Hz signal is sampled at 1000 Hz. What frequency appears in the data? | 100 Hz | 900 Hz | 1900 Hz | 500 Hz | Sampling below the Nyquist rate (1800 Hz) folds 900 Hz to |900 − 1000| = 100 Hz.
SA2@1,2: Explain why an anti-aliasing low-pass filter goes before the ADC. | Any noise or signal above half the sampling rate would alias to a false lower frequency once sampled, and can't be removed afterwards because it looks real. Filtering before sampling removes those frequencies while the signal is still analogue. | frequencies above half the sampling rate alias ; aliases can't be separated after sampling ; filter before the ADC ; low-pass at or below the Nyquist frequency

## Sensors and transducers
S: A transducer converts energy from one form into another; a sensor is a transducer that produces a measurable signal (usually electrical) from a physical quantity. Choosing the sensing principle sets the range, sensitivity and speed of a measurement.
LV: Introductory · Foundation
O: Describe how common sensors convert physical quantities into electrical signals
O: Choose a sensor for a measurement by range, sensitivity, speed and linearity
PRE: Instrument response and sensitivity
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
T: Transducer | A device that converts energy from one form to another
T: Thermistor | A resistor whose resistance depends strongly on temperature
T: Strain gauge | A sensor whose resistance changes when it is stretched
SUM: Thermocouples, thermistors, photodiodes, strain gauges and Hall probes each turn one quantity into a voltage or resistance.
SUM: Choose by range, sensitivity, speed, linearity, size and how it affects what it measures.
SRC: Fraden J., Handbook of Modern Sensors, 5th edition, Springer | secondary | 2016
SRC: OpenStax, University Physics Volume 2, section 9.3 "Resistivity and Resistance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-3-resistivity-and-resistance
EV: established | The physical principles of these sensors are standard.
Q: Which sensor measures magnetic field by the voltage across a current-carrying strip? | A Hall probe.
M3@2: An NTC thermistor and a fixed resistor form a potential divider; the output is across the fixed resistor. What happens to the output as temperature rises? | It rises, because the thermistor's resistance falls | It falls, because the thermistor's resistance rises | It stays the same | It reverses sign | NTC resistance decreases with temperature, so a larger share of the voltage drops across the fixed resistor.
SA2@2: Give two reasons a thermocouple might be preferred to a thermistor for measuring the temperature of a furnace. | Thermocouples work up to over 1000 °C (type K to about 1250 °C), far above a thermistor's range; they are robust and small so respond quickly; they need no supply current. | much higher temperature range ; robust ; small and fast ; self-generating, no supply needed

## Oscilloscopes and signal generators
S: An oscilloscope displays voltage against time, so you can see waveforms, measure amplitudes, periods and phase, and catch glitches. A signal generator supplies known test waveforms. Together they are the basic tools of electronic measurement.
LV: Introductory · Application
O: Measure amplitude, period and phase difference with an oscilloscope
O: Set the timebase, sensitivity and trigger for a stable display
PRE: Data acquisition systems
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
T: Timebase | The horizontal scale of an oscilloscope, in time per division
T: Trigger | The condition that starts each sweep, so repeated waveforms line up
T: Phase difference | The fraction of a cycle between two waveforms, in degrees or radians
SUM: Period = divisions × timebase; peak-to-peak voltage = divisions × volts per division.
SUM: Use the trigger to freeze a repetitive signal and two channels to compare phase.
SRC: Horowitz P., Hill W., The Art of Electronics, 3rd edition, Cambridge University Press | secondary | 2015
SRC: Tektronix, XYZs of Oscilloscopes, primer | guidance | 2016
EV: established | These are standard instrument techniques.
Q: A sine wave spans 5 divisions per cycle on 2 ms/div. What is its frequency? | Period 10 ms, so 100 Hz.
M3@2: Two sine waves of period 8.0 div are offset by 1.0 div. What is their phase difference? | 45° | 90° | 12.5° | 8° | 1/8 of a cycle × 360° = 45° (π/4 rad).
SA2@1,2: Explain why an unstable, drifting trace appears if the trigger is set wrongly, and how to fix it. | Each sweep starts at a random point of the waveform, so successive traces don't overlap. Set the trigger source to the signal's channel and the level within the signal's range (with the right slope), so each sweep starts at the same point in the cycle. | sweeps start at different points ; traces don't overlap ; set trigger source and level within the signal ; choose slope

## Lock-in amplifiers
S: A lock-in amplifier extracts a tiny signal buried in noise by modulating it at a known frequency and detecting only what varies at exactly that frequency and phase. It can recover signals thousands of times smaller than the noise.
LV: Advanced · Application
O: Explain how phase-sensitive detection extracts a small signal from noise
O: Choose the reference frequency and time constant for a measurement
PRE: Signal-to-noise ratio
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
T: Phase-sensitive detection | Multiplying a signal by a reference at the same frequency and averaging, so only the in-phase component survives
T: Reference signal | The known modulation frequency and phase the lock-in locks to
SUM: Modulate the signal, multiply by the reference, low-pass filter: noise at other frequencies averages away.
SUM: A longer time constant narrows the detection bandwidth and lowers noise, but slows the response.
SRC: Stanford Research Systems, "About Lock-In Amplifiers", Application Note 3 | guidance | 2016 | https://www.thinksrs.com/downloads/pdfs/applicationnotes/AboutLIAs.pdf
SRC: Horowitz P., Hill W., The Art of Electronics, 3rd edition, chapter 8, Cambridge University Press | secondary | 2015
EV: established | Phase-sensitive detection is a standard and well-understood technique.
Q: Why modulate a signal at a few kHz rather than measure it as a steady DC value? | Low-frequency (1/f) noise and drift are much larger near DC; moving the signal to a quiet frequency avoids them.
M3@2,3: A lock-in's time constant is raised from 0.1 s to 1 s. What happens? | Noise bandwidth falls about tenfold, so noise falls about √10, but the output takes about ten times longer to settle | Noise rises, because averaging adds noise each second | The reference frequency shifts to a lower value | Nothing changes, because the signal is the same | Bandwidth ∝ 1/τ and noise amplitude ∝ √bandwidth, at the cost of response time.
SA2@1: Explain why multiplying a noisy signal by a sine wave at the reference frequency and averaging extracts the signal. | The product of two sinusoids at the same frequency contains a steady (DC) term proportional to the signal amplitude and cos of the phase difference, plus a term at twice the frequency. Noise at other frequencies gives products that oscillate and average to zero. A low-pass filter keeps only the DC term. | same-frequency product gives a DC term ; proportional to amplitude and phase ; other frequencies oscillate ; low-pass filter averages them away

## Vacuum systems
S: Many experiments need low pressure: to let particles travel without collisions, to keep surfaces clean, or to insulate thermally. Vacuum technology combines pumps, gauges and clean materials to reach pressures from 10^{2} down to 10^{-11} Pa.
LV: Intermediate · Foundation
O: Relate pressure to mean free path and explain why experiments need vacuum
O: Describe how rough and high-vacuum pumps and gauges work together
PRE: Microscopic and macroscopic descriptions
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
T: Mean free path | The average distance a molecule travels between collisions
T: Ultra-high vacuum | Pressures below about 10^{−7} Pa, needed to keep surfaces clean
T: Outgassing | Release of gas from surfaces inside a vacuum chamber
SUM: Mean free path ∝ 1/pressure: about 70 nm at 1 atm, about 7 cm at 0.1 Pa.
SUM: A rotary pump roughs the chamber; a turbomolecular or ion pump reaches high vacuum.
SRC: O'Hanlon J. F., A User's Guide to Vacuum Technology, 3rd edition, Wiley | secondary | 2003
SRC: Blundell S. J., Blundell K. M., Concepts in Thermal Physics, 2nd edition, chapter 8, Oxford University Press | secondary | 2010
EV: established | Kinetic theory gives the mean free path; the values quoted are approximate for air at room temperature.
Q: Why must a turbomolecular pump be backed by a rough pump? | It works only at low pressures, where molecules travel freely between its blades; it can't exhaust directly to atmosphere.
M3@2: An electron beam must travel 1 m without colliding with gas. Roughly what pressure is needed? | Below about 10^{−2} Pa | 10^{4} Pa | 100 Pa | Atmospheric pressure | λ ≈ 7 mm at 1 Pa scaling as 1/p, so λ > 1 m needs p well below 10^{−2} Pa.
SA2@2: Explain why ultra-high vacuum systems are baked at 150–250 °C. | Water and other gases adsorbed on the inner walls slowly desorb (outgassing), limiting the pressure. Heating speeds desorption so the gas can be pumped away quickly; after cooling, the outgassing rate is far lower and much lower pressures are reached. | adsorbed gases outgas ; heating speeds desorption ; pump it away during the bake ; lower base pressure after cooling

## Cryogenic measurement
S: Cryogenics studies matter at very low temperatures, where superconductivity, superfluidity and quantum effects appear and thermal noise falls. Measuring there demands special coolants, refrigerators and thermometers.
LV: Advanced · Foundation
O: Describe how low temperatures are reached with liquid nitrogen, liquid helium and dilution refrigerators
O: Explain the special difficulties of measuring at millikelvin temperatures
PRE: Vacuum systems
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
T: Cryostat | An insulated apparatus that holds a sample at low temperature
T: Dilution refrigerator | A cooler using a mixture of helium-3 and helium-4 to reach a few millikelvin
SUM: Liquid nitrogen 77 K; liquid helium-4 4.2 K (1 K pumped); helium-3 0.3 K; dilution refrigerators below 10 mK.
SUM: At millikelvin temperatures tiny heat leaks, including the measuring current, can warm the sample.
SRC: Pobell F., Matter and Methods at Low Temperatures, 3rd edition, Springer | secondary | 2007
SRC: White G. K., Meeson P. J., Experimental Techniques in Low-Temperature Physics, 4th edition, Oxford University Press | secondary | 2002
EV: established | The quoted boiling points are standard data at 1 atm.
Q: Why do cryostats use vacuum jackets and radiation shields? | To stop heat reaching the sample by conduction, convection and radiation.
M3@2: Why do measurements at 10 mK use very small currents? | Joule heating I^{2}R could warm the sample far above the bath temperature | Small currents are more accurate at all temperatures | Large currents freeze the sample | Superconductors don't conduct | Cooling power at millikelvin temperatures is only microwatts or less, so even nanowatts of heating matter.
SA2@1,2: Explain why thermometry is itself difficult at millikelvin temperatures. | Common thermometers stop responding or need calibration against primary standards; thermal contact between thermometer and sample becomes poor (large boundary resistance), so they may be at different temperatures; and the measurement current heats the thermometer. | sensors lose sensitivity or need special calibration ; poor thermal contact ; self-heating by measuring current ; thermometer and sample may differ

## High-voltage and high-current safety
S: Electricity becomes dangerous through current passing through the body, burns, arcs, fire and stored energy. Laboratory safety relies on assessing the risks, designing them out, and following procedures every time.
LV: Introductory · Foundation
O: Identify the hazards of high voltages, high currents and stored energy
O: Describe the controls that make electrical work safe
PRE: Experimental controls
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
SAFE: This lesson is for awareness. Work on high-voltage or high-current equipment only if you are trained, authorised and supervised, following your laboratory's risk assessment and local rules, and never alone. If someone receives a shock, isolate the supply before touching them and call for emergency help.
T: Residual current device | A device that cuts the supply when current leaks to earth, such as through a person
T: Isolation | Disconnecting and locking off a supply so it can't be switched on during work
T: Stored energy | Energy held in capacitors or inductors that remains dangerous after switching off
SUM: Current through the body causes harm; tens of milliamps across the chest can cause fibrillation.
SUM: Isolate, lock off, discharge, test dead, then work: in that order.
SRC: Electricity at Work Regulations 1989 (SI 1989/635) | legislation | 1989 | https://www.legislation.gov.uk/uksi/1989/635
SRC: Health and Safety Executive, Electricity at work: safe working practices (HSG85), 3rd edition | guidance | 2013 | https://www.hse.gov.uk/pubns/books/hsg85.htm
EV: established | The physiological effects of current and the controls are set out in regulation and HSE guidance; exact thresholds vary between people and conditions.
Q: Why can a switched-off circuit still give a dangerous shock? | Capacitors can hold charge at high voltage after the supply is off, so they must be discharged and tested.
M3@2: Which order of steps is correct before working on a high-voltage supply? | Isolate and lock off, discharge stored energy, test that it is dead, then work | Test it, start the work, then isolate if needed | Discharge the capacitors, work, then isolate | Work quickly with one hand, since time is the risk | Each step removes a hazard before the next; testing confirms the isolation actually worked.
SA2@1,2: Explain why "one hand in the pocket" is advised near live high-voltage circuits, and why it isn't a substitute for isolation. | Keeping one hand away reduces the chance of a current path across the chest through the heart, the most dangerous route. It doesn't prevent shocks or burns and the path through the feet still exists, so it only reduces harm; the main control is isolating and testing dead, under trained supervision and the local risk assessment. | avoids a hand-to-hand path through the chest ; doesn't prevent shocks ; isolation and testing dead come first ; work only when trained and authorised

## Laboratory notebooks and reproducibility
S: A lab notebook is the permanent, dated record of what you did, saw and thought. It makes your work reproducible, defends priority and integrity, and saves you when results need rechecking months later.
LV: Introductory · Foundation
O: Keep a lab notebook that lets someone else repeat your work
O: Explain why raw data and mistakes are recorded, not erased
PRE: Repeatability and reproducibility
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
T: Raw data | Readings exactly as taken, before any calculation
T: Provenance | The recorded history of where data and results came from
SUM: Record the date, aim, apparatus, settings, raw readings, problems and thoughts as you go.
SUM: Strike through mistakes legibly; never erase or rewrite raw data.
SRC: Kanare H. M., Writing the Laboratory Notebook, American Chemical Society | secondary | 1985
SRC: Wilkinson M. D. et al., "The FAIR Guiding Principles for scientific data management and stewardship", Scientific Data 3, 160018 | guidance | 2016 | https://doi.org/10.1038/sdata.2016.18
EV: established | Notebook practice is standard in research; the FAIR principles are widely adopted for data.
Q: Why should a mistake be struck through rather than erased? | So the record stays complete and honest; the "mistake" may later turn out to matter.
M3@2: Which record lets another physicist reproduce a measurement best? | Raw readings with units, instrument models and settings, date, conditions and the method used | Only the final graph with its line of best fit | A one-line summary of the result and conclusion | The average value without units or uncertainty | Reproduction needs everything that could affect the result, not just the conclusion.
SA2@1: List four things a good notebook entry for a measurement should contain, and say why one of them matters. | Date and aim; apparatus with model numbers and settings; raw readings with units and uncertainties; conditions (temperature, time); problems and changes made. Settings matter because the same apparatus with different settings can give different results, which would make the work impossible to repeat. | date and aim ; apparatus and settings ; raw data with units ; conditions or problems ; a justified reason

## Experimental validation of physical models
S: A model is validated when its predictions agree with independent measurements within uncertainties across its claimed range. Validation includes testing assumptions, limiting cases, and predictions the model wasn't tuned to fit.
LV: Intermediate · Application
O: Test a model's predictions against independent data within uncertainties
O: Decide whether a discrepancy shows a failed model or an unaccounted error
PRE: Residual analysis
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
T: Validation | Showing that a model's predictions agree with independent measurements within uncertainties
T: Domain of validity | The range of conditions over which a model has been shown to hold
SUM: Agreement within uncertainty across the claimed range, with random residuals, validates a model there.
SUM: Before rejecting a model, check the uncertainties, systematic errors and assumptions.
SRC: Oberkampf W. L., Roy C. J., Verification and Validation in Scientific Computing, Cambridge University Press | secondary | 2010
SRC: Hughes I. G., Hase T. P. A., Measurements and their Uncertainties, Oxford University Press | secondary | 2010
EV: established | Validation within a stated domain is standard practice; no finite test proves a model everywhere.
Q: Why test a model at the edges of its claimed range? | That is where approximations fail first, so it's where disagreement would show.
M3@2,3: A pendulum model T = 2π√(l/g) fits within error for small amplitudes but T is 4% longer at 50°. What is the best conclusion? | The small-angle model is valid only for small amplitudes; at 50° the full nonlinear result is needed | The 50° measurement must be wrong, so remeasure it | g itself must change as the amplitude increases | The model must be wrong at every amplitude | The known correction T ≈ T_{0}(1 + θ_{0}^{2}/16) gives about 3–5% at 50°, matching the data.
SA2@2: Describe how you would validate a model predicting that a falling coffee filter reaches terminal velocity v_{t} ∝ √m. | Stack 1 to 8 filters to vary m, measure terminal velocity with a video or motion sensor from a height where speed is constant, repeat for each mass, and plot v_{t} against √m (or log v_{t} against log m, expecting gradient 0.5). Check that the line fits within error bars and that residuals are random. | vary mass systematically ; measure terminal velocity with repeats ; linearised plot ; check agreement and residuals
`;
