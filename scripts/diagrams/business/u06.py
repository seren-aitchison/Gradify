"""School 6, People Management."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from spec import mk

mk("u06-03", "bus-recruitment-selection", "process", "From job analysis to an offer",
   "Each stage builds on the one before: the job analysis sets the job description and person specification, which set the shortlisting criteria and the selection methods.",
   "Five boxes in order: job analysis, job description and person specification, advertise the role, shortlist and select, make an offer and complete checks.",
   ["Job analysis: what the role involves.", "Job description (duties) and person specification (skills, knowledge, experience).", "Advertise the role by internal promotion, job boards, agencies and other methods.", "Shortlist against the person specification and select with work samples and structured interviews.", "Make an offer and complete right-to-work checks."],
   terms=["Job analysis", "Job description", "person specification", "Shortlisting", "work sample", "structured interview", "right-to-work checks"],
   kind="chain", expect=["Job analysis", "Job description and person specification", "Advertise the role", "Shortlist and select", "Offer and checks"],
   steps=[{"label": "Job analysis"}, {"label": "Job description and person specification"}, {"label": "Advertise the role"}, {"label": "Shortlist and select", "note": "work samples, structured interviews"}, {"label": "Offer and checks", "note": "right to work"}])

mk("u06-06", "bus-performance-cycle", "process", "The performance management cycle",
   "Performance management repeats: plan the objectives, act with support, monitor with regular feedback, then review and set the next plan.",
   "A cycle of four boxes: plan, act, monitor, review, with the review leading back to the plan.",
   ["Plan: agree objectives and development needs.", "Act: carry out the work with support.", "Monitor: regular check-ins and feedback.", "Review: assess performance, recognise achievements and agree next steps.", "Then the cycle repeats."],
   terms=["Plan", "Act", "Monitor", "Review", "objectives", "check-ins"],
   kind="cycle", loop=True, expect=["Plan", "Act", "Monitor", "Review"], centre="repeats",
   steps=[{"label": "Plan", "note": "agree objectives and development needs"}, {"label": "Act", "note": "do the work with support"}, {"label": "Monitor", "note": "regular check-ins and feedback"}, {"label": "Review", "note": "assess, recognise, agree next steps"}])

mk("u06-05", "bus-kolb-cycle", "process", "Kolb's learning cycle",
   "Learning comes from experience that is reflected on, turned into ideas and then tried out; the trying out is the next experience. Training that stops at the course skips the cycle.",
   "A cycle of four boxes: concrete experience, reflective observation, abstract conceptualisation, active experimentation, leading back to experience.",
   ["Concrete experience.", "Reflective observation.", "Abstract conceptualisation.", "Active experimentation, which creates the next experience."],
   terms=["Kolb's learning cycle", "concrete experience", "reflective observation", "abstract conceptualisation", "active experimentation"],
   kind="cycle", loop=True, expect=["Concrete experience", "Reflective observation", "Abstract conceptualisation", "Active experimentation"], centre="Kolb, 1984",
   steps=[{"label": "Concrete experience"}, {"label": "Reflective observation"}, {"label": "Abstract conceptualisation"}, {"label": "Active experimentation"}])

mk("u06-13", "bus-disciplinary-procedure", "process", "A fair disciplinary procedure",
   "Each step protects fairness: investigate first, tell the employee what is alleged, hear their response with a companion present, decide in writing and allow an appeal.",
   "Six boxes in order: establish the facts, inform in writing, hold a meeting, the right to be accompanied, decide and inform, the right of appeal.",
   ["Establish the facts: investigate promptly.", "Inform the employee in writing of the issue and evidence.", "Hold a meeting so they can respond.", "They have the right to be accompanied.", "Decide and inform in writing.", "Right of appeal."],
   terms=["Establish the facts", "Inform", "Hold a meeting", "accompanied", "Decide", "appeal"],
   kind="chain", expect=["Establish the facts", "Inform in writing", "Hold a meeting", "Right to be accompanied", "Decide and inform", "Right of appeal"],
   steps=[{"label": "Establish the facts"}, {"label": "Inform in writing"}, {"label": "Hold a meeting"}, {"label": "Right to be accompanied"}, {"label": "Decide and inform"}, {"label": "Right of appeal"}])
