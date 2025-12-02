-- Create community_group_messages table for group chat
CREATE TABLE public.community_group_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.community_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.community_group_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Members can view group messages"
  ON public.community_group_messages
  FOR SELECT
  USING (
    group_id IN (
      SELECT group_id FROM public.group_memberships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Members can send messages"
  ON public.community_group_messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    group_id IN (
      SELECT group_id FROM public.group_memberships WHERE user_id = auth.uid()
    )
  );

-- Create index for faster queries
CREATE INDEX idx_community_group_messages_group_id ON public.community_group_messages(group_id);
CREATE INDEX idx_community_group_messages_created_at ON public.community_group_messages(created_at DESC);

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_group_messages;

-- Create buddy_volunteers table for peer volunteer signups
CREATE TABLE public.buddy_volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  experience_description TEXT,
  training_background TEXT[],
  specialties TEXT[],
  availability_hours TEXT,
  motivation TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.buddy_volunteers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own volunteer application"
  ON public.buddy_volunteers
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create volunteer application"
  ON public.buddy_volunteers
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all volunteer applications"
  ON public.buddy_volunteers
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update volunteer applications"
  ON public.buddy_volunteers
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
    )
  );