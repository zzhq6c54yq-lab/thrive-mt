import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PromptSectionProps {
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  promptNumber: number;
}

const PromptSection: React.FC<PromptSectionProps> = ({
  prompt,
  value,
  onChange,
  promptNumber,
}) => {
  const maxLength = 500;
  const remaining = maxLength - value.length;

  return (
    <div className="space-y-2">
      <Label className="text-[#F5DEB3] text-base">
        <span className="text-[#D4AF37] font-semibold">Prompt {promptNumber}:</span> {prompt}
      </Label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder="Share your thoughts here..."
        className="min-h-[120px] bg-[#2A2420]/50 border-[#D4AF37]/30 text-[#F5DEB3] placeholder:text-[#F5DEB3]/40 text-base resize-none"
      />
      <p className="text-xs text-[#F5DEB3]/50 text-right">
        {remaining} characters remaining
      </p>
    </div>
  );
};

export default PromptSection;
