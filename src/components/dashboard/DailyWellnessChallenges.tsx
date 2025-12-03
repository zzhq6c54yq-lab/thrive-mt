
import React, { useState } from "react";
import { Calendar, CheckCircle, ArrowRight, Brain, Heart, Activity, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const DailyWellnessChallenges: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'wellness' | 'mental'>('wellness');
  const [points, setPoints] = useState<number>(75);
  
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    dailyChallenges: isSpanish ? "Desafíos Diarios" : "Daily Challenges",
    progressToward: isSpanish ? "Progreso hacia crédito de $1" : "Progress toward $1 credit",
    points: isSpanish ? "puntos" : "points",
    morePointsNeeded: isSpanish ? "puntos más necesarios" : "more points needed",
    wellnessChallenges: isSpanish ? "Desafíos de Bienestar" : "Wellness Challenges",
    mentalHealth: isSpanish ? "Salud Mental" : "Mental Health",
    viewAllChallenges: isSpanish ? "Ver todos los desafíos" : "View all challenges",
    redeemForCredits: isSpanish ? "Canjear por créditos de copago" : "Redeem for co-pay credits",
    completeAllBonus: isSpanish ? "Bonificación por Completar Todos los Desafíos: +25 puntos" : "Complete All Challenges Bonus: +25 points",
    challengeSelected: isSpanish ? "Desafío Seleccionado" : "Challenge Selected",
    openingDetails: isSpanish ? "Abriendo detalles del desafío..." : "Opening challenge details...",
    challengeCompleted: isSpanish ? "¡Desafío Completado!" : "Challenge Completed!",
    earnedPoints: isSpanish ? "¡Ganaste +{points} puntos!" : "You earned +{points} points!"
  };
  
  const wellnessChallenges = [
    {
      id: "meditation",
      title: isSpanish ? "Meditación Consciente de 10 Minutos" : "10-Minute Mindful Meditation",
      description: isSpanish ? "Tómate un momento para centrarte con una meditación guiada" : "Take a moment to center yourself with a guided meditation",
      icon: Brain,
      completed: true,
      points: 10
    },
    {
      id: "gratitude",
      title: isSpanish ? "Diario de Gratitud" : "Gratitude Journaling",
      description: isSpanish ? "Escribe tres cosas por las que estás agradecido hoy" : "Write down three things you're grateful for today",
      icon: Heart,
      completed: false,
      points: 10
    },
    {
      id: "hydration",
      title: isSpanish ? "Seguimiento de Hidratación" : "Hydration Tracker",
      description: isSpanish ? "Bebe 8 vasos de agua durante el día" : "Drink 8 glasses of water throughout the day",
      icon: Activity,
      completed: false,
      points: 10
    }
  ];
  
  const mentalHealthChallenges = [
    {
      id: "affirmations",
      title: isSpanish ? "Afirmaciones Positivas" : "Positive Affirmations",
      description: isSpanish ? "Repítete a ti mismo 5 afirmaciones positivas" : "Repeat 5 positive affirmations to yourself",
      icon: Heart,
      completed: false,
      points: 10
    },
    {
      id: "stress-relief",
      title: isSpanish ? "Ejercicio de Alivio del Estrés" : "Stress-Relief Exercise",
      description: isSpanish ? "Practica 5 minutos de respiración profunda" : "Practice 5 minutes of deep breathing",
      icon: Brain,
      completed: true,
      points: 10
    },
    {
      id: "mindful-walk",
      title: isSpanish ? "Caminata Consciente" : "Mindful Walk",
      description: isSpanish ? "Da un paseo de 15 minutos centrándote en tu entorno" : "Take a 15-minute walk focusing on your surroundings",
      icon: Activity,
      completed: false,
      points: 10
    }
  ];
  
  const activeChallenges = activeTab === 'wellness' ? wellnessChallenges : mentalHealthChallenges;
  
  const handleViewAll = () => {
    // Pass the active tab to the WellnessChallenges page
    navigate("/app/wellness-challenges", { state: { initialTab: activeTab } });
  };
  
  const handleChallengeClick = (id: string) => {
    toast({
      title: translations.challengeSelected,
      description: translations.openingDetails,
      duration: 1500
    });
    navigate(`/app/wellness-challenges/${id}`);
  };

  const handleToggleCompletion = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Find the challenge
    const challenge = [...wellnessChallenges, ...mentalHealthChallenges].find(c => c.id === id);
    if (!challenge) return;
    
    // If challenge is not completed, add points
    if (!challenge.completed) {
      setPoints(prev => prev + challenge.points);
      
      toast({
        title: translations.challengeCompleted,
        description: translations.earnedPoints.replace('{points}', challenge.points.toString()),
        duration: 1500
      });

      // In a real app, we would update the challenge's completed status here
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-[#2a2a3c] to-[#1f1f2c] rounded-2xl overflow-hidden shadow-lg">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        
        <div className="bg-gradient-to-r from-[#8D65C5]/20 via-[#E96DED]/20 to-[#6C85DD]/20 p-6">
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => {
                console.log('Wellness tab clicked');
                setActiveTab('wellness');
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all z-10 relative ${
                activeTab === 'wellness'
                  ? 'bg-indigo-500 text-white'
                  : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
              }`}
            >
              {translations.wellnessChallenges}
            </button>
            <button
              onClick={() => {
                console.log('Mental health tab clicked');
                setActiveTab('mental');
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all z-10 relative ${
                activeTab === 'mental'
                  ? 'bg-purple-500 text-white'
                  : 'bg-[#3a3a4c]/50 text-gray-300 hover:bg-[#3a3a4c]'
              }`}
            >
              {translations.mentalHealth}
            </button>
          </div>
          
          <div className="space-y-4">
            {activeChallenges.map((challenge) => (
              <div 
                key={challenge.id}
                className="bg-[#2a2a3c]/80 backdrop-blur-sm rounded-xl p-4 flex items-start hover:bg-[#2a2a3c] transition-all cursor-pointer"
                onClick={() => handleChallengeClick(challenge.id)}
              >
                <div className={`p-2 rounded-lg mr-3 ${challenge.completed ? 'bg-green-500/20' : 'bg-indigo-500/20'}`}>
                  <challenge.icon className={`h-5 w-5 ${challenge.completed ? 'text-green-400' : 'text-indigo-400'}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white">{challenge.title}</h3>
                    <span className="text-amber-400 text-sm font-medium">+{challenge.points} pts</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{challenge.description}</p>
                </div>
                
                <button
                  onClick={(e) => handleToggleCompletion(challenge.id, e)}
                  className={`ml-3 p-2 rounded-full ${
                    challenge.completed 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-700/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                  } transition-colors`}
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <button 
              onClick={handleViewAll}
              className="flex items-center text-indigo-300 hover:text-indigo-200 text-sm font-medium transition-colors"
            >
              {translations.viewAllChallenges}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
            <button
              onClick={() => navigate("/app/copay-credits")}
              className="flex items-center text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors"
            >
              {translations.redeemForCredits}
              <Award className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyWellnessChallenges;
