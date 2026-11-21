"""Write business diagram specs. Each batch file (scripts/diagrams/business/u*.py) calls mk() once per diagram;
running it rewrites those specs in kit/diagrams/specs/ (prefix bus-). The lesson is named by its permanent id
(u07-02); the title is looked up in kit/courses/business/ids.js so a renamed lesson cannot leave a diagram pointing
nowhere. `terms` are words the diagram uses that the lesson text must contain (the build checks them)."""
import json, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../.."))
SPECS = os.path.join(ROOT, "kit/diagrams/specs")
_src = open(os.path.join(ROOT, "kit/courses/business/ids.js"), encoding="utf8").read()
IDS = {k: v for k, v in re.findall(r'"(u\d\d-\d\d)":\s*"((?:[^"\\]|\\.)*)"', _src)}

def mk(lesson, id, renderer, title, caption, alt, description, terms=(), **body):
    spec = {"id": id, "renderer": renderer, "course": "business", "unit": lesson[:3], "lesson": IDS[lesson],
            "title": title, "caption": caption, "alt": alt, "description": list(description), "terms": list(terms)}
    spec.update(body)
    with open(os.path.join(SPECS, f"{id}.json"), "w", encoding="utf8") as f:
        json.dump(spec, f, ensure_ascii=False, indent=1)
        f.write("\n")
    return spec
