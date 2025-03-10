
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, ArrowRight, Target, PuzzlePiece, Activity, Dices, FlameKindling, Brain as BrainIcon } from "lucide-react";
import Page from "@/components/Page";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface MemoryCard {
  id: number;
  content: string;
  flipped: boolean;
  matched: boolean;
}

const MentalHealthGames = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  // State for Memory Match game
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [memoryMoves, setMemoryMoves] = useState<number>(0);
  
  // State for Emotion Sorting game
  const [score, setScore] = useState<number>(0);
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<"positive" | "negative" | "neutral" | null>(null);
  
  // State for Focus Training game
  const [focusLevel, setFocusLevel] = useState<number>(1);
  const [focusScore, setFocusScore] = useState<number>(0);
  const [targetPosition, setTargetPosition] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [distractions, setDistractions] = useState<{x: number, y: number, color: string}[]>([]);
  
  const emotionCategories = {
    positive: ["Joy", "Excitement", "Gratitude", "Love", "Relief", "Contentment", "Hope", "Pride"],
    negative: ["Anger", "Frustration", "Sadness", "Fear", "Disgust", "Guilt", "Shame", "Envy"],
    neutral: ["Surprise", "Curiosity", "Anticipation", "Confusion", "Boredom", "Calm", "Interest", "Thought"]
  };
  
  const handleBackClick = () => {
    navigate("/");
  };
  
  // Initialize Memory Match game
  const startMemoryGame = () => {
    setActiveGame("memory");
    const emojis = ["🌟", "🌈", "🌻", "🌞", "🦋", "🐢", "🐬", "🦁"];
    const shuffledCards = [...emojis, ...emojis]
      .map((content, id) => ({ id, content, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    setMemoryCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMemoryMoves(0);
  };
  
  // Memory Match - handle card click
  const handleCardClick = (id: number) => {
    // Don't allow flipping if already flipped or matched
    if (memoryCards[id].flipped || memoryCards[id].matched) return;
    // Don't allow more than 2 cards flipped at a time
    if (flippedCards.length === 2) return;
    
    // Update the flipped status of the clicked card
    const updatedCards = [...memoryCards];
    updatedCards[id].flipped = true;
    setMemoryCards(updatedCards);
    
    // Add card to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // If we have two flipped cards, check for a match
    if (newFlippedCards.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      
      // Check if the contents match
      if (memoryCards[firstId].content === memoryCards[secondId].content) {
        // Mark the cards as matched
        const matchedCards = [...memoryCards];
        matchedCards[firstId].matched = true;
        matchedCards[secondId].matched = true;
        setMemoryCards(matchedCards);
        setMatchedPairs(prev => prev + 1);
        setFlippedCards([]);
        
        // Check if all pairs are matched
        if (matchedPairs + 1 === emojis.length) {
          toast({
            title: "Congratulations!",
            description: `You completed the Memory Match game in ${memoryMoves + 1} moves!`,
          });
        }
      } else {
        // If no match, flip the cards back after a delay
        setTimeout(() => {
          const resetCards = [...memoryCards];
          resetCards[firstId].flipped = false;
          resetCards[secondId].flipped = false;
          setMemoryCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };
  
  // Initialize Emotion Sorting game
  const startEmotionGame = () => {
    setActiveGame("emotions");
    setScore(0);
    nextEmotionQuestion();
  };
  
  // Emotion Sorting - generate next question
  const nextEmotionQuestion = () => {
    const categories = ["positive", "negative", "neutral"] as const;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const emotions = emotionCategories[randomCategory];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    setCurrentEmotion(randomEmotion);
    setCurrentCategory(randomCategory);
  };
  
  // Emotion Sorting - handle answer
  const handleEmotionAnswer = (selectedCategory: "positive" | "negative" | "neutral") => {
    if (selectedCategory === currentCategory) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: `${currentEmotion} is a ${currentCategory} emotion.`,
      });
    } else {
      toast({
        title: "Not quite right",
        description: `${currentEmotion} is actually a ${currentCategory} emotion.`,
        variant: "destructive"
      });
    }
    
    // Move to next question
    nextEmotionQuestion();
  };
  
  // Initialize Focus Training game
  const startFocusGame = () => {
    setActiveGame("focus");
    setFocusLevel(1);
    setFocusScore(0);
    generateTarget();
  };
  
  // Focus Training - generate new target
  const generateTarget = () => {
    const x = Math.floor(Math.random() * 80) + 10; // 10-90%
    const y = Math.floor(Math.random() * 80) + 10; // 10-90%
    setTargetPosition({ x, y });
    
    // Generate distractions based on level
    const newDistractions = [];
    for (let i = 0; i < focusLevel * 3; i++) {
      const distX = Math.floor(Math.random() * 90) + 5;
      const distY = Math.floor(Math.random() * 90) + 5;
      const colors = ["#9b87f5", "#F97316", "#0EA5E9", "#ea384c"];
      const color = colors[Math.floor(Math.random() * colors.length)];
      newDistractions.push({ x: distX, y: distY, color });
    }
    setDistractions(newDistractions);
  };
  
  // Focus Training - handle target click
  const handleTargetClick = () => {
    setFocusScore(prev => prev + focusLevel);
    
    if (focusScore + focusLevel >= focusLevel * 5) {
      // Level up
      setFocusLevel(prev => prev + 1);
      toast({
        title: "Level Up!",
        description: `You've reached level ${focusLevel + 1}. The challenge increases!`,
      });
    }
    
    generateTarget();
  };
  
  // Focus Training - handle distraction click
  const handleDistractionClick = () => {
    setFocusScore(prev => Math.max(0, prev - 1));
    toast({
      title: "Distracted!",
      description: "Try to focus only on the target.",
      variant: "destructive"
    });
  };
  
  const games = [
    {
      title: "Memory Match",
      description: "Improve your memory by matching pairs of cards. This activity enhances working memory and concentration.",
      icon: BrainIcon,
      color: "bg-[#E5DEFF] text-[#9b87f5] border-[#9b87f5]/30",
      startFunction: startMemoryGame,
      benefits: ["Improves working memory", "Enhances concentration", "Reduces stress through focused attention", "Builds cognitive flexibility"]
    },
    {
      title: "Emotion Sorting",
      description: "Sort different emotions into categories to improve emotional intelligence and recognition skills.",
      icon: Brain,
      color: "bg-[#FDE1D3] text-[#F97316] border-[#F97316]/30",
      startFunction: startEmotionGame,
      benefits: ["Builds emotional vocabulary", "Improves emotion recognition", "Enhances self-awareness", "Supports emotional regulation"]
    },
    {
      title: "Focus Training",
      description: "Click on the target while ignoring distractions to improve concentration and attention control.",
      icon: Target,
      color: "bg-[#D3E4FD] text-[#0EA5E9] border-[#0EA5E9]/30",
      startFunction: startFocusGame,
      benefits: ["Enhances selective attention", "Improves response inhibition", "Builds mental endurance", "Reduces distractibility"]
    }
  ];
  
  return (
    <Page title="Mental Health Games" showBackButton={true} onBackClick={handleBackClick}>
      {!activeGame ? (
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Interactive Mental Wellness Games</h2>
            <p className="text-lg text-gray-600">
              Exercise your mind with games designed to boost cognitive skills and emotional intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {games.map((game, index) => (
              <Card 
                key={index}
                className={`hover:shadow-lg transition-all duration-300 cursor-pointer border ${game.color}`}
              >
                <CardHeader>
                  <game.icon className="h-10 w-10 mb-2" />
                  <CardTitle>{game.title}</CardTitle>
                  <CardDescription>{game.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-2">Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {game.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm">{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full bg-white text-gray-800 border hover:bg-gray-50`}
                    onClick={game.startFunction}
                  >
                    Play Now
                    <Play className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="p-6 bg-[#F1F0FB] rounded-lg">
            <h3 className="text-xl font-bold mb-3">Why Mental Health Games Matter</h3>
            <p className="mb-4">
              Mental stimulation through targeted games can help improve cognitive functions and emotional regulation skills. 
              Regular engagement with cognitive exercises has been shown to:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start gap-2">
                <FlameKindling className="h-5 w-5 text-[#B87333] shrink-0 mt-0.5" />
                <span>Reduce symptoms of anxiety and depression</span>
              </li>
              <li className="flex items-start gap-2">
                <Activity className="h-5 w-5 text-[#B87333] shrink-0 mt-0.5" />
                <span>Improve overall mental well-being</span>
              </li>
              <li className="flex items-start gap-2">
                <PuzzlePiece className="h-5 w-5 text-[#B87333] shrink-0 mt-0.5" />
                <span>Enhance problem-solving abilities</span>
              </li>
              <li className="flex items-start gap-2">
                <Dices className="h-5 w-5 text-[#B87333] shrink-0 mt-0.5" />
                <span>Boost brain plasticity and cognitive flexibility</span>
              </li>
            </ul>
          </div>
        </div>
      ) : activeGame === "memory" ? (
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Memory Match</h2>
            <p className="text-gray-600 mb-2">Find all matching pairs of cards</p>
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="font-medium">Moves: {memoryMoves}</span>
              <span className="font-medium">Matches: {matchedPairs}/8</span>
            </div>
            <Button 
              onClick={() => setActiveGame(null)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 mb-4"
            >
              Back to Games
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-10">
            {memoryCards.map((card) => (
              <div 
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square flex items-center justify-center text-4xl rounded-lg cursor-pointer transition-all duration-300 ${
                  card.flipped || card.matched 
                    ? "bg-[#9b87f5]/20 border-2 border-[#9b87f5]/50 rotate-0" 
                    : "bg-[#9b87f5] text-[#9b87f5] rotate-y-180"
                }`}
              >
                {(card.flipped || card.matched) && card.content}
              </div>
            ))}
          </div>
        </div>
      ) : activeGame === "emotions" ? (
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Emotion Sorting</h2>
            <p className="text-gray-600 mb-2">Categorize emotions to build emotional intelligence</p>
            <div className="font-medium mb-4">Score: {score}</div>
            <Button 
              onClick={() => setActiveGame(null)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 mb-4"
            >
              Back to Games
            </Button>
          </div>
          
          {currentEmotion && (
            <div className="mb-10">
              <Card className="text-center p-10 mb-8 border-[#F97316]/30 bg-[#FDE1D3]/50">
                <h3 className="text-4xl font-bold mb-4">{currentEmotion}</h3>
                <p className="text-xl">What type of emotion is this?</p>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => handleEmotionAnswer("positive")}
                  className="p-6 bg-green-100 hover:bg-green-200 text-green-800 border border-green-300"
                >
                  Positive Emotion
                </Button>
                <Button 
                  onClick={() => handleEmotionAnswer("neutral")}
                  className="p-6 bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300"
                >
                  Neutral Emotion
                </Button>
                <Button 
                  onClick={() => handleEmotionAnswer("negative")}
                  className="p-6 bg-red-100 hover:bg-red-200 text-red-800 border border-red-300"
                >
                  Negative Emotion
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : activeGame === "focus" && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Focus Training</h2>
            <p className="text-gray-600 mb-2">Click on the target and ignore distractions</p>
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="font-medium">Level: {focusLevel}</span>
              <span className="font-medium">Score: {focusScore}</span>
            </div>
            <Button 
              onClick={() => setActiveGame(null)}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300 mb-4"
            >
              Back to Games
            </Button>
          </div>
          
          <div 
            className="relative w-full bg-gray-100 rounded-lg mb-10"
            style={{ height: "500px" }}
          >
            {/* Distractions */}
            {distractions.map((distraction, index) => (
              <div
                key={index}
                className="absolute w-8 h-8 rounded-full cursor-pointer transition-all hover:scale-110"
                style={{
                  left: `${distraction.x}%`,
                  top: `${distraction.y}%`,
                  backgroundColor: distraction.color,
                  transform: "translate(-50%, -50%)"
                }}
                onClick={handleDistractionClick}
              />
            ))}
            
            {/* Target */}
            <div
              className="absolute w-12 h-12 bg-[#0EA5E9] rounded-full cursor-pointer animate-pulse transition-all hover:scale-110"
              style={{
                left: `${targetPosition.x}%`,
                top: `${targetPosition.y}%`,
                transform: "translate(-50%, -50%)"
              }}
              onClick={handleTargetClick}
            >
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Page>
  );
};

export default MentalHealthGames;
