
import React from "react";
import { HelpCircle, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuizzesSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    title: isSpanish ? "Cuestionarios de Salud Mental" : "Mental Health Quizzes",
    description: isSpanish ? "Cuestionarios divertidos y educativos para mejorar tu conocimiento" : "Fun and educational quizzes to enhance your knowledge",
    inProgress: isSpanish ? "En progreso" : "In progress",
    progress: isSpanish ? "Progreso" : "Progress",
    questions: isSpanish ? "preguntas" : "questions",
    exploreMore: isSpanish ? "Explorar Más Cuestionarios" : "Explore More Quizzes",
    continue: isSpanish ? "Continuar" : "Continue",
    start: isSpanish ? "Iniciar" : "Start",
    startingQuiz: isSpanish ? "Iniciando Cuestionario" : "Quiz Starting",
    takingToQuiz: isSpanish ? "Llevándote al cuestionario seleccionado..." : "Taking you to the selected quiz...",
    exploringQuizzes: isSpanish ? "Explorando Cuestionarios" : "Exploring Quizzes",
    takingToAll: isSpanish ? "Llevándote a todos los cuestionarios disponibles" : "Taking you to all available quizzes"
  };
  
  // Mock data for quizzes with translations
  const quizzes = [
    {
      id: 1,
      title: isSpanish ? "Conceptos Básicos de Salud Mental" : "Mental Health Basics",
      description: isSpanish 
        ? "Prueba tus conocimientos sobre conceptos fundamentales de salud mental" 
        : "Test your knowledge about fundamental mental health concepts",
      completionRate: 75,
      questions: 10,
      timeEstimate: isSpanish ? "5 min" : "5 min",
    },
    {
      id: 2,
      title: isSpanish ? "Manejo del Estrés" : "Stress Management",
      description: isSpanish 
        ? "Aprende sobre técnicas efectivas para reducir el estrés" 
        : "Learn about effective stress reduction techniques",
      completionRate: 0,
      questions: 8,
      timeEstimate: isSpanish ? "4 min" : "4 min",
    },
  ];

  const handleStartQuiz = (quizId: number) => {
    toast({
      title: translations.startingQuiz,
      description: translations.takingToQuiz,
      duration: 1500,
    });
    
    // Navigate to games-and-quizzes with optional quiz ID
    navigate("/games-and-quizzes", {
      state: { 
        activeTab: "quizzes",
        selectedQuizId: quizId
      }
    });
  };
  
  const handleExploreQuizzes = () => {
    toast({
      title: translations.exploringQuizzes,
      description: translations.takingToAll,
      duration: 1500,
    });
    
    navigate("/games-and-quizzes", {
      state: { activeTab: "quizzes" }
    });
  };

  return (
    <Card className="border-[#B87333]/20 hover:border-[#B87333]/40 transition-all duration-300 shadow-sm hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-[#B87333]" />
          {translations.title}
        </CardTitle>
        <CardDescription>
          {translations.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div 
              key={quiz.id} 
              className="p-3 border border-border rounded-md bg-background hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    {quiz.title}
                    {quiz.completionRate > 0 && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {translations.inProgress}
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
                </div>
                <Button
                  size="sm"
                  className="h-7 rounded-full bg-[#B87333] hover:bg-[#A56625] text-white"
                  onClick={() => handleStartQuiz(quiz.id)}
                >
                  {quiz.completionRate > 0 
                    ? translations.continue
                    : translations.start}
                </Button>
              </div>
              
              {quiz.completionRate > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{translations.progress}</span>
                    <span>{quiz.completionRate}%</span>
                  </div>
                  <Progress value={quiz.completionRate} className="h-1.5" />
                </div>
              )}
              
              <div className="mt-2 flex items-center text-xs text-muted-foreground">
                <Lightbulb className="h-3 w-3 mr-1" />
                <span>{quiz.questions} {translations.questions}</span>
                <span className="mx-2">•</span>
                <span>{quiz.timeEstimate}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#B87333] border-[#B87333]/30 hover:bg-[#B87333]/5 hover:border-[#B87333]"
            onClick={handleExploreQuizzes}
          >
            {translations.exploreMore}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizzesSection;
