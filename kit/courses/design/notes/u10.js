// CreateGradify Service and Systems Design (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## What is service design?
LV: Introductory · Foundation
S: Service design is the design of whole services, from what customers see to the people, processes and systems behind them. This lesson explains what makes services different from products, the core principles of service design and the idea of frontstage and backstage.
O: Define service design and a service
O: Describe the distinctive characteristics of services
O: Explain the core principles of service design
H: What a service is
P: A **service** is something an organisation does for people, such as healthcare, banking, a train journey or applying for a passport, rather than a physical object they own. **Service design** is the activity of planning and organising the people, infrastructure, communication and processes of a service so it works well for its **users** and for the **organisation** providing it. Services have been described by four characteristics, often called **IHIP**: they are **intangible** (you cannot hold them), **heterogeneous** (each experience varies), **inseparable** (produced and consumed at the same time, often with the customer present) and **perishable** (an empty seat on a flight cannot be stored and sold later).
H: Frontstage and backstage
- **Frontstage** is what users see and interact with: staff, websites, letters, buildings.
- **Backstage** is what makes the service work but users do not see: IT systems, policies, training, supply chains.
- Many service failures start backstage, such as two systems that do not share data.
- Service designers design both, because a good interface cannot fix a broken process.
- The theatre metaphor comes from early service marketing research.
H: Principles of service design
- Stickdorn and Schneider (2010) set out five principles: **user-centred**, **co-creative**, **sequencing**, **evidencing** and **holistic**.
- **Sequencing** means seeing a service as a series of moments over time.
- **Evidencing** means making intangible service moments visible, such as a confirmation email.
- **Holistic** means considering the whole environment, all channels and all stakeholders.
- Later work, *This Is Service Design Doing* (2018), stresses that service design is **iterative**, **real** (tested in reality) and **collaborative**.
X: Designing a library service, not a library website.
> A council asks for a new library website because loans are falling.
> Research shows people struggle to join, because they must visit in person with proof of address.
> The service designer redesigns joining as an online sign-up with a digital card, changing policy, staff training and the IT system.
> New memberships rise, though the website itself changed only slightly.
K: Service design plans the people, processes, infrastructure and communication of a whole service; services are intangible, variable, produced and consumed together and perishable, and designers must work on both frontstage and backstage, following principles such as user-centred, co-creative, sequencing, evidencing and holistic.
!: Treating service design as designing a website or app. Digital touchpoints are part of a service, but the policies, staff and systems behind them often matter more.
EV: established | Services are widely characterised in the marketing literature as intangible, heterogeneous, inseparable and perishable.
EV: contested | Vargo and Lusch argued in 2004 that the goods versus services distinction is less useful than seeing all economic exchange as service.
T: Service design | Planning the people, processes, infrastructure and communication of a service for users and providers
T: Frontstage | The parts of a service that users see and interact with
T: Backstage | The processes and systems behind a service that users do not see
SUM: Services are intangible.
SUM: Design frontstage and backstage.
SUM: Holistic and co-creative.
SRC: Stickdorn M. and Schneider J. (eds), This is Service Design Thinking, BIS Publishers | secondary | 2010
SRC: Stickdorn M., Hormess M. E., Lawrence A. and Schneider J., This Is Service Design Doing, O'Reilly | secondary | 2018
SRC: Vargo S. L. and Lusch R. F., "Evolving to a new dominant logic for marketing", Journal of Marketing 68(1) | primary | 2004
Q: What do the letters IHIP stand for in describing services? | Intangible, heterogeneous, inseparable and perishable.
Q: What is the backstage of a service? | The processes and systems behind a service that users do not see.
M1#design-u10-01-q1@1: Which characteristic means an unsold cinema seat cannot be stored and sold tomorrow? | Perishability | Intangibility | Heterogeneity | Inseparability | Services are perishable: unused capacity is lost.
MATCH2#design-u10-01-q2@2: Match each service design principle to its meaning. | Sequencing = Service as moments over time ; Evidencing = Making intangible moments visible ; Holistic = Considering the whole context ; Co-creative = Involving stakeholders in design | These are Stickdorn and Schneider's principles from 2010.
M2#design-u10-01-q3@2: A bank's app is easy to use but transfers take days because two internal systems do not talk to each other. Where is the problem? | Backstage | Frontstage | In the line of sight | In the evidence | The failure lies in the hidden systems that support the visible service.
M3#design-u10-01-q4@3: A hospital asks a designer to improve its appointment letter, but patients miss appointments because the booking phone line is always busy. What should the designer do? | Look at the whole booking service, not just the letter | Redesign the letter with brighter colours | Add the hospital logo to the letter | Shorten the letter to one paragraph | Service design is holistic, so the designer should address the real cause across channels.
SA2#design-u10-01-q5@1,2: Explain what service design is and how it differs from designing a product. | Service design plans the people, processes, infrastructure and communication that together deliver a service, so it works for users and the organisation. Unlike products, services are intangible, vary between occasions, are produced and consumed at the same time and cannot be stored. Service designers therefore work on sequences of interactions over time across many touchpoints. They must design the backstage processes and systems as well as the frontstage experience users see. | Definition ; Service characteristics ; Journeys over time ; Frontstage and backstage

