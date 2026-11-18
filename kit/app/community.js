// Community (app.html#/community): learning with other people, inside Gradify.
//   #/community/chats       a chat for every subject
//   #/community/groups      private study groups: a join code, a chat, members and a weekly leaderboard
//   #/community/friends     follow friends by their friend code; friends' and school leaderboards (always optional)
//   #/community/tutors      learners offering to tutor, by subject; ask one for help, inside Gradify
//   #/community/mentors     students a year or two ahead, offering advice; same
//   #/community/internships work experience and internship schemes, matched to what you study
// Backed by supabase/migrations/20261119120000_community_and_more_tools.sql. Everything except internships needs an
// account and a community profile (a display name, and confirming you're 13 or over). Safety rules are enforced by
// the database: no links, email addresses or phone numbers in chats or requests, at most 8 messages a minute, and a
// message reported by three people is hidden for everyone. Blocking someone hides them on this device.
import { icon } from "../core/icons.js";
import { esc } from "../core/text.js";

const TABS = [["chats", "Subject chats", "share"], ["groups", "Study groups", "people"], ["friends", "Friends and leaderboards", "trophy"], ["tutors", "Tutors", "cap"], ["mentors", "Student mentors", "people"], ["internships", "InternshipGradify", "briefcase"]];
const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* fine */ } };
const when = (iso) => { const d = new Date(iso), s = (Date.now() - d) / 1000; return s < 60 ? "just now" : s < 3600 ? `${Math.floor(s / 60)} min ago` : s < 86400 ? `${Math.floor(s / 3600)} h ago` : d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }); };
const errText = (e) => String(e?.message || e).replace(/^.*?:\s*(?=For everyone|You're|Make a|That person|You've)/, "");
let poll = 0;
if (typeof addEventListener === "function") addEventListener("hashchange", () => { clearInterval(poll); poll = 0; });

