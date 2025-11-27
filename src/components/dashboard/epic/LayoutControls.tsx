import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Layout, 
  Lock, 
  Unlock, 
  RotateCcw, 
  Sparkles
} from 'lucide-react';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';
import { toast } from 'sonner';

export default function LayoutControls() {
  const {
    isLocked,
    learningEnabled,
    isCustomLayout,
    toggleLock,
    toggleLearning,
    resetToDefault
  } = useDashboardLayout();
  
  const [isOpen, setIsOpen] = useState(false);
  
  const handleToggleLock = () => {
    toggleLock();
    toast.success(isLocked ? 'Layout unlocked - drag sections to reorder' : 'Layout locked');
  };
  
  const handleToggleLearning = () => {
    toggleLearning();
    toast.success(
      learningEnabled 
        ? 'AI learning disabled' 
        : 'AI learning enabled - layout will adapt to your usage'
    );
  };
  
  const handleReset = () => {
    resetToDefault();
    toast.success('Dashboard reset to default layout');
  };
  
  return (
    <div className="fixed bottom-60 right-6 z-30">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            size="default"
            variant="outline"
            className="rounded-full shadow-xl bg-gray-900/90 border-[#D4AF37]/30 text-white hover:bg-gray-800 hover:border-[#D4AF37]/60 transition-all"
          >
            <Layout className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-64">
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2">
              {isCustomLayout 
                ? 'You\'ve customized your layout' 
                : 'Using default layout'}
            </p>
          </div>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleToggleLock}>
            {isLocked ? (
              <>
                <Unlock className="w-4 h-4 mr-2" />
                Unlock Layout
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Lock Layout
              </>
            )}
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={handleToggleLearning}>
            <Sparkles className="w-4 h-4 mr-2" />
            {learningEnabled ? 'Disable' : 'Enable'} AI Learning
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <div className="p-2">
            <p className="text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3 inline mr-1" />
              {learningEnabled 
                ? 'AI is learning your preferences' 
                : 'AI learning is paused'}
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
