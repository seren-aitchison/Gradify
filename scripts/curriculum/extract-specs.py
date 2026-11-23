#!/usr/bin/env python3
"""Extract official England Biology requirements from the published documents, once, into one JSON file.

The source documents are downloaded by hand (URLs in SOURCES) and converted with `pdftotext -layout` (PDFs) or
scripts/curriculum/html2txt.py (the GOV.UK page). They are not committed: they are the boards' and the DfE's
copyright. The output is data/curriculum/requirements/england-biology.json: one record per official requirement, with a
stable id built from the document's own reference, which the mapping, the reports and the tests read.

    python3 -I scripts/curriculum/extract-specs.py <dir with ncsci.txt aqa.txt edexcel.txt ocrA.txt ocrB.pdf eduqas.txt> data/curriculum/requirements/england-biology.json

Needs pdfplumber (OCR B only). Re-run only when a source document changes; record the new version in SOURCES.

Wording is preserved from the document's own text layer: line breaks are joined and nothing else is changed.
Each record keeps the page number (PDF page, counted from the form feeds pdftotext writes) or the line in the
GOV.UK page text, so a reviewer can find it.
"""
import json, re, sys

SRC = sys.argv[1]
SEG = re.compile(r"\S+(?: {1,2}\S+)*")


def segs(line):
    return [(m.start(), m.group(0)) for m in SEG.finditer(line)]


def read(name):
    txt = open(f"{SRC}/{name}", encoding="utf8").read()
    out, page = [], 1
    for raw in txt.split("\n"):
        page += raw.count("\f")
        out.append((page, re.sub(r"[\x00-\x08\x0b-\x1f]", "", raw.replace("\f", ""))))
    return out


def clean(parts):
    t = " ".join(p.strip() for p in parts if p.strip())
    t = t.replace("••", "•").replace("­", "")
    return re.sub(r"\s+", " ", t).strip()


# ---------------------------------------------------------------- DfE national curriculum (KS1–KS4)
def national_curriculum():
    lines = open(f"{SRC}/ncsci.txt", encoding="utf8").read().split("\n")
    BIO = {"Plants", "Animals, including humans", "Animals including humans", "Living things and their habitats",
           "Evolution and inheritance", "Biology", "Subject content – Biology", "Working scientifically"}
    out, stage, year, topic, sub, skip, inbio = [], None, None, None, None, False, False
    for i, l in enumerate(lines):
        if l.startswith("## "):
            h = l[3:].strip(); skip = False; sub = None; topic = None
            m = re.match(r"Year (\d) programme", h)
            if m: year = int(m.group(1)); stage = "KS1" if year <= 2 else "KS2"
            elif h.startswith("Key stage 1 programme"): year, stage = "1-2", "KS1"
            elif h.startswith("Lower key stage 2 programme"): year, stage = "3-4", "KS2"
            elif h.startswith("Upper key stage 2 programme"): year, stage = "5-6", "KS2"
            elif h.startswith("Key stage 3"): year, stage = "7-9", "KS3"
            elif h.startswith("Key stage 4"): year, stage = "10-11", "KS4"
            continue
        if l.startswith("### "):
            topic = l[4:].strip(); skip = False; sub = None; continue
        if l.startswith("#### "):
            h = l[5:].strip()
            if h.startswith("Notes and guidance"): skip = True
            else: skip = False; sub = h
            continue
        if skip or not l.startswith("- ") or not stage or topic not in BIO: continue
        out.append(dict(source="dfe-nc", stage=stage, year=year, topic=topic, sub=sub, text=l[2:].strip(), loc=f"line {i + 1}"))
    # KS4 has an untitled list of key ideas before the subject areas; KS4 biology lines with no subheading are those
    for r in out:
        if r["stage"] == "KS4" and r["topic"] == "Subject content – Biology" and not r["sub"]: r["sub"] = "Key ideas"
    return out


