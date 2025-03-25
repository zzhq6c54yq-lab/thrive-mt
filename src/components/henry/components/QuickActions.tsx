
import React from "react";
// Removed Button import since we're removing the quick action buttons

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction }) => {
  // Component is kept for compatibility, but no longer displays buttons
  return null;
};

export default QuickActions;
