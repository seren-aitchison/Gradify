// EcoGradify Population Ecology (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## What is a population?
LV: Introductory · Foundation
S: A population is a group of individuals of one species living in the same area at the same time and able to interbreed. This lesson defines populations, explains why their boundaries are often a matter of judgement, and introduces the properties population ecologists measure.
O: Define a population and distinguish it from a species and a community
O: Explain why population boundaries depend on dispersal and the question being asked
O: List the main properties of a population studied in population ecology
PRE: Levels of ecological organisation
H: Defining a population
P: A **population** is all the individuals of one **species** in a defined area at a given time, which can potentially interbreed. A **community** is all the populations of different species living and interacting in an area.
P: Real boundaries are often fuzzy. Trout in one lake form a clear population because they can't easily move to another lake. Seabirds that feed across an ocean but breed on one island might be treated as one population, or several, depending on the question. Ecologists therefore define populations **operationally**: by the study area and by how much individuals move between areas.
X: Defining populations of a pond frog.
> Frogs breed in three ponds 2 km apart in farmland.
> Genetic and tagging data show adults rarely move between ponds.
> Each pond's frogs can be treated as a separate local population.
> Together they form a metapopulation, linked by occasional dispersal.
H: Properties of populations
- **Size** (N): the number of individuals.
- **Density**: individuals per unit area or volume.
- **Dispersion**: how individuals are spaced.
- **Age structure** and **sex ratio**.
- **Birth, death, immigration and emigration rates**, which together determine change in size.
- **Genetic structure**: the variety of alleles, which affects the ability to adapt.
P: Populations have properties that individuals don't: an individual is born and dies, but a population has a birth rate and a death rate.
K: A population is one species in one place at one time; its boundaries are set by how much individuals move and by the purpose of the study.
!: Calling all the animals in a habitat a population. Several species together form a community; a population is always a single species.
EV: established | Treating populations as defined by area and gene flow is the standard practice in ecology and conservation genetics.
EV: contested | For clonal organisms such as aspen groves or grasses, deciding what counts as an individual, and so how big the population is, remains debated.
T: Population | All the individuals of one species in a given area at a given time, able to interbreed
T: Community | All the populations of different species living and interacting in an area
T: Demography | The study of the size, structure and change of populations through births, deaths and movement
SUM: A population is one species, one area, one time.
SUM: Boundaries are set operationally by dispersal and research purpose.
SUM: Size, density, dispersion, age structure and vital rates are population-level properties.
SRC: Begon M., Townsend C. R. and Harper J. L., Ecology: From Individuals to Ecosystems, 4th edition, Blackwell | secondary | 2006
SRC: Molles M. C. and Sher A. A., Ecology: Concepts and Applications, 8th edition, McGraw-Hill | secondary | 2019
Q: What is the difference between a population and a community? | A population is one species in an area; a community is all the interacting populations of different species there.
Q: Why might two groups of the same species in one region count as separate populations? | Because individuals rarely move or interbreed between the groups.
M1#ecology-u02-01-q1@1: Which is a population? | All the red squirrels on the Isle of Wight | All the animals in a woodland | All the birds of every species in a city park | All the organisms in a pond | A population is a single species in a defined area; the others include several species.
M2#ecology-u02-01-q2@2: Salmon from one river return to breed there and rarely stray to other rivers. How should they be treated? | As a separate population from salmon in other rivers | As part of one global salmon population with no structure | As a community | As a separate species | Fidelity to the home river limits gene flow, so each river's salmon form a distinct population.
M3#ecology-u02-01-q3@3: An ecologist counts a grass that spreads by underground runners. What is the main difficulty in measuring population size? | Deciding what counts as an individual, since many shoots may be one genetic clone | Grass can't be counted because it moves | Grasses have no birth or death rates | Grasses don't belong to species | In clonal plants, many shoots (ramets) can belong to one genetic individual (genet), so population size depends on the unit chosen.
TF1#ecology-u02-01-q4@1: A population has properties, such as a birth rate, that a single individual doesn't have. | true | Birth rates, death rates, density and age structure only exist at the level of the group.
SA2#ecology-u02-01-q5@2,3: Explain how an ecologist might decide the boundaries of a population of a mobile bird species. | By studying movement and gene flow: tagging, tracking or genetic data show how often birds move and breed between areas. Where exchange is rare, groups can be treated as separate populations; where it is frequent, as one. The definition also depends on the research or management question. | Movement or tracking data ; Gene flow or interbreeding ; Rare exchange means separate populations ; Depends on the question

## Population size and density
LV: Introductory · Foundation
S: Population size is how many individuals there are; density is how many there are per unit area or volume. This lesson explains direct counts and sampling with quadrats and transects, absolute and relative measures, and the difference between crude and ecological density.
O: Distinguish population size from density and crude from ecological density
O: Estimate density from quadrat samples
O: Evaluate methods of measuring population size for different organisms
PRE: What is a population?
H: Size and density
P: **Population size** (N) is the total number of individuals. **Density** is N divided by area or volume, such as 12 limpets per m^{2} or 300 copepods per litre.
- **Crude density** uses the total area.
- **Ecological density** uses only the area of suitable habitat. A bird with 100 pairs in 10 km^{2} of farmland but only 2 km^{2} of hedgerow has a crude density of 10 pairs per km^{2} but an ecological density of 50 pairs per km^{2} of hedgerow.
H: Measuring it
- **Total counts**: possible for large, conspicuous animals (elephants from aircraft, seals on haul-out beaches) or small areas.
- **Quadrats**: square frames placed at random, for plants and slow-moving animals. Density per quadrat is scaled up to the whole area.
- **Transects**: lines along which samples are taken, useful where conditions change along a gradient.
- **Mark–release–recapture** and **distance sampling** for mobile animals.
- **Relative indices**: droppings, calls, nests or catch per unit effort, useful for comparing places or years when absolute counts are impossible.
X: Estimating daisies on a 50 m × 40 m field.
> Ten 1 m^{2} quadrats placed at random give 4, 7, 2, 5, 6, 3, 8, 5, 4, 6 daisies.
> Mean density = 50 ÷ 10 = 5 daisies per m^{2}.
> Field area = 50 × 40 = 2,000 m^{2}.
> Estimated population = 5 × 2,000 = 10,000 daisies.
K: Density is size per unit area; sampling methods such as quadrats estimate it from a random subset, and the estimate is scaled to the whole area.
!: Placing quadrats where the organisms look most common. Non-random placement biases the estimate; random coordinates or a systematic grid avoid this.
EV: established | Random quadrat sampling gives unbiased density estimates when enough quadrats are used and they are placed at random.
EV: contested | Relative indices such as dropping counts assume a constant relationship with true abundance, which often varies with season and habitat.
T: Density | The number of individuals per unit area or volume
T: Ecological density | The number of individuals per unit area of suitable habitat
T: Quadrat | A square frame of known area used to sample organisms
SUM: Size is the total number; density is size per unit area or volume.
SUM: Quadrats and transects sample sessile or slow organisms; counts and indices suit others.
SUM: Random sampling and enough samples are needed for a reliable estimate.
SRC: Sutherland W. J. (ed.), Ecological Census Techniques: A Handbook, 2nd edition, Cambridge University Press | secondary | 2006
SRC: Begon M., Townsend C. R. and Harper J. L., Ecology: From Individuals to Ecosystems, 4th edition, Blackwell | secondary | 2006
Q: What is crude density? | The number of individuals per unit of total area, whether or not it is suitable habitat.
Q: Why are quadrats placed at random? | To avoid bias, so the sample represents the whole area.
M1#ecology-u02-02-q1@1: Which method suits estimating the density of a plant on a meadow? | Random quadrat sampling | Mark–release–recapture | Counting calls at night | Aerial counts | Plants don't move, so quadrats placed at random give a direct estimate of density.
M2#ecology-u02-02-q2@2: Five 0.25 m^{2} quadrats contain 3, 1, 2, 4 and 0 snails. What is the mean density per m^{2}? | 8 per m^{2} | 2 per m^{2} | 10 per m^{2} | 0.5 per m^{2} | The mean is 10 ÷ 5 = 2 snails per 0.25 m^{2}, which is 2 × 4 = 8 per m^{2}.
M3#ecology-u02-02-q3@3: Two woods have the same number of dormice, but in wood A only half the area has hazel scrub. What follows? | Ecological density is higher in wood A, though crude density is the same | Crude density is higher in wood A | Both woods have identical ecological density | Wood A must have more dormice | With the same number and total area, crude density is equal, but dormice in A are packed into half the habitat, doubling ecological density.
TF1#ecology-u02-02-q4@1: Population size and density mean the same thing. | false | Size is a total count; density divides that count by area or volume.
SA2#ecology-u02-02-q5@2,3: Compare the use of total counts and sampling to estimate population size. | Total counts are accurate for large, visible animals in small or open areas but are expensive and impossible for small, hidden or numerous organisms. Sampling, such as random quadrats, is quicker and cheaper and can cover large areas, but gives an estimate with sampling error that depends on random placement and sample size. | Total count strengths ; Total count limitations ; Sampling strengths ; Sampling error or bias

