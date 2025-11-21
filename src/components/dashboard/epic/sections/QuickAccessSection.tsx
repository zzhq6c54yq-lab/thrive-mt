import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getFeatures } from '@/components/dashboard/key-features/featuresData';
import { ArrowRight } from 'lucide-react';

const gradientMap: Record<string, string> = {
  purple: 'from-purple-500/20 to-indigo-600/20 border-purple-500/30 hover:border-purple-500/50 hover:shadow-purple-500/30',
  blue: 'from-blue-500/20 to-cyan-600/20 border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-500/30',
  green: 'from-green-500/20 to-emerald-600/20 border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/30',
  indigo: 'from-indigo-500/20 to-violet-600/20 border-indigo-500/30 hover:border-indigo-500/50 hover:shadow-indigo-500/30',
  yellow: 'from-yellow-500/20 to-amber-600/20 border-yellow-500/30 hover:border-yellow-500/50 hover:shadow-yellow-500/30',
  teal: 'from-teal-500/20 to-cyan-600/20 border-teal-500/30 hover:border-teal-500/50 hover:shadow-teal-500/30',
  orange: 'from-orange-500/20 to-amber-600/20 border-orange-500/30 hover:border-orange-500/50 hover:shadow-orange-500/30',
  red: 'from-red-500/20 to-rose-600/20 border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/30',
  emerald: 'from-emerald-500/20 to-green-600/20 border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-emerald-500/30',
  violet: 'from-violet-500/20 to-purple-600/20 border-violet-500/30 hover:border-violet-500/50 hover:shadow-violet-500/30',
  pink: 'from-pink-500/20 to-rose-600/20 border-pink-500/30 hover:border-pink-500/50 hover:shadow-pink-500/30',
  slate: 'from-slate-500/20 to-gray-600/20 border-slate-500/30 hover:border-slate-500/50 hover:shadow-slate-500/30',
  cyan: 'from-cyan-500/20 to-teal-600/20 border-cyan-500/30 hover:border-cyan-500/50 hover:shadow-cyan-500/30',
  rose: 'from-rose-500/20 to-pink-600/20 border-rose-500/30 hover:border-rose-500/50 hover:shadow-rose-500/30',
  amber: 'from-amber-500/20 to-orange-600/20 border-amber-500/30 hover:border-amber-500/50 hover:shadow-amber-500/30',
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
          onClick={() => navigate('/all-features')}
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
          onClick={() => navigate('/all-features')}
          className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          View All Features
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
