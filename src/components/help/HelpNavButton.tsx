
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
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <HenryButton userName={undefined} />
      </div>
      <HelpDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default HelpNavButton;
