-- Stage 1: organisations, their structure, who belongs to them and what each person may do there. New tables and
-- functions only; nothing existing changes (docs/architecture/STAGE1-DEPENDENCIES.md).
--
-- One account per person, always. There is no global role: what someone may do is decided per organisation (and
-- per unit within it) by their memberships, through has_perm(). An organisation can be any kind (a school, a
-- university, a training provider, an employer); its structure is a tree of units whose labels are data ("faculty",
-- "year group", "team"), so nothing here is school-shaped.
--
-- What membership does NOT give (decision D10): no policy here, or anywhere, lets an organisation or its staff read a
-- member's personal learning (cards, reviews, notes, course progress, attempts, events, goals, conversations).
-- Organisations see their own structure, their own members and their own audit log, and nothing else.
--
-- Every change goes through a function below, which checks permission, does the work in one transaction and writes
-- one audit row. Clients can read (as the policies allow) but can't insert, update or delete any of these tables.
--
--   organisations        verified_at is set by Gradify staff only; an organisation may manage under-13s
--                        (manages_minors, decision D2) only once verified
--   org_units            a tree within one organisation (a unit's parent is always in the same organisation)
--   role_permissions     the role → permission catalogue (seeded below; read by everyone signed in)
--   org_members          a person's role in an organisation, or in one unit of it (the unit and everything below)
--   org_invitations      single-use or multi-use invitations: only a hash of the token is kept; expiry, limit,
--                        revocation, and an optional email that must match the account accepting it
--   invitation_attempts  failed redemptions, to slow down guessing
--   org_data_policies    per processing purpose: the controller/processor arrangement, retention and the agreement,
--                        recorded by the organisation and confirmed by Gradify (decision D7). Starts "undecided"
--   teacher_profiles     an ordinary account that has switched on teaching (independent teachers); confirms 18+

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) between 2 and 120),
  kind text not null check (kind in ('primary_school', 'secondary_school', 'fe_college', 'university', 'training_provider',
    'professional_education', 'private_education', 'business', 'non_profit', 'public_sector')),
  verified_at timestamptz,
  manages_minors boolean not null default false,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  archived_at timestamptz,
  check (not manages_minors or verified_at is not null)
);

create table public.org_units (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  parent_id uuid,
  kind text not null check (length(btrim(kind)) between 2 and 40),
  name text not null check (length(btrim(name)) between 1 and 120),
  created_at timestamptz not null default now(),
  archived_at timestamptz,
  unique (id, org_id),
  foreign key (parent_id, org_id) references public.org_units (id, org_id) on delete cascade
);
create index org_units_tree on public.org_units (org_id, parent_id);

create table public.role_permissions (
  role text not null check (role in ('owner', 'admin', 'unit_head', 'academic_lead', 'teacher', 'assistant', 'student', 'guardian', 'auditor')),
  permission text not null check (permission ~ '^[a-z_]+(\.[a-z_]+)+$'),
  primary key (role, permission)
);
insert into public.role_permissions (role, permission) values
  ('owner', 'org.read'), ('owner', 'org.manage'), ('owner', 'org.archive'), ('owner', 'org.units.manage'), ('owner', 'org.data_policy.manage'),
  ('owner', 'members.read'), ('owner', 'members.invite'), ('owner', 'members.manage'), ('owner', 'members.manage_admins'),
  ('owner', 'audit.read'), ('owner', 'entitlements.read'), ('owner', 'entitlements.manage'),
  ('admin', 'org.read'), ('admin', 'org.manage'), ('admin', 'org.units.manage'), ('admin', 'members.read'), ('admin', 'members.invite'),
  ('admin', 'members.manage'), ('admin', 'audit.read'), ('admin', 'entitlements.read'), ('admin', 'entitlements.manage'),
  ('unit_head', 'org.read'), ('unit_head', 'org.units.manage'), ('unit_head', 'members.read'), ('unit_head', 'members.invite'), ('unit_head', 'members.manage'),
  ('academic_lead', 'org.read'), ('academic_lead', 'members.read'),
  ('teacher', 'org.read'), ('teacher', 'members.read'),
  ('assistant', 'org.read'),
  ('student', 'org.read'),
  ('auditor', 'org.read'), ('auditor', 'members.read'), ('auditor', 'audit.read'), ('auditor', 'entitlements.read');

