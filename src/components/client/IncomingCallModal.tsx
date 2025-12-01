import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Phone, PhoneOff } from 'lucide-react';

interface IncomingCall {
  id: string;
  session_id: string;
  therapist_id: string;
  therapist_name: string;
  therapist_avatar?: string;
}

export default function IncomingCallModal() {
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const setupCallListener = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Subscribe to incoming calls
      const channel = supabase
        .channel('video-call-invites')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'video_call_invites',
            filter: `client_id=eq.${user.id}`,
          },
          async (payload) => {
            const call = payload.new as any;
            
            // Fetch therapist details
            const { data: therapist } = await supabase
              .from('profiles')
              .select('display_name, avatar_url')
              .eq('id', call.therapist_id)
              .single();

            setIncomingCall({
              id: call.id,
              session_id: call.session_id,
              therapist_id: call.therapist_id,
              therapist_name: therapist?.display_name || 'Your Therapist',
              therapist_avatar: therapist?.avatar_url,
            });
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    };

    setupCallListener();
  }, []);

  const handleAccept = async () => {
    if (!incomingCall) return;

    // Update invite status
    await supabase
      .from('video_call_invites')
      .update({ status: 'accepted' })
      .eq('id', incomingCall.id);

    // Navigate to video session
    navigate(`/app/client-video-session/${incomingCall.session_id}`);
    setIncomingCall(null);
  };

  const handleDecline = async () => {
    if (!incomingCall) return;

    // Update invite status
    await supabase
      .from('video_call_invites')
      .update({ status: 'declined' })
      .eq('id', incomingCall.id);

    setIncomingCall(null);
  };

  return (
    <Dialog open={!!incomingCall} onOpenChange={(open) => !open && handleDecline()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#1A1F2C] to-[#2A2F3C] border-[#D4AF37]/40">
        <div className="text-center space-y-6 py-6">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24 border-2 border-[#D4AF37]">
              <AvatarImage src={incomingCall?.therapist_avatar} />
              <AvatarFallback className="bg-[#D4AF37]/20 text-[#D4AF37] text-2xl">
                {incomingCall?.therapist_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              {incomingCall?.therapist_name} is calling...
            </h2>
            <p className="text-gray-400">Video therapy session</p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={handleDecline}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              <PhoneOff className="h-5 w-5 mr-2" />
              Decline
            </Button>
            <Button
              size="lg"
              onClick={handleAccept}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Phone className="h-5 w-5 mr-2" />
              Accept
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
