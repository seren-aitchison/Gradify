// SciGradify Analytical Chemistry and Spectroscopy (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Foundations of analytical chemistry
LV: Year 1 · Foundation
S: Analytical chemistry finds out what substances are present and how much. This lesson introduces its aims and the analytical process.
O: Define analytical chemistry and its two main questions
O: Describe the stages of an analytical procedure
O: Explain why analysis matters in society
H: Two questions
- **Qualitative**: what is present?
- **Quantitative**: how much is present?
- The **analyte** is the substance being measured.
- The **matrix** is everything else in the sample.
H: The analytical process
- Define the problem and choose a method.
- **Sample** representatively and prepare the sample.
- **Measure**, then process data and evaluate uncertainty.
- **Report** results with appropriate units and limits.
P: Analytical chemistry underpins medicine, food safety, environmental monitoring, forensics and quality control in industry. A result is only as good as the sampling: a single unrepresentative sample can mislead, however precise the instrument.
X: Testing lead in drinking water.
> The question: does tap water exceed the legal lead limit?
> Samples are collected at set times from several taps.
> Samples are acidified and analysed by ICP-MS.
> Results are compared with the regulatory limit and reported with uncertainty.
K: Analytical chemistry identifies what is present and how much, following a process of defining the problem, sampling, preparation, measurement, data evaluation and reporting, and it supports medicine, safety, environment and industry.
!: Thinking the instrument is the most important step. Poor sampling or preparation ruins even precise measurements.
EV: established | Representative sampling is essential for valid analytical results (Harris, 2015).
T: Analyte | The substance being identified or measured
T: Matrix | The rest of the sample apart from the analyte
T: Representative sample | A sample with the same composition as the whole
SUM: What and how much.
SUM: Problem to report.
SUM: Sampling matters.
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, W. H. Freeman | secondary | 2015
SRC: Skoog D. A. et al., Fundamentals of Analytical Chemistry, 9th edition, Cengage | secondary | 2014
Q: What is the analyte? | The substance being identified or measured.
Q: What does qualitative analysis answer? | What substances are present.
M1#chemistry-u15-01-q1@1: What is the matrix in an analysis? | Everything in the sample except the analyte | The instrument used for measurement | The final reported result | The pure analyte standard | Matrix components can interfere with measurement.
M2#chemistry-u15-01-q2@2: Why is representative sampling so important? | An unrepresentative sample gives misleading results however precise the instrument | Sampling has no effect at all on final results | Modern instruments correct for all sampling errors | Only a single small sample is ever needed for analysis | The sample must reflect the composition of the whole.
SEQ1#chemistry-u15-01-q3@1: Put the stages of an analysis in order. | Define the problem and choose a method ; Collect and prepare representative samples ; Measure the analyte ; Evaluate data and report results | Each stage depends on the one before.
M3#chemistry-u15-01-q4@3: Why must results be reported with uncertainty? | Users need to know how reliable the value is when comparing with limits | Uncertainty makes results look more precise | It hides errors in the method | Results without units are clearer | A value near a legal limit needs its uncertainty to be judged.
SA2#chemistry-u15-01-q5@1,3: Describe the aims and stages of analytical chemistry. | Analytical chemistry answers qualitative questions, what is present, and quantitative ones, how much. The analyte is measured within a matrix. The process involves defining the problem, choosing a method, taking representative samples, preparing them, measuring, evaluating data with uncertainty and reporting. Poor sampling ruins precise measurements. Testing lead in drinking water by ICP-MS against a legal limit is an example. Analysis supports medicine, food safety, the environment, forensics and industry. | Qualitative and quantitative ; Analyte and matrix ; Process ; Sampling ; Applications

## Qualitative analysis
LV: Year 1 · Application
S: Qualitative analysis identifies substances. This lesson describes classical tests for ions and functional groups.
O: Describe tests for common cations and anions
O: Describe tests for organic functional groups
O: Plan a sequence of tests to identify an unknown
H: Inorganic tests
- **Flame tests**: Li red, Na yellow, K lilac, Ca orange-red, Cu blue-green.
- **Carbonates** fizz with acid, giving CO₂ that turns limewater milky.
- **Halides** with acidified AgNO₃: white AgCl, cream AgBr, yellow AgI.
- **Sulfates** with acidified BaCl₂: white BaSO₄.
- **Ammonium** with warm NaOH releases ammonia, turning damp red litmus blue.
H: Organic tests
- **Alkenes**: decolourise bromine water.
- **Carbonyls**: orange precipitate with 2,4-DNPH.
- **Aldehydes**: silver mirror with Tollens'.
- **Carboxylic acids**: fizz with sodium carbonate.
P: Tests are done in a logical order so earlier reagents do not interfere with later ones. For example, carbonate is tested before sulfate, because carbonate would also precipitate with barium ions unless acid removes it first. Modern labs use instruments, but simple tests remain quick and cheap.
X: Identifying an unknown salt.
> A flame test gives a lilac flame: potassium.
> Acidified silver nitrate gives a cream precipitate: bromide.
> The precipitate dissolves in concentrated ammonia.
> The salt is potassium bromide.
K: Qualitative analysis uses flame tests, precipitation and gas tests for inorganic ions and characteristic reagents for organic groups, applied in a logical order to avoid interference.
!: Adding barium chloride without acid first. Carbonate would also give a white precipitate.
EV: established | Classical qualitative tests identify common ions (Royal Society of Chemistry, 2024).
T: Flame test | Identifying metal ions by flame colour
T: Precipitate | An insoluble solid formed in solution
T: Interference | A substance giving a false result in a test
SUM: Flame and precipitate tests.
SUM: Organic group tests.
SUM: Logical order.
SRC: Royal Society of Chemistry, Testing for ions | guidance | 2024 | https://edu.rsc.org/
SRC: Svehla G., Vogel's Qualitative Inorganic Analysis, 7th edition, Pearson | secondary | 1996
Q: What colour does potassium give in a flame test? | Lilac.
Q: What test identifies sulfate ions? | Acidified barium chloride gives a white precipitate.
M1#chemistry-u15-02-q1@1: Which halide gives a yellow precipitate with acidified silver nitrate? | Iodide | Chloride | Bromide | Fluoride | Silver iodide is pale yellow and insoluble in ammonia.
M2#chemistry-u15-02-q2@2: Why is the sample acidified before adding barium chloride? | To remove carbonate, which would also precipitate with barium | To make the sulfate ions more soluble | To change the flame colour of barium | To prevent any precipitate from forming | Carbonate gives a false positive unless destroyed.
MATCH1#chemistry-u15-02-q3@1: Match each ion to its flame colour. | Lithium = Red ; Sodium = Yellow ; Potassium = Lilac ; Copper = Blue-green | Flame colours identify metal ions.
M3#chemistry-u15-02-q4@3: Why are tests performed in a particular order? | Earlier reagents can interfere with later tests | The order of tests makes no difference to results | All the tests use exactly the same reagent | Later tests always remove the ions found earlier | Planning the order avoids false positives from earlier reagents.
SA2#chemistry-u15-02-q5@1,3: Describe qualitative tests for inorganic ions and organic groups. | Flame tests identify metals: lithium red, sodium yellow, potassium lilac, calcium orange-red and copper blue-green. Carbonates fizz with acid, giving CO₂ that turns limewater milky; halides with acidified silver nitrate give white, cream and yellow precipitates; sulfates give white BaSO₄ with acidified barium chloride; ammonium releases ammonia with warm NaOH. Alkenes decolourise bromine water, carbonyls give orange 2,4-DNPH precipitates, aldehydes give silver mirrors and acids fizz with carbonate. Tests are ordered to avoid interference. | Flame tests ; Anion tests ; Ammonium ; Organic tests ; Order

## Quantitative analysis
LV: Year 1 · Application
S: Quantitative analysis measures how much of a substance is present. This lesson compares classical and instrumental approaches.
O: Distinguish classical and instrumental quantitative methods
O: Describe how a signal is related to concentration
O: Explain detection limits and sensitivity
H: Approaches
- **Classical methods**: titration and gravimetry, based on stoichiometry.
- **Instrumental methods**: spectroscopy, chromatography and electrochemistry.
- Instruments measure a **signal** proportional to amount.
- Most instrumental methods need **calibration**.
H: Performance
- **Sensitivity**: change in signal per unit of concentration.
- **Limit of detection (LOD)**: smallest amount reliably detected.
- **Limit of quantification (LOQ)**: smallest amount reliably measured.
- **Selectivity**: ability to measure the analyte without interference.
P: Classical methods can be very accurate and need no calibration but are slow. Instrumental methods are faster, more sensitive and can measure trace levels, such as parts per billion of pollutants. The choice depends on concentration, sample number, required accuracy and cost.
X: Choosing a method.
> Vitamin C in a tablet (hundreds of mg): titration is adequate.
> Pesticide residue on fruit (μg kg⁻¹): needs LC-MS.
> Iron in blood (moderate levels): spectrophotometry works.
> Concentration range guides the method.
K: Quantitative analysis uses classical methods such as titration and gravimetry or instrumental methods that relate signal to concentration through calibration, judged by sensitivity, detection and quantification limits and selectivity.
!: Thinking a detected substance can always be quantified. Between the LOD and LOQ it is detected but not reliably measured.
EV: established | Detection and quantification limits describe method capability (Currie, 1995).
T: Limit of detection | Smallest amount that can be reliably detected
T: Sensitivity | Change in signal per unit concentration
T: Selectivity | Ability to measure the analyte without interference
SUM: Classical or instrumental.
SUM: Signal and calibration.
SUM: LOD, LOQ, selectivity.
SRC: Currie L. A., "Nomenclature in evaluation of analytical methods including detection and quantification capabilities (IUPAC Recommendations 1995)", Pure and Applied Chemistry 67(10), 1699–1723 | standard | 1995
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, W. H. Freeman | secondary | 2015
Q: What is the limit of detection? | The smallest amount that can be reliably detected.
Q: Name a classical quantitative method. | Titration.
M1#chemistry-u15-03-q1@1: Which method is best for measuring trace pesticide residues? | LC-MS, a sensitive instrumental method | Acid-base titration with an indicator | Gravimetric precipitation of the pesticide | A simple flame test for the residue | Trace levels need a highly sensitive and selective method.
M2#chemistry-u15-03-q2@2: Why do most instrumental methods need calibration? | The signal must be related to concentration using standards | Instruments measure concentration directly | Calibration is only needed for titrations | Signals never depend on concentration | Standards of known concentration convert signal to amount.
MATCH1#chemistry-u15-03-q3@2: Match each term to its meaning. | Sensitivity = Signal change per concentration ; LOD = Smallest detectable amount ; LOQ = Smallest measurable amount ; Selectivity = Freedom from interference | Method performance has several measures.
M3#chemistry-u15-03-q4@3: Why might a classical titration be chosen over an instrument? | It can be very accurate without calibration when the analyte is abundant | It is more sensitive at trace levels | It is faster for thousands of samples | It works without any chemicals | For major components, classical methods are accurate and cheap.
SA2#chemistry-u15-03-q5@1,3: Compare classical and instrumental quantitative analysis. | Classical methods such as titration and gravimetry rely on stoichiometry, are accurate and need no calibration but are slow and suit major components. Instrumental methods such as spectroscopy, chromatography and electrochemistry measure a signal proportional to amount, need calibration and are faster and more sensitive, reaching trace levels. Methods are judged by sensitivity, limit of detection, limit of quantification and selectivity. Titration suits vitamin C tablets, while pesticide residues need LC-MS. | Classical methods ; Instrumental methods ; Calibration ; Performance measures ; Choosing methods

## Accuracy and precision
LV: Year 1 · Application
S: Accuracy and precision describe the quality of results. This lesson explains errors and how they are assessed.
O: Distinguish accuracy and precision
O: Distinguish systematic and random errors
O: Calculate mean, standard deviation and percentage error
H: Definitions
- **Accuracy**: how close a result is to the true value.
- **Precision**: how close repeated results are to each other.
- **Repeatability**: same conditions, short time.
- **Reproducibility**: different labs, operators or days.
H: Errors
- **Systematic errors** shift all results the same way, reducing accuracy.
- **Random errors** scatter results, reducing precision.
- **Standard deviation** measures spread.
- **Certified reference materials** check accuracy.
P: A balance that reads 0.02 g too high introduces a systematic error, which repeats cannot remove. Random errors average out over many repeats. Using a certified reference material with a known value reveals systematic bias.
X: Assessing titration results.
> Titres: 24.10, 24.15, 24.05 cm³.
> Mean = 24.10 cm³; small spread shows good precision.
> The true value from a standard is 24.50 cm³.
> The results are precise but inaccurate: a systematic error exists.
K: Accuracy is closeness to the true value and precision is closeness of repeats; systematic errors reduce accuracy and are found with reference materials, while random errors reduce precision, measured by standard deviation, and average out over repeats.
!: Thinking precise results must be accurate. Results can be tightly grouped but all wrong.
EV: established | Metrological terms for accuracy and precision are defined internationally (JCGM, 2012).
T: Accuracy | Closeness to the true value
T: Precision | Closeness of repeated measurements
T: Systematic error | An error that shifts all results in one direction
SUM: Accuracy versus precision.
SUM: Systematic versus random.
SUM: Reference materials.
SRC: Joint Committee for Guides in Metrology, International Vocabulary of Metrology (VIM), 3rd edition, JCGM 200:2012 | standard | 2012 | https://www.bipm.org/en/committees/jc/jcgm/publications
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, W. H. Freeman | secondary | 2015
Q: What is precision? | How close repeated results are to each other.
Q: What type of error reduces accuracy? | Systematic error.
M1#chemistry-u15-04-q1@1: Which type of error can be reduced by taking more repeats? | Random error | Systematic error | Calibration bias | Instrument offset | Random errors average out over many measurements.
M2#chemistry-u15-04-q2@2: Why do repeats not remove a systematic error? | Every repeat is shifted by the same amount | Repeats always increase the error | Systematic errors are random | Repeats change the true value | The bias is built into every measurement.
NUM1#chemistry-u15-04-q3@2: A measured value is 9.6 and the true value is 10.0. What is the percentage error? | 4 | 0.1 | % | (10.0 − 9.6) ÷ 10.0 × 100 = 4% error from the true value.
M3#chemistry-u15-04-q4@3: How does a certified reference material help? | Its known value reveals systematic bias in a method | It removes random errors | It replaces calibration completely | It increases precision only | Comparing measured and certified values shows accuracy.
SA2#chemistry-u15-04-q5@1,3: Explain accuracy, precision and types of error. | Accuracy is how close a result is to the true value and precision how close repeats are to each other, assessed as repeatability and reproducibility. Systematic errors, such as a balance reading high, shift all results the same way and reduce accuracy; they are not removed by repeats but are detected with certified reference materials. Random errors scatter results and reduce precision, measured by standard deviation, and average out over repeats. Titres of 24.10 ± 0.05 against a true 24.50 are precise but inaccurate. | Accuracy ; Precision ; Systematic error ; Random error ; Reference materials

