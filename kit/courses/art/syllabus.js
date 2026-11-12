// ArtGradify Art and Design: the full curriculum, 12 schools. Modelled on GCSE and A level Art and Design (the DfE
// subject content taught by AQA, Pearson Edexcel and OCR, with its four assessment objectives: develop, refine,
// record, present) and the QAA Subject Benchmark Statements for Art and Design and for History of Art, Architecture
// and Design. Each topic is taught as one lesson, grouped into modules ("> " lines) and stages (TRACKS). Lesson ids
// are permanent (ids.js, written by node scripts/new-course.mjs lock art): never renumber, delete or reuse one.
import { parseSyllabus } from "../../course/syllabus.js";
import { IDS, RETIRED } from "./ids.js";
export const SYLLABUS = `
1. The Visual Language of Art and Design
> What art and design are
* What is art and design?
* How art and design are assessed: the four assessment objectives
* Looking closely: an approach to visual analysis
> The visual elements
* Line
* Shape and form
* Tone and value
* Colour as a visual element
* Texture
* Space
* Pattern
> The principles of design
* Balance and symmetry
* Contrast and emphasis
* Rhythm, repetition and movement
* Proportion and scale
* Unity and variety
> Composition
* Composition and the picture plane
* The rule of thirds and the golden ratio
* Gestalt principles in art and design
2. Drawing
> Why we draw
* Drawing as thinking and recording
* Drawing materials: graphite, charcoal, ink and pastel
* Mark-making
> Observational drawing
* Measuring and sighting
* Contour and blind contour drawing
* Negative space
* Tonal drawing and chiaroscuro
* Hatching and cross-hatching
> Perspective and space
* One-point perspective
* Two- and three-point perspective
* Atmospheric perspective
* Foreshortening
> The figure and the face
* Drawing the figure: proportion and gesture
* Anatomy for artists
* Drawing the portrait
> Drawing beyond observation
* Expressive and experimental drawing
* Drawing from imagination and memory
3. Colour Theory
> Colour science
* Light and colour perception
* Additive and subtractive colour
* Hue, value and saturation
> Colour systems
* The colour wheel
* Munsell and other colour systems
* Pigments and colour mixing
> Colour relationships
* Colour harmonies
* Complementary colours and simultaneous contrast
* Itten's seven colour contrasts
* Warm and cool colour
* Colour and space
> Colour in use
* Colour symbolism and culture
* Colour in design and branding
* Albers and the interaction of colour
* Colour and accessibility
4. Painting Media and Techniques
> Paint and its history
* What paint is: pigment and binder
* Egg tempera
* Fresco
* Oil paint
* Watercolour and gouache
* Acrylic paint
> Surfaces and process
* Supports and grounds
* Brushes, knives and tools
* Underpainting and glazing
* Alla prima
* Impasto and texture
> Painting genres
* Still life
* Landscape painting
* Portraiture
* Abstract painting
> Studio practice
* Health and safety in the studio
* Conservation and the life of a painting
5. Printmaking, Sculpture and 3D
> Printmaking
* What a print is: editions and proofs
* Relief printing: woodcut and linocut
* Intaglio: etching and engraving
* Lithography
* Screen printing
* Monoprinting
> Sculpture
* Carving
* Modelling
* Casting
* Construction and assemblage
* Installation art
* Site-specific and land art
> Three-dimensional design
* Ceramics
* Textiles and fibre art
* Product and 3D design
* Architecture as an art
6. Photography, Moving Image and Digital Art
> The camera
* The camera obscura and the invention of photography
* The camera and the lens
* Exposure: aperture, shutter speed and ISO
* Composition in photography
> Photographic practice
* Documentary photography
* Photography as art
* The darkroom and analogue processes
* Editing and post-production
> Moving image and digital
* Moving image and video art
* Raster and vector images
* Digital painting and illustration
* 3D modelling and animation
* Generative art and AI
* Digital colour and resolution
7. Graphic and Communication Design
> Typography
* The anatomy of type
* Type classification
* Hierarchy and layout
* Grids
> Communication
* Visual communication and semiotics
* Logos and visual identity
* Poster design
* Illustration
* Information design
> Design for screens, products and people
* User interface design
* Packaging design
* Advertising and persuasion
* The design process: from brief to final
* Sustainable design
8. Art History: The Ancient World to the Renaissance
> Prehistory and the ancient world
* Prehistoric art
* Ancient Egyptian art
* Ancient Greek art
* Roman art
> Beyond Europe
* Art of ancient China
* Art of South Asia
* Islamic art
* Art of Africa
* Art of the ancient Americas
> Medieval Europe
* Early Christian and Byzantine art
* Romanesque and Gothic
> The Renaissance
* The Early Renaissance in Florence
* The High Renaissance
* The Northern Renaissance
* Mannerism
9. Art History: The Baroque to Mid-Century Modernism
> 1600 to 1850
* The Baroque
* The Dutch Golden Age
* Rococo
* Neoclassicism
* Romanticism
* Japanese woodblock prints
> The nineteenth century
* Realism
* The Pre-Raphaelites
* Impressionism
* Post-Impressionism
* Arts and Crafts and Art Nouveau
> Early modernism
* Fauvism and Expressionism
* Cubism
* Futurism and Constructivism
* Dada
* Surrealism
* The Bauhaus
> Mid-century
* Abstract Expressionism
* Pop Art
10. Contemporary Art and Ways of Seeing
> After modernism
* Minimalism
* Conceptual art
* Performance art
* Feminist art
* Postmodernism
* The Young British Artists
* Street art
* Global contemporary art
> Ways of seeing
* Formalism
* Iconography and iconology
* The social history of art
* Feminist and postcolonial art history
* John Berger and ways of seeing
11. The Psychology of Creativity
> Understanding creativity
* What is creativity?
* The four Ps of creativity
* Divergent thinking and its measurement
* Stages of the creative process
> Minds and conditions
* Insight and incubation
* Knowledge, expertise and creativity
* Motivation and creativity
* Design fixation and how to break it
> Creative environments
* Creative confidence
* Constraints and creativity
* Creative climate in teams
* Myths about creativity
12. Art in Society and Professional Practice
> Institutions
* Museums and galleries
* Curating and exhibitions
* The art market
* Public art and patronage
> Ethics and law
* Copyright basics for artists
* Appropriation, influence and fair dealing
* Cultural property and restitution
* Forgery and authenticity
* Representation and ethics
> Your practice
* Building a portfolio
* Applying to art school
* Careers in art and design
* Documenting and presenting your work
`;

