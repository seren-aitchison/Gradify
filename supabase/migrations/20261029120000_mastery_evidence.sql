-- Mastery Engine evidence: how sure the learner was before seeing the answer, and whether an
-- answer came from the normal schedule or a targeted topic practice session (which records
-- evidence without moving cards that aren't due).
alter table public.reviews
  add column confidence text check (confidence in ('sure', 'unsure', 'guess')),
  add column mode text not null default 'scheduled' check (mode in ('scheduled', 'practice'));

-- Why and application questions added to an existing deck are logged as a pack row (with no
-- document) so they count towards the learner's daily Gradify AI limit.
alter table public.packs drop constraint packs_engine_check;
alter table public.packs add constraint packs_engine_check check (engine in ('claude', 'browser', 'claude-questions'));
