-- Gradify Pro billing and Gradify AI allowances.
--
-- Subscriptions: one row per learner who has ever subscribed, written only by the billing-webhook Edge Function (the
-- service role) from Stripe events. Learners can read their own row and nothing else; they can never write it.
-- billing_events: Stripe event ids already processed, so a redelivered webhook is applied once.
--
-- Gradify AI allowances per billing period (free: the calendar month; Pro: the current Stripe billing period):
--   feature   free   pro    what counts
--   tutor        5   150    a tutor message (mark, role-play, debrief, diagnose, socratic, challenge, connect, examiner, director)
--   explain      5   100    an explanation (explain) or a rewritten card (card)
--   pack         1    20    a study pack made from your notes (pack)
--   quiz         2    30    a generated question set (questions)
-- Allowances reset each period and don't accumulate. Limits live in ai_limits, so they can be changed without code.
--
-- Spending controls (ai_settings, one row): Gradify AI is OFF until the owner sets enabled = true, and stops for
-- everyone once this calendar month's estimated cost reaches monthly_budget_pence. Costs are estimated from the
-- tokens recorded for every request at the prices stored here.
--
-- ai_claim(mode) is the only way to use an allowance: the Edge Functions call it with the learner's own token
-- BEFORE calling Claude. It checks the switch, the budget and the allowance and records the use in one statement,
-- so two requests at once can't both take the last one. ai_settle(id, tokens) records the cost afterwards, or marks
-- a failed request so it doesn't count. A trigger stops learners inserting usage rows directly.
-- Run after 20261107120000_game_rewards.sql.

-- ---------- subscriptions ----------
create table public.subscriptions (
  user_id uuid primary key references auth.users (id) on delete cascade,
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  status text not null default 'none'
    check (status in ('none', 'incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused')),
  price_id text,
  billing_interval text check (billing_interval in ('month', 'year')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  updated_at timestamptz not null default now()
);
alter table public.subscriptions enable row level security;
create policy "own subscription: read" on public.subscriptions for select to authenticated using (user_id = auth.uid());
-- no insert, update or delete policy: only the service role (the billing webhook) writes subscriptions

create table public.billing_events (
  id text primary key,
  type text not null,
  received_at timestamptz not null default now()
);
alter table public.billing_events enable row level security;
-- no policies: only the service role reads or writes processed webhook ids

-- Pro while the subscription is active or trialing, and for three days past a failed renewal while Stripe retries
create or replace function public.is_pro(uid uuid default auth.uid()) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.subscriptions s
    where s.user_id = uid
      and (s.status in ('active', 'trialing') or (s.status = 'past_due' and s.current_period_end > now() - interval '3 days'))
      and coalesce(s.current_period_end, now() + interval '1 day') > now() - interval '3 days'
  );
$$;

-- ---------- allowances and spending controls ----------
create table public.ai_limits (
  feature text not null check (feature in ('tutor', 'explain', 'pack', 'quiz')),
  plan text not null check (plan in ('free', 'pro')),
  per_period integer not null check (per_period >= 0),
  primary key (feature, plan)
);
alter table public.ai_limits enable row level security;
create policy "allowances: anyone can read" on public.ai_limits for select to anon, authenticated using (true);
insert into public.ai_limits (feature, plan, per_period) values
  ('tutor', 'free', 5), ('tutor', 'pro', 150),
  ('explain', 'free', 5), ('explain', 'pro', 100),
  ('pack', 'free', 1), ('pack', 'pro', 20),
  ('quiz', 'free', 2), ('quiz', 'pro', 30);

create table public.ai_settings (
  id boolean primary key default true check (id),
  enabled boolean not null default false,
  monthly_budget_pence integer not null default 5000 check (monthly_budget_pence >= 0),
  input_pence_per_mtok numeric not null default 240,
  output_pence_per_mtok numeric not null default 1200,
  updated_at timestamptz not null default now()
);
alter table public.ai_settings enable row level security;
-- no policies: learners never see or change the switch or budget; the owner changes them in the SQL editor
insert into public.ai_settings (id) values (true);

-- the feature a usage mode counts against
create or replace function public.ai_feature(mode text) returns text
language sql immutable as $$
  select case
    when mode in ('mark', 'roleplay', 'debrief', 'diagnose', 'socratic', 'challenge', 'connect', 'examiner', 'director') then 'tutor'
    when mode in ('explain', 'card') then 'explain'
    when mode = 'pack' then 'pack'
    when mode = 'questions' then 'quiz'
  end;
$$;

