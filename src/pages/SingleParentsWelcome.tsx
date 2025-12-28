import React from "react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";
import { Heart } from "lucide-react";

const SingleParentsWelcome: React.FC = () => {
  return (
    <SpecializedProgramWelcome
      title="Single Parent Wellness Portal"
      description="Comprehensive support for single parents navigating the unique challenges of raising children independently while maintaining your own wellbeing."
      whatToExpect={[
        "Stress and burnout assessments tailored for single parents",
        "Time management strategies for balancing work and family",
        "Self-care resources designed for busy parents",
        "Financial wellness tools and planning resources",
        "Co-parenting communication strategies",
        "Parent Network for connection and shared support",
        "Support groups and community connections",
        "Work-life integration workshops"
      ]}
      color="#f43f5e"
      gradientFrom="from-rose-600"
      gradientTo="to-pink-800"
      borderColor="border-rose-500/30"
      portalPath="/single-parents-portal"
      icon={<Heart className="h-12 w-12 text-white" />}
      coverImage="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?auto=format&fit=crop&w=1200&q=80"
      motivationalMessage="You're doing an incredible job. This portal is here to support you every step of the way."
    />
  );
};

export default SingleParentsWelcome;
