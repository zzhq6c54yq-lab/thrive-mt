
import { GraduationCap, Shield, UserRound, PersonStanding } from "lucide-react";
import type { AddOn } from "./types";

// Demographic-based add-ons
export const demographicAddOns: AddOn[] = [
  {
    id: "colleges",
    title: "College Student Resources",
    titleSpanish: "Recursos para Estudiantes Universitarios",
    description: "Support for the unique mental health challenges of college students.",
    descriptionSpanish: "Apoyo para los desafíos únicos de salud mental de los estudiantes universitarios.",
    basePrice: 14.99,
    targetAudience: "College and university students",
    features: [
      "Exam stress management", 
      "Campus life adjustment", 
      "Career preparation support",
      "Study habits and time management",
      "Social anxiety and peer pressure support"
    ],
    imagePath: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000",
    gradient: "from-blue-600 to-blue-400",
    borderColor: "#3B82F6",
    icon: GraduationCap
  },
  {
    id: "dod",
    title: "Military & Veteran Support",
    titleSpanish: "Apoyo Militar y de Veteranos",
    description: "Specialized mental health resources for active duty, veterans, and families.",
    descriptionSpanish: "Recursos especializados de salud mental para personal activo, veteranos y familias.",
    basePrice: 19.99,
    targetAudience: "Military personnel, veterans, and their families",
    features: [
      "PTSD resources", 
      "Deployment support", 
      "Transition to civilian life",
      "Military family support",
      "Combat stress recovery programs"
    ],
    imagePath: "/lovable-uploads/military-flag-badges.jpg",
    gradient: "from-blue-900 to-blue-700",
    borderColor: "#1E3A8A",
    icon: Shield
  },
  {
    id: "adolescent",
    title: "Adolescent Support",
    titleSpanish: "Apoyo para Adolescentes",
    description: "Mental wellbeing resources specifically designed for teenagers and adolescents.",
    descriptionSpanish: "Recursos de bienestar mental diseñados específicamente para adolescentes.",
    basePrice: 16.99,
    targetAudience: "Teenagers and adolescents aged 13-19",
    features: [
      "School stress management", 
      "Social skills development", 
      "Identity and self-esteem",
      "Peer relationship guidance",
      "Academic pressure coping strategies"
    ],
    imagePath: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&q=80&w=1000",
    gradient: "from-green-500 to-emerald-400",
    borderColor: "#10B981",
    icon: UserRound
  },
  {
    id: "golden-years",
    title: "Golden Years Program",
    titleSpanish: "Programa Años Dorados",
    description: "Mental wellness resources tailored to seniors and aging individuals.",
    descriptionSpanish: "Recursos de bienestar mental adaptados para personas mayores y adultos que envejecen.",
    basePrice: 18.99,
    targetAudience: "Seniors and older adults",
    features: [
      "Retirement transition support", 
      "Social connection strategies", 
      "Memory enhancement exercises",
      "Health and wellness guidance",
      "Legacy and purpose discovery"
    ],
    imagePath: "/lovable-uploads/elderly-musicians.jpg",
    gradient: "from-yellow-600 to-yellow-400",
    borderColor: "#D97706",
    icon: PersonStanding
  }
];