# ---------------------------------------------------------------- AQA GCSE Biology 8461
def aqa():
    L = read("aqa.txt"); heads = []
    for i, (pg, l) in enumerate(L):
        m = re.match(r"^(4\.[1-7](?:\.\d+){1,3})\s+(\S.*)$", l)
        if m and i > 500: heads.append((i, m.group(1), m.group(2).strip(), pg))
    ids = [h[1] for h in heads]
    topic = {}
    for i, (pg, l) in enumerate(L):
        m = re.match(r"^(4\.[1-7])\s+(\S.*)$", l)
        if m and i > 500: topic[m.group(1)] = m.group(2).strip()
    out = []
    for k, (i, ref, title, pg) in enumerate(heads):
        if any(x.startswith(ref + ".") for x in ids): continue  # a parent heading
        end = heads[k + 1][0] if k + 1 < len(heads) else len(L)
        body = []
        for pg2, l in L[i + 1:end]:
            if re.match(r"^\s*4\.[1-7]\s", l) or re.match(r"^\s*(5|6|7)\s+[A-Z]", l) or "Scheme of assessment" in l or l.startswith("The complex and diverse phenomena"): break
            ss = segs(l)
            if not ss or ss[0][0] > 40: continue
            s = ss[0][1]
            if s in ("Content",) or s.startswith("Visit aqa.org.uk") or s.startswith("GCSE Biology (8461)") or re.fullmatch(r"\d+", s): continue
            body.append(s)
        flags = {"biologyOnly": "(biology only)" in title or "(biology only)" in topic.get(ref[:3], "") or any("(biology only)" in h[2] for h in heads if ref.startswith(h[1] + ".")),
                 "higherOnly": "(HT only)" in title or any("(HT only)" in h[2] for h in heads if ref.startswith(h[1] + "."))}
        parent = next((h[2] for h in heads if ref.startswith(h[1] + ".") and h[1].count(".") == ref.count(".") - 1), None)
        out.append(dict(source="aqa-8461", ref=ref, topic=topic.get(ref[:3]), sub=parent, title=re.sub(r"\s*\((biology only|HT only)\)", "", title),
                        text=clean(body), loc=f"p. {pg}", **flags))
    return out


# ---------------------------------------------------------------- Pearson Edexcel GCSE Biology 1BI0
def edexcel():
    L = read("edexcel.txt"); out, topic, cur, col = [], None, None, None
    start = next(i for i, (_, l) in enumerate(L) if l.startswith("Topic 1 – Key concepts in biology") and i > 450)
    for pg, l in L[start:]:
        if l.startswith("Topic ") and "–" in l: topic = l.strip(); cur = None; continue
        if re.match(r"^Assessment information|^\d+ Assessment", l): break
        ss = segs(l)
        if not ss: continue
        if ss[0][0] <= 2 and re.fullmatch(r"\d+\.\d+B?", ss[0][1]) and len(ss) > 1:
            cur = dict(source="edexcel-1bi0", ref=ss[0][1], topic=topic, parts=[ss[1][1]], loc=f"p. {pg}", biologyOnly=ss[0][1].endswith("B"))
            col = ss[1][0]; out.append(cur); continue
        if cur and col - 1 <= ss[0][0] <= col + 6 and ss[0][0] < 60: cur["parts"].append(ss[0][1])
        elif cur and ss[0][0] <= 2: cur = None
    for r in out: r["text"] = clean(r.pop("parts")); r["corePractical"] = r["text"].startswith("Core Practical")
    return out


# ---------------------------------------------------------------- OCR Gateway Biology A J247
def ocr_a():
    L = read("ocrA.txt"); out, cur, col, inc, topic, sub = [], None, None, None, None, None
    for pg, l in L:
        ss = segs(l)
        if not ss: continue
        m = re.match(r"^Topic (B\d): (.+)$", ss[0][1])
        if m: topic = f"{m.group(1)}: {m.group(2)}"
        for st, s in ss:
            m = re.fullmatch(r"(B\d\.\d)\s+(\S.+)", s)
            if m and not cur: sub = s
        first = next(((st, s) for st, s in ss if re.fullmatch(r"B\d\.\d+[a-z]", s.split()[0]) and st > 40), None)
        if first:
            st, s = first; idx = ss.index(first)
            ref = s.split()[0]
            rest = ss[idx + 1:]
            if not rest: continue
            col = rest[0][0]; inc = rest[1][0] if len(rest) > 1 else None
            cur = dict(source="ocr-j247", ref=ref, topic=topic, sub=sub, parts=[rest[0][1]], inc=[rest[1][1]] if len(rest) > 1 and rest[1][1][:1].islower() or len(rest) > 1 and rest[1][0] < col + 45 else [], loc=f"p. {pg}")
            if inc and len(rest) > 1 and not (rest[1][0] < col + 45): inc = None
            out.append(cur); continue
        if not cur: continue
        if re.match(r"^\s*(Topic B\d|B\d\.\d\s|Version \d)", l) or ss[0][1].startswith("Version "):
            cur = None; continue
        for st, s in ss:
            if col - 2 <= st <= col + 3: cur["parts"].append(s)
            elif inc and inc - 2 <= st <= inc + 3: cur["inc"].append(s)
    tmap, smap = {}, {}
    for pg, l in L:
        for st, s in segs(l):
            m = re.fullmatch(r"Topic (B\d): (.+)", s)
            if m and m.group(2) != "Topic title": tmap.setdefault(m.group(1), f"{m.group(1)}: {m.group(2)}")
            m = re.fullmatch(r"(B\d\.\d) {1,8}([A-Z].+)", s)
            if m: smap.setdefault(m.group(1), re.sub(r"\b([A-Z]) ([a-z])", r"\1\2", m.group(2)))
    seen = {}
    for r in out:
        r["text"] = clean(r.pop("parts")); r["include"] = clean(r.pop("inc"))
        r["topic"] = tmap.get(r["ref"][:2]); r["sub"] = smap.get(r["ref"][:4])
    for r in out: seen.setdefault(r["ref"], r)  # the specification repeats a few outcomes in summary tables
    return list(seen.values())