## Dispersion patterns
LV: Introductory · Application
S: Dispersion is how individuals are spaced within a population's range. This lesson explains clumped, uniform and random patterns, what causes each, and how the variance-to-mean ratio of quadrat counts tests which pattern is present.
O: Describe clumped, uniform and random dispersion and their causes
O: Use the variance-to-mean ratio to classify a dispersion pattern
O: Explain why dispersion depends on the scale of observation
PRE: Population size and density
H: Three patterns
- **Clumped** (aggregated): individuals grouped together. The most common pattern, caused by patchy resources, social behaviour (herds, shoals) or limited seed dispersal.
- **Uniform** (regular): individuals evenly spaced. Caused by competition or territoriality, such as nesting gannets keeping pecking distance or desert shrubs competing for water.
- **Random**: position of one individual is independent of others. Rare; occurs when resources are uniform and there is little interaction, as with some dandelions from wind-dispersed seed.
H: Testing the pattern
P: If counts in random quadrats follow a random (Poisson) distribution, the **variance equals the mean**. So the ratio of variance to mean (s^{2}/x̄) indicates the pattern:
E: s^{2}/x̄ ≈ 1 :: random
E: s^{2}/x̄ > 1 :: clumped
E: s^{2}/x̄ < 1 :: uniform
X: Counts of a beetle in eight quadrats: 0, 0, 6, 1, 0, 8, 0, 1.
> Mean = 16 ÷ 8 = 2.
> Squared deviations: 4, 4, 16, 1, 4, 36, 4, 1; sum = 70.
> Sample variance = 70 ÷ (8 − 1) = 10.
> Variance-to-mean = 10 ÷ 2 = 5, well above 1: the beetles are clumped.
K: Dispersion is clumped, uniform or random; comparing the variance and mean of quadrat counts tests which, with a ratio above 1 indicating clumping.
!: Forgetting scale. Gannets are uniformly spaced within a colony, but colonies are clumped along coasts. The pattern you find depends on quadrat size and study area.
EV: established | Clumped dispersion is the most common pattern in nature.
EV: established | The variance-to-mean ratio is a standard test of dispersion, though significance should be checked statistically.
T: Dispersion | The spatial pattern of individuals within a population
T: Clumped dispersion | A pattern in which individuals are aggregated in groups
T: Territoriality | Defence of an area against other individuals, which tends to produce uniform spacing
SUM: Clumped patterns come from patchy resources and social grouping; uniform from competition; random from independence.
SUM: A variance-to-mean ratio above 1 suggests clumping, below 1 uniformity.
SUM: Dispersion depends on the scale of observation.
SRC: Krebs C. J., Ecological Methodology, 2nd edition, Addison-Wesley | secondary | 1999
SRC: Molles M. C. and Sher A. A., Ecology: Concepts and Applications, 8th edition, McGraw-Hill | secondary | 2019
Q: What is the most common dispersion pattern in nature? | Clumped.
Q: What causes uniform dispersion? | Interactions that push individuals apart, such as territoriality or competition for resources.
M1#ecology-u02-03-q1@1: Which pattern describes a herd of wildebeest? | Clumped | Uniform | Random | Regular | Social groups such as herds produce clumped dispersion.
M2#ecology-u02-03-q2@2: Quadrat counts of a shrub have a mean of 4 and a variance of 1.2. What pattern is suggested? | Uniform | Clumped | Random | It can't be judged | A variance-to-mean ratio of 0.3 is well below 1, which suggests regular spacing, as from competition for water.
M3#ecology-u02-03-q3@3: Penguins are evenly spaced within each colony, yet a survey of the whole coastline shows strong clumping. What explains this? | Dispersion depends on scale: uniform within colonies, clumped between them | The survey must be wrong | Penguins switch patterns daily | Uniform and clumped are the same pattern | Pecking-distance spacing gives uniformity at small scale; colonies at suitable sites give clumping at large scale.
SEQ1#ecology-u02-03-q4@2: Order the steps for testing dispersion. | Place quadrats at random ; Count individuals in each ; Calculate mean and variance ; Compare variance-to-mean ratio with 1 | The ratio is only meaningful if the counts come from randomly placed quadrats.
SA2#ecology-u02-03-q5@2,3: A student finds the variance-to-mean ratio of a woodland orchid is 3.2. Interpret this and suggest causes. | A ratio well above 1 suggests clumped dispersion. Possible causes include patchy soil conditions or light gaps, seeds that fall close to the parent, and dependence on patchily distributed fungal partners. A significance test should confirm the result. | Interprets as clumped ; Patchy habitat cause ; Limited dispersal cause ; Notes need for significance testing or scale

## Estimating population size: mark–release–recapture
LV: Introductory · Application
S: Mark–release–recapture estimates the size of a mobile animal population from the proportion of marked animals in a second sample. This lesson derives the Lincoln–Petersen estimate, works examples, and sets out the assumptions behind it.
O: Calculate population size using the Lincoln–Petersen estimate
O: State the assumptions of mark–release–recapture
O: Evaluate how violating the assumptions biases the estimate
PRE: Population size and density
H: The method
P: Capture a sample of animals, mark them harmlessly and release them. After they have mixed back into the population, take a second sample. The proportion of marked animals in the second sample estimates the proportion marked in the whole population.
E: N = (M × C) ÷ R :: M marked in the first sample, C caught in the second, R recaptured (marked) in the second
P: This is the **Lincoln–Petersen** estimate. With small samples, the **Chapman** version, N = ((M + 1)(C + 1) ÷ (R + 1)) − 1, reduces bias.
X: Woodlice under logs.
> First sample: 40 caught and marked with a dot of non-toxic paint (M = 40).
> Second sample, two days later: 50 caught (C = 50), of which 8 are marked (R = 8).
> N = (40 × 50) ÷ 8 = 250 woodlice.
> Check: 8 out of 50 is 16%, and 40 is 16% of 250.
H: Assumptions
- The population is **closed**: no births, deaths, immigration or emigration between samples.
- Marks are **not lost** and don't affect survival or behaviour.
- Marked animals **mix randomly** back into the population.
- Every animal has an **equal chance of capture** in each sample.
K: Mark–release–recapture estimates N from the proportion marked in a second sample; it is only valid if the population is closed, marks persist and every animal is equally catchable.
!: Ignoring trap-happy or trap-shy animals. If marked animals return to bait (trap-happy), R is too high and N is underestimated; if they avoid traps (trap-shy), N is overestimated.
EV: established | The Lincoln–Petersen estimator is unbiased for large samples when its assumptions hold; Chapman's correction is preferred for small samples.
EV: established | Open-population models such as Jolly–Seber relax the closure assumption for long studies.
T: Lincoln–Petersen estimate | N = (M × C) ÷ R, the basic mark–release–recapture estimate of population size
T: Closed population | A population with no births, deaths, immigration or emigration during the study
T: Trap-happy | Describes animals that become more likely to be caught after a first capture
SUM: N = M × C ÷ R, from the proportion of marked animals recaptured.
SUM: The estimate assumes closure, persistent harmless marks, mixing and equal catchability.
SUM: Violations bias the estimate in predictable directions.
SRC: Krebs C. J., Ecological Methodology, 2nd edition, Addison-Wesley | secondary | 1999
SRC: Chapman D. G., "Some properties of the hypergeometric distribution with applications to zoological sample censuses", University of California Publications in Statistics 1, 131–160 | primary | 1951
Q: What does R stand for in the Lincoln–Petersen estimate? | The number of marked animals recaptured in the second sample.
Q: Why must marks not make animals more visible to predators? | Marked animals would die faster, so fewer would be recaptured and N would be overestimated.
M1#ecology-u02-04-q1@1: 30 voles are marked; a second sample of 40 contains 6 marked voles. What is N? | 200 | 180 | 120 | 240 | Using N = MC ÷ R: N = 30 × 40 ÷ 6 = 1,200 ÷ 6 = 200 voles.
M2#ecology-u02-04-q2@2: Marked crickets lose their paint marks before the second sample. How is the estimate affected? | N is overestimated because R is too low | N is underestimated because R is too high | N is unaffected | N becomes exactly the first sample | Lost marks make recaptured animals look unmarked, so R falls and N = MC/R rises.
M3#ecology-u02-04-q3@3: Marked mice learn that traps contain food and are recaptured more often than unmarked mice. What is the effect? | Underestimate, because R is inflated | Overestimate, because R is too small | No effect, because all mice are mice | Overestimate, because C is too large | Trap-happy animals inflate R relative to the true proportion marked, so N = MC/R is too low.
TF1#ecology-u02-04-q4@1: The Lincoln–Petersen method assumes no animals enter or leave the population between samples. | true | This is the closure assumption; births, deaths and movement break the link between the sample proportion and the population proportion.
SA2#ecology-u02-04-q5@3: Evaluate the use of mark–release–recapture to estimate the population of a migratory fish in a river over a three-month study. | The method can work for mobile animals that are hard to count, but over three months the population is unlikely to be closed: fish migrate in and out, and some die or are born. Tags may be lost and handling may affect survival. An open-population model, short sampling interval or study timed outside migration would give a more reliable estimate. | Method suits mobile animals ; Closure assumption violated ; Mark loss or handling effects ; Suggests improvement

## Births, deaths, immigration and emigration
LV: Introductory · Foundation
S: Populations change through four processes: births and immigration add individuals; deaths and emigration remove them. This lesson sets out the basic population equation, per capita rates, and how to calculate a population's growth rate.
O: Write and use the basic equation of population change
O: Calculate per capita birth, death and growth rates
O: Distinguish open and closed populations and the role of movement
PRE: What is a population?
H: The population equation
E: N_{t+1} = N_{t} + B − D + I − E :: the population next time equals this time plus births and immigrants, minus deaths and emigrants
P: **B** and **D** are births and deaths; **I** and **E** are immigration and emigration. A **closed** population has no movement, so only B and D matter; most real populations are **open**.
H: Per capita rates
P: Dividing by population size gives per capita (per individual) rates, which allow populations of different sizes to be compared.
- Per capita birth rate b = B ÷ N.
- Per capita death rate d = D ÷ N.
- Per capita rate of increase r = b − d (in a closed population).
X: A rabbit population on an island.
> Start of year: N = 400. Births: 240. Deaths: 160. No movement.
> b = 240 ÷ 400 = 0.6; d = 160 ÷ 400 = 0.4.
> r = 0.6 − 0.4 = 0.2 per year, a 20% increase.
> Next year's population: 400 + 240 − 160 = 480.
K: Change in population size is births plus immigration minus deaths and emigration; per capita rates allow comparison and give the growth rate r = b − d.
!: Treating a constant number of births as a constant birth rate. If the population grows and the per capita rate stays the same, the number of births rises each year.
EV: established | The balance of births, deaths and movement (the BIDE model) is the foundation of demography.
EV: established | In many species, especially birds and mammals, dispersal (I and E) strongly affects local population trends.
T: Per capita rate | A rate expressed per individual in the population
T: Open population | A population in which individuals can enter or leave through migration
T: Intrinsic rate of increase | The per capita rate of increase under ideal conditions, written r
SUM: N changes by B − D + I − E.
SUM: Per capita rates are rates per individual; r = b − d.
SUM: Movement matters in open populations.
SRC: Gotelli N. J., A Primer of Ecology, 4th edition, Sinauer | secondary | 2008
SRC: Begon M., Townsend C. R. and Harper J. L., Ecology: From Individuals to Ecosystems, 4th edition, Blackwell | secondary | 2006
Q: What does a closed population lack? | Immigration and emigration: it changes only through births and deaths.
Q: How is the per capita birth rate calculated? | Number of births divided by population size.
M1#ecology-u02-05-q1@1: Which processes add individuals to a population? | Births and immigration | Births and emigration | Deaths and immigration | Deaths and emigration | Births and immigration add; deaths and emigration remove.
M2#ecology-u02-05-q2@2: A population of 1,000 has 120 births, 80 deaths, 30 immigrants and 50 emigrants in a year. What is its size next year? | 1,020 | 1,040 | 1,100 | 980 | Using N + B − D + I − E: 1,000 + 120 − 80 + 30 − 50 = 1,020.
M3#ecology-u02-05-q3@3: A woodland bird population stays steady even though the local death rate exceeds the birth rate. What best explains this? | Immigration from surrounding areas makes up the shortfall | The birth rate must be miscounted | Emigration exceeds immigration | Closed populations always remain stable | In an open population, immigrants can balance a local deficit. Such a population may be a sink sustained by source populations elsewhere.
TF1#ecology-u02-05-q4@1: If per capita births equal per capita deaths in a closed population, the population size stays constant. | true | Then r = b − d = 0, so the population neither grows nor shrinks.
SA2#ecology-u02-05-q5@2,3: Explain why per capita rates are more useful than total numbers of births when comparing populations. | Total births depend on how many individuals there are, so a large population can have many births while reproducing slowly. Per capita rates divide by population size, so they measure reproduction per individual and can be compared between populations of different sizes or across years. | Totals depend on size ; Per capita divides by N ; Allows fair comparison ; Example or link to growth rate

