import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2, Lightbulb, Users, ShieldCheck, HeartHandshake, BookOpenCheck } from "lucide-react";
import UpcomingAppointments from "@/components/dashboard/UpcomingAppointments";
import ThriveHeader from "@/components/dashboard/ThriveHeader";
import KeyFeatures from "@/components/dashboard/KeyFeatures";
import SpecializedPrograms from "@/components/dashboard/SpecializedPrograms";
import InsightsSection from "@/components/dashboard/InsightsSection";
import GratitudeVisualizer from "@/components/dashboard/GratitudeVisualizer";
import QuizzesSection from "@/components/dashboard/QuizzesSection";
import FeaturedWorkshops from "@/components/dashboard/FeaturedWorkshops";
import NewFeatures from "@/components/dashboard/NewFeatures";

interface Props {
  selectedMood?: string | null;
  selectedQualities?: string[];
  selectedGoals?: string[];
  onHenryOpen?: () => void;
  navigateToFeature: (path: string) => void;
}

const MainDashboard: React.FC<Props> = ({
  selectedMood,
  selectedQualities = [],
  selectedGoals = [],
  onHenryOpen,
  navigateToFeature,
}) => {
  const [showNav, setShowNav] = useState<boolean>(true);

  const handleNavigate = (path: string) => {
    navigateToFeature(path);
  };

  // Add Connect & Share to the new features list
  const newFeatures = [
    {
      id: "connect-share",
      title: "Connect & Share",
      description: "Share videos, messages, and important documents with loved ones.",
      icon: Share2,
      path: "/connect-and-share", 
      color: "from-blue-400 to-indigo-500",
      new: true
    },
    {
      id: "personalized-content",
      title: "Personalized Content",
      description: "Curated content based on your interests and goals.",
      icon: Lightbulb,
      path: "/personalized-content",
      color: "from-yellow-400 to-orange-500",
      new: true
    },
    {
      id: "community-support",
      title: "Community Support",
      description: "Connect with others and share your experiences.",
      icon: Users,
      path: "/community-support",
      color: "from-green-400 to-teal-500",
      new: true
    },
    {
      id: "privacy-security",
      title: "Privacy & Security",
      description: "Learn about our commitment to your privacy and security.",
      icon: ShieldCheck,
      path: "/privacy-security",
      color: "from-purple-400 to-pink-500",
      new: true
    },
    {
      id: "family-support",
      title: "Family Support",
      description: "Resources and support for your family's mental wellness.",
      icon: HeartHandshake,
      path: "/family-support",
      color: "from-red-400 to-rose-500",
      new: true
    },
    {
      id: "self-help-resources",
      title: "Self-Help Resources",
      description: "Access articles, guides, and tools for self-improvement.",
      icon: BookOpenCheck,
      path: "/self-help-resources",
      color: "from-blue-400 to-cyan-500",
      new: true
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <ThriveHeader 
        showNav={showNav} 
        setShowNav={setShowNav} 
        selectedMood={selectedMood}
        onHenryOpen={onHenryOpen}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NewFeatures 
              features={newFeatures} 
              onFeatureSelect={handleNavigate}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <UpcomingAppointments />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <KeyFeatures onFeatureSelect={handleNavigate} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <FeaturedWorkshops />
          </motion.div>
        </div>
        
        <div className="lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GratitudeVisualizer />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <InsightsSection selectedQualities={selectedQualities} selectedGoals={selectedGoals} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <QuizzesSection />
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <SpecializedPrograms navigateToFeature={handleNavigate} />
      </motion.div>
    </div>
  );
};

export default MainDashboard;
