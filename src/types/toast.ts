
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

// Toast primitive props
export type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>;
export type ToastActionPrimitiveProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>;

// Custom action props
export interface ToastActionProps extends ToastActionPrimitiveProps {
  altText?: string;
}

// Our toast component props
export type ToastProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & {
  variant?: "default" | "destructive";
};

// Element types for toast actions
export interface ToastActionElementType {
  altText?: string;
}

// React element for toast actions
export type ToastActionElement = React.ReactElement<ToastActionElementType>;

// Toaster toast props
export interface ToasterToast extends ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    altText?: string;
  };
}

// Props for the useToast hook
export type ToastActionProps = Pick<
  ToasterToast,
  "id" | "title" | "description" | "action"
> & {
  onOpenChange?: (open: boolean) => void;
};
