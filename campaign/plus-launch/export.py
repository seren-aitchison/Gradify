"""Builds the send-ready files in export/ from email.html, email.txt and signature.html.
Run from the repo root: python3 campaign/plus-launch/export.py
- Drops the authoring comment, and the Discord parts while there's no invite (DISCORD_URL below).
- Fills the reason line (WHY): this is a one-off outreach email, not a reply to a sign-up.
- {$unsubscribe} is left for MailerLite to fill with each recipient's unsubscribe link.
- Writes an .eml for test sends: open it in Apple Mail, then Message > Send Again."""
import re, os
from email.message import EmailMessage
from email.utils import formatdate, make_msgid

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "export")
DISCORD_URL = ""  # e.g. "https://discord.gg/xxxx"; empty drops the Discord parts
WHY = ("This is a one-off email from Gradify about our launch offer. To stop hearing from us, use the unsubscribe "
       "link below, or reply and say so.")
FILL = {}  # any {{PLACEHOLDER}} values to fill, e.g. {"DISCORD_URL": "https://discord.gg/xxxx"}
SUBJECT = "Try Gradify Pro: £5 for your first month, until 22 November"

def fill(s):
    s = s.replace("{{WHY_YOU_GET_THIS}}", WHY)
    for k, v in FILL.items(): s = s.replace("{{%s}}" % k, v)
    if DISCORD_URL: s = s.replace("{{DISCORD_URL}}", DISCORD_URL)
    return s

html = open(os.path.join(HERE, "email.html")).read()
html = re.sub(r"<!doctype html>\s*<!--.*?-->", "<!doctype html>", html, count=1, flags=re.S)
txt = open(os.path.join(HERE, "email.txt")).read()
sig = open(os.path.join(HERE, "signature.html")).read()
sig = re.sub(r"^<!--.*?-->\s*", "", sig, count=1, flags=re.S)
if not DISCORD_URL:
    html = re.sub(r"\s*<!-- DISCORD: delete this block.*?<!-- end DISCORD -->", "", html, count=1, flags=re.S)
    txt = re.sub(r"\[DISCORD: delete.*?\[end DISCORD\]\n\n", "", txt, flags=re.S)
    sig = re.sub(r"\s*<!-- DISCORD: delete the next line.*?\n.*?\n", "\n", sig, count=1)
html, txt, sig = fill(html), fill(txt), fill(sig)
body_txt = txt.split("----------------------------------------------------------------------\n", 1)[1].lstrip("\n")

# refuse before writing anything
assert "{$unsubscribe}" in html and "{$unsubscribe}" in body_txt, "the MailerLite unsubscribe link is missing"
os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "gradify-plus-launch.html"), "w").write(html)
open(os.path.join(OUT, "gradify-plus-launch.txt"), "w").write(body_txt)
open(os.path.join(OUT, "signature.html"), "w").write(sig)
m = EmailMessage()
m["Subject"] = SUBJECT
m["From"] = "Seren at Gradify <hello@getgradify.com>"
m["To"] = "you@example.com"
m["Date"] = formatdate(localtime=True)
m["Message-ID"] = make_msgid(domain="getgradify.com")
m.set_content(body_txt)
m.add_alternative(html, subtype="html")
open(os.path.join(OUT, "gradify-plus-launch-test.eml"), "w").write(m.as_string())
left = sorted(set(re.findall(r"\{\{([A-Z_]+)\}\}", html + body_txt + sig)))
print("still to fill:", ", ".join(left) or "nothing")
