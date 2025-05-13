
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "@/components/Page";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import useTranslation from "@/hooks/useTranslation";
import { Star, Heart, BookOpen, Image, Music, PenTool, Leaf, ArrowRight, Video, Calendar, Gift } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  type: 'physical' | 'digital' | 'charitable' | 'audio' | 'story' | 'ritual';
  image: string;
  difficulty: 'easy' | 'medium' | 'involved';
  timeNeeded: string;
}

const legacyProjects: Project[] = [
  {
    id: "lp1",
    title: "Memory Quilt",
    description: "Create a quilt using clothing or fabric that belonged to your loved one. Each patch can represent a memory, achievement, or aspect of their personality.",
    type: "physical",
    image: "https://images.unsplash.com/photo-1594654501763-a5e2cc98916c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "involved",
    timeNeeded: "4-8 weeks"
  },
  {
    id: "lp2",
    title: "Digital Memory Book",
    description: "Collect photos, stories, and messages from friends and family to create an online memory book that can be shared with everyone who knew your loved one.",
    type: "digital",
    image: "https://images.unsplash.com/photo-1532377416656-e35d0e511c8e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "easy",
    timeNeeded: "1-3 weeks"
  },
  {
    id: "lp3",
    title: "Memorial Scholarship or Fund",
    description: "Establish a scholarship or fund in your loved one's name to support causes they cared about, whether it's cancer research, education, or community projects.",
    type: "charitable",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "involved",
    timeNeeded: "1-3 months"
  },
  {
    id: "lp4",
    title: "Audio Memory Collection",
    description: "Record stories and memories from friends and family about your loved one to create an audio legacy that preserves their impact and the sound of their loved ones' voices.",
    type: "audio",
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "medium",
    timeNeeded: "2-4 weeks"
  },
  {
    id: "lp5",
    title: "Life Story Book",
    description: "Create a biographical book documenting your loved one's life, including their childhood, achievements, values, and the legacy they left behind.",
    type: "story",
    image: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "medium",
    timeNeeded: "1-2 months"
  },
  {
    id: "lp6",
    title: "Memorial Garden",
    description: "Plant a garden or a single tree in memory of your loved one, creating a living tribute that can provide a peaceful place for reflection.",
    type: "physical",
    image: "https://images.unsplash.com/photo-1458014854819-1a40aa70211c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "medium",
    timeNeeded: "1 day - ongoing"
  },
  {
    id: "lp7",
    title: "Annual Remembrance Ritual",
    description: "Establish a meaningful annual ritual on your loved one's birthday or another significant date to honor their memory with family and friends.",
    type: "ritual",
    image: "https://images.unsplash.com/photo-1530482817083-29ae4b92ff15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "easy",
    timeNeeded: "1 day per year"
  },
  {
    id: "lp8",
    title: "Video Documentary",
    description: "Create a video documentary about your loved one's life by compiling photos, video clips, and interviews with family and friends.",
    type: "digital",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    difficulty: "medium",
    timeNeeded: "3-6 weeks"
  }
];

