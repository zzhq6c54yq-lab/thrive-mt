
import React from "react";
import { Link } from "react-router-dom";
import { 
  User, Settings, LogOut, Calendar, LineChart, HelpCircle, 
  Moon, Sun, Bell, Languages, Lock, MessageSquare
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

const Header = () => {
  const { toast } = useToast();
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
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

  const toggleLanguage = () => {
    const newLanguage = isSpanish ? 'English' : 'Español';
    localStorage.setItem('preferredLanguage', newLanguage);
    
    // Force a re-render of the app to apply the language change immediately
    window.dispatchEvent(new Event('languageChange'));
    
    toast({
      title: isSpanish ? "Language Changed" : "Idioma Cambiado",
      description: isSpanish ? "Language set to English" : "Idioma establecido a Español",
    });
  };

  return (
    <header className="fixed top-0 right-0 z-50 p-4 flex items-center justify-end gap-2">
      {/* Language Button */}
      <Button 
        variant="outline" 
        size="icon" 
        className="h-10 w-10 rounded-full border-2 border-[#B87333] bg-white shadow-lg hover:bg-[#B87333]/10 transition-all duration-300 hover:shadow-[0_0_15px_#B87333]"
        aria-label="Language toggle"
        onClick={toggleLanguage}
      >
        <Languages className="h-5 w-5 text-[#B87333]" />
      </Button>
      
      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full border-2 border-[#B87333] bg-white shadow-lg hover:bg-[#B87333]/10 transition-all duration-300 hover:shadow-[0_0_15px_#B87333]"
            aria-label="User menu"
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
            <DropdownMenuItem onClick={toggleLanguage}>
              <Languages className="mr-2 h-4 w-4" />
              <span>{isSpanish ? "English" : "Español"}</span>
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
};

export default Header;
