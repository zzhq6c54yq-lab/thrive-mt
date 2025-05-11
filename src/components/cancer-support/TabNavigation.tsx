
import React from "react";

interface TabNavigationProps {
  activeTab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children';
  onTabChange: (tab: 'patients' | 'caregivers' | 'resources' | 'communities' | 'remembrance' | 'children') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => (
  <div className="flex overflow-x-auto scrollbar-hide">
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'patients' 
          ? 'border-rose-500 text-rose-500 dark:text-rose-400' 
          : 'border-transparent text-gray-600 dark:text-gray-300/60 hover:text-gray-900 dark:hover:text-white'
      }`}
      onClick={() => onTabChange('patients')}
    >
      Patient Resources
    </button>
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'caregivers' 
          ? 'border-rose-500 text-rose-500 dark:text-rose-400' 
          : 'border-transparent text-gray-600 dark:text-gray-300/60 hover:text-gray-900 dark:hover:text-white'
      }`}
      onClick={() => onTabChange('caregivers')}
    >
      Caregivers
    </button>
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'children' 
          ? 'border-rose-500 text-rose-500 dark:text-rose-400' 
          : 'border-transparent text-gray-600 dark:text-gray-300/60 hover:text-gray-900 dark:hover:text-white'
      }`}
      onClick={() => onTabChange('children')}
    >
      Children & Parents
    </button>
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'resources' 
          ? 'border-rose-500 text-rose-500 dark:text-rose-400' 
          : 'border-transparent text-gray-600 dark:text-gray-300/60 hover:text-gray-900 dark:hover:text-white'
      }`}
      onClick={() => onTabChange('resources')}
    >
      Educational Hub
    </button>
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'communities' 
          ? 'border-rose-500 text-rose-500 dark:text-rose-400' 
          : 'border-transparent text-gray-600 dark:text-gray-300/60 hover:text-gray-900 dark:hover:text-white'
      }`}
      onClick={() => onTabChange('communities')}
    >
      Support Groups
    </button>
    <button
      className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
        activeTab === 'remembrance' 
          ? 'border-rose-500 text-rose-500 dark:text-rose-400' 
          : 'border-transparent text-gray-600 dark:text-gray-300/60 hover:text-gray-900 dark:hover:text-white'
      }`}
      onClick={() => onTabChange('remembrance')}
    >
      Remembrance
    </button>
  </div>
);

export default TabNavigation;
