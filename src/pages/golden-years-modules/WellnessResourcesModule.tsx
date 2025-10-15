import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeartHandshake } from "lucide-react";
import NavigationBar from "@/components/navigation/NavigationBar";
import ModuleHeader from "@/components/golden-years/modules/ModuleHeader";
import LessonCard, { Lesson } from "@/components/golden-years/modules/LessonCard";
import ProgressTracker from "@/components/golden-years/modules/ProgressTracker";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const WellnessResourcesModule: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Senior-Friendly Exercise Routines",
      duration: "20 min",
      description: "Discover gentle, effective exercises designed for your age and abilities.",
      prompts: [
        "What physical activities bring you joy?",
        "What physical limitations should you consider?",
        "When do you feel most energized during the day?"
      ],
      resources: [
        { title: "Chair Yoga Guide", type: "PDF" },
        { title: "Walking Plan Template", type: "PDF" },
        { title: "Stretching Routine Chart", type: "PDF" }
      ]
    },
    {
      id: 2,
      title: "Nutrition for Healthy Aging",
      duration: "15 min",
      description: "Learn about nutritional needs and meal planning strategies for seniors.",
      prompts: [
        "What are your current eating habits?",
        "Do you have any dietary restrictions or preferences?",
        "What challenges do you face with meal preparation?"
      ],
      resources: [
        { title: "Senior Nutrition Guide", type: "PDF" },
        { title: "Weekly Meal Planner", type: "PDF" },
        { title: "Grocery Shopping Checklist", type: "PDF" }
      ]
    },
    {
      id: 3,
      title: "Sleep & Rest Strategies",
      duration: "15 min",
      description: "Improve your sleep quality and establish healthy rest routines.",
      prompts: [
        "What is your current sleep pattern?",
        "What activities help you relax before bed?",
        "What disrupts your sleep?"
      ],
      resources: [
        { title: "Sleep Hygiene Checklist", type: "PDF" },
        { title: "Relaxation Techniques Guide", type: "PDF" }
      ]
    },
    {
      id: 4,
      title: "Managing Stress & Anxiety",
      duration: "20 min",
      description: "Learn practical techniques to manage stress and find peace.",
      prompts: [
        "What are your main sources of stress?",
        "What coping strategies have worked for you in the past?",
        "How does stress affect your daily life?"
      ],
      resources: [
        { title: "Breathing Exercises Guide", type: "PDF" },
        { title: "Mindfulness Practices", type: "PDF" },
        { title: "Stress Management Worksheet", type: "PDF" }
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
        .eq('module_type', 'wellness')
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
          module_type: 'wellness',
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
        title="Wellness Resources"
        portalMode={true}
        portalPath="/golden-years-portal"
      />

      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <ModuleHeader
          title="Wellness Resources"
          icon={HeartHandshake}
          progress={progress}
          completedCount={completedLessons.length}
          totalCount={lessons.length}
        />

        <div className="grid gap-6 mb-6">
          <ProgressTracker
            totalLessons={lessons.length}
            completedLessons={completedLessons.length}
            moduleType="wellness"
          />
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completedLessons.includes(lesson.id)}
              onComplete={handleLessonComplete}
              moduleType="wellness"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WellnessResourcesModule;
