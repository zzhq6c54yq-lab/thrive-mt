// Main translations system for the entire application
const translations: Record<string, Record<string, string>> = {
  // Common UI elements
  'back': {
    'English': 'Back',
    'Español': 'Atrás',
    'Português': 'Voltar',
    'Русский': 'Назад',
    'Deutsch': 'Zurück',
    'हिन्दी': 'वापस',
    'Français': 'Retour',
    'Filipino': 'Bumalik',
    '中文': '返回',
    'العربية': 'رجوع'
  },
  'continue': {
    'English': 'Continue',
    'Español': 'Continuar',
    'Português': 'Continuar',
    'Русский': 'Продолжить',
    'Deutsch': 'Fortfahren',
    'हिन्दी': 'जारी रखें',
    'Français': 'Continuer',
    'Filipino': 'Magpatuloy',
    '中文': '继续',
    'العربية': 'استمر'
  },
  'comingSoon': {
    'English': 'Coming soon! This feature is under development.',
    'Español': '¡Próximamente! Esta función está en desarrollo.',
    'Português': 'Em breve! Este recurso está em desenvolvimento.',
    'Русский': 'Скоро! Эта функция находится в разработке.',
    'Deutsch': 'Kommt bald! Diese Funktion wird entwickelt.',
    'हिन्दी': 'जल्द आ रहा है! यह सुविधा विकास के अधीन है।',
    'Français': 'Bientôt disponible ! Cette fonctionnalité est en cours de développement.',
    'Filipino': 'Malapit na! Ang feature na ito ay nasa development pa.',
    '中文': '即将推出！此功能正在开发中。',
    'العربية': 'قريبًا! هذه الميزة قيد التطوير.'
  },
  'loading': {
    'English': 'Loading...',
    'Español': 'Cargando...',
    'Português': 'Carregando...',
    'Русский': 'Загрузка...',
    'Deutsch': 'Wird geladen...',
    'हिन्दी': 'लोड हो रहा है...',
    'Français': 'Chargement...',
    'Filipino': 'Naglo-load...',
    '中文': '加载中...',
    'العربية': 'جار التحميل...'
  },
  
  // IntroScreen
  'appTagline': {
    'English': 'because life should be more than just surviving',
    'Español': 'porque la vida debe ser más que solo sobrevivir',
    'Português': 'porque a vida deve ser mais do que apenas sobreviver',
    'Русский': 'потому что жизнь должна быть больше, чем просто выживание',
    'Deutsch': 'weil das Leben mehr sein sollte als nur zu überleben',
    'हिन्दी': 'क्योंकि जीवन सिर्फ जीवित रहने से अधिक होना चाहिए',
    'Français': 'parce que la vie devrait être plus que juste survivre',
    'Filipino': 'dahil ang buhay ay dapat na higit pa sa pagiging nakaligtas lamang',
    '中文': '因为生活应该不仅仅是生存',
    'العربية': 'لأن الحياة يجب أن تكون أكثر من مجرد البقاء على قيد الحياة'
  },
  'beginJourney': {
    'English': 'Begin Your Journey',
    'Español': 'Comienza Tu Viaje',
    'Português': 'Comece Sua Jornada',
    'Русский': 'Начни Свой Путь',
    'Deutsch': 'Beginne Deine Reise',
    'हिन्दी': 'अपनी यात्रा शुरू करें',
    'Français': 'Commencez Votre Voyage',
    'Filipino': 'Simulan Ang Iyong Paglalakbay',
    '中文': '开始您的旅程',
    'العربية': 'ابدأ رحلتك'
  },
  
  // Page titles
  'mentalHealth': {
    'English': 'Anxiety & Depression',
    'Español': 'Ansiedad y Depresión',
    'Português': 'Ansiedade e Depressão',
    'Русский': 'Тревога и Депрессия',
    'Deutsch': 'Angst & Depression',
    'हिन्दी': 'चिंता और अवसाद',
    'Français': 'Anxiété et Dépression',
    'Filipino': 'Pagkabalisa at Depresyon',
    '中文': '焦虑与抑郁',
    'العربية': 'القلق والاكتئاب'
  },
  'socialConnection': {
    'English': 'Social Connection',
    'Español': 'Socialización y Conexión',
    'Português': 'Conexão Social',
    'Русский': 'Социальная Связь',
    'Deutsch': 'Soziale Verbindung',
    'हिन्दी': 'सामाजिक संबंध',
    'Français': 'Connexion Sociale',
    'Filipino': 'Sosyal na Koneksyon',
    '中文': '社交联系',
    'العربية': 'التواصل الاجتماعي'
  },
  'lawEnforcement': {
    'English': 'Law Enforcement',
    'Español': 'Fuerzas de Seguridad',
    'Português': 'Aplicação da Lei',
    'Русский': 'Правоохранительные Органы',
    'Deutsch': 'Strafverfolgung',
    'हिन्दी': 'कानून प्रवर्तन',
    'Français': 'Application de la Loi',
    'Filipino': 'Pagpapatupad ng Batas',
    '中文': '执法人员',
    'العربية': 'تطبيق القانون'
  },
  'healthcare': {
    'English': 'Healthcare Workers',
    'Español': 'Trabajadores de la Salud',
    'Português': 'Profissionais de Saúde',
    'Русский': 'Медицинские Работники',
    'Deutsch': 'Gesundheitspersonal',
    'हिन्दी': 'स्वास्थ्य कर्मचारी',
    'Français': 'Professionnels de Santé',
    'Filipino': 'Mga Manggagawa sa Pangangalagang Pangkalusugan',
    '中文': '医护人员',
    'العربية': 'العاملون في مجال الرعاية الصحية'
  },
  'firstResponders': {
    'English': 'First Responders',
    'Español': 'Equipos de Emergencia',
    'Português': 'Socorristas',
    'Русский': 'Службы Экстренного Реагирования',
    'Deutsch': 'Ersthelfer',
    'हिन्दी': 'प्रथम प्रतिक्रियादाता',
    'Français': 'Premiers Intervenants',
    'Filipino': 'Mga Unang Tumutugon',
    '中文': '急救人员',
    'العربية': 'المستجيبون الأوائل'
  },
  
  // Welcome page common elements
  'welcomeTo': {
    'English': 'Welcome to',
    'Español': 'Bienvenido a',
    'Português': 'Bem-vindo ao',
    'Русский': 'Добро пожаловать в',
    'Deutsch': 'Willkommen bei',
    'हिन्दी': 'में आपका स्वागत है',
    'Français': 'Bienvenue à',
    'Filipino': 'Maligayang pagdating sa',
    '中文': '欢迎来到',
    'العربية': 'مرحبا بك في'
  },
  'statistics': {
    'English': 'Statistics',
    'Español': 'Estadísticas',
    'Português': 'Estatísticas',
    'Русский': 'Статистика',
    'Deutsch': 'Statistiken',
    'हिन्दी': 'आंकड़े',
    'Français': 'Statistiques',
    'Filipino': 'Mga Istatistika',
    '中文': '统计数据',
    'العربية': 'إحصائيات'
  },
  'resources': {
    'English': 'Resources',
    'Español': 'Recursos',
    'Português': 'Recursos',
    'Русский': 'Ресурсы',
    'Deutsch': 'Ressourcen',
    'हिन्दी': 'संसाधन',
    'Français': 'Ressources',
    'Filipino': 'Mga Mapagkukunan',
    '中文': '资源',
    'العربية': 'موارد'
  },
  'workshops': {
    'English': 'Workshops',
    'Español': 'Talleres',
    'Português': 'Oficinas',
    'Русский': 'Семинары',
    'Deutsch': 'Workshops',
    'हिन्दी': 'कार्यशालाएँ',
    'Français': 'Ateliers',
    'Filipino': 'Mga Workshop',
    '中文': '工作坊',
    'العربية': 'ورش عمل'
  },
  'assessments': {
    'English': 'Assessments',
    'Español': 'Evaluaciones',
    'Português': 'Avaliações',
    'Русский': 'Оценки',
    'Deutsch': 'Bewertungen',
    'हिन्दी': 'मूल्यांकन',
    'Français': 'Évaluations',
    'Filipino': 'Mga Pagsusuri',
    '中文': '评估',
    'العربية': 'تقييمات'
  },
  'continueToPortal': {
    'English': 'Continue to Portal',
    'Español': 'Continuar al Portal',
    'Português': 'Continuar para o Portal',
    'Русский': 'Перейти в Портал',
    'Deutsch': 'Zum Portal fortfahren',
    'हिन्दी': 'पोर्टल पर जारी रखें',
    'Français': 'Continuer vers le Portail',
    'Filipino': 'Magpatuloy sa Portal',
    '中文': '继续前往门户',
    'العربية': 'الاستمرار إلى البوابة'
  },
  
  // Assessment Tab
  'selfAssessment': {
    'English': 'Self-Assessment',
    'Español': 'Autoevaluación',
    'Português': 'Autoavaliação',
    'Русский': 'Самооценка',
    'Deutsch': 'Selbsteinschätzung',
    'हिन्दी': 'स्व-मूल्यांकन',
    'Français': 'Auto-évaluation',
    'Filipino': 'Sariling Pagsusuri',
    '中文': '自我评估',
    'العربية': 'التقييم الذاتي'
  },
  'startAssessment': {
    'English': 'Start Assessment',
    'Español': 'Iniciar Evaluación',
    'Português': 'Iniciar Avaliação',
    'Русский': 'Начать Оценку',
    'Deutsch': 'Bewertung starten',
    'हिन्दी': 'मूल्यांकन शुरू करें',
    'Français': 'Commencer l\'évaluation',
    'Filipino': 'Simulan ang Pagsusuri',
    '中文': '开始评估',
    'العربية': 'بدء التقييم'
  },

  // User Menu
  'profile': {
    'English': 'Profile',
    'Español': 'Perfil',
    'Português': 'Perfil',
    'Русский': 'Профиль',
    'Deutsch': 'Profil',
    'हिन्दी': 'प्रोफाइल',
    'Français': 'Profil',
    'Filipino': 'Profile',
    '中文': '个人资料',
    'العربية': 'الملف الشخصي'
  },
  'settings': {
    'English': 'Settings',
    'Español': 'Configuración',
    'Português': 'Configurações',
    'Русский': 'Настройки',
    'Deutsch': 'Einstellungen',
    'हिन्दी': 'सेटिंग्स',
    'Français': 'Paramètres',
    'Filipino': 'Mga Setting',
    '中文': '设置',
    'العربية': 'الإعدادات'
  },
  'darkMode': {
    'English': 'Dark Mode',
    'Español': 'Modo Oscuro',
    'Português': 'Modo Escuro',
    'Русский': 'Темный режим',
    'Deutsch': 'Dunkelmodus',
    'हिन्दी': 'डार्क मोड',
    'Français': 'Mode Sombre',
    'Filipino': 'Dark Mode',
    '中文': '深色模式',
    'العربية': 'الوضع الداكن'
  },
  'logout': {
    'English': 'Log out',
    'Español': 'Cerrar sesión',
    'Português': 'Sair',
    'Русский': 'Выйти',
    'Deutsch': 'Abmelden',
    'हिन्दी': 'लॉग आउट',
    'Français': 'Se déconnecter',
    'Filipino': 'Mag-log out',
    '中文': '登出',
    'العربية': 'تسجيل الخروج'
  },
  
  // Mental Health Welcome Page
  'enteringPortal': {
    'English': 'Entering portal',
    'Español': 'Entrando al portal',
    'Português': 'Entrando no portal',
    'Русский': 'Вход в портал',
    'Deutsch': 'Portal betreten',
    'हिन्दी': 'पोर्टल में प्रवेश हो रहा है',
    'Français': 'Entrée dans le portail',
    'Filipino': 'Pumapasok sa portal',
    '中文': '正在进入门户',
    'العربية': 'الدخول إلى البوابة'
  },
  'loadingMentalHealthResources': {
    'English': 'Loading mental health resources',
    'Español': 'Cargando recursos de salud mental',
    'Português': 'Carregando recursos de saúde mental',
    'Русский': 'Загрузка ресурсов психического здоровья',
    'Deutsch': 'Lade Ressourcen zur psychischen Gesundheit',
    'हिन्दी': 'मानसिक स्वास्थ्य संसाधन लोड हो रहे हैं',
    'Français': 'Chargement des ressources de santé mentale',
    'Filipino': 'Naglo-load ng mga mapagkukunang pangkalusugang pangkaisipan',
    '中文': '加载心理健康资源',
    'العربية': 'تحميل موارد الصحة النفسية'
  },
  'welcomeToMentalHealth': {
    'English': 'Welcome to Anxiety & Depression',
    'Español': 'Bienvenido a Ansiedad y Depresión',
    'Português': 'Bem-vindo à Ansiedade e Depressão',
    'Русский': 'Добро пожаловать в Тревога и Депрессия',
    'Deutsch': 'Willkommen bei Angst & Depression',
    'हिन्दी': 'चिंता और अवसाद में आपका स्वागत है',
    'Français': 'Bienvenue à Anxiété et Dépression',
    'Filipino': 'Maligayang pagdating sa Pagkabalisa at Depresyon',
    '中文': '欢迎来到焦虑与抑郁',
    'العربية': 'مرحبًا بك في القلق والاكتئاب'
  },
  'mentalHealthDescription': {
    'English': 'A dedicated space to understand, address, and find support for anxiety and depression disorders.',
    'Español': 'Un espacio dedicado para comprender, abordar y encontrar apoyo para los trastornos de ansiedad y depresión.',
    'Português': 'Um espaço dedicado para entender, abordar e encontrar apoio para transtornos de ansiedade e depressão.',
    'Русский': 'Пространство, посвященное пониманию, решению проблем и поиску поддержки при тревожных расстройствах и депрессии.',
    'Deutsch': 'Ein Raum zum Verstehen, Angehen und Finden von Unterstützung bei Angststörungen und Depressionen.',
    'हिन्दी': 'चिंता और अवसाद विकारों को समझने, संबोधित करने और सहायता प्राप्त करने के लिए एक समर्पित स्थान।',
    'Français': 'Un espace dédié pour comprendre, aborder et trouver du soutien pour les troubles anxieux et dépressifs.',
    'Filipino': 'Isang nakatalagang espasyo para maunawaan, matugunan, at makahanap ng suporta para sa mga karamdaman sa pagkabalisa at depresyon.',
    '中文': '一个理解、解决和寻找焦虑和抑郁症支持的专门空间。',
    'العربية': 'مساحة مخصصة لفهم ومعالجة وإيجاد الدعم لاضطرابات القلق والاكتئاب.'
  },
  'mentalHealthStats': {
    'English': 'Data on the prevalence of anxiety and depression disorders and their impact on wellbeing.',
    'Español': 'Datos sobre la prevalencia de los trastornos de ansiedad y depresión y su impacto en el bienestar.',
    'Português': 'Dados sobre a prevalência de transtornos de ansiedade e depressão e seu impacto no bem-estar.',
    'Русский': 'Данные о распространенности тревожных расстройств и депрессии и их влиянии на благополучие.',
    'Deutsch': 'Daten zur Prävalenz von Angststörungen und Depressionen und ihren Auswirkungen auf das Wohlbefinden.',
    'हिन्दी': 'चिंता और अवसाद विकारों की व्यापकता और कल्याण पर उनके प्रभाव पर आंकड़े।',
    'Français': 'Données sur la prévalence des troubles anxieux et dépressifs et leur impact sur le bien-être.',
    'Filipino': 'Datos tungkol sa pagkalat ng mga karamdaman sa pagkabalisa at depresyon at ang epekto nito sa kagalingan.',
    '中文': '关于焦虑和抑郁症的患病率及其对幸福感影响的数据。',
    'العربية': 'بيانات عن انتشار اضطرابات القلق والاكتئاب وتأثيرها على الرفاهية.'
  },
  'mentalHealthResources': {
    'English': 'Guides, articles, and tools to understand and manage anxiety and depression symptoms.',
    'Español': 'Guías, artículos y herramientas para entender y manejar los síntomas de ansiedad y depresión.',
    'Português': 'Guias, artigos e ferramentas para entender e gerenciar os sintomas de ansiedade e depressão.',
    'Русский': 'Руководства, статьи и инструменты для понимания и управления симптомами тревоги и депрессии.',
    'Deutsch': 'Leitfäden, Artikel und Werkzeuge zum Verstehen und Bewältigen von Angst- und Depressionssymptomen.',
    'हिन्दी': 'चिंता और अवसाद के लक्षणों को समझने और प्रबंधित करने के लिए मार्गदर्शिकाएँ, लेख और उपकरण।',
    'Français': 'Guides, articles et outils pour comprendre et gérer les symptômes d\'anxiété et de dépression.',
    'Filipino': 'Mga gabay, artikulo, at mga tool upang maunawaan at mapamahalaan ang mga sintomas ng pagkabalisa at depresyon.',
    '中文': '用于理解和管理焦虑和抑郁症状的指南、文章和工具。',
    'العربية': 'أدلة ومقالات وأدوات لفهم وإدارة أعراض القلق والاكتئاب.'
  },
  'mentalHealthWorkshops': {
    'English': 'Interactive sessions on coping techniques, stress management, and recovery.',
    'Español': 'Sesiones interactivas sobre técnicas de afrontamiento, manejo del estrés y recuperación.',
    'Português': 'Sessões interativas sobre técnicas de enfrentamento, gerenciamento de estresse e recuperação.',
    'Русский': 'Интерактивные занятия по методам преодоления трудностей, управлению стрессом и восстановлению.',
    'Deutsch': 'Interaktive Sitzungen zu Bewältigungstechniken, Stressmanagement und Erholung.',
    'हिन्दी': 'सामना करने की तकनीकों, तनाव प्रबंधन और स्वस्थ होने पर इंटरैक्टिव सत्र।',
    'Français': 'Sessions interactives sur les techniques d\'adaptation, la gestion du stress et la récupération.',
    'Filipino': 'Mga interactive na sesyon sa mga pamamaraan ng pagkaya, pamamahala ng stress, at paggaling.',
    '中文': '关于应对技巧、压力管理和恢复的互动课程。',
    'العربية': 'جلسات تفاعلية حول تقنيات التكيف وإدارة التوتر والتعافي.'
  },
  'mentalHealthAssessments': {
    'English': 'Assessment tools for anxiety, depression, and related disorders.',
    'Español': 'Herramientas de evaluación para la ansiedad, depresión y trastornos relacionados.',
    'Português': 'Ferramentas de avaliação para ansiedade, depressão e transtornos relacionados.',
    'Русский': 'Инструменты оценки тревожности, депрессии и связанных с ними расстройств.',
    'Deutsch': 'Bewertungsinstrumente für Angst, Depression und verwandte Störungen.',
    'हिन्दी': 'चिंता, अवसाद और संबंधित विकारों के लिए मूल्यांकन उपकरण।',
    'Français': 'Outils d\'évaluation pour l\'anxiété, la dépression et les troubles connexes.',
    'Filipino': 'Mga tool sa pagsusuri para sa pagkabalisa, depresyon, at mga kaugnay na karamdaman.',
    '中文': '焦虑、抑郁和相关障碍的评估工具。',
    'العربية': 'أدوات تقييم للقلق والاكتئاب والاضطرابات ذات الصلة.'
  },
  
  // Add hundreds more translations here for all text in the app
  // This is just a sample implementation
};

export default translations;
