import { Clock } from "lucide-react";

interface AvailabilityCalendarProps {
  availability: Array<{
    day_of_week: number;
    start_time: string;
    end_time: string;
  }>;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export default function AvailabilityCalendar({ availability }: AvailabilityCalendarProps) {
  const availabilityByDay = availability.reduce((acc, slot) => {
    if (!acc[slot.day_of_week]) {
      acc[slot.day_of_week] = [];
    }
    acc[slot.day_of_week].push(slot);
    return acc;
  }, {} as Record<number, typeof availability>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dayNames.map((day, index) => {
        const daySlots = availabilityByDay[index];
        return (
          <div
            key={index}
            className={`p-4 rounded-lg border ${
              daySlots
                ? 'bg-primary/5 border-primary/20'
                : 'bg-muted/30 border-border'
            }`}
          >
            <h4 className="font-semibold mb-2 text-foreground">{day}</h4>
            {daySlots ? (
              <div className="space-y-2">
                {daySlots.map((slot, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {formatTime(slot.start_time)} - {formatTime(slot.end_time)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Unavailable</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
