
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, HelpCircle } from "lucide-react";
import { Quiz } from "@/data/gamesData";

interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStartQuiz }) => {
  return (
    <Card key={quiz.id} className="hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          {quiz.title}
          {quiz.completionRate && quiz.completionRate > 0 ? (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
              <CheckCircle className="h-3 w-3 mr-1" />
              In progress
            </span>
          ) : null}
        </CardTitle>
        <CardDescription>{quiz.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <HelpCircle className="h-4 w-4 mr-1 text-[#9b87f5]" />
            <span>{quiz.questions} questions</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1 text-[#9b87f5]" />
            <span>{quiz.timeEstimate}</span>
          </div>
        </div>
        
        {quiz.completionRate && quiz.completionRate > 0 ? (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{quiz.completionRate}%</span>
            </div>
            <Progress value={quiz.completionRate} className="h-2" />
          </div>
        ) : null}
        
        <div className="mt-4">
          <Button 
            onClick={() => onStartQuiz(quiz)} 
            className="w-full bg-[#9b87f5] hover:bg-[#8B5CF6]"
          >
            {quiz.completionRate && quiz.completionRate > 0 ? "Continue Quiz" : "Start Quiz"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
