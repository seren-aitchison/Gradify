// PostGradify Quantitative Methods and Statistics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Variables and levels of measurement
LV: Postgraduate · Foundation
S: Quantitative research measures variables, and the level of measurement determines which statistics are appropriate. This lesson explains types of variables and Stevens's four levels of measurement.
O: Distinguish independent, dependent and confounding variables
O: Identify nominal, ordinal, interval and ratio levels of measurement
O: Choose statistics that suit a variable's level of measurement
H: What a variable is
P: A **variable** is any characteristic that can take different values across cases, such as age, discipline or anxiety score. In a causal model, the **independent variable** is the presumed cause or predictor and the **dependent variable** is the outcome. A **confounding variable** is related to both and can create a misleading association, while a **mediator** explains how an effect occurs and a **moderator** changes its strength. Variables may be **categorical**, taking a limited set of categories, or **continuous**, taking any value within a range. Stevens (1946) proposed four **levels of measurement** that remain the standard way of classifying variables in social and health research.
H: Stevens's four levels
- **Nominal**: named categories with no order, such as nationality or discipline.
- **Ordinal**: ordered categories with unequal or unknown gaps, such as degree classification.
- **Interval**: equal intervals but no true zero, such as temperature in Celsius.
- **Ratio**: equal intervals and a true zero, such as income, age or reaction time.
- Higher levels contain the information of lower levels.
H: Level and choice of statistics
- Nominal: frequencies, percentages and the mode; chi-square tests.
- Ordinal: medians and ranks; non-parametric tests.
- Interval and ratio: means and standard deviations; parametric tests when assumptions hold.
- Likert-type items are strictly ordinal, though summed scales are often treated as interval.
- Recoding a continuous variable into categories loses information.
X: Classifying variables in a doctoral survey.
> Discipline (Arts, Science, Social Science) is nominal.
> Year of study (first, second, third) is ordinal.
> Hours worked per week is ratio, since zero means no hours.
> The student reports modal discipline, median year and mean hours, matching each level.
K: Variables can be independent, dependent, confounding, mediating or moderating, and their level of measurement, nominal, ordinal, interval or ratio, determines which descriptive and inferential statistics are appropriate.
!: Calculating a mean of nominal codes, such as "average discipline = 1.8". Numbers used as labels for categories have no arithmetic meaning.
EV: established | Stevens's four levels of measurement are the standard classification used in research methods teaching.
EV: contested | Whether summed Likert scales may be analysed as interval data is debated.
T: Confounding variable | A variable related to both predictor and outcome that can distort their apparent relationship
T: Ordinal level | Measurement with ordered categories but unequal or unknown intervals
T: Ratio level | Measurement with equal intervals and a true zero
SUM: Variables vary.
SUM: Nominal, ordinal, interval, ratio.
SUM: Level guides statistics.
SRC: Stevens S. S., On the theory of scales of measurement, Science 103(2684), 677-680 | primary | 1946
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 1 | standard | 2018
Q: What distinguishes ratio from interval measurement? | Ratio measurement has a true zero.
Q: What is a moderator variable? | A variable that changes the strength or direction of a relationship.
M1#research-u05-01-q1@1: Which level of measurement has ordered categories but unknown gaps between them? | Ordinal | Nominal | Interval | Ratio | Ordinal variables can be ranked, but the distances between ranks are not known to be equal.
M2#research-u05-01-q2@2: A study links coffee drinking with heart disease, but smokers drink more coffee. What is smoking here? | A confounding variable | A dependent variable | A mediating variable | A nominal outcome | Smoking relates to both coffee and heart disease and may create a misleading association.
MATCH2#research-u05-01-q3@2: Match each variable to its level of measurement. | Blood group = Nominal ; Pain rated mild, moderate or severe = Ordinal ; Temperature in Celsius = Interval ; Annual income in pounds = Ratio | Order, equal intervals and a true zero distinguish the four levels.
M3#research-u05-01-q4@3: Which summary is most appropriate for degree classification (First, 2:1, 2:2, Third)? | The median classification | The mean classification code | The standard deviation of codes | The coefficient of variation | Degree classes are ordered but not equally spaced, so the median suits this ordinal variable.
SA2#research-u05-01-q5@2,3: Explain why the level of measurement matters when analysing data, with examples. | The level of measurement determines which operations are meaningful. Nominal data such as discipline can only be counted, so frequencies and the mode are used. Ordinal data such as satisfaction ratings can be ranked, so medians and non-parametric tests fit. Interval and ratio data such as income allow means and parametric tests, so choosing statistics that ignore the level can produce meaningless results. | Meaningful operations ; Nominal example ; Ordinal example ; Interval and ratio example

## Questionnaire design
LV: Postgraduate · Core
S: A good questionnaire turns concepts into clear, unbiased questions that respondents can answer accurately. This lesson covers question types, wording, response formats, order and pretesting.
O: Describe types of questions and response formats
O: Identify common problems in question wording
O: Apply principles of layout, order and pretesting
H: From concept to question
P: **Questionnaire design** begins by **operationalising** concepts: deciding which indicators will measure each concept and writing questions for them. Questions may be **closed**, offering fixed response options, or **open**, allowing respondents to answer in their own words. Closed formats include **dichotomous**, **multiple choice**, **rating scales** and **Likert items**, named after Likert (1932), in which respondents indicate agreement with statements. Good questions are short, specific, use familiar language and ask about one thing at a time (Oppenheim, 1992). Where possible, use or adapt **validated instruments** rather than writing new items.
H: Wording problems to avoid
- **Double-barrelled** questions that ask two things at once.
- **Leading** questions that suggest a desired answer.
- **Loaded** terms with emotional connotations.
- **Double negatives** and jargon.
- Overlapping or incomplete response categories.
H: Layout, order and pretesting
- Start with easy, relevant questions; put sensitive items later.
- Group questions by topic and use clear instructions and filters.
- Beware **order effects**, where earlier questions shape later answers.
- Use **cognitive interviewing** to check how respondents interpret items.
- Pilot the full questionnaire to check length, flow and data quality.
X: Fixing a double-barrelled item.
> Original: "How satisfied are you with your supervisor's feedback and availability?"
> A respondent who likes the feedback but rarely sees the supervisor cannot answer clearly.
> Revised as two items: one on feedback, one on availability, each with a five-point scale.
> Cognitive interviews confirm respondents now interpret both items consistently.
K: Questionnaire design operationalises concepts into clear closed or open questions, avoiding double-barrelled, leading and loaded wording, and uses sensible order and pretesting, ideally building on validated instruments.
!: Writing new questions when validated scales exist. Validated instruments allow comparison with other studies and come with evidence of reliability and validity.
EV: established | Cognitive interviewing and piloting are recommended methods for improving survey questions.
T: Operationalisation | Turning an abstract concept into measurable indicators
T: Double-barrelled question | A question that asks about two things at once
T: Cognitive interviewing | Probing respondents' interpretation of questions to improve them
SUM: Concept to indicator.
SUM: One idea per question.
SUM: Pretest everything.
SRC: Oppenheim A. N., Questionnaire Design, Interviewing and Attitude Measurement, new edition, Pinter | standard | 1992
SRC: Likert R., A technique for the measurement of attitudes, Archives of Psychology 140, 1-55 | primary | 1932
SRC: Dillman D. A., Smyth J. D. and Christian L. M., Internet, Phone, Mail, and Mixed-Mode Surveys: The Tailored Design Method, 4th edition, Wiley | standard | 2014
Q: What is a double-barrelled question? | A question that asks about two things at once.
Q: What is cognitive interviewing used for? | Checking how respondents interpret and answer questions.
M1#research-u05-02-q1@1: Which is an example of a leading question? | Don't you agree that the library should open longer? | How many hours a week do you use the library? | Which library services have you used this term? | How would you rate the library's opening hours? | The wording signals the expected answer, which pushes respondents towards agreement.
M2#research-u05-02-q2@2: Age categories are "18-25, 25-35, 35-45". What is the main problem? | The categories overlap | The categories are too detailed | The question is double-barrelled | The question is open-ended | A 25-year-old fits two categories, so options must be mutually exclusive.
NUM2#research-u05-02-q3@2: A scale has 8 Likert items each scored 1 to 5. What is the maximum possible total score? | 40 | 0 | points | Each of the 8 items can score at most 5, so the maximum total is 8 times 5 = 40.
M3#research-u05-02-q4@3: A student plans to measure anxiety with ten new self-written items. What would most improve the design? | Using a validated anxiety scale | Adding more open-ended items at the end | Placing the anxiety items first | Using yes or no options throughout | Validated scales bring evidence of reliability and validity and allow comparison with other studies.
SA2#research-u05-02-q5@2,3: Describe how you would develop and pretest a questionnaire on research students' use of AI tools. | I would define the concepts, such as frequency of use and attitudes, and look for existing validated items to adapt. New items would be short, specific and avoid double-barrelled or leading wording, with exhaustive and exclusive response options. Cognitive interviews with a few students would check interpretation. A pilot would then test length, flow, filters and data quality before the main survey. | Operationalise concepts ; Wording principles ; Cognitive interviews ; Pilot

## Measurement scales and psychometrics
LV: Postgraduate · Core
S: Psychometrics is the science of measuring psychological and social constructs. This lesson explains how multi-item scales are developed and evaluated, including item analysis and factor analysis.
O: Explain why multi-item scales are used to measure constructs
O: Describe the stages of scale development
O: Interpret basic evidence from factor analysis
H: Measuring what cannot be seen
P: Many constructs in social and health research, such as self-efficacy or burnout, are **latent**: they cannot be observed directly and are inferred from responses to several **items**. **Psychometrics** studies how well such measures work. Multi-item scales reduce the effect of any single poorly understood item and allow **reliability** to be estimated. In **classical test theory**, an observed score is the true score plus **measurement error**. DeVellis and Thorpe (2021) set out the stages of **scale development**, and **item response theory** offers a modern alternative that models how each item behaves across levels of the trait.
H: Stages of scale development
- Define the construct clearly, drawing on theory.
- Generate an **item pool** larger than needed.
- Have experts review items for **content validity**.
- Administer to a development sample and conduct **item analysis**.
- Examine structure with **factor analysis**, then test reliability and validity in a new sample.
H: Factor analysis basics
- **Exploratory factor analysis** (EFA) identifies how items cluster into underlying factors.
- **Confirmatory factor analysis** (CFA) tests a pre-specified structure.
- **Factor loadings** show how strongly each item relates to a factor; loadings above about 0.4 are often retained.
- **Cross-loading** items relate to more than one factor and may be removed.
- Fit indices such as CFI and RMSEA are reported in CFA.
X: Developing a scale of research belonging.
> A student writes 30 items from interview themes and literature on belonging.
> Five academics rate items for relevance; 6 are removed.
> EFA on 300 responses suggests three factors: peer connection, supervisor support and institutional identity.
> A CFA in a second sample of 280 students confirms the three-factor structure with acceptable fit.
K: Latent constructs are measured with multi-item scales developed through construct definition, item generation, expert review, item analysis and factor analysis, with reliability and validity tested in new samples.
!: Running EFA and CFA on the same sample. Confirming a structure on the data that generated it overstates fit; use separate samples.
EV: established | Factor analysis is a standard method for examining the structure of multi-item scales.
EV: contested | Cut-offs for factor loadings and fit indices are rules of thumb and are debated.
T: Latent construct | An unobservable concept inferred from multiple indicators
T: Factor loading | The strength of the relationship between an item and a factor
T: Confirmatory factor analysis | A test of whether data fit a pre-specified factor structure
SUM: Many items, one construct.
SUM: Develop in stages.
SUM: EFA explores, CFA confirms.
SRC: DeVellis R. F. and Thorpe C. T., Scale Development: Theory and Applications, 5th edition, Sage | standard | 2021
SRC: Tabachnick B. G. and Fidell L. S., Using Multivariate Statistics, 7th edition, Pearson, chapter 13 | standard | 2019
Q: What does classical test theory say an observed score consists of? | A true score plus measurement error.
Q: What is the difference between EFA and CFA? | EFA explores how items cluster; CFA tests a pre-specified structure.
M1#research-u05-03-q1@1: Why are multi-item scales preferred for latent constructs? | They reduce the influence of any single item's error | They remove the need for any pilot testing | They allow nominal data to be averaged | They guarantee the construct is real | Combining items averages out item-specific error and allows reliability to be estimated.
M2#research-u05-03-q2@2: An item loads 0.62 on one factor and 0.58 on another. What is this called? | Cross-loading | Content validity | Item response | Test-retest drift | An item relating strongly to more than one factor is cross-loading and may be ambiguous.
MATCH2#research-u05-03-q3@2: Match each step of scale development to its purpose. | Item pool = Generate more items than needed ; Expert review = Check content validity ; Exploratory factor analysis = Identify underlying structure ; Confirmatory factor analysis = Test structure in a new sample | Each stage builds evidence about whether the scale measures the construct.
M3#research-u05-03-q4@3: A student's EFA suggests four factors, but one factor has only two items. What is the most reasonable judgement? | The factor may be unstable and needs more items | The scale is ready for publication as it is | Factor analysis is not appropriate for scales | The two items must be the most valid ones | Factors with very few items are often unreliable, so more items or a simpler structure may be needed.
SA2#research-u05-03-q5@2,3: Outline how you would develop a new scale measuring doctoral students' sense of research autonomy. | I would define research autonomy from theory and qualitative data, then generate a pool of items larger than needed. Experts and students would review the items for relevance and clarity, supporting content validity. After administering the scale to a development sample, I would use item analysis and exploratory factor analysis to identify structure. Confirmatory factor analysis, reliability and validity checks would then be run in a fresh sample. | Construct definition ; Item generation and review ; EFA ; CFA and validation

