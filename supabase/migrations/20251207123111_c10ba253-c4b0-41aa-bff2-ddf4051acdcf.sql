-- Fix database functions missing SET search_path = public

-- 1. handle_updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 2. award_appreciation_token
CREATE OR REPLACE FUNCTION public.award_appreciation_token()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- 3. award_bookmark_token
CREATE OR REPLACE FUNCTION public.award_bookmark_token()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- 4. increment_comment_count
CREATE OR REPLACE FUNCTION public.increment_comment_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall
  SET comment_count = comment_count + 1
  WHERE id = post_id;
END;
$function$;

-- 5. decrement_comment_count
CREATE OR REPLACE FUNCTION public.decrement_comment_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall
  SET comment_count = GREATEST(comment_count - 1, 0)
  WHERE id = post_id;
END;
$function$;

-- 6. increment_bookmark_count
CREATE OR REPLACE FUNCTION public.increment_bookmark_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall
  SET bookmark_count = bookmark_count + 1
  WHERE id = post_id;
END;
$function$;

-- 7. decrement_bookmark_count
CREATE OR REPLACE FUNCTION public.decrement_bookmark_count(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall
  SET bookmark_count = GREATEST(bookmark_count - 1, 0)
  WHERE id = post_id;
END;
$function$;

-- 8. increment_comment_hearts
CREATE OR REPLACE FUNCTION public.increment_comment_hearts(comment_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall_comments
  SET hearts = hearts + 1
  WHERE id = comment_id;
END;
$function$;

-- 9. decrement_comment_hearts
CREATE OR REPLACE FUNCTION public.decrement_comment_hearts(comment_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall_comments
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = comment_id;
END;
$function$;

-- 10. update_golden_years_progress_updated_at
CREATE OR REPLACE FUNCTION public.update_golden_years_progress_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- 11. handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      NEW.raw_user_meta_data->>'full_name',
      split_part(NEW.email, '@', 1)
    ),
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$function$;

-- 12. increment_hearts
CREATE OR REPLACE FUNCTION public.increment_hearts(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall
  SET hearts = hearts + 1
  WHERE id = post_id;
END;
$function$;

-- 13. decrement_hearts
CREATE OR REPLACE FUNCTION public.decrement_hearts(post_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  UPDATE public.support_wall
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = post_id;
END;
$function$;

-- 14. update_updated_at_column
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;