// Workspaces: the contexts one Gradify account can work in (decision D8's identity model). Your personal Gradify is
// always there; each organisation you belong to is another workspace, with the roles and permissions you hold
// there (public.my_contexts(), supabase/migrations/20261121130000_organisations.sql). Switching changes what the
// sidebar offers and which organisation the screens act for. It never changes the account, and it never lets an
// organisation see your personal learning (D10). Pure, apart from remembering the choice on this device, so Node
// tests it (tests/org.test.mjs).

const KEY = "gradify.workspace";
export const PERSONAL = "personal";

/** The workspace chosen on this device: "personal" or an organisation id. */
export function readWorkspace(storage = globalThis.localStorage) {
  try { return storage?.getItem(KEY) || PERSONAL; } catch { return PERSONAL; }
}
export function writeWorkspace(id, storage = globalThis.localStorage) {
  try { storage?.setItem(KEY, id || PERSONAL); } catch { /* storage blocked: the choice lasts this visit */ }
}
/** The organisation for a workspace id, or null for personal (or for one you're no longer in). */
export const orgOf = (contexts, id) => (id && id !== PERSONAL ? (contexts?.organisations || []).find((o) => o.id === id) || null : null);
/** Whether you hold a permission anywhere in this organisation. Screens use it to decide what to offer; the
 * database checks every action again, in context (has_perm). */
export const can = (org, perm) => Boolean(org?.permissions?.includes(perm));

/** An organisation workspace's sidebar: only the sections your permissions there make useful. */
export function orgNav(org) {
  if (!org) return [];
  const base = `#/org/${org.id}`;
  return [
    [base, "Overview", "home", true],
    [`${base}/members`, "Members", "people", can(org, "members.read")],
    [`${base}/units`, "Structure", "layers", true],
    [`${base}/invitations`, "Invitations", "share", can(org, "members.invite")],
    [`${base}/licences`, "Licences and AI", "award", can(org, "entitlements.read")],
    [`${base}/data`, "Data and privacy", "shield", true],
    [`${base}/audit`, "Audit log", "checklist", can(org, "audit.read")],
  ].filter((x) => x[3]).map(([href, label, icon]) => ({ href, label, icon }));
}

export const KINDS = {
  primary_school: "Primary school", secondary_school: "Secondary school", fe_college: "Further education college", university: "University",
  training_provider: "Training provider", professional_education: "Professional education provider", private_education: "Private education organisation",
  business: "Business", non_profit: "Non-profit", public_sector: "Government or public sector",
};
export const ROLES = {
  owner: "Owner", admin: "Administrator", unit_head: "Head of unit", academic_lead: "Academic lead", teacher: "Teacher",
  assistant: "Teaching assistant", student: "Student", guardian: "Guardian", auditor: "Auditor",
};
// who may be invited by whom (the database enforces the same: invite_member)
export const invitableRoles = (org) => Object.keys(ROLES).filter((r) => r !== "guardian" && ((r !== "owner" && r !== "admin") || can(org, "members.manage_admins")));
export const PURPOSES = {
  membership: "Membership and accounts", classroom_records: "Classroom records (work, marks, feedback)", training_records: "Training records",
  community: "Community", analytics: "Learning analytics", support: "Support",
};
export const ARRANGEMENTS = {
  undecided: "Not agreed yet", gradify_controller: "Gradify is the controller", organisation_controller: "The organisation is the controller; Gradify processes for it",
  joint_controllers: "Joint controllers",
};
/** What an invitation refusal means, in words a person can act on (public.accept_invitation reasons). */
export const JOIN_REASONS = {
  signed_out: "Sign in first, then open the link again.",
  not_found: "This invitation link isn't valid. Check you copied all of it, or ask for a new one.",
  revoked: "This invitation has been withdrawn. Ask the person who sent it for a new one.",
  expired: "This invitation has expired. Ask the person who sent it for a new one.",
  used_up: "This invitation has been used as many times as it allows. Ask for a new one.",
  archived: "This organisation is no longer active on Gradify.",
  wrong_account: "This invitation is for a different email address. Sign in with that address, or ask for an invitation for this one.",
  suspended: "Your membership here is suspended. Contact the organisation.",
  too_many_attempts: "Too many invitation links didn't work. Wait an hour and try again.",
};
