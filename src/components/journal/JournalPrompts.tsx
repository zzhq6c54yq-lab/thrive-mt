
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { getPromptsForCategory } from "@/data/journalPrompts";

interface JournalPromptsProps {
  category: string;
  onSelectPrompt: (prompt: string) => void;
}

const JournalPrompts: React.FC<JournalPromptsProps> = ({ category, onSelectPrompt }) => {
  // Get prompts for the selected category or default to childhood
  const currentPrompts = getPromptsForCategory(category);

  return (
    <ScrollArea className="h-[300px] rounded-md border border-teal-500/50 p-4 bg-teal-800/50">
      <div className="space-y-4">
        {currentPrompts.map((prompt, index) => (
          <div key={index} className="bg-teal-800/70 p-3 rounded-md">
            <p className="text-teal-50 mb-2">{prompt}</p>
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-700"
              onClick={() => onSelectPrompt(prompt)}
            >
              Use This Prompt
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default JournalPrompts;
