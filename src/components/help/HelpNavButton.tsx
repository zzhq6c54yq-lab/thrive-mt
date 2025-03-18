
import React from "react";
import { useLocation } from "react-router-dom";
import HenryButton from "../henry/HenryButton";

const HelpNavButton: React.FC = () => {
  const location = useLocation();
  
  // Determine whether to show Henry based on the current route
  // For example, don't show on the index page where it's already included
  const shouldShowHenry = location.pathname !== "/";
  
  if (!shouldShowHenry) {
    return null;
  }
  
  return <HenryButton />;
};

export default HelpNavButton;
