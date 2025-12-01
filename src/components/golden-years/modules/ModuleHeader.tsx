import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ModuleHeaderProps {
  title: string;
  icon: LucideIcon;
  progress: number;
  completedCount: number;
  totalCount: number;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  title,
  icon: Icon,
  progress,
  completedCount,
  totalCount,
}) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <Button
        variant="ghost"
        onClick={() => navigate("/app/golden-years-portal")}
        className="mb-4 text-[#D4AF37] hover:text-[#F5DEB3] hover:bg-[#D4AF37]/10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Golden Years Portal
      </Button>
      
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-8 w-8 text-[#D4AF37]" />
        <h1 className="text-3xl font-semibold text-[#F5DEB3]">{title}</h1>
      </div>
      
      <div className="space-y-2">
        <Progress value={progress} className="h-3" />
        <p className="text-sm text-[#F5DEB3]/70">
          {completedCount} of {totalCount} lessons completed ({Math.round(progress)}%)
        </p>
      </div>
    </div>
  );
};

export default ModuleHeader;
