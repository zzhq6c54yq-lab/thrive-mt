
import React from "react";
import { BookOpen, Heart, Activity, Stethoscope, Dumbbell, Target, User, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ChronicIllnessResources: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const resources = [
    {
      id: "understanding",
      title: "Understanding Chronic Illness",
      description: "Educational resources about different types of chronic conditions and their effects on mental health.",
      icon: BookOpen,
      color: "bg-purple-500",
      actions: [
        { title: "Medical Information", path: "/chronic-illness/resources" },
        { title: "Personal Stories", path: "/chronic-illness/stories" },
        { id: "chronic101", title: "Chronic Illness 101", path: "/chronic-illness/education" }
      ]
    },
    {
      id: "daily-management",
      title: "Daily Management Tools",
      description: "Resources to help track and manage symptoms, medications and appointments.",
      icon: Activity,
      color: "bg-purple-600",
      actions: [
        { title: "Symptom Tracking Guide", path: "/chronic-illness/symptoms" },
        { title: "Medication Management", path: "/chronic-illness/medications" },
        { title: "Pain Management Resources", path: "/chronic-illness/pain-management" }
      ]
    },
    {
      id: "professional-resources",
      title: "Professional Resources",
      description: "Access to healthcare professionals and specialized resources.",
      icon: Stethoscope,
      color: "bg-purple-500",
      actions: [
        { title: "Find Specialists", path: "/chronic-illness/specialists" },
        { title: "Teletherapy Options", path: "/chronic-illness/teletherapy" },
        { title: "Resource Directory", path: "/chronic-illness/resources" }
      ]
    },
    {
      id: "wellness",
      title: "Wellness & Self-Care",
      description: "Resources for maintaining overall wellbeing while managing chronic conditions.",
      icon: Heart,
      color: "bg-purple-400",
      actions: [
        { id: "meditation", title: "Guided Meditations", path: "/chronic-illness/meditations" },
        { id: "movement", title: "Adaptive Exercise", path: "/chronic-illness/movement" },
        { title: "Nutrition Resources", path: "/chronic-illness/nutrition" }
      ]
    },
    {
      id: "caregivers",
      title: "Family & Caregiver Resources",
      description: "Support resources for those who care for people with chronic conditions.",
      icon: User,
      color: "bg-purple-500",
      actions: [
        { id: "caregiver", title: "Caregiver Support", path: "/chronic-illness/caregivers" },
        { title: "Communication Tools", path: "/chronic-illness/communication" },
        { title: "Respite Care Information", path: "/chronic-illness/respite" }
      ]
    }
  ];

  // Handle button clicks with direct navigation
  const handleButtonClick = (path: string, title: string, id?: string) => {
    toast({
      title: `Accessing ${title}`,
      description: "Loading content...",
      duration: 1500,
    });
    
    navigate(path, {
      state: {
        fromChronicIllness: true,
        stayInPortal: true,
        portalPath: "/app/chronic-illness-portal",
        preventTutorial: true,
        title: title,
        resourceId: id
      }
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Chronic Illness Resources</h2>
        <p className="text-purple-700 dark:text-purple-300">
          Educational materials and tools specifically designed for managing chronic health conditions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="transition-all hover:shadow-lg bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-900/50">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={`p-2 rounded-full ${resource.color}`}>
                <resource.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-purple-800 dark:text-purple-200">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {resource.actions.map((action, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-800/30"
                    onClick={() => handleButtonClick(action.path, action.title, action.id)}
                  >
                    {action.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChronicIllnessResources;
