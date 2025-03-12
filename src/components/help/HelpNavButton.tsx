
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HelpDialog from "./HelpDialog";

const HelpNavButton: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollInterval, setScrollIntervalId] = useState<number | null>(null);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const { toast } = useToast();

  const startScrolling = (direction: 'up' | 'down') => {
    setIsScrolling(true);
    setScrollDirection(direction);
    
    if (scrollInterval) {
      window.clearInterval(scrollInterval);
    }
    
    const intervalId = window.setInterval(() => {
      if (direction === 'up') {
        window.scrollBy(0, -40);
      } else {
        window.scrollBy(0, 40);
      }
    }, 50);
    
    setScrollIntervalId(intervalId);
  };
  
  const stopScrolling = () => {
    if (scrollInterval) {
      window.clearInterval(scrollInterval);
      setScrollIntervalId(null);
    }
    setIsScrolling(false);
    setScrollDirection(null);
  };

  const handleClick = () => {
    setShowHelpDialog(true);
    toast({
      title: "Help Assistant",
      description: "How can I assist you today?",
      duration: 3000,
    });
  };

  React.useEffect(() => {
    return () => {
      if (scrollInterval) {
        window.clearInterval(scrollInterval);
      }
    };
  }, [scrollInterval]);

  return (
    <>
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-2 z-50">
        <Button
          onClick={() => startScrolling('up')}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className={`h-10 w-10 rounded-full ${
            scrollDirection === 'up' 
              ? 'bg-[#A56625]' 
              : 'bg-gradient-to-br from-[#B87333] to-[#E5C5A1]'
          } text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
          size="icon"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
        
        <Button
          onClick={handleClick}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          size="icon"
        >
          <HelpCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
        </Button>
        
        <Button
          onClick={() => startScrolling('down')}
          onMouseUp={stopScrolling}
          onMouseLeave={stopScrolling}
          className={`h-10 w-10 rounded-full ${
            scrollDirection === 'down' 
              ? 'bg-[#A56625]' 
              : 'bg-gradient-to-br from-[#B87333] to-[#E5C5A1]'
          } text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
          size="icon"
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
      </div>
      
      <HelpDialog 
        isOpen={showHelpDialog} 
        onOpenChange={setShowHelpDialog}
      />
    </>
  );
};

export default HelpNavButton;
