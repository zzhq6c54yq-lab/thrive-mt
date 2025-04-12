
import React from "react";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import MentalWellnessFeature from "./MentalWellnessFeature";
import { Feature } from "./featuresData";
import { isFeatureRecommended } from "./featureUtils";

interface KeyFeaturesGridProps {
  features: Feature[];
  selectedQualities: string[];
  selectedGoals: string[];
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

const KeyFeaturesGrid: React.FC<KeyFeaturesGridProps> = ({
  features,
  selectedQualities,
  selectedGoals,
  isSpanish,
  handleNavigate
}) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {features.map((feature) => (
        feature.id === "mental-wellness" ? (
          <MentalWellnessFeature
            key={feature.id}
            id={feature.id}
            title={feature.title}
            path={feature.path}
            color={feature.color}
            description={feature.description}
            image={feature.image}
            isRecommended={isFeatureRecommended(feature.id, selectedQualities, selectedGoals)}
            isSpanish={isSpanish}
            handleNavigate={handleNavigate}
          />
        ) : (
          <FeatureCard
            key={feature.id}
            id={feature.id}
            title={feature.title}
            icon={feature.icon}
            path={feature.path}
            color={feature.color}
            description={feature.description}
            image={feature.image}
            isRecommended={isFeatureRecommended(feature.id, selectedQualities, selectedGoals)}
            isSpanish={isSpanish}
            handleNavigate={handleNavigate}
          />
        )
      ))}
    </motion.div>
  );
};

export default KeyFeaturesGrid;
