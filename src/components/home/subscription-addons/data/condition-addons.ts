
import { Heart, Users, BookHeart } from "lucide-react";
import type { AddOn } from "./types";

export const conditionAddOns: AddOn[] = [
  {
    id: "chronic-illness",
    title: "Chronic Illness Support",
    titleSpanish: "Apoyo para Enfermedades Crónicas",
    description: "Specialized resources for those managing long-term health conditions",
    descriptionSpanish: "Recursos especializados para quienes manejan condiciones de salud a largo plazo",
    basePrice: 21.99,
    targetAudience: "Individuals with chronic illness and their support networks",
    features: [
      "Condition-specific resources and education",
      "Coping strategies for ongoing symptoms",
      "Emotional support for chronic health challenges",
      "Medical management tools and trackers",
      "Support network building and maintenance"
    ],
    icon: Heart,
    gradient: "from-emerald-700 to-blue-700",
    borderColor: "#065f46",
    imagePath: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "cancer-support",
    title: "Cancer Support Community",
    titleSpanish: "Comunidad de Apoyo contra el Cáncer",
    description: "Comprehensive resources for patients, families, and caregivers affected by cancer",
    descriptionSpanish: "Recursos integrales para pacientes, familias y cuidadores afectados por el cáncer",
    basePrice: 25.99,
    targetAudience: "Cancer patients, survivors, caregivers, and families",
    features: [
      "Support resources for all cancer types and stages",
      "Specialized content for caregivers and families",
      "Child and parent-focused materials",
      "Remembrance and grief support",
      "Active support communities by cancer type",
      "Inspirational content and survivor stories"
    ],
    icon: Heart,
    gradient: "from-purple-600 to-rose-600",
    borderColor: "#9b87f5",
    imagePath: "/lovable-uploads/awareness-ribbons.jpg"
  }
];
