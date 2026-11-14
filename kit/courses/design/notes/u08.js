// CreateGradify Accessibility and Inclusive Design (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Why accessibility matters
LV: Introductory · Foundation
S: Accessibility means designing products and services that disabled people can perceive, understand, navigate and use. This lesson explains how many people are affected, why exclusion is a design failure and how accessible design benefits everyone.
O: Define accessibility in design
O: Describe the scale of disability in the UK and worldwide
O: Explain the ethical, legal and business case for accessibility
H: What accessibility means
P: **Accessibility** is the degree to which a product, service or environment can be used by people with the widest range of abilities, including disabled people. In digital design it means people can **perceive**, **understand**, **navigate** and **interact** with content, whether they use a mouse, a keyboard, a screen reader or voice control. Tim Berners-Lee, inventor of the World Wide Web, said that "the power of the Web is in its universality" and that access by everyone regardless of disability is an essential aspect. When a design shuts people out, the failure lies in the design, not in the person.
H: The scale of disability
- The World Health Organization estimated in 2022 that about **1.3 billion people**, roughly **one in six** of the world's population, experience significant disability.
- The UK Family Resources Survey 2022 to 2023 reported about **16 million disabled people**, around **24%** of the population.
- Disability includes **visual**, **hearing**, **motor**, **cognitive**, **mental health** and **speech** impairments, and many disabilities are not visible.
- Disability becomes more common with **age**, so ageing populations increase the need for accessible design.
- Anyone can experience **temporary** or **situational** limitations, such as a broken arm or bright sunlight on a screen.
H: Why it matters
- **Ethical**: access to information, services and products is a matter of equality and dignity.
- **Legal**: in the UK the **Equality Act 2010** requires service providers to make reasonable adjustments, and public sector websites must meet accessibility regulations.
- **Business**: disabled people and their households have significant spending power, often called the **purple pound**.
- **Quality**: accessible designs tend to be clearer, more robust and easier for everyone to use.
- **Cost**: building accessibility in from the start is far cheaper than retrofitting it after launch.
X: A bus timetable redesign.
> A council publishes its bus timetable only as a scanned image in a PDF.
> Screen reader users cannot read it, and people on phones must pinch and zoom.
> The team rebuilds it as a simple, responsive web table with clear headings.
> Complaints fall, and analytics show most visitors now finish their journey search on a phone.
K: Accessibility is about making products usable by people with the widest range of abilities; around one in six people worldwide and about a quarter of the UK population are disabled, and accessible design is an ethical, legal and business necessity that usually improves quality for everyone.
!: Thinking accessibility only affects a small minority. Disability is common, often invisible and increases with age, and situational limitations affect everyone.
EV: established | The WHO estimates that around 1.3 billion people, about 16% of the global population, experience significant disability.
T: Accessibility | The degree to which a product or service can be used by people with the widest range of abilities
T: Situational limitation | A temporary barrier caused by context, such as noise, glare or holding something
T: Purple pound | The spending power of disabled people and their households
SUM: Disability is common.
SUM: Exclusion is a design failure.
SUM: Accessibility improves quality.
SRC: World Health Organization, Global Report on Health Equity for Persons with Disabilities, WHO | data | 2022 | https://www.who.int/publications/i/item/9789240063600
SRC: Department for Work and Pensions, Family Resources Survey: financial year 2022 to 2023, gov.uk | data | 2024 | https://www.gov.uk/government/statistics/family-resources-survey-financial-year-2022-to-2023
SRC: W3C Web Accessibility Initiative, Introduction to Web Accessibility, W3C | guidance | 2024 | https://www.w3.org/WAI/fundamentals/accessibility-intro/
Q: Roughly what proportion of the world's population experiences significant disability? | About one in six (around 1.3 billion people).
Q: What is the purple pound? | The spending power of disabled people and their households.
M1#design-u08-01-q1@1: According to the WHO in 2022, roughly how many people worldwide experience significant disability? | About 1.3 billion | About 13 million | About 130 million | About 4 billion | The WHO estimate is about 1.3 billion people, around 16% of the world's population.
M2#design-u08-01-q2@2: About what share of the UK population was reported as disabled in the Family Resources Survey 2022 to 2023? | Around 24% | Around 4% | Around 50% | Around 10% | The survey reported about 16 million disabled people, roughly a quarter of the population.
TF1#design-u08-01-q3@1: Most disabilities are immediately visible to other people. | false | Many disabilities, such as hearing loss, chronic illness, dyslexia and mental health conditions, are not visible.
M3#design-u08-01-q4@3: A start-up says accessibility can wait until after launch. What is the strongest response? | Retrofitting later is costlier and excludes users meanwhile | Accessibility is only needed for government sites | Disabled users rarely buy online products | Accessibility only matters for large companies | Building accessibility in early is cheaper, and waiting excludes disabled customers and risks legal claims.
SA2#design-u08-01-q5@2,3: Explain why accessibility matters for designers, using ethical, legal and business arguments. | Ethically, disabled people have the same right to information, products and services as anyone else, and a design that excludes them fails its purpose. Legally, the Equality Act 2010 requires reasonable adjustments, and public sector websites must meet accessibility regulations. In business terms, disabled people and their households form a large market, and accessible products are often clearer and easier for everyone. Building accessibility in from the start is also cheaper than fixing it later. | Ethical equality ; Equality Act duty ; Market and purple pound ; Benefits everyone and cheaper early

## Models of disability
LV: Introductory · Foundation
S: How we think about disability shapes how we design. This lesson compares the medical, social, biopsychosocial and human rights models of disability and explains why the social model matters to designers.
O: Describe the medical and social models of disability
O: Explain the biopsychosocial and human rights models
O: Apply the social model to identify design barriers
H: Medical and social models
P: The **medical model** sees disability as a problem located in a person's body or mind, to be diagnosed, treated or cured by professionals. The **social model**, developed by disabled activists in the UK, distinguishes **impairment** (a physical, sensory or cognitive difference) from **disability** (the exclusion caused by barriers in society). The Union of the Physically Impaired Against Segregation set out this distinction in its 1976 Fundamental Principles of Disability, and the sociologist Mike Oliver named it the social model in 1983. Under the social model, a wheelchair user is disabled by steps, not by their legs; remove the steps and the barrier disappears.
H: Other models
- The **biopsychosocial model**, used in the WHO International Classification of Functioning, Disability and Health (**ICF**, 2001), sees disability as an interaction between health conditions and personal and environmental factors.
- The **human rights model**, reflected in the **UN Convention on the Rights of Persons with Disabilities** (2006), treats access as a right, not a favour.
- The **charity model** treats disabled people as objects of pity, and is widely rejected by disabled people.
- Many disabled people use **identity-first** language ("disabled people"), which in the UK reflects the social model.
H: What the social model means for designers
- Designers create or remove **barriers**: inaccessible design produces disability.
- Barriers can be **physical** (steps), **communication** (no captions), **attitudinal** (assumptions) or **organisational** (rigid processes).
- The question becomes "what in this design excludes people?" rather than "what is wrong with this user?"
- It places responsibility on teams and organisations to fix barriers.
- It encourages **involving disabled people** in research and testing.
X: Applying the social model to a ticket machine.
> A railway ticket machine has a touch screen mounted high and no audio output.
> Under the medical model, the problem is framed as the user's poor sight or short stature.
> Under the social model, the barriers are the screen height, lack of audio and small text.
> The redesign lowers the screen, adds a headphone socket with speech and offers larger text.
K: The medical model locates disability in the person, while the social model separates impairment from the disability caused by societal barriers; the biopsychosocial and human rights models add interaction and rights, and the social model reminds designers that their choices create or remove barriers.
!: Treating the social model as denying that impairments exist. It accepts impairments but argues that exclusion is caused by barriers that can be removed.
EV: established | The social model distinguishes impairment from disability caused by barriers, as set out by UPIAS in 1976 and named by Mike Oliver in 1983.
EV: contested | Some scholars, such as Tom Shakespeare, argue the strict social model underplays the effects of impairment itself, such as pain or fatigue.
T: Impairment | A physical, sensory, cognitive or mental difference in a person
T: Social model | The view that people are disabled by barriers in society rather than by their impairments
T: Barrier | Anything in the environment, design or attitudes that prevents participation
SUM: Medical model: the person is the problem.
SUM: Social model: barriers disable.
SUM: Designers create or remove barriers.
SRC: Oliver M., The Politics of Disablement, Macmillan | secondary | 1990
SRC: World Health Organization, International Classification of Functioning, Disability and Health (ICF), WHO | standard | 2001 | https://www.who.int/standards/classifications/international-classification-of-functioning-disability-and-health
SRC: Shakespeare T., Disability Rights and Wrongs Revisited, 2nd edition, Routledge | secondary | 2014
Q: In the social model, what is the difference between impairment and disability? | Impairment is a difference in the person; disability is the exclusion caused by barriers in society.
Q: Which WHO framework uses a biopsychosocial model of disability? | The International Classification of Functioning, Disability and Health (ICF).
M1#design-u08-02-q1@1: Which model of disability says people are disabled mainly by barriers in society? | The social model | The medical model | The charity model | The deficit model | The social model separates impairment from the disability caused by social and environmental barriers.
MATCH2#design-u08-02-q2@2: Match each model of disability to its main idea. | Medical = Disability is a condition to treat ; Social = Barriers in society disable people ; Biopsychosocial = Health and context interact ; Human rights = Access is a right | Each model frames disability differently and so suggests different responses.
M2#design-u08-02-q3@2: Which document reflects the human rights model of disability? | The UN Convention on the Rights of Persons with Disabilities | The WHO ICF classification of 2001 | The Fundamental Principles of 1976 | The NHS Long Term Plan of 2019 | The UN Convention of 2006 treats accessibility and participation as rights.
M3#design-u08-02-q4@3: A deaf student cannot follow uncaptioned lecture videos. What would a social model response focus on? | Adding captions and transcripts to the videos | Recommending a hearing test | Asking the student to sit nearer the screen | Advising the student to change course | The social model removes the barrier, here the missing captions, rather than treating the person.
SA2#design-u08-02-q5@2,3: Compare the medical and social models of disability and explain why the social model is useful for designers. | The medical model sees disability as a problem within the person that professionals diagnose and treat. The social model separates impairment from disability and argues that people are disabled by barriers such as steps, missing captions or rigid processes. For designers this is useful because it shows that their decisions create or remove barriers, so they can take responsibility for removing them. It also encourages teams to involve disabled people in finding and fixing barriers. | Medical model ; Impairment versus disability ; Barriers created by design ; Responsibility and involvement

