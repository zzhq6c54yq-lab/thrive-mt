
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RegistrationScreenProps {
  userInfo: {
    name: string;
    email: string;
    password: string;
  };
  onUserInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onPrevious: () => void;
  onSkip: () => void;
}

const RegistrationScreen: React.FC<RegistrationScreenProps> = ({
  userInfo,
  onUserInfoChange,
  onSubmit,
  onPrevious,
  onSkip,
}) => {
  // Get preferred language
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  
  // Translations
  const translations = {
    title: isSpanish ? "Crea Tu Cuenta" : "Create Your Account",
    subtitle: isSpanish ? "Únete a Thrive MT para comenzar tu viaje de bienestar mental" : "Join Thrive MT to start your mental wellness journey",
    fullName: isSpanish ? "Nombre Completo" : "Full Name",
    email: isSpanish ? "Correo Electrónico" : "Email Address",
    password: isSpanish ? "Contraseña" : "Password",
    register: isSpanish ? "Registrarse" : "Register",
    previous: isSpanish ? "Anterior" : "Previous",
    skipRegistration: isSpanish ? "Continuar Sin Registro" : "Continue Without Registration",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#D946EF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-md w-full mx-auto px-4 z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">{translations.title}</h2>
          <p className="text-gray-300">{translations.subtitle}</p>
        </div>
        
        <form 
          onSubmit={onSubmit} 
          className="space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/10"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">{translations.fullName}</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text"
                id="name"
                name="name"
                value={userInfo.name}
                onChange={onUserInfoChange}
                className="pl-10 w-full p-2 bg-white/10 border border-white/20 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none text-white"
                placeholder={isSpanish ? "Juan Pérez" : "John Doe"}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">{translations.email}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="email"
                id="email"
                name="email"
                value={userInfo.email}
                onChange={onUserInfoChange}
                className="pl-10 w-full p-2 bg-white/10 border border-white/20 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none text-white"
                placeholder={isSpanish ? "juan@ejemplo.com" : "john@example.com"}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">{translations.password}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="password"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={onUserInfoChange}
                className="pl-10 w-full p-2 bg-white/10 border border-white/20 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white"
            >
              {translations.register}
            </Button>
          </div>
        </form>
        
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline"
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white hover:bg-white/10"
            onClick={onPrevious}
          >
            <ArrowLeft className="h-4 w-4" />
            {translations.previous}
          </Button>
          
          <Button 
            variant="outline"
            className="bg-white/5 border border-white/10 text-white hover:bg-white/10"
            onClick={onSkip}
          >
            {translations.skipRegistration}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
