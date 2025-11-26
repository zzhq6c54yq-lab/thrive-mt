import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Video, Loader2, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  message_text: string;
  sender_type: 'client' | 'therapist';
  created_at: string;
  is_read: boolean;
}

interface Therapist {
  id: string;
  name: string;
  title: string;
  image_url: string;
}

export default function ClientMessaging() {
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current user
  const { data: user } = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });

  // Get user's assigned therapist
  const { data: therapist, isLoading: therapistLoading } = useQuery({
    queryKey: ['assigned-therapist', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('assigned_therapist_id')
        .eq('id', user.id)
        .single();

      if (!profile?.assigned_therapist_id) return null;

      const { data: therapistData } = await supabase
        .from('therapists')
        .select('*')
        .eq('id', profile.assigned_therapist_id)
        .single();

      return therapistData as Therapist;
    },
    enabled: !!user?.id,
  });

  // Get conversation messages
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['client-messages', user?.id, therapist?.id],
    queryFn: async () => {
      if (!user?.id || !therapist?.id) return [];

      const { data, error } = await supabase
        .from('therapist_messages')
        .select('*')
        .eq('client_id', user.id)
        .eq('therapist_id', therapist.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data as Message[];
    },
    enabled: !!user?.id && !!therapist?.id,
  });

  // Mark therapist messages as read
  useEffect(() => {
    if (!messages || !user?.id || !therapist?.id) return;

    const unreadMessages = messages.filter(
      m => m.sender_type === 'therapist' && !m.is_read
    );

    if (unreadMessages.length > 0) {
      unreadMessages.forEach(async (msg) => {
        await supabase
          .from('therapist_messages')
          .update({ is_read: true })
          .eq('id', msg.id);
      });
    }
  }, [messages, user?.id, therapist?.id]);

  // Real-time subscription
  useEffect(() => {
    if (!user?.id || !therapist?.id) return;

    const channel = supabase
      .channel('client-messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'therapist_messages',
          filter: `client_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['client-messages'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, therapist?.id, queryClient]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user?.id || !therapist?.id) return;

    setIsSending(true);
    try {
      const { error } = await supabase
        .from('therapist_messages')
        .insert({
          client_id: user.id,
          therapist_id: therapist.id,
          message_text: newMessage.trim(),
          sender_type: 'client',
        });

      if (error) throw error;

      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['client-messages'] });
    } catch (error: any) {
      toast({
        title: 'Error sending message',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (therapistLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No therapist assigned yet</p>
        <Button variant="gold" onClick={() => window.location.href = '/real-time-therapy'}>
          Find a Therapist
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* Therapist Header */}
      <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-t-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={therapist.image_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=therapist'}
              alt={therapist.name}
              className="w-16 h-16 rounded-full border-2 border-[#D4AF37]"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#D4AF37]">{therapist.name}</h2>
              <p className="text-muted-foreground">{therapist.title}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="border-[#D4AF37]/40">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="border-[#D4AF37]/40">
              <Video className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-[#D4AF37]/5 to-[#B8941F]/5 border-x border-[#D4AF37]/40">
        {messagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
          </div>
        ) : messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.sender_type === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-xl p-4 ${
                  message.sender_type === 'client'
                    ? 'bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 border border-[#D4AF37]/40'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                <p className="text-foreground whitespace-pre-wrap">{message.message_text}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {format(new Date(message.created_at), 'MMM d, h:mm a')}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">No messages yet</p>
              <p className="text-sm text-muted-foreground">Send a message to {therapist.name} to start the conversation</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-b-xl p-6">
        <div className="flex gap-4">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Message ${therapist.name}...`}
            className="flex-1 min-h-[80px] bg-background/50 border-[#D4AF37]/30 focus:border-[#D4AF37]/60 resize-none"
            disabled={isSending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            variant="gold"
            size="lg"
            className="self-end"
          >
            {isSending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
      </div>
    </div>
  );
}
