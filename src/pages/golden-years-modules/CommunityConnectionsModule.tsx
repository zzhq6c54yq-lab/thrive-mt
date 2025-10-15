import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import NavigationBar from "@/components/navigation/NavigationBar";
import ModuleHeader from "@/components/golden-years/modules/ModuleHeader";
import LessonCard, { Lesson } from "@/components/golden-years/modules/LessonCard";
import ProgressTracker from "@/components/golden-years/modules/ProgressTracker";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CommunityConnectionsModule: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const lessons: Lesson[] = [
    {
      id: 1,
      title: "Finding Local Senior Groups",
      duration: "15 min",
      description: "Discover community groups and activities near you.",
      prompts: [
        "What are your hobbies and interests?",
        "What kind of people do you enjoy spending time with?",
        "What activities would you like to try in a group setting?"
      ],
      resources: [
        { title: "Community Center Directory", type: "PDF" },
        { title: "Senior Group Finder Guide", type: "PDF" }
      ]
    },
    {
      id: 2,
      title: "Building Meaningful Friendships",
      duration: "20 min",
      description: "Learn strategies for creating and maintaining friendships.",
      prompts: [
        "What qualities do you value most in a friend?",
        "What makes you a good friend to others?",
        "What barriers prevent you from making new friends?"
      ],
      resources: [
        { title: "Conversation Starter Cards", type: "PDF" },
        { title: "Friendship Building Activities", type: "PDF" }
      ]
    },
    {
      id: 3,
      title: "Staying Socially Active",
      duration: "15 min",
      description: "Create a plan to maintain regular social connections.",
      prompts: [
        "What social activities energize you?",
        "How often would you like to socialize?",
        "What prevents you from being as social as you'd like?"
      ],
      resources: [
        { title: "Weekly Social Calendar Template", type: "PDF" },
        { title: "Activity Ideas List", type: "PDF" }
      ]
    },
    {
      id: 4,
      title: "Volunteering & Giving Back",
      duration: "20 min",
      description: "Find meaningful ways to contribute to your community.",
      prompts: [
        "What causes are you passionate about?",
        "What skills or experiences can you share?",
        "How much time can you dedicate to volunteering?"
      ],
      resources: [
        { title: "Volunteer Opportunity Finder", type: "PDF" },
        { title: "Impact Tracking Sheet", type: "PDF" }
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
        .eq('module_type', 'community')
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
          module_type: 'community',
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
        title="Community Connections"
        portalMode={true}
        portalPath="/golden-years-portal"
      />

      <div className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <ModuleHeader
          title="Community Connections"
          icon={Users}
          progress={progress}
          completedCount={completedLessons.length}
          totalCount={lessons.length}
        />

        <div className="grid gap-6 mb-6">
          <ProgressTracker
            totalLessons={lessons.length}
            completedLessons={completedLessons.length}
            moduleType="community"
          />
        </div>

        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completedLessons.includes(lesson.id)}
              onComplete={handleLessonComplete}
              moduleType="community"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityConnectionsModule;