## Exponential growth
LV: Introductory · Application
S: With unlimited resources, a population grows at a constant per capita rate, so it increases faster and faster. This lesson sets out the exponential and geometric growth models, doubling time, and where such growth occurs in nature.
O: Describe exponential growth and the conditions that produce it
O: Use the exponential model and doubling time to calculate population size
O: Evaluate the exponential model as a description of real populations
PRE: Births, deaths, immigration and emigration
H: The model
P: If each individual has the same per capita rate of increase r regardless of population size, then the rate of change of N is proportional to N.
E: dN/dt = rN :: continuous exponential growth
E: N_{t} = N_{0}e^{rt} :: population after time t
E: Doubling time = ln 2 ÷ r ≈ 0.693 ÷ r
P: For species that breed in discrete seasons, the **geometric** model is used: N_{t+1} = λN_{t}, where λ (lambda) is the finite rate of increase per breeding season. λ > 1 means growth; λ < 1 means decline.
X: Bacteria with r = 0.7 per hour.
> Doubling time = 0.693 ÷ 0.7 ≈ 1 hour.
> Starting from 100 cells, after 10 hours N = 100 × e^{7} ≈ 110,000 cells.
> After 20 hours, about 120 million.
> The curve is J-shaped: slow at first, then explosive.
H: Where it happens
- Colonising species in new habitat: rabbits in Australia after 1859; collared doves spreading across Europe in the twentieth century.
- Recovery after a crash, such as some whale populations after protection.
- Microorganisms in fresh culture.
P: Exponential growth can only be temporary, because resources run out.
K: Exponential growth means a constant per capita rate and an ever-increasing absolute rate; it produces a J-shaped curve and can only continue while resources are effectively unlimited.
!: Confusing a constant growth rate with a constant number added each year. Exponential growth adds a constant proportion, so the number added rises every year.
EV: established | Populations introduced to favourable new habitats commonly show near-exponential growth for a period.
EV: established | No population can grow exponentially indefinitely; density-dependent limits eventually apply.
T: Exponential growth | Growth at a constant per capita rate, so the population increases by a constant proportion per unit time
T: Finite rate of increase (λ) | The ratio of population size in one time step to the previous step
T: Doubling time | The time for a population growing exponentially to double, ln 2 ÷ r
SUM: Under unlimited resources, dN/dt = rN.
SUM: Doubling time is about 0.693 ÷ r; the curve is J-shaped.
SUM: Real exponential growth is temporary.
SRC: Gotelli N. J., A Primer of Ecology, 4th edition, Sinauer | secondary | 2008
SRC: Hengeveld R., "The colonization of Europe by the collared dove", Biological Journal of the Linnean Society 34, 79–90 | primary | 1988
Q: What shape is an exponential growth curve? | J-shaped.
Q: What does λ < 1 mean? | The population is declining each breeding season.
M1#ecology-u02-06-q1@1: Which equation describes exponential growth? | dN/dt = rN | dN/dt = rN(1 − N/K) | N = M × C ÷ R | N_{t+1} = N_{t} − D | Exponential growth has a constant per capita rate r, so the rate of change is rN; the logistic equation adds the term (1 − N/K).
M2#ecology-u02-06-q2@2: A population has r = 0.035 per year. Roughly how long does it take to double? | About 20 years | About 35 years | About 2 years | About 70 years | Doubling time ≈ 0.693 ÷ 0.035 ≈ 19.8, about 20 years.
M3#ecology-u02-06-q3@3: A seabird colony of 500 grows with λ = 1.2 per year. What is its size after two years, and why isn't the increase 200? | 720, because growth compounds: 500 × 1.2 × 1.2 | 700, because 100 birds are added each year | 600, because λ applies only once | 1,000, because λ doubles the population | Geometric growth multiplies by λ each year: 500 → 600 → 720. The second year's increase (120) is larger because it applies to a bigger population.
TF1#ecology-u02-06-q4@1: In exponential growth, the number of individuals added per year increases over time. | true | A constant proportion of a growing population is a growing number.
SA2#ecology-u02-06-q5@2,3: Explain why rabbits introduced to Australia grew almost exponentially for decades, and why this couldn't continue. | Rabbits found abundant food and few predators or diseases adapted to them, so per capita birth rate far exceeded death rate and r stayed roughly constant. Eventually food limits, competition and introduced diseases such as myxomatosis raised death rates and lowered births, so growth slowed. | Abundant resources ; Few natural enemies ; Constant high r ; Limits eventually apply

## Logistic growth and carrying capacity
LV: Introductory · Application
S: As a population grows, resources per individual fall and growth slows towards a ceiling, the carrying capacity. This lesson sets out the logistic model, the S-shaped curve, maximum growth at half of K, and where the model works and fails.
O: Describe the logistic model and the meaning of carrying capacity
O: Calculate growth rates using the logistic equation
O: Evaluate the logistic model against real population data
PRE: Exponential growth
H: The logistic model
P: The **logistic model** (Verhulst, 1838; revived by Pearl and Reed, 1920) adds a brake to exponential growth. **Carrying capacity** (K) is the largest population the environment can sustain indefinitely.
E: dN/dt = rN(1 − N/K) :: growth slows as N approaches K
- When N is small, (1 − N/K) ≈ 1 and growth is nearly exponential.
- When N = K, (1 − N/K) = 0 and growth stops.
- If N > K, growth is negative and the population falls back.
P: The curve is **sigmoid** (S-shaped). The absolute growth rate is greatest at **N = K/2**.
X: A population with r = 0.4 per year and K = 1,000.
> At N = 100: dN/dt = 0.4 × 100 × 0.9 = 36 per year.
> At N = 500: dN/dt = 0.4 × 500 × 0.5 = 100 per year, the maximum.
> At N = 900: dN/dt = 0.4 × 900 × 0.1 = 36 per year.
> At N = 1,000: growth is zero.
H: How well it fits
P: Gause's (1934) cultures of *Paramecium* and Pearl's yeast cultures fitted logistic curves closely. Many wild populations don't: they **overshoot** K and oscillate, because of **time lags** between density and its effects on births and deaths, and because K itself changes with weather and resources.
K: Logistic growth slows as numbers approach carrying capacity K; growth is fastest at K/2 and stops at K.
!: Treating K as a fixed number for a species. Carrying capacity belongs to a population in a particular environment, and changes as food, space and weather change.
EV: established | Laboratory populations of microorganisms often follow logistic growth closely.
EV: contested | Many field populations show overshoot, cycles or noisy fluctuation rather than a smooth approach to K.
T: Carrying capacity | The maximum population size an environment can sustain indefinitely, written K
T: Logistic growth | Population growth that slows as size approaches carrying capacity, producing an S-shaped curve
T: Time lag | A delay between a change in density and its effect on birth or death rates
SUM: dN/dt = rN(1 − N/K): growth slows as N nears K.
SUM: Growth is fastest at K/2.
SUM: Time lags and a changing K make real populations overshoot and fluctuate.
SRC: Gause G. F., The Struggle for Existence, Williams and Wilkins | primary | 1934
SRC: Gotelli N. J., A Primer of Ecology, 4th edition, Sinauer | secondary | 2008
Q: At what population size is logistic growth fastest? | At half the carrying capacity, K/2.
Q: What happens to logistic growth when N exceeds K? | Growth becomes negative and the population declines towards K.
M1#ecology-u02-07-q1@1: What shape is the logistic growth curve? | S-shaped (sigmoid) | J-shaped | A straight line | U-shaped | Growth starts nearly exponential, slows and levels off at K, giving an S shape.
M2#ecology-u02-07-q2@2: For r = 0.5 and K = 200, what is dN/dt when N = 50? | 18.75 | 25 | 50 | 6.25 | 0.5 × 50 × (1 − 50/200) = 25 × 0.75 = 18.75 individuals per unit time.
M3#ecology-u02-07-q3@3: A deer population introduced to an island rises above the vegetation's capacity, then crashes and oscillates. Why does the logistic model fail here? | Time lags: deer keep breeding on past food supplies before overgrazing raises deaths | The logistic model only applies to plants | The deer must have zero r | K must be infinite on islands | The logistic model assumes density acts instantly. Delays between grazing damage and lower survival produce overshoot and oscillation.
TF1#ecology-u02-07-q4@1: Under the logistic model, growth rate is zero when N = K. | true | When N = K, the term (1 − N/K) is zero, so dN/dt = 0.
SA2#ecology-u02-07-q5@2,3: Compare exponential and logistic models of population growth. | Exponential growth assumes unlimited resources and constant per capita growth, giving a J-shaped curve with no ceiling. Logistic growth assumes per capita growth falls linearly as N rises, giving an S-shaped curve that levels at K. Exponential growth fits early colonisation; logistic fits populations limited by resources, though real ones often fluctuate. | Exponential: unlimited, J-curve ; Logistic: limited by K, S-curve ; Per capita rate constant vs declining ; Where each fits

