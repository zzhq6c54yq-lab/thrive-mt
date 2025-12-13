import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ThemeCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'portal' | 'warm' | 'elevated';
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

/**
 * Standardized Card Component for ThriveMT
 * Replaces inconsistent bg-[#17151F] custom cards
 * 
 * Variants:
 * - default: Standard card with border
 * - glass: Glass-morphism effect
 * - portal: For portal-specific content with accent border
 * - warm: Bronze-tinted for emotional content
 * - elevated: Higher elevation with stronger shadow
 */
export const ThemeCard: React.FC<ThemeCardProps> = ({
  children,
  className,
  variant = 'default',
  hover = false,
  glow = false,
  onClick,
}) => {
  const variants = {
    default: 'bg-card border-border',
    glass: 'bg-card/80 backdrop-blur-sm border-border/50',
    portal: 'bg-card/90 backdrop-blur-sm border-[var(--portal-accent,hsl(var(--bronze-500)))]/30',
    warm: 'bg-gradient-to-br from-bronze-500/5 to-amber-500/5 border-bronze-500/20',
    elevated: 'bg-card border-border shadow-lg',
  };

  const hoverStyles = hover
    ? 'transition-all duration-300 hover:border-bronze-500/50 hover:shadow-lg hover:shadow-bronze-500/10 cursor-pointer'
    : '';

  const glowStyles = glow
    ? 'shadow-[0_0_15px_rgba(212,175,55,0.15)]'
    : '';

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={cn(
        'rounded-xl border p-6',
        variants[variant],
        hoverStyles,
        glowStyles,
        onClick && 'text-left w-full',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ThemeCard;
