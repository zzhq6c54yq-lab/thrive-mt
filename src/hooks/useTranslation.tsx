import { useState, useEffect, createContext, useContext } from 'react';

// Define Translation Context
const TranslationContext = createContext({
  preferredLanguage: 'English',
  setPreferredLanguage: (language: 'English' | 'Español' | 'Português' | 'Filipino') => {},
  isSpanish: false,
  isPortuguese: false,
  isFilipin: false,
  getTranslatedText: (key: string) => '' as string
});

// Define the type for our translations
type TranslationDictionary = {
  [key: string]: {
    English: string;
    Español: string;
    Português: string;
    Filipino: string;
  };
};

// Create the translations dictionary
const translations: TranslationDictionary = {
  // Dashboard and UI translations
  welcomeBack: {
    English: 'Welcome back,',
    Español: 'Bienvenido de nuevo,',
    Português: 'Bem-vindo de volta,',
    Filipino: 'Maligayang pagbabalik,'
  },
  createVisionBoard: {
    English: 'Create Vision Board',
    Español: 'Crear Tablero de Visión',
    Português: 'Criar Quadro de Visão',
    Filipino: 'Lumikha ng Vision Board'
  },
  quickLinks: {
    English: 'Quick Links',
    Español: 'Enlaces Rápidos',
    Português: 'Links Rápidos',
    Filipino: 'Mabilis na Links'
  },
  mentalWellnessTools: {
    English: 'Mental Wellness Tools',
    Español: 'Herramientas de Bienestar Mental',
    Português: 'Ferramentas de Bem-estar Mental',
    Filipino: 'Mga Kagamitan sa Kalusugan ng Isip'
  },
  progressReports: {
    English: 'Progress Reports',
    Español: 'Informes de Progreso',
    Português: 'Relatórios de Progresso',
    Filipino: 'Mga Ulat sa Pag-unlad'
  },
  gamesAndQuizzes: {
    English: 'Games & Quizzes',
    Español: 'Juegos y Cuestionarios',
    Português: 'Jogos e Questionários',
    Filipino: 'Mga Laro at Pagsusulit'
  },
  moodAssessment: {
    English: 'Mood Assessment',
    Español: 'Evaluación de Ánimo',
    Português: 'Avaliação de Humor',
    Filipino: 'Pagtataya ng Mood'
  },
  exploreMental: {
    English: 'Explore Mental Wellness',
    Español: 'Explorar Bienestar Mental',
    Português: 'Explorar Bem-estar Mental',
    Filipino: 'Galugarin ang Kalusugan ng Isip'
  },
  checkProgress: {
    English: 'Check Your Progress',
    Español: 'Revisar Tu Progreso',
    Português: 'Verificar Seu Progresso',
    Filipino: 'Suriin ang Iyong Pag-unlad'
  },
  playGames: {
    English: 'Play Therapeutic Games',
    Español: 'Jugar Juegos Terapéuticos',
    Português: 'Jogar Jogos Terapêuticos',
    Filipino: 'Maglaro ng Therapeutic Games'
  },
  recordMood: {
    English: 'Record Your Mood',
    Español: 'Registrar Tu Estado de Ánimo',
    Português: 'Registrar Seu Humor',
    Filipino: 'Itala ang Iyong Mood'
  },
  specializedPrograms: {
    English: 'Specialized Programs',
    Español: 'Programas Especializados',
    Português: 'Programas Especializados',
    Filipino: 'Mga Espesyal na Programa'
  },
  featuredContent: {
    English: 'Featured Content',
    Español: 'Contenido Destacado',
    Português: 'Conteúdo em Destaque',
    Filipino: 'Tampok na Nilalaman'
  },
  seeAll: {
    English: 'See All',
    Español: 'Ver Todo',
    Português: 'Ver Tudo',
    Filipino: 'Tingnan Lahat'
  },
  recommendedFeatures: {
    English: 'Recommended Features',
    Español: 'Características Recomendadas',
    Português: 'Recursos Recomendados',
    Filipino: 'Mga Rekomendadong Tampok'
  },
  getSupport: {
    English: 'Get Support',
    Español: 'Obtener Apoyo',
    Português: 'Obter Suporte',
    Filipino: 'Kumuha ng Suporta'
  },
  contactUs: {
    English: 'Contact Us',
    Español: 'Contáctanos',
    Português: 'Entre em Contato',
    Filipino: 'Makipag-ugnayan sa Amin'
  },
  learnMore: {
    English: 'Learn More',
    Español: 'Aprender Más',
    Português: 'Saiba Mais',
    Filipino: 'Matuto Nang Higit Pa'
  },
  joinNow: {
    English: 'Join Now',
    Español: 'Únete Ahora',
    Português: 'Junte-se Agora',
    Filipino: 'Sumali Ngayon'
  },
  findHelp: {
    English: 'Find Help',
    Español: 'Encontrar Ayuda',
    Português: 'Encontrar Ajuda',
    Filipino: 'Maghanap ng Tulong'
  },
  recommended: {
    English: 'Recommended',
    Español: 'Recomendado',
    Português: 'Recomendado',
    Filipino: 'Inirerekomenda'
  },
  skipForNow: {
    English: 'Skip for Now',
    Español: 'Omitir por Ahora',
    Português: 'Pular por Enquanto',
    Filipino: 'Laktawan Muna'
  },
  tutorialAccess: {
    English: 'You can access the tutorial later from the help menu.',
    Español: 'Puedes acceder al tutorial más tarde desde el menú de ayuda.',
    Português: 'Você pode acessar o tutorial mais tarde no menu de ajuda.',
    Filipino: 'Maaari mong ma-access ang tutorial sa ibang pagkakataon mula sa menu ng tulong.'
  },
  legacyJournal: {
    English: 'Legacy Journal',
    Español: 'Diario de Legado',
    Português: 'Diário de Legado',
    Filipino: 'Legacy Journal'
  },
  legacyJournalDesc: {
    English: 'Document your life stories and share wisdom with future generations.',
    Español: 'Documenta las historias de tu vida y comparte sabiduría con las futuras generaciones.',
    Português: 'Documente suas histórias de vida e compartilhe sabedoria com as gerações futuras.',
    Filipino: 'Idokumento ang iyong mga kwento ng buhay at ibahagi ang karunungan sa mga susunod na henerasyon.'
  },
  startJournal: {
    English: 'Start Journal',
    Español: 'Comenzar Diario',
    Português: 'Iniciar Diário',
    Filipino: 'Simulan ang Journal'
  },
  needAssistance: {
    English: 'Need Assistance?',
    Español: '¿Necesitas Ayuda?',
    Português: 'Precisa de Ajuda?',
    Filipino: 'Kailangan ng Tulong?'
  },
  resourcesFor: {
    English: 'Resources for seniors and caregivers',
    Español: 'Recursos para personas mayores y cuidadores',
    Português: 'Recursos para idosos e cuidadores',
    Filipino: 'Mga mapagkukunan para sa mga nakatatanda at tagapag-alaga'
  },
  emergencyResources: {
    English: 'Emergency Resources',
    Español: 'Recursos de Emergencia',
    Português: 'Recursos de Emergência',
    Filipino: 'Mga Mapagkukunan sa Emergency'
  },
  technicalSupport: {
    English: 'Technical Support',
    Español: 'Soporte Técnico',
    Português: 'Suporte Técnico',
    Filipino: 'Teknikal na Suporta'
  },
  getHelp: {
    English: 'Get Help',
    Español: 'Obtener Ayuda',
    Português: 'Obter Ajuda',
    Filipino: 'Kumuha ng Tulong'
  },
  henryTitle: {
    English: "I'm Henry, Your Digital Mental Health Assistant",
    Español: "Soy Henry, Tu Asistente Digital de Salud Mental",
    Português: "Eu sou Henry, Seu Assistente Digital de Saúde Mental",
    Filipino: "Ako si Henry, Ang Iyong Digital Mental Health Assistant"
  },
  henryIntro: {
    English: "Hello! I'm here to assist you with your mental wellness journey. I can answer questions, suggest resources, and help you navigate the platform.",
    Español: "¡Hola! Estoy aquí para ayudarte en tu viaje de bienestar mental. Puedo responder preguntas, sugerir recursos y ayudarte a navegar por la plataforma.",
    Português: "Olá! Estou aqui para ajudar na sua jornada de bem-estar mental. Posso responder perguntas, sugerir recursos e ajudar você a navegar pela plataforma.",
    Filipino: "Hello! Narito ako upang tulungan ka sa iyong paglalakbay sa kalusugan ng isip. Maaari akong sumagot ng mga tanong, magmungkahi ng mga mapagkukunan, at tulungan kang mag-navigate sa platform."
  },
  henriContinue: {
    English: "Continue",
    Español: "Continuar",
    Português: "Continuar",
    Filipino: "Magpatuloy"
  },
  
  // Help Dialog translations
  helpTitle: {
    English: "How Can We Help?",
    Español: "¿Cómo Podemos Ayudar?",
    Português: "Como Podemos Ajudar?",
    Filipino: "Paano Kami Makakatulong?"
  },
  supportOptions: {
    English: "Support Options",
    Español: "Opciones de Apoyo",
    Português: "Opções de Suporte",
    Filipino: "Mga Pagpipilian sa Suporta"
  },
  navigation: {
    English: "Navigation",
    Español: "Navegación",
    Português: "Navegação",
    Filipino: "Navigation"
  },
  resources: {
    English: "Resources",
    Español: "Recursos",
    Português: "Recursos",
    Filipino: "Mga Mapagkukunan"
  },
  callCrisisLine: {
    English: "Call Crisis Line",
    Español: "Llamar a Línea de Crisis",
    Português: "Ligar para Linha de Crise",
    Filipino: "Tumawag sa Crisis Line"
  },
  textSupport: {
    English: "Text Support",
    Español: "Apoyo por Mensaje de Texto",
    Português: "Suporte por Mensagem",
    Filipino: "Suporta sa Text"
  },
  findTherapist: {
    English: "Find a Therapist",
    Español: "Encontrar un Terapeuta",
    Português: "Encontrar um Terapeuta",
    Filipino: "Maghanap ng Therapist"
  },
  startTutorial: {
    English: "Start Tutorial",
    Español: "Iniciar Tutorial",
    Português: "Iniciar Tutorial",
    Filipino: "Simulan ang Tutorial"
  },
  returnHome: {
    English: "Return Home",
    Español: "Volver al Inicio",
    Português: "Voltar à Página Inicial",
    Filipino: "Bumalik sa Home"
  },
  contactThrive: {
    English: "Contact Thrive",
    Español: "Contactar a Thrive",
    Português: "Contatar Thrive",
    Filipino: "Makipag-ugnayan sa Thrive"
  },
  emergencyHelpSubtitle: {
    English: "If you're experiencing a crisis:",
    Español: "Si estás experimentando una crisis:",
    Português: "Se você estiver em crise:",
    Filipino: "Kung nakakaranas ka ng krisis:"
  },
  crisisDetails: {
    English: "Available 24/7 for mental health emergencies",
    Español: "Disponible 24/7 para emergencias de salud mental",
    Português: "Disponível 24/7 para emergências de saúde mental",
    Filipino: "Available 24/7 para sa mga emergency sa kalusugan ng isip"
  },
  textDetails: {
    English: "Text with a trained counselor",
    Español: "Mensajes de texto con un consejero capacitado",
    Português: "Mensagens com um conselheiro treinado",
    Filipino: "Makipag-text sa isang sinanay na tagapayo"
  },
  therapistDetails: {
    English: "Search for licensed professionals in your area",
    Español: "Busca profesionales licenciados en tu área",
    Português: "Procure profissionais licenciados na sua área",
    Filipino: "Maghanap ng mga lisensyadong propesyonal sa iyong lugar"
  },
  tutorialDetails: {
    English: "Learn how to use Thrive MT",
    Español: "Aprende a usar Thrive MT",
    Português: "Aprenda a usar o Thrive MT",
    Filipino: "Alamin kung paano gamitin ang Thrive MT"
  },
  homeDetails: {
    English: "Go back to the main dashboard",
    Español: "Volver al panel principal",
    Português: "Voltar ao painel principal",
    Filipino: "Bumalik sa pangunahing dashboard"
  },
  contactDetails: {
    English: "Questions, feedback, or technical support",
    Español: "Preguntas, comentarios o soporte técnico",
    Português: "Perguntas, feedback ou suporte técnico",
    Filipino: "Mga tanong, feedback, o teknikal na suporta"
  },
  mentalHealthVideos: {
    English: "Mental Health Videos",
    Español: "Videos de Salud Mental",
    Português: "Vídeos de Saúde Mental",
    Filipino: "Mga Video sa Kalusugan ng Isip"
  },
  stressManagementGuides: {
    English: "Stress Management Guides",
    Español: "Guías de Manejo del Estrés",
    Português: "Guias de Controle de Estresse",
    Filipino: "Mga Gabay sa Pamamahala ng Stress"
  },
  meditationAudios: {
    English: "Meditation Audios",
    Español: "Audios de Meditación",
    Português: "Áudios de Meditação",
    Filipino: "Mga Audio sa Meditasyon"
  },

  // Specialized Program translations
  dodTitle: {
    English: "Department of Defense",
    Español: "Departamento de Defensa",
    Português: "Departamento de Defesa",
    Filipino: "Departamento ng Tanggulan"
  },
  dodDesc: {
    English: "Resources and support for military personnel and veterans",
    Español: "Recursos y apoyo para personal militar y veteranos",
    Português: "Recursos e apoio para militares e veteranos",
    Filipino: "Mga mapagkukunan at suporta para sa mga tauhan ng militar at mga beterano"
  },
  collegeTitle: {
    English: "The College Experience",
    Español: "La Experiencia Universitaria",
    Português: "A Experiência Universitária",
    Filipino: "Ang Karanasan sa Kolehiyo"
  },
  collegeDesc: {
    English: "Mental health support for students navigating campus life",
    Español: "Apoyo de salud mental para estudiantes en la vida universitaria",
    Português: "Suporte de saúde mental para estudantes na vida universitária",
    Filipino: "Suporta sa kalusugan ng isip para sa mga mag-aaral na nagna-navigate sa buhay sa campus"
  },
  businessTitle: {
    English: "Small Business",
    Español: "Pequeñas Empresas",
    Português: "Pequenos Negócios",
    Filipino: "Maliit na Negosyo"
  },
  businessDesc: {
    English: "Mental health resources for entrepreneurs and small business owners",
    Español: "Recursos de salud mental para emprendedores y dueños de pequeñas empresas",
    Português: "Recursos de saúde mental para empreendedores e proprietários de pequenas empresas",
    Filipino: "Mga mapagkukunan sa kalusugan ng isip para sa mga negosyante at may-ari ng maliliit na negosyo"
  },
  adolescentTitle: {
    English: "Adolescent Experience",
    Español: "La Experiencia Adolescente",
    Português: "A Experiência Adolescente",
    Filipino: "Karanasan sa Pagdadalaga/Pagbibinata"
  },
  adolescentDesc: {
    English: "Age-appropriate mental health support for children and teens",
    Español: "Apoyo de salud mental adaptado para niños y adolescentes de diferentes edades",
    Português: "Suporte de saúde mental apropriado para crianças e adolescentes",
    Filipino: "Suporta sa kalusugan ng isip na naaangkop sa edad para sa mga bata at tinedyer"
  },
  goldenTitle: {
    English: "The Golden Years",
    Español: "Los Años Dorados",
    Português: "Os Anos Dourados",
    Filipino: "Ang Ginintuang Panahon"
  },
  goldenDesc: {
    English: "Mental wellness resources for seniors and elderly adults",
    Español: "Recursos de bienestar mental para adultos mayores y personas de la tercera edad",
    Português: "Recursos de bem-estar mental para idosos",
    Filipino: "Mga mapagkukunan ng kalusugan ng isip para sa mga senior citizen at matatandang adulto"
  },
    
  // Add-ons page translations
  addOnsTitle: {
    English: "Choose Your Add-ons",
    Español: "Elige Tus Complementos",
    Português: "Escolha Seus Adicionais",
    Filipino: "Piliin ang Iyong mga Add-on"
  },
  addOnsSubtitle: {
    English: "Enhance your subscription with specialized programs",
    Español: "Mejora tu suscripción con programas especializados",
    Português: "Melhore sua assinatura com programas especializados",
    Filipino: "Pagandahin ang iyong subscription sa mga dalubhasang programa"
  },
  planSelected: {
    English: "Plan selected",
    Español: "Plan seleccionado",
    Português: "Plano selecionado",
    Filipino: "Napiling plano"
  },
  selected: {
    English: "Selected",
    Español: "Seleccionado",
    Português: "Selecionado",
    Filipino: "Napili"
  },
  select: {
    English: "Select",
    Español: "Seleccionar",
    Português: "Selecionar",
    Filipino: "Piliin"
  },
  selectedAddOns: {
    English: "Selected Add-ons",
    Español: "Complementos Seleccionados",
    Português: "Adicionais Selecionados",
    Filipino: "Mga Napiling Add-on"
  },
  previous: {
    English: "Previous",
    Español: "Anterior",
    Português: "Anterior",
    Filipino: "Nakaraan"
  },
  continue: {
    English: "Continue",
    Español: "Continuar",
    Português: "Continuar",
    Filipino: "Magpatuloy"
  },
  monthly: {
    English: "Monthly",
    Español: "Mensual",
    Português: "Mensal",
    Filipino: "Buwanan"
  },
  yearly: {
    English: "Yearly",
    Español: "Anual",
    Português: "Anual",
    Filipino: "Taunan"
  },
  save20: {
    English: "Save 20%!",
    Español: "¡Ahorra 20%!",
    Português: "Economize 20%!",
    Filipino: "Makatipid ng 20%!"
  },
  deepenJourney: {
    English: "Deepen your mental health journey",
    Español: "Profundiza en tu viaje de salud mental",
    Português: "Aprofunde sua jornada de saúde mental",
    Filipino: "Palalimin ang iyong paglalakbay sa kalusugan ng isip"
  },
  byAddingProgram: {
    English: "By adding one of our specialized programs",
    Español: "Agregando uno de nuestros programas especializados",
    Português: "Adicionando um de nossos programas especializados",
    Filipino: "Sa pamamagitan ng pagdaragdag ng isa sa aming mga dalubhasang programa"
  },
  goldSavings: {
    English: "Gold subscribers save $1/month on each add-on",
    Español: "Los suscriptores de Gold ahorran $1/mes en cada complemento",
    Português: "Assinantes Gold economizam $1/mês em cada adicional",
    Filipino: "Ang mga subscriber ng Gold ay makakatipid ng $1/buwan sa bawat add-on"
  },
  platinumSavings: {
    English: "Platinum subscribers save $2/month on each add-on",
    Español: "Los suscriptores de Platinum ahorran $2/mes en cada complemento",
    Português: "Assinantes Platinum economizam $2/mês em cada adicional",
    Filipino: "Ang mga subscriber ng Platinum ay makakatipid ng $2/buwan sa bawat add-on"
  },
  basicPrice: {
    English: "Standard pricing for Basic subscribers",
    Español: "Precio estándar para suscriptores Basic",
    Português: "Preço padrão para assinantes Basic",
    Filipino: "Karaniwang pagpepresyo para sa mga subscriber ng Basic"
  },
  monthlyTotal: {
    English: "Monthly Total:",
    Español: "Total Mensual:",
    Português: "Total Mensal:",
    Filipino: "Buwanang Kabuuan:"
  },
  yearlyTotal: {
    English: "Yearly Total:",
    Español: "Total Anual:",
    Português: "Total Anual:",
    Filipino: "Taunang Kabuuan:"
  },
  tutorialButtonHelp: {
    English: "You can access this tutorial at any time by clicking on the Thrive MT button in the top right corner.",
    Español: "Puedes acceder a este tutorial en cualquier momento haciendo clic en el botón Thrive MT en la esquina superior derecha.",
    Português: "Você pode acessar este tutorial a qualquer momento clicando no botão Thrive MT no canto superior direito.",
    Filipino: "Maaari mong ma-access ang tutorial na ito anumang oras sa pamamagitan ng pag-click sa pindutan ng Thrive MT sa kanang tuktok na sulok."
  },
  choosePlan: {
    English: "Choose Your Plan",
    Español: "Elige Tu Plan",
    Português: "Escolha Seu Plano",
    Filipino: "Piliin ang Iyong Plano"
  },
  off: {
    English: "off",
    Español: "de descuento",
    Português: "de desconto",
    Filipino: "na diskwento"
  },
  barterSystem: {
    English: "Barter System",
    Español: "Sistema de Trueque",
    Português: "Sistema de Troca",
    Filipino: "Sistema ng Barter"
  },
  upgradePlan: {
    English: "Upgrade Plan",
    Español: "Plan de Actualización",
    Português: "Plano de Upgrade",
    Filipino: "Plano ng Pag-upgrade"
  },
  creditSystem: {
    English: "Credit System",
    Español: "Sistema de Crédito",
    Português: "Sistema de Crédito",
    Filipino: "Sistema ng Kredito"
  }
};