## Service blueprints
LV: Introductory · Application
S: A service blueprint maps how a service is delivered, linking what users do to what staff and systems do behind the scenes. This lesson explains the parts of a blueprint and how to build and use one.
O: Describe the purpose of a service blueprint
O: Identify the lanes and lines of a blueprint
O: Apply a blueprint to find failure points in a service
H: What a blueprint is
P: A **service blueprint** is a diagram that shows the steps of a service over time and the activities that support each step. It was introduced by **G. Lynn Shostack** in the *Harvard Business Review* in **1984**, and developed by **Bitner, Ostrom and Morgan** (2008) into the form most teams use. Where a **customer journey map** focuses on the user's experience, a blueprint extends below it to show the **frontstage** and **backstage** actions, systems and policies that make each moment happen. Blueprints help teams see dependencies, duplication, delays and **failure points**.
H: Parts of a blueprint
- **Physical evidence**: what users see or receive at each step, such as a website, receipt or sign.
- **Customer actions**: the steps the user takes.
- **Frontstage actions**: what staff or interfaces do in direct contact with the user.
- **Backstage actions**: staff activities the user does not see.
- **Support processes**: systems, policies and other teams that enable the service.
- These lanes are separated by the **line of interaction**, the **line of visibility** and the **line of internal interaction**.
H: Building and using a blueprint
- Choose a **scenario** and a **user** before mapping.
- Map customer actions first, then work down through the lanes.
- Gather evidence from **staff**, **observation** and data, not assumptions.
- Mark **failure points**, **wait times** and **handoffs** between teams.
- Use the blueprint to prioritise improvements and to align teams around a shared picture.
X: Blueprinting a click-and-collect order.
> Customer actions: order online, receive an email, visit the store, collect the parcel.
> Frontstage: a staff member checks the order number at the counter.
> Backstage: a picker finds the item and labels it; support process: the stock system and email service.
> The blueprint shows a failure point: the email says "ready" before the item is picked, so customers wait in store.
K: A service blueprint, introduced by Shostack in 1984, maps customer actions with the frontstage, backstage and support processes that deliver them, separated by lines of interaction, visibility and internal interaction, and helps teams find failure points, delays and handoffs.
!: Drawing a blueprint from what the process manual says. Blueprints should be based on research into how the service really runs, including workarounds.
EV: established | Service blueprinting was introduced by Shostack in 1984 and is widely used as a practical technique for service innovation.
T: Service blueprint | A diagram of a service's steps with the frontstage, backstage and support activities behind them
T: Line of visibility | The line on a blueprint separating what users see from what they do not
T: Failure point | A step in a service where things are likely to go wrong
SUM: Map beyond the journey.
SUM: Lines of interaction and visibility.
SUM: Find failure points.
SRC: Shostack G. L., "Designing services that deliver", Harvard Business Review 62(1) | primary | 1984
SRC: Bitner M. J., Ostrom A. L. and Morgan F. N., "Service blueprinting: a practical technique for service innovation", California Management Review 50(3) | primary | 2008
SRC: Gibbons S., Service Blueprints: Definition, Nielsen Norman Group | secondary | 2017 | https://www.nngroup.com/articles/service-blueprints-definition/
Q: Who introduced the service blueprint and when? | G. Lynn Shostack, in 1984.
Q: What does the line of visibility separate? | Actions users can see from backstage actions they cannot see.
M1#design-u10-02-q1@1: Which lane of a blueprint shows the receipt or confirmation email a customer receives? | Physical evidence | Support processes | Backstage actions | Line of internal interaction | Physical evidence is the tangible proof of the service at each step.
SEQ2#design-u10-02-q2@2: Put the lanes of a service blueprint in order from top to bottom. | Physical evidence ; Customer actions ; Frontstage actions ; Backstage actions ; Support processes | The lanes move from what users see down to the systems that support them.
M2#design-u10-02-q3@2: How does a service blueprint differ from a customer journey map? | It also shows backstage and support activities | It shows only the user's emotions | It ignores the order of steps | It is used only for physical products | Blueprints extend journey maps to show how the organisation delivers each step.
M3#design-u10-02-q4@3: A blueprint shows three teams each re-entering the same customer details. What does this suggest? | A backstage inefficiency and a likely failure point | A frontstage strength to keep | A sign the line of visibility is too low | That more physical evidence is needed | Repeated handoffs and re-entry waste time and create errors.
SA2#design-u10-02-q5@2,3: Explain how a service blueprint can be used to improve a service. | A service blueprint maps the steps users take alongside the frontstage, backstage and support activities that deliver them, divided by lines of interaction, visibility and internal interaction. Built from research with staff and users, it reveals failure points, delays, duplicated work and handoffs between teams. The team can then prioritise fixes, such as changing a policy or connecting systems, rather than only changing the interface. It also gives everyone a shared picture of how the service works. | Lanes and lines ; Based on research ; Reveals failures and handoffs ; Prioritises and aligns teams

## Touchpoints and channels
LV: Introductory · Application
S: Users experience a service through many touchpoints across several channels. This lesson explains touchpoints, channels, omnichannel design and how key moments shape what people remember.
O: Define touchpoints and channels
O: Compare multichannel and omnichannel services
O: Apply the idea of key moments to improve a journey
H: Touchpoints and channels
P: A **touchpoint** is any point at which a user interacts with a service, such as an advert, a website, a letter, a phone call, a receptionist or a waiting room. A **channel** is the medium through which touchpoints are delivered, such as **web**, **app**, **phone**, **post**, **email** or **in person**. Users rarely stay in one channel: they may research on a phone, call to ask a question and finish in a branch. Service designers map touchpoints across the whole **customer journey**, from first awareness to after the service ends, and look for **gaps** and **inconsistencies** between them.
H: Multichannel and omnichannel
- **Multichannel**: several channels exist but work separately, so users repeat themselves.
- **Omnichannel**: channels share information so users can move between them seamlessly.
- **Cross-channel consistency** means the same names, rules and information everywhere.
- **Digital by default**, as used by the UK government, still needs **assisted digital** support for people who cannot use online channels.
- Each channel should suit the task: complex or emotional tasks often need a person.
H: Key moments
- Jan Carlzon of Scandinavian Airlines called brief encounters with staff **moments of truth**.
- The **peak-end rule** (Kahneman and colleagues) suggests people judge experiences mostly by the most intense moment and the end.
- **Pain points** are touchpoints where users struggle or feel frustrated.
- Improving a few critical moments can change how a whole service is remembered.
- Do not neglect the **after-service** stage, such as follow-up, complaints and renewals.
X: Fixing a broken handover between channels.
> A customer starts a home insurance claim online and uploads photos.
> She then calls the helpline, but the agent cannot see the online claim and asks her to start again.
> The insurer connects the online and call centre systems so the agent sees the claim and photos.
> Satisfaction rises, and calls become shorter, because the channels now act as one service.
K: Touchpoints are the points where users meet a service and channels are the media that carry them; omnichannel services share information across channels, and focusing on key moments, pain points and the ending can transform how a service is experienced.
!: Designing each channel separately. Users move between channels, so information, language and status must carry across them.
EV: established | Redelmeier and Kahneman (1996) found that patients' memories of painful procedures were strongly influenced by the peak and the final moments.
T: Touchpoint | Any point at which a user interacts with a service
T: Channel | The medium through which touchpoints are delivered, such as phone or web
T: Omnichannel | Channels that share information so users can switch between them seamlessly
SUM: Many touchpoints, many channels.
SUM: Join channels up.
SUM: Peaks and endings matter.
SRC: Carlzon J., Moments of Truth, Ballinger | secondary | 1987
SRC: Redelmeier D. A. and Kahneman D., "Patients' memories of painful medical treatments: real-time and retrospective evaluations of two minimally invasive procedures", Pain 66(1) | primary | 1996
SRC: Stickdorn M., Hormess M. E., Lawrence A. and Schneider J., This Is Service Design Doing, O'Reilly | secondary | 2018
Q: What is a touchpoint? | Any point at which a user interacts with a service.
Q: What does the peak-end rule say? | People judge an experience mostly by its most intense moment and how it ends.
M1#design-u10-03-q1@1: Which is an example of a channel rather than a touchpoint? | The telephone | A booking confirmation letter | A conversation with a receptionist | A waiting room sign | A channel is the medium, such as phone, web or post, through which touchpoints are delivered.
M2#design-u10-03-q2@2: A customer must repeat her details each time she moves from chat to phone. What kind of service is this? | Multichannel but not omnichannel | Fully omnichannel | Single-channel only | Digital by default | Multichannel services offer several channels that do not share information.
TF1#design-u10-03-q3@3: According to the peak-end rule, improving the final moments of a service can change how the whole experience is remembered. | true | Memories of experiences are strongly shaped by the peak and the end.
M3#design-u10-03-q4@3: A council moves all applications online. What should it also provide? | Assisted digital support for those who cannot use online channels | A larger online advertising budget | A longer online form with more detail | An app to replace the website | Digital by default must not exclude people who cannot use digital channels.
SA2#design-u10-03-q5@2,3: Explain how designers can use touchpoints, channels and key moments to improve a service. | Designers map every touchpoint across the journey and the channels that deliver them, from first contact to follow-up. They look for gaps and inconsistencies, and join channels up so information and status carry across, creating an omnichannel experience. They identify pain points and key moments, such as moments of truth with staff, and use the peak-end rule to prioritise the most intense moments and the ending. Support for people who cannot use digital channels must also be included. | Mapping touchpoints ; Omnichannel ; Key moments and peak-end ; Inclusive channels

