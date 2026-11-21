"""School 4, Marketing: STP, the product life cycle, adoption, the seven Ps."""
import os, sys, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk, IDS

mk("u04-03", "bus-stp", "process", "Segment, target, position",
   "Marketing chooses who to serve before deciding what to say. Segments must be measurable, substantial, accessible and differentiable; positioning is the place the brand holds in customers' minds.",
   "Three boxes in order: segmentation, targeting, positioning, each with its options.",
   ["Segmentation: geographic, demographic, psychographic and behavioural bases.", "Targeting: undifferentiated, differentiated, concentrated (niche) or micromarketing.", "Positioning: the place a brand occupies in customers' minds relative to competitors."],
   terms=["Segmentation", "Targeting", "Positioning", "Geographic", "Demographic", "Psychographic", "Behavioural", "Undifferentiated", "Differentiated", "Concentrated"],
   kind="chain", expect=["Segmentation", "Targeting", "Positioning"],
   steps=[{"label": "Segmentation", "note": "geographic, demographic, psychographic, behavioural"}, {"label": "Targeting", "note": "undifferentiated, differentiated, concentrated (niche)"}, {"label": "Positioning", "note": "the place a brand holds in customers' minds"}])

def sales(x): return 100 / (1 + math.exp(-1.7 * (x - 2.2))) / (1 + math.exp(x - 7))
def ext(x): return sales(x) + 34 / (1 + math.exp(-3 * (x - 7.4)))
xs = [i / 100 for i in range(1001)]
pk = max(xs, key=sales); assert 4.0 <= pk <= 6.3, pk
E1 = "100/(1+exp(-1.7*(x-2.2)))/(1+exp(x-7))"
E2 = E1 + "+34/(1+exp(-3*(x-7.4)))"
mk("u04-06", "bus-product-life-cycle", "graph", "The product life cycle and an extension strategy",
   "Sales are low at introduction, rise in growth, peak in maturity and fall in decline. An extension strategy, such as the Lucozade relaunch, lifts sales again instead of letting them fall.",
   "Sales against time in four stages: introduction, growth, maturity, decline. A dashed second curve shows an extension strategy lifting sales late in maturity, so sales do not decline.",
   ["Introduction: low sales and often losses.", "Growth: sales and profits rise.", "Maturity: sales peak and competition is intense.", "Decline: sales fall.", "Extension strategies in maturity (new uses, new markets, modifications, repackaging, promotion) keep sales above the declining curve."],
   terms=["Introduction", "Growth", "Maturity", "Decline", "Extension strategies", "Lucozade"],
   range={"x": [0, 10], "y": [0, 135]}, ticks=[[], []], grid=[2, 25], axisLabels=["time", "sales"], xLabelBelow=True, labelHalo=True, height=[330, 290],
   bands=[{"x": [0, 1.4], "label": "Intro", "colour": "a1"}, {"x": [1.4, 3.6], "label": "Growth", "colour": "a4"}, {"x": [3.6, 6.8], "label": "Maturity", "colour": "a5"}, {"x": [6.8, 10], "label": "Decline", "colour": "a2"}],
   curves=[{"expr": E1, "colour": "a1", "width": 3.4, "label": "no action", "labelAt": [8.2, 28], "anchor": "start"},
           {"expr": E2, "colour": "a2", "dash": "7 5", "width": 3, "label": "extension strategy", "labelAt": [6.9, 120], "anchor": "end"}],
   checks=[{"type": "max", "expr": E1, "domain": [0, 10], "x": round(pk, 2), "y": round(sales(pk), 3), "name": "sales peak at x = %.2f, inside maturity (3.6 to 6.8)" % pk},
           {"type": "order", "a": E1, "b": E2, "rel": "<", "x": 9, "name": "with an extension strategy sales at x = 9 are higher than without"}])

adopt = [("Innovators", 2.5), ("Early adopters", 13.5), ("Early majority", 34), ("Late majority", 34), ("Laggards", 16)]
mk("u04-06", "bus-diffusion-adopters", "bars", "Rogers's adopter categories",
   "Adopters arrive in a bell shape: most people are in the two majorities. Marketing to the early adopters, often opinion leaders, can speed adoption; Moore's chasm sits between them and the early majority.",
   "Columns of the share of adopters: innovators 2.5%, early adopters 13.5%, early majority 34%, late majority 34%, laggards 16%, adding to 100%.",
   ["Innovators 2.5%.", "Early adopters 13.5%.", "Early majority 34%.", "Late majority 34%.", "Laggards 16%.", "Together 100%."],
   terms=["Innovators", "early adopters", "early majority", "late majority", "laggards", "2.5%", "13.5%", "34%", "16%"],
   kind="columns", suffix="%", range=[0, 42], series=[{"name": "Share of adopters", "colour": "a1"}],
   categories=[{"label": n, "values": [{"id": "a%d" % i, "v": v, "colour": c}]} for i, ((n, v), c) in enumerate(zip(adopt, ["a5", "a1", "a4", "a3", "a2"]))],
   relations=[{"expr": "a0 + a1 + a2 + a3 + a4", "equals": "100", "name": "the five categories add up to 100%"},
              {"expr": "a2 + a3", "equals": "68", "name": "the two majorities are 68% of adopters"}],
   also=[{"course": "business", "unit": "u09", "lesson": IDS["u09-11"]}])

