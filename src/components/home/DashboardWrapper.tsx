
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import DashboardContent from "@/components/dashboard/DashboardContent";

interface DashboardWrapperProps {
  userName: string;
  selectedQualities: string[];
  selectedGoals: string[];
  navigateToFeature: (path: string) => void;
}

const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  userName,
  selectedQualities,
  selectedGoals,
  navigateToFeature
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isSpanish } = useTranslation();

  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    toast({
      title: isSpanish ? "Cargando taller..." : "Loading workshop...",
      description: isSpanish ? `Abriendo "${workshopTitle}"` : `Opening "${workshopTitle}"`,
      duration: 1500,
    });
    navigate(`/workshop/${workshopId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Welcome Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {isSpanish ? `¡Bienvenido, ${userName}!` : `Welcome, ${userName}!`}
        </h1>
        <p className="text-xl text-gray-300">
          {isSpanish ? "Tu viaje de bienestar comienza aquí" : "Your wellness journey starts here"}
        </p>
      </div>

      <DashboardContent
        navigate={navigate}
        onWorkshopClick={handleWorkshopClick}
        navigateToFeature={navigateToFeature}
        selectedQualities={selectedQualities}
        selectedGoals={selectedGoals}
      />
    </div>
  );
};

export default DashboardWrapper;