## Co-design and participatory design
LV: Intermediate · Application
S: Co-design involves the people affected by a service in designing it. This lesson explains the roots of participatory design, the levels of participation and how to run co-design ethically and well.
O: Describe the origins of participatory design and co-design
O: Explain levels of participation using Arnstein's ladder
O: Apply good practice when planning a co-design session
H: Roots of co-design
P: **Participatory design** began in **Scandinavia in the 1970s**, when researchers worked with trade unions so that workers had a say in the new computer systems changing their jobs, as in the **UTOPIA project** (1981 to 1985). **Co-design** is the broader practice of designers and non-designers working together throughout the design process. **Sanders and Stappers** (2008) described a shift from designing **for** people to designing **with** them, treating users as **experts of their own experience**. Co-design is widely used in public services, healthcare and community projects, where the people affected know things that professionals do not.
H: Levels of participation
- **Arnstein's ladder of citizen participation** (1969) has eight rungs, from **manipulation** at the bottom to **citizen control** at the top.
- The middle rungs, **informing**, **consultation** and **placation**, are described as **tokenism**.
- Higher rungs, **partnership**, **delegated power** and **citizen control**, share real power.
- Many "consultations" only ask for comments on finished designs; co-design shares decisions earlier.
- Teams should be honest about how much influence participants will have.
H: Running co-design well
- Use **generative tools**, such as collage kits, cards and simple models, to help people express ideas.
- **Pay** participants fairly for their time and expertise.
- Make sessions **accessible**: venue, timing, language, childcare and travel.
- Build **trust** and agree how ideas and data will be used.
- **Close the loop** by showing participants what changed as a result of their input.
X: Co-designing a youth mental health service.
> A health board wants to redesign how young people get support.
> Instead of a survey, it recruits ten young people with lived experience as paid co-designers for six months.
> Using journey mapping and prototyping kits, they design a text-based first contact and a drop-in space.
> The board reports back on what was adopted and why some ideas were not.
K: Participatory design began in 1970s Scandinavia with workers shaping new technology, and co-design treats users as experts of their experience; Arnstein's ladder shows that participation can range from tokenism to real power, and good co-design is paid, accessible, trusting and closes the loop.
!: Calling a feedback survey on a finished design co-design. Co-design involves people in decisions throughout the process, not just commenting at the end.
EV: established | Participatory design originated in Scandinavian projects with trade unions in the 1970s and 1980s.
EV: contested | The evidence that co-design improves service outcomes, rather than only participant experience, is still developing and mixed.
T: Co-design | Designers and non-designers working together throughout a design process
T: Participatory design | A tradition of involving the people affected by a design in making it, from 1970s Scandinavia
T: Tokenism | Participation that gives people a voice without real influence
SUM: Design with, not for.
SUM: Participation has levels.
SUM: Pay, include and report back.
SRC: Sanders E. B.-N. and Stappers P. J., "Co-creation and the new landscapes of design", CoDesign 4(1) | primary | 2008
SRC: Arnstein S. R., "A ladder of citizen participation", Journal of the American Institute of Planners 35(4) | primary | 1969
SRC: Simonsen J. and Robertson T. (eds), Routledge International Handbook of Participatory Design, Routledge | secondary | 2012
Q: Where and when did participatory design begin? | In Scandinavia in the 1970s, working with trade unions.
Q: What is at the top of Arnstein's ladder of participation? | Citizen control.
M1#design-u10-04-q1@1: Who described the shift from designing for people to designing with them? | Sanders and Stappers | Shostack and Bitner | Thaler and Sunstein | Michie and West | Sanders and Stappers set out this shift in their 2008 paper on co-creation.
M2#design-u10-04-q2@2: On Arnstein's ladder, where does consultation sit? | Among the tokenism rungs | At the top, as citizen control | At the bottom, as manipulation | Among the rungs that share real power | Arnstein grouped informing, consultation and placation as tokenism.
SEQ1#design-u10-04-q3@1: Put these rungs of Arnstein's ladder in order from lowest to highest. | Manipulation ; Consultation ; Partnership ; Citizen control | The ladder rises from non-participation through tokenism to citizen power.
M3#design-u10-04-q4@3: A council's co-design sessions are held at 2pm on weekdays in a building without step-free access. What is the main problem? | The sessions exclude many of the people the service affects | The sessions are too short to generate ideas | There are not enough designers present | The sessions should be online surveys instead | Co-design must be accessible in time, place and format or it excludes key voices.
SA2#design-u10-04-q5@2,3: Explain what co-design is and describe how to run it ethically and effectively. | Co-design is the practice of designers and the people affected by a service designing together throughout the process, treating participants as experts of their own experience. It grew from Scandinavian participatory design and aims for real influence rather than the tokenism described on Arnstein's ladder. To run it well, teams should pay participants, make sessions accessible and use generative tools that help people express ideas. They should be honest about how much influence participants have and report back on what changed. | Definition and expertise ; Participation versus tokenism ; Payment, access and tools ; Honesty and closing the loop

## Designing public services
LV: Intermediate · Application
S: Public services must work for everyone, including people in difficult circumstances. This lesson explains the UK Government Design Principles, the Service Standard, the agile phases of delivery and principles of good services.
O: Describe the UK Government Design Principles
O: Explain the GOV.UK Service Standard and the phases of service delivery
O: Apply principles of good services to a public service
H: Designing for government
P: Public services, such as tax, benefits, healthcare and licences, often cannot be avoided: users must use them, often at stressful moments. In 2012 the UK **Government Digital Service** (**GDS**) launched **GOV.UK** and published the **Government Design Principles**, beginning with **"Start with user needs"**. Others include **"Do less"**, **"Design with data"**, **"Do the hard work to make it simple"**, **"Iterate. Then iterate again"**, **"This is for everyone"** and **"Make things open: it makes things better"**. The **Service Standard** sets out **14 points** that government services must meet, such as understanding users and their problems, solving a whole problem for users and making sure everyone can use the service.
H: Phases of delivery
- **Discovery**: research users and the problem before deciding what to build.
- **Alpha**: try out different solutions with prototypes, and test riskiest assumptions.
- **Beta**: build a real service and test it with real users, first privately then publicly.
- **Live**: run and keep improving the service.
- **Service assessments** check services against the Service Standard at key points.
- A discovery may conclude that a digital service is not the right answer.
H: Principles of good services
- Lou Downe, former design director at GDS, set out **15 principles** in *Good Services* (2020).
- Examples: a good service is **easy to find**, **clearly explains its purpose**, **sets expectations**, and **requires no prior knowledge to use**.
- It is **agnostic of organisational structures**: users should not need to understand government departments.
- It **encourages the right behaviours** from users and staff, and **responds to change quickly**.
- Services should be named by what users want to do, such as "Apply for a passport", using **verbs, not nouns**.
X: Naming a service for users.
> A department plans a service called "PRS Registration Portal".
> Discovery research shows users search for "become a landlord" or "register as a landlord".
> The team renames it "Register as a private landlord" and explains in the first sentence who needs to do it and what it costs.
> Search traffic and completion rise, and calls asking what the service is for fall.
K: UK public services are guided by the Government Design Principles, starting with user needs, and the 14-point Service Standard; delivery moves through discovery, alpha, beta and live, and good services are easy to find, named for what users want to do, need no prior knowledge and hide organisational structure.
!: Jumping straight to building a digital product. Discovery should first understand users and the problem, and may show a different solution is needed.
EV: established | The UK Government Design Principles, first published by GDS in 2012, begin with the principle "Start with user needs".
T: Service Standard | The 14-point standard UK government services must meet
T: Discovery | The first phase of service delivery, researching users and the problem
T: Alpha | The phase of trying out different solutions with prototypes
SUM: Start with user needs.
SUM: Discovery, alpha, beta, live.
SUM: Name services by tasks.
SRC: Government Digital Service, Government Design Principles, gov.uk | guidance | 2012 | https://www.gov.uk/guidance/government-design-principles
SRC: Government Digital Service, The Service Standard, gov.uk | guidance | 2019 | https://www.gov.uk/service-manual/service-standard
SRC: Downe L., Good Services: How to Design Services that Work, BIS Publishers | secondary | 2020
Q: What is the first UK Government Design Principle? | Start with user needs.
Q: What are the four phases of UK government service delivery? | Discovery, alpha, beta and live.
M1#design-u10-05-q1@1: How many points does the UK government Service Standard have? | 14 | 10 | 7 | 20 | The Service Standard has 14 points that services are assessed against.
M2#design-u10-05-q2@2: In which phase does a team try out several prototype solutions to test risky assumptions? | Alpha | Discovery | Beta | Live | Alpha is for trying different approaches before building the real service.
TF2#design-u10-05-q3@2: A discovery phase must always end with a decision to build a digital service. | false | Discovery may show that a digital service is not the right solution, or that the problem lies elsewhere.
M3#design-u10-05-q4@3: Which service name best follows good service principles? | Apply for a fishing licence | Rod Licensing Online Portal | Fisheries Regulatory Services | eLicence System 2 | Good services are named with verbs describing what users want to do, not internal names.
SA2#design-u10-05-q5@2,3: Explain how the UK government approaches designing public services, using its principles and phases. | The UK government's Design Principles start with user needs and include doing the hard work to make it simple, iterating and making services for everyone. The 14-point Service Standard requires teams to understand users, solve whole problems and make services accessible, and services are assessed against it. Delivery moves through discovery, alpha, beta and live, so teams learn before building and keep improving after launch. Good services, as Lou Downe describes, are easy to find, named for user tasks and do not require users to understand government structures. | Design Principles ; Service Standard ; Delivery phases ; Good service principles

