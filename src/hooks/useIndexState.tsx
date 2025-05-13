import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useIndexState = () => {
  // Initialize screenState as null to force proper initialization
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'subscriptionAddOns' | 'visionBoard' | 'main'>('intro');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const { toast } = useToast();
  
  // Initialize state based on onboarding completion
  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding') === 'true';
    
    console.log("[useIndexState] Initial render, hasCompletedOnboarding:", hasCompletedOnboarding);
    
    if (hasCompletedOnboarding) {
      console.log("[useIndexState] Onboarding already completed, initializing to main dashboard");
      setScreenState('main');
    } else {
      console.log("[useIndexState] No onboarding record, starting from intro screen");
      setScreenState('intro');
      
      // Clear the localStorage items that might conflict
      localStorage.removeItem('prevScreenState');
      
      // Log that we're properly starting the onboarding
      console.log("[useIndexState] Initializing new onboarding flow");
    }
  }, []);
  
  // Get language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      const errorMessages = {
        'English': {
          title: "Registration Error",
          description: "Please fill in all fields to continue."
        },
        'Español': {
          title: "Error de Registro",
          description: "Por favor completa todos los campos para continuar."
        },
        'Português': {
          title: "Erro de Registro",
          description: "Por favor, preencha todos os campos para continuar."
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
        title: "Registration Successful",
        description: "Welcome to Thrive MT! Your journey to better mental health begins now."
      },
      'Español': {
        title: "Registro Exitoso",
        description: "¡Bienvenido a Thrive MT! Tu viaje hacia una mejor salud mental comienza ahora."
      },
      'Português': {
        title: "Registro bem-sucedido",
        description: "Bem-vindo ao Thrive MT! Sua jornada para uma melhor saúde mental começa agora."
      }
    };
    
    const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
    
    setScreenState('subscription');
  };

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

  const toggleQuality = (id: string) => {
    setSelectedQualities(prev => 
      prev.includes(id) 
        ? prev.filter(q => q !== id) 
        : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) 
        ? prev.filter(g => g !== id) 
        : [...prev, id]
    );
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) 
        ? prev.filter(addon => addon !== id) 
        : [...prev, id]
    );

    // Get appropriate add-on name based on language
    let addOnName = '';
    if (id === 'dod') addOnName = preferredLanguage === 'Español' ? 'Departamento de Defensa' : preferredLanguage === 'Português' ? 'Departamento de Defesa' : 'Department of Defense';
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

  const handleSubscriptionContinue = () => {
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
    
    setScreenState('subscriptionAddOns');
  };

  const handleAddOnsContinue = () => {
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
    
    setScreenState('visionBoard');
  };

  const handleVisionBoardContinue = () => {
    if (selectedQualities.length < 2 || selectedGoals.length < 2) {
      const errorMessages = {
        'English': {
          title: "More Selections Needed",
          description: "Please select at least 2 qualities and 2 goals to continue."
        },
        'Español': {
          title: "Se Necesitan Más Selecciones",
          description: "Por favor selecciona al menos 2 cualidades y 2 metas para continuar."
        },
        'Português': {
          title: "Mais Seleções Necessárias",
          description: "Por favor, selecione pelo menos 2 qualidades e 2 objetivos para continuar."
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
        title: "Vision Board Created",
        description: "Your personalized mental wellness journey is ready!"
      },
      'Español': {
        title: "Tablero de Visión Creado",
        description: "¡Tu viaje personalizado de bienestar mental está listo!"
      },
      'Português': {
        title: "Quadro de Visão Criado",
        description: "Sua jornada personalizada de bem-estar mental está pronta!"
      }
    };
    
    const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
    
    setScreenState('main');
  };

  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    console.log("[useIndexState] Selected mood:", mood);
    setSelectedMood(mood);
    setScreenState('moodResponse');
  };

  return {
    screenState,
    setScreenState,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedAddOns,
    selectedQualities,
    selectedGoals,
    isFirstVisit,
    setIsFirstVisit,
    isSpanish,
    isPortuguese,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect,
    toggleQuality,
    toggleGoal,
    toggleAddOn,
    handleSubscriptionContinue,
    handleAddOnsContinue,
    handleVisionBoardContinue,
    handleMoodSelect
  };
};

export default useIndexState;
