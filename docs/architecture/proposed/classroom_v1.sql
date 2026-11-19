-- ============================================================================================================
-- PROPOSAL ONLY. NOT A MIGRATION. DO NOT APPLY.
-- The core of Stages 1–4 in docs/architecture/BLENDED-LEARNING-AUDIT.md §5: organisations and permissions,
-- classrooms, assignments, submissions and grades, audit and notifications. It lives outside supabase/migrations/
-- so no tool runs it. Before any part becomes a migration it is split by domain (audit §7), gets its own RLS test
-- file, passes scripts/pg-rehearsal.mjs, and is reviewed against the live migration history with a verified backup.
-- Storage buckets and their policies are owner actions and are not here.
-- ============================================================================================================

-- ---------- 1. Organisations and permissions ----------
create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) between 2 and 120),
  kind text not null check (kind in ('primary_school', 'secondary_school', 'fe_college', 'university', 'training_provider',
    'professional_education', 'private_education', 'business', 'non_profit', 'public_sector')),
  verified_at timestamptz,                         -- set by Gradify staff after checking the administrative contact
  manages_minors boolean not null default false,   -- may enrol under-13s; requires verification, a DPIA and a DPA
  sponsor_plan text check (sponsor_plan is null or sponsor_plan in ('plus', 'pro')),   -- access it gives its members
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object' and pg_column_size(settings) <= 20000),
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  archived_at timestamptz
);
-- any structure: faculty, department, year group, division, team (the label is data, not schema)
create table public.org_units (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  parent_id uuid references public.org_units (id) on delete cascade,
  kind text not null check (length(kind) between 2 and 40),
  name text not null check (length(btrim(name)) between 1 and 120),
  created_at timestamptz not null default now()
);
create index org_units_org on public.org_units (org_id, parent_id);
create table public.role_permissions (
  role text not null check (role in ('owner', 'admin', 'unit_head', 'academic_lead', 'teacher', 'assistant', 'student', 'guardian', 'auditor')),
  permission text not null check (permission ~ '^[a-z_]+(\.[a-z_]+)+$'),
  primary key (role, permission)
);
create table public.org_members (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  unit_id uuid references public.org_units (id) on delete cascade,      -- null: the whole organisation
  role text not null,
  status text not null default 'active' check (status in ('active', 'suspended', 'removed')),
  created_at timestamptz not null default now(),
  unique (org_id, user_id, unit_id, role)
);
create index org_members_user on public.org_members (user_id) where status = 'active';
create table public.org_invitations (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  unit_id uuid references public.org_units (id) on delete cascade,
  role text not null,
  token_hash text not null unique check (token_hash ~ '^[0-9a-f]{64}$'),   -- sha256 of the token; the token is shown once
  email text check (email is null or length(email) <= 254),
  expires_at timestamptz not null,
  max_uses integer not null default 1 check (max_uses between 1 and 5000),
  uses integer not null default 0,
  revoked_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now()
);

-- does the caller hold `perm` in this organisation, at this unit or any unit above it?
create function public.has_perm(p_perm text, p_org uuid, p_unit uuid default null) returns boolean
language sql stable security definer set search_path = public as $$
  with recursive up as (
    select id, parent_id from public.org_units where id = p_unit
    union all select u.id, u.parent_id from public.org_units u join up on u.id = up.parent_id
  )
  select exists (
    select 1 from public.org_members m join public.role_permissions rp on rp.role = m.role
    where m.user_id = auth.uid() and m.org_id = p_org and m.status = 'active' and rp.permission = p_perm
      and (m.unit_id is null or m.unit_id in (select id from up))
  )
$$;

