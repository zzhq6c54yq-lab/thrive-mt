import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import BackButton from "@/components/navigation/BackButton";
import { CheckCircle2, Circle, MessageSquare } from "lucide-react";

const StrategicCommunication = () => {
  const navigate = useNavigate();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    { id: 1, title: "Foundations of Strategic Communication", duration: "20 min", type: "Video" },
    { id: 2, title: "Tailoring Messages to Your Audience", duration: "25 min", type: "Reading" },
    { id: 3, title: "Communication Styles Assessment", duration: "15 min", type: "Quiz" },
    { id: 4, title: "Handling Difficult Conversations", duration: "30 min", type: "Exercise" },
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
              <MessageSquare className="h-6 w-6" />
              Strategic Communication Course
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
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
                            <p className="text-sm text-muted-foreground">
                              {lesson.type} • {lesson.duration}
                            </p>
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

export default StrategicCommunication;
