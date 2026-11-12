-- The fair-use cap counts the request being claimed.
--
-- Before: ai_claim_for refused a learner only once their spend this month had already reached their plan's cap
-- (ai_plan_caps.monthly_pence), so a learner just under it could start one more request and pass the cap by up to that
-- request's worst-case cost (a study pack: roughly 20p to 40p). Now the request's worst-case estimate must fit under the
-- cap as well, the same rule the overall monthly and daily budgets already use.
--
-- Concurrency is unchanged and already safe: claims hold a per-learner and a global advisory lock, and a claimed request
-- is recorded at once as 'reserved' at its worst-case estimate, so a second request sees the first one's reservation.
--
-- What the cap still can't guarantee: the estimate is an upper bound only as far as its inputs are. Output is capped by
-- max_tokens, but input tokens are estimated from characters (and PDFs from their size), and cache writes cost more per
-- token than plain input. If a request really costs more than its estimate, its real cost is recorded and counts, and
-- the learner's next request is refused.
--
-- Only ai_claim_for changes; it is redefined whole, with the same signature, so its grants are kept.
-- Run after 20261113120000_client_privileges.sql.

create or replace function public.ai_claim_for(p_uid uuid, p_mode text, p_site text default null, p_conversation uuid default null, p_est_input integer default 0, p_max_output integer default 0)
returns table (usage_id bigint, reason text, plan text, used integer, allowance integer, period_end timestamptz, counted boolean, model text)
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
  m text;
begin
  if p_uid is null then return query select null::bigint, 'signed_out', null::text, 0, 0, null::timestamptz, false, null::text; return; end if;
  if f is null then return query select null::bigint, 'unknown_mode', null::text, 0, 0, null::timestamptz, false, null::text; return; end if;
  select * into st from public.ai_settings;
  if not public.ai_on_for(p_uid) then return query select null::bigint, 'ai_off', null::text, 0, 0, null::timestamptz, false, null::text; return; end if;
  select * into per from public.ai_period(p_uid);
  select * into caps from public.ai_plan_caps c where c.plan = per.plan;
  select l.per_period into lim from public.ai_limits l where l.feature = f and l.plan = per.plan;
  -- every learner's claims run one at a time, so two simultaneous requests can't both take the last use;
  -- and a global lock for the spending check, so a burst from many learners can't overshoot the budget
  perform pg_advisory_xact_lock(hashtextextended(p_uid::text, 0));
  perform pg_advisory_xact_lock(hashtextextended('gradify.ai.budget', 0));
  m := coalesce((select fm.model from public.ai_feature_models fm where fm.feature = f), 'claude-opus-5-5');
  est := public.ai_cost_pence(m, p_est_input, p_max_output);
  if public.ai_month_spend_pence() + est > st.monthly_budget_pence or public.ai_day_spend_pence() + est > st.daily_budget_pence then
    return query select null::bigint, 'budget', per.plan, 0, coalesce(lim, 0), per.period_end, false, null::text; return;
  end if;
  if (select count(*) from public.tutor_usage u where u.user_id = p_uid and u.created_at > now() - interval '1 minute') >= st.per_minute
     or (select count(*) from public.tutor_usage u where u.user_id = p_uid and u.created_at > now() - interval '1 hour') >= st.per_hour then
    return query select null::bigint, 'rate', per.plan, 0, coalesce(lim, 0), per.period_end, false, null::text; return;
  end if;
  if (select count(*) from public.tutor_usage u where u.created_at > now() - interval '1 minute') >= st.global_per_minute then
    return query select null::bigint, 'busy', per.plan, 0, coalesce(lim, 0), per.period_end, false, null::text; return;
  end if;
  n := public.ai_used(p_uid, f, per.period_start);
  -- a later turn of a conversation whose first turn was counted (and didn't fail) uses no further allowance
  if p_conversation is not null and exists (
    select 1 from public.tutor_usage u where u.user_id = p_uid and u.conversation_id = p_conversation and u.mode = p_mode
      and u.counted and u.status in ('ok', 'reserved') and u.created_at > now() - interval '1 day') then
    select count(*)::int into turns from public.tutor_usage u
      where u.user_id = p_uid and u.conversation_id = p_conversation and u.status <> 'failed' and u.created_at > now() - interval '1 day';
    if turns >= caps.conversation_turns then
      return query select null::bigint, 'conversation_long', per.plan, n, coalesce(lim, 0), per.period_end, false, null::text; return;
    end if;
    is_counted := false;
  elsif n >= coalesce(lim, 0) then
    return query select null::bigint, 'allowance', per.plan, n, coalesce(lim, 0), per.period_end, false, null::text; return;
  end if;
  -- the learner's fair-use cap: what their requests have cost this month (in-flight ones at their worst case) plus
  -- this request's worst case must fit, so the cap can't be passed by starting one more request just under it
  if public.ai_user_month_spend_pence(p_uid) + est > caps.monthly_pence then
    return query select null::bigint, 'fair_use', per.plan, n, coalesce(lim, 0), per.period_end, false, null::text; return;
  end if;
  perform set_config('gradify.ai_claim', 'on', true);
  insert into public.tutor_usage (user_id, mode, site, status, counted, conversation_id, est_pence)
    values (p_uid, p_mode, left(p_site, 40), 'reserved', is_counted, p_conversation, est) returning id into new_id;
  perform set_config('gradify.ai_claim', 'off', true);
  return query select new_id, null::text, per.plan, n + (case when is_counted then 1 else 0 end), coalesce(lim, 0), per.period_end, is_counted, m;
end;
$$;
