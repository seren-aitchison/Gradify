// EngineerGradify Design and Manufacturing (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## The engineering design process
LV: Year 1 · Foundation
S: Engineering design turns a need into a product or system that can be made and used safely. This lesson describes the main stages of the design process, the role of iteration, and how design decisions affect cost across a product's life.
O: Describe the stages of a systematic engineering design process
O: Explain why design is iterative and how reviews control it
O: Explain why early design decisions commit most of a product's cost
PRE: Materials selection and Ashby charts
H: Stages of design
- **Problem definition**: clarify the need, users and constraints, leading to a **specification**.
- **Conceptual design**: generate and evaluate alternative concepts.
- **Embodiment design**: develop the chosen concept into a layout, selecting materials, forms and sizes.
- **Detail design**: produce full drawings, tolerances and manufacturing information.
- **Testing and verification**: prototypes and analysis check that the design meets the specification.
- Models such as Pahl and Beitz's systematic approach and the UK Design Council's **Double Diamond** (discover, define, develop, deliver) describe similar stages.
H: Iteration and reviews
- Design is **iterative**: testing reveals problems that send the team back to earlier stages.
- **Design reviews** at stage gates check progress against the specification, risks and costs.
- **Verification** asks "did we build it right?" (does it meet the specification); **validation** asks "did we build the right thing?" (does it meet the user's need).
H: Cost commitment
P: Although relatively little money is spent during early design, decisions made at that stage, such as the concept, materials and number of parts, commit a large share of a product's life-cycle cost. Changes become much more expensive as a design progresses into tooling, production and service. This is why engineers invest effort in clear requirements, concept evaluation and design for manufacture early on. Professional engineers also consider safety, sustainability, regulations and ethics throughout, as set out in the Engineering Council's UK-SPEC.
X: Designing a bike rack.
> A council needs secure cycle parking for a station.
> The team defines the need: number of bikes, theft resistance, cost and footprint.
> It sketches several concepts, selects a sheet-steel hoop and develops it into detailed drawings.
> A prototype fails a vandalism test, so the team thickens the tube and retests: iteration.
K: Design moves from problem definition to concept, embodiment and detail design, then testing; it is iterative and controlled by reviews, and early decisions commit most of the life-cycle cost.
!: Treating design as a straight line from idea to product. Real design loops back as testing reveals problems.
EV: established | Most of a product's life-cycle cost is committed by decisions made in the early design stages.
T: Embodiment design | Developing a concept into a definitive layout with materials and dimensions
T: Verification | Checking that a design meets its specification
T: Validation | Checking that a design meets the user's actual need
SUM: Define, conceive, embody, detail, test.
SUM: Iterate and review.
SUM: Early decisions fix most costs.
SRC: Pahl G., Beitz W., Feldhusen J. and Grote K.-H., Engineering Design: A Systematic Approach, 3rd edition, Springer | secondary | 2007
SRC: Design Council, The Double Diamond: a universally accepted depiction of the design process | guidance | 2019 | https://www.designcouncil.org.uk/our-resources/the-double-diamond/
SRC: Engineering Council, UK Standard for Professional Engineering Competence and Commitment (UK-SPEC), 4th edition | standard | 2020 | https://www.engc.org.uk/standards-guidance/standards/uk-spec/
Q: What is the difference between verification and validation? | Verification checks the design meets its specification; validation checks it meets the user's real need.
Q: What happens in embodiment design? | The chosen concept is developed into a definitive layout with materials, forms and sizes.
M1#engineering-u10-01-q1@1: Which stage produces full drawings with tolerances? | Detail design | Problem definition | Conceptual design | Market research | Detail design produces the information needed to manufacture each part.
M2#engineering-u10-01-q2@2: A prototype fails a test and the team changes the concept. This illustrates | Iteration in design | Detail design only | Validation of marketing | Final production | Design loops back to earlier stages when problems are found.
M3#engineering-u10-01-q3@3: Why should engineers spend effort on early design decisions? | Early decisions commit most of the life-cycle cost, and changes later are expensive | Early design stages are where most of the money is actually spent | Late changes in production cost nothing to make | Manufacturing choices have no effect on product cost | Concept and material choices lock in most of the cost.
SEQ1#engineering-u10-01-q4@1: Put these design stages in order. | Problem definition ; Conceptual design ; Embodiment design ; Detail design | Each stage builds on the decisions of the one before.
SA2#engineering-u10-01-q5@1,3: Explain the stages of the engineering design process and why iteration is important. | The process starts with defining the problem and writing a specification, then generating and selecting concepts, embodiment design of layout, materials and sizes, and detail design with drawings and tolerances, followed by testing and verification. Iteration is important because analysis, prototypes and reviews reveal problems or better solutions, so the team returns to earlier stages; fixing problems early is cheaper than after production starts. | Problem definition ; Concepts ; Embodiment and detail ; Testing ; Iteration and cost

## Requirements and specifications
LV: Year 1 · Foundation
S: A good specification defines what a design must achieve without dictating how. This lesson explains how requirements are gathered and written, the content of a product design specification, and how requirements are traced through design.
O: Distinguish needs, requirements and specifications
O: Write clear, measurable requirements and distinguish demands from wishes
O: Describe the contents of a product design specification and the use of quality function deployment
PRE: The engineering design process
H: From needs to requirements
- **Customer needs** are often vague: "it must be light and easy to use".
- **Requirements** turn needs into precise, **measurable** statements: "mass no more than 1.5 kg".
- Good requirements are specific, measurable, achievable, testable and **solution-neutral**: they state what is needed, not how to achieve it.
- **Demands** must be met; **wishes** are desirable and can be traded off.
H: The product design specification
- A **product design specification (PDS)** lists requirements under headings such as performance, environment, life, maintenance, cost, size, weight, materials, safety, standards, ergonomics, aesthetics, quantity and disposal.
- Stuart Pugh's total design approach places the PDS at the centre of the design activity.
- The specification is a **living document**, updated under change control as understanding improves.
H: Tools and traceability
P: **Quality function deployment (QFD)**, using a **house of quality** matrix, links customer needs to measurable engineering characteristics and shows which characteristics matter most and how they interact. In larger projects, requirements are managed with **traceability**, so every requirement can be traced to design features and to the tests that verify it. Poor requirements are a frequent cause of project failure, because errors in requirements become very expensive to fix later.
X: A handheld drill.
> Customers say a drill should be "powerful but not tiring to use".
> The team writes requirements: drill a 10 mm hole in concrete in under 20 seconds; mass no more than 1.6 kg.
> Safety standards are listed as demands; a choice of colours is a wish.
> Each requirement is linked to a test in the verification plan.
K: Requirements turn vague needs into measurable, solution-neutral statements; a PDS gathers them under headings such as performance, cost and safety, demands are distinguished from wishes, and QFD and traceability link needs to design and tests.
!: Writing a solution into the specification, such as "use an aluminium frame". This rules out better alternatives before concepts are explored.
EV: established | Errors in requirements are among the most expensive to correct when found late in development.
T: Product design specification | A document listing all requirements a design must meet
T: Solution-neutral | Stating what must be achieved without prescribing how
T: Quality function deployment | A method linking customer needs to engineering characteristics
SUM: Needs become measurable requirements.
SUM: The PDS covers all aspects.
SUM: QFD and traceability link needs to tests.
SRC: Pugh S., Total Design: Integrated Methods for Successful Product Engineering, Addison-Wesley | primary | 1991
SRC: Hauser J. R. and Clausing D., "The house of quality", Harvard Business Review 66(3), 63–73 | primary | 1988
Q: What makes a requirement solution-neutral? | It states what must be achieved without saying how to achieve it.
Q: What is the difference between a demand and a wish? | A demand must be met; a wish is desirable and can be traded off.
M1#engineering-u10-02-q1@1: Which is the best-written requirement? | The handle shall withstand a 500 N pull without permanent deformation | The handle shall be strong enough for all reasonable uses by customers | The handle shall be made of steel tube to give a strong grip | The handle shall look modern and attractive to most buyers | It is measurable and testable without prescribing a material.
M2#engineering-u10-02-q2@2: What does the house of quality matrix show? | How customer needs relate to engineering characteristics | The production schedule for each part | Only the cost of each component | The colour options for the product | QFD translates the voice of the customer into technical targets.
M3#engineering-u10-02-q3@3: Why should every requirement be traceable to a test? | So the team can verify the design meets each requirement | So customers can choose the test method | Because tests replace the need for design | So requirements never need updating | Traceability ensures nothing is missed in verification.
MATCH2#engineering-u10-02-q4@2: Match each PDS heading to an example requirement. | Performance = Lift 200 kg to 3 m ; Environment = Operate from −10 °C to 40 °C ; Safety = Comply with the Machinery Directive requirements ; Life = Last 10 years of daily use | A PDS groups requirements by aspect.
SA2#engineering-u10-02-q5@1,3: Explain how a design team turns customer needs into a product design specification. | The team gathers needs from users and stakeholders through interviews, observation and market research. It converts them into specific, measurable, solution-neutral requirements, classifying demands and wishes. Requirements are grouped under PDS headings such as performance, environment, cost, safety and standards. QFD can prioritise engineering characteristics. The PDS is reviewed and kept under change control, with each requirement linked to a verification test. | Gathering needs ; Measurable requirements ; Demands and wishes ; PDS headings ; QFD and traceability

## Concept generation and selection
LV: Year 1 · Intermediate
S: Good designs usually come from exploring many concepts before choosing one. This lesson covers methods for generating concepts and for selecting between them systematically.
O: Use functional decomposition and creative methods to generate concepts
O: Apply Pugh's concept selection matrix and weighted decision matrices
O: Evaluate the limitations of scoring methods in concept selection
PRE: Requirements and specifications
H: Generating concepts
- **Functional decomposition** breaks the overall function into sub-functions, such as "store energy", "transmit force" and "control speed".
- A **morphological chart** lists several ways to achieve each sub-function; combining one option per row creates different concepts.
- Creative methods include **brainstorming**, sketching, analogy and biomimicry, and **TRIZ**, which uses patterns from patents to resolve contradictions.
- The aim is to generate many ideas before judging them.
H: Selecting concepts
- **Pugh's controlled convergence** compares concepts with a **datum** concept for each criterion, scoring better (+), same (S) or worse (−), and combines strengths of concepts to create new ones.
- A **weighted decision matrix** gives each criterion a weight and each concept a score; the weighted total is the sum of weight × score.
- Example: weights of 0.5 for cost, 0.3 for mass and 0.2 for appearance, with scores of 4, 3 and 5, give a total of 0.5 × 4 + 0.3 × 3 + 0.2 × 5 = 3.9.
H: Limitations
P: Scoring methods make reasoning explicit and help teams agree, but the numbers depend on subjective weights and scores, so small changes can alter the winner. Teams should test the sensitivity of the result, check that no concept fails a demand outright, and use judgement and further analysis or prototypes when scores are close. Criteria should come from the specification so that selection reflects real requirements.
X: Choosing a door-closer concept.
> A team uses a morphological chart to combine energy storage (spring, gas strut, weight) with damping (oil, air, friction).
> Six concepts emerge; Pugh's matrix against a datum spring-and-oil design narrows them to two.
> A weighted matrix scores the gas-strut concept 3.9 and the spring concept 3.7.
> Because the scores are close, the team builds quick prototypes of both before deciding.
K: Concepts come from functional decomposition, morphological charts and creative methods; Pugh's datum method and weighted matrices help select between them, but results depend on subjective scores and need sensitivity checks and judgement.
!: Treating the highest weighted score as an objective answer. Weights and scores are judgements, and close results need further testing.
EV: established | Structured concept selection methods help teams compare options explicitly, though they rely on subjective inputs.
T: Morphological chart | A table of alternative solutions for each sub-function, used to combine concepts
T: Datum | The reference concept against which others are compared in Pugh's method
T: Weighted decision matrix | A table scoring concepts against weighted criteria
SUM: Decompose functions; generate many ideas.
SUM: Pugh's datum and weighted matrices.
SUM: Check sensitivity and use judgement.
SRC: Pugh S., Total Design: Integrated Methods for Successful Product Engineering, Addison-Wesley | primary | 1991
SRC: Ulrich K. T., Eppinger S. D. and Yang M. C., Product Design and Development, 7th edition, McGraw Hill | secondary | 2020
Q: What is a morphological chart? | A table listing alternative ways to achieve each sub-function, combined to create concepts.
Q: In Pugh's method, what are concepts compared against? | A datum concept, scored better, same or worse for each criterion.
M1#engineering-u10-03-q1@1: Which method breaks a product's overall function into sub-functions? | Functional decomposition | Pugh's matrix | Lean production | Mohr's circle | Decomposition makes it easier to find solutions for each part.
M2#engineering-u10-03-q2@2: Why should no concept that fails a demand be selected, whatever its score? | Demands must be met, so a failure rules the concept out | Scores are always perfectly accurate | Demands are only wishes | Weighted totals include all demands automatically | A high score cannot compensate for missing an essential requirement.
M3#engineering-u10-03-q3@3: Two concepts score 3.9 and 3.8 in a weighted matrix. What is the best next step? | Test the sensitivity of the result and gather more evidence | Choose 3.9 immediately without question | Discard both concepts | Add a random criterion to separate them | Close scores are within the uncertainty of the method.
NUM2#engineering-u10-03-q4@2: A concept scores 4, 3 and 5 on criteria with weights 0.5, 0.3 and 0.2. What is its weighted score? | 3.9 | 0.01 | – | Weighted total = 0.5 × 4 + 0.3 × 3 + 0.2 × 5 = 2 + 0.9 + 1 = 3.9.
SA2#engineering-u10-03-q5@1,3: Describe how a design team could generate and select concepts for a new product. | Break the overall function into sub-functions, then use a morphological chart, brainstorming, analogy or TRIZ to find several solutions for each and combine them into concepts. Screen out concepts that fail demands. Use Pugh's datum method to compare and combine concepts, then a weighted decision matrix with criteria from the specification. Check the sensitivity of the result to weights, and use prototypes or analysis when scores are close. | Functional decomposition ; Creative methods ; Screening ; Pugh and weighting ; Sensitivity and judgement

## Engineering drawing and CAD
LV: Year 1 · Foundation
S: Engineering drawings and CAD models communicate exactly what is to be made. This lesson covers orthographic projection, drawing conventions and standards, and the role of 3D CAD and digital models.
O: Interpret first-angle and third-angle orthographic projections
O: Apply common drawing conventions for sections, dimensions and notes
O: Explain the uses of 3D CAD, parametric modelling and model-based definition
PRE: The engineering design process
H: Orthographic projection
- Orthographic drawings show an object in separate 2D **views**, usually front, plan and end views.
- In **first-angle projection** (common in the UK and Europe), the plan view is drawn below the front view; in **third-angle projection** (common in North America), it is drawn above.
- A projection symbol on the drawing shows which method is used.
- **Isometric** views show a 3D impression for clarity.
H: Conventions and standards
- In the UK, **BS 8888** sets out the requirements for technical product documentation, drawing on ISO standards.
- **Section views** show internal features, with cut material hatched.
- **Line types** distinguish visible edges, hidden detail and centre lines.
- Dimensions are in millimetres, placed once, from functional **datums**, avoiding duplication; a **title block** gives part number, material, scale, revision and projection.
H: CAD and digital models
P: **Computer-aided design (CAD)** lets engineers build 3D **parametric** models, where dimensions drive geometry and design intent is captured in features and constraints. Assemblies check fit and interference, and models feed **finite element analysis**, simulation and **computer-aided manufacture (CAM)**. In **model-based definition**, the annotated 3D model, rather than a 2D drawing, becomes the authoritative definition. **Product data management** controls versions and revisions so everyone works from the current design.
X: Reading a bracket drawing.
> A machinist receives a drawing of a steel bracket in first-angle projection.
> The plan view sits below the front view, and a section view shows a counterbored hole.
> Dimensions are taken from the bracket's machined base, marked as datum A.
> The title block shows revision C, so she checks she has the latest version.
K: Drawings use orthographic views in first- or third-angle projection, with standard line types, sections and dimensions to BS 8888; 3D parametric CAD captures design intent and links to analysis and manufacture.
!: Misreading the projection method. Always check the projection symbol before interpreting views.
EV: established | Standardised drawing practice reduces errors in communicating designs between engineers and manufacturers.
T: First-angle projection | A projection method in which the plan view is drawn below the front view
T: Parametric model | A CAD model in which dimensions and constraints drive the geometry
T: Datum | A reference feature from which dimensions and tolerances are measured
SUM: Orthographic views; check the projection.
SUM: Standards govern lines and dimensions.
SUM: Parametric CAD links to analysis and CAM.
SRC: BSI, BS 8888:2020 Technical product documentation and specification | standard | 2020
SRC: Simmons C. H., Maguire D. E. and Phelps N., Manual of Engineering Drawing, 5th edition, Butterworth-Heinemann | secondary | 2020
Q: In first-angle projection, where is the plan view drawn? | Below the front view.
Q: What is model-based definition? | Using the annotated 3D model, rather than a 2D drawing, as the authoritative definition of a part.
M1#engineering-u10-04-q1@1: Which UK standard covers technical product documentation? | BS 8888 | ISO 9001 | BS 7671 | Eurocode 2 | BS 8888 sets out requirements for engineering drawings.
M2#engineering-u10-04-q2@2: Why are dimensions taken from functional datums? | To match how parts fit and are measured, avoiding error build-up | To make the finished drawing look neat and symmetrical | Because datums must always be placed at the part's centre | To reduce the number of views needed on the sheet | Dimensioning from datums reflects function and inspection.
M3#engineering-u10-04-q3@3: An engineer changes one dimension in a parametric model and connected features update. This shows | Design intent captured through parameters and constraints | A drawing error caused by conflicting constraints in the model | Third-angle projection being applied to the views | Model-based definition replacing all 2D drawings | Parametric models update geometry from driving dimensions.
MATCH2#engineering-u10-04-q4@2: Match each line type to its use. | Thick continuous line = Visible edges ; Thin dashed line = Hidden detail ; Thin chain line = Centre lines ; Thin hatching lines = Cut surfaces in sections | Standard line types make drawings unambiguous.
SA2#engineering-u10-04-q5@1,3: Explain the advantages of 3D parametric CAD over traditional 2D drawing. | Parametric CAD captures design intent so changes update related features automatically. 3D assemblies reveal interference and fit problems early. Models can be used directly for finite element analysis, simulation, rendering and CAM toolpaths, and to generate drawings consistently. Product data management controls versions. However, 2D drawings or annotations are still needed for tolerances and inspection, and users need training and good modelling practice. | Design intent ; Assemblies ; Links to analysis and CAM ; Data management ; Limitations

## Tolerances and fits
LV: Year 1 · Intermediate
S: No part can be made to an exact size, so engineers specify how much variation is acceptable. This lesson explains dimensional tolerances, the ISO system of limits and fits, and geometric tolerancing.
O: Explain tolerances, limits and the cost of tight tolerances
O: Calculate clearance and interference for hole and shaft fits
O: Describe the purpose of geometric dimensioning and tolerancing
PRE: Engineering drawing and CAD
H: Tolerances and limits
- A **tolerance** is the permitted variation in a dimension: the difference between the **upper** and **lower limits**.
- Tighter tolerances need more precise processes and more inspection, so they **cost more**; designers should make tolerances only as tight as function requires.
- **Tolerance stack-up** occurs when tolerances on several parts add up in an assembly.
H: Limits and fits
- The ISO system (ISO 286) uses **tolerance grades** (IT numbers) and **fundamental deviations** (letters): capitals for holes, lower case for shafts.
- In the **hole-basis** system the hole is H (lower limit equals the nominal size) and the shaft is varied.
- **Clearance fits** (for example H7/g6) always leave a gap; **transition fits** (H7/k6) may give clearance or interference; **interference fits** (H7/p6) always overlap and are pressed or shrunk together.
- For a 25 mm H7/g6 fit, the hole is 25.000 to 25.021 mm and the shaft 24.980 to 24.993 mm, giving a clearance of 0.007 to 0.041 mm.
H: Geometric tolerancing
P: Size tolerances alone do not control form, orientation or position. **Geometric dimensioning and tolerancing (GD&T)**, defined in ISO 1101 and related standards, controls features such as **flatness**, **perpendicularity**, **position**, **concentricity** and **runout**, referenced to **datums**. Each tolerance appears in a **feature control frame**. GD&T expresses functional requirements precisely and can allow larger size tolerances while ensuring parts assemble and work, reducing cost.
E: Maximum clearance = largest hole − smallest shaft :: clearance fit
E: Minimum clearance = smallest hole − largest shaft :: clearance fit
X: A bearing seat.
> A 25 mm shaft must rotate freely in a bushing.
> The designer specifies 25 H7/g6, a clearance fit.
> Maximum clearance is 25.021 − 24.980 = 0.041 mm and minimum clearance is 25.000 − 24.993 = 0.007 mm.
> A cylindricity tolerance on the shaft ensures it is not tapered or barrel-shaped.
K: Tolerances define acceptable variation and cost more as they tighten; ISO 286 hole-basis fits give clearance, transition or interference, calculated from the limits; GD&T controls form, orientation and position relative to datums.
!: Specifying tight tolerances everywhere "to be safe". This raises cost without improving function.
EV: established | Manufacturing cost rises steeply as dimensional tolerances become tighter.
T: Tolerance | The permitted variation between the upper and lower limits of a dimension
T: Interference fit | A fit in which the shaft is always larger than the hole
T: Feature control frame | The box on a drawing that states a geometric tolerance and its datums
SUM: Tolerance as tight as needed, no tighter.
SUM: Clearance, transition and interference fits.
SUM: GD&T controls form and position.
SRC: International Organization for Standardization, ISO 286-1:2010 Geometrical product specifications: ISO code system for tolerances on linear sizes | standard | 2010
SRC: International Organization for Standardization, ISO 1101:2017 Geometrical product specifications: geometrical tolerancing | standard | 2017
Q: What is tolerance stack-up? | The accumulation of individual part tolerances in an assembly.
Q: In the hole-basis system, what is the lower limit of the hole? | The nominal size, as the hole is designated H.
M1#engineering-u10-05-q1@1: Which fit always leaves a gap between hole and shaft? | A clearance fit | An interference fit | A transition fit | A shrink fit | In a clearance fit the smallest hole is larger than the largest shaft.
M2#engineering-u10-05-q2@2: Why should tolerances be no tighter than necessary? | Tighter tolerances increase manufacturing and inspection cost | Loose tolerances are always more accurate | Tolerances do not affect cost | Tight tolerances make parts lighter | Precision costs money, so tolerances should reflect function.
M3#engineering-u10-05-q3@3: A gear must be held on a shaft without keys by friction. Which fit is suitable? | An interference fit such as H7/p6 | A loose clearance fit | A sliding fit such as H7/g6 | No tolerance at all | Interference provides the grip needed to transmit torque.
NUM2#engineering-u10-05-q4@2: A hole is 25.000 to 25.021 mm and a shaft 24.980 to 24.993 mm. What is the maximum clearance, in mm? | 0.041 | 0.001 | mm | Maximum clearance = 25.021 − 24.980 = 0.041 mm.
SA2#engineering-u10-05-q5@1,3: Explain how a designer chooses tolerances and fits for a shaft running in a bushing. | The shaft must rotate freely, so a clearance fit such as H7/g6 is chosen using the hole-basis system. The designer calculates maximum and minimum clearance from the limits to ensure lubrication and free running without excessive play. Tolerances are set only as tight as function requires, because tighter tolerances raise cost. Geometric tolerances such as cylindricity or runout control form. Stack-up is checked across the assembly. | Function ; Fit selection ; Clearance calculation ; Cost ; GD&T and stack-up

## Design for manufacture and assembly
LV: Year 1 · Intermediate
S: The way a part is designed largely determines how easily and cheaply it can be made and assembled. This lesson explains design for manufacture and assembly principles and how they reduce cost and improve quality.
O: State the principles of design for manufacture
O: Apply design for assembly guidelines to reduce part count
O: Evaluate the benefits and trade-offs of DFMA
PRE: Concept generation and selection
H: Design for manufacture
- Choose processes suited to the **production volume**: machining for low volumes, casting or moulding for high volumes.
- Design features the process can make easily: uniform wall thickness in moulding, **draft angles** for release from moulds, generous radii, standard hole sizes and tools.
- Avoid unnecessarily tight tolerances and fine surface finishes.
- Use **standard components** and materials where possible.
H: Design for assembly
- **Reduce part count**: Boothroyd and Dewhurst's method asks whether each part must move relative to others, be a different material or be separate for assembly or service; if not, it is a candidate for combining.
- Design parts to be **self-locating** and **self-fastening**, for example with snap fits instead of screws.
- Make parts **symmetrical** or obviously asymmetrical to avoid wrong orientation, and use **poka-yoke** (error-proofing) features.
- Assemble from one direction, ideally top-down.
H: Benefits and trade-offs
P: DFMA reduces part count, assembly time, inventory and supplier costs, and can improve reliability because fewer parts and joints can fail. Boothroyd and Dewhurst's design efficiency index compares the theoretical minimum assembly time with the estimated actual time. Trade-offs include more complex, costly parts and tooling when parts are combined, and the need to keep products repairable and recyclable: snap fits and moulded assemblies can make disassembly harder, conflicting with **design for disassembly** and the circular economy.
X: Redesigning a kettle base.
> A kettle base has 22 parts, including 8 screws.
> Applying DFA, the team finds only 9 parts are essential.
> Moulded snap fits replace most screws, and a keyed connector prevents wrong assembly.
> Assembly time falls by half, though the moulding tool becomes more expensive.
K: Design for manufacture fits features to the process and volume; design for assembly reduces part count and makes parts easy to handle, orient and fit; DFMA cuts cost and improves quality but must balance repairability and tooling cost.
!: Assuming fewer parts is always better. Combining parts can make products harder to repair or recycle and tooling more expensive.
EV: established | Applying DFMA principles commonly reduces part counts and assembly costs substantially.
T: Draft angle | A slight taper on moulded or cast features to allow removal from the mould
T: Poka-yoke | Error-proofing features that prevent incorrect assembly
T: Design efficiency | The ratio of ideal to estimated assembly time in DFA analysis
SUM: Match design to process and volume.
SUM: Fewer, self-locating parts.
SUM: Balance cost against repair and recycling.
SRC: Boothroyd G., Dewhurst P. and Knight W. A., Product Design for Manufacture and Assembly, 3rd edition, CRC Press | primary | 2011
SRC: Swift K. G. and Booker J. D., Manufacturing Process Selection Handbook, Butterworth-Heinemann | secondary | 2013
Q: What three questions identify parts that could be combined in DFA? | Does it move relative to other parts, must it be a different material, and must it be separate for assembly or service?
Q: What is a draft angle for? | To allow a moulded or cast part to be released from the mould.
M1#engineering-u10-06-q1@1: Which feature helps prevent a part from being assembled the wrong way round? | A poka-yoke keying feature | A tighter tolerance | A finer surface finish | An extra screw | Error-proofing features physically prevent incorrect assembly.
M2#engineering-u10-06-q2@2: Which process is usually most economical for 500,000 identical plastic housings? | Injection moulding | Hand machining | 3D printing each part | Sand casting | High tooling cost is spread over a very large volume.
M3#engineering-u10-06-q3@3: What is a drawback of replacing screws with permanent snap fits? | Products may become harder to repair and recycle | Assembly always takes longer than with screws | The total part count always increases | Snap fits cannot be produced by moulding | Easy assembly can conflict with design for disassembly.
NUM2#engineering-u10-06-q4@2: A product's ideal assembly time is 30 s and the estimated actual time is 120 s. What is its design efficiency, in %? | 25 | 0.5 | % | Design efficiency = 30 ÷ 120 × 100 = 25%.
SA2#engineering-u10-06-q5@1,3: Evaluate the use of design for manufacture and assembly in a consumer product. | DFMA reduces part count, assembly time and cost, cuts inventory and supplier management, and often improves quality and reliability. Matching features to processes such as moulding reduces scrap and tooling problems. However, combining parts can raise tooling cost and complexity, and permanent joints may hinder repair, upgrading and recycling, conflicting with right-to-repair and circular economy goals. The best designs balance manufacturing efficiency with serviceability. | Part count ; Process fit ; Quality ; Tooling cost ; Repair and recycling

## Factors of safety and design codes
LV: Year 1 · Intermediate
S: Engineers cannot know loads and strengths exactly, so they design with margins. This lesson explains factors of safety, limit state design with partial factors, and the role of codes and standards.
O: Define and calculate a factor of safety
O: Explain limit state design and partial safety factors
O: Describe the purpose of design codes and the legal duties they support
PRE: Failure theories
H: Factors of safety
- A **factor of safety** is the ratio of the capacity of a component to the demand on it, for example failure stress ÷ working stress.
- Example: steel with a yield strength of 250 MPa working at 100 MPa has a factor of safety of 250 ÷ 100 = 2.5.
- Factors of safety allow for uncertainty in loads, material properties, dimensions, analysis and deterioration.
- Larger factors are used where failure has severe consequences or uncertainty is high; aerospace uses smaller factors with rigorous testing to save weight.
H: Limit state design
- **Limit state design**, used in the Eurocodes, checks that a structure does not reach an **ultimate limit state** (collapse or rupture) or a **serviceability limit state** (excessive deflection, vibration or cracking).
- **Partial factors** are applied separately: loads are multiplied by factors (for example about 1.35 for permanent and 1.5 for variable actions in building design) and material strengths divided by factors.
- This targets uncertainty where it arises, rather than using one overall factor.
H: Codes and standards
P: **Design codes** such as the Eurocodes, published in the UK as BS EN standards with UK National Annexes, and product standards such as those for pressure vessels and lifting equipment, capture accumulated experience in agreed methods. Complying with relevant standards helps meet legal duties, such as those under the Health and Safety at Work etc. Act 1974 and product safety regulations. Codes do not replace judgement: engineers remain responsible for checking assumptions, especially for novel designs.
E: Factor of safety = capacity ÷ demand :: overall factor
X: A lifting hook.
> A hook made from steel with yield strength 350 MPa has a maximum working stress of 140 MPa.
> Its factor of safety against yield is 350 ÷ 140 = 2.5.
> Because a falling load could kill, the standard for lifting equipment requires proof testing above the working load.
> Each hook is proof-load tested and marked with its safe working load.
K: A factor of safety is capacity divided by demand and covers uncertainty; limit state design applies partial factors to loads and strengths at ultimate and serviceability limits; codes capture experience and support legal duties but do not replace judgement.
!: Thinking a factor of safety of 2 means a part can always carry twice the load. Fatigue, corrosion and other failure modes can reduce real margins.
EV: established | Partial factor limit state design is the basis of European structural design codes.
T: Factor of safety | The ratio of a component's capacity to the demand placed on it
T: Ultimate limit state | A condition of collapse or rupture that must not be reached
T: Serviceability limit state | A condition such as excessive deflection that impairs use
SUM: Capacity ÷ demand.
SUM: Partial factors at limit states.
SUM: Codes support, not replace, judgement.
SRC: BSI, BS EN 1990:2002+A1:2005 Eurocode: Basis of structural design | standard | 2005
SRC: Health and Safety at Work etc. Act 1974 | legislation | 1974 | https://www.legislation.gov.uk/ukpga/1974/37
Q: What is the difference between ultimate and serviceability limit states? | Ultimate limit states involve collapse or rupture; serviceability limit states involve problems such as excessive deflection that affect use.
Q: Why are factors of safety used? | To allow for uncertainty in loads, material properties, dimensions, analysis and deterioration.
M1#engineering-u10-07-q1@1: Which design code family is used for structures in the UK? | The Eurocodes, published as BS EN standards | BS 8888, the standard for technical drawings | ISO 9001, the quality management standard | BS 7671, the wiring regulations | Eurocodes with UK National Annexes govern structural design.
M2#engineering-u10-07-q2@2: Why might an aircraft use a lower factor of safety than a crane hook? | Extensive testing reduces uncertainty, and weight is critical | Aircraft failures have less serious consequences than hook failures | Aircraft loads are known exactly so no margin is needed | Crane hooks are never tested before they are used | Rigorous analysis and testing justify smaller margins where weight matters.
M3#engineering-u10-07-q3@3: A beam is strong enough but deflects so much that plaster cracks. Which limit state is exceeded? | Serviceability limit state | Ultimate limit state | Fatigue limit state only | No limit state | Excessive deflection affects use rather than causing collapse.
NUM1#engineering-u10-07-q4@1: A steel with yield strength 250 MPa works at 100 MPa. What is the factor of safety against yield? | 2.5 | 0.05 | – | Factor of safety = 250 ÷ 100 = 2.5.
SA2#engineering-u10-07-q5@1,3: Explain why engineers use factors of safety and how limit state design improves on a single overall factor. | Loads, material strengths, dimensions and analysis all carry uncertainty, and components deteriorate, so designs include a margin between capacity and demand. A single factor treats all uncertainty together. Limit state design applies partial factors to loads and material strengths separately, reflecting where uncertainty lies, and checks both ultimate and serviceability limit states. This gives more consistent reliability and economy, as set out in the Eurocodes. | Sources of uncertainty ; Overall factor ; Partial factors ; Limit states ; Consistency and economy

## Bolted and welded joints
LV: Year 1 · Intermediate
S: Most machines and structures are held together by bolts or welds. This lesson explains how bolted and welded joints carry load, how to check them in simple cases, and their typical failure modes.
O: Describe how bolted joints carry load in shear and tension, including preload
O: Calculate shear stress in a bolt and stress in a fillet weld
O: Compare bolted and welded joints and their failure modes
PRE: Shear stress and strain
H: Bolted joints
- Bolts carry load in **shear**, where plates try to slide, or in **tension**, where plates try to separate.
- In a **bearing-type** joint, the bolt shank carries shear; average shear stress = force ÷ (number of shear planes × bolt area).
- In a **preloaded (friction-grip)** joint, tightening clamps the plates so load is carried by friction; preload also improves fatigue resistance and stops loosening.
- Failure modes include bolt shear, bearing failure of the plate, plate tearing, thread stripping and loosening under vibration.
H: Welded joints
- **Butt welds** join plates in line; full-penetration butt welds can match the strength of the parent plate.
- **Fillet welds** join plates at an angle; their strength is based on the **throat**, about 0.707 × leg length for an equal-leg weld.
- Fillet weld stress is approximately load ÷ (throat × weld length).
- Welding causes **heat-affected zones**, residual stresses and distortion, and welds are common sites for **fatigue** cracks.
H: Choosing a joint
P: Bolted joints can be dismantled, need no skilled welding on site and are easy to inspect, but need holes that reduce the section and can loosen. Welded joints are rigid, compact and watertight, but need skilled welders, quality control and inspection, and introduce residual stress and fatigue-sensitive details. Steel structures in the UK are designed to BS EN 1993-1-8, which covers both. Many structures are welded in the factory and bolted on site.
E: τ = F ÷ (n × A) :: average shear stress in bolts
E: Throat = 0.707 × leg length :: equal-leg fillet weld
X: A bracket bolt.
> A bracket is held by one 10 mm diameter bolt in single shear carrying 10 kN.
> The bolt's area is π × 5^{2} = 78.5 mm^{2}.
> Average shear stress is 10,000 ÷ 78.5 = 127 MPa.
> This is compared with the bolt's design shear strength, which includes a partial factor.
K: Bolts carry shear or tension, with preload giving friction grip and fatigue resistance; fillet welds are sized on the throat of 0.707 × leg; bolted joints can be dismantled while welded joints are rigid but fatigue-sensitive.
!: Using the fillet weld's leg length rather than its throat when calculating weld stress. The throat is the critical section.
EV: established | Preloading bolts significantly improves the fatigue life of bolted joints under cyclic loading.
T: Preload | Tension applied to a bolt during tightening that clamps the joint
T: Fillet weld throat | The shortest distance from the root to the face of a fillet weld
T: Heat-affected zone | The region of parent metal whose properties are altered by welding heat
SUM: Bolts in shear or tension; preload helps.
SUM: Size fillet welds on the throat.
SUM: Bolt for dismantling; weld for rigidity.
SRC: BSI, BS EN 1993-1-8:2005 Eurocode 3: Design of steel structures. Design of joints | standard | 2005
SRC: Budynas R. G. and Nisbett J. K., Shigley's Mechanical Engineering Design, 11th edition, McGraw Hill | secondary | 2020
Q: Why are bolts preloaded? | To clamp the joint so it carries load by friction, resist loosening and improve fatigue life.
Q: What is the throat of an equal-leg fillet weld? | About 0.707 times the leg length.
M1#engineering-u10-08-q1@1: Which weld type joins two plates in line, edge to edge? | A butt weld | A fillet weld at a corner | A spot weld on lapped sheets | A plug weld through a hole | Butt welds join plates in the same plane.
M2#engineering-u10-08-q2@2: Why are welded details often critical for fatigue? | Welds create stress concentrations, defects and residual stresses | Welds are always weaker in static tension than bolts | Welding removes all stress from a joint | Welds cannot be used in steel structures | Crack initiation is likely at weld toes and defects.
M3#engineering-u10-08-q3@3: A walkway must be dismantled for maintenance each year. Which joint is most suitable? | Bolted joints | Full-penetration welds | Adhesive bonds that cannot be reversed | Riveted joints that must be drilled out | Bolts allow repeated dismantling and reassembly.
NUM2#engineering-u10-08-q4@2: A fillet weld has a leg length of 8 mm. What is its throat thickness, in mm? | 5.66 | 0.02 | mm | Throat = 0.707 × 8 = 5.66 mm.
SA2#engineering-u10-08-q5@1,3: Compare bolted and welded joints for a steel frame. | Bolted joints can be dismantled, are quick to assemble on site without skilled welders and are easy to inspect, but holes reduce section and joints can loosen or slip unless preloaded. Welded joints are rigid, compact and sealed, and full-penetration welds can match parent strength, but need skilled labour, inspection and controlled conditions, and introduce residual stress, distortion and fatigue-sensitive details. Common practice is to weld in the factory and bolt on site. | Dismantling ; Site work ; Strength and rigidity ; Fatigue and residual stress ; Typical practice

## Shafts and bearings
LV: Year 1 · Intermediate
S: Shafts transmit power by rotating, and bearings support them. This lesson covers sizing shafts for torque and combined loads, stress concentrations, and the selection and life of rolling bearings.
O: Calculate shaft torque from power and speed
O: Describe the combined loading and fatigue design of shafts
O: Compare bearing types and calculate rolling bearing life
PRE: Torsion of circular shafts
H: Shafts
- Power and torque are linked by P = Tω, with ω = 2πN ÷ 60 for speed N in rpm.
- Example: 10 kW at 1,500 rpm gives ω = 157.1 rad/s and T = 10,000 ÷ 157.1 = 63.7 N m.
- Shafts usually carry **torsion** from the power and **bending** from gears, pulleys and their own weight, so stresses are combined using a failure theory.
- Because the shaft rotates, bending stress reverses each revolution, so **fatigue** governs design.
- **Stress concentrations** at shoulders, keyways and grooves are reduced with generous fillet radii.
H: Bearings
- **Plain (journal) bearings** use a lubricant film; they are quiet, compact and carry high loads, but need good lubrication.
- **Rolling element bearings** use balls or rollers: **deep-groove ball bearings** carry radial and some axial load; **tapered roller bearings** carry heavy combined loads; **thrust bearings** carry axial load.
- Bearings are arranged with one **locating** bearing and one **floating** bearing to allow thermal expansion.
H: Bearing life
P: Rolling bearings eventually fail by fatigue of the raceways. The **basic rating life** L10 is the life in millions of revolutions that 90% of a group of identical bearings will reach. For ball bearings, L10 = (C ÷ P)^{3}, where C is the basic dynamic load rating and P the equivalent dynamic load; for roller bearings the exponent is 10/3. Doubling the load therefore reduces ball bearing life by a factor of eight. Contamination and poor lubrication reduce real life, so seals and correct lubrication matter.
E: P = Tω :: power from torque and angular speed
E: L10 = (C ÷ P)^{3} :: ball bearing life in millions of revolutions
X: Selecting a bearing.
> A gearbox shaft carries an equivalent radial load of 5 kN at 1,000 rpm.
> A deep-groove ball bearing has a dynamic load rating of 20 kN.
> L10 = (20 ÷ 5)^{3} = 64 million revolutions, or about 1,070 hours at 1,000 rpm.
> The designer checks this meets the required life with suitable lubrication and seals.
K: Shaft torque follows P = Tω; shafts carry combined bending and torsion and are designed against fatigue with attention to stress concentrations; bearing life L10 = (C ÷ P)^{3} for ball bearings, so life falls steeply with load.
!: Designing a rotating shaft for static bending only. Bending stress reverses every revolution, so fatigue usually governs.
EV: established | Rolling bearing life is described statistically, with the L10 life reached or exceeded by 90% of bearings.
T: Basic rating life L10 | The life in millions of revolutions that 90% of identical bearings reach
T: Dynamic load rating | The constant load a bearing can carry for one million revolutions at L10
T: Stress concentration | A local rise in stress at a change in geometry
SUM: P = Tω.
SUM: Fatigue governs rotating shafts.
SUM: L10 = (C ÷ P)^{3} for ball bearings.
SRC: International Organization for Standardization, ISO 281:2007 Rolling bearings: dynamic load ratings and rating life | standard | 2007
SRC: Budynas R. G. and Nisbett J. K., Shigley's Mechanical Engineering Design, 11th edition, McGraw Hill | secondary | 2020
Q: What does L10 life mean? | The life in millions of revolutions that 90% of identical bearings will reach or exceed.
Q: Why are generous fillet radii used at shaft shoulders? | To reduce stress concentrations that cause fatigue cracks.
M1#engineering-u10-09-q1@1: Which bearing type mainly carries heavy combined radial and axial loads? | A tapered roller bearing | A plain bushing with no lubrication | A thrust washer only | A deep-groove ball bearing at light load | Tapered rollers support large combined loads.
M2#engineering-u10-09-q2@2: Why is one bearing on a shaft arranged to float axially? | To allow thermal expansion without loading the bearings | To make the shaft rotate faster | To remove the need for any lubrication | To increase the bending stress in the shaft | A floating bearing prevents axial stress from thermal growth.
M3#engineering-u10-09-q3@3: The load on a ball bearing doubles. What happens to its L10 life? | It falls to one-eighth | It halves | It stays the same | It doubles | Life varies with (C ÷ P) cubed, so doubling P divides life by eight.
NUM2#engineering-u10-09-q4@2: A shaft transmits 10 kW at 1,500 rpm. What is the torque, in N m? | 63.7 | 0.2 | N m | ω = 2π × 1,500 ÷ 60 = 157.1 rad/s; T = 10,000 ÷ 157.1 = 63.7 N m.
SA2#engineering-u10-09-q5@1,3: Describe how an engineer designs a shaft carrying a gear and a pulley. | Calculate torque from power and speed using P = Tω. Find the bending moments from gear and belt forces and draw bending moment diagrams. Combine bending and torsional stresses using a failure theory, allowing for reversed bending and fatigue. Apply stress concentration factors at shoulders and keyways and use generous radii. Check deflection and critical speed, select bearings for the loads and required life, and arrange locating and floating bearings. | Torque ; Bending ; Combined stress and fatigue ; Stress concentrations ; Bearings and deflection

## Gears and power transmission
LV: Year 1 · Intermediate
S: Gears, belts and chains transmit power between shafts while changing speed and torque. This lesson explains gear types, gear ratios and trains, and compares gears with belt and chain drives.
O: Describe the main types of gear and their uses
O: Calculate gear ratios, output speed and torque, including efficiency
O: Compare gear, belt and chain drives
PRE: Power and efficiency
H: Gear types
- **Spur gears**: straight teeth on parallel shafts; simple but noisy at high speed.
- **Helical gears**: angled teeth for smoother, quieter running, but they create axial thrust.
- **Bevel gears**: connect intersecting shafts, often at right angles.
- **Worm gears**: give large reductions in one stage between perpendicular shafts, but with lower efficiency and often self-locking.
- **Epicyclic (planetary) gears**: compact, high-ratio trains used in vehicle transmissions and wind turbines.
- Most gears use **involute** tooth profiles, which give a constant speed ratio.
H: Ratios and trains
- Gear ratio = driven teeth ÷ driver teeth. A 20-tooth pinion driving a 60-tooth gear gives a ratio of 3.
- Output speed = input speed ÷ ratio; output torque = input torque × ratio × efficiency.
- In a **compound train**, the overall ratio is the product of the stage ratios.
- An **idler** gear changes direction but not the ratio.
H: Belts and chains
P: **Belt drives** are cheap, quiet and absorb shock, and can span long distances, but can slip unless toothed timing belts are used. **Chain drives** do not slip and carry high loads, but need lubrication and are noisier. **Gears** are compact, precise and efficient (spur gears can exceed 98% per stage) and suit high power, but need accurate alignment and lubrication. Gear teeth are designed against **bending fatigue** at the tooth root and **surface pitting** from contact stress, using standards such as ISO 6336.
E: Gear ratio = driven teeth ÷ driver teeth :: simple gear pair
E: Output torque = input torque × ratio × efficiency :: gear pair
X: A conveyor drive.
> A motor runs at 1,500 rpm with a torque of 20 N m.
> A 20-tooth pinion drives a 60-tooth gear, a ratio of 3.
> The output speed is 1,500 ÷ 3 = 500 rpm.
> With 97% efficiency, output torque is 20 × 3 × 0.97 = 58.2 N m.
K: Spur, helical, bevel, worm and epicyclic gears suit different shaft layouts; ratio equals driven over driver teeth, reducing speed and increasing torque less losses; belts are cheap and quiet, chains positive, and gears compact and efficient.
!: Thinking a gear reduction increases power. It trades speed for torque, and power falls slightly through losses.
EV: established | Well-made spur and helical gear stages typically achieve efficiencies of around 97 to 99%.
T: Gear ratio | The ratio of driven to driver teeth, or input to output speed
T: Epicyclic gear train | A gear train with planet gears orbiting a central sun gear
T: Involute profile | The standard gear tooth shape that gives a constant speed ratio
SUM: Choose the gear type for the layout.
SUM: Ratio trades speed for torque.
SUM: Belts, chains and gears each suit different needs.
SRC: International Organization for Standardization, ISO 6336-1:2019 Calculation of load capacity of spur and helical gears | standard | 2019
SRC: Childs P. R. N., Mechanical Design Engineering Handbook, 2nd edition, Butterworth-Heinemann | secondary | 2018
Q: Why do helical gears run more quietly than spur gears? | Their angled teeth engage gradually rather than all at once.
Q: What does an idler gear do in a gear train? | It changes the direction of rotation without changing the ratio.
M1#engineering-u10-10-q1@1: Which gear type connects shafts that intersect at right angles? | Bevel gears | Spur gears on parallel shafts | A pair of helical gears in line | A belt on two parallel pulleys | Bevel gears transmit motion between intersecting shafts.
M2#engineering-u10-10-q2@2: Why is a worm drive often chosen for a lifting winch? | It gives a large reduction and is often self-locking | It is the most efficient gear type of all | It requires no lubrication at any time | It increases the output speed greatly | Self-locking stops the load running back.
M3#engineering-u10-10-q3@3: A compound train has stages of 3 and 4. What is the overall ratio? | 12 | 7 | 1.33 | 0.75 | Overall ratio is the product of the stage ratios.
NUM2#engineering-u10-10-q4@2: A 1,500 rpm motor drives a 20-tooth pinion meshing with a 60-tooth gear. What is the output speed, in rpm? | 500 | 1 | rpm | Ratio = 60 ÷ 20 = 3, so output speed = 1,500 ÷ 3 = 500 rpm.
SA2#engineering-u10-10-q5@1,3: Compare gear, belt and chain drives for transmitting power in a machine. | Gears are compact, precise and highly efficient, carry high power and give exact ratios, but need accurate alignment, lubrication and are costlier. Belts are cheap, quiet, tolerate misalignment and absorb shock, and can span longer distances, but can slip unless toothed. Chains give a positive drive and carry high loads at lower cost than gears but are noisier and need lubrication and tensioning. The choice depends on power, distance, precision, cost and maintenance. | Gears ; Belts ; Chains ; Efficiency and precision ; Selection factors

## Casting and forming
LV: Year 1 · Intermediate
S: Many metal parts are shaped by casting molten metal or by deforming solid metal. This lesson describes the main casting and forming processes, their typical uses and defects, and how designers choose between them.
O: Describe sand casting, die casting and investment casting
O: Describe forging, rolling, extrusion and sheet metal forming
O: Compare casting and forming in terms of properties, cost and volume
PRE: Metals and alloys
H: Casting
- **Sand casting**: molten metal is poured into a sand mould made around a pattern; it suits large parts and low volumes, with a rough finish.
- **Die casting**: molten metal, often aluminium or zinc, is injected into a steel die under pressure; high tooling cost but fast and accurate for high volumes.
- **Investment (lost-wax) casting**: a wax pattern is coated in ceramic and melted out; it gives complex, accurate parts such as turbine blades.
- Defects include **shrinkage porosity**, gas porosity, cold shuts and misruns; designs need **draft**, uniform sections and allowances for shrinkage.
H: Forming
- **Forging** shapes hot or cold metal by compressive force, refining grain flow and giving high strength and toughness, as in crankshafts and connecting rods.
- **Rolling** reduces thickness to make plate, sheet and sections.
- **Extrusion** pushes metal through a die to make constant cross-sections such as aluminium window frames.
- **Sheet metal forming** includes bending, deep drawing and stamping, used for car body panels.
- **Hot working** above the recrystallisation temperature needs less force; **cold working** gives better finish and accuracy and work-hardens the metal.
H: Choosing a process
P: Casting can make complex shapes, including internal cavities, in a single step, but may contain porosity and has lower toughness than wrought metal. Forming produces stronger, tougher parts with favourable grain flow, but shapes are more limited and tooling can be costly. The choice depends on shape complexity, material, mechanical properties needed, production volume, tolerances and cost. High tooling costs are justified only at high volumes, where they are spread over many parts.
E: Cost per part = tooling cost ÷ quantity + variable cost per part :: tooling amortisation
X: A connecting rod.
> An engine designer needs a strong connecting rod that resists fatigue.
> Casting would be cheaper per part, but porosity could start fatigue cracks.
> The rod is hot forged so the grain flow follows its shape, then machined at the bearing bores.
> Tooling costs are spread over hundreds of thousands of engines.
K: Sand, die and investment casting shape molten metal and suit complex shapes; forging, rolling, extrusion and sheet forming shape solid metal and give stronger, tougher parts; choice depends on complexity, properties, volume and cost.
!: Assuming a cast part is as strong as a forged one in the same alloy. Porosity and coarser structure usually make castings weaker in fatigue.
EV: established | Forged components generally show better fatigue resistance and toughness than equivalent castings because of refined grain structure and fewer defects.
T: Investment casting | Casting using a wax pattern coated in ceramic, which is melted out to leave a mould
T: Forging | Shaping metal by compressive force, usually with dies
T: Cold working | Plastic deformation below the recrystallisation temperature, causing work hardening
SUM: Cast for complexity.
SUM: Form for strength.
SUM: Volume justifies tooling.
SRC: Kalpakjian S. and Schmid S. R., Manufacturing Engineering and Technology, 8th edition, Pearson | secondary | 2020
SRC: Ashby M. F., Materials Selection in Mechanical Design, 5th edition, Butterworth-Heinemann | secondary | 2017
Q: Why are draft angles needed on cast parts? | So the pattern or part can be removed from the mould.
Q: What is the benefit of grain flow in forged parts? | It follows the part's shape, improving strength, toughness and fatigue resistance.
M1#engineering-u10-11-q1@1: Which process makes long aluminium window frame sections? | Extrusion | Sand casting of each frame | Investment casting in ceramic | Deep drawing from sheet | Extrusion produces constant cross-sections.
M2#engineering-u10-11-q2@2: Which casting process is best for complex, accurate turbine blades? | Investment casting | Sand casting with a rough finish | Simple open-mould gravity casting | Hand forging on an anvil | Lost-wax casting gives fine detail and accuracy.
M3#engineering-u10-11-q3@3: A firm needs 50 large pump housings. Which process is most economical? | Sand casting | High-pressure die casting with steel dies | Closed-die forging with costly dies | Precision investment casting of each part | Sand moulds are cheap, suiting large parts in low volumes.
NUM2#engineering-u10-11-q4@2: A die costs £60,000 and each casting costs £4 in materials and labour. What is the cost per part for 20,000 parts, in £? | 7 | 0.01 | £ | Cost per part = 60,000 ÷ 20,000 + 4 = 3 + 4 = £7.
SA2#engineering-u10-11-q5@1,3: Compare casting and forging for making a steel crankshaft. | Casting can produce complex shapes near final form with lower tooling cost, but risks porosity and has a coarser structure, lowering fatigue strength and toughness. Forging aligns grain flow with the shape and closes internal voids, giving higher strength, toughness and fatigue resistance, which matter for a crankshaft under cyclic loads, but needs expensive dies and more machining. For high-performance or high-volume engines, forging is usually preferred; castings may suit lower-stressed applications. | Shape and cost ; Defects ; Grain flow ; Fatigue ; Choice

## Machining processes
LV: Year 1 · Intermediate
S: Machining removes material to produce accurate shapes and fine finishes. This lesson describes turning, milling, drilling and grinding, the main cutting parameters, and the role of CNC.
O: Describe turning, milling, drilling and grinding
O: Calculate cutting speed and spindle speed
O: Explain the role of CNC and CAM and factors affecting tool life
PRE: Casting and forming
H: Processes
- **Turning**: the workpiece rotates on a lathe while a single-point tool cuts, producing cylindrical parts.
- **Milling**: a rotating multi-tooth cutter removes material from a workpiece, producing flat faces, slots and pockets.
- **Drilling**: produces holes; reaming and boring improve size and finish.
- **Grinding**: abrasive wheels give very fine finishes and tight tolerances, often after heat treatment.
- **Non-traditional** processes include electrical discharge machining (EDM), laser and waterjet cutting.
H: Cutting parameters
- **Cutting speed** V is the surface speed of the cut, in m/min: V = πDN ÷ 1000, with D in mm and N in rpm.
- Example: a 50 mm diameter bar turned at 800 rpm has V = π × 50 × 800 ÷ 1000 = 125.7 m/min.
- **Feed** and **depth of cut** set the material removal rate.
- Recommended speeds depend on workpiece and tool materials: harder materials need lower speeds.
H: Tool life and CNC
P: Tools wear by abrasion, adhesion, diffusion and chipping. **Taylor's tool life equation**, VT^{n} = C, shows that tool life T falls sharply as cutting speed rises. Coolants reduce heat and wear. **Computer numerical control (CNC)** machines follow programmed toolpaths, often generated by **CAM** software from the CAD model, giving repeatable accuracy and complex shapes with multi-axis machining. Machining is flexible and accurate but wastes material as chips, so it is often combined with near-net-shape processes such as casting, forging or additive manufacturing.
E: V = πDN ÷ 1000 :: cutting speed in m/min
E: VT^{n} = C :: Taylor's tool life equation
X: Turning a shaft.
> A machinist turns a 50 mm diameter steel bar.
> The recommended cutting speed for the tool is about 125 m/min.
> Spindle speed N = 1000V ÷ πD = 1000 × 125 ÷ (π × 50), about 800 rpm.
> Running much faster would wear the tool quickly, as Taylor's equation predicts.
K: Turning, milling, drilling and grinding remove material accurately; cutting speed V = πDN ÷ 1000 sets spindle speed; tool life falls steeply with speed (Taylor's equation); CNC and CAM give repeatable complex shapes but machining wastes material.
!: Setting spindle speed without considering diameter. The same rpm gives a much higher cutting speed on a larger diameter.
EV: established | Taylor's tool life relationship describes the steep fall in tool life as cutting speed increases.
T: Cutting speed | The relative surface speed between tool and workpiece, in m/min
T: CNC | Computer numerical control of machine tools from programmed instructions
T: Material removal rate | The volume of material removed per unit time
SUM: Turn, mill, drill and grind.
SUM: V = πDN ÷ 1000.
SUM: Faster cutting shortens tool life.
SRC: Taylor F. W., "On the art of cutting metals", Transactions of the American Society of Mechanical Engineers 28, 31–350 | primary | 1907
SRC: Kalpakjian S. and Schmid S. R., Manufacturing Engineering and Technology, 8th edition, Pearson | secondary | 2020
Q: What is the difference between turning and milling? | In turning the workpiece rotates against a stationary tool; in milling a rotating multi-tooth cutter moves across the workpiece.
Q: What does Taylor's tool life equation show? | Tool life decreases sharply as cutting speed increases.
M1#engineering-u10-12-q1@1: Which process gives the finest finish on a hardened shaft? | Grinding | Rough turning at high feed | Sand casting | Drilling a pilot hole | Abrasive grinding achieves tight tolerances on hard materials.
M2#engineering-u10-12-q2@2: Why do harder workpiece materials need lower cutting speeds? | Higher cutting temperatures and forces would wear tools rapidly | Hard materials cannot be machined at all | Lower speeds always increase material removal rate | Cutting speed has no effect on tool wear | Speed is limited by heat and wear at the tool tip.
M3#engineering-u10-12-q3@3: What is the main drawback of machining a part entirely from solid billet? | Much of the material is wasted as chips | Accuracy is always poor | Complex shapes are impossible with CNC | Machined parts cannot be measured | Near-net-shape processes reduce waste and machining time.
NUM2#engineering-u10-12-q4@2: A 50 mm diameter bar is turned at 800 rpm. What is the cutting speed, in m/min? | 125.7 | 0.5 | m/min | V = π × 50 × 800 ÷ 1000 = 125.7 m/min.
SA2#engineering-u10-12-q5@1,3: Explain how CNC machining and CAM have changed manufacturing. | CNC machines follow programmed toolpaths, giving repeatable accuracy, complex multi-axis shapes and reduced reliance on manual skill. CAM software generates toolpaths directly from CAD models, shortening the time from design to part and allowing simulation to avoid collisions. This supports small batches and rapid changes. However, CNC needs programming skills and capital investment, and machining still wastes material and depends on tool life and cutting parameters. | Repeatability ; Complex shapes ; CAD to CAM ; Flexibility ; Costs and limits

## Additive manufacturing
LV: Year 1 · Intermediate
S: Additive manufacturing builds parts layer by layer from digital models. This lesson describes the main additive processes, their advantages and limitations, and where they are used in industry.
O: Describe the main categories of additive manufacturing processes
O: Explain the design freedoms and limitations of additive manufacturing
O: Evaluate where additive manufacturing is economical
PRE: Polymers
H: Processes
- ISO/ASTM 52900 groups additive manufacturing into seven categories, including:
- **Material extrusion**: fused filament fabrication, where molten polymer is deposited through a nozzle.
- **Vat photopolymerisation**: stereolithography, curing liquid resin with light.
- **Powder bed fusion**: a laser or electron beam fuses polymer or metal powder, for example selective laser sintering and laser powder bed fusion of metals.
- **Material jetting**, **binder jetting**, **directed energy deposition** and **sheet lamination**.
H: Design freedom and limits
- Additive manufacturing can make **complex internal channels**, **lattices** and **topology-optimised** shapes that cannot be machined or cast.
- Several parts can be **consolidated** into one printed part.
- Limitations include anisotropic properties (weaker between layers), surface roughness, porosity, the need for **support structures**, residual stress in metals, limited build size and slow build rates.
- Most metal parts need post-processing: support removal, heat treatment, machining of critical surfaces and inspection.
H: Uses and economics
P: Additive manufacturing is widely used for **prototyping**, custom medical implants and dental aligners, tooling, spare parts and low-volume, high-value aerospace components such as fuel nozzles that consolidate many parts into one. Because it needs no tooling, cost per part is roughly constant with volume, so it is economical at **low volumes** or for highly complex parts, while conventional processes become cheaper at high volumes. Qualification of printed parts for safety-critical use requires careful process control and testing.
E: Number of layers = build height ÷ layer thickness :: layer count
X: A consolidated fuel nozzle.
> An aero-engine fuel nozzle was originally assembled from around 20 separate parts.
> Redesigned for laser powder bed fusion, it is printed as a single part with internal cooling channels.
> The new nozzle is lighter and more durable, with fewer joints to fail.
> Each nozzle is heat-treated, inspected by CT scanning and machined at its interfaces.
K: Additive manufacturing builds parts layer by layer in categories such as material extrusion, vat photopolymerisation and powder bed fusion; it enables complex, consolidated designs but brings anisotropy, porosity and post-processing, and is most economical at low volumes or high complexity.
!: Assuming 3D printing will replace mass production. For simple parts in high volumes, moulding and casting remain far cheaper.
EV: established | Without tooling costs, additive manufacturing is most competitive for low production volumes and highly complex geometries.
T: Powder bed fusion | An additive process that fuses regions of a powder layer with a laser or electron beam
T: Topology optimisation | A computational method that places material only where loads require it
T: Anisotropy | Properties that differ with direction, such as between and within printed layers
SUM: Seven process categories.
SUM: Complexity is free; layers are weak.
SUM: Best at low volume or high complexity.
SRC: International Organization for Standardization and ASTM International, ISO/ASTM 52900:2021 Additive manufacturing: general principles and terminology | standard | 2021
SRC: Gibson I., Rosen D., Stucker B. and Khorasani M., Additive Manufacturing Technologies, 3rd edition, Springer | secondary | 2021
Q: Why are printed parts often weaker in the build direction? | Bonding between layers is weaker than within layers, causing anisotropy.
Q: Why is additive manufacturing economical at low volumes? | It needs no tooling, so cost per part does not depend much on volume.
M1#engineering-u10-13-q1@1: Which additive process cures liquid resin with light? | Vat photopolymerisation | Material extrusion of filament | Binder jetting of powder | Directed energy deposition of wire | Stereolithography is a vat photopolymerisation process.
M2#engineering-u10-13-q2@2: Why are support structures needed in many additive processes? | To hold overhanging features and conduct heat during the build | To make parts heavier and stronger | To replace the need for a digital model | To remove the layers after printing | Overhangs would sag or distort without support.
M3#engineering-u10-13-q3@3: For which part is additive manufacturing most suitable? | A low-volume titanium bracket with internal cooling channels | A million identical plastic bottle caps | A simple steel bolt made in huge numbers | A standard flat washer for general use | Complex, low-volume, high-value parts suit additive manufacturing.
NUM1#engineering-u10-13-q4@1: A part 30 mm tall is printed with 0.2 mm layers. How many layers are needed? | 150 | 0 | layers | Number of layers = 30 ÷ 0.2 = 150.
SA2#engineering-u10-13-q5@1,3: Evaluate the use of additive manufacturing for aerospace components. | Additive manufacturing allows complex, topology-optimised and lightweight parts with internal channels, consolidating many parts into one and reducing assembly and failure points, which saves fuel and weight. It suits low production volumes and rapid design changes. However, parts can be anisotropic and porous, need extensive post-processing and inspection, and qualifying them for safety-critical use is demanding and costly. Build rates and sizes are limited. It is valuable for selected high-value parts rather than all components. | Complexity and weight ; Part consolidation ; Low volume ; Defects and post-processing ; Qualification

## Quality, metrology and inspection
LV: Year 1 · Intermediate
S: Quality means meeting requirements consistently. This lesson covers measurement and its uncertainty, inspection methods, statistical process control and process capability, and quality management systems.
O: Explain accuracy, precision, uncertainty and calibration in measurement
O: Describe common inspection methods including non-destructive testing
O: Apply statistical process control and calculate process capability
PRE: Tolerances and fits
H: Measurement
- **Metrology** is the science of measurement.
- **Accuracy** is closeness to the true value; **precision** is closeness of repeated measurements to each other.
- Every measurement has **uncertainty**; a common rule of thumb is that the measuring instrument should be about ten times more precise than the tolerance being checked.
- **Calibration** against standards traceable to national standards, such as those held by the UK's National Physical Laboratory, keeps instruments accurate.
- Tools range from micrometers and gauges to **coordinate measuring machines (CMMs)** and optical scanners.
H: Inspection
- **Go/no-go gauges** quickly check whether features are within limits.
- **Non-destructive testing (NDT)** finds defects without damaging parts: visual, dye penetrant, magnetic particle, ultrasonic, radiography and eddy current testing.
- **Sampling** inspects a proportion of parts; 100% inspection is used where failure is critical.
H: Statistical process control and quality systems
P: **Statistical process control (SPC)** uses **control charts** to monitor a process over time, separating **common-cause** variation from **special-cause** variation that needs action. **Process capability** compares the spread of a process with its tolerance: Cp = (upper limit − lower limit) ÷ 6σ, and Cpk also accounts for how well the process is centred. A Cpk of at least 1.33 is a common target. Quality management systems such as **ISO 9001** set out requirements for documented processes, continual improvement and customer focus, and are widely required by customers.
E: Cp = (USL − LSL) ÷ 6σ :: process capability
X: A machined diameter.
> A shaft diameter has limits of 20.00 ± 0.03 mm, a tolerance band of 0.06 mm.
> SPC data show the process standard deviation is 0.008 mm and it is well centred.
> Cp = 0.06 ÷ (6 × 0.008) = 1.25.
> This is below the customer's target of 1.33, so the team works to reduce variation.
K: Measurement must be accurate, precise and calibrated with known uncertainty; inspection uses gauges, CMMs and NDT; SPC distinguishes common from special causes, and Cp and Cpk compare process spread with the tolerance, within quality systems such as ISO 9001.
!: Relying on final inspection to create quality. Quality comes from capable, controlled processes; inspection only detects problems.
EV: established | Statistical process control, developed by Walter Shewhart in the 1920s, remains a core method for controlling manufacturing variation.
T: Process capability | A measure of how well a process's natural variation fits within its tolerance
T: Non-destructive testing | Inspection methods that detect defects without damaging the part
T: Calibration | Comparing an instrument with a traceable standard to establish its accuracy
SUM: Accurate, precise, calibrated measurement.
SUM: Gauges, CMMs and NDT.
SUM: SPC and Cp keep processes capable.
SRC: International Organization for Standardization, ISO 9001:2015 Quality management systems: requirements | standard | 2015
SRC: Montgomery D. C., Introduction to Statistical Quality Control, 8th edition, Wiley | secondary | 2019
SRC: Shewhart W. A., Economic Control of Quality of Manufactured Product, Van Nostrand | primary | 1931
Q: What is the difference between accuracy and precision? | Accuracy is closeness to the true value; precision is closeness of repeated measurements to each other.
Q: What is the purpose of a control chart? | To monitor a process over time and detect special-cause variation needing action.
M1#engineering-u10-14-q1@1: Which NDT method uses high-frequency sound to find internal defects? | Ultrasonic testing | Visual inspection with a torch | Dye penetrant on the surface | A go/no-go plug gauge | Pulses of ultrasound reflect from internal flaws such as cracks.
M2#engineering-u10-14-q2@2: What does a point outside the control limits on an SPC chart suggest? | Special-cause variation that should be investigated | Normal common-cause variation only | That the tolerance is too loose | That the gauge needs no calibration | Points outside limits signal an assignable cause.
M3#engineering-u10-14-q3@3: Why does Cpk matter as well as Cp? | Cpk accounts for whether the process is centred within the tolerance | Cpk ignores the process spread entirely | Cp already includes centring automatically | Cpk measures only the cost of quality | A capable spread can still produce defects if it is off-centre.
NUM2#engineering-u10-14-q4@2: A tolerance band is 0.06 mm and the process standard deviation is 0.008 mm. What is Cp? | 1.25 | 0.01 | – | Cp = 0.06 ÷ (6 × 0.008) = 0.06 ÷ 0.048 = 1.25.
SA2#engineering-u10-14-q5@1,3: Explain how a manufacturer can ensure a machined feature consistently meets its tolerance. | Use calibrated instruments with uncertainty well below the tolerance and suitable methods such as gauges or a CMM. Measure samples and plot SPC control charts to detect special-cause variation and act on it. Calculate Cp and Cpk to check the process is capable and centred, and reduce variation through tooling, fixtures and settings if not. Operate within a quality management system such as ISO 9001 with documented procedures and continual improvement, rather than relying on final inspection. | Measurement ; SPC ; Capability ; Improvement ; Quality system

## Lean manufacturing and production systems
LV: Year 1 · Intermediate
S: Lean manufacturing aims to deliver value to customers with minimum waste. This lesson explains lean principles, the main wastes, tools such as takt time and kanban, and how production systems are measured.
O: Describe the principles of lean and the seven wastes
O: Calculate takt time and overall equipment effectiveness
O: Describe lean tools and evaluate the limits of lean
PRE: Quality, metrology and inspection
H: Lean principles
- Lean grew from the **Toyota Production System**; Womack and Jones described five principles: identify **value**, map the **value stream**, create **flow**, establish **pull** and pursue **perfection**.
- The **seven wastes** (muda): transport, inventory, motion, waiting, overproduction, over-processing and defects; unused talent is often added as an eighth.
- Production types range from **job** and **batch** to **flow** and continuous production.
H: Measures and tools
- **Takt time** = available production time ÷ customer demand. Example: 27,000 s available per shift and demand of 450 units gives 60 s per unit.
- **Overall equipment effectiveness (OEE)** = availability × performance × quality; for example 0.90 × 0.95 × 0.99 = 0.85 (85%).
- **Kanban** signals pull production; **just-in-time** delivers what is needed when needed.
- **5S** organises the workplace; **SMED** (single-minute exchange of die) shortens changeovers; **poka-yoke** prevents errors; **kaizen** drives continuous improvement.
H: Benefits and limits
P: Lean can cut lead times, inventory and defects, freeing cash and space and improving quality. It relies on stable demand, reliable suppliers and engaged workers. Very low inventories make supply chains vulnerable to disruption, as shortages during the COVID-19 pandemic and semiconductor supply problems showed, so many firms now hold strategic buffers. Lean also needs a culture of respect and problem-solving; copying tools without the culture rarely works. Industry 4.0 technologies, such as sensors and data analytics, are increasingly combined with lean.
E: Takt time = available time ÷ demand :: pace of production
E: OEE = availability × performance × quality :: equipment effectiveness
X: Balancing a line.
> A factory runs one 7.5-hour shift, or 27,000 seconds, and customers need 450 units a day.
> Takt time is 27,000 ÷ 450 = 60 s per unit.
> One station takes 75 s, creating a bottleneck and waiting downstream.
> The team splits its work across two operators and uses kanban cards to pull parts from the previous station.
K: Lean identifies value and removes the seven wastes through flow and pull; takt time sets the pace and OEE measures equipment effectiveness; tools include kanban, 5S, SMED and kaizen, but very low inventory can increase supply chain risk.
!: Treating lean as just cutting staff or inventory. Lean is about removing waste and improving flow with workers' involvement.
EV: contested | Lean improves efficiency in many settings, but debate continues over how much inventory buffering firms need for resilience.
T: Takt time | The available production time divided by customer demand
T: Overall equipment effectiveness | Availability × performance × quality for a machine or line
T: Kanban | A signal, often a card, that authorises production or movement of parts
SUM: Value, flow, pull; remove waste.
SUM: Takt time and OEE.
SUM: Balance efficiency with resilience.
SRC: Womack J. P. and Jones D. T., Lean Thinking, Simon and Schuster | primary | 1996
SRC: Ohno T., Toyota Production System: Beyond Large-Scale Production, Productivity Press | primary | 1988
Q: What are the seven wastes of lean? | Transport, inventory, motion, waiting, overproduction, over-processing and defects.
Q: What does SMED aim to do? | Reduce changeover times so that smaller batches are economical.
M1#engineering-u10-15-q1@1: Which lean tool organises the workplace in five steps? | 5S | SMED | Kanban | OEE | 5S stands for sort, set in order, shine, standardise and sustain.
M2#engineering-u10-15-q2@2: Which waste does making products before they are ordered represent? | Overproduction | Motion | Over-processing | Waiting | Overproduction creates excess inventory and hides problems.
M3#engineering-u10-15-q3@3: Why did some lean supply chains struggle during the COVID-19 pandemic? | Very low inventories left no buffer against supply disruption | Lean firms held far too much stock at all times | Kanban cards stopped working during lockdowns | Takt time cannot be calculated in a crisis | Minimal buffers make supply chains vulnerable to disruption.
NUM2#engineering-u10-15-q4@2: A machine has availability 0.90, performance 0.95 and quality 0.99. What is its OEE, in %? | 84.6 | 0.2 | % | OEE = 0.90 × 0.95 × 0.99 = 0.846, or 84.6%.
SA2#engineering-u10-15-q5@1,3: Evaluate the use of lean manufacturing in a car components factory. | Lean can shorten lead times, reduce inventory and defects, and free space and cash by removing waste and creating flow and pull with kanban and just-in-time delivery. Takt time aligns production with demand, and tools such as 5S, SMED and kaizen engage workers in improvement. However, low inventory increases vulnerability to supplier failure and demand shocks, and lean needs stable demand, reliable suppliers and a supportive culture. Firms may hold strategic buffers to balance efficiency with resilience. | Waste reduction ; Flow and pull ; Takt and tools ; Supply risk ; Culture and resilience
`;
