
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, HelpCircle, Brain, ArrowRight } from "lucide-react";
import { Quiz } from "@/data/gamesData";
import { motion } from "framer-motion";

interface QuizCardProps {
  quiz: Quiz;
  onStartQuiz: (quiz: Quiz) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onStartQuiz }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Generate a color gradient based on quiz category
  const getGradient = (category: string) => {
    switch(category) {
      case 'mental-health': 
        return 'from-[#8B5CF6] to-[#D946EF]';
      case 'wellbeing': 
        return 'from-[#0EA5E9] to-[#34D399]';
      case 'coping-strategies': 
        return 'from-[#F97316] to-[#FBBF24]';
      case 'self-awareness': 
        return 'from-[#4338CA] to-[#6366F1]';
      case 'relationships': 
        return 'from-[#EC4899] to-[#F472B6]';
      default: 
        return 'from-[#8B5CF6] to-[#D946EF]';
    }
  };

  const gradientClass = getGradient(quiz.category);

  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white/90 backdrop-blur border-white">
        <div className={`h-2 bg-gradient-to-r ${gradientClass}`}></div>
        <CardHeader className="pt-5 pb-2">
          <div className="flex justify-between">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              {quiz.title}
              {quiz.completionRate && quiz.completionRate > 0 ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  In progress
                </span>
              ) : null}
            </CardTitle>
            <div className="p-2 rounded-full bg-gray-100 group-hover:bg-gradient-to-r group-hover:${gradientClass} group-hover:bg-opacity-20 transition-colors duration-300">
              <Brain className={`h-5 w-5 text-gray-400 group-hover:text-[#8B5CF6]`} />
            </div>
          </div>
          <CardDescription className="mt-2">{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <HelpCircle className="h-4 w-4 mr-1 text-[#8B5CF6]" />
              <span>{quiz.questions} questions</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1 text-[#8B5CF6]" />
              <span>{quiz.timeEstimate}</span>
            </div>
          </div>
          
          {quiz.completionRate && quiz.completionRate > 0 ? (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-600">Quiz Progress</span>
                <span className="font-medium text-[#8B5CF6]">{quiz.completionRate}%</span>
              </div>
              <Progress value={quiz.completionRate} className="h-2 bg-gray-100" 
                style={{
                  '--progress-background': `linear-gradient(to right, ${quiz.category === 'mental-health' ? '#8B5CF6, #D946EF' : '#0EA5E9, #34D399'})`,
                } as React.CSSProperties} 
              />
            </div>
          ) : null}
        </CardContent>
        <CardFooter className="pb-4">
          <Button 
            onClick={() => onStartQuiz(quiz)} 
            className={`w-full group-hover:shadow-md bg-gradient-to-r ${gradientClass} hover:opacity-90 transition-all`}
          >
            <span className="mr-2">
              {quiz.completionRate && quiz.completionRate > 0 ? "Continue Quiz" : "Start Quiz"}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizCard;
