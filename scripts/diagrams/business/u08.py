"""School 8, Economics for Business."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u08-01", "bus-demand-shift", "graph", "Movement along the demand curve and a shift of it",
   "A change in the good's own price moves buyers along the curve. A change in anything else, such as a rise in petrol prices, shifts the whole curve: at £60 buyers now want 60 cars, not 40.",
   "Two downward-sloping demand curves. At a price of £60 the quantity demanded is 40 on the first and 60 on the shifted curve; a price rise to £80 moves along the first curve to 20.",
   ["The first demand curve slopes down: at £60, 40 units; at £80, 20 units.", "A rise in the price moves buyers up the curve to a lower quantity: a movement along.", "A rise in the price of a substitute shifts the curve right: at £60, 60 units are now demanded."],
   terms=["movement along", "shift", "demand curve", "substitute"],
   range={"x": [0, 110], "y": [0, 125]}, ticks=[[20, 40, 60, 80, 100], [20, 40, 60, 80, 100]], grid=[20, 20], axisLabels=["quantity", "price (£)"], xLabelBelow=True, labelHalo=True,
   curves=[{"expr": "100-x", "colour": "a1", "label": "D", "labelAt": [8, 98]}, {"expr": "120-x", "colour": "a2", "label": "D₂ (shifted right)", "labelAt": [70, 62], "anchor": "start"}],
   points=[{"x": 40, "y": 60, "colour": "a1", "label": "40", "dx": -8, "dy": 18, "anchor": "end"}, {"x": 60, "y": 60, "colour": "a2", "label": "60", "dx": 8, "dy": -14}, {"x": 20, "y": 80, "colour": "a1", "label": "20 at £80", "dx": -8, "dy": -14, "anchor": "end"}],
   arrows=[{"from": [40, 60], "to": [60, 60], "colour": "a2", "label": "shift", "labelAt": [47, 68], "anchor": "middle"}, {"from": [40, 60], "to": [21.5, 78.5], "colour": "a1", "label": "movement along", "labelAt": [41, 84], "anchor": "start"}],
   checks=[{"type": "point", "expr": "100-x", "x": 40, "y": 60, "name": "(40, £60) lies on D"}, {"type": "point", "expr": "100-x", "x": 20, "y": 80, "name": "(20, £80) lies on D"},
           {"type": "point", "expr": "120-x", "x": 60, "y": 60, "name": "(60, £60) lies on the shifted curve"},
           {"type": "value", "expr": "(120-x)-(100-x)", "x": 30, "between": [20, 20], "name": "the shifted curve is 20 units to the right at every price"}])

mk("u08-03", "bus-gym-elasticity", "bars", "A 10% price rise meets a 25% fall in members",
   "The percentage fall in members is 2.5 times the percentage rise in price, so demand is elastic (PED = −2.5) and total revenue falls. Indexed at 100, revenue drops from 10,000 to 8,250.",
   "Columns before and after the price rise: price index 100 then 110, members index 100 then 75, revenue index 100 then 82.5.",
   ["Price rises 10%: from index 100 to 110.", "Members fall 25%: from index 100 to 75.", "PED = −25 ÷ 10 = −2.5, so demand is elastic.", "Revenue (price × members) falls from 10,000 to 8,250, down 17.5%."],
   terms=["10%", "25%", "PED = −25 ÷ 10 = −2.5", "elastic", "Total revenue falls"],
   kind="columns", range=[0, 135], series=[{"name": "Price", "colour": "a1"}, {"name": "Members", "colour": "a4"}, {"name": "Revenue", "colour": "a2"}],
   categories=[{"label": "Before", "values": [{"id": "p0", "v": 100}, {"id": "q0", "v": 100}, {"id": "rev0", "v": 100}]},
               {"label": "After the rise", "short": "After", "values": [{"id": "p1", "v": 110}, {"id": "q1", "v": 75}, {"id": "rev1", "v": 82.5}]}],
   relations=[{"expr": "((q1 - q0) / q0) / ((p1 - p0) / p0)", "equals": "0 - 2.5", "name": "PED = %ΔQ ÷ %ΔP = −25% ÷ 10% = −2.5"},
              {"expr": "p1 * q1 / 100", "equals": "rev1", "name": "revenue index after = 110 × 75 ÷ 100 = 82.5"},
              {"expr": "p0 * q0 / 100", "equals": "rev0", "name": "revenue index before = 100"},
              {"expr": "rev1", "equals": "82.5", "name": "revenue falls because demand is elastic (below 100)"}])

mk("u08-04", "bus-negative-externality", "graph", "A negative externality: overproduction",
   "The market produces where demand meets private cost, at 40 units. When each unit also imposes £20 of cost on third parties, the social cost curve lies above it and the best level is 30. The 10 extra units are overproduction.",
   "Demand and two upward curves, private cost and social cost £20 higher. Demand meets private cost at 40 units and £60; it meets social cost at 30 units and £70. The gap between 30 and 40 is shaded as overproduction.",
   ["Demand slopes down.", "Private cost slopes up; the market price and quantity are where it meets demand: 40 units at £60.", "Social cost is private cost plus £20 of external cost.", "Social benefit equals social cost at 30 units, so the market overproduces by 10 units."],
   terms=["negative externalities", "private costs", "social cost", "overproduced"],
   range={"x": [0, 80], "y": [0, 125]}, ticks=[[10, 20, 30, 40, 50, 60, 70], [20, 40, 60, 80, 100]], grid=[10, 20], axisLabels=["quantity", "price and cost (£)"], xLabelBelow=True, labelHalo=True,
   bands=[{"x": [30, 40], "label": "overproduction", "colour": "a2"}],
   curves=[{"expr": "100-x", "colour": "a1", "label": "Demand (private benefit)", "labelAt": [3, 108], "anchor": "start"},
           {"expr": "20+x", "colour": "a4", "label": "Private cost", "labelAt": [58, 70], "anchor": "start"},
           {"expr": "40+x", "colour": "a2", "label": "Social cost", "labelAt": [48, 98], "anchor": "start"}],
   points=[{"x": 40, "y": 60, "colour": "ink", "label": "market 40", "dx": 10, "dy": 14}, {"x": 30, "y": 70, "colour": "ink", "label": "social optimum 30", "dx": -10, "dy": -16, "anchor": "end"}],
   checks=[{"type": "intersect", "a": "100-x", "b": "20+x", "x": 40, "y": 60, "name": "demand meets private cost at 40 units, £60"},
           {"type": "intersect", "a": "100-x", "b": "40+x", "x": 30, "y": 70, "name": "demand meets social cost at 30 units, £70"},
           {"type": "value", "expr": "(40+x)-(20+x)", "x": 30, "between": [20, 20], "name": "external cost is £20 a unit at every output"}])

mk("u08-06", "bus-prisoners-dilemma", "matrix", "A pricing dilemma",
   "Whatever the rival does, cutting price pays each firm more, so both cut and earn £6m. That is the Nash equilibrium, and it leaves both worse off than the £10m each they would earn by keeping prices high.",
   "A payoff grid for two firms choosing a high or low price: both high £10m each; A low, B high A £12m and B £4m; A high, B low A £4m and B £12m; both low £6m each. Both low is the Nash equilibrium.",
   ["Both price high: £10m each.", "One prices low while the other stays high: the low-price firm earns £12m and the other £4m.", "Both price low: £6m each.", "Low is each firm's dominant strategy, so both price low: the Nash equilibrium, worse for both than £10m each."],
   terms=["high or low price", "£10m", "£6m", "£12m", "£4m", "dominant strategy", "Nash equilibrium"],
   cols=["Firm B: high price", "Firm B: low price"], rows=["Firm A: high price", "Firm A: low price"], prefix="£", suffix="m",
   payoffs=[[[10, 10], [4, 12]], [[12, 4], [6, 6]]], game={"nash": [1, 1], "dominant": [1, 1], "dilemma": [0, 0]},
   axes={"x": {"title": "Firm B's choice"}, "y": {"title": "Firm A's choice"}},
   cells=[[{"note": "best joint outcome", "colour": "good"}, {"note": "B gains share", "colour": "a1"}], [{"note": "A gains share", "colour": "a1"}, {"note": "Nash equilibrium: both cut price", "colour": "bad"}]])

mk("u08-05", "bus-monopoly-output", "graph", "Monopoly: MR = MC, higher price, lower output",
   "The monopolist stops where marginal revenue equals marginal cost, then charges what the demand curve allows. Compared with perfect competition, where price falls to marginal cost, it produces less and charges more.",
   "Demand, marginal revenue and marginal cost curves. The monopolist's MR = MC at 20 units sets a price of £80. Where demand meets marginal cost, at about 26.7 units and £73.33, is the competitive outcome.",
   ["Marginal revenue lies below demand and falls twice as fast.", "The monopolist produces where MR = MC: 20 units, read up to the demand curve for the price, £80.", "Perfect competition would reach demand = MC at about 26.7 units and £73.33.", "So monopoly means higher prices and lower output."],
   terms=["marginal revenue equals marginal cost", "price maker", "higher prices, lower output", "deadweight loss"],
   range={"x": [0, 55], "y": [0, 110]}, ticks=[[10, 20, 30, 40, 50], [20, 40, 60, 80, 100]], grid=[10, 20], axisLabels=["output", "price and cost (£)"], xLabelBelow=True, labelHalo=True,
   curves=[{"expr": "100-x", "colour": "a1", "label": "Demand", "labelAt": [3, 104], "anchor": "start"}, {"expr": "100-2*x", "colour": "a4", "domain": [0, 50], "label": "MR", "labelAt": [41, 12], "anchor": "start"}, {"expr": "20+2*x", "colour": "a2", "label": "MC", "labelAt": [40, 98], "anchor": "start"}],
   points=[{"x": 20, "y": 60, "colour": "ink", "label": "MR = MC", "dx": -10, "dy": 18, "anchor": "end"}, {"x": 20, "y": 80, "colour": "a1", "label": "monopoly price £80", "dx": 12, "dy": -14}, {"x": 26.6667, "y": 73.3333, "colour": "a5", "label": "competition £73.33", "dx": 12, "dy": 30}],
   marks=[{"x": 20, "to": 80}],
   checks=[{"type": "intersect", "a": "100-2*x", "b": "20+2*x", "x": 20, "y": 60, "name": "MR = MC at 20 units, £60"},
           {"type": "point", "expr": "100-x", "x": 20, "y": 80, "name": "the monopoly price is read from demand: £80 at 20 units"},
           {"type": "intersect", "a": "100-x", "b": "20+2*x", "x": 26.6667, "y": 73.3333, "name": "demand meets MC at 26.7 units, £73.33 (perfect competition)"},
           {"type": "slope", "expr": "100-2*x", "x": 10, "value": -2, "name": "marginal revenue falls twice as fast as demand"}])
