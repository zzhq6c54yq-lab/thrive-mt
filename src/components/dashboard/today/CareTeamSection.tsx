import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, MessageCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Appointment {
  id: string;
  appointment_date: string;
  session_type: string;
  therapist: {
    name: string;
    title: string;
    image_url: string | null;
  };
}

interface CareTeamSectionProps {
  appointments: Appointment[];
}

export default function CareTeamSection({ appointments }: CareTeamSectionProps) {
  const navigate = useNavigate();

  if (appointments.length === 0) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Your Next Steps with Your Care Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">No appointments scheduled</p>
            <Button onClick={() => navigate('/therapy-booking')}>
              Schedule a Session
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Your Next Steps with Your Care Team
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          You're not doing this alone. We've got your back.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments.map((appointment) => {
          const appointmentDate = new Date(appointment.appointment_date);
          const isToday = format(appointmentDate, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <div
              key={appointment.id}
              className="flex items-start gap-4 p-4 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-all"
            >
              {/* Therapist Avatar */}
              <div className="flex-shrink-0">
                {appointment.therapist.image_url ? (
                  <img
                    src={appointment.therapist.image_url}
                    alt={appointment.therapist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {appointment.therapist.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Appointment Details */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">
                  {appointment.session_type === 'initial' ? 'Initial Consultation' : 'Therapy Session'}
                  {' with '}
                  {appointment.therapist.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {appointment.therapist.title}
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {isToday ? 'Today' : format(appointmentDate, 'EEE, MMM d')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{format(appointmentDate, 'h:mm a')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button size="sm" className="whitespace-nowrap">
                  <Video className="w-3 h-3 mr-1" />
                  Join
                </Button>
                <Button size="sm" variant="outline" className="whitespace-nowrap">
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Message
                </Button>
              </div>
            </div>
          );
        })}

        {/* View All Button */}
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => navigate('/therapy-booking')}
        >
          View All Appointments
        </Button>
      </CardContent>
    </Card>
  );
}
