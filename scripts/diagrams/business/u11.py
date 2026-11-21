"""School 11, Ethics, ESG and Corporate Governance."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u11-03", "bus-carroll-pyramid", "layers", "Carroll's pyramid of corporate social responsibility",
   "Economic responsibility is the base on which everything else rests. Carroll argued that a socially responsible firm meets all four layers at the same time, not one after another.",
   "A pyramid of four layers. From the base: economic, legal, ethical, philanthropic.",
   ["Economic: be profitable, the base of the pyramid.", "Legal: obey the law.", "Ethical: do what is right and fair even where not required.", "Philanthropic: be a good corporate citizen, for example through donations and community work."],
   terms=["economic", "legal", "ethical", "philanthropic", "Carroll", "at the same time"],
   shape="pyramid", count=4, arrowLabel="all four are met at the same time",
   expect=["Philanthropic", "Ethical", "Legal", "Economic"],
   items=[{"label": "Philanthropic", "detail": "be a good corporate citizen: donations, community work", "colour": "a5"}, {"label": "Ethical", "detail": "do what is right and fair, even where not required", "colour": "a4"}, {"label": "Legal", "detail": "obey the law", "colour": "a1"}, {"label": "Economic", "detail": "be profitable: the base on which everything else rests", "colour": "a2"}])

mk("u11-10", "bus-esg-pillars", "blocks", "The three pillars of ESG",
   "Investors look at environmental, social and governance issues together. Materiality asks which matter most in a given industry: water for drinks makers, data privacy for banks.",
   "Three boxes: environmental, social and governance, each with the issues it covers.",
   ["Environmental: greenhouse gas emissions, energy use, pollution, water, waste and biodiversity.", "Social: employee health and safety, pay and conditions, diversity, human rights in supply chains.", "Governance: board independence and diversity, executive pay, shareholder rights, audit, bribery and tax practices."],
   terms=["Environmental", "Social", "Governance", "greenhouse gas emissions", "human rights", "executive pay", "Materiality"],
   cols=3, rows=1, cover=True, rowH=170, expect=["Environmental", "Social", "Governance"],
   blocks=[{"label": "Environmental", "col": 0, "row": 0, "note": "Greenhouse gas emissions, energy use, pollution, water, waste, biodiversity", "colour": "good"},
           {"label": "Social", "col": 1, "row": 0, "note": "Health and safety, pay and conditions, diversity, human rights in supply chains", "colour": "a1"},
           {"label": "Governance", "col": 2, "row": 0, "note": "Board independence, executive pay, shareholder rights, audit, bribery, tax", "colour": "a5"}])