## Calibration
LV: Year 1 · Application
S: Calibration relates instrument signals to concentration. This lesson explains calibration curves, standard addition and internal standards.
O: Construct and use a calibration curve
O: Explain standard addition and internal standards
O: Evaluate linearity of a calibration
H: Calibration curves
- Measure signals for a series of **standards** of known concentration.
- Plot signal against concentration and fit a line.
- Read the unknown's concentration from its signal.
- Check **linearity** with the correlation coefficient and residuals.
H: Other approaches
- **Blank**: a sample without analyte, to correct the baseline.
- **Standard addition**: add known amounts to the sample itself, correcting matrix effects.
- **Internal standard**: a compound added in fixed amount, correcting for variable injection or losses.
- Unknowns should fall **within** the calibrated range.
P: Extrapolating beyond the highest standard is risky because response may curve at high concentrations. Standard addition is useful when the matrix, such as blood or seawater, changes the signal. Internal standards are common in chromatography.
X: Using a calibration curve.
> Standards of 0, 2, 4, 6 and 8 mg dm⁻³ give a straight line.
> The equation is A = 0.050c + 0.002.
> The unknown has A = 0.252.
> c = (0.252 − 0.002) ÷ 0.050 = 5.0 mg dm⁻³.
K: Calibration uses standards to relate signal to concentration, with blanks to correct baselines, standard addition to correct matrix effects and internal standards to correct variable losses, and unknowns should fall within the linear calibrated range.
!: Extrapolating beyond the highest standard. The response may not stay linear.
EV: established | Standard addition corrects for matrix effects in analysis (Harris, 2015).
T: Calibration curve | A plot of signal against known concentrations
T: Standard addition | Adding known analyte to the sample to calibrate
T: Internal standard | A compound added in fixed amount to correct variability
SUM: Standards and a line.
SUM: Blanks and matrix effects.
SUM: Stay in range.
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, W. H. Freeman | secondary | 2015
SRC: Eurachem, The Fitness for Purpose of Analytical Methods, 2nd edition | guidance | 2014 | https://www.eurachem.org/
Q: What is a blank? | A sample containing no analyte, used to correct the baseline.
Q: Why use standard addition? | To correct for matrix effects.
M1#chemistry-u15-05-q1@1: What is plotted in a calibration curve? | Instrument signal against known concentration | Time against temperature | Mass against volume of solvent | Wavelength against pH | Known standards define the signal-concentration relationship.
M2#chemistry-u15-05-q2@2: Why should unknowns fall within the calibrated range? | The response may not be linear outside the range | Results outside the range are always more accurate | The range has no effect on accuracy | Instruments cannot read outside the range | Extrapolation assumes linearity that may fail.
NUM1#chemistry-u15-05-q3@2: A calibration gives A = 0.040c. An unknown has A = 0.300. What is c in mg dm⁻³? | 7.5 | 0.1 | mg dm⁻³ | c = 0.300 ÷ 0.040 = 7.5 mg dm⁻³ from the calibration equation.
M3#chemistry-u15-05-q4@3: Why is an internal standard useful in chromatography? | It corrects for variations in injection volume and sample losses | It removes the need for any standards | It increases the analyte signal only | It changes the retention time of the analyte | Ratios to the internal standard cancel out variability.
SA2#chemistry-u15-05-q5@1,3: Explain how calibration is used in quantitative analysis. | Signals are measured for standards of known concentration and plotted against concentration, and the best-fit line is used to find the unknown's concentration from its signal; for A = 0.050c + 0.002, A = 0.252 gives 5.0 mg dm⁻³. A blank corrects the baseline, standard addition corrects matrix effects by spiking the sample and internal standards correct for variable injection or losses. Linearity is checked, and unknowns should lie within the calibrated range. | Calibration curve ; Blank ; Standard addition ; Internal standard ; Range

## Titrimetry
LV: Year 1 · Application
S: Titrimetry determines amounts by reacting the analyte with a solution of known concentration. This lesson covers types of titration and good practice.
O: Describe the main types of titration
O: Describe good titration technique
O: Calculate concentrations from titration data
H: Types
- **Acid-base**: neutralisation, with indicators or pH meters.
- **Redox**: such as manganate(VII) with iron(II), self-indicating.
- **Complexometric**: EDTA with metal ions, such as water hardness.
- **Precipitation**: silver nitrate with chloride.
H: Technique
- Use a **primary standard** to standardise solutions.
- Rinse burettes and pipettes with the solution they will hold.
- Read the bottom of the **meniscus** at eye level.
- Repeat until **concordant** titres (within 0.10 cm³).
P: Titration is a classical method still widely used in industry and quality control because it is accurate and cheap. Water hardness is measured by titrating calcium and magnesium ions with EDTA. Automatic titrators detect the end point electrochemically.
X: EDTA titration for water hardness.
> 50.0 cm³ of tap water is buffered at pH 10 with an indicator.
> 0.0100 mol dm⁻³ EDTA is added from a burette.
> End point at 12.0 cm³: 1.20 × 10⁻⁴ mol EDTA.
> Ca²⁺ and Mg²⁺ total 1.20 × 10⁻⁴ mol, since EDTA reacts 1:1.
K: Titrimetry uses acid-base, redox, complexometric and precipitation reactions, with primary standards, careful technique and concordant titres; concentrations are calculated from moles and stoichiometry.
!: Ignoring the reaction ratio. Always use the balanced equation's mole ratio.
EV: established | EDTA titration is a standard method for water hardness (Schwarzenbach, 1957).
T: Primary standard | A pure, stable substance used to standardise solutions
T: Complexometric titration | A titration forming a metal complex
T: Concordant titres | Results within 0.10 cm³ of each other
SUM: Four types.
SUM: Good technique.
SUM: Use mole ratios.
SRC: Schwarzenbach G., Complexometric Titrations, Methuen | secondary | 1957
SRC: Royal Society of Chemistry, Titration techniques | guidance | 2024 | https://edu.rsc.org/
Q: What is a primary standard? | A pure, stable substance used to standardise solutions.
Q: What is used to measure water hardness by titration? | EDTA.
M1#chemistry-u15-06-q1@1: Which titration needs no added indicator? | Manganate(VII) with iron(II), which is self-indicating | Hydrochloric acid with sodium hydroxide | Ethanoic acid with sodium hydroxide | EDTA with calcium ions | Excess purple manganate(VII) shows the end point.
M2#chemistry-u15-06-q2@2: Why are titrations repeated until concordant? | To ensure the results are precise and reliable | To use up all the solution | To make the end point darker | To increase the titre each time | Close agreement shows random errors are small.
NUM1#chemistry-u15-06-q3@2: 25.0 cm³ of NaOH needs 20.0 cm³ of 0.100 mol dm⁻³ HCl. What is [NaOH] in mol dm⁻³? | 0.080 | 0.002 | mol dm⁻³ | 0.00200 mol HCl reacts 1:1, so [NaOH] = 0.00200 ÷ 0.0250 = 0.080.
M3#chemistry-u15-06-q4@3: Why is the burette rinsed with the titrant rather than water? | Water would dilute the titrant and change its concentration | Water reacts with all titrants | Rinsing with titrant cleans the glass better | It makes the meniscus easier to read | Residual water would dilute the titrant and lower its concentration.
SA2#chemistry-u15-06-q5@1,3: Describe titrimetry and good practice. | Titrimetry finds amounts by reacting the analyte with a solution of known concentration: acid-base titrations use indicators or pH meters, redox titrations such as manganate(VII) with iron(II) are self-indicating, complexometric titrations use EDTA, as for water hardness, and precipitation titrations use silver nitrate. Solutions are standardised against primary standards, glassware is rinsed with its solution, the meniscus is read at eye level and titres are repeated until concordant. Concentrations follow from moles and the reaction ratio. | Types ; Primary standards ; Technique ; Concordance ; Calculation

## Gravimetric analysis
LV: Year 1 · Application
S: Gravimetric analysis measures mass to find amounts. This lesson explains precipitation and volatilisation methods.
O: Describe precipitation gravimetry
O: Describe volatilisation gravimetry
O: Calculate amounts from gravimetric data
H: Precipitation gravimetry
- The analyte is precipitated as a pure, insoluble compound.
- The precipitate is **filtered**, **washed**, **dried** and weighed.
- Example: sulfate as BaSO₄; chloride as AgCl.
- Heating to **constant mass** ensures all water is removed.
H: Volatilisation gravimetry
- The sample is heated and the **mass loss** is measured.
- Example: water of crystallisation in hydrated salts.
- Or the released gas is absorbed and weighed.
- Thermogravimetric analysis (TGA) records mass against temperature.
P: Gravimetric analysis is one of the most accurate classical methods and needs no calibration, because mass is measured directly. It was used to determine many atomic masses. It is slow, so it is used mainly for reference measurements.
X: Finding sulfate in a fertiliser.
> 0.500 g of fertiliser is dissolved and excess BaCl₂ added.
> BaSO₄ precipitate is filtered, washed and dried: 0.583 g.
> Moles BaSO₄ = 0.583 ÷ 233.4 = 2.50 × 10⁻³ mol.
> Sulfate mass = 2.50 × 10⁻³ × 96.1 = 0.240 g, which is 48.0% of the sample.
K: Gravimetric analysis precipitates the analyte as a pure compound that is filtered, washed, dried to constant mass and weighed, or measures mass loss on heating; it is accurate and needs no calibration but is slow.
!: Weighing the precipitate before it is fully dry. Heating to constant mass is essential.
EV: established | Richards used gravimetric methods to determine accurate atomic masses (Richards, 1914).
T: Gravimetric analysis | Analysis based on measuring mass
T: Constant mass | Mass that no longer changes on further heating
T: Thermogravimetric analysis | Recording mass against temperature
SUM: Precipitate and weigh.
SUM: Mass loss on heating.
SUM: Accurate, slow.
SRC: Richards T. W., "Atomic weights (Nobel lecture)", Nobel Foundation | primary | 1914 | https://www.nobelprize.org/prizes/chemistry/1914/richards/lecture/
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, W. H. Freeman | secondary | 2015
Q: What does heating to constant mass ensure? | All water or volatile matter has been removed.
Q: In which form is sulfate weighed in gravimetry? | Barium sulfate, BaSO₄.
M1#chemistry-u15-07-q1@1: Which measurement is central to gravimetric analysis? | The mass of a pure product or mass lost | The volume of a titrant | The absorbance of a solution | The retention time of a peak | Gravimetry relies on accurately weighing a pure product or mass lost.
M2#chemistry-u15-07-q2@2: Why must the precipitate be washed? | To remove soluble impurities that would add extra mass | To dissolve the precipitate | To add more analyte | To make it react faster | Impurities would give a falsely high mass.
NUM1#chemistry-u15-07-q3@3: 1.00 g of hydrated salt loses 0.360 g of water on heating. What percentage of the salt is water? | 36 | 0.5 | % | 0.360 ÷ 1.00 × 100 = 36% water by mass in the hydrated salt.
M3#chemistry-u15-07-q4@3: Why does gravimetric analysis not need calibration? | Mass is measured directly and related to amount by stoichiometry | It relies on an internal standard to correct results | Gravimetry actually measures absorbance of the sample | It has no relationship to reaction stoichiometry at all | Weighing gives an absolute measurement linked to amount by stoichiometry.
SA2#chemistry-u15-07-q5@1,3: Explain gravimetric analysis. | In precipitation gravimetry, the analyte is converted into a pure, insoluble compound, such as sulfate into BaSO₄ or chloride into AgCl, which is filtered, washed to remove impurities, dried to constant mass and weighed; the analyte amount follows from stoichiometry. In volatilisation gravimetry, mass loss on heating is measured, such as water of crystallisation, or gas is absorbed and weighed, and TGA records mass against temperature. Gravimetry is accurate and needs no calibration but is slow. | Precipitation ; Washing and drying ; Volatilisation ; Calculation ; Strengths