// stages on the map; ArtGradify's colours run from magenta through violet to cyan
export const TRACKS = [
  { name: "Stage 1 · The language of art", units: [1, 2, 3], from: "#f055dd", to: "#a855f7" },
  { name: "Stage 2 · Media and making", units: [4, 5, 6, 7], from: "#e879f9", to: "#6366f1" },
  { name: "Stage 3 · Art history", units: [8, 9, 10], from: "#c084fc", to: "#38bdf8" },
  { name: "Stage 4 · Practice and the art world", units: [11, 12], from: "#f472b6", to: "#22d3ee" },
];

export const PATHS = [
  { id: "gcse", name: "GCSE Art and Design", sub: "The visual elements, drawing, colour, a range of media and the creative process behind the portfolio and the externally set assignment.", units: [1, 2, 3, 4, 11] },
  { id: "alevel", name: "A level Art and Design", sub: "Deeper practice and critical study: media, contextual art history, the personal investigation and the written related study.", units: [1, 2, 3, 4, 5, 9, 10, 11] },
  { id: "arthistory", name: "History of art", sub: "Art from prehistory to now, and the methods art historians use to read it: formalism, iconography, social and feminist histories.", units: [8, 9, 10, 11, 12] },
  { id: "design", name: "Graphic and digital design", sub: "Visual language, colour, typography, photography and digital image-making for communication design.", units: [1, 3, 6, 7, 11] },
  { id: "portfolio", name: "Portfolio and art school", sub: "From sketchbook to portfolio: drawing, process, critical writing, documentation and applying to foundation and degree courses.", units: [2, 11, 12, 1] },
];

// one line per school for the overview page
export const BLURBS = {
  1: "The visual elements and principles of design, composition and how to look closely: the vocabulary of every later school.",
  2: "Drawing from observation and imagination: materials, measuring, tone, perspective, the figure and expressive mark-making.",
  3: "How colour works in light, pigment and the eye, the systems that describe it, and how artists and designers use it.",
  4: "Tempera, fresco, oil, watercolour and acrylic: what paint is, how it is applied, the genres and the studio.",
  5: "Relief, intaglio, lithography and screen print; carving, modelling, casting, installation; ceramics, textiles and 3D design.",
  6: "Cameras, exposure, documentary and art photography, the moving image and digital image-making, including generative art.",
  7: "Typography, grids, identity, posters, illustration, information and interface design, and the design process.",
  8: "From cave painting to Mannerism: the ancient world, art beyond Europe, the Middle Ages and the Renaissance.",
  9: "From Caravaggio to Warhol: the Baroque, Romanticism, Impressionism and the movements of modernism.",
  10: "Minimalism to the global present, and the ways art historians interpret works: from formalism to postcolonial critique.",
  11: "What creativity is, how it is measured, insight and incubation, fixation, motivation and the conditions that help ideas flow.",
  12: "Museums, curating, the market and public art; copyright, appropriation, restitution and forgery; portfolios and careers.",
};

export const UNITS = parseSyllabus(SYLLABUS, IDS, RETIRED);