## Systems thinking for designers
LV: Intermediate · Foundation
S: Many design challenges sit inside complex systems where changing one part affects others. This lesson explains what a system is, stocks and flows, the iceberg model and why designers use systems thinking.
O: Define a system and its parts
O: Explain stocks, flows and the iceberg model
O: Apply systems thinking to look beyond a single problem
H: What a system is
P: A **system** is a set of **elements** connected by **interconnections** that together serve a **function** or **purpose**. Donella Meadows, in *Thinking in Systems* (2008), noted that the least obvious part, the purpose, is often the most important in determining behaviour. A hospital, a city's transport network and a food supply chain are systems. **Systems thinking** means looking at the whole, the relationships between parts and how behaviour emerges over time, rather than at isolated parts. It matters in design because solving one problem in isolation can create new ones elsewhere, the classic **unintended consequence**.
H: Stocks, flows and behaviour
- A **stock** is an amount that builds up or drains, such as patients on a waiting list or water in a bath.
- **Flows** change stocks: referrals flow in, treatments flow out.
- If inflows exceed outflows, the stock grows; this explains why waiting lists rise.
- **Delays** between cause and effect make systems hard to manage.
- **Emergence**: system behaviour, such as traffic jams, arises from many interactions, not from one part.
H: The iceberg model
- **Events**: what we see happen, such as a missed bin collection.
- **Patterns**: trends over time, such as collections missed every holiday week.
- **Structures**: the rules, resources and relationships causing the pattern, such as rotas and contracts.
- **Mental models**: beliefs and assumptions that keep the structure in place.
- Deeper levels offer more leverage but are harder to change.
- The UK Design Council's **Systemic Design Framework** (2021) helps designers work this way.
X: A systems view of hospital discharge.
> A hospital redesigns its discharge forms to speed up patients leaving.
> Discharges still stall, because social care places for older patients are not available.
> A systems map shows the stock of patients waiting depends on community care capacity, staffing and funding rules.
> The team works with social care partners, rather than only improving the form.
K: A system is a set of connected elements serving a purpose; stocks and flows explain how quantities such as waiting lists change, delays and emergence make systems complex, and the iceberg model helps designers look from events to patterns, structures and mental models.
!: Treating every symptom as a separate problem. Many symptoms share a deeper structural cause that a systems view can reveal.
EV: established | Meadows defines a system as interconnected elements organised to achieve a function or purpose.
T: System | A set of connected elements that together serve a purpose
T: Stock | A quantity that accumulates or drains over time, changed by flows
T: Emergence | Behaviour of a whole system that arises from interactions between its parts
SUM: Elements, connections, purpose.
SUM: Stocks change through flows.
SUM: Look below the surface.
SRC: Meadows D. H., Thinking in Systems: A Primer, Chelsea Green | secondary | 2008
SRC: Senge P. M., The Fifth Discipline: The Art and Practice of the Learning Organization, Doubleday | secondary | 1990
SRC: Design Council, The Systemic Design Framework, Design Council | guidance | 2021 | https://www.designcouncil.org.uk/our-resources/systemic-design-framework/
Q: What three things make up a system according to Meadows? | Elements, interconnections and a function or purpose.
Q: What are the four levels of the iceberg model? | Events, patterns, structures and mental models.
M1#design-u10-06-q1@1: In a waiting list system, what is the stock? | The number of people waiting | The rate of new referrals | The rate of treatments | The hospital's opening hours | A stock is the accumulated quantity, changed by the inflow and outflow.
NUM2#design-u10-06-q2@2: A clinic's waiting list has 400 people. Each week 60 are referred and 50 are treated. How many will be waiting after 4 weeks? | 440 | 0 | people | The stock grows by 60 minus 50, which is 10 per week, so 400 plus 40 gives 440.
M2#design-u10-06-q3@2: Which level of the iceberg model describes rules, contracts and resources that cause a pattern? | Structures | Events | Patterns | Mental models | Structures are the systems and rules beneath recurring patterns.
M3#design-u10-06-q4@3: A city widens a busy road, and within a few years traffic is as bad as before. What does systems thinking suggest? | The change altered behaviour elsewhere in the system | The road was not widened enough | Drivers ignored the new lanes | Traffic is unrelated to road capacity | Extra capacity can attract more journeys, an example of a system responding to change.
SA2#design-u10-06-q5@2,3: Explain why systems thinking is useful for designers, with an example. | Systems thinking looks at the whole set of elements, connections and purposes rather than isolated parts, so designers can see how a change in one place affects others. Concepts such as stocks and flows explain why quantities like waiting lists grow, while delays and emergence explain why simple fixes often fail. The iceberg model encourages designers to look beneath events to patterns, structures and mental models. For example, slow hospital discharge may depend on social care capacity rather than discharge forms. | Whole system view ; Stocks, flows and delays ; Iceberg model ; Example

