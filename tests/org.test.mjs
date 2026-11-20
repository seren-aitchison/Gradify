// Workspaces and the organisation API's messages (kit/org): which workspace is open, what each role's sidebar offers,
// who may be invited by whom, and how the database's answers reach people.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readWorkspace, writeWorkspace, orgOf, can, orgNav, invitableRoles, PERSONAL, JOIN_REASONS } from "../kit/org/workspace.js";
import * as A from "../kit/org/api.js";

const mem = () => { const m = new Map(); return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; };
const CTX = { teacher: false, organisations: [
  { id: "o1", name: "Riverside", roles: [{ role: "owner" }], permissions: ["org.read", "org.manage", "org.archive", "members.read", "members.invite", "members.manage", "members.manage_admins", "audit.read", "entitlements.read", "entitlements.manage", "org.data_policy.manage", "org.units.manage"] },
  { id: "o2", name: "Northfield", roles: [{ role: "student", unit: "u1" }], permissions: ["org.read"] },
] };

test("the workspace: personal by default, remembered per device, and never an organisation you've left", () => {
  const s = mem();
  assert.equal(readWorkspace(s), PERSONAL);
  writeWorkspace("o2", s);
  assert.equal(readWorkspace(s), "o2");
  assert.equal(orgOf(CTX, "o2").name, "Northfield");
  assert.equal(orgOf(CTX, "gone"), null, "an organisation you're not in opens nothing");
  assert.equal(orgOf(CTX, PERSONAL), null);
  assert.equal(readWorkspace({ getItem: () => { throw new Error("blocked"); } }), PERSONAL, "blocked storage: personal");
});

test("each role's sidebar offers only what its permissions make useful", () => {
  const owner = orgNav(orgOf(CTX, "o1")).map((n) => n.label);
  assert.deepEqual(owner, ["Overview", "Members", "Structure", "Invitations", "Licences and AI", "Data and privacy", "Audit log"]);
  const student = orgNav(orgOf(CTX, "o2")).map((n) => n.label);
  assert.deepEqual(student, ["Overview", "Structure", "Data and privacy"], "a student sees their organisation, not its members, licences or audit log");
  assert.ok(orgNav(orgOf(CTX, "o1")).every((n) => n.href.startsWith("#/org/o1")));
  assert.deepEqual(orgNav(null), []);
  assert.equal(can(orgOf(CTX, "o2"), "members.read"), false);
});

test("who may be invited: never guardians yet; owners and administrators only by an owner", () => {
  assert.ok(!invitableRoles(orgOf(CTX, "o1")).includes("guardian"));
  assert.ok(invitableRoles(orgOf(CTX, "o1")).includes("admin"));
  const admin = { permissions: ["members.invite"] };
  assert.deepEqual(invitableRoles(admin).filter((r) => r === "owner" || r === "admin"), []);
  for (const r of ["signed_out", "not_found", "revoked", "expired", "used_up", "archived", "wrong_account", "suspended", "too_many_attempts"]) assert.ok(JOIN_REASONS[r], r);
});

test("the API: signed out is a sign-in prompt; the database's own words come through; nothing internal leaks", async () => {
  await assert.rejects(A.contexts({ mode: "local" }), (e) => e.signin === true);
  const client = (error, data = null) => ({ mode: "cloud", db: { rpc: async () => ({ data, error }) } });
  await assert.rejects(A.invite(client({ message: "You can't invite people here." }), { org: "o", role: "student" }), /You can't invite people here\./);
  await assert.rejects(A.contexts(client({ code: "PGRST202", message: "Could not find the function public.my_contexts in the schema cache" })), (e) => e.missing === true, "before the migration: switched off, quietly");
  await assert.rejects(A.contexts(client({ message: 'new row for relation "org_members" violates check constraint "x"' })), /didn't work/, "database internals aren't shown");
  assert.deepEqual(await A.contexts(client(null, { organisations: [] })), { organisations: [] });
  assert.equal(A.joinLink("abc", "https://getgradify.com/app.html"), "https://getgradify.com/app.html#/join/abc");
});