## Inclusive design principles
LV: Introductory · Application
S: Inclusive design deliberately considers the full range of human diversity. This lesson explains Microsoft's inclusive design principles and persona spectrum, and the Inclusive Design Principles for digital products.
O: Define inclusive design
O: Explain recognising exclusion and the persona spectrum
O: Apply inclusive design principles to a product
H: What inclusive design is
P: **Inclusive design** is a methodology that draws on the full range of human diversity, including ability, language, culture, gender and age, and involves people who are often excluded. The Royal College of Art's Helen Hamlyn Centre and Microsoft's Inclusive Design toolkit (2016) helped popularise it. Microsoft sets out three principles: **recognise exclusion**, because exclusion happens when we solve problems using our own biases; **learn from diversity**, because people who adapt to exclusion are experts; and **solve for one, extend to many**, because designing for people with permanent disabilities often benefits many others.
H: The persona spectrum
- Microsoft's **persona spectrum** links **permanent**, **temporary** and **situational** limitations.
- Touch: someone with **one arm** (permanent), an **arm injury** (temporary), a **new parent holding a baby** (situational).
- Hearing: a **deaf** person, someone with an **ear infection**, a **bartender in a noisy bar**.
- Sight: a **blind** person, someone with **cataracts**, a **distracted driver**.
- Designing for the permanent case extends benefits across the spectrum.
H: Inclusive Design Principles for digital products
- Published by Swan, Pouncey, Pickering and Watson (2016): **provide comparable experience**, **consider situation**, **be consistent**, **give control**, **offer choice**, **prioritise content**, **add value**.
- Comparable experience means alternatives should be equivalent in quality, not a lesser version.
- Giving control means users can pause motion, change text size or stop autoplay.
- Offering choice means more than one way to complete a task.
- Involve excluded people as **co-designers**, not just test participants.
X: Solve for one, extend to many: captions.
> Captions were developed for deaf and hard of hearing viewers.
> Today many people watch videos with captions on in noisy places, quiet offices or while learning a language.
> Social media videos are often watched with the sound off.
> A feature designed for a permanent need now benefits a large situational audience.
K: Inclusive design draws on human diversity and involves excluded people; Microsoft's principles are recognise exclusion, learn from diversity and solve for one, extend to many, the persona spectrum links permanent, temporary and situational limitations, and the Inclusive Design Principles guide digital products.
!: Thinking inclusive design means one design for everyone. It often means offering choice and flexibility so different people can use the product in different ways.
EV: established | Features designed for disabled people, such as captions and curb cuts, frequently benefit much wider groups, known as the curb-cut effect.
T: Inclusive design | A methodology that draws on the full range of human diversity and involves excluded people
T: Persona spectrum | A tool linking permanent, temporary and situational versions of a limitation
T: Curb-cut effect | The way features designed for disabled people benefit many others
SUM: Recognise exclusion.
SUM: Learn from diversity.
SUM: Solve for one, extend to many.
SRC: Microsoft, Inclusive Design Toolkit, Microsoft Design | guidance | 2016 | https://inclusive.microsoft.design/
SRC: Swan H., Pouncey I., Pickering H. and Watson L., Inclusive Design Principles | guidance | 2016 | https://inclusivedesignprinciples.info/
SRC: Holmes K., Mismatch: How Inclusion Shapes Design, MIT Press | secondary | 2018
Q: What are Microsoft's three inclusive design principles? | Recognise exclusion, learn from diversity, and solve for one, extend to many.
Q: Give a situational example of a hearing limitation. | Someone in a noisy bar or on a busy street.
M1#design-u08-03-q1@1: Which is one of Microsoft's three inclusive design principles? | Learn from diversity | Design for the average user | Prioritise aesthetics first | Test only with experts | Microsoft's principles are recognise exclusion, learn from diversity, and solve for one, extend to many.
MATCH2#design-u08-03-q2@2: Match each limitation to its place on the persona spectrum. | One arm = Permanent ; Broken wrist = Temporary ; Holding a baby = Situational ; Ear infection = Temporary | The persona spectrum links permanent, temporary and situational versions of the same limitation.
M2#design-u08-03-q3@2: Which principle is shown when a video player lets users pause animations and turn off autoplay? | Give control | Prioritise content | Be consistent | Add value | Giving control lets people adjust the experience to their needs, such as stopping motion.
M3#design-u08-03-q4@3: A team offers a separate text-only version of its site that is rarely updated. Which principle does this break? | Provide comparable experience | Consider situation | Offer choice | Prioritise content | Alternatives must be equivalent in quality and kept up to date, not a lesser version.
SA2#design-u08-03-q5@2,3: Use the persona spectrum to explain how designing for one group can benefit many. | The persona spectrum shows that a limitation can be permanent, temporary or situational, such as having one arm, a broken wrist or holding a baby. If a team designs a phone app that can be used with one hand for someone with one arm, the same feature helps someone with a broken wrist and a parent carrying a child. This is the principle of solve for one, extend to many. It shows that designing with disabled people often produces better products for a much wider audience. | Permanent, temporary, situational ; Concrete example ; Solve for one, extend to many ; Wider benefit

## Universal design
LV: Introductory · Application
S: Universal design aims to make environments and products usable by all people, to the greatest extent possible, without adaptation. This lesson explains its origins, the seven principles and how it differs from inclusive design.
O: Describe the origins of universal design
O: Explain the seven principles of universal design
O: Compare universal design with inclusive design
H: Origins
P: **Universal design** was coined by the architect **Ronald Mace**, who used a wheelchair, and was developed at the **Center for Universal Design** at North Carolina State University. It is defined as the design of products and environments to be usable by all people, to the greatest extent possible, without the need for adaptation or specialised design. In 1997 a working group led by Mace published the **seven principles of universal design**. In the UK and Europe, related ideas are often called **design for all** or **inclusive design**, and in education **Universal Design for Learning** applies similar thinking to teaching.
H: The seven principles
- **Equitable use**: useful to people with diverse abilities, with the same means of use where possible.
- **Flexibility in use**: accommodates a wide range of preferences and abilities, such as left- or right-handed use.
- **Simple and intuitive use**: easy to understand regardless of experience, knowledge or language.
- **Perceptible information**: communicates necessary information through several senses.
- **Tolerance for error**: minimises hazards and the consequences of accidental actions.
- **Low physical effort** and **size and space for approach and use**: efficient, comfortable use and enough room for any body size, posture or mobility.
H: Universal and inclusive design
- Universal design tends to seek **one solution** usable by everyone.
- Inclusive design accepts that one size rarely fits all and may offer **several solutions** or choices.
- Both reject designing for an imagined average user.
- Universal design began in **architecture and products**; inclusive design is widely used in **digital** and service design.
- In practice many designers combine both approaches.
X: A lever door handle.
> A round door knob needs grip and wrist rotation.
> A lever handle can be opened with an elbow, a closed fist or a full shopping hand.
> It supports equitable use, low physical effort and flexibility in use.
> The same handle works for children, older people, wheelchair users and people carrying bags.
K: Universal design, coined by Ronald Mace, aims for products and environments usable by all without adaptation; its seven principles are equitable use, flexibility, simple and intuitive use, perceptible information, tolerance for error, low physical effort and size and space for approach and use.
!: Assuming universal design means a single bland design. It aims for wide usability and can still be attractive and distinctive, as many lever handles and step-free entrances show.
EV: established | The seven principles of universal design were published by the Center for Universal Design at North Carolina State University in 1997.
T: Universal design | Design of products and environments usable by all people to the greatest extent possible without adaptation
T: Tolerance for error | A principle that minimises hazards and the consequences of mistakes
T: Perceptible information | A principle that information is communicated through several senses
SUM: Coined by Ronald Mace.
SUM: Seven principles.
SUM: One design for as many as possible.
SRC: Center for Universal Design, The Principles of Universal Design, version 2.0, North Carolina State University | standard | 1997
SRC: Clarkson P. J. and Coleman R., "History of inclusive design in the UK", Applied Ergonomics 46 | primary | 2015
Q: Who coined the term universal design? | The architect Ronald Mace.
Q: Name three of the seven principles of universal design. | Any three of equitable use, flexibility in use, simple and intuitive use, perceptible information, tolerance for error, low physical effort, size and space for approach and use.
M1#design-u08-04-q1@1: Where were the seven principles of universal design developed? | The Center for Universal Design at North Carolina State University | The Helen Hamlyn Centre at the Royal College of Art | The W3C Web Accessibility Initiative in Boston | The Design Council in London | The principles were published in 1997 by a group led by Ronald Mace at NC State.
M2#design-u08-04-q2@2: A kettle gives a sound, a light and a raised mark when it has boiled. Which principle does this show? | Perceptible information | Low physical effort | Size and space for approach and use | Equitable use | It communicates the same information through hearing, sight and touch.
TF2#design-u08-04-q3@2: Universal design tends to seek one solution for everyone, while inclusive design may offer several. | true | Inclusive design accepts that one size rarely fits all and often provides choice.
M3#design-u08-04-q4@3: An undo button and a confirmation step before deleting files best illustrate which principle? | Tolerance for error | Simple and intuitive use | Flexibility in use | Perceptible information | These features reduce the consequences of accidental actions.
SA2#design-u08-04-q5@1,2,3: Explain universal design and compare it with inclusive design. | Universal design, coined by Ronald Mace, aims to make products and environments usable by all people as far as possible without adaptation, guided by seven principles such as equitable use, flexibility and tolerance for error. Inclusive design shares the goal of not designing for an average user but accepts that one solution rarely suits everyone, so it may offer choices or several versions. Universal design began in architecture and products, while inclusive design is widely used in digital services. Designers often combine both approaches. | Definition and origin ; Seven principles ; One solution versus choice ; Combined in practice

