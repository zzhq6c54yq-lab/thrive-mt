
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

// Toast primitive props
export type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>;
export type ToastActionPrimitiveProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>;

// Custom action props
export interface ToastActionElementType {
  altText?: string;
}

// React element for toast actions
export type ToastActionElement = React.ReactElement<ToastActionElementType>;

// Our toast component props
export type ToastProps = ToastRootProps & {
  variant?: "default" | "destructive";
};

// Action component props
export interface ToastActionProps extends ToastActionPrimitiveProps {
  altText?: string;
}

// Toaster toast props
export interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    altText?: string;
  };
  variant?: "default" | "destructive";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
