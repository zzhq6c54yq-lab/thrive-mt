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
        .select(`
          *,
          profiles:user_id (
            display_name,
            avatar_url
          )
        `)
        .eq("therapist_id", therapist.id)
        .gte("appointment_date", new Date().toISOString())
        .order("appointment_date", { ascending: true });
      
      if (error) throw error;
      return data;
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
        .select(`
          *,
          profiles:client_id (
            display_name,
            avatar_url
          )
        `)
        .eq("therapist_id", therapist.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
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
        .select(`
          *,
          profiles:user_id (
            display_name
          )
        `)
        .eq("therapist_id", therapist.id)
        .order("session_date", { ascending: false });
      
      if (error) throw error;
      return data;
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
          <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2 bg-black/30 mb-8 p-1 rounded-lg h-auto">
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
              value="earnings" 
              className="data-[state=active]:bg-[#B87333]/90 data-[state=active]:text-white py-3"
            >
              Earnings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="animate-fade-in">
            <OverviewTab 
              therapist={therapist}
              upcomingBookings={upcomingBookings || []}
              messages={messages || []}
              sessions={sessions || []}
            />
          </TabsContent>

          <TabsContent value="clients" className="animate-fade-in">
            <ClientsTab 
              therapist={therapist}
              bookings={upcomingBookings || []}
              sessions={sessions || []}
            />
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <ScheduleTab 
              therapist={therapist}
              bookings={upcomingBookings || []}
            />
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <MessagesTab 
              therapist={therapist}
              messages={messages || []}
            />
          </TabsContent>

          <TabsContent value="earnings" className="animate-fade-in">
            <EarningsTab 
              therapist={therapist}
              sessions={sessions || []}
              bookings={upcomingBookings || []}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
