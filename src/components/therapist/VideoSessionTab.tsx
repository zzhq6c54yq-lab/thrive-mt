import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TherapistVideoSession from "./TherapistVideoSession";

interface VideoSessionTabProps {
  hasActiveSession?: boolean;
  upcomingBookings?: Array<{
    id: string;
    user_id: string;
    appointment_date: string;
    duration_minutes: number;
    session_type?: string;
    profiles?: {
      display_name?: string;
      avatar_url?: string;
    };
  }>;
}

const VideoSessionTab: React.FC<VideoSessionTabProps> = ({ 
  hasActiveSession = false, 
  upcomingBookings = [] 
}) => {
  const navigate = useNavigate();

  // If there's an active session, show the full video interface
  if (hasActiveSession) {
    return <TherapistVideoSession />;
  }

  // Otherwise, show the no active session view
  return (
    <div className="space-y-6">
      {/* No Active Session Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="p-6 rounded-full bg-gradient-to-br from-[#B87333]/20 to-[#D4AF37]/20 border-2 border-[#D4AF37]/30">
              <Video className="h-16 w-16 text-[#D4AF37]" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#B87333] via-[#D4AF37] to-[#B87333] bg-clip-text text-transparent">
                No Active Session
              </h2>
              <p className="text-gray-400 text-lg">
                Start a video session with a scheduled client or begin an ad-hoc call
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Upcoming Sessions */}
      {upcomingBookings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#B87333] to-[#D4AF37]">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Upcoming Sessions</h3>
            </div>

            <div className="space-y-4">
              {upcomingBookings.slice(0, 5).map((booking) => {
                const appointmentDate = new Date(booking.appointment_date);
                const isToday = appointmentDate.toDateString() === new Date().toDateString();
                const isSoon = (appointmentDate.getTime() - Date.now()) < 3600000; // Within 1 hour

                return (
                  <Card
                    key={booking.id}
                    className={`p-4 border ${
                      isSoon
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-gray-700/50 bg-gray-900/50'
                    } transition-all duration-300 hover:border-[#D4AF37]/50`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Client Avatar */}
                        <div className="relative">
                          {booking.profiles?.avatar_url ? (
                            <img
                              src={booking.profiles.avatar_url}
                              alt={booking.profiles.display_name || 'Client'}
                              className="w-12 h-12 rounded-full border-2 border-[#D4AF37]"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] flex items-center justify-center">
                              <User className="h-6 w-6 text-[#D4AF37]" />
                            </div>
                          )}
                          {isSoon && (
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse" />
                          )}
                        </div>

                        {/* Session Info */}
                        <div>
                          <h4 className="font-semibold text-white">
                            {booking.profiles?.display_name || 'Client'}
                          </h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {appointmentDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                              {isToday && <span className="text-[#D4AF37] ml-1">(Today)</span>}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {appointmentDate.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </span>
                            <span>{booking.duration_minutes} min</span>
                          </div>
                          {booking.session_type && (
                            <span className="text-xs text-gray-500 mt-1 inline-block">
                              {booking.session_type}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => navigate(`/app/therapist-video-session?id=${booking.id}&clientId=${booking.user_id}`)}
                          className={`${
                            isSoon
                              ? 'bg-gradient-to-r from-[#B87333] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B87333]'
                              : 'bg-gray-700 hover:bg-gray-600'
                          } text-white transition-all duration-300`}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          {isSoon ? 'Join Now' : 'Start Session'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Quick Start Option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Start</h3>
            <p className="text-gray-400 text-sm">
              Begin an unscheduled video session for emergency consultations or walk-ins
            </p>
            <Button
              onClick={() => navigate('/app/therapist-video-session')}
              variant="outline"
              className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]"
            >
              <Video className="h-4 w-4 mr-2" />
              Start Ad-Hoc Session
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default VideoSessionTab;