## Data screening and cleaning
LV: Postgraduate · Foundation
S: Before analysis, data must be checked for errors, outliers and violations of assumptions. This lesson explains a systematic approach to screening and cleaning quantitative data, and how to document it.
O: Describe the steps of data screening and cleaning
O: Identify and handle outliers appropriately
O: Explain how to document cleaning decisions reproducibly
H: Why screen data?
P: **Data screening** is the process of checking a dataset for **errors**, **out-of-range values**, **outliers**, **missing values** and violations of the **assumptions** of planned analyses before testing hypotheses (Tabachnick and Fidell, 2019). **Data cleaning** corrects or handles the problems found. Skipping this stage can produce wrong results: a single mistyped age of 220 can distort a mean. Cleaning should be **systematic**, **transparent** and, ideally, carried out with a **syntax** or script so that every decision can be reproduced and checked. The raw data file should always be kept unchanged.
H: A screening checklist
- Check value ranges and frequencies for every variable.
- Look for impossible or inconsistent responses, such as a first-year student reporting a viva.
- Identify **univariate outliers**, for example z-scores beyond about 3.29.
- Identify **multivariate outliers**, for example using Mahalanobis distance.
- Check **normality**, **linearity** and **homogeneity of variance** where analyses assume them.
H: Handling problems
- Correct clear data entry errors against original records.
- Investigate outliers: errors are corrected, genuine values may be kept or analysed with robust methods.
- Consider **transformations**, such as logarithms, for skewed data.
- Run analyses with and without influential cases as a **sensitivity analysis**.
- Record every change in a cleaning log or script.
X: Screening a survey dataset.
> Frequency tables show one participant aged 7, impossible in a postgraduate sample.
> The original form shows the age was 27, so the value is corrected.
> One weekly working-hours value of 95 has a z-score of 3.6; it is genuine, so it is retained.
> The student reports results with and without this case, which do not change conclusions.
K: Data screening checks ranges, errors, outliers, missing data and assumptions before analysis, and cleaning decisions should be justified, scripted and documented, keeping the raw data unchanged.
!: Deleting outliers simply because they are inconvenient. Outliers should be investigated, and genuine values removed only with clear justification and sensitivity analysis.
EV: established | Systematic screening for errors, outliers and assumption violations is standard good practice before statistical analysis.
T: Data screening | Checking data for errors, outliers, missing values and assumption violations
T: Outlier | A case with an unusually extreme value
T: Sensitivity analysis | Repeating an analysis under different decisions to test robustness
SUM: Check before testing.
SUM: Investigate outliers.
SUM: Script and log changes.
SRC: Tabachnick B. G. and Fidell L. S., Using Multivariate Statistics, 7th edition, Pearson, chapter 4 | standard | 2019
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 6 | standard | 2018
Q: Why should data cleaning be done with syntax or a script? | So that every decision can be reproduced and checked.
Q: What is a common z-score threshold for univariate outliers? | About 3.29.
M1#research-u05-04-q1@1: What should happen to the raw data file during cleaning? | It should be kept unchanged | It should be overwritten | It should be deleted | It should be shared publicly at once | Keeping raw data unchanged allows cleaning steps to be checked and repeated.
M2#research-u05-04-q2@2: A participant reports sleeping 30 hours a night. What is the best first step? | Check the original record for an entry error | Delete the participant's entire record | Replace the value with the sample mean | Keep it, since all data are valid | Impossible values should first be checked against source records to see whether they are typing errors.
NUM2#research-u05-04-q3@2: Scores have mean 50 and standard deviation 8. What is the z-score of a score of 78? | 3.5 | 0.01 | – | The z-score is the score minus the mean divided by the SD: 78 minus 50 is 28, and 28 divided by 8 is 3.5.
M3#research-u05-04-q4@3: An analysis gives a significant result only when one extreme but genuine case is included. What is the most defensible report? | Report both analyses and discuss the case | Report only the significant analysis | Remove the case without mentioning it | Report only the non-significant analysis | Transparent sensitivity analysis lets readers see how much the conclusion depends on one case.
SA2#research-u05-04-q5@2,3: Describe a systematic approach to screening and cleaning a questionnaire dataset before running regression. | I would keep the raw file unchanged and work in a script. I would check frequencies and ranges for each variable to find entry errors and impossible values, correcting them against source records. I would identify univariate and multivariate outliers, investigate them and decide on retention with sensitivity analyses. Finally I would check regression assumptions such as linearity and normality of residuals, documenting every decision in a cleaning log. | Raw data and scripts ; Range and error checks ; Outliers ; Assumptions and log

## Missing data
LV: Postgraduate · Core
S: Almost every dataset has missing values, and how they are handled can bias results. This lesson explains mechanisms of missingness and compares common methods for dealing with missing data.
O: Distinguish MCAR, MAR and MNAR mechanisms
O: Compare deletion and imputation methods
O: Select and report an appropriate approach to missing data
H: Why data are missing
P: **Missing data** arise from skipped questions, drop-out, equipment failure or data errors. Rubin (1976) classified missingness by its **mechanism**. Data are **missing completely at random** (MCAR) when missingness is unrelated to any variable, observed or not. Data are **missing at random** (MAR) when missingness depends only on observed variables, such as older participants skipping an online item. Data are **missing not at random** (MNAR) when missingness depends on the missing value itself, such as people with high debts not reporting debt. The mechanism determines which methods give unbiased results (Little and Rubin, 2019).
H: Common methods
- **Listwise deletion**: analyse only complete cases; unbiased under MCAR but wastes data.
- **Pairwise deletion**: use all available data for each analysis, which can give inconsistent results.
- **Mean substitution**: replaces missing values with the mean, which shrinks variance and is not recommended.
- **Multiple imputation**: creates several plausible datasets, analyses each and pools results.
- **Full information maximum likelihood**: estimates parameters using all available data.
H: Good practice
- Report how much data are missing for each variable.
- Explore patterns: does missingness relate to observed variables?
- Prefer multiple imputation or maximum likelihood under MAR (Sterne et al., 2009).
- Include auxiliary variables related to missingness in the imputation model.
- Run sensitivity analyses if MNAR is plausible.
X: Missing income data.
> In a survey of 400 students, 60 did not report income.
> Non-reporters were more often international students, an observed variable.
> This pattern is consistent with MAR, so the student uses multiple imputation including international status.
> Results are compared with the complete-case analysis and reported alongside it.
K: Missing data may be MCAR, MAR or MNAR, and modern methods such as multiple imputation and maximum likelihood are generally preferred over deletion or mean substitution, with transparent reporting and sensitivity analysis.
!: Filling gaps with the variable's mean. Mean substitution artificially reduces variability and distorts relationships between variables.
EV: established | Multiple imputation and maximum likelihood give less biased estimates than listwise deletion when data are MAR.
EV: contested | Whether data are MAR or MNAR usually cannot be tested directly from the observed data.
T: Missing at random | Missingness that depends only on observed variables
T: Multiple imputation | Creating several plausible completed datasets and pooling the results
T: Listwise deletion | Excluding any case with missing data on the analysed variables
SUM: Know the mechanism.
SUM: Avoid mean substitution.
SUM: Impute and report.
SRC: Rubin D. B., Inference and missing data, Biometrika 63(3), 581-592 | primary | 1976
SRC: Little R. J. A. and Rubin D. B., Statistical Analysis with Missing Data, 3rd edition, Wiley | standard | 2019
SRC: Sterne J. A. C. et al., Multiple imputation for missing data in epidemiological and clinical research: potential and pitfalls, BMJ 338, b2393 | guidance | 2009 | https://www.bmj.com/content/338/bmj.b2393
Q: What does MNAR mean? | Missingness depends on the unobserved missing value itself.
Q: Why is mean substitution not recommended? | It reduces variability and distorts relationships between variables.
M1#research-u05-05-q1@1: Under which mechanism is missingness unrelated to any variable at all? | Missing completely at random | Missing at random | Missing not at random | Missing by design | MCAR means missingness has no relationship with observed or unobserved values.
M2#research-u05-05-q2@2: People with severe depression are less likely to complete a depression questionnaire. Which mechanism is this? | Missing not at random | Missing completely at random | Missing at random | Planned missingness | Missingness depends on the very value that is missing, which is MNAR.
NUM2#research-u05-05-q3@2: A dataset has 250 cases, of which 40 have missing values on the outcome. What percentage of cases is missing? | 16 | 0 | % | 40 missing cases out of 250 gives 40 divided by 250 = 0.16, so 16 percent are missing.
M3#research-u05-05-q4@3: Missingness on a wellbeing score is linked to age, which is fully observed. Which approach is most appropriate? | Multiple imputation including age | Listwise deletion with no further checks | Replacing gaps with the sample mean | Ignoring the variable in the analysis | The pattern suggests MAR, which multiple imputation handles well when the related variable is included.
SA2#research-u05-05-q5@2,3: Explain the three mechanisms of missing data and why they matter for analysis. | Data are MCAR when missingness is unrelated to any values, so complete-case analysis is unbiased though less efficient. Data are MAR when missingness depends on observed variables, so methods such as multiple imputation that use those variables can give unbiased estimates. Data are MNAR when missingness depends on the missing values themselves, which standard methods cannot fully correct. The mechanism therefore determines which method is valid and whether sensitivity analysis is needed. | MCAR ; MAR ; MNAR ; Implications

## Descriptive statistics
LV: Postgraduate · Foundation
S: Descriptive statistics summarise the main features of a dataset. This lesson covers measures of central tendency, dispersion and shape, and how to choose them.
O: Calculate and interpret measures of central tendency
O: Calculate and interpret measures of dispersion
O: Choose descriptive statistics suited to the data
H: Summarising data
P: **Descriptive statistics** summarise data so that patterns are visible before any inference is made. Measures of **central tendency** describe a typical value: the **mean** (arithmetic average), the **median** (middle value when ordered) and the **mode** (most frequent value). Measures of **dispersion** describe spread: the **range**, the **interquartile range** (IQR), the **variance** and the **standard deviation** (SD), which is the square root of the variance. Measures of **shape** include **skewness** and **kurtosis**. Every quantitative thesis should report descriptive statistics for its key variables, usually in a table (Field, 2018).
H: Choosing measures
- The mean uses all values but is pulled by extreme scores.
- The median is robust to outliers and suits skewed or ordinal data.
- The mode suits nominal data.
- Report the SD with the mean and the IQR with the median.
- Report the sample size for every statistic.
H: Shape of a distribution
- **Positive skew**: a long tail to the right, so mean is greater than median, as with income.
- **Negative skew**: a long tail to the left, so mean is less than median.
- **Kurtosis** describes heaviness of the tails.
- Bimodal distributions may hide two subgroups.
- Always look at the data visually as well as numerically.
X: Describing PhD completion times.
> Completion times in months for seven students: 40, 42, 44, 45, 46, 48, 84.
> The mean is 49.9 months, pulled up by the 84-month case.
> The median is 45 months, which better represents a typical student.
> The student reports the median and IQR and notes the positive skew.
K: Descriptive statistics summarise central tendency, dispersion and shape, and the choice between mean and median, SD and IQR depends on the level of measurement and the distribution.
!: Reporting only the mean for heavily skewed data. The median and IQR give a more representative summary when distributions are skewed.
EV: established | The median is more robust than the mean to extreme values.
T: Median | The middle value of ordered data
T: Standard deviation | A measure of the average spread of scores around the mean
T: Interquartile range | The range of the middle 50% of scores
SUM: Centre, spread, shape.
SUM: Mean or median?
SUM: Pair centre with spread.
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 1 | standard | 2018
SRC: Altman D. G., Practical Statistics for Medical Research, Chapman and Hall | standard | 1991
Q: Which measure of dispersion is paired with the median? | The interquartile range.
Q: In positively skewed data, how do the mean and median compare? | The mean is greater than the median.
M1#research-u05-06-q1@1: Which measure of central tendency suits nominal data? | The mode | The mean | The median | The standard deviation | Nominal categories cannot be ordered or averaged, so only the most frequent value is meaningful.
M2#research-u05-06-q2@2: Household incomes have a long right tail. Which summary of a typical income is most representative? | The median | The mean | The range | The variance | The median is not pulled by the extreme high incomes in a positively skewed distribution.
NUM2#research-u05-06-q3@2: What is the mean of 4, 6, 8, 10 and 12? | 8 | 0 | – | The values sum to 40, and 40 divided by the 5 values gives a mean of 8.
M3#research-u05-06-q4@3: Two modules have the same mean mark of 62, but SDs of 4 and 14. What is the best interpretation? | Marks are far more spread out in the second module | The second module's marks are higher on average | The first module must contain outliers | The modules cannot be compared at all | Equal means with different SDs indicate similar centres but very different spread.
SA2#research-u05-06-q5@2,3: Explain how you would choose descriptive statistics for a skewed variable such as number of publications per PhD student. | Publications are counts that are likely to be positively skewed, with many students having none or one and a few having many. The mean would be pulled up by the few high values, so the median is a better measure of the typical student. The IQR would describe spread, alongside the range and sample size. A histogram would show the skew visually. | Recognise skew ; Median rationale ; IQR and n ; Visual check

