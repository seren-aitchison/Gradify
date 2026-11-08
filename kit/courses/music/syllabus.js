// MusicGradify Music: the full curriculum, 12 schools, modelled on the ABRSM Music Theory syllabus (Grades 1–8),
// the GCSE and A level Music specifications (AQA, Edexcel, OCR) and a first-year university music theory,
// history and musicianship course. Each topic is taught as one lesson, grouped into modules ("> " lines) and
// stages (TRACKS). Lesson ids are permanent (ids.js, written by node scripts/new-course.mjs lock music): never
// renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Notation and Rhythm
> Pitch and the stave
* Pitch, the stave and clefs
* Note names, ledger lines and octave registers
* Accidentals: sharps, flats and naturals
* Tones, semitones and enharmonic equivalents
* The alto and tenor clefs
> Rhythm and metre
* Note values and rests
* Dotted notes and ties
* Pulse, beat and metre
* Simple time signatures
* Compound time signatures
* Grouping notes and rests
* Triplets, duplets and irregular divisions
* Syncopation, anacrusis and cross-rhythm
* Irregular and changing metres
> Reading a score
* Tempo and metronome marks
* Dynamics and articulation
* Ornaments
* Repeats, signs and score navigation
2. Scales, Keys and Intervals
> Major scales and keys
* The major scale
* Key signatures and the circle of fifths
* Scale degrees and their names
> Minor scales and keys
* Natural, harmonic and melodic minor scales
* Relative and tonic minor keys
* Minor key signatures
* Finding the key of a melody
> Other scales
* The chromatic scale
* Pentatonic and blues scales
* Whole-tone and octatonic scales
* The modes
> Intervals
* Interval number and quality
* Major, minor and perfect intervals
* Augmented and diminished intervals
* Compound intervals
* Inverting intervals
* Consonance and dissonance
* Transposition
3. Chords and Harmony
> Triads
* Triads: root, third and fifth
* Major, minor, diminished and augmented triads
* Inversions and figured bass symbols
* Diatonic triads and Roman numerals
* Chord symbols in popular music
> Seventh chords
* The dominant seventh
* Types of seventh chord
* Diatonic seventh chords
> Harmonic function
* Tonic, predominant and dominant function
* Progressions by fifth and the circle of fifths sequence
* Harmonic rhythm
* Harmonising a melody
> Chromatic harmony
* Secondary dominants
* Modulation to related keys
* Modal mixture
* The Neapolitan sixth
* Augmented sixth chords
* The diminished seventh chord
* Extended chords: ninths, elevenths and thirteenths
4. Voice Leading and Cadences
> Four-part writing
* SATB layout and vocal ranges
* Doubling and spacing
* Parallel fifths and octaves
* Principles of voice leading
* Connecting root-position chords
* Using first-inversion chords
* The cadential six-four
> Cadences
* The perfect cadence
* The imperfect cadence
* The plagal cadence
* The interrupted cadence
* Cadences in minor keys and the tierce de Picardie
> Non-chord notes and figured bass
* Passing notes and auxiliary notes
* Suspensions
* Appoggiaturas, anticipations and pedal points
* Realising a figured bass
* Harmonising a chorale melody
5. Melody and Form
> Melody
* Melodic contour and range
* Phrases and periods
* Motif and sequence
* Melodic development
* Writing a melody
> Small forms
* Binary form
* Ternary form
* Strophic and through-composed forms
* Rondo form
* Theme and variations
* Minuet and trio, scherzo and trio
* Ground bass, ostinato and passacaglia
> Large forms
* Sonata form
* The concerto
* The symphony
* Cyclic form and leitmotif
6. Ear Training and Musicianship
> Rhythm and pitch
* Hearing pulse and metre
* Rhythmic dictation
* Sight-singing and pitch matching
* Solfège and movable do
* Recognising intervals by ear
* Melodic dictation
> Harmony by ear
* Hearing chord quality
* Hearing cadences
* Hearing bass lines and inversions
* Harmonic dictation
> Aural analysis
* Hearing instruments and texture
* Recognising style and period by ear
* Hearing modulation
* Sight-reading strategies
* Aural tests in graded exams
7. Counterpoint and Texture
> Texture
* Monophony, homophony and polyphony
* Heterophony and other textures
* Describing texture
> Species counterpoint
* Principles of species counterpoint
* First species
* Second species
* Third species
* Fourth species
* Fifth species
> Contrapuntal forms and devices
* Imitation and canon
* The two-part invention
* Fugue
* Invertible counterpoint
* Augmentation, diminution, inversion and retrograde
* The chorale prelude
8. Sound, Instruments and Orchestration
> The science of sound
* Sound waves: frequency, amplitude and pitch
* The harmonic series and timbre
* Standing waves in strings and pipes
* Beats, tuning and temperament
* Loudness, decibels and hearing
* Room acoustics
> Instrument families
* The string family
* The woodwind family
* The brass family
* Percussion
* Keyboard instruments
* The voice
* Electronic instruments and music technology
> Orchestration
* Transposing instruments
* Ranges and registers
* The orchestra and its layout
* Doubling and balance
* Writing for strings
* Orchestral colour
* Reading a full score
* Chamber ensembles
9. Music History: Medieval to Classical
> The medieval period
* Plainchant
* Organum and early polyphony
* Ars nova and medieval song
> The Renaissance
* Renaissance sacred polyphony
* The madrigal
* Renaissance instrumental music
> The Baroque
* Baroque style and the basso continuo
* Baroque opera and oratorio
* The concerto grosso and the suite
* Bach and Handel
> The Classical period
* The Classical style
* Haydn, Mozart and the Classical symphony
* The string quartet
* Classical opera
* Beethoven
10. Music History: Romantic to the Present
> The Romantic era
* Romanticism in music
* The Lied and art song
* Programme music and the symphonic poem
* Romantic piano music
* Romantic opera: Verdi and Wagner
* Nationalism in music
> The twentieth century and after
* Impressionism
* Expressionism and atonality
* Serialism
* Neoclassicism
* Minimalism
* Electronic and experimental music
* Film music
* Music since 1975
11. Popular Music, Jazz and World Music
> Blues and jazz
* The blues
* The origins of jazz
* Swing and the big band
* Bebop and modern jazz
* Jazz harmony and the ii–V–I
* Improvisation
> Popular music
* Rock and roll and the birth of pop
* Popular song structure
* Rock, soul and funk
* Hip hop and electronic dance music
* Musical theatre
> World music
* Indian classical music: raga and tala
* West African drumming
* Indonesian gamelan
* Latin American music
* Arabic music and maqam
* Folk music of the British Isles
* Ethnomusicology
12. Composition and Analysis
> Analysis
* Approaches to analysis
* Harmonic analysis
* Analysing melody and motif
* Analysing form
* Schenkerian analysis
* Post-tonal analysis and pitch-class sets
* Writing about music
> Composition
* Composing to a brief
* Developing musical ideas
* Writing for voices
* Writing for instruments
* Composing in a style
* Contemporary compositional techniques
* Composing with music technology
* Presenting a score
`;

// stages on the map; MusicGradify's colours run from antique gold to teal
export const TRACKS = [
  { name: "Stage 1 · The language of music", units: [1, 2, 3], from: "#c9a25e", to: "#e0b86a" },
  { name: "Stage 2 · Harmony and craft", units: [4, 5, 7], from: "#d4a95c", to: "#b07d3a" },
  { name: "Stage 3 · Musicianship and sound", units: [6, 8], from: "#c9a25e", to: "#4fb3a9" },
  { name: "Stage 4 · History and cultures", units: [9, 10, 11], from: "#b9895a", to: "#8f6bb0" },
  { name: "Stage 5 · Analysis and composition", units: [12], from: "#c9a25e", to: "#22d3ee" },
];

export const PATHS = [
  { id: "abrsm-1-5", name: "ABRSM Theory Grades 1–5", sub: "Notation, rhythm, scales, keys, intervals, chords, cadences, terms and instruments: the ground the Grade 5 theory exam covers.", units: [1, 2, 3, 5, 8] },
  { id: "abrsm-6-8", name: "ABRSM Theory Grades 6–8", sub: "Four-part harmony, figured bass, chromatic chords, counterpoint and stylistic composition.", units: [3, 4, 7, 5, 12] },
  { id: "gcse", name: "GCSE Music", sub: "The elements of music, set-work styles, instruments, popular and world music, with listening and appraising.", units: [1, 2, 3, 5, 8, 11, 6] },
  { id: "alevel", name: "A level Music", sub: "Harmony, voice leading, form, the Western classical tradition from Baroque to modern, jazz and popular music, analysis and composition.", units: [3, 4, 5, 9, 10, 11, 12] },
  { id: "year1", name: "University year 1", sub: "First-year tonal theory, aural skills, counterpoint, music history and analysis.", units: [2, 3, 4, 6, 7, 9, 10, 12] },
  { id: "ear", name: "Ear and musicianship", sub: "Train the ear: rhythm, intervals, chords, cadences and dictation, built on the theory behind them.", units: [1, 2, 6, 3] },
  { id: "history", name: "Music in history and culture", sub: "From plainchant to film music, jazz and the music of the wider world.", units: [9, 10, 11] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "How music is written down: the stave, clefs, accidentals, note values, time signatures, tempo, dynamics and ornaments.",
  2: "Major and minor scales, key signatures and the circle of fifths, modes and other scales, intervals and transposition.",
  3: "Triads, seventh chords, Roman numerals and chord symbols, harmonic function and the chromatic chords of tonal music.",
  4: "Writing in four parts: doubling, spacing, parallels, the four cadences, non-chord notes and figured bass.",
  5: "How melodies are built and how pieces are shaped, from phrases and binary form to sonata form and the symphony.",
  6: "Ear training: pulse, intervals, chords, cadences, dictation, sight-singing and the aural tests of graded exams.",
  7: "Texture, species counterpoint, canon, invention and fugue: the craft of combining independent lines.",
  8: "The physics of sound, the instruments of the orchestra and beyond, and how composers combine them.",
  9: "Western music from plainchant to Beethoven: medieval, Renaissance, Baroque and Classical styles.",
  10: "Romanticism, nationalism, impressionism, atonality, serialism, minimalism, electronic and film music.",
  11: "The blues, jazz, popular song, rock, hip hop and musical theatre, and music from India, Africa, Indonesia and beyond.",
  12: "Analysing harmony, melody and form, Schenkerian and post-tonal analysis, and composing to a brief.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
