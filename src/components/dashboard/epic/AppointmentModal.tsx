import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Video, MapPin, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: {
    therapist_name: string;
    therapist_title: string;
    appointment_date: string;
    duration_minutes: number;
    session_type: string;
    notes?: string;
  };
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  appointment,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-[#D4AF37]/40 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#D4AF37]">
            Appointment Details
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Your upcoming session with {appointment.therapist_name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Therapist Info */}
          <div className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50">
            <p className="text-lg font-semibold">{appointment.therapist_name}</p>
            <p className="text-sm text-gray-400">{appointment.therapist_title}</p>
          </div>

          {/* Date & Time */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <p className="text-sm text-gray-400">Date</p>
              <p className="font-medium">
                {format(new Date(appointment.appointment_date), 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <p className="text-sm text-gray-400">Time</p>
              <p className="font-medium">
                {format(new Date(appointment.appointment_date), 'h:mm a')} ({appointment.duration_minutes} min)
              </p>
            </div>
          </div>

          {/* Session Type */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30">
            <Video className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <p className="text-sm text-gray-400">Session Type</p>
              <p className="font-medium capitalize">{appointment.session_type}</p>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/30">
              <FileText className="w-5 h-5 text-[#D4AF37] mt-0.5" />
              <div>
                <p className="text-sm text-gray-400">Notes</p>
                <p className="text-sm mt-1">{appointment.notes}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:opacity-90"
              onClick={() => {
                // Handle join video call
                onClose();
              }}
            >
              <Video className="w-4 h-4 mr-2" />
              Join Video Call
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-700 hover:bg-gray-800"
              onClick={() => {
                // Handle reschedule
                onClose();
              }}
            >
              Reschedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
