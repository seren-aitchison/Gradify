"""School 5, Operations and Supply Chain Management."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u05-02", "bus-transformation-model", "process", "The transformation model",
   "Inputs of two kinds are changed by the process into outputs, usually a mix of products and services. The four Vs then explain why two operations that transform food and customers are designed so differently.",
   "Three boxes: inputs (transformed resources and transforming resources), the transformation process, and outputs (products and services).",
   ["Inputs: transformed resources (materials, information, customers) and transforming resources (facilities and staff).", "Transformation process: changing physical properties, location, ownership, information or the state of customers.", "Outputs: products and services, usually a mix."],
   terms=["Inputs", "transformed resources", "transforming resources", "Transformation process", "Outputs", "products and services"],
   kind="chain", expect=["Inputs", "Transformation process", "Outputs"],
   steps=[{"label": "Inputs", "note": "transformed resources (materials, information, customers) and transforming resources (facilities, staff)"}, {"label": "Transformation process", "note": "changing properties, location, ownership, information or the state of customers"}, {"label": "Outputs", "note": "products and services, usually a mix"}])

mk("u05-05", "bus-cost-of-quality", "bars", "The costs of quality at a manufacturer",
   "Failure costs are £550,000 of the £700,000 total, about 79%. Money spent on prevention and appraisal is small beside what failures cost, which is the case for investing in prevention.",
   "One stacked column of £700,000: prevention £50,000, appraisal £100,000, internal failure £200,000, external failure £350,000.",
   ["Prevention £50,000 and appraisal £100,000.", "Internal failure £200,000 and external failure £350,000.", "Total cost of quality £700,000; failure costs £550,000, about 79%."],
   terms=["Prevention", "appraisal", "Internal failure", "external failure", "£700,000", "£550,000", "79%"],
   kind="stacked", prefix="£", suffix="k", range=[0, 760],
   stacks=[{"label": "Total cost of quality", "parts": [{"id": "prevention", "label": "Prevention", "v": 50, "colour": "good"}, {"id": "appraisal", "label": "Appraisal", "v": 100, "colour": "a4"}, {"id": "internal", "label": "Internal failure", "v": 200, "colour": "a3"}, {"id": "external", "label": "External failure", "v": 350, "colour": "bad"}]}],
   relations=[{"expr": "prevention + appraisal + internal + external", "equals": "700", "name": "the four costs total £700,000"},
              {"expr": "internal + external", "equals": "550", "name": "failure costs are £550,000"},
              {"expr": "(internal + external) / (prevention + appraisal + internal + external)", "equals": "0.79", "tol": 0.005, "name": "failure is about 79% of the total"}])

mk("u05-07", "bus-dmaic", "process", "Six Sigma's DMAIC",
   "Each stage depends on the one before: define the problem, measure performance, analyse for root causes, improve the process, then control it so that the gains last.",
   "Five boxes in order: define, measure, analyse, improve, control.",
   ["Define the problem, requirements and goals.", "Measure current performance.", "Analyse data to find root causes.", "Improve the process to remove causes.", "Control the improved process to sustain gains."],
   terms=["Define", "Measure", "Analyse", "Improve", "Control", "root causes"],
   kind="chain", expect=["Define", "Measure", "Analyse", "Improve", "Control"],
   steps=[{"label": "Define", "note": "the problem, requirements and goals"}, {"label": "Measure", "note": "current performance"}, {"label": "Analyse", "note": "data to find root causes"}, {"label": "Improve", "note": "the process to remove causes"}, {"label": "Control", "note": "the new process to sustain gains"}])

mk("u05-08", "bus-seven-wastes", "blocks", "The seven wastes (TIMWOOD)",
   "Lean looks for seven kinds of waste. Overproduction is often called the worst, because it leads to the others: more inventory, more transport and more handling.",
   "Seven boxes: transport, inventory, motion, waiting, overproduction, over-processing, defects, each with what it means.",
   ["Transport: unnecessary movement of materials.", "Inventory: excess stock.", "Motion: unnecessary movement of people.", "Waiting: idle time.", "Overproduction: making more, or sooner, than needed.", "Over-processing: doing more than the customer requires.", "Defects: errors and rework."],
   terms=["Transport", "Inventory", "Motion", "Waiting", "Overproduction", "Over-processing", "Defects", "TIMWOOD"],
   cols=12, rows=2, cover=True, rowH=104, expect=["Transport", "Inventory", "Motion", "Waiting", "Overproduction", "Over-processing", "Defects"],
   blocks=[{"label": "Transport", "col": 0, "row": 0, "cs": 3, "note": "unnecessary movement of materials", "colour": "a1"},
           {"label": "Inventory", "col": 3, "row": 0, "cs": 3, "note": "excess stock", "colour": "a1"},
           {"label": "Motion", "col": 6, "row": 0, "cs": 3, "note": "unnecessary movement of people", "colour": "a1"},
           {"label": "Waiting", "col": 9, "row": 0, "cs": 3, "note": "idle time", "colour": "a1"},
           {"label": "Overproduction", "col": 0, "row": 1, "cs": 4, "note": "more, or sooner, than needed: often the worst waste", "colour": "bad"},
           {"label": "Over-processing", "col": 4, "row": 1, "cs": 4, "note": "doing more than the customer requires", "colour": "a3"},
           {"label": "Defects", "col": 8, "row": 1, "cs": 4, "note": "errors and rework", "colour": "a3"}])

mk("u05-09", "bus-bullwhip", "bars", "The bullwhip effect",
   "A 10% rise in consumer sales becomes a 20% order from the retailer and a 40% order from the wholesaler. Each stage reads the order it receives as demand and adds safety stock, so the swing quadruples by the time it reaches the brewer.",
   "Columns for the retailer, wholesaler and brewer: the demand change each sees (10%, 20%, 40%) and the order each places (20%, 40%, then expanded production).",
   ["The retailer sees a 10% rise in sales and orders 20% more.", "The wholesaler sees a 20% rise and orders 40% more.", "The brewer sees a 40% rise and expands production.", "A 10% change has become 40% by the brewer."],
   terms=["10% rise in sales", "20% more", "20% rise", "40% more", "40% rise", "bullwhip effect"],
   kind="columns", suffix="%", range=[0, 52], series=[{"name": "Rise in demand it sees", "colour": "a1"}, {"name": "Order it places", "colour": "a2"}],
   categories=[{"label": "Retailer", "values": [{"id": "r_seen", "v": 10, "series": 0}, {"id": "r_order", "v": 20, "series": 1}]},
               {"label": "Wholesaler", "values": [{"id": "w_seen", "v": 20, "series": 0}, {"id": "w_order", "v": 40, "series": 1}]},
               {"label": "Brewer", "values": [{"id": "b_seen", "v": 40, "series": 0}]}],
   relations=[{"expr": "r_order", "equals": "w_seen", "name": "the wholesaler sees the retailer's order as demand"},
              {"expr": "w_order", "equals": "b_seen", "name": "the brewer sees the wholesaler's order as demand"},
              {"expr": "b_seen / r_seen", "equals": "4", "name": "the original 10% swing is four times larger by the brewer"}])

mk("u05-16", "bus-critical-path", "network", "Finding the critical path",
   "Path A–B–D takes 9 weeks and path A–C–D takes 11, so the longest path, A–C–D, sets the project at 11 weeks. B is off the critical path, with 2 weeks of float.",
   "Network of four tasks: A (3 weeks) leads to B (4 weeks) and C (6 weeks), which both lead to D (2 weeks). The critical path A, C, D is 11 weeks.",
   ["Task A takes 3 weeks; B (4 weeks) and C (6 weeks) both follow A.", "D (2 weeks) follows both B and C.", "A–B–D is 9 weeks; A–C–D is 11 weeks.", "The critical path is A–C–D, 11 weeks; B has 2 weeks of float."],
   terms=["critical path", "11 weeks", "float", "3 weeks", "6 weeks"],
   timeUnit="weeks",
   activities=[{"id": "A", "label": "", "dur": 3, "after": []}, {"id": "B", "label": "", "dur": 4, "after": ["A"]}, {"id": "C", "label": "", "dur": 6, "after": ["A"]}, {"id": "D", "label": "", "dur": 2, "after": ["B", "C"]}],
   claims={"duration": 11, "critical": ["A", "C", "D"], "float": {"B": 2, "A": 0, "C": 0, "D": 0}})

mk("u05-10", "bus-reorder-point", "bars", "Setting a reorder point",
   "Order when stock falls to the demand expected during the supplier's lead time plus a safety stock for variation: 200 + 60 = 260 units.",
   "One stacked column of 260 units: 200 units of lead-time demand and 60 units of safety stock.",
   ["Sales average 40 units a day and the lead time is 5 days.", "Demand during the lead time is 40 × 5 = 200 units.", "Safety stock covers variation: 60 units.", "Reorder point 200 + 60 = 260 units."],
   terms=["Reorder point", "lead time", "Safety stock", "260 units", "200 units"],
   kind="stacked", suffix=" units", range=[0, 300],
   stacks=[{"label": "Reorder point", "parts": [{"id": "lead", "label": "Lead-time demand", "v": 200, "colour": "a1"}, {"id": "safety", "label": "Safety stock", "v": 60, "colour": "a3"}]}],
   relations=[{"expr": "40 * 5", "equals": "lead", "name": "lead-time demand = 40 a day × 5 days = 200"}, {"expr": "lead + safety", "equals": "260", "name": "reorder point = 200 + 60 = 260 units"}])

mk("u05-03", "bus-process-types", "layers", "Manufacturing process types",
   "Moving down, volume rises and variety falls: from a one-off ship to oil refining that never stops. The process a firm uses follows from how many it makes and how much each differs.",
   "Five stacked layers from low volume and high variety to very high volume: project, jobbing, batch, mass, continuous.",
   ["Project: unique, large products, such as a bridge or ship.", "Jobbing: low volume, high variety, such as a bespoke tailor.", "Batch: groups of identical items, such as a bakery's loaves.", "Mass: high volume, standardised, such as cars on an assembly line.", "Continuous: very high volume, non-stop flow, such as oil refining."],
   terms=["Project", "Jobbing", "Batch", "Mass", "Continuous", "bespoke tailor", "oil refining"],
   shape="stack", count=5, arrowLabel="volume rises, variety falls",
   expect=["Project", "Jobbing", "Batch", "Mass", "Continuous"],
   items=[{"label": "Project", "detail": "unique, large: a bridge or ship", "colour": "a5"}, {"label": "Jobbing", "detail": "low volume, high variety: a bespoke tailor", "colour": "a1"}, {"label": "Batch", "detail": "groups of identical items: a bakery's loaves", "colour": "a4"}, {"label": "Mass", "detail": "high volume, standardised: cars on an assembly line", "colour": "a3"}, {"label": "Continuous", "detail": "very high volume, non-stop: oil refining", "colour": "a2"}])
