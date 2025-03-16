
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  activeTab: string;
  handleTabChange: (value: string) => void;
}

const TabNavigation = ({ activeTab, handleTabChange }: TabNavigationProps) => {
  return (
    <TabsList className="grid grid-cols-6 w-full bg-[#0A1929]/50 p-1 border border-[#B87333]/30">
      <TabsTrigger 
        value="dashboard" 
        onClick={() => handleTabChange("dashboard")}
        className={activeTab === "dashboard" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}
      >
        Dashboard
      </TabsTrigger>
      <TabsTrigger 
        value="resources" 
        onClick={() => handleTabChange("resources")}
        className={activeTab === "resources" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}
      >
        Resources
      </TabsTrigger>
      <TabsTrigger 
        value="education" 
        onClick={() => handleTabChange("education")}
        className={activeTab === "education" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}
      >
        Education
      </TabsTrigger>
      <TabsTrigger 
        value="assessments" 
        onClick={() => handleTabChange("assessments")}
        className={activeTab === "assessments" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}
      >
        Assessments
      </TabsTrigger>
      <TabsTrigger 
        value="programs" 
        onClick={() => handleTabChange("programs")}
        className={activeTab === "programs" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}
      >
        Programs
      </TabsTrigger>
      <TabsTrigger 
        value="profile" 
        onClick={() => handleTabChange("profile")}
        className={activeTab === "profile" ? "bg-[#B87333]/20 text-[#B87333] shadow" : ""}
      >
        My Profile
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
