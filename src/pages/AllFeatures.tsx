import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getFeatures } from '@/components/dashboard/key-features/featuresData';

const categories = [
  { id: 'all', name: 'All Features' },
  { id: 'mental-health', name: 'Mental Health' },
  { id: 'therapeutic', name: 'Therapeutic' },
  { id: 'community', name: 'Community' },
  { id: 'wellness', name: 'Wellness' },
];

const categoryColors: Record<string, string> = {
  purple: 'mental-health',
  indigo: 'mental-health',
  blue: 'therapeutic',
  cyan: 'therapeutic',
  teal: 'therapeutic',
  green: 'wellness',
  emerald: 'wellness',
  pink: 'community',
  rose: 'community',
  amber: 'community',
  yellow: 'wellness',
  orange: 'wellness',
  red: 'therapeutic',
  violet: 'wellness',
  slate: 'wellness',
};

const gradientMap: Record<string, string> = {
  purple: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
  blue: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60',
  green: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
  indigo: 'from-[#B8941F]/20 to-[#D4AF37]/15 border-[#B8941F]/30 hover:border-[#B8941F]/60',
  yellow: 'from-[#D4AF37]/20 to-[#E5C5A1]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
  teal: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60',
  orange: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
  red: 'from-[#B8941F]/20 to-[#D4AF37]/15 border-[#B8941F]/30 hover:border-[#B8941F]/60',
  emerald: 'from-[#D4AF37]/20 to-[#E5C5A1]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
  violet: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60',
  pink: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
  slate: 'from-[#B8941F]/20 to-[#D4AF37]/15 border-[#B8941F]/30 hover:border-[#B8941F]/60',
  cyan: 'from-[#D4AF37]/20 to-[#E5C5A1]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
  rose: 'from-[#E5C5A1]/20 to-[#D4AF37]/15 border-[#E5C5A1]/30 hover:border-[#E5C5A1]/60',
  amber: 'from-[#D4AF37]/20 to-[#B8941F]/15 border-[#D4AF37]/30 hover:border-[#D4AF37]/60',
};

export default function AllFeatures() {
  const navigate = useNavigate();
  const features = getFeatures(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch = feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           categoryColors[feature.color] === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container relative z-10 px-4 py-20 mx-auto max-w-7xl">
          <Button
            variant="ghost"
            onClick={() => navigate('/app/dashboard')}
            className="mb-8 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Explore All Features
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-lg">
              Discover our complete suite of 24 powerful mental health and wellness tools
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-rose-500 text-black font-semibold border-0'
                      : 'border-white/20 text-gray-300 hover:bg-white/10'
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container px-4 py-16 mx-auto max-w-7xl">
        {filteredFeatures.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No features found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFeatures.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => navigate(feature.path)}
                className="group cursor-pointer"
              >
                <div
                  className={`
                    relative overflow-hidden rounded-xl p-6
                    bg-gradient-to-br ${gradientMap[feature.color] || gradientMap.purple}
                    border shadow-lg hover:shadow-2xl hover:shadow-${feature.color}-500/30
                    transition-all duration-300 h-full flex flex-col
                  `}
                >
                  {/* Popular Badge */}
                  {feature.popular && (
                    <Badge className="absolute top-3 right-3 bg-[#D4AF37] text-black text-xs font-semibold border-0">
                      Popular
                    </Badge>
                  )}

                  {/* Icon */}
                  <div className="mb-4 inline-flex p-4 bg-white/20 backdrop-blur-sm rounded-full w-fit">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-3 drop-shadow-lg">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/80 text-sm leading-relaxed drop-shadow-md flex-grow">
                    {feature.description}
                  </p>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-white hover:bg-white/10 font-semibold"
                    >
                      Explore Feature →
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