## Feedback loops and leverage points
LV: Intermediate · Application
S: Feedback loops drive how systems grow, stabilise or collapse. This lesson explains reinforcing and balancing loops, delays and Donella Meadows' leverage points for intervening in a system.
O: Distinguish reinforcing and balancing feedback loops
O: Explain how delays affect system behaviour
O: Apply Meadows' leverage points to choose where to intervene
H: Feedback loops
P: A **feedback loop** exists when a change in one part of a system eventually feeds back to influence itself. A **reinforcing loop** (sometimes called positive feedback) amplifies change: more users attract more users, or rising debt brings more interest and more debt. A **balancing loop** (negative feedback) pushes a system towards a goal or limit, like a thermostat switching heating off when a room is warm. Real systems contain many interacting loops. **Causal loop diagrams** show these relationships with arrows marked as same-direction or opposite-direction links, helping teams see why a problem persists.
H: Delays and dynamics
- **Delays** between an action and its effect can cause **overshoot** and **oscillation**, like a shower that is too hot, then too cold.
- Reinforcing loops produce **exponential** growth or decline until a balancing loop limits them.
- **Limits to growth**: growth slows when it hits a constraint, such as staff or space.
- **Fixes that fail**: a quick fix relieves a symptom but creates side effects that make the problem worse later.
- These recurring structures are called **system archetypes**, described by Peter Senge.
H: Leverage points
- Meadows (1999) listed **12 places to intervene in a system**, from least to most effective.
- Low leverage: **parameters and numbers**, such as subsidies or targets, and buffer sizes.
- Middle: **feedback loops**, **information flows** and **rules** of the system.
- High: **self-organisation**, the **goals** of the system and the **paradigm** or mindset behind it.
- Highest: the **power to transcend paradigms**.
- Designers often work on information flows and rules, for example making energy use visible to households.
X: Information flow as a leverage point.
> Households in a housing development use very different amounts of electricity.
> Meters are in basements where nobody sees them, so there is no feedback.
> The designers move the display into the hallway, showing real-time use.
> Adding a missing information flow creates a balancing loop: people notice high use and reduce it.
K: Reinforcing loops amplify change and balancing loops stabilise systems, delays cause overshoot and oscillation, and Meadows' leverage points show that changing goals, rules, information flows and mindsets usually does more than adjusting numbers.
!: Assuming bigger budgets or targets are the strongest intervention. Meadows ranked parameters and numbers as the lowest leverage points.
EV: established | Meadows ranked changing parameters such as subsidies and standards among the least effective leverage points for changing system behaviour.
EV: contested | Meadows' ordering of leverage points is a heuristic from experience rather than an empirically tested ranking.
T: Reinforcing loop | A feedback loop that amplifies change in the same direction
T: Balancing loop | A feedback loop that pushes a system towards a goal or limit
T: Leverage point | A place in a system where a small change can produce a large effect
SUM: Loops reinforce or balance.
SUM: Delays cause overshoot.
SUM: Goals and paradigms beat numbers.
SRC: Meadows D. H., Leverage Points: Places to Intervene in a System, The Sustainability Institute | primary | 1999 | https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/
SRC: Meadows D. H., Thinking in Systems: A Primer, Chelsea Green | secondary | 2008
SRC: Senge P. M., The Fifth Discipline: The Art and Practice of the Learning Organization, Doubleday | secondary | 1990
Q: What does a balancing feedback loop do? | Pushes a system towards a goal or limit, stabilising it.
Q: According to Meadows, which leverage point is the most powerful? | The power to transcend paradigms.
M1#design-u10-07-q1@1: A popular social app attracts more users because more of their friends are on it. What kind of loop is this? | A reinforcing loop | A balancing loop | A delay | A buffer | More users attract more users, so the change amplifies itself.
MATCH2#design-u10-07-q2@2: Match each example to its systems concept. | Thermostat = Balancing loop ; Compound interest = Reinforcing loop ; Shower too hot then cold = Delay ; Quick fix with side effects = Fixes that fail | Recognising these structures helps designers predict behaviour.
M2#design-u10-07-q3@2: Which of these is a low leverage point according to Meadows? | Changing a subsidy amount | Changing the goals of the system | Changing the paradigm behind it | Changing who sets the rules | Parameters and numbers sit at the bottom of Meadows' list.
M3#design-u10-07-q4@3: Staff overtime fixes a backlog, but tired staff then make errors that create rework and a bigger backlog. Which archetype is this? | Fixes that fail | Limits to growth | Success to the successful | Shifting the burden to the user | A quick fix relieves the symptom but its side effects worsen the problem.
SA2#design-u10-07-q5@2,3: Explain feedback loops and leverage points and how designers can use them. | Reinforcing loops amplify change, producing growth or collapse, while balancing loops push systems towards goals or limits, and delays can make systems overshoot and oscillate. Mapping these loops explains why problems persist. Meadows' leverage points show that changing information flows, rules, goals and mindsets usually has more effect than changing numbers such as budgets. Designers can, for example, add missing feedback by making energy use or waiting times visible, creating a balancing loop that changes behaviour. | Reinforcing and balancing ; Delays ; Leverage hierarchy ; Design example

## Ecosystem maps
LV: Intermediate · Application
S: Services depend on networks of people and organisations. This lesson explains ecosystem and stakeholder maps, value exchanges and how to build a map that reveals opportunities.
O: Describe the purpose of an ecosystem map
O: Identify actors and value exchanges in a service ecosystem
O: Apply ecosystem mapping to find gaps and opportunities
H: What an ecosystem map shows
P: An **ecosystem map** is a visual representation of all the **actors** involved in a service or system and the **relationships** between them. Actors can be people, such as patients, carers and staff, organisations, such as charities, suppliers and regulators, and things, such as apps and databases. Maps are often drawn as **concentric circles**, with the user at the centre, close actors in the next ring and wider influences further out. Unlike a journey map, which shows a sequence over time, an ecosystem map shows the **structure** of the system at a moment, helping teams see who is involved and who is missing.
H: Value exchanges
- A **value exchange** is what flows between actors: **money**, **information**, **goods**, **services**, **trust** or **time**.
- Drawing arrows for each exchange shows dependencies and imbalances.
- **Stakeholder maps** add each actor's **interest** and **influence**, such as on a power and interest grid.
- Missing or one-way exchanges often reveal why partnerships fail.
- Unpaid or invisible work, such as care by family members, should be mapped too.
H: Building an ecosystem map
- Start with the **user** at the centre and list everyone who touches their experience.
- Use research and workshops with stakeholders to fill gaps.
- Group actors by closeness or type, and draw the exchanges.
- Look for **gaps**, **duplication**, **bottlenecks** and **opportunities** for new connections.
- Keep it a living document; ecosystems change as policies and markets change.
X: Mapping support for a new parent.
> At the centre is a new parent; close actors include a partner, health visitor, GP and nursery.
> Wider actors include employers, the benefits service, baby groups and online forums.
> Value exchanges show the health visitor passes information to the GP, but nobody passes information to the benefits service.
> The map reveals an opportunity: a single "tell us once" step when a baby is registered.
K: Ecosystem maps show all the actors in a service and the value exchanges between them, often in concentric circles around the user; mapping money, information, goods and trust reveals gaps, duplication and opportunities that a journey map might miss.
!: Mapping only the organisations that pay for the service. Family, community groups and informal actors often carry essential parts of a service.
EV: established | Ecosystem and stakeholder maps are standard service design tools for showing actors and relationships in a service.
T: Ecosystem map | A visual map of the actors in a system and the relationships between them
T: Actor | A person, organisation or thing involved in a service ecosystem
T: Value exchange | Something of value, such as money, information or trust, that flows between actors
SUM: Map every actor.
SUM: Draw the value exchanges.
SUM: Find gaps and opportunities.
SRC: Stickdorn M., Hormess M. E., Lawrence A. and Schneider J., This Is Service Design Doing, O'Reilly | secondary | 2018
SRC: Polaine A., Lovlie L. and Reason B., Service Design: From Insight to Implementation, Rosenfeld Media | secondary | 2013
Q: What is a value exchange? | Something of value, such as money, information, goods or trust, that flows between actors.
Q: How do ecosystem maps differ from journey maps? | Ecosystem maps show the structure of actors and relationships, not a sequence of steps over time.
M1#design-u10-08-q1@1: What is usually placed at the centre of an ecosystem map? | The user | The funder | The regulator | The design team | Ecosystem maps usually place the user at the centre with other actors around them.
M2#design-u10-08-q2@2: A map shows information flowing from a charity to the council but nothing flowing back. What might this suggest? | An imbalanced relationship that could weaken the partnership | A perfectly efficient partnership with no gaps | That the charity should be removed from the map | That the council is the user | One-way exchanges often reveal why relationships between actors break down.
TF1#design-u10-08-q3@3: Informal actors, such as family carers, should be left off ecosystem maps because they are not paid. | false | Informal actors often provide essential parts of a service and should be included.
M3#design-u10-08-q4@3: Which tool best shows how much influence and interest each actor has? | A stakeholder power and interest grid | A customer journey map | A service blueprint | A storyboard | Stakeholder maps add influence and interest to the actors in an ecosystem.
SA2#design-u10-08-q5@2,3: Explain how to build an ecosystem map and how it can reveal design opportunities. | An ecosystem map starts with the user at the centre, then adds every actor involved, including people, organisations, informal helpers and technologies, often in concentric rings by closeness. Research and stakeholder workshops help fill gaps. Arrows then show value exchanges, such as money, information, goods and trust. By examining the map, designers can find missing connections, duplication, bottlenecks or one-way relationships, and opportunities such as sharing information between actors so users do not repeat themselves. | User at centre and actors ; Research input ; Value exchanges ; Gaps and opportunities

