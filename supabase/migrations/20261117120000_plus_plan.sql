-- Three plans: Free, Gradify Plus (£10 a month) and Gradify Pro (£15 a month: Plus and Gradify AI).
--
-- 1. subscriptions.plan: which paid plan a subscription is ('plus' or 'pro'), set by the billing webhook from the Stripe
--    price. A paid-up row from before this migration, with no plan, was Gradify Pro.
-- 2. plan_of(uid) → 'free' | 'plus' | 'pro', with the same paid-up rule is_pro() always used (active or trialing, or
--    past due for up to 3 days). is_pro() now means the Pro plan only, so Gradify AI's Pro allowances stay Pro's.
-- 3. One switch, plans_enforced, off by default. While it's off, Plus is enforced nowhere: Free learners keep every
--    feature they have today. The owner turns it on when Plus goes on sale (docs/BILLING.md).
-- 4. Free learners study on one active device. Their data stays in their account and readable everywhere; writes are
--    accepted from the active device only (the app sends its device id in the x-gradify-device header). They can move
--    the active device themselves, once every 7 days. Plus and Pro learners write from any device.

alter table public.subscriptions add column plan text check (plan in ('plus', 'pro'));

create table public.billing_settings (
  id boolean primary key default true check (id),
  plans_enforced boolean not null default false,
  device_switch_days integer not null default 7 check (device_switch_days between 0 and 90)
);
insert into public.billing_settings (id) values (true);
alter table public.billing_settings enable row level security;
create policy "anyone: read" on public.billing_settings for select using (true);
revoke insert, update, delete on table public.billing_settings from anon, authenticated;

create or replace function public.plans_enforced() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select plans_enforced from public.billing_settings), false);
$$;

create or replace function public.plan_of(uid uuid default auth.uid()) returns text
language sql stable security definer set search_path = public as $$
  select coalesce((
    select coalesce(s.plan, 'pro') from public.subscriptions s
    where s.user_id = uid
      and (s.status in ('active', 'trialing') or (s.status = 'past_due' and s.current_period_end > now() - interval '3 days'))
      and coalesce(s.current_period_end, now() + interval '1 day') > now() - interval '3 days'
  ), 'free');
$$;

create or replace function public.is_pro(uid uuid default auth.uid()) returns boolean
language sql stable security definer set search_path = public as $$
  select public.plan_of(uid) = 'pro';
$$;

