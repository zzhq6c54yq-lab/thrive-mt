
import React from "react";
import { Lightbulb } from "lucide-react";

interface Quote {
  text: string;
  author: string;
}

interface QuoteOfTheDayProps {
  quote: Quote;
}

const QuoteOfTheDay = ({ quote }: QuoteOfTheDayProps) => {
  return (
    <div className="my-6 bg-gradient-to-r from-[#0A1929] via-[#1c2e4a] to-[#0A1929] p-6 rounded-lg border border-[#B87333]/30">
      <div className="flex items-start">
        <div className="mr-4 p-2 bg-[#B87333]/20 rounded-full">
          <Lightbulb className="h-6 w-6 text-[#B87333]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#B87333] mb-1">Quote of the Day</h3>
          <div className="min-h-[60px] transition-all duration-500">
            <p className="text-white italic mb-2">"{quote.text}"</p>
            <p className="text-sm text-gray-400">— {quote.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteOfTheDay;
