-- Gradify: check a Supabase project's setup. READ-ONLY: one SELECT, changes nothing.
-- Paste into Supabase → SQL Editor → New query, click Run, and send Claude the results (they contain no keys,
-- passwords or learner data: only names, counts and yes/no). Every row should say PASS.
with expected(t) as (values ('profiles'), ('documents'), ('packs'), ('cards'), ('reviews'), ('activity'), ('plan_blocks'),
  ('waitlist'), ('workouts'), ('body_checkins'), ('fitness_tests'), ('assessment_attempts'), ('course_progress'),
  ('tutor_usage'), ('revalidation_entries'), ('page_events')),
owned(t) as (select t from expected where t not in ('waitlist', 'page_events')),
versions(v) as (values ('20261028120000'), ('20261029120000'), ('20261031120000'), ('20261101120000'), ('20261105120000'),
  ('20261105130000'), ('20261105140000'), ('20261106120000'), ('20261106130000'), ('20261106140000'), ('20261107120000')),
tbl as (select e.t, c.oid, c.relrowsecurity as rls from expected e left join pg_class c on c.relname = e.t and c.relkind = 'r'
  and c.relnamespace = 'public'::regnamespace),
-- the history table may not exist (setup never ran): read it only if it does
ledger as (select unnest(xpath('//version/text()', query_to_xml('select version from supabase_migrations.schema_migrations', false, false, '')))::text as version
  where to_regclass('supabase_migrations.schema_migrations') is not null),
trig as (select t.tgname, t.tgenabled, p.proname, p.prosecdef, p.proconfig from pg_trigger t join pg_proc p on p.oid = t.tgfoid
  where t.tgrelid = 'auth.users'::regclass and not t.tgisinternal)
select * from (
  select 1 as n, 'Project' as check, 'PASS' as result, current_database() || ', ' || split_part(version(), ' on ', 1) as detail
  union all
  select 2, 'Tables (16 expected)', case when count(oid) = 16 then 'PASS' else 'FAIL' end,
    count(oid) || ' of 16' || coalesce('; missing: ' || string_agg(t, ', ') filter (where oid is null), '') from tbl
  union all
  select 3, 'Migration history (11 expected)', case when (select count(*) from versions where v in (select version from ledger)) = 11
    and (select count(*) from ledger) = 11 then 'PASS' else 'FAIL' end,
    (select count(*) from ledger) || ' recorded' || coalesce('; missing: ' || (select string_agg(v, ', ') from versions where v not in (select version from ledger)), '')
    || coalesce('; unexpected: ' || (select string_agg(version, ', ') from ledger where version not in (select v from versions)), '')
  union all
  select 4, 'Row-level security on every table', case when bool_and(coalesce(rls, false)) then 'PASS' else 'FAIL' end,
    coalesce('off or missing: ' || string_agg(t, ', ') filter (where not coalesce(rls, false)), 'on for all 16') from tbl
  union all
  select 5, 'Every learner table has owner-only policies', case when count(*) filter (where pol = 0) = 0 then 'PASS' else 'FAIL' end,
    coalesce('no policies: ' || string_agg(t, ', ') filter (where pol = 0), sum(pol) || ' policies on 14 tables')
    from (select o.t, (select count(*) from pg_policies p where p.schemaname = 'public' and p.tablename = o.t and p.qual || coalesce(p.with_check, '') like '%auth.uid()%') as pol from owned o) x
  union all
  select 6, 'No policy lets signed-out visitors read anything', case when count(*) = 0 then 'PASS' else 'FAIL' end,
    coalesce(string_agg(tablename || ' (' || policyname || ')', ', '), 'none')
    from pg_policies where schemaname = 'public' and cmd in ('SELECT', 'ALL') and (roles::text like '%anon%' or roles::text like '%public%')
  union all
  select 7, 'Sign-up trigger makes each profile', case when count(*) filter (where tgname = 'on_auth_user_created' and tgenabled <> 'D'
    and proname = 'new_user_profile' and prosecdef and array_to_string(proconfig, ',') like '%search_path=public%') = 1 then 'PASS' else 'FAIL' end,
    coalesce(string_agg(tgname || ' → ' || proname || case when prosecdef then ' (security definer)' else '' end || case when tgenabled = 'D' then ' DISABLED' else '' end, ', '), 'no trigger on auth.users') from trig
  union all
  select 8, 'XP guard and XP triggers', case when (select count(*) from pg_trigger where not tgisinternal and tgname in ('profiles_guard_xp', 'activity_xp')
    and tgrelid in (to_regclass('public.profiles'), to_regclass('public.activity'))) = 2 then 'PASS' else 'FAIL' end,
    (select count(*) from pg_trigger where not tgisinternal and tgname in ('profiles_guard_xp', 'activity_xp')) || ' of 2'
  union all
  select 9, 'Signed-in API role can use the tables', case when count(*) = 16 and bool_and(has_table_privilege('authenticated', oid, 'select,insert')) then 'PASS' else 'FAIL' end,
    coalesce('no access: ' || string_agg(t, ', ') filter (where not has_table_privilege('authenticated', oid, 'select,insert')), case when count(*) = 16 then 'granted on all 16' else count(*) || ' of 16 tables exist' end) from tbl where oid is not null
  union all
  select 10, 'API reloads when tables change', case when exists (select 1 from pg_event_trigger where evtname like 'pgrst%') then 'PASS' else 'CHECK' end,
    coalesce((select string_agg(evtname, ', ') from pg_event_trigger where evtname like 'pgrst%'), 'no pgrst event trigger')
  union all
  select 11, 'Accounts and profiles', 'INFO', (select count(*) from auth.users) || ' accounts, ' || case when to_regclass('public.profiles') is null then 'no profiles table'
    else (xpath('//n/text()', query_to_xml('select count(*) as n from public.profiles', false, false, '')))[1]::text || ' profiles' end
) r order by n;