## WCAG 2.2 and the POUR principles
LV: Introductory · Foundation
S: The Web Content Accessibility Guidelines are the international standard for digital accessibility. This lesson explains how WCAG 2.2 is structured and the four POUR principles.
O: Describe what WCAG is and who publishes it
O: Explain the four POUR principles
O: Describe the structure of principles, guidelines and success criteria
H: What WCAG is
P: The **Web Content Accessibility Guidelines** (**WCAG**) are published by the **World Wide Web Consortium** (**W3C**) through its **Web Accessibility Initiative** (WAI). WCAG 1.0 appeared in 1999, WCAG 2.0 in 2008, WCAG 2.1 in 2018 and **WCAG 2.2** became a W3C Recommendation in **October 2023**. WCAG 2.0 is also an international standard, ISO/IEC 40500. The guidelines are **technology-neutral**: they describe outcomes, so they apply to websites, apps, documents and other digital content. WCAG is backwards compatible, so content that meets WCAG 2.2 also meets 2.1 and 2.0.
H: The POUR principles
- **Perceivable**: information must be presented in ways users can perceive, such as text alternatives and captions.
- **Operable**: interface components must be usable, such as by keyboard, with enough time and no seizure risks.
- **Understandable**: content and operation must be clear, with readable text and predictable behaviour.
- **Robust**: content must work reliably with a wide range of user agents, including **assistive technologies**.
- If any one principle fails, some users cannot use the content.
H: Structure of WCAG 2.2
- Four **principles** contain **13 guidelines**, such as 1.4 Distinguishable.
- Guidelines contain testable **success criteria**, such as 1.4.3 Contrast (Minimum).
- WCAG 2.2 has **86 success criteria**, each at **level A, AA or AAA**.
- WCAG 2.2 added nine criteria, including **2.5.8 Target Size (Minimum)**, **2.4.11 Focus Not Obscured** and **3.3.8 Accessible Authentication**, and removed **4.1.1 Parsing**.
- Supporting documents such as **Understanding WCAG** and **Techniques** explain intent and give examples.
X: Reading a success criterion reference.
> A designer sees the reference "2.4.7 Focus Visible (AA)" in an audit.
> The first number, 2, is the principle: Operable.
> 2.4 is the guideline Navigable, and 2.4.7 is the success criterion itself.
> AA is its conformance level, which most organisations target.
K: WCAG, published by the W3C, is the international standard for digital accessibility; WCAG 2.2 (2023) is organised into four POUR principles (perceivable, operable, understandable, robust), 13 guidelines and 86 testable success criteria at levels A, AA and AAA.
!: Treating WCAG as only for websites. Its outcome-based criteria apply to apps, documents, kiosks and other digital content too.
EV: established | WCAG 2.2 became a W3C Recommendation on 5 October 2023 and added nine new success criteria to WCAG 2.1.
T: WCAG | Web Content Accessibility Guidelines, the W3C standard for digital accessibility
T: Success criterion | A testable statement in WCAG used to judge conformance
T: POUR | Perceivable, operable, understandable and robust, the four principles of WCAG
SUM: Published by the W3C.
SUM: Perceivable, operable, understandable, robust.
SUM: Principles, guidelines, success criteria.
SRC: W3C, Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation | standard | 2023 | https://www.w3.org/TR/WCAG22/
SRC: W3C Web Accessibility Initiative, What's New in WCAG 2.2, W3C | guidance | 2023 | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
Q: What does POUR stand for? | Perceivable, operable, understandable and robust.
Q: When did WCAG 2.2 become a W3C Recommendation? | October 2023.
M1#design-u08-05-q1@1: Which organisation publishes WCAG? | The World Wide Web Consortium (W3C) | The International Organization for Standardization | The UK Government Digital Service | The Royal National Institute of Blind People | WCAG is published by the W3C through its Web Accessibility Initiative.
SEQ1#design-u08-05-q2@3: Put the WCAG versions in order of publication, earliest first. | WCAG 1.0 ; WCAG 2.0 ; WCAG 2.1 ; WCAG 2.2 | WCAG 1.0 came in 1999, 2.0 in 2008, 2.1 in 2018 and 2.2 in 2023.
M2#design-u08-05-q3@2: Ensuring a site works reliably with screen readers and future browsers falls under which POUR principle? | Robust | Perceivable | Operable | Understandable | Robust content works with a wide range of user agents, including assistive technologies.
M3#design-u08-05-q4@2: In the reference 1.4.3 Contrast (Minimum), what does 1.4 identify? | The guideline, Distinguishable | The principle, Perceivable | The conformance level, AA | The version, WCAG 1.4 | The first number is the principle, the second level is the guideline and the third is the criterion.
SA2#design-u08-05-q5@2,3: Explain the four POUR principles of WCAG with a design example for each. | Perceivable means users must be able to perceive information, for example by providing alt text for images and captions for video. Operable means people must be able to use controls, for example by keyboard alone and with enough time. Understandable means content and behaviour are clear, for example plain language and helpful error messages. Robust means content works with many user agents, including screen readers, for example by using correctly coded native controls. | Perceivable example ; Operable example ; Understandable example ; Robust example

