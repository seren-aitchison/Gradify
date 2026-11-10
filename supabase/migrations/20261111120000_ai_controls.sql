-- Gradify AI launch controls: the usage ledger becomes server-only, every request is priced, and allowances,
-- conversations, rate limits, per-learner fair-use caps, daily and monthly spending caps, a response cache, testers
-- and an owner's monitoring view are added. Gradify AI stays off (ai_settings.enabled = false) until the owner turns it on.
--
-- Why the ledger moves to the server: a learner could call ai_settle() on their own request while the Edge Function
-- was still waiting for Claude, mark it failed, and so get the use back while the call still cost money. From here on
-- only the Edge Functions (service role) claim and settle uses; learners keep read-only my_ai_allowance().

-- ---------- prices (US dollars per million tokens, Anthropic's published rates) ----------
create table public.ai_prices (
  model text primary key,
  input_usd numeric not null,
  output_usd numeric not null,
  cache_read_usd numeric not null,
  cache_write_usd numeric not null,
  updated_at timestamptz not null default now()
);
alter table public.ai_prices enable row level security;
-- no policies: owner-only. 'default' prices any model not listed (a refusal fallback), deliberately high.
insert into public.ai_prices (model, input_usd, output_usd, cache_read_usd, cache_write_usd) values
  ('claude-opus-5-5', 4, 20, 0.20, 5),
  ('claude-sonnet-5-5', 2, 10, 0.10, 2.50),
  ('claude-haiku-5-5', 0.10, 0.50, 0.01, 0.125),
  ('default', 8, 40, 0.80, 10);

-- ---------- spending, rate and size settings (one row, owner-only) ----------
alter table public.ai_settings
  add column daily_budget_pence integer not null default 500 check (daily_budget_pence >= 0),
  add column per_minute integer not null default 6 check (per_minute >= 0),
  add column per_hour integer not null default 60 check (per_hour >= 0),
  add column global_per_minute integer not null default 120 check (global_per_minute >= 0),
  add column gbp_per_usd numeric not null default 0.79 check (gbp_per_usd > 0),
  add column stale_minutes integer not null default 10 check (stale_minutes > 0),
  add column cache_days integer not null default 30 check (cache_days >= 0);

-- per plan: a monthly fair-use cap on what one learner's Gradify AI may cost, and how long a tutor conversation runs.
-- The caps keep any one learner's cost below what a Pro subscription brings in (docs/AI-COSTS.md); the owner tunes them.
create table public.ai_plan_caps (
  plan text primary key check (plan in ('free', 'pro')),
  monthly_pence numeric not null check (monthly_pence >= 0),
  conversation_turns integer not null check (conversation_turns > 0),
  pack_chars integer not null check (pack_chars > 0)
);
alter table public.ai_plan_caps enable row level security;
create policy "plan caps: anyone can read" on public.ai_plan_caps for select to anon, authenticated using (true);
insert into public.ai_plan_caps (plan, monthly_pence, conversation_turns, pack_chars) values
  ('free', 100, 12, 40000),
  ('pro', 400, 30, 120000);

-- learners who may use Gradify AI while it is off for everyone else (the owner's own testing), and the owners
create table public.ai_testers (
  user_id uuid primary key references auth.users (id) on delete cascade,
  added_at timestamptz not null default now()
);
alter table public.ai_testers enable row level security;
create table public.ai_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  added_at timestamptz not null default now()
);
alter table public.ai_admins enable row level security;
-- a learner can see only whether they themselves are listed; only the owner adds rows (SQL editor, docs/AI.md)
create policy "own tester row: read" on public.ai_testers for select to authenticated using (user_id = auth.uid());
create policy "own admin row: read" on public.ai_admins for select to authenticated using (user_id = auth.uid());

-- answers that don't depend on who asked (an explanation of a lesson's own notes, links between lessons), so the
-- same question on the same version of a lesson isn't paid for twice. No learner data: the key is a hash.
create table public.ai_cache (
  key text primary key,
  mode text not null,
  reply jsonb not null,
  model text,
  hits integer not null default 0,
  created_at timestamptz not null default now(),
  last_hit_at timestamptz
);
alter table public.ai_cache enable row level security;

-- ---------- the usage ledger ----------
alter table public.tutor_usage
  drop constraint tutor_usage_status_check,
  add constraint tutor_usage_status_check check (status in ('reserved', 'ok', 'failed', 'cached')),
  add column counted boolean not null default true,
  add column conversation_id uuid,
  add column model text,
  add column cache_read_tokens integer,
  add column cache_write_tokens integer,
  add column cost_pence numeric,
  add column est_pence numeric,
  add column error text,
  add column settled_at timestamptz;
