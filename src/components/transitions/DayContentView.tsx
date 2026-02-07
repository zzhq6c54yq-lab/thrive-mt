import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, Heart, CheckSquare, Lock, CheckCircle, 
  ChevronDown, ChevronUp, ArrowLeft, Sparkles 
} from 'lucide-react';
import { DayContent, WeekContent } from '@/data/lifeTransitionDailyContent';
import { celebrateGoalCompletion } from '@/utils/animations';

interface DayContentViewProps {
  week: WeekContent;
  completedDays: number[];
  currentDay: number;
  onCompleteDay: (weekNum: number, dayNum: number) => void;
  onBack: () => void;
}

const DayContentView: React.FC<DayContentViewProps> = ({ 
  week, completedDays, currentDay, onCompleteDay, onBack 
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(currentDay);

  const isDayAccessible = (dayNum: number) => {
    if (dayNum === 1) return true;
    return completedDays.includes(dayNum - 1);
  };

  const isDayCompleted = (dayNum: number) => completedDays.includes(dayNum);

  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-gray-400 hover:text-white mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Weeks
      </Button>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Week {week.week}: {week.title}</h2>
        <p className="text-gray-400 mt-1">{week.description}</p>
        <div className="flex gap-2 mt-3">
          <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
            {completedDays.length}/7 days completed
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        {week.days.map((day) => {
          const accessible = isDayAccessible(day.day);
          const completed = isDayCompleted(day.day);
          const isExpanded = expandedDay === day.day;
          const isCurrent = day.day === currentDay && !completed;

          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: day.day * 0.05 }}
            >
              <Card className={`overflow-hidden transition-all ${
                completed 
                  ? 'bg-green-900/20 border-green-500/30' 
                  : isCurrent 
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/50' 
                    : accessible 
                      ? 'bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50' 
                      : 'bg-gray-900/30 border-gray-800/30 opacity-60'
              }`}>
                {/* Day Header */}
                <button
                  className="w-full p-4 flex items-center gap-3 text-left"
                  onClick={() => accessible && setExpandedDay(isExpanded ? null : day.day)}
                  disabled={!accessible}
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                    completed 
                      ? 'bg-green-500' 
                      : isCurrent 
                        ? 'bg-[#D4AF37]' 
                        : accessible 
                          ? 'bg-gray-700' 
                          : 'bg-gray-800'
                  }`}>
                    {completed ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : !accessible ? (
                      <Lock className="w-4 h-4 text-gray-500" />
                    ) : (
                      <span className="text-white font-bold text-sm">{day.day}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`font-medium ${
                      !accessible ? 'text-gray-600' : 'text-white'
                    }`}>
                      Day {day.day}: {day.title}
                    </h4>
                    {isCurrent && (
                      <span className="text-xs text-[#D4AF37]">Today's focus</span>
                    )}
                  </div>

                  {accessible && (
                    isExpanded 
                      ? <ChevronUp className="w-5 h-5 text-gray-400" />
                      : <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && accessible && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-4 border-t border-white/5 pt-4">
                        {/* Exercise */}
                        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Dumbbell className="w-5 h-5 text-blue-400" />
                            <h5 className="font-semibold text-blue-300">Exercise: {day.exercise.name}</h5>
                            <Badge variant="outline" className="text-blue-300 border-blue-400/30 text-xs ml-auto">
                              {day.exercise.duration}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-300 mb-3">{day.exercise.description}</p>
                          <ol className="space-y-1.5">
                            {day.exercise.steps.map((step, i) => (
                              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                <span className="text-blue-400 font-mono text-xs mt-0.5">{i + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Encouragement */}
                        <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-5 h-5 text-amber-400" />
                            <h5 className="font-semibold text-amber-300">Today's Encouragement</h5>
                          </div>
                          <p className="text-sm text-gray-200 italic">"{day.encouragement}"</p>
                        </div>

                        {/* Daily Task */}
                        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckSquare className="w-5 h-5 text-purple-400" />
                            <h5 className="font-semibold text-purple-300">Task: {day.task.name}</h5>
                          </div>
                          <p className="text-sm text-gray-300">{day.task.description}</p>
                        </div>

                        {/* Complete Button */}
                        {!completed && (
                          <Button
                            onClick={() => {
                              onCompleteDay(week.week, day.day);
                              celebrateGoalCompletion();
                            }}
                            className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B87333] hover:from-[#E5C5A1] hover:to-[#D4AF37] text-black font-semibold"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Complete Day {day.day}
                          </Button>
                        )}

                        {completed && (
                          <div className="flex items-center justify-center gap-2 text-green-400 py-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Day completed!</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DayContentView;
