
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad, HelpCircle } from "lucide-react";
import { gamesData, quizzesData, Game, Quiz } from "@/data/gamesData";
import Header from "@/components/layout/Header";
import GameMemoryMatch from "@/components/games/GameMemoryMatch";
import GameWordUnscramble from "@/components/games/GameWordUnscramble";
import GameReactionTime from "@/components/games/GameReactionTime";
import GamePatternFinder from "@/components/games/GamePatternFinder";
import GameMentalMath from "@/components/games/GameMentalMath";
import GameColorMatch from "@/components/games/GameColorMatch";
import GameMiniSudoku from "@/components/games/GameMiniSudoku";
import GameWordAssociation from "@/components/games/GameWordAssociation";
import GameSequenceRecall from "@/components/games/GameSequenceRecall";
import GameShapeFit from "@/components/games/GameShapeFit";
import { useToast } from "@/hooks/use-toast";

// Import refactored components
import SearchHeader from "@/components/games-and-quizzes/SearchHeader";
import GamesSection from "@/components/games-and-quizzes/GamesSection";
import QuizzesSection from "@/components/games-and-quizzes/QuizzesSection";
import GameInstructionsDialog from "@/components/games-and-quizzes/GameInstructionsDialog";
import GamePlayDialog from "@/components/games-and-quizzes/GamePlayDialog";

const GamesAndQuizzes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [showGameInstructions, setShowGameInstructions] = useState(false);
  const [selectedGameComponent, setSelectedGameComponent] = useState<React.ReactNode | null>(null);

  const filteredGames = gamesData.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter ? game.difficulty === difficultyFilter : true;
    const matchesType = typeFilter ? game.type === typeFilter : true;
    
    return matchesSearch && matchesDifficulty && matchesType;
  });

  const filteredQuizzes = quizzesData.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? quiz.category === categoryFilter : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleStartGame = (game: Game) => {
    setActiveGame(game);
    setShowGameInstructions(true);
  };

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    toast({
      title: "Quiz Starting",
      description: "This functionality is coming soon!",
    });
  };

  const handlePlayGame = () => {
    if (!activeGame) return;
    
    setShowGameInstructions(false);
    
    // Choose the correct game component based on the game ID
    switch (activeGame.id) {
      case "memory-match":
        setSelectedGameComponent(<GameMemoryMatch game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "word-scramble":
        setSelectedGameComponent(<GameWordUnscramble game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "reaction-time":
        setSelectedGameComponent(<GameReactionTime game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "pattern-recognition":
        setSelectedGameComponent(<GamePatternFinder game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "math-challenge":
        setSelectedGameComponent(<GameMentalMath game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "color-match":
        setSelectedGameComponent(<GameColorMatch game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "sudoku-mini":
        setSelectedGameComponent(<GameMiniSudoku game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "word-association":
        setSelectedGameComponent(<GameWordAssociation game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "memory-sequence":
        setSelectedGameComponent(<GameSequenceRecall game={activeGame} onComplete={handleGameComplete} />);
        break;
      case "shape-fit":
        setSelectedGameComponent(<GameShapeFit game={activeGame} onComplete={handleGameComplete} />);
        break;
      default:
        setSelectedGameComponent(null);
    }
  };

  const handleGameComplete = (score: number) => {
    toast({
      title: "Game Complete!",
      description: `You've completed ${activeGame?.title} with a score of ${score}!`,
    });
    setSelectedGameComponent(null);
    setActiveGame(null);
  };

  const handleCloseGame = () => {
    setSelectedGameComponent(null);
    setActiveGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4f8] via-[#e6eef5] to-[#dde8f3]">
      <Header />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <SearchHeader 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
        
        <Tabs defaultValue="games" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad className="h-4 w-4" />
              <span>Therapeutic Games</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>Mental Health Quizzes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="games">
            <GamesSection 
              filteredGames={filteredGames}
              difficultyFilter={difficultyFilter}
              typeFilter={typeFilter}
              setDifficultyFilter={setDifficultyFilter}
              setTypeFilter={setTypeFilter}
              onStartGame={handleStartGame}
            />
          </TabsContent>
          
          <TabsContent value="quizzes">
            <QuizzesSection 
              filteredQuizzes={filteredQuizzes}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              onStartQuiz={handleStartQuiz}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Game Instructions Dialog */}
      <GameInstructionsDialog 
        open={showGameInstructions}
        onOpenChange={setShowGameInstructions}
        activeGame={activeGame}
        onPlayGame={handlePlayGame}
      />
      
      {/* Active Game Dialog */}
      <GamePlayDialog 
        open={!!selectedGameComponent}
        onOpenChange={(open) => !open && handleCloseGame()}
        activeGame={activeGame}
        onClose={handleCloseGame}
        gameComponent={selectedGameComponent}
      />
    </div>
  );
};

export default GamesAndQuizzes;