create index tutor_usage_conversation on public.tutor_usage (user_id, conversation_id, created_at);

-- a stored pack remembers which notes it came from, so the same notes are never sent to Claude twice
alter table public.packs add column notes_sha256 text;
create index packs_notes on public.packs (user_id, notes_sha256);

-- what a request costs, in pence
create or replace function public.ai_cost_pence(p_model text, p_input integer, p_output integer, p_cache_read integer default 0, p_cache_write integer default 0)
returns numeric language sql stable security definer set search_path = public as $$
  select round((coalesce(p_input, 0) * pr.input_usd + coalesce(p_output, 0) * pr.output_usd
              + coalesce(p_cache_read, 0) * pr.cache_read_usd + coalesce(p_cache_write, 0) * pr.cache_write_usd)
              / 1000000 * st.gbp_per_usd * 100, 4)
  from public.ai_settings st,
       lateral (select * from public.ai_prices where model = coalesce((select model from public.ai_prices where model = p_model), 'default')) pr;
$$;

-- what a row costs for spending caps: its real cost once settled, its worst-case estimate while in flight
create or replace function public.ai_row_pence(p_status text, p_cost numeric, p_est numeric)
returns numeric language sql immutable as $$
  select case when p_status = 'reserved' then coalesce(p_est, 0) else coalesce(p_cost, 0) end;
$$;

-- everyone's Gradify AI spend this calendar month, in pence (failed calls cost money too, so they count)
create or replace function public.ai_month_spend_pence() returns numeric
language sql stable security definer set search_path = public as $$
  select coalesce(sum(public.ai_row_pence(u.status, u.cost_pence, u.est_pence)), 0)
  from public.tutor_usage u where u.created_at >= date_trunc('month', now());
$$;
create or replace function public.ai_day_spend_pence() returns numeric
language sql stable security definer set search_path = public as $$
  select coalesce(sum(public.ai_row_pence(u.status, u.cost_pence, u.est_pence)), 0)
  from public.tutor_usage u where u.created_at >= date_trunc('day', now());
$$;
create or replace function public.ai_user_month_spend_pence(uid uuid) returns numeric
language sql stable security definer set search_path = public as $$
  select coalesce(sum(public.ai_row_pence(u.status, u.cost_pence, u.est_pence)), 0)
  from public.tutor_usage u where u.user_id = uid and u.created_at >= date_trunc('month', now());
$$;

-- uses of a feature that count against the allowance: counted rows that succeeded, or are still in flight
-- (a reservation older than stale_minutes means the function died: the learner got nothing, so it doesn't count)
create or replace function public.ai_used(uid uuid, f text, since timestamptz) returns integer
language sql stable security definer set search_path = public as $$
  select count(*)::int from public.tutor_usage u, public.ai_settings st
  where u.user_id = uid and public.ai_feature(u.mode) = f and u.counted and u.created_at >= since
    and (u.status = 'ok' or (u.status = 'reserved' and u.created_at > now() - make_interval(mins => st.stale_minutes)));
$$;

-- whether Gradify AI is on for this learner: on for everyone, or they're a tester
create or replace function public.ai_on_for(uid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select enabled from public.ai_settings), false) or exists (select 1 from public.ai_testers t where t.user_id = uid);
$$;

-- Claim one request before calling Claude. Server only (the Edge Functions, as the service role).
-- p_conversation: tutor turns in the same conversation (same mode, within a day) share the first turn's use.
-- p_est_input / p_max_output: the request's size, to reserve its worst-case cost against the spending caps.
-- Reasons: signed_out, unknown_mode, ai_off, budget, rate, busy, fair_use, conversation_long, allowance.
create or replace function public.ai_claim_for(p_uid uuid, p_mode text, p_site text default null, p_conversation uuid default null, p_est_input integer default 0, p_max_output integer default 0)
returns table (usage_id bigint, reason text, plan text, used integer, allowance integer, period_end timestamptz, counted boolean)
language plpgsql volatile security definer set search_path = public as $$
declare
  f text := public.ai_feature(p_mode);
  st public.ai_settings;
  per record;
  caps public.ai_plan_caps;
  lim integer;
  n integer;
  est numeric;
  turns integer;
  is_counted boolean := true;
  new_id bigint;
