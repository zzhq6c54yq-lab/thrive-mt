
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HenryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const HenryDialog: React.FC<HenryDialogProps> = ({ isOpen, onOpenChange }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md sm:w-[400px] bg-black/85 backdrop-blur-md border border-[#B87333]/50 p-4">
        <div className="absolute right-2 top-2 z-10">
          <Button 
            className="h-8 w-8 rounded-full bg-[#403E43] hover:bg-[#8E9196] text-white transition-colors flex items-center justify-center"
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <DialogHeader className="text-center relative mb-4">
          <div className="flex justify-center mb-2">
            <div className="h-14 w-14 rounded-full flex items-center justify-center border-2 border-[#B87333]/50 bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white">
              <span className="text-2xl font-bold">H</span>
            </div>
          </div>
          <DialogTitle className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1]">Meet Henry</DialogTitle>
          <DialogDescription className="text-white/70 text-sm">
            Your personal mental health guide
          </DialogDescription>
        </DialogHeader>
        
        <div className="text-white space-y-4 mb-4">
          <p>
            Hi there! I'm Henry, your personal navigator through the Thrive MT platform.
          </p>
          <p>
            My name stands for:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="text-[#B87333]">H</span>opeful Horizons: Embrace a future filled with possibilities and the belief that change is achievable.</li>
            <li><span className="text-[#B87333]">E</span>mpowerment through Education: Equip individuals with knowledge about mental health, fostering autonomy and informed choices.</li>
            <li><span className="text-[#B87333]">N</span>urtured Connections: Prioritize the importance of supportive relationships that provide encouragement and understanding.</li>
            <li><span className="text-[#B87333]">R</span>esilience and Recovery: Focus on building strength to overcome adversity and promote paths to healing.</li>
            <li><span className="text-[#B87333]">Y</span>our Journey Matters: Acknowledge that each person's experience is unique and valuable, deserving of respect and attention.</li>
          </ul>
          <p>
            Look for me (the floating H button) throughout your journey on Thrive MT. I'm always here to assist!
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full bg-[#B87333] hover:bg-[#B87333]/90"
          >
            Got it, thanks Henry!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HenryDialog;
