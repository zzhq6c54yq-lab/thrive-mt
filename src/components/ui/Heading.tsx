import React from 'react';
import { cn } from '@/lib/utils';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * Standardized Heading Component
 * Maintains consistent typography scale across ThriveMT
 * 
 * Level 1: Page titles (light weight, largest)
 * Level 2: Section headers (medium weight)
 * Level 3: Card titles (semibold)
 * Level 4: Small headers (medium)
 */
export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  children,
  className,
  gradient = false,
  as,
}) => {
  const styles = {
    1: 'text-3xl md:text-4xl lg:text-5xl font-light tracking-tight',
    2: 'text-2xl md:text-3xl font-medium tracking-tight',
    3: 'text-xl md:text-2xl font-semibold',
    4: 'text-lg font-medium',
  };

  const gradientClass = gradient
    ? 'bg-gradient-to-r from-bronze-300 via-bronze-400 to-bronze-500 bg-clip-text text-transparent'
    : 'text-foreground';

  const Tag = as || (`h${level}` as keyof JSX.IntrinsicElements);

  return (
    <Tag
      className={cn(
        styles[level],
        gradientClass,
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Heading;
