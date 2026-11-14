// ProGradify Data and Digital Skills at Work (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Data literacy
LV: Introductory · Foundation
S: Almost every job now involves reading, using or questioning data. This lesson explains what data literacy means, the main types of data and how to judge whether data is good enough to use.
O: Define data literacy and explain why it matters at work
O: Distinguish common types of data
O: Assess data against the main dimensions of data quality
H: What data literacy is
P: **Data literacy** is the ability to read, understand, create, communicate and question data. A data-literate employee does not need to be a statistician, but can ask where data came from, what it measures, how reliable it is and what it does and does not show. It matters because decisions about budgets, staffing, customers and services increasingly rest on dashboards, reports and spreadsheets, and poor data leads to poor decisions. The UK Government's **Data Quality Framework** (2020) states that data should be **fit for purpose**: good enough for the use it is put to.
H: Types of data
- **Quantitative** data are numbers, such as sales or hours; **qualitative** data are descriptions, such as interview comments.
- **Discrete** data take whole values (number of complaints); **continuous** data can take any value in a range (time, weight).
- **Nominal** categories have no order (department); **ordinal** categories have an order (satisfaction ratings from poor to excellent).
- **Primary** data are collected by you for your purpose; **secondary** data were collected by someone else.
- **Metadata** is data about data, such as when it was collected and what each field means.
H: Dimensions of data quality
- The Government Data Quality Framework uses six dimensions.
- **Accuracy**: does the data reflect reality?
- **Completeness**: are any values or records missing?
- **Uniqueness**: are there duplicate records?
- **Consistency**: does it match across systems and over time?
- **Timeliness**: is it up to date enough? **Validity**: is it in the right format and range?
X: Checking a customer list before a mailing
> A marketing assistant receives a list of 5,000 customers to email.
> She finds 300 records with no email address (completeness) and 120 duplicates (uniqueness).
> Some postcodes are in the wrong format (validity), and the list was last updated two years ago (timeliness).
> She cleans the duplicates, flags the gaps and asks whether a newer extract is available before sending.
K: Data literacy is the ability to read, use, communicate and question data; knowing data types and checking accuracy, completeness, uniqueness, consistency, timeliness and validity helps you judge whether data is fit for purpose.
!: Assuming data is correct because it is in a system or a spreadsheet. Always ask where it came from and check its quality before relying on it.
EV: established | Data quality is commonly judged against dimensions such as accuracy, completeness, consistency, timeliness, uniqueness and validity.
T: Data literacy | The ability to read, understand, create, communicate and question data
T: Ordinal data | Categories with a meaningful order but unequal or unknown gaps
T: Fit for purpose | Good enough in quality for the use it will be put to
SUM: Question your data.
SUM: Know your data types.
SUM: Check six quality dimensions.
SRC: Government Data Quality Hub, The Government Data Quality Framework | guidance | 2020 | https://www.gov.uk/government/publications/the-government-data-quality-framework
SRC: Spiegelhalter D., The Art of Statistics: Learning from Data, Pelican | secondary | 2019
Q: What does it mean for data to be fit for purpose? | Its quality is good enough for the use it will be put to.
Q: What is metadata? | Data about data, such as when it was collected and what each field means.
M1#professional-u07-01-q1@1: Which of these is an example of ordinal data? | Satisfaction ratings from poor to excellent | The department each employee works in | The exact time taken to answer a call | The names of suppliers on a list | Applying the standard result: Ordinal categories have a natural order.
MATCH2#professional-u07-01-q2@2: Match each problem in a dataset to the quality dimension it affects. | The same customer appears three times = Uniqueness ; Many phone numbers are blank = Completeness ; The figures are eighteen months old = Timeliness ; Dates are written as text like "next Tues" = Validity | Each dimension tests a different aspect of whether data can be trusted.
M2#professional-u07-01-q3@2: A manager's dashboard shows different staff numbers from the HR system. Which quality dimension is most clearly at issue? | Consistency | Uniqueness | Timeliness | Validity | Consistency asks whether data matches across systems.
M3#professional-u07-01-q4@3: You are asked to base a staffing decision on a survey that only 12 of 200 staff answered. What is the best response? | Use it cautiously and say that the low response limits it | Treat it as fully representative of all staff views | Ignore all data and decide on instinct alone | Increase the results to estimate all 200 replies | Low completeness means results may not reflect the whole group.
SA2#professional-u07-01-q5@1,3: Explain why data literacy matters for a non-specialist employee and how they might check a dataset before using it. | Data literacy matters because many workplace decisions rest on reports, spreadsheets and dashboards, and an employee who cannot question data may act on errors. Before using a dataset they should ask where it came from, when it was collected and what each field means. They can check it for accuracy, completeness, duplicates, consistency with other sources, timeliness and valid formats. If problems are found, they should flag the limits or seek better data. | Decisions rely on data ; Source and metadata ; Quality dimensions checked ; Flag limits

## Spreadsheet essentials
LV: Introductory · Application
S: Spreadsheets are the most widely used data tool at work. This lesson covers core formulas, good structure and the habits that prevent costly spreadsheet errors.
O: Use common spreadsheet functions and cell references correctly
O: Structure a spreadsheet so that data can be sorted, filtered and summarised
O: Apply checks that reduce the risk of spreadsheet errors
H: Formulas and references
P: A **formula** starts with an equals sign and calculates a result, such as =SUM(B2:B20). A **relative reference** (B2) changes when the formula is copied, while an **absolute reference** (written with dollar signs, such as $B$1) stays fixed, which is useful for a tax rate or exchange rate held in one cell. Common functions include **SUM**, **AVERAGE**, **COUNT**, **IF** for conditions, **SUMIF** and **COUNTIF** for conditional totals, and **XLOOKUP** or **VLOOKUP** to find matching values in another table. A **pivot table** summarises large tables by category without writing formulas.
H: Structuring data well
- Keep raw data in a simple **table**: one header row, one record per row, one type of value per column.
- Avoid merged cells and blank rows inside data, which break sorting and filtering.
- Keep **inputs**, **calculations** and **outputs** separate, for example on different sheets.
- Store values such as rates in one labelled cell and refer to it rather than typing numbers into formulas.
- Use consistent formats for dates and codes.
H: Preventing errors
- Research by Raymond Panko found that a large share of real-world spreadsheets contain errors.
- In 2020, Public Health England lost nearly 16,000 COVID-19 test results because an old spreadsheet format hit its row limit.
- **Check totals** against an independent source and look for numbers that seem implausible.
- Use **data validation** to restrict what can be typed into input cells.
- Ask a colleague to **review** important spreadsheets, and document assumptions on a notes sheet.
X: Calculating a VAT-inclusive price list
> Cell B1 holds the VAT rate, 20%. Prices excluding VAT are in A4 to A50.
> In B4, the formula is =A4*(1+$B$1); it is copied down to B50.
> Because B1 is absolute, every row uses the same rate; if the rate changes, only B1 needs editing.
> A quick check: a 100 pound item shows 120 pounds, as expected.
K: Formulas with correct relative and absolute references, functions such as SUMIF and XLOOKUP and pivot tables make spreadsheets powerful; clean table structure, separated inputs and calculations, validation, checks and peer review prevent common and costly errors.
!: Typing fixed numbers such as rates directly into formulas. Put them in one labelled cell and use an absolute reference so they can be changed safely.
EV: established | Errors in operational spreadsheets are common, and independent review and testing reduce them.
T: Absolute reference | A cell reference, written with dollar signs, that does not change when a formula is copied
T: Pivot table | A tool that summarises a data table by categories without formulas
T: Data validation | Rules restricting what can be entered in a cell
SUM: Use absolute references for fixed values.
SUM: Keep data in clean tables.
SUM: Check and review spreadsheets.
SRC: Panko R. R., What we know about spreadsheet errors, Journal of End User Computing 10(2), 15-21 | primary | 1998
SRC: Microsoft Support, Overview of formulas in Excel | guidance | 2024 | https://support.microsoft.com/en-gb/office/overview-of-formulas-in-excel-ecfdc708-9162-49e8-b993-c311f47ca173
Q: What is the difference between a relative and an absolute reference? | A relative reference changes when copied; an absolute one stays fixed.
Q: What does a pivot table do? | Summarises a data table by category without writing formulas.
M1#professional-u07-02-q1@1: Which function would total sales only for the North region? | SUMIF | COUNT | AVERAGE | XLOOKUP | Applying the standard result: SUMIF adds values that meet a condition.
M2#professional-u07-02-q2@2: A formula =B4*C1 works in row 4 but gives wrong answers when copied down. What is the most likely fix? | Make C1 absolute as $C$1 | Make B4 absolute as $B$4 | Merge cells B4 and C1 | Type the rate into each row | The rate cell must stay fixed while the row reference changes.
TF1#professional-u07-02-q3@1: Merged cells and blank rows inside a data table make sorting and filtering more reliable. | false | They break sorting and filtering; data tables should have one header row and no gaps.
M3#professional-u07-02-q4@3: A finance team relies on a large forecasting spreadsheet built by one person. Which step best reduces the risk of errors? | Have a colleague review it and document assumptions | Lock it so that nobody else can open the file | Add more colour formatting to the key output cells | Copy the file each month without making any checks | Independent review and documentation catch errors one person misses.
SA2#professional-u07-02-q5@2,3: Explain three habits that make a work spreadsheet more reliable. | First, keep raw data in a clean table with one header row and one record per row, avoiding merged cells and blank rows, so it can be sorted and summarised. Second, store fixed values such as rates in one labelled cell and use absolute references, rather than typing numbers into formulas. Third, check results against independent totals, use data validation for inputs, and ask a colleague to review important spreadsheets, as errors are common. | Clean table structure ; Labelled input cells and absolute references ; Checks and validation ; Peer review

