// School 8: Accessibility and Inclusive Design. Written to content standard 2 (docs/CURRICULUM_CONTENT_STANDARD.md):
// objectives, key terms, summaries, typed and dated sources, evidence status (EV:) and questions at three levels
// (Foundation, Application, Evaluation) in every lesson. Explanations are original; sources are those used and cited for
// checking, pending human verification (qa.js records the review stages). Level: GCSE and A level D&T to first-year
// undergraduate. WCAG is described as at version 2.2 (W3C Recommendation, October 2023) and UK law as at November 2026,
// for study, not as a compliance audit or legal advice.
export default `
## Why accessibility matters
LV: Introductory · Foundation
S: Accessibility means people with disabilities can perceive, understand, navigate and use a design. This lesson explains how many people it affects, why accessible design benefits everyone, and the ethical, legal and business reasons for it.
O: Define accessibility and inclusive design
O: Explain how many people accessibility affects, including temporary and situational needs
O: Evaluate the ethical, legal and business arguments for accessible design
H: Who it affects
P: **Accessibility** is the degree to which a product, service or environment can be used by people with disabilities, including visual, hearing, motor, cognitive and speech impairments. The World Health Organization (2022) estimates about 1.3 billion people, around 16% of the world's population, experience significant disability. In the UK, the Department for Work and Pensions' Family Resources Survey reports that about a quarter of people are disabled, and the proportion rises steeply with age.
- **Permanent**: a person who is blind, Deaf, or has one arm.
- **Temporary**: a broken wrist, an eye infection, recovering from surgery.
- **Situational**: bright sunlight on a screen, a noisy station, holding a baby in one arm.
K: Accessible design is good design for everyone. Microsoft's inclusive design guidance captures this as "solve for one, extend to many": a design for someone with one arm also helps a parent holding a child.
X: The curb-cut effect.
> Dropped kerbs were campaigned for by wheelchair users.
> They also help people with pushchairs, suitcases, bikes and delivery trolleys.
> Similarly, captions designed for Deaf people are widely used in noisy places, by language learners and by people watching without sound.
H: Why do it
- **Ethical**: excluding people from information, services and products is unfair; the UN Convention on the Rights of Persons with Disabilities (2006) recognises access as a right.
- **Legal**: in the UK the Equality Act 2010 requires reasonable adjustments, and public sector websites must meet accessibility regulations (see Accessibility and UK law).
- **Business**: disabled people and their households are a large market; accessible products often have better usability and search performance for everyone.
!: Treating accessibility as a final check before launch. Retrofitting is expensive; accessibility is cheapest when designed in from the start.
EV: established | About 1.3 billion people worldwide experience significant disability (WHO, 2022).
EV: contested | The size of the business benefit of accessibility is hard to measure, and estimates of disabled people's spending power vary widely.
T: Accessibility | The degree to which a design can be used by people with disabilities
T: Situational disability | A temporary limitation caused by context, such as glare, noise or having one hand busy
SUM: Accessibility affects permanent, temporary and situational needs, about one in six people worldwide having a significant disability.
SUM: Accessible design is ethically required, often legally required, and usually improves design for everyone.
SRC: World Health Organization, Global Report on Health Equity for Persons with Disabilities | data | 2022 | https://www.who.int/publications/i/item/9789240063600
SRC: Microsoft, Inclusive Design toolkit | guidance | 2016 | https://inclusive.microsoft.design/
SRC: Blackwell A. G., "The curb-cut effect", Stanford Social Innovation Review 15(1):28–33 | secondary | 2017
Q: What is a situational disability? | A temporary limitation caused by context, such as glare on a screen or holding something in one hand.
Q: What is the curb-cut effect? | Designs made for disabled people often benefit many others, as dropped kerbs help people with pushchairs and luggage.
M1#design-u08-01-q1@1: About what proportion of the world's population does the WHO estimate experience significant disability? | About 16% | About 1% | About 50% | About 75% | The WHO (2022) estimated around 1.3 billion people, roughly 16%.
M2#design-u08-01-q2@2: A designer adds large touch targets for users with tremors. Who else is most likely to benefit? | People using a phone on a bumpy bus | Only users with tremors | Nobody else at all | Only users of desktop computers | Larger targets help anyone with reduced precision, including situational limits.
M3#design-u08-01-q3@3: Which is the strongest argument for designing accessibility in from the start? | Retrofitting is costly, and early inclusion improves the design for everyone | Accessibility laws only apply after a product is launched | Disabled people are a small group, so a quick check is enough | Accessible designs always cost more than other designs | Designing in early avoids expensive rework and brings wider usability benefits.
MATCH1#design-u08-01-q4@1: Match each example to the type of disability. | Being blind = permanent ; A broken wrist = temporary ; Glare on a phone screen in sunlight = situational ; Holding a baby in one arm = situational | Inclusive design considers permanent, temporary and situational needs.
SA3#design-u08-01-q5@1,3: Evaluate the ethical, legal and business case for making a supermarket's website accessible. | Ethical: excluding disabled customers from buying food is unfair; access is a right (UN CRPD). Legal: the Equality Act 2010 requires reasonable adjustments by service providers. Business: about a quarter of UK people are disabled, older customers are a growing group, and accessible sites tend to be more usable for everyone (curb-cut effect). Business estimates are uncertain, but the ethical and legal case alone is strong. | Ethical argument ; Legal argument ; Business argument ; Benefit to all users ; Judgement

## Models of disability
LV: Intermediate · Application
S: How disability is understood shapes how designers respond to it. This lesson compares the medical, social, biopsychosocial and human rights models of disability, and explains why the social model is central to inclusive design.
O: Describe the medical, social, biopsychosocial and human rights models of disability
O: Apply the social model to identify design barriers
O: Evaluate the strengths and criticisms of the social model
H: Four models
- **Medical model**: disability is a problem in the individual's body or mind, to be diagnosed, treated or cured.
- **Social model**: people have **impairments**, but they are **disabled** by barriers in society: inaccessible buildings, products, information and attitudes. It grew from the Union of the Physically Impaired Against Segregation's *Fundamental Principles of Disability* (1976) and was named by Mike Oliver (1983).
- **Biopsychosocial model**: disability results from interaction between health conditions and contextual factors, personal and environmental. The WHO's International Classification of Functioning, Disability and Health (ICF, 2001) uses this approach.
- **Human rights model**: disabled people have equal rights to participation; the UN Convention on the Rights of Persons with Disabilities (2006) requires states to remove barriers.
H: Why the social model matters for design
P: The social model places responsibility on the design of environments, products and services. If a wheelchair user can't enter a shop, the problem is the step, not the wheelchair. This makes disability a design problem designers can do something about. In the UK, "disabled people" (rather than "people with disabilities") is often preferred by those who use the social model, because it emphasises that people are disabled by barriers.
X: Applying the social model to a ticket machine.
> Medical-model thinking: "Blind users can't use the machine; they should ask staff."
> Social-model thinking: "The machine disables blind users because it relies only on a touchscreen."
> Design response: tactile buttons, audio output through a headphone socket and a high-contrast screen.
K: Under the social model, the designer's job is to find and remove the barriers a design creates.
!: Assuming language preferences are universal. Many UK disabled people prefer "disabled people", while elsewhere "people with disabilities" is common; some prefer identity-first terms such as "autistic person". Ask, and follow the person's preference.
H: Criticisms
P: Critics, including Tom Shakespeare, argue the strong social model underplays the real effects of impairment, such as pain or fatigue, that no redesign removes. The biopsychosocial model tries to include both. For designers, the social model remains the most useful starting point for action.
EV: established | The social model of disability, which locates disability in societal barriers, underpins UK disability rights and inclusive design (UPIAS, 1976; Oliver, 1983).
EV: contested | Whether the social model neglects the lived experience of impairment, such as pain and fatigue, is debated (Shakespeare, 2006).
T: Social model of disability | The view that people are disabled by barriers in society rather than by their impairments
T: Impairment | A long-term limitation of physical, mental, sensory or cognitive function
SUM: The medical model locates disability in the person; the social model locates it in barriers created by society.
SUM: The social model makes disability a design responsibility; critics argue it underplays impairment itself.
SRC: Union of the Physically Impaired Against Segregation, Fundamental Principles of Disability | primary | 1976
SRC: Oliver M., Social Work with Disabled People, Macmillan | primary | 1983
SRC: Shakespeare T., Disability Rights and Wrongs, Routledge | secondary | 2006
Q: What does the social model of disability say? | People have impairments but are disabled by barriers in society, such as inaccessible design and attitudes.
Q: Which model does the WHO's ICF use? | The biopsychosocial model.
M1#design-u08-02-q1@1: Which model sees disability mainly as a problem in a person's body to be treated? | The medical model | The social model | The human rights model | The biopsychosocial model | The medical model focuses on diagnosis and treatment of the individual.
M2#design-u08-02-q2@2: A college website uses images of text with no alternatives, so a blind student can't read the timetable. How would the social model describe this? | The website's design disables the student | The student's blindness is the only problem | The student should ask friends to read it | The college has no responsibility | The barrier is in the design, which the college can remove.
M3#design-u08-02-q3@3: Which is the strongest criticism of the strong social model? | It can underplay effects of impairment, such as pain, that design cannot remove | It gives designers too much responsibility for barriers | It ignores the role of buildings and products | It was invented by medical doctors | Critics like Shakespeare argue impairment effects matter alongside barriers.
TF1#design-u08-02-q4@1: The social model of disability distinguishes impairment from disability. | true | Impairment is a person's condition; disability is the exclusion caused by barriers.
SA3#design-u08-02-q5@2,3: Using the social model, analyse a public library's barriers for disabled visitors and evaluate the model's usefulness for designers. | Barriers: steps at the entrance, high counters, small-print signs, no hearing loop, a catalogue that doesn't work with screen readers, staff attitudes. Each is a design or organisational barrier that can be removed. Evaluation: the social model directs designers to action and shared responsibility; but impairments such as fatigue or pain still matter, so involve disabled people to understand lived experience. | Applies social model ; Identifies several barriers ; Proposes removal ; Strength ; Criticism

## Inclusive design principles
LV: Introductory · Foundation
S: Inclusive design is a way of designing that considers the full range of human diversity from the start. This lesson explains Microsoft's three inclusive design principles, the Inclusive Design Principles for digital products and the persona spectrum.
O: Describe the principles of inclusive design
O: Apply the persona spectrum to a design problem
O: Distinguish inclusive design from accessibility compliance
H: Recognising exclusion
P: **Inclusive design** is a methodology that draws on the full range of human diversity: ability, language, culture, gender, age and other differences. Microsoft's Inclusive Design toolkit (2016) sets out three principles:
- **Recognise exclusion**: exclusion happens when we design using our own biases; identify who is left out.
- **Learn from diversity**: people adapt to exclusion in creative ways; involve them as experts.
- **Solve for one, extend to many**: designing for people with permanent disabilities produces solutions that help many others.
P: The **persona spectrum** illustrates this: one-handed use spans someone with one arm (permanent), someone with an arm injury (temporary) and a new parent holding a baby (situational).
H: Inclusive Design Principles for digital products
P: Swan, Pouncey, Pickering and Watson's **Inclusive Design Principles** (2016) list seven principles: provide a comparable experience; consider situation; be consistent; give control; offer choice; prioritise content; add value.
X: Applying inclusive principles to a video calling app.
> Recognise exclusion: Deaf users and people in noisy places can't follow speech.
> Learn from diversity: work with Deaf users who rely on lipreading and sign language.
> Solve for one, extend to many: live captions and a pinned signer video, which also help people in noisy places and non-native speakers.
> Give control and offer choice: users can resize captions and choose whose video is pinned.
K: Inclusive design is a process that involves excluded people throughout; accessibility standards set a minimum outcome.
!: Equating inclusive design with meeting WCAG. Standards matter, but a design can pass checks and still exclude people in practice.
EV: established | Inclusive design methods, including recognising exclusion and involving diverse users, are widely used in industry guidance (Microsoft, 2016).
EV: contested | Whether "solve for one, extend to many" always holds is debated: some accessibility needs conflict (for example high contrast versus low glare), requiring options rather than one solution.
T: Inclusive design | A design methodology that considers the full range of human diversity and involves excluded people
T: Persona spectrum | A way of showing how one need spans permanent, temporary and situational contexts
SUM: Inclusive design recognises exclusion, learns from diversity and solves for one to extend to many.
SUM: Digital inclusive principles include comparable experience, control and choice; inclusive design goes beyond compliance.
SRC: Microsoft, Inclusive Design toolkit | guidance | 2016 | https://inclusive.microsoft.design/
SRC: Swan H., Pouncey I., Pickering H. and Watson L., Inclusive Design Principles | guidance | 2016 | https://inclusivedesignprinciples.info/
Q: Name Microsoft's three inclusive design principles. | Recognise exclusion, learn from diversity, solve for one and extend to many.
Q: How does inclusive design differ from accessibility compliance? | Inclusive design is a process involving diverse people throughout; compliance checks a minimum standard.
M1#design-u08-03-q1@1: Which is one of Microsoft's inclusive design principles? | Recognise exclusion | Design for the average user | Add accessibility at the end | Design for the designer's preferences | Recognising who is excluded is the first principle.
M2#design-u08-03-q2@2: A team adds a "listen to this page" feature first designed for blind users, and commuters use it on the move. Which principle does this show? | Solve for one, extend to many | Recognise exclusion | Be consistent | Prioritise content | A solution for one group benefits many others.
M3#design-u08-03-q3@3: A website passes automated WCAG checks but disabled users still struggle to complete tasks. What is the best conclusion? | Compliance is a minimum; inclusive design needs testing with disabled people | The website is fully accessible because it passed the checks | Disabled users are using the website incorrectly | Automated checks always find every barrier | Passing checks doesn't guarantee a usable experience; involving people reveals real barriers.
MS2#design-u08-03-q4@2: Which are among the Inclusive Design Principles for digital products? Choose all that apply. | Provide a comparable experience ; Give control ; Offer choice | Design for the average user ; Hide content for simplicity | Comparable experience, control and choice are principles; designing for an average and hiding content are not.
SA3#design-u08-03-q5@2,3: Use the persona spectrum and inclusive design principles to improve a supermarket self-checkout. | Persona spectrum for limited reach: wheelchair user (permanent), someone with a back injury (temporary), a parent with a child in one arm (situational). Recognise exclusion: high screens, weighing scale errors, touch-only input, small text. Learn from diversity: involve wheelchair users, blind shoppers and older people. Solutions: adjustable or lower screen, audio and tactile options, larger text, easy call for help; these help many shoppers. | Persona spectrum ; Recognises exclusion ; Involves diverse users ; Specific solutions ; Extends to many

## Universal design
LV: Introductory · Foundation
S: Universal design aims to create products and environments usable by all people, to the greatest extent possible, without need for adaptation. This lesson explains the seven principles of universal design and how they apply to products and buildings.
O: State the seven principles of universal design
O: Apply the principles to evaluate a product or space
O: Compare universal design with inclusive design
H: Origins
P: Architect Ronald Mace, who used a wheelchair, coined **universal design** to mean design of products and environments usable by all people, to the greatest extent possible, without the need for adaptation or specialised design. In 1997 the Center for Universal Design at North Carolina State University published seven principles.
H: The seven principles
- **Equitable use**: useful to people with diverse abilities, without segregating anyone.
- **Flexibility in use**: accommodates a range of preferences and abilities (left- or right-handed use).
- **Simple and intuitive use**: easy to understand regardless of experience or language.
- **Perceptible information**: communicates necessary information through more than one sense.
- **Tolerance for error**: minimises hazards and consequences of accidental actions.
- **Low physical effort**: can be used efficiently and comfortably with minimum fatigue.
- **Size and space for approach and use**: appropriate size and space for reach and manipulation, whatever body size, posture or mobility.
X: Evaluating a lever door handle against the principles.
> Equitable use: anyone can open it, including with a closed fist or elbow.
> Low physical effort: no gripping or twisting, unlike a round knob.
> Flexibility: works with either hand.
> Conclusion: a lever handle is a classic universal design improvement over a round knob.
K: Universal design builds access into the mainstream design, so nobody needs a separate, stigmatising "special" version.
!: Assuming one design can suit absolutely everyone. Universal design aims for "the greatest extent possible"; some needs still require options or assistive technology.
H: Universal and inclusive design
P: Universal design emphasises one solution for all, especially in architecture and products. Inclusive design (UK and digital usage) emphasises a process that recognises diversity and may provide options and personalisation. In practice the terms overlap, and many designers use both.
EV: established | The seven principles of universal design were published by the Center for Universal Design at NC State University in 1997.
EV: contested | Whether "one design for all" is achievable or desirable, compared with offering choices, is debated.
T: Universal design | Design of products and environments usable by all people, to the greatest extent possible, without adaptation
T: Perceptible information | A universal design principle: communicating information through more than one sense
SUM: Universal design aims for mainstream designs usable by everyone without adaptation.
SUM: Its seven principles range from equitable use to size and space; inclusive design adds process and options.
SRC: Center for Universal Design, The Principles of Universal Design, Version 2.0, North Carolina State University | guidance | 1997
SRC: Story M. F., Mueller J. L. and Mace R. L., The Universal Design File: Designing for People of All Ages and Abilities, NC State University | secondary | 1998
Q: Who coined the term universal design? | Architect Ronald Mace.
Q: What does "perceptible information" mean in universal design? | Communicating necessary information through more than one sense, such as sight and sound.
M1#design-u08-04-q1@1: Which is a principle of universal design? | Tolerance for error | Maximum decoration | Specialised versions for disabled users | Highest possible price | Tolerance for error is one of the seven principles; universal design avoids separate special versions.
M2#design-u08-04-q2@2: A lift announces each floor aloud and displays it on a screen. Which principle does this show? | Perceptible information | Low physical effort | Size and space for approach | Flexibility in use | Communicating through sound and sight is perceptible information.
M3#design-u08-04-q3@3: A museum provides a separate entrance at the back for wheelchair users. Which principle is most at issue? | Equitable use, as it segregates some visitors | Low physical effort, as ramps are hard work | Simple and intuitive use, as entrances confuse | Tolerance for error, as doors may jam | Equitable use requires the same means of use for all, avoiding segregation.
MATCH1#design-u08-04-q4@1: Match each example to the universal design principle. | Scissors usable by either hand = flexibility in use ; An "undo" button = tolerance for error ; A wide accessible toilet with turning space = size and space for approach and use ; A tap with a sensor = low physical effort | Each example applies one of the seven principles.
SA3#design-u08-04-q5@2,3: Apply three universal design principles to evaluate a bus stop and recommend improvements. | Perceptible information: timetable only in small print, so add audio announcements and large high-contrast displays. Size and space: narrow shelter blocks wheelchairs, so widen it and provide level boarding. Low physical effort: no seating, so add perch seats with armrests. Equitable use: the same improvements serve everyone. Recommendations benefit older people, parents and visitors too. | Three principles applied ; Barriers identified ; Specific improvements ; Equitable or mainstream point ; Benefits to many

## WCAG 2.2 and the POUR principles
LV: Intermediate · Application
S: The Web Content Accessibility Guidelines are the international standard for digital accessibility. This lesson explains the structure of WCAG 2.2, its four principles (perceivable, operable, understandable, robust) and what changed in version 2.2.
O: Describe the structure of WCAG 2.2: principles, guidelines and success criteria
O: Classify accessibility issues under the POUR principles
O: Explain what WCAG 2.2 added and why
H: What WCAG is
P: The **Web Content Accessibility Guidelines (WCAG)** are published by the World Wide Web Consortium's Web Accessibility Initiative (W3C WAI). WCAG 2.2 became a W3C Recommendation in October 2023. It is organised in layers: four **principles**, 13 **guidelines** and testable **success criteria**, each at level A, AA or AAA. Supporting documents ("Understanding WCAG" and "Techniques") explain intent and ways to meet each criterion. Although written for the web, WCAG is applied to apps and other digital content too.
H: The POUR principles
- **Perceivable**: information must be presentable in ways users can perceive (text alternatives, captions, adaptable layouts, sufficient contrast).
- **Operable**: interface components must be operable (keyboard access, enough time, no content that causes seizures, navigable, input beyond a pointer).
- **Understandable**: information and operation must be understandable (readable, predictable, input assistance).
- **Robust**: content must work reliably with a wide range of user agents, including assistive technologies.
X: Classifying issues under POUR.
> An image of a chart with no text alternative: perceivable.
> A menu that can only be opened by mouse hover: operable.
> An error message that says only "Invalid input": understandable.
> A custom button that a screen reader announces as nothing: robust (name, role and value not exposed).
H: What 2.2 added
P: WCAG 2.2 added nine success criteria, many for people with low vision, motor impairments and cognitive disabilities, including **Focus Not Obscured** (focused items aren't hidden by sticky headers), **Dragging Movements** (a single-pointer alternative to dragging), **Target Size (Minimum)** (targets at least 24 by 24 CSS pixels, with exceptions), **Consistent Help**, **Redundant Entry** (don't make people re-enter information) and **Accessible Authentication** (no cognitive tests such as remembering passwords or solving puzzles without an alternative). It removed 4.1.1 Parsing as obsolete. WCAG 2.2 is backwards compatible: content meeting 2.2 also meets 2.1 and 2.0.
K: POUR gives a quick way to think about any barrier: can people perceive it, operate it, understand it, and does it work robustly with their technology?
!: Thinking WCAG covers every accessibility need. It is a baseline; W3C notes it does not address every need, especially for cognitive and learning disabilities.
EV: established | WCAG 2.2 became a W3C Recommendation in October 2023, organised under four principles: perceivable, operable, understandable and robust.
EV: contested | How fully WCAG addresses cognitive and learning disabilities is debated; W3C publishes additional guidance because many needs fall outside testable criteria.
T: WCAG | The Web Content Accessibility Guidelines, the W3C's international standard for digital accessibility
T: Success criterion | A testable statement in WCAG that content must meet, at level A, AA or AAA
T: POUR | The four WCAG principles: perceivable, operable, understandable and robust
SUM: WCAG 2.2 is organised as four POUR principles, 13 guidelines and testable success criteria at A, AA and AAA.
SUM: Version 2.2 added nine criteria on focus, targets, dragging, help, redundant entry and authentication.
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: W3C Web Accessibility Initiative, What's New in WCAG 2.2 | guidance | 2023 | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
Q: What does POUR stand for? | Perceivable, operable, understandable and robust.
Q: Name two success criteria added in WCAG 2.2. | Any two of: Focus Not Obscured, Dragging Movements, Target Size (Minimum), Consistent Help, Redundant Entry, Accessible Authentication (and Focus Appearance).
M1#design-u08-05-q1@1: Which organisation publishes WCAG? | The World Wide Web Consortium (W3C) | The UK Government Digital Service | The International Olympic Committee | The Design Council | WCAG is produced by W3C's Web Accessibility Initiative.
M2#design-u08-05-q2@2: A video has no captions. Under which POUR principle does this fall? | Perceivable | Operable | Understandable | Robust | Deaf users can't perceive the audio information without captions.
M3#design-u08-05-q3@3: A login asks users to type characters from a distorted image with no alternative. Which WCAG 2.2 addition addresses this? | Accessible Authentication | Dragging Movements | Target Size (Minimum) | Focus Not Obscured | Accessible Authentication requires alternatives to cognitive function tests in login.
MATCH2#design-u08-05-q4@2: Match each issue to its POUR principle. | Low-contrast text = perceivable ; A keyboard user can't reach a button = operable ; Jargon-filled instructions = understandable ; A custom control a screen reader can't identify = robust | Each barrier falls under one of the four principles.
SA3#design-u08-05-q5@1,3: Explain the structure of WCAG 2.2 and evaluate its role in designing accessible digital products. | Four POUR principles, 13 guidelines, testable success criteria at A, AA and AAA, with Understanding and Techniques documents; 2.2 added criteria on focus, target size, dragging, consistent help, redundant entry and authentication. Role: an internationally recognised, testable baseline used in law and procurement. Limits: doesn't cover every need, especially cognitive; passing criteria doesn't guarantee usability; testing with disabled people is still needed. | Structure ; POUR ; 2.2 additions ; Value as a standard ; Limits

## Conformance levels
LV: Intermediate · Application
S: WCAG success criteria are grouped into three conformance levels: A, AA and AAA. This lesson explains what each level means, the requirements for claiming conformance, and why AA is the usual target.
O: Describe WCAG's three conformance levels
O: Apply conformance requirements to judge whether a page conforms
O: Evaluate why AA is the common target and AAA is not required as policy
H: Three levels
- **Level A**: the minimum; failing these makes content impossible for some people to use (for example 1.1.1 Non-text Content, 2.1.1 Keyboard).
- **Level AA**: addresses the most common and significant barriers (for example 1.4.3 Contrast (Minimum), 2.4.7 Focus Visible). Meeting AA means meeting all A and AA criteria.
- **Level AAA**: the highest level (for example 1.4.6 Contrast (Enhanced) at 7:1, 2.4.9 Link Purpose (Link Only)).
H: Conformance requirements
P: WCAG sets out what a conformance claim means: the **whole page** must meet the level (not part of it); **complete processes** must conform (every page in a checkout, not just the first); only **accessibility-supported** ways of using technologies count; and non-conforming content must not **interfere** with the rest (for example by trapping keyboard focus).
X: Can this checkout claim AA?
> Product pages meet all A and AA criteria.
> The payment page is provided by a third party and has a keyboard trap.
> Because the checkout is a complete process, the failure on one page means the process does not conform, and the keyboard trap fails a level A criterion.
> The shop must fix or replace the payment step, or the claim is false.
K: AA is the level referenced by most laws and policies, including UK public sector requirements; it covers the most significant barriers while remaining achievable for most content.
!: Claiming a site is "WCAG compliant" without saying which version and level, or after testing only some pages.
H: Why not AAA everywhere?
P: W3C advises that requiring AAA as a general policy for entire sites is not recommended, because some AAA criteria cannot be met for some content (for example, sign language for all prerecorded video may not be possible). Teams can still meet AAA criteria where they can, such as enhanced contrast for important text.
EV: established | WCAG defines three conformance levels and states that AAA is not recommended as a general policy for entire sites.
EV: contested | Whether AA is sufficient for real accessibility, particularly for people with cognitive disabilities, is debated.
T: Conformance level | One of WCAG's three levels, A, AA or AAA, each requiring all criteria at that level and below
T: Complete process | A sequence of pages to complete an activity, all of which must conform for a claim to be valid
SUM: Level A is the minimum, AA the common target, AAA the highest; each includes those below.
SUM: Claims require whole pages and complete processes to conform; AAA is not required site-wide.
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation, section 5 Conformance | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: W3C Web Accessibility Initiative, Understanding Conformance | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/conformance
Q: What does meeting level AA require? | Meeting every level A and level AA success criterion.
Q: Why must a complete process conform? | If any step fails, people can't complete the activity, so the whole sequence must meet the level.
M1#design-u08-06-q1@1: Which WCAG level is the usual target in laws and policies? | AA | A | AAA | AAAA | Most legal and policy requirements, including UK public sector rules, reference AA.
M2#design-u08-06-q2@2: A website meets all AA criteria except one level A criterion on one page. Can it claim AA for that page? | No, because AA requires all A and AA criteria | Yes, because only one criterion failed | Yes, because level A is less important than AA | No, because AAA is required | Each level includes all criteria below it, so a single A failure prevents an AA claim.
M3#design-u08-06-q3@3: Why does W3C not recommend requiring AAA for entire sites? | Some AAA criteria cannot be met for some content | AAA criteria make sites less accessible | AAA has been withdrawn from WCAG | AAA criteria are only for printed documents | Some AAA requirements are not achievable for all content, so they are better applied selectively.
TF2#design-u08-06-q4@2: If the payment step of a checkout fails WCAG, the checkout process can still conform as long as the other pages pass. | false | Complete processes must conform as a whole, so one failing step means the process doesn't conform.
SA3#design-u08-06-q5@2,3: A council says its website "meets WCAG". Explain what a valid conformance claim requires and evaluate the council's statement. | A valid claim states the WCAG version and level (e.g. 2.2 AA), and requires whole pages and complete processes to meet all criteria at that level and below, using accessibility-supported technologies without interference. The council's statement is vague: no version, no level, and no evidence of which pages and processes were tested. It should publish an accessibility statement with scope, testing method and known issues. | Version and level ; Whole page and complete process ; Accessibility support or non-interference ; Critique of vague claim ; Recommendation

## Colour contrast
LV: Intermediate · Application
S: Text and interface elements must stand out enough from their background for people with low vision or colour vision deficiency to see them. This lesson explains contrast ratios, the WCAG thresholds, how they are calculated, and why colour must not be the only way information is shown.
O: State the WCAG contrast requirements for text and non-text elements
O: Calculate or check a contrast ratio and judge whether it passes
O: Apply the use of colour criterion to an interface
H: Contrast ratios
P: Contrast is measured as a **contrast ratio** between the relative luminance of two colours, from 1:1 (identical) to 21:1 (black on white).
E: Contrast ratio = (L_{1} + 0.05) ÷ (L_{2} + 0.05) :: L₁ is the relative luminance of the lighter colour and L₂ of the darker, each from 0 (black) to 1 (white)
- **1.4.3 Contrast (Minimum), AA**: at least 4.5:1 for normal text and 3:1 for large text (at least 18 point, or 14 point bold).
- **1.4.6 Contrast (Enhanced), AAA**: at least 7:1 for normal text and 4.5:1 for large text.
- **1.4.11 Non-text Contrast, AA**: at least 3:1 for user interface components (such as input borders) and meaningful graphics.
X: Checking contrast with relative luminances.
> White has L = 1.0; a mid-grey #777777 has L ≈ 0.18.
> Ratio = (1.0 + 0.05) ÷ (0.18 + 0.05) = 1.05 ÷ 0.23 ≈ 4.6:1.
> Normal text in #777777 on white just passes AA (4.5:1) but fails AAA (7:1).
> A lighter grey, #999999 (L ≈ 0.32), gives 1.05 ÷ 0.37 ≈ 2.8:1, which fails even for large text.
H: Don't rely on colour alone
P: **1.4.1 Use of Color (A)** requires that colour is not the only visual means of conveying information. About 1 in 12 men and 1 in 200 women have a colour vision deficiency, most commonly red-green. A form that marks errors only in red, or a chart that distinguishes lines only by colour, excludes them.
- Add text or icons to colour cues ("Error: enter your postcode", with an icon).
- Underline links in body text, or use another non-colour cue.
- Use patterns or labels in charts as well as colour.
K: Check contrast with a tool (most design tools and browser developer tools have one) and always pair colour with another cue.
!: Using light grey placeholder text as a label. It usually fails contrast and disappears when the user types.
EV: established | WCAG 2.2 requires 4.5:1 contrast for normal text and 3:1 for large text at level AA (1.4.3).
EV: contested | The WCAG contrast formula is criticised for poorly predicting readability for some colour pairs, especially on dark backgrounds; alternative models such as APCA have been proposed for future guidelines.
T: Contrast ratio | A measure of the difference in luminance between two colours, from 1:1 to 21:1
T: Colour vision deficiency | Reduced ability to distinguish certain colours, most commonly red and green
SUM: AA requires 4.5:1 for normal text, 3:1 for large text and UI components; AAA requires 7:1 for normal text.
SUM: Never rely on colour alone; pair it with text, icons, patterns or underlines.
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2, success criteria 1.4.1, 1.4.3, 1.4.6 and 1.4.11 | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: W3C Web Accessibility Initiative, Understanding Success Criterion 1.4.3: Contrast (Minimum) | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
Q: What contrast ratio does WCAG AA require for normal text? | At least 4.5:1.
Q: What does 1.4.1 Use of Color require? | Colour must not be the only visual means of conveying information.
M1#design-u08-07-q1@1: What is the WCAG AA minimum contrast ratio for large text? | 3:1 | 4.5:1 | 7:1 | 21:1 | Large text (at least 18pt, or 14pt bold) needs 3:1 at AA.
M2#design-u08-07-q2@2: Normal body text has a contrast ratio of 4.0:1 with its background. Does it meet WCAG AA? | No, it needs at least 4.5:1 | Yes, because it exceeds 3:1 | Yes, because AA has no contrast rule | No, it needs at least 21:1 | 4.0:1 is below the 4.5:1 threshold for normal text at AA.
M3#design-u08-07-q3@3: A form shows required fields only with red labels. What is the best fix? | Add a text marker such as "(required)" as well as colour | Make the red brighter | Use green instead of red | Remove the colour entirely and add nothing | Colour must be paired with another cue so people with colour vision deficiency get the information.
MS2#design-u08-07-q4@2: Which designs meet the use of colour principle? Choose all that apply. | Error messages with an icon and text ; Chart lines with different patterns and labels ; Underlined links in body text | Status shown only by a red or green dot ; Links distinguished only by colour | Additional cues make information available without colour perception.
SA3#design-u08-07-q5@2,3: A designer chooses pale grey text (#AAAAAA) on white for a minimalist look. Evaluate this choice using WCAG and recommend changes. | #AAAAAA on white has a contrast ratio of about 2.3:1, failing 1.4.3 AA (4.5:1 for normal text) and even 3:1 for large text, so people with low vision, older users and anyone in bright light will struggle. Recommend a darker grey of at least 4.5:1 (such as #767676 or darker), checking with a contrast tool, and keep minimalism through spacing and type rather than low contrast. | Identifies contrast failure ; States thresholds ; Users affected ; Specific fix ; Keeps aesthetic aim

## Keyboard access and focus
LV: Intermediate · Application
S: Many people use a keyboard, or devices that act like one, instead of a mouse. This lesson explains WCAG requirements for keyboard access, focus order, visible focus and skip links, and how to test them.
O: Explain who relies on keyboard access and why
O: Apply WCAG keyboard and focus criteria to an interface
O: Test a page for keyboard accessibility
H: Who uses the keyboard
P: Keyboard access matters for blind screen reader users, people with motor impairments who use switches, mouth sticks or adapted keyboards (which send keyboard commands), voice control users, and many power users. If something can be done only with a mouse, it excludes them.
H: The criteria
- **2.1.1 Keyboard (A)**: all functionality is available from a keyboard.
- **2.1.2 No Keyboard Trap (A)**: focus can always be moved away from a component using the keyboard.
- **2.4.1 Bypass Blocks (A)**: a way to skip repeated content, such as a "Skip to main content" link.
- **2.4.3 Focus Order (A)**: focus moves in an order that preserves meaning.
- **2.4.7 Focus Visible (AA)**: the keyboard focus indicator is visible.
- **2.4.11 Focus Not Obscured (Minimum) (AA, new in 2.2)**: the focused item isn't entirely hidden by other content such as sticky headers.
X: Testing a page with the keyboard.
> Press Tab from the top: a "Skip to main content" link appears. Good.
> Keep tabbing: focus jumps from the header to the footer, then back to the middle. Focus order problem.
> A date picker opens but Esc and Tab don't leave it: keyboard trap.
> A custom "Buy" button made from a styled div can't be reached by Tab: fails 2.1.1.
> The focus outline has been removed in CSS, so users can't see where they are: fails 2.4.7.
K: Use native HTML controls (buttons, links, form fields), which are keyboard accessible by default, and never remove the focus outline without providing a clear replacement.
!: Building custom controls from generic elements without keyboard support. A clickable div looks like a button but can't be reached or operated with the keyboard unless extra work is done.
H: Testing
P: Unplug the mouse and use Tab, Shift+Tab, Enter, Space, the arrow keys and Esc to complete every task. Check that focus is always visible, follows a logical order, can't get stuck and isn't hidden.
EV: established | WCAG 2.2 requires all functionality to be keyboard operable (2.1.1) with visible focus (2.4.7).
EV: contested | How strong a focus indicator must be is debated; WCAG 2.2's Focus Appearance criterion was placed at AAA rather than AA after disagreement about its complexity.
T: Keyboard trap | A situation where keyboard focus enters a component and cannot leave it
T: Focus indicator | The visible marker, such as an outline, showing which element has keyboard focus
SUM: All functionality must work by keyboard, without traps, in a logical order, with visible focus.
SUM: Use native controls, add skip links, keep focus visible and unobscured, and test without a mouse.
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2, guidelines 2.1 and 2.4 | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: W3C Web Accessibility Initiative, Understanding Success Criterion 2.4.7: Focus Visible | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
Q: What is a keyboard trap? | When keyboard focus enters a component and can't be moved away using the keyboard.
Q: What is the purpose of a skip link? | To let keyboard and screen reader users skip repeated content, such as navigation, to the main content.
M1#design-u08-08-q1@1: Which WCAG criterion requires all functionality to be available from a keyboard? | 2.1.1 Keyboard | 1.4.3 Contrast (Minimum) | 1.1.1 Non-text Content | 3.3.2 Labels or Instructions | 2.1.1 is the core keyboard access requirement at level A.
M2#design-u08-08-q2@2: A designer removes the blue outline around focused links because it "looks messy". What is the issue? | Keyboard users can no longer see where they are, failing Focus Visible | It improves accessibility by reducing clutter | It only affects mouse users | There is no issue as long as colours are high contrast | Removing focus indicators without replacement fails 2.4.7.
M3#design-u08-08-q3@3: A cookie banner fixed at the bottom of the screen covers the button a keyboard user has tabbed to. Which WCAG 2.2 criterion is most at issue? | Focus Not Obscured (Minimum) | Dragging Movements | Redundant Entry | Use of Color | 2.4.11 requires that focused items aren't entirely hidden by author-created content.
SEQ2#design-u08-08-q4@2: Put these keyboard test steps in a sensible order. | Put the mouse aside ; Tab from the top and check for a skip link ; Check focus order and visibility through the page ; Operate every control with Enter, Space and arrows ; Check you can leave every component with Tab or Esc | Systematic keyboard testing checks reachability, order, visibility, operation and traps.
SA3#design-u08-08-q5@1,3: Explain why keyboard accessibility matters and evaluate a website that uses many custom controls built from generic elements. | Keyboard access serves screen reader users, people with motor impairments using switches or adapted keyboards, voice control users and power users. Custom controls built from generic elements often can't be focused or operated by keyboard, lack visible focus and expose no role to assistive technology, failing 2.1.1, 2.4.7 and 4.1.2. Recommend native HTML controls, or full keyboard and ARIA support, and test without a mouse. | Who relies on keyboard ; Problems with custom controls ; Relevant criteria ; Recommendation ; Testing

## Text alternatives
LV: Intermediate · Application
S: People who can't see images or hear audio need equivalent information in another form. This lesson explains alt text for images, when images should be decorative, and captions, transcripts and audio description for media.
O: Explain the purpose of text alternatives under WCAG 1.1.1
O: Write appropriate alt text for informative, functional and decorative images
O: Describe media alternatives: captions, transcripts and audio description
H: Alt text
P: **1.1.1 Non-text Content (A)** requires a text alternative that serves the equivalent purpose for all non-text content. On the web this is usually the image's **alt attribute**, read aloud by screen readers. Good alt text depends on the image's purpose in context:
- **Informative images**: describe the information the image conveys ("Bar chart: sales rose from £2m in 2022 to £3m in 2024").
- **Functional images** (buttons, linked logos): describe the action or destination ("Search", "Home"), not the picture.
- **Decorative images**: use empty alt (alt="") so screen readers skip them.
- **Complex images** (detailed charts, diagrams): a short alt plus a longer description or data table nearby.
X: Writing alt text for a news photo.
> Image: a firefighter carrying a child from a flooded house.
> Poor: "image.jpg" or "Photo".
> Poor: "A firefighter in a yellow helmet with reflective stripes wading through brown water near a red-brick house with white windows..." (too long, misses the point).
> Better: "A firefighter carries a child to safety from a flooded house in Doncaster."
K: Alt text should say what the image means in its context, as briefly as possible; the same picture may need different alt text in different places.
!: Starting alt text with "Image of..." Screen readers already announce that it is an image.
H: Time-based media
- **1.2.2 Captions (Prerecorded) (A)**: synchronised text of speech and important sounds for video.
- **1.2.4 Captions (Live) (AA)**: captions for live video.
- **1.2.5 Audio Description (Prerecorded) (AA)**: narration of important visual information for blind users.
- **Transcripts**: full text of audio or video, useful for deaf-blind users (with braille displays) and for searching.
EV: established | WCAG 1.1.1 requires text alternatives for non-text content at level A, and 1.2.2 requires captions for prerecorded video.
EV: contested | How much detail alt text should include, especially for images of people (for example appearance, ethnicity or gender), is debated and depends on context.
T: Alt text | A short text alternative for an image, read by screen readers and shown if the image fails to load
T: Audio description | Narration describing important visual information in a video for blind and partially sighted people
SUM: Every meaningful non-text item needs a text alternative serving the same purpose; decorative images get empty alt.
SUM: Video needs captions and, for visual information, audio description; transcripts help many users.
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2, guidelines 1.1 and 1.2 | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: W3C Web Accessibility Initiative, Images Tutorial | guidance | 2022 | https://www.w3.org/WAI/tutorials/images/
Q: What alt text should a decorative image have? | Empty alt (alt=""), so screen readers skip it.
Q: What does audio description provide? | Narration of important visual information in a video for blind and partially sighted people.
M1#design-u08-09-q1@1: Which WCAG criterion requires text alternatives for images? | 1.1.1 Non-text Content | 2.1.1 Keyboard | 1.4.3 Contrast (Minimum) | 3.3.1 Error Identification | 1.1.1 is the level A requirement for text alternatives.
M2#design-u08-09-q2@2: What is the best alt text for a magnifying glass icon that submits a search? | Search | Magnifying glass | Image of a magnifying glass icon | Leave it empty because it is an icon | Functional images should describe the action, not the picture.
M3#design-u08-09-q3@3: A decorative swirl appears beside each heading and has alt text "decorative swirl". What is the problem? | Screen readers announce meaningless text repeatedly; it should have empty alt | Nothing, because all images need descriptive alt text | The alt text should be longer and more detailed | The image should be removed from the page | Decorative images should have empty alt so screen reader users aren't distracted.
MATCH2#design-u08-09-q4@2: Match each image to the best approach. | Company logo linking to the home page = alt text naming the destination, such as "Home" ; Background texture = empty alt ; Detailed chart of results = short alt plus a data table or long description ; Photo illustrating a news story = brief description of what it shows in context | Alt text depends on the image's purpose.
SA3#design-u08-09-q5@2,3: A college's promotional video has no captions and shows key information (dates and a web address) only on screen. Explain the barriers and the WCAG requirements, and recommend fixes. | Deaf and hard-of-hearing viewers miss speech (fails 1.2.2 Captions, A); blind viewers miss on-screen dates and address (fails 1.2.5 Audio Description, AA). Fixes: accurate synchronised captions including important sounds; audio description or narration that reads out on-screen text; a transcript including all information; check captions are not auto-generated without correction. These also help viewers watching without sound. | Identifies two barriers ; Names criteria ; Captions fix ; Audio description fix ; Wider benefit or transcript

## Accessible forms
LV: Intermediate · Application
S: Forms are where many people get stuck: booking, applying, paying. This lesson explains how to make forms accessible: labels, instructions, grouping, error identification and suggestions, input purpose and avoiding redundant entry.
O: Describe the WCAG requirements most relevant to forms
O: Design an accessible form field with label, hint and error message
O: Evaluate a form for accessibility barriers and propose fixes
H: Labels and instructions
- **3.3.2 Labels or Instructions (A)**: provide labels or instructions when input is required.
- **1.3.1 Info and Relationships (A)**: labels must be programmatically linked to fields, so screen readers announce them; related fields (such as date parts or radio buttons) are grouped with a legend.
- **4.1.2 Name, Role, Value (A)**: custom controls must expose their name, role and state to assistive technology.
- **1.3.5 Identify Input Purpose (AA)**: common fields (name, email, address) identify their purpose so browsers can autofill them.
P: Visible labels should sit outside the field, not as placeholder text that disappears. Hints (such as "For example, 27 3 2007") go between the label and the field.
H: Errors
- **3.3.1 Error Identification (A)**: errors are identified and described in text.
- **3.3.3 Error Suggestion (AA)**: suggest how to fix the error when known.
- **3.3.4 Error Prevention (Legal, Financial, Data) (AA)**: for important submissions, allow checking, correcting or reversing.
- **3.3.7 Redundant Entry (A, new in 2.2)**: don't ask for information already provided in the same process, unless necessary.
X: Improving a date of birth field.
> Before: a placeholder "DD/MM/YYYY" inside one box; on error, the border turns red.
> After: a visible label "Date of birth", hint "For example, 27 3 2007", three labelled boxes (Day, Month, Year) grouped with a legend.
> On error: a summary at the top linking to the field, and a message beside it: "Date of birth must be in the past".
> The error uses text and an icon, not only red.
K: Every field needs a visible, linked label; every error needs a clear text message saying what went wrong and how to fix it.
!: Clearing the whole form when one field has an error. It punishes users and is especially hard for people with cognitive or motor impairments.
H: Patterns that work
P: The GOV.UK Design System publishes tested, accessible form patterns (such as dates, addresses and error summaries) based on research with many users, including disabled people. Asking one thing per page and avoiding unnecessary questions also helps.
EV: established | WCAG 2.2 requires labels, error identification and, at AA, error suggestions for forms (3.3.1, 3.3.2, 3.3.3).
EV: contested | Whether "one thing per page" forms are better than single long forms for all users is debated; it depends on the task and context.
T: Label | Visible text identifying a form field, programmatically associated with it
T: Error summary | A list of errors at the top of a form, linking to each field that needs correcting
SUM: Forms need visible, linked labels, grouped related fields, hints, and input purpose for autofill.
SUM: Errors must be identified in text with suggestions; avoid redundant entry and colour-only cues.
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2, guideline 3.3 Input Assistance | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: Government Digital Service, GOV.UK Design System | guidance | 2024 | https://design-system.service.gov.uk/
Q: Why shouldn't placeholder text be used as the only label? | It disappears when typing, often has low contrast and may not be announced reliably.
Q: What does 3.3.7 Redundant Entry require? | Not asking users for information they've already provided in the same process, unless necessary.
M1#design-u08-10-q1@1: Which WCAG criterion requires labels or instructions for input? | 3.3.2 Labels or Instructions | 1.4.3 Contrast (Minimum) | 2.4.1 Bypass Blocks | 1.2.2 Captions | 3.3.2 is the level A requirement for labelling input.
M2#design-u08-10-q2@2: A form shows an error only by turning a field's border red. Which is the best improvement? | Add a text message describing the error and how to fix it | Make the red border thicker | Use a flashing border instead | Remove the error indication | Errors must be described in text (3.3.1), with suggestions (3.3.3), not shown by colour alone.
M3#design-u08-10-q3@3: A checkout asks for the delivery address, then asks for the billing address again with no "same as delivery" option. Which WCAG 2.2 addition is most relevant? | Redundant Entry | Focus Not Obscured | Target Size (Minimum) | Consistent Help | 3.3.7 requires not making people re-enter information already given, such as by offering "same as delivery".
MS2#design-u08-10-q4@2: Which practices make forms more accessible? Choose all that apply. | Visible labels linked to fields ; Error messages in text ; Grouping radio buttons with a legend | Placeholder text as the only label ; Clearing the form after an error | Labels, text errors and grouping help; placeholder-only labels and clearing forms create barriers.
SA3#design-u08-10-q5@2,3: Evaluate a job application form that uses placeholder labels, a CAPTCHA puzzle at the end, and errors shown only in red, and recommend improvements. | Barriers: placeholder labels disappear and aren't reliably announced (3.3.2, 1.3.1); a puzzle CAPTCHA blocks people with cognitive or visual impairments (3.3.8 Accessible Authentication applies to logins; for forms, offer alternatives); colour-only errors fail 1.4.1 and 3.3.1. Fixes: visible linked labels and hints; an accessible bot check or none; text error messages with suggestions and an error summary; save progress; test with assistive technology users. | Label barrier ; CAPTCHA barrier ; Error barrier ; Specific fixes ; Testing

## Assistive technologies
LV: Introductory · Foundation
S: Assistive technologies help disabled people use computers, phones and other products. This lesson describes the main kinds, screen readers, magnifiers, voice control, switch access, braille displays and captions, and what each needs from a design.
O: Describe the main types of assistive technology
O: Explain what each assistive technology needs from a design
O: Evaluate how design choices help or hinder assistive technology users
H: The main kinds
- **Screen readers** (for example JAWS and NVDA on Windows, VoiceOver on Apple devices, TalkBack on Android) read the screen aloud or to a braille display. They need text alternatives, headings, labels and correct roles in the code.
- **Screen magnifiers** enlarge part of the screen; users see only a small area at a time, so related content should be close together and layouts should reflow.
- **Voice control** (for example Voice Control on Apple devices, Dragon) lets users speak commands such as "click Submit"; it works best when visible labels match the accessible names.
- **Switch access** uses one or two switches (pressed with a hand, head or breath) to scan through items; it needs keyboard-operable controls and generous time.
- **Refreshable braille displays** show text as raised braille pins, used by many blind and deaf-blind people.
- **Captions, hearing loops and relay services** support deaf and hard-of-hearing people.
- **Built-in settings**: zoom, text size, high contrast, reduced motion and dark mode.
H: What designs need
P: Assistive technologies depend on designs exposing information correctly: structure (headings, lists, landmarks), names and roles of controls, text alternatives, keyboard access and responsiveness to user settings. W3C's WAI-ARIA can add roles and states to custom components, but the first rule of ARIA is to use native HTML elements where possible.
X: A screen reader user navigating a recipe page.
> She presses H to jump between headings: "Ingredients", "Method". This works only because real heading elements are used.
> She lists all links; ten say "Click here", which is meaningless out of context, so links should describe their destination.
> A custom star rating announces only "clickable"; it needs a proper name and value ("Rating: 4 out of 5 stars").
P: Many people use several technologies together, or only built-in settings: an older person may simply enlarge text and turn on captions. Designs should respect these settings, for example by allowing text to resize to 200% without loss of content and by honouring reduced-motion preferences.
K: Assistive technology can only present what the design exposes: real structure, names, roles and text make it work.
!: Assuming all blind people use screen readers the same way, or that disabled people are a single group. Ask and test with a range of users and technologies.
EV: established | Screen readers, magnifiers, voice control and switch access depend on correct structure, names, roles and keyboard support in designs (W3C WAI-ARIA).
EV: contested | Whether "accessibility overlay" tools that claim to fix sites automatically help users is strongly disputed; many disabled users and experts report they create new barriers.
T: Screen reader | Software that reads screen content aloud or to a braille display
T: Switch access | Controlling a device with one or more switches that scan through options
T: WAI-ARIA | W3C's specification for adding roles, states and properties to web content for assistive technologies
SUM: Assistive technologies include screen readers, magnifiers, voice control, switches, braille displays and captions.
SUM: They depend on designs exposing structure, names, roles, text alternatives and keyboard access.
SRC: World Wide Web Consortium, Accessible Rich Internet Applications (WAI-ARIA) 1.2, W3C Recommendation | standard | 2023 | https://www.w3.org/TR/wai-aria-1.2/
SRC: W3C Web Accessibility Initiative, How People with Disabilities Use the Web | guidance | 2024 | https://www.w3.org/WAI/people-use-web/
Q: What is the first rule of ARIA? | Use native HTML elements and attributes where possible, rather than adding ARIA to generic elements.
Q: How does voice control relate to visible labels? | Users speak the visible label, so it should match the control's accessible name.
M1#design-u08-11-q1@1: What does a screen reader do? | Reads screen content aloud or to a braille display | Enlarges part of the screen | Translates speech into commands | Changes the screen's colours | Screen readers convert content to speech or braille.
M2#design-u08-11-q2@2: A page has ten links that all say "Read more". Which users are most affected? | Screen reader users listing links out of context | Users with colour vision deficiency | Users of large monitors | Users on fast internet connections | Screen reader users often navigate by link lists, where identical text is meaningless.
M3#design-u08-11-q3@3: A company installs an automatic accessibility overlay instead of fixing its code. What is the strongest criticism? | Overlays don't fix underlying problems and can create new barriers | Overlays are illegal in the UK | Overlays make websites load too slowly to use | Overlays only work on mobile phones | Many disabled users and experts report overlays fail to fix real issues and interfere with assistive technology.
MATCH1#design-u08-11-q4@1: Match each assistive technology to a need. | Screen reader = text alternatives and correct roles ; Screen magnifier = related content placed close together ; Voice control = visible labels that match accessible names ; Switch access = keyboard-operable controls and enough time | Each technology relies on particular design features.
SA3#design-u08-11-q5@2,3: Explain how three assistive technologies interact with a website, and evaluate what designers must do to support them. | Screen readers need headings, labels, alt text and correct roles; magnifiers need reflowing layouts and related content close together; voice control needs visible labels matching accessible names; switch users need keyboard operability and time. Designers must use native HTML, meaningful structure and labels, support user settings, avoid overlays, and test with real users of these technologies, since needs vary. | Three technologies explained ; Design needs for each ; Native HTML or structure ; Testing with users ; Evaluation

## Testing for accessibility
LV: Advanced · Evaluation
S: No single method finds all accessibility barriers. This lesson explains automated testing, manual expert testing, assistive technology checks and testing with disabled people, what each finds and how to combine them.
O: Describe the main methods of accessibility testing
O: Plan an accessibility testing approach for a digital product
O: Evaluate the limits of automated testing
H: Methods
- **Automated tools** (for example axe, WAVE, Lighthouse) scan code for detectable failures: missing alt attributes, low contrast, missing labels, invalid ARIA.
- **Manual expert review** against WCAG: keyboard testing, checking alt text quality, focus order, headings, error handling, zoom to 400% and reflow.
- **Assistive technology testing**: using screen readers, magnifiers and voice control to complete tasks.
- **Usability testing with disabled people**: the only way to know whether real users can complete tasks.
H: What automation can't do
P: Automated tools can check whether an image has alt text, but not whether the alt text is accurate; whether a label exists, but not whether it makes sense; whether elements can receive focus, but not whether the order is logical. When the UK Government Digital Service tested automated tools on a page with deliberately introduced barriers (2017), the tools found well under half of the barriers, and some found far fewer. WebAIM's annual survey of the top million home pages finds detectable WCAG failures on the great majority of them (over 95% in recent years), showing that even the problems tools can find are widespread.
X: Planning testing for a council parking permit service.
> Each build: automated checks in the development pipeline.
> Each feature: manual keyboard, zoom and screen reader checks by the team.
> Before launch: an expert audit against WCAG 2.2 AA.
> Before launch and after major changes: usability sessions with disabled residents, including screen reader, magnifier and voice control users and someone with a learning disability.
> After launch: an accessibility statement with known issues and a contact for problems.
P: Testing works best when it is continuous rather than a single audit at the end. Teams that include accessibility checks in their definition of "done" for each feature, and that train designers and developers to test with a keyboard and screen reader, catch barriers when they are cheapest to fix.
K: Automated testing is a fast first filter; manual, assistive technology and user testing find most of what matters.
!: Treating an automated score of 100 as proof of accessibility. Many serious barriers are invisible to tools.
EV: established | Automated tools detect only a minority of accessibility barriers, so manual and user testing are needed (GDS, 2017).
EV: contested | Estimates of the share of WCAG issues automated tools can detect vary widely between studies and tools.
T: Automated accessibility testing | Using software to scan code for detectable accessibility failures
T: Accessibility audit | A systematic expert evaluation of a product against accessibility standards such as WCAG
SUM: Combine automated scans, manual expert checks, assistive technology testing and testing with disabled people.
SUM: Automation finds only a minority of barriers; real-user testing shows whether people can complete tasks.
SRC: Government Digital Service, "What we found when we tested tools on the world's least-accessible webpage", Accessibility in government blog | data | 2017 | https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/
SRC: WebAIM, The WebAIM Million: an annual accessibility analysis of the top 1,000,000 home pages | data | 2024 | https://webaim.org/projects/million/
Q: Why can't automated tools fully test accessibility? | They can detect some code failures but can't judge meaning, quality or logic, such as whether alt text is accurate or focus order makes sense.
Q: Name four methods of accessibility testing. | Automated tools, manual expert review, assistive technology testing and usability testing with disabled people.
M1#design-u08-12-q1@1: Which can an automated tool reliably detect? | An image with no alt attribute | Whether alt text accurately describes the image | Whether link text makes sense in context | Whether a disabled user can complete a task | Tools detect missing attributes, but not the quality or meaning of content.
M2#design-u08-12-q2@2: A team's site scores 100 in an automated accessibility checker. What should it conclude? | Detectable failures were not found, but manual and user testing are still needed | The site is fully accessible and needs no more testing | The site meets WCAG 2.2 AAA | Automated tools are useless and the score means nothing | A perfect score shows only the absence of detectable failures.
M3#design-u08-12-q3@3: Which testing plan is strongest for a new online banking app? | Automated checks, manual and screen reader testing, an audit and sessions with disabled customers | One automated scan just before launch | Asking developers whether they think it is accessible | A survey of non-disabled customers about the colour scheme | Combining methods finds far more barriers than any one alone.
TF2#design-u08-12-q4@2: Testing with disabled people can reveal barriers that a WCAG audit misses. | true | Real use reveals usability barriers and needs that criteria-based audits may not capture.
SA3#design-u08-12-q5@2,3: Plan accessibility testing for a university's course application system and evaluate each method. | Automated checks in development (fast, consistent, but find a minority of issues); manual keyboard, zoom and contrast checks (catch focus, reflow and logic issues); screen reader and voice control testing (check names, roles and announcements); expert WCAG 2.2 AA audit (systematic coverage); usability testing with disabled applicants (shows whether tasks can be completed; small samples, recruitment effort); publish an accessibility statement and feedback route. | Automated with limits ; Manual or assistive technology ; Expert audit ; User testing ; Evaluation and statement

## Cognitive accessibility
LV: Intermediate · Application
S: Cognitive and learning disabilities affect memory, attention, language, reasoning and processing. This lesson explains the needs involved, W3C's guidance on making content usable for people with cognitive disabilities, and practical design patterns.
O: Describe the range of cognitive and learning disabilities and their design implications
O: Apply W3C cognitive accessibility design patterns
O: Evaluate why cognitive accessibility is hard to capture in testable criteria
H: Who and what
P: **Cognitive and learning disabilities** include learning disabilities, dyslexia, dyscalculia, ADHD, autism, dementia, acquired brain injury and mental health conditions that affect concentration or memory. People may have difficulty with memory, attention, processing speed, reading, numbers, understanding abstract language or managing anxiety. Many people experience similar limits temporarily, such as when tired, stressed, ill or using a second language.
H: Design patterns
P: W3C's *Making Content Usable for People with Cognitive and Learning Disabilities* (2021) sets out objectives and patterns, including:
- **Help users understand what things are and how to use them**: familiar design, clear labels and icons with text.
- **Help users find what they need**: simple navigation, clear headings, search.
- **Use clear and understandable content**: plain language, short sentences, common words, explain jargon.
- **Help users avoid mistakes and know how to correct them**: clear instructions, forgiving inputs, undo.
- **Help users focus**: minimise distractions, avoid unnecessary animation and pop-ups.
- **Ensure processes do not rely on memory**: don't require remembering passwords, codes or earlier steps.
- **Provide help and support**: consistent help, human contact options.
- **Support adaptation and personalisation**: let users change text size, spacing and presentation.
X: Making a GP appointment booking easier to understand.
> Before: "Select your preferred modality for your consultation."
> After: "How would you like to talk to the doctor? Phone call / Video call / In person."
> Steps shown with a progress indicator; one question per page; the option to save and return later.
> A clear "Get help" link in the same place on every page (supporting Consistent Help, WCAG 3.2.6).
K: Plain language, predictable layouts, fewer demands on memory and clear recovery from mistakes help people with cognitive disabilities, and everyone else.
!: Assuming simple means childish. Plain language is respectful and clear; people with cognitive disabilities are adults who deserve the same content explained well.
H: Why it's hard
P: Cognitive needs vary widely and can conflict (some people need more information, others less), and many patterns aren't easily testable pass-or-fail criteria. WCAG 2.2 added some relevant criteria (Consistent Help, Redundant Entry, Accessible Authentication), and W3C's supplementary guidance covers much more.
EV: established | W3C publishes supplementary guidance on cognitive accessibility because many needs are not covered by WCAG success criteria (W3C, 2021).
EV: contested | How to turn cognitive accessibility guidance into testable requirements without oversimplifying diverse needs is debated.
T: Cognitive accessibility | Making content and interactions usable for people with cognitive and learning disabilities
T: Plain language | Writing that the intended audience can understand the first time they read or hear it
SUM: Cognitive disabilities affect memory, attention, language and processing; needs vary and can conflict.
SUM: Plain language, clear navigation, focus, memory support, error recovery, help and personalisation help everyone.
SRC: W3C, Making Content Usable for People with Cognitive and Learning Disabilities, W3C Working Group Note | guidance | 2021 | https://www.w3.org/TR/coga-usable/
SRC: World Wide Web Consortium, Web Content Accessibility Guidelines (WCAG) 2.2, success criteria 3.2.6, 3.3.7 and 3.3.8 | standard | 2023 | https://www.w3.org/TR/WCAG22/
Q: Name three cognitive accessibility design patterns. | Any three of: plain language, clear navigation, minimise distractions, don't rely on memory, help users avoid and correct mistakes, consistent help, personalisation.
Q: Why is cognitive accessibility hard to put into testable criteria? | Needs vary widely and can conflict, and many good practices aren't simple pass-or-fail tests.
M1#design-u08-13-q1@1: Which is a cognitive accessibility design pattern from W3C guidance? | Ensure processes do not rely on memory | Use as much jargon as possible | Add animations to every page | Hide help to keep pages clean | Reducing memory demands is a key W3C pattern.
M2#design-u08-13-q2@2: Which rewrite is clearest for a council form? | When did you move into your home? | Please indicate the date of commencement of residency | Specify residency inception chronology | Input temporal data regarding domicile | Plain, common words make the question understandable at first reading.
M3#design-u08-13-q3@3: Users with ADHD find a shopping site hard to use because of pop-ups and auto-playing videos. Which pattern addresses this? | Help users focus by minimising distractions | Use clear and understandable content | Support adaptation of text size | Provide a search box | Removing distractions supports attention; the others help other needs.
MS2#design-u08-13-q4@2: Which design choices support cognitive accessibility? Choose all that apply. | A progress indicator in a long form ; A consistent "Get help" link ; Allowing users to save and return | A login that requires remembering a 16-character code ; Time limits with no option to extend | Progress, consistent help and saving reduce load; memory demands and strict timeouts create barriers.
SA3#design-u08-13-q5@2,3: Evaluate a benefits application website for cognitive accessibility and recommend improvements. | Possible barriers: complex legal language, long pages with many questions, session timeouts, passwords and memorable words, inconsistent layout, unclear errors. Improvements: plain language with explanations, one question per page, progress indicator, save and return, extendable time limits, accessible authentication alternatives, consistent help with human contact, clear error recovery. Note: needs vary, so test with people with learning disabilities, dementia and others. | Identifies barriers ; Plain language ; Memory or time support ; Help and error recovery ; Testing with users

## Accessibility and UK law
LV: Advanced · Evaluation
S: In the UK, accessibility is required by equality law and, for public bodies, by specific regulations for websites and apps. This lesson explains the Equality Act 2010's duties, the public sector accessibility regulations, accessibility statements and enforcement, for study rather than legal advice.
O: Describe the Equality Act 2010 duties relevant to accessible design
O: Explain the Public Sector Bodies Accessibility Regulations 2018 and accessibility statements
O: Evaluate how effective UK law is in improving digital accessibility
H: The Equality Act 2010
P: The **Equality Act 2010** (applying in England, Scotland and Wales; Northern Ireland has its own disability discrimination legislation) protects disabled people from discrimination. Service providers, employers and educators have a **duty to make reasonable adjustments** (section 20) to avoid disabled people being put at a substantial disadvantage. For services to the public, the duty is **anticipatory**: providers must think in advance about what disabled people might need, not wait until someone complains. The duty includes providing information in accessible formats and removing or avoiding physical features that create barriers, where reasonable.
H: Public sector websites and apps
P: The **Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018** require most public sector websites and apps (councils, universities, NHS bodies, government departments) to meet accessibility requirements and publish an **accessibility statement**. The requirement is set by reference to the European standard EN 301 549, which incorporates WCAG AA; UK government guidance now tells public bodies to meet WCAG 2.2 AA, and the Government Digital Service monitors websites and can require fixes.
- An accessibility statement explains how accessible the service is, lists known issues and why, and gives a way to report problems.
- Some content is exempt, such as some archived content and some third-party content not under the body's control, but bodies must explain exemptions.
- Enforcement: the Equality and Human Rights Commission in Great Britain and the Equality Commission for Northern Ireland.
X: Applying the law (for study).
> A council's parking permit website can't be used with a keyboard.
> Under the 2018 Regulations, the council should fix it to meet WCAG AA, and in the meantime list the issue in its accessibility statement with an alternative way to apply.
> Under the Equality Act, a disabled resident put at a substantial disadvantage could argue the council failed its anticipatory duty to make reasonable adjustments.
K: The Equality Act applies broadly to service providers, including private companies; the 2018 Regulations add specific technical requirements and statements for public bodies.
!: Thinking private companies have no legal duty. The 2018 Regulations apply to the public sector, but the Equality Act's reasonable adjustments duty applies to private service providers too. Businesses selling into the EU may also be affected by the European Accessibility Act, applying since June 2025.
H: How effective is it?
P: The law has raised awareness and the public sector monitoring regime has led to many fixes, but enforcement relies on monitoring capacity and individuals bringing claims, which is costly and slow, and the WebAIM Million data show widespread failures on private websites. This lesson describes the law for study only; real cases need legal advice.
EV: established | The Equality Act 2010 imposes an anticipatory duty to make reasonable adjustments on service providers, and the 2018 Regulations require public sector websites and apps to meet accessibility requirements and publish statements.
EV: contested | How effective UK enforcement is in improving private sector digital accessibility is debated, given reliance on individual claims.
T: Reasonable adjustment | A change that removes or reduces a disadvantage faced by a disabled person, required where reasonable under the Equality Act 2010
T: Accessibility statement | A public statement of how accessible a website or app is, known issues and how to report problems
SUM: The Equality Act 2010 requires reasonable, anticipatory adjustments by service providers, including private ones.
SUM: The 2018 Regulations require public sector sites and apps to meet WCAG AA and publish accessibility statements.
SRC: Equality Act 2010, c. 15, section 20 and Schedule 2 | legislation | 2010 | https://www.legislation.gov.uk/ukpga/2010/15/contents
SRC: The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018, SI 2018/952 | legislation | 2018 | https://www.legislation.gov.uk/uksi/2018/952/contents/made
SRC: Central Digital and Data Office and Government Digital Service, Understanding accessibility requirements for public sector bodies | guidance | 2024 | https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps
Q: What does "anticipatory" mean in the Equality Act duty for services? | Providers must think in advance about what disabled people might need, not wait for a complaint.
Q: What must an accessibility statement include? | How accessible the service is, known issues and reasons, and how to report problems.
M1#design-u08-14-q1@1: Which UK law requires service providers to make reasonable adjustments for disabled people? | The Equality Act 2010 | The Data Protection Act 2018 | The Consumer Rights Act 2015 | The Companies Act 2006 | The Equality Act 2010 (section 20) sets out the duty to make reasonable adjustments.
M2#design-u08-14-q2@2: A university's website has known accessibility issues it cannot fix immediately. What should it do under the 2018 Regulations? | List the issues in its accessibility statement, explain why, and offer alternatives | Remove the accessibility statement until all issues are fixed | Do nothing, because universities are exempt | Block disabled users from the website | Statements must be honest about known issues and give ways to get help or report problems.
M3#design-u08-14-q3@3: A private online retailer says accessibility law only applies to councils. What is the best response? | The 2018 Regulations target the public sector, but the Equality Act applies to private service providers too | It is correct, so the retailer has no duty at all | Only the European Accessibility Act applies in the UK | Accessibility law applies only to physical shops | The anticipatory reasonable adjustments duty applies to private businesses providing services to the public.
TF2#design-u08-14-q4@2: The Public Sector Bodies Accessibility Regulations 2018 require an accessibility statement for covered websites and apps. | true | Covered bodies must publish an accessibility statement in a set format.
SA3#design-u08-14-q5@1,3: Explain the UK legal framework for digital accessibility and evaluate its effectiveness (for study, not legal advice). | Equality Act 2010: anticipatory duty on service providers, employers and educators to make reasonable adjustments, applying to private and public bodies in Great Britain. 2018 Regulations: public sector websites and apps must meet WCAG AA (current guidance WCAG 2.2) and publish accessibility statements; GDS monitors; EHRC and ECNI enforce. Effectiveness: monitoring has driven public sector fixes, but private enforcement relies on costly individual claims and failures remain widespread; standards are a baseline. | Equality Act duty ; Anticipatory and private scope ; 2018 Regulations and statements ; Enforcement ; Evaluation
`;
