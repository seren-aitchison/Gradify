"""School 3, Strategy: five forces, industry life cycle, SWOT, value chain, generic strategies, Ansoff, Boston, scorecard."""
import os, sys, math
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u03-04", "bus-five-forces", "radial", "Porter's five forces",
   "Four forces press on the rivalry between existing competitors in the middle. The stronger each force, the lower the industry's average profit. Each arm says what makes that force strong.",
   "Rivalry among existing competitors in the centre with arrows from threat of new entrants (above), threat of substitutes (below), bargaining power of suppliers (left) and bargaining power of buyers (right).",
   ["Centre: rivalry among existing competitors, high when competitors are many and similar, growth is slow or fixed costs are high.", "Above: threat of new entrants, high when barriers to entry are low.", "Left: bargaining power of suppliers, high when suppliers are few or switching costs are high.", "Right: bargaining power of buyers, high when buyers are few and large and switching is cheap.", "Below: threat of substitutes, high when other products meet the same need at good value."],
   terms=["Threat of new entrants", "Bargaining power of suppliers", "Bargaining power of buyers", "Threat of substitutes", "Rivalry among existing competitors"],
   count=5, inward=True,
   centre={"label": "Rivalry among existing competitors", "note": "many similar rivals, slow growth, high fixed costs"},
   arms=[{"label": "Threat of new entrants", "note": "strong when barriers to entry are low", "dir": "top"},
         {"label": "Bargaining power of suppliers", "note": "strong when suppliers are few or switching costs high", "dir": "left"},
         {"label": "Bargaining power of buyers", "note": "strong when buyers are few, large and can switch cheaply", "dir": "right"},
         {"label": "Threat of substitutes", "note": "strong when other products meet the same need", "dir": "bottom"}])

def sales(x): return 100 / (1 + math.exp(-1.5 * (x - 2.4))) / (1 + math.exp(x - 9))
xs = [i / 1000 * 10 for i in range(1001)]
peak = max(xs, key=sales); assert 5.1 <= peak <= 7.8, peak
expr = "100/(1+exp(-1.5*(x-2.4)))/(1+exp(x-9))"
mk("u03-05", "bus-industry-life-cycle", "graph", "The industry life cycle",
   "Industry sales rise, level off and fall. Growth attracts entrants, a shake-out removes weaker firms, maturity brings price competition, and decline leaves a few firms serving a niche.",
   "Curve of industry sales over time divided into introduction, growth, shake-out, maturity and decline, with the peak of sales in maturity.",
   ["Introduction: few firms and low sales.", "Growth: sales rise quickly and new entrants arrive.", "Shake-out: growth slows and weaker firms exit.", "Maturity: sales at their highest, standardised products and price competition.", "Decline: sales fall as substitutes take over."],
   terms=["Introduction", "Growth", "Shake-out", "Maturity", "Decline"],
   range={"x": [0, 10], "y": [0, 118]}, ticks=[[], []], grid=[2, 25], axisLabels=["time", "industry sales"], xLabelBelow=True, labelHalo=True, height=[330, 290],
   bands=[{"x": [0, 1.4], "label": "Intro", "colour": "a1"}, {"x": [1.4, 3.4], "label": "Growth", "colour": "a4"}, {"x": [3.4, 5.1], "label": "Shake-out", "colour": "a3"}, {"x": [5.1, 7.8], "label": "Maturity", "colour": "a5"}, {"x": [7.8, 10], "label": "Decline", "colour": "a2"}],
   curves=[{"expr": expr, "colour": "a1", "width": 3.4}],
   checks=[{"type": "max", "expr": expr, "domain": [0, 10], "x": round(peak, 2), "y": round(sales(peak), 3), "name": "industry sales peak at x = %.2f, inside the maturity stage (5.1 to 7.8)" % peak},
           {"type": "order", "a": expr, "b": "100", "rel": "<", "x": peak, "name": "sales at the peak stay below the chart's top"}])