## Descriptive statistics for work
LV: Introductory · Application
S: A few simple statistics summarise most workplace data. This lesson explains averages, measures of spread and percentage change, and when each is appropriate.
O: Calculate the mean, median and mode of a dataset
O: Describe spread using the range and interquartile range
O: Calculate and interpret percentage change correctly
H: Averages
P: An **average** summarises a typical value. The **mean** adds all values and divides by how many there are. The **median** is the middle value when the data are sorted, and the **mode** is the most common value. The mean is affected by **outliers**, extreme values far from the rest, so for skewed data such as salaries or house prices the median is often more representative. For example, the Office for National Statistics reports median earnings because a few very high earners pull the mean upwards.
H: Spread
- The **range** is the largest value minus the smallest; it is easy but sensitive to outliers.
- The **interquartile range (IQR)** is the spread of the middle 50% of values, from the lower quartile to the upper quartile.
- The **standard deviation** measures how far values typically lie from the mean.
- Two teams can have the same average but very different spreads, which matters for planning.
- Always report a measure of spread alongside an average where you can.
H: Percentages and percentage change
- **Percentage change** = (new value minus old value) divided by old value, multiplied by 100.
- A rise from 40 to 50 is a 25% increase; a fall from 50 to 40 is a 20% decrease.
- **Percentage points** describe the difference between two percentages: from 10% to 12% is a rise of 2 percentage points, or 20%.
- Check the **base**: a large percentage rise from a small base may be few in number.
- Rates per 1,000 or per head allow fair comparisons between groups of different sizes.
X: Summarising call handling times
> Times in minutes for seven calls: 3, 4, 4, 5, 6, 7, 20.
> Mean = 49 divided by 7 = 7 minutes; median = 5 minutes; mode = 4 minutes.
> The one 20-minute call pulls the mean above most calls, so the median better describes a typical call.
> Range = 20 minus 3 = 17 minutes, again driven by the outlier.
K: The mean, median and mode summarise typical values, with the median more robust to outliers; range, interquartile range and standard deviation describe spread, and percentage change and percentage points must be calculated from the correct base and not confused.
!: Confusing percentage points with percentages. A rise from 10% to 12% is 2 percentage points but a 20% increase.
EV: established | The median is less affected by outliers and skewed data than the mean.
T: Median | The middle value of sorted data
T: Outlier | A value far from the rest of the data
T: Percentage point | The arithmetic difference between two percentages
SUM: Median resists outliers.
SUM: Report spread with averages.
SUM: Check the base for percentages.
SRC: Spiegelhalter D., The Art of Statistics: Learning from Data, Pelican | secondary | 2019
SRC: Office for National Statistics, Employee earnings in the UK: Annual Survey of Hours and Earnings | data | 2024 | https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours
Q: Why does the ONS usually report median rather than mean earnings? | A few very high earners pull the mean upwards, so the median is more typical.
Q: How do you calculate percentage change? | New minus old, divided by old, multiplied by 100.
M1#professional-u07-03-q1@1: What is the median of 2, 9, 4, 7 and 3? | 4 | 5 | 7 | 3 | Sorted, the values are 2, 3, 4, 7, 9, so the middle value is 4.
NUM2#professional-u07-03-q2@2: Monthly complaints fell from 80 to 60. What is the percentage decrease? | 25 | 0 | % | The fall is 20 complaints, and 20 divided by 80 is 0.25, which is a 25% decrease.
M2#professional-u07-03-q3@2: Staff turnover rose from 8% to 10%. How should this be described? | A rise of 2 percentage points, or 25% | A rise of 2%, or 2 percentage points | A rise of 10 percentage points | A rise of 25 percentage points | The difference is 2 points; 2 divided by 8 is a 25% relative increase.
M3#professional-u07-03-q4@3: A report gives the mean salary in a firm of 20 staff, where the owner earns ten times the others. Which change would improve it? | Report the median salary as well | Report only the highest salary | Remove the owner from the firm | Report the mode of job titles | The median is not distorted by the one very high earner.
SA2#professional-u07-03-q5@1,3: Explain when the median is a better summary than the mean, using a workplace example. | The median is better when data are skewed or contain outliers, because the mean is pulled towards extreme values. For example, if most delivery times are two or three days but a few take three weeks, the mean will suggest a longer typical delivery than most customers experience. The median, the middle value of the sorted times, better represents a typical delivery. It is good practice to report a measure of spread, such as the interquartile range, too. | Skew or outliers ; Mean pulled by extremes ; Example given ; Spread reported

