import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Video, Phone, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { therapistRequestSchema } from '@/lib/validations';
import { VideoMessageRecorder } from './VideoMessageRecorder';

export const RequestTherapistContact: React.FC = () => {
  const { toast } = useToast();
  const [requestType, setRequestType] = useState<'text_message' | 'video_message' | 'callback_request' | null>(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get Dr. Chris Hopkins' therapist ID
  const { data: therapist } = useQuery({
    queryKey: ['dr-chris-hopkins'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('therapists')
        .select('id, name')
        .ilike('name', '%Chris Hopkins%')
        .single();
      
      if (error) throw error;
      return data;
    }
  });

  const handleVideoSubmit = async (videoUrl: string) => {
    if (!therapist?.id) {
      toast({
        title: "Error",
        description: "Unable to find therapist profile. Please try again.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('therapist_requests')
        .insert({
          user_id: user.id,
          therapist_id: therapist.id,
          request_type: 'video_message',
          message: 'Video message',
          video_url: videoUrl,
          priority: 'normal'
        });

      if (error) throw error;

      setRequestType(null);
    } catch (error) {
      console.error('Error submitting video:', error);
      toast({
        title: "Error",
        description: "Failed to send video message.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message to send to Dr. Chris Hopkins",
        variant: "destructive"
      });
      return;
    }

    if (!therapist?.id) {
      toast({
        title: "Error",
        description: "Unable to find therapist profile. Please try again.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to contact the therapist",
          variant: "destructive"
        });
        return;
      }

      // Validate input with Zod schema
      const validation = therapistRequestSchema.safeParse({
        requestType,
        message: message.trim()
      });

      if (!validation.success) {
        toast({
          title: "Validation Error",
          description: validation.error.errors[0].message,
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('therapist_requests')
        .insert({
          user_id: user.id,
          therapist_id: therapist.id,
          request_type: validation.data.requestType,
          message: validation.data.message,
          priority: validation.data.requestType === 'callback_request' ? 'high' : 'normal'
        });

      if (error) throw error;

      toast({
        title: "Request sent successfully",
        description: `Dr. Chris Hopkins will review your ${requestType === 'callback_request' ? 'callback request' : 'message'} and respond soon.`,
      });

      setMessage('');
      setRequestType(null);

    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error sending request",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!requestType) {
    return (
      <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40">
        <CardHeader>
          <CardTitle className="text-2xl bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
            Contact Dr. Chris Hopkins
          </CardTitle>
          <CardDescription className="text-base">
            Choose how you'd like to reach out
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4 border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10"
              onClick={() => setRequestType('text_message')}
            >
              <MessageSquare className="w-5 h-5 mr-3 text-[#D4AF37]" />
              <div className="text-left">
                <div className="font-semibold">Send a Message</div>
                <div className="text-xs text-muted-foreground">Share what's on your mind</div>
              </div>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4 border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10"
              onClick={() => setRequestType('callback_request')}
            >
              <Phone className="w-5 h-5 mr-3 text-[#D4AF37]" />
              <div className="text-left">
                <div className="font-semibold">Request a Call Back</div>
                <div className="text-xs text-muted-foreground">Dr. Pena will call you</div>
              </div>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="w-full justify-start h-auto p-4 border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10"
              onClick={() => setRequestType('video_message')}
            >
              <Video className="w-5 h-5 mr-3 text-[#D4AF37]" />
              <div className="text-left">
                <div className="font-semibold">Leave a Video Message</div>
                <div className="text-xs text-muted-foreground">Record up to 5 minutes</div>
              </div>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  // Show video recorder for video messages
  if (requestType === 'video_message') {
    return (
      <VideoMessageRecorder 
        onComplete={handleVideoSubmit}
        onCancel={() => setRequestType(null)}
      />
    );
  }

  return (
    <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
            {requestType === 'callback_request' ? 'Request Callback' : 'Send Message'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setRequestType(null);
              setMessage('');
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription>
          {requestType === 'callback_request' 
            ? 'Let Dr. Chris Hopkins know when you\'re available' 
            : 'Share what brings you here today'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={requestType === 'callback_request'
            ? 'Let me know what you\'d like to discuss and when you\'re available...'
            : 'I\'m reaching out because...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="bg-background/50 border-[#D4AF37]/30 focus:border-[#D4AF37]/60"
        />
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              setRequestType(null);
              setMessage('');
            }}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="gold"
            onClick={handleSubmit}
            disabled={isSubmitting || !message.trim()}
            className="flex-1"
          >
            {isSubmitting ? 'Sending...' : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Request
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};