-- ---------- 2. Classrooms ----------
create table public.classrooms (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organisations (id) on delete cascade,   -- null: an independent teacher's classroom
  unit_id uuid references public.org_units (id) on delete set null,
  name text not null check (length(btrim(name)) between 2 and 120),
  subject text check (subject is null or length(subject) <= 80),
  level text check (level is null or length(level) <= 60),
  description text not null default '' check (length(description) <= 4000),
  course_ref text check (course_ref is null or course_ref ~ '^course:[a-z0-9-]{2,40}$'),   -- a Gradify course, by reference
  min_age_band text not null default '13+' check (min_age_band in ('under_13', '13+', '16+', '18+')),
  enrolment text not null default 'code' check (enrolment in ('code', 'link', 'email', 'organisation', 'bulk')),
  starts_on date, ends_on date,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  archived_at timestamptz,
  check (ends_on is null or starts_on is null or ends_on >= starts_on),
  check (min_age_band <> 'under_13' or org_id is not null)               -- under-13s only through an organisation (D2)
);
create table public.classroom_members (
  classroom_id uuid not null references public.classrooms (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'teacher', 'assistant', 'student')),
  status text not null default 'active' check (status in ('active', 'suspended', 'removed')),
  joined_at timestamptz not null default now(),
  primary key (classroom_id, user_id)
);
create index classroom_members_user on public.classroom_members (user_id) where status = 'active';
create table public.classroom_codes (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms (id) on delete cascade,
  code_hash text not null unique check (code_hash ~ '^[0-9a-f]{64}$'),
  expires_at timestamptz,
  max_uses integer check (max_uses is null or max_uses between 1 and 5000),
  uses integer not null default 0,
  revoked_at timestamptz,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now()
);
create function public.classroom_role(p_classroom uuid) returns text
language sql stable security definer set search_path = public as $$
  select role from public.classroom_members where classroom_id = p_classroom and user_id = auth.uid() and status = 'active'
$$;
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms (id) on delete cascade,
  author uuid not null default auth.uid() references auth.users (id),
  body text not null check (length(btrim(body)) between 1 and 8000),
  published_at timestamptz not null default now()
);
create table public.class_events (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms (id) on delete cascade,
  kind text not null check (kind in ('lesson', 'lecture', 'workshop', 'practical', 'discussion', 'assessment', 'revision', 'office_hours', 'other')),
  place text not null check (place in ('in_person', 'online', 'gradify')),
  title text not null check (length(btrim(title)) between 1 and 200),
  starts_at timestamptz not null, ends_at timestamptz,
  content_ref text, assignment_id uuid,
  check (ends_at is null or ends_at > starts_at)
);

-- ---------- 3. Assignments ----------
create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms (id) on delete cascade,
  title text not null check (length(btrim(title)) between 1 and 200),
  description text not null default '' check (length(description) <= 8000),
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'closed', 'archived')),
  opens_at timestamptz, due_at timestamptz, closes_at timestamptz,
  late_policy text not null default 'accept_flagged' check (late_policy in ('accept_flagged', 'refuse')),
  current_version integer not null default 0,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now()
);
create table public.assignment_versions (
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  version integer not null check (version >= 1),
  snapshot jsonb not null check (jsonb_typeof(snapshot) = 'object' and pg_column_size(snapshot) <= 500000),
  published_at timestamptz not null default now(),
  published_by uuid not null references auth.users (id),
  primary key (assignment_id, version)
);
create table public.assignment_items (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  version integer not null,
  position smallint not null check (position between 1 and 100),
  kind text not null check (kind in ('lesson', 'flashcards', 'quiz', 'exam', 'written', 'file', 'lab', 'pathway', 'discussion', 'external', 'custom')),
  content_ref text check (content_ref is null or content_ref ~ '^(lesson|quiz|lab|deck|notes|bank|res|course):[A-Za-z0-9/_.-]{1,160}$|^url:https://'),
  required boolean not null default true,
  requirements jsonb not null default '{}'::jsonb check (jsonb_typeof(requirements) = 'object' and pg_column_size(requirements) <= 20000),
  marking text not null check (marking in ('auto_server', 'self', 'teacher')),
  unique (assignment_id, version, position)
);
create table public.assignment_targets (
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  target_kind text not null check (target_kind in ('classroom', 'group', 'user')),
  target_id uuid not null,
  primary key (assignment_id, target_kind, target_id)
);
create table public.assignment_extensions (
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  due_at timestamptz not null,
  reason text not null default '' check (length(reason) <= 500),
  granted_by uuid not null references auth.users (id),
  primary key (assignment_id, user_id)
);

