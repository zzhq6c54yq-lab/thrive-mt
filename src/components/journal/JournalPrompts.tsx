import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface JournalPromptsProps {
  category: string;
  onSelectPrompt: (prompt: string) => void;
}

const JournalPrompts: React.FC<JournalPromptsProps> = ({ category, onSelectPrompt }) => {
  // Prompt collections for different categories
  const prompts = {
    childhood: [
      "Describe your earliest memory in as much detail as possible. How old were you? Who was with you? What emotions do you associate with this memory?",
      "Tell the story of your childhood home. Describe its appearance, sounds, smells, and how it made you feel.",
      "Who were your childhood best friends? Describe your favorite activities and adventures together.",
      "What games did you play as a child? How did children entertain themselves in your generation?",
      "Describe your school experiences. Who was your favorite teacher and why? What subjects did you enjoy or dislike?",
      "What family traditions did you have growing up? How have they evolved over the years?",
      "What was a typical holiday celebration like in your childhood home?",
      "Describe the neighborhood where you grew up and how it changed over time.",
      "What historical events do you remember from your childhood? How did they affect your family?",
      "Who were the important adults in your childhood besides your parents? What impact did they have on you?",
    ],
    adolescence: [
      "Describe your teenage years. What challenges did you face and overcome?",
      "What music, movies, and fashion were popular during your teenage years? What were your favorites?",
      "Tell the story of your first crush or first love. How did it shape your understanding of relationships?",
      "What important lessons did you learn as a teenager that stayed with you throughout life?",
      "Describe your high school experience. What activities were you involved in? Who were your friends?",
      "Was there a moment in your adolescence when you felt you were becoming an adult? Describe it.",
      "What were your dreams and ambitions as a teenager? How did they evolve as you grew older?",
      "Describe a teacher or mentor who influenced you during your teenage years.",
      "What challenges did teenagers face in your generation that are different from today?",
      "What was your relationship with your parents like during your teenage years? How did it change over time?",
    ],
    youngadult: [
      "Describe your journey to independence. Where did you live? What jobs did you have?",
      "What led you to choose your career path? Describe your early working experiences.",
      "Tell the story of how you met your spouse or significant other(s).",
      "What were your twenties like? What adventures or experiences shaped this period of your life?",
      "Describe major decisions you made as a young adult. Would you make the same choices again?",
      "What financial challenges did you face as a young adult? How did you overcome them?",
      "How did you establish your own home and family traditions distinct from your parents?",
      "What social and cultural events of your young adult years had the biggest impact on you?",
      "Describe the moment when you felt like a "real adult" for the first time.",
      "What advice would you give young adults today based on your experiences?",
    ],
    career: [
      "Describe your first job and what you learned from it.",
      "What led you to your chosen career? Was it planned or did you discover it by accident?",
      "Who were your mentors in your professional life? What did they teach you?",
      "Describe your biggest professional achievement and why it matters to you.",
      "What challenges did you face in your career and how did you overcome them?",
      "How did you balance work and family life? What sacrifices or compromises did you make?",
      "How did your industry change during your working years?",
      "Describe a typical day at work during the height of your career.",
      "What skills were you most proud of developing in your professional life?",
      "What advice about work and career would you give to your grandchildren?",
    ],
    relationships: [
      "Tell the complete story of how you met your spouse/partner. What attracted you to them?",
      "Describe your wedding day or commitment ceremony in detail.",
      "What challenges have you faced in your relationship, and how did you overcome them?",
      "What's the secret to a successful long-term relationship based on your experience?",
      "How did having children change your relationship with your spouse/partner?",
      "Describe your parenting philosophy and approach. What values did you try to instill?",
      "What traditions or activities have been most important in keeping your family close?",
      "Describe each of your children – their personalities, strengths, and your relationship with them.",
      "How have your friendships changed and evolved throughout your life?",
      "Who has been your most enduring friend, and what has made that friendship special?",
    ],
    parenthood: [
      "Describe the moment you found out you were going to become a parent. How did you feel?",
      "What surprised you most about becoming a parent?",
      "What traditions or values from your own upbringing did you choose to continue with your children?",
      "Describe each of your children when they were born. What were their personalities like? How did they change?",
      "What were your greatest challenges as a parent? How did you handle them?",
      "Describe a typical day in your household when your children were young.",
      "What activities did you enjoy doing with your children?",
      "How did your approach to parenting change from your first child to your last (if applicable)?",
      "What do you consider your greatest success as a parent?",
      "What advice about parenting would you give to your children as they raise their own families?",
    ],
    retirement: [
      "How did you prepare for retirement? What advice would you give others?",
      "Describe your feelings on your last day of work and first day of retirement.",
      "How has retirement been different from what you expected?",
      "What new activities or interests have you developed since retiring?",
      "How has your daily routine changed in retirement?",
      "What has been the most rewarding aspect of retirement for you?",
      "What has been challenging about retirement, and how have you addressed those challenges?",
      "How has your perspective on time changed since retiring?",
      "What relationships have become more important to you in retirement?",
      "What goals or dreams are you still pursuing in this chapter of your life?",
    ],
    wisdom: [
      "What do you know now that you wish you had known when you were younger?",
      "What have been the most important lessons you've learned in life?",
      "Describe a major mistake or regret and what you learned from it.",
      "What values have guided your decisions throughout your life?",
      "What does success mean to you, and has that definition changed over time?",
      "What advice would you give to your grandchildren about money and finances?",
      "What advice would you give about finding happiness and fulfillment?",
      "How have your spiritual or philosophical beliefs evolved throughout your life?",
      "What has been your approach to handling life's uncertainties and challenges?",
      "If you could leave one message for future generations of your family, what would it be?",
    ],
  };

  // Type guard to check if the category is a valid key of prompts
  const isValidCategory = (cat: string): cat is keyof typeof prompts => {
    return cat in prompts;
  };

  // Get prompts for the selected category or default to childhood
  const currentPrompts = isValidCategory(category) 
    ? prompts[category] 
    : prompts.childhood;

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
