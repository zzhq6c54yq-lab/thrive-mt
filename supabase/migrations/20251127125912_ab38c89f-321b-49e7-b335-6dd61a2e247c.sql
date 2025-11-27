-- Fix RLS policy for therapist_messages to allow both clients and therapists to insert messages

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Users can send messages to their therapist" ON therapist_messages;
DROP POLICY IF EXISTS "Therapists can send messages to clients" ON therapist_messages;
DROP POLICY IF EXISTS "Allow message insertion" ON therapist_messages;

-- Create new comprehensive INSERT policy that allows both clients and therapists
CREATE POLICY "Allow clients and therapists to insert messages"
ON therapist_messages
FOR INSERT
WITH CHECK (
  -- Allow clients to insert messages where they are the client
  (auth.uid() = client_id)
  OR
  -- Allow therapists to insert messages where they are the therapist
  (auth.uid() IN (SELECT id FROM therapists WHERE id = therapist_id))
);