## Conformance levels
LV: Intermediate · Application
S: WCAG success criteria are grouped into three conformance levels. This lesson explains levels A, AA and AAA, what full conformance requires and why most organisations target AA.
O: Describe WCAG levels A, AA and AAA
O: Explain the WCAG conformance requirements
O: Judge an appropriate conformance target for a project
H: The three levels
P: Each WCAG success criterion has a **conformance level**. **Level A** is the minimum: failing it creates severe barriers for some groups, for example images without text alternatives or controls that cannot be used by keyboard. **Level AA** addresses the biggest and most common barriers, such as low text contrast and invisible focus; it is the level most laws and policies require. **Level AAA** is the highest, such as sign language for prerecorded video or a 7:1 contrast ratio. To claim a level, a page must meet **every** criterion at that level and all lower levels, so AA conformance means meeting all A and AA criteria.
H: Conformance requirements
- **Full pages**: conformance applies to whole pages, not parts of them.
- **Complete processes**: every page in a process, such as a checkout, must conform.
- **Accessibility-supported technologies**: content must work with the assistive technologies people actually use.
- **Non-interference**: non-conforming content must not block the rest of the page, for example by trapping focus.
- An alternative conforming version can be provided in some cases.
H: Choosing a target
- **WCAG 2.2 AA** is the common target for public sector and most commercial work in the UK.
- The W3C does **not recommend** requiring AAA for entire sites, because some content cannot meet every AAA criterion.
- Teams can still adopt **specific AAA criteria** where they help their users, such as plain language for a health service.
- Conformance is a **floor**, not a guarantee of a good experience; usability testing with disabled people is still needed.
- An **accessibility statement** should explain the target and any known issues.
X: Claiming conformance on a booking site.
> A cinema's booking flow meets every A and AA criterion except on the seat map, which only works with a mouse.
> Because conformance requires complete processes, the whole booking flow does not conform to AA.
> The team adds a keyboard-operable list of seats as an equivalent alternative.
> The flow can now be claimed as WCAG 2.2 AA conformant.
K: WCAG criteria are at levels A (minimum), AA (common target, required by most laws) and AAA (highest); claiming a level means meeting all criteria at that level and below across full pages and complete processes, and AAA is not recommended as a general requirement for whole sites.
!: Thinking a page can be 'mostly AA'. Conformance is all or nothing for each level: one failed AA criterion means the page does not conform to AA.
EV: established | The W3C states that it is not recommended that Level AAA conformance be required as a general policy for entire sites.
T: Conformance level | The grade A, AA or AAA assigned to a WCAG success criterion
T: Complete process | A series of pages needed to finish a task, all of which must conform
T: Accessibility statement | A public statement of a service's accessibility, known issues and contact routes
SUM: A, AA, AAA.
SUM: AA is the usual target.
SUM: All or nothing per level.
SRC: W3C, Web Content Accessibility Guidelines (WCAG) 2.2, Conformance section | standard | 2023 | https://www.w3.org/TR/WCAG22/#conformance
SRC: Government Digital Service, Understanding accessibility requirements for public sector bodies, gov.uk | guidance | 2024 | https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps
Q: Which WCAG level do most laws and policies require? | Level AA.
Q: What does AA conformance require? | Meeting every level A and level AA success criterion.
M1#design-u08-06-q1@1: Which WCAG level is the minimum? | Level A | Level AA | Level AAA | Level B | Level A covers the most severe barriers and is the minimum level of conformance.
M2#design-u08-06-q2@2: A checkout's payment page fails one AA criterion, but every other page passes. What can be claimed for the checkout? | It does not conform to AA | It conforms to AA overall | It conforms to AA on most pages, which is enough | It conforms to AAA instead | Conformance applies to complete processes, so one failing page means the process does not conform.
TF2#design-u08-06-q3@2: The W3C recommends that all websites be required to meet level AAA. | false | The W3C says AAA should not be required as a general policy for entire sites, because some content cannot meet it.
M3#design-u08-06-q4@3: A health charity targets AA but its users include many people with learning disabilities. What is a sensible approach? | Target AA and adopt relevant AAA criteria such as plain reading level | Require full AAA for the whole site immediately | Target level A only to save budget | Skip WCAG and rely on user feedback alone | Teams can adopt specific AAA criteria that help their users while targeting AA overall.
SA2#design-u08-06-q5@2,3: Explain the three WCAG conformance levels and recommend a target for a UK public sector service. | Level A is the minimum and removes the most severe barriers, level AA removes the most common and significant barriers, and level AAA is the highest standard. To claim a level, every criterion at that level and below must be met across full pages and complete processes. A UK public sector service should target WCAG 2.2 AA, which the government expects, and publish an accessibility statement. It can also adopt relevant AAA criteria where these help its users, while testing with disabled people. | Levels A, AA, AAA ; All criteria at and below ; AA target for public sector ; Selective AAA and testing

## Colour contrast
LV: Intermediate · Application
S: Text and interface elements must stand out clearly from their background. This lesson explains contrast ratios, the WCAG contrast criteria and why colour must never be the only way information is shown.
O: Explain what a contrast ratio measures
O: Apply the WCAG contrast thresholds for text and non-text elements
O: Evaluate designs that rely on colour alone
H: Contrast ratio
P: **Contrast ratio** compares the **relative luminance** of two colours, from **1:1** (no contrast, the same colour) to **21:1** (black on white). WCAG calculates it as (L1 + 0.05) divided by (L2 + 0.05), where L1 is the lighter colour's luminance. Good contrast helps people with **low vision**, older people whose contrast sensitivity declines, and anyone using a phone in **bright sunlight**. Contrast depends on **luminance**, not hue, so two colours that look very different, such as red and green, can still have poor contrast.
H: WCAG contrast thresholds
- **1.4.3 Contrast (Minimum), AA**: at least **4.5:1** for normal text and **3:1** for large text.
- **Large text** is at least **18 point** (about 24 CSS pixels), or **14 point bold** (about 18.66 pixels).
- **1.4.6 Contrast (Enhanced), AAA**: at least **7:1** for normal text and **4.5:1** for large text.
- **1.4.11 Non-text Contrast, AA**: at least **3:1** for interface components and meaningful graphics, such as input borders, icons and chart lines.
- Logos and purely decorative or disabled elements are exempt.
H: Do not rely on colour alone
- **1.4.1 Use of Color, A**: colour must not be the **only** way to convey information, indicate an action or distinguish an element.
- About **1 in 12 men** and **1 in 200 women** have a colour vision deficiency, most commonly red-green.
- Add **text labels**, **icons**, **patterns** or **underlines** alongside colour.
- Links in body text should be distinguishable by more than colour, usually an underline.
- Check designs with contrast checkers and colour-blindness simulators.
X: Fixing a form error state.
> A form shows errors only by turning the field border red, a 2.9:1 contrast against white.
> Users with red-green colour blindness cannot tell which field is wrong, and the border fails 1.4.11.
> The designer darkens the red to reach at least 3:1, thickens the border and adds an error icon.
> A text message, "Enter your postcode", now appears above the field.
K: Contrast ratio ranges from 1:1 to 21:1; WCAG AA requires 4.5:1 for normal text, 3:1 for large text and 3:1 for interface components and graphics, AAA requires 7:1 for normal text, and colour must never be the only way information is conveyed.
!: Judging contrast by eye or by hue. Use a contrast checker: colours with different hues can have very similar luminance.
EV: established | WCAG 2.2 success criterion 1.4.3 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
T: Contrast ratio | A measure of the difference in relative luminance between two colours, from 1:1 to 21:1
T: Large text | Text at least 18 point, or 14 point bold, for WCAG contrast purposes
T: Colour vision deficiency | Reduced ability to distinguish certain colours, often called colour blindness
SUM: 4.5:1 for normal text.
SUM: 3:1 for large text and components.
SUM: Never colour alone.
SRC: W3C, Understanding Success Criterion 1.4.3: Contrast (Minimum), W3C | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
SRC: W3C, Understanding Success Criterion 1.4.11: Non-text Contrast, W3C | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
SRC: Colour Blind Awareness, About colour blindness | data | 2024 | https://www.colourblindawareness.org/colour-blindness/
Q: What contrast ratio does WCAG AA require for normal body text? | At least 4.5:1.
Q: What is the highest possible contrast ratio? | 21:1, black on white.
NUM1#design-u08-07-q1@2: What is the minimum WCAG AA contrast ratio, written as the first number of the ratio, for large text? | 3 | 0 | – | WCAG 1.4.3 requires at least 3:1 for large text, compared with 4.5:1 for normal text.
M1#design-u08-07-q2@1: What does a contrast ratio compare? | The relative luminance of two colours | The hue of two colours | The saturation of the text only | The size of the text and its weight | Contrast ratio depends on luminance, so different hues can still have poor contrast.
M2#design-u08-07-q3@2: Grey body text on white has a contrast ratio of 3.8:1. Does it meet WCAG AA? | No, normal text needs 4.5:1 | Yes, 3:1 is enough for all text | Yes, because grey is a neutral colour | No, it needs at least 7:1 | Normal-size text needs 4.5:1 at AA; 3:1 applies only to large text.
M3#design-u08-07-q4@3: A chart shows profit in green and loss in red with no labels. What is the best fix? | Add labels or patterns so colour is not the only cue | Make the green and red brighter | Swap the red and green around | Add a note that colour-blind users may struggle | WCAG 1.4.1 requires information not to be conveyed by colour alone.
SA2#design-u08-07-q5@2,3: Explain the WCAG requirements for colour and contrast and how a designer should check a design. | WCAG AA requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text, and 3:1 for interface components and meaningful graphics such as input borders and icons. AAA raises normal text to 7:1. Colour must never be the only way information is conveyed, because many people have colour vision deficiencies, so labels, icons or patterns should be added. Designers should measure contrast with a checker rather than by eye and preview designs with colour-blindness simulators. | Text thresholds ; Non-text contrast ; Not colour alone ; Measure with tools

