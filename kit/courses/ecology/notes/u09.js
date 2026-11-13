// EcoGradify Field Methods and Statistics (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## The scientific method in ecology
LV: Introductory · Foundation
S: Ecologists answer questions about nature by observing, forming hypotheses, testing them and revising their ideas. This lesson describes the scientific method as used in ecology and the particular challenges of studying complex natural systems.
O: Describe the stages of the scientific method in an ecological study
O: Explain why falsifiability and repeatability matter
O: Identify challenges that make ecological research difficult
PRE: Population size and density
H: The cycle of enquiry
- **Observation** raises a question, such as why a plant grows on one side of a valley but not the other.
- A **hypothesis** proposes a testable explanation, such as soil pH limiting its distribution.
- **Predictions** follow: if pH limits it, the plant should be absent where soil is acidic.
- **Data collection** tests the prediction by observation or experiment.
- **Analysis**, often with statistics, decides whether the data support the prediction.
- **Conclusions** lead to new questions, and results are shared through publication and **peer review**.
H: Good science
- Karl Popper argued that scientific hypotheses must be **falsifiable**: it must be possible to show them wrong.
- Methods should be described fully so that others can **repeat** the work.
- Scientists should report all results honestly, including those that do not support their hypothesis.
H: Challenges in ecology
P: Ecological systems involve many interacting species and changing environmental conditions, so it is hard to isolate a single cause. Studies may need to run for years, cover large areas or deal with rare species. Ecologists therefore combine experiments, observational surveys, long-term monitoring and models, and they treat conclusions as provisional and open to revision.
X: From observation to test.
> A student notices more limpets on the lower parts of a rocky shore.
> Hypothesis: limpets are more abundant where they spend less time exposed to air.
> Prediction: limpet density decreases with height above low water.
> She counts limpets in quadrats at set heights along a transect and tests the correlation statistically.
K: Ecologists move from observation to testable, falsifiable hypotheses and predictions, collect data, analyse it and draw provisional conclusions that lead to new questions.
!: Calling a hypothesis "proved". Data can support or fail to support a hypothesis, but further evidence can always revise it.
EV: established | Falsifiability, replication and peer review are widely accepted foundations of scientific practice.
T: Hypothesis | A testable explanation for an observation
T: Prediction | A specific, testable outcome expected if the hypothesis is correct
T: Falsifiable | Capable of being shown to be false by evidence
SUM: Observe, hypothesise, predict, test, conclude.
SUM: Hypotheses must be falsifiable and methods repeatable.
SUM: Ecology is complex, so conclusions are provisional.
SRC: Popper K., The Logic of Scientific Discovery, Hutchinson | primary | 1959
SRC: Ruxton G. D. and Colegrave N., Experimental Design for the Life Sciences, 4th edition, Oxford University Press | secondary | 2016
Q: What makes a hypothesis falsifiable? | It makes predictions that could be shown to be wrong by evidence.
Q: Why must methods be described in full? | So that other scientists can repeat the study and check the results.
M1#ecology-u09-01-q1@1: Which is a testable hypothesis? | Bluebells are more abundant where the woodland canopy is more open | Bluebells are the most beautiful woodland flower | Woodlands should be protected | Bluebells will always grow in Britain | A testable hypothesis makes a prediction that data can check.
M2#ecology-u09-01-q2@2: Why is peer review important in science? | Other experts check the methods and conclusions before publication | It guarantees that every published result is completely true | It stops scientists from sharing their raw data with others | It replaces the need for any statistical analysis of data | Peer review helps catch errors and weak reasoning.
M3#ecology-u09-01-q3@3: Why are ecological conclusions often treated as provisional? | Complex interacting factors and limited data mean new evidence may change them | Ecologists never use statistics to analyse their data | Ecological data are usually invented to fit the hypothesis | Nature never changes, so conclusions can never be wrong | Complexity and incomplete data make revision likely.
SEQ1#ecology-u09-01-q4@1: Order the stages of a scientific investigation. | Observation ; Hypothesis ; Prediction ; Data collection ; Conclusion | Each stage builds on the previous one.
SA2#ecology-u09-01-q5@1,3: Explain why it is harder to establish cause and effect in ecology than in a laboratory experiment. | In the field many factors vary at once, such as light, soil, climate and other species, so changes cannot easily be attributed to one cause. Conditions cannot be fully controlled, studies may need long timescales and large areas, and replication is difficult. Ecologists use controlled field experiments where possible, careful sampling and statistics to separate effects. | Many interacting variables ; Limited control ; Scale and time ; Replication ; Methods to cope

## Hypotheses and null hypotheses
LV: Introductory · Application
S: Statistical tests in ecology start with a null hypothesis of no effect. This lesson explains how to write null and alternative hypotheses, what a p-value and significance level mean, and the two types of error.
O: Write null and alternative hypotheses for an ecological investigation
O: Interpret a p-value and the 5% significance level
O: Distinguish Type I and Type II errors
PRE: The scientific method in ecology
H: Null and alternative hypotheses
- The **null hypothesis (H_{0})** states that there is **no** difference, association or correlation: for example, "There is no difference in the mean number of species between grazed and ungrazed grassland."
- The **alternative hypothesis (H_{1})** states that there is a difference or relationship.
- A **two-tailed** alternative predicts a difference in either direction; a **one-tailed** alternative predicts a specific direction.
H: Significance
- A statistical test calculates a **test statistic** and a **p-value**: the probability of getting results at least as extreme as those observed **if the null hypothesis were true**.
- Ecologists usually use a **5% significance level** (p = 0.05). If p < 0.05, the null hypothesis is **rejected**; otherwise it is **not rejected**.
- In many A-level and field tests, the calculated statistic is compared with a **critical value** from a table, using the right **degrees of freedom**.
H: Errors
P: A **Type I error** is rejecting a true null hypothesis (a false positive); at the 5% level this happens about 1 time in 20 when there is no real effect. A **Type II error** is failing to reject a false null hypothesis (a false negative), more likely with small samples. Statistical significance does not prove a hypothesis, and a significant result may still be ecologically small.
X: Writing hypotheses.
> Question: does the density of daisies differ between a trampled path and the nearby lawn?
> H_{0}: There is no difference in mean daisy density between the path and the lawn.
> H_{1}: There is a difference in mean daisy density between the path and the lawn (two-tailed).
> If a t-test gives p = 0.01, H_{0} is rejected: the difference is statistically significant.
K: Start with a null hypothesis of no effect; reject it when p is below 0.05; a Type I error rejects a true null, a Type II error misses a real effect.
!: Saying the null hypothesis is "accepted" or "proved". It is either rejected or not rejected on the evidence.
EV: established | The 5% significance level is a convention, not a law of nature; many statisticians urge reporting effect sizes and confidence intervals too.
T: Null hypothesis | A statement that there is no difference, association or correlation
T: p-value | The probability of results at least as extreme as observed if the null hypothesis is true
T: Type I error | Rejecting a null hypothesis that is actually true
SUM: H_{0}: no effect; H_{1}: an effect.
SUM: Reject H_{0} if p < 0.05.
SUM: Type I and Type II errors are possible.
SRC: Dytham C., Choosing and Using Statistics: A Biologist's Guide, 3rd edition, Wiley-Blackwell | secondary | 2011
SRC: Wasserstein R. L. and Lazar N. A., "The ASA statement on p-values: context, process, and purpose", The American Statistician 70(2), 129–133 | standard | 2016
Q: What does a p-value of 0.03 mean? | If the null hypothesis were true, there is a 3% probability of results at least as extreme as these.
Q: What is a Type II error? | Failing to reject a null hypothesis that is actually false.
M1#ecology-u09-02-q1@1: Which is a correctly written null hypothesis? | There is no correlation between soil moisture and moss cover | Moss cover increases with soil moisture | Moss grows best in wet soil | Soil moisture causes moss growth | A null hypothesis states there is no relationship.
M2#ecology-u09-02-q2@2: A test gives p = 0.12. What should be concluded at the 5% level? | Do not reject the null hypothesis | Reject the null hypothesis | The alternative hypothesis is proved | The data must be wrong | p is above 0.05, so the result is not significant.
M3#ecology-u09-02-q3@3: Why are Type II errors more likely with small samples? | Small samples have less power to detect a real effect | Small samples always give significant results | Small samples remove random variation | Type II errors only occur in large samples | With few data, real differences may not reach significance.
MATCH1#ecology-u09-02-q4@2: Match each term to its meaning. | Null hypothesis = No effect ; Type I error = False positive ; Type II error = False negative ; Two-tailed test = Difference in either direction | These terms underpin hypothesis testing.
SA3#ecology-u09-02-q5@2,3: Explain why a statistically significant result is not always ecologically important. | Significance shows only that an effect is unlikely to be due to chance. With very large samples, tiny differences, such as a 1% change in plant height, can be significant but have little ecological meaning. Researchers should report effect sizes and confidence intervals and judge biological importance, as well as p-values. | Meaning of significance ; Large samples ; Effect size ; Confidence intervals ; Biological judgement

## Experimental and observational studies
LV: Introductory · Application
S: Ecologists can either manipulate the system or observe natural variation. This lesson compares manipulative experiments, natural experiments and observational studies, and explains how controls and randomisation support causal conclusions.
O: Distinguish manipulative experiments from observational studies
O: Explain the role of controls, randomisation and confounding variables
O: Evaluate the strengths and limits of each approach in ecology
PRE: Hypotheses and null hypotheses
H: Types of study
- **Manipulative experiments**: the researcher changes a factor and compares with **controls**, such as excluding grazers from fenced plots. Robert Paine's removal of the starfish *Pisaster* from rocky shores in the 1960s showed its role as a keystone predator.
- **Natural experiments**: use events the researcher did not cause, such as comparing areas before and after a fire.
- **Observational (correlational) studies**: measure variables as they occur, such as plant cover against soil pH along a transect.
H: Controls and confounding
- A **control** is identical except for the factor being tested.
- **Randomly allocating** treatments to plots spreads unknown differences evenly.
- A **confounding variable** is linked to both the factor studied and the outcome, giving a misleading result. For example, shaded sites may also be wetter.
- Observational studies show **correlation**, which does not prove causation.
H: Choosing an approach
P: Experiments give the strongest evidence of cause, but they may be small, short or unrealistic, and some factors (such as climate or large predators) cannot be manipulated ethically or practically. Observational studies cover real conditions and large scales but are prone to confounding. Ecologists often combine approaches: observations suggest patterns, experiments test mechanisms, and models scale up.
X: Does grazing reduce plant diversity?
> Observational: diversity is compared in heavily and lightly grazed fields, but the fields differ in soil too (confounding).
> Experimental: 20 plots are randomly assigned, 10 fenced to exclude sheep (treatment) and 10 left open (control).
> After three years, species richness is compared.
> Randomisation and controls make it more likely that differences are due to grazing.
K: Manipulative experiments with controls and randomisation give the strongest evidence of cause; observational studies reveal patterns but risk confounding; ecologists combine approaches.
!: Concluding cause from a correlation. A third, confounding variable may explain both.
EV: established | Paine's starfish removal experiments are classic evidence for keystone species effects.
T: Manipulative experiment | A study in which the researcher deliberately changes a factor
T: Control | A comparison group identical except for the factor being tested
T: Confounding variable | A variable linked to both the factor studied and the outcome
SUM: Experiments, natural experiments and observations.
SUM: Controls and randomisation reduce confounding.
SUM: Correlation does not prove causation.
SRC: Paine R. T., "Food web complexity and species diversity", The American Naturalist 100(910), 65–75 | primary | 1966
SRC: Ruxton G. D. and Colegrave N., Experimental Design for the Life Sciences, 4th edition, Oxford University Press | secondary | 2016
Q: What is a control in an ecological experiment? | A plot or group treated the same as the experimental one except for the factor being tested.
Q: Why does correlation not prove causation? | A confounding variable may cause both, or the direction of cause may be reversed.
M1#ecology-u09-03-q1@1: Fencing plots to exclude deer and comparing them with unfenced plots is which kind of study? | A manipulative experiment | An observational study | A natural experiment | A literature review | The researcher deliberately changes deer access.
M2#ecology-u09-03-q2@2: Why are treatments randomly allocated to plots? | To spread unknown differences evenly between groups | To make the study easier to carry out | To guarantee a significant result | To avoid the need for controls | Randomisation reduces systematic bias and confounding.
M3#ecology-u09-03-q3@3: Moss cover is higher in shaded quadrats, but shaded quadrats are also wetter. What is the problem? | Moisture is a confounding variable | Shade has been proved to cause moss growth | The sample is too large | The quadrats are too small | Moisture could explain the pattern instead of shade.
MATCH1#ecology-u09-03-q4@2: Match each study to its type. | Removing a predator from plots = Manipulative experiment ; Comparing sites before and after a wildfire = Natural experiment ; Measuring cover against pH on a transect = Observational study ; Fenced and unfenced plots = Manipulative experiment | Different designs answer different questions.
SA3#ecology-u09-03-q5@2,3: Evaluate the use of field experiments to study the effects of climate change on plants. | Experiments such as warming chambers or rainfall shelters can test causal effects of temperature or drought, with controls and replication. But plots are small, short-term and may create artefacts (such as altered wind or humidity); they cannot reproduce all aspects of climate change or long-term ecosystem responses. Combining experiments with long-term observations and models gives a fuller picture. | Causal evidence ; Controls and replication ; Artefacts ; Scale and time ; Combining methods

