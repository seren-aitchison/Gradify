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
    and (a->'start_year' is null or (jsonb_typeof(a->'start_year') = 'number' and (a->>'start_year')::int between 2000 and 2100))
    and (a->'mode' is null or a->>'mode' in ('full-time','part-time','distance','apprenticeship'))
    and (a->'units' is null or (jsonb_typeof(a->'units') = 'array' and jsonb_array_length(a->'units') <= 30))
  );
$$;

alter table public.profiles
  add constraint profiles_academic_ok check (public.academic_ok(learner->'academic')) not valid;

-- Rollback:
--   alter table public.profiles drop constraint profiles_academic_ok;
--   drop function public.academic_ok(jsonb);