## Distributions and the normal curve
LV: Postgraduate · Core
S: Probability distributions describe how values of a variable are spread. This lesson explains the normal distribution, z-scores and how to assess whether data are approximately normal.
O: Describe the properties of the normal distribution
O: Use z-scores to locate values in a distribution
O: Assess normality using graphs and tests
H: The normal distribution
P: A **probability distribution** describes how likely different values of a variable are. The **normal distribution** is symmetric and bell-shaped, defined by its **mean** and **standard deviation**, with mean, median and mode equal. In a normal distribution about **68%** of values lie within 1 SD of the mean, about **95%** within 1.96 SD and about **99.7%** within 3 SD. The **standard normal distribution** has a mean of 0 and an SD of 1, and any value can be converted to a **z-score** to show how many SDs it lies from the mean. Many statistical tests assume normality of residuals or of the sampling distribution, not necessarily of the raw data.
H: Other important distributions
- **Skewed** distributions, such as income or reaction times.
- The **t distribution**, with heavier tails, used for small samples.
- The **chi-square distribution**, used for categorical tests.
- The **binomial distribution**, for counts of successes in fixed trials.
- The **Poisson distribution**, for counts of rare events.
H: Checking normality
- Plot a **histogram** and a **Q-Q plot**; points near the line suggest normality.
- Inspect **skewness** and **kurtosis** values.
- **Shapiro-Wilk** and **Kolmogorov-Smirnov** tests formally test normality.
- With large samples, these tests flag trivial departures as significant.
- With small samples, they lack power, so graphs are essential.
X: Interpreting a z-score.
> Reading speed scores are normally distributed with mean 250 and SD 40 words per minute.
> A student reads at 330 words per minute.
> z = (330 minus 250) divided by 40 = 2.0.
> About 2.3% of readers score higher, so the student is in roughly the top 2 to 3%.
K: The normal distribution is symmetric and defined by its mean and SD, with about 68%, 95% and 99.7% of values within 1, 1.96 and 3 SD, and z-scores locate values within it, while normality is best assessed with graphs alongside tests.
!: Relying only on a significant Shapiro-Wilk test to reject normality in a large sample. Large samples make trivial departures significant; inspect plots and consider the robustness of the analysis.
EV: established | About 95% of a normal distribution lies within 1.96 standard deviations of the mean.
T: Normal distribution | A symmetric bell-shaped distribution defined by its mean and standard deviation
T: Z-score | The number of standard deviations a value lies from the mean
T: Q-Q plot | A plot comparing observed quantiles with those expected under a distribution
SUM: Bell-shaped and symmetric.
SUM: 68, 95, 99.7.
SUM: Look before you test.
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapters 1 and 6 | standard | 2018
SRC: Howell D. C., Statistical Methods for Psychology, 8th edition, Wadsworth Cengage | standard | 2013
Q: What are the mean and SD of the standard normal distribution? | A mean of 0 and an SD of 1.
Q: Why are normality tests less useful in very large samples? | They flag trivial departures as significant.
M1#research-u05-07-q1@1: Approximately what percentage of a normal distribution lies within one standard deviation of the mean? | 68% | 50% | 95% | 99.7% | About 68 percent of values fall between one SD below and one SD above the mean.
M2#research-u05-07-q2@2: A Q-Q plot shows points curving well away from the line at the upper end. What does this suggest? | Departure from normality in the upper tail | Perfect normality of the data | That the sample size is too small to plot | That the variable is nominal | Points departing from the diagonal show the data do not match normal quantiles there.
NUM2#research-u05-07-q3@3: IQ scores have mean 100 and SD 15. What is the z-score for an IQ of 85? | -1 | 0.01 | – | The z-score is 85 minus 100, giving minus 15, divided by the SD of 15, which equals -1.
M3#research-u05-07-q4@3: A sample of 3,000 gives a significant Shapiro-Wilk test, but the histogram looks almost bell-shaped. What is the most sensible conclusion? | The departure is probably trivial for most analyses | Parametric tests can never be used on these data | The data must be transformed to logarithms | The sample should be reduced to 30 cases | Large samples detect tiny departures, and many tests are robust when n is large.
SA2#research-u05-07-q5@2,3: Explain how you would assess whether a variable is approximately normally distributed before a t-test. | I would first plot a histogram and Q-Q plot to see whether the distribution is roughly symmetric and points lie near the line. I would inspect skewness and kurtosis values. A Shapiro-Wilk test could be reported, but interpreted with sample size in mind, since large samples flag small departures and small samples lack power. If normality were doubtful, I would consider a transformation, a robust test or a non-parametric alternative. | Graphs ; Skewness and kurtosis ; Formal tests in context ; Alternatives

## Visualising data
LV: Postgraduate · Foundation
S: Good graphs reveal patterns, outliers and uncertainty that tables can hide. This lesson explains how to choose and design clear, honest data visualisations for theses and papers.
O: Choose a graph type suited to the data and question
O: Apply principles of clear and honest visual design
O: Critique misleading or uninformative graphs
H: Why visualise?
P: **Data visualisation** helps researchers explore data and communicate findings. Tukey (1977) championed **exploratory data analysis**, using plots to discover patterns before formal tests. Tufte (2001) urged designers to maximise the **data-ink ratio**, removing decoration that carries no information, which he called **chartjunk**. Weissgerber and colleagues (2015) showed that **bar charts** of means can hide very different distributions and recommended plots that show individual data points or full distributions, especially for small samples. Good graphs have clear axis labels with units, honest scales and captions that state what is shown.
H: Choosing a graph
- **Histogram** or **density plot**: distribution of one continuous variable.
- **Box plot** or **violin plot**: compare distributions across groups.
- **Scatterplot**: relationship between two continuous variables.
- **Line graph**: change over time.
- **Bar chart**: counts or proportions of categories.
H: Honest and accessible design
- Start bar chart axes at zero; truncated axes exaggerate differences.
- Show **uncertainty**, such as confidence intervals, and say what error bars represent.
- Avoid 3D effects and unnecessary colour.
- Use colour-blind-safe palettes and do not rely on colour alone.
- Make graphs readable when printed in greyscale.
X: Replacing a bar chart.
> A student plots mean anxiety scores for two groups of 12 as bars with error bars.
> The bars look similar, but a dot plot reveals one group is bimodal.
> The student replaces the bar chart with a dot plot overlaid with box plots.
> The caption states that error bars show 95% confidence intervals.
K: Graphs should be chosen to suit the data and question, show distributions and uncertainty honestly, minimise chartjunk and be accessible, with dot, box and violin plots often more informative than bar charts of means.
!: Using unlabeled error bars. Readers cannot tell whether bars show SD, standard error or confidence intervals, which mean very different things.
EV: established | Plots showing individual data points reveal distributional features that bar charts of means can hide.
T: Data-ink ratio | The proportion of a graph's ink that presents data
T: Box plot | A plot showing the median, quartiles and extreme values of a distribution
T: Exploratory data analysis | Using plots and summaries to discover patterns before formal testing
SUM: Explore and communicate.
SUM: Match graph to data.
SUM: Show uncertainty honestly.
SRC: Tufte E. R., The Visual Display of Quantitative Information, 2nd edition, Graphics Press | standard | 2001
SRC: Tukey J. W., Exploratory Data Analysis, Addison-Wesley | primary | 1977
SRC: Weissgerber T. L. et al., Beyond bar and line graphs: time for a new data presentation paradigm, PLOS Biology 13(4), e1002128 | primary | 2015 | https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1002128
Q: What did Tufte call decoration that carries no information? | Chartjunk.
Q: Why can bar charts of means be misleading? | They can hide very different distributions behind similar means.
M1#research-u05-08-q1@1: Which graph best shows the relationship between two continuous variables? | A scatterplot | A pie chart | A bar chart | A box plot | Plotting each case's pair of values reveals the form and strength of the relationship.
M2#research-u05-08-q2@2: A bar chart of pass rates uses a y-axis running from 80% to 90%. What is the main problem? | The truncated axis exaggerates differences | The chart shows too many data points | Bar charts cannot show percentages | The colours are not colour-blind safe | Bars encode values by length, so starting above zero distorts visual comparisons.
MATCH2#research-u05-08-q3@2: Match each purpose to the most suitable graph. | Distribution of one continuous variable = Histogram ; Change over time = Line graph ; Counts of categories = Bar chart ; Comparing group distributions = Box plot | Graph type should follow the structure of the data and the question.
M3#research-u05-08-q4@3: A paper shows means for two groups of 8 participants as bars with unlabelled error bars. Which revision is most informative? | Show individual points and label the error bars | Add a 3D effect so bars are clearer | Replace the graph with a pie chart | Remove the error bars altogether | Small samples are best shown with every point, and readers need to know what the error bars represent.
SA2#research-u05-08-q5@2,3: Critique a thesis figure that shows group means as 3D bars with a truncated axis and no error bars, and suggest improvements. | The 3D effect adds chartjunk and makes values hard to read, and the truncated axis exaggerates differences between groups. With no error bars, readers cannot judge uncertainty. I would replace it with a two-dimensional dot or box plot showing individual data, add 95% confidence intervals with a clear caption, and label axes with units. Using a colour-blind-safe palette would improve accessibility. | Chartjunk ; Truncated axis ; Missing uncertainty ; Improved design

## Sampling distributions and confidence intervals
LV: Postgraduate · Core
S: A statistic calculated from a sample varies from sample to sample, and its sampling distribution describes that variation. This lesson explains the standard error, the central limit theorem and how to calculate and interpret confidence intervals.
O: Explain the idea of a sampling distribution and the standard error
O: Describe the central limit theorem
O: Calculate and interpret a confidence interval
H: From sample to population
P: If we drew many random samples from the same population and calculated the mean of each, the means would differ. The distribution of these means is the **sampling distribution** of the mean. Its standard deviation is the **standard error** (SE), estimated as the sample SD divided by the square root of the sample size, so larger samples give more precise estimates. The **central limit theorem** states that, for reasonably large samples, the sampling distribution of the mean is approximately normal even when the population is not. A **confidence interval** (CI) uses the standard error to give a range of plausible values for a population parameter; a 95% CI for a mean is roughly the sample mean plus or minus 1.96 standard errors (Cumming, 2014).
H: Interpreting confidence intervals
- A 95% CI comes from a procedure that captures the true value in 95% of repeated samples.
- It does not mean there is a 95% probability that this particular interval contains the true value, in the frequentist view.
- Narrow intervals indicate precise estimates; wide intervals indicate uncertainty.
- If a 95% CI for a difference excludes zero, the difference is significant at p below 0.05.
- CIs show the size of an effect as well as its uncertainty.
H: What affects width
- Larger samples give narrower intervals.
- More variable data give wider intervals.
- Higher confidence levels, such as 99%, give wider intervals.
- Small samples use the **t distribution**, giving slightly wider intervals.
- Biased samples give precise but wrong intervals: CIs do not correct bias.
X: Calculating a confidence interval.
> A sample of 100 PhD students reports a mean of 42 working hours a week, with SD 10.
> The standard error is 10 divided by the square root of 100, which is 1.
> The 95% CI is 42 plus or minus 1.96, about 40.0 to 44.0 hours.
> The student reports: mean 42 hours, 95% CI [40.0, 44.0].
K: Sample statistics vary across samples, the standard error measures this variation, the central limit theorem makes sampling distributions of means approximately normal, and confidence intervals give a range of plausible values whose width reflects sample size and variability.
!: Saying "there is a 95% chance the true mean is in this interval". In the frequentist view, the 95% refers to the long-run success rate of the procedure, not the probability for one interval.
EV: established | The standard error of the mean decreases in proportion to the square root of the sample size.
EV: contested | Whether confidence intervals should replace p-values as the main way of reporting results is debated.
T: Sampling distribution | The distribution of a statistic across many repeated samples
T: Standard error | The standard deviation of a sampling distribution
T: Confidence interval | A range of plausible values for a population parameter
SUM: Statistics vary by sample.
SUM: SE shrinks with n.
SUM: CIs show precision.
SRC: Cumming G., The new statistics: why and how, Psychological Science 25(1), 7-29 | primary | 2014
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 2 | standard | 2018
SRC: Altman D. G., Machin D., Bryant T. N. and Gardner M. J. (eds), Statistics with Confidence, 2nd edition, BMJ Books | standard | 2000
Q: How is the standard error of the mean estimated? | The sample standard deviation divided by the square root of the sample size.
Q: What does the central limit theorem state? | Sampling distributions of means are approximately normal for reasonably large samples, whatever the population shape.
M1#research-u05-09-q1@1: What is the standard deviation of a sampling distribution called? | The standard error | The variance ratio | The effect size | The interquartile range | The standard error describes how much a statistic varies from sample to sample.
M2#research-u05-09-q2@2: What happens to a 95% confidence interval if the sample size is quadrupled? | It becomes about half as wide | It becomes about four times as wide | It stays exactly the same width | It becomes about a quarter as wide | The SE depends on the square root of n, so four times the sample halves the SE and the interval width.
NUM2#research-u05-09-q3@2: A sample has SD 12 and n = 36. What is the standard error of the mean? | 2 | 0 | – | The standard error is 12 divided by the square root of 36, which is 6, so the SE equals 2.
M3#research-u05-09-q4@3: Two studies estimate the same effect: one gives 95% CI [0.1, 0.9], the other [0.4, 0.6]. Which statement is most accurate? | The second estimate is more precise | The first estimate is more likely to be correct | Only the second is statistically significant | The two studies contradict each other | Both intervals exclude zero and overlap, but the narrower interval indicates greater precision.
SA2#research-u05-09-q5@2,3: Explain how to interpret a 95% confidence interval for a mean difference of 5 points [1, 9] between two teaching methods. | The best estimate is that one method produces scores 5 points higher, and differences between 1 and 9 points are compatible with the data. Because the interval excludes zero, the difference is statistically significant at the 5% level. The width shows considerable uncertainty about the size of the effect, from small to fairly large. Strictly, 95% refers to the long-run performance of the method, not a probability for this interval. | Point estimate ; Range of plausible values ; Significance link ; Correct interpretation