const LegacyProjects: React.FC = () => {
  const { isSpanish } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  // Filter projects based on active tab and difficulty
  const filteredProjects = legacyProjects.filter(project => {
    const matchesType = activeTab === "all" || project.type === activeTab;
    const matchesDifficulty = !selectedDifficulty || project.difficulty === selectedDifficulty;
    return matchesType && matchesDifficulty;
  });
  
  const handleProjectClick = (project: Project) => {
    // In a real app, this would navigate to a detail page
    toast({
      title: isSpanish ? "Proyecto seleccionado" : "Project Selected",
      description: isSpanish ? `Abriendo: ${project.title}` : `Opening: ${project.title}`,
      duration: 2000,
    });
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case 'medium': return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
      case 'involved': return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };
  
  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'physical': return <Leaf className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
      case 'digital': return <Image className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />;
      case 'charitable': return <Gift className="h-5 w-5 text-pink-600 dark:text-pink-400" />;
      case 'audio': return <Music className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case 'story': return <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'ritual': return <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      default: return <Star className="h-5 w-5" />;
    }
  };
  
  return (
    <Page title={isSpanish ? "Proyectos de Legado" : "Legacy Projects"} returnToMain>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center">
            <Star className="h-7 w-7 mr-2" />
            {isSpanish ? "Proyectos de Legado" : "Legacy Projects"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {isSpanish 
              ? "Ideas para crear legados significativos para honrar a los seres queridos" 
              : "Ideas for creating meaningful legacies to honor loved ones"}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
          <p className="text-indigo-700 dark:text-indigo-400 italic">
            {isSpanish 
              ? "Crear un proyecto de legado puede ser una forma significativa de procesar el dolor y mantener viva la memoria de tu ser querido, mientras también se comparte su impacto con generaciones futuras."
              : "Creating a legacy project can be a meaningful way to process grief and keep your loved one's memory alive, while also sharing their impact with future generations."}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">{isSpanish ? "Filtros" : "Filters"}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {isSpanish ? "Nivel de Dificultad" : "Difficulty Level"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant="outline" 
                      className={`cursor-pointer ${selectedDifficulty === 'easy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800' 
                        : ''}`}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === 'easy' ? null : 'easy')}
                    >
                      {isSpanish ? "Fácil" : "Easy"}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`cursor-pointer ${selectedDifficulty === 'medium' 
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800' 
                        : ''}`}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === 'medium' ? null : 'medium')}
                    >
                      {isSpanish ? "Medio" : "Medium"}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`cursor-pointer ${selectedDifficulty === 'involved' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800' 
                        : ''}`}
                      onClick={() => setSelectedDifficulty(selectedDifficulty === 'involved' ? null : 'involved')}
                    >
                      {isSpanish ? "Elaborado" : "Involved"}
                    </Badge>
                  </div>
                </div>
                
                {selectedDifficulty && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500"
                    onClick={() => setSelectedDifficulty(null)}
                  >
                    {isSpanish ? "Limpiar filtros" : "Clear filters"}
                  </Button>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <div className="rounded-lg bg-indigo-50 dark:bg-indigo-950/50 p-4 border border-indigo-100 dark:border-indigo-900/30">
                <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">
                  {isSpanish ? "¿Necesitas ayuda?" : "Need Help?"}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {isSpanish 
                    ? "Nuestros especialistas en duelo pueden guiarte en la creación de un proyecto significativo."
                    : "Our grief specialists can guide you in creating a meaningful project."}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => navigate("/cancer-support/legacy-consultation")}
                >
                  {isSpanish ? "Agendar Consulta" : "Schedule Consultation"}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">{isSpanish ? "Todos" : "All"}</TabsTrigger>
                <TabsTrigger value="physical">{isSpanish ? "Físicos" : "Physical"}</TabsTrigger>
                <TabsTrigger value="digital">{isSpanish ? "Digitales" : "Digital"}</TabsTrigger>
                <TabsTrigger value="charitable">{isSpanish ? "Caritativos" : "Charitable"}</TabsTrigger>
                <TabsTrigger value="audio">{isSpanish ? "Audio" : "Audio"}</TabsTrigger>
                <TabsTrigger value="story">{isSpanish ? "Narrativos" : "Storytelling"}</TabsTrigger>
                <TabsTrigger value="ritual">{isSpanish ? "Rituales" : "Rituals"}</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project) => (
                    <Card 
                      key={project.id} 
                      className="overflow-hidden hover:shadow-md transition-shadow border-indigo-100 dark:border-indigo-900/30"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <AspectRatio ratio={16/9}>
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="object-cover w-full h-full"
                          />
                        </AspectRatio>
                        <div className="absolute top-3 right-3 z-10">
                          <Badge className={getDifficultyColor(project.difficulty)}>
                            {project.difficulty === 'easy' 
                              ? (isSpanish ? "Fácil" : "Easy")
                              : project.difficulty === 'medium' 
                                ? (isSpanish ? "Medio" : "Medium")
                                : (isSpanish ? "Elaborado" : "Involved")
                            }
                          </Badge>
                        </div>
                      </div>
                      
                      <CardHeader className="pb-2">
                        <div className="flex items-start">
                          <div className="mr-3">
                            {getProjectIcon(project.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                              <Calendar className="inline h-3 w-3 mr-1" />
                              {isSpanish ? "Tiempo estimado: " : "Time needed: "}
                              {project.timeNeeded}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="py-2">
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {project.description}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="pt-0">
                        <Button
                          variant="outline"
                          className="w-full border-indigo-200 hover:border-indigo-300 dark:border-indigo-800 dark:hover:border-indigo-700 text-indigo-700 dark:text-indigo-300"
                          onClick={() => handleProjectClick(project)}
                        >
                          {isSpanish ? "Ver Detalles" : "View Details"}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {filteredProjects.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                    <Star className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-700" />
                    <h3 className="mt-4 text-lg font-medium">
                      {isSpanish ? "No se encontraron proyectos" : "No projects found"}
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      {isSpanish 
                        ? "Intenta ajustar tus filtros para ver más proyectos"
                        : "Try adjusting your filters to see more projects"}
                    </p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setActiveTab("all");
                        setSelectedDifficulty(null);
                      }}
                    >
                      {isSpanish ? "Restablecer filtros" : "Reset filters"}
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800/30">
          <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">
            {isSpanish ? "Compartir Tu Legado" : "Share Your Legacy"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {isSpanish 
              ? "¿Has creado un proyecto de legado para honrar a un ser querido? Comparte tu experiencia con nuestra comunidad para inspirar a otros."
              : "Have you created a legacy project to honor a loved one? Share your experience with our community to inspire others."}
          </p>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => navigate("/cancer-support/share-legacy")}
          >
            {isSpanish ? "Compartir Mi Proyecto" : "Share My Project"}
            <Heart className="h-4 w-4 ml-2" />
          </Button>
        </section>
      </div>
    </Page>
  );
};

export default LegacyProjects;
