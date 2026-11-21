"""School 10, Digital Business and Information Systems."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u10-04", "bus-indirect-network-effect", "process", "An indirect network effect",
   "More drivers mean shorter waits; shorter waits attract more riders; more riders attract more drivers. Each side makes the platform more valuable to the other, which is why a platform must win both sides at launch.",
   "A cycle of three boxes: more drivers, shorter waits, more riders, with more riders leading back to more drivers.",
   ["The new app pays drivers bonuses, so more drivers join.", "More drivers mean waits fall.", "Shorter waits attract more riders.", "More riders attract more drivers, and the loop repeats."],
   terms=["indirect network effect", "drivers", "waits", "riders"],
   kind="cycle", loop=True, expect=["More drivers", "Shorter waits", "More riders"], centre="indirect network effect",
   steps=[{"label": "More drivers", "note": "helped by bonuses at launch"}, {"label": "Shorter waits", "note": "riders get a car sooner"}, {"label": "More riders", "note": "attract still more drivers"}])

mk("u10-15", "bus-scrum-sprint", "process", "One Scrum sprint",
   "Scrum works in sprints of two to four weeks. Each begins with planning, has a 15-minute daily scrum, ends with a review of the working result and a retrospective, and then the next sprint begins.",
   "A cycle of four boxes: sprint planning, daily scrum, sprint review, retrospective, then back to sprint planning.",
   ["Sprint planning chooses what to build from the product backlog.", "A daily scrum of 15 minutes keeps the team in step.", "The sprint review shows the working result and gathers feedback.", "The retrospective improves how the team works, then the next sprint begins."],
   terms=["sprints", "sprint planning", "daily scrum", "sprint review", "retrospective", "product backlog"],
   kind="cycle", loop=True, expect=["Sprint planning", "Daily scrum", "Sprint review", "Retrospective"], centre="2 to 4 weeks",
   steps=[{"label": "Sprint planning", "note": "pick work from the backlog"}, {"label": "Daily scrum", "note": "15 minutes"}, {"label": "Sprint review", "note": "show the result, get feedback"}, {"label": "Retrospective", "note": "improve the way of working"}])
