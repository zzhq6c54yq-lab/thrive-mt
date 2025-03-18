
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HenryButton from "../henry/HenryButton";
import HelpDialog from "./HelpDialog";

const HelpNavButton: React.FC = () => {
  const location = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Determine whether to show Henry based on the current route
  // For example, don't show on the index page where it's already included
  const shouldShowHenry = location.pathname !== "/";
  
  if (!shouldShowHenry) {
    return null;
  }
  
  return (
    <>
      <div 
        onClick={() => setIsDialogOpen(true)}
        className="cursor-pointer"
      >
        <HenryButton userName={undefined} />
      </div>
      <HelpDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default HelpNavButton;
