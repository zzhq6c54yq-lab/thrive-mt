
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRegistrationState = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Get language preference
  const preferredLanguage = localStorage.getItem('preferredLanguage') || 'English';
  const isSpanish = preferredLanguage === 'Español';
  const isPortuguese = preferredLanguage === 'Português';

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent, nextScreenSetter: () => void) => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.password) {
      const errorMessages = {
        'English': {
          title: "Login Error",
          description: "Please enter your email and password."
        },
        'Español': {
          title: "Error de Inicio de Sesión",
          description: "Por favor ingresa tu correo y contraseña."
        },
        'Português': {
          title: "Erro de Login",
          description: "Por favor, insira seu e-mail e senha."
        }
      };
      
      const message = errorMessages[preferredLanguage as keyof typeof errorMessages] || errorMessages['English'];
      
      toast({
        title: message.title,
        description: message.description,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userInfo.email,
        password: userInfo.password,
      });

      if (error) {
        let errorMessage = error.message;
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = isSpanish 
            ? "Credenciales incorrectas. Verifica tu correo y contraseña."
            : isPortuguese
            ? "Credenciais incorretas. Verifique seu e-mail e senha."
            : "Invalid credentials. Please check your email and password.";
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = isSpanish 
            ? "Por favor confirma tu correo antes de iniciar sesión."
            : isPortuguese
            ? "Por favor confirme seu e-mail antes de fazer login."
            : "Please confirm your email before logging in.";
        }

        toast({
          title: isSpanish ? "Error de Inicio de Sesión" : isPortuguese ? "Erro de Login" : "Login Error",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        const successMessages = {
          'English': {
            title: "Welcome Back!",
            description: "You've successfully logged in to Thrive MT."
          },
          'Español': {
            title: "¡Bienvenido de Vuelta!",
            description: "Has iniciado sesión exitosamente en Thrive MT."
          },
          'Português': {
            title: "Bem-vindo de Volta!",
            description: "Você fez login com sucesso no Thrive MT."
          }
        };
        
        const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
        
        toast({
          title: message.title,
          description: message.description,
        });
        
        nextScreenSetter();
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: isSpanish ? "Error de Inicio de Sesión" : isPortuguese ? "Erro de Login" : "Login Error",
        description: isSpanish 
          ? "Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo."
          : isPortuguese
          ? "Ocorreu um erro durante o login. Tente novamente."
          : "An error occurred during login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent, nextScreenSetter: () => void) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.password) {
      const errorMessages = {
        'English': {
          title: "Registration Error",
          description: "Please fill in all fields to continue."
        },
        'Español': {
          title: "Error de Registro",
          description: "Por favor completa todos los campos para continuar."
        },
        'Português': {
          title: "Erro de Registro",
          description: "Por favor, preencha todos os campos para continuar."
        }
      };
      
      const message = errorMessages[preferredLanguage as keyof typeof errorMessages] || errorMessages['English'];
      
      toast({
        title: message.title,
        description: message.description,
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Attempt to create user account with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: userInfo.email,
        password: userInfo.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: userInfo.name,
            name: userInfo.name,
          }
        }
      });

      if (error) {
        // Handle specific error cases
        let errorMessage = error.message;
        if (error.message.includes('already registered') || error.message.includes('duplicate key')) {
          setIsLogin(true); // Switch to login mode
          errorMessage = isSpanish 
            ? "Este correo ya está registrado. Cambiamos a modo de inicio de sesión."
            : isPortuguese
            ? "Este e-mail já está registrado. Mudamos para o modo de login."
            : "This email is already registered. Switched to login mode.";
            
          toast({
            title: isSpanish ? "Cuenta Existente" : isPortuguese ? "Conta Existente" : "Account Exists",
            description: errorMessage,
            variant: "default"
          });
          return;
        }

        toast({
          title: isSpanish ? "Error de Registro" : isPortuguese ? "Erro de Registro" : "Registration Error",
          description: errorMessage,
          variant: "destructive"
        });
        return;
      }

      if (data.user) {
        const successMessages = {
          'English': {
            title: "Registration Successful",
            description: "Welcome to Thrive MT! Your journey to better mental health begins now."
          },
          'Español': {
            title: "Registro Exitoso",
            description: "¡Bienvenido a Thrive MT! Tu viaje hacia una mejor salud mental comienza ahora."
          },
          'Português': {
            title: "Registro bem-sucedido",
            description: "Bem-vindo ao Thrive MT! Sua jornada para uma melhor saúde mental começa agora."
          }
        };
        
        const message = successMessages[preferredLanguage as keyof typeof successMessages] || successMessages['English'];
        
        toast({
          title: message.title,
          description: message.description,
        });
        
        // Auto-login after registration for seamless onboarding
        // This works when email confirmation is disabled in Supabase
        if (data.session) {
          // User is already logged in (email confirmation disabled)
          nextScreenSetter();
        } else {
          // Email confirmation required - auto-login after signup
          const { error: loginError } = await supabase.auth.signInWithPassword({
            email: userInfo.email,
            password: userInfo.password,
          });
          
          if (!loginError) {
            nextScreenSetter();
          } else {
            // If auto-login fails, user needs to confirm email
            toast({
              title: isSpanish ? "Confirma tu Correo" : isPortuguese ? "Confirme seu E-mail" : "Confirm Your Email",
              description: isSpanish 
                ? "Por favor revisa tu correo y haz clic en el enlace de confirmación."
                : isPortuguese
                ? "Por favor, verifique seu e-mail e clique no link de confirmação."
                : "Please check your email and click the confirmation link.",
              variant: "default"
            });
          }
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: isSpanish ? "Error de Registro" : isPortuguese ? "Erro de Registro" : "Registration Error",
        description: isSpanish 
          ? "Ocurrió un error durante el registro. Inténtalo de nuevo."
          : isPortuguese
          ? "Ocorreu um erro durante o registro. Tente novamente."
          : "An error occurred during registration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, nextScreenSetter: () => void) => {
    if (isLogin) {
      await handleLogin(e, nextScreenSetter);
    } else {
      await handleRegister(e, nextScreenSetter);
    }
  };

  return {
    userInfo,
    isSpanish,
    isPortuguese,
    isLogin,
    isLoading,
    setIsLogin,
    handleUserInfoChange,
    handleRegister,
    handleLogin,
    handleSubmit
  };
};

export default useRegistrationState;
