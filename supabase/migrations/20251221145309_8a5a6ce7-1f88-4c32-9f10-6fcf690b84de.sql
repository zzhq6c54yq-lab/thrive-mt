-- Add stripe_customer_id to profiles table for Stripe integration
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- Create index for faster Stripe customer lookups
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id 
ON public.profiles(stripe_customer_id) WHERE stripe_customer_id IS NOT NULL;

-- Create index on subscriptions for user lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id 
ON public.subscriptions(user_id);

-- Create index on subscriptions for Stripe subscription ID lookups
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id 
ON public.subscriptions(stripe_subscription_id) WHERE stripe_subscription_id IS NOT NULL;