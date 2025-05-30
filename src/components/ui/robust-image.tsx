
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RobustImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  onError?: () => void;
}

const RobustImage: React.FC<RobustImageProps> = ({
  src,
  alt,
  className,
  fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxwYXRoIGQ9Im0xNTAgMTUwIDUwIDUwIDcwLTcwIiBzdHJva2U9IiM5Y2E3YmIiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4K',
  onError
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasErrored(false);
  }, [src]);

  const handleError = () => {
    if (!hasErrored) {
      setHasErrored(true);
      setCurrentSrc(fallbackSrc);
      onError?.();
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={cn(className)}
      onError={handleError}
      loading="lazy"
    />
  );
};

export default RobustImage;
