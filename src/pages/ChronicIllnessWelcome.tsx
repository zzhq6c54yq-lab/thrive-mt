
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Heart, Brain, ArrowRight } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useToast } from "@/hooks/use-toast";

const ChronicIllnessWelcome: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    toast({
      title: "Welcome to Chronic Illness Support",
      description: "Loading your personalized resources...",
      duration: 1500,
    });
    navigate("/chronic-illness-portal", { 
      state: { 
        stayInPortal: true,
        preventTutorial: true
      }
    });
  };

  const features = [
    {
      icon: <Stethoscope className="h-6 w-6 text-purple-500" />,
      title: "Specialized Resources",
      description: "Access resources tailored specifically to managing chronic health conditions."
    },
    {
      icon: <Heart className="h-6 w-6 text-purple-500" />,
      title: "Emotional Support",
      description: "Tools to help manage the emotional aspects of living with chronic illness."
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      title: "Community Connection",
      description: "Connect with others who understand your chronic illness journey."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5ecfd] to-[#e5deff] dark:from-[#4b1b6e] dark:to-[#36205e]">
      <NavigationBar showBackButton={true} title="Chronic Illness Support" />
      
      <div className="container mx-auto px-4 pt-24 pb-20">
        <SpecializedProgramWelcome 
          title="Chronic Illness Support"
          description="Our specialized chronic illness support provides tools, resources, and community to help you maintain emotional well-being while managing long-term health conditions."
          whatToExpect={[
            "Specialized mental health resources tailored for those with chronic conditions",
            "Tools for managing the emotional aspects of chronic illness",
            "Community support from others with similar experiences",
            "Access to professionals who understand chronic illness",
            "Mindfulness and relaxation techniques adapted for chronic pain and fatigue",
            "Resources for caregivers and family members"
          ]}
          color="purple-600"
          gradientFrom="purple-600"
          gradientTo="purple-400"
          borderColor="#8B5CF6"
          portalPath="/chronic-illness-portal"
          icon={<Stethoscope className="h-12 w-12 text-white" />}
          coverImage="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1280&q=80"
          motivationalMessage="Your chronic condition may be part of your life's journey, but it doesn't define who you are. With the right support and tools, you can thrive despite the challenges."
        />
        
        <motion.div 
          className="mt-16 space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Key Features Section */}
          <motion.section variants={itemVariants} className="text-center">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-10">How We Support Your Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-purple-200 dark:border-purple-800/40 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2">{feature.title}</h3>
                    <p className="text-purple-700 dark:text-purple-300">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
          
          {/* Testimonials Section */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-6 text-center">From Our Community</h2>
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-200 dark:border-purple-800/40">
              <blockquote className="text-purple-700 dark:text-purple-300 italic text-center text-lg">
                "Finding mental health support that truly understands the unique challenges of chronic illness has been life-changing. The resources here have helped me develop coping strategies I use every day."
                <footer className="mt-4 text-purple-600 dark:text-purple-400 font-medium">
                  — Jamie, living with fibromyalgia
                </footer>
              </blockquote>
            </div>
          </motion.section>
          
          {/* Getting Started Section */}
          <motion.section variants={itemVariants} className="text-center">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-4">Ready to Get Started?</h2>
            <p className="text-purple-700 dark:text-purple-300 mb-8 max-w-2xl mx-auto">
              Our specialized portal provides resources, community support, and tools specifically designed for managing mental health alongside chronic physical conditions.
            </p>
            <Button 
              onClick={handleContinue} 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-xl"
            >
              Enter the Chronic Illness Portal <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default ChronicIllnessWelcome;
