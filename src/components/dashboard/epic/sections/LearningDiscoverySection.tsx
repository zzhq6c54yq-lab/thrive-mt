import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import WorkshopsCarouselSection from './WorkshopsCarouselSection';
import AssessmentsCarouselSection from './AssessmentsCarouselSection';

interface LearningDiscoverySectionProps {
  trackClick?: (sectionId: string, metadata?: Record<string, any>) => void;
}

const LearningDiscoverySection: React.FC<LearningDiscoverySectionProps> = ({ trackClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#E5C5A1] rounded-full blur-lg opacity-50" />
          <GraduationCap className="h-8 w-8 text-[#D4AF37] relative" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] via-[#E5C5A1] to-[#D4AF37] bg-clip-text text-transparent">
            Learning & Self-Discovery
          </h2>
          <p className="text-muted-foreground mt-1">
            Explore workshops and assessments designed to help you grow, understand yourself, and build lasting skills
          </p>
        </div>
      </div>

      {/* Side-by-Side Carousels */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Workshops */}
        <WorkshopsCarouselSection trackClick={trackClick} />

        {/* Mental Health Assessments */}
        <AssessmentsCarouselSection trackClick={trackClick} />
      </div>
    </motion.div>
  );
};

export default LearningDiscoverySection;