## Density-dependent and density-independent factors
LV: Introductory · Application
S: Some factors that affect birth and death rates get stronger as a population becomes denser; others act regardless of density. This lesson defines both, gives examples, and explains why only density dependence can regulate a population.
O: Distinguish density-dependent and density-independent factors
O: Classify factors affecting real populations
O: Explain why population regulation requires density dependence
PRE: Logistic growth and carrying capacity
H: Two kinds of factor
- **Density-dependent factors** have effects that change with density: competition for food and territories, disease and parasites, predation, and the build-up of waste. As density rises, per capita birth rate falls or death rate rises.
- **Density-independent factors** affect the same proportion of the population whatever its density: severe frost, drought, floods, fire, storms.
H: Regulation
P: **Regulation** means a tendency to return to an equilibrium. Only density-dependent factors can do this, because only they change their strength in response to population size. Density-independent factors can cause large changes, but they don't push a population back towards a set level.
P: Density dependence can act on births (fewer eggs or smaller litters when crowded) or on deaths (more starvation, disease or predation), and it is often detected statistically as a negative relationship between density and the per capita growth rate that follows.
X: Great tits in Wytham Woods, Oxford.
> In years when breeding density is high, clutch size tends to fall and fewer young survive.
> This is density dependence acting through competition for food and territories.
> A severe winter kills a large share of birds whatever their density: density independence.
> Long-term monitoring since 1947 shows both act on the population.
K: Density-dependent factors strengthen as density rises and can regulate a population; density-independent factors act regardless of density and cause fluctuations but not regulation.
!: Classifying a factor by type rather than by effect. Weather can act density-dependently if, for example, only a limited number of sheltered roost sites protect birds from cold.
EV: established | Long-term studies of many vertebrates, including the Wytham great tits, show density-dependent reproduction and survival.
EV: contested | The historical debate between Nicholson (regulation by density dependence) and Andrewartha and Birch (dominance of weather) has been resolved largely by recognising that both act, with relative importance varying by species.
T: Density-dependent factor | A factor whose effect on per capita birth or death rate changes with population density
T: Density-independent factor | A factor whose effect on per capita rates is unrelated to population density
T: Population regulation | The tendency of a population to return towards an equilibrium size through density-dependent processes
SUM: Density-dependent factors include competition, disease and predation.
SUM: Density-independent factors include extreme weather and disasters.
SUM: Only density dependence can regulate a population.
SRC: Perrins C. M., "Population fluctuations and clutch-size in the great tit", Journal of Animal Ecology 34(3), 601–647 | primary | 1965
SRC: Turchin P., Complex Population Dynamics, Princeton University Press | secondary | 2003
Q: Give two density-dependent factors. | Any two of: competition, disease and parasites, predation, waste accumulation.
Q: Why can't density-independent factors regulate a population? | Their effect doesn't change with population size, so they can't push numbers back towards an equilibrium.
M1#ecology-u02-08-q1@1: Which is a density-independent factor? | A forest fire that kills the same proportion of every population | Competition among nesting pairs for a limited number of nest sites | Spread of a contagious disease that passes between crowded individuals | Predators switching to whichever prey species is currently most common | A fire kills regardless of density; the others intensify as density rises.
M2#ecology-u02-08-q2@2: Tuberculosis spreads faster in a dense badger population than a sparse one. How is it acting? | As a density-dependent factor | As a density-independent factor | As neither, because disease is random | As an abiotic factor | Contact between individuals rises with density, so transmission and death rates increase.
M3#ecology-u02-08-q3@3: A frost kills 90% of an aphid population every winter. A student says this regulates the aphids. What is the best response? | The frost causes large changes, but regulation requires an effect that changes with density | Correct, because any large mortality regulates a population | Correct, because frost is density-dependent | The frost can't affect aphids | Regulation needs a feedback with density. A fixed proportional kill doesn't return the population to a set level.
MATCH1#ecology-u02-08-q4@1: Match each factor to its type. | Hurricane = Density-independent ; Competition for food = Density-dependent ; Spread of parasites = Density-dependent ; Late spring frost = Density-independent | Competition and parasites strengthen with density; storms and frost usually don't.
SA2#ecology-u02-08-q5@3: Evaluate the view that weather, not density dependence, controls insect populations. | Weather often causes large changes in insect numbers, as Andrewartha and Birch argued, and may dominate year-to-year fluctuation. But without density-dependent factors such as competition, parasitoids and disease, populations would drift without limit. Most evidence shows both operate: weather drives fluctuation, density dependence provides regulation. | Weather's role in fluctuation ; Need for density dependence to regulate ; Both act ; Reasoned conclusion

## Population cycles and fluctuations
LV: Introductory · Evaluation
S: Some populations rise and fall in regular cycles; others fluctuate irregularly. This lesson examines the snowshoe hare and lynx cycle, lemmings and voles, red grouse, and the competing explanations: predation, food, delayed density dependence and parasites.
O: Describe regular population cycles with examples
O: Explain how delayed density dependence and predator–prey interactions can produce cycles
O: Evaluate competing explanations for the hare cycle
PRE: Density-dependent and density-independent factors
H: Cycles in nature
- **Snowshoe hare and Canada lynx**: an 8–11 year cycle, recorded in Hudson's Bay Company fur returns from the 1840s.
- **Lemmings and voles** in the Arctic and Fennoscandia: 3–5 year cycles.
- **Red grouse** in northern Britain: cycles of about 4–8 years in some moors.
P: Many populations fluctuate without regular cycles, driven by weather, food and chance.
H: Why cycles arise
P: Cycles need **delayed density dependence**: the effect of high density acts after a lag, so the population overshoots, then crashes below equilibrium.
- **Predator–prey interactions**: predators increase after prey increase, then cause prey to fall, then decline themselves. The Lotka–Volterra model produces such cycles in theory.
- **Food quality and quantity**: overbrowsing reduces food, raising starvation.
- **Parasites**: Hudson and colleagues reduced cycles in red grouse by treating birds against the nematode *Trichostrongylus tenuis* (1998).
X: The Kluane experiment in Yukon (Krebs and colleagues, 1986–1996).
> Plots were given extra food, fenced against mammal predators, or both.
> Extra food alone roughly tripled hare density; predator exclusion alone roughly doubled it.
> Food plus predator exclusion increased density about elevenfold.
> Conclusion: the hare cycle results from an interaction of food and predation, with predation dominant.
K: Cycles arise when density dependence acts with a delay; for the snowshoe hare, experiments show predation and food interact, with predation the main driver.
!: Reading the fur-trade data as proof that lynx alone drive the hare cycle. Hares cycle on islands without lynx, so other factors must also be involved.
EV: established | The snowshoe hare cycle is one of the best-documented population cycles in ecology.
EV: contested | Explanations for small-rodent cycles remain debated, including the roles of predators, food and stress.
T: Population cycle | A regular, repeated rise and fall in population size with a consistent period
T: Delayed density dependence | Density dependence that acts after a time lag, which can generate overshoot and cycles
T: Lotka–Volterra model | A pair of equations describing linked predator and prey populations that can produce cycles
SUM: Hares and lynx, voles and lemmings, and red grouse show regular cycles.
SUM: Cycles need delayed density dependence.
SUM: Field experiments show interacting causes, such as food and predation.
SRC: Krebs C. J. et al., "Impact of food and predation on the snowshoe hare cycle", Science 269(5227), 1112–1115 | primary | 1995
SRC: Hudson P. J., Dobson A. P. and Newborn D., "Prevention of population cycles by parasite removal", Science 282(5397), 2256–2258 | primary | 1998
Q: What is the approximate period of the snowshoe hare cycle? | About 8 to 11 years.
Q: What showed parasites can drive red grouse cycles? | Treating grouse against a parasitic nematode reduced or prevented the cycles.
M1#ecology-u02-09-q1@1: Which source provided the classic long-term data on lynx and hare numbers? | Hudson's Bay Company fur records | Satellite tracking | Gause's laboratory cultures | Mark–recapture of lynx | Records of furs traded from the 1840s onwards show regular peaks for both species.
M2#ecology-u02-09-q2@2: What condition is needed for regular cycles to arise? | Density dependence acting with a time lag | Purely density-independent mortality | Unlimited resources | No interaction with other species | A delay means populations overshoot equilibrium and then crash, producing repeated cycles.
M3#ecology-u02-09-q3@3: In the Kluane experiment, food plus predator exclusion raised hare density far more than either alone. What does this show? | Food and predation interact: neither alone explains the cycle | Food is the only cause of the cycle, and predators simply follow it | Predators have no measurable effect on hare numbers | Hare cycles are caused mainly by changes in winter weather | An effect much greater than the sum of single treatments indicates an interaction between the two factors.
TF1#ecology-u02-09-q4@1: Snowshoe hares cycle even on islands where lynx are absent. | true | This shows lynx predation can't be the sole cause; other predators, food and other factors play a part.
SA2#ecology-u02-09-q5@3: Evaluate the evidence that predation causes the snowshoe hare cycle. | Correlated hare and lynx peaks in fur records suggest predation, and the Kluane experiment showed predator exclusion raised hare density. But hares cycle where lynx are absent, food addition also had effects, and the combined treatment's huge effect shows food and predation interact. Predation is probably the main driver but not the only one. | Fur records correlation ; Experimental predator exclusion ; Counter-evidence: islands or food effects ; Conclusion on interaction

