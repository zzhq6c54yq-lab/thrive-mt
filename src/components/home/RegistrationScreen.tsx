
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, User } from "lucide-react";
import useTranslation from "@/hooks/useTranslation";

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
  onSkip
}) => {
  const { isSpanish, isPortuguese, isFilipino } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a1f] px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <User className="w-16 h-16 text-[#B87333] mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {isSpanish ? "Creemos Tu Perfil" : 
             isPortuguese ? "Vamos Criar Seu Perfil" :
             isFilipino ? "Likhain Natin ang Inyong Profile" :
             "Let's Create Your Profile"}
          </h1>
          <p className="text-gray-300">
            {isSpanish ? "Unos pocos detalles para personalizar tu experiencia" :
             isPortuguese ? "Alguns detalhes para personalizar sua experiência" :
             isFilipino ? "Ilang detalye upang i-personalize ang inyong karanasan" :
             "A few details to personalize your experience"}
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6 bg-[#2a2a35] p-6 rounded-lg border border-gray-700">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              {isSpanish ? "Nombre" : isPortuguese ? "Nome" : isFilipino ? "Pangalan" : "Name"}
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={userInfo.name}
              onChange={onUserInfoChange}
              placeholder={isSpanish ? "Tu nombre" : 
                          isPortuguese ? "Seu nome" :
                          isFilipino ? "Ang inyong pangalan" :
                          "Your name"}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              {isSpanish ? "Correo Electrónico" : 
               isPortuguese ? "E-mail" :
               isFilipino ? "Email" :
               "Email"}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userInfo.email}
              onChange={onUserInfoChange}
              placeholder={isSpanish ? "tu@email.com" : 
                          isPortuguese ? "seu@email.com" :
                          isFilipino ? "inyong@email.com" :
                          "your@email.com"}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              {isSpanish ? "Contraseña" : 
               isPortuguese ? "Senha" :
               isFilipino ? "Password" :
               "Password"}
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={userInfo.password}
              onChange={onUserInfoChange}
              placeholder={isSpanish ? "Crear contraseña" : 
                          isPortuguese ? "Criar senha" :
                          isFilipino ? "Gumawa ng password" :
                          "Create password"}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="button"
              onClick={onPrevious}
              variant="outline" 
              className="flex-1 bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isSpanish ? "Anterior" : isPortuguese ? "Anterior" : isFilipino ? "Nakaraan" : "Previous"}
            </Button>
            
            <Button 
              type="submit"
              className="flex-1 bg-[#B87333] hover:bg-[#B87333]/80 text-white"
            >
              {isSpanish ? "Crear Cuenta" : 
               isPortuguese ? "Criar Conta" :
               isFilipino ? "Gumawa ng Account" :
               "Create Account"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={onSkip}
              className="text-gray-400 hover:text-white text-sm underline"
            >
              {isSpanish ? "Omitir por ahora" : 
               isPortuguese ? "Pular por enquanto" :
               isFilipino ? "Laktawan muna" :
               "Skip for now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationScreen;
