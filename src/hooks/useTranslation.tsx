
import { useState, useEffect, createContext, useContext } from 'react';

// Define Translation Context
const TranslationContext = createContext({
  preferredLanguage: 'English',
  setPreferredLanguage: (language: 'English' | 'Español' | 'Português') => {},
  isSpanish: false,
  isPortuguese: false,
  getTranslatedText: (key: string) => '' as string // Fixed the return type here
});

// Define the type for our translations
type TranslationDictionary = {
  [key: string]: {
    English: string;
    Español: string;
    Português: string;
  };
};

// Create the translations dictionary
const translations: TranslationDictionary = {
  // Dashboard and UI translations
  welcomeBack: {
    English: 'Welcome back,',
    Español: 'Bienvenido de nuevo,',
    Português: 'Bem-vindo de volta,'
  },
  createVisionBoard: {
    English: 'Create Vision Board',
    Español: 'Crear Tablero de Visión',
    Português: 'Criar Quadro de Visão'
  },
  quickLinks: {
    English: 'Quick Links',
    Español: 'Enlaces Rápidos',
    Português: 'Links Rápidos'
  },
  mentalWellnessTools: {
    English: 'Mental Wellness Tools',
    Español: 'Herramientas de Bienestar Mental',
    Português: 'Ferramentas de Bem-estar Mental'
  },
  progressReports: {
    English: 'Progress Reports',
    Español: 'Informes de Progreso',
    Português: 'Relatórios de Progresso'
  },
  gamesAndQuizzes: {
    English: 'Games & Quizzes',
    Español: 'Juegos y Cuestionarios',
    Português: 'Jogos e Questionários'
  },
  moodAssessment: {
    English: 'Mood Assessment',
    Español: 'Evaluación de Ánimo',
    Português: 'Avaliação de Humor'
  },
  exploreMental: {
    English: 'Explore Mental Wellness',
    Español: 'Explorar Bienestar Mental',
    Português: 'Explorar Bem-estar Mental'
  },
  checkProgress: {
    English: 'Check Your Progress',
    Español: 'Revisar Tu Progreso',
    Português: 'Verificar Seu Progresso'
  },
  playGames: {
    English: 'Play Therapeutic Games',
    Español: 'Jugar Juegos Terapéuticos',
    Português: 'Jogar Jogos Terapêuticos'
  },
  recordMood: {
    English: 'Record Your Mood',
    Español: 'Registrar Tu Estado de Ánimo',
    Português: 'Registrar Seu Humor'
  },
  specializedPrograms: {
    English: 'Specialized Programs',
    Español: 'Programas Especializados',
    Português: 'Programas Especializados'
  },
  featuredContent: {
    English: 'Featured Content',
    Español: 'Contenido Destacado',
    Português: 'Conteúdo em Destaque'
  },
  seeAll: {
    English: 'See All',
    Español: 'Ver Todo',
    Português: 'Ver Tudo'
  },
  recommendedFeatures: {
    English: 'Recommended Features',
    Español: 'Características Recomendadas',
    Português: 'Recursos Recomendados'
  },
  getSupport: {
    English: 'Get Support',
    Español: 'Obtener Apoyo',
    Português: 'Obter Suporte'
  },
  contactUs: {
    English: 'Contact Us',
    Español: 'Contáctanos',
    Português: 'Entre em Contato'
  },
  learnMore: {
    English: 'Learn More',
    Español: 'Aprender Más',
    Português: 'Saiba Mais'
  },
  joinNow: {
    English: 'Join Now',
    Español: 'Únete Ahora',
    Português: 'Junte-se Agora'
  },
  findHelp: {
    English: 'Find Help',
    Español: 'Encontrar Ayuda',
    Português: 'Encontrar Ajuda'
  },
  recommended: {
    English: 'Recommended',
    Español: 'Recomendado',
    Português: 'Recomendado'
  },
  skipForNow: {
    English: 'Skip for Now',
    Español: 'Omitir por Ahora',
    Português: 'Pular por Enquanto'
  },
  tutorialAccess: {
    English: 'You can access the tutorial later from the help menu.',
    Español: 'Puedes acceder al tutorial más tarde desde el menú de ayuda.',
    Português: 'Você pode acessar o tutorial mais tarde no menu de ajuda.'
  },
  legacyJournal: {
    English: 'Legacy Journal',
    Español: 'Diario de Legado',
    Português: 'Diário de Legado'
  },
  legacyJournalDesc: {
    English: 'Document your life stories and share wisdom with future generations.',
    Español: 'Documenta las historias de tu vida y comparte sabiduría con las futuras generaciones.',
    Português: 'Documente suas histórias de vida e compartilhe sabedoria com as gerações futuras.'
  },
  startJournal: {
    English: 'Start Journal',
    Español: 'Comenzar Diario',
    Português: 'Iniciar Diário'
  },
  needAssistance: {
    English: 'Need Assistance?',
    Español: '¿Necesitas Ayuda?',
    Português: 'Precisa de Ajuda?'
  },
  resourcesFor: {
    English: 'Resources for seniors and caregivers',
    Español: 'Recursos para personas mayores y cuidadores',
    Português: 'Recursos para idosos e cuidadores'
  },
  emergencyResources: {
    English: 'Emergency Resources',
    Español: 'Recursos de Emergencia',
    Português: 'Recursos de Emergência'
  },
  technicalSupport: {
    English: 'Technical Support',
    Español: 'Soporte Técnico',
    Português: 'Suporte Técnico'
  },
  getHelp: {
    English: 'Get Help',
    Español: 'Obtener Ayuda',
    Português: 'Obter Ajuda'
  },
  henryTitle: {
    English: "I'm Henry, Your Digital Mental Health Assistant",
    Español: "Soy Henry, Tu Asistente Digital de Salud Mental",
    Português: "Eu sou Henry, Seu Assistente Digital de Saúde Mental"
  },
  henryIntro: {
    English: "Hello! I'm here to assist you with your mental wellness journey. I can answer questions, suggest resources, and help you navigate the platform.",
    Español: "¡Hola! Estoy aquí para ayudarte en tu viaje de bienestar mental. Puedo responder preguntas, sugerir recursos y ayudarte a navegar por la plataforma.",
    Português: "Olá! Estou aqui para ajudar na sua jornada de bem-estar mental. Posso responder perguntas, sugerir recursos e ajudar você a navegar pela plataforma."
  },
  henriContinue: {
    English: "Continue",
    Español: "Continuar",
    Português: "Continuar"
  },
  
  // Help Dialog translations
  helpTitle: {
    English: "How Can We Help?",
    Español: "¿Cómo Podemos Ayudar?",
    Português: "Como Podemos Ajudar?"
  },
  supportOptions: {
    English: "Support Options",
    Español: "Opciones de Apoyo",
    Português: "Opções de Suporte"
  },
  navigation: {
    English: "Navigation",
    Español: "Navegación",
    Português: "Navegação"
  },
  resources: {
    English: "Resources",
    Español: "Recursos",
    Português: "Recursos"
  },
  callCrisisLine: {
    English: "Call Crisis Line",
    Español: "Llamar a Línea de Crisis",
    Português: "Ligar para Linha de Crise"
  },
  textSupport: {
    English: "Text Support",
    Español: "Apoyo por Mensaje de Texto",
    Português: "Suporte por Mensagem"
  },
  findTherapist: {
    English: "Find a Therapist",
    Español: "Encontrar un Terapeuta",
    Português: "Encontrar um Terapeuta"
  },
  startTutorial: {
    English: "Start Tutorial",
    Español: "Iniciar Tutorial",
    Português: "Iniciar Tutorial"
  },
  returnHome: {
    English: "Return Home",
    Español: "Volver al Inicio",
    Português: "Voltar à Página Inicial"
  },
  contactThrive: {
    English: "Contact Thrive",
    Español: "Contactar a Thrive",
    Português: "Contatar Thrive"
  },
  emergencyHelpSubtitle: {
    English: "If you're experiencing a crisis:",
    Español: "Si estás experimentando una crisis:",
    Português: "Se você estiver em crise:"
  },
  crisisDetails: {
    English: "Available 24/7 for mental health emergencies",
    Español: "Disponible 24/7 para emergencias de salud mental",
    Português: "Disponível 24/7 para emergências de saúde mental"
  },
  textDetails: {
    English: "Text with a trained counselor",
    Español: "Mensajes de texto con un consejero capacitado",
    Português: "Mensagens com um conselheiro treinado"
  },
  therapistDetails: {
    English: "Search for licensed professionals in your area",
    Español: "Busca profesionales licenciados en tu área",
    Português: "Procure profissionais licenciados na sua área"
  },
  tutorialDetails: {
    English: "Learn how to use Thrive MT",
    Español: "Aprende a usar Thrive MT",
    Português: "Aprenda a usar o Thrive MT"
  },
  homeDetails: {
    English: "Go back to the main dashboard",
    Español: "Volver al panel principal",
    Português: "Voltar ao painel principal"
  },
  contactDetails: {
    English: "Questions, feedback, or technical support",
    Español: "Preguntas, comentarios o soporte técnico",
    Português: "Perguntas, feedback ou suporte técnico"
  },
  mentalHealthVideos: {
    English: "Mental Health Videos",
    Español: "Videos de Salud Mental",
    Português: "Vídeos de Saúde Mental"
  },
  stressManagementGuides: {
    English: "Stress Management Guides",
    Español: "Guías de Manejo del Estrés",
    Português: "Guias de Controle de Estresse"
  },
  meditationAudios: {
    English: "Meditation Audios",
    Español: "Audios de Meditación",
    Português: "Áudios de Meditação"
  },

  // Specialized Program translations
  dodTitle: {
    English: "Department of Defense",
    Español: "Departamento de Defensa",
    Português: "Departamento de Defesa"
  },
  dodDesc: {
    English: "Resources and support for military personnel and veterans",
    Español: "Recursos y apoyo para personal militar y veteranos",
    Português: "Recursos e apoio para militares e veteranos"
  },
  collegeTitle: {
    English: "The College Experience",
    Español: "La Experiencia Universitaria",
    Português: "A Experiência Universitária"
  },
  collegeDesc: {
    English: "Mental health support for students navigating campus life",
    Español: "Apoyo de salud mental para estudiantes en la vida universitaria",
    Português: "Suporte de saúde mental para estudantes na vida universitária"
  },
  businessTitle: {
    English: "Small Business",
    Español: "Pequeñas Empresas",
    Português: "Pequenos Negócios"
  },
  businessDesc: {
    English: "Mental health resources for entrepreneurs and small business owners",
    Español: "Recursos de salud mental para emprendedores y dueños de pequeñas empresas",
    Português: "Recursos de saúde mental para empreendedores e proprietários de pequenas empresas"
  },
  adolescentTitle: {
    English: "Adolescent Experience",
    Español: "La Experiencia Adolescente",
    Português: "A Experiência Adolescente"
  },
  adolescentDesc: {
    English: "Age-appropriate mental health support for children and teens",
    Español: "Apoyo de salud mental adaptado para niños y adolescentes de diferentes edades",
    Português: "Suporte de saúde mental apropriado para crianças e adolescentes"
  },
  goldenTitle: {
    English: "The Golden Years",
    Español: "Los Años Dorados",
    Português: "Os Anos Dourados"
  },
  goldenDesc: {
    English: "Mental wellness resources for seniors and elderly adults",
    Español: "Recursos de bienestar mental para adultos mayores y personas de la tercera edad",
    Português: "Recursos de bem-estar mental para idosos"
  },
  
  // Add-ons page translations
  addOnsTitle: {
    English: "Choose Your Add-ons",
    Español: "Elige Tus Complementos",
    Português: "Escolha Seus Adicionais"
  },
  addOnsSubtitle: {
    English: "Enhance your subscription with specialized programs",
    Español: "Mejora tu suscripción con programas especializados",
    Português: "Melhore sua assinatura com programas especializados"
  },
  planSelected: {
    English: "Plan selected",
    Español: "Plan seleccionado",
    Português: "Plano selecionado"
  },
  selected: {
    English: "Selected",
    Español: "Seleccionado",
    Português: "Selecionado"
  },
  select: {
    English: "Select",
    Español: "Seleccionar",
    Português: "Selecionar"
  },
  selectedAddOns: {
    English: "Selected Add-ons",
    Español: "Complementos Seleccionados",
    Português: "Adicionais Selecionados"
  },
  previous: {
    English: "Previous",
    Español: "Anterior",
    Português: "Anterior"
  },
  continue: {
    English: "Continue",
    Español: "Continuar",
    Português: "Continuar"
  },
  monthly: {
    English: "Monthly",
    Español: "Mensual",
    Português: "Mensal"
  },
  yearly: {
    English: "Yearly",
    Español: "Anual",
    Português: "Anual"
  },
  save20: {
    English: "Save 20%!",
    Español: "¡Ahorra 20%!",
    Português: "Economize 20%!"
  },
  deepenJourney: {
    English: "Deepen your mental health journey",
    Español: "Profundiza en tu viaje de salud mental",
    Português: "Aprofunde sua jornada de saúde mental"
  },
  byAddingProgram: {
    English: "By adding one of our specialized programs",
    Español: "Agregando uno de nuestros programas especializados",
    Português: "Adicionando um de nossos programas especializados"
  },
  goldSavings: {
    English: "Gold subscribers save $1/month on each add-on",
    Español: "Los suscriptores de Gold ahorran $1/mes en cada complemento",
    Português: "Assinantes Gold economizam $1/mês em cada adicional"
  },
  platinumSavings: {
    English: "Platinum subscribers save $2/month on each add-on",
    Español: "Los suscriptores de Platinum ahorran $2/mes en cada complemento",
    Português: "Assinantes Platinum economizam $2/mês em cada adicional"
  },
  basicPrice: {
    English: "Standard pricing for Basic subscribers",
    Español: "Precio estándar para suscriptores Basic",
    Português: "Preço padrão para assinantes Basic"
  },
  monthlyTotal: {
    English: "Monthly Total:",
    Español: "Total Mensual:",
    Português: "Total Mensal:"
  },
  yearlyTotal: {
    English: "Yearly Total:",
    Español: "Total Anual:",
    Português: "Total Anual:"
  },
  tutorialButtonHelp: {
    English: "You can access this tutorial at any time by clicking on the Thrive MT button in the top right corner.",
    Español: "Puedes acceder a este tutorial en cualquier momento haciendo clic en el botón Thrive MT en la esquina superior derecha.",
    Português: "Você pode acessar este tutorial a qualquer momento clicando no botão Thrive MT no canto superior direito."
  }
};

