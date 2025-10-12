-- Fix search_path for increment_hearts function
CREATE OR REPLACE FUNCTION public.increment_hearts(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall
  SET hearts = hearts + 1
  WHERE id = post_id;
END;
$$;

-- Fix search_path for decrement_hearts function
CREATE OR REPLACE FUNCTION public.decrement_hearts(post_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.support_wall
  SET hearts = GREATEST(hearts - 1, 0)
  WHERE id = post_id;
END;
$$;

-- Fix search_path for update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;