mk("u04-10", "bus-seven-ps", "blocks", "The seven Ps of a dental practice",
   "The first four Ps are McCarthy's. People, process and physical evidence were added for services, because intangible services are judged on staff behaviour, a smooth process and physical surroundings.",
   "Seven boxes: product, price, promotion and place on top; people, process and physical evidence below, each with the dental practice example.",
   ["Product: check-ups, hygiene and cosmetic treatment.", "Price: NHS bands and private fees.", "Promotion: local advertising and reviews.", "Place: a town-centre surgery with online booking.", "People: friendly dentists and receptionists.", "Process: reminders and short waits.", "Physical evidence: a clean, modern waiting room."],
   terms=["product, price, promotion and place", "People", "Process", "Physical evidence", "NHS bands", "online booking", "reminders", "waiting room"],
   cols=12, rows=2, cover=True, rowH=118, expect=["Product", "Price", "Promotion", "Place", "People", "Process", "Physical evidence"],
   blocks=[{"label": "Product", "col": 0, "row": 0, "cs": 3, "note": "Check-ups, hygiene and cosmetic treatment", "colour": "a1"},
           {"label": "Price", "col": 3, "row": 0, "cs": 3, "note": "NHS bands and private fees", "colour": "a1"},
           {"label": "Promotion", "col": 6, "row": 0, "cs": 3, "note": "Local advertising and reviews", "colour": "a1"},
           {"label": "Place", "col": 9, "row": 0, "cs": 3, "note": "Town-centre surgery with online booking", "colour": "a1"},
           {"label": "People", "col": 0, "row": 1, "cs": 4, "note": "Friendly dentists and receptionists", "colour": "a4"},
           {"label": "Process", "col": 4, "row": 1, "cs": 4, "note": "Reminders and short waits", "colour": "a4"},
           {"label": "Physical evidence", "col": 8, "row": 1, "cs": 4, "note": "A clean, modern waiting room", "colour": "a4"}])

mk("u04-04", "bus-buying-process", "process", "The consumer decision process",
   "High-involvement purchases such as a car follow every step; routine ones such as milk skip most of them. Doubt after buying, cognitive dissonance, can undo a sale in the last step.",
   "Five boxes in order: need recognition, information search, evaluation of alternatives, purchase decision, post-purchase behaviour.",
   ["Need recognition: noticing a problem or want.", "Information search: personal, commercial and online sources.", "Evaluation of alternatives on key attributes.", "Purchase decision.", "Post-purchase behaviour: satisfaction, reviews or cognitive dissonance."],
   terms=["Need recognition", "Information search", "Evaluation of alternatives", "Purchase decision", "Post-purchase behaviour", "cognitive dissonance"],
   kind="chain", expect=["Need recognition", "Information search", "Evaluation of alternatives", "Purchase decision", "Post-purchase behaviour"],
   steps=[{"label": "Need recognition"}, {"label": "Information search", "note": "personal, commercial, online"}, {"label": "Evaluation of alternatives"}, {"label": "Purchase decision"}, {"label": "Post-purchase behaviour", "note": "satisfaction, reviews, dissonance"}])

mk("u04-09", "bus-channel-transactions", "bars", "Why a retailer reduces contacts",
   "Five producers each selling to 20 customers need 100 transactions. Through one retailer they need 5 + 20 = 25. The retailer cuts contacts and costs, though it takes a margin.",
   "Two columns: 100 transactions when five producers sell direct to 20 customers, and 25 through one retailer.",
   ["Direct: 5 producers × 20 customers = 100 transactions.", "Through one retailer: 5 to the retailer and 20 to customers, 25 in all."],
   terms=["5 × 20 = 100", "25 in total", "retailer", "intermediaries"],
   kind="columns", range=[0, 120], series=[{"name": "Transactions", "colour": "a1"}],
   categories=[{"label": "Direct", "values": [{"id": "direct", "v": 100, "colour": "a3"}]}, {"label": "Through one retailer", "short": "Via retailer", "values": [{"id": "via", "v": 25, "colour": "a4"}]}],
   relations=[{"expr": "5 * 20", "equals": "direct", "name": "direct: 5 producers × 20 customers = 100"}, {"expr": "5 + 20", "equals": "via", "name": "via one retailer: 5 + 20 = 25"}])
