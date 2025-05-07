
import React from "react";
import BaseCard from "@/components/shared/BaseCard";

interface FeatureCardProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  description: string;
  image: string;
  isRecommended: boolean;
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  id,
  title,
  icon,
  path,
  color,
  description,
  image,
  isRecommended,
  isSpanish,
  handleNavigate
}) => {
  const badge = isRecommended ? (
    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium">
      {isSpanish ? "Recomendado" : "Recommended"}
    </span>
  ) : null;

  return (
    <BaseCard
      id={id}
      title={title}
      imagePath={image}
      path={path}
      gradient={color}
      icon={icon}
      onClick={handleNavigate}
      badge={badge}
    />
  );
};

export default FeatureCard;