begin
  if p_uid is null then return query select null::bigint, 'signed_out', null::text, 0, 0, null::timestamptz, false; return; end if;
  if f is null then return query select null::bigint, 'unknown_mode', null::text, 0, 0, null::timestamptz, false; return; end if;
  select * into st from public.ai_settings;
  if not public.ai_on_for(p_uid) then return query select null::bigint, 'ai_off', null::text, 0, 0, null::timestamptz, false; return; end if;
  select * into per from public.ai_period(p_uid);
  select * into caps from public.ai_plan_caps c where c.plan = per.plan;
  select l.per_period into lim from public.ai_limits l where l.feature = f and l.plan = per.plan;
  -- every learner's claims run one at a time, so two simultaneous requests can't both take the last use;
  -- and a global lock for the spending check, so a burst from many learners can't overshoot the budget
  perform pg_advisory_xact_lock(hashtextextended(p_uid::text, 0));
  perform pg_advisory_xact_lock(hashtextextended('gradify.ai.budget', 0));
  est := public.ai_cost_pence('claude-opus-5-5', p_est_input, p_max_output);
  if public.ai_month_spend_pence() + est > st.monthly_budget_pence or public.ai_day_spend_pence() + est > st.daily_budget_pence then
    return query select null::bigint, 'budget', per.plan, 0, coalesce(lim, 0), per.period_end, false; return;
  end if;
  if (select count(*) from public.tutor_usage u where u.user_id = p_uid and u.created_at > now() - interval '1 minute') >= st.per_minute
     or (select count(*) from public.tutor_usage u where u.user_id = p_uid and u.created_at > now() - interval '1 hour') >= st.per_hour then
    return query select null::bigint, 'rate', per.plan, 0, coalesce(lim, 0), per.period_end, false; return;
  end if;
  if (select count(*) from public.tutor_usage u where u.created_at > now() - interval '1 minute') >= st.global_per_minute then
    return query select null::bigint, 'busy', per.plan, 0, coalesce(lim, 0), per.period_end, false; return;
  end if;
  n := public.ai_used(p_uid, f, per.period_start);
  -- a later turn of a conversation whose first turn was counted (and didn't fail) uses no further allowance
  if p_conversation is not null and exists (
    select 1 from public.tutor_usage u where u.user_id = p_uid and u.conversation_id = p_conversation and u.mode = p_mode
      and u.counted and u.status in ('ok', 'reserved') and u.created_at > now() - interval '1 day') then
    select count(*)::int into turns from public.tutor_usage u
      where u.user_id = p_uid and u.conversation_id = p_conversation and u.status <> 'failed' and u.created_at > now() - interval '1 day';
    if turns >= caps.conversation_turns then
      return query select null::bigint, 'conversation_long', per.plan, n, coalesce(lim, 0), per.period_end, false; return;
    end if;
    is_counted := false;
  elsif n >= coalesce(lim, 0) then
    return query select null::bigint, 'allowance', per.plan, n, coalesce(lim, 0), per.period_end, false; return;
  end if;
  -- the learner's fair-use cap: what their requests have cost this month (in-flight ones at their worst case)
  if public.ai_user_month_spend_pence(p_uid) >= caps.monthly_pence then
    return query select null::bigint, 'fair_use', per.plan, n, coalesce(lim, 0), per.period_end, false; return;
  end if;
  perform set_config('gradify.ai_claim', 'on', true);
  insert into public.tutor_usage (user_id, mode, site, status, counted, conversation_id, est_pence)
    values (p_uid, p_mode, left(p_site, 40), 'reserved', is_counted, p_conversation, est) returning id into new_id;
  perform set_config('gradify.ai_claim', 'off', true);
  return query select new_id, null::text, per.plan, n + (case when is_counted then 1 else 0 end), coalesce(lim, 0), per.period_end, is_counted;
end;
$$;

-- Record how a claimed request went. Server only. Failed requests keep their tokens and cost (they were billed)
-- but give the use back; cached answers cost nothing and give the use back too.
create or replace function public.ai_settle_for(p_id bigint, p_uid uuid, p_model text default null, p_input integer default null, p_output integer default null, p_cache_read integer default null, p_cache_write integer default null, p_outcome text default 'ok', p_error text default null)
returns numeric language plpgsql volatile security definer set search_path = public as $$
declare cost numeric;
begin
  if p_outcome not in ('ok', 'failed', 'cached') then raise exception 'outcome must be ok, failed or cached'; end if;
  cost := case when p_outcome = 'cached' then 0 else public.ai_cost_pence(p_model, p_input, p_output, p_cache_read, p_cache_write) end;
  update public.tutor_usage
     set status = p_outcome, counted = counted and p_outcome = 'ok', model = p_model, input_tokens = p_input, output_tokens = p_output,
         cache_read_tokens = p_cache_read, cache_write_tokens = p_cache_write, cost_pence = cost, error = left(p_error, 200), settled_at = now()
   where id = p_id and user_id = p_uid and status = 'reserved';
  return cost;
end;
$$;

-- the response cache (server only)
create or replace function public.ai_cache_get(p_key text) returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare r jsonb;
begin
  update public.ai_cache c set hits = c.hits + 1, last_hit_at = now()
   where c.key = p_key and c.created_at > now() - make_interval(days => (select cache_days from public.ai_settings))
  returning c.reply into r;
  return r;
end;
$$;
create or replace function public.ai_cache_put(p_key text, p_mode text, p_reply jsonb, p_model text) returns void
language sql volatile security definer set search_path = public as $$
  insert into public.ai_cache (key, mode, reply, model) values (p_key, p_mode, p_reply, p_model)
  on conflict (key) do update set reply = excluded.reply, model = excluded.model, created_at = now();
$$;

-- what the learner has used and has left, for the Account page, the app and upgrade prompts (same columns as before)
create or replace function public.my_ai_allowance()
returns table (feature text, plan text, used integer, allowance integer, period_end timestamptz, enabled boolean)
language sql stable security definer set search_path = public as $$
  with p as (select * from public.ai_period(auth.uid()))
  select l.feature, p.plan, public.ai_used(auth.uid(), l.feature, p.period_start), l.per_period, p.period_end, public.ai_on_for(auth.uid())
  from public.ai_limits l, p where l.plan = p.plan and auth.uid() is not null
  order by 1;
$$;

-- ---------- the owner's view ----------
create or replace function public.ai_is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.ai_admins a where a.user_id = auth.uid());
$$;