-- usage rows gain a status: reserved before the call, ok after, failed if the call failed (failed rows don't count).
-- Existing rows default to ok. The feature is worked out from the mode (ai_feature) when counting, so no existing
-- row is rewritten.
alter table public.tutor_usage add column status text not null default 'ok' check (status in ('reserved', 'ok', 'failed'));
create index tutor_usage_time on public.tutor_usage (created_at);

-- usage rows can only be created through ai_claim: a learner inserting rows directly (the old "add" policy still
-- exists) could otherwise record fake token counts and run down everyone's monthly budget. The trigger refuses any
-- insert that ai_claim didn't make; the service role and the owner are unaffected.
create or replace function public.tutor_usage_guard() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if current_setting('gradify.ai_claim', true) = 'on' or current_user in ('postgres', 'service_role', 'supabase_admin') then
    return new;
  end if;
  raise exception 'Gradify AI usage is recorded by the server only';
end;
$$;
create trigger tutor_usage_guard before insert on public.tutor_usage for each row execute function public.tutor_usage_guard();

-- the learner's current allowance period
create or replace function public.ai_period(uid uuid default auth.uid())
returns table (plan text, period_start timestamptz, period_end timestamptz)
language sql stable security definer set search_path = public as $$
  select
    case when public.is_pro(uid) then 'pro' else 'free' end,
    case when public.is_pro(uid) then (select s.current_period_start from public.subscriptions s where s.user_id = uid) else date_trunc('month', now()) end,
    case when public.is_pro(uid) then (select s.current_period_end from public.subscriptions s where s.user_id = uid) else date_trunc('month', now()) + interval '1 month' end;
$$;

-- this month's estimated Gradify AI spend across everyone, in pence
create or replace function public.ai_month_spend_pence() returns numeric
language sql stable security definer set search_path = public as $$
  select coalesce(sum(coalesce(u.input_tokens, 0) * st.input_pence_per_mtok + coalesce(u.output_tokens, 0) * st.output_pence_per_mtok), 0) / 1000000
  from public.tutor_usage u, public.ai_settings st
  where u.created_at >= date_trunc('month', now()) and u.status <> 'failed';
$$;

-- what the learner has used and has left, for the account page and upgrade prompts
create or replace function public.my_ai_allowance()
returns table (feature text, plan text, used integer, allowance integer, period_end timestamptz, enabled boolean)
language sql stable security definer set search_path = public as $$
  with p as (select * from public.ai_period(auth.uid()))
  select l.feature, p.plan,
    (select count(*)::int from public.tutor_usage u where u.user_id = auth.uid() and public.ai_feature(u.mode) = l.feature and u.status <> 'failed' and u.created_at >= p.period_start),
    l.per_period, p.period_end, (select enabled from public.ai_settings)
  from public.ai_limits l, p where l.plan = p.plan and auth.uid() is not null
  order by 1;
$$;

-- claim one use of a feature before calling Claude. Returns the usage row id, or an error reason.
create or replace function public.ai_claim(p_mode text, p_site text default null)
returns table (usage_id bigint, reason text, plan text, used integer, allowance integer)
language plpgsql volatile security definer set search_path = public as $$
declare
  uid uuid := auth.uid();
  f text := public.ai_feature(p_mode);
  st public.ai_settings;
  per record;
  lim integer;
  n integer;
  new_id bigint;
begin
  if uid is null then return query select null::bigint, 'signed_out', null::text, 0, 0; return; end if;
  if f is null then return query select null::bigint, 'unknown_mode', null::text, 0, 0; return; end if;
  select * into st from public.ai_settings;
  if not coalesce(st.enabled, false) then return query select null::bigint, 'ai_off', null::text, 0, 0; return; end if;
  if public.ai_month_spend_pence() >= st.monthly_budget_pence then return query select null::bigint, 'budget', null::text, 0, 0; return; end if;
  select * into per from public.ai_period(uid);
  select l.per_period into lim from public.ai_limits l where l.feature = f and l.plan = per.plan;
  -- one claim at a time per learner, so two simultaneous requests can't both take the last use
  perform pg_advisory_xact_lock(hashtextextended(uid::text, 0));
  select count(*)::int into n from public.tutor_usage u
    where u.user_id = uid and public.ai_feature(u.mode) = f and u.status <> 'failed' and u.created_at >= per.period_start;
  if n >= coalesce(lim, 0) then return query select null::bigint, 'allowance', per.plan, n, coalesce(lim, 0); return; end if;
  perform set_config('gradify.ai_claim', 'on', true);
  insert into public.tutor_usage (user_id, mode, site, status) values (uid, p_mode, left(p_site, 40), 'reserved') returning id into new_id;
  perform set_config('gradify.ai_claim', 'off', true);
  return query select new_id, null::text, per.plan, n + 1, lim;
end;
$$;

-- record the outcome of a claimed request: its tokens, or that it failed (so it doesn't count)
create or replace function public.ai_settle(p_id bigint, p_input integer default null, p_output integer default null, p_failed boolean default false)
returns void language sql volatile security definer set search_path = public as $$
  update public.tutor_usage
     set status = case when p_failed then 'failed' else 'ok' end, input_tokens = p_input, output_tokens = p_output
   where id = p_id and user_id = auth.uid() and status = 'reserved';
$$;

-- functions are callable by nobody by default; learners get only the three they need. is_pro(uid) and ai_period(uid)
-- take any user id, so they're kept for the service role and for use inside these functions: a learner reads their
-- own plan through my_ai_allowance() and can't ask about anyone else's.
revoke all on function public.is_pro(uuid) from public, anon, authenticated;
revoke all on function public.ai_period(uuid) from public, anon, authenticated;
revoke all on function public.ai_month_spend_pence() from public, anon, authenticated;
revoke all on function public.ai_claim(text, text) from public, anon;
revoke all on function public.ai_settle(bigint, integer, integer, boolean) from public, anon;
revoke all on function public.my_ai_allowance() from public, anon;
grant execute on function public.ai_claim(text, text) to authenticated;
grant execute on function public.ai_settle(bigint, integer, integer, boolean) to authenticated;
grant execute on function public.my_ai_allowance() to authenticated;
grant execute on function public.is_pro(uuid) to service_role;
