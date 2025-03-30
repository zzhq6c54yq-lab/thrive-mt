
import React from "react";
import { Brain, TrendingUp, AlertCircle, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const InsightsSection = () => {
  // Mock data for insights
  const moodData = {
    average: 7.2,
    improvement: "+12%",
    triggers: ["Work stress", "Poor sleep", "Social media"],
    patterns: [
      { day: "Mon", value: 45 },
      { day: "Tue", value: 65 },
      { day: "Wed", value: 60 },
      { day: "Thu", value: 80 },
      { day: "Fri", value: 75 },
      { day: "Sat", value: 85 },
      { day: "Sun", value: 90 },
    ],
    timeOfDay: [
      { time: "Morning", mood: "7.5" },
      { time: "Afternoon", mood: "6.8" },
      { time: "Evening", mood: "7.4" },
    ]
  };

  return (
    <Card className="border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden group">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fdfcfb]/30 to-[#e2d1c3]/30 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-[#B87333]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><path d=%22M0 10 L20 10%22 stroke=%22%23B87333%22 stroke-opacity=%220.03%22 stroke-width=%221%22/></svg>')] opacity-10"></div>
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-[#B87333]/20 rounded-full blur-sm"></div>
            <Brain className="h-5 w-5 text-[#B87333] relative" />
          </div>
          Mood Insights
        </CardTitle>
        <CardDescription>Patterns and trends in your mood entries</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Average Mood</span>
              <div className="text-2xl font-bold">{moodData.average}/10</div>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full text-xs">
              <TrendingUp className="h-3 w-3" />
              {moodData.improvement}
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Weekly Trend</span>
            <div className="mt-2 flex items-end space-x-1">
              {moodData.patterns.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-[#B87333]/30 to-[#B87333]/10 rounded-t-sm" 
                    style={{ height: `${day.value}px` }} 
                  />
                  <span className="text-xs mt-1">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Time of Day Impact</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {moodData.timeOfDay.map((time, index) => (
                <div key={index} className="text-center p-1.5 bg-[#B87333]/5 rounded-md">
                  <div className="flex items-center justify-center gap-1 text-xs text-[#B87333]">
                    <Clock className="h-3 w-3" />
                    {time.time}
                  </div>
                  <div className="font-medium mt-1">{time.mood}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Potential Triggers</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {moodData.triggers.map((trigger, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 bg-[#B87333]/10 text-[#B87333] rounded-full text-xs flex items-center gap-1 hover:bg-[#B87333]/20 transition-colors"
                >
                  <AlertCircle className="h-3 w-3" />
                  {trigger}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <a 
            href="/progress-reports" 
            className="text-sm text-[#B87333] hover:text-[#A56625] underline-offset-4 hover:underline relative group"
          >
            <span className="relative z-10">View Detailed Reports</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B87333]/30 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsSection;
