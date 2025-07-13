import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Brain, Heart, Smile, Target, BookOpen, TrendingUp } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

const QuizzesSection: React.FC = () => {
  const navigate = useNavigate();
  const { isSpanish } = useTranslation();

  const handleQuizClick = (path: string) => {
    navigate(path);
  };

  const translations = {
    viewAll: isSpanish ? "Ver Todas las Evaluaciones" : "View All Assessments",
    viewAllDesc: isSpanish ? "Explora más de 50 evaluaciones profesionales de salud mental" : "Explore 50+ professional mental health assessments",
    mentalWellness: isSpanish ? "Verificación de Bienestar Mental" : "Mental Wellness Check",
    mentalWellnessDesc: isSpanish ? "Evaluación rápida de tu estado mental actual" : "Quick assessment of your current mental state",
    emotionalIntelligence: isSpanish ? "Inteligencia Emocional" : "Emotional Intelligence",
    emotionalIntelligenceDesc: isSpanish ? "Descubre tu conciencia emocional y habilidades de regulación" : "Discover your emotional awareness and regulation skills",
    stressLevel: isSpanish ? "Evaluación del Nivel de Estrés" : "Stress Level Assessment",
    stressLevelDesc: isSpanish ? "Evalúa tus niveles actuales de estrés y mecanismos de afrontamiento" : "Evaluate your current stress levels and coping mechanisms",
    personalGrowth: isSpanish ? "Quiz de Crecimiento Personal" : "Personal Growth Quiz",
    personalGrowthDesc: isSpanish ? "Identifica áreas para el desarrollo y crecimiento personal" : "Identify areas for personal development and growth",
    startAssessment: isSpanish ? "Comenzar Evaluación" : "Start Assessment",
    startQuiz: isSpanish ? "Comenzar Quiz" : "Start Quiz",
    takeAssessment: isSpanish ? "Tomar Evaluación" : "Take Assessment"
  };

  return (
    <div className="space-y-6">
      {/* Main CTA Card for Comprehensive Assessments */}
      <Card className="bg-gradient-to-r from-primary/20 to-purple-500/20 border-primary/30 hover:from-primary/30 hover:to-purple-500/30 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle className="text-white text-xl">{translations.viewAll}</CardTitle>
          </div>
          <CardDescription className="text-white/80">
            {translations.viewAllDesc}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => handleQuizClick('/mental-wellness-assessments')}
            className="w-full bg-primary hover:bg-primary/80 text-white text-lg py-3"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            {translations.viewAll}
          </Button>
        </CardContent>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">{translations.mentalWellness}</CardTitle>
            </div>
            <CardDescription className="text-white/70">
              {translations.mentalWellnessDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleQuizClick('/mental-wellness')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {translations.startAssessment}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-pink-400" />
              <CardTitle className="text-white">{translations.emotionalIntelligence}</CardTitle>
            </div>
            <CardDescription className="text-white/70">
              {translations.emotionalIntelligenceDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleQuizClick('/emotional-intelligence')}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
            >
              {translations.startQuiz}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Smile className="h-5 w-5 text-yellow-400" />
              <CardTitle className="text-white">{translations.stressLevel}</CardTitle>
            </div>
            <CardDescription className="text-white/70">
              {translations.stressLevelDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleQuizClick('/stress-assessment')}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              {translations.takeAssessment}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white/10 border-white/20 hover:bg-white/20 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-400" />
              <CardTitle className="text-white">{translations.personalGrowth}</CardTitle>
            </div>
            <CardDescription className="text-white/70">
              {translations.personalGrowthDesc}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => handleQuizClick('/personal-growth')}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {translations.startQuiz}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizzesSection;