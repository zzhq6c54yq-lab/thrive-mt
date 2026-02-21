import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BackButton from "@/components/navigation/BackButton";
import { CheckCircle2, Circle, Users } from "lucide-react";

const LeadershipSkillsModule = () => {
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    { id: 1, title: "Leadership Styles & When to Use Them", duration: "20 min" },
    { id: 2, title: "Effective Communication for Leaders", duration: "25 min" },
    { id: 3, title: "Building & Motivating Teams", duration: "30 min" },
    { id: 4, title: "Decision Making & Problem Solving", duration: "25 min" },
  ];

  const progress = (completedLessons.length / lessons.length) * 100;

  const toggleLesson = (lessonId: number) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton onCustomBack={() => navigate("/app/career-coaching")} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Leadership Skills Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="space-y-4">
              {lessons.map((lesson) => {
                const isCompleted = completedLessons.includes(lesson.id);
                return (
                  <Card key={lesson.id} className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={isCompleted ? "outline" : "default"}
                          onClick={() => toggleLesson(lesson.id)}
                        >
                          {isCompleted ? "Review" : "Start"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadershipSkillsModule;