## Replication and pseudoreplication
LV: Introductory · Evaluation
S: Replication lets ecologists distinguish real effects from natural variation. This lesson explains why replicates are needed, what counts as an independent replicate and how pseudoreplication leads to false conclusions.
O: Explain why replication is necessary in ecological studies
O: Identify independent replicates and the experimental unit
O: Recognise and avoid pseudoreplication
PRE: Experimental and observational studies
H: Why replicate?
- Natural populations and habitats vary, so a single measurement may be unusual.
- **Replicates** are repeated, independent measurements or experimental units under each condition.
- More replicates give more reliable estimates of the mean and its variability and increase the **power** to detect real effects.
H: The experimental unit
- The **experimental unit** is the smallest unit to which a treatment is independently applied, such as a fenced plot, a pond or a field.
- Measurements taken within one unit, such as several quadrats inside one plot, are **subsamples**, not independent replicates.
- Statistical tests should use the number of experimental units, not the number of subsamples.
H: Pseudoreplication
P: Stuart Hurlbert (1984) defined **pseudoreplication** as using inferential statistics to test for treatment effects when treatments are not replicated or replicates are not independent. For example, comparing 20 quadrats in a single fertilised field with 20 in a single unfertilised field treats each quadrat as a replicate, but any difference could be due to other differences between the two fields. Avoid it by replicating whole units, interspersing treatments, or recognising the limits of the design.
X: Spotting pseudoreplication.
> A study compares invertebrates in one polluted stream and one clean stream, taking 10 kick samples in each.
> A t-test with 10 samples per stream shows a significant difference.
> But the treatment (pollution) is applied to only one stream each; the samples are subsamples.
> The difference could reflect any other differences between the two streams. Several polluted and clean streams are needed.
K: Replicates must be independent experimental units; subsamples within one unit are not replicates; pseudoreplication inflates confidence and can give false conclusions.
!: Counting quadrats within one site as independent replicates of a site-level treatment. That is pseudoreplication.
EV: established | Hurlbert's 1984 paper found pseudoreplication in a large share of published ecological field experiments and remains highly cited.
T: Replicate | An independent experimental unit receiving a treatment
T: Experimental unit | The smallest unit to which a treatment is independently applied
T: Pseudoreplication | Treating non-independent measurements as if they were independent replicates
SUM: Replication reveals real effects against variation.
SUM: Identify the true experimental unit.
SUM: Avoid treating subsamples as replicates.
SRC: Hurlbert S. H., "Pseudoreplication and the design of ecological field experiments", Ecological Monographs 54(2), 187–211 | primary | 1984
SRC: Ruxton G. D. and Colegrave N., Experimental Design for the Life Sciences, 4th edition, Oxford University Press | secondary | 2016
Q: What is pseudoreplication? | Treating non-independent measurements, such as subsamples from one site, as independent replicates.
Q: What is the experimental unit? | The smallest unit to which a treatment is independently applied.
M1#ecology-u09-04-q1@1: Why is replication needed? | Natural variation means single measurements may be unrepresentative | It makes fieldwork quicker by reducing sampling effort | It removes the need for any statistical testing | It guarantees that every result will be significant | Replicates show whether differences exceed normal variation.
M2#ecology-u09-04-q2@2: Fertiliser is added to one large plot, and 15 quadrats are sampled in it and in one control plot. How many true replicates per treatment are there? | One | Fifteen | Thirty | Two | The treatment is applied to only one plot each, so n = 1.
M3#ecology-u09-04-q3@3: How could the fertiliser study be redesigned to avoid pseudoreplication? | Apply fertiliser to several randomly chosen plots and use several control plots | Sample 50 quadrats in each of the same two plots instead | Use much larger quadrats in the same two original plots | Measure the same two plots on many more separate days | Replicating whole plots gives independent units.
MATCH2#ecology-u09-04-q4@1: Match each design to its status. | Ten fenced and ten open plots, randomised = Proper replication ; Twenty quadrats in one burned site = Pseudoreplication ; Five ponds treated and five untreated = Proper replication ; Repeated measurements of one tree = Subsamples | Independence defines a replicate.
SA3#ecology-u09-04-q5@2,3: Explain why pseudoreplication is a problem for ecological conclusions. | Statistical tests assume independent replicates. When subsamples from one unit are treated as replicates, variation is underestimated and sample size inflated, so tests are more likely to find "significant" differences. Any difference may be due to other characteristics of the single units compared, not the treatment, so the conclusion about cause is unjustified. | Independence assumption ; Inflated sample size ; False significance ; Confounded units ; Unjustified cause

## Fieldwork ethics and safety
LV: Introductory · Application
S: Fieldwork must be safe for people and responsible towards wildlife, habitats and landowners. This lesson covers risk assessment, legal protection of species and sites, permissions and good practice to minimise disturbance.
O: Carry out a risk assessment for ecological fieldwork
O: Describe legal protections for species and sites relevant to fieldwork in Great Britain
O: Apply ethical principles to minimise harm to wildlife and habitats
PRE: The scientific method in ecology
H: Safety
- A **risk assessment** identifies hazards, who might be harmed, how likely and severe harm is, and control measures.
- Common hazards: tides and waves, cliffs, rivers and deep water, weather, slips, lone working, ticks (Lyme disease), water-borne infections such as leptospirosis, sharp objects and livestock.
- Controls include checking tide tables and forecasts, working in groups, appropriate clothing and footwear, first aid, communication, gloves and hand washing.
H: The law
- In Great Britain, the **Wildlife and Countryside Act 1981** protects wild birds, many animals and plants; some species, such as great crested newts, bats and dormice, also have European-derived protection under the **Conservation of Habitats and Species Regulations 2017**. Disturbing, capturing or handling them needs a **licence**.
- Trapping shrews, mist-netting birds and some surveys require licences from bodies such as Natural England or the British Trust for Ornithology.
- **Sites of Special Scientific Interest (SSSIs)** may need consent for activities that could damage them.
- Landowner **permission** is needed to work on private land.
H: Minimising harm
P: Ethical fieldwork follows the principle of causing the least disturbance needed to answer the question: return stones and logs to their original positions, avoid trampling, take only the samples needed, keep animals for the shortest time in suitable conditions, check traps frequently, avoid breeding seasons for sensitive species, and prevent spreading invasive species and diseases by cleaning equipment ("Check, Clean, Dry").
X: A rocky shore survey.
> Hazards: incoming tide, slippery rocks, falling from rocks and wave action.
> Controls: check the tide table and work on a falling tide, wear grippy boots, stay in pairs within sight of a leader, and agree a return time.
> Ethics: turn rocks back carefully so the animals underneath survive.
> Only common species are handled, and none are removed.
K: Plan fieldwork with a risk assessment, obtain permissions and licences for protected species and sites, and minimise disturbance by following ethical good practice.
!: Assuming common animals can always be trapped without permission. Some, such as shrews in Great Britain, need a licence to trap.
EV: established | UK wildlife law requires licences for disturbing or capturing many protected species, including great crested newts and bats.
T: Risk assessment | A process identifying hazards and measures to reduce the risk of harm
T: Site of Special Scientific Interest | A legally protected site in Great Britain of special wildlife or geological interest
T: Licence | Official permission to carry out an activity affecting protected species
SUM: Assess and control risks to people.
SUM: Respect wildlife law, licences and permissions.
SUM: Minimise disturbance and prevent spreading invasives.
SRC: Wildlife and Countryside Act 1981 | legislation | 1981 | https://www.legislation.gov.uk/ukpga/1981/69/contents
SRC: The Conservation of Habitats and Species Regulations 2017 (SI 2017/1012) | legislation | 2017 | https://www.legislation.gov.uk/uksi/2017/1012/contents
SRC: Field Studies Council, Fieldwork safety and good practice guidance | guidance | 2023 | https://www.field-studies-council.org/
Q: Name three hazards of freshwater fieldwork. | Deep or fast water, slips, cold, leptospirosis, broken glass and poor weather (any three).
Q: What does "Check, Clean, Dry" aim to prevent? | The spread of invasive species and diseases between sites on equipment and clothing.
M1#ecology-u09-05-q1@1: What is the first step in planning safe fieldwork? | Carry out a risk assessment | Start sampling immediately | Collect as many animals as possible | Avoid telling anyone where you are | A risk assessment identifies hazards and controls in advance.
M2#ecology-u09-05-q2@2: A student wants to catch great crested newts for a project. What is needed? | A licence, because they are a protected species | Nothing, as newts are common | Only the landowner's verbal agreement | A fishing permit from the shop | Great crested newts are protected and need a licence to handle.
M3#ecology-u09-05-q3@3: Which practice best minimises harm when searching under stones? | Return each stone carefully to its original position | Leave stones overturned so the habitat can dry out | Take interesting stones home for further study | Throw stones back into the water from a distance | Replacing stones protects the animals and microhabitat beneath.
MATCH2#ecology-u09-05-q4@1: Match each hazard to a control measure. | Incoming tide = Check tide tables and agree a return time ; Ticks = Long trousers and checking skin afterwards ; Leptospirosis = Cover cuts and wash hands ; Lone working = Work in pairs | Each hazard has a practical control.
SA3#ecology-u09-05-q5@1,3: Write the main points of a risk assessment and ethical plan for a small mammal trapping survey. | Hazards: handling animals (bites, disease), weather, uneven ground, lone working; controls include gloves, hand washing, working in pairs and suitable clothing. Legal: check whether shrews may be caught (licence needed in Great Britain) and obtain landowner permission. Ethics: provide bedding and food, check traps at least every few hours, release animals where caught, avoid extreme weather and minimise handling time. | Hazards and controls ; Permissions and licences ; Animal welfare ; Trap checking ; Release

## Random, systematic and stratified sampling
LV: Introductory · Application
S: Ecologists rarely count every organism, so they take samples that should represent the whole area. This lesson compares random, systematic and stratified sampling and explains how to choose and carry out each.
O: Explain why sampling is necessary and how bias can arise
O: Compare random, systematic and stratified sampling
O: Choose an appropriate sampling strategy for a given investigation
PRE: Replication and pseudoreplication
H: Why sample?
P: Counting every individual is usually impossible, so ecologists take **samples** and use them to estimate the whole **population** or community. A good sample is **representative**; **bias** occurs when some parts are more likely to be sampled, for example by placing quadrats where plants look interesting.
H: Sampling strategies
- **Random sampling**: each point has an equal chance of selection. Lay out a grid with two tape measures and use random numbers for coordinates. It avoids bias but may miss rare or patchy areas.
- **Systematic sampling**: samples at regular intervals, such as every 5 m along a transect. It is used to study change across an environmental gradient, such as a sand dune or shore, but may miss features or coincide with patterns.
- **Stratified sampling**: divide the area into distinct **strata** (such as heath and woodland) and sample each, often in proportion to its area. It ensures all habitats are represented.
H: Sample size
P: More samples give more reliable estimates. A **running mean** helps decide how many: plot the cumulative mean against the number of samples; when it levels off, the sample is probably large enough. Practical limits of time and disturbance also apply.
X: Sampling a field with two habitats.
> A field is 70% grassland and 30% wet marsh.
> Random sampling of 20 quadrats might put only a few in the marsh.
> Stratified sampling places 14 quadrats randomly in the grassland and 6 in the marsh.
> Both habitats are represented in proportion to their area.
K: Random sampling avoids bias, systematic sampling tracks change along gradients, and stratified sampling ensures each habitat is represented; sample size should be large enough for a stable mean.
!: Calling it random when quadrats are thrown over the shoulder. Throwing is not truly random and can be unsafe; use random coordinates.
EV: established | Random, systematic and stratified designs are standard sampling methods in ecological survey handbooks.
T: Random sampling | Selecting sample positions so that each point has an equal chance of being chosen
T: Systematic sampling | Taking samples at regular intervals
T: Stratified sampling | Dividing an area into distinct zones and sampling each
SUM: Samples must be representative and unbiased.
SUM: Random, systematic or stratified, depending on the question.
SUM: Use a running mean to judge sample size.
SRC: Sutherland W. J. (ed), Ecological Census Techniques: A Handbook, 2nd edition, Cambridge University Press | secondary | 2006
SRC: Kent M., Vegetation Description and Data Analysis: A Practical Approach, 2nd edition, Wiley-Blackwell | secondary | 2012
Q: How are random coordinates generated for quadrat sampling? | Lay out tape measures as axes and use a random number generator or table to select coordinates.
Q: When is systematic sampling most useful? | When studying change along an environmental gradient, such as a shore or sand dune.
M1#ecology-u09-06-q1@1: Which strategy is best for studying change in vegetation from the sea to inland dunes? | Systematic sampling along a transect | Random sampling across the whole area | Sampling only the most interesting plants | Stratified sampling of one habitat only | Regular samples along a gradient show how communities change.
M2#ecology-u09-06-q2@2: Why is choosing quadrat positions by eye a problem? | It introduces bias towards areas that look interesting | It makes the sample far too large to analyse | It removes all natural variation from the data | It is required by law for every field survey | Subjective placement means the sample may not represent the area.
NUM2#ecology-u09-06-q3@3: An area is 60% woodland and 40% grassland. With 30 quadrats in a proportional stratified sample, how many go in grassland? | 12 | 0 | quadrats | 40% of 30 = 12 quadrats.
M3#ecology-u09-06-q4@3: What does a running mean that levels off indicate? | The sample size is probably large enough | More samples are definitely needed | The data contain errors | The habitat is uniform everywhere | A stable cumulative mean suggests extra samples add little.
SA3#ecology-u09-06-q5@2,3: Compare random and systematic sampling, explaining when each is preferable. | Random sampling gives each point an equal chance, avoiding bias, and suits estimating the average abundance in a fairly uniform area, but it may miss rare patches or gradients. Systematic sampling at regular intervals ensures coverage and suits studying change along a gradient, such as zonation, but can miss features between sample points or coincide with regular patterns. The choice depends on the question. | Random advantages ; Random limits ; Systematic advantages ; Systematic limits ; Fit to question

## Quadrats
LV: Introductory · Application
S: Quadrats are frames used to sample plants and slow-moving animals in a defined area. This lesson covers quadrat types, choosing size and number, and how to record density, frequency and cover.
O: Describe frame and point quadrats and their uses
O: Choose an appropriate quadrat size and number
O: Calculate density, frequency and percentage cover from quadrat data
PRE: Random, systematic and stratified sampling
H: Types of quadrat
- A **frame quadrat** is a square frame, often 0.5 m × 0.5 m (0.25 m^{2}) or 1 m × 1 m, sometimes divided into a grid of 100 smaller squares.
- A **point quadrat** is a frame holding pins; species touched by each pin are recorded, giving an objective estimate of cover, useful in dense grassland.
H: Size and number
- Quadrat size depends on the organisms: small for grassland plants or lichens, large (such as 10 m × 10 m) for trees.
- A **species–area curve** (recording species in larger and larger quadrats until few new species appear) helps choose a size for community studies.
- The number of quadrats can be judged with a **running mean**.
H: What to record
- **Density**: number of individuals per unit area, suitable where individuals can be counted.
- **Frequency**: the percentage of quadrats (or subsquares) in which a species occurs.
- **Percentage cover**: the proportion of the quadrat area covered by a species, viewed from above; used for plants such as grasses where individuals cannot be counted. Covers can add to more than 100% because of layering.
E: Density = total number counted ÷ total area sampled :: individuals per square metre
X: Daisies on a lawn.
> 10 quadrats of 0.25 m^{2} are placed randomly; 30 daisy plants are counted in total.
> Total area = 10 × 0.25 = 2.5 m^{2}.
> Density = 30 ÷ 2.5 = 12 plants per m^{2}.
> Daisies occur in 7 of the 10 quadrats: frequency = 70%.
K: Frame quadrats measure density, frequency and percentage cover; point quadrats give objective cover; size suits the organisms, and number is judged with a running mean.
!: Calculating density per quadrat without converting to per square metre. Always divide by the actual area sampled.
EV: established | Quadrat sampling is one of the most widely used methods for plant and sessile animal surveys.
T: Frame quadrat | A square frame marking a sample area
T: Frequency | The percentage of samples in which a species is present
T: Percentage cover | The proportion of the ground area covered by a species
SUM: Frame and point quadrats.
SUM: Size from species–area curve; number from running mean.
SUM: Record density, frequency or cover.
SRC: Kent M., Vegetation Description and Data Analysis: A Practical Approach, 2nd edition, Wiley-Blackwell | secondary | 2012
SRC: Sutherland W. J. (ed), Ecological Census Techniques: A Handbook, 2nd edition, Cambridge University Press | secondary | 2006
Q: Why is percentage cover used for grasses? | Individual grass plants are hard to distinguish and count.
Q: How is a species–area curve used? | To choose a quadrat size large enough to include most species in a community.
M1#ecology-u09-07-q1@1: Which quadrat gives the most objective estimate of plant cover in dense grassland? | Point quadrat | Frame quadrat by eye | Belt transect | Pitfall trap | Recording pin touches avoids subjective estimates.
NUM2#ecology-u09-07-q2@2: 12 quadrats of 0.5 m × 0.5 m contain 54 limpets in total. What is the density, in limpets per m^{2}? | 18 | 0.5 | per m^{2} | Total area = 12 × 0.25 = 3 m^{2}; density = 54 ÷ 3 = 18 per m^{2}.
M2#ecology-u09-07-q3@2: A species is found in 18 of 40 quadrats. What is its frequency? | 45% | 18% | 40% | 22% | Frequency is the share of quadrats with the species: 18 ÷ 40 × 100 = 45%.
M3#ecology-u09-07-q4@3: Why can total percentage cover in a quadrat exceed 100%? | Plants overlap in layers | Quadrats are always too small | Bare ground is counted twice | Cover is measured in square metres | Taller plants can overlap smaller ones, so covers add to over 100%.
SA3#ecology-u09-07-q5@1,3: Explain how you would decide the size and number of quadrats for a survey of woodland ground flora. | For size, record the number of species in increasingly large quadrats (a species–area curve) and choose the size where the curve levels off. For number, take quadrats one at a time and plot a running mean of the measure (such as cover of bluebells); stop when it levels off, within time and disturbance limits. Use random or stratified positions to avoid bias. | Species–area curve ; Running mean ; Practical limits ; Random positions

## Transects
LV: Introductory · Application
S: Transects are lines along which samples are taken to show how organisms change across an environmental gradient. This lesson describes line, belt and interrupted transects, how to set them up and how to present the results.
O: Distinguish line, belt and interrupted transects
O: Set up a transect to study zonation or succession
O: Present transect data with kite diagrams and profiles
PRE: Quadrats
H: Types of transect
- **Line transect**: a tape laid across the habitat; species touching the line at set points are recorded.
- **Belt transect**: quadrats placed continuously along the line, giving detailed data.
- **Interrupted belt transect**: quadrats at regular intervals (such as every 5 m), a form of **systematic sampling** that saves time over long gradients.
H: Uses
- Studying **zonation**, such as bands of seaweeds and animals on a rocky shore from low to high tide.
- Studying **succession**, such as changes from bare sand to mature dunes inland.
- Studying gradients such as woodland edges, trampled paths or pollution from a source.
- Abiotic factors (light, soil moisture, height above sea level, salinity) are measured at each point to explain the pattern.
H: Presenting results
P: A **kite diagram** shows abundance of each species along the transect as a band whose width represents abundance, making zonation easy to see. A **profile** shows height or slope along the transect. Plotting abiotic factors alongside allows correlation with species distributions, which can be tested statistically, for example with Spearman's rank.
X: A sand dune transect.
> An interrupted belt transect runs 200 m inland from the strandline, with a quadrat every 10 m.
> Sea rocket and lyme grass dominate near the shore; marram grass dominates the yellow dunes; heather and mosses appear in the grey dunes.
> Soil pH falls and organic matter rises inland.
> A kite diagram shows the succession, and Spearman's rank tests the link between distance and soil organic matter.
K: Transects sample along gradients: line transects record touching species, belt transects use continuous quadrats, and interrupted transects sample at intervals; kite diagrams display zonation and succession.
!: Placing transect samples randomly. Transects use systematic sampling because the aim is to show change along a gradient.
EV: established | Transect methods are standard for studying zonation on rocky shores and succession on sand dunes.
T: Belt transect | Quadrats placed continuously along a line to record change across a habitat
T: Zonation | The arrangement of species in bands along an environmental gradient
T: Kite diagram | A chart showing species abundance as bands along a transect
SUM: Line, belt and interrupted transects.
SUM: Used for zonation, succession and gradients.
SUM: Kite diagrams display results.
SRC: Kent M., Vegetation Description and Data Analysis: A Practical Approach, 2nd edition, Wiley-Blackwell | secondary | 2012
SRC: Sutherland W. J. (ed), Ecological Census Techniques: A Handbook, 2nd edition, Cambridge University Press | secondary | 2006
Q: What is an interrupted belt transect? | Quadrats placed at regular intervals along a transect line.
Q: What does a kite diagram show? | The abundance of species along a transect, as bands of varying width.
M1#ecology-u09-08-q1@1: Which method best shows zonation on a rocky shore? | A transect from low to high tide | Random quadrats across the whole beach | A single quadrat at mid-shore | Pitfall traps on the cliff top | Sampling along the gradient reveals bands of species.
M2#ecology-u09-08-q2@2: Why are abiotic factors measured along a transect? | To help explain changes in species distribution | To replace counting the species themselves | To make the transect longer and more detailed | To avoid the need for any statistical test | Linking species and conditions helps identify causes of zonation.
M3#ecology-u09-08-q3@3: Why might an interrupted belt transect be chosen over a continuous belt transect on a long dune system? | It covers a long gradient with less time and disturbance | It records every plant along the whole length | It gives random samples across the dunes | It removes the need to measure abiotic factors | Sampling at intervals is efficient over long distances.
MATCH2#ecology-u09-08-q4@1: Match each method to its feature. | Line transect = Records species touching the line ; Belt transect = Continuous quadrats ; Interrupted belt transect = Quadrats at intervals ; Kite diagram = Displays abundance along the line | Transect methods differ in detail and effort.
SA3#ecology-u09-08-q5@2,3: Describe how you would investigate the effect of trampling on plants across a footpath. | Lay a transect at right angles across the path, extending into untrampled vegetation on both sides. Place quadrats at regular intervals (such as every 0.5 m) and record percentage cover or species present. Measure soil compaction or trampling intensity at each point. Present results with a kite diagram and test the correlation between compaction and cover or richness with Spearman's rank. Repeat with several transects for replication. | Transect across path ; Systematic quadrats ; Measure trampling ; Present and test ; Replicate transects

## Measuring abundance: frequency, cover and ACFOR
LV: Introductory · Application
S: Ecologists use several measures of abundance, from precise counts to quick abundance scales. This lesson compares counts, frequency, percentage cover and abundance scales such as ACFOR and DAFOR, with their strengths and limitations.
O: Compare density, frequency and percentage cover as measures of abundance
O: Use ACFOR and DAFOR abundance scales
O: Evaluate the reliability of subjective abundance estimates
PRE: Quadrats
H: Measures of abundance
- **Density** (counts per area): precise but slow, and only possible where individuals can be told apart.
- **Frequency**: presence or absence in quadrats or subsquares; quick but depends on quadrat size and says nothing about how many are present.
- **Percentage cover**: area covered, estimated by eye or with a gridded quadrat or point quadrat; suited to plants that spread.
H: Abundance scales
- **ACFOR**: **A**bundant, **C**ommon, **F**requent, **O**ccasional, **R**are.
- **DAFOR** adds **D**ominant at the top.
- The **Domin** and **Braun-Blanquet** scales assign numbers to cover bands, used in vegetation surveys such as the National Vegetation Classification.
- Scales are quick and allow large areas to be surveyed.
H: Reliability
P: Scales and cover estimates are **subjective**: different observers may score the same quadrat differently, and conspicuous or flowering species tend to be overestimated. Reliability improves with training, clear definitions (for example, assigning cover bands to each letter), calibration between observers, gridded quadrats or point quadrats, and photographs for checking. The choice of method depends on the precision needed and the time available.
X: Comparing methods.
> In a meadow, a gridded 1 m^{2} quadrat with 100 subsquares is used.
> Buttercup is present in 35 subsquares (frequency 35%) and covers about 20% of the area.
> Using DAFOR, the observer records buttercup as "F" (frequent).
> The cover estimate gives more information, while DAFOR is faster across many quadrats.
K: Density is precise but slow, frequency is quick but crude, percentage cover suits spreading plants, and scales like ACFOR and DAFOR are rapid but subjective; training and clear definitions improve reliability.
!: Comparing ACFOR data from different observers without calibration. Subjective scales can vary greatly between people.
EV: established | Studies of observer error show substantial variation in visual cover estimates between individuals.
T: ACFOR scale | An abundance scale: abundant, common, frequent, occasional, rare
T: DAFOR scale | An abundance scale: dominant, abundant, frequent, occasional, rare
T: Observer bias | Systematic differences in recorded data due to who is recording
SUM: Density, frequency and cover each suit different situations.
SUM: ACFOR and DAFOR are quick but subjective.
SUM: Training and calibration improve reliability.
SRC: Kent M., Vegetation Description and Data Analysis: A Practical Approach, 2nd edition, Wiley-Blackwell | secondary | 2012
SRC: Rodwell J. S. (ed), British Plant Communities, Volume 1: Woodlands and Scrub, Cambridge University Press | primary | 1991
Q: What do the letters of ACFOR stand for? | Abundant, common, frequent, occasional and rare.
Q: Why are abundance scales described as subjective? | They rely on observers' judgement, which varies between people.
M1#ecology-u09-09-q1@1: Which measure records only whether a species is present in each quadrat? | Frequency | Density | Percentage cover | Biomass | Frequency is based on presence or absence.
M2#ecology-u09-09-q2@2: Why is density unsuitable for measuring grass abundance? | Individual grass plants are hard to tell apart | Grass cannot be seen inside a quadrat | Density is only used for trees in woodland | Grass grows too slowly to be measured | Spreading plants are better measured by cover.
M3#ecology-u09-09-q3@3: Two students record very different DAFOR scores for the same quadrats. What is the best improvement? | Agree clear definitions and calibrate together before sampling | Let each student choose their own letters freely | Stop using quadrats and estimate by eye from a distance | Only record the species that are flowering | Shared definitions and practice reduce observer bias.
MATCH1#ecology-u09-09-q4@1: Match each letter of DAFOR to its meaning. | D = Dominant ; A = Abundant ; O = Occasional ; R = Rare | DAFOR adds dominant to the ACFOR scale.
SA3#ecology-u09-09-q5@2,3: Evaluate the use of percentage cover estimates compared with point quadrats for measuring plant abundance. | Visual cover estimates are quick and cover many quadrats but are subjective, prone to observer bias and overestimation of conspicuous species. Point quadrats are more objective and repeatable, recording touches at fixed pins, but are slower, can miss rare species and are awkward in tall or woody vegetation. Choice depends on the precision needed and time; training improves visual estimates. | Visual speed ; Subjectivity ; Point quadrat objectivity ; Point quadrat limits ; Choice

## Sampling animals
LV: Introductory · Application
S: Mobile and hidden animals need special sampling methods. This lesson describes common methods for sampling invertebrates, small mammals and birds, their biases and welfare considerations, and how capture data can estimate population size.
O: Describe methods for sampling ground, vegetation and soil invertebrates
O: Describe methods for sampling small mammals and birds, including licensing
O: Evaluate the biases of animal sampling methods
PRE: Estimating population size: mark–release–recapture
H: Invertebrates
- **Pitfall traps**: containers sunk flush with the ground catch walking invertebrates such as beetles; cover against rain, include drainage and check at least daily.
- **Sweep nets**: swept through grass to catch insects on vegetation.
- **Beating trays**: a tray held under a branch that is tapped, dislodging invertebrates.
- **Pooters**: suction tubes to collect small invertebrates.
- **Tullgren funnels**: heat and light drive soil invertebrates down through a mesh into a container.
- **Light traps**: attract night-flying moths.
H: Vertebrates
- **Small mammals**: live traps such as Longworth traps, with bedding and food, checked frequently. In Great Britain, a licence is needed to trap shrews.
- **Birds**: point counts and transect counts by sight and song; mist-netting and ringing need a licence (such as from the BTO).
- **Camera traps** and field signs (droppings, footprints, feeding remains) detect elusive mammals without capture.
- **Butterflies** are monitored by standardised transect walks (Pollard walks) in the UK Butterfly Monitoring Scheme.
H: Biases and population estimates
P: Every method samples some animals more than others: pitfall traps favour active ground runners, and sweep nets miss species low in vegetation. Results are often relative (such as catch per trap) rather than absolute. **Mark–release–recapture** estimates population size using the Lincoln index, N = (number marked in first sample × number in second sample) ÷ number recaptured, assuming no births, deaths or migration and that marks do not affect survival.
X: A pitfall trap survey.
> Ten pitfall traps are set in woodland and ten in grassland, covered against rain.
> They are checked each morning for five days; animals are identified and released.
> Ground beetles dominate in woodland, spiders in grassland.
> Because catch depends on activity as well as numbers, results are compared as catch per trap per day.
K: Invertebrates are sampled with pitfall traps, sweep nets, beating trays, pooters and Tullgren funnels; mammals and birds with live traps, counts and cameras under licence where required; every method is biased, and welfare must be protected.
!: Leaving pitfall traps unchecked for days. Animals can die or eat each other; traps should be checked at least daily.
EV: established | The UK Butterfly Monitoring Scheme has used standardised transect counts since 1976.
T: Pitfall trap | A container sunk into the ground to catch walking invertebrates
T: Tullgren funnel | A device using heat and light to extract invertebrates from soil or leaf litter
T: Lincoln index | An estimate of population size from mark–release–recapture data
SUM: Different methods for ground, vegetation and soil invertebrates.
SUM: Mammals and birds need welfare care and sometimes licences.
SUM: All methods are biased; compare like with like.
SRC: Sutherland W. J. (ed), Ecological Census Techniques: A Handbook, 2nd edition, Cambridge University Press | secondary | 2006
SRC: Pollard E. and Yates T. J., Monitoring Butterflies for Ecology and Conservation, Chapman and Hall | primary | 1993
Q: How does a Tullgren funnel work? | Heat and light from a lamp drive soil invertebrates downwards through a mesh into a collecting container.
Q: What is the Lincoln index formula? | N = (number marked in first sample × number caught in second sample) ÷ number recaptured.
M1#ecology-u09-10-q1@1: Which method samples invertebrates living on grass stems? | A sweep net | A pitfall trap | A Tullgren funnel | A light trap at night | Sweep nets are swept through vegetation to catch insects on it.
NUM2#ecology-u09-10-q2@2: 40 snails are marked and released. Later 50 are caught, of which 10 are marked. What is the estimated population? | 200 | 1 | snails | N = 40 × 50 ÷ 10 = 200.
M2#ecology-u09-10-q3@2: Why do pitfall traps not give a true measure of population density? | Catches depend on animals' activity as well as their numbers | They catch every animal present in the area | They only catch flying insects at night | They work only in very wet weather | Active species are caught more often, regardless of numbers.
M3#ecology-u09-10-q4@3: A student plans to trap small mammals, including shrews, in Great Britain. What is required? | A licence to trap shrews and frequent trap checks with food and bedding | No permission, as all small mammals may be trapped freely | Lethal traps to avoid escapes | Leaving traps unchecked for a week | Shrews are protected from trapping without a licence and need food and frequent checks.
SA3#ecology-u09-10-q5@2,3: Evaluate the use of mark–release–recapture to estimate a woodlouse population. | It gives an absolute estimate from two samples using the Lincoln index. Assumptions: marks do not harm or make animals more visible, marked animals mix fully, there are no significant births, deaths or migration between samples, and capture probability is equal. Woodlice may cluster under logs, moult and lose marks, or move, violating assumptions and biasing the estimate. Repeating samples improves reliability. | Lincoln index ; Assumptions ; Violations for woodlice ; Bias ; Repetition

## Freshwater sampling and biotic indices
LV: Introductory · Application
S: Freshwater invertebrates are sampled to assess water quality, because different groups tolerate pollution differently. This lesson covers kick sampling, indicator species and biotic indices such as BMWP and ASPT.
O: Describe how to sample freshwater invertebrates by kick sampling
O: Explain how indicator species reveal water quality
O: Calculate and interpret BMWP and ASPT scores
PRE: Sampling animals
H: Kick sampling
- In a **kick sample**, the sampler holds a net downstream on the riverbed and disturbs the substrate upstream by kicking for a standard time (commonly three minutes), so that dislodged animals drift into the net.
- Samples are taken in comparable habitats (such as riffles) to allow comparison.
- Other methods include **sweep netting** in still water and **Surber samplers** for a fixed area.
H: Indicator species
- **Pollution-sensitive** animals, such as **stonefly nymphs**, mayfly nymphs and caddisfly larvae, need well-oxygenated, clean water.
- **Tolerant** animals, such as **sludge worms (tubificids)**, **bloodworms (chironomid larvae)** and rat-tailed maggots, survive in low-oxygen, organically polluted water.
- Organic pollution, such as sewage, is broken down by bacteria that use up oxygen, raising the **biochemical oxygen demand** and lowering dissolved oxygen.
H: Biotic indices
P: The **BMWP** (Biological Monitoring Working Party) score gives each invertebrate family a score from 1 (very tolerant) to 10 (very sensitive); the scores of families present are added. The **ASPT** (Average Score Per Taxon) divides BMWP by the number of scoring families, reducing the effect of sampling effort. High ASPT (above about 6) indicates good water quality; low values (below about 4) indicate pollution. The UK now uses more refined indices, but BMWP and ASPT illustrate the principle.
E: ASPT = BMWP score ÷ number of scoring taxa :: average sensitivity of the families present
X: Comparing two sites.
> Upstream of a sewage outfall, 18 scoring families give a BMWP of 126: ASPT = 126 ÷ 18 = 7.0.
> Downstream, 8 families give a BMWP of 24: ASPT = 24 ÷ 8 = 3.0.
> Stonefly and mayfly nymphs are present upstream; bloodworms and sludge worms dominate downstream.
> The indices and indicator species point to organic pollution from the outfall.
K: Kick sampling collects river invertebrates; sensitive groups like stoneflies indicate clean water, tolerant ones like sludge worms indicate pollution; BMWP sums family scores and ASPT averages them.
!: Comparing BMWP scores from samples of different effort. ASPT is less affected by sampling effort and is better for comparison.
EV: established | Macroinvertebrate biotic indices have long been used by UK environment agencies to assess river quality.
T: Indicator species | A species whose presence or absence reflects environmental conditions
T: Biochemical oxygen demand | The amount of oxygen used by microorganisms decomposing organic matter in water
T: ASPT | Average Score Per Taxon: BMWP score divided by the number of scoring families
SUM: Kick sample for a standard time in comparable habitat.
SUM: Sensitive and tolerant groups indicate water quality.
SUM: BMWP sums scores; ASPT averages them.
SRC: Armitage P. D., Moss D., Wright J. F. and Furse M. T., "The performance of a new biological water quality score system based on macroinvertebrates over a wide range of unpolluted running-water sites", Water Research 17(3), 333–347 | primary | 1983
SRC: Environment Agency, River invertebrate classification tool and sampling methods | guidance | 2023 | https://www.gov.uk/government/organisations/environment-agency
Q: Which invertebrates indicate clean, well-oxygenated water? | Stonefly nymphs, mayfly nymphs and caddisfly larvae.
Q: Why does sewage pollution reduce dissolved oxygen? | Bacteria decomposing the organic matter use up oxygen, raising biochemical oxygen demand.
M1#ecology-u09-11-q1@1: Which animal indicates heavily polluted water? | Sludge worms | Stonefly nymphs | Mayfly nymphs | Freshwater shrimps | Tubificid worms tolerate very low oxygen.
NUM2#ecology-u09-11-q2@2: A sample has a BMWP score of 90 from 15 scoring families. What is the ASPT? | 6 | 0.05 | – | ASPT = 90 ÷ 15 = 6.0.
M2#ecology-u09-11-q3@2: Why is kick sampling done for a standard time? | So samples from different sites are comparable | So the water becomes cleaner | So more pollution is released | So only one species is caught | Standard effort allows fair comparison between sites.
M3#ecology-u09-11-q4@3: Why is ASPT often preferred to BMWP for comparing sites? | It is less affected by how many families are found through sampling effort | It always gives a higher number | It ignores pollution-sensitive animals | It requires no identification of animals | Averaging reduces the influence of sample size.
SA3#ecology-u09-11-q5@2,3: Explain why biological indicators can give a better picture of river quality than a single chemical test. | A chemical test measures conditions at one moment, so it may miss pollution events that have passed. Invertebrates live in the river for months or years, so their presence or absence integrates conditions over time. Sensitive species disappear after occasional pollution, revealing problems a spot sample misses. Combining biological and chemical data gives the best picture. | Snapshot chemistry ; Long-lived invertebrates ; Integrates over time ; Detects past events ; Combined approach