## UV-visible spectroscopy
LV: Year 1 · Application
S: UV-visible spectroscopy measures absorption of ultraviolet and visible light. This lesson explains the Beer-Lambert law and its uses.
O: Explain what causes UV-visible absorption
O: Apply the Beer-Lambert law
O: Describe uses of UV-visible spectroscopy
H: Absorption
- UV-visible light promotes **electrons** to higher energy levels.
- Absorbing groups are called **chromophores**, such as C=C, C=O and conjugated systems.
- More **conjugation** shifts absorption to longer wavelengths.
- Transition metal complexes absorb through d-d transitions.
H: Beer-Lambert law
- **A = εcl**: absorbance = molar absorptivity × concentration × path length.
- Absorbance has no units; l is usually 1 cm.
- A plot of A against c is a straight line through the origin.
- Measure at **λmax**, the wavelength of maximum absorbance.
P: UV-visible spectroscopy is widely used to measure concentrations of coloured or UV-absorbing species, such as DNA at 260 nm and proteins at 280 nm. β-carotene is orange because its long conjugated chain absorbs blue light.
X: Finding concentration.
> A solution has A = 0.45 at λmax in a 1.00 cm cell.
> ε = 15,000 dm³ mol⁻¹ cm⁻¹.
> c = A ÷ (εl) = 0.45 ÷ 15,000.
> c = 3.0 × 10⁻⁵ mol dm⁻³.
K: UV-visible absorption promotes electrons in chromophores, shifting to longer wavelengths with more conjugation; the Beer-Lambert law A = εcl relates absorbance to concentration, measured at λmax.
!: Measuring at any wavelength. Measuring at λmax gives the best sensitivity and least error.
EV: established | The Beer-Lambert law relates absorbance to concentration (Beer, 1852).
T: Chromophore | A group that absorbs UV or visible light
T: Molar absorptivity | ε, how strongly a species absorbs at a wavelength
T: λmax | The wavelength of maximum absorbance
SUM: Electrons promoted.
SUM: A = εcl.
SUM: Conjugation shifts λmax.
SRC: Beer A., "Bestimmung der Absorption des rothen Lichts in farbigen Flüssigkeiten", Annalen der Physik 162(5), 78–88 | primary | 1852
SRC: Harris D. C., Quantitative Chemical Analysis, 9th edition, W. H. Freeman | secondary | 2015
Q: What is the Beer-Lambert law? | A = εcl.
Q: At what wavelength does DNA absorb strongly? | 260 nm.
M1#chemistry-u15-08-q1@1: What does UV-visible light do to molecules? | Promotes electrons to higher energy levels | Makes bonds vibrate | Flips nuclear spins | Breaks molecules into ions | UV-visible photons match electronic energy gaps.
M2#chemistry-u15-08-q2@2: Why does β-carotene appear orange? | Its long conjugated chain absorbs blue light | It contains orange metal ions | It reflects all wavelengths equally | It has no conjugation | More conjugation shifts absorption into the visible.
NUM1#chemistry-u15-08-q3@2: A = 0.60, ε = 12,000 dm³ mol⁻¹ cm⁻¹, l = 1.00 cm. What is c (× 10⁻⁵ mol dm⁻³)? | 5.0 | 0.1 | × 10⁻⁵ mol dm⁻³ | c = 0.60 ÷ 12,000 = 5.0 × 10⁻⁵ mol dm⁻³ using A = εcl.
M3#chemistry-u15-08-q4@3: Why is absorbance measured at λmax? | Sensitivity is greatest and small wavelength errors matter least | It is the only wavelength absorbed | Beer-Lambert only works at λmax | Absorbance is zero elsewhere | The peak top is flat and gives the strongest signal.
SA2#chemistry-u15-08-q5@1,3: Explain UV-visible spectroscopy and the Beer-Lambert law. | UV-visible light promotes electrons to higher levels in chromophores such as C=C, C=O and conjugated systems; more conjugation shifts absorption to longer wavelengths, so β-carotene absorbs blue light and looks orange. The Beer-Lambert law, A = εcl, relates absorbance to molar absorptivity, concentration and path length, giving a straight-line calibration. Measurements are made at λmax for best sensitivity. DNA is measured at 260 nm and proteins at 280 nm. | Electronic transitions ; Chromophores ; Conjugation ; Beer-Lambert ; Applications

## Infrared spectroscopy
LV: Year 1 · Application
S: Infrared spectroscopy identifies functional groups from bond vibrations. This lesson explains how to read an IR spectrum.
O: Explain what causes infrared absorption
O: Identify functional groups from characteristic absorptions
O: Use the fingerprint region
H: Absorptions
- IR radiation makes bonds **vibrate** (stretch and bend).
- Only vibrations that change the **dipole moment** absorb IR.
- Positions are given as **wavenumbers** in cm⁻¹.
- Stronger bonds and lighter atoms absorb at higher wavenumbers.
H: Key absorptions
- **O–H (alcohol)**: broad, 3200–3550 cm⁻¹.
- **O–H (acid)**: very broad, 2500–3300 cm⁻¹.
- **C=O**: strong, sharp, 1680–1750 cm⁻¹.
- **N–H**: 3300–3500 cm⁻¹; **C–H**: 2850–3100 cm⁻¹.
- The **fingerprint region** below 1500 cm⁻¹ is unique to each compound.
P: IR spectroscopy quickly shows which functional groups are present. Breathalysers detect ethanol by its C–H absorption. Greenhouse gases such as CO₂ and CH₄ absorb IR radiation, trapping heat in the atmosphere.
X: Identifying an unknown.
> A strong, sharp peak at 1715 cm⁻¹: C=O.
> A very broad peak from 2500–3300 cm⁻¹: O–H of an acid.
> Together these show a carboxylic acid.
> Comparing the fingerprint region with a database confirms the compound.
K: IR absorption causes bond vibrations that change dipole moment; characteristic wavenumbers identify groups such as O–H, C=O, N–H and C–H, and the fingerprint region below 1500 cm⁻¹ identifies specific compounds.
!: Expecting every bond to absorb IR. Symmetric vibrations with no dipole change, such as in O₂, do not.
EV: established | IR spectroscopy identifies functional groups by characteristic absorptions (Socrates, 2001).
T: Wavenumber | The number of waves per cm, in cm⁻¹
T: Fingerprint region | The complex region below 1500 cm⁻¹
T: Stretching vibration | A vibration changing bond length
SUM: Bonds vibrate.
SUM: Characteristic peaks.
SUM: Fingerprint region.
SRC: Socrates G., Infrared and Raman Characteristic Group Frequencies, 3rd edition, Wiley | secondary | 2001
SRC: Royal Society of Chemistry, Infrared spectroscopy | guidance | 2024 | https://edu.rsc.org/
Q: Where does a C=O absorption appear? | About 1680–1750 cm⁻¹.
Q: What is the fingerprint region? | The region below 1500 cm⁻¹, unique to each compound.
M1#chemistry-u15-09-q1@1: Which absorption shows a carboxylic acid O–H? | A very broad peak from 2500–3300 cm⁻¹ | A sharp peak at 1715 cm⁻¹ | A narrow peak at 2100 cm⁻¹ | A weak peak at 700 cm⁻¹ | Hydrogen-bonded acid dimers give a very broad O–H band.
M2#chemistry-u15-09-q2@2: Why does nitrogen gas, N₂, not absorb infrared radiation? | Its vibration does not change the dipole moment | It has no bonds to vibrate | Its bond is too weak to absorb | Nitrogen absorbs all IR | IR absorption requires a vibration that changes the dipole moment.
MATCH1#chemistry-u15-09-q3@2: Match each bond to its absorption range. | Alcohol O–H = 3200–3550 cm⁻¹ ; C=O = 1680–1750 cm⁻¹ ; C–H = 2850–3100 cm⁻¹ ; C≡N = 2220–2260 cm⁻¹ | Each bond type absorbs in a characteristic range.
M3#chemistry-u15-09-q4@3: Why do C=O bonds absorb at higher wavenumbers than C–O bonds? | The double bond is stronger, so it vibrates at higher frequency | C=O bonds are weaker | C–O contains lighter atoms | Wavenumber depends only on mass | Stronger bonds behave like stiffer springs.
SA2#chemistry-u15-09-q5@1,3: Explain how infrared spectroscopy identifies functional groups. | IR radiation makes bonds stretch and bend, absorbed only when the dipole moment changes. Positions are given in wavenumbers, higher for stronger bonds and lighter atoms. Alcohol O–H gives a broad band at 3200–3550 cm⁻¹, acid O–H a very broad band at 2500–3300 cm⁻¹, C=O a strong sharp peak at 1680–1750 cm⁻¹ and N–H and C–H peaks near 3300–3500 and 2850–3100 cm⁻¹. The fingerprint region below 1500 cm⁻¹ identifies specific compounds. IR is used in breathalysers and explains greenhouse gases. | Vibrations ; Dipole change ; Key absorptions ; Fingerprint region ; Applications

## Nuclear magnetic resonance
LV: Year 1 · Chemical reasoning
S: NMR spectroscopy probes atomic nuclei in a magnetic field. This lesson explains the principles behind NMR.
O: Explain nuclear spin and its behaviour in a magnetic field
O: Describe how an NMR spectrum is obtained
O: Explain why NMR gives structural information
H: Principles
- Nuclei with **odd mass number**, such as ¹H and ¹³C, have **spin**.
- In a magnetic field, spins align **with** or **against** the field, at different energies.
- **Radio waves** of the right frequency flip spins: **resonance**.
- The energy gap depends on the field strength and the nucleus's environment.
H: Obtaining spectra
- Samples are dissolved in **deuterated** solvents such as CDCl₃.
- **TMS** (tetramethylsilane) is the reference at δ = 0.
- Modern instruments use pulses and Fourier transformation.
- Stronger magnets give better resolution.
P: Electrons around a nucleus shield it from the applied field, so nuclei in different environments resonate at slightly different frequencies. NMR is the main tool for determining organic structures, and the same physics underlies MRI scanning in medicine.
X: Why TMS is the reference.
> TMS, Si(CH₃)₄, has 12 identical hydrogens.
> It gives one strong signal.
> Its protons are highly shielded, so the signal is upfield of most others.
> It is inert and volatile, so it is easily removed.
K: NMR uses nuclei with spin, which align with or against a magnetic field and absorb radio waves at resonance; shielding by electrons changes the resonance frequency, giving structural information, with TMS as reference and deuterated solvents.
!: Thinking all nuclei are NMR active. Nuclei such as ¹²C and ¹⁶O have no spin.
EV: established | Nuclear magnetic resonance in condensed matter was first observed in 1946 (Purcell, Torrey and Pound, 1946).
T: Nuclear spin | A property of some nuclei making them behave like tiny magnets
T: Resonance | Absorption of radio waves that flips nuclear spin
T: Shielding | Reduction of the field felt by a nucleus due to electrons
SUM: Spin in a field.
SUM: Radio waves flip spins.
SUM: Environment shifts frequency.
SRC: Purcell E. M., Torrey H. C. and Pound R. V., "Resonance absorption by nuclear magnetic moments in a solid", Physical Review 69(1-2), 37–38 | primary | 1946
SRC: Claridge T. D. W., High-Resolution NMR Techniques in Organic Chemistry, 3rd edition, Elsevier | secondary | 2016
Q: Which nuclei are commonly studied by NMR? | ¹H and ¹³C.
Q: Why are deuterated solvents used? | So the solvent does not give a large ¹H signal.
M1#chemistry-u15-10-q1@1: Which compound is used as the NMR reference? | Tetramethylsilane, TMS | Water | Benzene | Ethanol | TMS gives a single strong signal defined as δ = 0.
M2#chemistry-u15-10-q2@2: Why do nuclei in different environments resonate at different frequencies? | Surrounding electrons shield them to different extents | All nuclei experience exactly the same field | The magnet changes strength for each nucleus | Different nuclei have different masses only | Shielding changes the effective field felt by each nucleus.
MATCH1#chemistry-u15-10-q3@2: Match each term to its role in NMR. | Magnet = Splits spin energy levels ; Radio waves = Flip nuclear spins ; TMS = Reference at δ 0 ; CDCl₃ = Solvent without ¹H signal | Each part is needed to record a spectrum.
M3#chemistry-u15-10-q4@3: Why do stronger magnets give better NMR spectra? | They increase the energy gap and spread out signals for clearer resolution | They remove all electron shielding from the nuclei | They make every nucleus resonate identically | They only work for nuclei such as ¹²C | Larger fields improve both sensitivity and separation.
SA2#chemistry-u15-10-q5@1,3: Explain the principles of NMR spectroscopy. | Nuclei such as ¹H and ¹³C have spin and behave like tiny magnets; in an applied field they align with or against it at different energies, and radio waves of the right frequency flip them, causing resonance. Electrons shield nuclei, so those in different environments resonate at slightly different frequencies, giving structural information. Samples are dissolved in deuterated solvents, and TMS is the reference at δ = 0. Stronger magnets give better resolution. The same physics underlies MRI. | Nuclear spin ; Energy levels ; Resonance ; Shielding ; Reference and solvents

