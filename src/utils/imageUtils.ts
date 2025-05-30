
/**
 * Utility functions for handling images throughout the application
 */

// Track failed images to avoid repeated console logs
const failedImageUrls = new Set<string>();

// Create an in-memory cache of processed image URLs
const processedImageCache = new Map<string, { url: string, timestamp: number }>();
const CACHE_EXPIRATION = 30 * 60 * 1000; // 30 minutes

// List of specialized program IDs for special handling
const specializedProgramIds = [
  "dod", "military", "golden-years", "adolescent", "first-responders", 
  "law-enforcement", "small-business", "chronic-illness", "colleges", 
  "cancer-support" 
];

/**
 * Helper function to get the correct image URL, with proper fallback handling
 * @param imagePath The original image path
 * @param componentId Identifier for the component using the image
 * @param fallbackImage Optional custom fallback image URL
 * @returns The processed image URL
 */
export const getImageUrl = (
  imagePath: string, 
  componentId: string = 'unknown',
  fallbackImage?: string
): string => {
  // Return original path for local uploads and placeholder images
  if (!imagePath || imagePath.includes('/lovable-uploads/') || imagePath.includes('/placeholder.svg')) {
    return imagePath || "/placeholder.svg";
  }
  
  // For external URLs, check cache first
  if (processedImageCache.has(imagePath)) {
    const cached = processedImageCache.get(imagePath)!;
    if (Date.now() - cached.timestamp < CACHE_EXPIRATION) {
      return cached.url;
    }
  }

  // For external images, add minimal cache busting for stability
  const processedUrl = imagePath.includes('?') ? 
    `${imagePath}&v=1` : 
    `${imagePath}?v=1`;
  
  processedImageCache.set(imagePath, { url: processedUrl, timestamp: Date.now() });
  return processedUrl;
};

/**
 * Clear the image cache
 */
export const clearImageCache = () => {
  processedImageCache.clear();
  failedImageUrls.clear();
};

/**
 * Get program-specific fallback image based on program ID
 * @param id The program ID or component ID
 * @returns An appropriate fallback image URL
 */
export const getProgramFallbackImage = (id: string): string => {
  if (id.includes("military") || id.includes("dod")) {
    return "/lovable-uploads/d2ecdcd2-9a78-40ea-8a8a-ef13092b5ea1.png";
  } else if (id.includes("golden") || id.includes("senior")) {
    return "/lovable-uploads/bce2b3d1-dbc0-4e7c-a7d1-98811182fe0a.png";
  } else if (id.includes("adolescent") || id.includes("teen")) {
    return "/lovable-uploads/11170587-bb45-4563-93d6-add9916cea87.png";
  } else if (id.includes("responder") || id.includes("emergency")) {
    return "/lovable-uploads/776b4638-0382-4cd8-bb25-0a7e36accaf1.png";
  } else if (id.includes("law") || id.includes("enforcement")) {
    return "/lovable-uploads/10d9c6f1-9335-46e4-8942-4d4c198d3f5b.png";
  } else if (id.includes("small-business")) {
    return "/lovable-uploads/f2c6ac08-6331-4884-950d-7f94d68ff15f.png";
  } else if (id.includes("cancer")) {
    return "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png";
  }
  
  return "/placeholder.svg";
};

/**
 * Handle image loading errors
 * @param event The error event
 * @param componentId Identifier for the component
 * @param fallbackImage The fallback image to use
 * @returns The fallback image URL
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>, 
  componentId: string, 
  fallbackImage?: string
): string => {
  const target = event.target as HTMLImageElement;
  const originalSrc = target.src;
  
  if (!failedImageUrls.has(originalSrc)) {
    console.warn(`[${componentId}] Image failed to load:`, originalSrc);
    failedImageUrls.add(originalSrc);
  }
  
  // Use program-specific fallback or provided fallback
  return fallbackImage || getProgramFallbackImage(componentId);
};
