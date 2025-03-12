
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollInterval, setScrollIntervalId] = useState<number | null>(null);
  const navigate = useNavigate();
  
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
  
  const handleHomeClick = () => {
    navigate("/", { state: { screenState: 'main' } });
  };
  
  useEffect(() => {
    return () => {
      if (scrollInterval) {
        window.clearInterval(scrollInterval);
      }
    };
  }, [scrollInterval]);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-center gap-2 z-50">
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
        onClick={handleHomeClick}
        className="h-14 w-14 rounded-full bg-gradient-to-br from-[#B87333] to-[#E5C5A1] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        size="icon"
      >
        <Home className="h-6 w-6" />
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
  );
};

export default FloatingButton;
