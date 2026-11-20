// Organisations, invitations, notifications and licences, as the app calls them: thin wrappers around the database
// functions in supabase/migrations/20261121*.sql. Every action is checked again in the database; these only turn
// its answers into plain results and messages. Needs a signed-in CloudStore (store.db, a Supabase client).

const needCloud = (store) => { if (store?.mode !== "cloud" || !store.db) throw Object.assign(new Error("Sign in to use organisations."), { signin: true }); return store.db; };
// the database's own refusals are written for people ("You can't invite people here."); anything else is generic
const plain = (e) => {
  const m = String(e?.message || e || "");
  if (/PGRST202|PGRST205|42883|42P01|schema cache/i.test(`${e?.code || ""} ${m}`)) return Object.assign(new Error("Organisations aren't switched on for Gradify yet."), { missing: true });
  if (/^[A-Z][^\n]{3,200}[.!]$/.test(m) && !/violates|syntax|relation|column|function/i.test(m)) return new Error(m);
  return new Error("That didn't work. Try again in a moment.");
};
async function rpc(store, name, args = {}) {
  const { data, error } = await needCloud(store).rpc(name, args);
  if (error) throw plain(error);
  return data;
}
async function rows(store, q) {
  const { data, error } = await q(needCloud(store));
  if (error) throw plain(error);
  return data || [];
}

export const contexts = (store) => rpc(store, "my_contexts");
export const createOrganisation = (store, name, kind) => rpc(store, "create_organisation", { p_name: name, p_kind: kind });
export const renameOrganisation = (store, org, name) => rpc(store, "rename_organisation", { p_org: org, p_name: name });
export const archiveOrganisation = (store, org) => rpc(store, "archive_organisation", { p_org: org });
export const leave = (store, org) => rpc(store, "leave_organisation", { p_org: org });

export const units = (store, org) => rows(store, (db) => db.from("org_units").select("id, parent_id, kind, name, archived_at").eq("org_id", org).order("name"));
export const createUnit = (store, org, parent, kind, name) => rpc(store, "create_unit", { p_org: org, p_parent: parent || null, p_kind: kind, p_name: name });
export const renameUnit = (store, unit, name) => rpc(store, "rename_unit", { p_unit: unit, p_name: name });

export const members = (store, org) => rpc(store, "org_member_list", { p_org: org }).then((r) => r || []);
export const changeRole = (store, member, role) => rpc(store, "change_member_role", { p_member: member, p_role: role });
export const setStatus = (store, member, status) => rpc(store, "set_member_status", { p_member: member, p_status: status });

export const invitations = (store, org) => rows(store, (db) => db.from("org_invitations").select("id, unit_id, role, email, expires_at, max_uses, uses, revoked_at, created_at").eq("org_id", org).order("created_at", { ascending: false }).limit(200));
/** Returns the token, once: it's shown to the inviter as a link, and never stored. */
export const invite = (store, { org, unit = null, role, email = null, days = 7, maxUses = 1 }) => rpc(store, "invite_member", { p_org: org, p_unit: unit, p_role: role, p_email: email || null, p_days: days, p_max_uses: maxUses });
export const revokeInvitation = (store, id) => rpc(store, "revoke_invitation", { p_invitation: id });
export const accept = (store, token) => rpc(store, "accept_invitation", { p_token: token });
export const joinLink = (token, base = `${location.origin}${location.pathname}`) => `${base}#/join/${encodeURIComponent(token)}`;

export const auditLog = (store, org, limit = 100) => rows(store, (db) => db.from("audit_log").select("id, at, actor, action, target_kind, target_id, detail").eq("org_id", org).order("id", { ascending: false }).limit(limit));
export const dataPolicies = (store, org) => rows(store, (db) => db.from("org_data_policies").select("purpose, arrangement, retention_days, agreement_ref, recorded_at, confirmed_by_gradify_at").eq("org_id", org));
export const setDataPolicy = (store, org, purpose, { arrangement, retentionDays = null, agreementRef = null }) => rpc(store, "set_data_policy", { p_org: org, p_purpose: purpose, p_arrangement: arrangement, p_retention_days: retentionDays, p_agreement_ref: agreementRef });

export const entitlements = (store, org) => rpc(store, "org_entitlements", { p_org: org });
export const myEntitlements = (store) => rpc(store, "my_entitlements");
export const assignSeat = (store, subscription, user) => rpc(store, "assign_seat", { p_subscription: subscription, p_user: user });
export const revokeSeat = (store, subscription, user) => rpc(store, "revoke_seat", { p_subscription: subscription, p_user: user });
export const allocatePool = (store, { org, unit, feature, monthly, perMemberCap = null }) => rpc(store, "allocate_ai_pool", { p_org: org, p_unit: unit, p_feature: feature, p_monthly: monthly, p_per_member_cap: perMemberCap });

export const notifications = (store, limit = 50) => rows(store, (db) => db.from("notifications").select("id, kind, org_id, title, body, href, created_at, read_at").order("created_at", { ascending: false }).limit(limit));
export const unreadCount = async (store) => { const { count, error } = await needCloud(store).from("notifications").select("id", { count: "exact", head: true }).is("read_at", null); if (error) throw plain(error); return count || 0; };
export const markRead = (store, id = null) => rpc(store, "mark_notifications_read", { p_id: id });
export const dismiss = (store, id) => rows(store, (db) => db.from("notifications").delete().eq("id", id));

export const teacherProfile = async (store) => (await rows(store, (db) => db.from("teacher_profiles").select("*").limit(1)))[0] || null;
export async function becomeTeacher(store, { displayName, subjects = [], adult }) {
  const db = needCloud(store), user = (await db.auth.getUser()).data?.user;
  if (!user) throw Object.assign(new Error("Sign in first."), { signin: true });
  const { error } = await db.from("teacher_profiles").upsert({ user_id: user.id, display_name: displayName, subjects, confirmed_adult: Boolean(adult), updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) throw plain(error);
}
export const stopTeaching = (store) => rows(store, (db) => db.from("teacher_profiles").delete().not("user_id", "is", null));
