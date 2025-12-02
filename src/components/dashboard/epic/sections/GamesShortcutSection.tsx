import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Brain, Heart, Sparkles, Trophy, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GamesShortcutSection() {
  const navigate = useNavigate();

  const featuredGames = [
    {
      title: 'Mini Sudoku',
      description: 'Classic puzzle game',
      icon: Brain,
      route: '/app/games/mini-sudoku',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=500&q=80'
    },
    {
      title: 'Memory Match',
      description: 'Test your memory',
      icon: Sparkles,
      route: '/app/games/memory-match',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500&q=80'
    },
    {
      title: 'Word Unscramble',
      description: 'Word puzzle challenge',
      icon: Trophy,
      route: '/app/games/word-unscramble',
      image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&q=80'
    },
    {
      title: 'Mood Challenge',
      description: 'Boost your spirits',
      icon: Heart,
      route: '/app/mental-wellness-tools/mood-boost',
      image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&q=80'
    }
  ];

  return (
    <Card className="bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
            <Gamepad2 className="w-6 h-6 text-[#D4AF37]" />
            Games & Quizzes
          </h2>
          <p className="text-sm text-gray-400">Fun activities for mental wellness</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate('/app/games-and-quizzes')}
          className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredGames.map((game, index) => {
          const Icon = game.icon;
          return (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card
                onClick={() => navigate(game.route)}
                className="group cursor-pointer overflow-hidden border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300 h-[200px] relative"
              >
                {/* Cover Image */}
                <div className="absolute inset-0">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  <div className="flex justify-start">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/20 backdrop-blur-sm border border-[#D4AF37]/30">
                      <Icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-gray-300">
                      {game.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
