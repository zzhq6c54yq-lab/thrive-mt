
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/gamesData";

interface GamePlayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeGame: Game | null;
  onClose: () => void;
  gameComponent: React.ReactNode | null;
}

const GamePlayDialog: React.FC<GamePlayDialogProps> = ({
  open,
  onOpenChange,
  activeGame,
  onClose,
  gameComponent
}) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {activeGame && (
              <>
                <activeGame.icon className="h-5 w-5" style={{ color: activeGame.color }} />
                <span>{activeGame.title}</span>
              </>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <div className="min-h-[300px] flex items-center justify-center">
          {gameComponent}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Exit Game
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GamePlayDialog;
