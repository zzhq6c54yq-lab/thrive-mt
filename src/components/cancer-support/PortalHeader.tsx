
import React from "react";
import { Heart } from "lucide-react";

const PortalHeader: React.FC = () => (
  <div className="bg-gradient-to-r from-rose-500/30 to-amber-500/30 p-6 rounded-xl backdrop-blur-md border border-rose-300/30 shadow-lg">
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="p-4 bg-white/20 rounded-full">
        <Heart className="h-10 w-10 text-rose-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Cancer Support Community
        </h2>
        <p className="text-gray-600 dark:text-white/80">
          A compassionate space for patients, families, and caregivers to find support, resources, and community throughout the cancer journey.
        </p>
      </div>
    </div>
  </div>
);

export default PortalHeader;