## Charts and data visualisation
LV: Introductory · Application
S: The right chart makes a pattern obvious; the wrong one hides or distorts it. This lesson explains how to choose a chart type and design charts that are clear, honest and accessible.
O: Choose an appropriate chart type for a given purpose
O: Apply design principles that make charts clear
O: Identify design choices that mislead or exclude readers
H: Choosing a chart
P: Start with the question the chart should answer. **Bar charts** compare quantities across categories; **line charts** show change over time; **scatter plots** show the relationship between two numeric variables; **histograms** show the distribution of one variable; and **stacked bars** or, for a few categories only, **pie charts** show parts of a whole. Cleveland and McGill (1984) found that people judge **position along a common scale** more accurately than angles or areas, which is why bar and dot charts are usually easier to read than pie charts. A simple **table** is better when readers need exact values.
H: Designing for clarity
- Give each chart a **title that states the message**, such as "Complaints fell after the new process".
- Label axes and units clearly, and label lines directly instead of relying on a distant legend.
- Remove **chart junk** such as 3D effects, heavy gridlines and unnecessary decoration (Tufte, 1983).
- Sort bars in a meaningful order, often largest to smallest.
- Use colour sparingly to highlight what matters.
H: Honest and accessible charts
- Start the value axis of a **bar chart at zero**, because bar length represents the value.
- Use consistent scales when comparing charts side by side.
- Do not rely on **colour alone**; use labels or patterns so colour-blind readers can follow.
- Ensure enough **contrast** and readable text sizes.
- Provide a short text summary or alt text for readers who cannot see the chart.
X: Redesigning a cluttered chart
> A 3D pie chart shows staff in nine departments with similar-sized slices and a colour legend.
> Readers cannot tell which department is largest.
> It is redrawn as a horizontal bar chart sorted from largest to smallest, with values labelled on each bar.
> The title now reads "Operations has the most staff, followed by Sales".
K: Choose bar charts for comparison, line charts for time, scatter plots for relationships and tables for exact values; clear titles, labels and minimal clutter aid understanding, while zero-based bar axes, consistent scales and not relying on colour keep charts honest and accessible.
!: Using a pie chart for many similar categories. People judge angles poorly, so use a sorted bar chart instead.
EV: established | People judge position along a common scale more accurately than angle or area.
T: Chart junk | Decoration in a chart that does not convey information
T: Scatter plot | A chart showing the relationship between two numeric variables
T: Histogram | A chart showing how values of one variable are distributed
SUM: Pick the chart for the question.
SUM: Title the message.
SUM: Start bars at zero.
SRC: Cleveland W. S. and McGill R., Graphical perception: theory, experimentation, and application to the development of graphical methods, Journal of the American Statistical Association 79(387), 531-554 | primary | 1984
SRC: Tufte E. R., The Visual Display of Quantitative Information, Graphics Press | standard | 1983
SRC: Government Analysis Function, Data visualisation: charts | guidance | 2023 | https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/
Q: Which chart type best shows change over time? | A line chart.
Q: Why should a bar chart's value axis start at zero? | Because bar length represents the value, so a cut axis exaggerates differences.
M1#professional-u07-04-q1@1: Which chart is best for showing the relationship between advertising spend and sales across 50 shops? | Scatter plot | Pie chart | Stacked bar chart | Histogram | A scatter plot shows how two numeric variables relate.
MATCH1#professional-u07-04-q2@2: Match each purpose to the most suitable chart. | Monthly website visits over two years = Line chart ; Sales by region this quarter = Bar chart ; Distribution of employee ages = Histogram ; Exact figures for twelve budget lines = Table | The chart type should follow the question the reader needs answered.
M2#professional-u07-04-q3@2: Which chart title is most helpful? | Complaints fell after the new process | Chart 3 | Complaints data 2025 | Figure showing complaints | A title stating the message tells readers what to see.
M3#professional-u07-04-q4@3: A chart uses red and green lines with no labels to compare two teams. What is the main problem? | Colour-blind readers may not tell the lines apart | The lines should be shown in three dimensions | Line charts should never compare two teams | Red and green take too long to print out | Relying on colour alone excludes some readers; add direct labels.
SA2#professional-u07-04-q5@2,3: A colleague's bar chart comparing two offices starts its axis at 95, making a small difference look huge. Explain the problem and how to fix it. | In a bar chart, readers judge values by bar length, so starting the axis at 95 instead of zero exaggerates a small difference and misleads them. The chart should be redrawn with the value axis starting at zero, so bar lengths are proportional to the values. If the small difference is what matters, a dot chart or a table with exact values, plus a clear title stating the size of the difference, would be more honest. | Bar length judged ; Truncated axis exaggerates ; Start at zero ; Alternative honest display

## Telling a story with data
LV: Intermediate · Application
S: Data persuades when it is part of a clear message. This lesson explains how to identify your key message, structure a data story and tailor it to your audience.
O: Identify the key message and audience for a data presentation
O: Structure a data story from context to recommendation
O: Evaluate whether a data story is clear and balanced
H: Start with the message
P: Cole Nussbaumer Knaflic (2015) argues that before making any chart you should know your **audience**, what you want them to **know or do**, and your **big idea**: one sentence that states your point and why it matters. Analysts often present everything they found, an approach sometimes called **"exploratory"** analysis, when the audience needs **"explanatory"** analysis: the few findings that support a decision. Barbara Minto's **pyramid principle** recommends starting with the main conclusion and then giving the supporting arguments and evidence.
H: Structuring a data story
- **Context**: what is the situation and why are we looking at this?
- **Finding**: what does the data show? Use one clear chart per point.
- **Insight**: why is it happening and what does it mean?
- **Recommendation**: what should the audience do, and what will it cost or gain?
- Keep supporting detail in an appendix for those who want it.
H: Making it work for the audience
- Senior leaders often want the conclusion first and the detail on request.
- Use plain language and avoid jargon and unexplained acronyms.
- **Focus attention** with colour or annotation on the key data point.
- Be honest about **uncertainty** and limitations, such as small samples.
- Use a concrete example or case to bring numbers to life.
X: Presenting staff survey results to directors
> Big idea: "Workload is the main reason staff are leaving; a pilot of protected focus time could reduce turnover."
> Context: turnover rose from 12% to 18% this year. Finding: a bar chart shows workload is the top reason in exit interviews.
> Insight: teams with the most meetings report the highest workload.
> Recommendation: a three-month pilot in two teams, with turnover and survey scores measured; full figures are in the appendix.
K: Effective data stories start from the audience and a one-sentence big idea, move from context to finding, insight and recommendation, highlight what matters and are honest about uncertainty, with detail kept in reserve.
!: Showing every chart from your analysis. The audience needs the few findings that support the message, not the whole exploration.
EV: established | Presenting the conclusion first, then supporting evidence, helps busy readers grasp a message quickly.
T: Big idea | A one-sentence statement of your key point and why it matters
T: Explanatory analysis | Presenting selected findings to communicate a message
T: Pyramid principle | Minto's structure of leading with the conclusion, then supporting points
SUM: Know audience and big idea.
SUM: Context, finding, insight, recommendation.
SUM: Be honest about uncertainty.
SRC: Knaflic C. N., Storytelling with Data: A Data Visualization Guide for Business Professionals, Wiley | secondary | 2015
SRC: Minto B., The Pyramid Principle: Logic in Writing and Thinking, 3rd edition, Pearson | secondary | 2009
Q: What is the big idea in a data story? | A one-sentence statement of your key point and why it matters.
Q: What is the difference between exploratory and explanatory analysis? | Exploratory finds patterns; explanatory communicates selected findings to an audience.
M1#professional-u07-05-q1@1: According to the pyramid principle, where should the main conclusion go? | At the start | In the appendix | At the very end | It should be left out | Minto recommends leading with the conclusion.
SEQ2#professional-u07-05-q2@2: Put the parts of a data story in a logical order. | Context ; Finding ; Insight ; Recommendation | The story moves from why we are looking to what we found, what it means and what to do.
M2#professional-u07-05-q3@2: An analyst has 25 charts for a 10-minute board slot. What should she do? | Choose the few charts that support her message | Show all 25 charts quickly in turn | Squeeze all 25 charts onto two slides | Drop the charts and read out the figures | Explanatory analysis selects findings that serve the decision.
M3#professional-u07-05-q4@3: A data story recommends a major investment based on a survey of eight customers. How should it be improved? | State the small sample and suggest a larger test first | Remove any mention of the sample size | Present the eight replies as all customers' views | Add more colour to make the finding look stronger | Honesty about uncertainty is part of a credible data story.
SA2#professional-u07-05-q5@1,2: Plan how you would present a finding that customer wait times have doubled, for a meeting with senior managers. | I would first decide my big idea, for example "Wait times have doubled since staffing changed, and restoring two posts would bring them back within target." I would open with that conclusion, then give context on the target and the period. One line chart would show the rise over time, highlighting the point when staffing changed. I would then explain the likely cause, recommend action with its cost, and note any limits in the data, keeping detail in an appendix. | Big idea first ; Context ; One focused chart ; Recommendation and limits

