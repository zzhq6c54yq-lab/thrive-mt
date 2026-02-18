-- Add streak freeze columns to user_streaks
ALTER TABLE public.user_streaks
  ADD COLUMN IF NOT EXISTS freeze_credits integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS freeze_used_week_of date;

COMMENT ON COLUMN public.user_streaks.freeze_credits IS 'Number of streak freezes available (max 1 per week, refills weekly)';
COMMENT ON COLUMN public.user_streaks.freeze_used_week_of IS 'The Monday of the week when the last freeze was used (used to gate one-per-week rule)';