mk("u03-06", "bus-swot-tows", "matrix", "SWOT: inside the firm and outside it",
   "Strengths and weaknesses come from inside the firm; opportunities and threats come from outside it. The regional bus company's four factors show which quadrant each belongs in.",
   "A two by two grid. Internal helpful: strengths. Internal harmful: weaknesses. External helpful: opportunities. External harmful: threats. Each holds the bus company's example.",
   ["Strengths (internal, helpful): a reliable network and loyal local customers.", "Weaknesses (internal, harmful): an ageing diesel fleet.", "Opportunities (external, helpful): government funding for zero-emission buses.", "Threats (external, harmful): rising fuel costs and car use."],
   terms=["Strengths", "Weaknesses", "Opportunities", "Threats", "internal", "external", "reliable network", "ageing diesel fleet", "zero-emission buses", "rising fuel costs"],
   cols=["Helpful", "Harmful"], rows=["Internal", "External"],
   axes={"x": {"title": "effect on the objective", "key": "effect", "values": ["helpful", "harmful"]}, "y": {"title": "origin", "key": "origin", "values": ["internal", "external"]}},
   cells=[[{"title": "Strengths", "colour": "good"}, {"title": "Weaknesses", "colour": "a3"}], [{"title": "Opportunities", "colour": "a4"}, {"title": "Threats", "colour": "bad"}]],
   claims=[{"cell": [0, 0], "title": "Strengths"}, {"cell": [0, 1], "title": "Weaknesses"}, {"cell": [1, 0], "title": "Opportunities"}, {"cell": [1, 1], "title": "Threats"}],
   items=[{"label": "a reliable network and loyal local customers", "origin": "internal", "effect": "helpful", "cell": [0, 0]},
          {"label": "an ageing diesel fleet", "origin": "internal", "effect": "harmful", "cell": [0, 1]},
          {"label": "funding for zero-emission buses", "origin": "external", "effect": "helpful", "cell": [1, 0]},
          {"label": "rising fuel costs and car use", "origin": "external", "effect": "harmful", "cell": [1, 1]}])

mk("u03-08", "bus-value-chain", "process", "Porter's value chain",
   "Five primary activities take a product from inputs to after-sales service; four support activities run beneath all of them. Margin is what customers pay for the value minus the cost of these activities.",
   "A chain of five primary activities (inbound logistics, operations, outbound logistics, marketing and sales, service) with four support activities above, ending in margin.",
   ["Support activities: firm infrastructure, human resource management, technology development and procurement.", "Primary activities in order: inbound logistics, operations, outbound logistics, marketing and sales, service.", "The difference between value and cost is the margin."],
   terms=["inbound logistics", "operations", "outbound logistics", "marketing and sales", "service", "firm infrastructure", "human resource management", "technology development", "procurement", "margin"],
   kind="chain",
   expect=["Inbound logistics", "Operations", "Outbound logistics", "Marketing and sales", "Service"],
   support=["Firm infrastructure", "Human resource management", "Technology development", "Procurement"],
   steps=[{"label": "Inbound logistics", "note": "receiving and storing inputs"}, {"label": "Operations", "note": "turning inputs into products"}, {"label": "Outbound logistics", "note": "distribution"}, {"label": "Marketing and sales"}, {"label": "Service", "note": "after-sales support"}],
   end="Margin = value to customers − cost of the activities")