## Measuring abiotic factors
LV: Introductory · Application
S: Abiotic factors help explain where organisms live. This lesson describes how to measure light, temperature, soil, water and air conditions in the field, and how to ensure reliable measurements.
O: Describe methods to measure key abiotic factors in terrestrial and aquatic habitats
O: Explain how to make abiotic measurements reliable and comparable
O: Link abiotic data to species distributions
PRE: Transects
H: Terrestrial factors
- **Light intensity**: a light meter (lux); take readings at the same height and close together in time, as light changes with cloud and time of day.
- **Temperature**: thermometers or probes; data loggers record over time.
- **Soil moisture**: weigh soil, dry it in an oven and reweigh; percentage water = (wet mass − dry mass) ÷ wet mass × 100; or use a moisture meter.
- **Soil pH**: pH meter or indicator kit.
- **Soil organic matter**: dry soil, then burn off organic matter and record mass lost.
- **Wind speed**: anemometer; **slope**: clinometer.
H: Aquatic factors
- **Dissolved oxygen**: oxygen meter or chemical test.
- **Water temperature**, **pH**, **conductivity** (dissolved ions), **turbidity** (cloudiness) and **nitrate** and **phosphate** concentrations.
- **Flow rate**: time a float over a measured distance; speed = distance ÷ time.
H: Reliability
P: Calibrate instruments, take repeat readings, record time and weather, and measure abiotic factors at the same points as biological samples so they can be linked. **Data loggers** record continuously, capturing daily and seasonal variation that single readings miss. Abiotic data then help explain distributions, for example by correlating moss cover with soil moisture using Spearman's rank.
X: Measuring soil moisture.
> A soil sample has a wet mass of 50.0 g.
> After drying in an oven at about 100 °C until the mass is constant, it weighs 40.0 g.
> Water lost = 10.0 g.
> Percentage moisture = 10.0 ÷ 50.0 × 100 = 20%.
K: Abiotic factors are measured with light meters, probes, soil tests, water tests and flow measurements; calibration, repeats, data loggers and matching locations to biological samples make data reliable and useful.
!: Comparing light readings taken hours apart. Light changes with time and cloud, so readings must be taken close together.
EV: established | Data loggers have become standard in ecological fieldwork for recording continuous environmental data.
T: Data logger | An electronic device that records measurements automatically over time
T: Turbidity | The cloudiness of water caused by suspended particles
T: Conductivity | A measure of water's ability to conduct electricity, reflecting dissolved ions
SUM: Measure light, temperature, soil, water and air conditions.
SUM: Calibrate, repeat and use data loggers.
SUM: Link abiotic and biotic data.
SRC: Sutherland W. J. (ed), Ecological Census Techniques: A Handbook, 2nd edition, Cambridge University Press | secondary | 2006
SRC: Field Studies Council, Fieldwork techniques: measuring abiotic factors | guidance | 2023 | https://www.field-studies-council.org/
Q: How is soil moisture content measured? | Weigh the soil, dry it to constant mass, reweigh, and calculate the percentage mass lost.
Q: Why use data loggers? | They record conditions continuously, capturing variation that single readings miss.
M1#ecology-u09-12-q1@1: Which instrument measures light intensity? | A light meter | An anemometer | A clinometer | A pH meter | Light meters give readings of light intensity in lux.
NUM2#ecology-u09-12-q2@2: A float travels 12 m in 30 s. What is the flow rate, in m/s? | 0.4 | 0.01 | m/s | Speed = 12 ÷ 30 = 0.4 m/s.
M2#ecology-u09-12-q3@2: Why should soil be dried to constant mass when measuring moisture? | To make sure all the water has been removed | To burn off organic matter as well | To kill the soil animals for counting | To increase the mass of the sample | Constant mass shows no more water is being lost.
M3#ecology-u09-12-q4@3: Why should abiotic readings be taken at the same points as quadrats? | So that conditions can be linked to species abundance at each point | So that fewer quadrats are needed overall | So that the readings are always higher | So that statistical tests become unnecessary | Paired data allow correlation between factors and species.
SA3#ecology-u09-12-q5@2,3: Explain how you would make light intensity measurements reliable in a woodland study. | Use the same calibrated light meter, held at the same height and angle for every reading. Take readings as close together in time as possible, ideally in stable weather, and record cloud cover. Take several readings at each point and calculate a mean. Alternatively, use data loggers placed simultaneously at each site to record over time. | Same instrument and height ; Close in time ; Weather recorded ; Repeats and means ; Data loggers

## Types of data and variables
LV: Introductory · Foundation
S: The type of data collected determines how it can be presented and analysed. This lesson distinguishes qualitative and quantitative data, discrete and continuous data, and nominal, ordinal and interval data, and explains independent and dependent variables.
O: Classify data as qualitative or quantitative, discrete or continuous
O: Distinguish nominal, ordinal and interval or ratio data
O: Identify independent, dependent and control variables
PRE: Hypotheses and null hypotheses
H: Kinds of data
- **Qualitative** (categorical) data describe qualities, such as colour or species name.
- **Quantitative** data are numerical.
- **Discrete** data take whole values, such as numbers of individuals.
- **Continuous** data can take any value in a range, such as length or temperature.
H: Levels of measurement
- **Nominal**: categories with no order, such as habitat type or species.
- **Ordinal**: ranked categories, such as ACFOR scores or rankings.
- **Interval and ratio**: measured on a scale with equal intervals, such as temperature or mass; ratio data have a true zero.
- The level of measurement guides the choice of graph and statistical test: chi-squared for nominal frequencies, Spearman's rank or Mann–Whitney for ordinal data, and t-tests for normally distributed interval data.
H: Variables
P: The **independent variable** is the one the investigator changes or chooses (such as distance from a path); the **dependent variable** is measured in response (such as plant cover). **Control variables** are kept constant or recorded so they do not confound the result. In observational field studies, many variables cannot be controlled, so they should be measured and considered.
X: Classifying data in a study.
> A student compares mosses on north- and south-facing walls.
> Wall aspect (north or south) is nominal and the independent variable.
> Moss cover (%) is continuous and the dependent variable.
> An ACFOR score for a lichen is ordinal; the number of species per quadrat is discrete.
K: Data may be qualitative or quantitative, discrete or continuous, and nominal, ordinal or interval; the type guides graphs and statistical tests; identify independent, dependent and control variables.
!: Using a mean for nominal data. Categories such as habitat type have no numerical average; use counts or proportions.
EV: established | Levels of measurement are a standard framework for choosing appropriate statistical methods.
T: Ordinal data | Data that can be ranked but without equal intervals between ranks
T: Continuous data | Data that can take any value within a range
T: Dependent variable | The variable measured to see whether it responds to changes in the independent variable
SUM: Qualitative or quantitative; discrete or continuous.
SUM: Nominal, ordinal, interval or ratio.
SUM: Independent, dependent and control variables.
SRC: Dytham C., Choosing and Using Statistics: A Biologist's Guide, 3rd edition, Wiley-Blackwell | secondary | 2011
SRC: Stevens S. S., "On the theory of scales of measurement", Science 103(2684), 677–680 | primary | 1946
Q: What is the difference between discrete and continuous data? | Discrete data take whole values; continuous data can take any value in a range.
Q: Give an example of ordinal data in ecology. | ACFOR or DAFOR abundance scores.
M1#ecology-u09-13-q1@1: Which is continuous data? | Leaf length in millimetres | Number of snails in a quadrat | Species name | Habitat type | Length can take any value within a range.
M2#ecology-u09-13-q2@2: In a study of plant height at different distances from a hedge, which is the dependent variable? | Plant height | Distance from the hedge | Species of hedge | Time of day | Height is measured in response to distance.
M3#ecology-u09-13-q3@3: Which type of data are ACFOR scores? | Ordinal | Nominal | Ratio | Continuous | They can be ranked but the gaps between categories are not equal.
MATCH1#ecology-u09-13-q4@2: Match each example to its type of data. | Habitat type = Nominal ; DAFOR score = Ordinal ; Temperature in °C = Interval ; Mass in grams = Ratio | Levels of measurement guide analysis.
SA2#ecology-u09-13-q5@1,3: Explain why identifying the type of data is important before choosing a statistical test. | Statistical tests make assumptions about data. Nominal counts need tests of frequencies, such as chi-squared. Ordinal data, or data not normally distributed, need non-parametric tests based on ranks, such as Spearman's rank or Mann–Whitney U. Interval or ratio data that are normally distributed can use parametric tests such as the t-test. Using the wrong test can give invalid conclusions. | Test assumptions ; Nominal ; Ordinal and non-parametric ; Interval and parametric ; Invalid conclusions

## Descriptive statistics
LV: Introductory · Application
S: Descriptive statistics summarise a set of data. This lesson covers measures of central tendency and spread, how to choose between them, and how to present data with appropriate graphs.
O: Calculate the mean, median, mode and range
O: Choose appropriate measures of average and spread for a data set
O: Select suitable graphs for different types of data
PRE: Types of data and variables
H: Measures of average
- **Mean**: sum of values divided by the number of values; uses all the data but is affected by extreme values.
- **Median**: middle value when data are ordered; resistant to outliers and suits skewed or ordinal data.
- **Mode**: most frequent value; suits nominal data.
H: Measures of spread
- **Range**: highest minus lowest; simple but affected by extremes.
- **Interquartile range (IQR)**: the range of the middle 50% of data; resistant to outliers; used with the median.
- **Standard deviation**: average spread around the mean; used with the mean (covered in the next lesson).
H: Graphs
P: Choose graphs by data type: **bar charts** for categories, **histograms** for the distribution of continuous data, **scatter graphs** for relationships between two variables, **box plots** to compare medians and spread, and **kite diagrams** for transects. Error bars show variability or confidence. Axes should be labelled with units and graphs given clear titles.
X: Summarising a sample.
> Numbers of snails in five quadrats: 4, 7, 7, 9, 13.
> Mean = 40 ÷ 5 = 8; median = 7; mode = 7.
> Range = 13 − 4 = 9.
> The mean is higher than the median because of the large value of 13, showing slight right skew.
K: The mean, median and mode summarise the centre of data, and the range, IQR and standard deviation its spread; choose measures and graphs to suit the data type and distribution.
!: Using the mean for strongly skewed data. The median better represents the typical value when there are extreme values.
EV: established | Descriptive statistics and graph choice follow standard conventions in biological statistics.
T: Median | The middle value of ordered data
T: Interquartile range | The range of the middle half of the data, between the lower and upper quartiles
T: Histogram | A graph showing the frequency distribution of continuous data
SUM: Mean, median and mode describe the centre.
SUM: Range, IQR and standard deviation describe spread.
SUM: Match the graph to the data.
SRC: Dytham C., Choosing and Using Statistics: A Biologist's Guide, 3rd edition, Wiley-Blackwell | secondary | 2011
SRC: Ennos R. and Johnson M., Statistical and Data Handling Skills in Biology, 4th edition, Pearson | secondary | 2018
Q: When is the median preferred to the mean? | When data are skewed or contain outliers, or are ordinal.
Q: Which graph shows the relationship between two continuous variables? | A scatter graph.
M1#ecology-u09-14-q1@1: What is the mode of 3, 5, 5, 6, 9? | 5 | 3 | 5.6 | 6 | The mode is the most frequent value; 5 appears twice.
NUM2#ecology-u09-14-q2@2: What is the mean of 12, 15, 18, 21, 24? | 18 | 0.05 | – | The values sum to 90, so the mean = 90 ÷ 5 = 18.
M2#ecology-u09-14-q3@2: Which graph is best for comparing the numbers of four bird species? | A bar chart | A scatter graph | A histogram | A line graph of time | Bar charts compare separate, named categories such as species.
M3#ecology-u09-14-q4@3: A data set has one very large outlier. Which measures of average and spread are most suitable? | The median and interquartile range | The mean and range | The mode and range | The mean and standard deviation only | The median and IQR are resistant to outliers.
SA3#ecology-u09-14-q5@2,3: Explain how to choose between the mean and median to summarise invertebrate counts that include many zeros and a few very large catches. | Such counts are strongly right-skewed. The mean is pulled upwards by the few large catches and may not represent a typical sample, while the median is resistant to extreme values and better reflects the typical count. Report the median with the interquartile range, and display the data with a box plot or histogram. | Skewed counts ; Mean affected by extremes ; Median resistant ; IQR ; Suitable graph

## Standard deviation and standard error
LV: Introductory · Application
S: Standard deviation describes how spread out data are, and standard error describes how precisely a sample mean estimates the population mean. This lesson shows how to calculate both and how to use them with error bars and confidence intervals.
O: Calculate the standard deviation of a sample
O: Calculate the standard error of the mean and explain what it shows
O: Interpret error bars and approximate 95% confidence intervals
PRE: Descriptive statistics
H: Standard deviation
E: s = √[Σ(x − x̄)^{2} ÷ (n − 1)] :: sample standard deviation
- s measures the typical distance of values from the mean.
- For roughly normal data, about 68% of values lie within one standard deviation of the mean and about 95% within two.
- Dividing by n − 1 rather than n gives a better estimate of the population's spread from a sample.
H: Standard error
E: SE = s ÷ √n :: standard error of the mean
- The **standard error** shows how much sample means would vary between samples.
- It shrinks as the sample size grows, so larger samples give more precise estimates of the mean.
- An approximate **95% confidence interval** for the mean is the mean ± about 2 × SE (more precisely, using a value from the t distribution for small samples).
H: Error bars
P: Graphs often show means with **error bars** of ±1 standard deviation (to show spread) or ±1 SE or 95% confidence intervals (to show precision). Always state which is used. If 95% confidence intervals of two means do not overlap, the difference is likely to be significant; overlapping bars do not settle the question, so a statistical test is still needed.
X: Calculating s and SE.
> Snail counts: 4, 7, 7, 9, 13; mean = 8.
> Deviations: −4, −1, −1, 1, 5; squares: 16, 1, 1, 1, 25; sum = 44.
> s = √(44 ÷ 4) = √11 = 3.32.
> SE = 3.32 ÷ √5 = 3.32 ÷ 2.24 = 1.48.
K: Standard deviation measures spread of data around the mean; standard error (s/√n) measures the precision of the mean and shrinks with larger samples; error bars must say whether they show SD, SE or confidence intervals.
!: Confusing standard deviation with standard error. SD describes variability in the data; SE describes uncertainty in the mean.
EV: established | The standard error of the mean decreases in proportion to the square root of sample size.
T: Standard deviation | A measure of the spread of data around the mean
T: Standard error | The standard deviation of the sampling distribution of the mean, estimated by s/√n
T: Confidence interval | A range likely to contain the true population mean, often at 95%
SUM: s measures spread; SE = s/√n measures precision.
SUM: Larger samples give smaller SE.
SUM: State what error bars represent.
SRC: Dytham C., Choosing and Using Statistics: A Biologist's Guide, 3rd edition, Wiley-Blackwell | secondary | 2011
SRC: Cumming G., Fidler F. and Vaux D. L., "Error bars in experimental biology", Journal of Cell Biology 177(1), 7–11 | secondary | 2007
Q: How is the standard error of the mean calculated? | Divide the standard deviation by the square root of the sample size.
Q: What percentage of values lie within two standard deviations of the mean in a normal distribution? | About 95%.
M1#ecology-u09-15-q1@1: What does a large standard deviation indicate? | The data are widely spread around the mean | The mean is very precise | The sample size is very large | All values are the same | A large SD means individual values vary a lot from the mean.
NUM2#ecology-u09-15-q2@2: A sample of 16 has a standard deviation of 8. What is the standard error? | 2 | 0.01 | – | SE = 8 ÷ √16 = 8 ÷ 4 = 2.
M2#ecology-u09-15-q3@2: What happens to the standard error if the sample size is quadrupled? | It halves | It doubles | It stays the same | It quadruples | SE depends on 1/√n, and √4 = 2, so the standard error halves.
M3#ecology-u09-15-q4@3: Two means have 95% confidence intervals that do not overlap. What is the best conclusion? | The difference is likely to be statistically significant | The means are certainly equal | The data must contain errors | No conclusion about difference is possible | Non-overlapping 95% CIs usually indicate a significant difference.
SA3#ecology-u09-15-q5@2,3: Explain the difference between standard deviation and standard error and when to show each on a graph. | Standard deviation describes the variability of individual measurements around the mean and does not shrink much as sample size increases. Standard error describes how precisely the sample mean estimates the population mean and shrinks with larger samples. Show SD to communicate spread in the data; show SE or 95% confidence intervals to compare means. Always label which is shown. | SD meaning ; SE meaning ; Effect of sample size ; When to use each ; Labelling