## Keyboard access and focus
LV: Intermediate · Application
S: Many people navigate without a mouse, using a keyboard, switch or voice. This lesson explains the WCAG keyboard and focus requirements, logical focus order, skip links and visible focus indicators.
O: Explain why keyboard access matters and who relies on it
O: Describe the main WCAG keyboard and focus criteria
O: Evaluate an interface for keyboard and focus problems
H: Who uses a keyboard
P: **Keyboard access** means every function can be reached and operated without a pointing device. Blind screen reader users, people with tremors or limited dexterity, people using **switch devices** or **voice control**, and many power users all rely on keyboard-style navigation. The **Tab** key moves forward through interactive elements, **Shift and Tab** moves back, **Enter** activates links and buttons, **Space** toggles checkboxes and buttons, and **arrow keys** move within groups such as radio buttons and menus. The element that currently receives keyboard input has **focus**, and users need to see where it is.
H: WCAG keyboard and focus criteria
- **2.1.1 Keyboard, A**: all functionality is operable through a keyboard.
- **2.1.2 No Keyboard Trap, A**: focus can always be moved away from a component.
- **2.4.1 Bypass Blocks, A**: a way to skip repeated content, such as a **skip link** to the main content.
- **2.4.3 Focus Order, A**: focus moves in an order that preserves meaning, usually matching the visual reading order.
- **2.4.7 Focus Visible, AA**: a visible focus indicator; WCAG 2.2 adds **2.4.11 Focus Not Obscured (Minimum), AA**, so sticky headers or cookie banners must not hide the focused item.
- **2.5.8 Target Size (Minimum), AA** in WCAG 2.2 requires pointer targets of at least **24 by 24 CSS pixels**, or enough spacing.
H: Designing good focus
- Never remove the browser's focus outline without providing a **clear replacement**.
- A strong indicator has good contrast, for example a thick outline that contrasts at least **3:1** with its surroundings.
- Use **native elements** such as buttons and links, which are keyboard accessible by default.
- When a dialog opens, move focus into it, keep it there until closed, then return focus to the trigger.
- Test by putting the mouse away and completing key tasks using only the keyboard.
X: A keyboard trap in a video player.
> A tester tabs into an embedded video player on a news page.
> The player captures every key press, and pressing Tab no longer leaves it.
> The rest of the page is now unreachable without a mouse, failing 2.1.2 No Keyboard Trap.
> The developers fix the player so Tab and Shift and Tab move focus out, and document the Escape key.
K: All functionality must be operable by keyboard, without traps, in a logical order, with a skip link and a clearly visible, unobscured focus indicator; native elements, good focus management in dialogs and keyboard-only testing make this achievable.
!: Removing focus outlines because they look untidy. Without a visible focus indicator keyboard users cannot tell where they are; restyle it instead of removing it.
EV: established | WCAG 2.2 success criterion 2.1.1 requires all functionality to be operable through a keyboard interface.
T: Focus | The state of the element that currently receives keyboard input
T: Keyboard trap | A component that focus can enter but not leave using the keyboard
T: Skip link | A link at the start of a page that lets users jump past repeated content to the main content
SUM: Everything works by keyboard.
SUM: Logical order, no traps.
SUM: Focus always visible.
SRC: W3C, Understanding Success Criterion 2.1.1: Keyboard, W3C | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html
SRC: W3C, Understanding Success Criterion 2.4.7: Focus Visible, W3C | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
SRC: W3C, ARIA Authoring Practices Guide: Developing a Keyboard Interface, W3C | guidance | 2024 | https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/
Q: Which key moves focus backwards through interactive elements? | Shift and Tab together.
Q: What does a skip link do? | Lets users jump past repeated content, such as navigation, to the main content.
M1#design-u08-08-q1@1: Which WCAG criterion requires that focus can always be moved away from a component? | 2.1.2 No Keyboard Trap | 2.4.7 Focus Visible | 1.4.3 Contrast (Minimum) | 2.4.1 Bypass Blocks | No Keyboard Trap, at level A, ensures users are never stuck inside a component.
SEQ2#design-u08-08-q2@1: Put the steps of good focus management for a modal dialog in order. | User activates the trigger button ; Focus moves into the dialog ; Focus stays within the dialog while open ; Focus returns to the trigger on close | Managing focus this way keeps keyboard and screen reader users oriented.
M2#design-u08-08-q3@2: A sticky cookie banner covers the focused link at the bottom of the screen. Which WCAG 2.2 criterion does this fail? | 2.4.11 Focus Not Obscured (Minimum) | 2.1.1 Keyboard | 3.3.1 Error Identification | 1.1.1 Non-text Content | WCAG 2.2 added 2.4.11 so focused items are not hidden by author-created content.
M3#design-u08-08-q4@3: A designer's mock-up shows custom clickable divs for menu items. What is the most robust recommendation? | Use native buttons or links instead | Add hover effects so they look clickable | Make the divs larger for mouse users | Add a tooltip explaining how to click | Native elements are focusable and keyboard operable by default, unlike plain divs.
SA2#design-u08-08-q5@2,3: Explain how to make an interface usable by keyboard alone. | Every function must be reachable and operable with the keyboard, using Tab, Shift and Tab, Enter, Space and arrow keys, and focus must never become trapped. Focus should move in a logical order that matches the visual layout, and a skip link should let users bypass repeated navigation. A clear, high-contrast focus indicator must always be visible and not hidden by sticky content. Using native elements and managing focus in dialogs helps, and teams should test key tasks with the mouse put away. | Operable by keyboard ; No traps and logical order ; Visible focus ; Native elements and testing

## Text alternatives
LV: Intermediate · Application
S: People who cannot see images or hear audio need equivalent alternatives. This lesson explains alt text for different image types, captions, transcripts and audio description.
O: Explain the purpose of text alternatives
O: Write appropriate alt text for informative, functional and decorative images
O: Choose suitable alternatives for audio and video content
H: Why text alternatives matter
P: **WCAG 1.1.1 Non-text Content (A)** requires a **text alternative** for all non-text content that serves the same purpose. Text can be read aloud by a **screen reader**, enlarged, shown on a **braille display** or translated. **Alt text** is the short text alternative for an image. Good alt text describes the **purpose** of the image in its context, not every visual detail. The W3C's **alt decision tree** helps designers decide what each image needs. Content designers, not only developers, should write alt text, because it depends on why the image is there.
H: Types of image
- **Informative** images: describe the information conveyed, briefly, such as "Map showing the station 200 metres north of the hospital".
- **Functional** images, such as icons in buttons: describe the action, such as "Search", not "magnifying glass".
- **Decorative** images: use empty alt text (alt="") so screen readers skip them.
- **Complex** images such as charts and diagrams: a short alt plus a longer description or data table nearby.
- **Images of text**: avoid them (1.4.5 Images of Text, AA); use real text so it can be resized and read.
- Do not start with "image of", because screen readers already announce it as an image.
H: Audio and video
- **Captions** for prerecorded video (1.2.2, A) and live video (1.2.4, AA) show speech and important sounds.
- **Transcripts** give a text version of audio-only content such as podcasts (1.2.1, A).
- **Audio description** (1.2.5, AA) narrates important visual information that is not in the soundtrack.
- **Sign language** interpretation of prerecorded video is a level AAA criterion (1.2.6).
- Auto-generated captions must be checked and corrected for accuracy.
X: Writing alt text for one photo in two contexts.
> A photo shows a nurse helping an older man use a tablet.
> On a news article about digital inclusion, the alt text is "A nurse shows an older patient how to book appointments on a tablet".
> On a careers page about nursing, the same photo gets "A nurse supporting a patient on the ward".
> If the photo were only decoration beside a heading that already says this, it would get empty alt text.
K: Every non-text element needs a text alternative that serves the same purpose: informative images describe their information, functional images describe their action, decorative images get empty alt text, complex images need longer descriptions, and video needs captions, transcripts and audio description.
!: Describing every detail of an image or using the file name. Alt text should convey the purpose of the image in context, briefly.
EV: established | WCAG 2.2 success criterion 1.1.1 requires a text alternative that serves the equivalent purpose for all non-text content presented to the user.
T: Alt text | A short text alternative describing the purpose of an image
T: Decorative image | An image that adds no information and should be ignored by assistive technology
T: Audio description | Narration of important visual information in a video
SUM: Describe purpose, not pixels.
SUM: Empty alt for decoration.
SUM: Captions, transcripts, audio description.
SRC: W3C Web Accessibility Initiative, Images Tutorial and An alt Decision Tree, W3C | guidance | 2022 | https://www.w3.org/WAI/tutorials/images/decision-tree/
SRC: W3C, Understanding Success Criterion 1.1.1: Non-text Content, W3C | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html
Q: What alt text should a purely decorative image have? | Empty alt text, so screen readers skip it.
Q: What does audio description provide? | Narration of important visual information not available in the soundtrack.
M1#design-u08-09-q1@1: Which WCAG success criterion requires text alternatives for non-text content? | 1.1.1 Non-text Content | 1.4.3 Contrast (Minimum) | 2.1.1 Keyboard | 3.3.2 Labels or Instructions | 1.1.1 is a level A criterion under the Perceivable principle.
MATCH2#design-u08-09-q2@2: Match each image to the best text alternative. | Magnifier icon in a search button = Search ; Decorative swirl = Empty alt text ; Sales bar chart = Short alt plus data table ; Logo linking home = Company name home page | Alt text depends on whether the image is informative, functional, decorative or complex.
M2#design-u08-09-q3@2: What is the best alt text for a printer icon button that prints the page? | Print this page | Image of a printer | Printer icon in grey | printer-icon-final.png | Functional images should describe the action, not the picture or file name.
M3#design-u08-09-q4@3: A university posts lecture videos with uncorrected auto-captions full of errors. What should it do? | Review and correct the captions for accuracy | Remove the captions entirely | Add a disclaimer about the errors | Offer audio description instead of captions | Inaccurate captions fail deaf and hard of hearing users; captions must be accurate to serve their purpose.
SA2#design-u08-09-q5@2,3: Explain how a designer should decide on text alternatives for images and video. | The designer should first ask what purpose each image serves in context. Informative images need a brief description of their information, functional images need text describing the action, decorative images need empty alt text, and complex images such as charts need a short alt plus a longer description or data table. Video needs accurate captions and audio description of key visual information, and audio needs a transcript. The W3C alt decision tree is a helpful guide. | Purpose in context ; Image types ; Captions and audio description ; Transcripts and decision tree

