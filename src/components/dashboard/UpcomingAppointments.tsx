
import React, { useState, useEffect } from "react";
import { Calendar, Clock, Video, User, ArrowRight, UserPlus } from "lucide-react";
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
      therapistImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      title: isSpanish ? "Taller de Mindfulness" : "Mindfulness Workshop",
      date: "2023-06-18",
      time: isSpanish ? "2:00 PM" : "2:00 PM",
      type: "group",
      therapistImage: null, 
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
    <Card className="bg-white backdrop-blur-md rounded-xl overflow-hidden border border-amber-100 hover:shadow-lg transition-all">
      <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-300"></div>
      <CardHeader className="pb-2 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-amber-100">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              {translations.title}
            </CardTitle>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-xs border border-amber-200 text-amber-700 hover:bg-amber-50"
            onClick={handleScheduleNow}
          >
            <UserPlus className="h-3.5 w-3.5 mr-1" />
            {translations.scheduleNow}
          </Button>
        </div>
        <CardDescription className="text-amber-700/70 ml-9">
          {translations.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4">
        {appointments.length > 0 ? (
          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center p-3 border border-amber-100 rounded-md bg-white hover:bg-amber-50/50 transition-colors"
              >
                {appointment.therapistImage ? (
                  <div className="mr-3 relative">
                    <img 
                      src={appointment.therapistImage}
                      alt="Therapist"
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-amber-200">
                      {appointment.type === "video" ? (
                        <Video className="h-3 w-3 text-emerald-500" />
                      ) : (
                        <User className="h-3 w-3 text-blue-500" />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mr-3 p-2 bg-amber-100/50 rounded-full">
                    {appointment.type === "video" ? (
                      <Video className="h-5 w-5 text-amber-700" />
                    ) : (
                      <User className="h-5 w-5 text-amber-700" />
                    )}
                  </div>
                )}
                
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">{appointment.title}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center text-amber-700/70">
                      <Calendar className="h-3 w-3 mr-1" />
                      <p className="text-xs">
                        {new Date(appointment.date).toLocaleDateString(isSpanish ? "es-ES" : "en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-amber-700/70">
                      <Clock className="h-3 w-3 mr-1" />
                      <p className="text-xs">{appointment.time}</p>
                    </div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 border-amber-200 text-amber-800 hover:bg-amber-100/50 hover:text-amber-900"
                  onClick={() => handleJoinAppointment(appointment.id)}
                >
                  {translations.joinSession}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-amber-50/50 rounded-lg border border-dashed border-amber-200">
            <Calendar className="h-8 w-8 mx-auto text-amber-300 mb-2" />
            <p className="text-amber-800">{translations.noAppointments}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-amber-200 text-amber-700 hover:bg-amber-100/50"
              onClick={handleScheduleNow}
            >
              {translations.scheduleNow}
            </Button>
          </div>
        )}
        
        <div className="mt-4 flex justify-end">
          <Button
            variant="link"
            className="text-sm text-amber-700 hover:text-amber-900 p-0"
            onClick={handleViewAllAppointments}
          >
            {translations.viewAll}
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
