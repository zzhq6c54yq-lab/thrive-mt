import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send, Users, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string;
    avatar_url: string;
  };
}

interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
}

const GroupChatRoom = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { toast } = useToast();
  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch group info
  useEffect(() => {
    const fetchGroup = async () => {
      if (!groupId) return;
      
      const { data, error } = await supabase
        .from('community_groups')
        .select('*')
        .eq('id', groupId)
        .single();

      if (error) {
        toast({
          title: "Error loading group",
          description: "Could not find this group.",
          variant: "destructive"
        });
        navigate('/app/community-groups');
        return;
      }
      
      setGroup(data);
    };

    fetchGroup();
  }, [groupId, navigate, toast]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!groupId) return;
      
      const { data, error } = await supabase
        .from('community_group_messages' as any)
        .select('*')
        .eq('group_id', groupId)
        .order('created_at', { ascending: true })
        .limit(100);

      if (!error && data) {
        // Fetch profiles separately
        const userIds = [...new Set(data.map((m: any) => m.user_id))];
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_url')
          .in('id', userIds);
        
        const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
        const messagesWithProfiles = data.map((m: any) => ({
          ...m,
          profiles: profileMap.get(m.user_id)
        }));
        setMessages(messagesWithProfiles);
      }
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`group-${groupId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_group_messages',
          filter: `group_id=eq.${groupId}`
        },
        async (payload) => {
          // Fetch the profile for the new message
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, avatar_url')
            .eq('id', payload.new.user_id)
            .single();

          const newMsg = {
            ...payload.new,
            profiles: profile
          } as Message;
          
          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user?.id || !groupId) return;
    
    setSending(true);
    const { error } = await supabase
      .from('community_group_messages' as any)
      .insert({
        group_id: groupId,
        user_id: user.id,
        content: newMessage.trim()
      });

    if (error) {
      toast({
        title: "Failed to send",
        description: "Please try again.",
        variant: "destructive"
      });
    } else {
      setNewMessage("");
    }
    setSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex items-center justify-center">
        <div className="text-white">Loading chat room...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col">
      {/* Header */}
      <div className="bg-gray-900/80 border-b border-[#D4AF37]/30 px-4 py-3 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/app/community-groups')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">{group?.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>{group?.member_count || 0} members</span>
            <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded-full">
              {group?.category}
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <MessageCircle className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-400">No messages yet</h3>
            <p className="text-sm text-gray-500">Be the first to say hello!</p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.user_id === user?.id;
            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isOwn ? 'flex-row-reverse' : ''}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={message.profiles?.avatar_url} />
                  <AvatarFallback className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs">
                    {message.profiles?.display_name?.[0]?.toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>
                
                <div className={`max-w-[70%] ${isOwn ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium ${isOwn ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                      {isOwn ? 'You' : message.profiles?.display_name || 'Anonymous'}
                    </span>
                    <span className="text-xs text-gray-600">
                      {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div
                    className={`inline-block px-4 py-2 rounded-2xl ${
                      isOwn
                        ? 'bg-gradient-to-r from-[#B87333] to-[#D4AF37] text-black'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gray-900/80 border-t border-[#D4AF37]/30 p-4">
        <div className="flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 border-[#D4AF37]/30 text-white placeholder:text-gray-500"
            disabled={!user}
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim() || sending || !user}
            className="bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {!user && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Please sign in to send messages
          </p>
        )}
      </div>
    </div>
  );
};

export default GroupChatRoom;