## Proton NMR
LV: Year 1 · Application
S: Proton NMR reveals the hydrogen environments in a molecule. This lesson explains how to interpret ¹H NMR spectra.
O: Count hydrogen environments from a ¹H NMR spectrum
O: Use integration to find relative numbers of hydrogens
O: Combine shifts, integration and splitting to identify a structure
H: Information in a spectrum
- **Number of signals**: number of different hydrogen environments.
- **Chemical shift (δ)**: type of environment.
- **Integration**: relative number of hydrogens in each environment.
- **Splitting**: number of hydrogens on neighbouring carbons.
H: Practical points
- Equivalent hydrogens give one signal.
- Integration ratios are shown as a trace or numbers.
- O–H and N–H signals are often broad and can be removed by adding D₂O.
- The n + 1 rule predicts splitting.
P: Proton NMR is often the most informative single technique for organic structures. The D₂O shake identifies O–H and N–H protons because they exchange with deuterium and their signal disappears.
X: Interpreting ethanol's spectrum.
> Three signals: three environments (CH₃, CH₂, OH).
> Integration 3 : 2 : 1.
> CH₃ is a triplet (next to CH₂); CH₂ is a quartet (next to CH₃).
> The OH signal is a singlet that disappears with D₂O.
K: ¹H NMR gives the number of hydrogen environments, their chemical shifts, relative numbers from integration and neighbouring hydrogens from splitting; the D₂O shake identifies O–H and N–H protons.
!: Reading integration as absolute numbers. It gives ratios that may need scaling.
EV: established | ¹H NMR is a primary method for organic structure determination (Claridge, 2016).
T: Integration | The area under a signal, proportional to hydrogen count
T: Equivalent hydrogens | Hydrogens in identical environments
T: D₂O shake | Adding D₂O to remove O–H and N–H signals
SUM: Signals, shift, integration, splitting.
SUM: Equivalent hydrogens.
SUM: D₂O shake.
SRC: Claridge T. D. W., High-Resolution NMR Techniques in Organic Chemistry, 3rd edition, Elsevier | secondary | 2016
SRC: Royal Society of Chemistry, NMR spectroscopy | guidance | 2024 | https://edu.rsc.org/
Q: What does integration show in ¹H NMR? | The relative number of hydrogens in each environment.
Q: What does a D₂O shake identify? | O–H and N–H protons.
M1#chemistry-u15-11-q1@1: How many signals does the ¹H NMR spectrum of ethanol show? | Three | Two | One | Six | CH₃, CH₂ and OH are three different environments.
M2#chemistry-u15-11-q2@2: Why does an O–H signal disappear after adding D₂O? | The O–H hydrogen exchanges with deuterium, which does not show in ¹H NMR | D₂O reacts and destroys the alcohol completely | Deuterium shields the hydrogen so it cannot resonate | The magnet stops working when water is added | Exchange replaces ¹H with ²H, which does not appear in a ¹H spectrum.
NUM1#chemistry-u15-11-q3@2: A compound shows integrations 1.5 : 1.0 with 5 H in total. How many H are in the larger signal? | 3 | 0 | hydrogens | Ratio 3 : 2 sums to 5, so the larger signal is 3 hydrogens.
M3#chemistry-u15-11-q4@3: Why does propanone show only one ¹H NMR signal? | Its six hydrogens are all equivalent by symmetry | It has no hydrogen atoms | All its signals overlap with TMS | It contains only one hydrogen | Both methyl groups are identical environments.
SA2#chemistry-u15-11-q5@1,3: Explain how to interpret a ¹H NMR spectrum. | The number of signals gives the number of hydrogen environments, the chemical shift shows the type of environment, the integration gives the relative number of hydrogens and the splitting shows hydrogens on neighbouring carbons by the n + 1 rule. Equivalent hydrogens give one signal, so propanone shows one. Ethanol gives three signals in a 3 : 2 : 1 ratio, a triplet, a quartet and an OH singlet. O–H and N–H signals disappear on a D₂O shake because they exchange with deuterium. | Signals ; Chemical shift ; Integration ; Splitting ; D₂O shake

## Carbon-13 NMR
LV: Year 1 · Application
S: Carbon-13 NMR reveals carbon environments. This lesson explains how ¹³C spectra are obtained and interpreted.
O: Explain why ¹³C NMR is less sensitive than ¹H NMR
O: Count carbon environments from a ¹³C spectrum
O: Use ¹³C chemical shifts to identify carbon types
H: Features
- Only about **1.1%** of carbon is ¹³C, so signals are weak.
- Spectra are usually **proton-decoupled**: each environment gives a single line.
- Integration is **not** reliable in standard ¹³C spectra.
- Chemical shifts range from about 0 to 220 ppm.
H: Typical shifts
- **Alkyl C**: 5–55 ppm.
- **C–O and C–N**: 50–90 ppm.
- **Alkene and aromatic C**: 100–160 ppm.
- **C=O**: 160–220 ppm.
P: ¹³C NMR counts carbon environments and shows whether carbonyls, aromatic rings or C–O carbons are present. Symmetry reduces the number of signals: benzene shows one, while methylbenzene shows five.
X: Distinguishing isomers.
> Propan-1-ol shows three ¹³C signals.
> Propan-2-ol shows two ¹³C signals (two CH₃ are equivalent).
> Both have a C–O signal near 60–70 ppm.
> Counting signals tells the isomers apart.
K: ¹³C NMR is weak because only 1.1% of carbon is ¹³C; proton-decoupled spectra give one line per carbon environment, shifts identify alkyl, C–O, alkene/aromatic and C=O carbons and symmetry reduces signal numbers.
!: Using peak heights in ¹³C NMR to count carbons. Standard ¹³C spectra are not reliably quantitative.
EV: established | Proton decoupling simplifies ¹³C spectra to single lines (Claridge, 2016).
T: Proton decoupling | Removing ¹H coupling to simplify ¹³C spectra
T: Natural abundance | Percentage of an isotope in nature
T: Carbon environment | A set of equivalent carbon atoms
SUM: Weak but simple.
SUM: One line per environment.
SUM: Shift ranges.
SRC: Claridge T. D. W., High-Resolution NMR Techniques in Organic Chemistry, 3rd edition, Elsevier | secondary | 2016
SRC: Pretsch E. et al., Structure Determination of Organic Compounds, 4th edition, Springer | secondary | 2009
Q: What percentage of carbon is ¹³C? | About 1.1%.
Q: Where do C=O carbons appear in ¹³C NMR? | 160–220 ppm.
M1#chemistry-u15-12-q1@1: How many ¹³C signals does propan-2-ol give? | Two | Three | One | Four | The two methyl carbons are equivalent, so only two environments exist.
M2#chemistry-u15-12-q2@2: Why is ¹³C NMR much less sensitive than ¹H NMR? | Only about 1.1% of carbon atoms are ¹³C | ¹³C has no nuclear spin | Carbon atoms never absorb radio waves | ¹²C gives very strong signals | Low natural abundance means few nuclei contribute.
MATCH1#chemistry-u15-12-q3@2: Match each carbon type to its shift range. | Alkyl C = 5–55 ppm ; C–O = 50–90 ppm ; Aromatic C = 100–160 ppm ; C=O = 160–220 ppm | Shifts identify carbon types.
M3#chemistry-u15-12-q4@3: Why does methylbenzene give five ¹³C signals? | Symmetry makes some ring carbons equivalent, leaving five environments | It has five carbon atoms | All seven carbons are equivalent | The methyl carbon gives no signal | Mirror symmetry pairs two sets of ring carbons.
SA2#chemistry-u15-12-q5@1,3: Explain ¹³C NMR spectroscopy. | Only about 1.1% of carbon is ¹³C, so signals are weak. Spectra are proton-decoupled, giving one line per carbon environment, and integration is not reliable. Shifts identify carbon types: alkyl carbons at 5–55 ppm, C–O and C–N at 50–90 ppm, alkene and aromatic carbons at 100–160 ppm and carbonyls at 160–220 ppm. Symmetry reduces signals: benzene gives one, methylbenzene five, propan-1-ol three and propan-2-ol two, distinguishing isomers. | Abundance ; Decoupling ; Shift ranges ; Symmetry ; Isomers

## NMR chemical shifts
LV: Year 1 · Chemical reasoning
S: Chemical shifts reveal electronic environments. This lesson explains what affects ¹H chemical shifts and how to use them.
O: Define chemical shift and the δ scale
O: Explain shielding and deshielding effects
O: Use typical ¹H shift values to assign signals
H: The δ scale
- δ (ppm) = (frequency difference from TMS ÷ spectrometer frequency) × 10⁶.
- Independent of magnet strength.
- **Upfield** (low δ): shielded; **downfield** (high δ): deshielded.
- Most ¹H signals lie between 0 and 12 ppm.
H: Effects
- **Electronegative** atoms deshield nearby protons: CH₃–O at about 3.3 ppm.
- **π systems** deshield via ring currents: aromatic H at 6.5–8.0 ppm.
- **Aldehyde** H at 9–10 ppm; **carboxylic acid** H at 10–12 ppm.
- **Alkyl** H at 0.9–1.7 ppm.
P: Chemical shifts let chemists assign each signal to a part of the molecule. Aromatic protons appear far downfield because circulating π electrons create a field that reinforces the applied field at the protons.
X: Assigning ethyl ethanoate.
> CH₃ next to C=O: about 2.0 ppm.
> O–CH₂: about 4.1 ppm (deshielded by O).
> CH₃ of the ethyl group: about 1.3 ppm.
> Shifts show which group is next to oxygen.
K: The δ scale measures shift relative to TMS in ppm, independent of field strength; electronegative atoms and π systems deshield protons, moving them downfield, and typical ranges let signals be assigned.
!: Thinking high δ means more shielding. High δ means deshielded protons.
EV: established | Ring currents deshield aromatic protons (Pople, 1956).
T: Chemical shift | Position of a signal relative to TMS in ppm
T: Deshielding | Reduction of electron shielding, raising δ
T: Ring current | Circulating π electrons in an aromatic ring
SUM: δ in ppm.
SUM: Electronegativity deshields.
SUM: Typical ranges.
SRC: Pople J. A., "Proton magnetic resonance of hydrocarbons", Journal of Chemical Physics 24(5), 1111 | primary | 1956
SRC: Pretsch E. et al., Structure Determination of Organic Compounds, 4th edition, Springer | secondary | 2009
Q: Where do aldehyde protons appear in ¹H NMR? | About 9–10 ppm.
Q: Why is the δ scale used instead of frequency? | It is independent of magnet strength.
M1#chemistry-u15-13-q1@1: Where do aromatic protons usually appear? | 6.5–8.0 ppm | 0.9–1.7 ppm | 3.3–4.0 ppm | 10–12 ppm | Ring currents strongly deshield aromatic protons, moving them downfield.
M2#chemistry-u15-13-q2@2: Why does a CH₂ next to oxygen appear at higher δ than an alkyl CH₂? | Electronegative oxygen withdraws electrons and deshields it | Oxygen adds electron density to the CH₂ | The CH₂ is shielded by oxygen | Oxygen has no effect on shift | Less shielding by electrons means the signal appears further downfield.
MATCH1#chemistry-u15-13-q3@2: Match each proton type to its typical δ. | Alkyl CH₃ = 0.9 ppm ; CH₃ next to C=O = 2.1 ppm ; Aromatic H = 7.3 ppm ; Aldehyde H = 9.7 ppm | Shifts reflect electronic environment.
M3#chemistry-u15-13-q4@3: Why are aromatic protons strongly deshielded? | Ring currents create a field that adds to the applied field at the protons | Aromatic rings contain no electrons near the protons | Aromatic protons are bonded directly to oxygen | Ring currents cancel out the applied magnetic field | Induced fields reinforce the field outside the ring.
SA2#chemistry-u15-13-q5@1,3: Explain ¹H NMR chemical shifts. | Chemical shift δ, in ppm, is the frequency difference from TMS divided by the spectrometer frequency, so it does not depend on magnet strength. Shielded protons appear upfield at low δ and deshielded protons downfield. Electronegative atoms deshield nearby protons, so O–CH₂ appears near 4 ppm; ring currents deshield aromatic protons to 6.5–8.0 ppm; aldehyde protons appear at 9–10 ppm and acid protons at 10–12 ppm, while alkyl protons appear at 0.9–1.7 ppm. These ranges assign signals. | δ scale ; Shielding ; Electronegativity ; Ring currents ; Typical values

## Spin-spin coupling
LV: Year 1 · Chemical reasoning
S: Spin-spin coupling splits NMR signals. This lesson explains the n + 1 rule and coupling constants.
O: Apply the n + 1 rule to predict splitting
O: Explain coupling constants
O: Use splitting patterns to deduce structure
H: The n + 1 rule
- A proton with **n** equivalent neighbours on adjacent carbons is split into **n + 1** peaks.
- 0 → **singlet**, 1 → **doublet**, 2 → **triplet**, 3 → **quartet**.
- Peak intensities follow **Pascal's triangle**: triplet 1:2:1, quartet 1:3:3:1.
- Equivalent protons do not split each other.
H: Coupling constants
- The spacing between peaks is the **coupling constant J**, in Hz.
- Coupled protons share the **same J**.
- J does not depend on magnet strength.
- O–H protons often appear as singlets due to fast exchange.
P: An ethyl group gives a classic triplet-quartet pattern. Matching J values show which signals are coupled to each other. In alkenes, trans couplings (about 15 Hz) are larger than cis couplings (about 10 Hz), helping distinguish E and Z isomers.
X: Splitting in 1-chloropropane.
> CH₃ has 2 neighbours: triplet.
> Middle CH₂ has 5 neighbours: sextet.
> CH₂Cl has 2 neighbours: triplet.
> Matching J values link the signals.
K: Spin-spin coupling splits a signal into n + 1 peaks for n equivalent neighbours, with intensities from Pascal's triangle; coupled protons share the same coupling constant J, which helps link signals and distinguish isomers.
!: Counting hydrogens on the same carbon as neighbours. Only hydrogens on adjacent carbons cause splitting.
EV: established | Spin-spin coupling arises from interactions through bonding electrons (Ramsey and Purcell, 1952).
T: Spin-spin coupling | Splitting of a signal by neighbouring nuclei
T: n + 1 rule | n neighbours give n + 1 peaks
T: Coupling constant | The peak separation J, in Hz
SUM: n + 1 peaks.
SUM: Pascal's triangle.
SUM: Matching J.
SRC: Ramsey N. F. and Purcell E. M., "Interactions between nuclear spins in molecules", Physical Review 85(1), 143–144 | primary | 1952
SRC: Claridge T. D. W., High-Resolution NMR Techniques in Organic Chemistry, 3rd edition, Elsevier | secondary | 2016
Q: What splitting does a CH₂ next to a CH₃ show? | A quartet.
Q: What is a coupling constant? | The spacing between peaks in a split signal, in Hz.
M1#chemistry-u15-14-q1@1: What are the relative intensities of a triplet? | 1 : 2 : 1 | 1 : 1 : 1 | 1 : 3 : 3 : 1 | 1 : 4 : 6 : 4 : 1 | Pascal's triangle gives the intensities 1 : 2 : 1 for a triplet.
M2#chemistry-u15-14-q2@2: Why do two coupled signals share the same coupling constant? | The interaction between the two sets of protons is mutual | Each signal has a different J by definition | J depends only on the solvent | Coupling constants change with magnet strength | Each set splits the other by the same amount.
NUM1#chemistry-u15-14-q3@2: How many peaks will a CH proton with six equivalent neighbouring H show? | 7 | 0 | peaks | By the n + 1 rule, 6 + 1 = 7 peaks, a septet.
M3#chemistry-u15-14-q4@3: How can coupling constants distinguish E and Z alkenes? | Trans couplings are larger (about 15 Hz) than cis (about 10 Hz) | E and Z isomers always have identical J | Only Z isomers show coupling | Coupling constants depend only on mass | Geometry changes the through-bond interaction.
SA2#chemistry-u15-14-q5@1,3: Explain spin-spin coupling in ¹H NMR. | A proton with n equivalent neighbours on adjacent carbons is split into n + 1 peaks: singlet, doublet, triplet, quartet and so on, with intensities from Pascal's triangle such as 1:2:1 for a triplet. Equivalent protons do not split each other, and O–H protons often appear as singlets. The peak spacing is the coupling constant J, shared by coupled protons and independent of magnet strength. An ethyl group gives a triplet and quartet, and trans alkene couplings near 15 Hz are larger than cis near 10 Hz. | n + 1 rule ; Intensities ; Coupling constants ; Ethyl pattern ; Alkene geometry

