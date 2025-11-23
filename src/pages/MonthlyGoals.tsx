import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Plus, Trophy, TrendingUp, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoalCard } from '@/components/goals/GoalCard';
import { addDays, endOfMonth } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyGoals() {
  const navigate = useNavigate();

  // Sample mood trend data
  const moodData = [
    { day: 'Week 1', mood: 3.2 },
    { day: 'Week 2', mood: 3.5 },
    { day: 'Week 3', mood: 3.8 },
    { day: 'Week 4', mood: 4.1 },
  ];

  // Sample monthly goals
  const [goals] = useState([
    {
      id: '1',
      title: 'Improve Average Mood Score',
      description: 'Target: 4.0+ average mood rating',
      target: 4.0,
      current: 3.65,
      type: 'mood',
      dueDate: endOfMonth(new Date()),
      status: 'active' as const
    },
    {
      id: '2',
      title: 'Maintain 7-Day Check-in Streak',
      description: 'Log your mood every day for a week',
      target: 7,
      current: 4,
      type: 'check-in',
      dueDate: endOfMonth(new Date()),
      status: 'active' as const
    },
    {
      id: '3',
      title: 'Complete Stress Assessment',
      description: 'Monthly mental health check-in',
      target: 1,
      current: 0,
      type: 'activity',
      dueDate: endOfMonth(new Date()),
      status: 'active' as const
    },
    {
      id: '4',
      title: 'Master Breathing Exercises',
      description: 'Complete 15 breathing sessions',
      target: 15,
      current: 15,
      type: 'activity',
      dueDate: endOfMonth(new Date()),
      status: 'completed' as const
    }
  ]);

  const completedGoals = goals.filter(g => g.status === 'completed');
  const activeGoals = goals.filter(g => g.status === 'active');

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
            Monthly Goals
          </h1>
          <p className="text-gray-300 text-lg">Build lasting habits and achieve long-term wellness</p>
        </motion.div>

        {/* Month Overview Banner */}
        <Card className="mb-8 bg-gradient-to-r from-[#D4AF37]/20 to-[#B8941F]/10 border-[#D4AF37]/40 p-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                January 2024
              </h2>
              <p className="text-gray-300">
                You've completed <span className="text-[#D4AF37] font-bold">{completedGoals.length}</span> of {goals.length} monthly goals
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#D4AF37]">21</div>
                <div className="text-sm text-gray-400">Days Left</div>
              </div>
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black hover:opacity-90 font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                Add Goal
              </Button>
            </div>
          </div>
        </Card>

        {/* Mood Trend Chart */}
        <Card className="mb-8 bg-gray-800/40 border-gray-700/50 backdrop-blur-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="text-2xl font-bold text-white">Monthly Mood Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis domain={[0, 5]} stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #D4AF37',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ fill: '#D4AF37', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-center text-gray-400 mt-4">
            Your mood has improved by <span className="text-[#D4AF37] font-bold">28%</span> this month! 📈
          </p>
        </Card>

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
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Completed This Month</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedGoals.map((goal, index) => (
                <GoalCard key={goal.id} {...goal} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Milestone Celebration */}
        {completedGoals.length > 0 && (
          <Card className="bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/10 border-[#D4AF37]/60 p-8">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
                className="inline-block mb-4"
              >
                <Trophy className="w-16 h-16 text-[#D4AF37]" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Amazing Progress! 🎉
              </h2>
              <p className="text-gray-300 text-lg">
                You're building incredible momentum. Keep up the great work!
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
