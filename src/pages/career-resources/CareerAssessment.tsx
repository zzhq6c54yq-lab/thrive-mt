import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import BackButton from "@/components/navigation/BackButton";
import { ClipboardList } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CareerAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      text: "I prefer working independently rather than in teams",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    },
    {
      id: 2,
      text: "I enjoy taking on leadership responsibilities",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    },
    {
      id: 3,
      text: "I am comfortable with public speaking",
      options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    },
  ];

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      toast({
        title: "Assessment Complete!",
        description: "Your results are being processed.",
      });
      navigate("/app/career-coaching");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton onCustomBack={() => navigate("/app/career-coaching")} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6" />
              Career Path Assessment
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].text}</h3>
              <RadioGroup
                value={answers[currentQuestion]}
                onValueChange={(value) =>
                  setAnswers({ ...answers, [currentQuestion]: value })
                }
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option} className="flex items-center space-x-2 mb-3">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex gap-3">
              {currentQuestion > 0 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              <Button onClick={handleNext} className="flex-1">
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerAssessment;
