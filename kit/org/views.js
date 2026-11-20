// The organisation screens (app.html#/org…), joining by invitation (#/join/<token>), the inbox (#/inbox) and
// "Teach on Gradify" in Settings. Stage 1 of the blended-learning programme (docs/architecture/BLENDED-LEARNING-AUDIT.md):
// organisations, their structure, members, invitations, licences and AI allowances, data arrangements and the audit
// log. Every action is checked again by the database (has_perm, in context); these screens only decide what to offer.
import * as A from "./api.js";
import { orgOf, can, orgNav, writeWorkspace, PERSONAL, KINDS, ROLES, PURPOSES, ARRANGEMENTS, JOIN_REASONS, invitableRoles } from "./workspace.js";
import { icon } from "../core/icons.js";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const $ = (s, el = document) => el.querySelector(s);
const when = (d) => (d ? new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "");
const day = (d) => (d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");
let cssP = null;
const css = () => (cssP ||= new Promise((ok) => { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = new URL("./org.css", import.meta.url).href; l.onload = l.onerror = ok; document.head.append(l); setTimeout(ok, 3000); }));
const signinHtml = (what) => `<article class="panel glass org-empty"><h3>Sign in to ${what}</h3><p class="sub">Organisations, invitations and your inbox are part of your Gradify account. It's the same account you learn with: joining an organisation never shares your own study with it.</p><a class="btn btn-primary lg btn-sm" href="#/account"><span>Sign in</span></a></article>`;
const missingHtml = `<article class="panel glass org-empty"><h3>Organisations aren't switched on yet</h3><p class="sub">They arrive with the next Gradify update. Your personal Gradify works as always.</p></article>`;
const fail = (view, e) => { view.innerHTML = e?.signin ? signinHtml("use organisations") : e?.missing ? missingHtml : `<article class="panel glass org-empty"><h3>Something went wrong</h3><p class="sub">${esc(e?.message)}</p></article>`; };
// runs a form's action with a busy button and the database's own words on failure
async function act(btn, ctx, fn, done) {
  const label = btn?.innerHTML;
  if (btn) { btn.disabled = true; btn.innerHTML = "<span>Working…</span>"; }
  try { const r = await fn(); await done?.(r); return r; }
  catch (e) { ctx.toast(esc(e.message)); }
  finally { if (btn?.isConnected) { btn.disabled = false; btn.innerHTML = label; } }
}

// ---------- #/org and #/org/<id>/<section> ----------
export async function renderOrg(view, ctx) {
  await css();
  if (ctx.store.mode !== "cloud") { view.innerHTML = signinHtml("create or join an organisation"); return; }
  const [, id, section = "overview"] = location.hash.replace(/^#\/?/, "").split("/");
  let contexts;
  try { contexts = await A.contexts(ctx.store); } catch (e) { return fail(view, e); }
  if (!id) return orgIndex(view, ctx, contexts);
  const org = orgOf(contexts, id);
  if (!org) { view.innerHTML = `<article class="panel glass org-empty"><h3>You're not a member of this organisation</h3><p class="sub">Or it has been archived. If you were invited, open the invitation link again.</p><a class="btn btn-ghost lg btn-sm" href="#/org"><span>Your organisations</span></a></article>`; return; }
  writeWorkspace(org.id); ctx.onWorkspace?.();
  const S = { overview, members: membersScreen, units: unitsScreen, invitations: invitationsScreen, licences: licencesScreen, data: dataScreen, audit: auditScreen };
  const nav = orgNav(org);
  view.innerHTML = `<section class="org">
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("building")}${esc(KINDS[org.kind] || "Organisation")}${org.verified ? ' · <span class="org-verified">Verified</span>' : ""}</span><h1>${esc(org.name)}</h1>
      <p class="sub">Your role${org.roles.length > 1 ? "s" : ""}: ${org.roles.map((r) => `${esc(ROLES[r.role] || r.role)}${r.unit_name ? ` in ${esc(r.unit_name)}` : ""}`).join(", ")}.</p></div></div>
    <nav class="org-tabs" aria-label="${esc(org.name)}">${nav.map((n) => `<a href="${n.href}" ${location.hash.replace(/\/$/, "") === n.href || (n.label === "Overview" && section === "overview") ? 'aria-current="page"' : ""}>${esc(n.label)}</a>`).join("")}</nav>
    <div id="org-body"><p class="sub">Loading…</p></div></section>`;
  const body = $("#org-body", view);
  try { await (S[section] || overview)(body, ctx, org, contexts); } catch (e) { fail(body, e); }
}

async function orgIndex(view, ctx, contexts) {
  writeWorkspace(PERSONAL); ctx.onWorkspace?.();
  const mine = contexts.organisations;
  view.innerHTML = `<section class="org">
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("building")}Organisations</span><h1>Your organisations</h1><p class="sub">Schools, colleges, universities, training providers and employers you learn or teach with. Each is a separate workspace in the same account: switch between them in the sidebar. An organisation sees the work you do for it, never your own study.</p></div></div>
    ${mine.length ? `<div class="lo-grid">${mine.map((o) => `<a class="panel glass org-card" href="#/org/${o.id}"><b>${esc(o.name)}</b><span class="sub">${esc(KINDS[o.kind] || "")}${o.verified ? " · verified" : ""}</span><span class="sub">${o.roles.map((r) => esc(ROLES[r.role] || r.role)).join(", ")}</span></a>`).join("")}</div>` : `<p class="sub">You're not in any organisation yet. To join one, open the invitation link it sent you.</p>`}
    <div class="lo-grid org-two">
      <form class="panel glass org-form" id="org-new"><h3>Create an organisation</h3><p class="sub">You'll be its owner. Verification by Gradify comes later; until then it can't enrol under-13s.</p>
        <label>Name<input name="name" required minlength="2" maxlength="120" placeholder="e.g. Riverside School"></label>
        <label>Kind<select name="kind">${Object.entries(KINDS).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join("")}</select></label>
        <button class="btn btn-primary lg btn-sm"><span>Create</span></button></form>
      <article class="panel glass" id="org-teach"></article>
    </div></section>`;
  $("#org-new", view).addEventListener("submit", (e) => { e.preventDefault(); const f = e.target; act(f.querySelector("button"), ctx, () => A.createOrganisation(ctx.store, f.name.value.trim(), f.kind.value), (id) => { ctx.toast("Created. You're its owner."); location.hash = `#/org/${id}`; }); });
  await teachPanel($("#org-teach", view), ctx, contexts);
}

async function overview(body, ctx, org) {
  const [members, units] = await Promise.all([can(org, "members.read") ? A.members(ctx.store, org.id) : [], A.units(ctx.store, org.id)]);
  body.innerHTML = `<div class="org-stats">
      ${can(org, "members.read") ? `<div class="panel glass"><span class="sub">Members you can see</span><b>${members.filter((m) => m.status === "active").length}</b></div>` : ""}
      <div class="panel glass"><span class="sub">Units</span><b>${units.filter((u) => !u.archived_at).length}</b></div>
      <div class="panel glass"><span class="sub">Status</span><b>${org.verified ? "Verified" : "Not verified"}</b></div></div>
    <article class="panel glass"><h3>What ${esc(org.name)} can see</h3><ul class="org-list">
      <li>Your membership: your role, your unit and the email address you joined with.</li>
      <li>In later stages, the work you do <em>for</em> it: classes you join, work it sets and the results it marks.</li>
      <li><b>Not</b> your own study: your notes, flashcards, reviews, course progress, goals, AI conversations or anything you do in your personal Gradify.</li></ul></article>
    <div class="lo-grid org-two">
      ${can(org, "org.manage") ? `<form class="panel glass org-form" id="org-rename"><h3>Name</h3><label>Organisation name<input name="name" value="${esc(org.name)}" required minlength="2" maxlength="120"></label><button class="btn btn-light lg btn-sm"><span>Save</span></button></form>` : ""}
      <article class="panel glass"><h3>Leave or archive</h3><p class="sub">Leaving ends your membership. ${can(org, "org.archive") ? "Archiving closes the organisation for everyone: nothing is deleted, and every permission in it stops at once." : ""}</p>
        <div class="row-actions"><button type="button" class="btn btn-ghost lg btn-sm" id="org-leave"><span>Leave ${esc(org.name)}</span></button>${can(org, "org.archive") ? `<button type="button" class="btn btn-ghost lg btn-sm" id="org-archive"><span>Archive organisation</span></button>` : ""}</div></article></div>`;
  $("#org-rename", body)?.addEventListener("submit", (e) => { e.preventDefault(); act(e.target.querySelector("button"), ctx, () => A.renameOrganisation(ctx.store, org.id, e.target.name.value.trim()), () => { ctx.toast("Saved."); ctx.rerender(); }); });
  $("#org-leave", body).onclick = (e) => { if (confirm(`Leave ${org.name}? You'll need a new invitation to come back.`)) act(e.currentTarget, ctx, () => A.leave(ctx.store, org.id), () => { writeWorkspace(PERSONAL); ctx.onWorkspace?.(); location.hash = "#/org"; }); };
  $("#org-archive", body)?.addEventListener("click", (e) => { if (confirm(`Archive ${org.name}? Every member loses access straight away. Nothing is deleted.`)) act(e.currentTarget, ctx, () => A.archiveOrganisation(ctx.store, org.id), () => { writeWorkspace(PERSONAL); ctx.onWorkspace?.(); location.hash = "#/org"; }); });
}

const unitPath = (units, id) => { const by = new Map(units.map((u) => [u.id, u])), out = []; for (let u = by.get(id), n = 0; u && n < 50; u = by.get(u.parent_id), n++) out.unshift(u.name); return out.join(" › "); };
const unitOptions = (units, { none = "The whole organisation" } = {}) => `<option value="">${esc(none)}</option>${units.filter((u) => !u.archived_at).map((u) => ({ u, p: unitPath(units, u.id) })).sort((a, b) => a.p.localeCompare(b.p)).map(({ u, p }) => `<option value="${u.id}">${esc(p)}</option>`).join("")}`;

async function membersScreen(body, ctx, org) {
  const [list, units] = await Promise.all([A.members(ctx.store, org.id), A.units(ctx.store, org.id)]);
  const manage = can(org, "members.manage");
  const roleSel = (m) => `<select data-role="${m.id}" aria-label="Role for ${esc(m.email)}">${Object.entries(ROLES).filter(([r]) => r !== "guardian").map(([r, l]) => `<option value="${r}" ${r === m.role ? "selected" : ""}>${esc(l)}</option>`).join("")}</select>`;
  body.innerHTML = `<div class="org-bar"><input id="m-q" placeholder="Search by email" aria-label="Search members">${can(org, "members.invite") ? `<a class="btn btn-light lg btn-sm" href="#/org/${org.id}/invitations"><span>Invite people</span></a>` : ""}</div>
    <div class="org-tablewrap"><table class="org-table"><thead><tr><th>Email</th><th>Role</th><th>Unit</th><th>Status</th><th>Since</th>${manage ? "<th></th>" : ""}</tr></thead><tbody id="m-rows"></tbody></table></div>
    <p class="sub">${list.length} ${list.length === 1 ? "membership" : "memberships"} you can see. Changes take effect at once.</p>`;
  const draw = () => {
    const q = $("#m-q", body).value.toLowerCase();
    $("#m-rows", body).innerHTML = list.filter((m) => !q || m.email.toLowerCase().includes(q)).map((m) => `<tr class="${m.status !== "active" ? "dim" : ""}"><td>${esc(m.email)}</td><td>${manage ? roleSel(m) : esc(ROLES[m.role] || m.role)}</td><td>${esc(m.unit_id ? unitPath(units, m.unit_id) : "Whole organisation")}</td><td><span class="g-pill ${m.status === "active" ? "ok" : "warn"}">${esc(m.status)}</span></td><td>${day(m.created_at)}</td>
      ${manage ? `<td class="org-acts">${m.status === "active" ? `<button type="button" class="btn btn-ghost lg btn-sm" data-st="${m.id}" data-to="suspended"><span>Suspend</span></button>` : `<button type="button" class="btn btn-ghost lg btn-sm" data-st="${m.id}" data-to="active"><span>Restore</span></button>`}${m.status !== "removed" ? `<button type="button" class="btn btn-ghost lg btn-sm" data-st="${m.id}" data-to="removed"><span>Remove</span></button>` : ""}</td>` : ""}</tr>`).join("") || `<tr><td colspan="6" class="sub">No one matches.</td></tr>`;
  };
  draw();
  $("#m-q", body).oninput = draw;
  body.addEventListener("change", (e) => { const id = e.target.dataset.role; if (id) act(null, ctx, () => A.changeRole(ctx.store, id, e.target.value), () => { ctx.toast("Role changed."); list.find((m) => m.id === id).role = e.target.value; }).then((r) => { if (r === undefined) draw(); }); });
  body.addEventListener("click", (e) => { const b = e.target.closest("[data-st]"); if (!b) return; const m = list.find((x) => x.id === b.dataset.st); if (b.dataset.to === "removed" && !confirm(`Remove ${m.email}? They lose access straight away.`)) return; act(b, ctx, () => A.setStatus(ctx.store, m.id, b.dataset.to), () => { m.status = b.dataset.to; draw(); ctx.toast(b.dataset.to === "active" ? "Restored." : b.dataset.to === "suspended" ? "Suspended." : "Removed."); }); });
}

async function unitsScreen(body, ctx, org) {
  const units = await A.units(ctx.store, org.id);
  const kids = (p) => units.filter((u) => (u.parent_id || null) === p).sort((a, b) => a.name.localeCompare(b.name));
  const tree = (p) => { const k = kids(p); return k.length ? `<ul class="org-tree">${k.map((u) => `<li><span class="org-unit"><b>${esc(u.name)}</b> <span class="sub">${esc(u.kind)}</span></span>${tree(u.id)}</li>`).join("")}</ul>` : ""; };
  body.innerHTML = `<div class="lo-grid org-two"><article class="panel glass"><h3>Structure</h3><p class="sub">Faculties, departments, year groups, divisions or teams: any shape. A role in a unit applies to it and everything inside it.</p>${tree(null) || '<p class="sub">No units yet.</p>'}</article>
    ${can(org, "org.units.manage") || org.roles.some((r) => r.role === "unit_head") ? `<form class="panel glass org-form" id="u-new"><h3>Add a unit</h3>
      <label>Inside<select name="parent">${unitOptions(units, { none: "Top level" })}</select></label>
      <label>Kind<input name="kind" required minlength="2" maxlength="40" placeholder="faculty, department, year group, team…" list="u-kinds"><datalist id="u-kinds">${["faculty", "department", "year group", "programme", "division", "team", "campus"].map((k) => `<option value="${k}">`).join("")}</datalist></label>
      <label>Name<input name="name" required maxlength="120" placeholder="e.g. Biology"></label>
      <button class="btn btn-primary lg btn-sm"><span>Add</span></button></form>` : ""}</div>`;
  $("#u-new", body)?.addEventListener("submit", (e) => { e.preventDefault(); const f = e.target; act(f.querySelector("button"), ctx, () => A.createUnit(ctx.store, org.id, f.parent.value || null, f.kind.value.trim(), f.name.value.trim()), () => { ctx.toast("Added."); ctx.rerender(); }); });
}

async function invitationsScreen(body, ctx, org) {
  const [list, units] = await Promise.all([A.invitations(ctx.store, org.id), A.units(ctx.store, org.id)]);
  const state = (i) => (i.revoked_at ? ["Withdrawn", "warn"] : new Date(i.expires_at) <= new Date() ? ["Expired", "warn"] : i.uses >= i.max_uses ? ["Used", "info"] : ["Open", "ok"]);
  body.innerHTML = `<div class="lo-grid org-two">
    <form class="panel glass org-form" id="i-new"><h3>Invite people</h3>
      <label>Role<select name="role">${invitableRoles(org).map((r) => `<option value="${r}" ${r === "student" ? "selected" : ""}>${esc(ROLES[r])}</option>`).join("")}</select></label>
      <label>In<select name="unit">${unitOptions(units)}</select></label>
      <label>Email <em>optional: only that account can accept, and Gradify emails it</em><input name="email" type="email" maxlength="254" placeholder="name@example.com"></label>
      <div class="org-row"><label>Lasts<select name="days">${[1, 3, 7, 14, 30].map((d) => `<option value="${d}" ${d === 7 ? "selected" : ""}>${d} ${d === 1 ? "day" : "days"}</option>`).join("")}</select></label>
      <label>Uses <em>a link for a group</em><input name="uses" type="number" min="1" max="500" value="1"></label></div>
      <button class="btn btn-primary lg btn-sm"><span>Create invitation</span></button>
      <div id="i-link" hidden></div></form>
    <article class="panel glass"><h3>Invitations</h3>${list.length ? `<ul class="org-invites">${list.map((i) => { const [l, c] = state(i); return `<li><span><b>${esc(ROLES[i.role] || i.role)}</b>${i.unit_id ? ` · ${esc(unitPath(units, i.unit_id))}` : ""}${i.email ? ` · ${esc(i.email)}` : ""}</span><span class="sub">${i.uses} of ${i.max_uses} used · until ${day(i.expires_at)}</span><span class="g-pill ${c}">${l}</span>${l === "Open" ? `<button type="button" class="btn btn-ghost lg btn-sm" data-revoke="${i.id}"><span>Withdraw</span></button>` : ""}</li>`; }).join("")}</ul>` : '<p class="sub">None yet.</p>'}
      <p class="sub">Links are shown once, when they're made: Gradify keeps only a fingerprint of each, so a lost link can't be recovered, only withdrawn and replaced.</p></article></div>`;
  $("#i-new", body).addEventListener("submit", (e) => {
    e.preventDefault(); const f = e.target;
    act(f.querySelector("button"), ctx, () => A.invite(ctx.store, { org: org.id, unit: f.unit.value || null, role: f.role.value, email: f.email.value.trim() || null, days: Number(f.days.value), maxUses: f.email.value.trim() ? 1 : Number(f.uses.value) || 1 }), (token) => {
      const url = A.joinLink(token), box = $("#i-link", body);
      box.hidden = false;
      box.innerHTML = `<p class="sub"><b>Copy this link now.</b> It won't be shown again.${f.email.value.trim() ? " It has also been emailed." : ""}</p><div class="org-copy"><input readonly value="${esc(url)}" aria-label="Invitation link"><button type="button" class="btn btn-light lg btn-sm"><span>Copy</span></button></div>`;
      box.querySelector("button").onclick = () => navigator.clipboard?.writeText(url).then(() => ctx.toast("Copied."), () => box.querySelector("input").select());
      box.querySelector("input").select();
    });
  });
  body.addEventListener("click", (e) => { const id = e.target.closest("[data-revoke]")?.dataset.revoke; if (id && confirm("Withdraw this invitation? Its link stops working.")) act(e.target.closest("button"), ctx, () => A.revokeInvitation(ctx.store, id), () => { ctx.toast("Withdrawn."); invitationsScreen(body, ctx, org); }); });
}

async function licencesScreen(body, ctx, org) {
  const [e, members, units] = await Promise.all([A.entitlements(ctx.store, org.id), can(org, "members.read") ? A.members(ctx.store, org.id) : [], A.units(ctx.store, org.id)]);
  const manage = can(org, "entitlements.manage");
  body.innerHTML = `<p class="org-note">${icon("alert")}<span>Licences and AI allowances are set up here ahead of time. <b>They don't change anyone's plan or AI allowance yet</b>: that's switched on in a later, separately approved step.</span></p>
    <article class="panel glass"><h3>Licences</h3>${e.subscriptions.length ? `<ul class="org-invites">${e.subscriptions.map((s) => `<li><span><b>Gradify ${esc(s.plan[0].toUpperCase() + s.plan.slice(1))}</b> · ${s.used} of ${s.seats} seats given</span><span class="sub">${esc(s.status)} · from ${day(s.starts_at)}${s.ends_at ? ` to ${day(s.ends_at)}` : ""}</span>
      ${manage && members.length ? `<form class="org-row" data-seat="${s.id}"><select name="user" aria-label="Member">${members.filter((m) => m.status === "active").map((m) => `<option value="${m.user_id}">${esc(m.email)}</option>`).join("")}</select><button class="btn btn-light lg btn-sm" data-do="assign"><span>Give a seat</span></button><button class="btn btn-ghost lg btn-sm" data-do="revoke"><span>Take back</span></button></form>` : ""}</li>`).join("")}</ul>` : `<p class="sub">No licences yet. Gradify sets these up when an organisation buys seats, so its members can use Gradify Plus or Pro without paying themselves.</p>`}</article>
    <article class="panel glass"><h3>AI allowances</h3>${e.ai_pools.length ? `<div class="org-tablewrap"><table class="org-table"><thead><tr><th>For</th><th>Feature</th><th>Each month</th><th>Per member</th><th>Used this month</th></tr></thead><tbody>${e.ai_pools.map((p) => `<tr><td>${esc(p.unit ? unitPath(units, p.unit) : "Whole organisation")}</td><td>${esc(p.feature)}</td><td>${p.monthly_allowance}</td><td>${p.per_member_cap ?? "—"}</td><td>${p.used_this_month}</td></tr>`).join("")}</tbody></table></div>` : '<p class="sub">No AI allowance yet. Gradify sets the organisation\'s monthly allowance; you can then share it between units.</p>'}
      ${manage && e.ai_pools.some((p) => !p.unit) ? `<form class="org-form" id="pool"><h4>Share with a unit</h4><div class="org-row"><label>Unit<select name="unit" required>${unitOptions(units, { none: "Choose a unit" })}</select></label><label>Feature<select name="feature">${[...new Set(e.ai_pools.filter((p) => !p.unit).map((p) => p.feature))].map((f) => `<option>${esc(f)}</option>`).join("")}</select></label>
        <label>Each month<input name="monthly" type="number" min="0" required></label><label>Per member <em>optional</em><input name="cap" type="number" min="1"></label></div><button class="btn btn-light lg btn-sm"><span>Save</span></button></form>` : ""}</article>`;
  body.addEventListener("click", (ev) => {
    const b = ev.target.closest("[data-do]"); if (!b) return; ev.preventDefault();
    const f = b.closest("form"), sub = f.dataset.seat, user = f.user.value;
    act(b, ctx, () => (b.dataset.do === "assign" ? A.assignSeat(ctx.store, sub, user) : A.revokeSeat(ctx.store, sub, user)), (r) => { ctx.toast(r?.reason === "no_seats" ? "Every seat is taken. Take one back first." : b.dataset.do === "assign" ? (r?.already ? "They already have a seat." : "Seat given.") : "Seat taken back."); if (r?.reason !== "no_seats") licencesScreen(body, ctx, org); });
  });
  $("#pool", body)?.addEventListener("submit", (ev) => { ev.preventDefault(); const f = ev.target; if (!f.unit.value) return ctx.toast("Choose a unit."); act(f.querySelector("button"), ctx, () => A.allocatePool(ctx.store, { org: org.id, unit: f.unit.value, feature: f.feature.value, monthly: Number(f.monthly.value), perMemberCap: f.cap.value ? Number(f.cap.value) : null }), () => { ctx.toast("Saved."); licencesScreen(body, ctx, org); }); });
}

async function dataScreen(body, ctx, org) {
  const rows = await A.dataPolicies(ctx.store, org.id);
  const owner = can(org, "org.data_policy.manage");
  body.innerHTML = `<article class="panel glass"><h3>How ${esc(org.name)}'s data is handled</h3><p class="sub">Who decides how data is used (the controller) can differ for each purpose. Nothing is assumed: each purpose starts as “not agreed yet”, an owner records what's been agreed, and Gradify confirms it after review. This is a record, not legal advice.</p>
    <div class="org-tablewrap"><table class="org-table"><thead><tr><th>Purpose</th><th>Arrangement</th><th>Kept for</th><th>Agreement</th><th>Gradify</th></tr></thead><tbody>${Object.keys(PURPOSES).map((p) => { const r = rows.find((x) => x.purpose === p) || {}; return `<tr><td>${esc(PURPOSES[p])}</td>
      <td>${owner ? `<select data-p="${p}" data-k="arrangement">${Object.entries(ARRANGEMENTS).map(([k, v]) => `<option value="${k}" ${k === (r.arrangement || "undecided") ? "selected" : ""}>${esc(v)}</option>`).join("")}</select>` : esc(ARRANGEMENTS[r.arrangement] || ARRANGEMENTS.undecided)}</td>
      <td>${owner ? `<input data-p="${p}" data-k="retention" type="number" min="30" max="36500" placeholder="days" value="${r.retention_days ?? ""}" aria-label="Days kept">` : r.retention_days ? `${r.retention_days} days` : "—"}</td>
      <td>${owner ? `<input data-p="${p}" data-k="ref" maxlength="200" placeholder="reference" value="${esc(r.agreement_ref || "")}" aria-label="Agreement reference">` : esc(r.agreement_ref || "—")}</td>
      <td>${r.confirmed_by_gradify_at ? `<span class="g-pill ok">Confirmed ${day(r.confirmed_by_gradify_at)}</span>` : '<span class="g-pill info">Not yet</span>'}</td></tr>`; }).join("")}</tbody></table></div>
    ${owner ? `<button type="button" class="btn btn-light lg btn-sm" id="d-save"><span>Save</span></button>` : ""}</article>
    <article class="panel glass"><h3>Never shared with the organisation</h3><p class="sub">A member's own Gradify (their notes, flashcards, reviews, courses, goals, AI conversations and independent study) isn't visible to any organisation they belong to, whatever role anyone holds.</p></article>`;
  $("#d-save", body)?.addEventListener("click", (e) => act(e.currentTarget, ctx, async () => {
    for (const p of Object.keys(PURPOSES)) {
      const v = (k) => body.querySelector(`[data-p="${p}"][data-k="${k}"]`)?.value;
      const was = rows.find((x) => x.purpose === p) || {}, ret = v("retention") ? Number(v("retention")) : null, ref = v("ref")?.trim() || null;
      if (v("arrangement") !== (was.arrangement || "undecided") || ret !== (was.retention_days ?? null) || ref !== (was.agreement_ref || null)) await A.setDataPolicy(ctx.store, org.id, p, { arrangement: v("arrangement"), retentionDays: ret, agreementRef: ref });
    }
  }, () => { ctx.toast("Saved. Gradify will confirm the changes."); dataScreen(body, ctx, org); }));
}

async function auditScreen(body, ctx, org) {
  const [rows, members] = await Promise.all([A.auditLog(ctx.store, org.id, 200), can(org, "members.read") ? A.members(ctx.store, org.id) : []]);
  const who = (id) => (id ? members.find((m) => m.user_id === id)?.email || "A former member" : "Deleted account");
  body.innerHTML = `<article class="panel glass"><h3>Audit log</h3><p class="sub">Every change made in ${esc(org.name)}: who, what and when. It can't be edited or deleted by anyone. The latest 200.</p>
    <div class="org-tablewrap"><table class="org-table"><thead><tr><th>When</th><th>Who</th><th>What</th><th>Details</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${when(r.at)}</td><td>${esc(who(r.actor))}</td><td><code>${esc(r.action)}</code></td><td class="sub">${esc(Object.entries(r.detail || {}).map(([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : v}`).join(" · "))}</td></tr>`).join("") || '<tr><td colspan="4" class="sub">Nothing yet.</td></tr>'}</tbody></table></div></article>`;
}