create table public.org_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  unit_id uuid,
  role text not null check (role in ('owner', 'admin', 'unit_head', 'academic_lead', 'teacher', 'assistant', 'student', 'guardian', 'auditor')),
  status text not null default 'active' check (status in ('active', 'suspended', 'removed')),
  invited_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (unit_id, org_id) references public.org_units (id, org_id) on delete cascade,
  unique nulls not distinct (org_id, user_id, unit_id, role),
  check (unit_id is null or role not in ('owner', 'admin'))    -- owners and administrators act for the whole organisation
);
create index org_members_user on public.org_members (user_id) where status = 'active';
create index org_members_org on public.org_members (org_id, status);

create table public.org_invitations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  unit_id uuid,
  role text not null check (role in ('owner', 'admin', 'unit_head', 'academic_lead', 'teacher', 'assistant', 'student', 'auditor')),
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),
  email text check (email is null or (length(email) <= 254 and email = lower(email))),
  expires_at timestamptz not null,
  max_uses integer not null default 1 check (max_uses between 1 and 500),
  uses integer not null default 0 check (uses >= 0),
  revoked_at timestamptz,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now(),
  foreign key (unit_id, org_id) references public.org_units (id, org_id) on delete cascade,
  check (uses <= max_uses),
  check (unit_id is null or role not in ('owner', 'admin'))
);
create index org_invitations_org on public.org_invitations (org_id, created_at desc);

create table public.invitation_attempts (
  user_id uuid not null references auth.users (id) on delete cascade,
  at timestamptz not null default now()
);
create index invitation_attempts_user on public.invitation_attempts (user_id, at desc);

create table public.org_data_policies (
  org_id uuid not null references public.organisations (id) on delete cascade,
  purpose text not null check (purpose in ('membership', 'classroom_records', 'training_records', 'community', 'analytics', 'support')),
  arrangement text not null default 'undecided' check (arrangement in ('undecided', 'gradify_controller', 'organisation_controller', 'joint_controllers')),
  retention_days integer check (retention_days is null or retention_days between 30 and 36500),
  agreement_ref text check (agreement_ref is null or length(agreement_ref) <= 200),
  recorded_by uuid references auth.users (id) on delete set null,
  recorded_at timestamptz,
  confirmed_by_gradify_at timestamptz,       -- set by Gradify staff only, after legal review
  primary key (org_id, purpose)
);

create table public.teacher_profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  display_name text not null check (length(btrim(display_name)) between 2 and 60),
  subjects text[] not null default '{}' check (cardinality(subjects) <= 12),
  confirmed_adult boolean not null check (confirmed_adult),   -- a declaration, as over_13 is in community_profiles
  activated_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- permission checks (used by every policy and function below, and by later stages) ----------
-- is the caller an active member of this (unarchived) organisation, in any role?
create function public.is_org_member(p_org uuid) returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.org_members m join public.organisations o on o.id = m.org_id
    where m.org_id = p_org and m.user_id = auth.uid() and m.status = 'active' and o.archived_at is null);
$$;
-- does the caller hold this permission in this organisation: through an organisation-wide role, or a role in this
-- unit or any unit above it? Without a unit, only organisation-wide roles count.
create function public.has_perm(p_perm text, p_org uuid, p_unit uuid default null) returns boolean language sql stable security definer set search_path = public as $$
  with recursive up as (
    select u.id, u.parent_id, 0 as depth from public.org_units u where u.id = p_unit and u.org_id = p_org
    union all select u.id, u.parent_id, up.depth + 1 from public.org_units u join up on u.id = up.parent_id where up.depth < 50
  )
  select exists (
    select 1 from public.org_members m
    join public.role_permissions rp on rp.role = m.role and rp.permission = p_perm
    join public.organisations o on o.id = m.org_id and o.archived_at is null
    where m.user_id = auth.uid() and m.org_id = p_org and m.status = 'active'
      and (m.unit_id is null or m.unit_id in (select id from up))
  );
