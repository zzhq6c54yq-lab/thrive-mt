
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useSubscriptionState = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const { toast } = useToast();

  // Get language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';

  const handleSubscriptionSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    
    const planMessages = {
      'English': {
        title: `${planTitle} Plan Selected`,
        description: `You have selected the ${planTitle} subscription plan.`
      },
      'Español': {
        title: `Plan ${planTitle} Seleccionado`,
        description: `Has seleccionado el plan de suscripción ${planTitle}.`
      },
      'Português': {
        title: `Plano ${planTitle} Selecionado`,
        description: `Você selecionou o plano de assinatura ${planTitle}.`
      }
    };
    
    const message = planMessages[preferredLanguage as keyof typeof planMessages] || planMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) 
        ? prev.filter(addon => addon !== id) 
        : [...prev, id]
    );

    // Get appropriate add-on name based on language
    let addOnName = '';
    if (id === 'dod') addOnName = preferredLanguage === 'Español' ? 'Militares y Veteranos' : preferredLanguage === 'Português' ? 'Militares e Veteranos' : 'Military and Veterans';
    else if (id === 'college') addOnName = preferredLanguage === 'Español' ? 'La Experiencia Universitaria' : preferredLanguage === 'Português' ? 'A Experiência Universitária' : 'The College Experience';
    else if (id === 'business') addOnName = preferredLanguage === 'Español' ? 'Pequeñas Empresas' : preferredLanguage === 'Português' ? 'Pequenos Negócios' : 'Small Business';
    else if (id === 'adolescent') addOnName = preferredLanguage === 'Español' ? 'La Experiencia Adolescente' : preferredLanguage === 'Português' ? 'A Experiência Adolescente' : 'Adolescent Experience';
    else if (id === 'golden') addOnName = preferredLanguage === 'Español' ? 'Los Años Dorados' : preferredLanguage === 'Português' ? 'Os Anos Dourados' : 'The Golden Years';
    
    // Display toast message
    const isSelected = !selectedAddOns.includes(id);
    const toastMessages = {
      'English': {
        title: isSelected ? "Add-on Selected" : "Add-on Removed",
        description: isSelected ? `${addOnName} has been added to your subscription.` : `${addOnName} has been removed from your subscription.`
      },
      'Español': {
        title: isSelected ? "Complemento Seleccionado" : "Complemento Eliminado",
        description: isSelected ? `${addOnName} ha sido añadido a tu suscripción.` : `${addOnName} ha sido eliminado de tu suscripción.`
      },
      'Português': {
        title: isSelected ? "Adicional Selecionado" : "Adicional Removido",
        description: isSelected ? `${addOnName} foi adicionado à sua assinatura.` : `${addOnName} foi removido da sua assinatura.`
      }
    };
    
    const message = toastMessages[preferredLanguage as keyof typeof toastMessages] || toastMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
  };

  const handleSubscriptionContinue = (nextScreenSetter: () => void) => {
    if (!selectedPlan) {
      const errorMessages = {
        'English': {
          title: "Please Select a Plan",
          description: "Please select a subscription plan to continue."
        },
        'Español': {
          title: "Por Favor Selecciona un Plan",
          description: "Por favor selecciona un plan de suscripción para continuar."
        },
        'Português': {
          title: "Selecione um Plano",
          description: "Por favor, selecione um plano de assinatura para continuar."
        }
      };
      
      const message = errorMessages[preferredLanguage as keyof typeof errorMessages] || errorMessages['English'];
      
      toast({
        title: message.title,
        description: message.description,
        variant: "destructive"
      });
      return;
    }
    
    const successMessages = {
      'English': {
        title: "Plan Confirmed",
        description: `Your ${selectedPlan} plan is now active. Let's explore add-ons!`
      },
      'Español': {
        title: "Plan Confirmado",
        description: `Tu plan ${selectedPlan} ahora está activo. ¡Exploremos complementos!`
      },
      'Português': {
        title: "Plano Confirmado",
        description: `Seu plano ${selectedPlan} agora está ativo. Vamos explorar adicionais!`
      }
    };
    
    const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
    
    nextScreenSetter();
  };

  const handleAddOnsContinue = (nextScreenSetter: () => void) => {
    const successMessages = {
      'English': {
        title: selectedAddOns.length > 0 ? "Add-ons Selected" : "No Add-ons Selected",
        description: selectedAddOns.length > 0 ? 
          `You've selected ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? 's' : ''}. Let's set up your vision board!` : 
          "No add-ons selected. Let's set up your vision board!"
      },
      'Español': {
        title: selectedAddOns.length > 0 ? "Complementos Seleccionados" : "Sin Complementos Seleccionados",
        description: selectedAddOns.length > 0 ? 
          `Has seleccionado ${selectedAddOns.length} complemento${selectedAddOns.length > 1 ? 's' : ''}. ¡Configuremos tu tablero de visión!` : 
          "No se seleccionaron complementos. ¡Configuremos tu tablero de visión!"
      },
      'Português': {
        title: selectedAddOns.length > 0 ? "Adicionais Selecionados" : "Nenhum Adicional Selecionado",
        description: selectedAddOns.length > 0 ? 
          `Você selecionou ${selectedAddOns.length} adiciona${selectedAddOns.length > 1 ? 'is' : 'l'}. Vamos configurar seu quadro de visão!` : 
          "Nenhum adicional selecionado. Vamos configurar seu quadro de visão!"
      }
    };
    
    const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
    
    nextScreenSetter();
  };

  return {
    selectedPlan,
    selectedAddOns,
    handleSubscriptionSelect,
    toggleAddOn,
    handleSubscriptionContinue,
    handleAddOnsContinue
  };
};

export default useSubscriptionState;
