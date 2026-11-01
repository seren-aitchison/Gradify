// SocGradify Sociology: the full curriculum, 18 schools, from the SocGradify brief. Each topic in the brief is taught
// as one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js), u01-01
// style, as for every Gradify course: never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Sociology
> The discipline
* What is sociology?
* Sociology as a discipline
* The sociological imagination
* Micro and macro sociology
> Individual and society
* The individual and society
* Structure and agency
* Social institutions
* Social relationships
> Culture and socialisation
* Norms and values
* Culture
* Primary socialisation
* Secondary socialisation
> Social life
* Roles and status
* Identity
* Groups and communities
* Social interaction
> Doing sociology
* Sociological research: an introduction
* Contemporary sociology
* Applying sociology
2. Classical Sociological Theory
> Origins
* The origins of sociology
* The Enlightenment and social thought
* Industrialisation and social change
* Comte and positivism
> Marx and Engels
* Marx: historical materialism
* Marx: class conflict
* Marx: capitalism
* Marx: alienation
* Engels
> Durkheim
* Durkheim: social facts
* Durkheim: social solidarity
* Mechanical and organic solidarity
* Durkheim: anomie
* Durkheim's Suicide
> Weber
* Weber: social action
* Weber: Verstehen
* Weber: rationalisation
* Weber: bureaucracy
* Weber: class, status and party
> Other founders and debates
* Simmel
* W. E. B. Du Bois
* Harriet Martineau
* Classical debates compared
3. Contemporary Sociological Theory
> Consensus and conflict
* Functionalism
* Parsons
* Merton: manifest and latent functions
* Conflict theory
* Neo-Marxism
* Critical theory and the Frankfurt School
> Interpretive sociology
* Symbolic interactionism: Mead and Blumer
* Goffman and dramaturgy
* Ethnomethodology
* Phenomenology
* Social constructionism
> Feminist and critical theories
* Liberal feminism
* Radical feminism
* Marxist feminism
* Black feminism
* Intersectionality
> Late modern theory
* Postmodernism
* Poststructuralism
* Foucault
* Bourdieu: habitus, capital and field
* Giddens and structuration theory
* Bauman
* Beck
* Theoretical synthesis
4. Culture, Identity and Socialisation
> Culture
* Material and non-material culture
* Values
* Norms and sanctions
* Subcultures
* Countercultures
* Cultural transmission
> Agents of socialisation
* The family as an agent of socialisation
* Education as an agent of socialisation
* Peer groups
* The media
* Religion as an agent of socialisation
> Identity
* Personal and social identity
* National identity
* Ethnic identity
* Gender identity
* Class identity
* Cultural identity
* Hybrid identities
* Globalised identities
> Culture in change
* Consumer culture
* Popular culture
* Cultural change
* Cultural diversity
* Multiculturalism
5. Social Stratification and Inequality
> Stratification and class
* Social stratification
* Social hierarchy
* Marxist theories of class
* Weberian theories of class
* Contemporary class analysis
> Social mobility
* Social mobility
* Absolute and relative mobility
* Intergenerational and intragenerational mobility
* Meritocracy
* Life chances
> Wealth and poverty
* Wealth inequality
* Income inequality
* Absolute poverty
* Relative poverty
* Social exclusion
* Deprivation
> Dimensions of inequality
* Status
* Occupational inequality
* Housing inequality
* Health inequality
* Educational inequality
* Digital inequality
* Regional inequality
* Global inequality
> Reproduction and response
* Social reproduction
* Welfare and inequality
6. Gender and Sexuality
> Sex and gender
* Sex and gender
* The social construction of gender
* Gender socialisation
* Gender roles
* Gender stereotypes
* Gender identity in society
* Gender performativity: Butler
* Masculinities
* Hegemonic masculinity
> Feminist analysis
* Feminist theory
* Patriarchy
* Gender inequality
> Gender in institutions
* Gender and work
* Gender and education
* Gender and the family
* Gender and politics
* Gender and the media
> Sexuality
* Sexuality as a social phenomenon
* Sexual identities
* Heteronormativity
* LGBTQ+ sociology
> Contemporary issues
* Gender and intersectionality
* Gender-based violence
* Current debates in gender and sexuality
7. Race, Ethnicity and Migration
> Race and ethnicity
* Race as a social construct
* Ethnicity
* Racialisation
* Racism
* Institutional racism
* Structural racism
* Prejudice and discrimination
* Ethnic identity and belonging
* Minority groups
> Colonialism and its legacies
* Colonialism
* Postcolonial theory
* Decolonisation
> Migration
* International migration
* Forced migration
* Refugees and asylum
* Integration and assimilation
* Multiculturalism and migration
* Diaspora
* Transnationalism
* Borders
* Citizenship
> Race and inequality
* Race and inequality
* Race and education
* Race and employment
* Race and criminal justice
* Race and health
* Debates about migration
8. Family and Relationships
> Defining the family
* What is a family?
* Family structures
* Nuclear and extended families
* Lone-parent families
* Blended families
* Same-sex families
> Partnerships
* Marriage
* Cohabitation
* Divorce
> Children and parenting
* Fertility and family size
* Parenting
* Childhood as a social construction
> Power in families
* Domestic labour
* Power in the family
* Domestic violence
> Families in context
* Family diversity
* Intergenerational relationships
* Ageing and care
* Family policy
* Global families
* Family change
9. Education
> Theories of education
* Functionalist perspectives on education
* Marxist perspectives on education
* Feminist perspectives on education
* Education, socialisation and social control
* The hidden curriculum
> Differential achievement
* Educational achievement and social class
* Educational achievement and gender
* Educational achievement and ethnicity
* Cultural capital and education
* Linguistic codes
> Processes inside schools
* Labelling in education
* Teacher expectations
* The self-fulfilling prophecy
* Selection
> Education systems
* Educational inequality
* Private education
* Higher education
* Education policy
* Global education
* Digital learning
* Educational reform
10. Crime and Deviance
> Defining crime and deviance
* Crime and deviance
* The social construction of crime
> Theories of crime
* Functionalist theories of crime
* Marxist theories of crime
* Interactionist theories of crime
* Labelling theory
* Strain theory
* Subcultural theories
* Differential association
* Social learning and crime
* Control theory
* Feminist criminology
* Critical criminology
* Realist criminology
* Postmodern criminology
> Patterns of crime
* Crime and social class
* Crime and gender
* Crime and ethnicity
* Youth crime
* White-collar crime
* Corporate crime
* Organised crime
* Cybercrime
* Victimology
> Responses to crime
* Policing
* The criminal justice system
* Prisons
* Punishment
* Rehabilitation
* Social control
* Surveillance
* Moral panics
* Crime and the media
* Crime prevention
11. Politics and Power
> Power and authority
* Power
* Authority: traditional, charismatic and legal-rational
* Legitimacy
> The state
* The state
* Nation states
* Citizenship and rights
* Democracy
* Political participation
* Political inequality
* Political ideologies
> Collective action
* Social movements
* Collective action
* Civil society
* Protest
> Institutions and governance
* Political institutions
* Bureaucracy and the state
* Global governance
* Power and knowledge
* Political surveillance
* Political sociology
* Political change
12. Religion
> Understanding religion
* Defining religion
* Functionalist approaches to religion
* Marxist approaches to religion
* Weberian approaches to religion
> Religion in modern society
* Secularisation
* Belief and practice
* Religious institutions
* Religious authority
* Religious identity
* Religious pluralism
* Fundamentalism
* Civil religion
> Religion and society
* Religion and social change
* Religion and politics
* Religion and gender
* Religion and inequality
* Religion and globalisation
* New religious movements
* Contemporary religious change
13. Work and Economy
> Economy and society
* Industrial society
* Post-industrial society
* Capitalism
* Labour markets
* The division of labour
* Alienation at work
> Organisations
* Workplace hierarchy
* Bureaucracy and organisations
* Professionalisation
* Occupational identity
> Inequality at work
* Work and gender
* Work and class
* Work and ethnicity
* Unemployment
* Precarity
> Changing work
* The gig economy
* Automation and artificial intelligence
* Workplace surveillance
* Trade unions and industrial relations
* Global production
> Economy and consumption
* Consumer society
* Economic inequality
* Welfare capitalism
* The future of work
14. Globalisation and Social Change
> Dimensions of globalisation
* What is globalisation?
* Economic globalisation
* Political globalisation
* Cultural globalisation
* Technological globalisation
> Global economy
* Global migration
* Global inequality and development
* Global capitalism
* Transnational corporations
* Global supply chains
> Culture and networks
* Cultural homogenisation
* Cultural hybridisation
* Glocalisation
* Digital society
* The network society
* Social media and society
* Global social movements
> Environment
* Climate change and society
* Environmental sociology
* Sustainable development
* Consumerism and the environment
> Theories of change
* Risk society
* Modernity
* Postmodernity
* Social transformation
* Future societies
15. Urban Sociology and Population
> Cities
* Urbanisation
* Cities and modernity
* Urban ecology and the Chicago School
* Urban inequality
* Segregation
* Gentrification
* Housing
* Homelessness
* Suburbanisation
> Rural and community
* Rural sociology
* Community
* Social networks in places
> Population
* Population change
* The demographic transition
* Fertility
* Mortality
* Population ageing
* Migration and population
> Planning and futures
* Urban planning
* Sustainable cities
* Global cities
* Urban futures
16. Health and Medicine
> Health and society
* Social determinants of health
* Health inequalities
* Medical sociology
* Medical and social models of health
* The experience of illness
* Medicalisation
> Medicine as an institution
* The medical profession
* Healthcare institutions
* Patients and power
> Disability and mental health
* Disability and the social model
* Stigma and health
* Mental health and social control
> Health in society
* Health behaviours
* Public health
* Health policy
* Global health
* Ageing and health
* Gender and health
* Race and health inequalities
* Digital healthcare
17. Research Methods
> Designing research
* Research design
* Research questions and hypotheses
* Positivism
* Interpretivism
* Realism
* Quantitative research
* Qualitative research
* Mixed methods
> Asking questions
* Surveys
* Questionnaire design
* Structured interviews
* Semi-structured interviews
* Unstructured interviews
* Focus groups
> Observing and immersion
* Participant observation
* Ethnography
* Case studies
* Experiments in sociology
> Analysing texts and networks
* Social network analysis
* Content analysis
* Discourse analysis
> Existing data
* Secondary data
* Official statistics
* Longitudinal research
* Comparative research
> Sampling and quality
* Probability sampling
* Non-probability sampling
* Reliability
* Validity
* Generalisability
* Bias
> Ethics and reflexivity
* Positionality
* Reflexivity
* Informed consent
* Anonymity and confidentiality
* Researching vulnerable groups
> From data to findings
* Interpreting findings
* Disseminating research
18. Social Statistics and Data Science
> Describing social data
* Types of social data
* Central tendency
* Dispersion
* Frequency distributions
* Visualising social data
> Inference
* Probability for social research
* Sampling distributions
* Hypothesis testing
* Statistical significance
* Confidence intervals
* Effect sizes
> Relationships in data
* Correlation
* Regression
* Categorical data
* Chi-square tests
> Measuring society
* Social indicators
* Measuring inequality: the Gini coefficient
* Measuring poverty
* Demographic analysis
* Census data
* Survey data
> Computational sociology
* Social network analysis in practice
* Computational sociology
* Digital trace data
* Reproducible research
`;

// stages on the map; SocGradify's colours run from magenta through rose to amber
export const TRACKS = [
  { name: "Stage 1 · Foundations and theory", units: [1, 2, 3], from: "#a44a99", to: "#ec4899" },
  { name: "Stage 2 · Culture and inequality", units: [4, 5, 6, 7], from: "#db2777", to: "#f97316" },
  { name: "Stage 3 · Institutions", units: [8, 9, 10, 11, 12, 13], from: "#c026d3", to: "#f43f5e" },
  { name: "Stage 4 · A changing world", units: [14, 15, 16], from: "#e11d48", to: "#f59e0b" },
  { name: "Stage 5 · Research and data", units: [17, 18], from: "#9333ea", to: "#ec4899" },
];

export const PATHS = [
  { id: "alevel", name: "A level Sociology", sub: "The core of A level and equivalent courses: theory, culture and identity, families, education, crime, beliefs and methods.", units: [1, 2, 3, 4, 8, 9, 10, 12, 17] },
  { id: "year1", name: "University year 1", sub: "The first-year core of a sociology degree: the discipline, classical and contemporary theory, inequality and methods.", units: [1, 2, 3, 5, 6, 7, 17] },
  { id: "theory", name: "Social theory", sub: "From Comte, Marx, Durkheim and Weber to feminism, Foucault, Bourdieu, Giddens and Beck.", units: [2, 3, 1, 14] },
  { id: "inequality", name: "Inequality and social justice", sub: "Class, poverty, gender, race and migration, and how they shape education, health and life chances.", units: [5, 6, 7, 16, 9, 18] },
  { id: "research", name: "Research skills", sub: "Research design, interviews, ethnography, content and discourse analysis, official data, reflexivity, statistics and reporting.", units: [17, 18, 1] },
  { id: "policy", name: "Society and policy", sub: "The state, power, welfare, crime, health and the economy: sociology for policy and public life.", units: [11, 5, 10, 13, 16, 8] },
  { id: "global", name: "Global and urban", sub: "Globalisation, cities, population, migration and the environment.", units: [14, 15, 7, 13] },
];

export const BLURBS = {
  1: "What sociology is, the sociological imagination, structure and agency, culture, socialisation and identity.",
  2: "Comte, Marx, Engels, Durkheim, Weber, Simmel, Du Bois and Martineau: the founders and their debates.",
  3: "Functionalism, conflict and critical theory, interactionism, feminisms, Foucault, Bourdieu, Giddens, Bauman and Beck.",
  4: "Norms, values, subcultures, the agents of socialisation, identities and how culture changes.",
  5: "Class, mobility, income and wealth, poverty, exclusion and the many dimensions of inequality.",
  6: "The social construction of gender, masculinities, feminism, gender in institutions and sexuality.",
  7: "Race as a social construct, racism, colonialism, migration, citizenship and racial inequality.",
  8: "Family structures, partnerships, childhood, domestic labour, power and family change.",
  9: "Theories of education, differential achievement, labelling, selection and education policy.",
  10: "Theories of crime and deviance, patterns of offending, victims, policing, punishment and the media.",
  11: "Power, authority, the state, democracy, social movements, protest and global governance.",
  12: "Theories of religion, secularisation, fundamentalism, pluralism and religion in social change.",
  13: "Industrial and post-industrial work, organisations, precarity, the gig economy, automation and consumption.",
  14: "Economic, political, cultural and digital globalisation; climate, risk and modernity.",
  15: "Urbanisation, segregation, gentrification, community, population change and ageing.",
  16: "Social determinants of health, medicalisation, disability, the medical profession and global health.",
  17: "Positivism and interpretivism, surveys, interviews, ethnography, content analysis, sampling, reflexivity and ethics.",
  18: "Describing and testing social data, the Gini coefficient, poverty measures, census data and computational sociology.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
