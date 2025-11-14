import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone } from "lucide-react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";

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
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(apt => 
      isSameDay(new Date(apt.appointment_date), day)
    );
  };

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
    <div className="space-y-6">
      {/* Week View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Schedule</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Today</Button>
              <Button variant="outline" size="sm">Week</Button>
              <Button variant="outline" size="sm">Month</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day) => {
              const dayAppointments = getAppointmentsForDay(day);
              const isToday = isSameDay(day, today);
              
              return (
                <div key={day.toISOString()} className={`space-y-2 ${isToday ? 'ring-2 ring-primary rounded-lg p-2' : ''}`}>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">{format(day, "EEE")}</p>
                    <p className={`text-lg font-semibold ${isToday ? 'text-primary' : ''}`}>
                      {format(day, "d")}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {dayAppointments.map((apt) => (
                      <div
                        key={apt.id}
                        className="p-2 bg-primary/10 rounded text-xs border border-primary/20"
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {getSessionTypeIcon(apt.session_type)}
                          <span className="font-medium truncate">{apt.client_name}</span>
                        </div>
                        <p className="text-muted-foreground">
                          {format(new Date(apt.appointment_date), "h:mm a")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appointments
            .filter(apt => new Date(apt.appointment_date) >= new Date())
            .slice(0, 10)
            .map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{format(new Date(apt.appointment_date), "d")}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(apt.appointment_date), "MMM")}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">{apt.client_name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{format(new Date(apt.appointment_date), "h:mm a")}</span>
                      <span>•</span>
                      <span>{apt.duration_minutes} min</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {getSessionTypeIcon(apt.session_type)}
                        <span className="capitalize">{apt.session_type}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(apt.status)}>
                    {apt.status}
                  </Badge>
                  {apt.session_type === "video" && (
                    <Button size="sm">Join Session</Button>
                  )}
                </div>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
