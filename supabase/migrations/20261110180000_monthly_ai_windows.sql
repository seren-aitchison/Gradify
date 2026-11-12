-- Gradify AI allowances are monthly on every plan (Free 5/5/1/2, Pro 150/100/20/30 a month).
-- Before this, a yearly Pro subscriber's allowance window was the whole billing year, so they would have had
-- 150 tutor uses a year instead of a month. Pro windows are now monthly slices of the billing period, anchored to
-- the day it started (a monthly subscriber's window is exactly their billing period, as before). During a
-- past_due grace period the last slice carries on rather than resetting early.
create or replace function public.ai_period(uid uuid default auth.uid())
returns table (plan text, period_start timestamptz, period_end timestamptz)
language sql stable security definer set search_path = public as $$
  with s as (
    select sub.current_period_start as ps, sub.current_period_end as pe,
      least(now(), coalesce(sub.current_period_end, now()) - interval '1 second') as at
    from public.subscriptions sub where sub.user_id = uid and public.is_pro(uid)
  ), slice as (
    select ps, pe,
      ps + make_interval(months => (extract(year from age(at, ps)) * 12 + extract(month from age(at, ps)))::int) as start
    from s where ps is not null and at >= ps
  )
  select 'pro', start, least(start + interval '1 month', coalesce(pe, start + interval '1 month')) from slice
  union all
  -- Free, or Pro without a recorded period: calendar months
  select case when public.is_pro(uid) then 'pro' else 'free' end, date_trunc('month', now()), date_trunc('month', now()) + interval '1 month'
  where not exists (select 1 from slice);
$$;
revoke all on function public.ai_period(uuid) from public, anon, authenticated;
