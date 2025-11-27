import { supabase } from "@/integrations/supabase/client";
import { NavigateFunction } from "react-router-dom";

export const initiateVideoCall = async (
  therapistId: string,
  clientId: string,
  navigate: NavigateFunction
) => {
  const sessionId = crypto.randomUUID();
  
  // Create invite in database
  const { error } = await supabase.from('video_call_invites').insert({
    session_id: sessionId,
    therapist_id: therapistId,
    client_id: clientId,
    status: 'pending'
  });

  if (error) {
    console.error('Error creating video call invite:', error);
    throw error;
  }
  
  // Navigate therapist to video session
  navigate(`/therapist-video-session/${sessionId}?clientId=${clientId}`);
};
