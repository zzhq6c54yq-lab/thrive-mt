import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Map, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLifeTransitions } from '@/hooks/useLifeTransitions';
import { useUser } from '@/contexts/UserContext';

export default function LifeChallengesShortcutSection() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { programs, enrollments, isLoading } = useLifeTransitions(user?.id);

  // Show enrolled programs or featured programs
  const displayPrograms = React.useMemo(() => {
    if (enrollments && enrollments.length > 0) {
      // Show enrolled programs with calculated progress
      return enrollments.slice(0, 3).map(enrollment => {
        const program = enrollment.program;
        if (!program) return null;
        
        // Calculate progress based on current week vs total weeks
        const progress = Math.round((enrollment.current_week / program.duration_weeks) * 100);
        
        return { ...program, progress };
      }).filter(Boolean);
    }
    // Show featured programs
    return programs?.slice(0, 3) || [];
  }, [programs, enrollments]);

  return (
    <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Map className="w-6 h-6 text-[#D4AF37]" />
            Life Transitions
          </h2>
          <p className="text-sm text-gray-400">Guided support through major life events</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/app/life-transitions')}
          className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          Explore All
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-400">Loading programs...</div>
      ) : displayPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayPrograms.map((program: any, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card
                onClick={() => navigate('/app/life-transitions')}
                className="group cursor-pointer overflow-hidden border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 h-[200px] relative"
              >
                {/* Cover Image */}
                <div className="absolute inset-0">
                  <img 
                    src={program.cover_image_url} 
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-start">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30">
                      <Heart className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                      {program.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2">
                      {program.description}
                    </p>
                    {program.progress !== undefined && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#D4AF37] transition-all duration-300"
                            style={{ width: `${program.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{program.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Sparkles className="w-12 h-12 text-[#D4AF37]/50 mx-auto mb-3" />
          <p className="text-gray-400 mb-4">Discover programs to guide you through life's transitions</p>
          <Button
            onClick={() => navigate('/app/life-transitions')}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B87333] text-white hover:opacity-90"
          >
            Browse Programs
          </Button>
        </div>
      )}
    </Card>
  );
}
