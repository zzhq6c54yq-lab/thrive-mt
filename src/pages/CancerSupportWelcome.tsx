
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, BookHeart, Calendar, MessageCircle, StarHalf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const CancerSupportWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    toast({
      title: "Welcome to Cancer Support Community",
      description: "Accessing specialized resources for cancer patients and families",
      duration: 2000,
    });
    navigate("/app/cancer-support-portal");
  };

  // Define what users can expect from this program
  const whatToExpect = [
    "Access to a community of fellow cancer patients, survivors, and caregivers",
    "Resources and information about different cancer types and treatment options",
    "Tools to help manage symptoms, side effects, and treatment schedules",
    "Emotional support resources for the entire cancer journey",
    "Special sections for children affected by cancer - either as patients or family members",
    "Remembrance resources for those who have lost loved ones to cancer",
    "Expert articles and videos about the latest research and treatments"
  ];

  // Add a motivational message for users
  const motivationalMessage = "You are not alone on this journey. Whether you're facing cancer yourself or supporting someone who is, this community stands with you with compassion, resources, and hope.";

  return (
    <SpecializedProgramWelcome
      title="Cancer Support Community"
      description="Welcome to a compassionate space designed specifically for cancer patients, survivors, caregivers, and families. Here, you'll find resources, support communities, and tools to help navigate the challenges of cancer - whether you're facing a diagnosis, supporting a loved one, or honoring someone's memory."
      whatToExpect={whatToExpect}
      color="purple-500"
      gradientFrom="purple-500"
      gradientTo="rose-500"
      borderColor="#9b87f5"
      portalPath="/app/cancer-support-portal"
      icon={<Heart className="h-8 w-8 text-purple-500" />}
      coverImage="/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png"
      motivationalMessage={motivationalMessage}
    />
  );
};

export default CancerSupportWelcome;
