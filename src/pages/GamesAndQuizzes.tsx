
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Puzzle, Gamepad2, Brain, Sparkles, ArrowLeft, 
  Trophy, Timer, BarChart4, Heart, Star, ThumbsUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HomeButton from "@/components/HomeButton";
import WelcomeHeader from "@/components/games-and-quizzes/WelcomeHeader";
import { Game, gamesData } from "@/data/gamesData";
import GamesSection from "@/components/games-and-quizzes/GamesSection";
import QuizzesSection from "@/components/games-and-quizzes/QuizzesSection";
import GameInstructionsDialog from "@/components/games-and-quizzes/GameInstructionsDialog";
import GamePlayDialog from "@/components/games-and-quizzes/GamePlayDialog";
import GameComponentSelector from "@/components/games-and-quizzes/GameComponentSelector";

interface Quiz {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  questionsCount: number;
  timeToComplete: string;
  benefits: string[];
  popular: boolean;
}

const GamesAndQuizzes = () => {
  const [activeTab, setActiveTab] = useState("games");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [gameInstructionsOpen, setGameInstructionsOpen] = useState(false);
  const [gamePlayOpen, setGamePlayOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let filtered = [...gamesData];
    
    if (difficultyFilter !== "all") {
      filtered = filtered.filter(game => game.difficulty === difficultyFilter);
    }
    
    if (typeFilter !== "all") {
      filtered = filtered.filter(game => game.type === typeFilter);
    }
    
    setFilteredGames(filtered);
  }, [difficultyFilter, typeFilter]);

  useEffect(() => {
    const quizzesData: Quiz[] = [
      {
        id: "anxiety-assessment",
        title: "Anxiety Assessment",
        description: "Understand your anxiety levels and get personalized coping strategies based on your results.",
        image: "https://images.unsplash.com/photo-1517837314158-c0af6f92b2d3?auto=format&fit=crop&w=500&q=80",
        category: "mental-health",
        questionsCount: 12,
        timeToComplete: "5-7 min",
        benefits: ["Personalized insights", "Evidence-based assessment", "Practical coping strategies"],
        popular: true
      },
      {
        id: "stress-check",
        title: "Stress Check",
        description: "Quickly assess your current stress levels and identify your main stressors.",
        image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=500&q=80",
        category: "wellbeing",
        questionsCount: 8,
        timeToComplete: "3-5 min",
        benefits: ["Fast assessment", "Stress trigger identification", "Simple relief techniques"],
        popular: true
      },
      {
        id: "sleep-quality",
        title: "Sleep Quality Index",
        description: "Assess your sleep patterns and get recommendations for improving your sleep hygiene.",
        image: "https://images.unsplash.com/photo-1585645568795-f2d004bff7e8?auto=format&fit=crop&w=500&q=80",
        category: "wellbeing",
        questionsCount: 10,
        timeToComplete: "4-6 min",
        benefits: ["Sleep quality score", "Personalized recommendations", "Sleep tracking insights"],
        popular: false
      },
      {
        id: "resilience-builder",
        title: "Resilience Builder",
        description: "Discover your emotional resilience level and learn how to strengthen it through targeted exercises.",
        image: "https://images.unsplash.com/photo-1584477720014-2ea42a32b969?auto=format&fit=crop&w=500&q=80",
        category: "coping-strategies",
        questionsCount: 15,
        timeToComplete: "7-10 min",
        benefits: ["Resilience score", "Personalized resilience plan", "Regular progress tracking"],
        popular: false
      },
      {
        id: "emotional-intelligence",
        title: "Emotional Intelligence Quiz",
        description: "Evaluate your ability to recognize, understand and manage emotions in yourself and others.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80",
        category: "self-awareness",
        questionsCount: 20,
        timeToComplete: "10-12 min",
        benefits: ["Comprehensive EQ assessment", "Identify strengths & growth areas", "Personalized development plan"],
        popular: true
      },
      {
        id: "relationship-patterns",
        title: "Relationship Patterns",
        description: "Explore your attachment style and relationship patterns to improve connections with others.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=500&q=80",
        category: "relationships",
        questionsCount: 18,
        timeToComplete: "8-10 min",
        benefits: ["Attachment style identification", "Relationship pattern insights", "Communication improvement tips"],
        popular: false
      }
    ];
    
    setQuizzes(quizzesData);
    setFilteredGames(gamesData);
  }, []);

  const handleStartGame = (game: Game) => {
    setActiveGame(game);
    setGameInstructionsOpen(true);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    toast({
      title: `Starting ${quiz.title}`,
      description: "Preparing your assessment...",
      duration: 1500,
    });
    
    // Navigate to a placeholder page for now
    setTimeout(() => {
      navigate("/mental-wellness-tools", { 
        state: { activeTab: "assessments", quizId: quiz.id } 
      });
    }, 500);
  };
  
  const handlePlayGame = () => {
    setGameInstructionsOpen(false);
    setGamePlayOpen(true);
  };
  
  const handleGameComplete = (score: number) => {
    setGamePlayOpen(false);
    
    if (activeGame) {
      toast({
        title: "Game Completed!",
        description: `You scored ${score} points in ${activeGame.title}`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBmaWxsPSIjOWI4N2Y1IiBmaWxsLW9wYWNpdHk9IjAuMDMiIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIvPjwvc3ZnPg==')] bg-[length:400px_400px]"></div>
        <motion.div 
          className="absolute top-10 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-300/10 to-transparent"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-300/10 to-transparent"
          animate={{ 
            y: [0, -40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        ></motion.div>
        <motion.div 
          className="absolute top-[30%] left-[20%] w-60 h-60 rounded-full bg-gradient-to-r from-pink-300/5 to-transparent"
          animate={{ 
            x: [0, 40, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 22,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>
      </div>

      {/* Header section */}
      <div className="relative z-10 bg-gradient-to-r from-[#1a1a1f] to-[#272730] text-white py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDMwIDMwIj48Y2lyY2xlIGN4PSIzIiBjeT0iMyIgcj0iMSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1Ii8+PC9zdmc+')] opacity-30"></div>
          <motion.div 
            className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-[#9b87f5]/20 to-transparent blur-3xl"
            animate={{ 
              rotate: [0, 180],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          ></motion.div>
          <motion.div 
            className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#D946EF]/20 to-transparent blur-3xl"
            animate={{ 
              rotate: [0, -180],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", delay: 2 }}
          ></motion.div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start justify-between mb-6">
            <Button 
              variant="link" 
              className="text-white hover:text-[#9b87f5] transition-colors p-0 flex items-center"
              onClick={() => navigate("/home")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <HomeButton />
          </div>
          
          <WelcomeHeader />
        </div>
      </div>

      {/* Content section with interactive elements */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue="games" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <TabsList className="h-12 p-1 bg-white/80 backdrop-blur shadow-md border border-purple-100">
                <TabsTrigger 
                  value="games" 
                  className="flex items-center gap-2 px-6 data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white transition-all duration-300"
                >
                  <Gamepad2 className="h-5 w-5" />
                  Games
                </TabsTrigger>
                <TabsTrigger 
                  value="quizzes" 
                  className="flex items-center gap-2 px-6 data-[state=active]:bg-[#D946EF] data-[state=active]:text-white transition-all duration-300"
                >
                  <Brain className="h-5 w-5" />
                  Quizzes
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <motion.div 
                  className="p-2 rounded-full bg-white shadow-sm border border-purple-100 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trophy className="h-5 w-5 text-amber-500" />
                </motion.div>
                <motion.div 
                  className="p-2 rounded-full bg-white shadow-sm border border-purple-100 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Timer className="h-5 w-5 text-blue-500" />
                </motion.div>
                <motion.div 
                  className="p-2 rounded-full bg-white shadow-sm border border-purple-100 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BarChart4 className="h-5 w-5 text-purple-500" />
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="games" className="mt-0">
                <GamesSection 
                  filteredGames={filteredGames}
                  difficultyFilter={difficultyFilter}
                  typeFilter={typeFilter}
                  setDifficultyFilter={setDifficultyFilter}
                  setTypeFilter={setTypeFilter}
                  onStartGame={handleStartGame}
                />
              </TabsContent>
              
              <TabsContent value="quizzes" className="mt-0">
                <QuizzesSection 
                  quizzes={quizzes} 
                  onStartQuiz={handleStartQuiz}
                />
              </TabsContent>
            </motion.div>
          </Tabs>
        </motion.div>
        
        {/* Interactive floating elements */}
        <div className="hidden lg:block">
          <motion.div 
            className="fixed bottom-20 right-10 p-3 rounded-full bg-white shadow-lg border border-purple-200 text-purple-600 cursor-pointer z-20"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            onClick={() => toast({
              title: "Wellness Tip!",
              description: "Taking short breaks between games improves cognitive function.",
              duration: 3000,
            })}
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>
          
          <motion.div
            className="fixed bottom-40 right-20 p-3 rounded-full bg-white shadow-lg border border-pink-200 text-pink-600 cursor-pointer z-20"
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            onClick={() => toast({
              title: "Mental Health Fact",
              description: "Playing cognitive games for just 15 minutes daily can improve memory.",
              duration: 3000,
            })}
          >
            <Heart className="h-6 w-6" />
          </motion.div>
        </div>
      </div>
      
      {/* Game Instructions Dialog */}
      <GameInstructionsDialog
        open={gameInstructionsOpen}
        onOpenChange={setGameInstructionsOpen}
        activeGame={activeGame}
        onPlayGame={handlePlayGame}
      />
      
      {/* Game Play Dialog */}
      <GamePlayDialog
        open={gamePlayOpen}
        onOpenChange={setGamePlayOpen}
        activeGame={activeGame}
        onClose={() => setGamePlayOpen(false)}
        gameComponent={
          activeGame ? (
            <GameComponentSelector 
              activeGame={activeGame} 
              onComplete={handleGameComplete} 
            />
          ) : null
        }
      />
    </div>
  );
};

export default GamesAndQuizzes;
