
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  User, Settings, LogOut, Calendar, LineChart, HelpCircle, 
  Moon, Sun, Bell, Lock, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import FeatureTutorial from "@/components/tutorials/FeatureTutorial";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const { toast } = useToast();
  const [isSpanish, setIsSpanish] = useState<boolean>(false);
  const [showWelcomeTutorial, setShowWelcomeTutorial] = useState(false);
  const location = useLocation();
  
  // Check if we're on the main dashboard route
  const isMainDashboard = location.pathname === '/' || location.pathname === '/home';
  
  // Check language preference and listen for changes
  useEffect(() => {
    const checkLanguage = () => {
      const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
      setIsSpanish(preferredLanguage === 'Español');
    };
    
    // Check initial language
    checkLanguage();
    
    // Listen for language change events
    window.addEventListener('languageChange', checkLanguage);
    
    // Cleanup
    return () => {
      window.removeEventListener('languageChange', checkLanguage);
    };
  }, []);
  
  const handleLogout = () => {
    toast({
      title: isSpanish ? "Sesión cerrada" : "Logged out",
      description: isSpanish ? "Has cerrado sesión exitosamente." : "You have been successfully logged out.",
    });
  };

  const handleThemeToggle = () => {
    toast({
      title: isSpanish ? "Configuración de tema" : "Theme setting",
      description: isSpanish ? "El modo oscuro aún no está implementado." : "Dark mode is not implemented yet.",
    });
  };

  // Don't render tutorial button on main dashboard
  if (isMainDashboard) {
    return (
      <header className="fixed top-0 right-0 z-50 p-4 flex items-center justify-end gap-2">
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 rounded-full border-2 border-[#B87333] bg-white shadow-lg hover:bg-[#B87333]/10 transition-all duration-300 hover:shadow-[0_0_15px_#B87333]"
              aria-label={isSpanish ? "Menú de usuario" : "User menu"}
              title={isSpanish ? "Menú de usuario" : "User menu"}
            >
              <User className="h-5 w-5 text-[#B87333]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 mr-2 bg-white/95 backdrop-blur-sm border border-[#B87333]/20">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{isSpanish ? "Mi Perfil" : "My Profile"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {isSpanish ? "Administra tu cuenta" : "Manage your account"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>{isSpanish ? "Perfil" : "Profile"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>{isSpanish ? "Configuración" : "Settings"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleThemeToggle}>
                <Moon className="mr-2 h-4 w-4" />
                <span>{isSpanish ? "Modo Oscuro" : "Dark Mode"}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>{isSpanish ? "Notificaciones" : "Notifications"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Lock className="mr-2 h-4 w-4" />
                <span>{isSpanish ? "Configuración de Privacidad" : "Privacy Settings"}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "Comentarios" : "Feedback"}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "Cerrar sesión" : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    );
  }

  return (
    <header className="fixed top-0 right-0 z-50 p-4 flex items-center justify-end gap-2">
      {/* Enhanced Tutorial Button with animations and eye-catching design */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-2 border-[#B87333] bg-gradient-to-br from-[#181820] to-[#1f1a25] shadow-lg hover:shadow-[0_0_20px_rgba(184,115,51,0.6)] transition-all duration-500 group relative overflow-hidden"
              aria-label={isSpanish ? "Tutorial de la Aplicación" : "App Tutorial"}
              onClick={() => setShowWelcomeTutorial(true)}
            >
              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border border-[#B87333]/20 animate-pulse"></div>
              <div className="absolute inset-[-3px] rounded-full border border-[#B87333]/30 animate-ping" style={{animationDuration: '3s'}}></div>
              
              {/* Glowing background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/20 via-transparent to-[#B87333]/20 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" style={{animationDuration: '4s'}}></div>
              
              {/* Logo with text */}
              <div className="relative z-10 text-[#B87333] font-bold text-lg leading-none tracking-tighter flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-[7px] opacity-80 mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-[#E5C5A1] to-[#B87333] group-hover:from-[#B87333] group-hover:to-[#E5C5A1]">THRIVE</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#B87333] to-[#E5C5A1] group-hover:from-[#E5C5A1] group-hover:to-[#B87333]">MT</span>
              </div>
              
              {/* Sparkle effects on hover */}
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{animationDuration: '1.5s'}}></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{animationDuration: '1.8s', animationDelay: '0.2s'}}></div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isSpanish ? "Tutorial del sitio" : "Site Tutorial"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full border-2 border-[#B87333] bg-white shadow-lg hover:bg-[#B87333]/10 transition-all duration-300 hover:shadow-[0_0_15px_#B87333]"
            aria-label={isSpanish ? "Menú de usuario" : "User menu"}
            title={isSpanish ? "Menú de usuario" : "User menu"}
          >
            <User className="h-5 w-5 text-[#B87333]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 mr-2 bg-white/95 backdrop-blur-sm border border-[#B87333]/20">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{isSpanish ? "Mi Perfil" : "My Profile"}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {isSpanish ? "Administra tu cuenta" : "Manage your account"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "Perfil" : "Profile"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "Configuración" : "Settings"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleThemeToggle}>
              <Moon className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "Modo Oscuro" : "Dark Mode"}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "Notificaciones" : "Notifications"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lock className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "Configuración de Privacidad" : "Privacy Settings"}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>{isSpanish ? "Comentarios" : "Feedback"}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{isSpanish ? "Cerrar sesión" : "Log out"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Full Feature Tutorial Dialog */}
      <Dialog open={showWelcomeTutorial} onOpenChange={setShowWelcomeTutorial}>
        <DialogContent className="sm:max-w-md">
          <FeatureTutorial 
            featureId="dashboard" 
            onClose={() => setShowWelcomeTutorial(false)}
            userName=""
            embedded={true}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
