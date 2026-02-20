
CREATE TABLE public.transition_worksheet_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  program_id UUID NOT NULL REFERENCES public.life_transition_programs(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  day_number INTEGER NOT NULL,
  responses JSONB NOT NULL DEFAULT '{}',
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, program_id, week_number, day_number)
);

ALTER TABLE public.transition_worksheet_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own worksheet responses"
  ON public.transition_worksheet_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own worksheet responses"
  ON public.transition_worksheet_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own worksheet responses"
  ON public.transition_worksheet_responses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX idx_worksheet_responses_user_program 
  ON public.transition_worksheet_responses(user_id, program_id);
