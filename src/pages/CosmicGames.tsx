
import React, { useState } from "react";
import Page from "@/components/Page";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Gamepad2, Sparkles, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gamesData, Game } from "@/data/gamesData";
import GameCard from "@/components/games-and-quizzes/GameCard";
import { useToast } from "@/hooks/use-toast";

const CosmicGames = () => {
  const [featuredGames] = useState<Game[]>(
    gamesData.filter(game => 
      game.id === "memory-match" || game.id === "reaction-time" || game.id === "color-match"
    )
  );
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStartGame = (game: Game) => {
    toast({
      title: `Starting ${game.title}`,
      description: "Loading your game experience...",
      duration: 1500,
    });
    
    navigate(`/games/${game.id}`);
  };
  
  const handleViewAllGames = () => {
    navigate("/games-and-quizzes");
  };

  // Game images mapping
  const gameImages = {
    "memory-match": "https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "reaction-time": "https://images.unsplash.com/photo-1611264199213-ebe0e4a1cdba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    "color-match": "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  };

  return (
    <Page title="Cosmic Games" showBackButton={true}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-full mb-4">
              <Gamepad2 className="w-8 h-8 text-purple-500" />
            </div>
            <h1 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
              Cosmic Games Hub
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Engage your mind with fun, scientifically designed games that boost cognitive function and mental wellness while you play.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={handleViewAllGames}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Gamepad2 className="mr-2 h-4 w-4" />
                Explore All Games
              </Button>
              <Button 
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                <Star className="mr-2 h-4 w-4" />
                View Your Progress
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="mb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-amber-500" />
              Featured Games
            </h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleViewAllGames} 
              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
            >
              View all
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredGames.map(game => {
              const imageSrc = gameImages[game.id as keyof typeof gameImages] || "";
              return (
                <GameCard
                  key={game.id}
                  game={game}
                  onStart={handleStartGame}
                  imageSrc={imageSrc}
                />
              );
            })}
          </div>
        </div>
        
        <motion.div 
          className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold mb-3 text-purple-800">Why Play Cognitive Games?</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Brain className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Improve cognitive functions and neuroplasticity</span>
                </li>
                <li className="flex items-start">
                  <Brain className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Reduce stress and promote mental relaxation</span>
                </li>
                <li className="flex items-start">
                  <Brain className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Track improvements in memory, focus, and reaction time</span>
                </li>
                <li className="flex items-start">
                  <Brain className="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Enjoy engaging activities designed by mental health professionals</span>
                </li>
              </ul>
              <Button 
                onClick={handleViewAllGames}
                className="mt-4 bg-purple-600 hover:bg-purple-700"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Start Playing Now
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80" 
                alt="Person playing cognitive games" 
                className="rounded-lg shadow-md w-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default CosmicGames;
