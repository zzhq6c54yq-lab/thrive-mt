import { Shield, GraduationCap, Briefcase, Users, Sparkles } from "lucide-react";
import { AddOn } from "./types";

export const addOns: AddOn[] = [
  {
    id: "dod",
    title: "Department of Defense Program",
    description: "Specialized mental health support for military personnel and veterans",
    targetAudience: "Active duty military personnel, veterans, and their families",
    features: [
      "Combat-related stress management tools",
      "Transition assistance resources",
      "Specialized military mental health content",
      "Connection with other veterans and military families",
      "Department of Defense approved resources"
    ],
    icon: Shield,
    path: "/dod-welcome",
    gradient: "from-[#0EA5E9]/80 to-[#2563EB]/80",
    borderColor: "#0EA5E9",
    imagePath: "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "college",
    title: "The College Experience",
    description: "Resources and support for college students and young adults",
    targetAudience: "College students, graduate students, and young adults in academic settings",
    features: [
      "Study-life balance resources",
      "Academic stress management",
      "Social anxiety in college settings",
      "Campus mental health resources directory",
      "Career transition guidance"
    ],
    icon: GraduationCap,
    path: "/college-welcome",
    gradient: "from-[#8B5CF6]/80 to-[#6366F1]/80",
    borderColor: "#8B5CF6",
    imagePath: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "business",
    title: "Small Business Program",
    description: "Mental wellness resources for small business owners and employees",
    targetAudience: "Small business owners, entrepreneurs, and their employees",
    features: [
      "Workplace stress management",
      "Leadership mental wellness",
      "Work-life balance strategies",
      "Team mental health resources",
      "Business growth without burnout"
    ],
    icon: Briefcase,
    path: "/small-business-selection",
    gradient: "from-[#F97316]/80 to-[#FB923C]/80",
    borderColor: "#F97316",
    imagePath: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "adolescent",
    title: "Adolescent Experience",
    description: "Age-specific mental wellness content for teenagers and young adults",
    targetAudience: "Teenagers, young adults, and their parents or guardians",
    features: [
      "Age-specific mental wellness content",
      "Social media and digital wellness",
      "Identity development resources",
      "Parent-teen communication tools",
      "School stress management"
    ],
    icon: Users,
    path: "/adolescent-selection",
    gradient: "from-[#D946EF]/80 to-[#EC4899]/80",
    borderColor: "#D946EF",
    imagePath: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "golden",
    title: "The Golden Years",
    description: "Resources for seniors, retirees, and older adults focusing on life's golden years",
    targetAudience: "Seniors, retirees, and older adults focusing on life's golden years",
    features: [
      "Legacy journal and life story preservation",
      "Memory and cognitive exercises",
      "End-of-life planning resources",
      "Retirement transition support",
      "Intergenerational connection tools"
    ],
    icon: Sparkles,
    path: "/golden-years-welcome",
    gradient: "from-[#D4AF37]/80 to-[#B8860B]/80",
    borderColor: "#D4AF37",
    imagePath: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  }
];
