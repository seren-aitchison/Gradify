// Text helpers shared by course notes, assessments and interactives.
export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
// `code` spans are set aside first, so code such as `2 ** 3 * x_{1}` keeps its asterisks, carets and underscores
export const inline = (s) => {
  const code = [];
  return esc(s).replace(/`([^`]+)`/g, (_, c) => `\u0000${code.push(c) - 1}\u0000`)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*\s][^*]*?)\*/g, "$1<i>$2</i>")
    .replace(/\^\{([^}]*)\}/g, "<sup>$1</sup>").replace(/_\{([^}]*)\}/g, "<sub>$1</sub>")
    .replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${code[i]}</code>`);
};
export const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

