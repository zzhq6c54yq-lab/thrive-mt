
// Re-export from hooks to break circular dependency
import { useToast, toast } from "@/hooks/use-toast";
import { type ToasterToast, type ToastActionProps } from "@/types/toast";

export { useToast, toast, type ToasterToast, type ToastActionProps };