## Spotting misleading statistics
LV: Intermediate · Evaluation
S: Statistics can mislead by accident or by design. This lesson explains common traps, such as confusing correlation with causation and relative with absolute risk, and questions to ask of any claim.
O: Identify common ways statistics mislead
O: Distinguish relative from absolute changes in risk
O: Evaluate statistical claims using a set of critical questions
H: Common traps
P: **Correlation is not causation**: two things rising together may both be caused by a third factor, a **confounder**, or may be coincidence. **Relative risk** can sound dramatic when **absolute risk** is small: if a risk rises from 1 in 1,000 to 2 in 1,000, it has doubled (a 100% relative increase) but the absolute increase is only 1 in 1,000. David Spiegelhalter (2019) recommends giving absolute risks, ideally as **expected frequencies** such as "1 extra case per 1,000 people". Other traps include **small samples**, **cherry-picked** time periods and **survivorship bias**, where only successes are visible.
H: Visual and presentational tricks
- **Truncated axes** that exaggerate small differences.
- Changing scales or time periods between charts to suggest a trend.
- Using an **average** that hides wide variation.
- Reporting **percentages without the base numbers**.
- **Selective reporting**: only the favourable results are shown.
H: Questions to ask of any claim
- Who produced it, and do they have an interest in the result?
- What exactly was measured, and how many cases were there?
- Compared with what? Is there a fair **baseline** or control group?
- Is the change **absolute or relative**?
- Could something else explain it?
- The UK Statistics Authority's **Code of Practice for Statistics** sets standards of trustworthiness, quality and value for official statistics.
X: A misleading sales claim
> A supplier says: "Teams using our software saw productivity rise 50%."
> Questions reveal that only five teams were studied, chosen by the supplier.
> Productivity rose from 10 to 15 tasks per day, but over the same months the firm also hired extra staff.
> The claim is a small, selected sample with a likely confounder, so it does not show that the software caused the rise.
K: Statistics mislead through confusing correlation with causation, relative with absolute change, small or selected samples, survivorship bias and visual tricks; asking who produced a claim, what was measured, compared with what and whether something else explains it exposes most problems.
!: Being impressed by a large relative change. Always ask for the absolute numbers: doubling a tiny risk is still a tiny risk.
EV: established | Presenting absolute risks and expected frequencies helps people understand risk better than relative risks alone.
T: Confounder | A third factor that affects both variables and creates a misleading association
T: Absolute risk | The actual chance of an event in a group, such as 2 in 1,000
T: Survivorship bias | Drawing conclusions from only the cases that survived or succeeded
SUM: Correlation is not causation.
SUM: Ask for absolute numbers.
SUM: Ask compared with what.
SRC: Spiegelhalter D., The Art of Statistics: Learning from Data, Pelican | secondary | 2019
SRC: Harford T., How to Make the World Add Up, Bridge Street Press | secondary | 2020
SRC: UK Statistics Authority, Code of Practice for Statistics | guidance | 2022 | https://code.statisticsauthority.gov.uk/
Q: What is a confounder? | A third factor affecting both variables that creates a misleading association.
Q: If a risk rises from 1 in 1,000 to 2 in 1,000, what is the absolute increase? | 1 in 1,000.
M1#professional-u07-06-q1@1: Ice cream sales and sunburn cases rise together. What is the most likely explanation? | Hot sunny weather causes both | Ice cream causes sunburn | Sunburn causes people to buy ice cream | The link must be pure coincidence | Sunny weather is a confounder affecting both.
NUM3#professional-u07-06-q2@2: A process change raises the error rate from 2 in 1,000 to 3 in 1,000. What is the relative increase as a percentage? | 50 | 0 | % | The rise is 1 in 1,000 on a base of 2 in 1,000, and 1 divided by 2 is 0.5, so 50%.
M2#professional-u07-06-q3@2: A business book studies only firms that became very successful and finds they all took big risks. What bias is most likely? | Survivorship bias | Confirmation bias | Recency bias | Anchoring bias | Failed risk-takers are not in the sample.
M3#professional-u07-06-q4@3: A press release says a new course "halves the risk of failing an exam". Which question matters most? | What were the actual failure rates before and after? | Which celebrity has endorsed the new course? | How long is the press release itself? | What colour is the course logo? | A halved relative risk could be a tiny absolute change.
SA2#professional-u07-06-q5@2,3: Evaluate the claim "Offices with plants have 15% higher productivity, so we should buy plants for every office." | The claim may confuse correlation with causation: offices with plants might differ in other ways, such as newer buildings, better management or different types of work, which are possible confounders. I would ask who produced the figure, how many offices were studied, how productivity was measured and whether there was a fair comparison group. A 15% relative difference also needs the absolute figures. A small controlled trial in some offices would test the effect before spending on all of them. | Correlation not causation ; Possible confounders ; Questions on source, sample and measure ; Test with a trial

## Digital collaboration tools
LV: Introductory · Application
S: Teams now share files, chat and meet through digital platforms. This lesson explains synchronous and asynchronous collaboration, how to use shared tools well and how to avoid collaboration overload.
O: Distinguish synchronous from asynchronous collaboration
O: Use shared documents, channels and permissions effectively
O: Judge how to reduce collaboration overload in a team
H: Synchronous and asynchronous work
P: **Synchronous** collaboration happens at the same time, such as video calls and live chat. **Asynchronous** collaboration lets people contribute at different times, such as comments on a shared document, recorded updates or a discussion thread. Asynchronous methods suit people in different time zones or working patterns and protect focus, while synchronous methods suit complex, sensitive or urgent discussions. Platforms such as **Microsoft Teams**, **Slack**, **Google Workspace** and **SharePoint** combine chat, meetings, file storage and **co-authoring**, where several people edit one document at the same time.
H: Using shared tools well
- Keep one **shared master** copy in a team space rather than emailing attachments.
- Use **comments and mentions** to ask questions or assign actions in a document.
- Organise channels by **topic or project** and give them clear names.
- Set **permissions** carefully: view, comment or edit, and only for those who need access.
- Use **version history** to see changes and restore earlier versions.
H: Collaboration overload
- Cross, Rebele and Grant (2016) found that collaborative demands on managers' time had risen by 50% or more over two decades.
- A small number of people often handle a large share of requests, risking burnout.
- Agree which channel to use for what, and expected response times.
- Prefer a short written update to a meeting when no discussion is needed.
- Turn off non-essential notifications and leave channels you no longer need.
X: Moving a project from email to a shared space
> A five-person project team is swapping attachments, and three versions of the plan exist.
> They create a project channel with a single shared plan document, editable by the team and view-only for stakeholders.
> Questions are raised as comments with mentions, and decisions are logged in a pinned post.
> Weekly status moves from a meeting to a short written update; the team meets only to resolve issues.
K: Synchronous tools suit complex or urgent discussion and asynchronous tools suit flexible, focused work; one shared master document, clear channels, careful permissions and version history make collaboration efficient, while agreed norms reduce collaboration overload.
!: Emailing attachments back and forth. This creates conflicting versions; share a link to one master document instead.
EV: established | Collaborative work demands on employees' time have grown substantially, and are often unevenly spread across a few people.
T: Asynchronous collaboration | Working together without needing to be online at the same time
T: Co-authoring | Several people editing one document at the same time
T: Collaboration overload | Excessive demands from meetings, messages and requests for help
SUM: Choose synchronous or asynchronous deliberately.
SUM: Share one master copy.
SUM: Agree channel norms.
SRC: Cross R., Rebele R. and Grant A., Collaborative overload, Harvard Business Review 94(1), 74-79 | secondary | 2016
SRC: Leonardi P. and Neeley T., The Digital Mindset, Harvard Business Review Press | secondary | 2022
Q: Give an example of asynchronous collaboration. | Commenting on a shared document or posting in a discussion thread.
Q: Why share a link rather than an attachment? | So everyone works on one master version instead of conflicting copies.
M1#professional-u07-07-q1@1: Which is an example of synchronous collaboration? | A live video call to agree a plan | Leaving comments on a shared draft | Posting a recorded weekly update | Replying in a discussion thread later | Synchronous work happens at the same time.
M2#professional-u07-07-q2@2: Who should have edit access to a team's budget spreadsheet? | Only those who need to change it | Everyone in the whole organisation | Anyone who has the link to it | Nobody, so it stays unchanged | Permissions should follow need, with others given view access.
TF2#professional-u07-07-q3@2: Version history lets you see who changed a shared document and restore an earlier version. | true | Most collaboration platforms record changes and allow earlier versions to be restored.
M3#professional-u07-07-q4@3: A team's weekly one-hour status meeting is mostly people reading out updates. What change is best? | Replace it with written updates and meet only on issues | Make the meeting two hours so everyone can talk | Hold the same meeting twice in each week | Stop sharing any updates within the team | Asynchronous updates save time; meetings are kept for discussion.
SA2#professional-u07-07-q5@2,3: Recommend how a hybrid team could use digital collaboration tools to work more effectively. | The team should keep one shared master copy of each document in a team space and share links, using comments and mentions to raise questions and assign actions. They should organise channels by project, set permissions so only those who need to edit can, and rely on version history. They should agree norms on which channel to use for what and expected response times. Routine updates can be asynchronous, with meetings kept for complex or sensitive discussions, reducing collaboration overload. | Shared master and links ; Comments, channels and permissions ; Channel norms ; Asynchronous updates