$$;
revoke all on function public.is_org_member(uuid) from public, anon;
revoke all on function public.has_perm(text, uuid, uuid) from public, anon;
grant execute on function public.is_org_member(uuid) to authenticated;
grant execute on function public.has_perm(text, uuid, uuid) to authenticated;

-- ---------- what each person can read ----------
alter table public.organisations enable row level security;
alter table public.org_units enable row level security;
alter table public.role_permissions enable row level security;
alter table public.org_members enable row level security;
alter table public.org_invitations enable row level security;
alter table public.invitation_attempts enable row level security;
alter table public.org_data_policies enable row level security;
alter table public.teacher_profiles enable row level security;
create policy "members read their organisation" on public.organisations for select to authenticated using (public.is_org_member(id));
create policy "members read its units" on public.org_units for select to authenticated using (public.is_org_member(org_id));
create policy "everyone signed in reads the role catalogue" on public.role_permissions for select to authenticated using (true);
create policy "your memberships, and members you may see" on public.org_members for select to authenticated using (user_id = auth.uid() or public.has_perm('members.read', org_id, unit_id));
create policy "invitations, for those who may invite" on public.org_invitations for select to authenticated using (public.has_perm('members.invite', org_id, unit_id));
-- every member can see how their organisation's data is handled, whatever their role or unit
create policy "data arrangements, for members" on public.org_data_policies for select to authenticated using (public.is_org_member(org_id));
create policy "your teacher profile" on public.teacher_profiles for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "an organisation's audit log, for those who may read it" on public.audit_log for select to authenticated using (org_id is not null and public.has_perm('audit.read', org_id));
revoke all on table public.organisations from anon;
revoke all on table public.org_units from anon;
revoke all on table public.role_permissions from anon;
revoke all on table public.org_members from anon;
revoke all on table public.org_invitations from anon;
revoke all on table public.invitation_attempts from anon, authenticated;
revoke all on table public.org_data_policies from anon;
revoke all on table public.teacher_profiles from anon;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.organisations from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_units from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.role_permissions from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_members from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_invitations from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_data_policies from authenticated;
revoke truncate, references, trigger, maintain on table public.teacher_profiles from authenticated;

-- ---------- the workflows: each checks permission, works in one transaction and writes one audit row ----------
create function public._must(p_ok boolean, p_message text) returns void language plpgsql immutable as $$
begin
  if not coalesce(p_ok, false) then raise exception '%', p_message using errcode = '42501'; end if;
end $$;
revoke all on function public._must(boolean, text) from public, anon, authenticated;

-- a new organisation: the caller becomes its owner. At most 10 organisations created per person.
create function public.create_organisation(p_name text, p_kind text) returns uuid language plpgsql volatile security definer set search_path = public as $$
declare uid uuid := auth.uid(); o uuid;
begin
  perform public._must(uid is not null, 'Sign in first.');
  perform public._must((select count(*) from public.organisations where created_by = uid) < 10, 'You''ve created the most organisations one account can.');
  insert into public.organisations (name, kind, created_by) values (btrim(p_name), p_kind, uid) returning id into o;
  insert into public.org_members (org_id, user_id, role, invited_by) values (o, uid, 'owner', uid);
  insert into public.org_data_policies (org_id, purpose) select o, p from unnest(array['membership', 'classroom_records', 'training_records', 'community', 'analytics', 'support']) p;
  perform public._audit('org.created', o, 'organisation', o::text, jsonb_build_object('kind', p_kind));
  return o;
end $$;

create function public.rename_organisation(p_org uuid, p_name text) returns void language plpgsql volatile security definer set search_path = public as $$
begin
  perform public._must(public.has_perm('org.manage', p_org), 'You can''t change this organisation.');
  update public.organisations set name = btrim(p_name), updated_at = now() where id = p_org;
  perform public._audit('org.renamed', p_org, 'organisation', p_org::text, jsonb_build_object('name', btrim(p_name)));
end $$;

