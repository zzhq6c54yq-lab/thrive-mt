-- Create storage bucket for client documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create client_documents table to track document metadata
CREATE TABLE IF NOT EXISTS public.client_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  therapist_id uuid NOT NULL REFERENCES therapists(id) ON DELETE CASCADE,
  client_id uuid NOT NULL,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  document_type text NOT NULL, -- 'session_note', 'treatment_plan', 'assessment', 'other'
  title text NOT NULL,
  description text,
  session_date date,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.client_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_documents table
-- Therapists can view documents for their clients
CREATE POLICY "Therapists can view their client documents"
  ON public.client_documents
  FOR SELECT
  USING (
    therapist_id IN (
      SELECT id FROM therapists WHERE user_id = auth.uid()
    )
  );

-- Therapists can insert documents for their clients
CREATE POLICY "Therapists can upload client documents"
  ON public.client_documents
  FOR INSERT
  WITH CHECK (
    therapist_id IN (
      SELECT id FROM therapists WHERE user_id = auth.uid()
    )
  );

-- Therapists can update their client documents
CREATE POLICY "Therapists can update client documents"
  ON public.client_documents
  FOR UPDATE
  USING (
    therapist_id IN (
      SELECT id FROM therapists WHERE user_id = auth.uid()
    )
  );

-- Therapists can delete their client documents
CREATE POLICY "Therapists can delete client documents"
  ON public.client_documents
  FOR DELETE
  USING (
    therapist_id IN (
      SELECT id FROM therapists WHERE user_id = auth.uid()
    )
  );

-- Storage RLS Policies for client-documents bucket
-- Therapists can upload files to their clients' folders
CREATE POLICY "Therapists can upload client files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'client-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT t.id::text 
      FROM therapists t 
      WHERE t.user_id = auth.uid()
    )
  );

-- Therapists can view their clients' files
CREATE POLICY "Therapists can view client files"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'client-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT t.id::text 
      FROM therapists t 
      WHERE t.user_id = auth.uid()
    )
  );

-- Therapists can update their clients' files
CREATE POLICY "Therapists can update client files"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'client-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT t.id::text 
      FROM therapists t 
      WHERE t.user_id = auth.uid()
    )
  );

-- Therapists can delete their clients' files
CREATE POLICY "Therapists can delete client files"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'client-documents' AND
    (storage.foldername(name))[1] IN (
      SELECT t.id::text 
      FROM therapists t 
      WHERE t.user_id = auth.uid()
    )
  );

-- Add trigger for updated_at
CREATE TRIGGER update_client_documents_updated_at
  BEFORE UPDATE ON public.client_documents
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_client_documents_therapist_client 
  ON public.client_documents(therapist_id, client_id);
CREATE INDEX idx_client_documents_created_at 
  ON public.client_documents(created_at DESC);