## Life tables and survivorship curves
LV: Introductory · Application
S: Life tables record how many individuals survive and die at each age. This lesson explains how to build a cohort life table, calculates survivorship and mortality, and interprets the three types of survivorship curve.
O: Construct and interpret a cohort life table
O: Calculate l_{x}, d_{x} and q_{x} from survival data
O: Describe Type I, II and III survivorship curves with examples
PRE: Births, deaths, immigration and emigration
H: Life tables
P: A **cohort life table** follows a group of individuals born at the same time until all have died. A **static life table** estimates the same thing from the ages at death, or ages present, at one time.
- **n_{x}**: number alive at the start of age x.
- **l_{x}**: survivorship, the proportion of the original cohort alive at age x (n_{x} ÷ n_{0}).
- **d_{x}**: number dying between age x and x + 1.
- **q_{x}**: age-specific mortality rate, d_{x} ÷ n_{x}.
X: A cohort of 1,000 annual plants.
> Age 0: 1,000 alive; 600 die. q_{0} = 600 ÷ 1,000 = 0.6.
> Age 1: 400 alive (l_{1} = 0.4); 200 die. q_{1} = 0.5.
> Age 2: 200 alive (l_{2} = 0.2); 150 die. q_{2} = 0.75.
> Age 3: 50 alive (l_{3} = 0.05); all 50 die.
H: Survivorship curves
P: Plotting log l_{x} against age gives a survivorship curve. Using a log scale makes a constant mortality rate a straight line. Pearl (1928) and Deevey (1947) described three types:
- **Type I**: low mortality until old age, then a steep drop. Humans in high-income countries, large mammals.
- **Type II**: a constant mortality rate, giving a straight line on a log scale. Many birds, some lizards.
- **Type III**: very high mortality early, then low. Oysters, many fish, many plants that produce huge numbers of seeds.
K: Life tables track survival and death by age; plotting log survivorship gives Type I (late death), Type II (constant risk) or Type III (early death) curves.
!: Plotting survivorship on an ordinary rather than logarithmic scale. Only on a log scale does a constant mortality rate appear as a straight line, which is how the curve types are defined.
EV: established | Survivorship curve types are a widely used way to summarise mortality patterns.
EV: contested | Many real species have curves that change type at different life stages, so the three types are idealisations.
T: Survivorship (l_{x}) | The proportion of a cohort still alive at age x
T: Age-specific mortality rate (q_{x}) | The proportion of individuals alive at age x that die before age x + 1
T: Cohort | A group of individuals born during the same time period
SUM: Life tables record n_{x}, l_{x}, d_{x} and q_{x}.
SUM: Survivorship curves plot log l_{x} against age.
SUM: Type I, II and III describe late, constant and early mortality.
SRC: Deevey E. S., "Life tables for natural populations of animals", Quarterly Review of Biology 22(4), 283–314 | primary | 1947
SRC: Begon M., Townsend C. R. and Harper J. L., Ecology: From Individuals to Ecosystems, 4th edition, Blackwell | secondary | 2006
Q: What is q_{x}? | The age-specific mortality rate: deaths between age x and x + 1 divided by the number alive at age x.
Q: Which survivorship type describes oysters? | Type III: very high mortality early in life.
M1#ecology-u02-10-q1@1: What does a Type II survivorship curve show? | A constant mortality rate throughout life | Most deaths occurring in old age | Most deaths occurring very early | No deaths until a fixed age | On a log scale, a constant rate of death gives a straight, diagonal line.
M2#ecology-u02-10-q2@2: In a cohort, 250 are alive at age 2 and 100 at age 3. What is q_{2}? | 0.6 | 0.4 | 150 | 0.25 | Deaths between 2 and 3 are 150, and q_{2} = 150 ÷ 250 = 0.6.
M3#ecology-u02-10-q3@3: A conservation team must choose whether to protect sea-turtle eggs or adult turtles. Turtles have Type III survivorship. Which reasoning is best? | Protecting adults may help more, because survivors to adulthood are few and each has high reproductive value | Protect only eggs, because most deaths happen there so that's where effort counts | Survivorship type is irrelevant to conservation | Protect neither, because Type III species can't decline | Models of loggerhead turtles (Crouse et al., 1987) showed adult and large-juvenile survival matters most to population growth, despite most deaths being early.
SEQ1#ecology-u02-10-q4@1: Order the steps in building a cohort life table. | Mark a group born at the same time ; Record how many are alive at each age ; Calculate deaths in each age interval ; Divide deaths by numbers alive to get q_{x} | A cohort table follows one group through time and derives mortality rates from counts at each age.
SA2#ecology-u02-10-q5@2,3: Explain why survivorship curves are plotted with a logarithmic scale and describe what Type I and Type III curves show. | A log scale shows proportional rates of loss, so a constant mortality rate gives a straight line and curves can be compared fairly whatever their starting size. Type I is flat then steep: most individuals live to old age. Type III falls steeply at first then flattens: most die young but survivors live long. | Log scale shows proportional change ; Constant rate gives straight line ; Type I described ; Type III described

## Life-history strategies: r and K selection
LV: Introductory · Application
S: A life-history strategy is how an organism allocates resources to growth, survival and reproduction over its life. This lesson covers trade-offs, the r–K continuum, its limits, and Grime's CSR scheme for plants.
O: Explain life-history trade-offs with examples
O: Compare r-selected and K-selected traits
O: Evaluate the r–K model and alternatives such as CSR
PRE: Logistic growth and carrying capacity
H: Trade-offs
P: Organisms have limited energy, so investing more in one thing means less for another. Key trade-offs include:
- **Number versus size of offspring**: many small eggs or few large young.
- **Current versus future reproduction**: breeding now may reduce survival to breed again.
- **Growth versus reproduction**: breeding early limits final size.
P: Lack (1947) argued that birds lay the clutch size that maximises the number of surviving young; larger broods are harder to feed.
H: The r–K continuum
P: MacArthur and Wilson (1967) and Pianka (1970) contrasted selection in unstable, uncrowded environments (**r-selection**, favouring rapid increase) with selection in stable, crowded ones (**K-selection**, favouring competitive ability near carrying capacity).
- **r-selected traits**: early maturity, many small offspring, little parental care, short life, Type III survivorship. Mice, annual weeds, many insects.
- **K-selected traits**: late maturity, few large offspring, much parental care, long life, Type I survivorship. Elephants, albatrosses, oaks.
X: Comparing two mammals.
> A house mouse breeds at about six weeks, has several litters a year of around six pups.
> An African elephant first calves at about 12 years, gestation lasts about 22 months, and calves are spaced several years apart.
> The mouse sits near the r end; the elephant near the K end.
> Most species lie between the extremes.
H: Beyond r and K
P: The r–K model is now seen as too simple. **Demographic** approaches focus on age-specific mortality: if adult mortality is high, early reproduction is favoured. For plants, **Grime's CSR** scheme recognises **competitors**, **stress tolerators** and **ruderals**.
K: Life histories are shaped by trade-offs; the r–K continuum contrasts fast reproduction in unstable habitats with competitive, long-lived strategies in stable ones, but is a simplification.
!: Treating r and K as categories every species fits. They are ends of a continuum, and some species combine traits from both ends, such as long-lived trees with huge seed output.
EV: established | Life-history trade-offs between number and size of offspring are found across many taxa.
EV: contested | The r–K selection model has weak predictive power; demographic life-history theory has largely replaced it (Reznick et al., 2002).
T: Life-history strategy | The pattern of resource allocation to growth, survival and reproduction over an organism's life
T: r-selection | Selection favouring rapid population increase in unstable or uncrowded environments
T: K-selection | Selection favouring competitive ability and survival in stable environments near carrying capacity
SUM: Limited resources force trade-offs in life history.
SUM: r-selected species breed fast and die young; K-selected species breed slowly and invest heavily.
SUM: The r–K model is a simplification; CSR and demographic theory add detail.
SRC: Pianka E. R., "On r- and K-selection", American Naturalist 104(940), 592–597 | primary | 1970
SRC: Reznick D., Bryant M. J. and Bashey F., "r- and K-selection revisited: the role of population regulation in life-history evolution", Ecology 83(6), 1509–1520 | primary | 2002
SRC: Grime J. P., "Evidence for the existence of three primary strategies in plants", American Naturalist 111(982), 1169–1194 | primary | 1977
Q: Name two traits of K-selected species. | Any two of: late maturity, few large offspring, high parental care, long lifespan, Type I survivorship.
Q: What are the three strategies in Grime's CSR scheme? | Competitors, stress tolerators and ruderals.
M1#ecology-u02-11-q1@1: Which organism is closest to the r-selected end of the continuum? | A dandelion | An elephant | A blue whale | A gorilla | Dandelions mature fast, produce many small seeds and colonise disturbed ground.
M2#ecology-u02-11-q2@2: A pair of great tits given extra eggs to raise rears fewer surviving chicks than pairs with normal clutches. What does this support? | Lack's idea that clutch size is set by how many young parents can feed | r-selection in great tits | That clutch size is random | That larger clutches always produce more offspring | Brood-enlargement experiments support the trade-off between number of young and their survival.
M3#ecology-u02-11-q3@3: An oak lives for centuries, matures late, yet produces tens of thousands of acorns a year with high early mortality. What does this show about the r–K model? | Species can combine traits from both ends, so r and K are a continuum, not categories | Oaks are purely r-selected | Oaks are purely K-selected | The r–K model applies only to animals | Long life and late maturity are K traits; huge output and early mortality are r traits. Real species mix them.
MATCH1#ecology-u02-11-q4@1: Match each trait to the strategy it is associated with. | Early maturity = r-selected ; Long lifespan = K-selected ; Many small offspring = r-selected ; High parental care = K-selected | These are the classic contrasting traits listed by Pianka.
SA2#ecology-u02-11-q5@2,3: Explain how trade-offs shape the number and size of offspring an organism produces. | Energy is limited, so producing more offspring means each gets fewer resources and smaller size or less care. Where juvenile survival depends on size or care, few large offspring are favoured; where it depends on chance and dispersal, many small ones are. Clutch-size experiments in birds show that more young can mean fewer survivors. | Limited energy ; Number versus size trade-off ; Environment determines best balance ; Supporting example