## Designing for behaviour change
LV: Intermediate · Application
S: Many services aim to help people change behaviour, such as saving, recycling or attending appointments. This lesson explains the COM-B model, the Fogg Behavior Model and the EAST framework.
O: Explain the COM-B model of behaviour
O: Describe the Fogg Behavior Model and the EAST framework
O: Apply behaviour change models to diagnose a design problem
H: The COM-B model
P: The **COM-B model** (Michie, van Stralen and West, 2011) proposes that **Behaviour** happens when a person has the **Capability**, the **Opportunity** and the **Motivation** to do it. **Capability** can be **physical** (skills, strength) or **psychological** (knowledge, understanding). **Opportunity** can be **physical** (time, money, access) or **social** (norms, support). **Motivation** can be **reflective** (plans, beliefs) or **automatic** (habits, emotions). COM-B sits at the centre of the **Behaviour Change Wheel**, which links each barrier to **intervention functions** such as education, training, persuasion, incentives, environmental restructuring and enablement.
H: Fogg and EAST
- The **Fogg Behavior Model** (2009) says behaviour happens when **Motivation**, **Ability** and a **Prompt** come together at the same moment, written B = MAP.
- If ability is low, make the behaviour **easier** rather than trying to raise motivation.
- The Behavioural Insights Team's **EAST** framework (2014) says to make behaviours **Easy**, **Attractive**, **Social** and **Timely**.
- **Easy**: remove friction and use defaults; **Attractive**: draw attention and reward.
- **Social**: show what others do; **Timely**: prompt people when they are most receptive.
H: Using models in design
- Start by **defining the target behaviour** precisely: who does what, when and where.
- Use research to **diagnose** the barrier with COM-B before choosing an intervention.
- Match the intervention to the barrier: information does not fix a lack of opportunity.
- Test interventions, ideally with controlled trials, because effects vary by context.
- Respect **autonomy** and avoid manipulation; behaviour change should help people do what they want to do.
X: Reducing missed hospital appointments.
> A clinic has many missed appointments and plans a leaflet stressing the cost to the NHS.
> Research using COM-B finds patients are motivated, but many forget (psychological capability) or cannot get time off (physical opportunity).
> The team adds text reminders two days before (timely prompt) and an easy link to rebook (easy).
> Missed appointments fall more than the leaflet would likely have achieved.
K: COM-B says behaviour needs capability, opportunity and motivation, the Fogg model adds that a prompt must coincide with motivation and ability, and EAST advises making behaviours easy, attractive, social and timely; designers should diagnose barriers before choosing interventions.
!: Assuming people just need more information or motivation. Often the barrier is capability or opportunity, which awareness campaigns do not fix.
EV: established | The COM-B model, published by Michie, van Stralen and West in 2011, is widely used in UK public health to design behaviour change interventions.
T: COM-B | A model in which behaviour depends on capability, opportunity and motivation
T: Prompt | A cue that tells a person to act now
T: EAST | A framework to make behaviours easy, attractive, social and timely
SUM: Capability, opportunity, motivation.
SUM: Motivation, ability, prompt.
SUM: Easy, attractive, social, timely.
SRC: Michie S., van Stralen M. M. and West R., "The behaviour change wheel: a new method for characterising and designing behaviour change interventions", Implementation Science 6:42 | primary | 2011 | https://doi.org/10.1186/1748-5908-6-42
SRC: Fogg B. J., "A behavior model for persuasive design", Proceedings of Persuasive 2009, ACM | primary | 2009
SRC: Behavioural Insights Team, EAST: Four Simple Ways to Apply Behavioural Insights | guidance | 2014 | https://www.bi.team/publications/east-four-simple-ways-to-apply-behavioural-insights/
Q: What three components does COM-B say are needed for behaviour? | Capability, opportunity and motivation.
Q: What does EAST stand for? | Easy, attractive, social and timely.
M1#design-u10-09-q1@1: In the Fogg Behavior Model, which three elements must come together? | Motivation, ability and a prompt | Capability, opportunity and motivation | Easy, attractive and social cues | Norms, habits and incentives | Fogg writes the model as B = MAP: motivation, ability and prompt.
MATCH2#design-u10-09-q2@2: Match each barrier to its COM-B component. | Not knowing how to recycle = Psychological capability ; No recycling bin nearby = Physical opportunity ; Friends think recycling is pointless = Social opportunity ; No habit of recycling = Automatic motivation | Diagnosing the right component guides the choice of intervention.
M2#design-u10-09-q3@2: People want to save but find the sign-up form long and confusing. Which EAST principle should a designer apply first? | Easy | Social | Attractive | Timely | The barrier is friction, so simplifying the process is the priority.
M3#design-u10-09-q4@3: Commuters know cycling is healthy and want to cycle, but there are no safe routes. Which intervention is most appropriate? | Improve physical opportunity, such as safe cycle lanes | Run a campaign about the health benefits | Offer leaflets explaining how to ride | Show posters of other people cycling | The barrier is opportunity, so information or persuasion will not address it.
SA2#design-u10-09-q5@2,3: Explain how a designer could use COM-B and EAST to design a behaviour change intervention. | The designer should first define the target behaviour precisely and research why it is not happening. COM-B helps diagnose whether the barrier is capability, opportunity or motivation, each with subtypes such as psychological capability or social opportunity. EAST then suggests practical design changes, such as making the action easy, attractive, social and timely, for instance with reminders or defaults. The intervention should be matched to the barrier, tested in context and designed to respect people's autonomy. | Define behaviour ; Diagnose with COM-B ; Apply EAST ; Match, test and respect autonomy

