import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Send, Search, User, MessageSquare, Loader2, Calendar, Video, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import SMSDialog from '@/components/communication/SMSDialog';

interface Client {
  id: string;
  user_id: string;
  name: string;
  avatar_url?: string;
  phone_number?: string;
  unread_count: number;
  last_message?: string;
  last_message_time?: string;
}

interface Message {
  id: string;
  message_text: string;
  sender_type: 'client' | 'therapist';
  created_at: string;
  is_read: boolean;
}

interface ClientsMessagesTabProps {
  therapistId: string;
  preSelectedClientId?: string;
}

export default function ClientsMessagesTab({ therapistId, preSelectedClientId }: ClientsMessagesTabProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get all clients with messages
  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ['therapist-clients-messages', therapistId],
    queryFn: async () => {
      // Get all messages for this therapist
      const { data: messages } = await supabase
        .from('therapist_messages')
        .select('*, profiles!therapist_messages_client_id_fkey(id, display_name, avatar_url)')
        .eq('therapist_id', therapistId)
        .order('created_at', { ascending: false });

      if (!messages) return [];

      // Group messages by client
      const clientMap = new Map<string, Client>();
      messages.forEach((msg: any) => {
        const clientId = msg.client_id;
        if (!clientMap.has(clientId)) {
          const unreadCount = messages.filter(
            m => m.client_id === clientId && m.sender_type === 'client' && !m.is_read
          ).length;

          clientMap.set(clientId, {
            id: clientId,
            user_id: clientId,
            name: msg.profiles?.display_name || 'Unknown Client',
            avatar_url: msg.profiles?.avatar_url,
            unread_count: unreadCount,
            last_message: msg.message_text,
            last_message_time: msg.created_at,
          });
        }
      });

      return Array.from(clientMap.values()).sort((a, b) => {
        const timeA = new Date(a.last_message_time || 0).getTime();
        const timeB = new Date(b.last_message_time || 0).getTime();
        return timeB - timeA;
      });
    },
    enabled: !!therapistId,
  });

  // Handle pre-selected client
  useEffect(() => {
    if (preSelectedClientId && clients) {
      const client = clients.find((c: any) => c.id === preSelectedClientId);
      if (client) {
        setSelectedClient(client);
      }
    }
  }, [preSelectedClientId, clients]);

  // Get messages for selected client
  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['client-conversation', therapistId, selectedClient?.id],
    queryFn: async () => {
      if (!selectedClient?.id) return [];

      const { data, error } = await supabase
        .from('therapist_messages')
        .select('*')
        .eq('therapist_id', therapistId)
        .eq('client_id', selectedClient.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Mark client messages as read
      await supabase
        .from('therapist_messages')
        .update({ is_read: true })
        .eq('therapist_id', therapistId)
        .eq('client_id', selectedClient.id)
        .eq('sender_type', 'client')
        .eq('is_read', false);

      return data as Message[];
    },
    enabled: !!selectedClient?.id && !!therapistId,
  });

  // Real-time subscription
  useEffect(() => {
    if (!therapistId) return;

    const channel = supabase
      .channel('therapist-messages-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'therapist_messages',
          filter: `therapist_id=eq.${therapistId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['therapist-clients-messages'] });
          queryClient.invalidateQueries({ queryKey: ['client-conversation'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [therapistId, queryClient]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedClient?.id) return;

    setIsSending(true);
    try {
      const { error } = await supabase
        .from('therapist_messages')
        .insert({
          client_id: selectedClient.id,
          therapist_id: therapistId,
          message_text: newMessage.trim(),
          sender_type: 'therapist',
        });

      if (error) throw error;

      setNewMessage('');
      queryClient.invalidateQueries({ queryKey: ['client-conversation'] });
      queryClient.invalidateQueries({ queryKey: ['therapist-clients-messages'] });
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

  const handleVideoCall = async (clientId: string) => {
    try {
      const sessionId = crypto.randomUUID();
      
      await supabase.from('video_call_invites').insert({
        session_id: sessionId,
        therapist_id: therapistId,
        client_id: clientId,
        status: 'pending'
      });

      navigate(`/app/therapist-video-session/${sessionId}?clientId=${clientId}`);
    } catch (error: any) {
      toast({
        title: 'Error initiating video call',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleAudioCall = async (clientId: string) => {
    try {
      const sessionId = crypto.randomUUID();
      
      await supabase.from('video_call_invites').insert({
        session_id: sessionId,
        therapist_id: therapistId,
        client_id: clientId,
        status: 'pending'
      });

      navigate(`/app/therapist-video-session/${sessionId}?clientId=${clientId}`);
      
      toast({
        title: 'Audio call initiated',
        description: 'You can disable your camera in the session.',
      });
    } catch (error: any) {
      toast({
        title: 'Error initiating call',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const filteredClients = clients?.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-16rem)]">
      {/* Left Column: Client List */}
      <div className="md:col-span-1 bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-6 overflow-hidden flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">Client Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="pl-10 bg-background/50 border-[#D4AF37]/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2">
          {clientsLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]" />
            </div>
          ) : filteredClients && filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <motion.button
                key={client.id}
                onClick={() => setSelectedClient(client)}
                whileHover={{ scale: 1.02 }}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  selectedClient?.id === client.id
                    ? 'bg-[#D4AF37]/20 border-[#D4AF37]/60'
                    : 'bg-background/30 hover:bg-background/50 border-transparent'
                } border`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={client.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${client.id}`}
                      alt={client.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {client.unread_count > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 min-w-[20px] h-5 flex items-center justify-center">
                        {client.unread_count}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{client.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{client.last_message}</p>
                  </div>
                  {client.last_message_time && (
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(client.last_message_time), 'h:mm a')}
                    </span>
                  )}
                </div>
              </motion.button>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No messages yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Conversation */}
      <div className="md:col-span-2 bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl overflow-hidden flex flex-col">
        {selectedClient ? (
          <>
            {/* Client Header */}
            <div className="p-6 border-b border-[#D4AF37]/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedClient.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedClient.id}`}
                    alt={selectedClient.name}
                    className="w-14 h-14 rounded-full border-2 border-[#D4AF37]"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-[#D4AF37]">{selectedClient.name}</h3>
                    <p className="text-sm text-muted-foreground">Active Client</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#D4AF37]/40"
                    onClick={() => handleAudioCall(selectedClient.id)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-[#D4AF37]/40"
                    onClick={() => handleVideoCall(selectedClient.id)}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Video
                  </Button>
                  <SMSDialog
                    phoneNumber={selectedClient.phone_number || ""}
                    clientId={selectedClient.id}
                    clientName={selectedClient.name}
                    trigger={
                      <Button variant="outline" size="sm" className="border-[#D4AF37]/40">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        SMS
                      </Button>
                    }
                  />
                  <Button variant="outline" size="sm" className="border-[#D4AF37]/40">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                    transition={{ delay: index * 0.03 }}
                    className={`flex ${message.sender_type === 'therapist' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-xl p-4 ${
                        message.sender_type === 'therapist'
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
                  <p className="text-muted-foreground">No messages with this client yet</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-[#D4AF37]/40">
              <div className="flex gap-4">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={`Message ${selectedClient.name}...`}
                  className="flex-1 min-h-[80px] bg-background/50 border-[#D4AF37]/30 resize-none"
                  disabled={isSending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isSending}
                  variant="gold"
                  size="lg"
                  className="self-end"
                >
                  {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a client to view messages</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
