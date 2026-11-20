"""Write chemistry diagram specs. Each batch file (scripts/diagrams/chemistry/u*.py) calls mk() once per diagram;
running it rewrites those specs in kit/diagrams/specs/. The lesson is named by its permanent id (u02-08), and the
title is looked up in kit/courses/chemistry/ids.js so a renamed lesson cannot leave a diagram pointing nowhere."""
import json, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
SPECS = os.path.join(ROOT, "kit/diagrams/specs")

def _ids(course):
    src = open(os.path.join(ROOT, f"kit/courses/{course}/ids.js"), encoding="utf8").read()
    return {k: v for k, v in re.findall(r'"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"', src)}

IDS = {"chemistry": _ids("chemistry"), "gcse": _ids("gcse")}

def mk(lesson, id, renderer, title, caption, alt, description, also=(), **body):
    """lesson: a chemistry lesson id ("u02-08"); also: extra placements as "gcse:u05-01" or "chemistry:u05-15"."""
    spec = {"id": id, "renderer": renderer, "course": "chemistry", "lesson": IDS["chemistry"][lesson],
            "title": title, "caption": caption, "alt": alt, "description": list(description)}
    if also:
        spec["also"] = [{"course": a.split(":")[0], "lesson": IDS[a.split(":")[0]][a.split(":")[1]]} for a in also]
    spec.update(body)
    with open(os.path.join(SPECS, f"{id}.json"), "w", encoding="utf8") as f:
        json.dump(spec, f, ensure_ascii=False, indent=1)
        f.write("\n")
    return spec