## Null hypothesis significance testing
LV: Postgraduate · Foundation
S: Null hypothesis significance testing (NHST) is the most widely used framework for statistical inference. This lesson explains null and alternative hypotheses, p-values and significance levels, and common misinterpretations.
O: Describe the logic of null hypothesis significance testing
O: Interpret p-values correctly
O: Identify common misuses of significance testing
H: The logic of NHST
P: In **null hypothesis significance testing**, the researcher states a **null hypothesis** (H0), usually of no effect or no difference, and an **alternative hypothesis** (H1). A test statistic is calculated from the data and compared with its distribution under H0. The **p-value** is the probability of obtaining a result at least as extreme as the one observed, **assuming the null hypothesis is true**. If p is below a pre-set **significance level** (alpha), conventionally 0.05, the null hypothesis is rejected. NHST blends Fisher's use of p-values as evidence with Neyman and Pearson's decision framework (1933). The American Statistical Association's statement (Wasserstein and Lazar, 2016) set out principles for using p-values properly.
H: Steps in a significance test
- State H0 and H1, and whether the test is one- or two-tailed.
- Set alpha before collecting data.
- Choose a test suited to the design and data.
- Calculate the test statistic and p-value.
- Decide, and report the effect size and confidence interval alongside p.
H: What p-values do not tell you
- p is not the probability that H0 is true.
- p is not the probability that the result occurred by chance alone.
- A non-significant result does not prove there is no effect (Altman and Bland, 1995).
- Statistical significance does not mean practical importance.
- p-values depend heavily on sample size.
X: A two-group comparison.
> H0: mean wellbeing is the same for students with and without a mentor; H1: the means differ.
> Alpha is set at 0.05, two-tailed.
> An independent t-test gives t(98) = 2.30, p = 0.024.
> H0 is rejected; the report also gives the mean difference and its 95% CI.
K: NHST tests data against a null hypothesis, and the p-value is the probability of data at least as extreme as observed if H0 is true; it is not the probability that H0 is true, and should be reported with effect sizes and intervals.
!: Concluding "no effect" from p = 0.20. Absence of evidence is not evidence of absence; the study may simply lack power.
EV: established | The p-value is the probability of data at least as extreme as observed, assuming the null hypothesis is true.
EV: contested | The value of NHST and the 0.05 threshold have been strongly criticised, with proposals ranging from lower thresholds to abandoning significance.
T: Null hypothesis | A statement of no effect or no difference that a test evaluates
T: P-value | The probability of data at least as extreme as observed if the null hypothesis is true
T: Significance level | The pre-set threshold, alpha, for rejecting the null hypothesis
SUM: Assume H0, test data.
SUM: p is conditional on H0.
SUM: Significance is not importance.
SRC: Wasserstein R. L. and Lazar N. A., The ASA statement on p-values: context, process, and purpose, The American Statistician 70(2), 129-133 | guidance | 2016 | https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108
SRC: Altman D. G. and Bland J. M., Absence of evidence is not evidence of absence, BMJ 311, 485 | primary | 1995 | https://www.bmj.com/content/311/7003/485
SRC: Neyman J. and Pearson E. S., On the problem of the most efficient tests of statistical hypotheses, Philosophical Transactions of the Royal Society A 231, 289-337 | primary | 1933
Q: What does a p-value assume? | That the null hypothesis is true.
Q: What is the conventional significance level? | 0.05.
M1#research-u05-10-q1@1: In significance testing, what is H0 normally a statement of? | No effect or no difference | The researcher's prediction is correct | The sample is fully representative | The effect is large and important | H0 is the hypothesis of no effect against which the data are tested.
M2#research-u05-10-q2@2: A study reports p = 0.03. Which interpretation is correct? | Data this extreme would be unlikely if H0 were true | There is a 3% chance the null hypothesis is true | There is a 97% chance the effect is real | The effect is large enough to matter in practice | The p-value is calculated assuming H0 and says nothing directly about the probability of H0.
TF2#research-u05-10-q3@2: A non-significant result shows that the two groups do not differ. | false | A non-significant result means the data are compatible with no difference, but a real effect may have been missed.
M3#research-u05-10-q4@3: A trial of 20,000 people finds a significant 0.2-point difference on a 100-point scale. What is the most important caution? | The difference may be too small to matter | The p-value must be miscalculated | The sample is too small for any conclusion | Significance guarantees clinical importance | Very large samples make tiny effects significant, so practical importance must be judged separately.
SA2#research-u05-10-q5@2,3: Explain three common misinterpretations of p-values and how to avoid them. | One misinterpretation is that p is the probability the null hypothesis is true, when it is the probability of the data assuming H0. Another is that a non-significant result proves no effect, when it may reflect low power. A third is that significance means importance, when tiny effects can be significant in large samples. Reporting effect sizes and confidence intervals, and interpreting them in context, helps avoid all three. | Probability of H0 ; Non-significance ; Significance versus importance ; Effect sizes and CIs

## Effect sizes
LV: Postgraduate · Core
S: Effect sizes quantify how large an effect or relationship is, independent of sample size. This lesson explains common standardised and unstandardised effect sizes and how to interpret and report them.
O: Explain why effect sizes should be reported
O: Calculate and interpret Cohen's d and other effect sizes
O: Judge the practical importance of an effect
H: How big is the effect?
P: An **effect size** is a quantitative measure of the magnitude of an effect, such as a difference between groups or the strength of an association. Unlike p-values, effect sizes do not grow simply because the sample is larger. **Unstandardised** effect sizes keep the original units, such as a 4-mark difference in essay grades, and are often the most meaningful to readers. **Standardised** effect sizes, such as **Cohen's d**, express effects in standard deviation units so they can be compared across studies and combined in **meta-analyses**. Lakens (2013) and the APA Publication Manual recommend reporting effect sizes with confidence intervals for all main results.
H: Common effect sizes
- **Cohen's d**: difference between two means divided by the pooled SD.
- **Pearson's r**: strength of a linear relationship, from -1 to 1.
- **Eta squared** and **partial eta squared**: proportion of variance explained in ANOVA.
- **Odds ratio** and **risk ratio**: effects on binary outcomes.
- **R squared**: variance explained by a regression model.
H: Interpreting size
- Cohen (1988) suggested d of 0.2, 0.5 and 0.8 as small, medium and large.
- For r, 0.1, 0.3 and 0.5 are often called small, medium and large.
- These are rough benchmarks; Cohen himself urged interpretation in context.
- A small effect can matter if the outcome is serious or the intervention cheap.
- Compare effects with those found in similar studies.
X: Calculating Cohen's d.
> Students in a writing retreat score a mean of 70 on productivity; controls score 64.
> The pooled standard deviation is 12.
> d = (70 minus 64) divided by 12 = 0.5.
> This is a medium effect by Cohen's benchmarks, and the student compares it with previous retreat studies.
K: Effect sizes measure the magnitude of effects independent of sample size, in original units or standardised forms such as Cohen's d, r, eta squared and odds ratios, and should be interpreted in context and reported with confidence intervals.
!: Treating Cohen's benchmarks as fixed rules. Whether an effect is meaningful depends on the field, the outcome and the costs involved.
EV: established | Reporting effect sizes with confidence intervals is recommended by major style guides and statistical bodies.
T: Effect size | A measure of the magnitude of an effect
T: Cohen's d | A standardised mean difference expressed in standard deviation units
T: Eta squared | The proportion of variance in an outcome explained by a factor
SUM: Size, not just significance.
SUM: d, r, eta squared, odds ratio.
SUM: Interpret in context.
SRC: Cohen J., Statistical Power Analysis for the Behavioral Sciences, 2nd edition, Lawrence Erlbaum | standard | 1988
SRC: Lakens D., Calculating and reporting effect sizes to facilitate cumulative science: a practical primer for t-tests and ANOVAs, Frontiers in Psychology 4, 863 | primary | 2013 | https://www.frontiersin.org/articles/10.3389/fpsyg.2013.00863/full
SRC: American Psychological Association, Publication Manual of the American Psychological Association, 7th edition, APA | guidance | 2020
Q: How is Cohen's d calculated? | The difference between two means divided by the pooled standard deviation.
Q: What did Cohen suggest as a medium value of d? | 0.5.
M1#research-u05-11-q1@1: Why are effect sizes reported alongside p-values? | They show how large an effect is | They prove that the null is false | They replace the need for a sample | They remove all measurement error | P-values say little about magnitude, which effect sizes quantify directly.
M2#research-u05-11-q2@2: A correlation between sleep and exam marks is r = 0.30. How is this usually described? | A medium relationship | A very large relationship | No relationship at all | A perfect relationship | Cohen's rough benchmarks treat r of about 0.3 as a medium effect.
NUM2#research-u05-11-q3@2: Group means are 25 and 22 and the pooled standard deviation is 6. What is Cohen's d? | 0.5 | 0.01 | – | The difference of 25 minus 22 is 3, and 3 divided by the pooled SD of 6 gives d = 0.5.
M3#research-u05-11-q4@3: A cheap text-message reminder reduces missed hospital appointments with d = 0.15. What is the best judgement? | It may be worthwhile despite being a small effect | It should be dismissed because the effect is small | It must be an error because effects are always larger | It proves reminders work for every patient | Small effects can matter when interventions are cheap and applied widely.
SA2#research-u05-11-q5@2,3: Explain the difference between statistical significance and effect size, and why both should be reported. | Statistical significance indicates whether data are unlikely under the null hypothesis, which depends on sample size as well as the effect. Effect size measures how large the effect is, independent of sample size. A large sample can make a trivial effect significant, while a small study can miss a large effect. Reporting both, with confidence intervals, lets readers judge whether an effect is reliable and whether it matters. | Significance definition ; Effect size definition ; Sample size dependence ; Value of both

## Statistical power and sample size
LV: Postgraduate · Core
S: Underpowered studies are common and can mislead even when results are significant. This lesson explains the consequences of low power, how to choose a smallest effect of interest and how to plan and report a power analysis.
O: Explain the consequences of low statistical power
O: Choose a justified effect size for planning
O: Plan and report an a priori power analysis
H: Why power matters
P: Statistical **power** is the probability that a test will detect an effect of a specified size if it exists, equal to 1 minus beta, the Type II error rate. Button and colleagues (2013) estimated that the median power of neuroscience studies was around 20%, meaning most real effects would be missed. Low power has a second, less obvious cost: among underpowered studies, those that do reach significance tend to **overestimate** the true effect, a pattern sometimes called the **winner's curse**, and a lower proportion of significant findings reflect true effects. Power analysis should therefore be done **a priori**, before data collection, rather than **post hoc** after results are known.
H: Choosing the effect size to plan for
- Use a **smallest effect size of interest**: the smallest effect that would matter in practice or theory.
- Draw on meta-analyses rather than single pilot studies or early small trials.
- Remember published effects may be inflated by publication bias.
- Consider using a range of plausible effects in a sensitivity power analysis.
- Account for the design: within-subjects designs often need fewer participants.
H: Planning and reporting
- State the test, alpha, desired power, effect size and its source.
- Report the resulting sample size and the allowance for attrition.
- Use software such as G*Power, or simulation for complex designs.
- If the sample is fixed, report a **sensitivity analysis** of the smallest detectable effect.
- Avoid post hoc "observed power", which adds nothing beyond the p-value.
X: Planning a within-subjects study.
> A student will compare reading speed with and without background music in the same participants.
> A meta-analysis suggests a small effect of about d = 0.3.
> A paired-samples power analysis with alpha 0.05 and power 0.80 suggests about 90 participants.
> The student plans to recruit 100 to allow for unusable data and reports the calculation in the protocol.
K: Low power means real effects are often missed and significant results tend to exaggerate effects, so sample sizes should be planned a priori using a justified smallest effect of interest and reported transparently.
!: Calculating "observed power" after a non-significant result to explain it away. Post hoc power is a direct function of the p-value and does not provide new information.
EV: established | Underpowered studies produce inflated estimates of effect size among significant results.
EV: contested | How best to choose the effect size for a power analysis is debated across fields.
T: Statistical power | The probability of detecting an effect of a specified size if it exists
T: Smallest effect size of interest | The smallest effect that would be meaningful in theory or practice
T: Winner's curse | The tendency of significant results from small studies to overestimate true effects
SUM: Low power misleads.
SUM: Plan before collecting.
SUM: Justify the effect size.
SRC: Button K. S. et al., Power failure: why small sample size undermines the reliability of neuroscience, Nature Reviews Neuroscience 14(5), 365-376 | primary | 2013
SRC: Faul F., Erdfelder E., Lang A.-G. and Buchner A., G*Power 3: a flexible statistical power analysis program for the social, behavioral, and biomedical sciences, Behavior Research Methods 39(2), 175-191 | primary | 2007
SRC: Lakens D., Sample size justification, Collabra: Psychology 8(1), 33267 | secondary | 2022
Q: How is power related to beta? | Power equals 1 minus beta, the Type II error rate.
Q: What is a smallest effect size of interest? | The smallest effect that would matter in theory or practice.
M1#research-u05-12-q1@1: When should a power analysis normally be carried out? | Before data collection | After the results are known | During peer review | Only if p exceeds 0.05 | A priori power analysis informs the sample size before the study begins.
M2#research-u05-12-q2@2: A small study finds a significant and very large effect. What does the winner's curse suggest? | The true effect is probably smaller | The true effect is probably even larger | The result must be a Type II error | The study must have had very high power | Significant results from underpowered studies tend to exaggerate the true effect size.
NUM2#research-u05-12-q3@2: A study has a Type II error rate of 0.35 for the effect of interest. What is its power? | 0.65 | 0.01 | – | Power is 1 minus beta, so 1 minus 0.35 gives a power of 0.65 for that effect.
M3#research-u05-12-q4@3: A student plans sample size using d = 1.2 from one small pilot study. What is the main concern? | The pilot estimate is likely inflated and imprecise | The effect is too small to be detected | Pilot studies can never estimate effect sizes | Power analysis does not use effect sizes | Small pilots give unstable estimates, so planning around them risks an underpowered main study.
SA2#research-u05-12-q5@2,3: Describe how you would justify the sample size for a two-group experiment in a thesis protocol. | I would choose the smallest effect size of interest, drawing on meta-analyses and what would matter practically, rather than a single small study. I would state the test, two-tailed alpha of 0.05 and power of 0.80 or higher, and calculate the sample with software such as G*Power. I would add an allowance for attrition and report every input. If recruitment were limited, I would report a sensitivity analysis of the smallest detectable effect. | Effect size choice ; Inputs stated ; Attrition ; Sensitivity analysis

