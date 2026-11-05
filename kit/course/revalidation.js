// NMC revalidation helper (NurseGradify #/revalidation): a private log of practice hours, CPD, practice-related
// feedback, written reflective accounts and the reflective discussion, measured against the NMC's three-yearly
// revalidation requirements, with the declarations as a checklist. It helps a registrant prepare; the NMC
// Online application is the official record, and the requirements are checked against the NMC's current
// guidance (https://www.nmc.org.uk/revalidation/), which the NMC can change.
// Records live in the learner's account (revalidation_entries table) or on this device when signed out.
import { esc } from "../core/text.js";

// the requirements, per three-year revalidation period (NMC, How to revalidate with the NMC)
export const REQUIREMENTS = {
  hours: { label: "Practice hours", need: (s) => (s.dual ? 900 : 450), unit: "hours", note: "450 hours over the three years, or 900 if you're registered as both a nurse and a midwife (or nursing associate)." },
  cpd: { label: "Continuing professional development", need: () => 35, unit: "hours", note: "35 hours, of which at least 20 must be participatory (learning with others)." },
  participatory: { label: "Participatory CPD", need: () => 20, unit: "hours", note: "At least 20 of the 35 CPD hours." },
  feedback: { label: "Practice-related feedback", need: () => 5, unit: "pieces", note: "Five pieces, from any source: people you care for, colleagues, appraisal, audits, complaints or compliments." },
  reflection: { label: "Written reflective accounts", need: () => 5, unit: "accounts", note: "Five, on your CPD, feedback or an event or experience in practice, each linked to the Code." },
  discussion: { label: "Reflective discussion", need: () => 1, unit: "discussion", note: "With another NMC registrant, covering your five reflective accounts." },
};
export const DECLARATIONS = [
  ["health", "Health and character declaration completed"],
  ["indemnity", "Professional indemnity arrangement in place and declared"],
  ["confirmation", "Confirmation with an appropriate confirmer arranged or completed"],
];
export const CODE_THEMES = ["Prioritise people", "Practise effectively", "Preserve safety", "Promote professionalism and trust"];

// the three-year window that counts: up to the renewal date (or today), back three years
export function windowFor(settings, now = new Date()) {
  const end = settings?.renewal ? new Date(`${settings.renewal}T23:59:59`) : now;
  const start = new Date(end); start.setFullYear(start.getFullYear() - 3);
  return { start, end };
}

