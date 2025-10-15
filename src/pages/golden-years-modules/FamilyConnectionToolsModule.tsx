import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import NavigationBar from "@/components/navigation/NavigationBar";
import ModuleHeader from "@/components/golden-years/modules/ModuleHeader";
import LessonCard, { Lesson } from "@/components/golden-years/modules/LessonCard";
import ProgressTracker from "@/components/golden-years/modules/ProgressTracker";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FamilyConnectionToolsModule: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Bridging Generational Gaps",
      duration: "20 min",
      description: "Connect meaningfully across generations.",
      prompts: [
        "What do you wish younger generations knew about you?",
        "What would you like to learn from younger family members?",
        "What values do you want to pass down?"
      ],
      resources: [
        { title: "Conversation Prompts for Families", type: "PDF" },
        { title: "Shared Activity Ideas", type: "PDF" }
      ]
    },
    {
      id: 2,
      title: "Effective Family Communication",
      duration: "15 min",
      description: "Improve communication with family members.",
      prompts: [
        "What communication challenges exist in your family?",
        "What needs to be said that hasn't been?",
        "How do you prefer to communicate important matters?"
      ],
      resources: [
        { title: "Communication Scripts", type: "PDF" },
        { title: "Conflict Resolution Tips", type: "PDF" }
      ]
    },
    {
      id: 3,
      title: "Creating Shared Memories",
      duration: "20 min",
      description: "Build lasting memories with loved ones.",
      prompts: [
        "What family traditions do you want to continue?",
        "What new memories would you like to create?",
        "What stories do you want to share with your family?"
      ],
      resources: [
        { title: "Memory-Making Activity List", type: "PDF" },
        { title: "Tradition Planning Guide", type: "PDF" }
      ]
    },
    {
      id: 4,
      title: "Digital Connection Skills",
      duration: "25 min",
      description: "Use technology to stay connected with family.",
      prompts: [
        "What technology feels intimidating to you?",
        "Who would you like to connect with digitally?",
        "What would make digital communication easier?"
      ],
      resources: [
        { title: "Video Call Setup Guide", type: "PDF" },
        { title: "Social Media Basics", type: "PDF" },
        { title: "Texting & Messaging Tips", type: "PDF" }
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
        .eq('module_type', 'family')
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
          module_type: 'family',
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
        title="Family Connection Tools"
        portalMode={true}
        portalPath="/golden-years-portal"
      />

      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <ModuleHeader
          title="Family Connection Tools"
          icon={Heart}
          progress={progress}
          completedCount={completedLessons.length}
          totalCount={lessons.length}
        />

        <div className="grid gap-6 mb-6">
          <ProgressTracker
            totalLessons={lessons.length}
            completedLessons={completedLessons.length}
            moduleType="family"
          />
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completedLessons.includes(lesson.id)}
              onComplete={handleLessonComplete}
              moduleType="family"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyConnectionToolsModule;
