import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import BackButton from "@/components/navigation/BackButton";
import { Video, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InterviewSimulator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [response, setResponse] = useState("");

  const questions = [
    "Tell me about yourself and your career journey.",
    "What are your greatest strengths as a professional?",
    "Describe a challenging situation you faced and how you handled it.",
    "Why are you interested in this role?",
    "Where do you see yourself in 5 years?",
  ];

  const handleNext = () => {
    if (!response.trim()) {
      toast({
        title: "Please provide a response",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setResponse("");
      toast({
        title: "Response recorded",
        description: "Moving to next question",
      });
    } else {
      toast({
        title: "Interview Complete!",
        description: "Great job! Review your responses in the dashboard.",
      });
      navigate("/app/career-coaching");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <BackButton onCustomBack={() => navigate("/app/career-coaching")} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-6 w-6" />
              Interview Simulator
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">{questions[currentQuestion]}</h3>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Your Response</Label>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your answer here... (Or use the record button for voice response)"
                className="min-h-[150px]"
              />
              
              <Button variant="outline" className="w-full">
                <Mic className="h-4 w-4 mr-2" />
                Record Voice Response
              </Button>
            </div>

            <Button onClick={handleNext} className="w-full">
              {currentQuestion === questions.length - 1 ? "Complete Interview" : "Next Question"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default InterviewSimulator;
