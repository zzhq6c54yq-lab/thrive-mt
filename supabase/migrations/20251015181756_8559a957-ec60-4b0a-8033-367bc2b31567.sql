-- Create category enum
CREATE TYPE support_wall_category AS ENUM ('celebration', 'struggling', 'gratitude', 'question', 'resource', 'general');

-- Add new columns to support_wall
ALTER TABLE public.support_wall 
ADD COLUMN category support_wall_category NOT NULL DEFAULT 'general',
ADD COLUMN comment_count integer DEFAULT 0,
ADD COLUMN bookmark_count integer DEFAULT 0,
ADD COLUMN is_pinned boolean DEFAULT false,
ADD COLUMN tags text[];

-- Create support_wall_comments table
CREATE TABLE public.support_wall_comments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid NOT NULL REFERENCES public.support_wall(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  content text NOT NULL,
  hearts integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  is_flagged boolean DEFAULT false
);

-- Create support_wall_comment_hearts table
CREATE TABLE public.support_wall_comment_hearts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id uuid NOT NULL REFERENCES public.support_wall_comments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Create support_wall_bookmarks table
CREATE TABLE public.support_wall_bookmarks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid NOT NULL REFERENCES public.support_wall(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create support_wall_reports table
CREATE TABLE public.support_wall_reports (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id uuid NOT NULL REFERENCES public.support_wall(id) ON DELETE CASCADE,
  reported_by uuid NOT NULL,
  reason text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_wall_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_wall_comment_hearts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_wall_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_wall_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for comments
CREATE POLICY "Anyone can view non-flagged comments" ON public.support_wall_comments
  FOR SELECT USING (is_flagged = false);

CREATE POLICY "Authenticated users can create comments" ON public.support_wall_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for comment hearts
CREATE POLICY "Users can view all comment hearts" ON public.support_wall_comment_hearts
  FOR SELECT USING (true);

CREATE POLICY "Users can add own comment hearts" ON public.support_wall_comment_hearts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own comment hearts" ON public.support_wall_comment_hearts
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for bookmarks
CREATE POLICY "Users can view own bookmarks" ON public.support_wall_bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add own bookmarks" ON public.support_wall_bookmarks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove own bookmarks" ON public.support_wall_bookmarks
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for reports
CREATE POLICY "Users can submit reports" ON public.support_wall_reports
  FOR INSERT WITH CHECK (auth.uid() = reported_by);

-- Database functions for counter management
CREATE OR REPLACE FUNCTION public.increment_comment_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall
  SET comment_count = comment_count + 1
  WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrement_comment_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall
  SET comment_count = GREATEST(comment_count - 1, 0)
  WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_bookmark_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall
  SET bookmark_count = bookmark_count + 1
  WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrement_bookmark_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall
  SET bookmark_count = GREATEST(bookmark_count - 1, 0)
  WHERE id = post_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_comment_hearts(comment_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall_comments
  SET hearts = hearts + 1
  WHERE id = comment_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.decrement_comment_hearts(comment_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall_comments
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = comment_id;
END;
$$;