-- archiving hides the organisation and suspends every permission in it; nothing is deleted
create function public.archive_organisation(p_org uuid) returns void language plpgsql volatile security definer set search_path = public as $$
begin
  perform public._must(public.has_perm('org.archive', p_org), 'Only an owner can archive this organisation.');
  update public.organisations set archived_at = now(), updated_at = now() where id = p_org and archived_at is null;
  perform public._audit('org.archived', p_org, 'organisation', p_org::text, null);
end $$;

create function public.create_unit(p_org uuid, p_parent uuid, p_kind text, p_name text) returns uuid language plpgsql volatile security definer set search_path = public as $$
declare u uuid;
begin
  perform public._must(public.has_perm('org.units.manage', p_org, p_parent), 'You can''t add units here.');
  perform public._must((select count(*) from public.org_units where org_id = p_org) < 2000, 'This organisation has the most units it can.');
  insert into public.org_units (org_id, parent_id, kind, name) values (p_org, p_parent, btrim(p_kind), btrim(p_name)) returning id into u;
  perform public._audit('org.unit_created', p_org, 'unit', u::text, jsonb_build_object('parent', p_parent, 'kind', btrim(p_kind), 'name', btrim(p_name)));
  return u;
end $$;

create function public.rename_unit(p_unit uuid, p_name text) returns void language plpgsql volatile security definer set search_path = public as $$
declare o uuid := (select org_id from public.org_units where id = p_unit);
begin
  perform public._must(o is not null and public.has_perm('org.units.manage', o, p_unit), 'You can''t change this unit.');
  update public.org_units set name = btrim(p_name) where id = p_unit;
  perform public._audit('org.unit_renamed', o, 'unit', p_unit::text, jsonb_build_object('name', btrim(p_name)));
end $$;

