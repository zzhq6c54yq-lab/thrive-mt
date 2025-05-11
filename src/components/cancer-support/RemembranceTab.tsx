
import React from "react";
import { Heart, Star, BookHeart, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";

interface RemembranceTabProps {
  onFeatureClick: (path: string) => void;
}

const RemembranceTab: React.FC<RemembranceTabProps> = ({ onFeatureClick }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Honoring & Remembering</h3>
      <p className="text-gray-600 dark:text-white/70 mb-6">
        A compassionate space for those who have lost loved ones to cancer, providing support and ways to honor their memory.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeatureCard 
          title="Memorial Garden"
          description="Create a digital tribute to honor and remember your loved one"
          icon={Heart}
          color="bg-emerald-500"
          onClick={() => onFeatureClick("cancer-support/memorial-garden")}
        />
        <FeatureCard 
          title="Grief Resources"
          description="Support, information, and guidance for navigating grief after cancer loss"
          icon={Star}
          color="bg-purple-500"
          onClick={() => onFeatureClick("cancer-support/grief-resources")}
        />
        <FeatureCard 
          title="Legacy Projects"
          description="Ideas and support for creating meaningful tributes and legacy initiatives"
          icon={BookHeart}
          color="bg-amber-500"
          onClick={() => onFeatureClick("cancer-support/legacy-projects")}
        />
        <FeatureCard 
          title="Bereavement Community"
          description="Connect with others who understand the unique experience of cancer loss"
          icon={Users}
          color="bg-blue-500"
          onClick={() => onFeatureClick("cancer-support/bereavement-community")}
        />
      </div>
    </div>
    
    <div className="bg-gradient-to-b from-purple-50 to-rose-50 dark:from-purple-900/20 dark:to-rose-900/20 p-6 rounded-lg border border-purple-200/50 dark:border-purple-800/30 text-center mt-8">
      <div className="max-w-md mx-auto">
        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Memorial Wall</h4>
        <p className="text-gray-600 dark:text-white/70 text-sm mb-6">
          Our Memorial Wall is a dedicated space to honor those we've lost to cancer. 
          Each tribute represents a life cherished and remembered.
        </p>
        
        <div className="flex justify-center mb-6">
          <button
            onClick={() => onFeatureClick("cancer-support/memorial-wall")}
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white rounded-md text-sm font-medium"
          >
            Visit Memorial Wall
          </button>
        </div>
        
        <div className="text-center">
          <span className="inline-block h-0.5 w-16 bg-purple-300 dark:bg-purple-700 opacity-50"></span>
          <p className="italic text-sm text-gray-600 dark:text-white/60 mt-4">
            "Those we love don't go away, they walk beside us every day. Unseen, unheard, but always near; still loved, still missed, and very dear."
          </p>
        </div>
      </div>
    </div>
    
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-[#1A1616] p-5 rounded-lg border border-gray-200 dark:border-gray-800">
        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Support Groups</h4>
        <p className="text-gray-600 dark:text-white/70 text-sm mb-4">
          Connect with others who understand the unique journey of grief after cancer loss.
          Our facilitated groups provide a safe space to share, listen, and heal together.
        </p>
        <button
          onClick={() => onFeatureClick("cancer-support/grief-groups")}
          className="text-sm text-purple-600 dark:text-purple-400 font-medium hover:underline"
        >
          Find a Group →
        </button>
      </div>
      
      <div className="bg-white dark:bg-[#1A1616] p-5 rounded-lg border border-gray-200 dark:border-gray-800">
        <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-3">Honoring Through Action</h4>
        <p className="text-gray-600 dark:text-white/70 text-sm mb-4">
          Many find healing through action. Discover volunteer opportunities, fundraisers, 
          and awareness initiatives that honor loved ones while supporting the cancer community.
        </p>
        <button
          onClick={() => onFeatureClick("cancer-support/honoring-action")}
          className="text-sm text-rose-600 dark:text-rose-400 font-medium hover:underline"
        >
          Explore Opportunities →
        </button>
      </div>
    </div>
  </div>
);

export default RemembranceTab;
