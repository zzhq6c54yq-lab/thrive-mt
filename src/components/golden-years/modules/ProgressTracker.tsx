import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, TrendingUp } from "lucide-react";

interface ProgressTrackerProps {
  totalLessons: number;
  completedLessons: number;
  moduleType: string;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  totalLessons,
  completedLessons,
  moduleType,
}) => {
  const percentage = Math.round((completedLessons / totalLessons) * 100);
  
  const getMotivationalMessage = () => {
    if (percentage === 0) return "Start your journey today!";
    if (percentage < 25) return "Great start! Keep going!";
    if (percentage < 50) return "You're making progress!";
    if (percentage < 75) return "More than halfway there!";
    if (percentage < 100) return "Almost complete!";
    return "Module completed! 🎉";
  };

  return (
    <Card className="bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/30">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#D4AF37]" />
            <h3 className="text-lg font-semibold text-[#F5DEB3]">Your Progress</h3>
          </div>
          <span className="text-2xl font-bold text-[#D4AF37]">{percentage}%</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[#F5DEB3]/80">
            <Target className="h-4 w-4 text-[#D4AF37]" />
            <span className="text-sm">
              {completedLessons} of {totalLessons} lessons completed
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-[#F5DEB3]/80">
            <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
            <span className="text-sm italic">{getMotivationalMessage()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
