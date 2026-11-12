// LanguageGradify Spanish: the full curriculum, 10 schools, modelled on the Council of Europe CEFR levels A1–B2, the
// Instituto Cervantes Plan Curricular (its grammar and notional inventories by level), the DfE GCSE French, German and
// Spanish subject content (2022: vocabulary, grammar and sound-symbol correspondences by tier) and the A level
// Spanish themes (Hispanic society, culture, politics and heritage). Each school teaches grammar and vocabulary in
// context; each topic is one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent
// (ids.js, written by node scripts/new-course.mjs lock spanish): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. First Steps in Spanish
> Sounds and spelling
* The Spanish alphabet and its sounds
* Vowels and diphthongs
* Stress and written accents
* Consonants that differ from English
> First conversations
* Greetings and goodbyes
* Introducing yourself
* Tú and usted
* Numbers 0 to 100
* Days, months and dates
* Telling the time
* Asking questions
> First grammar
* Nouns: gender and number
* Definite and indefinite articles
* Subject pronouns
* Ser: identity, origin and nationality
* Adjective agreement
2. The Present Tense, Family and Friends
> Regular verbs
* Regular -ar verbs in the present
* Regular -er and -ir verbs in the present
* Using the present tense
> Irregular verbs
* Tener and expressions with tener
* Ir, ir a and the near future
* Irregular yo forms: hacer, poner, salir and others
* Stem-changing verbs: e to ie
* Stem-changing verbs: o to ue and e to i
> Ser, estar and hay
* Estar: location and states
* Ser or estar?
* Hay and estar compared
> Me and my people
* Family and relationships
* Describing people: appearance and personality
* Possessive adjectives
* Gustar and expressing likes
3. Daily Life, School and Food
> Routine
* Reflexive verbs
* Daily routine
* Frequency and time expressions
> School
* School subjects and opinions
* Obligation: tener que, hay que and deber
* Comparatives
* Superlatives
> Food and drink
* Food and meals
* At the restaurant
* Shopping for food: quantities and large numbers
* Demonstratives
> Home
* My home and my room
* Prepositions of place
* Household chores and helping at home
4. Town, Travel and Directions
> In town
* Places in town
* Asking for and giving directions
* Tú commands
* Usted and ustedes commands
> Getting around
* Transport and travel
* Weather and seasons
* Holiday plans
> Services
* At the hotel
* Shopping for clothes
* Direct object pronouns
* Indirect object pronouns
* Double object pronouns
> Making plans
* Invitations and arrangements
* The present continuous
5. Talking about the Past
> The preterite
* The regular preterite
* Spelling changes in the preterite
* Irregular preterites: ser, ir, hacer and tener
* More irregular preterites: estar, poder, poner, querer, venir and decir
* Stem-changing -ir verbs in the preterite
> The imperfect
* The imperfect tense
* Describing childhood and the past
> Choosing a past tense
* Preterite or imperfect?
* Narrating a story in the past
* The past continuous
> Other past tenses
* The perfect tense
* Preterite or perfect: Spain and Latin America
* The pluperfect
* Acabar de and hace with time
6. The Future, the Conditional and Work
> The future
* The future tense
* Irregular futures
* The future of probability
> The conditional
* The conditional
* Polite requests and advice
* Si clauses: possible conditions
> The world of work
* Jobs and workplaces
* Future plans and careers
* Applying for a job: formal letters and emails
* Part-time jobs and money
> Linking ideas
* Relative pronouns: que, quien and donde
* Lo que and lo with adjectives
* Adverbs
7. The Subjunctive
> The present subjunctive
* Forming the present subjunctive
* Irregular present subjunctives
* The subjunctive after wishes and influence
* The subjunctive after emotion
* The subjunctive after doubt and denial
* Impersonal expressions and the subjunctive
> The subjunctive in clauses
* The subjunctive after cuando and time conjunctions
* The subjunctive after para que and other conjunctions
* The subjunctive in relative clauses
* Negative commands
* Ojalá, quizás and tal vez
> The past subjunctive
* The imperfect subjunctive
* Si clauses: hypothetical conditions
* Sequence of tenses
* Como si and the pluperfect subjunctive
8. Advanced Grammar and Accuracy
> Prepositions
* Por and para
* Personal a
* Verbs with prepositions
> Verb structures
* The passive with ser
* Passive and impersonal se
* Se for unplanned events
* Gerunds and infinitives
* Verbs of becoming
* The future perfect and conditional perfect
> Words and style
* Diminutives and augmentatives
* Connectives and discourse markers
* Register: formal and informal Spanish
* Common errors for English speakers
9. The Spanish-Speaking World
> Spain
* Spain's regions and languages
* Festivals and traditions in Spain
* The Civil War, Franco and the transition to democracy
> Latin America
* Mexico: history and culture
* The Andes and Indigenous cultures
* The Southern Cone
* Central America and the Caribbean
* Spanish in the United States
> Society and culture today
* Family and society today
* Technology and cyberspace
* Equality, migration and diversity
* Art and architecture
* Literature and film in Spanish
* Music and dance
> Varieties of Spanish
* Regional variation: vocabulary and pronunciation
* Voseo
10. Skills: Listening, Reading, Speaking, Writing and Translation
> Listening
* Listening strategies
* Understanding numbers, dates and details
* Listening for opinions and attitudes
> Reading
* Reading strategies
* Reading literary texts
* Cognates and false friends
> Speaking
* Pronunciation and intonation in practice
* Role plays
* Describing a photo
* Conversation and spontaneity
> Writing and translation
* Writing structured paragraphs
* Writing an extended essay
* Translation into English
* Translation into Spanish
* Dictation
`;

// stages on the map, by CEFR level; LanguageGradify's colours run from coral to sea blue
export const TRACKS = [
  { name: "Stage 1 · A1 Breakthrough", units: [1, 2], from: "#e8846f", to: "#f0a35e" },
  { name: "Stage 2 · A2 Waystage", units: [3, 4, 5], from: "#f0a35e", to: "#e8846f" },
  { name: "Stage 3 · B1 Threshold", units: [6, 7], from: "#e8846f", to: "#c86b8a" },
  { name: "Stage 4 · B2 Vantage", units: [8], from: "#c86b8a", to: "#6b8ac8" },
  { name: "Stage 5 · Cultures and skills", units: [9, 10], from: "#6b8ac8", to: "#22d3ee" },
];

export const PATHS = [
  { id: "gcse-foundation", name: "GCSE Spanish: Foundation", sub: "The sounds, core grammar and everyday topics of the GCSE Foundation tier, with exam skills.", units: [1, 2, 3, 4, 10] },
  { id: "gcse-higher", name: "GCSE Spanish: Higher", sub: "Everything for the Higher tier: present, past and future time frames, object pronouns, the conditional and a first look at the subjunctive.", units: [1, 2, 3, 4, 5, 6, 7, 10] },
  { id: "alevel", name: "A level Spanish", sub: "Secure the past and future, master the subjunctive, por and para and advanced structures, and study Hispanic society and culture.", units: [5, 6, 7, 8, 9, 10] },
  { id: "grammar", name: "Grammar in order", sub: "The verb system from the present to the pluperfect subjunctive, with pronouns, prepositions and the passive.", units: [2, 5, 6, 7, 8] },
  { id: "traveller", name: "Spanish for travel", sub: "Pronunciation, greetings, numbers, food, directions, transport, hotels and the regional Spanish you will hear.", units: [1, 2, 3, 4, 9] },
  { id: "culture", name: "Cultures of the Spanish-speaking world", sub: "Spain, Latin America and the US: history, festivals, art, film, music and how Spanish varies from place to place.", units: [9, 10] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "Pronunciation and spelling, greetings, numbers, dates and time, questions, gender, articles and the verb ser.",
  2: "The present tense, regular and irregular, ser versus estar, hay, family, describing people and gustar.",
  3: "Reflexive verbs and routine, school and obligation, comparisons, food and shopping, demonstratives and home.",
  4: "Town and directions, commands, transport, weather, hotels and shopping, object pronouns and the present continuous.",
  5: "The preterite and the imperfect, how to choose between them, the perfect and the pluperfect.",
  6: "The future and the conditional, possible conditions, jobs and careers, formal writing and relative pronouns.",
  7: "The present and imperfect subjunctive: wishes, emotion, doubt, conjunctions, relative clauses and hypotheses.",
  8: "Por and para, personal a, the passive and se, gerunds, verbs of becoming, register and accuracy.",
  9: "Spain, Latin America and the US: history, festivals, society, art, film and music, and regional Spanish.",
  10: "Exam skills: listening and reading strategies, role plays, photo description, essays, translation and dictation.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
