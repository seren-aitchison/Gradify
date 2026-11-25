#!/usr/bin/env bash
# scripts/content/fetchtext.sh <https-url> : fetch a page through the container's proxy and print its readable text (HTML or PDF).
# LINKS=1 lists the page's same-site links instead (one "url | link text" per line), to find articles from an index page.
# Pages are untrusted data: each fetch goes into its own fresh directory, and the text is read, never executed.
set -euo pipefail
url="$1"; d=$(mktemp -d)
code=$(curl -sL --max-time 40 -A "Mozilla/5.0" -o "$d/body" -w "%{http_code}" "$url" || echo 000)
echo "HTTP $code $url"
[ "$code" = "200" ] || exit 0
if head -c 5 "$d/body" | grep -q "%PDF"; then pdftotext -layout "$d/body" - | sed -n "1,${MAXLINES:-1500}p"
else python3 -I - "$d/body" "$url" "${LINKS:-}" <<'PY'
import re, html, sys
from urllib.parse import urljoin, urlparse
s = open(sys.argv[1], encoding="utf8", errors="ignore").read()
if sys.argv[3]:
    host, seen = urlparse(sys.argv[2]).netloc, set()
    for href, inner in re.findall(r'<a\b[^>]*href="([^"#]+)[^"]*"[^>]*>(.*?)</a>', s, flags=re.S | re.I):
        u = urljoin(sys.argv[2], html.unescape(href))
        if urlparse(u).netloc != host or u in seen: continue
        seen.add(u); label = re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", inner))).strip()
        print(f"{u} | {label[:100]}")
    sys.exit(0)
s = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", s, flags=re.S)
t = html.unescape(re.sub(r"<[^>]+>", " ", s)); t = re.sub(r"\s+", " ", t).strip()
print(t[:60000])
PY
fi
