
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useWorkshopNavigation = () => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    setSelectedWorkshop(workshopId);

    // Get the language for toast
    const preferredLanguage = localStorage.getItem("preferredLanguage") || "English";
    const isSpanish = preferredLanguage === "Español";

    toast({
      title: isSpanish ? "Abriendo taller" : "Opening workshop",
      description: isSpanish 
        ? `Cargando: ${workshopTitle}` 
        : `Loading: ${workshopTitle}`,
      duration: 2000,
    });

    navigate(`/workshop/${workshopId}`, { 
      state: { 
        workshopTitle,
        preventTutorial: true 
      } 
    });
  };

  return {
    selectedWorkshop,
    handleWorkshopClick,
  };
};
