import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import NavigationBar from "@/components/navigation/NavigationBar";
import ModuleHeader from "@/components/golden-years/modules/ModuleHeader";
import LessonCard, { Lesson } from "@/components/golden-years/modules/LessonCard";
import ProgressTracker from "@/components/golden-years/modules/ProgressTracker";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LifeTransitionsModule: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Navigating Retirement",
      duration: "25 min",
      description: "Find purpose and fulfillment in your retirement years.",
      prompts: [
        "How do you envision your ideal retirement?",
        "What gives you a sense of purpose?",
        "What new activities would you like to explore?"
      ],
      resources: [
        { title: "Purpose Discovery Worksheet", type: "PDF" },
        { title: "Retirement Planning Guide", type: "PDF" }
      ]
    },
    {
      id: 2,
      title: "Coping with Loss & Grief",
      duration: "20 min",
      description: "Navigate grief with compassion and find healthy ways to honor memories.",
      prompts: [
        "What losses have you experienced?",
        "How do you prefer to honor and remember loved ones?",
        "What support would be most helpful to you?"
      ],
      resources: [
        { title: "Grief Support Resources", type: "PDF" },
        { title: "Memorial Ideas Guide", type: "PDF" },
        { title: "Support Group Directory", type: "PDF" }
      ]
    },
    {
      id: 3,
      title: "Downsizing & Relocation",
      duration: "20 min",
      description: "Navigate moving and downsizing with less stress.",
      prompts: [
        "What makes a space feel like home to you?",
        "What possessions matter most?",
        "What concerns do you have about moving?"
      ],
      resources: [
        { title: "Downsizing Checklist", type: "PDF" },
        { title: "Moving Timeline Planner", type: "PDF" },
        { title: "Decluttering Guide", type: "PDF" }
      ]
    },
    {
      id: 4,
      title: "Adapting to Health Changes",
      duration: "25 min",
      description: "Adjust to health changes while maintaining quality of life.",
      prompts: [
        "What health changes are you experiencing?",
        "What support do you need?",
        "How can you adapt your daily routines?"
      ],
      resources: [
        { title: "Health Accommodation Strategies", type: "PDF" },
        { title: "Adaptive Living Tips", type: "PDF" }
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
        .eq('module_type', 'transitions')
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
          module_type: 'transitions',
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
        title="Life Transitions"
        portalMode={true}
        portalPath="/golden-years-portal"
      />

      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <ModuleHeader
          title="Life Transitions"
          icon={Compass}
          progress={progress}
          completedCount={completedLessons.length}
          totalCount={lessons.length}
        />

        <div className="grid gap-6 mb-6">
          <ProgressTracker
            totalLessons={lessons.length}
            completedLessons={completedLessons.length}
            moduleType="transitions"
          />
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completedLessons.includes(lesson.id)}
              onComplete={handleLessonComplete}
              moduleType="transitions"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifeTransitionsModule;
