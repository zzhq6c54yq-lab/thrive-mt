
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MentalWellnessMenu from "@/components/mental-wellness/MentalWellnessMenu";
import useTranslation from "@/hooks/useTranslation";
import { handleImageError } from "@/utils/imageUtils";
import BaseCard from "@/components/shared/BaseCard";

interface MentalWellnessFeatureProps {
  id: string;
  title: string;
  description: string;
  path: string;
  color: string;
  image: string;
  isRecommended: boolean;
  isSpanish: boolean;
  handleNavigate: (path: string) => void;
}

const MentalWellnessFeature: React.FC<MentalWellnessFeatureProps> = ({
  id,
  title,
  description,
  path,
  color,
  image,
  isRecommended,
  isSpanish,
  handleNavigate
}) => {
  const { isSpanish: translationIsSpanish } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const badge = isRecommended ? (
    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/30 text-white font-medium">
      {isSpanish ? "Recomendado" : "Recommended"}
    </span>
  ) : null;

  const handleCardClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <BaseCard
        id={id}
        title={title}
        imagePath={image}
        path={path}
        gradient={color}
        icon={<Brain className="h-4 w-4 text-white" />}
        onClick={() => handleCardClick()}
        badge={badge}
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-violet-500" />
              {translationIsSpanish ? "Recursos de Bienestar Mental" : "Mental Wellness Resources"}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => setDialogOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="mt-4">
            <MentalWellnessMenu 
              onNavigate={(path) => {
                setDialogOpen(false);
                handleNavigate(path);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MentalWellnessFeature;