mk("u03-10", "bus-generic-strategies", "matrix", "Porter's generic strategies",
   "Two choices, the source of advantage and the scope of the market, give four strategies. Aldi sits in broad cost leadership, Waitrose in broad differentiation and the organic farm shop in differentiation focus.",
   "A two by two grid: broad scope with lower cost is cost leadership, broad with differentiation is differentiation, narrow with lower cost is cost focus, narrow with differentiation is differentiation focus.",
   ["Broad scope, lower cost: cost leadership (Aldi).", "Broad scope, differentiation: differentiation (Waitrose).", "Narrow scope, lower cost: cost focus.", "Narrow scope, differentiation: differentiation focus (a local organic farm shop)."],
   terms=["Cost leadership", "Differentiation", "Cost focus", "differentiation focus", "Aldi", "Waitrose", "farm shop", "broad", "narrow"],
   cols=["Lower cost", "Differentiation"], rows=["Broad scope", "Narrow scope"],
   axes={"x": {"title": "source of advantage", "key": "advantage", "values": ["cost", "differentiation"]}, "y": {"title": "scope", "key": "scope", "values": ["broad", "narrow"]}},
   cells=[[{"title": "Cost leadership", "colour": "a1"}, {"title": "Differentiation", "colour": "a2"}], [{"title": "Cost focus", "colour": "a4"}, {"title": "Differentiation focus", "colour": "a5"}]],
   claims=[{"cell": [0, 0], "title": "Cost leadership"}, {"cell": [0, 1], "title": "Differentiation"}, {"cell": [1, 0], "title": "Cost focus"}, {"cell": [1, 1], "title": "Differentiation focus"}],
   items=[{"label": "Aldi", "advantage": "cost", "scope": "broad", "cell": [0, 0]}, {"label": "Waitrose", "advantage": "differentiation", "scope": "broad", "cell": [0, 1]}, {"label": "a local organic farm shop", "advantage": "differentiation", "scope": "narrow", "cell": [1, 1]}])

mk("u03-11", "bus-ansoff", "matrix", "The Ansoff matrix",
   "Risk rises as the firm moves away from what it knows: from market penetration, through product or market development, to diversification, where both the product and the market are new. The gym chain's four options fill the grid.",
   "A two by two grid. Existing products in existing markets: market penetration. New products in existing markets: product development. Existing products in new markets: market development. New products in new markets: diversification.",
   ["Existing products, existing markets: market penetration, a referral scheme.", "New products, existing markets: product development, online classes.", "Existing products, new markets: market development, gyms in Ireland.", "New products, new markets: diversification, protein snacks, the riskiest."],
   terms=["Market penetration", "Product development", "Market development", "Diversification", "referral scheme", "online classes", "Ireland", "protein snacks"],
   cols=["Existing products", "New products"], rows=["Existing markets", "New markets"],
   axes={"x": {"title": "products", "key": "product", "values": ["existing", "new"]}, "y": {"title": "markets", "key": "market", "values": ["existing", "new"]}},
   cells=[[{"title": "Market penetration", "note": "lowest risk", "colour": "good"}, {"title": "Product development", "colour": "a1"}], [{"title": "Market development", "colour": "a4"}, {"title": "Diversification", "note": "highest risk", "colour": "bad"}]],
   claims=[{"cell": [0, 0], "title": "Market penetration"}, {"cell": [0, 1], "title": "Product development"}, {"cell": [1, 0], "title": "Market development"}, {"cell": [1, 1], "title": "Diversification"}],
   items=[{"label": "referral scheme and off-peak pricing", "product": "existing", "market": "existing", "cell": [0, 0]},
          {"label": "online classes for members", "product": "new", "market": "existing", "cell": [0, 1]},
          {"label": "gyms in Ireland", "product": "existing", "market": "new", "cell": [1, 0]},
          {"label": "protein snacks for supermarkets", "product": "new", "market": "new", "cell": [1, 1]}])

