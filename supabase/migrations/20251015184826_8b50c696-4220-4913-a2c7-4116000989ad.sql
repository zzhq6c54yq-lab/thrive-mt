-- Create golden_years_progress table for tracking module completion
CREATE TABLE IF NOT EXISTS golden_years_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  module_type TEXT NOT NULL,
  lesson_id INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  responses JSONB,
  last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, module_type, lesson_id)
);

-- Enable RLS
ALTER TABLE golden_years_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own progress"
  ON golden_years_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON golden_years_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON golden_years_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_golden_years_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_golden_years_progress_timestamp
  BEFORE UPDATE ON golden_years_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_golden_years_progress_updated_at();