
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useToastInternal } from "@radix-ui/react-toast";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

// Create our own implementation to work around circular dependency
const useToast = () => {
  // Create a basic version of toast function
  const toast = ({ title, description, variant = "default" }: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: "default" | "destructive";
  }) => {
    // Simple implementation to show toast
    console.log(`Toast: ${title} - ${description}`);
  };

  return {
    toast,
    toasts: [],
    dismiss: () => {},
  };
};

export { useToast, type ToasterToast };
export const toast = (props: any) => {
  const { toast } = useToast();
  return toast(props);
};
