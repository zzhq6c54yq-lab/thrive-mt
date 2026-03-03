import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gold: "bg-[#B87333] text-white font-medium hover:bg-[#B87333]/90 shadow-md",
        "gold-outline": "border-2 border-[#B87333] text-[#B87333] bg-white dark:bg-gray-900 hover:bg-[#B87333]/10",
        henry: "bg-[#221F26] text-white border border-[#B87333]/30 hover:border-[#B87333] shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(184,115,51,0.3)] group-hover:bg-[#221F26]/90",
        bronze: "bg-black/80 backdrop-blur-sm text-white border border-[#B87333]/30 hover:border-[#B87333] shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(184,115,51,0.4)] hover:bg-black/90",
        amber: "bg-amber-500 text-black hover:bg-amber-600 font-medium shadow-md",
        "amber-outline": "border-2 border-amber-600 text-amber-700 bg-white dark:bg-gray-900 hover:bg-amber-50 dark:hover:bg-amber-900/20",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-xs [&_svg]:size-3",
        default: "h-10 px-4 py-2 [&_svg]:size-4",
        md: "h-11 rounded-md px-6 text-base [&_svg]:size-4",
        lg: "h-12 rounded-md px-8 text-lg [&_svg]:size-5",
        xl: "h-14 rounded-lg px-10 text-xl [&_svg]:size-6",
        icon: "h-10 w-10 [&_svg]:size-4",
        "h-icon": "h-10 w-10 rounded-full [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, loadingText, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="animate-spin" aria-hidden="true" />
        )}
        <span className="relative z-10">
          {isLoading ? loadingText || children : children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