## Information management and version control
LV: Introductory · Application
S: Finding the right, current file wastes a surprising amount of working time. This lesson explains how to name, store and version documents and why records must be kept and disposed of properly.
O: Apply consistent file naming and storage conventions
O: Use version control to track drafts and approved documents
O: Explain why records retention and disposal matter
H: Why information management matters
P: **Information management** is the way an organisation creates, stores, finds, shares, keeps and disposes of its information. Poor practice means duplicated effort, decisions made on out-of-date documents and legal risk if records cannot be found or are kept too long. A **record** is information created or received as evidence of business activity, such as a signed contract or the minutes of a decision. The international standard **ISO 15489-1:2016** sets out principles for records management, and The National Archives publishes guidance for UK public bodies. The aim is a **single source of truth**: one authoritative version that everyone uses.
H: Naming and storing files
- Use a consistent **naming convention**, such as date, subject, document type and version.
- Write dates as **YYYY-MM-DD** (for example 2026-03-14) so files sort in date order.
- Avoid vague names such as "final", "new" or "Jo's copy".
- Store work files in **shared team spaces**, not personal drives or email.
- Use a simple, agreed **folder structure** and keep it shallow.
H: Version control and retention
- Number drafts **v0.1, v0.2** and the first approved version **v1.0**; later changes become v1.1 or v2.0.
- Keep a short **version table** recording date, author and changes.
- Use the platform's **version history** where available rather than saving many copies.
- A **retention schedule** sets how long each type of record is kept and what happens to it next.
- Dispose of records securely at the end of their retention period, as data protection law requires personal data not to be kept longer than needed.
X: Sorting out a policy folder
> A shared folder holds "Policy final.docx", "Policy final v2.docx" and "Policy FINAL Jo edits.docx".
> The team renames the approved document "2026-03-14 Expenses policy v1.0" and moves older drafts to an archive folder.
> A version table on the first page lists each change, date and author.
> The retention schedule says superseded policies are kept for six years, so a review date is added.
K: Good information management gives one authoritative version of each document through consistent names, ISO-style dates, shared storage and version numbering, while retention schedules make sure records are kept as long as needed and securely disposed of afterwards.
!: Calling a file "final". Documents are often revised again; use version numbers and dates instead.
EV: established | Records management standards such as ISO 15489 call for records to be identifiable, retrievable and kept according to defined retention rules.
T: Record | Information created or received as evidence of business activity
T: Retention schedule | A list of how long each type of record is kept and what then happens to it
T: Single source of truth | One authoritative version of information that everyone uses
SUM: Name files consistently.
SUM: Number versions, not "final".
SUM: Keep records only as long as needed.
SRC: International Organization for Standardization, ISO 15489-1:2016 Information and documentation: Records management, Part 1: Concepts and principles | standard | 2016
SRC: The National Archives, Information management guidance | guidance | 2024 | https://www.nationalarchives.gov.uk/information-management/
Q: Why write dates as YYYY-MM-DD in file names? | So files sort correctly in date order.
Q: What version number usually marks the first approved version? | v1.0.
M1#professional-u07-08-q1@1: Which file name follows good practice? | 2026-03-14 Expenses policy v1.0 | Expenses policy FINAL final | New expenses thing Jo | Copy of policy (2) | It gives date, subject and version clearly.
SEQ1#professional-u07-08-q2@2: Put these versions of a document in order from earliest to latest. | v0.1 ; v0.2 ; v1.0 ; v1.1 | Drafts come before the first approved version, then minor revisions follow.
M2#professional-u07-08-q3@2: Where should a team keep the working copy of a shared project plan? | In a shared team space as one master | In each member's personal drive | As an attachment in everyone's inbox | On a memory stick kept by the manager | Shared storage gives everyone one current version.
M3#professional-u07-08-q4@3: A team keeps every file forever "just in case", including old CVs from rejected applicants. What is the main risk? | Breaching data protection by keeping personal data too long | Running out of folder names for new files | Making the shared folders look too empty | Losing the ability to create new files | Personal data must not be kept longer than necessary.
SA2#professional-u07-08-q5@1,3: Explain how a team could make sure everyone works from the current version of key documents. | The team should store documents in one shared space rather than personal drives or email, and share links instead of attachments. They should agree a naming convention with ISO-style dates and version numbers, such as v0.1 for drafts and v1.0 for approved versions, avoiding words like "final". A version table or the platform's version history records changes. Superseded versions can be moved to an archive so only the current one is in the working folder. | Shared storage and links ; Naming convention ; Version numbers and history ; Archive old versions

## Cyber security at work
LV: Introductory · Foundation
S: Most cyber attacks on organisations exploit everyday behaviour. This lesson explains common threats such as phishing and the simple habits recommended by the National Cyber Security Centre.
O: Recognise common cyber threats, especially phishing
O: Apply recommended habits for passwords, accounts and devices
O: Explain how and why to report a suspected incident
H: Common threats
P: The UK government's annual **Cyber Security Breaches Survey** consistently finds that **phishing**, fraudulent messages that try to trick people into clicking links, opening attachments or giving away details, is the most common type of attack businesses identify. Other threats include **malware** such as **ransomware**, which encrypts files and demands payment; **business email compromise**, where criminals pose as a manager or supplier to request payments; and **impersonation** by phone or text. Attackers rely on **urgency**, **authority** and **curiosity** to make people act before they think.
H: Spotting phishing
- Unexpected messages asking you to act urgently, such as "your account will be closed today".
- Sender addresses that do not match the organisation, or slightly misspelt domains.
- Requests to change bank details or make an unusual payment.
- Links whose real address, shown by hovering, differs from the text.
- Generic greetings and requests for passwords, which genuine organisations do not ask for.
H: Habits that protect you
- Use a strong, separate password for work accounts; the NCSC suggests **three random words**.
- Turn on **two-step verification** (multi-factor authentication) wherever possible.
- Install **updates** promptly on devices and apps.
- Lock your screen when you leave your desk and keep work data on approved systems.
- **Report** suspicious messages to your IT or security team; in the UK, suspicious emails can be forwarded to report@phishing.gov.uk and texts to 7726.
X: A request to change supplier bank details
> Finance receives an email, apparently from a regular supplier, asking for future payments to go to a new account.
> The address looks right but the domain is misspelt by one letter, and the message stresses urgency.
> The officer phones the supplier on the number already on file, not the one in the email; the supplier knows nothing about it.
> She reports it to IT, who block the domain and warn colleagues.
K: Phishing is the most common attack on organisations, alongside ransomware and payment fraud; checking senders and links, verifying payment changes by a known route, strong passwords, two-step verification, prompt updates and quick reporting protect people and organisations.
!: Staying quiet after clicking a suspicious link for fear of blame. Report it immediately; fast reporting limits the damage.
EV: established | Phishing is the most frequently identified type of cyber attack in UK organisations according to the government's Cyber Security Breaches Survey.
T: Phishing | Fraudulent messages designed to trick people into revealing information or installing malware
T: Ransomware | Malware that encrypts files and demands payment for their release
T: Two-step verification | A second check, such as a code on your phone, in addition to a password
SUM: Phishing is the commonest attack.
SUM: Use strong passwords and two-step verification.
SUM: Report quickly, without fear.
SRC: National Cyber Security Centre, Cyber security training for staff and small business guidance | guidance | 2024 | https://www.ncsc.gov.uk/collection/small-business-guide
SRC: Department for Science, Innovation and Technology, Cyber Security Breaches Survey | data | 2025 | https://www.gov.uk/government/collections/cyber-security-breaches-survey
Q: What password approach does the NCSC suggest? | Three random words.
Q: Where can suspicious emails be reported in the UK? | Forward them to report@phishing.gov.uk.
M1#professional-u07-09-q1@1: Which is the most common type of cyber attack identified by UK businesses? | Phishing | Ransomware | Hacking of physical locks | Denial of service | The Cyber Security Breaches Survey consistently finds phishing most common.
M2#professional-u07-09-q2@2: An email from your "chief executive" asks you to buy gift cards urgently and keep it secret. What should you do? | Check by a known route and report it | Buy the cards quickly as asked | Reply to the email for more details | Forward it to all your colleagues | Urgency and secrecy are classic signs of impersonation fraud.
TF1#professional-u07-09-q3@2: Turning on two-step verification makes it harder for criminals to use a stolen password. | true | A second factor, such as a phone code, is needed as well as the password.
M3#professional-u07-09-q4@3: An employee realises she entered her password on a fake login page an hour ago. What is the best action? | Report it to IT and change the password now | Wait to see whether anything goes wrong | Delete the email and say nothing to anyone | Log out and carry on with the day as usual | Quick reporting lets IT contain the incident.
SA2#professional-u07-09-q5@1,2: Describe three signs of a phishing email and three habits that reduce cyber risk at work. | Signs include an unexpected message that creates urgency, a sender address or domain that does not quite match the real organisation, and a link whose real address differs from its text or a request for passwords or payment changes. Protective habits include using a strong, separate password such as three random words, turning on two-step verification, and installing updates promptly. Suspicious messages should be reported to IT. | Urgency ; Mismatched sender or link ; Strong passwords and two-step verification ; Updates and reporting