## Type I and Type II errors
LV: Postgraduate · Foundation
S: Every significance test risks two kinds of wrong decision. This lesson explains Type I and Type II errors, their relationship with alpha and power, and the problem of multiple comparisons.
O: Define Type I and Type II errors
O: Explain the trade-off between the two types of error
O: Apply corrections for multiple comparisons
H: Two ways to be wrong
P: A **Type I error** occurs when a true null hypothesis is rejected: a **false positive**. Its probability, when H0 is true, is the significance level **alpha**. A **Type II error** occurs when a false null hypothesis is not rejected: a **false negative**. Its probability is **beta**, and **power** is 1 minus beta. Neyman and Pearson (1933) framed testing as controlling these long-run error rates. For a fixed sample, lowering alpha reduces Type I errors but increases Type II errors; increasing sample size can reduce both. Which error is more serious depends on context, such as approving an ineffective treatment versus missing an effective one.
H: The decision table
- H0 true, H0 rejected: Type I error (probability alpha).
- H0 true, H0 not rejected: correct decision.
- H0 false, H0 rejected: correct decision (power).
- H0 false, H0 not rejected: Type II error (probability beta).
- These are long-run rates across many tests, not probabilities for a single result.
H: Multiple comparisons
- Running many tests inflates the **familywise error rate**: the chance of at least one false positive.
- The **Bonferroni correction** divides alpha by the number of tests.
- The **Holm** method is a less conservative stepwise alternative.
- The **false discovery rate** (Benjamini and Hochberg, 1995) controls the expected proportion of false positives.
- Pre-registering planned comparisons reduces the temptation to test everything.
X: Correcting for many tests.
> A student compares wellbeing across 10 subgroups using separate tests at alpha 0.05.
> If all nulls were true, about 0.5 false positives would be expected, and the familywise rate is about 40%.
> Using Bonferroni, each test is evaluated at 0.05 divided by 10 = 0.005.
> Only one comparison remains significant after correction.
K: Type I errors are false positives with probability alpha and Type II errors are false negatives with probability beta; the two trade off for a given sample, and multiple testing inflates false positives unless corrected with methods such as Bonferroni, Holm or false discovery rate control.
!: Running dozens of uncorrected tests and reporting only the significant ones. This greatly inflates false positives; plan comparisons and correct for multiplicity.
EV: established | Conducting multiple independent tests increases the probability of at least one Type I error.
T: Type I error | Rejecting a true null hypothesis
T: Type II error | Failing to reject a false null hypothesis
T: Bonferroni correction | Dividing alpha by the number of tests performed
SUM: False positive, false negative.
SUM: Alpha and beta trade off.
SUM: Correct for many tests.
SRC: Neyman J. and Pearson E. S., On the problem of the most efficient tests of statistical hypotheses, Philosophical Transactions of the Royal Society A 231, 289-337 | primary | 1933
SRC: Benjamini Y. and Hochberg Y., Controlling the false discovery rate: a practical and powerful approach to multiple testing, Journal of the Royal Statistical Society Series B 57(1), 289-300 | primary | 1995
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 2 | standard | 2018
Q: What is a Type II error? | Failing to reject a null hypothesis that is false.
Q: What does the false discovery rate control? | The expected proportion of false positives among significant results.
M1#research-u05-13-q1@1: Which term describes rejecting a true null hypothesis? | Type I error | Type II error | Statistical power | Effect size | A Type I error is a false positive, whose probability under H0 is alpha.
M2#research-u05-13-q2@2: A study concludes a drug has no effect when it actually works. Which error has occurred? | Type II error | Type I error | Sampling frame error | Measurement error | Missing a real effect is a false negative, which is a Type II error.
NUM2#research-u05-13-q3@2: A researcher runs 8 planned tests and applies a Bonferroni correction to an overall alpha of 0.04. What alpha should each test use? | 0.005 | 0.0001 | – | Bonferroni divides the overall alpha by the number of tests: 0.04 divided by 8 gives 0.005 per test.
M3#research-u05-13-q4@3: For a fixed sample size, what happens if alpha is lowered from 0.05 to 0.01? | Type I errors fall but Type II errors rise | Both types of error fall together | Type II errors fall but Type I errors rise | Neither type of error is affected | A stricter threshold makes rejection harder, so false positives fall but false negatives become more likely.
SA2#research-u05-13-q5@2,3: Explain the problem of multiple comparisons and how researchers can address it. | Each test at alpha 0.05 has a 5% chance of a false positive when the null is true, so running many tests makes at least one false positive likely. This inflates the familywise error rate. Researchers can reduce the number of tests by pre-registering planned comparisons, and can apply corrections such as Bonferroni or Holm, or control the false discovery rate with Benjamini-Hochberg. The choice balances protection against false positives with loss of power. | Inflation of errors ; Familywise rate ; Planning and pre-registration ; Corrections and trade-off

## t-tests
LV: Postgraduate · Core
S: The t-test compares means between two groups or conditions. This lesson explains the one-sample, independent and paired t-tests, their assumptions and how to report them.
O: Distinguish the three main types of t-test
O: Check the assumptions of t-tests
O: Interpret and report t-test results
H: Comparing two means
P: The **t-test**, developed by William Gosset and published under the name "Student" (1908), tests whether a difference between means is larger than would be expected from sampling error. The **t statistic** is the difference between means divided by its standard error, and is compared with the **t distribution** with the appropriate **degrees of freedom** (df). The **one-sample t-test** compares a mean with a known value; the **independent-samples t-test** compares two separate groups; and the **paired-samples t-test** compares two measurements from the same participants or matched pairs. Paired designs are usually more powerful because they remove between-person variation.
H: Assumptions
- The outcome is measured at interval or ratio level.
- Observations are independent (within groups for independent tests).
- The sampling distribution of the mean difference is approximately normal; this holds in large samples.
- For independent tests, **homogeneity of variance**, checked with Levene's test.
- **Welch's t-test** does not assume equal variances and is often recommended by default.
H: Reporting a t-test
- Report means and SDs for each group or condition.
- Give t, df and the exact p-value, for example t(58) = 2.45, p = 0.017.
- Report an effect size such as Cohen's d with its confidence interval.
- State whether the test was one- or two-tailed.
- Use the Mann-Whitney U or Wilcoxon signed-rank test if assumptions fail badly.
X: A paired-samples t-test.
> Twenty-five students rate their research confidence before and after a methods workshop.
> Mean confidence rises from 5.2 to 6.1 on a 10-point scale.
> A paired t-test gives t(24) = 3.10, p = 0.005, with df = 25 minus 1 = 24.
> The student reports the mean change, its 95% CI and Cohen's d for paired data.
K: The t-test compares means using one-sample, independent or paired designs, assumes interval data, independence and approximate normality, with Welch's version for unequal variances, and results should be reported with descriptives, t, df, p and an effect size.
!: Using an independent t-test for before-and-after scores from the same people. Repeated measurements are not independent, so a paired t-test is required.
EV: established | Paired designs remove between-person variation and are generally more powerful than independent designs for the same number of observations.
T: Degrees of freedom | The number of values free to vary when estimating a statistic
T: Paired-samples t-test | A test comparing two measurements from the same or matched participants
T: Welch's t-test | An independent t-test that does not assume equal variances
SUM: Two means compared.
SUM: Independent or paired.
SUM: Report t, df, p and d.
SRC: Student, The probable error of a mean, Biometrika 6(1), 1-25 | primary | 1908
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 10 | standard | 2018
SRC: Delacre M., Lakens D. and Leys C., Why psychologists should by default use Welch's t-test instead of Student's t-test, International Review of Social Psychology 30(1), 92-101 | primary | 2017
Q: Who developed the t-test? | William Gosset, publishing as "Student".
Q: What does Levene's test check? | Homogeneity of variance between groups.
M1#research-u05-14-q1@1: Which t-test compares two separate groups of participants? | Independent-samples t-test | Paired-samples t-test | One-sample t-test | Repeated-measures t-test | Separate, unrelated groups require the independent-samples version.
M2#research-u05-14-q2@2: Levene's test is significant for an independent t-test. What is the most appropriate response? | Use Welch's t-test | Use a paired t-test | Use a chi-square test | Abandon the analysis | Welch's test does not assume equal variances, so it suits groups with unequal spread.
NUM2#research-u05-14-q3@2: An independent-samples t-test compares groups of 32 and 28 students. What are the degrees of freedom? | 58 | 0 | – | For a Student's independent t-test, df equals n1 plus n2 minus 2, so 32 plus 28 minus 2 gives 58.
M3#research-u05-14-q4@3: A thesis reports only "the difference was significant, p < 0.05". What is most important to add? | Means, t, df, exact p and an effect size | The name of the statistics software used | The date on which the test was run | A longer description of the null hypothesis | Full reporting lets readers judge direction, size and precision of the effect.
SA2#research-u05-14-q5@2,3: Explain when you would use a paired rather than an independent t-test, and why. | A paired t-test is used when the two sets of scores come from the same participants, such as before and after an intervention, or from matched pairs. The scores are not independent, so an independent t-test would violate its assumptions. The paired test analyses the differences within each pair, removing stable between-person variation. This usually reduces error and increases power for the same number of participants. | Paired designs ; Independence violation ; Within-pair differences ; Power advantage

## Analysis of variance (ANOVA)
LV: Postgraduate · Core
S: ANOVA compares means across three or more groups or conditions in a single test. This lesson explains one-way, factorial and repeated-measures ANOVA, the F ratio and post hoc tests.
O: Explain the logic of the F ratio
O: Distinguish one-way, factorial and repeated-measures ANOVA
O: Interpret main effects, interactions and post hoc tests
H: The logic of ANOVA
P: **Analysis of variance** (ANOVA), developed by Fisher, compares means across three or more groups by partitioning the total variability in scores into **between-groups** variance, due to group differences, and **within-groups** variance, due to individual differences and error. The **F ratio** is the between-groups **mean square** divided by the within-groups mean square. If group means are equal in the population, F is expected to be around 1; a large F suggests that at least one mean differs. Using ANOVA rather than several t-tests controls the **familywise error rate**. A significant F does not say which groups differ, so **post hoc tests** or **planned contrasts** follow.
H: Types of ANOVA
- **One-way ANOVA**: one factor with three or more levels.
- **Factorial ANOVA**: two or more factors, testing **main effects** and **interactions**.
- **Repeated-measures ANOVA**: the same participants in all conditions; assumes **sphericity**.
- **Mixed ANOVA**: combines between- and within-subjects factors.
- **ANCOVA**: adjusts for a continuous covariate.
H: Following up
- **Post hoc tests**, such as Tukey's HSD, compare all pairs while controlling error.
- **Planned contrasts** test specific hypotheses stated in advance.
- An **interaction** means the effect of one factor depends on the level of another.
- Interpret interactions with plots and simple effects before main effects.
- Report effect sizes such as partial eta squared.
X: A one-way ANOVA.
> A student compares exam scores for three revision methods: rereading, flashcards and practice testing.
> One-way ANOVA gives F(2, 87) = 6.40, p = 0.003, partial eta squared = 0.13.
> Tukey's HSD shows practice testing beats rereading, with no other significant pairs.
> The degrees of freedom are 3 minus 1 = 2 between groups and 90 minus 3 = 87 within groups.
K: ANOVA compares several means by dividing variance into between- and within-groups parts and testing their ratio, F; one-way, factorial, repeated-measures and mixed designs are common, and post hoc tests, planned contrasts and interaction plots explain significant results.
!: Running all pairwise t-tests instead of ANOVA. Multiple uncorrected t-tests inflate the Type I error rate.
EV: established | The F ratio compares between-groups and within-groups variance to test differences among several means.
T: F ratio | Between-groups mean square divided by within-groups mean square
T: Interaction | When the effect of one factor depends on the level of another
T: Post hoc test | A follow-up test comparing groups after a significant overall effect
SUM: Partition the variance.
SUM: F compares between and within.
SUM: Follow up carefully.
SRC: Fisher R. A., Statistical Methods for Research Workers, Oliver and Boyd | primary | 1925
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapters 12 to 15 | standard | 2018
SRC: Howell D. C., Statistical Methods for Psychology, 8th edition, Wadsworth Cengage | standard | 2013
Q: What does the F ratio compare? | Between-groups variance with within-groups variance.
Q: What assumption is specific to repeated-measures ANOVA? | Sphericity.
M1#research-u05-15-q1@1: Why is ANOVA used instead of several t-tests for three groups? | It controls the familywise error rate | It removes the need for normality | It proves which group is best | It requires fewer participants per group | One overall test avoids the inflation of Type I errors from multiple t-tests.
M2#research-u05-15-q2@2: A training programme helps novices much more than experts. In a factorial ANOVA, what is this? | An interaction | A main effect of training only | A violation of sphericity | A post hoc comparison | The effect of training depends on experience level, which is an interaction.
NUM2#research-u05-15-q3@3: In an ANOVA, the between-groups mean square is 24 and the within-groups mean square is 6. What is F? | 4 | 0 | – | F is the between-groups mean square divided by the within-groups mean square, so 24 divided by 6 gives F = 4.
M3#research-u05-15-q4@3: A one-way ANOVA across four teaching methods is significant. What should the researcher do next? | Use post hoc tests or planned contrasts | Conclude that all four methods differ | Report only the highest group mean | Repeat the ANOVA with a smaller sample | A significant F shows some difference exists but not where, so follow-up tests are needed.
SA2#research-u05-15-q5@2,3: Explain how to interpret a significant interaction in a two-way ANOVA. | An interaction means the effect of one factor differs across levels of the other factor. For example, a mentoring scheme might raise wellbeing for part-time students but not full-time students. When an interaction is significant, main effects can be misleading, so the researcher should plot the cell means and test simple effects of one factor at each level of the other. The effect size and pattern should then be reported and explained. | Definition ; Example ; Main effects caution ; Simple effects and plots

