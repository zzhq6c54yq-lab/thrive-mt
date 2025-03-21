
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Game } from "@/data/gamesData";
import { getDifficultyColor } from "./GameCard";

interface GameInstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeGame: Game | null;
  onPlayGame: () => void;
}

const GameInstructionsDialog: React.FC<GameInstructionsDialogProps> = ({
  open,
  onOpenChange,
  activeGame,
  onPlayGame
}) => {
  if (!activeGame) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {activeGame && (
              <>
                <activeGame.icon className="h-5 w-5" style={{ color: activeGame.color }} />
                <span>{activeGame.title}</span>
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {activeGame?.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">How to Play</h3>
            <p className="text-sm text-gray-600">{activeGame?.instructions}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-xs text-gray-500 mb-1">Difficulty</h4>
              <p className={`text-sm font-medium ${getDifficultyColor(activeGame.difficulty)}`}>
                {activeGame?.difficulty.charAt(0).toUpperCase()}{activeGame?.difficulty.slice(1)}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="text-xs text-gray-500 mb-1">Estimated Time</h4>
              <p className="text-sm font-medium text-gray-700">{activeGame?.timeToComplete}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Benefits</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {activeGame?.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-1 mt-0.5 text-green-500 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={onPlayGame}
            style={{ 
              backgroundColor: activeGame?.color,
              color: "#fff"
            }}
          >
            Play Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameInstructionsDialog;