## Mass spectrometry
LV: Year 1 · Application
S: Mass spectrometry measures the mass-to-charge ratio of ions. This lesson explains how a mass spectrometer works and what the spectrum shows.
O: Describe the stages of mass spectrometry
O: Identify the molecular ion peak
O: Use isotope patterns to identify elements
H: How it works
- **Ionisation**: molecules become ions, by electron impact or electrospray.
- **Acceleration**: ions are accelerated by an electric field.
- **Separation**: ions are separated by mass-to-charge ratio (m/z).
- **Detection**: ions are counted to give abundance.
H: Reading a spectrum
- The **molecular ion** (M⁺) gives the relative molecular mass.
- The **base peak** is the tallest, set to 100%.
- **M+1** peaks come from ¹³C.
- **M+2** peaks show Cl (3:1) or Br (1:1).
P: Mass spectrometry needs only tiny samples and is used in drug testing, forensic science and to date archaeological samples. Electrospray ionisation lets large biomolecules such as proteins be analysed, recognised by the 2002 Nobel Prize.
X: A compound containing bromine.
> The spectrum shows peaks at m/z 108 and 110.
> They are of equal height.
> ⁷⁹Br and ⁸¹Br occur in roughly equal amounts.
> The compound contains one bromine atom: C₂H₅Br.
K: Mass spectrometry ionises, accelerates, separates by m/z and detects ions; the molecular ion gives Mr, the base peak is the most abundant and M+1 and M+2 peaks reveal carbon count, chlorine and bromine.
!: Assuming the tallest peak is the molecular ion. The base peak is often a fragment.
EV: established | Electrospray ionisation enables mass spectrometry of large biomolecules (Fenn et al., 1989).
T: Molecular ion | The ion formed from the whole molecule
T: Base peak | The most abundant ion, set to 100%
T: m/z | Mass-to-charge ratio
SUM: Ionise, accelerate, separate, detect.
SUM: M⁺ gives Mr.
SUM: Isotope patterns.
SRC: Fenn J. B. et al., "Electrospray ionization for mass spectrometry of large biomolecules", Science 246(4926), 64–71 | primary | 1989
SRC: Royal Society of Chemistry, Mass spectrometry | guidance | 2024 | https://edu.rsc.org/
Q: What does the molecular ion peak give? | The relative molecular mass.
Q: What M : M+2 ratio shows one chlorine atom? | About 3 : 1.
M1#chemistry-u15-15-q1@1: What is the base peak in a mass spectrum? | The tallest peak, set to 100% abundance | The peak with the highest m/z | The molecular ion peak always | The peak at m/z 0 | The base peak is the most abundant ion and is set to 100%.
M2#chemistry-u15-15-q2@2: Why do bromine compounds show M and M+2 peaks of equal height? | ⁷⁹Br and ⁸¹Br occur in nearly equal amounts | Bromine has only one isotope | The molecule loses two hydrogens | Bromine doubles the mass | The roughly 1 : 1 abundance of ⁷⁹Br and ⁸¹Br sets the peak ratio.
SEQ1#chemistry-u15-15-q3@1: Put the stages of mass spectrometry in order. | Ionisation of the sample ; Acceleration by an electric field ; Separation by m/z ; Detection of ions | Each ion is counted after separation.
M3#chemistry-u15-15-q4@3: Why did electrospray ionisation transform biochemistry? | It ionises large molecules such as proteins without breaking them | It only works on small molecules | It destroys all large biomolecules | It replaces the need for separation | Gentle ionisation keeps big molecules intact.
SA2#chemistry-u15-15-q5@1,3: Explain how mass spectrometry works and what it shows. | Molecules are ionised by electron impact or electrospray, accelerated by an electric field, separated by mass-to-charge ratio and detected. The molecular ion gives the relative molecular mass, while the base peak is the most abundant ion. M+1 peaks come from ¹³C, and M+2 peaks reveal chlorine (3:1) or bromine (1:1), as in C₂H₅Br at m/z 108 and 110. Electrospray allows proteins to be analysed. Mass spectrometry is used in drug testing and forensics. | Stages ; Molecular ion ; Base peak ; Isotope patterns ; Applications

## Fragmentation patterns
LV: Year 1 · Chemical reasoning
S: Molecular ions often break into fragments. This lesson explains how fragmentation patterns reveal structure.
O: Explain how molecular ions fragment
O: Identify common fragment ions and neutral losses
O: Use fragments to distinguish isomers
H: Fragmentation
- The molecular ion is a **radical cation**, M⁺•.
- It breaks into a **cation** (detected) and a **radical** (not detected).
- Stable cations give strong peaks.
- Fragments reveal parts of the structure.
H: Common fragments
- m/z 15: CH₃⁺; m/z 29: C₂H₅⁺ or CHO⁺.
- m/z 43: CH₃CO⁺ or C₃H₇⁺.
- m/z 77: C₆H₅⁺ (phenyl).
- Losses: M − 15 (CH₃), M − 18 (H₂O), M − 29 (C₂H₅).
P: Isomers with the same molecular ion can give different fragments. Propanone gives a strong peak at m/z 43 (CH₃CO⁺), while propanal gives a peak at 29 (C₂H₅⁺ or CHO⁺). Libraries of fragmentation patterns help identify unknowns.
X: Butanone's spectrum.
> Molecular ion at m/z 72.
> Peak at 57: loss of CH₃ (72 − 15).
> Peak at 43: CH₃CO⁺ (base peak).
> Peak at 29: C₂H₅⁺.
K: Molecular ions fragment into detected cations and undetected radicals; stable fragments give strong peaks, common fragments and neutral losses reveal structure and fragmentation distinguishes isomers.
!: Expecting the radical fragment to appear in the spectrum. Only charged fragments are detected.
EV: established | Fragmentation patterns are used to identify organic compounds (McLafferty and Tureček, 1993).
T: Fragment ion | A charged piece of the molecular ion
T: Radical cation | An ion with both a positive charge and an unpaired electron
T: Neutral loss | The mass difference from a lost uncharged fragment
SUM: M⁺• breaks apart.
SUM: Stable cations show.
SUM: Fingerprint isomers.
SRC: McLafferty F. W. and Tureček F., Interpretation of Mass Spectra, 4th edition, University Science Books | secondary | 1993
SRC: Pretsch E. et al., Structure Determination of Organic Compounds, 4th edition, Springer | secondary | 2009
Q: What fragment gives m/z 77? | The phenyl cation, C₆H₅⁺.
Q: What neutral loss gives M − 18? | Water.
M1#chemistry-u15-16-q1@1: Which fragment gives a peak at m/z 43 for propanone? | CH₃CO⁺ | CH₃⁺ | C₂H₅⁺ | C₆H₅⁺ | Breaking off a methyl leaves the acylium ion at 43.
M2#chemistry-u15-16-q2@2: Why does only one of the two fragments appear in the spectrum? | Only the positively charged fragment is detected | Both fragments are always detected | The radical has a larger mass | The cation is destroyed | The instrument separates and detects ions only.
MATCH1#chemistry-u15-16-q3@2: Match each m/z value to its fragment. | 15 = CH₃⁺ ; 29 = C₂H₅⁺ ; 43 = CH₃CO⁺ ; 77 = C₆H₅⁺ | Common fragments help identification.
M3#chemistry-u15-16-q4@3: Why do stable fragments give tall peaks? | More molecular ions break to form the more stable cation | Unstable fragments are always more abundant | Stability has no effect on fragmentation | Stable fragments carry no charge | Fragmentation favours lower-energy pathways.
SA2#chemistry-u15-16-q5@1,3: Explain how fragmentation patterns reveal structure. | The molecular ion is a radical cation that breaks into a cation, which is detected, and a radical, which is not. Stable cations give strong peaks. Common fragments include CH₃⁺ at 15, C₂H₅⁺ at 29, CH₃CO⁺ at 43 and C₆H₅⁺ at 77, and neutral losses such as M − 15 and M − 18 show lost methyl and water. Butanone gives peaks at 72, 57, 43 and 29. Isomers such as propanone and propanal give different fragments, and libraries help identify compounds. | Radical cations ; Detected fragments ; Common fragments ; Neutral losses ; Isomers

## High-resolution mass spectrometry
LV: Year 1 · Application
S: High-resolution mass spectrometry measures masses very precisely. This lesson explains how this gives molecular formulas.
O: Explain the difference between nominal and accurate mass
O: Use accurate mass to find molecular formulas
O: Describe applications of high-resolution mass spectrometry
H: Accurate mass
- Isotopic masses are not whole numbers: ¹H = 1.0078, ¹⁶O = 15.9949, ¹⁴N = 14.0031, ¹²C = 12.0000.
- Molecules with the same **nominal mass** have different **accurate masses**.
- HRMS measures m/z to **four or more** decimal places.
- Comparing with calculated masses identifies the formula.
H: Applications
- Identifying unknowns in drug discovery.
- Detecting **doping** substances in sport.
- **Proteomics**: identifying proteins from peptide masses.
- Environmental screening for unknown pollutants.
P: CO, N₂ and C₂H₄ all have nominal mass 28, but accurate masses of 27.9949, 28.0062 and 28.0313. HRMS can distinguish them easily. Modern Orbitrap and time-of-flight instruments achieve accuracy within a few parts per million.
X: Choosing a formula.
> A molecular ion has m/z 60.0211.
> C₃H₈O = 60.0575; C₂H₄O₂ = 60.0211; CH₄N₂O = 60.0324.
> The measured value matches C₂H₄O₂.
> The compound could be ethanoic acid.
K: High-resolution mass spectrometry measures accurate masses to four or more decimal places, using non-integer isotopic masses to distinguish formulas with the same nominal mass, with uses in drug discovery, sport, proteomics and environmental analysis.
!: Thinking molecules with the same Mr are indistinguishable by mass spectrometry. High resolution separates them.
EV: established | High-resolution mass analysers can achieve mass accuracy of a few ppm (Makarov, 2000).
T: Nominal mass | Mass using whole-number isotope masses
T: Accurate mass | Mass measured to several decimal places
T: Mass accuracy | Agreement between measured and calculated mass
SUM: Non-integer masses.
SUM: Formula from accurate mass.
SUM: Many applications.
SRC: Makarov A., "Electrostatic axially harmonic orbital trapping: a high-performance technique of mass analysis", Analytical Chemistry 72(6), 1156–1162 | primary | 2000
SRC: Gross J. H., Mass Spectrometry: A Textbook, 3rd edition, Springer | secondary | 2017
Q: What does HRMS measure that low-resolution MS does not? | Mass to four or more decimal places.
Q: Why do CO and N₂ differ in accurate mass? | Isotopic masses are not exact whole numbers.
M1#chemistry-u15-17-q1@1: Which formula matches an accurate mass of 60.0211? | C₂H₄O₂ | C₃H₈O | CH₄N₂O | C₂H₈N₂ | The measured value matches the calculated mass for C₂H₄O₂.
M2#chemistry-u15-17-q2@2: Why does HRMS help in sports doping tests? | It identifies exact formulas of banned substances in complex samples | It measures the athlete's heart rate during races | It only detects proteins, not small molecules | It cannot measure any small drug molecules | Accurate masses distinguish drugs from similar compounds.
MATCH1#chemistry-u15-17-q3@2: Match each species to its accurate mass. | CO = 27.9949 ; N₂ = 28.0062 ; C₂H₄ = 28.0313 ; ¹⁶O = 15.9949 | Accurate masses separate same-nominal-mass species.
M3#chemistry-u15-17-q4@3: Why does ¹²C have a mass of exactly 12.0000? | It is defined as the standard for atomic mass units | It has no protons | All atoms have whole-number masses | It is the heaviest isotope | The unified atomic mass unit is based on ¹²C.
SA2#chemistry-u15-17-q5@1,3: Explain high-resolution mass spectrometry. | High-resolution mass spectrometry measures m/z to four or more decimal places. Because isotopic masses are not whole numbers, such as ¹H = 1.0078 and ¹⁶O = 15.9949, compounds with the same nominal mass have different accurate masses: CO, N₂ and C₂H₄ are all 28 but differ at the decimals. Comparing a measured mass with calculated ones gives the formula, so 60.0211 matches C₂H₄O₂. HRMS is used in drug discovery, doping control, proteomics and environmental screening. | Accurate mass ; Isotopic masses ; Formula determination ; Instruments ; Applications

