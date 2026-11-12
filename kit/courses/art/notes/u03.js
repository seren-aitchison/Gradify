// School 3: Colour Theory. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md): objectives, key terms, summaries,
// typed and dated sources, evidence status (EV:) and questions at three levels in every lesson. Works are described, not
// reproduced; sources are cited for checking, pending human verification (qa.js). Level: GCSE to first-year undergraduate.
export default `
## Light and colour perception
LV: Introductory · Foundation
S: Colour is not a property of objects alone but an experience produced by light, surfaces and the visual system together. This lesson explains the visible spectrum, how surfaces reflect light, the three cone types and why colour depends on context.
O: Explain how light, surface and the eye together produce colour
O: Describe trichromatic and opponent-process accounts of colour vision
O: Evaluate why the same surface can appear different colours in different conditions
H: Light and surfaces
P: Visible light is the part of the electromagnetic spectrum from roughly 380 to 750 nanometres in wavelength. Isaac Newton showed in 1666 (published in *Opticks*, 1704) that a prism splits white sunlight into a spectrum and a second prism recombines it. A surface looks red because it absorbs most wavelengths and reflects mainly long ones; a white surface reflects most wavelengths; a black one absorbs most.
H: The eye and the brain
P: The retina has **rods**, which work in dim light and do not distinguish colour, and three kinds of **cones**, most sensitive to short (blue), medium (green) and long (yellow-green to red) wavelengths. This is the **trichromatic** theory of Thomas Young (1802) and Hermann von Helmholtz. Ewald Hering's **opponent-process** theory (1870s) explains why we never see a reddish green or a bluish yellow: signals are compared in red-green, blue-yellow and light-dark channels. Both are now understood to operate at different stages.
- **Afterimages**: stare at a red square, then a white wall, and a green-blue afterimage appears, as opponent channels rebound.
- **Colour constancy**: a white shirt looks white in daylight and lamplight, although the light it reflects differs; the brain discounts the illuminant.
- **Metamerism**: two paints that match under one light may not match under another.
K: Colour is made by light, surface and the visual system together: surfaces reflect some wavelengths, three cone types respond, and the brain compares signals and adjusts for context.
X: Why did people disagree about "the dress" photograph in 2015?
> The image was ambiguous about the lighting: it could be a blue and black dress in warm light or a white and gold dress in cool shadow.
> Viewers' visual systems made different assumptions about the illuminant.
> Colour constancy then "corrected" the same pixels in opposite directions.
> The case shows that perceived colour is an interpretation, not a direct reading of wavelength.
!: Thinking an object "has" one true colour. A painter must observe the colour actually seen under the light and next to its neighbours, not the remembered local colour.
H: Why it matters to artists
P: The Impressionists painted the changing colours of light, as in Monet's series of haystacks and Rouen Cathedral (1890s). Gallery lighting, screen calibration and printing inks all affect how a work is seen; artists check colour under the light in which the work will be shown.
EV: established | Human colour vision depends on three cone types, with opponent processing later in the visual pathway.
EV: established | Viewers' perceptions of "the dress" image split largely according to their assumptions about its lighting, as published studies in 2015 reported.
T: Visible spectrum | The range of wavelengths of light visible to the human eye, roughly 380 to 750 nanometres
T: Colour constancy | The tendency to see a surface's colour as stable despite changes in the light illuminating it
T: Metamerism | When two colours match under one light source but not under another
SUM: Light, surface reflection and the visual system together produce colour.
SUM: Trichromatic and opponent processing explain colour vision; constancy and context make colour an interpretation.
SRC: Newton I., Opticks | primary | 1704
SRC: Livingstone M., Vision and Art: The Biology of Seeing, Abrams | secondary | 2002
Q: Why does a red apple look red? | Its surface absorbs most wavelengths and reflects mainly long (red) ones, which the eye's cones detect.
Q: What is colour constancy? | Seeing a surface's colour as stable even when the light on it changes.
M1#art-u03-01-q1@1: How many types of cone does the typical human retina contain? | Three | One | Two | Four | Trichromatic vision depends on short, medium and long wavelength cones.
M2#art-u03-01-q2@2: A painter's colours matched perfectly in the studio but look different under gallery spotlights. What explains this? | Metamerism: the pigments reflect differently under the new light | The paint has dried a different colour overnight | Colour constancy has stopped working | The canvas has absorbed the paint | Colours that match under one illuminant can differ under another because their reflectance curves differ.
TF1#art-u03-01-q3@1: Rods in the retina are responsible for seeing colour in bright light. | false | Rods work in dim light and do not distinguish colour; cones provide colour vision.
M3#art-u03-01-q4@3: What does the disagreement over "the dress" photograph (2015) best show? | Perceived colour depends on the brain's assumptions about lighting, not only on the wavelengths reaching the eye | Some viewers' screens were broken | Colour is a fixed property of fabric | Only colour-blind people saw it differently | The ambiguous illumination led different visual systems to correct the same pixels differently.
SA3#art-u03-01-q5@1,3: Explain why a painter should paint the colours they see rather than the colours they know, using ideas about light and perception. | Perceived colour depends on the light source, shadow, reflected colour from neighbours and simultaneous contrast; colour constancy leads us to "know" a local colour (white snow) that is actually blue in shadow or orange at sunset. Observing actual colour relationships, as the Impressionists did, gives convincing light and atmosphere. | Explains role of light source ; Explains surroundings or contrast ; Explains colour constancy ; Gives an artistic example ; Draws a conclusion about practice

## Additive and subtractive colour
LV: Introductory · Application
S: Colour can be mixed by adding lights or by subtracting wavelengths with pigments, dyes and inks. This lesson explains RGB and CMYK, why the primaries differ, and what this means for screens, printing and painting.
O: Distinguish additive from subtractive colour mixing
O: Explain RGB and CMYK and the primaries of each system
O: Apply the systems to predict the results of mixing light or ink
H: Additive mixing
P: In **additive** colour, coloured lights are combined; each adds wavelengths, so the mixture is lighter. The additive primaries are **red, green and blue (RGB)**. Red and green light make yellow; green and blue make cyan; blue and red make magenta; all three at full strength make white. Screens, projectors and stage lighting are additive: each pixel combines tiny red, green and blue elements.
H: Subtractive mixing
P: In **subtractive** colour, pigments, dyes or inks absorb (subtract) wavelengths from white light; each layer or mixture removes more, so the result is darker. The subtractive primaries for printing are **cyan, magenta and yellow (CMY)**, with **black (K)** added because the three inks together make a muddy dark brown rather than a true black, and because black ink is cheaper and sharper for text: hence **CMYK**. Cyan absorbs red, magenta absorbs green, yellow absorbs blue.
E: Additive: R + G = yellow; G + B = cyan; B + R = magenta; R + G + B = white :: lights add wavelengths
E: Subtractive: C + M = blue; M + Y = red; Y + C = green; C + M + Y = near black :: inks remove wavelengths
K: Lights add (RGB, towards white); pigments and inks subtract (CMY, towards black). The two systems are complementary: each additive primary is the colour absorbed by one subtractive primary.
X: A designer's bright screen green looks dull in print. Why?
> The screen makes green by emitting green light, an additive colour with high intensity.
> Print must make green by mixing cyan and yellow inks on paper, which only reflect light.
> Some saturated RGB colours fall outside the CMYK **gamut** (range of reproducible colours).
> The fix is to soft-proof in CMYK, adjust the colour, or use a special spot ink.
!: Telling students that the "real" primaries are red, yellow and blue in every context. RYB is a traditional painter's convention that works roughly with pigments; it is not the primary set for light (RGB) or for process printing (CMY).
H: Optical mixing
P: A third kind of mixing happens in the eye when small dots of colour are placed side by side and seen from a distance: **optical** or **partitive** mixing. Georges Seurat's pointillism, in *A Sunday on La Grande Jatte* (1884–86, Art Institute of Chicago), aimed at this, and halftone printing relies on it. Optical mixes average the colours' lightness rather than darkening them as paint mixtures do.
EV: established | Additive mixing of red, green and blue light and subtractive mixing of cyan, magenta and yellow inks follow from how light is emitted and absorbed.
EV: contested | Whether Seurat's dots actually produced the luminous optical mixing he intended is debated; at normal viewing distances the dots often remain visible and can look greyer.
T: Additive colour | Colour produced by combining light, with red, green and blue primaries mixing towards white
T: Subtractive colour | Colour produced by pigments or inks absorbing wavelengths, with cyan, magenta and yellow primaries mixing towards black
T: Gamut | The range of colours a device, ink set or medium can reproduce
SUM: Additive (RGB) mixing combines light towards white; subtractive (CMYK) mixing absorbs light towards black.
SUM: Screens and print have different gamuts, so colours must be checked for the output; optical mixing happens in the eye.
SRC: Itten J., The Art of Color, Reinhold | primary | 1961
SRC: Hunt R. W. G., The Reproduction of Colour, 6th edition, Wiley | secondary | 2004
SRC: Art Institute of Chicago, Georges Seurat, A Sunday on La Grande Jatte, collection record | primary | 2026
Q: What are the additive primaries? | Red, green and blue (RGB).
Q: Why is black (K) added to CMY in printing? | The three inks together make a muddy dark brown, not a crisp black, and black ink is cheaper and sharper for text.
M1#art-u03-02-q1@1: What colour do red and green light make when combined? | Yellow | Brown | Cyan | Black | Additive mixing of red and green light produces yellow; pigments of those colours would mix to a dark brownish colour.
M2#art-u03-02-q2@2: A logo designed on screen in a vivid RGB orange prints dull. What is the most likely cause? | The colour lies outside the CMYK printing gamut | The printer has run out of black ink | The screen uses subtractive colour | RGB colours always print brighter | Highly saturated RGB colours often cannot be reproduced with CMYK inks.
MATCH1#art-u03-02-q3@1: Match each technology to its colour system. | Phone screen = Additive RGB ; Magazine printing = Subtractive CMYK ; Stage lighting gels mixed on a white backdrop = Additive RGB ; Halftone dots seen from a distance = Optical mixing | Emitted light adds, inks subtract, and small dots blend in the eye.
M3#art-u03-02-q4@3: Why do Seurat's dots of pure colour not simply make dark mixtures as the same paints would on a palette? | Dots side by side mix optically in the eye, averaging lightness, rather than subtracting light as mixed pigments do | Seurat used additive light | The canvas reflects extra light | Pointillist paints are fluorescent | Partitive mixing occurs in perception; physical mixing of pigments subtracts more wavelengths and darkens.
SA2#art-u03-02-q5@2,3: Explain the difference between additive and subtractive colour and why a designer needs to understand both. | Additive colour combines light (RGB), mixing towards white, as in screens; subtractive colour uses pigments and inks (CMYK) that absorb wavelengths, mixing towards black, as in print. The systems have different gamuts, so a design must be prepared in the right colour mode, soft-proofed and adjusted, or spot colours used, to keep colours consistent across screen and print. | Defines additive with primaries ; Defines subtractive with primaries ; Gives an example of each ; Explains gamut ; Explains practical consequence for design

## Hue, value and saturation
LV: Introductory · Application
S: Any colour can be described by three properties: hue, value and saturation (chroma). This lesson explains each property in depth, how to change one without the others, and why value matters most in painting.
O: Define hue, value and saturation and describe how each can be changed
O: Apply mixing to alter one property of a colour while holding the others
O: Evaluate the claim that value matters more than hue in creating form
H: Three properties
- **Hue**: position on the colour wheel (a red, an orange-red).
- **Value**: lightness or darkness. Yellow has the highest natural value of the hues; violet the lowest.
- **Saturation**, **chroma** or **intensity**: purity. A cadmium red straight from the tube is high chroma; the same red with grey is low chroma.
P: In mixing, a **tint** adds white (raises value, usually lowers chroma), a **shade** adds black (lowers value, can shift hue), and a **tone** adds grey (lowers chroma). Adding a colour's **complement** lowers chroma while keeping a lively, natural grey, which many painters prefer to adding black.
K: Hue, value and chroma vary independently. Painters change chroma with complements or grey, value with white or darker colours, and check value first because it carries form.
X: Lower the chroma of a cadmium orange without changing its value.
> Mix a small amount of its complement, ultramarine blue, into the orange.
> The mixture greys towards a brownish orange; it may also darken slightly.
> Add a touch of white to restore the value, comparing with a greyscale value scale.
> Result: a muted orange at the same value, suitable for a shadowed brick wall.
H: Value carries form
P: Painters often say "colour gets the credit, value does the work". If values are correct, a painting reads in a black-and-white photograph; if values are wrong, beautiful hues cannot rescue the form. Margaret Livingstone (2002) links this to the brain's separate processing of luminance (the "where" system) and colour (the "what" system). Monet's *Impression, Sunrise* (1872, Musée Marmottan Monet) is often cited: the orange sun is almost the same value as the grey sky, so in greyscale it nearly disappears, making it shimmer.
!: Darkening every colour with black. Black can deaden colours and shift yellows towards green; darker neighbouring hues or complements often give richer shadows.
EV: established | Livingstone measured the luminance of the sun and sky in Monet's Impression, Sunrise and found them nearly equal, explaining the sun's shimmering effect.
EV: contested | How far value should dominate colour is a matter of artistic approach: colourists such as Matisse built form through hue relationships rather than tonal modelling.
T: Chroma | The purity or intensity of a colour, from vivid to grey; similar to saturation
T: Tint | A colour mixed with white
T: Shade | A colour mixed with black
SUM: Hue, value and chroma are independent properties of colour.
SUM: Value carries form and legibility; chroma is lowered best with complements; black should be used with care.
SRC: Livingstone M., Vision and Art: The Biology of Seeing, Abrams | secondary | 2002
SRC: Munsell A. H., A Color Notation | primary | 1905
Q: What is a tone, in colour mixing? | A colour mixed with grey, lowering its saturation.
Q: Which hue has the highest natural value? | Yellow.
M1#art-u03-03-q1@1: Adding white to a colour produces a… | Tint | Shade | Tone | Complement | A tint is a hue plus white; a shade adds black; a tone adds grey.
M2#art-u03-03-q2@2: A painter wants a natural grey-green for distant trees. What is the best mix? | Green with a little of its complement, red, adjusted with white | Green with black | Pure green from the tube | Green with yellow | A complement lowers chroma while keeping a lively grey; black can deaden and shift the hue.
TF2#art-u03-03-q3@2: Two colours of very different hue can have the same value. | true | Hue and value are independent; an orange and a grey-blue can match in lightness.
M3#art-u03-03-q4@3: Why does the sun in Monet's Impression, Sunrise seem to shimmer? | It is close in value to the surrounding sky, so it differs in hue but not luminance | It is painted with fluorescent pigment | It is much darker than the sky | It has a heavy black outline | Livingstone showed the near-equal luminance confuses the brain's position system, causing instability.
SA3#art-u03-03-q5@2,3: Evaluate the claim that "colour gets the credit, but value does the work". | Value is crucial: correct values model form and space and keep a painting legible in greyscale; luminance is processed separately from hue, and Monet's equiluminant sun shows how value affects perception. But colourists such as Matisse or Rothko build space and feeling through hue and chroma relationships; in such work colour does much of the work. The claim is a useful rule for representational painting rather than a universal truth. | Explains value and form ; Refers to perception or Monet ; Gives a counterexample of colour-led work ; Considers type of painting ; Reaches a judgement

## The colour wheel
LV: Introductory · Foundation
S: The colour wheel arranges hues in a circle to show their relationships. This lesson traces it from Newton to Itten, explains primary, secondary and tertiary colours on the painter's wheel, and discusses the strengths and limits of the RYB model.
O: Describe the structure of the traditional painter's colour wheel
O: Explain the history of the colour wheel from Newton to Itten
O: Evaluate the RYB wheel against modern colour models
H: Origins
P: Newton bent the spectrum into a circle in *Opticks* (1704), joining red and violet. In 1810 the poet Johann Wolfgang von Goethe published *Theory of Colours*, a wheel based on perception and feeling rather than physics. Painters adopted red, yellow and blue as primaries; Johannes Itten's twelve-part wheel, published in *The Art of Color* (1961) from his Bauhaus teaching, is still widely taught.
H: Itten's twelve-hue wheel
- **Primaries**: red, yellow, blue, in an inner triangle.
- **Secondaries**: orange (red and yellow), green (yellow and blue), violet (blue and red).
- **Tertiaries**: yellow-orange, red-orange, red-violet, blue-violet, blue-green, yellow-green.
P: Opposites on the wheel are **complementaries**; neighbours are **analogous**; the wheel can be divided into warm (yellow to red-violet) and cool (violet to yellow-green) halves.
K: The painter's wheel arranges twelve hues from three primaries; it shows complementary, analogous and warm-cool relationships at a glance.
X: Paint a twelve-hue wheel from three primaries.
> Paint the three primaries at the points of an equilateral triangle on the circle.
> Mix equal-looking proportions to make the three secondaries between them.
> Mix each primary with its neighbouring secondary for the six tertiaries.
> Observe which mixes are dull (often violet from red and blue): this reveals the limits of the pigments, not of your mixing.
!: Expecting perfectly saturated secondaries from any red, yellow and blue. Real pigments are impure: a warm cadmium red and ultramarine make a dull violet; a cool quinacridone magenta and ultramarine make a clean one. Paint makers' "split primary" palettes (a warm and a cool of each primary) address this.
H: Limits of the RYB wheel
P: Measured by modern colour science, cyan, magenta and yellow are better subtractive primaries than red, yellow and blue: they produce a wider gamut of mixtures. The RYB wheel is a practical tradition rather than a physical law. Systems such as Munsell space hues by perception, and complementaries there differ from RYB (red's complement is closer to blue-green than green).
EV: established | Newton arranged the spectrum as a circle in Opticks (1704), and Itten's twelve-hue wheel derives from his Bauhaus course.
EV: established | Cyan, magenta and yellow give a wider subtractive gamut than red, yellow and blue, which is why they are used in process printing.
T: Secondary colour | A colour made by mixing two primaries on a given colour wheel
T: Tertiary colour | A colour made by mixing a primary with an adjacent secondary
T: Split primary palette | A palette containing a warm and a cool version of each primary to allow cleaner mixtures
SUM: The colour wheel runs from Newton's circle to Itten's twelve-hue painter's wheel.
SUM: The RYB wheel is useful but approximate; CMY and perceptual systems describe colour more accurately.
SRC: Itten J., The Art of Color, Reinhold | primary | 1961
SRC: Goethe J. W. von, Theory of Colours (Zur Farbenlehre) | primary | 1810
SRC: Gage J., Colour and Culture: Practice and Meaning from Antiquity to Abstraction, Thames and Hudson | secondary | 1993
Q: Who first arranged the colours of the spectrum in a circle? | Isaac Newton, in Opticks (1704).
Q: What is a tertiary colour? | A mix of a primary and an adjacent secondary, such as blue-green.
M1#art-u03-04-q1@1: On Itten's wheel, which is a secondary colour? | Violet | Blue-green | Red | Yellow-orange | Violet is a mix of two primaries (red and blue); blue-green and yellow-orange are tertiaries.
M2#art-u03-04-q2@2: A student mixes cadmium red and ultramarine but gets a muddy violet. What is the best solution? | Use a cool red such as quinacridone magenta with the ultramarine | Add black to the mixture | Add yellow to brighten it | Use more water | A warm red contains yellow, which greys the violet; a cool, bluish red mixes cleaner violets.
TF1#art-u03-04-q3@1: Goethe's Theory of Colours (1810) was concerned with the perception and effects of colour. | true | Goethe focused on experience, contrast and feeling rather than Newton's physics.
M3#art-u03-04-q4@3: Which is the best evaluation of the RYB colour wheel? | It is a useful practical guide for painters but less accurate than CMY or perceptual systems | It is the scientifically correct model of colour | It is useless and should not be taught | It applies equally to light and pigment | RYB works approximately with paints; colour science shows other primaries give wider gamuts.
SA2#art-u03-04-q5@1,3: Explain how the traditional colour wheel is constructed and discuss one limitation of it. | Three primaries (red, yellow, blue) are placed equidistantly; mixing pairs gives the secondaries orange, green and violet between them; mixing a primary and adjacent secondary gives six tertiaries, twelve hues in all. Limitations: real pigments are impure, so some mixes are dull; RYB gives a narrower gamut than CMY; and perceptual complementaries differ from the wheel's opposites. | Describes primaries ; Describes secondaries ; Describes tertiaries ; Identifies a limitation ; Explains the limitation

## Munsell and other colour systems
LV: Intermediate · Application
S: Colour systems give every colour a precise address so it can be specified, matched and communicated. This lesson explains the Munsell system, CIE colour space, and practical systems such as Pantone and hexadecimal codes.
O: Describe the three dimensions of the Munsell colour system
O: Explain why designers use standard systems such as Pantone, CMYK values and hexadecimal codes
O: Apply colour notations to specify and communicate a colour accurately
H: Munsell
P: The American painter and teacher Albert Munsell published *A Color Notation* (1905). His system arranges colours in three dimensions: **hue** around a circle (five principal hues: red, yellow, green, blue, purple, with intermediates), **value** up a vertical axis from black (0) to white (10), and **chroma** outward from the grey centre. Steps are spaced by perception, so the "solid" is irregular: yellow reaches high chroma at high value, blue at lower value. A notation such as 5R 4/14 means hue 5R, value 4, chroma 14.
K: A colour system gives a precise address in three dimensions (hue, value, chroma) so that colours can be specified, compared and reproduced consistently.
H: Other systems
- **CIE** colour spaces (from 1931; CIELAB from 1976) are mathematical models based on measurements of human colour matching, used in science and colour management.
- **Natural Colour System (NCS)**, developed in Sweden, describes colours by their resemblance to six elementary colours; used in architecture and paint.
- **Pantone Matching System** (1963): numbered spot ink colours used in branding and printing.
- **RGB** values (0 to 255 per channel) and **hexadecimal** codes such as #FF0000 for screens; **CMYK** percentages for process print.
X: Specify a brand colour for a client.
> Choose the colour and record its Pantone spot reference for print.
> Record its CMYK breakdown for process printing.
> Record its RGB and hexadecimal values for screens, checking contrast with text colours.
> Note that each conversion is approximate, so supply a printed swatch for approval.
!: Assuming a hex code will look the same everywhere. Screens differ in calibration and colour space (sRGB, Display P3), and print conversions shift colours; specification needs a system and a check.
H: Why systems matter
P: Munsell intended his system for teaching children to see colour precisely; it was later adopted for soil science, standards and industry. Designers depend on systems to keep a brand consistent across print, screen, signage and fabric.
EV: established | Munsell's system, published in 1905, spaces hue, value and chroma by perceptual steps.
EV: established | The CIE 1931 colour space was derived from colour-matching experiments by Wright and Guild in the late 1920s.
T: Munsell system | A colour system that describes colours by hue, value and chroma in perceptually even steps
T: Hexadecimal colour code | A six-digit code (such as #FF0000) giving the red, green and blue values of a screen colour
T: Spot colour | A specific premixed ink, such as a Pantone colour, printed as a single colour rather than built from CMYK
SUM: Munsell describes colour by hue, value and chroma in perceptual steps.
SUM: CIE, NCS, Pantone, CMYK and hex codes let colours be specified for science, print and screen, with checks across media.
SRC: Munsell A. H., A Color Notation | primary | 1905
SRC: Hunt R. W. G., The Reproduction of Colour, 6th edition, Wiley | secondary | 2004
Q: What are the three dimensions of Munsell's system? | Hue, value and chroma.
Q: What does a hexadecimal colour code record? | The red, green and blue values of a screen colour, two digits each, in base 16.
M1#art-u03-05-q1@1: In Munsell notation 5R 4/14, what does the 4 represent? | Value | Chroma | Hue | Saturation in percent | The number before the slash is value (0 black to 10 white); after it is chroma.
M2#art-u03-05-q2@2: A brand's red must look the same on business cards printed in different countries. What should the designer specify? | A Pantone spot colour with a printed swatch | Only the hexadecimal code | The phrase "bright red" | An RGB value only | Spot colours are standardised inks; hex and RGB describe screens, not print.
TF2#art-u03-05-q3@2: In the Munsell system, all hues reach the same maximum chroma. | false | The colour solid is irregular: some hues, such as yellow and red, reach much higher chroma than others.
M3#art-u03-05-q4@3: Why did Munsell space his colours by perception rather than by equal amounts of pigment or wavelength? | So that equal steps in the notation look equal to human observers, making it useful for specification and teaching | Because pigments were not available | To match Newton's spectrum exactly | Because perception and physics give the same steps | Physical quantities do not correspond to equal perceived differences, so perceptual spacing makes communication reliable.
SA2#art-u03-05-q5@2,3: Explain how a designer would specify a colour so it is reproduced consistently across print and screen. | Choose the colour in a standard system: a Pantone reference for spot printing, CMYK percentages for process print, RGB and hex values for screen. Record all in a brand guide, check conversions with proofs and calibrated screens, test contrast for accessibility, and provide physical swatches, because devices and inks differ. | Names a print system ; Names a screen system ; Explains conversions are approximate ; Mentions proofing or calibration ; Mentions brand guide or swatches

## Pigments and colour mixing
LV: Intermediate · Application
S: Paint colours come from pigments with their own chemistry, history and handling. This lesson explains pigment properties, a practical limited palette, and how to mix colours cleanly, with notes on toxicity and permanence.
O: Describe key properties of pigments, such as transparency, tinting strength, temperature and lightfastness
O: Apply a limited palette to mix a controlled range of colours
O: Evaluate the historical and practical significance of particular pigments
H: Pigment properties
P: A **pigment** is a coloured powder, insoluble in its binder, that is suspended in paint (oil, acrylic polymer, gum arabic). Pigments differ in:
- **Transparency or opacity**: transparent pigments (alizarin, phthalo blue) glaze; opaque ones (cadmiums, titanium white) cover.
- **Tinting strength**: phthalo blue overpowers mixtures; raw umber is weak.
- **Colour bias or temperature**: ultramarine leans to violet, phthalo blue to green.
- **Lightfastness**: resistance to fading, graded on paint labels (for example ASTM I and II are the most permanent).
- **Toxicity**: lead white, cadmiums and cobalts need care; avoid ingesting or inhaling pigment and follow labels.
K: Know your pigments: their bias, transparency, strength and permanence decide how they mix and how a painting will last.
H: A limited palette
P: Many painters use a split-primary palette: a warm and a cool of each primary (cadmium yellow and lemon yellow; cadmium red and quinacridone magenta; ultramarine and phthalo blue), plus titanium white, often with earth colours (yellow ochre, burnt sienna, burnt umber). The **Zorn palette** (attributed to Anders Zorn) uses only yellow ochre, vermilion or cadmium red, ivory black and white, giving a surprisingly full flesh range.
X: Mix a clean green and a muted green from the split-primary palette.
> Clean green: lemon yellow (cool, green-biased) with phthalo blue (green-biased): both lean towards green, so the mix is vivid.
> Muted green: cadmium yellow (orange-biased) with ultramarine (violet-biased): each contains a little red, the complement of green, so the mix is softer.
> The rule: pigments biased towards each other mix clean; pigments biased away mix muted.
!: Over-mixing on the palette or mixing too many pigments. Three or more pigments with opposite biases quickly make mud; mix with as few pigments as possible.
H: Pigments in history
P: **Ultramarine**, ground from lapis lazuli mined in Afghanistan, was more costly than gold in the Renaissance, so contracts sometimes specified it for the Virgin's robe. A synthetic version (French ultramarine) was introduced in 1828. **Prussian blue** (c.1706) was the first modern synthetic pigment and was used in Hokusai's *Great Wave*. Tube paints, patented by John Goffe Rand in 1841, let the Impressionists paint outdoors.
EV: established | Natural ultramarine was among the most expensive pigments in Renaissance Europe, and patrons' contracts sometimes specified its use.
EV: established | Prussian blue, discovered in Berlin around 1706, became widely used in Japanese prints in the 1820s and 1830s.
T: Pigment | A finely ground coloured substance, insoluble in its binder, that gives paint its colour
T: Lightfastness | A pigment's resistance to fading on exposure to light
T: Tinting strength | How strongly a pigment colours a mixture
SUM: Pigments differ in transparency, strength, bias, permanence and toxicity.
SUM: A split-primary palette and colour bias allow controlled mixing; pigment history affects meaning and technique.
SRC: Ball P., Bright Earth: The Invention of Colour, Viking | secondary | 2001
SRC: Mayer R., The Artist's Handbook of Materials and Techniques, 5th edition, Viking | secondary | 1991
SRC: National Gallery, London, technical bulletins and pigment research | secondary | 2026 | https://www.nationalgallery.org.uk/research
Q: What is lightfastness? | A pigment's resistance to fading when exposed to light.
Q: What was natural ultramarine made from? | Ground lapis lazuli, mined mainly in Afghanistan.
M1#art-u03-06-q1@1: Which pigment property describes how strongly it colours a mixture? | Tinting strength | Opacity | Lightfastness | Granulation | Tinting strength measures the pigment's power in a mixture; phthalo blue is very strong.
M2#art-u03-06-q2@2: A student mixes cadmium yellow and ultramarine and gets a dull green. Why? | Both pigments are biased away from green and contain a hint of red, green's complement | The paints were too thick | Ultramarine is opaque | Cadmium yellow is not a primary | Orange-biased yellow and violet-biased blue each carry some red, which greys the green.
TF1#art-u03-06-q3@1: Prussian blue was the first modern synthetic pigment. | true | It was discovered in Berlin around 1706 and was widely used, including in Hokusai's prints.
M3#art-u03-06-q4@3: Why did Renaissance contracts sometimes specify ultramarine for the Virgin's robe? | The pigment was extremely costly, so its use displayed the patron's devotion and wealth and honoured the subject | Ultramarine was the only blue available | It was required by law | It dried faster than other blues | Material value carried meaning: the costliest blue honoured the most revered figure.
SA2#art-u03-06-q5@1,2: Explain how pigment bias affects colour mixing and how a painter can use a split-primary palette to control it. | Each pigment leans towards a neighbouring hue (ultramarine to violet, phthalo blue to green). Mixing two pigments biased towards each other (lemon yellow and phthalo blue) gives a clean secondary; mixing pigments biased away (cadmium yellow and ultramarine) introduces the complement and gives a muted result. A split-primary palette provides a warm and a cool of each primary so the painter can choose clean or muted mixes deliberately. | Defines bias ; Gives clean mix example ; Gives muted mix example ; Explains the complement effect ; Explains split-primary palette

## Colour harmonies
LV: Intermediate · Application
S: Colour harmonies are combinations of hues chosen by their positions on the colour wheel. This lesson explains monochromatic, analogous, complementary, split-complementary, triadic and tetradic schemes, and how dominance and proportion make a scheme work.
O: Identify the main colour harmony schemes on the colour wheel
O: Apply a harmony scheme with a dominant colour and accents to a design or painting
O: Evaluate the usefulness of harmony rules against artists' practice
H: The schemes
- **Monochromatic**: tints, tones and shades of one hue; calm and unified, as in Picasso's Blue Period (1901–04).
- **Analogous**: three to five neighbours on the wheel (yellow, yellow-orange, orange); harmonious and natural.
- **Complementary**: two opposites (blue and orange); vibrant, high contrast.
- **Split-complementary**: one hue with the two neighbours of its complement (blue with red-orange and yellow-orange); contrast with less tension.
- **Triadic**: three hues equally spaced (red, yellow, blue; or orange, green, violet); lively and balanced.
- **Tetradic (double complementary)**: two complementary pairs; rich but hard to balance.
K: A harmony scheme chooses hues by their relationships on the wheel; it works when one colour dominates, others support, and an accent is used sparingly.
H: Dominance and proportion
P: Equal amounts of strongly contrasting colours tend to compete. Designers often use a **60-30-10** guideline: about 60% dominant colour, 30% secondary and 10% accent. Goethe proposed proportions for balancing hues by their brightness (for example yellow to violet as about 1 to 3), which Itten repeated; such ratios are guides, not laws. Varying value and chroma within a scheme matters as much as the hues chosen.
X: Plan a poster for a jazz night with a split-complementary scheme.
> Choose a dominant deep blue for the background (about 60%).
> Add a warmer red-orange for the main image (about 30%).
> Use a small yellow-orange accent for the date (about 10%), the highest contrast against blue.
> Vary values so text reads in greyscale, then test with the client.
!: Thinking a correct scheme guarantees a good result. Hue choice without control of value, chroma and proportion can still look garish or muddy.
H: Harmony in practice
P: Many painters choose colours intuitively from observation and adjust relationships on the canvas. Harmony theories describe common patterns rather than dictate them. Digital tools (such as colour-wheel apps) generate schemes quickly, but designers still test them in context, with real content and in greyscale.
EV: established | Picasso's Blue Period paintings (1901–04) use a predominantly blue, near-monochromatic palette.
EV: contested | Fixed proportional ratios for balancing hues (Goethe, Itten) are traditional guides with little experimental support.
T: Analogous colours | Hues adjacent on the colour wheel
T: Split-complementary | A scheme of one hue and the two hues adjacent to its complement
T: Triadic scheme | Three hues equally spaced around the colour wheel
SUM: Harmony schemes range from monochromatic and analogous to complementary, split-complementary, triadic and tetradic.
SUM: Dominance, proportion, value and chroma make a scheme work; rules are guides.
SRC: Itten J., The Art of Color, Reinhold | primary | 1961
SRC: Goethe J. W. von, Theory of Colours (Zur Farbenlehre) | primary | 1810
Q: What is a monochromatic scheme? | A scheme using tints, tones and shades of a single hue.
Q: What is the 60-30-10 guideline? | About 60% dominant colour, 30% secondary and 10% accent.
M1#art-u03-07-q1@1: Red, yellow and blue equally spaced on the wheel form which scheme? | Triadic | Analogous | Monochromatic | Split-complementary | Three hues equally spaced around the wheel make a triadic scheme; analogous hues are neighbours.
M2#art-u03-07-q2@2: A designer wants harmony with some contrast but less tension than a direct complementary pair. Which scheme suits best? | Split-complementary | Tetradic | Complementary | Monochromatic | Using the neighbours of the complement keeps contrast while softening the opposition.
MATCH2#art-u03-07-q3@1,2: Match each palette to its scheme. | Yellow, yellow-orange and orange = Analogous ; Blue with orange = Complementary ; Three blues of different value = Monochromatic ; Orange, green and violet = Triadic | Each palette follows the named relationship on the wheel.
M3#art-u03-07-q4@3: A poster uses an exact triadic scheme in equal amounts and looks chaotic. What is the most effective improvement? | Make one colour dominant, reduce another to an accent, and vary values | Switch to a different triad in equal amounts | Add a fourth hue | Increase every colour's saturation | Proportion and value control are needed for a scheme to read as harmony.
SA3#art-u03-07-q5@2,3: Evaluate the usefulness of colour harmony rules for an artist or designer. | Rules give a quick framework for choosing related hues, help beginners avoid clashes and support consistent branding. But they ignore value, chroma, proportion and context, which often matter more; artists choose colour from observation and intuition, and fixed ratios lack evidence. Useful as a starting point to be tested in context. | Explains benefits ; Notes role of value, chroma or proportion ; Notes artists' practice ; Notes weak evidence for fixed ratios ; Reaches a judgement

## Complementary colours and simultaneous contrast
LV: Intermediate · Application
S: Colours change appearance according to their neighbours. This lesson explains Chevreul's law of simultaneous contrast, successive contrast and afterimages, and how painters and designers exploit or avoid them.
O: Explain simultaneous and successive contrast
O: Apply complementary contrast to intensify or neutralise colours
O: Analyse the use of complementary contrast in a named painting
H: Chevreul's discovery
P: Michel-Eugène Chevreul, a chemist directing the dye works at the Gobelins tapestry manufactory in Paris, noticed that some dyes looked dull not because of the dye but because of the colours woven beside them. In *The Principles of Harmony and Contrast of Colours* (1839) he described **simultaneous contrast**: each colour tends to tinge its neighbour with its own complement. A grey square looks slightly orange on a blue ground and slightly bluish on an orange ground.
- Placed side by side, **complementaries** intensify each other.
- A colour looks **lighter** on a dark ground and **darker** on a light ground.
- A colour looks **warmer** next to cool colours and **cooler** next to warm ones.
H: Successive contrast
P: **Successive contrast** is the afterimage: after staring at a red patch, a white surface shows a pale blue-green. This is a perceptual response in the eye and brain, connected to opponent processing.
K: No colour is seen in isolation: neighbours push each other towards their complements, so colour relationships, not individual colours, determine what we see.
X: Make a grey look warm and then cool.
> Paint two identical mid-grey squares.
> Surround one with saturated blue and the other with saturated orange.
> The grey on blue looks warm, faintly orange; the grey on orange looks cool, faintly blue.
> Use this in painting: a neutral shadow beside a warm light will look cool without being painted blue.
!: Correcting a colour in isolation. A colour that looks wrong may be right but affected by its neighbour; adjust relationships, or test the colour against a neutral grey card.
H: Artists and contrast
P: Delacroix studied complementary effects; the Impressionists painted shadows with complements of the light; Van Gogh wrote of expressing "the terrible passions of humanity by means of red and green" in *The Night Café* (1888, Yale University Art Gallery). Neo-Impressionists such as Seurat built paintings on Chevreul's ideas. Mixing complementaries, by contrast, neutralises them towards grey, a key way to mix natural shadows.
EV: established | Chevreul published his law of simultaneous contrast in 1839 from his work on dyes at the Gobelins.
EV: established | Van Gogh described his intention for red and green in The Night Café in a letter to his brother Theo in September 1888.
T: Simultaneous contrast | The effect by which adjacent colours alter each other's appearance, each pushing its neighbour towards its complement
T: Successive contrast | An afterimage in the complementary colour seen after looking at a colour for some time
T: Neutralise | To lower a colour's saturation by mixing in its complement
SUM: Chevreul showed that neighbouring colours tinge each other with their complements.
SUM: Complementaries intensify side by side and neutralise when mixed; painters exploit both.
SRC: Chevreul M.-E., The Principles of Harmony and Contrast of Colours | primary | 1839
SRC: Van Gogh Museum, Vincent van Gogh: The Letters, letter to Theo of 8 September 1888 | primary | 2009 | https://vangoghletters.org/
Q: What did Chevreul discover about colours side by side? | Each colour tinges its neighbour with its own complement: simultaneous contrast.
Q: What happens when you mix two complementary paints? | They neutralise each other towards grey or brown.
M1#art-u03-08-q1@1: What is an afterimage in the complementary colour called? | Successive contrast | Simultaneous contrast | Metamerism | Optical mixing | Successive contrast follows over time; simultaneous contrast occurs with neighbours at once.
M2#art-u03-08-q2@2: A painter wants a small orange boat to blaze against the sea. Which choice helps most? | Surround it with blue | Surround it with yellow-orange | Surround it with brown | Mix blue into the orange | Placing a colour beside its complement intensifies it; mixing them would neutralise it.
TF2#art-u03-08-q3@2: An identical grey can look warmer on a blue background than on an orange one. | true | Simultaneous contrast tinges the grey towards the complement of its surroundings.
M3#art-u03-08-q4@3: Why did Chevreul conclude that the Gobelins dyes were not faulty? | The dull appearance came from simultaneous contrast with adjacent colours in the weave, not from the dyes | The dyes faded only in sunlight | The wool absorbed the dye unevenly | The workers mixed the dyes wrongly | His investigation showed perception of colour depends on neighbours, which changed the advice he gave to weavers.
SA2#art-u03-08-q5@2,3: Explain simultaneous contrast and how a painter could use it, with an example. | Adjacent colours push each other towards their complements and alter apparent value and temperature (Chevreul, 1839). Painters place complementaries side by side to intensify colour, as Van Gogh did with red and green in The Night Café, or use neutral shadows that look cool beside warm light; they also adjust colours in context rather than in isolation. | Defines simultaneous contrast ; Credits Chevreul ; Explains intensifying complements ; Gives a named example ; Explains practical use

## Itten's seven colour contrasts
LV: Intermediate · Evaluation
S: Johannes Itten, who taught the preliminary course at the Bauhaus, classified seven kinds of colour contrast. This lesson explains each, how they help analyse paintings, and where Itten's theory is open to criticism.
O: Name and describe Itten's seven colour contrasts
O: Apply the seven contrasts to analyse a painting or design
O: Evaluate Itten's theory, including its subjective and spiritual elements
H: The seven contrasts
- **Contrast of hue**: undiluted hues side by side (red, yellow, blue); loud and festive, as in folk art and Mondrian.
- **Light-dark contrast**: value contrast, the strongest for form and legibility.
- **Cold-warm contrast**: warm and cool hues, creating space and atmosphere.
- **Complementary contrast**: opposites that intensify each other and, mixed, give grey.
- **Simultaneous contrast**: the eye generating complements in neighbours (Chevreul).
- **Contrast of saturation**: pure colours against dulled ones; a small saturated area glows among greys.
- **Contrast of extension (proportion)**: the relative areas of colours, balanced according to their strength.
K: Itten's seven contrasts (hue, light-dark, cold-warm, complementary, simultaneous, saturation and extension) give a vocabulary for how colours act on one another in a work.
X: Analyse colour contrasts in a Rothko painting from the 1950s (described generally).
> Contrast of hue: large rectangles of red, orange or maroon stacked on a field.
> Contrast of saturation: an intense band beside a muted one creates a glow.
> Light-dark contrast is often low, so edges seem to breathe and float.
> Contrast of extension: unequal areas balance a strong colour against a larger, quieter one.
H: Itten and the Bauhaus
P: Itten taught the Bauhaus Vorkurs (preliminary course) from 1919 to 1923, combining exercises in materials and contrasts with breathing exercises and Mazdaznan, a spiritual movement; tensions with Walter Gropius over this led to his departure. *The Art of Color* (*Kunst der Farbe*, 1961) presented his teaching. His colour exercises remain standard in foundation courses.
H: Using the contrasts in practice
P: The contrasts rarely act alone: a single painting usually combines several, and one tends to dominate. Analysing which contrast is doing the most work (light-dark in Caravaggio, cold-warm in a Monet snow scene, saturation in a Morandi still life of muted bottles) gives precise, evidence-based colour analysis for the written parts of GCSE and A level, and in a sketchbook each contrast can be tested as a small study before a final piece.
!: Treating Itten's subjective claims as science. His assignment of personality "seasons" to people's colour preferences, and his spiritual interpretations, are not supported by evidence; his classification of contrasts remains a useful analytical tool.
EV: established | Itten taught the Bauhaus preliminary course from 1919 to 1923 and published his colour theory as Kunst der Farbe in 1961.
EV: contested | Itten's links between colours, personality types and spiritual states are subjective and lack empirical support.
T: Contrast of extension | Contrast created by the relative areas of colours, used to balance their strengths
T: Contrast of saturation | Contrast between pure, intense colours and dulled ones
T: Vorkurs | The Bauhaus preliminary course, taught first by Johannes Itten
SUM: Itten classified seven colour contrasts that act together in any work.
SUM: The classification is a useful analytical tool; his spiritual and personality claims are not evidence-based.
SRC: Itten J., The Art of Color, Reinhold | primary | 1961
SRC: Droste M., Bauhaus 1919–1933, Taschen | secondary | 2002
Q: Name Itten's seven colour contrasts. | Hue, light-dark, cold-warm, complementary, simultaneous, saturation and extension.
Q: Which Bauhaus course did Itten teach? | The preliminary course (Vorkurs), from 1919 to 1923.
M1#art-u03-09-q1@1: Which of Itten's contrasts concerns the relative areas of colours? | Contrast of extension | Contrast of hue | Light-dark contrast | Contrast of saturation | Extension (proportion) deals with how much area each colour occupies.
M2#art-u03-09-q2@2: In a grey painting, a small spot of pure red seems to glow. Which contrast is mainly at work? | Contrast of saturation | Contrast of hue | Cold-warm contrast | Contrast of extension only | An intense colour among dulled ones stands out through saturation contrast.
MS2#art-u03-09-q3@1,2: Which are among Itten's seven contrasts? | Cold-warm ; Simultaneous ; Light-dark | Texture contrast ; Contrast of scale | Itten's contrasts concern colour; texture and scale are not among them.
M3#art-u03-09-q4@3: Which is the fairest evaluation of Itten's colour theory? | His seven contrasts are a useful descriptive tool, but his spiritual and personality claims are subjective | It is a complete scientific theory of colour | It is worthless because Itten was a mystic | It applies only to Bauhaus design | Separate the analytical framework, widely used, from the unsupported claims.
SA3#art-u03-09-q5@2,3: Use at least three of Itten's contrasts to analyse a painting or design you know, and evaluate how useful the framework is. | Names a work and applies three contrasts accurately (for example light-dark for focus, cold-warm for space, saturation or extension for emphasis), describing visible evidence for each and its effect. Evaluates: the contrasts give a precise vocabulary and reveal how colour creates space and focus, but they describe rather than explain meaning and some of Itten's claims are subjective. | Names a work ; Applies three contrasts accurately ; Describes visual evidence ; Explains effects ; Evaluates the framework

## Warm and cool colour
LV: Introductory · Application
S: Colour temperature describes whether a colour feels warm (towards red-orange) or cool (towards blue-green). This lesson explains relative temperature, warm light and cool shadow, and how temperature creates space, mood and form.
O: Explain colour temperature as a relative property
O: Apply warm-cool relationships to model form and light
O: Analyse how temperature creates mood and space in a named work
H: Relative temperature
P: Reds, oranges and yellows are called **warm**; blues, greens and blue-violets **cool**. But temperature is **relative**: a lemon yellow is cool compared with a cadmium yellow; an ultramarine is warm (violet-leaning) beside a phthalo blue. Painters compare temperatures within a hue as much as across the wheel.
K: Temperature is relative: every colour is warmer or cooler than its neighbours, and painters use these shifts to model light, form and space.
H: Light and shadow
P: In daylight, a common rule is **warm light, cool shadow**: sunlight is warm, and shadows receive cool light from the blue sky. Under cool north light from a window, lit planes look cool and shadows relatively warm. Edges where light turns into shadow often show a warm band. The Impressionists painted coloured shadows rather than greys or blacks; Monet's snow scenes, such as *The Magpie* (1868–69, Musée d'Orsay), show blue-violet shadows on snow.
X: Paint an orange in sunlight on a white tablecloth.
> Lit side: warm, bright orange with a pale warm yellow highlight.
> Shadow side: a cooler, darker orange, neutralised with a little blue, and reflected warm light from the cloth near the base.
> Cast shadow on the cloth: cool blue-violet, warmed and darkened near the contact point.
> The temperature shifts, not just value, make the light convincing.
!: Darkening shadows only with black or brown. Real shadows shift in temperature as well as value; ignoring this produces dull, dirty-looking painting.
H: Space and mood
P: Warm colours tend to advance and cool to recede, supporting atmospheric perspective. Temperature shapes mood: Picasso's Blue Period suggests melancholy; Rose Period works feel gentler. Designers use warm palettes for energy and appetite (food brands) and cool palettes for calm and trust (finance, health), though such associations are cultural and contestable.
EV: established | Monet and other Impressionists painted coloured shadows on snow, as in The Magpie (1868–69).
EV: contested | Experimental evidence that warm colours physically advance and cool recede (chromostereopsis) is real but varies between individuals and depends on viewing conditions.
T: Colour temperature | The perceived warmth or coolness of a colour, judged relative to other colours
T: Chromostereopsis | A visual effect in which colours of different wavelengths, such as red and blue, appear at different depths
SUM: Warm and cool are relative; temperature varies within every hue.
SUM: Warm light, cool shadow (or the reverse) models form; temperature creates space and mood.
SRC: Musée d'Orsay, Claude Monet, The Magpie, collection record | primary | 2026
SRC: Gurney J., Color and Light: A Guide for the Realist Painter, Andrews McMeel | secondary | 2010
Q: What does "warm light, cool shadow" mean? | In sunlight, lit areas look warm and shadows cool because they receive blue skylight.
Q: Is lemon yellow warm or cool? | Cool relative to cadmium yellow, though warm relative to blue: temperature is relative.
M1#art-u03-10-q1@1: Which of these is relatively cooler? | Phthalo blue compared with ultramarine | Cadmium red compared with alizarin crimson | Cadmium yellow compared with lemon yellow | Orange compared with yellow | Phthalo blue leans green and is cooler than violet-leaning ultramarine.
M2#art-u03-10-q2@2: A painter's sunlit landscape looks dull. What would most improve the sense of light? | Make shadows cooler and lit planes warmer, not just darker and lighter | Darken all shadows with black | Use the same temperature everywhere | Lower the saturation of the lit areas | Temperature contrast between light and shadow creates the effect of sunlight.
TF1#art-u03-10-q3@1: Colour temperature is relative to surrounding colours. | true | A colour can be warm in one context and cool in another.
M3#art-u03-10-q4@3: Why are the shadows on the snow in Monet's The Magpie blue-violet rather than grey? | Snow in shadow reflects cool skylight, and Monet painted the observed colour of light rather than an assumed grey | Monet used blue to show it was night | Blue paint was cheaper | He followed a rule that shadows must be black | Impressionists recorded perceived colour; shadowed snow is lit by the blue sky.
SA2#art-u03-10-q5@1,2: Explain how you would use warm and cool colour to model a form in sunlight. | Use warm, light colours on planes facing the sun, with warm highlights; cooler, darker colours in the form shadow, neutralised with the complement; warm reflected light in shadows near warm surfaces; cool cast shadows lit by skylight, warmer and darker near contact. Compare temperatures relatively and keep values correct. | Warm lit planes ; Cool form shadow ; Reflected light ; Cool cast shadows ; Notes relativity or value

## Colour and space
LV: Intermediate · Application
S: Colour can create, flatten or contradict pictorial space. This lesson brings together advancing and receding colour, aerial perspective, and modernist uses of colour to assert the flat surface or to make space without perspective.
O: Explain how hue, value, saturation and temperature affect perceived depth
O: Apply colour to push and pull planes in a composition
O: Evaluate modernist uses of colour that create or deny space
H: Colour and depth cues
- **Value contrast**: high contrast reads near; low contrast reads far.
- **Saturation**: intense colours tend to advance; greyed colours recede.
- **Temperature**: warm advances, cool recedes (with individual variation).
- **Size and edge**: large, hard-edged colour areas assert themselves; soft edges recede.
P: Combined in aerial perspective, these produce convincing depth even without linear perspective.
K: Colour makes space through value, saturation, temperature and edges: high contrast, intensity and warmth come forward; low contrast, greyness and coolness go back.
H: Push and pull
P: The painter and teacher Hans Hofmann described **push and pull**: colour planes on a flat canvas seem to advance and recede against one another, creating space without perspective. Cézanne built space with modulated patches of warm and cool colour (he spoke of modulating rather than modelling). Matisse's *The Red Studio* (1911, MoMA) floods the room with one red, flattening walls and floor so the paintings in the studio float on the surface.
X: Make a square appear in front of or behind a ground.
> Paint a cool, pale blue ground and place a saturated warm orange square on it: the square advances.
> Repaint the square in a grey-blue close in value to the ground: it sinks back and almost merges.
> Reverse it: an intense warm ground with a cool, pale square can make the square read as a hole.
> The same shape occupies different depths through colour alone.
!: Assuming warm colours always advance. A low-saturation, low-contrast warm colour can recede behind an intense, high-contrast cool one; all factors interact.
H: Colour field and space
P: Colour Field painters such as Mark Rothko and Barnett Newman used large expanses of colour so the viewer, standing close, is enveloped: space becomes an experience rather than a depicted view. Josef Albers's *Homage to the Square* series (from 1950) shows nested squares advancing or receding depending on colour relationships.
EV: established | Hofmann taught the principle of push and pull at his schools in Munich and New York, and set it out in his writings.
EV: contested | How consistently warm hues advance depends on individual vision and on saturation and value, so the rule is a tendency, not a law.
T: Push and pull | Hans Hofmann's term for the illusion of advancing and receding colour planes on a flat surface
T: Modulation | Cézanne's term for building form with adjacent patches of colour rather than tonal modelling
SUM: Value, saturation, temperature and edges let colour advance or recede.
SUM: Cézanne, Matisse, Hofmann and Colour Field painters used colour to make or deny space without perspective.
SRC: Museum of Modern Art, Henri Matisse, The Red Studio, collection record | primary | 2026
SRC: Hofmann H., Search for the Real and Other Essays, Addison Gallery of American Art | primary | 1948
Q: What did Hans Hofmann mean by push and pull? | The way colour planes on a flat surface appear to advance and recede against each other, creating space.
Q: What did Cézanne call building form with colour patches? | Modulation, as opposed to tonal modelling.
M1#art-u03-11-q1@1: Which colour quality most strongly makes an area recede? | Low contrast and low saturation | High saturation | Very hard edges | Strong value contrast | Greyed, low-contrast colour reads as distant.
M2#art-u03-11-q2@2: In an abstract painting, a red square seems to sit behind a blue ground. Which explanation is most likely? | The red is greyed and close in value to the ground, while the blue is intense | Red always recedes | The square is too small to advance | The canvas is flat | Saturation and value can override temperature in deciding which plane advances.
TF2#art-u03-11-q3@2: Matisse's The Red Studio uses one dominant red to flatten the space of the room. | true | Walls and floor share the same red, so spatial cues are reduced and objects float on the surface.
M3#art-u03-11-q4@3: Which statement best evaluates the rule that warm colours advance? | It is a tendency that interacts with value, saturation and edge, and varies between viewers | It is a law that holds in every painting | It applies only to landscapes | It has no basis in perception | Chromostereopsis exists but is variable; other colour properties can dominate.
SA3#art-u03-11-q5@2,3: Compare how colour creates space in a landscape using aerial perspective and in a Colour Field painting. | In landscape, colour supports depicted depth: distant forms are paler, cooler, greyer and softer, near forms warm, intense and contrasted. In Colour Field painting (Rothko, Newman) colour creates space without depiction: large fields, soft edges and close values make planes float and envelop the viewer; push and pull between colour areas replaces perspective. Both use the same perceptual properties for different ends. | Explains aerial perspective with colour ; Explains Colour Field or push and pull ; Names artists ; Identifies shared properties ; Makes a comparison

## Colour symbolism and culture
LV: Intermediate · Evaluation
S: Colours carry meanings, but those meanings come from culture, history, materials and context rather than from colour itself. This lesson examines colour symbolism across cultures and periods and how to interpret it responsibly.
O: Describe examples of colour symbolism in different cultures and periods
O: Explain how materials, cost and history shape colour meanings
O: Evaluate claims of universal colour meanings
H: Meanings vary
- **White**: purity and weddings in much of modern Europe and North America; mourning in traditional Chinese, Japanese and Hindu customs.
- **Red**: luck, celebration and weddings in China; danger, love or revolution in Europe; status in Renaissance dress.
- **Purple**: imperial and religious status in Rome and Byzantium, linked to the cost of Tyrian purple dye from murex shellfish.
- **Blue**: the Virgin Mary's robe in late medieval and Renaissance painting, linked to costly ultramarine; in modern branding, trust and calm.
- **Green**: associated with Islam and paradise in many Islamic contexts; with nature and, more recently, environmentalism.
- **Black**: mourning in Europe; also fashion and authority, as in Spanish court dress of the 16th century.
K: Colour meanings are cultural and historical: interpret a colour through the context in which a work was made and seen, not through a universal code.
H: Materials and meaning
P: Colour symbolism often follows cost. Tyrian purple required thousands of shellfish for a small amount of dye; ultramarine required imported lapis lazuli. When synthetic dyes appeared, such as William Perkin's mauveine (1856), purple became fashionable and affordable, and its exclusivity faded. Historian John Gage's *Colour and Culture* (1993) and Michel Pastoureau's histories of single colours (*Blue*, 2001) trace these changes.
X: Interpret the blue in a 15th-century Italian altarpiece of the Virgin and Child.
> Identify the pigment if possible from technical studies: often natural ultramarine for the robe.
> Note the cost: contracts sometimes required "fine ultramarine" for the Virgin.
> Note the convention: the Virgin's blue robe (often over red) was established in this period.
> Conclude: the blue signals devotion, the patron's wealth and a shared iconographic code, not "calm" in a modern sense.
!: Reading modern associations into older or other cultures' works, for example treating red as "danger" in a Chinese New Year print. Research the context first.
H: Colour words and perception
P: Brent Berlin and Paul Kay's *Basic Color Terms* (1969) proposed that languages add basic colour words in a broadly similar order; later research has refined and challenged their claims. Some languages, such as Russian, distinguish light and dark blue as separate basic terms, with small measurable effects on discrimination.
EV: established | Tyrian purple was produced from murex sea snails and was associated with imperial status in Rome and Byzantium.
EV: contested | Berlin and Kay's universal sequence of colour terms has been criticised and revised, and how far language shapes colour perception is debated.
T: Colour symbolism | The meanings a culture associates with particular colours
T: Iconography | The identification and interpretation of conventional subjects and symbols in art
SUM: Colour meanings differ across cultures and periods.
SUM: Cost, materials and history shape symbolism; interpretation needs context, not a universal code.
SRC: Gage J., Colour and Culture: Practice and Meaning from Antiquity to Abstraction, Thames and Hudson | secondary | 1993
SRC: Pastoureau M., Blue: The History of a Color, Princeton University Press | secondary | 2001
SRC: Berlin B. and Kay P., Basic Color Terms: Their Universality and Evolution, University of California Press | primary | 1969
Q: Why was purple associated with emperors in Rome? | Tyrian purple dye from murex shellfish was extremely costly, so it signalled status.
Q: What colour is traditionally associated with mourning in China and Japan? | White.
M1#art-u03-12-q1@1: In traditional Chinese culture red is most associated with… | Luck and celebration | Mourning | Danger only | Royalty in exile | Red is linked with luck, joy and weddings in Chinese tradition.
M2#art-u03-12-q2@2: A student interprets the white robes in a Japanese funeral scene as symbols of a wedding. What is the best advice? | Research the context: white is a traditional colour of mourning there | Keep the interpretation, since white means purity everywhere | Ignore colour in interpretation | Assume the artist made a mistake | Colour meanings are cultural; traditional Japanese mourning dress was white.
TF2#art-u03-12-q3@1,2: The invention of synthetic dyes such as mauveine (1856) helped make purple affordable. | true | Perkin's aniline dye made purple fashionable and widely available, reducing its exclusivity.
M3#art-u03-12-q4@3: Which is the strongest objection to claims that blue universally means calm? | Colour meanings depend on culture and period, and blue's associations have changed over history | Blue is not a primary colour | People cannot see blue clearly | Blue is always associated with sadness | Pastoureau and Gage show meanings shift; modern Western associations are not universal.
SA3#art-u03-12-q5@2,3: Evaluate the view that colour has fixed symbolic meanings. | Some associations are widespread or grounded in experience (red with blood), and conventions (the Virgin's blue) are stable within a tradition. But meanings vary across cultures (white for weddings or mourning) and periods (purple's status fell with synthetic dyes), and depend on materials and context. Interpretation must be contextual; fixed codes mislead. | Acknowledges some shared associations ; Gives cross-cultural variation ; Gives historical change or cost ; Explains need for context ; Reaches a judgement

## Colour in design and branding
LV: Intermediate · Application
S: Designers use colour to identify brands, organise information and guide action. This lesson covers brand colour, colour coding, palettes for interfaces and the evidence behind claims about colour and behaviour.
O: Explain how colour functions in brand identity and information design
O: Apply a limited palette with clear roles to a design
O: Evaluate claims about colour psychology in marketing
H: Colour and identity
P: A distinctive colour can become a brand asset: Tiffany's robin's-egg blue, Cadbury's purple, the red of the London bus and Royal Mail. Colour is often recognised faster than a logo. Some companies seek trademark protection for colours; in the UK, Cadbury's attempt to register its purple was rejected by the Court of Appeal in 2013 because the application described the colour's use too vaguely.
H: Colour with roles
- **Brand or primary colour**: identity and key actions.
- **Neutrals**: backgrounds and text, usually most of the area.
- **Accent**: calls to action or highlights, used sparingly.
- **Semantic colours**: conventional meanings such as red for errors or stop, green for success or go, amber for caution, as on traffic lights.
P: **Colour coding** organises information: Harry Beck's London Underground map (1933) distinguishes lines by colour; charts use colour to separate categories. Coding should be consistent, limited in number and backed by labels or shapes.
K: In design, give each colour a job (identity, background, text, action, status) and use it consistently; a small, disciplined palette communicates better than many colours.
X: Build a palette for a museum's website.
> Primary: a distinctive deep teal for the logo, headings and links.
> Neutrals: off-white background and near-black text for long reading.
> Accent: a warm coral for "Book tickets", the main action.
> Semantic: standard red and green for form errors and confirmations, always with an icon or text.
> Check contrast ratios and test on phones and in print.
!: Relying on colour psychology charts ("blue builds trust"). Research finds that fit between colour and the brand's personality and context matters more than fixed effects of particular hues.
H: The evidence on colour and behaviour
P: Studies such as Labrecque and Milne (2012) found that colour affects perceptions of brand personality, but effects depend on context and audience. Claims that one colour reliably increases sales or appetite generalise from small or uncontrolled studies. Designers test with users (A/B tests) rather than relying on rules.
EV: established | The London Underground diagram introduced by Harry Beck in 1933 uses colour to distinguish lines.
EV: contested | Popular claims that specific colours reliably cause emotions or purchases are weakly supported; effects depend on context, culture and fit with the brand.
T: Brand colour | A colour consistently used to identify an organisation or product
T: Colour coding | Using colours consistently to classify or signal information
T: Semantic colour | A colour with a conventional functional meaning, such as red for an error
SUM: Colour builds identity and organises information when each colour has a consistent role.
SUM: Evidence on colour psychology is context-dependent, so designers test rather than follow charts.
SRC: Labrecque L. I. and Milne G. R., Exciting red and competent blue: the importance of color in marketing, Journal of the Academy of Marketing Science 40(5), 711–727 | primary | 2012
SRC: Société des Produits Nestlé SA v Cadbury UK Ltd [2013] EWCA Civ 1174 | case | 2013
SRC: Lupton E. and Phillips J. C., Graphic Design: The New Basics, 2nd edition, Princeton Architectural Press | secondary | 2015
Q: What is colour coding? | Using colours consistently to classify or signal information, as in an Underground map.
Q: What is a semantic colour? | A colour with a conventional functional meaning, such as red for errors or green for success.
M1#art-u03-13-q1@1: In a website palette, which role should usually occupy the most area? | Neutrals for background and text | The accent colour | Semantic error colours | Every colour equally | Neutrals carry most of the area so that brand and accent colours stand out.
M2#art-u03-13-q2@2: A data chart uses twelve similar colours for twelve categories and readers confuse them. What is the best fix? | Reduce or group categories and label them directly, using distinct colours | Add more colours | Use a rainbow gradient | Make all bars the same colour | Coding works with few, distinct, labelled colours.
TF2#art-u03-13-q3@2: In 2013 the Court of Appeal refused Cadbury's application to register its shade of purple as a trade mark, as framed. | true | The court found the application too imprecise in describing how the colour would be used.
M3#art-u03-13-q4@3: A client insists their bank must be blue because "blue means trust". What is the most evidence-based response? | Colour effects depend on context and fit, so test a distinctive palette with users rather than relying on a general rule | Agree, because colour psychology is proven | Refuse to use blue | Use every colour so all customers are reached | Research shows contextual, not fixed, effects; testing and distinctiveness matter.
SA2#art-u03-13-q5@1,2: Plan a colour palette for a charity's identity and explain the role of each colour. | A distinctive primary for logo and headings; neutrals for backgrounds and text; one accent for calls to action such as "Donate"; semantic colours for status messages with icons; all specified in Pantone, CMYK, RGB and hex, checked for contrast and consistency across print and screen. Explain choices by the charity's character and audience, then test. | Primary colour role ; Neutral roles ; Accent for action ; Semantic or accessibility consideration ; Specification or testing

## Albers and the interaction of colour
LV: Intermediate · Evaluation
S: Josef Albers taught that colour is the most relative medium in art. This lesson explains his experimental method, the key exercises from Interaction of Color (1963) and the Homage to the Square paintings.
O: Describe Albers's experimental approach to colour teaching
O: Apply an Albers exercise to make one colour look like two, or two look like one
O: Evaluate Albers's claim that colour deceives continually
H: Albers's method
P: Josef Albers studied and taught at the Bauhaus, then emigrated in 1933 to teach at Black Mountain College in North Carolina and later at Yale. *Interaction of Color* (1963) begins: "In visual perception a color is almost never seen as it really is — as it physically is." He reversed the usual order: practice before theory. Students worked with coloured papers (cheaper and more consistent than paint) to discover effects by experiment.
H: Key exercises
- **One colour as two**: the same colour on two different grounds is made to look like two different colours.
- **Two colours as one**: two different colours on carefully chosen grounds are made to look identical.
- **Colour intervals and transparency**: making opaque papers look transparent by choosing the mixture colour between two overlapping ones.
- **Vibrating boundaries**: equal-value complementaries create flickering edges.
K: Albers taught colour by experiment: because colour changes with its neighbours, the only reliable way to understand it is to test relationships directly.
X: Make one colour look like two.
> Cut two small squares from the same mid-orange paper.
> Place one on a large field of deep violet and the other on a field of pale yellow.
> On violet, the orange looks lighter and more yellow; on yellow, darker and redder.
> Join the two squares with a strip of the same orange across both fields: the change is revealed.
!: Treating these effects as tricks. Albers's point is practical: every colour decision in painting or design must be judged in context, because the surroundings change it.
H: Homage to the Square
P: From 1950 until his death in 1976 Albers painted over a thousand works in the *Homage to the Square* series: three or four nested squares, placed slightly below centre, painted flat from the tube with a palette knife. Each tests how colours advance, recede and alter one another. The series influenced Op art and colour field painting and remains a teaching tool.
EV: established | Albers's Interaction of Color (1963) grew from his teaching at Black Mountain College and Yale and uses coloured paper exercises.
EV: established | The Homage to the Square series, begun in 1950, comprises over a thousand paintings and many prints.
T: Relativity of colour | The principle that a colour's appearance depends on the colours around it
T: Colour interval | The perceived difference between two colours in hue, value or saturation
SUM: Albers taught colour through experiment with coloured paper, practice before theory.
SUM: His exercises and the Homage to the Square series show colour's relativity in context.
SRC: Albers J., Interaction of Color, Yale University Press | primary | 1963
SRC: Josef and Anni Albers Foundation, Josef Albers, Homage to the Square | primary | 2026 | https://www.albersfoundation.org/
Q: What material did Albers's students use for colour exercises, and why? | Coloured paper, because it was consistent, cheap and avoided the variability of mixing paint.
Q: What is the Homage to the Square series? | Over a thousand paintings, from 1950, of nested squares exploring colour interaction.
M1#art-u03-14-q1@1: Where did Albers teach after leaving Germany in 1933? | Black Mountain College, and later Yale | The Royal Academy | The École des Beaux-Arts | The Slade School | Albers taught at Black Mountain College from 1933 and at Yale from 1950.
M2#art-u03-14-q2@2: In an Albers exercise, how can two different colours be made to look the same? | Place each on a ground that shifts it towards the other | Mix them together | Place them side by side on white | Make them the same size | Simultaneous contrast from the grounds pushes each colour towards the other until they match visually.
SEQ2#art-u03-14-q3@2: Order the steps of the "one colour as two" exercise. | Cut two squares from the same paper ; Choose two contrasting grounds ; Place a square on each ground ; Compare the apparent difference ; Join them with a strip to reveal they are identical | The method moves from setup to observation to revealing the illusion.
M3#art-u03-14-q4@3: What practical lesson does Albers's teaching hold for a designer choosing brand colours? | Test colours in their real contexts, because surrounding colours change how they look | Choose colours from a chart and never adjust them | Use only black and white to avoid interaction | Interaction effects only matter in paintings | Colour is relative, so palettes must be judged in use.
SA3#art-u03-14-q5@2,3: Evaluate Albers's claim that "color deceives continually". | Supported by his exercises: one colour looks like two, two like one, through simultaneous contrast, and by perception research on context. But colour is not random: effects are predictable and can be controlled, and colour constancy often stabilises appearance in everyday life. The claim is best read as a teaching principle: never judge a colour in isolation. | Explains an Albers exercise ; Links to simultaneous contrast ; Notes predictability or constancy ; Draws a practical lesson ; Reaches a judgement

## Colour and accessibility
LV: Intermediate · Application
S: About 1 in 12 men and 1 in 200 women have a colour vision deficiency, and many more people read in poor light or on poor screens. This lesson explains colour vision deficiency, contrast ratios and how to design colour that works for everyone.
O: Describe the main types of colour vision deficiency
O: Apply contrast and redundancy principles so that information does not rely on colour alone
O: Evaluate a design for colour accessibility
H: Colour vision deficiency
P: Colour vision deficiency (CVD), often called colour blindness, affects about 8% of men and 0.5% of women of Northern European ancestry. Most common are **red-green** deficiencies: **deuteranomaly** and **deuteranopia** (reduced or absent green-sensitive cones) and **protanomaly** and **protanopia** (red). **Tritan** (blue-yellow) deficiency is rare. Total colour blindness (achromatopsia) is very rare. People with CVD see colour, but confuse certain pairs, such as red and green, or red and brown.
K: Never rely on colour alone to carry information: add labels, patterns, shapes or position, and keep strong value contrast.
H: Contrast
P: The Web Content Accessibility Guidelines (WCAG 2.1, W3C, 2018) set minimum contrast ratios between text and background: **4.5 : 1** for normal text and **3 : 1** for large text at level AA; 7 : 1 for normal text at level AAA. Contrast is based on relative luminance, so it is about value, not hue. WCAG also requires that colour is not the only visual means of conveying information (success criterion 1.4.1).
X: Check a chart that shows profit in green and loss in red.
> Simulate deuteranopia with a design tool or browser filter: red and green look similar olive tones.
> Add direct labels ("Profit", "Loss") or plus and minus signs.
> Change the hues to a colour-blind-safe pair such as blue and orange, which also differ in value.
> Check the text contrast ratio against the background is at least 4.5 : 1.
!: Choosing pale grey text on white for elegance. Low-contrast text fails WCAG and is hard to read for many people, including older readers and anyone in sunlight.
H: Accessibility in art and design practice
P: Designers use CVD simulators and contrast checkers, and palettes designed for accessibility, such as those by Masataka Okabe and Kei Ito (2002). Some artists have made colour perception itself a subject: Neil Harbisson, who was born with achromatopsia, uses an antenna-like sensor that turns colours into sounds. In galleries, labels with sufficient contrast and good lighting serve all visitors.
EV: established | Red-green colour vision deficiency affects roughly 8% of men and 0.5% of women of Northern European ancestry.
EV: established | WCAG 2.1 level AA requires a contrast ratio of at least 4.5 : 1 for normal text and 3 : 1 for large text.
T: Colour vision deficiency | Reduced ability to distinguish certain colours, usually caused by absent or altered cone types
T: Contrast ratio | The ratio of the relative luminance of the lighter colour to the darker, used in accessibility standards
T: Redundant coding | Signalling information in more than one way, such as colour plus a label or shape
SUM: About 8% of men have a colour vision deficiency, mostly red-green.
SUM: Use sufficient luminance contrast (WCAG) and redundant coding so colour is never the only signal.
SRC: W3C, Web Content Accessibility Guidelines (WCAG) 2.1 | standard | 2018 | https://www.w3.org/TR/WCAG21/
SRC: NHS, Colour vision deficiency (colour blindness) | guidance | 2026 | https://www.nhs.uk/conditions/colour-vision-deficiency/
Q: What contrast ratio does WCAG 2.1 AA require for normal text? | At least 4.5 : 1 (3 : 1 for large text).
Q: What is redundant coding? | Signalling information in more than one way, for example colour plus a label or a shape.
M1#art-u03-15-q1@1: What is the most common type of colour vision deficiency? | Red-green deficiency | Blue-yellow deficiency | Total colour blindness | Night blindness | Red-green deficiencies (deutan and protan) are by far the most common.
M2#art-u03-15-q2@2: A map shows safe routes in green and dangerous routes in red only. What is the best accessible change? | Add line patterns or labels and choose colours that also differ in value | Make the red brighter | Use two shades of green | Remove the key | Redundant coding and value contrast ensure the information survives without colour discrimination.
TF2#art-u03-15-q3@2: Contrast ratios in WCAG are based on the hues of the colours. | false | They are based on relative luminance, which is about lightness (value), not hue.
M3#art-u03-15-q4@3: A designer's palette passes contrast checks but a key chart uses red and green bars with no labels. Which judgement is correct? | It still fails, because information must not depend on colour alone | It passes, because contrast is sufficient | It passes if the red is saturated | It only fails in print | WCAG requires both adequate contrast and that colour is not the only means of conveying information.
SA2#art-u03-15-q5@2,3: Evaluate the colour accessibility of a design you know and suggest improvements. | Identify where meaning relies on colour alone (status, chart categories, links), check text contrast against WCAG ratios, and consider common red-green confusions. Suggest labels, icons, patterns or underlines, colour-blind-safe pairs with value differences, darker text, and testing with simulators and users. | Identifies reliance on colour ; Checks contrast ratios ; Considers red-green deficiency ; Suggests redundant coding ; Suggests testing
`;