## Nudges and choice architecture
LV: Advanced · Evaluation
S: The way choices are presented changes what people choose. This lesson explains nudges, defaults and choice architecture, real UK examples and the ethical and evidential debates around them.
O: Define nudge and choice architecture
O: Explain how defaults, framing and social norms influence choices
O: Evaluate the ethics and evidence of nudging
H: Nudges and choice architecture
P: **Choice architecture** is the way options are presented to people, such as their order, default and framing. Richard **Thaler** and Cass **Sunstein** popularised the term in *Nudge* (2008). A **nudge** is any aspect of choice architecture that alters behaviour in a predictable way **without forbidding options** or significantly changing economic incentives, such as putting fruit at eye level rather than banning sweets. They called this **libertarian paternalism**: steering choices while preserving freedom to choose. Because there is no neutral way to present choices, designers are always choice architects, whether they intend to be or not.
H: Common nudges
- **Defaults**: the option that applies if people do nothing, such as pension **auto-enrolment**.
- **Social norms**: telling people what most others do, such as "9 out of 10 people pay their tax on time".
- **Framing**: presenting the same information differently, such as "90% survival" rather than "10% mortality".
- **Salience**: making important information prominent and timely.
- **Simplification** and **reminders**: reducing friction and prompting action.
- **Sludge** (Thaler, 2018) is the opposite: friction that makes beneficial actions harder, such as complex cancellation steps.
H: Evidence and ethics
- Workplace pension **auto-enrolment**, introduced in the UK from 2012, raised participation among eligible employees from about 55% in 2012 to about 88% by 2019.
- The Behavioural Insights Team found social norm messages in tax letters increased on-time payments (Hallsworth and colleagues, 2017).
- A 2022 meta-analysis by Mertens and colleagues reported moderate average effects, but critics showed the effect shrank to near zero after correcting for **publication bias**.
- Ethical concerns include **manipulation**, lack of **transparency** and who decides what is good for people.
- Good practice: nudges should be **transparent**, easy to opt out of and in people's own interests; Sunstein proposed they should pass a "publicity" test.
X: Designing a default for organ donation.
> In May 2020 England moved to an opt-out system for organ donation, under Max and Keira's Law.
> Adults are considered to have agreed to donate unless they record a decision not to or are in an excluded group.
> Families are still consulted, and people can easily register an opt-out.
> The default changes the starting point but preserves choice, which is the core idea of a nudge.
K: Choice architecture is how options are presented, and nudges such as defaults, social norms, framing and reminders steer choices without removing options; some, like pension auto-enrolment, have large effects, but evidence for many nudges is mixed and they raise ethical questions of transparency and manipulation.
!: Assuming nudges always work and are always ethical. Effects vary widely, many studies suffer publication bias, and nudges must be transparent and in people's interests.
EV: established | Pension auto-enrolment in the UK substantially increased workplace pension participation among eligible employees.
EV: contested | After correction for publication bias, some analyses find little evidence for an average effect of nudge interventions across studies.
T: Choice architecture | The way options are presented, which influences the choices people make
T: Nudge | A change to choice architecture that alters behaviour predictably without forbidding options
T: Sludge | Friction in a process that makes beneficial actions harder
SUM: No neutral presentation.
SUM: Defaults are powerful.
SUM: Evidence is mixed; be transparent.
SRC: Thaler R. H. and Sunstein C. R., Nudge: Improving Decisions about Health, Wealth, and Happiness, Yale University Press | secondary | 2008
SRC: Hallsworth M., List J. A., Metcalfe R. D. and Vlaev I., "The behavioralist as tax collector: using natural field experiments to enhance tax compliance", Journal of Public Economics 148 | primary | 2017
SRC: Maier M., Bartos F., Stanley T. D., Shanks D. R., Harris A. J. L. and Wagenmakers E.-J., "No evidence for nudging after adjusting for publication bias", PNAS 119(31) | primary | 2022
Q: Who popularised the term nudge? | Richard Thaler and Cass Sunstein, in 2008.
Q: What is sludge? | Friction that makes beneficial actions harder, such as complicated cancellation.
M1#design-u10-10-q1@1: What makes an intervention a nudge rather than a ban? | It steers choices without forbidding any options | It removes the worst options entirely | It uses large financial penalties | It requires people to choose quickly | Nudges preserve freedom of choice while changing how options are presented.
M2#design-u10-10-q2@2: A pension scheme enrols all staff unless they opt out. Which nudge is this? | A default | A social norm | Framing | Salience | The option applied when people do nothing is the default.
TF2#design-u10-10-q3@2: Telling people that most others pay their tax on time is an example of a social norm nudge. | true | Social norm messages describe what most people do, which can influence behaviour.
M3#design-u10-10-q4@3: A subscription service makes cancelling require a phone call during office hours, while signing up takes one click. How should a designer evaluate this? | As sludge that works against users' interests | As a helpful default that protects users | As a neutral design with no effect | As a social norm nudge | Adding friction to actions in users' interests is sludge and raises ethical concerns.
SA2#design-u10-10-q5@2,3: Evaluate the use of nudges in public service design. | Nudges change how choices are presented, through defaults, social norms, framing and reminders, without removing options, and some have strong effects, such as UK pension auto-enrolment raising participation sharply. However, evidence for many nudges is mixed, and analyses correcting for publication bias suggest average effects may be small. Ethically, nudges risk manipulation if they are hidden or serve the organisation rather than users. Designers should use transparent nudges that are easy to opt out of, test them in context and avoid sludge. | Definition and examples ; Strong cases like defaults ; Mixed evidence and bias ; Ethics and transparency

## Platforms and networks
LV: Advanced · Application
S: Many modern services are platforms that connect groups of users, such as buyers and sellers. This lesson explains multi-sided platforms, network effects, the chicken-and-egg problem and the role of trust.
O: Define a multi-sided platform
O: Explain direct and indirect network effects
O: Apply platform design ideas to trust and launch challenges
H: What a platform is
P: A **multi-sided platform** creates value by enabling interactions between two or more distinct groups of users, such as drivers and riders, hosts and guests, or app developers and phone owners. Economists **Rochet and Tirole** (2003) described these as **two-sided markets**. Unlike a traditional "pipeline" business that makes a product and sells it, a platform mainly designs the **rules, tools and trust** that let others exchange value. Parker, Van Alstyne and Choudary, in *Platform Revolution* (2016), describe the **core interaction** as the most important exchange the platform must make easy, such as booking a room.
H: Network effects
- **Direct network effects**: a service becomes more valuable as more people on the same side join, such as a messaging app.
- **Indirect** or **cross-side network effects**: more users on one side attract more on the other, such as more shoppers attracting more sellers.
- **Negative network effects** occur when growth reduces value, such as congestion or spam.
- Network effects can lead to **winner-takes-most** markets, raising competition concerns.
- **Metcalfe's law**, that network value grows with the square of users, is a rough idea and its accuracy is debated.
H: Designing platforms
- The **chicken-and-egg problem**: neither side joins until the other is present.
- Strategies include **seeding** one side, focusing on a small niche first and subsidising one side.
- **Trust** tools: profiles, verified identities, **ratings and reviews**, secure payments and dispute resolution.
- **Curation** and **moderation** maintain quality and safety as the platform grows.
- Platforms must design for fairness to all sides, including workers and suppliers, not only customers.
X: Launching a local tool-sharing platform.
> A start-up wants neighbours to lend tools to each other, but early users find nothing to borrow.
> The team seeds supply by buying fifty popular tools in one neighbourhood and listing them itself.
> It adds verified profiles, deposits and reviews to build trust between strangers.
> As borrowers arrive, more neighbours list their own tools, showing an indirect network effect.
K: Multi-sided platforms create value by connecting distinct user groups around a core interaction; direct and indirect network effects can drive rapid growth or congestion, and platform designers must solve the chicken-and-egg problem and build trust, quality and fairness for all sides.
!: Focusing only on one side of a platform. A platform fails if either side has a poor experience, so both, and their interaction, must be designed.
EV: established | Rochet and Tirole's 2003 analysis of two-sided markets is a foundational account of how platforms set prices and attract both sides.
EV: contested | The claim, from Metcalfe's law, that network value rises with the square of the number of users is disputed and often overstated.
T: Multi-sided platform | A service that creates value by enabling interactions between distinct user groups
T: Network effect | The change in a service's value to users as more people use it
T: Chicken-and-egg problem | The difficulty of attracting either side of a platform before the other is present
SUM: Platforms connect groups.
SUM: Network effects drive growth.
SUM: Trust makes it work.
SRC: Rochet J.-C. and Tirole J., "Platform competition in two-sided markets", Journal of the European Economic Association 1(4) | primary | 2003
SRC: Parker G. G., Van Alstyne M. W. and Choudary S. P., Platform Revolution, W. W. Norton | secondary | 2016
Q: What is an indirect network effect? | When more users on one side of a platform attract more users on the other side.
Q: Name two tools platforms use to build trust. | Any two of verified profiles, ratings and reviews, secure payments and dispute resolution.
M1#design-u10-11-q1@1: A messaging app becomes more useful as more of your friends join it. What is this? | A direct network effect | An indirect network effect | A negative network effect | A balancing loop | Value rises because more users join the same side of the network.
M2#design-u10-11-q2@2: More restaurants join a food delivery app because more diners use it. What is this? | An indirect network effect | A direct network effect | The chicken-and-egg problem | A negative network effect | Growth on one side increases value for the other side.
M3#design-u10-11-q3@2: A ride-hailing service becomes slower as too many riders compete for few drivers at peak times. What does this show? | A negative network effect from congestion | A positive direct network effect | A failure of the core interaction design | A benefit of seeding supply | Growth on one side without the other can reduce value through congestion.
TF2#design-u10-11-q4@3: A common way to solve the chicken-and-egg problem is to seed or subsidise one side of the platform. | true | Seeding supply or subsidising one side helps attract the other side early on.
SA2#design-u10-11-q5@2,3: Explain the main design challenges of launching a multi-sided platform. | A multi-sided platform depends on at least two groups, so it faces a chicken-and-egg problem: neither side joins until the other is present. Designers can seed one side, start in a small niche or subsidise early users, so that indirect network effects begin. Because users are often strangers, trust tools such as verified profiles, reviews, secure payments and dispute resolution are essential. As the platform grows, curation and moderation are needed to prevent congestion and poor quality, and both sides must be treated fairly. | Chicken-and-egg ; Seeding and niches ; Trust mechanisms ; Quality and fairness at scale

