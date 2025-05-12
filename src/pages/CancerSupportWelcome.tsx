
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, BookHeart, Calendar, MessageCircle, StarHalf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
    navigate("/cancer-support-portal");
  };

  const features = [
    {
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      title: "Personalized Support",
      description: "Resources tailored to specific cancer types and stages"
    },
    {
      icon: <Users className="h-5 w-5 text-indigo-500" />,
      title: "Support Communities",
      description: "Connect with others on similar journeys through virtual support groups"
    },
    {
      icon: <BookHeart className="h-5 w-5 text-emerald-500" />,
      title: "Educational Resources",
      description: "Access to the latest information, treatment options, and research"
    },
    {
      icon: <Calendar className="h-5 w-5 text-amber-500" />,
      title: "Support Events",
      description: "Workshops, webinars, and community gatherings specifically for cancer support"
    },
    {
      icon: <MessageCircle className="h-5 w-5 text-sky-500" />,
      title: "Caregiver Resources",
      description: "Special section dedicated to those supporting loved ones through cancer"
    },
    {
      icon: <StarHalf className="h-5 w-5 text-purple-500" />,
      title: "Remembrance & Celebration",
      description: "Supportive community for those who have lost loved ones to cancer"
    }
  ];

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
      color="rose-500"
      gradientFrom="rose-500"
      gradientTo="amber-500"
      borderColor="#e11d48"
      portalPath="/cancer-support-portal"
      icon={<Heart className="h-8 w-8 text-rose-500" />}
      coverImage="/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png"
      motivationalMessage={motivationalMessage}
    />
  );
};

export default CancerSupportWelcome;