# ---------------------------------------------------------------- OCR Twenty First Century Biology B J257
# The content pages are rotated tables, which the plain text layer interleaves; read the "Assessable learning
# outcomes" column by its position instead (pdfplumber, upright coordinates).
def ocr_b():
    import pdfplumber
    pdf = pdfplumber.open(f"{SRC}/ocrB.pdf"); out, cur, sub = [], None, None
    for pg in pdf.pages:
        words = pg.extract_words()
        head = next((w for w in words if w["text"] == "Assessable" and 0 < w["top"] < 160), None)
        if not head or head["top"] < 20: continue
        top_text = pg.crop((0, 0, pg.width, head["top"] - 2)).extract_text() or ""
        m = re.search(r"(B\d\.\d) ([^\n]+)", top_text)
        if m: sub = f"{m.group(1)} {m.group(2).strip()}"
        if "IaS" in top_text and not m: break  # chapter B7, Ideas about Science
        right = [w["x0"] for w in words if w["text"] == "Linked" and abs(w["top"] - head["top"]) < 10]
        x1 = (min(right) - 4) if right else pg.width - 20
        col = pg.crop((head["x0"] - 4, head["top"] + 24, x1, pg.height - 30)).extract_text() or ""
        for line in col.split("\n"):
            line = line.strip()
            if not line or line.startswith("Learners will be required"): continue
            if re.fullmatch(r"\d+", line): continue  # page number
            m = re.match(r"^(\d+)\.\s*(.*)$", line)
            if m and sub:
                cur = dict(source="ocr-j257", ref=f"{sub.split()[0]}.{m.group(1)}", topic=sub[:2], sub=sub, parts=[m.group(2)], loc=f"p. {pg.page_number}")
                out.append(cur); continue
            if cur: cur["parts"].append(line)
    return finish_b(out)


def finish_b(out):
    # chapters B7 (Ideas about Science) and B8 (Practical skills) are working-scientifically outcomes: not extracted here
    CH = {"B1": "You and your genes", "B2": "Keeping healthy", "B3": "Living together – food and ecosystems", "B4": "Using food and controlling growth",
          "B5": "The human body – staying alive", "B6": "Life on Earth – past, present and future", "B7": "Ideas about Science", "B8": "Practical skills"}
    seen = {}
    for r in out:
        r["topic"] = f"Chapter {r['topic']}: {CH.get(r['topic'], '')}" if r["topic"] else None
        t = clean(r.pop("parts")).split(" Assessable learning outcomes")[0]
        t = re.sub(r"(\s+(M\d[a-z],?|PAG\d+,?))+\s*$", "", t)  # the maths and practical columns, not outcome wording
        t = re.sub(r"\b([a-z])\) ([a-z]) ([a-z])", r"\1) \2\3", t)  # a drop-cap gap in the text layer: "a) e xplain"
        r["biologyOnly"] = "(separate science only)" in t
        r["text"] = t.replace("(separate science only)", "").strip()
        seen.setdefault(r["ref"], r)
    return list(seen.values())