-- an invitation: returns the token once (it's never stored, only its hash). With an email, only that account can
-- accept it, and an email is queued. Owners and administrators can only be invited by an owner. Guardian access
-- isn't available yet (decision D2).
create function public.invite_member(p_org uuid, p_unit uuid, p_role text, p_email text, p_days integer, p_max_uses integer) returns text language plpgsql volatile security definer set search_path = public as $$
declare uid uuid := auth.uid(); tok text; inv uuid; mail text := nullif(lower(btrim(coalesce(p_email, ''))), ''); oname text;
begin
  perform public._must(public.has_perm('members.invite', p_org, p_unit), 'You can''t invite people here.');
  perform public._must(p_role in ('owner', 'admin', 'unit_head', 'academic_lead', 'teacher', 'assistant', 'student', 'auditor'), 'That role can''t be invited.');
  perform public._must(p_role not in ('owner', 'admin') or public.has_perm('members.manage_admins', p_org), 'Only an owner can invite owners and administrators.');
  perform public._must(p_days between 1 and 30, 'An invitation lasts between 1 and 30 days.');
  perform public._must(coalesce(p_max_uses, 1) between 1 and 500, 'An invitation can be used between 1 and 500 times.');
  perform public._must(mail is null or coalesce(p_max_uses, 1) = 1, 'An invitation for one email address can be used once.');
  perform public._must((select count(*) from public.org_invitations where org_id = p_org and created_at > now() - interval '1 day') < 500, 'This organisation has sent the most invitations it can today.');
  tok := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
  insert into public.org_invitations (org_id, unit_id, role, token_hash, email, expires_at, max_uses, created_by)
  values (p_org, p_unit, p_role, encode(sha256(convert_to(tok, 'UTF8')), 'hex'), mail, now() + make_interval(days => p_days), coalesce(p_max_uses, 1), uid)
  returning id into inv;
  if mail is not null then
    select name into oname from public.organisations where id = p_org;
    perform public._queue_email(null, mail, 'org_invitation', jsonb_build_object('organisation', oname, 'role', p_role, 'token', tok, 'expires_days', p_days), 'org_invitation:' || inv::text);
  end if;
  perform public._audit('members.invited', p_org, 'invitation', inv::text, jsonb_build_object('role', p_role, 'unit', p_unit, 'email', mail is not null, 'max_uses', coalesce(p_max_uses, 1), 'days', p_days));
  return tok;
end $$;

create function public.revoke_invitation(p_invitation uuid) returns void language plpgsql volatile security definer set search_path = public as $$
declare i public.org_invitations;
begin
  select * into i from public.org_invitations where id = p_invitation;
  perform public._must(i.id is not null and public.has_perm('members.invite', i.org_id, i.unit_id), 'You can''t revoke this invitation.');
  update public.org_invitations set revoked_at = now() where id = p_invitation and revoked_at is null;
  perform public._audit('members.invitation_revoked', i.org_id, 'invitation', p_invitation::text, null);
end $$;

-- accepting an invitation. Returns { ok, org, role } or { ok: false, reason }. A wrong token, an expired, revoked or
-- used-up one, or one for another email address all count towards a limit of 10 failures an hour, so tokens can't
-- be guessed. Accepting the same invitation again changes nothing.
create function public.accept_invitation(p_token text) returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare uid uuid := auth.uid(); i public.org_invitations; mail text; fails int; o public.organisations;
begin
  if uid is null then return jsonb_build_object('ok', false, 'reason', 'signed_out'); end if;
  select count(*) into fails from public.invitation_attempts where user_id = uid and at > now() - interval '1 hour';
  if fails >= 10 then return jsonb_build_object('ok', false, 'reason', 'too_many_attempts'); end if;
  select * into i from public.org_invitations where token_hash = encode(sha256(convert_to(coalesce(p_token, ''), 'UTF8')), 'hex') for update;
  select * into o from public.organisations where id = i.org_id;
  select lower(email) into mail from auth.users where id = uid;
  if i.id is null or i.revoked_at is not null or i.expires_at <= now() or o.archived_at is not null or (i.email is not null and i.email is distinct from mail) then
    insert into public.invitation_attempts (user_id) values (uid);
    return jsonb_build_object('ok', false, 'reason', case when i.id is null then 'not_found' when i.revoked_at is not null then 'revoked' when i.expires_at <= now() then 'expired' when o.archived_at is not null then 'archived' else 'wrong_account' end);
  end if;
  if exists (select 1 from public.org_members where org_id = i.org_id and user_id = uid and unit_id is not distinct from i.unit_id and role = i.role and status = 'active') then
    return jsonb_build_object('ok', true, 'org', i.org_id, 'role', i.role, 'already', true);
  end if;
  if i.uses >= i.max_uses then
    insert into public.invitation_attempts (user_id) values (uid);
    return jsonb_build_object('ok', false, 'reason', 'used_up');
  end if;
  -- a removed or suspended membership in the same role isn't revived by an invitation from someone without the right
  if exists (select 1 from public.org_members where org_id = i.org_id and user_id = uid and unit_id is not distinct from i.unit_id and role = i.role and status = 'suspended') then
    return jsonb_build_object('ok', false, 'reason', 'suspended');
  end if;
  insert into public.org_members (org_id, user_id, unit_id, role, invited_by) values (i.org_id, uid, i.unit_id, i.role, i.created_by)
  on conflict (org_id, user_id, unit_id, role) do update set status = 'active', updated_at = now(), invited_by = excluded.invited_by;
  update public.org_invitations set uses = uses + 1 where id = i.id;
  perform public._audit('members.joined', i.org_id, 'invitation', i.id::text, jsonb_build_object('role', i.role, 'unit', i.unit_id));
  perform public._notify(i.created_by, 'org.member_joined', i.org_id, 'Someone accepted your invitation to ' || o.name, 'They joined as ' || replace(i.role, '_', ' ') || '.', '#/org/' || i.org_id::text || '/members', 'org.member_joined:' || i.id::text || ':' || uid::text);
  return jsonb_build_object('ok', true, 'org', i.org_id, 'role', i.role);
end $$;

-- how many active owners an organisation has
create function public._owners(p_org uuid) returns integer language sql stable security definer set search_path = public as $$
  select count(*)::int from public.org_members where org_id = p_org and role = 'owner' and status = 'active';
$$;
revoke all on function public._owners(uuid) from public, anon, authenticated;

create function public.change_member_role(p_member uuid, p_role text) returns void language plpgsql volatile security definer set search_path = public as $$
declare m public.org_members;
begin
  select * into m from public.org_members where id = p_member for update;
  perform public._must(m.id is not null and public.has_perm('members.manage', m.org_id, m.unit_id), 'You can''t change this member.');
  perform public._must(p_role in ('owner', 'admin', 'unit_head', 'academic_lead', 'teacher', 'assistant', 'student', 'auditor'), 'That role isn''t available.');
  perform public._must((m.role not in ('owner', 'admin') and p_role not in ('owner', 'admin')) or public.has_perm('members.manage_admins', m.org_id), 'Only an owner can change owners and administrators.');
  perform public._must(not (m.role = 'owner' and p_role <> 'owner' and m.status = 'active' and public._owners(m.org_id) <= 1), 'An organisation needs at least one owner.');
  perform public._must(m.unit_id is null or p_role not in ('owner', 'admin'), 'Owners and administrators act for the whole organisation, not one unit.');
  update public.org_members set role = p_role, updated_at = now() where id = p_member;
  perform public._audit('members.role_changed', m.org_id, 'member', p_member::text, jsonb_build_object('from', m.role, 'to', p_role, 'user', m.user_id));
  perform public._notify(m.user_id, 'org.role_changed', m.org_id, 'Your role changed', 'You''re now ' || replace(p_role, '_', ' ') || '.', '#/org/' || m.org_id::text, 'org.role_changed:' || p_member::text || ':' || extract(epoch from now())::bigint::text);
end $$;

-- suspend, remove or restore a member. Takes effect at once: every policy checks status = 'active'.
create function public.set_member_status(p_member uuid, p_status text) returns void language plpgsql volatile security definer set search_path = public as $$
declare m public.org_members;
begin
  select * into m from public.org_members where id = p_member for update;
  perform public._must(m.id is not null and public.has_perm('members.manage', m.org_id, m.unit_id), 'You can''t change this member.');
  perform public._must(p_status in ('active', 'suspended', 'removed'), 'Unknown status.');
  perform public._must(m.user_id <> auth.uid(), 'You can''t change your own membership here. To leave, use Leave organisation.');
  perform public._must(m.role not in ('owner', 'admin') or public.has_perm('members.manage_admins', m.org_id), 'Only an owner can change owners and administrators.');
  perform public._must(not (m.role = 'owner' and p_status <> 'active' and public._owners(m.org_id) <= 1), 'An organisation needs at least one owner.');
  update public.org_members set status = p_status, updated_at = now() where id = p_member;
  perform public._audit('members.status_changed', m.org_id, 'member', p_member::text, jsonb_build_object('from', m.status, 'to', p_status, 'user', m.user_id));
end $$;

create function public.leave_organisation(p_org uuid) returns void language plpgsql volatile security definer set search_path = public as $$
declare uid uuid := auth.uid();
begin
  perform public._must(uid is not null, 'Sign in first.');
  perform public._must(not exists (select 1 from public.org_members where org_id = p_org and user_id = uid and role = 'owner' and status = 'active') or public._owners(p_org) > 1, 'You''re the only owner. Make someone else an owner first, or archive the organisation.');
  update public.org_members set status = 'removed', updated_at = now() where org_id = p_org and user_id = uid and status <> 'removed';
  perform public._audit('members.left', p_org, 'member', uid::text, null);
end $$;

-- the organisation records its arrangement for one processing purpose; Gradify confirms it separately
create function public.set_data_policy(p_org uuid, p_purpose text, p_arrangement text, p_retention_days integer, p_agreement_ref text) returns void language plpgsql volatile security definer set search_path = public as $$
begin
  perform public._must(public.has_perm('org.data_policy.manage', p_org), 'Only an owner can record data arrangements.');
  update public.org_data_policies set arrangement = p_arrangement, retention_days = p_retention_days, agreement_ref = nullif(btrim(coalesce(p_agreement_ref, '')), ''),
    recorded_by = auth.uid(), recorded_at = now(), confirmed_by_gradify_at = null
  where org_id = p_org and purpose = p_purpose;
  perform public._must(found, 'Unknown purpose.');
  perform public._audit('org.data_policy_recorded', p_org, 'data_policy', p_purpose, jsonb_build_object('arrangement', p_arrangement, 'retention_days', p_retention_days));
end $$;

-- every context the caller can work in, for the workspace switcher: their personal space, each organisation with
-- their roles and permissions there, and whether they teach independently
create function public.my_contexts() returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'teacher', exists (select 1 from public.teacher_profiles where user_id = auth.uid()),
    'organisations', coalesce((
      select jsonb_agg(jsonb_build_object('id', o.id, 'name', o.name, 'kind', o.kind, 'verified', o.verified_at is not null,
        'roles', (select jsonb_agg(jsonb_build_object('role', m.role, 'unit', m.unit_id, 'unit_name', (select name from public.org_units where id = m.unit_id)) order by m.role)
                  from public.org_members m where m.org_id = o.id and m.user_id = auth.uid() and m.status = 'active'),
        'permissions', (select jsonb_agg(distinct rp.permission) from public.org_members m join public.role_permissions rp on rp.role = m.role
                        where m.org_id = o.id and m.user_id = auth.uid() and m.status = 'active'))
        order by o.name)
      from public.organisations o
      where o.archived_at is null and exists (select 1 from public.org_members m where m.org_id = o.id and m.user_id = auth.uid() and m.status = 'active')
    ), '[]'::jsonb));