## Age structure
LV: Introductory · Application
S: Age structure is the proportion of individuals in each age class. This lesson explains how to read population pyramids, what different shapes predict about future growth, and why age structure matters for managing wild and human populations.
O: Describe and interpret age-structure diagrams
O: Predict future population change from age structure
O: Explain the concept of population momentum
PRE: Life tables and survivorship curves
H: Age-structure diagrams
P: An **age-structure diagram** (population pyramid) shows the number or percentage of individuals in each age class, usually males on one side and females on the other.
- **Wide base, narrow top** (expanding): many young, high birth rate; the population will grow.
- **Column-shaped** (stable): similar numbers in each class below old age; little change.
- **Narrow base** (contracting): fewer young than adults; the population will decline unless births rise.
H: Why it matters
P: The number of individuals of reproductive age, now and soon, sets future births. A population with many young individuals will keep growing even if each female has fewer offspring, because many will soon reach breeding age. This is **population momentum**.
X: Two fish stocks with the same total size.
> Stock A has many juveniles and few large adults, after years of heavy fishing.
> Stock B has many mature adults across several age classes.
> Stock A depends on a few young age classes, so one bad recruitment year can crash it.
> Stock B has a buffer of breeding adults: age structure, not just size, shows resilience.
K: Age structure reveals a population's future: a broad base predicts growth, a narrow base decline, and many young individuals give momentum even if birth rates fall.
!: Judging population health on total size alone. Two populations of the same size can have very different futures depending on how many individuals are, or will soon be, breeding.
EV: established | Fisheries science shows that truncated age structures, from removing older fish, increase variability in recruitment (Hsieh et al., 2006).
EV: established | Population momentum means human populations with young age structures keep growing for decades after fertility falls.
T: Age structure | The proportion of individuals in each age class of a population
T: Population pyramid | A bar chart of a population's age and sex structure
T: Population momentum | Continued growth caused by a large proportion of young individuals reaching reproductive age
SUM: Pyramids with wide bases predict growth; narrow bases predict decline.
SUM: Population momentum continues growth after birth rates fall.
SUM: Age structure is vital in fisheries and wildlife management.
SRC: Hsieh C.-h. et al., "Fishing elevates variability in the abundance of exploited species", Nature 443(7113), 859–862 | primary | 2006
SRC: United Nations, World Population Prospects 2024 | data | 2024 | https://population.un.org/wpp/
Q: What does a population pyramid with a narrow base suggest? | Few young individuals, so the population is likely to decline unless birth rates rise.
Q: What is population momentum? | Continued growth because a large share of the population is young and will soon reach reproductive age.
M1#ecology-u02-12-q1@1: Which shape of age pyramid indicates a growing population? | A wide base narrowing to the top | A narrow base | A column of similar widths | An inverted pyramid | Many young individuals relative to older ones means births will exceed deaths for some time.
M2#ecology-u02-12-q2@2: A deer population has very few fawns but many old adults. What is the most likely future? | Decline as old adults die without being replaced | Rapid growth as the old adults keep breeding | No change, because total size is what matters | Immediate extinction within a single season | Few young means low recruitment to breeding age, so numbers will fall.
M3#ecology-u02-12-q3@3: A country's fertility rate falls to replacement level, yet its population keeps growing for 40 years. What explains this? | Population momentum from a large young generation reaching reproductive age | An error, because replacement fertility always stops growth at once | Rising death rates | Emigration exceeding immigration | Many young people entering childbearing ages produce many births in total even at replacement fertility per woman.
TF1#ecology-u02-12-q4@1: Two populations of equal size will always grow at the same rate. | false | Their age structures, and so their numbers of breeding individuals, can differ greatly.
SA2#ecology-u02-12-q5@2,3: Explain why fisheries managers are concerned about the loss of large, old fish from a stock. | Old, large fish are often the most fecund and may produce higher-quality eggs. Removing them leaves a stock dependent on a few young age classes, so its size swings with each year's recruitment and it is less resilient to bad years. Age structure, not just biomass, affects sustainability. | Old fish are highly fecund ; Truncated age structure ; Greater variability or lower resilience ; Link to management

## Metapopulations
LV: Introductory · Application
S: A metapopulation is a set of local populations in separate habitat patches, linked by occasional dispersal. This lesson explains Levins's model, extinction and recolonisation, source–sink dynamics, and the Glanville fritillary studies in Finland.
O: Define a metapopulation and explain how it persists despite local extinctions
O: Use the Levins model to explain the balance of colonisation and extinction
O: Apply metapopulation ideas to habitat fragmentation and conservation
PRE: Births, deaths, immigration and emigration
H: Populations of populations
P: In fragmented landscapes, a species often lives in patches separated by unsuitable habitat. Each **local population** may go extinct, but empty patches can be **recolonised** by dispersers from occupied ones. The whole set is a **metapopulation** (Levins, 1969).
E: dp/dt = cp(1 − p) − ep :: p is the fraction of patches occupied, c the colonisation rate, e the extinction rate
P: At equilibrium, p* = 1 − e/c. The metapopulation persists only if colonisation exceeds extinction (c > e). If habitat loss lowers c or raises e so that e ≥ c, the whole metapopulation collapses, even if some patches remain suitable.
H: Source–sink dynamics
P: In **source** patches births exceed deaths and surplus individuals disperse. In **sink** patches deaths exceed births, and the population persists only through immigration (Pulliam, 1988). Protecting a sink alone won't save a species.
X: The Glanville fritillary butterfly in the Åland Islands.
> Hanski and colleagues have surveyed around 4,000 meadow patches since 1993.
> Each year many local populations go extinct and others are founded.
> Small, isolated patches go extinct more often and are recolonised less.
> The network persists through this turnover, not because any single patch is safe.
K: A metapopulation persists through a balance of local extinction and recolonisation; fragmentation that reduces connectivity can tip that balance and cause collapse.
!: Assuming an empty patch of good habitat is useless. It may be recolonised and is part of the network; its loss lowers the chance of the metapopulation persisting.
EV: established | Long-term studies of the Glanville fritillary support metapopulation theory's predictions about patch size and isolation.
EV: contested | How many real species fit the classic metapopulation model, rather than a patchy population or a mainland–island system, is debated.
T: Metapopulation | A set of local populations in habitat patches linked by dispersal
T: Sink population | A local population in which deaths exceed births, maintained by immigration
T: Connectivity | The degree to which a landscape allows movement between habitat patches
SUM: Metapopulations persist through extinction and recolonisation.
SUM: Levins: occupied fraction p* = 1 − e/c; persistence requires c > e.
SUM: Sources export individuals; sinks depend on them.
SRC: Levins R., "Some demographic and genetic consequences of environmental heterogeneity for biological control", Bulletin of the Entomological Society of America 15(3), 237–240 | primary | 1969
SRC: Hanski I., "Metapopulation dynamics", Nature 396(6706), 41–49 | primary | 1998
SRC: Pulliam H. R., "Sources, sinks, and population regulation", American Naturalist 132(5), 652–661 | primary | 1988
Q: What is a source population? | A local population in which births exceed deaths, producing surplus individuals that disperse.
Q: In the Levins model, what condition is needed for a metapopulation to persist? | The colonisation rate must exceed the extinction rate (c > e).
M1#ecology-u02-13-q1@1: What links the local populations in a metapopulation? | Dispersal of individuals between patches | Identical genes in every patch | A single large continuous habitat | The same predators in every patch | Metapopulations are linked by dispersal, which allows empty patches to be recolonised.
M2#ecology-u02-13-q2@2: In the Levins model, c = 0.5 and e = 0.2. What fraction of patches is occupied at equilibrium? | 0.6 | 0.4 | 0.3 | 0.7 | p* = 1 − e/c = 1 − 0.2/0.5 = 1 − 0.4 = 0.6.
M3#ecology-u02-13-q3@3: A road cuts a network of ponds, halving the rate at which newts reach empty ponds; extinction is unchanged. If c falls from 0.4 to 0.2 and e = 0.25, what happens? | The metapopulation heads for extinction, because e now exceeds c | Occupancy rises because fewer newts disperse | Nothing changes because ponds remain | Occupancy halves but stays stable | With c = 0.2 and e = 0.25, 1 − e/c is negative: colonisation can't keep up with local extinction.
TF1#ecology-u02-13-q4@1: A sink population can persist indefinitely without immigration. | false | By definition, deaths exceed births in a sink, so without immigrants it declines to extinction.
SA2#ecology-u02-13-q5@2,3: Explain how metapopulation theory informs the design of nature reserves in fragmented landscapes. | Persistence depends on recolonisation, so reserves should keep patches large to lower extinction and close or connected by corridors and stepping stones to raise colonisation. Protecting empty but suitable patches and source populations matters, because sinks alone can't sustain the species. | Patch size reduces extinction ; Connectivity raises colonisation ; Corridors or stepping stones ; Protect sources and empty patches

## Human population growth
LV: Introductory · Foundation
S: The human population took until about 1800 to reach one billion and passed eight billion in 2022. This lesson traces that growth, explains the measures demographers use, and sets out current projections and their uncertainty.
O: Describe the history and current rate of human population growth
O: Use crude birth rate, crude death rate and total fertility rate
O: Interpret population projections and their uncertainty
PRE: Exponential growth
H: A brief history
- For most of human history, growth was very slow, with high birth and death rates.
- About **1 billion** around 1800; **2 billion** about 1927; **4 billion** about 1974; **8 billion** in November 2022 (UN estimate).
- Annual growth peaked at a little over **2% a year** in the late 1960s and has since fallen to under 1%.
P: Growth accelerated mainly because **death rates fell** with better food supply, sanitation, vaccination and medicine, while birth rates fell later.
H: Measuring it
- **Crude birth rate** (CBR): births per 1,000 people per year.
- **Crude death rate** (CDR): deaths per 1,000 people per year.
- **Rate of natural increase** = (CBR − CDR) ÷ 10, as a percentage.
- **Total fertility rate** (TFR): the average number of children a woman would have at current age-specific birth rates. **Replacement-level fertility** is about 2.1 in countries with low child mortality.
X: A country with CBR 30 and CDR 10 per 1,000.
> Natural increase = (30 − 10) ÷ 10 = 2% per year.
> Doubling time ≈ 70 ÷ 2 = 35 years.
> A country with CBR 10 and CDR 11 has natural decrease of 0.1% a year.
> Its population falls unless immigration makes up the difference.
H: Projections
P: The UN's *World Population Prospects 2024* projects the global population to peak at about 10.3 billion in the mid-2080s, then decline slightly. Projections depend heavily on assumptions about future fertility, especially in sub-Saharan Africa, and other groups (such as IHME) project an earlier, lower peak.
K: Human population growth accelerated as death rates fell before birth rates; growth has slowed since the 1960s and the UN projects a peak late this century, with real uncertainty.
!: Quoting the rule of 70 as exact. Doubling time ≈ 70 ÷ growth rate in % is an approximation from ln 2 ≈ 0.693, valid only if the rate stays constant.
EV: established | The world population passed 8 billion in 2022, according to UN estimates.
EV: contested | When and at what level world population will peak differs between UN and other projections.
T: Total fertility rate | The average number of children a woman would have over her lifetime at current age-specific birth rates
T: Crude birth rate | The number of births per 1,000 people per year
T: Replacement-level fertility | The fertility rate at which a population exactly replaces itself, about 2.1 where child mortality is low
SUM: Population grew slowly until about 1800, then rapidly; it passed 8 billion in 2022.
SUM: CBR, CDR and TFR measure the drivers of change.
SUM: The UN projects a peak around 10.3 billion in the 2080s; projections are uncertain.
SRC: United Nations Department of Economic and Social Affairs, World Population Prospects 2024: Summary of Results | data | 2024 | https://population.un.org/wpp/
SRC: Vollset S. E. et al., "Fertility, mortality, migration, and population scenarios for 195 countries and territories from 2017 to 2100", The Lancet 396(10258), 1285–1306 | primary | 2020
Q: What is replacement-level fertility? | About 2.1 children per woman in low-mortality countries: the rate at which each generation replaces itself.
Q: Why did human population growth accelerate in the nineteenth and twentieth centuries? | Death rates fell with better food, sanitation and medicine while birth rates stayed high for a time.
M1#ecology-u02-14-q1@1: Roughly when did the human population reach one billion? | Around 1800 | Around 1500 | Around 1927 | Around 1974 | Estimates place the first billion around 1800; the second came about 1927.
M2#ecology-u02-14-q2@2: A country has CBR 24 and CDR 8 per 1,000. What is its rate of natural increase? | 1.6% per year | 16% per year | 3.2% per year | 0.16% per year | Natural increase is (CBR − CDR) ÷ 10: (24 − 8) ÷ 10 = 1.6% per year.
M3#ecology-u02-14-q3@3: Why do projections of world population in 2100 differ so much between organisations? | They make different assumptions about how fast fertility will fall, especially in high-fertility regions | Some count only adults | Death rates are unknown everywhere | Projections ignore current population size | Long-range projections are very sensitive to fertility assumptions; small differences compound over decades.
TF1#ecology-u02-14-q4@1: World population growth rate is higher today than in the late 1960s. | false | The annual growth rate peaked at just over 2% in the late 1960s and has fallen to under 1%.
SA2#ecology-u02-14-q5@2,3: Explain why the world population is still growing even though global fertility has fallen sharply since the 1960s. | Many countries still have fertility above replacement. Population momentum means large young generations are entering childbearing ages, so total births stay high. Rising life expectancy also means fewer deaths per year relative to population. Growth is slowing but hasn't stopped. | Fertility above replacement in some regions ; Population momentum ; Rising life expectancy ; Growth slowing

