import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import TherapistWelcomeBanner from "@/components/therapist/TherapistWelcomeBanner";
import TodayTab from "@/components/therapist/TodayTab";
import ScheduleTab from "@/components/therapist/ScheduleTab";
import EarningsTab from "@/components/therapist/EarningsTab";
import { DocumentsTab } from "@/components/therapist/DocumentsTab";
import { ProfileTab } from "@/components/therapist/ProfileTab";
import { CalendarView } from "@/components/therapist/CalendarView";
import VideoSessionTab from "@/components/therapist/VideoSessionTab";
import RequestsTab from "@/components/therapist/RequestsTab";
import ClientsMessagesTab from "@/components/therapist/ClientsMessagesTab";
import { useTherapyBookings } from "@/hooks/useTherapyBookings";
import { startOfWeek } from "date-fns";

export default function TherapistDashboard() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Get current user
  const { data: user } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });

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

  // Get all bookings for calendar view
  const { data: allBookings } = useTherapyBookings(user?.id || "");

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

  // Get next session time for welcome banner
  const nextSession = upcomingBookings?.[0];
  const nextSessionTime = nextSession 
    ? new Date(nextSession.appointment_date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : undefined;

  // Transform data for OverviewTab
  const stats = {
    activeClients: upcomingBookings?.length || 0,
    sessionsThisWeek: sessions?.filter(s => {
      if (!s?.session_date) return false;
      try {
        const sessionDate = new Date(s.session_date);
        if (isNaN(sessionDate.getTime())) return false;
        const weekStart = startOfWeek(new Date());
        return sessionDate >= weekStart;
      } catch {
        return false;
      }
    }).length || 0,
    upcomingToday: todayBookings,
    earningsThisMonth: sessions?.filter(s => {
      if (!s?.session_date) return false;
      try {
        const sessionDate = new Date(s.session_date);
        if (isNaN(sessionDate.getTime())) return false;
        return sessionDate.getMonth() === new Date().getMonth();
      } catch {
        return false;
      }
    }).reduce((sum, s) => sum + (therapist?.hourly_rate || 0), 0) || 0,
    avgResponseTime: "2.3h",
    satisfaction: therapist?.rating || 0
  };

  const upcomingAppointments = upcomingBookings?.slice(0, 10).map(b => ({
    id: b.id,
    client_name: b.profiles?.display_name || 'Unknown Client',
    appointment_date: b.appointment_date,
    duration_minutes: b.duration_minutes,
    type: b.session_type
  })) || [];

  const recentMessages = messages?.slice(0, 5).map(m => ({
    id: m.id,
    client_name: m.client_name,
    message_text: m.message_text,
    created_at: m.created_at,
    is_read: m.is_read
  })) || [];

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
  const payments = allBookings?.map(b => ({
    id: b.id,
    date: b.appointment_date,
    client_id: b.user_id,
    client_name: b.profiles?.display_name || 'Unknown Client',
    client_avatar: b.profiles?.avatar_url,
    session_type: b.session_type,
    session_status: b.status,
    duration_minutes: b.duration_minutes,
    amount: Number(b.payment_amount) || 0,
    status: b.payment_status,
    payment_method: b.payment_method || 'not_specified',
    created_at: b.created_at
  })) || [];

  // Calculate real monthly earnings
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const monthPayments = payments.filter(p => {
      const paymentDate = new Date(p.date);
      return paymentDate.getMonth() === date.getMonth() && 
             paymentDate.getFullYear() === date.getFullYear() &&
             p.status === 'paid';
    });
    
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      earnings: monthPayments.reduce((sum, p) => sum + p.amount, 0)
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-gray-900 text-white">
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
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
                alt="ThriveMT Logo"
                className="h-10 w-10 object-contain filter drop-shadow-[0_0_8px_rgba(184,115,51,0.6)]"
              />
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
        <TherapistWelcomeBanner 
          therapistName={therapist.name}
          todaySessionCount={todayBookings}
          nextSessionTime={nextSessionTime}
        />

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-black/30 mb-8 p-1 rounded-lg h-auto">
            <TabsTrigger 
              value="today" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="clients" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3 relative"
            >
              Clients & Messages
              {unreadMessages > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadMessages}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="sessions" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Sessions
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="animate-fade-in">
            <TodayTab 
              upcomingAppointments={upcomingAppointments}
              recentMessages={recentMessages}
              stats={{
                upcomingToday: todayBookings,
                activeClients: stats.activeClients,
                sessionsThisWeek: stats.sessionsThisWeek
              }}
            />
          </TabsContent>

          <TabsContent value="clients" className="animate-fade-in">
            <ClientsMessagesTab therapistId={therapist.id} />
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Upcoming Sessions</h2>
                <ScheduleTab appointments={appointments} />
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Calendar View</h2>
                <CalendarView bookings={upcomingBookings || []} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="animate-fade-in">
            <div className="space-y-6">
              <RequestsTab />
              <VideoSessionTab 
                hasActiveSession={false}
                upcomingBookings={upcomingBookings}
              />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Profile Settings</h2>
                <ProfileTab 
                  therapist={therapist} 
                  onUpdate={() => queryClient.invalidateQueries({ queryKey: ['therapist-profile'] })}
                />
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Earnings</h2>
                <EarningsTab 
                  payments={payments}
                  monthlyData={monthlyData}
                />
              </div>
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#D4AF37]">Client Documents</h2>
                <DocumentsTab 
                  therapistId={therapist.id}
                  clients={upcomingBookings?.map(b => ({
                    id: b.user_id,
                    name: b.profiles?.display_name || 'Unknown Client'
                  })) || []}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
