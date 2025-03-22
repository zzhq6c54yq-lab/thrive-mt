
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter, Brain, Sparkles } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuizCard from "./QuizCard";
import { Quiz } from "@/data/gamesData";
import { motion } from "framer-motion";

interface QuizzesSectionProps {
  filteredQuizzes: Quiz[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  onStartQuiz: (quiz: Quiz) => void;
}

const QuizzesSection: React.FC<QuizzesSectionProps> = ({
  filteredQuizzes,
  categoryFilter,
  setCategoryFilter,
  onStartQuiz
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/50 p-4 rounded-xl backdrop-blur shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#0EA5E9]/20">
            <Brain className="h-5 w-5 text-[#8B5CF6]" />
          </div>
          <span>Mental Health Assessment Quizzes</span>
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px] h-9 bg-white border-[#8B5CF6]/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="wellbeing">Wellbeing</SelectItem>
              <SelectItem value="coping-strategies">Coping Strategies</SelectItem>
              <SelectItem value="self-awareness">Self Awareness</SelectItem>
              <SelectItem value="relationships">Relationships</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="h-9 px-3 border-[#8B5CF6]/20 text-[#8B5CF6] hover:bg-[#8B5CF6]/10" 
            onClick={() => setCategoryFilter("all")}
          >
            <Filter className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
      
      {filteredQuizzes.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800">No quizzes found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredQuizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id} 
              quiz={quiz} 
              onStartQuiz={onStartQuiz} 
            />
          ))}
        </motion.div>
      )}

      <div className="mt-12 text-center">
        <div className="relative inline-block">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#0EA5E9] rounded-full blur"></div>
          <Button 
            className="relative bg-white text-[#8B5CF6] hover:bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 shadow-sm px-6"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Explore all quizzes
          </Button>
        </div>
      </div>
    </>
  );
};

export default QuizzesSection;