# ---------------------------------------------------------------- WJEC Eduqas GCSE Biology
def eduqas():
    L = read("eduqas.txt"); out, cur, col, topic, sub = [], None, None, None, None
    start = next(i for i, (_, l) in enumerate(L) if re.match(r"^1\.\s+CELL BIOLOGY", l))
    for pg, l in L[start:]:
        ss = segs(l)
        if not ss: continue
        if re.match(r"^3 ASSESSMENT", l): break
        m = re.match(r"^(\d)\.\s+([A-Z][A-Z ,\-]+)$", l.strip())
        if m and ss[0][0] == 0:
            topic = m.group(2).title(); cur = None
            if topic == "Photosynthesis": sub = (m.group(1), "Photosynthesis")  # the one topic with no sub-topics
            continue
        m = re.match(r"^(\d\.\d)\s+(\S.*)$", l)
        if m and ss[0][0] == 0: sub = (m.group(1), m.group(2).strip().capitalize()); cur = None; continue
        if len(ss) > 1 and len(ss[0][1]) == 1 and not ss[0][1].isalnum(): ss = ss[1:]  # a bullet glyph
        if ss[0][1] in ("Learners should be able to:", "SPECIFIED PRACTICAL WORK"): cur = None; continue
        if re.fullmatch(r"\([a-z]+\)", ss[0][1]) and len(ss) > 1 and sub:
            col = ss[1][0]
            cur = dict(source="eduqas-c400", ref=f"{sub[0]}{ss[0][1]}", topic=topic, sub=sub[1], parts=[ss[1][1]], loc=f"p. {pg}"); out.append(cur); continue
        m = re.fullmatch(r"(SP\d+\.\d+[A-Za-z]?) (.+)", ss[0][1])
        if m and sub:
            col = ss[0][0] + len(m.group(1)) + 1
            cur = dict(source="eduqas-c400", ref=m.group(1), topic=topic, sub=sub[1], parts=["Specified practical: " + m.group(2)], loc=f"p. {pg}", practical=True); out.append(cur); continue
        if cur and col - 3 <= ss[0][0] <= col + 3: cur["parts"].append(ss[0][1])
        elif cur and ss[0][0] < col - 3 and not re.fullmatch(r"\d+", ss[0][1]): cur = None
    seen = {}
    for r in out: r["text"] = clean(r.pop("parts")); seen.setdefault(r["ref"], r)
    return list(seen.values())


RETRIEVED = "2026-11-23"
SOURCES = {
    "dfe-nc": dict(name="National curriculum in England: science programmes of study", body="Department for Education",
                   url="https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study/national-curriculum-in-england-science-programmes-of-study",
                   version="Published September 2013; page updated 6 May 2015", status="statutory"),
    "aqa-8461": dict(name="AQA GCSE Biology (8461)", body="AQA", url="https://filestore.aqa.org.uk/resources/biology/specifications/AQA-8461-SP-2016.PDF",
                     version="Version 1.0, 21 April 2016 (for exams 2018 onwards)", status="examination", qualification="gcse", combined="AQA GCSE Combined Science: Trilogy (8464)"),
    "edexcel-1bi0": dict(name="Pearson Edexcel GCSE (9–1) Biology (1BI0)", body="Pearson Edexcel", url="https://qualifications.pearson.com/content/dam/pdf/GCSE/Science/2016/Specification/gcse-biology-spec.pdf",
                         version="Issue 4, March 2024", status="examination", qualification="gcse", combined="Pearson Edexcel GCSE Combined Science (1SC0)"),
    "ocr-j247": dict(name="OCR GCSE (9–1) Biology A (Gateway Science) (J247)", body="OCR", url="https://www.ocr.org.uk/Images/234594-specification-accredited-gcse-gateway-science-suite-biology-a-j247.pdf",
                     version="Version 4.0, August 2026", status="examination", qualification="gcse", combined="OCR GCSE Combined Science A (Gateway Science) (J250)"),
    "ocr-j257": dict(name="OCR GCSE (9–1) Biology B (Twenty First Century Science) (J257)", body="OCR", url="https://www.ocr.org.uk/Images/234595-specification-accredited-gcse-twenty-first-century-science-suite-biology-b-j257.pdf",
                     version="Version 4.0, August 2026", status="examination", qualification="gcse", combined="OCR GCSE Combined Science B (Twenty First Century Science) (J260)"),
    "eduqas-c400": dict(name="WJEC Eduqas GCSE (9–1) Biology", body="WJEC Eduqas", url="https://www.eduqas.co.uk/media/gg2joueu/eduqas-gcse-biology-spec-from-2016-e.pdf",
                        version="Version 3, January 2019", status="examination", qualification="gcse", combined="WJEC Eduqas GCSE (9–1) Combined Science"),
}
PREFIX = {"aqa-8461": "aqa8461", "edexcel-1bi0": "edx1bi0", "ocr-j247": "ocrj247", "ocr-j257": "ocrj257", "eduqas-c400": "eduqas"}


