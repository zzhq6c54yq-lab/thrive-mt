
import React, { useState } from "react";
import HenryIntroDialog from "../henry/HenryIntroDialog";
import HelpDialog from "../help/HelpDialog";
import SpinningLogo from "./header/SpinningLogo";
import WelcomeText from "./header/WelcomeText";
import MeetHenryButton from "./header/MeetHenryButton";
import ActionButtonGroup from "../navigation/ActionButtonGroup";

interface ThriveHeaderProps {
  userName: string;
  showHenry: boolean;
  onHenryToggle: () => void;
}

const ThriveHeader: React.FC<ThriveHeaderProps> = ({
  userName,
  showHenry,
  onHenryToggle
}) => {
  const [showIntroDialog, setShowIntroDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  
  const handleHenryButtonClick = () => {
    setShowIntroDialog(true);
  };

  const handleIntroContinue = () => {
    setShowIntroDialog(false);
    setShowChatDialog(true);
    if (!showHenry) {
      onHenryToggle();
    }
  };

  // Button handlers for the action buttons
  const handleBarterClick = () => {
    console.log("Barter clicked");
    // Add barter functionality here
  };

  const handlePlanClick = () => {
    console.log("Plan clicked");
    // Add plan functionality here
  };

  const handleCoPayClick = () => {
    console.log("Co-Pay clicked");
    // Add co-pay functionality here
  };
  
  return (
    <div className="w-full relative overflow-hidden py-0 z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-[#181820] via-[#221F26] to-[#181820]"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/25 to-[#B87333]/15 transform -skew-y-3 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute top-10 left-0 right-0 h-28 bg-gradient-to-r from-[#E5C5A1]/10 via-[#B87333]/15 to-[#E5C5A1]/10 transform skew-y-2 animate-pulse" style={{animationDuration: '12s', animationDelay: '0.5s'}}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%220.5%22 fill=%22%23ffffff%22 fill-opacity=%220.3%22/></svg>')]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-[#B87333]/15 via-[#E5C5A1]/20 to-[#B87333]/15 transform -skew-y-2 animate-pulse" style={{animationDuration: '10s'}}></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center pt-8 pb-12 px-4">
          <div className="flex flex-col items-center w-full gap-6">
            <SpinningLogo />
            <WelcomeText userName={userName} />
            <MeetHenryButton onClick={handleHenryButtonClick} />
            
            {/* Enhanced Action Button Group */}
            <div className="w-full max-w-lg mt-4">
              <ActionButtonGroup
                onBarterClick={handleBarterClick}
                onPlanClick={handlePlanClick}
                onCoPayClick={handleCoPayClick}
              />
            </div>
          </div>
        </div>
      </div>
      
      <HenryIntroDialog 
        open={showIntroDialog} 
        onOpenChange={setShowIntroDialog} 
        onContinue={handleIntroContinue}
      />
      
      <HelpDialog 
        isOpen={showChatDialog} 
        onOpenChange={setShowChatDialog} 
      />
    </div>
  );
};

export default ThriveHeader;
