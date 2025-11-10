import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SharedCalendarEvent } from "@/types/database-extensions";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  events: SharedCalendarEvent[];
  currentMonth: Date;
  onEventClick?: (event: SharedCalendarEvent) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ events, currentMonth, onEventClick }) => {
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  }, [currentMonth]);

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_time);
      return isSameDay(eventDate, day);
    });
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-2">
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isCurrentDay = isToday(day);

          return (
            <Card
              key={index}
              className={cn(
                "min-h-[100px] p-2 relative",
                !isCurrentMonth && "bg-muted/30",
                isCurrentDay && "border-rose-500 border-2"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span
                  className={cn(
                    "text-sm font-medium",
                    !isCurrentMonth && "text-muted-foreground",
                    isCurrentDay && "text-rose-600 font-bold"
                  )}
                >
                  {format(day, 'd')}
                </span>
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map(event => (
                  <button
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className="w-full text-left"
                  >
                    <Badge
                      variant="secondary"
                      className="w-full text-xs py-0.5 px-1 truncate cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: event.color + '20', color: event.color }}
                    >
                      {format(new Date(event.start_time), 'h:mm a')} - {event.title}
                    </Badge>
                  </button>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground px-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
