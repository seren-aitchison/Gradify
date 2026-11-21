"""School 2, Management and Organisational Behaviour: structure, motivation, teams, change."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u02-05", "bus-span-of-control", "bars", "Wider spans remove a layer",
   "With the same 64 staff below the chief executive, a span of 4 needs three levels and a span of 8 needs two. Each level multiplies by the span, so widening spans is the arithmetic behind delayering.",
   "Columns for a span of 4 (tall, three levels) and a span of 8 (flatter, two levels). Both reach 64 staff at the bottom.",
   ["Span of 4: 4 + 16 + 64, three levels below the chief executive.", "Span of 8: 8 + 64, two levels.", "In both, the bottom level is span to the power of the number of levels: 4³ = 8² = 64."],
   terms=["64 staff", "span of 4", "span of 8", "three levels", "two levels", "delayering"],
   kind="columns", range=[0, 9.5], series=[{"name": "Levels below the chief executive", "colour": "a2"}, {"name": "Span of control", "colour": "a1"}],
   categories=[{"label": "Span of 4 (tall)", "short": "Span of 4", "values": [{"id": "l4", "v": 3}, {"id": "s4", "v": 4}]},
               {"label": "Span of 8 (flatter)", "short": "Span of 8", "values": [{"id": "l8", "v": 2}, {"id": "s8", "v": 8}]}],
   relations=[{"expr": "s4 ^ l4", "equals": "64", "name": "span 4 over 3 levels reaches 64 staff (4 × 4 × 4)"},
              {"expr": "s8 ^ l8", "equals": "64", "name": "span 8 over 2 levels reaches 64 staff (8 × 8)"},
              {"expr": "s4 + s4 ^ 2 + s4 ^ 3", "equals": "84", "name": "4 + 16 + 64 = 84 people in all below the chief executive"}])

mk("u02-05", "bus-functional-structure", "orgchart", "A functional structure",
   "Grouping by specialism builds expertise: everyone in marketing reports into marketing. The chart has three levels, and the chief executive's span of control is three.",
   "Organisation chart with a chief executive over marketing, finance and operations, each with two teams.",
   ["Top: the chief executive.", "Second level: the heads of marketing, finance and operations, each a direct report, so the span is 3.", "Third level: two teams under each function."],
   terms=["Functional", "marketing, finance, operations", "Span of control", "Hierarchy"],
   nodes=[{"id": "ceo", "label": "Chief executive"},
          {"id": "mkt", "label": "Marketing", "parent": "ceo"}, {"id": "fin", "label": "Finance", "parent": "ceo"}, {"id": "ops", "label": "Operations", "parent": "ceo"},
          {"id": "m1", "label": "Brand team", "parent": "mkt"}, {"id": "m2", "label": "Sales team", "parent": "mkt"},
          {"id": "f1", "label": "Accounts", "parent": "fin"}, {"id": "f2", "label": "Payroll", "parent": "fin"},
          {"id": "o1", "label": "Production", "parent": "ops"}, {"id": "o2", "label": "Logistics", "parent": "ops"}],
   claims={"levels": 3, "spans": {"ceo": 3, "mkt": 2, "fin": 2, "ops": 2}})

mk("u02-09", "bus-maslow", "layers", "Maslow's hierarchy of needs",
   "Lower needs must be largely met before higher ones motivate, and a satisfied need no longer motivates. Read from the base upwards.",
   "A pyramid of five levels. From the base: physiological, safety, love and belonging, esteem, self-actualisation.",
   ["Base: physiological needs.", "Then safety.", "Then love and belonging.", "Then esteem.", "At the top: self-actualisation."],
   terms=["physiological", "safety", "love and belonging", "esteem", "self-actualisation"],
   shape="pyramid", count=5, arrowLabel="higher needs motivate once lower needs are largely met",
   expect=["Self-actualisation", "Esteem", "Love and belonging", "Safety", "Physiological"],
   items=[{"label": "Self-actualisation", "colour": "a5"}, {"label": "Esteem", "colour": "a1"}, {"label": "Love and belonging", "colour": "a4"}, {"label": "Safety", "colour": "a3"}, {"label": "Physiological", "colour": "a2"}])

mk("u02-09", "bus-herzberg", "blocks", "Herzberg: hygiene factors and motivators",
   "Good hygiene factors only stop people being dissatisfied; they do not motivate. The motivators are what create satisfaction, which is why job enrichment gives people more responsibility.",
   "Two boxes: hygiene factors (pay, working conditions, company policy, supervision, job security) and motivators (achievement, recognition, the work itself, responsibility, advancement).",
   ["Hygiene factors: pay, working conditions, company policy, supervision, job security. If poor they cause dissatisfaction; if good they only prevent it.", "Motivators: achievement, recognition, the work itself, responsibility, advancement. They create satisfaction and motivation."],
   terms=["Hygiene factors", "Motivators", "pay", "working conditions", "company policy", "supervision", "job security", "achievement", "recognition", "the work itself", "responsibility", "advancement"],
   cols=2, rows=1, cover=True, rowH=150, expect=["Hygiene factors", "Motivators"],
   blocks=[{"label": "Hygiene factors", "col": 0, "row": 0, "note": "Pay, working conditions, company policy, supervision, job security. Poor: dissatisfaction. Good: only prevents it.", "colour": "a3"},
           {"label": "Motivators", "col": 1, "row": 0, "note": "Achievement, recognition, the work itself, responsibility, advancement. These create satisfaction and motivation.", "colour": "good"}])

mk("u02-13", "bus-tuckman", "process", "Tuckman's stages of group development",
   "Groups move from polite uncertainty through conflict to agreed ways of working, then performance; the fifth stage, added in 1977, is when the group disbands.",
   "Five boxes in order: forming, storming, norming, performing, adjourning.",
   ["Forming: polite, uncertain, dependent on the leader.", "Storming: conflict over roles, goals and leadership.", "Norming: agreed ways of working and growing cohesion.", "Performing: focus on the task with high trust.", "Adjourning: the group disbands."],
   terms=["Forming", "Storming", "Norming", "Performing", "Adjourning"],
   kind="chain", expect=["Forming", "Storming", "Norming", "Performing", "Adjourning"],
   steps=[{"label": "Forming", "note": "polite, uncertain, leader-dependent"}, {"label": "Storming", "note": "conflict over roles and goals"}, {"label": "Norming", "note": "agreed ways of working"}, {"label": "Performing", "note": "task focus, high trust"}, {"label": "Adjourning", "note": "the group disbands"}])

mk("u02-17", "bus-force-field", "bars", "Force-field analysis of an electronic records change",
   "The drivers total 11 and the restrainers 10, so change is fragile. Training and protected learning time reduce two restrainers, which is what makes it secure.",
   "Two stacked columns: driving forces (fewer errors 4, regulatory pressure 4, faster access to records 3) total 11; restraining forces (staff fear of technology 4, time to learn 3, cost 3) total 10.",
   ["Driving forces: fewer errors 4, regulatory pressure 4, faster access to records 3: total 11.", "Restraining forces: staff fear of technology 4, time to learn 3, cost 3: total 10.", "Drivers narrowly outweigh restrainers, by 1."],
   terms=["driving forces", "restraining forces", "fewer errors", "regulatory pressure", "faster access to records", "staff fear of technology", "time to learn", "cost", "total 11", "total 10"],
   kind="stacked", range=[0, 13],
   stacks=[{"label": "Driving", "parts": [{"id": "d1", "label": "Fewer errors", "v": 4, "colour": "good"}, {"id": "d2", "label": "Regulation", "v": 4, "colour": "a4"}, {"id": "d3", "label": "Faster access", "v": 3, "colour": "a1"}]},
           {"label": "Restraining", "parts": [{"id": "r1", "label": "Fear of tech", "v": 4, "colour": "bad"}, {"id": "r2", "label": "Time to learn", "v": 3, "colour": "a3"}, {"id": "r3", "label": "Cost", "v": 3, "colour": "a2"}]}],
   relations=[{"expr": "d1 + d2 + d3", "equals": "11", "name": "driving forces total 11"}, {"expr": "r1 + r2 + r3", "equals": "10", "name": "restraining forces total 10"},
              {"expr": "d1 + d2 + d3 - r1 - r2 - r3", "equals": "1", "name": "drivers outweigh restrainers by 1"}])

mk("u02-03", "bus-mintzberg-roles", "blocks", "Mintzberg's ten managerial roles",
   "Mintzberg grouped what managers actually do into three families: roles that arise from formal authority, roles in handling information, and roles in making decisions.",
   "Three boxes of roles. Interpersonal: figurehead, leader, liaison. Informational: monitor, disseminator, spokesperson. Decisional: entrepreneur, disturbance handler, resource allocator, negotiator.",
   ["Interpersonal roles: figurehead, leader, liaison.", "Informational roles: monitor, disseminator, spokesperson.", "Decisional roles: entrepreneur, disturbance handler, resource allocator, negotiator.", "Together, ten roles."],
   terms=["Interpersonal roles", "Informational roles", "Decisional roles", "Figurehead", "Leader", "Liaison", "Monitor", "Disseminator", "Spokesperson", "Entrepreneur", "Disturbance handler", "Resource allocator", "Negotiator"],
   cols=3, rows=1, cover=True, rowH=190, expect=["Interpersonal roles", "Informational roles", "Decisional roles"],
   blocks=[{"label": "Interpersonal roles", "col": 0, "row": 0, "note": "Figurehead. Leader. Liaison.", "colour": "a1"},
           {"label": "Informational roles", "col": 1, "row": 0, "note": "Monitor. Disseminator. Spokesperson.", "colour": "a4"},
           {"label": "Decisional roles", "col": 2, "row": 0, "note": "Entrepreneur. Disturbance handler. Resource allocator. Negotiator.", "colour": "a3"}])

mk("u02-12", "bus-leadership-styles", "blocks", "Four leadership styles",
   "No style is best everywhere: the situation drives the choice. The same leader might tell everyone to leave in a fire alarm and let the team agree its own bank holiday rota.",
   "Four boxes: autocratic, democratic, laissez-faire and paternalistic, each with its strength and weakness.",
   ["Autocratic: the leader decides and tells; fast and clear, but can demotivate skilled staff.", "Democratic: the leader involves staff; builds commitment, but slower.", "Laissez-faire: decisions left to the group; suits skilled experts, often leads to drift.", "Paternalistic: the leader decides in what they see as staff's best interests; builds loyalty, can feel patronising."],
   terms=["Autocratic", "Democratic", "Laissez-faire", "Paternalistic", "Fast, clear", "Builds commitment", "drift", "patronising"],
   cols=2, rows=2, cover=True, rowH=120, expect=["Autocratic", "Democratic", "Laissez-faire", "Paternalistic"],
   blocks=[{"label": "Autocratic", "col": 0, "row": 0, "note": "Decides and tells. Fast and clear; can demotivate skilled staff.", "colour": "bad"},
           {"label": "Democratic", "col": 1, "row": 0, "note": "Involves staff. Builds commitment; slower.", "colour": "good"},
           {"label": "Laissez-faire", "col": 0, "row": 1, "note": "Leaves decisions to the group. Suits skilled experts; can drift.", "colour": "a1"},
           {"label": "Paternalistic", "col": 1, "row": 1, "note": "Decides in staff's best interests. Builds loyalty; can feel patronising.", "colour": "a5"}])

mk("u02-15", "bus-handy-cultures", "blocks", "Handy's four cultures",
   "Each culture has a picture and a trade-off: the power culture is fast but depends on one person, the role culture is stable but slow, the task culture is flexible but costly.",
   "Four boxes: power culture (a spider's web), role culture (a Greek temple), task culture (a net), person culture (barristers' chambers).",
   ["Power culture: a central figure controls, like a spider's web.", "Role culture: rules and procedures, like a Greek temple.", "Task culture: teams form around projects, like a net.", "Person culture: the organisation serves individuals, such as a barristers' chambers."],
   terms=["Power culture", "Role culture", "Task culture", "Person culture", "spider's web", "Greek temple", "net", "barristers' chambers"],
   cols=2, rows=2, cover=True, rowH=112, expect=["Power culture", "Role culture", "Task culture", "Person culture"],
   blocks=[{"label": "Power culture", "col": 0, "row": 0, "note": "Spider's web: a central figure controls. Fast, but depends on one person.", "colour": "a2"},
           {"label": "Role culture", "col": 1, "row": 0, "note": "Greek temple: rules and procedures. Stable but slow.", "colour": "a1"},
           {"label": "Task culture", "col": 0, "row": 1, "note": "Net: teams form around projects. Flexible and expert-led; costly.", "colour": "a4"},
           {"label": "Person culture", "col": 1, "row": 1, "note": "The organisation serves individuals, as in barristers' chambers.", "colour": "a5"}])

mk("u02-15", "bus-schein-levels", "layers", "Schein's three levels of culture",
   "Artefacts are easy to see but hard to interpret; basic assumptions are invisible but decisive. When espoused values and assumptions differ, behaviour follows the assumptions.",
   "Three stacked layers from the visible top to the hidden base: artefacts, espoused values, basic underlying assumptions.",
   ["Top, visible: artefacts such as dress, office layout, stories and rituals.", "Middle: espoused values, the stated values, strategies and goals.", "Base, invisible: basic underlying assumptions, the taken-for-granted beliefs that truly drive behaviour."],
   terms=["Artefacts", "Espoused values", "Basic underlying assumptions"],
   shape="stack", count=3, arrowLabel="from visible to invisible",
   expect=["Artefacts", "Espoused values", "Basic underlying assumptions"],
   items=[{"label": "Artefacts", "detail": "visible: dress, office layout, stories, rituals", "colour": "a4"}, {"label": "Espoused values", "detail": "stated values, strategies and goals", "colour": "a1"}, {"label": "Basic underlying assumptions", "detail": "invisible, taken for granted, and decisive", "colour": "a2"}])
