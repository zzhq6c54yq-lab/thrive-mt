
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import FeaturedWorkshops from "./FeaturedWorkshops";
import ToolsFeatures from "./ToolsFeatures";
import EmergencyResources from "./EmergencyResources";
import SubscriptionPlansDialog from "./SubscriptionPlansDialog";
import SponsorChatbot from "@/components/SponsorChatbot";
import { VirtualClass } from "@/data/toolCategories";

interface DashboardProps {
  workshops: VirtualClass[];
  features: any[];
  randomAffirmation: string;
  randomEncouragement: string;
  emergencyResources: any[];
  subscriptionPlans: any[];
  currentMood: string | null;
  onMoodSelect: (mood: string) => void;
  onVisionBoardClick: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  workshops,
  features,
  randomAffirmation,
  randomEncouragement,
  emergencyResources,
  subscriptionPlans,
  currentMood,
  onMoodSelect,
  onVisionBoardClick,
}) => {
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#1a1a20] text-white">
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Your Mental Health Journey Starts Here</h1>
          <p className="text-xl md:text-2xl text-[#B87333] mb-8">Evidence-based tools, therapy, and support - all in one place</p>
          
          <SubscriptionPlansDialog 
            plans={subscriptionPlans}
            isOpen={isSubDialogOpen}
            onOpenChange={setIsSubDialogOpen}
          />
          
          <div className="bg-[#2a2a30] p-4 rounded-lg shadow-lg max-w-xl mx-auto mb-8">
            <p className="text-lg font-light italic text-gray-300">{randomAffirmation}</p>
          </div>
        </div>

        <FeaturedWorkshops workshops={workshops} />
        <ToolsFeatures features={features} />

        <div className="mt-12 mb-12">
          <SponsorChatbot 
            selectedMood={currentMood} 
            contextType="mental_health" 
            className="max-w-3xl mx-auto" 
          />
        </div>

        <EmergencyResources 
          resources={emergencyResources}
          onVisionBoardClick={onVisionBoardClick}
        />
      </section>
    </div>
  );
};

export default Dashboard;
