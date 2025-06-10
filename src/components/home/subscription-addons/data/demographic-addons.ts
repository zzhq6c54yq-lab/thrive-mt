
import { GraduationCap, Shield, UserRound, PersonStanding } from "lucide-react";
import type { AddOn } from "./types";

// Demographic-based add-ons
export const demographicAddOns: AddOn[] = [
  {
    id: "colleges",
    title: "College Student Resources",
    description: "Support for the unique mental health challenges of college students.",
    targetAudience: "College and university students",
    features: ["Exam stress management", "Campus life adjustment", "Career preparation support"],
    price: {
      monthly: 3.99,
      yearly: 39.99
    },
    imagePath: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-blue-600 to-blue-400",
    borderColor: "#3B82F6",
    icon: GraduationCap,
    path: "/college-welcome"
  },
  {
    id: "dod",
    title: "Military & Veteran Support",
    description: "Specialized mental health resources for active duty, veterans, and families.",
    targetAudience: "Military personnel, veterans, and their families",
    features: ["PTSD resources", "Deployment support", "Transition to civilian life"],
    price: {
      monthly: 0,
      yearly: 0
    },
    imagePath: "https://images.unsplash.com/photo-1607456634979-3e8c48b0ece5?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-blue-900 to-blue-700",
    borderColor: "#1E3A8A",
    icon: Shield,
    path: "/dod-welcome",
    free: true
  },
  {
    id: "adolescent",
    title: "Adolescent Support",
    description: "Mental wellbeing resources specifically designed for teenagers and adolescents.",
    targetAudience: "Teenagers and adolescents aged 13-19",
    features: ["School stress management", "Social skills development", "Identity and self-esteem"],
    price: {
      monthly: 4.99,
      yearly: 49.99
    },
    imagePath: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-400",
    borderColor: "#10B981",
    icon: UserRound,
    path: "/adolescent-welcome"
  },
  {
    id: "golden-years",
    title: "Golden Years Program",
    description: "Mental wellness resources tailored to seniors and aging individuals.",
    targetAudience: "Seniors and older adults",
    features: ["Retirement transition support", "Social connection strategies", "Memory enhancement exercises"],
    price: {
      monthly: 3.99,
      yearly: 39.99
    },
    imagePath: "https://images.unsplash.com/photo-1594736797933-d0fce9f17fbc?auto=format&fit=crop&q=80&w=1000",
    gradient: "bg-gradient-to-r from-yellow-600 to-yellow-400",
    borderColor: "#D97706",
    icon: PersonStanding,
    path: "/golden-years-welcome"
  }
];
