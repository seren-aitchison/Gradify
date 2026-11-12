// SportGradify Sport and Exercise Science: the full curriculum, 12 schools, modelled on A level Physical Education
// (AQA 7582 and OCR H555: applied anatomy and physiology, exercise physiology, biomechanics, skill acquisition, sport
// psychology, sport and society) and the undergraduate scope of the QAA Subject Benchmark Statement for Events,
// Hospitality, Leisure, Sport and Tourism and BASES's sport and exercise science curriculum (physiology,
// biomechanics, psychology, nutrition, testing, health and physical activity). Each topic is taught as one lesson,
// grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock sport): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Functional Anatomy and the Musculoskeletal System
> The skeleton
* Anatomical language: planes, axes and positions
* Functions of the skeleton
* Bone structure and types of bone
* The axial and appendicular skeleton
* Bone remodelling and the effects of exercise on bone
> Joints and movement
* Classification of joints
* Synovial joints
* Movement terminology
* Joint analysis of sporting actions
* Ligaments, tendons and cartilage
> Skeletal muscle
* Skeletal muscle structure
* The sliding filament theory
* Muscle fibre types
* Agonists, antagonists, fixators and synergists
* Types of muscle contraction
* The major muscles used in sport
> Nerves and muscles
* Motor units and the all-or-none law
* Gradation of force: recruitment, summation and tetanus
* Proprioceptors and the stretch reflex
2. The Cardiorespiratory System in Exercise
> The heart
* Structure of the heart
* The cardiac conduction system
* The cardiac cycle
* Cardiac output, stroke volume and heart rate
* Regulation of heart rate during exercise
* Heart rate responses to exercise
> Blood and circulation
* Blood vessels and blood pressure
* The vascular shunt and venous return
* Blood composition and oxygen transport
* The oxygen–haemoglobin dissociation curve
> The respiratory system
* Structure of the respiratory system
* Mechanics of breathing
* Lung volumes and capacities
* Gas exchange at the lungs and muscles
* Control of breathing during exercise
> Putting the systems together
* Maximal oxygen uptake (VO2max)
* Cardiovascular drift
* Cardiorespiratory adaptations to endurance training
3. Energy Systems and Exercise Metabolism
> Energy for movement
* ATP: the energy currency
* The ATP–PC system
* The anaerobic glycolytic system
* The aerobic system
* The energy continuum
* Fuel use: carbohydrate and fat
> Oxygen and recovery
* Oxygen deficit
* Excess post-exercise oxygen consumption (EPOC)
* Lactate threshold and OBLA
* Restoring phosphocreatine and glycogen
* Indirect calorimetry and the respiratory exchange ratio
* Energy expenditure, METs and efficiency
> Fatigue and adaptation
* Causes of fatigue
* Metabolic adaptations to training
4. Exercise Physiology: Environment, Adaptation and Populations
> Environmental physiology
* Thermoregulation during exercise
* Exercise in the heat and acclimatisation
* Exercise in the cold
* Altitude and hypoxia
* Altitude training
> Adaptations to training
* Neuromuscular adaptations to strength training
* Muscle hypertrophy
* Overtraining and underperformance
* Detraining
> Special populations
* Exercise and ageing
* Children and young athletes
* Female athletes and the menstrual cycle
* Relative energy deficiency in sport (RED-S)
* Exercise in pregnancy
* Exercise for long-term conditions
5. Biomechanics
> Describing motion
* Linear motion: distance, displacement, speed, velocity and acceleration
* Distance–time and velocity–time graphs
* Angular motion
* Centre of mass and stability
> Forces
* Newton's laws of motion
* Types of force in sport
* Free-body diagrams
* Impulse and momentum
* Friction
* Levers
* Mechanical advantage of lever systems
> Projectiles and fluids
* Projectile motion
* Factors affecting projectile distance
* Fluid mechanics: drag
* The Bernoulli principle and lift
* Spin and the Magnus effect
> Angular kinetics and analysis
* Moment of inertia and angular momentum
* Conservation of angular momentum
* Biomechanical analysis and technology
6. Training Principles and Programme Design
> Principles of training
* Specificity
* Progressive overload and FITT
* Reversibility
* Individual differences, variation and recovery
* The general adaptation syndrome and supercompensation
> Methods of training
* Continuous training
* Fartlek training
* Interval training and HIIT
* Resistance training
* Plyometrics
* Flexibility training
* Circuit training
* Speed, agility and quickness
> Programme design
* Needs analysis
* Monitoring training load
* Periodisation
* Tapering
* Warm-up and cool-down
7. Fitness Testing and Performance Analysis
> Principles of testing
* Why test?
* Validity, reliability and objectivity
* Pre-test procedures and health screening
* Ethics and informed consent in testing
> Components of fitness
* Health-related and skill-related fitness
* Testing aerobic capacity
* Testing strength and power
* Testing speed and agility
* Testing flexibility
* Body composition
* The Wingate anaerobic test
> Analysing performance
* Normative data and interpreting results
* Laboratory versus field testing
* Performance and notational analysis
* Wearable technology and GPS
8. Sport and Exercise Nutrition
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
9. Motivation, Emotion and Wellbeing
> Motivation
* Intrinsic and extrinsic motivation
* Drive theories
* Incentive theories
* Self-determination theory
* Goal-setting theory
* Achievement motivation in context
> Emotion
* Theories of emotion: James–Lange and Cannon–Bard
* The two-factor theory: Schachter–Singer
* Emotion regulation
> Stress and coping
* Stress
* The physiology of stress
* Coping
* Resilience
> Wellbeing
* Subjective wellbeing
* Happiness
* Positive psychology in practice
* Flow
* Gratitude
* Mindfulness research
* Flourishing
10. Skill Acquisition and Coaching
> Skill and ability
* The nature of skill
* Classifying skills
* Abilities
* Types of practice
* Transfer of skill
> Learning skills
* Stages of learning
* Learning curves and plateaus
* Theories of learning
* Guidance
* Feedback
> Information processing
* Information-processing models
* Reaction time and Hick's law
* Memory in skill learning
* Schema theory
* Ecological and constraints-led approaches
> Coaching
* The role of the coach
* Coaching styles
* Planning a coaching session
* Long-term athlete development
* Safeguarding and ethics in coaching
11. Injury Prevention and Rehabilitation
> Sports injuries
* Acute and chronic injuries
* Soft-tissue injuries
* Hard-tissue injuries
* Concussion
* Risk factors for injury
> Prevention
* Injury prevention strategies
* Screening and movement assessment
* Load management and injury
> Treatment and return
* First aid in sport
* The stages of tissue healing
* Rehabilitation
* Return to play
* Recovery methods
* Psychological responses to injury
12. Physical Activity
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
`;

// stages on the map; SportGradify's colours run from cobalt to cyan
export const TRACKS = [
  { name: "Stage 1 · The body in action", units: [1, 2, 3], from: "#4a6cf0", to: "#22d3ee" },
  { name: "Stage 2 · Physiology and biomechanics", units: [4, 5], from: "#3b82f6", to: "#0ea5e9" },
  { name: "Stage 3 · Training and performance", units: [6, 7, 8], from: "#6366f1", to: "#4a6cf0" },
  { name: "Stage 4 · Mind and skill", units: [9, 10], from: "#818cf8", to: "#22d3ee" },
  { name: "Stage 5 · Health, injury and society", units: [11, 12], from: "#4a6cf0", to: "#14b8a6" },
];

export const PATHS = [
  { id: "alevel", name: "A level Physical Education", sub: "The theory core of AQA and OCR A level PE: applied anatomy and physiology, energy systems, biomechanics, training, skill acquisition, sport psychology and sport and society.", units: [1, 2, 3, 5, 6, 9, 10, 12] },
  { id: "year1", name: "University year 1", sub: "The first-year core of a sport and exercise science degree: anatomy, physiology, metabolism, biomechanics, testing and psychology.", units: [1, 2, 3, 5, 7, 9] },
  { id: "sc", name: "Strength and conditioning", sub: "The science behind programming: muscle, energy systems, adaptation, training methods, testing, nutrition and injury risk.", units: [1, 3, 4, 6, 7, 8, 11] },
  { id: "coaching", name: "Coaching", sub: "How people learn and perform skills, how to motivate and lead them, plan sessions and seasons, and keep athletes safe.", units: [10, 9, 6, 11] },
  { id: "health", name: "Exercise and health", sub: "Physical activity guidelines, the physiology of health, special populations, nutrition and getting people active. Educational, not medical advice.", units: [12, 2, 4, 8, 11] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Bones, joints, muscles and nerves: the anatomical language and the musculoskeletal basis of every sporting movement.",
  2: "The heart, blood vessels, blood and lungs at rest and in exercise, VO2max and how endurance training changes them.",
  3: "ATP, the three energy systems, fuel use, oxygen deficit and EPOC, thresholds, energy expenditure and fatigue.",
  4: "Heat, cold and altitude, adaptations to strength training, overtraining, and exercise for young, older, female and clinical populations.",
  5: "Motion, Newton's laws, impulse, levers, projectiles, fluid forces, spin and angular momentum in sport.",
  6: "The principles of training, every major training method, needs analysis, load monitoring, periodisation and tapering.",
  7: "Choosing and running valid, reliable fitness tests, interpreting the results and analysing performance.",
  8: "Nutrients, the Eatwell Guide, energy balance, food labels, diet across life, and the links between diet and disease.",
  9: "Why we act, what emotions are, how stress works and what the science of wellbeing has found.",
  10: "What skill is, how it is learned and practised, information processing, feedback and the craft of coaching.",
  11: "Types and causes of sports injury, prevention, first aid, tissue healing, rehabilitation and return to play.",
  12: "The UK activity guidelines, how the body responds and adapts to exercise, fitness, and getting people moving.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
