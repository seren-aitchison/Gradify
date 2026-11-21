"""School 1, The Business Environment: stakeholder map and PESTLE."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u01-03", "bus-power-interest", "matrix", "Mendelow's power–interest matrix",
   "Power and interest sort stakeholders into four strategies. For the new supermarket, the planning authority is managed closely, while residents and small shops are kept informed until they gain power.",
   "A two by two grid. High power and high interest: manage closely. High power, low interest: keep satisfied. Low power, high interest: keep informed. Low power, low interest: monitor. The supermarket example's stakeholders are placed.",
   ["High power, high interest: manage closely, such as the local planning authority.", "High power, low interest: keep satisfied, such as a regulator not yet engaged.", "Low power, high interest: keep informed, such as local residents and small town-centre shops.", "Low power, low interest: monitor with minimal effort."],
   terms=["power–interest matrix", "Manage closely", "Keep satisfied", "Keep informed", "Monitor", "local planning authority", "Local residents", "Small shops", "regulator not yet engaged"],
   cols=["Low interest", "High interest"], rows=["High power", "Low power"],
   axes={"x": {"title": "interest in the decision", "key": "interest", "values": ["low", "high"]}, "y": {"title": "power over the business", "key": "power", "values": ["high", "low"]}},
   cells=[[{"title": "Keep satisfied", "colour": "a3"}, {"title": "Manage closely", "note": "key players", "colour": "bad"}], [{"title": "Monitor", "note": "minimal effort", "colour": "a4"}, {"title": "Keep informed", "colour": "a1"}]],
   claims=[{"cell": [0, 0], "title": "Keep satisfied"}, {"cell": [0, 1], "title": "Manage closely"}, {"cell": [1, 0], "title": "Monitor"}, {"cell": [1, 1], "title": "Keep informed"}],
   items=[{"label": "a regulator not yet engaged", "power": "high", "interest": "low", "cell": [0, 0]}, {"label": "local planning authority", "power": "high", "interest": "high", "cell": [0, 1]},
          {"label": "local residents", "power": "low", "interest": "high", "cell": [1, 1]}, {"label": "small shops in the town centre", "power": "low", "interest": "high", "cell": [1, 1]}])

mk("u01-09", "bus-pestle", "blocks", "The six PESTLE factors",
   "Six groups of outside forces to scan. A good analysis then says which create an opportunity or a threat and judges which matter most.",
   "Six boxes: political, economic, social, technological, legal and environmental, each with examples.",
   ["Political: government policy, taxation, trade agreements.", "Economic: growth, interest rates, inflation, exchange rates.", "Social: demographics, lifestyles, health trends.", "Technological: automation, AI, e-commerce.", "Legal: employment, consumer, competition, data protection law.", "Environmental: climate change, net zero, resource scarcity."],
   terms=["Political", "Economic", "Social", "Technological", "Legal", "Environmental", "taxation", "interest rates", "demographics", "automation", "data protection", "net zero"],
   cols=3, rows=2, cover=True, rowH=112, expect=["Political", "Economic", "Social", "Technological", "Legal", "Environmental"],
   blocks=[{"label": "Political", "col": 0, "row": 0, "note": "Government policy, taxation, trade agreements", "colour": "a1"},
           {"label": "Economic", "col": 1, "row": 0, "note": "Growth, interest rates, inflation, exchange rates", "colour": "a5"},
           {"label": "Social", "col": 2, "row": 0, "note": "Demographics, lifestyles, health trends", "colour": "a4"},
           {"label": "Technological", "col": 0, "row": 1, "note": "Automation, AI, e-commerce", "colour": "a3"},
           {"label": "Legal", "col": 1, "row": 1, "note": "Employment, consumer, competition and data protection law", "colour": "a2"},
           {"label": "Environmental", "col": 2, "row": 1, "note": "Climate change, net zero, resource scarcity", "colour": "good"}])
