import React, { useState, useEffect } from "react";
import { Calendar, Clock, Video, ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "video" | "group";
  color: string;
}

const UpcomingAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpanish, setIsSpanish] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const checkLanguage = () => {
      setIsSpanish((localStorage.getItem('preferredLanguage') || 'English') === 'Español');
    };
    checkLanguage();
    window.addEventListener('languageChange', checkLanguage);
    return () => window.removeEventListener('languageChange', checkLanguage);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const now = new Date().toISOString();

      // Fetch therapy bookings
      const { data: bookings } = await supabase
        .from("therapy_bookings")
        .select("id, appointment_date, session_type, status, duration_minutes")
        .eq("user_id", user.id)
        .gte("appointment_date", now)
        .in("status", ["confirmed", "pending"])
        .order("appointment_date", { ascending: true })
        .limit(5);

      // Fetch coaching sessions
      const { data: coaching } = await supabase
        .from("coaching_sessions")
        .select("id, preferred_date, preferred_time, focus_area, status")
        .eq("user_id", user.id)
        .gte("preferred_date", now.split('T')[0])
        .in("status", ["confirmed", "pending", "scheduled"])
        .order("preferred_date", { ascending: true })
        .limit(5);

      const colors = [
        "from-purple-600 to-violet-500",
        "from-blue-500 to-cyan-400",
        "from-emerald-500 to-teal-400",
        "from-amber-500 to-orange-400"
      ];

      const mapped: Appointment[] = [
        ...(bookings || []).map((b, i) => {
          const d = new Date(b.appointment_date);
          return {
            id: b.id,
            title: isSpanish
              ? `Sesión de ${b.session_type === 'video' ? 'Video' : 'Terapia'} (${b.duration_minutes}min)`
              : `${b.session_type === 'video' ? 'Video' : 'Therapy'} Session (${b.duration_minutes}min)`,
            date: b.appointment_date,
            time: format(d, "h:mm a"),
            type: "video" as const,
            color: colors[i % colors.length]
          };
        }),
        ...(coaching || []).map((c, i) => ({
          id: c.id,
          title: isSpanish
            ? `Coaching: ${c.focus_area}`
            : `Coaching: ${c.focus_area}`,
          date: c.preferred_date,
          time: c.preferred_time,
          type: "group" as const,
          color: colors[(i + 2) % colors.length]
        }))
      ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 5);

      setAppointments(mapped);
      setLoading(false);
    };
    fetchAppointments();
  }, [isSpanish]);

  const translations = {
    title: isSpanish ? "Próximas Citas" : "Upcoming Appointments",
    description: isSpanish ? "Tus sesiones y eventos programados" : "Your scheduled sessions and events",
    joinSession: isSpanish ? "Unirse" : "Join",
    viewAll: isSpanish ? "Ver Todas las Citas" : "View All Appointments",
    noAppointments: isSpanish ? "No hay citas próximas" : "No upcoming appointments",
    scheduleNow: isSpanish ? "Programar Ahora" : "Schedule Now",
  };

  const handleJoinAppointment = (appt: Appointment) => {
    toast({ title: isSpanish ? "Uniéndose..." : "Joining...", duration: 1500 });
    if (appt.type === "video") {
      navigate(`/app/client-video-session/${appt.id}`);
    } else {
      navigate("/app/virtual-meetings");
    }
  };

  return (
    <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-[#232336] to-[#131325]">
      <CardHeader className="pb-0 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-[#B87333]" />
            {translations.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-[#B87333] hover:text-[#B87333] hover:bg-white/10"
            onClick={() => navigate("/app/scheduling")}
          >
            {translations.viewAll}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
        <CardDescription className="text-white/60">{translations.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-[#B87333]" />
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appt) => (
              <motion.div
                key={appt.id}
                className="relative overflow-hidden rounded-lg"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className={`absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b ${appt.color}`}></div>
                <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-md hover:bg-white/15 transition-colors">
                  <div className="mr-4 p-2 rounded-full bg-[#B87333]/20">
                    {appt.type === "video" ? (
                      <Video className="h-4 w-4 text-[#B87333]" />
                    ) : (
                      <Clock className="h-4 w-4 text-[#B87333]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">{appt.title}</h4>
                    <p className="text-xs text-white/60">
                      {(() => {
                        try {
                          const date = new Date(appt.date);
                          if (isNaN(date.getTime())) return appt.date;
                          return date.toLocaleDateString(isSpanish ? "es-ES" : "en-US", {
                            weekday: "short", month: "short", day: "numeric",
                          });
                        } catch { return appt.date; }
                      })()} • {appt.time}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#B87333]/20 bg-[#B87333]/10 text-[#B87333] hover:border-[#B87333]/60 hover:bg-[#B87333]/20"
                    onClick={() => handleJoinAppointment(appt)}
                  >
                    {translations.joinSession}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-white/5 rounded-lg">
            <p className="text-white/70 mb-2">{translations.noAppointments}</p>
            <Button
              variant="outline"
              size="sm"
              className="border-[#B87333]/20 bg-[#B87333]/10 text-[#B87333] hover:border-[#B87333]/60 hover:bg-[#B87333]/20"
              onClick={() => navigate("/app/scheduling")}
            >
              {translations.scheduleNow}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