// ---------- internships and work experience (no account needed) ----------
// Well-known schemes and the official places to find them. Matched by the subjects each one suits.
export const OPPORTUNITIES = [
  { n: "Springpod virtual work experience", url: "https://www.springpod.com/", for: "Ages 14 to 18 · online", d: "Free virtual work experience programmes with real employers, in medicine, law, engineering, business, tech and more.", tags: ["medicine", "law", "engineering", "business", "computing", "finance", "nursing", "dentistry", "veterinary", "pharmacy"] },
  { n: "NHS Health Careers: work experience", url: "https://www.healthcareers.nhs.uk/", for: "School and university students", d: "How to find work experience in the NHS, and every NHS career explained, from nursing to paramedicine.", tags: ["medicine", "nursing", "health", "pharmacy", "dentistry", "biology", "psychology", "sport"] },
  { n: "The Year in Industry", url: "https://www.etrust.org.uk/the-year-in-industry", for: "Before or during university", d: "Paid year-long placements in engineering, science and technology companies.", tags: ["engineering", "physics", "chemistry", "computing", "maths"] },
  { n: "Find an apprenticeship (GOV.UK)", url: "https://www.findapprenticeship.service.gov.uk/", for: "16 and over · England", d: "The government's official service for apprenticeships at every level, including degree apprenticeships.", tags: ["engineering", "computing", "business", "finance", "health", "nursing", "law", "art", "design", "professional", "careers"] },
  { n: "Civil Service Fast Stream and internships", url: "https://www.faststream.gov.uk/", for: "Graduates and students", d: "The Civil Service's graduate scheme and summer internships, across policy, data, science and more.", tags: ["history", "sociology", "law", "finance", "business", "maths", "research", "psychology"] },
  { n: "Bright Network: internships and graduate jobs", url: "https://www.brightnetwork.co.uk/", for: "University students", d: "Internships, insight days and graduate jobs with hundreds of UK employers.", tags: ["business", "finance", "law", "computing", "engineering", "careers", "university", "investing"] },
  { n: "Gradcracker: STEM placements", url: "https://www.gradcracker.com/", for: "STEM students", d: "Placements, internships and graduate jobs in engineering, science and technology.", tags: ["engineering", "physics", "chemistry", "computing", "maths"] },
  { n: "RateMyPlacement: placements and internships", url: "https://www.ratemyplacement.co.uk/", for: "University students", d: "Placements and internships, with reviews from students who did them.", tags: ["business", "finance", "computing", "engineering", "law", "design", "university"] },
  { n: "Prospects: work experience and internships", url: "https://www.prospects.ac.uk/", for: "Students and graduates", d: "The UK's graduate careers service: work experience, internships and advice for every subject.", tags: ["careers", "university", "history", "literature", "sociology", "psychology", "art", "music", "teaching", "ecology"] },
  { n: "Sutton Trust summer schools and Pathways", url: "https://www.suttontrust.com/", for: "Year 12 students", d: "Free summer schools at top universities and Pathways programmes into law, medicine, engineering and more.", tags: ["law", "medicine", "engineering", "university", "gcse", "history", "literature"] },
  { n: "Get Into Teaching: school experience", url: "https://getintoteaching.education.gov.uk/", for: "Thinking about teaching", d: "Arrange school experience and find out how to become a teacher in England.", tags: ["teaching", "primary", "gcse", "maths", "literature"] },
  { n: "Royal College of Veterinary Surgeons: careers", url: "https://www.rcvs.org.uk/", for: "Future vets and vet nurses", d: "How to become a vet or vet nurse, and what work experience vet schools look for.", tags: ["veterinary", "biology", "ecology"] },
  { n: "Do IT: volunteering", url: "https://do-it.org/", for: "Everyone", d: "Volunteering opportunities near you and online: real experience for any CV or personal statement.", tags: ["careers", "teaching", "health", "ecology", "sociology", "sport", "music", "art"] },
  { n: "ArtsProfessional: arts jobs and opportunities", url: "https://www.artsprofessional.co.uk/jobs", for: "Arts and culture", d: "Jobs, internships and opportunities across the arts, museums and creative industries.", tags: ["art", "design", "music", "literature", "history"] },
];
/** Opportunities ranked by how many of the learner's subjects they suit (then the rest). Pure. */
export function matchOpportunities(subjects, list = OPPORTUNITIES) {
  const s = new Set(subjects);
  return list.map((o) => ({ ...o, score: o.tags.filter((t) => s.has(t)).length })).sort((a, b) => b.score - a.score);
}

/** Draw the community screen. ctx: { view, store, toast, courses: [{ slug, name }], subjects: [slug], appProfile } */
export async function renderCommunity(ctx, arg) {
  const { view, store } = ctx;
  const tab = TABS.some(([t]) => t === arg) ? arg : "chats";
  const db = store?.mode === "cloud" ? store.db : null;
  view.innerHTML = `<section class="community-route cm">
    <div class="deck-head"><div><span class="kicker lo-kicker">${icon("people")}Community</span><h1>Learn with other people</h1><p class="sub">Subject chats, study groups, friends' and school leaderboards, tutors and student mentors, and work experience matched to what you study.</p></div></div>
    <nav class="seg-chips cm-tabs" aria-label="Community">${TABS.map(([t, label, ic]) => `<a class="chip" href="#/community/${t}" aria-pressed="${t === tab}">${icon(ic)}${label}</a>`).join("")}</nav>
    <div class="cm-body"></div></section>`;
  const body = view.querySelector(".cm-body");
  if (tab === "internships") return internships(body, ctx);
  if (!db) { body.innerHTML = `<article class="panel glass"><h3>Sign in to join the community</h3><p class="sub">Chats, groups, leaderboards, tutors and mentors need a free Gradify account, so everyone is a real learner. Internships work without one.</p><a class="btn btn-light lg btn-sm" href="#/account"><span>Sign in</span></a></article>`; return; }
  const { data: me, error } = await db.from("community_profiles").select("*").maybeSingle();
  if (error && /community_profiles|schema cache|42P01/.test(`${error.code} ${error.message}`)) { body.innerHTML = `<article class="panel glass"><h3>Community is being switched on</h3><p class="sub">Try again in a few minutes.</p></article>`; return; }
  if (!me || arg === "profile") return profileForm(body, ctx, db, me, tab);
  const head = `<p class="sub cm-me">You're <b>${esc(me.display_name)}</b> · friend code <code>${esc(me.friend_code)}</code> · <a href="#/community/profile">Edit profile</a></p>`;
  body.insertAdjacentHTML("beforebegin", head);
  const C = { ...ctx, db, me, body };
  return ({ chats, groups, friends, tutors: (c) => helpers(c, "tutor"), mentors: (c) => helpers(c, "mentor") })[tab](C);
}

