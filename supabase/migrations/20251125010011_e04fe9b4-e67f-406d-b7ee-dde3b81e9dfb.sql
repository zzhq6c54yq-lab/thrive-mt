-- Create user_goals table for weekly and monthly goals
CREATE TABLE IF NOT EXISTS public.user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target NUMERIC NOT NULL,
  current NUMERIC DEFAULT 0,
  goal_type TEXT NOT NULL CHECK (goal_type IN ('weekly', 'monthly', 'custom')),
  category TEXT,
  deadline TIMESTAMP WITH TIME ZONE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.user_goals ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own goals"
  ON public.user_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals"
  ON public.user_goals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals"
  ON public.user_goals FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals"
  ON public.user_goals FOR DELETE
  USING (auth.uid() = user_id);

-- Create mini_wins table
CREATE TABLE IF NOT EXISTS public.mini_wins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.mini_wins ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own mini wins"
  ON public.mini_wins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mini wins"
  ON public.mini_wins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create gratitude_entries table
CREATE TABLE IF NOT EXISTS public.gratitude_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.gratitude_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own gratitude entries"
  ON public.gratitude_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gratitude entries"
  ON public.gratitude_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gratitude entries"
  ON public.gratitude_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own gratitude entries"
  ON public.gratitude_entries FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_user_goals_user_id ON public.user_goals(user_id);
CREATE INDEX idx_user_goals_goal_type ON public.user_goals(goal_type);
CREATE INDEX idx_mini_wins_user_id ON public.mini_wins(user_id);
CREATE INDEX idx_gratitude_entries_user_id ON public.gratitude_entries(user_id);