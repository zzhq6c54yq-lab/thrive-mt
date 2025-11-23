import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, TrendingUp, Flame, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoalCard } from '@/components/goals/GoalCard';
import { addDays, endOfWeek } from 'date-fns';

export default function WeeklyGoals() {
  const navigate = useNavigate();

  // Sample data for demonstration
  const [goals, setGoals] = useState([
    {
      id: '1',
      title: 'Complete 5 Daily Check-ins',
      description: 'Log your mood daily to track patterns',
      target: 5,
      current: 3,
      type: 'check-in',
      dueDate: endOfWeek(new Date()),
      status: 'active' as const
    },
    {
      id: '2',
      title: 'Try 2 New Wellness Tools',
      description: 'Explore mindfulness or journaling exercises',
      target: 2,
      current: 1,
      type: 'activity',
      dueDate: endOfWeek(new Date()),
      status: 'active' as const
    },
    {
      id: '3',
      title: 'Journal 3 Times',
      description: 'Reflect on your day and emotions',
      target: 3,
      current: 0,
      type: 'journal',
      dueDate: endOfWeek(new Date()),
      status: 'active' as const
    },
    {
      id: '4',
      title: '7-Day Check-in Streak',
      description: 'Maintain consistency all week',
      target: 7,
      current: 7,
      type: 'check-in',
      dueDate: endOfWeek(new Date()),
      status: 'completed' as const
    }
  ]);

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');
  const totalProgress = goals.reduce((sum, g) => sum + (g.current / g.target), 0) / goals.length * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1510] to-gray-900">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
            Weekly Goals
          </h1>
          <p className="text-gray-300 text-lg">Track your progress and achieve your wellness objectives</p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Goals</p>
                  <p className="text-4xl font-bold text-[#D4AF37]">{activeGoals.length}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-[#D4AF37] opacity-50" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Completed</p>
                  <p className="text-4xl font-bold text-[#D4AF37]">{completedGoals.length}</p>
                </div>
                <Trophy className="w-12 h-12 text-[#D4AF37] opacity-50" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Weekly Progress</p>
                  <p className="text-4xl font-bold text-[#D4AF37]">{Math.round(totalProgress)}%</p>
                </div>
                <Flame className="w-12 h-12 text-[#D4AF37] opacity-50" />
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 border-[#D4AF37]/40 p-6">
              <Button className="w-full h-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:opacity-90 font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                Add New Goal
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Active Goals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeGoals.map((goal, index) => (
                <GoalCard
                  key={goal.id}
                  {...goal}
                  index={index}
                  onComplete={() => {
                    setGoals(prev =>
                      prev.map(g =>
                        g.id === goal.id ? { ...g, status: 'completed' as const } : g
                      )
                    );
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Completed This Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedGoals.map((goal, index) => (
                <GoalCard key={goal.id} {...goal} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        <Card className="mt-8 bg-gradient-to-br from-[#D4AF37]/5 to-[#B8941F]/5 border-[#D4AF37]/30 p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">AI Suggestions</h3>
              <p className="text-gray-300 mb-4">
                Based on your recent activity, we recommend adding these goals:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Try meditation for 5 minutes daily - your check-ins show you're most stressed in the evenings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">•</span>
                  <span>Complete the anxiety assessment - it's been 2 weeks since your last one</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