function profileForm(body, ctx, db, me, back) {
  const subs = new Set(me?.subjects || ctx.subjects || []);
  body.innerHTML = `<form class="panel glass cm-profile"><h3>${me ? "Your community profile" : "Make your community profile"}</h3><p class="sub">This is how other learners see you. Use a first name or a nickname: never your full name, address or school timetable.</p>
    <label><span>Display name</span><input name="name" required minlength="2" maxlength="40" value="${esc(me?.display_name || ctx.appProfile?.display_name || "")}"></label>
    <label><span>School, college or university <small>(optional: only used to rank your school's leaderboard, never shown)</small></span><input name="school" maxlength="80" value="${esc(me?.school || "")}"></label>
    <fieldset><legend>Subjects</legend><div class="seg-chips">${ctx.courses.map((c) => `<label class="chip cm-sub"><input type="checkbox" name="sub" value="${esc(c.slug)}" ${subs.has(c.slug) ? "checked" : ""}> ${esc(c.name)}</label>`).join("")}</div></fieldset>
    <label><span>About you <small>(optional)</small></span><textarea name="bio" maxlength="500" rows="2">${esc(me?.bio || "")}</textarea></label>
    <label class="tl-fact"><input type="checkbox" class="tl-switch" name="lb" ${me?.on_leaderboards === false ? "" : "checked"}><span>Show me on friends', school and group leaderboards</span></label>
    <label class="tl-fact"><input type="checkbox" class="tl-switch" name="tutor" ${me?.is_tutor ? "checked" : ""}><span>Offer to tutor my subjects</span></label>
    <label><span>Your rate, or "free" <small>(if tutoring)</small></span><input name="rate" maxlength="60" value="${esc(me?.tutor_rate || "")}" placeholder="e.g. Free, or £15 an hour"></label>
    <label class="tl-fact"><input type="checkbox" class="tl-switch" name="mentor" ${me?.is_mentor ? "checked" : ""}><span>Offer to mentor students a year or two behind me</span></label>
    <label><span>Where you are now <small>(if mentoring)</small></span><input name="stage" maxlength="80" value="${esc(me?.mentor_stage || "")}" placeholder="e.g. First year medicine, or Year 13"></label>
    <label class="tl-fact"><input type="checkbox" class="tl-switch" name="age" ${me ? "checked" : ""} required><span>I'm 13 or over, and I'll follow the <a href="/terms.html#community" target="_blank">community rules</a>: be kind, keep personal details private, and report anything that worries me.</span></label>
    <div class="row-actions"><button class="btn btn-primary lg"><span>${me ? "Save" : "Join the community"}</span></button>${me ? `<a class="btn btn-ghost lg" href="#/community/${esc(back)}"><span>Cancel</span></a>` : ""}</div><p class="sub cm-err" aria-live="polite"></p></form>`;
  body.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault(); const f = new FormData(e.target);
    const row = { display_name: f.get("name").trim(), school: f.get("school").trim() || null, subjects: f.getAll("sub").slice(0, 12), bio: f.get("bio").trim(), on_leaderboards: f.has("lb"), is_tutor: f.has("tutor"), tutor_rate: f.get("rate").trim(), is_mentor: f.has("mentor"), mentor_stage: f.get("stage").trim(), over_13: f.has("age"), updated_at: new Date().toISOString() };
    const { error } = me ? await db.from("community_profiles").update(row).eq("user_id", me.user_id) : await db.from("community_profiles").insert(row);
    if (error) { body.querySelector(".cm-err").textContent = error.message; return; }
    ctx.toast(me ? "Saved." : "Welcome to the Gradify community."); const to = `#/community/${back === "profile" ? "chats" : back}`; if (location.hash === to) dispatchEvent(new HashChangeEvent("hashchange")); else location.hash = to;
  });
}

