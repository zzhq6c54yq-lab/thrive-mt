
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

// Basic primitive type references (direct from Radix UI)
export type ToastPrimitiveProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>;
export type ToastActionPrimitiveProps = React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>;

// Our enhanced toast props that extend Radix primitives
export interface ToastProps extends ToastPrimitiveProps {
  variant?: "default" | "destructive";
}

// Simple type for the action element
export interface ToastActionElementType {
  altText: string;
}

// Action component props with required altText
export interface ToastActionProps extends ToastActionPrimitiveProps {
  altText: string;
}

// The toast element type
export type ToastActionElement = React.ReactElement<ToastActionElementType>;

// Complete toast object for the toaster state
export interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    altText: string;
  };
  variant?: "default" | "destructive";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
