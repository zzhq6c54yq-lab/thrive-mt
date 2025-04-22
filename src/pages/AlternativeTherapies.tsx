
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Leaf,
  Moon,
  GanttChart,
  Sparkles,
  Flower2,
  Music,
  Palette,
  Flame,
  Flower,
  Feather,
  Droplet,
  Waves,
  Play,
  Info,
  ArrowRight,
  BookOpen
} from "lucide-react";

type Therapy = {
  id: string;
  name: string;
  icon: React.ReactElement;
  shortDescription: string;
  description: string;
  benefits: string[];
  coverImage: string;
  bgColor: string;
  accentColor: string;
};

const AlternativeTherapies = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  const returnPath = location.state?.from || "/";
  
  const handleBack = () => {
    navigate(-1); // This will navigate back to the previous screen in history
  };
  
  const handleGuidedPractice = (therapyId: string, therapyName: string) => {
    toast({
      title: "Opening guided practice",
      description: `Starting ${therapyName} session`,
      duration: 2000,
    });
    
    // Fix: Only pass serializable data in the navigation state
    navigate(`/guided-practice/${therapyId}`, {
      state: { 
        therapyId,
        therapyName,
        returnPath: location.pathname
      }
    });
  };
  
  const handleViewDetails = (therapyId: string) => {
    navigate(`/alternative-therapies/detail/${therapyId}`, {
      state: { returnPath: location.pathname }
    });
  };
  
  const therapies: Therapy[] = [
    {
      id: "mindfulness",
      name: "Mindfulness Meditation",
      icon: <Flower2 />,
      shortDescription: "Cultivate present moment awareness.",
      description: "Mindfulness meditation involves focusing on the present moment without judgment. It can help reduce stress, improve focus, and enhance overall well-being.",
      benefits: ["Stress reduction", "Improved focus", "Emotional regulation"],
      coverImage: "https://images.unsplash.com/photo-1593811167565-4672e6c8f62b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#E6E1FF",
      accentColor: "#9B87F5",
    },
    {
      id: "aromatherapy",
      name: "Aromatherapy",
      icon: <Leaf />,
      shortDescription: "Use essential oils for therapeutic benefits.",
      description: "Aromatherapy uses essential oils extracted from plants to promote physical and psychological well-being. It can be used to alleviate pain, improve mood, and enhance relaxation.",
      benefits: ["Pain relief", "Mood enhancement", "Relaxation"],
      coverImage: "https://images.unsplash.com/photo-1608571423902-ead5fac2f9cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#E0FFE1",
      accentColor: "#87F58D",
    },
    {
      id: "yoga",
      name: "Yoga",
      icon: <GanttChart />,
      shortDescription: "Practice physical postures, breathing techniques, and meditation.",
      description: "Yoga combines physical postures, breathing techniques, and meditation to promote physical and mental health. It can improve flexibility, strength, and balance, as well as reduce stress and anxiety.",
      benefits: ["Improved flexibility", "Stress reduction", "Increased strength"],
      coverImage: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      bgColor: "#FFF3E0",
      accentColor: "#E3B85C",
    },
    {
      id: "music-therapy",
      name: "Music Therapy",
      icon: <Music />,
      shortDescription: "Use music to address emotional and psychological needs.",
      description: "Music therapy uses music to address emotional, cognitive, and social needs. It can help reduce anxiety, improve mood, and enhance communication skills.",
      benefits: ["Anxiety reduction", "Mood improvement", "Enhanced communication"],
      coverImage: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#FFE0E0",
      accentColor: "#E35C5C",
    },
    {
      id: "art-therapy",
      name: "Art Therapy",
      icon: <Palette />,
      shortDescription: "Express yourself through creative art processes.",
      description: "Art therapy uses creative art processes to promote emotional and psychological well-being. It can help individuals express themselves, explore their emotions, and improve their self-esteem.",
      benefits: ["Emotional expression", "Self-esteem improvement", "Stress reduction"],
      coverImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#FFF8E0",
      accentColor: "#E3C85C",
    },
    {
      id: "hydrotherapy",
      name: "Hydrotherapy",
      icon: <Droplet />,
      shortDescription: "Use water for pain relief and relaxation.",
      description: "Hydrotherapy involves the use of water in various forms (e.g., hot tubs, cold plunges) to treat a variety of conditions. It can help reduce pain, improve circulation, and promote relaxation.",
      benefits: ["Pain relief", "Improved circulation", "Relaxation"],
      coverImage: "https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#E0FFFF",
      accentColor: "#5CE3E3",
    },
    {
      id: "tai-chi",
      name: "Tai Chi",
      icon: <Waves />,
      shortDescription: "Practice gentle, flowing movements and meditation.",
      description: "Tai chi is a gentle form of exercise that combines flowing movements, meditation, and deep breathing. It can improve balance, coordination, and flexibility, as well as reduce stress and anxiety.",
      benefits: ["Improved balance", "Stress reduction", "Increased flexibility"],
      coverImage: "https://images.unsplash.com/photo-1551894116-54ecf9a84595?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#E0F0FF",
      accentColor: "#5C7DE3",
    },
    {
      id: "qigong",
      name: "Qigong",
      icon: <Feather />,
      shortDescription: "Coordinate breathing, movement, and awareness.",
      description: "Qigong involves coordinating breathing, movement, and awareness to cultivate and balance qi (energy). It can improve physical and mental health, reduce stress, and enhance overall well-being.",
      benefits: ["Stress reduction", "Improved energy", "Enhanced well-being"],
      coverImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#FFF0E0",
      accentColor: "#E3C85C",
    },
    {
      id: "reiki",
      name: "Reiki",
      icon: <Sparkles />,
      shortDescription: "Use gentle touch to promote healing and balance.",
      description: "Reiki is a form of energy healing that uses gentle touch to promote physical, emotional, and spiritual well-being. It can help reduce stress, alleviate pain, and enhance relaxation.",
      benefits: ["Stress reduction", "Pain relief", "Enhanced relaxation"],
      coverImage: "https://images.unsplash.com/photo-1527064563585-6c74e5e02ee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#F0E0FF",
      accentColor: "#C85CE3",
    },
    {
      id: "acupressure",
      name: "Acupressure",
      icon: <Flame />,
      shortDescription: "Apply pressure to specific points on the body.",
      description: "Acupressure involves applying pressure to specific points on the body to stimulate energy flow and promote healing. It can help relieve pain, reduce stress, and improve circulation.",
      benefits: ["Pain relief", "Stress reduction", "Improved circulation"],
      coverImage: "https://images.unsplash.com/photo-1542848285-4777eb2a621e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#FFE0E0",
      accentColor: "#E35C5C",
    },
    {
      id: "breath-work",
      name: "Breath Work",
      icon: <Flower />,
      shortDescription: "Consciously control your breathing for relaxation.",
      description: "Breath work involves consciously controlling your breathing to promote relaxation, reduce stress, and improve overall well-being. It can be used to calm the mind, increase energy, and enhance emotional regulation.",
      benefits: ["Stress reduction", "Improved energy", "Emotional regulation"],
      coverImage: "https://images.unsplash.com/photo-1593811167565-4672e6c8f62b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#E0FFE0",
      accentColor: "#5CE39B",
    },
    {
      id: "sound-therapy",
      name: "Sound Therapy",
      icon: <Moon />,
      shortDescription: "Use sound to promote relaxation and healing.",
      description: "Sound therapy uses sound to promote relaxation, reduce stress, and improve overall well-being. It can involve listening to music, nature sounds, or specific frequencies to balance the body's energy.",
      benefits: ["Stress reduction", "Improved relaxation", "Enhanced well-being"],
      coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      bgColor: "#E0E0FF",
      accentColor: "#5C7DE3",
    },
  ];
  
  const categories = [
    { id: "all", label: "All Therapies" },
    { id: "meditation", label: "Meditation" },
    { id: "movement", label: "Movement" },
    { id: "creative", label: "Creative" },
    { id: "energy", label: "Energy" },
    { id: "nature", label: "Nature" },
  ];
  
  const filteredTherapies = activeTab === "all" 
    ? therapies 
    : therapies.filter(therapy => 
        (activeTab === "meditation" && ["mindfulness", "breath-work", "sound-therapy"].includes(therapy.id)) ||
        (activeTab === "movement" && ["yoga", "tai-chi", "qigong"].includes(therapy.id)) ||
        (activeTab === "creative" && ["art-therapy", "music-therapy"].includes(therapy.id)) ||
        (activeTab === "energy" && ["reiki", "acupressure"].includes(therapy.id)) ||
        (activeTab === "nature" && ["aromatherapy", "hydrotherapy"].includes(therapy.id))
      );

  return (
    <Page title="Explore Alternative Therapies" showBackButton={true} onBackClick={handleBack}>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#6E59A5]/30 to-[#D946EF]/30 p-5 rounded-xl">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-semibold mb-2 text-white">
                Discover Holistic Healing Methods
              </h2>
              <p className="text-white font-medium mb-4">
                Explore a range of alternative therapies to support your mental and physical well-being.
                From mindfulness to aromatherapy, find the practices that resonate with you.
              </p>
            </div>
            <div className="md:w-1/3 flex-shrink-0">
              <div className="p-4 rounded-full bg-[#8B5CF6]/40 inline-flex items-center justify-center">
                <Leaf className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 gap-2 w-full bg-transparent h-auto p-0">
            {categories.map(category => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="bg-[#1A1F2C] text-white border border-[#8B5CF6]/30 py-3 px-2 flex flex-col items-center gap-2 data-[state=active]:bg-[#8B5CF6] data-[state=active]:border-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-all duration-200 h-auto"
              >
                <span className="font-medium text-sm">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredTherapies.map(therapy => (
              <motion.div
                key={therapy.id}
                className="relative rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:scale-[1.01] group"
                style={{ backgroundColor: therapy.bgColor }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={therapy.coverImage}
                    alt={therapy.name}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                </div>
                
                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div 
                      className="p-3 rounded-full"
                      style={{ background: `${therapy.accentColor}25` }}
                    >
                      {therapy.icon}
                    </div>
                    <Info className="h-5 w-5 text-white/80 cursor-pointer" onClick={() => handleViewDetails(therapy.id)} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#E5C5A1] transition-colors">
                    {therapy.name}
                  </h3>
                  
                  <p className="text-white/80 mb-6 text-sm line-clamp-2">
                    {therapy.shortDescription}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button 
                      className="flex-1 flex items-center justify-center gap-2 hover:shadow-md"
                      style={{ 
                        backgroundColor: therapy.accentColor,
                        color: '#fff'
                      }}
                      onClick={() => handleGuidedPractice(therapy.id, therapy.name)}
                    >
                      <Play className="h-4 w-4" />
                      Start Practice
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2 border-white/50 text-white hover:bg-white/10"
                      onClick={() => handleViewDetails(therapy.id)}
                    >
                      <BookOpen className="h-4 w-4" />
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Tabs>
      </div>
    </Page>
  );
};

export default AlternativeTherapies;