## Data protection: UK GDPR basics
LV: Intermediate · Foundation
S: Almost every employee handles personal data. This lesson explains the UK GDPR's principles, lawful bases, individuals' rights and what to do if a breach occurs.
O: Explain what personal data is and the data protection principles
O: Identify the lawful bases for processing personal data
O: Describe individuals' rights and the steps after a data breach
H: Personal data and the principles
P: In the UK, data protection is governed by the **UK GDPR** and the **Data Protection Act 2018**, regulated by the **Information Commissioner's Office (ICO)**; the Data (Use and Access) Act 2025 makes some changes that are being phased in. **Personal data** is any information relating to an identified or identifiable living person, such as a name, email address, employee number or location data. **Special category data**, such as health, ethnicity, religion and sexual orientation, needs extra protection. Article 5 sets out seven **principles**: **lawfulness, fairness and transparency**; **purpose limitation**; **data minimisation**; **accuracy**; **storage limitation**; **integrity and confidentiality** (security); and **accountability**.
H: Lawful bases
- Organisations need a **lawful basis** for each use of personal data.
- **Consent**: the person has clearly agreed.
- **Contract**: needed to perform a contract with the person, such as paying an employee.
- **Legal obligation**: needed to comply with the law, such as reporting to HMRC.
- **Vital interests**: needed to protect someone's life.
- **Public task** and **legitimate interests**: for official functions, or for reasonable purposes balanced against the person's rights.
H: Rights and breaches
- Individuals have rights including to be **informed**, of **access**, to **rectification** and to **erasure** in some cases.
- A **subject access request** normally must be answered within **one month**.
- A **personal data breach** includes loss, theft or sending data to the wrong person.
- Report breaches internally at once; organisations must tell the ICO within **72 hours** of becoming aware, unless the breach is unlikely to pose a risk to people.
- Practical habits: share only what is needed, check recipients, lock screens and use approved systems.
X: A spreadsheet sent to the wrong person
> An HR adviser emails a spreadsheet of staff sickness records to an external contact with a similar name.
> This is a personal data breach involving special category (health) data.
> She tells the data protection officer immediately; they ask the recipient to delete it and assess the risk.
> Because health data is involved, the organisation reports it to the ICO within 72 hours and reviews how such files are shared.
K: The UK GDPR protects personal data through seven principles and requires a lawful basis for each use; individuals have rights such as access within one month, and breaches must be reported internally at once and to the ICO within 72 hours where there is a risk to people.
!: Thinking consent is always required. Consent is only one of six lawful bases; much workplace processing relies on contract or legal obligation.
EV: established | Under the UK GDPR, notifiable personal data breaches must be reported to the ICO within 72 hours of becoming aware of them.
T: Personal data | Information relating to an identified or identifiable living person
T: Special category data | Sensitive personal data, such as health or ethnicity, needing extra protection
T: Subject access request | A request by a person for a copy of their personal data
SUM: Seven principles guide data use.
SUM: Six lawful bases, not just consent.
SUM: Report breaches straight away.
SRC: Information Commissioner's Office, Guide to the UK GDPR | guidance | 2024 | https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/
SRC: Data Protection Act 2018, c. 12, UK Parliament | guidance | 2018 | https://www.legislation.gov.uk/ukpga/2018/12/contents
Q: Who regulates data protection in the UK? | The Information Commissioner's Office (ICO).
Q: How long does an organisation normally have to answer a subject access request? | One month.
M1#professional-u07-10-q1@1: Which of these is special category data? | Details of an employee's health | An employee's work email address | The name of a client company | An employee's job title | Health data is special category and needs extra protection.
MATCH2#professional-u07-10-q2@2: Match each principle to the practice it requires. | Data minimisation = Collect only what you need ; Storage limitation = Keep it no longer than necessary ; Accuracy = Keep it correct and up to date ; Integrity and confidentiality = Keep it secure | Each principle sets a different standard for handling personal data.
M2#professional-u07-10-q3@2: Which lawful basis would an employer usually rely on to pay staff salaries? | Contract | Consent | Vital interests | Public task | Paying staff is necessary to perform the employment contract.
M3#professional-u07-10-q4@3: A manager wants to email the whole team a list of everyone's home addresses for a party. What is the best advice? | Do not share it; use a method that needs less personal data | Send it, as colleagues already know each other well | Send it but mark the email as private and urgent | Post it on the office noticeboard instead | Data minimisation and purpose limitation mean sharing only what is needed.
SA2#professional-u07-10-q5@2,3: Explain what an employee should do if they realise they have sent personal data to the wrong person. | They should report it immediately to their manager or data protection officer, without waiting, because the organisation may have only 72 hours to notify the ICO if there is a risk to people. They should give details of what data was sent, to whom and when. The organisation may ask the recipient to delete it and will assess the risk, especially if special category data is involved. The incident should then be reviewed to prevent a repeat, such as checking recipients before sending. | Report immediately ; 72-hour ICO deadline ; Contain and assess risk ; Learn and prevent

## Artificial intelligence at work
LV: Intermediate · Evaluation
S: Generative AI tools are changing how many jobs are done. This lesson explains what these tools do well and badly, the research on their effects and how to use them responsibly at work.
O: Explain what generative AI is and its main limitations
O: Describe research evidence on AI's effect on work performance
O: Evaluate when and how to use AI tools responsibly
H: What generative AI is
P: **Generative AI** produces new text, images, code or audio in response to prompts. **Large language models (LLMs)**, such as those behind chat assistants, are trained on vast amounts of text to predict likely next words. They can draft, summarise, translate and brainstorm quickly, but they can also produce **hallucinations**: confident, plausible statements that are false, including invented references. They may reflect **bias** in their training data, and information you type in may be stored or used by the provider. The UK Government's **AI Playbook** (2025) stresses knowing the limits of AI, keeping **meaningful human control**, and using it lawfully, securely and ethically.
H: What the research shows
- Brynjolfsson, Li and Raymond (2025) found an AI assistant raised customer support agents' productivity by about 14% on average, with the largest gains for less experienced staff.
- Dell'Acqua and colleagues (2023) found consultants using GPT-4 did better on tasks within the AI's capabilities, but were less likely to be correct on a task outside them: a **jagged frontier**.
- AI tends to help most with drafting, summarising and routine writing.
- Over-reliance can lead people to accept wrong answers without checking.
- Effects vary by task, skill level and how the tool is used.
H: Using AI responsibly
- Follow your organisation's **AI policy** and use only approved tools.
- Do not enter **confidential** or personal data into tools that are not approved for it.
- **Check facts**, figures and references against reliable sources.
- Keep a human accountable for decisions, especially those affecting people.
- Be **transparent** when AI has contributed substantially to your work.
X: Drafting a policy summary with AI
> A policy officer uses her organisation's approved AI assistant to summarise a 40-page consultation response.
> The summary is clear but states that the response "recommends a 10% budget cut".
> She checks the source and finds no such recommendation; it was a hallucination.
> She corrects the summary, notes that AI was used for the first draft, and keeps the final judgement her own.
K: Generative AI drafts and summarises quickly but can hallucinate, reflect bias and expose data; research shows real productivity gains on suitable tasks and errors outside them, so use approved tools, protect confidential data, check outputs and keep humans accountable.
!: Trusting AI output because it sounds confident. Fluency is not accuracy; check facts and references.
EV: established | Large language models can generate fluent but false statements, including fabricated references.
EV: contested | The overall long-term effect of generative AI on productivity and jobs is uncertain, with early studies showing gains on some tasks and errors on others.
T: Generative AI | AI that creates new content, such as text or images, from prompts
T: Hallucination | A confident but false output from an AI model
T: Jagged frontier | The uneven boundary between tasks AI does well and tasks it does poorly
SUM: AI drafts fast but can be wrong.
SUM: Gains depend on the task.
SUM: Check outputs and protect data.
SRC: Brynjolfsson E., Li D. and Raymond L., Generative AI at work, Quarterly Journal of Economics 140(2), 889-942 | primary | 2025
SRC: Dell'Acqua F. and colleagues, Navigating the jagged technological frontier: field experimental evidence of the effects of AI on knowledge worker productivity and quality, Harvard Business School Working Paper 24-013 | primary | 2023
SRC: Department for Science, Innovation and Technology, AI Playbook for the UK Government | guidance | 2025 | https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government
Q: What is an AI hallucination? | A confident but false output, such as an invented fact or reference.
Q: Which workers gained most from the AI assistant in Brynjolfsson and colleagues' study? | Less experienced workers.
M1#professional-u07-11-q1@1: Which task are generative AI tools generally well suited to? | Producing a first draft of a routine letter | Making final decisions on dismissals | Guaranteeing that references are accurate | Replacing all checking of figures | AI helps with drafting but needs human review.
M2#professional-u07-11-q2@2: What did Dell'Acqua and colleagues find for a task outside the AI's capabilities? | Consultants using AI were less likely to be correct | Consultants using AI were always correct | AI made no difference to any task at all | Consultants refused to use AI for it | The jagged frontier means AI can mislead on tasks it handles poorly.
TF2#professional-u07-11-q3@2: It is safe to paste confidential client data into any free public AI tool as long as you delete the chat afterwards. | false | Data entered may be stored or used by the provider; use only approved tools for confidential data.
M3#professional-u07-11-q4@3: A manager plans to use an AI tool to rank job applicants and reject the lowest scores automatically. What is the strongest concern? | Bias and lack of human accountability in decisions about people | The tool might finish the ranking too quickly | Applicants might prefer a shorter process | The tool's interface may be hard to use | Decisions about people need human control and checks for bias.
SA2#professional-u07-11-q5@2,3: Evaluate the benefits and risks of using a generative AI tool to write reports at work. | Benefits include faster first drafts, summaries and editing, and research shows productivity gains on suitable tasks, especially for less experienced staff. Risks include hallucinated facts and references, bias, over-reliance and the exposure of confidential data entered into unapproved tools. On tasks outside the AI's strengths, users can be led into errors. It should be used with approved tools, checked carefully against sources, with a human accountable for the final report and transparency about its use. | Productivity benefits ; Hallucination and bias ; Data confidentiality ; Checking and human accountability

