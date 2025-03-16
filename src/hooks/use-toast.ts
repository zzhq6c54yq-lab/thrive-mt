
import { useState, useEffect } from "react";

type ToastVariant = "default" | "destructive" | "success";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

const DEFAULT_TOAST_DURATION = 3000;

const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Function to add a toast
  const toast = ({ title, description, variant = "default", duration = DEFAULT_TOAST_DURATION }: ToastOptions) => {
    // Map 'success' variant to 'default' with a green color for compatibility
    const mappedVariant = variant === "success" ? "default" : variant;
    
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { 
      id, 
      title, 
      description, 
      variant, // Keep the original variant for potential custom styling
      duration 
    }]);

    // Automatically remove toast after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  // Function to dismiss a toast
  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    toast,
    dismiss,
    toasts,
  };
};

// Singleton instance for direct import
let toasts: Toast[] = [];
let listeners: Function[] = [];

const updateToasts = (newToasts: Toast[]) => {
  toasts = newToasts;
  listeners.forEach((listener) => listener(toasts));
};

const toast = ({ title, description, variant = "default", duration = DEFAULT_TOAST_DURATION }: ToastOptions) => {
  // Map 'success' variant to 'default' for compatibility
  const mappedVariant = variant === "success" ? "default" : variant;
  
  const id = Math.random().toString(36).substring(2, 9);
  updateToasts([...toasts, { 
    id, 
    title, 
    description, 
    variant, // Keep the original variant for potential custom styling
    duration 
  }]);

  // Automatically remove toast after duration
  setTimeout(() => {
    updateToasts(toasts.filter((t) => t.id !== id));
  }, duration);
};

const dismiss = (id: string) => {
  updateToasts(toasts.filter((t) => t.id !== id));
};

export { useToast, toast, dismiss };
