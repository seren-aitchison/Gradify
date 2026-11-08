// LitGradify English Literature: the full curriculum, 10 schools. Modelled on the GCSE and A level English Literature
// specifications (AQA 8702, 7712 and 7717; OCR J352 and H472; Pearson Edexcel 1ET0 and 9ET0), the DfE GCSE subject
// content for English literature and the QAA Subject Benchmark Statement for English. Each topic is taught as one
// lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids are permanent (ids.js, written by
// node scripts/new-course.mjs lock literature): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. Foundations of Literary Study
> What literature is
* What is literature?
* Genre and form
* Author, narrator and reader
* Text and context
* The literary canon
> Close reading
* Close reading: a method
* Diction and register
* Imagery
* Metaphor, simile and personification
* Symbol and motif
* Tone and mood
* Syntax and sentence structure
* The sound of language
> Interpretation
* Ambiguity and multiple meanings
* Irony
* Intertextuality and allusion
* Using quotations as evidence
* From annotation to argument
2. Poetry and Poetics
> The language of poetry
* What makes a poem?
* The speaker and the poetic voice
* Imagery in poetry
* Rhyme and sound patterning
> Metre and rhythm
* Stress and the metrical foot
* Iambic pentameter
* Other metres and metrical variation
* Free verse
> Poetic forms
* The sonnet
* The ballad
* The ode
* The elegy
* The dramatic monologue
* The lyric
* Blank verse
* Narrative and epic poetry
* Stanza forms
> Reading poems
* Enjambment, caesura and the line
* Analysing a poem: a method
* Comparing poems
3. Drama and Shakespeare
> The nature of drama
* Drama as performance
* Tragedy
* Comedy
* Dramatic structure
* Character and dialogue in drama
* Stagecraft and stage directions
> Shakespeare
* Shakespeare's theatre
* Shakespeare's language
* Soliloquy and aside
* Shakespearean tragedy
* Shakespearean comedy
* The history plays and the late romances
* Marlowe and Shakespeare's contemporaries
> Drama after Shakespeare
* Restoration and eighteenth-century drama
* Wilde, Shaw and the Victorian stage
* Ibsen, Chekhov and modern realism
* Modernist and absurdist drama
* Post-war and contemporary British drama
4. Prose Fiction and the Novel
> Elements of fiction
* Story, plot and narrative
* Narrators and point of view
* Free indirect discourse
* Characterisation
* Setting and atmosphere
* Time and structure in narrative
* Dialogue in fiction
> The novel's history
* The rise of the novel
* The realist novel
* The Gothic novel
* The Bildungsroman
* The modernist novel
* The postmodern novel
> Short forms and genres
* The short story
* The novella
* Genre fiction
* Reading a novel: a method
5. Medieval to Eighteenth-Century Literature
> Medieval literature
* Old English literature
* Chaucer and Middle English
* Medieval romance and drama
> The Renaissance
* The English Renaissance
* Renaissance poetry: Wyatt, Sidney and Spenser
* Metaphysical poetry
* Milton and Paradise Lost
* The English Bible and Renaissance prose
> Restoration and the eighteenth century
* Restoration literature
* Augustan satire: Dryden, Pope and Swift
* The eighteenth-century novel
* Sensibility and the Gothic beginnings
* Women writers of the long eighteenth century
6. Romantic to Contemporary Literature
> Romanticism
* Romanticism: an overview
* Wordsworth, Coleridge and Lyrical Ballads
* The second-generation Romantics
* Women writers of the Romantic period
> The Victorians
* The Victorian age
* Victorian poetry
* The Victorian novel
* Late Victorian literature and the fin de siècle
> The twentieth century and after
* Modernism
* Literature of the First World War
* Literature between the wars
* Post-war literature
* Postcolonial literature
* Contemporary literature
7. Literary Theory and Criticism
> Foundations of criticism
* What is literary theory?
* Liberal humanism and practical criticism
* New Criticism
* Formalism and structuralism
> Text, language and reader
* Poststructuralism and deconstruction
* Reader-response theory
* Psychoanalytic criticism
* Narratology
> Identity, history and power
* Marxist criticism
* Feminist criticism
* Gender and queer theory
* Postcolonial criticism
* New historicism and cultural materialism
* Ecocriticism
> Using criticism
* Critical views and debate
* Literary value and evaluation
8. Set Texts: Drama and Nineteenth-Century Prose
> Macbeth
* Macbeth: context
* Macbeth: ambition and power
* Macbeth: the supernatural
* Macbeth: gender and Lady Macbeth
* Macbeth: language and imagery
> Frankenstein
* Frankenstein: context and form
* Frankenstein: creation and responsibility
* Frankenstein: the creature and sympathy
* Frankenstein: nature, science and the sublime
> A Christmas Carol
* A Christmas Carol: context
* A Christmas Carol: Scrooge's transformation
* A Christmas Carol: social responsibility
> Jane Eyre
* Jane Eyre: context
* Jane Eyre: independence and identity
* Jane Eyre: Bertha Mason and critical readings
> Strange Case of Dr Jekyll and Mr Hyde
* Jekyll and Hyde: context
* Jekyll and Hyde: duality
* Jekyll and Hyde: narrative and setting
9. Set Texts: Romantic, Victorian and War Poetry
> Romantic poetry
* Blake: Songs of Innocence and of Experience
* Wordsworth: nature and memory
* Coleridge: The Rime of the Ancient Mariner
* Shelley: Ozymandias and the political poems
* Keats: the odes
> Victorian poetry
* Tennyson: The Charge of the Light Brigade and In Memoriam
* Browning: My Last Duchess
* Christina Rossetti
* Thomas Hardy's poetry
> War poetry
* First World War poetry: an overview
* Wilfred Owen
* Siegfried Sassoon
* Isaac Rosenberg and Edward Thomas
* Women's poetry of the First World War
* War poetry after 1918
10. Unseen, Comparative and Essay Writing
> Unseen analysis
* Approaching an unseen poem
* Approaching unseen prose
* Approaching unseen drama
> Comparison
* Comparative analysis: principles
* Structuring a comparison
* Comparing across periods
> Essay writing
* Reading the question
* Building an argument
* Paragraphing: point, evidence, analysis
* Embedding quotations
* Writing about context
* Writing about writers' methods
* Introductions and conclusions
* Academic style and register
* Referencing and academic integrity
* The coursework essay
* Revising for literature exams
`;

export const TRACKS = [
  { name: "Stage 1 · Reading and writing about literature", units: [1, 10], from: "#b06ce0", to: "#8b5cf6" },
  { name: "Stage 2 · Poetry, drama and prose", units: [2, 3, 4], from: "#c084fc", to: "#818cf8" },
  { name: "Stage 3 · Literary history", units: [5, 6], from: "#a855f7", to: "#6366f1" },
  { name: "Stage 4 · Theory and criticism", units: [7], from: "#d8b4fe", to: "#a78bfa" },
  { name: "Stage 5 · Set texts", units: [8, 9], from: "#e879f9", to: "#22d3ee" },
];

export const PATHS = [
  { id: "gcse", name: "GCSE English Literature", sub: "Close reading, poetry, Shakespeare, the nineteenth-century novel, war and Romantic poetry, unseen poetry and exam essays.", units: [1, 2, 8, 9, 10, 3, 4] },
  { id: "alevel", name: "A level English Literature", sub: "The A level core: forms, literary history, critical views and theory, comparison, unseen analysis and the coursework essay.", units: [1, 2, 3, 4, 6, 7, 10] },
  { id: "degree", name: "University year 1", sub: "The first-year core of an English degree: close reading, poetics, literary history from Chaucer to now, and theory.", units: [1, 2, 5, 6, 7, 4, 3] },
  { id: "poetry", name: "Poetry", sub: "How poems work, from metre and form to the Romantics, the Victorians and the poets of the First World War.", units: [2, 9, 1, 10] },
  { id: "essays", name: "Writing about literature", sub: "From annotation to a finished argument: close reading, critical views and the essay itself.", units: [1, 10, 7] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "What literature is and how to read it closely: diction, imagery, tone, syntax, sound, irony, allusion and argument.",
  2: "How poems work: the speaker, imagery, rhyme, metre, free verse, the major forms and a method for any poem.",
  3: "Drama on the page and the stage: tragedy and comedy, Shakespeare's theatre and language, and drama since.",
  4: "How fiction works: narrators, point of view, character, time and structure, and the novel from Defoe to now.",
  5: "English literature from Beowulf and Chaucer through the Renaissance, Milton and the Augustans to the early novel.",
  6: "From the Romantics and the Victorians to modernism, the world wars, postcolonial and contemporary writing.",
  7: "The theories that shape interpretation, from practical criticism to feminism, postcolonialism and ecocriticism.",
  8: "Close study of Macbeth, Frankenstein, A Christmas Carol, Jane Eyre and Jekyll and Hyde.",
  9: "Close study of Blake, Wordsworth, Coleridge, Shelley, Keats, Tennyson, Browning, Rossetti, Hardy and the war poets.",
  10: "Unseen analysis, comparison and the craft of the literature essay, from the question to the conclusion.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
