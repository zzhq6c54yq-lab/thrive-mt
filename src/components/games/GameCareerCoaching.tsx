import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Target, Users, BookOpen, TrendingUp, CheckCircle, Star } from "lucide-react";

const CAREER_MODULES = [
  {
    id: 'goal-setting',
    title: 'Goal Setting & Planning',
    icon: Target,
    content: [
      'Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound',
      'Create 30, 60, 90-day action plans for career advancement',
      'Identify key milestones and track your progress regularly',
      'Break down long-term goals into manageable daily tasks'
    ]
  },
  {
    id: 'networking',
    title: 'Professional Networking',
    icon: Users,
    content: [
      'Identify key industry events and professionals to connect with',
      'Craft compelling elevator pitches for different situations',
      'Use LinkedIn strategically to expand your network',
      'Follow up effectively and maintain long-term relationships'
    ]
  }
];

const GameCareerCoaching: React.FC = () => {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentContent, setCurrentContent] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  const handleNext = () => {
    const module = CAREER_MODULES[currentModule];
    if (currentContent < module.content.length - 1) {
      setCurrentContent(currentContent + 1);
    } else if (currentModule < CAREER_MODULES.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentContent(0);
    } else {
      setShowAssessment(true);
    }
  };

  if (assessmentComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-gradient-to-br from-green-100 to-emerald-100">
          <CardHeader className="text-center">
            <Star className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl text-green-800">Career Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-green-700">You've completed the comprehensive career coaching program!</p>
            <Button onClick={() => window.location.reload()} className="w-full mt-4 bg-green-600 text-white">
              Start New Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showAssessment) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Career Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>What's your primary career goal for the next 12 months?</p>
            <div className="grid grid-cols-1 gap-3">
              {["Get promoted", "Change careers", "Develop new skills", "Improve work-life balance"].map((option) => (
                <Button
                  key={option}
                  onClick={() => setAssessmentComplete(true)}
                  variant="outline"
                  className="text-left justify-start"
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const module = CAREER_MODULES[currentModule];
  const progress = ((currentModule * 4 + currentContent + 1) / (CAREER_MODULES.length * 4)) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-r from-amber-100 to-yellow-100">
        <CardHeader>
          <div className="flex items-center gap-3">
            <module.icon className="w-8 h-8 text-amber-600" />
            <div>
              <CardTitle className="text-xl text-amber-800">Career Coaching Program</CardTitle>
              <p className="text-amber-600">Module {currentModule + 1}: {module.title}</p>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-700">{module.content[currentContent]}</p>
          </div>
          <Button onClick={handleNext} className="w-full bg-amber-600 text-white">
            {currentContent === module.content.length - 1 && currentModule === CAREER_MODULES.length - 1 
              ? "Take Assessment" : "Next"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameCareerCoaching;