
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Page: React.FC<PageProps> = ({ title, children, showBackButton = true, onBackClick }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // Navigate to home with main screenState to avoid showing intro screens
      navigate("/", { state: { screenState: 'main' } });
    }
  };
  
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {showBackButton && (
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        )}
        
        <h1 className="text-3xl md:text-4xl font-medium mb-6">{title}</h1>
        
        {children || (
          <div className="p-8 border rounded-lg bg-gray-50 text-center">
            <p className="text-lg text-gray-600">Coming soon! This feature is under development.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
