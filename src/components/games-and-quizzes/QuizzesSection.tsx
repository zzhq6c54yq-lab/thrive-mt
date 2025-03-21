
import React from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuizCard from "./QuizCard";
import { Quiz } from "@/data/gamesData";

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
  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center bg-white/50 p-3 rounded-lg backdrop-blur">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#9b87f5]" />
          <span>Mental Health Quizzes</span>
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="mental-health">Mental Health</SelectItem>
              <SelectItem value="wellbeing">Wellbeing</SelectItem>
              <SelectItem value="coping-strategies">Coping Strategies</SelectItem>
              <SelectItem value="self-awareness">Self Awareness</SelectItem>
              <SelectItem value="relationships">Relationships</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="h-9 px-3" 
            onClick={() => setCategoryFilter("")}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id} 
              quiz={quiz} 
              onStartQuiz={onStartQuiz} 
            />
          ))}
        </div>
      )}
    </>
  );
};

export default QuizzesSection;
