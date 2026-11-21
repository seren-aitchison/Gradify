"""School 9, Entrepreneurship and Innovation."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u09-03", "bus-build-measure-learn", "process", "The build–measure–learn loop",
   "A lean start-up builds the simplest thing that tests an assumption, measures what customers do and learns whether to continue or pivot. The meal-kit founder's 20 kits were the build; few repeat orders were the measurement.",
   "A cycle of three boxes: build a minimum viable product, measure customer behaviour, learn whether to continue, leading back to build.",
   ["Build a minimum viable product, the simplest version that tests a key assumption.", "Measure customer behaviour.", "Learn whether to continue or pivot, then build the next test."],
   terms=["build–measure–learn", "minimum viable product", "pivot", "validated learning"],
   kind="cycle", loop=True, expect=["Build", "Measure", "Learn"], centre="validated learning",
   steps=[{"label": "Build", "note": "a minimum viable product (MVP)"}, {"label": "Measure", "note": "what customers actually do"}, {"label": "Learn", "note": "continue, or pivot"}])

mk("u09-04", "bus-business-model-canvas", "blocks", "The business model canvas",
   "Nine blocks on one page. The right side covers value and customers; the left side covers efficiency and costs. Each block is an assumption to test. This one is the bike-subscription service.",
   "The nine blocks: key partnerships, key activities, key resources, value propositions, customer relationships, channels, customer segments, with cost structure and revenue streams along the bottom.",
   ["Customer segments: students and young professionals in a city.", "Value proposition: a working bike for a monthly fee, with free repairs.", "Channels and relationships: app sign-up and home repair visits.", "Revenue: monthly subscription.", "Key resources: bikes and mechanics. Key partners: bike manufacturer.", "Costs: bikes, repairs, staff and app."],
   terms=["Customer segments", "Value propositions", "Channels", "Customer relationships", "Revenue streams", "Key resources", "Key activities", "Key partnerships", "Cost structure"],
   cols=10, rows=3, cover=True, rowH=116,
   expect=["Key partnerships", "Key activities", "Key resources", "Value propositions", "Customer relationships", "Channels", "Customer segments", "Cost structure", "Revenue streams"],
   narrowOrder=["Customer segments", "Value propositions", "Channels", "Customer relationships", "Revenue streams", "Key resources", "Key activities", "Key partnerships", "Cost structure"],
   blocks=[{"label": "Key partnerships", "col": 0, "row": 0, "cs": 2, "rs": 2, "note": "bike manufacturer", "colour": "a3"},
           {"label": "Key activities", "col": 2, "row": 0, "cs": 2, "note": "repairs, app", "colour": "a3"},
           {"label": "Key resources", "col": 2, "row": 1, "cs": 2, "note": "bikes, mechanics", "colour": "a3"},
           {"label": "Value propositions", "col": 4, "row": 0, "cs": 2, "rs": 2, "note": "a working bike for a monthly fee, free repairs", "colour": "a2"},
           {"label": "Customer relationships", "col": 6, "row": 0, "cs": 2, "note": "home repair visits", "colour": "a1"},
           {"label": "Channels", "col": 6, "row": 1, "cs": 2, "note": "app sign-up", "colour": "a1"},
           {"label": "Customer segments", "col": 8, "row": 0, "cs": 2, "rs": 2, "note": "students, young professionals", "colour": "a1"},
           {"label": "Cost structure", "col": 0, "row": 2, "cs": 5, "note": "bikes, repairs, staff and app", "colour": "bad"},
           {"label": "Revenue streams", "col": 5, "row": 2, "cs": 5, "note": "monthly subscription", "colour": "good"}])

mk("u09-13", "bus-design-thinking", "process", "Design thinking in five stages",
   "Start from people, then iterate. The stages are not strictly linear: teams loop back as they learn, and good ideas balance what is desirable, feasible and viable.",
   "Five boxes in order: empathise, define, ideate, prototype, test.",
   ["Empathise: observe and interview the people affected.", "Define the problem from their point of view.", "Ideate: generate many ideas.", "Prototype: make cheap versions.", "Test with users, looping back as you learn."],
   terms=["empathise", "define", "ideate", "prototype", "test", "human-centred", "iterative"],
   kind="chain", expect=["Empathise", "Define", "Ideate", "Prototype", "Test"],
   steps=[{"label": "Empathise", "note": "observe and interview"}, {"label": "Define", "note": "the real problem"}, {"label": "Ideate", "note": "many ideas"}, {"label": "Prototype", "note": "cheap versions"}, {"label": "Test", "note": "learn, loop back"}])

mk("u09-10", "bus-disruptive-innovation", "graph", "Disruptive innovation",
   "Incumbents improve faster than mainstream customers need. A simpler, cheaper product starts below even the mainstream's needs, then improves until it is good enough, and customers switch.",
   "Performance against time: incumbents' sustaining products rise above the mainstream customers' needs; a disruptive product starts far below but climbs faster and crosses the mainstream need at year 6.",
   ["Mainstream customers' needs rise slowly.", "Incumbents' products rise faster and soon exceed what mainstream customers need.", "The disruptive product starts worse on traditional measures but improves faster.", "At year 6 it becomes good enough for mainstream customers, who then switch."],
   terms=["sustaining", "disruptive", "innovator's dilemma", "good enough", "mainstream customers"],
   range={"x": [0, 10], "y": [0, 150]}, ticks=[[], []], grid=[2, 25], axisLabels=["time", "performance"], xLabelBelow=True, labelHalo=True,
   curves=[{"expr": "70+7*x", "colour": "a1", "label": "Incumbent (sustaining)", "labelAt": [5.4, 132], "anchor": "end"}, {"expr": "50+4*x", "colour": "a4", "dash": "6 5", "label": "What mainstream customers need", "labelAt": [10, 74], "anchor": "end"}, {"expr": "20+9*x", "colour": "a2", "label": "Disruptive product", "labelAt": [0.2, 6], "anchor": "start"}],
   points=[{"x": 6, "y": 74, "colour": "ink", "label": "good enough", "dx": 12, "dy": 24, "anchor": "start"}],
   marks=[{"x": 6, "to": 74}],
   checks=[{"type": "intersect", "a": "20+9*x", "b": "50+4*x", "x": 6, "y": 74, "name": "the disruptive product reaches the mainstream need at year 6"},
           {"type": "order", "a": "20+9*x", "b": "50+4*x", "rel": "<", "x": 1, "name": "it starts below what mainstream customers need"},
           {"type": "order", "a": "70+7*x", "b": "50+4*x", "rel": ">", "x": 1, "name": "incumbents start above the mainstream need and stay above"}])

mk("u09-09", "bus-four-ps-innovation", "blocks", "The 4Ps of innovation",
   "Innovation is not only new products. It can change how things are made, where and to whom they are sold, or the whole business model.",
   "Four boxes: product innovation (a new phone), process (automated warehouses), position (repositioning a drink as a sports product), paradigm (low-cost airlines).",
   ["Product: changes in what is offered, such as a new phone.", "Process: changes in how it is made or delivered, such as automated warehouses.", "Position: changes in context or market, such as repositioning a drink as a sports product.", "Paradigm: changes in the underlying business model, such as low-cost airlines."],
   terms=["Product", "Process", "Position", "Paradigm", "new phone", "automated warehouses", "low-cost airlines"],
   cols=2, rows=2, cover=True, rowH=108, expect=["Product", "Process", "Position", "Paradigm"],
   blocks=[{"label": "Product", "col": 0, "row": 0, "note": "what is offered: a new phone", "colour": "a1"}, {"label": "Process", "col": 1, "row": 0, "note": "how it is made or delivered: automated warehouses", "colour": "a4"},
           {"label": "Position", "col": 0, "row": 1, "note": "context or market: a drink repositioned as a sports product", "colour": "a3"}, {"label": "Paradigm", "col": 1, "row": 1, "note": "the business model: low-cost airlines", "colour": "a5"}])