// entries: [{ kind, date: "YYYY-MM-DD", ...fields }] → progress against each requirement
export function summarise(entries, settings = {}, now = new Date()) {
  const { start, end } = windowFor(settings, now);
  const inWindow = entries.filter((e) => { const d = new Date(`${e.date}T12:00:00`); return d >= start && d <= end; });
  const sum = (kind, f = () => true) => inWindow.filter((e) => e.kind === kind && f(e)).reduce((a, e) => a + (Number(e.hours) || 0), 0);
  const count = (kind) => inWindow.filter((e) => e.kind === kind).length;
  const have = {
    hours: sum("hours"), cpd: sum("cpd"), participatory: sum("cpd", (e) => !!e.participatory),
    feedback: count("feedback"), reflection: count("reflection"), discussion: count("discussion"),
  };
  const rows = Object.entries(REQUIREMENTS).map(([k, r]) => ({ key: k, ...r, have: Math.round(have[k] * 10) / 10, need: r.need(settings), done: have[k] >= r.need(settings) }));
  const declared = DECLARATIONS.filter(([k]) => settings?.declarations?.[k]).length;
  // whole calendar days from today to the renewal date
  const daysLeft = settings?.renewal ? Math.round((new Date(`${settings.renewal}T00:00:00`) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5) : null;
  return { start, end, rows, declared, ready: rows.every((r) => r.done) && declared === DECLARATIONS.length, daysLeft, outside: entries.length - inWindow.length };
}

// the forms for each kind of entry (a field is [name, label, type, options])
const FORMS = {
  hours: { title: "Practice hours", add: "Add hours", fields: [["date", "Date (or end of period)", "date"], ["hours", "Hours", "number"], ["setting", "Where and in what role", "text"], ["scope", "Scope of practice (registration used)", "text"]] },
  cpd: { title: "CPD", add: "Add CPD", fields: [["date", "Date", "date"], ["hours", "Hours", "number"], ["topic", "Topic", "text"], ["method", "Method (course, workshop, reading, e-learning…)", "text"], ["participatory", "Participatory (with others)", "checkbox"], ["relevance", "How it relates to your practice", "textarea"]] },
  feedback: { title: "Practice-related feedback", add: "Add feedback", fields: [["date", "Date", "date"], ["source", "Source (person cared for, colleague, appraisal…)", "text"], ["summary", "What it said (no identifying details)", "textarea"], ["use", "How you used it to improve your practice", "textarea"]] },
  reflection: { title: "Written reflective accounts", add: "Add an account", fields: [["date", "Date", "date"], ["about", "What it is about (CPD, feedback or an event)", "textarea"], ["learnt", "What you learnt", "textarea"], ["changed", "How you changed or improved your practice", "textarea"], ["themes", "Themes of the Code", "themes"]] },
  discussion: { title: "Reflective discussion", add: "Add the discussion", fields: [["date", "Date", "date"], ["partner", "Name of the NMC registrant", "text"], ["pin", "Their NMC PIN (optional)", "text"], ["notes", "Notes (optional)", "textarea"]] },
};
const fmtDate = (d) => (d ? new Date(`${d}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

function fieldHtml(kind, [name, label, type]) {
  const id = `rv-${kind}-${name}`;
  if (type === "checkbox") return `<label class="co-tick"><input type="checkbox" name="${name}"><span>${esc(label)}</span></label>`;
  if (type === "themes") return `<fieldset class="rv-themes"><legend>${esc(label)}</legend>${CODE_THEMES.map((t) => `<label class="co-tick"><input type="checkbox" name="themes" value="${esc(t)}"><span>${esc(t)}</span></label>`).join("")}</fieldset>`;
  if (type === "textarea") return `<label class="rv-f" for="${id}"><span>${esc(label)}</span><textarea id="${id}" name="${name}" rows="3" maxlength="4000"></textarea></label>`;
  return `<label class="rv-f" for="${id}"><span>${esc(label)}</span><input id="${id}" name="${name}" type="${type}" ${type === "number" ? 'min="0" max="2000" step="0.5"' : 'maxlength="300"'} ${["date", "hours"].includes(name) ? "required" : ""}></label>`;
}
function entryHtml(e) {
  const f = FORMS[e.kind];
  const main = e.kind === "hours" ? `${e.hours} h · ${esc(e.setting || "")}` : e.kind === "cpd" ? `${e.hours} h · ${esc(e.topic || "")}${e.participatory ? " · participatory" : ""}` : e.kind === "feedback" ? esc(e.source || "Feedback") : e.kind === "reflection" ? esc((e.about || "").slice(0, 90)) : `With ${esc(e.partner || "")}`;
  const more = f.fields.filter(([n, , t]) => !["date", "hours", "participatory"].includes(n) && t !== "themes" && e[n]).map(([n, l]) => `<p><b>${esc(l)}:</b> ${esc(e[n])}</p>`).join("") + (e.themes?.length ? `<p><b>Code themes:</b> ${esc(e.themes.join(", "))}</p>` : "");
  return `<li><details><summary><span>${esc(fmtDate(e.date))}</span> ${main}</summary>${more}<button type="button" class="rv-del" data-del="${esc(e.id)}">Delete</button></details></li>`;
}

// the view. store: a Gradify store with listRevalidation / saveRevalidation / deleteRevalidation
export async function mountRevalidation(main, store, { accountHref }) {
  main.innerHTML = `<div class="co-panel"><p>Loading your revalidation record…</p></div>`;
  let entries = [];
  try { entries = await store.listRevalidation(); } catch { main.innerHTML = `<div class="co-panel"><p>Your revalidation record isn't available here yet. If you're signed in, the account's revalidation table may not be set up.</p></div>`; return; }
  const settingsEntry = () => entries.find((e) => e.kind === "settings");
  const paint = () => {
    const settings = settingsEntry() || { kind: "settings" }, sm = summarise(entries.filter((e) => e.kind !== "settings"), settings);
    main.innerHTML = `<div class="rv-root"><div class="co-intro"><span class="co-kicker">NMC revalidation</span><h2>Your revalidation record</h2>
        <p>Log your practice hours, CPD, feedback and reflections as you go, and see how close you are to the NMC's requirements for your next revalidation. ${store.mode === "cloud" ? "Saved privately in your account." : `Saved on this device only. <a href="${esc(accountHref)}">Sign in</a> to keep it in your account.`}</p></div>
      <p class="co-draft" role="note"><b>Keep it anonymous.</b> Don't record anything that could identify a person you care for, a colleague or a service user. This record helps you prepare: your application on NMC Online is the official one, and you should check the requirements against the <a href="https://www.nmc.org.uk/revalidation/" target="_blank" rel="noopener">NMC's current revalidation guidance</a>.</p>
      <section class="co-panel rv-set"><h3>Your revalidation date</h3><form class="rv-settings"><label class="rv-f"><span>Application due (renewal) date</span><input type="date" name="renewal" value="${esc(settings.renewal || "")}"></label>
        <label class="co-tick"><input type="checkbox" name="dual" ${settings.dual ? "checked" : ""}><span>I'm registered as both a nurse and a midwife (or nursing associate): 900 practice hours</span></label>
        <fieldset><legend>Declarations</legend>${DECLARATIONS.map(([k, l]) => `<label class="co-tick"><input type="checkbox" name="decl" value="${k}" ${settings.declarations?.[k] ? "checked" : ""}><span>${esc(l)}</span></label>`).join("")}</fieldset>
        <button type="submit" class="btn btn-ghost lg btn-sm"><span>Save</span></button></form>
        <p class="rv-window">Counting ${esc(sm.start.toLocaleDateString("en-GB"))} to ${esc(sm.end.toLocaleDateString("en-GB"))}${sm.daysLeft != null ? ` · ${sm.daysLeft >= 0 ? `${sm.daysLeft} days to go` : "date passed"}` : " · set your date to count the right three years"}${sm.outside ? ` · ${sm.outside} entr${sm.outside === 1 ? "y is" : "ies are"} outside this period` : ""}.</p></section>
      <section class="co-panel rv-progress"><h3>${sm.ready ? "Everything's in place" : "Progress"}</h3>${sm.rows.map((r) => `<div class="rv-row${r.done ? " done" : ""}"><div><b>${esc(r.label)}</b><small>${esc(r.note)}</small></div><span>${r.have} / ${r.need} ${esc(r.unit)}</span><i style="--p:${Math.min(1, r.have / r.need)}"></i></div>`).join("")}
        <div class="rv-row${sm.declared === DECLARATIONS.length ? " done" : ""}"><div><b>Declarations</b><small>Health and character, indemnity, and confirmation.</small></div><span>${sm.declared} / ${DECLARATIONS.length}</span><i style="--p:${sm.declared / DECLARATIONS.length}"></i></div>
        <div class="co-wactions"><button type="button" class="btn btn-ghost lg btn-sm" data-print><span>Print a summary</span></button><button type="button" class="btn btn-ghost lg btn-sm" data-download><span>Download my record</span></button></div></section>
      ${Object.entries(FORMS).map(([kind, f]) => { const list = entries.filter((e) => e.kind === kind).sort((a, b) => b.date.localeCompare(a.date)); return `<section class="co-panel rv-kind"><h3>${esc(f.title)} <small>${list.length}</small></h3>
        <ul class="rv-list">${list.map(entryHtml).join("") || `<li class="co-empty">Nothing yet.</li>`}</ul>
        <details class="rv-add"><summary>${esc(f.add)}</summary><form data-kind="${kind}">${f.fields.map((x) => fieldHtml(kind, x)).join("")}<button type="submit" class="btn btn-light lg btn-sm"><span>Save</span></button></form></details></section>`; }).join("")}</div>`;
    wire();
  };
  const wire = () => {
    main.querySelector(".rv-settings").addEventListener("submit", async (e) => {
      e.preventDefault(); const fd = new FormData(e.currentTarget);
      const s = { ...(settingsEntry() || { kind: "settings" }), kind: "settings", date: new Date().toISOString().slice(0, 10), renewal: fd.get("renewal") || "", dual: fd.get("dual") === "on", declarations: Object.fromEntries(fd.getAll("decl").map((k) => [k, true])) };
      const saved = await store.saveRevalidation(s); entries = [...entries.filter((x) => x.kind !== "settings"), saved]; paint();
    });
    for (const form of main.querySelectorAll("form[data-kind]")) form.addEventListener("submit", async (e) => {
      e.preventDefault(); const fd = new FormData(form), kind = form.dataset.kind;
      const entry = { kind };
      for (const [name, , type] of FORMS[kind].fields) entry[name] = type === "checkbox" ? fd.get(name) === "on" : type === "themes" ? fd.getAll("themes") : type === "number" ? Number(fd.get(name)) || 0 : String(fd.get(name) || "").trim();
      if (!entry.date) return;
      const saved = await store.saveRevalidation(entry); entries.push(saved); paint();
      main.querySelector(`form[data-kind="${kind}"]`)?.closest("details")?.removeAttribute("open");
    });
    main.querySelector(".rv-root").addEventListener("click", async (e) => {
      const del = e.target.closest("[data-del]");
      if (del && confirm("Delete this entry?")) { await store.deleteRevalidation(del.dataset.del); entries = entries.filter((x) => x.id !== del.dataset.del); paint(); }
      if (e.target.closest("[data-print]")) print();
      if (e.target.closest("[data-download]")) {
        const blob = new Blob([JSON.stringify({ exported: new Date().toISOString(), entries }, null, 2)], { type: "application/json" });
        const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: "nmc-revalidation-record.json" });
        document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      }
    });
  };
  paint();
}