mk("u03-12", "bus-boston-matrix", "matrix", "The Boston Matrix",
   "Market growth and relative market share sort a portfolio into stars, cash cows, question marks and dogs. Cash from the cow funds the star and decides whether to back the question mark.",
   "A two by two grid: high growth and high share is a star, high growth and low share a question mark, low growth and high share a cash cow, low growth and low share a dog, with the confectionery company's four products placed.",
   ["Star: a leading vegan chocolate range in a booming segment.", "Question mark: a new protein snack with 5% of a fast-growing market.", "Cash cow: a long-established chocolate bar with 30% of a mature market.", "Dog: an old boiled-sweet brand with falling share."],
   terms=["Stars", "Cash cows", "Question marks", "Dogs", "market growth rate", "relative market share", "protein snack", "boiled-sweet"],
   cols=["High share", "Low share"], rows=["High growth", "Low growth"],
   axes={"x": {"title": "relative market share", "key": "share", "values": ["high", "low"]}, "y": {"title": "market growth rate", "key": "growth", "values": ["high", "low"]}},
   cells=[[{"title": "Stars", "note": "invest to keep pace", "colour": "a4"}, {"title": "Question marks", "note": "need heavy investment", "colour": "a3"}], [{"title": "Cash cows", "note": "more cash than they need", "colour": "good"}, {"title": "Dogs", "note": "candidates for divestment", "colour": "bad"}]],
   claims=[{"cell": [0, 0], "title": "Stars"}, {"cell": [0, 1], "title": "Question marks"}, {"cell": [1, 0], "title": "Cash cows"}, {"cell": [1, 1], "title": "Dogs"}],
   items=[{"label": "vegan chocolate range", "share": "high", "growth": "high", "cell": [0, 0]}, {"label": "new protein snack (5%)", "share": "low", "growth": "high", "cell": [0, 1]},
          {"label": "chocolate bar (30%)", "share": "high", "growth": "low", "cell": [1, 0]}, {"label": "boiled-sweet brand", "share": "low", "growth": "low", "cell": [1, 1]}])

mk("u03-16", "bus-balanced-scorecard", "blocks", "The balanced scorecard",
   "Four perspectives balance the financial view with customers, processes and people. In a hospital trust each holds its own measures, and together they show whether strategy is being delivered.",
   "Four boxes: financial, customer, internal business process, and learning and growth, each with the hospital trust's measures.",
   ["Financial: staying within budget, cost per patient episode.", "Customer (patients): satisfaction scores, waiting times.", "Internal processes: infection rates, bed occupancy, discharge before midday.", "Learning and growth: staff training completed, staff vacancy rates."],
   terms=["Financial", "Customer", "Internal business process", "Learning and growth", "waiting times", "infection rates", "vacancy rates"],
   cols=2, rows=2, cover=True, rowH=118,
   expect=["Financial", "Customer", "Internal business process", "Learning and growth"],
   blocks=[{"label": "Financial", "col": 0, "row": 0, "note": "Staying within budget; cost per patient episode", "colour": "a1"},
           {"label": "Customer", "col": 1, "row": 0, "note": "Patient satisfaction scores; waiting times", "colour": "a4"},
           {"label": "Internal business process", "col": 0, "row": 1, "note": "Infection rates; bed occupancy; discharge before midday", "colour": "a3"},
           {"label": "Learning and growth", "col": 1, "row": 1, "note": "Staff training completed; staff vacancy rates", "colour": "a5"}])

mk("u03-14", "bus-four-actions", "blocks", "The four actions framework",
   "Value innovation asks four questions about every factor the industry competes on. Cirque du Soleil eliminated animals and stars, reduced thrills, raised venue and artistry, and created themes and music.",
   "Four boxes: eliminate (animal shows, star performers), reduce (thrills and danger), raise (a unique venue, artistic quality), create (themes, artistic music and dance).",
   ["Eliminate: animal shows and star performers.", "Reduce: thrills and danger.", "Raise: a unique venue and artistic quality.", "Create: themes, artistic music and dance, attracting theatre-goers as well as families."],
   terms=["eliminated", "reduced", "raised", "created", "Four actions framework", "animal shows", "Cirque du Soleil"],
   cols=2, rows=2, cover=True, rowH=108, expect=["Eliminate", "Reduce", "Raise", "Create"],
   blocks=[{"label": "Eliminate", "col": 0, "row": 0, "note": "animal shows and star performers", "colour": "bad"}, {"label": "Reduce", "col": 1, "row": 0, "note": "thrills and danger", "colour": "a3"},
           {"label": "Raise", "col": 0, "row": 1, "note": "a unique venue and artistic quality", "colour": "a1"}, {"label": "Create", "col": 1, "row": 1, "note": "themes, artistic music and dance for theatre-goers as well as families", "colour": "good"}])

