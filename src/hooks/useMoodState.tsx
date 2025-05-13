
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useMoodState = () => {
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const { toast } = useToast();

  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    console.log("[useMoodState] Selected mood:", mood);
    setSelectedMood(mood);
    
    // Show a toast to confirm the mood selection to the user
    toast({
      title: "Mood selected",
      description: `You selected: ${mood}`,
      duration: 3000,
    });
  };

  return {
    selectedMood,
    handleMoodSelect
  };
};

export default useMoodState;
