
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Video } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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

  // Mock data for appointments with translations
  const appointments = [
    {
      id: 1,
      title: isSpanish ? "Sesión de Terapia con Dr. Johnson" : "Therapy Session with Dr. Johnson",
      date: "2023-06-15",
      time: isSpanish ? "10:00 AM" : "10:00 AM",
      type: "video",
    },
    {
      id: 2,
      title: isSpanish ? "Taller de Mindfulness" : "Mindfulness Workshop",
      date: "2023-06-18",
      time: isSpanish ? "2:00 PM" : "2:00 PM",
      type: "group",
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
    <Card className="border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 shadow-sm hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-[#B87333]" />
          {translations.title}
        </CardTitle>
        <CardDescription>{translations.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center p-3 border border-border rounded-md bg-background hover:bg-accent/10 transition-colors"
              >
                <div className="mr-4 p-2 bg-[#B87333]/10 rounded-full">
                  {appointment.type === "video" ? (
                    <Video className="h-4 w-4 text-[#B87333]" />
                  ) : (
                    <Clock className="h-4 w-4 text-[#B87333]" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{appointment.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {new Date(appointment.date).toLocaleDateString(isSpanish ? "es-ES" : "en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    • {appointment.time}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-[#B87333]/20 hover:border-[#B87333]/60 hover:bg-[#B87333]/5"
                  onClick={() => handleJoinAppointment(appointment.id)}
                >
                  {translations.joinSession}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>{translations.noAppointments}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-[#B87333]/20 hover:border-[#B87333]/60 hover:bg-[#B87333]/5"
              onClick={handleScheduleNow}
            >
              {translations.scheduleNow}
            </Button>
          </div>
        )}
        <div className="mt-3 text-center">
          <Button
            variant="link"
            className="text-sm text-[#B87333] hover:text-[#A56625]"
            onClick={handleViewAllAppointments}
          >
            {translations.viewAll}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
