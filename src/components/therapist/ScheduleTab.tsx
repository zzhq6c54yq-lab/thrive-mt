import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, MessageSquare, User } from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: string;
  client_name: string;
  appointment_date: string;
  duration_minutes: number;
  session_type: string;
  status: string;
}

interface ScheduleTabProps {
  appointments: Appointment[];
}

export default function ScheduleTab({ appointments }: ScheduleTabProps) {
  const navigate = useNavigate();

  const getSessionTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="h-3 w-3" />;
      case "phone":
        return <Phone className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {appointments
        .filter(apt => new Date(apt.appointment_date) >= new Date())
        .slice(0, 15)
        .map((apt) => (
          <div
            key={apt.id}
            className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#D4AF37]/5 to-[#B8941F]/5 border border-[#D4AF37]/30 rounded-xl hover:border-[#D4AF37]/50 transition-all group"
          >
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0 border-2 border-[#D4AF37]/40">
              <User className="h-8 w-8 text-[#D4AF37]" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h4 className="font-bold text-lg mb-1">{apt.client_name}</h4>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-[#D4AF37]" />
                      <span className="font-medium">{format(new Date(apt.appointment_date), "EEE, MMM d")}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#D4AF37]" />
                      <span className="font-medium">{format(new Date(apt.appointment_date), "h:mm a")}</span>
                    </div>
                    <span>•</span>
                    <span className="font-medium">{apt.duration_minutes} min</span>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(apt.status)}>
                  {apt.status}
                </Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate(`/therapist-dashboard?tab=clients`)}
                  className="border-[#D4AF37]/40 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10"
                >
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  Message Client
                </Button>
                {apt.session_type === "video" && (
                  <Button 
                    size="sm"
                    variant="default"
                    className="bg-[#D4AF37] hover:bg-[#B8941F] text-black font-semibold"
                  >
                    <Video className="h-4 w-4 mr-1.5" />
                    Join Session
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      
      {appointments.filter(apt => new Date(apt.appointment_date) >= new Date()).length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No upcoming sessions scheduled</p>
        </div>
      )}
    </div>
  );
}
