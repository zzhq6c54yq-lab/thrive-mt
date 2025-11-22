import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Heart, 
  Brain, 
  Users, 
  Sparkles, 
  Music, 
  BookOpen, 
  Activity,
  Palette,
  Search,
  Briefcase,
  Dumbbell
} from 'lucide-react';
import { useLayoutTracking } from '@/hooks/useLayoutTracking';
import { useUser } from '@/contexts/UserContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ToolkitSectionProps {
  userGoals: string[];
}

export default function ToolkitSection({ userGoals }: ToolkitSectionProps) {
  const navigate = useNavigate();
  const { user, profile } = useUser();
  const { trackClick } = useLayoutTracking({ 
    sectionId: 'toolkit',
    trackScroll: true,
    trackClicks: true,
    trackTime: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Unified list of all features/tools
  const allTools = [
    { name: 'Real-Time Therapy', path: '/therapy', description: 'Book sessions with licensed therapists', icon: Heart, imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&q=80' },
    { name: 'Between-Session Companion', path: '/mini-session', description: 'AI-powered micro-work between sessions', icon: Sparkles, imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80' },
    { name: 'Therapist Messaging', path: '/messages', description: 'Stay connected with your care team', icon: Users, imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&q=80' },
    { name: 'Daily Challenges', path: '/wellness-challenges', description: 'Complete challenges, earn rewards', icon: Activity, imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80' },
    { name: 'Mood Tracking', path: '/mood-tracker', description: 'Track your emotional patterns', icon: Heart, imageUrl: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?w=500&q=80' },
    { name: 'Journaling', path: '/journaling', description: 'Express your thoughts and feelings', icon: BookOpen, imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80' },
    { name: 'Gratitude Visualizer', path: '/gratitude', description: 'Visualize what you\'re grateful for', icon: Sparkles, imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&q=80' },
    { name: 'Mental Health Assessments', path: '/mental-wellness', description: 'PHQ-9, GAD-7, PSS-10 and more', icon: Brain, imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80' },
    { name: 'Breathing Exercises', path: '/breathing', description: 'Calm your mind and body', icon: Activity, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80' },
    { name: 'Meditation Studio', path: '/meditation', description: 'Guided meditation sessions', icon: Brain, imageUrl: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=500&q=80' },
    { name: 'Binaural Beats', path: '/binaural-beats', description: 'Sound therapy for relaxation', icon: Music, imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80' },
    { name: 'Art Therapy', path: '/art-therapy', description: 'Express yourself through art', icon: Palette, imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&q=80' },
    { name: 'Music Therapy', path: '/music-therapy', description: 'Healing through music', icon: Music, imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=500&q=80' },
    { name: 'Video Diary', path: '/video-diary', description: 'Record your journey', icon: Activity, imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80' },
    { name: 'Support Wall', path: '/support-wall', description: 'Share and connect with others', icon: Users, imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&q=80' },
    { name: 'Workshops', path: '/workshops', description: 'Live and recorded workshops', icon: BookOpen, imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&q=80' },
    { name: 'Dear Henry', path: '/henry', description: 'Anonymous advice and wisdom', icon: Heart, imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80' },
    { name: 'Resource Library', path: '/resources', description: 'Educational materials', icon: BookOpen, imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80' },
    { name: 'Games & Quizzes', path: '/games-and-quizzes', description: 'Fun and educational activities', icon: Sparkles, imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80' },
    { name: 'Career Coaching', path: '/career-coaching', description: 'Professional development', icon: Briefcase, imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80' },
    { name: 'Sleep Tracker', path: '/sleep-tracker', description: 'Monitor your sleep patterns', icon: Activity, imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80' },
    { name: 'Alternative Therapies', path: '/alternative-therapies', description: 'Explore holistic options', icon: Heart, imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=80' },
    { name: 'Wellness Challenges', path: '/wellness-challenges', description: 'Physical wellness goals', icon: Dumbbell, imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80' },
  ];

  const filteredTools = allTools.filter(tool =>
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Wellness Toolkit</h2>
          <p className="text-sm text-gray-400">Swipe to explore all features</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      {/* Horizontal Carousel */}
      {filteredTools.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <CarouselItem key={tool.path} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Card
                    onClick={() => {
                      trackClick({ toolPath: tool.path });
                      navigate(tool.path);
                    }}
                    className="group cursor-pointer overflow-hidden border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 h-[400px] relative"
                  >
                    {/* Cover Image with Gradient Overlay */}
                    <div className="absolute inset-0">
                      <img 
                        src={tool.imageUrl} 
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top - Icon */}
                      <div className="flex justify-start">
                        <div className="p-3 rounded-xl bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30">
                          <Icon className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                      </div>
                      
                      {/* Bottom - Title & Description */}
                      <div className="space-y-2">
                        <h3 className="font-bold text-white text-xl group-hover:text-[#D4AF37] transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-gray-900/90 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-gray-800 hover:border-[#D4AF37]/60" />
          <CarouselNext className="hidden md:flex -right-4 bg-gray-900/90 border-[#D4AF37]/30 text-[#D4AF37] hover:bg-gray-800 hover:border-[#D4AF37]/60" />
        </Carousel>
      ) : (
        <div className="text-center py-12 text-gray-400">
          No tools found matching "{searchQuery}"
        </div>
      )}
    </Card>
  );
}