## Raman spectroscopy
LV: Year 1 · Application
S: Raman spectroscopy studies molecular vibrations through scattered light. This lesson compares it with infrared spectroscopy.
O: Explain the Raman effect
O: Compare Raman and IR spectroscopy
O: Describe applications of Raman spectroscopy
H: The Raman effect
- A laser shines on a sample; most light scatters at the same energy (**Rayleigh**).
- A tiny fraction scatters with **changed energy** (**Raman**).
- The energy shift equals a vibrational energy.
- Raman shifts are given in cm⁻¹, like IR.
H: Raman versus IR
- IR needs a change in **dipole moment**; Raman needs a change in **polarisability**.
- Symmetric vibrations such as N≡N and C=C are often strong in Raman.
- **Water** gives weak Raman signals, so aqueous samples are easy.
- Raman needs little sample preparation and works through glass.
P: Raman and IR give complementary information. Handheld Raman spectrometers identify drugs and explosives through packaging. Raman is used to study art pigments, minerals and carbon materials such as graphene.
X: Detecting a counterfeit tablet.
> A handheld Raman spectrometer is aimed at a sealed blister pack.
> The laser passes through the plastic.
> The spectrum is compared with the genuine product.
> Missing active-ingredient peaks reveal a counterfeit.
K: Raman spectroscopy measures energy shifts in scattered laser light caused by vibrations requiring polarisability changes; it complements IR, suits symmetric bonds and aqueous samples and works through packaging.
!: Thinking Raman and IR give identical spectra. Different selection rules make them complementary.
EV: established | Raman scattering was discovered by C. V. Raman in 1928 (Raman and Krishnan, 1928).
T: Raman scattering | Inelastic scattering of light with energy change
T: Rayleigh scattering | Elastic scattering with no energy change
T: Polarisability | How easily an electron cloud is distorted
SUM: Scattered light shifts.
SUM: Complements IR.
SUM: Works through glass.
SRC: Raman C. V. and Krishnan K. S., "A new type of secondary radiation", Nature 121, 501–502 | primary | 1928
SRC: Smith E. and Dent G., Modern Raman Spectroscopy: A Practical Approach, 2nd edition, Wiley | secondary | 2019
Q: What property must change for a vibration to be Raman active? | Polarisability.
Q: Why is Raman good for aqueous samples? | Water gives only weak Raman signals.
M1#chemistry-u15-18-q1@1: Which bond gives a strong Raman signal but no IR absorption? | The symmetric N≡N stretch in nitrogen | The O–H stretch in water | The C=O stretch in propanone | The N–H stretch in ammonia | Symmetric stretches change polarisability, not dipole.
M2#chemistry-u15-18-q2@2: Why can Raman analyse drugs through plastic packaging? | The laser passes through and scattered light returns from the sample | The Raman laser dissolves the plastic packaging | Plastic gives no Raman signals whatsoever | Raman measures only the very outer surface | Visible or near-IR lasers penetrate transparent containers.
MATCH1#chemistry-u15-18-q3@2: Match each technique to its requirement. | IR absorption = Dipole change ; Raman scattering = Polarisability change ; Rayleigh scattering = No energy change ; Raman shift = Vibrational energy | Different physics gives complementary spectra.
M3#chemistry-u15-18-q4@3: Why are Raman and IR described as complementary? | Vibrations weak in one are often strong in the other | They measure completely unrelated properties | They always give identical spectra | Raman measures only electronic transitions | Different selection rules reveal different vibrations.
SA2#chemistry-u15-18-q5@1,3: Compare Raman spectroscopy with infrared spectroscopy. | In Raman spectroscopy, a laser illuminates the sample; most light scatters unchanged (Rayleigh), but a small fraction scatters with energy changed by a vibrational energy (Raman), given as shifts in cm⁻¹. IR absorption needs a dipole change, whereas Raman needs a polarisability change, so symmetric bonds such as N≡N and C=C are strong in Raman. Water is a weak Raman scatterer, so aqueous samples are easy, and measurements work through glass and packaging, as in counterfeit drug detection. | Raman effect ; Selection rules ; Complementarity ; Water ; Applications

## Fluorescence spectroscopy
LV: Year 1 · Application
S: Fluorescent molecules emit light after absorbing it. This lesson explains fluorescence and its sensitive analytical uses.
O: Explain absorption and emission in fluorescence
O: Explain why emitted light has a longer wavelength
O: Describe applications of fluorescence
H: Fluorescence
- A molecule absorbs light and is excited to a higher electronic state.
- Some energy is lost as heat through vibrations.
- It returns to the ground state by **emitting** light.
- Emission is at **longer wavelength** than absorption (**Stokes shift**).
H: Analytical use
- Emission intensity is proportional to concentration at low levels.
- Fluorescence is very **sensitive**, detecting tiny amounts.
- Measured at 90° to the excitation beam to avoid transmitted light.
- **Quenching** by other species reduces emission.
P: Fluorescent tags such as green fluorescent protein (GFP) let scientists track molecules in living cells, earning the 2008 Nobel Prize. Fluorescence is used in DNA sequencing, medical diagnostics and detecting trace pollutants. Phosphorescence is a slower emission that continues after the light source is removed.
X: Measuring quinine in tonic water.
> Quinine absorbs UV light at 350 nm.
> It emits blue light at about 450 nm.
> Emission intensity is measured at 90°.
> A calibration curve gives quinine concentration.
K: Fluorescence occurs when molecules absorb light, lose some energy as heat and emit longer-wavelength light; it is highly sensitive, measured at 90° to the beam, can be quenched and is used in biology, diagnostics and trace analysis.
!: Thinking emitted light has the same wavelength as absorbed light. Energy lost first makes it longer.
EV: established | Green fluorescent protein enabled imaging of proteins in living cells (Chalfie et al., 1994).
T: Fluorescence | Emission of light shortly after absorbing light
T: Stokes shift | The difference between absorption and emission wavelengths
T: Quenching | Reduction of fluorescence by other species
SUM: Absorb, relax, emit.
SUM: Longer wavelength out.
SUM: Very sensitive.
SRC: Chalfie M. et al., "Green fluorescent protein as a marker for gene expression", Science 263(5148), 802–805 | primary | 1994
SRC: Lakowicz J. R., Principles of Fluorescence Spectroscopy, 3rd edition, Springer | secondary | 2006
Q: What is the Stokes shift? | The difference between absorption and emission wavelengths.
Q: Why is fluorescence measured at 90° to the beam? | To avoid detecting the transmitted excitation light.
M1#chemistry-u15-19-q1@1: Why is emitted fluorescent light at a longer wavelength? | Some energy is lost as heat before emission | The molecule gains energy before emitting | Light always speeds up on emission | Emission involves nuclear spin flips | Losing some energy first means lower-energy, longer-wavelength emission.
M2#chemistry-u15-19-q2@2: Why is fluorescence more sensitive than absorbance methods? | Emitted light is measured against a dark background | It measures much larger concentrations | It needs no light source | Absorbance cannot detect any compounds | A small signal against darkness is easier to detect.
MATCH1#chemistry-u15-19-q3@2: Match each term to its meaning. | Fluorescence = Fast emission ; Phosphorescence = Slow, delayed emission ; Quenching = Reduced emission ; GFP = Fluorescent protein tag | Light emission has several forms.
M3#chemistry-u15-19-q4@3: Why did GFP transform cell biology? | It lets proteins be tracked in living cells by their glow | It kills cells for easier study | It replaces all microscopes | It only works in dead tissue | Genetically fused tags show where proteins go.
SA2#chemistry-u15-19-q5@1,3: Explain fluorescence and its analytical uses. | In fluorescence, a molecule absorbs light and is excited, loses some energy as heat and emits light at a longer wavelength, the Stokes shift. At low concentrations emission is proportional to concentration, and measuring at 90° against a dark background makes fluorescence very sensitive. Quenching reduces emission. Quinine in tonic water absorbs at 350 nm and emits at 450 nm. GFP tags let proteins be tracked in living cells, and fluorescence is used in DNA sequencing and diagnostics. | Absorption and emission ; Stokes shift ; Sensitivity ; Quenching ; Applications