// Create the TranslationProvider component
export const TranslationProvider = ({ children }: { children: React.ReactNode }) => {
  const storedLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const [preferredLanguage, setPreferredLanguageState] = useState<'English' | 'Español' | 'Português' | 'Filipino'>(
    storedLanguage as 'English' | 'Español' | 'Português' | 'Filipino'
  );

  useEffect(() => {
    if (!localStorage.getItem('preferredLanguage')) {
      const browserLanguage = navigator.language.toLowerCase();
      if (browserLanguage.startsWith('es')) {
        setPreferredLanguageState('Español');
      } else if (browserLanguage.startsWith('pt')) {
        setPreferredLanguageState('Português');
      } else if (browserLanguage.startsWith('fil') || browserLanguage.startsWith('tl')) {
        setPreferredLanguageState('Filipino');
      } else {
        setPreferredLanguageState('English');
      }
    }
  }, []);

  const setPreferredLanguage = (language: 'English' | 'Español' | 'Português' | 'Filipino') => {
    localStorage.setItem('preferredLanguage', language);
    setPreferredLanguageState(language);
    const event = new CustomEvent('languageChange', { detail: language });
    window.dispatchEvent(event);
  };

  const getTranslatedText = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][preferredLanguage] || translations[key]['English'];
  };

  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';
  const isFilipin = preferredLanguage === 'Filipino';

  return (
    <TranslationContext.Provider value={{
      preferredLanguage,
      setPreferredLanguage,
      isSpanish,
      isPortuguese,
      isFilipin,
      getTranslatedText
    }}>
      {children}
    </TranslationContext.Provider>
  );
};

const useTranslation = () => useContext(TranslationContext);

export default useTranslation;