def slug(t):
    return re.sub(r"[^a-z0-9]+", "-", (t or "").lower().replace("–", "-")).strip("-")


def records(data):
    out, n = [], {}
    for r in data["nc"]:
        y = r["year"]; ws = r["topic"] == "Working scientifically"
        if ws: band = {"1-2": "ks1", "3-4": "lks2", "5-6": "uks2", "7-9": "ks3", "10-11": "ks4"}[y]
        else: band = f"y{y}" if isinstance(y, int) else {"7-9": "ks3", "10-11": "ks4"}[y]
        area = "ws" if ws else slug(r["sub"] if r["stage"] in ("KS3", "KS4") else r["topic"])
        key = f"eng-nc-{band}-{area}" if not ws or not r["sub"] else f"eng-nc-{band}-ws-{slug(r['sub'])}"
        n[key] = n.get(key, 0) + 1
        years = [y] if isinstance(y, int) else list(range(int(y.split("-")[0]), int(y.split("-")[1]) + 1))
        out.append(dict(id=f"{key}-{n[key]:02d}", source="dfe-nc", curriculum="National curriculum: science", qualification=None, body="Department for Education",
                        keyStage=r["stage"], years=years, yearAllocation="year" if isinstance(y, int) else ("stage" if not ws else "phase"),
                        discipline="science-wide" if ws else "biology", topic=("Working scientifically" if ws else r["topic"].replace("Subject content – ", "")),
                        subtopic=r["sub"] if r["stage"] in ("KS3", "KS4") or ws else None, ref=None, text=r["text"], loc=r["loc"],
                        status="statutory"))
    for k in ("aqa", "edexcel", "ocrA", "ocrB", "eduqas"):
        for r in data[k]:
            src = SOURCES[r["source"]]
            ref = r["ref"].replace("(", "").replace(")", "")
            rec = dict(id=f"eng-{PREFIX[r['source']]}-{ref}", source=r["source"], curriculum=src["name"], qualification="gcse", body=src["body"],
                       keyStage="KS4", years=[10, 11], yearAllocation="stage", discipline="biology",
                       topic=r.get("topic"), subtopic=r.get("sub"), ref=r["ref"], title=r.get("title"), text=r["text"], loc=r["loc"], status="examination",
                       separateOnly=r.get("biologyOnly") if r["source"] in ("aqa-8461", "edexcel-1bi0", "ocr-j257") else None)
            if r.get("include"): rec["include"] = r["include"]
            if r.get("higherOnly"): rec["tier"] = "higher"
            if r.get("corePractical") or r.get("practical"): rec["practical"] = True
            out.append({k2: v for k2, v in rec.items() if v is not None or k2 in ("separateOnly", "subtopic")})
    ids = [r["id"] for r in out]; assert len(ids) == len(set(ids)), "duplicate requirement ids"
    return out


data = {"nc": national_curriculum(), "aqa": aqa(), "edexcel": edexcel(), "ocrA": ocr_a(), "ocrB": ocr_b(), "eduqas": eduqas()}
for k, v in data.items(): print(k, len(v))
doc = dict(generated=RETRIEVED, retrieved=RETRIEVED, system="uk-eng", note="Wording is preserved from each document's text layer. Year allocations are the documents' own: the national curriculum sets years 1–6 year by year (lower and upper key stage 2 working scientifically by phase), and key stages 3 and 4 by stage only. Exam board working-scientifically and practical-skills chapters (OCR J247 topic B7, OCR J257 chapters B7–B8) are not extracted yet.",
           sources={k: {**v, "retrieved": RETRIEVED} for k, v in SOURCES.items()}, requirements=records(data))
json.dump(doc, open(sys.argv[2], "w", encoding="utf8"), indent=1, ensure_ascii=False)
print("requirements", len(doc["requirements"]))
