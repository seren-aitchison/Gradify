-- Mastery Engine evidence: how sure the learner was before seeing the answer, and whether an
-- answer came from the normal schedule or a targeted topic practice session (which records
-- evidence without moving cards that aren't due).
alter table public.reviews
  add column confidence text check (confidence in ('sure', 'unsure', 'guess')),
  add column mode text not null default 'scheduled' check (mode in ('scheduled', 'practice'));
