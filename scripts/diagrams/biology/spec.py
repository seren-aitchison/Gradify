"""Write biology diagram specs. Each batch file (scripts/diagrams/biology/u*.py) calls mk() once per diagram; running
it rewrites those specs in kit/diagrams/specs/. The lesson is named by its permanent id (u02-08) and the title is
looked up in kit/courses/biology/ids.js, so a renamed lesson cannot leave a diagram pointing nowhere."""
import json, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
SPECS = os.path.join(ROOT, "kit/diagrams/specs")

def _ids(course):
    src = open(os.path.join(ROOT, f"kit/courses/{course}/ids.js"), encoding="utf8").read()
    return {k: v for k, v in re.findall(r'"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"', src)}

IDS = {"biology": _ids("biology")}

def mk(lesson, id, renderer, title, caption, alt, description, also=(), **body):
    """lesson: a biology lesson id ("u02-08"); also: extra biology lessons that show the same diagram."""
    spec = {"id": id, "renderer": renderer, "course": "biology", "unit": lesson[:3], "lesson": IDS["biology"][lesson],
            "title": title, "caption": caption, "alt": alt, "description": list(description)}
    if also:
        spec["also"] = [{"course": "biology", "unit": a[:3], "lesson": IDS["biology"][a]} for a in also]
    spec.update(body)
    with open(os.path.join(SPECS, f"{id}.json"), "w", encoding="utf8") as f:
        json.dump(spec, f, ensure_ascii=False, indent=1)
        f.write("\n")
    return spec