mk("u03-09", "bus-vrio", "process", "VRIO: four questions about a resource",
   "A resource must pass all four tests to give a sustained competitive advantage. Fail the first and it is a disadvantage; fail the second, only parity; fail the third, an advantage that does not last.",
   "Four boxes in order: valuable, rare, inimitable, organised, each with what failing it means, ending in sustained competitive advantage.",
   ["Valuable? If not: competitive disadvantage.", "Rare? If not: competitive parity.", "Inimitable? If not: temporary advantage.", "Organised to exploit it? If yes to all four: sustained competitive advantage."],
   terms=["Valuable", "Rare", "Inimitable", "Organised", "competitive disadvantage", "competitive parity", "temporary advantage", "sustained competitive advantage"],
   kind="chain", expect=["Valuable?", "Rare?", "Inimitable?", "Organised?"],
   steps=[{"label": "Valuable?", "note": "if not: competitive disadvantage"}, {"label": "Rare?", "note": "if not: competitive parity"}, {"label": "Inimitable?", "note": "if not: temporary advantage"}, {"label": "Organised?", "note": "if yes: exploited"}],
   end="Yes to all four: sustained competitive advantage")

mk("u03-13", "bus-growth-methods", "blocks", "Ways to combine, and directions of growth",
   "The top row is how firms combine; the bottom row is where the combination points. A merger or acquisition can be horizontal, vertical or into unrelated industries.",
   "Eight boxes. Top: merger, acquisition, joint venture, strategic alliance. Bottom: horizontal, vertical backward, vertical forward, conglomerate.",
   ["Merger: two firms combine into one.", "Acquisition: one firm buys a controlling stake in another.", "Joint venture: a new, jointly owned business.", "Strategic alliance: co-operation without a new company.", "Horizontal: same industry and stage.", "Vertical backward: towards suppliers; vertical forward: towards customers.", "Conglomerate: unrelated industries."],
   terms=["Merger", "Acquisition", "Joint venture", "Strategic alliance", "Horizontal", "Vertical backward", "Vertical forward", "Conglomerate"],
   cols=12, rows=2, cover=True, rowH=104, expect=["Merger", "Acquisition", "Joint venture", "Strategic alliance", "Horizontal", "Vertical backward", "Vertical forward", "Conglomerate"],
   blocks=[{"label": "Merger", "col": 0, "row": 0, "cs": 3, "note": "two firms combine into one", "colour": "a1"}, {"label": "Acquisition", "col": 3, "row": 0, "cs": 3, "note": "one buys a controlling stake", "colour": "a1"},
           {"label": "Joint venture", "col": 6, "row": 0, "cs": 3, "note": "a new, jointly owned business", "colour": "a1"}, {"label": "Strategic alliance", "col": 9, "row": 0, "cs": 3, "note": "co-operation, no new company", "colour": "a1"},
           {"label": "Horizontal", "col": 0, "row": 1, "cs": 3, "note": "same industry, same stage", "colour": "a4"}, {"label": "Vertical backward", "col": 3, "row": 1, "cs": 3, "note": "towards suppliers", "colour": "a4"},
           {"label": "Vertical forward", "col": 6, "row": 1, "cs": 3, "note": "towards customers", "colour": "a4"}, {"label": "Conglomerate", "col": 9, "row": 1, "cs": 3, "note": "unrelated industries", "colour": "a4"}])
