-- Create whisper_hearts table for tracking user hearts on whispers
CREATE TABLE IF NOT EXISTS whisper_hearts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  whisper_id uuid NOT NULL REFERENCES whispers(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(whisper_id, user_id)
);

-- Create reply_hearts table for tracking user hearts on replies
CREATE TABLE IF NOT EXISTS reply_hearts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reply_id uuid NOT NULL REFERENCES replies(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(reply_id, user_id)
);

-- Add hearts column to replies table
ALTER TABLE replies ADD COLUMN IF NOT EXISTS hearts integer DEFAULT 0;

-- Add reply_count column to whispers table
ALTER TABLE whispers ADD COLUMN IF NOT EXISTS reply_count integer DEFAULT 0;

-- Enable RLS on new tables
ALTER TABLE whisper_hearts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reply_hearts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for whisper_hearts
CREATE POLICY "Users can add own hearts"
  ON whisper_hearts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own hearts"
  ON whisper_hearts FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all hearts"
  ON whisper_hearts FOR SELECT
  USING (true);

-- RLS Policies for reply_hearts
CREATE POLICY "Users can add own reply hearts"
  ON reply_hearts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own reply hearts"
  ON reply_hearts FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all reply hearts"
  ON reply_hearts FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_whisper_hearts_whisper_id ON whisper_hearts(whisper_id);
CREATE INDEX IF NOT EXISTS idx_whisper_hearts_user_id ON whisper_hearts(whisper_id, user_id);
CREATE INDEX IF NOT EXISTS idx_reply_hearts_reply_id ON reply_hearts(reply_id);
CREATE INDEX IF NOT EXISTS idx_reply_hearts_user_id ON reply_hearts(reply_id, user_id);

-- Function to increment whisper hearts
CREATE OR REPLACE FUNCTION increment_whisper_hearts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE whispers
  SET hearts = hearts + 1
  WHERE id = NEW.whisper_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to decrement whisper hearts
CREATE OR REPLACE FUNCTION decrement_whisper_hearts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE whispers
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = OLD.whisper_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to increment reply hearts
CREATE OR REPLACE FUNCTION increment_reply_hearts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE replies
  SET hearts = hearts + 1
  WHERE id = NEW.reply_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to decrement reply hearts
CREATE OR REPLACE FUNCTION decrement_reply_hearts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE replies
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = OLD.reply_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to increment reply count
CREATE OR REPLACE FUNCTION increment_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE whispers
  SET reply_count = reply_count + 1
  WHERE id = NEW.whisper_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to decrement reply count
CREATE OR REPLACE FUNCTION decrement_reply_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE whispers
  SET reply_count = GREATEST(reply_count - 1, 0)
  WHERE id = OLD.whisper_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create triggers
DROP TRIGGER IF EXISTS on_whisper_heart_added ON whisper_hearts;
CREATE TRIGGER on_whisper_heart_added
  AFTER INSERT ON whisper_hearts
  FOR EACH ROW
  EXECUTE FUNCTION increment_whisper_hearts();

DROP TRIGGER IF EXISTS on_whisper_heart_removed ON whisper_hearts;
CREATE TRIGGER on_whisper_heart_removed
  AFTER DELETE ON whisper_hearts
  FOR EACH ROW
  EXECUTE FUNCTION decrement_whisper_hearts();

DROP TRIGGER IF EXISTS on_reply_heart_added ON reply_hearts;
CREATE TRIGGER on_reply_heart_added
  AFTER INSERT ON reply_hearts
  FOR EACH ROW
  EXECUTE FUNCTION increment_reply_hearts();

DROP TRIGGER IF EXISTS on_reply_heart_removed ON reply_hearts;
CREATE TRIGGER on_reply_heart_removed
  AFTER DELETE ON reply_hearts
  FOR EACH ROW
  EXECUTE FUNCTION decrement_reply_hearts();

DROP TRIGGER IF EXISTS on_reply_added ON replies;
CREATE TRIGGER on_reply_added
  AFTER INSERT ON replies
  FOR EACH ROW
  EXECUTE FUNCTION increment_reply_count();

DROP TRIGGER IF EXISTS on_reply_removed ON replies;
CREATE TRIGGER on_reply_removed
  AFTER DELETE ON replies
  FOR EACH ROW
  EXECUTE FUNCTION decrement_reply_count();

-- Enable realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE whisper_hearts;
ALTER PUBLICATION supabase_realtime ADD TABLE reply_hearts;