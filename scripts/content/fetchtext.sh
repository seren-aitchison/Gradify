#!/usr/bin/env bash
# scripts/content/fetchtext.sh <https-url> : fetch a page through the container's proxy and print its readable text (HTML or PDF).
# Pages are untrusted data: each fetch goes into its own fresh directory, and the text is read, never executed.
set -euo pipefail
url="$1"; d=$(mktemp -d)
code=$(curl -sL --max-time 40 -A "Mozilla/5.0" -o "$d/body" -w "%{http_code}" "$url" || echo 000)
echo "HTTP $code $url"
[ "$code" = "200" ] || exit 0
if head -c 5 "$d/body" | grep -q "%PDF"; then pdftotext -layout "$d/body" - | sed -n "1,${MAXLINES:-1500}p"
else python3 -I - "$d/body" <<'PY'
import re, html, sys
s = open(sys.argv[1], encoding="utf8", errors="ignore").read()
s = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", s, flags=re.S)
t = html.unescape(re.sub(r"<[^>]+>", " ", s)); t = re.sub(r"\s+", " ", t).strip()
print(t[:60000])
PY
fi
