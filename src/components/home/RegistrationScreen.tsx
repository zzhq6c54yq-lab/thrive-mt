
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Lock, Stethoscope } from "lucide-react";
import { useRegistrationState } from "@/hooks/useRegistrationState";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    userInfo: registrationUserInfo, 
    isSpanish, 
    isPortuguese,
    isLogin,
    isLoading,
    setIsLogin,
    handleUserInfoChange, 
    handleSubmit
  } = useRegistrationState();

  const [isTherapistLoading, setIsTherapistLoading] = React.useState(false);

  const handleTherapistLogin = async () => {
    setIsTherapistLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email: "therapist@demo.com", 
        password: "0001" 
      });
      
      if (error) {
        toast({ 
          title: "Therapist login failed", 
          description: error.message, 
          variant: "destructive" 
        });
      } else {
        toast({ 
          title: "Welcome, Dr. Mitchell!", 
          description: "Therapist dashboard loading..." 
        });
        navigate("/therapist-dashboard");
      }
    } catch (error) {
      console.error('Therapist login error:', error);
      toast({ 
        title: "Login error", 
        description: "An unexpected error occurred", 
        variant: "destructive" 
      });
    } finally {
      setIsTherapistLoading(false);
    }
  };

  // Use the registration state but sync with onboarding flow
  React.useEffect(() => {
    onUserInfoChange({ target: { name: 'name', value: registrationUserInfo.name } } as any);
    onUserInfoChange({ target: { name: 'email', value: registrationUserInfo.email } } as any);
    onUserInfoChange({ target: { name: 'password', value: registrationUserInfo.password } } as any);
  }, [registrationUserInfo, onUserInfoChange]);
  
  // Translations
  const translations = {
    title: isLogin 
      ? (isSpanish ? "Inicia Sesión" : isPortuguese ? "Fazer Login": "Sign In")
      : (isSpanish ? "Crea Tu Cuenta" : isPortuguese ? "Criar Conta" : "Create Your Account"),
    subtitle: isLogin 
      ? (isSpanish ? "Bienvenido de vuelta a Thrive MT" : isPortuguese ? "Bem-vindo de volta ao Thrive MT" : "Welcome back to Thrive MT")
      : (isSpanish ? "Únete a Thrive MT para comenzar tu viaje de bienestar mental" : isPortuguese ? "Junte-se ao Thrive MT para começar sua jornada de bem-estar mental" : "Join Thrive MT to start your mental wellness journey"),
    fullName: isSpanish ? "Nombre Completo" : isPortuguese ? "Nome Completo" : "Full Name",
    email: isSpanish ? "Correo Electrónico" : isPortuguese ? "E-mail" : "Email Address",
    password: isSpanish ? "Contraseña" : isPortuguese ? "Senha" : "Password",
    submit: isLogin 
      ? (isSpanish ? "Iniciar Sesión" : isPortuguese ? "Entrar" : "Sign In")
      : (isSpanish ? "Registrarse" : isPortuguese ? "Registrar" : "Register"),
    toggle: isLogin 
      ? (isSpanish ? "¿No tienes cuenta? Regístrate" : isPortuguese ? "Não tem conta? Cadastre-se" : "Don't have an account? Sign up")
      : (isSpanish ? "¿Ya tienes cuenta? Inicia sesión" : isPortuguese ? "Já tem conta? Faça login" : "Already have an account? Sign in"),
    previous: isSpanish ? "Anterior" : isPortuguese ? "Anterior" : "Previous",
    skipRegistration: isSpanish ? "Continuar Sin Registro" : isPortuguese ? "Continuar Sem Registro" : "Continue Without Registration",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1f] via-[#242432] to-[#272730] text-white animate-fade-in relative">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22><circle cx=%222%22 cy=%222%22 r=%221%22 fill=%22%23B87333%22 fill-opacity=%220.05%22/></svg>')] opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#B87333]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#D946EF]/20 to-transparent rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-md w-full mx-auto px-4 z-10">
        {/* Therapist Portal Section */}
        <div className="mb-6 bg-gradient-to-r from-[#B87333]/20 to-[#E5C5A1]/20 backdrop-blur-md p-5 rounded-lg shadow-lg border border-[#B87333]/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#B87333]/30 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-[#E5C5A1]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#E5C5A1]">Therapist Portal</h3>
              <p className="text-sm text-gray-300">Demo Login Access</p>
            </div>
          </div>
          <div className="bg-black/30 rounded-md p-3 mb-3">
            <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-300">Login Code:</span>
              <code className="bg-[#B87333]/20 px-2 py-1 rounded text-[#E5C5A1] font-mono">0001</code>
            </div>
          </div>
          <Button
            onClick={handleTherapistLogin}
            disabled={isTherapistLoading}
            className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white font-semibold disabled:opacity-50"
          >
            {isTherapistLoading ? "Logging in..." : "Login as Therapist"}
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-[#1a1a1f] text-gray-400">or continue as client</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B87333] to-[#E5C5A1]">{translations.title}</h2>
          <p className="text-gray-300">{translations.subtitle}</p>
        </div>
        
        <form
          onSubmit={(e) => handleSubmit(e, () => onSubmit(e))} 
          className="space-y-4 bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/10"
        >
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">{translations.fullName}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input 
                  type="text"
                  id="name"
                  name="name"
                  value={registrationUserInfo.name}
                  onChange={handleUserInfoChange}
                  className="pl-10 w-full p-2 bg-white/10 border border-white/20 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none text-white"
                  placeholder={isSpanish ? "Juan Pérez" : isPortuguese ? "João Silva" : "John Doe"}
                />
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">{translations.email}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="email"
                id="email"
                name="email"
                value={registrationUserInfo.email}
                onChange={handleUserInfoChange}
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
                value={registrationUserInfo.password}
                onChange={handleUserInfoChange}
                className="pl-10 w-full p-2 bg-white/10 border border-white/20 rounded-md focus:ring-[#B87333] focus:border-[#B87333] outline-none text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#B87333] to-[#E5C5A1] hover:from-[#A56625] hover:to-[#D4B48F] text-white disabled:opacity-50"
            >
              {isLoading ? (isSpanish ? "Procesando..." : isPortuguese ? "Processando..." : "Processing...") : translations.submit}
            </Button>
          </div>
          
          <div className="text-center pt-2">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-[#B87333] hover:text-[#E5C5A1] underline"
            >
              {translations.toggle}
            </button>
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
