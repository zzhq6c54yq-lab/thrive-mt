
import React from "react";
import { Brain, Calendar, Users, BookOpen, MessageCircle, PieChart, Microscope, LayoutDashboard, Gamepad2, Wallet } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const KeyFeatures = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFinancesClick = () => {
    navigate("/mental-finances");
    toast({
      title: "Mental Finances",
      description: "Explore resources on financial wellness and mental health",
    });
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-[#B87333]" />,
      label: "Mental Wellness Tools",
      description: "Evidence-based self-help tools",
      to: "/mental-wellness-tools",
    },
    {
      icon: <Calendar className="h-6 w-6 text-[#B87333]" />,
      label: "Real-Time Therapy",
      description: "Connect with licensed therapists",
      to: "/real-time-therapy",
    },
    {
      icon: <Users className="h-6 w-6 text-[#B87333]" />,
      label: "Community Support",
      description: "Connect with others on similar journeys",
      to: "/community-support",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#B87333]" />,
      label: "Workshops",
      description: "Interactive learning experiences",
      to: "/workshops",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-[#B87333]" />,
      label: "Journaling",
      description: "Express thoughts and track progress",
      to: "/journaling",
    },
    {
      icon: <PieChart className="h-6 w-6 text-[#B87333]" />,
      label: "Progress Reports",
      description: "Track your mental wellness journey",
      to: "/progress-reports",
    },
    {
      icon: <Microscope className="h-6 w-6 text-[#B87333]" />,
      label: "Self-Assessment",
      description: "Gain insights into your mental health",
      to: "/self-help-resources",
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-[#B87333]" />,
      label: "Personalized Content",
      description: "Content tailored to your needs",
      to: "/personalized-content",
    },
    {
      icon: <Gamepad2 className="h-6 w-6 text-[#B87333]" />,
      label: "Mental Health Games",
      description: "Fun activities for mental wellness",
      to: "/mental-health-games",
    },
    {
      icon: <Wallet className="h-6 w-6 text-[#B87333]" />,
      label: "Mental Finances",
      description: "Financial wellbeing for mental health",
      to: "/mental-finances",
      isNew: true,
      featured: true,
    },
  ];

  return (
    <div className="py-8 md:py-12">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-4">Key Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access a wide range of tools and resources designed to support every aspect of your mental wellness journey.
          </p>
          
          {/* Featured Mental Finances Button */}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleFinancesClick}
              className="bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white px-6 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group"
            >
              <Wallet className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col items-start">
                <span className="font-bold">Mental Finances</span>
                <span className="text-xs opacity-90">Financial wellness for better mental health</span>
              </div>
              <span className="px-2 py-0.5 bg-white/20 text-white text-xs rounded-full ml-2">New</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.to}
              className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 text-center hover:border-[#B87333]/30 group ${
                feature.featured ? 'hidden' : ''  // Hide the Mental Finances card since we have the featured button
              }`}
            >
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[#fffbf7] mx-auto mb-4 group-hover:bg-[#fdf3e7] transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-medium text-gray-900 mb-1 flex items-center justify-center gap-2">
                {feature.label}
                {feature.isNew && !feature.featured && (
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
