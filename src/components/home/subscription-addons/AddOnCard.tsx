
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddOn } from './data/types';
import AddOnPreview from './AddOnPreview';

interface AddOnCardProps {
  addOn: AddOn;
  isSelected: boolean;
  expandedAddon: string | null;
  priceDisplay: React.ReactNode | string;
  selectedPlan: string | null;
  onToggleExpand: (id: string) => void;
  onToggle: (id: string) => void;
  onCheckout?: (addOnId: string) => void;
}

const AddOnCard: React.FC<AddOnCardProps> = ({
  addOn,
  isSelected,
  expandedAddon,
  priceDisplay,
  selectedPlan,
  onToggleExpand,
  onToggle,
  onCheckout
}) => {
  const Icon = addOn.icon;
  const [imageSrc, setImageSrc] = useState<string>('');
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageAttempts, setImageAttempts] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Initialize image source with proper cache busting
  useEffect(() => {
    setImageSrc(addOn.imagePath);
    setImageLoaded(false);
  }, [addOn.id, addOn.imagePath]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageErrorEvent = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Limit retry attempts to prevent infinite loops
    if (imageAttempts < 2) {
      console.error(`Failed to load image for ${addOn.id}, using fallback`);
      const fallbackImage = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80";
      setImageSrc(fallbackImage);
      setImageAttempts(prev => prev + 1);
    }
  };

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 ${
        isSelected ? 'ring-2 ring-[#B87333]' : 'hover:scale-102'
      }`}
      onClick={() => onToggle(addOn.id)}
    >
      <div className="absolute inset-0 h-[60%] z-0">
        {/* Show skeleton loader until image loads */}
        <div className={`absolute inset-0 bg-gray-800 animate-pulse transition-opacity ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
        
        <img 
          src={imageSrc || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&q=80"} 
          alt={addOn.title}
          className={`w-full h-full object-cover transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onError={handleImageErrorEvent}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
              <Icon className="h-6 w-6 text-white" />
            </div>
            
            {isSelected && (
              <div className="bg-[#B87333] text-white p-1 rounded-full">
                <Check className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
      
        <div className={`p-4 bg-gradient-to-br ${addOn.gradient} mt-auto`}>
          <h3 className="font-semibold text-lg mb-1">
            {addOn.title}
          </h3>
          <p className="text-sm text-white/90 mb-2 line-clamp-2">
            {addOn.description}
          </p>

          <div className="text-xs text-white/80 mb-3">
            <strong className="block mb-1">For: </strong> 
            {addOn.targetAudience}
          </div>

          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-white/70 hover:text-white hover:bg-white/10 p-1 h-auto"
              onClick={(e) => {
                e.stopPropagation();
                setShowPreview(true);
              }}
            >
              See what's included
            </Button>
            
            <AddOnPreview 
              addOn={addOn}
              selectedPlan={selectedPlan}
              isOpen={showPreview}
              onClose={() => setShowPreview(false)}
              onCheckout={onCheckout || (() => {})}
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{priceDisplay}</span>
            <Button 
              variant="outline" 
              className="bg-white/20 border-white/10 text-white hover:bg-white/30"
              onClick={(e) => {
                e.stopPropagation();
                onToggle(addOn.id);
              }}
            >
              {isSelected ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
        
        {isSelected && (
          <div 
            className="absolute inset-0 border-2 opacity-100 transition-opacity"
            style={{ borderColor: addOn.borderColor }}  
          ></div>
        )}
      </div>
    </motion.div>
  );
};

export default AddOnCard;
