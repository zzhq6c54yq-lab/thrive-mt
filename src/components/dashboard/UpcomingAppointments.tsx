
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Video, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const UpcomingAppointments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSpanish, setIsSpanish] = useState<boolean>(false);
  
  // Check language preference and listen for changes
  useEffect(() => {
    const checkLanguage = () => {
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setIsSpanish(preferredLanguage === 'Español');
    };
    
    // Check initial language
    checkLanguage();
    
    // Listen for language change events
    window.addEventListener('languageChange', checkLanguage);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', checkLanguage);
    };
  }, []);

  // Translations
  const translations = {
    title: isSpanish ? "Próximas Citas" : "Upcoming Appointments",
    description: isSpanish ? "Tus sesiones y eventos programados" : "Your scheduled sessions and events",
    joinSession: isSpanish ? "Unirse" : "Join",
    viewAll: isSpanish ? "Ver Todas las Citas" : "View All Appointments",
    noAppointments: isSpanish ? "No hay citas próximas" : "No upcoming appointments",
    scheduleNow: isSpanish ? "Programar Ahora" : "Schedule Now",
    joiningSession: isSpanish ? "Uniéndose a la Sesión" : "Joining Session",
    connecting: isSpanish ? "Conectándose a tu cita..." : "Connecting to your appointment...",
    openingSchedule: isSpanish ? "Abriendo Calendario" : "Opening Schedule",
    takingToSchedule: isSpanish ? "Llevándote a tu calendario completo de citas" : "Taking you to your full appointment schedule",
  };

  // Generate dynamic future dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  // Mock data for appointments with translations
  const appointments = [
    {
      id: 1,
      title: isSpanish ? "Sesión de Terapia con Dr. Johnson" : "Therapy Session with Dr. Johnson",
      date: tomorrow.toISOString().split('T')[0],
      time: isSpanish ? "10:00 AM" : "10:00 AM",
      type: "video",
      color: "from-purple-600 to-violet-500"
    },
    {
      id: 2,
      title: isSpanish ? "Taller de Mindfulness" : "Mindfulness Workshop",
      date: nextWeek.toISOString().split('T')[0],
      time: isSpanish ? "2:00 PM" : "2:00 PM",
      type: "group",
      color: "from-blue-500 to-cyan-400"
    },
  ];

  const handleJoinAppointment = (appointmentId: number) => {
    toast({
      title: translations.joiningSession,
      description: translations.connecting,
      duration: 1500,
    });
    // In a real app, this would navigate to the meeting room
    console.log(`Joining appointment: ${appointmentId}`);
    navigate("/virtual-meetings");
  };

  const handleViewAllAppointments = () => {
    toast({
      title: translations.openingSchedule,
      description: translations.takingToSchedule,
      duration: 1500,
    });
    navigate("/scheduling");
  };

  const handleScheduleNow = () => {
    toast({
      title: isSpanish ? "Programar Cita" : "Schedule Appointment",
      description: isSpanish ? "Abriendo programación de citas" : "Opening appointment scheduling",
      duration: 1500,
    });
    navigate("/scheduling");
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
            onClick={handleViewAllAppointments}
          >
            {translations.viewAll}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
        <CardDescription className="text-white/60">{translations.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                className="relative overflow-hidden rounded-lg"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className={`absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b ${appointment.color}`}></div>
                <div className="flex items-center p-3 bg-white/10 backdrop-blur-sm rounded-md hover:bg-white/15 transition-colors">
                  <div className="mr-4 p-2 rounded-full bg-[#B87333]/20">
                    {appointment.type === "video" ? (
                      <Video className="h-4 w-4 text-[#B87333]" />
                    ) : (
                      <Clock className="h-4 w-4 text-[#B87333]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white">{appointment.title}</h4>
                    <p className="text-xs text-white/60">
                      {(() => {
                        try {
                          const date = new Date(appointment.date);
                          if (isNaN(date.getTime())) {
                            return appointment.date;
                          }
                          return date.toLocaleDateString(isSpanish ? "es-ES" : "en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          });
                        } catch {
                          return appointment.date;
                        }
                      })()}{" "}
                      • {appointment.time}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#B87333]/20 bg-[#B87333]/10 text-[#B87333] hover:border-[#B87333]/60 hover:bg-[#B87333]/20"
                    onClick={() => handleJoinAppointment(appointment.id)}
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
              onClick={handleScheduleNow}
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
