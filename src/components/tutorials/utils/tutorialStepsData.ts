
import useTranslation from "@/hooks/useTranslation";

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
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png",
          isWelcome: true,
          userName: userName
        },
        {
          title: isSpanish ? "Explora Tu Panel" : "Explore Your Dashboard",
          description: isSpanish
            ? "Tu panel personalizado te ofrece acceso a todas las herramientas y recursos disponibles para apoyar tu bienestar mental. Descubre talleres, juegos, herramientas y contenido adaptado específicamente para ti."
            : "Your personalized dashboard gives you access to all the tools and resources available to support your mental wellbeing. Discover workshops, games, tools, and content tailored specifically for you.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
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
            ? "Descubre una variedad de talleres diseñados para apoyar diferentes aspectos de tu viaje de salud mental."
            : "Discover a variety of workshops designed to support different aspects of your mental health journey.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        }
      ];
    default:
      return [
        {
          title: isSpanish ? "Bienvenido a Thrive MT" : "Welcome to Thrive MT",
          description: isSpanish
            ? "Estamos aquí para apoyar tu viaje de bienestar mental con herramientas y recursos personalizados."
            : "We're here to support your mental wellness journey with personalized resources and tools.",
          image: "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png"
        }
      ];
  }
};
