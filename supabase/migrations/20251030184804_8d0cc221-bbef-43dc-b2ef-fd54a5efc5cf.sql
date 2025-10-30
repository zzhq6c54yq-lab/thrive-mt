-- Fix database security: Add search_path to all functions
-- This prevents SQL injection by ensuring functions only look in the public schema

-- Fix handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix increment_whisper_hearts function  
CREATE OR REPLACE FUNCTION public.increment_whisper_hearts()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE whispers
  SET hearts = hearts + 1
  WHERE id = NEW.whisper_id;
  RETURN NEW;
END;
$function$;

-- Fix decrement_whisper_hearts function
CREATE OR REPLACE FUNCTION public.decrement_whisper_hearts()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE whispers
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = OLD.whisper_id;
  RETURN OLD;
END;
$function$;

-- Fix increment_reply_hearts function
CREATE OR REPLACE FUNCTION public.increment_reply_hearts()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE replies
  SET hearts = hearts + 1
  WHERE id = NEW.reply_id;
  RETURN NEW;
END;
$function$;

-- Fix decrement_reply_hearts function
CREATE OR REPLACE FUNCTION public.decrement_reply_hearts()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE replies
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = OLD.reply_id;
  RETURN OLD;
END;
$function$;

-- Fix increment_reply_count function
CREATE OR REPLACE FUNCTION public.increment_reply_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE whispers
  SET reply_count = reply_count + 1
  WHERE id = NEW.whisper_id;
  RETURN NEW;
END;
$function$;

-- Fix decrement_reply_count function
CREATE OR REPLACE FUNCTION public.decrement_reply_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE whispers
  SET reply_count = GREATEST(reply_count - 1, 0)
  WHERE id = OLD.whisper_id;
  RETURN OLD;
END;
$function$;

-- Fix award_appreciation_token function
CREATE OR REPLACE FUNCTION public.award_appreciation_token()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO insight_tokens (user_id, tokens_earned, total_appreciations)
  VALUES (NEW.user_id, 1, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    tokens_earned = insight_tokens.tokens_earned + 1,
    total_appreciations = insight_tokens.total_appreciations + 1,
    updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Fix award_bookmark_token function
CREATE OR REPLACE FUNCTION public.award_bookmark_token()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO insight_tokens (user_id, tokens_earned, total_bookmarks)
  VALUES (NEW.user_id, 1, 1)
  ON CONFLICT (user_id)
  DO UPDATE SET
    tokens_earned = insight_tokens.tokens_earned + 1,
    total_bookmarks = insight_tokens.total_bookmarks + 1,
    updated_at = NOW();
  RETURN NEW;
END;
$function$;

-- Fix increment_comment_count function
CREATE OR REPLACE FUNCTION public.increment_comment_count(post_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall
  SET comment_count = comment_count + 1
  WHERE id = post_id;
END;
$function$;

-- Fix decrement_comment_count function
CREATE OR REPLACE FUNCTION public.decrement_comment_count(post_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall
  SET comment_count = GREATEST(comment_count - 1, 0)
  WHERE id = post_id;
END;
$function$;

-- Fix increment_bookmark_count function
CREATE OR REPLACE FUNCTION public.increment_bookmark_count(post_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall
  SET bookmark_count = bookmark_count + 1
  WHERE id = post_id;
END;
$function$;

-- Fix decrement_bookmark_count function
CREATE OR REPLACE FUNCTION public.decrement_bookmark_count(post_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall
  SET bookmark_count = GREATEST(bookmark_count - 1, 0)
  WHERE id = post_id;
END;
$function$;

-- Fix increment_comment_hearts function
CREATE OR REPLACE FUNCTION public.increment_comment_hearts(comment_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall_comments
  SET hearts = hearts + 1
  WHERE id = comment_id;
END;
$function$;

-- Fix decrement_comment_hearts function
CREATE OR REPLACE FUNCTION public.decrement_comment_hearts(comment_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall_comments
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = comment_id;
END;
$function$;

-- Fix update_golden_years_progress_updated_at function
CREATE OR REPLACE FUNCTION public.update_golden_years_progress_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = 'public'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Fix handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$function$;

-- Fix increment_hearts function
CREATE OR REPLACE FUNCTION public.increment_hearts(post_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall
  SET hearts = hearts + 1
  WHERE id = post_id;
END;
$function$;

-- Fix decrement_hearts function
CREATE OR REPLACE FUNCTION public.decrement_hearts(post_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = 'public'
AS $function$
BEGIN
  UPDATE public.support_wall
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = post_id;
END;
$function$;