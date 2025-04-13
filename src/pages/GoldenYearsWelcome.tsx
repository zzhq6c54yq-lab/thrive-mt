
import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { Sparkles } from "lucide-react";

const GoldenYearsWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="The Golden Years Experience"
      description="A supportive community and resources designed specifically for seniors. Embrace this wonderful chapter of life with tools to maintain mental wellness, connect with loved ones, and share your wisdom."
      whatToExpect={[
        "Specialized mental wellness tools designed for seniors",
        "Journal prompts to capture and share your life stories with family",
        "Community forums to connect with peers and share experiences",
        "Resources for managing age-related transitions and challenges",
        "Interactive family features to strengthen intergenerational bonds"
      ]}
      color="amber"
      gradientFrom="amber-500"
      gradientTo="orange-300"
      borderColor="#F59E0B"
      portalPath="/golden-years-portal"
      icon={<Sparkles className="h-10 w-10 text-white" />}
    />
  );
};

export default GoldenYearsWelcome;