-- Everything the owner needs to watch cost and use, as one JSON object. Learners appear by the first 8 characters
-- of their id, never by email. ai_usage_overview() is for the database owner only (scripts/ai-usage.mjs);
-- ai_admin_overview() is the same for a signed-in owner listed in ai_admins (ai-usage.html). Learners get an error.
create or replace function public.ai_usage_overview() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  st public.ai_settings;
  month_start timestamptz := date_trunc('month', now());
begin
  select * into st from public.ai_settings;
  return jsonb_build_object(
    'generated_at', now(),
    'settings', jsonb_build_object('enabled', st.enabled, 'testers', (select count(*) from public.ai_testers),
      'monthly_budget_pence', st.monthly_budget_pence, 'daily_budget_pence', st.daily_budget_pence,
      'per_minute', st.per_minute, 'per_hour', st.per_hour, 'global_per_minute', st.global_per_minute, 'gbp_per_usd', st.gbp_per_usd),
    'plan_caps', (select jsonb_agg(to_jsonb(c) order by c.plan) from public.ai_plan_caps c),
    'month', jsonb_build_object('spend_pence', public.ai_month_spend_pence(), 'today_pence', public.ai_day_spend_pence(),
      'requests', (select count(*) from public.tutor_usage u where u.created_at >= month_start),
      'learners', (select count(distinct u.user_id) from public.tutor_usage u where u.created_at >= month_start),
      'in_flight', (select count(*) from public.tutor_usage u, public.ai_settings s where u.status = 'reserved' and u.created_at > now() - make_interval(mins => s.stale_minutes)),
      'stale', (select count(*) from public.tutor_usage u, public.ai_settings s where u.status = 'reserved' and u.created_at <= now() - make_interval(mins => s.stale_minutes) and u.created_at >= month_start)),
    'by_feature', (select coalesce(jsonb_agg(x order by x->>'feature', x->>'plan'), '[]'::jsonb) from (
      select jsonb_build_object('feature', public.ai_feature(u.mode), 'plan', case when public.is_pro(u.user_id) then 'pro' else 'free' end,
        'requests', count(*), 'counted', count(*) filter (where u.counted and u.status = 'ok'),
        'failed', count(*) filter (where u.status = 'failed'), 'cached', count(*) filter (where u.status = 'cached'),
        'input_tokens', coalesce(sum(u.input_tokens), 0), 'output_tokens', coalesce(sum(u.output_tokens), 0),
        'cache_read_tokens', coalesce(sum(u.cache_read_tokens), 0), 'cache_write_tokens', coalesce(sum(u.cache_write_tokens), 0),
        'cost_pence', round(coalesce(sum(public.ai_row_pence(u.status, u.cost_pence, u.est_pence)), 0), 2),
        'avg_pence', round(coalesce(avg(u.cost_pence) filter (where u.status in ('ok', 'failed')), 0), 3)) x
      from public.tutor_usage u where u.created_at >= month_start group by public.ai_feature(u.mode), case when public.is_pro(u.user_id) then 'pro' else 'free' end) g),
    'by_day', (select coalesce(jsonb_agg(x order by x->>'day'), '[]'::jsonb) from (
      select jsonb_build_object('day', to_char(date_trunc('day', u.created_at), 'YYYY-MM-DD'), 'requests', count(*),
        'cost_pence', round(coalesce(sum(public.ai_row_pence(u.status, u.cost_pence, u.est_pence)), 0), 2)) x
      from public.tutor_usage u where u.created_at >= now() - interval '30 days' group by date_trunc('day', u.created_at)) d),
    'top_learners', (select coalesce(jsonb_agg(x order by (x->>'cost_pence')::numeric desc), '[]'::jsonb) from (
      select jsonb_build_object('learner', left(u.user_id::text, 8), 'plan', case when public.is_pro(u.user_id) then 'pro' else 'free' end,
        'requests', count(*), 'cost_pence', round(coalesce(sum(public.ai_row_pence(u.status, u.cost_pence, u.est_pence)), 0), 2),
        'cap_pence', (select c.monthly_pence from public.ai_plan_caps c where c.plan = case when public.is_pro(u.user_id) then 'pro' else 'free' end)) x
      from public.tutor_usage u where u.created_at >= month_start group by u.user_id
      order by sum(public.ai_row_pence(u.status, u.cost_pence, u.est_pence)) desc nulls last limit 20) t),
    'cache', jsonb_build_object('entries', (select count(*) from public.ai_cache), 'hits', (select coalesce(sum(hits), 0) from public.ai_cache)),
    'recent_errors', (select coalesce(jsonb_agg(x), '[]'::jsonb) from (
      select jsonb_build_object('at', u.created_at, 'mode', u.mode, 'error', u.error) x from public.tutor_usage u
      where u.status = 'failed' and u.created_at >= now() - interval '7 days' order by u.created_at desc limit 20) e)
  );
