
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Games & Quizzes</h1>
        <p className="text-gray-600 mt-1">
          Engaging activities to improve your mental wellbeing while having fun
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search games and quizzes..." 
            className="pl-9 pr-4 w-full md:w-60" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
