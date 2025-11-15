import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import OverviewTab from "@/components/therapist/OverviewTab";
import ClientsTab from "@/components/therapist/ClientsTab";
import ScheduleTab from "@/components/therapist/ScheduleTab";
import MessagesTab from "@/components/therapist/MessagesTab";
import EarningsTab from "@/components/therapist/EarningsTab";
import { DocumentsTab } from "@/components/therapist/DocumentsTab";

export default function TherapistDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get current therapist profile
  const { data: therapist, isLoading: therapistLoading } = useQuery({
    queryKey: ["therapist-profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("therapists")
        .select("*")
        .eq("user_id", user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  // Get upcoming bookings
  const { data: upcomingBookings } = useQuery({
    queryKey: ["therapist-bookings", therapist?.id],
    queryFn: async () => {
      if (!therapist?.id) return [];
      
      const { data, error } = await supabase
        .from("therapy_bookings")
        .select("*")
        .eq("therapist_id", therapist.id)
        .gte("appointment_date", new Date().toISOString())
        .order("appointment_date", { ascending: true });
      
      if (error) throw error;
      
      // Fetch user profiles separately
      if (!data || data.length === 0) return [];
      
      const userIds = [...new Set(data.map(b => b.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", userIds);
      
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      return data.map(booking => ({
        ...booking,
        profiles: profileMap.get(booking.user_id)
      }));
    },
    enabled: !!therapist?.id,
  });

  // Get messages
  const { data: messages } = useQuery({
    queryKey: ["therapist-messages", therapist?.id],
    queryFn: async () => {
      if (!therapist?.id) return [];
      
      const { data, error } = await supabase
        .from("therapist_messages")
        .select("*")
        .eq("therapist_id", therapist.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Fetch client profiles separately
      if (!data || data.length === 0) return [];
      
      const clientIds = [...new Set(data.map(m => m.client_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url")
        .in("id", clientIds);
      
      // Map profiles to messages
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      return data.map(msg => ({
        ...msg,
        client_name: profileMap.get(msg.client_id)?.display_name || "Unknown Client",
        profiles: profileMap.get(msg.client_id)
      }));
    },
    enabled: !!therapist?.id,
  });

  // Get completed sessions for earnings
  const { data: sessions } = useQuery({
    queryKey: ["therapist-sessions", therapist?.id],
    queryFn: async () => {
      if (!therapist?.id) return [];
      
      const { data, error } = await supabase
        .from("therapy_sessions")
        .select("*")
        .eq("therapist_id", therapist.id)
        .order("session_date", { ascending: false });
      
      if (error) throw error;
      
      // Fetch user profiles separately
      if (!data || data.length === 0) return [];
      
      const userIds = [...new Set(data.map(s => s.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, display_name")
        .in("id", userIds);
      
      const profileMap = new Map(profiles?.map(p => [p.id, p]) || []);
      
      return data.map(session => ({
        ...session,
        profiles: profileMap.get(session.user_id)
      }));
    },
    enabled: !!therapist?.id,
  });

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  if (therapistLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730]">
        <p className="text-white">Loading dashboard...</p>
      </div>
    );
  }

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730]">
        <p className="text-white">Therapist profile not found</p>
      </div>
    );
  }

  const unreadMessages = messages?.filter(m => !m.is_read && m.sender_type === 'client').length || 0;
  const todayBookings = upcomingBookings?.filter(b => {
    const bookingDate = new Date(b.appointment_date);
    const today = new Date();
    return bookingDate.toDateString() === today.toDateString();
  }).length || 0;

  // Transform data for OverviewTab
  const stats = {
    activeClients: upcomingBookings?.length || 0,
    sessionsThisWeek: sessions?.filter(s => {
      const sessionDate = new Date(s.session_date);
      const now = new Date();
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return sessionDate >= weekStart;
    }).length || 0,
    upcomingToday: todayBookings,
    earningsThisMonth: sessions?.filter(s => 
      new Date(s.session_date).getMonth() === new Date().getMonth()
    ).reduce((sum, s) => sum + (therapist?.hourly_rate || 0), 0) || 0,
    avgResponseTime: "2.3h",
    satisfaction: therapist?.rating || 0
  };

  const upcomingAppointments = upcomingBookings?.slice(0, 10).map(b => ({
    id: b.id,
    client_name: b.profiles?.display_name || 'Unknown Client',
    time: b.appointment_date,
    duration: b.duration_minutes,
    type: b.session_type
  })) || [];

  const recentMessages = messages?.slice(0, 5).map(m => ({
    id: m.id,
    client_name: m.client_name,
    message: m.message_text,
    time: m.created_at,
    unread: !m.is_read
  })) || [];

  // Transform data for ClientsTab
  const uniqueClientIds = [...new Set(upcomingBookings?.map(b => b.user_id) || [])];
  const clients = uniqueClientIds.map(userId => {
    const booking = upcomingBookings?.find(b => b.user_id === userId);
    const clientSessions = sessions?.filter(s => s.user_id === userId) || [];
    
    return {
      id: booking?.id || userId,
      user_id: userId,
      name: booking?.profiles?.display_name || 'Unknown Client',
      avatar_url: booking?.profiles?.avatar_url,
      status: 'active',
      last_session: clientSessions[clientSessions.length - 1]?.session_date,
      next_appointment: booking?.appointment_date,
      total_sessions: clientSessions.length,
      concerns: booking?.concerns || [],
      risk_level: 'normal'
    };
  });

  // Transform data for ScheduleTab
  const appointments = upcomingBookings?.map(b => ({
    id: b.id,
    client_name: b.profiles?.display_name || 'Unknown Client',
    appointment_date: b.appointment_date,
    duration_minutes: b.duration_minutes,
    session_type: b.session_type,
    status: b.status
  })) || [];

  // Transform data for EarningsTab
  const payments = sessions?.map(s => ({
    id: s.id,
    date: s.session_date,
    client_name: s.profiles?.display_name || 'Unknown Client',
    session_type: 'video',
    amount: therapist?.hourly_rate || 150,
    status: 'completed'
  })) || [];

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const monthSessions = sessions?.filter(s => 
      new Date(s.session_date).getMonth() === date.getMonth()
    ) || [];
    
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      earnings: monthSessions.length * (therapist?.hourly_rate || 150)
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src={therapist.image_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=therapist'} 
                alt={therapist.name}
                className="w-12 h-12 rounded-full border-2 border-[#B87333]"
              />
              <div>
                <h1 className="text-xl font-semibold">Welcome back, {therapist.name}</h1>
                <p className="text-sm text-white/60">{therapist.title}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={handleLogout}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gradient-to-r from-[#B87333]/20 to-[#E5C5A1]/20 border-b border-[#B87333]/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B87333]">{upcomingBookings?.length || 0}</div>
              <div className="text-xs text-white/60">Active Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B87333]">{todayBookings}</div>
              <div className="text-xs text-white/60">Today's Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B87333]">{unreadMessages}</div>
              <div className="text-xs text-white/60">Unread Messages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#B87333]">{therapist.rating?.toFixed(1)}</div>
              <div className="text-xs text-white/60">Client Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 bg-black/30 mb-8 p-1 rounded-lg h-auto">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="clients" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Clients
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="messages" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3 relative"
            >
              Messages
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger 
              value="earnings" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Earnings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in">
            <OverviewTab 
              stats={stats}
              upcomingAppointments={upcomingAppointments}
              recentMessages={recentMessages}
            />
          </TabsContent>

          <TabsContent value="clients" className="animate-fade-in">
            <ClientsTab 
              clients={clients}
            />
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <ScheduleTab 
              appointments={appointments}
            />
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <MessagesTab 
              messages={messages || []}
            />
          </TabsContent>

          <TabsContent value="documents" className="animate-fade-in">
            <DocumentsTab 
              therapistId={therapist.id}
              clients={clients.map(c => ({
                id: c.user_id,
                name: c.name
              }))}
            />
          </TabsContent>

          <TabsContent value="earnings" className="animate-fade-in">
            <EarningsTab 
              payments={payments}
              monthlyData={monthlyData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