## The demographic transition
LV: Introductory · Application
S: The demographic transition model describes how countries move from high birth and death rates to low ones as they develop. This lesson sets out its stages, the reasons death and birth rates fall, and the model's limitations.
O: Describe the stages of the demographic transition model
O: Explain why death rates and then birth rates fall
O: Evaluate the model as a description of real countries
PRE: Human population growth
H: The stages
- **Stage 1**: high birth and death rates, fluctuating; very slow growth. Pre-industrial societies.
- **Stage 2**: death rates fall sharply; birth rates stay high; rapid growth.
- **Stage 3**: birth rates fall; growth slows.
- **Stage 4**: low birth and death rates; little or no growth. Most high-income countries.
- **Stage 5** (added later): birth rate below death rate; natural decrease. Japan, Italy and several eastern European countries.
H: Why rates fall
P: **Death rates fall first** with better food supply, clean water, sanitation, vaccination and medicine, especially reducing infant and child mortality.
P: **Birth rates fall later** as child survival rises (fewer births are needed for the desired family), children become costly rather than economically useful, education and employment of women rise, contraception becomes available, and urbanisation changes family norms.
X: England and Wales.
> Before about 1750: high birth and death rates (stage 1).
> Roughly 1750–1880: death rates fall with agricultural and sanitary improvements; rapid growth (stage 2).
> Roughly 1880–1940: birth rates fall steeply (stage 3).
> Since the mid-twentieth century: low rates of both (stage 4), with fertility now below replacement.
K: The demographic transition moves a population from high to low birth and death rates; the gap while death rates fall first causes rapid growth.
!: Treating the model as a forecast every country must follow at the same pace. Many countries passed through stages far faster than Britain, and some have stalled in stage 3.
EV: established | Most countries that have developed economically have followed the broad pattern of falling death then birth rates.
EV: contested | The model's causal story is debated: fertility has fallen in some poor, rural societies and stalled in some richer ones, so economic development alone doesn't explain it.
T: Demographic transition | The shift from high birth and death rates to low birth and death rates as a society develops
T: Natural decrease | When deaths exceed births, so a population shrinks without migration
SUM: Stage 1 high rates; stage 2 death rates fall; stage 3 birth rates fall; stage 4 low rates; stage 5 decline.
SUM: Death rates fall from health improvements; birth rates from social and economic changes.
SUM: The model describes a common pattern but not a fixed path.
SRC: Lee R., "The demographic transition: three centuries of fundamental change", Journal of Economic Perspectives 17(4), 167–190 | primary | 2003
SRC: Office for National Statistics, Births in England and Wales: 2023 | data | 2024 | https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/livebirths
Q: In which stage of the demographic transition is population growth fastest? | Stage 2, when death rates have fallen but birth rates remain high.
Q: Why does falling child mortality eventually lower birth rates? | Parents need fewer births to reach their desired number of surviving children.
M1#ecology-u02-15-q1@1: What characterises stage 4? | Low birth rates and low death rates | High birth and death rates | Falling death rates and high birth rates | Rising death rates | Stage 4 has low birth and death rates and little natural increase.
M2#ecology-u02-15-q2@2: A country's death rate has fallen from 25 to 10 per 1,000 in 30 years while its birth rate remains at 40. Which stage is it in? | Stage 2 | Stage 1 | Stage 3 | Stage 4 | Falling death rate with high birth rate is the defining pattern of stage 2.
M3#ecology-u02-15-q3@3: Bangladesh's fertility fell from about 6 to near replacement between the 1970s and 2010s, faster than its income rose. What does this suggest about the model? | Fertility can fall through education, family planning and social change, not only economic development | The model is proven correct in every detail | Bangladesh must have a stage 5 population | Death rates rose to cause the fall | Rapid falls in lower-income countries show that health, education and family planning programmes can drive the transition independently of high income.
SEQ1#ecology-u02-15-q4@1: Put these demographic changes in the order the model predicts. | High birth and death rates ; Death rate falls ; Birth rate falls ; Both rates low | Death rates fall before birth rates, which is why growth is fastest in the middle stages.
SA2#ecology-u02-15-q5@3: Evaluate the demographic transition model as a description of population change. | It describes the historical pattern of many industrialised countries well and explains rapid growth as the gap between falling death and high birth rates. But the timing varies hugely, some countries moved through stages much faster, fertility has fallen in some poor countries and stalled in others, and it didn't originally include stage 5 decline or the effects of migration. It is a useful description, not a law. | Fits historical European pattern ; Variation in speed or path ; Causes more complex than development ; Omits migration or stage 5 originally

## Small populations and extinction risk
LV: Introductory · Application
S: Small populations face extra risks that can drive them to extinction even when the original threat has gone. This lesson covers demographic and environmental stochasticity, inbreeding depression, loss of genetic diversity, Allee effects and the extinction vortex.
O: Describe the demographic, environmental and genetic risks facing small populations
O: Explain Allee effects and the extinction vortex
O: Apply these ideas to conservation of a threatened species
PRE: Metapopulations
H: Why small populations are vulnerable
- **Demographic stochasticity**: chance variation in individual births, deaths and sex ratio. In a population of five, a run of male births can doom it.
- **Environmental stochasticity**: year-to-year variation in weather, food and disease, which affects all individuals together.
- **Catastrophes**: rare extreme events such as hurricanes or epidemics.
- **Genetic problems**: **genetic drift** removes alleles by chance; **inbreeding** increases homozygosity and exposes harmful recessive alleles, causing **inbreeding depression** (lower survival and fertility).
H: Allee effects and the vortex
P: An **Allee effect** is a fall in per capita growth at low density, for example because mates are hard to find, group defence fails or co-operative breeding breaks down. It can create a threshold below which the population declines.
P: Gilpin and Soulé (1986) described an **extinction vortex**: small size causes inbreeding and demographic chance, which reduce births and survival, which make the population smaller still.
X: The Florida panther.
> By the early 1990s, fewer than 30 panthers remained.
> Inbreeding produced kinked tails, heart defects and low sperm quality.
> In 1995, eight female pumas from Texas were released to introduce new genes.
> Afterwards, health improved and numbers rose to over 100 by the 2010s: genetic rescue.
K: Small populations face chance events, genetic erosion and Allee effects that feed on each other in an extinction vortex, so they can decline even after the original threat is removed.
!: Thinking a population is safe once hunting or habitat loss stops. Below a certain size, chance and genetic problems can still drive it to extinction.
EV: established | Inbreeding depression has been demonstrated in many wild populations, and genetic rescue has improved fitness in several (Frankham, 2015).
EV: contested | Whether a single minimum viable population size (such as the "50/500 rule") applies across species is disputed.
T: Demographic stochasticity | Chance variation in births, deaths and sex ratio among individuals, important in small populations
T: Inbreeding depression | Reduced survival and fertility caused by mating between close relatives
T: Allee effect | A decline in per capita growth rate at low population density
SUM: Small populations face demographic, environmental and genetic risks.
SUM: Allee effects and the extinction vortex can accelerate decline.
SUM: Genetic rescue can restore fitness in inbred populations.
SRC: Frankham R., "Genetic rescue of small inbred populations: meta-analysis reveals large and consistent benefits of gene flow", Molecular Ecology 24(11), 2610–2618 | primary | 2015
SRC: Johnson W. E. et al., "Genetic restoration of the Florida panther", Science 329(5999), 1641–1645 | primary | 2010
SRC: Gilpin M. E. and Soulé M. E., "Minimum viable populations: processes of species extinction", in Soulé M. E. (ed.), Conservation Biology, Sinauer | primary | 1986
Q: What is genetic rescue? | Introducing individuals from another population to restore genetic diversity and fitness in an inbred population.
Q: Give an example of a mechanism that causes an Allee effect. | Difficulty finding mates at low density, or failure of group defence or co-operative breeding.
M1#ecology-u02-16-q1@1: What is inbreeding depression? | Reduced fitness from mating between close relatives | Lower population density in winter | Loss of habitat to farming | A fall in prey numbers | Inbreeding increases homozygosity for harmful recessive alleles, lowering survival and fertility.
M2#ecology-u02-16-q2@2: A colony of seabirds relies on large numbers to deter predators. When it falls below 50 pairs, breeding success collapses. What is this? | An Allee effect | Density-dependent competition | Environmental stochasticity | Genetic drift | Per capita success falls at low density because group defence fails, which is an Allee effect.
M3#ecology-u02-16-q3@3: A plant population of 40 is protected from grazing but keeps declining, with low seed set and many deformed seedlings. What is the best next step? | Investigate inbreeding and consider introducing plants from another population | Remove the protection, since it isn't working | Wait, because declines always reverse | Reduce the population further to cut competition | Low seed set and abnormal offspring suggest inbreeding depression; genetic rescue may break the vortex.
SEQ1#ecology-u02-16-q4@2: Order the steps of an extinction vortex. | Population becomes small ; Inbreeding and chance events increase ; Births fall and deaths rise ; Population becomes smaller still | Each step feeds the next, accelerating decline towards extinction.
SA2#ecology-u02-16-q5@2,3: Explain why small populations are at higher risk of extinction than large ones, even with the same average birth and death rates. | In small populations chance events matter more: random runs of deaths, a skewed sex ratio or one bad year can wipe them out. Genetic drift and inbreeding reduce diversity and fitness. Allee effects may lower growth at low density. These processes reinforce each other in an extinction vortex. | Demographic stochasticity ; Environmental variation or catastrophes ; Genetic drift or inbreeding ; Allee effects or vortex

