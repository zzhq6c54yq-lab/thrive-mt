import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Users, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HomeButton from "@/components/HomeButton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

export default function TherapistDashboard() {
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [sessionNotes, setSessionNotes] = useState("");

  // Get current therapist profile
  const { data: therapist } = useQuery({
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

  // Get completed sessions
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
        .order("session_date", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return data;
    },
    enabled: !!therapist?.id,
  });

  const handleSaveNotes = async (bookingId: string) => {
    try {
      const booking = upcomingBookings?.find(b => b.id === bookingId);
      if (!booking) return;

      const { error } = await supabase
        .from("therapy_sessions")
        .insert([{
          booking_id: bookingId,
          therapist_id: therapist?.id,
          user_id: booking.user_id,
          session_date: booking.appointment_date,
          duration_minutes: booking.duration_minutes,
          therapist_notes: sessionNotes,
        }]);

      if (error) throw error;

      // Update booking status
      await supabase
        .from("therapy_bookings")
        .update({ status: "completed" })
        .eq("id", bookingId);

      toast({ title: "Session notes saved successfully" });
      setSelectedBooking(null);
      setSessionNotes("");
    } catch (error: any) {
      toast({ 
        title: "Error saving notes", 
        description: error.message,
        variant: "destructive" 
      });
    }
  };

  if (!therapist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">You need to be registered as a therapist to access this dashboard.</p>
          <Link to="/therapist-admin">
            <Button>Go to Admin Panel</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <HomeButton />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/real-time-therapy">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold">Therapist Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {therapist.name}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingBookings?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions?.length || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions?.length || 0}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="history">Session History</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {!upcomingBookings || upcomingBookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                </CardContent>
              </Card>
            ) : (
              upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {(booking.profiles as any)?.display_name || "Client"}
                        </h3>
                        <p className="text-muted-foreground">
                          {format(new Date(booking.appointment_date), "PPP 'at' p")}
                        </p>
                        <p className="text-sm mt-2">{booking.duration_minutes} minutes • {booking.session_type}</p>
                        {booking.concerns && booking.concerns.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {booking.concerns.map((concern: string) => (
                              <span key={concern} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {concern}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => setSelectedBooking(selectedBooking === booking.id ? null : booking.id)}
                        >
                          {selectedBooking === booking.id ? "Close Notes" : "Add Notes"}
                        </Button>
                        {booking.video_room_id && (
                          <Button>Join Call</Button>
                        )}
                      </div>
                    </div>
                    
                    {selectedBooking === booking.id && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div>
                          <Label htmlFor="notes">Session Notes</Label>
                          <Textarea
                            id="notes"
                            rows={6}
                            value={sessionNotes}
                            onChange={(e) => setSessionNotes(e.target.value)}
                            placeholder="Document session observations, client progress, interventions used..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={() => handleSaveNotes(booking.id)}>
                            Save & Mark Complete
                          </Button>
                          <Button variant="outline" onClick={() => setSelectedBooking(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {!sessions || sessions.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed sessions yet</p>
                </CardContent>
              </Card>
            ) : (
              sessions.map((session) => (
                <Card key={session.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {(session.profiles as any)?.display_name || "Client"}
                        </h3>
                        <p className="text-muted-foreground">
                          {format(new Date(session.session_date), "PPP")}
                        </p>
                      </div>
                      {session.progress_rating && (
                        <div className="text-sm">
                          Rating: {session.progress_rating}/5
                        </div>
                      )}
                    </div>
                    {session.therapist_notes && (
                      <div className="mt-2 p-3 bg-muted rounded-lg">
                        <p className="text-sm">{session.therapist_notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