## Accessible forms
LV: Intermediate · Application
S: Forms are where many users give up, and disabled users face extra barriers. This lesson explains labels, instructions, grouping, error handling and WCAG form criteria, drawing on the GOV.UK Design System.
O: Describe the WCAG criteria that apply to forms
O: Design clear labels, hints and grouping
O: Evaluate error handling in a form
H: Labels and instructions
P: Every form field needs a **visible label** that is programmatically linked to it, so screen readers announce it and clicking the label focuses the field (**1.3.1 Info and Relationships** and **3.3.2 Labels or Instructions, A**). **Placeholder text** inside a field is not a label: it disappears when users type, often has low contrast and can be mistaken for a filled-in value. **Hint text** below the label explains formats, such as "For example, 27 3 2007". Related controls, such as a set of radio buttons, should be grouped with a **fieldset** and **legend** so the question is announced with each option. **1.3.5 Identify Input Purpose (AA)** supports browser autofill for common fields such as name and email.
H: Errors and prevention
- **3.3.1 Error Identification, A**: errors are identified and described in text.
- **3.3.3 Error Suggestion, AA**: suggest how to fix the error where possible, such as "Enter a date in the past".
- **3.3.4 Error Prevention (Legal, Financial, Data), AA**: allow users to review, confirm or undo important submissions.
- **3.3.7 Redundant Entry, A** (new in WCAG 2.2): do not make users re-enter information already given in the same process.
- The GOV.UK Design System puts an **error summary** at the top of the page linking to each field, plus an **error message** next to the field.
H: Good form design
- Ask only for what you need, and explain why you need sensitive information.
- Use **one question per page** for complex services, as GOV.UK recommends.
- Place labels **above** fields and use a single column.
- Mark **optional** fields rather than relying on asterisks for required ones.
- Do not set short **time limits**; if needed, warn users and let them extend (2.2.1 Timing Adjustable, A).
X: Improving a date of birth field.
> A form uses a single field with grey placeholder text "DD/MM/YYYY" and shows only a red border on errors.
> The redesign adds a visible label, "What is your date of birth?", in a fieldset with a legend.
> It uses three labelled fields for day, month and year with hint text "For example, 27 3 2007".
> Errors appear in an error summary and next to the field: "Date of birth must include a year".
K: Accessible forms use visible, programmatically linked labels, hint text, grouping with fieldsets, autofill support and clear text error messages with suggestions and summaries, while avoiding placeholder-only labels, redundant entry and tight time limits.
!: Using placeholder text instead of a label. Placeholders vanish on input and are often low contrast; always provide a visible label.
EV: established | The GOV.UK Design System recommends an error summary at the top of the page and an error message beside each invalid field.
T: Label | Visible text that names a form field and is linked to it in code
T: Fieldset and legend | Elements that group related controls and give the group a name
T: Error summary | A list at the top of a page linking to each error in a form
SUM: Every field has a visible label.
SUM: Errors in text, with suggestions.
SUM: Do not ask twice.
SRC: Government Digital Service, GOV.UK Design System: Error message and Error summary components, gov.uk | guidance | 2024 | https://design-system.service.gov.uk/components/error-message/
SRC: W3C Web Accessibility Initiative, Forms Tutorial, W3C | guidance | 2022 | https://www.w3.org/WAI/tutorials/forms/
SRC: Jarrett C. and Gaffney G., Forms that Work: Designing Web Forms for Usability, Morgan Kaufmann | secondary | 2009
Q: Why is placeholder text not a substitute for a label? | It disappears when users type, is often low contrast and can look like a filled-in value.
Q: What does WCAG 3.3.7 Redundant Entry require? | Information already entered in a process is not requested again unless necessary.
M1#design-u08-10-q1@1: Which WCAG 2.2 criterion stops forms asking for the same information twice in one process? | 3.3.7 Redundant Entry | 3.3.1 Error Identification | 1.3.5 Identify Input Purpose | 2.4.7 Focus Visible | Redundant Entry was added in WCAG 2.2 at level A.
M2#design-u08-10-q2@2: How should a set of radio buttons answering one question be marked up? | In a fieldset with a legend for the question | As separate fields with placeholder text | Inside a table with column headers | With the question in a tooltip | A fieldset and legend group the options so the question is announced with each one.
TF2#design-u08-10-q3@3: Showing an error only by turning a field border red meets WCAG error requirements. | false | Errors must be identified and described in text, and colour alone fails 1.4.1 Use of Color.
M3#design-u08-10-q4@3: A bank's transfer form submits immediately with no review step. Which criterion is at risk? | 3.3.4 Error Prevention (Legal, Financial, Data) | 2.5.8 Target Size (Minimum) | 1.2.2 Captions (Prerecorded) | 2.4.1 Bypass Blocks | Financial transactions should be reversible, checked or confirmed before final submission.
SA2#design-u08-10-q5@2,3: Describe how to design an accessible form, including error handling. | Each field should have a visible label linked to it, with hint text for formats, and related options grouped in a fieldset with a legend. Placeholders should not replace labels, and common fields should support autofill. Errors should be shown in text in an error summary at the top and next to each field, with suggestions on how to fix them, never by colour alone. Important submissions should allow review and confirmation, users should not have to re-enter information, and time limits should be avoided or extendable. | Labels, hints and grouping ; Text error messages ; Error summary and suggestions ; Prevention, redundant entry, timing

## Assistive technologies
LV: Intermediate · Foundation
S: Assistive technologies help disabled people use computers, phones and the web. This lesson describes screen readers, magnifiers, voice control, switches and braille displays, and how designs communicate with them.
O: Describe the main types of assistive technology
O: Explain how screen readers use the accessibility tree
O: Apply semantic structure so designs work with assistive technology
H: Types of assistive technology
P: **Assistive technologies** (**AT**) are tools that increase, maintain or improve the capabilities of disabled people. A **screen reader** converts on-screen content into speech or braille; common examples are **JAWS** and the free **NVDA** on Windows, **VoiceOver** on Apple devices and **TalkBack** on Android. **Screen magnifiers** such as ZoomText enlarge part of the screen. **Voice control**, such as Dragon or Apple Voice Control, lets people operate devices by speaking. **Switch access** lets people with very limited movement operate a device with one or two switches. **Refreshable braille displays** show text as raised pins.
H: How assistive technology reads a page
- Browsers build an **accessibility tree** from the code, exposing each element's **name**, **role** and **state**.
- **4.1.2 Name, Role, Value (A)** requires custom components to expose this information.
- Screen reader users often navigate by **headings**, **landmarks**, links and form controls rather than reading top to bottom.
- WebAIM's surveys of screen reader users consistently find that most navigate long pages by headings.
- The first rule of **ARIA** (Accessible Rich Internet Applications) is to use a native HTML element where one exists rather than adding ARIA.
H: Designing for assistive technology
- Use a clear **heading hierarchy** and meaningful **landmarks** such as header, navigation and main.
- Make **link text** meaningful out of context: "Download the annual report", not "click here".
- Ensure the visible label matches the accessible name, so voice users can say what they see (**2.5.3 Label in Name, A**).
- Support **zoom** to 200% and **reflow** at 320 CSS pixels wide without horizontal scrolling (1.4.4 and 1.4.10).
- Annotate designs with headings, reading order and accessible names for developers.
X: A voice control user and an icon button.
> A user with a repetitive strain injury uses voice control.
> A button shows the visible word "Send" but its accessible name in code is "submit-form-btn".
> Saying "click Send" fails, because the speech software cannot match the visible label.
> Changing the accessible name to start with "Send" fixes it, meeting 2.5.3 Label in Name.
K: Assistive technologies such as screen readers, magnifiers, voice control, switches and braille displays rely on the accessibility tree, which exposes each element's name, role and state; clear headings, landmarks, meaningful link text, matching labels and native elements make designs work with them.
!: Assuming screen reader users read every word in order. Most skim by headings, landmarks and links, so structure matters as much as text.
EV: established | WebAIM's screen reader user surveys repeatedly report that navigating by headings is the most common way users find information on a long page.
T: Screen reader | Software that converts on-screen content into speech or braille
T: Accessibility tree | The structure browsers expose to assistive technology, with each element's name, role and state
T: ARIA | Accessible Rich Internet Applications, attributes that add accessibility information to custom components
SUM: Many kinds of assistive technology.
SUM: Name, role and state.
SUM: Structure helps navigation.
SRC: WebAIM, Screen Reader User Survey number 10 results | data | 2024 | https://webaim.org/projects/screenreadersurvey10/
SRC: W3C, Using ARIA, W3C Note | guidance | 2021 | https://www.w3.org/TR/using-aria/
SRC: W3C Web Accessibility Initiative, How People with Disabilities Use the Web, W3C | guidance | 2024 | https://www.w3.org/WAI/people-use-web/
Q: Name a free screen reader for Windows. | NVDA.
Q: What three pieces of information does the accessibility tree expose for each element? | Its name, role and state or value.
M1#design-u08-11-q1@1: Which assistive technology lets someone operate a device using one or two buttons? | Switch access | Screen magnifier | Refreshable braille display | Screen reader | Switch access lets people with very limited movement control a device by scanning through options.
MATCH1#design-u08-11-q2@1: Match each assistive technology to its platform or function. | VoiceOver = Apple screen reader ; TalkBack = Android screen reader ; ZoomText = Screen magnifier ; Dragon = Voice control | Knowing common tools helps designers plan realistic testing.
M2#design-u08-11-q3@2: Which link text works best for a screen reader user browsing a list of links? | Download the 2025 annual report | Click here | Read more | Link | Link text should make sense out of context, because users often browse links alone.
M3#design-u08-11-q4@3: A developer adds ARIA roles to every div in a page built from divs. What is the better approach? | Use native HTML elements, which carry roles already | Add even more ARIA to cover all states | Hide the divs from assistive technology | Add a separate text-only page | The first rule of ARIA is to use a native element where one exists.
SA2#design-u08-11-q5@2,3: Explain how screen readers interpret a page and what designers can do to support them. | Browsers build an accessibility tree from the code, giving each element a name, role and state, which screen readers use to announce content. Screen reader users often move by headings, landmarks, links and form controls rather than reading everything in order. Designers can support them with a clear heading hierarchy, landmarks, meaningful link text and accessible names that match visible labels. Using native elements rather than custom ARIA widgets and annotating designs for developers makes this reliable. | Accessibility tree ; Navigation by structure ; Headings and link text ; Native elements and annotation

