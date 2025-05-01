
import React from "react";
import { BookUser, Heart } from "lucide-react";
import SpecializedProgramWelcome from "@/components/specialized-programs/SpecializedProgramWelcome";

const EducatorsWelcome: React.FC = () => {
  const whatToExpect = [
    "Resources tailored for education professionals dealing with classroom stress",
    "Workshops focused on maintaining mental health while supporting student growth",
    "Assessments designed to evaluate educator burnout and work-life balance",
    "Community support from peers who understand the unique challenges of education",
    "Tools for managing challenging classroom behavior without emotional exhaustion",
    "Resources for setting healthy boundaries with students, parents, and administration"
  ];
  
  return (
    <SpecializedProgramWelcome
      title="Esteemed Educators"
      description="Specialized mental health support for teachers, educators, and education staff facing the unique challenges of modern education environments."
      whatToExpect={whatToExpect}
      color="purple-500"
      gradientFrom="purple-500"
      gradientTo="indigo-500"
      borderColor="#9b87f5"
      portalPath="/educators-portal"
      icon={<BookUser className="h-10 w-10 text-white" />}
      coverImage="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
      motivationalMessage="Your dedication shapes the future every single day. As you nurture minds and hearts, we're here to nurture yours. Take a moment for yourself – because the greatest educators know that self-care isn't selfish, it's essential. You're making a difference that lasts a lifetime."
    />
  );
};

export default EducatorsWelcome;