## Chi-square tests
LV: Postgraduate · Foundation
S: Chi-square tests analyse categorical data by comparing observed and expected frequencies. This lesson explains the goodness-of-fit test and the test of independence, their assumptions and effect sizes.
O: Distinguish chi-square goodness-of-fit and independence tests
O: Calculate expected frequencies and degrees of freedom
O: Check assumptions and report chi-square results
H: Testing categorical data
P: The **chi-square test**, introduced by Karl Pearson (1900), compares **observed frequencies** with the **expected frequencies** that would occur if a null hypothesis were true. The **goodness-of-fit test** asks whether the distribution of one categorical variable matches a specified distribution, such as equal proportions. The **test of independence** asks whether two categorical variables are associated, using a **contingency table**. Under independence, the expected frequency for each cell is the row total multiplied by the column total, divided by the overall total. The statistic sums the squared differences between observed and expected counts, each divided by the expected count.
H: Assumptions and alternatives
- Data are counts of cases, not percentages or means.
- Each case contributes to only one cell.
- Expected frequencies should generally be 5 or more in most cells.
- With small expected counts in a 2 x 2 table, use **Fisher's exact test**.
- For paired categorical data, use **McNemar's test** instead.
H: Interpreting and reporting
- Degrees of freedom for independence are (rows minus 1) times (columns minus 1).
- Report chi-square, df, N and p, for example chi-square(1, N = 200) = 6.25, p = 0.012.
- Report an effect size such as **phi** or **Cramer's V**.
- Examine **standardised residuals** to see which cells drive the result.
- Present the contingency table with percentages.
X: Expected frequencies in a 2 x 2 table.
> 200 students are classified by funding (funded or self-funded) and whether they considered leaving.
> 120 are funded and 80 considered leaving.
> The expected count of funded students who considered leaving is 120 times 80 divided by 200 = 48.
> The observed count was 36, fewer than expected, suggesting funding is linked to lower intentions to leave.
K: Chi-square tests compare observed and expected counts for one categorical variable (goodness of fit) or two (independence), require adequate expected frequencies, and should be reported with df, N, p and effect sizes such as phi or Cramer's V.
!: Running chi-square on percentages instead of counts. The test requires raw frequencies; percentages give a wrong statistic.
EV: established | The chi-square test of independence is a standard method for testing associations between categorical variables.
T: Expected frequency | The count expected in a cell if the null hypothesis were true
T: Contingency table | A table cross-classifying cases by two categorical variables
T: Cramer's V | An effect size for the strength of association in a contingency table
SUM: Observed versus expected.
SUM: Fit or independence.
SUM: Counts, not percentages.
SRC: Pearson K., On the criterion that a given system of deviations from the probable in the case of a correlated system of variables is such that it can be reasonably supposed to have arisen from random sampling, Philosophical Magazine 50(302), 157-175 | primary | 1900
SRC: Agresti A., Categorical Data Analysis, 3rd edition, Wiley | standard | 2013
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 19 | standard | 2018
Q: How is an expected frequency calculated in a test of independence? | Row total times column total divided by the overall total.
Q: When should Fisher's exact test be used? | When expected counts are small in a 2 x 2 table.
M1#research-u05-16-q1@1: Which test asks whether two categorical variables are associated? | Chi-square test of independence | Chi-square goodness-of-fit test | Independent-samples t-test | Pearson's correlation | The test of independence uses a contingency table to examine association between two variables.
M2#research-u05-16-q2@2: In a 2 x 2 table, two cells have expected counts below 5. What is the best option? | Fisher's exact test | McNemar's test | A one-way ANOVA | Pearson's correlation | Fisher's exact test does not rely on large expected counts.
NUM2#research-u05-16-q3@2: What are the degrees of freedom for a chi-square test of independence on a 3 x 4 contingency table? | 6 | 0 | – | Degrees of freedom are rows minus 1 times columns minus 1, so 2 times 3 gives df = 6.
M3#research-u05-16-q4@3: A significant chi-square test on a 3 x 3 table shows an association. How can the researcher tell which cells drive it? | Inspect the standardised residuals | Recalculate the test with percentages | Run a paired-samples t-test | Remove the largest category | Standardised residuals show which cells differ most from expected counts.
SA2#research-u05-16-q5@2,3: Describe how you would analyse whether discipline (arts, sciences, social sciences) is associated with whether PhD students publish before submission. | I would build a 3 x 2 contingency table of counts and run a chi-square test of independence, with df of 2. I would check that expected frequencies are at least 5 in most cells. I would report chi-square, df, N and p, with Cramer's V as an effect size. Standardised residuals and row percentages would show which disciplines publish more or less than expected. | Contingency table ; Assumptions ; Reporting and effect size ; Residuals and percentages

## Correlation
LV: Postgraduate · Foundation
S: Correlation measures the strength and direction of a relationship between two variables. This lesson explains Pearson's and Spearman's coefficients, how to interpret them, and why correlation does not establish causation.
O: Interpret the direction and strength of a correlation coefficient
O: Choose between Pearson's r and Spearman's rho
O: Explain why correlation does not imply causation
H: Measuring association
P: A **correlation coefficient** summarises how closely two variables are related. **Pearson's r**, developed by Karl Pearson, measures the strength of a **linear** relationship between two continuous variables and ranges from -1 (perfect negative) through 0 (no linear relationship) to +1 (perfect positive). **Spearman's rho** correlates the **ranks** of the data and suits ordinal variables or monotonic but non-linear relationships, and is less affected by outliers. Squaring r gives the **coefficient of determination**, r squared, the proportion of variance in one variable shared with the other. A **partial correlation** measures association between two variables while controlling for a third.
H: Interpreting correlations
- The sign gives the **direction**; the size gives the **strength**.
- r of about 0.1, 0.3 and 0.5 is often called small, medium and large.
- Always inspect a **scatterplot**: r can miss curved relationships.
- Outliers can create or hide a correlation.
- **Restriction of range** reduces correlations, for example studying only top students.
H: Correlation and causation
- A correlation may arise from a **confounding** third variable.
- The direction of influence may be reversed.
- **Spurious correlations** can occur by chance, especially when many variables are tested.
- Causal claims need design features such as experiments, temporal order or strong theory.
- Partial correlation and regression can adjust for measured confounders only.
X: Interpreting a correlation.
> A survey of 150 PhD students finds r = 0.40 between hours of supervision and satisfaction, p below 0.001.
> r squared is 0.16, so the variables share 16% of their variance.
> The scatterplot shows a roughly linear pattern with no extreme outliers.
> The student notes that satisfied students may seek more supervision, so causation cannot be inferred.
K: Correlation coefficients describe the direction and strength of association, with Pearson's r for linear relationships between continuous variables and Spearman's rho for ranks, and scatterplots and design must be considered before any causal interpretation.
!: Reading r = 0 as "no relationship". Pearson's r only detects linear relationships; a strong curved relationship can give r near zero.
EV: established | Correlation between two variables does not by itself establish that one causes the other.
T: Pearson's r | A coefficient measuring the strength of a linear relationship
T: Spearman's rho | A rank-based correlation coefficient for monotonic relationships
T: Coefficient of determination | The proportion of variance shared by two variables, r squared
SUM: Direction and strength.
SUM: Pearson or Spearman.
SUM: Not causation.
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 8 | standard | 2018
SRC: Howell D. C., Statistical Methods for Psychology, 8th edition, Wadsworth Cengage, chapter 9 | standard | 2013
Q: What does a correlation of -0.8 indicate? | A strong negative relationship.
Q: When is Spearman's rho preferred to Pearson's r? | For ordinal data, monotonic non-linear relationships or data with outliers.
M1#research-u05-17-q1@1: What range of values can Pearson's r take? | From -1 to +1 | From 0 to 1 | From 0 to 100 | From -100 to +100 | A correlation coefficient runs from perfect negative to perfect positive association.
M2#research-u05-17-q2@2: A study of only students with first-class degrees finds a weak correlation between entry grades and PhD success. What may explain this? | Restriction of range | Perfect linearity | Too many variables | A Type I error | Studying a narrow band of entry grades reduces variability and so weakens the correlation.
NUM2#research-u05-17-q3@2: Two variables correlate at r = 0.6. What percentage of variance do they share? | 36 | 0 | % | The coefficient of determination is r squared, and 0.6 squared is 0.36, so the variables share 36 percent.
M3#research-u05-17-q4@3: Towns with more libraries have higher crime rates. What is the most plausible explanation? | Both are related to population size | Libraries cause crime to increase | Crime causes libraries to be built | The correlation must be negative | A confounder such as town size can produce a correlation between unrelated variables.
SA2#research-u05-17-q5@2,3: Explain why a researcher should inspect a scatterplot before reporting a correlation coefficient. | A scatterplot shows the form of the relationship, so a curved pattern that Pearson's r would understate can be spotted. It reveals outliers that might create or mask a correlation, and shows whether variability is restricted. It can also show subgroups that behave differently. These checks indicate whether Pearson's r, Spearman's rho or another analysis is appropriate. | Form of relationship ; Outliers ; Range and subgroups ; Choice of coefficient

## Linear regression
LV: Postgraduate · Core
S: Simple linear regression predicts an outcome from one predictor using a straight line. This lesson explains the regression equation, the meaning of the intercept and slope, model fit and assumptions.
O: Interpret the intercept and slope of a regression line
O: Use a regression equation to make predictions
O: Check the assumptions of linear regression
H: Fitting a line
P: **Linear regression** models the relationship between a continuous **outcome** (Y) and a **predictor** (X) with the equation Y = b0 + b1X + error. The **intercept** b0 is the predicted value of Y when X is zero, and the **slope** b1 is the predicted change in Y for each one-unit increase in X. The line is estimated by **ordinary least squares**, which minimises the sum of squared **residuals**, the differences between observed and predicted values. **R squared** gives the proportion of variance in Y explained by the model. The term "regression" comes from Galton's (1886) observation of **regression towards the mean** in heights.
H: Assumptions
- **Linearity**: the relationship between X and Y is linear.
- **Independence** of residuals.
- **Homoscedasticity**: residuals have constant variance across predicted values.
- **Normality of residuals**, mainly important for small samples.
- No highly **influential cases**, checked with Cook's distance.
H: Interpreting output
- The slope's t-test asks whether b1 differs from zero.
- Report b, its SE, 95% CI, t and p.
- The **standardised coefficient** (beta) expresses the slope in SD units.
- Plot residuals against predicted values to check assumptions.
- Avoid **extrapolating** beyond the range of observed X values.
X: Predicting writing output.
> A regression of weekly words written (Y) on hours of protected writing time (X) gives Y = 500 + 250X.
> The intercept predicts 500 words with no protected time.
> Each additional hour predicts 250 more words.
> A student with 6 hours is predicted to write 500 + 250 times 6 = 2,000 words.
K: Linear regression estimates an outcome from a predictor using an intercept and slope fitted by least squares, R squared shows variance explained, and assumptions of linearity, independence, homoscedasticity and normal residuals should be checked.
!: Interpreting the intercept when X = 0 is impossible or outside the data. The intercept may then have no practical meaning, and predictions should stay within the observed range.
EV: established | Ordinary least squares regression estimates the line that minimises the sum of squared residuals.
T: Slope | The predicted change in the outcome for a one-unit increase in the predictor
T: Residual | The difference between an observed and a predicted value
T: Homoscedasticity | Constant variance of residuals across predicted values
SUM: Y = b0 + b1X.
SUM: Least squares fits the line.
SUM: Check the residuals.
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 9 | standard | 2018
SRC: Galton F., Regression towards mediocrity in hereditary stature, Journal of the Anthropological Institute of Great Britain and Ireland 15, 246-263 | primary | 1886
SRC: Gelman A., Hill J. and Vehtari A., Regression and Other Stories, Cambridge University Press | standard | 2020
Q: What does the slope in a regression equation represent? | The predicted change in Y for a one-unit increase in X.
Q: What does ordinary least squares minimise? | The sum of squared residuals.
M1#research-u05-18-q1@1: In the equation Y = b0 + b1X, what is b0? | The intercept | The slope | The residual | The correlation | b0 is the predicted value of Y when X equals zero.
M2#research-u05-18-q2@2: A residual plot shows residuals fanning out as predicted values increase. Which assumption is violated? | Homoscedasticity | Independence of observations | Linearity of measurement levels | Nominal measurement | A funnel shape shows non-constant variance, which breaks homoscedasticity.
NUM2#research-u05-18-q3@2: A regression gives Y = 12 + 3X. What is the predicted Y when X = 5? | 27 | 0 | – | Substituting X = 5 gives 12 plus 3 times 5, which is 12 plus 15 = 27.
M3#research-u05-18-q4@3: A model predicts salary from years of experience using data for people with 0 to 20 years. What is the main concern about predicting salary at 45 years? | It extrapolates beyond the observed data | The slope cannot be interpreted at all | The intercept would become negative | R squared would automatically fall to zero | The linear relationship may not hold outside the range of the data used to fit it.
SA2#research-u05-18-q5@2,3: Explain how you would check the assumptions of a simple linear regression model. | I would plot Y against X to check linearity, and plot residuals against predicted values to check homoscedasticity and spot non-linearity. A histogram or Q-Q plot of residuals would check normality, which matters more in small samples. Independence would be judged from the design, for example ensuring each participant appears once. Cook's distance would identify influential cases, with sensitivity analyses if needed. | Linearity ; Homoscedasticity ; Normal residuals ; Independence and influence

