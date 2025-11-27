import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Video, Clock, MessageSquare, AlertCircle, Calendar, Send, Reply, Phone } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TodayTabProps {
  upcomingAppointments: any[];
  recentMessages: any[];
  stats: {
    upcomingToday: number;
    activeClients: number;
    sessionsThisWeek: number;
  };
  onSwitchToMessagesTab: (clientId: string) => void;
}

export default function TodayTab({ 
  upcomingAppointments, 
  recentMessages,
  stats,
  onSwitchToMessagesTab
}: TodayTabProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [sending, setSending] = useState(false);

  const priorityClients = upcomingAppointments
    .filter(apt => {
      const concerns = apt.concerns || [];
      return concerns.some((c: string) => 
        c.toLowerCase().includes('crisis') || 
        c.toLowerCase().includes('urgent') ||
        c.toLowerCase().includes('severe')
      );
    })
    .slice(0, 3);

  const todayAppointments = upcomingAppointments.filter(apt => {
    const aptDate = new Date(apt.appointment_date);
    const today = new Date();
    return aptDate.toDateString() === today.toDateString();
  });

  const handleStartSession = (appointmentId: string, clientName: string) => {
    navigate(`/therapist-video-session?id=${appointmentId}&client=${encodeURIComponent(clientName)}`);
  };

  const handleQuickReply = async (clientId: string) => {
    if (!replyMessage.trim()) return;
    
    setSending(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('therapist_messages').insert({
        therapist_id: user?.id,
        client_id: clientId,
        message_text: replyMessage,
        sender_type: 'therapist'
      });

      toast({
        title: "Message sent",
        description: "Your reply has been sent successfully.",
      });
      
      setReplyMessage("");
      setReplyingTo(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleVideoCall = async (clientId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const sessionId = crypto.randomUUID();
      
      await supabase.from('video_call_invites').insert({
        session_id: sessionId,
        therapist_id: user?.id,
        client_id: clientId,
        status: 'pending'
      });

      navigate(`/therapist-video-session/${sessionId}?clientId=${clientId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate video call.",
        variant: "destructive",
      });
    }
  };

  const handleAudioCall = async (clientId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const sessionId = crypto.randomUUID();
      
      await supabase.from('video_call_invites').insert({
        session_id: sessionId,
        therapist_id: user?.id,
        client_id: clientId,
        status: 'pending'
      });

      navigate(`/therapist-video-session/${sessionId}?clientId=${clientId}`);
      
      toast({
        title: "Audio call initiated",
        description: "You can disable your camera in the session.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to initiate call.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-[#B87333]/10 to-[#E5C5A1]/5 border-[#B87333]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Sessions Today</p>
                <p className="text-3xl font-bold text-[#B87333]">{stats.upcomingToday}</p>
              </div>
              <Calendar className="h-8 w-8 text-[#B87333]/40" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#B87333]/10 to-[#E5C5A1]/5 border-[#B87333]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">Active Clients</p>
                <p className="text-3xl font-bold text-[#B87333]">{stats.activeClients}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-[#B87333]/40" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#B87333]/10 to-[#E5C5A1]/5 border-[#B87333]/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/60">This Week</p>
                <p className="text-3xl font-bold text-[#B87333]">{stats.sessionsThisWeek}</p>
              </div>
              <Clock className="h-8 w-8 text-[#B87333]/40" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Clients Alert */}
      {priorityClients.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertCircle className="h-5 w-5" />
              Priority Clients Scheduled Today
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {priorityClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                <div>
                  <p className="font-medium text-white">{client.client_name}</p>
                  <p className="text-sm text-white/60">
                    {format(new Date(client.appointment_date), "h:mm a")} • {client.duration_minutes} min
                  </p>
                </div>
                <Badge variant="destructive" className="bg-red-500/20">High Priority</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Sessions */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Today's Sessions</span>
              <Badge className="bg-[#B87333]/20 text-[#B87333]">{todayAppointments.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayAppointments.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/40">No sessions scheduled for today</p>
              </div>
            ) : (
              todayAppointments.map((appointment) => {
                const aptTime = new Date(appointment.appointment_date);
                const isUpcoming = aptTime > new Date();
                const isNow = Math.abs(aptTime.getTime() - new Date().getTime()) < 900000; // Within 15 min

                return (
                  <div 
                    key={appointment.id} 
                    className={`p-4 rounded-lg border transition-all ${
                      isNow 
                        ? 'bg-[#B87333]/20 border-[#B87333] shadow-lg shadow-[#B87333]/20' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#B87333]/20 flex items-center justify-center">
                          <span className="text-sm font-semibold text-[#B87333]">
                            {appointment.client_name?.split(' ').map((n: string) => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{appointment.client_name}</p>
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Clock className="h-3 w-3" />
                            <span>{format(aptTime, "h:mm a")}</span>
                            <span>•</span>
                            <span>{appointment.duration_minutes} min</span>
                          </div>
                        </div>
                      </div>
                      {isNow && (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#B87333] rounded-full animate-pulse" />
                          <span className="text-xs text-[#B87333] font-medium">Starting Soon</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-[#B87333] hover:bg-[#B8941F] text-black"
                      size="sm"
                      onClick={() => handleStartSession(appointment.id, appointment.client_name)}
                    >
                      <Video className="h-4 w-4 mr-2" />
                      {isNow ? 'Join Now' : 'Start Session'}
                    </Button>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Recent Messages */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span>Recent Messages</span>
              {recentMessages.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onSwitchToMessagesTab('')}
                  className="text-[#B87333] hover:text-[#E5C5A1] hover:bg-white/5"
                >
                  View All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMessages.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-white/20 mx-auto mb-3" />
                <p className="text-white/40">No recent messages</p>
              </div>
            ) : (
              recentMessages.slice(0, 5).map((message) => (
                <div 
                  key={message.id} 
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                >
                  <div
                    className="cursor-pointer mb-3"
                    onClick={() => onSwitchToMessagesTab(message.client_id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar_url} />
                        <AvatarFallback className="bg-[#B87333]/20 text-[#B87333]">
                          {message.client_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-white">{message.client_name}</p>
                          {!message.is_read && (
                            <span className="w-2 h-2 bg-[#B87333] rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-white/60 line-clamp-2">{message.message_text}</p>
                        <p className="text-xs text-white/40 mt-1">
                          {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {replyingTo === message.id ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your reply..."
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleQuickReply(message.client_id);
                          }
                        }}
                        className="flex-1 bg-white/5 border-white/10"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleQuickReply(message.client_id)}
                        disabled={sending || !replyMessage.trim()}
                        className="bg-[#B87333] hover:bg-[#B8941F] text-black"
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyMessage("");
                        }}
                        className="text-white/60 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setReplyingTo(message.id)}
                        className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
                      >
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAudioCall(message.client_id)}
                        className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVideoCall(message.client_id)}
                        className="border-white/20 text-white/70 hover:text-white hover:bg-white/5"
                      >
                        <Video className="h-3 w-3 mr-1" />
                        Video
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
