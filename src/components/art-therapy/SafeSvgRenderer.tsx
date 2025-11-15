import { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface SafeSvgRendererProps {
  svgContent: string;
  className?: string;
}

export const SafeSvgRenderer = ({ svgContent, className = "" }: SafeSvgRendererProps) => {
  const sanitizedSvg = useMemo(() => {
    if (!svgContent) return "";
    
    return DOMPurify.sanitize(svgContent, {
      USE_PROFILES: { svg: true, svgFilters: true },
      ADD_TAGS: ['use'],
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'link', 'foreignObject'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onmouseout', 'onmouseenter', 'onmouseleave', 'onanimationstart', 'onanimationend']
    });
  }, [svgContent]);

  if (!sanitizedSvg) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
    />
  );
};