// ---------- a chat room (subject or group) ----------
function chatBox(el, C, room) {
  const blocked = new Set(read("gradify.community.blocked", []));
  el.innerHTML = `<div class="cm-chat panel glass"><ol class="cm-msgs" aria-live="polite"><li class="sub">Loading…</li></ol>
    <form class="cm-send"><input maxlength="1000" placeholder="Write a message. Be kind; no links or contact details." aria-label="Message"><button class="btn btn-primary lg btn-sm"><span>Send</span></button></form><p class="sub cm-err" aria-live="polite"></p></div>`;
  const list = el.querySelector(".cm-msgs");
  let lastId = 0;
  const paint = (rows, append) => {
    const html = rows.filter((m) => !blocked.has(m.user_id)).map((m) => `<li class="cm-msg ${m.user_id === C.me.user_id ? "mine" : ""}" data-id="${m.id}" data-u="${esc(m.user_id)}"><b>${esc(m.name)}</b><span class="sub">${when(m.created_at)}</span><p>${esc(m.body)}</p>
      <span class="cm-acts">${m.user_id === C.me.user_id ? `<button type="button" data-del>Delete</button>` : `<button type="button" data-report>Report</button><button type="button" data-block>Block</button>`}</span></li>`).join("");
    if (append) list.insertAdjacentHTML("beforeend", html); else list.innerHTML = html || `<li class="sub cm-empty">No messages yet. Say hello.</li>`;
    if (rows.length) { lastId = Math.max(lastId, ...rows.map((m) => m.id)); list.querySelector(".cm-empty")?.remove(); list.scrollTop = list.scrollHeight; }
  };
  const load = async (more) => {
    let q = C.db.from("chat_messages").select("id, user_id, name, body, created_at").eq("room", room).order("id", { ascending: false }).limit(60);
    if (more) q = q.gt("id", lastId);
    const { data, error } = await q; if (error) { if (!more) list.innerHTML = `<li class="sub">${esc(error.message)}</li>`; return; }
    paint((data || []).reverse(), more);
  };
  load(false); clearInterval(poll); poll = setInterval(() => { if (!document.hidden && el.isConnected) load(true); else if (!el.isConnected) clearInterval(poll); }, 5000);
  el.querySelector(".cm-send").addEventListener("submit", async (e) => {
    e.preventDefault(); const inp = e.target.querySelector("input"), text = inp.value.trim(); if (!text) return;
    const err = el.querySelector(".cm-err"); err.textContent = "";
    const { error } = await C.db.from("chat_messages").insert({ room, body: text });
    if (error) { err.textContent = errText(error); return; }
    inp.value = ""; load(true);
  });
  list.addEventListener("click", async (e) => {
    const li = e.target.closest(".cm-msg"); if (!li) return;
    if (e.target.closest("[data-del]")) { await C.db.from("chat_messages").delete().eq("id", li.dataset.id); li.remove(); }
    if (e.target.closest("[data-report]")) { const why = prompt("What's wrong with this message? (optional)") ?? null; if (why === null) return; const { error } = await C.db.from("chat_reports").insert({ message_id: +li.dataset.id, reason: why.slice(0, 300) }); C.toast(error && !/duplicate/.test(error.message) ? esc(error.message) : "Reported. Thank you. Messages reported by several people are hidden straight away."); }
    if (e.target.closest("[data-block]")) { if (!confirm("Block this person? You won't see their messages on this device.")) return; blocked.add(li.dataset.u); write("gradify.community.blocked", [...blocked]); list.querySelectorAll(`[data-u="${CSS.escape(li.dataset.u)}"]`).forEach((x) => x.remove()); }
  });
}