## Harvesting and maximum sustainable yield
LV: Introductory · Evaluation
S: Harvesting fish, game or timber removes individuals from a population that can replace them. This lesson derives maximum sustainable yield from the logistic model, explains why managing to it has often failed, and introduces more cautious approaches.
O: Derive maximum sustainable yield from the logistic model
O: Explain why fixed quotas set at MSY risk collapse
O: Evaluate alternative harvesting strategies
PRE: Logistic growth and carrying capacity
H: Maximum sustainable yield
P: In the logistic model, growth is fastest at N = K/2. Harvesting exactly that growth each year keeps the population stable at K/2.
E: MSY = rK ÷ 4 :: the largest harvest that can be taken indefinitely under the logistic model
X: A fish stock with r = 0.6 per year and K = 100,000 tonnes.
> MSY = 0.6 × 100,000 ÷ 4 = 15,000 tonnes per year.
> This is sustainable only if the stock is held at 50,000 tonnes.
> If the stock is at 30,000 tonnes, growth = 0.6 × 30,000 × 0.7 = 12,600 tonnes.
> Taking 15,000 tonnes from it would shrink the stock further each year.
H: Why MSY has failed
- **Uncertainty**: r and K are hard to estimate and change with the environment.
- **Fixed quotas are unstable**: below K/2, a fixed quota exceeds growth, so the stock declines faster and faster.
- **Ignoring age structure and ecosystems**: removing large adults and prey species affects other populations.
- **Economic and political pressure** to set quotas high.
P: The **collapse of the northern cod** off Newfoundland, after decades of heavy fishing, led Canada to impose a moratorium in 1992; around 30,000 people lost work and the stock was slow to recover.
H: Safer approaches
- **Fixed effort** (limit boats or days at sea) rather than fixed catch.
- **Fixed escapement**: harvest only above a safe stock level.
- Set targets below MSY with a **precautionary** buffer; protect spawning stock and use no-take zones.
K: MSY = rK/4 is the largest catch the logistic model allows, taken only at K/2; because parameters are uncertain and fixed quotas destabilise stocks, managers now aim below MSY with precautionary buffers.
!: Treating MSY as a safe target. Under uncertainty, aiming for the maximum makes overshoot likely; MSY is now often treated as an upper limit rather than a goal.
EV: established | The northern cod collapse is a widely cited case of overfishing under quota management.
EV: contested | How much of the cod's slow recovery reflects fishing, changed ecosystems or ocean conditions is debated.
T: Maximum sustainable yield | The largest harvest that can be taken from a population indefinitely, rK/4 under the logistic model
T: Fixed escapement | A strategy that harvests only the part of a population above a set safe size
T: Precautionary approach | Setting limits cautiously when information is uncertain, to avoid serious harm
SUM: MSY = rK/4 at a population of K/2.
SUM: Uncertainty and fixed quotas make MSY risky.
SUM: Effort limits, escapement rules and precautionary buffers are safer.
SRC: Hutchings J. A. and Myers R. A., "What can be learned from the collapse of a renewable resource? Atlantic cod of Newfoundland and Labrador", Canadian Journal of Fisheries and Aquatic Sciences 51(9), 2126–2146 | primary | 1994
SRC: Larkin P. A., "An epitaph for the concept of maximum sustained yield", Transactions of the American Fisheries Society 106(1), 1–11 | primary | 1977
SRC: FAO, The State of World Fisheries and Aquaculture 2024 | data | 2024 | https://www.fao.org/publications/home/fao-flagship-publications/the-state-of-world-fisheries-and-aquaculture
Q: At what population size is MSY obtained in the logistic model? | At half the carrying capacity, K/2.
Q: What is fixed-effort harvesting? | Limiting fishing effort, such as boats or days at sea, rather than setting a fixed catch.
M1#ecology-u02-17-q1@1: What is MSY for r = 0.4 and K = 50,000? | 5,000 | 10,000 | 20,000 | 2,500 | MSY = rK ÷ 4 = 0.4 × 50,000 ÷ 4 = 20,000 ÷ 4 = 5,000.
M2#ecology-u02-17-q2@2: A stock is below K/2 and managers keep a fixed quota equal to MSY. What happens? | The stock declines, because the quota exceeds its growth | The stock rises back to K/2 | The stock stays where it is | The quota is too low to matter | Below K/2 growth is less than MSY, so taking MSY removes more than is produced, and the gap grows.
M3#ecology-u02-17-q3@3: Which strategy best protects a stock when r and K are uncertain? | Fixed escapement or effort limits with a precautionary buffer below MSY | A fixed quota set exactly at the estimated MSY | Raising the quota whenever catches fall | Harvesting all large adults first | Strategies that respond to stock size, with a buffer, avoid the instability of fixed quotas under uncertainty.
TF1#ecology-u02-17-q4@1: Under the logistic model, harvesting MSY from a population at carrying capacity K keeps it at K. | false | At K, growth is zero, so any harvest reduces the population; MSY is only sustainable at K/2.
SA2#ecology-u02-17-q5@3: Evaluate the use of maximum sustainable yield in fisheries management. | MSY gives a clear, model-based target and links harvest to population growth. But r and K are uncertain and variable, the logistic model ignores age structure, species interactions and time lags, and fixed quotas at MSY become unstable when stocks fall below K/2, as the northern cod collapse showed. MSY is now better used as an upper limit with precautionary targets below it. | Strength: clear target linked to growth ; Uncertainty in parameters ; Model limitations ; Example and conclusion

## Population viability analysis
LV: Introductory · Evaluation
S: Population viability analysis (PVA) uses models to estimate the chance that a population will survive for a given time. This lesson explains what goes into a PVA, how it is used in conservation decisions, and its strengths and limits.
O: Describe the inputs and outputs of a population viability analysis
O: Interpret extinction probabilities and sensitivity analysis from a PVA
O: Evaluate the use of PVA in conservation decision-making
PRE: Small populations and extinction risk
H: What PVA does
P: A **PVA** builds a model of a population, usually a stochastic simulation run thousands of times, to estimate the **probability of extinction** within a time frame (for example 100 years) under different scenarios.
- **Inputs**: current size, age-specific birth and survival rates, their variation between years, density dependence, carrying capacity, catastrophes and genetic effects.
- **Outputs**: extinction probability, expected time to extinction, final population size.
- **Sensitivity analysis**: which vital rates most affect growth, showing where management will do most good.
X: A PVA for an island bird.
> Current population: 120 adults; adult survival 0.85, juvenile survival 0.35.
> 10,000 simulations over 100 years give an extinction probability of 28%.
> Sensitivity analysis shows adult survival has the biggest effect.
> Scenario: removing rats raises adult survival to 0.9; extinction probability falls to 6%.
H: Uses and limits
- **Uses**: comparing management options, setting recovery targets, informing IUCN Red List criterion E (quantitative extinction risk).
- **Limits**: often uses poor data from few years; results are very sensitive to assumptions about variation and density dependence; absolute probabilities are less reliable than comparisons between scenarios.
P: Brook and colleagues (2000) tested PVAs against 21 long-term datasets and found their predictions were, on average, surprisingly accurate, but only where data were good.
K: PVA simulates a population many times to estimate extinction risk under different scenarios; it is most reliable for comparing options, not for exact probabilities.
!: Reporting a PVA's extinction probability as a precise fact. With uncertain inputs, the relative ranking of scenarios is far more trustworthy than the exact number.
EV: established | PVA is a standard tool in conservation planning and in IUCN Red List criterion E.
EV: contested | How accurately PVAs predict absolute extinction risk, given limited data, remains debated.
T: Population viability analysis | A model-based estimate of the probability a population will persist for a given time
T: Sensitivity analysis | Testing how much a model's output changes when each input is varied
T: Stochastic model | A model that includes random variation, so each run can give a different outcome
SUM: PVA estimates extinction risk from vital rates, variation and threats.
SUM: Sensitivity analysis shows which rates matter most for management.
SUM: PVA is best for comparing scenarios.
SRC: Brook B. W. et al., "Predictive accuracy of population viability analysis in conservation biology", Nature 404(6776), 385–387 | primary | 2000
SRC: IUCN Standards and Petitions Committee, Guidelines for Using the IUCN Red List Categories and Criteria, version 16 | guidance | 2024 | https://www.iucnredlist.org/resources/redlistguidelines
SRC: Beissinger S. R. and McCullough D. R. (eds), Population Viability Analysis, University of Chicago Press | secondary | 2002
Q: What is the main output of a PVA? | The probability that a population will go extinct within a given time, under stated assumptions.
Q: Why is sensitivity analysis useful? | It shows which vital rates most affect population growth, so management can target them.
M1#ecology-u02-18-q1@1: Why are PVA models usually run thousands of times? | Because they include random variation, so each run differs | Because computers make errors | To estimate carrying capacity exactly | To count the population | Stochastic simulations give a distribution of outcomes; extinction probability is the share of runs ending in extinction.
M2#ecology-u02-18-q2@2: A PVA finds adult survival matters far more than fecundity for a turtle population. What should managers prioritise? | Reducing adult deaths, such as bycatch in fishing nets | Increasing the number of eggs laid | Moving nests to new beaches | Doing nothing until more data arrive | Sensitivity analysis directs effort to the vital rate with the greatest effect on growth.
M3#ecology-u02-18-q3@3: A PVA based on three years of data gives a 12% extinction risk in 100 years. What is the most defensible use of this result? | Comparing management scenarios run with the same model, rather than treating 12% as precise | Declaring the species safe because the risk is under 50% | Announcing that the species will go extinct in 100 years | Ignoring it because all models are wrong | Short data series make absolute risks unreliable, but comparisons between scenarios under the same assumptions remain informative.
TF1#ecology-u02-18-q4@1: A PVA can include catastrophes such as disease outbreaks. | true | Catastrophes are often included as rare events with a set probability and effect on survival.
SA2#ecology-u02-18-q5@3: Evaluate the use of population viability analysis in deciding how to conserve a rare species. | PVA brings together data on vital rates, variation and threats, compares management options and identifies through sensitivity analysis which rates matter most. But it needs good long-term data that rare species often lack, results depend on assumptions about variation and density dependence, and absolute probabilities can mislead. It is most useful for comparing options and should be updated as data improve. | Integrates data and compares options ; Sensitivity analysis ; Data and assumption limits ; Best used comparatively
`;