// ---------- teaching (Settings and #/org) ----------
export async function teachPanel(el, ctx, contexts = null) {
  if (!el) return;
  await css();
  if (ctx.store.mode !== "cloud") { el.innerHTML = `<h3>Teach on Gradify</h3><p class="sub">Sign in to switch on teaching. It's the same account you learn with.</p>`; return; }
  let me = null;
  try { me = await A.teacherProfile(ctx.store); } catch (e) { if (e.missing) { el.remove(); return; } el.innerHTML = `<h3>Teach on Gradify</h3><p class="sub">${esc(e.message)}</p>`; return; }
  el.innerHTML = me ? `<h3>Teaching is on</h3><p class="sub">As ${esc(me.display_name)}${me.subjects?.length ? `, for ${esc(me.subjects.join(", "))}` : ""}. Classrooms are the next part of Gradify to arrive: you'll create them here, with the same account. Learners who join an independent classroom must be 13 or over.</p><button type="button" class="btn btn-ghost lg btn-sm" id="t-off"><span>Switch teaching off</span></button>`
    : `<h3>Teach on Gradify</h3><p class="sub">Switch on teaching to run your own classes, with the same account you learn with. Your own study stays yours.</p>
      <form class="org-form" id="t-on"><label>Name learners will see<input name="name" required minlength="2" maxlength="60" placeholder="e.g. Ms Hill"></label>
        <label>Subjects <em>optional, comma separated</em><input name="subjects" maxlength="300" placeholder="Biology, Chemistry"></label>
        <label class="check"><input type="checkbox" name="adult" required> <span>I'm 18 or over</span></label>
        <button class="btn btn-light lg btn-sm"><span>Switch on teaching</span></button></form>`;
  el.querySelector("#t-on")?.addEventListener("submit", (e) => { e.preventDefault(); const f = e.target; act(f.querySelector("button"), ctx, () => A.becomeTeacher(ctx.store, { displayName: f.name.value.trim(), subjects: f.subjects.value.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 12), adult: f.adult.checked }), () => { ctx.toast("Teaching is on."); teachPanel(el, ctx); }); });
  el.querySelector("#t-off")?.addEventListener("click", (e) => act(e.currentTarget, ctx, () => A.stopTeaching(ctx.store), () => { ctx.toast("Teaching is off."); teachPanel(el, ctx); }));
}

