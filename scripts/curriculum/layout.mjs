// Reading a PDF's layout: pages of text blocks with their positions, from `pdftotext -bbox-layout`. Awarding bodies
// lay specifications out in columns (AQA: content on the left, skills opportunities on the right), and a block is
// roughly a paragraph, so positions let an extractor keep each statement whole and in its column.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const ENT = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
const decode = (s) => s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) => (e[0] === "#" ? String.fromCodePoint(e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : +e.slice(1)) : ENT[e] ?? m));
const num = (a, k) => +a.match(new RegExp(`${k}="([-0-9.]+)"`))[1];

/** [{ page, width, height, blocks: [{ x, y, x2, y2, lines: [string] }] }] from bbox-layout XHTML (pure) */
export function parseBboxLayout(html) {
  const pages = [];
  for (const [, pa, body] of html.matchAll(/<page([^>]*)>([\s\S]*?)<\/page>/g)) {
    const page = { page: pages.length + 1, width: num(pa, "width"), height: num(pa, "height"), blocks: [] };
    for (const [, ba, bb] of body.matchAll(/<block([^>]*)>([\s\S]*?)<\/block>/g)) {
      const lines = [...bb.matchAll(/<line[^>]*>([\s\S]*?)<\/line>/g)].map(([, l]) => [...l.matchAll(/<word[^>]*>([\s\S]*?)<\/word>/g)].map(([, w]) => decode(w)).join(" ")).filter(Boolean);
      if (lines.length) page.blocks.push({ x: num(ba, "xMin"), y: num(ba, "yMin"), x2: num(ba, "xMax"), y2: num(ba, "yMax"), lines });
    }
    pages.push(page);
  }
  return pages;
}

export const pdfLayout = (file) => parseBboxLayout(execFileSync("pdftotext", ["-bbox-layout", file, "-"], { encoding: "utf8", maxBuffer: 256e6 }));
export const fileHash = (file, algo = "sha1") => createHash(algo).update(readFileSync(file)).digest("hex");
export const textHash = (s) => createHash("sha256").update(s).digest("hex").slice(0, 16);
