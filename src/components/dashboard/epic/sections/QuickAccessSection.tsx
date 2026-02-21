import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getFeatures } from '@/components/dashboard/key-features/featuresData';
import { ArrowRight } from 'lucide-react';

const gradientMap: Record<string, string> = {
  purple: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
  blue: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60 hover:shadow-[#E5C5A1]/30',
  green: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
  indigo: 'from-[#B8941F]/20 to-[#D4AF37]/15 border-[#B8941F]/30 hover:border-[#B8941F]/60 hover:shadow-[#B8941F]/30',
  yellow: 'from-[#D4AF37]/20 to-[#E5C5A1]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
  teal: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60 hover:shadow-[#E5C5A1]/30',
  orange: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
  red: 'from-[#B8941F]/20 to-[#D4AF37]/15 border-[#B8941F]/30 hover:border-[#B8941F]/60 hover:shadow-[#B8941F]/30',
  emerald: 'from-[#D4AF37]/20 to-[#E5C5A1]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
  violet: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60 hover:shadow-[#E5C5A1]/30',
  pink: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
  slate: 'from-[#B8941F]/20 to-[#D4AF37]/15 border-[#B8941F]/30 hover:border-[#B8941F]/60 hover:shadow-[#B8941F]/30',
  cyan: 'from-[#D4AF37]/20 to-[#E5C5A1]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
  rose: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60 hover:shadow-[#E5C5A1]/30',
  amber: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:shadow-[#D4AF37]/30',
};

export default function QuickAccessSection() {
  const navigate = useNavigate();
  const features = getFeatures(false);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            Quick Access
          </h2>
          <p className="text-gray-400">
            Jump straight into any of our 24 powerful features
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/app/all-features')}
          className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 hidden md:flex"
        >
          View All Features
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03, duration: 0.3 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => navigate(feature.path)}
            className="group cursor-pointer"
          >
            <div
              className={`
                relative overflow-hidden rounded-xl p-5
                bg-gradient-to-br ${gradientMap[feature.color] || gradientMap.purple}
                border shadow-lg hover:shadow-2xl
                transition-all duration-300
              `}
            >
              {/* Popular Badge */}
              {feature.popular && (
                <Badge className="absolute top-2 right-2 bg-[#D4AF37] text-black text-xs font-semibold border-0">
                  Popular
                </Badge>
              )}

              {/* Icon */}
              <div className="mb-3 inline-flex p-3 bg-white/20 backdrop-blur-sm rounded-full">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base mb-2 drop-shadow-lg line-clamp-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-xs leading-relaxed drop-shadow-md line-clamp-2">
                {feature.description}
              </p>

              {/* Hover Arrow */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-white drop-shadow-lg" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile View All Button */}
      <div className="md:hidden">
        <Button
          variant="outline"
          onClick={() => navigate('/app/all-features')}
          className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          View All Features
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
