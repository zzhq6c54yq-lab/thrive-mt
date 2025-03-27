
import React, { useEffect, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Calendar, Bell, Brain, Heart } from "lucide-react";

interface ReminderConfig {
  userId?: string;
  preferences?: {
    reminderFrequency: 'hourly' | 'daily' | 'weekly';
    categories: string[];
    doNotDisturb?: boolean;
  };
}

// Dummy reminders database - in a real app this would come from a backend
const selfCareReminders = [
  {
    category: "mindfulness",
    messages: [
      "Take a moment to pause and focus on your breathing for 60 seconds.",
      "Try a quick body scan meditation - notice any tension and let it melt away.",
      "Observe your surroundings with curiosity - find 3 things you hadn't noticed before.",
      "Practice present moment awareness by fully engaging with whatever you're doing right now."
    ],
    icon: Brain
  },
  {
    category: "physical",
    messages: [
      "Remember to stand up and stretch if you've been sitting for a while.",
      "Take a short walk to refresh your mind and body.",
      "Stay hydrated! Have you had enough water today?",
      "Try rolling your shoulders and neck to release any built-up tension."
    ],
    icon: Heart
  },
  {
    category: "emotional",
    messages: [
      "Take a moment to check in with your emotions. What are you feeling right now?",
      "Practice gratitude by noting three things you appreciate today.",
      "Remember that it's okay to set boundaries when you need to.",
      "Consider journaling about your thoughts for a few minutes."
    ],
    icon: Heart
  },
  {
    category: "social",
    messages: [
      "Consider reaching out to someone you care about today.",
      "Express appreciation to someone who has helped you recently.",
      "Schedule time for meaningful connection this week.",
      "Remember that asking for support when needed is a sign of strength."
    ],
    icon: Calendar
  }
];

export const useHenryReminders = (config?: ReminderConfig) => {
  const { toast } = useToast();
  const [lastReminderTime, setLastReminderTime] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

  // Demo implementation - in a real app, this would be more sophisticated
  useEffect(() => {
    if (!isActive) return;
    
    // Set up the reminder interval (hourly for demo purposes)
    const reminderInterval = setInterval(() => {
      const now = new Date();
      
      // Don't trigger if a reminder was shown in the last 50 minutes (for demo)
      if (lastReminderTime && (now.getTime() - lastReminderTime.getTime() < 50 * 60 * 1000)) {
        return;
      }
      
      // Choose a random category and message
      const categoryIndex = Math.floor(Math.random() * selfCareReminders.length);
      const category = selfCareReminders[categoryIndex];
      const messageIndex = Math.floor(Math.random() * category.messages.length);
      const message = category.messages[messageIndex];
      const Icon = category.icon;
      
      // Show the reminder
      toast({
        title: "Henry's Self-Care Reminder",
        description: message,
        duration: 8000,
        action: (
          <div className="flex items-center">
            <Icon className="h-4 w-4 mr-1 text-primary" />
            <span className="text-xs">{category.category}</span>
          </div>
        ),
      });
      
      setLastReminderTime(now);
    }, 10 * 60 * 1000); // Check every 10 minutes
    
    // Cleanup
    return () => {
      clearInterval(reminderInterval);
    };
  }, [isActive, lastReminderTime, toast]);
  
  // Show one immediate reminder when component first mounts (for demo)
  useEffect(() => {
    // Wait a moment before showing first reminder
    const initialTimeout = setTimeout(() => {
      // Choose a random category and message
      const categoryIndex = Math.floor(Math.random() * selfCareReminders.length);
      const category = selfCareReminders[categoryIndex];
      const messageIndex = Math.floor(Math.random() * category.messages.length);
      const message = category.messages[messageIndex];
      const Icon = category.icon;
      
      // Show the reminder
      toast({
        title: "Henry's Check-In",
        description: message,
        duration: 10000,
        action: (
          <div className="flex items-center gap-1">
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-xs capitalize">{category.category}</span>
          </div>
        ),
      });
      
      setLastReminderTime(new Date());
    }, 15000); // 15 seconds after mount for demo
    
    return () => {
      clearTimeout(initialTimeout);
    };
  }, [toast]);
  
  return {
    pauseReminders: () => setIsActive(false),
    resumeReminders: () => setIsActive(true),
    triggerReminder: () => {
      const categoryIndex = Math.floor(Math.random() * selfCareReminders.length);
      const category = selfCareReminders[categoryIndex];
      const messageIndex = Math.floor(Math.random() * category.messages.length);
      const message = category.messages[messageIndex];
      
      toast({
        title: "Henry's Self-Care Reminder",
        description: message,
        duration: 8000,
      });
      
      setLastReminderTime(new Date());
    }
  };
};

// This component doesn't render anything visible but manages the reminders
const HenryReminderService: React.FC<ReminderConfig> = (props) => {
  useHenryReminders(props);
  return null;
};

export default HenryReminderService;
