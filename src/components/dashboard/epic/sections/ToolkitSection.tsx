import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  ChevronDown,
  ChevronUp,
  Briefcase,
  Dumbbell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ToolCategoryCard from '../widgets/ToolCategoryCard';
import { useLayoutTracking } from '@/hooks/useLayoutTracking';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';

interface ToolkitSectionProps {
  userGoals: string[];
}

export default function ToolkitSection({ userGoals }: ToolkitSectionProps) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { trackClick } = useLayoutTracking({ 
    sectionId: 'toolkit',
    trackScroll: true,
    trackClicks: true,
    trackTime: true
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toolkitCategories = [
    {
      id: 'therapy',
      name: 'Therapy & Professional Support',
      icon: Heart,
      color: 'from-rose-500 to-pink-500',
      tools: [
        { name: 'Real-Time Therapy', path: '/therapy', description: 'Book sessions with licensed therapists' },
        { name: 'Between-Session Companion', path: '/mini-session', description: 'AI-powered micro-work between sessions' },
        { name: 'Therapist Messaging', path: '/messages', description: 'Stay connected with your care team' },
      ]
    },
    {
      id: 'daily-wellness',
      name: 'Daily Wellness',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      tools: [
        { name: 'Daily Challenges', path: '/wellness-challenges', description: 'Complete challenges, earn rewards' },
        { name: 'Mood Tracking', path: '/mood-tracker', description: 'Track your emotional patterns' },
        { name: 'Journaling', path: '/journaling', description: 'Express your thoughts and feelings' },
        { name: 'Gratitude Visualizer', path: '/gratitude', description: 'Visualize what you\'re grateful for' },
      ]
    },
    {
      id: 'mental-health',
      name: 'Mental Health Tools',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      tools: [
        { name: 'Mental Health Assessments', path: '/mental-wellness', description: 'PHQ-9, GAD-7, PSS-10 and more' },
        { name: 'Breathing Exercises', path: '/breathing', description: 'Calm your mind and body' },
        { name: 'Meditation Studio', path: '/meditation', description: 'Guided meditation sessions' },
        { name: 'Binaural Beats', path: '/binaural-beats', description: 'Sound therapy for relaxation' },
      ]
    },
    {
      id: 'specialized-programs',
      name: 'Specialized Programs',
      icon: Users,
      color: 'from-purple-500 to-violet-500',
      tools: [
        { name: 'Veterans Portal', path: '/dod-welcome', description: 'Resources for veterans' },
        { name: 'Cancer Support', path: '/cancer-support-welcome', description: 'Support for cancer patients' },
        { name: 'Single Parents', path: '/single-parents-welcome', description: 'Support for single parents' },
        { name: 'First Responders', path: '/first-responders-welcome', description: 'Support for first responders' },
        { name: 'Substance Abuse Support', path: '/substance-abuse-sponsor', description: 'Recovery support tools' },
      ]
    },
    {
      id: 'creative',
      name: 'Creative & Expression',
      icon: Palette,
      color: 'from-orange-500 to-amber-500',
      tools: [
        { name: 'Art Therapy', path: '/art-therapy', description: 'Express yourself through art' },
        { name: 'Music Therapy', path: '/music-therapy', description: 'Healing through music' },
        { name: 'Video Diary', path: '/video-diary', description: 'Record your journey' },
      ]
    },
    {
      id: 'community',
      name: 'Community & Connection',
      icon: Users,
      color: 'from-pink-500 to-rose-500',
      tools: [
        { name: 'Support Wall', path: '/support-wall', description: 'Share and connect with others' },
        { name: 'Workshops', path: '/workshops', description: 'Live and recorded workshops' },
        { name: 'Dear Henry', path: '/henry', description: 'Anonymous advice and wisdom' },
      ]
    },
    {
      id: 'learning',
      name: 'Learning & Growth',
      icon: BookOpen,
      color: 'from-indigo-500 to-blue-500',
      tools: [
        { name: 'Resource Library', path: '/resources', description: 'Educational materials' },
        { name: 'Games & Quizzes', path: '/games-and-quizzes', description: 'Fun and educational activities' },
        { name: 'Career Coaching', path: '/career-coaching', description: 'Professional development' },
      ]
    },
    {
      id: 'physical',
      name: 'Physical Wellness',
      icon: Dumbbell,
      color: 'from-teal-500 to-green-500',
      tools: [
        { name: 'Sleep Tracker', path: '/sleep-tracker', description: 'Monitor your sleep patterns' },
        { name: 'Alternative Therapies', path: '/alternative-therapies', description: 'Explore holistic options' },
        { name: 'Wellness Challenges', path: '/wellness-challenges', description: 'Physical wellness goals' },
      ]
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = toolkitCategories.map(category => ({
    ...category,
    tools: category.tools.filter(tool =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  return (
    <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Your Wellness Toolkit</h2>
          <p className="text-sm text-gray-400">All your mental health resources in one place</p>
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

      {/* Toolkit Categories */}
      <div className="space-y-3">
        {filteredCategories.map((category) => (
          <ToolCategoryCard
            key={category.id}
            category={category}
            isExpanded={expandedCategories.includes(category.id)}
            onToggle={() => toggleCategory(category.id)}
            onToolClick={(path) => navigate(path)}
          />
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No tools found matching "{searchQuery}"
        </div>
      )}
    </Card>
  );
}
