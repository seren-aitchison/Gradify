// Text from a PDF, in reading order, line by line: the bundled pdf.js (kit/vendor/pdfjs), loaded on first use. Items
// are grouped into lines by their position on the page, so a table row stays on one line ("CHEM2001  Organic
// Chemistry  20  Level 5"). Nothing leaves the browser.
let ready = null;
function loadPdfJs() {
  ready ||= new Promise((ok, fail) => {
    if (window.pdfjsLib) { ok(window.pdfjsLib); return; }
    const s = document.createElement("script");
    s.src = new URL("../vendor/pdfjs/pdf.min.js", import.meta.url).href;
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("../vendor/pdfjs/pdf.worker.min.js", import.meta.url).href; ok(window.pdfjsLib); };
    s.onerror = () => { ready = null; fail(new Error("Couldn't load the PDF reader.")); };
    document.head.appendChild(s);
  });
  return ready;
}

/** a PDF's text, one line per printed line, cells separated by two spaces; `maxPages` caps very long handbooks */
export async function pdfLines(file, maxPages = 80) {
  const lib = await loadPdfJs();
  const doc = await lib.getDocument({ data: await file.arrayBuffer() }).promise;
  const out = [];
  for (let n = 1; n <= Math.min(doc.numPages, maxPages); n++) {
    const items = (await (await doc.getPage(n)).getTextContent()).items.filter((it) => it.str && it.str.trim());
    const rows = [];
    for (const it of items) {
      const [x, y] = [it.transform[4], it.transform[5]];
      let row = rows.find((r) => Math.abs(r.y - y) < 3);
      if (!row) rows.push(row = { y, cells: [] });
      row.cells.push({ x, s: it.str, w: it.width || 0 });
    }
    rows.sort((a, b) => b.y - a.y);
    for (const r of rows) {
      r.cells.sort((a, b) => a.x - b.x);
      let line = "", end = null;
      for (const c of r.cells) { line += end === null ? c.s : (c.x - end > 12 ? "  " : c.x - end > 1 ? " " : "") + c.s; end = c.x + c.w; }
      out.push(line.trim());
    }
    out.push("");
  }
  return out.join("\n");
}

/** text from a handbook file: PDF through pdf.js, anything else as plain text */
export const fileText = (file) => (/\.pdf$/i.test(file.name) || file.type === "application/pdf" ? pdfLines(file) : file.text());
