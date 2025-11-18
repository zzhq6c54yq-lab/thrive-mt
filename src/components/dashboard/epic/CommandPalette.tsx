import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Clock,
  Heart,
  Brain,
  Users,
  Activity,
  Music,
  Palette,
  Book,
  TrendingUp,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Command {
  id: string;
  title: string;
  description?: string;
  category: 'tool' | 'action' | 'navigation' | 'help';
  icon: React.ReactNode;
  path?: string;
  action?: () => void;
  keywords: string[];
  estimatedTime?: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const allCommands: Command[] = useMemo(() => [
    // Mental Health Tools
    { id: 'mood-tracker', title: 'Mood Tracker', category: 'tool', icon: <Heart className="w-4 h-4" />, path: '/mood-tracker', keywords: ['mood', 'emotions', 'feelings', 'track'], estimatedTime: '2 min' },
    { id: 'journal', title: 'Journaling', category: 'tool', icon: <Book className="w-4 h-4" />, path: '/journaling', keywords: ['journal', 'write', 'thoughts', 'diary'], estimatedTime: '10 min' },
    { id: 'meditation', title: 'Meditation Studio', category: 'tool', icon: <Sparkles className="w-4 h-4" />, path: '/meditation', keywords: ['meditation', 'mindfulness', 'calm', 'relax'], estimatedTime: '15 min' },
    { id: 'breathing', title: 'Breathing Exercises', category: 'tool', icon: <Activity className="w-4 h-4" />, path: '/breathing', keywords: ['breathing', 'breathe', 'calm', 'anxiety'], estimatedTime: '3 min' },
    { id: 'assessments', title: 'Mental Health Assessments', category: 'tool', icon: <Brain className="w-4 h-4" />, path: '/mental-wellness', keywords: ['assessment', 'phq', 'gad', 'test', 'score'], estimatedTime: '5 min' },
    
    // Therapy & Support
    { id: 'therapy', title: 'Real-Time Therapy', category: 'tool', icon: <Users className="w-4 h-4" />, path: '/therapy', keywords: ['therapy', 'therapist', 'counseling', 'session'], estimatedTime: '50 min' },
    { id: 'mini-session', title: 'Between-Session Companion', category: 'tool', icon: <MessageCircle className="w-4 h-4" />, path: '/mini-session', keywords: ['ai', 'chat', 'companion', 'talk', 'help'], estimatedTime: '10 min' },
    { id: 'henry', title: 'Talk to Henry (AI)', category: 'tool', icon: <MessageCircle className="w-4 h-4" />, path: '/mirror-ai', keywords: ['ai', 'henry', 'chat', 'talk', 'assistant'], estimatedTime: '5 min' },
    
    // Creative Tools
    { id: 'art-therapy', title: 'Art Therapy', category: 'tool', icon: <Palette className="w-4 h-4" />, path: '/art-therapy', keywords: ['art', 'draw', 'paint', 'creative'], estimatedTime: '15 min' },
    { id: 'music', title: 'Music Therapy', category: 'tool', icon: <Music className="w-4 h-4" />, path: '/music-therapy', keywords: ['music', 'sound', 'audio', 'relax'], estimatedTime: '10 min' },
    { id: 'binaural', title: 'Binaural Beats', category: 'tool', icon: <Music className="w-4 h-4" />, path: '/binaural-beats', keywords: ['binaural', 'beats', 'sound', 'therapy'], estimatedTime: '20 min' },
    
    // Navigation
    { id: 'dashboard', title: 'Dashboard', category: 'navigation', icon: <Activity className="w-4 h-4" />, path: '/dashboard', keywords: ['dashboard', 'home', 'main'] },
    { id: 'progress', title: 'Progress Analytics', category: 'navigation', icon: <TrendingUp className="w-4 h-4" />, path: '/progress-analytics', keywords: ['progress', 'analytics', 'stats', 'chart'] },
    { id: 'profile', title: 'My Profile', category: 'navigation', icon: <Users className="w-4 h-4" />, path: '/profile', keywords: ['profile', 'settings', 'account'] },
    
    // Help
    { id: 'crisis', title: 'Emergency Help', category: 'help', icon: <Heart className="w-4 h-4" />, path: '/crisis-resources', keywords: ['emergency', 'crisis', 'help', 'urgent', 'suicide'] },
    { id: 'support', title: 'Contact Support', category: 'help', icon: <MessageCircle className="w-4 h-4" />, path: '/feedback', keywords: ['support', 'help', 'contact', 'question'] },
  ], []);

  // Filter commands based on search
  const filteredCommands = useMemo(() => {
    if (!search) return allCommands;
    
    const query = search.toLowerCase();
    return allCommands.filter(cmd => 
      cmd.title.toLowerCase().includes(query) ||
      cmd.keywords.some(k => k.includes(query)) ||
      cmd.description?.toLowerCase().includes(query)
    );
  }, [search, allCommands]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        handleSelectCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleSelectCommand = (command: Command) => {
    if (command.action) {
      command.action();
    } else if (command.path) {
      navigate(command.path);
    }
    onClose();
    setSearch('');
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'tool': return 'Tools';
      case 'action': return 'Actions';
      case 'navigation': return 'Navigate';
      case 'help': return 'Help';
      default: return '';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-gray-900/95 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* Search Input */}
          <div className="p-4 border-b border-gray-700/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools, actions, or type what you need..."
                className="pl-10 bg-gray-800/50 border-gray-700/50 text-white placeholder:text-gray-500"
                autoFocus
              />
            </div>
            <div className="mt-2 flex gap-2 text-xs text-gray-500">
              <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">↑↓</kbd>
              <span>Navigate</span>
              <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">Enter</kbd>
              <span>Select</span>
              <kbd className="px-2 py-1 bg-gray-800 rounded border border-gray-700">Esc</kbd>
              <span>Close</span>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No results found for "{search}"
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    onClick={() => handleSelectCommand(command)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group",
                      index === selectedIndex 
                        ? "bg-primary/20 border border-primary/50" 
                        : "hover:bg-gray-800/50"
                    )}
                  >
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                      index === selectedIndex 
                        ? "bg-primary/30 text-primary" 
                        : "bg-gray-800 text-gray-400 group-hover:bg-gray-700"
                    )}>
                      {command.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{command.title}</span>
                        {command.estimatedTime && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {command.estimatedTime}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500">
                          {getCategoryLabel(command.category)}
                        </span>
                      </div>
                    </div>
                    {index === selectedIndex && (
                      <kbd className="px-2 py-1 text-xs bg-primary/20 text-primary rounded border border-primary/50">
                        ⏎
                      </kbd>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
