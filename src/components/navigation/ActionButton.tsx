
import React from "react";
import { Button } from "@/components/ui/button";
import { useFeatureActions, ActionButtonConfig } from "@/hooks/useFeatureActions";
import { 
  Play, Download, MessageSquare, Users, 
  Plus, VideoIcon, Book, Heart, Award, Sparkles
} from "lucide-react";

interface ActionButtonProps extends ActionButtonConfig {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "gold" | "gold-outline" | "henry" | "bronze" | "amber" | "amber-outline";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | "h-icon";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  id,
  title,
  path,
  action,
  variant = "default",
  className = "",
  size = "default"
}) => {
  const { handleActionClick } = useFeatureActions();
  
  // Determine icon based on action type
  const getIcon = () => {
    switch (type) {
      case 'workshop':
        return <Play className="h-4 w-4" />;
      case 'assessment':
        return <Book className="h-4 w-4" />;
      case 'download':
        return <Download className="h-4 w-4" />;
      case 'practice':
        return <Heart className="h-4 w-4" />;
      case 'discussion':
        return <MessageSquare className="h-4 w-4" />;
      case 'hangout':
        return <Users className="h-4 w-4" />;
      case 'join':
        return <Plus className="h-4 w-4" />;
      case 'record':
        return <VideoIcon className="h-4 w-4" />;
      case 'redeem':
        return <Award className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };
  
  const handleClick = () => {
    handleActionClick({ type, id, title, path, action });
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      className={`flex items-center gap-2 ${className}`}
      onClick={handleClick}
    >
      {title}
      {getIcon()}
    </Button>
  );
};

export default ActionButton;