// ---------- #/join/<token> ----------
const PENDING = "gradify.join";
export async function renderJoin(view, ctx, token) {
  await css();
  token = token || (() => { try { return sessionStorage.getItem(PENDING); } catch { return null; } })();
  if (!token) { view.innerHTML = `<article class="panel glass org-empty"><h3>No invitation here</h3><p class="sub">Open the link from your invitation.</p></article>`; return; }
  if (ctx.store.mode !== "cloud" || !(await ctx.store.user())) {
    try { sessionStorage.setItem(PENDING, token); } catch { /* fine */ }
    view.innerHTML = `<article class="panel glass org-empty"><h3>Sign in to accept your invitation</h3><p class="sub">Use the email address the invitation was sent to, if it was sent to one. Then open the link again (or come back here: Gradify remembers it for this visit).</p><a class="btn btn-primary lg btn-sm" href="#/account"><span>Sign in</span></a></article>`;
    return;
  }
  view.innerHTML = `<article class="panel glass org-empty"><h3>Accept your invitation</h3><p class="sub">You'll join as the role it gives, in the same Gradify account you learn with. The organisation will see your membership and the email address you use, and, later, the work you do for it. Never your own study.</p><button type="button" class="btn btn-primary lg btn-sm" id="j-go"><span>Accept and join</span></button></article>`;
  $("#j-go", view).onclick = (e) => act(e.currentTarget, ctx, () => A.accept(ctx.store, token), (r) => {
    try { sessionStorage.removeItem(PENDING); } catch { /* fine */ }
    if (!r?.ok) { view.innerHTML = `<article class="panel glass org-empty"><h3>That invitation didn't work</h3><p class="sub">${esc(JOIN_REASONS[r?.reason] || "Ask for a new invitation.")}</p><a class="btn btn-ghost lg btn-sm" href="#/org"><span>Your organisations</span></a></article>`; return; }
    ctx.toast(r.already ? "You're already a member." : `You've joined as ${esc((ROLES[r.role] || r.role).toLowerCase())}.`);
    location.hash = `#/org/${r.org}`;
  });
}

