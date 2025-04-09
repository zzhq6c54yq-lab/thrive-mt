
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Brain, Heart, Apple, Sunset, BadgeCheck, ArrowRight, Dumbbell, Waves, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeButton from "@/components/HomeButton";
import { useNavigate } from "react-router-dom";

const HolisticWellness: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeApproach, setActiveApproach] = useState<string | null>(null);

  const holisticApproaches = [
    {
      title: "Physical Wellbeing",
      description: "Movement, nutrition, and rest for your body",
      icon: Dumbbell,
      practices: [
        "Regular exercise tailored to your abilities",
        "Balanced nutrition with cultural considerations",
        "Adequate sleep and rest patterns",
        "Regular health check-ups and preventative care"
      ],
      resourcePath: "/mental-wellness-tools"
    },
    {
      title: "Mental Health",
      description: "Techniques to support your psychological wellbeing",
      icon: Brain,
      practices: [
        "Cognitive behavioral techniques",
        "Mindfulness and meditation practices",
        "Stress management strategies",
        "Setting healthy boundaries"
      ],
      resourcePath: "/mental-health-games"
    },
    {
      title: "Emotional Balance",
      description: "Understanding and processing emotions effectively",
      icon: Heart,
      practices: [
        "Emotional awareness exercises",
        "Journaling for emotional processing",
        "Healthy expression of feelings",
        "Building emotional resilience"
      ],
      resourcePath: "/personalized-content"
    },
    {
      title: "Social Connection",
      description: "Nurturing meaningful relationships and community",
      icon: HandHeart,
      practices: [
        "Building supportive relationships",
        "Community engagement and belonging",
        "Cultural connection and identity",
        "Healthy communication skills"
      ],
      resourcePath: "/community-support"
    },
    {
      title: "Spiritual Growth",
      description: "Finding meaning, purpose and connection",
      icon: Waves,
      practices: [
        "Exploring personal values and beliefs",
        "Connection with nature and the world",
        "Mindfulness and meditative practices",
        "Finding purpose and meaning"
      ],
      resourcePath: "/mindfulness"
    },
    {
      title: "Environmental Wellness",
      description: "Creating supportive spaces for wellbeing",
      icon: Leaf,
      practices: [
        "Creating healing home environments",
        "Reducing environmental stressors",
        "Nature connection and eco-therapy",
        "Sustainable living practices"
      ],
      resourcePath: "/resource-library"
    }
  ];

  const handlePracticeClick = (practice: string, approachTitle: string) => {
    setActiveApproach(approachTitle);
    toast({
      title: `${approachTitle} Practice`,
      description: `You've selected: ${practice}`,
      duration: 2000,
    });
  };

  const handleExploreClick = (approachTitle: string, resourcePath: string) => {
    toast({
      title: "Exploring Practices",
      description: `Loading ${approachTitle} resources...`,
      duration: 1500,
    });
    
    // Navigate to the associated resource page
    navigate(resourcePath);
  };

  const handleAssessmentStart = () => {
    toast({
      title: "Assessment Starting",
      description: "Preparing your personalized wellness assessment...",
      duration: 2000,
    });
    
    // In a real application, this would navigate to the assessment
    // For now, we'll just simulate it with a toast
    setTimeout(() => {
      toast({
        title: "Assessment Ready",
        description: "Your holistic wellness profile is being prepared.",
        duration: 3000,
      });
    }, 2500);
  };

  const navigateToMainMenu = () => {
    navigate("/", { state: { screenState: 'main' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-8 pb-16 px-4">
      <div className="fixed top-4 left-4 z-50">
        <HomeButton />
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/10"
          onClick={navigateToMainMenu}
        >
          <span>Main Menu</span>
        </Button>
      </div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-[#B87333]/10 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-[#B87333]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Holistic Wellness</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Embrace a comprehensive approach to wellbeing that nurtures your mind, body, and spirit
            through culturally responsive practices and personalized strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {holisticApproaches.map((approach, index) => (
            <Card 
              key={index}
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 border-[#B87333]/20 hover:border-[#B87333] group ${activeApproach === approach.title ? 'ring-2 ring-[#B87333]' : ''}`}
            >
              <CardHeader className="pb-2 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#B87333]/5 rounded-bl-full -z-0"></div>
                <div className="rounded-full bg-[#B87333]/10 w-14 h-14 flex items-center justify-center mb-3 group-hover:bg-[#B87333]/20 transition-colors relative z-10">
                  <approach.icon className="h-7 w-7 text-[#B87333] group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-2xl group-hover:text-[#B87333] transition-colors relative z-10">
                  {approach.title}
                </CardTitle>
                <CardDescription className="text-base group-hover:text-gray-700 transition-colors relative z-10">
                  {approach.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-4">
                  {approach.practices.map((practice, practiceIndex) => (
                    <li 
                      key={practiceIndex} 
                      className="flex items-start gap-2 cursor-pointer hover:bg-[#B87333]/5 p-2 rounded-md transition-colors"
                      onClick={() => handlePracticeClick(practice, approach.title)}
                    >
                      <BadgeCheck className="h-5 w-5 text-[#B87333] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{practice}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white group mt-2"
                  onClick={() => handleExploreClick(approach.title, approach.resourcePath)}
                >
                  <span>Explore Practices</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="md:flex">
            <div className="p-8 md:p-12">
              <div className="uppercase tracking-wide text-sm text-[#B87333] font-semibold mb-2">
                Personalized Assessment
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Discover Your Holistic Wellness Profile
              </h2>
              <p className="text-gray-600 mb-6">
                Take our comprehensive assessment to receive personalized recommendations 
                for your holistic wellness journey, tailored to your cultural background, 
                preferences, and current wellbeing status.
              </p>
              <Button 
                className="bg-gradient-to-br from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white shadow-md hover:shadow-lg"
                onClick={handleAssessmentStart}
              >
                Start Assessment
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Your Holistic Wellness Journey
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#B87333] to-[#E5C5A1]"></div>
            
            {[
              {
                title: "Awareness & Assessment",
                description: "Begin with self-reflection and comprehensive assessment of your current state of wellbeing across all dimensions."
              },
              {
                title: "Personalized Planning",
                description: "Develop a customized plan that integrates practices from various wellness dimensions, aligned with your cultural values."
              },
              {
                title: "Implementation & Practice",
                description: "Gradually incorporate holistic practices into your daily routine, focusing on sustainable changes."
              },
              {
                title: "Community & Support",
                description: "Connect with others on similar journeys and access resources to support your holistic wellness goals."
              },
              {
                title: "Growth & Evolution",
                description: "Continue to refine your approach as you learn what works best for your unique needs and circumstances."
              }
            ].map((step, index) => (
              <div 
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                  <h3 className="text-xl font-bold text-[#B87333] mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="w-10 h-10 rounded-full bg-[#B87333] flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolisticWellness;
