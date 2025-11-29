import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Phone, Video, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import CoachingInfoModal from './CoachingInfoModal';

const CoachingSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative group"
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#141921] to-[#1a2332] border border-bronze-300/20 hover:border-bronze-300/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:scale-[1.02]">
          {/* Header Section */}
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bronze-500 to-bronze-600 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-bronze-300 via-bronze-200 to-bronze-300 bg-clip-text text-transparent">
                    Mental Wellness Coaching
                  </h2>
                  <p className="text-bronze-100 text-sm">Affordable support. Real guidance. A better you.</p>
                </div>
              </div>
              <span className="bg-bronze-500/20 text-bronze-300 text-xs font-bold px-3 py-1 rounded-full">
                NEW
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Your first, most accessible level of support - start with coaching, step into therapy only if you need it. Get daily guidance, build healthier habits, and create the life you want.
            </p>

            {/* Quick Features */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-[#1a2332] px-3 py-2 rounded-lg border border-bronze-300/10">
                <MessageCircle className="w-4 h-4 text-bronze-300" />
                <span className="text-sm text-muted-foreground">Unlimited Messaging</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1a2332] px-3 py-2 rounded-lg border border-bronze-300/10">
                <Phone className="w-4 h-4 text-bronze-300" />
                <span className="text-sm text-muted-foreground">Audio Calls</span>
              </div>
              <div className="flex items-center gap-2 bg-[#1a2332] px-3 py-2 rounded-lg border border-bronze-300/10">
                <Video className="w-4 h-4 text-bronze-300" />
                <span className="text-sm text-muted-foreground">Video Sessions</span>
              </div>
            </div>

            {/* Pricing Teaser & CTA */}
            <div className="space-y-3 pt-4 border-t border-bronze-300/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-2xl font-bold text-bronze-300">
                    $29<span className="text-sm text-muted-foreground">/week</span>
                  </p>
                </div>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  variant="outline"
                  className="border-bronze-300/30 hover:bg-bronze-500/10"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <Button
                onClick={() => navigate('/coach-questionnaire')}
                className="w-full bg-gradient-to-r from-bronze-500 to-bronze-600 hover:from-bronze-600 hover:to-bronze-700 text-white group"
                size="lg"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Find Your Coach
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual Enhancement - Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/5 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>

      {/* Info Modal */}
      <CoachingInfoModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default CoachingSection;
