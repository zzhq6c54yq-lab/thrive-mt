-- =====================================================
-- PHASE 1: ACHIEVEMENT BADGES & GAMIFICATION
-- =====================================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.user_badges CASCADE;
DROP TABLE IF EXISTS public.achievement_badges CASCADE;

-- Badge definitions catalog
CREATE TABLE public.achievement_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_key TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  category TEXT NOT NULL,
  tier TEXT DEFAULT 'bronze',
  points_value INTEGER DEFAULT 10,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User earned badges
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  badge_key TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, badge_key)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges"
  ON public.user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own badges"
  ON public.user_badges FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- SEED DATA: ACHIEVEMENT BADGES
-- =====================================================

INSERT INTO public.achievement_badges (badge_key, title, description, icon_name, category, tier, points_value, requirement_type, requirement_value) VALUES
-- Streak badges
('first_checkin', 'First Step', 'Completed your first daily check-in', 'Heart', 'engagement', 'bronze', 10, 'check_ins', 1),
('streak_7', 'Week Warrior', '7 day check-in streak', 'Flame', 'engagement', 'silver', 25, 'streak_days', 7),
('streak_14', 'Fortnight Fighter', '14 day check-in streak', 'Flame', 'engagement', 'silver', 50, 'streak_days', 14),
('streak_30', 'Monthly Master', '30 day check-in streak', 'Star', 'engagement', 'gold', 100, 'streak_days', 30),
('streak_60', 'Consistency Champion', '60 day check-in streak', 'Trophy', 'engagement', 'platinum', 200, 'streak_days', 60),
('streak_90', 'Transformation Titan', '90 day check-in streak', 'Crown', 'engagement', 'platinum', 300, 'streak_days', 90),

-- Assessment badges
('first_assessment', 'Self Discovery', 'Completed first mental health assessment', 'Brain', 'learning', 'bronze', 15, 'assessments', 1),
('assessments_5', 'Insight Seeker', 'Completed 5 assessments', 'FileText', 'learning', 'silver', 50, 'assessments', 5),
('assessments_10', 'Knowledge Gatherer', 'Completed 10 assessments', 'BookOpen', 'learning', 'gold', 100, 'assessments', 10),

-- Workshop badges
('first_workshop', 'Learning Begins', 'Completed first workshop', 'GraduationCap', 'learning', 'bronze', 20, 'workshops', 1),
('workshops_3', 'Growth Mindset', 'Completed 3 workshops', 'BookOpen', 'learning', 'silver', 60, 'workshops', 3),
('workshops_6', 'Wisdom Seeker', 'Completed 6 workshops', 'Award', 'learning', 'gold', 120, 'workshops', 6),
('workshops_12', 'Master Learner', 'Completed all 12 workshops', 'Trophy', 'learning', 'platinum', 250, 'workshops', 12),

-- Community badges
('first_post', 'Voice Heard', 'Shared your first post in community', 'MessageCircle', 'community', 'bronze', 10, 'posts', 1),
('posts_10', 'Community Contributor', 'Shared 10 community posts', 'Users', 'community', 'silver', 50, 'posts', 10),
('hearts_50', 'Heartfelt Helper', 'Received 50 hearts on posts', 'Heart', 'community', 'gold', 75, 'hearts_received', 50),
('replies_25', 'Conversation Starter', 'Replied to 25 community posts', 'MessageSquare', 'community', 'silver', 40, 'replies', 25);