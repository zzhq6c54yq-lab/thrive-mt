
import { Shield, GraduationCap, Briefcase, Users, Sparkles, Siren, BookUser, UtensilsCrossed, Truck, Stethoscope } from "lucide-react";
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
  },
  {
    id: "firstResponders",
    title: "First Responders Program",
    description: "Supporting the mental health and wellbeing of our emergency service professionals",
    targetAudience: "Firefighters, paramedics, police officers, and emergency service professionals",
    features: [
      "Crisis support for emergency service professionals",
      "Peer support networks with other first responders",
      "Stress management for high-pressure situations",
      "Post-incident trauma resources",
      "Family support services for emergency personnel"
    ],
    icon: Siren,
    path: "/first-responders-welcome",
    gradient: "from-[#DC2626]/80 to-[#EF4444]/80",
    borderColor: "#DC2626",
    imagePath: "/lovable-uploads/54e4d3e9-8aa5-46b2-a8e6-42fb0ba8128b.png",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "lawEnforcement",
    title: "Law Enforcement Program",
    description: "Supporting mental health and wellbeing of law enforcement professionals",
    targetAudience: "Police officers, detectives, and law enforcement professionals",
    features: [
      "Stress management for law enforcement",
      "Critical incident debriefing support",
      "Police-specific peer support networks",
      "Family support for law enforcement",
      "Law enforcement wellness resources and tools"
    ],
    icon: Shield,
    path: "/law-enforcement-welcome",
    gradient: "from-[#1E40AF]/80 to-[#1E3A8A]/80",
    borderColor: "#1E40AF",
    imagePath: "/lovable-uploads/f3c84972-8f58-42d7-b86f-82ff2d823b30.png",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "educators",
    title: "Esteemed Educators Program",
    description: "Mental health support for teachers and education professionals",
    targetAudience: "Teachers, professors, administrators, and education support staff",
    features: [
      "Classroom stress management techniques",
      "Work-life balance for educators",
      "Dealing with difficult classroom situations",
      "Educator burnout prevention resources",
      "Teacher-specific wellness practices"
    ],
    icon: BookUser,
    path: "/educators-welcome",
    gradient: "from-[#8B5CF6]/80 to-[#6366F1]/80",
    borderColor: "#8B5CF6",
    imagePath: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "hospitality",
    title: "Hospitality Industry Program",
    description: "Mental wellness support for restaurant and hospitality workers",
    targetAudience: "Restaurant staff, hotel employees, and service industry professionals",
    features: [
      "Service industry stress management",
      "Work-life balance for irregular schedules",
      "Managing customer service pressure",
      "Restaurant-specific mental health resources",
      "Peer support for service professionals"
    ],
    icon: UtensilsCrossed,
    path: "/hospitality-welcome",
    gradient: "from-[#9b87f5]/80 to-[#7E69AB]/80",
    borderColor: "#9b87f5",
    imagePath: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "transport",
    title: "Transport Industry Program",
    description: "Mental wellness resources for truck drivers and transportation workers",
    targetAudience: "Truck drivers, delivery personnel, and transportation professionals",
    features: [
      "Road stress management techniques",
      "Long-haul driver wellness tools",
      "Sleep hygiene for irregular schedules",
      "Isolation and loneliness coping strategies",
      "Work-life balance for drivers"
    ],
    icon: Truck,
    path: "/transport-welcome",
    gradient: "from-[#3B82F6]/80 to-[#1E40AF]/80",
    borderColor: "#3B82F6",
    imagePath: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  },
  {
    id: "chronicIllness",
    title: "Chronic Illness Support",
    description: "Mental wellness resources for individuals managing chronic health conditions",
    targetAudience: "People living with chronic illnesses, ongoing medical conditions, and their caregivers",
    features: [
      "Symptom and medication tracking tools",
      "Emotional coping strategies for chronic conditions",
      "Community support with others facing similar challenges",
      "Resources for caregivers and family members",
      "Integration with health tracking applications"
    ],
    icon: Stethoscope,
    path: "/chronic-illness-welcome",
    gradient: "from-[#8B5CF6]/80 to-[#7E69AB]/80",
    borderColor: "#8B5CF6",
    imagePath: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1280&q=80",
    price: {
      basic: "$3/month",
      gold: "$2/month",
      platinum: "$1/month"
    }
  }
];
