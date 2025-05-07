import { getImageUrl as getImageUrlUtil } from "@/utils/imageUtils";

export const getImageUrl = (imagePath: string) => {
  return getImageUrlUtil(imagePath, 'feature-utils');
};

export const isFeatureRecommended = (feature: string, selectedQualities: string[], selectedGoals: string[]) => {
  const featureMap: { [key: string]: string[] } = {
    "progress-reports": ["consistency", "data-driven", "reflective", "goal-oriented"],
    "family-resources": ["supportive", "family-oriented", "compassionate", "community"],
    "mental-wellness": ["mindful", "balanced", "wellness-focused", "creative"],
    "games": ["curious", "analytical", "intellectual", "playful"],
    "physical-wellness": ["active", "energetic", "disciplined", "health-conscious"],
    "community-support": ["social", "collaborative", "communicative", "empathetic"],
    "video-diary": ["reflective", "expressive", "authentic", "introspective"],
    "wellness-challenges": ["motivated", "disciplined", "competitive", "growth-focused"],
    "resource-library": ["curious", "informed", "analytical", "studious"],
    "sponsor-alternative": ["supportive", "recovery-focused", "accountable", "healing"],
    "binaural-beats": ["mindful", "experimental", "relaxation-focused", "open-minded"],
    "workshops": ["engaged", "learning-oriented", "growth-focused", "curious"],
    "journaling": ["reflective", "expressive", "creative", "introspective"],
    "real-time-therapy": ["communicative", "open", "healing-focused", "expressive"],
    "holistic-wellness": ["balanced", "holistic", "natural", "wellness-focused"],
    "alternative-therapies": ["experimental", "open-minded", "holistic", "healing-focused"]
  };
  
  const qualityMatch = selectedQualities.some(quality => 
    featureMap[feature] && featureMap[feature].includes(quality.toLowerCase())
  );
  
  const goalMatch = selectedGoals.some(goal => 
    goal.toLowerCase().includes(feature.replace('-', ' '))
  );
  
  return qualityMatch || goalMatch;
};
