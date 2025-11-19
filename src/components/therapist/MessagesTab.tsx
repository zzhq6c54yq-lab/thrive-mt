import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Flag } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  client_id: string;
  client_name: string;
  message_text: string;
  is_read: boolean;
  is_urgent: boolean;
  created_at: string;
  sender_type: string;
}

interface MessagesTabProps {
  messages: Message[];
}

export default function MessagesTab({ messages: initialMessages }: MessagesTabProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState(initialMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "urgent">("all");
  const [sending, setSending] = useState(false);
  const [therapistId, setTherapistId] = useState<string | null>(null);

  // Get current therapist ID
  useEffect(() => {
    const getTherapistId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('therapists')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setTherapistId(data.id);
      }
    };

    getTherapistId();
  }, []);

  // Update messages when prop changes
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Real-time subscription for new messages
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
          filter: `therapist_id=eq.${therapistId}`
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages(prev => [...prev, newMessage]);
          
          // Show toast if viewing different conversation
          if (selectedClientId && selectedClientId !== newMessage.client_id) {
            toast({
              title: "New Message",
              description: "You have a new message from a client",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [therapistId, selectedClientId, toast]);

  // Group messages by client
  const groupedMessages = messages.reduce((acc, msg) => {
    if (!acc[msg.client_id]) {
      acc[msg.client_id] = {
        client_name: msg.client_name,
        messages: [],
        unread_count: 0,
        has_urgent: false,
        last_message_date: msg.created_at,
      };
    }
    acc[msg.client_id].messages.push(msg);
    if (!msg.is_read && msg.sender_type === "client") {
      acc[msg.client_id].unread_count++;
    }
    if (msg.is_urgent) {
      acc[msg.client_id].has_urgent = true;
    }
    if (new Date(msg.created_at) > new Date(acc[msg.client_id].last_message_date)) {
      acc[msg.client_id].last_message_date = msg.created_at;
    }
    return acc;
  }, {} as Record<string, any>);

  const clientList = Object.entries(groupedMessages)
    .filter(([_, data]) => {
      if (filter === "unread" && data.unread_count === 0) return false;
      if (filter === "urgent" && !data.has_urgent) return false;
      if (searchTerm && !data.client_name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a[1].last_message_date);
      const dateB = new Date(b[1].last_message_date);
      return dateB.getTime() - dateA.getTime();
    });

  const selectedThread = selectedClientId 
    ? groupedMessages[selectedClientId]?.messages || []
    : [];

  const handleSendReply = async () => {
    if (!replyText.trim() || !selectedClientId || !therapistId) return;

    setSending(true);
    const messageText = replyText.trim();
    setReplyText("");

    const { error } = await supabase
      .from('therapist_messages')
      .insert({
        client_id: selectedClientId,
        therapist_id: therapistId,
        message_text: messageText,
        sender_type: 'therapist',
        is_read: false,
        is_urgent: false
      });

    if (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "Please try again",
        variant: "destructive"
      });
      setReplyText(messageText);
    } else {
      toast({
        title: "Message sent",
        description: "Your message has been sent to the client",
      });
    }

    setSending(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Client List */}
      <Card className="lg:col-span-1 bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Messages</CardTitle>
          <div className="space-y-3 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <div className="flex gap-2">
              {(["all", "unread", "urgent"] as const).map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={filter === f ? "bg-[#D4AF37] text-black" : "border-white/20 text-white/70 hover:text-white"}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {clientList.map(([clientId, data]) => (
            <div
              key={clientId}
              onClick={() => setSelectedClientId(clientId)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedClientId === clientId
                  ? "bg-[#D4AF37]/20 border border-[#D4AF37]/30"
                  : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white">{data.client_name}</h4>
                    {data.has_urgent && (
                      <Badge variant="destructive" className="h-5">
                        <Flag className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-white/60 truncate mt-1">
                    {data.messages[data.messages.length - 1]?.message_text}
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    {format(new Date(data.last_message_date), "MMM d, h:mm a")}
                  </p>
                </div>
                {data.unread_count > 0 && (
                  <Badge className="bg-[#D4AF37] text-black ml-2">
                    {data.unread_count}
                  </Badge>
                )}
              </div>
            </div>
          ))}
          {clientList.length === 0 && (
            <p className="text-white/40 text-center py-8">No messages found</p>
          )}
        </CardContent>
      </Card>

      {/* Message Thread */}
      <Card className="lg:col-span-2 bg-white/5 backdrop-blur-sm border-white/10">
        {selectedClientId ? (
          <>
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-white">
                {groupedMessages[selectedClientId]?.client_name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-4 pr-2">
                {selectedThread.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender_type === "therapist" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender_type === "therapist"
                          ? "bg-[#D4AF37]/20 text-white"
                          : msg.sender_type === "system"
                          ? "bg-white/5 text-white/70 border border-white/10"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.message_text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {format(new Date(msg.created_at), "MMM d, h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 resize-none"
                  rows={3}
                  disabled={sending}
                />
                <Button
                  onClick={handleSendReply}
                  disabled={!replyText.trim() || sending}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-white/40">Select a client to view messages</p>
          </div>
        )}
      </Card>
    </div>
  );
}
