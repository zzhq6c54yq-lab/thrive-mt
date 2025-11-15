-- Add shared_with_client column to client_documents (without IF NOT EXISTS)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'client_documents' AND column_name = 'shared_with_client'
  ) THEN
    ALTER TABLE client_documents ADD COLUMN shared_with_client boolean DEFAULT false;
  END IF;
END $$;

-- RLS policies for client document access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'client_documents' AND policyname = 'Clients can view shared documents'
  ) THEN
    CREATE POLICY "Clients can view shared documents" 
    ON client_documents 
    FOR SELECT 
    USING (auth.uid() = client_id AND shared_with_client = true);
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' AND schemaname = 'storage' AND policyname = 'Clients can download shared documents'
  ) THEN
    CREATE POLICY "Clients can download shared documents" 
    ON storage.objects 
    FOR SELECT 
    USING (bucket_id = 'client-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
  END IF;
END $$;

-- Update therapist profile with demo data
UPDATE therapists SET
  name = 'Dr. Emily Carter',
  title = 'Licensed Clinical Psychologist',
  bio = 'Dr. Emily Carter is a compassionate and experienced clinical psychologist with over 12 years of practice. She specializes in helping individuals navigate anxiety, depression, relationship challenges, and major life transitions. Dr. Carter believes in a client-centered approach, creating a safe and non-judgmental space where clients can explore their thoughts and feelings freely.',
  image_url = 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
  experience_years = 12,
  specialties = ARRAY['Anxiety', 'Depression', 'Relationships', 'Life Transitions', 'Stress Management'],
  approach = 'I use an integrative approach combining Cognitive Behavioral Therapy (CBT), mindfulness techniques, and person-centered therapy. My goal is to help you develop practical coping strategies while fostering self-awareness and personal growth.',
  license_number = 'PSY-28473',
  hourly_rate = 165.00,
  rating = 4.9,
  total_reviews = 47
WHERE id = '910b4c35-f946-4cd3-91cc-976a11f2062f';

-- Update client profiles with demo data
UPDATE profiles SET
  display_name = 'Sarah Mitchell',
  avatar_url = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
WHERE id = 'ee8376ee-9b35-45a8-b97c-b4e70de90357';

UPDATE profiles SET
  display_name = 'James Rodriguez',
  avatar_url = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
WHERE id = 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7';

-- Insert therapy bookings (12 total - 6 per client, mixed statuses)
INSERT INTO therapy_bookings (therapist_id, user_id, appointment_date, duration_minutes, session_type, status, payment_status, payment_amount, concerns, notes) VALUES
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', '2025-11-10 10:00:00+00', 60, 'video', 'completed', 'paid', 165.00, ARRAY['anxiety', 'work stress'], 'Great progress on stress management techniques'),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', '2025-11-17 10:00:00+00', 60, 'video', 'completed', 'paid', 165.00, ARRAY['anxiety'], 'Continued CBT exercises, homework assigned'),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', '2025-11-24 10:00:00+00', 60, 'video', 'completed', 'paid', 165.00, ARRAY['anxiety', 'relationships'], 'Discussed relationship boundaries'),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', '2025-12-01 10:00:00+00', 60, 'video', 'scheduled', 'pending', 165.00, ARRAY['anxiety'], NULL),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', '2025-12-08 10:00:00+00', 60, 'video', 'scheduled', 'pending', 165.00, ARRAY['anxiety'], NULL),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', '2025-12-15 14:00:00+00', 60, 'video', 'scheduled', 'pending', 165.00, ARRAY['anxiety', 'stress management'], NULL),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', '2025-11-12 15:00:00+00', 60, 'video', 'completed', 'paid', 165.00, ARRAY['depression', 'life transitions'], 'Initial assessment completed'),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', '2025-11-19 15:00:00+00', 60, 'video', 'completed', 'paid', 165.00, ARRAY['depression'], 'Started behavioral activation plan'),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', '2025-11-26 15:00:00+00', 60, 'video', 'completed', 'paid', 165.00, ARRAY['depression', 'motivation'], 'Good engagement with activities'),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', '2025-12-03 15:00:00+00', 60, 'video', 'scheduled', 'pending', 165.00, ARRAY['depression'], NULL),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', '2025-12-10 15:00:00+00', 60, 'video', 'scheduled', 'pending', 165.00, ARRAY['depression'], NULL),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', '2025-12-17 11:00:00+00', 60, 'video', 'scheduled', 'pending', 165.00, ARRAY['depression', 'life transitions'], NULL);

