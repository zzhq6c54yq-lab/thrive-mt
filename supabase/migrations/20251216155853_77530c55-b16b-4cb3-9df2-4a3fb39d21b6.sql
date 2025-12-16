-- Admin broadcasts table for system-wide announcements
CREATE TABLE public.admin_broadcasts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  broadcast_type TEXT NOT NULL DEFAULT 'info' CHECK (broadcast_type IN ('info', 'warning', 'critical', 'maintenance')),
  target_audience TEXT NOT NULL DEFAULT 'all' CHECK (target_audience IN ('all', 'clients', 'therapists', 'coaches')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  show_as_popup BOOLEAN NOT NULL DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Track which users have read each broadcast
CREATE TABLE public.broadcast_reads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  broadcast_id UUID NOT NULL REFERENCES public.admin_broadcasts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(broadcast_id, user_id)
);

-- Admin settings persistence table
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL DEFAULT '{}',
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Platform status for lockdown/maintenance
CREATE TABLE public.platform_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status_type TEXT NOT NULL DEFAULT 'operational' CHECK (status_type IN ('operational', 'maintenance', 'lockdown', 'degraded')),
  message TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  initiated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.broadcast_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_status ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin_broadcasts
CREATE POLICY "Anyone can read active broadcasts" ON public.admin_broadcasts
  FOR SELECT USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admins can manage broadcasts" ON public.admin_broadcasts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for broadcast_reads
CREATE POLICY "Users can read their own broadcast reads" ON public.broadcast_reads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can mark broadcasts as read" ON public.broadcast_reads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for admin_settings
CREATE POLICY "Admins can manage settings" ON public.admin_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- RLS Policies for platform_status
CREATE POLICY "Anyone can read platform status" ON public.platform_status
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage platform status" ON public.platform_status
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Enable realtime for broadcasts
ALTER PUBLICATION supabase_realtime ADD TABLE admin_broadcasts;

-- Insert default platform status
INSERT INTO public.platform_status (status_type, message) 
VALUES ('operational', 'All systems operational');

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
  ('security', '{"twoFactorAuth": false, "emailVerification": true, "strictPassword": true, "sessionTimeout": true}'),
  ('notifications', '{"newUserAlerts": true, "bookingAlerts": true, "crisisAlerts": true, "systemAlerts": true}'),
  ('platform', '{"maintenanceMode": false, "newRegistrations": true, "aiFeatures": true, "analyticsTracking": true}');