## Multiple regression
LV: Postgraduate · Core
S: Multiple regression predicts an outcome from several predictors at once. This lesson explains how to interpret coefficients, compare models and deal with multicollinearity and categorical predictors.
O: Interpret coefficients in a multiple regression model
O: Compare models using R squared and hierarchical entry
O: Identify and address multicollinearity
H: Several predictors at once
P: **Multiple regression** extends linear regression to two or more predictors: Y = b0 + b1X1 + b2X2 + ... + error. Each coefficient shows the predicted change in Y for a one-unit change in that predictor **holding the other predictors constant**, which allows researchers to **adjust** for measured confounders. **R squared** is the proportion of variance explained by all predictors together, and **adjusted R squared** corrects for the number of predictors. In **hierarchical regression**, predictors are entered in blocks chosen by theory, and the **change in R squared** shows what each block adds (Tabachnick and Fidell, 2019). Categorical predictors are included as **dummy variables**.
H: Practical issues
- **Multicollinearity**: predictors highly correlated with each other inflate standard errors.
- Check the **variance inflation factor** (VIF); values above about 10 are often seen as problematic.
- Use **dummy coding**: a categorical variable with k categories needs k minus 1 dummies.
- **Interaction terms** test whether one predictor's effect depends on another.
- Aim for an adequate sample relative to the number of predictors.
H: Model building
- Choose predictors from theory and prior research, not only from data.
- Avoid automated **stepwise** selection, which capitalises on chance.
- Report unstandardised b, SE, CI and p for each predictor.
- Report R squared and adjusted R squared for each model.
- Check the same assumptions as simple regression, using residuals.
X: A hierarchical regression.
> Outcome: doctoral wellbeing. Block 1: age and gender; Block 2: supervision quality and peer support.
> Block 1 explains 4% of variance; adding Block 2 raises R squared to 22%.
> The R squared change of 18% is significant.
> Supervision quality has b = 0.45, meaning a one-point rise predicts 0.45 more wellbeing points, holding other variables constant.
K: Multiple regression estimates each predictor's effect while holding others constant, uses R squared and hierarchical blocks to compare models, includes categorical predictors as dummies and must check for multicollinearity and standard regression assumptions.
!: Using stepwise selection to find the "best" predictors. Automated selection capitalises on chance and gives unstable models; select predictors on theoretical grounds.
EV: established | Multicollinearity inflates the standard errors of regression coefficients.
EV: contested | Rules of thumb for the number of cases needed per predictor vary considerably.
T: Adjusted R squared | R squared corrected for the number of predictors in the model
T: Multicollinearity | High correlation among predictors in a regression model
T: Dummy variable | A 0 or 1 variable representing membership of a category
SUM: Hold others constant.
SUM: Build models in blocks.
SUM: Watch multicollinearity.
SRC: Tabachnick B. G. and Fidell L. S., Using Multivariate Statistics, 7th edition, Pearson, chapter 5 | standard | 2019
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 9 | standard | 2018
SRC: Gelman A., Hill J. and Vehtari A., Regression and Other Stories, Cambridge University Press | standard | 2020
Q: What does a coefficient in multiple regression represent? | The change in Y per unit change in that predictor, holding other predictors constant.
Q: How many dummy variables does a categorical predictor with k categories need? | k minus 1.
M1#research-u05-19-q1@1: What does adjusted R squared correct for? | The number of predictors in the model | The level of measurement of the outcome | Missing data in the predictors | The direction of the coefficients | Adding predictors always raises R squared a little, so the adjusted version penalises extra predictors.
M2#research-u05-19-q2@2: Two predictors correlate at 0.95 and their coefficients have very large standard errors. What is the likely problem? | Multicollinearity | Heteroscedasticity | Restriction of range | Non-response bias | Highly correlated predictors make it hard to separate their effects, inflating standard errors.
NUM2#research-u05-19-q3@2: Discipline has 5 categories and is entered as a predictor. How many dummy variables are needed? | 4 | 0 | – | A categorical predictor with k categories needs k minus 1 dummies, so 5 categories need 4 dummy variables.
M3#research-u05-19-q4@3: Adding a block of personality variables raises R squared from 0.20 to 0.21, not significantly. What is the best interpretation? | Personality adds little beyond the first block | Personality is the most important predictor | The first block should be removed entirely | The model must have been entered wrongly | A small, non-significant R squared change suggests little unique explanatory value.
SA2#research-u05-19-q5@2,3: Explain how hierarchical multiple regression can test whether supervision quality predicts PhD completion intentions beyond demographic factors. | The researcher enters demographic variables, such as age, funding and mode of study, in the first block and records R squared. Supervision quality is entered in a second block, and the change in R squared shows how much additional variance it explains. Its coefficient in the final model shows its effect holding demographics constant. Assumptions and multicollinearity should be checked, and results reported with coefficients, CIs and R squared for both models. | Block 1 demographics ; Block 2 and R squared change ; Adjusted coefficient ; Checks and reporting

## Logistic regression
LV: Postgraduate · Core
S: Logistic regression models binary outcomes such as pass or fail, using odds and odds ratios. This lesson explains the logic of the model, how to interpret odds ratios and how to assess model fit.
O: Explain why logistic regression is used for binary outcomes
O: Convert between probability, odds and odds ratios
O: Interpret and report a logistic regression model
H: Modelling a binary outcome
P: When the outcome has two categories, such as completing a PhD or not, linear regression is unsuitable because predictions can fall outside 0 and 1. **Binary logistic regression** models the **log odds**, or **logit**, of the outcome as a linear function of predictors (Hosmer, Lemeshow and Sturdivant, 2013). The **odds** of an event are its probability divided by the probability that it does not happen. Exponentiating a coefficient gives an **odds ratio** (OR): the multiplicative change in the odds for a one-unit increase in a predictor, holding others constant. An OR above 1 indicates higher odds, below 1 lower odds, and exactly 1 no association.
H: Probability, odds and odds ratios
- Probability 0.5 gives odds of 1 (one to one).
- Probability 0.8 gives odds of 0.8 divided by 0.2 = 4.
- An OR of 2 means the odds double; it does not mean the probability doubles.
- When outcomes are common, ORs can greatly exceed risk ratios.
- Report ORs with 95% confidence intervals; a CI including 1 is not significant.
H: Assessing the model
- The **likelihood ratio test** compares the model with a null model.
- **Pseudo R squared** values, such as Nagelkerke's, are rough guides to fit.
- The **Hosmer-Lemeshow test** checks calibration.
- **Classification tables** and the area under the **ROC curve** assess discrimination.
- Multinomial and ordinal logistic regression handle outcomes with more categories.
X: Interpreting an odds ratio.
> A model predicts on-time PhD submission from funding status.
> Funded students have an OR of 2.5, 95% CI [1.6, 3.9], compared with self-funded students.
> The odds of on-time submission are 2.5 times higher for funded students, holding other predictors constant.
> The CI excludes 1, so the association is statistically significant.
K: Logistic regression models the log odds of a binary outcome, coefficients are exponentiated into odds ratios showing multiplicative changes in odds, and models are assessed with likelihood ratio tests, pseudo R squared, calibration and discrimination.
!: Reading an odds ratio of 2 as "twice as likely". It doubles the odds, which equals doubling the probability only when the outcome is rare.
EV: established | Logistic regression is the standard method for modelling binary outcomes with multiple predictors.
T: Odds | The probability of an event divided by the probability of it not occurring
T: Odds ratio | The ratio of the odds of an outcome in one group to the odds in another
T: Logit | The natural logarithm of the odds
SUM: Binary outcome, log odds.
SUM: Exponentiate to an OR.
SUM: Odds are not probabilities.
SRC: Hosmer D. W., Lemeshow S. and Sturdivant R. X., Applied Logistic Regression, 3rd edition, Wiley | standard | 2013
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage, chapter 20 | standard | 2018
SRC: Bland J. M. and Altman D. G., The odds ratio, BMJ 320, 1468 | primary | 2000 | https://www.bmj.com/content/320/7247/1468
Q: What does an odds ratio of 1 indicate? | No association between the predictor and the outcome.
Q: Why is linear regression unsuitable for binary outcomes? | Its predictions can fall outside the range 0 to 1.
M1#research-u05-20-q1@1: Which type of outcome is binary logistic regression designed for? | An outcome with two categories | An outcome measured in pounds | An outcome with many ranked levels | An outcome that is a count of events | Binary logistic regression models the log odds of one of two possible outcomes.
M2#research-u05-20-q2@2: An odds ratio for a predictor is 0.60 with 95% CI [0.45, 0.80]. What does this indicate? | Significantly lower odds of the outcome | Significantly higher odds of the outcome | No association with the outcome | The probability falls by 60 percent | An OR below 1 with a CI excluding 1 indicates significantly reduced odds.
NUM2#research-u05-20-q3@3: The probability of passing a viva without major corrections is 0.75. What are the odds? | 3 | 0 | – | Odds are the probability divided by its complement: 0.75 divided by 0.25 gives odds of 3.
M3#research-u05-20-q4@3: A paper reports an OR of 3 for a common outcome and says the risk is "three times higher". What is the main problem? | Odds ratios overstate risk ratios for common outcomes | The odds ratio should always be below 1 | Logistic regression cannot use common outcomes | The confidence interval must include 3 | For common outcomes odds and probabilities diverge, so an OR exaggerates relative risk.
SA2#research-u05-20-q5@2,3: Explain how to interpret and report a logistic regression predicting whether students attend a research conference. | The outcome is binary, so logistic regression models the log odds of attending. Each coefficient is exponentiated into an odds ratio, showing how the odds change for a one-unit change in the predictor, holding others constant. For example, an OR of 1.8 for funding means funded students have 80% higher odds of attending. The report should give ORs with 95% CIs and p, the likelihood ratio test, a pseudo R squared and checks of calibration and discrimination. | Binary outcome and log odds ; Odds ratios ; Example ; Reporting and fit

## Non-parametric tests
LV: Postgraduate · Foundation
S: Non-parametric tests make fewer assumptions about distributions, often by analysing ranks. This lesson explains when to use them and matches common non-parametric tests to their parametric equivalents.
O: Explain when non-parametric tests are appropriate
O: Match non-parametric tests to their parametric equivalents
O: Interpret and report non-parametric results
H: Tests with fewer assumptions
P: **Parametric tests**, such as t-tests and ANOVA, assume that data or sampling distributions follow particular forms, usually normal. **Non-parametric tests** make fewer distributional assumptions, typically by converting data to **ranks** (Siegel and Castellan, 1988). They suit **ordinal** data, small samples with clearly non-normal distributions, and data with influential outliers. Wilcoxon (1945) introduced rank tests for paired and two-sample data, and Mann and Whitney (1947) developed the U test for two independent groups. Non-parametric tests are not assumption-free: they still require independent observations, and some assume similarly shaped distributions.
H: Parametric and non-parametric equivalents
- Independent t-test: **Mann-Whitney U** test.
- Paired t-test: **Wilcoxon signed-rank** test.
- One-way ANOVA: **Kruskal-Wallis** test.
- Repeated-measures ANOVA: **Friedman** test.
- Pearson's r: **Spearman's rho** or Kendall's tau.
H: Strengths and limits
- Robust to outliers and skew.
- Appropriate for ordinal outcomes such as rating scales.
- Slightly less powerful than parametric tests when parametric assumptions hold.
- Results are often reported with **medians** and IQRs.
- Effect sizes such as r = z divided by the square root of N can be reported.
X: Choosing a non-parametric test.
> A student compares stress ratings (ordinal, 1 to 7) across full-time, part-time and distance PhD students.
> The data are skewed, with many ratings of 6 and 7.
> A Kruskal-Wallis test is used, followed by pairwise Mann-Whitney tests with correction.
> The report gives medians and IQRs for each group and the test statistic with its df.
K: Non-parametric tests analyse ranks and make fewer distributional assumptions, suiting ordinal or non-normal data, and each has a parametric equivalent, such as Mann-Whitney for the independent t-test and Kruskal-Wallis for one-way ANOVA.
!: Assuming non-parametric tests have no assumptions. They still require independent observations, and interpreting them as tests of medians can require similarly shaped distributions.
EV: established | Rank-based tests are robust to outliers and skewed distributions.
T: Non-parametric test | A test making few assumptions about the distribution of data
T: Mann-Whitney U test | A rank-based test comparing two independent groups
T: Kruskal-Wallis test | A rank-based test comparing three or more independent groups
SUM: Ranks, not raw scores.
SUM: Each has an equivalent.
SUM: Report medians.
SRC: Siegel S. and Castellan N. J., Nonparametric Statistics for the Behavioral Sciences, 2nd edition, McGraw-Hill | standard | 1988
SRC: Mann H. B. and Whitney D. R., On a test of whether one of two random variables is stochastically larger than the other, Annals of Mathematical Statistics 18(1), 50-60 | primary | 1947
SRC: Wilcoxon F., Individual comparisons by ranking methods, Biometrics Bulletin 1(6), 80-83 | primary | 1945
Q: What is the non-parametric equivalent of the paired t-test? | The Wilcoxon signed-rank test.
Q: What summary statistics are usually reported with non-parametric tests? | Medians and interquartile ranges.
M1#research-u05-21-q1@1: What do most non-parametric tests analyse instead of raw scores? | Ranks | Means | Variances | Logarithms | Converting scores to ranks reduces sensitivity to outliers and distribution shape.
M2#research-u05-21-q2@2: Which test compares ordinal ratings from the same participants across four time points? | Friedman test | Kruskal-Wallis test | Mann-Whitney U test | Chi-square goodness of fit | The Friedman test is the rank-based equivalent of repeated-measures ANOVA.
MATCH2#research-u05-21-q3@2: Match each parametric test to its non-parametric equivalent. | Independent t-test = Mann-Whitney U ; Paired t-test = Wilcoxon signed-rank ; One-way ANOVA = Kruskal-Wallis ; Pearson's r = Spearman's rho | Each rank-based test addresses the same design as its parametric counterpart.
M3#research-u05-21-q4@3: Data are approximately normal with 200 participants per group. Why might a t-test be preferred over Mann-Whitney? | It is more powerful when its assumptions hold | Mann-Whitney cannot be used with large samples | Mann-Whitney requires nominal data | The t-test needs no assumptions at all | When parametric assumptions are met, parametric tests use more information and have more power.
SA2#research-u05-21-q5@2,3: Justify the choice of a non-parametric test for comparing satisfaction ratings between two independent groups of 15 students. | Satisfaction ratings on a short scale are ordinal, and with 15 students per group the data may be skewed and normality cannot be relied upon. A Mann-Whitney U test compares the groups using ranks, which is robust to outliers and does not assume normality. It still requires independent observations. Results would be reported with medians, IQRs, U, p and an effect size. | Ordinal data ; Small sample ; Choice of Mann-Whitney ; Reporting

