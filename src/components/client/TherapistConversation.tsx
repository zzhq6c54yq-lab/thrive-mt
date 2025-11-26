import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Stethoscope, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  message_text: string;
  sender_type: 'client' | 'therapist' | 'system';
  created_at: string;
  is_read: boolean;
}

interface Therapist {
  id: string;
  full_name: string;
}

export default function TherapistConversation() {
  const { user } = useUser();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const conversationIdRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!user?.id) return;

    const fetchConversation = async () => {
      const { data, error } = await supabase
        .from('therapist_messages')
        .select('*, therapists(id, name)')
        .eq('client_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        setMessages(data as any);
        const therapistData = (data[0] as any).therapists;
        if (therapistData) {
          setTherapist({
            id: therapistData.id,
            full_name: therapistData.name || 'Therapist'
          });
          conversationIdRef.current = therapistData.id;
        }

        // Mark messages as read
        const unreadIds = data
          .filter((m: any) => !m.is_read && m.sender_type === 'therapist')
          .map((m: any) => m.id);

        if (unreadIds.length > 0) {
          await supabase
            .from('therapist_messages')
            .update({ is_read: true })
            .in('id', unreadIds);
        }
      }
      setLoading(false);
    };

    fetchConversation();
  }, [user?.id]);

  // Real-time subscription
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('client-therapist-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'therapist_messages',
          filter: `client_id=eq.${user.id}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Mark as read if from therapist
          if (newMessage.sender_type === 'therapist') {
            supabase
              .from('therapist_messages')
              .update({ is_read: true })
              .eq('id', newMessage.id)
              .then(() => {
                scrollToBottom();
              });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !user?.id || !therapist) return;

    setSending(true);
    const messageText = inputText.trim();
    setInputText('');

    const { error } = await supabase
      .from('therapist_messages')
      .insert({
        client_id: user.id,
        therapist_id: therapist.id,
        message_text: messageText,
        sender_type: 'client',
        is_read: false,
        is_urgent: false
      });

    if (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Failed to send message',
        description: 'Please try again',
        variant: 'destructive'
      });
      setInputText(messageText);
    }

    setSending(false);
  };

  if (loading) {
    return (
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Loading conversation...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  // Show "Start Conversation" UI if no therapist or no messages
  if (!therapist) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No therapist assigned yet</p>
        <button
          onClick={() => window.location.href = '/real-time-therapy'}
          className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-lg hover:shadow-lg transition-all"
        >
          Find a Therapist
        </button>
      </div>
    );
  }

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-white flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-[#D4AF37]" />
          Messages with {therapist.full_name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_type === 'client' ? 'justify-end' : 
                message.sender_type === 'system' ? 'justify-center' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender_type === 'client'
                    ? 'bg-[#D4AF37]/20 text-white'
                    : message.sender_type === 'system'
                    ? 'bg-white/5 text-white/70 text-sm border border-white/10 max-w-[90%]'
                    : 'bg-white/10 text-white'
                }`}
              >
                <div className="flex items-start gap-2 mb-1">
                  {message.sender_type === 'therapist' && (
                    <Stethoscope className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  )}
                  {message.sender_type === 'client' && (
                    <User className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  )}
                  {message.sender_type === 'system' && (
                    <Info className="w-4 h-4 text-white/50 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="whitespace-pre-wrap break-words">{message.message_text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
            rows={2}
            disabled={sending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || sending}
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
