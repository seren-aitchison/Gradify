// JuniorGradify Primary: the full curriculum, 12 schools, modelled on the national curriculum in England (DfE, 2013),
// Key Stages 1 and 2: maths, English, science, history and geography. Each topic is taught as one lesson, grouped into modules ("> " lines) and
// stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock primary): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Number and Place Value
> Counting and numbers
* Counting objects to 20
* Counting forwards and backwards
* Reading and writing numbers to 100
* Odd and even numbers
> Place value
* Tens and ones
* Hundreds, tens and ones
* Thousands and beyond
* Comparing and ordering numbers
* Rounding numbers
> Number patterns
* Counting in steps
* Negative numbers
* Roman numerals
2. The Four Operations and Times Tables
> Adding and subtracting
* Number bonds
* Adding in your head
* Subtracting in your head
* Column addition
* Column subtraction
* Checking with the inverse
> Multiplying and dividing
* What multiplication means
* Times tables
* Factors and multiples
* What division means
* Written multiplication
* Short division and remainders
3. Fractions, Decimals and Percentages
> Fractions
* Halves and quarters
* Unit and non-unit fractions
* Equivalent fractions
* Comparing fractions
* Adding and subtracting fractions
* Fractions of amounts
* Mixed numbers and improper fractions
* Multiplying and dividing fractions
> Decimals and percentages
* Tenths and hundredths
* Decimal place value
* Rounding decimals
* Percentages
* Fractions, decimals and percentages together
* Ratio and proportion
4. Measurement, Geometry and Statistics
> Measurement
* Length and height
* Mass and capacity
* Money
* Telling the time
* Perimeter
* Area
* Volume
* Converting units
> Geometry
* 2-D shapes
* 3-D shapes
* Angles
* Lines of symmetry
* Position and direction
* Coordinates
> Statistics
* Tally charts and pictograms
* Bar charts and tables
* Line graphs
* The mean
5. Phonics and Spelling
> Phonics
* Letters and sounds
* Blending to read
* Segmenting to spell
* Digraphs and trigraphs
* Tricky words
* Alternative spellings of sounds
> Spelling
* Adding suffixes
* Prefixes
* Plurals
* Homophones
* Silent letters
* Spelling rules and exceptions
6. Reading and Comprehension
> Becoming a reader
* Reading for pleasure
* Reading fluently
* Understanding new words
> Comprehension skills
* Retrieving information
* Making inferences
* Predicting
* Summarising
* The author's choice of language
* Fiction and non-fiction
* Poetry
* Reading a play
* Answering comprehension questions
7. Grammar, Punctuation and Writing
> Grammar
* Nouns and noun phrases
* Verbs and tenses
* Adjectives and adverbs
* Pronouns
* Conjunctions
* Prepositions
* Clauses and sentences
* Active and passive voice
> Punctuation
* Capital letters and full stops
* Question marks and exclamation marks
* Commas
* Apostrophes
* Inverted commas
* Brackets, dashes, colons and semicolons
> Writing
* Planning your writing
* Writing a story
* Non-fiction writing
* Editing and improving
8. Plants, Animals and Habitats
> Plants
* Parts of a plant
* What plants need to grow
* How seeds and bulbs grow
* Pollination and seed dispersal
> Animals including humans
* Animal groups
* The human body and senses
* Teeth and eating
* Skeletons and muscles
* The digestive system
* The heart and circulation
* Healthy living
> Living things and their habitats
* Habitats
* Food chains
* Classifying living things
* Life cycles
* Evolution and inheritance
9. Materials, Forces and Magnets
> Materials
* Everyday materials
* Properties of materials
* Solids, liquids and gases
* The water cycle
* Rocks and soils
* Changes of materials
> Forces
* Pushes and pulls
* Friction
* Gravity
* Air and water resistance
* Magnets
* Levers, pulleys and gears
10. Light, Sound, Electricity, Earth and Space
> Light and sound
* Light and dark
* Shadows
* How we see
* How sounds are made
* Pitch and volume
> Electricity
* Electrical safety
* Simple circuits
* Conductors and insulators
* Circuit symbols
> Earth and space
* Seasons and weather
* Day and night
* The Sun, Earth and Moon
* The solar system
11. History
> British history
* Changes within living memory
* The Stone Age to the Iron Age
* Roman Britain
* Anglo-Saxons and Scots
* Vikings
* A local history study
* A theme beyond 1066
> The wider world
* Ancient Egypt
* Ancient Greece
* The Maya
* Events beyond living memory
* Significant people
> Thinking like a historian
* Sources and evidence
* Timelines and chronology
12. Geography
> Locational knowledge
* The United Kingdom
* Continents and oceans
* Countries and capitals
* Latitude, longitude and time zones
> Place and human geography
* Comparing places
* Settlements
* Land use and trade
> Physical geography
* Rivers
* Mountains
* Volcanoes and earthquakes
* Climate zones and biomes
> Geographical skills
* Maps and compasses
* Grid references
* Fieldwork
`;

export const TRACKS = [
  { name: "Stage 1 · Maths", units: [1, 2, 3, 4], from: "#7fe05a", to: "#22d3ee" },
  { name: "Stage 2 · English", units: [5, 6, 7], from: "#fbbf24", to: "#7fe05a" },
  { name: "Stage 3 · Science", units: [8, 9, 10], from: "#34d399", to: "#38bdf8" },
  { name: "Stage 4 · History and geography", units: [11, 12], from: "#f472b6", to: "#a78bfa" },
];

export const PATHS = [
  { id: "ks1", name: "Key Stage 1 (ages 5 to 7)", sub: "The first steps: counting, place value, adding and taking away, phonics, early reading, and plants and animals.", units: [1, 2, 5, 6, 8] },
  { id: "sats", name: "Getting ready for Year 6 SATs", sub: "The maths and English that the Key Stage 2 tests cover: number, calculation, fractions, measures, reading, grammar, punctuation and spelling.", units: [1, 2, 3, 4, 6, 7, 5] },
  { id: "maths", name: "Maths from Year 1 to Year 6", sub: "Every maths school in order, from counting to 20 to fractions, ratio, geometry and statistics.", units: [1, 2, 3, 4] },
  { id: "science", name: "Primary science", sub: "Living things, materials, forces, light, sound, electricity, and the Earth in space.", units: [8, 9, 10] },
  { id: "world", name: "Our world: history and geography", sub: "Britain from the Stone Age to the Vikings, ancient civilisations, and the places, maps and landscapes of the world.", units: [11, 12] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Counting, reading and writing numbers, place value up to millions, rounding, negative numbers and Roman numerals.",
  2: "Adding, subtracting, multiplying and dividing in your head and on paper, with the times tables up to 12 × 12.",
  3: "Halves and quarters to equivalent fractions, decimals, percentages, and ratio and proportion.",
  4: "Measuring length, mass, money and time, perimeter and area, shapes and angles, and reading charts and graphs.",
  5: "Letters and sounds, blending and segmenting, tricky words, and the spelling rules for suffixes, prefixes and homophones.",
  6: "Reading fluently and for pleasure, finding information, inference, prediction, summarising and the author's choices.",
  7: "Word classes, tenses, clauses, every punctuation mark from full stops to semicolons, and planning and editing writing.",
  8: "Plants, animal groups, the human body, healthy living, habitats, food chains, life cycles and evolution.",
  9: "Everyday materials and their properties, solids, liquids and gases, rocks, and pushes, pulls, friction, gravity and magnets.",
  10: "Light and shadows, how sounds are made, simple circuits, the seasons, and the Sun, Earth, Moon and planets.",
  11: "From the Stone Age to the Vikings, ancient Egypt, Greece and the Maya, and how historians use evidence.",
  12: "The UK and the world's continents and oceans, rivers, mountains and volcanoes, settlements, and reading maps.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