-- ---------- 4. Submissions, feedback and grades ----------
create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments (id) on delete cascade,
  student_id uuid not null references auth.users (id) on delete cascade,
  version integer not null,                          -- the assignment version this was made against
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'submitted', 'under_review', 'returned', 'resubmitted', 'graded')),
  submitted_at timestamptz,
  late boolean not null default false,
  unique (assignment_id, student_id)
);
create table public.submission_items (
  submission_id uuid not null references public.submissions (id) on delete cascade,
  item_id uuid not null references public.assignment_items (id) on delete cascade,
  source text not null check (source in ('self_reported', 'server_marked', 'teacher')),   -- how much the evidence can be trusted
  evidence jsonb not null default '{}'::jsonb check (jsonb_typeof(evidence) = 'object' and pg_column_size(evidence) <= 50000),
  score numeric(5, 4) check (score is null or (score >= 0 and score <= 1)),
  completed_at timestamptz,
  primary key (submission_id, item_id)
);
create table public.submission_attempts (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  item_id uuid not null references public.assignment_items (id) on delete cascade,
  body jsonb not null check (jsonb_typeof(body) = 'object' and pg_column_size(body) <= 200000),   -- written answer, file refs, exam responses
  created_at timestamptz not null default now()
);
create table public.feedback (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions (id) on delete cascade,
  item_id uuid references public.assignment_items (id) on delete cascade,
  author uuid references auth.users (id),             -- null with kind 'ai_suggestion'
  kind text not null check (kind in ('teacher', 'ai_suggestion')),
  body text not null check (length(body) <= 20000),
  rubric_scores jsonb check (rubric_scores is null or jsonb_typeof(rubric_scores) = 'object'),
  accepted_by uuid references auth.users (id),        -- a teacher who accepted or edited an AI suggestion
  released_at timestamptz,
  created_at timestamptz not null default now(),
  check (kind = 'teacher' or released_at is null or accepted_by is not null)   -- AI feedback is never released unreviewed
);
create table public.grades (
  submission_id uuid not null references public.submissions (id) on delete cascade,
  item_id uuid references public.assignment_items (id) on delete cascade,      -- null: the overall grade
  score numeric(8, 3) not null, max numeric(8, 3) not null check (max > 0),
  method text not null check (method in ('auto_server', 'teacher', 'teacher_from_ai')),
  graded_by uuid references auth.users (id),
  released_at timestamptz,
  created_at timestamptz not null default now(),
  unique nulls not distinct (submission_id, item_id),
  check (method = 'auto_server' or graded_by is not null)
);

-- ---------- 5. Platform ----------
create table public.audit_log (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  actor uuid references auth.users (id),
  org_id uuid, classroom_id uuid,
  action text not null check (action ~ '^[a-z_]+(\.[a-z_]+)+$'),
  target_kind text, target_id text,
  detail jsonb check (detail is null or pg_column_size(detail) <= 4000)
);
create index audit_log_org on public.audit_log (org_id, at desc);
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind ~ '^[a-z_]+$'),
  context_kind text, context_id uuid,
  dedupe_key text not null check (length(dedupe_key) <= 200),
  payload jsonb not null default '{}'::jsonb check (pg_column_size(payload) <= 4000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  unique (user_id, dedupe_key)                                 -- one event never notifies twice
);

-- ---------- Row-level security (all tables) ----------
-- Every table above: enable row level security; revoke all from anon; no client update on status, role or method
-- columns. Policies, in outline (each is tested in its own tests/<domain>-db.test.mjs before it is proposed):
--   organisations / org_units      read: active members; write: has_perm('org.manage', org)
--   org_members                    read: self, or has_perm('members.read', org); write: RPC only (invite, accept, change_role)
--   classrooms, announcements, class_events   read: classroom_role(id) is not null or has_perm('classrooms.read', org)
--   classroom_members              read: same classroom; write: RPC only (join_classroom, add_teacher, remove_member)
--   assignments, items, versions   teachers: classroom_role in (owner, teacher, assistant); students: only when status
--                                  in (published, closed) and they are targeted
--   submissions, items, attempts   the student (own row), and the classroom's teachers; never other students
--   feedback, grades               the classroom's teachers; the student only once released_at is set
--   audit_log                      insert: security definer RPCs only; read: has_perm('audit.read', org)
--   notifications                  own rows only
-- Workflow RPCs (security definer, one transaction each, one audit row each): create_organisation, invite_member,
-- accept_invitation, create_classroom, create_classroom_code, join_classroom, publish_assignment, schedule_assignment,
-- close_assignment, extend_for, reopen_for, start_submission, record_item_evidence, submit_answer (server marking),
-- submit, return_submission, release_grades, request_review.