async function chats(C) {
  const mine = C.me.subjects?.length ? C.me.subjects : C.subjects;
  const order = [...C.courses].sort((a, b) => Number(mine.includes(b.slug)) - Number(mine.includes(a.slug)));
  const pick = read("gradify.community.room", "") || order[0]?.slug;
  C.body.innerHTML = `<div class="cm-row"><label class="tl-sel">Subject <select data-room>${order.map((c) => `<option value="${esc(c.slug)}" ${c.slug === pick ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label><span class="sub">Everyone studying this subject on Gradify. New messages appear every few seconds.</span></div><div class="cm-room"></div>`;
  const sel = C.body.querySelector("[data-room]"), go = () => { write("gradify.community.room", sel.value); chatBox(C.body.querySelector(".cm-room"), C, `subject:${sel.value}`); };
  sel.addEventListener("change", go); go();
}

async function board(el, C, scope, empty) {
  const { data, error } = await C.db.rpc("leaderboard", { p_scope: scope });
  if (error) { el.innerHTML = `<p class="sub">${esc(error.message)}</p>`; return; }
  el.innerHTML = data?.length > 1 || (data?.length && scope !== "friends") ? `<ol class="cm-board">${data.map((r, i) => `<li class="${r.me ? "me" : ""}"><span class="cm-rank">${i + 1}</span><b>${esc(r.display_name)}${r.me ? " (you)" : ""}</b><span>${Number(r.xp_week).toLocaleString("en-GB")} XP this week</span><span class="sub">${Number(r.xp_total).toLocaleString("en-GB")} in all</span></li>`).join("")}</ol>` : `<p class="sub">${empty}</p>`;
}

async function groups(C) {
  const id = location.hash.split("/")[3];
  if (id) return group(C, id);
  const { data: gs, error } = await C.db.from("study_groups").select("id, name, subject, code, owner, created_at").order("created_at", { ascending: false });
  C.body.innerHTML = `<div class="cm-grid"><form class="panel glass cm-new"><h3>Start a group</h3><input name="name" required minlength="2" maxlength="60" placeholder="Group name, e.g. Year 12 Biology"><input name="subject" maxlength="60" placeholder="Subject (optional)"><button class="btn btn-primary lg btn-sm"><span>Start the group</span></button></form>
    <form class="panel glass cm-join"><h3>Join a group</h3><input name="code" required maxlength="10" placeholder="Join code" autocapitalize="characters"><button class="btn btn-light lg btn-sm"><span>Join</span></button><p class="sub cm-err" aria-live="polite"></p></form></div>
    <h2 class="lo-h">Your groups</h2>${error ? `<p class="sub">${esc(error.message)}</p>` : gs?.length ? `<div class="tl-made">${gs.map((g) => `<a class="tl-item panel glass" href="#/community/groups/${esc(g.id)}"><span class="tl-k">${esc(g.subject || "Study group")}</span><b>${esc(g.name)}</b><span class="sub">Code ${esc(g.code)}</span></a>`).join("")}</div>` : `<p class="sub">You're not in a group yet. Start one and share its code with your classmates.</p>`}`;
  C.body.querySelector(".cm-new").addEventListener("submit", async (e) => { e.preventDefault(); const f = new FormData(e.target); const { data, error } = await C.db.from("study_groups").insert({ name: f.get("name").trim(), subject: f.get("subject").trim() }).select("id").single(); if (error) { C.toast(esc(error.message)); return; } location.hash = `#/community/groups/${data.id}`; });
  C.body.querySelector(".cm-join").addEventListener("submit", async (e) => { e.preventDefault(); const { data, error } = await C.db.rpc("join_group", { p_code: new FormData(e.target).get("code") }); const err = e.target.querySelector(".cm-err"); if (error) { err.textContent = error.message; return; } if (!data.ok) { err.textContent = { no_group: "No group has that code. Check it with whoever shared it.", full: "That group is full (50 people)." }[data.reason] || "Couldn't join."; return; } location.hash = `#/community/groups/${data.id}`; });
}
async function group(C, id) {
  const { data: g } = await C.db.from("study_groups").select("*").eq("id", id).maybeSingle();
  if (!g) { C.body.innerHTML = `<article class="panel glass"><h3>That group isn't available</h3><p class="sub">You may have left it, or it was closed.</p><a href="#/community/groups">Your groups</a></article>`; return; }
  const { data: people } = await C.db.rpc("group_people", { p_group: id });
  C.body.innerHTML = `<a class="back" href="#/community/groups">← Your groups</a><div class="deck-head"><div><span class="kicker">${esc(g.subject || "Study group")}</span><h2>${esc(g.name)}</h2><p class="sub">Join code <code>${esc(g.code)}</code> · ${people?.length || 1} ${people?.length === 1 ? "member" : "members"}: ${(people || []).map((p) => esc(p.display_name)).join(", ")}</p></div>
    <div class="row-actions"><button type="button" class="btn btn-light lg btn-sm" data-share><span>Share the code</span></button>${g.owner === C.me.user_id ? `<button type="button" class="btn btn-ghost lg btn-sm" data-close><span>Close the group</span></button>` : `<button type="button" class="btn btn-ghost lg btn-sm" data-leave><span>Leave</span></button>`}</div></div>
    <div class="cm-split"><div class="cm-gchat"></div><aside class="panel glass"><h3>This week</h3><div class="cm-gboard"></div><p class="sub">XP earned anywhere on Gradify. Do a quiz together: everyone opens the same lesson in <a href="#/tools/quiz/practice">Quizzes</a> and posts their score.</p></aside></div>`;
  chatBox(C.body.querySelector(".cm-gchat"), C, `group:${id}`);
  board(C.body.querySelector(".cm-gboard"), C, `group:${id}`, "No XP yet this week.");
  C.body.querySelector("[data-share]").addEventListener("click", () => { const t = `Join my Gradify study group "${g.name}": open Community → Study groups and enter the code ${g.code}`; if (navigator.share) navigator.share({ text: t, url: "https://getgradify.com/app.html#/community/groups" }).catch(() => {}); else navigator.clipboard?.writeText(t).then(() => C.toast("Copied.")); });
  C.body.querySelector("[data-leave]")?.addEventListener("click", async () => { if (!confirm("Leave this group?")) return; await C.db.from("group_members").delete().eq("group_id", id).eq("user_id", C.me.user_id); location.hash = "#/community/groups"; });
  C.body.querySelector("[data-close]")?.addEventListener("click", async () => { if (!confirm("Close this group for everyone? Its chat is deleted.")) return; await C.db.from("chat_messages").delete().eq("room", `group:${id}`); await C.db.from("study_groups").delete().eq("id", id); location.hash = "#/community/groups"; });
}

async function friends(C) {
  const { data: fs } = await C.db.rpc("my_friends");
  C.body.innerHTML = `<div class="cm-grid"><article class="panel glass"><h3>Your friend code</h3><p class="cm-code">${esc(C.me.friend_code)}</p><p class="sub">Give it to friends so they can follow you.</p></article>
    <form class="panel glass cm-add"><h3>Follow a friend</h3><input name="code" required maxlength="10" placeholder="Their friend code" autocapitalize="characters"><button class="btn btn-primary lg btn-sm"><span>Follow</span></button><p class="sub cm-err" aria-live="polite"></p></form></div>
    <div class="cm-grid"><article class="panel glass"><h3>Friends this week</h3><div class="cm-fboard"></div>${fs?.length ? `<p class="sub">Following: ${fs.map((f) => `${esc(f.display_name)} <button type="button" class="tl-mini" data-unf="${esc(f.user_id)}">Unfollow</button>`).join(" ")}</p>` : ""}</article>
    <article class="panel glass"><h3>${C.me.school ? "Your school this week" : "School leaderboard"}</h3><div class="cm-sboard"></div></article></div>
    <p class="sub">Leaderboards are always optional: switch yours off in <a href="#/community/profile">your profile</a>.</p>`;
  board(C.body.querySelector(".cm-fboard"), C, "friends", "Follow a friend to see who's learning most this week.");
  if (C.me.school) board(C.body.querySelector(".cm-sboard"), C, "school", "No one else from your school is here yet. Share Gradify with them.");
  else C.body.querySelector(".cm-sboard").innerHTML = `<p class="sub">Add your school in <a href="#/community/profile">your profile</a> to see its leaderboard. It's only used for ranking, never shown.</p>`;
  C.body.querySelector(".cm-add").addEventListener("submit", async (e) => {
    e.preventDefault(); const err = e.target.querySelector(".cm-err");
    const { data } = await C.db.rpc("find_by_friend_code", { p_code: new FormData(e.target).get("code") });
    const f = data?.[0]; if (!f) { err.textContent = "No one has that code."; return; }
    if (f.user_id === C.me.user_id) { err.textContent = "That's your own code."; return; }
    const { error } = await C.db.from("follows").insert({ followee: f.user_id });
    if (error && !/duplicate/.test(error.message)) { err.textContent = error.message; return; }
    C.toast(`Following ${esc(f.display_name)}.`); friends(C);
  });
  C.body.addEventListener("click", async (e) => { const b = e.target.closest("[data-unf]"); if (!b) return; await C.db.from("follows").delete().eq("followee", b.dataset.unf); friends(C); });
}

async function helpers(C, kind) {
  const label = kind === "tutor" ? "tutor" : "mentor";
  const mine = C.me.subjects?.length ? C.me.subjects : C.subjects;
  const subj = read(`gradify.community.${kind}.subject`, "");
  const [{ data: list, error }, { data: reqs }] = await Promise.all([C.db.rpc("community_directory", { p_kind: kind, p_subject: subj }), C.db.from("help_requests").select("*").eq("kind", kind).order("created_at", { ascending: false }).limit(50)]);
  const name = (slug) => C.courses.find((c) => c.slug === slug)?.name || slug;
  const inbox = (reqs || []).filter((r) => r.to_user === C.me.user_id), sent = (reqs || []).filter((r) => r.from_user === C.me.user_id);
  C.body.innerHTML = `<p class="sub">${kind === "tutor" ? "Learners and graduates offering to tutor. Ask for help with a topic and they reply here. Agree any lessons, and any payment, with a parent or guardian if you're under 18." : "Students a year or two ahead of you, offering advice on choosing courses, applications and getting through the year. Ask a question and they reply here."} Keep personal details private: Gradify blocks email addresses and phone numbers.</p>
    <div class="cm-row"><label class="tl-sel">Subject <select data-subj><option value="">Every subject</option>${C.courses.map((c) => `<option value="${esc(c.slug)}" ${c.slug === subj ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select></label>${C.me[kind === "tutor" ? "is_tutor" : "is_mentor"] ? `<span class="pill-dark">You're offering to ${label}</span>` : `<a class="tl-mini" href="#/community/profile">Offer to ${label}</a>`}</div>
    ${inbox.length ? `<h2 class="lo-h">Asked of you</h2>${inbox.map((r) => reqHtml(r, true, name)).join("")}` : ""}
    ${sent.length ? `<h2 class="lo-h">Your questions</h2>${sent.map((r) => reqHtml(r, false, name)).join("")}` : ""}
    <h2 class="lo-h">${kind === "tutor" ? "Tutors" : "Mentors"}</h2>
    ${error ? `<p class="sub">${esc(error.message)}</p>` : (list || []).filter((p) => p.user_id !== C.me.user_id).length ? `<div class="cm-people">${list.filter((p) => p.user_id !== C.me.user_id).map((p) => `<article class="panel glass cm-person"><b>${esc(p.display_name)}</b>${p.detail ? `<span class="pill-dark">${esc(p.detail)}</span>` : ""}<span class="sub">${(p.subjects || "").split("|").filter(Boolean).map(name).map(esc).join(" · ")}</span>${p.bio ? `<p>${esc(p.bio)}</p>` : ""}
      <details><summary class="btn btn-light lg btn-sm">Ask ${esc(p.display_name)}</summary><form class="cm-ask" data-to="${esc(p.user_id)}"><input name="subject" maxlength="80" placeholder="Topic" value="${esc(subj ? name(subj) : mine[0] ? name(mine[0]) : "")}"><textarea name="message" required minlength="5" maxlength="1500" rows="3" placeholder="What would you like help with?"></textarea><button class="btn btn-primary lg btn-sm"><span>Send</span></button></form></details></article>`).join("")}</div>`
      : `<p class="sub">No one is offering to ${label} ${subj ? `in ${esc(name(subj))} ` : ""}yet. ${C.me[kind === "tutor" ? "is_tutor" : "is_mentor"] ? "" : `Could you? <a href="#/community/profile">Offer to ${label}</a>.`}</p>`}`;
  C.body.querySelector("[data-subj]").addEventListener("change", (e) => { write(`gradify.community.${kind}.subject`, e.target.value); helpers(C, kind); });
  C.body.addEventListener("submit", async (e) => {
    const f = e.target.closest(".cm-ask, .cm-reply"); if (!f) return; e.preventDefault(); const d = new FormData(f);
    const { error } = f.classList.contains("cm-ask")
      ? await C.db.from("help_requests").insert({ to_user: f.dataset.to, kind, subject: d.get("subject").trim(), message: d.get("message").trim() })
      : await C.db.from("help_requests").update({ reply: d.get("reply").trim(), status: d.get("status") }).eq("id", f.dataset.id);
    if (error) { C.toast(esc(errText(error))); return; }
    C.toast("Sent."); helpers(C, kind);
  });
  C.body.addEventListener("click", async (e) => { const b = e.target.closest("[data-withdraw]"); if (!b) return; await C.db.from("help_requests").delete().eq("id", b.dataset.withdraw); helpers(C, kind); });
}
const STATUS = { open: "Waiting for a reply", answered: "Answered", accepted: "Accepted", declined: "Declined" };
function reqHtml(r, toMe, name) {
  return `<article class="panel glass cm-req"><span class="tl-k">${toMe ? `From ${esc(r.from_name)}` : `To ${esc(r.to_name)}`} · ${esc(r.subject || "")} · ${when(r.created_at)} · ${STATUS[r.status]}</span><p>${esc(r.message)}</p>${r.reply ? `<blockquote>${esc(r.reply)}</blockquote>` : ""}
    ${toMe ? `<form class="cm-reply" data-id="${esc(r.id)}"><textarea name="reply" maxlength="1500" rows="2" placeholder="Your reply">${esc(r.reply)}</textarea><select name="status"><option value="answered">Answered</option><option value="accepted" ${r.status === "accepted" ? "selected" : ""}>Accept (we'll arrange it)</option><option value="declined" ${r.status === "declined" ? "selected" : ""}>Decline</option></select><button class="btn btn-light lg btn-sm"><span>Reply</span></button></form>` : `<button type="button" class="tl-mini" data-withdraw="${esc(r.id)}">Withdraw</button>`}</article>`;
}

function internships(body, ctx) {
  const subs = new Set(read("gradify.internships.subjects", ctx.subjects));
  const paint = () => {
    const list = matchOpportunities([...subs]);
    body.innerHTML = `<p class="sub">Real internships, placements, work experience and volunteering, matched to the subjects you study on Gradify. Each opens the scheme's own site. Pick your subjects to re-order the list.</p>
      <div class="seg-chips cm-isubs">${ctx.courses.map((c) => `<button type="button" class="chip" data-s="${esc(c.slug)}" aria-pressed="${subs.has(c.slug)}">${esc(c.name)}</button>`).join("")}</div>
      <div class="cm-people">${list.map((o) => `<article class="panel glass cm-opp ${o.score ? "match" : ""}"><span class="tl-k">${esc(o.for)}${o.score ? ` · matches ${o.score} of your subjects` : ""}</span><b>${esc(o.n)}</b><p class="sub">${esc(o.d)}</p><a class="btn btn-light lg btn-sm" href="${esc(o.url)}" target="_blank" rel="noopener"><span>Open</span></a></article>`).join("")}</div>
      <p class="sub">Getting ready? Write a CV in <a href="#/tools/projects/cv">Projects</a>, and see the <a href="/internshipgradify/">InternshipGradify</a> careers course.</p>`;
    body.querySelector(".cm-isubs").addEventListener("click", (e) => { const b = e.target.closest("[data-s]"); if (!b) return; if (subs.has(b.dataset.s)) subs.delete(b.dataset.s); else subs.add(b.dataset.s); write("gradify.internships.subjects", [...subs]); paint(); });
  };
  paint();
}