## Bayesian statistics
LV: Postgraduate · Core
S: Bayesian statistics updates beliefs about parameters in the light of data using Bayes' theorem. This lesson explains priors, likelihoods and posteriors, Bayes factors and credible intervals, and compares them with frequentist methods.
O: Explain Bayes' theorem in terms of prior, likelihood and posterior
O: Interpret Bayes factors and credible intervals
O: Compare Bayesian and frequentist approaches
H: Updating beliefs with data
P: **Bayesian statistics** treats probability as a degree of belief and uses **Bayes' theorem**, named after Thomas Bayes (1763), to update it. The **prior** distribution expresses what is believed about a parameter before seeing the data. The **likelihood** expresses how probable the observed data are for each possible parameter value. Combining them gives the **posterior** distribution: posterior is proportional to likelihood times prior. The posterior can be summarised by a **credible interval**, such as a 95% interval that, given the model and prior, contains the parameter with 95% probability (Kruschke, 2015; McElreath, 2020).
H: Bayes factors
- A **Bayes factor** (BF10) compares how well two hypotheses predict the data.
- BF10 = 6 means the data are six times more likely under H1 than under H0.
- Posterior odds equal the Bayes factor multiplied by the prior odds.
- Unlike p-values, Bayes factors can quantify evidence **for** the null.
- Labels such as "moderate" for 3 to 10 are rough conventions (Wagenmakers et al., 2018).
H: Bayesian versus frequentist
- Frequentist probability refers to long-run frequencies; Bayesian probability to belief.
- Frequentist CIs and Bayesian credible intervals are interpreted differently.
- Priors can be **informative** or **weakly informative**; their choice should be justified.
- **Sensitivity analysis** shows how results change with different priors.
- Software such as JASP, brms in R and Stan makes Bayesian analysis accessible.
X: Interpreting a Bayes factor.
> A study tests whether a mindfulness app reduces procrastination.
> A Bayesian t-test gives BF01 = 5, favouring the null.
> The data are five times more likely if there is no effect than if there is the specified effect.
> Unlike a non-significant p-value, this provides positive evidence for no effect.
K: Bayesian statistics combines a prior with the likelihood of the data to produce a posterior distribution, summarised by credible intervals and compared across hypotheses with Bayes factors, which can provide evidence for the null as well as against it.
!: Choosing priors after seeing the data to obtain a desired result. Priors should be specified and justified in advance, with sensitivity analyses reported.
EV: established | Bayes' theorem provides a coherent rule for updating probabilities in the light of new data.
EV: contested | The role of subjective priors and the choice between Bayesian and frequentist methods remain debated.
T: Prior | A probability distribution expressing beliefs before seeing the data
T: Posterior | The updated distribution after combining the prior with the data
T: Bayes factor | The ratio of how well two hypotheses predict the observed data
SUM: Prior times likelihood.
SUM: Posterior summarises belief.
SUM: Evidence for H0 is possible.
SRC: Kruschke J. K., Doing Bayesian Data Analysis: A Tutorial with R, JAGS, and Stan, 2nd edition, Academic Press | standard | 2015
SRC: McElreath R., Statistical Rethinking: A Bayesian Course with Examples in R and Stan, 2nd edition, CRC Press | standard | 2020
SRC: Wagenmakers E.-J. et al., Bayesian inference for psychology. Part I: theoretical advantages and practical ramifications, Psychonomic Bulletin and Review 25, 35-57 | primary | 2018
Q: What is the posterior proportional to? | The likelihood multiplied by the prior.
Q: What can a Bayes factor show that a p-value cannot? | Evidence in favour of the null hypothesis.
M1#research-u05-22-q1@1: In Bayesian analysis, what does the prior represent? | Beliefs about a parameter before seeing the data | The probability of the data under the null only | The final estimate after analysis | The number of participants needed | The prior expresses what is assumed about a parameter before the current data are considered.
M2#research-u05-22-q2@2: A Bayes factor BF10 = 0.1 is reported. What does this mean? | The data favour H0 about ten to one | The data favour H1 about ten to one | The p-value must equal 0.1 | The evidence is exactly balanced | BF10 below 1 favours H0; 0.1 means the data are ten times more likely under H0.
NUM2#research-u05-22-q3@3: Prior odds for H1 against H0 are 0.5 and the Bayes factor BF10 is 8. What are the posterior odds? | 4 | 0 | – | Posterior odds equal the Bayes factor times the prior odds, so 8 times 0.5 gives posterior odds of 4.
M3#research-u05-22-q4@3: Two analysts using different reasonable priors reach similar posteriors. What does this suggest? | The data dominate the conclusions | The priors must both be incorrect | Bayesian methods are not valid here | The sample is far too small to analyse | When conclusions are robust to priors, the data carry most of the information.
SA2#research-u05-22-q5@2,3: Compare a frequentist 95% confidence interval with a Bayesian 95% credible interval. | A frequentist confidence interval comes from a procedure that would capture the true parameter in 95% of repeated samples; it does not give a probability for the specific interval. A Bayesian credible interval is derived from the posterior and, given the model and prior, contains the parameter with 95% probability. The credible interval depends on the prior, so priors must be justified and tested in sensitivity analyses. With weak priors and large samples the two intervals are often numerically similar. | Frequentist interpretation ; Bayesian interpretation ; Role of prior ; Numerical similarity

## Statistical software: SPSS, R and Stata
LV: Postgraduate · Foundation
S: Postgraduate researchers can choose among several statistical packages. This lesson compares SPSS, R and Stata, and explains how to work reproducibly with any of them.
O: Compare the main features of SPSS, R and Stata
O: Choose software suited to a project and discipline
O: Apply reproducible working practices in statistical software
H: The main packages
P: **IBM SPSS Statistics** offers a menu-driven interface widely used in psychology, health and social sciences, and can produce **syntax** that records each analysis. **R** is a free, open-source language with thousands of contributed **packages**, often used through the RStudio interface, and is strong for graphics, advanced modelling and reproducibility (R Core Team). **Stata** is a commercial package popular in economics, epidemiology and sociology, with a consistent command syntax and strong support for survey and panel data. Other options include **Python** with libraries such as pandas and statsmodels, **JASP** and **jamovi**, which provide free menu-driven interfaces.
H: Choosing software
- Consider what your discipline, supervisor and research group use.
- Check what your university licenses and whether you will have access after graduating.
- Consider the methods you need: some advanced models are easier in R or Stata.
- Weigh learning time against long-term flexibility.
- Free tools such as R make sharing analyses easier.
H: Working reproducibly
- Always use **syntax** or **scripts** rather than unrecorded point-and-click steps.
- Keep raw data separate and read-only.
- Comment code and use clear file names and folder structures.
- Record software and package **versions**.
- Use tools such as R Markdown, Quarto or Stata do-files to combine code and output.
X: Moving from menus to scripts.
> A student runs analyses in SPSS by clicking through menus and later cannot reproduce a table.
> She switches to pasting syntax for each analysis into a single, commented file.
> When an examiner asks for an extra analysis, she reruns the whole file in minutes.
> She archives the syntax with her thesis data in the university repository.
K: SPSS, R and Stata each suit different needs, with menu ease, open-source flexibility and econometric strength respectively, and whatever the package, analyses should be scripted, commented and version-recorded for reproducibility.
!: Choosing software only because it is easiest at first. Consider long-term needs, discipline norms and reproducibility as well as learning curve.
EV: established | Scripted analyses improve the reproducibility and transparency of statistical work.
T: Syntax | Written commands that record and reproduce an analysis
T: Package | A collection of functions extending software such as R
T: Reproducibility | The ability to obtain the same results from the same data and code
SUM: Menus, code or both.
SUM: Choose for your needs.
SUM: Always script.
SRC: R Core Team, R: A Language and Environment for Statistical Computing, R Foundation for Statistical Computing | standard | 2024 | https://www.r-project.org/
SRC: Wickham H., Cetinkaya-Rundel M. and Grolemund G., R for Data Science, 2nd edition, O'Reilly | standard | 2023 | https://r4ds.hadley.nz/
SRC: Field A., Discovering Statistics Using IBM SPSS Statistics, 5th edition, Sage | standard | 2018
Q: Which statistical package is free and open source? | R.
Q: Why should analyses be run from syntax or scripts? | So every step is recorded and can be reproduced.
M1#research-u05-23-q1@1: Which package is a free, open-source programming language for statistics? | R | SPSS | Stata | Excel | R is distributed freely by the R Foundation and extended by contributed packages.
M2#research-u05-23-q2@2: An economics PhD student needs panel data models used widely in her field. Which package is commonly used there? | Stata | NVivo | EndNote | Zotero | Stata is popular in economics and has strong built-in support for panel and survey data.
MATCH2#research-u05-23-q3@2: Match each tool to a typical feature. | SPSS = Menu-driven interface with pasteable syntax ; R = Open-source language with contributed packages ; Stata = Consistent command syntax popular in economics ; jamovi = Free menu-driven interface built on R | Each tool combines different strengths in interface, cost and flexibility.
M3#research-u05-23-q4@3: A student cannot reproduce a figure from her own thesis six months later. What practice would most have prevented this? | Running all analyses from saved scripts | Using a different software package | Saving output as screenshots only | Rounding results to one decimal place | Scripts record every step, so analyses can be rerun exactly.
SA2#research-u05-23-q5@2,3: Advise a new PhD student on choosing between SPSS and R for a project involving surveys and multilevel models. | SPSS has a gentle learning curve and pasteable syntax, and may be well supported locally, but multilevel modelling options are more limited and licences may end after graduation. R is free, flexible and strong for multilevel models and graphics, though it takes longer to learn. The student should consider their supervisor's expertise, discipline norms and long-term plans. Whichever they choose, they should work from scripts and record software versions. | SPSS strengths and limits ; R strengths and limits ; Context factors ; Reproducibility

## Reporting statistics
LV: Postgraduate · Core
S: Clear, complete statistical reporting allows readers to judge and reproduce findings. This lesson covers reporting conventions, reporting guidelines and practices that promote transparency.
O: Apply conventions for reporting statistical results
O: Use reporting guidelines relevant to a study design
O: Explain practices that improve transparency in quantitative research
H: What to report
P: Good **statistical reporting** gives readers enough information to understand, evaluate and reproduce analyses. The **APA Publication Manual** (2020) sets conventions widely used in the social sciences: report **descriptive statistics**, the **test statistic** with its **degrees of freedom**, the **exact p-value**, an **effect size** and its **confidence interval**. The SAMPL guidelines (Lang and Altman, 2013) give similar advice for biomedical research. Design-specific **reporting guidelines**, collected by the **EQUATOR Network**, include **CONSORT** for randomised trials, **STROBE** for observational studies and **PRISMA** for systematic reviews.
H: Reporting conventions
- Italicise statistical symbols such as t, F, p and r where the style requires.
- Give exact p-values, such as p = 0.023, and p below 0.001 for very small values.
- Use consistent decimal places, usually two for most statistics.
- Report sample size for each analysis and explain any exclusions.
- Describe the software and version used.
H: Transparency practices
- **Pre-registration** of hypotheses and analysis plans distinguishes confirmatory from exploratory analyses.
- Avoid **p-hacking**: trying analyses until a significant result appears.
- Avoid **HARKing**: hypothesising after the results are known.
- Share data and code where ethics allow, following FAIR principles.
- Report all planned analyses, including non-significant ones.
X: Rewriting a results sentence.
> Original: "There was a significant difference between groups (p < 0.05)."
> Revised: "Mentored students reported higher wellbeing (M = 5.8, SD = 1.1) than non-mentored students (M = 5.2, SD = 1.3)."
> "t(118) = 2.73, p = 0.007, d = 0.50, 95% CI [0.14, 0.86]."
> The revised version shows direction, size, precision and the test used.
K: Statistical reporting should give descriptives, test statistics, degrees of freedom, exact p-values, effect sizes and confidence intervals, follow design-specific guidelines such as CONSORT, STROBE and PRISMA, and be supported by pre-registration and open data and code.
!: Reporting only significant results. Selective reporting distorts the evidence; all planned analyses should be reported, with exploratory analyses labelled as such.
EV: established | Reporting guidelines such as CONSORT improve the completeness of research reports.
EV: contested | How far pre-registration should be expected in exploratory and non-experimental research is debated.
T: Reporting guideline | A checklist specifying what should be reported for a type of study
T: P-hacking | Trying multiple analyses until a significant result is found
T: Pre-registration | Recording hypotheses and analysis plans before data are analysed
SUM: Report fully.
SUM: Use the right guideline.
SUM: Be transparent.
SRC: American Psychological Association, Publication Manual of the American Psychological Association, 7th edition, APA | guidance | 2020
SRC: EQUATOR Network, Enhancing the QUAlity and Transparency Of health Research: reporting guidelines library | guidance | 2024 | https://www.equator-network.org/
SRC: Lang T. A. and Altman D. G., Basic statistical reporting for articles published in biomedical journals: the SAMPL guidelines, in Smart P. et al. (eds), Science Editors' Handbook, European Association of Science Editors | guidance | 2013
Q: Which reporting guideline applies to observational studies? | STROBE.
Q: What is HARKing? | Hypothesising after the results are known.
M1#research-u05-24-q1@1: Which network collects reporting guidelines for health research? | EQUATOR | PRISMA | CONSORT | STROBE | EQUATOR hosts a library of guidelines, including CONSORT, STROBE and PRISMA.
M2#research-u05-24-q2@2: A researcher tries several outcome measures and covariates until one analysis gives p = 0.04, then reports only that one. What is this called? | P-hacking | Pre-registration | Sensitivity analysis | Multiple imputation | Searching through analyses for significance and reporting selectively inflates false positives.
TF2#research-u05-24-q3@2: Reporting "p = n.s." is sufficient for a non-significant result. | false | Exact p-values, effect sizes and confidence intervals should be reported for non-significant results as well.
M3#research-u05-24-q4@3: A thesis presents an analysis not in the pre-registration. How should it be reported? | Clearly labelled as exploratory | Presented as a confirmatory test | Omitted from the thesis entirely | Merged with the planned analyses | Labelling unplanned analyses as exploratory keeps the distinction between testing and generating hypotheses.
SA2#research-u05-24-q5@2,3: Explain what a complete report of an independent t-test should include and why. | A complete report gives the means, standard deviations and sample sizes for each group so readers can see the direction and spread. It states the test used, such as Welch's t-test, with the t statistic, degrees of freedom and exact p-value. An effect size such as Cohen's d and a confidence interval for the difference show magnitude and precision. Together these allow readers to judge importance, compare studies and include the result in meta-analyses. | Descriptives ; Test details ; Effect size and CI ; Purpose
`;
