import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddOn } from "./types";

interface AddOnCardProps {
  addOn: AddOn;
  isSelected: boolean;
  expandedAddon: string | null;
  priceDisplay: React.ReactNode;
  onToggleExpand: (id: string) => void;
  onToggle: (id: string) => void;
}

const AddOnCard: React.FC<AddOnCardProps> = ({
  addOn,
  isSelected,
  expandedAddon,
  priceDisplay,
  onToggleExpand,
  onToggle,
}) => {
  const Icon = addOn.icon;

  return (
    <motion.div 
      className={`relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 ${
        isSelected ? 'ring-2 ring-[#B87333]' : 'hover:scale-102'
      }`}
      onClick={() => onToggle(addOn.id)}
    >
      <div className="absolute inset-0 h-[60%] z-0">
        <img 
          src={addOn.imagePath} 
          alt={addOn.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506726446959-adfa26e7aea0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80";
          }}
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
            <button
              className="text-xs text-white/90 underline flex items-center mb-2"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(addOn.id);
              }}
            >
              {expandedAddon === addOn.id ? "Hide details" : "See what's included"}
            </button>
            
            {expandedAddon === addOn.id && (
              <div 
                className="absolute bottom-full left-0 right-0 bg-black/80 backdrop-blur-sm p-3 rounded-md mb-2 z-20 border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <h4 className="font-medium text-sm mb-1">Key Features:</h4>
                <ul className="text-xs">
                  {addOn.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-1 mb-1">
                      <span className="h-1 w-1 bg-[#B87333] rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
      </div>
      
      {isSelected && (
        <div 
          className="absolute inset-0 border-2 opacity-100 transition-opacity"
          style={{ borderColor: addOn.borderColor }}  
        ></div>
      )}
    </motion.div>
  );
};

export default AddOnCard;
