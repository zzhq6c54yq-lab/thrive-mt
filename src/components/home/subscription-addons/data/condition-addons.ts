
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
      "Medical management tools and trackers",
      "Pain management techniques and exercises",
      "Fatigue management strategies",
      "Nutrition guidance for chronic conditions",
      "Sleep optimization for chronic illness",
      "Peer support groups by condition type",
      "Family and caregiver resources",
      "Workplace accommodation guidance",
      "Insurance and healthcare navigation support"
    ],
    icon: Heart,
    path: "chronic-illness-welcome",
    gradient: "from-emerald-700 to-blue-700",
    borderColor: "#065f46",
    imagePath: "/lovable-uploads/21b45268-36e0-4167-8f07-3f4dbcd35acb.png",
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
      "Inspirational content and survivor stories",
      "Treatment side effects management",
      "Nutrition during cancer treatment",
      "Exercise and wellness programs",
      "Financial assistance and resource navigation",
      "Return to work guidance for survivors",
      "Clinical trial information and support",
      "Complementary therapy resources",
      "Mental health counseling specific to cancer",
      "Palliative and hospice care support"
    ],
    icon: Heart,
    path: "cancer-support-welcome",
    gradient: "from-purple-600 to-rose-600",
    borderColor: "#9b87f5",
    imagePath: "/lovable-uploads/e4e48c6f-2732-42e5-b8b2-2afb861877fd.png",
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