## X-ray diffraction
LV: Year 1 · Chemical reasoning
S: X-ray diffraction reveals the arrangement of atoms in crystals. This lesson explains how it works and what it shows.
O: Explain how crystals diffract X-rays
O: Apply the Bragg equation
O: Describe what X-ray crystallography reveals
H: Diffraction
- X-ray wavelengths (about 0.1 nm) are similar to atomic spacings.
- Planes of atoms in a crystal **diffract** X-rays.
- Constructive interference occurs when **nλ = 2d sin θ** (Bragg's law).
- The pattern of spots depends on the crystal structure.
H: What it shows
- **Single-crystal** diffraction gives exact atomic positions, bond lengths and angles.
- **Powder** diffraction identifies crystalline phases.
- X-rays scatter from **electrons**, so heavy atoms show most strongly.
- Hydrogen atoms are hard to locate.
P: X-ray crystallography revealed the structures of DNA, proteins such as myoglobin and many medicines. Dorothy Hodgkin determined the structures of penicillin, vitamin B12 and insulin. Powder diffraction is used to identify minerals and check drug crystal forms.
X: Using Bragg's law.
> X-rays of λ = 0.154 nm diffract at θ = 15.0° (n = 1).
> d = nλ ÷ (2 sin θ).
> d = 0.154 ÷ (2 × 0.259) = 0.297 nm.
> The spacing between atomic planes is about 0.30 nm.
K: Crystals diffract X-rays when Bragg's law nλ = 2d sin θ is met; single-crystal diffraction gives atomic positions and bond lengths, powder diffraction identifies phases and X-rays scatter from electrons, so hydrogen is hard to see.
!: Thinking X-ray diffraction images individual atoms directly. It records a pattern that must be computed into a structure.
EV: established | Bragg's law relates diffraction angles to crystal plane spacing (Bragg and Bragg, 1913).
T: Bragg's law | nλ = 2d sin θ
T: Diffraction | Spreading of waves by a regular structure
T: Unit cell | The repeating unit of a crystal lattice
SUM: X-rays meet crystal planes.
SUM: Bragg's law.
SUM: Atomic structures.
SRC: Bragg W. H. and Bragg W. L., "The reflection of X-rays by crystals", Proceedings of the Royal Society A 88(605), 428–438 | primary | 1913
SRC: Hodgkin D. C., "The X-ray analysis of complicated molecules (Nobel lecture)", Nobel Foundation | primary | 1964 | https://www.nobelprize.org/prizes/chemistry/1964/hodgkin/lecture/
Q: What is Bragg's law? | nλ = 2d sin θ.
Q: Why are hydrogen atoms hard to locate by X-ray diffraction? | They have very few electrons to scatter X-rays.
M1#chemistry-u15-20-q1@1: What does single-crystal X-ray diffraction reveal? | Exact atomic positions, bond lengths and angles | Only the colour of the crystal | The molecular mass directly | The number of hydrogen environments | Diffraction data are converted into a 3D electron density map.
M2#chemistry-u15-20-q2@2: Why are X-rays used rather than visible light? | Their wavelength is similar to the spacing between atoms | They are cheaper than visible light | Visible light is diffracted more strongly by atoms | X-rays have very long wavelengths | Diffraction needs wavelength close to the spacing.
NUM1#chemistry-u15-20-q3@3: Using nλ = 2d sin θ with λ = 0.154 nm, n = 1 and sin θ = 0.385, what is d in nm? | 0.200 | 0.005 | nm | d = 0.154 ÷ (2 × 0.385) = 0.200 nm spacing between planes.
M3#chemistry-u15-20-q4@3: How does powder diffraction help the pharmaceutical industry? | It identifies which crystal form of a drug is present | It measures drug colour | It replaces clinical trials | It only works on liquids | Different polymorphs give different patterns and properties.
SA2#chemistry-u15-20-q5@1,3: Explain X-ray diffraction and what it reveals. | X-rays have wavelengths similar to atomic spacings, so planes of atoms in a crystal diffract them, interfering constructively when Bragg's law nλ = 2d sin θ is met, giving a pattern of spots. Single-crystal diffraction gives exact atomic positions, bond lengths and angles, while powder diffraction identifies crystalline phases and drug polymorphs. X-rays scatter from electrons, so heavy atoms show strongly and hydrogen is hard to locate. Crystallography revealed DNA, protein, penicillin and vitamin B12 structures. | Diffraction ; Bragg's law ; Single crystal ; Powder ; Applications

## Chromatography
LV: Year 1 · Foundation
S: Chromatography separates mixtures. This lesson explains the principles common to all chromatographic methods.
O: Describe stationary and mobile phases
O: Explain separation by partition and adsorption
O: Define retention time and Rf value
H: Principles
- A **mobile phase** carries the mixture through a **stationary phase**.
- Components separate because they interact differently with the two phases.
- **Partition**: distribution between two liquids, or a liquid and gas.
- **Adsorption**: sticking to a solid surface.
H: Measuring separation
- **Rf** = distance moved by spot ÷ distance moved by solvent (TLC, paper).
- **Retention time**: time to pass through a column (GC, HPLC).
- **Resolution**: how well peaks are separated.
- Components can be identified by comparison with standards.
P: Mikhail Tsvet invented chromatography in 1906 to separate plant pigments. Today it is used everywhere from drug testing to food analysis. Components that spend more time in the stationary phase move more slowly.
X: Separating a mixture.
> A mixture of two dyes is spotted on a TLC plate.
> Solvent rises up the plate.
> The less polar dye moves further on polar silica.
> Two spots appear with different Rf values.
K: Chromatography separates components between a mobile and a stationary phase by partition or adsorption; Rf values and retention times characterise components and comparison with standards identifies them.
!: Thinking Rf values are fixed for a compound in all conditions. They depend on the solvent and stationary phase.
EV: established | Tsvet first used chromatography to separate plant pigments (Tsvet, 1906).
T: Mobile phase | The moving phase carrying the mixture
T: Stationary phase | The fixed phase in chromatography
T: Rf value | Distance moved by spot ÷ distance moved by solvent
SUM: Mobile and stationary phases.
SUM: Partition and adsorption.
SUM: Rf and retention time.
SRC: Tsvet M. S., "Physikalisch-chemische Studien über das Chlorophyll. Die Adsorptionen", Berichte der Deutschen Botanischen Gesellschaft 24, 316–323 | primary | 1906
SRC: Royal Society of Chemistry, Chromatography | guidance | 2024 | https://edu.rsc.org/
Q: What is the mobile phase? | The phase that moves and carries the mixture.
Q: How is Rf calculated? | Distance moved by spot ÷ distance moved by solvent.
M1#chemistry-u15-21-q1@1: Which separation mechanism involves sticking to a solid surface? | Adsorption | Partition | Distillation | Filtration | Adsorbed components are held on the stationary solid.
M2#chemistry-u15-21-q2@2: Why do components separate in chromatography? | They interact differently with the mobile and stationary phases | They all move at the same speed | They react with the solvent | They have the same polarity | Different affinities give different rates of movement.
NUM1#chemistry-u15-21-q3@1: A spot moves 3.6 cm while the solvent moves 9.0 cm. What is the Rf? | 0.40 | 0.01 | no units | Rf = 3.6 ÷ 9.0 = 0.40, a ratio with no units.
M3#chemistry-u15-21-q4@3: Why must standards be run under the same conditions as samples? | Rf values and retention times change with conditions | Standards always move further than samples | Conditions have no effect on chromatography | Standards are only used to check colour | Identification needs a fair comparison under identical conditions.
SA2#chemistry-u15-21-q5@1,3: Explain the principles of chromatography. | A mobile phase carries a mixture through a stationary phase, and components separate because they interact differently with the two phases, by partition between two phases or adsorption onto a solid. Components held more strongly by the stationary phase move more slowly. Separation is measured by Rf, the distance moved by a spot divided by the solvent distance, or by retention time in columns. Since these depend on conditions, standards are run alongside samples for identification. Tsvet invented the method in 1906. | Phases ; Partition and adsorption ; Rf ; Retention time ; Standards

## Thin-layer chromatography
LV: Year 1 · Application
S: Thin-layer chromatography is a quick separation technique. This lesson explains how to run and interpret TLC.
O: Describe how to carry out TLC
O: Explain how polarity affects Rf values
O: Describe uses of TLC in the laboratory
H: Method
- A plate is coated with **silica** or **alumina** (polar stationary phase).
- Spots are applied on a **pencil** baseline above the solvent level.
- The plate develops in a covered tank until solvent nears the top.
- Spots are seen by **UV light**, iodine or chemical stains.
H: Interpreting results
- **Polar** compounds stick to silica and have **low Rf**.
- **Less polar** compounds move further: **high Rf**.
- A more polar solvent increases all Rf values.
- One spot suggests purity; several spots show a mixture.
P: TLC is used to monitor reactions: the starting material spot fades as a new product spot appears. It is cheap, fast and needs tiny samples, and it helps choose solvents for column chromatography.
X: Monitoring a reaction.
> Spots of starting material, reaction mixture and product are run side by side.
> At first, the mixture shows only the starting material spot.
> Over time, a new spot with a different Rf appears.
> When the starting material spot disappears, the reaction is complete.
K: TLC uses a polar silica or alumina plate and a solvent; polar compounds have low Rf, spots are viewed under UV or by staining and TLC is used to check purity, monitor reactions and choose solvents.
!: Drawing the baseline in pen. Ink dissolves and runs with the solvent.
EV: established | TLC is widely used for reaction monitoring in organic synthesis (Stahl, 1969).
T: TLC | Thin-layer chromatography
T: Baseline | The pencil line where samples are spotted
T: Solvent front | The furthest point reached by the solvent
SUM: Silica plate.
SUM: Polar means low Rf.
SUM: Monitor reactions.
SRC: Stahl E., Thin-Layer Chromatography: A Laboratory Handbook, 2nd edition, Springer | secondary | 1969
SRC: Royal Society of Chemistry, Thin-layer chromatography | guidance | 2024 | https://edu.rsc.org/
Q: Why is the baseline drawn in pencil? | Pencil does not dissolve and run in the solvent.
Q: How are colourless spots seen on TLC plates? | Under UV light or with stains such as iodine.
M1#chemistry-u15-22-q1@1: Which compound has the lowest Rf on silica? | The most polar compound | The least polar compound | A non-polar hydrocarbon | The solvent itself | Polar compounds bind strongly to polar silica.
M2#chemistry-u15-22-q2@2: Why must the baseline be above the solvent level in the tank? | Otherwise the spots dissolve into the solvent pool | It makes the solvent move faster | It increases all Rf values | The solvent cannot rise past the baseline | Samples must be carried up the plate, not washed away.
MATCH1#chemistry-u15-22-q3@2: Match each observation to its meaning. | One spot = Likely pure ; Several spots = Mixture ; Starting spot gone = Reaction complete ; Low Rf = Polar compound | TLC results are read from spot positions.
M3#chemistry-u15-22-q4@3: Why does a more polar solvent increase Rf values? | It competes better for silica sites and carries compounds further | It makes the silica plate less polar overall | It decreases the solubility of each compound | It stops the solvent rising up the plate | Stronger eluent displaces compounds from the stationary phase.
SA2#chemistry-u15-22-q5@1,3: Describe thin-layer chromatography and its uses. | A TLC plate is coated with polar silica or alumina, and samples are spotted on a pencil baseline above the solvent level. The plate develops in a covered tank, and spots are seen under UV light or with stains. Polar compounds stick to silica and have low Rf, while less polar compounds move further; more polar solvents raise all Rf values. One spot suggests purity. TLC is quick and cheap, used to monitor reactions as the starting material spot disappears and to choose column solvents. | Method ; Visualisation ; Polarity and Rf ; Purity ; Reaction monitoring

## Gas chromatography
LV: Year 1 · Application
S: Gas chromatography separates volatile compounds. This lesson explains how GC works and what it measures.
O: Describe the parts of a gas chromatograph
O: Explain separation in GC
O: Use peak areas for quantitative analysis
H: The instrument
- An inert **carrier gas** (helium or nitrogen) is the mobile phase.
- A long, thin **column** contains a liquid stationary phase.
- The column is in an **oven** whose temperature can be programmed.
- A **detector**, such as a flame ionisation detector (FID), records each component.
H: Separation and results
- Components separate by **boiling point** and interaction with the stationary phase.
- Each gives a **peak** at its **retention time**.
- **Peak area** is proportional to amount.
- Only **volatile** and thermally stable compounds can be analysed.
P: GC is used to test blood alcohol levels, analyse fuels and detect pesticides. The relative peak areas give the percentage composition of a mixture. Temperature programming speeds up elution of high-boiling components.
X: Finding ethanol in a sample.
> A standard of ethanol has retention time 2.3 min.
> The sample shows a peak at 2.3 min.
> Its area is compared with a calibration curve.
> The ethanol concentration is calculated.
K: GC uses an inert carrier gas and a heated column with a liquid stationary phase to separate volatile compounds by boiling point and interaction; retention times identify components and peak areas quantify them.
!: Using GC for non-volatile substances such as sugars or proteins. They do not vaporise without decomposing.
EV: established | Gas-liquid chromatography was introduced by James and Martin (James and Martin, 1952).
T: Carrier gas | Inert gas acting as the mobile phase in GC
T: Retention time | Time for a component to pass through the column
T: Flame ionisation detector | A common GC detector for organic compounds
SUM: Gas carries, liquid holds.
SUM: Retention time identifies.
SUM: Peak area quantifies.
SRC: James A. T. and Martin A. J. P., "Gas-liquid partition chromatography", Biochemical Journal 50(5), 679–690 | primary | 1952
SRC: McNair H. M., Miller J. M. and Snow N. H., Basic Gas Chromatography, 3rd edition, Wiley | secondary | 2019
Q: What is the mobile phase in GC? | An inert carrier gas such as helium.
Q: What does peak area show in GC? | The amount of the component.
M1#chemistry-u15-23-q1@1: What type of compound can be analysed by GC? | Volatile, thermally stable compounds | Large proteins | Ionic salts | Non-volatile sugars | Components must vaporise without decomposing.
M2#chemistry-u15-23-q2@2: Why is the oven temperature often increased during a GC run? | To elute high-boiling components faster | To cool the column down | To slow all components | To stop the carrier gas | Temperature programming shortens analysis time.
NUM1#chemistry-u15-23-q3@2: Peak areas are 300 for A and 700 for B. What percentage of the mixture is A (assuming equal response)? | 30 | 0.5 | % | 300 ÷ (300 + 700) × 100 = 30% of the mixture is A.
M3#chemistry-u15-23-q4@3: Why must an inert carrier gas be used? | It must not react with samples or the stationary phase | Inert gases are the only gases available | Reactive gases improve separation | The carrier gas acts as the stationary phase | Reactions would alter the components being measured.
SA2#chemistry-u15-23-q5@1,3: Explain how gas chromatography works. | In gas chromatography, an inert carrier gas such as helium carries a vaporised sample through a long column containing a liquid stationary phase in a programmable oven. Components separate by boiling point and interaction with the stationary phase, emerging at characteristic retention times, and a detector such as an FID records peaks. Peak areas are proportional to amounts. Only volatile, thermally stable compounds can be analysed. GC is used for blood alcohol, fuels and pesticides. | Carrier gas ; Column and oven ; Separation ; Retention time ; Peak area

## High-performance liquid chromatography
LV: Year 1 · Application
S: HPLC separates compounds in solution at high pressure. This lesson explains how it works and why it is so widely used.
O: Describe the parts of an HPLC system
O: Distinguish normal-phase and reversed-phase HPLC
O: Explain why HPLC suits non-volatile compounds
H: The system
- A **pump** forces the liquid mobile phase through at high pressure.
- The **column** is packed with tiny particles, giving high resolution.
- A **UV detector** is most common; others include fluorescence and MS.
- **Gradient elution** changes solvent composition during a run.
H: Phases
- **Reversed-phase**: non-polar stationary phase (C18) and polar solvent (water and methanol).
- In reversed-phase, **polar** compounds elute **first**.
- **Normal-phase**: polar stationary phase and non-polar solvent.
- Reversed-phase is used for most analyses.
P: HPLC handles non-volatile and heat-sensitive compounds such as drugs, proteins and vitamins, which GC cannot. It is the main method for pharmaceutical quality control and for measuring caffeine in drinks.
X: Measuring caffeine in cola.
> Degassed cola is filtered and injected.
> A C18 column with water-methanol separates the components.
> A UV detector at 273 nm records caffeine's peak.
> Its area is compared with standards.
K: HPLC pumps a liquid mobile phase at high pressure through a column of tiny particles, usually in reversed-phase mode where polar compounds elute first, and suits non-volatile and heat-sensitive compounds such as drugs and proteins.
!: Thinking non-polar compounds elute first in reversed-phase. They stick to the C18 phase and elute later.
EV: established | Reversed-phase HPLC is the dominant method for pharmaceutical analysis (Snyder, Kirkland and Dolan, 2010).
T: HPLC | High-performance liquid chromatography
T: Reversed-phase | Non-polar stationary phase with a polar mobile phase
T: Gradient elution | Changing solvent composition during a run
SUM: High pressure, small particles.
SUM: Reversed-phase common.
SUM: Non-volatile compounds.
SRC: Snyder L. R., Kirkland J. J. and Dolan J. W., Introduction to Modern Liquid Chromatography, 3rd edition, Wiley | secondary | 2010
SRC: Royal Society of Chemistry, High-performance liquid chromatography | guidance | 2024 | https://edu.rsc.org/
Q: What is the stationary phase in reversed-phase HPLC? | A non-polar phase such as C18.
Q: Which compounds elute first in reversed-phase HPLC? | Polar compounds.
M1#chemistry-u15-24-q1@1: Which detector is most common in HPLC? | A UV absorbance detector | A flame ionisation detector | A Geiger counter | A thermometer | Many analytes absorb UV light, so UV detectors suit most separations.
M2#chemistry-u15-24-q2@2: Why is HPLC used instead of GC for proteins? | Proteins are non-volatile and decompose on heating | Proteins are gases at room temperature | GC is more sensitive for proteins | HPLC needs no solvent | Liquid chromatography avoids vaporising the sample.
MATCH1#chemistry-u15-24-q3@2: Match each HPLC term to its meaning. | Reversed-phase = Non-polar column ; Normal-phase = Polar column ; Gradient elution = Changing solvent mix ; C18 = Common reversed-phase packing | HPLC has several modes.
M3#chemistry-u15-24-q4@3: Why do small particles give better resolution but need high pressure? | They give more surface area and efficiency but resist flow | They make the column shorter | They stop all flow | Large particles give higher resolution | Efficiency rises as particle size falls, but flow resistance rises too.
SA2#chemistry-u15-24-q5@1,3: Explain high-performance liquid chromatography. | In HPLC, a pump forces a liquid mobile phase at high pressure through a column packed with tiny particles, giving high resolution, and a detector, usually UV, records peaks. In reversed-phase HPLC, the most common mode, a non-polar C18 stationary phase is used with a polar solvent such as water and methanol, so polar compounds elute first; normal-phase is the reverse. Gradient elution changes solvent composition. HPLC suits non-volatile and heat-sensitive compounds such as drugs and proteins, and caffeine in cola. | System ; Reversed-phase ; Normal-phase ; Gradient elution ; Applications

## GC-MS
LV: Year 1 · Application
S: GC-MS combines gas chromatography with mass spectrometry. This lesson explains how the combination identifies compounds in mixtures.
O: Describe how GC and MS are combined
O: Explain the advantages of GC-MS
O: Describe applications of GC-MS
H: Combination
- GC **separates** the components.
- Each component enters the **mass spectrometer** as it elutes.
- MS gives a **mass spectrum** for each peak.
- Spectra are matched against **libraries** for identification.
H: Advantages
- Identifies compounds with **similar retention times**.
- Very **sensitive** and **selective**.
- Gives both identity and amount.
- Works for volatile organic compounds.
P: GC-MS is used in forensic science to identify drugs and fire accelerants, in airport security to detect explosives, in environmental monitoring and in sports doping control. It was used on Mars by robotic rovers to analyse soil.
X: Identifying an accelerant.
> Fire debris is heated and vapours are collected.
> GC separates the volatile compounds.
> MS shows fragmentation patterns matching petrol hydrocarbons.
> The fire is shown to have involved an accelerant.
K: GC-MS separates volatile mixtures by GC and identifies each component by its mass spectrum matched to libraries, giving sensitive identification and quantification used in forensics, security, environment and doping control.
!: Thinking retention time alone proves identity. Different compounds can share retention times; the mass spectrum confirms identity.
EV: established | GC-MS is the reference technique in forensic drug analysis (UNODC, 2024).
T: GC-MS | Gas chromatography-mass spectrometry
T: Spectral library | A database of reference mass spectra
T: Hyphenated technique | Combination of a separation with a detection method
SUM: Separate then identify.
SUM: Library matching.
SUM: Forensics and security.
SRC: UN Office on Drugs and Crime, Recommended methods for the identification and analysis of drugs | guidance | 2024 | https://www.unodc.org/unodc/en/scientists/publications_manuals.html
SRC: Gross J. H., Mass Spectrometry: A Textbook, 3rd edition, Springer | secondary | 2017
Q: What does the GC part of GC-MS do? | Separates the components of the mixture.
Q: How are components identified in GC-MS? | By matching mass spectra against libraries.
M1#chemistry-u15-25-q1@1: Which forensic task uses GC-MS? | Identifying fire accelerants in debris | Measuring the colour of paint | Counting fingerprints | Weighing evidence bags | Volatile hydrocarbons separate and give recognisable spectra.
M2#chemistry-u15-25-q2@2: Why is GC-MS more reliable than GC alone? | The mass spectrum confirms identity when retention times overlap | GC alone also produces full mass spectra | MS removes any need for a separation step | GC-MS uses no carrier gas, so it is cleaner | Two independent measurements make identification secure.
MATCH1#chemistry-u15-25-q3@2: Match each GC-MS use to its field. | Drug identification = Forensics ; Explosive detection = Security ; Pesticide residues = Environment ; Steroid testing = Sport | GC-MS is used across many fields.
M3#chemistry-u15-25-q4@3: Why is GC-MS limited to certain compounds? | Analytes must be volatile and stable enough to pass through the GC | Mass spectrometers cannot detect organic compounds | GC-MS only works for metal-containing samples | All compounds are far too volatile for GC | Non-volatile compounds need LC-MS instead.
SA2#chemistry-u15-25-q5@1,3: Explain GC-MS and its uses. | In GC-MS, gas chromatography separates a volatile mixture, and each component passes into a mass spectrometer as it elutes, giving a mass spectrum matched against libraries. This confirms identity even when retention times overlap and also quantifies components with high sensitivity and selectivity. It is limited to volatile, stable compounds. GC-MS identifies drugs and fire accelerants in forensics, explosives in security, pollutants in the environment and banned substances in sport, and has analysed Martian soil. | Separation ; Mass spectra ; Library matching ; Advantages ; Applications

## LC-MS
LV: Year 1 · Application
S: LC-MS combines liquid chromatography with mass spectrometry. This lesson explains its importance for non-volatile and biological molecules.
O: Describe how LC and MS are combined
O: Explain the role of soft ionisation
O: Describe applications of LC-MS
H: Combination
- HPLC separates the components in solution.
- The solvent is removed and analytes are ionised, usually by **electrospray (ESI)**.
- ESI is a **soft** ionisation that keeps molecules intact.
- **Tandem MS (MS/MS)** fragments selected ions for identification.
H: Applications
- **Drug metabolism** and pharmacokinetics.
- **Proteomics** and **metabolomics**.
- **Clinical** testing, such as newborn screening.
- Measuring contaminants and toxins in food.
P: LC-MS handles polar, non-volatile and heat-sensitive molecules that GC-MS cannot. Newborn blood spots are screened by tandem MS for metabolic disorders. LC-MS/MS achieves high selectivity by monitoring specific fragment ions.
X: Measuring a drug in plasma.
> Plasma is prepared and injected into the HPLC.
> The drug elutes at its retention time.
> ESI forms [M+H]⁺ ions.
> MS/MS monitors a specific fragment to quantify the drug.
K: LC-MS separates compounds by HPLC and ionises them by soft electrospray, often with tandem MS, making it the method of choice for non-volatile, polar and biological molecules in drug, clinical, food and omics analysis.
!: Expecting ESI to produce many fragments like electron impact. ESI is soft and mainly gives intact ions.
EV: established | Tandem mass spectrometry is used for newborn screening of metabolic disorders (Chace et al., 2003).
T: LC-MS | Liquid chromatography-mass spectrometry
T: Soft ionisation | Ionisation that leaves molecules largely intact
T: Tandem MS | Two stages of mass analysis with fragmentation between
SUM: HPLC then MS.
SUM: Electrospray.
SUM: Biology and medicine.
SRC: Chace D. H., Kalas T. A. and Naylor E. W., "Use of tandem mass spectrometry for multianalyte screening of dried blood specimens from newborns", Clinical Chemistry 49(11), 1797–1817 | primary | 2003
SRC: Fenn J. B. et al., "Electrospray ionization for mass spectrometry of large biomolecules", Science 246(4926), 64–71 | primary | 1989
Q: What ionisation method is most common in LC-MS? | Electrospray ionisation.
Q: What does tandem MS do? | Fragments selected ions for further analysis.
M1#chemistry-u15-26-q1@1: Which molecules are best analysed by LC-MS rather than GC-MS? | Polar, non-volatile molecules such as peptides | Small, volatile hydrocarbons such as hexane | Noble gases such as argon and neon | Simple permanent gases such as nitrogen | LC-MS avoids vaporising the sample, so polar molecules survive intact.
M2#chemistry-u15-26-q2@2: Why is electrospray called a soft ionisation method? | It forms ions with little fragmentation | It uses high-energy electrons | It breaks all molecules into atoms | It works only on solids | Intact molecular ions are preserved with very little fragmentation.
MATCH1#chemistry-u15-26-q3@2: Match each LC-MS use to its purpose. | Newborn screening = Metabolic disorders ; Pharmacokinetics = Drug levels over time ; Proteomics = Protein identification ; Food testing = Toxin detection | LC-MS is vital in health and safety.
M3#chemistry-u15-26-q4@3: Why does monitoring a specific fragment in MS/MS increase selectivity? | Few interfering compounds share both the parent mass and that fragment | It measures every compound in the sample at once | It removes the need for any chromatographic separation | Fragments are unique to every single compound | Two mass filters together exclude almost all interferences.
SA2#chemistry-u15-26-q5@1,3: Explain LC-MS and its applications. | LC-MS uses HPLC to separate compounds in solution, then removes the solvent and ionises analytes, usually by electrospray, a soft method that gives intact ions such as [M+H]⁺. Tandem MS fragments selected ions, and monitoring specific fragments gives high selectivity. LC-MS suits polar, non-volatile and heat-sensitive molecules, unlike GC-MS. It is used in drug metabolism, proteomics and metabolomics, newborn screening and food testing. | Separation ; Electrospray ; Tandem MS ; Selectivity ; Applications

## Structure elucidation
LV: Year 1 · Chemical reasoning
S: Structure elucidation combines evidence from several techniques. This lesson shows how to work out an unknown structure.
O: Combine data from MS, IR and NMR
O: Use degrees of unsaturation in structure solving
O: Check a proposed structure against all data
H: Evidence from each technique
- **Elemental analysis/HRMS**: molecular formula.
- **Degrees of unsaturation**: rings and π bonds.
- **IR**: functional groups.
- **¹H and ¹³C NMR**: carbon skeleton and hydrogen environments.
H: Strategy
- Start with the formula and degrees of unsaturation.
- Identify functional groups from IR.
- Build fragments from NMR shifts, integration and splitting.
- Assemble a structure and **check** it explains every piece of data.
P: No single technique usually gives a complete structure, but together they are powerful. Two-dimensional NMR methods show which atoms are connected, helping solve complex natural products.
X: Solving C₃H₆O.
> DoU = 1: one C=O or C=C or ring.
> IR: strong 1715 cm⁻¹, so C=O; no O–H.
> ¹H NMR: one singlet, 6H.
> Structure: propanone, CH₃COCH₃.
K: Structure elucidation combines molecular formula from HRMS or analysis, degrees of unsaturation, IR functional groups and NMR connectivity, assembling a structure that must be consistent with all the data.
!: Stopping when a structure fits one spectrum. It must fit every piece of evidence.
EV: established | Combined spectroscopic methods are standard for determining organic structures (Pretsch et al., 2009).
T: Structure elucidation | Determining a molecule's structure from data
T: Degrees of unsaturation | Number of rings plus π bonds
T: 2D NMR | NMR experiments showing connections between nuclei
SUM: Formula first.
SUM: Groups then skeleton.
SUM: Check all data.
SRC: Pretsch E. et al., Structure Determination of Organic Compounds, 4th edition, Springer | secondary | 2009
SRC: Claridge T. D. W., High-Resolution NMR Techniques in Organic Chemistry, 3rd edition, Elsevier | secondary | 2016
Q: What does IR contribute to structure elucidation? | Identification of functional groups.
Q: What should a proposed structure be checked against? | All the available data.
M1#chemistry-u15-27-q1@1: Which technique gives the molecular formula most directly? | High-resolution mass spectrometry | Infrared spectroscopy | Thin-layer chromatography | Flame testing | An accurate mass identifies which molecular formula fits the ion.
M2#chemistry-u15-27-q2@2: C₃H₆O shows a strong IR peak at 1715 cm⁻¹ and one ¹H NMR singlet. What is it? | Propanone | Propanal | Propan-1-ol | Prop-2-en-1-ol | One environment of six equivalent H fits two CH₃ on a C=O.
SEQ1#chemistry-u15-27-q3@2: Put a structure-solving strategy in order. | Find the molecular formula ; Calculate degrees of unsaturation ; Identify groups from IR ; Build and check the structure from NMR | Each step narrows the possibilities.
M3#chemistry-u15-27-q4@3: Why is no single technique usually enough? | Each gives only part of the structural information | Every technique gives the full structure | Spectra are always ambiguous | Only X-ray works on organic compounds | Combining techniques covers each one's gaps.
SA2#chemistry-u15-27-q5@1,3: Explain how to determine an unknown structure from spectra. | Start with the molecular formula from HRMS or elemental analysis and calculate degrees of unsaturation. Use IR to identify functional groups, such as C=O at 1715 cm⁻¹. Use ¹H and ¹³C NMR shifts, integration and splitting to build fragments and connect them. Assemble a structure and check it explains every piece of data. For C₃H₆O, one degree of unsaturation, C=O in IR and a single 6H singlet give propanone. 2D NMR helps for complex molecules. | Formula ; Unsaturation ; IR ; NMR ; Checking

## Analytical method validation
LV: Year 1 · Application
S: Method validation shows that an analytical method is fit for purpose. This lesson describes the parameters assessed.
O: Explain why methods must be validated
O: Describe the main validation parameters
O: Describe quality control in routine analysis
H: Validation parameters
- **Accuracy** (trueness) and **precision**.
- **Linearity** and **range**.
- **Limit of detection** and **limit of quantification**.
- **Selectivity** and **robustness**.
H: Quality assurance
- **Standard operating procedures** (SOPs) fix how methods are run.
- **Control samples** and **control charts** track performance over time.
- **Proficiency testing** compares labs.
- **Accreditation** to ISO/IEC 17025 shows competence.
P: Validation is required for methods used in medicine, food and environmental regulation, because decisions depend on the results. Robustness testing checks that small changes, such as temperature or pH, do not affect results.
X: Validating a drug assay.
> Accuracy: recovery of known amounts is 98–102%.
> Precision: repeat results vary by less than 2%.
> Linearity: R² > 0.999 over the working range.
> The method is shown to be fit for purpose.
K: Method validation shows fitness for purpose by assessing accuracy, precision, linearity, range, LOD, LOQ, selectivity and robustness, and quality assurance maintains reliability through SOPs, control charts, proficiency testing and accreditation.
!: Thinking validation is done once and never repeated. Ongoing quality control checks performance continuously.
EV: established | ICH guidelines define validation parameters for analytical procedures (ICH, 2022).
T: Method validation | Showing an analytical method is fit for purpose
T: Robustness | Resistance of a method to small changes in conditions
T: Proficiency testing | Comparing a lab's results with others on the same samples
SUM: Fit for purpose.
SUM: Key parameters.
SUM: Ongoing quality control.
SRC: International Council for Harmonisation, Q2(R2) Validation of Analytical Procedures | guidance | 2022 | https://www.ich.org/page/quality-guidelines
SRC: International Organization for Standardization, ISO/IEC 17025:2017 General requirements for the competence of testing and calibration laboratories | standard | 2017 | https://www.iso.org/standard/66912.html
Q: What does robustness test? | Whether small changes in conditions affect results.
Q: What standard shows laboratory competence? | ISO/IEC 17025.
M1#chemistry-u15-28-q1@1: Which parameter checks closeness to the true value? | Accuracy (trueness) | Precision | Robustness | Linearity | Recovery of known amounts measures accuracy.
M2#chemistry-u15-28-q2@2: Why are control charts used in routine analysis? | To detect drift or problems in method performance over time | To replace calibration | To make results more precise automatically | To avoid validating a method | Plotting control results shows when a method goes out of control.
MATCH1#chemistry-u15-28-q3@2: Match each parameter to what it measures. | Linearity = Proportional response ; LOQ = Smallest reliably measured amount ; Selectivity = Freedom from interference ; Robustness = Tolerance of small changes | Validation covers many aspects.
M3#chemistry-u15-28-q4@3: Why is proficiency testing valuable? | It reveals whether a lab's results agree with other labs | It replaces method validation | It increases instrument sensitivity | It is only for training students | Comparison with peers detects hidden bias.
SA2#chemistry-u15-28-q5@1,3: Explain analytical method validation and quality assurance. | Method validation shows a method is fit for purpose by assessing accuracy, precision, linearity and range, limits of detection and quantification, selectivity and robustness to small changes, as for a drug assay with 98–102% recovery and R² above 0.999. It is required where results support decisions in medicine, food and environment. Quality assurance continues in routine use through standard operating procedures, control samples and control charts, proficiency testing against other labs and accreditation to ISO/IEC 17025. | Purpose ; Parameters ; Robustness ; Control charts ; Accreditation
`;