// Create the TranslationProvider component
export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  // Get preferred language from localStorage or default to English
  const storedLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const [preferredLanguage, setPreferredLanguageState] = useState<'English' | 'Español' | 'Português'>(
    storedLanguage as 'English' | 'Español' | 'Português'
  );

  // Detect language from browser settings
  useEffect(() => {
    if (!localStorage.getItem('preferredLanguage')) {
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('es')) {
        setPreferredLanguageState('Español');
      } else if (browserLanguage.startsWith('pt')) {
        setPreferredLanguageState('Português');
      } else {
        setPreferredLanguageState('English');
      }
    }
  }, []);

  // Function to update preferred language
  const setPreferredLanguage = (language: 'English' | 'Español' | 'Português') => {
    localStorage.setItem('preferredLanguage', language);
    setPreferredLanguageState(language);
    
    // Dispatch a custom event to notify other components of language change
    const event = new CustomEvent('languageChange', { detail: language });
    window.dispatchEvent(event);
  };

  // Function to get translated text based on key
  const getTranslatedText = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][preferredLanguage] || translations[key]['English'];
  };

  // Convenience flags for language checks
  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';

  // Provide the translation context
  return (
    <TranslationContext.Provider value={{
      preferredLanguage,
      setPreferredLanguage,
      isSpanish,
      isPortuguese,
      getTranslatedText
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use the translation context
const useTranslation = () => useContext(TranslationContext);

export default useTranslation;

