import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MessageSquare, Video, ArrowRight, Shield, DollarSign, Clock, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DashboardData } from '@/hooks/useTodayDashboard';
import { AppointmentModal } from './AppointmentModal';
import { RequestTherapistContact } from '@/components/client/RequestTherapistContact';

interface CareHubSectionProps {
  dashboardData: DashboardData;
}

export const CareHubSection: React.FC<CareHubSectionProps> = ({ dashboardData }) => {
  const navigate = useNavigate();
  const hasTherapist = dashboardData.upcomingAppointments.length > 0;
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const nextAppointment = dashboardData.upcomingAppointments[0];

  if (!hasTherapist) {
    return (
      <div className="space-y-6">
        {/* Contact Dr. Damien Pena Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <RequestTherapistContact />
        </motion.div>

        {/* Card 1: Connect with a Licensed Therapist - Hero Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#D4AF37]/10 transition-all duration-300"
        >
          <div className="grid md:grid-cols-5 gap-0">
            {/* Hero Image Section */}
            <div className="md:col-span-2 relative h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80"
                alt="Professional therapy session"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/90 md:to-background"></div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-3 p-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
                Connect with a Licensed Therapist
              </h2>
              <p className="text-gray-200 mb-8 text-lg leading-relaxed">
                Professional therapy matched to your needs and preferences
              </p>

              <div className="grid gap-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Licensed & Vetted Professionals</h3>
                    <p className="text-sm text-muted-foreground">All therapists are thoroughly verified and credentialed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Flexible Scheduling</h3>
                    <p className="text-sm text-muted-foreground">Book sessions at times that work for your lifestyle</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Insurance Accepted</h3>
                    <p className="text-sm text-muted-foreground">Flexible payment options and sliding scale available</p>
                  </div>
                </div>
              </div>

              <Button 
                variant="gold" 
                size="lg" 
                onClick={() => navigate('/app/real-time-therapy')}
                className="w-full md:w-auto shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all"
              >
                Browse Therapists
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Build Your Care Team - Enhanced with Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
              Build Your Care Team
            </h2>
            <p className="text-gray-200 text-lg">
              Get matched with 3 therapists in just 2 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Step 1 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all group"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80"
                  alt="Questionnaire"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/90 to-[#B8941F]/80 group-hover:from-[#D4AF37]/80 group-hover:to-[#B8941F]/70 transition-all"></div>
              </div>
              <div className="relative p-6">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border-2 border-white/40">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-white">Tell us what you need</h3>
                <p className="text-sm text-white/90 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  2 minute questionnaire
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all group"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80"
                  alt="AI Matching"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/90 to-[#B8941F]/80 group-hover:from-[#D4AF37]/80 group-hover:to-[#B8941F]/70 transition-all"></div>
              </div>
              <div className="relative p-6">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border-2 border-white/40">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-white">Get 3 therapist matches</h3>
                <p className="text-sm text-white/90 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI-powered matching
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all group"
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                  alt="First Session"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/90 to-[#B8941F]/80 group-hover:from-[#D4AF37]/80 group-hover:to-[#B8941F]/70 transition-all"></div>
              </div>
              <div className="relative p-6">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 border-2 border-white/40">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-bold text-xl mb-2 text-white">Try your first session</h3>
                <p className="text-sm text-white/90 flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Start your journey
                </p>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <Button 
              variant="gold" 
              size="lg" 
              onClick={() => navigate('/real-time-therapy?matching=true')} 
              className="shadow-lg hover:shadow-xl hover:shadow-[#D4AF37]/20 transition-all"
            >
              Start Matching Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const therapist = nextAppointment.therapist;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border border-[#D4AF37]/40 rounded-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] bg-clip-text text-transparent">
        Your Care Team
      </h2>

      <div className="flex items-center gap-6 mb-8 p-6 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/30">
        <img
          src={therapist?.image_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=therapist'}
          alt={therapist?.name || 'Therapist'}
          className="w-20 h-20 rounded-full border-3 border-[#D4AF37] shadow-lg"
        />
        <div>
          <h3 className="text-xl font-bold mb-1">{therapist?.name || 'Your Therapist'}</h3>
          <p className="text-muted-foreground">{therapist?.title || 'Licensed Therapist'}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h4 className="font-semibold text-lg">Next Session</h4>
        </div>
        <p className="text-2xl font-bold mb-6 text-gray-200">
          {format(new Date(nextAppointment.appointment_date), 'EEEE, MMM d – h:mm a')}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button 
            size="default" 
            variant="outline" 
            className="border-[#D4AF37]/40 hover:border-[#D4AF37]/60"
            onClick={() => setSelectedAppointment(nextAppointment)}
          >
            View Details
          </Button>
          <Button 
            size="default" 
            variant="outline" 
            className="border-[#D4AF37]/40 hover:border-[#D4AF37]/60"
            onClick={() => navigate('/real-time-therapy')}
          >
            Reschedule
          </Button>
          <Button 
            size="default" 
            variant="gold" 
            className="shadow-md hover:shadow-lg"
            onClick={() => navigate(`/app/client-video-session/${nextAppointment.id}`)}
          >
            <Video className="w-4 h-4 mr-2" />
            Join Video Call
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-muted-foreground mb-4">Between Sessions</p>
        <Button 
          variant="default"
          size="lg" 
          className="w-full justify-start bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-black font-semibold shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate('/messages')}
        >
          <MessageSquare className="w-5 h-5 mr-3" />
          Message My Therapist
        </Button>
        <Button 
          variant="ghost" 
          size="default" 
          className="w-full justify-start hover:bg-[#D4AF37]/10 text-base"
          onClick={() => navigate('/journal')}
        >
          <ArrowRight className="w-5 h-5 mr-3 text-[#D4AF37]" />
          Share today's journal summary
        </Button>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <AppointmentModal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          appointment={{
            therapist_name: therapist?.name || 'Your Therapist',
            therapist_title: therapist?.title || 'Licensed Therapist',
            appointment_date: selectedAppointment.appointment_date,
            duration_minutes: selectedAppointment.duration_minutes || 50,
            session_type: selectedAppointment.session_type || 'individual',
            notes: selectedAppointment.notes
          }}
        />
      )}
    </motion.div>
  );
};
