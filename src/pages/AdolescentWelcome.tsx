
import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { Users } from "lucide-react";

const AdolescentWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="The Adolescent Experience"
      description="Age-appropriate mental health resources and support for children and teens of all ages. We provide tailored content and tools that grow with your child."
      whatToExpect={[
        "Age-specific content designed for different developmental stages",
        "Interactive tools and games that make mental wellness engaging",
        "Resources for parents to support their children's mental health",
        "Safe spaces for self-expression and emotional growth",
        "Expert-developed content addressing the unique challenges of each age group"
      ]}
      color="purple"
      gradientFrom="purple-500"
      gradientTo="pink-400"
      borderColor="#D946EF"
      portalPath="/adolescent-selection"
      icon={<Users className="h-10 w-10 text-white" />}
    />
  );
};

export default AdolescentWelcome;
