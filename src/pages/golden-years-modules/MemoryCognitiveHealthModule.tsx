import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain } from "lucide-react";
import NavigationBar from "@/components/navigation/NavigationBar";
import ModuleHeader from "@/components/golden-years/modules/ModuleHeader";
import LessonCard, { Lesson } from "@/components/golden-years/modules/LessonCard";
import ProgressTracker from "@/components/golden-years/modules/ProgressTracker";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MemoryCognitiveHealthModule: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Brain Health Fundamentals",
      duration: "15 min",
      description: "Understand how your brain changes with age and how to support it.",
      prompts: [
        "What concerns do you have about your memory?",
        "What cognitive activities do you currently enjoy?",
        "How does memory affect your daily life?"
      ],
      resources: [
        { title: "Brain Health Facts Sheet", type: "PDF" },
        { title: "Cognitive Health Checklist", type: "PDF" }
      ]
    },
    {
      id: 2,
      title: "Memory Enhancement Techniques",
      duration: "25 min",
      description: "Learn proven strategies to improve your memory.",
      prompts: [
        "What do you often forget?",
        "What memory tricks have you tried before?",
        "How would better memory improve your life?"
      ],
      resources: [
        { title: "Memory Palace Guide", type: "PDF" },
        { title: "Mnemonic Devices Handbook", type: "PDF" }
      ]
    },
    {
      id: 3,
      title: "Brain Training Games & Puzzles",
      duration: "20 min",
      description: "Discover fun ways to keep your mind sharp.",
      prompts: [
        "What types of puzzles do you enjoy?",
        "How often do you challenge your brain?",
        "What motivates you to practice brain exercises?"
      ],
      resources: [
        { title: "Daily Puzzle Collection", type: "PDF" },
        { title: "Brain Game Recommendations", type: "PDF" }
      ]
    },
    {
      id: 4,
      title: "Preventing Cognitive Decline",
      duration: "20 min",
      description: "Lifestyle strategies to maintain brain health.",
      prompts: [
        "What lifestyle changes could support your brain health?",
        "What is your family history with cognitive health?",
        "What habits would you like to develop?"
      ],
      resources: [
        { title: "Prevention Strategies Guide", type: "PDF" },
        { title: "Early Warning Signs Checklist", type: "PDF" }
      ]
    }
  ];

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('golden_years_progress')
        .select('lesson_id')
        .eq('user_id', user.id)
        .eq('module_type', 'memory')
        .eq('completed', true);

      if (error) throw error;

      if (data) {
        setCompletedLessons(data.map(d => d.lesson_id));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLessonComplete = async (lessonId: number, responses: Record<string, string>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to save your progress.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('golden_years_progress')
        .upsert({
          user_id: user.id,
          module_type: 'memory',
          lesson_id: lessonId,
          completed: true,
          responses: responses,
          last_accessed_at: new Date().toISOString()
        });

      if (error) throw error;

      setCompletedLessons([...completedLessons, lessonId]);

      toast({
        title: "Lesson Completed! 🎉",
        description: "Your progress has been saved.",
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive"
      });
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#242424] via-[#2A2420] to-[#362F2A] flex items-center justify-center">
        <p className="text-[#F5DEB3]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#242424] via-[#2A2420] to-[#362F2A]">
      <NavigationBar
        showBackButton={false}
        showThriveButton={true}
        title="Memory & Cognitive Health"
        portalMode={true}
        portalPath="/golden-years-portal"
      />

      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <ModuleHeader
          title="Memory & Cognitive Health"
          icon={Brain}
          progress={progress}
          completedCount={completedLessons.length}
          totalCount={lessons.length}
        />

        <div className="grid gap-6 mb-6">
          <ProgressTracker
            totalLessons={lessons.length}
            completedLessons={completedLessons.length}
            moduleType="memory"
          />
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completedLessons.includes(lesson.id)}
              onComplete={handleLessonComplete}
              moduleType="memory"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryCognitiveHealthModule;
