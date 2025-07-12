-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'default',
  user_type text,
  onboarding_completed boolean DEFAULT false,
  goals text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood text,
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  rating int,
  submitted_at timestamp with time zone DEFAULT now()
);

-- Create crisis_events table
CREATE TABLE IF NOT EXISTS public.crisis_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type text DEFAULT 'panic_button',
  source text,
  resolved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Create support_wall table
CREATE TABLE IF NOT EXISTS public.support_wall (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  hearts integer DEFAULT 0,
  is_flagged boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create support_wall_hearts table
CREATE TABLE IF NOT EXISTS public.support_wall_hearts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES public.support_wall(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crisis_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_wall ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_wall_hearts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for journal_entries
CREATE POLICY "Users can select their own journal entries" ON public.journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journal entry" ON public.journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for feedback
CREATE POLICY "Users can select their own feedback" ON public.feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for crisis_events
CREATE POLICY "Users can view their own crisis events" ON public.crisis_events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can log their own crisis events" ON public.crisis_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for support_wall
CREATE POLICY "Anyone can read support posts" ON public.support_wall
  FOR SELECT USING (NOT is_flagged);

CREATE POLICY "Users can post to support wall" ON public.support_wall
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update hearts" ON public.support_wall
  FOR UPDATE USING (true) WITH CHECK (true);

-- Create RLS policies for support_wall_hearts
CREATE POLICY "Users can manage their own hearts" ON public.support_wall_hearts
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1))
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment hearts count
CREATE OR REPLACE FUNCTION increment_hearts(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.support_wall 
  SET hearts = hearts + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement hearts count
CREATE OR REPLACE FUNCTION decrement_hearts(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public.support_wall 
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;