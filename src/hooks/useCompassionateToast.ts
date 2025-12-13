import { useToast } from '@/hooks/use-toast';
import { compassionateMessages, MessageKey, getRandomEncouragement } from '@/lib/compassionateMessages';

/**
 * Hook for showing compassionate toast messages
 * Wraps useToast with predefined empathetic messages
 */
export function useCompassionateToast() {
  const { toast } = useToast();

  const showCompassionate = (key: MessageKey, customMessage?: string) => {
    const msg = compassionateMessages[key];
    toast({
      title: msg.title,
      description: customMessage || msg.message,
    });
  };

  // Success messages
  const showSuccess = (title?: string, message?: string) => {
    toast({
      title: title || compassionateMessages.saved.title,
      description: message || compassionateMessages.saved.message,
    });
  };

  // Error messages - always compassionate
  const showError = (context?: string) => {
    const messages = [
      compassionateMessages.networkError,
      compassionateMessages.loadError,
      compassionateMessages.saveError,
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    
    toast({
      title: msg.title,
      description: context || msg.message,
      variant: 'destructive',
    });
  };

  // Connection error
  const showConnectionError = () => {
    toast({
      title: compassionateMessages.networkError.title,
      description: compassionateMessages.networkError.message,
      variant: 'destructive',
    });
  };

  // Save error
  const showSaveError = () => {
    toast({
      title: compassionateMessages.saveError.title,
      description: compassionateMessages.saveError.message,
      variant: 'destructive',
    });
  };

  // Loading/processing
  const showProcessing = () => {
    toast({
      title: compassionateMessages.processing.title,
      description: compassionateMessages.processing.message,
    });
  };

  // Welcome back
  const showWelcome = (name?: string) => {
    toast({
      title: name ? `Welcome back, ${name}` : compassionateMessages.welcomeBack.title,
      description: compassionateMessages.welcomeBack.message,
    });
  };

  // Encouragement
  const showEncouragement = () => {
    toast({
      title: getRandomEncouragement(),
      description: "We see your effort.",
    });
  };

  return {
    showCompassionate,
    showSuccess,
    showError,
    showConnectionError,
    showSaveError,
    showProcessing,
    showWelcome,
    showEncouragement,
    toast, // Original toast for custom usage
  };
}

export default useCompassionateToast;
