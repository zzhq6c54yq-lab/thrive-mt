
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

  return (
    <SpecializedProgramWelcome
      title="Cancer Support Community"
      subtitle="Together on the journey of hope, healing, and connection"
      description="Welcome to a compassionate space designed specifically for cancer patients, survivors, caregivers, and families. Here, you'll find resources, support communities, and tools to help navigate the challenges of cancer - whether you're facing a diagnosis, supporting a loved one, or honoring someone's memory."
      imagePath="/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png"
      imageAlt="People supporting each other in a cancer support group setting"
      gradientColors="from-rose-500/20 to-amber-500/20"
      features={features}
      actionButton={
        <Button 
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white"
        >
          Enter Cancer Support Portal
        </Button>
      }
    />
  );
};

export default CancerSupportWelcome;
