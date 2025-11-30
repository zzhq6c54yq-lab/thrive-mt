
import useTranslation from "@/hooks/useTranslation";
import { THRIVE_LOGO } from "@/constants/branding";

export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  isWelcome?: boolean;
  userName?: string;
}

export const useTutorialSteps = (featureId: string, userName: string = "") => {
  const { isSpanish, getTranslatedText } = useTranslation();
  
  // Get tutorial content for this feature
  switch (featureId) {
    case 'dashboard':
      return [
        {
          title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
          description: isSpanish 
            ? "Tu panel de bienestar mental personalizado está listo. Lo hemos diseñado para apoyar tu viaje hacia una mejor salud mental, centrándote en Horizontes Esperanzadores, Empoderamiento a través de la Educación, Conexiones Nutridas, Resiliencia y Recuperación, y asegurando que Tu Viaje Importa."
            : "Your personalized mental wellness dashboard is ready. We've designed it to support your journey to better mental health, focusing on Hopeful Horizons, Empowerment through Education, Nurtured Connections, Resilience and Recovery, and ensuring Your Journey Matters.",
          image: THRIVE_LOGO,
          isWelcome: true,
          userName: userName
        },
        {
          title: isSpanish ? "Explora Tu Panel" : "Explore Your Dashboard",
          description: isSpanish
            ? "Tu panel personalizado te ofrece acceso a todas las herramientas y recursos disponibles para apoyar tu bienestar mental. Descubre talleres, juegos, herramientas y contenido adaptado específicamente para ti."
            : "Your personalized dashboard gives you access to all the tools and resources available to support your mental wellbeing. Discover workshops, games, tools, and content tailored specifically for you.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Ayuda Siempre Disponible" : "Help Always Available",
          description: isSpanish
            ? "Henry, tu compañero de IA para la salud mental, está disponible en cualquier momento para ayudarte a navegar por la plataforma. Haz clic en el botón Henry o en el botón Thrive MT en la esquina superior derecha para obtener ayuda."
            : "Henry, your AI mental health companion, is available anytime to help you navigate the platform. Click the Henry button or the Thrive MT button in the top right corner for assistance.",
          image: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png"
        }
      ];
    case 'workshops':
      return [
        {
          title: isSpanish ? "Explora Talleres de Bienestar" : "Explore Wellness Workshops",
          description: isSpanish
            ? "Descubre una variedad de talleres diseñados para apoyar diferentes aspectos de tu viaje de salud mental. Cada taller es facilitado por profesionales experimentados."
            : "Discover a variety of workshops designed to support different aspects of your mental health journey. Each workshop is facilitated by experienced professionals.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Participación en Talleres" : "Workshop Participation",
          description: isSpanish
            ? "Puedes registrarte para talleres en vivo o acceder a grabaciones de talleres anteriores. Participa en sesiones interactivas y conéctate con otros en tu viaje de bienestar."
            : "You can register for live workshops or access recordings of past workshops. Participate in interactive sessions and connect with others on their wellness journey.",
          image: THRIVE_LOGO
        }
      ];
    case 'video-diary':
      return [
        {
          title: isSpanish ? "Tu Diario en Video" : "Your Video Diary",
          description: isSpanish
            ? "El Diario en Video te permite grabar entradas cortas para documentar tu viaje de bienestar mental. Captura pensamientos, sentimientos y reflexiones en momentos específicos."
            : "Video Diary allows you to record short entries to document your mental wellness journey. Capture thoughts, feelings, and reflections at specific moments in time.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Cómo Usar Tu Diario en Video" : "How to Use Your Video Diary",
          description: isSpanish
            ? "Haz clic en 'Grabar entrada' para comenzar. Puedes establecer emociones, añadir notas y ver tus entradas anteriores para rastrear tu progreso con el tiempo."
            : "Click 'Record Entry' to begin. You can set emotions, add notes, and view your past entries to track your progress over time.",
          image: THRIVE_LOGO
        }
      ];
    case 'wellness-challenges':
      return [
        {
          title: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
          description: isSpanish
            ? "Los Desafíos de Bienestar ofrecen actividades estructuradas diseñadas para mejorar tu salud mental. Completa desafíos diarios, semanales o mensuales para desarrollar hábitos positivos."
            : "Wellness Challenges offer structured activities designed to improve your mental health. Complete daily, weekly, or monthly challenges to build positive habits.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Seguimiento de Tu Progreso" : "Tracking Your Progress",
          description: isSpanish
            ? "Marca los desafíos como completados, establece recordatorios y gana insignias por tu consistencia. Ver tu progreso puede ser motivador en tu viaje de bienestar."
            : "Mark challenges as completed, set reminders, and earn badges for your consistency. Seeing your progress can be motivating in your wellness journey.",
          image: THRIVE_LOGO
        }
      ];
    case 'personalized-content':
      return [
        {
          title: isSpanish ? "Contenido Adaptado a Ti" : "Content Tailored to You",
          description: isSpanish
            ? "Basado en tus intereses, metas y necesidades, nuestros algoritmos seleccionan artículos, videos y ejercicios específicamente para ti."
            : "Based on your interests, goals, and needs, our algorithms select articles, videos, and exercises specifically for you.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Mejorando Tus Recomendaciones" : "Improving Your Recommendations",
          description: isSpanish
            ? "Califica el contenido que ves para ayudar a nuestro sistema a entender mejor tus preferencias. Cuanto más interactúes, más relevantes serán tus recomendaciones."
            : "Rate content you view to help our system better understand your preferences. The more you interact, the more relevant your recommendations will become.",
          image: THRIVE_LOGO
        }
      ];
    case 'games-and-quizzes':
      return [
        {
          title: isSpanish ? "Juegos y Cuestionarios" : "Games & Quizzes",
          description: isSpanish
            ? "Disfruta de juegos interactivos y cuestionarios diseñados para reducir el estrés, mejorar el estado de ánimo y aumentar la conciencia de la salud mental."
            : "Enjoy interactive games and quizzes designed to reduce stress, improve mood, and increase mental health awareness.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Beneficios del Juego" : "Benefits of Play",
          description: isSpanish
            ? "El juego regular puede aliviar la ansiedad, mejorar la concentración y proporcionar descansos mentales necesarios. Programa tiempo para estas actividades como parte de tu rutina de autocuidado."
            : "Regular play can alleviate anxiety, improve focus, and provide necessary mental breaks. Schedule time for these activities as part of your self-care routine.",
          image: THRIVE_LOGO
        }
      ];
    case 'resource-library':
      return [
        {
          title: isSpanish ? "Biblioteca de Recursos" : "Resource Library",
          description: isSpanish
            ? "Accede a una colección completa de artículos, libros, podcasts y videos sobre diversos temas de salud mental, todos revisados por profesionales."
            : "Access a comprehensive collection of articles, books, podcasts, and videos on various mental health topics, all reviewed by professionals.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Encontrando Recursos" : "Finding Resources",
          description: isSpanish
            ? "Utiliza la función de búsqueda o navega por categorías para encontrar exactamente lo que necesitas. Puedes guardar recursos para acceder fácilmente más tarde."
            : "Use the search function or browse by category to find exactly what you need. You can save resources for easy access later.",
          image: THRIVE_LOGO
        }
      ];
    case 'community-support':
      return [
        {
          title: isSpanish ? "Apoyo Comunitario" : "Community Support",
          description: isSpanish
            ? "Conéctate con otros que comparten experiencias similares. Nuestras comunidades moderadas proporcionan un espacio seguro para compartir y aprender."
            : "Connect with others who share similar experiences. Our moderated communities provide a safe space to share and learn.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Pautas de la Comunidad" : "Community Guidelines",
          description: isSpanish
            ? "Nuestras comunidades valoran el respeto, la empatía y el apoyo mutuo. Los moderadores están disponibles para asegurar un ambiente positivo y constructivo."
            : "Our communities value respect, empathy, and mutual support. Moderators are available to ensure a positive and constructive environment.",
          image: THRIVE_LOGO
        }
      ];
    case 'progress-reports':
      return [
        {
          title: isSpanish ? "Seguimiento de Progreso" : "Progress Tracking",
          description: isSpanish
            ? "Visualiza tu viaje de bienestar mental a través de gráficos y análisis personalizados. Rastrea estados de ánimo, hábitos, sueño y más."
            : "Visualize your mental wellness journey through customized charts and analytics. Track moods, habits, sleep, and more.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Entendiendo Tus Datos" : "Understanding Your Data",
          description: isSpanish
            ? "Identifica patrones y desencadenantes revisando tus datos a lo largo del tiempo. Esto puede ayudarte a hacer ajustes en tu vida diaria para mejorar tu bienestar."
            : "Identify patterns and triggers by reviewing your data over time. This can help you make adjustments in your daily life to improve your wellbeing.",
          image: THRIVE_LOGO
        }
      ];
    case 'my-sponsor':
      return [
        {
          title: isSpanish ? "Mi Patrocinador N.A/A.A" : "My N.A/A.A Sponsor",
          description: isSpanish
            ? "Conéctate con un patrocinador de N.A/A.A para apoyo personalizado en tu viaje de recuperación. Los patrocinadores son individuos que han mantenido la sobriedad y están capacitados para guiar a otros."
            : "Connect with an N.A/A.A sponsor for personalized support on your recovery journey. Sponsors are individuals who have maintained sobriety and are trained to guide others.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Trabajando con Tu Patrocinador" : "Working with Your Sponsor",
          description: isSpanish
            ? "Programa check-ins regulares, establece metas de recuperación y trabaja a través de los 12 pasos con la guía de tu patrocinador. Tu patrocinador es un recurso confidencial y de apoyo."
            : "Schedule regular check-ins, set recovery goals, and work through the 12 steps with your sponsor's guidance. Your sponsor is a confidential, supportive resource.",
          image: THRIVE_LOGO
        }
      ];
    case 'binaural-beats':
      return [
        {
          title: isSpanish ? "Ritmos Binaurales" : "Binaural Beats",
          description: isSpanish
            ? "Los ritmos binaurales son una forma de terapia de sonido que utiliza diferentes frecuencias en cada oído para promover la relajación, la concentración o el sueño."
            : "Binaural beats are a form of sound therapy that uses different frequencies in each ear to promote relaxation, focus, or sleep.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Cómo Escuchar" : "How to Listen",
          description: isSpanish
            ? "Para obtener los mejores resultados, escucha con auriculares en un entorno tranquilo. Selecciona el tipo de ritmo basado en tu objetivo (relajación, concentración, sueño) y la duración deseada."
            : "For best results, listen with headphones in a quiet environment. Select the type of beat based on your goal (relaxation, focus, sleep) and desired duration.",
          image: THRIVE_LOGO
        }
      ];
    case 'mental-wellness-tools':
      return [
        {
          title: isSpanish ? "Herramientas de Bienestar Mental" : "Mental Wellness Tools",
          description: isSpanish
            ? "Explora una variedad de herramientas interactivas diseñadas para apoyar diferentes aspectos de tu salud mental, desde la gestión del estrés hasta el seguimiento del estado de ánimo."
            : "Explore a variety of interactive tools designed to support different aspects of your mental health, from stress management to mood tracking.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Uso Efectivo de las Herramientas" : "Effective Tool Use",
          description: isSpanish
            ? "Considera incorporar estas herramientas en tu rutina diaria. El uso regular y consistente ofrece los mayores beneficios para tu bienestar mental a largo plazo."
            : "Consider incorporating these tools into your daily routine. Regular, consistent use offers the greatest benefits for your long-term mental wellbeing.",
          image: THRIVE_LOGO
        }
      ];
    case 'mindfulness':
      return [
        {
          title: isSpanish ? "Mindfulness y Sueño" : "Mindfulness & Sleep",
          description: isSpanish
            ? "Aprende técnicas de mindfulness para calmar tu mente, reducir la ansiedad y mejorar la calidad del sueño. La práctica regular puede transformar tu bienestar general."
            : "Learn mindfulness techniques to calm your mind, reduce anxiety, and improve sleep quality. Regular practice can transform your overall wellbeing.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Comenzando tu Práctica" : "Starting Your Practice",
          description: isSpanish
            ? "Comienza con sesiones cortas de 5 minutos e incrementa gradualmente. Las meditaciones guiadas, los ejercicios de respiración y los escaneos corporales son excelentes técnicas para principiantes."
            : "Start with short 5-minute sessions and gradually increase. Guided meditations, breathing exercises, and body scans are excellent techniques for beginners.",
          image: THRIVE_LOGO
        }
      ];
    case 'journaling':
      return [
        {
          title: isSpanish ? "Escritura de Diario" : "Journaling",
          description: isSpanish
            ? "La escritura de diario es una poderosa herramienta de autoexpresión que puede ayudarte a procesar emociones, ganar claridad y rastrear patrones en tus pensamientos y sentimientos."
            : "Journaling is a powerful self-expression tool that can help you process emotions, gain clarity, and track patterns in your thoughts and feelings.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Técnicas Efectivas de Diario" : "Effective Journaling Techniques",
          description: isSpanish
            ? "Prueba diferentes enfoques como la escritura de flujo de conciencia, listas de gratitud o reflexiones guiadas. No hay forma correcta o incorrecta de llevar un diario - encuentra lo que funciona para ti."
            : "Try different approaches such as stream-of-consciousness writing, gratitude lists, or guided reflections. There's no right or wrong way to journal - find what works for you.",
          image: THRIVE_LOGO
        }
      ];
    case 'family-support':
      return [
        {
          title: isSpanish ? "Recursos Familiares" : "Family Resources",
          description: isSpanish
            ? "Accede a recursos diseñados para ayudar a familias y seres queridos a entender y apoyar a alguien con problemas de salud mental o adicción."
            : "Access resources designed to help families and loved ones understand and support someone dealing with mental health issues or addiction.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Apoyo para Cuidadores" : "Support for Caregivers",
          description: isSpanish
            ? "Como cuidador, también es importante cuidar tu propio bienestar. Explora recursos para el autocuidado, grupos de apoyo y consejos para manejar el estrés."
            : "As a caregiver, it's also important to take care of your own wellbeing. Explore resources for self-care, support groups, and tips for managing stress.",
          image: THRIVE_LOGO
        }
      ];
    default:
      return [
        {
          title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
          description: isSpanish
            ? "Estamos aquí para apoyar tu viaje de bienestar mental con herramientas y recursos personalizados."
            : "We're here to support your mental wellness journey with personalized resources and tools.",
          image: THRIVE_LOGO
        },
        {
          title: isSpanish ? "Navegando esta Función" : "Navigating this Feature",
          description: isSpanish
            ? "Explora las diferentes opciones disponibles en esta página. Si necesitas ayuda, haz clic en el botón Henry o utiliza el botón de ayuda en la navegación."
            : "Explore the different options available on this page. If you need help, click the Henry button or use the help button in navigation.",
          image: THRIVE_LOGO
        }
      ];
  }
};