## Digital accessibility
LV: Intermediate · Application
S: Digital content must work for everyone, including disabled people. This lesson explains the legal context, the WCAG principles and practical steps to make documents, emails and presentations accessible.
O: Explain the legal and ethical case for digital accessibility in the UK
O: Describe the four WCAG principles
O: Apply practical techniques to make everyday documents accessible
H: Why accessibility matters
P: **Digital accessibility** means making websites, documents and tools usable by as many people as possible, including people with visual, hearing, motor or cognitive impairments. The **Equality Act 2010** requires employers and service providers to make **reasonable adjustments** for disabled people, and public sector bodies must also meet the **Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018**. The main international standard is the **Web Content Accessibility Guidelines (WCAG)**, currently version 2.2 (2023), with level **AA** the usual target. Accessible content also helps everyone, for example people reading on a phone or in bright sunlight.
H: The WCAG principles (POUR)
- **Perceivable**: information can be seen or heard, for example images have **alt text** and videos have **captions**.
- **Operable**: everything works with a keyboard and users have enough time.
- **Understandable**: text is clear and navigation is predictable.
- **Robust**: content works with assistive technologies such as **screen readers**.
- WCAG AA requires a **contrast ratio** of at least 4.5 to 1 for normal text.
H: Everyday accessible practice
- Use built-in **heading styles** rather than bold text, so screen reader users can navigate.
- Write **descriptive links** ("Download the 2026 budget report") not "click here".
- Add **alt text** to meaningful images and mark decorative ones as decorative.
- Do not use **colour alone** to convey meaning.
- Use clear, plain language and readable sans serif fonts; run the built-in **accessibility checker** in Office tools.
X: Making a team newsletter accessible
> The newsletter uses bold text as headings, has a chart with no description and says "click here" for links.
> The editor applies Heading 1 and Heading 2 styles and adds alt text: "Bar chart: volunteer hours rose from 200 to 340 this year".
> Links are renamed to describe their destination, and pale grey text is darkened to meet contrast guidance.
> The Office accessibility checker now shows no errors.
K: UK law requires reasonable adjustments and public bodies must meet accessibility regulations; WCAG's perceivable, operable, understandable and robust principles guide design, and headings, alt text, descriptive links, good contrast and not relying on colour make everyday documents accessible.
!: Treating accessibility as a final check for specialists. Build it in as you write, using headings, alt text and plain language from the start.
EV: established | WCAG is the internationally recognised standard for web accessibility, with level AA commonly used as the legal benchmark in the UK public sector.
T: Alt text | A short text description of an image read by screen readers
T: Screen reader | Software that reads on-screen content aloud or in braille
T: WCAG | The Web Content Accessibility Guidelines, the main standard for digital accessibility
SUM: Accessibility is a legal duty.
SUM: POUR: perceivable, operable, understandable, robust.
SUM: Use headings, alt text and good contrast.
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2 | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: GOV.UK, Understanding accessibility requirements for public sector bodies | guidance | 2024 | https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps
Q: What are the four WCAG principles? | Perceivable, operable, understandable and robust.
Q: What minimum contrast ratio does WCAG AA require for normal text? | 4.5 to 1.
M1#professional-u07-12-q1@1: What is alt text used for? | Describing images for screen reader users | Adding hidden comments for editors | Changing the font used in a document | Translating text into other languages | Alt text gives a text alternative to images.
M2#professional-u07-12-q2@2: Which link text is most accessible? | Read the 2026 travel policy | Click here | More | Link | Descriptive links tell users where they lead, even out of context.
TF1#professional-u07-12-q3@2: Using built-in heading styles helps screen reader users navigate a document. | true | Screen readers can jump between proper headings, but not between bold text.
M3#professional-u07-12-q4@3: A chart shows targets met in green and missed in red, with no other labels. What is the best fix? | Add text labels or symbols alongside the colours | Use brighter shades of red and green | Remove the chart from the document | Make the chart smaller to save space | Colour alone excludes colour-blind readers.
SA2#professional-u07-12-q5@2,3: Explain how you would make a slide presentation accessible for colleagues, including screen reader users. | I would use the built-in slide layouts and titles so the reading order and structure are clear, and give each slide a unique title. I would add alt text to meaningful images and charts, and avoid using colour alone to show meaning. Text would have good contrast, a readable font size and plain language, and links would be descriptive. I would run the accessibility checker and share the slides in advance, with captions on any video. | Layouts and titles ; Alt text ; Contrast and colour ; Checker and captions