## Choosing a statistical test
LV: Introductory · Evaluation
S: The right statistical test depends on the question, the type of data and its distribution. This lesson gives a simple framework for choosing between common tests used in ecology.
O: Identify whether a question asks about difference, correlation or association
O: Distinguish parametric from non-parametric tests
O: Choose an appropriate test for a given ecological investigation
PRE: Standard deviation and standard error
H: What is the question?
- **Difference** between two groups: is the mean or median different? Use a **t-test** (parametric) or **Mann–Whitney U** test (non-parametric).
- **Correlation** between two variables measured on the same samples: use **Spearman's rank** (non-parametric) or Pearson's correlation (parametric).
- **Association** between categories, or difference between observed and expected frequencies: use the **chi-squared** test.
H: Parametric or non-parametric?
- **Parametric** tests (such as the t-test) assume data are measured on an interval or ratio scale and approximately **normally distributed**, with similar variances.
- **Non-parametric** tests (such as Mann–Whitney U and Spearman's rank) use ranks, make fewer assumptions and suit ordinal, skewed or small samples, but are slightly less powerful when parametric assumptions hold.
- Check the distribution with a histogram before choosing.
H: A decision guide
P: Ask: what kind of question? What type of data: counts in categories, ranks or measurements? Are the data normally distributed? Are the samples independent or paired? Then choose the test, state the null hypothesis, calculate the statistic, compare it with the critical value at p = 0.05 with the right degrees of freedom or sample size, and interpret it ecologically. Plan the test before collecting data, so that the sampling design suits it.
X: Choosing tests.
> Is limpet shell height different on exposed and sheltered shores (normally distributed, 20 each)? Unpaired t-test.
> Is moss cover correlated with distance from a stream along a transect? Spearman's rank.
> Is a beetle species associated with woodland rather than grassland (presence or absence counts)? Chi-squared.
> Do ACFOR scores of a plant differ between grazed and ungrazed sites? Mann–Whitney U.
K: Choose the test by question (difference, correlation or association), data type and distribution: t-test or Mann–Whitney U for differences, Spearman's rank for correlation, and chi-squared for associations of frequencies.
!: Using a t-test on ordinal scores or very skewed data. Use a non-parametric test such as Mann–Whitney U instead.
EV: established | Guides to choosing statistical tests by question and data type are standard in biological statistics texts.
T: Parametric test | A test that assumes data follow a particular distribution, usually normal
T: Non-parametric test | A test based on ranks that makes fewer assumptions about distribution
T: Degrees of freedom | A number used with some tests to find the correct critical value, related to sample size
SUM: Difference, correlation or association.
SUM: Parametric needs normal interval data; non-parametric uses ranks.
SUM: Plan the test before collecting data.
SRC: Dytham C., Choosing and Using Statistics: A Biologist's Guide, 3rd edition, Wiley-Blackwell | secondary | 2011
SRC: Ennos R. and Johnson M., Statistical and Data Handling Skills in Biology, 4th edition, Pearson | secondary | 2018
Q: Which test examines association between categorical variables? | The chi-squared test.
Q: What is the main assumption of the t-test about data? | That data are interval or ratio and approximately normally distributed, with similar variances.
M1#ecology-u09-16-q1@1: Which test looks for correlation between two ranked variables? | Spearman's rank correlation | Chi-squared test | Unpaired t-test | Mann–Whitney U test | Spearman's rank tests for a monotonic relationship using ranks.
M2#ecology-u09-16-q2@2: Which test compares DAFOR scores between two sites? | Mann–Whitney U test | Unpaired t-test | Pearson's correlation | Chi-squared goodness of fit | Ordinal data need a non-parametric test of difference.
M3#ecology-u09-16-q3@3: A student measures leaf width in sun and shade, but the data are strongly skewed. Which test is best? | Mann–Whitney U test | Unpaired t-test | Spearman's rank test | Chi-squared test | Skewed data violate the t-test's normality assumption.
MATCH2#ecology-u09-16-q4@2: Match each question to its test. | Are two means different (normal data)? = t-test ; Is there a correlation? = Spearman's rank ; Is a species associated with a habitat? = Chi-squared ; Are two medians different? = Mann–Whitney U | The question determines the test.
SA3#ecology-u09-16-q5@1,3: Plan the statistical analysis for an investigation into whether ivy cover on trees is related to tree trunk girth. | The question is about correlation between two variables measured on the same trees. Ivy cover (%) and girth (cm) may not be normally distributed, so use Spearman's rank correlation. H_{0}: there is no correlation between girth and ivy cover. Sample at least 10 trees chosen randomly, rank each variable, calculate r_{s} and compare with the critical value at p = 0.05 for that n. Interpret direction and strength, remembering correlation is not causation. | Correlation question ; Spearman's choice ; Null hypothesis ; Sample and calculation ; Interpretation

## The chi-squared test
LV: Introductory · Application
S: The chi-squared test compares observed frequencies with those expected under a null hypothesis. This lesson explains how to calculate chi-squared for goodness of fit and for association in a contingency table, and how to interpret it.
O: Calculate expected frequencies for a contingency table
O: Calculate the chi-squared statistic and degrees of freedom
O: Interpret chi-squared results against critical values
PRE: Choosing a statistical test
H: When to use it
- Data are **counts (frequencies)** in categories, not means or percentages.
- Use **goodness of fit** to compare observed counts with expected ratios, such as a 3:1 ratio.
- Use a **test of association** (contingency table) to see whether two categorical variables are linked, such as a species and a habitat.
- Expected frequencies should generally be at least 5.
H: Calculation
E: χ^{2} = Σ (O − E)^{2} ÷ E :: chi-squared statistic, from observed (O) and expected (E) frequencies
E: Expected = (row total × column total) ÷ grand total :: expected frequency for a contingency table cell
- **Degrees of freedom**: (rows − 1) × (columns − 1) for a contingency table, or (categories − 1) for goodness of fit.
- Compare χ^{2} with the **critical value** at p = 0.05: for 1 degree of freedom it is **3.84**; for 2, 5.99; for 3, 7.81.
H: Interpretation
P: If χ^{2} is greater than or equal to the critical value, reject the null hypothesis of no association: the observed pattern is unlikely to be due to chance. If it is smaller, there is no significant association. A significant association does not show which factor causes it, and the test says nothing about why.
X: A beetle and two habitats.
> In 40 shaded and 40 open quadrats, a beetle is present in 30 shaded and 10 open quadrats.
> Totals: present 40, absent 40, grand total 80. Every expected value = 40 × 40 ÷ 80 = 20.
> χ^{2} = (30 − 20)^{2}/20 + (10 − 20)^{2}/20 + (10 − 20)^{2}/20 + (30 − 20)^{2}/20 = 4 × 5 = 20.
> Degrees of freedom = 1; 20 is greater than 3.84, so reject H_{0}: the beetle is significantly associated with shade.
K: Chi-squared compares observed and expected counts: χ^{2} = Σ(O − E)^{2}/E; expected values come from row and column totals; compare with the critical value for the degrees of freedom (3.84 for 1 df at p = 0.05).
!: Running chi-squared on percentages or means. The test requires raw frequency counts.
EV: established | Pearson introduced the chi-squared test in 1900, and it remains standard for categorical data.
T: Chi-squared test | A test comparing observed and expected frequencies in categories
T: Contingency table | A table of counts classified by two categorical variables
T: Expected frequency | The count predicted in a category if the null hypothesis is true
SUM: For counts in categories.
SUM: χ^{2} = Σ(O − E)^{2}/E; df = (r − 1)(c − 1).
SUM: Reject H_{0} if χ^{2} ≥ critical value.
SRC: Pearson K., "On the criterion that a given system of deviations from the probable in the case of a correlated system of variables is such that it can be reasonably supposed to have arisen from random sampling", Philosophical Magazine, Series 5, 50(302), 157–175 | primary | 1900
SRC: Dytham C., Choosing and Using Statistics: A Biologist's Guide, 3rd edition, Wiley-Blackwell | secondary | 2011
Q: How many degrees of freedom does a 2 × 3 contingency table have? | (2 − 1) × (3 − 1) = 2.
Q: What is the critical value of chi-squared for 1 degree of freedom at p = 0.05? | 3.84.
M1#ecology-u09-17-q1@1: What type of data does the chi-squared test use? | Frequency counts in categories | Means of continuous measurements | Percentages of cover | Ranks of ordinal data | Chi-squared requires raw frequency counts, not means or percentages.
NUM2#ecology-u09-17-q2@2: In a 2 × 2 table, a cell's row total is 30, column total is 50 and grand total is 100. What is the expected frequency? | 15 | 0.1 | – | Expected = 30 × 50 ÷ 100 = 15.
M2#ecology-u09-17-q3@2: A chi-squared test with 2 degrees of freedom gives 4.2. What is the conclusion at p = 0.05? | Not significant, as 4.2 is below 5.99 | Significant, as 4.2 is above 3.84 | Significant, as any value above 1 is significant | The test cannot be used | The critical value for 2 df is 5.99, and 4.2 is below it.
M3#ecology-u09-17-q4@3: Why should expected frequencies generally be at least 5? | Small expected values make the test unreliable | Larger values make the test easier to calculate | The test only works with even numbers | Small values always give significant results | Very small expected values inflate χ^{2} and distort conclusions.
SA3#ecology-u09-17-q5@2,3: A student finds 60 red and 40 yellow flowers and wants to test whether this fits a 1:1 ratio. Carry out and interpret the test. | Expected = 50 each. χ^{2} = (60 − 50)^{2}/50 + (40 − 50)^{2}/50 = 2 + 2 = 4.0. Degrees of freedom = 2 − 1 = 1; critical value 3.84. Since 4.0 > 3.84, reject the null hypothesis: the flowers do not fit a 1:1 ratio at p = 0.05. The excess of red flowers is unlikely to be due to chance alone. | Expected values ; Calculation ; Degrees of freedom ; Comparison ; Conclusion

## Spearman's rank correlation
LV: Introductory · Application
S: Spearman's rank correlation tests whether two variables measured on the same samples tend to increase or decrease together. This lesson explains how to rank data, calculate the coefficient and interpret it.
O: Rank paired data and calculate Spearman's rank correlation coefficient
O: Interpret the strength and direction of a correlation
O: Test significance using critical values and explain the limits of correlation
PRE: Choosing a statistical test
H: When to use it
- Two variables measured on the same sampling units, such as light intensity and plant height in each quadrat.
- Data can be ordinal or not normally distributed; the relationship should be **monotonic** (consistently increasing or decreasing).
- At least about 7 to 10 pairs are needed for a useful test.
H: Calculation
E: r_{s} = 1 − [6Σd^{2} ÷ n(n^{2} − 1)] :: Spearman's rank correlation coefficient, where d is the difference in ranks and n the number of pairs
- Rank each variable separately (tied values share the average rank).
- Find d for each pair, square it and add.
- r_{s} ranges from −1 (perfect negative) through 0 (none) to +1 (perfect positive).
H: Interpretation
P: Compare the absolute value of r_{s} with the **critical value** for n at p = 0.05 (for example, about 0.65 for n = 10). If |r_{s}| is greater than or equal to the critical value, reject the null hypothesis of no correlation. A significant correlation shows the variables are related, not that one causes the other: a third factor may explain both.
X: Light and plant height.
> Light intensity and plant height are measured in 10 quadrats and ranked.
> The sum of squared rank differences is Σd^{2} = 30.
> r_{s} = 1 − (6 × 30) ÷ (10 × 99) = 1 − 180 ÷ 990 = 1 − 0.18 = 0.82.
> 0.82 exceeds the critical value of about 0.65 for n = 10, so there is a significant positive correlation.
K: Spearman's rank tests monotonic correlation between paired variables: r_{s} = 1 − 6Σd^{2}/n(n^{2} − 1); compare |r_{s}| with the critical value for n; correlation does not prove causation.
!: Ranking both variables together. Each variable is ranked separately, then rank differences are calculated for each pair.
EV: established | Spearman introduced rank correlation in 1904, and it is widely used for non-normal ecological data.
T: Correlation | A relationship in which two variables tend to change together
T: Spearman's rank coefficient | A measure of the strength and direction of a monotonic relationship using ranks
T: Monotonic relationship | One in which a variable consistently increases or decreases as the other increases
SUM: Rank each variable separately; sum d^{2}.
SUM: r_{s} from −1 to +1.
SUM: Significant correlation is not causation.
SRC: Spearman C., "The proof and measurement of association between two things", American Journal of Psychology 15(1), 72–101 | primary | 1904
SRC: Ennos R. and Johnson M., Statistical and Data Handling Skills in Biology, 4th edition, Pearson | secondary | 2018
Q: What does r_{s} = −0.9 indicate? | A strong negative correlation: as one variable increases, the other decreases.
Q: How are tied values ranked? | They share the average of the ranks they would occupy.
M1#ecology-u09-18-q1@1: What does r_{s} = 0 indicate? | No correlation | A perfect positive correlation | A perfect negative correlation | A significant difference between means | A coefficient of zero means there is no monotonic relationship.
NUM2#ecology-u09-18-q2@3: For n = 8 pairs with Σd^{2} = 12, what is r_{s}, to two decimal places? | 0.86 | 0.01 | – | r_{s} = 1 − 72 ÷ (8 × 63) = 1 − 72 ÷ 504 = 1 − 0.14 = 0.86.
M2#ecology-u09-18-q3@2: Values of 12, 15, 15 and 20 are ranked from smallest. What rank do the two 15s receive? | 2.5 each | 2 and 3 | 2 each | 3 each | Tied values share the average of ranks 2 and 3.
M3#ecology-u09-18-q4@3: Plant height correlates strongly with soil depth. Why can't we conclude that soil depth causes taller plants? | Another factor, such as moisture, may affect both | Correlation always proves causation | The sample size is always too small | Spearman's rank cannot detect correlation | A confounding factor could explain the relationship.
SA3#ecology-u09-18-q5@2,3: Explain how to carry out and interpret a Spearman's rank test of the relationship between distance from a footpath and plant species richness. | Measure distance and species richness at each of at least 10 quadrats. State H_{0}: no correlation. Rank distances and richness separately, find d and d^{2} for each pair and calculate r_{s} = 1 − 6Σd^{2}/n(n^{2} − 1). Compare |r_{s}| with the critical value for n at p = 0.05. A significant positive value suggests richness increases away from the path, but trampling, soil compaction or other factors might be responsible. | Data collection ; Null hypothesis ; Ranking and calculation ; Critical value ; Causal caution

## The t-test
LV: Introductory · Application
S: The t-test compares the means of two groups of normally distributed data. This lesson explains when to use the unpaired t-test, how to calculate it and how to interpret the result.
O: State the assumptions of the unpaired t-test
O: Calculate t from means, standard deviations and sample sizes
O: Interpret t using degrees of freedom and critical values
PRE: Standard deviation and standard error
H: When to use it
- To test whether the **means** of two independent groups differ, such as leaf length in sun and shade.
- Data should be interval or ratio, **approximately normally distributed**, with similar variances.
- A **paired** t-test is used when measurements are naturally paired, such as the same plants before and after treatment.
H: Calculation
E: t = (x̄_{1} − x̄_{2}) ÷ √(s_{1}^{2}/n_{1} + s_{2}^{2}/n_{2}) :: unpaired t-test statistic
- **Degrees of freedom** = n_{1} + n_{2} − 2.
- Compare the absolute value of t with the **critical value** at p = 0.05 (two-tailed); for 18 degrees of freedom it is about **2.10**.
H: Interpretation
P: If |t| is greater than or equal to the critical value, reject the null hypothesis of no difference in means. A larger difference between means, smaller variability and larger samples all make t larger. If data are clearly not normal, use the Mann–Whitney U test instead. Report the means, standard deviations and the size of the difference, not just significance.
X: Leaves in sun and shade.
> Sun leaves: mean 50 mm, s = 6, n = 10. Shade leaves: mean 58 mm, s = 8, n = 10.
> Standard error of the difference = √(36/10 + 64/10) = √10 = 3.16.
> t = (58 − 50) ÷ 3.16 = 2.53; degrees of freedom = 18.
> 2.53 exceeds 2.10, so reject H_{0}: shade leaves are significantly longer.
K: The unpaired t-test compares means of two independent, normally distributed samples: t = difference in means divided by the combined standard error, with n_{1} + n_{2} − 2 degrees of freedom.
!: Using an unpaired t-test for paired measurements. Before-and-after data on the same individuals need a paired test.
EV: established | The t-test was published in 1908 by W. S. Gosset under the pseudonym "Student".
T: t-test | A parametric test comparing two means
T: Paired data | Two measurements linked to the same individual or unit
T: Two-tailed test | A test that looks for a difference in either direction
SUM: Compares two means of normal data.
SUM: t = difference ÷ combined SE; df = n_{1} + n_{2} − 2.
SUM: Reject H_{0} if |t| ≥ critical value.
SRC: Student, "The probable error of a mean", Biometrika 6(1), 1–25 | primary | 1908
SRC: Dytham C., Choosing and Using Statistics: A Biologist's Guide, 3rd edition, Wiley-Blackwell | secondary | 2011
Q: How many degrees of freedom has an unpaired t-test with samples of 12 and 15? | 12 + 15 − 2 = 25.
Q: When should a paired t-test be used? | When measurements are naturally paired, such as the same individuals before and after a treatment.
M1#ecology-u09-19-q1@1: What does the unpaired t-test compare? | The means of two independent groups | The medians of ranked data | Counts in categories | The correlation between two variables | It tests for a difference between two means.
NUM2#ecology-u09-19-q2@2: Two groups of 8 and 10 are compared with an unpaired t-test. How many degrees of freedom are there? | 16 | 0 | – | df = 8 + 10 − 2 = 16.
M2#ecology-u09-19-q3@2: Which change makes a t-test more likely to show a significant difference? | Larger samples with the same means and spread | Greater variability in each group | Smaller samples in each group | A smaller difference between means | Larger samples reduce the standard error, increasing t.
M3#ecology-u09-19-q4@3: The same 12 trees have lichen cover measured before and after a pollution change. Which test is best for normal data? | Paired t-test | Unpaired t-test | Chi-squared test | Spearman's rank | Measurements are paired on the same trees.
SA3#ecology-u09-19-q5@2,3: A t-test comparing mean limpet size on two shores gives t = 1.5 with 18 degrees of freedom. Interpret this result and suggest improvements to the study. | The critical value at p = 0.05 for 18 df is about 2.10; 1.5 is smaller, so H_{0} is not rejected and there is no significant difference. This may be because there is no real difference, or because variability was high or the samples too small (Type II error). Increasing sample size, sampling at matched shore heights to reduce variation, and replicating across several shores of each type would improve the study. | Compare with critical value ; Not significant ; Possible Type II error ; Larger samples ; Controlled sampling

## The Mann–Whitney U test
LV: Introductory · Application
S: The Mann–Whitney U test compares two independent samples without assuming normal distributions. This lesson explains how to rank the data, calculate U and interpret it.
O: Explain when the Mann–Whitney U test is appropriate
O: Rank combined data and calculate U
O: Interpret U using critical values, remembering that smaller U is more significant
PRE: The t-test
H: When to use it
- To test whether two **independent** samples differ in their central values (medians).
- Suitable for **ordinal** data, such as ACFOR scores, and for skewed or non-normal measurements.
- Samples can be of different sizes, ideally at least about 5 each.
H: Calculation
- Combine both samples and **rank** all values from smallest to largest, giving tied values the average rank.
- Add the ranks for each sample: R_{1} and R_{2}.
E: U_{1} = n_{1}n_{2} + n_{1}(n_{1} + 1)/2 − R_{1} :: U for sample 1
- U_{2} = n_{1}n_{2} − U_{1}; the test statistic U is the **smaller** of U_{1} and U_{2}.
H: Interpretation
P: Unlike most tests, the result is significant if U is **less than or equal to** the critical value. For two samples of 5 at p = 0.05 (two-tailed), the critical value is 2. A small U means the ranks of one sample are mostly lower than the other, indicating a difference. The test is slightly less powerful than a t-test for normal data but more robust when assumptions fail.
X: Lichen scores at two sites.
> Site A scores: 3, 5, 6, 8, 9. Site B scores: 10, 12, 13, 15, 16.
> Ranking all ten values, site A has ranks 1 to 5: R_{1} = 15.
> U_{1} = 25 + 15 − 15 = 25; U_{2} = 25 − 25 = 0, so U = 0.
> 0 is less than the critical value of 2, so the difference between sites is significant.
K: The Mann–Whitney U test compares two independent samples using ranks; calculate U from the rank sums and take the smaller value; it is significant when U is less than or equal to the critical value.
!: Treating a large U as significant. For this test, smaller values of U indicate a stronger difference.
EV: established | The Mann–Whitney U test, published in 1947, is the standard non-parametric alternative to the unpaired t-test.
T: Mann–Whitney U test | A non-parametric test comparing two independent samples using ranks
T: Rank sum | The total of the ranks for one sample
T: Critical value | The threshold value of a test statistic for significance at a chosen level
SUM: For two independent, non-normal or ordinal samples.
SUM: Rank all values, sum ranks, calculate U.
SUM: Significant if U ≤ critical value.
SRC: Mann H. B. and Whitney D. R., "On a test of whether one of two random variables is stochastically larger than the other", Annals of Mathematical Statistics 18(1), 50–60 | primary | 1947
SRC: Ennos R. and Johnson M., Statistical and Data Handling Skills in Biology, 4th edition, Pearson | secondary | 2018
Q: When is the Mann–Whitney U result significant? | When the calculated U is less than or equal to the critical value.
Q: How are the data ranked in a Mann–Whitney test? | Both samples are combined and ranked together from smallest to largest.
M1#ecology-u09-20-q1@1: Which test is a non-parametric alternative to the unpaired t-test? | Mann–Whitney U test | Chi-squared test | Spearman's rank | Paired t-test | It compares two independent samples using ranks.
NUM2#ecology-u09-20-q2@2: Two samples of 6 have U_{1} = 30. What is U? | 6 | 0 | – | U_{2} = 36 − 30 = 6, and U is the smaller value, 6.
M2#ecology-u09-20-q3@3: For n_{1} = n_{2} = 8, the critical U is 13. A test gives U = 18. What is concluded? | No significant difference, as 18 is above 13 | A significant difference, as 18 is above 13 | The samples must be identical | The test cannot be used with these sizes | Significance requires U at or below the critical value.
M3#ecology-u09-20-q4@2: Why is Mann–Whitney suitable for comparing ACFOR scores? | ACFOR scores are ordinal and can be ranked but not averaged meaningfully | ACFOR scores are always normally distributed | ACFOR scores are counts in categories | ACFOR scores are paired measurements | Ordinal scores suit a rank-based, non-parametric test like Mann–Whitney.
SA3#ecology-u09-20-q5@2,3: Compare the t-test and Mann–Whitney U test for comparing two samples of invertebrate counts. | The t-test compares means and assumes interval data that are approximately normal with similar variances; it is more powerful when these hold. Invertebrate counts are often skewed with many zeros, violating normality, so the Mann–Whitney U test, which compares ranks and medians without assuming normality, is more appropriate. It is robust to outliers but slightly less powerful with normal data. | t-test assumptions ; Skewed counts ; Mann–Whitney robustness ; Power trade-off ; Recommendation

## Remote sensing and GIS
LV: Introductory · Application
S: Satellites, aircraft and drones collect data on ecosystems across whole landscapes, and geographic information systems (GIS) analyse them. This lesson explains remote sensing, vegetation indices such as NDVI, and how GIS supports ecology and conservation.
O: Describe the main sources of remote sensing data used in ecology
O: Explain how NDVI measures vegetation from satellite data
O: Describe uses of GIS for mapping, analysis and conservation planning
PRE: Measuring abiotic factors
H: Remote sensing
- **Satellites**, such as the Landsat series (since 1972) and the European Sentinel-2 satellites, measure reflected light in several wavelength bands across the globe, repeatedly.
- **Aircraft** and **drones** give finer detail over smaller areas.
- **LiDAR** uses laser pulses to map vegetation height and structure, and ground elevation.
- Remote sensing allows mapping of land cover, deforestation, wildfires, flooding and changes over decades.
H: Vegetation indices
E: NDVI = (NIR − Red) ÷ (NIR + Red) :: normalised difference vegetation index from near-infrared and red reflectance
- Healthy green vegetation absorbs red light for photosynthesis and strongly reflects **near-infrared**, so NDVI is high (approaching +1) over dense vegetation, near 0 over bare soil and negative over water.
- NDVI tracks seasonal growth, drought stress and changes in productivity.
H: GIS
P: A **geographic information system** stores, analyses and displays spatial data in **layers**, such as habitat maps, species records, roads, rivers and protected areas. Ecologists use GIS to measure habitat fragmentation, model species distributions from records and environmental data, plan wildlife corridors and choose sites for surveys or protection. Remote sensing needs **ground-truthing**: field checks that confirm what the images show.
X: Calculating NDVI.
> A pixel reflects 0.50 of near-infrared and 0.10 of red light.
> NDVI = (0.50 − 0.10) ÷ (0.50 + 0.10) = 0.40 ÷ 0.60 = 0.67.
> This high value indicates dense, healthy vegetation.
> A bare-soil pixel with NIR 0.25 and red 0.20 gives NDVI = 0.05 ÷ 0.45 = 0.11.
K: Remote sensing from satellites, aircraft, drones and LiDAR maps ecosystems at large scales; NDVI uses red and near-infrared reflectance to measure vegetation; GIS combines spatial layers for analysis and planning, checked by ground-truthing.
!: Treating satellite maps as fully accurate. Classifications need ground-truthing, as similar-looking habitats can be confused.
EV: established | NDVI has been used to monitor vegetation from satellites since the 1970s and is one of the most widely used remote sensing indices.
T: Remote sensing | Collecting information about the Earth's surface from a distance, usually by satellites, aircraft or drones
T: NDVI | Normalised difference vegetation index, an indicator of green vegetation from red and near-infrared reflectance
T: Ground-truthing | Checking remote sensing interpretations with field observations
SUM: Satellites, drones and LiDAR map ecosystems.
SUM: NDVI measures vegetation greenness.
SUM: GIS layers support analysis and planning.
SRC: Tucker C. J., "Red and photographic infrared linear combinations for monitoring vegetation", Remote Sensing of Environment 8(2), 127–150 | primary | 1979
SRC: Pettorelli N., Satellite Remote Sensing and the Management of Natural Resources, Oxford University Press | secondary | 2019
Q: Why does healthy vegetation have a high NDVI? | It absorbs red light for photosynthesis and strongly reflects near-infrared light.
Q: What is ground-truthing? | Checking remote sensing interpretations against observations made on the ground.
M1#ecology-u09-21-q1@1: Which technology uses laser pulses to map vegetation height? | LiDAR | NDVI | A pitfall trap | A light meter | LiDAR measures distances with laser pulses to map structure.
NUM2#ecology-u09-21-q2@2: A pixel has NIR reflectance 0.60 and red reflectance 0.20. What is its NDVI? | 0.5 | 0.01 | – | NDVI = (0.60 − 0.20) ÷ (0.60 + 0.20) = 0.40 ÷ 0.80 = 0.5.
M2#ecology-u09-21-q3@2: What does a GIS allow ecologists to do? | Combine and analyse spatial data layers such as habitats and species records | Measure dissolved oxygen in a stream | Trap small mammals without a licence | Calculate the standard error of a mean | GIS integrates mapped information for analysis.
M3#ecology-u09-21-q4@3: Why must remote sensing habitat maps be ground-truthed? | Different habitats can look similar from above, so classifications need field checks | Satellites always produce perfect maps | Ground-truthing replaces the need for satellites | Field checks make maps less accurate | Field validation corrects misclassification.
SA3#ecology-u09-21-q5@2,3: Explain how remote sensing and GIS could help plan a wildlife corridor between two woodlands. | Satellite or aerial imagery and LiDAR map current land cover and vegetation structure between the woodlands. In a GIS, these layers are combined with species records, roads, rivers, land ownership and protected areas. Analysis identifies the shortest or least-resistant routes through suitable habitat and the gaps to restore. Field surveys ground-truth the maps before planting or management begins. | Imagery and LiDAR ; GIS layers ; Route analysis ; Gaps to restore ; Ground-truthing

## Environmental DNA
LV: Introductory · Application
S: Organisms shed DNA into water, soil and air, and ecologists can detect species from these traces. This lesson explains how environmental DNA (eDNA) surveys work, their uses and their limitations.
O: Explain what environmental DNA is and how it is sampled and analysed
O: Describe uses of eDNA, including detecting rare and invasive species
O: Evaluate the advantages and limitations of eDNA compared with traditional surveys
PRE: Freshwater sampling and biotic indices
H: What eDNA is
- Organisms leave DNA in their surroundings through skin cells, mucus, faeces, urine and gametes: **environmental DNA**.
- Samples of water, soil, sediment or even air are filtered or extracted in the field, avoiding contamination.
- In the laboratory, DNA is amplified by **PCR**. **Targeted** methods (qPCR) look for one species; **metabarcoding** sequences a short DNA "barcode" region to identify many species at once.
H: Uses
- Detecting **rare or elusive species**, such as great crested newts in ponds; eDNA surveys for this species have been accepted for licensing purposes in England since 2014.
- Early detection of **invasive species**, such as signal crayfish or quagga mussels.
- Surveying whole communities, such as fish in a lake or invertebrates in a river.
- **Citizen science** projects can collect samples using simple kits.
H: Limitations
P: eDNA shows presence but gives limited information on abundance, age or condition. DNA can persist for days to weeks or be carried downstream, so a positive result may not mean the species is present at that exact spot now. Contamination can cause **false positives**, while low DNA concentrations or poor sampling cause **false negatives**. Reference DNA libraries are incomplete for many groups. eDNA works best combined with traditional surveys.
X: A pond survey for newts.
> A volunteer collects 20 small water samples from around a pond and combines them, following a strict kit protocol.
> The sample is sent to a laboratory, where qPCR targets great crested newt DNA.
> Several replicates are positive, indicating the species is present.
> Because eDNA cannot give numbers, a traditional count may follow if population size is needed.
K: eDNA surveys detect species from DNA shed into water, soil or air, using targeted PCR or metabarcoding; they are sensitive and non-invasive, especially for rare and invasive species, but give limited abundance data and are prone to contamination and transport effects.
!: Assuming a positive eDNA result means the species lives at that exact location now. DNA can persist or drift from elsewhere.
EV: established | eDNA has been validated for detecting great crested newts and is used in UK licensing surveys.
T: Environmental DNA | DNA shed by organisms into their environment, collected from water, soil or air
T: Metabarcoding | Sequencing a standard DNA region from a mixed sample to identify many species
T: False negative | Failing to detect a species that is present
SUM: Organisms shed DNA into the environment.
SUM: Targeted PCR or metabarcoding identifies species.
SUM: Sensitive but limited on abundance; beware contamination.
SRC: Taberlet P., Coissac E., Hajibabaei M. and Rieseberg L. H., "Environmental DNA", Molecular Ecology 21(8), 1789–1793 | primary | 2012
SRC: Biggs J. et al., "Using eDNA to develop a national citizen science-based monitoring programme for the great crested newt (Triturus cristatus)", Biological Conservation 183, 19–28 | primary | 2015
Q: How do organisms leave eDNA in the environment? | Through skin cells, mucus, faeces, urine and gametes.
Q: What is the difference between targeted eDNA analysis and metabarcoding? | Targeted analysis looks for one species; metabarcoding identifies many species from a single sample.
M1#ecology-u09-22-q1@1: Which survey method detects species from traces of DNA in water? | Environmental DNA analysis | Pitfall trapping | Kick sampling with a net | Point quadrat sampling | eDNA identifies species from DNA shed into the environment.
M2#ecology-u09-22-q2@2: What is a major advantage of eDNA for rare species? | It can detect them without seeing or capturing them | It always gives exact population sizes | It never produces any false results | It works without any laboratory analysis | Non-invasive detection suits elusive or protected species.
M3#ecology-u09-22-q3@3: An eDNA sample from a river is positive for a fish species not found by netting. What is a possible explanation? | DNA may have drifted from upstream or persisted after the fish left | The netting must have caught every fish present | eDNA can never give false positives | Fish do not shed any DNA into water | Transport and persistence can produce detections away from the animal.
MATCH2#ecology-u09-22-q4@1: Match each term to its meaning. | eDNA = DNA shed into the environment ; qPCR = Detects one target species ; Metabarcoding = Identifies many species at once ; False positive = Detecting a species not present | Key terms in eDNA surveys.
SA3#ecology-u09-22-q5@2,3: Evaluate eDNA as a replacement for traditional freshwater invertebrate surveys. | eDNA can detect many taxa, including rare and hard-to-identify ones, from simple water samples, with less disturbance and less need for expert identification. But it gives little information on abundance, life stage or condition, which biotic indices rely on; reference libraries are incomplete; and contamination, persistence and downstream transport affect interpretation. It is best used alongside traditional kick sampling rather than replacing it. | Sensitivity and ease ; Identification ; Abundance limits ; Contamination and transport ; Complementary use

## Citizen science
LV: Introductory · Evaluation
S: Members of the public collect large amounts of ecological data through citizen science projects. This lesson describes major UK schemes, the value of citizen science for research and conservation, and how data quality is managed.
O: Describe examples of citizen science schemes in UK ecology
O: Explain the scientific and social benefits of citizen science
O: Evaluate challenges of data quality and bias and how they are addressed
PRE: Sampling animals
H: Examples
- **RSPB Big Garden Birdwatch** (since 1979): hundreds of thousands of people count birds in gardens each January.
- **UK Butterfly Monitoring Scheme** (since 1976): volunteers walk fixed transects weekly in summer.
- **BTO Breeding Bird Survey**: volunteers survey randomly selected squares across the UK.
- **iNaturalist**, **iRecord** and the **National Biodiversity Network**: share species records with photographs for verification.
- eDNA kits, water quality testing and phenology recording (such as Nature's Calendar).
H: Benefits
- Data at **scales** of space and time that professional scientists could not achieve alone, revealing population trends and range shifts.
- Detects invasive species and diseases early.
- Engages people with nature, builds skills and supports conservation action and policy.
H: Data quality
P: Concerns include misidentification, uneven effort, and **bias** towards accessible places, weekends, attractive or easily identified species. Schemes manage these through standardised protocols, training and identification guides, photographs and **expert verification**, random site selection (as in the Breeding Bird Survey) and statistical methods that account for effort and bias. Well-designed citizen science can produce data as reliable as professional surveys for many purposes.
X: Tracking a decline.
> Breeding Bird Survey volunteers visit the same randomly chosen squares each spring.
> Over decades, counts reveal sharp declines in some farmland birds.
> Because sites are randomly selected and methods standardised, trends can be estimated reliably.
> The findings inform agri-environment schemes that pay farmers to provide habitat.
K: Citizen science schemes such as the Big Garden Birdwatch, Butterfly Monitoring Scheme and Breeding Bird Survey gather data at huge scales; standard protocols, verification and statistical correction manage bias and errors.
!: Dismissing citizen science data as unreliable. With good design and verification, it underpins many official biodiversity indicators.
EV: established | Long-running UK volunteer schemes provide data for official biodiversity indicators such as the wild bird indicator.
T: Citizen science | Public participation in scientific research, often collecting data
T: Verification | Expert checking of records, often using photographs, to confirm identification
T: Recording bias | Uneven data caused by differences in where, when and what volunteers record
SUM: UK schemes cover birds, butterflies and many other groups.
SUM: Benefits include scale and public engagement.
SUM: Protocols and verification manage data quality.
SRC: Silvertown J., "A new dawn for citizen science", Trends in Ecology and Evolution 24(9), 467–471 | secondary | 2009
SRC: British Trust for Ornithology, Breeding Bird Survey methods | guidance | 2024 | https://www.bto.org/our-science/projects/bbs
Q: Give two examples of UK citizen science schemes. | RSPB Big Garden Birdwatch, UK Butterfly Monitoring Scheme, BTO Breeding Bird Survey, iRecord or iNaturalist (any two).
Q: Why do schemes use expert verification? | To check identifications, often using photographs, and reduce errors.
M1#ecology-u09-23-q1@1: When did the RSPB Big Garden Birdwatch begin? | 1979 | 1999 | 2015 | 1948 | The scheme started in 1979 and has run every year since.
M2#ecology-u09-23-q2@2: Why does the Breeding Bird Survey use randomly selected squares? | To avoid bias towards favoured or accessible sites | To make surveys shorter for volunteers | To survey only the best bird habitats | To avoid the need for any training | Random selection makes trends representative.
M3#ecology-u09-23-q3@3: Which is the most serious bias in opportunistic species records? | More records come from accessible places and easily identified species | Volunteers never record common species at all | All records are made by professionals | Records are always evenly spread across the country | Recording effort is uneven, which statistical methods must correct.
MATCH2#ecology-u09-23-q4@2: Match each scheme to its focus. | Big Garden Birdwatch = Garden birds in January ; UK Butterfly Monitoring Scheme = Butterfly transects ; Breeding Bird Survey = Birds in random squares ; iRecord = Verified species records | Schemes focus on different groups and methods.
SA3#ecology-u09-23-q5@2,3: Evaluate the contribution of citizen science to monitoring biodiversity in the UK. | Citizen science provides long-term, large-scale data impossible for professionals alone, revealing declines in farmland birds and butterflies and spreading invasive species, and it informs official indicators and policy. Challenges include misidentification and uneven effort and coverage; these are reduced by standard protocols, random site selection, training, photographic verification and statistical correction. Overall it is a major and reliable contribution when well designed. | Scale and duration ; Policy impact ; Data quality issues ; Solutions ; Judgement
`;
