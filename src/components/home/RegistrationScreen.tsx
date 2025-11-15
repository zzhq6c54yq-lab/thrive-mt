
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
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

  const [staffEmail, setStaffEmail] = React.useState("");
  const [isStaffLoading, setIsStaffLoading] = React.useState(false);

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsStaffLoading(true);
    try {
      // Check if email is "0001" or actual therapist email
      const trimmedEmail = staffEmail.trim();
      const loginEmail = trimmedEmail === "0001" ? "therapist@demo.com" : trimmedEmail;
      
      // Staff login - use fixed password "0001"
      const { error } = await supabase.auth.signInWithPassword({ 
        email: loginEmail, 
        password: "0001" 
      });
      
      if (error) {
        toast({ 
          title: "Login failed", 
          description: "Invalid credentials", 
          variant: "destructive" 
        });
      } else {
        navigate("/therapist-dashboard");
      }
    } catch (error) {
      toast({ 
        title: "Login error", 
        description: "An unexpected error occurred", 
        variant: "destructive" 
      });
    } finally {
      setIsStaffLoading(false);
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

        {/* Staff Access - Only show on login page */}
        {isLogin && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <form onSubmit={handleStaffLogin} className="space-y-3">
              <div className="text-center mb-3">
                <p className="text-xs text-gray-400">Staff Access</p>
                <p className="text-xs text-gray-500 mt-1">Enter email or use code: 0001</p>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    placeholder="Staff Email or Code (0001)"
                    className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#B87333]/50 text-sm"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isStaffLoading}
                className="w-full bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 py-2 text-sm disabled:opacity-50"
              >
                {isStaffLoading ? "Logging in..." : "Staff Login"}
              </Button>
            </form>
          </div>
        )}
        
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