## Measuring service outcomes
LV: Advanced · Evaluation
S: Good services are measured by whether they achieve their purpose, not just by activity. This lesson explains outputs, outcomes and impact, common service metrics and frameworks, and the risks of measuring the wrong thing.
O: Distinguish outputs, outcomes and impact
O: Calculate and interpret common service metrics
O: Evaluate the risks of metrics and targets
H: Outputs, outcomes and impact
P: **Outputs** are what a service produces, such as the number of appointments or forms processed. **Outcomes** are the changes for users, such as people getting the right benefit or recovering from an injury. **Impact** is the longer-term, wider effect, such as reduced poverty. A **theory of change** or **logic model** links activities to outputs, outcomes and impact, making assumptions explicit. Service designers aim to measure outcomes, because a service can produce many outputs while failing users, for example processing calls quickly without solving the caller's problem.
H: Common metrics and frameworks
- The GOV.UK Service Manual highlights four key measures: **cost per transaction**, **user satisfaction**, **completion rate** and **digital take-up**.
- **Completion rate** = completed transactions divided by started transactions.
- Google's **HEART** framework (Rodden, Hutchinson and Fu, 2010): **Happiness**, **Engagement**, **Adoption**, **Retention** and **Task success**, linked through **Goals, Signals, Metrics**.
- **Net Promoter Score** (NPS) = percentage of promoters (9 or 10) minus percentage of detractors (0 to 6).
- **Customer Effort Score** asks how easy it was to get an issue resolved.
H: Risks of measuring
- **Goodhart's law**: when a measure becomes a target, it ceases to be a good measure.
- Targets can cause **gaming**, such as closing calls quickly to meet a handling-time target.
- **Failure demand**, described by John Seddon, is demand caused by a failure to do something right the first time, such as chasing calls.
- Combine **quantitative** metrics with **qualitative** research to understand why numbers change.
- NPS is widely used but its link to growth and its reliability are debated.
X: Calculating a completion rate.
> An online licence service records 2,000 people starting an application in a month.
> 1,500 complete it, so the completion rate is 1,500 divided by 2,000, which is 75%.
> Analytics show most drop-outs happen on the payment page.
> User research reveals that the page times out, so the team extends the time limit and completion rises.
K: Services should be judged on outcomes and impact as well as outputs; metrics such as completion rate, cost per transaction, satisfaction, digital take-up, HEART and NPS help, but Goodhart's law and failure demand show that targets can distort behaviour, so numbers must be paired with research.
!: Treating outputs as success. Processing many applications quickly is not success if users still do not get what they need.
EV: established | The GOV.UK Service Manual recommends measuring cost per transaction, user satisfaction, completion rate and digital take-up.
EV: contested | Studies dispute Reichheld's claim that Net Promoter Score is the single best predictor of company growth.
T: Outcome | A change for users that results from a service
T: Completion rate | The proportion of started transactions that are completed
T: Failure demand | Demand caused by a failure to do something right for the user the first time
SUM: Outcomes over outputs.
SUM: Four GOV.UK measures.
SUM: Beware Goodhart's law.
SRC: Government Digital Service, Measuring the success of your service, GOV.UK Service Manual | guidance | 2024 | https://www.gov.uk/service-manual/measuring-success
SRC: Rodden K., Hutchinson H. and Fu X., "Measuring the user experience on a large scale: user-centered metrics for web applications", Proceedings of CHI 2010, ACM | primary | 2010
SRC: Seddon J., Systems Thinking in the Public Sector, Triarchy Press | secondary | 2008
Q: What is the difference between an output and an outcome? | An output is what a service produces; an outcome is the change it makes for users.
Q: What does Goodhart's law say? | When a measure becomes a target, it ceases to be a good measure.
NUM2#design-u10-12-q1@2: In a survey, 50% of users are promoters, 30% are passives and 20% are detractors. What is the Net Promoter Score? | 30 | 0 | – | NPS is the percentage of promoters minus detractors, so 50 minus 20 gives 30.
M1#design-u10-12-q2@1: Which of these is an outcome rather than an output? | Fewer people fall into rent arrears | 500 advice sessions delivered | 2,000 leaflets printed | 40 staff trained | An outcome is a change for users, not a count of activity.
M2#design-u10-12-q3@2: Which is one of the four key measures highlighted in the GOV.UK Service Manual? | Digital take-up | Number of web pages | Lines of code shipped | Social media followers | The four are cost per transaction, user satisfaction, completion rate and digital take-up.
M3#design-u10-12-q4@3: A helpline sets a target of closing calls in under three minutes, and repeat calls rise. What best explains this? | The target encourages gaming and creates failure demand | The helpline needs a longer phone menu | Callers are less patient than before | The target is too generous and should be shorter | Goodhart's law: rushing calls to hit the target leaves problems unsolved, so people call back.
SA2#design-u10-12-q5@2,3: Evaluate how a team should measure the success of a public service. | The team should focus on outcomes for users, such as people getting the right support, rather than only outputs like the number of forms processed, using a theory of change to link them. Useful measures include completion rate, cost per transaction, user satisfaction and digital take-up, and frameworks such as HEART connect goals to signals and metrics. However, Goodhart's law warns that targets can be gamed, and failure demand can rise if staff rush to hit numbers. Quantitative metrics should therefore be combined with qualitative research to understand why results change. | Outcomes over outputs ; Key metrics and frameworks ; Goodhart and failure demand ; Mixed methods
`;
