// LanguageGradify Japanese: the full curriculum, 12 schools, modelled on the Japan Foundation and Japan Educational
// Exchanges and Services Japanese-Language Proficiency Test (JLPT N5 to N3), the JF Standard for Japanese-Language
// Education (aligned with the Council of Europe CEFR, A1 to B1), the themes of GCSE Japanese (identity and culture, local
// area, holiday and travel, school, future aspirations, study and work, international and global dimension) and the
// Agency for Cultural Affairs Joyo kanji list (2010). Each school teaches grammar and vocabulary in context; each topic
// is one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock japanese): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. First Steps: Sounds and Hiragana
> The sound system
* The sounds of Japanese and the mora
* Vowels, long vowels and devoicing
* Pitch accent basics
> Hiragana
* Hiragana: the vowel, k and s rows
* Hiragana: the t, n and h rows
* Hiragana: the m, y, r and w rows and n
* Voiced sounds: dakuten and handakuten
* Combined sounds: small ya, yu and yo
* The small tsu and double consonants
* Long vowels in hiragana and particle spellings
> First phrases
* Greetings through the day
* Hajimemashite: introducing yourself
* Set phrases for home, school and the table
* Numbers 0 to 100
* Thank you, sorry and excuse me
2. Katakana, First Kanji and the Basic Sentence
> Katakana
* Katakana: the basic chart
* Katakana: voiced sounds, combinations and the long vowel mark
* Loanwords and extended katakana
> First kanji
* What kanji are: on and kun readings
* Strokes, stroke order and radicals
* First kanji: numbers, days and time
* First kanji: people, places and nature
* Okurigana and furigana
> The basic sentence
* X wa Y desu
* Questions with ka and question words
* Negative and past of desu
* The particle no
* Kore, sore, are and dore
* Kono, sono, ano and koko, soko, asoko
* Nationalities, languages and jobs
* Mo: also and too
3. Verbs, Particles and Daily Routine
> Verbs and the masu form
* Verb groups: ru-verbs, u-verbs and irregular verbs
* The masu form: present and future
* Negative and past masu forms
* Mashou and masen ka: suggestions and invitations
> Core particles
* The object particle o
* Ni and e: direction and destination
* De: place of action and means
* Ni for time and to for together
* Arimasu and imasu: existence and location
* Wa and ga: a first look
> Time and routine
* Telling the time
* Days of the week and dates
* Daily routine
* Frequency adverbs
* Hoshii and tai: wants
4. Adjectives, Counters and Description
> Adjectives
* I-adjectives: present and negative
* Na-adjectives: present and negative
* Past tense of adjectives
* Adjectives before nouns and joining adjectives
* Suki, kirai, jouzu and heta
> Counting
* Native numbers and the tsu counter
* Counters: nin, mai, hon, hiki and others
* Sound changes in counters
* Large numbers, prices and shopping
* Ages, years and duration
> Comparing and locating
* Comparisons: yori and no hou ga
* Superlatives with ichiban
* Position words: ue, shita, naka and more
* Describing a room and a town
5. The Te-form and Plain Forms
> The te-form
* Making the te-form
* Te kudasai: requests
* Te imasu: ongoing actions and resulting states
* Te mo ii desu and te wa ikemasen
* Linking actions and states with the te-form
* Te kara: after doing
> Plain forms
* The dictionary form
* The nai form
* The plain past: the ta form
* Plain past negative: nakatta
* Casual speech between friends
> Using plain forms
* Ta koto ga aru: experiences
* Tari tari: listing actions
* To omoimasu and to iimasu
* Noun-modifying clauses
* Kara and node: giving reasons
6. Everyday Life: GCSE Themes
> People and lifestyle
* Family and relationships
* Describing people: appearance and personality
* Hobbies, sport and free time
* Health, the body and illness
> School and work
* School life in Japan
* Part-time work and future plans
* Technology and social media
> Home, town and travel
* Home and housing
* Town, directions and transport
* Holidays and travel in Japan
* Weather and seasons
> Food and shopping
* Japanese food and eating out
* Shopping and clothes
> The wider world
* The environment and recycling
* Volunteering and global issues
* Festivals and celebrations: describing an event
7. N4 Grammar: Ability, Intention and Conditions
> Ability and intention
* The potential form
* The volitional form and to omotte imasu
* Tsumori desu: plans
* Koto ga dekiru
* You ni naru and you ni suru
* Hazu desu: expectation
> Conditionals
* The to conditional
* The ba conditional
* The tara conditional
* Nara: if that is the case
* Choosing a conditional
> Giving and receiving
* Ageru, kureru and morau
* Te ageru, te kureru and te morau
> Passive and causative
* The passive form
* The suffering passive
* The causative form
* The causative-passive
8. Keigo and Social Register
> Levels of politeness
* Plain, polite and honorific speech
* Uchi and soto: in-group and out-group
* Beautifying o and go
> Honorific and humble language
* Sonkeigo: respectful verbs
* O ni naru and the honorific passive
* Kenjougo: humble verbs
* O shimasu: humble patterns
* Choosing sonkeigo or kenjougo
> Keigo in use
* Keigo in shops and restaurants
* Telephone Japanese
* Formal emails and letters
* Requests and refusals: indirectness
* Apologies and gratitude in formal settings
* Aizuchi and conversational etiquette
9. N3 Grammar: Nuance and Viewpoint
> Aspect with the te-form
* Te shimau: completion and regret
* Te oku: doing in advance
* Te aru: deliberate results
* Te iku and te kuru
* Te miru: trying
> Hearsay and appearance
* Sou desu: hearsay
* Sou desu: it looks like
* Rashii
* You da and mitai da
* Kamoshirenai and darou
> Advanced structures
* Noni: despite and in order to
* Tame ni and you ni: purpose
* Bakari and tokoro
* Wake and hazu: reasoning
* Nagara and aida ni
* Shika and dake
* Sentence-ending particles ne, yo and yo ne
10. Kanji and Reading to N3
> The kanji system
* The Joyo kanji list and the JLPT levels
* Radicals and semantic-phonetic kanji
* Kanji compounds: on and kun readings together
* Rendaku and sound changes in compounds
* Homophones and choosing the right kanji
> Building vocabulary
* Native, Sino-Japanese and loan vocabulary
* Four-character compounds and set phrases
* Onomatopoeia: giongo and gitaigo
* Using a Japanese dictionary
> Reading
* Reading signs and notices
* Reading emails and messages
* Reading news and articles
* Reading stories
* Vertical writing and Japanese punctuation
* Strategies for unknown kanji
11. Japanese Culture and Society
> History and belief
* A short history of Japan
* Shinto and Buddhism in everyday life
* The history of the writing system
> Traditions and customs
* Festivals and the Japanese calendar
* New Year in Japan
* The tea ceremony and traditional arts
* Gift-giving, bowing and etiquette
> Modern Japan
* Anime, manga and popular culture
* Work culture and society
* An ageing society
* Japanese cities and regions
* Dialects: Kansai-ben and standard Japanese
* Washoku: Japanese food culture
* Japan and the world
12. Exam Skills: GCSE and JLPT
> The exams
* The JLPT: levels and format
* GCSE Japanese: the four skills
> Receptive skills
* Listening strategies
* Reading strategies for exams
* JLPT vocabulary and grammar questions
> Productive skills
* Speaking: role plays
* Speaking: photo description and conversation
* Writing: short texts in kana and kanji
* Writing: longer texts and genkou youshi
* Translation from Japanese
* Translation into Japanese
* Pronunciation and pitch in speaking exams
* Common errors and how to avoid them
`;

// stages on the map, by JLPT level (with the CEFR level the JF Standard aligns it to); LanguageGradify's colours
// run from coral to sea blue
export const TRACKS = [
  { name: "Stage 1 · N5 Beginner (A1)", units: [1, 2, 3, 4], from: "#e05a6a", to: "#f0a35e" },
  { name: "Stage 2 · N4 Elementary (A2)", units: [5, 6, 7, 8], from: "#f0a35e", to: "#e8846f" },
  { name: "Stage 3 · N3 Intermediate (B1)", units: [9, 10], from: "#e8846f", to: "#6b8ac8" },
  { name: "Stage 4 · Culture and skills", units: [11, 12], from: "#6b8ac8", to: "#22d3ee" },
];

export const PATHS = [
  { id: "gcse", name: "GCSE Japanese", sub: "Kana, the first kanji, core grammar from desu to the te-form and plain forms, the GCSE themes and exam skills.", units: [1, 2, 3, 4, 5, 6, 12] },
  { id: "jlpt-n5", name: "JLPT N5", sub: "Hiragana, katakana, around a hundred kanji, the masu form, particles, adjectives and counters.", units: [1, 2, 3, 4, 12] },
  { id: "jlpt-n4", name: "JLPT N4", sub: "The te-form, plain forms, potential, volitional, conditionals, giving and receiving, the passive and basic keigo.", units: [5, 7, 8, 10, 12] },
  { id: "jlpt-n3", name: "JLPT N3", sub: "Aspect, hearsay and appearance, purpose and reasoning, keigo in use, kanji to around 650 and reading longer texts.", units: [8, 9, 10, 12] },
  { id: "grammar", name: "Grammar in order", sub: "From X wa Y desu to the causative-passive and N3 nuance, one structure at a time.", units: [2, 3, 4, 5, 7, 9] },
  { id: "traveller", name: "Japanese for travel", sub: "Kana, greetings, numbers, prices, directions, transport, food, polite shop Japanese and etiquette.", units: [1, 2, 3, 4, 6, 11] },
  { id: "culture", name: "Japan: culture and society", sub: "History, religion, festivals, the arts, popular culture, work, an ageing society, dialects and the writing system.", units: [6, 8, 11] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "The sounds and rhythm of Japanese, pitch accent, the whole hiragana syllabary, greetings, introductions and numbers.",
  2: "Katakana and loanwords, what kanji are and the first kanji, and the basic sentence with wa, desu, ka, no and kore.",
  3: "Verb groups and the masu form, the particles o, ni, e, de and to, existence with arimasu and imasu, time and routine.",
  4: "I- and na-adjectives in every tense, counters and their sound changes, prices, comparisons and position words.",
  5: "The te-form and its uses, the plain forms of verbs and casual speech, experiences, reasons and noun-modifying clauses.",
  6: "The GCSE themes in Japanese: family, school, work, home, town, travel, food, shopping, health and the wider world.",
  7: "The potential and volitional forms, plans and expectations, four conditionals, giving and receiving, passive and causative.",
  8: "Keigo: plain, polite, honorific and humble speech, in-group and out-group, and polite Japanese in shops, calls and emails.",
  9: "N3 nuance: aspect with te shimau, te oku and te aru, hearsay and appearance, purpose, reasoning and sentence-ending particles.",
  10: "The Joyo kanji, radicals and compounds, word origins and onomatopoeia, and reading signs, emails, news and stories.",
  11: "History, Shinto and Buddhism, festivals, the traditional arts, etiquette, popular culture, work, cities and dialects.",
  12: "The JLPT and GCSE Japanese papers: listening, reading, role plays, writing in kana and kanji, translation and common errors.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