## Your online professional presence
LV: Introductory · Application
S: What people find about you online shapes how colleagues, clients and employers see you. This lesson explains digital footprints, building a professional profile and staying within your employer's social media policy.
O: Explain what a digital footprint is and why it matters professionally
O: Build a clear, credible professional profile
O: Apply good judgement and employer policy when posting online
H: Digital footprints
P: Your **digital footprint** is the trail of information about you online, including posts, comments, photos, profiles and what others share about you. Recruiters and clients often search candidates' names, so your footprint forms part of your **professional reputation**. Erving Goffman's idea of **impression management** (1959) describes how people present themselves differently to different audiences; online, those audiences can mix, a problem researchers call **context collapse**. Van Dijck (2013) noted that platforms such as LinkedIn encourage users to present a single, polished professional identity.
H: Building a professional profile
- Use a clear, recent **photo** and a headline that says what you do.
- Write a short **summary** of your skills, experience and interests, in plain language.
- List achievements with evidence, such as projects delivered or qualifications gained.
- Keep profiles **consistent** with your CV and up to date.
- Share and comment thoughtfully on topics in your field to build credibility.
H: Posting with good judgement
- Follow your employer's **social media policy**, including on confidential information.
- Do not share client, colleague or internal information without permission.
- Make clear when views are your own, but remember you may still be linked to your employer.
- Review **privacy settings** on personal accounts.
- Ask yourself whether you would be comfortable if your manager, a client or a future employer read the post.
X: Reviewing a profile before a job search
> Hannah searches her own name and finds an old public photo album and an out-of-date LinkedIn profile.
> She makes the album private and updates her profile with her current role and a short summary.
> She adds two achievements: "Led a team of four to cut invoice processing time by 30%" and "Gained CIPD Level 5".
> She deletes an old post criticising a former employer, which breached her contract's confidentiality clause.
K: Your digital footprint forms part of your professional reputation; a clear, consistent and evidenced profile builds credibility, and following employer policy, protecting confidential information and checking privacy settings prevent harm.
!: Assuming personal accounts are private and separate from work. Posts can be shared, searched and linked to your employer, so post with care.
EV: established | People manage the impressions they give to different audiences, and online platforms can collapse these audiences together.
T: Digital footprint | The trail of information about a person that exists online
T: Impression management | Presenting yourself in ways that shape how others see you
T: Context collapse | When different audiences see the same online content
SUM: Search yourself.
SUM: Keep a clear, evidenced profile.
SUM: Follow the social media policy.
SRC: Goffman E., The Presentation of Self in Everyday Life, Anchor Books | primary | 1959
SRC: van Dijck J., "You have one identity": performing the self on Facebook and LinkedIn, Media, Culture and Society 35(2), 199-215 | primary | 2013
Q: What is context collapse? | When different audiences, such as friends and employers, see the same online content.
Q: What should you check before posting about work? | Your employer's social media policy and whether information is confidential.
M1#professional-u07-13-q1@1: What is a digital footprint? | The trail of information about you online | The number of devices you own | Your typing speed on a keyboard | A record of your office entry times | It includes your posts, profiles and what others share about you.
M2#professional-u07-13-q2@2: Which profile headline is most effective? | Payroll specialist helping SMEs pay staff accurately | Looking for opportunities | Hard worker | Just me | A clear headline says what you do and for whom.
MATCH2#professional-u07-13-q3@2: Match each action to its main benefit. | Updating your profile summary = Shows current skills ; Checking privacy settings = Limits who sees personal posts ; Following the social media policy = Avoids breaching employer rules ; Adding evidenced achievements = Builds credibility | Each habit strengthens a different part of your online presence.
M3#professional-u07-13-q4@3: A colleague wants to post photos of a new product before its launch to show pride in the team. What is the best advice? | Wait for approval, as it may be confidential before launch | Post them now on personal accounts only | Post them but blur the company logo first | Post them and delete them if anyone objects | Pre-launch information is often confidential under employer policy.
SA2#professional-u07-13-q5@1,3: Explain why a professional should manage their online presence and give three practical steps. | Recruiters, clients and colleagues often search people online, so a digital footprint forms part of professional reputation, and different audiences may see the same content. Practical steps include searching your own name and reviewing privacy settings on personal accounts, keeping a professional profile up to date with a clear headline and evidenced achievements, and following the employer's social media policy, never sharing confidential information. Before posting, consider how a manager or client would see it. | Reputation and searching ; Privacy settings ; Clear evidenced profile ; Employer policy and confidentiality

## Digital wellbeing
LV: Intermediate · Application
S: Constant connection can blur work and home and wear people down. This lesson explains technostress and video-call fatigue, the HSE approach to work-related stress and habits that support healthy digital working.
O: Explain technostress and video-call fatigue
O: Relate digital working to the HSE Management Standards for work-related stress
O: Apply habits and team norms that support digital wellbeing
H: Technostress and video-call fatigue
P: **Technostress** is stress caused by working with digital technology. Tarafdar and colleagues (2007) identified causes including **techno-overload** (more and faster work), **techno-invasion** (work reaching into personal time), **techno-complexity** and **techno-insecurity**, and linked them to role stress and lower productivity. Jeremy Bailenson (2021) proposed that **video-call fatigue** comes from close-up eye contact, seeing your own image constantly, reduced movement and the extra effort of reading non-verbal cues. In the UK, employers must assess the risk of **work-related stress**, and the HSE's **Management Standards** cover demands, control, support, relationships, role and change.
H: Healthy digital habits
- Set clear **start and finish times** and switch off work notifications outside them.
- Take regular **screen breaks** and move away from your desk.
- Use **audio-only** calls or hide self-view when video is not needed.
- Leave gaps between online meetings rather than booking them back to back.
- Notice warning signs such as poor sleep, irritability or always checking messages.
H: What teams and employers can do
- Agree **response-time norms**, such as not expecting replies to evening messages until the next working day.
- Use **scheduled send** so messages arrive in working hours.
- Managers should **model** healthy behaviour, such as not emailing at midnight.
- Review workload and control as part of stress risk assessments.
- Signpost support such as an employee assistance programme; anyone in crisis should contact their GP, call NHS 111, or call 999 in an emergency.
X: Rebalancing a hybrid team's habits
> A team survey shows staff feel they must answer messages at all hours and spend six hours a day on video.
> The manager agrees norms: no expectation of replies outside 8am to 6pm, and scheduled send for late messages.
> Meetings are cut to 25 or 50 minutes, with camera-optional internal calls.
> Three months later, staff report less pressure to be always on and more time for focused work.
K: Technostress from overload and invasion of personal time and video-call fatigue can harm wellbeing and productivity; the HSE Management Standards frame employers' duty to manage stress, and clear boundaries, breaks, camera-optional calls and team norms modelled by managers support digital wellbeing.
!: Treating digital wellbeing as only an individual's problem. Workload, expectations and team norms set by the organisation matter as much as personal habits.
EV: established | Technostress, including overload and invasion of personal time, is associated with higher role stress and lower productivity.
EV: contested | The precise causes of video-call fatigue are still being researched, and proposed mechanisms such as self-view have mixed support.
T: Technostress | Stress caused by working with digital technology
T: Techno-invasion | Work technology intruding into personal time
T: HSE Management Standards | Six areas of work design that affect work-related stress
SUM: Technology can overload and invade.
SUM: Set boundaries and take breaks.
SUM: Teams set the norms.
SRC: Tarafdar M., Tu Q., Ragu-Nathan B. S. and Ragu-Nathan T. S., The impact of technostress on role stress and productivity, Journal of Management Information Systems 24(1), 301-328 | primary | 2007
SRC: Bailenson J. N., Nonverbal overload: a theoretical argument for the causes of Zoom fatigue, Technology, Mind, and Behavior 2(1) | primary | 2021
SRC: Health and Safety Executive, Management Standards for work-related stress | guidance | 2024 | https://www.hse.gov.uk/stress/standards/
Q: What is techno-invasion? | Work technology intruding into personal time.
Q: Name three of the six HSE Management Standards areas. | Any three of demands, control, support, relationships, role and change.
M1#professional-u07-14-q1@1: Which is one of the six areas in the HSE Management Standards? | Control | Salary | Commuting | Office decor | The six areas are demands, control, support, relationships, role and change.
M2#professional-u07-14-q2@2: Which change is most likely to reduce video-call fatigue? | Making some internal calls audio-only | Booking all calls back to back | Keeping self-view on at all times | Making every call last longer | Reducing constant video and self-view lowers the load Bailenson described.
TF2#professional-u07-14-q3@2: Managers sending emails late at night can create pressure on staff to respond outside working hours. | true | Managers model norms; scheduled send helps avoid this pressure.
M3#professional-u07-14-q4@3: An employee says he cannot sleep because he checks work messages late every night and feels he must reply. What is the best first response from his manager? | Agree clear response-time norms and review his workload | Tell him to simply stop worrying about it | Give him a second phone for work messages | Ask him to reply faster so there is less backlog | Organisational norms and workload drive technostress; if distress is severe, he should also be signposted to his GP.
SA2#professional-u07-14-q5@2,3: Explain how an organisation could reduce technostress among its staff. | Technostress comes from overload, invasion of personal time and complexity, so the organisation should address these causes, not only individual habits. It could agree response-time norms and encourage scheduled send so messages arrive in working hours, with managers modelling this. It could limit back-to-back video meetings and allow audio-only calls. It should include digital demands and control in its stress risk assessment under the HSE Management Standards, provide training on tools, and signpost support such as an employee assistance programme or GP. | Causes of technostress ; Response norms and modelling ; Meeting and video limits ; Risk assessment and support
`;
