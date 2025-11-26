import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Clock, Video, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  bookings: Array<{
    id: string;
    appointment_date: string;
    duration_minutes: number;
    status: string;
    profiles: {
      display_name: string | null;
      avatar_url: string | null;
    } | null;
  }>;
}

export function CalendarView({ bookings }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getAppointmentsForDay = (date: Date) => {
    return bookings.filter((booking) => {
      if (!booking?.appointment_date) return false;
      try {
        const bookingDate = new Date(booking.appointment_date);
        if (isNaN(bookingDate.getTime())) return false;
        return isSameDay(bookingDate, date);
      } catch {
        return false;
      }
    });
  };

  const previousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary/10 text-primary border-primary/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day) => {
            const appointments = getAppointmentsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDayToday = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "min-h-[140px] p-3 border rounded-lg transition-colors",
                  isCurrentMonth ? "bg-card" : "bg-muted/30",
                  isDayToday && "ring-2 ring-[#D4AF37]"
                )}
              >
                {/* Day Number */}
                <div className={cn(
                  "text-base font-semibold mb-2",
                  !isCurrentMonth && "text-muted-foreground",
                  isDayToday && "text-[#D4AF37] font-bold"
                )}>
                  {format(day, "d")}
                </div>

                {/* Appointments */}
                <div className="space-y-1">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className={cn(
                        "text-xs p-2 rounded-lg border cursor-pointer hover:shadow-md transition-all",
                        getStatusColor(appointment.status)
                      )}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-semibold">
                          {(() => {
                            try {
                              const date = new Date(appointment.appointment_date);
                              return isNaN(date.getTime()) ? "Invalid time" : format(date, "h:mm a");
                            } catch {
                              return "Invalid time";
                            }
                          })()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <User className="h-3.5 w-3.5 flex-shrink-0" />
                        <span className="truncate font-medium">
                          {appointment.profiles?.display_name || "Unknown Client"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-primary/10 border border-primary/20" />
          <span className="text-muted-foreground">Scheduled</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-emerald-500/10 border border-emerald-500/20" />
          <span className="text-muted-foreground">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-destructive/10 border border-destructive/20" />
          <span className="text-muted-foreground">Cancelled</span>
        </div>
      </div>
    </div>
  );
}
