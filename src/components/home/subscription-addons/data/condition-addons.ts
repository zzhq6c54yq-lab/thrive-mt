
import { Heart, Users, BookHeart } from "lucide-react";
import type { AddOn } from "./types";

export const conditionAddOns: AddOn[] = [
  {
    id: "chronic-illness",
    title: "Chronic Illness Support",
    description: "Specialized resources for those managing long-term health conditions",
    targetAudience: "Individuals with chronic illness and their support networks",
    features: [
      "Condition-specific resources and education",
      "Coping strategies for ongoing symptoms",
      "Emotional support for chronic health challenges",
      "Medical management tools and trackers"
    ],
    icon: Heart,
    path: "chronic-illness-welcome",
    gradient: "from-emerald-700 to-blue-700",
    borderColor: "#065f46",
    imagePath: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=1000",
    price: {
      basic: "Add-on",
      gold: "Included",
      platinum: "Included",
      monthly: 4.99,
      yearly: 49.99
    },
    recommended: true
  },
  {
    id: "cancer-support",
    title: "Cancer Support Community",
    description: "Comprehensive resources for patients, families, and caregivers affected by cancer",
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
    path: "cancer-support-welcome",
    gradient: "from-purple-600 to-rose-600",
    borderColor: "#9b87f5",
    imagePath: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1000",
    price: {
      basic: "Add-on",
      gold: "Included",
      platinum: "Included",
      monthly: 3.99,
      yearly: 39.99
    },
    recommended: true
  }
];
