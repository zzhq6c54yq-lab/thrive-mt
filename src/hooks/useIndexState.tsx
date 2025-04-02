
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useIndexState = () => {
  const [screenState, setScreenState] = useState<'intro' | 'mood' | 'moodResponse' | 'register' | 'subscription' | 'visionBoard' | 'main'>('intro');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed' | null>(null);
  const [selectedQualities, setSelectedQualities] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const { toast } = useToast();
  
  // Get language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      toast({
        title: isSpanish ? "Error de Registro" : "Registration Error",
        description: isSpanish ? "Por favor completa todos los campos para continuar." : "Please fill in all fields to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isSpanish ? "Registro Exitoso" : "Registration Successful",
      description: isSpanish ? "¡Bienvenido a Thrive MT! Tu viaje hacia una mejor salud mental comienza ahora." : "Welcome to Thrive MT! Your journey to better mental health begins now.",
    });
    
    setScreenState('subscription');
  };

  const handleSubscriptionSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    toast({
      title: isSpanish ? `Plan ${planTitle} Seleccionado` : `${planTitle} Plan Selected`,
      description: isSpanish ? `Has seleccionado el plan de suscripción ${planTitle}.` : `You have selected the ${planTitle} subscription plan.`,
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

  const handleSubscriptionContinue = () => {
    if (!selectedPlan) {
      toast({
        title: isSpanish ? "Por Favor Selecciona un Plan" : "Please Select a Plan",
        description: isSpanish ? "Por favor selecciona un plan de suscripción para continuar." : "Please select a subscription plan to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isSpanish ? "Plan Confirmado" : "Plan Confirmed",
      description: isSpanish ? `Tu plan ${selectedPlan} ahora está activo. ¡Disfruta tus beneficios!` : `Your ${selectedPlan} plan is now active. Enjoy your benefits!`,
    });
    
    setScreenState('visionBoard');
  };

  const handleVisionBoardContinue = () => {
    if (selectedQualities.length < 2 || selectedGoals.length < 2) {
      toast({
        title: isSpanish ? "Se Necesitan Más Selecciones" : "More Selections Needed",
        description: isSpanish ? "Por favor selecciona al menos 2 cualidades y 2 metas para continuar." : "Please select at least 2 qualities and 2 goals to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: isSpanish ? "Tablero de Visión Creado" : "Vision Board Created",
      description: isSpanish ? "¡Tu viaje personalizado de bienestar mental está listo!" : "Your personalized mental wellness journey is ready!",
    });
    
    setScreenState('main');
  };

  const handleMoodSelect = (mood: 'happy' | 'ok' | 'neutral' | 'down' | 'sad' | 'overwhelmed') => {
    setSelectedMood(mood);
    setScreenState('moodResponse');
  };

  return {
    screenState,
    setScreenState,
    selectedMood,
    userInfo,
    selectedPlan,
    selectedQualities,
    selectedGoals,
    isFirstVisit,
    setIsFirstVisit,
    isSpanish,
    handleUserInfoChange,
    handleRegister,
    handleSubscriptionSelect,
    toggleQuality,
    toggleGoal,
    handleSubscriptionContinue,
    handleVisionBoardContinue,
    handleMoodSelect
  };
};

export default useIndexState;
