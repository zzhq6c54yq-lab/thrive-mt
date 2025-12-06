-- Create phone calls log table for HIPAA compliance
CREATE TABLE public.phone_calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  call_sid TEXT NOT NULL,
  from_number TEXT NOT NULL,
  to_number TEXT NOT NULL,
  therapist_id UUID REFERENCES auth.users(id),
  client_id UUID,
  status TEXT NOT NULL DEFAULT 'initiated',
  duration_seconds INTEGER,
  direction TEXT DEFAULT 'outbound',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- Create SMS messages log table for HIPAA compliance
CREATE TABLE public.sms_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_sid TEXT NOT NULL,
  from_number TEXT NOT NULL,
  to_number TEXT NOT NULL,
  therapist_id UUID REFERENCES auth.users(id),
  client_id UUID,
  message_body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  direction TEXT DEFAULT 'outbound',
  template_used TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.phone_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for phone_calls
CREATE POLICY "Therapists can view their own call logs"
ON public.phone_calls FOR SELECT
USING (auth.uid() = therapist_id);

CREATE POLICY "Service role can insert call logs"
ON public.phone_calls FOR INSERT
WITH CHECK (true);

CREATE POLICY "Service role can update call logs"
ON public.phone_calls FOR UPDATE
USING (true);

-- RLS policies for sms_messages
CREATE POLICY "Therapists can view their own SMS logs"
ON public.sms_messages FOR SELECT
USING (auth.uid() = therapist_id);

CREATE POLICY "Service role can insert SMS logs"
ON public.sms_messages FOR INSERT
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_phone_calls_therapist_id ON public.phone_calls(therapist_id);
CREATE INDEX idx_phone_calls_client_id ON public.phone_calls(client_id);
CREATE INDEX idx_phone_calls_created_at ON public.phone_calls(created_at DESC);
CREATE INDEX idx_sms_messages_therapist_id ON public.sms_messages(therapist_id);
CREATE INDEX idx_sms_messages_client_id ON public.sms_messages(client_id);
CREATE INDEX idx_sms_messages_created_at ON public.sms_messages(created_at DESC);