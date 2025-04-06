
import React from "react";
import useTranslation from "@/hooks/useTranslation";

interface TabNavigationProps {
  activeTab: 'business' | 'employee' | 'resources' | 'workshops';
  onTabChange: (tab: 'business' | 'employee' | 'resources' | 'workshops') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const { isSpanish } = useTranslation();

  return (
    <div className="flex overflow-x-auto scrollbar-hide">
      <button
        className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
          activeTab === 'business' 
            ? 'border-amber-500 text-amber-400' 
            : 'border-transparent text-white/60 hover:text-white'
        }`}
        onClick={() => onTabChange('business')}
      >
        {isSpanish ? "Para Emprendedores" : "For Business Owners"}
      </button>
      <button
        className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
          activeTab === 'employee' 
            ? 'border-amber-500 text-amber-400' 
            : 'border-transparent text-white/60 hover:text-white'
        }`}
        onClick={() => onTabChange('employee')}
      >
        {isSpanish ? "Para Empleados" : "For Employees"}
      </button>
      <button
        className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
          activeTab === 'resources' 
            ? 'border-amber-500 text-amber-400' 
            : 'border-transparent text-white/60 hover:text-white'
        }`}
        onClick={() => onTabChange('resources')}
      >
        {isSpanish ? "Recursos" : "Resources"}
      </button>
      <button
        className={`px-6 py-4 font-medium text-sm flex-shrink-0 border-b-2 ${
          activeTab === 'workshops' 
            ? 'border-amber-500 text-amber-400' 
            : 'border-transparent text-white/60 hover:text-white'
        }`}
        onClick={() => onTabChange('workshops')}
      >
        {isSpanish ? "Talleres" : "Workshops"}
      </button>
    </div>
  );
};

export default TabNavigation;
