
import React, { useState, useEffect } from "react";
import Page from "@/components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, Flower2, Clock, Heart, Brain } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import HenryContextualTip from "@/components/henry/HenryContextualTip";

const MeditationStudio = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("sessions");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const handleDownload = (sessionName: string) => {
    toast({
      title: isSpanish ? "Descargando" : "Downloading",
      description: `${sessionName}`,
      duration: 2000
    });
  };

  const meditationCategories = [
    {
      id: "mindfulness",
      title: isSpanish ? "Atención Plena" : "Mindfulness",
      description: isSpanish ? "Meditaciones para estar presente" : "Meditations for being present",
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      sessions: 12,
      color: "purple"
    },
    {
      id: "sleep",
      title: isSpanish ? "Sueño y Relajación" : "Sleep & Relaxation",
      description: isSpanish ? "Sesiones para mejorar el descanso" : "Sessions to improve rest",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      sessions: 8,
      color: "blue"
    },
    {
      id: "stress",
      title: isSpanish ? "Reducción de Estrés" : "Stress Reduction",
      description: isSpanish ? "Técnicas para manejar el estrés" : "Techniques to manage stress",
      icon: <Heart className="w-6 h-6 text-green-500" />,
      sessions: 10,
      color: "green"
    },
    {
      id: "focus",
      title: isSpanish ? "Concentración" : "Focus & Clarity",
      description: isSpanish ? "Meditaciones para mayor claridad mental" : "Meditations for mental clarity",
      icon: <Flower2 className="w-6 h-6 text-indigo-500" />,
      sessions: 6,
      color: "indigo"
    }
  ];

  const popularSessions = [
    {
      id: 1,
      title: isSpanish ? "Respiración Profunda - 10 minutos" : "Deep Breathing - 10 minutes",
      duration: "10:00",
      category: "mindfulness",
      plays: 2340,
      difficulty: isSpanish ? "Principiante" : "Beginner"
    },
    {
      id: 2,
      title: isSpanish ? "Escaneo Corporal Relajante" : "Relaxing Body Scan",
      duration: "15:00",
      category: "sleep",
      plays: 1890,
      difficulty: isSpanish ? "Intermedio" : "Intermediate"
    },
    {
      id: 3,
      title: isSpanish ? "Liberación de Ansiedad" : "Anxiety Release",
      duration: "12:00",
      category: "stress",
      plays: 3120,
      difficulty: isSpanish ? "Principiante" : "Beginner"
    },
    {
      id: 4,
      title: isSpanish ? "Concentración Láser" : "Laser Focus",
      duration: "8:00",
      category: "focus",
      plays: 1560,
      difficulty: isSpanish ? "Avanzado" : "Advanced"
    }
  ];

  const guidedPrograms = [
    {
      title: isSpanish ? "Programa de 21 Días - Fundamentos" : "21-Day Foundation Program",
      description: isSpanish ? "Construye una práctica sólida de meditación" : "Build a solid meditation practice",
      sessions: 21,
      totalTime: "7 hours",
      progress: 33
    },
    {
      title: isSpanish ? "Maestría del Sueño - 14 Días" : "Sleep Mastery - 14 Days",
      description: isSpanish ? "Mejora la calidad de tu descanso nocturno" : "Improve your nighttime rest quality",
      sessions: 14,
      totalTime: "5 hours",
      progress: 71
    },
    {
      title: isSpanish ? "Equilibrio Emocional - 30 Días" : "Emotional Balance - 30 Days",
      description: isSpanish ? "Desarrolla estabilidad emocional duradera" : "Develop lasting emotional stability",
      sessions: 30,
      totalTime: "10 hours",
      progress: 16
    }
  ];

  const playSession = (session: any) => {
    setCurrentSession(session);
    setIsPlaying(true);
    setTimeRemaining(parseInt(session.duration.split(':')[0]) * 60 + parseInt(session.duration.split(':')[1]));
    
    toast({
      title: isSpanish ? "Iniciando sesión" : "Starting session",
      description: session.title,
      duration: 2000
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsPlaying(false);
      setCurrentSession(null);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Page title={isSpanish ? "Estudio de Meditación" : "Meditation Studio"}>
      <div className="container mx-auto px-6 py-8">
        {/* Henry Contextual Tip */}
        <HenryContextualTip 
          message="Finding it hard to focus? Let me guide you. Meditation is a practice, not perfection. Want recommendations based on your goals?"
          className="mb-6"
        />
        
        <div className="text-center mb-8">
          <Flower2 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isSpanish ? "Estudio de Meditación" : "Meditation Studio"}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isSpanish 
              ? "Tu santuario personal para la meditación, relajación y crecimiento espiritual con sesiones guiadas y programas estructurados."
              : "Your personal sanctuary for meditation, relaxation, and spiritual growth with guided sessions and structured programs."
            }
          </p>
        </div>

        {/* Active Session Player */}
        {currentSession && (
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-purple-800 mb-2">
                    {currentSession.title}
                  </h3>
                  <div className="text-2xl font-mono text-purple-600">
                    {formatTime(timeRemaining)}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button onClick={togglePlayPause} size="lg">
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button 
            variant={activeTab === "sessions" ? "default" : "outline"}
            onClick={() => setActiveTab("sessions")}
          >
            {isSpanish ? "Sesiones" : "Sessions"}
          </Button>
          <Button 
            variant={activeTab === "programs" ? "default" : "outline"}
            onClick={() => setActiveTab("programs")}
          >
            {isSpanish ? "Programas" : "Programs"}
          </Button>
          <Button 
            variant={activeTab === "library" ? "default" : "outline"}
            onClick={() => setActiveTab("library")}
          >
            {isSpanish ? "Mi Biblioteca" : "My Library"}
          </Button>
          <Button 
            variant={activeTab === "stats" ? "default" : "outline"}
            onClick={() => setActiveTab("stats")}
          >
            {isSpanish ? "Estadísticas" : "Statistics"}
          </Button>
        </div>

        {/* Sessions Tab */}
        {activeTab === "sessions" && (
          <div className="space-y-8">
            {/* Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {meditationCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {category.icon}
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{category.sessions} {isSpanish ? "sesiones" : "sessions"}</span>
                      <Button size="sm">
                        {isSpanish ? "Explorar" : "Explore"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Popular Sessions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isSpanish ? "Sesiones Populares" : "Popular Sessions"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularSessions.map((session) => (
                  <Card key={session.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 mb-2">
                            {session.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {session.duration}
                            </span>
                            <span>{session.plays} {isSpanish ? "reproducciones" : "plays"}</span>
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                              {session.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => playSession(session)}
                          className="flex-1"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          {isSpanish ? "Reproducir" : "Play"}
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleDownload(session.title)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Programs Tab */}
        {activeTab === "programs" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isSpanish ? "Programas Guiados" : "Guided Programs"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {guidedPrograms.map((program, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800 mb-2">
                          {program.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{program.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                          <span>{program.sessions} {isSpanish ? "sesiones" : "sessions"}</span>
                          <span>{program.totalTime} {isSpanish ? "tiempo total" : "total time"}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isSpanish ? "Progreso" : "Progress"}</span>
                            <span>{program.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{width: `${program.progress}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        {program.progress > 0 ? (isSpanish ? "Continuar" : "Continue") : (isSpanish ? "Comenzar" : "Start")}
                      </Button>
                      <Button variant="outline" onClick={() => handleDownload(`${program.title} Materials`)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Library Tab */}
        {activeTab === "library" && (
          <div className="text-center py-12">
            <Download className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isSpanish ? "Tu Biblioteca de Meditación" : "Your Meditation Library"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isSpanish 
                ? "Aquí encontrarás todas las sesiones que has descargado para uso sin conexión."
                : "Here you'll find all sessions you've downloaded for offline use."
              }
            </p>
            <Button>
              {isSpanish ? "Explorar Sesiones para Descargar" : "Explore Sessions to Download"}
            </Button>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isSpanish ? "Tus Estadísticas de Meditación" : "Your Meditation Statistics"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">45</div>
                  <p className="text-gray-600">
                    {isSpanish ? "Sesiones completadas" : "Sessions completed"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                  <p className="text-gray-600">
                    {isSpanish ? "Días consecutivos" : "Consecutive days"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">8.5</div>
                  <p className="text-gray-600">
                    {isSpanish ? "Horas meditadas" : "Hours meditated"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
                  <p className="text-gray-600">
                    {isSpanish ? "Calificación promedio" : "Average rating"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};

export default MeditationStudio;