-- Plus features (sync on every device, calendar and reminders, Gradify Intelligence, exam tools): Plus or Pro, or
-- everyone while plans aren't enforced
-- plus_allowed_for(uid) is for the server only; learners can ask about themselves alone (plus_allowed())
create or replace function public.plus_allowed_for(uid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select not public.plans_enforced() or public.plan_of(uid) in ('plus', 'pro');
$$;
create or replace function public.plus_allowed() returns boolean
language sql stable security definer set search_path = public as $$
  select public.plus_allowed_for(auth.uid());
$$;

-- ---------- one active device for Free ----------
create table public.study_devices (
  user_id uuid primary key references auth.users (id) on delete cascade,
  device_id text not null check (length(device_id) between 8 and 64),
  since timestamptz not null default now()
);
alter table public.study_devices enable row level security;
create policy "own device: read" on public.study_devices for select to authenticated using (user_id = auth.uid());
revoke insert, update, delete on table public.study_devices from anon, authenticated;

-- the device id the request came from (PostgREST passes request headers to Postgres as JSON)
create or replace function public.request_device() returns text
language sql stable as $$
  select nullif(coalesce(current_setting('request.headers', true), '{}')::json ->> 'x-gradify-device', '');
$$;

-- May this request change the learner's data? Plus and Pro: yes. Free: from the active device, or from any device
-- before one has been chosen. Reading is never limited.
create or replace function public.may_write() returns boolean
language sql stable security definer set search_path = public as $$
  select public.plus_allowed_for(auth.uid())
    or not exists (select 1 from public.study_devices d where d.user_id = auth.uid())
    or exists (select 1 from public.study_devices d where d.user_id = auth.uid() and d.device_id = public.request_device());
$$;

-- Called by the app when it opens. A Free learner's first device becomes the active one. Says where things stand.
create or replace function public.use_device(p_device text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); d public.study_devices; plan text; wait int;
begin
  if uid is null then return jsonb_build_object('reason', 'signed_out'); end if;
  if p_device is null or length(p_device) not between 8 and 64 then return jsonb_build_object('reason', 'bad_device'); end if;
  plan := public.plan_of(uid);
  if public.plus_allowed_for(uid) then
    return jsonb_build_object('plan', plan, 'enforced', public.plans_enforced(), 'active', true, 'anyDevice', true);
  end if;
  insert into public.study_devices (user_id, device_id) values (uid, p_device) on conflict (user_id) do nothing;
  select * into d from public.study_devices where user_id = uid;
  select device_switch_days into wait from public.billing_settings;
  return jsonb_build_object('plan', plan, 'enforced', true, 'active', d.device_id = p_device, 'anyDevice', false,
    'since', d.since, 'canSwitchAt', d.since + make_interval(days => wait));
end $$;

-- A Free learner makes this device the active one: allowed once every device_switch_days (7 by default).
create or replace function public.switch_device(p_device text) returns jsonb
language plpgsql security definer set search_path = public as $$
declare uid uuid := auth.uid(); d public.study_devices; wait int;
begin
  if uid is null then return jsonb_build_object('reason', 'signed_out'); end if;
  if p_device is null or length(p_device) not between 8 and 64 then return jsonb_build_object('reason', 'bad_device'); end if;
  if public.plus_allowed_for(uid) then return jsonb_build_object('active', true, 'anyDevice', true); end if;
  select device_switch_days into wait from public.billing_settings;
  select * into d from public.study_devices where user_id = uid for update;
  if found and d.device_id <> p_device and d.since > now() - make_interval(days => wait) then
    return jsonb_build_object('reason', 'too_soon', 'active', false, 'canSwitchAt', d.since + make_interval(days => wait));
  end if;
  insert into public.study_devices (user_id, device_id, since) values (uid, p_device, now())
    on conflict (user_id) do update set device_id = excluded.device_id, since = case when public.study_devices.device_id = excluded.device_id then public.study_devices.since else now() end;
  select * into d from public.study_devices where user_id = uid;
  return jsonb_build_object('active', true, 'anyDevice', false, 'since', d.since, 'canSwitchAt', d.since + make_interval(days => wait));
end $$;

-- The learner's plan, for the app (the same answer the server enforces)
create or replace function public.my_plan() returns jsonb
language sql stable security definer set search_path = public as $$
  select jsonb_build_object('plan', public.plan_of(auth.uid()), 'enforced', public.plans_enforced(), 'plus', public.plus_allowed());
$$;

-- Restrictive policies: on top of each table's own policies (which already limit learners to their own rows), changes
-- must come from a device that may write. packs (written by the study-pack server function), profiles (settings) and
-- push_subscriptions (each device's own) are left out.
create policy "active device: add" on public.documents as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.documents as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.documents as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.cards as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.cards as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.cards as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.reviews as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.reviews as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.reviews as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.activity as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.activity as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.activity as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.plan_blocks as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.plan_blocks as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.plan_blocks as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.goals as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.goals as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.goals as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.learning_events as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.learning_events as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.learning_events as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.course_progress as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.course_progress as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.course_progress as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.assessment_attempts as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.assessment_attempts as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.assessment_attempts as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.revalidation_entries as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.revalidation_entries as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.revalidation_entries as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.workouts as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.workouts as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.workouts as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.fitness_tests as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.fitness_tests as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.fitness_tests as restrictive for delete to authenticated using (public.may_write());
create policy "active device: add" on public.body_checkins as restrictive for insert to authenticated with check (public.may_write());
create policy "active device: change" on public.body_checkins as restrictive for update to authenticated using (public.may_write());
create policy "active device: remove" on public.body_checkins as restrictive for delete to authenticated using (public.may_write());

revoke all on function public.plans_enforced() from public, anon;
revoke all on function public.plan_of(uuid) from public, anon, authenticated;
revoke all on function public.is_pro(uuid) from public, anon, authenticated;
revoke all on function public.plus_allowed_for(uuid) from public, anon, authenticated;
revoke all on function public.plus_allowed() from public, anon;
revoke all on function public.may_write() from public, anon;
revoke all on function public.use_device(text) from public, anon;
revoke all on function public.switch_device(text) from public, anon;
revoke all on function public.my_plan() from public, anon;
grant execute on function public.plans_enforced() to authenticated, service_role;
grant execute on function public.plan_of(uuid) to service_role;
grant execute on function public.is_pro(uuid) to service_role;
grant execute on function public.plus_allowed_for(uuid) to service_role;
grant execute on function public.plus_allowed() to authenticated;
grant execute on function public.may_write() to authenticated;
grant execute on function public.use_device(text) to authenticated;
grant execute on function public.switch_device(text) to authenticated;
grant execute on function public.my_plan() to authenticated;
