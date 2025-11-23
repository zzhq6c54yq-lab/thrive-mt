import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useLogout = (onGoodbyeRitual?: () => void) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    
    // Show goodbye ritual first
    if (onGoodbyeRitual) {
      onGoodbyeRitual();
      // Wait for ritual to complete
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      toast({
        title: "Rest well",
        description: "We'll be here when you're ready to return.",
      });

      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Let's try that together again",
        description: "Something went wrong. We're here to help.",
        variant: "destructive",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut };
};