-- Insert therapist messages (12 total - 6 per client, mixed read/unread)
INSERT INTO therapist_messages (therapist_id, client_id, sender_type, message_text, is_read, is_urgent) VALUES
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'client', 'Hi Dr. Carter, I wanted to let you know that the breathing exercises have been really helpful this week. Thank you!', true, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'therapist', 'That is wonderful to hear, Sarah! I am so glad the techniques are working for you. Keep practicing them daily.', true, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'client', 'I have been feeling more anxious than usual this week. Could we discuss this in our next session?', true, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'therapist', 'Absolutely, Sarah. Let us explore what might be contributing to the increased anxiety. See you Monday at 10am.', true, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'client', 'Thank you for the resources you shared last session. The article about workplace stress was really insightful.', false, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'client', 'Quick question - would it be possible to reschedule our appointment next week to 2pm instead?', false, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'client', 'Dr. Carter, I completed the activity log you suggested. It really helped me see patterns in my mood.', true, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'therapist', 'Excellent work, James! Recognizing those patterns is a big step forward. We will review it together on Tuesday.', true, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'client', 'I have been struggling with motivation this week. Some days I do not even want to get out of bed.', true, true),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'therapist', 'Thank you for sharing this, James. Those feelings are valid. Let us work on some small, achievable goals for the week. I am here to support you.', true, true),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'client', 'The behavioral activation plan is starting to help. I went for a walk yesterday and it felt good.', false, false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'client', 'Looking forward to our session next week. I want to talk about setting some long-term goals.', false, false);

-- Insert client documents (6 total - 3 per client, half shared)
INSERT INTO client_documents (therapist_id, client_id, file_name, file_path, file_type, file_size, document_type, title, description, session_date, shared_with_client) VALUES
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'session_note_nov10.pdf', 'ee8376ee-9b35-45a8-b97c-b4e70de90357/session_note_nov10.pdf', 'application/pdf', 45678, 'session_note', 'Session Note - November 10, 2025', 'Discussed anxiety triggers and coping strategies. CBT homework assigned.', '2025-11-10', true),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'treatment_plan_sarah.pdf', 'ee8376ee-9b35-45a8-b97c-b4e70de90357/treatment_plan_sarah.pdf', 'application/pdf', 89012, 'treatment_plan', 'Treatment Plan for Anxiety Management', 'Comprehensive 12-week treatment plan focusing on CBT and mindfulness techniques.', '2025-11-10', true),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'ee8376ee-9b35-45a8-b97c-b4e70de90357', 'assessment_initial.pdf', 'ee8376ee-9b35-45a8-b97c-b4e70de90357/assessment_initial.pdf', 'application/pdf', 67890, 'assessment', 'Initial Clinical Assessment', 'Comprehensive intake assessment and diagnostic evaluation.', '2025-11-03', false),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'session_note_nov12.pdf', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7/session_note_nov12.pdf', 'application/pdf', 43210, 'session_note', 'Session Note - November 12, 2025', 'Initial assessment completed. Started developing behavioral activation plan.', '2025-11-12', true),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'activity_log_template.pdf', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7/activity_log_template.pdf', 'application/pdf', 23456, 'other', 'Daily Activity and Mood Log', 'Template for tracking daily activities and corresponding mood levels.', '2025-11-12', true),
('910b4c35-f946-4cd3-91cc-976a11f2062f', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7', 'treatment_plan_james.pdf', 'c3b8039d-f273-4ba4-8a9c-f9797c5c0fa7/treatment_plan_james.pdf', 'application/pdf', 78901, 'treatment_plan', 'Treatment Plan for Depression', 'Structured approach using behavioral activation and cognitive restructuring.', '2025-11-12', false);