end;
$$;
create or replace function public.ai_admin_overview() returns jsonb
language plpgsql stable security definer set search_path = public as $$
begin
  if not public.ai_is_admin() then raise exception 'Only Gradify owners can see AI usage' using errcode = '42501'; end if;
  return public.ai_usage_overview();
end;
$$;

-- ---------- who may call what ----------
-- learners can no longer claim or settle uses themselves
revoke all on function public.ai_claim(text, text) from public, anon, authenticated;
revoke all on function public.ai_settle(bigint, integer, integer, boolean) from public, anon, authenticated;
revoke all on function public.ai_claim_for(uuid, text, text, uuid, integer, integer) from public, anon, authenticated;
revoke all on function public.ai_settle_for(bigint, uuid, text, integer, integer, integer, integer, text, text) from public, anon, authenticated;
revoke all on function public.ai_cache_get(text) from public, anon, authenticated;
revoke all on function public.ai_cache_put(text, text, jsonb, text) from public, anon, authenticated;
revoke all on function public.ai_cost_pence(text, integer, integer, integer, integer) from public, anon, authenticated;
revoke all on function public.ai_day_spend_pence() from public, anon, authenticated;
revoke all on function public.ai_user_month_spend_pence(uuid) from public, anon, authenticated;
revoke all on function public.ai_used(uuid, text, timestamptz) from public, anon, authenticated;
revoke all on function public.ai_on_for(uuid) from public, anon, authenticated;
grant execute on function public.ai_claim_for(uuid, text, text, uuid, integer, integer) to service_role;
grant execute on function public.ai_settle_for(bigint, uuid, text, integer, integer, integer, integer, text, text) to service_role;
grant execute on function public.ai_cache_get(text) to service_role;
grant execute on function public.ai_cache_put(text, text, jsonb, text) to service_role;
revoke all on function public.ai_is_admin() from public, anon;
revoke all on function public.ai_usage_overview() from public, anon, authenticated, service_role;
revoke all on function public.ai_admin_overview() from public, anon;
grant execute on function public.ai_is_admin() to authenticated;
grant execute on function public.ai_admin_overview() to authenticated;
