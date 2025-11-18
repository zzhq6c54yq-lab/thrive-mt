import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  User, Settings, LogOut, Calendar, LineChart, HelpCircle, 
  Moon, Sun, Bell, Lock, MessageSquare, Languages
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
import useTranslation from "@/hooks/useTranslation";
import { useLogout } from "@/hooks/useLogout";

const Header = () => {
  const { toast } = useToast();
  const [showWelcomeTutorial, setShowWelcomeTutorial] = useState(false);
  const { preferredLanguage, setPreferredLanguage, isSpanish, isPortuguese, isFilipino } = useTranslation();
  const { logout } = useLogout();

  const handleThemeToggle = () => {
    const themeMessages = {
      'English': {
        title: "Theme setting",
        description: "Dark mode is not implemented yet."
      },
      'Español': {
        title: "Configuración de tema",
        description: "El modo oscuro aún no está implementado."
      },
      'Português': {
        title: "Configuração de tema",
        description: "O modo escuro ainda não foi implementado."
      },
      'Filipino': {
        title: "Setting ng tema",
        description: "Hindi pa naipapatupad ang dark mode."
      }
    };
    
    const message = themeMessages[preferredLanguage as keyof typeof themeMessages] || themeMessages['English'];
    
    toast({
      title: message.title,
      description: message.description,
    });
  };
  
  const handleLanguageChange = (language: 'English' | 'Español' | 'Português' | 'Filipino') => {
    setPreferredLanguage(language);
    
    const languageNames = {
      'English': 'English',
      'Español': 'Spanish',
      'Português': 'Portuguese',
      'Filipino': 'Filipino'
    };
    
    toast({
      title: "Language Changed",
      description: `Language set to ${languageNames[language]}`,
      duration: 2000
    });
  };

  return (
    <header className="fixed top-0 right-0 z-50 p-4 flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full border-2 border-[#B87333] bg-white shadow-lg hover:bg-[#B87333]/10 transition-all duration-300"
            aria-label="Language selector"
            title="Change language"
          >
            <Languages className="h-5 w-5 text-[#B87333]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 mt-2 bg-white/95 backdrop-blur-sm border border-[#B87333]/20">
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className={`flex items-center ${preferredLanguage === 'English' ? 'bg-[#B87333]/10' : ''}`}
            onClick={() => handleLanguageChange('English')}
          >
            <span className="mr-2">🇺🇸</span> English
            {preferredLanguage === 'English' && <span className="ml-auto text-[#B87333]">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`flex items-center ${preferredLanguage === 'Español' ? 'bg-[#B87333]/10' : ''}`}
            onClick={() => handleLanguageChange('Español')}
          >
            <span className="mr-2">🇪🇸</span> Español
            {preferredLanguage === 'Español' && <span className="ml-auto text-[#B87333]">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`flex items-center ${preferredLanguage === 'Português' ? 'bg-[#B87333]/10' : ''}`}
            onClick={() => handleLanguageChange('Português')}
          >
            <span className="mr-2">🇵🇹</span> Português
            {preferredLanguage === 'Português' && <span className="ml-auto text-[#B87333]">✓</span>}
          </DropdownMenuItem>
          <DropdownMenuItem 
            className={`flex items-center ${preferredLanguage === 'Filipino' ? 'bg-[#B87333]/10' : ''}`}
            onClick={() => handleLanguageChange('Filipino')}
          >
            <span className="mr-2">🇵🇭</span> Filipino
            {preferredLanguage === 'Filipino' && <span className="ml-auto text-[#B87333]">✓</span>}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-2 border-[#B87333] bg-gradient-to-br from-[#181820] to-[#1f1a25] shadow-lg hover:shadow-[0_0_20px_rgba(184,115,51,0.6)] transition-all duration-500 group relative overflow-hidden"
              aria-label="Meet Henry"
              onClick={() => setShowWelcomeTutorial(true)}
            >
              <div className="absolute inset-0 rounded-full border border-[#B87333]/20 animate-pulse"></div>
              <div className="absolute inset-[-3px] rounded-full border border-[#B87333]/30 animate-ping" style={{animationDuration: '3s'}}></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#B87333]/20 via-transparent to-[#B87333]/20 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" style={{animationDuration: '4s'}}></div>
              
              <div className="relative z-10 text-[#B87333] font-bold text-lg leading-none tracking-tighter flex flex-col items-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-[7px] opacity-80 mb-0.5 bg-clip-text text-transparent bg-gradient-to-r from-[#E5C5A1] to-[#B87333] group-hover:from-[#B87333] group-hover:to-[#E5C5A1]">THRIVE</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#B87333] to-[#E5C5A1] group-hover:from-[#E5C5A1] group-hover:to-[#B87333]">MT</span>
              </div>
              
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{animationDuration: '1.5s'}}></div>
              <div className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" style={{animationDuration: '1.8s', animationDelay: '0.2s'}}></div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Meet Henry</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full border-2 border-[#B87333] bg-white shadow-lg hover:bg-[#B87333]/10 transition-all duration-300 hover:shadow-[0_0_15px_#B87333]"
            aria-label={
              isSpanish ? "Menú de usuario" : 
              isPortuguese ? "Menu do usuário" : 
              isFilipino ? "Menu ng user" :
              "User menu"
            }
            title={
              isSpanish ? "Menú de usuario" : 
              isPortuguese ? "Menu do usuário" : 
              isFilipino ? "Menu ng user" :
              "User menu"
            }
          >
            <User className="h-5 w-5 text-[#B87333]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 mr-2 bg-white/95 backdrop-blur-sm border border-[#B87333]/20">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {isSpanish ? "Mi Perfil" : 
                 isPortuguese ? "Meu Perfil" : 
                 isFilipino ? "Aking Profile" :
                 "My Profile"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {isSpanish ? "Administra tu cuenta" : 
                 isPortuguese ? "Gerencie sua conta" : 
                 isFilipino ? "Pamahalaan ang iyong account" :
                 "Manage your account"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>
                {isSpanish ? "Perfil" : 
                 isPortuguese ? "Perfil" : 
                 isFilipino ? "Profile" :
                 "Profile"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>
                {isSpanish ? "Configuración" : 
                 isPortuguese ? "Configurações" : 
                 isFilipino ? "Mga Setting" :
                 "Settings"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleThemeToggle}>
              <Moon className="mr-2 h-4 w-4" />
              <span>
                {isSpanish ? "Modo Oscuro" : 
                 isPortuguese ? "Modo Escuro" : 
                 isFilipino ? "Dark Mode" :
                 "Dark Mode"}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>
                {isSpanish ? "Notificaciones" : 
                 isPortuguese ? "Notificações" : 
                 isFilipino ? "Mga Notification" :
                 "Notifications"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lock className="mr-2 h-4 w-4" />
              <span>
                {isSpanish ? "Configuración de Privacidad" : 
                 isPortuguese ? "Configurações de Privacidade" : 
                 isFilipino ? "Mga Setting ng Privacy" :
                 "Privacy Settings"}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>
              {isSpanish ? "Comentarios" : 
               isPortuguese ? "Feedback" : 
               isFilipino ? "Feedback" :
               "Feedback"}
            </span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>
              {isSpanish ? "Cerrar sesión" : 
               isPortuguese ? "Sair" : 
               isFilipino ? "Mag-logout" :
               "Log out"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
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
