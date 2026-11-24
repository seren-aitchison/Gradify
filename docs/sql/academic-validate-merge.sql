-- MyGradify: server-side validation of profiles.learner.academic (decision D4). PROPOSED, NOT APPLIED.
-- Needs the owner's approval as a production migration (it would move to supabase/migrations/ once approved).
--
-- What it does:
--   - A check on public.profiles so `learner.academic` can only hold the eight approved fields plus metadata, with the
--     right shapes and sizes, whichever client writes it. The app's own validation (kit/data/academic.js
--     validateAcademic) does the same in the browser; this makes the rule hold server-side too.
--   - It doesn't change who can read or write a profile: the existing "own profile" RLS policy (id = auth.uid())
--     still applies.
--   - It never rewrites existing rows: NOT VALID skips the check on current rows, and new writes are checked from
--     then on. No academic data exists before this release, so there's nothing to clean up.

-- PREFLIGHT (read-only; run first). It must return 0. NOT VALID leaves existing rows alone, but any later write to a
-- row whose academic value fails the check is refused, including writes to OTHER learner settings (rehearsed in
-- tests/academic-sql.test.mjs). So no row may hold an invalid academic value when this is applied.
--   select count(*) from public.profiles where learner ? 'academic' and jsonb_typeof(learner->'academic') <> 'null';

create or replace function public.academic_ok(a jsonb) returns boolean
language sql immutable as $$
  select a is null or jsonb_typeof(a) = 'null' or (
    jsonb_typeof(a) = 'object'
    -- only the eight fields and the metadata
    and not exists (select 1 from jsonb_object_keys(a) k where k not in (
      'country','institution','subject','offering','start_year','current_stage','mode','units',
      'verification_status','last_updated','schema_version','catalogue_build'))
    and coalesce(a->>'verification_status', 'not_independently_verified') = 'not_independently_verified'
    -- named fields: { id: catalogue ID or null, name: 1-160 chars }
    and (select bool_and(
          a->f is null or jsonb_typeof(a->f) = 'null' or (
            jsonb_typeof(a->f) = 'object'
            and length(coalesce(a->f->>'name', '')) between 1 and 160
            and (a->f->>'id' is null or a->f->>'id' ~ '^(gy|gp|go|gs|gu|ga|gc|gr)_[0-9A-HJKMNP-TV-Z]{26}$')))
         from unnest(array['institution','subject','offering']) f)
    and (a->'country' is null or jsonb_typeof(a->'country') = 'null' or (
          jsonb_typeof(a->'country') = 'object'
          and length(coalesce(a->'country'->>'name', '')) between 1 and 80
          and (a->'country'->>'code' is null or a->'country'->>'code' ~ '^[A-Z]{2}$')))
    and (a->'current_stage' is null or jsonb_typeof(a->'current_stage') = 'null' or (
          jsonb_typeof(a->'current_stage') = 'object'
          and length(coalesce(a->'current_stage'->>'value', '')) between 1 and 20
          and length(coalesce(a->'current_stage'->>'label', '')) between 1 and 80))
    and (a->'units' is null or jsonb_typeof(a->'units') <> 'array' or not exists (
          select 1 from jsonb_array_elements(a->'units') u
          where jsonb_typeof(u) <> 'object'
             or length(coalesce(u->>'name', '')) not between 1 and 160
             or (u->>'id' is not null and u->>'id' !~ '^(gy|gp|go|gs|gu|ga|gc|gr)_[0-9A-HJKMNP-TV-Z]{26}$')
             or length(coalesce(u->>'code', '')) > 40
             or exists (select 1 from jsonb_object_keys(u) k where k not in ('id', 'name', 'code'))))
    and (a->'schema_version' is null or a->>'schema_version' = '1')
    and (a->'start_year' is null or (jsonb_typeof(a->'start_year') = 'number' and a->>'start_year' ~ '^\d{4}$' and (a->>'start_year')::int between 2000 and 2100))
    and (a->'mode' is null or a->>'mode' in ('full-time','part-time','distance','apprenticeship'))
    and (a->'units' is null or (jsonb_typeof(a->'units') = 'array' and jsonb_array_length(a->'units') <= 30))
  );
$$;

alter table public.profiles
  add constraint profiles_academic_ok check (public.academic_ok(learner->'academic')) not valid;

-- Rollback:
--   alter table public.profiles drop constraint profiles_academic_ok;
--   drop function public.academic_ok(jsonb);
