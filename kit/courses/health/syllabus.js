// HealthGradify Health and Wellbeing: the full curriculum, 11 schools. Modelled on the BTEC Nationals and T Level
// in Health and Social Care (human body systems, health and wellbeing, public health, services), the QAA Subject
// Benchmark Statement for Health Studies, and the UK Faculty of Public Health's domains. Each topic is taught as
// one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock health): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Health and Wellbeing
> Defining health
* What is health?
* Models of health: biomedical and biopsychosocial
* Wellbeing and how it is measured
* Holistic health: physical, mental and social
> What shapes health
* The determinants of health
* Health inequalities
* Lifestyle factors and health
* The wider determinants: housing, work and environment
> Evidence about health
* Judging health information
* Levels of evidence
* Understanding risk: absolute and relative
* Screening: benefits and harms
> Health in the UK
* Measuring the nation's health
* Leading causes of death and ill health in the UK
2. The Human Body
> Organisation and control
* Cells, tissues and organs
* Homeostasis
* Body temperature regulation
* Blood glucose regulation
* The nervous system
* The endocrine system
> Transport and exchange
* The heart
* Blood vessels and blood pressure
* Blood
* The respiratory system
* Gas exchange and breathing
> Processing, defence and movement
* The digestive system
* The liver
* The kidneys and fluid balance
* The immune system
* The musculoskeletal system
* The skin
3. Nutrition
> Nutrients
* Carbohydrates and dietary fibre
* Protein
* Fats
* Vitamins
* Minerals
* Water and hydration
> Healthy eating
* The Eatwell Guide
* Energy balance
* Reading food labels
* Salt, sugar and saturated fat
* Ultra-processed food
> Nutrition across life
* Nutrition in pregnancy and infancy
* Nutrition in childhood and adolescence
* Nutrition in older age
* Vegetarian and vegan diets
> Diet, disease and access
* Malnutrition
* Diet and chronic disease
* Food insecurity
* Eating disorders
4. Physical Activity
> Activity and health
* Physical activity, exercise and fitness
* The UK physical activity guidelines
* Sedentary behaviour
* The benefits of physical activity
> How the body responds
* Short-term responses to exercise
* Long-term adaptations to training
* Energy systems
* Components of fitness
* Measuring fitness
> Promoting activity
* Physical activity in children and young people
* Physical activity in older adults
* Activity with long-term conditions
* Barriers to physical activity
* Active environments and active travel
5. Sleep, Stress and Rest
> Sleep
* Why we sleep
* Sleep stages and cycles
* Circadian rhythms
* How much sleep we need
* Sleep across the lifespan
* Insomnia
* Improving sleep
* Shift work and sleep
* Sleep disorders beyond insomnia
> Stress
* What stress is
* The stress response
* Stress and health
* Coping and stress management
* Work-related stress and burnout
6. Mental Health and Wellbeing
> Understanding mental health
* Mental health and mental illness
* Mental health in the UK
* Risk and protective factors for mental health
* Stigma and discrimination
> Common mental health problems
* Anxiety
* Depression
* Self-harm and suicide prevention
* Severe mental illness
* Mental health in children and young people
* Perinatal mental health
> Promoting wellbeing
* The Five Ways to Wellbeing
* Resilience
* Loneliness and social connection
* Digital life and wellbeing
* Getting help: NHS talking therapies and other support
7. Health Behaviour and Behaviour Change
> Explaining health behaviour
* Why health behaviours matter
* The health belief model
* The theory of planned behaviour
* The transtheoretical model
* The COM-B model and the behaviour change wheel
* Habits
> Changing behaviour
* Behaviour change techniques
* Motivational interviewing
* Nudges and choice architecture
* Health literacy
* Making Every Contact Count
> Risky behaviours
* Alcohol
* Smoking
* Vaping
* Drugs and harm reduction
* Sexual health
* Gambling harms
8. Disease and Long-term Conditions
> Infection
* Pathogens and how infections spread
* Breaking the chain of infection
* Vaccination and herd immunity
* Antimicrobial resistance
> Non-communicable disease
* Cardiovascular disease
* Hypertension
* Stroke
* Type 2 diabetes
* Type 1 diabetes
* Cancer: causes and prevention
* Chronic respiratory disease: asthma and COPD
* Obesity
* Dementia
> Living with long-term conditions
* What a long-term condition is
* Multimorbidity
* Self-management and supported self-care
* Disability and health
9. Public Health and Epidemiology
> Public health
* What public health is
* A short history of public health
* The three domains of public health
* Levels of prevention
* Health promotion and the Ottawa Charter
* The prevention paradox
> Epidemiology
* Incidence and prevalence
* Rates and standardisation
* Relative risk and odds ratios
* Epidemiological study designs
* Bias, confounding and chance
* Causation and the Bradford Hill viewpoints
* Outbreak investigation
* Health surveillance
> Global and planetary health
* The global burden of disease
* Global health goals and organisations
* Climate change and health
* Pandemic preparedness
10. Health and Social Care Systems
> The NHS
* The founding of the NHS
* How the NHS in England is organised
* Health care across the four UK nations
* Primary care
* Secondary and tertiary care
* Funding health care
> Care and services
* Social care
* Integrated care
* Urgent and emergency care
* Choosing the right NHS service
* Mental health services
> Quality, rights and ethics
* Quality and safety in health care
* Regulation of health and social care
* Consent and mental capacity
* Confidentiality and health data
* Ethical principles in health care
* NICE and priority setting
* Comparing health systems
11. Health Across the Life Course
> Beginning life
* Preconception and pregnancy
* Birth and the newborn
* Infant health and development
* Child health and the Healthy Child Programme
> Growing up
* Adolescent health
* Sexual and reproductive health
* Young adults and health
> Adulthood and later life
* Adult health checks
* Menopause
* Healthy ageing
* Frailty and falls
* Carers and caring
* End of life care
`;

export const TRACKS = [
  { name: "Stage 1 · Foundations and the body", units: [1, 2], from: "#34d399", to: "#22d3ee" },
  { name: "Stage 2 · Living well", units: [3, 4, 5, 6], from: "#4ade80", to: "#2dd4bf" },
  { name: "Stage 3 · Behaviour and illness", units: [7, 8], from: "#a3e635", to: "#34d399" },
  { name: "Stage 4 · Populations, services and the life course", units: [9, 10, 11], from: "#2dd4bf", to: "#38bdf8" },
];

export const PATHS = [
  { id: "btec", name: "BTEC and T Level Health and Social Care", sub: "The core of BTEC Nationals and the T Level: human body systems, health and wellbeing, illness, public health, services and the life course.", units: [1, 2, 8, 10, 11, 9] },
  { id: "public-health", name: "Public health", sub: "Determinants, inequalities, epidemiology, prevention and behaviour change: the public health core of a health studies degree.", units: [1, 9, 7, 8, 10] },
  { id: "healthy-living", name: "Healthy living", sub: "The evidence behind eating well, moving more, sleeping well and looking after your mental health. Educational, not personal advice.", units: [3, 4, 5, 6] },
  { id: "degree-year1", name: "Health studies: university year 1", sub: "The first-year core of a health studies or public health degree, aligned with the QAA Health Studies benchmark.", units: [1, 2, 9, 7, 6, 10] },
  { id: "body", name: "Body and disease", sub: "How the body works and what happens when it goes wrong: systems, infection and long-term conditions.", units: [2, 8, 3, 4] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What health and wellbeing mean, what shapes them, how inequalities arise and how to judge health evidence and risk.",
  2: "Cells to systems: homeostasis, the heart, lungs, gut, liver, kidneys, immune, nervous, endocrine and musculoskeletal systems.",
  3: "Nutrients, the Eatwell Guide, energy balance, food labels, diet across life, and the links between diet and disease.",
  4: "The UK activity guidelines, how the body responds and adapts to exercise, fitness, and getting people moving.",
  5: "Why we sleep, how much we need, circadian rhythms and insomnia; what stress is and how it affects health.",
  6: "Mental health and illness, common problems and their treatment, wellbeing, resilience and where to get help.",
  7: "Why people behave as they do about health, the models that explain it, and the techniques that change it.",
  8: "Infection, vaccination, antimicrobial resistance and the major long-term conditions, and living well with them.",
  9: "Public health and prevention, epidemiology from incidence to causation, outbreaks, and global and planetary health.",
  10: "How the NHS and social care are organised, funded, regulated and judged, with consent, confidentiality and ethics.",
  11: "Health from preconception to the end of life: pregnancy, childhood, adolescence, adulthood, ageing and caring.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
