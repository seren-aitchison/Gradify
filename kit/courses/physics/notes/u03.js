// Unit 3: Measurement, Experimental Physics and Uncertainty. Format: kit/course/notes.js
export default `
## Measurement instruments and calibration
S: An instrument converts a physical quantity into a reading. Calibration compares its readings with a trusted standard so that the readings mean what they claim, and it links every measurement back to the SI through an unbroken chain (traceability).
O: Describe the range, resolution, sensitivity and loading of an instrument
O: Explain zero and gain errors and how calibration corrects them
O: Correct a reading using a two-point calibration
PRE: Uncertainty and measurement limitations
LV: GCSE and A level · Foundation
H: Choosing an instrument
- **Range**: the span it can measure. **Resolution**: the smallest change it can show.
- **Sensitivity**: output change per input change. **Linearity**: whether output ∝ input across the range.
- **Response time**, **loading** (does it disturb what it measures?) and **drift** (slow change over time).
- Typical resolutions: metre rule 1 mm; vernier caliper 0.02 mm; micrometer 0.01 mm; stopwatch 0.01 s (but human reaction time is about 0.2 s).
H: Calibration
- Measure known standards across the range and record readings against true values.
- Correct for **zero error** (an offset in every reading) and **gain error** (a wrong slope).
- Recalibrate at intervals and after damage; record the date and the standard used.
P: Traceability links your instrument to the SI: your thermometer is checked against a lab reference, which was checked by a national measurement institute (NPL in the UK, NIST in the USA), which realises the SI definition.
X: A thermometer reads 1.5 °C in melting ice and 98.0 °C in boiling water at 1 atm. What is the true temperature when it reads 50.0 °C?
> Scale factor = 100/(98.0 − 1.5) = 1.0363
> T = (50.0 − 1.5) × 1.0363 = 50.26 ≈ 50.3 °C
K: Calibration removes systematic error from an instrument; it is what makes a reading trustworthy, not the number of digits on the display.
!: A high-resolution digital display doesn't make an instrument accurate; an uncalibrated 6-digit meter can be wrong in the second digit.
T: Calibration | Comparing an instrument's readings with known standards and correcting them
T: Zero error | A non-zero reading when the true value is zero; it offsets every reading equally
T: Traceability | An unbroken, documented chain of calibrations linking a measurement to the SI
SUM: Choose an instrument for its range, resolution, sensitivity, speed and how little it disturbs the measurement.
SUM: Calibrate against standards to remove zero and gain errors, and keep the chain back to the SI.
EV: established | Calibration against traceable standards is the accepted basis for reliable measurement
SRC: OpenStax, College Physics 2e, section 1.3 "Accuracy, Precision, and Significant Figures" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures
SRC: AQA, A-level Physics specification (7408), section 8.3.4, Instruments and equipment | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is traceability? | An unbroken chain of calibrations linking a measurement back to national standards and the SI.
Q: What is a zero error? | A non-zero reading when the true value is zero; it offsets every reading.
M1@1: Which instrument has the best resolution for a 5 mm wire diameter? | Micrometer screw gauge | Metre rule | Vernier caliper | Tape measure | A micrometer resolves 0.01 mm, better than a vernier (0.02 mm) or a rule (1 mm).
M2@1: A voltmeter with low internal resistance connected across a high-resistance component will: | Read low, because it draws current and changes the circuit | Read high, because the meter adds its own voltage to the circuit | Read correctly, because voltmeters never affect circuits | Be damaged, because the current through it is too large | Loading: the meter in parallel lowers the effective resistance, so the voltage across the component falls.
NUM2@3: A balance reads 0.8 g with nothing on it and 100.8 g with a 100.0 g standard. What is the true mass when it reads 46.3 g? | 45.5 | 0.1 | g | The gain is correct (100.8 − 0.8 = 100.0 g for 100.0 g), so only the zero error applies: 46.3 − 0.8 = 45.5 g.
M3@2,3: A meter reads 0.0 at zero and 104 when the true value is 100. What is the true value for a reading of 52? | 50 | 52 | 48 | 54 | There is no zero error but a gain error of 1.04; true value = 52/1.04 = 50.
SA3@1,2: Explain why an expensive digital thermometer can still give inaccurate readings, and how you would check it. | Resolution and accuracy are different: many displayed digits only show small changes. The sensor may have a zero or gain error, or drift with age, so every reading is shifted. Check it against traceable standards, such as melting ice and boiling water or a calibrated reference thermometer, at points across the range, and correct the readings. | Resolution is not accuracy ; Zero or gain error, or drift ; Compare with known standards across the range ; Apply corrections and record calibration

## Accuracy, precision and resolution
S: Accuracy is how close a result is to the true value; precision is how closely repeated results agree; resolution is the smallest change an instrument can register. They are different things, and a good experiment needs all three.
O: Distinguish accuracy, precision and resolution
O: Choose a way to improve each one
O: Beat an instrument's resolution by measuring many units together
PRE: Measurement instruments and calibration
LV: GCSE and A level · Foundation
H: The dartboard picture
- Precise and accurate: a tight cluster on the bullseye.
- Precise but inaccurate: a tight cluster off-centre (a systematic error).
- Accurate but imprecise: a wide scatter centred on the bullseye (random error).
- Neither: a wide scatter off-centre.
H: How they're improved
- **Precision**: repeat and average, reduce noise, use better instruments.
- **Accuracy**: calibrate, remove systematic errors, compare methods.
- **Resolution**: use a finer instrument, or measure a larger quantity (time 20 swings, measure the thickness of 100 sheets).
E: resolution uncertainty ≈ ± half the smallest division (analogue) or ± 1 in the last digit (digital)
X: How can you find the thickness of one sheet of paper with a ruler?
> Measure a stack of 500 sheets: 50 ± 1 mm
> One sheet: 0.100 ± 0.002 mm, much better than the ruler's 1 mm resolution
K: Accuracy is about the centre of your results, precision about their spread; resolution limits the smallest difference you can see.
!: Precision isn't accuracy. Averaging a thousand readings from a miscalibrated instrument gives a very precise wrong answer.
T: Accuracy | How close a measurement or result is to the true value
T: Precision | How closely repeated measurements agree with one another
T: Resolution | The smallest change in a quantity that an instrument can show
SUM: Accuracy is closeness to the truth; precision is agreement between repeats; resolution is the finest step.
SUM: Calibration improves accuracy, repeats improve precision, and measuring many units together beats resolution.
EV: established | Accuracy, precision and resolution are distinct properties of a measurement
SRC: OpenStax, College Physics 2e, section 1.3 "Accuracy, Precision, and Significant Figures" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: Define accuracy and precision. | Accuracy: closeness to the true value. Precision: closeness of repeated measurements to each other.
Q: How can you beat an instrument's resolution? | Measure many identical units together (e.g. 20 oscillations, 100 sheets) and divide.
M1@1: Readings 4.31, 4.32, 4.31, 4.30 V when the true value is 5.00 V are: | Precise but inaccurate | Accurate but imprecise | Accurate and precise | Neither | The spread is only 0.02 V (precise) but the centre is 0.7 V from the true value (inaccurate).
M2@2: Which improves accuracy but not precision? | Correcting a calibration error | Taking more readings | Using a finer scale | Reducing electrical noise | Calibration removes a systematic offset; it doesn't reduce the scatter of repeated readings.
NUM2@3: Twenty swings of a pendulum take 31.4 s, timed with an uncertainty of 0.2 s. What is the uncertainty in one period, in seconds? | 0.01 | 0.001 | s | The uncertainty is shared over 20 swings: 0.2/20 = 0.01 s, so T = 1.570 ± 0.010 s.
TF1@1: A digital meter that shows more decimal places is always more accurate. | false | More digits mean finer resolution, not accuracy; an uncalibrated meter can display many digits and still be wrong.
M3@1,2: A student's repeat readings agree to 0.1% but differ from the accepted value by 3%. What should she do first? | Look for a systematic error, for example by recalibrating | Take many more readings to bring the mean closer | Switch to an instrument with more decimal places | Report the result, since the readings agree so well | Tight agreement with a large offset points to a systematic error, which repeats and finer scales can't remove.
SA2@1,2: Using a dartboard picture, explain the difference between accuracy and precision and say how each is improved. | Accuracy is how near the centre of the cluster is to the bullseye (the true value); precision is how tight the cluster is. A tight cluster off-centre is precise but inaccurate, caused by a systematic error, fixed by calibration or a better method. A wide scatter centred on the bullseye is accurate but imprecise, caused by random error, reduced by repeating and averaging. | Accuracy: centre near true value ; Precision: tightness of cluster ; Systematic error makes precise but inaccurate results ; Calibrate for accuracy, repeat for precision

## Random and systematic errors
S: Random errors scatter readings unpredictably either side of the true value; systematic errors shift all readings the same way. They need different remedies, and identifying which you have is half of good experimental practice.
O: Classify an error as random or systematic from its cause or its effect on data
O: Choose the right remedy for each type
O: Recognise a systematic error from a graph's intercept
PRE: Accuracy, precision and resolution
LV: GCSE and A level · Foundation
H: Random errors
- Causes: reading judgement, reaction time, electrical noise, fluctuating conditions.
- Show up as scatter; the uncertainty of the mean falls as 1/√n with n repeats.
- Estimated statistically from the spread of repeats.
H: Systematic errors
- Causes: zero error, calibration error, parallax at a fixed angle, heat loss in calorimetry, a meter loading the circuit, a wrong assumption in the method.
- Don't show up as scatter, and averaging doesn't help.
- Found by calibration, by changing the method or apparatus, or by a graph that misses the origin when theory says it shouldn't.
P: Systematic errors can be constant (a zero error adds the same amount to every reading) or proportional (a gain error scales every reading). A constant error moves a graph's intercept; a proportional one changes its gradient.
X: A plot of extension against load for a spring gives a straight line that crosses the extension axis at 3 mm. What does this suggest?
> Hooke's law predicts a line through the origin
> A constant 3 mm offset is a systematic (zero) error, perhaps from measuring length from the wrong point
> The gradient (and so the spring constant) is unaffected
K: Random errors are reduced by repeating and averaging; systematic errors are only removed by changing the method or calibrating.
!: Taking more repeats only reduces random error. If your result disagrees with an accepted value by many standard errors, look for a systematic error.
T: Random error | An unpredictable variation that scatters readings either side of the true value
T: Systematic error | A consistent shift of every reading in the same direction, by the same amount or proportion
SUM: Random errors cause scatter and shrink with averaging; systematic errors shift every reading and do not.
SUM: A non-zero intercept where theory predicts the origin is a classic sign of a systematic error.
EV: established | Random and systematic errors behave differently and need different remedies
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 1.3 "Accuracy, Precision, and Significant Figures" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures
Q: How can a graph reveal a systematic error? | A straight line that should pass through the origin has a non-zero intercept.
Q: Why doesn't averaging remove systematic error? | Every reading is shifted the same way, so the mean is shifted too.
M1@1: Parallax from always reading a scale from above is: | Systematic | Random | A resolution limit | Not an error | A consistent viewing angle shifts every reading the same way, so it is systematic.
M2@1,2: Reaction time when hand-timing a pendulum causes mostly: | Random error (plus some systematic delay) | Only systematic error, the same every time | No error at all once many swings are timed | A zero error in the stopwatch itself | Reaction times vary, scattering readings; timing many swings reduces their effect.
TF1@2: Repeating a measurement many times and averaging removes a zero error. | false | A zero error shifts every reading equally, so the average is shifted by the same amount; only correcting the zero removes it.
M3@3: A graph of V against I for a resistor is a straight line with a positive V-intercept of 0.05 V. What is the most likely explanation? | The voltmeter has a zero error | The resistor's resistance rises with current | Random errors in the current readings | The ammeter has too fine a resolution | Ohm's law predicts a line through the origin; a constant offset in V points to a zero error in the voltmeter.
SA2@1,2: A student measures g with a falling ball and gets 9.62, 9.65, 9.61 and 9.64 m s^{-2}. Comment on the errors and suggest improvements. | The readings agree closely, so random error is small, but they are all well below 9.81 m s^{-2}, which shows a systematic error. Possible causes are a delay in the timer release, air resistance, or measuring the drop height to the wrong point. Fix it by checking the release mechanism, measuring the height carefully from the bottom of the ball, using a denser ball, or plotting h against t^{2} so a constant time delay shows as an intercept instead of changing the gradient. | Small scatter means small random error ; Consistently low means systematic error ; Plausible cause such as release delay or height measurement ; A remedy that changes method, not more repeats

## Measurement uncertainty
S: Uncertainty is the range within which the true value is expected to lie, at a stated confidence. The international Guide to the Expression of Uncertainty in Measurement (GUM) gives a standard way to estimate and combine it.
O: Distinguish Type A and Type B evaluations of uncertainty
O: Combine standard uncertainties in quadrature and state an expanded uncertainty
O: Report a result with value, uncertainty, unit and coverage
PRE: Random and systematic errors
LV: Year 1 · Application
H: Type A and Type B
- **Type A**: evaluated statistically from repeated readings (the standard error of the mean).
- **Type B**: evaluated by other means: resolution, calibration certificates, manufacturer's specifications, judgement.
- Both are expressed as standard uncertainties u and combined in quadrature.
E: u_{c} = √(u_{A}^{2} + u_{B1}^{2} + u_{B2}^{2} + …) :: combined standard uncertainty
E: U = k u_{c}, k = 2 for about 95% confidence :: expanded uncertainty
E: u = a/√3 :: rectangular distribution of half-width a (e.g. a digital display's ±a)
H: Reporting
P: Give the value, its uncertainty, the unit and the coverage: "L = 25.43 ± 0.04 mm (k = 2)". Quote the uncertainty to 1 or 2 significant figures and the value to the same decimal place.
X: A digital caliper reads 25.43 mm (resolution 0.01 mm). Five repeats have standard error 0.02 mm. Find u_{c}.
> Resolution: a = 0.005 mm, u_{B} = 0.005/√3 = 0.003 mm
> u_{c} = √(0.02^{2} + 0.003^{2}) ≈ 0.020 mm; U (k = 2) = 0.04 mm
K: Every result needs an uncertainty: without it, nobody can tell whether two results agree.
!: "Error" is the (unknown) difference from the true value; "uncertainty" is your estimate of how big it could be. They aren't the same thing.
T: Standard uncertainty | An uncertainty expressed as a standard deviation
T: Expanded uncertainty | The combined standard uncertainty multiplied by a coverage factor k, giving a wider interval of stated confidence
T: Type B evaluation | Estimating an uncertainty from information other than repeated readings, such as resolution or a certificate
SUM: Evaluate Type A uncertainties from repeats and Type B from other information, then combine them in quadrature.
SUM: Quote value ± expanded uncertainty with unit and coverage factor.
EV: established | The GUM method of combining standard uncertainties is the international standard
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 1.3 "Accuracy, Precision, and Significant Figures" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures
Q: What is the difference between Type A and Type B uncertainty? | Type A comes from statistics of repeated readings; Type B from other information like resolution or calibration certificates.
Q: What does k = 2 mean in an expanded uncertainty? | About 95% coverage for a normal distribution.
M1@3: How should a result be reported? | Value ± uncertainty with units | The value only, to the digits shown | The uncertainty only, with its unit | The value to every digit the calculator gives | A reader needs the value, its uncertainty and the unit to judge and compare the result.
M2@1: A scale has ±0.5 mm reading limits treated as rectangular. What is the standard uncertainty? | 0.29 mm | 0.5 mm | 0.25 mm | 1.0 mm | For a rectangular distribution of half-width a, u = a/√3 = 0.5/√3 ≈ 0.29 mm.
NUM2@2: Two independent standard uncertainties of 0.30 V and 0.40 V contribute to a voltage. What is the combined standard uncertainty, in volts? | 0.50 | 0.01 | V | Combine in quadrature: √(0.30^{2} + 0.40^{2}) = √0.25 = 0.50 V.
M3@2,3: A combined standard uncertainty is 0.12 g. Which statement of the result at about 95% confidence is correct? | m = 12.46 ± 0.24 g (k = 2) | m = 12.46 ± 0.12 g (k = 2) | m = 12.5 ± 0.06 g (k = 2) | m = 12.4613 ± 0.24 g | U = k u_{c} = 2 × 0.12 = 0.24 g, and the value is rounded to the same decimal place as U.
SA3@1,2: Explain how you would estimate the uncertainty in a length measured five times with a digital caliper. | Find the mean of the five readings and the standard deviation; divide by √5 to get the standard error, a Type A uncertainty. Add a Type B uncertainty from the resolution (half the last digit divided by √3) and any calibration uncertainty. Combine them in quadrature to give u_{c}, multiply by k = 2 for about 95% confidence, and quote the mean ± U with the unit. | Standard error of the mean (Type A) ; Resolution and calibration (Type B) ; Combine in quadrature ; Expanded uncertainty with k and unit

## Absolute and relative uncertainty
S: Absolute uncertainty has the units of the quantity (± 0.2 cm); relative (fractional or percentage) uncertainty is the absolute uncertainty divided by the value. Absolute uncertainties combine for sums and differences; relative ones for products, quotients and powers.
O: Convert between absolute, fractional and percentage uncertainty
O: Choose which kind of uncertainty to combine for a given calculation
O: Explain why subtracting nearly equal quantities is risky
PRE: Measurement uncertainty
LV: GCSE and A level · Application
H: Definitions
E: fractional uncertainty = Δx/x; percentage uncertainty = 100 Δx/x
- 5.0 ± 0.1 cm: absolute 0.1 cm, fractional 0.02, percentage 2%.
- Relative uncertainty is dimensionless, so it compares precision across different quantities.
H: Which to use
- Adding or subtracting: combine absolute uncertainties.
- Multiplying, dividing or powers: combine relative uncertainties.
- Subtracting nearly equal numbers inflates the relative uncertainty enormously.
X: Two lengths, 50.0 ± 0.2 cm and 48.0 ± 0.2 cm, are subtracted.
> Difference = 2.0 cm; absolute uncertainty √(0.2^{2} + 0.2^{2}) = 0.3 cm (0.4 cm by the simple worst-case sum)
> Relative uncertainty jumps from 0.4% to about 14%
K: Sums and differences: add absolute uncertainties. Products, quotients and powers: add relative uncertainties.
!: Never quote a percentage uncertainty on a quantity that can be near zero (like a temperature in °C): the percentage is meaningless.
T: Absolute uncertainty | The uncertainty in the same units as the quantity
T: Percentage uncertainty | The absolute uncertainty as a percentage of the value
SUM: Absolute uncertainty carries units; relative uncertainty is a ratio or percentage.
SUM: Use absolute uncertainties for sums and differences, relative ones for products, quotients and powers.
EV: established | The rules for combining absolute and relative uncertainties follow from error propagation
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 1.3 "Accuracy, Precision, and Significant Figures" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures
Q: Which uncertainties combine for a quotient? | Relative (fractional) uncertainties.
Q: Why is subtracting nearly equal quantities risky? | The absolute uncertainty stays similar while the result becomes small, so the relative uncertainty becomes large.
M1@1: What is the percentage uncertainty of 8.0 ± 0.4 s? | 5% | 0.4% | 2% | 50% | Percentage uncertainty = 100 × 0.4/8.0 = 5%.
M2@2: A cube's side is 2.00 ± 0.02 cm. What is the percentage uncertainty in its volume? | 3% | 1% | 6% | 0.3% | The side has 1% uncertainty; cubing multiplies the relative uncertainty by 3, giving 3%.
NUM2@1,2: A resistance is found from V = 6.0 ± 0.3 V and I = 2.0 ± 0.1 A. Using the simple sum of percentages, what is the percentage uncertainty in R = V/I? | 10 | 0 | % | Each has 5% uncertainty; for a quotient add percentages: 5% + 5% = 10%.
M3@3: Two masses, 105 ± 1 g and 100 ± 1 g, are subtracted. What is the approximate percentage uncertainty in the difference (simple sum)? | 40% | 1% | 2% | 4% | The difference is 5 ± 2 g, so the relative uncertainty is 2/5 = 40%, even though each mass is known to about 1%.
SA2@2,3: A student finds the volume of a wire from its length (1.000 ± 0.001 m) and diameter (0.40 ± 0.01 mm). Explain which measurement limits the result and why. | Volume = πd^{2}l/4. The length has 0.1% uncertainty; the diameter has 2.5%, and because d is squared its contribution doubles to 5%. The diameter therefore dominates, so the student should improve it, for example by using a micrometer and averaging readings at several points along the wire. | Percentage uncertainties of each ; Squaring doubles the diameter's contribution ; Diameter dominates ; Sensible improvement to the diameter measurement

## Significant figures in experimental results
S: In experimental work significant figures follow the uncertainty, not the calculator. The uncertainty is quoted to one or two significant figures, and the result is rounded to the same decimal place.
O: Round an uncertainty and match the value to it
O: Record raw data to the instrument's resolution
O: Use guard digits in multi-step calculations
PRE: Significant figures and scientific notation
LV: GCSE and A level · Foundation
H: The rules
- Round the uncertainty to 1 s.f. (or 2 if its first digit is 1 or 2).
- Round the value to match: 9.8165 ± 0.0234 → 9.82 ± 0.02.
- Use scientific notation with the same power for both: (6.67 ± 0.05) × 10^{-11}.
- In tables, record raw data to the instrument's resolution and keep it consistent down a column.
H: When there's no stated uncertainty
- Treat the last quoted digit as uncertain.
- In multi-step calculations keep one or two extra digits (guard digits) until the end, so rounding errors don't build up.
P: Zeros need care. Leading zeros (0.0045) only place the decimal point and aren't significant; trailing zeros after a decimal point (4.50) are significant; in 4500 it is ambiguous, so write 4.5 × 10^{3} or 4.50 × 10^{3}.
X: A calculation gives a = 2.34567 m s^{-2} with uncertainty 0.1543 m s^{-2}.
> The uncertainty starts with 1, so keep two figures: 0.15
> a = 2.35 ± 0.15 m s^{-2}
K: The uncertainty decides how many figures the result deserves.
!: Writing 2.34567 ± 0.2 claims precision you don't have: the trailing digits are noise.
T: Significant figures | The digits of a number that carry meaning about its precision
T: Guard digit | An extra digit kept during a calculation and dropped only in the final answer
SUM: Round the uncertainty to 1 or 2 significant figures, then round the value to the same decimal place.
SUM: Record raw data to the instrument's resolution, consistently, and round only at the end.
EV: established | Matching the quoted digits to the uncertainty is standard practice
SRC: OpenStax, University Physics Volume 1, section 1.6 "Significant Figures" | secondary | 2016 | https://openstax.org/books/university-physics-volume-1/pages/1-6-significant-figures
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: How many significant figures should an uncertainty usually have? | One (or two if its first digit is 1 or 2).
Q: How do you choose the decimal places of the value? | Match the last decimal place of the rounded uncertainty.
M1@1: A result is 127.452 ± 3.8. How should it be written? | 127 ± 4 | 127.45 ± 3.8 | 130 ± 3.8 | 127.452 ± 4 | Round the uncertainty to 1 s.f. (4), then round the value to the units digit: 127 ± 4.
M2@2: In a results table, length readings should be recorded: | To the instrument's resolution, consistently | To 2 decimal places always, whatever the instrument | To as many digits as you can possibly estimate | Rounded to whole numbers to keep the table tidy | Recording to the resolution, consistently down a column, honestly shows how precise each reading is.
TF1@1: 0.0450 has three significant figures. | true | Leading zeros only place the decimal point; the trailing zero after 45 is significant, so there are three significant figures.
M3@1,3: A student rounds each step of a three-step calculation to 2 s.f. and gets 4.3; keeping guard digits gives 4.18 ± 0.05. What went wrong? | Rounding at each step built up an error larger than the uncertainty | The uncertainty was quoted to too many figures | Guard digits make the answer less accurate | Nothing: the two answers agree within uncertainty | Rounding early accumulates errors; 4.3 differs from 4.18 by more than twice the uncertainty, so round only at the end.
SA2@1,2: A calculator gives a density of 2713.846 kg m^{-3} with an uncertainty of 37.2 kg m^{-3}. Write the result correctly and explain your choices. | The uncertainty, 37.2, is rounded to one significant figure, 40 kg m^{-3}, because its first digit is 3. The value is then rounded to the same place (tens): 2710 kg m^{-3}. In standard form: (2.71 ± 0.04) × 10^{3} kg m^{-3}. Extra digits would claim precision the measurement doesn't have. | Uncertainty to 1 s.f. ; Value rounded to the same decimal place ; Same power of ten in standard form ; Reason: digits beyond the uncertainty are meaningless

## Propagation of uncertainty
S: When a result is calculated from measured quantities, their uncertainties propagate into the result. For independent errors you add contributions in quadrature using partial derivatives; simpler worst-case rules give upper bounds.
O: Apply the propagation rules for sums, products, powers and logarithms
O: Identify the dominant source of uncertainty in a result
O: Distinguish quadrature from worst-case combination
PRE: Absolute and relative uncertainty
LV: A level · Application
H: The general rule
E: σ_{f}^{2} = Σ (∂f/∂x_{i})^{2} σ_{i}^{2} :: independent variables
H: Common cases
E: f = a ± b: σ_{f} = √(σ_{a}^{2} + σ_{b}^{2})
E: f = ab or a/b: σ_{f}/f = √[(σ_{a}/a)^{2} + (σ_{b}/b)^{2}]
E: f = a^{n}: σ_{f}/f = n σ_{a}/a (magnitude of n)
E: f = ln a: σ_{f} = σ_{a}/a; f = e^{a}: σ_{f} = f σ_{a}
- At A level the worst-case (linear) sum is often used: add absolute or percentage uncertainties directly. It gives a slightly larger, safe estimate.
- Find the dominant source: the largest term in the sum. Improving anything else is wasted effort.
X: Density from m = 125.0 ± 0.5 g and a sphere's diameter d = 3.10 ± 0.02 cm.
> ρ = m/(πd^{3}/6) = 8.01 g cm^{-3}
> Relative: m 0.4%; d^{3}: 3 × 0.65% = 1.9%
> σ_{ρ}/ρ = √(0.4^{2} + 1.9^{2}) = 2.0%: ρ = 8.0 ± 0.2 g cm^{-3}. The diameter dominates.
K: A power multiplies a relative uncertainty by the exponent, so squared and cubed quantities usually dominate.
!: Quadrature addition assumes independent errors. If two inputs share a systematic error (same instrument), they're correlated and need a covariance term.
T: Propagation of uncertainty | Working out the uncertainty of a calculated result from the uncertainties of its inputs
T: Quadrature | Combining independent uncertainties as the square root of the sum of their squares
SUM: Absolute uncertainties combine for sums; relative ones for products; powers multiply the relative uncertainty.
SUM: Spend effort on the dominant uncertainty, the largest term in the sum.
EV: established | The partial-derivative propagation formula holds for small, independent uncertainties
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 1.3 "Accuracy, Precision, and Significant Figures" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-3-accuracy-precision-and-significant-figures
Q: What is the uncertainty rule for f = a^{n}? | The relative uncertainty is multiplied by the size of n.
Q: Why identify the dominant uncertainty? | Improving the largest contribution is the only effective way to reduce the total.
M1@2: Which variable dominates the uncertainty in g = 4π^{2}l/T^{2} if l has 0.2% and T has 0.5%? | T, contributing 1.0% | l, contributing 0.2% | Both contribute equally | π, which is rounded | T is squared, so its 0.5% doubles to 1.0%, five times the contribution of l.
M2@1: What is the uncertainty in ln(x) for x = 20 ± 1? | 0.05 | 1 | 0.5 | 3.0 | For f = ln x, σ_{f} = σ_{x}/x = 1/20 = 0.05 (no unit).
NUM2@1: The kinetic energy ½mv^{2} is found with m known to 1% and v to 2%. Using the simple sum of percentages, what is the percentage uncertainty in the energy? | 5 | 0 | % | v is squared, contributing 2 × 2% = 4%; add the 1% for m to get 5%.
M3@1,3: For independent inputs with relative uncertainties 3% and 4% in a product, what do quadrature and worst-case addition give? | 5% and 7% | 7% and 5% | 1% and 7% | 5% and 12% | Quadrature gives √(9 + 16) = 5%; the worst-case sum gives 3% + 4% = 7%, a safe upper bound.
SA3@1,2: The spring constant is found from k = 4π^{2}m/T^{2}, with m = 0.200 ± 0.001 kg and T = 0.89 ± 0.01 s. Find the percentage uncertainty in k and say how to improve the experiment. | The mass has 0.5% uncertainty; the period has 1.1%, doubled to 2.2% because T is squared. The total is about 2.7% (simple sum) or 2.3% (quadrature). The period dominates, so time many oscillations (for example 20) to cut its percentage uncertainty, rather than using a better balance. | Percentage uncertainty of m and T ; Doubling for T squared ; Combined total stated ; Improve the timing, the dominant term

## Error bars and confidence intervals
S: Error bars show the uncertainty of each data point on a graph; confidence intervals state the range within which a parameter lies at a given confidence. Both let readers judge whether results agree.
O: Draw error bars and use worst-fit lines to find the uncertainty in a gradient
O: Calculate a confidence interval for a mean, using Student's t for small samples
O: Judge whether two results agree within their uncertainties
PRE: Measurement uncertainty
LV: A level · Application
H: Error bars
- Usually ±1 standard uncertainty (68%); say so in the caption, since some fields use 2σ or 95%.
- Draw them vertically (y) and horizontally (x) where significant.
- Use them to draw lines of best and worst fit: the steepest and shallowest lines that pass through all the bars give the gradient's uncertainty.
E: Δm ≈ (m_{max} − m_{min})/2 :: gradient uncertainty from worst-fit lines
H: Confidence intervals
E: x̄ ± t σ_{x̄} :: t ≈ 1.96 for 95% with many readings; larger t for small samples (Student's t)
- A 95% confidence interval comes from a procedure that, repeated many times, would produce intervals containing the true value 95% of the time.
- Two results agree if their difference is within about 2 combined standard uncertainties; overlapping 1σ bars are only a rough sign.
X: Five readings have mean 12.40 and standard error 0.05. Give a 95% CI.
> With n = 5, t (4 degrees of freedom) = 2.78
> 12.40 ± 0.14
K: Compare results through their difference and its combined uncertainty, √(σ_{1}^{2} + σ_{2}^{2}), not by eye.
!: A 95% CI does not mean a 95% probability that this particular interval contains the true value in the frequentist sense; it's a statement about the procedure.
T: Error bar | A line through a plotted point showing the uncertainty in that value
T: Confidence interval | A range, computed from data, that would contain the true value in a stated fraction of repeated experiments
T: Worst-fit line | The steepest or shallowest straight line still consistent with all the error bars
SUM: Error bars show each point's uncertainty; worst-fit lines turn them into a gradient uncertainty.
SUM: A confidence interval is mean ± t × standard error; two results agree if they differ by less than about 2 combined σ.
EV: established | Error bars and confidence intervals are the standard way to show and compare uncertainty
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, Introductory Statistics 2e, section 8.1 "A Single Population Mean using the Normal Distribution" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/8-1-a-single-population-mean-using-the-normal-distribution
Q: How do worst-fit lines give a gradient uncertainty? | Draw the steepest and shallowest lines consistent with the error bars; half their difference estimates Δm.
Q: Why use Student's t for small samples? | The standard deviation is itself uncertain when n is small, widening the interval.
M1@1: Error bars on a graph usually represent: | The uncertainty in each data point | The range covered by each of the axes | The position of the best-fit line | The number of repeats at each point | They show each point's uncertainty; the caption should say whether they are 1σ or 2σ.
M2@3: Two results are 9.78 ± 0.02 and 9.84 ± 0.02. Are they consistent? | Only marginally: they differ by about 2.1 combined standard uncertainties | Yes, comfortably within one standard uncertainty of each other | They are identical once rounding is allowed for | Agreement can't be judged without the raw data | The difference is 0.06 and the combined σ is √(0.02^{2} + 0.02^{2}) = 0.028, so 0.06/0.028 ≈ 2.1σ.
NUM2@1: Worst-fit lines through error bars have gradients 2.60 and 2.20 N m^{-1}. What is the uncertainty in the gradient, in N m^{-1}? | 0.20 | 0.01 | N m^{-1} | Δm ≈ (m_{max} − m_{min})/2 = (2.60 − 2.20)/2 = 0.20 N m^{-1}.
M3@2: Why is a 95% confidence interval from 3 readings much wider than 2 standard errors? | With so few readings the spread is poorly known, so t is large (about 4.3) | Small samples always contain a systematic error | The standard error is undefined for 3 readings | The 95% level changes with the number of readings | Student's t for 2 degrees of freedom is 4.30, so the interval is ±4.3 standard errors.
SA2@1,3: Describe how to find a gradient and its uncertainty from a graph with error bars, and how you would decide whether it agrees with a theoretical value. | Plot the points with error bars and draw the best-fit line. Then draw the steepest and shallowest lines that still pass through all the error bars. The gradient uncertainty is about half the difference between their gradients. The result agrees with theory if the difference between the measured and theoretical gradients is within about two combined uncertainties. | Best-fit line through points ; Steepest and shallowest lines through all bars ; Uncertainty as half the difference ; Agreement test within about 2σ

## Repeatability and reproducibility
S: Repeatability is agreement between results under the same conditions (same person, apparatus, lab, short time); reproducibility is agreement under changed conditions (different people, methods, labs). Reproducibility is the stronger test of a result.
O: Distinguish repeatability from reproducibility
O: Explain why reproducibility exposes systematic errors
O: Interpret disagreements between independent measurements
PRE: Random and systematic errors
LV: GCSE and A level · Foundation
H: Repeatability
- Measured by repeated trials in one session.
- The spread estimates random error.
- Good repeatability doesn't guarantee correctness: the same systematic error repeats.
H: Reproducibility
- Requires a full, clear method so others can repeat it.
- Inter-laboratory comparisons find hidden systematic errors.
- The "reproducibility crisis" in some sciences comes from small samples, flexible analysis and publication bias.
P: Reproducibility depends on the record. A method written in enough detail (apparatus, settings, conditions, analysis) lets someone else repeat the work and either confirm the result or find what was different.
X: Measurements of the gravitational constant G in different labs disagree by more than their stated uncertainties.
> Each lab is repeatable to about 10 ppm
> Labs disagree by about 500 ppm: unidentified systematic errors
> This is why G remains the least well-known fundamental constant
K: A result is trusted when independent people, using different apparatus and methods, get the same answer within uncertainties.
!: Don't report repeatability as if it were the total uncertainty of your result.
T: Repeatability | Agreement between results obtained by the same method, person and apparatus over a short time
T: Reproducibility | Agreement between results obtained under changed conditions, such as different people, equipment or labs
SUM: Repeatability tests random error under fixed conditions; reproducibility tests the whole method.
SUM: Disagreement between labs beyond their uncertainties signals unrecognised systematic errors.
EV: established | Independent reproduction is the strongest everyday check on an experimental result
SRC: AQA, A-level Physics specification (7408), section 3.1.2, Limitation of physical measurements | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 1.1 "Physics: An Introduction" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-1-physics-an-introduction
Q: What is reproducibility? | Agreement of results obtained under changed conditions: different people, equipment, methods or labs.
Q: Why is reproducibility a stronger test than repeatability? | Changing conditions exposes systematic errors that repeat identically in one setup.
M1@1: Repeating a measurement 10 times in one session tests: | Repeatability | Reproducibility | Accuracy | Calibration | Same person, apparatus and session: that is repeatability, which estimates random error.
M2@2,3: Independent labs getting different G values beyond their errors indicates: | Unrecognised systematic errors | G varies with location | Random errors only | The SI is inconsistent | Results that each repeat well but disagree with one another point to systematic errors in some setups.
TF1@1: If your results are highly repeatable, they must also be accurate. | false | A systematic error repeats identically every time, so repeatable results can all be wrong by the same amount.
M3@2: Which change gives the strongest test of a surprising result? | Another lab repeats it with a different method and apparatus | You repeat it twenty more times on the same apparatus | You average your existing readings more carefully | A colleague rechecks your arithmetic on the same data | Changing people, method and apparatus exposes systematic errors that simple repeats can't reveal.
SA2@1,2: Explain the difference between repeatability and reproducibility, and why a published result should be reproducible. | Repeatability is how well results agree when the same person repeats the measurement with the same apparatus in the same conditions; it tests random error. Reproducibility is agreement when the conditions change: different people, apparatus, methods or labs. It matters because a systematic error in one setup repeats identically, so only independent reproduction can show that a result is not an artefact of that setup. | Repeatability: same conditions ; Reproducibility: changed conditions ; Systematic errors repeat in one setup ; Reproduction exposes them

## Experimental controls
S: A control removes alternative explanations for a result. Controlled variables are held fixed, control runs are made without the factor being tested, and blank or background measurements are subtracted.
O: Identify controlled variables and control measurements for an experiment
O: Correct data for background
O: Explain how randomisation and blind analysis reduce bias
PRE: Independent, dependent and controlled variables
LV: GCSE and A level · Application
H: Kinds of control
- **Controlled variables**: everything except the independent variable kept constant (temperature, wire length).
- **Control run / null measurement**: the same setup without the cause (no sample, source removed) to measure background.
- **Blind and double-blind**: analysts don't know which data are which, so expectations can't bias them.
- **Randomisation**: vary the order of measurements so slow drifts don't line up with the variable.
P: Background must be measured in the same conditions and for long enough: a background count is itself random, so a short background run adds its own uncertainty to every corrected reading.
X: Measuring the count rate from a radioactive source.
> Measure background with the source removed: 24 counts per minute
> With source: 350 counts per minute
> Corrected rate = 326 counts per minute
H: Blind analysis
P: Many large particle-physics experiments hide the final result (add a secret offset, or mask the signal region) until all cuts and corrections are fixed. This stops analysts unconsciously tuning the analysis towards an expected answer.
K: A control answers the question "would I have seen this anyway?"
!: Measuring in increasing order of the variable can confound it with drift (warming up, battery running down); randomise, or go up and back down.
T: Control measurement | A measurement made without the factor under test, to show what happens in its absence
T: Blind analysis | An analysis in which the result is hidden until the method is fixed
SUM: Hold controlled variables fixed, measure backgrounds, and subtract them.
SUM: Randomisation and blinding stop drift and expectation from producing a false effect.
EV: established | Controls, randomisation and blinding are standard defences against false results
SRC: AQA, A-level Physics specification (7408), section 8.3.2, Use and application of scientific methods and practices | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, Introductory Statistics 2e, section 1.4 "Experimental Design and Ethics" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-4-experimental-design-and-ethics
Q: What is a blind analysis? | An analysis where the result is hidden until the method is fixed, so expectations can't bias it.
Q: Why measure background count before using a radioactive source? | To subtract it from the source count rate.
M1@1: In measuring how wire resistance varies with length, a controlled variable is: | Temperature of the wire | Length | Resistance | The current reading | Resistance depends on temperature, so the wire's temperature must be kept fixed; length is the independent variable.
M2@3: Why randomise the order of measurements? | So slow drifts don't correlate with the independent variable | To make the data look more random on the graph | To reduce the resolution error of each reading | Because the SI rules require a random order | Randomising breaks the link between drift and the variable, so drift appears as scatter, not a false trend.
NUM1@2: A Geiger counter records 1530 counts in 5 minutes with a source and 125 counts in 5 minutes without it. What is the corrected count rate, in counts per minute? | 281 | 1 | counts per minute | Subtract the background: (1530 − 125)/5 = 1405/5 = 281 counts per minute.
M3@1,3: A heater's power is measured at 2, 4, 6, 8 and 10 V, in that order, as the room warms steadily. What is the risk? | The warming is confounded with the voltage, distorting the trend | Random error increases with voltage | The resolution of the voltmeter falls | Nothing, because temperature isn't the variable under test | Room temperature rises in step with V, so its effect can't be separated; randomise the order or go up and back down.
SA2@1,2: Plan the controls for an experiment measuring how the count rate from a gamma source varies with distance. | Keep the source, detector, counting time and the absorbing material between them fixed. Measure the background count with the source removed, for the same time, and subtract it from every reading. Measure distances in a random order or up and back down so drift in the detector isn't confused with distance. Repeat counts to estimate random scatter. | Controlled variables named ; Background measured and subtracted ; Randomised or reversed order ; Repeats for random error

## Independent, dependent and controlled variables
S: In an experiment you change the independent variable, measure the dependent variable, and keep the controlled variables constant. Clear variables make a fair test whose result can be attributed to one cause.
O: Identify the independent, dependent and controlled variables in an experiment
O: Choose a suitable range and number of values for the independent variable
O: Recognise confounding variables
PRE: Scientific reasoning and falsifiability
LV: GCSE and A level · Foundation
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
K: Change one thing, measure one thing, and keep everything else that matters fixed.
!: Correlation isn't causation. Without controlling confounders, a link between two variables doesn't show that one causes the other.
P: Not every variable can be controlled. If room temperature can't be fixed, measure and record it, so its effect can be estimated or ruled out later.
T: Independent variable | The quantity the experimenter deliberately changes
T: Dependent variable | The quantity measured in response to the change
T: Confounding variable | An uncontrolled factor that changes with the independent variable and could cause the effect
SUM: Independent on x, dependent on y; controlled variables are kept constant.
SUM: Use a wide range with enough points, more where the graph curves, and watch for confounders.
EV: established | Fair tests change one variable while controlling the others
SRC: AQA, A-level Physics specification (7408), section 8.3.2, Use and application of scientific methods and practices | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, Introductory Statistics 2e, section 1.4 "Experimental Design and Ethics" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/1-4-experimental-design-and-ethics
Q: Which variable goes on the x-axis? | The independent variable.
Q: What is a confounding variable? | An uncontrolled factor that changes along with the independent variable and could cause the observed effect.
M1@1: In a light-intensity vs distance experiment, distance is: | Independent | Dependent | Controlled | Confounding | The experimenter sets the distance and measures the intensity, so distance is the independent variable.
M2@2: Why take more readings where a graph curves? | To define the shape accurately where it changes most | To make the plotted graph look smoother | To reduce the systematic error in each reading | It's a convention with no real purpose | Curvature needs more points to be resolved; a straight section is fixed by few.
MATCH1@1: Match each quantity in a resistance–temperature experiment to its role. | Temperature of the wire = independent ; Resistance of the wire = dependent ; Length of the wire = controlled | Temperature is set, resistance is measured, and length is kept fixed because it would also change the resistance.
M3@3: Towns with more ice-cream sales have more sunburn cases. What is the best explanation? | Sunshine, a confounding variable, raises both | Ice cream makes skin more sensitive to sunlight | Sunburn makes people buy more ice cream | The data must contain a systematic error | Both rise with hot, sunny weather; the correlation doesn't show that one causes the other.
SA2@1,2: Identify the variables and describe a suitable range for an experiment to find how the current through a filament lamp depends on the potential difference across it. | Independent: potential difference, set with a variable supply or potentiometer. Dependent: current, measured with an ammeter. Controlled: the same lamp and connections, and allowing it to settle at each reading. Use at least 6–8 values from 0 V up to the lamp's rating, with more readings at low voltage where the graph curves most, and repeat each, including reversing the supply. | Independent: p.d. ; Dependent: current ; Controlled variables named ; Range from zero with more points where it curves

## Experimental design
S: Experimental design plans what to measure, how, and how many times, so that the result answers the question with the smallest uncertainty for the effort. Good design is decided before taking data.
O: Plan an experiment to test a stated model with a linearised graph
O: Use an uncertainty budget to decide where to spend effort
O: Explain why null methods and pilot runs improve experiments
PRE: Independent, dependent and controlled variables
LV: A level · Physical reasoning
H: The design process
- State the question and the model being tested (e.g. T ∝ √l).
- Identify variables, ranges and the measurement method for each.
- Estimate uncertainties in advance and find the dominant one.
- Choose a linearised plot to test the model (T^{2} against l).
- Plan controls, repeats, calibration and safety.
- Pilot run: check that the method works, then refine it.
H: Efficient design
- Spend effort on the dominant uncertainty.
- Use differential or null methods (balance bridges, comparison) to cancel systematic errors.
- Measure many cycles or large quantities to beat resolution.
- In multi-factor problems, factorial designs vary several factors systematically instead of one at a time.
P: A null method compares the unknown with a known quantity and adjusts until a detector reads zero. Because the detector only has to show "zero", its own calibration errors don't matter: a Wheatstone bridge or a potentiometer measures resistance or voltage this way.
X: Design an experiment to measure g with a pendulum to 0.5%.
> T = 2π√(l/g): σ_{g}/g = √[(σ_{l}/l)^{2} + (2σ_{T}/T)^{2}]
> With l = 1.000 ± 0.002 m (0.2%), need σ_{T}/T below about 0.2%
> Hand timing (0.2 s): time 50 swings (about 100 s) to reach 0.2%
K: Decide the analysis, and where the uncertainty will come from, before you take the data.
!: Don't decide what to measure or how to analyse it after looking at the data (p-hacking, the "garden of forking paths"); plan the analysis in advance.
T: Null method | A method that adjusts a known quantity until a detector reads zero, cancelling many systematic errors
T: Pilot run | A short trial of the method to find practical problems before the real measurements
T: Uncertainty budget | A table of every source of uncertainty and its contribution to the final result
SUM: Plan variables, ranges, a linearised test and an uncertainty budget before measuring.
SUM: Target the dominant uncertainty, use null methods, and pilot the method first.
EV: established | Planning against an uncertainty budget is standard experimental practice
SRC: AQA, A-level Physics specification (7408), section 8.3.2, Use and application of scientific methods and practices | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 21.5 "Null Measurements" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/21-5-null-measurements
Q: Why estimate uncertainties before doing an experiment? | To find the dominant source and plan where effort will reduce the final uncertainty.
Q: What is a null method? | A method that adjusts a known quantity until a detector reads zero, cancelling many systematic errors (like a Wheatstone bridge).
M1@1: To test T = 2π√(l/g) with a straight-line graph, plot: | T^{2} against l | T against l | T against l^{2} | ln T against l | T^{2} = (4π^{2}/g)l, a straight line through the origin with gradient 4π^{2}/g.
M2@3: What is the main purpose of a pilot run? | To test and refine the method before collecting final data | To obtain the final result quickly and save time | To calibrate the SI units used in the laboratory | To replace the need for repeated readings later | A pilot catches practical problems early, while the method can still be changed.
NUM3@2: A pendulum's period of about 2.0 s is hand-timed with an uncertainty of 0.2 s. How many complete swings must be timed for the period's percentage uncertainty to be 0.1%? | 100 | 0 | swings | 0.1% of 2.0 s is 0.002 s; spreading 0.2 s over n swings gives 0.2/n = 0.002, so n = 100.
M3@2: An uncertainty budget shows length 0.1%, timing 1.5%, and temperature effects 0.05%. Which improvement is most worthwhile? | Better timing, for example light gates or more cycles | A laser rangefinder for the length | A thermostat to control the temperature | More decimal places in the final calculation | Timing dominates; improving anything else barely changes the total uncertainty.
SA3@1,2: Plan an experiment to test whether the period of a mass–spring oscillator is proportional to √m and to find the spring constant. | Hang masses from 100 g to 600 g in steps and time 20 oscillations for each, three times, from the equilibrium position with a fiducial marker. Keep the spring and small amplitude fixed. Plot T^{2} against m: the model predicts a straight line through the origin with gradient 4π^{2}/k, so k = 4π^{2}/gradient. Estimate uncertainties first: timing dominates, so timing many oscillations is the key improvement. | Range of masses and repeats ; Timing many oscillations ; T squared against m as the linear test ; k from gradient, with uncertainty considered

## Calibration curves
S: A calibration curve maps an instrument's raw output to the true quantity using measurements of known standards. You then read unknowns off the curve, ideally by interpolation inside the calibrated range.
O: Build a calibration curve from standards and use it to find an unknown
O: Include the calibration's uncertainty in a result
O: Explain why extrapolation beyond the standards is risky
PRE: Measurement instruments and calibration
LV: A level · Application
H: Building one
- Measure several standards spanning the range of interest (at least 5, more if non-linear).
- Plot output (y) against known value (x); fit a line or smooth curve.
- Invert to find the unknown: x = (y − c)/m for a line.
- Report the calibration's uncertainty, which adds to the measurement uncertainty.
H: Examples
- Thermistor resistance → temperature.
- Spectrometer absorbance → concentration (Beer–Lambert law).
- Photodiode current → light power; strain gauge voltage → force.
P: Standards should be more accurate than the measurement you want, and treated exactly like unknowns (same temperature, same settling time), so that the curve describes the real measuring conditions.
X: A thermistor's calibration gives 2.50 kΩ at 20.0 °C and 2.00 kΩ at 25.0 °C. It now reads 2.20 kΩ. Estimate the temperature.
> Over this small range, interpolate linearly: the slope is −0.10 kΩ per °C
> T = 20.0 + (2.50 − 2.20)/0.10 = 23.0 °C
> Over wider ranges, fit the proper curve (ln R against 1/T is close to linear for a thermistor)
K: Interpolate inside the calibrated range; outside it the curve is only a guess.
!: Extrapolating a calibration curve beyond the measured standards is risky: many sensors become non-linear outside their calibrated range.
T: Calibration curve | A graph of instrument response against known standard values, used to convert readings to true values
T: Interpolation | Reading a value between measured calibration points
SUM: Measure standards across the range, fit the curve, then invert it to read unknowns.
SUM: The calibration fit adds its own uncertainty; don't extrapolate beyond the standards.
EV: established | Calibration curves are the standard way to convert sensor output into a measured quantity
SRC: AQA, A-level Physics specification (7408), section 8.3.3, Numeracy and the application of mathematical concepts in a practical context | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, University Physics Volume 2, section 1.2 "Thermometers and Temperature Scales" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-2-thermometers-and-temperature-scales
Q: What is a calibration curve? | A graph of instrument response against known standard values, used to convert readings to true values.
Q: Why avoid extrapolating calibration curves? | The response may be non-linear outside the calibrated range.
M1@1: A sensor gives y = 2.0x + 0.5 from calibration. A reading y = 6.5 corresponds to: | x = 3.0 | x = 13.5 | x = 3.5 | x = 2.5 | Invert the line: x = (6.5 − 0.5)/2.0 = 3.0.
M2@2: The uncertainty of a value read from a calibration curve includes: | Both the measurement and the calibration fit uncertainties | Only the uncertainty of the new measurement | Only the uncertainty of the standards used | Neither, since the curve removes all error | Both contribute: the new reading's scatter and the uncertainty in the fitted curve itself.
NUM2@1: A pressure sensor gives 0.40 V at 0 kPa and 2.40 V at 200 kPa, linearly. What pressure gives 1.15 V, in kPa? | 75 | 1 | kPa | The slope is 2.00 V per 200 kPa = 0.010 V per kPa; p = (1.15 − 0.40)/0.010 = 75 kPa.
M3@3: A thermocouple is calibrated from 0 °C to 100 °C and then used to read 400 °C. What is the main problem? | Its response may be non-linear beyond 100 °C, so the reading is unreliable | The thermocouple's resolution is too fine at that temperature | Random error is always larger at high temperature | Nothing, if the calibration line was very straight | Extrapolation assumes the response stays linear far outside the standards, which is often false.
SA2@1,2: Describe how to calibrate a thermistor for use as a thermometer between 0 °C and 80 °C, and how you would then use it. | Place the thermistor and a calibrated thermometer together in a stirred water bath and record resistance at about 8–10 temperatures from 0 °C to 80 °C, letting each settle. Plot R against T (or ln R against 1/T, which is nearly linear) and fit a curve. To measure an unknown temperature, read the resistance and convert using the fitted curve, quoting an uncertainty that includes the calibration fit, and stay inside 0–80 °C. | Standards across the full range ; Same conditions with settling time ; Fit a curve, ideally linearised ; Read unknowns by interpolation with calibration uncertainty

## Linearisation of experimental relationships
S: Straight lines are easy to test and fit. Linearisation transforms a suspected relationship into the form y = mx + c, so a straight-line graph confirms the model and the gradient and intercept give its constants.
O: Choose axes that turn a power law, exponential or reciprocal relation into a straight line
O: Extract physical constants from the gradient and intercept
O: Transform error bars correctly
PRE: Exponential and logarithmic functions
LV: A level · Application
H: Standard transforms
E: y = kx^{n}: plot log y against log x; gradient n, intercept log k
E: y = Ae^{kx}: plot ln y against x; gradient k, intercept ln A
E: T = 2π√(l/g): plot T^{2} against l; gradient 4π^{2}/g
E: 1/f = 1/u + 1/v: plot 1/v against 1/u; gradient −1, intercept 1/f
E: I = I_{0}e^{−μx}: plot ln I against x; gradient −μ
H: Why linearise
- The eye spots deviations from a line easily (curvature reveals a wrong model).
- Least-squares line fitting is simple and gives uncertainties in m and c.
- The intercept tests for systematic errors (should the line pass through the origin?).
P: To decide between a power law and an exponential, try both: a power law is straight on log y against log x, an exponential is straight on ln y against x. Only one of them will be straight if the data are good enough.
X: Data for the energy E stored against voltage V on a capacitor are thought to follow E = ½CV^{2}.
> Plot E against V^{2}: a straight line through the origin
> Gradient = C/2, so C = 2 × gradient
K: Rearrange the model into y = mx + c, put the measured combination on each axis, and read the constants from m and c.
!: Transforming data also transforms its uncertainties: error bars on ln y are σ_{y}/y, not σ_{y}.
T: Linearisation | Rearranging a relationship so that a graph of suitable quantities is a straight line
T: Log–log plot | A graph of log y against log x, whose gradient gives the exponent of a power law
SUM: Choose axes so the model becomes y = mx + c; gradient and intercept then give the constants.
SUM: A straight line supports the model; transform the error bars along with the data.
EV: established | Linearised plots are a standard way to test models and extract constants
SRC: AQA, A-level Physics specification (7408), section 8.3.3, Numeracy and the application of mathematical concepts in a practical context | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 2.8 "Graphical Analysis of One-Dimensional Motion" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/2-8-graphical-analysis-of-one-dimensional-motion
Q: What graph tests y = kx^{n} and finds n? | log y against log x; the gradient is n.
Q: What are the error bars on ln y? | σ_{y}/y (the fractional uncertainty of y).
M1@1: To find the decay constant from A = A_{0}e^{−λt}, plot: | ln A against t | A against t | A against ln t | 1/A against t | ln A = ln A_{0} − λt, a straight line with gradient −λ.
M2@1,2: A log-log plot of power against frequency has gradient 3. The relationship is: | P ∝ f^{3} | P ∝ e^{3f} | P ∝ 3f | P ∝ ln f^{3} | log P = 3 log f + constant, so P = kf^{3}: the gradient of a log–log plot is the exponent.
NUM2@2: A graph of T^{2} against l for a pendulum has gradient 4.02 s^{2} m^{-1}. What value of g does it give, in m s^{-2}? | 9.82 | 0.02 | m s^{-2} | The gradient is 4π^{2}/g, so g = 4π^{2}/4.02 = 39.48/4.02 = 9.82 m s^{-2}.
M3@3: y = 20 ± 2 is plotted as ln y on a graph. What is the error bar on ln y? | ± 0.1 | ± 2 | ± ln 2 = 0.69 | ± 0.2 | The error in ln y is σ_{y}/y = 2/20 = 0.1, independent of the units of y.
SA3@1,2: The intensity of gamma rays is thought to fall as I = I_{0}e^{−μx} with absorber thickness x. Explain how to test this with a graph and find μ. | Take logs: ln I = ln I_{0} − μx. Plot ln I (corrected for background) against x. If the model holds the points lie on a straight line; the gradient is −μ and the intercept ln I_{0}. Error bars on ln I are the fractional uncertainty σ_{I}/I. Curvature would show the model is wrong, for example from scattered radiation or a mixture of energies. | Take natural logs ; ln I against x is linear ; Gradient = −μ ; Transformed error bars or check for curvature

## Least-squares fitting
S: Least squares finds the line (or curve) that minimises the sum of squared vertical distances between data and model. It's the standard, statistically justified way to fit data, and it gives uncertainties in the fitted parameters.
O: State what least-squares fitting minimises and the assumptions behind it
O: Calculate a least-squares gradient for simple data
O: Explain when weighting is needed
PRE: Linearisation of experimental relationships
LV: Year 1 · Application
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
K: Least squares chooses the parameters that make the squared residuals, weighted by their uncertainties, as small as possible.
!: A fit always gives numbers, even for the wrong model. Check residuals and χ^{2} before trusting the parameters.
T: Least squares | Choosing model parameters that minimise the sum of squared residuals
T: Chi-squared | The sum of squared residuals each divided by its variance, Σ(r_{i}/σ_{i})^{2}
SUM: Least squares minimises the sum of squared vertical residuals; the line passes through the centroid.
SUM: Weight by 1/σ^{2} when points have different uncertainties, and check the fit afterwards.
EV: established | Least squares gives maximum-likelihood fits for independent Gaussian errors
SRC: OpenStax, Introductory Statistics 2e, section 12.3 "The Regression Equation" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
SRC: AQA, A-level Physics specification (7408), section 8.3.3, Numeracy and the application of mathematical concepts in a practical context | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What point does a least-squares line always pass through? | The centroid (x̄, ȳ).
Q: Why weight points by 1/σ^{2}? | More precise points should have more influence on the fit.
M1@1: Least squares minimises: | The sum of squared vertical residuals | The plain sum of the residuals | The largest single residual | The sum of horizontal distances | Squaring stops positive and negative residuals cancelling, and matches a Gaussian likelihood.
M2@1: Least squares with Gaussian errors gives parameters that are: | Maximum-likelihood estimates | Always exactly the true values | Biased by the way they are designed | Only valid for straight lines | Minimising χ^{2} maximises the Gaussian likelihood of the data.
NUM2@2: Fit y = mx through the origin to (1, 3.1), (2, 5.8), (3, 9.2). What is m, to 2 decimal places? | 3.02 | 0.01 | – | m = Σxy/Σx^{2} = (3.1 + 11.6 + 27.6)/14 = 42.3/14 = 3.02.
M3@3: One point has an uncertainty ten times smaller than the others. In a weighted fit its weight relative to them is: | 100 times larger | 10 times larger | The same | 10 times smaller | Weights are 1/σ^{2}, so a tenfold smaller σ gives a hundredfold larger weight.
SA2@1,3: Explain the assumptions of an ordinary least-squares straight-line fit and what to do if they fail. | Ordinary least squares assumes the uncertainty is in y only, that errors are independent, normally distributed and of equal size. If uncertainties differ between points, use a weighted fit with weights 1/σ^{2}. If x also has significant uncertainty, use an effective-variance or orthogonal method. If outliers are present, investigate them or use a robust method, and always check the residuals. | Errors in y only ; Independent, Gaussian, equal errors ; Weighting for unequal errors ; Handle x errors or outliers, check residuals

## Regression analysis
S: Regression models how a dependent variable depends on one or more predictors, estimates the model's parameters, and quantifies how well it fits. In physics it's how theory meets data quantitatively.
O: Interpret R^{2} and reduced chi-squared for a fit
O: Distinguish linear from non-linear regression
O: Judge whether an extra fit parameter is justified
PRE: Least-squares fitting
LV: Year 2 · Application
H: Measures of fit
E: R^{2} = 1 − SS_{res}/SS_{tot} :: fraction of variance explained
E: χ^{2}_{ν} = χ^{2}/(N − p) :: reduced chi-squared, about 1 for a good fit with correct errors
- Parameter uncertainties come from the covariance matrix of the fit.
- Correlated parameters (like slope and intercept) need their covariance when propagating.
H: Types
- Linear regression: linear in the parameters, even if not in x (e.g. y = a + bx + cx^{2}).
- Non-linear regression: iterative fitting (e.g. Levenberg–Marquardt) for y = A e^{−kt} + B.
- Multiple regression: several predictors.
- Model selection: compare models with Δχ^{2}, F-tests, or information criteria (AIC, BIC) that penalise extra parameters.
X: A quadratic fit improves χ^{2} from 25 to 22 with one extra parameter and 20 data points. Is the extra term justified?
> Δχ^{2} = 3 for one extra parameter
> Rough rule: Δχ^{2} greater than about 4 (2σ) is needed; here it isn't clearly justified
K: A good fit has residuals comparable with the uncertainties (χ^{2}_{ν} ≈ 1) and no pattern; extra parameters must earn their place.
!: R^{2} close to 1 doesn't prove a model right; a straight line can have R^{2} = 0.99 through data that are clearly curved.
T: Reduced chi-squared | χ^{2} divided by the number of degrees of freedom, N − p
T: Overfitting | Using so many parameters that the model fits noise rather than the underlying relationship
SUM: χ^{2}_{ν} ≈ 1 means the model and the error bars are consistent; much larger or smaller signals a problem.
SUM: "Linear" regression means linear in the parameters; extra parameters must reduce χ^{2} significantly.
EV: established | Chi-squared and information criteria are standard tools for judging fits
SRC: OpenStax, Introductory Statistics 2e, section 12.4 "Testing the Significance of the Correlation Coefficient" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/12-4-testing-the-significance-of-the-correlation-coefficient
SRC: OpenStax, Introductory Statistics 2e, section 12.3 "The Regression Equation" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/12-3-the-regression-equation
Q: What is reduced χ^{2}, and what value indicates a good fit? | χ^{2} divided by degrees of freedom; about 1.
Q: Why do information criteria penalise extra parameters? | To avoid overfitting: more parameters always reduce χ^{2}.
M1@1: A fit has χ^{2}_{ν} = 0.1. This suggests: | Uncertainties are overestimated | An excellent model with correct errors | The model has the wrong shape | The model has too few parameters | Residuals are much smaller than the claimed error bars, so the error bars are probably too large.
M2@2: y = a + bx + cx^{2} is a ___ regression problem. | Linear (linear in a, b, c) | Non-linear, because the curve is a parabola | Logistic, because it has three parameters | Impossible to fit by least squares | "Linear" refers to the parameters, so ordinary least squares solves it directly.
TF2@1: A fit with R^{2} = 0.99 proves that the model is correct. | false | Curved data can still give R^{2} = 0.99 for a straight line; look at the residuals and χ^{2} as well.
M3@1,3: A straight-line fit to 12 points gives χ^{2} = 40 with 2 parameters. What does this most likely mean? | The model is wrong or the error bars are too small | The fit is excellent and the errors are correct | The error bars are overestimated | There are too few points to judge | χ^{2}_{ν} = 40/10 = 4, well above 1: the residuals are larger than the uncertainties allow.
SA3@1,3: Explain how you would decide between a straight-line and a quadratic model for a data set with known uncertainties. | Fit both by weighted least squares and compare χ^{2} values and their reduced values. The quadratic always gives a lower χ^{2} because it has an extra parameter, so it is only justified if χ^{2} falls by significantly more than about 1 (e.g. more than 4, around 2σ). Check the residuals of the straight line for a systematic curve, and prefer the simpler model if the improvement is small, or use AIC or BIC. | Fit both models ; Compare chi-squared and reduced values ; Extra parameter must give a significant drop ; Check residual patterns, prefer the simpler model

## Residual analysis
S: Residuals are the differences between data and the fitted model. Plotting them reveals what summary statistics hide: the wrong model, outliers, changing uncertainties or drifts.
O: Calculate and plot residuals and normalised residuals
O: Diagnose a wrong model, unequal errors, outliers or drift from a residual plot
O: Decide responsibly how to treat an outlier
PRE: Least-squares fitting
LV: Year 1 · Application
H: What to look for
- **Random scatter about zero** with constant spread: a good fit.
- **A curve or trend**: the model has the wrong shape (e.g. fitting a line to quadratic data).
- **Funnel shape**: uncertainty changes with x (needs weighting).
- **Isolated large residuals**: outliers; investigate before removing.
- **Runs or patterns in time order**: drift or correlated errors.
E: r_{i} = y_{i} − f(x_{i}); normalised residual r_{i}/σ_{i}
H: Interpreting the plot
P: About 68% of normalised residuals should lie within ±1 and 95% within ±2 if the model and errors are right.
X: Residuals from a linear fit to a cooling curve are positive at both ends and negative in the middle.
> A systematic U shape means the data curve (exponential cooling)
> Fit the right model: T = T_{room} + ΔT e^{−kt}
K: A good model leaves residuals that look like pure noise: centred on zero, the right size, and with no pattern.
!: Don't delete outliers just because they're inconvenient. Have a physical reason (a recorded mistake) or use a pre-agreed rule, and report it.
T: Residual | The difference between a measured value and the model's prediction at that point
T: Normalised residual | A residual divided by its uncertainty, so a good fit gives values mostly between −2 and +2
T: Outlier | A point that lies much further from the model than its uncertainty allows
SUM: Plot residuals against x (and time): patterns reveal a wrong model, unequal errors or drift.
SUM: Investigate outliers; remove one only with a recorded reason or a rule set in advance.
EV: established | Residual plots are a standard diagnostic for fitted models
SRC: OpenStax, Introductory Statistics 2e, section 12.6 "Outliers" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/12-6-outliers
SRC: OpenStax, Introductory Statistics 2e, section 12.2 "Scatter Plots" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/12-2-scatter-plots
Q: What does a curved residual pattern mean? | The fitted model has the wrong functional form.
Q: What fraction of normalised residuals should lie within ±2? | About 95%.
M1@2: Residuals that widen as x increases indicate: | Uncertainty growing with x | A perfect fit to the data | A zero error in the instrument | Too many data points | A funnel shape means unequal (heteroscedastic) errors, so the fit should be weighted by 1/σ^{2}.
M2@3: A single residual of 6σ appears. The best response is: | Check the record for a mistake before deciding | Delete it immediately and refit the data | Ignore it, since one point barely matters | Refit with a higher-order polynomial | Investigate first; remove the point only with a physical justification, and report what you did.
NUM1@1: A model predicts y = 12.0 where the measurement is 12.9 ± 0.3. What is the normalised residual? | 3 | 0.1 | – | (12.9 − 12.0)/0.3 = 3.0, a point three standard uncertainties above the model.
M3@2: Residuals plotted in the order the data were taken rise steadily from negative to positive. What does this suggest? | A drift in the apparatus during the run | The model has too many parameters | The uncertainties are overestimated | The fit is perfect | A trend in time order points to drift (e.g. warming), which the model doesn't include.
SA2@1,2: A straight line is fitted to data for the period of a pendulum against amplitude. Describe what the residual plot would show if the true relationship were slightly curved, and what you would do. | The residuals would not scatter randomly about zero: they would form a systematic curve, for example positive at both ends and negative in the middle. This shows the straight line has the wrong form. Fit a model with the right shape (for example including an amplitude-squared term), check the new residuals are random, and compare χ^{2} values. | Systematic pattern rather than random scatter ; Shape described ; Model has wrong form ; Refit a better model and recheck residuals

## Hypothesis testing
S: Hypothesis testing asks whether data are consistent with a null hypothesis (no effect, or the standard model). If data this extreme would be very unlikely under the null, you reject it in favour of the alternative.
O: Set up null and alternative hypotheses and calculate a z-score
O: Interpret a p-value correctly
O: Distinguish Type I and Type II errors and explain power
PRE: Probability distributions
LV: Year 1 · Application
H: The procedure
- State the null hypothesis H_{0} (e.g. no new particle) and the alternative H_{1}.
- Choose a test statistic (χ^{2}, a z-score, a likelihood ratio) and a significance level α (e.g. 0.05, or 5σ in particle physics).
- Compute the p-value: the probability, if H_{0} is true, of data at least as extreme.
- Reject H_{0} if p < α.
E: z = (x̄ − μ_{0})/σ_{x̄} :: how many standard errors from the null value
H: Errors
- **Type I**: rejecting a true H_{0} (false positive), probability α.
- **Type II**: failing to reject a false H_{0} (false negative), probability β; power = 1 − β.
- Larger samples increase power.
X: A measured g = 9.70 ± 0.04 m s^{-2}. Is it consistent with 9.81?
> z = (9.81 − 9.70)/0.04 = 2.75
> p ≈ 0.006 (two-sided): inconsistent at the 5% level; look for a systematic error
K: A small p-value says the data would be surprising if H_{0} were true; it doesn't measure how big or important the effect is.
!: The p-value is not the probability that H_{0} is true. It's the probability of the data (or more extreme) given H_{0}.
T: Null hypothesis | The default claim being tested, usually "no effect" or "the standard value"
T: p-value | The probability, assuming H_{0} is true, of a result at least as extreme as the one observed
T: Power | The probability that a test correctly rejects a false null hypothesis, 1 − β
SUM: Compute a test statistic and its p-value; reject H_{0} if p is below the chosen α.
SUM: Type I is a false positive (rate α); Type II a false negative; more data raise power.
EV: established | Significance testing is a standard, if often misinterpreted, statistical tool
SRC: OpenStax, Introductory Statistics 2e, section 9.1 "Null and Alternative Hypotheses" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/9-1-null-and-alternative-hypotheses
SRC: OpenStax, Introductory Statistics 2e, section 9.2 "Outcomes and the Type I and Type II Errors" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/9-2-outcomes-and-the-type-i-and-type-ii-errors
Q: What is a p-value? | The probability, if the null hypothesis is true, of getting data at least as extreme as observed.
Q: What is a Type I error? | Rejecting a null hypothesis that is actually true (a false positive).
M1@3: Increasing the sample size mainly increases: | The power of the test | The significance level α | The p-value, in every case | The systematic error | More data reduce the standard error, so real effects become easier to detect.
M2@2: p = 0.03 means: | Data this extreme would occur 3% of the time if H_{0} were true | H_{0} has a 3% chance of being true | H_{1} has a 97% chance of being true | The effect is 3% of the expected value | A p-value is a statement about the data given H_{0}, not about the probability of a hypothesis.
NUM2@1: A measured speed of sound is 337 ± 2 m s^{-1}; the accepted value is 343 m s^{-1}. What is the z-score (magnitude)? | 3 | 0.1 | – | z = (343 − 337)/2 = 3.0, so the result is three standard uncertainties from the accepted value.
M3@3: A test is run at α = 0.05 on 100 true null hypotheses. About how many will be wrongly rejected? | 5 | 0 | 95 | 50 | α is the Type I error rate: about 5% of true nulls are rejected by chance.
SA3@1,2: A student measures g = 9.70 ± 0.04 m s^{-2}. Set up a hypothesis test against 9.81 m s^{-2} and state the conclusion. | H_{0}: the experiment measures g = 9.81 m s^{-2} (no systematic error); H_{1}: it does not. z = (9.81 − 9.70)/0.04 = 2.75. The two-sided p-value is about 0.006, below α = 0.05, so H_{0} is rejected: the result is inconsistent with 9.81, suggesting a systematic error (such as timing delay or air resistance) rather than chance. | Null and alternative stated ; z-score calculated ; p-value compared with alpha ; Conclusion in context

## Statistical significance
S: A result is statistically significant when chance alone is an unlikely explanation. Physics quantifies this in standard deviations ("sigma"), with 5σ the conventional threshold for claiming a discovery in particle physics.
O: Convert between sigma levels and p-values
O: Explain the look-elsewhere effect and why 5σ is used
O: Distinguish statistical significance from practical importance
PRE: Hypothesis testing
LV: Year 1 · Physical reasoning
H: Sigma levels
- 1σ: p ≈ 0.32 (two-sided); 2σ: 0.046; 3σ: 0.0027 ("evidence"); 5σ: 5.7 × 10^{-7} two-sided (2.9 × 10^{-7} one-sided, "discovery").
- Particle physics uses 5σ because of the look-elsewhere effect, unrecognised systematic errors, and past false alarms at 3–4σ.
H: Look-elsewhere effect
P: If you search for a bump at many masses, a 3σ fluctuation somewhere is likely. The local significance must be corrected to a global one that accounts for all the places you looked.
H: Significance versus importance
- A tiny, unimportant effect can be highly significant with enough data.
- A large effect can be non-significant with too little data.
- Always report the effect size and its uncertainty, not just p.
X: The Higgs boson announcement (2012).
> ATLAS and CMS each saw an excess near 125 GeV at about 5σ
> Two independent experiments, the same mass: a discovery, later confirmed with much more data
K: Significance tells you whether an effect is likely to be real; the effect size and its uncertainty tell you whether it matters.
!: The 2015–16 "750 GeV diphoton" excess reached about 3–4σ locally and vanished with more data, a reminder of why 5σ is required.
T: Statistical significance | The degree to which a result is unlikely to be due to chance alone, often stated in σ
T: Look-elsewhere effect | The increased chance of a large fluctuation somewhere when many places are searched
SUM: 3σ is "evidence" and 5σ "discovery" in particle physics; each σ level corresponds to a p-value.
SUM: Correct for the look-elsewhere effect, and always report effect size with uncertainty.
EV: established | The 5σ discovery convention is standard in particle physics
SRC: OpenStax, Introductory Statistics 2e, section 9.4 "Rare Events, the Sample, Decision and Conclusion" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/9-4-rare-events-the-sample-decision-and-conclusion
SRC: OpenStax, Introductory Statistics 2e, section 9.2 "Outcomes and the Type I and Type II Errors" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/9-2-outcomes-and-the-type-i-and-type-ii-errors
Q: What significance is required for a discovery in particle physics? | 5σ.
Q: What is the look-elsewhere effect? | Searching many places raises the chance of a large fluctuation somewhere, so local significance must be corrected.
M1@1: Roughly what is the two-sided p-value for 2σ? | 0.05 | 0.32 | 0.003 | 0.5 | About 4.6% of a normal distribution lies more than 2σ from the mean, so p ≈ 0.05.
M2@3: A very large dataset finds a statistically significant but tiny effect. This means: | It's probably real but may not matter practically | It must be important, because it is significant | It must be an error caused by the large sample | p-values don't apply to large datasets | Significance and importance differ: with enough data, even negligible effects become significant.
TF1@1: A 3σ result has a smaller p-value than a 2σ result. | true | The further a result lies from the null value in standard deviations, the less likely it is by chance: about 0.003 against 0.05.
M3@2: A search scans 100 independent mass bins and finds one 3σ local excess. Why is this weak evidence? | About 0.3 such excesses are expected by chance across 100 bins, so one isn't surprising | A 3σ result is always a systematic error | Local significance is always higher than 5σ | The look-elsewhere effect only applies to 5σ results | With p ≈ 0.0027 per bin, 100 bins give about a 24% chance of at least one 3σ fluctuation.
SA3@2,3: Explain why particle physicists require 5σ before claiming a discovery, using the idea of the look-elsewhere effect. | A 5σ result has a p-value of about 3 × 10^{-7}: background alone would produce it very rarely. A lower threshold is risky because searches look at many masses and channels, so a 3σ fluctuation somewhere is likely (the look-elsewhere effect). Unknown systematic errors also make p-values less reliable than they look, and several 3–4σ excesses, such as the 750 GeV diphoton bump, have disappeared with more data. Independent confirmation by a second experiment adds further confidence. | p-value of 5 sigma ; Many places searched raises chance fluctuations ; Systematic errors and past false alarms ; Independent confirmation

## Instrument response and sensitivity
S: An instrument's response describes how its output follows its input: how much (sensitivity), how linearly, how fast (time response) and over which frequencies (bandwidth). Knowing it lets you correct readings and pick the right instrument.
O: Calculate sensitivity from calibration data
O: Use the time constant of a first-order sensor to predict its response to a step
O: Relate time constant to bandwidth
PRE: Measurement instruments and calibration
LV: Year 1 · Application
H: Static characteristics
- **Sensitivity** S = Δoutput/Δinput (e.g. 10 mV per °C).
- **Linearity**, **hysteresis** (different readings going up and down), **offset** and **drift**.
- **Dynamic range**: the ratio of largest to smallest measurable signal.
H: Dynamic response
E: y(t) = y_{∞}(1 − e^{−t/τ}) :: first-order sensor (thermometer) after a step change
E: f_{−3dB} = 1/(2πτ) :: bandwidth of a first-order system
- Second-order instruments (galvanometers, accelerometers) can ring; damping is chosen near critical.
- A sensor slower than the signal smooths it out and lags behind it.
X: A thermocouple has τ = 0.5 s. How long until it reads within 1% of a sudden new temperature?
> e^{−t/τ} = 0.01 ⇒ t = τ ln 100 = 4.6τ
> t ≈ 2.3 s
K: A first-order sensor reaches 63% of a step in one time constant and about 99% in 5τ; its bandwidth is 1/(2πτ).
!: High sensitivity often comes with a smaller range and more noise; the most sensitive instrument isn't always the best choice.
T: Sensitivity | The change in output per unit change in input
T: Time constant | For a first-order sensor, the time to reach 63% of a step change
T: Hysteresis | Different outputs for the same input depending on whether the input is rising or falling
SUM: Static response: sensitivity, linearity, hysteresis, offset and drift.
SUM: Dynamic response: a first-order sensor approaches a step exponentially with time constant τ, bandwidth 1/(2πτ).
EV: established | First-order response is the standard model for simple sensors such as thermometers
SRC: OpenStax, University Physics Volume 2, section 10.5 "RC Circuits" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-5-rc-circuits
SRC: AQA, A-level Physics specification (7408), section 8.3.4, Instruments and equipment | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the time constant of a first-order sensor? | The time to reach 63% of a step change.
Q: What is hysteresis in an instrument? | Different outputs for the same input depending on whether the input is rising or falling.
M1@1: A sensor gives 2.0 V at 0 °C and 3.0 V at 100 °C. Its sensitivity is: | 10 mV per °C | 1 V per °C | 100 mV per °C | 30 mV per °C | Sensitivity = Δoutput/Δinput = 1.0 V/100 °C = 10 mV per °C.
M2@3: A first-order sensor's bandwidth is set by: | Its time constant, f = 1/(2πτ) | Its resolution, the smallest step | Its range, the largest input | Its calibration certificate | A faster response (smaller τ) means a higher bandwidth.
NUM2@2: A thermometer with τ = 4.0 s is moved into hot water. What percentage of the temperature change does it show after 8.0 s? | 86 | 1 | % | 1 − e^{−8/4} = 1 − e^{−2} = 0.865, so about 86%.
M3@2,3: A sensor with τ = 0.1 s measures a temperature oscillating at 10 Hz. What will it show? | A much smaller, delayed oscillation | The full oscillation without delay | A larger oscillation, through resonance | No change in output, because sensors only measure DC | Its bandwidth is 1/(2π × 0.1) ≈ 1.6 Hz, far below 10 Hz, so the signal is strongly smoothed and lags.
SA2@2,3: Explain why a large mercury thermometer is unsuitable for measuring the temperature of air in a car engine intake that changes within a fraction of a second. | A large thermometer has a big heat capacity and a small surface for heat exchange, so its time constant is long (seconds or more). It reaches only 63% of a step in one τ and acts as a low-pass filter with bandwidth 1/(2πτ), so fast changes are smoothed and delayed. A small thermocouple or thermistor with τ of milliseconds is needed. | Large heat capacity gives long tau ; Response follows exponential ; Low bandwidth smooths and lags fast changes ; Suggest a fast sensor

## Detection limits
S: The detection limit is the smallest signal an instrument or method can reliably distinguish from noise and background. Below it, a measured "signal" could just be a fluctuation.
O: Estimate a detection limit from the spread of blank or background measurements
O: Apply counting statistics to background-limited detection
O: Report a non-detection as an upper limit
PRE: Statistical significance
LV: Year 1 · Application
H: Defining it
E: L_{D} ≈ 3σ_{blank} :: a common definition: three times the standard deviation of blank measurements
E: L_{Q} ≈ 10σ_{blank} :: limit of quantification: where a value can be stated with useful precision
- For counting experiments with background B, a source is detected if counts exceed B by about 3√B (more carefully, with Currie's formulas).
H: Improving it
- Reduce noise (cooling, shielding, filtering, averaging).
- Reduce the background, or measure it accurately.
- Increase the signal (longer counting, larger detector, stronger excitation).
- Use modulation and lock-in detection to escape 1/f noise.
X: A detector's background is 400 counts in 10 min. What is the minimum detectable source count?
> σ_{B} = √400 = 20
> Detection needs about 3σ = 60 extra counts in 10 min
K: Counts fluctuate by about √N, so a signal must stand several √B above the background to be believed.
!: Report results below the detection limit as upper limits ("< 60 counts at 95% confidence"), not as zero or as a measured value.
T: Detection limit | The smallest signal that can reliably be distinguished from the blank or background
T: Limit of quantification | The smallest signal that can be measured with useful relative precision
SUM: L_{D} ≈ 3σ of the blank; quantification needs about 10σ.
SUM: In counting, noise is √B; longer counts lower the rate limit as 1/√t. Report non-detections as upper limits.
EV: established | The 3σ detection criterion is a widely used convention, though exact definitions vary between fields
SRC: OpenStax, Introductory Statistics 2e, section 9.2 "Outcomes and the Type I and Type II Errors" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/9-2-outcomes-and-the-type-i-and-type-ii-errors
SRC: OpenStax, Introductory Statistics 2e, section 2.7 "Measures of the Spread of the Data" | secondary | 2023 | https://openstax.org/books/introductory-statistics-2e/pages/2-7-measures-of-the-spread-of-the-data
Q: What is a common definition of detection limit? | About three times the standard deviation of the blank or background.
Q: How should you report a non-detection? | As an upper limit at a stated confidence level.
M1@2: Doubling the counting time with a steady background improves the detection limit on rate by about: | √2 | 2 | 4 | Not at all | Counts grow ∝ t but their noise only ∝ √t, so the minimum detectable rate falls as 1/√t.
M2@1: The limit of quantification is higher than the limit of detection because: | Quantifying needs a signal measurable with reasonable relative precision | Detection is impossible below the quantification limit | The two limits are equal by definition | It includes only the systematic errors | You can tell something is there before you can say how much: 3σ shows presence, about 10σ gives a useful value.
NUM2@2: A background gives 900 counts in a fixed time. Using a 3σ criterion, how many extra counts are needed to claim detection? | 90 | 1 | counts | σ_{B} = √900 = 30, so 3σ = 90 counts above background.
M3@3: A sample gives 1035 counts against an expected background of 1000. How should this be reported? | As not detected, with an upper limit on the source counts | As a source of 35 counts, measured precisely | As a 3.5σ detection of the source | As zero, since the excess is small | σ_{B} = √1000 ≈ 32, so 35 counts is only about 1.1σ: below the detection limit.
SA2@1,3: Explain how you would decide whether a weak radioactive sample is detectable with a Geiger counter, and how to report the result if it isn't. | Measure the background for a long time with the sample absent, giving B counts with σ = √B. Count with the sample for the same time. If the excess exceeds about 3√B the sample is detected. If not, report an upper limit on its count rate at a stated confidence, not zero. Longer counting or shielding to reduce background lowers the limit. | Measure background and its spread ; 3 root B criterion ; Upper limit if not detected ; Ways to improve the limit

## Signal-to-noise ratio
S: The signal-to-noise ratio (SNR) compares the strength of a wanted signal with the random fluctuations hiding it. Most experimental technique comes down to raising the SNR.
O: Calculate SNR as a ratio and in decibels
O: Identify thermal, shot and 1/f noise and calculate Johnson noise
O: Choose methods that improve SNR
PRE: Random and systematic errors
LV: Year 2 · Application
H: Definitions
E: SNR = P_{signal}/P_{noise} = (A_{signal}/A_{noise})^{2}; in decibels 10 log_{10}(P_{s}/P_{n})
H: Sources of noise
- **Thermal (Johnson) noise**: V_{rms} = √(4k_{B}TRΔf) in any resistor.
- **Shot noise**: from discrete charges or photons; relative noise 1/√N.
- **1/f (flicker) noise**: grows at low frequency; drifts.
- **Interference**: mains hum at 50 Hz (60 Hz in some countries), radio pickup, vibrations.
H: Improving SNR
- Average N repeats: amplitude SNR improves by √N (for random noise).
- Reduce bandwidth Δf to just what the signal needs (filtering).
- Cool detectors; shield and ground properly; use twisted pairs and differential inputs.
- Modulate the signal to a quiet frequency and use lock-in detection.
X: Find the thermal noise of a 1 MΩ resistor at 300 K over 10 kHz.
> V_{rms} = √(4 × 1.38 × 10^{-23} × 300 × 10^{6} × 10^{4})
> ≈ 13 μV
K: Random noise shrinks as √N with averaging and as √Δf with narrower bandwidth; interference must be removed at source.
!: Averaging doesn't help with interference or drift that's correlated between repeats; those must be removed at source.
T: Signal-to-noise ratio | The ratio of signal power to noise power, often in decibels
T: Johnson noise | Thermal voltage noise in any resistor, V_{rms} = √(4k_{B}TRΔf)
T: Shot noise | Noise from the random arrival of discrete charges or photons
SUM: SNR compares signal and noise power; 20 dB is a power ratio of 100.
SUM: Average, filter, cool, shield, and modulate to raise SNR.
EV: established | Johnson and shot noise are fundamental, well-understood noise sources
SRC: OpenStax, University Physics Volume 2, section 15.5 "Resonance in an AC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit
SRC: OpenStax, University Physics Volume 2, section 9.3 "Resistivity and Resistance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-3-resistivity-and-resistance
Q: By what factor does averaging N repeats improve SNR (amplitude)? | √N.
Q: What is Johnson noise? | Thermal voltage noise in any resistor, V_{rms} = √(4k_{B}TRΔf).
M1@1: An SNR of 100 in power is how many decibels? | 20 dB | 100 dB | 10 dB | 40 dB | In decibels, 10 log_{10} 100 = 10 × 2 = 20 dB for a power ratio of 100.
M2@3: Narrowing the measurement bandwidth reduces: | White noise power, ∝ Δf | The signal itself | Systematic errors | Only the 1/f noise | White noise has equal power per unit bandwidth, so total noise power is proportional to Δf.
NUM2@3: A signal has amplitude SNR 4. How many repeats must be averaged to raise it to 20? | 25 | 0 | repeats | Amplitude SNR grows as √N: 20/4 = 5 = √N, so N = 25.
M3@2: Cooling a resistor from 300 K to 75 K changes its Johnson noise voltage by a factor of: | 1/2 | 1/4 | 1/16 | 2 | V_{rms} ∝ √T, and √(75/300) = √(1/4) = 1/2.
SA3@2,3: A photodiode signal is buried in noise and 50 Hz mains interference. Describe how you would improve the measurement. | Shield and ground the circuit and use twisted-pair or coaxial cable to cut mains pickup, which averaging won't remove. Keep the bandwidth no wider than the signal needs with a filter. Cool the detector or use a low-noise amplifier to reduce thermal noise. Average repeated measurements (SNR rises as √N). Better still, modulate the light with a chopper at a quiet frequency away from 50 Hz and its harmonics and use a lock-in amplifier. | Remove interference at source ; Limit bandwidth ; Reduce thermal noise ; Averaging or modulation with lock-in

## Data acquisition systems
S: A data acquisition (DAQ) system converts physical signals into numbers a computer can store: sensor, signal conditioning, sampling and analogue-to-digital conversion, then software for logging and analysis.
O: Describe the stages of a data acquisition chain
O: Apply the Nyquist criterion and predict aliasing
O: Calculate the resolution of an n-bit ADC
PRE: Signal-to-noise ratio
LV: Year 1 · Application
H: The chain
- **Sensor/transducer** → **conditioning** (amplify, filter, isolate) → **ADC** → **computer**.
- An anti-aliasing filter removes frequencies above half the sampling rate before sampling.
- Timestamps and synchronisation matter for multiple channels.
H: Sampling and resolution
E: f_{s} > 2f_{max} :: Nyquist criterion: sample at more than twice the highest frequency
E: LSB = V_{range}/2^{n} :: voltage step of an n-bit ADC
- A 12-bit ADC on a 10 V range has 2.4 mV steps; 16 bits give 0.15 mV.
- Quantisation noise ≈ LSB/√12.
- Use the ADC's full range: amplify small signals first.
X: A 0–5 V, 10-bit ADC measures a 1.2 V sensor output. What is the resolution?
> LSB = 5/1024 = 4.9 mV
> Relative resolution at 1.2 V: 0.4%. Amplifying ×4 to fill the range gives 0.1%.
K: Filter, then sample fast enough, then digitise with enough bits over the full range.
!: Sampling a signal below the Nyquist rate produces aliases: false low frequencies that no software can remove afterwards.
T: Analogue-to-digital converter | A device that turns a voltage into a binary number
T: Nyquist criterion | To record a frequency faithfully you must sample at more than twice it
T: Aliasing | A frequency above half the sampling rate appearing falsely as a lower frequency
SUM: DAQ chain: sensor, conditioning, anti-alias filter, ADC, computer.
SUM: Sample above 2f_{max}; an n-bit ADC has 2^{n} levels, steps of V_{range}/2^{n}.
EV: established | The Nyquist sampling theorem sets the minimum rate for faithful sampling
SRC: OpenStax, University Physics Volume 2, section 15.1 "AC Sources" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-1-ac-sources
SRC: AQA, A-level Physics specification (7408), section 8.3.4, Instruments and equipment | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What is the Nyquist criterion? | Sample at more than twice the highest frequency present.
Q: Why use an anti-aliasing filter? | To remove frequencies above half the sampling rate before they alias.
M1@3: How many levels does a 12-bit ADC have? | 4096 | 1024 | 12 | 65 536 | An n-bit converter has 2^{n} levels: 2^{12} = 4096.
M2@2: A 3 kHz tone sampled at 4 kHz appears at: | 1 kHz | 3 kHz | 7 kHz | 2 kHz | 3 kHz is above the 2 kHz Nyquist limit, so it folds back to 4 − 3 = 1 kHz.
NUM2@3: What is the voltage step of a 16-bit ADC on a ±5 V (10 V) range, in millivolts? | 0.15 | 0.01 | mV | LSB = 10 V/2^{16} = 10/65 536 = 1.5 × 10^{-4} V = 0.15 mV.
SEQ1@1: Put the stages of a data acquisition chain in order, from the physical quantity. | Sensor ; Amplifier and anti-aliasing filter ; Analogue-to-digital converter ; Computer storage and analysis | The sensor makes a signal, conditioning prepares it, the ADC digitises it, and the computer records and analyses it.
M3@2: A vibration up to 2 kHz must be recorded. Which setup is best? | Low-pass filter below 5 kHz, then sample at 10 kHz | Sample at 3 kHz with no filter at all | Sample at 2 kHz, matching the vibration | Sample at 10 kHz with no filter at all | Sampling well above 4 kHz with an anti-alias filter keeps the signal and blocks higher frequencies that would alias.
SA2@2,3: A student logs a sensor that outputs 0–50 mV using a 0–10 V, 12-bit data logger, sampling at 10 Hz, and wants to see vibrations at 30 Hz. Identify the problems and suggest fixes. | The signal uses only 0.5% of the range: the 2.4 mV step is about 5% of the full signal, so resolution is poor; amplify about ×200 first. Sampling at 10 Hz is below the Nyquist rate for 30 Hz, so the vibration will alias to a false low frequency; sample at more than 60 Hz (preferably several hundred) with an anti-aliasing filter. | Poor use of ADC range ; Amplify before digitising ; Sampling below Nyquist causes aliasing ; Faster sampling with anti-alias filter

## Sensors and transducers
S: A transducer converts energy from one form into another; a sensor is a transducer that produces a measurable signal (usually electrical) from a physical quantity. Choosing the sensing principle sets the range, sensitivity and speed of a measurement.
O: Match common sensors to the quantities they measure and their physical principles
O: Calculate the resistance change of a strain gauge
O: Explain how a Wheatstone bridge detects small resistance changes
PRE: Measurement instruments and calibration
LV: A level · Application
H: Common sensors
- **Temperature**: thermocouple (Seebeck voltage), thermistor (resistance falls with T for NTC), platinum resistance thermometer, infrared pyrometer.
- **Light**: photodiode (current ∝ power), phototransistor, LDR (slow), photomultiplier (single photons), CCD/CMOS.
- **Strain and force**: strain gauge (ΔR/R = G × strain, G ≈ 2), load cell, piezoelectric.
- **Position and motion**: potentiometer, LVDT, optical encoder, accelerometer (MEMS), Hall sensor (magnetic field).
- **Pressure**: piezoresistive diaphragm, capacitive gauge.
P: Sensors are either self-generating (a thermocouple or photodiode makes its own voltage or current) or modulating (a thermistor or strain gauge changes resistance and needs a supply). Modulating sensors need excitation, and its stability limits the measurement.
H: Bridges and conditioning
P: Small resistance changes are measured in a Wheatstone bridge. Balanced, its output is zero; a change ΔR gives an output ∝ ΔR, and temperature effects on matched gauges in neighbouring arms cancel.
X: A strain gauge (G = 2.0, R = 120 Ω) sees strain 5 × 10^{-4}. Find ΔR.
> ΔR/R = G × strain = 1.0 × 10^{-3}
> ΔR = 0.12 Ω: tiny, hence the bridge and amplifier
K: Pick the sensing principle for the quantity, range and speed you need, then condition its small signal before measuring it.
!: Every sensor responds to more than one quantity (a strain gauge also to temperature); design so unwanted sensitivities cancel or are measured.
T: Transducer | A device that converts energy from one form to another
T: Gauge factor | For a strain gauge, the fractional resistance change per unit strain, G = (ΔR/R)/strain
T: Wheatstone bridge | Four resistances in a diamond whose output is zero when balanced, used to detect small changes
SUM: Sensors turn temperature, light, strain, position and pressure into electrical signals.
SUM: Small resistance changes are read with a Wheatstone bridge, which also cancels common effects.
EV: established | The sensing principles listed are standard, well-characterised physics
SRC: OpenStax, University Physics Volume 2, section 9.3 "Resistivity and Resistance" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/9-3-resistivity-and-resistance
SRC: OpenStax, College Physics 2e, section 21.5 "Null Measurements" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/21-5-null-measurements
Q: What does a thermocouple measure, physically? | A voltage generated by a temperature difference between junctions of two different metals (the Seebeck effect).
Q: Why are strain gauges used in Wheatstone bridges? | To measure tiny resistance changes sensitively and cancel temperature effects.
M1@1: Which sensor measures magnetic field? | Hall probe | Thermistor | LDR | Strain gauge | A Hall probe gives a voltage proportional to the magnetic flux density through it.
M2@1: An NTC thermistor's resistance: | Falls as temperature rises | Rises as temperature rises | Is independent of temperature | Depends only on light level | In a semiconductor, more charge carriers are freed at higher temperature, so resistance falls.
NUM2@2: A 350 Ω strain gauge with gauge factor 2.1 is strained by 2.0 × 10^{-4}. What is its change in resistance, in ohms? | 0.147 | 0.002 | Ω | ΔR = G × strain × R = 2.1 × 2.0 × 10^{-4} × 350 = 0.147 Ω.
MATCH1@1: Match each sensor to the effect it relies on. | Thermocouple = Seebeck voltage ; Photodiode = photocurrent ; Strain gauge = change of resistance with stretching ; Hall probe = sideways force on moving charges | Each sensor converts its quantity into an electrical signal through a distinct physical effect.
M3@3: Why are two identical strain gauges, one strained and one not, placed in adjacent arms of a bridge? | Temperature changes affect both equally and cancel | It doubles the strain on the active gauge | It removes the need for a supply voltage | It makes the gauge factor larger | The dummy gauge experiences the same temperature, so its resistance change balances that of the active gauge.
SA2@2,3: Explain why a strain gauge's output is usually measured with a Wheatstone bridge and an amplifier rather than an ohmmeter. | Typical strains give resistance changes of about 0.1%, e.g. 0.12 Ω in 120 Ω, too small to read reliably on an ohmmeter against its uncertainty and drift. In a balanced bridge the output is zero, so a small ΔR gives a small voltage on a zero background that can be amplified. A matched dummy gauge in an adjacent arm cancels temperature effects. | Resistance change is tiny ; Bridge output is zero at balance ; Output proportional to delta R then amplified ; Temperature compensation

## Oscilloscopes and signal generators
S: An oscilloscope displays voltage against time, so you can see waveforms, measure amplitudes, periods and phase, and catch glitches. A signal generator supplies known test waveforms. Together they are the basic tools of electronic measurement.
O: Read amplitude, period, frequency and r.m.s. voltage from an oscilloscope trace
O: Explain triggering, coupling and probe loading
O: Measure a phase difference between two signals
PRE: Data acquisition systems
LV: A level · Application
H: Using an oscilloscope
- Vertical scale (V/div) and timebase (s/div): read amplitude and period from divisions.
- **Triggering** holds the waveform still by starting each sweep at the same point (level and slope).
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
K: Count divisions and multiply by the scale: volts per division for amplitude, seconds per division for time.
!: A scope's bandwidth must be well above the signal frequency (rule of thumb 5×), or fast edges look rounded and amplitudes read low.
T: Timebase | The horizontal scale of an oscilloscope, in seconds per division
T: Trigger | The condition that starts each sweep at the same point of the waveform
T: Peak-to-peak voltage | The difference between the maximum and minimum of a waveform, twice the amplitude for a sine
SUM: Read V from vertical divisions × V/div and T from horizontal divisions × s/div; f = 1/T.
SUM: Triggering stabilises the trace; ×10 probes and adequate bandwidth avoid distorting the signal.
EV: established | Oscilloscope measurement of voltage and time is standard laboratory practice
SRC: OpenStax, University Physics Volume 2, section 15.1 "AC Sources" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-1-ac-sources
SRC: AQA, A-level Physics specification (7408), section 8.1, Use of apparatus and techniques | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
Q: What does triggering do on an oscilloscope? | Starts each sweep at the same point on the waveform so the display is stable.
Q: How do you measure phase difference on a scope? | Δφ = 360° × (time shift)/(period).
M1@1: A trace has period 5 divisions at 0.1 ms/div. The frequency is: | 2 kHz | 500 Hz | 20 kHz | 200 Hz | T = 5 × 0.1 ms = 0.5 ms, so f = 1/T = 2000 Hz = 2 kHz.
M2@2: Why use a ×10 probe? | It loads the circuit less | It amplifies the signal tenfold | It removes noise from the signal | It increases the timebase setting | Its higher input impedance and lower capacitance disturb the circuit less, at the cost of a tenfold smaller signal.
NUM2@3: Two 1 kHz signals are shifted by 0.25 ms on the screen. What is their phase difference, in degrees? | 90 | 1 | ° | The period is T = 1 ms, so Δφ = 360° × 0.25/1 = 90°, a quarter of a cycle.
M3@1: A sine wave is 4.0 divisions peak to peak at 2 V/div. What is its r.m.s. voltage? | 2.8 V | 8.0 V | 4.0 V | 5.7 V | V_{pp} = 8.0 V, so V_{0} = 4.0 V and V_{rms} = 4.0/√2 = 2.8 V.
SA2@1,2: Describe how to use an oscilloscope to measure the frequency and peak voltage of an unknown sine wave, and how to make the reading as precise as possible. | Connect the signal (with a compensated ×10 probe if loading matters), use DC coupling and set the ground line. Adjust the trigger level so the trace is stable. Choose V/div so the wave fills most of the screen height, and a timebase showing one or two cycles across the screen. Count the divisions peak to peak and multiply by V/div, halving for the peak voltage; measure several cycles across the screen and divide to find T, then f = 1/T. | Stable trigger ; Scales set to fill the screen ; Peak voltage from divisions ; Period from several cycles, f = 1/T

## Lock-in amplifiers
S: A lock-in amplifier extracts a tiny signal buried in noise by modulating it at a known frequency and detecting only what varies at exactly that frequency and phase. It can recover signals far smaller than the broadband noise.
O: Explain phase-sensitive detection with a reference signal
O: Calculate the noise remaining after narrowing the bandwidth
O: Find amplitude and phase from the X and Y outputs
PRE: Signal-to-noise ratio
LV: Year 3 · Physical reasoning
H: How it works
- Modulate the signal (chop a light beam, modulate a current) at reference frequency f_{r}.
- Multiply the detector output by a reference sine at f_{r} (phase-sensitive detection).
- The product contains a DC term ∝ signal amplitude × cos(phase difference), plus terms at other frequencies.
- A low-pass filter with time constant τ keeps the DC term and rejects everything else; for a simple RC filter the equivalent noise bandwidth is 1/(4τ).
E: V_{out} ∝ V_{s} cos φ (X); with two references 90° apart, R = √(X^{2} + Y^{2}), φ = arctan(Y/X)
H: Why it helps
- Shifts the measurement away from DC, escaping 1/f noise and drift.
- The tiny bandwidth rejects nearly all white noise.
- Gives amplitude and phase, useful for impedance and time-delay measurements.
X: A 1 nV signal sits in 1 μV of broadband noise (over 100 kHz). Using a 1 Hz bandwidth:
> Noise scales with √bandwidth: 1 μV × √(1/10^{5}) ≈ 3 nV
> A longer τ (0.01 Hz bandwidth) gives about 0.3 nV: the signal emerges
K: A lock-in measures only the part of the signal locked to the reference in frequency and phase, in a very narrow bandwidth.
!: A longer time constant means a slower response; wait about 5τ after any change before reading.
T: Phase-sensitive detection | Multiplying a signal by a reference and averaging, so only components at the reference frequency and phase survive
T: Reference frequency | The frequency at which the signal is deliberately modulated and detected
SUM: Modulate at f_{r}, multiply by the reference, low-pass filter: only the locked component survives.
SUM: Noise falls as √bandwidth; X and Y give amplitude R = √(X^{2} + Y^{2}) and phase.
EV: established | Phase-sensitive detection is a standard technique for recovering weak modulated signals
SRC: OpenStax, University Physics Volume 2, section 15.5 "Resonance in an AC Circuit" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-5-resonance-in-an-ac-circuit
SRC: OpenStax, University Physics Volume 2, section 15.1 "AC Sources" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/15-1-ac-sources
Q: What does a lock-in amplifier detect? | Only the component of a signal at the reference frequency and phase.
Q: Why modulate a signal before lock-in detection? | To move it away from DC where 1/f noise and drift are worst.
M1@1: Increasing the lock-in time constant: | Reduces noise but slows the response | Increases the noise in the output | Speeds up the response to changes | Changes the reference frequency | A longer τ narrows the bandwidth, so less noise passes, but the output takes longer to settle.
M2@3: X = 3 μV and Y = 4 μV. The signal amplitude is: | 5 μV | 7 μV | 1 μV | 12 μV | The in-phase and quadrature parts add as vectors: R = √(3^{2} + 4^{2}) = 5 μV.
NUM3@2: White noise is 10 μV over a 10 kHz bandwidth. What noise remains in a 0.1 Hz bandwidth, in nanovolts? | 32 | 1 | nV | Noise ∝ √bandwidth: 10 μV × √(0.1/10^{4}) = 10 μV × 3.16 × 10^{-3} = 0.032 μV = 32 nV.
M3@2: Why is a light beam chopped at, say, 137 Hz rather than 50 Hz before lock-in detection? | To avoid mains interference at 50 Hz and its harmonics | Because lock-ins cannot work below 100 Hz | To make the light more intense | Because 137 Hz has no 1/f noise at all | Choosing a frequency away from mains and its harmonics keeps interference out of the narrow detection band.
SA3@1,2: Explain how a lock-in amplifier can measure a signal much smaller than the noise. | The signal is modulated at a known reference frequency. The lock-in multiplies the detector output by a reference sine at that frequency; the signal component gives a steady DC output proportional to its amplitude and the cosine of its phase, while noise at other frequencies gives oscillating terms. A low-pass filter with a long time constant averages these away, leaving a bandwidth of about 1/(4τ), so noise falls as the square root of bandwidth. Working away from DC also avoids 1/f noise and drift. | Modulation at reference frequency ; Multiplication gives DC for signal only ; Low-pass filter narrows bandwidth ; Noise reduced as root bandwidth, avoids 1/f

## Vacuum systems
S: Many experiments need low pressure: to let particles travel without collisions, to keep surfaces clean, or to insulate thermally. Vacuum technology combines pumps, gauges and clean materials to reach pressures from 10^{2} Pa down to about 10^{-11} Pa.
O: Calculate the mean free path at a given pressure
O: Choose pumps and gauges for a pressure range
O: Explain why outgassing limits the ultimate pressure
PRE: Microscopic and macroscopic descriptions
LV: Year 2 · Application
H: Ranges and the mean free path
- Rough (10^{5}–10^{2} Pa), medium (10^{2}–10^{-1} Pa), high (10^{-1}–10^{-7} Pa) and ultra-high (below about 10^{-7} Pa) vacuum; the exact boundaries differ between sources.
E: λ = k_{B}T/(√2 πd^{2}p) :: mean free path; for air at room temperature λ ≈ 7 mm/(p in Pa)
H: Pumps and gauges
- Pumps: rotary vane or scroll (rough), turbomolecular and diffusion (high vacuum, need a backing pump), ion and cryopumps, getters (UHV).
- Gauges: Pirani (thermal conductivity, rough), capacitance manometer (accurate, rough to medium), ionisation gauges (high vacuum).
H: Practice
- Outgassing from surfaces limits the pressure; UHV systems are baked at 150–250 °C.
- Use metal seals (Conflat) for UHV; avoid fingerprints and plastics.
- Leaks are found with helium leak detectors.
X: What is the mean free path at 10^{-4} Pa?
> λ ≈ 7 mm/10^{-4} = 70 m
> Molecules cross a chamber without colliding with each other: "molecular flow"
K: The mean free path is inversely proportional to pressure; below about 0.1 Pa it exceeds the size of most chambers.
!: Venting a turbopump at full speed or exposing it to atmosphere can wreck it; follow the venting procedure.
T: Mean free path | The average distance a molecule travels between collisions
T: Outgassing | The slow release of gas absorbed in or adsorbed on surfaces inside a vacuum chamber
T: Backing pump | A pump that keeps the outlet of a high-vacuum pump at low enough pressure for it to work
SUM: λ ∝ T/p; at high vacuum molecules hit the walls, not each other.
SUM: Rough pumps back turbo or diffusion pumps; outgassing and leaks set the ultimate pressure.
EV: established | Kinetic theory gives the mean free path and underpins vacuum practice
SRC: OpenStax, University Physics Volume 2, section 2.2 "Pressure, Temperature, and RMS Speed" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-2-pressure-temperature-and-rms-speed
SRC: OpenStax, College Physics 2e, section 11.6 "Gauge Pressure, Absolute Pressure, and Pressure Measurement" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/11-6-gauge-pressure-absolute-pressure-and-pressure-measurement
Q: Why is UHV needed for surface science? | At 10^{-4} Pa a surface is covered by a monolayer of gas in about a second; UHV keeps it clean for hours.
Q: What limits the ultimate pressure in a sealed vacuum chamber? | Outgassing from surfaces (and leaks and permeation).
M1@2: Which pump needs a backing pump? | Turbomolecular | Rotary vane | Scroll | None of these | A turbopump can't exhaust to atmosphere, so a rough pump keeps its outlet at low pressure.
M2@1: The mean free path is inversely proportional to: | Pressure | Temperature | Chamber size | Pump speed | λ = k_{B}T/(√2 πd^{2}p), so λ ∝ T/p: halving the pressure doubles the mean free path.
NUM2@1: Using λ ≈ 7 mm/(p in Pa), what is the mean free path of air at 0.7 Pa, in millimetres? | 10 | 0.5 | mm | λ ≈ 7 mm/0.7 = 10 mm, roughly the size of small tubes, where flow becomes molecular.
M3@3: A chamber pumps down quickly to 10^{-4} Pa but then improves only very slowly. What is the most likely cause? | Gas released from the walls (outgassing) | The rotary pump has stopped working | The ion gauge is reading too low | The mean free path has become too short | Fast initial pumping followed by a slow tail is typical of outgassing; baking the chamber speeds it up.
SA2@1,3: Explain why an electron beam experiment needs a high vacuum and how the vacuum is produced. | Electrons must travel the length of the apparatus (about 1 m) without colliding with gas molecules, so the mean free path must be much longer than that: λ ≈ 7 mm/p means p well below 10^{-2} Pa. A rotary or scroll pump first roughs the chamber to about 1 Pa; then a turbomolecular or diffusion pump, backed by the rough pump, reaches high vacuum. Clean metal surfaces and good seals limit outgassing and leaks, and an ionisation gauge monitors the pressure. | Mean free path must exceed apparatus size ; Pressure estimate ; Rough pump then turbo or diffusion pump ; Outgassing, seals and gauges

## Cryogenic measurement
S: Cryogenics studies matter at very low temperatures, where superconductivity, superfluidity and quantum effects appear and thermal noise falls. Measuring there demands special coolants, refrigerators and thermometers.
O: State the temperatures reached by common cryogenic methods
O: Explain the main heat leaks and how measurements avoid self-heating
O: Compare thermal and quantum energy scales at low temperature
PRE: Microscopic and macroscopic descriptions
LV: Year 3 · Physical reasoning
H: Reaching low temperatures
- Liquid nitrogen: 77 K. Liquid helium-4: 4.2 K, pumped to about 1.5 K.
- Helium-3 systems: about 0.3 K. Dilution refrigerators (³He–⁴He mixtures): about 10 mK, used for superconducting qubits.
- Adiabatic demagnetisation: millikelvin with paramagnetic salts, and below 1 mK with nuclear demagnetisation.
- Pulse-tube cryocoolers reach about 3 K without liquid helium.
H: Thermometry
- Silicon diodes and platinum resistors down to tens of K; ruthenium oxide and germanium resistors below 1 K.
- Primary thermometers rely on physics (noise thermometry, Coulomb blockade, ³He melting curve).
H: Practical problems
- Heat leaks: radiation (use shields), conduction along wires (thin, low-conductivity leads, thermal anchoring), and vibration.
- Measurement currents must be tiny to avoid self-heating.
- Materials change: metals contract, insulators become brittle, specific heats fall towards zero.
X: Why do superconducting quantum computers run at about 10 mK?
> Qubit transitions are about 5 GHz: hf ≈ 3.3 × 10^{-24} J
> k_{B}T at 10 mK ≈ 1.4 × 10^{-25} J ≪ hf, so thermal excitation is negligible
K: Every microwatt matters at millikelvin temperatures: heat leaks and measurement power, not the refrigerator alone, set the lowest temperature reached.
!: Liquid nitrogen and helium boil to large gas volumes; in a closed room they can displace oxygen. Use oxygen monitors and ventilation.
T: Dilution refrigerator | A refrigerator that cools by dissolving helium-3 into helium-4, reaching about 10 mK
T: Self-heating | Warming of a sensor by the power dissipated in it by the measuring current
SUM: LN_{2} gives 77 K, helium 4.2 K and below, dilution fridges about 10 mK.
SUM: Shield radiation, anchor wires and use tiny currents; compare k_{B}T with the energy scale of interest.
EV: established | The temperatures and techniques listed are standard low-temperature physics
SRC: OpenStax, University Physics Volume 2, section 1.2 "Thermometers and Temperature Scales" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/1-2-thermometers-and-temperature-scales
SRC: OpenStax, University Physics Volume 2, section 2.3 "Heat Capacity and Equipartition of Energy" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/2-3-heat-capacity-and-equipartition-of-energy
Q: What temperature does a dilution refrigerator reach? | About 10 mK.
Q: Why must thermometer currents be small at millikelvin temperatures? | Self-heating would raise the sensor's temperature above that of the sample.
M1@1: The boiling point of liquid nitrogen is: | 77 K | 4.2 K | 273 K | 20 K | At atmospheric pressure nitrogen boils at 77 K (−196 °C); helium boils at 4.2 K.
M2@3: Why are heat capacities tiny at very low T? | Few vibrational and electronic modes are excited | Matter loses most of its mass at low temperature | Atoms stop moving entirely at low temperature | Heat flows faster through cold materials | Lattice heat capacity falls as T^{3} (Debye) and electronic as T, so both vanish as T → 0.
NUM2@3: At what temperature does k_{B}T equal the energy of a 5 GHz photon, in millikelvin? | 240 | 10 | mK | T = hf/k_{B} = (6.63 × 10^{-34} × 5 × 10^{9})/(1.38 × 10^{-23}) = 0.24 K = 240 mK.
M3@2: A resistance thermometer at 20 mK reads higher as the measuring current is increased. Why? | The current heats the sensor above the sample's temperature | The thermometer has a zero error | Resistance never depends on current | The sample is warming independently | Self-heating: the I^{2}R power can't escape quickly at millikelvin temperatures, so the sensor warms.
SA3@2,3: Describe the main sources of heat reaching a sample at millikelvin temperatures and how experimenters reduce them. | Radiation from warmer surfaces is blocked by nested radiation shields at intermediate temperatures. Conduction along wires and supports is reduced by thin leads of low thermal conductivity, thermally anchored at each stage. Vibration and electrical noise dissipate energy and are reduced by isolation and filtering. The measuring current itself heats sensors, so very small currents (or lock-in detection) are used. | Radiation and shields ; Conduction and thermal anchoring ; Vibration and electrical noise ; Low measurement power

## High-voltage and high-current safety
S: Electricity becomes dangerous through current passing through the body, burns, arcs, fire and stored energy. Laboratory safety relies on assessing the risks, designing them out, and following procedures every time.
O: Explain why current, not voltage alone, causes electric shock injury
O: Calculate energy stored in a capacitor and judge its hazard
O: Describe engineering and procedural controls for electrical work
PRE: Measurement instruments and calibration
LV: A level · Application
H: Hazards
- Current through the chest: about 10 mA can stop you letting go; about 50–100 mA AC can cause ventricular fibrillation.
- Body resistance drops from about 100 kΩ (dry skin) to about 1 kΩ (wet or broken skin); I = V/R.
- Capacitors store energy E = ½CV^{2} long after switch-off.
- High currents cause heating and arcing; arcs produce intense UV, molten metal and blast.
- Inductive circuits produce large voltages when interrupted (V = L dI/dt).
P: The effect depends on the size of the current, its path, its duration and whether it is AC or DC. Mains-frequency AC is especially dangerous because it can trigger fibrillation and makes muscles clamp, so the victim can't let go.
H: Controls
- Eliminate or reduce: use the lowest voltage that works; enclose and interlock.
- Isolation, earthing and residual current devices (RCDs trip at about 30 mA imbalance).
- Fuses and breakers sized to protect wiring.
- Discharge and earth capacitors with an earthing stick before touching; lock off and tag the power supply.
- Work on live high-voltage equipment only if trained and authorised, never alone, and following local rules.
X: A 100 μF capacitor is charged to 400 V. How much energy does it store?
> E = ½ × 100 × 10^{-6} × 400^{2} = 8 J
> Enough to deliver a dangerous shock and to weld a screwdriver tip
K: It is the current through the body that injures; voltage matters because it drives that current through the body's resistance.
!: "Switched off" isn't "safe": capacitors, batteries and induced voltages can remain. Test before touching.
T: Residual current device | A device that cuts the supply when the live and neutral currents differ, showing leakage to earth
T: Ventricular fibrillation | Chaotic heart rhythm, caused by currents of tens of milliamps across the chest, that stops the heart pumping
SUM: Shock harm depends on current, I = V/R; wet skin lowers R. Stored and induced energy remain after switch-off.
SUM: Design hazards out first, then use earthing, RCDs, fuses, discharge and isolation procedures.
EV: established | Current thresholds for shock effects are well established, though individual susceptibility varies
SRC: OpenStax, College Physics 2e, section 20.6 "Electric Hazards and the Human Body" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/20-6-electric-hazards-and-the-human-body
SRC: OpenStax, University Physics Volume 2, section 10.6 "Household Wiring and Electrical Safety" | secondary | 2016 | https://openstax.org/books/university-physics-volume-2/pages/10-6-household-wiring-and-electrical-safety
Q: Why is wet skin more dangerous? | It lowers body resistance, so the same voltage drives a larger current.
Q: What does an RCD detect? | An imbalance between live and neutral currents, indicating leakage (e.g. through a person).
M1@3: Which hazard remains after unplugging equipment? | Charged capacitors | Mains current | Earth faults | Fuse failure | Capacitors can hold a dangerous charge long after the supply is removed, so discharge them first.
M2@1: Approximately what AC current through the chest can cause fibrillation? | 50–100 mA | 1 μA | 1 mA | 10 A only | Currents of tens of milliamps across the chest can disrupt the heart's rhythm, which is why RCDs trip at 30 mA.
NUM2@1: A person with wet hands (body resistance 1.0 kΩ) touches 230 V. What current flows, in milliamps? | 230 | 1 | mA | I = V/R = 230/1000 = 0.23 A = 230 mA, well above the level that can cause fibrillation.
M3@2: A 2000 μF capacitor bank charged to 450 V stores about: | 200 J | 0.9 J | 450 J | 2 J | E = ½CV^{2} = ½ × 2 × 10^{-3} × 450^{2} = 203 J, a potentially lethal amount.
SA2@2,3: A student is about to adjust the wiring of a power supply containing large capacitors. Describe the precautions that should be taken. | Switch off and isolate the supply, then lock it off and label it so it can't be switched back on. Wait, then discharge the capacitors through an earthing stick or bleed resistor, and test with a meter that no voltage remains before touching. Work with dry hands, keep one hand away from the equipment, have someone else present, and follow the lab's risk assessment and local rules. | Isolate and lock off ; Discharge capacitors ; Test before touching ; Personal and procedural precautions

## Laboratory notebooks and reproducibility
S: A lab notebook is the permanent, dated record of what you did, saw and thought. It makes your work reproducible, defends priority and integrity, and saves you when results need rechecking months later.
O: List what a complete laboratory record contains
O: Correct a record without destroying the original
O: Explain how a good record supports reproducibility and integrity
PRE: Repeatability and reproducibility
LV: GCSE and A level · Foundation
H: What to record
- Date, aims, apparatus (with serial numbers and settings), diagrams.
- Raw data as taken, with units and uncertainties; never only processed data.
- Calibrations, environmental conditions, problems and changes of plan.
- Analysis steps, file names and software versions for electronic data.
- Thoughts, ideas and conclusions, clearly marked as such.
H: Good practice
- Bound book or a managed electronic notebook; ink; no erasing: cross out with a single line so the original stays legible.
- Write it at the time, not from memory.
- Someone else should be able to repeat your experiment from it.
- Link to stored data with stable names, and back them up.
P: In research the notebook is also a legal and ethical record: it can establish who did what first, and it lets supervisors and reviewers check that results were reported honestly.
X: You notice the room temperature rose 3 °C during a resistance measurement.
> Record it, with times
> Later this explains a drift in the data, and you can correct it with the temperature coefficient
K: If it isn't written down at the time, it can't be checked, repeated or defended.
!: Rewriting a "neat copy" of results and discarding the original record destroys evidence and can hide mistakes or invite suspicion.
T: Contemporaneous record | A record written at the time the work is done, not reconstructed later
T: Raw data | Measurements exactly as read from the instrument, before any processing
SUM: Record aims, apparatus, raw data with units, conditions, problems and analysis steps as you go.
SUM: Never erase: strike through with one line, and link electronic data and software versions.
EV: established | Contemporaneous, complete records are a basic requirement of research integrity
SRC: AQA, A-level Physics specification (7408), section 8.4.2, Criteria for the assessment of practical competency | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 1.1 "Physics: An Introduction" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-1-physics-an-introduction
Q: Why should raw data, not just processed results, be recorded? | So the analysis can be checked and redone if a mistake or better method is found.
Q: How should mistakes in a lab notebook be corrected? | Strike through with a single line so the original remains readable, and write the correction.
M1@1: Which is good notebook practice? | Recording conditions and problems as they happen | Writing up only the successful runs | Using pencil so corrections are easy | Copying data out neatly at the end of the week | A complete, contemporaneous record keeps everything needed to check and repeat the work.
M2@1,3: For electronic data, the notebook should record: | File names, locations and software versions | Nothing, because the files are enough | Only the final graph of the results | The brand of the computer used | Links to files and the exact software let someone else redo the analysis later.
TF1@2: Using correction fluid to tidy a mistake in a lab notebook is acceptable if the new value is correct. | false | The original entry must stay legible; strike through with a single line so anyone can see what was changed.
M3@3: Six months later a result can't be reproduced. Which record would most help find out why? | Settings, conditions and problems noted at the time | A neat summary table written after the work | The final value and its uncertainty | The date the report was submitted | Details recorded at the time reveal what differed between the original and the repeat.
SA2@1,3: Explain why a contemporaneous lab notebook is important for reproducibility and scientific integrity. | Writing as you work captures raw data, settings, conditions and problems before they are forgotten or tidied away. This lets you or others repeat the experiment and track down differences when results don't reproduce. It shows honestly what was done, including failed runs and corrections (struck through, not erased), which protects against error, bias and suspicion of misconduct, and supports claims of priority. | Written at the time ; Complete raw data and conditions ; Enables repetition and fault-finding ; Honest record protects integrity

## Experimental validation of physical models
S: A model is validated when its predictions agree with independent measurements within uncertainties across its claimed range. Validation includes testing assumptions, limiting cases, and predictions the model wasn't tuned to fit.
O: Describe the steps of validating a model against experiment
O: Compare prediction and measurement quantitatively
O: Decide how to respond when a model and data disagree
PRE: Mathematical modelling
LV: Year 1 · Physical reasoning
H: Steps
- State the model, its assumptions and its domain of validity.
- Derive testable predictions with uncertainties (including parameter uncertainties).
- Measure with independently calibrated apparatus; quantify experimental uncertainties.
- Compare quantitatively: residuals, χ^{2}, normalised differences.
- Test outside the fitting data (cross-validation), and at extremes where assumptions may fail.
H: Interpreting disagreement
- Check the experiment for systematic errors first.
- Check the model's assumptions (is friction really negligible?).
- A persistent, reproducible disagreement may be new physics: Mercury's perihelion, the black-body spectrum.
P: Disagreement is only meaningful relative to uncertainty: a difference of under about 2 combined σ is consistent; much more than 3σ, confirmed independently, demands an explanation.
X: Validating the damped pendulum model x = A e^{−γt} cos ωt.
> Fit γ and ω from one run
> Predict the amplitude after 100 s for a different starting amplitude; measure it
> Agreement within uncertainty supports the model; an amplitude-dependent γ would show that air drag ∝ v^{2} matters
K: A model earns trust by predicting measurements it wasn't fitted to, within uncertainties, across its stated range.
!: A model that fits the data it was tuned on hasn't been validated; it has to predict data it hasn't seen.
T: Validation | Testing a model's predictions against independent measurements within uncertainties
T: Domain of validity | The range of conditions over which a model's predictions agree with experiment
T: Cross-validation | Testing a model on data that weren't used to fit its parameters
SUM: Validate with independent data, quantitative comparison and tests at the edges of the claimed range.
SUM: On disagreement, check the experiment, then the assumptions; reproducible failures can reveal new physics.
EV: established | Predictive testing against independent data is the core of model validation
SRC: AQA, A-level Physics specification (7408), section 8.3.2, Use and application of scientific methods and practices | standard | 2015 | https://www.aqa.org.uk/subjects/science/as-and-a-level/physics-7407-7408
SRC: OpenStax, College Physics 2e, section 1.1 "Physics: An Introduction" | secondary | 2022 | https://openstax.org/books/college-physics-2e/pages/1-1-physics-an-introduction
Q: What is cross-validation? | Testing a model on data that weren't used to fit its parameters.
Q: What should you check first when model and experiment disagree? | Systematic errors in the experiment, then the model's assumptions.
M1@1: Which result best validates a model? | It correctly predicts a new, independent measurement | It fits closely the data it was tuned on | It has many adjustable parameters | It is mathematically elegant and simple | Predictive success on data the model never saw is the real test; fitting tuned data is guaranteed.
M2@3: A model works at low speeds but fails at high speeds. This shows: | Its domain of validity is limited | It is useless and should be discarded | The high-speed experiment must be wrong | Physics is inconsistent at high speeds | Models hold within a range of conditions; Newtonian mechanics fails near the speed of light but remains valid at low speeds.
NUM2@2: A model predicts 4.52 ± 0.03 s and the measurement is 4.61 ± 0.04 s. By how many combined standard uncertainties do they differ? | 1.8 | 0.1 | σ | Difference 0.09 s; combined σ = √(0.03^{2} + 0.04^{2}) = 0.05 s; 0.09/0.05 = 1.8σ, consistent at the 2σ level.
M3@3: Measurements of a well-tested model disagree by 6σ, and the disagreement survives repeated checks in two independent labs. What is the most reasonable conclusion? | The model may be incomplete in this regime: new physics is possible | The model must be correct, so both labs erred | The uncertainties should be enlarged until they agree | Such disagreements are just random fluctuations | After systematic errors have been ruled out by independent checks, a reproducible discrepancy points to a limit of the model, as with Mercury's perihelion.
SA3@1,3: Describe how you would validate a model predicting that the range of a projectile launcher depends on launch angle as R = u^{2}sin 2θ/g. | Measure u independently (e.g. with light gates) rather than fitting it. Predict R with uncertainties for angles from 15° to 75°, then measure several ranges at each angle. Compare using normalised residuals or χ^{2}: agreement within uncertainty supports the model. Test the limits: at high speeds or long flights, air resistance should make ranges fall short and shift the best angle below 45°, showing the domain of validity. | Independent measurement of parameters ; Predictions with uncertainties over a range ; Quantitative comparison ; Testing limits and domain of validity
`;
