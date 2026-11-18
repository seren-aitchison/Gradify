// The spidermap as a Markdown outline, with the learner's own edits, links and (when synced) memory of each term.
// Pure, so Node tests it. The view offers it as a download and a copy.
const pct = (v) => `${Math.round(v * 100)}%`;

export function toMarkdown(map, intel, memory = null) {
  const mem = memory?.terms || new Map();
  const kids = (id) => map.nodes.filter((n) => n.parent === id);
  const line = (n, depth) => {
    const pad = "  ".repeat(depth), m = mem.get(n.id);
    const tail = m ? ` _(${m.state === "new" ? "not reviewed yet" : m.state}${m.recall != null ? `, ${pct(m.recall)} recall` : ""})_` : "";
    const head = n.type === "term" ? `${pad}- **${n.label}**${n.sub ? `: ${n.sub}${/[.!?]$/.test(n.sub) ? "" : "."}` : ""}${tail}` : n.type === "eq" ? `${pad}- \`${n.label}\`` : `${pad}- ${n.label}`;
    return [head, ...kids(n.id).flatMap((k) => line(k, depth + 1))];
  };
  const root = map.byId.get("root");
  const out = [`# ${root.label}`, ""];
  for (const t of kids("root").filter((n) => n.type === "topic")) out.push(`## ${t.label}${t.acronym ? ` (${t.acronym})` : ""}`, "", ...kids(t.id).flatMap((k) => line(k, 0)), "");
  const rest = kids("root").filter((n) => n.type !== "topic");
  if (rest.length) out.push("## Formulas and notes", "", ...rest.flatMap((k) => line(k, 0)), "");
  const label = (id) => map.byId.get(id)?.label || id;
  const links = [...(intel?.links || []).filter((l) => l.kind !== "formula"), ...map.links.filter((l) => l.kind === "user")];
  if (links.length) out.push("## Links", "", ...links.map((l) => `- ${label(l.to)} ${l.kind === "contrast" ? "is easy to mix up with" : l.kind === "user" ? "links to" : "builds on"} ${label(l.from)}`), "");
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