$$;

-- the members the caller may see (the same rule as the org_members policy, row by row), with the email address
-- each joined with, so organisations can recognise their people. Nothing else about the person is shown.
create function public.org_member_list(p_org uuid) returns table (id uuid, user_id uuid, email text, unit_id uuid, role text, status text, created_at timestamptz) language sql stable security definer set search_path = public as $$
  select m.id, m.user_id, u.email::text, m.unit_id, m.role, m.status, m.created_at
  from public.org_members m join auth.users u on u.id = m.user_id
  where m.org_id = p_org and (m.user_id = auth.uid() or public.has_perm('members.read', m.org_id, m.unit_id))
  order by m.created_at;
$$;
revoke all on function public.org_member_list(uuid) from public, anon;
grant execute on function public.org_member_list(uuid) to authenticated;

revoke all on function public.create_organisation(text, text) from public, anon;
revoke all on function public.rename_organisation(uuid, text) from public, anon;
revoke all on function public.archive_organisation(uuid) from public, anon;
revoke all on function public.create_unit(uuid, uuid, text, text) from public, anon;
revoke all on function public.rename_unit(uuid, text) from public, anon;
revoke all on function public.invite_member(uuid, uuid, text, text, integer, integer) from public, anon;
revoke all on function public.revoke_invitation(uuid) from public, anon;
revoke all on function public.accept_invitation(text) from public, anon;
revoke all on function public.change_member_role(uuid, text) from public, anon;
revoke all on function public.set_member_status(uuid, text) from public, anon;
revoke all on function public.leave_organisation(uuid) from public, anon;
revoke all on function public.set_data_policy(uuid, text, text, integer, text) from public, anon;
revoke all on function public.my_contexts() from public, anon;
grant execute on function public.create_organisation(text, text) to authenticated;
grant execute on function public.rename_organisation(uuid, text) to authenticated;
grant execute on function public.archive_organisation(uuid) to authenticated;
grant execute on function public.create_unit(uuid, uuid, text, text) to authenticated;
grant execute on function public.rename_unit(uuid, text) to authenticated;
grant execute on function public.invite_member(uuid, uuid, text, text, integer, integer) to authenticated;
grant execute on function public.revoke_invitation(uuid) to authenticated;
grant execute on function public.accept_invitation(text) to authenticated;
grant execute on function public.change_member_role(uuid, text) to authenticated;
grant execute on function public.set_member_status(uuid, text) to authenticated;
grant execute on function public.leave_organisation(uuid) to authenticated;
grant execute on function public.set_data_policy(uuid, text, text, integer, text) to authenticated;
grant execute on function public.my_contexts() to authenticated;
