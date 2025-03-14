
import React from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";

interface PageProps {
  title: string;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  subtitle?: string;
}

const Page: React.FC<PageProps> = ({ 
  title, 
  children, 
  showBackButton = true, 
  onBackClick,
  subtitle
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // Always navigate to main screen with the 'main' screenState to avoid intro screens
      navigate("/", { state: { screenState: 'main' } });
    }
  };

  const handleMainMenu = () => {
    navigate("/", { state: { screenState: 'main' } });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121420] via-[#1c2030] to-[#121420] text-white py-6 px-4 relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%220.5%22 fill=%22%23B87333%22 fill-opacity=%220.03%22/></svg>')] opacity-30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-br from-[#0A1929]/20 via-[#0A1929]/10 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-gradient-to-tr from-[#B87333]/5 to-transparent rounded-full blur-3xl -z-10 opacity-50"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/10 transition-all duration-300 rounded-full p-2 h-auto w-auto"
                onClick={handleBack}
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            )}
            
            <div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#e5c5a1] drop-shadow-sm">{title}</span>
              </h1>
              {subtitle && (
                <p className="text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMainMenu}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Button>
            <HomeButton className="bg-white/5 hover:bg-white/15" />
          </div>
        </header>
        
        {/* Main Content */}
        <main className="bg-black/20 backdrop-blur-sm rounded-xl shadow-xl border border-white/5 overflow-hidden animate-fade-in">
          {children || (
            <div className="p-8 text-center">
              <p className="text-lg text-gray-300">Coming soon! This feature is under development.</p>
            </div>
          )}
        </main>
        
        {/* Footer with logo */}
        <footer className="flex justify-center mt-6">
          <img 
            src="/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png" 
            alt="Thrive MT Logo" 
            className="h-7 opacity-40 hover:opacity-80 transition-opacity duration-300 filter drop-shadow-[0_0_3px_rgba(184,115,51,0.3)]"
          />
        </footer>
      </div>
    </div>
  );
};

export default Page;
