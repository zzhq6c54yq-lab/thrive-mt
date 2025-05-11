
import React from "react";
import { HandHeart, Calendar, BookHeart, Star, Heart, MessageCircle } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface CaregiversTabProps {
  onFeatureClick: (path: string) => void;
}

const CaregiversTab: React.FC<CaregiversTabProps> = ({ onFeatureClick }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">For Caregivers & Loved Ones</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        Supporting a loved one through cancer can be challenging. These resources are designed to help caregivers maintain their own wellbeing while providing care.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureCard 
          title="Caregiver Basics"
          description="Essential information for new caregivers, including practical tips and emotional support"
          icon={HandHeart}
          color="bg-purple-500"
          onClick={() => onFeatureClick("cancer-support/caregiver-basics")}
        />
        <FeatureCard 
          title="Self-Care Resources"
          description="Tools and guidance to help caregivers maintain their own physical and emotional health"
          icon={Heart}
          color="bg-rose-500"
          onClick={() => onFeatureClick("cancer-support/caregiver-selfcare")}
        />
        <FeatureCard 
          title="Communication Guides"
          description="How to have difficult conversations and communicate effectively with healthcare providers"
          icon={MessageCircle}
          color="bg-blue-500"
          onClick={() => onFeatureClick("cancer-support/caregiver-communication")}
        />
        <FeatureCard 
          title="Financial Navigation"
          description="Guidance on managing costs, insurance, and financial resources"
          icon={Star}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/financial-navigation")}
        />
        <FeatureCard 
          title="Caregiver Workshops"
          description="Interactive online sessions focused on skills and coping strategies"
          icon={Calendar}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/caregiver-workshops")}
        />
        <FeatureCard 
          title="Caregiver Stories"
          description="Learn from others who have walked this path before"
          icon={BookHeart}
          color="bg-indigo-500"
          onClick={() => onFeatureClick("cancer-support/caregiver-stories")}
        />
      </div>
    </div>
    
    <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-900/30">
      <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">Caregiver Support Community</h4>
      <p className="text-purple-800 dark:text-purple-200 text-sm">
        Join our dedicated space for caregivers to connect with others who understand 
        what you're experiencing. Share challenges, solutions, and support each other.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          onClick={() => onFeatureClick("cancer-support/caregiver-forum")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium"
        >
          Join Forum
        </button>
        <button
          onClick={() => onFeatureClick("cancer-support/caregiver-groups")}
          className="px-4 py-2 border border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-md text-sm font-medium"
        >
          Find Support Groups
        </button>
      </div>
    </div>
  </div>
);

export default CaregiversTab;
