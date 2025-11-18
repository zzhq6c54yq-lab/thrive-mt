import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import useTranslation from '@/hooks/useTranslation';

export const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { preferredLanguage } = useTranslation();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Error",
          description: "Failed to log out. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const logoutMessages = {
        'English': {
          title: "Logged out",
          description: "You have been successfully logged out."
        },
        'Español': {
          title: "Sesión cerrada",
          description: "Has cerrado sesión exitosamente."
        },
        'Português': {
          title: "Desconectado",
          description: "Você foi desconectado com sucesso."
        },
        'Filipino': {
          title: "Na-log out",
          description: "Matagumpay kang na-log out."
        }
      };

      const message = logoutMessages[preferredLanguage as keyof typeof logoutMessages] || logoutMessages['English'];

      toast({
        title: message.title,
        description: message.description,
      });

      // Redirect to auth page
      navigate('/auth');
    } catch (error) {
      console.error('Unexpected logout error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during logout.",
        variant: "destructive",
      });
    }
  };

  return { logout };
};