## Testing for accessibility
LV: Intermediate · Evaluation
S: Accessibility must be checked throughout design and development. This lesson compares automated tools, manual checks, assistive technology testing and research with disabled people, and explains how to plan an accessibility audit.
O: Describe the main methods of accessibility testing
O: Explain the limits of automated testing
O: Evaluate an accessibility testing plan
H: Methods of testing
P: No single method finds every accessibility problem, so teams combine several. **Automated tools** such as axe, WAVE and Lighthouse quickly scan pages for detectable failures such as missing alt attributes or low contrast. **Manual checks** by trained people cover what tools cannot judge, such as whether alt text is meaningful or focus order is logical. **Assistive technology testing** uses screen readers, magnification and voice control. **Usability testing with disabled people** reveals whether the product actually works for them. A formal **accessibility audit** tests a sample of pages against every WCAG criterion at the target level.
H: Limits of automated testing
- In 2017 the Government Digital Service built a page with **142 deliberate barriers**; the best-performing automated tool found only about **40%** of them.
- Tools can detect that alt text is missing, but not whether it is **accurate**.
- Tools cannot judge **reading order**, **meaningful labels** or **plain language** well.
- The WebAIM Million reports find detectable WCAG failures on more than **90%** of the top million home pages, with **low-contrast text** the most common.
- A clean automated report is a starting point, not proof of accessibility.
H: Quick manual checks
- **Keyboard**: complete key tasks with Tab, Enter, Space and arrows, watching focus.
- **Zoom**: magnify to 200% and 400% and check content reflows without loss.
- **Screen reader**: listen to headings, links, labels and error messages.
- **Contrast and colour**: check text and components, and view in greyscale.
- **Content**: check headings, link text, captions and plain language.
H: Planning testing
- Test **early and often**, starting with designs and prototypes.
- Recruit disabled participants through specialist agencies and pay them fairly.
- Record issues with the WCAG criterion, severity and fix.
- Publish an **accessibility statement** listing known issues and how to get help.
X: Planning tests for a council parking app.
> The team runs axe in its build pipeline to catch detectable issues on every change.
> Designers check contrast and focus states in each design review.
> Before launch, an auditor tests a sample of screens against WCAG 2.2 AA, and the team tests with five disabled participants, including screen reader and voice control users.
> Findings are prioritised and the accessibility statement lists remaining issues and a contact route.
K: Accessibility testing combines automated tools, manual expert checks, assistive technology testing, audits and usability testing with disabled people; automated tools find only a minority of barriers, so they must be supplemented, and testing should start early and continue throughout.
!: Treating a passing automated scan as proof of accessibility. Tools miss most barriers that require human judgement, such as meaningful alt text and logical order.
EV: established | A 2017 Government Digital Service experiment found that automated tools detected well under half of 142 known accessibility barriers.
T: Automated testing | Using software to scan content for detectable accessibility failures
T: Accessibility audit | A systematic test of a sample of pages against every WCAG criterion at a target level
T: Reflow | Content adapting to a narrow viewport or high zoom without horizontal scrolling
SUM: Combine several methods.
SUM: Tools find only some issues.
SUM: Test with disabled people.
SRC: Government Digital Service, What we found when we tested tools on the world's least-accessible webpage, Accessibility in government blog | primary | 2017 | https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/
SRC: WebAIM, The WebAIM Million: an annual accessibility analysis of the top 1,000,000 home pages | data | 2024 | https://webaim.org/projects/million/
SRC: W3C Web Accessibility Initiative, Evaluating Web Accessibility Overview, W3C | guidance | 2024 | https://www.w3.org/WAI/test-evaluate/
Q: Name two automated accessibility testing tools. | Any two of axe, WAVE and Lighthouse.
Q: What is the most common failure found by the WebAIM Million reports? | Low-contrast text.
M1#design-u08-12-q1@1: What did the 2017 GDS experiment with 142 barriers show? | Automated tools found well under half of them | Automated tools found every barrier | Manual testing found fewer than tools | Screen readers could not be used for testing | The best tool found about 40%, showing the need for manual testing.
M2#design-u08-12-q2@2: Which problem can an automated tool reliably detect? | An image with no alt attribute at all | Alt text that is inaccurate | A confusing reading order | Unclear plain language | Tools detect missing attributes but cannot judge meaning or quality.
NUM2#design-u08-12-q3@2: In the 2017 GDS experiment the best tool found about 40% of 142 barriers. To the nearest whole number, how many barriers is that? | 57 | 1 | barriers | 40% of 142 is 56.8, which rounds to about 57 barriers found.
M3#design-u08-12-q4@3: A team's plan is to run Lighthouse once before launch. What is the most important improvement? | Add manual, assistive technology and user testing throughout | Run Lighthouse twice instead of once | Switch to a different automated tool | Ask developers to sign off the results | Automated scans miss most barriers, so testing must combine methods and start early.
SA2#design-u08-12-q5@2,3: Evaluate the role of automated tools in accessibility testing and describe a balanced plan. | Automated tools such as axe and WAVE are fast and useful for catching detectable issues like missing alt attributes and low contrast, and can run on every change. However, they find only a minority of barriers, as the GDS experiment showed, and cannot judge meaning, order or clarity. A balanced plan adds manual keyboard, zoom and screen reader checks, a WCAG audit against the target level and usability testing with disabled participants. Testing should start with designs and continue after launch, with issues recorded in an accessibility statement. | Strengths of tools ; Limits shown by evidence ; Manual, audit and user testing ; Early and continuous

