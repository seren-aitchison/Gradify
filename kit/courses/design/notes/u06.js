// School 6: Prototyping, Testing and Iteration. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited for
// checking, pending human verification (qa.js records the review stages). Level: GCSE and A level D&T to first-year undergraduate.
export default `
## Why prototype
LV: Introductory · Foundation
S: A prototype is any representation of a design that lets people explore, test or communicate an idea before it is finished. This lesson explains why designers prototype, what prototypes are for, and the research showing that making several prototypes in parallel improves results.
O: Define a prototype and describe its purposes
O: Explain Houde and Hill's model of what prototypes prototype
O: Evaluate the evidence for prototyping early, often and in parallel
H: What a prototype is
P: A **prototype** is a representation of a design idea made to learn something: a sketch on a card, a foam model, a clickable screen mock-up or a working circuit. Lim, Stolterman and Tenenberg (2008) describe prototypes as **filters** that let designers examine particular qualities of an idea while ignoring others, and as **manifestations** that make ideas concrete enough to think with.
- **Explore**: try out ideas quickly to see what works.
- **Test**: check an idea with users or against requirements.
- **Communicate**: show clients, colleagues and manufacturers what is intended.
- **Reduce risk**: find problems while changes are cheap.
H: What do prototypes prototype?
P: Houde and Hill (1997) proposed that a prototype can address three dimensions of a design: its **role** (what it does for the user and how it fits their life), its **look and feel** (what it is like to see, touch and use) and its **implementation** (how it will technically work). An **integration** prototype combines all three. Choosing which question a prototype answers prevents wasted effort.
X: Three prototypes for a smart plant pot.
> Role: a cardboard pot with a printed card that says "water me", left in a user's home for a week to see if reminders help.
> Look and feel: a foam model in three sizes and finishes to test what fits on a windowsill.
> Implementation: a moisture sensor wired to a microcontroller on the bench, to check readings are reliable.
H: Parallel prototyping
P: Dow and colleagues (2010) asked participants to design web adverts. Those who made several prototypes in parallel and got feedback on all of them produced adverts that performed better, were more varied and gave the designers more confidence than those who iterated on one design at a time.
K: Prototype to answer a specific question as cheaply as possible, and make several in parallel early, before committing to one.
!: Building a polished prototype before knowing what question it should answer. Effort spent on detail early is often wasted when the concept changes.
EV: established | Creating multiple prototypes in parallel led to better and more diverse designs than serial iteration in a controlled study (Dow et al., 2010).
EV: contested | How far laboratory findings on parallel prototyping generalise to large, long professional projects is uncertain.
T: Prototype | A representation of a design idea made to explore, test or communicate it before it is finished
T: Parallel prototyping | Making several different prototypes at the same time and gathering feedback on all of them
SUM: Prototypes explore, test and communicate ideas, reducing risk while change is cheap.
SUM: Each prototype should answer a question about role, look and feel or implementation; parallel prototypes improve results.
SRC: Houde S. and Hill C., "What do prototypes prototype?", in Helander M., Landauer T. and Prabhu P. (eds), Handbook of Human-Computer Interaction, 2nd edition, Elsevier | primary | 1997
SRC: Dow S. P., Glassco A., Kass J., Schwarz M., Schwartz D. L. and Klemmer S. R., "Parallel prototyping leads to better design results, more divergence, and increased self-efficacy", ACM Transactions on Computer-Human Interaction 17(4):18 | primary | 2010 | https://doi.org/10.1145/1879831.1879836
SRC: Lim Y.-K., Stolterman E. and Tenenberg J., "The anatomy of prototypes", ACM Transactions on Computer-Human Interaction 15(2):7 | primary | 2008 | https://doi.org/10.1145/1375761.1375762
Q: What are Houde and Hill's three dimensions of a prototype? | Role, look and feel, and implementation.
Q: What did Dow et al. (2010) find about parallel prototyping? | Making several prototypes in parallel produced better, more varied designs and more designer confidence than serial iteration.
M1#design-u06-01-q1@1: Which is a main purpose of prototyping? | Finding problems while changes are still cheap | Producing the final product for sale | Replacing the need for a design brief | Making the portfolio look finished | Prototypes help learn and reduce risk early, before costly commitments.
M2#design-u06-01-q2@2: A team wants to know if a new wearable fits comfortably on the wrist. Which prototype dimension is it testing? | Look and feel | Role | Implementation | Integration | Comfort and fit concern what it is like to wear and use: look and feel.
M3#design-u06-01-q3@3: A team has two weeks and is unsure which of three concepts to pursue. What does the research suggest? | Make rough prototypes of all three, get feedback, then choose | Pick one and refine it in detail for the whole two weeks | Wait until the concept is certain before prototyping | Build the most expensive one first to impress the client | Parallel prototyping improves outcomes and avoids early lock-in (Dow et al., 2010).
MATCH1#design-u06-01-q4@1: Match each prototype to the dimension it mainly tests. | A sensor circuit on a breadboard = implementation ; A foam model of a handle = look and feel ; A week-long trial of a paper reminder card = role ; A working, finished-looking model = integration | Houde and Hill's model separates what a prototype is for.
SA3#design-u06-01-q5@2,3: Explain why a designer should prototype early and in parallel, using research, and evaluate when a single detailed prototype might be needed. | Early, rough prototypes find problems cheaply and test role, look and feel or implementation separately; parallel prototypes reduce fixation and improve results and confidence (Dow et al., 2010). A single detailed integration prototype becomes necessary later, to test how everything works together, for safety or regulatory testing, or to persuade investors. | Early cheap learning ; Dimensions or focused questions ; Parallel prototyping evidence ; When detailed prototypes are needed ; Judgement

## Prototype fidelity
LV: Introductory · Foundation
S: Fidelity is how closely a prototype resembles the finished product. This lesson explains low and high fidelity, why fidelity is better thought of in several dimensions, and how to choose the right fidelity for each question.
O: Distinguish low-fidelity from high-fidelity prototypes
O: Choose a suitable fidelity for a given design question
O: Evaluate the research on low- versus high-fidelity testing
H: Low and high fidelity
P: **Fidelity** describes how closely a prototype resembles the final product. **Low-fidelity** prototypes (sketches, paper screens, card models) are quick, cheap and easy to change; **high-fidelity** prototypes (detailed interactive mock-ups, finished-looking models) look and behave like the real thing. Rudd, Stern and Isensee (1996) summarised the debate: low fidelity is better for exploring concepts early; high fidelity is better for detailed testing and selling ideas.
H: Fidelity has dimensions
- **Visual**: how realistic it looks.
- **Interaction**: how much it responds like the real product.
- **Content**: whether it uses real text and data or placeholder text.
- **Breadth and depth**: how many features it covers and how far each works.
P: A prototype can be high in one dimension and low in another: a working app with grey boxes for images is high in interaction but low in visual fidelity.
X: Choosing fidelity for a banking app redesign.
> Question 1: do customers understand the new navigation? Paper or simple clickable wireframes (low visual, medium interaction).
> Question 2: do customers trust the new look? A visually polished static mock-up (high visual, low interaction).
> Question 3: is transferring money quick? An interactive prototype with real-looking content (high interaction and content).
K: Match fidelity to the question: as low as possible, but high enough in the dimension you're testing.
!: Showing a polished prototype too early. People comment on colours and fonts and hesitate to criticise something that looks finished, so concept problems go unnoticed.
H: What research shows
P: Walker, Takayama and Landay (2002) found low- and high-fidelity web prototypes revealed similar numbers of usability problems, suggesting low fidelity is efficient for many usability questions. High fidelity matters for questions about aesthetics, timing, feel and trust.
EV: established | Low-fidelity prototypes can identify many of the same usability problems as high-fidelity ones (Walker, Takayama and Landay, 2002).
EV: contested | Whether low-fidelity prototypes bias user feedback (for example, by seeming unfinished and inviting more criticism, or less engagement) is debated.
T: Fidelity | How closely a prototype resembles the finished product in appearance, interaction and content
T: Low-fidelity prototype | A quick, rough prototype such as a sketch, paper screen or card model
SUM: Low fidelity suits exploring concepts quickly; high fidelity suits detailed testing and communication.
SUM: Fidelity has several dimensions; choose the lowest fidelity that answers the question.
SRC: Rudd J., Stern K. and Isensee S., "Low vs. high-fidelity prototyping debate", Interactions 3(1):76–85 | primary | 1996 | https://doi.org/10.1145/223500.223514
SRC: Walker M., Takayama L. and Landay J. A., "High-fidelity or low-fidelity, paper or computer? Choosing attributes when testing web prototypes", Proceedings of the Human Factors and Ergonomics Society Annual Meeting 46(5):661–665 | primary | 2002
Q: What is fidelity in prototyping? | How closely a prototype resembles the finished product in appearance, interaction and content.
Q: Why can a polished prototype be a problem early on? | Users focus on surface details and hesitate to criticise something that looks finished.
M1#design-u06-02-q1@1: Which is a low-fidelity prototype? | Paper sketches of app screens | A fully coded app ready for release | A painted, finished-looking product model | A pre-production manufacturing sample | Paper screens are quick, rough and cheap: low fidelity.
M2#design-u06-02-q2@2: A team wants to test whether users trust a new brand look on a checkout page. Which prototype fits best? | A visually polished mock-up of the page | Hand-drawn boxes on paper | A spoken description of the page | A list of the page's features | Trust in appearance needs high visual fidelity; interaction can stay low.
M3#design-u06-02-q3@3: Which is the best interpretation of Walker, Takayama and Landay's finding? | Low fidelity is efficient for many usability questions, but not for those about look and feel | High-fidelity prototypes are never worth building | Paper prototypes always find more problems than digital ones | Fidelity has no effect on what any test reveals | Similar problem counts suggest low fidelity is efficient; aesthetic and feel questions still need higher fidelity.
TF2#design-u06-02-q4@2: A prototype can be high-fidelity in interaction but low-fidelity in visual design. | true | Fidelity has several dimensions that can be set independently.
SA3#design-u06-02-q5@2,3: For a new self-service library kiosk, plan prototypes of different fidelities for three stages of design and justify each. | Early: paper screens and a cardboard kiosk to test the concept and flow (low fidelity, quick to change). Middle: clickable wireframes on a tablet mounted at kiosk height to test navigation and reach (medium interaction, low visual). Late: a high-fidelity interactive prototype with real content and a scanner to test speed, feedback and trust. Fidelity rises as uncertainty falls. | Three stages ; Fidelity matched to question ; Dimensions considered ; Justifications ; Fidelity rising with certainty

## Paper prototyping
LV: Introductory · Foundation
S: Paper prototyping uses hand-drawn screens and pieces of paper to simulate an interface, with a person playing the computer. This lesson explains how to make and test paper prototypes, why they work so well early on, and their limits.
O: Describe how a paper prototype is made and tested
O: Run a paper prototype test with roles for facilitator, computer and observer
O: Evaluate the strengths and limits of paper prototyping
H: How it works
P: In **paper prototyping**, designers sketch screens, menus, pop-ups and buttons on paper or cards. During a test, a user "taps" with a finger, and a team member playing the **computer** swaps in the next screen by hand. Carolyn Snyder's *Paper Prototyping* (2003) describes the method in detail.
- **Facilitator**: gives tasks and asks the user to think aloud.
- **Computer**: changes the paper pieces in response to actions, without speaking.
- **Observer**: takes notes on problems and comments.
X: Testing a paper prototype of a cinema booking app.
> Task: "Book two tickets for tonight's 7pm film."
> User taps "Showtimes"; the computer places the showtimes screen.
> User looks for a seat map but can't find it; the observer notes the problem.
> Between sessions, the team redraws the screen with a clear "Choose seats" button and tests again the same day.
K: Paper prototypes are so quick to change that designs can be fixed between test sessions, and users feel free to criticise them because they're obviously unfinished.
H: Strengths and limits
P: Paper prototyping needs no technical skill, involves the whole team, and works for testing concepts, navigation, terminology and layout. It is weak for testing timing, animation, scrolling, detailed visual design and real data, and the human computer can introduce delays and bias. It also suits physical products when combined with card models.
!: Making paper prototypes too neat. Rough sketches are faster and signal that feedback is welcome.
EV: established | Paper prototyping is a widely used, low-cost method for testing interface concepts and navigation early (Snyder, 2003).
EV: contested | How closely user behaviour with paper prototypes reflects behaviour with real software is debated, especially for complex interactions.
T: Paper prototype | A hand-drawn, paper version of an interface manipulated by a person to simulate interaction
T: Human computer | The team member who changes paper screens in response to a user's actions during a test
SUM: Paper prototypes simulate interfaces with drawn screens and a human playing the computer.
SUM: They are fast, cheap and invite criticism, but can't test timing, animation or detailed visuals.
SRC: Snyder C., Paper Prototyping: The Fast and Easy Way to Design and Refine User Interfaces, Morgan Kaufmann | secondary | 2003
SRC: Rudd J., Stern K. and Isensee S., "Low vs. high-fidelity prototyping debate", Interactions 3(1):76–85 | primary | 1996 | https://doi.org/10.1145/223500.223514
Q: What does the "computer" do in a paper prototype test? | Changes the paper screens in response to the user's actions, without speaking.
Q: Name one thing paper prototypes test poorly. | Timing, animation, scrolling, detailed visual design or real data.
M1#design-u06-03-q1@1: Which role in a paper prototype test gives the user tasks? | The facilitator | The computer | The observer | The client | The facilitator sets tasks and prompts thinking aloud; the computer changes screens.
M2#design-u06-03-q2@2: After two paper prototype sessions, users can't find the search button. What should the team do? | Redraw the screen and test the change in the next session | Wait until the coded version to fix it | Tell users where the button is in future tests | Stop testing because paper is unreliable | Paper's speed allows changes between sessions, so fix and retest.
M3#design-u06-03-q3@3: For which question is a paper prototype least suitable? | Whether an animation feels smooth enough | Whether users understand the menu labels | Whether the overall flow makes sense | Whether users can find the main features | Animation and timing need digital prototypes; paper suits concepts, labels and flow.
MS1#design-u06-03-q4@1: Which are strengths of paper prototyping? Choose all that apply. | Quick and cheap to make ; Easy to change between tests ; Users feel free to criticise | Tests animation precisely ; Uses real data | Speed, flexibility and openness to criticism are strengths; animation and real data are weaknesses.
SA3#design-u06-03-q5@2,3: Plan a paper prototype test for a school's lunch pre-order screen and evaluate the method. | Sketch screens for menu, meal choice, allergens and confirmation; roles: facilitator gives task ("order a vegetarian lunch with no nuts"), computer swaps screens, observer notes issues; test with five pupils, revising between sessions. Evaluation: cheap, fast, inclusive, invites criticism, finds labelling and flow problems; cannot test timing or real allergen data, and the human computer may slow things. | Screens and task ; Roles ; Iterate between sessions ; Strengths ; Limitations

## Wireframes
LV: Introductory · Foundation
S: A wireframe is a simplified visual guide to the structure of a screen or page, showing layout, content and functions without visual styling. This lesson explains what wireframes show, how they fit into the UX process and how they differ from mock-ups and prototypes.
O: Describe what a wireframe shows and what it leaves out
O: Create a wireframe for a simple screen with a clear hierarchy
O: Distinguish wireframes, mock-ups and prototypes
H: What wireframes show
P: A **wireframe** is a skeletal layout of a screen. It shows where elements go (navigation, headings, content, buttons, forms) and their relative importance, using boxes, lines and placeholder text, usually in greyscale. In Garrett's (2011) **elements of user experience**, wireframes belong to the **skeleton** plane, between structure (information architecture) and surface (visual design).
- **Shows**: layout, content priority, navigation, functions, labels.
- **Leaves out**: colour, imagery, typography details, branding.
H: Wireframes, mock-ups and prototypes
- **Wireframe**: structure and layout; low visual fidelity.
- **Mock-up**: a static, visually designed version of the screen; high visual fidelity, no interaction.
- **Prototype**: something interactive that can be clicked or used to test flows; any visual fidelity.
X: Wireframing a recipe page.
> Top: logo, search, menu.
> Main area: recipe title, photo placeholder (box with a cross), cooking time and servings.
> Ingredients list on the left, method steps on the right; "Add to shopping list" button prominent under ingredients.
> Annotation: ingredients scale with servings; method steps can be ticked off.
K: Wireframes let teams agree structure and priorities before visual design, so discussions focus on what goes where and why, not on colours.
!: Treating a wireframe as a finished design to hand over. Wireframes need annotation, testing and visual design before build.
H: Annotation and testing
P: Annotated wireframes explain behaviour (what happens when a button is pressed, rules for content). Linked wireframes in a prototyping tool can be tested with users to check navigation and comprehension early.
EV: established | Wireframes are a standard UX deliverable for defining layout and content priority before visual design (Garrett, 2011).
EV: contested | Some teams skip wireframes in favour of designing directly in high-fidelity components from a design system; whether this saves time or narrows exploration is debated.
T: Wireframe | A simplified, usually greyscale layout of a screen showing structure, content and functions
T: Mock-up | A static, visually detailed representation of a screen without interaction
SUM: Wireframes show layout, priority and functions without visual styling.
SUM: Mock-ups add visual design; prototypes add interaction; annotated wireframes can be tested early.
SRC: Garrett J. J., The Elements of User Experience: User-Centered Design for the Web and Beyond, 2nd edition, New Riders | secondary | 2011
SRC: Buxton B., Sketching User Experiences: Getting the Design Right and the Right Design, Morgan Kaufmann | secondary | 2007
Q: What does a wireframe leave out? | Colour, imagery, detailed typography and branding.
Q: How does a mock-up differ from a wireframe? | A mock-up is visually detailed; a wireframe shows only structure and layout.
M1#design-u06-04-q1@1: What is the main purpose of a wireframe? | To agree layout and content priority before visual design | To choose the brand's colour palette | To write the final code | To photograph the finished product | Wireframes focus on structure, hierarchy and function.
M2#design-u06-04-q2@2: In a review of a greyscale wireframe, a manager asks to change the button colour to red. What is the best response? | Note it for visual design and focus the review on layout and priority | Make the change immediately in the wireframe | Remove the button from the wireframe | Stop the review because colours are missing | Wireframes deliberately omit colour so discussions focus on structure.
M3#design-u06-04-q3@3: A team has clickable greyscale screens that users can tap through to test navigation. What is this best called? | A low-visual-fidelity interactive prototype | A static mock-up | A finished design specification | A mood board | It is interactive (prototype) but visually simple (low visual fidelity).
MATCH1#design-u06-04-q4@1: Match each item to its description. | Wireframe = structure and layout in greyscale ; Mock-up = static and visually detailed ; Prototype = interactive and testable ; Annotation = notes explaining behaviour | Each deliverable plays a different role in UX design.
SA2#design-u06-04-q5@2,3: Describe a wireframe for the home screen of a school events app and explain your layout decisions. | Header with school name and menu; prominent "This week" list of events with date, time and place; a filter by year group; a clear "Add to calendar" button; secondary links to clubs and term dates. Decisions: most common task (seeing upcoming events) at the top; filters reduce scrolling; one primary action per event; placeholders for images; annotations for behaviour. | Key elements placed ; Hierarchy reflects user tasks ; Clear primary action ; Explains decisions

## Physical models and mock-ups
LV: Introductory · Foundation
S: Product designers use physical models to explore form, scale, ergonomics and function. This lesson explains the types of physical model used in D&T and industry, the materials and methods for each, and what each type can test.
O: Describe the types of physical model used in product design
O: Select suitable modelling materials and methods for a given purpose
O: Evaluate physical modelling against CAD and digital simulation
H: Types of model
- **Sketch models**: quick, rough models in card, foam or tape to explore form and scale.
- **Ergonomic or test-fit rigs**: models to test how a product fits the body or hand.
- **Appearance models (mock-ups)**: look like the final product but don't work; used for presentation and user reactions.
- **Functional or proof-of-concept models**: test whether a mechanism or principle works, often ugly.
- **Pre-production prototypes**: close to the final product in materials and processes, for final testing.
H: Materials and methods
P: Common modelling materials include corrugated card and foam board (fast, flat forms), polystyrene and polyurethane modelling foam (carved forms, sanded smooth), modelling clay (organic shapes), MDF and plywood (laser-cut structures), and 3D-printed polymers (complex shapes from CAD). Hallgrimsson (2012) describes how designers move from quick sketch models to refined models as the design develops.
X: Modelling a handheld torch.
> Sketch models: five foam shapes carved in an hour, held by classmates to compare grip.
> Ergonomic model: the favourite shape refined in clay, tested with large and small hands.
> Functional model: LED, battery and switch on a breadboard to test brightness and battery life.
> Appearance model: 3D-printed, sanded and painted to show the final look.
K: Each model should answer a specific question; a cheap, rough model that answers it is better than an expensive one made too soon.
!: Relying only on screen models for things people hold. Weight, balance, texture and grip are hard to judge on a screen.
H: Physical and digital
P: CAD and simulation allow precise geometry, stress analysis and fast iteration, and 3D printing bridges digital and physical. But many designers find physical models reveal problems of scale, ergonomics and feel that screens hide.
EV: established | Physical models of different types are used throughout product design to explore and test form, ergonomics and function (Hallgrimsson, 2012).
EV: contested | How much physical modelling can be replaced by CAD, simulation and virtual reality is debated; practice varies by industry.
T: Sketch model | A quick, rough physical model used to explore form and scale
T: Appearance model | A model that looks like the final product but does not work
T: Functional model | A model that tests whether a mechanism or principle works, regardless of appearance
SUM: Sketch, ergonomic, appearance, functional and pre-production models answer different questions.
SUM: Choose materials for speed and purpose; physical models reveal feel and scale that screens miss.
SRC: Hallgrimsson B., Prototyping and Modelmaking for Product Design, Laurence King | secondary | 2012
SRC: Kelley T. and Littman J., The Art of Innovation, Currency Doubleday | secondary | 2001
Q: What is an appearance model? | A model that looks like the final product but doesn't work, used for presentation and reactions.
Q: Why use foam for sketch models? | It is cheap, quick to carve and sand, so many forms can be explored fast.
M1#design-u06-05-q1@1: Which model tests whether a mechanism works, regardless of looks? | Functional model | Appearance model | Sketch model | Mood board | Functional (proof-of-concept) models test principles, often looking rough.
M2#design-u06-05-q2@2: A designer wants to compare the grip of five handle shapes in one afternoon. Which material is most suitable? | Modelling foam | Cast aluminium | Injection-moulded plastic | Hardwood with a lacquer finish | Foam is fast to carve and cheap, ideal for quick comparisons.
M3#design-u06-05-q3@3: Which is the best evaluation of using CAD instead of physical models for a hand tool? | CAD is precise and fast to change, but physical models are needed to judge grip and balance | CAD can fully replace physical models in every case | Physical models are always better, so CAD should be avoided | Neither tells you anything about ergonomics | Each has strengths; feel and weight are best judged physically.
SEQ1#design-u06-05-q4@1: Put these models in the usual order of development. | Sketch models ; Ergonomic models ; Functional model ; Appearance model ; Pre-production prototype | Models generally move from rough exploration to refined, near-final versions.
SA3#design-u06-05-q5@2,3: Plan the physical models you would make for a new reusable coffee cup and explain what each would test. | Sketch models in card and foam to explore size and shape; ergonomic models in clay to test grip and drinking angle with users; functional model to test lid seal and heat retention (leak and temperature tests); appearance model, 3D-printed and finished, to gather user reactions; pre-production prototype in the intended material for durability and dishwasher tests. Each answers a different question, from cheap to costly. | Sketch models ; Ergonomic testing ; Functional tests ; Appearance or pre-production ; Purpose of each

## Wizard of Oz and experience prototypes
LV: Intermediate · Application
S: Some ideas are too complex or expensive to build just to test. Wizard of Oz prototypes fake the technology with a hidden human, and experience prototypes let people feel what a product or service would be like. This lesson explains both methods, examples and ethical considerations.
O: Describe Wizard of Oz and experience prototyping
O: Design a Wizard of Oz test for a technology concept
O: Evaluate the ethical issues of simulated prototypes
H: Wizard of Oz
P: In a **Wizard of Oz** prototype, users interact with what appears to be a working system, but a hidden person (the "wizard") produces the responses. Kelley (1984) used the method to develop a natural language interface: users typed requests, and an experimenter typed replies, so the designers learned how people would phrase requests before building the software.
X: Testing a voice assistant for a hotel room.
> A speaker sits in a mock hotel room; a researcher in the next room listens and replies using a text-to-speech tool.
> Guests ask for towels, check-out times and restaurant tips.
> Findings: guests phrase requests in ways the team hadn't predicted and expect the assistant to remember earlier questions.
> These findings shape the real system before any speech software is built.
H: Experience prototyping
P: Buchenau and Fulton Suri (2000) described **experience prototyping** as any representation that helps people understand or explore what it would be like to engage with a product, space or system. Methods include role-play, bodystorming (acting out scenarios in a real or mock-up setting), simulated environments and wearable simulations. A team designing for older people might wear glasses that blur vision and gloves that limit dexterity to experience a product as some users would.
- **Role-play and bodystorming**: act out a service encounter with props.
- **Simulated environment**: a mock hospital room or train carriage.
- **Empathy tools**: suits or glasses that simulate impairments (to be used carefully; see below).
K: Wizard of Oz and experience prototypes test what an experience is like before investing in technology or buildings.
!: Leaving participants deceived. If users believe a system is automated, debrief them afterwards and get consent for using their data; avoid simulating something users could rely on for safety.
H: Limits
P: Wizards can be inconsistent and faster or more forgiving than real technology. Impairment simulations can give misleading impressions of disability and should not replace involving disabled people themselves.
EV: established | Wizard of Oz methods have been used since the 1980s to test interfaces before building them (Kelley, 1984).
EV: contested | Disability simulation exercises are criticised for producing misleading impressions and sometimes increasing negative attitudes; involving disabled people directly is preferred.
T: Wizard of Oz prototype | A prototype in which a hidden person simulates the responses of a system that has not been built
T: Experience prototype | A representation that lets people explore what an experience with a product or service would be like
T: Bodystorming | Acting out scenarios physically, often in a real or mock-up setting, to explore ideas
SUM: Wizard of Oz prototypes fake technology with a hidden human to learn before building.
SUM: Experience prototypes let people feel an experience through role-play and simulation; both need ethical care.
SRC: Kelley J. F., "An iterative design methodology for user-friendly natural language office information applications", ACM Transactions on Information Systems 2(1):26–41 | primary | 1984 | https://doi.org/10.1145/357417.357420
SRC: Buchenau M. and Fulton Suri J., "Experience prototyping", Proceedings of DIS 2000, ACM, 424–433 | primary | 2000 | https://doi.org/10.1145/347642.347802
Q: What is a Wizard of Oz prototype? | A prototype where a hidden person simulates the responses of a system that hasn't been built yet.
Q: What is bodystorming? | Acting out scenarios physically, often in a real or mock-up setting, to explore ideas.
M1#design-u06-06-q1@1: In a Wizard of Oz test, who produces the system's responses? | A hidden person | A finished computer program | The user themselves | A random number generator | The "wizard" is a hidden human simulating the system.
M2#design-u06-06-q2@2: A team wants to know how shoppers would talk to a smart shopping trolley before building speech recognition. Which method fits? | A Wizard of Oz test with a hidden researcher replying | A heuristic evaluation by experts | A survey of trolley manufacturers | An A/B test of trolley colours | Simulating the voice system reveals how people would speak to it before building it.
M3#design-u06-06-q3@3: Which is the strongest ethical concern with Wizard of Oz testing? | Participants may be deceived about automation and should be debriefed and consent to data use | Wizards are always faster than real systems | The method requires too many participants | It can only be used with software | Deception requires debriefing and consent; the other issues are practical, not ethical, or false.
TF2#design-u06-06-q4@2: Wearing a simulation suit is a good substitute for involving disabled people in research. | false | Simulations can mislead; involving disabled people directly gives more accurate understanding.
SA3#design-u06-06-q5@2,3: Design a Wizard of Oz or experience prototype to test a new hospital discharge service, and evaluate the method. | Experience prototype: mock discharge room, staff and patients role-play the new process with printed information and a "discharge coordinator"; or Wizard of Oz: patients text questions to a "discharge bot" answered by a nurse behind the scenes. Learn what questions arise and where confusion occurs. Evaluate: tests experience cheaply before building; but wizards may be more helpful than real systems, role-play differs from real stress, and deception and consent need handling. | Method described ; What it would reveal ; Strength ; Limitation ; Ethics

## Digital prototyping tools
LV: Introductory · Foundation
S: Designers use digital tools to create interactive prototypes, from linked screens to coded components. This lesson explains the main kinds of digital prototyping tool, what each is good for and how to choose without becoming tied to one tool.
O: Describe the main categories of digital prototyping tools
O: Choose a suitable tool approach for a prototyping question
O: Evaluate the trade-offs between design tools and coded prototypes
H: Kinds of tool
- **Interface design tools** (for example Figma, Sketch, Adobe XD): draw screens and link them with hotspots and transitions to make clickable prototypes; support collaboration and shared component libraries.
- **Advanced interaction tools** (for example ProtoPie, Framer): add logic, variables, sensors and realistic animation.
- **Coded prototypes**: HTML, CSS and JavaScript or app frameworks; test real data, performance and accessibility.
- **CAD for physical products** (for example Fusion, SolidWorks, Onshape): 3D models, assemblies, simulations and files for 3D printing or CNC.
- **Physical computing** (for example Arduino, micro:bit): quick electronics prototypes with sensors and outputs.
P: Tools change quickly; the underlying skills (structuring screens, linking flows, modelling interactions, thinking in components) transfer between them.
X: Choosing tools for a fitness app prototype.
> Test navigation with new users: a clickable prototype in an interface design tool.
> Test a heart-rate animation's timing: an advanced interaction tool using sample data.
> Test whether a screen reader can read the workout list: a small coded prototype.
H: Trade-offs
P: Design tools are fast and visual but can create prototypes that look finished while hiding technical problems, and some interactions are hard to simulate. Coded prototypes are realistic and test accessibility properly, but take longer and can tempt teams to treat them as production code. The guiding question remains: what do we need to learn, and what is the cheapest tool that will teach us?
K: Choose the tool for the question, not the question for the tool. Skills in structuring and testing outlast any particular software.
!: Testing accessibility only in a design tool. Screen reader and keyboard behaviour depend on real code, so accessibility needs coded or live testing.
EV: established | Interactive digital prototypes are a standard part of UX and product design practice for testing flows before build.
EV: contested | Whether designers should learn to code to prototype is debated; many argue it improves collaboration and realism, others that it distracts from design.
T: Clickable prototype | Linked digital screens with hotspots that simulate navigation
T: Coded prototype | A prototype built with real code, used to test realistic behaviour, data and accessibility
SUM: Digital tools range from clickable screen prototypes to advanced interactions, code, CAD and physical computing.
SUM: Pick the cheapest tool that answers the question; test accessibility in real code.
SRC: Buxton B., Sketching User Experiences: Getting the Design Right and the Right Design, Morgan Kaufmann | secondary | 2007
SRC: Garrett J. J., The Elements of User Experience: User-Centered Design for the Web and Beyond, 2nd edition, New Riders | secondary | 2011
Q: What is a clickable prototype? | Linked digital screens with hotspots that simulate navigation through an interface.
Q: Why test accessibility in a coded prototype? | Screen reader and keyboard behaviour depend on real code, which design tools don't fully simulate.
M1#design-u06-07-q1@1: Which tool type is used to make 3D models for 3D printing a product? | CAD software | A survey tool | A presentation tool | A spreadsheet | CAD creates 3D geometry that can be exported for printing or machining.
M2#design-u06-07-q2@2: A team needs to test whether users understand a new navigation menu tomorrow. What should they use? | A quick clickable prototype in an interface design tool | A fully coded production app | A CNC-machined model | A month-long diary study | Navigation comprehension can be tested fast with a clickable prototype.
M3#design-u06-07-q3@3: A prototype made in a design tool tests well, but the developers say one animation is impossible on the target devices. What does this illustrate? | Design-tool prototypes can hide technical constraints that code would reveal | The developers are wrong because the prototype worked | Animations should never be prototyped | Testing with users was unnecessary | Design tools simulate freely; feasibility needs checking with developers or coded prototypes.
MS2#design-u06-07-q4@2: When is a coded prototype most worthwhile? Choose all that apply. | Testing with real data ; Testing screen reader access ; Testing performance on real devices | Exploring early layout ideas ; Comparing ten rough concepts in a day | Code is valuable for realism and accessibility; early exploration is faster with paper or design tools.
SA3#design-u06-07-q5@1,3: Evaluate design tools and coded prototypes for testing a council website's form for reporting potholes. | Design tool: quick, collaborative, good for testing flow and wording early; but can't test real validation, location services or screen reader behaviour. Coded prototype: tests real form behaviour, errors, maps and accessibility (keyboard, screen reader) on real devices; slower. Recommend design tool early for flow, coded prototype later for accessibility and validation. | Describes design tool strengths ; Its limits ; Coded strengths ; Accessibility point ; Justified recommendation

## Usability testing
LV: Introductory · Foundation
S: Usability testing watches real people try to complete realistic tasks with a design, to find where it causes difficulty. This lesson defines usability, explains how to plan and run a test, and how to write good tasks.
O: Define usability using effectiveness, efficiency and satisfaction
O: Plan a usability test with realistic tasks
O: Evaluate usability testing compared with other evaluation methods
H: What usability is
P: ISO 9241-11 defines **usability** as the extent to which a product can be used by specified users to achieve specified goals with **effectiveness** (accuracy and completeness), **efficiency** (resources such as time and effort) and **satisfaction** in a specified context of use. Usability depends on who the users are, what they are trying to do and where.
H: Running a test
- **Recruit** representative participants, including people with access needs.
- **Write realistic tasks** framed as scenarios, without giving away the answer.
- **Facilitate** neutrally: ask participants to think aloud; don't help unless they are stuck for a long time.
- **Observe and record** successes, errors, time, hesitations and comments.
- **Debrief** with a short questionnaire or interview.
P: Tests can be **moderated** (a facilitator present in person or remotely) or **unmoderated** (participants complete tasks alone using an online tool). Moderated tests allow follow-up questions; unmoderated tests are cheaper and scale to more people.
X: Writing tasks for a train ticket website.
> Poor task: "Click on 'Railcards' and add a 16–25 Railcard." (gives away the steps and the label)
> Better task: "You're 19 and travelling from Leeds to York next Saturday. Buy the cheapest return ticket you can."
> The better task reveals whether users realise a railcard saves money and whether they can find where to add it.
K: Good tasks describe a goal in the user's language, not the steps or labels in the interface.
!: Helping participants when they struggle. It feels kind but hides the problem; note where they get stuck and offer help only if needed to continue.
H: Usability testing and other methods
P: Testing with real users finds problems that experts and designers miss, because it shows real behaviour. It works with any prototype fidelity. It is less suitable for measuring how common problems are across a population (which needs larger samples or analytics) or for finding unmet needs (which needs earlier research).
EV: established | ISO 9241-11 defines usability in terms of effectiveness, efficiency and satisfaction in a specified context of use.
EV: contested | How closely behaviour in a usability test reflects real-world use is debated, as participants know they are being observed and tasks are artificial.
T: Usability | The extent to which specified users can achieve specified goals with effectiveness, efficiency and satisfaction in a context of use
T: Moderated test | A usability test run with a facilitator present, in person or remotely
SUM: Usability means effectiveness, efficiency and satisfaction for specified users, goals and contexts.
SUM: Tests watch representative users attempt realistic tasks, with neutral facilitation and careful observation.
SRC: International Organization for Standardization, ISO 9241-11:2018 Ergonomics of human-system interaction, Part 11: Usability: definitions and concepts | standard | 2018
SRC: Rubin J. and Chisnell D., Handbook of Usability Testing, 2nd edition, Wiley | secondary | 2008
Q: What three measures define usability in ISO 9241-11? | Effectiveness, efficiency and satisfaction.
Q: What is a moderated usability test? | A test with a facilitator present, in person or remotely, who can observe and ask follow-up questions.
M1#design-u06-08-q1@1: In ISO 9241-11, what does efficiency refer to? | The resources, such as time and effort, used to achieve goals | Whether users like the product | Whether users complete the task accurately | The cost of manufacturing the product | Efficiency concerns resources used; effectiveness is accuracy and completeness; satisfaction is attitude.
M2#design-u06-08-q2@2: Which is the best usability test task for a library website? | You want to borrow a book about bees for a school project. Find one you could collect today | Click "Catalogue", then "Search", then type "bees" | Tell us what you think of the home page colours | Find the button labelled "Reserve" | It sets a realistic goal without revealing steps or labels.
M3#design-u06-08-q3@3: A participant struggles for three minutes and the facilitator shows them the answer. What is the main problem? | The test no longer reveals how users would cope without help | The facilitator saved time, so nothing went wrong | Usability tests should always give answers immediately | The participant should be removed from the results | Helping hides the problem; facilitators should note the difficulty and help only if needed to continue.
TF1#design-u06-08-q4@1: Usability depends on the users, their goals and the context of use. | true | ISO 9241-11 defines usability for specified users, goals and contexts.
SA3#design-u06-08-q5@2,3: Plan a usability test for a new online form to apply for a school bus pass and evaluate usability testing as a method. | Recruit six to eight parents and pupils, including someone with low digital confidence and a screen reader user. Task: "Your child starts at the school in September and lives 4 miles away. Apply for a bus pass." Moderated, think-aloud, record completion, errors, time, comments; debrief questionnaire. Evaluation: reveals real behaviour and problems experts miss; artificial setting and small sample, so combine with analytics after launch. | Participants including access needs ; Realistic task ; Facilitation and measures ; Strength ; Limitation

## Thinking aloud
LV: Intermediate · Application
S: In a think-aloud test, participants say what they are thinking as they use a design. Nielsen called it the single most valuable usability method. This lesson explains how thinking aloud works, its theoretical basis, how to facilitate it and its limits.
O: Describe the think-aloud method and its purpose
O: Facilitate a think-aloud session with neutral prompts
O: Evaluate the validity of think-aloud data
H: The method
P: In the **think-aloud protocol**, participants verbalise their thoughts continuously while doing tasks: what they are looking for, what they expect and what confuses them. Nielsen (2012) argued it is the most valuable single usability method because it is cheap, flexible and reveals *why* users have problems, not just where. Its theory comes from Ericsson and Simon's (1984) **protocol analysis**, which argued that people can report the contents of working memory without changing their thinking much, as long as they simply say what they're attending to rather than explaining or justifying it.
H: Facilitating
- Explain and demonstrate thinking aloud with a neutral example first.
- Use minimal, neutral prompts when participants fall silent: "What are you thinking?" or "Keep talking."
- Avoid leading prompts: not "Is that button confusing?"
- Don't ask participants to explain their reasons during tasks; save "why" questions for after.
- Note what they say and what they do, and where the two differ.
X: A think-aloud excerpt on a council website.
> "I want to report a broken streetlight... I'd expect it under 'Roads'... no, that's about roadworks... maybe 'Report it'... there's a lot of text here..."
> Insight: users look for "Report" but the link is buried under "Environment"; long text slows scanning.
> Fix: a prominent "Report a problem" link on the home page, with streetlights listed.
K: Thinking aloud reveals users' expectations and mental models in their own words, which explains the problems that observation alone shows.
!: Asking participants to explain and evaluate while working ("why did you do that?"). This changes their thinking and slows them down; Ericsson and Simon's theory supports reporting, not explaining.
H: Limits
P: Thinking aloud is unnatural for some people and can slow them down, so it can distort time measures. Boren and Ramey (2000) found practitioners often intervene more than Ericsson and Simon's theory recommends. Participants may also filter what they say. Retrospective think-aloud (watching a recording and commenting afterwards) avoids interference but relies on memory.
EV: established | Think-aloud protocols are a widely used usability method that reveals users' reasoning (Nielsen, 2012; Ericsson and Simon, 1984).
EV: contested | How far thinking aloud alters task performance, especially time and complex reasoning, is debated (Boren and Ramey, 2000).
T: Think-aloud protocol | A method in which participants verbalise their thoughts continuously while performing tasks
T: Retrospective think-aloud | Participants comment on a recording of their session afterwards
SUM: Think-aloud reveals why users struggle by capturing their expectations in their own words.
SUM: Use neutral prompts, avoid asking for explanations mid-task, and treat time data with caution.
SRC: Ericsson K. A. and Simon H. A., Protocol Analysis: Verbal Reports as Data, MIT Press | primary | 1984
SRC: Nielsen J., "Thinking aloud: the #1 usability tool", Nielsen Norman Group | secondary | 2012 | https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/
SRC: Boren T. and Ramey J., "Thinking aloud: reconciling theory and practice", IEEE Transactions on Professional Communication 43(3):261–278 | primary | 2000 | https://doi.org/10.1109/47.867942
Q: What is the theoretical basis of the think-aloud method? | Ericsson and Simon's protocol analysis: people can report what they attend to in working memory with little disruption.
Q: Give a neutral think-aloud prompt. | "What are you thinking?" or "Keep talking."
M1#design-u06-09-q1@1: What do participants do in a think-aloud test? | Say what they are thinking while doing tasks | Fill in a survey about the product afterwards | Watch the designer use the product | Draw their ideal version of the product | Continuous verbalisation during tasks is the core of the method.
M2#design-u06-09-q2@2: A participant goes quiet while searching a menu. What should the facilitator say? | What are you thinking? | Is the menu confusing you? | The option you need is under Settings | Why did you choose that menu? | A neutral prompt keeps them talking without leading or explaining.
M3#design-u06-09-q3@3: Why should task times from think-aloud sessions be treated with caution? | Verbalising can slow participants, so times may not reflect normal use | Participants always lie about how long tasks take | Think-aloud sessions are never timed accurately | Times are always faster than normal use | Thinking aloud adds effort; separate unmoderated tests give better time measures.
MS2#design-u06-09-q4@2: Which are good think-aloud practices? Choose all that apply. | Demonstrating the method first ; Using minimal neutral prompts ; Saving "why" questions until after tasks | Suggesting where to click ; Asking participants to rate each screen while working | Demonstration, neutral prompts and post-task questions follow good practice; leading and mid-task evaluation distort thinking.
SA3#design-u06-09-q5@1,3: Evaluate the think-aloud method for testing a new online banking app. | Strengths: cheap, works with any fidelity, reveals expectations, mental models and reasons for problems in users' own words (Nielsen; Ericsson and Simon). Limits: unnatural, can slow users and distort times, facilitators may intervene, participants may filter sensitive comments (money), and some cognitively demanding tasks may be affected. Use alongside observation and later quantitative testing. | Describes the method ; Strengths with evidence ; Effect on performance ; Facilitation or filtering issue ; Judgement

## How many users to test
LV: Intermediate · Application
S: How many participants does a usability test need? Nielsen and Landauer's model suggests about five users find most problems in one round, but the right number depends on the goal. This lesson explains the model, the calculation, its assumptions and when larger samples are needed.
O: Describe Nielsen and Landauer's model of problem discovery
O: Calculate the proportion of problems found with a given number of users
O: Evaluate the five-user guideline for different testing goals
H: The model
P: Nielsen and Landauer (1993) modelled how many usability problems are found as more users are tested. If each user finds a proportion L of the problems, then n users find:
E: Proportion found = 1 − (1 − L)^{n} :: L is the probability that one user reveals a given problem; n is the number of users
P: In their data, L averaged about 0.31. With five users, 1 − 0.69^{5} ≈ 0.84, so about 85% of problems are found. Each additional user finds fewer new problems, so Nielsen (2000) recommended testing with about five users, fixing problems, and testing again in several small rounds.
X: Calculating problem discovery with L = 0.31.
> One user: 1 − 0.69 = 0.31, so 31%.
> Three users: 1 − 0.69^{3} = 1 − 0.33 = 0.67, so about 67%.
> Five users: 1 − 0.69^{5} = 1 − 0.16 = 0.84, so about 84%.
> Fifteen users: 1 − 0.69^{15} ≈ 0.996, nearly all, but three rounds of five with fixes between would find more problems overall.
K: Small, repeated rounds of testing with fixes in between usually find more problems than one large test.
H: When five isn't enough
- **Diverse users**: different groups (novices and experts, disabled users, different languages) may have different problems; test about five from each.
- **Rare or severe problems**: problems with low L (affecting few users) need larger samples.
- **Measuring rather than finding**: estimating success rates or comparing designs statistically needs larger samples (often 20 or more per group, and many more for A/B tests).
P: Faulkner (2003) ran tests with 60 participants and showed that random groups of five sometimes found as few as 55% of problems, showing variability around the average.
!: Quoting "five users is enough" for every purpose. The guideline is for finding problems in qualitative tests with fairly similar users, repeated iteratively.
EV: established | Problem discovery shows diminishing returns as more users are tested, following approximately 1 − (1 − L)^n (Nielsen and Landauer, 1993).
EV: contested | Whether five users are enough is debated: L varies between products and users, and samples of five can miss many problems (Faulkner, 2003).
T: Problem discovery rate (L) | The average probability that a single test user reveals a given usability problem
T: Diminishing returns | Each additional user reveals fewer new problems than the last
SUM: Problem discovery follows 1 − (1 − L)^n; with L ≈ 0.31, five users find about 85% of problems.
SUM: Use several small rounds; test more users for diverse groups, rare problems or measurement.
SRC: Nielsen J. and Landauer T. K., "A mathematical model of the finding of usability problems", Proceedings of INTERCHI '93, ACM, 206–213 | primary | 1993 | https://doi.org/10.1145/169059.169166
SRC: Faulkner L., "Beyond the five-user assumption: benefits of increased sample sizes in usability testing", Behavior Research Methods, Instruments, and Computers 35(3):379–383 | primary | 2003 | https://doi.org/10.3758/BF03195514
SRC: Nielsen J., "Why you only need to test with 5 users", Nielsen Norman Group | secondary | 2000 | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
Q: What formula models the proportion of problems found by n users? | 1 − (1 − L)^n, where L is the probability one user reveals a given problem.
Q: Why test in several small rounds rather than one big one? | Each round's fixes let the next round find new problems, and returns diminish within a round.
M1#design-u06-10-q1@1: According to Nielsen, about how many users find most usability problems in one round? | About five | About one | About fifty | About five hundred | With L ≈ 0.31, five users find around 85% of problems.
M2#design-u06-10-q2@2: If L = 0.31, approximately what proportion of problems do two users find? | 52% | 31% | 62% | 85% | With L = 0.31, two users find 1 − 0.69^{2} = 1 − 0.476 ≈ 0.52, about 52% of problems.
M3#design-u06-10-q3@3: A website serves both first-time visitors and expert staff. How should the five-user guideline be applied? | Test about five from each group, because they may meet different problems | Test five people in total, mixing both groups | Test only the experts, as they use it most | Test fifty first-time visitors and no staff | Different groups have different problems, so each needs its own small sample.
TF3#design-u06-10-q4@3: A test of five users is the right sample size for estimating, with precision, what percentage of all customers complete checkout. | false | Five users suit finding problems; estimating percentages needs much larger quantitative samples.
SA3#design-u06-10-q5@2,3: Explain Nielsen and Landauer's model and evaluate the advice to test with five users. | Model: each user finds a proportion L of problems; n users find 1 − (1 − L)^n; with L ≈ 0.31, five users find about 85%, with diminishing returns. Advice: test five, fix, retest iteratively. Evaluation: L varies by product and user; Faulkner (2003) showed groups of five sometimes found only 55%; diverse groups need about five each; rare problems and quantitative measures need larger samples. Good for iterative problem-finding, not for measurement. | States the formula ; Calculates or cites 85% ; Iterative rounds ; Variability or Faulkner ; Diverse users or measurement limits

## Heuristic evaluation
LV: Intermediate · Application
S: Heuristic evaluation is an expert review in which evaluators check an interface against a set of usability principles. This lesson explains Nielsen and Molich's method, Nielsen's ten heuristics, severity ratings and how heuristic evaluation compares with user testing.
O: Describe the heuristic evaluation method
O: Apply usability heuristics and severity ratings to an interface
O: Compare heuristic evaluation with usability testing
H: The method
P: Nielsen and Molich (1990) introduced **heuristic evaluation**: a small number of evaluators independently examine an interface and judge it against recognised usability principles (**heuristics**), then combine their findings. Nielsen found that a single evaluator finds only a minority of problems, but three to five evaluators together find a large majority, because different people spot different problems.
H: Nielsen's ten heuristics
- Visibility of system status
- Match between system and the real world
- User control and freedom
- Consistency and standards
- Error prevention
- Recognition rather than recall
- Flexibility and efficiency of use
- Aesthetic and minimalist design
- Help users recognise, diagnose and recover from errors
- Help and documentation
H: Severity ratings
P: Each problem is rated for **severity**, considering frequency (how often it occurs), impact (how hard it is to overcome) and persistence (whether users can learn to avoid it). Nielsen's scale runs from 0 (not a problem) to 4 (usability catastrophe: fix before release).
X: A heuristic evaluation of a parking payment app.
> Problem: no confirmation after paying. Heuristic: visibility of system status. Severity 4 (users may pay twice or get a fine).
> Problem: users must remember a 6-digit location code from a sign. Heuristic: recognition rather than recall. Severity 3.
> Problem: inconsistent button labels ("Pay", "Submit", "Go"). Heuristic: consistency and standards. Severity 2.
K: Heuristic evaluation is fast and cheap and finds many problems early, but evaluators are not users: combine it with testing real people.
!: Treating heuristic evaluation as a replacement for user testing. Experts miss problems that come from users' own knowledge and context, and can flag "problems" that don't trouble real users.
EV: established | Several independent evaluators find substantially more usability problems than one (Nielsen and Molich, 1990).
EV: contested | Heuristic evaluation can produce false positives and miss context-specific problems; its agreement with user testing results varies between studies.
T: Heuristic evaluation | An expert review of an interface against a set of usability principles
T: Severity rating | A judgement of a usability problem's seriousness based on frequency, impact and persistence
SUM: Heuristic evaluation uses three to five independent evaluators judging against principles such as Nielsen's ten.
SUM: Severity ratings prioritise fixes; the method is fast but complements, not replaces, user testing.
SRC: Nielsen J. and Molich R., "Heuristic evaluation of user interfaces", Proceedings of CHI '90, ACM, 249–256 | primary | 1990 | https://doi.org/10.1145/97243.97281
SRC: Nielsen J., "10 usability heuristics for user interface design", Nielsen Norman Group | secondary | 2024 | https://www.nngroup.com/articles/ten-usability-heuristics/
Q: Why use several evaluators in heuristic evaluation? | Each finds different problems, so three to five together find a large majority, while one finds a minority.
Q: What three factors determine severity? | Frequency, impact and persistence.
M1#design-u06-11-q1@1: Which is one of Nielsen's ten usability heuristics? | Visibility of system status | Maximise the number of features | Use as many colours as possible | Always hide error messages | Keeping users informed about what is happening is the first heuristic.
M2#design-u06-11-q2@2: A form clears all entries when one field has an error. Which heuristic does this most clearly violate? | Error prevention and recovery | Aesthetic and minimalist design | Help and documentation | Match with the real world | Losing all entries makes recovery from errors hard and punishes small mistakes.
M3#design-u06-11-q3@3: Which is the strongest reason not to rely on heuristic evaluation alone? | Experts can miss problems arising from users' real knowledge and contexts | It requires hundreds of evaluators to work | It can only be used on finished products | It never finds any real problems | Evaluators aren't users; testing reveals context-specific problems experts miss.
MATCH2#design-u06-11-q4@2: Match each problem to the heuristic it violates. | No progress indicator during upload = visibility of system status ; Jargon like "authenticate credentials" = match with the real world ; No undo after deleting = user control and freedom ; "Save" in one place and "Store" in another = consistency and standards | Each problem maps to one of Nielsen's heuristics.
SA3#design-u06-11-q5@2,3: Carry out a short heuristic evaluation of a ticket machine that shows "ERROR 37" when a card is declined, and compare the method with user testing. | Problem: unhelpful error message. Heuristics: help users recognise, diagnose and recover from errors; match with the real world. Severity: 3 to 4 (frequent, blocks purchase). Fix: plain message explaining the card was declined and options. Comparison: heuristic evaluation is quick, cheap and early; user testing shows real behaviour and context (queues, stress) but takes longer; use both. | Identifies heuristic ; Severity with reasoning ; Proposes fix ; Strength of heuristic evaluation ; Comparison with testing

## A/B testing
LV: Intermediate · Application
S: A/B testing compares two versions of a design with real users at random to see which performs better on a chosen measure. This lesson explains how A/B tests work, the statistics behind them, common pitfalls and their limits.
O: Describe how an A/B test works
O: Interpret A/B test results, including statistical significance
O: Evaluate the strengths, pitfalls and limits of A/B testing
H: How it works
P: In an **A/B test** (an online controlled experiment), users are randomly assigned to see version A (the control) or version B (a variation), and a predefined **metric** is compared, such as sign-up rate. Randomisation means differences in the metric can be attributed to the design change rather than to differences between users. Kohavi, Tang and Xu (2020) describe how large technology companies run thousands of such experiments each year.
X: Interpreting an A/B test of a sign-up button.
> Version A ("Sign up"): 10,000 visitors, 500 sign-ups: 5.0%.
> Version B ("Start free trial"): 10,000 visitors, 580 sign-ups: 5.8%.
> A statistical test shows the difference is unlikely to be due to chance (statistically significant at the chosen threshold).
> The team also checks that cancellations in week one didn't rise, before adopting B.
H: Statistics and pitfalls
- **Sample size**: small effects need large samples; decide the size in advance.
- **Significance**: a p-value below a chosen threshold (often 0.05) means a difference this large would be unlikely if there were no real effect.
- **Peeking**: stopping a test as soon as it looks significant inflates false positives.
- **Guardrail metrics**: watch for harm to other measures (complaints, cancellations, page speed).
- **Novelty effects**: a change may perform well at first just because it's new.
K: A/B tests show which version performs better on a metric, with causal confidence, but not why, and only for the options you thought to test.
!: Optimising a metric that doesn't reflect user value, such as clicks from a misleading button. A/B testing can reward dark patterns unless guardrails and ethics are applied.
H: Limits
P: A/B testing needs large numbers of users, so it suits live digital products with high traffic, not early concepts or small services. It finds local improvements but can't generate new concepts, and it tells you what, not why, so qualitative research is still needed.
EV: established | Randomised online controlled experiments provide causal evidence about the effect of design changes on chosen metrics (Kohavi, Tang and Xu, 2020).
EV: contested | Whether heavy reliance on A/B testing leads to incremental optimisation at the expense of bold design, or to manipulative designs, is debated.
T: A/B test | A randomised experiment comparing two versions of a design on a predefined metric
T: Statistical significance | A result unlikely to have arisen by chance if there were no real effect, judged against a chosen threshold
T: Guardrail metric | A metric monitored to make sure an experiment doesn't cause harm elsewhere
SUM: A/B tests randomly assign users to versions and compare a predefined metric, giving causal evidence.
SUM: Plan sample size, avoid peeking, use guardrails; A/B tests show what, not why, and need large traffic.
SRC: Kohavi R., Tang D. and Xu Y., Trustworthy Online Controlled Experiments: A Practical Guide to A/B Testing, Cambridge University Press | secondary | 2020
SRC: Kohavi R. and Thomke S., "The surprising power of online experiments", Harvard Business Review 95(5):74–82 | secondary | 2017 | https://hbr.org/2017/09/the-surprising-power-of-online-experiments
Q: Why are users randomly assigned in an A/B test? | So differences in results can be attributed to the design change rather than to differences between groups.
Q: What is "peeking" and why is it a problem? | Checking results and stopping as soon as they look significant, which inflates false positives.
M1#design-u06-12-q1@1: In an A/B test, what is version A usually? | The control, or current design | The winning design | The cheapest design | A random design | Version A is the control against which the variation B is compared.
M2#design-u06-12-q2@2: Version A converts 4.0% of 5,000 visitors; version B converts 4.2% of 5,000. What should the team conclude first? | Check whether the difference is statistically significant before deciding | B is definitely better, so launch it immediately | A is better because it is the original | The test proves both versions are equal | A small difference in a modest sample may be due to chance; significance must be checked.
M3#design-u06-12-q3@3: A new "Buy now" button increases clicks by 15%, but refund requests also rise. What does this show? | The need for guardrail metrics and checking real user value | That A/B testing always gives wrong answers | That clicks are the only metric that matters | That refunds are unrelated to design | Optimising one metric can cause harm elsewhere; guardrails catch this.
MS2#design-u06-12-q4@2: Which are pitfalls in A/B testing? Choose all that apply. | Stopping early when results look good ; Too small a sample ; Ignoring novelty effects | Randomly assigning users ; Choosing a metric in advance | Peeking, small samples and novelty effects distort results; randomisation and predefined metrics are good practice.
SA3#design-u06-12-q5@1,3: Evaluate A/B testing as a way to improve a charity's online donation page. | Strengths: causal evidence about which version raises more donations, real users and real behaviour, can test wording, layout and defaults. Limits: needs enough traffic for significance; shows what, not why; risks optimising short-term donations with pressure tactics (ethics, guardrails like complaints or cancellations of regular gifts); can't generate new concepts. Combine with user research. | Explains method ; Causal strength ; Traffic or significance limit ; Ethics or guardrails ; Judgement

## Analysing test results
LV: Advanced · Evaluation
S: Testing produces notes, recordings, numbers and quotes. This lesson explains how to turn test data into prioritised findings: logging observations, rating severity, using measures such as task success and the System Usability Scale, and reporting clearly.
O: Describe how to log and categorise usability test observations
O: Calculate task success rates and System Usability Scale scores
O: Evaluate how to prioritise and report findings
H: From observations to findings
P: After each session, the team logs observations: what happened, on which task, with quotes and timestamps. Observations are grouped into **issues** (the same problem seen in several sessions), and each issue is described with evidence, the likely cause and a severity rating. Rubin and Chisnell (2008) recommend separating observations (what happened) from interpretations (why).
H: Measures
- **Task success rate**: the percentage of participants who completed a task (sometimes with partial credit).
- **Time on task**: how long successful completions took.
- **Errors**: number and type of mistakes.
- **System Usability Scale (SUS)**: Brooke's (1996) ten-item questionnaire, scored 0 to 100. Sauro and Lewis report an average around 68 across many studies.
E: SUS score = 2.5 × [Σ(odd item − 1) + Σ(5 − even item)] :: each item is answered from 1 (strongly disagree) to 5 (strongly agree)
X: Summarising a test of a booking site with eight participants.
> Task "change a booking": 5 of 8 succeeded: 62.5% success.
> Issue: the "Manage booking" link is in the footer; six participants looked in the header first. Severity: high.
> SUS scores: mean 61, below the ~68 benchmark, suggesting below-average perceived usability.
> Recommendation: move "Manage booking" to the header; retest.
K: Report issues with evidence, severity and a recommendation, prioritised so the team fixes the most serious problems first.
!: Over-interpreting small numbers. With eight participants, 62.5% success is an indication, not a precise estimate; report counts ("5 of 8") as well as percentages.
H: Reporting
P: Effective reports are short and visual: top issues first, with clips or quotes, screenshots, severity and recommendations. Watching sessions together, or reviewing clips, builds shared understanding faster than long documents.
EV: established | The System Usability Scale is a widely used, reliable ten-item measure of perceived usability (Brooke, 1996; Sauro and Lewis, 2016).
EV: contested | Severity ratings vary between evaluators, so prioritisation involves judgement even when based on evidence.
T: Task success rate | The percentage of participants who complete a task successfully
T: System Usability Scale (SUS) | A ten-item questionnaire giving a perceived usability score from 0 to 100
SUM: Log observations, group them into issues with evidence, cause and severity, then prioritise.
SUM: Measures include task success, time, errors and SUS; report counts with percentages for small samples.
SRC: Brooke J., "SUS: a quick and dirty usability scale", in Jordan P. W. et al. (eds), Usability Evaluation in Industry, Taylor and Francis | primary | 1996
SRC: Sauro J. and Lewis J. R., Quantifying the User Experience: Practical Statistics for User Research, 2nd edition, Morgan Kaufmann | secondary | 2016
SRC: Rubin J. and Chisnell D., Handbook of Usability Testing, 2nd edition, Wiley | secondary | 2008
Q: What is the approximate average SUS score across many studies? | About 68.
Q: Why report "5 of 8" as well as 62.5%? | With small samples, percentages look more precise than they are; counts show the real basis.
M1#design-u06-13-q1@1: What does the System Usability Scale measure? | Perceived usability, from 0 to 100 | The number of errors made | The time taken to complete a task | The number of features in a product | SUS is a ten-item questionnaire of perceived usability.
M2#design-u06-13-q2@2: Six of ten participants completed a task. What is the task success rate? | 60% | 6% | 40% | 16% | Task success is completions divided by participants: 6 ÷ 10 = 0.6, so 60%.
M3#design-u06-13-q3@3: A test finds 25 issues and the team has time to fix five. What is the best approach? | Prioritise by severity and frequency, with evidence, and fix the most serious | Fix the five easiest issues regardless of impact | Fix the issues mentioned by the most senior observer | Fix none until all 25 can be fixed together | Severity and frequency show where fixes help users most.
M2#design-u06-13-q4@2: A participant answers all five odd SUS items with 4 and all five even items with 2. What is their SUS score? | 75 | 30 | 60 | 85 | Odd items give (4 − 1) × 5 = 15; even items give (5 − 2) × 5 = 15; the total of 30 is multiplied by 2.5 to give 75.
SA3#design-u06-13-q5@2,3: Explain how to analyse and report the results of a usability test of a school website with eight parents. | Log observations per session with quotes and timestamps; group into issues; describe each with evidence, likely cause and severity (frequency, impact, persistence); calculate task success and SUS (compare with ~68); report top issues first with clips, screenshots and recommendations, giving counts alongside percentages. Evaluate: small samples are indicative; severity involves judgement; retest after fixes. | Logging and grouping ; Severity ; Quantitative measures ; Reporting format ; Limits of small samples

## Iterating on feedback
LV: Intermediate · Application
S: Iteration means using what testing reveals to improve the design, then testing again. This lesson explains how to decide what to change, how to handle conflicting feedback, and the evidence that iteration improves usability.
O: Explain how test findings should drive design iterations
O: Decide how to respond to conflicting or unexpected feedback
O: Evaluate the benefits and costs of iterative design
H: Why iterate
P: Nielsen (1993) reviewed case studies of iterative user interface design and found substantial improvements in usability from each iteration, with a median improvement of about 38% per iteration in the cases he measured, and further gains in later rounds. Iteration works because each round fixes problems and reveals new ones that were hidden behind them.
H: Deciding what to change
- **Fix causes, not symptoms**: work out why users struggled before changing anything.
- **Prioritise by severity and frequency**: the problems that block most users come first.
- **Change one thing where possible** when you need to know what caused an improvement.
- **Retest changes**: fixes can introduce new problems.
- **Look for patterns**: one person's comment is a clue; the same problem across several people is a finding.
X: Handling conflicting feedback on a recipe app.
> Two users want more photos; two want less clutter.
> The team looks at behaviour: users who wanted photos were choosing what to cook; those wanting less clutter were cooking with messy hands.
> Insight: different needs at different moments. Iteration: photo-rich browsing, and a simplified "cooking mode" with large text.
K: Feedback is evidence about needs, not instructions. Look past what users suggest to the problem behind it.
!: Implementing every user suggestion. Users are experts in their experience, not in design; a suggested feature may not be the best solution to their underlying problem.
H: Costs and limits
P: Iteration takes time and money, and without clear goals teams can iterate endlessly on details. Time-boxing rounds, setting success criteria in advance and knowing when a design is "good enough" for its purpose keep iteration productive.
EV: established | Iterative design with repeated user testing improves usability across rounds (Nielsen, 1993).
EV: contested | The size of improvement per iteration varies widely between projects, and published case studies may over-represent successes.
T: Iteration | A cycle of designing, testing and refining based on what is learned
T: Time-boxing | Setting a fixed time limit for an activity, such as a round of iteration
SUM: Iteration uses test findings to fix causes, prioritised by severity, and retests changes.
SUM: Treat feedback as evidence of needs, resolve conflicts by looking at behaviour, and time-box rounds.
SRC: Nielsen J., "Iterative user-interface design", IEEE Computer 26(11):32–41 | primary | 1993 | https://doi.org/10.1109/2.241424
SRC: Rubin J. and Chisnell D., Handbook of Usability Testing, 2nd edition, Wiley | secondary | 2008
Q: Why can iteration reveal new problems? | Fixing one problem lets users get further, exposing problems that were hidden behind it, and fixes can introduce new issues.
Q: How should conflicting feedback be handled? | Look at users' behaviour and contexts to find the different needs behind the comments.
M1#design-u06-14-q1@1: What is iteration in design? | Repeated cycles of designing, testing and refining | Building the final product in one attempt | Copying a competitor's latest version | Writing the design specification | Iteration improves a design through repeated test-and-refine cycles.
M2#design-u06-14-q2@2: One user in a test says "add a chatbot". What is the best response? | Explore what problem they were trying to solve and check if others had it | Add a chatbot immediately | Ignore the comment completely | Remove the feature they were using | Suggestions point to needs; the team should understand the underlying problem first.
M3#design-u06-14-q3@3: A team has iterated a login screen ten times on tiny details while bigger problems remain. What is the best advice? | Set success criteria, prioritise by severity and time-box iterations | Keep iterating until the login screen is perfect | Stop testing altogether | Ask users to stop finding problems | Without goals and priorities, iteration can stall on details.
TF1#design-u06-14-q4@1: In iterative design, fixes should be retested because they can introduce new problems. | true | Changes may solve one issue and create another, so retesting is part of each cycle.
SA3#design-u06-14-q5@2,3: A test of a bike-hire app finds that users can't find how to end a hire, and some ask for a bigger map. Explain how you would iterate and evaluate your approach. | Prioritise the "end hire" problem (high severity: users may be charged). Find the cause (button hidden, unclear label); redesign with a prominent "End hire" action and confirmation; retest. For the map request, investigate the need (finding docks?) before enlarging the map. Evaluate: fixes causes, prioritised by severity, retested; small samples and time limits mean some issues wait; success criteria tell the team when it is good enough. | Prioritises by severity ; Finds cause ; Redesign and retest ; Treats suggestion as evidence of need ; Evaluation

## Minimum viable product
LV: Intermediate · Application
S: A minimum viable product is the smallest version of a product that lets a team learn whether its idea works with real customers. This lesson explains the MVP concept from lean start-up, types of MVP, famous examples and common misunderstandings.
O: Define a minimum viable product
O: Describe types of MVP, including concierge, Wizard of Oz and landing-page MVPs
O: Evaluate the MVP approach and its risks
H: The idea
P: Eric Ries (2011) defined a **minimum viable product (MVP)** as the version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort. The MVP is not a cheap first version to sell; it is an experiment to test the riskiest assumptions with real customers in the build-measure-learn loop.
- **Landing page or video MVP**: describe the product and measure sign-ups before building it.
- **Concierge MVP**: deliver the service manually to a few customers, learning what they need.
- **Wizard of Oz MVP**: customers think they use an automated product, but people do the work behind the scenes.
- **Single-feature MVP**: build only the core feature that tests the main value.
X: Two famous MVPs (as told in Ries, 2011).
> Dropbox: before building the full file-syncing product, the founder posted a short video demonstrating how it would work; sign-ups for the beta waiting list jumped from thousands to tens of thousands, validating demand.
> Zappos: to test whether people would buy shoes online, the founder photographed shoes in local shops and posted them online; when someone ordered, he bought the shoes and posted them.
K: An MVP is the smallest experiment that tests whether customers want the product, measured by what they do, not what they say.
!: Using "MVP" to mean a poor-quality product rushed out. A bad experience can kill a good idea; the MVP must be viable enough to test the value fairly, and safe.
H: Risks and debates
P: MVPs can damage a brand if released too publicly, can test the wrong assumption, and in safety-critical fields (medical devices, vehicles) a minimal product may be unacceptable. Designers often argue for a "minimum lovable" or "minimum delightful" product so that low quality doesn't mask genuine demand.
EV: established | The MVP is a central concept of lean start-up methods for testing product assumptions with real customers (Ries, 2011).
EV: contested | Evidence on MVPs is largely case-based; critics argue the term is often misused for low-quality releases and that some products need more complete versions to test value fairly.
T: Minimum viable product | The smallest version of a product that allows maximum validated learning about customers with least effort
T: Concierge MVP | An MVP in which the service is delivered manually to a few customers to learn their needs
SUM: An MVP is an experiment testing the riskiest assumption with real customer behaviour and minimal effort.
SUM: Types include landing-page, concierge, Wizard of Oz and single-feature MVPs; misuse and safety are risks.
SRC: Ries E., The Lean Startup: How Constant Innovation Creates Radically Successful Businesses, Crown Business | secondary | 2011
SRC: Bland D. J. and Osterwalder A., Testing Business Ideas, Wiley | secondary | 2019
Q: What is the main purpose of an MVP? | To learn as much as possible about whether customers want the product, with the least effort.
Q: What is a concierge MVP? | Delivering a service manually to a few customers to learn what they need before automating it.
M1#design-u06-15-q1@1: According to Ries, what is an MVP mainly for? | Validated learning about customers with least effort | Making as much profit as possible at launch | Producing the final, polished product | Impressing investors with features | The MVP is an experiment for learning, not a finished product.
M2#design-u06-15-q2@2: A start-up personally plans meals for ten families by email before building a meal-planning app. What type of MVP is this? | Concierge MVP | Landing-page MVP | Single-feature MVP | Pre-production prototype | Delivering the service manually to a few customers is a concierge MVP.
M3#design-u06-15-q3@3: Why might an MVP approach be unsuitable for a new insulin pump? | A minimal, unproven device could harm users and must meet strict safety standards | Medical devices never need customer feedback | MVPs only work for physical products | Insulin pumps have no assumptions to test | In safety-critical fields, minimal products can cause harm; testing must happen in controlled, regulated ways.
MS2#design-u06-15-q4@2: Which are examples of MVPs? Choose all that apply. | A video explaining a product before it is built ; Manually fulfilling orders from a simple website ; A landing page measuring sign-ups | A fully featured product launched worldwide ; A final injection-moulded production run | MVPs test demand with minimal effort; full launches and production runs are not experiments.
SA3#design-u06-15-q5@1,3: Evaluate the MVP approach for a new subscription service delivering second-hand children's clothes. | MVP: a landing page and a concierge trial with twenty families, hand-picked bundles posted manually, measuring sign-ups, retention and returns. Strengths: tests the riskiest assumptions (will parents pay? are clothes acceptable?) cheaply with real behaviour. Risks: manual service may not reflect scaled experience; poor quality could put off customers; hygiene and safety must be ensured; small samples. | Describes an MVP ; Assumptions tested ; Behavioural measures ; Strength ; Risks

## Design sprints
LV: Intermediate · Application
S: A design sprint is a five-day process for answering a critical business question through design, prototyping and testing with users. This lesson explains the sprint developed at Google Ventures, what happens each day, and when sprints are and aren't appropriate.
O: Describe the five days of a design sprint
O: Plan a design sprint for a defined challenge
O: Evaluate when design sprints are suitable
H: The sprint
P: Jake Knapp developed the **design sprint** at Google and Google Ventures; *Sprint* (Knapp, Zeratsky and Kowitz, 2016) describes it. A small team (about seven people, including a **Decider** with authority) clears five days to go from a problem to a tested prototype.
- **Monday, Map**: set a long-term goal, list sprint questions, map the challenge, ask experts, choose a target.
- **Tuesday, Sketch**: review existing ideas, then each person sketches solutions alone (the "four-step sketch", including Crazy 8s).
- **Wednesday, Decide**: critique sketches silently, vote with a heat map, the Decider makes a final choice, storyboard the prototype.
- **Thursday, Prototype**: build a realistic-looking prototype ("fake it") in one day.
- **Friday, Test**: test with five target customers in one-to-one interviews; look for patterns.
K: A sprint compresses months of debate into a week by combining focus, individual idea generation, structured decisions and a realistic prototype tested with real users.
X: A sprint for a hospital's outpatient check-in.
> Monday: goal "patients check in without queuing"; map from arrival to seeing a clinician; target the check-in moment.
> Tuesday: sketches include text check-in, kiosks and a receptionist with a tablet who greets patients.
> Wednesday: the Decider chooses text check-in with a kiosk backup; storyboard.
> Thursday: clickable phone prototype and a printed kiosk screen on a box.
> Friday: five patients test; most like the text, but older patients want a person at the door, so the next iteration adds a greeter.
!: Using a sprint for every problem. Sprints suit important, uncertain challenges with a clear target; they are poor for tiny tweaks, very early research, or problems needing months of engineering to test.
H: Strengths and limits
P: Sprints build alignment and momentum, involve decision-makers, and get evidence fast. But they demand a full week from key people, can encourage rushing past research, and five tests on Friday give indicative, not conclusive, evidence.
EV: established | The five-day design sprint is a widely used method for rapidly prototyping and testing ideas (Knapp, Zeratsky and Kowitz, 2016).
EV: contested | Rigorous evidence on sprint outcomes is limited; critics argue sprints can skip research and give false confidence from small tests.
T: Design sprint | A five-day process to map, sketch, decide, prototype and test a solution to a critical question
T: Decider | The sprint team member with authority to make final decisions
SUM: A design sprint runs Map, Sketch, Decide, Prototype and Test over five days.
SUM: It builds alignment and fast evidence for important, uncertain challenges, but is not right for every problem.
SRC: Knapp J., Zeratsky J. and Kowitz B., Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days, Simon and Schuster | secondary | 2016
SRC: Nielsen J., "Why you only need to test with 5 users", Nielsen Norman Group | secondary | 2000 | https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/
Q: Name the five days of a design sprint. | Map, sketch, decide, prototype, test.
Q: What is the Decider's role? | To make final decisions, such as which solution to prototype, so the team doesn't stall.
M1#design-u06-16-q1@1: On which day of a design sprint is the prototype tested with customers? | Friday | Monday | Tuesday | Wednesday | Friday is test day, with five one-to-one customer interviews.
SEQ1#design-u06-16-q2@1: Put the design sprint days in order. | Map ; Sketch ; Decide ; Prototype ; Test | Monday to Friday move from understanding to tested prototype.
M2#design-u06-16-q3@2: In a sprint, why do people sketch solutions alone on Tuesday rather than brainstorm as a group? | To avoid production blocking and dominance, getting more varied, detailed ideas | Because group work is banned in sprints | To finish the prototype faster on the same day | Because the Decider must not see any ideas | Individual work produces more and better-developed ideas than open group discussion.
M3#design-u06-16-q4@3: For which challenge is a design sprint least suitable? | Changing the colour of one button on a website | Testing a new service concept for patient check-in | Deciding how a new app should onboard users | Exploring how customers might respond to a new product idea | A sprint is too heavy for a small tweak; it suits important, uncertain challenges.
SA3#design-u06-16-q5@1,3: Plan a design sprint for a museum that wants more families to visit, and evaluate the method for this challenge. | Monday: goal (more family visits), map family journey from planning to leaving, choose target (planning the visit). Tuesday: individual sketches (family trails, booking bundles, kids' app). Wednesday: critique, vote, Decider chooses, storyboard. Thursday: prototype a family visit webpage and printed trail. Friday: test with five families. Evaluation: fast, aligned and evidence-based; but needs research first, a week of key staff, and five tests are indicative; follow with further iteration. | Each day planned ; Appropriate target ; Prototype and test ; Strengths ; Limitations
`;