// ---------- #/inbox ----------
export async function renderInbox(view, ctx) {
  await css();
  if (ctx.store.mode !== "cloud") { view.innerHTML = signinHtml("see your notifications"); return; }
  let list;
  try { list = await A.notifications(ctx.store, 100); } catch (e) { return fail(view, e); }
  view.innerHTML = `<section class="org"><div class="deck-head"><div><span class="kicker lo-kicker">${icon("bell")}Inbox</span><h1>Notifications</h1><p class="sub">From your organisations and, later, your classes. Choose which you get in Settings.</p></div>${list.some((n) => !n.read_at) ? `<button type="button" class="btn btn-light lg btn-sm" id="n-all"><span>Mark all read</span></button>` : ""}</div>
    ${list.length ? `<ul class="org-inbox">${list.map((n) => `<li class="${n.read_at ? "" : "unread"}"><a href="${esc(n.href || "#/inbox")}" data-open="${n.id}"><b>${esc(n.title)}</b>${n.body ? `<span>${esc(n.body)}</span>` : ""}<em>${when(n.created_at)}</em></a><button type="button" class="org-x" data-dismiss="${n.id}" aria-label="Dismiss">×</button></li>`).join("")}</ul>` : `<article class="panel glass org-empty"><h3>Nothing yet</h3><p class="sub">Invitations, new members and licences appear here.</p></article>`}</section>`;
  $("#n-all", view)?.addEventListener("click", (e) => act(e.currentTarget, ctx, () => A.markRead(ctx.store, null), () => { ctx.onWorkspace?.(); renderInbox(view, ctx); }));
  view.addEventListener("click", (e) => {
    const d = e.target.closest("[data-dismiss]")?.dataset.dismiss;
    if (d) { e.preventDefault(); act(null, ctx, () => A.dismiss(ctx.store, d), () => { e.target.closest("li").remove(); ctx.onWorkspace?.(); }); return; }
    const o = e.target.closest("[data-open]")?.dataset.open;
    if (o) A.markRead(ctx.store, o).then(() => ctx.onWorkspace?.()).catch(() => {});
  });
}
