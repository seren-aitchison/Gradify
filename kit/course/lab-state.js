// What an interactive lab shows right now, as plain text for the AI tutor (kit/assess/tutor.js labBlock).
// It's read from the lab's own controls and readout, so it works for every lab built with kit/labs/lab.js (and,
// more roughly, for any other interactive) without each lab writing a report. A lab can add details its page
// doesn't show through ctx.report(text) (kit/course/course.js), which is put first.
//   readLab(root)   browser only: the parts, from the DOM
//   labState(parts) pure: the parts as text, capped (tested in Node)

const line = (s) => String(s ?? "").replace(/\s+/g, " ").trim();

/** @param {HTMLElement} root */
export function readLab(root) {
  const settings = [];
  for (const el of root.querySelectorAll("input, select, .lab-seg")) {
    if (el.matches(".lab-seg")) { const b = el.querySelector('[aria-pressed="true"]'); if (b) settings.push(["Showing", line(b.textContent)]); continue; }
    if (el.closest(".lab-seg") || el.type === "hidden" || el.type === "button" || el.type === "submit") continue;
    const lab = el.closest("label");
    const name = line(el.getAttribute("aria-label") || lab?.querySelector("span")?.textContent || el.placeholder || el.name || "");
    if (el.type === "range") settings.push([name, line(lab?.querySelector("output")?.textContent || el.value)]);
    else if (el.type === "checkbox") settings.push([name, el.checked ? "on" : "off"]);
    else if (el.tagName === "SELECT") settings.push([name, line(el.selectedOptions[0]?.textContent)]);
    else if (["text", "number", "search", ""].includes(el.type)) settings.push([name, line(el.value)]);
  }
  const outs = [...root.querySelectorAll(".lab-out")];
  const readout = outs.length ? outs.map((o) => line(o.textContent)).join(" ") : "";
  const tables = [...root.querySelectorAll("table")].slice(0, 2).map((t) => ({
    caption: line(t.caption?.textContent),
    rows: [...t.rows].map((r) => [...r.cells].map((c) => line(c.textContent))),
  }));
  const challenges = [...root.querySelectorAll(".lab-ch li")].map((li) => ({ text: line(li.textContent).replace(/^[✓○]\s*/, ""), done: li.classList.contains("ok") }));
  // anything else (an interactive not built with the lab toolkit): its visible text
  const fallback = (readout || tables.length) ? "" : line(root.textContent);
  return { settings, readout, tables, challenges, fallback };
}

/**
 * @param {{ report?: string, settings?: [string, string][], readout?: string, tables?: { caption: string, rows: string[][] }[],
 *           challenges?: { text: string, done: boolean }[], fallback?: string }} p
 * @param {number} [max] characters
 */
export function labState(p, max = 2000) {
  const out = [];
  if (p.report) out.push(line(p.report));
  const set = (p.settings || []).filter(([n, v]) => n && v !== "");
  if (set.length) out.push(`Settings: ${set.map(([n, v]) => `${n} = ${v}`).join("; ")}`);
  if (p.readout) out.push(`Readout: ${p.readout}`);
  for (const t of p.tables || []) {
    // long tables keep their header, first rows and last rows: the start and where it ended up
    const rows = t.rows.length > 14 ? [...t.rows.slice(0, 8), ["…"], ...t.rows.slice(-5)] : t.rows;
    out.push(`${t.caption || "Table"}:\n${rows.map((r) => r.join(" | ")).join("\n")}`);
  }
  if (p.challenges?.length) out.push(`Challenges: ${p.challenges.map((c) => `${c.done ? "[done]" : "[not yet]"} ${c.text}`).join("; ")}`);
  if (!out.length && p.fallback) out.push(p.fallback);
  const s = out.join("\n");
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}
