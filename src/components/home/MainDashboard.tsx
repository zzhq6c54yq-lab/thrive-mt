
import React from "react";
import DashboardGrid from "@/components/dashboard/DashboardGrid";
import useTranslation from "@/hooks/useTranslation";

interface MainDashboardProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
  markTutorialCompleted?: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  userName,
  showHenry,
  onHenryToggle,
  selectedQualities,
  selectedGoals,
  navigateToFeature,
  markTutorialCompleted
}) => {
  const { getTranslatedText } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <DashboardGrid 
        navigateToFeature={navigateToFeature}
        userName={userName}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
      />
    </div>
  );
};

export default MainDashboard;
