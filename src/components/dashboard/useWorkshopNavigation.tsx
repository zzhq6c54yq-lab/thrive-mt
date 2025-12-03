
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useWorkshopNavigation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  const handleWorkshopClick = (workshopId: string, workshopTitle: string) => {
    toast({
      title: isSpanish ? "Abriendo Taller" : "Opening Workshop",
      description: isSpanish ? 
        `Cargando contenido del taller "${workshopTitle}"...` : 
        `Loading "${workshopTitle}" workshop content...`,
      duration: 1500
    });
    
    switch(workshopId) {
      case "mindful-communication":
        navigate("/app/workshop/mindful-communication", { 
          state: { workshopTitle: isSpanish ? "Comunicación Consciente" : "Mindful Communication" } 
        });
        break;
      case "emotional-regulation":
        navigate("/app/workshop/emotional-regulation", {
          state: { workshopTitle: isSpanish ? "Regulación Emocional" : "Emotional Regulation" }
        });
        break;
      case "stress-management":
        navigate("/app/workshop/stress-management", {
          state: { workshopTitle: isSpanish ? "Manejo del Estrés" : "Stress Management" }
        });
        break;
      default:
        if (workshopId.startsWith("military-")) {
          const militaryWorkshopId = workshopId.replace("military-", "");
          navigate(`/app/military-workshop/${militaryWorkshopId}`);
        } 
        else if (workshopId.startsWith("corporate-")) {
          const corporateWorkshopId = workshopId.replace("corporate-", "");
          navigate("/app/corporate-wellness", { 
            state: { 
              workshop: workshopTitle, 
              showWorkshopContent: true 
            } 
          });
        }
        else {
          navigate(`/app/workshop/${workshopId}`);
        }
    }
  };
  
  return { handleWorkshopClick };
};
