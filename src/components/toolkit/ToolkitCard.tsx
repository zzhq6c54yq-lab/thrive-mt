import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cardHoverAnimation } from '@/utils/animations';

interface ToolkitCardProps {
  title: string;
  icon: React.ReactNode;
  coverImage?: string;
  children: React.ReactNode;
  className?: string;
}

export const ToolkitCard = ({ 
  title, 
  icon, 
  coverImage, 
  children, 
  className = '' 
}: ToolkitCardProps) => {
  return (
    <Card className={`
      group
      bg-gray-800/40 backdrop-blur-sm
      border-bronze-400/30 hover:border-bronze-400/60
      ${cardHoverAnimation}
      hover:shadow-[0_0_30px_rgba(184,115,51,0.15)]
      ${className}
    `}>
      {coverImage && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={coverImage} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        </div>
      )}
      
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-bronze-500/20 border border-bronze-400/30 group-hover:bg-bronze-500/30 transition-colors">
            {icon}
          </div>
          <CardTitle className="text-white group-hover:text-bronze-300 transition-colors">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="text-gray-300">
        {children}
      </CardContent>
    </Card>
  );
};
