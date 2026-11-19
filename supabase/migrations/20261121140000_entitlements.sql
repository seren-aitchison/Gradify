-- Stage 1: organisation-sponsored access and shared AI allowances (decision D5). New tables and functions only.
--
-- Separates, as the decision asks: personal subscriptions (the existing public.subscriptions, untouched), organisation
-- subscriptions (seats bought by an organisation), sponsored access (a seat given to one member), shared AI pools
-- (an organisation's allowance, optionally divided between its units) and usage records.
--
-- NOT YET WIRED, deliberately (docs/architecture/STAGE1-DEPENDENCIES.md): plan_of() still decides every learner's
-- plan from their own subscription, and AI requests still count only against personal allowances. effective_plan_of()
-- and the pools below are read by nothing that exists today, so no current learner's access or allowance can change.
-- Wiring each in is a separate, approved step with its own regression tests.
--
--   org_subscriptions  what an organisation has bought: a plan, a number of seats and dates. Gradify staff (service
--                      role) create and change these; billing integration comes later
--   org_seats          a seat given to one active member; the organisation's licence managers assign and revoke them
--   org_ai_pools       an organisation's monthly AI allowance per feature (set by Gradify staff for the whole
--                      organisation), and the share given to each unit (set by the organisation, never more in total
--                      than the organisation's own pool), with an optional cap per member
--   org_ai_usage       one row per AI use charged to a pool (written by the AI flow once it's wired; nothing writes
--                      it in Stage 1). Holds counts, never what anyone asked or was told (docs/AI-TUTOR.md)

create table public.org_subscriptions (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  plan text not null check (plan in ('plus', 'pro')),
  seats integer not null check (seats between 1 and 1000000),
  status text not null default 'active' check (status in ('active', 'paused', 'ended')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  source text not null default 'manual' check (source in ('manual', 'invoice', 'stripe')),
  external_ref text check (external_ref is null or length(external_ref) <= 200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);
create index org_subscriptions_org on public.org_subscriptions (org_id);

create table public.org_seats (
  subscription_id uuid not null references public.org_subscriptions (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  assigned_by uuid references auth.users (id) on delete set null,
  assigned_at timestamptz not null default now(),
  revoked_at timestamptz,
  primary key (subscription_id, user_id)
);
create index org_seats_user on public.org_seats (user_id) where revoked_at is null;

create table public.org_ai_pools (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organisations (id) on delete cascade,
  unit_id uuid,
  feature text not null check (feature in ('all', 'tutor', 'explain', 'pack', 'quiz')),
  monthly_allowance integer not null check (monthly_allowance between 0 and 10000000),
  per_member_cap integer check (per_member_cap is null or per_member_cap between 1 and 100000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (unit_id, org_id) references public.org_units (id, org_id) on delete cascade,
  unique nulls not distinct (org_id, unit_id, feature)
);

create table public.org_ai_usage (
  id bigint generated always as identity primary key,
  pool_id uuid not null references public.org_ai_pools (id) on delete cascade,
  org_id uuid not null,
  user_id uuid references auth.users (id) on delete set null,
  feature text not null check (feature in ('tutor', 'explain', 'pack', 'quiz')),
  units integer not null default 1 check (units between 1 and 1000),
  at timestamptz not null default now()
);
create index org_ai_usage_pool_time on public.org_ai_usage (pool_id, at desc);

alter table public.org_subscriptions enable row level security;
alter table public.org_seats enable row level security;
alter table public.org_ai_pools enable row level security;
alter table public.org_ai_usage enable row level security;
create policy "licences, for those who may see them" on public.org_subscriptions for select to authenticated using (public.has_perm('entitlements.read', org_id));
create policy "your seats, and seats licence managers may see" on public.org_seats for select to authenticated
  using (user_id = auth.uid() or public.has_perm('entitlements.read', (select s.org_id from public.org_subscriptions s where s.id = subscription_id)));
create policy "AI pools, for those who may see them" on public.org_ai_pools for select to authenticated using (public.has_perm('entitlements.read', org_id, unit_id));
create policy "AI pool use, for those who may see it" on public.org_ai_usage for select to authenticated using (public.has_perm('entitlements.read', org_id));
revoke all on table public.org_subscriptions from anon;
revoke all on table public.org_seats from anon;
revoke all on table public.org_ai_pools from anon;
revoke all on table public.org_ai_usage from anon;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_subscriptions from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_seats from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_ai_pools from authenticated;
revoke insert, update, delete, truncate, references, trigger, maintain on table public.org_ai_usage from authenticated;

-- the plan a person's seats give them: the best active seat, in an active subscription of an unarchived organisation
-- they're still an active member of. Null if none.
create function public.sponsored_plan_of(uid uuid) returns text language sql stable security definer set search_path = public as $$
  select case when bool_or(s.plan = 'pro') then 'pro' when bool_or(s.plan = 'plus') then 'plus' end
  from public.org_seats st
  join public.org_subscriptions s on s.id = st.subscription_id
  join public.organisations o on o.id = s.org_id
  where st.user_id = uid and st.revoked_at is null and s.status = 'active' and s.starts_at <= now()
    and (s.ends_at is null or s.ends_at > now()) and o.archived_at is null
    and exists (select 1 from public.org_members m where m.org_id = s.org_id and m.user_id = uid and m.status = 'active');
$$;
-- the better of a person's own plan and their sponsored one. Not yet used by any existing check (see the top).
create function public.effective_plan_of(uid uuid) returns text language sql stable security definer set search_path = public as $$
  select case when 'pro' in (p, s) then 'pro' when 'plus' in (p, s) then 'plus' else 'free' end
  from (select public.plan_of(uid) as p, public.sponsored_plan_of(uid) as s) x;
$$;
revoke all on function public.sponsored_plan_of(uuid) from public, anon, authenticated;
revoke all on function public.effective_plan_of(uuid) from public, anon, authenticated;
grant execute on function public.sponsored_plan_of(uuid) to service_role;
grant execute on function public.effective_plan_of(uuid) to service_role;

-- a person's own view: their plan, any sponsored seats (and which organisation gives them), and the result
create function public.my_entitlements() returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'personal', public.plan_of(auth.uid()),
    'sponsored', public.sponsored_plan_of(auth.uid()),
    'effective', public.effective_plan_of(auth.uid()),
    'wired', false,
    'seats', coalesce((select jsonb_agg(jsonb_build_object('organisation', o.name, 'plan', s.plan, 'until', s.ends_at) order by o.name)
      from public.org_seats st join public.org_subscriptions s on s.id = st.subscription_id join public.organisations o on o.id = s.org_id
      where st.user_id = auth.uid() and st.revoked_at is null and s.status = 'active' and o.archived_at is null), '[]'::jsonb));
$$;
revoke all on function public.my_entitlements() from public, anon;
grant execute on function public.my_entitlements() to authenticated;

-- give one active member a seat (idempotent), within the subscription's number of seats
create function public.assign_seat(p_subscription uuid, p_user uuid) returns jsonb language plpgsql volatile security definer set search_path = public as $$
declare s public.org_subscriptions; used int;
begin
  select * into s from public.org_subscriptions where id = p_subscription for update;
  perform public._must(s.id is not null and public.has_perm('entitlements.manage', s.org_id), 'You can''t manage these licences.');
  perform public._must(s.status = 'active' and (s.ends_at is null or s.ends_at > now()), 'This licence isn''t active.');
  perform public._must(exists (select 1 from public.org_members where org_id = s.org_id and user_id = p_user and status = 'active'), 'Seats can only go to active members of the organisation.');
  if exists (select 1 from public.org_seats where subscription_id = p_subscription and user_id = p_user and revoked_at is null) then
    return jsonb_build_object('ok', true, 'already', true);
  end if;
  select count(*) into used from public.org_seats where subscription_id = p_subscription and revoked_at is null;
  if used >= s.seats then return jsonb_build_object('ok', false, 'reason', 'no_seats', 'seats', s.seats); end if;
  insert into public.org_seats (subscription_id, user_id, assigned_by) values (p_subscription, p_user, auth.uid())
  on conflict (subscription_id, user_id) do update set revoked_at = null, assigned_by = excluded.assigned_by, assigned_at = now();
  perform public._audit('entitlements.seat_assigned', s.org_id, 'seat', p_user::text, jsonb_build_object('subscription', p_subscription, 'plan', s.plan));
  perform public._notify(p_user, 'org.seat_assigned', s.org_id, 'You have a Gradify ' || initcap(s.plan) || ' licence', 'Your organisation has given you a licence.', '#/org/' || s.org_id::text, 'org.seat_assigned:' || p_subscription::text || ':' || p_user::text);
  return jsonb_build_object('ok', true);
end $$;

create function public.revoke_seat(p_subscription uuid, p_user uuid) returns void language plpgsql volatile security definer set search_path = public as $$
declare o uuid := (select org_id from public.org_subscriptions where id = p_subscription);
begin
  perform public._must(o is not null and public.has_perm('entitlements.manage', o), 'You can''t manage these licences.');
  update public.org_seats set revoked_at = now() where subscription_id = p_subscription and user_id = p_user and revoked_at is null;
  perform public._audit('entitlements.seat_revoked', o, 'seat', p_user::text, jsonb_build_object('subscription', p_subscription));
end $$;

-- give a unit a share of the organisation's AI allowance for a feature. The organisation's own pool (no unit) is set
-- by Gradify staff; the units' shares can't add up to more than it.
create function public.allocate_ai_pool(p_org uuid, p_unit uuid, p_feature text, p_monthly integer, p_per_member_cap integer) returns uuid language plpgsql volatile security definer set search_path = public as $$
declare total int; shared int; pid uuid;
begin
  perform public._must(public.has_perm('entitlements.manage', p_org), 'You can''t manage AI allowances.');
  perform public._must(p_unit is not null, 'The organisation''s own AI allowance is set by Gradify. Choose a unit to give a share to.');
  select monthly_allowance into total from public.org_ai_pools where org_id = p_org and unit_id is null and feature = p_feature;
  perform public._must(total is not null, 'This organisation has no AI allowance for that feature yet.');
  select coalesce(sum(monthly_allowance), 0) into shared from public.org_ai_pools where org_id = p_org and unit_id is not null and feature = p_feature and unit_id <> p_unit;
  perform public._must(shared + p_monthly <= total, format('That''s more than is left to share: %s of %s.', total - shared, total));
  insert into public.org_ai_pools (org_id, unit_id, feature, monthly_allowance, per_member_cap) values (p_org, p_unit, p_feature, p_monthly, p_per_member_cap)
  on conflict (org_id, unit_id, feature) do update set monthly_allowance = excluded.monthly_allowance, per_member_cap = excluded.per_member_cap, updated_at = now()
  returning id into pid;
  perform public._audit('entitlements.ai_pool_allocated', p_org, 'ai_pool', pid::text, jsonb_build_object('unit', p_unit, 'feature', p_feature, 'monthly', p_monthly, 'per_member_cap', p_per_member_cap));
  return pid;
end $$;

-- an organisation's licences and AI pools, with this month's use, for its licence managers
create function public.org_entitlements(p_org uuid) returns jsonb language plpgsql stable security definer set search_path = public as $$
begin
  perform public._must(public.has_perm('entitlements.read', p_org), 'You can''t see these licences.');
  return jsonb_build_object(
    'subscriptions', coalesce((select jsonb_agg(jsonb_build_object('id', s.id, 'plan', s.plan, 'seats', s.seats, 'status', s.status, 'starts_at', s.starts_at, 'ends_at', s.ends_at,
      'used', (select count(*) from public.org_seats st where st.subscription_id = s.id and st.revoked_at is null)) order by s.starts_at) from public.org_subscriptions s where s.org_id = p_org), '[]'::jsonb),
    'ai_pools', coalesce((select jsonb_agg(jsonb_build_object('id', p.id, 'unit', p.unit_id, 'unit_name', (select name from public.org_units where id = p.unit_id), 'feature', p.feature,
      'monthly_allowance', p.monthly_allowance, 'per_member_cap', p.per_member_cap,
      'used_this_month', (select coalesce(sum(u.units), 0) from public.org_ai_usage u where u.pool_id = p.id and u.at >= date_trunc('month', now()))) order by p.unit_id nulls first, p.feature)
      from public.org_ai_pools p where p.org_id = p_org), '[]'::jsonb),
    'wired', false);
end $$;

revoke all on function public.assign_seat(uuid, uuid) from public, anon;
revoke all on function public.revoke_seat(uuid, uuid) from public, anon;
revoke all on function public.allocate_ai_pool(uuid, uuid, text, integer, integer) from public, anon;
revoke all on function public.org_entitlements(uuid) from public, anon;
grant execute on function public.assign_seat(uuid, uuid) to authenticated;
grant execute on function public.revoke_seat(uuid, uuid) to authenticated;
grant execute on function public.allocate_ai_pool(uuid, uuid, text, integer, integer) to authenticated;
grant execute on function public.org_entitlements(uuid) to authenticated;