## Cognitive accessibility
LV: Advanced · Evaluation
S: Cognitive and learning disabilities affect memory, attention, reading and problem solving. This lesson explains who is affected, the W3C's guidance on cognitive accessibility and design patterns that reduce cognitive load.
O: Describe the range of cognitive and learning disabilities
O: Explain key design objectives for cognitive accessibility
O: Evaluate a service for cognitive barriers
H: Who is affected
P: **Cognitive accessibility** concerns people with differences in **memory**, **attention**, **language**, **reading**, **numeracy** and **problem solving**. This includes people with **learning disabilities**, **dyslexia**, **ADHD**, **autism**, **dementia**, **acquired brain injury** and some mental health conditions, as well as anyone who is tired, stressed or using a second language. Mencap estimates about **1.5 million** people in the UK have a learning disability, and the British Dyslexia Association estimates about **10%** of the population is dyslexic. WCAG covers only some cognitive needs, so the W3C published **Making Content Usable for People with Cognitive and Learning Disabilities** (2021) as supplementary guidance.
H: Design objectives
- Help users **understand** what things are and how to use them, with familiar patterns and clear labels.
- Help users **find** what they need, with consistent navigation (**3.2.3 Consistent Navigation, AA**) and help in a consistent place (**3.2.6 Consistent Help, A**).
- Use **clear content**: plain language, short sentences, one idea per paragraph and helpful images.
- Help users **avoid mistakes** and recover from them.
- Help users **focus**, avoiding distractions such as autoplaying media and pop-ups.
- **Do not rely on memory**: avoid tasks that require recalling information or solving puzzles.
H: Relevant WCAG 2.2 criteria
- **3.3.8 Accessible Authentication (Minimum), AA**: no cognitive function test, such as remembering a password or solving a puzzle, unless there is an alternative or help such as allowing paste and password managers.
- **3.3.7 Redundant Entry, A**: do not ask for the same information twice.
- **2.2.1 Timing Adjustable, A**: let users turn off, adjust or extend time limits.
- **2.2.2 Pause, Stop, Hide, A**: let users stop moving, blinking or auto-updating content.
- **3.1.5 Reading Level, AAA**: provide simpler content when text needs more than lower secondary reading ability.
X: Simplifying a benefits renewal.
> A renewal letter uses dense paragraphs and asks users to log in with a code sent weeks earlier.
> Users with memory difficulties lose the code, and many call the helpline.
> The redesign uses plain language, numbered steps, a consistent help link and a one-time login link sent by email or text.
> The service also saves progress so users can stop and return later.
K: Cognitive accessibility supports people with differences in memory, attention, language and problem solving; designers should use familiar patterns, plain language, consistent navigation and help, error prevention, few distractions, adjustable timing and authentication that does not rely on memory.
!: Assuming WCAG AA conformance covers cognitive needs fully. Many cognitive needs are addressed only in AAA criteria or in the W3C's supplementary COGA guidance.
EV: established | The W3C published Making Content Usable for People with Cognitive and Learning Disabilities as a Working Group Note in 2021 to supplement WCAG.
EV: contested | Experts disagree on how far cognitive accessibility can be captured in objectively testable success criteria.
T: Cognitive accessibility | Designing so people with differences in memory, attention, language and problem solving can use content
T: Cognitive load | The mental effort needed to use a product or understand content
T: Cognitive function test | A task requiring users to remember, transcribe or solve something, such as a password or puzzle
SUM: Cognitive needs are common.
SUM: Plain, consistent, forgiving.
SUM: Do not rely on memory.
SRC: W3C, Making Content Usable for People with Cognitive and Learning Disabilities, W3C Working Group Note | guidance | 2021 | https://www.w3.org/TR/coga-usable/
SRC: W3C, Understanding Success Criterion 3.3.8: Accessible Authentication (Minimum), W3C | guidance | 2023 | https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html
SRC: Home Office Digital, Dos and don'ts on designing for accessibility, Accessibility in government blog | guidance | 2016 | https://accessibility.blog.gov.uk/2016/09/02/dos-and-donts-on-designing-for-accessibility/
Q: What does WCAG 3.3.8 Accessible Authentication (Minimum) aim to prevent? | Login steps that depend on a cognitive function test, such as remembering a password or solving a puzzle, without an alternative.
Q: What is the W3C's supplementary guidance on cognitive accessibility called? | Making Content Usable for People with Cognitive and Learning Disabilities.
M1#design-u08-13-q1@1: Roughly what share of the UK population does the British Dyslexia Association estimate is dyslexic? | About 10% | About 1% | About 30% | About 50% | The British Dyslexia Association estimates around one in ten people are dyslexic.
M2#design-u08-13-q2@2: A login page blocks pasting into the password field. Which WCAG 2.2 criterion is at risk? | 3.3.8 Accessible Authentication (Minimum) | 1.4.3 Contrast (Minimum) | 2.4.1 Bypass Blocks | 1.2.2 Captions (Prerecorded) | Blocking paste stops password managers and forces users to remember or transcribe passwords.
TF2#design-u08-13-q3@1: Moving the help link to a different place on each page can create a cognitive barrier. | true | WCAG 2.2 criterion 3.2.6 Consistent Help asks for help to appear in the same relative place.
M3#design-u08-13-q4@3: A booking form times out after three minutes with no warning. What is the best fix for cognitive accessibility? | Warn users and let them extend or turn off the limit | Shorten the time limit to keep users focused | Add a countdown in small text at the bottom | Ask users to restart if they time out | WCAG 2.2.1 Timing Adjustable requires time limits to be adjustable or extendable.
SA2#design-u08-13-q5@2,3: Evaluate how a public service could reduce barriers for people with cognitive and learning disabilities. | The service should use plain language, short sentences and familiar patterns so users understand what to do, with navigation and help in consistent places. It should prevent errors, explain how to fix them and save progress, avoid distractions such as autoplay, and make time limits adjustable. Authentication should not rely on memory, for example by allowing paste or offering one-time links. Because WCAG AA covers only some cognitive needs, the team should follow the W3C's supplementary guidance and test with people with cognitive disabilities. | Plain and consistent ; Errors and timing ; Memory-free authentication ; Beyond AA and testing

## Accessibility and UK law
LV: Advanced · Evaluation
S: Accessibility in the UK is shaped by equality law and specific regulations for public sector websites. This lesson explains the Equality Act 2010, the public sector accessibility regulations, accessibility statements and how UK designers are affected by the European Accessibility Act.
O: Explain the Equality Act 2010 duty to make reasonable adjustments
O: Describe the public sector accessibility regulations and their requirements
O: Evaluate an organisation's legal and ethical position on accessibility
H: The Equality Act 2010
P: The **Equality Act 2010** applies in England, Scotland and Wales and protects people from discrimination on the basis of **protected characteristics**, including **disability**. Service providers, employers and education providers have a **duty to make reasonable adjustments** so that disabled people are not put at a substantial disadvantage. For service providers this duty is **anticipatory**: organisations must think ahead about barriers rather than wait for a complaint. This applies to websites, apps and digital services as well as buildings. In Northern Ireland, disability discrimination is covered by the **Disability Discrimination Act 1995**. This lesson is for learning, not legal advice.
H: Public sector regulations
- The **Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018** require public sector websites and apps to meet accessibility standards.
- The regulations reference **WCAG 2.1 AA**; the UK government now monitors against **WCAG 2.2 AA**.
- Organisations must publish an **accessibility statement** describing compliance, known issues, alternatives and how to report problems.
- The **Government Digital Service** monitors compliance; enforcement is by the **Equality and Human Rights Commission** in Great Britain and the **Equality Commission for Northern Ireland**.
- Some content, such as older office documents and live video, has exemptions, but a **disproportionate burden** claim must be justified.
H: Beyond the UK and beyond the law
- The **European Accessibility Act** applies from **28 June 2025** to certain products and services, such as e-commerce, banking and e-books, sold in the EU, including by UK businesses.
- In the United States, the **Americans with Disabilities Act** has been the basis of many website accessibility lawsuits.
- Legal compliance is a **minimum**; good practice is to go beyond it and test with disabled people.
- Designers can raise accessibility early, document decisions and include acceptance criteria in tickets.
X: A council website complaint.
> A blind resident cannot complete a council's online parking permit form because a captcha has no alternative.
> The council's accessibility statement does not mention the problem or any alternative route.
> The resident complains; the council has failed to make an anticipatory reasonable adjustment and its statement is inaccurate.
> The council replaces the captcha, adds a phone route and updates its accessibility statement.
K: The Equality Act 2010 requires anticipatory reasonable adjustments, including for digital services; public sector bodies must meet WCAG-based accessibility regulations and publish accessibility statements, monitored by GDS and enforced by the equality commissions, and the European Accessibility Act affects UK businesses selling into the EU.
!: Believing private companies have no accessibility duties in the UK. The Equality Act 2010 applies to all service providers, including their websites and apps.
EV: established | The Equality Act 2010 places an anticipatory duty on service providers to make reasonable adjustments for disabled people.
EV: established | The public sector accessibility regulations of 2018 require public sector websites and mobile apps to meet accessibility standards and publish an accessibility statement.
T: Reasonable adjustment | A change an organisation must make so disabled people are not at a substantial disadvantage
T: Anticipatory duty | A duty to plan for disabled people's needs in advance, not only after a request
T: Disproportionate burden | An exemption claimed when meeting a requirement would be unreasonably costly, which must be assessed and justified
SUM: Equality Act: reasonable adjustments.
SUM: Public sector: WCAG AA and a statement.
SUM: Law is the minimum.
SRC: Equality Act 2010, c. 15, legislation.gov.uk | standard | 2010 | https://www.legislation.gov.uk/ukpga/2010/15/contents
SRC: The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018, SI 2018/952, legislation.gov.uk | standard | 2018 | https://www.legislation.gov.uk/uksi/2018/952/contents/made
SRC: Government Digital Service, Understanding accessibility requirements for public sector bodies, gov.uk | guidance | 2024 | https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps
Q: What duty does the Equality Act 2010 place on service providers regarding disabled people? | An anticipatory duty to make reasonable adjustments.
Q: What must public sector bodies publish about their websites and apps? | An accessibility statement.
M1#design-u08-14-q1@1: Which law requires UK service providers to make reasonable adjustments for disabled people? | The Equality Act 2010 | The Data Protection Act 2018 | The Consumer Rights Act 2015 | The Digital Economy Act 2017 | The Equality Act 2010 covers England, Scotland and Wales, including digital services.
M2#design-u08-14-q2@2: Who enforces the public sector accessibility regulations in Great Britain? | The Equality and Human Rights Commission | The Information Commissioner's Office | The Competition and Markets Authority | Ofcom | GDS monitors compliance, and the EHRC enforces in Great Britain.
TF2#design-u08-14-q3@3: The duty to make reasonable adjustments for service providers only applies after a disabled person complains. | false | For service providers the duty is anticipatory, so barriers should be addressed in advance.
M3#design-u08-14-q4@3: A UK online retailer sells to customers in France and Germany. Which law may require it to meet accessibility requirements there? | The European Accessibility Act | The Americans with Disabilities Act | The UK public sector regulations | The UN CRPD alone | The European Accessibility Act applies from June 2025 to certain products and services sold in the EU.
SA2#design-u08-14-q5@2,3: Explain the main UK legal requirements for digital accessibility and why designers should go beyond them. | The Equality Act 2010 requires service providers, including private companies, to make anticipatory reasonable adjustments so disabled people are not at a substantial disadvantage, which includes websites and apps. Public sector bodies must also meet the 2018 accessibility regulations, based on WCAG AA, and publish an accessibility statement, with GDS monitoring and the EHRC enforcing. UK firms selling into the EU may also be covered by the European Accessibility Act. Designers should go beyond legal minimums because conformance does not guarantee a good experience, so they should test with disabled people and build accessibility in from the start. | Equality Act duty ; Public sector regulations ; European Accessibility Act ; Beyond compliance
`;
